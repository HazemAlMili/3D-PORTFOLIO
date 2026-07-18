import { useMemo } from "react";
import { SCENE_03_COLORS, SDLC_STAGES } from "../../constants/scene03Config";
import { isMobileDevice } from "../../utils/mobileUtils";

interface DeliveryStageGatesProps {
  localProgress: number;
  opacity?: number;
  reducedMotion?: boolean;
}

export function DeliveryStageGates({
  localProgress,
  opacity = 1.0,
  reducedMotion = false,
}: DeliveryStageGatesProps) {
  const isMobile = useMemo(() => isMobileDevice(), []);

  // Hard Boundary Isolation: Gate frames must not render while localProgress <= 0.0 (Scene 02)
  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  return (
    <group>
      {SDLC_STAGES.map((stage) => {
        const pos = isMobile ? stage.mobilePosition : stage.position;
        const [activeStart, activeEnd] = stage.activeRange;

        // 4 Causal Gate Activation States:
        // 1. dormant    : localProgress < activeStart - 0.05
        // 2. approaching: activeStart - 0.05 <= localProgress < activeStart
        // 3. active     : activeStart <= localProgress <= activeEnd
        // 4. completed  : localProgress > activeEnd
        const isDormant = !reducedMotion && localProgress < activeStart - 0.05;
        const isApproaching = !reducedMotion && localProgress >= activeStart - 0.05 && localProgress < activeStart;
        const isActive = reducedMotion || (localProgress >= activeStart && localProgress <= activeEnd);
        const isCompleted = !reducedMotion && localProgress > activeEnd;

        // Visual properties derived from activation state
        let ringOpacity = 0.18;
        let ringEmissive = 0.10;
        let innerRadius = 0.06;
        let innerEmissive = 0.08;
        let innerColor: string = SCENE_03_COLORS.nodeBorder;
        let gateScale = 1.0;

        if (isApproaching) {
          const appT = (localProgress - (activeStart - 0.05)) / 0.05;
          ringOpacity = 0.18 + appT * 0.35;
          ringEmissive = 0.10 + appT * 0.40;
          innerRadius = 0.06 + appT * 0.02;
          innerColor = stage.color;
          gateScale = 1.0 + appT * 0.06;
        } else if (isActive) {
          const activeT = (localProgress - activeStart) / (activeEnd - activeStart || 1);
          ringOpacity = 1.0;
          ringEmissive = 1.8;
          innerRadius = 0.09 + Math.sin(activeT * Math.PI) * 0.025;
          innerEmissive = 1.8;
          innerColor = stage.color;
          gateScale = 1.1 + Math.sin(activeT * Math.PI) * 0.08;
        } else if (isCompleted) {
          // Completed gates settle into quiet static background proof anchors
          ringOpacity = 0.45;
          ringEmissive = 0.40;
          innerRadius = 0.075;
          innerEmissive = 0.50;
          innerColor = stage.color;
          gateScale = 1.0;
        }

        if (isDormant) {
          ringOpacity = 0.18;
          ringEmissive = 0.10;
          innerRadius = 0.06;
          innerEmissive = 0.08;
          innerColor = SCENE_03_COLORS.nodeBorder;
          gateScale = 1.0;
        }

        const finalOpacity = opacity * ringOpacity;

        // Expanding energy wave pulse during active state
        const activeWaveT = isActive && !reducedMotion
          ? (localProgress - activeStart) / (activeEnd - activeStart || 1)
          : 0;
        const waveScale = 1.0 + activeWaveT * 1.5;
        const waveOpacity = isActive && !reducedMotion ? (1.0 - activeWaveT) * 0.55 : 0;

        return (
          <group key={stage.id} position={pos} scale={[gateScale, gateScale, gateScale]}>
            {/* Outer Torus / Gate Ring Frame */}
            <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={20}>
              <torusGeometry args={[0.18, 0.02, 16, 32]} />
              <meshStandardMaterial
                color={stage.color}
                emissive={stage.color}
                emissiveIntensity={ringEmissive}
                transparent
                opacity={finalOpacity}
                roughness={0.2}
              />
            </mesh>

            {/* Inner Stage Core Indicator Sphere */}
            <mesh renderOrder={22}>
              <sphereGeometry args={[innerRadius, 16, 16]} />
              <meshStandardMaterial
                color={innerColor}
                emissive={stage.color}
                emissiveIntensity={innerEmissive}
                transparent
                opacity={finalOpacity * 0.95}
                roughness={0.1}
              />
            </mesh>

            {/* Causal Active Energy Wave Ring */}
            {isActive && !reducedMotion && waveOpacity > 0.01 && (
              <mesh
                rotation={[Math.PI / 2, 0, 0]}
                scale={[waveScale, waveScale, waveScale]}
                renderOrder={19}
              >
                <ringGeometry args={[0.18, 0.21, 32]} />
                <meshBasicMaterial
                  color={stage.color}
                  transparent
                  opacity={opacity * waveOpacity}
                  depthWrite={false}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
