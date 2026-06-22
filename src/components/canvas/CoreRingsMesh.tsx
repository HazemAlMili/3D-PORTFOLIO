'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MathUtils, MeshStandardMaterial } from 'three';
import { useScrollState } from '../../context/ScrollStateContext';

export const CoreRingsMesh: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const outerRingRef = useRef<Mesh>(null);
  const innerRingRef = useRef<Mesh>(null);

  const { progressRef } = useScrollState();

  useFrame((state, delta) => {
    // 1. Structural Protection: Prevent calculation overflows if layers unmount
    if (!groupRef.current || !outerRingRef.current || !innerRingRef.current) return;

    const progress = progressRef.current;

    // Calculate rotation speed dynamically based on scroll progression
    let rotationSpeed = 0.2;
    if (progress < 0.25) {
      rotationSpeed = MathUtils.lerp(0.2, 0.8, progress / 0.25);
    } else {
      rotationSpeed = MathUtils.lerp(0.8, 1.5, (progress - 0.25) / 0.75);
    }
    const currentRotationDelta = delta * rotationSpeed;

    // Calculate concentric rings opacity dynamically
    let opacity = 1.0;
    if (progress > 0.25) {
      opacity = Math.max(0, 1.0 - (progress - 0.25) / 0.15);
    }

    // 2. Apply opposing multi-axis rotation sweeps
    outerRingRef.current.rotation.x += currentRotationDelta;
    outerRingRef.current.rotation.y += currentRotationDelta * 0.5;

    innerRingRef.current.rotation.y -= currentRotationDelta * 1.5;
    innerRingRef.current.rotation.z += currentRotationDelta;

    // Update material opacity dynamically on each frame to support visual fade sweeps
    const outerMaterial = outerRingRef.current.material as MeshStandardMaterial;
    outerMaterial.opacity = opacity;

    const innerMaterial = innerRingRef.current.material as MeshStandardMaterial;
    innerMaterial.opacity = opacity * 0.8;

    // 3. Subtle ambient hover breathing effect based on raw high-frequency clock timelines
    const clockTime = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(clockTime * 1.5) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* Primary Outer Concentric Ring Mesh Node */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.8, 0.04, 16, 100]} />
        <meshStandardMaterial 
          color="#16181c"
          roughness={0.75}
          metalness={0.2}
          transparent
          opacity={1.0}
          wireframe
        />
      </mesh>

      {/* Secondary Inner Asymmetric Ring Mesh Node */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 12, 80]} />
        <meshStandardMaterial 
          color="#00e5ff" // Accent Cyan vector highlight line
          roughness={0.5}
          metalness={0.4}
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>

    </group>
  );
};
