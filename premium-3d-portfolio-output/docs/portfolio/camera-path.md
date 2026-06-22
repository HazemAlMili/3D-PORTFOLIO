# Camera Pathway Blueprint Specification — The Product Systems Engine

This specification codifies the directional tracking vectors, lens behaviors, and focal constraints for a single, persistent camera system traversing exactly 10 storytelling scenes.

## 1. Global Camera System Constraints
* **Rig Architecture:** Single persistent perspective camera context mapped linearly to global vertical page scroll.
* **Interpolation Rule:** All camera translations must use fluid, scroll-bound, completely reversible tracking loops. No sudden cuts or snapping points are permitted.
* **Control Gate:** Strictly no free-roaming avatar controls, WASD layouts, or detached mouse-look triggers. The user's scroll depth serves as the sole programmatic driving force behind spatial orientation changes.

---

## 2. Scene-by-Scene Camera Script

### Scene 01: System Boot / Hero
* **Start State:** Wide perspective vector looking straight down the central origin axis of an dark space.
* **Motion Track:** Linear dolly-in moving rapidly forward along the Z-axis, paired with a subtle 5-degree orbit to emphasize depth.
* **End State:** Medium framing locked on the assembled core ring components, establishing a balanced layout behind the primary hero DOM text layers.

### Scene 02: Identity Lock
* **Start State:** Persistent medium framing at the central origin core.
* **Motion Track:** Smooth lateral pan along the positive X-axis, shifting the central core to a comfortable left-third layout position.
* **End State:** Stable profile framing focused on the emerging system layers, leaving the right-two-thirds of the viewport free for descriptive text layout scanning.

### Scene 03: Proof Scan
* **Start State:** Lateral left-third composition.
* **Motion Track:** Smooth pitch rotation shifting the camera angle into a strict top-down perspective, paired with a slow downwards pan tracking the system's structural grid lines.
* **End State:** Flat bird's-eye view looking straight down at the lit verification nodes, matching the layout of the overlapping metric data panels.

### Scene 04: Architecture Assembly
* **Start State:** Flat bird's-eye top-down composition.
* **Motion Track:** Gradual zoom-out coupled with an upward pitch shift to establish a precise 35-degree isometric engineering perspective angle.
* **End State:** Isometric wide-angle composition framed to display 4 stacking system structural layers (Frontend down to Deployment).

### Scene 05: Project Modules
* **Start State:** 35-degree isometric wide-angle composition.
* **Motion Track:** Continuous horizontal tracking path along the positive X-axis, functioning like a linear rail tracking past sequential geometric capsule assets.
* **End State:** Focused horizontal framing on the selected project node structures as the user scrolls past each distinct project module card.

### Scene 06: Deep Case Study Preview
* **Start State:** Focused project capsule node composition.
* **Motion Track:** Deep forward dolly shot pushing directly *into* the internal geometric structure of the selected active project capsule.
* **End State:** Close-up immersion framing within the mesh interior, transitioning the visual context smoothly into text-heavy case study proof layers.

### Scene 07: Stack Engine
* **Start State:** Close-up capsule interior environment.
* **Motion Track:** Smooth reverse dolly pulling backward out of the sub-mesh layer, transitioning into a clean vertical pan along stratified structural plates.
* **End State:** Balanced frontal view framing three distinct horizontal plate hierarchies (Frontend, Data, Administration).

### Scene 08: Build Pipeline
* **Start State:** Frontal stratified plate composition.
* **Motion Track:** Horizontal panning shot tracking parallel to a traveling light signal moving left-to-right across consecutive structural pipeline nodes.
* **End State:** Clear side-profile composition highlighting the pipeline's final compilation checkout node.

### Scene 09: Experience Timeline
* **Start State:** Side-profile compilation node composition.
* **Motion Track:** Diagonal tracking shot combining a slow horizontal pan with minor vertical layout adjustments to create a clear parallax tracking field against floating timeline commits.
* **End State:** Linear profile alignment focused on the historical track endpoints.

### Scene 10: Production Launch / Contact
* **Start State:** Linear profile timeline timeline framing.
* **Motion Track:** Gradual zoom-out and center alignment pull-back, resetting the focal lens to match the opening origin axis wide-view configuration.
* **End State:** Stable wide-angle composition displaying the entire integrated system infrastructure glowing with a calm pulse behind the final conversion contact CTAs.
