'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MathUtils, Color, MeshStandardMaterial } from 'three';
import { useScrollState } from '../../context/ScrollStateContext';

interface TargetMeshState {
  scale: number;
  color: string;
  rotationYMultiplier: number;
}

export const ProjectMonolithMesh: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const coreMeshRef = useRef<Mesh>(null);
  const outerSkeletonRef = useRef<Mesh>(null);

  const { progressRef } = useScrollState();

  // Initialize heavy Color pointer objects natively inside cache memories to avoid RAM pooling allocations
  const cachedColorInstances = useMemo(() => ({
    cyan: new Color('#00e5ff'),
    white: new Color('#f4f5f6'),
    graphite: new Color('#9097a2'),
    gold: new Color('#ffd700'),
    runtimeTemp: new Color()
  }), []);

  useFrame((state) => {
    if (!groupRef.current || !coreMeshRef.current || !outerSkeletonRef.current) return;

    const progress = progressRef.current;

    // Calculate projects section visibility dynamically inside useFrame loop
    let opacity = 0;
    if (progress >= 0.65 && progress <= 0.85) {
      if (progress === 0.75) {
        opacity = 1;
      } else if (progress < 0.75) {
        opacity = (progress - 0.65) / 0.10;
      } else {
        opacity = 1 - (progress - 0.75) / 0.10;
      }
    }
    const isVisible = opacity > 0.01;

    // 1. Performance Shield Gate: Instantly freeze WebGL updates when section travels off-screen
    if (!isVisible) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // 2. Establish absolute boundaries mapping Section 05 scroll track boundaries
    const sectionStart = 0.65;
    const sectionEnd = 0.85;
    const clampedProgress = MathUtils.clamp(progress, sectionStart, sectionEnd);

    // 3. Granular State Parsing Machine: Compute target dimensions depending on active project window sub-tracks
    let targetState: TargetMeshState = { scale: 1.4, color: '#00e5ff', rotationYMultiplier: 1.0 };

    if (clampedProgress >= 0.65 && clampedProgress < 0.70) {
      // Sub-Track 01: Enactus Portal v4.0 Context
      const subFactor = (clampedProgress - 0.65) / 0.05;
      targetState.scale = MathUtils.lerp(1.4, 1.1, subFactor);
      targetState.rotationYMultiplier = MathUtils.lerp(1.0, 2.5, subFactor);
      cachedColorInstances.runtimeTemp.copy(cachedColorInstances.cyan).lerp(cachedColorInstances.white, subFactor);
    } 
    else if (clampedProgress >= 0.70 && clampedProgress < 0.75) {
      // Sub-Track 02: AI Job Board Platform Context
      const subFactor = (clampedProgress - 0.70) / 0.05;
      targetState.scale = MathUtils.lerp(1.1, 1.25, subFactor);
      targetState.rotationYMultiplier = MathUtils.lerp(2.5, 1.2, subFactor);
      cachedColorInstances.runtimeTemp.copy(cachedColorInstances.white).lerp(cachedColorInstances.graphite, subFactor);
    } 
    else if (clampedProgress >= 0.75 && clampedProgress < 0.80) {
      // Sub-Track 03: GDG Real Estate Module Context
      const subFactor = (clampedProgress - 0.75) / 0.05;
      targetState.scale = MathUtils.lerp(1.25, 1.5, subFactor);
      targetState.rotationYMultiplier = MathUtils.lerp(1.2, 4.0, subFactor);
      cachedColorInstances.runtimeTemp.copy(cachedColorInstances.graphite).lerp(cachedColorInstances.gold, subFactor);
    } 
    else {
      // Sub-Track 04: Lawyer Static Showcase Context
      const subFactor = MathUtils.clamp((clampedProgress - 0.80) / 0.05, 0, 1);
      targetState.scale = MathUtils.lerp(1.5, 1.6, subFactor);
      targetState.rotationYMultiplier = MathUtils.lerp(4.0, 0.5, subFactor);
      cachedColorInstances.runtimeTemp.copy(cachedColorInstances.gold);
    }

    // 4. Smooth Lerping Engine: Apply high-frequency delta modifiers (0.1) to suppress script jitter
    const currentGroup = groupRef.current;
    currentGroup.scale.setScalar(MathUtils.lerp(currentGroup.scale.x, targetState.scale, 0.1));

    // 5. Apply fluid multi-axis rotational kinetic sweeps to simulate operational product engines
    const clockTime = state.clock.getElapsedTime();
    currentGroup.rotation.y = clockTime * 0.2 * targetState.rotationYMultiplier;
    currentGroup.rotation.x = Math.sin(clockTime * 0.5) * 0.15;

    // 6. Native Color Swapping Matrix: Dynamically morph outer wireframe materials parameters cleanly
    const skeletonMaterial = outerSkeletonRef.current.material as MeshStandardMaterial;
    skeletonMaterial.color.lerp(cachedColorInstances.runtimeTemp, 0.1);
    skeletonMaterial.opacity = opacity * 0.8;

    const coreMaterial = coreMeshRef.current.material as MeshStandardMaterial;
    coreMaterial.opacity = opacity * 0.9;
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.2, 0]} // Centered horizontally to track camera fly-through axis
    >
      
      {/* Internal Monolith Core Base Solid Structure Mesh Layer */}
      <mesh ref={coreMeshRef}>
        <cylinderGeometry args={[0.6, 0.6, 1.8, 6]} />
        <meshStandardMaterial 
          color="#16181c" // Solid Matte Charcoal Graphite Surface Token
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0}
        />
      </mesh>

      {/* External Asymmetric Wireframe Technical Protective Skeleton Overlay */}
      <mesh ref={outerSkeletonRef}>
        <cylinderGeometry args={[0.64, 0.64, 1.84, 6]} />
        <meshStandardMaterial 
          color="#00e5ff"
          roughness={0.4}
          metalness={0.5}
          transparent
          opacity={0}
          wireframe
        />
      </mesh>

    </group>
  );
};
