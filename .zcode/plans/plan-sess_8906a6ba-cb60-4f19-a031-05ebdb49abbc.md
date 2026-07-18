## PRODUCT-HANDOFF-09 Implementation Plan

### Scope
Refine existing `ProductLaunchHandoff.tsx` to match ticket timing (0.92-1.00). Add missing output point. Adjust ray and packet timing. Fix stale docstrings. Minimal documentation fixes in Scene 04 config.

**No changes to:** Scene 01, Scene 02, camera system, scroll system, ProductBuildCore, ProductAssemblyBaseline, scene03Config (already correct), Scene04Projects visual logic.

---

### Change 1: `src/portfolio3d/components/product/ProductLaunchHandoff.tsx` (Primary)

**1a. Fix docstring (lines 17-27)**
- Change "0.74 – 0.88" → "0.82 – 0.92" for lock indicators
- Change "0.88 – 1.00" → "0.92 – 1.00" for launch handoff
- Update beat descriptions to match ticket narrative

**1b. Add Output Point (new section B, before ray)**
- Position: `[W - 0.08, -H + 0.08, DZ * 0.30]` — bottom-right of shell, symmetric with ReadyProductFrame's top-right lock marks
- Timing: `outputT = clamp((progress - 0.94) / 0.02, 0, 1)` — wakes at 0.94, fully active at 0.96
- Visual: small gold sphere (radius 0.014 desktop, 0.010 mobile) + subtle expanding pulse ring (radius 0.02→0.05, opacity fading)
- Render only when `localProgress >= 0.92` (pre-activation visibility)
- Pre-wake at 0.92-0.94: faint dot at opacity 0.15 (bridges gap naturally without being a new beat)

**1c. Adjust Ray Timing (section B → C)**
- Start ray at 0.94 (was 0.92): `rayT = clamp((progress - 0.94) / 0.02, 0, 1)`
- Ray fully extended by 0.96
- Ray start point: output point position `[W - 0.08, -H + 0.08, DZ * 0.30]` (was `[W, -H, 0]`)
- Keep dashed-when-extending behavior (solid when `rayT >= 0.9`)

**1d. Adjust Packet Timing (section C)**
- Start packet at 0.96 (was 0.94): `packetProgress = clamp((progress - 0.96) / 0.03, 0, 1)`
- Packet arrives at 0.99 (was ~0.995)
- Packet fade: `(progress - 0.99) / 0.01` — clean fade 0.99-1.00 (was `(progress - 0.98) / 0.02`)
- Packet path: from output point position to localTarget (same target coordinates)

**1e. Fix Coordinate Comments (line 62-63)**
- Update comments to reflect actual config values and positions

**1f. Reduced Motion**
- Output point: static gold sphere at full brightness when `progress >= 0.94`
- Packet: static gold sphere at 50% along path when `progress >= 0.96`
- No ray (no moving elements)
- Satisfies: "READY state, proof handoff indicated subtly, no moving packet/trail"

---

### Change 2: `src/portfolio3d/constants/scene04Config.ts` (Documentation Only)

- Update JSDoc on `architectureSourceDesktop` and `architectureSourceMobile`: "delivery pipeline exit output" → "product engine proof handoff output"
- No value changes — coordinates remain as-is (cross-fade masks any spatial discontinuity)

---

### What Stays Untouched
- `scene03Config.ts` — phases already correct (`productLock: [0.82, 0.92]`, `launchHandoff: [0.92, 1.00]`)
- `cameraKeyframes.ts` — beat 7 already at 0.92-1.00 with appropriate pull-back
- `ProductBuildCore.tsx` — just passes props to ProductLaunchHandoff
- `ProductAssemblyBaseline.tsx` — just mounts components
- `Scene04Projects.tsx` — receiver already sufficient (cyan packet + glow), color stays thematic
- `Scene01Opening`, `Scene02Hero`, all Scene 02 files — hard guardrail
- Global scroll pacing — hard guardrail

---

### Timing Verification (Post-Implementation)

```
0.82-0.92: Lock indicators light (UX → API → DATA → PERF → READY)
0.90-0.916: READY indicator activates
0.92-0.94: READY lock holds (brief suspense beat)
0.94:      Output point wakes (small gold glow at bottom-right)
0.94-0.96: Output point brightens + ray extends from it
0.96:      Ray fully extended, proof packet launches
0.96-0.99: Packet travels toward Scene 04
0.99-1.00: Packet fades into Scene 04 receiver
```

All reversible on scroll-back. HUD-safe (path stays right of center). Mobile-simplified (smaller elements). Reduced-motion (static indicators only).

---

### QA Plan
1. `npm run typecheck` — must pass
2. `npm run lint` — must pass
3. `npm run build` — must pass
4. `npm run dev` — must serve
5. Screenshots at: 0.88 (READY lock), 0.94 (output point), 0.96 (packet launch), 0.99 (receiver approach), mobile 390x844, reduced motion