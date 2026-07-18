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
    // Product Assembly Engine — large product object anchored right of center
    // Approach: pull back enough to see full product + left HUD in frame
    // Enter:    slight right bias to frame product hero, comfortable FOV
    // Exit:     pull back toward Scene 04 approach
    approach: { position: [0.6, 0.1, 8.0], target: [0.5, 0, 0], fov: 50 },
    enter:    { position: [0.60, 0.0, 5.0], target: [0.85, 0, 0], fov: 50 },
    exit:     { position: [0.6, 0.1, 8.0], target: [0.5, 0, 0], fov: 50 },
    // Mobile: centered, product fills vertical space
    mobile: {
      approach: { position: [0, 0.0, 8.5], target: [0, 0, 0], fov: 46 },
      enter:    { position: [0, 0.0, 6.0], target: [0, 0, 0], fov: 46 },
      exit:     { position: [0, 0.0, 9.0], target: [0, 0, 0], fov: 46 },
    },
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

export interface CameraBeat {
  start: number;
  end: number;
  desktop: CameraPose;
  mobile: CameraPose;
}

export const SCENE_03_CAMERA_BEATS: CameraBeat[] = [
  {
    start: 0.00,
    end: 0.14,
    // Beat 1 - Discovery Entry: transition from Scene 02 exit to offset entry framing
    desktop: { position: [0.60, 0.10, 6.2], target: [0.55, 0.0, 0], fov: 50 },
    mobile: { position: [0, 0.1, 8.5], target: [0, 0, 0], fov: 46 }
  },
  {
    start: 0.14,
    end: 0.30,
    // Beat 2 - Side Reveal: swing rightward to create parallax showing build area
    desktop: { position: [0.75, 0.15, 5.8], target: [0.55, 0.0, 0], fov: 50 },
    mobile: { position: [0.15, 0.05, 8.0], target: [0, 0, 0], fov: 46 }
  },
  {
    start: 0.30,
    end: 0.48,
    // Beat 3 - Push-In Assembly: move in close to the build area, lower and focus
    desktop: { position: [0.60, -0.05, 4.4], target: [0.55, 0.0, 0], fov: 50 },
    mobile: { position: [0, -0.05, 6.2], target: [0, 0, 0], fov: 46 }
  },
  {
    start: 0.48,
    end: 0.62,
    // Beat 4 - Top / Inspection Angle: elevate camera to inspect stacked layers
    desktop: { position: [0.55, 1.00, 5.0], target: [0.55, -0.05, 0], fov: 48 },
    mobile: { position: [0, 0.6, 6.5], target: [0, -0.05, 0], fov: 46 }
  },
  {
    start: 0.62,
    end: 0.80,
    // Beat 5 - Optimization Motion: low-angle dynamic sweep to support the wave
    desktop: { position: [0.45, -0.20, 4.6], target: [0.55, 0.0, 0], fov: 52 },
    mobile: { position: [-0.1, -0.15, 6.3], target: [0, 0, 0], fov: 46 }
  },
  {
    start: 0.80,
    end: 0.92,
    // Beat 6 - Hero Reveal: settle into premium aligned product portrait framing
    desktop: { position: [0.50, 0.0, 5.4], target: [0.55, 0.0, 0], fov: 50 },
    mobile: { position: [0, 0.0, 6.0], target: [0, 0, 0], fov: 46 }
  },
  {
    start: 0.92,
    end: 1.00,
    // Beat 7 - Launch Framing: track bottom-right/forward to handoff to Scene 04
    desktop: { position: [0.60, 0.10, 7.8], target: [0.50, 0.0, 0], fov: 50 },
    mobile: { position: [0, 0.0, 9.0], target: [0, 0, 0], fov: 46 }
  }
];

