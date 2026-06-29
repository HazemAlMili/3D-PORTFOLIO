import { CONTACT_DATA } from "../content/contactData";
import styles from "./Scene08ContactStaticCard.module.css";

export function Scene08ContactStaticCard() {
  const name = CONTACT_DATA.developerName || "Developer Name";
  const role = CONTACT_DATA.developerRole || "Full-Stack Developer";

  return (
    <div className={styles.staticContactCard} role="region" aria-label="Developer identity and contact options">
      <div className={styles.container}>
        {/* Header: Name and Role */}
        <div className={styles.header}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.role}>{role.toUpperCase()}</p>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerDot} />
        </div>

        {/* Headline & Intro */}
        <div className={styles.bodyContent}>
          <h2 className={styles.headline}>{CONTACT_DATA.headline}</h2>
          {CONTACT_DATA.intro && <p className={styles.intro}>{CONTACT_DATA.intro}</p>}
        </div>

        {/* Primary CTA */}
        <div className={styles.ctaContainer}>
          <span className={styles.primaryCta}>
            {`[ ${CONTACT_DATA.primaryCta.label} ]`}
          </span>
        </div>

        {/* Secondary Links */}
        <div className={styles.linksGrid}>
          {CONTACT_DATA.secondaryLinks.map((link) => {
            const isMissing = link.status === "missing";
            const labelText = isMissing ? `${link.label} (n/a)` : link.label;
            
            return (
              <span
                key={link.id}
                className={`${styles.linkSlot} ${isMissing ? styles.missingLink : ""}`}
              >
                {labelText}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Scene08ContactStaticCard;
