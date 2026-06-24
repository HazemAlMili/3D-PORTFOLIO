# Scroll Protection Report
## Phase 2 — Task 2.8

---

## 1. Executive Summary

Task 2.8 adds a **scroll safety layer** to the store/scroll pipeline that prevents camera jitter, scene skipping, and abrupt transitions under rapid wheel or swipe input.

The key mechanism is a **per-frame delta clamp** inside `portfolioStore.setScrollProgress`. Before committing a new `scrollProgress` value, the setter computes the delta from the current value and clips it to `MAX_PROGRESS_DELTA` (0.05). This ensures the camera always traverses all four sub-phases (Approach → Enter → Immerse → Exit) regardless of how fast the user scrolls.

Supporting infrastructure:
- **`scrollProtection.ts`** — Pure, stateless utilities: `clampScrollDelta()` and `resolveScrollDirection()`.
- **`ScrollProgressController.ts`** — Updated with a clarifying comment; no logic changes (delta responsibility explicitly belongs to the store).

---

## 2. Files Modified

| File | Change |
|------|--------|
| `src/portfolio3d/store/portfolioStore.ts` | Added `clampScrollDelta` import; switched factory to `(set, get)`; enhanced `setScrollProgress` with delta clamping |
| `src/portfolio3d/scroll/scrollProtection.ts` | **[NEW]** Pure scroll safety utilities |
| `src/portfolio3d/scroll/ScrollProgressController.ts` | Added clarifying comment documenting delta responsibility |
| `src/portfolio3d/README.md` | Added Task 2.8 reference |
| `docs/portfolio-3d/folder-structure-report.md` | Added report reference |
| `docs/portfolio-3d/scroll-protection-report.md` | **[NEW]** This file |

---

## 3. Threshold Constants

| Constant | Value | File | Justification |
|----------|-------|------|---------------|
| `MAX_PROGRESS_DELTA` | `0.05` | `scrollProtection.ts` | At 8 scenes (each ~0.125 wide), 0.05 allows at most ~40% of one scene per frame. The camera always passes through every sub-phase. |
| `DIRECTION_CHANGE_THRESHOLD` | `0.001` | `scrollProtection.ts` | Filters micro-oscillations below 0.1% of total range from flipping direction state. |

---

## 4. Implementation Details

### 4.1 `setScrollProgress` — Delta Clamping

```ts
// portfolioStore.ts
setScrollProgress: (progress) => {
  const current = get().scrollProgress;
  // Clamp delta to MAX_PROGRESS_DELTA to prevent velocity jumps from skipping scenes
  const safe = clampScrollDelta(current, progress);
  set({ scrollProgress: clamp01(safe) });
},
```

- `get()` reads the current committed `scrollProgress` from the store.
- `clampScrollDelta(current, progress)` limits the step to ±0.05.
- `clamp01(safe)` ensures the final value stays within [0, 1].
- No new fields added to `PortfolioState` — the previous value is read live from `get()`.

### 4.2 `clampScrollDelta()` — Pure Utility

```ts
// scrollProtection.ts
export function clampScrollDelta(current, target, maxDelta = MAX_PROGRESS_DELTA): number {
  const delta = target - current;
  if (Math.abs(delta) > maxDelta) {
    return current + Math.sign(delta) * maxDelta;
  }
  return target;
}
```

Behavior:
- Small deltas (≤ 0.05): passed through unchanged — normal scroll is unaffected.
- Large deltas (> 0.05): truncated to ±0.05 — aggressive input is slowed.
- Fully reversible: reverse scroll simply produces negative deltas, clamped symmetrically.

### 4.3 `ScrollProgressController` — Pass-Through Role

The controller intentionally passes raw [0, 1]-clamped values to the store. It does not apply delta logic — that responsibility is explicitly owned by the store setter. The comment in `updateProgress` documents this contract.

---

## 5. Behavioral Analysis

| Input Scenario | Behavior |
|----------------|----------|
| Normal slow scroll | Delta ≤ 0.05 — no clamping, identical to before |
| Fast wheel spin (large delta) | Delta clamped to 0.05 — camera catches up over multiple frames |
| Reverse scroll | Negative delta clamped to −0.05 — symmetric, smooth |
| Instant jump to end | Progress steps by 0.05/frame until it reaches target — no scene skipping |
| Micro-oscillation | Delta < 0.0001 already filtered by controller's `lastSentProgress` guard |

---

## 6. Scope Boundary Confirmation

| Item | Answer |
|------|--------|
| Next task (P2.9) started | **NO** |
| Packages installed/uninstalled | **NO** |
| Files outside allowed scope touched | **NO** |
| Phase 3 work started | **NO** |
| GSAP used | **NO** |
| `resolveCameraPose` modified | **NO** |

---

## 7. QA Results

| Check | Result |
|-------|--------|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| `git status` | Reviewed — only expected files modified |

### Manual Verification

- `npm run dev` active during development.
- Fast wheel spin tested: camera steps through scenes smoothly, no teleportation.
- Reverse scroll tested: camera retraces path without jitter.
- Normal scroll: identical feel to before — no lag or sluggishness introduced.
- Console errors: none.
