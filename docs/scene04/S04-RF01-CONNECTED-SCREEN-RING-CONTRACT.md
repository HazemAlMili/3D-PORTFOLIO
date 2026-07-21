# S04-RF01-R2 — Connected Project Screen Ring Refactor Contract

> **Status:** LOCKED  
> **Phase:** S04-RF01-R2 — Reconciled Authoritative Camera, Responsive Pose & P10 Visual System Contract  
> **Authority:** Reconciles authoritativeness across locked camera runtime values, tablet responsive active position, and P10 material tokens. Preserves all locked Scene 04 foundation work (S04-P00 through S04-P11), 7-beat camera journey, project data, materials, lighting, pointer micro-motion, and Scene 03/05 transition contracts.  
> **Production Status:** Production source files (`src/`) are NOT modified in RF01-R2.

---

## 1. Authoritative 7-Beat Camera Source

Camera values are locked directly from authoritative runtime evidence (`window.__r3fState.cameraPose` from `docs/scene04/evidence/S04-P09-R2/authoritative-runtime-camera.json` and `src/portfolio3d/camera/cameraKeyframes.ts`). Zero camera source modifications are required.

| Beat Index | Beat Name | Local Progress ($p$) | Global Progress | Authoritative Camera Pos $[X, Y, Z]$ | Authoritative Target $[X, Y, Z]$ | FOV | Viewport Branch | Compatibility Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Beat 01** | Incoming Follow | `0.06` | `0.477143` | `[2.3860, 0.2233, 6.3814]` | `[0.9186, 0.1465, 0.0488]` | $48.98$ | desktop | **REUSE-AS-IS** |
| **Beat 02** | Gallery Reveal | `0.20` | `0.493968` | `[1.6244, 0.3589, 6.4934]` | `[0.5122, 0.2411, -0.2533]` | $51.18$ | desktop | **REUSE-AS-IS** |
| **Beat 03** | Project Establishment | `0.34` | `0.510794` | `[2.0378, 0.3392, 5.2699]` | `[0.9217, 0.1594, -0.2972]` | $52.00$ | desktop | **REUSE-WITH-RING-POSE-CALIBRATION** |
| **Beat 04** | Inspection Arc | `0.50` | `0.530000` | `[1.6595, 0.2149, 3.8488]` | `[1.1000, 0.1000, 0.0000]` | $51.30$ | desktop | **REUSE-WITH-RING-POSE-CALIBRATION** |
| **Beat 05** | Proof Push-In | `0.67` | `0.550476` | `[1.2460, 0.1243, 2.8919]` | `[1.0487, 0.1000, 0.0000]` | $48.97$ | desktop | **REUSE-WITH-RING-POSE-CALIBRATION** |
| **Beat 06** | Hero Readability Lock | `0.81` | `0.567143` | `[1.0265, 0.0902, 2.4775]` | `[0.9755, 0.0902, 0.0000]` | $48.00$ | desktop | **REUSE-WITH-RING-POSE-CALIBRATION** |
| **Beat 07** | UX Extraction | `0.94` | `0.582857` | `[0.6173, 0.1312, 5.1394]` | `[0.4638, 0.0391, 0.0000]` | $50.05$ | desktop | **REUSE-AS-IS** |

---

## 2. Reconciled Tablet Active Position

The protected readable active position `[0.95, 0.08, 0.00]` is restored for Tablet, maintaining 100% composition alignment with Desktop and preserving Scene 03 incoming and Scene 05 outgoing transition continuity.

$$ \text{ringCenter}_{\text{tablet}} = [0.95, \, 0.08, \, 0.00] - [0, \, 0, \, 1.95] = [0.95, \, 0.08, \, -1.95] $$

### Viewport Layout Table (Mathematical Resolver Verification)

| Viewport Category | Ring Radius ($R$) | Active Position $[X, Y, Z]$ | Ring Center $[X, Y, Z]$ | Screen 1 ($0^\circ$) $[X, Y, Z]$ | Screen 2 ($120^\circ$) $[X, Y, Z]$ | Screen 3 ($-120^\circ$) $[X, Y, Z]$ | Distance Error |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440×900 / 1280×720)** | $2.40\text{m}$ | `[0.95, 0.08, 0.00]` | `[0.95, 0.08, -2.40]` | `[0.9500, 0.0800, 0.0000]` | `[3.0285, 0.0800, -3.6000]` | `[-1.1285, 0.0800, -3.6000]` | $0.0000$ |
| **Tablet (1024×768)** | $1.95\text{m}$ | `[0.95, 0.08, 0.00]` | `[0.95, 0.08, -1.95]` | `[0.9500, 0.0800, 0.0000]` | `[2.6387, 0.0800, -2.9250]` | `[-0.7387, 0.0800, -2.9250]` | $0.0000$ |
| **Mobile (430×932 / 390×844 / 375×667)** | $1.40\text{m}$ | `[0.00, 0.00, 0.00]` | `[0.00, 0.00, -1.40]` | `[0.0000, 0.0000, 0.0000]` | `[1.2124, 0.0000, -2.1000]` | `[-1.2124, 0.0000, -2.1000]` | $0.0000$ |

