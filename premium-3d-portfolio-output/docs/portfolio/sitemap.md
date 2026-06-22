# Information Architecture & Sitemap Specification — The Product Systems Engine

This specification codifies the global public directory layout, structural navigation nodes, and Next.js App Router tree mapping for the premium portfolio framework.

## 1. Programmatic Next.js App Router Mapping
The application file system hierarchy translates structural page contexts directly into standard Next.js App Router directory blueprints.

```txt
src/
└── app/
    ├── layout.tsx             # Global Root Shell Component (Persistent Layout, Navigation & HTML Body)
    ├── page.tsx               # Master Homepage Entry (Houses the 10 Storytelling Sections & WebGL Container)
    └── work/
        └── [slug]/
            └── page.tsx       # Dynamic Content Route Engine (Processes the 3 Locked Editorial Case Studies)
```

---

## 2. Global Navigation Shell & Landing Section Mapping

The top-level shell layout mounts a persistent, accessible header layer managing focus jumps directly onto specific viewport section anchors along the homepage scroll timeline.

### Public Menu Taxonomy

* **`Work` Anchor:** Maps to Section 05 (Project Modules Matrix) & Section 06 (Case Study Preview Bridge).
* **`Stack` Anchor:** Maps to Section 07 (Engine Capabilities Matrix).
* **`Process` Anchor:** Maps to Section 08 (Discovery-to-Ship Build Pipeline).
* **`About` Anchor:** Maps to Section 02 (Identity Lock Profile) & Section 09 (Experience Timeline).
* **`Contact` Anchor:** Maps to Section 10 (Production Terminal Handoff Form).

### Homepage Content Stack Chronology

1. **Section 01: `/ #hero`** — System Boot Frame (Branding positioning, Conversion hooks).
2. **Section 02: `/ #identity`** — Personal Mindset Overview (Technical leadership, Business framework context).
3. **Section 03: `/ #proof`** — Rapid Credibility Strip (4+ production architectures metrics).
4. **Section 04: `/ #architecture`** — System Layer Allocation Panel (Frontend down to Deployment).
5. **Section 05: `/ #projects`** — Curated Cohort Grid (Links targeting dynamic sub-pages).
6. **Section 06: `/ #case-bridge`** — Deep Technical Proof Bridge Selector.
7. **Section 07: `/ #stack`** — Framework Dependency Breakdown (React, Next.js, TypeScript, SQL chips).
8. **Section 08: `/ #process`** — Discovery-to-Ship Operational Pipeline Nodes.
9. **Section 09: `/ #timeline`** — Chronological Leadership Milestones (IT Head track governance).
10. **Section 10: `/ #contact`** — Production Handoff Portal (Terminal CTAs, Direct connections).

---

## 3. Dynamic Sub-Route Mapping (The Editorial Core)

Dynamic parameters parsed within the `/work/[slug]` path map cleanly to the 3 officially locked professional software engineering case studies.

* **`/work/enactus-portal`**
  * Target View: Editorial breakdown detailing NoSQL MongoDB to relational SQL schema re-architecting and RBAC integration.

* **`/work/ai-job-board`**
  * Target View: Detailed system proof highlighting client-side caching optimizations and real-time backend filtering logic.

* **`/work/gdg-filter-module`**
  * Target View: Performance case study tracing mobile thread array manipulation optimizations and Core Web Vitals profiling.
