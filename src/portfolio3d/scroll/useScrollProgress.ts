import { useEffect, useRef, useCallback } from "react";
import { createScrollProgressController } from "./ScrollProgressController";
import { usePortfolioStore } from "../store/portfolioStore";
import { MAX_PROGRESS_DELTA_MOBILE } from "./scrollProtection";
import { isMobileDevice } from "../utils/mobileUtils";

// ─────────────────────────────────────────────────────────────────────────────
// Scroll profiles
// ─────────────────────────────────────────────────────────────────────────────

const DESKTOP_PROFILE = {
  // Wheel: maps raw pixel delta to progress step
  // Clamp: ±80px per event (limits single-tick velocity)
  wheelMultiplier: 0.00003,
  maxWheelDelta: 80,
  // Deadzone: ignore tiny trackpad inertia drifts
  wheelDeadzone: 0.0001,
};

const MOBILE_PROFILE = {
  // Touch multiplier is tuned to be cinematic:
  //   old: 0.0002 → a 50px swipe = 0.010 progress (skips beats)
  //   new: 0.00008 → a 50px swipe = 0.004 progress (controlled glide)
  touchMultiplier: 0.00008,
  // Per-event flick clamp: max raw delta accepted per touchmove event (px)
  // Stops aggressive flicks from jumping across scenes
  maxTouchDeltaPx: 35,
  // Deadzone: ignore micro-oscillations from resting finger
  touchDeadzone: 0.00008,
  // Max progress step per controller frame (tighter than desktop)
  maxProgressDelta: MAX_PROGRESS_DELTA_MOBILE,
};

// ─────────────────────────────────────────────────────────────────────────────
// Stable viewport height
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a stable viewport height that does not jump when the mobile browser
 * address bar collapses/expands. Prefers visualViewport when available.
 */
