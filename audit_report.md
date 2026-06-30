# DEEP CINEMATIC AUDIT — Cinematic 3D Developer Portfolio

## A. Executive Summary

- **Overall verdict:** the project demonstrates ambition in delivering a cinematic 3D developer portfolio but currently fails to deliver a cohesive film‑like journey.  The live site only exposes a fallback skeleton rather than the intended WebGL scenes, and much of the camera and storytelling logic remains unfinished or placeholder.  As a result the experience feels like isolated demos rather than a continuous narrative.
- **Biggest systemic problem:** the camera pacing and scroll segmentation are uncalibrated placeholders.  Scene keyframes use hard‑coded positions (e.g., `Z` quickly jumping from ~14 to ~0.8) and overly short segments, leading to abrupt zoom‑ins and no time for users to read content【780952702380263†L9-L26】.  The scroll segmentation weights allocate inconsistent durations, causing the camera to stall (Scene 03) or rush through content (Scene 02)【410232512343975†L20-L26】【410232512343975†L75-L86】.  Without recalibrating these values, the portfolio cannot feel cinematic.
- **Is the project technically stable?** The code compiles, and the scenes are modular, but many components are placeholders.  Key files (`cameraKeyframes.ts`) are explicitly marked as temporary【780952702380263†L3-L13】.  The absence of device expansion logic in several scenes means that content often remains trapped within screens.  The live site currently activates a fallback, indicating that the 3D runtime is either disabled or fails on many devices.
- **Is the project cinematically complete?** No.  The scenes are disconnected and lack narrative flow.  Story motivations for transitions (why we leave a device and enter the next scene) are often missing.  Background environments are static, and the camera does not guide the viewer through a clear arc.  The final contact scene appears abruptly without a build‑up.
- **Main recommendation:** prioritise a global pacing and narrative pass.  Fix the fallback so that the 3D experience loads by default, recalibrate camera keyframes and scroll segments for each scene, and implement source‑to‑target transitions with clear visual cues.  Only after the systemic pacing and story structure are solid should additional polish (particles, micro‑interactions) be added.

---

## B. P0 Issues — Must Fix

