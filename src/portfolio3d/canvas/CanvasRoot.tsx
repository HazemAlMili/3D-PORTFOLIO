import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { SceneManager } from "../scenes";
import { CameraController } from "../camera";
import { usePortfolioStore } from "../store/portfolioStore";
import { usePointerListener } from "../interaction/usePointerInfluence";
import { isMobileDevice } from "../utils/mobileUtils";
import "./CanvasRoot.css";

// Cap DPR lower on mobile to prevent overheating on 3× OLED displays
const MAX_DPR = isMobileDevice() ? 1.5 : 2.0;

export function CanvasRoot() {
  const dpr = usePortfolioStore((state) => state.dpr);
  usePointerListener();

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
          dpr={[1, Math.max(1, Math.min(MAX_DPR, dpr))]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="portfolio3d-canvas-element"
        >
          <CameraController />
          <Suspense fallback={null}>
            <SceneManager />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
