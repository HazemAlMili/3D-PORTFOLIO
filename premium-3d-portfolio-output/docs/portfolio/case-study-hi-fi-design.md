# High-Fidelity Case Study Layout Specification — The Product Systems Engine

This specification codifies the exact visual design tokens, markdown element formatting, sidebar container metrics, and footer pagination layouts for the dynamic inner route template (`/work/[slug]`) to support Phase 7 MDX creation.

## Global Inner Layout Token Definitions
* **Global Background Field:** `#0e0f11` (Deep charcoal matte base)
* **Global Column Template:** 12-column asymmetric split grid (Columns 1-8: Editorial Reading Stream | Columns 9-12: Metadata Sidebar Panel Block).
* **Global Gutter Boundaries:** `max-width: 1200px` center-aligned, `padding-left/right: 24px`.

---

## 1. MDX Technical Text Elements Style Manual

### 1.1 Header Chronology Styles
* **`H1` Title Vector (Project Name):**
  * Typography: `Plus Jakarta Sans` Bold, `2.25rem (36px)`, line-height `1.2`, tracking `-0.02em`.
  * Color: `#f4f5f6` (Off-white primary) | Margin: `margin-bottom: 24px`.
* **`H2` Structural Section Titles:**
  * Typography: `Plus Jakarta Sans` SemiBold, `1.75rem (28px)`, line-height `1.25`, tracking `-0.01em`.
  * Color: `#f4f5f6` | Margin: `margin-top: 48px`, `margin-bottom: 16px` | Border: `border-left: 2px solid #00e5ff` (Cyan accent trace).
* **`H3` Subsection Explanations:**
  * Typography: `Plus Jakarta Sans` Medium, `1.25rem (20px)`, line-height `1.3`.
  * Color: `#f4f5f6` | Margin: `margin-top: 24px`, `margin-bottom: 12px`.

### 1.2 Body Text & List Elements
* **`p` Content Paragraphs:**
  * Typography: `Plus Jakarta Sans` Regular, `1.0rem (16px)`, line-height `1.6`.
  * Color: `#9097a2` (Muted steel) | Layout: `max-width: 65ch`, `margin-bottom: 16px`.
* **`ul` / `ol` Structural Iterations:**
  * Layout: `padding-left: 20px`, `margin-bottom: 16px` | Items use custom `#00e5ff` dot indicators.
  * Text Color: `#9097a2` | Line Height: `1.5`.

### 1.3 Technical Code Blocks & Inline Snippets
* **`code` Inline Elements:**
  * Typography: `JetBrains Mono` Medium, `13px` | Color: `#00e5ff` (Cyan signal).
  * Background: `#16181c` (Graphite surface) | Padding: `2px 6px` | Radii: `2px`.
* **`pre` Code Sandboxes / Snippet Containment:**
  * Background: `#16181c` | Border: `1px solid #242830` | Padding: `20px` | Radii: `0px`.
  * Typography: `JetBrains Mono` Regular, `12px`, line-height `1.5` | Overflow: `overflow-x: auto`.
  * High-Contrast Syntax Syntax Tokens: Comments use `#9097a2` | Keywords use `#00e5ff` | Variables use `#f4f5f6`.

---

## 2. Asymmetric Sidebar Parameter Box Specification
The right 4 layout columns host a structural project metadata parameter container widget.

* **Container Metrics:** Background `#16181c` | Border `1px solid #242830` | Padding `24px` | Sticky positioning behavior active.
* **Metadata Fields Stack:**
  * Label Header: `#9097a2` | `JetBrains Mono`, 12px, tracking 0.05em. Text: "PROJECT SPECIFICATIONS".
  * Field Block 01: Role Category -> Value: "Head of IT / Lead Frontend Developer" (Skinned with high-contrast `#f4f5f6` tokens).
  * Field Block 02: Core Technology Tags Array -> Horizontal capsule chip structures, background `#0e0f11`, text JetBrains Mono 13px.
  * Field Block 03: Primary Action Redirect Targets -> Height 48px square boxes, bounding border `#242830`. Text labels: `Analyze Live Infrastructure Core` & `Verify Git Wires`. Focus invokes a full Cyan glow.

---

## 3. Pagination Footer & Terminal CTA Panels

### 3.1 Terminal Content Block Conversion CTA
* **Structure:** Located directly below the main editorial layout block, spanning full 12-column template widths.
* **Padding Constraints:** `padding-top: 80px` | `padding-bottom: 80px` | `border-top: 1px solid #242830`.
* **Skin Application:**
  * Section Headline: Heading-Secondary (`#f4f5f6`, 36px). Text: "Integrate This System Architecture Into Your Product".
  * Core Signal Beacon Integration: Embeds a centralized `#ffd700` (Gold) operational leadership anchor panel to stress technical management context.
  * Action Control Node: Square primary button, height 48px, background `#f4f5f6`, text `#0e0f11`. Text label: "Initiate Contact Protocol".

### 3.2 Dynamic Pagination Landmark Traversal Footer
* **Structure:** Spans the lower horizontal page boundary edge to handle sequential page rotation.
* **Padding Constraints:** `padding-top: 40px` | `padding-bottom: 40px` | `border-top: 1px solid #242830`.
* **Skin Application:**
  * Left Link Node (`[Link-Prev]`): `#9097a2` | Hover flips to `#00e5ff`. Text: "<== Previous System Case".
  * Right Link Node (`[Link-Next]`): `#9097a2` | Hover flips to `#00e5ff`. Text: "Next System Case ==> ".
  * Bounding Height Target: Bounded at 48px touch targets to maintain flawless touchscreen alignment metrics.