| ID | Title | Affected scenes | What happens | Why it hurts the experience | Evidence | Likely files | Recommended fix direction | Risk if ignored |
|---|---|---|---|---|---|---|---|---|
| **P0‑1** | **3D fallback always active / no WebGL experience** | All scenes | The live site displays a fallback skeleton with messages like *"3D Experience Fallback Active"* and *"Reduced Motion Fallback Active"* instead of the intended 3D scenes.  The toggle in the corner does not disable the fallback. | Users cannot view the cinematic 3D journey at all; the site fails its core purpose. | The fallback pages show only static placeholder text (Hero, Architecture, Projects pending etc.) and a toggle labelled `Reduced Motion OFF` / `Fallback inactive` which does not load the 3D scenes (screenshots from previous visit). | `src/portfolio3d/fallback`, `portfolioStore`, deployment settings (Vercel environment variables). | Ensure the default state uses the 3D renderer.  Fix the motion/fallback toggle logic; remove auto‑detection that forces fallback.  Add a capability check for WebGL and progressively enhance.  Make fallback optional only when `reducedMotion` is true or WebGL is unsupported. | High – the portfolio is unusable without the 3D layer. |
| **P0‑2** | **Placeholder camera keyframes cause abrupt jumps** | Scenes 01‑08 | `cameraKeyframes.ts` uses placeholder positions with large Z differences (e.g., approach at Z≈14 then enter at Z≈0.8 for several scenes)【780952702380263†L10-L28】.  These values are temporary and not based on actual device geometry. | When mapped to scroll, the camera will lurch quickly into a device, leaving no time to appreciate the approach.  It breaks immersion and can cause motion sickness. | Comments in the file label the keyframes as "PLACEHOLDER" and mention they will be replaced later【780952702380263†L3-L13】.  Enter positions are extremely close to the device surface (0.8 units), while approaches start far away (~12–14 units)【780952702380263†L16-L36】. | `src/portfolio3d/camera/cameraKeyframes.ts` | Derive keyframe distances from actual model dimensions.  Increase the number of intermediate keyframes or ease functions so that scroll increments translate to subtle camera motions.  Recalibrate FOV changes to avoid sudden zoom spikes. | Users will feel the camera teleporting; content will be unreadable, undermining the cinematic intent. |
| **P0‑3** | **Scroll segments allocate inconsistent durations** | All scenes | `scrollSegments.ts` sets scene weights `[0.16,0.14,0.08,0.18,0.12,0.10,0.12,0.10]` for eight scenes【410232512343975†L20-L26】.  Scene 03 gets only 8% of the scroll length while Scenes 04–05 get 18%.  Sub‑phases for Scene 03 start its enter phase at 45% of the local progress【410232512343975†L75-L86】, meaning there is a large gap where nothing happens. | The viewer may scroll a lot yet see little motion in Scene 03, then suddenly speed through subsequent scenes.  The progress distribution feels uneven. | Lines 21‑26 indicate the weight adjustments and show that the total is forced to 1.0【410232512343975†L20-L26】.  Scene 03’s sub‑phase definitions confirm the odd pacing (approach from 0–45%, enter 45–60%, leaving a long idle zone)【410232512343975†L75-L78】. | `src/portfolio3d/scroll/scrollSegments.ts` | Reallocate scroll weights based on content complexity and narrative importance.  Each scene should have enough room for approach, a comfortable hold, and exit.  Remove empty gaps.  Align sub‑phase durations with camera keyframes. | Scroll will feel jerky and inconsistent, and viewers may overshoot or undershoot scenes. |
| **P0‑4** | **Device content remains trapped inside screens** | Scenes 04–06 | Scenes with devices (laptop, tablet, mobile) render content only on the device plane.  For example, `Scene04Projects` maps project panels onto the laptop screen at Z=0.10 but never expands them into the scene【85395983617728†L556-L634】.  `TabletDevice` and `MobileDevice` have no logic to expand content when the camera enters【769902051338293†L37-L87】【809804777732875†L32-L79】. | When the camera zooms in, the viewer is looking at a tiny screen; text and UI remain cramped and hard to read.  The expected pattern (device opens and content becomes a cinematic layout) is missing. | Scene 04 computes active project index and cross‑fades panels but always positions them on the laptop screen surface【85395983617728†L556-L640】.  `TabletDevice` simply renders `ProductUXScreenContent` on a fixed plane【769902051338293†L37-L87】.  `MobileDevice` rotates into view but never opens【809804777732875†L32-L79】. | `src/portfolio3d/scenes/Scene04Projects.tsx`, `src/portfolio3d/components/TabletDevice.tsx`, `src/portfolio3d/components/MobileDevice.tsx` | Introduce a “screen breakout” transition triggered at the start of the immerse phase: scale up and detach the screen plane, animate it forward, and rearrange its contents into a larger composition overlay.  Provide a reverse animation on exit. | Content will stay unreadable on small screens, undermining the value demonstration. |
| **P0‑5** | **Transition sources/targets are disconnected** | Scene 06→07, Scene 07→08 | Data lines and particles often originate from generic coordinates instead of the device the viewer just saw.  In `DataTunnel.tsx` the origin is `[0,2,-2.5]` regardless of where the mobile device is【486841309008851†L12-L18】.  In `FinalSystemComposition.tsx` connection lines start from hard‑coded anchor points rather than emerging from previous devices【865198769396720†L89-L112】. | Transitions feel arbitrary — wires appear floating in mid‑air instead of flowing from a screen or object.  The viewer cannot understand why the next scene appears. | The `DataTunnel` origin is defined in code and does not reference the mobile device position【486841309008851†L12-L18】.  In the final scene, connection lines use precomputed anchor vectors instead of the actual positions of devices from earlier scenes【865198769396720†L89-L112】. | `src/portfolio3d/components/DataTunnel.tsx`, `src/portfolio3d/components/FinalSystemComposition.tsx` | Calculate start/end points for transitions using the positions of the current device/group at runtime.  When leaving the mobile scene, spawn particles from the mobile’s screen plane and animate them into the data cluster.  For the final scene, draw lines that visibly emanate from the previous scene’s server nodes. | Transitions will continue to look disconnected, weakening the narrative link between scenes. |
| **P0‑6** | **Scene 03 idle gap / reverse scroll bug** | Scene 03 (Architecture) | The scroll sub‑phases allocate 45% to the approach phase and start the enter phase at 45%【410232512343975†L75-L78】, leaving no transition movement between 15% and 45% of progress.  Reverse scroll behaviour may skip or jerk because the camera remains still for a long portion then jumps. | Users will think the scene is broken or unresponsive when they scroll and nothing happens.  Reverse scrolling may suddenly teleport to the previous scene. | `scrollSegments.ts` defines `approach: [0.00,0.45]` and `enter: [0.45,0.60]` for Scene 03【410232512343975†L75-L78】. | `src/portfolio3d/scroll/scrollSegments.ts`, `Scene03Architecture` | Redistribute sub‑phases: shorten the approach to ~20–25%, allocate 20–25% to enter, and ensure there is a distinct immerse phase.  Test reverse scroll behaviour to guarantee smooth interpolation. | Scene 03 will feel broken and break the cinematic flow. |
| **P0‑7** | **Missing visual indication for interactive elements** | Scene 05 (Product UX) | The `TabletDevice` includes a "swipe‑wake" bar but there is no on‑screen instruction telling users to interact; the bar pulses but might be missed. | Users may not realise they can tap/swipe to wake the tablet, leading them to think the scene is static. | In `TabletDevice.tsx` the swipe bar toggles `woken` on click and pulses emissive intensity【769902051338293†L17-L33】, but there is no instruction or tooltip. | `src/portfolio3d/components/TabletDevice.tsx` | Add a label or micro‑copy that fades out once the user interacts (e.g., “Swipe to wake”).  Alternatively, auto‑wake when the camera enters the scene. | Users will miss interactive content and feel stuck. |

