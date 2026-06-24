export const SCENE_01_TEXT = {
  title: "The System Behind Every Screen",
  subtitle: "Cinematic Full Stack Developer Portfolio",
  cta: "SCROLL TO EXPLORE ▼",
};

export const SCENE_01_COLORS = {
  bezel: "#2D2D2D",
  screenBg: "#0B0F14",
  screenGlow: "#00B4D8",
  gold: "#D8A84F",
  textPrimary: "#F4F7FA",
  textSecondary: "#B0B8C0",
  textCyan: "#00B4D8",
};

export const SCENE_01_PAGING = {
  weight: 0.16,
  subPhases: {
    approach: [0, 0.20] as [number, number],   // 0.00 -> 0.032
    enter: [0.20, 0.35] as [number, number],      // 0.032 -> 0.056
    immerse: [0.35, 0.75] as [number, number],    // 0.056 -> 0.120 (EXTENDED)
    exit: [0.75, 1.0] as [number, number],        // 0.120 -> 0.160
  }
};
