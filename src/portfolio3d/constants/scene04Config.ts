/**
 * scene04Config.ts
 * Pacing constants, dimensions, and color tokens for Scene 04 (Projects / Work Layer).
 */

export const SCENE_04_SUB_PHASES = {
  approach: [0, 0.40] as [number, number],   // 0%  → 40%  — laptop visible, approaches
  enter:    [0.40, 0.55] as [number, number], // 40% → 55%  — camera zooms close to screen
  immerse:  [0.55, 0.88] as [number, number], // 55% → 88%  — hold: project entries progress
  exit:     [0.88, 1.00] as [number, number], // 88% → 100% — camera pulls back/down to exit
} as const;

export const SCENE_04_COLORS = {
  bezel:          "#1D212A", // graphite metal
  screenBg:       "#05070A", // dark LCD off-state
  screenEmissive: "#061325", // LCD backlight glow
  accentCyan:     "#38D6FF", // active elements
  accentBlue:     "#1A365D", // dark blue
  textPrimary:    "#F4F7FA", // primary headings
  textSecondary:  "#A0AEC0", // body text
  keyboardGlow:   "#1E2D4A", // subtle backlit keyboard glow
} as const;

export const SCENE_04_DIMENSIONS = {
  screenBezelWidth: 4.0,
  screenBezelHeight: 2.7,
  screenSurfaceWidth: 3.7,
  screenSurfaceHeight: 2.4,
  keyboardWidth: 4.0,
  keyboardDepth: 2.4,
  keyboardHeight: 0.15,
} as const;
