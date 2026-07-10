# Scene 01 — System Boot Cinematic Polish & Performance Report

**Date:** 2026-07-10  
**Ticket:** P — Scene 01 System Boot Cinematic Polish & Performance Lock  
**Status:** ✅ Complete

---

## 1. Text Flicker Root Cause & Resolution

### Root Cause
Typographic text elements (developer name and role) experienced rendering flicker and depth-sorting instability. This was caused by:
1. **Depth Fighting**: Shared Z-depth ranges between the text planes and nearby transparent elements (particles, outer wireframe, rings).
2. **Transparent Order Conflict**: Three.js was sorting and drawing the overlapping semi-transparent meshes in varying order from frame to frame, leading to visual occlusion and flickering.

### Fix
* **Layer Protection**: Applied explicit `renderOrder={50}` to the developer identity text meshes in `SystemBootIdentity.tsx`.
* **Depth Gating**: Enabled R3F prop shortcuts `material-depthTest={false}` and `material-depthWrite={false}` for the text. This forces the text to render cleanly on top of all Scene 01 computing elements.
* **Stable Floating**: Calmed floating breathing animations to avoid constant vertical bobbing, maintaining layout stability.

---

## 2. Text Safe Zone (Readability Lock)

To guarantee readability, we created a protected **Text Safe Zone** in `SystemBootParticles.tsx` during identity reveal phases:
* **Safe Zone Bounds**: `X [-1.6, 1.6]`, `Y [-0.35, 0.35]`, `Z > 0.2` (in front of the core kernel).
* **Particle Avoidance**: If the identity reveal is active, any data particle that enters this bounding box is instantly scaled down to `0`. This keeps particles from obscuring the text letters while keeping the surrounding orbital stream visible.

---

## 3. Identity Assembly (Assembly Scan/Reveal)

Instead of name and role popping in or fading abruptly, we implemented a physical **Assembly Scan Line**:
* **Local Clipping Planes**: Configured two Three.js clipping planes on the text materials:
  * **Name**: Normal `(-1, 0, 0)` sweeping from right to left (revealing text behind it).
  * **Role**: Normal `(1, 0, 0)` sweeping from left to right.
* **Laser Sweeper Bar**: Rendered a glowing vertical beam (a thin cyan box mesh + point light) at the exact boundary of the clipping plane. The beam guides the sweep, creating the visual illusion that the laser is actively drawing/assembling the text into space.
* **Clipping Activation**: WebGL local clipping is globally enabled on the canvas in `CanvasRoot.tsx`.

---

## 4. Performance Optimization

* **Reduced Particle Visual Load**: Decreased particle counts across all tiers to improve FPS on low-power devices.
  * **High tier**: 400 $\to$ **260 particles**
  * **Medium tier**: 200 $\to$ **140 particles**
  * **Low tier**: 60 $\to$ **50 particles**
* **Strict Size Distribution**: Cleaned up the particle field to avoid large distracting shapes:
  * **80% Small** (scale 0.012)
  * **17% Medium** (scale 0.026)
  * **3% Large** (scale 0.045)
* **Zero Per-Frame Allocations**: Cached the `THREE.Object3D` transformer and `THREE.Color` properties to avoid garbage collection spikes in `useFrame`.
* **Transparent Material Discipline**: Set `depthWrite={false}` on all transparent meshes (particles, rings, layers, portal) to prevent GPU overdraw and pipeline stalls.

---

## 5. Kernel Visual Polish

* **Dark Glass Orb**: Replaced the solid white flat core in `SystemBootKernel.tsx` with a multi-layered design.
  * An inner high-reflectivity dark sphere with emissive accent cyan backing.
  * An outer concentric rotating icosahedron wireframe shell.
* **Scale Modulation**: The kernel core scales down by 30% during the identity reveal to clear visual space for the text, then expands into a massive aperture portal.

---

## 6. Full-Stack Layers Polish

* **Radial connecting spokes**: Added horizontal connecting lines spanning from the core to each staggered layer ring.
* **Less visual noise**: Reduced vertical connection rails from 4 to 3 to keep the center clean, and set `renderOrder` layering between rings (15) and text (16).
* **Smooth collapse**: Ensured all elements (rings, spokes, text) scale to 0 and slide to Y=0 during the portal transition.

---

## 7. Reduced Motion Behavior

If `reducedMotion: true`:
* Particle meshes, orbit paths, and laser sweeps are fully disabled.
* Staggered layers, core kernel, name, and role are rendered statically at their final positions immediately without motion.

---

## 8. QA Results

* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, built in 23.95s
* **Manual Verification**: Text sweep reveal, safe zone, and smooth Scene 02 transition behave correctly.

---

```
PASS — Scene 01 System Boot Cinematic polish complete. Text is stable, particles are performant, identity reveal is logically assembled, and the opening is ready for final review.
```
