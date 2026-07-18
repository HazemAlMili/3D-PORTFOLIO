# SCENE 3 PLAN — Camera-Led Product Story

## Status

Scene 03 current visual direction is **not approved yet**.

The previous attempts produced technical components, but the scene still does not tell a strong visual story.

This file is the source of truth for all future Scene 03 work.

Any agent working on Scene 03 must read this file before making changes.

---

# 1. Core Problem

Scene 03 must not be just:

```txt
dashboard
layers
labels
scan line
components
```

The user wants a real cinematic story.

The scene should make the viewer feel:

```txt
"Wow, I’m watching an idea become a real polished product."
```

Current issue:

- product hero looks too flat
- UI looks blocky/dashboard-like
- stack layers are not readable
- story is not clear
- camera is not telling the story
- changes are happening in code, but not strongly visible in the rendered UI

---

# 2. Final Scene Concept

Scene 03 should be:

```txt
From Chaos to Product
```

or:

```txt
Product Assembly Engine
```

The story:

```txt
Scene 02 capability energy
→ raw product fragments
→ magnetic assembly
→ UI/UX shell
→ full-stack depth layers
→ performance optimization
→ polished product
→ launch proof into Scene 04
```

The message:

```txt
I design, build, optimize, and ship complete digital products.
```

Not:

```txt
I follow SDLC steps.
```

Not:

```txt
Here is a random dashboard.
```

---

# 3. Main Directing Principle

The camera is the hero.

The scene content can move, but the camera must be the main storyteller.

The camera should:

- discover the product space
- move around the build
- reveal the layers
- inspect the structure
- push into the transformation
- settle into a final hero shot
- support the launch into Scene 04

The scene should feel like a product film, not a static UI demo.

---

# 4. Visual Style Reference

Scene 03 must match the same world as Scene 02.

Scene 02 visual language:

- dark navy background
- cyan/blue glow
- large cinematic hero object
- clean HUD copy
- strong negative space
- premium tech atmosphere
- few intentional lines
- no clutter
- no ugly debug paths

Scene 03 should feel like the next shot in the same film.

---

# 5. Layout Rule

Desktop layout:

```txt
LEFT:
  Product Engine HUD copy

RIGHT:
  large cinematic product transformation
```

Rules:

- HUD must not overlap the product
- product must not sit behind HUD
- leave clear negative space between HUD and product
- product must be the dominant right-side visual
- HUD supports the story but does not dominate it

Suggested desktop safe zones:

```txt
HUD:
x = 5% to 38%

Product:
x = 52% to 95%
```

Mobile layout:

```txt
TOP:
  compact HUD

CENTER:
  product transformation

BOTTOM / DEPTH:
  simplified layers and launch cue
```

---

# 6. Locked Copy

Badge:

```txt
PRODUCT ENGINE // BUILD FLOW
```

Headline:

```txt
Turning ideas into polished digital products.
```

Subtext:

```txt
Designing interfaces, connecting systems, optimizing performance, and shipping production-ready experiences.
```

HUD should be clean, smaller if necessary, and never overlap the product.

---

# 7. Scene Story Beats

Scene 03 local progress runs from `0.00` to `1.00`.

## Beat 1 — Entry / Raw Chaos

Timing:

```txt
0.00 – 0.15
```

Story:
Scene 02 energy enters Scene 03.

Visual:

- subtle energy/spark enters from Scene 02 direction
- scattered product fragments appear
- floating UI glass pieces
- blueprint shards
- abstract code/data pieces
- small nodes
- no full product yet

Meaning:

```txt
The idea exists, but it is not a product yet.
```

Camera:

- discovery angle
- slightly offset
- not perfectly frontal
- viewer feels they are entering an active build space

---

## Beat 2 — Magnetic Assembly

Timing:

```txt
0.15 – 0.35
```

Story:
Fragments are pulled into formation.

Visual:

