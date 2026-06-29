/**
 * scene08Config.ts
 * Pacing sub-phases, color tokens, and layout constants for Scene 08 (Final Contact).
 */

export const SCENE_08_SUB_PHASES = {
  approach: [0.00, 0.35] as [number, number],
  enter:    [0.35, 0.52] as [number, number],
  immerse:  [0.52, 0.92] as [number, number],
  exit:     [0.92, 1.00] as [number, number],
} as const;

export const SCENE_08_COLORS = {
  background:     "#05070A",
  accentCyan:     "#38D6FF",
  accentBlue:     "#1D4ED8",
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A0AEC0",
  linkHover:      "#60A5FA",
} as const;

export const SCENE_08_LAYOUT = {
  namePos:    [0, 1.0, 0] as [number, number, number],
  rolePos:    [0, 0.78, 0] as [number, number, number],
  dividerPos: [0, 0.65, 0] as [number, number, number],
  titlePos:   [0, 0.45, 0] as [number, number, number],
  introPos:   [0, 0.20, 0] as [number, number, number],
  primaryPos: [0, -0.12, 0] as [number, number, number],
  linksPos:   [0, -0.42, 0] as [number, number, number],
} as const;

export const SCENE_08_ANCHORS = {
  pedestal: [0, -0.8, -0.2] as [number, number, number],
  monitor:  [-1.8, 0.4, -1.2] as [number, number, number],
  laptop:   [1.8, -0.1, -1.0] as [number, number, number],
  mobile:   [-1.2, -0.4, -0.6] as [number, number, number],
  backend:  [1.2, -0.4, -0.6] as [number, number, number],
} as const;

