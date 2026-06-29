import { SCENE_06_COLORS, SCENE_06_DIMENSIONS, SCENE_06_SUB_PHASES } from "../constants/scene06Config";
import { ResponsiveLayoutMorph } from "./ResponsiveLayoutMorph";

interface MobileDeviceProps {
  localProgress?: number;
}

export function MobileDevice({ localProgress = 0 }: MobileDeviceProps) {
  const {
    phoneWidth: w,
    phoneHeight: h,
    phoneDepth: d,
    screenWidth: sw,
    screenHeight: sh,
  } = SCENE_06_DIMENSIONS;

  // Calculate rotate-into-view parameters inside the approach phase [0.0, 0.40]
  const [approachStart, approachEnd] = SCENE_06_SUB_PHASES.approach;
  const t = Math.min(1, Math.max(0, (localProgress - approachStart) / (approachEnd - approachStart)));

  // Interpolated rotation coordinates: angled entry to straight front-facing
  const rotationY = (1 - t) * (Math.PI / 3.2); // Fades from ~56 deg to 0 deg
  const rotationX = (1 - t) * 0.3 - t * 0.05;   // Settles from ~17 deg tilt to a flat -3 deg tilt
  const rotationZ = (1 - t) * -0.15;           // Slight organic slide rotation

  return (
    <group rotation={[rotationX, rotationY, rotationZ]}>
      {/* 1. Phone Body Chassis */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={SCENE_06_COLORS.bezel}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Bezel border accents (provides rounded edge impression) */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w + 0.01, 0.015, d + 0.01]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -h / 2, 0]}>
        <boxGeometry args={[w + 0.01, 0.015, d + 0.01]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[w / 2, 0, 0]}>
        <boxGeometry args={[0.015, h + 0.01, d + 0.01]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-w / 2, 0, 0]}>
        <boxGeometry args={[0.015, h + 0.01, d + 0.01]} />
        <meshStandardMaterial color="#14171E" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Screen Surface */}
      <mesh position={[0, 0, d / 2 + 0.002]}>
        <planeGeometry args={[sw, sh]} />
        <meshStandardMaterial
          color={SCENE_06_COLORS.screenBg}
          emissive={SCENE_06_COLORS.screenEmissive}
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Screen content layout morph */}
      <group position={[0, 0, d / 2 + 0.005]}>
        <ResponsiveLayoutMorph localProgress={localProgress} />
      </group>

      {/* 3. Top Notch / Speaker Grill */}
      <mesh position={[0, h / 2 - 0.15, d / 2 + 0.003]}>
        <boxGeometry args={[0.6, 0.06, 0.005]} />
        <meshStandardMaterial
          color="#0A0D12"
          metalness={0.5}
          roughness={0.8}
        />
      </mesh>

      {/* 4. Top bezel Status LED (Cyan accent) */}
      <mesh position={[0.45, h / 2 - 0.15, d / 2 + 0.004]}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color={SCENE_06_COLORS.accentCyan} />
      </mesh>

      {/* Camera lens sensor dot on notch */}
      <mesh position={[-0.22, h / 2 - 0.15, d / 2 + 0.004]}>
        <circleGeometry args={[0.012, 16]} />
        <meshBasicMaterial color="#050709" />
      </mesh>

      {/* 5. Physical Side Buttons */}
      {/* Power button (right side) */}
      <mesh position={[w / 2 + 0.01, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.25, 0.04]} />
        <meshStandardMaterial color="#12151C" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Volume Up button (left side) */}
      <mesh position={[-w / 2 - 0.01, 0.6, 0]}>
        <boxGeometry args={[0.02, 0.18, 0.04]} />
        <meshStandardMaterial color="#12151C" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Volume Down button (left side) */}
      <mesh position={[-w / 2 - 0.01, 0.35, 0]}>
        <boxGeometry args={[0.02, 0.18, 0.04]} />
        <meshStandardMaterial color="#12151C" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
export default MobileDevice;
