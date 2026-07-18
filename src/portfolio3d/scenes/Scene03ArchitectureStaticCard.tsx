import styles from "./Scene03ArchitectureStaticCard.module.css";
import { PRODUCTION_LAYERS, SYSTEM_FORGE_COPY } from "../constants/scene03Config";

export function Scene03ArchitectureStaticCard() {
  return (
    <div className={styles.staticArchCard} role="main" aria-label="System Forge introduction">
      <div className={styles.staticArchCardContent}>
        <h2 className={styles.staticArchHeader}>{SYSTEM_FORGE_COPY.statusBadge}</h2>
        <p className={styles.staticArchSubtitle}>
          {SYSTEM_FORGE_COPY.headline}
        </p>

        <div className={styles.staticArchStack}>
          {PRODUCTION_LAYERS.map((layer) => (
            <div key={layer.id} className={styles.staticArchLayer}>
              <div className={styles.staticArchLayerTitle}>
                {layer.label}
              </div>
              <div className={styles.staticArchLayerDesc}>{layer.sublabel}</div>
            </div>
          ))}
        </div>

        <div className={styles.staticArchFooter}>
          <span>⚡ Full System Forge 3D motion available when motion enabled</span>
        </div>
      </div>
    </div>
  );
}
