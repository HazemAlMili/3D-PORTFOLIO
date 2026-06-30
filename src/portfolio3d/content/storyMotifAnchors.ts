/**
 * storyMotifAnchors.ts
 *
 * Story Motif Anchor Map — Post-Final Cinematic Repair / Task 2.3
 *
 * Defines conceptual source/target anchors for the "System Signal" motif
 * across all 7 scene transitions. This is a planning/configuration file only.
 *
 * Rules:
 * - No rendering, no visual output, no DOM access, no Three.js dependencies
 * - Anchors are conceptual descriptions, not hardcoded 3D coordinates
 * - Future Task 3 will resolve these to actual scene geometry positions
 * - All functions are pure and side-effect free
 *
 * Primary motif: "system-signal"
 * A subtle signal pulse that travels through the portfolio journey,
 * connecting screens → architecture → projects → UX → devices → systems → contact.
 */

import type { SceneId } from "./types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MotifAnchorPoint {
  /** Unique identifier for this anchor point */
  id: string;
  /** Human-readable label describing what this anchor represents */
  label: string;
  /** The scene element this anchor conceptually attaches to */
  sceneElement: string;
  /** Conceptual position description (not a numeric coordinate) */
  conceptualPosition: string;
}

export interface StoryMotifAnchor {
  /** Scene index the signal departs from (0-indexed) */
  fromScene: number;
  /** Scene ID the signal departs from */
  fromSceneId: SceneId;
  /** Scene index the signal arrives at (0-indexed) */
  toScene: number;
  /** Scene ID the signal arrives at */
  toSceneId: SceneId;
  /** The approved primary motif */
  motif: "system-signal";
  /** Where the signal originates in the departing scene */
  source: MotifAnchorPoint;
  /** Where the signal resolves in the arriving scene */
  target: MotifAnchorPoint;
  /** Narrative reason this transition exists */
  narrativeMeaning: string;
  /** Intended future visual behavior (not yet implemented) */
  futureVisualBehavior: string;
  /** Current implementation state — always "planned-only" in this file */
  implementationStatus: "planned-only";
}

// ---------------------------------------------------------------------------
// Anchor Map
// ---------------------------------------------------------------------------

