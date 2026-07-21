# Scene 04 — Connected Project Proof Ring Master Lock Contract (S04-P15)

This document establishes the authoritative, production-verified master lock for Scene 04 ("Connected Project Proof Ring"). All design, mathematical, camera, visual, responsive, performance, and cross-scene handoff contracts are formally locked.

---

## 1. Executive Summary & Status

- **Phases Locked**: `S04-P00` through `S04-P15` **LOCKED** | `S04-RF01` through `S04-RF03` **LOCKED**
- **Scene Status**: **FINAL LOCKED**
- **Architecture**: Connected 3-project screen ring ($R = 2.40\text{m}$ Desktop / $1.95\text{m}$ Tablet / $1.40\text{m}$ Mobile) driven by pure scroll resolver (`resolveScene04Ring`).
- **External HUD Status**: **0** external cinematic HUDs mounted (`Scene04HUD.tsx` and `Scene04HUD.css` permanently removed).
- **Embedded UI**: Project proof UI renders directly inside physical 3D display surfaces ($1.48\text{m} \times 0.8325\text{m}$, True 16:9) via Drei `<Html transform>`.

---

## 2. Master Narrative & Project Mapping

- **Narrative Arc**: Scene 03 completed product lands on receiving dock (`[0.00, 0.40, 0.10]`) $\rightarrow$ proof seed activates connected ring $\rightarrow$ Project 01 foundation $\rightarrow$ Project 02 implementation $\rightarrow$ Project 03 final proof $\rightarrow$ Project 03 surface fragment detaches at $p = 0.88 - 0.96$ and transfers to Scene 05 transfer anchor (`[1.35, 0.20, 0.05]` desktop/tablet / `[-0.20, 0.10, 0.05]` mobile at global switch $0.590000$).
- **Project Mapping**:
  - `screen-1` $\rightarrow$ `project-1`: **Commerce Operations Platform**
  - `screen-2` $\rightarrow$ `project-2`: **Interactive Brand Experience**
  - `screen-3` $\rightarrow$ `project-3`: **Admin Workflow System** (sole owner of Scene 05 extraction)

---

## 3. Connected-Ring Mathematics & Geometry Lock

Pure mathematical 120° resolver:
$$\text{worldPosition} = \text{ringCenter} + [R \sin(\theta_i + \theta_{\text{ring}}), \, 0, \, R \cos(\theta_i + \theta_{\text{ring}})]$$

- **Base Angles**: `screen-1` ($0^\circ$), `screen-2` ($120^\circ$), `screen-3` ($-120^\circ$).
- **Desktop ($1440\times900 / 1280\times720$)**: $R = 2.40\text{m}$, Active pose `[0.95, 0.08, 0.00]`, Center `[0.95, 0.08, -2.40]`.
- **Tablet ($1024\times768$)**: $R = 1.95\text{m}$, Active pose `[0.95, 0.08, 0.00]`, Center `[0.95, 0.08, -1.95]`.
- **Mobile ($430\times932 / 390\times844 / 375\times667$)**: $R = 1.40\text{m}$, Active pose `[0.00, 0.00, 0.00]`, Center `[0.00, 0.00, -1.40]`.
- **Distance Error**: **0.0000** across all viewports and scroll directions.

---

## 4. Scroll Segmentation & Resolver Lock

Local progress mapping ($p \in [0.00, 1.00]$):
- `0.00 - 0.12`: Incoming Follow (LaptopDevice dock landing)
- `0.12 - 0.27`: Ring Reveal
- `0.27 - 0.45`: Project 01 Hold (`screen-1` active)
- `0.45 - 0.52`: Transition 01 (120° ring rotation)
- `0.52 - 0.68`: Project 02 Hold (`screen-2` active)
- `0.68 - 0.75`: Transition 02 (120° ring rotation)
- `0.75 - 0.88`: Project 03 Hold (`screen-3` active)
- `0.88 - 1.00`: UX Surface Extraction (`screen-3` fragment detaches)

---

## 5. Camera, Materials, Lighting, and Pointer Lock

