import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeServiceConduitsProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeServiceConduits.tsx — Layer 4: SERVICES Conduit Conduits (FORGE-03 & FORGE-08)
 *
 * Controlled API energy conduits connecting the System Forge Core to 3-4 service
 * endpoint nodes at 0.60 - 0.76.
 * Features glowing node connectors where the lines anchor into the reactor core shell.
 */
export function ForgeServiceConduits({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeServiceConduitsProps) {
  const serviceGroupRef = useRef<THREE.Group>(null);

  // Nodes appearance (0.60 - 0.68) and conduits energize (0.66 - 0.76)
  const nodeT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.60) / 0.08));
  const conduitT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.66) / 0.10));

  // Service endpoint node positions surrounding the core
  const serviceNodes = useMemo<[number, number, number][]>(() => {
    if (isMobile) {
      return [
        [-0.75, 0.45, -0.1],
        [0.75, 0.45, 0.1],
        [0.0, -1.0, 0.0],
      ];
    }
    return [
      [-1.15, 0.65, -0.2],
      [1.15, 0.65, 0.1],
      [-1.0, -0.75, 0.2],
      [1.0, -0.75, -0.1],
    ];
  }, [isMobile]);

  // Compute points where the conduits intersect the reactor shell (0.28 radius desktop, 0.22 mobile)
  const shellNodes = useMemo<[number, number, number][]>(() => {
    const shellRadius = isMobile ? 0.22 : 0.28;
    return serviceNodes.map((node) => {
      const v = new THREE.Vector3(...node).normalize().multiplyScalar(shellRadius);
      return [v.x, v.y, v.z];
    });
  }, [serviceNodes, isMobile]);

  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0 || !serviceGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    serviceGroupRef.current.rotation.y = Math.sin(t * 0.12) * 0.04;
  });

  if (localProgress <= 0.0 || opacity <= 0.01 || nodeT <= 0.01) return null;

  const baseOpacity = opacity * (localProgress > 0.76 ? 0.45 : 0.90) * nodeT;

  return (
    <group ref={serviceGroupRef}>
      {serviceNodes.map((nodePos, idx) => {
        const shellNode = shellNodes[idx];
        const conduitPoints: [number, number, number][] = [
          [0, 0, 0], // From core center
          [
            nodePos[0] * conduitT,
            nodePos[1] * conduitT,
            nodePos[2] * conduitT,
          ],
        ];

        return (
          <group key={idx}>
            {/* Energy Conduit Line connecting core to service node */}
            {conduitT > 0.01 && (
              <Line
                points={conduitPoints}
                color={FORGE_COLORS.accentCyan}
                lineWidth={isMobile ? 1.6 : 2.2}
                transparent
                opacity={baseOpacity * 0.8 * conduitT}
              />
            )}

            {/* Core Shell Anchor Node (Interface point between shell and conduit) */}
            {conduitT > 0.10 && (
              <mesh position={shellNode} renderOrder={33}>
                <sphereGeometry args={[0.024 * conduitT, 10, 10]} />
                <meshBasicMaterial
                  color={FORGE_COLORS.accentGold}
                  transparent
                  opacity={baseOpacity * conduitT}
                />
              </mesh>
            )}

            {/* Service Endpoint Node Sphere */}
            <mesh position={nodePos} renderOrder={33}>
              <sphereGeometry args={[0.045 * nodeT, 16, 16]} />
              <meshStandardMaterial
                color={FORGE_COLORS.accentCyan}
                emissive={FORGE_COLORS.accentCyan}
                emissiveIntensity={1.5}
                transparent
                opacity={baseOpacity}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
