import { useMemo } from "react";
import { BoxGeometry, EdgesGeometry, PlaneGeometry } from "three";
import { Html } from "@react-three/drei";
import { PROJECT_DATA, ProjectEntry } from "../../content/projectData";
import {
  SCENE_04_COLORS,
  SCENE_04_SCREEN_GEOMETRY,
  ProjectScreenLifecycleState,
  resolveScene04Chapter,
} from "../../constants/scene04Config";
import { isMobileDevice } from "../../utils/mobileUtils";

export type ProjectCapsuleVariant = "active" | "secondary" | "distant";

export interface ProjectCapsuleProps {
  variant: ProjectCapsuleVariant;
  state?: ProjectScreenLifecycleState;
  projectId?: string;
  localProgress?: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  opacity?: number;
  uxExtractionOpacity?: number;
  uxExtractionPos?: [number, number, number];
  name?: string;
}

/** Reusable helper to generate an outward horizontally curved display surface plane (convex toward camera) */
function createCurvedPlaneGeometry(
  width: number,
  height: number,
  segments: number,
  curveDepth: number
): PlaneGeometry {
  const geom = new PlaneGeometry(width, height, segments, 1);
  const posAttr = geom.attributes.position;
  const halfWidth = width / 2;

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const normalizedX = Math.abs(x / halfWidth);
    const forwardOffset = curveDepth * (normalizedX ** 2);
    posAttr.setZ(i, posAttr.getZ(i) + forwardOffset);
  }

  geom.computeVertexNormals();
  return geom;
}

/** Reusable helper to generate an outer metallic chassis frame matching front/rear outward curvature */
function createCurvedChassisGeometry(
  width: number,
  height: number,
  depth: number,
  segments: number,
  curveDepth: number
): BoxGeometry {
  const geom = new BoxGeometry(width, height, depth, segments, 1, 1);
  const posAttr = geom.attributes.position;
  const halfWidth = width / 2;

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const normalizedX = Math.abs(x / halfWidth);
    const forwardOffset = curveDepth * (normalizedX ** 2);
    posAttr.setZ(i, posAttr.getZ(i) + forwardOffset);
  }

  geom.computeVertexNormals();
  return geom;
}

function ProjectPreviewVisualizer({ projectId, image, title }: { projectId: string; image?: string; title?: string }) {
  const proofBadgeMap: Record<string, string> = {
    "project-1": "AI PLATFORM INTERFACE PROOF",
    "project-2": "REAL ESTATE MARKETPLACE PROOF",
    "project-3": "ENTERPRISE PORTAL PROOF",
  };

  const badgeText = proofBadgeMap[projectId] || "VERIFIED PLATFORM PROOF";

  if (image) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#070E1A",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          alt={title || projectId}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: "8px",
            display: "block",
            filter: "brightness(0.92) contrast(1.05)",
          }}
        />
        {/* Futuristic Dark Vignette Frame Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(7,14,26,0.65) 0%, rgba(7,14,26,0.10) 40%, rgba(7,14,26,0.65) 100%)",
            pointerEvents: "none",
            borderRadius: "8px",
          }}
        />
        {/* Theme Micro Proof Badge */}
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "8px",
            background: "rgba(7,14,26,0.85)",
            border: "1px solid rgba(56,214,255,0.35)",
            borderRadius: "4px",
            padding: "2px 8px",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "11.5px", color: "#38D6FF", letterSpacing: "1px", fontWeight: 700 }}>
            {badgeText}
          </span>
        </div>
      </div>
    );
  }

  // Themed Architecture Micro-Panel Fallback for No-Image mode
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#070E1A",
        borderRadius: "8px",
        border: "1.5px solid rgba(56,214,255,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <span style={{ fontSize: "13px", color: "#38D6FF", letterSpacing: "1px", fontWeight: 700 }}>
        {badgeText}
      </span>
      <span style={{ fontSize: "13px", color: "#94A3B8", letterSpacing: "0.5px" }}>
        SYSTEM ARCHITECTURE PROOF
      </span>
    </div>
  );
}

