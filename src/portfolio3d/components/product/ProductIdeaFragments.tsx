import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";

interface ProductIdeaFragmentsProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

interface FragmentData {
  type: "glass" | "blueprint" | "code" | "node" | "bracket";
  settledPos: [number, number, number];
  scatterOffset: [number, number, number];
  assemblyPos: [number, number, number];
  assemblyRot: [number, number, number];
  size: [number, number]; // width, height or radius
  rotation: [number, number, number];
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function ProductIdeaFragments({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ProductIdeaFragmentsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Mesh>(null);

  // Spark animation: travels from Scene 02 direction towards product center
  const sparkActive = localProgress > 0.0 && localProgress <= 0.12 && !reducedMotion;
  const tSpark = sparkActive ? localProgress / 0.12 : 0;
  const sparkX = THREE.MathUtils.lerp(-1.6, 0.0, tSpark);
  const sparkY = THREE.MathUtils.lerp(1.2, 0.0, tSpark);
  const sparkZ = THREE.MathUtils.lerp(-0.8, 0.0, tSpark);

  // Ripple ignition ring: expands as the spark arrives
  const rippleActive = sparkActive && tSpark > 0.70;
  const tRipple = rippleActive ? (tSpark - 0.70) / 0.30 : 0;
  const rippleRadius = tRipple * 0.40;
  const rippleOpacity = (1 - tRipple) * 0.70;

  // Activation progress: 0.0 at p < 0.05, reaches 1.0 by p = 0.12
  const tActivation = reducedMotion
    ? 1.0
    : localProgress < 0.05
    ? 0.0
    : localProgress > 0.12
    ? 1.0
    : (localProgress - 0.05) / 0.07;

  // Assembly progress: 0.15 - 0.35 localProgress
  const tAssembly = reducedMotion
    ? 1.0
    : localProgress < 0.15
    ? 0.0
    : localProgress > 0.35
    ? 1.0
    : (localProgress - 0.15) / 0.20;

  const easedAssembly = easeInOutCubic(tAssembly);

  // Opacity window:
  //   - Entry: 0.05 -> 0.10 fade in
  //   - Assembly: 0.15 -> 0.44 full visibility
  //   - Pre-optimization (0.44 -> 0.68): drops to faint construction trace (0.14)
  //   - Optimization Wave Sweep (0.68 -> 0.78): sweeps remaining construction traces to 0.0
  const entryFade = reducedMotion ? 1.0 : localProgress < 0.05 ? 0.0 : Math.min(1, (localProgress - 0.05) / 0.05);

  let traceFade = 1.0;
  if (!reducedMotion) {
    if (localProgress < 0.52) {
      // REBASE-02: extended full-opacity from 0.44→0.52 to bridge the gap
      // between assembly completion and modules becoming clearly visible
      traceFade = 1.0;
    } else if (localProgress >= 0.52 && localProgress < 0.62) {
      // Step down to faint construction trace (shifted from 0.44–0.54 → 0.52–0.62)
      const t = (localProgress - 0.52) / 0.10;
      traceFade = 1.0 - t * 0.86; // 1.0 → 0.14
    } else if (localProgress >= 0.62 && localProgress < 0.68) {
      traceFade = 0.14;
    } else if (localProgress >= 0.68 && localProgress <= 0.78) {
      // Optimization wave cleans remaining construction traces away
      const t = (localProgress - 0.68) / 0.10;
      traceFade = (1.0 - t) * 0.14; // 0.14 → 0.0
    } else {
      traceFade = 0.0;
    }
  }

  const globalFade = opacity * entryFade * traceFade;

  // Seed fragments deterministically
  const fragmentCount = isMobile ? 10 : 22;
  const fragments = useMemo((): FragmentData[] => {
    const list: FragmentData[] = [];
    const types: FragmentData["type"][] = ["glass", "blueprint", "code", "node", "bracket"];

    const W  = isMobile ? 1.00 : 1.30;
    const H  = isMobile ? 0.58 : 0.74;
    const DZ = isMobile ? 0.06 : 0.10;
    const navRailX = -W * 0.45;

    for (let i = 0; i < fragmentCount; i++) {
      // Seed pseudo-random values based on index to be fully deterministic
      const sinVal = Math.sin(i * 453.2 + 12.3);
      const cosVal = Math.cos(i * 872.1 - 42.1);
      const rnd3 = Math.sin(i * 123.4 + 5.6);
      const type = types[Math.floor(Math.abs(sinVal) * types.length)];

      const spreadX = isMobile ? 1.0 : 1.6;
      const spreadY = isMobile ? 0.6 : 0.8;
      const spreadZ = isMobile ? 0.3 : 0.5;

      const settledX = cosVal * spreadX * 0.8;
      const settledY = sinVal * spreadY * 0.8;
      const settledZ = rnd3 * spreadZ * 0.8;

      const scatterOffset: [number, number, number] = [
        (cosVal + sinVal) * 1.5,
        (sinVal - cosVal) * 1.2,
        rnd3 * 1.5
      ];

      // Define target blueprint assembly position and rotation
      let assemblyPos: [number, number, number] = [0, 0, 0];
      let assemblyRot: [number, number, number] = [0, 0, 0];

      const role = i % 7;
      if (role === 0) {
        // Corner brackets / nodes (outer bounds)
        const signX = (i % 2 === 0) ? 1 : -1;
        const signY = (Math.floor(i / 2) % 2 === 0) ? 1 : -1;
        assemblyPos = [signX * W, signY * H, DZ * 0.3];
        if (type === "bracket") {
          const rotZ = (signX === 1)
            ? (signY === 1 ? Math.PI * 0.5 : Math.PI)
            : (signY === 1 ? 0 : -Math.PI * 0.5);
          assemblyRot = [0, 0, rotZ];
        }
      } else if (role === 1) {
        // Back corner anchors (depth)
        const signX = (i % 2 === 0) ? 1 : -1;
        const signY = (Math.floor(i / 2) % 2 === 0) ? 1 : -1;
        assemblyPos = [signX * W, signY * H, -DZ * 0.4];
      } else if (role === 2) {
        // Top plate edge
        const lerpX = ((i % 3) - 1) * W * 0.6;
        assemblyPos = [lerpX, H * 0.70, DZ * 0.2];
        if (type === "code" || type === "blueprint") {
          assemblyRot = [0, 0, 0];
        }
      } else if (role === 3) {
        // Navigation rail
        const lerpY = ((i % 3) - 1) * H * 0.6;
        assemblyPos = [navRailX, lerpY, DZ * 0.1];
        if (type === "code" || type === "blueprint") {
          assemblyRot = [0, 0, Math.PI * 0.5];
        }
      } else if (role === 4) {
        // Main content panels
        const cx = navRailX + (W - Math.abs(navRailX)) * 0.55;
        const cy = ((i % 2) - 0.5) * H * 0.45;
        assemblyPos = [cx + Math.sin(i) * 0.1, cy, -DZ * 0.1];
      } else if (role === 5) {
        // Status strip (bottom)
        const lerpX = ((i % 3) - 1) * W * 0.5;
        assemblyPos = [lerpX, -H + (isMobile ? 0.08 : 0.12), DZ * 0.2];
      } else {
        // Center hero feature block
        assemblyPos = [W * 0.15 + (i % 2) * 0.2, (i % 3 - 1) * 0.15, DZ * 0.4];
      }

      list.push({
        type,
        settledPos: [settledX, settledY, settledZ],
        scatterOffset,
        assemblyPos,
        assemblyRot,
        size: [0.15 + Math.abs(sinVal) * 0.25, 0.08 + Math.abs(cosVal) * 0.15],
        rotation: [sinVal * 0.4, cosVal * 0.4, rnd3 * 0.8]
      });
    }

    return list;
  }, [fragmentCount, isMobile]);

  // Subtle ambient floating motion
  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.02;
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.005;
  });

