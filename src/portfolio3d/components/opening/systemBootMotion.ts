/**
 * systemBootMotion.ts
 * Pure motion helpers mapping Scene 01 localProgress to narrative cinematic beats.
 */

export interface SystemBootMotionState {
  // Narrative Timeline Beats
  dormant: number;          // 0.00 – 0.12 (sleep seed)
  firstPulse: number;       // 0.10 – 0.22 (boot pulse signal)
  shellFormation: number;   // 0.20 – 0.32 (wireframe construction)
  coreStabilize: number;    // 0.30 – 0.42 (orb core stabilization)
  dataGathering: number;    // 0.20 – 0.42 (gathering building blocks)
  identityGather: number;   // 0.30 – 0.40 (data gathers near identity area)
  nameCompile: number;      // 0.38 – 0.52 (progressive name decode)
  nameLock: number;         // 0.50 – 0.58 (name visual lock pulse)
  roleCompile: number;      // 0.54 – 0.68 (role classification sweep)
  identityHold: number;     // 0.66 – 0.76 (stable system metadata hold)
  identityExit: number;     // 0.74 – 0.88 (dissolving/compressing to kernel)
  layersOnline: number;     // 0.58 – 0.78 (stack components online)
  systemLock: number;       // 0.74 – 0.86 (system ready lock)
  portalOpen: number;       // 0.84 – 0.94 (entry point open)
  enterSystem: number;      // 0.94 – 1.00 (plunge through core)

  // Derived reveal animations mapped to the timeline (for backward compatibility)
  identityCompile: number;  // 0.36 – 0.62 (overall compile window)
  nameReveal: number;       // mapped to nameCompile
  roleReveal: number;       // mapped to roleCompile
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

  const dormant = normalizeRange(p, 0.00, 0.12);
  const firstPulse = smoothstep01(normalizeRange(p, 0.10, 0.22));
  const shellFormation = smoothstep01(normalizeRange(p, 0.20, 0.32));
  const coreStabilize = smoothstep01(normalizeRange(p, 0.30, 0.42));
  const dataGathering = smoothstep01(normalizeRange(p, 0.20, 0.42));
  
  // Compiled Identity Beats
  const identityGather = smoothstep01(normalizeRange(p, 0.30, 0.40));
  const nameCompile = smoothstep01(normalizeRange(p, 0.38, 0.52));
  const nameLock = smoothstep01(normalizeRange(p, 0.50, 0.58));
  const roleCompile = smoothstep01(normalizeRange(p, 0.54, 0.68));
  const identityHold = smoothstep01(normalizeRange(p, 0.66, 0.76));
  const identityExit = smoothstep01(normalizeRange(p, 0.74, 0.88));

  // Overall compile window for background dimming and core shrinkage
  const identityCompile = smoothstep01(normalizeRange(p, 0.36, 0.62));

  // Other Stretched Beats
  const layersOnline = smoothstep01(normalizeRange(p, 0.58, 0.78));
  const systemLock = smoothstep01(normalizeRange(p, 0.74, 0.86));
  const portalOpen = smoothstep01(normalizeRange(p, 0.84, 0.94));
  const enterSystem = smoothstep01(normalizeRange(p, 0.94, 1.00));

  // Derived reveals for compatibility
  const nameReveal = nameCompile;
  const roleReveal = roleCompile;

  return {
    dormant,
    firstPulse,
    shellFormation,
    coreStabilize,
    dataGathering,
    identityGather,
    nameCompile,
    nameLock,
    roleCompile,
    identityHold,
    identityExit,
    identityCompile,
    layersOnline,
    systemLock,
    portalOpen,
    enterSystem,
    nameReveal,
    roleReveal,
  };
}
