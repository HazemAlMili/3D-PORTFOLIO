import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";
import { ProductSemanticLabel } from "./ProductSemanticLabel";
import { ProductPerformanceWave } from "./ProductPerformanceWave";
import { ProductLaunchHandoff } from "./ProductLaunchHandoff";

// ── Product shell dimensions (PRODUCT-POLISH-14A enlarged heroic staging) ────
const DESKTOP_W = 1.70;
const DESKTOP_H = 1.00;
const MOBILE_W  = 1.30;
const MOBILE_H  = 0.78;

// ── Timing helpers & Three-Stage Lifecycle System ──────────────────────────────
function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

function fadeIn(p: number, start: number, end: number, reduced: boolean): number {
  if (reduced) return 1.0;
  return clamp01((p - start) / (end - start));
}

function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Calculates continuous 3-stage lifecycle for every visual element:
 *   1. Pre-appearance (ghost): faint outline/glow before buildStart
 *   2. Build-in: smooth transition (opacity 0.10 -> 1.0, scale 0.92 -> 1.0, active glow pulse)
 *   3. Settle: glow calms down, opacity settles to ~0.68 as downstream beats take focus
 */
function getThreeStageBeatState(
  p: number,
  preStart: number,
  buildStart: number,
  buildEnd: number,
  reduced: boolean
) {
  if (reduced) {
    return { opacity: 1.0, scale: 1.0, zOffset: 0, glow: 0, isGhost: false, isBuild: false, isComplete: true };
  }

  if (p < preStart) {
    return { opacity: 0.0, scale: 0.92, zOffset: -0.04, glow: 0, isGhost: false, isBuild: false, isComplete: false };
  }

  // 1. Pre-appearance ghost stage
  if (p >= preStart && p < buildStart) {
    const ghostT = (p - preStart) / (buildStart - preStart || 0.01);
    const opacity = 0.03 + easeOut(ghostT) * 0.07; // 0.03 -> 0.10
    const scale = 0.92 + easeOut(ghostT) * 0.04;   // 0.92 -> 0.96
    const zOffset = -0.04 * (1 - easeOut(ghostT));
    return { opacity, scale, zOffset, glow: 0.05 * ghostT, isGhost: true, isBuild: false, isComplete: false };
  }

  // 2. Active build-in stage
  if (p >= buildStart && p <= buildEnd) {
    const buildT = (p - buildStart) / (buildEnd - buildStart || 0.01);
    const easeT = easeOut(buildT);
    const opacity = 0.10 + easeT * 0.90; // 0.10 -> 1.0
    const scale = 0.96 + easeT * 0.04;   // 0.96 -> 1.00
    const glow = Math.sin(Math.PI * buildT); // Peak glow mid-reveal
    return { opacity, scale, zOffset: 0, glow, isGhost: false, isBuild: true, isComplete: false };
  }

  // 3. Post-build settled state
  const settleT = Math.min(1, (p - buildEnd) / 0.12);
  const opacity = 1.0 - settleT * 0.32; // 1.0 -> 0.68
  return { opacity, scale: 1.0, zOffset: 0, glow: 0, isGhost: false, isBuild: false, isComplete: true };
}

interface ModuleBaseProps {
  localProgress: number;
  baseOpacity: number;
  isMobile: boolean;
  reducedMotion: boolean;
  wavePulse: number;
}

interface ModuleWithDimsProps extends ModuleBaseProps {
  W: number;
  H: number;
  afterWave: boolean;
}

