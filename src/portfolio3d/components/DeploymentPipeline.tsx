import { Text } from "@react-three/drei";
import { SCENE_07_COLORS, SCENE_07_SUB_PHASES } from "../constants/scene07Config";

interface DeploymentPipelineProps {
  localProgress?: number;
}

const PIPELINE_STAGES = [
  { id: "build",  label: "BUILD",   x: -0.9 },
  { id: "test",   label: "TEST",    x: -0.3 },
  { id: "deploy", label: "DEPLOY",  x:  0.3 },
  { id: "live",   label: "LIVE",    x:  0.9 },
] as const;

const STAGE_COUNT = PIPELINE_STAGES.length;
const Y = -0.72; // horizontal strip below the main cluster
const Z = 0.10;  // slight Z so it renders in front of the base plane

export function DeploymentPipeline({ localProgress = 0 }: DeploymentPipelineProps) {
  // Map Scene 07 immerse phase [0.55, 0.88] → deployT ∈ [0, 1]
  // Use a slightly later ramp than ApiRoutePulse so the two visuals feel sequential
  const [immerseStart, immerseEnd] = SCENE_07_SUB_PHASES.immerse;
  const immerseT = Math.min(1, Math.max(0, (localProgress - immerseStart) / (immerseEnd - immerseStart)));

  // Delay onset by 0.15 so it fades in after the API pulse begins
  const deployT = Math.min(1, Math.max(0, (immerseT - 0.15) / 0.85));

  const overallOpacity = Math.min(1.0, deployT * 4.0) * (1 - Math.max(0, (deployT - 0.85) / 0.15));

  // Packet position on the horizontal strip
  const stageProgress = deployT * (STAGE_COUNT - 1); // 0 → 3
  const packetX = PIPELINE_STAGES[0].x + (PIPELINE_STAGES[STAGE_COUNT - 1].x - PIPELINE_STAGES[0].x) * deployT;
  const activeStageIdx = Math.min(STAGE_COUNT - 1, Math.floor(stageProgress));

  if (overallOpacity < 0.01) return null;

  return (
    <group position={[0, Y, Z]}>
      {/* Pipeline background track */}
      {PIPELINE_STAGES.slice(0, -1).map((stage, i) => {
        const nextStage = PIPELINE_STAGES[i + 1];
        const midX = (stage.x + nextStage.x) / 2;
        const segW = Math.abs(nextStage.x - stage.x);
        const isPassed = i < activeStageIdx;
        const isActive = i === activeStageIdx;
        return (
          <mesh key={`seg-${i}`} position={[midX, 0, -0.002]}>
            <planeGeometry args={[segW, 0.012]} />
            <meshBasicMaterial
              color={isActive || isPassed ? SCENE_07_COLORS.accentCyan : "#1E3A5F"}
              transparent
              opacity={overallOpacity * (isActive ? 0.9 : isPassed ? 0.6 : 0.25)}
            />
          </mesh>
        );
      })}

      {/* Stage nodes */}
      {PIPELINE_STAGES.map((stage, i) => {
        const isActive = i === activeStageIdx;
        const isPassed = i < activeStageIdx;
        const nodeColor = isActive
          ? SCENE_07_COLORS.accentCyan
          : isPassed
          ? "#38BDF8"
          : "#1D4ED8";
        const nodeSize = isActive ? 0.055 : 0.038;

        return (
          <group key={stage.id} position={[stage.x, 0, 0]}>
            {/* Node circle */}
            <mesh>
              <circleGeometry args={[nodeSize, 12]} />
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={overallOpacity * (isActive ? 1.0 : isPassed ? 0.7 : 0.35)}
              />
            </mesh>

            {/* Glow ring on active node */}
            {isActive && (
              <mesh>
                <ringGeometry args={[nodeSize + 0.008, nodeSize + 0.022, 12]} />
                <meshBasicMaterial
                  color={SCENE_07_COLORS.accentCyan}
                  transparent
                  opacity={overallOpacity * 0.4}
                />
              </mesh>
            )}

            {/* Stage label */}
            <Text
              position={[0, -0.09, 0.001]}
              fontSize={0.045}
              color={isActive ? SCENE_07_COLORS.textPrimary : SCENE_07_COLORS.textSecondary}
              fontWeight={isActive ? "bold" : "normal"}
              anchorX="center"
              anchorY="top"
            >
              {stage.label}
            </Text>
          </group>
        );
      })}

      {/* Travelling pipeline marker */}
      <mesh position={[packetX, 0, 0.004]}>
        <circleGeometry args={[0.03, 10]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={overallOpacity * 0.85}
        />
      </mesh>

      {/* Small section header */}
      <Text
        position={[0, 0.13, 0.001]}
        fontSize={0.038}
        color={SCENE_07_COLORS.textSecondary}
        anchorX="center"
        anchorY="bottom"
      >
        DEPLOYMENT PATH
      </Text>
    </group>
  );
}
export default DeploymentPipeline;
