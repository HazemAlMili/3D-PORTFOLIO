import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
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
  const sceneLocalProgress = usePortfolioStore((state) => state.sceneLocalProgress);

  const prevPoseRef = useRef<CameraPose | null>(null);

  useEffect(() => {
    // Apply across all sub-phases: Approach (0–0.25), Enter (0.25–0.45), Immerse (0.45–0.8), Exit (0.8–1.0)
    // resolveCameraPose handles interpolation and seamless handoff to the next scene
    if (sceneLocalProgress >= 0 && sceneLocalProgress <= 1.0) {
      const pose = resolveCameraPose(
        scrollProgress,
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
    }
    // Else: do nothing — camera holds its current pose
  }, [scrollProgress, sceneLocalProgress, camera]);

  return null; // This is a controller component with no UI
}
