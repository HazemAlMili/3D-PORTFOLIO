import { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Vector3, PerspectiveCamera } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { resolveCameraPose, easeInOutCubic } from "./CameraDirector";
import { SCENE_CAMERA_KEYFRAMES, SCENE_03_CAMERA_BEATS } from "./cameraKeyframes";
import { usePointerInfluence } from "../interaction/usePointerInfluence";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { isMobileDevice } from "../utils/mobileUtils";

const SEGMENTS = buildSceneSegments();

function resolveScene03Pose(localProgress: number, isMobile: boolean): { position: [number, number, number]; target: [number, number, number]; fov: number } {
  const scene02Exit = isMobile
    ? { position: [0, 0.2, 9.0] as [number, number, number], target: [0, 0, 0] as [number, number, number], fov: 46 }
    : { position: [0.4, 0.2, 7.5] as [number, number, number], target: [0.3, 0.1, 0] as [number, number, number], fov: 52 };

  const beats = SCENE_03_CAMERA_BEATS;
  let activeIdx = beats.findIndex(b => localProgress >= b.start && localProgress <= b.end);
  if (activeIdx === -1) {
    activeIdx = localProgress <= 0 ? 0 : beats.length - 1;
  }

  const currentBeat = beats[activeIdx];
  const startProgress = currentBeat.start;
  const endProgress = currentBeat.end;

  const startPose = activeIdx === 0
    ? scene02Exit
    : (isMobile ? beats[activeIdx - 1].mobile : beats[activeIdx - 1].desktop);

  const endPose = isMobile ? currentBeat.mobile : currentBeat.desktop;

  const duration = endProgress - startProgress;
  const t = duration > 0 ? (localProgress - startProgress) / duration : 1.0;
  const easedT = easeInOutCubic(Math.min(1, Math.max(0, t)));

  const position: [number, number, number] = [
    startPose.position[0] + (endPose.position[0] - startPose.position[0]) * easedT,
    startPose.position[1] + (endPose.position[1] - startPose.position[1]) * easedT,
    startPose.position[2] + (endPose.position[2] - startPose.position[2]) * easedT,
  ];

  const target: [number, number, number] = [
    startPose.target[0] + (endPose.target[0] - startPose.target[0]) * easedT,
    startPose.target[1] + (endPose.target[1] - startPose.target[1]) * easedT,
    startPose.target[2] + (endPose.target[2] - startPose.target[2]) * easedT,
  ];

  const fov = startPose.fov + (endPose.fov - startPose.fov) * easedT;

  return { position, target, fov };
}

