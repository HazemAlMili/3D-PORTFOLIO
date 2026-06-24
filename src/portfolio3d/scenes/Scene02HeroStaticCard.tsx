import styles from "./Scene02HeroStaticCard.module.css";
import { usePortfolioStore } from "../store/portfolioStore";
import { buildSceneSegments } from "../scroll/scrollSegments";

export function Scene02HeroStaticCard() {
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const segments = buildSceneSegments();
  const PROJECTS_TARGET = segments[3]?.start ?? 0.38;
  const CONTACT_TARGET = segments[7]?.start ?? 0.85;

  const handleNavigate = (target: number) => {
    setScrollProgress(target);
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalScrollHeight * target,
      behavior: "auto", // Instant teleport as required for static/reduced motion
    });
  };

  return (
    <div className={styles.staticHeroCard} role="main" aria-label="Hero introduction">
      <div className={styles.staticHeroCardContent}>
        <h1 className={styles.staticHeroName}>FULL_NAME_PENDING</h1>
        <h2 className={styles.staticHeroRole}>Full Stack Developer</h2>
        <p className={styles.staticHeroValue}>
          Building systems that feel as good as they work
        </p>

        <div className={styles.staticHeroActions}>
          <button
            id="cta-static-view-projects"
            className={styles.staticHeroCtaPrimary}
            onClick={() => handleNavigate(PROJECTS_TARGET)}
            aria-label="View Projects"
          >
            View Projects
          </button>
          <button
            id="cta-static-contact-me"
            className={styles.staticHeroCtaSecondary}
            onClick={() => handleNavigate(CONTACT_TARGET)}
            aria-label="Contact Me"
          >
            Contact Me
          </button>
        </div>

        <div className={styles.staticHeroFooter}>
          <span>⚡ Full experience available with motion enabled</span>
        </div>
      </div>
    </div>
  );
}
