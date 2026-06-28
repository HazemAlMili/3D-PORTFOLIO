import { Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {
  SCENE_03_SUB_PHASES,
  SCENE_03_STEP_COUNT,
  SCENE_03_COLORS,
  SCENE_03_LAYERS,
} from "../constants/scene03Config";

interface ArchitectureScreenContentProps {
  localProgress: number;
  reducedMotion: boolean;
}

export function ArchitectureScreenContent({
  localProgress,
  reducedMotion,
}: ArchitectureScreenContentProps) {
  const [enterStart, enterEnd] = SCENE_03_SUB_PHASES.enter;
  const [exitStart, exitEnd] = SCENE_03_SUB_PHASES.exit;
  const [immerseStart, immerseEnd] = SCENE_03_SUB_PHASES.immerse;

  // 1. Entry transition (Variant 4 — system window open)
  let entryT = 0;
  if (localProgress >= enterEnd) {
    entryT = 1;
  } else if (localProgress > enterStart) {
    entryT = (localProgress - enterStart) / (enterEnd - enterStart);
  }

  // 2. Exit transition
  let exitT = 0;
  if (localProgress >= exitEnd) {
    exitT = 1;
  } else if (localProgress > exitStart) {
    exitT = (localProgress - exitStart) / (exitEnd - exitStart);
  }

  const baseOpacity = reducedMotion ? 1 : Math.max(0, Math.min(1, entryT * (1 - exitT)));
  const windowScale = reducedMotion ? 1 : 0.85 + 0.15 * entryT;

  // Reveal frame during approach phase (0.00 -> 0.45)
  let approachT = 0;
  if (localProgress >= enterStart) {
    approachT = 1;
  } else {
    approachT = localProgress / enterStart; // 0 to 1 as camera approaches
  }
  // Bezel outline starts at 0.15 opacity and peaks at 0.8 opacity, fading out on exit
  const frameOpacity = reducedMotion ? 1 : Math.max(0.15, Math.min(0.8, (0.15 + 0.65 * approachT) * (1 - exitT)));

  // 3. Step logic during immerse hold phase
  const immerseLen = immerseEnd - immerseStart;
  const immerseT = Math.min(1, Math.max(0, (localProgress - immerseStart) / immerseLen));

  const activeStep = Math.min(
    SCENE_03_STEP_COUNT - 1,
    Math.floor(immerseT * SCENE_03_STEP_COUNT)
  );

  // References for data pulse animations
  const pulseGeomRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (reducedMotion || !pulseGeomRef.current) return;
    // Animate data flow pulse moving along the vertical path
    const t = state.clock.getElapsedTime();
    pulseGeomRef.current.position.y = 0.5 - ((t * 0.8) % 1.1); // Loop flow from top to bottom
  });

  return (
    <group scale={[windowScale, windowScale, 1]}>
      {/* ── System Window Frame (Outer boundary glow) ── */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[4.8, 1.85]} />
        <meshBasicMaterial
          color={SCENE_03_COLORS.panelBg}
          transparent
          opacity={frameOpacity * 0.45}
        />
      </mesh>
      {/* Top Bar for System Window */}
      <mesh position={[0, 0.9, 0.005]}>
        <planeGeometry args={[4.8, 0.05]} />
        <meshBasicMaterial
          color={SCENE_03_COLORS.panelBorder}
          transparent
          opacity={frameOpacity * 0.8}
        />
      </mesh>
      {/* Left and Right Borders */}
      <mesh position={[-2.4, 0, 0.005]}>
        <planeGeometry args={[0.015, 1.85]} />
        <meshBasicMaterial
          color={SCENE_03_COLORS.accentCyan}
          transparent
          opacity={frameOpacity * 0.4}
        />
      </mesh>
      <mesh position={[2.4, 0, 0.005]}>
        <planeGeometry args={[0.015, 1.85]} />
        <meshBasicMaterial
          color={SCENE_03_COLORS.accentCyan}
          transparent
          opacity={frameOpacity * 0.4}
        />
      </mesh>

      {/* Headline (Center-Top inside the window) */}
      <Text
        position={[-1.2, 0.72, 0.01]}
        fontSize={0.075}
        color={SCENE_03_COLORS.accentCyan}
        anchorX="left"
        anchorY="middle"
        maxWidth={2.0}
        letterSpacing={0.08}
        fillOpacity={frameOpacity}
      >
        SYSTEM ARCHITECTURE
      </Text>

      {/* ── LEFT COLUMN: Active Layer Detailed Explanation ── */}
      <group position={[-1.2, -0.05, 0.01]}>
        {SCENE_03_LAYERS.map((layer, index) => {
          const isActive = index === activeStep;
          const textOpacity = isActive ? baseOpacity : baseOpacity * 0.15;
          return (
            <group key={layer.id} visible={isActive || reducedMotion}>
              {/* Detailed Active Header */}
              <Text
                position={[0, 0.35, 0]}
                fontSize={0.15}
                color={SCENE_03_COLORS.accentGold}
                anchorX="left"
                anchorY="top"
                maxWidth={2.0}
                fillOpacity={textOpacity}
              >
                {layer.title}
              </Text>
              
              {/* Detail body */}
              <Text
                position={[0, 0.1, 0]}
                fontSize={0.085}
                color={SCENE_03_COLORS.textPrimary}
                anchorX="left"
                anchorY="top"
                maxWidth={2.1}
                lineHeight={1.4}
                fillOpacity={textOpacity}
              >
                {layer.desc}
              </Text>
              
              {/* Technical sub-metrics */}
              <Text
                position={[0, -0.2, 0]}
                fontSize={0.055}
                color={SCENE_03_COLORS.textSecondary}
                anchorX="left"
                anchorY="top"
                maxWidth={2.1}
                fillOpacity={textOpacity * 0.7}
              >
                {index === 0 && "STACK: React, R3F, Canvas, CSS Modules"}
                {index === 1 && "SPECS: REST, JSON Contracts, RESTful Design"}
                {index === 2 && "LOGIC: Node.js, Services, Core Engines"}
                {index === 3 && "STORE: ACID Transactions, Query Plans"}
                {index === 4 && "HOST: Cloud Platforms, CDNs, Edge Cache"}
              </Text>
            </group>
          );
        })}
      </group>

      {/* ── RIGHT COLUMN: Interactive Layer Stack ── */}
      <group position={[1.1, 0, 0.01]}>
        {/* Connection Vertical Data Path (drawn behind the boxes) */}
        <mesh position={[0, -0.04, -0.005]}>
          <planeGeometry args={[0.015, 1.2]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.panelBorder}
            transparent
            opacity={baseOpacity * 0.5}
          />
        </mesh>

        {/* Data pulse flow sphere */}
        <mesh ref={pulseGeomRef} position={[0, 0, 0.005]}>
          <sphereGeometry args={[0.024, 8, 8]} />
          <meshBasicMaterial
            color={SCENE_03_COLORS.accentCyan}
            transparent
            opacity={baseOpacity * 0.9}
          />
        </mesh>

        {/* The 5 Architecture Panels */}
        {SCENE_03_LAYERS.map((layer, index) => {
          const isActive = index === activeStep;
          const panelColor = isActive
            ? SCENE_03_COLORS.panelActive
            : SCENE_03_COLORS.panelBg;
          const borderColor = isActive
            ? SCENE_03_COLORS.accentCyan
            : SCENE_03_COLORS.panelBorder;

          return (
            <group key={layer.id} position={[0, layer.yPos, 0.01]}>
              {/* Panel Background mesh */}
              <mesh position={[0, 0, 0]}>
                <planeGeometry args={[1.5, 0.18]} />
                <meshBasicMaterial
                  color={panelColor}
                  transparent
                  opacity={baseOpacity * 0.9}
                />
              </mesh>

              {/* Panel Border lines */}
              <mesh position={[0, 0.09, 0.002]}>
                <planeGeometry args={[1.52, 0.008]} />
                <meshBasicMaterial
                  color={borderColor}
                  transparent
                  opacity={baseOpacity * 0.8}
                />
              </mesh>
              <mesh position={[0, -0.09, 0.002]}>
                <planeGeometry args={[1.52, 0.008]} />
                <meshBasicMaterial
                  color={borderColor}
                  transparent
                  opacity={baseOpacity * 0.8}
                />
              </mesh>

              {/* Panel Text Title */}
              <Text
                position={[0, 0, 0.005]}
                fontSize={0.07}
                color={isActive ? SCENE_03_COLORS.accentCyan : SCENE_03_COLORS.textPrimary}
                anchorX="center"
                anchorY="middle"
                fillOpacity={baseOpacity}
              >
                {layer.title}
              </Text>
            </group>
          );
        })}
      </group>

      {/* ── Dot Indicator / Progress Step Pagination at bottom center ── */}
      <group position={[0, -0.75, 0.01]}>
        {Array.from({ length: SCENE_03_STEP_COUNT }).map((_, dot) => (
          <mesh key={dot} position={[(dot - (SCENE_03_STEP_COUNT - 1) / 2) * 0.12, 0, 0]}>
            <circleGeometry args={[dot === activeStep ? 0.016 : 0.008, 12]} />
            <meshBasicMaterial
              color={dot === activeStep ? SCENE_03_COLORS.accentCyan : SCENE_03_COLORS.textSecondary}
              transparent
              opacity={baseOpacity * (dot === activeStep ? 0.95 : 0.35)}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
