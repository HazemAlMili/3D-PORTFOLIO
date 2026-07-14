# Scene 01 — GSAP SplitText + Glyph Particle Identity Reveal Resolution Report

**Date:** 2026-07-10  
**Ticket:** IC-03 — GSAP SplitText + Glyph Particle Identity Reveal  
**Status:** ✅ Complete

---

## 1. Files Changed
* [`glyphTargets.ts`](file:///d:/PORT/src/portfolio3d/helpers/glyphTargets.ts): Created hidden canvas pixel-sampling helper to map developerName text into 3D world coordinates.
* [`Scene01Opening.tsx`](file:///d:/PORT/src/portfolio3d/scenes/Scene01Opening.tsx): Passed the `localProgress` coordinate to `SystemBootParticles`.
* [`SystemBootParticles.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootParticles.tsx): Upgraded particle counts and integrated glyph target coordinates, jitter, text-resolve size shrinkage, and kernel exit pulls.
* [`SystemBootIdentityOverlay.tsx`](file:///d:/PORT/src/portfolio3d/overlays/SystemBootIdentityOverlay.tsx): Coded the high-fidelity sequential span splitter and blur-to-sharp CSS transitions.

---

## 2. Dependency Audit
* **GSAP**: Already registered in `package.json` (`"gsap": "^3.15.0"`).
* **SplitText**: To avoid licensing restrictions and build issues with paid GreenSock files, we implemented a custom React-based span splitter that splits the developer name and role into character nodes. This provides full scroll-driven interpolation of each individual glyph.

---

## 3. Glyph Target Generation
* **Canvas Sampling**: `getGlyphTargets` renders the developer's name to an offscreen `canvas` and queries pixel alphas:
  - White text pixels (`alpha > 128`) are cached.
  - Uniform random samples are picked based on device tier and mapped to 3D world coordinates.
  - Viewport-relative scaling maps canvas coordinates to a `[-1.3, 1.3]` width and `[0.05, 0.39]` height box at depth `Z=0.8`.
  - Jitter is added for a volume effect.
  - The results are cached by key to prevent canvas recreation during re-renders.

---

## 4. Particle Counts by Device Tier

| Tier | Total Particles | Glyph Particles (45%) | Orbit Particles (55%) |
| :--- | :--- | :--- | :--- |
| **Low** | 90 | **40** | 50 |
| **Medium** | 200 | **90** | 110 |
| **High** | 400 | **180** | 220 |

---

## 5. Timeline Sequence Control
The local scroll progress drives all reveal behaviors:
* **0.40 – 0.46 (Data Outward Routing)**: Outline ghost frames appear, and glyph particles travel from the core `[0,0,0]` to their destination letter points.
* **0.44 – 0.54 (Glyph Jitter)**: Particles vibrate (`Math.sin(time * 12 + i) * 0.012`) at their glyph targets, spelling the name.
* **0.50 – 0.62 (Name Compile)**: Letters resolve from right-to-left. Character spans interpolate individually:
  - Opacity: `0 → 1`
  - Blur filter: `10px → 0px`
  - Scale: `0.8 → 1.0`
  - Y position: `+8px → 0px`
* **0.56 – 0.70 (Role Classification)**: Letters settle sequentially from left-to-right under the name. Spacing settles from wide (`0.32em`) to narrow (`0.18em`).
* **0.66 – 0.76 (Hero Hold)**: Solid DOM text is fully visible. Particles shrink by 75% to become tiny accent points.
* **0.76 – 0.88 (Exit Dissolve)**: Characters blur and Y-compress towards the kernel, while compile particles pull back into the center core.

---

## 6. Responsiveness
* Coordinates are calculated in percentage-based world units in ThreeJS rather than hardcoded pixels.
* CSS classes in `SystemBootIdentityOverlay.css` use relative typographic sizes (`vh`, `vw`, `em`) and flex centering to ensure layout scaling on all screens.

---

## 7. Verification & QA

* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, compiled in 24.78s

---

```
PASS — Ticket IC-03 GSAP SplitText + Glyph Particle Identity Reveal complete. Identity now reveals as a cinematic data-compiled moment with a clear wow effect.
```