  if (globalFade <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {/* ── 1. Energy Ignition Spark (Scene 02 Continuity) ───────────── */}
      {sparkActive && (
        <group position={[sparkX, sparkY, sparkZ]}>
          <mesh ref={sparkRef} renderOrder={25}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentCyan}
              transparent
              opacity={globalFade * 0.95}
            />
          </mesh>
          {/* Spark trailing glow */}
          <mesh renderOrder={24}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentBlue}
              transparent
              opacity={globalFade * 0.40}
            />
          </mesh>
        </group>
      )}

      {/* Ripple ignition ring */}
      {rippleActive && (
        <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.2, 0, 0]} renderOrder={22}>
          <ringGeometry args={[rippleRadius * 0.8, rippleRadius, 32]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={globalFade * rippleOpacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* ── 2. Fragment Field (Chaos → Assembly) ─────────────────────── */}
      {fragments.map((frag, idx) => {
        // Calculate position: initial scatter -> chaos settled -> assembled blueprint
        const posX = THREE.MathUtils.lerp(
          frag.settledPos[0] + (1 - tActivation) * frag.scatterOffset[0],
          frag.assemblyPos[0],
          easedAssembly
        );
        const posY = THREE.MathUtils.lerp(
          frag.settledPos[1] + (1 - tActivation) * frag.scatterOffset[1],
          frag.assemblyPos[1],
          easedAssembly
        );
        const posZ = THREE.MathUtils.lerp(
          frag.settledPos[2] + (1 - tActivation) * frag.scatterOffset[2],
          frag.assemblyPos[2],
          easedAssembly
        );

        const rotX = THREE.MathUtils.lerp(frag.rotation[0], frag.assemblyRot[0], easedAssembly);
        const rotY = THREE.MathUtils.lerp(frag.rotation[1], frag.assemblyRot[1], easedAssembly);
        const rotZ = THREE.MathUtils.lerp(frag.rotation[2], frag.assemblyRot[2], easedAssembly);

        // Individual fragment opacity scaling during activation & assembly
        const fragOpacity = globalFade * (0.30 + easedAssembly * 0.45);

        return (
          <group
            key={idx}
            position={[posX, posY, posZ]}
            rotation={[rotX, rotY, rotZ]}
          >
            {frag.type === "glass" && (
              <mesh renderOrder={12}>
                <planeGeometry args={[frag.size[0], frag.size[1]]} />
                <meshStandardMaterial
                  color={PRODUCT_ENGINE_COLORS.chamberDepth}
                  emissive={PRODUCT_ENGINE_COLORS.accentCyan}
                  emissiveIntensity={0.03}
                  transparent
                  opacity={fragOpacity * 0.50}
                  roughness={0.1}
                  metalness={0.2}
                  depthWrite={false}
                />
              </mesh>
            )}

            {frag.type === "blueprint" && (
              <Line
                points={[
                  [-frag.size[0] * 0.5, -frag.size[1] * 0.5, 0],
                  [ frag.size[0] * 0.5, -frag.size[1] * 0.5, 0],
                  [ frag.size[0] * 0.5,  frag.size[1] * 0.5, 0],
                  [-frag.size[0] * 0.5,  frag.size[1] * 0.5, 0],
                  [-frag.size[0] * 0.5, -frag.size[1] * 0.5, 0],
                ]}
                color={PRODUCT_ENGINE_COLORS.accentCyan}
                lineWidth={0.8}
                transparent
                opacity={fragOpacity * 0.85}
              />
            )}

            {frag.type === "code" && (
              <Line
                points={[
                  [-frag.size[0] * 0.4, 0, 0],
                  [ frag.size[0] * 0.4, 0, 0],
                ]}
                color={PRODUCT_ENGINE_COLORS.accentBlue}
                lineWidth={1.0}
                transparent
                opacity={fragOpacity * 0.75}
              />
            )}

            {frag.type === "node" && (
              <mesh renderOrder={14}>
                <sphereGeometry args={[frag.size[0] * 0.15, 8, 8]} />
                <meshBasicMaterial
                  color={PRODUCT_ENGINE_COLORS.accentCyan}
                  transparent
                  opacity={fragOpacity * 0.90}
                />
              </mesh>
            )}

            {frag.type === "bracket" && (
              <Line
                points={[
                  [frag.size[0] * 0.4, 0, 0],
                  [0, 0, 0],
                  [0, frag.size[1] * 0.4, 0],
                ]}
                color={PRODUCT_ENGINE_COLORS.accentCyan}
                lineWidth={1.2}
                transparent
                opacity={fragOpacity * 0.95}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}
