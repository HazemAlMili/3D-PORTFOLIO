'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, MathUtils, Float32BufferAttribute } from 'three';
import { useScrollState } from '../../context/ScrollStateContext';

export const MicroNodeGridMesh: React.FC = () => {
  const pointsRef = useRef<Points>(null);
  const { progressRef } = useScrollState();

  const totalNodesCount = 60;

  // 1. Synthesize random node coordinate arrays securely within cached memory to prevent allocation leaks
  const nodesPositionArray = useMemo(() => {
    const positions = new Float32Array(totalNodesCount * 3);

    for (let i = 0; i < totalNodesCount; i++) {
      // Distribute points spherically inside a controlled dimensional grid bounding envelope
      positions[i * 3] = MathUtils.randFloatSpread(2.5);     // X coordinate sweep
      positions[i * 3 + 1] = MathUtils.randFloatSpread(2.5); // Y coordinate sweep
      positions[i * 3 + 2] = MathUtils.randFloatSpread(1.5); // Z coordinate sweep
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // 2. Defensive Performance Gate: Suppress calculations if layer moves outside operational windows
    // Encompasses Section 07 Stack Engine and Section 08 Workflow Timeline frames safely
    if (progressRef.current < 0.60 || progressRef.current > 0.92) {
      pointsRef.current.visible = false;
      return;
    }
    pointsRef.current.visible = true;

    const currentPointsMesh = pointsRef.current;
    const elapsedTime = state.clock.getElapsedTime();

    // 3. Continuous Low-Velocity Rotational Turbulence Wave execution
    currentPointsMesh.rotation.y = elapsedTime * 0.08;
    currentPointsMesh.rotation.x = Math.cos(elapsedTime * 0.04) * 0.05;

    // 4. Ingest raw global scroll progress parameters to drive dynamic scale pulse modulations
    // Maximizes structural density precisely at the center focal point of Section 07 (progress 0.78)
    const targetFocalPeak = 0.78;
    const scrollDeviationDistance = Math.abs(progressRef.current - targetFocalPeak);
    const pulseScaleFactor = Math.max(1 - scrollDeviationDistance * 4.0, 0.2);

    // Apply continuous fluid kinetic scaling limits to eliminate layout popping artifacts
    currentPointsMesh.scale.setScalar(MathUtils.lerp(currentPointsMesh.scale.x, pulseScaleFactor * 1.5, 0.1));
  });

  return (
    <group 
      position={[0, 0.0, 0]} // Centered horizontally to track camera fly-through axis
    >
      <points ref={pointsRef}>
        <bufferGeometry>
          {/* Inject type-safe native vector attributes directly straight to GPU cache allocations */}
          <bufferAttribute
            attach="attributes-position"
            {...new Float32BufferAttribute(nodesPositionArray, 3)}
          />
        </bufferGeometry>
        {/* Crisp square point texture formatting to preserve our minimalist charcoal structural aesthetics */}
        <pointsMaterial
          color="#00e5ff" // Primary Signal Cyan Token Color Accent
          size={0.035}
          sizeAttenuation={true}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
