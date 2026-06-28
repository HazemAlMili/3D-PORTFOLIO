/**
 * scene03Config.ts
 * Pacing constants, layer data, and color tokens for Scene 03 (Architecture Layout).
 *
 * Sub-phase boundaries are LOCAL (0–1 within the scene segment).
 * These must match the isScene03 branch in scrollSegments.ts.
 */

export const SCENE_03_SUB_PHASES = {
  approach: [0.00, 0.45] as [number, number],   // 0%  → 45%  — device reveal & gradual approach
  enter:    [0.45, 0.60] as [number, number],   // 45% → 60%  — camera zooms close to screen
  immerse:  [0.60, 0.85] as [number, number],   // 60% → 85%  — hold: 5-step content progresses
  exit:     [0.85, 1.00] as [number, number],   // 85% → 100% — camera pulls back to exit
} as const;

/** The immerse phase is split evenly into 5 content steps (one for each layer). */
export const SCENE_03_STEP_COUNT = 5;

export const SCENE_03_COLORS = {
  bezel:          "#15181C",
  screenBg:       "#030507",
  screenEmissive: "#061320",
  accentCyan:     "#38D6FF",
  accentBlue:     "#2F80ED",
  accentGold:     "#D8A84F",
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A7B0BC",
  panelBg:        "#0B1119",
  panelBorder:    "#1B283A",
  panelActive:    "#0B2D4A",
} as const;

export const SCENE_03_LAYERS = [
  {
    id: "frontend",
    title: "Frontend",
    desc: "Interactive UI and motion systems",
    yPos: 0.48,
  },
  {
    id: "api",
    title: "API",
    desc: "Structured routes and reliable contracts",
    yPos: 0.22,
  },
  {
    id: "backend",
    title: "Backend",
    desc: "Business logic and service orchestration",
    yPos: -0.04,
  },
  {
    id: "database",
    title: "Database",
    desc: "Persistent data and optimized queries",
    yPos: -0.30,
  },
  {
    id: "deployment",
    title: "Deployment",
    desc: "Shipping, monitoring, and scaling",
    yPos: -0.56,
  },
] as const;
