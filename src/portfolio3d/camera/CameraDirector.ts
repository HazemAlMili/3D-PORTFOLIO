// camera/CameraDirector.ts
import type { SceneSegment } from "../scroll/scrollSegments";
import type { CameraPose, SceneCameraStates } from "./cameraTypes";

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function normalize(v: number, min: number, max: number): number {
  return clamp01((v - min) / (max - min || 1));
}

function lerpVec3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function lerpPose(a: CameraPose, b: CameraPose, t: number): CameraPose {
  return {
    position: lerpVec3(a.position, b.position, t),
    target: lerpVec3(a.target, b.target, t),
    fov: a.fov + (b.fov - a.fov) * t,
  };
}

export function resolveCameraPose(
  globalProgress: number,
  segments: SceneSegment[],
  sceneStates: Record<string, SceneCameraStates>,
): CameraPose {
  const p = clamp01(globalProgress);
  let index = p === 1 ? segments.length - 1 : segments.findIndex((s) => p >= s.start && p < s.end);
  if (index === -1) index = p <= 0 ? 0 : segments.length - 1;

  const segment = segments[index];
  const localT = normalize(p, segment.start, segment.end);
  const states = sceneStates[segment.sceneId];
  const { approach, enter, immerse, exit } = segment.subPhases;

  // Edge cases for p=0 or p=1 are handled by the findIndex fallback, but we ensure safe return.
  if (!states) return { position: [0, 0, 0], target: [0, 0, 0], fov: 50 };

  if (localT <= approach[1]) {
    const t = easeInOutCubic(normalize(localT, approach[0], approach[1]));
    const prevId = index > 0 ? segments[index - 1].sceneId : segment.sceneId;
    const prevStates = sceneStates[prevId] || states;
    return lerpPose(prevStates.exit, states.approach, t);
  }
  if (localT <= enter[1]) {
    const t = easeInOutCubic(normalize(localT, enter[0], enter[1]));
    return lerpPose(states.approach, states.enter, t);
  }
  if (localT <= immerse[1]) {
    return states.enter; // Hold steady
  }
  const t = easeInOutCubic(normalize(localT, exit[0], exit[1]));
  return lerpPose(states.enter, states.exit, t);
}
