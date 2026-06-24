import { useState } from "react";
import "./ReducedMotionExperience.css";

export function ReducedMotionExperience() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const toggleReducedMotion = () => {
    setIsReducedMotion((prev) => !prev);
  };

  return (
    <div className="reduced-motion-wrapper">
      {/* Toggle UI */}
      <div className="reduced-motion-toggle">
        <button
          className={`toggle-button ${isReducedMotion ? "active" : ""}`}
          onClick={toggleReducedMotion}
          aria-label="Toggle Reduced Motion Experience"
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
