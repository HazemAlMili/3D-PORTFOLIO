import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { SCENE_03_COLORS, SDLC_STAGES } from "../../constants/scene03Config";
import { isMobileDevice } from "../../utils/mobileUtils";

interface DeliveryStageActionsProps {
  localProgress: number;
  opacity?: number;
  reducedMotion?: boolean;
}

export function DeliveryStageActions({
  localProgress,
  opacity = 1.0,
  reducedMotion = false,
}: DeliveryStageActionsProps) {
  const isMobile = useMemo(() => isMobileDevice(), []);

  // Hard Boundary Isolation: Stage actions must not render while localProgress <= 0.0 (Scene 02)
  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  return (
    <group>
      {SDLC_STAGES.map((stage) => {
        const pos = isMobile ? stage.mobilePosition : stage.position;
        const [activeStart, activeEnd] = stage.activeRange;

        const isReached = reducedMotion || localProgress >= activeStart;
        if (!isReached && opacity < 0.05 && stage.id !== "idea") return null;

        const stageProgress = reducedMotion
          ? 1.0
          : Math.max(0, Math.min(1, (localProgress - activeStart) / (activeEnd - activeStart || 1)));

        const isStageActive = !reducedMotion && localProgress >= activeStart && localProgress <= activeEnd;
        const isStageCompleted = reducedMotion || localProgress > activeEnd;

        return (
          <group key={`action-${stage.id}`} position={pos}>
            {stage.id === "idea" && (
              <IdeaAction
                localProgress={localProgress}
                stageProgress={stageProgress}
                isActive={isStageActive}
                isCompleted={isStageCompleted}
                opacity={opacity}
                reducedMotion={reducedMotion}
              />
            )}
            {stage.id === "architecture" && (
              <ArchitectureAction
                stageProgress={stageProgress}
                isCompleted={isStageCompleted}
                opacity={opacity}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
              />
            )}
            {stage.id === "build" && (
              <BuildAction
                stageProgress={stageProgress}
                isCompleted={isStageCompleted}
                opacity={opacity}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
              />
            )}
            {stage.id === "test" && (
              <TestAction
                stageProgress={stageProgress}
                isActive={isStageActive}
                isCompleted={isStageCompleted}
                opacity={opacity}
                reducedMotion={reducedMotion}
              />
            )}
            {stage.id === "deploy" && (
              <DeployAction
                stageProgress={stageProgress}
                isCompleted={isStageCompleted}
                opacity={opacity}
                reducedMotion={reducedMotion}
              />
            )}
            {stage.id === "monitor" && (
              <MonitorAction
                stageProgress={stageProgress}
                isActive={isStageActive}
                isCompleted={isStageCompleted}
                opacity={opacity}
                reducedMotion={reducedMotion}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 1: IDEA — Orb Ingestion -> Origin Seed Ignition & Concentric Pulse
// ─────────────────────────────────────────────────────────────────────────────
function IdeaAction({
  localProgress,
  stageProgress,
  isActive,
  isCompleted,
  opacity,
  reducedMotion,
}: {
  localProgress: number;
  stageProgress: number;
  isActive: boolean;
  isCompleted: boolean;
  opacity: number;
  reducedMotion: boolean;
}) {
  // Seed ignition wave activates when handoff orb arrives at IDEA gate (0.10 - 0.22)
  const isSeedIgniting = !reducedMotion && localProgress >= 0.10 && localProgress <= 0.22;
  const seedIgniteT = isSeedIgniting ? (localProgress - 0.10) / 0.12 : 0;
  const seedIgniteScale = 0.8 + seedIgniteT * 1.6;
  const seedIgniteOpacity = isSeedIgniting ? (1.0 - seedIgniteT) * 0.85 : 0;

  const signalScale = reducedMotion ? 1.0 : 1.0 + stageProgress * 1.2;
  const signalOpacity = reducedMotion ? 0.25 : isActive ? (1.0 - stageProgress) * 0.70 : isCompleted ? 0.15 : 0.0;

  return (
    <group>
      {/* Origin Seed Spark Core */}
      <mesh renderOrder={24}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial
          color={SCENE_03_COLORS.accentCyan}
          emissive={SCENE_03_COLORS.accentCyan}
          emissiveIntensity={isSeedIgniting ? 2.0 : isCompleted ? 0.40 : isActive ? 1.2 : 0.2}
          transparent
          opacity={opacity * (isCompleted ? 0.35 : isActive || isSeedIgniting ? 0.95 : 0.2)}
        />
      </mesh>

      {/* Initial Seed Ignition Ring (When Orb Lands at IDEA) */}
      {seedIgniteOpacity > 0.01 && (
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          scale={[seedIgniteScale, seedIgniteScale, seedIgniteScale]}
          renderOrder={23}
        >
          <ringGeometry args={[0.12, 0.15, 32]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.accentCyan}
            transparent
            opacity={opacity * seedIgniteOpacity}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Stage Active Signal Wave Ring */}
      {signalOpacity > 0.01 && (
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          scale={[signalScale, signalScale, signalScale]}
          renderOrder={23}
        >
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.accentCyan}
            transparent
            opacity={opacity * signalOpacity}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 2: ARCHITECTURE — Blueprint Line Drawing & Topology Brackets
// ─────────────────────────────────────────────────────────────────────────────
function ArchitectureAction({
  stageProgress,
  isCompleted,
  opacity,
  isMobile,
  reducedMotion,
}: {
  stageProgress: number;
  isCompleted: boolean;
  opacity: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const drawT = reducedMotion ? 1.0 : isCompleted ? 1.0 : stageProgress;
  const lineOpacity = opacity * (isCompleted ? 0.30 : 0.85);

  // 4 Blueprint corner bracket lines surrounding the gate (2 on mobile)
  const len = 0.18 * drawT;
  const offset = 0.14;

  const brackets = useMemo<[number, number, number][][]>(() => {
    if (isMobile) {
      return [
        [[-offset, offset, 0], [-offset + len, offset, 0]],
        [[offset, -offset, 0], [offset - len, -offset, 0]],
      ];
    }
    return [
      [[-offset, offset, 0], [-offset + len, offset, 0]],
      [[-offset, offset, 0], [-offset, offset - len, 0]],
      [[offset, -offset, 0], [offset - len, -offset, 0]],
      [[offset, -offset, 0], [offset, -offset + len, 0]],
    ];
  }, [isMobile, len]);

  return (
    <group>
      {brackets.map((pts, idx) => (
        <Line
          key={idx}
          points={pts}
          color={SCENE_03_COLORS.accentCyan}
          lineWidth={1.5}
          transparent
          opacity={lineOpacity}
        />
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 3: BUILD — Modular Assembly Block Cluster
// ─────────────────────────────────────────────────────────────────────────────
function BuildAction({
  stageProgress,
  isCompleted,
  opacity,
  isMobile,
  reducedMotion,
}: {
  stageProgress: number;
  isCompleted: boolean;
  opacity: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const assembleT = reducedMotion ? 1.0 : isCompleted ? 1.0 : stageProgress;
  const blockOpacity = opacity * (isCompleted ? 0.35 : 0.90);

  // Inward snap offset: starts at 0.28, locks inward to 0.13
  const currentOffset = 0.28 - assembleT * 0.15;

  const blockPositions = useMemo<[number, number, number][]>(() => {
    if (isMobile) {
      return [
        [-currentOffset, currentOffset, 0],
        [currentOffset, -currentOffset, 0],
      ];
    }
    return [
      [-currentOffset, currentOffset, 0.05],
      [currentOffset, currentOffset, -0.05],
      [0.0, -currentOffset - 0.02, 0.0],
    ];
  }, [isMobile, currentOffset]);

  return (
    <group>
      {blockPositions.map((pos, idx) => (
        <mesh key={idx} position={pos} renderOrder={25}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial
            color={SCENE_03_COLORS.accentBlue}
            emissive={SCENE_03_COLORS.accentBlue}
            emissiveIntensity={isCompleted ? 0.3 : 1.2}
            transparent
            opacity={blockOpacity}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 4: TEST — Optical Scan Plane Verification Sweep
// ─────────────────────────────────────────────────────────────────────────────
function TestAction({
  stageProgress,
  isActive,
  isCompleted,
  opacity,
  reducedMotion,
}: {
  stageProgress: number;
  isActive: boolean;
  isCompleted: boolean;
  opacity: number;
  reducedMotion: boolean;
}) {
  // Vertical scan line sweeps from Y = +0.22 down to Y = -0.22
  const scanY = reducedMotion ? 0.0 : 0.22 - stageProgress * 0.44;
  const scanOpacity = reducedMotion ? 0.25 : isActive ? 0.90 : 0.0;

  return (
    <group>
      {/* Sweeping Scan Line */}
      {scanOpacity > 0.01 && (
        <Line
          points={[[-0.24, scanY, 0], [0.24, scanY, 0]]}
          color={SCENE_03_COLORS.accentCyan}
          lineWidth={2.4}
          transparent
          opacity={opacity * scanOpacity}
        />
      )}

      {/* Verification Indicator Ring Mark */}
      {isCompleted && (
        <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={23}>
          <ringGeometry args={[0.20, 0.21, 32]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.accentCyan}
            transparent
            opacity={opacity * 0.20}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 5: DEPLOY — Forward Release Conduit Gate Opening
// ─────────────────────────────────────────────────────────────────────────────
function DeployAction({
  stageProgress,
  isCompleted,
  opacity,
  reducedMotion,
}: {
  stageProgress: number;
  isCompleted: boolean;
  opacity: number;
  reducedMotion: boolean;
}) {
  const releaseT = reducedMotion ? 1.0 : isCompleted ? 1.0 : stageProgress;
  const rayLen = 0.4 * releaseT;
  const rayOpacity = opacity * (isCompleted ? 0.35 : 0.90);

  return (
    <group>
      {/* Forward Release Ray Vector */}
      {rayLen > 0.02 && (
        <Line
          points={[[0, 0, 0], [0.15 * releaseT, -0.05 * releaseT, -rayLen]]}
          color={SCENE_03_COLORS.accentGold}
          lineWidth={2.2}
          transparent
          opacity={rayOpacity}
          dashed
          dashScale={12}
          dashSize={0.1}
          gapSize={0.05}
        />
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 6: MONITOR — Telemetry Feedback Arc Loop
// ─────────────────────────────────────────────────────────────────────────────
function MonitorAction({
  stageProgress,
  isActive,
  isCompleted,
  opacity,
  reducedMotion,
}: {
  stageProgress: number;
  isActive: boolean;
  isCompleted: boolean;
  opacity: number;
  reducedMotion: boolean;
}) {
  const arcGroupRef = useRef<THREE.Group>(null);
  const arcLength = reducedMotion ? Math.PI * 1.5 : (isCompleted ? Math.PI * 1.5 : stageProgress * Math.PI * 1.5);
  const arcOpacity = opacity * (isCompleted ? 0.40 : isActive ? 0.90 : 0.15);

  useFrame((state) => {
    if (reducedMotion || !arcGroupRef.current) return;
    arcGroupRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <group ref={arcGroupRef}>
      {/* Outer Telemetry Circular Arc */}
      {arcLength > 0.1 && (
        <mesh rotation={[0, 0, 0]} renderOrder={25}>
          <ringGeometry args={[0.22, 0.24, 32, 1, 0, arcLength]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.accentCyan}
            transparent
            opacity={arcOpacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Telemetry Indicator Node Blip */}
      {isCompleted && (
        <mesh position={[0.23, 0.0, 0.0]} renderOrder={26}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.accentCyan}
            transparent
            opacity={opacity * 0.5}
          />
        </mesh>
      )}
    </group>
  );
}
