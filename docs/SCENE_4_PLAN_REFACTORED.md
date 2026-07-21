# Scene 04 — Project Proof Rail
## Production Blueprint, Phase-Gated Implementation Plan, and Controlled Refactor

> **Status:** In development — S04-P00 through S04-P10 are locked; S04-P11 implementation is complete with final evidence correction pending. A controlled multi-screen refactor is approved before S04-P12.  
> **Purpose:** Preserve all accepted Scene 04 work while replacing the external-HUD/single-hero presentation with a scroll-driven connected project-screen ring.  
> **Source of truth:** This file should be placed in the project root or `/docs` and preserved throughout Scene 04 development.  
> **Refactor authority:** Sections marked **Controlled Refactor Override** supersede only the explicitly listed presentation contracts. Every other prior lock remains protected.

---

# 1. Scene Identity

## Working Name

**Scene 04 — Project Proof Rail / Connected Project Screen Ring / From Product to Proof**

## Narrative Position

Scene 03 ends with a product reaching:

```txt
READY
→ HANDOFF
```

Scene 04 receives that finished product and turns it into a connected sequence of project proofs:

```txt
HANDOFF
→ CONNECTED SCREEN RING
→ PROJECT 01
→ PROJECT 02
→ PROJECT 03
→ PROJECT 04 only when verified data exists
→ UX EXTRACTION
```

Each project is owned by one physical screen. Scroll rotates or advances the connected ring so one screen becomes active at a time.

Scene 04 must then pass a meaningful interface fragment into Scene 05.

## Core Story

```txt
Scene 03:
This is how the product is assembled.

Scene 04:
These are the projects that prove the ability to build it.

Scene 05:
This is how the resulting user experience behaves.
```

---

# 2. Primary Creative Principle

## The Camera Is the First Hero

Scene 04 must be designed in this order:

```txt
Camera movement
→ Spatial composition
→ Project motion
→ UI/UX content
→ Materials and lighting
→ Decorative polish
```

The connected screen ring, embedded project content, text, and environment must be built around the locked camera journey.

They must not be placed first and then forced to work with a camera afterward.

## Authority Hierarchy

```txt
1. Scroll-driven camera story
2. Main project composition
3. Project reveal motion
4. UI/UX readability
5. Subtle pointer response
6. Decorative effects
```

Decorative effects must never overpower the camera, project, or readable content.

---

# 3. Selected Visual Direction

## Connected Project Screen Ring with Gallery/Vault Atmosphere

Scene 04 should contain:

- one curved or guided proof rail feeding into the project ring
- three verified project screens in the current implementation
- optional support for a fourth screen only when verified project data exists
- one active screen positioned for clear reading
- previous and next screens visible as connected ring context
- remaining screens reduced to silhouette, low detail, or unmounted
- a restrained architectural gallery environment
- one incoming Scene 03 handoff element
- one outgoing UX extraction element from the final active screen
- no external cinematic project HUD

## Visual Target

```txt
A cinematic architectural ring of connected project screens
where scroll moves the viewer from one verified project proof to the next.
```

## Screen Ownership Model

```txt
One screen = one project
One active project = full readable detail
Adjacent screens = reduced context
Other screens = silhouette, frozen, or unmounted
```

Project title, concise challenge, contribution, proof, and verified outcome must appear inside the owning screen or its physically attached screen surface. They must not appear in a detached left-side project-profile HUD.

## Visual Anti-Target

Scene 04 must not become:

- a flat project-card grid
- a standard two-dimensional carousel
- one hero screen plus an external profile card
- floating browser windows with no physical relationship
- a generic dashboard wall
- a GitHub repository viewer
- random holographic panels
- many disconnected groups
- every project open at the same time
- a scene where all text, layers, effects, and projects are visible together

## Active Detail Rule

At any moment:

```txt
Active screen = high detail and readable embedded project content
Previous/next screens = low detail and ring context
Remaining screens = silhouette, minimal geometry, frozen, or unmounted
```

The ring may rotate, advance, or re-index with scroll, but only one project may own the primary visual and content state.

---

# 4. Global Development Rules

## Existing-System First

The project is not starting from zero.

Before creating any new component or system:

1. inspect the existing Scene 04 implementation
2. identify reusable components and data
3. identify the existing camera, scroll, pointer, transition, responsive, and reduced-motion systems
4. reuse, extend, or reconfigure existing systems where possible
5. prefer the smallest safe modification

Do not create duplicate:

- camera systems
- scroll-progress systems
- pointer systems
- project-data stores
- transition managers
- device-tier systems
- reduced-motion systems

## Group Creation Rule

No new Three.js or R3F group may be created unless it owns at least one of:

- an independent transform
- an independent animation
- an independent render lifecycle

If a group has no independent responsibility, merge it into an existing parent.

## Visual Ownership Rule

Each scene beat must have one primary visual owner.

Previous-beat elements must:

- freeze
- reduce detail
- become secondary
- become render-gated
- or unmount when no longer needed

There must never be an uncontrolled state where every element remains visible and animated.

## Controlled Refactor Rule

This refactor is not a scene rebuild.

### Protected and Reused

The following remain authoritative unless RF01 proves a direct incompatibility:

