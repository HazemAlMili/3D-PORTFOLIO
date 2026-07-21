import { SCENE_04_COLORS, SCENE_04_DIMENSIONS } from "../constants/scene04Config";

interface LaptopDeviceProps {
  opacity?: number;
}

export function LaptopDevice({ opacity = 1.0 }: LaptopDeviceProps) {
  const {
    screenBezelWidth: w,
    screenBezelHeight: h,
    screenSurfaceWidth: sw,
    screenSurfaceHeight: sh,
    keyboardWidth: kw,
    keyboardDepth: kd,
    keyboardHeight: kh,
  } = SCENE_04_DIMENSIONS;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Screen Bezel — vertical lid */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[w, h, 0.15]} />
        <meshStandardMaterial
          color={SCENE_04_COLORS.bezel}
          metalness={0.8}
          roughness={0.25}
          transparent
          opacity={opacity}
          depthWrite={opacity >= 0.99}
        />
      </mesh>

      {/* 2. Screen Surface — plane inside bezel */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[sw, sh]} />
        <meshStandardMaterial
          color={SCENE_04_COLORS.screenBg}
          emissive={SCENE_04_COLORS.screenEmissive}
          emissiveIntensity={0.65 * opacity}
          metalness={0.1}
          roughness={0.4}
          transparent
          opacity={opacity}
          depthWrite={opacity >= 0.99}
        />
      </mesh>

      {/* 3. Screen Rim Accent Detail (Cyan accent strip on top of lid) */}
      <mesh position={[0, h / 2 + 0.015, 0.0]}>
        <boxGeometry args={[w + 0.02, 0.02, 0.16]} />
        <meshStandardMaterial
          color={SCENE_04_COLORS.accentCyan}
          emissive={SCENE_04_COLORS.accentCyan}
          emissiveIntensity={0.5 * opacity}
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={opacity}
          depthWrite={opacity >= 0.99}
        />
      </mesh>

      {/* 4. Hinge cylinder at bottom edge of screen */}
      <mesh position={[0, -h / 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, w - 0.2, 16]} />
        <meshStandardMaterial
          color="#12151B"
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={opacity}
          depthWrite={opacity >= 0.99}
        />
      </mesh>

      {/* 5. Keyboard Base (extends forward along Z axis from bottom of screen) */}
      <group position={[0, -h / 2 - kh / 2, kd / 2]}>
        {/* Base chassis */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[kw, kh, kd]} />
          <meshStandardMaterial
            color={SCENE_04_COLORS.bezel}
            metalness={0.8}
            roughness={0.25}
            transparent
            opacity={opacity}
            depthWrite={opacity >= 0.99}
          />
        </mesh>

        {/* Keyboard area recess (subtle darker panel on top) */}
        <mesh position={[0, kh / 2 + 0.002, 0.05]}>
          <boxGeometry args={[kw - 0.4, 0.002, kd - 0.8]} />
          <meshStandardMaterial
            color="#0D0F13"
            metalness={0.4}
            roughness={0.8}
            transparent
            opacity={opacity}
            depthWrite={opacity >= 0.99}
          />
        </mesh>

        {/* Keyboard backlight glow detail */}
        <mesh position={[0, kh / 2 + 0.004, 0.05]}>
          <planeGeometry args={[kw - 0.5, kd - 0.9]} />
          <meshBasicMaterial
            color={SCENE_04_COLORS.keyboardGlow}
            transparent
            opacity={0.35 * opacity}
            depthWrite={false}
          />
        </mesh>

        {/* Trackpad detail */}
        <mesh position={[0, kh / 2 + 0.002, kd / 2 - 0.3]}>
          <boxGeometry args={[1.0, 0.002, 0.5]} />
          <meshStandardMaterial
            color="#14181F"
            metalness={0.7}
            roughness={0.4}
            transparent
            opacity={opacity}
            depthWrite={opacity >= 0.99}
          />
        </mesh>
      </group>
    </group>
  );
}
