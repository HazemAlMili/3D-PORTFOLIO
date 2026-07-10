import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";
import { SCENE01_COLORS } from "../../constants/scene01Config";
import { SystemBootMotionState } from "./systemBootMotion";

interface SystemBootCodeOrbitProps {
  motion: SystemBootMotionState;
}

const ORBIT_LABELS = ["UI", "API", "AUTH", "DB", "CACHE", "TEST", "DEPLOY"];

export function SystemBootCodeOrbit({ motion }: SystemBootCodeOrbitProps) {
  const groupRef = useRef<Group>(null);

  // Spacing and phase offsets for labels
  const labelData = useMemo(() => {
    return ORBIT_LABELS.map((text, idx) => {
      const angle = (idx / ORBIT_LABELS.length) * Math.PI * 2;
      const radius = 1.6 + (idx % 2 === 0 ? 0.2 : -0.2); // Alternating radii for organic layered depth
      const height = (idx % 3 - 1) * 0.25; // Vertical staggering
      return { text, angle, radius, height };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    // Rotate the entire orbit container slowly (slowed by 50%)
    const rotateSpeed = elapsed * 0.06 + motion.dataGathering * 0.3;
    groupRef.current.rotation.y = rotateSpeed;
  });

  // Calculate opacity based on beats
  // Fades in with dataGathering (0.20 - 0.35), fades out with systemLock (0.70 - 0.82)
  const opacity = motion.dataGathering * (1.0 - motion.systemLock);

  if (opacity <= 0.005) return null;

  return (
    <group ref={groupRef}>
      {/* Visual Orbit Tracks */}
      <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={15}>
        <ringGeometry args={[1.58, 1.60, 64]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.accentCyan}
          transparent
          opacity={opacity * 0.15}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={15}>
        <ringGeometry args={[1.78, 1.80, 64]} />
        <meshBasicMaterial
          color={SCENE01_COLORS.deepBlue}
          transparent
          opacity={opacity * 0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Orbiting text labels */}
      {labelData.map((lbl, idx) => {
        // Position on the ring
        const x = Math.cos(lbl.angle) * lbl.radius;
        const z = Math.sin(lbl.angle) * lbl.radius;

        return (
          <group key={idx} position={[x, lbl.height, z]}>
            {/* Billboard effect: face the camera */}
            <Text
              fontSize={0.08}
              color={idx % 2 === 0 ? SCENE01_COLORS.primaryText : SCENE01_COLORS.softCyan}
              anchorX="center"
              anchorY="middle"
              fillOpacity={opacity * 0.8}
              renderOrder={16}
              material-depthTest={true}
              material-depthWrite={false}
            >
              {lbl.text}
            </Text>

            {/* Subtle connecting line down to the orbit track plane */}
            <mesh position={[0, -lbl.height / 2, 0]}>
              <boxGeometry args={[0.004, Math.abs(lbl.height), 0.004]} />
              <meshBasicMaterial
                color={SCENE01_COLORS.accentCyan}
                transparent
                opacity={opacity * 0.25}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