## C. P1 Issues — Should Fix

| ID | Title | Affected scenes | What happens | Evidence | Likely files | Recommended fix direction |
|---|---|---|---|---|---|---|
| **P1‑1** | **Weak narrative connection between scenes** | Global | The scenes follow a logical ordering (identity → architecture → projects → UX → responsive → system → contact), but there is little storytelling to guide the viewer.  Copy appears in isolation, and transitions do not communicate why we’re moving from one concept to the next. | Scenes import copy but do not display transitional captions.  `scrollSegments.ts` has no narrative logic. | `src/portfolio3d/scenes/*`, `content/*` | Write a story outline and add contextual captions or voice‑over at the start/end of each scene explaining what comes next.  Use motion motifs (e.g., the same data line that flows from device to system) to connect scenes. |
| **P1‑2** | **Static background environments** | Scenes 02–05 | Most scenes place a device in space with lights but no environmental motion.  There are no particles, fog layers, parallax elements or light sweeps to create depth. | The scene files only add a few directional lights and ambient light (e.g., `Scene04Projects` uses three lights【85395983617728†L556-L568】). | `src/portfolio3d/scenes/Scene02Hero.tsx`, etc. | Introduce subtle moving elements: volumetric fog, slow gliding particles, or gradient light sweeps.  Each scene’s background should support its theme (architecture: blueprint grid; projects: luminous desk environment). |
| **P1‑3** | **Over‑use of useFrame loops** | Scenes 02–08 | Many components call `useFrame` for simple animations (e.g., breathing laptop float【85395983617728†L530-L552】, LED pulsing【769902051338293†L17-L33】, final composition oscillations【865198769396720†L127-L152】).  Without throttling, these loops run every frame, impacting CPU/GPU. | Observed multiple `useFrame` calls across components. | Various component files | Consolidate related animations into fewer `useFrame` hooks or use `drei`’s `<Float>` and `<Billboard>` to offload.  Only animate when the relevant scene is within view. |
| **P1‑4** | **Lack of fallback UI for low‑end devices** | Global | The fallback currently displays only placeholder text; there is no static image or summary of the portfolio. | The fallback page shows messages like *"Hero pending – this 3D scene will load soon"* (observed in earlier session). | `src/portfolio3d/fallback` | Create a polished 2D fallback with screenshots, text and clear call‑to‑action.  Provide an option to view the 3D experience if the device is capable. |
| **P1‑5** | **Accessibility and readability concerns** | Scenes 02–08 | Text sizes are defined in 3D units (e.g., font sizes around 0.05–0.24).  Without viewport testing, some may render too small on smaller screens or dark backgrounds.  There are no ARIA roles or keyboard interactions. | Text definitions in `ProductUXScreenContent` and `FinalContactLockup` use small font sizes【120585798292992†L56-L83】【358787743580275†L18-L39】. | Content components | Test readability at various zoom levels and adjust sizes or increase hold durations to ensure users can read everything.  Add keyboard navigation (e.g., arrow keys to step through scenes) and screen‑reader descriptions. |