- existing scroll-progress system
- locked camera system and seven-beat journey
- Scene 03 incoming handoff
- Scene 05 outgoing UX-fragment handoff
- verified `projectData`
- Project Capsule/frame foundations
- proof rail and connected-screen concept
- material and lighting language
- shared pointer system
- responsive, reduced-motion, device-tier, debug, and performance infrastructure

### Explicitly Superseded

The following presentation contracts are replaced by S04-RF01 through S04-RF03:

- external `Scene04HUD` as the cinematic project-profile owner
- fixed left-HUD / protected-gap / right-single-capsule layout
- one permanent hero project for the full Scene 04 journey
- secondary and distant projects serving only as decorative depth
- full project information existing outside the owning screen

### Minimal-Change Requirement

The refactor must reuse or reconfigure the current systems before creating new ones. Camera changes are allowed only when RF01 proves a screen-ring composition cannot work within the locked path, and then only the smallest keyframe or target adjustment may be proposed and separately evidenced.

## QA Ownership

The implementation agent owns:

- file inspection
- code changes
- screenshots
- clips
- performance readings
- console validation
- technical commands
- completion evidence

The user must not be asked to perform manual QA.

## Mandatory Technical Validation

Every implementation phase must run:

```bash
npm run typecheck
npm run lint
npm run build
```

Build success alone is not visual success.

---

# 5. Phase Overview

```txt
S04-P00 — Current-State Discovery and Reuse Audit                         LOCKED
S04-P01 — Narrative and Visual Direction Lock                            LOCKED
S04-P02 — Camera Shot Bible                                               LOCKED
S04-P03 — Spatial Composition and Greybox                                LOCKED
S04-P04 — Scene Graph and Render Ownership Contract                      LOCKED
S04-P05 — Incoming and Outgoing Transition Blueprint                     LOCKED
S04-P06 — Project Capsule Structural Architecture                        LOCKED
S04-P07 — Project Motion and State Choreography                          LOCKED
S04-P08 — UI/UX and Project Content Architecture                         LOCKED / PRESENTATION PARTIALLY SUPERSEDED
S04-P09 — Integrated Greybox Experience                                  LOCKED / BASELINE PRESERVED
S04-P10 — Materials, Lighting, and Visual Language                       LOCKED / REUSED
S04-P11 — Pointer Interaction and Micro-Motion                           IMPLEMENTED / FINAL EVIDENCE CORRECTION

S04-RF01 — Connected Screen Ring Discovery and Refactor Contract         NOT STARTED
S04-RF02 — Scroll-Driven Multi-Project Screen Ring Implementation        NOT STARTED
S04-RF03 — Integrated Refactor QA, Regression Fixes, and Lock            NOT STARTED

S04-P12 — Responsive, Mobile, and Reduced Motion                         NOT STARTED
S04-P13 — Performance and Cross-Scene Isolation                          NOT STARTED
S04-P14 — Complete Visual and Interaction QA                             NOT STARTED
S04-P15 — Final Scene Lock and Scene 05 Handoff                          NOT STARTED
```

No phase may begin before the previous phase is reviewed and explicitly locked.

---

# 6. Phase Details

## S04-P00 — Current-State Discovery and Reuse Audit

### Goal

Understand exactly what already exists before planning changes.

### Required Discovery

Inspect:

- current Scene 04 component tree
- existing project data
- project assets, previews, textures, models, and routes
- current Scene 04 camera keyframes
- Scene 03 → Scene 04 transition
- Scene 04 → Scene 05 transition
- current overlays and HUD
- shared pointer/parallax system
- responsive and reduced-motion paths
- scene visibility and render ownership
- current performance behavior

### Classification

Every relevant item must be classified as:

```txt
REUSE
EXTEND
RECONFIGURE
REMOVE
REPLACE
```

### Deliverables

- current component tree
- current-state screenshots
- continuous current-state clip
- project-data inventory
- asset inventory
- camera inventory
- reuse matrix
- risk register
- protected systems
- likely files to be modified

### Gate

Pass only when the current implementation and reuse boundaries are fully understood.

```txt
S04-P00 LOCK — Current implementation and reuse boundaries confirmed.
```

---

## S04-P01 — Narrative and Visual Direction Lock

### Goal

Lock what the scene communicates and how it should feel before geometry or camera values are implemented.

### Decisions to Lock

- scene narrative
- visual target and anti-target
- number of verified project screens and simultaneously visible ring members
- active versus inactive project behavior
- gallery atmosphere
- cyan/gold usage
- incoming handoff meaning
- outgoing UX-fragment meaning
- project presentation language

### Locked Narrative

```txt
Receive completed product
→ reveal connected project-screen ring
→ activate Project 01 screen
→ scroll to Project 02 screen
→ scroll to Project 03 screen
→ inspect one verified project at a time
→ reveal proof and outcome inside the active screen
→ extract UX surface from the final active screen
→ enter Scene 05
```

### Initial Visible Project Count — Refactor Override

```txt
3 verified project screens in the current scene
1 active readable screen
1 previous/context screen
1 next/context screen
Optional fourth screen only after verified project data is added
```

