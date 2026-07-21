/**
 * scene05Config.ts
 * Pacing constants, anchors, and colors for Scene 05 (Product UX Thinking).
 */

import { SCENE_04_ANCHORS, resolveUXTransferWorldAnchor } from "./scene04Config";

export const SCENE_05_SUB_PHASES = {
  approach: [0.00, 0.30] as [number, number],
  enter:    [0.30, 0.46] as [number, number],
  immerse:  [0.46, 0.85] as [number, number],
  exit:     [0.85, 1.00] as [number, number],
} as const;

export const SCENE_05_COLORS = {
  bezel:          "#1D212A", // graphite
  accentCyan:     "#38D6FF", // system active LED
  textPrimary:    "#F4F7FA",
  textSecondary:  "#A0AEC0",
} as const;

export const SCENE_05_ANCHORS = {
  /**
   * Source anchor representing the laptop screen center from Scene 04.
   * Conceptually, the project work exits from here.
   */
  laptopProjectsSource: SCENE_04_ANCHORS.laptopScreenTarget,
  /**
   * Target receiving anchor representing the center of the Tablet device
   * screen inside Scene 05.
   */
  tabletUXTarget: [0, 0, 0.062] as [number, number, number],
} as const;

export function resolveScene05SourceAnchor(isMobile: boolean): [number, number, number] {
  return resolveUXTransferWorldAnchor(isMobile);
}
