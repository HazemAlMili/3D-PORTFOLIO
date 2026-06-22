# 3D Camera Rig Setup & Perspective Lens Specification — The Product Systems Engine

This specification codifies the rigid spatial transformation matrices, focal length thresholds, near/far clipping fields, and asymmetric framing laws across exactly 10 storytelling scenes.

## 1. Global Camera Rig Architecture & Constraints
* **Lens Type Token:** Perspective Camera Node.
* **Programmatic Target Metric:** Controlled single-axis linear tracks bound strictly to global scroll velocity metrics. Free-look orbital mouse configurations are deactivated.
* **Clipping Protection Bounds:** Near Clipping Plane: `0.1m` | Far Clipping Plane: `100.0m`. This ensures clean rendering passing inside mesh nodes without visual face truncation.

---

## 2. 10-Scene Lens Coordinates & Target Matrix

| Scene ID | Storytelling Section | Camera Location (X, Y, Z) | Focal Look-At Target (X, Y, Z) | Field of View (FOV) | Spatial Framing Composition Rule |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Scene 01**| **System Boot / Hero** | `(0.00, 0.00, 8.50)` | `(0.00, 0.00, 0.00)` | `45°` | Center Origin. Mesh tracks centrally behind header text layers. |
| **Scene 02**| **Identity Lock** | `(2.50, 0.00, 7.00)` | `(0.00, 0.00, 0.00)` | `40°` | Left-Third Split. Shifts core assets left; right 65% left clean for text blocks. |
| **Scene 03**| **Proof Scan** | `(0.00, 6.00, 0.00)` | `(0.00, 0.00, 0.00)` | `35°` | Perpendicular Top-Down. Flat view mirroring standard HTML grid card modules. |
| **Scene 04**| **Architecture Assembly**| `(4.50, 4.50, 5.50)` | `(0.00, 0.00, 0.00)` | `38°` | 35° Isometric Engineering View. Renders stacking plates stacking vertically. |
| **Scene 05**| **Project Modules** | `(0.00, 0.00, 6.00)` | `(0.00, 0.00, -2.00)` | `42°` | Rail Tracking Axis. Camera moves horizontally along positive X-axis rail. |
| **Scene 06**| **Deep Case Preview** | `(0.00, 0.00, 0.85)` | `(0.00, 0.00, -5.00)` | `50°` | Immersive Dolly-In. Camera enters inside a project capsule mesh node. |
| **Scene 07**| **Stack Engine** | `(-1.50, 0.50, 6.50)` | `(0.00, 0.00, 0.00)` | `40°` | Right-Third Split. Groups capabilities matrix on left plain text sheets. |
| **Scene 08**| **Build Pipeline** | `(0.00, 0.00, 7.20)` | `(2.00, 0.00, 0.00)` | `45°` | Horizontal Flow tracking. Lens moves left-to-right following active light steps. |
| **Scene 09**| **Experience Timeline**| `(-2.00, -1.50, 5.80)`| `(0.00, 0.00, 0.00)` | `42°` | Diagonal Parallax Track. Maximizes depth separation against floating nodes. |
| **Scene 10**| **Production Launch** | `(0.00, 0.00, 9.00)` | `(0.00, 0.00, 0.00)` | `45°` | Reset Center Wide Axis. Systems freeze with slow uniform glow behind form fields. |

---

## 3. Responsive Mobile Viewport Adaptations
To safeguard visual text space on smaller screens, camera rig parameters change behavior tokens programmatically at layout mobile breakpoints.

* **Z-Axis Compressions Dolly:** Mobile camera nodes increase Z-axis distance offsets by exactly `1.45x` across all scenes to scale the bounding box down, preventing the 3D meshes from colliding with vertical text stack flows.
* **Horizontal Shift Remapping:** Asymmetric split frames (Scene 02, Scene 07) reset location offsets to `X: 0.00` centrally, moving meshes completely behind HTML columns to act as clean dark backdrop canvases.
