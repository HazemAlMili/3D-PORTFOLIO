# Portfolio 3D Source Structure

## Purpose

This folder contains the isolated source code for the cinematic 3D Full Stack Developer portfolio.

Concept: The System Behind Every Screen

The folder is intentionally separated from the root Vite starter app so future implementation stays scoped and controlled.

## Folder Responsibilities

| Folder | Responsibility | Current Status |
|---|---|---|
| `content/` | TypeScript content contracts and later portfolio content config | ✅ Implemented |
| `canvas/` | Persistent CanvasRoot / PortfolioCanvas system | ✅ Implemented (T1.4, T2.7) |
| `scenes/` | 8 scene modules and scene manager integration | ✅ Implemented (T1.8, T2.7) |
| `camera/` | Camera pose types, keyframes, CameraDirector, CameraController | ✅ Implemented (T2.1–T2.6) |
| `scroll/` | Scroll progress controller, scene progress mapper, protection | ✅ Implemented (T1.6, T1.7, T2.8) |
| `store/` | Zustand portfolio state store | ✅ Implemented (T1.5) |
| `overlays/` | DOM overlays and scene text/content layers | ✅ Implemented (T1.10) |
| `fallback/` | Reduced motion and WebGL fallback experiences | ✅ Implemented (T1.11, T1.12) |
| `performance/` | Performance monitor, device tiering, and optimization helpers | ✅ Implemented (T1.13) |
| `debug/` | Dev-only debug HUD overlay | ✅ Implemented (T2.9) |
| `assets/` | Model/texture references and asset organization | Scaffold only — Phase 3 |
| `shared/` | Shared utilities, constants, and helpers | Scaffold only |

## Phase Status

**Phase 1 — Technical Skeleton: ✅ LOCKED (T1.1–T1.15)**

**Phase 2 — Camera + Scroll Journey Prototype: ✅ LOCKED (T2.1–T2.10)**

**Phase 3 — Scene 01 Opening Build: 🔓 UNLOCKED — pending**



The following are intentionally not created in this task:

- CanvasRoot
- PortfolioCanvas
- SceneManager
- CameraDirector
- ScrollProgressController
- SceneProgressMapper
- Zustand store
- Scene components
- Material constants
- Shaders
- Asset registry

## Task 1.4 Canvas Shell

Task 1.4 introduces the first runtime shell:

- `Portfolio3DExperience`
- `CanvasRoot`
- `CanvasErrorBoundary`
- `CanvasFallback`

This task does not introduce scenes, camera director, scroll system, overlays, store, or assets.

## Task 1.5 Store Schema

Task 1.5 introduces the Zustand store schema:

- `store/storeTypes.ts`
- `store/portfolioStore.ts`

The store currently defines state and setters only.

It does not implement scroll listeners, scene mapping, camera control, WebGL detection, reduced-motion UI, device-tier detection, or performance monitoring.

## Task 1.6 ScrollProgressController

Task 1.6 introduces the scroll‑to‑progress binding:

- `scroll/ScrollProgressController.ts`
- `scroll/useScrollProgress.ts`

The hook listens to `scroll` and `resize` events, normalises the value to 0–1, and writes to `scrollProgress` in the Zustand store.

It does not implement scene segmentation, scene management, camera control, device detection, or reduced‑motion UI.

## Task 1.7 SceneProgressMapper

Task 1.7 introduces the pure mapping layer:

- `scroll/scrollSegments.ts`
- `scroll/SceneProgressMapper.ts`

The mapper takes global `scrollProgress` and returns the current scene index, scene ID, and local progress (0–1 within that scene).

It is a pure function with no React hooks, DOM access, or store coupling.

## Task 1.8 SceneManager

Task 1.8 introduces the scene orchestration system:

- `scenes/SceneManager.tsx`
- `scenes/ScenePlaceholder.tsx`

The SceneManager reads `activeSceneIndex` and `sceneLocalProgress` from the Zustand store and mounts the corresponding placeholder scene.

It renders 8 placeholder divs (no 3D content yet). Actual 3D scene content is built in Phases 3–10.

## Task 1.9 CameraDirector Skeleton

Task 1.9 introduces the deterministic camera math layer:

- `camera/cameraTypes.ts`
- `camera/CameraDirector.ts`

The `resolveCameraPose` function is a pure, reversible math function that translates `scrollProgress` into Camera Poses (Position/Target/FOV) using cubic easing. It currently uses **dummy placeholder poses** until Phase 2 populates the real keyframes.

## Task 1.10 ContentOverlaySystem Root

Task 1.10 introduces the DOM overlay structural shell:

- `overlays/ContentOverlayRoot.tsx`
- `overlays/ContentOverlayRoot.css`

The overlay root mounts a viewport-covering fixed shell to host 2D texts. It is designed to sit on top of the canvas, passing pointer events through, using static placeholders only.

## Task 1.11 ReducedMotionExperience Placeholder

Task 1.11 introduces the Reduced Motion toggle UI and static fallback DOM layer:

- `fallback/ReducedMotionExperience.tsx`
- `fallback/ReducedMotionExperience.css`

It uses local React component state to toggle a viewport-covering static DOM fallback layer containing "PENDING" placeholders for users who prefer reduced motion.

## Task 1.12 WebGL Detection + WebGLFallback Placeholder

Task 1.12 introduces the WebGL support check and fallback:

- `performance/webglDetection.ts`
- `fallback/WebGLFallback.tsx`
- `fallback/WebGLFallback.css`

