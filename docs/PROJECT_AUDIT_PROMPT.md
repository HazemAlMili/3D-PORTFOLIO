# PROJECT AUDIT PROMPT — Cinematic 3D Portfolio Full Project Discovery

## Purpose

Before implementing any ticket, audit the full cinematic 3D portfolio project.

Do not write implementation code yet.

This audit is required so the agent understands the whole system before working on any single scene.

The project is not a normal website.

It is a scroll-driven cinematic 3D portfolio where:

- every scene is part of one continuous story
- camera movement is a core storytelling tool
- scenes must visually connect to each other
- UI/HUD overlays must stay synchronized with 3D visuals
- performance, mobile, reduced motion, and reverse scroll are mandatory

The agent must understand the project architecture before editing code.

---

# 1. Core Project Idea

This project is a cinematic 3D portfolio for a full-stack developer.

It should feel like:

```txt
an interactive product film
```

not:

```txt
a normal portfolio page
```

The portfolio should communicate:

```txt
I design, build, optimize, and ship complete digital products.
```

The experience should move through scenes using scroll.

Each scene should have:

- a visual story
- a camera story
- a clear purpose
- a clean transition from the previous scene
- a clean handoff to the next scene

---

# 2. Required Reading

First inspect the project root for planning/context files.

Read any of these if they exist:

```txt
SCENE_3_PLAN.md
SCENE_3_PHASES.md
README.md
docs/
docs/portfolio-3d/
```

Also inspect package/config files:

```txt
package.json
vite.config.*
tsconfig.*
eslint.*
src/
```

If any expected planning files are missing, report that clearly.

---

# 3. Audit Scope

Audit the whole portfolio architecture, including:

```txt
global app structure
routing / app entry
canvas setup
scroll system
scene segmentation
local scene progress
camera system
camera keyframes
scene mounting / unmounting
scene transitions / fading
DOM overlays
3D scene content
mobile behavior
reduced motion behavior
performance strategy
asset loading
error/fallback behavior
```

Do not focus only on the next ticket.

Understand the entire project before recommending implementation.

---

# 4. Files / Areas To Inspect

Inspect likely project areas:

```txt
src/
src/portfolio3d/
src/portfolio3d/scenes/
src/portfolio3d/components/
src/portfolio3d/camera/
src/portfolio3d/scroll/
src/portfolio3d/overlays/
src/portfolio3d/constants/
src/portfolio3d/store/
src/portfolio3d/utils/
src/r3f/
public/
```

Specific likely files:

```txt
cameraKeyframes.ts
scrollSegments.ts
ContentOverlayRoot.tsx
Scene01*
Scene02*
Scene03*
Scene04*
scene02Config.ts
scene03Config.ts
scene04Config.ts
ProductEngineOverlay.tsx
ProductEngineOverlay.module.css
```

Do not assume file names. Search the actual project.

---

# 5. Global Architecture Questions

Answer:

```txt
What framework is used?
How is the 3D canvas mounted?
How are scenes organized?
How many scenes exist?
Where are scenes defined?
How does the project route/render the portfolio?
How is state managed?
How is scroll progress stored and read?
How do 3D components receive local progress?
How do overlays sync with 3D scenes?
```

---

# 6. Scene Map Audit

Create a scene map.

For every scene currently in the project, identify:

```txt
Scene number/name
main purpose
main visual object
main camera behavior
DOM overlay copy
entry transition
exit transition
current status
known issues
files involved
```

At minimum inspect:

```txt
Scene 01
Scene 02
Scene 03
Scene 04
```

If more scenes exist, include them.

---

# 7. Camera System Audit

The camera is central to this project.

Answer:

```txt
How is the camera currently controlled?
Where are camera positions defined?
Does the camera use scene keyframes?
Does it support internal scene beats?
How are camera position and target interpolated?
Is FOV animated?
Is camera motion scroll-driven?
Is camera motion reversible?
How does reduced motion affect camera?
How does mobile affect camera?
```

Identify:

```txt
current strengths
limitations
safe extension points
files likely to change for camera work
files that must not change
```

---

# 8. Scroll System Audit

Answer:

```txt
How is global scroll progress calculated?
Where is scroll height defined?
What is the current scroll spacer height?
How are scene segments mapped?
How is local progress calculated?
How does reverse scroll behave?
Is scroll smoothing/damping applied?
How does mobile touch scroll behave?
```

Identify any risk around:

```txt
too fast pacing
too slow pacing
scene skipping
camera snapping
overlay desync
```

---

# 9. Overlay / HUD Audit

Answer:

```txt
How are DOM overlays mounted?
How does overlay visibility sync with scenes?
How does overlay pointer-events work?
How are mobile overlays handled?
Are HUDs visually overlapping 3D content?
Which overlay files control each scene?
```

For each major overlay, report:

```txt
scene
copy
layout
desktop behavior
mobile behavior
issues
```

---

