import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";
import { SCENE01_COLORS, PERF_DEBUG } from "../../constants/scene01Config";
import { SystemBootMotionState } from "./systemBootMotion";
import { pointerInfluence } from "../../interaction/usePointerInfluence";

interface SystemBootPortalProps {
  motion: SystemBootMotionState;
}

export function SystemBootPortal({ motion }: SystemBootPortalProps) {
  const groupRef = useRef<Group>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);

  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  useFrame((state) => {
    if (PERF_DEBUG.disablePortal) return;
    if (reducedMotion) return;
    const elapsed = state.clock.getElapsedTime();

    // Spin portal rings in opposite directions (slowed by 50%)
    if (ring1Ref.current) ring1Ref.current.rotation.z = elapsed * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -elapsed * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.z = elapsed * 0.6;

    // Apply global mouse parallax to portal group
    if (groupRef.current) {
      groupRef.current.position.set(
        pointerInfluence.smoothX * 0.1,
        -pointerInfluence.smoothY * 0.1,
        0
      );
    }
  });

  if (PERF_DEBUG.disablePortal) return null;

  // Base portal radius: starts at 0, grows to 1.35
  const baseRadius = motion.portalOpen * 1.35;

  // During enterSystem, scale the rings UP gently so the camera passes through
  const enterScale = 1.0 + motion.enterSystem * 4.0;

  const opacity = motion.portalOpen * (1.0 - motion.enterSystem);

  if (opacity <= 0.005) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[enterScale, enterScale, enterScale]}>
      {/* Outer Ring */}
      <mesh ref={ring1Ref} position={[0, 0, 0.05]} renderOrder={60}>
        <ringGeometry args={[baseRadius * 0.96, baseRadius * 1.0, 64]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.accentCyan}
          transparent
          opacity={opacity * 0.8}
          depthWrite={false}
        />
      </mesh>

      {/* Middle Stardust Ring */}
      <mesh ref={ring2Ref} position={[0, 0, 0]} renderOrder={60}>
        <ringGeometry args={[baseRadius * 0.92, baseRadius * 0.95, 48]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.deepBlue}
          transparent
          opacity={opacity * 0.5}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Concentric Ring */}
      <mesh ref={ring3Ref} position={[0, 0, -0.05]} renderOrder={60}>
        <ringGeometry args={[baseRadius * 0.85, baseRadius * 0.88, 32]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.softCyan}
          transparent
          opacity={opacity * 0.7}
          depthWrite={false}
        />
      </mesh>

      {/* Portal Core Light Tunnel Effect (Semi-transparent backing cylinders) */}
      <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]} renderOrder={55}>
        <cylinderGeometry args={[baseRadius * 0.85, baseRadius * 0.8, 0.4, 32, 1, true]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.accentCyan}
          transparent
          opacity={opacity * 0.15 * (1.0 - motion.enterSystem)}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
