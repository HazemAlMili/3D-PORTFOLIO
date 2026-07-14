import { create } from "zustand";
import type { DeviceTier, PortfolioState } from "./storeTypes";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { getSceneProgress } from "../scroll/SceneProgressMapper";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  activeSceneIndex: 0,
  sceneLocalProgress: 0,
  deviceTier: "high",
  reducedMotion: false,
  webglSupported: true,
  isLoading: true,

  setScrollProgress: (progress) => {
    const nextProgress = clamp01(progress);

    // Sync active scene index and local progress synchronously to establish a single clock source
    const segments = buildSceneSegments();
    const sceneProgress = getSceneProgress(nextProgress, segments);

    set({
      scrollProgress: nextProgress,
      activeSceneIndex: sceneProgress.sceneIndex,
      sceneLocalProgress: sceneProgress.localProgress,
    });
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

  dpr: 2,
  setDpr: (value) =>
    set({
      dpr: value,
    }),
}));

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).portfolioStore = usePortfolioStore;
}

