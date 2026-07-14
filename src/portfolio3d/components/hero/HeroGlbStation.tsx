// src/portfolio3d/components/hero/HeroGlbStation.tsx
// Optimized reusable GLB capability docking station for Scene 02 modules
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { HERO_MODELS } from "../../assets/modelPreload";
import { Material, Mesh, MeshStandardMaterial } from "three";

interface HeroGlbStationProps {
  position: [number, number, number];
  color: string;
  nodeOpacity: number;
  pulseOpacity: number;
  pulseScale: number;
  isBusArrived: boolean;
}

export function HeroGlbStation({
  position,
  color,
  nodeOpacity,
  pulseOpacity,
  pulseScale,
  isBusArrived,
}: HeroGlbStationProps) {
  const { scene } = useGLTF(HERO_MODELS.CAPABILITY_STATION);

  // Memoize cloned scene and apply module-specific accent color
  const clonedStation = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          const mat = (mesh.material as Material).clone() as MeshStandardMaterial;
          mat.transparent = true;
          mat.color.set(color);
          mat.emissive.set(color);
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene, color]);

  // Update opacity and emissive intensity based on bus arrival
  clonedStation.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (mesh.material) {
        const mat = mesh.material as MeshStandardMaterial;
        mat.opacity = nodeOpacity;
        mat.emissiveIntensity = isBusArrived ? 0.8 : 0.15;
      }
    }
  });

  return (
    <group position={position}>
      {/* Single Online Status Pulse Halo Ring during arrival transition */}
      {pulseOpacity > 0.01 && (
        <mesh
          scale={[pulseScale, pulseScale, pulseScale]}
          rotation={[Math.PI / 2, 0, 0]}
          renderOrder={19}
        >
          <ringGeometry args={[0.14, 0.18, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={nodeOpacity * pulseOpacity}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Optimized GLB Capability Station Dock */}
      <primitive object={clonedStation} />
    </group>
  );
}

useGLTF.preload(HERO_MODELS.CAPABILITY_STATION);