The ring architecture may support four instances, but production must not render an invented fourth project.

### Gate

Pass only when the scene can be described in one clear sentence and cannot be confused with a card grid or generic carousel.

```txt
S04-P01 LOCK — Narrative and visual direction approved.
```

---

## S04-P02 — Camera Shot Bible

> **Controlled Refactor Impact:** The locked camera path remains the baseline. Legacy references to left-HUD/right-capsule framing are superseded by RF01. RF01 must first attempt to fit the connected screen ring inside the existing seven-beat camera journey; only source-proven minimal camera adjustments may be proposed.

### Goal

Design the complete camera journey before final environment geometry or UI content is built.

### Beat 01 — Incoming Follow

**Approximate range:** `0.00–0.12`

**Camera role:** Follow the Scene 03 handoff into Scene 04.

Visible:

- handoff seed
- partial proof rail
- restrained environmental silhouette

Hidden:

- detailed embedded project content
- full connected ring
- unrelated screens

---

### Beat 02 — Gallery Reveal

**Approximate range:** `0.12–0.27`

**Camera role:** Reveal the spatial depth and project gallery.

Movement:

- forward movement
- lateral curve
- controlled target shift
- mild bank only when compositionally useful

Visible:

- proof rail
- connected screen-ring silhouette
- first active screen candidate
- previous/next project screens in depth

---

### Beat 03 — Project Establishment

**Approximate range:** `0.27–0.42`

**Camera role:** Establish the active project as the main subject.

Preferred framing after the controlled refactor:

- active project screen is the clear camera subject
- previous and next screens establish the connected ring without competing
- cinematic three-quarter angle
- visible physical screen depth and connections
- no screen-to-screen collision
- no external cinematic HUD

---

### Beat 04 — Inspection Arc

**Approximate range:** `0.42–0.60`

**Camera role:** Reveal physical construction and implementation depth.

Movement:

- limited inspection arc
- no full orbit
- no dramatic spin
- no text-heavy content during faster motion

---

### Beat 05 — Proof Push-In

**Approximate range:** `0.60–0.74`

**Camera role:** Move closer to project proof and implementation story.

Movement:

- controlled push-in
- stable text perspective
- gradual camera deceleration

---

### Beat 06 — Hero Readability Lock

**Approximate range:** `0.74–0.88`

**Camera role:** Create the clearest readable project composition.

Composition after the controlled refactor:

```txt
Primary frame:
Active project screen with embedded readable proof

Ring context:
Previous and next connected screens at reduced detail

Background:
Restrained architectural gallery and nonessential ring members
```

The active screen must remain stable enough for reading, and adjacent screens must preserve spatial continuity without covering its content.

The camera must remain stable enough for reading.

---

### Beat 07 — UX Extraction

**Approximate range:** `0.88–1.00`

**Camera role:** Follow a meaningful UX fragment into Scene 05.

The camera must not:

- fade into empty space
- jump to an unrelated pose
- allow Scene 05 heavy geometry to enter early
- leave Scene 04 before the extraction is understood

### Camera Documentation Required for Every Beat

- camera position
- camera target
- FOV
- movement curve
- easing
- primary subject
- visible elements
- hidden elements
- embedded project-content state
- pointer authority
- entry pose
- exit pose

### QA Evidence

- screenshot for every beat
- continuous forward-scroll clip
- continuous reverse-scroll clip
- camera values
- clipping review
- FOV review
- transition-continuity review

### Gate

Fail if the camera is described only with general terms, has no defined subject, creates unreadable perspective, or breaks during reverse scroll.

```txt
S04-P02 LOCK — Camera path, beats, targets, and framing approved.
```

---

## S04-P03 — Spatial Composition and Greybox

> **Controlled Refactor Impact:** The original single active/secondary/distant capsule greybox remains useful as structural evidence, but its fixed left-HUD/right-capsule layout is superseded. RF01 and RF02 own the connected ring composition and reuse the existing frame geometry wherever possible.

### Goal

Build only the minimum geometry required to validate the locked camera.

### Greybox Scope

Create or reuse only:

- Scene 04 root
- proof rail placeholder
- connected screen-ring root
- three verified project-screen placeholders
- optional non-rendered fourth-instance support
- previous/next connection geometry
- embedded content-safe placeholders inside the screens
- incoming handoff placeholder
- outgoing UX-fragment placeholder
- basic platform or architectural anchors

Do not add:

- final materials
- particles
- detailed labels
- real project screenshots
- decorative lines
- complex lighting
- internal proof layers

### Desktop Composition Guide — Refactor Override

RF01 must lock numeric values for:

```txt
Active screen readable footprint
Ring center and radius
Previous-screen angle and visibility
Next-screen angle and visibility
Embedded content-safe region
Screen-edge and camera-clipping margins
```

The legacy `left HUD / protected gap / right project` percentages are no longer production targets. The refactor must preserve readable breathing space around the active screen without reserving an external HUD lane.

### Required Safe Zones

- active-screen safe zone
- adjacent-screen and ring-connection safe zones
- embedded project-content safe zone
- screen-edge safe zone
- camera clipping safety
- transition safety
- mobile-safe region

### Gate

