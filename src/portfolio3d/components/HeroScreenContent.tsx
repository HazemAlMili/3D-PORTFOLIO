import { Text } from "@react-three/drei";
import {
  SCENE_02_CONTENT_STEPS,
  SCENE_02_COLORS,
  SCENE_02_SUB_PHASES,
  SCENE_02_STEP_COUNT,
} from "../constants/scene02Config";

interface HeroScreenContentProps {
  /** Local progress 0–1 for the full Scene 02 segment. */
  localProgress: number;
  /** When true, all content is fully visible (no fade animation). */
  reducedMotion: boolean;
}

/**
 * HeroScreenContent
 *
 * Renders 4 sequential content steps inside the Scene 02 MainDisplay screen.
 * Each step occupies an equal slice of the immerse sub-phase [0.30, 0.78].
 * Only ONE step is shown at a time; it fades in → holds → fades out.
 *
 * All text is rendered using Drei <Text> (WebGL-native) — no Html portals.
 * Font sizes and maxWidth are calibrated for the screen area: 3.6 × 2.6 units.
 */
export function HeroScreenContent({ localProgress, reducedMotion }: HeroScreenContentProps) {
  const [immerseStart, immerseEnd] = SCENE_02_SUB_PHASES.immerse;
  const immerseLen = immerseEnd - immerseStart;

  // Normalise local progress within immerse phase → 0…1
  const immerseT = Math.min(1, Math.max(0, (localProgress - immerseStart) / immerseLen));

  // Each step occupies 1/STEP_COUNT of the immerse range
  const stepSize = 1 / SCENE_02_STEP_COUNT;
  // Give each step a 15% crossfade zone at start and end
  const fadeZone = 0.15;

  return (
    <group position={[0, 0, 0]}>
      {SCENE_02_CONTENT_STEPS.map((step, i) => {
        const stepStart = i * stepSize;
        const stepEnd = (i + 1) * stepSize;

        let opacity = 0;

        if (reducedMotion) {
          // In reduced motion mode: only show step based on which quarter we're in
          const activeStep = Math.floor(immerseT * SCENE_02_STEP_COUNT);
          opacity = activeStep === i ? 1 : 0;
        } else {
          const fadeIn = stepStart + stepSize * fadeZone;
          const fadeOut = stepEnd - stepSize * fadeZone;

          if (immerseT >= fadeIn && immerseT <= fadeOut) {
            opacity = 1;
          } else if (immerseT < fadeIn && immerseT >= stepStart) {
            opacity = (immerseT - stepStart) / (fadeIn - stepStart);
          } else if (immerseT > fadeOut && immerseT <= stepEnd) {
            opacity = 1 - (immerseT - fadeOut) / (stepEnd - fadeOut);
          }
        }

        // Before the immerse phase begins, show first step at full opacity
        const finalOpacity = localProgress < immerseStart
          ? i === 0 ? 0 : 0            // nothing visible before immerse
          : Math.max(0, Math.min(1, opacity));

        // Step heading Y position — centred vertically with body text below
        const headingY = 0.22;
        const bodyY = -0.10;
        // Subtle upward float per step for variety
        const floatOffset = (i % 2 === 0 ? 0 : 0.03);

        return (
          <group key={i} position={[0, floatOffset, 0.01]}>
            {/* Step heading */}
            <Text
              position={[0, headingY, 0]}
              fontSize={0.11}
              color={i === SCENE_02_STEP_COUNT - 1 ? SCENE_02_COLORS.accentCyan : SCENE_02_COLORS.textPrimary}
              anchorX="center"
              anchorY="middle"
              maxWidth={1.7}
              textAlign="center"
              letterSpacing={0.02}
              fillOpacity={finalOpacity}
            >
              {step.heading}
            </Text>

            {/* Step body */}
            <Text
              position={[0, bodyY, 0]}
              fontSize={0.075}
              color={SCENE_02_COLORS.textSecondary}
              anchorX="center"
              anchorY="middle"
              maxWidth={1.8}
              lineHeight={1.4}
              textAlign="center"
              fillOpacity={finalOpacity * 0.85}
            >
              {step.body}
            </Text>

            {/* Accent separator line — thin horizontal rule above heading */}
            {i < SCENE_02_STEP_COUNT - 1 && (
              <mesh position={[0, headingY + 0.18, 0]}>
                <planeGeometry args={[1.0, 0.004]} />
                <meshBasicMaterial
                  color={SCENE_02_COLORS.accentCyan}
                  transparent
                  opacity={finalOpacity * 0.5}
                />
              </mesh>
            )}

            {/* Step indicator dots — small row at bottom of screen */}
            <group position={[0, -0.40, 0]}>
              {Array.from({ length: SCENE_02_STEP_COUNT }).map((_, dot) => (
                <mesh key={dot} position={[(dot - (SCENE_02_STEP_COUNT - 1) / 2) * 0.10, 0, 0]}>
                  <circleGeometry args={[dot === i ? 0.015 : 0.008, 12]} />
                  <meshBasicMaterial
                    color={dot === i ? SCENE_02_COLORS.accentCyan : SCENE_02_COLORS.textSecondary}
                    transparent
                    opacity={finalOpacity * (dot === i ? 0.9 : 0.3)}
                  />
                </mesh>
              ))}
            </group>
          </group>
        );
      })}
    </group>
  );
}
