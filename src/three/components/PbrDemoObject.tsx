import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface PbrDemoObjectProps {
  position?: [number, number, number];
}

/**
 * Interactive PBR demonstration object verifying:
 * - High-performance delta-based animation inside `useFrame`
 * - Direct ref mutation without triggering React setState re-renders
 * - PBR material properties (`meshStandardMaterial` with metalness/roughness)
 */
export function PbrDemoObject({ position = [0, 0, 0] }: PbrDemoObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Use refs for interactive states to strictly avoid setState inside loops or rapid events
  const isHovered = useRef(false);
  const isClicked = useRef(false);

  // Target values lerped in useFrame
  const targetScale = useRef(1);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Base continuous rotation using delta time
    const rotationSpeedY = isHovered.current ? 1.2 : 0.45;
    const rotationSpeedX = isHovered.current ? 0.6 : 0.2;
    meshRef.current.rotation.y += delta * rotationSpeedY;
    meshRef.current.rotation.x += delta * rotationSpeedX;

    // Smoothly lerp scale based on interaction flags
    targetScale.current = isClicked.current ? 1.18 : isHovered.current ? 1.08 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
      Math.min(1, delta * 8)
    );

    // Smoothly lerp emissive intensity on hover
    if (materialRef.current) {
      const targetEmissive = isHovered.current ? 0.35 : 0.05;
      materialRef.current.emissiveIntensity += (targetEmissive - materialRef.current.emissiveIntensity) * Math.min(1, delta * 6);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          isHovered.current = true;
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          isHovered.current = false;
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'default';
          }
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          isClicked.current = !isClicked.current;
        }}
      >
        <torusKnotGeometry args={[1, 0.32, 128, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#12283a"
          emissive="#00e5ff"
          emissiveIntensity={0.05}
          metalness={0.88}
          roughness={0.18}
        />
      </mesh>
    </group>
  );
}
