import { SCENE_01_COLORS } from "../constants/scene01Config";

interface OpeningDeviceProps {
  children?: React.ReactNode;
}

/**
 * OpeningDevice — Procedural device frame using Three.js primitives.
 * No GLB assets required. Screen content is placed on the FRONT FACE (positive Z side)
 * so it remains visible when the camera approaches from +Z.
 *
 * Layout (facing camera from +Z):
 *   Bezel box: center [0,0,0], depth 0.12 → front face at Z=+0.06
 *   Screen bg plane: Z=+0.065 (just inside front face)
 *   Content group: Z=+0.07 (in front of screen bg, clearly visible from camera)
 */
export function OpeningDevice({ children }: OpeningDeviceProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Device Bezel/Frame ── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.8, 2.9, 0.12]} />
        <meshStandardMaterial
          color={SCENE_01_COLORS.bezel}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* ── Screen Surface Background (front face, inside bezel border) ── */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[3.4, 2.5]} />
        <meshStandardMaterial
          color={SCENE_01_COLORS.screenBg}
          emissive="#061826"
          emissiveIntensity={0.7}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* ── Cyan Top Accent Strip ── */}
      <mesh position={[0, 1.47, 0.065]}>
        <boxGeometry args={[3.82, 0.035, 0.01]} />
        <meshStandardMaterial
          color={SCENE_01_COLORS.screenGlow}
          emissive={SCENE_01_COLORS.screenGlow}
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* ── Gold Bottom Accent Strip ── */}
      <mesh position={[0, -1.47, 0.065]}>
        <boxGeometry args={[3.82, 0.035, 0.01]} />
        <meshStandardMaterial
          color={SCENE_01_COLORS.gold}
          emissive={SCENE_01_COLORS.gold}
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* ── Screen Content: rendered at Z=+0.10, above the screen surface ── */}
      <group position={[0, 0, 0.10]}>
        {children}
      </group>
    </group>
  );
}
