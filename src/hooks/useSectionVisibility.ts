import { useScrollState } from '../context/ScrollStateContext';

export interface SectionVisibilityMetrics {
  opacity: number;
  isVisible: boolean;
}

export interface GlobalVisibilityMap {
  hero: SectionVisibilityMetrics;
  identity: SectionVisibilityMetrics;
  process: SectionVisibilityMetrics;
  projects: SectionVisibilityMetrics;
  contact: SectionVisibilityMetrics;
}

interface WindowBounds {
  start: number;
  peak: number;
  end: number;
}

// Immutable mathematical window mapping constraints matching design parameters
const sectionWindowsMap: Record<keyof GlobalVisibilityMap, WindowBounds> = {
  hero: { start: 0.00, peak: 0.00, end: 0.15 },
  identity: { start: 0.15, peak: 0.25, end: 0.40 },
  process: { start: 0.40, peak: 0.50, end: 0.65 },
  projects: { start: 0.65, peak: 0.75, end: 0.85 },
  contact: { start: 0.85, peak: 1.00, end: 1.00 }
};

/**
 * Computes the localized linear interpolation factor for a given section window.
 */
const calculateSectionOpacity = (progress: number, bounds: WindowBounds): number => {
  if (progress < bounds.start || progress > bounds.end) return 0;
  
  // 1. If scroll progress sits exactly on the localized design peak, force max visibility
  if (progress === bounds.peak) return 1;

  // 2. Ascending Fade-In Vector Calculation
  if (progress < bounds.peak && bounds.peak > bounds.start) {
    const range = bounds.peak - bounds.start;
    return (progress - bounds.start) / range;
  }

  // 3. Descending Fade-Out Vector Calculation
  if (progress > bounds.peak && bounds.end > bounds.peak) {
    const range = bounds.end - bounds.peak;
    return 1 - (progress - bounds.peak) / range;
  }

  return 0;
};

export const useSectionVisibility = (): GlobalVisibilityMap => {
  const { progressRef } = useScrollState();

  // Initialize immutable default structure map safely
  const visibilityMap: GlobalVisibilityMap = {
    hero: { opacity: 0, isVisible: false },
    identity: { opacity: 0, isVisible: false },
    process: { opacity: 0, isVisible: false },
    projects: { opacity: 0, isVisible: false },
    contact: { opacity: 0, isVisible: false }
  };

  const keys = Object.keys(sectionWindowsMap) as (keyof GlobalVisibilityMap)[];

  // Map progress factors over each section container iteratively
  keys.forEach((key) => {
    const bounds = sectionWindowsMap[key];
    const computedOpacity = calculateSectionOpacity(progressRef.current, bounds);
    
    // Smooth opacity bounds and enforce rigid visibility threshold gates (0.01)
    const normalizedOpacity = Math.min(Math.max(computedOpacity, 0), 1);
    const isCurrentlyVisible = normalizedOpacity > 0.01;

    visibilityMap[key] = {
      opacity: normalizedOpacity,
      isVisible: isCurrentlyVisible
    };
  });

  return visibilityMap;
};