interface ProductBuildCoreProps {
  localProgress: number;
  opacity?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ProductBuildCore.tsx — Scene 03 Recomposed Cinematic Product Build System
 *                        (PRODUCT-RECOMPOSE-11)
 *
 * Smooth cinematic 7-stage user-friendly narrative pipeline:
 *   Beat 1: IDEA        → seed orb at top-left origin (0.00 – 0.12)
 *   Beat 2: SCREENS     → screen interface & layout frame (0.12 – 0.26)
 *   Beat 3: INTERACTION → central UI flow & action nodes (0.26 – 0.42)
 *   Beat 4: CONNECTIONS → mid-lower system bridge conduits (0.42 – 0.58)
 *   Beat 5: CONTENT     → 3D product content cards in lower body (0.58 – 0.72)
 *   Beat 6: READY       → polished top-right product lock & indicators (0.72 – 0.86 wave / 0.86 – 0.94 lock)
 *   Beat 7: HANDOFF     → proof packet releases to Scene 04 (0.94 – 1.00)
 */
export function ProductBuildCore({
  localProgress,
  opacity = 1.0,
  isMobile = false,
  reducedMotion = false,
}: ProductBuildCoreProps) {
  const shellRef = useRef<THREE.Group>(null);

  const PW = isMobile ? MOBILE_W : DESKTOP_W;
  const PH = isMobile ? MOBILE_H : DESKTOP_H;

  const wireT = fadeIn(localProgress, 0.06, 0.20, reducedMotion);
  const entryZ = reducedMotion
    ? 0
    : THREE.MathUtils.lerp(-0.8, 0, clamp01(wireT * 1.3));

  useFrame((state) => {
    if (reducedMotion || !shellRef.current) return;
    const t = state.clock.getElapsedTime();
    shellRef.current.position.y = Math.sin(t * 0.48) * 0.020;
    shellRef.current.rotation.y = Math.sin(t * 0.22) * 0.016;
  });

  if (localProgress < 0.01 || opacity <= 0.01) return null;

  const exitFade = localProgress > 0.94 ? Math.max(0, 1.0 - (localProgress - 0.94) / 0.04) : 1.0;
  const baseOpacity = opacity * wireT * exitFade;
  const tiltY = isMobile ? 0.04 : 0.10;
  const tiltX = isMobile ? 0.03 : 0.05;

  const waveActive =
    localProgress >= 0.72 && localProgress <= 0.86 && !reducedMotion;
  const wavePulse = waveActive
    ? Math.sin(Math.PI * ((localProgress - 0.72) / 0.14))
    : 0;
  const afterWave = localProgress > 0.86 || reducedMotion;

  const moduleProps: ModuleBaseProps = {
    localProgress,
    baseOpacity,
    isMobile,
    reducedMotion,
    wavePulse,
  };

  const dimProps: ModuleWithDimsProps = {
    ...moduleProps,
    W: PW,
    H: PH,
    afterWave,
  };

  return (
    <group position={[0, 0.08, entryZ]}>
      <group ref={shellRef} rotation={[tiltX, tiltY, 0]}>

        {/* ── Story Path Connectors (IDEA -> SCREENS -> INTERACTION -> CONNECTIONS -> CONTENT -> READY) ── */}
        <StoryPathConnectors {...dimProps} />

        {/* ── Beat 1: IDEA ───────────────────────────── */}
        <IdeaCore {...dimProps} />

        {/* ── Beat 2: SCREENS ────────────────────────── */}
        <ScreensSurface {...dimProps} />

        {/* ── Beat 3: INTERACTION ────────────────────── */}
        <InteractionNodes {...moduleProps} />

        {/* ── Beat 4: CONNECTIONS ────────────────────── */}
        <ConnectionsBridge {...moduleProps} />

        {/* ── Beat 5: CONTENT ────────────────────────── */}
        <ContentCore {...moduleProps} />

        {/* ── Beat 6: READY ──────────────────────────── */}
        <ReadyProductFrame {...dimProps} />

        {/* ── Optimization Wave ──────────────────────── */}
        <ProductPerformanceWave
          localProgress={localProgress}
          opacity={opacity}
          W={PW}
          H={PH}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        {/* ── Beat 7: HANDOFF ────────────────────────── */}
        <ProductLaunchHandoff
          localProgress={localProgress}
          opacity={opacity}
          W={PW}
          H={PH}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STORY PATH CONNECTORS (Sequential neon vector links & pulse data nodes)
// ═══════════════════════════════════════════════════════════════════════════
function StoryPathConnectors({ localProgress, baseOpacity, W, H, isMobile, reducedMotion }: ModuleWithDimsProps) {
  // StoryPath connectors served their purpose once READY is visible (0.86+).
  // Removing them at local 0.86 saves 10 draw calls during the expensive Exit phase.
  if (reducedMotion || localProgress < 0.12 || localProgress > 0.86) return null;

  const pw = W * 0.98;
  const ph = H * 0.98;

  const ideaPos: [number, number, number] = [-pw * 0.58, ph * 0.58, 0.24];
  const screensPos: [number, number, number] = [-pw * 0.20, ph * 0.50, 0.08];
  const interactPos: [number, number, number] = [0.04, isMobile ? 0.26 : 0.42, 0.08];
  const connectPos: [number, number, number] = [0.04, isMobile ? -0.04 : -0.06, 0.04];
  const contentPos: [number, number, number] = [0.04, isMobile ? -0.34 : -0.54, 0.04];
  const readyPos: [number, number, number] = [1.52, 0.90, 0.04];

  const path1Opa = clamp01((localProgress - 0.12) / 0.10); // Idea -> Screens
  const path2Opa = clamp01((localProgress - 0.24) / 0.12); // Screens -> Interaction
  const path3Opa = clamp01((localProgress - 0.40) / 0.12); // Interaction -> Connections
  const path4Opa = clamp01((localProgress - 0.56) / 0.12); // Connections -> Content
  const path5Opa = clamp01((localProgress - 0.72) / 0.12); // Content -> Ready

  const opa = baseOpacity * 0.45;

  return (
    <group>
      {path1Opa > 0.01 && (
        <group>
          <Line points={[ideaPos, screensPos]} color={PRODUCT_ENGINE_COLORS.accentCyan} lineWidth={isMobile ? 0.8 : 1.2} transparent opacity={opa * path1Opa} />
          <mesh position={interpolatedPos(ideaPos, screensPos, path1Opa)}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentCyan} transparent opacity={opa * path1Opa * 0.9} />
          </mesh>
        </group>
      )}
      {path2Opa > 0.01 && (
        <group>
          <Line points={[screensPos, interactPos]} color={PRODUCT_ENGINE_COLORS.accentBlue} lineWidth={isMobile ? 0.8 : 1.2} transparent opacity={opa * path2Opa} />
          <mesh position={interpolatedPos(screensPos, interactPos, path2Opa)}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentBlue} transparent opacity={opa * path2Opa * 0.9} />
          </mesh>
        </group>
      )}
      {path3Opa > 0.01 && (
        <group>
          <Line points={[interactPos, connectPos]} color={PRODUCT_ENGINE_COLORS.accentBlue} lineWidth={isMobile ? 0.8 : 1.2} transparent opacity={opa * path3Opa} />
          <mesh position={interpolatedPos(interactPos, connectPos, path3Opa)}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentBlue} transparent opacity={opa * path3Opa * 0.9} />
          </mesh>
        </group>
      )}
      {path4Opa > 0.01 && (
        <group>
          <Line points={[connectPos, contentPos]} color={PRODUCT_ENGINE_COLORS.accentGold} lineWidth={isMobile ? 0.8 : 1.2} transparent opacity={opa * path4Opa} />
          <mesh position={interpolatedPos(connectPos, contentPos, path4Opa)}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentGold} transparent opacity={opa * path4Opa * 0.9} />
          </mesh>
        </group>
      )}
      {path5Opa > 0.01 && (
        <group>
          <Line points={[contentPos, readyPos]} color={PRODUCT_ENGINE_COLORS.accentGold} lineWidth={isMobile ? 0.8 : 1.2} transparent opacity={opa * path5Opa} />
          <mesh position={interpolatedPos(contentPos, readyPos, path5Opa)}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentGold} transparent opacity={opa * path5Opa * 0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function interpolatedPos(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. IDEA CORE (Beat 1: 0.00 – 0.12) — Top-Left System Origin
// ═══════════════════════════════════════════════════════════════════════════
function IdeaCore({ localProgress, baseOpacity, W, H, isMobile, reducedMotion, wavePulse }: ModuleWithDimsProps) {
  // Pre: 0.00, Build: 0.02-0.10, Settle: 0.12+
  const beat = getThreeStageBeatState(localProgress, 0.00, 0.02, 0.10, reducedMotion);

  // IDEA served its role by local 0.50. Exit-fade to 0 by 0.68 to free render budget
  // during the expensive CONNECTIONS / CONTENT / READY / EXIT beats.
  const ideaExitFade = !reducedMotion && localProgress > 0.50
    ? Math.max(0, 1.0 - (localProgress - 0.50) / 0.18)
    : 1.0;
  if (beat.opacity <= 0.005 || ideaExitFade <= 0.005) return null;

  const settledMult = beat.isComplete && !reducedMotion ? 0.55 : 1.0;
  const opa = baseOpacity * beat.opacity * settledMult * ideaExitFade;

  const pw = W * 0.98;
  const ph = H * 0.98;

  const px = isMobile ? -pw * 0.65 : -pw * 0.58;
  const py = isMobile ? ph * 0.65 : ph * 0.58;
  const pz = isMobile ? 0.20 : 0.24 + beat.zOffset;

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* Spotlight glow during build-in */}
      {beat.glow > 0.02 && (
        <mesh position={[0, 0, -0.02]} renderOrder={19}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={opa * beat.glow * 0.35}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Core glow orb (larger & brighter) */}
      <mesh renderOrder={22}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={opa * (0.95 + wavePulse * 0.05)}
        />
      </mesh>

      {/* Inner halo */}
      <mesh renderOrder={21}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={opa * 0.28}
        />
      </mesh>

      {/* Dual counter-rotating orbit rings */}
      <mesh rotation={[Math.PI * 0.25, 0, Math.PI * 0.08]} renderOrder={23}>
        <torusGeometry args={[0.18, 0.006, 8, 40]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={opa * 0.75}
        />
      </mesh>
      <mesh rotation={[-Math.PI * 0.30, Math.PI * 0.15, 0]} renderOrder={23}>
        <torusGeometry args={[0.22, 0.004, 8, 40]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentBlue}
          transparent
          opacity={opa * 0.50}
        />
      </mesh>

      {/* Story Label: IDEA */}
      <ProductSemanticLabel
        text="IDEA"
        position={[0, 0.24, 0]}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        opacity={baseOpacity * (beat.isGhost ? 0.1 : beat.isBuild ? beat.opacity : 1.0) * ideaExitFade}
        fontSize={0.090}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SCREENS SURFACE (Beat 2: 0.12 – 0.26) — Upper Interface Structure
// ═══════════════════════════════════════════════════════════════════════════
function ScreensSurface({ localProgress, baseOpacity, W, H, isMobile, reducedMotion, wavePulse, afterWave }: ModuleWithDimsProps) {
  // Pre: 0.06, Build: 0.12-0.22, Settle: 0.26+
  const beat = getThreeStageBeatState(localProgress, 0.06, 0.12, 0.22, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const pw = W * 0.98;
  const ph = H * 0.98;
  const pz = 0.08 + beat.zOffset;

  const topNavY  = ph * 0.78;
  const statusY  = -ph * 0.62;
  const zoneLine = pw * 0.76;

  const cornerLen = isMobile ? 0.065 : 0.085;
  const opa = baseOpacity * beat.opacity;
  const waveBoost = wavePulse * 0.16;

  const cornerDefs = [
    { x: -pw, y:  ph, sx:  1, sy: -1 },
    { x:  pw, y:  ph, sx: -1, sy: -1 },
    { x: -pw, y: -ph, sx:  1, sy:  1 },
    { x:  pw, y: -ph, sx: -1, sy:  1 },
  ];

  const outerBorder: [number, number, number][] = [
    [-pw, ph, pz], [pw, ph, pz], [pw, -ph, pz], [-pw, -ph, pz], [-pw, ph, pz],
  ];

  return (
    <group position={[0.04, 0.06, 0]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* Background glass glow fill plane (seated behind internal cards) */}
      <mesh position={[0, 0, -0.45]} renderOrder={2}>
        <planeGeometry args={[pw * 2, ph * 2]} />
        <meshBasicMaterial
          color="#071526"
          transparent
          opacity={opa * (0.38 + (afterWave ? 0.06 : 0))}
          depthWrite={false}
        />
      </mesh>

      {/* Primary screen border */}
      <Line
        points={outerBorder}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 1.2 : (afterWave ? 1.8 : 1.4)}
        transparent
        opacity={opa * (0.72 + waveBoost * 0.6 + (afterWave ? 0.06 : 0))}
      />

      {/* Top screen header bar fill (refined dark blue glass) & divider */}
      <mesh position={[0, topNavY + (ph - topNavY) * 0.5, pz + 0.005]} renderOrder={13}>
        <planeGeometry args={[pw * 1.95, (ph - topNavY) * 0.95]} />
        <meshBasicMaterial color="#0B1E38" transparent opacity={opa * 0.60} depthWrite={false} />
      </mesh>
      <Line
        points={[[-zoneLine, topNavY, pz + 0.01], [zoneLine, topNavY, pz + 0.01]]}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 0.60 : 0.80}
        transparent
        opacity={opa * 0.65}
      />

      {/* Bottom screen status bar divider */}
      <Line
        points={[[-zoneLine * 0.85, statusY, pz + 0.01], [zoneLine * 0.85, statusY, pz + 0.01]]}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.70 : 1.00}
        transparent
        opacity={opa * 0.70}
      />

      {/* Screen layout indicator nodes & window controls */}
      {!isMobile && (
        <group>
          {/* Top header window controls */}
          {[-pw * 0.80, -pw * 0.72, -pw * 0.64].map((dotX, idx) => (
            <mesh key={idx} position={[dotX, topNavY + (ph - topNavY) * 0.50, pz + 0.02]} renderOrder={15}>
              <sphereGeometry args={[0.016, 10, 10]} />
              <meshBasicMaterial
                color={idx === 0 ? PRODUCT_ENGINE_COLORS.accentCyan : idx === 1 ? PRODUCT_ENGINE_COLORS.accentBlue : PRODUCT_ENGINE_COLORS.accentGold}
                transparent
                opacity={opa * 0.95}
              />
            </mesh>
          ))}
          {/* Nav header link line */}
          <Line
            points={[[pw * 0.20, topNavY + (ph - topNavY) * 0.50, pz + 0.01], [pw * 0.70, topNavY + (ph - topNavY) * 0.50, pz + 0.01]]}
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            lineWidth={0.90}
            transparent
            opacity={opa * 0.65}
          />
        </group>
      )}

      {/* Screen corner brackets */}
      {cornerDefs.map((c, i) => (
        <Line
          key={i}
          points={[
            [c.x + c.sx * cornerLen, c.y, pz + 0.01] as [number, number, number],
            [c.x, c.y, pz + 0.01]                   as [number, number, number],
            [c.x, c.y + c.sy * cornerLen, pz + 0.01] as [number, number, number],
          ]}
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          lineWidth={1.6}
          transparent
          opacity={opa * 0.78}
        />
      ))}

      {/* Story Label: SCREENS */}
      <ProductSemanticLabel
        text="SCREENS"
        position={[-pw * 0.25, ph - 0.12, pz + 0.02]}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        opacity={baseOpacity * (beat.isGhost ? 0.1 : beat.isBuild ? beat.opacity : 0.95)}
        fontSize={0.095}
        anchorX="left"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. INTERACTION NODES (Beat 3: 0.26 – 0.42) — Active Center Zone
// ═══════════════════════════════════════════════════════════════════════════
function InteractionNodes({ localProgress, baseOpacity, isMobile, reducedMotion, wavePulse }: ModuleBaseProps) {
  // Pre: 0.20, Build: 0.26-0.36, Settle: 0.42+
  const beat = getThreeStageBeatState(localProgress, 0.20, 0.26, 0.36, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const opa = baseOpacity * beat.opacity;
  const waveBoost = wavePulse * 0.18;

  const px = 0.04;
  const py = isMobile ? 0.26 : 0.42;
  const pz = isMobile ? 0.05 : 0.08 + beat.zOffset;

  const cardW = isMobile ? 0.28 : 0.42;
  const cardH = isMobile ? 0.10 : 0.14;
  const cardD = 0.03;

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* 3D Glass Box Action Card */}
      <mesh renderOrder={14}>
        <boxGeometry args={[cardW * 2, cardH * 2, cardD]} />
        <meshBasicMaterial
          color="#0B1E36"
          transparent
          opacity={opa * 0.50}
          depthWrite={false}
        />
      </mesh>

      {/* Interactive UI Action Card outline */}
      <Line
        points={[
          [-cardW, cardH, cardD * 0.51], [cardW, cardH, cardD * 0.51], [cardW, -cardH, cardD * 0.51], [-cardW, -cardH, cardD * 0.51], [-cardW, cardH, cardD * 0.51]
        ]}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 1.0 : 1.4}
        transparent
        opacity={opa * (0.78 + waveBoost * 0.5)}
      />

      {/* Button action nodes on card */}
      {[-cardW * 0.6, 0, cardW * 0.6].map((nx, i) => (
        <group key={i} position={[nx, 0, cardD * 0.52]}>
          <mesh renderOrder={17}>
            <sphereGeometry args={[0.026, 12, 12]} />
            <meshBasicMaterial
              color={i === 1 ? PRODUCT_ENGINE_COLORS.accentCyan : PRODUCT_ENGINE_COLORS.accentBlue}
              transparent
              opacity={opa * (0.95 + (i === 1 ? wavePulse * 0.05 : 0))}
            />
          </mesh>
          {i === 1 && (
            <mesh renderOrder={16}>
              <torusGeometry args={[0.038, 0.003, 8, 24]} />
              <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentCyan} transparent opacity={opa * 0.70} />
            </mesh>
          )}
        </group>
      ))}

      {/* Story Label: INTERACTION (mobile: FLOW) */}
      <ProductSemanticLabel
        text="INTERACTION"
        mobileText="FLOW"
        position={[0, cardH + 0.12, cardD * 0.6]}
        color="#48C6EF"
        opacity={baseOpacity * (beat.isGhost ? 0.1 : beat.isBuild ? beat.opacity : 0.95)}
        fontSize={0.095}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. CONNECTIONS BRIDGE (Beat 4: 0.42 – 0.58) — Mid-Lower System Bridge
// ═══════════════════════════════════════════════════════════════════════════
function ConnectionsBridge({
  localProgress,
  baseOpacity,
  isMobile,
  reducedMotion,
  wavePulse,
}: ModuleBaseProps) {
  // Pre: 0.36, Build: 0.42-0.52, Settle: 0.58+
  const beat = getThreeStageBeatState(localProgress, 0.36, 0.42, 0.52, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const opa = baseOpacity * beat.opacity;
  const waveBoost = wavePulse * 0.18;

  const px = 0.04;
  const py = isMobile ? -0.04 : -0.06;
  const pz = isMobile ? -0.06 : -0.06 + beat.zOffset;

  const bw = isMobile ? 0.42 : 0.58;
  const bh = isMobile ? 0.16 : 0.22;
  const bz = 0;

  const borderRect: [number, number, number][] = [
    [-bw, bh, bz], [bw, bh, bz], [bw, -bh, bz], [-bw, -bh, bz], [-bw, bh, bz],
  ];

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* System connection plate fill */}
      <mesh position={[0, 0, bz - 0.005]} renderOrder={10}>
        <planeGeometry args={[bw * 2, bh * 2]} />
        <meshBasicMaterial
          color="#0B1C33"
          transparent
          opacity={opa * 0.45}
          depthWrite={false}
        />
      </mesh>

      {/* Border */}
      <Line
        points={borderRect}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.9 : 1.2}
        transparent
        opacity={opa * (0.72 + waveBoost * 0.5)}
      />

      {/* Vertical connection conduits — 2 lines (reduced from 4 for perf) */}
      {!isMobile &&
        ([-bw * 0.30, bw * 0.30] as number[]).map((vx, i) => (
          <Line
            key={i}
            points={[[vx, bh * 0.88, bz + 0.01], [vx, -bh * 0.88, bz + 0.01]]}
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            lineWidth={0.8}
            transparent
            opacity={opa * 0.55}
          />
        ))}

      {/* Connection junction nodes */}
      {(
        [[-bw, bh], [bw, bh], [-bw, -bh], [bw, -bh]] as [number, number][]
      ).map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, bz + 0.02]} renderOrder={14}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            transparent
            opacity={opa * (0.90 + waveBoost)}
          />
        </mesh>
      ))}

