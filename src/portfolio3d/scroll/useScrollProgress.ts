import { useEffect, useRef, useCallback } from "react";
import { createScrollProgressController } from "./ScrollProgressController";

export function useScrollProgress() {
  const controllerRef = useRef<ReturnType<typeof createScrollProgressController> | null>(null);

  const update = useCallback(() => {
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

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, [update]);
}
