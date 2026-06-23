# EXECUTION TASK BREAKDOWN
## Cinematic 3D Full Stack Developer Portfolio — "The System Behind Every Screen"

Derived from `PLAN.md`. Phase numbers, names, and completion-message contracts are preserved exactly so agent output (`PASS — Phase N ...`) stays valid. Each phase is decomposed into atomic, ordered task headlines. Tasks marked **[ADD]** are senior-engineering additions not explicit in the original plan — they close implementation gaps (asset pipeline, state schema, deterministic camera math, measurable QA) without altering scope, creative concept, or scene count.

Sequencing rule inherited from the source plan: **a phase cannot start until the previous phase's Lock Criteria pass.** This is a strictly linear gate chain, not a parallel sprint board.

---

## PHASE 0 — EXPERIENCE BLUEPRINT LOCK
*Effort: S · Depends on: nothing (entry point) · Gate: blueprint is single source of truth*

| # | Task Headline |
|---|---|
| 0.1 | Consolidate 8-scene narrative (purpose, story meaning, content, visuals) into `experience-blueprint.md` |
| 0.2 | Lock motion grammar per scene — assign one of the 7 portal-transition variants to each scene, confirm no two adjacent scenes repeat the same variant |
| 0.3 | **[ADD]** Author TypeScript interfaces for all content config sections: `hero`, `architecture`, `projects`, `productThinking`, `responsivePerformance`, `systemCore`, `contact`, `navigation` |
| 0.4 | Document visual/material/color tokens (hex values, material presets) as a reference table |
| 0.5 | Convert accessibility + performance narrative rules into an enforceable checklist (not prose) |
| 0.6 | Self-audit blueprint against Section 1–11 hard rules (creative lock, scope rules, motion rules) |
| 0.7 | Produce `scene-lock-report.md` confirming 8/8 scenes documented, no scene is decorative-only |

---

## PHASE 1 — TECHNICAL SKELETON
*Effort: M · Depends on: Phase 0 locked · Gate: full journey scrollable with placeholders*

| # | Task Headline |
|---|---|
| 1.1 | **[ADD]** Verify/initialize tooling — TS strict mode, ESLint config, `npm run typecheck/lint/build/preview` scripts |
| 1.2 | Install core deps: `three`, `@react-three/fiber`, `@react-three/drei`, animation lib (GSAP/Framer Motion), `zustand` |
| 1.3 | Scaffold folder structure per Section 3.3 (or adapted equivalent preserving the same responsibility separation) |
| 1.4 | Build `PortfolioCanvas` / `CanvasRoot` with persistent `<Canvas>` and `CanvasFallback` error boundary |
| 1.5 | **[ADD]** Define Zustand store schema: `scrollProgress`, `activeSceneIndex`, `deviceTier`, `reducedMotion`, `webglSupported` |
| 1.6 | Build `ScrollProgressController` — raw scroll → normalized 0–1 progress, scene-segment mapping |
| 1.7 | Build `SceneProgressMapper` — global progress → per-scene local progress |
| 1.8 | Build `SceneManager` mounting/unmounting 8 placeholder scenes based on progress |
| 1.9 | Build `CameraDirector` skeleton — lerp between dummy positions per scene (no final keyframes yet) |
| 1.10 | Build `ContentOverlaySystem` root — DOM overlay synced to scene progress |
| 1.11 | Implement `ReducedMotionExperience` placeholder (toggle + simplified stacked DOM fallback) |
| 1.12 | Implement WebGL detection + `WebGLFallback` placeholder page |
| 1.13 | Implement dev-only `PerformanceMonitor` (FPS/stats overlay, stripped from prod build) |
| 1.14 | Manual full-journey scroll test (forward + reverse) across all 8 placeholders |
| 1.15 | QA gate: typecheck, lint, build, manual scroll pass |

---

## PHASE 2 — CAMERA + SCROLL JOURNEY PROTOTYPE
*Effort: M · Depends on: Phase 1 locked · Gate: full camera journey understandable pre-visuals*

| # | Task Headline |
|---|---|
| 2.1 | Author camera keyframe data structure (position/target/fov per scene-state: approach/enter/exit) |
| 2.2 | **[ADD]** Implement deterministic interpolation function (`progress → camera transform`) as a pure, unit-testable function — this is the single point of failure for reverse-scroll correctness |
| 2.3 | Implement per-scene **Approach** camera motion |
| 2.4 | Implement per-scene **Enter** (portal) camera motion |
| 2.5 | Implement per-scene **Exit** camera motion |
| 2.6 | Implement **Transfer** (inter-device) camera motion |
| 2.7 | Add clipping-prevention guards (near/far bounds, collision-safe paths through device geometry) |
| 2.8 | Confirm reverse-scroll safety — state derives purely from `scrollProgress`, never from accumulated deltas or elapsed time |
| 2.9 | Add dev-only scene/progress debug HUD |
| 2.10 | Manual QA across all 8 transitions, forward and backward, confirm no teleport/lost-scene states |
| 2.11 | QA gate: typecheck, lint, build, manual pass |

