'use client';

import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3, Vector2 } from 'three';
import { useScrollState } from '../context/ScrollStateContext';
import { useRef, useEffect } from 'react';

export interface MotionFrameState {
  cameraPosition: Vector3;
  meshRotationSpeed: number;
  activeLayerAlpha: number;
  scrollVelocity: number;
}

interface KeyframeNode {
  progress: number;
  position: [number, number, number];
  rotationSpeed: number;
  alpha: number;
}

// Continuous deep flight trajectory corridor focusing completely on Z axis penetration
const continuousStoryMap: KeyframeNode[] = [
  { progress: 0.00, position: [0.0, 0.0, 8.0], rotationSpeed: 0.2, alpha: 1.0 },   // Hero Gateway Base
  { progress: 0.25, position: [0.0, 0.0, 4.5], rotationSpeed: 0.6, alpha: 0.9 },   // Identity Penetration Entry
  { progress: 0.50, position: [0.0, 0.0, 1.0], rotationSpeed: 1.2, alpha: 0.8 },   // Architecture Core Breakthrough
  { progress: 0.75, position: [0.0, 0.0, -2.5], rotationSpeed: 2.0, alpha: 0.5 },  // Selected Projects Grid Interception
  { progress: 1.00, position: [0.0, 0.0, -7.5], rotationSpeed: 0.4, alpha: 1.0 }   // Contact Gateway Terminal Field View
];

const targetCamPos = new Vector3();
const pointerCoordinates = new Vector2();
const smoothedPointer = new Vector2();

export const useMotionTimeline = (isReducedMotionActive: boolean = false): MotionFrameState => {
  const { progressRef } = useScrollState();
  
  // High-frequency reference logs tracking continuous velocity calculation deltas
  const lastProgressRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handlePointerMove = (e: MouseEvent) => {
      // Normalize pointer coordinates to standard screen space [-1, 1]
      pointerCoordinates.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerCoordinates.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  const currentFrameState = useRef<MotionFrameState>({
    cameraPosition: new Vector3(0, 0, 8),
    meshRotationSpeed: 0.2,
    activeLayerAlpha: 1.0,
    scrollVelocity: 0.0
  });

  useFrame((state, delta) => {
    const currentProgress = MathUtils.clamp(progressRef.current, 0, 1);
    const cameraPointer = state.camera;

    if (isReducedMotionActive) {
      cameraPointer.position.set(0, 0, 8);
      cameraPointer.lookAt(0, 0, 0);
      return;
    }

    // 1. Compute high-frequency instantaneous scroll speed velocity vectors
    const instantProgressDelta = currentProgress - lastProgressRef.current;
    
    // Apply smooth frame dampening to calculate instantaneous frame velocity attributes safely
    velocityRef.current = MathUtils.lerp(velocityRef.current, instantProgressDelta / (delta || 0.016), 0.1);
    lastProgressRef.current = currentProgress;

    // 2. Identify active keyframe node boundaries across the continuous timeline map
    let lowerNode = continuousStoryMap[0];
    let upperNode = continuousStoryMap[continuousStoryMap.length - 1];

    for (let i = 0; i < continuousStoryMap.length - 1; i++) {
      if (currentProgress >= continuousStoryMap[i].progress && currentProgress <= continuousStoryMap[i+1].progress) {
        lowerNode = continuousStoryMap[i];
        upperNode = continuousStoryMap[i+1];
        break;
      }
    }

    const segmentSpan = upperNode.progress - lowerNode.progress;
    const segmentProgress = segmentSpan > 0 ? (currentProgress - lowerNode.progress) / segmentSpan : 0;

    // 3. Linearly interpolate primary focal trajectory parameters
    const targetX = MathUtils.lerp(lowerNode.position[0], upperNode.position[0], segmentProgress);
    const targetY = MathUtils.lerp(lowerNode.position[1], upperNode.position[1], segmentProgress);
    const baseTargetZ = MathUtils.lerp(lowerNode.position[2], upperNode.position[2], segmentProgress);

    // 4. Elastic Kinetic Modifier: Add a temporary Z-axis thrust compression based on velocity rules
    // Creates a dynamic spring action when the user scrolls rapidly downwards or upwards
    const elasticZThrust = -velocityRef.current * 0.18;
    const absoluteTargetZ = baseTargetZ + elasticZThrust;

    // 5. High-Inertia Pointer Position Smoothing Pass
    smoothedPointer.x = MathUtils.lerp(smoothedPointer.x, pointerCoordinates.x, 0.04);
    smoothedPointer.y = MathUtils.lerp(smoothedPointer.y, pointerCoordinates.y, 0.04);

    // Weld responsive perspective tilting offsets to generate structural dimension views
    const structuralTiltX = targetX + smoothedPointer.x * 0.8;
    const structuralTiltY = targetY + smoothedPointer.y * 0.8;

    targetCamPos.set(structuralTiltX, structuralTiltY, absoluteTargetZ);

    // 6. Apply smooth cinematic spring factor (0.07) to settle camera positions cleanly
    cameraPointer.position.lerp(targetCamPos, 0.07);
    
    // Maintain focal visibility lock, tilting perspective slightly to mimic dynamic camera operators
    cameraPointer.lookAt(smoothedPointer.x * 0.2, smoothedPointer.y * 0.2, baseTargetZ - 3.0);

    // 7. Extract synchronization payloads downstream
    currentFrameState.current.cameraPosition.copy(cameraPointer.position);
    currentFrameState.current.meshRotationSpeed = MathUtils.lerp(lowerNode.rotationSpeed, upperNode.rotationSpeed, segmentProgress) * (1.0 + Math.abs(velocityRef.current) * 2.0);
    currentFrameState.current.activeLayerAlpha = MathUtils.lerp(lowerNode.alpha, upperNode.alpha, segmentProgress);
    currentFrameState.current.scrollVelocity = velocityRef.current;
  });

  return currentFrameState.current;
};

