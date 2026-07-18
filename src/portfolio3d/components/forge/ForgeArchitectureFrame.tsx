import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeArchitectureFrameProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeArchitectureFrame.tsx — Layer 2: ARCHITECTURE Topology Frame (FORGE-03)
 *
 * Vector blueprint bracket lines drawing from the reactor core at 0.34 - 0.50,
 * forming a structural topology frame around the System Forge Core.
 */
export function ForgeArchitectureFrame({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeArchitectureFrameProps) {
  const frameGroupRef = useRef<THREE.Group>(null);

  // Progressive drawing bounds (0.34 - 0.50)
  const drawT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.34) / 0.16));

  const offset = isMobile ? 0.65 : 0.90;
  const armLen = (isMobile ? 0.35 : 0.45) * drawT;

  // 4 Corner blueprint bracket lines surrounding the core
  const brackets = useMemo<[number, number, number][][]>(() => {
    return [
      // Top-Left Corner
      [[-offset, offset, 0], [-offset + armLen, offset, 0]],
      [[-offset, offset, 0], [-offset, offset - armLen, 0]],

      // Top-Right Corner
      [[offset, offset, 0], [offset - armLen, offset, 0]],
      [[offset, offset, 0], [offset, offset - armLen, 0]],

      // Bottom-Left Corner
      [[-offset, -offset, 0], [-offset + armLen, -offset, 0]],
      [[-offset, -offset, 0], [-offset, -offset + armLen, 0]],

      // Bottom-Right Corner
      [[offset, -offset, 0], [offset - armLen, -offset, 0]],
      [[offset, -offset, 0], [offset, -offset + armLen, 0]],
    ];
  }, [offset, armLen]);

  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0 || !frameGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    frameGroupRef.current.rotation.z = Math.sin(t * 0.1) * 0.03;
  });

  if (localProgress <= 0.0 || opacity <= 0.01 || drawT <= 0.01) return null;

  const baseOpacity = opacity * (localProgress > 0.50 ? 0.45 : 0.85);

  return (
    <group ref={frameGroupRef}>
      {brackets.map((pts, idx) => (
        <Line
          key={idx}
          points={pts}
          color={FORGE_COLORS.accentCyan}
          lineWidth={isMobile ? 1.4 : 2.0}
          transparent
          opacity={baseOpacity * drawT}
        />
      ))}
    </group>
  );
}
