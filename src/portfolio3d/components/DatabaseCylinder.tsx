import { SCENE_07_COLORS } from "../constants/scene07Config";

export function DatabaseCylinder() {
  const radius = 0.32;
  const platterHeight = 0.20;
  const gap = 0.06;

  return (
    <group>
      {/* Stack of 3 Storage Platters */}
      {Array.from({ length: 3 }).map((_, idx) => {
        const platterY = -0.3 + idx * (platterHeight + gap);
        return (
          <group key={idx} position={[0, platterY, 0]}>
            {/* Cylinder Platter body */}
            <mesh rotation={[0, 0, 0]}>
              <cylinderGeometry args={[radius, radius, platterHeight, 24]} />
              <meshStandardMaterial
                color="#1E293B" // dark graphite
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>

            {/* Top reflective cap rim */}
            <mesh position={[0, platterHeight / 2 + 0.001, 0]}>
              <cylinderGeometry args={[radius - 0.02, radius - 0.02, 0.005, 24]} />
              <meshStandardMaterial
                color="#0A0D14"
                metalness={1.0}
                roughness={0.1}
              />
            </mesh>

            {/* Glowing cyan horizontal LED strip ring inside the platter bevel */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[radius + 0.002, radius + 0.002, 0.02, 24, 1, true]} />
              <meshBasicMaterial
                color={SCENE_07_COLORS.dataGreen}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        );
      })}

      {/* Database chassis stand support */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[radius + 0.04, radius + 0.04, 0.06, 24]} />
        <meshStandardMaterial color="#0A0D14" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
export default DatabaseCylinder;
