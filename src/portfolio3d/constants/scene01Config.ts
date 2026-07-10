/**
 * scene01Config.ts — Scene 01 System Boot Cinematic Configuration
 */

export const SCENE01_COLORS = {
  background: "#05070A",
  primaryText: "#F4F7FA",
  accentCyan: "#00B4D8",
  deepBlue: "#2F80ED",
  softCyan: "#38D6FF",
  mutedSlate: "#7C8EA3",
} as const;

export const SCENE01_BASE_CONFIG = {
  backgroundColor: SCENE01_COLORS.background,
  accentColor: SCENE01_COLORS.accentCyan,
} as const;
