# Premium 3D Software Engineer Portfolio — Full Execution Plan v1

**Mode:** Solo dev or agent-assisted execution  
**Project type:** Premium cinematic 3D software engineer / full-stack developer portfolio  
**Core concept:** **The Product Systems Engine**  
**Primary goal:** Build a memorable, high-performance portfolio that instantly feels like a serious software engineer’s site, while staying clear, fast, accessible, and conversion-focused.  
**Execution style:** Phase-by-phase, ticket-by-ticket, with QA gates and lock rules.

---

## 0. How to Use This Plan With Agents

This document is designed to be used as the master execution plan for another coding/design/3D agent.

Each ticket should be executed as a separate unit of work.

For every ticket, the agent must return:

1. **Objective completed** — what was done.
2. **Files created/changed** — exact paths.
3. **Implementation notes** — key decisions.
4. **QA performed** — commands/tests/manual checks.
5. **Status** — one of:
   - `PASS — <ticket> implemented, QA-verified, and locked`
   - `QA BLOCKED — <ticket> implemented but not locked`
6. **Follow-up risk** — only if something remains uncertain.

Do not allow the agent to skip QA, add unplanned scope, redesign locked phases, or make hidden architectural decisions without recording them.

---

## 1. Strategic Summary

| Phase | Name | Tasks | Est. Days | Gate? |
|---|---:|---:|---:|---|
| 0 | Direction + Content Lock | 9 | 4–5 | Scope Lock |
| 1 | Storyboard & Scene Design | 6 | 4–5 | Story Lock |
| 2 | UX & IA | 7 | 5 | UX Lock |
| 3 | Visual Design System | 7 | 7–8 | **Design Lock** |
| 4 | 3D Art Direction & Asset Planning | 8 | 7–8 | 3D Scope Lock |
| 5 | R3F Technical Prototype | 9 | 9–10 | **Go/No-Go on 3D scope** |
| 6 | Homepage Implementation | 10 | 17–20 | Homepage Feature Lock |
| 7 | Case Studies Implementation | 8 | 9–11 | Content Proof Lock |
| 8 | Motion Polish | 7 | 6–7 | Motion Lock |
| 9 | Performance & Accessibility QA | 10 | 6–8 | **Launch Readiness** |
| 10 | Launch | 6 | 2 | Production Lock |
| **Total** |  | **87** | **~76–89 days** |  |

At full-time solo pace, this is roughly **15–18 weeks**. Part-time around client work, expect **8–11 months**.

The Phase 5 gate is critical: if the R3F prototype does not meet performance, fallback, and camera quality targets, reduce 3D scope before homepage implementation.

---

## 2. Core Creative Direction

### Main concept

The site is a cinematic engineering story called:

## The Product Systems Engine

The visitor enters a premium technical environment where a product system boots, assembles, proves credibility, reveals architecture, showcases project modules, explains workflow, and ends with a clean production handoff / contact CTA.

### Story arc

**Signal → System Boot → Identity → Proof → Architecture → Projects → Case Study Preview → Stack → Workflow → Timeline → Contact**

### What the first screen must communicate

Within 5 seconds, the visitor must understand:

- This is a software engineer / full-stack developer portfolio.
- The developer builds real product systems.
- The visual quality is premium.
- There is a clear CTA.
- The 3D is intentional, not random.

---

## 3. Non-Negotiable Scope Boundaries

### Must do

- Use real HTML content for all important text.
- Keep the navigation simple: `Work`, `Stack`, `Process`, `About`, `Contact`.
- Show CTA in the hero and final section.
- Build 3–5 selected projects, with at least 3 strong case studies.
- Keep 3D tied to software engineering concepts.
- Provide reduced-motion and WebGL fallback.
- Keep mobile readable and conversion-friendly.
- Test performance before full 3D build.

### Do not do

- Do not make game-like navigation.
- Do not hide content inside Canvas only.
- Do not use random 3D objects unrelated to engineering.
- Do not use generic hacker clichés: code rain, fake terminal overload, Matrix aesthetic.
- Do not add a heavy preloader that blocks content.
- Do not redesign locked UI during implementation.
- Do not add new libraries without documenting why.
- Do not introduce a CMS unless explicitly approved.
- Do not let motion reduce readability.
- Do not ship without fallback and reduced-motion QA.

