import { useState, KeyboardEvent } from "react";
import { PROJECT_DATA } from "../content/projectData";
import styles from "./Scene04ProjectsStaticCard.module.css";

export function Scene04ProjectsStaticCard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab((prev) => (prev + 1) % PROJECT_DATA.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((prev) => (prev - 1 + PROJECT_DATA.length) % PROJECT_DATA.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(PROJECT_DATA.length - 1);
    }
  };

  return (
    <div className={styles.staticProjectsCard} role="region" aria-label="Projects and work case studies">
      <div className={styles.staticProjectsContainer}>
        <h2 className={styles.title}>Featured Projects</h2>
        
        {/* Tab buttons with Arrow key keyboard navigation */}
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Select project case study"
          onKeyDown={handleKeyDown}
        >
          {PROJECT_DATA.map((project, idx) => (
            <button
              type="button"
              key={project.id}
              role="tab"
              id={`tab-${project.id}`}
              aria-selected={activeTab === idx}
              aria-controls={`panel-${project.id}`}
              tabIndex={activeTab === idx ? 0 : -1}
              className={`${styles.tabButton} ${activeTab === idx ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(idx)}
              data-interactive={`project-tab-${project.id}`}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {PROJECT_DATA.map((project, idx) => {
          if (activeTab !== idx) return null;

          return (
            <div
              key={project.id}
              role="tabpanel"
              id={`panel-${project.id}`}
              aria-labelledby={`tab-${project.id}`}
              className={styles.tabPanel}
            >
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.oneLineDesc}>{project.oneLineDescription}</p>

              <div className={styles.detailsGrid}>
                <div className={styles.leftCol}>
                  <div className={styles.section}>
                    <h4 className={styles.sectionHeading}>Problem</h4>
                    <p className={styles.sectionText}>{project.problem}</p>
                  </div>
                  <div className={styles.section}>
                    <h4 className={styles.sectionHeading}>Implementation</h4>
                    <p className={styles.sectionText}>{project.built}</p>
                  </div>
                </div>

                <div className={styles.rightCol}>
                  <div className={styles.section}>
                    <h4 className={styles.sectionHeading}>Stack</h4>
                    <p className={styles.sectionText}>{project.stack.join(" · ")}</p>
                  </div>
                  <div className={styles.section}>
                    <h4 className={styles.sectionHeading}>Architecture</h4>
                    <p className={styles.sectionText}>{project.architectureNote}</p>
                  </div>
                  <div className={styles.section}>
                    <h4 className={styles.sectionHeading}>Outcome</h4>
                    <p className={styles.sectionText}>{project.result}</p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className={styles.links}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    View Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButtonPrimary}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Scene04ProjectsStaticCard;
