# Camera Exit Transition Report (Scene 02 → Scene 03)

This document details the design, mathematical formulation, and verification of the camera exit transition between Scene 02 (Hero Display) and Scene 03 (Architecture Layout).

## 1. Segment Boundaries and sub-phases

The scroll progress segments are defined dynamically based on `SCROLL_WEIGHTS` inside `scrollSegments.ts`. For the current weights `[0.18, 0.09, 0.11, 0.16, 0.11, 0.09, 0.11, 0.15]`:

- **Scene 02 (Hero)**:
  - Global Range: `[0.18, 0.27]`
  - Exit Sub-phase: `[0.85, 1.0]` of local segment (global progress `[0.2565, 0.27]`)
- **Scene 03 (Architecture)**:
  - Global Range: `[0.27, 0.38]`
  - Approach Sub-phase: `[0.0, 0.35]` of local segment (global progress `[0.27, 0.3085]`)

The boundary point where the transition occurs is exactly global progress **0.27**.

## 2. Keyframe Configuration

Camera keyframes are defined inside `src/portfolio3d/camera/cameraKeyframes.ts` as:

- **Scene 02 Exit Pose**:
  - `position`: `[0, 0, 14]` (mirrors approach position)
  - `target`: `[0, 0, 0]` (MainDisplay screen center)
- **Scene 03 Approach Pose**:
  - `position`: `[0, 0, 7.6]` (calculated as `enter.position [0, 0, 4] + screenNormal [0, 0, 1] * (screenHeight 2.0 * 1.8)`)
  - `target`: `[0, 0, 0]` (UltraWideMonitor screen center placeholder)

## 3. Mathematical Continuity and Reversibility

The continuity is maintained via the stateless camera director resolver:
- During Scene 02 exit sub-phase, camera moves from Scene 02 enter `[0, 0, 4]` to Scene 02 exit `[0, 0, 14]`.
- Upon crossing boundary `0.27` into Scene 03, the resolver interpolates from Scene 02 exit `[0, 0, 14]` to Scene 03 approach `[0, 0, 7.6]` over the local range `[0.0, 0.35]`.
- Because the resolver is a pure function of `globalProgress`, scrolling backward retraces this interpolation path identically with zero drift or discontinuities.
