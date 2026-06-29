import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import { ProductUXScreenContent } from "./ProductUXScreenContent";

export function TabletDevice({ localProgress = 0 }: { localProgress?: number }) {
  const [woken, setWoken] = useState(true);
  const swipeBarRef = useRef<Mesh>(null);
  const screenRef = useRef<Mesh>(null);

  // Swipe-wake visual feedback animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Pulse the swipe bar's emissive intensity
    if (swipeBarRef.current) {
      const mat = swipeBarRef.current.material as MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.4 + Math.sin(t * 3.5) * 0.25;
      }
    }

    // Pulse the screen background slightly based on active wake state
    if (screenRef.current) {
      const mat = screenRef.current.material as MeshStandardMaterial;
      if (mat) {
        if (woken) {
          mat.emissiveIntensity = 0.75 + Math.sin(t * 6.0) * 0.08;
        } else {
          mat.emissiveIntensity = 0.25 + Math.sin(t * 1.5) * 0.04;
        }
      }
    }
  });

  return (
    <group rotation={[-0.1, 0, 0]}>
      {/* 1. Tablet Body Chassis */}
      <mesh>
        <boxGeometry args={[3.2, 4.4, 0.12]} />
        <meshStandardMaterial
          color="#1D212A" // Graphite
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Frame border trims */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[3.22, 0.02, 0.13]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[3.22, 0.02, 0.13]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.6, 0, 0]}>
        <boxGeometry args={[0.02, 4.42, 0.13]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.6, 0, 0]}>
        <boxGeometry args={[0.02, 4.42, 0.13]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Screen Surface */}
      <mesh ref={screenRef} position={[0, 0, 0.062]}>
        <planeGeometry args={[2.9, 4.1]} />
        <meshStandardMaterial
          color={woken ? "#0A1B30" : "#05070A"}
          emissive={woken ? "#112F55" : "#061325"}
          emissiveIntensity={0.25}
          metalness={0.25}
          roughness={0.3}
        />
      </mesh>

      {/* Screen Content Visualization */}
      <group position={[0, 0, 0.065]} visible={woken}>
        <ProductUXScreenContent localProgress={localProgress} />
      </group>

      {/* 3. Restrained Cyan Accent LED at top bezel */}
      <mesh position={[0, 2.05, 0.062]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color="#38D6FF" />
      </mesh>

      {/* Ambient light sensor dot on top bezel */}
      <mesh position={[0.15, 2.05, 0.062]}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color="#0A0B0E" />
      </mesh>

      {/* 4. Swipe-Wake visual foundation */}
      <group position={[0, -1.6, 0.07]}>
        <mesh
          ref={swipeBarRef}
          onClick={() => setWoken(!woken)}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <boxGeometry args={[1.2, 0.14, 0.01]} />
          <meshStandardMaterial
            color="#1E2D4A"
            emissive="#38D6FF"
            emissiveIntensity={0.4}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        <Text
          position={[0, 0, 0.01]}
          fontSize={0.05}
          color="#38D6FF"
          anchorX="center"
          anchorY="middle"
        >
          {woken ? "ACTIVE" : "TAP TO WAKE"}
        </Text>
      </group>

      {/* Subtle UI Grid graphic inside the screen */}
      <group position={[0, 0, 0.065]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[1.38, 1.40, 4]} />
          <meshBasicMaterial color="#38D6FF" transparent opacity={0.06} />
        </mesh>
      </group>
    </group>
  );
}
export default TabletDevice;
