import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface SystemForgeCoreProps {
  localProgress: number;
  opacity?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

/**
 * SystemForgeCore.tsx — Hero Digital Reactor Core (FORGE-02 & FORGE-08)
 *
 * Implements a larger, glossy reactor core consisting of:
 * - A central cyan energy nucleus (0.14 radius)
 * - Orbiting/clustered golden and blue sub-nucleon nodes (similar to Scene 02 atoms)
 * - A highly reflective transparent outer reactor shell (0.28 radius desktop, 0.22 mobile)
 * - Ignition expansion wave ring (0.18 - 0.34)
 */
export function SystemForgeCore({
  localProgress,
  opacity = 1.0,
  reducedMotion = false,
  isMobile = false,
}: SystemForgeCoreProps) {
  const innerGroupRef = useRef<THREE.Group>(null);
  const outerShellRef = useRef<THREE.Mesh>(null);
  const ignitionRingRef = useRef<THREE.Mesh>(null);

  // Core ignition wave progression (0.18 - 0.34)
  const isIgniting = !reducedMotion && localProgress >= 0.18 && localProgress <= 0.34;
  const ignitionT = isIgniting ? (localProgress - 0.18) / 0.16 : localProgress > 0.34 ? 1.0 : 0.0;

  const ignitionWaveScale = 0.8 + ignitionT * 2.4;
  const ignitionWaveOpacity = isIgniting ? (1.0 - ignitionT) * 0.85 : 0.0;

  const shellRadius = isMobile ? 0.22 : 0.28;

  // Frame animation for living reactor nucleus breathing & spinning
  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0) return;

    const t = state.clock.getElapsedTime();
    if (innerGroupRef.current) {
      const pulse = 1.0 + Math.sin(t * 2.2) * 0.05 + (isIgniting ? Math.sin(ignitionT * Math.PI) * 0.20 : 0.0);
      innerGroupRef.current.scale.set(pulse, pulse, pulse);
      innerGroupRef.current.rotation.y = t * 0.20;
    }
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = t * 0.40;
      outerShellRef.current.rotation.z = Math.sin(t * 0.3) * 0.12;
    }
  });

  const baseOpacity = opacity * 0.90;
  const coreEmissiveIntensity = reducedMotion ? 1.3 : 0.85 + ignitionT * 1.1;

  return (
    <group>
      {/* 1. Clustered Energy Nucleon Group */}
      <group ref={innerGroupRef}>
        {/* Central Core Sphere */}
        <mesh renderOrder={32}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial
            color={FORGE_COLORS.accentCyan}
            emissive={FORGE_COLORS.accentCyan}
            emissiveIntensity={coreEmissiveIntensity}
            transparent
            opacity={baseOpacity * 0.95}
            roughness={0.1}
            metalness={0.15}
          />
        </mesh>

        {/* Golden Nucleon Sub-Atom */}
        <mesh position={[0.07, 0.04, 0.04]} renderOrder={32}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial
            color="#FFE866"
            emissive="#FFBA00"
            emissiveIntensity={coreEmissiveIntensity * 0.85}
            transparent
            opacity={baseOpacity * 0.90}
            roughness={0.1}
          />
        </mesh>

        {/* Blue Nucleon Sub-Atom */}
        <mesh position={[-0.06, -0.04, -0.05]} renderOrder={32}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color={FORGE_COLORS.accentBlue}
            emissive={FORGE_COLORS.accentBlue}
            emissiveIntensity={coreEmissiveIntensity * 0.90}
            transparent
            opacity={baseOpacity * 0.90}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 2. Outer Glossy/Reflective Reactor Shell */}
      <mesh ref={outerShellRef} renderOrder={31}>
        <sphereGeometry args={[shellRadius, 28, 28]} />
        <meshStandardMaterial
          color={FORGE_COLORS.chamberRing}
          emissive={FORGE_COLORS.coreGlow}
          emissiveIntensity={0.55}
          transparent
          opacity={baseOpacity * 0.50}
          roughness={0.08}
          metalness={0.30}
        />
      </mesh>

      {/* 3. Core Ignition Expansion Ring Wave (0.18 - 0.34) */}
      {ignitionWaveOpacity > 0.01 && (
        <mesh
          ref={ignitionRingRef}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[ignitionWaveScale, ignitionWaveScale, ignitionWaveScale]}
          renderOrder={30}
        >
          <ringGeometry args={[shellRadius * 0.8, shellRadius * 1.1, 36]} />
          <meshBasicMaterial
            color={FORGE_COLORS.accentCyan}
            transparent
            opacity={baseOpacity * ignitionWaveOpacity}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
