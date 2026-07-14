import { getSystemBootMotionState } from "../components/opening/systemBootMotion";
import { CONTACT_DATA } from "../content/contactData";
import { usePortfolioStore } from "../store/portfolioStore";
import "./SystemBootIdentityOverlay.css";

interface SystemBootIdentityOverlayProps {
  localProgress: number;
}

export function SystemBootIdentityOverlay({ localProgress }: SystemBootIdentityOverlayProps) {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const motion = getSystemBootMotionState(localProgress);

  const opacity = reducedMotion ? 1.0 : motion.panelOpacity;
  const lineDraw = reducedMotion ? 1.0 : motion.panelLineDraw;

  // Render nothing if panel is completely faded out
  if (opacity <= 0.005) return null;

  // Confirmation Scale Pulse centered at the panelHold entry point (around localProgress 0.72)
  // Generates a subtle, single pop scale-up to 1.04 that settles to 1.0
  let pulseScale = 1.0;
  if (!reducedMotion && localProgress >= 0.70 && localProgress <= 0.78) {
    const pulseT = (localProgress - 0.70) / (0.78 - 0.70);
    const sineFactor = Math.sin(pulseT * Math.PI);
    pulseScale = 1.0 + sineFactor * 0.025;
  }

  // Calculate borders and status tags
  const drawWidth = `${lineDraw * 100}%`;

  return (
    <div className="system-boot-hud-overlay">
      <div
        className="system-boot-hud-panel"
        style={{
          opacity: opacity,
          transform: `scale(${pulseScale})`,
        }}
      >
        {/* Draw-in edge borders */}
        <div className="hud-panel-border-top" style={{ width: drawWidth }} />
        <div className="hud-panel-border-bottom" style={{ width: drawWidth }} />

        {/* Content Layout */}
        <div className="hud-panel-content">
          <div className="hud-panel-status-row">
            <span className="hud-status-dot" />
            <span className="hud-status-label">IDENTITY CONFIRMED</span>
          </div>

          <div className="hud-panel-divider" />

          <h2 className="hud-name">
            {CONTACT_DATA.developerName || "Hazem Al-Melli"}
          </h2>

          <h3 className="hud-role">
            {CONTACT_DATA.developerRole || "Full-Stack Developer"}
          </h3>
        </div>
      </div>
    </div>
  );
}
