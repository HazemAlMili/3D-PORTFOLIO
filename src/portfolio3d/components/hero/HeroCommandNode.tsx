import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import {
  SCENE_02_SUB_PHASES,
  CAPABILITY_NODES,
  SCENE_02_COLORS,
  PERF_DEBUG_SCENE_02,
} from "../../constants/scene02Config";
import { normalizeRange, smoothstep01 } from "../opening/systemBootMotion";
import { HeroAtomicCore } from "./HeroAtomicCore";
import { HeroGlbStation } from "./HeroGlbStation";
import { ATOM_ORBITS, getLockedPosition } from "./heroAtomLayout";
import { usePointerInfluence } from "../../interaction/usePointerInfluence";
import { isMobileDevice } from "../../utils/mobileUtils";

const IS_MOBILE = isMobileDevice();

interface HeroCommandNodeProps {
  localProgress: number;
  opacity?: number;
  reducedMotion?: boolean;
}

export function HeroCommandNode({
  localProgress,
  opacity = 1.0,
  reducedMotion = false,
}: HeroCommandNodeProps) {
  const p = Math.min(1, Math.max(0, localProgress));

  // Beat progression derived states
  const [nodeStart, nodeEnd] = SCENE_02_SUB_PHASES.commandNode;
  const [capStart, capEnd] = SCENE_02_SUB_PHASES.capabilities;
  const [sysCompStart, sysCompEnd] = SCENE_02_SUB_PHASES.systemComplete;
  const [railStart, railEnd] = SCENE_02_SUB_PHASES.routeRail;
  const [handoffStart, handoffEnd] = SCENE_02_SUB_PHASES.handoff;

  const nodeBuild = reducedMotion ? 1.0 : smoothstep01(normalizeRange(p, nodeStart, nodeEnd));
  const capProgress = reducedMotion ? 1.0 : smoothstep01(normalizeRange(p, capStart, capEnd));
  const systemCompleteProgress = reducedMotion ? 0.0 : smoothstep01(normalizeRange(p, sysCompStart, sysCompEnd));
  const railProgress = reducedMotion ? 1.0 : smoothstep01(normalizeRange(p, railStart, railEnd));
  const handoffProgress = reducedMotion ? 1.0 : smoothstep01(normalizeRange(p, handoffStart, handoffEnd));

  const coreOpacity = opacity * nodeBuild * (1.0 - handoffProgress * 0.6);
  const capBaseOpacity = opacity * capProgress * (1.0 - handoffProgress * 0.5);
  const systemCompleteGlow = Math.sin(systemCompleteProgress * Math.PI) * 0.45;

  const busProgress = reducedMotion ? 1.0 : smoothstep01(normalizeRange(p, 0.48, 0.82));
  const tempVec = useMemo(() => new Vector3(), []);

  const pulse1Ref = useRef<THREE.Mesh>(null);
  const pulse2Ref = useRef<THREE.Mesh>(null);
  const pulse3Ref = useRef<THREE.Mesh>(null);
  const pulse4Ref = useRef<THREE.Mesh>(null);
  const pulse5Ref = useRef<THREE.Mesh>(null);

  const orbitsGroupRef = useRef<THREE.Group>(null);
  const coreGroupRef = useRef<THREE.Group>(null);
  const pointer = usePointerInfluence();

  // Frame-budget safe spatial projection bridge (0 React state updates)
  useFrame((state) => {
    if (opacity <= 0.005 || (p < 0.06 && !reducedMotion)) return;

    if (orbitsGroupRef.current) {
      orbitsGroupRef.current.rotation.x = pointer.smoothY * 0.025;
      orbitsGroupRef.current.rotation.y = pointer.smoothX * 0.035;
    }
    if (coreGroupRef.current) {
      coreGroupRef.current.position.x = pointer.smoothX * 0.08;
      coreGroupRef.current.position.y = -pointer.smoothY * 0.08;
    }

    CAPABILITY_NODES.forEach((node, idx) => {
      const reveal = reducedMotion
        ? 1.0
        : smoothstep01(normalizeRange(p, node.activeRange[0], node.activeRange[1]));
      
      const nodeArrivalT = idx / 4.0;
      const isBusArrived = reducedMotion || busProgress >= (nodeArrivalT - 0.02);
      const stationStateOpacity = isBusArrived ? 1.0 : 0.0;
      const cardOpacityVal = capBaseOpacity * reveal * stationStateOpacity;

      const [nx, ny, nz] = getLockedPosition(node.id);
      const currentPos: [number, number, number] = [
        nx * (0.8 + reveal * 0.2),
        ny * (0.85 + reveal * 0.15),
        nz * reveal,
      ];

      // Convert local CommandNode position [nx + 1.8, ny - 0.1, nz] to world NDC
      tempVec.set(currentPos[0] + 1.8, currentPos[1] - 0.1, currentPos[2]);
      tempVec.project(state.camera);

      const portX = (tempVec.x * 0.5 + 0.5) * 100;
      const portY = (0.5 - tempVec.y * 0.5) * 100;
      const cardX = portX + node.cardOffset[0];
      const cardY = portY + node.cardOffset[1];

      const cardEl = document.getElementById(`hero-card-${node.id}`);
      const lineEl = document.getElementById(`hero-connector-${node.id}`);
      const portEl = document.getElementById(`hero-port-${node.id}`);

      if (cardEl) {
        cardEl.style.left = `${cardX}%`;
        cardEl.style.top = `${cardY}%`;
        cardEl.style.opacity = `${cardOpacityVal}`;
      }
      if (lineEl) {
        lineEl.setAttribute("x1", `${portX}%`);
        lineEl.setAttribute("y1", `${portY}%`);
        lineEl.setAttribute("x2", `${cardX}%`);
        lineEl.setAttribute("y2", `${cardY}%`);
        lineEl.style.opacity = `${cardOpacityVal * 0.85}`;
      }
      if (portEl) {
        portEl.setAttribute("cx", `${portX}%`);
        portEl.setAttribute("cy", `${portY}%`);
        portEl.style.opacity = `${cardOpacityVal}`;
      }
    });

    const getDrawProgress = (start: number, end: number) => {
      if (reducedMotion) return 1.0;
      return Math.max(0, Math.min(1, (p - start) / (end - start)));
    };

    const prog1 = getDrawProgress(0.24, 0.40);
    const prog2 = getDrawProgress(0.34, 0.50);
    const prog3 = getDrawProgress(0.44, 0.60);
    const prog4 = getDrawProgress(0.54, 0.70);
    const prog5 = getDrawProgress(0.64, 0.80);

    if (pulse1Ref.current && prog1 > 0.05) {
      const draw1 = Math.max(0, Math.floor(prog1 * 64)) + 1;
      const idx = prog1 < 1.0 ? Math.max(0, draw1 - 1) : Math.floor((state.clock.elapsedTime * 16) % 64);
      const pt = ATOM_ORBITS.orbit1[idx];
      pulse1Ref.current.position.set(pt[0], pt[1], pt[2]);
    }

    if (pulse2Ref.current && prog2 > 0.05) {
      const draw2 = Math.max(0, Math.floor(prog2 * 64)) + 1;
      const idx = prog2 < 1.0 ? Math.max(0, draw2 - 1) : Math.floor((state.clock.elapsedTime * 20.8) % 64);
      const pt = ATOM_ORBITS.orbit2[idx];
      pulse2Ref.current.position.set(pt[0], pt[1], pt[2]);
    }

    if (pulse3Ref.current && prog3 > 0.05) {
      const draw3 = Math.max(0, Math.floor(prog3 * 64)) + 1;
      const idx = prog3 < 1.0 ? Math.max(0, draw3 - 1) : Math.floor((state.clock.elapsedTime * 14.4) % 64);
      const pt = ATOM_ORBITS.orbit3[idx];
      pulse3Ref.current.position.set(pt[0], pt[1], pt[2]);
    }

    if (pulse4Ref.current && prog4 > 0.05) {
      const draw4 = Math.max(0, Math.floor(prog4 * 64)) + 1;
      const idx = prog4 < 1.0 ? Math.max(0, draw4 - 1) : Math.floor((state.clock.elapsedTime * 18.4) % 64);
      const pt = ATOM_ORBITS.orbit4[idx];
      pulse4Ref.current.position.set(pt[0], pt[1], pt[2]);
    }

    if (pulse5Ref.current && prog5 > 0.05) {
      const draw5 = Math.max(0, Math.floor(prog5 * 64)) + 1;
      const idx = prog5 < 1.0 ? Math.max(0, draw5 - 1) : Math.floor((state.clock.elapsedTime * 12.4) % 64);
      const pt = ATOM_ORBITS.orbit5[idx];
      pulse5Ref.current.position.set(pt[0], pt[1], pt[2]);
    }
  });

  // TRANS-01 Arrival Visibility Gate:
  // Before p = 0.06 (Scene 01 exit bridge), return null so 3D Command Core does not render prematurely.
  if (opacity <= 0.005 || (p < 0.06 && !reducedMotion)) return null;

  // On mobile: center the command node (desktop offset X=1.8 pushes it right of screen center)
  // On desktop: keep the original split-composition offset
  const groupX = IS_MOBILE ? 0.0 : 1.8;

  return (
    <group position={[groupX, -0.1, 0]}>
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. Central Living System Core (Atomic Nucleus & Containment Shell)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {!PERF_DEBUG_SCENE_02.disableCommandCore && (
        <group ref={coreGroupRef}>
          <HeroAtomicCore
            nodeBuild={nodeBuild}
            coreOpacity={coreOpacity}
            systemCompleteProgress={systemCompleteProgress}
            reducedMotion={reducedMotion}
          />
        </group>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. Atomic Orbit Infrastructure (5 Large Off-Screen Orbits)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {(() => {
        const orbit1Pts = ATOM_ORBITS.orbit1;
        const orbit2Pts = ATOM_ORBITS.orbit2;
        const orbit3Pts = ATOM_ORBITS.orbit3;
        const orbit4Pts = ATOM_ORBITS.orbit4;
        const orbit5Pts = ATOM_ORBITS.orbit5;

        // Progressive Cinematic Orbit Construction
        const getDrawProgress = (start: number, end: number) => {
          if (reducedMotion) return 1.0;
          return Math.max(0, Math.min(1, (p - start) / (end - start)));
        };

        const prog1 = getDrawProgress(0.24, 0.40);
        const prog2 = getDrawProgress(0.34, 0.50);
        const prog3 = getDrawProgress(0.44, 0.60);
        const prog4 = getDrawProgress(0.54, 0.70);
        const prog5 = getDrawProgress(0.64, 0.80);

        const draw1 = Math.max(0, Math.floor(prog1 * 64)) + 1;
        const draw2 = Math.max(0, Math.floor(prog2 * 64)) + 1;
        const draw3 = Math.max(0, Math.floor(prog3 * 64)) + 1;
        const draw4 = Math.max(0, Math.floor(prog4 * 64)) + 1;
        const draw5 = Math.max(0, Math.floor(prog5 * 64)) + 1;

        return (
          <group ref={orbitsGroupRef}>
            {/* Orbit 1: FRONTEND */}
            {!PERF_DEBUG_SCENE_02.disableBusRail && draw1 >= 2 && (
              <Line
                points={orbit1Pts.slice(0, draw1)}
                color={SCENE_02_COLORS.accentCyan}
                lineWidth={1.2}
                transparent
                opacity={capBaseOpacity * (0.35 + systemCompleteGlow * 0.25)}
              />
            )}

            {/* Orbit 2: APIS */}
            {!PERF_DEBUG_SCENE_02.disableBusRail && draw2 >= 2 && (
              <Line
                points={orbit2Pts.slice(0, draw2)}
                color={SCENE_02_COLORS.accentCyan}
                lineWidth={1.2}
                transparent
                opacity={capBaseOpacity * (0.35 + systemCompleteGlow * 0.25)}
              />
            )}

            {/* Orbit 3: BACKEND */}
            {!PERF_DEBUG_SCENE_02.disableBusRail && draw3 >= 2 && (
              <Line
                points={orbit3Pts.slice(0, draw3)}
                color={SCENE_02_COLORS.accentCyan}
                lineWidth={1.2}
                transparent
                opacity={capBaseOpacity * (0.35 + systemCompleteGlow * 0.25)}
              />
            )}

            {/* Orbit 4: DATABASES */}
            {!PERF_DEBUG_SCENE_02.disableBusRail && draw4 >= 2 && (
              <Line
                points={orbit4Pts.slice(0, draw4)}
                color={SCENE_02_COLORS.accentCyan}
                lineWidth={1.2}
                transparent
                opacity={capBaseOpacity * (0.35 + systemCompleteGlow * 0.25)}
              />
            )}

            {/* Orbit 5: DEPLOYMENT */}
            {!PERF_DEBUG_SCENE_02.disableBusRail && draw5 >= 2 && (
              <Line
                points={orbit5Pts.slice(0, draw5)}
                color={SCENE_02_COLORS.accentCyan}
                lineWidth={1.2}
                transparent
                opacity={capBaseOpacity * (0.35 + systemCompleteGlow * 0.25)}
              />
            )}

            {/* Traveling Data/Electron Pulse Spheres along Atomic Orbits */}
            {!reducedMotion && prog1 > 0.05 && (
              <>
                <mesh ref={pulse1Ref} renderOrder={25}>
                  <sphereGeometry args={[0.04, 16, 16]} />
                  <meshBasicMaterial color={SCENE_02_COLORS.accentCyan} transparent opacity={capBaseOpacity * 0.85} />
                </mesh>

                {prog2 > 0.05 && (
                  <mesh ref={pulse2Ref} renderOrder={25}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color={SCENE_02_COLORS.accentCyan} transparent opacity={capBaseOpacity * 0.85} />
                  </mesh>
                )}

                {prog3 > 0.05 && (
                  <mesh ref={pulse3Ref} renderOrder={25}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color={SCENE_02_COLORS.accentCyan} transparent opacity={capBaseOpacity * 0.85} />
                  </mesh>
                )}

                {prog4 > 0.05 && (
                  <mesh ref={pulse4Ref} renderOrder={25}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color={SCENE_02_COLORS.accentCyan} transparent opacity={capBaseOpacity * 0.85} />
                  </mesh>
                )}

                {prog5 > 0.05 && (
                  <mesh ref={pulse5Ref} renderOrder={25}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color={SCENE_02_COLORS.accentCyan} transparent opacity={capBaseOpacity * 0.85} />
                  </mesh>
                )}
              </>
            )}
            {/* Docked Capability Modules on Orbital Stations */}
            {CAPABILITY_NODES.map((node, idx) => {
              const [modStart, modEnd] = node.activeRange;
              const reveal = reducedMotion
                ? 1.0
                : smoothstep01(normalizeRange(p, modStart, modEnd));

              // Causal orbit arrival gate: station remains dim until orbit energizes
              const nodeArrivalT = idx / 4.0;
              const isBusArrived = reducedMotion || busProgress >= (nodeArrivalT - 0.02);
              const stationStateOpacity = isBusArrived ? 1.0 : 0.15;

              const nodeOpacity = capBaseOpacity * reveal * stationStateOpacity;
              if (nodeOpacity <= 0.005) return null;

              const [nx, ny, nz] = getLockedPosition(node.id);
              const currentPos: [number, number, number] = [
                nx * (0.8 + reveal * 0.2),
                ny * (0.85 + reveal * 0.15),
                nz * reveal,
              ];

              const pulseScale = reducedMotion ? 1.0 : 1.0 + Math.sin(reveal * Math.PI) * 0.35;
              const pulseOpacity = reducedMotion ? 0 : (1.0 - Math.abs(reveal - 0.5) * 2) * 0.55;

              return (
                <HeroGlbStation
                  key={node.id}
                  position={currentPos}
                  color={node.color}
                  nodeOpacity={nodeOpacity}
                  pulseOpacity={pulseOpacity}
                  pulseScale={pulseScale}
                  isBusArrived={isBusArrived}
                />
              );
            })}
          </group>
        );
      })()}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. Directional Route Continuation (Earned Outward from Orbit 5)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {railProgress > 0.01 && (
        <group>
          {/* Main forward data line guiding to Scene 03 */}
          <Line
            points={[
              [0.27, -0.82, -0.4],
              [0.27, -0.9, -2.5],
              [0.27, -1.0, -5.0],
            ]}
            color={SCENE_02_COLORS.accentCyan}
            lineWidth={2.0}
            transparent
            opacity={opacity * Math.max(railProgress * 0.65, handoffProgress * 0.9)}
            dashed
            dashScale={12}
            dashSize={0.1}
            gapSize={0.05}
          />

          {/* Pulse beacon traveling outward along the delivery route */}
          {(handoffProgress > 0.01 || railProgress > 0.5) && (
            <mesh
              position={[
                0.27 - 0.0 * Math.max(railProgress * 0.4, handoffProgress),
                -0.82 - 0.18 * Math.max(railProgress * 0.4, handoffProgress),
                -0.4 - 4.6 * Math.max(railProgress * 0.4, handoffProgress),
              ]}
              renderOrder={25}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial
                color={SCENE_02_COLORS.accentCyan}
                transparent
                opacity={opacity * Math.max(railProgress * 0.8, 1.0 - handoffProgress * 0.3)}
              />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
}
