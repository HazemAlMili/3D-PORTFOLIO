import type { SceneSegment } from "../scroll/scrollSegments";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function normalize(value: number, min: number, max: number): number {
  return clamp01((value - min) / (max - min || 1));
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = normalize(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}

/**
 * Calculates the scroll-derived fade opacity for a scene.
 * Around each boundary B_i between Scene i and Scene i+1, a transition zone is defined:
 * [B_i - delta_i, B_i + delta_i] where delta_i = 0.15 * min(weight_i, weight_{i+1}).
 * 
 * @param sceneIndex - Index of the scene to evaluate (0–7)
 * @param scrollProgress - Current global scroll progress (0–1)
 * @param segments - List of all scene segments
 */
export function getSceneFadeOpacity(
  sceneIndex: number,
  scrollProgress: number,
  segments: SceneSegment[]
): number {
  const p = clamp01(scrollProgress);
  const numScenes = segments.length;

  if (sceneIndex < 0 || sceneIndex >= numScenes) return 0;

  const segment = segments[sceneIndex];

  // Fade in from the left boundary
  let leftOpacity = 1;
  if (sceneIndex > 0) {
    const prevSegment = segments[sceneIndex - 1];
    const leftBoundary = segment.start;
    
    // Width of the transition window is based on the weights of the two adjacent scenes
    const prevWeight = prevSegment.end - prevSegment.start;
    const currentWeight = segment.end - segment.start;
    const delta = 0.15 * Math.min(prevWeight, currentWeight);

    if (p < leftBoundary - delta) {
      leftOpacity = 0;
    } else if (p > leftBoundary + delta) {
      leftOpacity = 1;
    } else {
      leftOpacity = smoothstep(leftBoundary - delta, leftBoundary + delta, p);
    }
  }

  // Fade out to the right boundary
  let rightOpacity = 1;
  if (sceneIndex < numScenes - 1) {
    const nextSegment = segments[sceneIndex + 1];
    const rightBoundary = segment.end;

    // Width of the transition window is based on the weights of the two adjacent scenes
    const currentWeight = segment.end - segment.start;
    const nextWeight = nextSegment.end - nextSegment.start;
    const delta = 0.15 * Math.min(currentWeight, nextWeight);

    if (p < rightBoundary - delta) {
      rightOpacity = 1;
    } else if (p > rightBoundary + delta) {
      rightOpacity = 0;
    } else {
      rightOpacity = 1 - smoothstep(rightBoundary - delta, rightBoundary + delta, p);
    }
  }

  return clamp01(Math.min(leftOpacity, rightOpacity));
}
