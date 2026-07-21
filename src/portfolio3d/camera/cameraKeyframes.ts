import type { SceneCameraStates, CameraPose } from "./cameraTypes";
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
    // Product Assembly Engine — cinematic side angle from the right
    // Exposes product right-side physical depth, maintains negative space with left HUD
    approach: { position: [4.1, 0.4, 8.5], target: [1.7, 0.0, 0], fov: 50 },
    enter:    { position: [3.7, 0.1, 4.7], target: [1.8, 0.0, 0], fov: 48 },
    exit:     { position: [4.1, 0.4, 8.5], target: [1.7, 0.0, 0], fov: 50 },
    // Mobile: subtle right-side angle to fit portrait aspect ratios without clipping
    mobile: {
      approach: { position: [1.2, 0.1, 8.5], target: [0, -0.2, 0], fov: 46 },
      enter:    { position: [1.1, 0.05, 5.2], target: [0, -0.2, 0], fov: 46 },
      exit:     { position: [1.2, 0.1, 9.0], target: [0, -0.2, 0], fov: 46 },
    },
  },


  "scene-04-projects": {
    // Project Proof Rail — 7-Beat Camera Sequence (S04-P02 Shot Bible)
    // Approach (Beat 01): [0.8, 0.3, 7.2] -> receiving dock follow
    // Enter (Beat 06):    [0.95, 0.08, 2.35] -> locked hero readability composition
    // Exit (Beat 07):     [0.3, 0.18, 7.8] -> UX extraction pullback toward Scene 05
    approach: { position: [0.80, 0.30, 7.20], target: [0.10, 0.30, 0.10], fov: 50 },
    enter:    { position: [0.95, 0.08, 2.35], target: [0.95, 0.08, 0.00], fov: 48 },
    exit:     { position: [0.30, 0.18, 7.80], target: [0.00, 0.00, 0.00], fov: 52 },
    mobile: {
      approach: { position: [0.00, 0.20, 8.50], target: [0.00, 0.30, 0.10], fov: 46 },
      enter:    { position: [0.00, 0.00, 3.80], target: [0.00, 0.00, 0.00], fov: 42 },
      exit:     { position: [0.00, 0.20, 8.20], target: [0.00, 0.00, 0.00], fov: 48 },
    },
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

export interface CameraBeat {
  start: number;
  end: number;
  desktop: CameraPose;
  mobile: CameraPose;
}

export const SCENE_03_CAMERA_BEATS: CameraBeat[] = [
  {
    start: 0.00,
    end: 0.12,
    // Beat 1 - Discovery Entry: Wide three-quarter side view establishing physical screen object
    desktop: { position: [3.8, 0.45, 5.8], target: [1.7, 0.0, 0], fov: 48 },
    mobile: { position: [1.2, 0.05, 7.0], target: [0, -0.2, 0], fov: 44 }
  },
  {
    start: 0.12,
    end: 0.26,
    // Beat 2 - Side Reveal: Increase lateral perspective, revealing frame thickness & layers
    desktop: { position: [3.9, 0.4, 5.2], target: [1.7, 0.0, 0], fov: 48 },
    mobile: { position: [1.2, 0.05, 6.6], target: [0, -0.2, 0], fov: 44 }
  },
  {
    start: 0.26,
    end: 0.42,
    // Beat 3 - Push-In Assembly: Move closer to central INTERACTION region without flattening
    desktop: { position: [3.4, 0.2, 4.0], target: [1.8, 0.1, 0], fov: 48 },
    mobile: { position: [0.9, 0.0, 5.2], target: [0, -0.2, 0], fov: 44 }
  },
  {
    start: 0.42,
    end: 0.58,
    // Beat 4 - Top / Inspection Angle: Elevate slightly for stack inspection while preserving side depth
    desktop: { position: [3.5, 0.9, 4.2], target: [1.8, -0.1, 0], fov: 46 },
    mobile: { position: [1.0, 0.6, 5.4], target: [0, -0.2, 0], fov: 44 }
  },
  {
    start: 0.58,
    end: 0.86,
    // Beat 5 - Optimization Motion: Settle and reduce camera motion during optimization sweep
    desktop: { position: [3.7, 0.1, 4.6], target: [1.8, 0.0, 0], fov: 48 },
    mobile: { position: [1.1, -0.08, 5.2], target: [0, -0.2, 0], fov: 44 }
  },
  {
    start: 0.86,
    end: 0.94,
    // Beat 6 - Hero Reveal: Settle into premium stable three-quarter product portrait
    desktop: { position: [3.7, 0.1, 4.7], target: [1.8, 0.0, 0], fov: 48 },
    mobile: { position: [1.1, 0.0, 5.2], target: [0, -0.2, 0], fov: 44 }
  },
  {
    start: 0.94,
    end: 1.00,
    // Beat 7 - Launch Framing: Maintain side angle while preparing the Scene 03 -> Scene 04 handoff
    desktop: { position: [3.9, 0.15, 5.6], target: [1.7, 0.0, 0], fov: 48 },
    mobile: { position: [1.2, 0.05, 7.0], target: [0, -0.2, 0], fov: 44 }
  }
];

export const SCENE_04_CAMERA_BEATS: CameraBeat[] = [
  {
    start: 0.00,
    end: 0.12,
    // Beat 01 — Incoming Follow: Follow handoff seed onto receiving dock
    desktop: { position: [0.80, 0.30, 7.20], target: [0.10, 0.30, 0.10], fov: 50 },
    mobile:  { position: [0.00, 0.20, 8.50], target: [0.00, 0.30, 0.10], fov: 46 },
  },
  {
    start: 0.12,
    end: 0.27,
    // Beat 02 — Gallery Reveal: Lateral curve exposing proof rail and gallery depth
    desktop: { position: [2.20, 0.40, 6.00], target: [0.80, 0.20, -0.50], fov: 52 },
    mobile:  { position: [0.80, 0.30, 7.80], target: [0.20, 0.20, -0.50], fov: 46 },
  },
  {
    start: 0.27,
    end: 0.42,
    // Beat 03 — Project Establishment: Active project 3/4 side angle establishment
    desktop: { position: [1.80, 0.25, 4.20], target: [1.10, 0.10, 0.00], fov: 52 },
    mobile:  { position: [0.50, 0.10, 5.80], target: [0.10, 0.00, 0.00], fov: 44 },
  },
  {
    start: 0.42,
    end: 0.60,
    // Beat 04 — Inspection Arc: Reveal physical construction and structural layers
    desktop: { position: [1.40, 0.15, 3.20], target: [1.10, 0.10, 0.00], fov: 50 },
    mobile:  { position: [0.30, 0.05, 4.80], target: [0.00, 0.00, 0.00], fov: 44 },
  },
  {
    start: 0.60,
    end: 0.74,
    // Beat 05 — Proof Push-In: Controlled push-in to readable proof perspective
    desktop: { position: [1.10, 0.10, 2.60], target: [1.00, 0.10, 0.00], fov: 48 },
    mobile:  { position: [0.15, 0.00, 4.20], target: [0.00, 0.00, 0.00], fov: 44 },
  },
  {
    start: 0.74,
    end: 0.88,
    // Beat 06 — Hero Readability Lock: Stable hero readability composition (Left HUD 32%, Right Project 56%)
    desktop: { position: [0.95, 0.08, 2.35], target: [0.95, 0.08, 0.00], fov: 48 },
    mobile:  { position: [0.00, 0.00, 3.80], target: [0.00, 0.00, 0.00], fov: 42 },
  },
  {
    start: 0.88,
    end: 1.00,
    // Beat 07 — UX Extraction: Extraction pullback following UX surface into Scene 05
    desktop: { position: [0.30, 0.18, 7.80], target: [0.00, 0.00, 0.00], fov: 52 },
    mobile:  { position: [0.00, 0.20, 8.20], target: [0.00, 0.00, 0.00], fov: 48 },
  },
];


