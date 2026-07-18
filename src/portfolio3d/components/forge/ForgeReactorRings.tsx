import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { FORGE_COLORS } from "../../constants/scene03Config";

interface ForgeReactorRingsProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

function generateRingPoints(
  radiusX: number,
  radiusY: number,
  tiltX = 0,
  tiltY = 0,
  tiltZ = 0,
  segments = 48
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const rotX = (tiltX * Math.PI) / 180;
  const rotY = (tiltY * Math.PI) / 180;
  const rotZ = (tiltZ * Math.PI) / 180;

  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const rx = radiusX * Math.cos(theta);
    const ry = radiusY * Math.sin(theta);

    const x1 = rx;
    const y1 = ry * cosX;
    const z1 = ry * sinX;

    const x2 = x1 * cosY + z1 * sinY;
    const y2 = y1;
    const z2 = -x1 * sinY + z1 * cosY;

    const x3 = x2 * cosZ - y2 * sinZ;
    const y3 = x2 * sinZ + y2 * cosZ;
    const z3 = z2;

    points.push([x3, y3, z3]);
  }
  return points;
}

/**
 * ForgeReactorRings.tsx — Concentric Reactor Rings Assembly (FORGE-02)
 *
 * 3 concentric machinery guide rings framing the System Forge Core.
 * Ring 1 wakes at 0.20 - 0.30, Ring 2 at 0.28 - 0.38, Ring 3 at 0.34 - 0.42.
 */
export function ForgeReactorRings({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ForgeReactorRingsProps) {
  const ringsGroupRef = useRef<THREE.Group>(null);

  // Concentric ring parametric point definitions
  const ring1Points = useMemo(
    () => generateRingPoints(isMobile ? 0.45 : 0.60, isMobile ? 0.85 : 0.60, 15, 10, 0),
    [isMobile]
  );
  const ring2Points = useMemo(
    () => generateRingPoints(isMobile ? 0.75 : 1.05, isMobile ? 1.35 : 1.05, -25, 20, 35),
    [isMobile]
  );
  const ring3Points = useMemo(
    () => generateRingPoints(isMobile ? 1.05 : 1.50, isMobile ? 1.85 : 1.50, 35, -25, -45),
    [isMobile]
  );

  // Wake progression bounds
  const wake1 = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.20) / 0.10));
  const wake2 = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.28) / 0.10));
  const wake3 = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.34) / 0.08));

  useFrame((state) => {
    if (reducedMotion || localProgress <= 0.0 || !ringsGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    ringsGroupRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
  });

  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  const baseOpacity = opacity * 0.85;

  return (
    <group ref={ringsGroupRef}>
      {/* Ring 1 — Inner Assembly Guide */}
      {wake1 > 0.01 && (
        <Line
          points={ring1Points.slice(0, Math.max(2, Math.floor(wake1 * ring1Points.length)))}
          color={FORGE_COLORS.accentCyan}
          lineWidth={isMobile ? 1.8 : 2.6}
          transparent
          opacity={baseOpacity * 0.75 * wake1}
        />
      )}

      {/* Ring 2 — Mid Reactor Ring */}
      {wake2 > 0.01 && (
        <Line
          points={ring2Points.slice(0, Math.max(2, Math.floor(wake2 * ring2Points.length)))}
          color={FORGE_COLORS.accentBlue}
          lineWidth={isMobile ? 1.6 : 2.2}
          transparent
          opacity={baseOpacity * 0.65 * wake2}
        />
      )}

      {/* Ring 3 — Outer Structural Chamber Ring */}
      {wake3 > 0.01 && (
        <Line
          points={ring3Points.slice(0, Math.max(2, Math.floor(wake3 * ring3Points.length)))}
          color={FORGE_COLORS.chamberRing}
          lineWidth={isMobile ? 1.4 : 1.8}
          transparent
          opacity={baseOpacity * 0.45 * wake3}
        />
      )}
    </group>
  );
}
