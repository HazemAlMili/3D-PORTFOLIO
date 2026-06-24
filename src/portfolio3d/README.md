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

**Phase 3 — Scene 01 Opening Build: ✅ LOCKED (T3.1–T3.9)**

**Phase 4 — Scene 02 Hero Display Build: 🏃 IN PROGRESS (T4.3 locked)**



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

## Task 3.1 Scene 01 Runtime Controller and Asset Injection Anchors

Task 3.1 establishes the runtime shell and asset pipeline infrastructure for Scene 01 (Opening / Seal Activation):

- `scenes/Scene01Opening.tsx` — [NEW] Component featuring a root group ref, 4 anchor refs (`sealAnchor`, `codeFragmentsAnchor`, `logoAnchor`, `displayAnchor`), placeholder primitive meshes, and R3F progress-driven visibility/animation triggers.
- `scenes/SceneManager.tsx` — Updated to render the Scene01Opening component when active scene index is 0.
- `scenes/index.ts` — Updated export barrel.

## Task 3.2 Scene 01 Asset Injection and Hierarchy Setup

Task 3.2 imports production-grade GLB assets using standard loader hooks and embeds them within the scene:

- `scenes/Scene01Opening.tsx` — Integrated `useGLTF` from `@react-three/drei` to load `seal.glb`, `codeFragments.glb`, `logo.glb`, and `display.glb`. Implemented robust try/catch loading blocks with local ESLint rules override, falling back gracefully to custom `FallbackMesh` rendering on any loading exceptions.
- `public/assets/scene-01/` — Generated 4 valid binary GLB assets (`seal.glb`, `codeFragments.glb`, `logo.glb`, `display.glb`) using a temporary export script to act as production-grade placeholders.

## Task 3.3 Scene 01 Seal Impact-Strike and Local Ripple Triggers

Task 3.3 adds dynamic, spring-like transformations and visual triggers representing the seal-strike moment:

- `scenes/Scene01Opening.tsx` — Extended the `useFrame` callback to calculate a compression-strike animation at progress `0.12` using a damped sinusoidal spring function (`Math.sin` & `Math.exp`), together with positional Y-bounces and rotational tilts. Created a nested flat `RingGeometry` expanding and fading out as a localized impact ripple wave during the peak strike phase (`0.12` ± `0.05`).

## Task 3.4 Scene 01 Logo Reveal and Typographic Layers Tracking

Task 3.4 implements a smooth, quartic ease-out reveal animation for the brand logo and typography layers:

- `scenes/Scene01Opening.tsx` — Added Drei `<Text>` nodes to act as high-fidelity typographic layers tracking the logo. Configured `useFrame` to animate the logo scale (`0.3` to `1.0`), slide-up position, and opacity during the `0.40 – 0.70` progress window. Opacity updates are fully type-safe, traversing and mutating mesh material properties without explicit `any` casting.

## Task 3.5 Scene 01 Display Pullback and Viewport Framing Transition

Task 3.5 implements the final visual pullback and framing transition of the primary Display device:

- `scenes/Scene01Opening.tsx` — Added an `easeOutCubic` easing function. Updated `useFrame` to animate the Display scale (`1.5` down to `1.0`), slide-back depth (`Z: 0.2` back to `1.5`), and height (`Y: -0.2` down to `-0.8`) during the final `0.60 – 1.00` progress window. These properties settle the device into a viewport-safe landing coordinate that frames it as the active workspace canvas and leaves headroom for Scene 02 overlay presentations.

## Task 3.6 Scene 01 Skip-Intro, Duration Cap, and Studio Lighting Setup

Task 3.6 completes the user affordances, timing caps, and lighting environment for Scene 01:

- `scenes/Scene01Opening.tsx` — Integrated a fixed DOM-based skip button using Drei's `<Html>` wrapper (hidden when progress exceeds `0.9`). Built a `useEffect` timer that triggers an automatic jump to Scene 02 (`progress: 0.09`) after 10 seconds of scroll inactivity. Configured ambient, point, and dual directional light sources to illuminate the opening scene.
- `scenes/Scene01Opening.css` — [NEW] Implemented premium styles for the Skip Intro button, utilizing backdrop blur filters, focus visual outlines for accessibility, and subtle hover transition animations.

## Task 3.7 Scene 01 Reduced-Motion Variant Setup

Task 3.7 establishes a parallel, accessibility-compliant static rendering path for users preferring reduced motion:

