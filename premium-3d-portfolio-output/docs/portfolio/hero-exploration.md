# Hero Viewport Visual Exploration Specification — The Product Systems Engine

This specification codifies exactly 3 alternative conceptual layout frames, text grading states, and spatial canvas boundaries for the initial landing view, satisfying the 5-second scannability threshold.

## 1. Global Frame Constraints
* **Palette Compliance:** Backgrounds strictly utilize `#0e0f11` (Deep charcoal) with `#16181c` surface containers. Accents are restricted to functional `#00e5ff` (Cyan) component boundaries.
* **Typography Rule:** Primary headers invoke `font-family-sans` (`Plus Jakarta Sans`) at `3.5rem` weight bold. Metadata labels use `font-family-mono` (`JetBrains Mono`) at `14px`.

---

## 2. The 3 Conceptual Frame Blueprints

### Concept Frame A: The Asymmetric Balanced Split (Dominant Production Path)
* **Visual Structure:** A 12-column split configuration where text-heavy data columns occupy the left 7 sections, and the background R3F canvas is center-locked within the right 5 sections to create an asymmetrical technical laboratory grid.

```txt
+-----------------------------------------------------------------------------------+
| [Logo: Hazem]                                  [Nav: Work, Stack, Process, About] |
+-----------------------------------------------------------------------------------+
| (Columns 1-7: High-Contrast Text Stream)                     | (Columns 8-12)     |
| [Mono-Label / color-signal-cyan]: "SYSTEM: INITIALIZATION"   |                    |
| [Heading-Primary / color-text-primary]:                      | [R3F Canvas Zone]  |
|   "Engineering High-Performance                              |                    |
|    Digital Product Systems."                                 | (Scene 01: Low-poly|
|                                                              |  Concentric Core   |
| [Paragraph-Body / color-text-secondary]:                     |  Rings Assembling  |
|   "Hi, I am Hazem Mahmoud Al-Melli. A Web Developer          |  Natively Over     |
|    specializing in enterprise frontend systems built with    |  Deep Axis Space)  |
|    React, Next.js, and TypeScript..."                        |                    |
|                                                              |                    |
| [CTA-Group Blocks]:                                          |                    |
|   +--------------------------+   +-----------------------+   |                    |
|   | [Button]: Connect        |   | [Link]: Analyze Core  |   |                    |
|   +--------------------------+   +-----------------------+   |                    |
+-----------------------------------------------------------------------------------+
```

### Concept Frame B: The Central Monolithic Engine

* **Visual Structure:** Center-aligned structural layout where typography blocks overlay the central axis directly. The R3F core mesh assemblies expand *behind* the typography fields, using a subtle `#0e0f11` opacity overlay mask to maintain perfect readability.

```txt
+-----------------------------------------------------------------------------------+
| [Logo: Hazem]                                                     [Menu Token: =] |
+-----------------------------------------------------------------------------------+
|                                 (Columns 3-10)                                    |
|                          [Mono-Label]: "CORE_INITIAL_v4.0"                        |
|                                                                                   |
|                       [Heading-Primary]: "Engineering High-                       |
|                                           Performance Systems."                   |
|                                                                                   |
|                 [Paragraph-Body]: "Lead Frontend Developer portfolio...           |
|                  Orchestrating robust digital product systems with Next.js..."    |
|                                                                                   |
|                       +----------------------------------------+                  |
|                       | [Button-Primary]: Initiate Connection  |                  |
|                       +----------------------------------------+                  |
|                                                                                   |
|                     [R3F Concentric Rings Orbiting Centrally Behind]              |
+-----------------------------------------------------------------------------------+
```

### Concept Frame C: The Topographic Grid Interface

* **Visual Structure:** A tight grid array where subtle `#242830` line tokens segment the entire viewport into geometric boxes. Text metadata blocks sit inside corner anchors, framing a large central canvas cell housing the self-assembling loop wires.

```txt
+---------------------+---------------------------------------+---------------------+
| [Logo: Hazem M.]    | [Nav Link: Work] | [Nav Link: Stack]  | [Nav Link: Process] |
+---------------------+---------------------------------------+---------------------+
| (Cell 01)           | (Cell 02: Primary Core Canvas Space)  | (Cell 03)           |
| [Mono]: ROLE_LOCK   |                                       | [Mono]: SYS_METRIC  |
| "Lead Web Dev"      |   [React Three Fiber Canvas Loop]     | "FPS: 60_安定"       |
|                     |   (Concentric rings dolly-in sweep)   |                     |
| [Heading-Primary]:  |                                       | +-----------------+ |
| "Product Systems"   |                                       | | [Button]: Sync  | |
|                     |                                       | +-----------------+ |
+---------------------+---------------------------------------+---------------------+
```
