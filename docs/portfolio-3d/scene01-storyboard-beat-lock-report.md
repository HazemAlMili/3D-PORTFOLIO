# Scene 01 — Duration & Storyboard Beat Lock Resolution Report

**Date:** 2026-07-10  
**Ticket:** CP-02 — Scene 01 Duration & Storyboard Beat Lock  
**Status:** ✅ Complete

---

## 1. Files Changed
* [`scrollSegments.ts`](file:///d:/PORT/src/portfolio3d/scroll/scrollSegments.ts): Set Scene 01 scroll weight to 0.20 and locked camera immerse range to `[0.42, 0.90]`.
* [`systemBootMotion.ts`](file:///d:/PORT/src/portfolio3d/components/opening/systemBootMotion.ts): Locked narrative timelines (dormant, first pulse, data gathering, name compile, role classification, readable hold, layers build, lock, portal).
* [`CameraController.tsx`](file:///d:/PORT/src/portfolio3d/camera/CameraController.tsx): Programmed custom Camera Z-axis push (`Z=3.8 → 3.2`) between local progress `0.74` and `0.90`, followed by portal plunge after `0.90`.

---

## 2. Scroll Weight Allocation
* **Scene 01 weight**:
  * *Previous*: `0.16`
  * *New*: `0.20` (allocates 20% of total page scroll to the cinematic boot intro)
* **Updated Scene Weights Map**:
  * `[0.20, 0.14, 0.13, 0.12, 0.11, 0.11, 0.11, 0.08]` (normalizes to exactly `1.00`).
  * Adjusted weights for Scene 04 Projects (`0.14 → 0.12`) and Scene 05 Product UX (`0.13 → 0.11`) to balance the total.

---

## 3. Storyboard Beat Timeline Lock
Timings in `systemBootMotion.ts` are set to match the locked storyboard:

| Local Progress | Stage | Action |
| :--- | :--- | :--- |
| **0.00 – 0.14** | **Dormant Hold** | Quiet, tiny seed at the center. No shell or overlays. |
| **0.14 – 0.26** | **First Pulse** | Emissive pulse scan wave wakes nearby data. |
| **0.20 – 0.34** | **Shell Formation** | Wireframe shell extrudes vertically and spins fast. |
| **0.26 – 0.42** | **Data Gathering** | Particles stream inward to assemble the active system core. |
| **0.42 – 0.58** | **Name Compile** | Name decrypts right-to-left guided by sweep laser and status tags. |
| **0.54 – 0.68** | **Role Classification** | Role compiles under name, letter-spacing settles from wide to narrow. |
| **0.64 – 0.74** | **Identity Hold** | Completed identity is held static and legible. |
| **0.72 – 0.84** | **Layers Online** | Frontend, API, and DB architectural layers build progressively. |
| **0.82 – 0.90** | **System Lock** | Core stabilizes, lights settle, anticipation hold before entry. |
| **0.90 – 1.00** | **Portal Entry** | Portal concentric rings open, camera plunges through the core. |

---

## 4. Explicit Hold States
Every major stage has a dedicated hold zone to prevent continuous animation clutter:
* **Dormant Hold (`0.00 - 0.14`)**: Rest state.
* **Kernel Online (`0.26 - 0.42`)**: Stabilized core visible before compile.
* **Identity Readable Hold (`0.64 - 0.74`)**: Text fully legible before stack construction.
* **System Lock (`0.82 - 0.90`)**: Architecture completed, awaiting entrance.

---

## 5. Camera Timing Adjustments
Custom positioning rules were added to `CameraController.tsx` to align the camera with the storyboard:
* **0.00 – 0.42 (Wide Mysterious Hold)**: Camera is far at `Z=7.5`, slowly drifting to `Z=3.8`.
* **0.42 – 0.74 (Stable Identity Framing)**: Camera remains perfectly static at `Z=3.8` to frame identity compilation.
* **0.74 – 0.90 (Subtle Push Toward Core)**: Camera slowly pushes from `Z=3.8` to `Z=3.2`.
* **0.90 – 1.00 (Portal Plunge)**: Camera plunges forward through the center of the portal (`Z=3.2 → 0.9`), matching portal opening.

---

## 6. CP-01 Preservation & Verification
* **CP-01 Preservation**: All dampened input sensitivity values (wheel: `0.00003`, touch: `0.0002`) and speed clamps (max delta: `0.009`, damping: `0.05`) remain active.
* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, compiled in 16.69s

---

```
PASS — Ticket CP-02 Scene 01 Duration & Storyboard Beat Lock complete. Scene 01 now has enough scroll space and clear cinematic beats.
```
