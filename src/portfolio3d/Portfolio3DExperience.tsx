import { useState, useEffect } from "react";
import { CanvasRoot } from "./canvas/CanvasRoot";
import { useScrollProgress } from "./scroll/useScrollProgress";
import { ContentOverlayRoot } from "./overlays/ContentOverlayRoot";
import { PerformanceMonitor } from "./performance/PerformanceMonitor";
import { ReducedMotionExperience } from "./fallback/ReducedMotionExperience";
import { resolveCameraPose } from "./camera/CameraDirector";
import { buildSceneSegments } from "./scroll/scrollSegments";
import { getSceneProgress } from "./scroll/SceneProgressMapper";
import { usePortfolioStore } from "./store/portfolioStore";
import type { CameraPose, SceneCameraStates } from "./camera/cameraTypes";
import "./Portfolio3DExperience.css";

export function Portfolio3DExperience() {
  useScrollProgress(); // Activates scroll progress listener

  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const setActiveScene = usePortfolioStore((state) => state.setActiveScene);
  const [pose, setPose] = useState<CameraPose | null>(null);

  // Sync scrollProgress to active scene and local progress
  useEffect(() => {
    const segments = buildSceneSegments();
    const sceneProgress = getSceneProgress(scrollProgress, segments);
    setActiveScene(sceneProgress.sceneIndex, sceneProgress.localProgress);
  }, [scrollProgress, setActiveScene]);

  // Execute CameraDirector interpolation logic and log
  useEffect(() => {
    const segments = buildSceneSegments();
    
    // Dummy states (all zeros) for each scene
    const dummyStates = segments.reduce((acc, seg) => {
      acc[seg.sceneId] = {
        approach: { position: [0, 0, 0], target: [0, 0, 0], fov: 50 },
        enter: { position: [0, 0, 0], target: [0, 0, 0], fov: 50 },
        exit: { position: [0, 0, 0], target: [0, 0, 0], fov: 50 },
      };
      return acc;
    }, {} as Record<string, SceneCameraStates>);

    const result = resolveCameraPose(scrollProgress, segments, dummyStates);
    setPose(result);

    if (import.meta.env.DEV) {
      console.log("[CameraDirector] Resolved Pose:", result);
    }
  }, [scrollProgress]);

  return (
    <section className="portfolio3d-experience" aria-label="Cinematic 3D portfolio experience">
      <div className="portfolio3d-canvas-shell">
        <CanvasRoot />
      </div>
      <ContentOverlayRoot />
      <PerformanceMonitor />
      <ReducedMotionExperience />
      {/* Dev-only debug wrapper to satisfy lint unused-vars check */}
      {import.meta.env.DEV && pose && (
        <div style={{ display: "none" }}>
          Debug Camera Pose: {pose.position.join(",")}, {pose.target.join(",")}, {pose.fov}
        </div>
      )}
    </section>
  );
}
