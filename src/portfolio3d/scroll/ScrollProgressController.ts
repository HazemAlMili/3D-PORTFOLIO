import { usePortfolioStore } from "../store/portfolioStore";
import { clampScrollDelta, MAX_PROGRESS_DELTA } from "./scrollProtection";

export function createScrollProgressController() {
  let rafId: number | null = null;
  let targetProgress: number = 0;
  let syncScrollbar: boolean = false;
  let maxDeltaOverride: number = MAX_PROGRESS_DELTA;

  const SETTLE_EPSILON = 0.0001;

  function flush() {
    const current = usePortfolioStore.getState().scrollProgress;
    const next = clampScrollDelta(current, targetProgress, maxDeltaOverride);
    const settled = Math.abs(next - targetProgress) <= SETTLE_EPSILON;

    const finalNext = settled ? targetProgress : next;
    usePortfolioStore.getState().setScrollProgress(finalNext);

    if (syncScrollbar) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll * finalNext);
    }

    if (settled) {
      rafId = null;
    } else {
      rafId = requestAnimationFrame(flush);
    }
  }

  function updateProgress(target: number, options?: { syncScrollbar?: boolean; maxDelta?: number }) {
    const clamped = Math.min(1, Math.max(0, target));
    const reducedMotion = usePortfolioStore.getState().reducedMotion;

    targetProgress = clamped;
    syncScrollbar = options?.syncScrollbar ?? false;
    maxDeltaOverride = options?.maxDelta ?? MAX_PROGRESS_DELTA;

    if (reducedMotion) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      usePortfolioStore.getState().setScrollProgress(clamped);
      if (syncScrollbar) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * clamped);
      }
    } else {
      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    }
  }

  function destroy() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function isAnimating() {
    return rafId !== null;
  }

  return { updateProgress, destroy, isAnimating };
}
