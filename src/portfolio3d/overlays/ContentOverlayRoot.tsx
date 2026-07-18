import { usePortfolioStore } from "../store/portfolioStore";
import { HeroOverlay } from "./HeroOverlay";
import { ProductEngineOverlay } from "./ProductEngineOverlay";
import { Scene04ProjectsStaticCard } from "../scenes/Scene04ProjectsStaticCard";
import { Scene06ResponsivePerformanceStaticCard } from "../scenes/Scene06ResponsivePerformanceStaticCard";
import { Scene08ContactStaticCard } from "../scenes/Scene08ContactStaticCard";
import { buildSceneSegments } from "../scroll/scrollSegments";
import { getSceneFadeOpacity } from "../scenes/sceneFade";
import { SystemBootIdentityOverlay } from "./SystemBootIdentityOverlay";
import "./ContentOverlayRoot.css";

export function ContentOverlayRoot() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const shouldRenderStatic = reducedMotion === true;

  const segments = buildSceneSegments();

  // Support scene cross-fade adjacent indexing for DOM overlays
  const getAdjacentOverlayIndexes = (idx: number, maxIdx: number) => {
    return Array.from(new Set([
      Math.max(0, idx - 1),
      idx,
      Math.min(maxIdx, idx + 1)
    ])).sort((a, b) => a - b);
  };

  const indexesToRender = getAdjacentOverlayIndexes(activeSceneIndex, segments.length - 1);

  return (
    <div className="content-overlay-root" aria-label="Content overlay root">
      <div className="content-overlay-container">
        {segments.map((seg, index) => {
          const sceneId = seg.sceneId;
          const fadeOpacity = getSceneFadeOpacity(index, scrollProgress, segments);

          // Performance optimization: only render adjacent slots that are active or fading in/out
          const isToRender = indexesToRender.includes(index);
          const shouldRender = isToRender && (index === activeSceneIndex || fadeOpacity > 0.01);

          if (!shouldRender) return null;

          const isInteractive = index === activeSceneIndex && fadeOpacity > 0.95;
          const segLocalProgress = (scrollProgress - seg.start) / (seg.end - seg.start);
          const clampedProgress = Math.min(1, Math.max(0, segLocalProgress));

          return (
            <div
              key={sceneId}
              className="content-overlay-slot"
              style={{
                opacity: fadeOpacity,
                pointerEvents: isInteractive ? "auto" : "none",
              }}
              data-scene-id={sceneId}
            >
              {sceneId === "scene-01-opening" ? (
                <SystemBootIdentityOverlay localProgress={clampedProgress} />
              ) : sceneId === "scene-02-hero" ? (
                shouldRenderStatic ? null : <HeroOverlay />
              ) : sceneId === "scene-03-architecture" ? (
                <ProductEngineOverlay localProgress={clampedProgress} />
              ) : sceneId === "scene-04-projects" ? (
                shouldRenderStatic ? <Scene04ProjectsStaticCard /> : null
              ) : sceneId === "scene-06-responsive-performance" ? (
                shouldRenderStatic ? <Scene06ResponsivePerformanceStaticCard /> : null
              ) : sceneId === "scene-08-contact" ? (
                shouldRenderStatic ? <Scene08ContactStaticCard /> : null
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
