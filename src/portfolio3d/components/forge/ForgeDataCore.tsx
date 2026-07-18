import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeDataCoreProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ForgeDataCore.tsx — Layer 5: DATA Core & Telemetry Stabilization (FORGE-04)
 *
 * Renders:
 * - A compact database-like cylinder cage (0.66 - 0.72)
 * - Concentric telemetry ring and data blips (0.72 - 0.80)
 */
export function ForgeDataCore({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeDataCoreProps) {
  const dataGroupRef = useRef<THREE.Group>(null);

  // Timing bounds
  const hubT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.66) / 0.06));

  const blipT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.72) / 0.08));

  const cylinderRadius = isMobile ? 0.16 : 0.24;
  const cylinderHeight = isMobile ? 0.30 : 0.40;

  // 1. Stacked database cylinder rings
  const ringAPoints = useMemo<[number, number, number][]>(() => {
    const points: [number, number, number][] = [];
    const count = 24;
    const y = -cylinderHeight / 2;
    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      points.push([cylinderRadius * Math.cos(theta), y, cylinderRadius * Math.sin(theta)]);
    }
    return points;
  }, [cylinderRadius, cylinderHeight]);

  const ringBPoints = useMemo<[number, number, number][]>(() => {
    const points: [number, number, number][] = [];
    const count = 24;
    const y = cylinderHeight / 2;
    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      points.push([cylinderRadius * Math.cos(theta), y, cylinderRadius * Math.sin(theta)]);
    }
    return points;
  }, [cylinderRadius, cylinderHeight]);

  // 2. Vertical connector bars to form the cylinder cage
  const verticalBars = useMemo<[number, number, number][][]>(() => {
    const bars: [number, number, number][][] = [];
    const h = cylinderHeight / 2;
    for (let i = 0; i < 4; i++) {
      const theta = (i / 4) * Math.PI * 2;
      const x = cylinderRadius * Math.cos(theta);
      const z = cylinderRadius * Math.sin(theta);
      bars.push([
        [x, -h, z],
        [x, h, z],
      ]);
    }
    return bars;
  }, [cylinderRadius, cylinderHeight]);

  // 3. Faint outer telemetry orbit path
  const telemetryRadiusX = isMobile ? 0.40 : 0.55;
  const telemetryRadiusY = isMobile ? 0.80 : 0.55;

  const telemetryPoints = useMemo<[number, number, number][]>(() => {
    const points: [number, number, number][] = [];
    const count = 32;
    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      points.push([telemetryRadiusX * Math.cos(theta), telemetryRadiusY * Math.sin(theta), 0]);
    }
    return points;
  }, [telemetryRadiusX, telemetryRadiusY]);

  // Data blips angles
  const blipAngles = useMemo<number[]>(() => [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5], []);

  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0 || !dataGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    dataGroupRef.current.rotation.y = t * 0.25;
  });

  if (localProgress <= 0.0 || opacity <= 0.01 || hubT <= 0.01) return null;

  const baseOpacity = opacity * (localProgress > 0.80 ? 0.40 : 0.90);
  const hubOpacity = baseOpacity * hubT;
  const blipsOpacity = baseOpacity * blipT;

  return (
    <group ref={dataGroupRef}>
      {/* Database Cylinder Rings */}
      <Line
        points={ringAPoints}
        color={FORGE_COLORS.accentBlue}
        lineWidth={isMobile ? 1.4 : 2.0}
        transparent
        opacity={hubOpacity * 0.75}
      />
      <Line
        points={ringBPoints}
        color={FORGE_COLORS.accentBlue}
        lineWidth={isMobile ? 1.4 : 2.0}
        transparent
        opacity={hubOpacity * 0.75}
      />

      {/* Database Cylinder Vertical Bars */}
      {verticalBars.map((pts, idx) => (
        <Line
          key={idx}
          points={pts}
          color={FORGE_COLORS.accentBlue}
          lineWidth={isMobile ? 1.2 : 1.6}
          transparent
          opacity={hubOpacity * 0.60}
        />
      ))}

      {/* Telemetry Ring */}
      {blipT > 0.01 && (
        <Line
          points={telemetryPoints}
          color={FORGE_COLORS.accentCyan}
          lineWidth={isMobile ? 1.0 : 1.5}
          transparent
          opacity={blipsOpacity * 0.50}
        />
      )}

      {/* Telemetry Data Blips */}
      {blipT > 0.01 &&
        blipAngles.map((angle, idx) => {
          const bx = telemetryRadiusX * Math.cos(angle);
          const by = telemetryRadiusY * Math.sin(angle);
          return (
            <mesh key={idx} position={[bx, by, 0]} renderOrder={33}>
              <sphereGeometry args={[0.032 * blipT, 12, 12]} />
              <meshBasicMaterial
                color={FORGE_COLORS.accentCyan}
                transparent
                opacity={blipsOpacity}
              />
            </mesh>
          );
        })}
    </group>
  );
}
