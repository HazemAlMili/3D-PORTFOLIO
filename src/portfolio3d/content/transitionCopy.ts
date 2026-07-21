/**
 * transitionCopy.ts
 *
 * Cinematic story arc micro-copy for scene transitions.
 *
 * Story Arc & Transition Narrative Blueprint — Task 2
 * Approved: Post-Final Cinematic Repair / Task 2
 *
 * Rules:
 * - Max 7 words per caption
 * - Premium, subtle, non-generic tone
 * - No hype, no clichés, no corporate copy
 * - Captions appear during the exit/approach phase of each transition only
 * - Must be silent during the immerse (hold) phase
 * - Reduced motion: captions must still render but skip fade animation
 *
 * Do not add runtime logic to this file.
 * Do not add React hooks, DOM access, or camera logic here.
 */

import type { SceneId } from "./types";

/**
 * TransitionCopy defines the approved copy for a single scene-to-scene transition.
 * The "from" scene is exiting, the "to" scene is approaching.
 */
export interface TransitionCopy {
  /** The scene the camera is leaving */
  from: SceneId;
  /** The scene the camera is entering */
  to: SceneId;
  /**
   * The approved caption for this transition.
   * Displayed during the from-scene exit / to-scene approach phases.
   * Max 7 words. Premium tone.
   */
  caption: string;
  /**
   * Alternative caption candidates (not currently rendered).
   * Preserved here for future review or A/B testing.
   */
  alternates: [string, string];
}

/**
 * TRANSITION_COPY — all 7 scene transition captions.
 *
 * One-line story:
 * "A developer who builds everything from the pixel to the pipeline —
 *  and this portfolio is the proof."
 *
 * Journey arc:
 * awe → recognition → respect → conviction → empathy → rigor → revelation → resolution
 */
export const TRANSITION_COPY: TransitionCopy[] = [
  {
    from: "scene-01-opening",
    to: "scene-02-hero",
    caption: "The architecture has an author.",
    alternates: [
      "Behind every system, a mind.",
      "Signal finds its source.",
    ],
  },
  {
    from: "scene-02-hero",
    to: "scene-03-architecture",
    caption: "From identity to architecture.",
    alternates: [
      "From intention to infrastructure.",
      "The mind reveals its structure.",
    ],
  },
  {
    from: "scene-03-architecture",
    to: "scene-04-projects",
    caption: "",
    alternates: [
      "Architecture, tested in the real.",
      "Design becomes delivery.",
    ],
  },
  {
    from: "scene-04-projects",
    to: "scene-05-product-ux",
    caption: "Function was never enough.",
    alternates: [
      "Beyond delivery: the experience.",
      "The screen is just the surface.",
    ],
  },
  {
    from: "scene-05-product-ux",
    to: "scene-06-responsive-performance",
    caption: "Craft holds at every breakpoint.",
    alternates: [
      "Care is nothing without discipline.",
      "Built for real devices. Real users.",
    ],
  },
  {
    from: "scene-06-responsive-performance",
    to: "scene-07-system-core",
    caption: "Behind performance, systems move.",
    alternates: [
      "The screen ends. The system begins.",
      "Deeper than the interface.",
    ],
  },
  {
    from: "scene-07-system-core",
    to: "scene-08-contact",
    caption: "The system is ready. So is he.",
    alternates: [
      "Systems built. Collaboration open.",
      "Every thread leads here.",
    ],
  },
];

/**
 * Helper — look up the approved caption for a given transition pair.
 * Returns undefined if no caption is defined for that pair.
 */
export function getTransitionCaption(
  from: SceneId,
  to: SceneId,
): string | undefined {
  return TRANSITION_COPY.find((t) => t.from === from && t.to === to)?.caption;
}