## D. P2 Optional Polish

| ID | Title | Affected scenes | Notes |
|---|---|---|---|
| **P2‑1** | **Subtle particle/fog layers** | Global | Add low‑density particles or volumetric fog to enhance depth without distracting the user.  Use dynamic intensity tied to scroll to highlight key moments.
| **P2‑2** | **Hover/micro‑interactions** | Scenes 04–07 | Provide small hover effects when the pointer passes over project cards or system nodes to reinforce interactivity.
| **P2‑3** | **Idle ambient animations** | Scenes 01–08 | Add gentle oscillations or parallax on static devices even when the user is not scrolling, making the world feel alive.

---

## E. Camera Pacing Matrix

| Scene | Pacing verdict | Notes |
|---|---|---|
| **Scene 01 – Opening / North Star** | **Issue** | Keyframes are placeholders; approach starts at Z=12, then the camera teleports to Z≈0.8 during enter【780952702380263†L16-L19】.  The immerse phase occupies 55% of the segment but is not defined in code yet. |
| **Scene 02 – Hero** | **Issue** | `enter` moves from Z≈14 to Z≈0.8 with FOV change from 50° to 78°【780952702380263†L20-L27】.  The sub‑phase durations (0–10% approach, 10–30% enter, 30–78% immerse) may not allow users to read the four content steps. |
| **Scene 03 – Architecture** | **Issue (major)** | Scroll segments allocate 45% to approach and only 15% to enter【410232512343975†L75-L78】.  This leaves a long gap where nothing happens and a rushed entry. |
| **Scene 04 – Projects / Work** | **Pass (code‑level)** | Sub‑phases give 40% to approach and 33% to hold【410232512343975†L82-L87】; however camera keyframes still jump from Z=12 to Z=0.8【780952702380263†L35-L37】.  Needs visual confirmation. |
| **Scene 05 – Product UX** | **Pass** | Approach/enter/immerse durations follow 40/15/33%.  The camera keyframes use a closer approach (Z=11→Z=2.8)【780952702380263†L39-L43】.  Should feel smoother. |
| **Scene 06 – Responsive + Performance** | **Pass (potential)** | Sub‑phases are defined and the phone rotates gradually during the approach; however the camera jumps from Z=10 to Z=3【780952702380263†L44-L47】.  Needs easing. |
| **Scene 07 – System Core** | **Pass** | Approach uses unique offset positions and moderate FOV change【780952702380263†L50-L53】.  Enter and exit differences are more reasonable. |
| **Scene 08 – Final Contact** | **Pass** | Keyframes move the camera gradually closer (Z=12→4.2) with slight vertical offset【780952702380263†L55-L59】.  FOV change is subtle (50°→44°). |

**Note:** Many verdicts are code‑level only because the live 3D experience could not be verified.  These may require adjustment after visual testing.

---

## F. Storytelling / Transition Matrix

