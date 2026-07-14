import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";
import { SCENE01_COLORS, PERF_DEBUG } from "../../constants/scene01Config";
import { SystemBootMotionState } from "./systemBootMotion";
import { pointerInfluence } from "../../interaction/usePointerInfluence";

interface SystemBootParticlesProps {
  motion: SystemBootMotionState;
  localProgress: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function SystemBootParticles({ motion, localProgress }: SystemBootParticlesProps) {
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // Upgrade particle count to support rich glyph resolution
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

      // Assign type role: 30% are "compile-stream" particles routing to the HUD panel, 70% are regular "orbit-data"
      const roleRoll = seededRandom(i * 105);
      const roleType = roleRoll > 0.7 ? "compile-stream" : "orbit-data";

      // Panel cluster destination in bottom-left quadrant (X ~ -1.25, Y ~ -0.65, Z ~ 0.8)
      const px = -1.25 + (seededRandom(i * 13) - 0.5) * 0.22;
      const py = -0.65 + (seededRandom(i * 17) - 0.5) * 0.15;
      const pz = 0.8 + (seededRandom(i * 19) - 0.5) * 0.1;

      // Color scheme
      const randType = seededRandom(i * 111);
      let colorStr: string = SCENE01_COLORS.accentCyan;
      if (randType > 0.85) colorStr = SCENE01_COLORS.primaryText;
      else if (randType > 0.6) colorStr = SCENE01_COLORS.deepBlue;

      arr.push({ r, theta, speed, y, scale, roleType, px, py, pz, color: new Color(colorStr) });
    }
    return arr;
  }, [count]);

  const tempObject = useMemo(() => new Object3D(), []);

  // Collapse: 0.80 – 0.96 pulls particles toward kernel
  const collapseProgress = motion.collapseProgress;

  useFrame((state) => {
    if (PERF_DEBUG.disableParticles) return;
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
      
      // Spiral assembly offset: particles spiral inward from outer angles during dataGathering
      const spiralOffset = (1.0 - motion.dataGathering) * 2.5 * p.speed;
      const currentTheta = p.theta + orbitSpeed + spiralOffset;

      // 2. DATA GATHERING: Stream inward from outer space to their final orbits
      const gatherFactor = 3.0 - motion.dataGathering * 2.0;
      const currentR = p.r * gatherFactor;

      let x = Math.cos(currentTheta) * currentR;
      let z = Math.sin(currentTheta) * currentR;
      let currentY = p.y * gatherFactor;

      // 3. HUD PANEL ROUTING: compile-stream particles route from kernel [0,0,0] to HUD panel [-1.25, -0.65, 0.8]
      if (p.roleType === "compile-stream") {
        if (localProgress >= 0.40 && localProgress <= 0.84) {
          // Outward routing phase (0.40 - 0.62)
          const routeMin = 0.40;
          const routeMax = 0.62;
          const routeT = Math.min(1, Math.max(0, (localProgress - routeMin) / (routeMax - routeMin)));
          const routingProgress = routeT * routeT * (3 - 2 * routeT); // smoothstep
          
          x = p.px * routingProgress;
          currentY = p.py * routingProgress;
          z = p.pz * routingProgress;

          // Indicator lights subtle pulse / vibration on panel during hold (0.72 - 0.84)
          if (localProgress >= 0.72) {
            const glowPulse = Math.sin(time * 6 + i) * 0.005;
            x += glowPulse;
            currentY += glowPulse;
          }
        } else if (localProgress > 0.84 && localProgress <= 0.92) {
          // Dissolve back to kernel phase (0.84 - 0.92)
          const exitProgress = motion.panelExit;
          x = p.px * (1.0 - exitProgress);
          currentY = p.py * (1.0 - exitProgress);
          z = p.pz * (1.0 - exitProgress);
        } else if (localProgress > 0.92) {
          // Settle inside core
          x = 0;
          currentY = 0;
          z = 0;
        }
      }

      // 4. PORTAL OPEN: Pull remaining orbit particles inward
      const pullFactor = 1.0 - motion.portalOpen * 0.96;
      x *= pullFactor;
      z *= pullFactor;
      currentY *= pullFactor;

      tempObject.position.set(x, currentY, z);

      // Particle scale: fade in with firstPulse, collapse-shrink toward kernel during collapseProgress
      // Scale shrinks as particles approach kernel (not abrupt count culling)
      const collapseShrink = Math.max(0, 1.0 - collapseProgress * 1.15);
      let scaleFactor = p.scale * motion.firstPulse * (1.0 - motion.enterSystem) * collapseShrink;

      // Dim compile-stream particles by 50% during hold to keep panel text readable
      if (p.roleType === "compile-stream" && localProgress >= 0.72 && localProgress <= 0.84) {
        scaleFactor *= 0.5;
      }

      tempObject.scale.setScalar(scaleFactor);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
      meshRef.current!.setColorAt(i, p.color);
    });

    if (meshRef.current) {
      if (!reducedMotion) {
        meshRef.current.rotation.x = pointerInfluence.smoothY * 0.03;
        meshRef.current.rotation.y = pointerInfluence.smoothX * 0.03;
        meshRef.current.position.x = pointerInfluence.smoothX * 0.05;
        meshRef.current.position.y = -pointerInfluence.smoothY * 0.05;
      } else {
        meshRef.current.rotation.set(0, 0, 0);
        meshRef.current.position.set(0, 0, 0);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (count === 0) return null;

  if (PERF_DEBUG.disableParticles) return null;

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
