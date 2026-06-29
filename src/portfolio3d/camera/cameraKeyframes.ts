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
    approach: { position: [0, 0.3, 12], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 0.8], target: [0, 0, 0], fov: 80 },
    exit: { position: [0, 0.3, 12], target: [0, 0, 0], fov: 50 },
  },
  "scene-02-hero": {
    approach: { position: [0, 0, 14], target: [0, 0, 0], fov: 50 },
    // enter: close approach — device fills viewport, gives "inside the screen" feel.
    // MainDisplay front face is at Z=+0.15 (depth 0.3), so Z=0.8 clears it safely.
    enter: { position: [0, 0, 0.8], target: [0, 0, 0], fov: 78 },
    exit:  { position: [0, 0, 14], target: [0, 0, 0], fov: 50 },
  },
  "scene-03-architecture": {
    approach: { position: [0, 0, 6.0], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 1.6], target: [0, 0, 0], fov: 75 },
    exit: { position: [0, 0, 14], target: [0, 0, 0], fov: 50 },
  },
  "scene-04-projects": {
    approach: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 0.8], target: [0, 0, 0], fov: 80 },
    exit: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
  },
  "scene-05-product-ux": {
    approach: { position: [0, 0, 11], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 2.8], target: [0, 0, 0], fov: 70 },
    exit: { position: [0, 0, 11], target: [0, 0, 0], fov: 50 },
  },
  "scene-06-responsive-performance": {
    approach: { position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 3], target: [0, 0, 0], fov: 40 },
    exit: { position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
  },
  "scene-07-system-core": {
    approach: { position: [0.0, 1.8, 6.2], target: [0, -0.15, 0], fov: 48 },
    enter: { position: [1.2, 1.0, 3.8], target: [0, -0.15, 0], fov: 42 },
    exit: { position: [0.0, 1.6, 8.5], target: [0, 0, 0], fov: 50 },
  },
  "scene-08-contact": {
    approach: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
    enter: { position: [0, 0, 4], target: [0, 0, 0], fov: 45 },
    exit: { position: [0, 0, 12], target: [0, 0, 0], fov: 50 },
  },
};
