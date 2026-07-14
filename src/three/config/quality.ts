export type QualityTier = 'low' | 'medium' | 'high';

export interface QualitySettings {
  dpr: [number, number];
  shadows: boolean;
  postprocessing: boolean;
  maxParticles: number;
}

export const QUALITY_CONFIG: Record<QualityTier, QualitySettings> = {
  low: {
    dpr: [1, 1],
    shadows: false,
    postprocessing: false,
    maxParticles: 0,
  },
  medium: {
    dpr: [1, 1.5],
    shadows: false,
    postprocessing: false,
    maxParticles: 100,
  },
  high: {
    dpr: [1, 2],
    shadows: true,
    postprocessing: true,
    maxParticles: 300,
  },
};

/**
 * Basic heuristic to detect initial device quality tier.
 * Degrades gracefully on mobile or constrained environments.
 */
export function detectDeviceQualityTier(): QualityTier {
  if (typeof window === 'undefined') {
    return 'medium';
  }

  // Check if hardware concurrency is low
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile || cores <= 4) {
    return 'medium';
  }

  return 'high';
}

/**
 * Retrieve explicit settings for a requested quality tier.
 */
export function getQualitySettings(tier: QualityTier): QualitySettings {
  return QUALITY_CONFIG[tier];
}