No motion, content, or final styling may begin until all seven camera beats work with the greybox.

```txt
S04-P03 LOCK — Spatial composition and greybox approved.
```

---

## S04-P04 — Scene Graph and Render Ownership Contract

> **Controlled Refactor Impact:** Existing ownership, lifecycle, and minimal-group rules remain locked. The legacy active/secondary/distant collection is reconfigured into a data-driven connected screen ring under RF02.

### Goal

Define the smallest controlled component/group structure.

### Refactored Scene Graph Target

```txt
Scene04Root
├── ProofRail
├── ConnectedProjectScreenRing
│   ├── ProjectScreen[project-1]
│   ├── ProjectScreen[project-2]
│   ├── ProjectScreen[project-3]
│   └── ProjectScreen[project-4] only when verified
├── ScreenConnections
├── IncomingHandoff
├── OutgoingUXFragment
└── Scene04Lighting
```

The ring, each independently moving screen, and connection system may own groups only when they have independent transform, animation, or lifecycle responsibility.

### Reusable Project Screen / Capsule Foundation

```txt
ProjectCapsule
├── PhysicalFrame
├── PreviewSurface
├── ProofLayers
├── OutcomeMarker
└── UXExtractionAnchor
```

This structure must be compared with the existing implementation before new components are created.

### Required Ownership Data

For every group/component document:

- purpose
- parent owner
- transform responsibility
- animation responsibility
- visible progress window
- high-detail window
- inactive behavior
- exit behavior
- performance cost
- reuse source

### Beat Ownership Matrix

```txt
0.00–0.12  Incoming handoff owns the frame
0.12–0.27  Gallery reveal owns the frame
0.27–0.42  First active project screen owns the frame
0.42–0.60  Connected project progression owns the frame
0.60–0.74  Current project proof and next-screen transition own the frame
0.74–0.88  Final active project screen and embedded proof own the frame
0.88–1.00  UX extraction owns the frame
```

### Gate

Fail if groups exist without clear responsibility, inactive projects remain full-detail, or multiple systems own the same visual state.

```txt
S04-P04 LOCK — Scene graph and render ownership approved.
```

---

## S04-P05 — Incoming and Outgoing Transition Blueprint

### Goal

Design both scene boundaries before detailed project implementation.

### Incoming Contract

```txt
Scene 03 READY
→ HANDOFF
→ project seed follows connection path
→ Scene 04 rail receives the seed
→ first project screen activates within the connected ring
```

Must not:

- create dead air
- show both full scenes together
- let Scene 04 cover Scene 03
- create a disconnected opening

### Outgoing Contract

```txt
Final active project-screen proof
→ meaningful interface surface isolates
→ UX fragment detaches
→ camera follows fragment
→ Scene 05 receives it
```

Must not:

- fade into empty space
- use an arbitrary particle
- send an unrelated object
- let Scene 05 enter early

### Ownership States

```txt
Scene 03 visible ownership
→ lightweight handoff ownership
→ Scene 04 visible ownership
```

```txt
Scene 04 visible ownership
→ lightweight UX-fragment ownership
→ Scene 05 visible ownership
```

### Gate

Pass only with continuous boundary clips proving no occlusion, dead gap, duplicate object, black plane, or premature scene content.

```txt
S04-P05 LOCK — Incoming and outgoing transition contracts approved.
```

---

## S04-P06 — Project Capsule Structural Architecture

> **Controlled Refactor Impact:** The reusable capsule/frame architecture remains protected and becomes the physical foundation for each project screen. RF02 must not replace it unless RF01 proves a specific incompatibility.

### Goal

Build or extend one reusable project capsule without final content or polish.

### Required States

```txt
Dormant
→ Approaching
→ Active
→ Inspecting
→ Proof
→ Hero
→ Extracting
→ Leaving
```

### Structural Elements

- physical frame
- project preview surface
- internal depth structure
- proof-layer anchors
- outcome anchor
- UX extraction anchor

### Rules

- all projects use one reusable architecture
- project instances are data-driven
- no duplicate project markup
- only one project owns high-detail rendering
- inactive capsules use minimal geometry/materials
- forward and reverse scroll must both work
- frame and content move as one stable construction

### Gate

Validate dimensions, nesting, frame alignment, opening motion, depth, text-safe regions, and active/inactive transitions using placeholders.

```txt
S04-P06 LOCK — Reusable project capsule architecture approved.
```

---

## S04-P07 — Project Motion and State Choreography

> **Controlled Refactor Impact:** Existing reversible state and extraction motion remain reusable. RF02 adds one ring-level active-screen resolver and project-to-project progression without creating competing per-screen timelines.

### Goal

Implement and validate project movement without real UI content or final materials.

### Motion Sequence

```txt
Project seed arrives
→ connected screen ring activates
→ first screen identity resolves
→ active screen opens and proves its project
→ ring advances to the next verified project
→ one screen at a time owns readable proof
→ final project screen stabilizes
→ UX fragment extracts
```

### Motion Rules

- every motion must serve the story
- project and camera motion must cooperate
- no simultaneous over-animation
- no violent rotation
- no full explosion of layers
- no independent text movement
- no abrupt teleport
- reverse scroll must restore earlier states correctly

