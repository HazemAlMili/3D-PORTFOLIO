/**
 * cameraClipping.ts — Dev-only clipping safety helpers
 *
 * These utilities check whether the camera's world-space position is within
 * the safe operating range defined by the Canvas near/far planes (0.1 – 100).
 * They are intended for development-time diagnostics only and produce no output
 * in production builds.
 */

// ─── Constants ──────────────────────────────────────────────────────────────

/** Minimum safe camera distance from origin to avoid near-plane clipping. */
export const CAMERA_NEAR = 0.1;

/** Maximum safe camera distance from origin to avoid far-plane clipping / z-fighting. */
export const CAMERA_FAR = 100;

/**
 * Soft threshold below which a proximity warning is issued.
 * Triggers before the hard near-plane boundary for early developer feedback.
 */
const CLIP_WARN_NEAR = 0.5;

/**
 * Soft threshold above which a far-plane warning is issued.
 */
const CLIP_WARN_FAR = 90;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns true if the camera position is within the safe clip-space range.
 * Checks distance from world origin against near/far boundaries.
 */
export function isCameraSafe(
  position: [number, number, number],
  near: number = CAMERA_NEAR,
  far: number = CAMERA_FAR
): boolean {
  const dist = Math.sqrt(
    position[0] ** 2 + position[1] ** 2 + position[2] ** 2
  );
  return dist > near && dist < far;
}

/**
 * Returns a dev-only warning string if the camera is approaching clip boundaries,
 * or null if the position is safe.
 *
 * Use only in import.meta.env.DEV guards — do not call in production paths.
 */
export function getClippingWarning(
  position: [number, number, number]
): string | null {
  const dist = Math.sqrt(
    position[0] ** 2 + position[1] ** 2 + position[2] ** 2
  );
  if (dist < CLIP_WARN_NEAR) {
    return `⚠️ Camera near-clip risk: distance ${dist.toFixed(3)} is below soft threshold ${CLIP_WARN_NEAR}. May clip through geometry.`;
  }
  if (dist > CLIP_WARN_FAR) {
    return `⚠️ Camera far-clip risk: distance ${dist.toFixed(3)} exceeds soft threshold ${CLIP_WARN_FAR}. May cause z-fighting.`;
  }
  return null;
}
