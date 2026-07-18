import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeDeploymentGateProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeDeploymentGate.tsx — Layer 6: DEPLOYMENT Gate & Gold Release Vector (FORGE-04 & FORGE-05)
 *
 * Sequence:
 * - 0.80 - 0.86: Gate frame appears (frameT)
 * - 0.86 - 0.92: Gate opens / aperture expands slightly (apertureT)
 * - 0.90 - 0.94: Short gold output vector becomes visible (rayT)
 * - 0.94 - 1.00: Compact proof packet sphere travels along vector toward Scene 04 Projects (packetProgress)
 */
export function ForgeDeploymentGate({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeDeploymentGateProps) {
  const packetRef = useRef<THREE.Mesh>(null);

  // 1. Frame progression (0.80 - 0.86)
  const frameT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.80) / 0.06));

  // 2. Aperture expansion progression (0.86 - 0.92)
  const apertureT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.86) / 0.06));

  // 3. Short output ray progression (0.90 - 0.94)
  const rayT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.90) / 0.04));

  // 4. Compact proof packet traveling forward (0.94 - 1.00)
  const packetProgress = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.94) / 0.06));

  // Target coordinates aligning exactly with Scene 04 Projects incoming anchor
  const targetX = isMobile ? 0.0 : 3.0;
  const targetY = isMobile ? -3.0 : -1.8;
  const targetZ = isMobile ? -3.2 : -3.8;

  // Dynamic gate aperture size
  const gateRadius = useMemo(() => {
    const baseRadius = isMobile ? 0.18 : 0.28;
    const expandDelta = isMobile ? 0.05 : 0.08;
    return baseRadius + apertureT * expandDelta;
  }, [isMobile, apertureT]);

  // Release gate circle points
  const gatePoints = useMemo<[number, number, number][]>(() => {
    const points: [number, number, number][] = [];
    const count = 36;
    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const x = gateRadius * Math.cos(theta);
      const y = gateRadius * Math.sin(theta);
      points.push([x, y, 0]);
    }
    return points;
  }, [gateRadius]);

  // Restrained gold ray release vector
  const releaseRayPoints = useMemo<[number, number, number][]>(() => {
    return [
      [0, 0, 0],
      [
        targetX * rayT,
        targetY * rayT,
        targetZ * rayT,
      ],
    ];
  }, [targetX, targetY, targetZ, rayT]);

  // Frame update for scroll-deterministic proof packet sphere
  useFrame(() => {
    if (reducedMotion || localProgress <= 0.0 || !packetRef.current) return;

    // Position interpolation along deployment ray toward Scene 04 Projects source
    const px = targetX * packetProgress;
    const py = targetY * packetProgress;
    const pz = targetZ * packetProgress;

    packetRef.current.position.set(px, py, pz);
  });

  if (localProgress <= 0.0 || opacity <= 0.01 || frameT <= 0.01) return null;

  const baseOpacity = opacity * frameT;

  return (
    <group>
      {/* Release Gate Ring Frame */}
      <Line
        points={gatePoints}
        color={FORGE_COLORS.accentGold}
        lineWidth={isMobile ? 1.6 : 2.4}
        transparent
        opacity={baseOpacity * 0.85}
      />

      {/* Outer Aperture Accent Bracket Ring */}
      {apertureT > 0.01 && (
        <Line
          points={gatePoints}
          color={FORGE_COLORS.accentCyan}
          lineWidth={isMobile ? 1.0 : 1.4}
          transparent
          opacity={baseOpacity * 0.45 * apertureT}
          scale={[1.15, 1.15, 1.15]}
        />
      )}

      {/* Short Restrained Prep Release Ray */}
      {rayT > 0.01 && (
        <Line
          points={releaseRayPoints}
          color={FORGE_COLORS.accentGold}
          lineWidth={isMobile ? 1.8 : 2.6}
          transparent
          opacity={baseOpacity * 0.90 * rayT}
          dashed={rayT < 0.9}
          dashScale={12}
          dashSize={0.1}
          gapSize={0.05}
        />
      )}

      {/* Traveling Compact Proof Packet Sphere (0.94 - 1.00) */}
      {!reducedMotion && packetProgress > 0.01 && (
        <mesh ref={packetRef} renderOrder={35}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial
            color={FORGE_COLORS.accentGold}
            transparent
            opacity={baseOpacity * 0.95 * (1.0 - Math.max(0, (localProgress - 0.98) / 0.02))}
          />
        </mesh>
      )}
    </group>
  );
}