- pieces rotate and move toward the product build area
- fragments start aligning into a product silhouette
- first strong wow moment
- motion must be scroll-derived and reversible

Meaning:

```txt
The idea is being structured into a product.
```

Camera:

- side sweep
- parallax between foreground fragments and product area
- movement reveals depth

---

## Beat 3 — Product Shell Forms

Timing:

```txt
0.35 – 0.50
```

Story:
The product UI/UX shell forms.

Visual:

- clean glass product shell appears
- premium 3D object
- visible thickness
- angled perspective
- minimal UI zones
- no rough dashboard blocks

Meaning:

```txt
The user experience is taking shape.
```

Camera:

- push-in toward assembly
- closer and more intentional framing

---

## Beat 4 — System Depth Locks In

Timing:

```txt
0.50 – 0.65
```

Story:
The product becomes full-stack.

Visual:
Visible layers behind the UI shell:

```txt
UI shell
Frontend
API
Backend
Data
```

Rules:

- layers must be separated in depth
- each layer must be readable
- no hidden stack directly behind UI
- no long helper lines
- no clutter

Meaning:

```txt
This is not just UI. It is a complete system.
```

Camera:

- elevated / semi-top inspection angle
- viewer sees how the structure locks together

---

## Beat 5 — Performance Optimization

Timing:

```txt
0.65 – 0.82
```

Story:
The system becomes optimized.

Visual:

- cinematic cyan performance wave sweeps across product
- rough blueprint fragments fade
- edges sharpen
- layers compress and align
- product becomes cleaner after the wave

Meaning:

```txt
The product is optimized and production-ready.
```

Camera:

- energetic but controlled move
- diagonal push or low-angle sweep
- this is the main wow beat

Important:
If the wave is only a moving line, it fails.

It must visibly transform the product.

---

## Beat 6 — Final Product Reveal

Timing:

```txt
0.82 – 0.92
```

Story:
The polished product is complete.

Visual:

- final product stands clean and premium
- integrated tiny status lights appear on product edge

Allowed status labels:

```txt
UX
API
DATA
PERF
READY
```

Rules:

- labels must be attached to product
- no detached PRODUCT LOCK text
- no big floating labels
- no clutter

Meaning:

```txt
The product is ready.
```

Camera:

- settle into best hero frame
- cleanest and strongest shot
- slight low-angle hero framing is encouraged

---

## Beat 7 — Launch / Proof Handoff

Timing:

```txt
0.92 – 1.00
```

Story:
The product launches proof into Scene 04.

Visual:

- final product emits proof packet
- packet exits cleanly toward Scene 04 Projects
- Scene 04 receives it
- no long ugly diagonal route line
- no helper/debug path

Meaning:

```txt
Now see the proof: projects.
```

Camera:

- hold or slightly track launch direction
- readable and stable

---

# 8. Camera Beat Map

The camera must tell the story.

## Camera Beat 1 — Discovery

```txt
0.00 – 0.14
```

Purpose:
Introduce the build space.

Camera:

- offset angle
- slight depth
- no perfect frontal shot yet

---

## Camera Beat 2 — Side Reveal

```txt
0.14 – 0.30
```

Purpose:
Reveal product fragments and assembly area.

Camera:

- lateral sweep
- side-to-center movement
- parallax is important

---

## Camera Beat 3 — Push-In Assembly

```txt
0.30 – 0.48
```

Purpose:
Bring viewer into the product assembly.

Camera:

- smooth push-in
- closer framing
- controlled tilt

---

## Camera Beat 4 — Top / Inspection Angle

```txt
0.48 – 0.62
```

Purpose:
Show system layers and structure.

Camera:

- elevated / semi-top-down angle
- not flat orthographic
- still cinematic

---

## Camera Beat 5 — Optimization Motion

```txt
0.62 – 0.80
```

Purpose:
Make optimization feel powerful.

Camera:

- dynamic diagonal push or low-angle sweep
- energized but not chaotic
- supports performance wave

---

## Camera Beat 6 — Hero Reveal

