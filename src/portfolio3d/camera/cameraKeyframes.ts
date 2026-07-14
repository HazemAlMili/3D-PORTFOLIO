import type { SceneCameraStates } from "./cameraTypes";
import type { SceneId } from "../content/types";

/**
 * Camera keyframes for all 8 scenes.
 *
 * Pacing Recalibration — Post-Final Cinematic Repair / Task 1
 *
 * Key principle: the `enter` keyframe IS the reading position.
 * CameraDirector holds at `enter` during the entire immerse phase.
 * Therefore enter must be a comfortable, content-readable distance —
 * NOT inside the screen bezel.
 *
 * Before: approach Z=12–14, enter Z=0.8 (zoomed inside bezel — unreadable)
 * After:  approach Z=8–9,   enter Z=2.0–3.5 (framed device — readable)
 *
 * Exit returns to a pullback similar to approach, ready for the next scene's
 * approach interpolation.
 */
export const SCENE_CAMERA_KEYFRAMES: Record<SceneId, SceneCameraStates> = {
  "scene-01-opening": {
    // System Boot Cinematic Camera Sequence
    // Approach: Wide, mysterious cinematic start
    // Enter: Comfortable mid-distance framing name, role, and orbit
    // Exit: Camera enters the portal center [0, 0, -0.2]
    approach: { position: [0, 0.15, 7.5], target: [0, 0, 0], fov: 48 },
    enter:    { position: [0, 0.05, 3.8], target: [0, 0, 0], fov: 50 },
    exit:     { position: [0, 0.0, 0.9], target: [0, 0, -0.2], fov: 58 },
    // Mobile: pull back further and widen FOV so the shell doesn't clip screen edges
    // Y=0 on enter/approach for perfect vertical centering (desktop uses slight Y tilt)
    mobile: {
      approach: { position: [0, 0.0, 9.0], target: [0, 0, 0], fov: 44 },
      enter:    { position: [0, 0.0, 5.5], target: [0, 0, 0], fov: 44 },
      exit:     { position: [0, 0.0, 1.2], target: [0, 0, -0.2], fov: 54 },
    },
  },

  "scene-02-hero": {
    // Approach: continuous spatial emergence out of Scene 01 portal exit [0, 0.0, 0.9]
    // Enter: centered overview framing the centered DOM Mission HUD & large orbits
    // Exit: angled pullback aligned with Scene 03 Architecture entry route
    approach: { position: [0, 0.1, 1.2],  target: [0, 0, -0.2], fov: 58 },
    enter:    { position: [0, 0.0, 3.8], target: [0, 0, 0], fov: 55 },
    exit:     { position: [0.4, 0.2, 7.5], target: [0.3, 0.1, 0], fov: 52 },
    // Mobile: pull back so orbit system doesn't swallow the mission text
    // Target [0,0,0] matches mobile-centered HeroCommandNode (groupX=0)
    mobile: {
      approach: { position: [0, 0.1, 1.5],  target: [0, 0, -0.2], fov: 54 },
      enter:    { position: [0, 0.0, 6.0],  target: [0, 0, 0],    fov: 46 },
      exit:     { position: [0, 0.2, 9.0],  target: [0, 0, 0],    fov: 46 },
    },
  },

  "scene-03-architecture": {
    // Approach: wide shot — full ultra-wide monitor visible from the side
    // Enter: front-facing close frame — architecture layers readable
    // Exit: pull back and hand off to projects
    approach: { position: [0.5, 0.2, 7.0],  target: [0, 0, 0], fov: 52 },
    enter:    { position: [0,   0,   2.2],  target: [0, 0, 0], fov: 70 },
    exit:     { position: [0,   0.2, 8.5],  target: [0, 0, 0], fov: 52 },
  },

  "scene-04-projects": {
    // Approach: overview — laptop visible in environment
    // Enter: comfortable laptop screen framing — slide deck readable
    // Exit: pull back for product UX handoff
    approach: { position: [0.3, 0.2, 8.0],  target: [0, 0.1, 0], fov: 52 },
    enter:    { position: [0,   0,   2.2],  target: [0, 0.1, 0], fov: 68 },
    exit:     { position: [0,   0.2, 8.5],  target: [0, 0,   0], fov: 52 },
  },

  "scene-05-product-ux": {
    // Approach: tablet visible from slight angle
    // Enter: tablet framing — UX flow steps readable at comfortable distance
    // Exit: pull back for responsive scene
    approach: { position: [0.2, 0.1, 8.0],  target: [0, 0, 0], fov: 52 },
    enter:    { position: [0,   0,   3.5],  target: [0, 0, 0], fov: 65 },
    exit:     { position: [0,   0.1, 8.5],  target: [0, 0, 0], fov: 52 },
  },

  "scene-06-responsive-performance": {
    // Approach: wide view — phone visible in space with breathing room
    // Enter: comfortable phone framing — responsive grid and content readable
    // Mobile: FOV kept lower to prevent phone cropping on narrow viewports
    approach: { position: [0, 0.1, 8.0],  target: [0, 0, 0], fov: 50 },
    enter:    { position: [0, 0,   4.0],  target: [0, 0, 0], fov: 44 },
    exit:     { position: [0, 0.1, 8.5],  target: [0, 0, 0], fov: 50 },
  },

  "scene-07-system-core": {
    // Preserved from Phase 9 — already 3D-specific and well tuned
    // Minor: approach Y lowered slightly for better orbital reveal
    approach: { position: [0.0, 1.6, 6.2], target: [0, -0.15, 0], fov: 48 },
    enter:    { position: [1.2, 1.0, 3.8], target: [0, -0.15, 0], fov: 42 },
    exit:     { position: [0.0, 1.6, 8.5], target: [0, 0,     0], fov: 50 },
  },

  "scene-08-contact": {
    // Preserved from Phase 10 — already well tuned for the final contact lockup
    approach: { position: [0.0, 0.6, 12.0], target: [0.0, 0.15, 0.0], fov: 50 },
    enter:    { position: [0.0, 0.28, 4.2], target: [0.0, 0.15, 0.0], fov: 44 },
    exit:     { position: [0.0, 0.45, 11.0], target: [0.0, 0.15, 0.0], fov: 50 },
  },
};