---

## 4. Global Performance Budget

These budgets should be confirmed or adjusted in Phase 4 and Phase 5.

| Area | Target |
|---|---:|
| Initial page content visibility | Under 1.5s on good desktop connection |
| Hero usable content | Should appear before full 3D finishes loading |
| Initial 3D payload | Target 3–5 MB max compressed |
| Individual GLB asset | Target under 1.5 MB where possible |
| Hero core GLB | Target under 2 MB compressed |
| Textures | Prefer 1K or lower; avoid 2K unless justified |
| Draw calls visible per scene | Target under 80 desktop; lower for mobile |
| Triangles visible per scene | Target under 150k desktop; simplified mobile tier |
| Desktop FPS | Target 55–60 FPS |
| Mid-tier laptop FPS | Target 45–60 FPS |
| Mid-tier mobile | Simplified stable experience; no heavy full journey required |
| Lighthouse Performance | Target 85+ minimum; 90+ preferred |
| Accessibility | Target 90+ minimum |
| CLS | Target below 0.1 |
| INP | Target below 200ms where possible |
| Reduced motion | Must preserve full content and CTA path |

Performance principle:

**Every 3D feature must earn its cost.**

---

## 5. Global Accessibility Rules

- All meaningful text must be HTML, not Canvas-only.
- Canvas must be decorative or have an accessible fallback description.
- Respect `prefers-reduced-motion`.
- Provide keyboard focus states.
- Use semantic headings and landmarks.
- Use skip links if layout is long.
- Ensure sufficient contrast.
- Do not rely on color alone for meaning.
- The portfolio must still make sense if WebGL is disabled.

---

## 6. Technical Architecture Direction

Recommended stack:

- Next.js
- React
- TypeScript
- React Three Fiber
- Three.js
- Drei
- GSAP / ScrollTrigger for scroll-linked motion
- Framer Motion only for DOM micro-interactions if needed
- Zustand for scroll/scene state
- MDX or typed content files for case studies
- Blender for assets
- Meshopt/Draco compression for GLB
- Optional KTX2/Basis textures if texture usage grows
- Vercel deployment

Recommended structure:

```txt
src/
  app/
    page.tsx
    work/[slug]/page.tsx
    layout.tsx
  components/
    ui/
    layout/
    sections/
    case-study/
  content/
    projects/
    site.ts
  r3f/
    PortfolioCanvas.tsx
    SceneManager.tsx
    scenes/
    camera/
    assets/
    materials/
    fallback/
  store/
    scrollStore.ts
    sceneStore.ts
  styles/
    tokens.css
    globals.css
  lib/
    seo.ts
    deviceTier.ts
    motion.ts
public/
  models/
  images/
  og/
docs/
  portfolio/
    direction.md
    storyboard.md
    ux.md
    visual-system.md
    3d-asset-budget.md
    r3f-architecture.md
    qa-reports/
```

Actual paths may change depending on the app setup, but the agent must document the final architecture.

---

## 7. Scene Map: Story, Camera, Geometry, UX Purpose

| Scene | Name | UX Purpose | Camera | Geometry | Main Output |
|---:|---|---|---|---|---|
| 01 | System Boot / Hero | Immediate wow + clear identity | Wide → dolly-in → slight orbit | signal line, nodes, assembling core rings | role, positioning, CTA |
| 02 | Identity Lock | Explain developer mindset | medium close-up, lateral reveal | core opens into product/architecture/UI layers | about statement |
| 03 | Proof Scan | Fast credibility | top-down scan pan | scan beam, metric cards, verified nodes | years, stack, shipped work, links |
| 04 | Architecture Assembly | Show full-stack thinking | top-down → 35° architecture angle | UI plane, API nodes, database layer, deployment orbit | architecture story |
| 05 | Project Modules | Showcase real work | side-track between modules | 3–5 capsules, preview planes, stack chips | selected projects |
| 06 | Deep Case Study Preview | Bridge wow to proof | push-in through project module | internal UI/backend/data/deploy view | case-study CTA |
| 07 | Stack Engine | Clarify capabilities | vertical reveal around layers | frontend/backend/data/devops/3D plates | stack categories |
| 08 | Build Pipeline | Show workflow | side tracking following signal | discover→ship pipeline nodes | process |
| 09 | Experience Timeline | Show career growth | rail movement with parallax | commit nodes, year markers, branch lines | timeline |
| 10 | Production Launch / Contact | Convert | pullback → stable final composition | connected full system, calm final pulse | contact CTA |

