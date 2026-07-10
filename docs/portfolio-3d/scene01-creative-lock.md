# Scene 01 — Creative Lock

**Document Type:** Phase 0 Creative Lock  
**Status:** LOCKED  
**Date:** 2026-07-09  
**Phase Plan Source:** `scene1plan.md`

---

## 1. Final Scene 01 Story

```
The portfolio opens with a centered 3D character in a dark, premium environment.

The character makes a subtle greeting — a gentle wave of the arm toward the viewer.

As the user scrolls, the developer name enters from the right and settles at center.

As the user continues scrolling, the role/title enters from the left and settles below the name.

The character then shifts from greeting into a calm, focused pose —
the energy changes from "hello" to "let me show you something."

The hand begins to raise toward eye level.

A circular lens/portal activates near the hand's raised position,
forming a visual O-shape in the space between hand and eye.

The camera slowly approaches the portal.

The camera enters the portal and travels toward the character's eye.

The transition completes as Scene 02 (Hero) begins to emerge.
```

**Pacing:** Slow, cinematic, unrushed. The user should feel like they are witnessing a performance, not clicking through a loading screen.

**Tone:** Premium developer identity — confident, measured, technically credible. Not playful or cartoon-like.

---

## 2. Text Content

### Name
```
Hazem Al-Melli
```

### Role
```
FULL-STACK DEVELOPER
```
*(displayed in uppercase for typographic weight)*

### Intro Line
**Not used** in Scene 01.

An intro line exists in `CONTACT_DATA.headline` ("Let's build the next system.") but is reserved for Scene 08 Contact. Scene 01 communicates identity through the character's presence and the name/role reveal — not additional copy.

### Content Source
- **File:** `src/portfolio3d/content/contactData.ts`
- **Fields:** `CONTACT_DATA.developerName`, `CONTACT_DATA.developerRole`
- **Rule:** Name and role MUST NOT be hardcoded in Scene 01 components. Always import from `CONTACT_DATA`.

---

## 3. Name / Role Rendering Decision

**Decision: 3D Text inside Canvas (Option A)**

**Rationale:**
- `OpeningNameRole.tsx` already uses `@react-three/drei` `<Text>` and is confirmed mounted
- 3D text adds physical depth — name slides in from right as a volumetric object in the scene
- The cinematic feel is stronger when text exists in the same physical space as the character
- Current Drei Text with Outfit font is already integrated and functional

**Known Risks:**
- Font loads from Google CDN (`fonts.gstatic.com`) — may add ~200ms on first render
- Text wrapped in `<Suspense fallback={null}>` in `Scene01Opening.tsx` — will appear after font loads
- Both are acceptable; the `useGLTF.preload` and Suspense architecture handle this

**Font:** Outfit (Google Fonts), loaded via Drei Text `font` prop

**Confirmed existing implementation in `OpeningNameRole.tsx`:**
- Name: `fontSize={0.22}`, color `#F4F7FA`, slides from X=+2.0 to X=0
- Role: `fontSize={0.095}`, color `#00B4D8`, slides from X=-2.0 to X=0
- Both fade out at `localProgress > 0.75`

---

## 4. Portal Type Decision

**Decision: Case B — Hand-Adjacent Lens Portal**

**Reason:**

The avatar asset (`opening_avatar.glb`) is a **Case C unrigged model** — confirmed by GLB inspection:
- No skeleton / no skins / no bones / no animation clips
- Only root mesh nodes: `Joe`, `Arms`, `Face`, `Hair`, `Eyes`, `Mouth`
- No finger bones, no hand bones, no thumb/index controls
- **Case A (real hand-O) is impossible with this asset**

Arm-level rotation IS possible by rotating the `Arms` node. The hand appears to raise when `Arms` rotates forward/upward.

**Final Creative (Case B):**
```
The character's arm raises forward toward eye level (Arms node rotation).
A circular lens/portal ring activates in the space near the raised hand.
The portal is positioned along the camera's approach path toward the eye.
The camera travels through the lens.
The transition completes.
```

**What to communicate honestly:**
- The portal is not formed by fingers
- The portal is motivated by the hand's raised position
- The visual relationship between hand -> lens -> eye must be spatially coherent
- Do not claim or animate a finger-O shape

---

## 5. Locked Timing Ranges

These are the canonical beat ranges for `getOpeningMotionState(localProgress)`.  
All values are in Scene 01 `localProgress` space (0.0 to 1.0).

| Beat | Range | Description |
|------|-------|-------------|
| `settle` | 0.00 – 0.10 | Character becomes visible, establishes presence |
| `greeting` | 0.10 – 0.28 | Subtle arm wave — slow, not cartoon-like |
| `nameReveal` | 0.22 – 0.45 | Name slides in from right |
| `roleReveal` | 0.30 – 0.52 | Role slides in from left |
| `focusPose` | 0.50 – 0.68 | Transition from greeting to focused/hand-prep pose |
| `handPortal` | 0.68 – 0.82 | Lens/portal activates near raised hand |
| `cameraPortal` | 0.82 – 0.94 | Camera approaches and enters the lens |
| `exit` | 0.94 – 1.00 | Eye fly-through, avatar scales down, Scene 02 begins |

