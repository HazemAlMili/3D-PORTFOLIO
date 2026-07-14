import { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, PerspectiveCamera } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { resolveCameraPose } from "./CameraDirector";
import { SCENE_CAMERA_KEYFRAMES } from "./cameraKeyframes";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { isMobileDevice } from "../utils/mobileUtils";

const SEGMENTS = buildSceneSegments();

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
    const pose = resolveCameraPose(
      scrollProgress,
      SEGMENTS,
      effectiveKeyframes
    );

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