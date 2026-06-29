import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshBasicMaterial } from "three";
import { SCENE_07_COLORS, SCENE_07_LAYOUT, SCENE_07_SUB_PHASES } from "../constants/scene07Config";

interface SystemHeartbeatProps {
  localProgress?: number;
}

// Service node positions to echo status pings
const STATUS_NODES: [number, number, number][] = [
  SCENE_07_LAYOUT.api,
  SCENE_07_LAYOUT.auth,
  SCENE_07_LAYOUT.database,
  SCENE_07_LAYOUT.cache,
  SCENE_07_LAYOUT.queue,
];

function pctIn(localProgress: number, start: number, end: number): number {
  return Math.min(1, Math.max(0, (localProgress - start) / (end - start)));
}

export function SystemHeartbeat({ localProgress = 0 }: SystemHeartbeatProps) {
  // Gate on the immerse phase [0.55, 0.88]
  const [immerseStart, immerseEnd] = SCENE_07_SUB_PHASES.immerse;
  const immerseT = pctIn(localProgress, immerseStart, immerseEnd);

  // Heartbeat becomes readable later than the route pulse / pipeline (0.55 offset)
  const hbT = pctIn(localProgress, immerseStart + 0.22, immerseEnd);

  // Overall envelope: fade in, hold, fade out at exit
  const envelope =
    Math.min(1, hbT * 5.0) * (1 - Math.max(0, (immerseT - 0.88) / 0.12));

  // Refs for decorative ring material mutations (allocation-free in useFrame)
  const outerRingRef = useRef<Mesh>(null!);
  const innerRingRef = useRef<Mesh>(null!);

  // Decorative micro-shimmer — purely cosmetic, does not control scene progression
  useFrame(({ clock }) => {
    if (envelope < 0.02) return;
    const t = clock.getElapsedTime();
    // Slow breath: 0.6 Hz
    const breath = 0.5 + 0.5 * Math.sin(t * Math.PI * 1.2);
    const fastPing = 0.5 + 0.5 * Math.sin(t * Math.PI * 3.5);

    if (outerRingRef.current) {
      const mat = outerRingRef.current.material as MeshBasicMaterial;
      mat.opacity = envelope * 0.28 * breath;
    }
    if (innerRingRef.current) {
      const mat = innerRingRef.current.material as MeshBasicMaterial;
      mat.opacity = envelope * 0.5 * fastPing;
    }
  });

  if (envelope < 0.02) return null;

  const corePos = SCENE_07_LAYOUT.core;

  return (
    <group>
      {/* ── Core Status Rings ── */}
      <group position={corePos}>
        {/* Outer slow-breath ring */}
        <mesh ref={outerRingRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.27, 32]} />
          <meshBasicMaterial
            color={SCENE_07_COLORS.accentCyan}
            transparent
            opacity={envelope * 0.28}
          />
        </mesh>

        {/* Inner faster-ping ring */}
        <mesh ref={innerRingRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.13, 0.16, 24]} />
          <meshBasicMaterial
            color={SCENE_07_COLORS.accentCyan}
            transparent
            opacity={envelope * 0.5}
          />
        </mesh>

        {/* Static health label */}
        <Text
          position={[0, 0.28, 0]}
          fontSize={0.042}
          color={SCENE_07_COLORS.textSecondary}
          anchorX="center"
          anchorY="bottom"
        >
          {envelope > 0.5 ? "SYS OK" : "LOADING"}
        </Text>
      </group>

      {/* ── Per-service health pings (tiny status dots) ── */}
      {STATUS_NODES.map((pos, i) => {
        // Stagger each node ping so they don't all appear at once
        const staggerT = pctIn(localProgress, immerseStart + 0.25 + i * 0.04, immerseEnd);
        const pingOpacity = Math.min(1, staggerT * 6.0) * envelope * 0.6;
        if (pingOpacity < 0.02) return null;
        return (
          <mesh key={`ping-${i}`} position={[pos[0], pos[1] + 0.08, pos[2]]}>
            <circleGeometry args={[0.022, 8]} />
            <meshBasicMaterial
              color={SCENE_07_COLORS.dataGreen}
              transparent
              opacity={pingOpacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}
export default SystemHeartbeat;
