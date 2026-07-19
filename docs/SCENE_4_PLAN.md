# Scene 04 — Project Proof Rail
## Production Blueprint and Phase-Gated Implementation Plan

> **Status:** Planning only  
> **Purpose:** Define exactly how Scene 04 should be designed and implemented before any detailed build starts.  
> **Source of truth:** This file should be placed in the project root or `/docs` and preserved throughout Scene 04 development.

---

# 1. Scene Identity

## Working Name

**Scene 04 — Project Proof Rail / From Product to Proof**

## Narrative Position

Scene 03 ends with a product reaching:

```txt
READY
→ HANDOFF
```

Scene 04 receives that finished product and turns it into visible project proof:

```txt
HANDOFF
→ PROJECT
→ INSPECTION
→ PROCESS
→ PROOF
→ OUTCOME
→ UX EXTRACTION
```

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

The project cards, HUD, text, and environment must be built around the locked camera journey.

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

## Project Proof Rail with Gallery/Vault Atmosphere

Scene 04 should contain:

- one curved or guided proof rail
- one dominant active project capsule
- one secondary project capsule in depth
- one distant project capsule or silhouette
- a restrained architectural gallery environment
- one incoming Scene 03 handoff element
- one outgoing UX extraction element

## Visual Target

```txt
A cinematic architectural project gallery
where completed products become inspectable proof.
```

## Visual Anti-Target

Scene 04 must not become:

- a flat project-card grid
- a standard carousel
- floating browser windows
- a generic dashboard
- a GitHub repository viewer
- random holographic panels
- many disconnected groups
- every project open at the same time
- a scene where all text, layers, effects, and projects are visible together

## Active Detail Rule

At any moment:

```txt
One project = high detail
Supporting projects = low detail
Distant projects = silhouette or minimal geometry
```

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
S04-P00 — Current-State Discovery and Reuse Audit
S04-P01 — Narrative and Visual Direction Lock
S04-P02 — Camera Shot Bible
S04-P03 — Spatial Composition and Greybox
S04-P04 — Scene Graph and Render Ownership Contract
S04-P05 — Incoming and Outgoing Transition Blueprint
S04-P06 — Project Capsule Structural Architecture
S04-P07 — Project Motion and State Choreography
S04-P08 — UI/UX and Project Content Architecture
S04-P09 — Integrated Greybox Experience
S04-P10 — Materials, Lighting, and Visual Language
S04-P11 — Pointer Interaction and Micro-Motion
S04-P12 — Responsive, Mobile, and Reduced Motion
S04-P13 — Performance and Cross-Scene Isolation
S04-P14 — Complete Visual and Interaction QA
S04-P15 — Final Scene Lock and Scene 05 Handoff
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
- number of visible project capsules
- active versus inactive project behavior
- gallery atmosphere
- cyan/gold usage
- incoming handoff meaning
- outgoing UX-fragment meaning
- project presentation language

### Locked Narrative

```txt
Receive completed product
→ reveal project gallery
→ activate one project
→ inspect its implementation
→ reveal proof and outcome
→ extract UX surface
→ enter Scene 05
```

### Initial Visible Project Count

```txt
1 active project
1 secondary project
1 distant project
```

The final number may change only after real project data is audited.

### Gate

Pass only when the scene can be described in one clear sentence and cannot be confused with a card grid or generic carousel.

```txt
S04-P01 LOCK — Narrative and visual direction approved.
```

---

## S04-P02 — Camera Shot Bible

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

- HUD
- detailed project content
- full gallery

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
- active capsule silhouette
- supporting capsules in depth

---

### Beat 03 — Project Establishment

**Approximate range:** `0.27–0.42`

**Camera role:** Establish the active project as the main subject.

Preferred framing:

- active project center-right
- protected left negative space
- cinematic three-quarter angle
- visible physical depth
- no HUD collision

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

Composition:

```txt
Left:
HUD / proof summary

Center-left:
Protected breathing space

Center-right:
Active project

Background:
Restrained supporting projects
```

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
- HUD state
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

### Goal

Build only the minimum geometry required to validate the locked camera.

### Greybox Scope

Create or reuse only:

- Scene 04 root
- proof rail placeholder
- active capsule placeholder
- secondary capsule placeholder
- distant capsule placeholder
- HUD placeholder
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

### Desktop Composition Guide

```txt
Left HUD lane: 30–34%
Protected gap: 8–12%
Right project lane: 54–60%
```

These are calibration guides, not mandatory CSS percentages.

### Required Safe Zones

