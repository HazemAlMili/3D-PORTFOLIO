# 3D Camera Rigging & Asynchronous Asset Loader Specification — The Product Systems Engine

This specification codifies the programmatic camera interpolation blocks, non-blocking frame loop bindings, and Draco compressed asset preloading schemas for the interactive prototype sandbox layer.

## 1. `src/components/canvas/CameraRig.tsx` Blueprint Manual
The camera rig functions as an automated perspective transformer. It reads the global scroll progress reference vector continuously, executing fluid multi-scene coordinate translations directly within the frame rendering loop without triggering React component shifts.

```typescript
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';
import { useScrollState } from '@/context/ScrollStateContext';

export const CameraRig: React.FC = () => {
  const { progressRef } = useScrollState();
  const { camera } = useThree();
  
  // Bounding vectors to store look-at targets programmatically
  const targetPosition = useRef(new Vector3(0, 0, 8.5));
  const targetLookAt = useRef(new Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Check OS-level animation restrictions natively to fulfill accessibility parameters
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Lock camera instantly at standard baseline coordinates to suppress spatial tracking strain
      camera.position.set(0, 0, 8.5);
      camera.lookAt(0, 0, 0);
      return;
    }

    const p = progressRef.current; // Reads raw high-frequency numerical progress vector [0.0 - 1.0]
    const isMobile = window.innerWidth < 768;
    const zoomMultiplier = isMobile ? 1.45 : 1.0; // Responsive Z-axis scaling protection

    // Meticulous coordinate mapping segments tracing the 10 locked storytelling scenes
    if (p <= 0.10) {
      // Scene 01: System Boot / Hero [0.0 - 10.0%]
      const subProgress = p / 0.10;
      targetPosition.current.set(0, 0, MathUtils.lerp(8.5, 7.5, subProgress) * zoomMultiplier);
      targetLookAt.current.set(0, 0, 0);
    } else if (p <= 0.20) {
      // Scene 02: Identity Lock [10.0 - 20.0%]
      const subProgress = (p - 0.10) / 0.10;
      const xOffset = isMobile ? 0.00 : MathUtils.lerp(0.00, 2.50, subProgress);
      targetPosition.current.set(xOffset, 0, 7.0 * zoomMultiplier);
      targetLookAt.current.set(0, 0, 0);
    } else if (p <= 0.30) {
      // Scene 03: Proof Scan [20.0 - 30.0%]
      const subProgress = (p - 0.20) / 0.10;
      targetPosition.current.set(
        MathUtils.lerp(isMobile ? 0 : 2.50, 0.00, subProgress),
        MathUtils.lerp(0.00, 6.00, subProgress),
        MathUtils.lerp(7.0 * zoomMultiplier, 0.00, subProgress)
      );
      targetLookAt.current.set(0, 0, 0);
    } else {
      // Terminal Fallback Phase Boundaries Configuration Placeholder [Scene 04 - Scene 10]
      // Standard linear rail increments rule downstream targets safely
      targetPosition.current.set(0, 0, 9.0 * zoomMultiplier);
      targetLookAt.current.set(0, 0, 0);
    }

    // Apply strict non-jitter framing damping using a constant 0.1 delta coefficient loop
    camera.position.lerp(targetPosition.current, 0.1);
    
    // Smooth look-at execution matrix translation pass
    const currentLookAt = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookAt.lerp(targetLookAt.current, 0.1);
    camera.lookAt(currentLookAt);
  });

  return null;
};
```

---

## 2. Draco Asynchronous Asset Preloading Configurations

To eliminate layout compilation stutters during core scrolling passes, model binary files are loaded asynchronously using standard Drei preloading configurations.

```typescript
import { useGLTF } from '@react-three/drei';

// Initialize isolated Draco decoder configurations pointing straight to native CDN resources
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');

export const preloadAssetCohort = () => {
  // Budgeted configuration hooks preloading low-poly project nodes before full app compilation
  useGLTF.preload('/models/mesh_engine_core_rings.glb');
  useGLTF.preload('/models/mesh_architecture_plates.glb');
  useGLTF.preload('/models/mesh_capsule_enactus.glb'); // Mapped to Portal v4.0 code placeholders
  useGLTF.preload('/models/mesh_capsule_jobboard.glb'); // Mapped to Job Board code placeholders
};
```