# 10. Visual Theme Audit

The approved visual language should be consistent.

Audit whether the current project follows:

```txt
dark navy / black background
cyan / blue glow
premium cinematic depth
large hero objects
clean HUDs
strong negative space
few intentional lines
no clutter
no debug-looking paths
```

Report any scenes that feel inconsistent, such as:

```txt
flat dashboard
rough UI
random lines
too many labels
weak hero object
overlapping HUD
non-cinematic composition
```

---

# 11. Scene Transition Audit

For every scene transition, answer:

```txt
How does previous scene hand off to next scene?
Is there visual continuity?
Does the camera support the transition?
Does overlay copy change cleanly?
Is there geometry leaking between scenes?
Is there a black/empty gap?
```

Pay special attention to:

```txt
Scene 01 → Scene 02
Scene 02 → Scene 03
Scene 03 → Scene 04
```

---

# 12. Mobile Audit

Audit mobile behavior globally.

Check:

```txt
viewport detection
mobile-specific layout
mobile camera path
mobile overlay layout
touch scroll pacing
3D object scale
clipping / overflow
tiny unreadable labels
FPS impact
```

Required mobile sizes:

```txt
375x667
390x844
430x932
```

---

# 13. Reduced Motion Audit

Answer:

```txt
How is reduced motion detected?
Where is it stored/passed?
Which scenes support reduced motion?
Does reduced motion disable camera choreography?
Does it disable excessive animation?
Does each scene still show a complete readable state?
```

Reduced motion must not look broken or unfinished.

---

# 14. Performance Audit

Audit:

```txt
FPS
bundle size
expensive components
transparent surfaces
particles
line counts
geometry creation
useFrame usage
React state inside animation loops
postprocessing
asset loading
memory leaks
console warnings
```

Target:

```txt
Preferred: 55–60 FPS
Minimum: 45+ FPS
No sustained drops into teens
```

---

# 15. Safety / Guardrails

Do not modify anything during this audit.

Identify files that are especially sensitive:

```txt
global scroll
camera architecture
Scene 02 approved visual system
Scene 01 opening system
Scene 04 handoff receiver
shared config/constants
store/state
overlay root
```

Report what must not be touched for the next ticket.

---

# 16. Current Known Direction

Scene 03 is being rebuilt around:

```txt
Camera-led narrative
From Chaos to Product
```

But do not implement Scene 03 during this audit.

Just understand how the full project works so future Scene 03, Scene 04, Scene 05 work can be implemented safely.

Scene 03 final intended story:

```txt
Scene 02 energy
→ raw fragments
→ magnetic assembly
→ premium product shell
→ full-stack layers
→ optimization wave
→ final reveal
→ launch proof into Scene 04
```

---

# 17. Required Output Format

Return a structured audit report with these sections:

## A. Files inspected

List files and folders inspected.

## B. Project architecture summary

Explain the app/canvas/scene structure.

## C. Scene map

Table:

```txt
Scene | Purpose | Main visuals | Overlay | Camera | Status | Issues
```

## D. Scroll system summary

Explain global progress, local progress, scene segmentation, scroll height, smoothing.

## E. Camera system summary

Explain how camera currently works and whether it supports scene-local beats.

## F. Overlay/HUD summary

Explain overlay mounting, sync, layout, issues.

## G. Transition summary

Explain scene-to-scene handoffs.

## H. Mobile summary

Explain current mobile strategy and risks.

## I. Reduced motion summary

Explain current reduced-motion strategy and risks.

## J. Performance summary

FPS, risks, expensive areas, console state.

## K. Theme/visual consistency summary

Which scenes match the theme and which do not.

## L. Risk list

List risks before starting the next ticket.

## M. Recommended next implementation approach

For the next requested ticket, explain:

- safest files to change
- files to avoid
- implementation strategy
- QA evidence required

## N. Final recommendation

State whether the project is ready for the next ticket.

---

# 18. Mandatory Commands

Run if available:

```bash
npm run typecheck
npm run lint
npm run build
```

If dev server is available:

```bash
npm run dev
```

If preview is useful:

```bash
npm run preview
```

Report command results exactly.

---

# 19. Mandatory Visual Evidence

If browser access is available, capture at least:

```txt
1. Scene 01 representative shot
2. Scene 02 representative shot
3. Scene 03 current shot
4. Scene 04 representative shot
5. Mobile shot
6. Reduced motion shot if possible
```

If screenshots cannot be captured, state the limitation clearly.

No fake screenshot claims.

---

# 20. Audit Rules

Do not implement.

Do not refactor.

Do not fix bugs.

Do not modify code.

Do not change visuals.

Do not change scroll.

Do not change camera.

This is discovery only.

Expected final line:

```txt
PASS — Full project audit complete. The portfolio architecture, scenes, scroll system, camera system, overlays, transitions, mobile behavior, reduced-motion behavior, performance risks, visual theme, and safe implementation path are understood.
```
