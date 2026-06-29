import { Text } from "@react-three/drei";
import { SCENE_06_COLORS, SCENE_06_SUB_PHASES } from "../constants/scene06Config";

interface LoadingStateDemoProps {
  localProgress?: number;
}

export function LoadingStateDemo({ localProgress = 0 }: LoadingStateDemoProps) {
  // Normalize scroll progression inside Scene 06 immerse hold phase [0.55, 0.88]
  const [immerseStart, immerseEnd] = SCENE_06_SUB_PHASES.immerse;
  const t = Math.min(1, Math.max(0, (localProgress - immerseStart) / (immerseEnd - immerseStart)));

  // Resolve loading parameters
  const isDeferred = t < 0.30;
  const isLoading = t >= 0.30 && t < 0.65;
  const isLoaded = t >= 0.65;

  let statusText = "LAZY LOAD: DEFERRED";
  let textColor: string = SCENE_06_COLORS.textSecondary;
  let progressRatio = 0;

  if (isDeferred) {
    statusText = "LAZY LOAD: DEFERRED";
    textColor = SCENE_06_COLORS.textSecondary;
    progressRatio = 0.05;
  } else if (isLoading) {
    const percent = Math.min(99, Math.round(((t - 0.3) / 0.35) * 100));
    statusText = `STREAMING MODULES... [${percent}%]`;
    textColor = SCENE_06_COLORS.accentCyan;
    progressRatio = (t - 0.3) / 0.35;
  } else {
    statusText = "SYSTEM STABLE [100%]";
    textColor = "#48BB78"; // active green
    progressRatio = 1.0;
  }

  const barWidth = 1.2;

  return (
    <group>
      {/* Background container panel */}
      <mesh>
        <planeGeometry args={[1.5, 0.22]} />
        <meshBasicMaterial color="#0A0D14" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[1.52, 0.24]} />
        <meshBasicMaterial color={isLoaded ? "#1E2530" : "#1A202C"} />
      </mesh>

      {/* Loading Status Text */}
      <Text
        position={[-0.6, 0.04, 0.002]}
        fontSize={0.034}
        color={textColor}
        fontWeight="bold"
        anchorX="left"
        anchorY="middle"
      >
        {statusText}
      </Text>

      {/* Progress Bar background track */}
      <mesh position={[0, -0.05, 0.002]}>
        <planeGeometry args={[barWidth, 0.008]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>

      {/* Progress Bar active track */}
      {progressRatio > 0 && (
        <mesh
          position={[-barWidth / 2 + (barWidth * progressRatio) / 2, -0.05, 0.003]}
        >
          <planeGeometry args={[barWidth * progressRatio, 0.008]} />
          <meshBasicMaterial color={isLoaded ? "#48BB78" : SCENE_06_COLORS.accentCyan} />
        </mesh>
      )}
    </group>
  );
}
export default LoadingStateDemo;