      {/* Story Label: CONNECTIONS */}
      <ProductSemanticLabel
        text="CONNECTIONS"
        position={[-bw - 0.12, 0, 0.02]}
        color="#48C6EF"
        opacity={baseOpacity * (beat.isGhost ? 0.1 : beat.isBuild ? beat.opacity : 0.95)}
        fontSize={0.088}
        anchorX="right"
        isMobile={isMobile}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. CONTENT CORE (Beat 5: 0.58 – 0.72) — Lower Product Body & 3D Glass Cards
// ═══════════════════════════════════════════════════════════════════════════
function ContentCore({ localProgress, baseOpacity, isMobile, reducedMotion, wavePulse }: ModuleBaseProps) {
  // Pre: 0.52, Build: 0.58-0.68, Settle: 0.72+
  const beat = getThreeStageBeatState(localProgress, 0.52, 0.58, 0.68, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const opa = baseOpacity * beat.opacity;
  const waveBoost = wavePulse * 0.20;

  const px = 0.04;
  const py = isMobile ? -0.34 : -0.54;
  const pz = isMobile ? 0.02 : 0.04 + beat.zOffset;

  const cardSpacing = isMobile ? 0.24 : 0.40;
  const cardW = isMobile ? 0.10 : 0.16;
  const cardH = isMobile ? 0.09 : 0.13;
  const cardD = 0.02;

  const cardRect: [number, number, number][] = [
    [-cardW, cardH, cardD * 0.51], [cardW, cardH, cardD * 0.51], [cardW, -cardH, cardD * 0.51], [-cardW, -cardH, cardD * 0.51], [-cardW, cardH, cardD * 0.51]
  ];

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* 3 Structured 3D glass product content cards */}
      {[-cardSpacing, 0, cardSpacing].map((cx, i) => {
        const isGold = i === 1 || i === 2;
        const color = isGold ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan;

        return (
          <group key={i} position={[cx, 0, 0]}>
            {/* 3D Glass card chassis */}
            <mesh renderOrder={11}>
              <boxGeometry args={[cardW * 2, cardH * 2, cardD]} />
              <meshBasicMaterial
                color={isGold ? "#241B0A" : "#091F33"}
                transparent
                opacity={opa * 0.50}
                depthWrite={false}
              />
            </mesh>

            {/* Content card border */}
            <Line
              points={cardRect}
              color={color}
              lineWidth={isMobile ? 0.9 : 1.0}
              transparent
              opacity={opa * (0.78 + waveBoost * 0.5)}
            />

            {/* Header bar & skeleton lines */}
            <Line
              points={[[-cardW * 0.70, cardH * 0.40, cardD * 0.52], [cardW * 0.70, cardH * 0.40, cardD * 0.52]]}
              color={color}
              lineWidth={1.0}
              transparent
              opacity={opa * 0.85}
            />
            {/* Glowing progress bar */}
            <Line
              points={[[-cardW * 0.70, -cardH * 0.20, cardD * 0.52], [-cardW * 0.70 + cardW * 1.4 * 0.70, -cardH * 0.20, cardD * 0.52]]}
              color={color}
              lineWidth={1.2}
              transparent
              opacity={opa * 0.80}
            />
          </group>
        );
      })}

      {/* Story Label: CONTENT */}
      <ProductSemanticLabel
        text="CONTENT"
        position={[0, cardH + 0.08, 0.02]}
        color={PRODUCT_ENGINE_COLORS.accentGold}
        opacity={baseOpacity * (beat.isGhost ? 0.1 : beat.isBuild ? beat.opacity : 0.95)}
        fontSize={0.090}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. READY PRODUCT FRAME (Beat 6: 0.86 – 0.94) — Top-Right Completion Lock
// ═══════════════════════════════════════════════════════════════════════════
function ReadyProductFrame({
  localProgress,
  baseOpacity,
  W,
  H,
  isMobile,
  reducedMotion,
  wavePulse,
  afterWave,
}: ModuleWithDimsProps) {
  const wireT = fadeIn(localProgress, 0.06, 0.20, reducedMotion);
  const readyBeat = getThreeStageBeatState(localProgress, 0.80, 0.86, 0.92, reducedMotion);

  const DZ = isMobile ? 0.07 : 0.12;

  const outerFront: [number, number, number][] = [
    [-W, H, DZ * 0.3], [W, H, DZ * 0.3], [W, -H, DZ * 0.3],
    [-W, -H, DZ * 0.3], [-W, H, DZ * 0.3],
  ];
  const outerBack: [number, number, number][] = [
    [-W, H, -DZ * 0.4], [W, H, -DZ * 0.4], [W, -H, -DZ * 0.4],
    [-W, -H, -DZ * 0.4], [-W, H, -DZ * 0.4],
  ];
  const struts: [number, number, number][][] = [
    [[-W, H, DZ * 0.3], [-W, H, -DZ * 0.4]],
    [[W, H, DZ * 0.3], [W, H, -DZ * 0.4]],
    [[-W, -H, DZ * 0.3], [-W, -H, -DZ * 0.4]],
    [[W, -H, DZ * 0.3], [W, -H, -DZ * 0.4]],
  ];

  const baseOpa = baseOpacity * wireT;
  const readyLockFade = readyBeat.isComplete && !reducedMotion ? 0.5 : 0;
  const readyOpa = Math.min(1.0, readyBeat.opacity + readyLockFade);
  const readyBoost = readyOpa * 0.55;
  const waveBoost2 = wavePulse * 0.35;
  const cornerLen = isMobile ? 0.075 : 0.095;

  const cornerDefs = [
    { x: -W, y:  H, sx:  1, sy: -1 },
    { x:  W, y:  H, sx: -1, sy: -1 },
    { x: -W, y: -H, sx:  1, sy:  1 },
    { x:  W, y: -H, sx: -1, sy:  1 },
  ];

  const frontOpacity = baseOpa * (0.75 + waveBoost2 + readyBoost + (afterWave ? 0.15 : 0));

  return (
    <group position={[0.04, 0.06, 0]} scale={[readyBeat.scale, readyBeat.scale, readyBeat.scale]}>
      {/* Subtle background plane — meshBasicMaterial (was PBR meshStandardMaterial) */}
      <mesh position={[0, 0, -DZ]} renderOrder={8}>
        <planeGeometry args={[W * 2, H * 2]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          transparent
          opacity={baseOpa * 0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Front outer frame */}
      <Line
        points={outerFront}
        color={readyOpa > 0.4 ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 1.2 : (afterWave ? 2.0 : 1.6)}
        transparent
        opacity={frontOpacity * 0.85}
      />

      {/* Back outer frame */}
      <Line
        points={outerBack}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.6 : 0.9}
        transparent
        opacity={baseOpa * (0.40 + (afterWave ? 0.10 : 0))}
      />

      {/* Corner struts */}
      {struts.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={PRODUCT_ENGINE_COLORS.accentBlue}
          lineWidth={isMobile ? 0.5 : 0.7}
          transparent
          opacity={baseOpa * (0.35 + (afterWave ? 0.10 : 0))}
        />
      ))}

      {/* Corner bracket marks */}
      {cornerDefs.map((c, i) => (
        <Line
          key={i}
          points={[
            [c.x + c.sx * cornerLen, c.y, DZ * 0.35]            as [number, number, number],
            [c.x,                    c.y, DZ * 0.35]            as [number, number, number],
            [c.x, c.y + c.sy * cornerLen, DZ * 0.35]            as [number, number, number],
          ]}
          color={readyOpa > 0.30 ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan}
          lineWidth={1.8}
          transparent
          opacity={baseOpa * (0.80 + readyBoost * 0.6 + (afterWave ? 0.10 : 0))}
        />
      ))}

      {/* Corner status glow nodes */}
      {([[-W, H], [W, H], [-W, -H], [W, -H]] as [number, number][]).map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, DZ * 0.50]} renderOrder={17}>
          <sphereGeometry args={[0.022, 10, 10]} />
          <meshBasicMaterial
            color={readyOpa > 0.40 ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={baseOpa * (0.90 + wavePulse * 0.15 + readyBoost * 1.5)}
          />
        </mesh>
      ))}

      {/* Hero Lock completion marks (top right) */}
      {readyOpa > 0.3 && (
        <group position={[W - 0.08, H - 0.08, DZ * 0.40]}>
          <mesh renderOrder={18} position={[-0.04, 0, 0]}>
            <sphereGeometry args={[0.014, 10, 10]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentGold} transparent opacity={baseOpa * (0.8 + readyOpa * 0.2)} />
          </mesh>
          <mesh renderOrder={18} position={[0, 0, 0]}>
            <sphereGeometry args={[0.014, 10, 10]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentCyan} transparent opacity={baseOpa * (0.8 + readyOpa * 0.2)} />
          </mesh>
        </group>
      )}

      {/* Story Label: READY */}
      {readyOpa > 0.05 && (
        <ProductSemanticLabel
          text="READY"
          position={[W - 0.22, H - 0.16, DZ * 0.35]}
          color={PRODUCT_ENGINE_COLORS.accentGold}
          opacity={readyOpa * baseOpacity * 0.98}
          fontSize={0.11}
          anchorX="right"
          isMobile={isMobile}
          showOnMobile={true}
        />
      )}
    </group>
  );
}
