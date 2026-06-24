import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, PerspectiveCamera } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { resolveCameraPose } from "./CameraDirector";
import { SCENE_CAMERA_KEYFRAMES } from "./cameraKeyframes";
import { buildSceneSegments } from "../scroll/scrollSegments";
import type { CameraPose } from "./cameraTypes";

const SEGMENTS = buildSceneSegments();

export function CameraController() {
  const { camera } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const smoothProgressRef = useRef(0);
  const prevPoseRef = useRef<CameraPose | null>(null);

  useFrame(() => {
    const target = scrollProgress;

    // Cinematic progress smoothing (damping)
    if (reducedMotion) {
      smoothProgressRef.current = target;
    } else {
      const delta = target - smoothProgressRef.current;
      const dampFactor = 0.06; // Tune this for weight
      smoothProgressRef.current += delta * dampFactor;
      // Edge case: if delta is extremely small, snap to target to avoid micro-drift
      if (Math.abs(delta) < 0.0005) {
        smoothProgressRef.current = target;
      }
    }

    const pose = resolveCameraPose(
      smoothProgressRef.current,
      SEGMENTS,
      SCENE_CAMERA_KEYFRAMES
    );

    const targetVec = new Vector3(pose.target[0], pose.target[1], pose.target[2]);

    if (camera instanceof PerspectiveCamera) {
      camera.position.set(pose.position[0], pose.position[1], pose.position[2]);
      camera.lookAt(targetVec);
      camera.fov = pose.fov;
      camera.updateProjectionMatrix();
    } else {
      camera.position.set(pose.position[0], pose.position[1], pose.position[2]);
      camera.lookAt(targetVec);
    }

    prevPoseRef.current = pose;
  });

  return null; // This is a controller component with no UI
}
