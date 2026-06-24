# Reduced Motion & Low-Tier Device Report (Scene 02)

This document details the implementation, performance metrics, and accessibility verification of the static card variant for Scene 02 (Hero Display).

## 1. Trigger Conditions

The static 2D variant mounts and rendering of 3D assets halts when either of the following conditions is met:
- `reducedMotion === true`: User prefers reduced motion via browser preferences or store toggle.
- `deviceTier === 'low'`: Device does not support WebGL or has low performance metrics.

## 2. Architecture & Performance Bypasses

To achieve **zero performance overhead** in static mode, we implemented parent-level conditional mounting inside `SceneManager.tsx`:
- When static mode is active, `SceneManager` returns `null` for the Scene 02 Hero slot inside the 3D Canvas.
- Consequently, the R3F reconciler does not instantiate the 3D MainDisplay geometry, floating code fragments, pulsing data lines, or HTML boot sequence overlays.
- `useFrame` ticks are bypassed, and WebGL state updates are halted entirely for this scene.

## 3. Static Card Layout & Style

The 2D static hero card is built in `Scene02HeroStaticCard.tsx` with camelCase classes in `Scene02HeroStaticCard.module.css`:
- **Centering & Layout**: Centered vertically and horizontally in the viewport with a dark charcoal background (`#0B0F14`).
- **Glassmorphism**: Glassmorphic container with `#D4AF37` (Gold) borders, passing WCAG AA contrast ratio requirements.
- **Micro-animations**: Transition animations are disabled. Hover states utilize subtle scale and color shifting.

## 4. Accessibility Compliance

| Checklist Item | Description | Status |
|---|---|---|
| Semantic HTML | Uses `<h1>`, `<h2>`, `<p>`, `<button>` tags | PASS |
| ARIA Role | Containment wrapped in `role="main"` with `aria-label` | PASS |
| Keyboard Access | Navigable with Tab, clickable with Enter and Space | PASS |
| Contrast Ratio | Passes WCAG AA contrast ratio (> 4.5:1) | PASS |
| Focus States | Visible focus indicators (`:focus-visible`) | PASS |
