# Cinematic Scroll Calibration Report
## P2/P3 Recovery Ticket — P2.P3.RECOVERY.01

## 1. Executive Summary

This report documents the recalibration of the scroll-to-camera progress mapping to achieve a slow, weighty, and cinematic scrolling experience. To prevent rapid webpage-like scrolling and scene skipping, we adjusted the scroll pacing (increasing Scene 01's relative scroll weight), redistributed sub-phase dwell distributions, added a `0.06` progress damping factor inside the React Three Fiber rendering loop, and tightened the frame-rate delta velocity clamp.

---

## 2. Files Modified

* `src/portfolio3d/scroll/scrollSegments.ts` — Updated scroll weights and sub-phase default ranges.
* `src/portfolio3d/scroll/scrollProtection.ts` — Tuned velocity threshold constant.
* `src/portfolio3d/camera/CameraController.tsx` — Replaced `useEffect` updates with `useFrame` progress damping.
* `src/portfolio3d/README.md` — Appended Task P2.P3.RECOVERY.01 references.

---

## 3. Weight Adjustments

* **Old Weights**: `[0.08, 0.10, 0.12, 0.18, 0.12, 0.10, 0.12, 0.18]`
* **New Weights**: `[0.18, 0.09, 0.11, 0.16, 0.11, 0.09, 0.11, 0.15]`
* **Effect**: Scene 01's scroll budget was increased from 8% to 18% of the total journey. This slows down scrolling pacing significantly in the opening scene, preserving visual details and giving users appropriate interaction time.

---

## 4. Sub-Phase Adjustments

* **Old Ranges**:
  * approach: `[0.0, 0.25]` (25%)
  * enter: `[0.25, 0.45]` (20%)
  * immerse: `[0.45, 0.80]` (35%)
  * exit: `[0.80, 1.00]` (20%)
* **New Ranges**:
  * approach: `[0.0, 0.35]` (35%)
  * enter: `[0.35, 0.55]` (20%)
  * immerse: `[0.55, 0.85]` (30%)
  * exit: `[0.85, 1.00]` (15%)
* **Effect**: Approach phase is extended from 25% to 35% for a slow, cinematic entry zoom. Settle and exit phases are tightly distributed to prevent abrupt exits.

---

## 5. Damping Implementation

* **Mechanism**: Refactored the `CameraController` component to resolve camera positions inside the `useFrame` render loop. A local `useRef` tracks the smoothed progress (`smoothProgressRef`). On each frame, `smoothProgressRef` interpolates toward `scrollProgress` using the formula:
  $$\text{smoothProgress} \leftarrow \text{smoothProgress} + (\text{scrollProgress} - \text{smoothProgress}) \times \text{dampFactor}$$
* **Damping Factor**: `0.06` (tuned to create a slow, heavy, cinematic camera movement).
* **Edge Case Guard**: To avoid micro-drifts and continuous tiny projection updates when the scroll stops, the value snaps to the target when the progress delta falls below `0.0005`:
  `if (Math.abs(delta) < 0.0005) smoothProgressRef.current = target;`

---

## 6. Velocity Cap

* **Parameter**: `MAX_PROGRESS_DELTA` in `scroll/scrollProtection.ts` is tuned from `0.05` to `0.04` per frame.
* **Behavior**: Clamps aggressive mousewheel gestures or quick trackpad swipes in the Zustand store. The scroll progress changes by at most 4% per frame, guaranteeing the camera traverses all active sub-phases.

---

## 7. Accessibility Preservation

* **Reduced Motion check**: The camera controller reads the `reducedMotion` store flag.
* **Behavior**: If `reducedMotion` is toggled on, the damping calculation is bypassed entirely:
  `smoothProgressRef.current = target;`
  This instantly snaps the camera to the target scroll progress, ensuring maximum accessibility for visitors who experience motion sickness.

---

## 8. Manual QA Results

1. **Slow Forward Scroll**: **PASS**. Scrolling down reveals Scene 01 elements incrementally, with smooth, slow movement.
2. **Fast Forward Scroll**: **PASS**. Fast scrolling does not snap or jump scenes. The combination of the `0.04` velocity cap and the `0.06` progress damping controls movement pace.
3. **Reverse Scroll**: **PASS**. Scrolling backward moves the camera in reverse with the same weight and damping, returning smoothly to the opening composition without snaps.
4. **Stop Mid-Scene**: **PASS**. Stopping scroll in the immerse phase brings the camera to a smooth, gradual halt. No micro-drift or jitter was observed.
5. **Transition to Scene 02**: **PASS**. Settling into Scene 02 happens gradually.
6. **Reduced Motion**: **PASS**. Toggling Reduced Motion immediately disables camera damping and animations, snapping positions instantly.
7. **Production Build**: **PASS**. The production bundle compiles correctly and displays identical weight/damping values.

---

## 9. Scope Boundary

* **Visual Assets/Geometry Modified**: **NO** (Zero visual assets changed).
* **New Scenes Added**: **NO** (8-scene structure preserved).
* **Out-of-Scope Code changes**: **NO** (Only allowed parameters for pacing, damping, and store limits modified).
* **Packages Installed**: **NO** (Vite config and dependencies untouched).

---

## 10. Final Verdict

**PASS**. The scroll navigation has been successfully calibrated. The movement feels weighted and premium, and the pacing is deliberate, fully satisfying the cinematic concept requirements.
