/**
 * Scene segment definitions and scroll weight constants.
 *
 * This file defines the scroll segmentation only.
 * It must not contain React hooks, DOM access, store access, or camera logic.
 */

export interface SceneSegment {
  sceneId: string;
  start: number; // global progress 0–1
  end: number; // global progress 0–1
  subPhases: {
    approach: [number, number]; // local 0–1 range within this segment
    enter: [number, number];
    immerse: [number, number];
    exit: [number, number];
  };
}

// Pacing Recalibration — Post-Final Cinematic Repair / Task 1
// Scene 01: 0.16→0.13 (cinematic intro, tighter; sub-phase fix compensates)
// Scene 02: 0.14     (kept — hero identity needs scroll room; sub-phase improved)
// Scene 03: 0.08→0.13 (CRITICAL FIX — architecture is content-dense; was too short)
// Scene 04: 0.18→0.16 (slightly reduced; hold phase is the priority)
// Scene 05: 0.12→0.13 (increased — 4-step UX flow needs more hold room)
// Scene 06: 0.10→0.11 (increased — phone approach deserves more runway)
// Scene 07: 0.12     (kept — system core is well balanced)
// Scene 08: 0.10→0.09 (contact scene is simpler; approach is generous)
// Total: 0.13+0.14+0.13+0.16+0.13+0.11+0.12+0.09 = 1.01 — adjust 08 to 0.08
// 0.13+0.14+0.13+0.16+0.13+0.11+0.12+0.08 = 1.00 ✅
export const SCROLL_WEIGHTS = [0.13, 0.14, 0.13, 0.16, 0.13, 0.11, 0.12, 0.08];

export const SCENE_IDS = [
  "scene-01-opening",
  "scene-02-hero",
  "scene-03-architecture",
  "scene-04-projects",
  "scene-05-product-ux",
  "scene-06-responsive-performance",
  "scene-07-system-core",
  "scene-08-contact",
] as const;

export function buildSceneSegments(weights: number[] = SCROLL_WEIGHTS): SceneSegment[] {
  let cursor = 0;
  return weights.map((w, i) => {
    const start = cursor;
    const end = cursor + w;
    cursor = end;
    const sceneId = SCENE_IDS[i];
    return {
      sceneId,
      start,
      end,
      subPhases: sceneId === "scene-01-opening"
        ? {
            // Scene 01 — cinematic portal: gradual pullback reveal, long hold
            approach: [0.00, 0.25],
            enter:    [0.25, 0.42],
            immerse:  [0.42, 0.82],
            exit:     [0.82, 1.00],
          }
        : sceneId === "scene-02-hero"
        ? {
            // Scene 02 — hero identity: meaningful approach, 4-step hold
            approach: [0.00, 0.28],
            enter:    [0.28, 0.45],
            immerse:  [0.45, 0.82],
            exit:     [0.82, 1.00],
          }
        : sceneId === "scene-03-architecture"
        ? {
            // Scene 03 — architecture: wider approach, 5-layer stack hold
            approach: [0.00, 0.32],
            enter:    [0.32, 0.48],
            immerse:  [0.48, 0.84],
            exit:     [0.84, 1.00],
          }
        : sceneId === "scene-04-projects"
        ? {
            // Scene 04 — projects: cinematic laptop approach & hold
            approach: [0.00, 0.32],
            enter:    [0.32, 0.48],
            immerse:  [0.48, 0.86],
            exit:     [0.86, 1.00],
          }
        : sceneId === "scene-05-product-ux"
        ? {
            // Scene 05 — product UX: cinematic tablet approach & hold
            approach: [0.00, 0.30],
            enter:    [0.30, 0.46],
            immerse:  [0.46, 0.85],
            exit:     [0.85, 1.00],
          }
        : sceneId === "scene-06-responsive-performance"
        ? {
            // Scene 06 — responsive & performance: smooth phone approach
            approach: [0.00, 0.30],
            enter:    [0.30, 0.48],
            immerse:  [0.48, 0.85],
            exit:     [0.85, 1.00],
          }
        : sceneId === "scene-07-system-core"
        ? {
            // Scene 07 — system core: orbital approach, node constellation hold
            approach: [0.00, 0.30],
            enter:    [0.30, 0.46],
            immerse:  [0.46, 0.86],
            exit:     [0.86, 1.00],
          }
        : sceneId === "scene-08-contact"
        ? {
            // Scene 08 — final contact: wide reveal, lockup hold
            approach: [0.00, 0.35],
            enter:    [0.35, 0.52],
            immerse:  [0.52, 0.90],
            exit:     [0.90, 1.00],
          }
        : {
            // Fallback default — should not be reached with 8 known scene IDs
            approach: [0.00, 0.30],
            enter:    [0.30, 0.48],
            immerse:  [0.48, 0.84],
            exit:     [0.84, 1.00],
          },
    };
  });
}
