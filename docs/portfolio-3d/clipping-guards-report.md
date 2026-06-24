# Clipping Guards and Occlusion Culling Flags Report
## Phase 2 — Task 2.7

---

## 1. Executive Summary

Task 2.7 adds the **optimization and safety layer** for the 3D rendering pipeline:

1. **Clipping guards** — Verified and documented `near: 0.1` / `far: 100` on the Canvas camera, with explanatory comments.
2. **Visibility flags** — Added `visible` prop to both `SceneManager` and `ScenePlaceholder` for layout suppression and occlusion culling control.
3. **Dev-only clipping helper** — Created `cameraClipping.ts` with `isCameraSafe()` and `getClippingWarning()` utilities for proximity diagnostics.

No geometry, meshes, materials, or shaders were created. All new props default to `true` — existing behavior is completely unchanged.

---

## 2. Files Modified

| File | Change |
|------|--------|
| `src/portfolio3d/canvas/CanvasRoot.tsx` | Expanded camera config object; added `near`/`far` comments |
| `src/portfolio3d/scenes/SceneManager.tsx` | Added `SceneManagerProps` interface with `visible` prop + guard |
| `src/portfolio3d/scenes/ScenePlaceholder.tsx` | Added `visible` prop to interface + early-return guard |
| `src/portfolio3d/camera/cameraClipping.ts` | **[NEW]** Dev-only clipping safety helper |
| `src/portfolio3d/README.md` | Added Task 2.7 reference |
| `docs/portfolio-3d/folder-structure-report.md` | Added report reference |
| `docs/portfolio-3d/clipping-guards-report.md` | **[NEW]** This file |

---

## 3. Clipping Configuration

### Values

| Plane | Value | Justification |
|-------|-------|---------------|
| `near` | `0.1` | Allows close-up device entry (portal phase) without clipping front geometry faces |
| `far`  | `100` | Accommodates wide scene pull-backs and composite multi-device shots at maximum scroll progress |

### Comments added to `CanvasRoot.tsx`

```tsx
camera={{
  position: [0, 0, 6],
  fov: 50,
  // near: 0.1 — allows close-up device entry without clipping geometry faces
  // far: 100 — allows wide scene pull-backs and composite multi-device shots
  near: 0.1,
  far: 100,
}}
```

These values were already correct from Phase 1. This task verifies and documents them formally.

---

## 4. Visibility Flags

### `SceneManager` — `visible` prop

```tsx
interface SceneManagerProps {
  /** When false, suppresses all scene rendering (layout suppression for inactive states). */
  visible?: boolean;
}

export function SceneManager({ visible = true }: SceneManagerProps) {
  // ...
  if (!visible) return null;  // Layout suppression guard
  // ...
}
```

**Purpose**: Allows a parent component to suppress all scene rendering — e.g., during loading, WebGL fallback, or reduced-motion states.

### `ScenePlaceholder` — `visible` prop

```tsx
interface ScenePlaceholderProps {
  // ...
  /** Occlusion culling flag — when false, suppresses this scene's render output. Defaults to true. */
  visible?: boolean;
}

export function ScenePlaceholder({ ..., visible = true }: ScenePlaceholderProps) {
  if (!visible) return null;  // Occlusion culling flag
  // ...
}
```

**Purpose**: Allows `SceneManager` (or Phase 3 scene controllers) to suppress individual scene render output for occlusion culling — e.g., hiding scenes that are far from the active segment.

---

## 5. Dev-Only Clipping Helper — `cameraClipping.ts`

```ts
// src/portfolio3d/camera/cameraClipping.ts

export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 100;

export function isCameraSafe(position, near, far): boolean
export function getClippingWarning(position): string | null
```

- `isCameraSafe()` — returns true if distance from origin is within the `(near, far)` range.
- `getClippingWarning()` — returns a descriptive warning string if the camera crosses soft thresholds (0.5 near, 90 far), or `null` if safe.
- Soft thresholds give early warning before hard clip planes are hit, giving keyframe authors actionable feedback.
- **Usage pattern** (caller-side, optional):

  ```ts
  if (import.meta.env.DEV) {
    const warn = getClippingWarning(pose.position);
    if (warn) console.warn(warn);
  }
  ```

---

## 6. Scope Boundary Confirmation

| Item | Answer |
|------|--------|
| Next task (P2.8) started | **NO** |
| Packages installed/uninstalled | **NO** |
| Files outside allowed scope touched | **NO** |
| WebGL geometries created | **NO** |
| Shaders/materials created | **NO** |
| Phase 3 work started | **NO** |
| Camera position logic modified | **NO** |

---

## 7. QA Results

| Check | Result |
|-------|--------|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| `git status` | Reviewed — only expected files modified |

### Manual Verification

- `npm run dev` active during development.
- No visual changes — all `visible` flags default to `true`.
- No console errors.
- Clipping warning helper available for use in development keyframe diagnostics.
