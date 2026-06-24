# Task 1.14 — Manual Skeleton Journey Test (Assembly)

## Objective
Integrate all Phase 1 skeleton systems into the application entry point and perform a manual end-to-end scroll test to verify that the core state machine (Store → Scroll → Mapper → SceneManager → CameraDirector → Overlay) functions correctly as a cohesive unit.

This is the first integration and assembly task of the project.

This task must:
1. Wire `useScrollProgress` into the top-level `Portfolio3DExperience` or `App` component to start populating the store.
2. Wire `SceneManager` into the `CanvasRoot` (inside the `<Canvas>` component or alongside it) to render placeholders based on `activeSceneIndex`.
3. Wire `ContentOverlayRoot` into the top-level UI.
4. Wire `PerformanceMonitor` into the top-level UI (dev-only).
5. Wire `ReducedMotionExperience` into the top-level UI.
6. Wire `CameraDirector` logically (the `resolveCameraPose` function must be called, but the result is not yet applied to the Three.js camera).
7. Perform a manual scroll test (forward and reverse) to ensure:
   - `scrollProgress` updates smoothly.
   - `activeSceneIndex` changes correctly.
   - `SceneManager` mounts/unmounts the correct placeholder scene.
   - `ContentOverlayRoot` is visible and does not break layout.
   - No console errors appear.

This task does not implement:
- Final camera movement (applying pose to the Three.js camera).
- Final content (copy, images, links).
- Full production optimization.
- Phase 2 tasks (keyframe authoring, final transitions).
- P1 T15 (Phase 1 QA gate).

## Allowed Work
- Modify: `src/App.tsx`, `src/portfolio3d/Portfolio3DExperience.tsx`, `src/portfolio3d/canvas/CanvasRoot.tsx`.
- Create: `docs/portfolio-3d/skeleton-journey-test-report.md`.
- Update: `src/portfolio3d/README.md`.

## Not Allowed Work
- Applying the `CameraDirector` pose to the actual Three.js camera.
- Modifying the `ScenePlaceholder` to show real content.
- Changing the `SCROLL_WEIGHTS` or scene order.
- Installing any packages.
- Adding GSAP or animations.
- Starting P1 T15 (Phase 1 QA gate) or Phase 2.
