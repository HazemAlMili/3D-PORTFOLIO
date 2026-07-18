/**
 * scene03Config.ts — Product Assembly Engine Configuration (PRODUCT-00 & PRODUCT-01)
 *
 * Scene 03 — Product Assembly Engine
 * Answers: "How does this developer turn capabilities into a polished digital product?"
 *
 * Local Progress: 0–1 within scroll segment
 *
 * Creative lock document:
 *   docs/portfolio-3d/scene03-product-assembly-engine-creative-lock.md
 *
 * FORGE direction is REJECTED. Do not re-add forge/nucleus/ring/SDLC visuals.
 */

// ─── Product Engine Copy ────────────────────────────────────────────────────

export const PRODUCT_ENGINE_COPY = {
  statusBadge: "PRODUCT ENGINE // BUILD FLOW",
  headline:    "Turning ideas into polished digital products.",
  subtext:     "Designing interfaces, connecting systems, optimizing performance, and shipping production-ready experiences.",
} as const;

// ─── Product Assembly Phases ────────────────────────────────────────────────

export const PRODUCT_ENGINE_PHASES = {
  ideaSpark:        [0.00, 0.12] as [number, number], // Small spark arrives from Scene 02 direction
  wireframe:        [0.12, 0.28] as [number, number], // Large floating product wireframe appears
  uiGlass:          [0.28, 0.44] as [number, number], // Wireframe transforms into glass UI shell
  fullStack:        [0.44, 0.60] as [number, number], // 3D depth layers reveal: Frontend → API → Backend → Data
  performanceWave:  [0.70, 0.82] as [number, number], // Cyan optimization wave sweeps the product (main wow)
  productLock:      [0.82, 0.92] as [number, number], // Product stabilizes — UX / API / DATA / PERF / READY
  launchHandoff:    [0.92, 1.00] as [number, number], // Proof packet releases into Scene 04

  // Convenience aliases
  enter:            [0.00, 0.12] as [number, number],
  exit:             [0.92, 1.00] as [number, number],
  immerse:          [0.12, 0.88] as [number, number],
} as const;

// ─── Product Engine Colors ──────────────────────────────────────────────────

export const PRODUCT_ENGINE_COLORS = {
  // Background
  chamberBg:      "#060E18",
  chamberDepth:   "#0A1828",

  // Primary accents — matching Scene 02 visual family
  accentCyan:     "#38D6FF",
  accentBlue:     "#2F80ED",
  accentGold:     "#D8A84F",   // Used for launch/handoff beat only

  // Interface surfaces
  glassSurface:   "rgba(10, 24, 40, 0.55)",
  glassEdge:      "rgba(56, 214, 255, 0.35)",
  glassDepth:     "rgba(47, 128, 237, 0.15)",

  // Text
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A7B0BC",

  // HUD / overlay
  hudBorder:      "rgba(56, 214, 255, 0.25)",
  hudBg:          "rgba(10, 24, 40, 0.65)",

  // Full-stack layer colors
  layerFrontend:  "#38D6FF",   // cyan
  layerApi:       "#2F80ED",   // blue
  layerBackend:   "#1A5DA0",   // deep blue
  layerData:      "#D8A84F",   // gold

  // Performance wave
  waveColor:      "#38D6FF",
  waveFade:       "rgba(56, 214, 255, 0.0)",

  // Legacy aliases — kept for TypeScript compatibility with any remaining shared utilities
  chamberRing:    "#142C44",
  coreGlow:       "#38D6FF",
  panelBg:        "#0A1828",
  panelBorder:    "rgba(56, 214, 255, 0.25)",
  panelActive:    "#38D6FF",
  pipelineBase:   "#1E293B",
  ringTrack:      "#142C44",
  nodeBorder:     "#38D6FF",
  bezel:          "#0A1828",
  screenBg:       "#060E18",
  screenEmissive: "#38D6FF",
} as const;

// ─── Product Engine Layout ──────────────────────────────────────────────────

