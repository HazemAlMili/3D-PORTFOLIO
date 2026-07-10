# Scene 01 — Kernel Build Sequence Resolution Report

**Date:** 2026-07-10  
**Ticket:** K — Scene 01 Kernel Build Sequence  
**Status:** ✅ Complete

---

## 1. Files Changed
* [`SystemBootKernel.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootKernel.tsx): Rewrote kernel rendering to implement a 4-phase assembly sequence (dormant seed → boot pulse scan → wireframe shell extrusion → core orb stabilization).
* [`systemBootMotion.ts`](file:///d:/PORT/src/portfolio3d/components/opening/systemBootMotion.ts): Adjusted narrative ranges to support the early kernel boot phases.

---

## 2. Previous Behavior vs. New Behavior
* **Previous**: The central kernel orb and outer wireframe shell would scale up simultaneously during `firstPulse` (`0.10 - 0.22`), meaning they appeared together. The wireframe shell scaled simply in size rather than showing a progressive construction.
* **New**: The kernel is built sequentially through 4 distinct scroll-driven phases. The scene starts with a tiny dormant seed, triggers a scan wave, extrudes the wireframe shell vertically, and finally stabilized the inner orb core as the active center of the system.

---

## 3. The 4-Phase Build Sequence
The kernel transition is divided into the following phases:

1. **Phase 1 — Dormant Seed (0.00 – 0.08)**
   * Only a tiny dim core seed (0.02 scale, 0.15 opacity) exists at center.
   * Shell is completely hidden (0.0 scale, 0.0 opacity).
   * Visualizes a quiet, asleep system.
2. **Phase 2 — First Pulse (0.08 – 0.16)**
   * Kernel orb glows with an emissive spike (`emissiveIntensity` up to 1.2).
   * Triggers an expanding scan ring (scale 0 → 4.0, opacity fades out).
   * Nearby particles start waking up. Shell is still dormant.
3. **Phase 3 — Shell Formation (0.16 – 0.26)**
   * The outer wireframe shell emerges, scaling to `0.32` and spinning fast.
   * **Vertical Assembly Extrusion**: We scale the shell on the Y-axis from 0 to 1 as `shellFormation` progresses (`scale.set(w, w * buildHeight, w)`). This makes the wireframe look like it is physically extruding into existence.
   * The inner core remains small (0.06 scale) and dim.
4. **Phase 4 — Core Stabilization (0.26 – 0.36)**
   * The inner orb core expands to its final scale (0.15), stabilizes its glow (`emissiveIntensity` settles to 0.8), and the shell rotation slows down to its stable system speed.

---

## 4. Final Timing Ranges
The early timeline beats are divided as follows:

| Progress Range | Phase | Visual Output |
| :--- | :--- | :--- |
| **0.00 – 0.08** | **Dormant Seed** | Tiny dim dot, no shell. |
| **0.08 – 0.16** | **First Pulse** | Emissive pulse, scan ring expands, wakes nearby particles. |
| **0.16 – 0.26** | **Shell Formation** | Wireframe shell extrudes vertically and spins fast. |
| **0.26 – 0.36** | **Core Stabilization** | Core orb grows to 0.15, shell completes, lights stabilize. |

---

## 5. Particle Integration & Reverse Scroll
* **Particles**: Handled in Ticket S: during data gathering (`0.20 – 0.35`, overlapping with the stabilization phase), particles stream inward from distance to bind to the kernel, visually reinforcing core stabilization.
* **Reverse Scroll**: Reversing the scroll deconstructs the kernel: the stabilized core shrinks, the shell retracts and collapses flat, the scan ring reverses, and the kernel returns to a tiny dormant seed.

---

## 6. Verification & QA

* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, compiled in 14.78s
* **Manual Verification**: The browser subagent successfully navigated to port `5174` and took screenshots showing:
  * At `y=0px` (0% progress): Only the tiny dormant seed was visible.
  * At `y=170px` (localProgress 12%): The scan ring was expanding outward.
  * At `y=350px` (localProgress 25%): The wireframe shell was forming with the inner core remaining small.
  * At `y=520px` (localProgress 34%): The inner core stabilized and grew to its final size.

---

```
PASS — Ticket K Scene 01 kernel build sequence complete. Kernel now assembles progressively instead of appearing abruptly.
```
