/**
 * scene04Config.ts
 * Pacing constants, dimensions, anchors, color tokens, and 3-screen ring solver for Scene 04.
 */

export const SCENE_04_SUB_PHASES = {
  approach: [0, 0.40] as [number, number],   // 0%  → 40%  — laptop visible, approaches
  enter:    [0.40, 0.55] as [number, number], // 40% → 55%  — camera zooms close to screen
  immerse:  [0.55, 0.88] as [number, number], // 55% → 88%  — hold: project entries progress
  exit:     [0.88, 1.00] as [number, number], // 88% → 100% — camera pulls back/down to exit
} as const;

export const SCENE_04_COLORS = {
  galleryBg:       "#070D18", // deep blue-black gallery void (P10)
  bezel:           "#0F172A", // metallic structural shell (P10)
  screenBg:        "#091424", // readable preview surface (P10)
  screenEmissive:  "#071526", // LCD backlight glow (P10)
  accentCyan:      "#38D6FF", // primary structural cyan identity (P10)
  accentBlue:      "#1A8CFF", // mid-depth structural accent (P10)
  accentGold:      "#D8A84F", // verified proof & outcome gold accent (P10)
  textPrimary:     "#F4F7FA", // primary headings
  textSecondary:   "#A0AEC0", // body text
  keyboardGlow:    "#1E2D4A", // subtle backlit keyboard glow
} as const;

export const SCENE_04_SCREEN_GEOMETRY = {
  // Heavy Outer Metallic Chassis dimensions (m) — enlarged 18% (2.24m x 1.31m x 0.07m)
  chassisWidth: 2.24,
  chassisHeight: 1.31,
  chassisDepth: 0.07,

  // Visible display surface dimensions (m) — True 16:9 aspect ratio (2.08m x 1.17m)
  displayWidth: 2.08,
  displayHeight: 1.17,

  // Outward Horizontal Curvature Parameters (Convex toward camera)
  curveDepth: 0.068, // Center-to-edge forward curvature depth (3.27% of display width; edges move +0.068m toward camera)
  maxForwardOffsetDesktop: 0.068,
  maxForwardOffsetMobile: 0.048,
  curveSegmentsDesktop: 16,
  curveSegmentsMobile: 12,

  // Symmetric Frame Borders (m)
  borderLeft: 0.08,
  borderRight: 0.08,
  borderTop: 0.07,
  borderBottom: 0.07,

  // Local Z offsets (m) relative to screen root [0, 0, 0]
  chassisZ: 0.0,
  wireframeZ: 0.0,
  displayZ: 0.0355,     // Front display slot (+35.5mm)

  // Inner Safe Region bounds (m) — True 16:9 aspect ratio (1.91m x 1.074m)
  safeRegionWidth: 1.91,
  safeRegionHeight: 1.074,
  safeRegionZ: 0.0360,  // Safe region slot (+36.0mm)

  // Authoritative Content Anchor Group (m)
  htmlAnchorPosition: [0, 0, 0.0365] as [number, number, number],
  htmlAnchorDistanceFactor: 0.98,

  // HTML CSS Container dimensions (px) — Enlarge by 18.2% (1040px x 585px)
  htmlWidthPx: 1040,
  htmlHeightPx: 585,
} as const;

export const SCENE_04_DIMENSIONS = {
  screenBezelWidth: SCENE_04_SCREEN_GEOMETRY.chassisWidth,
  screenBezelHeight: SCENE_04_SCREEN_GEOMETRY.chassisHeight,
  screenBezelDepth: SCENE_04_SCREEN_GEOMETRY.chassisDepth,
  screenSurfaceWidth: SCENE_04_SCREEN_GEOMETRY.displayWidth,
  screenSurfaceHeight: SCENE_04_SCREEN_GEOMETRY.displayHeight,
  contentSafeWidth: SCENE_04_SCREEN_GEOMETRY.safeRegionWidth,
  contentSafeHeight: SCENE_04_SCREEN_GEOMETRY.safeRegionHeight,
  keyboardWidth: 4.0,
  keyboardDepth: 2.4,
  keyboardHeight: 0.15,
} as const;

