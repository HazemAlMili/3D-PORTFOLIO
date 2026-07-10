# Scene 01 Character Experiment — Rollback Report

**Date:** 2026-07-10  
**Ticket:** R — Revert Scene 01 Character Experiment  
**Status:** ✅ Complete

---

## Summary

The Scene 01 character/avatar opening experiment has been removed.  
Scene 01 is reset to a clean, stable baseline.  
All global cinematic systems from Tickets 1–3 are preserved.  
The project is ready for the new **System Boot Cinematic** implementation.

---

## Root Cause of Removal

The avatar character experiment was blocked by compounding issues:

- Avatar visibility was unreliable (FadeGroup material opacity corruption from shared GLTF cache)
- GLB was 22MB and unrigged (Case C — no skeleton, no animation clips)
- Hand-O gesture could not be implemented honestly
- Scale/framing instability across different camera phases
- Debug fallback primitives appeared during runtime
- The creative concept was no longer approved

---

## Files Changed

| File | Action | Reason |
|------|--------|--------|
| `src/portfolio3d/scenes/Scene01Opening.tsx` | **Rewritten** | Removed all avatar/portal imports; replaced with clean minimal baseline |
| `src/portfolio3d/constants/scene01Config.ts` | **Rewritten** | Removed `SCENE01_AVATAR_SCALE`, `SCENE01_AVATAR_POSITION`, lighting config, `SCENE_01_COLORS`, `SCENE_01_TEXT`, portal coords |
| `src/portfolio3d/camera/cameraKeyframes.ts` | **Modified** | Scene 01 keyframes reset to neutral opening (approach/enter/exit) |
| `src/portfolio3d/scenes/SceneManager.tsx` | **Fixed** | FadeGroup material corruption bug fixed (gltfBaseOpacity=1.0 approach); lint warning removed |

---

## Files Deleted

| File | Reason |
|------|--------|
| `src/portfolio3d/components/opening/OpeningAvatar.tsx` | Avatar component no longer used |
| `src/portfolio3d/components/opening/OpeningNameRole.tsx` | Name/role text reveal no longer used |
| `src/portfolio3d/components/opening/OpeningHandLensPortal.tsx` | Hand-O portal no longer used |
| `src/portfolio3d/components/opening/openingMotion.ts` | Beat/timing helper no longer needed |
| `src/portfolio3d/components/OpeningDevice.tsx` | Orphaned device frame component |
| `src/portfolio3d/components/OpeningScreenContent.tsx` | Orphaned screen content component |

> **Note:** The physical GLB asset at `public/assets/models/opening-avatar/optimized/opening_avatar.glb` was **NOT deleted** (22MB, requires explicit owner approval). It is simply no longer loaded at runtime.

---

## Avatar GLB Runtime Status

- `useGLTF.preload` call: **Removed** ✅
- All imports of avatar URL: **Removed** ✅
- Network request for `opening_avatar.glb`: **Will not appear** ✅

---

## Scene 01 Clean Baseline

Scene 01 now renders:

- Dark cool ambient environment (`#1a2535`)
- Directional key light, cyan fill, blue rim
- Two concentric emissive cyan torus rings (outer R=0.5, inner R=0.3)
- Subtle scale animation driven by `localProgress`
- A point light at center providing glow

No avatar. No GLB. No hand portal. No debug shapes.

---

## Final Scene 01 Camera Values

```ts
"scene-01-opening": {
  approach: { position: [0, 0.2, 7.0], target: [0, 0, 0], fov: 48 },
  enter:    { position: [0, 0.1, 4.0], target: [0, 0, 0], fov: 50 },
  exit:     { position: [0, 0.0, 2.2], target: [0, 0, 0], fov: 52 },
}
```

---

## Preserved Systems (Tickets 1–3)

| System | Status |
|--------|--------|
| Scroll damping (`ScrollProgressController.ts`) | ✅ Preserved |
| `clampScrollDelta` scroll protection | ✅ Preserved |
| Scene cross-fade (`sceneFade.ts`, `SceneManager.tsx`) | ✅ Preserved |
| FadeGroup material opacity (fixed, not reverted) | ✅ Improved |
| DOM overlay sync (`ContentOverlayRoot`) | ✅ Preserved |
| Camera damping speed | ✅ Preserved |
| Scene handoff (02–08) | ✅ Untouched |

---

## QA Results

| Check | Result |
|-------|--------|
| `npm run typecheck` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ Build passes |
| Scene 01 visible | ✅ Cyan rings visible |
| Avatar GLB loaded | ✅ Not loaded |
| Debug shapes visible | ✅ None |
| Cross-fade to Scene 02 | ✅ Working |
| Reverse to Scene 01 | ✅ Working |
| Console errors | ✅ None |

---

## Notes on FadeGroup Fix (Preserved)

The FadeGroup material opacity corruption bug was discovered during this experiment and has been **fixed** (not reverted):

- **Old bug:** FadeGroup read `mat.opacity` as "original" — but shared GLTF cached materials retained corrupted `mat.opacity=0` from previous fade-outs, making scenes invisible on remount.
- **Fix:** FadeGroup now tags each material with `mat.userData.gltfBaseOpacity = 1.0` on first encounter. Never reads the runtime `mat.opacity` as baseline. This fix benefits all future 3D scenes that use the cross-fade system.

---

## Superseded Documents

The following documents reflect the **cancelled** character opening plan. They have been superseded by this report:

- `docs/portfolio-3d/scene01-creative-lock.md` — character opening creative lock (cancelled)
- `docs/portfolio-3d/scene01-asset-staging-report.md` — avatar staging report (cancelled)

---

## Remaining Risks Before New Opening

1. The `opening` directory is now empty — do not import from it
2. `scene01Config.ts` is minimal — expand it when System Boot design is locked
3. The FadeGroup `gltfBaseOpacity=1.0` assumption is correct for all current scenes (all standard GLTF materials are fully opaque by default) — if a future scene uses legitimately transparent materials (e.g. particles with opacity < 1.0 in the GLTF file), the `gltfBaseOpacity` value will need to be read from the material's original GLTF definition rather than hardcoded to 1.0

---

```
PASS — Ticket R Scene 01 character experiment reverted. Clean baseline ready for System Boot Cinematic.
```