```txt
0.80 – 0.92
```

Purpose:
Show final polished product.

Camera:

- settles into best hero composition
- strongest framing in the scene

---

## Camera Beat 7 — Launch Handoff

```txt
0.92 – 1.00
```

Purpose:
Support transition to Scene 04.

Camera:

- stable
- tracks or frames launch direction
- no excessive movement

---

# 9. Product Visual Requirements

The final product object must not look like a flat dashboard.

It must look like:

```txt
a premium 3D layered digital product object
```

Required visible structure:

- top glass UI surface
- visible side thickness
- middle system layer
- backend/API layer
- data layer
- bottom infrastructure/base layer
- cyan edge glow
- subtle depth
- clean silhouette

Not allowed:

- flat rectangle
- rough dashboard mockup
- huge black bars
- oversized cyan strips
- random blocks
- noisy admin UI

---

# 10. UI Rules

Keep UI minimal.

Allowed:

- 2–3 clean UI zones
- fine cyan strokes
- subtle glass panels
- small status dots
- minimal content skeleton

Avoid:

- dense fake text
- tiny unreadable WebGL text
- big dashboard charts
- heavy dark rectangles
- too many icons
- too many bars

The UI supports the story; it is not the story.

---

# 11. Layer Rules

Stack layers must be clearly readable.

Required layers:

```txt
UI Shell
Frontend
API
Backend
Data
```

Layer behavior:

- appear one by one
- separate in depth
- active layer briefly glows
- completed layer calms down
- performance wave later aligns them

No long connectors.
No debug lines.
No random network graph.

---

# 12. Performance Wave Rules

The performance wave is the main wow moment.

Before wave:

- fragments still visible
- layers are slightly exploded
- product is still assembling

During wave:

- cyan sweep crosses product
- layers align
- rough fragments fade
- edges sharpen

After wave:

- polished final product
- cleaner silhouette
- stable production-ready state

If this does not visibly change the product, it fails.

---

# 13. Launch Handoff Rules

Handoff must be subtle and premium.

Allowed:

- small proof packet
- short output cue
- Scene 04 receiver glow

Not allowed:

- long diagonal helper line
- huge portal
- gold line across the scene
- debug-looking route

---

# 14. Mobile Rules

Mobile must simplify the story.

Mobile composition:

```txt
top HUD
center product transformation
simplified depth layers
subtle launch indication
```

Mobile must hide or reduce:

- excessive fragments
- tiny labels
- complex connectors
- deep layer clutter
- heavy wave visuals

Test:

```txt
375x667
390x844
430x932
```

---

# 15. Reduced Motion Rules

Reduced motion must show final readable composition:

```txt
final polished product
some fragments faintly settled
visible system layers
optimized state active
proof handoff indicated subtly
```

No:

- moving fragments
- sweeping wave
- moving packet
- continuous camera choreography
- pulsing/flashing

Reduced motion camera:

- calm final hero framing only

---

# 16. Performance Rules

Allowed:

- procedural planes
- boxes
- short lines
- small nodes
- simple transparent materials
- memoized geometry
- DOM HUD text

Not allowed:

- GLB assets
- postprocessing
- dense particles
- heavy shaders
- per-frame React state
- geometry creation inside useFrame
- too many transparent overlapping panels

Target:

```txt
Preferred: 55–60 FPS
Minimum: 45+ FPS
```

---

# 17. Hard Guardrails

Do not touch:

```txt
Scene01Opening
Scene02Hero
HeroCommandNode
scene02Config
HeroAtomicCore
Scene 02 layout
Scene 02 orbit system
Scene 02 copy
```

Scene 02 is visual reference only.

Do not reintroduce:

```txt
Forge nucleus
reactor rings
SDLC orbit labels
DeliveryPipeline
stage pills
random diagonal lines
debug/helper paths
```

Scene 04 handoff must remain intact.

---

# 18. Recommended Implementation Tickets

## PRODUCT-CAM-01