function resolveScene04Pose(localProgress: number, isMobile: boolean): { position: [number, number, number]; target: [number, number, number]; fov: number } {
  const hubPose = isMobile
    ? { position: [0.00, 0.00, 6.00] as [number, number, number], target: [0.00, 0.00, 0.00] as [number, number, number], fov: 42 }
    : { position: [0.95, 0.08, 6.50] as [number, number, number], target: [0.95, 0.08, 0.00] as [number, number, number], fov: 48 };

  const inspectionPose = isMobile
    ? { position: [0.00, 0.00, 3.80] as [number, number, number], target: [0.00, 0.00, 0.00] as [number, number, number], fov: 42 }
    : { position: [0.95, 0.08, 2.35] as [number, number, number], target: [0.95, 0.08, 0.00] as [number, number, number], fov: 48 };

  const p = Math.min(1, Math.max(0, localProgress));

  // 1. HUB_OVERVIEW (p in [0.00, 0.04])
  if (p < 0.04) {
    return hubPose;
  }

  // 2. P1_APPROACH (p in [0.04, 0.10]) — Lerp from Hub Overview -> Inspection Pose
  if (p < 0.10) {
    const t = easeInOutCubic((p - 0.04) / 0.06);
    return {
      position: [
        hubPose.position[0] + (inspectionPose.position[0] - hubPose.position[0]) * t,
        hubPose.position[1] + (inspectionPose.position[1] - hubPose.position[1]) * t,
        hubPose.position[2] + (inspectionPose.position[2] - hubPose.position[2]) * t,
      ],
      target: [
        hubPose.target[0] + (inspectionPose.target[0] - hubPose.target[0]) * t,
        hubPose.target[1] + (inspectionPose.target[1] - hubPose.target[1]) * t,
        hubPose.target[2] + (inspectionPose.target[2] - hubPose.target[2]) * t,
      ],
      fov: hubPose.fov + (inspectionPose.fov - hubPose.fov) * t,
    };
  }

  // 3. Project 1 Arrival through Read Hold (p in [0.07, 0.25]) — Zero base camera movement
  if (p < 0.25) {
    return inspectionPose;
  }

  // 4. Project 1 Departure & Travel 1 -> 2 (p in [0.25, 0.31]) — Small pullback arc
  if (p < 0.31) {
    const tTrans = (p - 0.25) / 0.06;
    const pullbackArc = Math.sin(Math.PI * tTrans) * 0.35;
    const fovDelta = Math.sin(Math.PI * tTrans) * 1.2;
    return {
      position: [inspectionPose.position[0], inspectionPose.position[1], inspectionPose.position[2] + pullbackArc],
      target: [inspectionPose.target[0], inspectionPose.target[1], inspectionPose.target[2]],
      fov: inspectionPose.fov + fovDelta,
    };
  }

  // 5. Project 2 Arrival through Read Hold (p in [0.31, 0.49]) — Zero base camera movement
  if (p < 0.49) {
    return inspectionPose;
  }

  // 6. Project 2 Departure & Travel 2 -> 3 (p in [0.49, 0.55]) — Small pullback arc
  if (p < 0.55) {
    const tTrans = (p - 0.49) / 0.06;
    const pullbackArc = Math.sin(Math.PI * tTrans) * 0.35;
    const fovDelta = Math.sin(Math.PI * tTrans) * 1.2;
    return {
      position: [inspectionPose.position[0], inspectionPose.position[1], inspectionPose.position[2] + pullbackArc],
      target: [inspectionPose.target[0], inspectionPose.target[1], inspectionPose.target[2]],
      fov: inspectionPose.fov + fovDelta,
    };
  }

  // 7. Project 3 Arrival through Read Hold (p in [0.55, 0.73]) — Zero base camera movement
  if (p < 0.73) {
    return inspectionPose;
  }

  // 8. Project 3 Departure & Travel 3 -> 4 (p in [0.73, 0.79]) — Small pullback arc
  if (p < 0.79) {
    const tTrans = (p - 0.73) / 0.06;
    const pullbackArc = Math.sin(Math.PI * tTrans) * 0.35;
    const fovDelta = Math.sin(Math.PI * tTrans) * 1.2;
    return {
      position: [inspectionPose.position[0], inspectionPose.position[1], inspectionPose.position[2] + pullbackArc],
      target: [inspectionPose.target[0], inspectionPose.target[1], inspectionPose.target[2]],
      fov: inspectionPose.fov + fovDelta,
    };
  }

  // 9. Project 4 Arrival through Read Hold (p in [0.79, 0.96]) — Zero base camera movement
  if (p < 0.96) {
    return inspectionPose;
  }

  // 10. Project 4 Departure & UX Surface Extraction (p in [0.96, 1.00])
  const tExt = easeInOutCubic((p - 0.96) / 0.04);
  const exitZ = isMobile ? 5.5 : 4.5;
  return {
    position: [
      inspectionPose.position[0],
      inspectionPose.position[1],
      inspectionPose.position[2] + (exitZ - inspectionPose.position[2]) * tExt,
    ],
    target: [inspectionPose.target[0], inspectionPose.target[1], inspectionPose.target[2]],
    fov: inspectionPose.fov,
  };
}

