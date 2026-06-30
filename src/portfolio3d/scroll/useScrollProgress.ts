import { useEffect, useRef, useCallback } from "react";
import { createScrollProgressController } from "./ScrollProgressController";
import { usePortfolioStore } from "../store/portfolioStore";

let isHandlingWheelOrTouch = false;
let wheelOrTouchTimeout: number | null = null;

function setHandlingWheelOrTouch() {
  isHandlingWheelOrTouch = true;
  if (wheelOrTouchTimeout !== null) {
    window.clearTimeout(wheelOrTouchTimeout);
  }
  wheelOrTouchTimeout = window.setTimeout(() => {
    isHandlingWheelOrTouch = false;
  }, 150); // Buffer to cover trailing wheel/touch inertial updates
}

export function useScrollProgress() {
  const controllerRef = useRef<ReturnType<typeof createScrollProgressController> | null>(null);

  const update = useCallback(() => {
    if (isHandlingWheelOrTouch) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    if (controllerRef.current) {
      controllerRef.current.updateProgress(progress);
    }
  }, []);

  useEffect(() => {
    controllerRef.current = createScrollProgressController();
    update();

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // Intercept native wheel to kill default momentum and drift
      e.preventDefault();
      setHandlingWheelOrTouch();

      const current = usePortfolioStore.getState().scrollProgress;
      let deltaY = e.deltaY;

      // Normalize line-scroll delta in Firefox
      if (e.deltaMode === 1) {
        deltaY *= 40;
      }

      // Clamp max delta per event to limit single-tick velocity
      const maxWheelDelta = 100;
      const clampedDeltaY = Math.min(maxWheelDelta, Math.max(-maxWheelDelta, deltaY));

      // Map wheel delta to a controlled, small progress step
      const speedMultiplier = 0.00008;
      const progressDelta = clampedDeltaY * speedMultiplier;

      // Apply deadzone to ignore tiny trackpad/inertia deltas
      if (Math.abs(progressDelta) < 0.00015) return;

      const nextProgress = Math.min(1, Math.max(0, current + progressDelta));
      usePortfolioStore.getState().setScrollProgress(nextProgress);

      // Sync the native scrollbar position so dragging still aligns
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll * nextProgress);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        touchStartY = touchY;

        if (e.cancelable) {
          e.preventDefault();
        }
        setHandlingWheelOrTouch();

        const current = usePortfolioStore.getState().scrollProgress;
        const speedMultiplier = 0.0006;
        const progressDelta = deltaY * speedMultiplier;

        if (Math.abs(progressDelta) < 0.0001) return;

        const nextProgress = Math.min(1, Math.max(0, current + progressDelta));
        usePortfolioStore.getState().setScrollProgress(nextProgress);

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * nextProgress);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);

      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
      if (wheelOrTouchTimeout !== null) {
        window.clearTimeout(wheelOrTouchTimeout);
      }
    };
  }, [update]);
}
