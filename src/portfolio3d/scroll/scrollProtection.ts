/**
 * scrollProtection.ts — Pure scroll safety utilities
 *
 * These functions enforce velocity limits and directional stability on raw
 * scroll progress values before they reach the Zustand store. They are pure,
 * side-effect-free, and fully unit-testable.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Maximum allowed change in scrollProgress per update frame.
 * Prevents rapid wheel/swipe input from skipping over entire scenes.
 *
 * At 8 scenes, each scene occupies ~0.125 of the total range.
 * A MAX_PROGRESS_DELTA of 0.05 means at most ~40% of one scene can be
 * traversed per frame — the camera always moves through every sub-phase.
 */
export const MAX_PROGRESS_DELTA = 0.05;

/**
 * Minimum delta magnitude required to register a direction change.
 * Prevents micro-oscillations from toggling the scroll direction flag.
 */
export const DIRECTION_CHANGE_THRESHOLD = 0.001;

// ─── Types ───────────────────────────────────────────────────────────────────

export type ScrollDirection = "forward" | "backward" | null;

// ─── Pure Utilities ───────────────────────────────────────────────────────────

/**
 * Clamps the target progress so it cannot deviate from current by more than
 * `maxDelta` in a single update. Returns the safe next progress value.
 *
 * @param current - Current scrollProgress (0–1)
 * @param target  - Incoming raw progress from scroll input (0–1)
 * @param maxDelta - Maximum allowed step per frame (default: MAX_PROGRESS_DELTA)
 */
export function clampScrollDelta(
  current: number,
  target: number,
  maxDelta: number = MAX_PROGRESS_DELTA
): number {
  const delta = target - current;
  if (Math.abs(delta) > maxDelta) {
    return current + Math.sign(delta) * maxDelta;
  }
  return target;
}

/**
 * Determines scroll direction from the delta between target and current.
 * Returns null if the delta is below the direction-change threshold
 * (avoids toggling direction on micro-oscillations).
 *
 * @param current  - Current scrollProgress
 * @param target   - Incoming raw progress
 */
export function resolveScrollDirection(
  current: number,
  target: number
): ScrollDirection {
  const delta = target - current;
  if (Math.abs(delta) < DIRECTION_CHANGE_THRESHOLD) return null;
  return delta > 0 ? "forward" : "backward";
}