- HUD safe zone
- active-project safe zone
- project-text safe zone
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

### Goal

Define the smallest controlled component/group structure.

### Preliminary Scene Graph

```txt
Scene04Root
├── ProofRail
├── ProjectCapsuleCollection
│   ├── ActiveProjectCapsule
│   ├── SecondaryProjectCapsule
│   └── DistantProjectCapsule
├── IncomingHandoff
├── OutgoingUXFragment
└── Scene04Lighting
```

### Preliminary Project Capsule

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
0.27–0.42  Active project identity owns the frame
0.42–0.60  Capsule inspection owns the frame
0.60–0.74  Project proof owns the frame
0.74–0.88  Hero project composition owns the frame
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
→ first project capsule activates
```

Must not:

- create dead air
- show both full scenes together
- let Scene 04 cover Scene 03
- create a disconnected opening

### Outgoing Contract

```txt
Active project proof
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

### Goal

Implement and validate project movement without real UI content or final materials.

### Motion Sequence

```txt
Project seed arrives
→ capsule activates
→ identity surface resolves
→ capsule opens
→ implementation layers separate
→ proof region stabilizes
→ hero composition locks
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

### Hero UI Layout

```txt
Left:
Concise project HUD / proof summary

Center:
Protected gap

Center-right:
Active project preview and structural proof

Background:
Restrained supporting projects
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

Pass only when the active project is obvious, information order is understandable, text is stable, and no HUD or frame collision exists.

```txt
S04-P08 LOCK — UI/UX hierarchy and verified content architecture approved.
```

---

## S04-P09 — Integrated Greybox Experience

### Goal

Combine all locked structural systems before final styling.

### Included

- final camera path
- spatial layout
- capsule structure
- state choreography
- placeholder project content
- placeholder HUD
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

### Goal

Add subtle physical presence using the existing shared pointer system.

### Authority

```txt
Scroll = primary narrative authority
Pointer = small additive depth response
```

### Allowed

- small camera-target offset
- restrained capsule parallax
- subtle depth separation
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
- complete gallery depth
- subtle pointer response
- left HUD / right project composition

### Tablet

- reduced environment depth
- safer lateral camera offset
- simplified supporting capsules
- protected text and HUD layout

### Mobile

- explicit Scene 04 camera overrides
- one dominant project
- supporting capsules minimized or removed
- no horizontal content collision
- HUD may stack or separate
- project title and outcome remain readable
- no pointer parallax
- no desktop-only geometry assumption

### Reduced Motion

Provide one stable composition with:

- active project
- project name
- challenge/contribution summary
- verified outcome
- project action
- no large camera sweep
- no capsule explosion
- no pointer response
- no rapid crossfade

### Gate

Fail if desktop camera values are merely scaled down, mobile text clips, the HUD covers the project, or reduced motion remains a placeholder.

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
- active capsule count
- high-detail capsule count
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
→ one active high-detail project
→ inactive projects stay lightweight
→ nonessential Scene 04 systems gate down
→ lightweight UX extraction
→ Scene 05 becomes visible
```

### Optimization Rules

- only one high-detail capsule
- inactive capsules freeze or simplify
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
- active project becomes proof
- Scene 05 handoff feels logical

#### Camera

- all seven beats are readable
- no jump
- no clipping
- reverse scroll works
- camera remains the primary storyteller

#### UI/UX

- active project is obvious
- information order is clear
- text is readable
- actions are discoverable
- no HUD collision
- no frame occlusion
- no unstable text

#### Motion

- controlled project states
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
- project-data source
- camera keyframes
- camera targets and FOV
- beat ranges
- spatial layout
- scene graph
- render ownership
- capsule states
- UI/UX hierarchy
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
- HUD/project separation
- capsule shell
- capsule opening motion
- inactive capsule state
- project proof content
- Scene 03 incoming handoff
- Scene 05 outgoing extraction
- pointer response
- mobile camera override
- performance isolation

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
→ Send one large implementation ticket
→ Allow interpretation during implementation
→ Repair many visual and architectural regressions later
```

---

# 10. Immediate Next Step

The first phase to execute is:

```txt
S04-P00 — Current-State Discovery and Reuse Audit
```

Then:

```txt
S04-P01 — Narrative and Visual Direction Lock
S04-P02 — Camera Shot Bible
S04-P03 — Spatial Composition and Greybox
```

## Critical Rule

```txt
No final Project Capsule
No real project content
No final materials
No decorative effects

before S04-P02 and S04-P03 are visually approved and locked.
```
