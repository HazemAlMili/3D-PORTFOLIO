import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "../store/portfolioStore";

export interface PointerInfluence {
  targetX: number;
  targetY: number;
  smoothX: number;
  smoothY: number;
  velocity: number;
  isPointerActive: boolean;
  isHoveringInteractive: boolean;
  hoveredId: string | null;
}

export const pointerInfluence: PointerInfluence = {
  targetX: 0,
  targetY: 0,
  smoothX: 0,
  smoothY: 0,
  velocity: 0,
  isPointerActive: false,
  isHoveringInteractive: false,
  hoveredId: null,
};

let lastX = 0;
let lastY = 0;
let lastTime = 0;
let lastFrameTime = 0;

export function usePointerListener() {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      pointerInfluence.targetX = 0;
      pointerInfluence.targetY = 0;
      pointerInfluence.smoothX = 0;
      pointerInfluence.smoothY = 0;
      pointerInfluence.velocity = 0;
      pointerInfluence.isPointerActive = false;
      pointerInfluence.isHoveringInteractive = false;
      pointerInfluence.hoveredId = null;
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      pointerInfluence.targetX = nx;
      pointerInfluence.targetY = ny;
      pointerInfluence.isPointerActive = true;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 16) {
        const dx = nx - lastX;
        const dy = ny - lastY;
        pointerInfluence.velocity = Math.sqrt(dx * dx + dy * dy) / (dt / 1000);
        lastX = nx;
        lastY = ny;
        lastTime = now;
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const interactive = (e.target as HTMLElement).closest("[data-interactive]");
      if (interactive) {
        pointerInfluence.isHoveringInteractive = true;
        pointerInfluence.hoveredId = interactive.getAttribute("data-interactive") || "active";
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest("[data-interactive]");
      if (interactive) {
        pointerInfluence.isHoveringInteractive = false;
        pointerInfluence.hoveredId = null;
      }
    };

    const handlePointerLeave = () => {
      pointerInfluence.targetX = 0;
      pointerInfluence.targetY = 0;
      pointerInfluence.isPointerActive = false;
      pointerInfluence.isHoveringInteractive = false;
      pointerInfluence.hoveredId = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion]);
}

export function usePointerInfluence() {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  useFrame((state, delta) => {
    if (reducedMotion) {
      pointerInfluence.targetX = 0;
      pointerInfluence.targetY = 0;
      pointerInfluence.smoothX = 0;
      pointerInfluence.smoothY = 0;
      pointerInfluence.velocity = 0;
      return;
    }

    const t = state.clock.getElapsedTime();
    if (t !== lastFrameTime) {
      lastFrameTime = t;

      const dampSpeed = 4.5;
      const lerpFactor = Math.min(1, delta * dampSpeed);

      pointerInfluence.smoothX += (pointerInfluence.targetX - pointerInfluence.smoothX) * lerpFactor;
      pointerInfluence.smoothY += (pointerInfluence.targetY - pointerInfluence.smoothY) * lerpFactor;

      pointerInfluence.velocity += (0 - pointerInfluence.velocity) * Math.min(1, delta * 2.0);
    }
  });

  return pointerInfluence;
}