**Notes:**
- `nameReveal` starts before `greeting` ends — intentional overlap for cinematic flow
- `roleReveal` begins while `nameReveal` is still arriving — staggered feel
- Text fade-out begins at ~0.75 (before `cameraPortal`) so text is clear of portal beat
- These ranges are already implemented in `openingMotion.ts` — do NOT change without updating this document

---

## 6. Visual Style Rules

### Required
- Background: deep navy/near-black (`#05070A` base)
- Key light: soft warm-white from upper-front (`#F4F7FA`, directional)
- Fill light: cyan-blue from left (`#00B4D8`)
- Rim light: soft cyan from behind (`#38D6FF`)
- Character materials: realistic roughness (skin 0.65, hair 0.8, cloth 0.85)
- Portal: single torus ring, cyan-blue glow, controlled emissive intensity (max 3.5)
- Text: clean sans-serif, high contrast, premium spacing
- Camera motion: smooth damp-chased (lerp factor 4.5)

### Prohibited
- Over-bloom or HDR flares
- Aggressive neon (emissive > 4.0 without artistic reason)
- Dense particle systems
- Rapid camera shake
- Fast text animation (slides must feel intentional, not rushed)
- Debug geometry (no hotpink/lime primitives in production)
- Huge expanding portal rings (portal should stay proportional to the hand)
- Childish wave (exaggerated arm swing, looping wave)
- Background grid lines unless very subtle

---

## 7. Reduced Motion Version

When `reducedMotion = true` (user prefers reduced motion):

```
Display a static version of Scene 01.
No avatar animation.
No greeting wave.
No name/role slide-in (display statically instead).
No portal activation.
No camera fly-through.

Static composition:
  - Avatar rendered at rest position (no useFrame motion)
  - Name displayed at final position (full opacity, no slide)
  - Role displayed at final position (full opacity, no slide)
  - No text fade-out
  - Scene transitions normally via scroll
```

**Implementation Note:**  
`ReducedMotionExperience.tsx` and the `reducedMotion` store flag already exist.  
Phase 3 to 5 must check `reducedMotion` before applying any `useFrame` animation.  
Static fallback does NOT need a separate component — it is the same scene with all procedural motion disabled.

---

## 8. Do Not Do List

| Item | Reason |
|------|--------|
| Hardcode name or role in scene components | Use `CONTACT_DATA` only |
| Claim hand-O (Case A) without confirming new rig | Current asset is Case C |
| Use `setTimeout` or `setInterval` for animation | All motion must be scroll-derived |
| Multiply node coordinates by 100 without documenting why | Was root cause of invisible avatar bug |
| Apply `scale.setScalar(1.0)` without respecting `BASE_SCALE` | Destroys cm to m scale conversion |
| Animate Joe node `position.y` offset | Apply breathing to parent group only |
| Use `child[index]` for bone access | Use `getObjectByName()` only |
| Keep debug shapes (hotpink cube, lime sphere) in production | Remove before any phase completion |
| Change camera keyframes for scenes 02 to 08 | Scene 01 keyframes are isolated |
| Rewrite CameraDirector, scroll damping, or cross-fade | These are locked from previous tickets |
| Add new external dependencies (animation libraries) | Use Three.js + R3F only |
| Add new 3D assets without approval | Current avatar GLB is the only approved asset |

---

## 9. Risks for Phase 1

| Risk | What to Verify |
|------|---------------|
| Avatar scale may need tuning | Current `BASE_SCALE = 0.014` places character at ~0.86 units tall. Confirm this frames the character correctly at approach camera position `[0, 0.5, 7.0]` |
| Avatar Y-position framing | Current `position Y=-0.5` may clip the feet or cut the head. Verify head is visible in enter keyframe `[0, 0.5, 3.5]` |
| GLB node names may differ from expected | `Arms`, `Joe`, `Face` were identified in inspection. Confirm they respond to rotation in Phase 3 |
| Arms rotation axis | The correct rotation axis for greeting wave needs Phase 3 experimentation. Document once confirmed |
| Font CDN dependency | `OpeningNameRole` loads Outfit font from `fonts.gstatic.com`. This fails in offline/restricted environments. If this is a concern, self-host the font |
| Portal position alignment | `OpeningHandLensPortal` is currently positioned at `[0.025, 0.356, 1.2]`. This was estimated; Phase 5 must verify it aligns with the raised hand and eye |

---

## 10. Current Implementation Status

| Component | Status |
|-----------|--------|
| `Scene01Opening.tsx` | DONE — Real components mounted, no debug primitives |
| `OpeningAvatar.tsx` | DONE — GLB loads, scale=0.014, no Joe position override |
| `OpeningNameRole.tsx` | DONE — Mounted with own Suspense, pulls from CONTACT_DATA |
| `OpeningHandLensPortal.tsx` | DONE — Case B fallback portal, activates at localProgress >= 0.58 |
| `openingMotion.ts` | DONE — Beat ranges defined and locked |
| `cameraKeyframes.ts` Scene 01 | DONE — Approach [0,0.5,7], Enter [0,0.5,3.5] |
| Debug primitives | DONE — Removed |

---

```
PASS — Scene 01 Phase 0 Creative Lock complete. Ready for Phase 1 Asset & Staging Lock.
```
