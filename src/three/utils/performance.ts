import type * as THREE from 'three';

export interface RendererSnapshot {
  fps: number;
  frameDeltaMs: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
}

/**
 * Extracts real-time draw call, triangle, and memory allocation info
 * directly from the Three.js WebGLRenderer info object.
 */
export function captureRendererMetrics(gl: THREE.WebGLRenderer, currentFps = 60, lastDeltaMs = 16.67): RendererSnapshot {
  const info = gl.info;
  return {
    fps: Math.round(currentFps),
    frameDeltaMs: Number(lastDeltaMs.toFixed(2)),
    drawCalls: info.render.calls,
    triangles: info.render.triangles,
    geometries: info.memory.geometries,
    textures: info.memory.textures,
  };
}

/**
 * Lightweight rolling FPS window tracker that can be updated in useFrame
 * without triggering React re-renders.
 */
export class FramePerformanceTracker {
  private sampleCount = 0;
  private accumulatedTime = 0;
  private currentFps = 60;
  private lastDeltaMs = 16.67;

  public update(deltaSeconds: number): void {
    this.sampleCount++;
    this.accumulatedTime += deltaSeconds;
    this.lastDeltaMs = deltaSeconds * 1000;

    if (this.accumulatedTime >= 0.5) {
      this.currentFps = (this.sampleCount / this.accumulatedTime);
      this.sampleCount = 0;
      this.accumulatedTime = 0;
    }
  }

  public getFps(): number {
    return Math.round(this.currentFps);
  }

  public getLastDeltaMs(): number {
    return Number(this.lastDeltaMs.toFixed(2));
  }
}