---

## 8. Global Ticket Definition of Done

A ticket is not complete unless:

- Its stated deliverable exists.
- Expected files/outputs are present or the deviation is documented.
- Acceptance criteria pass.
- Phase-specific QA is completed where applicable.
- No scope boundary was violated.
- Responsive/mobile impact was considered.
- Reduced-motion/fallback impact was considered when relevant.
- The agent provides a clear PASS or QA BLOCKED report.

---

# Phase 0 — Direction + Content Lock

**Goal:** Lock concept, references, scope, content, and proof material before design/code.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P0-T01 | Final creative direction lock | 0.5d | — | `docs/portfolio/direction.md` | Concept, audience, goal, tone, and non-goals are explicit. |
| P0-T02 | Reference mix lock | 0.5d | P0-T01 | `docs/portfolio/reference-board.md` | Each reference says what to borrow and what to avoid. |
| P0-T03 | Must-have / should-have / premium scope split | 0.5d | P0-T01 | `docs/portfolio/scope-tiers.md` | Scope has clear MVP, enhanced, premium tiers. |
| P0-T04 | Content inventory checklist | 0.5d | P0-T03 | `docs/portfolio/content-inventory.md` | Projects, screenshots, links, copy, CV, socials, assets listed with status. |
| P0-T05 | Risk register | 0.5d | P0-T03 | `docs/portfolio/risk-register.md` | Risks include performance, accessibility, scope creep, content gaps, 3D complexity. |
| P0-T06 | Final project selection | 0.5d | P0-T04 | `docs/portfolio/project-selection.md` | 3–5 selected projects chosen; top 3 marked as case studies. |
| P0-T07 | Case-study raw material collection | 1d | P0-T06 | `docs/portfolio/case-study-inputs.md` | Each case study has problem, role, stack, screenshots, outcome, links. |
| P0-T08 | Personal positioning copy draft | 0.5d | P0-T01 | `docs/portfolio/positioning-copy.md` | Hero line, about statement, CTA labels drafted. |
| P0-T09 | Execution rules + agent handoff format | 0.5d | P0-T01 | `docs/portfolio/agent-handoff-rules.md` | PASS/QA BLOCKED format, no-go rules, QA expectations documented. |

**Phase QA checklist:**

- Scope is clear enough that a new agent can continue without guessing.
- There are enough real projects/case-study inputs to support the portfolio.
- No visual/3D work begins before content weaknesses are visible.

**Phase lock:** `Scope Lock`

---

# Phase 1 — Storyboard & Scene Design

**Goal:** Turn the portfolio into a cinematic software-engineering story before UI or code.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P1-T01 | Narrative arc write-up | 0.5d | P0-T01 | `docs/portfolio/storyboard.md` | Story is clearly “signal → shipped product”. |
| P1-T02 | Scene list + purpose | 1d | P1-T01 | `docs/portfolio/scene-table.md` | All 10 scenes have purpose, story, UX goal, done criteria. |
| P1-T03 | Camera path draft | 1d | P1-T02 | `docs/portfolio/camera-path.md` | Every scene has start/move/end camera notes; no game camera. |
| P1-T04 | Geometry vocabulary | 0.5d | P1-T02 | `docs/portfolio/geometry-vocabulary.md` | Allowed/avoided forms documented; all forms feel software-engineering relevant. |
| P1-T05 | Scroll progress map | 1d | P1-T03 | `docs/portfolio/scroll-progress-map.md` | Scroll percentages map to scenes, camera states, and content reveals. |
| P1-T06 | Mobile/reduced-motion equivalent | 1d | P1-T02 | `docs/portfolio/mobile-story-fallback.md` | Each scene has simplified mobile and reduced-motion equivalent. |