Camera-led narrative foundation.

Goal:
Make camera the storyteller.

Deliver:

- camera beat map
- Scene 03 camera keyframes
- smooth interpolation
- desktop/mobile/reduced motion camera rules

---

## PRODUCT-STORY-01

Raw chaos / idea fragments.

Goal:
Create early scene story.

Deliver:

- Scene 02 energy cue
- product fragments
- blueprint shards
- no full product yet

---

## PRODUCT-STORY-02

Magnetic assembly.

Goal:
Fragments assemble into product silhouette.

Deliver:

- scroll-derived assembly motion
- fragments snapping into position
- first wow moment

---

## PRODUCT-STORY-03

Premium product shell rebuild.

Goal:
Replace flat dashboard look.

Deliver:

- glass product shell
- visible thickness
- clean 3D layered product object
- no heavy dashboard bars

---

## PRODUCT-STORY-04

Full-stack depth reveal.

Goal:
Show system depth.

Deliver:

- Frontend / API / Backend / Data depth layers
- readable layer separation
- active/completed states

---

## PRODUCT-STORY-05

Optimization wave.

Goal:
Main wow transformation.

Deliver:

- product cleanup
- layer alignment
- edge sharpening
- fragments fade
- final polish

---

## PRODUCT-STORY-06

Final reveal and launch.

Goal:
Payoff and Scene 04 handoff.

Deliver:

- polished final product
- integrated status indicators
- proof packet
- Scene 04 receiver

---

## PRODUCT-STORY-07

Mobile / reduced motion / performance QA.

Goal:
Verify responsive and accessibility quality.

---

## PRODUCT-STORY-08

Final visual lock.

Goal:
Only lock after screenshots prove story and wow factor.

---

# 19. Mandatory Visual QA

No ticket can pass based only on:

```txt
typecheck pass
lint pass
build pass
files changed
components created
```

Screenshots are mandatory for visual tickets.

Required screenshots for final lock:

1. Scene 02 reference
2. Scene 03 entry / fragments
3. magnetic assembly
4. product shell forming
5. system layers visible
6. performance wave transformation
7. final polished product
8. launch handoff
9. mobile
10. reduced motion

Each screenshot must answer:

```txt
Where is the story?
What changed from previous beat?
Does it look cinematic?
Does it create wow factor?
Is the HUD separate from product?
Is the product clearly 3D?
```

---

# 20. Definition of Done

Scene 03 is done only when:

```txt
1. It tells a visible story.
2. Camera leads the viewer through that story.
3. HUD and product are separated.
4. Product looks premium and 3D.
5. Fragments visibly assemble.
6. Full-stack layers are readable.
7. Performance wave visibly transforms the product.
8. Final reveal feels like payoff.
9. Launch into Scene 04 works.
10. Scene 02 remains untouched.
11. Mobile is clean.
12. Reduced motion is complete.
13. FPS is acceptable.
14. typecheck/lint/build pass.
15. screenshots prove the result.
```

Final target feeling:

```txt
Wow. I’m watching an idea become a polished product.
```

===============

# SCENE 3 PHASES — Camera-Led Product Story Roadmap

## Goal

Scene 03 must become a cinematic story, not just UI/components.

Final feeling:

```txt
Wow. I’m watching an idea become a polished product.
```

Core story:

```txt
Scene 02 energy
→ raw fragments
→ magnetic assembly
→ product shell
→ full-stack layers
→ optimization
→ final reveal
→ launch proof into Scene 04
```

---

# PHASE 0 — Scene 3 Plan Lock

## Purpose

Lock the creative direction before any new implementation.

## What it does

- Defines the final story.
- Defines the camera-led principle.
- Defines visual style.
- Defines what is allowed and forbidden.
- Defines final acceptance criteria.

## Output

```txt
SCENE_3_PLAN.md
```

## Success

Agent always refers to this plan before working on Scene 03.

---

# PHASE 1 — Camera Narrative Foundation