| From → To | Narrative expectation | Current implementation | Missing elements |
|---|---|---|---|
| **Opening → Hero** | Introduce the developer’s identity and set the tone. | Unknown; fallback shows nothing. | Need a clear narrative voice explaining the portfolio concept (`The System Behind Every Screen`).  Add opening text or voice‑over. |
| **Hero → Architecture** | Explain how the developer thinks about system architecture; camera should leave the hero device and reveal diagrams. | Scene 03 has static blueprint objects (assumed).  `scrollSegments` allocate a long idle approach. | Need a visible transition (e.g., UI shards transform into blueprint lines).  Provide copy linking identity to thinking. |
| **Architecture → Projects** | Move from theory to real proofs. | The `LaptopDevice` appears abruptly. | Create a data flow from the architecture scene into the laptop, perhaps via circuits.  Use a caption (“Here’s how it applies to my work”). |
| **Projects → Product UX** | Show that the developer cares about users and product thinking beyond code. | Projects finish; the tablet appears with a swipe bar. | Transition effect could be a project card morphing into a user flow diagram.  Add copy bridging work to user empathy. |
| **Product UX → Responsive** | Demonstrate cross‑device responsiveness and performance. | `MobileDevice` rotates into view; no visual link. | The tablet’s content could shrink into the phone or send a signal; highlight the importance of performance. |
| **Responsive → System Core** | Convey that behind responsive UI lies a robust backend. | A `DataTunnel` appears from a fixed origin and leads to a cluster【486841309008851†L12-L18】. | Tie the data lines to the phone screen; animate a packet leaving the phone, then follow it into the system cluster. |
| **System Core → Final Contact** | Wrap up by showing that all devices and systems converge to a human connection. | Lines converge on a pedestal in the final scene, but it feels arbitrary【865198769396720†L89-L112】. | Use one of the system core nodes to emit a pulse that flows into the contact scene; overlay text inviting collaboration. |

---

## G. Device → Expanded Content Matrix

| Scene | Content readability inside device | Does content expand outside device? | Notes |
|---|---|---|---|
| **Scene 04 (Laptop)** | Panels are rendered on the laptop screen at Z=0.10【85395983617728†L556-L640】.  With small scroll the camera zooms to 0.8 units away, which may still be too far for small text. | ❌ No expansion.  Panels remain trapped on the device. | Introduce an animation where the laptop screen flips open and the project panels float into 3D space. |
| **Scene 05 (Tablet)** | `TabletDevice` displays product thinking content on its screen.  There is a swipe‑wake bar. | ❌ No expansion.  Content is always attached to the tablet plane【769902051338293†L37-L87】. | After waking, animate cards or diagrams to expand beyond the tablet, perhaps into the air above. |
| **Scene 06 (Mobile)** | Responsive layout morph displays on the phone screen. | ❌ No expansion.  Content never leaves the phone plane【809804777732875†L32-L79】. | Use a zoom‑to‑full‑screen effect or have the phone break apart into modules. |
| **Scene 07 (System Core)** | Content consists of 3D nodes and lines representing services, which are separate from a device. | ✅ Already expanded beyond device. | Provide labels or interactive tooltips when zooming in. |
| **Scene 08 (Final Contact)** | Contact information appears in front of a final composition and is free‑floating【358787743580275†L18-L40】. | ✅ Already expanded into scene. | Could animate the pedestal ring to receive signals from previous scene. |

---

## H. Background / Environment Motion Matrix

| Scene | Current background | Recommendation |
|---|---|---|
| **Scene 01** | Unknown (fallback). | Use a soft star‑field or abstract grid that slowly drifts to set the tone. |
| **Scene 02** | Only device and lights. | Add subtle moving particles or diffused light beams behind the hero device to convey energy. |
| **Scene 03** | Likely blueprint / architecture diagrams. | Animate blueprint lines drawing themselves or glow pulses along circuits. |
| **Scene 04** | Laptop floating in space. | Include desk elements fading in/out, gentle smoke or dust motes, and pulsing keyboard backlight. |
| **Scene 05** | Tablet on neutral background. | Provide faint moving UI elements or patterns (e.g., flows connecting steps). |
| **Scene 06** | Phone rotating. | Add dynamic network lines or wifi signals in the background when focusing on performance. |
| **Scene 07** | Server cluster with lines. | Already has motion through `DataTunnel`, `ApiRoutePulse`, etc., but could benefit from volumetric lights or fog to emphasise depth. |
| **Scene 08** | Final system composition with lines. | Add swirling light ring or slow motion of device outlines to unify the scene. |

---

## I. Responsive / Viewport Findings

The code defines responsive logic primarily through `ResponsiveLayoutMorph` and sub‑phases for each scene, but actual viewport testing could not be performed because the 3D experience was unavailable.  The following are code‑level observations:

