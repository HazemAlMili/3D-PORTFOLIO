# S04-P01 — Narrative and Visual Direction Lock

> **Status:** LOCKED  
> **Phase:** S04-P01 — Planning & Creative Direction Lock  
> **Authority:** Preserves all verified findings from `s04_p00_discovery_report.md` and `SCENE-04-PRODUCTION-BLUEPRINT.md`.

---

## A. Final Scene Statement

The camera follows the completed product from Scene 03 into a cinematic proof gallery, activates one real project, reveals how it was built and what it achieved, then extracts a meaningful UX surface into Scene 05.

---

## B. Narrative Sequence

The visitor journey moves through seven continuous stages:

1. **HANDOFF (`0.00 – 0.12`)**:
   - Receive the Scene 03 completed product seed onto the laptop receiving dock.
   - Primary owner: Incoming handoff.
   - Visible: Handoff seed, receiving dock, partial rail silhouette.
   - Hidden: HUD, project copy, proof layers, full gallery.

2. **GALLERY REVEAL (`0.12 – 0.27`)**:
   - Camera moves laterally to reveal the spatial depth of the Project Proof Rail.
   - Primary owner: Camera-led environment reveal.
   - Visible: Proof rail, active capsule silhouette, supporting capsules in depth.
   - Hidden: Full copy, detailed proof layers, final outcome.

3. **PROJECT ACTIVATION (`0.27 – 0.42`)**:
   - The seed activates the primary project capsule from a 3/4 side angle.
   - Primary owner: Active project identity.
   - Visible: Project name, category, preview hint, capsule frame.
   - Secondary: Supporting projects remain low-detail and visually restrained.

4. **INSPECTION (`0.42 – 0.60`)**:
   - The capsule opens to reveal internal structural layers and architecture relationships.
   - Primary owner: Physical project construction.
   - Visible: Preview surface, structural layers, system relationship anchors.

5. **PROOF (`0.60 – 0.74`)**:
   - Camera decelerates into a stable perspective to present problem and implementation proof.
   - Primary owner: Project proof.
   - Visible: Verified problem statement, built-system summary, core architecture.

6. **OUTCOME (`0.74 – 0.88`)**:
   - Camera reaches the hero readability composition, highlighting verified impact.
   - Primary owner: Outcome and contribution.
   - Visible: Primary outcome metric/statement, project HUD (left lane), active capsule (right lane).

7. **UX EXTRACTION (`0.88 – 1.00`)**:
   - A meaningful interface surface detaches from the active project and leads into Scene 05.
   - Primary owner: Outgoing UX fragment.
   - Visible: Detaching UX fragment, camera tracking path toward Scene 05 tablet anchor.

---

## C. Visual Target

A cinematic architectural project gallery where completed products become inspectable proof.

- One curved or guided Project Proof Rail.
- One dominant active project capsule with physical depth.
- Restrained environmental gallery atmosphere with dark navy depth and cyan/gold accents.
- One incoming Scene 03 handoff seed and one outgoing UX extraction fragment.

---

## D. Visual Anti-Target

Scene 04 must **NEVER** become:

- A flat project-card grid
- A generic carousel or laptop slideshow
- Floating browser windows or holographic panels
- Three equal project screens visible simultaneously
- A large wall of technical text or tech-stack icons as the primary hero
- Unexplained particles or full 360° spinning orbits
- HUD visible from the first frame
- Fabricated screenshots, fake metrics, or fake GitHub activity

---

## E. Laptop Role

The procedural laptop (`LaptopDevice.tsx`) is retained as:

- A brief receiving dock and origin anchor for the incoming Scene 03 handoff.

The laptop **MUST NOT**:

- Remain centered throughout the full scene.
- Trap project content on its screen face.
- Serve as a 3-project slideshow.
- Dictate the final camera composition.

---

## F. Spatial Direction & Project Capsule Role

### 1. Spatial Layout

- **Environment**: Project Proof Rail with a restrained gallery/vault atmosphere.
- **Visible Count**: Exactly 1 active project (high detail), 1 secondary project (medium/low detail), 1 distant project (silhouette).

### 2. Detail Hierarchy

- **Active Project**: Full structural depth, readable text, active lighting, and proof layers.
- **Secondary Project**: Recognizable shape, low detail, muted cyan/slate materials.
- **Distant Project**: Minimal wireframe or silhouette outline in background depth.

### 3. Project Capsule Conceptual Structure

- Physical frame
- Preview surface
- Controlled proof layers
- Outcome marker
- UX extraction anchor

Supports states: `Dormant → Active → Inspecting → Proof → Hero → Extracting`.

---

## G. UI/UX Information Contract

### 1. Information Order

1. What is this project? (Title & Category)
2. What problem did it solve? (Problem Statement)
3. What did I build? (Implementation Summary)
4. What proves the outcome? (Impact & Result)
5. What can I inspect next? (Outgoing UX Surface)

### 2. Information Priority

- **Primary**: Project name, category, proof schematic/preview, user contribution, outcome.
- **Secondary**: Challenge/problem, core architecture relationship, project actions.
- **Supporting**: Tech stack, secondary implementation notes.

### 3. HUD Rules

- Hidden during incoming handoff and gallery reveal (`0.00 – 0.27`).
- Appears in left lane (`30–34%` width) after active project is established.
- Spatially separated from the capsule (no overlap).
- Reaches maximum clarity during the Hero/Outcome state (`0.74 – 0.88`).

---

## H. Preview-Asset Fallback Strategy

Until real screenshots or 3D GLB assets are supplied:

- Use project-specific **proof schematics** (verified problem, built summary, system relationships, and interface wireframe fragments).
- **FORBIDDEN**: Fake browser frames, fabricated screenshots, invented metrics, or generic stock photography.
- The capsule architecture must accept real GLB/image assets in future phases without structural redesign.

---

## I. Camera Intent for S04-P02

- Continuous cinematic movement leading the scene before content appears.
- Follows incoming Scene 03 handoff onto laptop dock (`0.00 – 0.12`).
- Lateral curve revealing gallery depth (`0.12 – 0.27`).
- Establishes active project from a 3/4 side angle (`0.27 – 0.42`).
- Inspects physical depth without full orbit (`0.42 – 0.60`).
- Decelerates into stable readable perspective (`0.60 – 0.74`).
- Locks hero composition with left HUD and right project (`0.74 – 0.88`).
- Follows outgoing UX fragment into Scene 05 (`0.88 – 1.00`).

---

## J. Incoming and Outgoing Meaning

- **Incoming (Scene 03 → 04)**: The Delivery Pipeline exit output from Scene 03 (`[4.2, -1.8, -3.8]`) lands on the laptop receiving dock (`[0, 0.4, 0.10]`) as a proof seed.
- **Outgoing (Scene 04 → 05)**: An interface component detaches from the active project's preview surface and travels to Scene 05 (`tabletUXTarget` `[0, 0, 0]`).

---

## K. Ambiguity Register

- **Unresolved Creative Decisions**: None.
- **Verdict**: No unresolved creative ambiguity remains to block `S04-P02 — Camera Shot Bible`.

---

## L. Changed Files

```txt
No production source files changed.
```

Planning documentation created:

- `docs/scene04/S04-P01-NARRATIVE-VISUAL-LOCK.md`

---

S04-P01 LOCKED — Scene 04 is defined as a camera-led Project Proof Rail where the Scene 03 handoff activates one dominant project, its verified contribution and outcome unfold progressively, and a meaningful UX surface is extracted into Scene 05. The laptop is retained only as a transitional receiving dock, supporting projects remain restrained, missing preview assets use truthful proof schematics, and no production behavior was changed.
