# S04-P02 — Camera Shot Bible and Composition Contract

> **Status:** LOCKED  
> **Phase:** S04-P02 — Camera Shot Bible & Numeric Composition Lock  
> **Authority:** Preserves all verified locks from `S04-P01-NARRATIVE-VISUAL-LOCK.md`, `s04_p00_discovery_report.md`, and `SCENE-04-PRODUCTION-BLUEPRINT.md`.

---

## A. Camera Design Summary

Scene 04 defines a camera-led seven-beat trajectory that follows the Scene 03 product handoff seed onto a procedural laptop receiving dock, curves laterally to reveal the Project Proof Rail in architectural depth, establishes the active project from a 3/4 angle, inspects its physical structure, stabilizes into a locked Hero readability state with clear left-lane HUD separation, and extracts an outgoing UX fragment into Scene 05. The camera leads all visual movement before copy appears and guarantees continuous, non-clipping framing across desktop, tablet, and mobile viewports.

---

## B. Coordinate Reference Map

| Anchor Name | Coordinates `[X, Y, Z]` | Description / Owner | Status |
|---|---|---|---|
| `architectureSourceDesktop` | `[4.2, -1.8, -3.8]` | Scene 03 Delivery Pipeline exit anchor | **LOCKED EXISTING** |
| `architectureSourceMobile` | `[0.0, -3.2, -3.2]` | Scene 03 Delivery Pipeline exit anchor (Mobile) | **LOCKED EXISTING** |
| `laptopReceivingDock` | `[0.0, 0.4, 0.10]` | Laptop screen face / incoming seed dock | **LOCKED EXISTING** |
| `proofRailOrigin` | `[-1.5, 0.0, -1.0]` | Rail origin path receiving incoming seed | **PROVISIONAL FOR GREYBOX** |
| `activeProjectCenter` | `[1.2, 0.1, 0.0]` | Active project capsule center (3/4 angle) | **PROVISIONAL FOR GREYBOX** |
| `secondaryProjectCenter` | `[3.5, 0.3, -2.5]` | Secondary project capsule center | **PROVISIONAL FOR GREYBOX** |
| `distantProjectCenter` | `[-3.0, 0.5, -4.5]` | Distant project capsule silhouette | **PROVISIONAL FOR GREYBOX** |
| `hudLaneCenter` | `[-1.3, 0.0, 0.0]` | Protected DOM HUD overlay lane (left 32%) | **PROVISIONAL FOR GREYBOX** |
| `uxExtractionSource` | `[1.0, 0.2, 0.15]` | Active capsule preview surface extraction point | **PROVISIONAL FOR GREYBOX** |
| `tabletUXTarget` | `[0.0, 0.0, 0.0]` | Scene 05 Tablet device receiving anchor | **LOCKED EXISTING** |

---

## C. Seven-Beat Camera Table

### 1. Desktop Camera Specification (Viewport $\ge$ 1280px)

| Beat | Local Range | Position `[X, Y, Z]` | Target `[X, Y, Z]` | FOV | Primary Subject | Active Visual Owner | Easing |
|---|---|---|---|---|---|---|---|
| **Beat 01** | `0.00 – 0.12` | `[0.80, 0.30, 7.20]` | `[0.10, 0.30, 0.10]` | `50°` | Handoff Seed & Dock | Incoming Handoff | `easeOutQuad` |
| **Beat 02** | `0.12 – 0.27` | `[2.20, 0.40, 6.00]` | `[0.80, 0.20, -0.50]` | `52°` | Rail & Gallery Depth | Camera Environment Reveal | `easeInOutCubic` |
| **Beat 03** | `0.27 – 0.42` | `[1.80, 0.25, 4.20]` | `[1.10, 0.10, 0.00]` | `52°` | Active Capsule 3/4 | Active Project Identity | `easeInOutCubic` |
| **Beat 04** | `0.42 – 0.60` | `[1.40, 0.15, 3.20]` | `[1.10, 0.10, 0.00]` | `50°` | Capsule Structure | Physical Construction | `easeInOutCubic` |
| **Beat 05** | `0.60 – 0.74` | `[1.10, 0.10, 2.60]` | `[1.00, 0.10, 0.00]` | `48°` | Proof Surface | Project Proof | `easeOutCubic` |
| **Beat 06** | `0.74 – 0.88` | `[0.95, 0.08, 2.35]` | `[0.95, 0.08, 0.00]` | `48°` | Hero Proof & HUD | Hero Readability Composition | `linear` (stable hold) |
| **Beat 07** | `0.88 – 1.00` | `[0.30, 0.18, 7.80]` | `[0.00, 0.00, 0.00]` | `52°` | UX Extraction Surface | Outgoing UX Fragment | `easeInOutCubic` |

