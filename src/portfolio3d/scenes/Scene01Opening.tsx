import { Suspense } from "react";
import { getSystemBootMotionState } from "../components/opening/systemBootMotion";
import { SystemBootKernel } from "../components/opening/SystemBootKernel";
import { SystemBootParticles } from "../components/opening/SystemBootParticles";
import { SystemBootCodeOrbit } from "../components/opening/SystemBootCodeOrbit";
import { SystemBootLayers } from "../components/opening/SystemBootLayers";
import { SystemBootPortal } from "../components/opening/SystemBootPortal";

interface Scene01OpeningProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

/**
 * Scene 01 Opening — System Boot Cinematic.
 * Orchestrates all individual layers, particles, text reveals, and portal animation
 * driven entirely by localProgress.
 */
export function Scene01Opening({ localProgress }: Scene01OpeningProps) {
  // Derive current cinematic motion states
  const motion = getSystemBootMotionState(localProgress);

  return (
    <group>
      {/* ── Lighting Configuration ── */}
      {/* Soft low ambient fill for dark space */}
      <ambientLight intensity={0.2} color="#05070A" />

      {/* Rim light from behind/top to edge-light elements */}
      <directionalLight position={[0, 4, -4]} intensity={0.8} color="#2F80ED" />

      {/* Front soft light for readability of text/orbit components */}
      <directionalLight position={[2, 2, 4]} intensity={0.5} color="#F4F7FA" />

      {/* ── System Boot Components ── */}
      {/* 1. Core Kernel / Pulse / Scan Ring */}
      <SystemBootKernel motion={motion} />

      {/* 2. Concentric Portal Rings */}
      <SystemBootPortal motion={motion} />

      {/* 3. Orbiting Data / Code Particles (optimized instanced mesh) */}
      <SystemBootParticles motion={motion} localProgress={localProgress} />

      {/* 4. Orbiting Technical Labels / Track lines */}
      <Suspense fallback={null}>
        <SystemBootCodeOrbit motion={motion} />
      </Suspense>

      {/* 5. Staggered Full-Stack System Layers */}
      <Suspense fallback={null}>
        <SystemBootLayers motion={motion} />
      </Suspense>
    </group>
  );
}
