import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";
import { SCENE01_COLORS } from "../../constants/scene01Config";
import { SystemBootMotionState, normalizeRange } from "./systemBootMotion";

interface SystemBootLayersProps {
  motion: SystemBootMotionState;
}

interface LayerDefinition {
  name: string;
  y: number;
  color: string;
  angle: number;
}

const LAYERS: LayerDefinition[] = [
  { name: "DEPLOY",   y: -0.55, color: SCENE01_COLORS.deepBlue,   angle: Math.PI * 0.1 },
  { name: "DATABASE", y: -0.28, color: SCENE01_COLORS.accentCyan, angle: Math.PI * 0.5 },
  { name: "BACKEND",  y: 0.0,   color: SCENE01_COLORS.softCyan,   angle: Math.PI * 0.9 },
  { name: "API",      y: 0.28,  color: SCENE01_COLORS.accentCyan, angle: Math.PI * 1.3 },
  { name: "FRONTEND", y: 0.55,  color: SCENE01_COLORS.primaryText, angle: Math.PI * 1.7 },
];

export function SystemBootLayers({ motion }: SystemBootLayersProps) {
  const groupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  useFrame((state) => {
    if (reducedMotion) return;
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.025;
    }
  });

  // Base layers opacity: fades out during systemLock / portalOpen
  const baseOpacity = reducedMotion ? 1.0 : (1.0 - motion.systemLock);

  if (baseOpacity <= 0.005) return null;

  return (
    <group ref={groupRef}>
      {/* Connecting vertical rails */}
      {Array.from({ length: 3 }).map((_, idx) => {
        const angle = (idx / 3) * Math.PI * 2;
        const r = 0.95;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const height = 1.2 * (1.0 - motion.systemLock);

        return (
          <mesh key={idx} position={[x, 0, z]} renderOrder={14}>
            <boxGeometry args={[0.004, height, 0.004]} />
            <meshBasicMaterial
              color={SCENE01_COLORS.mutedSlate}
              transparent
              opacity={baseOpacity * motion.layersOnline * 0.12}
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {LAYERS.map((layer, idx) => {
        // Reverse stagger order: FRONTEND (idx 4) -> API (3) -> BACKEND (2) -> DB (1) -> DEPLOY (0)
        const staggerIdx = 4 - idx;
        const revealStart = staggerIdx * 0.14; // slightly wider spacing to show overlap clearly
        const revealEnd = Math.min(1.0, revealStart + 0.32);
        
        const finalReveal = reducedMotion 
          ? 1.0 
          : normalizeRange(motion.layersOnline, revealStart, revealEnd);

        // Collapse layers into Y=0 and scale down to 0 during systemLock (0.70 – 0.82)
        const collapseY = layer.y * (1.0 - motion.systemLock);
        const ringScale = 0.95 * (1.0 - motion.systemLock);
        const currentOpacity = baseOpacity * finalReveal;

        if (currentOpacity <= 0.005) return null;

        // Step-based sequential progress calculations per layer
        const structureProgress = reducedMotion ? 1.0 : normalizeRange(finalReveal, 0.0, 0.5);
        const connectionProgress = reducedMotion ? 1.0 : normalizeRange(finalReveal, 0.4, 0.8);
        const labelProgress = reducedMotion ? 1.0 : normalizeRange(finalReveal, 0.7, 1.0);

        // Calculate label positions (slides outward dynamically as label progress advances)
        const labelDist = ringScale + 0.12 * labelProgress;
        const labelX = Math.cos(layer.angle) * labelDist;
        const labelZ = Math.sin(layer.angle) * labelDist;

        // Spoke spoke geometry calculations
        const spokeLength = ringScale * connectionProgress;
        const spokeX = Math.cos(layer.angle) * (spokeLength / 2);
        const spokeZ = Math.sin(layer.angle) * (spokeLength / 2);

        return (
          <group key={layer.name} position={[0, collapseY, 0]}>
            {/* Horizontal layer ring (sweeps around theta length) */}
            <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={15}>
              <ringGeometry args={[ringScale - 0.006, ringScale, 48, 1, 0, Math.PI * 2 * structureProgress]} />
              <meshBasicMaterial
                color={layer.color}
                transparent
                opacity={currentOpacity * 0.35}
                depthWrite={false}
              />
            </mesh>

            {/* Subtle wireframe grid interior (sweeps matching the outer ring) */}
            <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={14}>
              <ringGeometry args={[0, ringScale - 0.008, 16, 1, 0, Math.PI * 2 * structureProgress]} />
              <meshBasicMaterial
                color={layer.color}
                transparent
                opacity={currentOpacity * 0.03 * structureProgress}
                wireframe
                depthWrite={false}
              />
            </mesh>

            {/* Radial spoke connecting ring to outer label (extends outward) */}
            {connectionProgress > 0.01 && (
              <mesh
                position={[spokeX, 0, spokeZ]}
                rotation={[0, -layer.angle, 0]}
                renderOrder={14}
              >
                <boxGeometry args={[spokeLength, 0.003, 0.003]} />
                <meshBasicMaterial
                  color={layer.color}
                  transparent
                  opacity={currentOpacity * 0.18 * connectionProgress}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* Pulsing connection light (pulses from label inwards to core) */}
            {!reducedMotion && connectionProgress > 0.1 && (
              <mesh
                position={[
                  spokeX * (1.0 - motion.layersOnline),
                  0,
                  spokeZ * (1.0 - motion.layersOnline)
                ]}
                rotation={[0, -layer.angle, 0]}
                renderOrder={15}
              >
                <boxGeometry args={[0.08, 0.006, 0.006]} />
                <meshBasicMaterial
                  color={layer.color}
                  transparent
                  opacity={currentOpacity * 0.6 * connectionProgress}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* Layer label (fades and slides outward progressively) */}
            {labelProgress > 0.01 && (
              <group position={[labelX, 0, labelZ]}>
                <Text
                  fontSize={0.06}
                  color={layer.color}
                  anchorX="center"
                  anchorY="middle"
                  fillOpacity={currentOpacity * 0.8 * labelProgress}
                  renderOrder={16}
                  material-depthTest={true}
                  material-depthWrite={false}
                >
                  {layer.name}
                </Text>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}