- **Desktop/Laptop:** Scenes are designed assuming a wide viewport; devices are centered and occupy most of the frame.  Camera keyframes use symmetrical X/Y offsets.
- **Tablet (~768 px):** There is no separate fallback for tablet; 3D scenes may appear small.  The `TabletDevice` and `MobileDevice` components expect the same scale.
- **430 px / 390 px / 360 px:** On narrow viewports the 3D canvas may overflow or letterbox.  There is no evidence of device‑specific scaling logic.  The fallback 2D skeleton may display the same as desktop.

**Recommendation:** implement responsive wrappers around the 3D canvas to maintain aspect ratios across devices.  Provide an adaptive fallback (non‑3D) for very small screens.  Test at each breakpoint to adjust camera offsets or FOV.

---

## J. Performance Findings

- **Runtime:** Without seeing the live 3D experience, performance can only be inferred from code.  The use of many `useFrame` hooks across components means multiple per‑frame updates.  If combined with high‑poly models or heavy materials, this could impact FPS.
- **Scroll smoothness:** The scroll controller uses `useSpring` smoothing (not shown in code), but abrupt camera keyframes and weight jumps may cause jank.  The fallback skeleton hints that devices with no hardware acceleration may default to fallback.
- **useFrame risks:** Components such as `LaptopDevice`, `TabletDevice`, `MobileDevice`, `ResponsiveLayoutMorph`, `FinalSystemComposition` all call `useFrame` for simple animations【85395983617728†L530-L552】【769902051338293†L17-L33】【865198769396720†L127-L152】.  These could be combined or throttled.
- **Geometry/material risks:** Device components construct multiple meshes and materials each render.  However, they use simple primitives; no large GLB models are present yet.
- **Build/runtime risks:** The absence of dynamic imports or code splitting might increase bundle size.  Scenes 7–8 include heavy logic (system heartbeat, pipeline) that loads even if not viewed.

---

## K. Code Architecture Findings

- **Camera:** `cameraKeyframes.ts` stores placeholder values and does not derive distances from actual device models【780952702380263†L3-L13】.  The `CameraDirector` (not inspected here) likely interpolates between these states but cannot fix abrupt transitions alone.
- **Scroll:** `scrollSegments.ts` centralises weight distribution and sub‑phases【410232512343975†L20-L26】.  This is good separation but the current weights need recalibration and are manually tuned per scene【410232512343975†L75-L109】.
- **Scene configs:** Each scene has its own `sceneXXConfig.ts` for sub‑phases and colors; these are well‑structured and typed.  Some scenes (e.g., Scene 05) define sub‑phase logic locally instead of a config file.
- **SceneManager:** Not analysed; but given the modular structure, scenes are probably mounted sequentially according to scroll progress.  It may not unify transitions or share context.
- **Device/content expansion:** There is no abstraction for expanding content outside devices.  Each scene positions content on the device screen and never detaches it.
- **Fallback/static:** The fallback folder provides a skeleton but lacks polished content or detection logic.

---

## L. Recommended Fix Roadmap

### Task A — Enable 3D Experience & Fallback Logic
- **Goal:** Ensure users experience the full 3D portfolio by default.
- **Files touched:** `portfolioStore`, `fallback` components, deployment config.
- **Risk level:** **High** — gating issue.
- **Acceptance criteria:** On load, WebGL scenes render if supported; the fallback appears only when the user toggles reduced motion or the browser lacks WebGL.
- **QA needed:** Test on various browsers/devices; ensure toggle works.

### Task B — Global Camera Pacing Recalibration
- **Goal:** Replace placeholder keyframes with values derived from device dimensions and adjust scroll segment weights.
- **Files touched:** `cameraKeyframes.ts`, `scrollSegments.ts`, all `sceneXXConfig.ts` files.
- **Risk level:** **High** — affects every scene.
- **Acceptance criteria:** Light scroll moves the camera slightly; enter/immerse/exit phases feel smooth; no teleporting.  Scenes have enough hold time for reading content.
- **QA needed:** Visual testing of each scene on desktop and mobile; adjust FOV and positions accordingly.

