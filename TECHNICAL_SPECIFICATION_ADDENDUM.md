# TECHNICAL SPECIFICATION ADDENDUM
## Closes the gaps flagged against EXECUTION_TASK_BREAKDOWN.md

Every section below maps to specific task IDs from the breakdown and replaces a vague instruction with a concrete, implementable decision. Nothing here changes scope or creative direction — it only removes ambiguity from *how* the already-approved tasks get built.

---

## 1. Camera Pose & Interpolation System
**Closes: Task 2.1, 2.2, 2.3–2.6**

### Decision
Linear interpolation per sub-phase with cubic ease, not a single global spline through all 8 scenes. A global spline is smoother on paper but risks overshoot/loop-back when keyframes are authored independently per scene, and it makes reverse-scroll harder to reason about. Per-segment lerp is fully deterministic, trivially reversible (it's a pure function of `globalProgress`, no hidden state), and easy to unit test in isolation per scene.

### Types
```ts
// cameraTypes.ts
export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface SceneCameraStates {
  approach: CameraPose;
  enter: CameraPose;
  exit: CameraPose;
}
```

### Scroll segmentation
```ts
// scrollSegments.ts
export interface SceneSegment {
  sceneId: string;
  start: number; // global progress 0–1
  end: number;
  subPhases: {
    approach: [number, number]; // local 0–1 range within this segment
    enter: [number, number];
    immerse: [number, number];
    exit: [number, number];
  };
}

// Weighted by content density — Projects (04) and Final Contact (08)
// carry more scroll length because they hold more content to page through.
// Sums to 1.0, ordered Scene 01 → 08.
export const SCROLL_WEIGHTS = [0.08, 0.10, 0.12, 0.18, 0.12, 0.10, 0.12, 0.18];

export function buildSceneSegments(weights: number[] = SCROLL_WEIGHTS): SceneSegment[] {
  let cursor = 0;
  return weights.map((w, i) => {
    const start = cursor;
    const end = cursor + w;
    cursor = end;
    return {
      sceneId: `scene-${String(i + 1).padStart(2, "0")}`,
      start,
      end,
      subPhases: {
        approach: [0, 0.25],
        enter: [0.25, 0.45],
        immerse: [0.45, 0.8], // camera holds still; content/overlay does the work here
        exit: [0.8, 1.0],
      },
    };
  });
}
```

### Resolver (pure, unit-testable — this is the function Task 2.2 was pointing at)
```ts
// cameraUtils.ts
import type { CameraPose, SceneCameraStates } from "./cameraTypes";
import type { SceneSegment } from "./scrollSegments";

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function normalize(v: number, min: number, max: number): number {
  return clamp01((v - min) / (max - min || 1));
}

function lerpVec3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function lerpPose(a: CameraPose, b: CameraPose, t: number): CameraPose {
  return {
    position: lerpVec3(a.position, b.position, t),
    target: lerpVec3(a.target, b.target, t),
    fov: a.fov + (b.fov - a.fov) * t,
  };
}

export function resolveCameraPose(
  globalProgress: number,
  segments: SceneSegment[],
  sceneStates: Record<string, SceneCameraStates>,
): CameraPose {
  const p = clamp01(globalProgress);
  let index = segments.findIndex((s) => p >= s.start && p <= s.end);
  if (index === -1) index = p <= 0 ? 0 : segments.length - 1;

  const segment = segments[index];
  const localT = normalize(p, segment.start, segment.end);
  const states = sceneStates[segment.sceneId];
  const { approach, enter, immerse, exit } = segment.subPhases;

  if (localT <= approach[1]) {
    const t = easeInOutCubic(normalize(localT, approach[0], approach[1]));
    const prevStates = index > 0 ? sceneStates[segments[index - 1].sceneId] : states;
    return lerpPose(prevStates.exit, states.approach, t);
  }
  if (localT <= enter[1]) {
    const t = easeInOutCubic(normalize(localT, enter[0], enter[1]));
    return lerpPose(states.approach, states.enter, t);
  }
  if (localT <= immerse[1]) {
    return states.enter; // camera holds; overlay content reveals on top
  }
  const t = easeInOutCubic(normalize(localT, exit[0], exit[1]));
  return lerpPose(states.enter, states.exit, t);
}
```

### What's still asset-dependent (and why I'm not faking it)
`position` and `target` values in each `CameraPose` depend on each device's real bounding box once it's exported from Blender. Author them with this formula rather than guessing:

```
enter.position = device.center + device.screenNormal * (device.screenHeight * 0.15)
enter.target   = device.screenCenter
approach.position = enter.position + device.screenNormal * (device.screenHeight * 1.8)
exit.position = approach.position (mirror of approach, same side)
```

This is the one piece of this spec that requires the actual GLB in hand — everything else here is decidable today.

---

## 2. Global State Schema
**Closes: Task 1.5**

```ts
// store/portfolioStore.ts
import { create } from "zustand";

export type DeviceTier = "low" | "medium" | "high";

export interface PortfolioState {
  scrollProgress: number;
  activeSceneIndex: number;
  sceneLocalProgress: number;
  deviceTier: DeviceTier;
  reducedMotion: boolean;
  webglSupported: boolean;
  isLoading: boolean;

  setScrollProgress: (progress: number) => void;
  setActiveScene: (index: number, localProgress: number) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setReducedMotion: (value: boolean) => void;
  setWebglSupported: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  activeSceneIndex: 0,
  sceneLocalProgress: 0,
  deviceTier: "high",
  reducedMotion: false,
  webglSupported: true,
  isLoading: true,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveScene: (index, localProgress) =>
    set({ activeSceneIndex: index, sceneLocalProgress: localProgress }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setWebglSupported: (value) => set({ webglSupported: value }),
  setLoading: (value) => set({ isLoading: value }),
}));
```

`reducedMotion` and `deviceTier` are orthogonal axes — don't conflate them. Combine logic: render the simplified/static experience if `reducedMotion === true` **OR** `deviceTier === 'low'` and the visitor hasn't explicitly opted into the full 3D version via a "view full experience" affordance.

---

## 3. Device Tiering Mechanism
**Closes: Cross-Cutting Note "Device tiering," referenced by Phase 8 task 8.7 and every scene's perf budget**

### Decision
Use `detect-gpu` (real, maintained npm package) for a one-time classification on load, cached in the store. Don't roll a custom heuristic — GPU benchmarking is a solved problem and a custom version will be less accurate.

```ts
// performance/resolveDeviceTier.ts
import { getGPUTier } from "detect-gpu";
import type { DeviceTier } from "../store/portfolioStore";

export async function resolveDeviceTier(): Promise<DeviceTier> {
  const result = await getGPUTier();
  if (result.tier <= 1) return "low";
  if (result.tier === 2) return "medium";
  return "high";
}
```

### Budget table by tier
| Tier | Shadows | Active particles | Post-processing | Texture res | Active lights |
|---|---|---|---|---|---|
| high | soft shadows, Scene 02 + Scene 09 only | ≤2000 | bloom, light DOF | 2048 (KTX2) | 3–4 |
| medium | baked AO only, no real-time shadows | ≤800 | bloom only, low intensity | 1024 (KTX2) | 2 |
| low | off | ≤200 or static fallback | none | 512 (KTX2) | 1 |

---

## 4. Portal Transition Variant Assignment
**Closes: Task 0.2 — "assign a variant, confirm no two adjacent scenes repeat"**

Of the 8 scenes, only 5 are true screen-portal entries (Scenes 02–06). Scene 01 is a bookend (seal-strike, not an entry), Scene 07 enters a non-screen environment (data-tunnel, already specified by the source plan), and Scene 08 is a composite pull-back (not an entry). So 5 entries map cleanly across 7 available variants with zero forced repetition:

| Scene | Device | Assigned Variant |
|---|---|---|
| 01 — Opening | — | Custom: seal-strike + pullback (bookend, no portal) |
| 02 — Hero | Main Display | **Variant 1** — Direct zoom into screen |
| 03 — Architecture | Ultrawide | **Variant 4** — Device UI opens like a system window |
| 04 — Projects | Laptop | **Variant 3** — Screen pixels transform into content grid |
| 05 — Product UX | Tablet | **Variant 2** — Screen surface expands into content world |
| 06 — Responsive | Mobile | **Variant 6** — Interface frame dissolves into full section |
| 07 — System Core | — | **Variant 5** — Data tunnel (per source plan, Section 6 Scene 07) |
| 08 — Final Contact | — | Custom: composite pull-back reveal (bookend, no portal) |

Variant 7 (camera passes through glass/screen reflection) is intentionally held in reserve — usable later for an inter-device "Transfer" beat (e.g. the laptop→tablet move) if Phase 11 polish wants more visual variety, but not required to hit the "no repetition" rule.

---

## 5. Content Config Interfaces
**Closes: Task 0.3**

```ts
// content/types.ts
export interface HeroContent {
  name: string;
  role: string;
  valueProposition: string;
  primaryCta: { label: string; action: "scrollTo"; target: string };
  secondaryCta: { label: string; action: "scrollTo"; target: string };
  socialLinks?: { github?: string; linkedin?: string };
}

export interface ArchitectureLayer {
  id: string;
  label: string;
  description: string;
}
export interface ArchitectureContent {
  headline: string;
  layers: ArchitectureLayer[]; // ordered: Frontend -> API -> Backend -> Database -> Deployment
  supportingMessages: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  oneLineDescription: string;
  problem: string;
  built: string;
  stack: string[];
  architectureNote: string;
  result: string;
  liveUrl?: string;
  githubUrl?: string;
}
export interface ProjectsContent {
  headline: string;
  projects: ProjectEntry[]; // length must be 2–4, enforced below
}

export interface ProductThinkingContent {
  headline: string;
  principles: string[];
}

export interface ResponsivePerformanceContent {
  headline: string;
  coreMessage: string;
  topics: string[];
}

export interface SystemCoreContent {
  headline: string;
  requiredMessage: string;
  topics: string[];
}

export interface ContactContent {
  headline: string;
  closingLine: string;
  email: string;
  linkedin?: string;
  github?: string;
  cvUrl: string;
}

export interface NavigationContent {
  quickNavLabels: { sceneId: string; label: string }[];
  skipToProjectsSceneId: string;
  skipToContactSceneId: string;
}

export interface PortfolioContentConfig {
  hero: HeroContent;
  architecture: ArchitectureContent;
  projects: ProjectsContent;
  productThinking: ProductThinkingContent;
  responsivePerformance: ResponsivePerformanceContent;
  systemCore: SystemCoreContent;
  contact: ContactContent;
  navigation: NavigationContent;
}
```

### Build-time enforcement (not just convention)
```ts
// content/validateContent.ts — run in a prebuild script, fail the build on violation
import { z } from "zod";

export const ContentSchema = z.object({
  projects: z.object({
    projects: z.array(z.any()).min(2).max(4),
  }),
  contact: z.object({
    cvUrl: z.string().min(1), // pair with a fetch/existence check in CI, not just a string check
  }),
});
```
This is what turns "Task 10.5 — confirm CV is a real file" from a manual checklist item into something the build itself refuses to ship without.

---

## 6. Asset Budgets
**Closes: every scene-phase task that says "build device geometry" with no numeric ceiling**

| Asset | Max triangles | Texture resolution | Compressed GLB size |
|---|---|---|---|
| Main Display (Scene 02) | 8,000 | 2048 screen / 1024 body | <300 KB |
| Ultrawide Monitor (Scene 03) | 8,000 | 2048 | <300 KB |
| Laptop (Scene 04) | 10,000 | 1024 | <350 KB |
| Tablet (Scene 05) | 6,000 | 1024 | <200 KB |
| Mobile (Scene 06) | 5,000 | 1024 | <150 KB |
| System Core environment (Scene 07) | 25,000 | 2048 core / 512 instanced detail | <800 KB |
| Seal/opening object (Scene 01) | 4,000 or shader-only, no mesh | 512 if textured | <100 KB |

Compression: Draco for geometry, KTX2/Basis for textures — both decided once in Phase 1 tooling setup, not re-chosen per scene.

**Load strategy:** preload Scene N+1's GLB while Scene N is in its `immerse` sub-phase, via `useGLTF.preload()` triggered off `activeSceneIndex`. Never bundle all 8 devices' assets in the initial load.

**Page weight budget:**
- Critical path (Scene 01 + 02 only): <1.5 MB JS (gzipped) + <1 MB assets
- Full journey, lazy-loaded across all 8 scenes: <8 MB total

---

## 7. Measurable QA Thresholds
**Closes: every "feels premium" / "feels complete" Lock Criterion — these stay as the subjective gate, but now have an objective fallback when the call is ambiguous**

| Metric | Threshold |
|---|---|
| Desktop FPS | ≥55 sustained; never below 30 for >500ms during any transition |
| Lighthouse Performance (fallback page, mobile) | ≥85 |
| LCP | <2.5s |
| CLS | <0.1 |
| Initial JS bundle (gzipped, pre scene-chunking) | <350 KB |
| Console errors across full QA matrix (Phase 12) | 0 |

---

## Summary: what's now decided vs. what's still pending

**Decided today, ready to implement as-is:** state schema, camera interpolation math, scroll segment weights, device-tier detection + budget table, portal variant assignment, content interfaces + build-time validation, asset size ceilings, measurable QA thresholds.

**Still pending — genuinely asset-dependent, not avoidable:** exact `position`/`target` numbers in each `CameraPose`. The formula in Section 1 generates these correctly once real GLB bounding boxes exist; no spec can responsibly invent those numbers before the models do.
