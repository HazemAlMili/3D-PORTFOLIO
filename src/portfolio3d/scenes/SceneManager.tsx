import { usePortfolioStore } from "../store/portfolioStore";
import { ScenePlaceholder } from "./ScenePlaceholder";
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

export function SceneManager() {
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const sceneLocalProgress = usePortfolioStore((state) => state.sceneLocalProgress);

  // Guard against invalid index
  const safeIndex = Math.min(Math.max(0, activeSceneIndex), SCENE_IDS.length - 1);
  const sceneId = SCENE_IDS[safeIndex];

  return (
    <ScenePlaceholder
      sceneId={sceneId}
      sceneIndex={safeIndex}
      localProgress={sceneLocalProgress}
    />
  );
}
