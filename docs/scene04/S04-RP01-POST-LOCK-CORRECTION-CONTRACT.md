# Scene 04 — Post-Lock Discovery & Four-Screen Correction Contract (S04-RP01)

This contract defines the authoritative correction architecture for four user-visible problems identified in Scene 04:
1. **Navigation Speed**: Project-to-project transitions ($7\%$ scroll budget) feel too fast.
2. **Camera Drift**: Camera target/FOV continuously interpolates during active project holds instead of holding steady.
3. **Embedded Content Weakness**: Drei `<Html transform>` content suffers from vertical displacement and weak layout centering.
4. **Project Count**: The current codebase contains only 3 verified projects (`project-1`, `project-2`, `project-3`), while 4 screens are intended.

---

## 1. Project Inventory Audit & Fourth-Project Decision

- **Current Repository Inventory**:
  - `project-1`: Commerce Operations Platform
  - `project-2`: Interactive Brand Experience
  - `project-3`: Admin Workflow System
- **Audit Outcome**: **OUTCOME B — NO FOURTH VERIFIED PROJECT EXISTS**
- **Decision & Lock**: Per Section 2 of `S04-RP01`, no empty, placeholder, or duplicated project records will be mounted. **The implementation phase (RP02) remains DATA-BLOCKED** until a verified `project-4` data object satisfying the locked `ProjectEntry` schema is supplied.

---

## 2. Four-Screen Ring Strategy (90° Spacing)

When `project-4` is supplied, the ring geometry transitions from 120° spacing to 90° spacing:
$$\text{worldPosition} = \text{ringCenter} + [R \sin(\theta_i + \theta_{\text{ring}}), \, 0, \, R \cos(\theta_i + \theta_{\text{ring}})]$$

- **Logical Screen Angles**:
  - `screen-1`: $0^\circ$ (Front Active)
  - `screen-2`: $90^\circ$ (Right Context)
  - `screen-3`: $180^\circ$ (Rear Background)
  - `screen-4`: $270^\circ / -90^\circ$ (Left Context)
- **Radii**: Desktop $R = 2.40\text{m}$, Tablet $R = 1.95\text{m}$, Mobile $R = 1.40\text{m}$.
- **Clearance**: Minimum distance between adjacent screen edges at $90^\circ$ spacing is $1.85\text{m}$ (exceeds physical frame width $1.60\text{m}$), preventing mesh intersection.

---

## 3. New Cinematic Scroll Segmentation

To solve fast scroll transitions, transition windows are expanded from $7\%$ to $14\%$, while active holds are stabilized at $18\%$:

| Segment Range (Local $p$) | Sub-Phase Name | Active Screen | Camera Behavior |
| :--- | :--- | :--- | :--- |
| **0.00 – 0.08** | Incoming Dock Landing | `screen-1` | Dock arrival lerp |
| **0.08 – 0.16** | Ring Reveal | `screen-1` | Ring reveal sweep |
| **0.16 – 0.34** | Project 01 Hold (18%) | `screen-1` | **FIXED INSPECTION HOLD** |
| **0.34 – 0.46** | Transition 01 (12%) | `screen-1 -> screen-2` | Controlled pullback & rotation |
| **0.46 – 0.62** | Project 02 Hold (16%) | `screen-2` | **FIXED INSPECTION HOLD** |
| **0.62 – 0.74** | Transition 02 (12%) | `screen-2 -> screen-3` | Controlled pullback & rotation |
| **0.74 – 0.88** | Project 03 Hold (14%) | `screen-3` | **FIXED INSPECTION HOLD** |
| **0.88 – 0.94** | Transition 03 (6%) | `screen-3 -> screen-4` | Controlled rotation |
| **0.94 – 1.00** | Project 04 Hold & UX Extraction | `screen-4` | **FIXED HOLD & EXTRACTION** |

---

## 4. Shared Active-Screen Camera Inspection Hold

To solve camera drift during active project holds, `CameraController.tsx` is updated to lock to a single static pose (`PROJECT_INSPECTION_HOLD_CAMERA`) whenever $p$ is inside an active hold segment:

- **Position**: `[0.00, 0.00, 6.00]` Desktop / `[0.00, 0.00, 3.80]` Mobile
- **Target**: `[0.00, 0.00, 0.00]`
- **FOV**: `46`
- **Rule**: During active holds, camera base position/target/FOV remain **100% frozen**. Camera movement occurs exclusively during ring transitions.

---

## 5. Embedded Screen-Content Layout Contract

To solve vertical displacement and weak layout hierarchy:
- Replace flex vertical centering with **top-anchored absolute positioning**:
  - `top: 0`, `paddingTop: 16px`, `paddingLeft: 20px`, `paddingRight: 20px` inside the $1.36\text{m} \times 0.72\text{m}$ content-safe region (`width: 370px, height: 208px`).
- **Hierarchy Order**:
  1. Top: Project index & subhead badge (`fontSize: 10px`, Cyan `#38D6FF`)
  2. Primary: Project Title (`fontSize: 18px`, Bold, `#F8FAFC`, max 2 lines)
  3. Secondary: Problem / Challenge (`fontSize: 11px`, `#94A3B8`)
  4. Lower: Built / Implementation (`fontSize: 11px`, `#E2E8F0`)
  5. Bottom: Outcome Gold Tag (`#D8A84F`, max 1 line) & Tech Stack Pills

---

## 6. Implementation Sequence & Next Steps

1. **S04-RP02**: Fourth verified project data intake & 4-screen ring geometry implementation (**DATA-BLOCKED** until `project-4` data supplied).
2. **S04-RP03**: Cinematic scroll retiming & shared active-screen camera hold lock.
3. **S04-RP04**: Embedded screen-content top-anchored layout & typography overhaul.
4. **S04-RP05**: Integrated QA, responsive revalidation, and performance verification.
5. **S04-RP06**: Final 4-screen Scene 04 lock update.

---

## 7. Verdict

```txt
S04-RP01 DATA-BLOCKED — Navigation, camera, and embedded-content corrections are fully specified, but the final four-screen implementation cannot proceed until a verified fourth project record satisfying the locked data contract is available.
```
