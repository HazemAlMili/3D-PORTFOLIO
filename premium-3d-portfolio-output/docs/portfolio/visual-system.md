# Visual Design System Specification — Color Tokens Palette

This specification codifies the visual color tokens, functional dark layers, and accessibility contrast benchmarks to guarantee an authoritative, minimal engineering aesthetic.

## 1. Monochrome Baseline Core (The Dark Architecture Layers)
The background infrastructure relies on deep, non-reflective graphite and charcoal tokens, minimizing display radiation while carving out a sharp technical laboratory atmosphere.

* **`color-bg-base` (Deep Charcoal):** `#0e0f11`
  * Role: Global layout background wrapper layer.
* **`color-bg-surface` (Graphite Core):** `#16181c`
  * Role: Layout card modules, project containers, and inner code blocks.
* **`color-border-subtle` (Muted Grid Line):** `#242830`
  * Role: Asymmetric layout dividers, 12-column grid line delimiters, and component boundaries.
* **`color-text-primary` (Off-White):** `#f4f5f6`
  * Role: Primary title vectors, bold monospace data tags, and layout labels.
* **`color-text-secondary` (Muted Steel):** `#9097a2`
  * Role: Descriptive paragraph body text blocks and structural case study logs.

---

## 2. Technical System Signal Accent Mappings
Accents are used selectively as functional indicators of application status, preventing decorative clutter and cyberpunk noise.

* **`color-signal-cyan` (System Pulse):** `#00e5ff`
  * Operational Role: Active conversion path triggers, highlight markers, component interaction focus rings, and primary CTA buttons.
* **`color-signal-green` (Compilation Success):** `#00e676`
  * Operational Role: Shipped system status metrics, successful validation data fields, and stable route connection anchors.
* **`color-signal-gold` (Strategic Metric Anchor):** `#ffd700`
  * Operational Role: Leadership milestones, enterprise track indicators, and business lifecycle optimization callouts.

---

## 3. Accessibility Contrast Safety Audit Log
To satisfy strict accessibility baselines, all foreground typography layers are paired systematically against underlying surfaces to guarantee high readability.

| Text Token | Underlying Surface | Calculated Contrast Ratio | WCAG Compliance Status |
| :--- | :--- | :--- | :--- |
| **`color-text-primary`** (`#f4f5f6`) | **`color-bg-base`** (`#0e0f11`) | `18.2:1` | **PASS (Exceeds AAA)** |
| **`color-text-primary`** (`#f4f5f6`) | **`color-bg-surface`** (`#16181c`) | `15.4:1` | **PASS (Exceeds AAA)** |
| **`color-text-secondary`** (`#9097a2`) | **`color-bg-base`** (`#0e0f11`) | `6.8:1` | **PASS (Exceeds AA Baseline)** |
| **`color-text-secondary`** (`#9097a2`) | **`color-bg-surface`** (`#16181c`) | `5.7:1` | **PASS (Exceeds AA Baseline)** |
| **`color-signal-cyan`** (`#00e5ff`) | **`color-bg-base`** (`#0e0f11`) | `12.1:1` | **PASS (Exceeds AAA Focus)** |

---

## 4. Typography System Architecture & Scales

This section codifies the allowed font pairings, numerical size metrics, and responsive reflow boundaries, safeguarding extreme text legibility across all target devices.

### 4.1 Global Font Pair Selections
* **`font-family-sans` (Interface Core):** `Plus Jakarta Sans`, sans-serif
  * Context: Primary layout headings, navigation links, layout panels, and UI control elements. Chosen for its crisp, professional geometric execution over dark backgrounds.
* **`font-family-mono` (Technical Engine Wires):** `JetBrains Mono`, monospace
  * Context: System metadata tags, metric labels, code snippets, project category indicators, and process nodes. Re-establishes a clean, structured development ecosystem.

### 4.2 Typographic Scale Tokens & Hierarchy Matrix
All dimensions map out precise font size boundaries, text tracking adjustments, and line heights.