### Gate

Pass only after forward, reverse, slow-scroll, and fast-scroll stress clips show no duplicated, stuck, or conflicting states.

```txt
S04-P07 LOCK — Project state choreography approved.
```

---

## S04-P08 — UI/UX and Project Content Architecture

> **Controlled Refactor Override:** The verified content audit, typed project data, truthfulness rules, accessibility semantics, and content hierarchy remain locked. The external cinematic HUD, fixed left-side profile layout, and single permanent hero-project ownership are superseded by S04-RF01 through S04-RF03. Project content must move inside its owning screen.

### Goal

Design the information experience only after camera, composition, and motion are locked.

### User Questions

Scene 04 must answer in this order:

```txt
What is this project?
What problem did it solve?
What did I build?
What proves the result?
What can I inspect next?
```

### Content Hierarchy

#### Level 1 — Identity

- project name
- project category
- visual preview

#### Level 2 — Understanding

- concise challenge
- user contribution
- core system or approach

#### Level 3 — Proof

- verified outcome
- proof point
- relevant action

#### Level 4 — Supporting Detail

- technology stack
- architecture labels
- supporting metrics
- secondary implementation details

### Content Rules

- no fabricated outcomes
- no placeholder claims
- no technical wall of text
- no four equal information sections visible together
- no oversized technology list
- contribution and outcome remain primary
- all project content must use verified data

### Embedded Project-Screen Layout — Refactor Override

```txt
Inside active screen:
Project identity
Concise challenge
Contribution / built system
Verified proof and outcome

Around active screen:
Previous and next connected project screens at reduced detail

Outside screens:
No detached cinematic project-profile HUD
```

### Text Stability Rules

- text must not move independently from its owned surface
- no duplicate overlapping text states
- no same-depth opacity crossfades
- prevent z-fighting
- protect frame-safe margins
- preserve readable perspective
- text-heavy states occur only when camera movement is restrained

### Gate

Pass only when the active project screen is obvious, information order is understandable inside the owning screen, text is stable, and no screen/frame/content collision exists.

```txt
S04-P08 LOCK — UI/UX hierarchy and verified content architecture approved.
```

---

## S04-P09 — Integrated Greybox Experience

> **Controlled Refactor Impact:** P09 remains the integrated runtime baseline for camera, lifecycle, transitions, direct seek, reverse scroll, and debug evidence. Its Model A single-hero presentation is superseded; RF03 must re-run the same integration matrix against the connected project-screen ring.

### Goal

Combine all locked structural systems before final styling.

### Included

- final camera path
- spatial layout
- capsule structure
- state choreography
- placeholder project content
- embedded project-screen content placeholders
- incoming handoff
- outgoing UX extraction
- render ownership
- basic interaction states

### Excluded

- final materials
- final colors
- complex lighting
- particles
- decorative effects
- final typography treatment

### Critical Gate

No visual polish may start if any of these remain:

- camera problem
- layout overlap
- unclear active project
- text instability
- broken reverse scroll
- scene overlap
- project-state conflict
- excessive group architecture
- performance collapse

```txt
S04-P09 LOCK — Complete unstyled Scene 04 experience approved.
```

---

## S04-P10 — Materials, Lighting, and Visual Language

> **Controlled Refactor Impact:** The dark/cyan/gold visual language, material families, lighting hierarchy, and transition continuity remain reusable. RF02 must bind active treatment to the current screen, reduce inactive screens, and prevent all screens from receiving active proof/outcome emphasis simultaneously.

### Goal

Apply final visual identity only after the complete experience works correctly.

### Continuity with Scene 03

Preserve:

- dark cinematic environment
- cyan structural language
- gold proof/outcome emphasis
- precise geometric lines
- restrained glow

Differentiate Scene 04 through:

- deeper architectural space
- directional lighting
- stronger active-project spotlight
- cooler inactive capsules
- gold limited to active proof and outcome

### Material Rules

- active project gets the strongest detail
- inactive projects remain restrained
- no black-on-black information loss
- no oversized opaque planes
- avoid excessive transparent overlap
- avoid full-screen glass layers
- avoid materials with no narrative value

### Lighting Rules

Lighting should separate:

- active project
- inactive gallery
- proof layers
- outcome marker
- incoming/outgoing paths

Lighting must not:

- hide text
- flatten depth
- overpower content
- create shimmer
- create unreadable bloom

### Gate

Pass only after visual QA confirms hierarchy, contrast, material stability, readable text, and no unexplained dark geometry.

```txt
S04-P10 LOCK — Materials, lighting, and visual language approved.
```

---

## S04-P11 — Pointer Interaction and Micro-Motion

> **Controlled Refactor Impact:** The shared pointer source and bounded additive authority remain reusable. RF02 must rebind capsule parallax to the active screen/ring owner only. Pointer must not independently rotate the ring, change the active project, or affect the Scene 05 transfer anchor.

### Goal

Add subtle physical presence using the existing shared pointer system.

### Authority

```txt
Scroll = primary narrative authority
Pointer = small additive depth response
```

### Allowed

- small camera-target offset
- restrained active-screen parallax
- subtle active-screen depth separation
- light highlight response
- small environmental counter-motion

