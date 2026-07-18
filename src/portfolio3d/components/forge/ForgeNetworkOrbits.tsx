import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeNetworkOrbitsProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeNetworkOrbits.tsx — Cinematic cyan/blue network orbits around System Forge (FORGE-08)
 *
 * Implements decorative multi-axis orbit trajectories and glowing nodes.
 * Wakes up dynamically (0.22 - 0.50) and aligns with Scene 02 aesthetics.
 */
export function ForgeNetworkOrbits({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeNetworkOrbitsProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Wakes up as the reactor heats up (0.22 - 0.50)
  const wakeT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.22) / 0.28));

  // 1. Generate circular orbit points
  const circlePoints1 = useMemo(() => generateCirclePoints(isMobile ? 0.65 : 0.95), [isMobile]);
  const circlePoints2 = useMemo(() => generateCirclePoints(isMobile ? 0.90 : 1.35), [isMobile]);
  const circlePoints3 = useMemo(() => generateCirclePoints(isMobile ? 1.15 : 1.70), [isMobile]);

  // Rotations for the three orbits to distribute them in 3D space
  const rot1 = useMemo<[number, number, number]>(() => [0.35, 0.15, 0.10], []);
  const rot2 = useMemo<[number, number, number]>(() => [-0.25, -0.45, 0.60], []);
  const rot3 = useMemo<[number, number, number]>(() => [0.55, -0.10, -0.35], []);

  // 2. Position nodes along the circles
  const node1Pos = useMemo(() => getPosOnCircle(isMobile ? 0.65 : 0.95, Math.PI * 0.75, rot1), [isMobile, rot1]);
  const node2Pos = useMemo(() => getPosOnCircle(isMobile ? 0.90 : 1.35, Math.PI * 1.30, rot2), [isMobile, rot2]);
  const node3Pos = useMemo(() => getPosOnCircle(isMobile ? 1.15 : 1.70, Math.PI * 0.25, rot3), [isMobile, rot3]);

  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0 || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing rotation similar to Scene 02
    groupRef.current.rotation.y = Math.sin(t * 0.20) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.10) * 0.02;
  });

  if (localProgress <= 0.0 || opacity <= 0.01 || wakeT <= 0.01) return null;

  // Orbit lines should be extremely low opacity near the left (behind text)
  // Base opacity is kept very faint (0.15 - 0.28) so it is clean and does not clutter
  const lineOpacity = opacity * wakeT * (isMobile ? 0.18 : 0.26);
  const nodeOpacity = opacity * wakeT * 0.85;

  return (
    <group ref={groupRef}>
      {/* Orbit 1 */}
      <Line
        points={circlePoints1}
        rotation={rot1}
        color={FORGE_COLORS.accentCyan}
        lineWidth={1.2}
        transparent
        opacity={lineOpacity}
      />

      {/* Orbit 2 */}
      <Line
        points={circlePoints2}
        rotation={rot2}
        color={FORGE_COLORS.accentBlue}
        lineWidth={1.0}
        transparent
        opacity={lineOpacity * 0.8}
      />

      {/* Orbit 3 (Desktop only) */}
      {!isMobile && (
        <Line
          points={circlePoints3}
          rotation={rot3}
          color={FORGE_COLORS.chamberRing}
          lineWidth={1.0}
          transparent
          opacity={lineOpacity * 0.6}
        />
      )}

      {/* Orbit Nodes */}
      <mesh position={node1Pos} renderOrder={33}>
        <sphereGeometry args={[0.025 * wakeT, 10, 10]} />
        <meshBasicMaterial color={FORGE_COLORS.accentCyan} transparent opacity={nodeOpacity} />
      </mesh>

      <mesh position={node2Pos} renderOrder={33}>
        <sphereGeometry args={[0.028 * wakeT, 10, 10]} />
        <meshBasicMaterial color={FORGE_COLORS.accentBlue} transparent opacity={nodeOpacity * 0.8} />
      </mesh>

      {!isMobile && (
        <mesh position={node3Pos} renderOrder={33}>
          <sphereGeometry args={[0.022 * wakeT, 10, 10]} />
          <meshBasicMaterial color={FORGE_COLORS.accentCyan} transparent opacity={nodeOpacity * 0.6} />
        </mesh>
      )}
    </group>
  );
}

// Helpers
function generateCirclePoints(radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const count = 48;
  for (let i = 0; i <= count; i++) {
    const theta = (i / count) * Math.PI * 2;
    points.push([radius * Math.cos(theta), radius * Math.sin(theta), 0]);
  }
  return points;
}

function getPosOnCircle(radius: number, angle: number, rot: [number, number, number]): [number, number, number] {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const z = 0;

  // Apply Euler rotation matrix multiplication
  const vector = new THREE.Vector3(x, y, z);
  const euler = new THREE.Euler(rot[0], rot[1], rot[2], "XYZ");
  vector.applyEuler(euler);

  return [vector.x, vector.y, vector.z];
}
