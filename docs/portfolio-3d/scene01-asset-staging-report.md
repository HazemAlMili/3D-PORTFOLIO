# Scene 01 — Asset & Staging Report

**Document Type:** Phase 1 Asset & Staging Lock  
**Status:** LOCKED  
**Date:** 2026-07-09  
**Follows:** scene01-creative-lock.md (Phase 0)

---

## 1. GLB Asset

| Field | Value |
|-------|-------|
| **File location** | `D:\PORT\public\assets\models\opening-avatar\optimized\opening_avatar.glb` |
| **Runtime URL** | `/assets/models/opening-avatar/optimized/opening_avatar.glb` |
| **HTTP status** | 200 OK |
| **Content-Type** | `model/gltf-binary` |
| **File size** | 22,223,876 bytes (22.2 MB) |
| **Source copy** | Also present at `src/portfolio3d/assets/models/opening-avatar/` and project root — runtime uses `public/` only |
| **Preload** | `useGLTF.preload(SCENE01_AVATAR_URL)` at module load |

---

## 2. Avatar Bounds

Bounding box measured from GLB native (cm scale):

| Axis | Min | Max | Span |
|------|-----|-----|------|
| X | -51.19 | +51.19 | 102.38 cm |
| Y | -30.64 | +30.64 | 61.27 cm |
| Z | -28.82 | +28.82 | 57.64 cm |

Center in GLB space: approximately (0, 0, 0)

After scale=0.014 applied:
- Width: 102.38 × 0.014 = 1.43 Three.js units
- Height: 61.27 × 0.014 = 0.86 Three.js units
- Depth: 57.64 × 0.014 = 0.81 Three.js units

The Y center of 0.86 units spans from world Y=-0.92 to world Y=-0.08 at position Y=-0.5.
The character's head/upper body region maps to roughly world Y=-0.08 to +0.2 (hair, face, neck).

---

## 3. Locked Avatar Scale

```ts
// src/portfolio3d/constants/scene01Config.ts
export const SCENE01_AVATAR_SCALE = 0.014;
```

Rationale:
- GLB uses centimeter units (Y span ˜ 61 cm)
- scale=0.014 ? rendered height ˜ 0.86 Three.js units (upper body framing)
- Full anatomical scale would be 0.0285 (1.75m height), but this crops the head at approach camera
- Upper-body framing is the locked creative choice for this scene

---

## 4. Locked Avatar Position

```ts
// src/portfolio3d/constants/scene01Config.ts
export const SCENE01_AVATAR_POSITION: [number, number, number] = [0, -0.5, 0.4];
```

| Axis | Value | Reason |
|------|-------|--------|
| X | 0 | Horizontally centered |
| Y | -0.5 | Upper body + head fills frame at camera Y=0.5, target Y=0.0 |
| Z | 0.4 | Slightly forward from scene origin for comfortable depth |

Breathing animation applies ±0.025 Y offset on top of this baseline.
The Joe node receives rotation-only sway — no position.y override (this was the previous bug).

---

## 5. Locked Camera Framing (Scene 01 only)

```ts
// src/portfolio3d/camera/cameraKeyframes.ts
"scene-01-opening": {
  approach: { position: [0, 0.5, 7.0], target: [0, 0.0, 0.4], fov: 50 },
  enter:    { position: [0, 0.5, 3.5], target: [0, 0.1, 0.4], fov: 58 },
  exit:     { position: [0.04, 0.55, 0.6], target: [0.04, 0.55, 0.4], fov: 52 },
}
```

Framing intent:
- **Approach**: Full/upper body visible from Z=7. Avatar center at world [0,-0.5,0.4], camera looks at [0,0,0.4] — character upper body in frame.
- **Enter**: Camera at Z=3.5, looking at same target — face and shoulders dominate. FOV widens slightly.
- **Exit**: Camera drifts slowly forward (Z=0.6), slightly elevated to align with eye level — precursor to eye fly-through.

Scenes 02–08 camera keyframes are unchanged.

---

## 6. Locked Lighting Baseline

```ts
// src/portfolio3d/constants/scene01Config.ts
export const SCENE01_LIGHTING = {
  ambient:    { intensity: 0.4,  color: "#1a2a3a" },
  keyLight:   { position: [2, 3, 5],    intensity: 1.0, color: "#F4F7FA" },
  fillLight:  { position: [-3, 1, 2],   intensity: 0.6, color: "#00B4D8" },
  rimLight:   { position: [0, 2, -3],   intensity: 0.7, color: "#38D6FF" },
  pointLight: { position: [0, 1.5, 2],  intensity: 0.5, color: "#2F80ED" },
};
```

Design intent:
- Key light: warm white from upper-front right — faces the character
- Fill light: cyan-blue from left — signature cool palette fill
- Rim light: soft cyan from behind — separates character from dark background
- Point light: subtle blue-purple warmth at eye level
- All intensities are FIXED (not scroll-derived) — FadeGroup handles opacity

---

## 7. Rig Audit Results

**Status: Case C — Unrigged**

| Property | Value |
|----------|-------|
| Skeleton | None |
| Bones | None |
| Skins | None |
| Animation clips | None |
| Finger bones | None |
| Hand bones | None |

