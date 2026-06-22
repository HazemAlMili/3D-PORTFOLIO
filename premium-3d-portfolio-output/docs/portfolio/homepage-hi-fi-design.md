# High-Fidelity Homepage Design Specification — The Product Systems Engine

This specification codifies the exact visual skin layouts, padding budgets, border values, and token integrations for all 10 homepage sections, ensuring code readiness for Phase 6 implementation.

## Global Layout Variables
* **Global Background Layer:** `#0e0f11` (Deep charcoal, solid matte)
* **Global Boundary Borders:** `1px solid #242830` (Fine technical grid line lines)
* **Global Reading Constraint:** Center-aligned container wrapper, `max-width: 1200px`

---

## 10-Section High-Fidelity Design Specifications

### Section 01: System Boot / Hero
* **Structural Layout:** 12-column asymmetric split. Columns 1-7 host the technical text hierarchy; Columns 8-12 serve as empty spatial padding tracking the background canvas mesh orbit paths.
* **Padding Constraints:** `padding-top: 120px` | `padding-bottom: 80px`.
* **Skin Application:**
  * Mono Tag Label: `#00e5ff` (Cyan) | `Plus Jakarta Sans` Medium, 14px, tracking 0.05em. Text: "SYSTEM INITIALIZATION".
  * Primary Header: `#f4f5f6` (Off-white) | Bold, 56px, line-height 1.15. Text: "Engineering High-Performance Digital Product Systems."
  * Sub-Header Body: `#9097a2` (Muted steel) | Regular, 16px, line-height 1.6, maximum reading length bound `65ch`. Text: "Hi, I am Hazem Mahmoud Al-Melli. A Web Developer specializing in enterprise frontend systems built with React, Next.js, and TypeScript..."
* **Primary Conversion Target CTA:** Square button, height 48px, background `#f4f5f6`, text `#0e0f11`. Text label: "Connect Protocol". Focus triggers immediate `outline: 2px solid #00e5ff` ring.

### Section 02: Identity Lock
* **Structural Layout:** Lateral split grid configuration. Left 4 columns left free for background layer animations; right 8 columns host typography layout grids.
* **Padding Constraints:** `padding-top: 100px` | `padding-bottom: 100px`.
* **Skin Application:**
  * Mono Label: `#9097a2` | JetBrains Mono, 14px. Text: "DEVELOPER METHODOLOGY".
  * Secondary Header: `#f4f5f6` | SemiBold, 36px, line-height 1.2. Text: "The Intersection of System Logic & Management".
  * Narrative Body Text: `#9097a2` | Regular, 16px, line-height 1.6. Text details technical leadership backed by a formal Business Administration framework to optimize lifecycles.

### Section 03: Proof Strip
* **Structural Layout:** 3-column horizontal box row array spanning the entire 12-column container width smoothly.
* **Padding Constraints:** `padding-top: 60px` | `padding-bottom: 60px` | `border-top/bottom: 1px solid #242830`.
* **Skin Application:**
  * Row Headline: `#f4f5f6` | Regular, 20px. Text: "Verified Operational Metrics".
  * Card Elements: Background `#16181c` (Solid graphite) | Border `1px solid #242830` | Padding 24px uniform.
  * Card 01 Content: "4+ Production Architectures Structured Natively".
  * Card 02 Content: "IT Department Head Leadership & Governance".
  * Card 03 Content: "100% Hydration & Core Web Vitals Stability".

### Section 04: Architecture Assembly
* **Structural Layout:** Left 6 columns host text explanations and list items; right 6 columns serve as spatial background padding grids.
* **Padding Constraints:** `padding-top: 100px` | `padding-bottom: 100px`.
* **Skin Application:**
  * Title Block: Heading-Secondary (`#f4f5f6`, 36px). Text: "Orchestrating the Application Layer".
  * List Elements Stack: 4 distinct horizontal panel blocks, background `#16181c`, bounding borders `#242830`.
  * Panel Text Arrays: `[01: Frontend Layers Component Matrix]`, `[02: API Router Path Configurations]`, `[03: Relational Database Core Structures]`, `[04: Production Deployment Infrastructure]`.