| Typography Token | Font Family | Desktop Size | Mobile Size | Line Height | Tracking Value | Weight Class |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`font-h1-hero`** | `Sans` | `3.5rem (56px)` | `2.25rem (36px)`| `1.15` | `-0.02em` | `800 (Bold)` |
| **`font-h2-section`**| `Sans` | `2.25rem (36px)` | `1.75rem (28px)`| `1.2` | `-0.01em` | `700 (SemiBold)` |
| **`font-h3-card`** | `Sans` | `1.5rem (24px)` | `1.25rem (20px)`| `1.3` | `0.00em` | `600 (Medium)` |
| **`font-body`** | `Sans` | `1.0rem (16px)` | `0.93rem (15px)`| `1.6` | `0.01em` | `400 (Regular)` |
| **`font-mono-tag`** | `Mono` | `0.87rem (14px)` | `0.81rem (13px)`| `1.4` | `0.05em` | `500 (Medium)` |
| **`font-mono-logs`** | `Mono` | `0.75rem (12px)` | `0.75rem (12px)`| `1.5` | `0.02em` | `400 (Regular)` |

### 4.3 Responsive Reflow & Scalability Constraints
* **Clipping Protection:** Text block containers must avoid hard height declarations, replacing them with dynamic paddings and `min-height` logic. This ensures that font size scaling under low-vision device setups flows vertically without colliding into nearby elements.
* **Line Length Limit:** To secure fast readability for engineering manager audiences, text containers are restricted to a maximum width of `65ch` characters per line.

---

## 5. UI Component System Architecture & States

This section codifies the atomic structure, dimension constraints, and interactive state feedback rules for the core layout components, forcing absolute visual unity before coding milestones begin.

### 5.1 Universal State Interaction Matrix
Every interactive component must evaluate background, border, and accent modifications across four standardized layout states.

| Interaction State | Background Token | Border Token | Typography Token | Signal Accent Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `transparent` / `surface` | `color-border-subtle` | `color-text-primary` | Inactive. |
| **Hover** | Base Layer Shifting | `color-text-secondary`| `color-signal-cyan` | Emissive pulse indicator lights up. |
| **Active** | `#0e0f11` (Deep charcoal) | `color-signal-cyan` | `color-signal-cyan` | Rigid spatial scale-down animation (`transform: scale(0.98)`). |
| **Focus** | `transparent` / `surface` | `color-border-subtle` | `color-text-primary` | Immediate outline trigger (`outline: 2px solid #00e5ff; outline-offset: 4px`). |

---

### 5.2 7-Tier Building Block Specifications

#### 01. Buttons (`CTA-Primary` & `CTA-Secondary`)
* **Dimensions:** Vertical internal padding: `12px` | Horizontal internal padding: `24px` | Minimum bounding height: `48px`.
* **Radii Token:** `0px` (Strict minimal geometric square format).
* **Typography:** `font-family-sans`, Medium, `14px`, `tracking: 0.02em`.
* **Primary Layout:** Background: `#f4f5f6` | Text: `#0e0f11` | Hover: Background swaps to `#00e5ff`.

#### 02. Cards (`Standard Panels`)
* **Dimensions:** Global padding boundary wrapper: `24px` uniform.
* **Background & Borders:** Background: `#16181c` (Graphite surface) | Border: `1px solid #242830`.
* **Use Case:** Metric cells, process blocks, timeline elements, and code snippet containers.

#### 03. Chips (`Capability Tags`)
* **Dimensions:** Vertical padding: `6px` | Horizontal padding: `12px` | Bounding height: `32px`.
* **Background & Borders:** Background: `#0e0f11` | Border: `1px solid #242830` | Radii: `9999px` (Full capsule track).
* **Typography:** `font-family-mono`, Medium, `13px`.

#### 04. Navigation Links (`Menu Items`)
* **Dimensions:** Target target area envelope: `44px x 48px` minimum to secure finger touch space.
* **Typography:** `font-family-sans`, SemiBold, `15px`, `tracking: -0.01em`.
* **States:** Default: `#9097a2` | Hover: Smooth transition color scale shift to `#00e5ff`.

#### 05. Structural Panels (`Global Shell Content Containers`)
* **Dimensions:** Max layout reading block width envelope: `1200px` center-aligned | Side viewport gutters: `24px`.
* **Grid Context:** Implements a responsive 12-column template infrastructure with `#242830` fine-wire separations.

#### 06. Project Card Sub-Grids (`Section 05 Core Components`)
* **Structure:** Multi-layered HTML `article` component incorporating an asymmetric split grid separating label metadata from description body blocks.
* **Borders & Accentuation:** Outlined via a `1px solid #242830` threshold. Hover maps an inline left-edge accent line glowing with `#00e5ff`.

#### 07. Terminal Call-To-Action Blocks (`Conversion Anchors`)
* **Structure:** Full layout width container hosting high-impact typography elements (`font-h2-section`).
* **Signal Integration:** Merges a centralized `#ffd700` (Gold) operational leadership beacon callout to isolate the user's strategic value matrix.


