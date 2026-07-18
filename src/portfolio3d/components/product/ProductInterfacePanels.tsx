import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";

interface ProductInterfacePanelsProps {
  /** 0→1 wireframe progress (PRODUCT-02 owns 0.12–0.28) */
  wireT?: number;
  /** 0→1 glass fill progress (0.28–0.44) */
  glassT: number;
  /** 0→1 UX flow appearance (0.36–0.44) */
  uxFlowT: number;
  /** base opacity from scene fade */
  baseOpacity: number;
  /** product half-width (W from hero shell) */
  W: number;
  /** product half-height (H from hero shell) */
  H: number;
  /** nav rail x position (navRailX from hero shell) */
  navRailX?: number;
  isMobile?: boolean;
  localProgress?: number;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * ProductInterfacePanels.tsx — Scene 03 UI/UX Glass Interface (PRODUCT-VISUAL-REBASE-02)
 *
 * Renders floating 3D glass product modules offset in Z space.
 * During 0.68 - 0.78, modules align into their final engineered position
 * as the optimization wave passes.
 *
 * REBASE-02 fixes:
 *   - Raised module glass opacity: 0.22/0.18 → 0.40/0.32
 *   - Raised module edge Line opacity: 0.40/0.35 → 0.72/0.60
 *   - Added module3 (small data/status plate, bottom-right)
 *   - Added 4 visible anchor glow nodes at module junction points
 *   - Added second short flow connector (module3 → module2)
 */
export function ProductInterfacePanels({
  glassT,
  uxFlowT,
  baseOpacity,
  W,
  H,
  isMobile = false,
  localProgress = 0.50,
}: ProductInterfacePanelsProps) {
  const DZ = isMobile ? 0.06 : 0.10;

  // Optimization alignment factor (0.68 - 0.78)
  const rawAlignT = localProgress >= 0.68
    ? Math.min(1, (localProgress - 0.68) / 0.10)
    : 0;
  const alignT = easeInOutCubic(rawAlignT);

  // ── Module 1: Primary feature plate (upper-right area) ────────────────────
  const module1W = W * 0.44;
  const module1H = H * 0.48;
  const module1X = W * 0.15 - alignT * W * 0.02;
  const module1Y = H * 0.12;
  const module1Z = DZ * 0.7 - alignT * DZ * 0.15;

  // ── Module 2: Secondary module plate (lower-left area) ────────────────────
  const module2W = isMobile ? W * 0.36 : W * 0.34;
  const module2H = isMobile ? H * 0.34 : H * 0.40;
  const module2X = -W * 0.30 + alignT * W * 0.02;
  const module2Y = -H * 0.12;
  const module2Z = DZ * 0.5 - alignT * DZ * 0.10;

  // ── Module 3: Small data/status plate (bottom-right corner) ───────────────
  // Not shown on mobile to keep it clean
  const module3W = W * 0.22;
  const module3H = H * 0.20;
  const module3X = W * 0.50;
  const module3Y = -H * 0.52;
  const module3Z = DZ * 0.4 - alignT * DZ * 0.08;

  // ── UX flow nodes: module2 → center → module1 ────────────────────────────
  const uxNodes = useMemo<[number, number, number][]>(() => {
    if (isMobile) return [];
    return [
      [module2X + module2W * 0.30, module2Y + module2H * 0.20, module2Z + 0.02],
      [0.0, 0.0, (module1Z + module2Z) * 0.5],
      [module1X - module1W * 0.30, module1Y - module1H * 0.20, module1Z + 0.02],
    ];
  }, [module1X, module1Y, module1Z, module1W, module1H, module2X, module2Y, module2Z, module2W, module2H, isMobile]);

  const uxPath = useMemo<[number, number, number][]>(() => {
    if (isMobile || uxNodes.length < 2) return [];
    return uxNodes;
  }, [uxNodes, isMobile]);

  // ── Second flow connector: module3 → module2 ─────────────────────────────
  const connectorPath = useMemo<[number, number, number][]>(() => {
    if (isMobile) return [];
    return [
      [module3X - module3W * 0.6, module3Y + module3H * 0.3, module3Z + 0.01],
      [module2X + module2W * 0.5, module2Y - module2H * 0.4, module2Z + 0.01],
    ];
  }, [module2X, module2Y, module2Z, module2W, module2H, module3X, module3Y, module3Z, module3W, module3H, isMobile]);

  // ── Anchor nodes: glow spheres at module junction points ─────────────────
  const anchorNodes = useMemo<[number, number, number][]>(() => {
    if (isMobile) return [];
    return [
      // Module 1 top-left corner anchor
      [module1X - module1W * 0.80, module1Y + module1H * 0.80, module1Z + 0.01],
      // Module 2 top-right corner anchor
      [module2X + module2W * 0.80, module2Y + module2H * 0.80, module2Z + 0.01],
      // Center midpoint anchor (flow path junction)
      [0.0, 0.06, (module1Z + module2Z) * 0.5],
      // Module 3 top-left anchor
      [module3X - module3W * 0.6, module3Y + module3H * 0.6, module3Z + 0.01],
    ];
  }, [module1X, module1Y, module1Z, module1W, module1H, module2X, module2Y, module2Z, module2W, module2H, module3X, module3Y, module3Z, module3W, module3H, isMobile]);

  if (glassT <= 0.01) return null;

  const g = glassT;   // shorthand
  const afterWave = localProgress > 0.76;
  const waveActive = localProgress >= 0.68 && localProgress <= 0.76;
  const wavePulse = waveActive
    ? Math.sin(Math.PI * ((localProgress - 0.68) / 0.08))
    : 0;

  // REBASE-02: raised base opacity so modules are clearly visible
  const mod1GlassOpacity = g * baseOpacity * (0.40 + (afterWave ? 0.06 : 0));
  const mod2GlassOpacity = g * baseOpacity * (0.32 + (afterWave ? 0.04 : 0));
  const mod1EdgeOpacity  = g * baseOpacity * (0.72 + (afterWave ? 0.10 : 0) + wavePulse * 0.12);
  const mod2EdgeOpacity  = g * baseOpacity * (0.60 + (afterWave ? 0.08 : 0) + wavePulse * 0.10);

  return (
    <group>
      {/* ── Module 1: Primary Feature Plate ──────────────────────────────── */}
      <mesh position={[module1X, module1Y, module1Z]} renderOrder={13}>
        <planeGeometry args={[module1W * 2, module1H * 2]} />
        <meshStandardMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          emissive={PRODUCT_ENGINE_COLORS.accentCyan}
          emissiveIntensity={0.045 * g + (afterWave ? 0.015 : 0) + wavePulse * 0.02}
          transparent
          opacity={mod1GlassOpacity}
          roughness={0.06}
          metalness={0.12}
          depthWrite={false}
        />
      </mesh>

      <Line
        points={buildRect(module1W, module1H, module1X, module1Y)}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 0.9 : (afterWave ? 1.3 : 1.1)}
        transparent
        opacity={mod1EdgeOpacity}
      />

      {/* Module 1 Interior Detail Bar */}
      {!isMobile && g > 0.15 && (
        <Line
          points={[
            [module1X - module1W * 0.40, module1Y + module1H * 0.38, module1Z + 0.01],
            [module1X + module1W * 0.25, module1Y + module1H * 0.38, module1Z + 0.01]
          ]}
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          lineWidth={0.7}
          transparent
          opacity={g * baseOpacity * 0.60}
        />
      )}

      {/* Module 1 second detail bar (adds internal structure) */}
      {!isMobile && g > 0.25 && (
        <Line
          points={[
            [module1X - module1W * 0.55, module1Y - module1H * 0.20, module1Z + 0.01],
            [module1X + module1W * 0.35, module1Y - module1H * 0.20, module1Z + 0.01]
          ]}
          color={PRODUCT_ENGINE_COLORS.accentBlue}
          lineWidth={0.5}
          transparent
          opacity={g * baseOpacity * 0.42}
        />
      )}

      {/* ── Module 2: Secondary Module Plate ─────────────────────────────── */}
      <mesh position={[module2X, module2Y, module2Z]} renderOrder={13}>
        <planeGeometry args={[module2W * 2, module2H * 2]} />
        <meshStandardMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          emissive={PRODUCT_ENGINE_COLORS.accentBlue}
          emissiveIntensity={0.028 * g + wavePulse * 0.015}
          transparent
          opacity={mod2GlassOpacity}
          roughness={0.08}
          metalness={0.10}
          depthWrite={false}
        />
      </mesh>

      <Line
        points={buildRect(module2W, module2H, module2X, module2Y)}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.8 : (afterWave ? 1.1 : 0.95)}
        transparent
        opacity={mod2EdgeOpacity}
      />

