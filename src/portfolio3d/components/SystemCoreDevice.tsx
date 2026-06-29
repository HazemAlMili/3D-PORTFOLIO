import { SCENE_07_COLORS } from "../constants/scene07Config";

export function SystemCoreDevice() {
  const w = 0.8;
  const h = 1.2;
  const d = 0.5;

  const slotCount = 5;

  return (
    <group>
      {/* Central Cabinet Chassis Frame */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={SCENE_07_COLORS.graphite}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Frame outer rims (gives beveled structure) */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w + 0.02, 0.04, d + 0.02]} />
        <meshStandardMaterial color="#0A0D14" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -h / 2, 0]}>
        <boxGeometry args={[w + 0.02, 0.04, d + 0.02]} />
        <meshStandardMaterial color="#0A0D14" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Stacked Server Blade Modules (internal slots) */}
      {Array.from({ length: slotCount }).map((_, idx) => {
        const slotY = -h / 2 + 0.16 + idx * 0.22;
        return (
          <group key={idx} position={[0, slotY, 0]}>
            {/* Server Blade Faceplate */}
            <mesh position={[0, 0, d / 2 + 0.002]}>
              <planeGeometry args={[w - 0.08, 0.16]} />
              <meshStandardMaterial
                color={SCENE_07_COLORS.chassisDark}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* Glowing port indicators */}
            <mesh position={[-0.22, 0, d / 2 + 0.004]}>
              <circleGeometry args={[0.012, 8]} />
              <meshBasicMaterial color={SCENE_07_COLORS.accentCyan} />
            </mesh>
            <mesh position={[-0.14, 0, d / 2 + 0.004]}>
              <circleGeometry args={[0.012, 8]} />
              <meshBasicMaterial color={SCENE_07_COLORS.accentBlue} />
            </mesh>

            {/* Small status LED group on the right side of the blade */}
            <mesh position={[0.22, 0.03, d / 2 + 0.004]}>
              <planeGeometry args={[0.08, 0.012]} />
              <meshBasicMaterial color={SCENE_07_COLORS.accentCyan} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.22, -0.03, d / 2 + 0.004]}>
              <planeGeometry args={[0.08, 0.012]} />
              <meshBasicMaterial color="#334155" />
            </mesh>
          </group>
        );
      })}

      {/* Glowing vertical LED stripe on the cabinet side bevel */}
      <mesh position={[w / 2 + 0.002, 0, d / 2 + 0.002]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[0.03, h - 0.1]} />
        <meshBasicMaterial color={SCENE_07_COLORS.accentCyan} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
export default SystemCoreDevice;
