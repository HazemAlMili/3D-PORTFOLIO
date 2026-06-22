# Scroll Progress Engine Core & WebGL Canvas Specification — The Product Systems Engine

This specification codifies the programmatic logic layouts, state provider wrappers, and performance frame-isolation structures for the interactives prototype sandbox layer.

## 1. `src/context/ScrollStateContext.tsx` Blueprint Manual
The scroll state engine builds a centralized React Context framework. It listens to native vertical scrolling movements passively, calculating an immutable normalized floating value between `0.0` and `1.0` mapping directly to the global layout depth.

```typescript
import React, { createContext, useContext, useEffect, useRef } from 'react';

interface ScrollState {
  // A raw reference pointer containing high-frequency progress values to prevent component re-renders
  progressRef: React.MutableRefObject<number>;
}

const ScrollStateContext = createContext<ScrollState | null>(null);

export const ScrollStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const progressRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      
      // Calculate normal floating-point progress scale matrix [0.0 - 1.0]
      const currentProgress = scrollTop / docHeight;
      progressRef.current = Math.min(Math.max(currentProgress, 0), 1);
    };

    // Attach passive listener to optimize mobile main-thread scrolling pathways natively
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollStateContext.Provider value={{ progressRef }}>
      {children}
    </ScrollStateContext.Provider>
  );
};

export const useScrollState = () => {
  const context = useContext(ScrollStateContext);
  if (!context) {
    throw new Error('useScrollState must be executed within an active ScrollStateProvider container node.');
  }
  return context;
};
```

---

## 2. `src/components/canvas/SceneContainer.tsx` Blueprint Manual

The global WebGL context wrapper mounts an immutable, full-window background overlay container housing the R3F `<Canvas>` element rig.

```typescript
'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useScrollState } from '@/context/ScrollStateContext';

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
```

---

## 3. High-Performance Frame-Isolation Architecture Guidelines

To preserve an award-grade 60FPS fluid experience, sub-agents must strictly follow these structural optimization criteria during subsequent component composition tasks:

* **No Local State Synchronization Loops:** Canvas sub-meshes must *never* read scroll values using standard local React states (`useState`). Such patterns trigger global sub-tree element component re-renders per pixel scroll, leading to layout stutters.
* **Direct Vector Frame Binding:** Component meshes read high-frequency scrolling inputs exclusively via the context reference pointer (`progressRef`). They interpolate spatial location coordinates inside the optimized R3F rendering cycle hook (`useFrame`), editing object matrices directly within the native WebGL layer.

```typescript
// Architectural Reference Blueprint Pattern - Local Mesh Execution
useFrame((state) => {
  const scrollProgress = progressRef.current; // Reads raw numerical vector directly
  // Perform direct linear interpolation (lerp) on background elements here without triggering DOM shifts
});
```
