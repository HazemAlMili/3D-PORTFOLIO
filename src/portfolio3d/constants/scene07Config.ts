/**
 * scene07Config.ts
 * Coordinates, pacing sub-phases, and colors for Scene 07 System Core.
 */

export const SCENE_07_SUB_PHASES = {
  approach: [0.00, 0.35] as [number, number],
  enter:    [0.35, 0.50] as [number, number],
  immerse:  [0.50, 0.88] as [number, number],
  exit:     [0.88, 1.00] as [number, number],
} as const;

export const SCENE_07_COLORS = {
  graphite:       "#1E293B", // server frames
  chassisDark:    "#0B0F19", // server blades
  accentCyan:     "#38D6FF", // system link glow
  accentBlue:     "#1D4ED8", // service state
  dataGreen:      "#10B981", // active db
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A0AEC0",
} as const;

export const SCENE_07_LAYOUT = {
  core:       [0, -0.15, 0] as [number, number, number],
  database:   [-1.2, -0.35, 0.2] as [number, number, number],
  api:        [1.1, 0.2, 0.1] as [number, number, number],
  auth:       [-0.6, 0.6, -0.4] as [number, number, number],
  cache:      [0.6, -0.55, 0.3] as [number, number, number],
  queue:      [1.0, -0.35, -0.3] as [number, number, number],
} as const;
