import { Text } from "@react-three/drei";
import { SCENE_01_COLORS, SCENE_01_TEXT } from "../constants/scene01Config";

interface OpeningScreenContentProps {
  titleOpacity: number;
  subtitleOpacity: number;
  ctaHintOpacity: number;
}

export function OpeningScreenContent({
  titleOpacity,
  subtitleOpacity,
  ctaHintOpacity,
}: OpeningScreenContentProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* Title */}
      <Text
        position={[0, 0.4, 0.01]}
        fontSize={0.11}
        color={SCENE_01_COLORS.textPrimary}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.7}
        textAlign="center"
        fillOpacity={titleOpacity}
      >
        {SCENE_01_TEXT.title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.1, 0.01]}
        fontSize={0.075}
        color={SCENE_01_COLORS.textSecondary}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        lineHeight={1.4}
        textAlign="center"
        fillOpacity={subtitleOpacity}
      >
        {SCENE_01_TEXT.subtitle}
      </Text>

      {/* CTA hint */}
      <Text
        position={[0, -0.65, 0.01]}
        fontSize={0.055}
        color={SCENE_01_COLORS.textCyan}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        letterSpacing={0.15}
        textAlign="center"
        fillOpacity={ctaHintOpacity}
      >
        {SCENE_01_TEXT.cta}
      </Text>
    </group>
  );
}
