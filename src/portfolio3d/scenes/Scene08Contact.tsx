import { FinalSystemComposition } from "../components/FinalSystemComposition";
import { FinalContactLockup } from "../components/FinalContactLockup";

interface Scene08ContactProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

export function Scene08Contact({
  sceneId,
  sceneIndex,
  localProgress,
  opacity = 1.0,
}: Scene08ContactProps) {
  // Transition budget check
  const shouldRenderHeavy = opacity > 0.02;
  if (!shouldRenderHeavy) return null;

  // Let's render a basic 3D placeholder layout with text representing the contact config
  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* 3D background system composition */}
      <FinalSystemComposition localProgress={localProgress} />

      {/* 3D contact name / identity return + CTA lockup */}
      <FinalContactLockup />

      {/* Lights tailored to a final clean focus area */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
    </group>
  );
}

export default Scene08Contact;
