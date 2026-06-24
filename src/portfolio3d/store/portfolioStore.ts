import { create } from "zustand";
import type { DeviceTier, PortfolioState } from "./storeTypes";
import { clampScrollDelta } from "../scroll/scrollProtection";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  scrollProgress: 0,
  activeSceneIndex: 0,
  sceneLocalProgress: 0,
  deviceTier: "high",
  reducedMotion: false,
  webglSupported: true,
  isLoading: true,

  setScrollProgress: (progress) => {
    const current = get().scrollProgress;
    // Clamp delta to MAX_PROGRESS_DELTA to prevent velocity jumps from skipping scenes
    const safe = clampScrollDelta(current, progress);
    set({ scrollProgress: clamp01(safe) });
  },

  setActiveScene: (index, localProgress) =>
    set({
      activeSceneIndex: Math.max(0, index),
      sceneLocalProgress: clamp01(localProgress),
    }),

  setDeviceTier: (tier: DeviceTier) =>
    set({
      deviceTier: tier,
    }),

  setReducedMotion: (value) =>
    set({
      reducedMotion: value,
    }),

  setWebglSupported: (value) =>
    set({
      webglSupported: value,
    }),

  setLoading: (value) =>
    set({
      isLoading: value,
    }),
}));