---

## PHASE 3 — SCENE 01 OPENING BUILD
*Effort: M · Depends on: Phase 2 locked · Gate: visual quality benchmark for whole portfolio*

| # | Task Headline |
|---|---|
| 3.1 | **[ADD]** Source/model seal-strike object — Blender export or procedural shader equivalent, optimized GLB if modeled |
| 3.2 | Implement code/data fragment assembly animation |
| 3.3 | Implement stamp impact + ripple/distortion shader effect |
| 3.4 | Implement logo reveal |
| 3.5 | Implement camera pullback revealing the main display device |
| 3.6 | Implement skip-intro affordance + hard max-duration cap so opening never blocks the user |
| 3.7 | Build reduced-motion variant (static logo reveal, no seal animation) |
| 3.8 | Visual QA against Section 4 color/material rules (no neon, no over-bloom) |
| 3.9 | QA gate + confirm clean Scene 01 → 02 handoff |

---

## PHASE 4 — SCENE 02 HERO DISPLAY BUILD
*Effort: M · Depends on: Phase 3 locked · Gate: identity clear without explanation*

| # | Task Headline |
|---|---|
| 4.1 | Build/import `MainDisplay` device geometry + material |
| 4.2 | Implement `ScreenPortalFrame` enter transition into the display |
| 4.3 | Build hero DOM overlay (name, role, value prop, CTAs) bound to `portfolioContent.ts` |
| 4.4 | Wire primary/secondary CTA (View Projects / Contact Me) to scroll-jump or anchor actions |
| 4.5 | Implement background system elements (data lines, code fragments, boot indicators) |
| 4.6 | Implement exit transition to Scene 03 |
| 4.7 | Build reduced-motion variant (static hero card) |
| 4.8 | Mobile/tablet readability pass (font scale, contrast check) |
| 4.9 | QA gate |

---

## PHASE 5 — SCENE 03 ARCHITECTURE BUILD
*Effort: L · Depends on: Phase 4 locked · Gate: clearly proves full-stack/system thinking*

| # | Task Headline |
|---|---|
| 5.1 | Build `UltraWideMonitor` device |
| 5.2 | Define architecture-layer data model (Frontend / API / Backend / Database / Deployment) in config |
| 5.3 | Implement node/data-path visualization (instanced geometry or `<Html>`-anchored diagram) |
| 5.4 | Implement data-route pulse animation (shader or animated dash-offset) |
| 5.5 | Implement per-layer labels, readable at all target viewport sizes |
| 5.6 | Wire lateral camera transition in from Scene 02 exit |
| 5.7 | Build reduced-motion variant (static labeled diagram) |
| 5.8 | QA gate |

---

## PHASE 6 — SCENE 04 PROJECTS BUILD
*Effort: L · Depends on: Phase 5 locked · Gate: convinces a recruiter real work exists*

| # | Task Headline |
|---|---|
| 6.1 | Build `LaptopDevice` geometry + keyboard-light detail |
| 6.2 | Define `projectData.ts` schema (title, description, problem, stack, built, architectureNote, result, liveUrl, githubUrl) |
| 6.3 | Populate 2–4 real project entries — **content dependency: needs final project copy before this phase can lock** |
| 6.4 | Build `ProjectCaseStudyPanel` overlay matching the Section 6 card format |
| 6.5 | Implement in-scene project navigation (next/prev without leaving the scene) |
| 6.6 | Wire Live/GitHub links — new-tab, keyboard-accessible |
| 6.7 | Implement laptop wake + enter transition from Scene 03 |
| 6.8 | Implement exit transition to Scene 05 |
| 6.9 | Keyboard navigation + focus-state QA |
| 6.10 | QA gate |

---

## PHASE 7 — SCENE 05 PRODUCT UX BUILD
*Effort: M · Depends on: Phase 6 locked · Gate: shows product sense without weakening engineer positioning*

| # | Task Headline |
|---|---|
| 7.1 | Build `TabletDevice` geometry + swipe-wake interaction |
| 7.2 | Define `productThinking` content config (journey, flows, component systems, accessibility notes) |
| 7.3 | Build wireframe-flow / component-shell visualization |
| 7.4 | Build user-path-line visualization tied to scroll progress |
| 7.5 | Implement enter/exit transition |
| 7.6 | Content QA — verify copy frames UX as engineering-linked, not designer-only |
| 7.7 | QA gate |

---

## PHASE 8 — SCENE 06 RESPONSIVE + PERFORMANCE BUILD
*Effort: M · Depends on: Phase 7 locked · Gate: justifies the entire device-journey concept*

| # | Task Headline |
|---|---|
| 8.1 | Build `MobileDevice` geometry + rotate-into-view transition |
| 8.2 | Implement responsive layout morph animation (desktop grid → mobile stack, demonstrated in-scene) |
| 8.3 | Build performance-principles content config (lazy load, budgets, asset optimization, reduced motion) |
| 8.4 | Implement breakpoint-indicator visualization |
| 8.5 | Implement lightweight loading-state demo |
| 8.6 | Test on a real mobile viewport (or confirm a strong static fallback) |
| 8.7 | **[ADD]** Audit this scene's own poly/texture/shader budget — it is the "performance" scene, it cannot itself be heavy |
| 8.8 | QA gate |

