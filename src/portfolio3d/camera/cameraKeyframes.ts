import type { SceneCameraStates } from "./cameraTypes";
import type { SceneId } from "../content/types";

/**
 * PLACEHOLDER keyframes for all 8 scenes.
 *
 * These values are temporary and will be replaced with real
 * geometry-based calculations once the GLB devices are available.
 *
 * Current pattern:
 * - approach: camera at distance Z=10-15
 * - enter: camera moves closer to Z=3-5
 * - exit: camera pulls back to approach distance
 */
export const SCENE_CAMERA_KEYFRAMES: Record<SceneId, SceneCameraStates> = {
  "scene-01-opening": {
    approach: { position: [0, 0, 15], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 5], target: [0, 0, 0], fov: 45 },
    exit: { position: [0, 0, 15], target: [0, 0, 0], fov: 50 },
  },
  "scene-02-hero": {
    approach: { position: [0, 0, 14], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 4], target: [0, 0, 0], fov: 45 },
    exit: { position: [0, 0, 14], target: [0, 0, 0], fov: 50 },
  },
  "scene-03-architecture": {
    approach: { position: [0, 0, 13], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 4], target: [0, 0, 0], fov: 45 },
    exit: { position: [0, 0, 13], target: [0, 0, 0], fov: 50 },
  },
  "scene-04-projects": {
    approach: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 3.5], target: [0, 0, 0], fov: 42 },
    exit: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
  },
  "scene-05-product-ux": {
    approach: { position: [0, 0, 11], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 3.5], target: [0, 0, 0], fov: 42 },
    exit: { position: [0, 0, 11], target: [0, 0, 0], fov: 50 },
  },
  "scene-06-responsive-performance": {
    approach: { position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 3], target: [0, 0, 0], fov: 40 },
    exit: { position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
  },
  "scene-07-system-core": {
    approach: { position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 3], target: [0, 0, 0], fov: 40 },
    exit: { position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
  },
  "scene-08-contact": {
    approach: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 4], target: [0, 0, 0], fov: 45 },
    exit: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
  },
};
