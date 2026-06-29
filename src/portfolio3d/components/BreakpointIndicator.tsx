import { Text } from "@react-three/drei";
import { SCENE_06_COLORS, SCENE_06_SUB_PHASES } from "../constants/scene06Config";

interface BreakpointIndicatorProps {
  localProgress?: number;
}

export function BreakpointIndicator({ localProgress = 0 }: BreakpointIndicatorProps) {
  // Normalize scroll progression inside Scene 06 immerse hold phase [0.55, 0.88]
  const [immerseStart, immerseEnd] = SCENE_06_SUB_PHASES.immerse;
  const t = Math.min(1, Math.max(0, (localProgress - immerseStart) / (immerseEnd - immerseStart)));

  // Identify active breakpoint state
  const isDesktop = t < 0.33;
  const isTablet = t >= 0.33 && t < 0.66;
  const isMobile = t >= 0.66;

  // Horizontal position of the active slider dot (-0.5 to 0.5)
  const sliderX = -0.5 + t * 1.0;

  return (
    <group>
      {/* Segment Labels */}
      <Text
        position={[-0.5, 0.06, 0]}
        fontSize={0.034}
        color={isDesktop ? SCENE_06_COLORS.accentCyan : "#475569"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        DESKTOP
      </Text>

      <Text
        position={[0, 0.06, 0]}
        fontSize={0.034}
        color={isTablet ? SCENE_06_COLORS.accentCyan : "#475569"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        TABLET
      </Text>

      <Text
        position={[0.5, 0.06, 0]}
        fontSize={0.034}
        color={isMobile ? SCENE_06_COLORS.accentCyan : "#475569"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        MOBILE
      </Text>

      {/* Breakpoint Bar track */}
      <mesh position={[0, -0.05, 0]}>
        <planeGeometry args={[1.2, 0.008]} />
        <meshBasicMaterial color="#334155" />
      </mesh>

      {/* Indicator slider node */}
      <mesh position={[sliderX, -0.05, 0.001]}>
        <circleGeometry args={[0.024, 16]} />
        <meshBasicMaterial color={SCENE_06_COLORS.accentCyan} />
      </mesh>
    </group>
  );
}
export default BreakpointIndicator;