---

## PHASE 9 — SCENE 07 SYSTEM CORE BUILD
*Effort: L · Depends on: Phase 8 locked · Gate: proves developer isn't frontend-only*

| # | Task Headline |
|---|---|
| 9.1 | Build backend/system-core environment geometry (server core, DB cylinder, service nodes) |
| 9.2 | Implement data-tunnel transition from Scene 06 exit (data lines leaving the devices) |
| 9.3 | Build `systemCore` content config (APIs, auth, DB, caching, deployment, testing, security, scalability) |
| 9.4 | Implement API-route pulse + deployment-pipeline visualization |
| 9.5 | Implement ambient "system heartbeat" animation |
| 9.6 | Implement exit transition to Scene 08 |
| 9.7 | Visual/content QA against "not a generic sci-fi reactor" rule |
| 9.8 | QA gate |

---

## PHASE 10 — SCENE 08 FINAL CONTACT BUILD
*Effort: M · Depends on: Phase 9 locked · Gate: experience ends with clarity and conversion*

| # | Task Headline |
|---|---|
| 10.1 | Compose final wide shot — all devices + system core + connecting data lines |
| 10.2 | Implement logo/name return animation |
| 10.3 | Build contact content config + final CTA copy |
| 10.4 | Wire email / LinkedIn / GitHub / CV-download links |
| 10.5 | **[ADD]** Confirm CV is a real file, not a placeholder, before this phase can lock |
| 10.6 | Accessibility pass — confirm contact is reachable without finishing the full journey (via quick-nav) |
| 10.7 | QA gate |

---

## PHASE 11 — GLOBAL POLISH
*Effort: L · Depends on: Phase 10 locked · Gate: feels like one continuous premium product*

| # | Task Headline |
|---|---|
| 11.1 | Lighting pass — unify exposure/tone-mapping across all 8 scenes |
| 11.2 | Material pass — unify metal/glass/glow presets via shared `materials.ts` |
| 11.3 | Typography pass — unify type scale/weights across overlays |
| 11.4 | Spacing/layout pass — unify overlay padding/margins/breakpoints |
| 11.5 | Transition-consistency pass — confirm all 7 portal variants are used without repetition or confusion |
| 11.6 | Final color-treatment pass against Section 4.2 palette |
| 11.7 | Loader polish — premium initial-load experience |
| 11.8 | Micro-interaction pass (hover/focus states on CTAs/nav) |
| 11.9 | Optional sound toggle — only if explicitly approved, default off, never autoplay |
| 11.10 | Full-journey regression scroll test (forward + back) at final visual state |
| 11.11 | QA gate — confirm no performance regression introduced by polish |

---

## PHASE 12 — FINAL QA + LOCKDOWN
*Effort: M · Depends on: Phase 11 locked · Gate: all QA checks pass*

| # | Task Headline |
|---|---|
| 12.1 | Cross-browser desktop pass (Chrome / Edge / Firefox) |
| 12.2 | Viewport matrix pass (large desktop / laptop / tablet / mobile) |
| 12.3 | Interaction matrix pass (scroll down/up, quick-nav, skip-to-projects, skip-to-contact, CTAs, reduced motion, WebGL fallback, keyboard nav, focus states) |
| 12.4 | Performance pass — FPS stability, no stutter, no memory leak across full scroll, load-time and asset-size audit |
| 12.5 | Accessibility pass — reduced motion, keyboard links, semantic fallback, contrast, contact/projects reachable without 3D |
| 12.6 | Build integrity pass — typecheck, lint, build, console-error sweep, import/asset audit |
| 12.7 | **[ADD]** Single Playwright smoke test covering the full scroll journey + reduced-motion toggle, as a regression net going forward |
| 12.8 | Final sign-off against the Section 16 success definition (10-point checklist) |
| 12.9 | Ship / lockdown — tag release, archive blueprint + QA docs |

---

## Cross-Cutting Notes (apply across all phases, not a separate phase)

- **Content before geometry.** Phases 6, 7, 8, 9, 10 all have a real-content dependency (project copy, system-core copy, contact details). If final copy isn't ready, build with realistic placeholder text of correct length — not lorem ipsum — so layout/readability QA stays valid.
- **GLTF asset budget.** Recommend deciding poly count and texture resolution ceilings per device *once*, in Phase 0 or 1, rather than re-deciding per scene.
- **Device tiering.** Section 10.2 requires "device tiering" — this needs a concrete mechanism (e.g. a GPU-tier detection check) decided once, likely in Phase 1, then consumed by every later scene rather than improvised per-scene.
- **Lock criteria are qualitative by design** ("feels premium," "feels complete") — that's appropriate for creative gates, but pair each with the measurable QA items already listed so an agent has an objective fallback when the subjective call is ambiguous.
