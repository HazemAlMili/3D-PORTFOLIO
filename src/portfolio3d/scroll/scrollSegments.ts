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

// Scene 02 weight increased 0.10 → 0.14 (4-step content hold needs scroll room)
// Scene 03 reduced 0.12 → 0.08 (not yet aligned; compensates the added weight)
// Total: 0.16+0.14+0.08+0.18+0.12+0.10+0.12+0.10 = 1.00 ✅
export const SCROLL_WEIGHTS = [0.16, 0.14, 0.08, 0.18, 0.12, 0.10, 0.12, 0.10];

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
    const isScene01 = sceneId === "scene-01-opening";
    const isScene02 = sceneId === "scene-02-hero";
    const isScene03 = sceneId === "scene-03-architecture";
    const isScene04 = sceneId === "scene-04-projects";
    const isScene05 = sceneId === "scene-05-product-ux";
    return {
      sceneId,
      start,
      end,
      subPhases: isScene01
        ? {
            // Scene 01 — cinematic portal: extended immerse hold
            approach: [0, 0.20],
            enter:    [0.20, 0.35],
            immerse:  [0.35, 0.75],
            exit:     [0.75, 1.0],
          }
        : isScene02
        ? {
            // Scene 02 — hero identity: fast approach, long 4-step hold
            approach: [0, 0.10],
            enter:    [0.10, 0.30],
            immerse:  [0.30, 0.78],
            exit:     [0.78, 1.0],
          }
        : isScene03
        ? {
            // Scene 03 — architecture: balanced approach and 5-step hold
            approach: [0.00, 0.45],
            enter:    [0.45, 0.60],
            immerse:  [0.60, 0.85],
            exit:     [0.85, 1.00],
          }
        : isScene04
        ? {
            // Scene 04 — projects: cinematic laptop approach & hold
            approach: [0.00, 0.40],
            enter:    [0.40, 0.55],
            immerse:  [0.55, 0.88],
            exit:     [0.88, 1.00],
          }
        : isScene05
        ? {
            // Scene 05 — product ux: cinematic tablet approach & hold
            approach: [0.00, 0.40],
            enter:    [0.40, 0.55],
            immerse:  [0.55, 0.88],
            exit:     [0.88, 1.00],
          }
        : sceneId === "scene-07-system-core"
        ? {
            approach: [0.00, 0.35],
            enter:    [0.35, 0.50],
            immerse:  [0.50, 0.88],
            exit:     [0.88, 1.00],
          }
        : {
            // Default for all other scenes (not yet individually tuned)
            approach: [0, 0.35],
            enter:    [0.35, 0.55],
            immerse:  [0.55, 0.85],
            exit:     [0.85, 1.0],
          },
    };
  });
}