## Ticket

```txt
PRODUCT-CAM-01
```

## Purpose

Make the camera the storyteller.

## What it does

- Builds Scene 03 camera beat map.
- Adds cinematic camera movement across local progress.
- Creates discovery, side sweep, push-in, top inspection, optimization move, hero reveal, and launch framing.
- Ensures camera movement feels intentional, not random.

## Story value

Even if the scene object is simple, the camera starts creating drama and direction.

## Output

- Scene 03 camera keyframes.
- Smooth interpolation.
- Desktop camera path.
- Mobile simplified path.
- Reduced-motion static framing.

## Success

Scene 03 no longer feels like a static screen.  
The camera is visibly guiding the viewer.

---

# PHASE 2 — Raw Idea / Chaos Entry

## Ticket

```txt
PRODUCT-STORY-01
```

## Purpose

Create the beginning of the story.

## What it does

- Scene 02 energy enters Scene 03.
- Raw idea fragments appear.
- UI shards, blueprint pieces, code/data fragments, and nodes float in space.
- No complete product yet.

## Story value

The viewer understands:

```txt
There is an idea, but it is still raw and unbuilt.
```

## Output

- `ProductIdeaFragments`
- Scene 02 continuity cue
- Early chaos state

## Success

The first beat feels like the start of a build story, not a dashboard suddenly appearing.

---

# PHASE 3 — Magnetic Assembly

## Ticket

```txt
PRODUCT-STORY-02
```

## Purpose

Turn chaos into structure.

## What it does

- Fragments move toward the product build area.
- Pieces rotate, align, and snap into place.
- A rough product silhouette starts forming.
- Motion is scroll-driven and reversible.

## Story value

The viewer understands:

```txt
The idea is being structured into a product.
```

## Output

- Assembly motion logic.
- Fragment target positions.
- First wow assembly moment.

## Success

The viewer can clearly see pieces becoming one product shape.

---

# PHASE 4 — Premium Product Shell Rebuild

## Ticket

```txt
PRODUCT-STORY-03
```

## Purpose

Replace the flat dashboard look.

## What it does

- Builds the final product shell as a premium 3D object.
- Adds visible thickness and depth.
- Creates a glass UI surface.
- Removes heavy dashboard bars and blocky shapes.
- Keeps UI minimal and cinematic.

## Story value

The viewer understands:

```txt
The product experience is taking shape.
```

## Output

- `ProductGlassProductShell`
- Clean product silhouette.
- Minimal UI zones.
- Better right-side hero object.

## Success

The product no longer looks like a flat dashboard.  
It looks like a cinematic 3D digital product.

---

# PHASE 5 — Full-Stack Depth Reveal

## Ticket

```txt
PRODUCT-STORY-04
```

## Purpose

Show that the product is not just UI.

## What it does

Reveals clear system layers:

```txt
UI Shell
Frontend
API
Backend
Data
```

Each layer:

- appears in order
- separates in depth
- has active focus
- then settles as completed

## Story value

The viewer understands:

```txt
This is a complete full-stack system.
```

## Output

- `ProductSystemDepthLayers`
- Layer active/completed states.
- Depth separation.
- Clean short connectors only if needed.

## Success

The viewer can visually read the product layers without needing labels everywhere.

---

# PHASE 6 — Performance Optimization Wave

## Ticket

```txt
PRODUCT-STORY-05
```

## Purpose

Create the main wow transformation.

## What it does

- A cyan performance wave sweeps across the product.
- Rough fragments fade down.
- Edges sharpen.
- Layers compress and align.
- The product becomes visibly cleaner and more polished.

## Story value

The viewer understands:

```txt
The product has been optimized and made production-ready.
```

## Output

- `ProductOptimizationWave`
- Layer alignment animation.
- Fragment cleanup.
- Edge sharpening.
- Final polished state preparation.

## Success

The wave is not just a moving line.  
It visibly transforms the product.

---