### Forbidden

- free orbit
- large project rotation
- individual text motion
- duplicate pointer listeners
- React state updates on every pointer event
- movement that changes the locked composition
- movement that reintroduces text shimmer

### Accessibility

- desktop pointer: enabled subtly
- touch/mobile: disabled or simplified
- reduced motion: disabled
- low-performance fallback: disabled

### Gate

Pass only when labels remain stable, the composition remains locked, pointer leave returns smoothly to neutral, and FPS does not regress.

```txt
S04-P11 LOCK — Pointer response and micro-motion approved.
```

---

## S04-RF01 — Connected Screen Ring Discovery and Refactor Contract

### Goal

Lock the exact multi-screen presentation model before changing production behavior.

### Required Discovery

Inspect and classify:

- current `Scene04HUD` ownership and removal path
- existing screen/capsule instances and connection geometry
- current project count in verified `projectData`
- current active-project resolver
- camera compatibility with three connected project screens
- material/light ownership that can move with the active screen
- pointer ownership that can move with the active screen
- Scene 03 receiving screen and Scene 05 extraction source
- desktop, tablet, mobile, reduced-motion, and fallback paths

### Decisions to Lock

- three screens initially because three verified project records currently exist
- architecture may support a fourth screen without rendering one until verified data exists
- ring center, radius, angle order, screen orientation, and connection path
- project order and scroll segmentation
- active, previous, next, and hidden screen states
- content density inside each screen
- exact removal/unmount path for the external cinematic HUD
- camera reuse versus smallest required adjustment
- final project screen that owns UX extraction
- reverse-scroll and direct-seek behavior
- responsive and reduced-motion equivalents

### Deliverables

- reuse/replace matrix
- current and proposed scene graphs
- ring layout table for all viewports
- project-to-screen mapping
- scroll-segmentation contract
- content-inside-screen contract
- camera compatibility table
- transition ownership table
- performance budget and risk register

### Gate

Pass only when the refactor can be implemented without ambiguity and every preserved lock, superseded contract, responsive branch, and boundary owner is explicit.

```txt
S04-RF01 LOCK — Connected project-screen ring and refactor boundaries approved.
```

---

## S04-RF02 — Scroll-Driven Multi-Project Screen Ring Implementation

### Goal

Implement the approved connected screen ring while preserving the accepted Scene 04 foundation.

### Required Implementation

- remove `Scene04HUD` from the normal cinematic Scene 04 path
- keep reduced-motion accessible cards/tabs as the non-cinematic alternative
- generate screens from verified project data rather than duplicated JSX
- one screen owns one project
- render three verified project screens initially
- support a fourth data-driven screen without inventing a fourth project
- place project title, concise challenge, contribution, proof, and verified outcome inside the owning screen
- create one central active-screen/ring resolver driven by Scene 04 local progress
- rotate, advance, or re-index the ring through deterministic scroll segments
- keep one active high-detail screen at a time
- reduce previous and next screens to contextual detail
- freeze or unmount nonessential screens
- bind active materials, lighting, pointer response, and proof emphasis to the active screen
- preserve Scene 03 incoming ownership
- extract the Scene 05 UX fragment from the final active project screen
- preserve exact responsive transfer anchors

### Scroll Behavior

```txt
Arrival / ring reveal
→ Project 01 active
→ connected transition to Project 02
→ connected transition to Project 03
→ optional Project 04 only when verified data exists
→ final-project proof
→ UX extraction
```

RF01 owns the exact numeric segmentation. RF02 must not duplicate progress calculations across screens.

### Responsive Behavior

- desktop: complete ring depth and connected-screen choreography
- tablet: reduced ring radius/depth and fewer visible supporting surfaces
- mobile: one active screen with partial adjacent-screen cues or a simplified vertical/arc sequence; no desktop ring assumption
- reduced motion: static accessible project selector/cards, no ring rotation, no extraction travel

### Forbidden

- rebuilding the scene from zero
- creating a new camera, scroll store, pointer store, transition manager, or project-data source
- restoring an external profile HUD
- rendering all project details simultaneously
- introducing unverified projects, screenshots, metrics, links, or outcomes
- changing Scene 03 or Scene 05 beyond a narrow source-proven handoff correction

### Gate

Pass only when the three verified projects are visible as connected screens, scroll deterministically changes the active project, all content is owned by its screen, and prior camera/transition/material/pointer contracts remain valid or receive explicitly approved minimal adjustments.

```txt
S04-RF02 PASS — Connected project-screen ring implemented.
```

---

## S04-RF03 — Integrated Refactor QA, Regression Fixes, and Lock

### Goal

Validate and fix the complete refactored Scene 04 before resuming P12.

### Required QA

Validate:

- full forward, reverse, slow, fast, and direct-seek scroll
- every project-to-project transition
- ring order and active-project determinism
- one high-detail screen only
- no external cinematic HUD or residual HUD lifecycle
- text readability inside every active screen
- screen/frame/content alignment and z-fighting
- camera composition and clipping across all project segments
- materials, lighting, and pointer rebinding to the active screen
- Scene 03 incoming continuity
- final-screen Scene 05 extraction continuity
- desktop, tablet, mobile, reduced-motion, and low-performance paths
- resize, blur, pointer leave, scene exit, and reverse return
- lifecycle, unmounting, draw calls, triangles, update loops, and console state