**Phase QA checklist:**

- The site would still make sense as a static storyboard.
- Every scene has a reason to exist.
- Camera motion is scroll-linked, reversible, and non-confusing.
- No scene depends on hidden interaction to reveal key content.

**Phase lock:** `Story Lock`

---

# Phase 2 — UX & IA

**Goal:** Make sure the portfolio works as content and conversion UX even without 3D.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P2-T01 | Sitemap | 0.5d | P0-T04 | `docs/portfolio/sitemap.md` or Figma sitemap | Routes and sections are clear; no unnecessary pages. |
| P2-T02 | Homepage wireframe | 1d | P1-T02, P2-T01 | Figma low-fi or `docs/portfolio/homepage-wireframe.md` | All major sections are scannable without 3D. |
| P2-T03 | Project card UX | 0.5d | P2-T02 | Figma component/wireframe | Project cards show problem, role, stack, result, CTA. |
| P2-T04 | Case-study template UX | 0.5d | P2-T01 | Figma template/wireframe | Template supports challenge, constraints, architecture, UX, engineering, result. |
| P2-T05 | CTA flow | 0.5d | P2-T02 | `docs/portfolio/cta-flow.md` | Hero, project, case-study, and footer CTAs are mapped. |
| P2-T06 | Mobile wireframe | 1d | P2-T02, P2-T04 | Figma mobile screens | Mobile path is readable, tappable, and not 3D-dependent. |
| P2-T07 | Content-first UX validation | 1d | P2-T02–T06 | `docs/portfolio/ux-validation.md` | Wireframes reviewed with 3D hidden; content and CTA still work. |

**Phase QA checklist:**

- The homepage is understandable with Canvas removed.
- The CTA appears in the first viewport.
- Project cards have enough substance.
- Case-study template proves real engineering decisions.
- Mobile is not an afterthought.

**Phase lock:** `UX Lock`

---

# Phase 3 — Visual Design System  *(Gate: Design Lock)*

**Goal:** Build the premium UI language. Phase 6 should not require new design decisions.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P3-T01 | Color system | 0.5d | P0-T01 | Figma tokens + `docs/portfolio/visual-system.md` | Graphite/charcoal/off-white/cyan/green/gold tokens defined with contrast notes. |
| P3-T02 | Typography system | 0.5d | P0-T01 | Figma type styles + type scale doc | Heading/body/mono styles defined; body text remains readable. |
| P3-T03 | Component system | 1.5d | P3-T01, P3-T02 | Figma components | Buttons, cards, chips, nav, panels, project cards, CTAs created. |
| P3-T04 | Hero visual exploration | 1d | P1-T03, P3-T01 | 2–3 concept frames | At least one direction clearly says “software engineer” in first frame. |
| P3-T05 | Homepage hi-fi design | 2d | P2-T02, P3-T03, P3-T04 | Figma homepage desktop | All 10 scenes’ HTML layer designed; CTA visible; no Canvas-only meaning. |
| P3-T06 | Case-study hi-fi design | 1d | P2-T04, P3-T03 | Figma case-study page | Editorial reading flow is clear; architecture and result sections supported. |
| P3-T07 | Responsive pass | 1d | P3-T05, P3-T06 | Figma tablet/mobile screens | Key screens work on desktop, tablet, mobile. |

**Phase QA checklist:**

- Hero is readable in first viewport.
- CTA is visible and visually prioritized.
- Typography scale is consistent.
- Contrast is acceptable for dark UI.
- Mobile design exists for homepage and case studies.
- No new visual decisions are needed before implementation.

**Phase lock:** `Design Lock`

---

# Phase 4 — 3D Art Direction & Asset Planning

