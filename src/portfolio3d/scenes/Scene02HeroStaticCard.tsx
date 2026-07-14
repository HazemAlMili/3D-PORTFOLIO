import styles from "./Scene02HeroStaticCard.module.css";

export function Scene02HeroStaticCard() {
  return (
    <div className={styles.staticHeroCard} role="main" aria-label="Hero introduction">
      <div className={styles.staticHeroCardContent}>
        <h1 className={styles.staticHeroName}>FULL_NAME_PENDING</h1>
        <h2 className={styles.staticHeroRole}>Full Stack Developer</h2>
        <p className={styles.staticHeroValue}>
          Building systems that feel as good as they work
        </p>

        <div className={styles.staticHeroFooter}>
          <span>⚡ Full experience available with motion enabled</span>
        </div>
      </div>
    </div>
  );
}
