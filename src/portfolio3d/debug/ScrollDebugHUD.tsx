import { usePortfolioStore } from "../store/portfolioStore";
import { resolveCameraPose } from "../camera/CameraDirector";
import { SCENE_CAMERA_KEYFRAMES } from "../camera/cameraKeyframes";
import { buildSceneSegments } from "../scroll/scrollSegments";
import type { SceneId } from "../content/types";
import "./ScrollDebugHUD.css";

// ─── Constants ────────────────────────────────────────────────────────────────

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

const SCENE_LABELS: Record<SceneId, string> = {
  "scene-01-opening": "Opening",
  "scene-02-hero": "Hero",
  "scene-03-architecture": "Architecture",
  "scene-04-projects": "Projects",
  "scene-05-product-ux": "Product UX",
  "scene-06-responsive-performance": "Responsive Perf.",
  "scene-07-system-core": "System Core",
  "scene-08-contact": "Contact",
};

// Pre-built once — pure data, no side effects
const SEGMENTS = buildSceneSegments();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSubPhase(localProgress: number): string {
  if (localProgress < 0.25) return "Approach";
  if (localProgress < 0.45) return "Enter";
  if (localProgress < 0.80) return "Immerse";
  return "Exit";
}

function getClippingStatus(dist: number): string {
  if (dist < 0.5) return "⚠️ NEAR CLIP";
  if (dist > 90)  return "⚠️ FAR CLIP";
  return "✅ Safe";
}

// ─── Inner content (rendered only in dev) ────────────────────────────────────

function ScrollDebugHUDContent() {
  const scrollProgress     = usePortfolioStore((s) => s.scrollProgress);
  const activeSceneIndex   = usePortfolioStore((s) => s.activeSceneIndex);
  const sceneLocalProgress = usePortfolioStore((s) => s.sceneLocalProgress);

  const safeIndex  = Math.min(Math.max(0, activeSceneIndex), SCENE_IDS.length - 1);
  const sceneId    = SCENE_IDS[safeIndex];
  const sceneLabel = SCENE_LABELS[sceneId] ?? sceneId;
  const subPhase   = getSubPhase(sceneLocalProgress);

  // Compute camera distance for clipping status via pure resolver (dev-only overhead is acceptable)
  const pose = resolveCameraPose(scrollProgress, SEGMENTS, SCENE_CAMERA_KEYFRAMES);
  const dist = Math.sqrt(
    pose.position[0] ** 2 +
    pose.position[1] ** 2 +
    pose.position[2] ** 2
  );
  const clipStatus = getClippingStatus(dist);

  return (
    <div className="scroll-debug-hud" aria-label="Scroll debug HUD" role="status">
      <div className="debug-title">SCROLL DEBUG</div>
      <div className="debug-row">
        <span className="debug-label">Progress</span>
        <span className="debug-value">{(scrollProgress * 100).toFixed(1)}%</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">Scene</span>
        <span className="debug-value">{safeIndex + 1}: {sceneLabel}</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">Local</span>
        <span className="debug-value">{(sceneLocalProgress * 100).toFixed(0)}%</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">Phase</span>
        <span className="debug-value debug-phase">{subPhase}</span>
      </div>
      <div className="debug-separator" />
      <div className="debug-row">
        <span className="debug-label">Clip</span>
        <span className="debug-value">{clipStatus}</span>
      </div>
      <div className="debug-row">
        <span className="debug-label">Cam Dist</span>
        <span className="debug-value">{dist.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ─── Public export — strict dev-only guard ────────────────────────────────────

export function ScrollDebugHUD() {
  if (!import.meta.env.DEV) return null;
  return <ScrollDebugHUDContent />;
}
