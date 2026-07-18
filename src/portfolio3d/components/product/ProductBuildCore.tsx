import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";
import { ProductSemanticLabel } from "./ProductSemanticLabel";
import { ProductPerformanceWave } from "./ProductPerformanceWave";
import { ProductLaunchHandoff } from "./ProductLaunchHandoff";

// ── Product shell dimensions ──────────────────────────────────────────────────
const DESKTOP_W = 1.48;
const DESKTOP_H = 0.84;
const MOBILE_W  = 1.05;
const MOBILE_H  = 0.62;

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
 *   3. Settle: glow calms down, opacity settles to ~0.65 as downstream beats take focus
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
 * ProductBuildCore.tsx — Scene 03 User-Friendly Story Build System
 *                        (PRODUCT-STORY-USER-05)
 *
 * Smooth cinematic 7-beat user-friendly narrative pipeline:
 *
 *   Beat 1: IDEA        → spark / seed orb (0.00 – 0.14)
 *   Beat 2: SCREENS     → screen interface & layout zones (0.14 – 0.28)
 *   Beat 3: INTERACTION → UI cards, buttons, & interactive flow (0.28 – 0.42)
 *   Beat 4: CONNECTIONS → clean system connector links (0.42 – 0.58)
 *   Beat 5: CONTENT     → structured content blocks & data core (0.58 – 0.74)
 *   Beat 6: READY       → polished final product lock & indicators (0.74 – 0.90)
 *   Beat 7: HANDOFF     → proof packet releases to Scene 04 (0.90 – 1.00)
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

  const wireT = fadeIn(localProgress, 0.08, 0.24, reducedMotion);
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

  const baseOpacity = opacity * wireT;
  const tiltY = isMobile ? 0.08 : 0.28;
  const tiltX = isMobile ? 0.05 : 0.12;

  const waveActive =
    localProgress >= 0.70 && localProgress <= 0.82 && !reducedMotion;
  const wavePulse = waveActive
    ? Math.sin(Math.PI * ((localProgress - 0.70) / 0.12))
    : 0;
  const afterWave = localProgress > 0.82 || reducedMotion;

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
    <group position={[0, 0, entryZ]}>
      <group ref={shellRef} rotation={[tiltX, tiltY, 0]}>

        {/* ── Beat 1: IDEA ───────────────────────────── */}
        <IdeaCore {...moduleProps} />

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
// 1. IDEA CORE (Beat 1: 0.00 – 0.14)
// ═══════════════════════════════════════════════════════════════════════════
function IdeaCore({ localProgress, baseOpacity, isMobile, reducedMotion, wavePulse }: ModuleBaseProps) {
  // Pre: 0.00, Build: 0.04-0.12, Settle: 0.14+
  const beat = getThreeStageBeatState(localProgress, 0.00, 0.04, 0.12, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const settledMult = beat.isComplete && !reducedMotion ? 0.35 : 1.0;
  const opa = baseOpacity * beat.opacity * settledMult;

  const px = isMobile ? -0.58 : -0.88;
  const py = isMobile ? 0.36 : 0.58;
  const pz = isMobile ? 0.24 : 0.34 + beat.zOffset;

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* Spotlight glow during build-in */}
      {beat.glow > 0.02 && (
        <mesh position={[0, 0, -0.02]} renderOrder={19}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={opa * beat.glow * 0.28}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Core glow orb */}
      <mesh renderOrder={22}>
        <sphereGeometry args={[0.062, 16, 16]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={opa * (0.95 + wavePulse * 0.05)}
        />
      </mesh>

      {/* Halo */}
      <mesh renderOrder={21}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={opa * 0.22}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI * 0.25, 0, Math.PI * 0.08]}>
        <torusGeometry args={[0.135, 0.0045, 8, 40]} />
        <meshBasicMaterial
          color={PRODUCT_ENGINE_COLORS.accentCyan}
          transparent
          opacity={opa * 0.65}
        />
      </mesh>

      {/* Story Label: IDEA */}
      <ProductSemanticLabel
        text="IDEA"
        position={[0, 0.18, 0]}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        opacity={opa * 0.95}
        fontSize={0.095}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SCREENS SURFACE (Beat 2: 0.14 – 0.28)
// ═══════════════════════════════════════════════════════════════════════════
function ScreensSurface({ localProgress, baseOpacity, W, H, isMobile, reducedMotion, wavePulse, afterWave }: ModuleWithDimsProps) {
  // Pre: 0.08, Build: 0.14-0.24, Settle: 0.28+
  const beat = getThreeStageBeatState(localProgress, 0.08, 0.14, 0.24, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const pw = W * 0.85;
  const ph = H * 0.82;
  const pz = 0.08 + beat.zOffset;

  const topNavY  = ph * 0.62;
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
      {/* Spotlight glow during build-in */}
      {beat.glow > 0.02 && (
        <mesh position={[0, 0, pz - 0.02]} renderOrder={11}>
          <planeGeometry args={[pw * 2.1, ph * 2.1]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={opa * beat.glow * 0.14}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Glass screen fill plane */}
      <mesh position={[0, 0, pz - 0.01]} renderOrder={12}>
        <planeGeometry args={[pw * 2, ph * 2]} />
        <meshStandardMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          emissive={PRODUCT_ENGINE_COLORS.accentCyan}
          emissiveIntensity={0.025 * beat.opacity + wavePulse * 0.025}
          transparent
          opacity={opa * (0.48 + (afterWave ? 0.06 : 0))}
          roughness={0.05}
          metalness={0.16}
          depthWrite={false}
        />
      </mesh>

      {/* Primary screen border */}
      <Line
        points={outerBorder}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 1.2 : (afterWave ? 1.8 : 1.5)}
        transparent
        opacity={opa * (0.85 + waveBoost + (afterWave ? 0.08 : 0))}
      />

      {/* Top screen header divider */}
      <Line
        points={[[-zoneLine, topNavY, pz + 0.01], [zoneLine, topNavY, pz + 0.01]]}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 0.55 : 0.80}
        transparent
        opacity={opa * 0.65}
      />

      {/* Bottom screen status bar divider */}
      <Line
        points={[[-zoneLine * 0.85, statusY, pz + 0.01], [zoneLine * 0.85, statusY, pz + 0.01]]}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.45 : 0.65}
        transparent
        opacity={opa * 0.50}
      />

      {/* Screen layout indicator nodes */}
      {!isMobile && (
        <>
          <mesh position={[-pw * 0.74, topNavY + (ph - topNavY) * 0.30, pz + 0.02]} renderOrder={15}>
            <sphereGeometry args={[0.014, 8, 8]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentCyan}
              transparent
              opacity={opa * 0.85}
            />
          </mesh>
          <mesh position={[-pw * 0.54, topNavY + (ph - topNavY) * 0.30, pz + 0.02]} renderOrder={15}>
            <sphereGeometry args={[0.011, 8, 8]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentBlue}
              transparent
              opacity={opa * 0.65}
            />
          </mesh>
          <Line
            points={[[pw * 0.20, topNavY + (ph - topNavY) * 0.30, pz + 0.01], [pw * 0.60, topNavY + (ph - topNavY) * 0.30, pz + 0.01]]}
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            lineWidth={0.50}
            transparent
            opacity={opa * 0.40}
          />
        </>
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
          lineWidth={2.2}
          transparent
          opacity={opa * 0.92}
        />
      ))}

      {/* Story Label: SCREENS */}
      <ProductSemanticLabel
        text="SCREENS"
        position={[0, ph - 0.06, pz + 0.02]}
        color={PRODUCT_ENGINE_COLORS.accentCyan}
        opacity={opa * 0.95}
        fontSize={0.095}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. INTERACTION NODES (Beat 3: 0.28 – 0.42)
// ═══════════════════════════════════════════════════════════════════════════
function InteractionNodes({ localProgress, baseOpacity, isMobile, reducedMotion, wavePulse }: ModuleBaseProps) {
  // Pre: 0.22, Build: 0.28-0.38, Settle: 0.42+
  const beat = getThreeStageBeatState(localProgress, 0.22, 0.28, 0.38, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const opa = baseOpacity * beat.opacity;
  const waveBoost = wavePulse * 0.18;

  const px = 0.04;
  const py = isMobile ? 0.06 : 0.12;
  const pz = isMobile ? -0.12 : -0.12 + beat.zOffset;

  const cardW = isMobile ? 0.26 : 0.38;
  const cardH = isMobile ? 0.09 : 0.12;

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* Active reveal spotlight glow */}
      {beat.glow > 0.02 && (
        <mesh position={[0, 0, -0.01]} renderOrder={14}>
          <planeGeometry args={[cardW * 2.2, cardH * 2.2]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            transparent
            opacity={opa * beat.glow * 0.22}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Interactive UI Action Card outline */}
      <Line
        points={[
          [-cardW, cardH, 0], [cardW, cardH, 0], [cardW, -cardH, 0], [-cardW, -cardH, 0], [-cardW, cardH, 0]
        ]}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 1.0 : 1.4}
        transparent
        opacity={opa * (0.85 + waveBoost)}
      />

      {/* Button action nodes on card */}
      {[-cardW * 0.6, 0, cardW * 0.6].map((nx, i) => (
        <group key={i} position={[nx, 0, 0.02]}>
          <mesh renderOrder={17}>
            <sphereGeometry args={[0.020, 10, 10]} />
            <meshBasicMaterial
              color={i === 1 ? PRODUCT_ENGINE_COLORS.accentCyan : PRODUCT_ENGINE_COLORS.accentBlue}
              transparent
              opacity={opa * (0.90 + (i === 1 ? wavePulse * 0.10 : 0))}
            />
          </mesh>
          <Line
            points={[[0, -0.04, 0.01], [0, 0.04, 0.01]]}
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            lineWidth={0.50}
            transparent
            opacity={opa * 0.50}
          />
        </group>
      ))}

      {/* Story Label: INTERACTION (mobile: FLOW) */}
      <ProductSemanticLabel
        text="INTERACTION"
        mobileText="FLOW"
        position={[0, cardH + 0.08, 0.02]}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        opacity={opa * 0.92}
        fontSize={0.095}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. CONNECTIONS BRIDGE (Beat 4: 0.42 – 0.58)
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
  const py = isMobile ? -0.14 : -0.16;
  const pz = isMobile ? -0.26 : -0.28 + beat.zOffset;

  const bw = isMobile ? 0.40 : 0.54;
  const bh = isMobile ? 0.18 : 0.24;
  const bz = 0;

  const borderRect: [number, number, number][] = [
    [-bw, bh, bz], [bw, bh, bz], [bw, -bh, bz], [-bw, -bh, bz], [-bw, bh, bz],
  ];

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* Active reveal spotlight glow */}
      {beat.glow > 0.02 && (
        <mesh position={[0, 0, bz - 0.01]} renderOrder={9}>
          <planeGeometry args={[bw * 2.1, bh * 2.1]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            transparent
            opacity={opa * beat.glow * 0.16}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* System connection plate fill */}
      <mesh position={[0, 0, bz - 0.005]} renderOrder={10}>
        <planeGeometry args={[bw * 2, bh * 2]} />
        <meshStandardMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          emissive={PRODUCT_ENGINE_COLORS.accentBlue}
          emissiveIntensity={0.018 * beat.opacity + wavePulse * 0.02}
          transparent
          opacity={opa * 0.52}
          roughness={0.08}
          metalness={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Border */}
      <Line
        points={borderRect}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 1.0 : 1.3}
        transparent
        opacity={opa * (0.75 + waveBoost)}
      />

      {/* Clean vertical connection conduits */}
      {!isMobile &&
        ([-bw * 0.33, bw * 0.33] as number[]).map((vx, i) => (
          <Line
            key={i}
            points={[[vx, bh * 0.85, bz + 0.01], [vx, -bh * 0.85, bz + 0.01]]}
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            lineWidth={0.45}
            transparent
            opacity={opa * 0.42}
          />
        ))}

      {/* Connection junction nodes */}
      {(
        [[-bw, bh], [bw, bh], [-bw, -bh], [bw, -bh]] as [number, number][]
      ).map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, bz + 0.02]} renderOrder={14}>
          <sphereGeometry args={[0.010, 6, 6]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentBlue}
            transparent
            opacity={opa * (0.70 + waveBoost)}
          />
        </mesh>
      ))}

      {/* Story Label: CONNECTIONS */}
      <ProductSemanticLabel
        text="CONNECTIONS"
        position={[-bw - 0.12, 0, 0.02]}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        opacity={opa * 0.90}
        fontSize={0.088}
        anchorX="right"
        isMobile={isMobile}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. CONTENT CORE (Beat 5: 0.58 – 0.74)
