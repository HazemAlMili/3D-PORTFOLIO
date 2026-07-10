import { usePortfolioStore } from "../store/portfolioStore";
import { CONTACT_DATA } from "../content/contactData";
import { getSystemBootMotionState } from "../components/opening/systemBootMotion";
import "./SystemBootIdentityOverlay.css";

interface SystemBootIdentityOverlayProps {
  localProgress: number;
}

export function SystemBootIdentityOverlay({ localProgress }: SystemBootIdentityOverlayProps) {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const motion = getSystemBootMotionState(localProgress);

  // 1. Ghost text opacity: fades in during identityGather (0.30 - 0.40) and fades out during exit
  let ghostOpacity = motion.identityGather;
  if (!reducedMotion) {
    ghostOpacity *= (1.0 - motion.identityExit);
  }

  // 2. Main content opacity: compiled progress, fades out on exit
  let mainOpacity = Math.max(motion.nameCompile, motion.roleCompile);
  if (reducedMotion) {
    mainOpacity = 1.0;
    ghostOpacity = 0.0; // no need for ghost text in static mode
  } else {
    mainOpacity *= (1.0 - motion.identityExit);
  }

  // Hide completely when dormant
  if (Math.max(ghostOpacity, mainOpacity) <= 0.005) return null;

  // 3. Name Compile & Lock Calculations
  const nameReveal = motion.nameCompile;
  const nameSlideX = reducedMotion ? 0 : (1.0 - nameReveal) * 60; // slides right to left
  const nameClipLeft = reducedMotion ? 0 : (1.0 - nameReveal) * 100;
  const nameClipPath = `inset(0 0 0 ${nameClipLeft}%)`;
  const showNameLaser = !reducedMotion && nameReveal > 0.02 && nameReveal < 0.98;
  const namePercent = Math.min(100, Math.floor(nameReveal * 100));

  // Name Lock Pulse: slight scale bump and neon glow during lock phase (0.50 - 0.58)
  const namePulse = !reducedMotion ? Math.sin(motion.nameLock * Math.PI) : 0;
  const nameScale = 1.0 + namePulse * 0.035;
  const nameTextShadow = namePulse > 0.05
    ? `0 0 ${namePulse * 20}px rgba(56, 214, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5)`
    : "0 4px 12px rgba(0, 0, 0, 0.5)";

  // 4. Role Compile & Tracking Calculations
  const roleReveal = motion.roleCompile;
  const roleSlideX = reducedMotion ? 0 : -(1.0 - roleReveal) * 60; // slides left to right
  const roleClipRight = reducedMotion ? 0 : (1.0 - roleReveal) * 100;
  const roleClipPath = `inset(0 ${roleClipRight}% 0 0)`;
  const showRoleLaser = !reducedMotion && roleReveal > 0.02 && roleReveal < 0.98;
  const rolePercent = Math.min(100, Math.floor(roleReveal * 100));

  // Settle letter-spacing from 0.32em (wide compiling) to 0.18em (final locked metadata)
  const roleSpacing = reducedMotion ? "0.18em" : `${0.32 - roleReveal * 0.14}em`;

  // 5. Identity Exit (0.74 - 0.88): translate towards central kernel and apply blur
  let exitTransformName = "";
  let exitTransformRole = "";
  let exitFilter = "none";

  if (!reducedMotion && motion.identityExit > 0.01) {
    const exitDist = motion.identityExit * 50; // translates vertically toward core
    const exitScale = 1.0 - motion.identityExit * 0.3;
    const blurAmount = motion.identityExit * 8; // blur dissolve

    exitTransformName = `translateY(${exitDist}px) scale(${exitScale})`;
    exitTransformRole = `translateY(${-exitDist}px) scale(${exitScale})`;
    exitFilter = `blur(${blurAmount}px)`;
  }

  return (
    <div
      className="system-boot-identity-overlay"
      style={{ filter: exitFilter }}
    >
      <div className="system-boot-text-container">
        
        {/* Name Wrapper Group */}
        <div className="system-boot-name-group" style={{ transform: exitTransformName }}>
          {/* Ghost outline (visible early as data gathers) */}
          {ghostOpacity > 0.01 && (
            <h1 className="system-boot-name name-ghost" style={{ opacity: ghostOpacity * 0.12 }}>
              {CONTACT_DATA.developerName}
            </h1>
          )}

          {/* Compiled Solid Name */}
          <div
            className="system-boot-name-wrapper"
            style={{
              transform: `translateX(${nameSlideX}px) scale(${nameScale})`,
              clipPath: nameClipPath,
              opacity: mainOpacity,
            }}
          >
            <h1 className="system-boot-name" style={{ textShadow: nameTextShadow }}>
              {CONTACT_DATA.developerName}
            </h1>

            {showNameLaser && (
              <div
                className="system-boot-laser name-laser"
                style={{ left: `${nameClipLeft}%` }}
              >
                <span className="system-boot-status-tag">
                  DECODE::{namePercent}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Role Wrapper Group */}
        <div className="system-boot-role-group" style={{ transform: exitTransformRole }}>
          {/* Ghost outline */}
          {ghostOpacity > 0.01 && (
            <h2
              className="system-boot-role role-ghost"
              style={{
                opacity: ghostOpacity * 0.1,
                letterSpacing: roleSpacing,
              }}
            >
              {CONTACT_DATA.developerRole}
            </h2>
          )}

          {/* Compiled Solid Role */}
          <div
            className="system-boot-role-wrapper"
            style={{
              transform: `translateX(${roleSlideX}px)`,
              clipPath: roleClipPath,
              opacity: mainOpacity,
            }}
          >
            <h2
              className="system-boot-role"
              style={{
                letterSpacing: roleSpacing,
              }}
            >
              {CONTACT_DATA.developerRole}
            </h2>

            {showRoleLaser && (
              <div
                className="system-boot-laser role-laser"
                style={{ left: `${100 - roleClipRight}%` }}
              >
                <span className="system-boot-status-tag role-tag">
                  META_BIND::{rolePercent}%
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
