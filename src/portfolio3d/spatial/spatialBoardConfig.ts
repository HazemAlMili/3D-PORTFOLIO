import type { SceneId } from "../content/types";

/**
 * Feature flag for the global spatial board journey.
 * If false, scenes mount locally at [0,0,0] as isolated scenes.
 * If true, SceneManager will mount adjacent stations based on these offsets.
 */
export const SPATIAL_BOARD_ENABLED = false;

export type StationPosition = readonly [number, number, number];

export const SPATIAL_STATION_POSITIONS: Record<SceneId, StationPosition> = {
  "scene-01-opening": [0, 0, 0],
  "scene-02-hero": [0, 0, -25],
  "scene-03-architecture": [25, 0, -25],
  "scene-04-projects": [50, 0, -25],
  "scene-05-product-ux": [50, 0, -50],
  "scene-06-responsive-performance": [75, 0, -50],
  "scene-07-system-core": [75, 0, -75],
  "scene-08-contact": [100, 0, -75],
};

export function getStationPosition(sceneId: SceneId): StationPosition {
  return SPATIAL_STATION_POSITIONS[sceneId] || [0, 0, 0];
}

export function getAdjacentSceneIndexes(currentIndex: number, maxIndex: number): number[] {
  if (!SPATIAL_BOARD_ENABLED) {
    return [currentIndex];
  }
  
  const indexes: number[] = [];
  if (currentIndex > 0) indexes.push(currentIndex - 1);
  indexes.push(currentIndex);
  if (currentIndex < maxIndex) indexes.push(currentIndex + 1);
  
  return indexes;
}
