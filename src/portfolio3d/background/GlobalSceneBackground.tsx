import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { Stars, Grid } from "@react-three/drei";
import { usePortfolioStore } from "../store/portfolioStore";
import { usePointerInfluence } from "../interaction/usePointerInfluence";
import { isMobileDevice } from "../utils/mobileUtils";

const IS_MOBILE = isMobileDevice();

export function GlobalSceneBackground() {
  const groupRef = useRef<Group>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const pointer = usePointerInfluence();

  // Low particle counts for cheap background depth points
  // Mobile gets halved counts to preserve GPU budget
  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (IS_MOBILE) {
      if (deviceTier === "low") return 6;
      if (deviceTier === "medium") return 15;
      return 25;
    }
    if (deviceTier === "low") return 15;
    if (deviceTier === "medium") return 35;
    return 60;
  }, [deviceTier, reducedMotion]);

  // Generate random static positions for background depth points
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    let seed = 123;
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (random() - 0.5) * 16;      // x
      pos[i * 3 + 1] = (random() - 0.5) * 10;  // y
      pos[i * 3 + 2] = -4 - random() * 6;      // z
    }
    return [pos];
  }, [particleCount]);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.position.set(0, 0, 0);
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    
    // Parallax & drift rotation
    groupRef.current.rotation.x = pointer.smoothY * 0.025;
    groupRef.current.rotation.y = elapsed * 0.005 + pointer.smoothX * 0.025;

    // Scroll-reactive depth shift
    groupRef.current.position.z = -scrollProgress * 1.5;
  });

  // Interpolate light color and intensity based on the active scene index
  const isOpening = activeSceneIndex === 0;
  const lightColor = isOpening ? "#2F80ED" : "#38D6FF";
  const lightIntensity = isOpening ? 0.95 : 1.45;

  return (
    <group ref={groupRef}>
      {/* 1. Global Cinematic Starfield — halved on mobile for GPU budget */}
      <Stars radius={120} depth={40} count={IS_MOBILE ? 900 : 1800} factor={3.5} saturation={0.4} fade speed={0.4} />

      {/* 2. Faint Grid Lines */}
      {!reducedMotion && (
        <Grid
          position={[0, -2.5, -2]}
          args={[30, 30]}
          cellSize={0.6}
          cellThickness={0.4}
          cellColor="#1b3047"
          sectionSize={3.0}
          sectionThickness={0.7}
          sectionColor="#38D6FF"
          fadeDistance={18}
          fadeStrength={1.2}
          infiniteGrid
        />
      )}

      {/* 3. Ambient depth points */}
      {particleCount > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#38D6FF"
            size={0.03}
            transparent
            opacity={0.65}
            depthWrite={false}
          />
        </points>
      )}

      {/* 4. Scene-Aware Background Glow Light */}
      <pointLight
        position={[0, 0, -4]}
        intensity={lightIntensity}
        color={lightColor}
        distance={12}
      />
    </group>
  );
}
