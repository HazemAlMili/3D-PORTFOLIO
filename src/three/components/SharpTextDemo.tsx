import { Text } from '@react-three/drei';

export interface SharpTextDemoProps {
  position?: [number, number, number];
  title?: string;
  subtitle?: string;
}

/**
 * Demonstrates Signed Distance Field (SDF) 3D spatial typography using `@react-three/drei` `<Text>`.
 *
 * Typography Architecture Guidance:
 * - 3D WebGL SDF Text (<Text>): Best suited for short spatial annotations, 3D scene titles,
 *   and decorative labels anchored directly to world-space geometry.
 * - DOM Overlays: Must be used for primary UI copy, long paragraphs, interactive buttons/forms,
 *   accessibility-sensitive content, and fine body text.
 */
export function SharpTextDemo({
  position = [0, -1.6, 0],
  title = 'R3F FOUNDATION SPIKE',
  subtitle = 'WEBGL PBR & SDF TYPOGRAPHY BASELINE',
}: SharpTextDemoProps) {
  return (
    <group position={position}>
      {/* Primary title */}
      <Text
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#00e5ff"
      >
        {title}
      </Text>

      {/* Spatial Subtitle */}
      <Text
        position={[0, -0.32, 0]}
        fontSize={0.11}
        color="#8ab4f8"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.88}
      >
        {subtitle}
      </Text>
    </group>
  );
}
