import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Material } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";
import { SCENE01_COLORS, PERF_DEBUG } from "../../constants/scene01Config";
import { SystemBootMotionState } from "./systemBootMotion";
import { pointerInfluence } from "../../interaction/usePointerInfluence";

interface SystemBootKernelProps {
  motion: SystemBootMotionState;
}

export function SystemBootKernel({ motion }: SystemBootKernelProps) {
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const scanRingRef = useRef<Mesh>(null);
  
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const localProgress = usePortfolioStore((state) => state.sceneLocalProgress);

  useFrame((state) => {
    if (localProgress >= 1.0) return;
    const elapsed = state.clock.getElapsedTime();
    
    // 1. Core scale and pulsation calculations
    if (coreRef.current) {
      // Dormant seed scale: starts at 0.02
      let targetScale = 0.02;
      
      // Grows to 0.06 during firstPulse
      targetScale += motion.firstPulse * 0.04;
      
      // Stabilizes and grows to final core scale of 0.15
      targetScale += motion.coreStabilize * 0.09;
      
      // Aggressive portal open expansion (up to 1.35)
      // During kernelAbsorb: core swells slightly as it receives fragments
      const portalScale = targetScale + motion.portalOpen * 1.2 + motion.kernelAbsorb * 0.18;
      
      const pulseSpeed = motion.portalOpen > 0.1 ? 6 : 2;
      const pulseFactor = 1.0 + Math.sin(elapsed * pulseSpeed) * (0.04 + motion.portalOpen * 0.06);
      
      // Morph: let kernel stay alive through absorption, then compress at enterSystem
      const finalCoreScale = portalScale * pulseFactor * (1.0 - motion.enterSystem * 0.85);
      coreRef.current.scale.setScalar(finalCoreScale);
      coreRef.current.rotation.y = elapsed * 0.15;

      // Mouse parallax depth response
      coreRef.current.position.set(
        pointerInfluence.smoothX * 0.05,
        -pointerInfluence.smoothY * 0.05,
        0
      );
    }

    // 2. Outer shell scale and rotation (builds during Phase 3 - shellFormation)
    if (shellRef.current) {
      // Dormant/Pulse: scale is 0. Grows progressively during shellFormation
      const targetShellScale = motion.shellFormation * 0.32; // base size 0.32

      const portalScale = targetShellScale + motion.portalOpen * 1.1;
      
      // Shell shrinks during enterSystem (not during earlier ingestion)
      const finalShellScale = portalScale * (1.0 - motion.enterSystem * 0.9);
      // Vertical assembly extrusion (Y-axis traces in from flat to round)
      if (reducedMotion) {
        shellRef.current.scale.setScalar(finalShellScale);
      } else {
        const buildHeight = motion.shellFormation;
        shellRef.current.scale.set(finalShellScale, finalShellScale * buildHeight, finalShellScale);
      }

      // Elevated spin speed during formation phase (slowed by 50%)
      const spinSpeed = 0.1 + (1.0 - motion.coreStabilize) * 0.3;
      shellRef.current.rotation.y = -elapsed * spinSpeed;
      shellRef.current.rotation.x = elapsed * 0.05;

      // Mouse parallax depth response
      shellRef.current.position.set(
        pointerInfluence.smoothX * 0.08,
        -pointerInfluence.smoothY * 0.08,
        0
      );
    }

    // 3. Scan ring expansion (triggers during firstPulse wake)
    if (scanRingRef.current) {
      const expandProgress = motion.firstPulse;
      const scale = expandProgress * 4.0;
      scanRingRef.current.scale.setScalar(scale);

      const mat = scanRingRef.current.material as Material;
      if (mat) {
        // Pulse once and fade out
        const opacity = Math.max(0, Math.sin(expandProgress * Math.PI) * 0.6);
        mat.opacity = opacity * (1.0 - motion.systemLock) * (1.0 - motion.enterSystem);
      }
    }
  });

  // Base opacity fade: low during dormant seed, increases through pulses/assembly
  const baseOpacity = 0.15 + motion.firstPulse * 0.15 + motion.coreStabilize * 0.7 * (1.0 - motion.enterSystem);

  // Shell opacity: only visible after shell formation starts
  const shellOpacity = baseOpacity * motion.shellFormation * 0.45 * (1.0 - motion.enterSystem * 0.9);

  // Emissive intensity spikes during firstPulse and portalOpen
  // kernelAbsorb adds a subtle brightness surge as fragments collapse into the core
  const emissivePulsePeak = Math.sin(motion.firstPulse * Math.PI) * 1.5;
  const coreEmissive = (0.12 + emissivePulsePeak + motion.coreStabilize * 0.68 + motion.portalOpen * 3.5 + motion.kernelAbsorb * 2.2) * (1.0 - motion.enterSystem * 0.85);

  // Unmount after enterSystem fully compresses the kernel
  if (localProgress >= 1.0) {
    return null;
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Outer rotating technical shell (assembles in Phase 3) */}
      {motion.shellFormation > 0.01 && !PERF_DEBUG.disableKernelShell && (
        <mesh ref={shellRef} renderOrder={10}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color={SCENE01_COLORS.softCyan}
            emissive={SCENE01_COLORS.accentCyan}
            emissiveIntensity={0.3 + motion.coreStabilize * 0.7}
            wireframe
            transparent
            opacity={shellOpacity}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Dark metallic inner core orb (dormant seed to stabilized core) */}
      <mesh ref={coreRef} renderOrder={12}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={SCENE01_COLORS.background}
          roughness={0.1}
          metalness={0.9}
          emissive={SCENE01_COLORS.accentCyan}
          emissiveIntensity={coreEmissive}
          transparent
          opacity={baseOpacity * (0.8 + motion.portalOpen * 0.2)}
          depthWrite={false}
        />
      </mesh>

      {/* Expanding wake scan ring */}
      <mesh ref={scanRingRef} rotation={[Math.PI / 2, 0, 0]} renderOrder={11}>
        <ringGeometry args={[0.98, 1.0, 64]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.accentCyan}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Glow light source */}
      <pointLight
        position={[0, 0, 0]}
        intensity={(0.1 + motion.firstPulse * 1.5 + motion.coreStabilize * 1.2 + motion.portalOpen * 4.5 + motion.kernelAbsorb * 1.8) * (1.0 - motion.enterSystem * 0.85)}
        distance={5}
        color={SCENE01_COLORS.softCyan}
      />
    </group>
  );
}
