import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeInterfaceShellProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeInterfaceShell.tsx — Layer 3: INTERFACE Shell Assembly (FORGE-03)
 *
 * Floating glass-like UI shell panels assembling inward around the front-facing
 * reactor core layer at 0.48 - 0.64.
 */
export function ForgeInterfaceShell({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeInterfaceShellProps) {
  const shellGroupRef = useRef<THREE.Group>(null);

  // Inward assembly progression (0.48 - 0.64)
  const assembleT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.48) / 0.16));

  // Inward snap offset: starts expanded at 0.8, snaps inward to 0.45
  const currentOffset = 0.85 - assembleT * 0.40;
  const currentDepth = (0.6 - assembleT * 0.35);

  const panelConfigs = useMemo(() => {
    if (isMobile) {
      return [
        { pos: [-currentOffset, currentOffset * 0.7, currentDepth], size: [0.35, 0.22, 0.01], rotZ: -0.05 },
        { pos: [currentOffset, -currentOffset * 0.7, currentDepth], size: [0.35, 0.22, 0.01], rotZ: 0.05 },
      ];
    }
    return [
      { pos: [-currentOffset * 0.9, currentOffset * 0.6, currentDepth], size: [0.45, 0.28, 0.01], rotZ: -0.08 },
      { pos: [currentOffset * 0.9, currentOffset * 0.6, currentDepth + 0.05], size: [0.40, 0.25, 0.01], rotZ: 0.06 },
      { pos: [0.0, -currentOffset * 0.7, currentDepth + 0.1], size: [0.55, 0.30, 0.01], rotZ: 0.0 },
    ];
  }, [isMobile, currentOffset, currentDepth]);

  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0 || !shellGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    shellGroupRef.current.position.y = Math.sin(t * 0.8) * 0.02;
  });

  if (localProgress <= 0.0 || opacity <= 0.01 || assembleT <= 0.01) return null;

  const baseOpacity = opacity * (localProgress > 0.64 ? 0.40 : 0.85) * assembleT;

  return (
    <group ref={shellGroupRef}>
      {panelConfigs.map((cfg, idx) => (
        <mesh
          key={idx}
          position={cfg.pos as [number, number, number]}
          rotation={[0, 0, cfg.rotZ]}
          renderOrder={31}
        >
          <boxGeometry args={cfg.size as [number, number, number]} />
          <meshStandardMaterial
            color={FORGE_COLORS.accentBlue}
            emissive={FORGE_COLORS.accentCyan}
            emissiveIntensity={0.6}
            transparent
            opacity={baseOpacity * 0.75}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}
