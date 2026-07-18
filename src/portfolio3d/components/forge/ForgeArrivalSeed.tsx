import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeArrivalSeedProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeArrivalSeed.tsx — Scene 03 Arrival Seed Ingress & Lock (FORGE-02)
 *
 * Appears cleanly inside Scene 03 (0.08 - 0.18) from forward depth space,
 * settling into the center of the System Forge Core at 0.14 - 0.24.
 * Scene 03-owned continuous motion without helper lines or Scene 02 modifications.
 */
export function ForgeArrivalSeed({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeArrivalSeedProps) {
  const seedMeshRef = useRef<THREE.Mesh>(null);
  const seedGlowRef = useRef<THREE.Mesh>(null);

  // Motion timing bounds
  const ingressT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.08) / 0.10));

  const lockT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.14) / 0.10));

  useFrame(() => {
    if (reducedMotion || localProgress <= 0.0) return;

    // Scroll-derived 3D trajectory from forward space into Forge Core center [0, 0, 0]
    if (seedMeshRef.current && localProgress <= 0.24) {
      const startX = isMobile ? -0.8 : -1.8;
      const startY = isMobile ? 1.8 : 1.2;
      const startZ = isMobile ? 0.8 : 1.4;

      // Ingress interpolation to target center
      const curX = startX * (1.0 - ingressT);
      const curY = startY * (1.0 - ingressT);
      const curZ = startZ * (1.0 - ingressT);

      seedMeshRef.current.position.set(curX, curY, curZ);
      if (seedGlowRef.current) {
        seedGlowRef.current.position.set(curX, curY, curZ);
      }
    }
  });

  // Boundary isolation check
  if (localProgress <= 0.0 || localProgress > 0.24 || opacity <= 0.01) return null;

  const baseOpacity = opacity * (1.0 - Math.max(0, (localProgress - 0.18) / 0.06));

  return (
    <group>
      {/* Primary Ingress Energy Seed Sphere */}
      <mesh ref={seedMeshRef} renderOrder={34}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshStandardMaterial
          color={FORGE_COLORS.accentCyan}
          emissive={FORGE_COLORS.accentCyan}
          emissiveIntensity={1.8}
          transparent
          opacity={baseOpacity * 0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Soft Glow Shell */}
      <mesh ref={seedGlowRef} renderOrder={33}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial
          color={FORGE_COLORS.coreGlow}
          transparent
          opacity={baseOpacity * 0.45 * lockT}
        />
      </mesh>
    </group>
  );
}
