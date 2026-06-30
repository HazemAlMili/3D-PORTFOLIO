import { Line } from "@react-three/drei";
import { SCENE_07_COLORS, SCENE_07_LAYOUT } from "../constants/scene07Config";

interface DataTunnelProps {
  localProgress?: number;
}

export function DataTunnel({ localProgress = 0 }: DataTunnelProps) {
  // Map local progress into tunnel traversal range [0.0, 0.6]
  const tunnelT = Math.min(1, Math.max(0, localProgress / 0.6));

  const origin: [number, number, number] = [...SCENE_07_LAYOUT.mobileSignalEntry];
  const targets: [number, number, number][] = [
    SCENE_07_LAYOUT.core,
    SCENE_07_LAYOUT.api,
    SCENE_07_LAYOUT.queue,
  ];

  // Interpolates point along a linear path
  const lerpPos = (
    start: [number, number, number],
    end: [number, number, number],
    t: number
  ): [number, number, number] => {
    return [
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t,
      start[2] + (end[2] - start[2]) * t,
    ];
  };

  // Phase offset values for 3 packets per line
  const offsets = [0, 0.33, 0.66];

  // Opacity fade controls (fades in as scroll moves into Scene 07, and fades out when close to core)
  const tunnelOpacity = tunnelT > 0.02 ? Math.min(1.0, (1 - tunnelT) * 1.5) : 0;

  return (
    <group>
      {/* 1. Track Guide Lines from Scene 06 side */}
      {targets.map((target, idx) => (
        <Line
          key={`track-${idx}`}
          points={[origin, target]}
          color={SCENE_07_COLORS.accentCyan}
          lineWidth={1.0}
          transparent
          opacity={tunnelOpacity * 0.25}
          dashed
          dashScale={12}
          dashSize={0.05}
          gapSize={0.03}
        />
      ))}

      {/* 2. Dynamic Traveling Data Packets */}
      {tunnelOpacity > 0.05 &&
        targets.map((target, targetIdx) =>
          offsets.map((offset, offsetIdx) => {
            const progress = (tunnelT + offset) % 1.0;
            const pos = lerpPos(origin, target, progress);

            return (
              <mesh key={`packet-${targetIdx}-${offsetIdx}`} position={pos}>
                <sphereGeometry args={[0.032, 8, 8]} />
                <meshBasicMaterial
                  color={SCENE_07_COLORS.accentCyan}
                  transparent
                  opacity={tunnelOpacity * 0.9}
                />
              </mesh>
            );
          })
        )}
    </group>
  );
}
export default DataTunnel;
