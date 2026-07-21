# S04-P11 — Pointer Interaction & Micro-Motion Contract

> **Status:** LOCKED  
> **Authority:** Defines the additive, bounded pointer response layer for Scene 04. Preserves all camera, spatial, motion, content, material, and transition locks.

---

## 1. Authority Contract

- **Primary Narrative Authority:** Scroll progress ($p \in [0.00, 1.00]$).
- **Secondary Micro-Motion:** Small additive pointer response.
- **Strict Rule:** Pointer movement must NEVER alter camera keyframes, scene progress, capsule state, HUD position, or UX extraction handoff anchors. Pointer neutral $(0, 0)$ reproduces the exact locked base pose.

---

## 2. Input & Normalization Contract

- **Input Source:** Shared `usePointerInfluence()` (`pointerInfluence.smoothX`, `pointerInfluence.smoothY`).
- **Normalized Range:** Normalized $X \in [-1, +1]$, $Y \in [-1, +1]$.
- **Smoothing / Damping:** Damped chasing with speed $4.5$ ($dt \times 4.5$).
- **Touch / Mobile:** Disabled (`isMobileDevice() === true` returns 0 amplitude).
- **Reduced Motion / Low-Performance:** Disabled (`reducedMotion === true` returns 0 amplitude).
- **Pointer Leave / Window Blur:** Resets `targetX`, `targetY` to `(0, 0)` smoothly.

---

## 3. Micro-Motion Amplitude Bounds

### A. Camera Target Micro-Offset (`CameraController.tsx`)
- Desktop Max Target Offset:
  - Horizontal: $\pm 0.08$ world units (`pointer.smoothX * 0.09 * 0.4 = 0.036`).
  - Vertical: $\pm 0.05$ world units (`-pointer.smoothY * 0.05 * 0.4 = -0.020`).
- Tablet: Damped to 50% amplitude.
- Mobile / Touch: Disabled ($0$).

### B. Active Capsule Micro-Parallax (`Scene04ProjectsGreybox.tsx`)
- Desktop Max Rotation:
  - Yaw: $\pm 1.2^\circ$ ($\pm 0.021$ rad).
  - Pitch: $\pm 0.8^\circ$ ($\pm 0.014$ rad).
- Desktop Max Translation: $\le 0.025$ world units (`[pointer.smoothX * 0.02, -pointer.smoothY * 0.01, 0]`).
- Beat-Based Weighting ($w_{\text{pointer}}$):
  - Beat 01 ($0.00–0.12$): `0.0`
  - Beat 02 ($0.12–0.27$): `0.2`
  - Beat 03 ($0.27–0.42$): `0.5`
  - Beat 04 ($0.42–0.60$): `0.8`
  - Beat 05 ($0.60–0.74$): `0.5`
  - Beat 06 ($0.74–0.88$): `0.3` (restrained for Hero readability)
  - Beat 07 ($0.88–1.00$): `0.0` (disabled during UX extraction to land at exact transfer anchor `[1.35, 0.20, 0.05]`)

---

## 4. HUD & Text Isolation

- DOM HUD (`Scene04HUD.tsx`) is 100% isolated from pointer movement. Text remains stationary and fully readable.
- Protected Hero safe gap remains **`9.41%`** (target `8% – 12%`).
