// src/portfolio3d/assets/modelPreload.ts
// Centralized model preloading for Scene 02 Hero GLB assets
import { useGLTF } from "@react-three/drei";

export const HERO_MODELS = {
  COMMAND_CORE: "/assets/models/hero/command-core.glb",
  CAPABILITY_STATION: "/assets/models/hero/capability-station.glb",
} as const;

export function preloadHeroModels(): void {
  useGLTF.preload(HERO_MODELS.COMMAND_CORE);
  useGLTF.preload(HERO_MODELS.CAPABILITY_STATION);
}

// Automatically preload on module import so assets are ready
preloadHeroModels();