// ═══════════════════════════════════════════════════════════════════════════
function ContentCore({ localProgress, baseOpacity, isMobile, reducedMotion, wavePulse }: ModuleBaseProps) {
  // Pre: 0.52, Build: 0.58-0.68, Settle: 0.74+
  const beat = getThreeStageBeatState(localProgress, 0.52, 0.58, 0.68, reducedMotion);
  if (beat.opacity <= 0.005) return null;

  const opa = baseOpacity * beat.opacity;
  const waveBoost = wavePulse * 0.20;

  const px = 0.04;
  const py = isMobile ? -0.34 : -0.48;
  const pz = isMobile ? -0.38 : -0.48 + beat.zOffset;

  const spX = isMobile ? 0.18 : 0.28;

  return (
    <group position={[px, py, pz]} scale={[beat.scale, beat.scale, beat.scale]}>
      {/* Active reveal spotlight glow */}
      {beat.glow > 0.02 && (
        <mesh position={[0, 0, -0.06]} renderOrder={8}>
          <planeGeometry args={[spX * 2 + 0.4, 0.35]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentGold}
            transparent
            opacity={opa * beat.glow * 0.16}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Three distributed database nodes beside each other */}
      {[-spX, 0, spX].map((nx, i) => {
        const isCyanNode = i === 2; // Active rightmost node
        const nodeColor = isCyanNode ? PRODUCT_ENGINE_COLORS.accentCyan : PRODUCT_ENGINE_COLORS.accentGold;
        const nodeR = 0.10;
        const nodeH = 0.05;

        return (
          <group key={i} position={[nx, 0, 0]}>
            {/* Database disc cylinder */}
            <mesh rotation={[Math.PI * 0.5, 0, 0]} renderOrder={11}>
              <cylinderGeometry args={[nodeR, nodeR, nodeH, 16]} />
              <meshStandardMaterial
                color={PRODUCT_ENGINE_COLORS.chamberDepth}
                emissive={nodeColor}
                emissiveIntensity={0.038 * beat.opacity + wavePulse * 0.035}
                transparent
                opacity={opa * 0.68}
                roughness={0.10}
                metalness={0.20}
                depthWrite={false}
              />
            </mesh>

            {/* Neon outer ring (the circles) */}
            <mesh renderOrder={12}>
              <torusGeometry args={[nodeR + 0.03, 0.005, 8, 30]} />
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={opa * (0.75 + waveBoost)}
              />
            </mesh>
          </group>
        );
      })}

      {/* Story Label: CONTENT */}
      <ProductSemanticLabel
        text="CONTENT"
        position={[0, -0.22, 0.02]}
        color={PRODUCT_ENGINE_COLORS.accentGold}
        opacity={opa * 0.95}
        fontSize={0.090}
        anchorX="center"
        isMobile={isMobile}
        showOnMobile={true}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. READY PRODUCT FRAME (Beat 6: 0.74 – 0.90)
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
  const wireT = fadeIn(localProgress, 0.08, 0.24, reducedMotion);
  const readyBeat = getThreeStageBeatState(localProgress, 0.74, 0.80, 0.86, reducedMotion);

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
  // READY shouldn't fade out as much because it's the final lock state
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

  const frontOpacity = baseOpa * (0.65 + waveBoost2 + readyBoost + (afterWave ? 0.15 : 0));

  return (
    <group scale={[readyBeat.scale, readyBeat.scale, readyBeat.scale]}>
      {/* Subtle background plane */}
      <mesh position={[0, 0, -DZ]} renderOrder={8}>
        <planeGeometry args={[W * 2, H * 2]} />
        <meshStandardMaterial
          color={PRODUCT_ENGINE_COLORS.chamberDepth}
          transparent
          opacity={baseOpa * 0.08}
          roughness={0.04}
          metalness={0.14}
          depthWrite={false}
        />
      </mesh>

      {/* Front outer frame */}
      <Line
        points={outerFront}
        color={readyOpa > 0.4 ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan}
        lineWidth={isMobile ? 1.2 : (afterWave ? 2.0 : 1.4)}
        transparent
        opacity={frontOpacity}
      />

      {/* Back outer frame */}
      <Line
        points={outerBack}
        color={PRODUCT_ENGINE_COLORS.accentBlue}
        lineWidth={isMobile ? 0.6 : 0.85}
        transparent
        opacity={baseOpa * (0.45 + (afterWave ? 0.15 : 0))}
      />

      {/* Corner struts */}
      {struts.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={PRODUCT_ENGINE_COLORS.accentBlue}
          lineWidth={isMobile ? 0.5 : 0.7}
          transparent
          opacity={baseOpa * (0.35 + (afterWave ? 0.15 : 0))}
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
          lineWidth={2.4}
          transparent
          opacity={baseOpa * (0.88 + readyBoost + (afterWave ? 0.12 : 0))}
        />
      ))}

      {/* Corner status glow nodes */}
      {([[-W, H], [W, H], [-W, -H], [W, -H]] as [number, number][]).map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, DZ * 0.50]} renderOrder={17}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial
            color={readyOpa > 0.40 ? PRODUCT_ENGINE_COLORS.accentGold : PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={baseOpa * (0.85 + wavePulse * 0.15 + readyBoost * 1.5)}
          />
        </mesh>
      ))}

      {/* Hero Lock completion marks (top right) */}
      {readyOpa > 0.5 && (
        <group position={[W - 0.08, H - 0.08, DZ * 0.40]}>
          <mesh renderOrder={18} position={[-0.03, 0, 0]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentGold} transparent opacity={baseOpa * readyOpa} />
          </mesh>
          <mesh renderOrder={18} position={[0, 0, 0]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color={PRODUCT_ENGINE_COLORS.accentCyan} transparent opacity={baseOpa * readyOpa * 0.7} />
          </mesh>
        </group>
      )}

      {/* Story Label: READY */}
      {readyOpa > 0.05 && (
        <ProductSemanticLabel
          text="READY"
          position={[W - 0.16, H - 0.12, DZ * 0.35]}
          color={PRODUCT_ENGINE_COLORS.accentGold}
          opacity={readyOpa * baseOpacity * 0.95}
          fontSize={0.11}
          anchorX="right"
          isMobile={isMobile}
          showOnMobile={true}
        />
      )}
    </group>
  );
}