### Section 05: Selected Projects Grid
* **Structural Layout:** 2x2 symmetrical masonry layout grid mapping exactly 4 verified project blocks.
* **Padding Constraints:** `padding-top: 120px` | `padding-bottom: 120px`.
* **Skin Application:**
  * Component Wrapper: Standalone HTML `article` panels, background `#16181c`, bounding border `1px solid #242830`, internal layout padding 24px. Hover maps an active left-edge indicator bar glowing with `#00e5ff`.
  * Card 01 (Enactus Portal v4.0): Problem, Role, Stack tags (`[Next.js App Router]`, `[React]`, `[TypeScript]`, `[Supabase / SQL]`), and Outcomes detailed elegantly using high-contrast text layers.
  * Card 02 (AI Job Board Platform): Showcases solo client-side caching optimizations and real-time backend query configurations.
  * Card 03 (GDG Real Estate Module): Details mobile viewport thread rendering array filters.
  * Card 04 (Lawyer Static Showcase): Records RTL Arabic static engine symmetry metrics.

### Section 06: Deep Case Study Preview Bridge
* **Structural Layout:** Single-column layout block centered cleanly within viewport dimensions.
* **Padding Constraints:** `padding-top: 140px` | `padding-bottom: 140px` | `background: #16181c`.
* **Skin Application:**
  * Header Text: `#f4f5f6` | Medium, 36px. Text: "De-Constructing the Engineering Decisions".
  * Central Conversion CTA Button: Bounding height 48px, solid `#f4f5f6` base, text labels use Sans-serif bold. Text: "Access Technical Case Studies".

### Section 07: Stack Engine
* **Structural Layout:** Horizontal capability index row partitions stratified vertically by expertise domain.
* **Padding Constraints:** `padding-top: 100px` | `padding-bottom: 100px`.
* **Skin Application:**
  * Section Title: `#f4f5f6` | 36px. Text: "Engineered Capabilities Matrix".
  * Tech Tags (Chips): Background `#0e0f11`, bounding borders `#242830`, height 32px, full rounded capsule radii, typography `font-family-mono` at 13px.
  * Categorization: Frontend Row (React, Next.js, TypeScript, Tailwind) | Data Row (Supabase, PostgreSQL, Schema Layouts) | Product Leadership Row (Technical Track Management, Resource Lifecycle Optimization).

### Section 08: Workflow Pipeline
* **Structural Layout:** 3-step horizontal tracking row timeline linked via fine-wire vectors.
* **Padding Constraints:** `padding-top: 100px` | `padding-bottom: 100px`.
* **Skin Application:**
  * Title Block: Heading-Secondary (`#f4f5f6`, 36px). Text: "The Discovery-to-Ship Protocol".
  * Step Containers: Background `#16181c`, borders `#242830`, width 30% width each.
  * Step Nodes: `[Step 01: Strategic Briefing & Mapping]` ----> `[Step 02: Logic Component Engineering]` ----> `[Step 03: Performance Auditing & Launch]`.

### Section 09: Experience Timeline
* **Structural Layout:** Vertical list stream tracking chronological progression branch lines.
* **Padding Constraints:** `padding-top: 120px` | `padding-bottom: 120px`.
* **Skin Application:**
  * Title Block: `#f4f5f6` | 36px. Text: "Professional Milestones".
  * Milestone Nodes: 24px internal layout padding, bounding wireframe indicator lines.
  * Entry 01: "Head of IT Department — Enactus CIC (Governed multi-cohort development frameworks and version 4.0 product architectures)".
  * Entry 02: "Freelance Frontend UI/UX Developer (Delivered localized static architectures)".
  * Entry 03: "Client Engagement Representative — Nahdet Masr".

### Section 10: Terminal Contact Portal
* **Structural Layout:** Central full-width layout box optimized for maximum terminal conversion clicks.
* **Padding Constraints:** `padding-top: 140px` | `padding-bottom: 140px` | `border-top: 1px solid #242830`.
* **Skin Application:**
  * Title Block: `#f4f5f6` | Bold, 36px. Text: "Initiate the Production Phase".
  * Target Body Text: `#9097a2` | 16px, line-height 1.6. Text: "Looking to integrate technical leadership and performance-optimized frontend engineering into your organization? Let's connect..."
  * Core Signal Beacon Integration: Integrates a sharp `#ffd700` (Gold) leadership callout panel to emphasize management value.
  * Action Touch Targets Array: 3 horizontal connection nodes, height 48px, text Sans-serif medium. Links point explicitly to `Secure LinkedIn Sync`, `Analyze GitHub Repository Wires`, and direct native client communication string `Transmit Electronic Mail (mailto:CONTACT_PENDING)`. Focus rings trigger Cyan contours.
