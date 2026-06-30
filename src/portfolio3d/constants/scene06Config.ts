/**
 * scene06Config.ts
 * Pacing constants, dimensions, and color tokens for Scene 06 (Responsive + Performance).
 */

export const SCENE_06_SUB_PHASES = {
  approach: [0, 0.40] as [number, number],   // 0%  → 40%  — mobile device rotates into view
  enter:    [0.40, 0.55] as [number, number], // 40% → 55%  — zoom close to screen
  immerse:  [0.55, 0.88] as [number, number], // 55% → 88%  — hold: responsive layout transitions
  exit:     [0.88, 1.00] as [number, number], // 88% → 100% — pullback exit transition
} as const;

export const SCENE_06_COLORS = {
  bezel:          "#1D212A", // graphite metallic
  screenBg:       "#05070A", // screen off-state
  screenEmissive: "#061325", // LCD backlight
  accentCyan:     "#38D6FF", // system active LED
  accentBlue:     "#1A365D",
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A0AEC0",
} as const;

export const SCENE_06_DIMENSIONS = {
  phoneWidth: 1.8,
  phoneHeight: 3.6,
  phoneDepth: 0.10,
  screenWidth: 1.65,
  screenHeight: 3.45,
} as const;

export const SCENE_06_ANCHORS = {
  /**
   * Source anchor representing the tablet screen exit region from Scene 05.
   * Conceptually, the product UX thinking transitions from here.
   */
  tabletUXSource: [0, 1.8, 0.062] as [number, number, number],
  /**
   * Target receiving anchor representing the center of the Mobile device
   * screen inside Scene 06.
   */
  mobileScreenTarget: [0, 0, 0.052] as [number, number, number],
} as const;
