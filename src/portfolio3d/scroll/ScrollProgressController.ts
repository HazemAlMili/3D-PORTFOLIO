import { usePortfolioStore } from "../store/portfolioStore";

let rafId: number | null = null;
let targetProgress: number | null = null;

export function createScrollProgressController() {
  const setScrollProgress = usePortfolioStore.getState().setScrollProgress;

  function flush() {
    if (targetProgress !== null) {
      setScrollProgress(targetProgress);
      const current = usePortfolioStore.getState().scrollProgress;

      // If store progress has not yet caught up to target progress (e.g. due to clamping),
      // keep requesting frames until we reach the target.
      if (Math.abs(current - targetProgress) > 0.0001) {
        rafId = requestAnimationFrame(flush);
      } else {
        targetProgress = null;
        rafId = null;
      }
    } else {
      rafId = null;
    }
  }

  function updateProgress(raw: number) {
    const clamped = Math.min(1, Math.max(0, raw));
    const reducedMotion = usePortfolioStore.getState().reducedMotion;

    if (reducedMotion) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      targetProgress = null;
      setScrollProgress(clamped);
    } else {
      targetProgress = clamped;
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
    targetProgress = null;
  }

  return { updateProgress, destroy };
}
