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
  /**
   * DataTunnel source anchor — represents where the Scene 06 mobile screen
   * signal conceptually enters the Scene 07 system core cluster.
   *
   * Position is above and forward from the core (toward the camera/viewer),
   * matching the direction the camera approaches from the mobile device scene.
   * This makes the data tunnel feel connected to the mobile screen rather than
   * originating from an arbitrary floating point in space.
   *
   * Note: This position is within the rotated isometric group [0.25, -0.45, 0],
   * so "forward" in local space is toward positive Z and "above" is positive Y.
   */
  mobileSignalEntry: [0, 1.6, 1.8] as [number, number, number],
} as const;
