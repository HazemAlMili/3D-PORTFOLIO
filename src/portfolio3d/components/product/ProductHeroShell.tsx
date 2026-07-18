import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS, PRODUCT_ENGINE_PHASES } from "../../constants/scene03Config";
import { ProductInterfacePanels } from "./ProductInterfacePanels";
import { ProductStackLayers } from "./ProductStackLayers";
import { ProductPerformanceWave } from "./ProductPerformanceWave";
import { ProductLaunchHandoff } from "./ProductLaunchHandoff";

interface ProductHeroShellProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ProductHeroShell.tsx — Scene 03 Floating 3D Product Hero Core (PRODUCT-STORY-05R)
 *
 * Story beats:
 *   0.12 – 0.28  Wireframe draws in
 *   0.28 – 0.36  Primary glass surface fills
 *   0.34 – 0.44  UI panels assemble (ProductInterfacePanels)
 *   0.44 – 0.65  Full-stack depth layers reveal behind (ProductStackLayers)
 *   0.68 – 0.76  Optimization wave sweeps across, sharpening edges and polishing surfaces
 *   0.80 – 0.82  Hero settled in final premium state
 *
 * Visual grammar: dark navy, cyan edge glow, 3D glass product core — no browser chrome.
 */
export function ProductHeroShell({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ProductHeroShellProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Group>(null);

  // ── Timing windows ────────────────────────────────────────────────────────
  const [wireStart, wireEnd] = PRODUCT_ENGINE_PHASES.wireframe; // 0.12 – 0.28
  
  const wireT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - wireStart) / (wireEnd - wireStart)));

  // 0.35 – 0.38: scaffold holds and starts glowing
  const scaffoldGlow = reducedMotion
    ? 1.0
    : localProgress < 0.35
    ? 0.0
    : localProgress > 0.38
    ? 1.0
    : (localProgress - 0.35) / 0.03;

  // 0.38 – 0.43: transparent glass surfaces fade in
  const glassT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.38) / (0.43 - 0.38)));

  // 0.43 – 0.47: side thickness / depth casing forms
  const depthCasingT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.43) / (0.47 - 0.43)));

  // 0.47 – 0.50: minimal UI zones settle
  const uxFlowT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.47) / (0.50 - 0.47)));

  const heroStableT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.50) / 0.08));

  // ── Dimensions (sleeker 3D product core footprint) ──────────────────────
  const W  = isMobile ? 1.00 : 1.30;
  const H  = isMobile ? 0.58 : 0.74;
  const DZ = isMobile ? 0.06 : 0.10;

  // ── Memoized geometry ────────────────────────────────────────────────────
  const outerFrame = useMemo(() => buildRect(W, H), [W, H]);
  const navRailX = -W * 0.45;

  const cornerSize = isMobile ? 0.06 : 0.08;
  const corners = useMemo(() => [
    { x: -W, y:  H },
    { x:  W, y:  H },
    { x: -W, y: -H },
    { x:  W, y: -H },
  ], [W, H]);

  const outerFrameFront = useMemo(() => outerFrame.map(([x, y]) => [x, y, DZ * 0.3] as [number, number, number]), [outerFrame, DZ]);
  const outerFrameBack  = useMemo(() => outerFrame.map(([x, y]) => [x, y, -DZ * 0.4] as [number, number, number]), [outerFrame, DZ]);

  const struts = useMemo((): [number, number, number][][] => [
    [[-W,  H, DZ * 0.3], [-W,  H, -DZ * 0.4]],
    [[ W,  H, DZ * 0.3], [ W,  H, -DZ * 0.4]],
    [[-W, -H, DZ * 0.3], [-W, -H, -DZ * 0.4]],
    [[ W, -H, DZ * 0.3], [ W, -H, -DZ * 0.4]],
  ], [W, H, DZ]);

  // ── Scroll-driven entry motion ────────────────────────────────────────────
  const entryZ = reducedMotion ? 0 : THREE.MathUtils.lerp(-1.2, 0, Math.min(1, wireT * 1.4));

  // Persistent subtle float
  useFrame((state) => {
    if (reducedMotion || !shellRef.current) return;
    const t = state.clock.getElapsedTime();
    shellRef.current.position.y = Math.sin(t * 0.48) * 0.022;
    shellRef.current.rotation.y = Math.sin(t * 0.22) * 0.018;
  });

  if (localProgress < wireStart - 0.02 || opacity <= 0.01) return null;

  // ── Opacity and Glow Flare Derivations (PRODUCT-STORY-05R) ─────────────
  const baseOpacity  = opacity * wireT;
  
  // Wave flare: temporary glow boost during the sweep (0.68 - 0.76), settling higher after optimization
  const waveActive = localProgress >= 0.68 && localProgress <= 0.76;
  const wavePulse = waveActive && !reducedMotion
    ? Math.sin(Math.PI * ((localProgress - 0.68) / 0.08))
    : 0;
  const afterWave = localProgress > 0.76 || reducedMotion;

  // Dims down background wireframe elements after optimization cleans the product
  const wireframeFade = afterWave ? 0.38 : 1.0;

  const glassOpacity = baseOpacity * (glassT * 0.26 + heroStableT * 0.06 + (afterWave ? 0.03 : 0));
  const edgeOpacity  = baseOpacity * (0.55 + glassT * 0.38 + wavePulse * 0.35 + scaffoldGlow * 0.20 + (afterWave ? 0.12 : 0.0));
  // REBASE-02: reduced innerOpacity 0.15→0.08 so rear stack slabs bleed through the dark backing plane
  const innerOpacity = baseOpacity * glassT * 0.08;
  const emissiveInt  = (0.032 * glassT) + (wavePulse * 0.04) + (scaffoldGlow * 0.015) + (afterWave ? 0.014 : 0);

  const tiltY = isMobile ? 0.12 : 0.38;
  const tiltX = isMobile ? 0.08 : 0.18;

  return (
    <group ref={groupRef} position={[0, 0, entryZ]}>
      <group ref={shellRef} rotation={[tiltX, tiltY, 0]}>

        {/* ── Back glass plane (dark translucent surface) ───────────── */}
        <mesh position={[0, 0, -DZ]} renderOrder={10}>
          <planeGeometry args={[W * 2, H * 2]} />
          <meshStandardMaterial
            color={PRODUCT_ENGINE_COLORS.chamberDepth}
            transparent
            opacity={glassOpacity + innerOpacity}
            roughness={0.04}
            metalness={0.14}
            depthWrite={false}
          />
        </mesh>

        {/* ── Front glass face (main product surface) ───────────────── */}
        <mesh position={[0, 0, DZ * 0.3]} renderOrder={11}>
          <planeGeometry args={[W * 2, H * 2]} />
          <meshStandardMaterial
            color="#081422"
            emissive={PRODUCT_ENGINE_COLORS.accentCyan}
            emissiveIntensity={emissiveInt}
            transparent
            opacity={glassOpacity * 0.50}
            roughness={0.06}
            metalness={0.16}
            depthWrite={false}
          />
        </mesh>

        {/* ── Outer edge glow (rim light) ────────────────────────────── */}
        <mesh position={[0, 0, -DZ * 0.4]} renderOrder={9}>
          <planeGeometry args={[W * 2 + 0.08, H * 2 + 0.08]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={edgeOpacity * 0.10}
            depthWrite={false}
          />
        </mesh>

        {/* Second softer glow ring */}
        <mesh position={[0, 0, -DZ * 0.5]} renderOrder={8}>
          <planeGeometry args={[W * 2 + 0.20, H * 2 + 0.20]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            transparent
            opacity={edgeOpacity * 0.045}
            depthWrite={false}
          />
        </mesh>

        {/* ── 3D Outer product frame volume box ─────────────────────── */}
        {/* Front outer frame */}
        <Line
          points={outerFrameFront}
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          lineWidth={isMobile ? 1.0 : (afterWave ? 1.4 : 1.3)}
          transparent
          opacity={edgeOpacity * 0.92}
        />

        {/* Back outer frame */}
        <Line
          points={outerFrameBack}
          color={PRODUCT_ENGINE_COLORS.accentBlue}
          lineWidth={isMobile ? 0.7 : 0.9}
          transparent
          opacity={edgeOpacity * 0.45 * wireframeFade}
        />

        {/* Corner struts connecting front and back frames */}
        {struts.map((pts, i) => (
          <Line
            key={`strut-${i}`}
            points={pts}
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            lineWidth={isMobile ? 0.6 : 0.8}
            transparent
            opacity={edgeOpacity * 0.35 * wireframeFade}
          />
        ))}

        {/* ── Corner accent marks ───────────────────────────────────── */}
        {corners.map((c, i) => (
          <CornerMark
            key={i}
            x={c.x} y={c.y}
            size={cornerSize}
            opacity={edgeOpacity * 0.88}
            flipped={c.x > 0}
            flippedY={c.y < 0}
          />
        ))}

        {/* ── Corner glow nodes ────────────────────────────────────── */}
        {corners.map((c, i) => (
          <mesh key={`node-${i}`} position={[c.x, c.y, DZ * 0.5]} renderOrder={15}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentCyan}
              transparent
              opacity={edgeOpacity * (0.82 + wavePulse * 0.18)}
            />
          </mesh>
        ))}

        {/* ── 3D System Layer Chassis Slab ────────────────────────────── */}
        {depthCasingT > 0.01 && (
          <mesh position={[0, 0, -DZ * 0.15]} renderOrder={8}>
            <boxGeometry args={[W * 2, H * 2, DZ * 0.35]} />
            <meshStandardMaterial
              color="#071220"
              transparent
              opacity={depthCasingT * baseOpacity * 0.14}
              roughness={0.04}
              metalness={0.20}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* REBASE-02: Mid-body depth separator — subtle horizontal line at Y center */}
        {glassT > 0.20 && (
          <Line
            points={[
              [-W * 0.70, 0.0, DZ * 0.2],
              [ W * 0.70, 0.0, DZ * 0.2],
            ]}
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            lineWidth={isMobile ? 0.5 : 0.65}
            transparent
            opacity={glassT * baseOpacity * 0.28 * wireframeFade}
          />
        )}

        {/* ── UI/UX Glass Interface Panels ───────────────────────────── */}
        <ProductInterfacePanels
          wireT={wireT}
          glassT={glassT}
          uxFlowT={uxFlowT}
          baseOpacity={baseOpacity}
          W={W}
          H={H}
          navRailX={navRailX}
          isMobile={isMobile}
          localProgress={localProgress}
        />

        {/* ── Full-Stack Depth Layers ────────────────────────────────── */}
        <ProductStackLayers
          localProgress={localProgress}
          opacity={opacity}
          W={W}
          H={H}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        {/* ── Performance Optimization Wave (0.68 – 0.76) ──────────── */}
        <ProductPerformanceWave
          localProgress={localProgress}
          opacity={opacity}
          W={W}
          H={H}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        {/* ── Product Lock & Launch Handoff ──────────────────────────── */}
        <ProductLaunchHandoff
          localProgress={localProgress}
          opacity={opacity}
          W={W}
          H={H}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

      </group>
    </group>
  );
}

// ─── Geometry helpers ─────────────────────────────────────────────────────────

function buildRect(
  hw: number,
  hh: number,
  cx = 0,
  cy = 0,
): [number, number, number][] {
  return [
    [cx - hw, cy + hh, 0],
    [cx + hw, cy + hh, 0],
    [cx + hw, cy - hh, 0],
    [cx - hw, cy - hh, 0],
    [cx - hw, cy + hh, 0],
  ];
}

function CornerMark({
  x, y, size, opacity, flipped = false, flippedY = false,
}: {
  x: number; y: number; size: number; opacity: number;
  flipped?: boolean; flippedY?: boolean;
}) {
  const sx = flipped  ? -1 : 1;
  const sy = flippedY ? -1 : 1;
  const pts: [number, number, number][] = [
    [x + sx * size, y,             0],
    [x,             y,             0],
    [x,             y - sy * size, 0],
  ];
  return (
    <Line
      points={pts}
      color={PRODUCT_ENGINE_COLORS.accentCyan}
      lineWidth={2.0}
      transparent
      opacity={opacity}
    />
  );
}
