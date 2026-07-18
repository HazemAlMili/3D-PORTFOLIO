import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { ProductAssemblyBaseline } from "../components/product/ProductAssemblyBaseline";
import { isMobileDevice } from "../utils/mobileUtils";

interface Scene03ArchitectureProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

/**
 * Scene03Architecture.tsx — Product Assembly Engine (PRODUCT-01)
 *
 * Answers: "How does this developer turn capabilities into a polished digital product?"
 *
 * Forge direction is REJECTED. This file no longer mounts:
 *   SystemForgeBaseline, ForgeArrivalSeed, SystemForgeCore, ForgeReactorRings,
 *   ForgeArchitectureFrame, ForgeInterfaceShell, ForgeServiceConduits,
 *   ForgeDataCore, ForgeDeploymentGate, ForgeNetworkOrbits
 *
 * PRODUCT-01: ProductAssemblyBaseline only (clean staging anchor).
 * PRODUCT-02 onwards: Large floating product hero will be mounted here.
 *
 * Creative lock: docs/portfolio-3d/scene03-product-assembly-engine-creative-lock.md
 */
export function Scene03Architecture({
  sceneId,
  sceneIndex,
  localProgress,
  opacity = 1.0,
}: Scene03ArchitectureProps) {
  const groupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const isMobile = isMobileDevice();

  // Hard boundary isolation: no 3D geometry while localProgress <= 0.0 (inside Scene 02)
  const isSceneActive    = localProgress > 0.0;
  const shouldRenderHeavy = isSceneActive && opacity > 0.02;
  const shouldAnimate    = opacity > 0.05;
  const shouldRenderStatic = reducedMotion === true || !shouldAnimate;

  // Gentle ambient drift — very subtle, not forge-themed
  useFrame((state) => {
    if (!shouldRenderHeavy || shouldRenderStatic || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.012;
  });

  // Hard boundary isolation: do not render Scene 03 once it is complete
  if (localProgress >= 1.0) return null;

  if (!shouldRenderHeavy) return null;

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>

      {/* Product Assembly Engine Lighting — matches Scene 02 color temperature */}
      <ambientLight intensity={0.18} color="#0A1828" />
      <directionalLight position={[6, 5, 5]}   intensity={0.85} color="#F4F7FA" />
      <directionalLight position={[-4, 2, 4]}  intensity={0.40} color="#38D6FF" />
      <pointLight       position={[0, 0, 3]}   intensity={0.30} color="#2F80ED" />

      {/* Main scene group with ambient drift */}
      <group ref={groupRef}>

        {/* PRODUCT-01: Clean product staging baseline.
            Large floating product hero mounts here in PRODUCT-02. */}
        <ProductAssemblyBaseline
          localProgress={localProgress}
          opacity={opacity}
          isMobile={isMobile}
          reducedMotion={shouldRenderStatic}
        />

      </group>
    </group>
  );
}

export default Scene03Architecture;
