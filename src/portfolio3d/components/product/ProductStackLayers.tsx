import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";

interface ProductStackLayersProps {
  localProgress: number;
  opacity?: number;
  /** Product half-width — layers match the UI shell footprint */
  W: number;
  /** Product half-height */
  H: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * ProductStackLayers.tsx — Scene 03 Full-Stack Depth Layer Reveal & Compression
 *                          (PRODUCT-VISUAL-REBASE-02)
 *
 * Story beats:
 *   0.50 – 0.62: Full-stack depth layers reveal in exploded staircase placement
 *   0.68 – 0.78: Performance wave sweeps across, compressing depth slabs into tight alignment
 *
 * REBASE-02 fixes:
 *   - Layers start earlier: 0.50 / 0.53 / 0.56 / 0.59 (was 0.54 / 0.57 / 0.60 / 0.63)
 *   - Raised steady-state edge line opacity: 0.22 → 0.45
 *   - Raised glass fill opacity: 0.03 → 0.10
 *   - Reduced initialDz spread: 0.58 → 0.42 desktop (prevents deep slabs from clipping at camera angle)
 */
export function ProductStackLayers({
  localProgress,
  opacity = 1.0,
  W,
  H,
  isMobile = false,
  reducedMotion = false,
}: ProductStackLayersProps) {
  // ── Layer definitions with scroll-driven compression (0.68 – 0.78) ────────
  const layers: LayerDef[] = useMemo(() => {
    // Dynamic layer alignment during Performance Wave (0.68 - 0.78)
    const rawAlignT = reducedMotion
      ? 1.0
      : Math.max(0, Math.min(1, (localProgress - 0.68) / 0.10));
    const alignT = easeInOutCubic(rawAlignT);

    // REBASE-02: reduced initialDz from 0.58→0.42 desktop so layers are visible at camera angle
    const initialDz = isMobile ? 0.30 : 0.42;
    const finalDz   = isMobile ? 0.10 : 0.22;
    const dz        = initialDz + alignT * (finalDz - initialDz);

    // Exploded stairs offset (X/Y) peeking out from behind UI shell, compressing on wave
    const initialDx = isMobile ? 0.05 : 0.16;
    const finalDx   = isMobile ? 0.01 : 0.03;
    const dx        = initialDx + alignT * (finalDx - initialDx);

    const initialDy = isMobile ? -0.04 : -0.10;
    const finalDy   = isMobile ? -0.01 : -0.02;
    const dy        = initialDy + alignT * (finalDy - initialDy);

    const shrW = isMobile ? 0.04 : 0.06;  // each layer slightly narrower
    const shrH = isMobile ? 0.03 : 0.04;  // each layer slightly shorter

    return [
      {
        id: "frontend",
        label: "Frontend",
        color: PRODUCT_ENGINE_COLORS.layerFrontend,
        start: 0.50, end: 0.53,  // REBASE-02: was 0.54 / 0.57
        z:    -(dz * 1),
        x:    dx * 1,
        y:    dy * 1,
        w:    W - shrW * 1,
        h:    H - shrH * 1,
      },
      {
        id: "api",
        label: "API",
        color: PRODUCT_ENGINE_COLORS.layerApi,
        start: 0.53, end: 0.56,  // REBASE-02: was 0.57 / 0.60
        z:    -(dz * 2),
        x:    dx * 2,
        y:    dy * 2,
        w:    W - shrW * 2,
        h:    H - shrH * 2,
      },
      {
        id: "backend",
        label: "Backend",
        color: PRODUCT_ENGINE_COLORS.layerBackend,
        start: 0.56, end: 0.59,  // REBASE-02: was 0.60 / 0.63
        z:    -(dz * 3),
        x:    dx * 3,
        y:    dy * 3,
        w:    W - shrW * 3,
        h:    H - shrH * 3,
      },
      ...(isMobile ? [] : [{
        id: "data",
        label: "Data",
        color: PRODUCT_ENGINE_COLORS.layerData,
        start: 0.59, end: 0.62,  // REBASE-02: was 0.63 / 0.65
        z:    -(dz * 4),
        x:    dx * 4,
        y:    dy * 4,
        w:    W - shrW * 4,
        h:    H - shrH * 4,
      }]),
    ] as LayerDef[];
  }, [W, H, isMobile, localProgress, reducedMotion]);

  // Gate layer stack visibility: completely hidden below progress 0.46
  // REBASE-02: lowered from 0.50 to 0.46 so first layer is already fading in at 0.50
  if (localProgress < 0.46 || opacity <= 0.01) return null;

  return (
    <group>
      {layers.map((layer) => (
        <StackLayer
          key={layer.id}
          layer={layer}
          localProgress={localProgress}
          opacity={opacity}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}


interface LayerDef {
  id: string;
  label: string;
  color: string;
  start: number;  // local progress when layer begins revealing
  end: number;    // local progress when layer is fully visible
  z: number;      // Z offset (negative = behind UI shell)
  x: number;      // X offset (peeks out horizontally)
  y: number;      // Y offset (peeks out vertically)
  w: number;      // half-width
  h: number;      // half-height
}


function StackLayer({
  layer,
  localProgress,
  opacity,
  isMobile,
  reducedMotion,
}: {
  layer: LayerDef;
  localProgress: number;
  opacity: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const t = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - layer.start) / (layer.end - layer.start)));

  if (t <= 0.01) return null;

  const { w, h, z, x, y, color } = layer;
  const base = opacity * t;

  // Active Focus Factor: peaks at the midpoint of reveal (t = 0.5) and settles to 0 when completed
  const revealFocus = !reducedMotion && localProgress >= layer.start && localProgress <= layer.end
    ? Math.sin(Math.PI * t)
    : 0.0;

  // Wave Pulse Boost: temporary edge highlight as optimization wave sweeps past (0.68 - 0.76)
  const waveActive = !reducedMotion && localProgress >= 0.68 && localProgress <= 0.76;
  const wavePulse = waveActive
    ? Math.sin(Math.PI * ((localProgress - 0.68) / 0.08))
    : 0.0;

  const focusFactor = Math.max(revealFocus, wavePulse);

  // Scale boost & forward Z push during active focus
  const scale = 1.0 + focusFactor * 0.035;
  const zPush = focusFactor * (isMobile ? 0.05 : 0.10);

  // Slide-in from deeper Z + active forward emphasis push
  const entryZ = reducedMotion ? z : z - (1 - t) * 0.22 + zPush;

  // REBASE-02: raised steady-state opacity values so layers are readable beyond their reveal window
  const afterWave = localProgress > 0.76 || reducedMotion;
  const dynamicLineWidth = (isMobile ? 0.7 : 0.95) + focusFactor * 0.45 + (afterWave ? 0.12 : 0);
  // REBASE-02: steady-state 0.22 → 0.45; also higher glass fill and edge halo
  const dynamicLineOpacity = base * (0.45 + focusFactor * 0.25 + (afterWave ? 0.10 : 0.0));
  const dynamicEmissive = 0.012 * t + focusFactor * 0.030 + (afterWave ? 0.012 : 0);

  // Frame geometry
  const frame = buildRect(w, h);
  // Corner tick marks
  const corners: [number, number, number][] = [
    [-w,  h, z], [ w,  h, z],
    [-w, -h, z], [ w, -h, z],
  ];

  // Transition scanning sweep line (travels left-to-right on X-axis during active reveal)
  const sweepX = -w + w * 2 * t;

  return (
    <group position={[x, y, entryZ - z]} scale={[scale, scale, 1]}>
      {/* Translucent glass fill plane — REBASE-02: raised from 0.03 to 0.10 */}
      <mesh position={[0, 0, z]} renderOrder={5}>
        <planeGeometry args={[w * 2, h * 2]} />
        <meshStandardMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          emissive={color}
          emissiveIntensity={dynamicEmissive}
          transparent
          opacity={base * (0.10 + (afterWave ? 0.025 : 0))}
          roughness={0.06}
          metalness={0.10}
          depthWrite={false}
        />
      </mesh>

      {/* Edge glow halo — REBASE-02: slightly stronger */}
      <mesh position={[0, 0, z - 0.01]} renderOrder={4}>
        <planeGeometry args={[w * 2 + 0.02, h * 2 + 0.02]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={base * (0.025 + wavePulse * 0.035 + focusFactor * 0.015)}
          depthWrite={false}
        />
      </mesh>

      {/* Frame outline */}
      <Line
        points={frame.map(([fx, fy]) => [fx, fy, z] as [number, number, number])}
        color={color}
        lineWidth={dynamicLineWidth}
        transparent
        opacity={dynamicLineOpacity}
      />

      {/* Transition Sweep Line (only visible during active reveal) */}
      {!reducedMotion && revealFocus > 0.10 && (
        <Line
          points={[
            [sweepX,  h, z + 0.01],
            [sweepX, -h, z + 0.01],
          ]}
          color={color}
          lineWidth={0.7}
          transparent
          opacity={revealFocus * opacity * 0.30}
        />
      )}

      {/* Corner nodes */}
      {corners.map((pos, i) => (
        <mesh key={i} position={pos} renderOrder={7}>
          <sphereGeometry args={[0.007, 6, 6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={base * (0.50 + focusFactor * 0.20)}
          />
        </mesh>
      ))}
    </group>
  );
}


function buildRect(hw: number, hh: number): [number, number][] {
  return [
    [-hw,  hh],
    [ hw,  hh],
    [ hw, -hh],
    [-hw, -hh],
    [-hw,  hh],
  ];
}
