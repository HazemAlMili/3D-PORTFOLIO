/**
 * TransitionCaptionRenderer.tsx
 *
 * Non-invasive DOM overlay that shows the approved cinematic transition
 * captions between scenes.
 *
 * Design constraints:
 * - pointer-events: none at all times — never blocks canvas interaction
 * - opacity/transform only — no layout changes
 * - Derived entirely from scrollProgress (deterministic, bidirectional)
 * - Respects prefers-reduced-motion: skips fade animation, still renders text
 * - No camera/scroll/scene modifications
 *
 * Timing:
 * - Caption appears in the late exit phase of the departing scene
 *   (localProgress > EXIT_SHOW_THRESHOLD)
 * - Caption continues through the early approach phase of the arriving scene
 *   (localProgress < APPROACH_HIDE_THRESHOLD)
 * - Fades in and out smoothly via CSS opacity driven by an inline style
 */

import { useMemo } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { getTransitionCaption } from "../content/transitionCopy";
import type { SceneId } from "../content/types";
import styles from "./TransitionCaptionRenderer.module.css";

// --- Timing constants (local scene progress, 0–1) ---

/**
 * How far into the exit phase before the caption fades in.
 * 0.0 = start of exit phase, 1.0 = end of exit phase (= scene boundary).
 * 0.35 means the caption starts appearing when 35% of the exit phase is done.
 */
const EXIT_FADE_IN_START = 0.35;

/**
 * How far into the approach phase the caption should start fading out.
 * 0.0 = scene boundary, 1.0 = end of approach phase.
 * 0.55 means the caption begins fading out when 55% of approach is done.
 */
const APPROACH_FADE_OUT_START = 0.55;

// --- Cached segments (stable between renders) ---
const SEGMENTS = buildSceneSegments();

interface CaptionState {
  caption: string;
  opacity: number;
}

/**
 * Derives the active transition caption and its opacity from raw scroll progress.
 * Returns null if no transition is currently active.
 */
function resolveCaption(globalProgress: number): CaptionState | null {
  const p = Math.min(1, Math.max(0, globalProgress));

  // Find the current scene segment
  let idx = p === 1
    ? SEGMENTS.length - 1
    : SEGMENTS.findIndex((s) => p >= s.start && p < s.end);
  if (idx === -1) idx = p <= 0 ? 0 : SEGMENTS.length - 1;

  const seg = SEGMENTS[idx];
  const segRange = seg.end - seg.start || 1;
  const localT = Math.min(1, Math.max(0, (p - seg.start) / segRange));
  const { exit: [exitStart, exitEnd] } = seg.subPhases;

  // ── Case A: We are in the EXIT phase of scene[idx] ──────────────────────────
  if (localT >= exitStart && localT <= exitEnd) {
    const nextIdx = idx + 1;
    if (nextIdx >= SEGMENTS.length) return null; // Last scene has no next

    const fromId = seg.sceneId as SceneId;
    const toId = SEGMENTS[nextIdx].sceneId as SceneId;
    const caption = getTransitionCaption(fromId, toId);
    if (!caption) return null;

    // Fade in: 0 at EXIT_FADE_IN_START, 1 at exitEnd
    const exitPhaseLen = exitEnd - exitStart || 1;
    const fadeInStart = exitStart + exitPhaseLen * EXIT_FADE_IN_START;
    const t = Math.min(1, Math.max(0, (localT - fadeInStart) / (exitEnd - fadeInStart || 1)));
    return { caption, opacity: t };
  }

  // ── Case B: We are in the APPROACH phase of scene[idx] ──────────────────────
  const { approach: [approachStart, approachEnd] } = seg.subPhases;
  if (localT >= approachStart && localT <= approachEnd) {
    const prevIdx = idx - 1;
    if (prevIdx < 0) return null; // First scene has no previous

    const fromId = SEGMENTS[prevIdx].sceneId as SceneId;
    const toId = seg.sceneId as SceneId;
    const caption = getTransitionCaption(fromId, toId);
    if (!caption) return null;

    // Fade out: 1 at approachStart, 0 at APPROACH_FADE_OUT_START
    const approachPhaseLen = approachEnd - approachStart || 1;
    const fadeOutEnd = approachStart + approachPhaseLen * APPROACH_FADE_OUT_START;
    const t = Math.min(1, Math.max(0, (fadeOutEnd - localT) / (fadeOutEnd - approachStart || 1)));
    return { caption, opacity: t };
  }

  return null; // In enter or immerse — no caption
}

export function TransitionCaptionRenderer() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const captionState = useMemo(
    () => resolveCaption(scrollProgress),
    [scrollProgress],
  );

  // Nothing to show — render nothing (keep DOM minimal)
  if (!captionState || captionState.opacity <= 0.005) return null;

  return (
    <div
      className={styles.captionRoot}
      aria-hidden="true"
      style={{
        opacity: reducedMotion ? 1 : captionState.opacity,
      }}
    >
      <p className={styles.caption}>{captionState.caption}</p>
    </div>
  );
}