### Required Viewports

```txt
1440×900
1280×720
1024×768
430×932
390×844
375×667
Reduced motion
Low-performance fallback
```

### Regression Rule

RF03 must compare the refactor against all preserved P00–P11 locks. A changed result is acceptable only when it is explicitly listed as a superseded presentation contract in this file.

### Gate

Fail for:

- HUD residue
- wrong project on a screen
- two active projects
- flat-card/carousel appearance
- broken camera or boundary
- unreadable embedded project content
- reverse-scroll mismatch
- mobile ring collision
- reduced-motion failure
- performance or lifecycle regression
- missing evidence

```txt
S04-RF03 LOCK — Connected multi-project screen ring approved and all preserved Scene 04 locks revalidated.
```

---

## S04-P12 — Responsive, Mobile, and Reduced Motion

### Goal

Create explicit compositions for non-desktop experiences.

### Required Viewports

```txt
1440×900
1280×720
1024×768
430×932
390×844
375×667
```

### Desktop

- full camera journey
- complete connected-screen ring depth
- subtle pointer response bound to the active screen
- one readable active project screen with previous/next ring context
- no external cinematic project HUD

### Tablet

- reduced environment and ring depth
- safer lateral camera offset
- simplified supporting screens
- protected embedded screen content
- reduced ring radius or angle spread where required

### Mobile

- explicit Scene 04 camera overrides
- one dominant project screen
- previous/next screen cues only when they remain safe
- connected ring may simplify to an arc, vertical sequence, or indexed screen transition
- no horizontal content collision
- project title, contribution, and outcome remain readable inside the screen or accessible static surface
- no external cinematic HUD
- no pointer parallax
- no desktop-only ring assumption

### Reduced Motion

Provide one stable accessible composition with:

- project selector or tablist for all verified projects
- one active project panel at a time
- project name
- challenge/contribution summary
- verified outcome
- verified project action only when available
- no external cinematic HUD dependency
- no ring rotation or large camera sweep
- no capsule explosion
- no pointer response
- no rapid crossfade

### Gate

Fail if desktop camera values are merely scaled down, mobile embedded content clips, an external cinematic HUD remains, connected screens cover the active project, or reduced motion remains a placeholder.

```txt
S04-P12 LOCK — Responsive, mobile, and reduced-motion experiences approved.
```

---

## S04-P13 — Performance and Cross-Scene Isolation

### Goal

Keep Scene 04 performant and prevent cross-scene overlap.

### Required Measurements

Record:

- average FPS
- minimum FPS
- draw calls
- triangles
- active text objects
- transparent surfaces
- mounted project-screen count
- active project-screen count
- high-detail project-screen count
- visible adjacent-screen count
- Scene 03 visible systems
- Scene 05 visible systems
- allocations during animation

### Targets

```txt
Preferred: 55–60 FPS
Minimum acceptable sustained: 50 FPS
No sustained checkpoint below: 45 FPS
```

### Ownership Flow

```txt
Scene 03 handoff
→ lightweight Scene 04 arrival
→ connected project-screen ring reveal
→ one active high-detail project screen
→ adjacent screens stay lightweight
→ prior screen freezes or gates down as the next activates
→ final active screen produces lightweight UX extraction
→ Scene 05 becomes visible
```

### Optimization Rules

- only one high-detail project screen
- inactive and non-adjacent screens freeze, simplify, or unmount
- no unnecessary per-frame allocations
- reusable materials and geometry
- text exists only in valid windows
- completed systems stop updating
- hidden heavy systems are render-gated
- avoid opacity-only hiding for expensive systems

### Gate

Pass only when Scene 03, Scene 04, and Scene 05 no longer intrude on one another and performance evidence meets the targets.

```txt
S04-P13 LOCK — Performance and cross-scene isolation approved.
```

---

## S04-P14 — Complete Visual and Interaction QA

### Goal

Validate Scene 04 as one finished experience.

### QA Areas

#### Narrative

- Scene 03 handoff is understandable
- gallery purpose is clear
- each connected screen clearly owns one project
- scroll progression between projects is understandable
- the final active project becomes proof
- Scene 05 handoff feels logical

#### Camera

- all seven beats are readable
- no jump
- no clipping
- reverse scroll works
- camera remains the primary storyteller

#### UI/UX

- active project screen is obvious
- project order and information order are clear
- embedded screen text is readable
- verified actions are discoverable
- no external cinematic HUD remains
- no screen-to-screen content duplication
- no frame occlusion
- no unstable text

#### Motion

- controlled ring and project-screen states
- deterministic active-screen switching
- no duplicated state
- no stuck layer
- no violent movement
- no all-elements-visible state

#### Visual Quality

- premium hierarchy
- lighting supports content
- coherent materials
- no black planes
- no unexplained shapes
- no excessive glow
- no flat-dashboard result
- no standard flat-carousel result
- connected ring remains spatially understandable

#### Interaction