**Goal:** Design the actual 3D world and performance budget before building it.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P4-T01 | System core sketches | 1d | P1-T04 | `docs/portfolio/3d-core-concepts.md` + renders/sketches | 2–3 directions; each tied to software systems. |
| P4-T02 | Geometry blockout | 1d | P4-T01 | Blender blockout screenshots or `.blend` | Core, modules, layers, and camera scale roughly established. |
| P4-T03 | Scene object list | 0.5d | P1-T02, P4-T02 | `docs/portfolio/3d-asset-list.md` | Every scene lists needed objects and reuse opportunities. |
| P4-T04 | Material direction | 0.5d | P4-T01 | `docs/portfolio/3d-materials.md` | Metal/glass/emissive materials defined without over-texturing. |
| P4-T05 | Lighting direction | 0.5d | P4-T01 | `docs/portfolio/3d-lighting.md` | Key/rim/emissive lighting strategy per scene documented. |
| P4-T06 | Numeric asset performance budget | 0.75d | P4-T03 | `docs/portfolio/3d-performance-budget.md` | Poly, texture, GLB size, draw call, and mobile budget numbers documented. |
| P4-T07 | Blender low-poly prototype | 2d | P4-T02, P4-T04 | `public/models/prototypes/system-core.glb` and screenshots | Core + 1 project capsule export successfully and stay within budget draft. |
| P4-T08 | 3D asset manifest + compression plan | 0.75d | P4-T06, P4-T07 | `docs/portfolio/3d-asset-manifest.md` | Compression/loading/fallback strategy defined for each asset. |

**Phase QA checklist:**

- 3D forms feel like product systems, not sci-fi decoration.
- Reusable assets are identified.
- Performance numbers exist before R3F implementation.
- Mobile simplification plan exists.
- No high-poly asset direction is approved without budget impact.

**Phase lock:** `3D Scope Lock`

---

# Phase 5 — R3F Technical Prototype  *(Gate: Go/No-Go on 3D scope)*

**Goal:** De-risk Canvas architecture, scroll state, camera motion, fallback, and performance before the full build.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P5-T01 | Next.js + R3F project setup | 0.5d | — | Repo scaffold, package setup | App runs locally; lint/typecheck/build scripts are available or documented. |
| P5-T02 | Technical architecture document | 0.75d | P5-T01 | `docs/portfolio/r3f-architecture.md` | Routes, content model, Canvas ownership, scene state, fallback strategy defined. |
| P5-T03 | Persistent Canvas prototype | 1d | P5-T01, P5-T02 | `src/r3f/PortfolioCanvas.tsx` | Single Canvas persists across homepage scroll; no multiple Canvas anti-pattern. |
| P5-T04 | Scroll progress state | 1d | P5-T03 | `src/store/scrollStore.ts` or equivalent | Scroll % tracked consistently; works on resize; no jumpy state. |
| P5-T05 | Camera path prototype | 1.5d | P5-T04, P4-T07 | `src/r3f/camera/` prototype files | Camera moves through 2–3 scenes smoothly, reversibly, without snapping/jitter. |
| P5-T06 | Scene switching prototype | 1.5d | P5-T05 | `src/r3f/scenes/SceneManager.tsx` | Scene states assemble/disassemble without flicker or unexpected object persistence. |
| P5-T07 | Reduced-motion fallback prototype | 0.75d | P5-T06 | `src/r3f/fallback/` + reduced-motion path | OS reduced-motion disables heavy camera journey and preserves content. |
| P5-T08 | Asset loading/device-tier prototype | 1d | P5-T06, P4-T08 | `src/lib/deviceTier.ts`, loading notes | Low/mid/high tier behavior defined; mobile simplified path tested. |
| P5-T09 | Performance benchmark | 1d | P5-T06, P5-T08 | `docs/portfolio/qa-reports/prototype-performance.md` | FPS and load notes recorded; go/no-go recommendation made. |

**Phase QA checklist:**

- `npm run lint` passes if configured.
- `npm run typecheck` passes if configured.
- `npm run build` passes.
- Prototype supports reduced motion.
- Mid-tier mobile or simulated low-tier device is tested.
- Scroll is reversible.
- Camera does not snap.
- If FPS is not acceptable, scope reduction is documented before Phase 6.

**Phase gate:** `Go/No-Go on 3D scope`

---

# Phase 6 — Homepage Implementation

