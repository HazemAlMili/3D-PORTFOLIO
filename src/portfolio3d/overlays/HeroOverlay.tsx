import { usePortfolioStore } from "../store/portfolioStore";
import { buildSceneSegments } from "../scroll/scrollSegments";
import {
  MISSION_TEXT,
  SCENE_02_SUB_PHASES,
} from "../constants/scene02Config";
import { normalizeRange, smoothstep01 } from "../components/opening/systemBootMotion";
import styles from "./HeroOverlay.module.css";

export function HeroOverlay() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const segments = buildSceneSegments();
  const seg02 = segments[1] ?? { start: 0.18, end: 0.38 };

  // Calculate local progress in Scene 02 (0 to 1)
  const range = seg02.end - seg02.start || 1;
  const localProgress = Math.min(1, Math.max(0, (scrollProgress - seg02.start) / range));

  // Staggered HUD element reveal boundaries
  const [statusStart, statusEnd] = SCENE_02_SUB_PHASES.hudStatus;
  const [headlineStart, headlineEnd] = SCENE_02_SUB_PHASES.hudHeadline;
  const [subtextStart, subtextEnd] = SCENE_02_SUB_PHASES.hudSubtext;
  const [handoffStart, handoffEnd] = SCENE_02_SUB_PHASES.handoff;

  const statusProgress = reducedMotion
    ? 1.0
    : smoothstep01(normalizeRange(localProgress, statusStart, statusEnd));

  const headlineProgress = reducedMotion
    ? 1.0
    : smoothstep01(normalizeRange(localProgress, headlineStart, headlineEnd));

  const subtextProgress = reducedMotion
    ? 1.0
    : smoothstep01(normalizeRange(localProgress, subtextStart, subtextEnd));

  const handoffFade = reducedMotion
    ? 0.0
    : smoothstep01(normalizeRange(localProgress, handoffStart, handoffEnd));

  const overallOpacity = (1.0 - handoffFade);

  return (
    <>
      <div
        className={styles.heroOverlay}
        style={{ opacity: overallOpacity }}
        aria-label="Mission Control System Overlay"
      >
        <div className={styles.heroOverlayContent}>
          {/* 1. System Status Badge */}
          <div
            className={styles.systemStatusTag}
            style={{ opacity: statusProgress }}
          >
            <span className={styles.statusDot} />
            <span>{MISSION_TEXT.status}</span>
          </div>

          {/* 2. Mission Headline */}
          <h1
            className={styles.missionHeadline}
            style={{ opacity: headlineProgress }}
          >
            {MISSION_TEXT.headline}
          </h1>

          {/* 3. Mission Subtext */}
          <p
            className={styles.missionSubtext}
            style={{ opacity: subtextProgress * 0.9 }}
          >
            {MISSION_TEXT.subtext}
          </p>

          {/* 4. Full-stack Sequence */}
          <div
            style={{
              opacity: subtextProgress * 0.95,
              marginTop: "20px",
              fontFamily: "var(--font-mono, monospace)",
              color: "#38D6FF",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              fontWeight: 500,
              textShadow: "0 2px 8px rgba(5, 7, 10, 0.95)",
            }}
          >
            <span>Frontend</span>
            <span style={{ opacity: 0.5 }}>&rarr;</span>
            <span>APIs</span>
            <span style={{ opacity: 0.5 }}>&rarr;</span>
            <span>Backend</span>
            <span style={{ opacity: 0.5 }}>&rarr;</span>
            <span>Databases</span>
            <span style={{ opacity: 0.5 }}>&rarr;</span>
            <span>Deployment</span>
          </div>

        </div>
      </div>

      {/* 5. HERO-14 Spatial SVG Connector & Capability System Cards Overlay - DISABLED at user request */}
    </>
  );
}