export function CameraController() {
  const { camera, scene } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const pointer = usePointerInfluence();

  const currentPosition = useRef(new Vector3());
  const currentTarget = useRef(new Vector3());
  const targetVecRef = useRef(new Vector3());
  const targetPosRef = useRef(new Vector3());
  const currentFov = useRef(50);
  const isInitialized = useRef(false);

  const effectiveKeyframes = useMemo(() => {
    if (!isMobileDevice()) return SCENE_CAMERA_KEYFRAMES;

    const overridden = { ...SCENE_CAMERA_KEYFRAMES };
    for (const [sceneId, states] of Object.entries(SCENE_CAMERA_KEYFRAMES)) {
      if (states.mobile) {
        overridden[sceneId as keyof typeof SCENE_CAMERA_KEYFRAMES] = {
          ...states,
          approach: states.mobile.approach,
          enter:    states.mobile.enter,
          exit:     states.mobile.exit,
        };
      }
    }
    return overridden;
  }, []);

  useFrame((_, delta) => {
    let pose = resolveCameraPose(
      scrollProgress,
      SEGMENTS,
      effectiveKeyframes
    );

    const isMobile = isMobileDevice();
    const scene03 = SEGMENTS.find((s) => s.sceneId === "scene-03-architecture");
    if (scene03 && scrollProgress >= scene03.start && scrollProgress <= scene03.end) {
      if (reducedMotion) {
        pose = isMobile
          ? { position: [0, 0.0, 6.0], target: [0, 0, 0], fov: 46 }
          : { position: [0.50, 0.0, 5.4], target: [0.55, 0.0, 0], fov: 50 };
      } else {
        const localT = (scrollProgress - scene03.start) / (scene03.end - scene03.start || 1);
        pose = resolveScene03Pose(localT, isMobile);
      }
    }

    const scene04 = SEGMENTS.find((s) => s.sceneId === "scene-04-projects");
    if (scene04 && scrollProgress >= scene04.start && scrollProgress <= scene04.end) {
      if (reducedMotion) {
        pose = isMobile
          ? { position: [0, 0.0, 3.8], target: [0, 0, 0], fov: 42 }
          : { position: [0.0, 0.0, 6.0], target: [0, 0, 0], fov: 46 };
      } else {
        const localT = (scrollProgress - scene04.start) / (scene04.end - scene04.start || 1);
        pose = resolveScene04Pose(localT, isMobile);
      }
    }

    const targetVec = targetVecRef.current.set(pose.target[0], pose.target[1], pose.target[2]);
    const targetPos = targetPosRef.current.set(pose.position[0], pose.position[1], pose.position[2]);

    // Apply restrained mouse-reactive depth parallax for Scene 03 & 04 desktop presentation
    if (scene03 && scrollProgress >= scene03.start && scrollProgress <= scene03.end && !isMobile && !reducedMotion) {
      const mouseOffsetX = pointer.smoothX * 0.18;
      const mouseOffsetY = -pointer.smoothY * 0.10;
      targetPos.x += mouseOffsetX * 0.5;
      targetPos.y += mouseOffsetY * 0.5;
      targetVec.x += mouseOffsetX * 0.2;
      targetVec.y += mouseOffsetY * 0.2;
    }

    if (scene04 && scrollProgress >= scene04.start && scrollProgress <= scene04.end && !isMobile && !reducedMotion) {
      const mouseOffsetX = pointer.smoothX * 0.09;
      const mouseOffsetY = -pointer.smoothY * 0.05;
      targetPos.x += mouseOffsetX;
      targetPos.y += mouseOffsetY;
      targetVec.x += mouseOffsetX * 0.4;
      targetVec.y += mouseOffsetY * 0.4;
    }

    // Apply custom storyboard locked camera path for Scene 01
    const scene01 = SEGMENTS[0];
    if (scrollProgress < scene01.end) {
      const p = Math.min(1, Math.max(0, scrollProgress / scene01.end));
      const enterZ = effectiveKeyframes["scene-01-opening"].enter.position[2];
      const enterY = effectiveKeyframes["scene-01-opening"].enter.position[1];
      if (p >= 0.74 && p <= 0.90) {
        const pushT = (p - 0.74) / (0.90 - 0.74);
        const eased = pushT * pushT * (3 - 2 * pushT);
        targetPos.z = enterZ - eased * 0.6;
        targetPos.y = enterY - eased * 0.04;
      } else if (p > 0.90) {
        const exitZ = effectiveKeyframes["scene-01-opening"].exit.position[2];
        const exitT = (p - 0.90) / (1.00 - 0.90);
        const eased = exitT * exitT * (3 - 2 * exitT);
        targetPos.set(0, enterY * (1 - eased), (enterZ - 0.6) - eased * ((enterZ - 0.6) - exitZ));
      }
    }

    if (!isInitialized.current || reducedMotion) {
      currentPosition.current.copy(targetPos);
      currentTarget.current.copy(targetVec);
      currentFov.current = pose.fov;
      isInitialized.current = true;
    } else {
      const lerpFactor = 1 - Math.exp(-3.2 * delta);
      currentPosition.current.lerp(targetPos, lerpFactor);
      currentTarget.current.lerp(targetVec, lerpFactor);
      currentFov.current += (pose.fov - currentFov.current) * lerpFactor;
    }

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentTarget.current);

    if (camera instanceof PerspectiveCamera) {
      camera.fov = currentFov.current;
      camera.updateProjectionMatrix();
    }

    // Debug / Capture Bridge — exposed only when debug query or progress testing is active
    if (typeof window !== "undefined" && (import.meta.env.DEV || window.location.search.includes("s04debug=true") || window.location.search.includes("progress="))) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__r3fState = {
        camera,
        scene,
        cameraPose: {
          globalProgress: scrollProgress,
          position: [currentPosition.current.x, currentPosition.current.y, currentPosition.current.z],
          target: [currentTarget.current.x, currentTarget.current.y, currentTarget.current.z],
          fov: currentFov.current,
          viewportBranch: isMobile ? "mobile" : "desktop",
          pointerState: {
            smoothX: pointer.smoothX,
            smoothY: pointer.smoothY,
            cameraTargetOffset: [
              scene04 && scrollProgress >= scene04.start && scrollProgress <= scene04.end && !isMobile && !reducedMotion ? pointer.smoothX * 0.09 * 0.4 : 0,
              scene04 && scrollProgress >= scene04.start && scrollProgress <= scene04.end && !isMobile && !reducedMotion ? -pointer.smoothY * 0.05 * 0.4 : 0,
              0
            ]
          }
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).THREE = THREE;
    }
  });

  return null;
}

export default CameraController;