'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, Float32BufferAttribute, MathUtils } from 'three';
import { useScrollState } from '../../context/ScrollStateContext';

export const CosmicParticles: React.FC = () => {
  const pointsRef = useRef<Points>(null);
  const { progressRef } = useScrollState();

  const totalParticles = 250;

  // Distribute particles inside a unified screen-spanning 3D box bounding envelope
  const particlesPositionBuffer = useMemo(() => {
    const array = new Float32Array(totalParticles * 3);
    for (let i = 0; i < totalParticles; i++) {
      array[i * 3] = MathUtils.randFloatSpread(12);     // Volumetric X Spread spanning full screen width
      array[i * 3 + 1] = MathUtils.randFloatSpread(12); // Volumetric Y Spread spanning full screen height
      array[i * 3 + 2] = MathUtils.randFloatSpread(15); // Deep Z Depth corridor spread
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const currentPoints = pointsRef.current;
    const geometry = currentPoints.geometry;
    const positions = geometry.attributes.position.array as Float32Array;

    // Ingest global scroll progress parameter to drive forward continuous cosmic acceleration
    const scrollVelocityFactor = progressRef.current * 10.0;

    for (let i = 0; i < totalParticles; i++) {
      // Pull particles closer along the Z axis based on current scroll frames
      // Adding a time dimension to keep ambient particle drift running when scroll stalls
      positions[i * 3 + 2] += 0.015 + (scrollVelocityFactor * 0.02);

      // Reset Matrix Loop: If a cosmic particle passes completely behind the camera field, recycling it to the far back
      if (positions[i * 3 + 2] > 6) {
        positions[i * 3 + 2] = -9; // Respawn deep inside the background screen horizon corridor
        positions[i * 3] = MathUtils.randFloatSpread(12); // Re-roll positions to diversify the cosmic spread
        positions[i * 3 + 1] = MathUtils.randFloatSpread(12);
      }
    }

    // Flag buffer arrays to inform the GPU rendering engine that vertex coordinates updated live
    geometry.attributes.position.needsUpdate = true;

    // Ambient low-frequency rotation sweep to simulate a planetary orbital continuum
    currentPoints.rotation.z = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          {...new Float32BufferAttribute(particlesPositionBuffer, 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00e5ff" // Cyan signal highlight token
        size={0.045}
        sizeAttenuation={true}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
};
