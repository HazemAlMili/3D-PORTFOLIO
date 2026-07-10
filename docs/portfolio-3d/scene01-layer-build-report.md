# Scene 01 — Layer Build Sequence Resolution Report

**Date:** 2026-07-10  
**Ticket:** L — Scene 01 Layer Build Sequence  
**Status:** ✅ Complete

---

## 1. Files Changed
* [`SystemBootLayers.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootLayers.tsx): Rewrote layer rendering to implement a 3-step progressive assembly per layer (structure sweep → spoke connection → label activation).
* [`systemBootMotion.ts`](file:///d:/PORT/src/portfolio3d/components/opening/systemBootMotion.ts): Tuned overlapping ranges to support smooth sequential build pacing.

---

## 2. Previous Behavior vs. New Behavior
* **Previous**: Layers would fade in using a single shared opacity value (`currentOpacity`). When a layer beat activated, the full circular ring, the complete connecting spoke, and the text label would all fade in simultaneously. This made the architecture feel like it popped in suddenly.
* **New**: Each layer is assembled dynamically in **three sequential phases** driven by the scroll progression. The structure traces itself around the Y axis, the spoke grows outward from the kernel, and the label slides out and fades in only after construction is complete.

---

## 3. The 3-Step Construction Sequence
Each layer computes its local progress (`finalReveal` from 0.0 to 1.0) and decomposes it into three sequenced steps:

1. **Step 1 — Structure Draw (`finalReveal` range: 0.0 – 0.5)**
   * We pass a dynamic `thetaLength` to `<ringGeometry>`:
     `Math.PI * 2 * structureProgress` (where `structureProgress` goes 0 → 1).
   * This causes the ring platform and the wireframe grid to **trace themselves visually** in a circular sweep.
2. **Step 2 — Connection Bind (`finalReveal` range: 0.4 – 0.8)**
   * The radial spoke connecting the layer ring to the outer label extends outward from the center.
   * Spoke length is computed as `ringScale * connectionProgress` and centered at the midpoint to look like a line growing outward.
   * High-intensity status pulses travel along the connection lines.
3. **Step 3 — Label Activation (`finalReveal` range: 0.7 – 1.0)**
   * The label text is faded in: `currentOpacity * labelProgress`.
   * The label position slides outward from the ring edge to its final coordinate:
     `labelDist = ringScale + 0.12 * labelProgress`.

---

## 4. Per-Layer Timing Ranges
The overall layer build window is set to `layersOnline: 0.52 – 0.72` inside `systemBootMotion.ts`. Within this timeline, layers are staggered sequentially from top to bottom:

| Layer Name | Stack Level | Stagger Index | Local Reveal Range |
| :--- | :--- | :--- | :--- |
| **FRONTEND** | Top (Index 4) | 0 | `0.00 – 0.32` |
| **API** | Index 3 | 1 | `0.14 – 0.46` |
| **BACKEND** | Index 2 | 2 | `0.28 – 0.60` |
| **DATABASE** | Index 1 | 3 | `0.42 – 0.74` |
| **DEPLOY** | Bottom (Index 0) | 4 | `0.56 – 0.88` |

---

## 5. Reverse Scroll & Deconstruction
Because all animations are calculated mathematically from scroll progress without stateful hooks or active timelines:
* **Reverse scrolling deconstructs the layers cleanly**:
  * Labels slide back and fade out.
  * Connections retract back into the center kernel.
  * Ring platforms untrace themselves (sweep back to 0 degrees).

---

## 6. Verification & QA

* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, compiled in 15.50s
* **Manual Verification**: The browser subagent successfully scrolled through the layers beat on port `5174` and captured screenshots.
  * At `y=1132px` (localProgress 60%), only `FRONTEND` was fully constructed while `API` was partially tracing.
  * At `y=1341px` (localProgress 71%), `FRONTEND`, `API`, and `BACKEND` were complete while `DATABASE` was tracing and `DEPLOY` was dormant.
  * There are no warnings or errors in the browser console.

---

```
PASS — Ticket L Scene 01 layer build sequence complete. Layers now build progressively instead of appearing abruptly.
```
