import { Stats } from '@react-three/drei';
import { PbrDemoObject } from './components/PbrDemoObject';
import { SharpTextDemo } from './components/SharpTextDemo';

export interface SceneRootProps {
  showStats?: boolean;
}

/**
 * Standard PBR SceneRoot composition containing:
 * - High-efficiency 3-point / key lighting setup
 * - Ground plane for spatial grounding
 * - PbrDemoObject interactive mesh
 * - SharpTextDemo SDF typography test
 * - Development-only Stats overlay
 */
export function SceneRoot({ showStats = import.meta.env.DEV }: SceneRootProps) {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} color="#a0c8ff" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-4, -2, -3]}
        intensity={0.3}
        color="#00e5ff"
      />

      {/* Ground Plane */}
      <mesh
        position={[0, -2.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#070d14"
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* Demonstration Components */}
      <PbrDemoObject position={[0, 0.4, 0]} />
      <SharpTextDemo position={[0, -1.35, 0]} />

      {/* Dev-only R3F Stats Panel */}
      {showStats && <Stats />}
    </>
  );
}