It includes helper check functions (`detectWebGL` / `detectWebGL2`) and a premium styled full-page static WebGL fallback template containing "PENDING" placeholders.

## Task 1.13 PerformanceMonitor

Task 1.13 introduces the dev-only PerformanceMonitor HUD:

- `performance/PerformanceMonitor.tsx`
- `performance/PerformanceMonitor.css`
- `performance/index.ts`

It renders a real-time FPS overlay strictly in development environments via the `import.meta.env.DEV` check.

## Task 1.14 Manual Skeleton Journey Test

Task 1.14 integrates all Phase 1 skeleton systems for end-to-end scroll mapping and visual confirmation.

Modified files:
- `src/App.tsx`
- `src/portfolio3d/Portfolio3DExperience.tsx`
- `src/portfolio3d/canvas/CanvasRoot.tsx`

It links scroll events, stores global and scene-local progress, maps the active scene index, resolves camera pose interpolation, and mounts overlays.

## Task 2.1 Camera Keyframe Data Structure

Task 2.1 establishes the camera keyframe structure for all 8 scenes:

- `camera/cameraKeyframes.ts`

It defines the placeholder camera configurations (position, target, FOV) for the approach, enter, and exit sub-phases of each scene.

## Task 2.2 Deterministic Interpolation Function

Task 2.2 verifies and refines the deterministic camera pose interpolation resolver:

- `camera/CameraDirector.ts`

It maps global scroll progress to active segment phases (approach/enter/immerse/exit) using smooth cubic easing without any stateful side effects.

## Task 2.3 Per-Scene Approach Camera Motion

Task 2.3 connects the interpolation resolver to the React Three Fiber canvas runtime:

- `camera/CameraController.tsx`

It applies the computed camera pose dynamically to the Three.js camera strictly during the Approach sub-phase (0 to 0.25 local progress) of each scene, holding the position steady elsewhere.

## Task 2.4 Per-Scene Enter Camera Motion

Task 2.4 extends camera transformation updates to cover the Enter sub-phase (0.25 to 0.45 local progress) of each scene:

- `camera/CameraController.tsx` (Guard extended to 0.45)

No changes are made to the pure math resolver, allowing camera movements to animate smoothly through both approach and entry stages.

## Task 2.5 Per-Scene Immerse Camera Motion

Task 2.5 extends camera transformation updates to cover the Immerse sub-phase (0.45 to 0.8 local progress) of each scene:

- `camera/CameraController.tsx` (Guard extended to 0.8)

During Immerse, `resolveCameraPose` returns the `enter` pose unchanged. The camera holds steady, giving visitors a stable view to focus on content (hero text, project cards, architecture diagrams). No additional logic was required beyond the guard boundary expansion.

## Task 2.6 Per-Scene Exit Camera Motion

Task 2.6 completes the runtime camera binding by expanding the update window to cover the Exit sub-phase (0.8 to 1.0 local progress) of each scene:

- `camera/CameraController.tsx` (Guard extended to 1.0)

During Exit, `resolveCameraPose` applies `easeInOutCubic` easing to interpolate the camera from the `enter` pose to the `exit` pose. At `localProgress = 1.0`, the camera arrives at the exact exit pose, ready for the next scene's Approach. The handoff between scenes is seamless and deterministic — the pure resolver handles all boundary logic automatically.

The camera now responds to the full 0–1 scroll cycle for all 8 scenes. Phase 2 runtime binding is complete.

## Task 2.7 Clipping Guards and Occlusion Culling Flags

Task 2.7 adds the optimization and safety layer for the rendering pipeline:

- `canvas/CanvasRoot.tsx` — Documented `near: 0.1` / `far: 100` clipping plane values.
- `scenes/SceneManager.tsx` — Added `visible` prop for layout suppression.
- `scenes/ScenePlaceholder.tsx` — Added `visible` prop for occlusion culling flag support.
- `camera/cameraClipping.ts` — Dev-only clipping safety helper (`isCameraSafe`, `getClippingWarning`).

All new props default to `true` — no runtime behavior changes. Flags are ready for Phase 3 integration.

## Task 2.8 Reverse-Scroll State Protection and Velocity Jump Thresholds

Task 2.8 adds the scroll safety layer to prevent scene skipping and camera jitter under aggressive input:

- `scroll/scrollProtection.ts` — [NEW] Pure utilities: `clampScrollDelta()` (MAX_PROGRESS_DELTA = 0.05) and `resolveScrollDirection()`.
- `store/portfolioStore.ts` — `setScrollProgress` enhanced with delta clamping via `clampScrollDelta`. No new public state added.
- `scroll/ScrollProgressController.ts` — Comment added documenting that delta responsibility belongs to the store.

Normal scroll is unaffected. Aggressive input is smoothed over multiple frames — the camera always traverses every sub-phase.

## Task 2.9 Dev-Only Scroll Debug HUD

Task 2.9 implements the dev-only Scroll Debug HUD overlay:

- `debug/ScrollDebugHUD.tsx` — [NEW] Component displaying progress, scene, local progress, sub-phase, clipping status, and camera distance.
- `debug/ScrollDebugHUD.css` — [NEW] Dark glassmorphism styles.
- `debug/index.ts` — [NEW] Barrel export.
- `Portfolio3DExperience.tsx` — Mounts `<ScrollDebugHUD />`. Cleaned up the now-superseded hidden debug div.

Strictly dev-only via `import.meta.env.DEV` guard. Returns `null` in production. Mirrors the `PerformanceMonitor` architecture pattern.
