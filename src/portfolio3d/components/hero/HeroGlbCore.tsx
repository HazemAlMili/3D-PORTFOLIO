// src/portfolio3d/components/hero/HeroGlbCore.tsx
// Optimized GLB Command Core Hub for Scene 02
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { HERO_MODELS } from "../../assets/modelPreload";
import { SCENE_02_COLORS } from "../../constants/scene02Config";
import { Group, Material, Mesh, MeshStandardMaterial } from "three";

interface HeroGlbCoreProps {
  nodeBuild: number;
  coreOpacity: number;
  systemCompleteProgress?: number;
  reducedMotion?: boolean;
}

export function HeroGlbCore({
  nodeBuild,
  coreOpacity,
  systemCompleteProgress = 0,
  reducedMotion = false,
}: HeroGlbCoreProps) {
  const coreRef = useRef<Group>(null);
  const { scene } = useGLTF(HERO_MODELS.COMMAND_CORE);

  // Memoize cloned scene and setup materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          const mat = (mesh.material as Material).clone() as MeshStandardMaterial;
          mat.transparent = true;
          mat.emissive.set(SCENE_02_COLORS.coreGlow);
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  // Update dynamic material opacity and emissive glow safely per render
  clonedScene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (mesh.material) {
        const mat = mesh.material as MeshStandardMaterial;
        mat.opacity = coreOpacity;
        mat.emissiveIntensity = (0.3 + nodeBuild * 0.7) * coreOpacity;
      }
    }
  });

  useFrame((state) => {
    if (reducedMotion || !coreRef.current) return;
    coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
  });

  const confirmPulse = Math.sin(systemCompleteProgress * Math.PI) * 0.15;
  const scaleVal = reducedMotion ? 1.0 : 0.85 + nodeBuild * 0.15 + confirmPulse;

  return (
    <group ref={coreRef} position={[0, -0.2, 0]} scale={[scaleVal, scaleVal, scaleVal]}>
      <primitive object={clonedScene} />
      <pointLight
        position={[0, 0, 0]}
        intensity={coreOpacity * 2.2}
        distance={4}
        color={SCENE_02_COLORS.accentCyan}
      />
    </group>
  );
}

useGLTF.preload(HERO_MODELS.COMMAND_CORE);
