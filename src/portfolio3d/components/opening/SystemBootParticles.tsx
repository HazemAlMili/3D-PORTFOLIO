import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";
import { SCENE01_COLORS } from "../../constants/scene01Config";
import { SystemBootMotionState } from "./systemBootMotion";

interface SystemBootParticlesProps {
  motion: SystemBootMotionState;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function SystemBootParticles({ motion }: SystemBootParticlesProps) {
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  const count = useMemo(() => {
    if (reducedMotion) return 0;
    if (deviceTier === "low") return 40;
    if (deviceTier === "medium") return 120;
    return 240; // optimized high tier
  }, [deviceTier, reducedMotion]);

  const meshRef = useRef<InstancedMesh>(null);

  // Seeded stable particle parameters
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = 0.6 + seededRandom(i * 12) * 3.4; // final orbital radius
      const theta = seededRandom(i * 34) * Math.PI * 2; // orbital phase angle
      const speed = 0.3 + seededRandom(i * 56) * 0.7; // orbital speed
      const y = (seededRandom(i * 78) - 0.5) * 1.5; // final vertical height
      
      // Seed size distribution: mostly small, very few large
      const sizeRoll = seededRandom(i * 90);
      let scale = 0.012;
      if (sizeRoll > 0.96) scale = 0.045; // large
      else if (sizeRoll > 0.82) scale = 0.026; // medium

      // Assign type role: 30% are "identity compiling streams", 70% are regular "orbiting data"
      const roleRoll = seededRandom(i * 105);
      const roleType = roleRoll > 0.7 ? "compile-stream" : "orbit-data";

      // Color scheme
      const randType = seededRandom(i * 111);
      let colorStr: string = SCENE01_COLORS.accentCyan;
      if (randType > 0.85) colorStr = SCENE01_COLORS.primaryText;
      else if (randType > 0.6) colorStr = SCENE01_COLORS.deepBlue;

      arr.push({ r, theta, speed, y, scale, roleType, color: new Color(colorStr) });
    }
    return arr;
  }, [count]);

  const tempObject = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current || count === 0) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // 1. DORMANT state: scale is 0
      if (motion.dormant < 0.99) {
        tempObject.scale.setScalar(0);
        tempObject.position.set(0, 0, 0);
        tempObject.updateMatrix();
        meshRef.current!.setMatrixAt(i, tempObject.matrix);
        return;
      }

      // Calculate base orbit angles (slowed down for a calmer drift feel)
      const orbitSpeed = time * 0.05 * p.speed + motion.dataGathering * 0.9 * p.speed;
      const currentTheta = p.theta + orbitSpeed;

      // 2. DATA GATHERING: Stream inward from outer space to their final orbits
      // When dataGathering is 0, they are pushed far outward (radius * 3).
      // As dataGathering goes 0 -> 1, they converge to their final radius.
      const gatherFactor = 3.0 - motion.dataGathering * 2.0;
      const currentR = p.r * gatherFactor;

      let x = Math.cos(currentTheta) * currentR;
      let z = Math.sin(currentTheta) * currentR;
      let currentY = p.y * gatherFactor;

      // 3. IDENTITY COMPILE: Pull compile-stream particles towards text sweep lines
      if (motion.identityCompile > 0.05 && motion.identityCompile < 0.98 && p.roleType === "compile-stream") {
        const isNameRange = p.y > 0.0;
        const targetY = isNameRange ? 0.22 : -0.15;
        
        // Sweep boundaries
        const nameHalfWidth = 1.3;
        // Correct right-to-left sweep matching name clipPath
        const nameSweepX = nameHalfWidth - motion.nameReveal * (nameHalfWidth * 2);
        
        const roleHalfWidth = 1.1;
        // Left-to-right sweep matching role clipPath
        const roleSweepX = -roleHalfWidth + motion.roleReveal * (roleHalfWidth * 2);
        
        const targetX = isNameRange ? nameSweepX : roleSweepX;

        // Lerp position to laser cursor coordinates during reveal
        const compileWeight = isNameRange ? motion.nameReveal : motion.roleReveal;
        if (compileWeight > 0.05 && compileWeight < 0.98) {
          x = x * (1 - compileWeight) + targetX * compileWeight;
          currentY = currentY * (1 - compileWeight) + targetY * compileWeight;
          z = z * (1 - compileWeight) + 0.8 * compileWeight; // pull to text depth
        }
      }

      // 3b. IDENTITY EXIT: Pull compiling data streams back into the center kernel
      if (motion.identityExit > 0.01 && p.roleType === "compile-stream") {
        x = x * (1.0 - motion.identityExit);
        currentY = currentY * (1.0 - motion.identityExit);
        z = z * (1.0 - motion.identityExit);
      }

      // 4. PORTAL OPEN: Pull particles inward (radius goes to 0)
      const pullFactor = 1.0 - motion.portalOpen * 0.96;
      x *= pullFactor;
      z *= pullFactor;
      currentY *= pullFactor;

      tempObject.position.set(x, currentY, z);

      // Particle scale calculations (fade in with firstPulse, out with enterSystem)
      let scaleFactor = p.scale * motion.firstPulse * (1.0 - motion.enterSystem);

      // Dim regular orbiting particles by 50% during identity compilation to keep text legible
      if (motion.identityCompile > 0.01) {
        const dimFactor = 1.0 - motion.identityCompile * 0.5;
        scaleFactor *= dimFactor;
      }

      // 5. TEXT SAFE ZONE: Prevent remaining orbiting particles from occluding text
      // Safe zone box: X [-1.6, 1.6], Y [-0.35, 0.35], Z > 0.2
      const inSafeZone = x > -1.6 && x < 1.6 && currentY > -0.35 && currentY < 0.35 && z > 0.2;
      const identityActive = motion.nameReveal > 0.05 || motion.roleReveal > 0.05;
      
      if (identityActive && inSafeZone && p.roleType !== "compile-stream") {
        scaleFactor = 0; // hide regular particles crossing in front of text
      }

      tempObject.scale.setScalar(scaleFactor);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
      meshRef.current!.setColorAt(i, p.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
      renderOrder={5}
    >
      <sphereGeometry args={[1, 3, 3]} />
      <meshBasicMaterial
        transparent
        opacity={0.12 + motion.firstPulse * 0.4}
        depthWrite={false}
        depthTest={true}
      />
    </instancedMesh>
  );
}
