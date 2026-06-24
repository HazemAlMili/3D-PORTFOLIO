import { usePortfolioStore } from "../store/portfolioStore";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { Scene01Opening } from "./Scene01Opening";
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

  // Guard against invalid index
  const safeIndex = Math.min(Math.max(0, activeSceneIndex), SCENE_IDS.length - 1);
  const sceneId = SCENE_IDS[safeIndex];

  // Layout suppression: render nothing when visibility is disabled
  if (!visible) return null;

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

  return (
    <ScenePlaceholder
      sceneId={sceneId}
      sceneIndex={safeIndex}
      localProgress={sceneLocalProgress}
    />
  );
}
