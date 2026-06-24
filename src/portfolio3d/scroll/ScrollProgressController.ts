import { usePortfolioStore } from "../store/portfolioStore";

let rafId: number | null = null;
let pendingProgress: number | null = null;
let lastSentProgress: number | null = null;

export function createScrollProgressController() {
  const setScrollProgress = usePortfolioStore.getState().setScrollProgress;

  function flush() {
    if (pendingProgress !== null) {
      if (lastSentProgress === null || Math.abs(pendingProgress - lastSentProgress) > 0.0001) {
        setScrollProgress(pendingProgress);
        lastSentProgress = pendingProgress;
      }
      pendingProgress = null;
    }
    rafId = null;
  }

  function updateProgress(raw: number) {
    const clamped = Math.min(1, Math.max(0, raw));
    pendingProgress = clamped;
    if (rafId === null) {
      rafId = requestAnimationFrame(flush);
    }
  }

  function destroy() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    pendingProgress = null;
    lastSentProgress = null;
  }

  return { updateProgress, destroy };
}
