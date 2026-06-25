/**
 * scene02Config.ts
 * Pacing constants, content steps, and color tokens for Scene 02 (Hero Display).
 *
 * Sub-phase boundaries are LOCAL (0–1 within the scene segment).
 * These must match the isScene02 branch in scrollSegments.ts.
 */

export const SCENE_02_SUB_PHASES = {
  approach: [0, 0.10] as [number, number],   // 0%  → 10%  — device reveal, scene loads
  enter:    [0.10, 0.30] as [number, number], // 10% → 30%  — camera zooms close to screen
  immerse:  [0.30, 0.78] as [number, number], // 30% → 78%  — hold: 4-step content progresses
  exit:     [0.78, 1.00] as [number, number], // 78% → 100% — camera pulls back to exit
} as const;

/** The immerse phase is split evenly into 4 content steps. */
export const SCENE_02_STEP_COUNT = 4;

export const SCENE_02_CONTENT_STEPS = [
  {
    heading: "Full Stack Developer",
    body: "I build the systems behind digital products.",
  },
  {
    heading: "Frontend · Backend · 3D",
    body: "Interfaces that perform. Architecture that scales.",
  },
  {
    heading: "Clean code.  Scalable systems.",
    body: "Product-focused execution from first commit to launch.",
  },
  {
    heading: "Explore the work",
    body: "Scroll to see the architecture behind the experience.",
  },
] as const;

export const SCENE_02_COLORS = {
  bezel:         "#1A1D22",
  screenBg:      "#040608",
  screenEmissive:"#0A1828",
  accentCyan:    "#38D6FF",
  accentGold:    "#D8A84F",
  textPrimary:   "#F4F7FA",
  textSecondary: "#A7B0BC",
  textAccent:    "#38D6FF",
} as const;