---

## D. Beat-by-Beat Shot Specifications

### Beat 01 — Incoming Follow (`0.00 – 0.12`)
- **Purpose**: Accompany the Scene 03 handoff seed as it lands on the laptop receiving dock.
- **Composition**: Handoff seed centered-right, receiving dock silhouette visible, background depth de-emphasized.
- **Hidden**: Project HUD, detailed proof layers, outcome copy, supporting capsules.
- **Safety**: Safe distance ($Z=7.2$) prevents near-plane clipping during transition from Scene 03 exit.

### Beat 02 — Gallery Reveal (`0.12 – 0.27`)
- **Purpose**: Lateral curve exposing the depth of the Project Proof Rail.
- **Composition**: Camera sweeps right to $X=2.20$, panning across the rail to reveal the active capsule silhouette ($X=1.20$), secondary capsule ($X=3.50$), and distant silhouette ($X=-3.00$).
- **Hidden**: Full HUD, long copy, open internal proof layers.
- **Direction**: Left-to-right lateral arc establishing depth before title activation.

### Beat 03 — Project Activation (`0.27 – 0.42`)
- **Purpose**: Establish active project identity from a 3/4 side angle.
- **Composition**: Active capsule occupies center-right ($X=1.10$). Left lane ($X < 0.0$) remains empty as protected negative space for the upcoming HUD.
- **Hidden**: Detailed proof copy, outcome metrics.

### Beat 04 — Inspection Arc (`0.42 – 0.60`)
- **Purpose**: Reveal physical construction and internal implementation depth.
- **Composition**: Controlled push-in from $Z=4.20 \rightarrow 3.20$. Camera angle stays within a $20^\circ$ inspection window (no back-side spin).
- **Motion Ownership**: Camera owns $70\%$ of movement; capsule layer separation owns $30\%$.

### Beat 05 — Proof Push-In (`0.60 – 0.74`)
- **Purpose**: Transition to stable readable perspective for problem and built-system proof.
- **Composition**: Camera moves to $Z=2.60$, FOV tightens to $48^\circ$. Left HUD begins fading in over protected negative space.
- **Readability**: Camera angular velocity drops to near zero before main text appears.

### Beat 06 — Hero Readability Lock (`0.74 – 0.88`)
- **Purpose**: Maximum stability for reading project proof and verified outcome.
- **Composition**:
  - **Left 32%**: Concise HUD / Proof summary.
  - **Center 12%**: Protected negative space gap.
  - **Right 56%**: Active project preview and proof surface.
- **Camera Pose**: Completely stable at `[0.95, 0.08, 2.35]`, target `[0.95, 0.08, 0.00]`. Zero camera drift.

### Beat 07 — UX Extraction (`0.88 – 1.00`)
- **Purpose**: Follow detaching UX fragment toward Scene 05.
- **Composition**: Camera pulls back smoothly to $Z=7.80$, aligning target with Scene 05 tablet anchor `[0, 0, 0]`.
- **Hidden**: Inactive supporting capsules, detailed proof text.

---

## E. Camera Boundary Continuity Table

| Boundary | Exit Pose (Previous) | Entry Pose (Next) | Target Continuity | FOV Delta | Continuity Status |
|---|---|---|---|---|---|
| **S03 → S04** | `[0.0, 0.15, 5.6]` | `[0.80, 0.30, 7.20]` | Smooth lerp from S03 exit target to dock | `48° → 50°` | **PASS** |
| **B01 → B02** | `[0.80, 0.30, 7.20]` | `[2.20, 0.40, 6.00]` | Continuous sweep across receiving dock | `50° → 52°` | **PASS** |
| **B02 → B03** | `[2.20, 0.40, 6.00]` | `[1.80, 0.25, 4.20]` | Smooth entry into 3/4 active project framing | `52° → 52°` | **PASS** |
| **B03 → B04** | `[1.80, 0.25, 4.20]` | `[1.40, 0.15, 3.20]` | Continuous forward push-in | `52° → 50°` | **PASS** |
| **B04 → B05** | `[1.40, 0.15, 3.20]` | `[1.10, 0.10, 2.60]` | Decelerating entry into proof framing | `50° → 48°` | **PASS** |
| **B05 → B06** | `[1.10, 0.10, 2.60]` | `[0.95, 0.08, 2.35]` | Micro-settle into locked hero readability pose | `48° → 48°` | **PASS** |
| **B06 → B07** | `[0.95, 0.08, 2.35]` | `[0.30, 0.18, 7.80]` | Controlled pullback following UX fragment | `48° → 52°` | **PASS** |
| **S04 → S05** | `[0.30, 0.18, 7.80]` | `[0.20, 0.10, 8.00]` | Perfectly aligned with S05 approach keyframe | `52° → 52°` | **PASS** |

