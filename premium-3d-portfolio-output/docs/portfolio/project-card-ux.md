# Project Card UX & Micro-Information Hierarchy Specification — The Product Systems Engine

This specification codifies the micro-layout architecture, content sub-grids, and interactive focus states for the curated cohort of project cards, keeping the core metadata readable outside WebGL contexts.

## 1. Global Component Layout Rule
Every card component is structured as a standalone HTML `article` wrapper using an internal asymmetric 5-dimensional grid array. 

### The 5-Dimensional Grid Blueprint
1. **[Label-Mono] Core Metadata Block:** Upper edge; displays project name and role scope.
2. **[Field-Problem] Challenge Block:** Direct summary of the core friction layer.
3. **[Field-Stack] Dependency Block:** Horizontal array displaying system tags cleanly.
4. **[Field-Result] Outcome Block:** Highlight section detailing verified structural value.
5. **[Node-CTA] Interactive Trigger:** Anchor button managing cross-page routing focus.

---

## 2. Core Project Component Manifests

### Project Card 01: Enactus Portal v4.0
```txt
+-----------------------------------------------------------------------------------+
| ARTICLE WRAPPER (Focus Target Area / Minimum 44px Interaction Padding)            |
| +-------------------------------------------------------------------------------+ |
| | [Label-Mono]: PROJECT 01 // ENTERPRISE MANAGEMENT SYSTEM                      | |
| | [Title-Heading]: Enactus Portal v4.0                                          | |
| |                                                                               | |
| | [Problem]: Unstructured MongoDB NoSQL database foundation caused data leaks,   | |
| |            complex queries, and loose technical track coordination.           | |
| |                                                                               | |
| | [Role]: Head of IT Department / Lead Web Developer                            | |
| |                                                                               | |
| | [Stack Tags]: [Next.js App Router]  [React]  [TypeScript]  [Supabase / SQL]   | |
| |                                                                               | |
| | [Result]: Re-architected relational schemas, integrated secure RBAC layers,   | |
| |           and established stable Vercel deployment pathways.                  | |
| |                                                                               | |
| | [Anchor-CTA Link Target]: "Access Case Study" ----> (/work/enactus-portal)    | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

### Project Card 02: AI Job Board Platform

```txt
+-----------------------------------------------------------------------------------+
| ARTICLE WRAPPER (Focus Target Area)                                               |
| +-------------------------------------------------------------------------------+ |
| | [Label-Mono]: PROJECT 02 // AUTOMATED APPLICATION ENGINE                      | |
| | [Title-Heading]: AI Job Board Platform                                        | |
| |                                                                               | |
| | [Problem]: Dynamic sourcing engines experience heavy connection latency and   | |
| |            layout stutters when executing concurrent multi-criteria queries.  | |
| |                                                                               | |
| | [Role]: Solo Systems UI/UX & Frontend Developer                               | |
| |                                                                               | |
| | [Stack Tags]: [Next.js]  [React]  [TypeScript]  [Supabase Cloud Engine]       | |
| |                                                                               | |
| | [Result]: Implemented client-side filtering logic and cache optimization     | |
| |           pipelines to eliminate layout hydration stutters completely.        | |
| |                                                                               | |
| | [Anchor-CTA Link Target]: "Access Case Study" ----> (/work/ai-job-board)      | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

### Project Card 03: GDG Real Estate Filtering Module

```txt
+-----------------------------------------------------------------------------------+
| ARTICLE WRAPPER (Focus Target Area)                                               |
| +-------------------------------------------------------------------------------+ |
| | [Label-Mono]: PROJECT 03 // ECOSYSTEM INTEGRATION COMPONENT                   | |
| | [Title-Heading]: GDG Real Estate Filter Module                                | |
| |                                                                               | |
| | [Problem]: Real estate search views suffer heavy main-thread rendering lag on | |
| |            mobile viewports when sorting dense algorithmic geometric indexes. | |
| |                                                                               | |
| | [Role]: Specialized Frontend Logic & Component Engineer                       | |
| |                                                                               | |
| | [Stack Tags]: [React]  [Next.js]  [Tailwind CSS]  [JavaScript ES6+]           | |
| |                                                                               | |
| | [Result]: Structured optimized client-side array manipulation functions       | |
| |           delivering fluid interaction states passing Core Web Vitals.        | |
| |                                                                               | |
| | [Anchor-CTA Link Target]: "Access Case Study" ----> (/work/gdg-filter-module) | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

### Project Card 04: Lawyer Showcase Application

```txt
+-----------------------------------------------------------------------------------+
| ARTICLE WRAPPER (Focus Target Area)                                               |
| +-------------------------------------------------------------------------------+ |
| | [Label-Mono]: PROJECT 04 // STATIC INTERFACE PIPELINE                         | |
| | [Title-Heading]: Lawyer Static Showcase                                       | |
| |                                                                               | |
| | [Problem]: Static freelance architectures sacrifice internationalization scale| |
| |            or introduce cumulative layout shifts during localized loads.      | |
| |                                                                               | |
| | [Role]: Solo UI/UX and Web Developer                                          | |
| |                                                                               | |
| | [Stack Tags]: [Next.js App Router]  [Tailwind CSS]  [Semantic HTML Layer]     | |
| |                                                                               | |
| | [Result]: Engineered clean Right-to-Left (RTL) Arabic semantic layout engines | |
| |           securing perfect layout symmetry and lightning-fast text delivery.   | |
| |                                                                               | |
| | [Anchor-CTA Link Target]: "Analyze Repository" ----> (CONTENT_PENDING)        | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 3. Focus Navigation & Touch Targets Constraints

* **Focus Outline Rules:** Active tab key navigation must trigger a crisp outline ring border (`outline: 2px solid #00ffff; outline-offset: 4px`) around the active link component instantly.
* **Ergonomic Target Bounds:** All interactive button elements map out a minimum height dimension threshold of `48px` on touch displays to optimize click registration accuracy.
