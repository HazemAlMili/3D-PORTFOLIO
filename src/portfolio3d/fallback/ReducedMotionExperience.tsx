import { usePortfolioStore } from "../store/portfolioStore";
import "./ReducedMotionExperience.css";

export function ReducedMotionExperience() {
  const isReducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const setReducedMotion = usePortfolioStore((state) => state.setReducedMotion);

  const toggleReducedMotion = () => {
    setReducedMotion(!isReducedMotion);
  };

  return (
    <div className="reduced-motion-wrapper">
      {/* Toggle UI */}
      <div className="reduced-motion-toggle">
        <button
          className={`toggle-button ${isReducedMotion ? "active" : ""}`}
          onClick={toggleReducedMotion}
          aria-label="Toggle Reduced Motion Experience"
          data-interactive="reduced-motion-toggle"
        >
          {isReducedMotion ? "♿ Reduced Motion ON" : "♿ Reduced Motion OFF"}
        </button>
        <span className="toggle-status">
          {isReducedMotion ? "Fallback active" : "Fallback inactive"}
        </span>
      </div>

      {/* Fallback DOM Layer */}
      {isReducedMotion && (
        <div className="reduced-motion-fallback" aria-label="Reduced motion fallback content">
          <div className="fallback-content">
            <h2>Reduced Motion Fallback Active</h2>
            <p>This is the static DOM fallback for users who prefer reduced motion.</p>
            <p>Content will be dynamically populated in future tasks.</p>
            <ul>
              <li>Hero Section — PENDING</li>
              <li>Architecture — PENDING</li>
              <li>Projects — PENDING</li>
              <li>Contact — PENDING</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