---

## F. Desktop Composition Matrix

| Parameter | Planning Target | Calibration Safe Zone | Purpose |
|---|---|---|---|
| **HUD Lane Occupancy** | `30% – 34%` | Left `0% – 34%` viewport width | Houses concise project summary, problem, outcome |
| **Protected Space Gap** | `8% – 12%` | Center `34% – 44%` viewport width | Prevents 3D capsule geometry from colliding with text |
| **Active Project Occupancy** | `54% – 58%` | Right `44% – 100%` viewport width | High-detail 3D active project presentation |
| **Active Project Screen Y** | Centered ($Y=0.08$) | Top/Bottom `10%` margin | Prevents top/bottom bezel clipping |
| **Text Surface Perspective** | Face-on to $15^\circ$ angle | Max $15^\circ$ tilt | Ensures 100% text legibility during Beat 06 hold |

---

## G. Tablet Camera Contract (`1024x768`)

For tablet viewports ($768\text{px} \le \text{width} < 1280\text{px}$), camera pulls back along $Z$ and reduces lateral $X$ offsets to fit the 4:3 aspect ratio:

| Beat | Tablet Position `[X, Y, Z]` | Tablet Target `[X, Y, Z]` | Tablet FOV | Derivation Rule |
|---|---|---|---|---|
| **Beat 01** | `[0.40, 0.20, 8.20]` | `[0.05, 0.20, 0.00]` | `48°` | $X \times 0.5$, $Z + 1.0$ |
| **Beat 02** | `[1.20, 0.30, 7.20]` | `[0.40, 0.15, -0.30]` | `50°` | $X \times 0.55$, $Z + 1.2$ |
| **Beat 03** | `[0.90, 0.15, 5.20]` | `[0.55, 0.05, 0.00]` | `50°` | $X \times 0.5$, $Z + 1.0$ |
| **Beat 04** | `[0.70, 0.10, 4.20]` | `[0.55, 0.05, 0.00]` | `48°` | $X \times 0.5$, $Z + 1.0$ |
| **Beat 05** | `[0.55, 0.05, 3.50]` | `[0.50, 0.05, 0.00]` | `46°` | $X \times 0.5$, $Z + 0.9$ |
| **Beat 06** | `[0.45, 0.04, 3.20]` | `[0.45, 0.04, 0.00]` | `46°` | $X \times 0.47$, $Z + 0.85$ |
| **Beat 07** | `[0.15, 0.10, 8.60]` | `[0.00, 0.00, 0.00]` | `50°` | $X \times 0.5$, $Z + 0.8$ |

---

## H. Mobile Camera Contract (`430x932`, `390x844`, `375x667`)

Mobile viewports use a centered vertical camera trajectory ($X=0$) with lower FOV ($42^\circ – 46^\circ$) and increased $Z$ distance to eliminate bezel clipping:

| Beat | Mobile Position `[X, Y, Z]` | Mobile Target `[X, Y, Z]` | Mobile FOV | Mobile Visual Behavior |
|---|---|---|---|---|
| **Beat 01** | `[0.00, 0.20, 8.50]` | `[0.00, 0.30, 0.10]` | `46°` | Handoff seed lands on centered receiving dock |
| **Beat 02** | `[0.80, 0.30, 7.80]` | `[0.20, 0.20, -0.50]` | `46°` | Gentle right sweep; secondary capsules recede |
| **Beat 03** | `[0.50, 0.10, 5.80]` | `[0.10, 0.00, 0.00]` | `44°` | Centered active project establishment |
| **Beat 04** | `[0.30, 0.05, 4.80]` | `[0.00, 0.00, 0.00]` | `44°` | Capsule structural layer opening |
| **Beat 05** | `[0.15, 0.00, 4.20]` | `[0.00, 0.00, 0.00]` | `44°` | Proof surface decelerates into view |
| **Beat 06** | `[0.00, 0.00, 3.80]` | `[0.00, 0.00, 0.00]` | `42°` | Locked hero shot; 100% unclipped project framing |
| **Beat 07** | `[0.00, 0.20, 8.20]` | `[0.00, 0.00, 0.00]` | `48°` | UX fragment detaches toward Scene 05 |

