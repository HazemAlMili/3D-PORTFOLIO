import { useEffect, useCallback } from "react";
import { CanvasRoot } from "./canvas/CanvasRoot";
import { useScrollProgress } from "./scroll/useScrollProgress";
import { ContentOverlayRoot } from "./overlays/ContentOverlayRoot";
import { PerformanceMonitor } from "./performance/PerformanceMonitor";
import { ReducedMotionExperience } from "./fallback/ReducedMotionExperience";
import { ScrollDebugHUD } from "./debug";
import { resolveCameraPose } from "./camera/CameraDirector";
import { buildSceneSegments } from "./scroll/scrollSegments";
import { getSceneProgress } from "./scroll/SceneProgressMapper";
import { usePortfolioStore } from "./store/portfolioStore";
import type { SceneCameraStates } from "./camera/cameraTypes";
import { Scene02HeroStaticCard } from "./scenes/Scene02HeroStaticCard";
import "./Portfolio3DExperience.css";

export function Portfolio3DExperience() {
  useScrollProgress(); // Activates scroll progress listener

  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const setActiveScene = usePortfolioStore((state) => state.setActiveScene);
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const sceneLocalProgress = usePortfolioStore((state) => state.sceneLocalProgress);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";

  // Sync scrollProgress to active scene and local progress
  useEffect(() => {
    const segments = buildSceneSegments();
    const sceneProgress = getSceneProgress(scrollProgress, segments);
    setActiveScene(sceneProgress.sceneIndex, sceneProgress.localProgress);
  }, [scrollProgress, setActiveScene]);

  // Execute CameraDirector interpolation logic in dev
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const segments = buildSceneSegments();

    // Dummy states (all zeros) for each scene — used only for dev console verification
    const dummyStates = segments.reduce((acc, seg) => {
      acc[seg.sceneId] = {
        approach: { position: [0, 0, 0], target: [0, 0, 0], fov: 50 },
        enter: { position: [0, 0, 0], target: [0, 0, 0], fov: 50 },
        exit: { position: [0, 0, 0], target: [0, 0, 0], fov: 50 },
      };
      return acc;
    }, {} as Record<string, SceneCameraStates>);

    resolveCameraPose(scrollProgress, segments, dummyStates);
  }, [scrollProgress]);

  // Skip intro: jump scroll to Scene 02 start (global progress 0.19 = after Scene 01 weight 0.18)
  const handleSkipIntro = useCallback(() => {
    const segments = buildSceneSegments();
    const scene02Start = segments[1]?.start ?? 0.19;
    usePortfolioStore.getState().setScrollProgress(scene02Start + 0.001);
    // Sync the scroll position on the page
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: totalScrollHeight * (scene02Start + 0.001), behavior: "smooth" });
  }, []);

  // Only show skip button during Scene 01, before the exit phase
  const showSkipButton = activeSceneIndex === 0 && sceneLocalProgress < 0.85;

  return (
    <section className="portfolio3d-experience" aria-label="Cinematic 3D portfolio experience">
      <div className="portfolio3d-canvas-shell">
        <CanvasRoot />
      </div>
      
      {/* Scroll spacer to define vertical scrollable height (8 scenes * 100vh) */}
      <div className="portfolio3d-scroll-spacer" style={{ height: "800vh", pointerEvents: "none" }} />

      {/* Skip Intro Button — pure DOM overlay (NOT inside Canvas, avoids Html portal crash) */}
      {showSkipButton && (
        <button
          id="skip-intro-btn"
          className="skip-intro-button"
          onClick={handleSkipIntro}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSkipIntro(); }}
          aria-label="Skip intro and go to hero section"
        >
          Skip Intro ⏭
        </button>
      )}
      
      {activeSceneIndex === 1 && shouldRenderStatic && <Scene02HeroStaticCard />}
      
      <ContentOverlayRoot />
      <PerformanceMonitor />
      <ReducedMotionExperience />
      <ScrollDebugHUD />
    </section>
  );
}

