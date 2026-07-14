# Scene 01 — Kernel Build & Data-Causal Assembly Resolution Report

**Date:** 2026-07-10  
**Ticket:** K-02 — Kernel Build & Data-Causal Assembly  
**Status:** ✅ Complete

---

## 1. Files Changed
* [`systemBootMotion.ts`](file:///d:/PORT/src/portfolio3d/components/opening/systemBootMotion.ts): Shifted outer `shellFormation` timing to run from `0.26` to `0.42`, aligning construction with data gathering.
* [`SystemBootParticles.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootParticles.tsx): Added spiral offset equations to direct gathering particles along vortex paths.
* [`SystemBootKernel.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootKernel.tsx): Synced wireframe vertical extrusion and emissive glows with the newly aligned construction timings.

---

## 2. Previous vs. New Kernel Build Behavior
* **Previous**: The outer shell wireframe formed and completed before the particles finished gathering (`0.20 – 0.34`), breaking the storyboard logic. Particles simply moved along linear radii towards the center, feeling decorative.
* **New**: Outer shell assembly is fully synchronized with data particle gathering (`0.26 – 0.42`). Arriving particles spiral inward dynamically and "construct" the core.

---

## 3. Progressive Core & Shell Construction
* **Phase 1 — Dormant Seed (`0.00 – 0.14`)**: Only a tiny, dim center seed (0.02 scale, 0.15 opacity) exists. Minimal glow, shell is unmounted.
* **Phase 2 — First Pulse (`0.14 – 0.26`)**: Emits a readable pulse. An expanding wake scan ring sweeps out from the center (scale `0 → 4.0`). Seed scales up slightly, nearby particles wake. Shell remains hidden.
* **Phase 3 — Data-Causal Assembly (`0.26 – 0.42`)**: Particles spiral inward in vortex trails. As they arrive, the wireframe shell progressively extrudes on the Y-axis (`0 → 1`) and spins. Core brightness rises gradually.
* **Phase 4 — Kernel Online (`0.40 – 0.48`)**: Shell extrusion completes. Core stabilized at final 0.15 scale. Glow settles, preparing for name compile.

---

## 4. Directed Particle Vortex Support
* **Spiral Assembly Paths**: Added a spiral angle offset during data gathering:
  `const spiralOffset = (1.0 - motion.dataGathering) * 2.5 * p.speed;`
* **Impact**: Particles vortex inward, creating a physical sense of gravity and structured assembly rather than floating ambiently.

---

## 5. Reverse-Scroll & Performance Lock
* **Reverse Scroll**: Reversing the scroll deconstructs the kernel. The outer shell compresses flat and unmounts, particles spiral outward, the pulse reverses, and the kernel returns to a tiny dormant seed.
* **Performance**: Stable 60 FPS. Instanced rendering is maintained for particles, with no raw timers or side-effects.

---

## 6. Verification & QA

* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, compiled in 19.91s

---

```
PASS — Ticket K-02 Kernel Build & Data-Causal Assembly complete. Kernel now assembles progressively and starts the Scene 01 story clearly.
```
