import { usePortfolioStore } from "../store/portfolioStore";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { SCENE_03_COPY, SDLC_STAGES } from "../constants/scene03Config";
import { normalizeRange, smoothstep01 } from "../components/opening/systemBootMotion";
import styles from "./DeliveryEngineOverlay.module.css";

interface DeliveryEngineOverlayProps {
  localProgress?: number;
}

export function DeliveryEngineOverlay({ localProgress: propLocalProgress }: DeliveryEngineOverlayProps) {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const segments = buildSceneSegments();
  const seg03 = segments[2] ?? { start: 0.34, end: 0.47 };

  // Hard Boundary Isolation: If global scrollProgress is still in Scene 02 (before seg03.start), return null completely!
  if (scrollProgress < seg03.start - 0.001) return null;

  // Calculate local progress in Scene 03 (0 to 1) if not passed
  const range = seg03.end - seg03.start || 1;
  const localProgress = propLocalProgress ?? (scrollProgress - seg03.start) / range;

  if (localProgress <= 0.0) return null;

  // Fade in during arrival (0.04 - 0.20), hold, fade out during exit (0.90 - 1.00)
  const fadeIn = reducedMotion ? 1.0 : smoothstep01(normalizeRange(localProgress, 0.04, 0.20));
  const fadeOut = reducedMotion ? 0.0 : smoothstep01(normalizeRange(localProgress, 0.90, 1.00));
  const overallOpacity = fadeIn * (1.0 - fadeOut);

  if (overallOpacity <= 0.01) return null;

  return (
    <div
      className={styles.deliveryOverlay}
      style={{ opacity: overallOpacity }}
      aria-label="Delivery Engine System Overlay"
    >
      <div className={styles.deliveryOverlayContent}>
        {/* 1. System Status Badge */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>{SCENE_03_COPY.statusBadge}</span>
        </div>

        {/* 2. Headline */}
        <h2 className={styles.headline}>
          {SCENE_03_COPY.headline}
        </h2>

        {/* 3. Subtext */}
        <p className={styles.subtext}>
          {SCENE_03_COPY.subtext}
        </p>

        {/* 4. 6 SDLC Stage Pills Row - Causal sync with 3D gates */}
        <div className={styles.stagePillsRow}>
          {SDLC_STAGES.map((stage) => {
            const [activeStart, activeEnd] = stage.activeRange;
            const isActive = reducedMotion || (localProgress >= activeStart && localProgress <= activeEnd);
            const isCompleted = !reducedMotion && localProgress > activeEnd;

            const pillClass = isActive
              ? styles.stagePillActive
              : isCompleted
              ? styles.stagePillCompleted
              : "";

            return (
              <span
                key={stage.id}
                className={`${styles.stagePill} ${pillClass}`}
              >
                {isCompleted ? `✓ ${stage.label}` : stage.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DeliveryEngineOverlay;
