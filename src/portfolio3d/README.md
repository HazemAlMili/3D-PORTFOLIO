# Portfolio 3D Source Structure

## Purpose

This folder contains the isolated source code for the cinematic 3D Full Stack Developer portfolio.

Concept: The System Behind Every Screen

The folder is intentionally separated from the root Vite starter app so future implementation stays scoped and controlled.

## Folder Responsibilities

| Folder | Responsibility | Current Status |
|---|---|---|
| `content/` | TypeScript content contracts and later portfolio content config | `types.ts` exists |
| `canvas/` | Future persistent CanvasRoot / PortfolioCanvas system | Scaffold only |
| `scenes/` | Future 8 scene modules and scene manager integration | Scaffold only |
| `camera/` | Future camera pose types, keyframes, and CameraDirector | Scaffold only |
| `scroll/` | Future scroll progress controller and scene progress mapper | Scaffold only |
| `store/` | Future Zustand portfolio state store | Scaffold only |
| `overlays/` | Future DOM overlays and scene text/content layers | Scaffold only |
| `fallback/` | Future reduced motion and WebGL fallback experiences | Scaffold only |
| `performance/` | Future performance monitor, device tiering, and optimization helpers | Scaffold only |
| `assets/` | Future model/texture references and asset organization | Scaffold only |
| `shared/` | Future shared utilities, constants, and helpers | Scaffold only |

## Current Boundary

This task only scaffolds folders.

No runtime implementation exists yet.

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




