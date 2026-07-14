/**
 * scene02Config.ts
 * Pacing constants, 6-beat storyboard sub-phases, HUD reveal boundaries, capability node data,
 * and visual tokens for Scene 02 (Cinematic Command Center / Mission Control Node).
 *
 * Sub-phase boundaries are LOCAL (0–1 within the Scene 02 segment).
 */

export const SCENE_02_SUB_PHASES = {
  arrival:        [0.00, 0.16] as [number, number], // 0%  → 16%  — portal exit, data disperses, ambient glow
  commandNode:    [0.14, 0.34] as [number, number], // 14% → 34%  — spatial grid unfolds, 3D core constructs
  missionOutput:  [0.30, 0.56] as [number, number], // 30% → 56%  — mission statement resolves in HUD
  capabilities:   [0.50, 0.82] as [number, number], // 50% → 82%  — 5 capability nodes online along system bus
  systemComplete: [0.82, 0.86] as [number, number], // 82% → 86%  — full-stack complete confirmation pulse
  routeSelect:    [0.84, 0.90] as [number, number], // 84% → 90%  — system route CTAs unlock after stack complete
  handoff:        [0.90, 1.00] as [number, number], // 90% → 100% — project rail pulses, handoff to Scene 03

  // Staggered HUD element reveal & route rail boundaries
  hudStatus:      [0.30, 0.40] as [number, number],
  hudHeadline:    [0.36, 0.52] as [number, number],
  hudSubtext:     [0.46, 0.58] as [number, number],
  hudCtas:        [0.84, 0.90] as [number, number], // Strictly unlocked AFTER DEPLOYMENT completes at 0.82
  routeRail:      [0.86, 0.94] as [number, number], // Strictly active AFTER CTA unlock
} as const;

export interface CapabilityNodeDef {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  position: [number, number, number];
  activeRange: [number, number];
  cardAnchor: "left" | "center" | "right";
  cardOffset: [number, number]; // [dxPercent, dyPercent] relative to projected station screen point
  orbitId: "orbit1" | "orbit2" | "orbit3" | "orbit4" | "orbit5";
  pointIndex: number;
}

/**
 * Locked Full-Stack Architectural Order & Atomic Orbit Metaphor:
 * Every capability owns exactly one orbit, fanned out safely on the right-side cluster.
 */
export const CAPABILITY_NODES: CapabilityNodeDef[] = [
  {
    id: "frontend",
    label: "FRONTEND",
    sublabel: "UI · React · WebGL",
    color: "#38D6FF",
    position: [0, 0, 0], // Derived from orbit endpoint at runtime
    activeRange: [0.24, 0.40], // Orbit 1 builds, FRONTEND badge appears
    cardAnchor: "left",
    cardOffset: [1.8, -1.5],
    orbitId: "orbit1",
    pointIndex: 2, // screen projection: [65.4%, 28.5%]
  },
  {
    id: "apis",
    label: "APIs",
    sublabel: "REST · GraphQL · Contracts",
    color: "#D8A84F",
    position: [0, 0, 0],
    activeRange: [0.34, 0.50], // Orbit 2 builds, APIS badge appears
    cardAnchor: "left",
    cardOffset: [1.8, -1.5],
    orbitId: "orbit2",
    pointIndex: 3, // screen projection: [70.2%, 18.0%]
  },
  {
    id: "backend",
    label: "BACKEND",
    sublabel: "Node · Microservices",
    color: "#2F80ED",
    position: [0, 0, 0],
    activeRange: [0.44, 0.60], // Orbit 3 builds, BACKEND badge appears
    cardAnchor: "right",
    cardOffset: [-1.8, -1.5],
    orbitId: "orbit3",
    pointIndex: 6, // screen projection: [84.9%, 10.1%]
  },
  {
    id: "databases",
    label: "DATABASES",
    sublabel: "SQL · NoSQL · Cache",
    color: "#38D6FF",
    position: [0, 0, 0],
    activeRange: [0.54, 0.70], // Orbit 4 builds, DATABASES badge appears
    cardAnchor: "left",
    cardOffset: [1.8, -1.5],
    orbitId: "orbit4",
    pointIndex: 62, // screen projection: [74.5%, 49.3%]
  },
  {
    id: "deployment",
    label: "DEPLOYMENT",
    sublabel: "CI/CD · Cloud · DevOps",
    color: "#2F80ED",
    position: [0, 0, 0],
    activeRange: [0.64, 0.80], // Orbit 5 builds, DEPLOYMENT badge appears
    cardAnchor: "left",
    cardOffset: [1.8, -1.5],
    orbitId: "orbit5",
    pointIndex: 13, // screen projection: [75.1%, 86.8%]
  },
];

export const MISSION_TEXT = {
  status: "COMMAND NODE ACTIVE // MISSION OUTPUT",
  headline: "Building complete digital systems from interface to infrastructure.",
  subtext: "Architecting high-performance web platforms, scalable services, and interactive 3D experiences.",
} as const;

export const SCENE_02_COLORS = {
  commandCore:    "#0A1828",
  coreGlow:       "#38D6FF",
  gridLine:       "#1E293B",
  accentCyan:     "#38D6FF",
  accentGold:     "#D8A84F",
  accentBlue:     "#2F80ED",
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A7B0BC",
  hudBorder:      "rgba(56, 214, 255, 0.25)",
} as const;

export const PERF_DEBUG_SCENE_02 = {
  disableCapabilityCards: false,
  disableBusRail: false,
  disableOrbitRings: false,
  disableCommandCore: false,
  disableCodeWords: false,
  disableNextSceneRender: false,
};

