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

## Next Task

The next planned task is Task 1.4 — Build CanvasRoot / PortfolioCanvas with persistent Canvas and CanvasFallback error boundary.
