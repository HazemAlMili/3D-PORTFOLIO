# Accessibility + Performance Checklist
## Cinematic 3D Full Stack Developer Portfolio
## Concept: The System Behind Every Screen

Status: Phase 0 Draft
Purpose: Enforceable QA checklist for accessibility, fallback behavior, responsive behavior, and performance discipline.
Implementation Status: Documentation only — no runtime accessibility or performance code yet.

---

# 1. QA Philosophy

Accessibility and performance are not final polish tasks.
They are part of the core design.

A cinematic 3D portfolio must still work without cinema.

The experience only passes if the visitor can understand the developer identity, view projects, and contact the developer without relying on perfect WebGL, heavy motion, audio, or precise 3D interaction.

## Philosophy Checklist

- [ ] The experience can still communicate the developer identity without the full 3D journey
- [ ] Projects can be reached without completing the full scroll experience
- [ ] Contact can be reached without completing the full scroll experience
- [ ] Reduced motion is treated as a real experience, not an afterthought
- [ ] WebGL fallback is treated as a premium fallback, not a broken page
- [ ] Performance budgets are defined before visual polish
- [ ] Motion never overrides comprehension

---

# 2. Accessibility Checklist

## 2.1 Core Accessibility
- [ ] All primary CTAs are keyboard accessible
- [ ] All primary CTAs have visible focus states
- [ ] Focus states use a visible high-contrast treatment
- [ ] Contact action is reachable without interacting with 3D objects
- [ ] Project links are reachable without interacting with 3D objects
- [ ] Quick navigation is available outside the WebGL canvas
- [ ] Skip to Projects is available
- [ ] Skip to Contact is available
- [ ] The site does not require WASD, game controls, driving, flying, or free-roam navigation
- [ ] The site does not require precise clicking on small 3D objects
- [ ] No important information is available only as a decorative 3D object

## 2.2 Semantic Fallback Content
- [ ] A semantic fallback version exists or is planned
- [ ] Fallback includes Hero / Identity
- [ ] Fallback includes Architecture / Skills / System Thinking
- [ ] Fallback includes Projects
- [ ] Fallback includes Responsive / Performance notes
- [ ] Fallback includes System Core / Backend positioning
- [ ] Fallback includes Contact
- [ ] Fallback includes GitHub / LinkedIn / CV links if available
- [ ] Fallback content follows the same content contract as the 3D version
- [ ] Fallback does not look broken or temporary

## 2.3 Reduced Motion
- [ ] Reduced motion mode exists or is planned
- [ ] Reduced motion removes aggressive portal zooms
- [ ] Reduced motion removes heavy camera travel
- [ ] Reduced motion removes screen shake
- [ ] Reduced motion reduces particle movement
- [ ] Reduced motion avoids motion-essential-only communication
- [ ] Reduced motion still exposes all 8 content areas
- [ ] Reduced motion still allows projects to be viewed
- [ ] Reduced motion still allows contact actions
- [ ] Reduced motion state is not combined/confused with device tier

## 2.4 Text Readability
- [ ] Primary text uses high contrast
- [ ] Secondary text remains readable on dark backgrounds
- [ ] Text does not sit directly on heavy glow
- [ ] Mobile text is not tiny
- [ ] Scene 04 project copy is readable during camera hold
- [ ] Scene 06 responsive/performance text is readable on mobile viewport
- [ ] Scene 08 contact details are unmistakable
- [ ] Any technical label remains readable during motion
- [ ] No low-contrast grey-on-grey text

## 2.5 Audio / Media
- [ ] No mandatory audio
- [ ] No autoplay audio
- [ ] If sound is added later, it defaults off or requires user action
- [ ] If sound is added later, a visible mute/off control exists
- [ ] If video/media is added later, captions or text alternative are planned

## 2.6 Keyboard and Focus
- [ ] Primary navigation can be reached by keyboard
- [ ] CTAs can be reached by keyboard
- [ ] Project links can be reached by keyboard
- [ ] Contact links can be reached by keyboard
- [ ] Focus order is logical
- [ ] Focus is not trapped inside canvas
- [ ] Focus does not disappear during scene transitions
- [ ] Skip links work before the 3D canvas

---

# 3. Performance Checklist

## 3.1 Global Performance Rules
- [ ] Use one persistent WebGL canvas where possible
- [ ] Avoid multiple active WebGL canvases
- [ ] Avoid loading all 8 scene assets on initial load
- [ ] Preload Scene N+1 while Scene N is in its immerse phase
- [ ] Dispose unused geometries/materials/textures
- [ ] Avoid creating new objects inside animation loops
- [ ] Avoid unnecessary React state updates inside frame loops
- [ ] Avoid large transparent overdraw
- [ ] Avoid excessive real-time shadows
- [ ] Avoid excessive post-processing
- [ ] Avoid huge particle counts
- [ ] Pause or reduce offscreen animations
- [ ] Use baked lighting where appropriate
- [ ] Use compressed assets where appropriate

## 3.2 Asset Budget Checklist
- [ ] Scene 01 seal/opening object stays within approved asset budget
- [ ] Scene 02 main display stays within approved asset budget
- [ ] Scene 03 ultrawide monitor stays within approved asset budget
- [ ] Scene 04 laptop stays within approved asset budget
- [ ] Scene 05 tablet stays within approved asset budget
- [ ] Scene 06 mobile device stays within approved asset budget
- [ ] Scene 07 system core stays within approved asset budget
- [ ] GLB/GLTF files are optimized before use
- [ ] Geometry compression is planned
- [ ] Texture compression is planned
- [ ] Texture resolution is selected by device tier
- [ ] No full-resolution asset is loaded before needed