**Goal:** Build the complete homepage, scene by scene. Each scene is a mini-deliverable.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P6-T01 | Hero / System Boot | 2d | P5-T09, P3-T04 | Hero section + Scene 01 files | User understands role and CTA within 5 seconds; fallback works. |
| P6-T02 | Identity section | 1.5d | P6-T01 | Scene 02 + HTML section | Developer mindset is clear; not a generic About block. |
| P6-T03 | Proof strip | 1d | P6-T01 | Metrics/proof section | Credibility can be scanned in under 10 seconds. |
| P6-T04 | Architecture assembly | 2d | P6-T01, P4-T03 | Scene 04 + architecture content | Clearly visualizes frontend/API/data/deployment layers. |
| P6-T05 | Selected projects | 2.5d | P6-T01, P2-T03 | Project modules + DOM project cards | Projects are readable, clickable, and not hidden inside 3D. |
| P6-T06 | Deep Case Study Preview | 1.5d | P6-T05, P7-T01 draft if available | Scene 06 transition/preview | Bridges project module to case-study proof; includes clear case-study CTA. |
| P6-T07 | Stack engine | 1.5d | P6-T01 | Stack section + Scene 07 | Stack grouped by capability, not a random logo wall. |
| P6-T08 | Workflow pipeline | 1.5d | P6-T01 | Process section + Scene 08 | Discover→Ship process is clear and visually connected. |
| P6-T09 | Experience timeline | 1.5d | P6-T01 | Timeline section + Scene 09 | Career/project progress shown without CV dump. |
| P6-T10 | Final CTA / footer | 1.5d | P6-T01 | Contact section + Scene 10 | Final CTA is prominent; email/GitHub/LinkedIn/CV available. |

**Suggested implementation files:**

```txt
src/components/sections/HeroSection.tsx
src/components/sections/IdentitySection.tsx
src/components/sections/ProofStrip.tsx
src/components/sections/ArchitectureSection.tsx
src/components/sections/ProjectsSection.tsx
src/components/sections/CaseStudyPreviewSection.tsx
src/components/sections/StackSection.tsx
src/components/sections/WorkflowSection.tsx
src/components/sections/TimelineSection.tsx
src/components/sections/FinalCTASection.tsx
src/r3f/scenes/Scene01SystemBoot.tsx
src/r3f/scenes/Scene02IdentityLock.tsx
src/r3f/scenes/Scene03ProofScan.tsx
src/r3f/scenes/Scene04ArchitectureAssembly.tsx
src/r3f/scenes/Scene05ProjectModules.tsx
src/r3f/scenes/Scene06CaseStudyPreview.tsx
src/r3f/scenes/Scene07StackEngine.tsx
src/r3f/scenes/Scene08BuildPipeline.tsx
src/r3f/scenes/Scene09ExperienceTimeline.tsx
src/r3f/scenes/Scene10FinalCTA.tsx
```

**Phase QA checklist:**

- Homepage content works with Canvas disabled.
- All CTAs are clickable.
- Mobile layout works.
- Reduced motion still feels intentional.
- Scroll direction is reversible.
- No scene causes text overlap or readability loss.
- No unapproved 3D objects are introduced.

**Phase lock:** `Homepage Feature Lock`

---

# Phase 7 — Case Studies Implementation

**Goal:** Build editorial proof pages that show real technical thinking.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P7-T01 | Case-study template | 2d | P3-T06, P6-T05 | `src/components/case-study/` template files | Template supports hero, problem, constraints, architecture, UX, engineering, result, CTA. |
| P7-T02 | Case-study content model | 0.5d | P7-T01 | `src/content/projects/` schema/types | Fields are typed and support metadata, links, screenshots, stack, result. |
| P7-T03 | Case study page 1 | 1.5d | P7-T02, P0-T07 | `src/content/projects/<slug-1>.mdx` | Page has clear problem, decisions, result, screenshots/diagrams. |
| P7-T04 | Case study page 2 | 1.5d | P7-T02, P0-T07 | `src/content/projects/<slug-2>.mdx` | Same quality bar as page 1. |
| P7-T05 | Case study page 3 | 1.5d | P7-T02, P0-T07 | `src/content/projects/<slug-3>.mdx` | Same quality bar as page 1. |
| P7-T06 | Case-study navigation | 0.5d | P7-T03 | Prev/next/back components | Navigation is clear and never traps the user. |
| P7-T07 | SEO metadata | 0.5d | P7-T03 | `src/lib/seo.ts`, OG metadata/images | Titles/descriptions/OG images exist for all key pages. |
| P7-T08 | Case-study content QA pass | 1d | P7-T03–T07 | `docs/portfolio/qa-reports/case-study-content-qa.md` | Each case study proves problem-solving, not just screenshots. |

