import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS, PRODUCT_ENGINE_LAYOUT } from "../../constants/scene03Config";
import { ProductBuildCore } from "./ProductBuildCore";
import { ProductIdeaFragments } from "./ProductIdeaFragments";

interface ProductAssemblyBaselineProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ProductAssemblyBaseline.tsx — Scene 03 Product Assembly Engine (PRODUCT-01 / PRODUCT-02)
 *
 * Mounts:
 *   - ProductIdeaFragments: the raw floating chaos entry shards (PRODUCT-01 / PRODUCT-02)
 *   - ProductHeroShell: the large floating product interface (primary visual)
 *   - Faint bounding anchor: subtle depth guide behind the product
 *   - Ambient product build lighting
 *
 * Layout: product anchor positioned right-of-center on desktop,
 * centered on mobile — mirrors Scene 02 right-hero grammar.
 */
export function ProductAssemblyBaseline({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ProductAssemblyBaselineProps) {
  const chamberRef = useRef<THREE.Group>(null);

  // Desktop: product floats right-of-center. Mobile: centered, slightly lower.
  const anchorX = isMobile ? PRODUCT_ENGINE_LAYOUT.mobileProductX : PRODUCT_ENGINE_LAYOUT.desktopProductX;
  const anchorY = isMobile ? PRODUCT_ENGINE_LAYOUT.mobileProductY : PRODUCT_ENGINE_LAYOUT.desktopProductY;
  const anchorPos: [number, number, number] = [anchorX, anchorY, 0.0];

  // Faint outer bounding guide (behind the product shell)
  const guideW = isMobile ? 1.20 : 1.72;
  const guideH = isMobile ? 0.78 : 1.12;
  const guideRect = buildRect(guideW, guideH);

  // Very slow ambient rotation of the outer guide only (not the hero shell)
  useFrame((state) => {
    if (reducedMotion || isMobile || !chamberRef.current) return;
    const t = state.clock.getElapsedTime();
    chamberRef.current.rotation.y = Math.sin(t * 0.18) * 0.008;
  });

  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  const entryStart = 0.02;
  const entryEnd   = 0.12;
  const entryT    = Math.min(1, Math.max(0, (localProgress - entryStart) / (entryEnd - entryStart)));
  
  // Exit fade: fade out the product baseline completely during handoff (0.92 -> 1.00)
  const exitT     = localProgress > 0.92
    ? Math.max(0, 1.0 - (localProgress - 0.92) / 0.08)
    : 1.0;

  const baseOpacity = opacity * entryT * exitT;

  return (
    <group position={anchorPos}>

      {/* Product build space ambient point light */}
      <pointLight
        position={[0, 0.5, 2]}
        intensity={0.28}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
      />
      <pointLight
        position={[1.0, -0.5, 1]}
        intensity={0.15}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
      />

      {/* Outer bounding guide — very faint, stays behind the product */}
      <group ref={chamberRef}>
        <Line
          points={guideRect}
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          lineWidth={isMobile ? 1.0 : 1.2}
          transparent
          opacity={baseOpacity * 0.12}
        />
      </group>

      {/* ── RAW IDEA SHARDS: Fragmented chaos entry ───────────────── */}
      <ProductIdeaFragments
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* ── PRIMARY VISUAL: Semantic Product Construction System ─── */}
      <ProductBuildCore
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

    </group>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildRect(hw: number, hh: number): [number, number, number][] {
  return [
    [-hw,  hh, 0],
    [ hw,  hh, 0],
    [ hw, -hh, 0],
    [-hw, -hh, 0],
    [-hw,  hh, 0],
  ];
}
