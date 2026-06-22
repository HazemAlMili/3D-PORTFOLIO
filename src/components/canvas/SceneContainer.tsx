'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

export const SceneContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden"
      style={{
        pointerEvents: 'none', // Enforces absolute click-through parity to shield semantic HTML layouts
        backgroundColor: '#0e0f11' // Injects the locked deep charcoal design token baseline
      }}
    >
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 8.5] }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        {children}
      </Canvas>
    </div>
  );
};
