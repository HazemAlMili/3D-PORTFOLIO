import { useMemo } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { PRODUCT_ENGINE_COPY } from "../constants/scene03Config";
import { buildSceneSegments } from "../scroll/scrollSegments";
import styles from "./ProductEngineOverlay.module.css";

interface ProductEngineOverlayProps {
  localProgress: number;
}

/**
 * ProductEngineOverlay.tsx — Scene 03 Product Assembly Engine DOM Overlay (PRODUCT-01)
 *
 * Left HUD card with product-engine copy, matching the Scene 02 visual grammar:
 *   - Badge: PRODUCT ENGINE // BUILD FLOW
 *   - Headline: Turning ideas into polished digital products.
 *   - Subtext: Designing interfaces, connecting systems, optimizing performance...
 *
 * Layout: absolute left, vertically centered — mirrors Scene 02 HeroOverlay position.
 *
 * Hard boundary: hidden entirely while scrollProgress < scene03.start (inside Scene 02).
 */
export function ProductEngineOverlay({ localProgress }: ProductEngineOverlayProps) {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  const seg03 = useMemo(() => {
    return buildSceneSegments().find((s) => s.sceneId === "scene-03-architecture");
  }, []);

  // Hard boundary isolation: never render while in Scene 02
  if (!seg03 || scrollProgress < seg03.start - 0.001 || localProgress <= 0.0) {
    return null;
  }

  // Decisive exit: fade out cleanly during handoff release (0.94 – 0.98)
  const exitOpacity =
    localProgress > 0.94
      ? Math.max(0, 1.0 - (localProgress - 0.94) / 0.04)
      : 1.0;

  // Derive current phase label from localProgress
  const phaseLabel = getPhaseLabel(localProgress);

  return (
    <div className={styles.overlayRoot} style={{ opacity: exitOpacity }}>
      <div className={styles.hudCard}>

        {/* Badge row */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>{PRODUCT_ENGINE_COPY.statusBadge}</span>
        </div>

        {/* Headline */}
        <h2 className={styles.headline}>
          {PRODUCT_ENGINE_COPY.headline}
        </h2>

        {/* Subtext */}
        <p className={styles.subtext}>
          {PRODUCT_ENGINE_COPY.subtext}
        </p>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Current phase indicator */}
        <span className={styles.phaseLabel}>{phaseLabel}</span>

      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getPhaseLabel(p: number): string {
  if (p < 0.12) return "Idea Spark";
  if (p < 0.26) return "Interface Screens";
  if (p < 0.42) return "Interactive Flow";
  if (p < 0.58) return "System Connections";
  if (p < 0.72) return "Product Content";
  if (p < 0.86) return "Optimization Sweep";
  if (p < 0.94) return "Ready State";
  return "Handoff to Projects";
}
