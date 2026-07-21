import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { LaptopDevice } from "../components/LaptopDevice";
import { Scene04ProjectsGreybox } from "../components/Scene04ProjectsGreybox";
import {
  SCENE_04_SUB_PHASES,
  SCENE_04_COLORS,
} from "../constants/scene04Config";
import { usePortfolioStore } from "../store/portfolioStore";

interface Scene04ProjectsProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

export function Scene04Projects({ sceneId, sceneIndex, localProgress, opacity = 1.0 }: Scene04ProjectsProps) {
  const deviceGroupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // Transition budget check
  const shouldRenderHeavy = opacity > 0.02;
  const shouldAnimate = opacity > 0.05;
  const shouldRenderStatic = reducedMotion === true || !shouldAnimate;

  const [enterStart] = SCENE_04_SUB_PHASES.enter;
  const [immerseStart] = SCENE_04_SUB_PHASES.immerse;

  // Smooth approach opacity from localProgress = 0.00 for seamless handoff reception
  const approachOpacity = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, localProgress / (enterStart || 0.01)));

  // Handoff arrival pulse (0.00 - 0.22)
  const arrivalPulseT = Math.max(0, Math.min(1, localProgress / 0.22));
  const arrivalGlowOpa = (1.0 - arrivalPulseT) * opacity;

  // Legacy laptop receiving dock is disabled (dockOpacity = 0.0) to ensure zero obsolete laptop meshes in Scene 04
  const dockOpacity = 0.0;

  useFrame((state) => {
    if (!shouldRenderHeavy || shouldRenderStatic || dockOpacity <= 0.005 || !deviceGroupRef.current) return;

    const p = localProgress;
    const t = state.clock.getElapsedTime();

    // Damps out laptop breathing float animation when camera approaches ring
    const dampFactor = p < enterStart
      ? 1
      : Math.max(0, 1 - (p - enterStart) / (immerseStart - enterStart));

    deviceGroupRef.current.position.y = Math.sin(t * 0.8) * 0.02 * dampFactor;
    deviceGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.01 * dampFactor;
    deviceGroupRef.current.rotation.x = Math.cos(t * 0.5) * 0.005 * dampFactor;
  });

  if (!shouldRenderHeavy) return null;

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to Scene 04 Gallery environment — P10 visual language */}
      <ambientLight intensity={0.25 * approachOpacity} color={SCENE_04_COLORS.galleryBg} />
      <directionalLight position={[4, 6, 4]} intensity={1.20 * approachOpacity} color="#FFFFFF" />
      <directionalLight position={[-4, 3, 2]} intensity={0.60 * approachOpacity} color={SCENE_04_COLORS.accentCyan} />
      <pointLight position={[0.95, 0.5, 2.0]} intensity={0.80 * approachOpacity} color={SCENE_04_COLORS.accentCyan} />
      {localProgress >= 0.60 && localProgress <= 0.90 && (
        <pointLight position={[1.35, 0.2, 0.8]} intensity={0.50 * approachOpacity} color={SCENE_04_COLORS.accentGold} />
      )}

      {/* 1. Spatial Connected Project Screen Ring Environment */}
      <Scene04ProjectsGreybox localProgress={localProgress} opacity={opacity} />

      {/* 2. Scene 03 Incoming Handoff Receiving Dock (unmounts completely after dock phase ends) */}
      {dockOpacity > 0.005 && (
        <group ref={deviceGroupRef}>
          <LaptopDevice opacity={dockOpacity} />

          {/* Handoff Arrival Receiver Node (0.00 - 0.22) */}
          {arrivalGlowOpa > 0.01 && (
            <group position={[0, 0.4, 0.12]}>
              <mesh renderOrder={30}>
                <sphereGeometry args={[0.024, 12, 12]} />
                <meshBasicMaterial color={SCENE_04_COLORS.accentGold} transparent opacity={arrivalGlowOpa * 0.90} />
              </mesh>
              <mesh renderOrder={29} scale={[1 + arrivalPulseT * 1.5, 1 + arrivalPulseT * 1.5, 1]}>
                <torusGeometry args={[0.12, 0.004, 8, 32]} />
                <meshBasicMaterial color={SCENE_04_COLORS.accentCyan} transparent opacity={arrivalGlowOpa * 0.75} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* 3. Reference Debug Anchors (Gated behind ?s04debug=true) */}
      {typeof window !== "undefined" && window.location.search.includes("s04debug=true") && approachOpacity > 0.05 && (
        <group name="s04_p02_reference_anchors">
          {/* Handoff Dock Anchor */}
          <mesh position={[0.0, 0.4, 0.10]} scale={[0.06, 0.06, 0.06]}>
            <boxGeometry />
            <meshBasicMaterial color="#38D6FF" wireframe />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default Scene04Projects;