- subtle pointer response
- smooth neutral return
- scroll retains authority
- interaction does not break text

#### Responsive and Accessibility

- desktop
- tablet
- mobile
- reduced motion
- low-performance fallback

#### Technical

- console errors: zero
- console warnings: reviewed
- typecheck passes
- lint passes
- production build passes
- FPS and renderer metrics pass

### Required Evidence

- full desktop forward clip
- full desktop reverse clip
- pointer-interaction clip
- mobile clip
- reduced-motion capture
- transition clips
- checkpoint screenshots
- performance table
- changed-file register

### Verdict Rules

**PASS** only when technically and visually approved.

**PASS WITH CONDITIONS** only for isolated non-blocking polish issues.

**FAIL** for:

- wrong camera experience
- unreadable project content
- scene overlap
- broken transition
- text instability
- visual clutter
- uncontrolled groups
- mobile failure
- reduced-motion failure
- sustained performance regression
- missing visual evidence

```txt
S04-P14 PASS — Complete Scene 04 visual and interaction QA approved.
```

---

## S04-P15 — Final Scene Lock and Scene 05 Handoff

### Goal

Formally lock Scene 04 and protect it from regression.

### Lock Register

Document:

- final narrative
- project order
- project-to-screen mapping
- ring center, radius, screen angles, and orientation rules
- scroll segmentation and active-screen resolver
- project-data source
- camera keyframes
- camera targets and FOV
- beat ranges
- spatial layout
- scene graph
- render ownership
- capsule states
- embedded screen UI/UX hierarchy
- confirmation that external cinematic HUD is removed
- materials and lighting
- pointer limits
- responsive compositions
- reduced-motion experience
- performance baseline
- Scene 03 incoming contract
- Scene 05 outgoing contract
- protected files
- known non-blocking limitations

### Regression Rule

All future work must preserve:

```txt
All S04 locks
+
Scene 03 → Scene 04 boundary
+
Scene 04 → Scene 05 handoff
+
Scene 04 performance baseline
```

```txt
PASS — Scene 04 Project Proof Rail is fully locked technically, visually, cinematically, responsively, and editorially. Future work must preserve all S04 locks and the Scene 04 → Scene 05 handoff contract.
```

---

# 7. Phase-Gate Policy

Every phase must follow:

```txt
Discovery
→ Plan
→ Implement only the current phase
→ Capture evidence
→ Compare against the locked target
→ Fix within the same phase
→ Lock
→ Move to the next phase
```

Do not combine phases to save time.

The controlled refactor must execute as RF01 → RF02 → RF03. Do not collapse it into one implementation ticket.

Do not start P12 or later finalization work while RF03 remains unlocked.

Do not start later visual work while an earlier structural problem remains unresolved.

## Allowed Phase Status Values

```txt
NOT STARTED
IN PROGRESS
VISUAL REVIEW
PASS WITH CONDITIONS
LOCKED
FAIL
```

---

# 8. Ticket Granularity Policy

```txt
One ticket = one visual or technical responsibility
```

Good examples:

- camera arrival
- gallery-reveal camera
- hero camera composition
- active-screen/embedded-content separation
- capsule shell
- capsule opening motion
- inactive capsule state
- project proof content
- Scene 03 incoming handoff
- Scene 05 outgoing extraction
- pointer response
- mobile camera override
- performance isolation
- RF01 connected-screen ring contract
- RF02 multi-project screen-ring implementation
- RF03 integrated refactor QA and lock

Bad example:

```txt
Build the complete Scene 04 with camera, projects, content,
materials, transitions, pointer interaction, responsive behavior,
and final QA.
```

---

# 9. Production Principle

Scene 04 must be produced through:

```txt
Imagine
→ Document
→ Greybox
→ Compare
→ Lock
→ Add motion
→ Compare
→ Lock
→ Add content
→ Compare
→ Lock
→ Add visual skin
→ Compare
→ Optimize
→ Final QA
→ Lock
```

Not through:

```txt
Imagine
→ Send one uncontrolled rebuild ticket
→ Remove accepted systems instead of reusing them
→ Allow the ring, project order, and content ownership to be interpreted during implementation
→ Repair camera, transition, mobile, and performance regressions later
```

---

# 10. Immediate Next Step

The next work sequence is:

```txt
1. Complete S04-P11-R2 authoritative Hero pointer evidence
2. S04-RF01 — Connected Screen Ring Discovery and Refactor Contract
3. S04-RF02 — Scroll-Driven Multi-Project Screen Ring Implementation
4. S04-RF03 — Integrated Refactor QA, Regression Fixes, and Lock
5. Resume S04-P12 through S04-P15
```

## Current Refactor Decision

```txt
Controlled refactor
Not a scene rebuild
Three verified project screens initially
Architecture supports a fourth verified project later
No external cinematic project HUD
Every screen owns one project
Scroll selects one active screen at a time
```

## Critical Rule

```txt
Preserve all prior locks except the explicitly superseded presentation contracts.

No external Scene 04 project-profile HUD in the normal cinematic path.

No P12 responsive finalization
No P13 performance lock
No P14 final QA
No P15 final scene lock

before S04-RF03 is visually and technically approved.
```