export const PRODUCT_ENGINE_LAYOUT = {
  // Desktop: left HUD text, right large product object
  desktopHudLeft:      "5%",
  desktopProductRight: "55%",     // product anchor starts at 55% from left
  desktopProductX:     1.80,      // R3F world units — optimized for stable 45% screen width gap
  desktopProductY:     0.0,

  // Mobile: top compact copy, center product object
  mobileHudTop:        "8%",
  mobileProductX:      0.0,
  mobileProductY:      -0.2,
} as const;

// ─── Full-Stack Layer Definitions ───────────────────────────────────────────

export interface ProductLayerDef {
  id:          string;
  label:       string;
  sublabel:    string;
  color:       string;
  depthOffset: number;   // Z offset in world units (depth behind product face)
  activeRange: [number, number];
}

export const PRODUCT_STACK_LAYERS: ProductLayerDef[] = [
  {
    id:          "frontend",
    label:       "FRONTEND",
    sublabel:    "UI layer",
    color:       PRODUCT_ENGINE_COLORS.layerFrontend,
    depthOffset: 0.0,
    activeRange: [0.44, 0.52],
  },
  {
    id:          "api",
    label:       "API",
    sublabel:    "Service interface",
    color:       PRODUCT_ENGINE_COLORS.layerApi,
    depthOffset: -0.18,
    activeRange: [0.48, 0.56],
  },
  {
    id:          "backend",
    label:       "BACKEND",
    sublabel:    "Application logic",
    color:       PRODUCT_ENGINE_COLORS.layerBackend,
    depthOffset: -0.36,
    activeRange: [0.52, 0.60],
  },
  {
    id:          "data",
    label:       "DATA",
    sublabel:    "Persistence engine",
    color:       PRODUCT_ENGINE_COLORS.layerData,
    depthOffset: -0.54,
    activeRange: [0.56, 0.64],
  },
];

// ─── Legacy re-exports for backward compatibility ────────────────────────────
// These keep TypeScript happy for any shared scroll/opacity utilities
// that still reference old Scene 03 constant names.
// Do NOT use these in new Product Assembly components.

/** @deprecated Use PRODUCT_ENGINE_COPY */
export const SYSTEM_FORGE_COPY = PRODUCT_ENGINE_COPY;

/** @deprecated Use PRODUCT_ENGINE_PHASES */
export const SYSTEM_FORGE_SUB_PHASES = PRODUCT_ENGINE_PHASES;

/** @deprecated Use PRODUCT_ENGINE_COLORS */
export const FORGE_COLORS = PRODUCT_ENGINE_COLORS;

/** @deprecated Use PRODUCT_STACK_LAYERS */
export const PRODUCTION_LAYERS = PRODUCT_STACK_LAYERS.map((l) => ({
  id:          l.id,
  label:       l.label,
  sublabel:    l.sublabel,
  activeRange: l.activeRange,
}));

export const SCENE_03_STEP_COUNT = 7;
export const SCENE_03_SUB_PHASES = PRODUCT_ENGINE_PHASES;
export const SCENE_03_COPY       = PRODUCT_ENGINE_COPY;
export const SCENE_03_COLORS     = PRODUCT_ENGINE_COLORS;

export const SCENE_03_LAYERS = PRODUCT_STACK_LAYERS.map((l, idx) => ({
  id:          l.id,
  title:       l.label,
  description: l.sublabel,
  desc:        l.sublabel,
  yPos:        idx * 0.4,
}));

export const SDLC_STAGES = PRODUCT_STACK_LAYERS.map((l) => ({
  id:            l.id,
  title:         l.label,
  subtitle:      l.sublabel,
  label:         l.label,
  shortDesc:     l.sublabel,
  color:         l.color,
  position:      [PRODUCT_ENGINE_LAYOUT.desktopProductX, 0.0, 0.0] as [number, number, number],
  mobilePosition:[PRODUCT_ENGINE_LAYOUT.mobileProductX, PRODUCT_ENGINE_LAYOUT.mobileProductY, 0.0] as [number, number, number],
  activeRange:   l.activeRange,
}));
