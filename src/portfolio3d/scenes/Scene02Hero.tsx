// scenes/Scene02Hero.tsx
// Scene 02 — Hero / Cinematic Command Center Node
// Rebuilds Scene 02 from a flat monitor box into a 3D Command Center environment.
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { HeroCommandNode } from "../components/hero/HeroCommandNode";
import { SCENE_02_SUB_PHASES } from "../constants/scene02Config";
import { usePortfolioStore } from "../store/portfolioStore";
import { PERF_DEBUG } from "../constants/scene01Config";

interface Scene02HeroProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

export function Scene02Hero({
  sceneId,
  sceneIndex,
  localProgress,
  opacity = 1.0,
}: Scene02HeroProps) {
  const deviceGroupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const isTransitioningFrom01 = scrollProgress < 0.20 && opacity < 0.98;

  // P5 - Transition budget: skip rendering and animating next scene if opacity is tiny
  const shouldRenderHeavy = opacity > 0.02;
  const shouldAnimate = opacity > 0.05;

  const shouldRenderStatic = reducedMotion === true || !shouldAnimate;

  // Sub-phase boundaries for floating animation dampening
  const [arrivalStart] = SCENE_02_SUB_PHASES.arrival;
  const [handoffStart] = SCENE_02_SUB_PHASES.handoff;

  useFrame((state) => {
    if (!shouldRenderHeavy || opacity < 0.05 || (isTransitioningFrom01 && PERF_DEBUG.disableNextSceneDuringExit)) return;
    if (shouldRenderStatic) return;
    if (!deviceGroupRef.current) return;

    const p = localProgress;
    const t = state.clock.getElapsedTime();

    // Subtle ambient breathing float of the command center
    const dampFactor = p >= handoffStart
      ? Math.max(0, 1 - (p - handoffStart) / (1.0 - handoffStart))
      : p < arrivalStart ? 0.5 : 1.0;

    deviceGroupRef.current.position.y = Math.sin(t * 0.8) * 0.02 * dampFactor;
    deviceGroupRef.current.rotation.y = Math.sin(t * 0.3) * 0.008 * dampFactor;
  });

  // Developer-only isolation toggle for next-scene rendering during exit
  if (isTransitioningFrom01 && PERF_DEBUG.disableNextSceneDuringExit) {
    return null;
  }
  
  // Hard boundary isolation: do not render Scene 02 once it is complete
  if (localProgress >= 1.0) return null;
 
  // Render absolutely nothing if opacity is tiny to save frame budget (P5)
  if (!shouldRenderHeavy) return null;

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Studio / Command Center lighting */}
      <ambientLight intensity={0.22} color="#0A1828" />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#F4F7FA" />
      <directionalLight position={[-3, 2, 4]} intensity={0.45} color="#38D6FF" />
      <pointLight position={[0, 0, 3]} intensity={0.35} color="#2F80ED" />

      {/* 3D Command Node & Capability Modules */}
      <group ref={deviceGroupRef}>
        <HeroCommandNode
          localProgress={localProgress}
          opacity={opacity}
          reducedMotion={shouldRenderStatic}
        />
      </group>

      {/* Background system elements — removed at user request */}
    </group>
  );
}