function getStableViewportHeight(): number {
  if (typeof window === "undefined") return 768;
  // visualViewport is stable even when address bar animates
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  return window.innerHeight;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useScrollProgress() {
  const controllerRef = useRef<ReturnType<typeof createScrollProgressController> | null>(null);
  const targetProgressRef = useRef(0);
  const isHandlingWheelOrTouchRef = useRef(false);
  const wheelOrTouchTimeoutRef = useRef<number | null>(null);
  // Track per-frame touch velocity for flick detection
  const lastTouchDeltaRef = useRef(0);

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
    }, 200); // extended from 150ms to 200ms to give mobile more settle time
  }, []);

  const update = useCallback(() => {
    // Block native scroll updates while touch/wheel is actively controlling progress
    // This prevents the duplicate input path (native scroll event + touchmove)
    if (isHandlingWheelOrTouchRef.current) return;

    const scrollY = window.scrollY;
    const viewportH = getStableViewportHeight();
    const maxScroll = document.documentElement.scrollHeight - viewportH;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    targetProgressRef.current = progress;
    if (controllerRef.current) {
      controllerRef.current.updateProgress(progress, { syncScrollbar: false });
    }
  }, []);

  useEffect(() => {
    let qaScrollTimeoutId: number | null = null;

    // ── Query Parameter Hook for QA screenshot validation ───────────────────
    const urlParams = new URLSearchParams(window.location.search);
    const progressParam = urlParams.get("progress");
    const reducedMotionParam = urlParams.get("reducedMotion");

    if (reducedMotionParam === "true") {
      usePortfolioStore.getState().setReducedMotion(true);
    } else if (reducedMotionParam === "false") {
      usePortfolioStore.getState().setReducedMotion(false);
    }

    controllerRef.current = createScrollProgressController();

    if (progressParam !== null) {
      const parsed = parseFloat(progressParam);
      if (!isNaN(parsed)) {
        usePortfolioStore.getState().setScrollProgress(parsed);
        targetProgressRef.current = parsed;
        // Schedule scroll alignment to ensure DOM layout is complete
        qaScrollTimeoutId = window.setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, maxScroll * parsed);
        }, 50);
      } else {
        targetProgressRef.current = usePortfolioStore.getState().scrollProgress;
        update();
      }
    } else {
      targetProgressRef.current = usePortfolioStore.getState().scrollProgress;
      update();
    }

    const isMobile = isMobileDevice();

    // ── Viewport height stabilization for mobile ────────────────────────────
    // Re-run progress calculation when visualViewport resizes (address bar collapse)
    // Use a ref-based timeout to debounce rapid resize events during scroll
    const vpResizeTimeoutRef: { current: number | null } = { current: null };
    const handleViewportResize = () => {
      if (vpResizeTimeoutRef.current !== null) {
        window.clearTimeout(vpResizeTimeoutRef.current);
      }
      vpResizeTimeoutRef.current = window.setTimeout(() => {
        // Only update if not in active touch gesture
        if (!isHandlingWheelOrTouchRef.current) {
          update();
        }
      }, 80);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportResize);
    }

    // ── Touch state ─────────────────────────────────────────────────────────
    let touchStartY = 0;

    // ── Wheel handler (desktop) ──────────────────────────────────────────────
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
      const clampedDeltaY = Math.min(
        DESKTOP_PROFILE.maxWheelDelta,
        Math.max(-DESKTOP_PROFILE.maxWheelDelta, deltaY)
      );

      const progressDelta = clampedDeltaY * DESKTOP_PROFILE.wheelMultiplier;

      // Apply deadzone to ignore tiny trackpad/inertia deltas
      if (Math.abs(progressDelta) < DESKTOP_PROFILE.wheelDeadzone) return;

      const nextProgress = Math.min(1, Math.max(0, targetProgressRef.current + progressDelta));
      targetProgressRef.current = nextProgress;

      if (controllerRef.current) {
        controllerRef.current.updateProgress(nextProgress, { syncScrollbar: true });
      }
    };

    // ── Touch handlers (mobile) ───────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        lastTouchDeltaRef.current = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const rawDeltaY = touchStartY - touchY;
        touchStartY = touchY;

        if (e.cancelable) {
          e.preventDefault();
        }
        setHandlingWheelOrTouch();

        if (isMobile) {
          // ── Mobile cinematic profile ──────────────────────────────────────
          // 1. Hard-clamp raw pixel delta to stop aggressive flicks
          const clampedDeltaY = Math.min(
            MOBILE_PROFILE.maxTouchDeltaPx,
            Math.max(-MOBILE_PROFILE.maxTouchDeltaPx, rawDeltaY)
          );

          // 2. Apply mobile touch multiplier (significantly slower than desktop)
          const progressDelta = clampedDeltaY * MOBILE_PROFILE.touchMultiplier;

          // 3. Deadzone to ignore resting finger micro-oscillations
          if (Math.abs(progressDelta) < MOBILE_PROFILE.touchDeadzone) return;

          // 4. Clamp how far targetProgress can jump from current (prevents beat-skipping)
          const currentProgress = usePortfolioStore.getState().scrollProgress;
          const rawNext = targetProgressRef.current + progressDelta;
          const clampedNext = Math.min(
            currentProgress + MOBILE_PROFILE.maxProgressDelta,
            Math.max(currentProgress - MOBILE_PROFILE.maxProgressDelta, rawNext)
          );
          const nextProgress = Math.min(1, Math.max(0, clampedNext));
          targetProgressRef.current = nextProgress;

          lastTouchDeltaRef.current = progressDelta;

          if (controllerRef.current) {
            controllerRef.current.updateProgress(nextProgress, {
              syncScrollbar: true,
              maxDelta: MOBILE_PROFILE.maxProgressDelta,
            });
          }
        } else {
          // ── Desktop touch (trackpad swipe gestures) ───────────────────────
          const progressDelta = rawDeltaY * 0.0002;
          if (Math.abs(progressDelta) < 0.0001) return;
          const nextProgress = Math.min(1, Math.max(0, targetProgressRef.current + progressDelta));
          targetProgressRef.current = nextProgress;

          if (controllerRef.current) {
            controllerRef.current.updateProgress(nextProgress, { syncScrollbar: true });
          }
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

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleViewportResize);
      }
      if (vpResizeTimeoutRef.current !== null) {
        window.clearTimeout(vpResizeTimeoutRef.current);
      }

      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
      if (wheelOrTouchTimeoutRef.current !== null) {
        window.clearTimeout(wheelOrTouchTimeoutRef.current);
      }
      if (qaScrollTimeoutId !== null) {
        window.clearTimeout(qaScrollTimeoutId);
      }
    };
  }, [update, setHandlingWheelOrTouch]);
}
