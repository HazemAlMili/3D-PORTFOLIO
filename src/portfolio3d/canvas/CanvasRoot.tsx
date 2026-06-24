import { Canvas } from "@react-three/fiber";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { SceneManager } from "../scenes";
import { CameraController } from "../camera";
import "./CanvasRoot.css";

export function CanvasRoot() {
  return (
    <div className="portfolio3d-canvas-container">
      <CanvasErrorBoundary>
        <Canvas
          camera={{
            position: [0, 0, 6],
            fov: 50,
            // near: 0.1 — allows close-up device entry without clipping geometry faces
            // far: 100 — allows wide scene pull-backs and composite multi-device shots
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="portfolio3d-canvas-element"
        >
          <CameraController />
          <SceneManager />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
