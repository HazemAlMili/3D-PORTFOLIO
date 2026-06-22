# 3D Spatial Staging & Lighting Rig Specification — The Product Systems Engine

This specification codifies the global location coordinates, origin offsets, and physical lighting parameters inside the single layout scene space, finalizing the read-only Phase 4 3D Asset Lock.

## 1. Global Scene Coordinate Layout Matrix
To ensure predictable camera framing transitions and completely eliminate structural layout overlaps, all models map directly to strict spatial boundaries.

| Asset Identifier Code | Programmatic Node Name | Global Staging Position (X, Y, Z) | Rotation Vector (X, Y, Z) | Scale Constraints (X, Y, Z) | Local Origin Anchor Rule |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`ASSET_CORE_RINGS`** | `mesh_engine_core_rings` | `(0.00, 0.00, 0.00)` | `(0°, 0°, 0°)` | `(1.0, 1.0, 1.0)` | Center-locked at absolute origin. |
| **`ASSET_SYS_PLATES`** | `mesh_architecture_plates`| `(0.00, -5.00, 0.00)` | `(35°, 45°, 0°)` | `(1.2, 1.2, 1.2)` | Origin set at lowermost plate baseline. |
| **`ASSET_PROJ_ENACTUS`**| `mesh_capsule_enactus` | `(-10.00, -10.00, 0.00)`| `(0°, 90°, 0°)` | `(1.0, 1.0, 1.0)` | Center of the bounding capsule volume. |
| **`ASSET_PROJ_JOBOARD`**| `mesh_capsule_jobboard` | `(-5.00, -10.00, 0.00)` | `(0°, 0°, 0°)` | `(1.0, 1.0, 1.0)` | Base of the relational column matrix. |
| **`ASSET_PROJ_GDG`** | `mesh_capsule_gdg_module`| `(5.00, -10.00, 0.00)` | `(0°, 45°, 0°)` | `(1.0, 1.0, 1.0)` | Central mesh vertex master join point. |
| **`ASSET_PROJ_LAWYER`** | `mesh_capsule_lawyer_site`| `(10.00, -10.00, 0.00)` | `(0°, 0°, 0°)` | `(1.0, 1.0, 1.0)` | Absolute flat horizontal layer center. |
| **`ASSET_PIPE_NODES`** | `mesh_workflow_pipeline` | `(0.00, -18.00, 0.00)` | `(0°, 90°, 0°)` | `(0.8, 0.8, 0.8)` | First briefing milestone node coordinate. |
| **`ASSET_TIME_NODES`** | `mesh_experience_timeline`| `(0.00, -25.00, 0.00)` | `(15°, 0°, -10°)`| `(1.0, 1.0, 1.0)` | Absolute initial career landmark node. |

---

## 2. Technical Matte Lighting Rig Specification
To protect the premium brand tone, illumination fields utilize low-intensity, high-diffusion light sources to highlight wireframes safely without color washout.

* **`light_ambient_core` (Global Environmental Fill):**
  * Type: Ambient Light Node | Color Target: `#16181c` (Graphite token tint match).
  * Intensity Parameter: `0.25` | Behavior: Constant uniform baseline luminosity.
* **`light_dir_key` (Primary Perspective Key Light):**
  * Type: Directional Light | Location Vector: `(5.00, 10.00, 7.50)` | Color Target: `#f4f5f6` (Off-white).
  * Intensity Parameter: `0.80` | Shadow Maps: Configured with linear soft-shadow decay arrays.
* **`light_point_signal` (Interactive Highlights Multi-Rig):**
  * Type: Point Light | Location Bounds: Dynamically bound to track active project capsule center coords.
  * Color Target: `#00e5ff` (Cyan accent matching) | Intensity: `1.20` | Decay: `2.0` (Sharp local falloff).

---

## 3. Phase 4 Technical 3D Asset Lock Declaration
The structural mesh arrangements, coordinate locations, local origin offsets, and high-fidelity lighting maps have successfully passed all performance safety audits.

**Phase 4 Staging Architecture is hereby officially LOCKED**. The creative and spatial arrangement parameters are completely frozen. No subsequent phase may mutate these grid baselines, completing all pre-scaffolding documentation.
