import type { SceneId } from "../content/types";

interface ScenePlaceholderProps {
  sceneId: SceneId;
  sceneIndex: number;
  localProgress: number;
}

const SCENE_LABELS: Record<SceneId, string> = {
  "scene-01-opening": "Opening / Seal Activation",
  "scene-02-hero": "Hero Identity",
  "scene-03-architecture": "Architecture Mindset",
  "scene-04-projects": "Projects Layer",
  "scene-05-product-ux": "Product UX Thinking",
  "scene-06-responsive-performance": "Responsive Performance",
  "scene-07-system-core": "System Core / Backend Engine",
  "scene-08-contact": "Final Sync / Contact",
};

export function ScenePlaceholder({ sceneId, sceneIndex, localProgress }: ScenePlaceholderProps) {
  return (
    <div className="scene-placeholder" style={styles.container}>
      <div className="scene-placeholder__label" style={styles.label}>
        {SCENE_LABELS[sceneId] || sceneId}
      </div>
      <div className="scene-placeholder__index" style={styles.index}>
        Scene {sceneIndex + 1} of 8
      </div>
      <div className="scene-placeholder__progress" style={styles.progress}>
        Local progress: {(localProgress * 100).toFixed(0)}%
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#F4F7FA",
    fontFamily: "sans-serif",
    textAlign: "center" as const,
    pointerEvents: "none" as const,
    zIndex: 10,
  },
  label: {
    fontSize: "1.5rem",
    fontWeight: "bold" as const,
  },
  index: {
    fontSize: "1rem",
    opacity: 0.6,
    marginTop: "0.25rem",
  },
  progress: {
    fontSize: "0.875rem",
    opacity: 0.5,
    marginTop: "0.25rem",
  },
};
