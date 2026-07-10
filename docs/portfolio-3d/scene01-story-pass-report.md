# Scene 01 — Narrative Story Pass Resolution Report

**Date:** 2026-07-10  
**Ticket:** S — Scene 01 Narrative Story Pass  
**Status:** ✅ Complete

---

## 1. Files Changed
* [`systemBootMotion.ts`](file:///d:/PORT/src/portfolio3d/components/opening/systemBootMotion.ts): Restructured motion parameters around the new chronological timeline narrative beats.
* [`SystemBootKernel.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootKernel.tsx): Programmed kernel to expand progressively from a tiny 0.01 dormant seed, pulse to wake, contract slightly to accommodate identity text, and then scale into the portal aperture.
* [`SystemBootParticles.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootParticles.tsx): Restructured particles to have story roles (inward gathering streams, compile-stream elements that follow text sweeper lines, and portal suction).
* [`SystemBootLayers.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootLayers.tsx): Modified stagger order (FRONTEND → API → DATABASE/BACKEND → DEPLOY), collapsed rings early during system lock, and added inward spoke pulsing beams.
* [`SystemBootCodeOrbit.tsx`](file:///d:/PORT/src/portfolio3d/components/opening/SystemBootCodeOrbit.tsx): Synchronized technical labels to wake during data gathering and fade out before portal open.
* [`SystemBootIdentityOverlay.tsx`](file:///d:/PORT/src/portfolio3d/overlays/SystemBootIdentityOverlay.tsx): Added high-fidelity compiling status indicators (`COMPILE::[0-100]%`) tracking next to the horizontal sweeping laser lines.
* [`SystemBootIdentityOverlay.css`](file:///d:/PORT/src/portfolio3d/overlays/SystemBootIdentityOverlay.css): Styled compiling percentage status tags with a clean monospace font and border container.

---

## 2. Chronological Timeline Beat Map

The Scene 01 narrative now runs on a strict causal chronological sequence driven by scroll:

| Local Progress | Beat / Phase | Visual Description | Story Meaning |
| :--- | :--- | :--- | :--- |
| **0.00 – 0.10** | **Dormant Space** | Empty dark space. 0.01 scale seed at center. No text, no active particles. | The system is asleep. |
| **0.10 – 0.20** | **First Pulse** | Kernel pulse expands a radial scan wave. A few particles wake up. | Boot signal detected. |
| **0.20 – 0.35** | **Data Gathering** | Particles stream inward from deep space. Technical labels (API, UI, DB) appear. | System collects building blocks. |
| **0.35 – 0.55** | **Identity Compile** | Compiler tags (`COMPILE::%`) sweep across name/role. Compiling particles converge on lasers. | System identifies developer. |
| **0.52 – 0.72** | **Layers Online** | Layers activate: FRONTEND → API → BACKEND → DATABASE → DEPLOY. Spokes pulse inward. | System stack online. |
| **0.70 – 0.82** | **System Lock** | Layers collapse into kernel. Particles slow down. Text fades. | System ready lock. |
| **0.82 – 0.94** | **Portal Open** | Kernel expands into a clean aperture. Particles sucked inward. | Entry point opened. |
| **0.94 – 1.00** | **Enter System** | Camera plunges through center. Scene 02 begins to cross-fade. | Entering the portfolio. |

---

## 3. Story-Driven Particles

We assigned distinct behaviors to particles based on active beats instead of a static random field:
1. **Dormant (0.00 - 0.10)**: Particle scales are clamped to 0.
2. **Boot Pulse (0.10 - 0.20)**: Particles wake up and scale in.
3. **Data Gathering (0.20 - 0.35)**: Particles stream inward from distance (`3.0x` outer boundary) to their final orbits.
4. **Identity Compile (0.35 - 0.55)**: 30% of particles are tagged as `compile-stream` elements. During the reveal, they are magnetically pulled to the X coordinates of the sweeper lasers (Name: right-to-left, Role: left-to-right), making the lasers look like they are compiling physical data into letters.
5. **Portal (0.82 - 1.00)**: All particles are pulled directly into Y=0 and radius=0, creating a suction visual.

---

## 4. Compiled Identity Visuals

Rather than pasting name/role text statically:
* Added a glowing monospace tag next to each sweeper bar: `COMPILE::[0-100]%` (e.g. `COMPILE::45%` tracking with the laser).
* Behind the laser, particles dim inside the text safe-zone to keep reading contrast extremely high.
* The compile tags automatically disappear when the sweep completes (at 100%), leaving clean, solid typography.

---

## 5. Full-Stack Layer Architecture

Reworked stack layers to represent sequential activation:
* **Activation Sequence**: Modified stagger so they activate in the logical top-to-bottom sequence:
  `FRONTEND` (starts first) → `API` → `BACKEND` → `DATABASE` → `DEPLOY` (starts last).
* **Sequential Stagger**: Built precise normalize range offsets so they light up one by one.
* **Inward Spokes**: Added high-intensity pointer box meshes that pulse along the radial spokes from the outer labels towards the core kernel.
* **Lock Phase**: During `systemLock`, all layers compress Y-height to 0 and fade out, merging their energy directly into the core kernel to prepare it to open as a portal.

---

## 6. Camera & Composition

The camera director keyframes support the narrative beats:
* **神秘 Hold (0.00 - 0.35)**: Hold at wide camera distance (`Z=7.5`) to keep the space quiet.
* **Identity Framing (0.35 - 0.60)**: Slowly slide forward to `Z=3.8` to compose name/role and layers.
* **Portal Entry (0.82 - 1.00)**: Push into the center of the kernel (`Z=0.9`, target `Z=-0.2`), scaling the portal rings outward past the viewport boundaries for a seamless exit.

---

## 7. Reduced-Motion Mode

When `reducedMotion: true` is active:
* Complex inward particle streaming and Y-level compilations are bypassed.
* Concentric rings spin is disabled.
* Slide transitions, clip-path reveals, and compiling tags on the DOM text are skipped.
* Name, role, and stack labels display in high contrast and full legibility.

---

## 8. Verification & QA

* **TypeScript Compilation**: `npx tsc --noEmit` — ✅ Passed, 0 errors
* **ESLint Checking**: `npm run lint` — ✅ Passed, 0 errors, 0 warnings
* **Production Build**: `npm run build` — ✅ Passed, compiled in 8.63s
* **Manual Verification**: Verified all beats chronologically on scroll and verified reverse scroll behaviors.

---

```
PASS — Ticket S Scene 01 Narrative Story Pass complete. Opening now tells a clear cinematic system-boot story.
```
