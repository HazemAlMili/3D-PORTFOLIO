import { SCENE_03_COLORS } from "../constants/scene03Config";

interface UltraWideMonitorProps {
  children?: React.ReactNode;
}

/**
 * UltraWideMonitor — Procedural device frame for Scene 03 using Three.js primitives.
 * Fits a 21:9 ultrawide aspect ratio screen.
 * Bezel: 5.4 x 2.3 x 0.25 (depth).
 * Screen surface: 5.1 x 2.05 at Z=+0.13.
 */
export function UltraWideMonitor({ children }: UltraWideMonitorProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Outer Bezel ── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5.4, 2.3, 0.25]} />
        <meshStandardMaterial
          color={SCENE_03_COLORS.bezel}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* ── Screen Surface (emissive dark panel) ── */}
      <mesh position={[0, 0, 0.13]}>
        <planeGeometry args={[5.1, 2.05]} />
        <meshStandardMaterial
          color={SCENE_03_COLORS.screenBg}
          emissive={SCENE_03_COLORS.screenEmissive}
          emissiveIntensity={0.65}
          roughness={0.4}
          metalness={0.08}
        />
      </mesh>

      {/* ── Cyan Accent Line (top edge) ── */}
      <mesh position={[0, 1.165, 0.126]}>
        <boxGeometry args={[5.42, 0.03, 0.01]} />
        <meshStandardMaterial
          color={SCENE_03_COLORS.accentCyan}
          emissive={SCENE_03_COLORS.accentCyan}
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* ── Gold Accent Line (bottom edge) ── */}
      <mesh position={[0, -1.165, 0.126]}>
        <boxGeometry args={[5.42, 0.03, 0.01]} />
        <meshStandardMaterial
          color={SCENE_03_COLORS.accentGold}
          emissive={SCENE_03_COLORS.accentGold}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* ── Screen Content Group (Z=+0.16 to clear the screen surface nicely) ── */}
      <group position={[0, 0, 0.16]}>
        {children}
      </group>
    </group>
  );
}