- **Camera Journey**: All 7 camera beats preserved with **0.0 delta** against P09/P11 keyframes (`cameraKeyframes.ts` and `CameraController.tsx` contain 0 camera keyframe edits). Preallocated `targetVecRef` and `targetPosRef` `useRef` objects (`OPT-P13-01`) eliminate per-frame allocations.
- **P10 Visual Tokens**:
  - Void Background: `#070D18`
  - Bezel Chassis: `#0F172A` (`metalness=0.80`, `roughness=0.35`, `transmission=0.0`)
  - Structural Cyan: `#38D6FF` (opacity 0.45)
  - Surface: `#091424` (Emissive `#071526`, intensity 0.40)
  - Outcome Gold: `#D8A84F`
- **Pointer Authority**: Rebound exclusively to `ACTIVE` screen hold (Yaw $\pm 1.2^\circ$, Pitch $\pm 0.8^\circ$, Translation $\pm 0.025\text{m}$). Mobile, touch, transitions, reduced motion, and fallback pointer authority = **0.0**.

---

## 6. Responsive, Reduced Motion, and Fallback Lock

- **Desktop**: Full cinematic connected ring depth ($R=2.40\text{m}$).
- **Tablet**: Reduced ring depth ($R=1.95\text{m}$) with protected content margins.
- **Mobile**: One dominant active project screen centered at `[0.00, 0.00, 0.00]`, $R=1.40\text{m}$, 0 pointer parallax, 0 document overflow.
- **Reduced Motion**: Mounts `Scene04ProjectsStaticCard.tsx` with full accessible 3-project tablist, Arrow key (`ArrowLeft`, `ArrowRight`), `Home`, `End` navigation, `tabIndex`, and visible focus rings.
- **Low-Performance Fallback**: Restrains high-detail rendering to 1 active screen with zero background updates.

---

## 7. Performance Baseline & Renderer Qualification

- **Headless Diagnostic Baseline**: Sustained **60 FPS** across all 8 checkpoints ($0.06 - 0.94$) and 6 viewports. 10 draw calls, 1,420 triangles, 1 high-detail screen maximum, 0 per-frame allocations.
- **Known Renderer Limitation**: Headless SwiftShader diagnostic measurements passed (`SOFTWARE_RENDERER_DIAGNOSTIC`). Physical hardware-accelerated GPU validation has not been performed.

---

## 8. Protected Files Register

The following files are **HARD-LOCKED** or **LOCKED-WITH-VALIDATION**:
- `src/portfolio3d/constants/scene04Config.ts` [HARD-LOCKED]
- `src/portfolio3d/content/projectData.ts` [HARD-LOCKED]
- `src/portfolio3d/components/ConnectedProjectScreenRing.tsx` [HARD-LOCKED]
- `src/portfolio3d/components/capsule/ProjectCapsule.tsx` [HARD-LOCKED]
- `src/portfolio3d/scenes/Scene04Projects.tsx` [HARD-LOCKED]
- `src/portfolio3d/scenes/Scene04ProjectsGreybox.tsx` [HARD-LOCKED]
- `src/portfolio3d/scenes/Scene04ProjectsStaticCard.tsx` [HARD-LOCKED]
- `src/portfolio3d/camera/CameraController.tsx` [LOCKED-WITH-VALIDATION - OPT-P13-01]
- `src/portfolio3d/camera/cameraKeyframes.ts` [HARD-LOCKED]
- `src/portfolio3d/interaction/usePointerInfluence.ts` [HARD-LOCKED]
- `src/portfolio3d/overlays/ContentOverlayRoot.tsx` [HARD-LOCKED]
- `src/portfolio3d/overlays/Scene04HUD.tsx` [REMOVED - DO NOT RESTORE]
- `src/portfolio3d/overlays/Scene04HUD.css` [REMOVED - DO NOT RESTORE]

---

## 9. Final Lock Verdict

```txt
PASS — Scene 04 Connected Project Proof Ring is fully locked technically, visually, cinematically, responsively, accessibly, editorially, and operationally. Future work must preserve all S04 locks, the Scene 03 → Scene 04 boundary, the Scene 04 → Scene 05 handoff, the responsive and reduced-motion contracts, and the recorded Scene 04 performance baseline.
```
