'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MathUtils } from 'three';
import { useMotionTimeline } from '../../hooks/useMotionTimeline';

interface TunnelSegment {
  id: number;
  positionZ: number;
  scaleFactor: number;
}

export const CinematicTunnel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const motionTimeline = useMotionTimeline(false);

  const ringsCount = 15;

  // Cache baseline segment matrices statically to secure 0ms RAM compilation runs
  const tunnelSegmentsRegistry = useMemo(() => {
    const registry: TunnelSegment[] = [];
    for (let i = 0; i < ringsCount; i++) {
      registry.push({
        id: i,
        positionZ: (i - ringsCount * 0.5) * 1.5,
        scaleFactor: MathUtils.randFloat(0.9, 1.1)
      });
    }
    return registry;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const { scrollVelocity, activeLayerAlpha } = motionTimeline;
    const currentGroup = groupRef.current;
    const elapsedTime = state.clock.getElapsedTime();
    const childrenMeshes = currentGroup.children;

    // 1. Continuous structural torque twist loop accelerated via active scroll speeds
    const angularVelocity = 0.05 + Math.abs(scrollVelocity) * 0.15;
    currentGroup.rotation.z = elapsedTime * angularVelocity;

    // 2. Compute dynamic vertex expansion parameters (Breathing grid animation)
    tunnelSegmentsRegistry.forEach((segment, idx) => {
      const ringMesh = childrenMeshes[idx] as Mesh;
      if (ringMesh) {
        // Apply interactive micro-vibration scales straight into ring wire geometry parameters
        const waveModulation = Math.sin(elapsedTime * 2.0 + idx * 0.5) * 0.04;
        const targetScale = segment.scaleFactor + waveModulation + (Math.abs(scrollVelocity) * 0.1);
        
        ringMesh.scale.set(targetScale, targetScale, 1.0);

        // Also update material opacity dynamically on each frame to support visual fade sweeps
        if (ringMesh.material) {
          const material = ringMesh.material as any;
          material.opacity = activeLayerAlpha * 0.4;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {tunnelSegmentsRegistry.map((segment, idx) => (
        <mesh 
          key={segment.id} 
          position={[0, 0, (idx - ringsCount * 0.5) * 1.5]}
        >
          {/* Hexagonal structural tech ring wireframes surrounding the central camera track axis */}
          <cylinderGeometry args={[2.5, 2.5, 0.08, 6, 1, true]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#00e5ff' : '#242830'} // Alternate Cyan vector signals with charcoal wires
            wireframe
            transparent
            opacity={0.4}
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};
