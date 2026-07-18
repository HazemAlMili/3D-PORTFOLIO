/**
 * systemBootMotion.ts
 * Pure motion helpers mapping Scene 01 localProgress to narrative cinematic beats.
 */

export interface SystemBootMotionState {
  // Narrative Timeline Beats (Stretched and storyboard locked)
  dormant: number;          // 0.00 – 0.14 (dormant hold)
  firstPulse: number;       // 0.14 – 0.26 (first pulse / kernel boot)
  shellFormation: number;   // 0.26 – 0.42 (wireframe construction - synced to data gathering)
  coreStabilize: number;    // 0.30 – 0.42 (core stabilization)
  dataGathering: number;    // 0.26 – 0.42 (data gathers from outer space)
  
  // HUD panel timings
  panelEnter: number;       // 0.62 – 0.72 (HUD panel opacity/clip reveal)
  panelHold: number;        // 0.72 – 0.84 (HUD panel readable hold)
  panelExit: number;        // 0.84 – 0.92 (HUD panel dissolve / compression)
  
  layersOnline: number;     // 0.72 – 0.84 (full-stack layers progressive build)
  systemLock: number;       // 0.82 – 0.90 (system lock / portal anticipation)
  collapseProgress: number; // 0.80 – 0.96 (cinematic ingestion collapse into kernel)
  kernelAbsorb: number;     // 0.88 – 0.98 (kernel absorption brightness feedback)
  portalOpen: number;       // 0.90 – 1.00 (portal opens)
  enterSystem: number;      // 0.94 – 1.00 (camera plunge)
  
  // Derived helper weights
  panelOpacity: number;
  panelLineDraw: number;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function normalizeRange(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp01((value - min) / (max - min));
}

export function smoothstep01(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Derives normalized 0-1 values for each narrative beat of the System Boot Cinematic.
 */
export function getSystemBootMotionState(localProgress: number): SystemBootMotionState {
  const p = clamp01(localProgress);

  const dormant = normalizeRange(p, 0.00, 0.05);           // 0.00 – 0.05 (very brief hold)
  const firstPulse = smoothstep01(normalizeRange(p, 0.05, 0.18));   // 0.05 – 0.18
  const shellFormation = smoothstep01(normalizeRange(p, 0.18, 0.36));
  const coreStabilize = smoothstep01(normalizeRange(p, 0.22, 0.36));
  const dataGathering = smoothstep01(normalizeRange(p, 0.18, 0.36));

  // Panel Timings
  const panelEnter = smoothstep01(normalizeRange(p, 0.58, 0.68));
  const panelHold = normalizeRange(p, 0.68, 0.82);
  const panelExit = smoothstep01(normalizeRange(p, 0.82, 0.90));

  // Architectural layers and portal locking
  const layersOnline = smoothstep01(normalizeRange(p, 0.68, 0.82));
  const systemLock = smoothstep01(normalizeRange(p, 0.80, 0.88));
  const collapseProgress = smoothstep01(normalizeRange(p, 0.78, 0.95));
  const kernelAbsorb = smoothstep01(normalizeRange(p, 0.86, 0.97));
  const portalOpen = smoothstep01(normalizeRange(p, 0.88, 1.00));
  const enterSystem = smoothstep01(normalizeRange(p, 0.95, 1.00));

  // Compute composite opacity and line drawing progress for the panel HUD
  let panelOpacity = 0;
  if (p >= 0.62 && p <= 0.92) {
    if (p < 0.72) {
      panelOpacity = panelEnter;
    } else if (p < 0.84) {
      panelOpacity = 1.0;
    } else {
      panelOpacity = 1.0 - panelExit;
    }
  }

  const panelLineDraw = panelOpacity;

  return {
    dormant,
    firstPulse,
    shellFormation,
    coreStabilize,
    dataGathering,
    panelEnter,
    panelHold,
    panelExit,
    layersOnline,
    systemLock,
    collapseProgress,
    kernelAbsorb,
    portalOpen,
    enterSystem,
    panelOpacity,
    panelLineDraw,
  };
}