## 3.3 Device Tier Checklist
- [ ] Device tiering is planned
- [ ] Low-tier devices get simplified or fallback experience
- [ ] Medium-tier devices get reduced particles/post-processing
- [ ] High-tier devices get full experience within budget
- [ ] Reduced motion and device tier are treated as separate axes
- [ ] Low-tier fallback does not hide projects
- [ ] Low-tier fallback does not hide contact
- [ ] Mobile experience is not simply desktop 3D squeezed smaller

## 3.4 Scene-Specific Performance Checklist

### Scene 01 — Opening
- [ ] Seal impact does not cause a major performance spike
- [ ] Ripple/distortion is controlled
- [ ] Intro does not block user for too long

### Scene 02 — Hero
- [ ] Main display glow does not overuse bloom
- [ ] Hero text remains readable
- [ ] CTA interaction is immediate

### Scene 03 — Architecture
- [ ] Node/data visualization is not too dense
- [ ] API/data pulses are lightweight
- [ ] Labels remain readable during animation

### Scene 04 — Projects
- [ ] Project panels do not animate continuously while reading
- [ ] Project navigation is lightweight
- [ ] Live/GitHub links remain responsive

### Scene 05 — Product UX
- [ ] Wireframe/component visuals are not overdraw-heavy
- [ ] User-path animation is simple and readable

### Scene 06 — Responsive Performance
- [ ] This scene is lightweight by design
- [ ] It does not use heavy particles/shaders while claiming performance
- [ ] Mobile viewport remains readable

### Scene 07 — System Core
- [ ] Backend/system core does not become a heavy generic reactor
- [ ] Data tunnel transition is controlled
- [ ] Service/API pulses are lightweight

### Scene 08 — Final Contact
- [ ] Final device sync does not overload the frame
- [ ] Contact details remain immediately readable
- [ ] Final state becomes calm and stable

## 3.5 Measurable Performance Targets

| Metric | Target |
| --------------------------------------- | ------------------------------------------------------------ |
| Desktop FPS | ≥55 sustained where possible |
| Transition FPS floor | Never below 30 FPS for more than 500ms during any transition |
| Mobile fallback Lighthouse Performance | ≥85 |
| LCP target | <2.5s |
| CLS target | <0.1 |
| Initial JS budget before scene chunking | <350 KB gzipped |
| Critical path assets | Scene 01 + Scene 02 only |
| Full journey assets | Lazy-loaded across the journey |
| Console errors in final QA | 0 |

These targets are not fully measurable in Phase 0 because implementation does not exist yet. They are documented now so future phases have objective QA gates.

---

# 4. Responsive Checklist

- [ ] Desktop gets the full cinematic experience
- [ ] Tablet gets simplified camera paths if needed
- [ ] Mobile gets simplified 3D or fallback if needed
- [ ] Mobile still exposes hero, projects, system thinking, and contact
- [ ] Touch users are not required to perform precise 3D interactions
- [ ] No hover-only interaction is required
- [ ] CTA buttons are large enough for touch
- [ ] Mobile text is readable
- [ ] Mobile project links are accessible
- [ ] Mobile contact links are accessible
- [ ] Scene 06 demonstrates responsive thinking without making the real mobile UX heavy

---

# 5. Conversion Access Checklist

- [ ] View Projects CTA exists in Scene 02
- [ ] Contact CTA exists in Scene 02
- [ ] Projects are accessible before completing the full journey
- [ ] Contact is accessible before completing the full journey
- [ ] Final contact scene includes email
- [ ] Final contact scene includes GitHub if available
- [ ] Final contact scene includes LinkedIn if available
- [ ] Final contact scene includes CV link when available
- [ ] Final CTA is visually stronger than supporting labels
- [ ] Final scene does not end with visuals only

---

# 6. Phase QA Mapping

| Future Phase | Required Checklist Focus |
| ------------ | ------------------------------------------------------------------------------------------------ |
| Phase 1 | WebGL fallback placeholder, reduced motion placeholder, tooling scripts, dev performance monitor |
| Phase 2 | Reverse-scroll safety, no teleporting, camera holds during content comprehension |
| Phase 3 | Skip intro, reduced motion opening, no seal performance spike |
| Phase 4 | Hero readability, CTA access, quick nav visibility |
| Phase 5 | Architecture label readability, lightweight data pulses |
| Phase 6 | Keyboard-accessible project links, readable project panels |
| Phase 7 | UX content linked to engineering, no hover-only interaction |
| Phase 8 | Mobile readability, lightweight responsive scene, device-tier awareness |
| Phase 9 | Backend meaning clear, system core not generic/heavy |
| Phase 10 | Contact reachable, CV/link verification, final CTA clarity |
| Phase 11 | No polish-induced performance/accessibility regression |
| Phase 12 | Full accessibility/performance regression matrix |

---

# Task 0.5 QA Checklist

- [x] `docs/portfolio-3d/accessibility-performance-checklist.md` exists
- [x] Accessibility checklist exists
- [x] Semantic fallback checklist exists
- [x] Reduced motion checklist exists
- [x] Keyboard/focus checklist exists
- [x] Audio/media checklist exists
- [x] Performance checklist exists
- [x] Asset budget checklist exists
- [x] Device tier checklist exists
- [x] Scene-specific performance checklist exists
- [x] Measurable performance targets are documented
- [x] Responsive checklist exists
- [x] Conversion access checklist exists
- [x] Phase QA mapping exists
- [x] `experience-blueprint.md` was only updated with a short reference, if updated
- [x] No implementation code was added
- [x] No performance tooling was implemented
- [x] No accessibility components were implemented
- [x] No packages were installed
- [x] Task 0.6 was not started
