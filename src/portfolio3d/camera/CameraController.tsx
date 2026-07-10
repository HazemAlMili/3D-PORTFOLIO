import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, PerspectiveCamera } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { resolveCameraPose } from "./CameraDirector";
import { SCENE_CAMERA_KEYFRAMES } from "./cameraKeyframes";
import { buildSceneSegments } from "../scroll/scrollSegments";

const SEGMENTS = buildSceneSegments();

export function CameraController() {
  const { camera } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const currentPosition = useRef(new Vector3());
  const currentTarget = useRef(new Vector3());
  const currentFov = useRef(50);
  const isInitialized = useRef(false);

  useFrame((_, delta) => {
    const pose = resolveCameraPose(
      scrollProgress,
      SEGMENTS,
      SCENE_CAMERA_KEYFRAMES
    );

    const targetVec = new Vector3(pose.target[0], pose.target[1], pose.target[2]);
    const targetPos = new Vector3(pose.position[0], pose.position[1], pose.position[2]);

    if (!isInitialized.current || reducedMotion) {
      currentPosition.current.copy(targetPos);
      currentTarget.current.copy(targetVec);
      currentFov.current = pose.fov;
      isInitialized.current = true;
    } else {
      // Frame-rate independent damp chasing (speed = 3.5 for heavy cinematic rig tracking)
      const lerpFactor = 1 - Math.exp(-3.5 * delta);
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