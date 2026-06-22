# 3D Asset Architectural Specification & Performance Budgets — The Product Systems Engine

This specification codifies the rigid numeric polygon budgets, scene node naming taxonomies, and mesh material token properties to protect page speed metrics under WebGL rendering pipelines.

## 1. Global Performance Budget Constraints
To satisfy high-performance core web vitals, the entire 3D ecosystem enforces defensive mesh optimization guidelines.

* **Total Compiled Scene Budget:** Maximum `1.2MB` total size after Draco compression.
* **Global Material Rule:** Single unified atlas texturing grid or shared procedural PBR nodes to prevent draw-call duplication bottlenecks.
* **Rendering Directive:** All meshes operate as ornamental background geometry. Critical navigation meaning remains 100% layered on accessible semantic DOM containers.

---

## 2. Granular Object Model Budget & Taxonomy Matrix
Every mesh asset developed inside Blender must conform perfectly to this taxonomy map and polygon count cap.

| Asset Identifier Code | Target Mesh Structure | Maximum Polygon Count | Maximum Vertex Limit | Programmatic Node Name (R3F Index) |
| :--- | :--- | :--- | :--- | :--- |
| **`ASSET_CORE_RINGS`** | Concentric Structural Rings Array | `1,200 polys` | `1,500` | `mesh_engine_core_rings` |
| **`ASSET_SYS_PLATES`** | 4 Stratified Layer Stacking Plates | `800 polys total`| `1,000` | `mesh_architecture_plates` |
| **`ASSET_PROJ_ENACTUS`**| Monolithic Capsule Block (Portal v4.0) | `450 polys` | `600` | `mesh_capsule_enactus` |
| **`ASSET_PROJ_JOBOARD`**| Stacking Database Relational Core Grid | `600 polys` | `800` | `mesh_capsule_jobboard` |
| **`ASSET_PROJ_GDG`** | Interconnected Vector Node Network | `900 polys` | `1,200` | `mesh_capsule_gdg_module` |
| **`ASSET_PROJ_LAWYER`** | Flat Symmetrical Balanced Surface | `200 polys` | `300` | `mesh_capsule_lawyer_site`|
| **`ASSET_PIPE_NODES`** | Linear Build Pipeline Milestones | `350 polys` | `500` | `mesh_workflow_pipeline` |
| **`ASSET_TIME_NODES`** | Chronological Commit Tracking Points | `500 polys` | `700` | `mesh_experience_timeline`|

---

## 3. Mesh Material PBR Shader Token Map
Shader attributes are tied directly to locked visual tokens to preserve a clean, matte laboratory atmosphere.

* **`mat_graphite_dark` (Base Structural Shading):**
  * Albedo Tint: `#16181c` (Graphite core token value)
  * Roughness Metric: `0.85` (High diffusion, no harsh visual hotspots)
  * Metalness Metric: `0.10` (Non-metallic corporate surface)
* **`mat_wireframe_bright` (Mesh Outline Contours):**
  * Albedo Tint: `#242830` | Roughness: `1.0` | Emissive Factor: `0.0`
* **`mat_signal_cyan` (Active Interactive States):**
  * Albedo Tint: `#0e0f11` | Roughness: `0.20` | Metalness: `0.0`
  * Emission Color Channel: `#00e5ff` (Cyan accent token value) | Intensity: `1.5`
* **`mat_signal_gold` (Leadership Track Indicators):**
  * Albedo Tint: `#0e0f11` | Roughness: `0.40` | Metalness: `0.5`
  * Emission Color Channel: `#ffd700` (Gold accent token value) | Intensity: `1.2`
