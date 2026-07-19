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
  const packetRef = useRef<THREE.Group>(null);

  // ── 1. Target Coordinates (relative to Scene 03 product anchor at X=1.80) ────
  // Beam exits rightward off-screen toward Scene 04 — no steep drop.
  const localTarget = useMemo((): [number, number, number] => {
    if (isMobile) {
      return [0.0, 0.0, -2.0];
    }
    // Exit right past the product frame, slightly above center — beam goes right-ward
    return [W * 1.6, 0.10, 0.0];
  }, [isMobile, W]);

  // Start point: right-center edge of the product frame (not bottom-right)
  const localStart = useMemo((): [number, number, number] => {
    if (isMobile) {
      return [0.0, H * 0.10, 0.10];
    }
    return [W * 0.50, H * 0.10, 0.10];
  }, [isMobile, W, H]);

  // ── 2. Timings ────────────────────────────────────────────────────────────
  // 0.88 - 0.94: Output point wakes up & gold beam charges
  const outputPointT = Math.max(0, Math.min(1, (localProgress - 0.88) / 0.06));
  
  // 0.90 - 1.00: Conduit beam extends
  const beamProgress = Math.max(0, Math.min(1, (localProgress - 0.90) / 0.08));

  // 0.92 - 1.00: Proof packet travels
  const packetProgress = reducedMotion
    ? 1.0
    : Math.max(0, Math.min(1, (localProgress - 0.92) / 0.08));
    
  // 0.96 - 1.00: Receiver cue activation
  const receiverGlowT = Math.max(0, Math.min(1, (localProgress - 0.96) / 0.04));

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

  const beamEndPos = useMemo((): [number, number, number] => {
    const [tx, ty, tz] = localTarget;
    const [sx, sy, sz] = localStart;
    return [
      sx + (tx - sx) * beamProgress,
      sy + (ty - sy) * beamProgress,
      sz + (tz - sz) * beamProgress,
    ];
  }, [localTarget, localStart, beamProgress]);

  useFrame(() => {
    if (reducedMotion || localProgress < 0.92 || !packetRef.current) return;
    const [px, py, pz] = currentPacketPos;
    packetRef.current.position.set(px, py, pz);
  });

  // Directional conduit line
  const conduitPoints = useMemo((): [number, number, number][] => {
    return [localStart, beamEndPos];
  }, [localStart, beamEndPos]);

  if (localProgress < 0.88 || opacity <= 0.01) return null;

  const baseOpacity = opacity * Math.min(1, (localProgress - 0.88) / 0.04);

  return (
    <group>
      {/* ── A. Output Point Node ─────────────────────────────────────────────── */}
      {outputPointT > 0 && (
        <group position={localStart}>
          <mesh renderOrder={30}>
            <sphereGeometry args={[isMobile ? 0.016 : 0.024, 12, 12]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentGold}
              transparent
              opacity={baseOpacity * outputPointT}
            />
          </mesh>
          <mesh renderOrder={29}>
            <torusGeometry args={[0.04, 0.003, 8, 24]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentCyan}
              transparent
              opacity={baseOpacity * outputPointT * 0.70}
            />
          </mesh>
        </group>
      )}

      {/* ── B. Connecting Handoff Conduit Beam ───────────────────────────────── */}
      {beamProgress > 0 && (
        <Line
          points={conduitPoints}
          color={PRODUCT_ENGINE_COLORS.accentGold}
          lineWidth={isMobile ? 3.0 : 5.5}
          transparent
          opacity={baseOpacity * 0.90}
        />
      )}

      {/* ── C. Traveling Proof Packet ────────────────────────────────────────── */}
      {!reducedMotion && packetProgress > 0 && (
        <group ref={packetRef} renderOrder={35} position={currentPacketPos}>
          {/* Core packet sphere */}
          <mesh renderOrder={36}>
            <sphereGeometry args={[isMobile ? 0.032 : 0.052, 16, 16]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentGold}
              transparent
              opacity={baseOpacity * 0.98}
            />
          </mesh>
          {/* Packet halo aura */}
          <mesh renderOrder={35}>
            <torusGeometry args={[isMobile ? 0.055 : 0.085, 0.006, 8, 32]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentCyan}
              transparent
              opacity={baseOpacity * 0.85}
            />
          </mesh>
        </group>
      )}

      {/* ── D. Scene 04 Receiver Target Cue ──────────────────────────────────── */}
      {receiverGlowT > 0 && (
        <group position={localTarget}>
          <mesh renderOrder={30}>
            <sphereGeometry args={[0.06 + receiverGlowT * 0.04, 16, 16]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentCyan}
              transparent
              opacity={baseOpacity * receiverGlowT * 0.60}
            />
          </mesh>
          <mesh renderOrder={29}>
            <torusGeometry args={[0.09, 0.004, 8, 28]} />
            <meshBasicMaterial
              color={PRODUCT_ENGINE_COLORS.accentGold}
              transparent
              opacity={baseOpacity * receiverGlowT * 0.80}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
