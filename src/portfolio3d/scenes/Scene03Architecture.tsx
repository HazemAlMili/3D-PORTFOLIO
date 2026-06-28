import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { UltraWideMonitor } from "../components/UltraWideMonitor";
import { ArchitectureScreenContent } from "../components/ArchitectureScreenContent";
import { CodeFragment, DataLines } from "../components/background";
import { CODE_FRAGMENTS } from "../constants/backgroundConfig";
import { SCENE_03_SUB_PHASES } from "../constants/scene03Config";

interface Scene03ArchitectureProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

export function Scene03Architecture({
  sceneId,
  sceneIndex,
  localProgress,
}: Scene03ArchitectureProps) {
  const deviceGroupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";

  const [enterStart] = SCENE_03_SUB_PHASES.enter;
  const [immerseStart] = SCENE_03_SUB_PHASES.immerse;

  useFrame((state) => {
    if (shouldRenderStatic) return;
    if (!deviceGroupRef.current) return;

    const p = localProgress;
    const t = state.clock.getElapsedTime();

    // Breathing damps out during enter phase, reaches 0 by immerse start
    const dampFactor = p < enterStart
      ? 1
      : Math.max(0, 1 - (p - enterStart) / (immerseStart - enterStart));

    deviceGroupRef.current.position.y = Math.sin(t * 0.9) * 0.035 * dampFactor;
    deviceGroupRef.current.rotation.y = Math.sin(t * 0.45) * 0.012 * dampFactor;
    deviceGroupRef.current.rotation.x = Math.cos(t * 0.65) * 0.007 * dampFactor;
  });

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Studio lighting */}
      <ambientLight intensity={0.16} color="#1A2430" />
      <directionalLight position={[6, 5, 5]} intensity={0.85} color="#F4F7FA" />
      <directionalLight position={[-4, 2, 4]} intensity={0.4} color="#38D6FF" />
      <pointLight position={[0, 0, 3]} intensity={0.35} color="#2F80ED" />

      {/* UltraWideMonitor shell with subtle floating animation */}
      <group ref={deviceGroupRef}>
        <UltraWideMonitor>
          <ArchitectureScreenContent
            localProgress={localProgress}
            reducedMotion={shouldRenderStatic}
          />
        </UltraWideMonitor>
      </group>

      {/* Background system elements — behind the device */}
      <group position={[0, 0, -1.8]}>
        <DataLines nodeCount={12} lineOpacity={0.05} color="#38D6FF" />
        {CODE_FRAGMENTS.slice(4, 8).map((f, idx) => (
          <CodeFragment
            key={idx}
            content={f.content}
            position={[f.pos[0] * 1.2, f.pos[1], f.pos[2]]}
            color="#D8A84F"
            opacity={0.08 + (idx % 3) * 0.04}
          />
        ))}
      </group>
    </group>
  );
}
