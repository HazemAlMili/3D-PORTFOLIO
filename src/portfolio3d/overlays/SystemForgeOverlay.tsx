import { usePortfolioStore } from "../store/portfolioStore";
import { SYSTEM_FORGE_COPY } from "../constants/scene03Config";
import { buildSceneSegments } from "../scroll/scrollSegments";
import styles from "./SystemForgeOverlay.module.css";

interface SystemForgeOverlayProps {
  localProgress: number;
}

export function SystemForgeOverlay({ localProgress }: SystemForgeOverlayProps) {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const segments = buildSceneSegments();
  const seg03 = segments.find((s) => s.sceneId === "scene-03-architecture");

  // Hard Boundary Isolation: Overlay is 100% hidden while in Scene 02
  if (!seg03 || scrollProgress < seg03.start - 0.001 || localProgress <= 0.0) {
    return null;
  }

  // Part E: Overlay Exit Behavior (0.92 - 1.00)
  // Calm the overlay opacity slightly (gradients down from 1.0 to 0.65) so it doesn't pop or hide abruptly
  const calmOpacity = localProgress > 0.92
    ? 1.0 - ((localProgress - 0.92) / 0.08) * 0.35
    : 1.0;

  return (
    <div className={styles.forgeOverlayRoot} style={{ opacity: calmOpacity }}>
      <div className={styles.hudCard}>
        <div className={styles.statusBadge}>
          <span className={styles.statusIndicator} />
          <span>{SYSTEM_FORGE_COPY.statusBadge}</span>
        </div>

        <h2 className={styles.headline}>
          {SYSTEM_FORGE_COPY.headline}
        </h2>

        <p className={styles.subtext}>
          {SYSTEM_FORGE_COPY.subtext}
        </p>
      </div>
    </div>
  );
}
