import { useEffect } from "react";
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
import "./Portfolio3DExperience.css";

export function Portfolio3DExperience() {
  useScrollProgress(); // Activates scroll progress listener

  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const setActiveScene = usePortfolioStore((state) => state.setActiveScene);

  // Sync scrollProgress to active scene and local progress
  useEffect(() => {
    const segments = buildSceneSegments();
    const sceneProgress = getSceneProgress(scrollProgress, segments);
    setActiveScene(sceneProgress.sceneIndex, sceneProgress.localProgress);
  }, [scrollProgress, setActiveScene]);

  // Execute CameraDirector interpolation logic and log in dev
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

    const result = resolveCameraPose(scrollProgress, segments, dummyStates);
    console.log("[CameraDirector] Resolved Pose:", result);
  }, [scrollProgress]);

  return (
    <section className="portfolio3d-experience" aria-label="Cinematic 3D portfolio experience">
      <div className="portfolio3d-canvas-shell">
        <CanvasRoot />
      </div>
      
      {/* Scroll spacer to define vertical scrollable height (8 scenes * 100vh) */}
      <div className="portfolio3d-scroll-spacer" style={{ height: "800vh", pointerEvents: "none" }} />
      
      <ContentOverlayRoot />
      <PerformanceMonitor />
      <ReducedMotionExperience />
      <ScrollDebugHUD />
    </section>
  );
}
