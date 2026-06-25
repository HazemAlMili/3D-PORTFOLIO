import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { OpeningDevice } from "../components/OpeningDevice";
import { OpeningScreenContent } from "../components/OpeningScreenContent";
import { buildSceneSegments } from "../scroll/scrollSegments";
import "./Scene01Opening.css";

interface Scene01OpeningProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

export function Scene01Opening({ localProgress }: Scene01OpeningProps) {
  const deviceGroupRef = useRef<Group>(null);
  const hasAdvancedRef = useRef(false);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // Auto-advance after 10s of inactivity if not scrolled past Scene 01
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAdvancedRef.current && localProgress < 0.1) {
        const segments = buildSceneSegments();
        const scene02Start = segments[1]?.start ?? 0.16;
        usePortfolioStore.getState().setScrollProgress(scene02Start + 0.001);
        hasAdvancedRef.current = true;
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [localProgress]);

  // Decouple camera progress from in-screen content progress
  // Content progress only advances during the immerse phase [0.35, 0.75]
  const immerseStart = 0.35;
  const immerseEnd = 0.75;
  
  let contentProgress = 0;
  if (localProgress >= immerseEnd) {
    contentProgress = 1;
  } else if (localProgress > immerseStart) {
    contentProgress = (localProgress - immerseStart) / (immerseEnd - immerseStart);
  }

  // Set step-based opacities for the title, subtitle, and CTA
  const titleOpacity = reducedMotion ? 1 : Math.min(1, contentProgress * 2.5);
  const subtitleOpacity = reducedMotion ? 1 : Math.max(0, Math.min(1, (contentProgress - 0.3) * 2.5));
  const ctaHintOpacity = reducedMotion ? 1 : Math.max(0, Math.min(1, (contentProgress - 0.6) * 3));

  // Subtle ambient floating animation for the device (disabled in reduced motion)
  // Animation is damped out during enter/immerse phases to ensure camera alignment
  useFrame((state) => {
    if (reducedMotion) {
      if (deviceGroupRef.current) {
        deviceGroupRef.current.position.set(0, 0, 0);
        deviceGroupRef.current.rotation.set(0, 0, 0);
      }
      return;
    }

    const t = state.clock.getElapsedTime();
    if (deviceGroupRef.current) {
      // Fade out breathing effect as the camera enters/immerses
      // We want to be completely stable by progress = 0.35 (immerse start)
      const dampFactor = localProgress < 0.20
        ? 1 
        : Math.max(0, 1 - (localProgress - 0.20) / 0.15); // linear fade over enter phase [0.20, 0.35]

      // Gentle breathing/floating effect modulated by dampFactor
      deviceGroupRef.current.position.y = Math.sin(t * 1.2) * 0.04 * dampFactor;
      deviceGroupRef.current.rotation.y = Math.sin(t * 0.6) * 0.02 * dampFactor;
      deviceGroupRef.current.rotation.x = Math.cos(t * 0.8) * 0.01 * dampFactor;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.2} color="#1E2A33" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#F4F7FA" />
      <directionalLight position={[-3, 2, 4]} intensity={0.4} color="#38D6FF" />
      <pointLight position={[0, 3, 2]} intensity={0.3} color="#2F80ED" />

      {/* Render the Opening Device with in-screen content */}
      <group ref={deviceGroupRef}>
        <OpeningDevice>
          <OpeningScreenContent
            titleOpacity={titleOpacity}
            subtitleOpacity={subtitleOpacity}
            ctaHintOpacity={ctaHintOpacity}
          />
        </OpeningDevice>
      </group>
    </group>
  );
}