**Phase QA checklist:**

- Each case study has a real challenge and result.
- Architecture/engineering decisions are explained clearly.
- Non-technical readers can understand business value.
- Technical readers can understand system choices.
- Pages are readable, responsive, and SEO-ready.

**Phase lock:** `Content Proof Lock`

---

# Phase 8 — Motion Polish

**Goal:** Push toward award-level feel without sacrificing clarity or performance.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P8-T01 | Hero boot timing | 1d | P6-T01 | Tuned Scene 01 timing | Signal→assembly→UI reveal feels premium and not slow. |
| P8-T02 | Scroll transition polish | 1.5d | P6-T01–T10 | Camera/motion tuning files | Scene transitions are smooth, reversible, and non-jarring. |
| P8-T03 | Project hover interactions | 1d | P6-T05 | Hover/active states | Hover adds clarity, not distraction; keyboard path unaffected. |
| P8-T04 | Stack layer motion | 0.5d | P6-T07 | Tuned Scene 07 | Layer reveal is readable and not logo-wall-like. |
| P8-T05 | Workflow signal motion | 0.5d | P6-T08 | Tuned Scene 08 | Signal pacing communicates process steps clearly. |
| P8-T06 | CTA micro-interactions | 0.5d | P6-T10 | Button/CTA motion | CTAs feel tactile but remain accessible. |
| P8-T07 | Reduced-motion polish | 1d | P5-T07, P8-T01–T06 | Reduced-motion QA notes | Reduced-motion version feels intentional, not broken. |

**Phase QA checklist:**

- Motion never makes text hard to read.
- Scroll-linked motion is reversible.
- No continuous idle animation drains performance unnecessarily.
- Reduced-motion version remains complete.
- Motion adds meaning to the engineering story.

**Phase lock:** `Motion Lock`

---

# Phase 9 — Performance & Accessibility QA  *(Gate: Launch Readiness)*

**Goal:** Make the site production-ready, not just visually impressive.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P9-T01 | Lighthouse audit | 0.5d | P7-T07, P8-T02 | `docs/portfolio/qa-reports/lighthouse.md` | All key pages audited; issues documented. |
| P9-T02 | Core Web Vitals audit | 0.5d | P9-T01 | `docs/portfolio/qa-reports/cwv.md` | LCP/CLS/INP checked; failures fixed or documented. |
| P9-T03 | 3D asset optimization | 1d | P9-T02 | optimized `.glb`/textures + report | GLBs/textures compressed; no unbudgeted heavy assets remain. |
| P9-T04 | Mobile performance test | 0.5d | P9-T03 | `docs/portfolio/qa-reports/mobile-performance.md` | Real or realistic mid-tier device test completed. |
| P9-T05 | Keyboard navigation QA | 0.5d | P7-T06 | `docs/portfolio/qa-reports/keyboard.md` | Tab order, focus states, skip links checked. |
| P9-T06 | Reduced-motion QA | 0.5d | P8-T07 | `docs/portfolio/qa-reports/reduced-motion.md` | OS setting respected across site. |
| P9-T07 | Cross-browser QA | 1d | P9-T03 | `docs/portfolio/qa-reports/cross-browser.md` | Chrome, Firefox, Safari/WebKit paths checked. |
| P9-T08 | Fallback QA | 0.5d | P9-T07 | `docs/portfolio/qa-reports/webgl-fallback.md` | WebGL disabled/unsupported path still communicates full portfolio. |
| P9-T09 | SEO/social preview QA | 0.5d | P7-T07 | `docs/portfolio/qa-reports/seo-social.md` | Metadata, OG images, titles, descriptions checked. |
| P9-T10 | Final regression pass | 1d | P9-T01–T09 | `docs/portfolio/qa-reports/final-regression.md` | Full click-through desktop/mobile; no critical regressions. |

