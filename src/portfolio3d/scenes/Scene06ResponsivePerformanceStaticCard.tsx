import { RESPONSIVE_PERFORMANCE_DATA } from "../content/responsivePerformanceData";
import styles from "./Scene06ResponsivePerformanceStaticCard.module.css";

export function Scene06ResponsivePerformanceStaticCard() {
  const { headline, intro, principles } = RESPONSIVE_PERFORMANCE_DATA;

  return (
    <div className={styles.staticPerfCard} role="region" aria-label="Responsive and performance engineering decisions">
      <div className={styles.staticPerfContainer}>
        <h2 className={styles.title}>{headline}</h2>
        {intro && <p className={styles.intro}>{intro}</p>}

        <div className={styles.grid}>
          {principles.map((principle) => (
            <div key={principle.id} className={styles.principleCard}>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleDesc}>{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Scene06ResponsivePerformanceStaticCard;
