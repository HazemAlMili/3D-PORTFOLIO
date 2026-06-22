import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { useScrollState } from '../context/ScrollStateContext';

export interface MotionFrameState {
  cameraPosition: Vector3;
  meshRotationSpeed: number;
  activeLayerAlpha: number;
}

// Temporary internal structure to structure target interpolation keyframes cleanly
interface KeyframeNode {
  progress: number;
  position: [number, number, number];
  rotationSpeed: number;
  alpha: number;
}

const motionTimelineMap: KeyframeNode[] = [
  { progress: 0.00, position: [0.0, 0.0, 5.0], rotationSpeed: 0.15, alpha: 1.0 },   // Hero Boot Layout
  { progress: 0.25, position: [-2.5, 0.5, 3.5], rotationSpeed: 0.45, alpha: 0.8 },  // Identity Orbit Left
  { progress: 0.50, position: [3.0, -1.0, 4.0], rotationSpeed: 0.25, alpha: 0.9 },  // Architecture Isometric Right
  { progress: 0.75, position: [0.0, -3.0, 2.5], rotationSpeed: 0.60, alpha: 0.5 },  // Project Dolly-In Cluster
  { progress: 1.00, position: [0.0, -5.0, 6.0], rotationSpeed: 0.10, alpha: 1.0 }   // Terminal Portal Wide View
];

// Reusable vector pointers initialized strictly outside the render loop loop to save garbage collection cycles
const targetPositionVector = new Vector3();

export const useMotionTimeline = (isReducedMotionActive: boolean = false): MotionFrameState => {
  const { progressRef } = useScrollState();
  
  // Initialize default fallback return parameters safely
  const currentFrameState: MotionFrameState = {
    cameraPosition: new Vector3(0, 0, 5),
    meshRotationSpeed: 0.15,
    activeLayerAlpha: 1.0
  };

  // Execute linear keyframe matching loops during every active frame execution tick
  useFrame((state) => {
    const currentProgress = MathUtils.clamp(progressRef.current, 0, 1);
    const cameraPointer = state.camera;

    // 1. Accessibility Safety Check: Handle system preferences for reduced motion instantly
    if (isReducedMotionActive) {
      // Force freeze all structural positional transformations, allowing only a linear fade
      targetPositionVector.set(0, 0, 5);
      cameraPointer.position.copy(targetPositionVector);
      cameraPointer.lookAt(0, 0, 0);
      return;
    }

    // 2. Locate active interpolation boundaries inside the structural keyframe index map
    let lowerNode = motionTimelineMap[0];
    let upperNode = motionTimelineMap[motionTimelineMap.length - 1];

    for (let i = 0; i < motionTimelineMap.length - 1; i++) {
      if (currentProgress >= motionTimelineMap[i].progress && currentProgress <= motionTimelineMap[i+1].progress) {
        lowerNode = motionTimelineMap[i];
        upperNode = motionTimelineMap[i+1];
        break;
      }
    }

    // 3. Compute the localized progression percentage between the identified keyframes
    const segmentSpan = upperNode.progress - lowerNode.progress;
    const segmentProgress = segmentSpan > 0 ? (currentProgress - lowerNode.progress) / segmentSpan : 0;

    // 4. Interpolate spatial coordinate points linearly to eliminate transition jitter parameters
    const targetX = MathUtils.lerp(lowerNode.position[0], upperNode.position[0], segmentProgress);
    const targetY = MathUtils.lerp(lowerNode.position[1], upperNode.position[1], segmentProgress);
    const targetZ = MathUtils.lerp(lowerNode.position[2], upperNode.position[2], segmentProgress);

    // Apply mobile factor layout adjustments programmatically to prevent camera clipping across small screens
    const isMobileViewport = window.innerWidth < 768;
    const mobileZOffset = isMobileViewport ? 2.5 : 0.0;

    targetPositionVector.set(targetX, targetY, targetZ + mobileZOffset);

    // 5. Apply fluid cinematic inertia using high-frequency frame delta smoothing constants (0.1)
    cameraPointer.position.lerp(targetPositionVector, 0.1);
    
    // Ensure the focus anchor target stays firmly aligned with the center baseline coordinates
    cameraPointer.lookAt(0, targetY * 0.5, 0);

    // 6. Bind dynamic output parameters for secondary asset synchronization hooks downstream
    currentFrameState.meshRotationSpeed = MathUtils.lerp(lowerNode.rotationSpeed, upperNode.rotationSpeed, segmentProgress);
    currentFrameState.activeLayerAlpha = MathUtils.lerp(lowerNode.alpha, upperNode.alpha, segmentProgress);
  });

  return currentFrameState;
};