**Phase QA checklist:**

- `npm run build` passes.
- `npm run lint` passes if configured.
- `npm run typecheck` passes if configured.
- All key pages are tested.
- WebGL fallback works.
- Reduced motion works.
- Mobile CTA path works.
- No launch blocker remains unresolved.

**Phase gate:** `Launch Readiness`

---

# Phase 10 — Launch

**Goal:** Ship cleanly and make the portfolio ready to share.

| ID | Task | Est. | Depends | Expected files/outputs | Acceptance criteria |
|---|---:|---|---|---|
| P10-T01 | Production build | 0.25d | P9-T10 | Build output + build log | Production build passes without critical warnings. |
| P10-T02 | Vercel deployment | 0.25d | P10-T01 | Live deployment URL | Deployment succeeds; preview works. |
| P10-T03 | Domain setup | 0.25d | P10-T02 | Custom domain live | DNS/SSL valid. |
| P10-T04 | Analytics setup | 0.25d | P10-T02 | Analytics live | Page views/events verified without privacy-breaking setup. |
| P10-T05 | Final production smoke test | 0.5d | P10-T03, P10-T04 | `docs/portfolio/qa-reports/prod-smoke-test.md` | Desktop/mobile full click-through passes on production URL. |
| P10-T06 | Launch checklist | 0.5d | P10-T05 | `docs/portfolio/launch-checklist.md` | Social links, portfolio listings, CV link, Awwwards/FWA prep if needed. |

**Phase QA checklist:**

- Production URL works.
- Contact CTA works.
- CV/download links work.
- GitHub/LinkedIn links work.
- Analytics is recording.
- Mobile homepage and case studies work.
- No staging/test text remains.

**Phase lock:** `Production Lock`

---

## 9. Agent Ticket Prompt Template

Use this template when sending one ticket to another agent.

```md
You are implementing ticket <ID> from the Premium 3D Software Engineer Portfolio Execution Plan.

## Ticket
<ID> — <Task Name>

## Objective
<What this ticket must achieve>

## Scope
- Allowed work:
  - ...
- Not allowed:
  - Do not redesign locked decisions.
  - Do not add unapproved libraries.
  - Do not change unrelated files.
  - Do not hide key content inside Canvas only.

## Expected files / outputs
- <path or document>
- <path or document>

## Acceptance criteria
- ...
- ...

## QA required
Run/check:
- npm run lint, if configured
- npm run typecheck, if configured
- npm run build, when implementation touches app code
- Manual responsive check, when UI is affected
- Reduced-motion/fallback check, when motion/3D is affected

## Required final report
Return:
- Files changed
- What was implemented
- QA performed
- Any blockers
- Final status exactly as:
  PASS — <ticket> implemented, QA-verified, and locked
  or
  QA BLOCKED — <ticket> implemented but not locked
```

---

## 10. Assumptions

- The portfolio is for a software engineer / full-stack developer.
- 3D is low-poly/stylized/premium, not heavy cinematic VFX.
- 3 case studies are the minimum strong proof target.
- The project is built by a solo dev or assisted by agents.
- If direction, design, or 3D scope changes after locks, add 20–30% to remaining estimates.
- If high-fidelity sculpted 3D assets are requested later, Phase 4 and Phase 9 estimates increase significantly.

---

## 11. Final Quality Bar

Do not launch unless:

- First screen clearly says software engineer / full-stack developer.
- Hero has wow factor without hiding CTA.
- UI is premium and readable.
- UX works without 3D.
- Projects are strong and easy to understand.
- Case studies prove real technical thinking.
- 3D supports the story.
- Motion is smooth and restrained.
- Mobile experience works.
- Reduced motion works.
- WebGL fallback works.
- Performance is tested.
- Accessibility basics are covered.
- Final CTA/contact path is obvious.