**Confirmed usable nodes (mesh-level):**

| Node | Type | Usable for |
|------|------|------------|
| `Joe` | Group/Mesh | Root body; rotation-only sway for breathing |
| `Arms` | Mesh | Arm wave (Z-rotation), hand raise (X-rotation) |
| `Face` | Mesh | Head sway (Y), attention tilt (X) |
| `Hair` | Mesh | Head sway (same as Face) |
| `Eyes` | Mesh | Visual anchor for portal eye-line |
| `Mouth` | Mesh | Head sway (same as Face) |

**Arms node usability:** YES — rotating Arms Z-axis produces visible wave motion; X-axis rotation produces hand-raise/forward tilt.

**Eyes node usability:** YES as visual reference point for portal positioning. Cannot be animated independently (no separate rig), but world position can be computed for portal alignment.

**Portal decision confirmed:** Case B — Hand-Adjacent Lens Portal (see scene01-creative-lock.md §4)

---

## 8. Name / Role Visibility

**Component:** `OpeningNameRole.tsx`  
**Rendering mode:** 3D Text in Canvas (`@react-three/drei <Text>`)  
**Content source:** `CONTACT_DATA.developerName` / `CONTACT_DATA.developerRole` from `contactData.ts`

| Text | Value | Font size | Color |
|------|-------|-----------|-------|
| Name | `Hazem Al-Melli` | 0.22 | `#F4F7FA` |
| Role | `FULL-STACK DEVELOPER` | 0.095 | `#00B4D8` |

Reveal timing (from openingMotion.ts):
- Name: slides right?center at `localProgress 0.22–0.45`
- Role: slides left?center at `localProgress 0.30–0.52`
- Both fade out at `localProgress > 0.75`

**At page load (localProgress=0):** Text is offscreen (X: ±2.0) and invisible (opacity=0). This is correct — text appears only during scroll.

**Forced-final position test:** When `localProgress=0.5`, both name and role are fully visible at X=0, centered above the character.

No hardcoded text — all content from `CONTACT_DATA`.

---

## 9. Reduced Motion Staging

The `reducedMotion` store flag is checked in `CameraController.tsx` (skips lerp/damp).

Scene 01 reduced motion behavior:
- Avatar still renders (GLB loads regardless of reduced motion flag)
- `useFrame` animation still runs (greeting wave, breathing) — **RISK: Phase 3 must gate useFrame on reducedMotion**
- Name/role reveal requires scroll, so at `localProgress=0` they are offscreen — **RISK: Phase 4 must handle static fallback positioning**

Current status: Reduced motion does not blank the opening (avatar renders). Motion gating is a Phase 3/4 responsibility.

---

## 10. Debug Cleanup Status

| Artifact | Status |
|---------|--------|
| Hotpink debug cube (Scene01Opening) | REMOVED |
| Lime green debug cube (CanvasRoot) | REMOVED |
| Cyan sphere (isolation test) | REMOVED |
| Production console.log in OpeningAvatar | REMOVED — all logs gated by `import.meta.env.DEV` |
| `[OpeningAvatar] mounted` log | DEV ONLY |
| `[Scene01 Avatar Bounds]` log | DEV ONLY |
| `[Scene01 Avatar Nodes]` log | DEV ONLY |

---

## 11. Files Changed in Phase 1

| File | Change |
|------|--------|
| `src/portfolio3d/constants/scene01Config.ts` | Replaced old seal/logo config with locked Phase 1 avatar constants |
| `src/portfolio3d/components/opening/OpeningAvatar.tsx` | Imports from scene01Config; bounds log; node audit log |
| `src/portfolio3d/scenes/Scene01Opening.tsx` | Imports lighting from scene01Config; per-component Suspense |
| `src/portfolio3d/camera/cameraKeyframes.ts` | Scene 01 keyframes reframed (approach Y=0.5 Z=7, enter Y=0.5 Z=3.5) |

---

## 12. QA Results

```
npx tsc --noEmit     ? 0 errors ?
npx vite build       ? success, 717 modules ?
HTTP GET opening_avatar.glb ? 200 OK, 22.2MB ?
```

---

## 13. Risks for Phase 2 and Phase 3

| Risk | Phase | Mitigation |
|------|-------|-----------|
| Avatar scale 0.014 may need minor tuning once seen in real browser | Phase 1 QA | Accept ±10% adjustment; update scene01Config.ts |
| Arms node rotation axis for greeting wave needs validation | Phase 3 | Experiment in Phase 3; document confirmed axis |
| Eyes node world position for portal anchor | Phase 5 | Use `getObjectByName("Eyes").getWorldPosition()` to derive portal anchor |
| Outfit font CDN dependency | Phase 4 | Self-host if offline testing required |
| Reduced motion does not gate useFrame animation | Phase 3 | All useFrame blocks must check `reducedMotion` from store |
| `localProgress=0` leaves name/role offscreen | Phase 4 | Reduced motion version must use static positioning |
| Portal position `[0.025, 0.356, 1.2]` is estimated | Phase 5 | Re-derive from Arms node world position during Phase 5 |

---

```
PASS — Scene 01 Phase 1 Asset & Staging Lock complete. Ready for Phase 2 Motion Map & Timing System.
```
