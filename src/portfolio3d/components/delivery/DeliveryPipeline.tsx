import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { SCENE_03_COLORS, SDLC_STAGES } from "../../constants/scene03Config";
import { isMobileDevice } from "../../utils/mobileUtils";

interface DeliveryPipelineProps {
  localProgress: number;
  opacity?: number;
  reducedMotion?: boolean;
}

export function DeliveryPipeline({
  localProgress,
  opacity = 1.0,
  reducedMotion = false,
}: DeliveryPipelineProps) {
  const isMobile = useMemo(() => isMobileDevice(), []);
  const arrivalNodeRef = useRef<THREE.Mesh>(null);
  const arrivalNodeGlowRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseGlowRef = useRef<THREE.Mesh>(null);

  // 1. Orbital SDLC Ring stage points
  const ringStagePoints = useMemo<[number, number, number][]>(() => {
    return SDLC_STAGES.map((stage) =>
      isMobile ? stage.mobilePosition : stage.position
    );
  }, [isMobile]);

  // 2. Smooth closed-loop orbital ring rail points (framing the SDLC stages)
  const fullOrbitalRailPoints = useMemo<[number, number, number][]>(() => {
    const pts = [...ringStagePoints];
    const smoothPoints: [number, number, number][] = [];
    const count = pts.length;
    for (let i = 0; i < count; i++) {
      const pA = pts[i];
      const pB = pts[(i + 1) % count];
      const subdivisions = 8;
      for (let s = 0; s < subdivisions; s++) {
        const t = s / subdivisions;
        const x = pA[0] + (pB[0] - pA[0]) * t;
        const y = pA[1] + (pB[1] - pA[1]) * t;
        const z = pA[2] + (pB[2] - pA[2]) * t;
        smoothPoints.push([x, y, z]);
      }
    }
    smoothPoints.push(pts[0]);
    return smoothPoints;
  }, [ringStagePoints]);

  // Sub-phase progress values (Scene 03 local)
  const arrivalT = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, localProgress / 0.14));

  const pipelineProgress = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.18) / (0.90 - 0.18)));

  // Frame updates for local arrival node and active orbital pulse beacon
  useFrame(() => {
    if (reducedMotion || localProgress <= 0.0) return;

    // 1. Local Arrival Pulse Node (Clean self-contained ingress to Stage 1 IDEA gate)
    if (arrivalNodeRef.current && ringStagePoints.length >= 1 && localProgress <= 0.18) {
      const ideaPt = ringStagePoints[0];
      const startX = isMobile ? -0.7 : -2.2;
      const startY = isMobile ? 2.5 : 1.4;
      const startZ = isMobile ? 0.0 : 0.4;

      const orbX = startX + (ideaPt[0] - startX) * arrivalT;
      const orbY = startY + (ideaPt[1] - startY) * arrivalT;
      const orbZ = startZ + (ideaPt[2] - startZ) * arrivalT;

      arrivalNodeRef.current.position.set(orbX, orbY, orbZ);
      if (arrivalNodeGlowRef.current) {
        arrivalNodeGlowRef.current.position.set(orbX, orbY, orbZ);
      }
    }

    // 2. Active orbital pulse traveling along stage points on the ring
    if (pulseRef.current && ringStagePoints.length >= 2 && localProgress > 0.18) {
      const totalSegs = ringStagePoints.length - 1;
      const scaledP = pipelineProgress * totalSegs;
      const segIdx = Math.min(totalSegs - 1, Math.floor(scaledP));
      const segT = scaledP - segIdx;

      const pA = ringStagePoints[segIdx];
      const pB = ringStagePoints[segIdx + 1];

      const currentX = pA[0] + (pB[0] - pA[0]) * segT;
      const currentY = pA[1] + (pB[1] - pA[1]) * segT;
      const currentZ = pA[2] + (pB[2] - pA[2]) * segT;

      pulseRef.current.position.set(currentX, currentY, currentZ);
      if (pulseGlowRef.current) {
        pulseGlowRef.current.position.set(currentX, currentY, currentZ);
      }
    }
  });

  // Hard Boundary Isolation: No Scene 03 orbital ring rails or stage tracks render while localProgress <= 0.0
  if (localProgress <= 0.0 || opacity <= 0.01) return null;

  const baseOpacity = opacity * 0.85;

  return (
    <group>
      {/* Self-Contained Local Arrival Node (Enters cleanly into Stage 1 IDEA gate) */}
      {!reducedMotion && localProgress <= 0.18 && (
        <group>
          <mesh ref={arrivalNodeRef} renderOrder={32}>
            <sphereGeometry args={[0.08, 20, 20]} />
            <meshStandardMaterial
              color={SCENE_03_COLORS.accentCyan}
              emissive={SCENE_03_COLORS.accentCyan}
              emissiveIntensity={1.8}
              transparent
              opacity={baseOpacity * (1.0 - Math.max(0, (localProgress - 0.12) / 0.06))}
              roughness={0.1}
            />
          </mesh>
          <mesh ref={arrivalNodeGlowRef} renderOrder={31}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial
              color={SCENE_03_COLORS.accentCyan}
              transparent
              opacity={baseOpacity * 0.45 * (1.0 - Math.max(0, (localProgress - 0.12) / 0.06))}
            />
          </mesh>
        </group>
      )}

      {/* Structural Orbital Ring Track (Dark background rail framing the SDLC ring) */}
      <Line
        points={fullOrbitalRailPoints}
        color={SCENE_03_COLORS.ringTrack}
        lineWidth={isMobile ? 2.6 : 3.8}
        transparent
        opacity={baseOpacity * 0.40}
      />

      {/* Active Scroll-Driven Energy Line Segment along the Orbital SDLC Ring */}
      {ringStagePoints.map((pt, i) => {
        if (i === ringStagePoints.length - 1) return null;
        const nextPt = ringStagePoints[i + 1];
        const segProgressThreshold = (i + 1) / (ringStagePoints.length - 1);
        const isSegmentReached = reducedMotion || pipelineProgress >= (i / (ringStagePoints.length - 1));
        const isSegmentCompleted = reducedMotion || pipelineProgress >= segProgressThreshold;

        const segOpacity = baseOpacity * (
          !isSegmentReached ? 0.10 : isSegmentCompleted ? 0.45 : 0.95
        );
        const segColor = !isSegmentReached ? SCENE_03_COLORS.pipelineBase : SCENE_03_COLORS.accentCyan;

        return (
          <Line
            key={i}
            points={[pt, nextPt]}
            color={segColor}
            lineWidth={isSegmentReached ? (isSegmentCompleted ? 2.2 : 3.4) : 1.4}
            transparent
            opacity={segOpacity}
          />
        );
      })}

      {/* Traveling Energy Pulse Beacon along the Orbital Ring */}
      {!reducedMotion && localProgress > 0.18 && localProgress < 0.94 && (
        <group>
          <mesh ref={pulseRef} renderOrder={30}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={SCENE_03_COLORS.accentCyan}
              emissive={SCENE_03_COLORS.accentCyan}
              emissiveIntensity={1.8}
              transparent
              opacity={baseOpacity * 0.95}
            />
          </mesh>
          <mesh ref={pulseGlowRef} renderOrder={29}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial
              color={SCENE_03_COLORS.accentCyan}
              transparent
              opacity={baseOpacity * 0.45}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
