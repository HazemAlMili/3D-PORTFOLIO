'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils, Mesh, MeshStandardMaterial } from 'three';
import { useScrollState } from '../../context/ScrollStateContext';

interface PlateData {
  id: number;
  color: string;
  wireframe: boolean;
  scaleX: number;
}

const platesRegistry: PlateData[] = [
  { id: 4, color: '#00e5ff', wireframe: true, scaleX: 2.2 },   // Base Layer: Deployment Infrastructure (Accent Wire)
  { id: 3, color: '#16181c', wireframe: false, scaleX: 2.1 },  // Relational Database Core Panel
  { id: 2, color: '#16181c', wireframe: false, scaleX: 2.0 },  // API Path Configurations Panel
  { id: 1, color: '#f4f5f6', wireframe: false, scaleX: 1.9 }   // Top Layer: Frontend Component Matrix
];

export const ArchitecturePlatesMesh: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const { progressRef } = useScrollState();

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = progressRef.current;

    // Calculate process section visibility dynamically inside useFrame loop
    let opacity = 0;
    if (progress >= 0.40 && progress <= 0.65) {
      if (progress === 0.50) {
        opacity = 1;
      } else if (progress < 0.50) {
        opacity = (progress - 0.40) / 0.10;
      } else {
        opacity = 1 - (progress - 0.50) / 0.15;
      }
    }
    const isVisible = opacity > 0.01;

    // 1. Performance Shield: Freeze layout ticks instantly if section sits outside viewport windows
    if (!isVisible) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // 2. Establish architectural boundaries mapping the localized Section 04 scroll track window
    const windowStart = 0.40;
    const windowEnd = 0.65;
    const clampedProgress = MathUtils.clamp(progress, windowStart, windowEnd);
    
    // Normalize scroll metrics inside this specific window to a clean [0, 1] factor scale
    const windowNormalizedFactor = (clampedProgress - windowStart) / (windowEnd - windowStart);

    // 3. Mathematical Lerp: Compute target vertical spacing multiplier (Exploded View Offset)
    const targetVerticalSpacing = MathUtils.lerp(0.15, 0.85, windowNormalizedFactor);

    // 4. Update individual children panel position coordinates natively inside the WebGL tree
    const plateChildren = groupRef.current.children;
    platesRegistry.forEach((_, index) => {
      const plateMesh = plateChildren[index] as Mesh;
      if (plateMesh) {
        // Space panels symmetrically along the Y axis centered around the zero coordinate anchor
        const verticalTargetY = (index - (platesRegistry.length - 1) * 0.5) * targetVerticalSpacing;
        
        // Apply high-frequency frame delta smoothing (0.1) to achieve fluid kinetic movement
        plateMesh.position.y = MathUtils.lerp(plateMesh.position.y, verticalTargetY, 0.1);

        // Update material opacity dynamically on each frame to support visual fade sweeps
        const material = plateMesh.material as MeshStandardMaterial;
        material.opacity = opacity;
      }
    });

    // 5. Apply persistent, low-speed isometric rotation sweep to reveal structural depth profiles
    groupRef.current.rotation.y = (Math.PI / 4) + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.05;
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.5, 0]} // Centered horizontally to track camera fly-through axis
      rotation={[Math.PI / 6, Math.PI / 4, 0]} // Locked programmatic isometric focal angle projection
    >
      {platesRegistry.map((plate) => (
        <mesh key={plate.id} position={[0, 0, 0]}>
          {/* Flat rectangular box structure serving as the technical stack architectural layer canvas */}
          <boxGeometry args={[plate.scaleX, 0.06, 1.2]} />
          <meshStandardMaterial
            color={plate.color}
            roughness={0.65}
            metalness={0.3}
            transparent
            opacity={0}
            wireframe={plate.wireframe}
          />
        </mesh>
      ))}
    </group>
  );
};
