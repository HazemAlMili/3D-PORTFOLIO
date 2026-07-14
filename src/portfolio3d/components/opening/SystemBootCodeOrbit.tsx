import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";
import { SCENE01_COLORS, PERF_DEBUG } from "../../constants/scene01Config";
import { SystemBootMotionState } from "./systemBootMotion";
import { usePortfolioStore } from "../../store/portfolioStore";
import { pointerInfluence } from "../../interaction/usePointerInfluence";

interface SystemBootCodeOrbitProps {
  motion: SystemBootMotionState;
}

const ORBIT_LABELS = ["UI", "API", "AUTH", "DB", "CACHE", "TEST", "DEPLOY"];

export function SystemBootCodeOrbit({ motion }: SystemBootCodeOrbitProps) {
  const groupRef = useRef<Group>(null);
  const localProgress = usePortfolioStore((state) => state.sceneLocalProgress);

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
    if (PERF_DEBUG.disableCodeOrbit) return;
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    // Rotate the entire orbit container slowly (slowed by 50%)
    const rotateSpeed = elapsed * 0.06 + motion.dataGathering * 0.3;
    groupRef.current.rotation.y = rotateSpeed;

    // Apply pointer influence tilt (only while not collapsing)
    if (motion.collapseProgress < 0.1) {
      groupRef.current.rotation.x = pointerInfluence.smoothY * 0.02;
      groupRef.current.rotation.z = pointerInfluence.smoothX * 0.02;
    }

    // Cinematic collapse: scale the entire orbit group toward the kernel
    const collapseScale = 1.0 - motion.collapseProgress * 0.98;
    groupRef.current.scale.setScalar(Math.max(0.001, collapseScale));
  });

  if (PERF_DEBUG.disableCodeOrbit) return null;

  // Unmount only after fully collapsed
  if (localProgress >= 1.0) return null;

  // Calculate opacity based on beats
  // Fades in with dataGathering, fades out during late collapse
  const collapseOpacityFade = Math.max(0, 1.0 - motion.collapseProgress * 1.6);
  const opacity = motion.dataGathering * (1.0 - motion.systemLock * 0.3) * collapseOpacityFade;

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
