import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";
import { isMobileDevice } from "../../utils/mobileUtils";
import { ForgeArrivalSeed } from "./ForgeArrivalSeed";
import { SystemForgeCore } from "./SystemForgeCore";
import { ForgeReactorRings } from "./ForgeReactorRings";
import { ForgeNetworkOrbits } from "./ForgeNetworkOrbits";
import { ForgeArchitectureFrame } from "./ForgeArchitectureFrame";
import { ForgeInterfaceShell } from "./ForgeInterfaceShell";
import { ForgeServiceConduits } from "./ForgeServiceConduits";
import { ForgeDataCore } from "./ForgeDataCore";
import { ForgeDeploymentGate } from "./ForgeDeploymentGate";

interface SystemForgeBaselineProps {
  localProgress: number;
  opacity?: number;
  reducedMotion?: boolean;
}

/**
 * SystemForgeBaseline.tsx — Baseline 3D Forge Chamber Foundation (FORGE-01 to FORGE-04)
 *
 * Assembles:
 * - Ingress Arrival Seed (0.08 - 0.24)
 * - System Forge Core (Hero digital reactor)
 * - Concentric Reactor Rings (0.20 - 0.42)
 * - Layer 2: ARCHITECTURE Frame (0.34 - 0.50)
 * - Layer 3: INTERFACE Shell (0.48 - 0.64)
 * - Layer 4: SERVICES Conduits (0.60 - 0.76)
 * - Layer 5: DATA Core (0.66 - 0.80)
 * - Layer 6: DEPLOYMENT Gate (0.80 - 0.92)
 */
export function SystemForgeBaseline({
  localProgress,
  opacity = 1.0,
  reducedMotion = false,
}: SystemForgeBaselineProps) {
  const isMobile = useMemo(() => isMobileDevice(), []);

  // Structural chamber guide outer ring
  const chamberRingPoints = useMemo<[number, number, number][]>(() => {
    const points: [number, number, number][] = [];
    const count = 48;
    const radiusX = isMobile ? 1.1 : 1.7;
    const radiusY = isMobile ? 1.9 : 1.2;

    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const x = radiusX * Math.cos(theta);
      const y = radiusY * Math.sin(theta);
      points.push([x, y, 0]);
    }
    return points;
  }, [isMobile]);

  // Hard Boundary Isolation: Do not render inside Scene 02 (localProgress <= 0.0)
  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  const baseOpacity = opacity * 0.85;
  const corePosition: [number, number, number] = isMobile ? [0.0, -0.2, 0.0] : [1.32, -0.05, 0.0];
  const groupScale = isMobile ? 1.0 : 1.32;

  return (
    <group position={corePosition} scale={groupScale}>
      {/* Structural Outer Chamber Guide Ring */}
      <Line
        points={chamberRingPoints}
        color={FORGE_COLORS.chamberRing}
        lineWidth={isMobile ? 1.6 : 2.4}
        transparent
        opacity={baseOpacity * 0.35}
      />

      {/* 1. Ingress Arrival Seed (0.08 - 0.24) */}
      <ForgeArrivalSeed
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 2. Hero Digital Reactor Core */}
      <SystemForgeCore
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 2b. Cinematic Network Orbits (FORGE-08) */}
      <ForgeNetworkOrbits
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 3. Concentric Reactor Rings (0.20 - 0.42) */}
      <ForgeReactorRings
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 4. Layer 2 — ARCHITECTURE Frame (0.34 - 0.50) */}
      <ForgeArchitectureFrame
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 5. Layer 3 — INTERFACE Shell (0.48 - 0.64) */}
      <ForgeInterfaceShell
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 6. Layer 4 — SERVICES Conduits (0.60 - 0.76) */}
      <ForgeServiceConduits
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 7. Layer 5 — DATA Core (0.66 - 0.80) */}
      <ForgeDataCore
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      {/* 8. Layer 6 — DEPLOYMENT Gate (0.80 - 0.92) */}
      <ForgeDeploymentGate
        localProgress={localProgress}
        opacity={opacity}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
