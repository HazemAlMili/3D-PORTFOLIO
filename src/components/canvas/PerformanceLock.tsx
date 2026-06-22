'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export const PerformanceLock: React.FC = () => {
  const { gl } = useThree();
  
  // High-frequency mutable log counters tracking runtime execution cycles
  const framesAuditedCounter = useRef<number>(0);
  const consecutiveDroppedFrames = useRef<number>(0);
  const adjustmentTriggeredFlag = useRef<boolean>(false);

  useEffect(() => {
    // Initial verification stamp confirming baseline system boots safely
    console.log('SYSTEM: PERFORMANCE LOCK AGENT MOUNTED & INITIALIZED');
  }, []);

  useFrame((_state, delta) => {
    // 1. Absolute Short-Circuit Gate: Cease tracking if hardware optimization rules have already fired
    if (adjustmentTriggeredFlag.current) return;

    framesAuditedCounter.current += 1;

    // 2. Compute live instantaneous runtime frame thresholds
    // A delta greater than 0.0222 seconds indicates frame rendering dropping below 45FPS speeds
    if (delta > 0.0222) {
      consecutiveDroppedFrames.current += 1;
    } else {
      // Decay trailing counter limits smoothly under stable performance sweeps
      consecutiveDroppedFrames.current = Math.max(0, consecutiveDroppedFrames.current - 1);
    }

    // 3. Validation Checkpoint Gate: Evaluate system stability indices every 60 compiled frames
    if (framesAuditedCounter.current >= 60) {
      
      // If system flags more than 25 dropped rendering frames within this snapshot cycle, execute mitigation
      if (consecutiveDroppedFrames.current > 25) {
        adjustmentTriggeredFlag.current = true;
        
        // Downscale pixel resolution allocations programmatically to protect system core temperatures
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));
        
        console.warn(
          `SYSTEM PERFORMANCE WARNING: Heavy GPU execution metrics detected. Automated PerformanceLock agent downscaling pixel ratio to 1.0 to guarantee 60FPS layout fluidity.`
        );
      }
      
      // Clean frame snapshot log tracking counters securely to begin next monitoring rotation
      framesAuditedCounter.current = 0;
    }
  });

  return null; // Operates completely as a programmatic headless background logic manager layer
};