# PHASE 7 — Final Product Reveal

## Ticket

```txt
PRODUCT-STORY-06A
```

## Purpose

Deliver the payoff shot.

## What it does

- Camera settles into the strongest hero angle.
- Final product stands clean and premium.
- Integrated tiny status lights appear:

```txt
UX
API
DATA
PERF
READY
```

## Story value

The viewer understands:

```txt
The product is complete.
```

## Output

- Final product state.
- Integrated readiness indicators.
- Clean hero composition.

## Success

This should be the screenshot where the user says:

```txt
ده بقى شكل product محترم.
```

---

# PHASE 8 — Launch / Proof Handoff

## Ticket

```txt
PRODUCT-STORY-06B
```

## Purpose

Connect Scene 03 to Scene 04.

## What it does

- Final product emits a proof packet.
- Packet exits from a clean output point.
- Scene 04 receives it.
- No ugly diagonal helper line.
- No debug-looking route.

## Story value

The viewer understands:

```txt
The product is ready. Now see the proof in the projects.
```

## Output

- `ProductLaunchHandoff`
- Scene 04 receiver cue.
- Subtle proof packet.

## Success

Scene 03 ends naturally and leads into Scene 04.

---

# PHASE 9 — Mobile / Reduced Motion / Performance QA

## Ticket

```txt
PRODUCT-STORY-07
```

## Purpose

Make sure the scene works everywhere.

## What it does

Tests:

```txt
desktop
mobile 375x667
mobile 390x844
mobile 430x932
reduced motion
reverse scroll
FPS
console
```

Mobile simplification:

- fewer fragments
- fewer layers
- no tiny labels
- simplified camera path
- compact HUD

Reduced motion:

- no cinematic camera choreography
- no moving fragments
- no sweeping wave
- final clean static composition

## Output

- QA report.
- Screenshots.
- Fixes if needed.

## Success

Scene 03 works cleanly on all required states.

---

# PHASE 10 — Final Visual Lock

## Ticket

```txt
PRODUCT-STORY-08
```

## Purpose

Lock Scene 03 only after visual proof.

## What it does

- Documents final implementation.
- Archives screenshots.
- Confirms Scene 02 untouched.
- Confirms Scene 04 handoff intact.
- Confirms mobile and reduced motion.
- Confirms build and FPS.

## Output

```txt
docs/portfolio-3d/scene03-final-visual-lock.md
```

## Success

Scene 03 becomes locked and should not be reopened unless there is a real bug.

---

# Execution Order

```txt
PHASE 0  — Plan Lock
PHASE 1  — Camera Narrative Foundation
PHASE 2  — Raw Idea / Chaos Entry
PHASE 3  — Magnetic Assembly
PHASE 4  — Premium Product Shell Rebuild
PHASE 5  — Full-Stack Depth Reveal
PHASE 6  — Performance Optimization Wave
PHASE 7  — Final Product Reveal
PHASE 8  — Launch / Proof Handoff
PHASE 9  — Mobile / Reduced Motion / Performance QA
PHASE 10 — Final Visual Lock
```

---

# Important Rule

No phase passes only because:

```txt
typecheck passed
lint passed
build passed
files changed
components created
```

For visual phases, screenshots are mandatory.

Every visual phase must answer:

```txt
Where is the story?
What changed from the previous beat?
Does it look cinematic?
Does it create wow factor?
Is the camera helping the story?
Is the product clearly premium and 3D?
```

---

# Final Definition of Done

Scene 03 is complete only when:

```txt
1. The story is visible.
2. The camera leads the viewer.
3. The product is not a flat dashboard.
4. Fragments assemble into a product.
5. Full-stack layers are readable.
6. Optimization wave visibly transforms the product.
7. Final reveal feels like payoff.
8. Launch to Scene 04 works.
9. Scene 02 remains untouched.
10. Mobile is clean.
11. Reduced motion is calm and complete.
12. FPS is acceptable.
13. Screenshots prove the result.
```
