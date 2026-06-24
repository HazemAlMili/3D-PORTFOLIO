import { usePortfolioStore } from "../store/portfolioStore";
import { buildSceneSegments } from "../scroll/scrollSegments";
import styles from "./HeroOverlay.module.css";

export function HeroOverlay() {
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const handleNavigate = (targetProgress: number) => {
    // Teleport or smooth scroll based on reducedMotion
    setScrollProgress(targetProgress);

    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = totalScrollHeight * targetProgress;

    window.scrollTo({
      top: targetScrollY,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const segments = buildSceneSegments();
  const PROJECTS_TARGET = segments[3]?.start ?? 0.30; // Scene 04 start
  const CONTACT_TARGET = segments[7]?.start ?? 0.82;  // Scene 08 start

  return (
    <div className={styles.heroOverlay} aria-label="Hero Identity Overlay">
      <div className={styles.heroOverlayContent}>
        {/* Visual text is handled in 3D, these are screen-reader accessible elements */}
        <h1 className="sr-only">FULL_NAME_PENDING</h1>
        <p className="sr-only">Full Stack Developer</p>
        <p className="sr-only">Building systems that feel as good as they work</p>
        
        <div className={styles.heroOverlayCtas}>
          <button
            id="cta-view-projects"
            className={`${styles.ctaButton} ${styles.ctaPrimary}`}
            onClick={() => handleNavigate(PROJECTS_TARGET)}
            aria-label="View Projects (scroll to Scene 4)"
          >
            View Projects
          </button>
          <button
            id="cta-contact-me"
            className={`${styles.ctaButton} ${styles.ctaSecondary}`}
            onClick={() => handleNavigate(CONTACT_TARGET)}
            aria-label="Contact Me (scroll to Scene 8)"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}
