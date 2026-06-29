import { usePortfolioStore } from "../store/portfolioStore";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { Scene01Opening } from "./Scene01Opening";
import { Scene02Hero } from "./Scene02Hero";
import { Scene03Architecture } from "./Scene03Architecture";
import { Scene04Projects } from "./Scene04Projects";
import { Scene05ProductUX } from "./Scene05ProductUX";
import { Scene06ResponsivePerformance } from "./Scene06ResponsivePerformance";
import { Scene07SystemCore } from "./Scene07SystemCore";
import type { SceneId } from "../content/types";

const SCENE_IDS: SceneId[] = [
  "scene-01-opening",
  "scene-02-hero",
  "scene-03-architecture",
  "scene-04-projects",
  "scene-05-product-ux",
  "scene-06-responsive-performance",
  "scene-07-system-core",
  "scene-08-contact",
];

interface SceneManagerProps {
  /** When false, suppresses all scene rendering (layout suppression for inactive states). */
  visible?: boolean;
}

export function SceneManager({ visible = true }: SceneManagerProps) {
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const sceneLocalProgress = usePortfolioStore((state) => state.sceneLocalProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);

  // Guard against invalid index
  const safeIndex = Math.min(Math.max(0, activeSceneIndex), SCENE_IDS.length - 1);
  const sceneId = SCENE_IDS[safeIndex];

  // Layout suppression: render nothing when visibility is disabled
  if (!visible) return null;

  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";

  // Scene 01 gets the 3D component
  if (safeIndex === 0) {
    return (
      <Scene01Opening
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  // Scene 02 gets the Hero Identity component
  if (safeIndex === 1) {
    if (shouldRenderStatic) {
      return null; // Bypass 3D rendering pipeline for Scene 02 in static mode
    }

    return (
      <Scene02Hero
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  // Scene 03 gets the Architecture component
  if (safeIndex === 2) {
    if (shouldRenderStatic) {
      return null; // Bypass 3D rendering pipeline for Scene 03 in static mode
    }

    return (
      <Scene03Architecture
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  // Scene 04 gets the Projects component
  if (safeIndex === 3) {
    if (shouldRenderStatic) {
      return null; // Bypass 3D rendering pipeline for Scene 04 in static mode
    }

    return (
      <Scene04Projects
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  // Scene 05 gets the Product UX component (preview mount)
  if (safeIndex === 4) {
    if (shouldRenderStatic) {
      return null; // Bypass 3D rendering pipeline for Scene 05 in static mode
    }

    return (
      <Scene05ProductUX
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  // Scene 06 gets the Responsive + Performance component (preview mount)
  if (safeIndex === 5) {
    if (shouldRenderStatic) {
      return null; // Bypass 3D rendering pipeline for Scene 06 in static mode
    }

    return (
      <Scene06ResponsivePerformance
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  // Scene 07 gets the System Core component (preview mount)
  if (safeIndex === 6) {
    if (shouldRenderStatic) {
      return null; // Bypass 3D rendering pipeline for Scene 07 in static mode
    }

    return (
      <Scene07SystemCore
        sceneId={sceneId}
        sceneIndex={safeIndex}
        localProgress={sceneLocalProgress}
      />
    );
  }

  return (
    <ScenePlaceholder
      sceneId={sceneId}
      sceneIndex={safeIndex}
      localProgress={sceneLocalProgress}
    />
  );
}