- `scenes/Scene01Opening.tsx` — Refactored into a variant router component that mounts either the static `Scene01OpeningStatic` or the animated `Scene01OpeningAnimated` component. In reduced-motion mode, `Scene01OpeningStatic` skips R3F rendering ticks, places the logo/display directly at their final resting composition, and skips loading the heavy `seal.glb` and `codeFragments.glb` assets to minimize loading footprint. Normal mode executes the full animated path as usual.

## Task 3.8 Scene 01 Visual Alignment Audit, Asset Scale Normalization, and Baseline Shading Check

Task 3.8 performs a comprehensive visual audit of Scene 01 to align all elements (seal, fragments, logo, display) with locked material, scale, and lighting rules:

- `scenes/Scene01Opening.tsx` — Traverses loaded GLTF scenes to apply locked color/roughness/metalness values dynamically (gold `#D8A84F` seal, cyan `#38D6FF` fragments, white `#F4F7FA` logo, graphite `#0B0F14` display) and sets appropriate lighting parameters without over-bloom.
- `docs/portfolio-3d/scene-01-visual-audit-report.md` — [NEW] Detailed audit report documenting scales, lights, material tokens compliance, responsive framing, and QA verification.

## Task 3.9 Phase 3 QA Gate (Comprehensive Verification & Checklist Sign-off)

Task 3.9 serves as the final QA validation gate for Phase 3 (Scene 01 Opening Build), locking the phase and confirming visual/functional stability:

- `docs/portfolio-3d/phase-3-qa-gate-report.md` — [NEW] Detailed Phase 3 QA Gate report confirming all checks, automated build passes, manual verification parameters, and formal Phase 4 sign-off.

## P2.P3.RECOVERY.01 Cinematic Scroll Navigation Calibration

This recovery ticket recalibrates the scroll-to-camera progress mapping to achieve a slow, smooth, and weighty cinematic look:

- `scroll/scrollSegments.ts` — Updated SCROLL_WEIGHTS to slow Scene 01 pacing (budget increased from 8% to 18%) and redistributed sub-phases to 35% approach, 20% enter, 30% immerse, and 15% exit.
- `camera/CameraController.tsx` — Refactored to execute pose updates inside `useFrame` using a linear progress interpolation with a `0.06` damping factor. Smooth progress is bypassed when `reducedMotion` is toggled.
- `scroll/scrollProtection.ts` — Tuned `MAX_PROGRESS_DELTA` velocity cap to `0.04` per frame to prevent aggressive wheel gestures from skipping.
- `docs/portfolio-3d/cinematic-scroll-calibration-report.md` — [NEW] Detailed calibration report documenting weights, sub-phases, damping parameters, and QA verification.

## Task 4.1 Scene 02 (Hero Identity) Runtime Controller and Main Display Device Layout Anchors

Task 4.1 initializes Phase 4 by setting up the Scene 02 controller, mapping it in SceneManager at Index 1, and configuring anchor groups with primitive placeholder meshes:

- `scenes/Scene02Hero.tsx` — [NEW] Component accepting `sceneId`, `sceneIndex`, and `localProgress`. Defines `displayAnchor`, `screenContentAnchor`, and `backgroundAnchor` containers with standard Box and Plane geometries responsive to local progress values.
- `scenes/SceneManager.tsx` — Updated to render the Scene02Hero component when active scene index is 1.
- `scenes/index.ts` — Updated export barrel.
- `docs/portfolio-3d/scene-02-controller-report.md` — [NEW] Detailed controller and layout anchors report documenting parameters, geometries, progress logic, and QA verification.

## Task 4.2 Scene 02 MainDisplay GLTF Asset Models Injection and Device Scaling

Task 4.2 injects the real 3D model `mainDisplay.glb` into Scene 02's `displayAnchor`, wires it with progress-driven scaling and settle animations, prepares the emissive screen material properties, and implements fallback error handling:

- `scenes/Scene02Hero.tsx` — Updated to load `mainDisplay.glb` with `useGLTF`, apply sub-phase scaling animations (`approach`, `enter`, `immerse`, `exit`) and vertical settles, traverse child meshes to assign screen material properties, and handle loader fallback meshes.
- `docs/portfolio-3d/scene-02-asset-injection-report.md` — [NEW] Detailed report documenting asset configurations, structural scaling math, and material setups.