export const STORY_MOTIF_ANCHORS: StoryMotifAnchor[] = [
  // ── Scene 01 → Scene 02 ──────────────────────────────────────────────
  {
    fromScene: 0,
    fromSceneId: "scene-01-opening",
    toScene: 1,
    toSceneId: "scene-02-hero",
    motif: "system-signal",
    source: {
      id: "opening-signal-origin",
      label: "North Star / system idea",
      sceneElement: "OpeningDevice center screen",
      conceptualPosition: "center of the opening device screen surface",
    },
    target: {
      id: "hero-identity-point",
      label: "Developer presence",
      sceneElement: "Hero MainDisplay identity text",
      conceptualPosition: "center of the hero display where name/role appears",
    },
    narrativeMeaning: "The system idea resolves into the person behind it.",
    futureVisualBehavior:
      "A faint signal pulse travels from the opening screen center toward the hero display during exit/approach.",
    implementationStatus: "planned-only",
  },

  // ── Scene 02 → Scene 03 ──────────────────────────────────────────────
  {
    fromScene: 1,
    fromSceneId: "scene-02-hero",
    toScene: 2,
    toSceneId: "scene-03-architecture",
    motif: "system-signal",
    source: {
      id: "hero-device-surface",
      label: "Hero identity surface",
      sceneElement: "Hero MainDisplay screen edge",
      conceptualPosition: "bottom edge of the hero device screen",
    },
    target: {
      id: "architecture-blueprint-top",
      label: "Architecture blueprint entry",
      sceneElement: "UltraWideMonitor top layer (Frontend)",
      conceptualPosition: "top of the architecture stack visualization",
    },
    narrativeMeaning: "Identity turns into engineering thinking.",
    futureVisualBehavior:
      "Signal expands outward from the hero surface into a structured branching pattern approaching the architecture layers.",
    implementationStatus: "planned-only",
  },

  // ── Scene 03 → Scene 04 ──────────────────────────────────────────────
  {
    fromScene: 2,
    fromSceneId: "scene-03-architecture",
    toScene: 3,
    toSceneId: "scene-04-projects",
    motif: "system-signal",
    source: {
      id: "architecture-node-output",
      label: "Architecture blueprint output",
      sceneElement: "Architecture stack bottom layer (Deployment)",
      conceptualPosition: "bottom of the architecture stack, output edge",
    },
    target: {
      id: "project-laptop-screen",
      label: "Project proof surface",
      sceneElement: "LaptopDevice screen center",
      conceptualPosition: "center of the laptop screen showing project work",
    },
    narrativeMeaning: "Structure becomes executed work.",
    futureVisualBehavior:
      "Blueprint lines collapse into a single delivery point on the project laptop screen.",
    implementationStatus: "planned-only",
  },

  // ── Scene 04 → Scene 05 ──────────────────────────────────────────────
  {
    fromScene: 3,
    fromSceneId: "scene-04-projects",
    toScene: 4,
    toSceneId: "scene-05-product-ux",
    motif: "system-signal",
    source: {
      id: "project-interface-edge",
      label: "Project interface output",
      sceneElement: "LaptopDevice screen right edge",
      conceptualPosition: "right edge of the laptop screen, output side",
    },
    target: {
      id: "ux-tablet-flow-entry",
      label: "UX flow entry point",
      sceneElement: "TabletDevice screen top",
      conceptualPosition: "top of the tablet screen where UX flow begins",
    },
    narrativeMeaning: "Working software becomes user experience.",
    futureVisualBehavior:
      "Signal shifts perspective from object-facing (what was built) to user-facing (who it serves).",
    implementationStatus: "planned-only",
  },

  // ── Scene 05 → Scene 06 ──────────────────────────────────────────────
  {
    fromScene: 4,
    fromSceneId: "scene-05-product-ux",
    toScene: 5,
    toSceneId: "scene-06-responsive-performance",
    motif: "system-signal",
    source: {
      id: "tablet-ux-output",
      label: "Tablet UX flow completion",
      sceneElement: "TabletDevice screen bottom",
      conceptualPosition: "bottom of the tablet UX flow, final step",
    },
    target: {
      id: "mobile-breakpoint-entry",
      label: "Responsive breakpoint entry",
      sceneElement: "MobileDevice screen top",
      conceptualPosition: "top of the phone device as it scales down",
    },
    narrativeMeaning: "Product thinking adapts across devices.",
    futureVisualBehavior:
      "Signal shrinks from tablet scale to phone scale, stress-testing every breakpoint.",
    implementationStatus: "planned-only",
  },

  // ── Scene 06 → Scene 07 ──────────────────────────────────────────────
  {
    fromScene: 5,
    fromSceneId: "scene-06-responsive-performance",
    toScene: 6,
    toSceneId: "scene-07-system-core",
    motif: "system-signal",
    source: {
      id: "mobile-performance-signal",
      label: "Performance signal output",
      sceneElement: "MobileDevice screen center",
      conceptualPosition: "center of the phone screen, passing through the surface",
    },
    target: {
      id: "system-core-entry",
      label: "System core constellation entry",
      sceneElement: "SystemCoreDevice central node",
      conceptualPosition: "central hub of the backend node constellation",
    },
    narrativeMeaning: "Front-end performance leads into hidden systems.",
    futureVisualBehavior:
      "Signal dissolves through the screen surface into the engine behind — a descent backstage.",
    implementationStatus: "planned-only",
  },

  // ── Scene 07 → Scene 08 ──────────────────────────────────────────────
  {
    fromScene: 6,
    fromSceneId: "scene-07-system-core",
    toScene: 7,
    toSceneId: "scene-08-contact",
    motif: "system-signal",
    source: {
      id: "system-core-output",
      label: "System core resolution",
      sceneElement: "SystemCoreDevice outer node edge",
      conceptualPosition: "outer edge of the system constellation, final node",
    },
    target: {
      id: "contact-lockup-center",
      label: "Contact lockup point",
      sceneElement: "FinalContactLockup center",
      conceptualPosition: "center of the final contact identity lockup",
    },
    narrativeMeaning: "The system resolves into human contact.",
    futureVisualBehavior:
      "System constellation dims and focuses — many nodes converge to one point of contact.",
    implementationStatus: "planned-only",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Look up the story motif anchor for a given transition pair.
 *
 * @param fromScene - 0-indexed scene number the signal departs from
 * @param toScene   - 0-indexed scene number the signal arrives at
 * @returns The anchor definition, or undefined if no transition exists
 *
 * Pure function. No DOM access. No Three.js dependencies.
 */
export function getStoryMotifAnchor(
  fromScene: number,
  toScene: number,
): StoryMotifAnchor | undefined {
  return STORY_MOTIF_ANCHORS.find(
    (a) => a.fromScene === fromScene && a.toScene === toScene,
  );
}

/**
 * Look up by SceneId pair instead of numeric index.
 */
export function getStoryMotifAnchorBySceneId(
  fromSceneId: SceneId,
  toSceneId: SceneId,
): StoryMotifAnchor | undefined {
  return STORY_MOTIF_ANCHORS.find(
    (a) => a.fromSceneId === fromSceneId && a.toSceneId === toSceneId,
  );
}
