/**
 * Global portfolio state contract.
 *
 * This file defines state types only.
 * It must not contain scroll listeners, camera logic, scene logic,
 * device-tier detection, WebGL detection, or runtime side effects.
 */

export type DeviceTier = "low" | "medium" | "high";

export interface PortfolioState {
  scrollProgress: number;
  activeSceneIndex: number;
  sceneLocalProgress: number;
  deviceTier: DeviceTier;
  reducedMotion: boolean;
  webglSupported: boolean;
  isLoading: boolean;

  setScrollProgress: (progress: number) => void;
  setActiveScene: (index: number, localProgress: number) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setReducedMotion: (value: boolean) => void;
  setWebglSupported: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}
