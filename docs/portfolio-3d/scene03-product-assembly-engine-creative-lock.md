# Scene 03: Product Assembly Engine — Creative Lock (PRODUCT-00)

## 1. Why the Forge Direction Was Rejected

The System Forge direction was rejected for the following visual and narrative reasons:

- **Too abstract.** The forge nucleus/rings system did not clearly communicate what the developer actually *does*. A viewer unfamiliar with software engineering could not decode what was being "forged."
- **Wrong story.** The scene became about *process* (SDLC stages, pipeline steps) instead of *output* (a real digital product).
- **Clutter over wow.** Multiple attempts to enlarge and recompose the forge object added rings, orbits, and nodes without producing a strong hero visual moment.
- **Narrative break.** Scene 02 ends with capabilities. Scene 03 needs to show those capabilities becoming a product. An abstract reactor core did not bridge that story.
- **No product identity.** UI/UX, performance, full-stack delivery, and shipping — the developer's real value — were invisible in the Forge visual.

---

## 2. Final Scene Title

```
Scene 03 — Product Assembly Engine
```

---

## 3. Final Product-Engine Concept

Scene 03 answers the question:

> How does this developer turn capabilities into a polished digital product?

The scene shows a cinematic, scroll-driven product being designed, assembled, optimized, and launched — entirely as a 3D procedural object. The viewer immediately understands:

```
I design, build, optimize, and ship complete digital products.
```

The hero visual is a **large floating digital product interface** — a 3D layered product shell that looks like a real SaaS or web application being assembled in real time.

---

## 4. Final Copy

### Badge
```
PRODUCT ENGINE // BUILD FLOW
```

### Headline
```
Turning ideas into polished digital products.
```

### Subtext
```
Designing interfaces, connecting systems, optimizing performance, and shipping production-ready experiences.
```

---

## 5. Final Story Beats & Timing

| Progress | Beat | Meaning | Key Visual |
|---|---|---|---|
| `0.00 – 0.12` | **Idea Spark Entry** | Capabilities from Scene 02 become a product | Small cyan/gold spark enters from Scene 02 direction |
| `0.12 – 0.28` | **Wireframe Product Appears** | Product concept is taking shape | Large floating interface wireframe — header, sidebar, content structure |
| `0.28 – 0.44` | **UI/UX Glass Interface** | Experience and interface are being shaped | Wireframe transforms into premium glass UI shell with cyan edges |
| `0.44 – 0.60` | **Full-Stack Layer Reveal** | Product has real system depth | 3D stacked layers behind the interface: Frontend → API → Backend → Data |
| `0.60 – 0.74` | **Performance Optimization Wave** | Product becomes optimized and production-ready | Cyan wave sweeps across product, edges sharpen, layers align |
| `0.74 – 0.88` | **Product Lock / Quality Pass** | System is complete and ready | Interface stabilized; minimal indicators: UX / API / DATA / PERF / READY |
| `0.88 – 1.00` | **Launch / Proof Handoff** | Finished product releases proof into Scene 04 | Output point → small proof packet → clean Scene 04 receiver |

---

## 6. Final Layout Direction

Following the same broad visual grammar as Scene 02:

```
LEFT:
  Floating HUD copy
  - Badge: PRODUCT ENGINE // BUILD FLOW
  - Headline: Turning ideas into polished digital products.
  - Subtext: Designing interfaces...

RIGHT:
  Large floating digital product object
  - product interface hero
  - full-stack depth layers
  - performance optimization wave
  - proof handoff vector
```

**Do not reverse this layout.** Scene 02 established left-text + right-large-hero-object rhythm. Scene 03 must continue it.

---

## 7. Visual Style Lock from Scene 02

Scene 03 borrows the following visual principles from the approved Scene 02 look:

| Principle | Scene 02 Example | Scene 03 Application |
|---|---|---|
| Dark navy background | `#060E18` / `#0A1828` | Same palette |
| Cyan technical glow | `#38D6FF` orbit lines | Product interface edges, optimization wave |
| Large right-side hero | Command Node sphere | Product interface shell |
| Left-side premium HUD | Capability copy | Product Engine copy |
| Few clean connection lines | Capability routes | Full-stack layer connectors |
| Controlled gold accent | Deployment release | Launch handoff vector |
| Smooth scroll-driven motion | Orbital rotation | Product assembly sequence |
| Glossy material feeling | `meshStandardMaterial` with low roughness | Product glass panels |

---

## 8. Reusable Forge Utilities

The following patterns from the Forge implementation may be safely reused:

- **Scroll progress helpers** — `localProgress`, timing windows
- **Opacity guard pattern** — `if (localProgress <= 0.0 || opacity <= 0.01) return null`
- **Mobile detection** — `isMobileDevice()` from `mobileUtils`
- **Reduced motion guard** — `reducedMotion ? 1.0 : Math.max(0, Math.min(1, ...))`
- **Scene isolation boundary** — `localProgress <= 0.0` hard gate
- **Memoized geometry patterns** — `useMemo` for line points, node positions
- **Scene 04 receiving handoff** — proof packet + laptop screen glow logic may be adapted

**Do not reuse as main visuals:**
- Forge nucleus sphere cluster
- Reactor rings
- ForgeNetworkOrbits circular orbits around a core
- ForgeDeploymentGate as-is (it reads as a reactor gate, not a product output)

---

## 9. Rejected Visual Elements

