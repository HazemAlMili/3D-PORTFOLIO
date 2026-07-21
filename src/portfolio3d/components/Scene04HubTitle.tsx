import { Html } from "@react-three/drei";
import { usePortfolioStore } from "../store/portfolioStore";
import { SCENE_04_COLORS } from "../constants/scene04Config";

interface Scene04HubTitleProps {
  localProgress: number;
  opacity?: number;
}

export function Scene04HubTitle({ localProgress, opacity = 1.0 }: Scene04HubTitleProps) {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const p = Math.min(1, Math.max(0, localProgress));

  // Hub Title Lifecycle:
  // [0.00, 0.03]: HUB_OVERVIEW -> opacity = 1.0, yOffset = 0.0, scale = 1.0
  // [0.03, 0.07]: P1_APPROACH -> opacity lerps 1.0 -> 0.0, yOffset lerps 0.0 -> 0.05m, scale lerps 1.0 -> 0.98
  // p >= 0.075 -> unmounts completely (returns null)
  if (p >= 0.075 || opacity <= 0.005) return null;

  const tExit = Math.min(1, Math.max(0, (p - 0.03) / 0.04));
  const titleOpacity = opacity * (reducedMotion ? 1.0 : 1.0 - tExit);
  const yOffset = reducedMotion ? 0.0 : tExit * 0.05;
  const titleScale = reducedMotion ? 1.0 : 1.0 - tExit * 0.02;

  if (titleOpacity <= 0.005) return null;

  const pos: [number, number, number] = isMobile
    ? [0.0, 1.45 + yOffset, 0.20]
    : [0.95, 1.55 + yOffset, 0.20];

  return (
    <Html
      transform
      center
      position={pos}
      scale={titleScale}
      style={{
        pointerEvents: "none",
        userSelect: "none",
        color: "#F4F7FA",
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        textAlign: "center",
        width: isMobile ? "280px" : "420px",
        opacity: titleOpacity,
        transition: reducedMotion ? "none" : "opacity 0.05s linear",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
        {/* Eyebrow */}
        <span
          style={{
            fontSize: isMobile ? "11px" : "12.5px",
            color: SCENE_04_COLORS.accentCyan,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          04 / PROJECTS
        </span>

        {/* Heading */}
        <h1
          style={{
            fontSize: isMobile ? "24px" : "30px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            textShadow: "0 2px 8px rgba(0,0,0,0.40)",
          }}
        >
          SELECTED WORK
        </h1>

        {/* Subtitle (Desktop / Tablet) */}
        {!isMobile && (
          <p
            style={{
              fontSize: "14px",
              margin: 0,
              color: "#A0AEC0",
              fontWeight: 400,
              letterSpacing: "0.02em",
              maxWidth: "360px",
            }}
          >
            Four projects. One connected journey.
          </p>
        )}
      </div>
    </Html>
  );
}

export default Scene04HubTitle;
