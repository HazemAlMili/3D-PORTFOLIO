import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
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
 * ProductAssemblyBaseline.tsx — Scene 03 Product Assembly Stage Anchor
 *
 * Mounts:
 *   - Staging Ground Ring: glowing platform anchor under product shell
 *   - ProductIdeaFragments: raw floating chaos entry shards
 *   - ProductBuildCore: primary expanded product surface & story beats
 *   - Ambient product build lighting
 */
export function ProductAssemblyBaseline({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ProductAssemblyBaselineProps) {
  const chamberRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Desktop: product floats right-of-center. Mobile: centered, slightly lower.
  const anchorX = isMobile ? PRODUCT_ENGINE_LAYOUT.mobileProductX : PRODUCT_ENGINE_LAYOUT.desktopProductX;
  const anchorY = isMobile ? PRODUCT_ENGINE_LAYOUT.mobileProductY : PRODUCT_ENGINE_LAYOUT.desktopProductY;
  const anchorPos: [number, number, number] = [anchorX, anchorY, 0.0];

  // Ambient rotation & subtle ground ring wobble
  useFrame((state) => {
    if (reducedMotion || isMobile || !chamberRef.current) return;
    const t = state.clock.getElapsedTime();
    chamberRef.current.rotation.y = Math.sin(t * 0.18) * 0.008;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12;
    }
  });

  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  const groundY = isMobile ? -0.75 : -1.05;
  const ringR   = isMobile ? 1.10 : 1.65;

  return (
    <group position={anchorPos}>

      {/* Product build space ambient point light */}
      <pointLight
        position={[0, 0.5, 2.5]}
        intensity={0.45}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
      />
      <pointLight
        position={[1.2, -0.6, 1.5]}
        intensity={0.25}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
      />

      {/* Product Assembly Stage Platform Anchor Ring */}
      {!reducedMotion && (
        <group position={[0, groundY, -0.30]} rotation={[Math.PI * 0.46, 0, 0]}>
          {/* Outer glowing stage ring */}
          <group ref={ringRef}>
            <mesh renderOrder={5}>
              <torusGeometry args={[ringR, 0.006, 8, 48]} />
              <meshBasicMaterial
                color={PRODUCT_ENGINE_COLORS.accentCyan}
                transparent
                opacity={opacity * 0.24}
              />
            </mesh>
            <mesh renderOrder={5}>
              <torusGeometry args={[ringR * 0.85, 0.004, 8, 36]} />
              <meshBasicMaterial
                color={PRODUCT_ENGINE_COLORS.accentBlue}
                transparent
                opacity={opacity * 0.16}
              />
            </mesh>
          </group>


        </group>
      )}

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