### Task C — Story Arc / Transition Narrative Pass
- **Goal:** Craft a clear narrative and visual motif linking scenes.
- **Files touched:** `content` files for copy, all `scenes` and transition components.
- **Risk level:** **Medium**.
- **Acceptance criteria:** Each scene transition has a visible source and target; copy explains why the next scene matters.  The arc flows from who the developer is → how they think → what they have built → why it matters → call to action.
- **QA needed:** Review with stakeholders; gather feedback on storytelling clarity.

### Task D — Device‑to‑Expanded Content System
- **Goal:** Implement a reusable pattern for expanding content beyond device screens during the immerse phase.
- **Files touched:** New helper component (e.g., `ScreenExpander.tsx`), modifications to `Scene04Projects`, `Scene05ProductUX`, `Scene06ResponsivePerformance`.
- **Risk level:** **Medium**.
- **Acceptance criteria:** Content starts inside device; when the camera enters the hold phase, the screen plane detaches and scales up; content reorganises into a layout that fills the frame.  On exit, the content collapses back into the device.
- **QA needed:** Check readability and transition smoothness; ensure reverse scroll works.

### Task E — Transition Source/Target Alignment
- **Goal:** Align all transition effects with actual objects to avoid floating elements.
- **Files touched:** `DataTunnel.tsx`, `ApiRoutePulse.tsx`, `FinalSystemComposition.tsx` and any custom transitions.
- **Risk level:** **Medium**.
- **Acceptance criteria:** Data lines or particles always originate from the previous device’s screen or node.  Lines converge logically on the next scene’s anchor.  The viewer can trace the path of information.
- **QA needed:** Visual inspection of transitions in both directions.

### Task F — Background Environment Motion Layer
- **Goal:** Add cinematic ambience without distraction.
- **Files touched:** A new `BackgroundLayer` component used by all scenes; modifications to existing scenes.
- **Risk level:** **Low** but requires GPU testing.
- **Acceptance criteria:** Subtle particles/fog move in the background and respond to scroll (e.g., accelerate during transitions).  Must not degrade FPS or obscure content.
- **QA needed:** Test on low‑end devices; check visibility.

### Task G — Responsive Framing & Accessibility Pass
- **Goal:** Ensure the experience scales across devices and is accessible.
- **Files touched:** `CameraDirector`, `ResponsiveLayoutMorph`, CSS/HTML wrappers.
- **Risk level:** **Medium**.
- **Acceptance criteria:** Scenes maintain framing on 16:9, 4:3, and mobile aspect ratios.  Text is legible.  Provide alternative navigation via keyboard and screen reader support.
- **QA needed:** Browser testing at 430 px, 390 px, 360 px widths; manual accessibility testing.

### Task H — Performance Safety Pass
- **Goal:** Optimise animation loops and geometry.
- **Files touched:** Components using `useFrame`, heavy geometry definitions.
- **Risk level:** **Medium**.
- **Acceptance criteria:** Consolidate multiple `useFrame` hooks into a single loop per scene when possible; use React Three Drei helpers (e.g., `<Float>`).  Deactivate animations when scenes are offscreen.  Monitor FPS.  Lazy‑load heavy components.
- **QA needed:** Use dev tools to measure FPS and CPU usage; test with lower‑end devices.

---

## M. What NOT to Fix Yet

- Do not add extra features (e.g., VR mode, audio narration) until the core pacing and storytelling problems are resolved.
- Do not integrate heavy post‑processing effects (bloom, DOF) until performance is verified.
- Avoid refactoring all components into one file; maintain modularity for clarity.
- Do not finalise color palettes or minor style tweaks until after the narrative pass.

---

## N. Final Recommendation

The current portfolio is at an early stage: it compiles and contains the building blocks of a cinematic journey, but the 3D experience is inaccessible and the pacing/storytelling are incomplete.  The first priority is to **enable the 3D scenes** (Task A) so that testing and iteration are possible.  Once the experience is viewable, tackle **global camera pacing** and **scroll segmentation** (Task B) to create a smooth journey.  Only after these systemic issues are solved should you move on to narrative refinement and device/content expansion.  Implement changes incrementally—fix one systemic layer at a time, test thoroughly, then proceed.  Avoid a single massive refactor; focus on the core problems in sequence.
