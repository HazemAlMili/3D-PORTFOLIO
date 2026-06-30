import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
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
import { getAdjacentSceneIndexes, getStationPosition, SPATIAL_BOARD_ENABLED } from "../spatial/spatialBoardConfig";

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

  // Synchronous traversal to set opacity before browser paints (prevents 1-frame flashes)
  useLayoutEffect(() => {
    if (!groupRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupRef.current.traverse((child: any) => {
      if (child.isMesh || child.isLine || child.isPoints || child.isSprite) {
        if (child.material) {
          if (child.userData.originalOpacity === undefined) {
            child.userData.originalOpacity = child.material.opacity ?? 1.0;
          }
          if (child.userData.originalTransparent === undefined) {
            child.userData.originalTransparent = child.material.transparent ?? false;
          }

          if (opacity < 1.0) {
            child.material.transparent = true;
            child.material.opacity = child.userData.originalOpacity * opacity;
          } else {
            child.material.transparent = child.userData.originalTransparent;
            child.material.opacity = child.userData.originalOpacity;
          }
        }
      }
      if (child.isLight) {
        if (child.userData.originalIntensity === undefined) {
          child.userData.originalIntensity = child.intensity;
        }
        child.intensity = child.userData.originalIntensity * opacity;
      }
    });
  }, [opacity, children]);

  useFrame(() => {
    if (!groupRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupRef.current.traverse((child: any) => {
      if (child.isMesh || child.isLine || child.isPoints || child.isSprite) {
        if (child.material) {
          if (child.userData.originalOpacity === undefined) {
            child.userData.originalOpacity = child.material.opacity ?? 1.0;
          }
          if (child.userData.originalTransparent === undefined) {
            child.userData.originalTransparent = child.material.transparent ?? false;
          }

          if (opacity < 1.0) {
            child.material.transparent = true;
            child.material.opacity = child.userData.originalOpacity * opacity;
          } else {
            child.material.transparent = child.userData.originalTransparent;
            child.material.opacity = child.userData.originalOpacity;
          }
        }
      }
      if (child.isLight) {
        if (child.userData.originalIntensity === undefined) {
          child.userData.originalIntensity = child.intensity;
        }
        child.intensity = child.userData.originalIntensity * opacity;
      }
    });
  });

  return (
    <group ref={groupRef} visible={opacity > 0.01}>
      {children}
    </group>
  );
}

function renderScene(
  index: number,
  sceneId: string,
  localProgress: number,
  shouldRenderStatic: boolean
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
      />
    );
  }
  if (index === 2) {
    return shouldRenderStatic ? null : (
      <Scene03Architecture
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
      />
    );
  }
  if (index === 3) {
    return shouldRenderStatic ? null : (
      <Scene04Projects
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
      />
    );
  }
  if (index === 4) {
    return shouldRenderStatic ? null : (
      <Scene05ProductUX
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
      />
    );
  }
  if (index === 5) {
    return shouldRenderStatic ? null : (
      <Scene06ResponsivePerformance
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
      />
    );
  }
  if (index === 6) {
    return shouldRenderStatic ? null : (
      <Scene07SystemCore
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
      />
    );
  }
  if (index === 7) {
    return shouldRenderStatic ? null : (
      <Scene08Contact
        sceneId={sceneId as SceneId}
        sceneIndex={index}
        localProgress={localProgress}
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
  const deviceTier = usePortfolioStore((state) => state.deviceTier);

  // Layout suppression: render nothing when visibility is disabled
  if (!visible) return null;

  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";
  const segments = buildSceneSegments();

  // Unified clock: derive current scene index from the same smoothed progress
  const p = Math.min(1, Math.max(0, scrollProgress));
  let currentIdx = p >= 1
    ? segments.length - 1
    : segments.findIndex((s) => p >= s.start && p < s.end);
  if (currentIdx === -1) {
    currentIdx = Math.min(Math.max(0, activeSceneIndex), segments.length - 1);
  }

  const indexesToRender = getAdjacentSceneIndexes(currentIdx, segments.length - 1);

  return (
    <group>
      {indexesToRender.map((idx) => {
        const seg = segments[idx];
        const stationPos = getStationPosition(seg.sceneId as SceneId);
        // Calculate local progress for each mounted scene based on global scrollProgress
        const segLocalProgress = (scrollProgress - seg.start) / (seg.end - seg.start);
        const clampedProgress = Math.min(1, Math.max(0, segLocalProgress));
        return (
          <group key={seg.sceneId} position={SPATIAL_BOARD_ENABLED ? stationPos : [0, 0, 0]}>
             <FadeGroup opacity={1.0}>
                {renderScene(idx, seg.sceneId, clampedProgress, shouldRenderStatic)}
             </FadeGroup>
          </group>
        );
      })}
    </group>
  );
}