The following are explicitly rejected and must not return in any future Scene 03 implementation:

```
✗ Abstract forge nucleus
✗ Many rings around a core
✗ SDLC orbit labels around nodes
✗ Reactor/chamber circle system
✗ Small infographic composition
✗ Flat SDLC timeline
✗ Stage pills / delivery gates
✗ Random helper lines
✗ Diagonal route lines
✗ Debug-looking gold/cyan paths
✗ Dashboard-like clutter
✗ Tiny unreadable WebGL text labels
✗ Cluttered circular assembly system
```

---

## 10. Mobile Direction

Mobile composition target:

```
TOP:
  Compact Product Engine copy (badge + headline)

CENTER:
  Large product object (scaled to fit vertically)
  - simplified glass panels
  - reduced layer depth

AROUND / BELOW:
  Simplified 2–3 full-stack layers
  Compact performance wave (simplified)

LATE:
  Compact proof handoff
```

Mobile rules:
- No horizontal overflow
- No unreadable labels
- Product object remains visually dominant
- Performance wave simplified or opacity-reduced on mobile
- No full desktop clutter squeezed into portrait viewport
- Test against `375x667`, `390x844`, `430x932`

---

## 11. Reduced Motion Direction

Reduced motion must show a complete static assembled product state:

```
✓ Finished product interface visible
✓ UI/UX glass shell visible
✓ Full-stack layers visible (static)
✓ Performance-ready indicator visible (static)
✓ Proof handoff vector visible (static, no moving packet)
```

No animations in reduced motion:
```
✗ Moving spark
✗ Sweeping performance wave
✗ Moving proof packet
✗ Continuous floating animation
✗ Pulsing/flashing effects
```

---

## 12. Performance Strategy

- No GLB assets
- No postprocessing
- No heavy particle systems
- No new external dependencies
- No dense shader effects
- No per-frame React state updates
- Procedural geometry only (planes, lines, spheres, rings)
- `useMemo` for all geometry point arrays
- Limited transparent mesh overlap (≤ 4 layers at peak)
- DOM overlay for readable text (not WebGL text)
- Mobile geometry count reduced

**Target:**
```
Preferred: 55–60 FPS
Acceptable floor: 45 FPS
No sustained drops into teens
```

---

## 13. Scene 02 No-Touch Guardrails

The following files must not be modified under any circumstances:

```
Scene02Hero.tsx
HeroCommandNode.tsx
scene02Config.ts
HeroAtomicCore.tsx
HeroGlbCore.tsx
HeroGlbStation.tsx
heroAtomLayout.ts
Scene 02 orbit geometry
Scene 02 camera keyframes (Scene 02 segment only)
Scene 02 copy
```

Scene 02 may only be opened as a **visual reference**. Any fix to Scene 03 that requires touching Scene 02 must be escalated and explicitly approved.

---

## 14. Scene 04 Handoff Direction

Scene 04 currently receives a proof packet via `Scene04Projects.tsx`.

For the Product Assembly Engine, the handoff should:
- Originate from the **output point** of the product (e.g., a launch vector from the product's bottom-right corner)
- Travel a short, clean path forward into Scene 04
- Arrive at `SCENE_04_ANCHORS.laptopScreenTarget`
- The Scene 04 receiving glow (cyan screen wake) can be preserved as-is

**No redesign of Scene 04 is needed in PRODUCT-01 through PRODUCT-07.** Scene 04 handoff alignment may be tuned in PRODUCT-06 only.

---

## 15. Recommended Implementation Ticket Breakdown

```
PRODUCT-01 — Remove Forge Runtime & Clean Product Baseline
  → Strip all Forge components from Scene03Architecture.tsx
  → Remove SystemForgeBaseline, ForgeNetworkOrbits, etc.
  → Establish clean SystemProductBaseline scaffold
  → Keep overlay CSS structure

PRODUCT-02 — Build Large Floating Product Hero Object
  → Create the main product interface shell (wireframe → glass)
  → Beats 0.00 – 0.28 (spark + wireframe)
  → Desktop large, mobile safe

PRODUCT-03 — UI/UX Glass Interface & Layer Transition
  → Transform wireframe to glass UI shell
  → Beat 0.28 – 0.44

PRODUCT-04 — Full-Stack Depth Layers
  → Add 3D stacked depth planes behind the product
  → Frontend / API / Backend / Data
  → Beat 0.44 – 0.60

PRODUCT-05 — Performance Optimization Wave
  → Cinematic sweep wave across the product
  → Product edges sharpen, layers align
  → Beat 0.60 – 0.74 (main wow moment)

PRODUCT-06 — Product Lock, Quality Pass & Launch Handoff
  → Final product stabilization
  → Minimal indicators (UX / API / DATA / PERF / READY)
  → Launch vector + proof packet to Scene 04
  → Beat 0.74 – 1.00

PRODUCT-07 — Mobile, Reduced Motion & Performance QA
  → Full responsive audit
  → Reduced motion static state audit
  → FPS measurement
  → Console clean

PRODUCT-08 — Final Visual Lock
  → Screenshot evidence
  → Production lock document
  → Scene 02 isolation re-confirmation
```

---

## 16. Final Creative Lock Decision

**Scene 03 is creatively relocked as: Product Assembly Engine**

The System Forge direction is formally rejected.

No new forge-themed visual features should be implemented.

Future implementation must follow this document as the creative contract.
