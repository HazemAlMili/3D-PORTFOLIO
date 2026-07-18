import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PRODUCT_ENGINE_COLORS } from "../../constants/scene03Config";

interface ProductLaunchHandoffProps {
  localProgress: number;
  opacity?: number;
  W: number;
  H: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

/**
 * ProductLaunchHandoff.tsx — Scene 03 Product Lock & Launch Handoff (PRODUCT-06)
 *
 * Story beats:
 *   - 0.74 – 0.88  Product Lock / Quality Pass:
 *                  Minimal status indicators (UX / API / DATA / PERF / READY)
 *                  light up on the top header.
 *   - 0.88 – 1.00  Launch / Proof Handoff:
 *                  Gold vector ray extends from bottom-right corner of the product shell
 *                  toward the Scene 04 Projects laptop screen.
 *                  A small gold proof packet sphere travels along this ray.
 */
export function ProductLaunchHandoff({
  localProgress,
  opacity = 1.0,
  W,
  H,
  isMobile = false,
  reducedMotion = false,
}: ProductLaunchHandoffProps) {
  const packetRef = useRef<THREE.Mesh>(null);

  // ── 1. Target Coordinates (relative to Scene 03 product anchor) ───────────
  const localTarget = useMemo((): [number, number, number] => {
    if (isMobile) {
      return [0.0, -2.8, -3.2];
    }
    // Desktop anchor is at 1.8. Scene 04 archSource is 4.2. Laptop target is [0, 0.4, 0.1] in Scene 04 local.
    // 4.2 - 1.8 = +2.4 in X. So let's aim roughly toward +2.4, -1.8, -3.8.
    return [2.4, -1.8, -3.8];
  }, [isMobile]);

  // Start point of launch: bottom-right corner of the product shell
  const localStart = useMemo((): [number, number, number] => [W, -H, 0], [W, H]);

  // ── 2. Timings ────────────────────────────────────────────────────────────
  // 0.94 - 0.96: Output point wakes up
  const outputPointT = Math.max(0, Math.min(1, (localProgress - 0.94) / 0.02));
  
  // 0.96 - 0.99: Packet travels
  const packetProgress = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.96) / 0.03));
    
  // 0.98 - 1.00: Receiver cue activation
  const receiverGlowT = Math.max(0, Math.min(1, (localProgress - 0.98) / 0.02));

  // ── 3. Path calculation ───────────────────────────────────────────────────
  const currentPacketPos = useMemo((): [number, number, number] => {
    const [tx, ty, tz] = localTarget;
    const [sx, sy, sz] = localStart;
    return [
      sx + (tx - sx) * packetProgress,
      sy + (ty - sy) * packetProgress,
      sz + (tz - sz) * packetProgress,
    ];
  }, [localTarget, localStart, packetProgress]);

  useFrame(() => {
    if (reducedMotion || localProgress < 0.96 || !packetRef.current) return;
    const [px, py, pz] = currentPacketPos;
    packetRef.current.position.set(px, py, pz);
  });

  // Short directional trail behind the packet
  const trailPoints = useMemo((): [number, number, number][] => {
    const [px, py, pz] = currentPacketPos;
    const [sx, sy, sz] = localStart;
    // Trail stretches back halfway to start
    return [
      [sx + (px - sx) * 0.5, sy + (py - sy) * 0.5, sz + (pz - sz) * 0.5],
      [px, py, pz],
    ];
  }, [currentPacketPos, localStart]);

  if (localProgress < 0.94 || opacity <= 0.01) return null;

  const baseOpacity = opacity * Math.min(1, (localProgress - 0.94) / 0.02);

  return (
    <group>
      {/* ── A. Output Point ──────────────────────────────────────────────────── */}
      {outputPointT > 0 && (
        <mesh position={localStart} renderOrder={30}>
          <sphereGeometry args={[isMobile ? 0.012 : 0.018, 12, 12]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentGold}
            transparent
            opacity={baseOpacity * outputPointT * (1.0 - packetProgress)} // Fades out as packet leaves
          />
        </mesh>
      )}

      {/* ── B. Traveling Proof Packet ────────────────────────────────────────── */}
      {!reducedMotion && packetProgress > 0 && packetProgress < 1.0 && (
        <group>
          {/* Packet Core */}
          <mesh ref={packetRef} renderOrder={35} position={currentPacketPos}>
            <sphereGeometry args={[isMobile ? 0.012 : 0.018, 12, 12]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentGold}
              transparent
              opacity={baseOpacity * (1.0 - receiverGlowT)} // Fades as it reaches target
            />
          </mesh>
          
          {/* Subtle Directional Trail */}
          <Line
            points={trailPoints}
            color={PRODUCT_ENGINE_COLORS.accentGold}
            lineWidth={isMobile ? 0.8 : 1.2}
            transparent
            opacity={baseOpacity * 0.40 * (1.0 - receiverGlowT)}
          />
        </group>
      )}

      {/* ── C. Scene 04 Receiver Target Cue ──────────────────────────────────── */}
      {receiverGlowT > 0 && (
        <mesh position={localTarget} renderOrder={30}>
          <sphereGeometry args={[0.06 + receiverGlowT * 0.04, 16, 16]} />
          <meshBasicMaterial
            color={PRODUCT_ENGINE_COLORS.accentCyan}
            transparent
            opacity={baseOpacity * receiverGlowT * 0.40} // Subtle landing pulse
          />
        </mesh>
      )}
    </group>
  );
}
