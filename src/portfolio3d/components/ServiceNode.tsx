import { Text } from "@react-three/drei";
import { SCENE_07_COLORS } from "../constants/scene07Config";

interface ServiceNodeProps {
  label: string;
}

export function ServiceNode({ label }: ServiceNodeProps) {
  const w = 0.36;
  const h = 0.50;
  const d = 0.22;

  return (
    <group>
      {/* Blade Chassis */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={SCENE_07_COLORS.graphite}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Front Faceplate */}
      <mesh position={[0, 0, d / 2 + 0.002]}>
        <planeGeometry args={[w - 0.04, h - 0.06]} />
        <meshStandardMaterial
          color={SCENE_07_COLORS.chassisDark}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Vertical Status LED indicator bar */}
      <mesh position={[-w / 2 + 0.05, 0, d / 2 + 0.004]}>
        <planeGeometry args={[0.015, h - 0.16]} />
        <meshBasicMaterial color={SCENE_07_COLORS.accentCyan} />
      </mesh>

      {/* Mini connection node/port */}
      <mesh position={[w / 2 - 0.08, -h / 2 + 0.12, d / 2 + 0.004]}>
        <circleGeometry args={[0.018, 8]} />
        <meshBasicMaterial color={SCENE_07_COLORS.accentBlue} />
      </mesh>

      {/* Tech labels / Text tag (passive label for identifying the service) */}
      <mesh position={[0, h / 2 + 0.06, 0]}>
        <boxGeometry args={[w, 0.08, 0.04]} />
        <meshStandardMaterial color="#0F172A" metalness={0.6} roughness={0.4} />
      </mesh>
      <Text
        position={[0, h / 2 + 0.06, 0.022]}
        fontSize={0.038}
        color={SCENE_07_COLORS.textPrimary}
        fontWeight="bold"
      >
        {label}
      </Text>
    </group>
  );
}
export default ServiceNode;
