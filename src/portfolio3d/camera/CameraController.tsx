import { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, PerspectiveCamera } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { resolveCameraPose, easeInOutCubic } from "./CameraDirector";
import { SCENE_CAMERA_KEYFRAMES, SCENE_03_CAMERA_BEATS } from "./cameraKeyframes";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { isMobileDevice } from "../utils/mobileUtils";

const SEGMENTS = buildSceneSegments();

function resolveScene03Pose(localProgress: number, isMobile: boolean): { position: [number, number, number]; target: [number, number, number]; fov: number } {
  // Scene 02 Exit Pose (Starting point of the first beat at localProgress = 0)
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

export function CameraController() {
  const { camera } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const currentPosition = useRef(new Vector3());
  const currentTarget = useRef(new Vector3());
  const currentFov = useRef(50);
  const isInitialized = useRef(false);

  // Compute effective keyframes once — replace scenes that have mobile variants
  // when running on a touch/mobile device
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

    const targetVec = new Vector3(pose.target[0], pose.target[1], pose.target[2]);
    const targetPos = new Vector3(pose.position[0], pose.position[1], pose.position[2]);

    // Apply custom storyboard locked camera path for Scene 01
    const scene01 = SEGMENTS[0];
    if (scrollProgress < scene01.end) {
      const p = Math.min(1, Math.max(0, scrollProgress / scene01.end));
      // Use the effective enter Z and Y (desktop Z=3.8 Y=0.05, mobile Z=5.5 Y=0.0)
      const enterZ = effectiveKeyframes["scene-01-opening"].enter.position[2];
      const enterY = effectiveKeyframes["scene-01-opening"].enter.position[1];
      if (p >= 0.74 && p <= 0.90) {
        // Subtle push toward kernel
        const pushT = (p - 0.74) / (0.90 - 0.74);
        const eased = pushT * pushT * (3 - 2 * pushT);
        targetPos.z = enterZ - eased * 0.6;
        targetPos.y = enterY - eased * 0.04;
      } else if (p > 0.90) {
        // Committed portal entry
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
      // Frame-rate independent damp chasing (speed = 3.2 for heavy cinematic rig tracking)
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
  });

  return null; // This is a controller component with no UI
}