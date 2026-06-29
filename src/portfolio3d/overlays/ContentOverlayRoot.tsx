import { usePortfolioStore } from "../store/portfolioStore";
import { HeroOverlay } from "./HeroOverlay";
import { Scene04ProjectsStaticCard } from "../scenes/Scene04ProjectsStaticCard";
import { Scene06ResponsivePerformanceStaticCard } from "../scenes/Scene06ResponsivePerformanceStaticCard";
import { Scene08ContactStaticCard } from "../scenes/Scene08ContactStaticCard";
import "./ContentOverlayRoot.css";

// Static placeholder map (proves structure for all 8 scenes)
const SCENE_PLACEHOLDERS: Record<string, string> = {
  "scene-01-opening": "Opening Content PENDING",
  "scene-02-hero": "Hero Content PENDING",
  "scene-03-architecture": "Architecture Content PENDING",
  "scene-04-projects": "Projects Content PENDING",
  "scene-05-product-ux": "Product UX Content PENDING",
  "scene-06-responsive-performance": "Responsive Performance Content PENDING",
  "scene-07-system-core": "System Core Content PENDING",
  "scene-08-contact": "Contact Content PENDING",
};

export function ContentOverlayRoot() {
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";

  const sceneEntries = Object.entries(SCENE_PLACEHOLDERS);

  return (
    <div className="content-overlay-root" aria-label="Content overlay root">
      <div className="content-overlay-container">
        {sceneEntries.map(([sceneId, text], index) => {
          const isActive = activeSceneIndex === index;
          return (
            <div
              key={sceneId}
              className={`content-overlay-slot ${isActive ? "active" : ""}`}
              data-scene-id={sceneId}
            >
              {sceneId === "scene-02-hero" ? (
                shouldRenderStatic ? null : <HeroOverlay />
              ) : sceneId === "scene-04-projects" ? (
                shouldRenderStatic ? <Scene04ProjectsStaticCard /> : null
              ) : sceneId === "scene-06-responsive-performance" ? (
                shouldRenderStatic ? <Scene06ResponsivePerformanceStaticCard /> : null
              ) : sceneId === "scene-08-contact" ? (
                shouldRenderStatic ? <Scene08ContactStaticCard /> : null
              ) : sceneId === "scene-03-architecture" ? (
                null
              ) : sceneId === "scene-01-opening" ? (
                null
              ) : (
                text
              )}
            </div>
          );
        })}
      </div>
      {import.meta.env.DEV && (
        <div className="content-overlay-debug">
          Overlay mounted — Active Scene: {activeSceneIndex + 1}
        </div>
      )}
    </div>
  );
}