export function ProjectCapsule({
  variant,
  state = "active",
  projectId = "project-1",
  localProgress,
  position,
  rotation = [0, 0, 0],
  scale = 1.0,
  opacity = 1.0,
  uxExtractionOpacity = 0.0,
  uxExtractionPos = [0.40, 0.10, 0.05],
  name,
}: ProjectCapsuleProps) {
  void uxExtractionPos;
  const G = SCENE_04_SCREEN_GEOMETRY;
  const isMobile = isMobileDevice();

  const curveSegments = isMobile ? G.curveSegmentsMobile : G.curveSegmentsDesktop;

  // Shared horizontally curved geometries (reused with 0 per-frame allocations)
  const chassisBoxGeom = useMemo(
    () => createCurvedChassisGeometry(G.chassisWidth, G.chassisHeight, G.chassisDepth, curveSegments, G.curveDepth),
    [G.chassisWidth, G.chassisHeight, G.chassisDepth, curveSegments, G.curveDepth]
  );
  const chassisEdgesGeom = useMemo(
    () => new EdgesGeometry(chassisBoxGeom),
    [chassisBoxGeom]
  );
  const displayPlaneGeom = useMemo(
    () => createCurvedPlaneGeometry(G.displayWidth, G.displayHeight, curveSegments, G.curveDepth),
    [G.displayWidth, G.displayHeight, curveSegments, G.curveDepth]
  );

  if (opacity <= 0.005 || state === "hidden") return null;

  const project: ProjectEntry =
    PROJECT_DATA.find((p) => p.id === projectId) || PROJECT_DATA[0];

  // Derive canonical chapter state if localProgress is supplied
  const chapterInfo = localProgress !== undefined ? resolveScene04Chapter(localProgress) : null;
  const currentChapter = chapterInfo?.chapter;

  let t1 = 1.0;
  let t2 = 1.0;
  let t3 = 1.0;
  let t4 = 1.0;
  let t5 = 1.0;

  if (variant === "active" && chapterInfo && currentChapter) {
    const match = projectId.match(/project-(\d+)/);
    const projNum = match ? match[1] : "1";
    const prefix = `P${projNum}_`;

    const titleCh = `${prefix}TITLE`;
    const prevCh = `${prefix}PREVIEW`;
    const chalCh = `${prefix}CHALLENGE`;
    const contCh = `${prefix}CONTRIBUTION`;
    const outCh = `${prefix}OUTCOME`;

    // Determine sequence phase relative to active project chapters
    if (projNum === "1" && (currentChapter === "HUB_OVERVIEW" || currentChapter === "P1_APPROACH")) {
      t1 = 0; t2 = 0; t3 = 0; t4 = 0; t5 = 0;
    } else {
      const isBeforeTitle = currentChapter.endsWith("_ARRIVAL") || currentChapter === "HUB_OVERVIEW" || currentChapter.startsWith("TRAVEL_");
      const isBeforePreview = isBeforeTitle || currentChapter === titleCh;
      const isBeforeChallenge = isBeforePreview || currentChapter === prevCh;
      const isBeforeContribution = isBeforeChallenge || currentChapter === chalCh;
      const isBeforeOutcome = isBeforeContribution || currentChapter === contCh;

      t1 = isBeforeTitle ? 0 : currentChapter === titleCh ? chapterInfo.chapterProgress : 1.0;
      t2 = isBeforePreview ? 0 : currentChapter === prevCh ? chapterInfo.chapterProgress : 1.0;
      t3 = isBeforeChallenge ? 0 : currentChapter === chalCh ? chapterInfo.chapterProgress : 1.0;
      t4 = isBeforeContribution ? 0 : currentChapter === contCh ? chapterInfo.chapterProgress : 1.0;
      t5 = isBeforeOutcome ? 0 : currentChapter === outCh ? chapterInfo.chapterProgress : 1.0;
    }
  }

  // Secondary Variant (Muted Slate / Cyan)
  if (variant === "secondary") {
    const shouldRenderSecondaryHtml = false;

    return (
      <group
        position={position}
        rotation={rotation}
        scale={scale}
        name={name || "secondary_project_screen"}
      >
        <mesh renderOrder={12} position={[0, 0, G.chassisZ]} geometry={chassisBoxGeom}>
          <meshStandardMaterial
            color="#0D1B2A"
            roughness={0.7}
            metalness={0.6}
            transparent
            opacity={opacity * 0.85}
          />
        </mesh>
        <lineSegments renderOrder={13} position={[0, 0, G.wireframeZ]} geometry={chassisEdgesGeom}>
          <lineBasicMaterial
            color={SCENE_04_COLORS.accentCyan}
            transparent
            opacity={opacity * 0.35}
          />
        </lineSegments>
        <mesh position={[0, 0, G.displayZ]} renderOrder={14} geometry={displayPlaneGeom}>
          <meshStandardMaterial
            color="#091424"
            emissive="#071526"
            emissiveIntensity={0.20}
            transparent
            opacity={opacity * 0.90}
          />
        </mesh>
        {shouldRenderSecondaryHtml && (
          <Html
            transform
            center
            distanceFactor={G.htmlAnchorDistanceFactor}
            position={G.htmlAnchorPosition}
            style={{
              width: `${G.htmlWidthPx}px`,
              height: `${G.htmlHeightPx}px`,
              padding: "12px 16px",
              color: "#F4F7FA",
              fontFamily: "Inter, Roboto, sans-serif",
              pointerEvents: "none",
              userSelect: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "6px",
              boxSizing: "border-box",
              opacity: opacity * 0.90,
            }}
          >
            <span
              style={{
                fontSize: "9.5px",
                color: "#38D6FF",
                letterSpacing: "1px",
                fontWeight: 700,
              }}
            >
              PROJECT PROOF :: {project.id.toUpperCase()}
            </span>
            <h3
              style={{
                fontSize: "18px",
                margin: 0,
                fontWeight: 700,
                color: "#F8FAFC",
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "11px",
                margin: 0,
                color: "#94A3B8",
                lineHeight: 1.3,
              }}
            >
              {project.oneLineDescription}
            </p>
          </Html>
        )}
      </group>
    );
  }

  // Distant Variant (Silhouette)
  if (variant === "distant") {
    return (
      <group
        position={position}
        rotation={rotation}
        scale={scale}
        name={name || "distant_project_screen"}
      >
        <mesh renderOrder={11} position={[0, 0, G.chassisZ]} geometry={chassisBoxGeom}>
          <meshStandardMaterial
            color="#080D1A"
            roughness={0.95}
            transparent
            opacity={opacity * 0.50}
          />
        </mesh>
        <lineSegments renderOrder={12} position={[0, 0, G.wireframeZ]} geometry={chassisEdgesGeom}>
          <lineBasicMaterial
            color={SCENE_04_COLORS.accentCyan}
            transparent
            opacity={opacity * 0.15}
          />
        </lineSegments>
      </group>
    );
  }

  // Active Variant — Structural Metallic Chassis + Contained 5-Stage Staged Reveal HTML Surface
  const isContentOwner = chapterInfo === null || chapterInfo.contentAuthority === projectId;
  const outgoingContentOpacity = isContentOwner ? (chapterInfo?.outgoingContentOpacity ?? 1.0) : 0.0;
  const htmlExtractionFade = Math.max(0, 1 - uxExtractionOpacity * 2.0);
  const effectiveHtmlOpacity = opacity * outgoingContentOpacity * htmlExtractionFade;

  const shouldRenderActiveHtml =
    opacity >= 0.05 &&
    state !== "background" &&
    uxExtractionOpacity < 0.90 &&
    (isContentOwner || effectiveHtmlOpacity > 0.01);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      name={name || "active_project_screen"}
      userData={{ projectId, state }}
    >
      {/* 1. Outer Physical Structural Shell (P10 Metallic Dark Chassis) */}
      <mesh renderOrder={15} position={[0, 0, G.chassisZ]} geometry={chassisBoxGeom}>
        <meshStandardMaterial
          color={SCENE_04_COLORS.bezel}
          roughness={0.35}
          metalness={0.80}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* 2. Outer Edge Lines — Clean 12-edge highlights around chassis */}
      <lineSegments renderOrder={16} position={[0, 0, G.wireframeZ]} geometry={chassisEdgesGeom}>
        <lineBasicMaterial
          color={SCENE_04_COLORS.accentCyan}
          transparent
          opacity={opacity * 0.45}
        />
      </lineSegments>

      {/* 3. Front Display Surface Slot (Clean True 16:9 Black Display: 2.08m x 1.17m) */}
      <mesh position={[0, 0, G.displayZ]} renderOrder={17} geometry={displayPlaneGeom}>
        <meshStandardMaterial
          color="#091424"
          emissive="#071526"
          emissiveIntensity={0.40}
          roughness={0.5}
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>

      {/* 4. Contained 5-Stage Staged Reveal HTML Case Study Surface (With Smooth Outgoing Fade) */}
      {shouldRenderActiveHtml && (
        <Html
          transform
          center
          distanceFactor={G.htmlAnchorDistanceFactor}
          position={G.htmlAnchorPosition}
          style={{
            width: `${G.htmlWidthPx}px`,
            height: `${G.htmlHeightPx}px`,
            padding: "40px 80px 40px 80px", // Safe Insets: 7.7% H (80px), 6.8% V (40px)
            color: "#F4F7FA",
            fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "optimizeLegibility",
            pointerEvents: "none",
            userSelect: "none",
            boxSizing: "border-box",
            overflow: "hidden",
            contain: "layout paint",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: effectiveHtmlOpacity,
            transform: `translateY(${(1 - outgoingContentOpacity) * -8}px) scale(${1 - (1 - outgoingContentOpacity) * 0.02})`,
            transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
          }}
        >
          {/* STAGE 1 (t1): Header & Title Row */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              opacity: t1,
              transform: `translateY(${(1 - t1) * 8}px)`,
              transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "15px",
                  color: "#38D6FF",
                  letterSpacing: "1.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {project.role ? project.role.toUpperCase() : `PROJECT PROOF :: ${project.id.toUpperCase()}`}
              </span>
              {/* Desktop & Tablet Top-Right Verified Actions */}
              {!isMobile && variant === "active" && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    opacity: t5,
                    transform: `translateY(${(1 - t5) * 6}px)`,
                    transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
                  }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={0}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        pointerEvents: "auto",
                        fontSize: "13.5px",
                        background: "rgba(56,214,255,0.18)",
                        border: "1.5px solid rgba(56,214,255,0.40)",
                        color: "#38D6FF",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontWeight: 600,
                        letterSpacing: "0.8px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      LIVE DEMO ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={0}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        pointerEvents: "auto",
                        fontSize: "13.5px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1.5px solid rgba(255,255,255,0.20)",
                        color: "#E2E8F0",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontWeight: 600,
                        letterSpacing: "0.8px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      SOURCE CODE ↗
                    </a>
                  )}
                </div>
              )}
            </div>
            <h2
              style={{
                fontSize: isMobile ? "26px" : "30px",
                margin: 0,
                color: "#FFFFFF",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h2>
          </div>

          {/* STAGE 2 (t2): Contained Themed Inset Preview Panel */}
          <div
            style={{
              height: "118px",
              width: "100%",
              margin: "0 auto",
              opacity: t2,
              transform: `translateY(${(1 - t2) * 6}px) scale(${0.98 + 0.02 * t2})`,
              transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
              borderRadius: "8px",
              border: "1.5px solid rgba(56,214,255,0.25)",
              background: "rgba(10,22,40,0.85)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.30)",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <ProjectPreviewVisualizer projectId={projectId} image={project.image} title={project.title} />
          </div>

          {/* STAGE 3 & 4 (t3, t4): Evidence Body (Challenge + Contribution) */}
          <div
            style={{
              height: "116px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.95fr) minmax(0, 1.05fr)",
              columnGap: "28px",
            }}
          >
            {/* Stage 3: Challenge */}
            {(!isMobile || t3 >= 0.5) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  opacity: t3,
                  transform: `translateY(${(1 - t3) * 6}px)`,
                }}
              >
                <span style={{ fontSize: "14px", color: "#38D6FF", fontWeight: 700, letterSpacing: "1px" }}>
                  CHALLENGE
                </span>
                <p
                  style={{
                    fontSize: "17.5px",
                    margin: 0,
                    color: "#CBD5E1",
                    lineHeight: 1.35,
                    fontWeight: 400,
                  }}
                >
                  {project.problem}
                </p>
              </div>
            )}

            {/* Stage 4: Contribution */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                opacity: t4,
                transform: `translateY(${(1 - t4) * 6}px)`,
              }}
            >
              <span style={{ fontSize: "14px", color: "#38D6FF", fontWeight: 700, letterSpacing: "1px" }}>
                CONTRIBUTION
              </span>
              <p
                style={{
                  fontSize: "17.5px",
                  margin: 0,
                  color: "#F1F5F9",
                  lineHeight: 1.35,
                  fontWeight: 400,
                }}
              >
                {project.built}
              </p>
            </div>
          </div>

          {/* STAGE 5 (t5): DELIVERED OUTCOME FOOTER ROW */}
          <div
            style={{
              height: "90px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(216,168,79,0.08)",
              borderLeft: "6px solid #D8A84F",
              padding: "10px 18px",
              borderRadius: "0 8px 8px 0",
              boxSizing: "border-box",
              opacity: t5,
              transform: `translateY(${(1 - t5) * 6}px)`,
              transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", maxWidth: "540px" }}>
              <span style={{ fontSize: "13.5px", color: "#D8A84F", fontWeight: 700, letterSpacing: "1.2px" }}>
                DELIVERED
              </span>
              <span style={{ fontSize: "18px", color: "#F8FAFC", fontWeight: 600, lineHeight: 1.3 }}>
                {project.result}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
              {project.stack.map((tech: string) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "13.5px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "#CBD5E1",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Equal-Width Action Buttons Row */}
          {isMobile && variant === "active" && (
            <div
              style={{
                display: "flex",
                gap: "12px",
                width: "100%",
                marginTop: "6px",
                opacity: t5,
                transform: `translateY(${(1 - t5) * 6}px)`,
                transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
              }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: 1,
                    pointerEvents: "auto",
                    fontSize: "14px",
                    background: "rgba(56,214,255,0.18)",
                    border: "1.5px solid rgba(56,214,255,0.40)",
                    color: "#38D6FF",
                    padding: "6px 0",
                    borderRadius: "6px",
                    fontWeight: 600,
                    letterSpacing: "0.8px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  LIVE DEMO ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: 1,
                    pointerEvents: "auto",
                    fontSize: "14px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.20)",
                    color: "#E2E8F0",
                    padding: "6px 0",
                    borderRadius: "6px",
                    fontWeight: 600,
                    letterSpacing: "0.8px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  SOURCE CODE ↗
                </a>
              )}
            </div>
          )}
        </Html>
      )}


    </group>
  );
}

export default ProjectCapsule;
