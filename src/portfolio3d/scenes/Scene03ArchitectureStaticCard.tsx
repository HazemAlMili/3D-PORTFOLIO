import styles from "./Scene03ArchitectureStaticCard.module.css";
import { SCENE_03_LAYERS } from "../constants/scene03Config";

export function Scene03ArchitectureStaticCard() {
  return (
    <div className={styles.staticArchCard} role="main" aria-label="Architecture introduction">
      <div className={styles.staticArchCardContent}>
        <h2 className={styles.staticArchHeader}>SYSTEM ARCHITECTURE</h2>
        <p className={styles.staticArchSubtitle}>
          The robust structure behind every digital experience
        </p>

        <div className={styles.staticArchStack}>
          {SCENE_03_LAYERS.map((layer, index) => (
            <div key={layer.id} className={styles.staticArchLayer}>
              <div className={styles.staticArchLayerTitle}>
                <span className={styles.staticArchLayerIndex}>0{index + 1}</span>
                {layer.title}
              </div>
              <div className={styles.staticArchLayerDesc}>{layer.desc}</div>
              <div className={styles.staticArchLayerSpecs}>
                {index === 0 && "STACK: React · R3F · Canvas · CSS Modules"}
                {index === 1 && "SPECS: REST · JSON Contracts · RESTful Design"}
                {index === 2 && "LOGIC: Node.js · Services · Core Engines"}
                {index === 3 && "STORE: ACID Transactions · Query Plans"}
                {index === 4 && "HOST: Cloud Platforms · CDNs · Edge Cache"}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.staticArchFooter}>
          <span>⚡ Full experience available with motion enabled</span>
        </div>
      </div>
    </div>
  );
}
