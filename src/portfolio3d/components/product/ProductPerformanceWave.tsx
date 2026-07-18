import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";

interface ProductPerformanceWaveProps {
  localProgress: number;
  opacity?: number;
  W: number;
  H: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ProductPerformanceWave.tsx — Scene 03 Performance Optimization Wave (PRODUCT-STORY-05R)
 *
 * Renders a scroll-driven vertical sweep wave that scans the 3D Product Build Core
 * from left to right during localProgress 0.68 – 0.76.
 *
 * Visual design:
 *   - Bright neon cyan scanning laser line
 *   - Speed-trail accent line
 *   - Thin trailing glass scanner panel (semi-transparent cyan fill)
 *   - Top & bottom edge glow nodes
 *   - Clamped to product width so it never enters the left HUD area
 *   - Reduced motion: completely hidden (product assumes settled static state)
 */
export function ProductPerformanceWave({
  localProgress,
  opacity = 1.0,
  W,
  H,
  isMobile = false,
  reducedMotion = false,
}: ProductPerformanceWaveProps) {
  const waveStart = 0.70;
  const waveEnd   = 0.82;

  // Vertical line points for the main laser scanner
  const linePoints = useMemo((): [number, number, number][] => {
    const margin = 0.05;
    return [
      [0,  H + margin, 0.12],
      [0, -H - margin, 0.12],
    ];
  }, [H]);

  // Trail line points (offset slightly left to create speed-trail effect)
  const trailPoints = useMemo((): [number, number, number][] => {
    const margin = 0.05;
    const trailOffset = isMobile ? -0.06 : -0.10;
    return [
      [trailOffset,  H + margin, 0.10],
      [trailOffset, -H - margin, 0.10],
    ];
  }, [H, isMobile]);

  // In reduced motion, we do not animate the wave (it remains hidden)
  if (reducedMotion) return null;

  // Hidden before/after the performance wave phase
  if (localProgress < waveStart || localProgress > waveEnd || opacity <= 0.01) {
    return null;
  }

  // Calculate normalized progress of the wave sweep (0 → 1)
  const waveT = Math.max(0, Math.min(1, (localProgress - waveStart) / (waveEnd - waveStart)));

  // Map wave progress to X coordinate across the product width
  // Sweep starts slightly to the left of the 3D product core (-W - 0.10) and ends to the right (+W + 0.10)
  const startX = -W - 0.10;
  const endX = W + 0.10;
  const waveX = startX + waveT * (endX - startX);

  // Smooth boundary fade-in and fade-out at sweep edges
  const boundaryFade = Math.min(1, waveT / 0.08) * Math.min(1, (1 - waveT) / 0.08);
  const baseOpacity = opacity * boundaryFade;

  // Scanner panel geometry width
  const panelW = isMobile ? 0.05 : 0.08;

  return (
    <group position={[waveX, 0, 0]}>
      {/* Primary laser scanning line */}
      <Line
        points={linePoints}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 1.0 : 1.3}
        transparent
        opacity={baseOpacity * 0.50}
      />

      {/* Trailing speed line */}
      <Line
        points={trailPoints}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.5 : 0.7}
        transparent
        opacity={baseOpacity * 0.25}
      />

      {/* Trailing glass scanner panel */}
      <mesh position={[-panelW * 0.5, 0, 0.08]} renderOrder={18}>
        <planeGeometry args={[panelW, H * 2 + 0.08]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={baseOpacity * 0.04}
          depthWrite={false}
        />
      </mesh>

      {/* Accent glow nodes at top & bottom edge boundaries */}
      <mesh position={[0, H + 0.05, 0.13]} renderOrder={20}>
        <sphereGeometry args={[0.009, 8, 8]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={baseOpacity * 0.40}
        />
      </mesh>
      <mesh position={[0, -H - 0.05, 0.13]} renderOrder={20}>
        <sphereGeometry args={[0.009, 8, 8]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={baseOpacity * 0.40}
        />
      </mesh>
    </group>
  );
}
