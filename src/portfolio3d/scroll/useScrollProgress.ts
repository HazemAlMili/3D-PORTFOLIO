import { useEffect, useRef, useCallback } from "react";
import { createScrollProgressController } from "./ScrollProgressController";
import { usePortfolioStore } from "../store/portfolioStore";

export function useScrollProgress() {
  const controllerRef = useRef<ReturnType<typeof createScrollProgressController> | null>(null);
  const targetProgressRef = useRef(0);
  const isHandlingWheelOrTouchRef = useRef(false);
  const wheelOrTouchTimeoutRef = useRef<number | null>(null);

  const setHandlingWheelOrTouch = useCallback(() => {
    isHandlingWheelOrTouchRef.current = true;
    if (wheelOrTouchTimeoutRef.current !== null) {
      window.clearTimeout(wheelOrTouchTimeoutRef.current);
    }
    wheelOrTouchTimeoutRef.current = window.setTimeout(() => {
      if (controllerRef.current && controllerRef.current.isAnimating()) {
        // If still animating, defer resetting to false
        setHandlingWheelOrTouch();
      } else {
        isHandlingWheelOrTouchRef.current = false;
      }
    }, 150);
  }, []);

  const update = useCallback(() => {
    if (isHandlingWheelOrTouchRef.current) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    targetProgressRef.current = progress;
    if (controllerRef.current) {
      controllerRef.current.updateProgress(progress, { syncScrollbar: false });
    }
  }, []);

  useEffect(() => {
    controllerRef.current = createScrollProgressController();
    targetProgressRef.current = usePortfolioStore.getState().scrollProgress;
    update();

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // Intercept native wheel to kill default momentum and drift
      e.preventDefault();
      setHandlingWheelOrTouch();

      let deltaY = e.deltaY;

      // Normalize line-scroll delta in Firefox
      if (e.deltaMode === 1) {
        deltaY *= 40;
      }

      // Clamp max delta per event to limit single-tick velocity
      const maxWheelDelta = 80;
      const clampedDeltaY = Math.min(maxWheelDelta, Math.max(-maxWheelDelta, deltaY));

      // Map wheel delta to a controlled, small progress step (further reduced to 0.00003 for high-precision slowdown)
      const speedMultiplier = 0.00003;
      const progressDelta = clampedDeltaY * speedMultiplier;

      // Apply deadzone to ignore tiny trackpad/inertia deltas
      if (Math.abs(progressDelta) < 0.0001) return;

      const nextProgress = Math.min(1, Math.max(0, targetProgressRef.current + progressDelta));
      targetProgressRef.current = nextProgress;

      if (controllerRef.current) {
        controllerRef.current.updateProgress(nextProgress, { syncScrollbar: true });
      }
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

        // Slow down touch swipe to 0.0002 for high-precision trackpad drift
        const speedMultiplier = 0.0002;
        const progressDelta = deltaY * speedMultiplier;

        if (Math.abs(progressDelta) < 0.0001) return;

        const nextProgress = Math.min(1, Math.max(0, targetProgressRef.current + progressDelta));
        targetProgressRef.current = nextProgress;

        if (controllerRef.current) {
          controllerRef.current.updateProgress(nextProgress, { syncScrollbar: true });
        }
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
      if (wheelOrTouchTimeoutRef.current !== null) {
        window.clearTimeout(wheelOrTouchTimeoutRef.current);
      }
    };
  }, [update, setHandlingWheelOrTouch]);
}