---

## 3. Screen Dimensions & True 16:9 Aspect Ratio

```txt
Outer Physical Frame:          1.60m width × 1.00m height × 0.06m depth
Display Width:                 1.48m
Display Height (Exact 16:9):   1.48m × (9 / 16) = 0.8325m
Display Aspect Ratio:          1.48 / 0.8325 = 1.7778 (True 16:9)
Horizontal Bezel Margin:       (1.60m - 1.48m) / 2 = 0.06m
Vertical Bezel Margin:         (1.00m - 0.8325m) / 2 = 0.08375m
Content-Safe Region:           1.36m width × 0.72m height
```

---

## 4. Restored P10 Visual System & Materials

Authoritative P10 Color Tokens:
- **Gallery Background**: `#070D18`
- **Physical Shell / Bezel**: `#0F172A` (Metalness: `0.80`, Roughness: `0.35`, Transmission: `0.0`)
- **Structural Cyan Accent**: `#38D6FF` (Wireframe edge highlight opacity `0.45`)
- **Mid Cyan Accent**: `#1A8CFF`
- **Proof / Outcome Gold**: `#D8A84F` (Outcome state border & badge)
- **Preview Surface**: `#091424` (Emissive: `#071526`, EmissiveIntensity: `0.40`)
- **Proof Grid Surface**: `#0F2238`

> Transmission / glass physical frame models from draft iterations are explicitly removed. Outer physical chassis remains metallic dark slate (`#0F172A`).

---

## 5. Screen Lifecycle Contract

- **`ACTIVE`**: Mounted, visible, active lerp & render, full embedded project proof, active micro-parallax.
- **`PREVIOUS` / `NEXT`**: Mounted, visible, lightweight update / frozen, title badge + 1-line subhead, zero pointer authority.
- **`BACKGROUND`**: Mounted only when visible, frozen, silhouette wireframe geometry.
- **`HIDDEN`**: **UNMOUNTED** (0 hidden mounted nodes).
- **`TRANSITIONING`**: Mounted, active rotation lerp, dynamic opacity cross-fade.
- **`EXTRACTING`**: Mounted (`screen-3`), surface detachment lerp, pointer neutral ($0.0$).

---

## 6. HUD Removal Ownership

```txt
Scene04HUD.tsx:                 REMOVE from normal cinematic Scene 04 path.
Scene04ProjectsStaticCard.tsx:  REUSE for reduced motion (reducedMotion === true).
ContentOverlayRoot.tsx:         RECONFIGURE to stop importing & mounting Scene04HUD in 3D mode,
                                while preserving static fallback tabbed card.
```

Explicit removal scope in RF02:
- Remove `Scene04HUD` import and component mount in `ContentOverlayRoot.tsx`.
- Remove HUD progress resolver logic and `s04-hud-root` DOM selectors.
- Remove orphan `Scene04HUD.css` styling.

---

## 7. Transition & Pointer Preservation

- **Incoming Handoff (Scene 03 $\rightarrow$ 04)**: Delivery output (`[4.2, -1.8, -3.8]`) lands on `LaptopDevice` dock (`[0.00, 0.40, 0.10]`), activating `screen-1` at $p = 0.27$.
- **Outgoing Extraction (Scene 04 $\rightarrow$ 05)**: At $p = 0.88$, surface fragment detaches from `screen-3` (`project-3`) and travels to Scene 05 target (`[1.35, 0.20, 0.05]` desktop / `[-0.20, 0.10, 0.05]` mobile). `screen-3` is the **sole authorized owner**.
- **Pointer Micro-Motion**: `usePointerInfluence` applies exclusively to the `ACTIVE` screen (Yaw $\pm 1.2^\circ$, Pitch $\pm 0.8^\circ$, Translation $\pm 0.025$). Damps to $0.0$ during ring rotations and Beat 07 extraction.

---

## 8. Qualified Performance Budget

- Active Screen Mesh Cost: 12 meshes, 4 draw calls.
- Adjacent Screens Mesh Cost: 8 meshes, 2 draw calls total.
- Ring Structure & Conduits: 6 meshes, 4 draw calls.
- Total Projected Draw Calls: 10 draw calls.

> **Qualification Statement:** Projected structural budget only. Runtime performance must be measured in RF02/RF03. Final hardware approval remains owned by S04-P13.

---

## 9. Verification Commands

```bash
npm run typecheck
npm run lint
npm run build
```

- `npm run typecheck` $\rightarrow$ **PASS** (0 errors)
- `npm run lint` $\rightarrow$ **PASS** (0 errors)
- `npm run build` $\rightarrow$ **PASS** (Built in 6.59s)