export const SCENE_04_ANCHORS = {
  architectureSourceDesktop: [4.2, -1.8, -3.8] as [number, number, number],
  architectureSourceMobile: [0.0, -3.2, -3.2] as [number, number, number],
  architectureSource: [4.2, -1.8, -3.8] as [number, number, number],
  laptopScreenTarget: [0, 0.4, 0.10] as [number, number, number],
} as const;

export function getScene04ArchitectureSource(isMobile: boolean): [number, number, number] {
  return isMobile
    ? SCENE_04_ANCHORS.architectureSourceMobile
    : SCENE_04_ANCHORS.architectureSourceDesktop;
}

// -----------------------------------------------------------------------------
// S04-RF01 / RF02 3-Screen Connected Ring Configuration & Resolver
// -----------------------------------------------------------------------------

export const SCENE_04_RING_CONFIG = {
  radiusDesktop: 2.70,
  radiusTablet: 2.20,
  radiusMobile: 1.80, // Guaranteed >= 0.15m physical clearance between outward-curved screen edges
  activePosDesktop: [0.95, 0.08, 0.00] as [number, number, number],
  activePosTablet: [0.95, 0.08, 0.00] as [number, number, number],
  activePosMobile: [0.00, 0.00, 0.00] as [number, number, number],
  screenAnglesDeg: [0, 90, 180, 270] as number[],
} as const;

export type ProjectScreenLifecycleState =
  | "dormant"
  | "approaching"
  | "active"
  | "inspecting"
  | "proof"
  | "hero"
  | "extracting"
  | "previous"
  | "next"
  | "background"
  | "hidden";

export interface ResolvedScreenState {
  screenId: string;
  projectId: string;
  baseAngleDeg: number;
  currentAngleRad: number;
  worldPosition: [number, number, number];
  worldRotation: [number, number, number];
  scale: number;
  opacity: number;
  state: ProjectScreenLifecycleState;
  detailLevel: "full" | "low" | "silhouette" | "none";
  pointerWeight: number;
  isMounted: boolean;
}

export interface ResolvedRingState {
  activeProjectIndex: number;
  ringRotationRad: number;
  ringCenter: [number, number, number];
  ringRadius: number;
  currentSegment: string;
  screens: ResolvedScreenState[];
}

