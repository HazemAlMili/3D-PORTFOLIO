import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Material } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { usePointerInfluence } from "../interaction/usePointerInfluence";
import { GlobalSceneBackground } from "../background/GlobalSceneBackground";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { Scene01Opening } from "./Scene01Opening";
import { Scene02Hero } from "./Scene02Hero";
import { Scene03Architecture } from "./Scene03Architecture";
import { Scene04Projects } from "./Scene04Projects";
import { Scene05ProductUX } from "./Scene05ProductUX";
import { Scene06ResponsivePerformance } from "./Scene06ResponsivePerformance";
import { Scene07SystemCore } from "./Scene07SystemCore";
import { Scene08Contact } from "./Scene08Contact";
import { buildSceneSegments } from "../scroll/scrollSegments";
import type { SceneId } from "../content/types";
import { getStationPosition, SPATIAL_BOARD_ENABLED } from "../spatial/spatialBoardConfig";
import { getSceneFadeOpacity } from "./sceneFade";

interface SceneManagerProps {
  /** When false, suppresses all scene rendering (layout suppression for inactive states). */
  visible?: boolean;
}

interface FadeGroupProps {
  opacity: number;
  children: React.ReactNode;
}

function FadeGroup({ opacity, children }: FadeGroupProps) {
  const groupRef = useRef<Group>(null);
  const lastAppliedOpacityRef = useRef<number>(-1);

  const applyOpacity = (target: number, force = false) => {
    if (!groupRef.current) return;
    if (!force && Math.abs(lastAppliedOpacityRef.current - target) < 0.001) return;
    lastAppliedOpacityRef.current = target;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupRef.current.traverse((child: any) => {
      if (child.isMesh || child.isLine || child.isPoints || child.isSprite) {
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat: Material) => {
            if (!mat) return;

            // CRITICAL FIX: Do NOT read mat.opacity as the baseline.
            // The GLTF cache shares material objects across React mount/unmount cycles.
            // A previous cross-fade that faded a scene to 0 leaves mat.opacity=0 on
            // the cached material. Reading that as "original" corrupts every remount.
            //
            // Solution: tag with gltfBaseOpacity=1.0 on first encounter.
            // All GLTF scene materials in this project are fully opaque by default.
            // userData persists on the material object so it survives component remounts.
            if (mat.userData.gltfBaseOpacity === undefined) {
              mat.userData.gltfBaseOpacity = 1.0;
              mat.userData.gltfBaseTransparent = false;
            }
            const baseOpacity = mat.userData.gltfBaseOpacity as number;
            const baseTransparent = mat.userData.gltfBaseTransparent as boolean;

            if (target >= 1.0) {
              mat.transparent = baseTransparent;
              mat.opacity = baseOpacity;
            } else if (target <= 0.005) {
              mat.transparent = true;
              mat.opacity = 0;
            } else {
              mat.transparent = true;
              mat.opacity = baseOpacity * target;
            }
          });
        }
      }
      if (child.isLight) {
        if (child.userData.gltfBaseIntensity === undefined) {
          child.userData.gltfBaseIntensity = child.intensity;
        }
        child.intensity = (child.userData.gltfBaseIntensity as number) * target;
      }
    });
  };

  // Synchronous traversal before browser paint prevents 1-frame opacity flashes
  useLayoutEffect(() => {
    applyOpacity(opacity, true);
  }, [opacity, children]);

  useFrame(() => {
    applyOpacity(opacity);
  });

  return (
    <group ref={groupRef} visible={opacity > 0.005}>
      {children}
    </group>
  );
}



function renderScene(
  index: number,
  sceneId: string,
  localProgress: number,
  shouldRenderStatic: boolean,
  opacity: number
) {
  if (index === 0) {
    return (
      <Scene01Opening
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
      />
    );
  }
  if (index === 1) {
    return shouldRenderStatic ? null : (
      <Scene02Hero
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  if (index === 2) {
    return shouldRenderStatic ? null : (
      <Scene03Architecture
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  if (index === 3) {
    return shouldRenderStatic ? null : (
      <Scene04Projects
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  if (index === 4) {
    return shouldRenderStatic ? null : (
      <Scene05ProductUX
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  if (index === 5) {
    return shouldRenderStatic ? null : (
      <Scene06ResponsivePerformance
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  if (index === 6) {
    return shouldRenderStatic ? null : (
      <Scene07SystemCore
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  if (index === 7) {
    return shouldRenderStatic ? null : (
      <Scene08Contact
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
        opacity={opacity}
      />
    );
  }
  return (
    <ScenePlaceholder
      sceneId={sceneId as SceneId}
      sceneIndex={index}
      localProgress={localProgress}
    />
  );
}

export function SceneManager({ visible = true }: SceneManagerProps) {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const activeSceneIndex = usePortfolioStore((state) => state.activeSceneIndex);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  usePointerInfluence();

  // Layout suppression: render nothing when visibility is disabled
  if (!visible) return null;

  const shouldRenderStatic = reducedMotion === true;
  const segments = buildSceneSegments();

  // Unified clock: derive current scene index from the same smoothed progress
  const p = Math.min(1, Math.max(0, scrollProgress));
  let currentIdx = p >= 1
    ? segments.length - 1
    : segments.findIndex((s) => p >= s.start && p < s.end);
  if (currentIdx === -1) {
    currentIdx = Math.min(Math.max(0, activeSceneIndex), segments.length - 1);
  }

  // Support scene cross-fade adjacent indexing regardless of spatial board settings
  const getCrossFadeSceneIndexes = (idx: number, maxIdx: number) => {
    return Array.from(new Set([
      Math.max(0, idx - 1),
      idx,
      Math.min(maxIdx, idx + 1)
    ])).sort((a, b) => a - b);
  };

  const indexesToRender = getCrossFadeSceneIndexes(currentIdx, segments.length - 1);

  // P6 - SceneManager Transition Budget Thresholds
  const RENDER_THRESHOLD = 0.015;

  return (
    <group>
      {/* Global Cinematic System Background */}
      <GlobalSceneBackground />

      {indexesToRender.map((idx) => {
        const seg = segments[idx];
        const fadeOpacity = getSceneFadeOpacity(idx, scrollProgress, segments);

        // Always render the current active scene, or any scene with opacity above threshold (P6 budget)
        const shouldRender = idx === currentIdx || fadeOpacity > RENDER_THRESHOLD;

        if (!shouldRender) return null;

        const stationPos = getStationPosition(seg.sceneId as SceneId);
        // Calculate local progress for each mounted scene based on global scrollProgress
        const segLocalProgress = (scrollProgress - seg.start) / (seg.end - seg.start);
        const clampedProgress = Math.min(1, Math.max(0, segLocalProgress));
        return (
          <group key={seg.sceneId} position={SPATIAL_BOARD_ENABLED ? stationPos : [0, 0, 0]}>
             <FadeGroup opacity={fadeOpacity}>
                {renderScene(idx, seg.sceneId, clampedProgress, shouldRenderStatic, fadeOpacity)}
             </FadeGroup>
          </group>
        );
      })}
    </group>
  );
}
