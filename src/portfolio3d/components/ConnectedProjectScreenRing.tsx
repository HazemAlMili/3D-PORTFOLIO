import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import { usePortfolioStore } from "../store/portfolioStore";
import { isMobileDevice } from "../utils/mobileUtils";
import { usePointerInfluence } from "../interaction/usePointerInfluence";
import { ProjectCapsule } from "./capsule/ProjectCapsule";
import {
  resolveScene04Ring,
  resolveScene04Chapter,
  SCENE_04_COLORS,
} from "../constants/scene04Config";

interface ConnectedProjectScreenRingProps {
  localProgress: number;
  opacity?: number;
}

export function ConnectedProjectScreenRing({
  localProgress,
  opacity = 1.0,
}: ConnectedProjectScreenRingProps) {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const pointer = usePointerInfluence();
  const isMobile = isMobileDevice();

  // Pure scroll resolver deriving 3-screen ring geometry and lifecycle
  const ringState = useMemo(
    () => resolveScene04Ring(localProgress, isMobile, false),
    [localProgress, isMobile]
  );

  const activeScreen = ringState.screens[ringState.activeProjectIndex];
  const pointerWeight = activeScreen ? activeScreen.pointerWeight : 0;

  // Active screen pointer parallax (Yaw ±1.2°, Pitch ±0.8°, Translation ±0.025m)
  const pointerPitch = -pointer.smoothY * 0.014 * pointerWeight;
  const pointerYaw = pointer.smoothX * 0.021 * pointerWeight;
  const pointerOffsetX = pointer.smoothX * 0.025 * pointerWeight;
  const pointerOffsetY = -pointer.smoothY * 0.015 * pointerWeight;

  // Curved energy conduit rail connecting screen bases at Y = -0.45
  const conduitCurve = useMemo(() => {
    const points = ringState.screens.map(
      (s) => new Vector3(s.worldPosition[0], s.worldPosition[1] - 0.45, s.worldPosition[2])
    );
    // Loop back to first screen to form closed ring conduit
    points.push(points[0].clone());
    return new CatmullRomCurve3(points);
  }, [ringState.screens]);

  // UX Extraction fragment position calculation for screen-3
  const p = localProgress;
  const uxExtractionPos: [number, number, number] = useMemo(() => {
    if (reducedMotion) return isMobile ? [-0.20, 0.10, 0.05] : [1.35, 0.20, 0.05];
    const sourcePos: [number, number, number] = isMobile ? [-0.20, -0.025, 0.07] : [0.40, -0.15, 0.091];
    const detachedPos: [number, number, number] = isMobile ? [-0.20, 0.038, 0.11] : [0.80, -0.02, 0.18];
    const transferPos: [number, number, number] = isMobile ? [-0.20, 0.10, 0.05] : [1.35, 0.20, 0.05];

    if (p <= 0.88) return sourcePos;
    if (p >= 0.96) return transferPos;

    if (p <= 0.92) {
      const t = (p - 0.88) / 0.04;
      return [
        sourcePos[0] + t * (detachedPos[0] - sourcePos[0]),
        sourcePos[1] + t * (detachedPos[1] - sourcePos[1]),
        sourcePos[2] + t * (detachedPos[2] - sourcePos[2]),
      ];
    } else {
      const t = (p - 0.92) / 0.04;
      return [
        detachedPos[0] + t * (transferPos[0] - detachedPos[0]),
        detachedPos[1] + t * (transferPos[1] - detachedPos[1]),
        detachedPos[2] + t * (transferPos[2] - detachedPos[2]),
      ];
    }
  }, [p, isMobile, reducedMotion]);

  const uxExtractionOpacity = opacity * (reducedMotion ? 0.0 : p < 0.92 ? 0.0 : Math.max(0, Math.min(1, (p - 0.92) / 0.08)));

  const chapterState = useMemo(
    () => resolveScene04Chapter(localProgress),
    [localProgress]
  );

  // Debug Bridge Instrumentation for S04-FLOWFIX-01 Live Telemetry
  if (typeof window !== "undefined" && (import.meta.env.DEV || window.location.search.includes("s04debug=true"))) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__s04debug = {
      localProgress: p,
      currentSegment: ringState.currentSegment,
      journeyState: chapterState.chapter,
      activeProjectIndex: ringState.activeProjectIndex,
      activeScreenId: activeScreen?.screenId,
      ringRotationRad: ringState.ringRotationRad,
      ringCenter: ringState.ringCenter,
      ringRadius: ringState.ringRadius,
      viewportBranch: isMobile ? "mobile" : "desktop",
      cameraReadiness: chapterState.cameraReadiness,
      contentAuthority: chapterState.contentAuthority,
      fullDetailRootCount: chapterState.fullDetailRootCount,
      screens: ringState.screens.map((s) => ({
        screenId: s.screenId,
        projectId: s.projectId,
        state: s.state,
        mounted: s.isMounted,
        worldPosition: s.worldPosition,
        worldRotation: s.worldRotation,
        distanceFromRingCenter: Math.hypot(
          s.worldPosition[0] - ringState.ringCenter[0],
          s.worldPosition[1] - ringState.ringCenter[1],
          s.worldPosition[2] - ringState.ringCenter[2]
        ),
        detailLevel: s.detailLevel,
        pointerWeight: s.pointerWeight,
      })),
      hudMountedStatus: false,
      extractionOwner: "screen-3",
      extractionWorldPos: uxExtractionPos,
      transferAnchor: isMobile ? [-0.20, 0.10, 0.05] : [1.35, 0.20, 0.05],
    };
  }

  return (
    <group name="connected_project_screen_ring">
      {/* 1. Curved Base Energy Conduit Rail */}
      {opacity > 0.01 && (
        <mesh renderOrder={10}>
          <tubeGeometry args={[conduitCurve, 48, 0.015, 8, true]} />
          <meshBasicMaterial
            color={SCENE_04_COLORS.accentCyan}
            transparent
            opacity={opacity * 0.45}
            wireframe
          />
        </mesh>
      )}

      {/* 2. Physical Project Screens (Generated from verified project data mapping) */}
      {ringState.screens.map((screen, idx) => {
        if (!screen.isMounted) return null;

        const isActive = idx === ringState.activeProjectIndex;
        const screenPos: [number, number, number] = isActive
          ? [
              screen.worldPosition[0] + pointerOffsetX,
              screen.worldPosition[1] + pointerOffsetY,
              screen.worldPosition[2],
            ]
          : screen.worldPosition;

        const screenRot: [number, number, number] = isActive
          ? [
              screen.worldRotation[0] + pointerPitch,
              screen.worldRotation[1] + pointerYaw,
              screen.worldRotation[2],
            ]
          : screen.worldRotation;

        const variant = isActive
          ? "active"
          : screen.state === "background"
          ? "distant"
          : "secondary";

        return (
          <ProjectCapsule
            key={screen.screenId}
            variant={variant}
            state={screen.state}
            projectId={screen.projectId}
            localProgress={localProgress}
            position={screenPos}
            rotation={screenRot}
            scale={screen.scale}
            opacity={screen.opacity * opacity}
            uxExtractionOpacity={idx === 3 ? uxExtractionOpacity : 0.0}
            uxExtractionPos={idx === 3 ? uxExtractionPos : [0.40, 0.10, 0.05]}
            name={`project_screen_${screen.screenId}`}
          />
        );
      })}
    </group>
  );
}

export default ConnectedProjectScreenRing;
