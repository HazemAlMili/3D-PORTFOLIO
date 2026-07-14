import { useMemo } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { buildSceneSegments } from "../scroll/scrollSegments";

export function GlobalTransitionLayer() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const opacity = useMemo(() => {
    if (reducedMotion) return 0;

    const segments = buildSceneSegments();
    const p = Math.min(1, Math.max(0, scrollProgress));

    // Find if we are near any boundary
    for (let i = 0; i < segments.length - 1; i++) {
      const segA = segments[i];
      const segB = segments[i + 1];

      // Outgoing scene A exit phase check (localProgress from 0.88 to 1.00)
      const rangeA = segA.end - segA.start || 1;
      const localProgressA = (p - segA.start) / rangeA;

      if (localProgressA >= 0.88 && localProgressA <= 1.0) {
        // Map 0.88 -> 1.0 to opacity 0 -> 1 using smoothstep
        const t = (localProgressA - 0.88) / 0.12;
        return t * t * (3 - 2 * t);
      }

      // Incoming scene B approach phase check (localProgress from 0.00 to 0.12)
      const rangeB = segB.end - segB.start || 1;
      const localProgressB = (p - segB.start) / rangeB;

      if (localProgressB >= 0.00 && localProgressB <= 0.12) {
        // Map 0.00 -> 0.12 to opacity 1 -> 0 using smoothstep
        const t = 1 - (localProgressB - 0.00) / 0.12;
        return t * t * (3 - 2 * t);
      }
    }

    return 0;
  }, [scrollProgress, reducedMotion]);

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5, // Sits between WebGL Canvas (z=1) and Content Overlays (z=10)
        background: `radial-gradient(circle, rgba(5,7,10,0.55) 0%, rgba(5,7,10,0.98) 80%),
                     linear-gradient(135deg, rgba(56,214,255,${opacity * 0.06}) 0%, rgba(5,7,10,0) 50%, rgba(56,214,255,${opacity * 0.06}) 100%)`,
        opacity: opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    </div>
  );
}

export default GlobalTransitionLayer;
