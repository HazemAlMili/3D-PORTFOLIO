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

export const SCROLL_WEIGHTS = [0.08, 0.10, 0.12, 0.18, 0.12, 0.10, 0.12, 0.18];

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
    return {
      sceneId: SCENE_IDS[i],
      start,
      end,
      subPhases: {
        approach: [0, 0.25],
        enter: [0.25, 0.45],
        immerse: [0.45, 0.8],
        exit: [0.8, 1.0],
      },
    };
  });
}
