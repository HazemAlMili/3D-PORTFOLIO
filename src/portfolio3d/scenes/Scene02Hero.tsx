// scenes/Scene02Hero.tsx
// Scene 02 — Hero / Main Identity
// Follows the Scene Experience Contract: device → approach → enter → immerse hold → exit.
// Content progression is driven by localProgress through the immerse sub-phase [0.30, 0.78].
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { HeroScreenContent } from "../components/HeroScreenContent";
import { CodeFragment, DataLines } from "../components/background";
import { CODE_FRAGMENTS } from "../constants/backgroundConfig";
import { SCENE_02_COLORS, SCENE_02_SUB_PHASES } from "../constants/scene02Config";
import { usePortfolioStore } from "../store/portfolioStore";

interface Scene02HeroProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroDevice — procedural monitor frame (no GLB). Matches the screen area
// used by HeroScreenContent: screen panel 3.6 × 2.6, screen at Z=+0.16.
// ─────────────────────────────────────────────────────────────────────────────
function HeroDevice() {
  return (
    <group>
      {/* Bezel — dark graphite metallic box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.0, 2.9, 0.30]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.bezel}
          metalness={0.88}
          roughness={0.20}
        />
      </mesh>

      {/* Screen surface — emissive dark panel, front face */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[3.6, 2.55]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.screenBg}
          emissive={SCENE_02_COLORS.screenEmissive}
          emissiveIntensity={0.5}
          metalness={0.05}
          roughness={0.45}
        />
      </mesh>

      {/* Cyan top accent strip */}
      <mesh position={[0, 1.47, 0.155]}>
        <boxGeometry args={[4.02, 0.03, 0.01]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.accentCyan}
          emissive={SCENE_02_COLORS.accentCyan}
          emissiveIntensity={0.9}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Gold bottom accent strip */}
      <mesh position={[0, -1.47, 0.155]}>
        <boxGeometry args={[4.02, 0.03, 0.01]} />
        <meshStandardMaterial
          color={SCENE_02_COLORS.accentGold}
          emissive={SCENE_02_COLORS.accentGold}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene02Hero — outer shell
// ─────────────────────────────────────────────────────────────────────────────
export function Scene02Hero({ sceneId, sceneIndex, localProgress }: Scene02HeroProps) {
  const deviceGroupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";

  // Damp device floating during enter/immerse — camera is close, we don't want drift
  const [enterStart] = SCENE_02_SUB_PHASES.enter;
  const [immerseStart] = SCENE_02_SUB_PHASES.immerse;

  useFrame((state) => {
    if (shouldRenderStatic) return;
    if (!deviceGroupRef.current) return;

    const p = localProgress;
    const t = state.clock.getElapsedTime();

    // Breathing damps out during enter phase, reaches 0 by immerse start
    const dampFactor = p < enterStart
      ? 1
      : Math.max(0, 1 - (p - enterStart) / (immerseStart - enterStart));

    deviceGroupRef.current.position.y = Math.sin(t * 1.0) * 0.03 * dampFactor;
    deviceGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.015 * dampFactor;
    deviceGroupRef.current.rotation.x = Math.cos(t * 0.7) * 0.008 * dampFactor;
  });

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Studio lighting */}
      <ambientLight intensity={0.18} color="#1A2430" />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#F4F7FA" />
      <directionalLight position={[-3, 2, 4]} intensity={0.45} color="#38D6FF" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#2F80ED" />

      {/* Device shell with subtle floating animation */}
      <group ref={deviceGroupRef}>
        <HeroDevice />

        {/* In-screen content — rendered on the screen surface plane (Z=+0.20) */}
        <group position={[0, 0, 0.20]}>
          <HeroScreenContent
            localProgress={localProgress}
            reducedMotion={shouldRenderStatic}
          />
        </group>
      </group>

      {/* Background system elements — behind the device */}
      <group position={[0, 0, -1.5]}>
        <DataLines nodeCount={10} lineOpacity={0.06} color="#00B4D8" />
        {CODE_FRAGMENTS.slice(0, 4).map((f, idx) => (
          <CodeFragment
            key={idx}
            content={f.content}
            position={f.pos}
            color="#D4AF37"
            opacity={0.10 + (idx % 3) * 0.04}
          />
        ))}
      </group>
    </group>
  );
}