---

## I. Reduced-Motion Camera Contract

- **State**: When `reducedMotion === true`, the camera snaps directly to a single static background pose:
  - `position: [0.0, 0.0, 6.0]`, `target: [0.0, 0.0, 0.0]`, `fov: 46°`.
- **DOM Ownership**: `Scene04ProjectsStaticCard.tsx` (2D HTML accessible tablist) renders over the de-emphasized 3D canvas.
- **Animation**: All lerp functions, RAF continuous sweeps, and mouse parallax loops are completely bypassed.

---

## J. Future Pointer-Safe Envelope

Desktop Hero state (`Beat 06`) reserves a strict additive mouse parallax envelope:
- **Max Camera Position Offset**: $\Delta X = \pm 0.09$, $\Delta Y = \pm 0.05$.
- **Max Target Offset**: $\Delta X = \pm 0.04$, $\Delta Y = \pm 0.02$.
- **Guaranteed Invariant**: Left HUD lane ($X < 0.0$) and Active Project ($X > 0.44$) maintain a minimum $0.44$ world unit gap ($\approx 10\%$ viewport width), preventing collision regardless of mouse position.

---

## K. Camera QA Matrix

| Beat | Primary Subject Clear? | Narrative Purpose Visible? | Readable? | HUD Collision? | Clipping Risk? | Reverse-Scroll Safe? | Mobile Intent Defined? | Status |
|---|---|---|---|---|---|---|---|---|
| **Beat 01** | Yes | Yes | N/A | None (Hidden) | None ($Z=7.2$) | Yes | Yes ($Z=8.5$) | **PASS** |
| **Beat 02** | Yes | Yes | N/A | None (Hidden) | None ($Z=6.0$) | Yes | Yes ($Z=7.8$) | **PASS** |
| **Beat 03** | Yes | Yes | Yes | None (Protected) | None ($Z=4.2$) | Yes | Yes ($Z=5.8$) | **PASS** |
| **Beat 04** | Yes | Yes | Yes | None (Protected) | None ($Z=3.2$) | Yes | Yes ($Z=4.8$) | **PASS** |
| **Beat 05** | Yes | Yes | Yes | None (Fading in) | None ($Z=2.6$) | Yes | Yes ($Z=4.2$) | **PASS** |
| **Beat 06** | Yes | Yes | **100%** | None (32/12/56) | None ($Z=2.35$) | Yes | Yes ($Z=3.8$) | **PASS** |
| **Beat 07** | Yes | Yes | Yes | None (Fading out) | None ($Z=7.8$) | Yes | Yes ($Z=8.2$) | **PASS** |

---

## L. S04-P03 Calibration Dependencies

1. **Proof Rail Curve Radius**: $X=2.20 \rightarrow 1.80$ laterally in Beat 02 assumes proof rail arc fits within $X \in [-1.5, 3.5]$. To be calibrated during S04-P03 greybox setup.
2. **Capsule Frame Width**: Beat 06 $Z=2.35$ with $48^\circ$ FOV assumes active capsule bounding width $\le 2.2$ world units. To be calibrated in S04-P03.

---

## M. Ambiguity Register

- **Unresolved Camera Ambiguity**: None.
- **Verdict**: No unresolved camera-direction ambiguity remains.

---

## N. Changed Files

```txt
No production source files changed.
```

Planning documentation created:
- `docs/scene04/S04-P02-CAMERA-SHOT-BIBLE.md`

---

S04-P02 LOCKED — Scene 04 now has an implementation-ready seven-beat Camera Shot Bible with exact desktop, tablet, mobile, and reduced-motion poses; continuous target and FOV transitions; protected HUD and project safe zones; reverse-scroll compatibility; a stable Hero readability state; and an outgoing extraction pose aligned with Scene 05. No production behavior was changed.
