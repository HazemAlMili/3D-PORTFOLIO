import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, PointLight } from "three";
import { SCENE_02_COLORS } from "../../constants/scene02Config";
import { pointerInfluence } from "../../interaction/usePointerInfluence";
import { isMobileDevice } from "../../utils/mobileUtils";

const IS_MOBILE = isMobileDevice();

interface HeroAtomicCoreProps {
  nodeBuild: number;
  coreOpacity: number;
  systemCompleteProgress?: number;
  reducedMotion?: boolean;
}

export function HeroAtomicCore({
  nodeBuild,
  coreOpacity,
  systemCompleteProgress = 0,
  reducedMotion = false,
}: HeroAtomicCoreProps) {
  const groupRef = useRef<Group>(null);
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.y = elapsed * 0.15 + pointerInfluence.smoothX * 0.08;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.05 + pointerInfluence.smoothY * 0.04;
    
    if (lightRef.current) {
      lightRef.current.position.set(
        pointerInfluence.smoothX * 0.25,
        -pointerInfluence.smoothY * 0.25,
        0.1
      );
    }
  });

  const confirmPulse = Math.sin(systemCompleteProgress * Math.PI) * 0.18;
  // Mobile: boost scale 1.3x so core is visually dominant as the scene anchor
  const mobileScaleBoost = IS_MOBILE ? 1.3 : 1.0;
  const scaleVal = (reducedMotion ? 1.0 : 0.88 + nodeBuild * 0.12 + confirmPulse) * 1.75 * mobileScaleBoost;

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[scaleVal, scaleVal, scaleVal]}
    >
      {/* Central Core Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.accentCyan}
          emissive={SCENE_02_COLORS.coreGlow}
          emissiveIntensity={(IS_MOBILE ? 1.5 : 1.0) * coreOpacity}
          transparent
          opacity={coreOpacity}
          roughness={0.2}
        />
      </mesh>

      {/* Clustered Protons / Neutrons */}
      <mesh position={[0.16, 0.1, 0.08]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.accentCyan}
          emissive={SCENE_02_COLORS.accentCyan}
          emissiveIntensity={0.65 * coreOpacity}
          transparent
          opacity={coreOpacity * 0.95}
        />
      </mesh>

      <mesh position={[-0.15, 0.12, -0.08]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#FFE866"
          emissive="#FFBA00"
          emissiveIntensity={0.7 * coreOpacity}
          transparent
          opacity={coreOpacity * 0.95}
        />
      </mesh>

      <mesh position={[0.1, -0.15, 0.12]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.accentBlue}
          emissive={SCENE_02_COLORS.accentBlue}
          emissiveIntensity={0.8 * coreOpacity}
          transparent
          opacity={coreOpacity * 0.95}
        />
      </mesh>

      <mesh position={[-0.13, -0.12, 0.08]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.accentCyan}
          emissive={SCENE_02_COLORS.accentCyan}
          emissiveIntensity={0.65 * coreOpacity}
          transparent
          opacity={coreOpacity * 0.95}
        />
      </mesh>

      <mesh position={[0.0, 0.18, -0.12]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#FFE866"
          emissive="#FFBA00"
          emissiveIntensity={0.65 * coreOpacity}
          transparent
          opacity={coreOpacity * 0.95}
        />
      </mesh>

      {/* Core illumination light */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={coreOpacity * 2.8}
        distance={4.5}
        color={SCENE_02_COLORS.accentCyan}
      />
    </group>
  );
}
