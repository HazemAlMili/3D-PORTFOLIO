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

export const SCROLL_WEIGHTS = [0.18, 0.09, 0.11, 0.16, 0.11, 0.09, 0.11, 0.15];

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
        approach: [0, 0.35],
        enter: [0.35, 0.55],
        immerse: [0.55, 0.85],
        exit: [0.85, 1.0],
      },
    };
  });
}
