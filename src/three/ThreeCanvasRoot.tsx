import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneRoot } from './SceneRoot';
import { detectDeviceQualityTier, getQualitySettings, type QualityTier } from './config/quality';

export interface ThreeCanvasRootProps {
  tier?: QualityTier;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Reusable React Three Fiber Canvas root providing standardized production WebGL
 * settings, device quality tier scaling, and suspense boundaries.
 */
export function ThreeCanvasRoot({
  tier = detectDeviceQualityTier(),
  className,
  style,
  children,
}: ThreeCanvasRootProps) {
  const settings = getQualitySettings(tier);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <Canvas
        dpr={settings.dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [0, 1.5, 5],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <Suspense fallback={null}>
          {children || <SceneRoot />}
        </Suspense>
      </Canvas>
    </div>
  );
}
