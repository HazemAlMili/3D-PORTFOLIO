import { Text } from "@react-three/drei";
import { SCENE_06_COLORS, SCENE_06_SUB_PHASES } from "../constants/scene06Config";
import { BreakpointIndicator } from "./BreakpointIndicator";
import { LoadingStateDemo } from "./LoadingStateDemo";

interface ResponsiveLayoutMorphProps {
  localProgress?: number;
}

export function ResponsiveLayoutMorph({ localProgress = 0 }: ResponsiveLayoutMorphProps) {
  // Normalize scroll progression inside Scene 06 immerse hold phase [0.55, 0.88]
  const [immerseStart, immerseEnd] = SCENE_06_SUB_PHASES.immerse;
  const t = Math.min(1, Math.max(0, (localProgress - immerseStart) / (immerseEnd - immerseStart)));

  // Resolve loading parameter
  const isLoaded = t >= 0.65;
  const shimmerOpacity = 0.25 + 0.1 * Math.sin(t * 40);

  // Interpolated layout calculations (desktop grid -> mobile stack)
  
  // 1. Sidebar / Bottom Nav
  // Desktop: X = -0.55, Y = 0.2, W = 0.35, H = 1.5
  // Mobile: X = 0, Y = -1.25, W = 1.5, H = 0.25
  const sbX = -0.55 * (1 - t);
  const sbY = 0.2 * (1 - t) - 1.25 * t;
  const sbW = 0.35 * (1 - t) + 1.5 * t;
  const sbH = 1.5 * (1 - t) + 0.25 * t;

  // 2. Module A
  // Desktop: X = -0.08, Y = 0.6, W = 0.48, H = 0.6
  // Mobile: X = 0, Y = 0.8, W = 1.5, H = 0.4
  const mA_X = -0.08 * (1 - t);
  const mA_Y = 0.6 * (1 - t) + 0.8 * t;
  const mA_W = 0.48 * (1 - t) + 1.5 * t;
  const mA_H = 0.6 * (1 - t) + 0.4 * t;

  // 3. Module B
  // Desktop: X = 0.44, Y = 0.6, W = 0.48, H = 0.6
  // Mobile: X = 0, Y = 0.3, W = 1.5, H = 0.4
  const mB_X = 0.44 * (1 - t);
  const mB_Y = 0.6 * (1 - t) + 0.3 * t;
  const mB_W = 0.48 * (1 - t) + 1.5 * t;
  const mB_H = 0.6 * (1 - t) + 0.4 * t;

  // 4. Module C
  // Desktop: X = 0.18, Y = -0.1, W = 1.0, H = 0.6
  // Mobile: X = 0, Y = -0.2, W = 1.5, H = 0.4
  const mC_X = 0.18 * (1 - t);
  const mC_Y = -0.1 * (1 - t) - 0.2 * t;
  const mC_W = 1.0 * (1 - t) + 1.5 * t;
  const mC_H = 0.6 * (1 - t) + 0.4 * t;

  // 5. Simulated Viewport Label (width changes)
  const simulatedWidth = Math.round(1440 - t * (1440 - 412));

  return (
    <group>
      {/* Viewport Scale Indicator */}
      <Text
        position={[0, 1.62, 0.01]}
        fontSize={0.038}
        color={SCENE_06_COLORS.textSecondary}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {`VIEWPORT: ${simulatedWidth}px`}
      </Text>

      {/* Header Block (Fixed responsive banner) */}
      <group position={[0, 1.35, 0.01]}>
        <mesh>
          <planeGeometry args={[1.5, 0.2]} />
          <meshBasicMaterial color="#1E293B" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[1.52, 0.22]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.036}
          color={SCENE_06_COLORS.textPrimary}
          fontWeight="bold"
        >
          {t > 0.5 ? "NAV" : "APPLICATION HEADER"}
        </Text>
      </group>

      {/* Breakpoint Indicator segmented bar and track slider */}
      <group position={[0, 1.12, 0.01]}>
        <BreakpointIndicator localProgress={localProgress} />
      </group>

      {/* Sidebar / Bottom Nav Block */}
      <group position={[sbX, sbY, 0.01]}>
        <mesh>
          <planeGeometry args={[sbW, sbH]} />
          <meshBasicMaterial color="#0F172A" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[sbW + 0.02, sbH + 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.035}
          color={SCENE_06_COLORS.accentCyan}
          fontWeight="bold"
        >
          {t > 0.5 ? "BOTTOM TABS" : "SIDEBAR"}
        </Text>
      </group>

      {/* Module A */}
      <group position={[mA_X, mA_Y, 0.01]}>
        <mesh>
          <planeGeometry args={[mA_W, mA_H]} />
          <meshBasicMaterial
            color={isLoaded ? "#1E293B" : "#0F172A"}
            transparent
            opacity={isLoaded ? 0.9 : shimmerOpacity}
          />
        </mesh>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[mA_W + 0.02, mA_H + 0.02]} />
          <meshBasicMaterial
            color={SCENE_06_COLORS.accentBlue}
            transparent
            opacity={isLoaded ? 1.0 : 0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.034}
          color={isLoaded ? SCENE_06_COLORS.textPrimary : "#475569"}
          fontWeight="bold"
        >
          {isLoaded
            ? t > 0.75
              ? "MODULE A (STACKED)"
              : "MODULE A ACTIVE"
            : "[SKELETON PENDING...]"}
        </Text>
      </group>

      {/* Module B */}
      <group position={[mB_X, mB_Y, 0.01]}>
        <mesh>
          <planeGeometry args={[mB_W, mB_H]} />
          <meshBasicMaterial
            color={isLoaded ? "#1E293B" : "#0F172A"}
            transparent
            opacity={isLoaded ? 0.9 : shimmerOpacity}
          />
        </mesh>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[mB_W + 0.02, mB_H + 0.02]} />
          <meshBasicMaterial
            color={SCENE_06_COLORS.accentBlue}
            transparent
            opacity={isLoaded ? 1.0 : 0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.034}
          color={isLoaded ? SCENE_06_COLORS.textPrimary : "#475569"}
          fontWeight="bold"
        >
          {isLoaded
            ? t > 0.75
              ? "MODULE B (STACKED)"
              : "MODULE B ACTIVE"
            : "[SKELETON PENDING...]"}
        </Text>
      </group>

      {/* Module C */}
      <group position={[mC_X, mC_Y, 0.01]}>
        <mesh>
          <planeGeometry args={[mC_W, mC_H]} />
          <meshBasicMaterial
            color={isLoaded ? "#1E293B" : "#0F172A"}
            transparent
            opacity={isLoaded ? 0.9 : shimmerOpacity}
          />
        </mesh>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[mC_W + 0.02, mC_H + 0.02]} />
          <meshBasicMaterial
            color={SCENE_06_COLORS.accentBlue}
            transparent
            opacity={isLoaded ? 1.0 : 0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.034}
          color={isLoaded ? SCENE_06_COLORS.textPrimary : "#475569"}
          fontWeight="bold"
        >
          {isLoaded
            ? t > 0.75
              ? "MODULE C (STACKED)"
              : "MODULE C ACTIVE"
            : "[SKELETON PENDING...]"}
        </Text>
      </group>

      {/* Loading State Demo Widget */}
      <group position={[0, -0.75, 0.01]}>
        <LoadingStateDemo localProgress={localProgress} />
      </group>
    </group>
  );
}
export default ResponsiveLayoutMorph;