      {/* ── Module 3: Small Data / Status Plate (desktop only) ───────────── */}
      {!isMobile && g > 0.10 && (
        <>
          <mesh position={[module3X, module3Y, module3Z]} renderOrder={12}>
            <planeGeometry args={[module3W * 2, module3H * 2]} />
            <meshStandardMaterial
              color={PRODUCT_ENGINE_COLORS.chamberDepth}
              emissive={PRODUCT_ENGINE_COLORS.accentGold}
              emissiveIntensity={0.018 * g + wavePulse * 0.012}
              transparent
              opacity={g * baseOpacity * (0.28 + (afterWave ? 0.06 : 0))}
              roughness={0.10}
              metalness={0.08}
              depthWrite={false}
            />
          </mesh>

          <Line
            points={buildRect(module3W, module3H, module3X, module3Y)}
            color={PRODUCT_ENGINE_COLORS.accentGold}
            lineWidth={afterWave ? 0.9 : 0.75}
            transparent
            opacity={g * baseOpacity * (0.55 + (afterWave ? 0.08 : 0) + wavePulse * 0.10)}
          />
        </>
      )}

      {/* ── Primary flow connector: module2 → center → module1 ───────────── */}
      {!isMobile && uxFlowT > 0.05 && uxPath.length >= 2 && (
        <group>
          <Line
            points={uxPath}
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            lineWidth={0.9}
            transparent
            opacity={uxFlowT * baseOpacity * 0.65}
          />

          {/* Node points on primary flow path */}
          {uxNodes.map((pos, idx) => (
            <mesh key={idx} position={pos} renderOrder={14}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshBasicMaterial
                color={PRODUCT_ENGINE_COLORS.accentCyan}
                transparent
                opacity={uxFlowT * baseOpacity * 0.90}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ── Second flow connector: module3 → module2 ─────────────────────── */}
      {!isMobile && uxFlowT > 0.15 && connectorPath.length >= 2 && (
        <Line
          points={connectorPath}
          color={PRODUCT_ENGINE_COLORS.accentGold}
          lineWidth={0.6}
          transparent
          opacity={uxFlowT * baseOpacity * 0.45}
        />
      )}

      {/* ── Anchor glow nodes at module junctions ────────────────────────── */}
      {!isMobile && uxFlowT > 0.08 && anchorNodes.map((pos, idx) => (
        <mesh key={`anchor-${idx}`} position={pos} renderOrder={15}>
          <sphereGeometry args={[0.020, 10, 10]} />
          <meshBasicMaterial
            color={idx === 3 ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={uxFlowT * baseOpacity * (0.78 + wavePulse * 0.18)}
          />
        </mesh>
      ))}
    </group>
  );
}


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
