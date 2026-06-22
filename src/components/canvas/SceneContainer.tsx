'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CoreRingsMesh } from './CoreRingsMesh';
import { ArchitecturePlatesMesh } from './ArchitecturePlatesMesh';
import { ProjectMonolithMesh } from './ProjectMonolithMesh';
import { MicroNodeGridMesh } from './MicroNodeGridMesh';
import { CinematicTunnel } from './CinematicTunnel';
import { PerformanceLock } from './PerformanceLock';

interface SceneContainerProps {
  children?: React.ReactNode;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ children }) => {
  return (
    <div 
      className="fixed inset-0 w-full h-full bg-[#0e0f11] z-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        // Tighten up camera properties to frame the central infinite entry corridor flawlessly
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 35 }}
      >
        {/* Unified Industrial Light Arrays Blueprint Layout */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 10, 5]} intensity={1.0} color="#ffffff" />
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#00e5ff" />  {/* Aggressive center cyan light */}
        <pointLight position={[0, 0, -4]} intensity={0.6} color="#ffd700" /> {/* Leadership gold baseline path view */}

        {/* Real-time automated system health tracking agent */}
        <PerformanceLock />

        {/* Core Component 01: Full-Screen Infinite Matrix Architectural Software Tunnel */}
        <CinematicTunnel />

        {/* Core Component 02: Centralized Floating Concentric Rings Machine (Section 01 Alignment) */}
        <group position={[0, 0, 4]}>
          <CoreRingsMesh />
        </group>

        {/* Core Component 03: Centralized Isometric Architecture Stack Plates (Section 04 Alignment) */}
        <group position={[0, 0, 0]} scale={[1.1, 1.1, 1.1]}>
          <ArchitecturePlatesMesh />
        </group>

        {/* Core Component 04: Centralized Morphing Project Capsule Monolith Machine (Section 05 Alignment) */}
        <group position={[0, 0, -3]}>
          <ProjectMonolithMesh />
        </group>

        {/* Core Component 05: Centralized Micro-Node Network Grid Points Cloud (Section 07 Alignment) */}
        <group position={[0, 0, -6]}>
          <MicroNodeGridMesh />
        </group>

        {children}
      </Canvas>
    </div>
  );
};
