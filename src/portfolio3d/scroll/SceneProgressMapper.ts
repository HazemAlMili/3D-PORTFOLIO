import type { SceneSegment } from "./scrollSegments";

export interface SceneProgress {
  sceneIndex: number;
  sceneId: string;
  localProgress: number;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function normalize(value: number, min: number, max: number): number {
  const range = max - min;
  if (range === 0) return 0;
  return clamp01((value - min) / range);
}

export function getSceneProgress(
  globalProgress: number,
  segments: SceneSegment[]
): SceneProgress {
  const p = clamp01(globalProgress);

  // Edge cases
  if (p === 0) {
    return {
      sceneIndex: 0,
      sceneId: segments[0].sceneId,
      localProgress: 0,
    };
  }
  if (p === 1) {
    const last = segments[segments.length - 1];
    return {
      sceneIndex: segments.length - 1,
      sceneId: last.sceneId,
      localProgress: 1,
    };
  }

  // Find the segment
  let index = segments.findIndex((s) => p >= s.start && p < s.end);
  // If not found (should not happen with weights summing to 1), fallback to last
  if (index === -1) index = segments.length - 1;

  const segment = segments[index];
  const localProgress = normalize(p, segment.start, segment.end);

  return {
    sceneIndex: index,
    sceneId: segment.sceneId,
    localProgress,
  };
}