function smootherstep(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export type Scene04Chapter =
  | "HUB_OVERVIEW"
  | "P1_APPROACH"
  | "P1_ARRIVAL"
  | "P1_TITLE"
  | "P1_PREVIEW"
  | "P1_CHALLENGE"
  | "P1_CONTRIBUTION"
  | "P1_OUTCOME"
  | "P1_READ_HOLD"
  | "P1_DEPARTURE"
  | "TRAVEL_1_TO_2"
  | "P2_ARRIVAL"
  | "P2_TITLE"
  | "P2_PREVIEW"
  | "P2_CHALLENGE"
  | "P2_CONTRIBUTION"
  | "P2_OUTCOME"
  | "P2_READ_HOLD"
  | "P2_DEPARTURE"
  | "TRAVEL_2_TO_3"
  | "P3_ARRIVAL"
  | "P3_TITLE"
  | "P3_PREVIEW"
  | "P3_CHALLENGE"
  | "P3_CONTRIBUTION"
  | "P3_OUTCOME"
  | "P3_READ_HOLD"
  | "P3_DEPARTURE"
  | "TRAVEL_3_TO_4"
  | "P4_ARRIVAL"
  | "P4_TITLE"
  | "P4_PREVIEW"
  | "P4_CHALLENGE"
  | "P4_CONTRIBUTION"
  | "P4_OUTCOME"
  | "P4_READ_HOLD"
  | "P4_DEPARTURE"
  | "UX_EXTRACTION";

export type Scene04JourneyStateName = Scene04Chapter;

export interface Scene04JourneyState {
  state: Scene04JourneyStateName;
  activeProjectIndex: number | null;
  fromProjectIndex: number | null;
  toProjectIndex: number | null;

  chapterStartPx: number;
  chapterEndPx: number;
  chapterProgress: number;
  easedChapterProgress: number;

  cameraAuthority: string;
  contentAuthority: string | null;
  ringAuthority: string;

  cameraReadiness: "READY" | "NOT_READY";
  fullDetailRootCount: number;
}

export interface ResolvedChapterState {
  chapter: Scene04Chapter;
  chapterProgress: number;
  activeProjectIndex: number;
  isTravelChapter: boolean;
  isContentChapter: boolean;
  ringRotationDeg: number;
  cameraReadiness: "READY" | "NOT_READY";
  contentAuthority: string | null;
  fullDetailRootCount: number;
  outgoingContentOpacity: number;
}

export function resolveScene04Chapter(localProgress: number): ResolvedChapterState {
  const p = Math.min(1, Math.max(0, localProgress));

  // [0.00, 0.03]: HUB_OVERVIEW
  if (p < 0.03) {
    return {
      chapter: "HUB_OVERVIEW",
      chapterProgress: p / 0.03,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: 0,
      cameraReadiness: "NOT_READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }

  // [0.03, 0.07]: P1_APPROACH
  if (p < 0.07) {
    return {
      chapter: "P1_APPROACH",
      chapterProgress: (p - 0.03) / 0.04,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: 0,
      cameraReadiness: "NOT_READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }

  // [0.07, 0.09]: P1_ARRIVAL
  if (p < 0.09) {
    return {
      chapter: "P1_ARRIVAL",
      chapterProgress: (p - 0.07) / 0.02,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }

  // P1 Content & Read Hold: [0.09, 0.25]
  if (p < 0.11) {
    return {
      chapter: "P1_TITLE",
      chapterProgress: (p - 0.09) / 0.02,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: "project-1",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.135) {
    return {
      chapter: "P1_PREVIEW",
      chapterProgress: (p - 0.11) / 0.025,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: "project-1",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.155) {
    return {
      chapter: "P1_CHALLENGE",
      chapterProgress: (p - 0.135) / 0.02,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: "project-1",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.175) {
    return {
      chapter: "P1_CONTRIBUTION",
      chapterProgress: (p - 0.155) / 0.02,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: "project-1",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.195) {
    return {
      chapter: "P1_OUTCOME",
      chapterProgress: (p - 0.175) / 0.02,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: "project-1",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.25) {
    return {
      chapter: "P1_READ_HOLD",
      chapterProgress: (p - 0.195) / 0.055,
      activeProjectIndex: 0,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: 0,
      cameraReadiness: "READY",
      contentAuthority: "project-1",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }

  // [0.25, 0.31]: P1_DEPARTURE & TRAVEL_1_TO_2 (ringRotationDeg lerps 0 -> -90)
  if (p < 0.31) {
    const tTravel = (p - 0.25) / 0.06;
    const tRotation = p < 0.27 ? 0 : smootherstep((p - 0.27) / 0.04);
    const chapterName: Scene04Chapter = p < 0.27 ? "P1_DEPARTURE" : "TRAVEL_1_TO_2";
    const chapterProg = p < 0.27 ? (p - 0.25) / 0.02 : (p - 0.27) / 0.04;

    if (tTravel < 0.65) {
      const fadeProgress = Math.max(0, (tTravel - 0.15) / 0.50);
      const outgoingOpacity = 1.0 - smootherstep(fadeProgress);
      return {
        chapter: chapterName,
        chapterProgress: chapterProg,
        activeProjectIndex: tRotation >= 0.5 ? 1 : 0,
        isTravelChapter: p >= 0.27,
        isContentChapter: false,
        ringRotationDeg: -90 * tRotation,
        cameraReadiness: "NOT_READY",
        contentAuthority: "project-1",
        fullDetailRootCount: 1,
        outgoingContentOpacity: outgoingOpacity,
      };
    }

    return {
      chapter: chapterName,
      chapterProgress: chapterProg,
      activeProjectIndex: tRotation >= 0.5 ? 1 : 0,
      isTravelChapter: p >= 0.27,
      isContentChapter: false,
      ringRotationDeg: -90 * tRotation,
      cameraReadiness: "NOT_READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }

  // P2 Breakdown: [0.31, 0.49]
  if (p < 0.33) {
    return {
      chapter: "P2_ARRIVAL",
      chapterProgress: (p - 0.31) / 0.02,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }
  if (p < 0.35) {
    return {
      chapter: "P2_TITLE",
      chapterProgress: (p - 0.33) / 0.02,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: "project-2",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.375) {
    return {
      chapter: "P2_PREVIEW",
      chapterProgress: (p - 0.35) / 0.025,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: "project-2",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.395) {
    return {
      chapter: "P2_CHALLENGE",
      chapterProgress: (p - 0.375) / 0.02,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: "project-2",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.415) {
    return {
      chapter: "P2_CONTRIBUTION",
      chapterProgress: (p - 0.395) / 0.02,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: "project-2",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.435) {
    return {
      chapter: "P2_OUTCOME",
      chapterProgress: (p - 0.415) / 0.02,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: "project-2",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.49) {
    return {
      chapter: "P2_READ_HOLD",
      chapterProgress: (p - 0.435) / 0.055,
      activeProjectIndex: 1,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -90,
      cameraReadiness: "READY",
      contentAuthority: "project-2",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }

  // [0.49, 0.55]: P2_DEPARTURE & TRAVEL_2_TO_3 (ringRotationDeg lerps -90 -> -180)
  if (p < 0.55) {
    const tTravel = (p - 0.49) / 0.06;
    const tRotation = p < 0.51 ? 0 : smootherstep((p - 0.51) / 0.04);
    const chapterName: Scene04Chapter = p < 0.51 ? "P2_DEPARTURE" : "TRAVEL_2_TO_3";
    const chapterProg = p < 0.51 ? (p - 0.49) / 0.02 : (p - 0.51) / 0.04;

    if (tTravel < 0.65) {
      const fadeProgress = Math.max(0, (tTravel - 0.15) / 0.50);
      const outgoingOpacity = 1.0 - smootherstep(fadeProgress);
      return {
        chapter: chapterName,
        chapterProgress: chapterProg,
        activeProjectIndex: tRotation >= 0.5 ? 2 : 1,
        isTravelChapter: p >= 0.51,
        isContentChapter: false,
        ringRotationDeg: -90 - 90 * tRotation,
        cameraReadiness: "NOT_READY",
        contentAuthority: "project-2",
        fullDetailRootCount: 1,
        outgoingContentOpacity: outgoingOpacity,
      };
    }

    return {
      chapter: chapterName,
      chapterProgress: chapterProg,
      activeProjectIndex: tRotation >= 0.5 ? 2 : 1,
      isTravelChapter: p >= 0.51,
      isContentChapter: false,
      ringRotationDeg: -90 - 90 * tRotation,
      cameraReadiness: "NOT_READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }

  // P3 Breakdown: [0.55, 0.73]
  if (p < 0.57) {
    return {
      chapter: "P3_ARRIVAL",
      chapterProgress: (p - 0.55) / 0.02,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }
  if (p < 0.59) {
    return {
      chapter: "P3_TITLE",
      chapterProgress: (p - 0.57) / 0.02,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: "project-3",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.615) {
    return {
      chapter: "P3_PREVIEW",
      chapterProgress: (p - 0.59) / 0.025,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: "project-3",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.635) {
    return {
      chapter: "P3_CHALLENGE",
      chapterProgress: (p - 0.615) / 0.02,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: "project-3",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.655) {
    return {
      chapter: "P3_CONTRIBUTION",
      chapterProgress: (p - 0.635) / 0.02,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: "project-3",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.675) {
    return {
      chapter: "P3_OUTCOME",
      chapterProgress: (p - 0.655) / 0.02,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: "project-3",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.73) {
    return {
      chapter: "P3_READ_HOLD",
      chapterProgress: (p - 0.675) / 0.055,
      activeProjectIndex: 2,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -180,
      cameraReadiness: "READY",
      contentAuthority: "project-3",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }

  // [0.73, 0.79]: P3_DEPARTURE & TRAVEL_3_TO_4 (ringRotationDeg lerps -180 -> -270)
  if (p < 0.79) {
    const tTravel = (p - 0.73) / 0.06;
    const tRotation = p < 0.75 ? 0 : smootherstep((p - 0.75) / 0.04);
    const chapterName: Scene04Chapter = p < 0.75 ? "P3_DEPARTURE" : "TRAVEL_3_TO_4";
    const chapterProg = p < 0.75 ? (p - 0.73) / 0.02 : (p - 0.75) / 0.04;

    if (tTravel < 0.65) {
      const fadeProgress = Math.max(0, (tTravel - 0.15) / 0.50);
      const outgoingOpacity = 1.0 - smootherstep(fadeProgress);
      return {
        chapter: chapterName,
        chapterProgress: chapterProg,
        activeProjectIndex: tRotation >= 0.5 ? 3 : 2,
        isTravelChapter: p >= 0.75,
        isContentChapter: false,
        ringRotationDeg: -180 - 90 * tRotation,
        cameraReadiness: "NOT_READY",
        contentAuthority: "project-3",
        fullDetailRootCount: 1,
        outgoingContentOpacity: outgoingOpacity,
      };
    }

    return {
      chapter: chapterName,
      chapterProgress: chapterProg,
      activeProjectIndex: tRotation >= 0.5 ? 3 : 2,
      isTravelChapter: p >= 0.75,
      isContentChapter: false,
      ringRotationDeg: -180 - 90 * tRotation,
      cameraReadiness: "NOT_READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }

  // P4 Breakdown: [0.79, 1.00]
  if (p < 0.81) {
    return {
      chapter: "P4_ARRIVAL",
      chapterProgress: (p - 0.79) / 0.02,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: null,
      fullDetailRootCount: 0,
      outgoingContentOpacity: 0.0,
    };
  }
  if (p < 0.83) {
    return {
      chapter: "P4_TITLE",
      chapterProgress: (p - 0.81) / 0.02,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.855) {
    return {
      chapter: "P4_PREVIEW",
      chapterProgress: (p - 0.83) / 0.025,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.875) {
    return {
      chapter: "P4_CHALLENGE",
      chapterProgress: (p - 0.855) / 0.02,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.895) {
    return {
      chapter: "P4_CONTRIBUTION",
      chapterProgress: (p - 0.875) / 0.02,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.915) {
    return {
      chapter: "P4_OUTCOME",
      chapterProgress: (p - 0.895) / 0.02,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }
  if (p < 0.96) {
    return {
      chapter: "P4_READ_HOLD",
      chapterProgress: (p - 0.915) / 0.045,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: true,
      ringRotationDeg: -270,
      cameraReadiness: "READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: 1.0,
    };
  }

  // [0.96, 1.00]: P4_DEPARTURE & UX_EXTRACTION
  const tTravel = (p - 0.96) / 0.04;
  const chapterName: Scene04Chapter = p < 0.98 ? "P4_DEPARTURE" : "UX_EXTRACTION";
  const chapterProg = p < 0.98 ? (p - 0.96) / 0.02 : (p - 0.98) / 0.02;

  if (tTravel < 0.65) {
    const fadeProgress = Math.max(0, (tTravel - 0.15) / 0.50);
    const outgoingOpacity = 1.0 - smootherstep(fadeProgress);
    return {
      chapter: chapterName,
      chapterProgress: chapterProg,
      activeProjectIndex: 3,
      isTravelChapter: false,
      isContentChapter: false,
      ringRotationDeg: -270,
      cameraReadiness: "NOT_READY",
      contentAuthority: "project-4",
      fullDetailRootCount: 1,
      outgoingContentOpacity: outgoingOpacity,
    };
  }

  return {
    chapter: chapterName,
    chapterProgress: chapterProg,
    activeProjectIndex: 3,
    isTravelChapter: false,
    isContentChapter: false,
    ringRotationDeg: -270,
    cameraReadiness: "NOT_READY",
    contentAuthority: null,
    fullDetailRootCount: 0,
    outgoingContentOpacity: 0.0,
  };
}

export function resolveScene04Ring(
  localProgress: number,
  isMobile: boolean,
  isTablet: boolean
): ResolvedRingState {
  const p = Math.min(1, Math.max(0, localProgress));

  // Determine viewport-specific radius & active position
  const ringRadius = isMobile
    ? SCENE_04_RING_CONFIG.radiusMobile
    : isTablet
    ? SCENE_04_RING_CONFIG.radiusTablet
    : SCENE_04_RING_CONFIG.radiusDesktop;

  const activeFrontPos = isMobile
    ? SCENE_04_RING_CONFIG.activePosMobile
    : isTablet
    ? SCENE_04_RING_CONFIG.activePosTablet
    : SCENE_04_RING_CONFIG.activePosDesktop;

  const ringCenter: [number, number, number] = [
    activeFrontPos[0],
    activeFrontPos[1],
    activeFrontPos[2] - ringRadius,
  ];

  // Derive chapter state via canonical resolver
  const chapterState = resolveScene04Chapter(p);
  const ringRotationDeg = chapterState.ringRotationDeg;
  const activeProjectIndex = chapterState.activeProjectIndex;
  const currentSegment = chapterState.chapter;

  const ringRotationRad = (ringRotationDeg * Math.PI) / 180;
  const projectIds = ["project-1", "project-2", "project-3", "project-4"];

  const screens: ResolvedScreenState[] = projectIds.map((projectId, idx) => {
    const screenId = `screen-${idx + 1}`;
    const baseAngleDeg = SCENE_04_RING_CONFIG.screenAnglesDeg[idx];
    const baseAngleRad = (baseAngleDeg * Math.PI) / 180;
    const currentAngleRad = baseAngleRad + ringRotationRad;

    // Mathematical resolver for 3D world position
    const x = ringCenter[0] + ringRadius * Math.sin(currentAngleRad);
    const y = ringCenter[1];
    const z = ringCenter[2] + ringRadius * Math.cos(currentAngleRad);

    // Tangent orientation facing active focus
    const rotationY = -currentAngleRad;
    const isActiveScreen = idx === activeProjectIndex;

    // Lifecycle state derivation
    let state: ProjectScreenLifecycleState = "dormant";
    let detailLevel: "full" | "low" | "silhouette" | "none" = "none";
    let pointerWeight = 0;
    let opacity = 1.0;
    const isMounted = true;

    if (isActiveScreen) {
      detailLevel = "full";
      if (!isMobile) {
        if (p >= 0.28 && p < 0.43) pointerWeight = 0.5;
        else if (p >= 0.43 && p < 0.61) pointerWeight = 0.8;
        else if (p >= 0.61 && p < 0.76) pointerWeight = 0.5;
        else if (p >= 0.76 && p < 0.94) pointerWeight = 0.3;
        else pointerWeight = 0.0;
      }

      if (p >= 0.94) state = "extracting";
      else if (p >= 0.76) state = "hero";
      else if (p >= 0.61) state = "proof";
      else if (p >= 0.43) state = "inspecting";
      else if (p >= 0.28) state = "active";
      else if (p >= 0.10) state = "approaching";
      else state = "dormant";
      opacity = 1.0;
    } else {
      // Adjacent or background screens
      detailLevel = "low";
      pointerWeight = 0.0;
      opacity = isMobile ? 0.35 : 0.50;

      // Determine if previous or next relative to active
      const diff = (idx - activeProjectIndex + 4) % 4;
      if (diff === 1) state = "next";
      else if (diff === 3) state = "previous";
      else state = "background";
    }

    return {
      screenId,
      projectId,
      baseAngleDeg,
      currentAngleRad,
      worldPosition: [x, y, z],
      worldRotation: [0, rotationY, 0],
      scale: 1.0,
      opacity,
      state,
      detailLevel,
      pointerWeight,
      isMounted,
    };
  });

  return {
    activeProjectIndex,
    ringRotationRad,
    ringCenter,
    ringRadius,
    currentSegment,
    screens,
  };
}

export function resolveUXTransferWorldAnchor(isMobile: boolean): [number, number, number] {
  const activePos = isMobile
    ? SCENE_04_RING_CONFIG.activePosMobile
    : SCENE_04_RING_CONFIG.activePosDesktop;
  const offset = isMobile ? [-0.20, 0.10, 0.05] : [1.35, 0.20, 0.05];
  return [
    activePos[0] + offset[0],
    activePos[1] + offset[1],
    activePos[2] + offset[2],
  ];
}
