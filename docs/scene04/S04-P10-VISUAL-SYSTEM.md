# S04-P10 — Visual System Blueprint

> **Status:** LOCKED  
> **Authority:** Establishes the official materials, lighting, color palette, and visual hierarchy for Scene 04. Preserves all camera, spatial, motion, content, and transition locks.

---

## 1. Color Palette Contract

| Token | Hex Value | Role | Application |
| :--- | :--- | :--- | :--- |
| **Background** | `#070D18` | Deep blue-black gallery void | Canvas background & ambient light tint |
| **Bezel / Chassis** | `#0F172A` | Metallic structural shell | Active Project Capsule physical outer shell |
| **Structural Cyan** | `#38D6FF` | Primary technical identity | Proof rail, capsule side highlights, preview slot outlines |
| **Active Cyan Accent** | `#1A8CFF` | Mid-depth structural accent | Secondary capsule shell wireframes and depth cues |
| **Restrained Gold** | `#D8A84F` | Verified proof & outcome cue | Proof state outcome badge, result outline, UX extraction fragment |
| **Screen Emissive** | `#071526` | Readable preview background | Active capsule front preview surface slot |
| **Proof Grid Surface** | `#0F2238` | Internal implementation layer | Active capsule inner proof grid frame slot |

---

## 2. Material Architecture

- **Active Capsule Frame (`meshStandardMaterial`):**
  - Color: `#0F172A`, Metalness: `0.80`, Roughness: `0.35`, Opacity: `1.0`.
  - Edge Highlight: `meshBasicMaterial` `#38D6FF` wireframe (opacity `0.45`).
- **Active Preview Surface (`meshStandardMaterial`):**
  - Color: `#091424`, Emissive: `#071526`, EmissiveIntensity: `0.40`, Opacity: `0.95`.
- **Active Proof Region (`meshStandardMaterial`):**
  - Color: `#0F2238`, Emissive: `#38D6FF`, EmissiveIntensity: `0.15`, Wireframe: `#38D6FF` (opacity `0.35`).
  - Outcome State (`proof` / `hero`): Emissive transitions to `#D8A84F` (intensity `0.35`), wireframe outline to `#D8A84F`.
- **UX Extraction Marker (`meshStandardMaterial`):**
  - Inner Core: Color `#D8A84F`, Emissive `#D8A84F` (intensity `0.50`), Opacity `0.90`.
  - Outer Frame: Wireframe `#38D6FF` (opacity `0.80`).
- **Secondary Capsule (`meshStandardMaterial`):**
  - Color: `#0D1B2A`, Roughness: `0.70`, Opacity: `0.75`. Wireframe `#38D6FF` (opacity `0.25`).
- **Distant Silhouette (`meshStandardMaterial`):**
  - Color: `#080D1A`, Roughness: `0.95`, Opacity: `0.50`. Wireframe `#38D6FF` (opacity `0.15`).
- **Proof Rail Tube (`meshStandardMaterial`):**
  - Color: `#102A45`, Emissive: `#38D6FF` (intensity `0.20`), Wireframe `#38D6FF` (opacity `0.60`).

---

## 3. Lighting Ownership and Roles

1. **Ambient Light (`intensity = 0.25`, color `#070D18`):** Prevents black-on-black loss in void while maintaining deep shadow values.
2. **Key Light (`intensity = 1.20`, position `[4, 6, 4]`, color `#FFFFFF`):** Highlighting 3/4 metallic bevel edges of the active capsule.
3. **Depth Rim Light (`intensity = 0.60`, position `[-4, 3, 2]`, color `#38D6FF`):** Separating capsule background silhouette from dark gallery depth.
4. **Active Focus Point Light (`intensity = 0.80`, position `[1.55, 0.5, 2.0]`, color `#38D6FF`):** Illuminating active project preview slot.
5. **Gold Outcome Point Light (`intensity = 0.50`, position `[1.35, 0.2, 0.8]`, color `#D8A84F`):** Active only during `proof` and `hero` states ($p \in [0.60, 0.88]$).

---

## 4. Visual Ownership Timeline

- **Beat 01 ($0.00 - 0.12$):** Handoff arrival pulse (`#D8A84F`) and dock receiving ring (`#38D6FF`).
- **Beat 02 ($0.12 - 0.27$):** Proof rail tube (`#38D6FF` emissive) and secondary/distant silhouettes.
- **Beat 03 ($0.34$):** Active capsule metallic shell (`#0F172A`) and DOM HUD identity.
- **Beat 04 ($0.50$):** Internal $Z$-layer expansion (cyan preview slot `#071526` + proof grid `#0F2238`).
- **Beat 05 ($0.67$):** Restrained gold outcome cue (`#D8A84F`) on proof grid outline.
- **Beat 06 ($0.81$):** Stable Hero lock (DOM HUD left `32%`, protected gap **`9.41%`**, Active Capsule right `58.5%`).
- **Beat 07 ($0.94$):** Gold UX extraction fragment (`#D8A84F`) pulling toward transfer anchor `[1.35, 0.20, 0.05]`.
