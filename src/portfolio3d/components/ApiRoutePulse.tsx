import { Line, Text } from "@react-three/drei";
import { SCENE_07_COLORS, SCENE_07_LAYOUT, SCENE_07_SUB_PHASES } from "../constants/scene07Config";

interface ApiRoutePulseProps {
  localProgress?: number;
}

// Interpolate along a line path
function lerpLine(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

// Three canonical routes (each uses existing SCENE_07_LAYOUT node positions)
// Route A: API → Auth → Core → Database
const ROUTE_A: [number, number, number][] = [
  SCENE_07_LAYOUT.api,
  SCENE_07_LAYOUT.auth,
  SCENE_07_LAYOUT.core,
  SCENE_07_LAYOUT.database,
];
// Route B: API → Core → Cache
const ROUTE_B: [number, number, number][] = [
  SCENE_07_LAYOUT.api,
  SCENE_07_LAYOUT.core,
  SCENE_07_LAYOUT.cache,
];
// Route C: API → Core → Queue
const ROUTE_C: [number, number, number][] = [
  SCENE_07_LAYOUT.api,
  SCENE_07_LAYOUT.core,
  SCENE_07_LAYOUT.queue,
];

// Compute position of a packet travelling the entire multi-segment route at progress t ∈ [0,1]
function packetOnRoute(
  route: [number, number, number][],
  t: number
): [number, number, number] {
  const segCount = route.length - 1;
  if (segCount <= 0) return route[0];
  const raw = t * segCount;
  const segIndex = Math.min(segCount - 1, Math.floor(raw));
  const segT = raw - segIndex;
  return lerpLine(route[segIndex], route[segIndex + 1], segT);
}

// Derive which route node is currently "active" based on t
function activeNodeIndex(route: [number, number, number][], t: number): number {
  const segCount = route.length - 1;
  return Math.min(segCount, Math.round(t * segCount));
}

interface RouteLayerProps {
  route: [number, number, number][];
  pulseT: number; // 0–1 along this route
  nodeLabels?: string[];
  pulseOpacity: number;
}

function RouteLayer({ route, pulseT, nodeLabels, pulseOpacity }: RouteLayerProps) {
  const packetPos = packetOnRoute(route, pulseT);
  const activeIdx = activeNodeIndex(route, pulseT);

  return (
    <group>
      {/* Track lines (dim dashed guide) */}
      {route.slice(0, -1).map((start, i) => (
        <Line
          key={`seg-${i}`}
          points={[start, route[i + 1]]}
          color={SCENE_07_COLORS.accentCyan}
          lineWidth={0.8}
          dashed
          dashScale={14}
          dashSize={0.04}
          gapSize={0.03}
          transparent
          opacity={pulseOpacity * 0.3}
        />
      ))}

      {/* Bright active segment (from current node to next) */}
      {activeIdx < route.length - 1 && (
        <Line
          points={[route[activeIdx], route[activeIdx + 1]]}
          color={SCENE_07_COLORS.accentCyan}
          lineWidth={2.0}
          transparent
          opacity={pulseOpacity * 0.8}
        />
      )}

      {/* Travelling packet */}
      {pulseOpacity > 0.05 && (
        <mesh position={packetPos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={SCENE_07_COLORS.accentCyan}
            transparent
            opacity={pulseOpacity}
          />
        </mesh>
      )}

      {/* Node highlight rings */}
      {route.map((pos, i) => {
        const isActive = i === activeIdx;
        return (
          <mesh key={`node-${i}`} position={pos}>
            <sphereGeometry args={[isActive ? 0.065 : 0.038, 10, 10]} />
            <meshBasicMaterial
              color={isActive ? SCENE_07_COLORS.accentCyan : "#1D4ED8"}
              transparent
              opacity={pulseOpacity * (isActive ? 0.9 : 0.35)}
            />
          </mesh>
        );
      })}

      {/* Optional node labels for active node only */}
      {nodeLabels && nodeLabels[activeIdx] && pulseOpacity > 0.3 && (
        <Text
          position={[
            route[activeIdx][0],
            route[activeIdx][1] + 0.18,
            route[activeIdx][2],
          ]}
          fontSize={0.05}
          color={SCENE_07_COLORS.textPrimary}
          fontWeight="bold"
          anchorX="center"
          anchorY="bottom"
        >
          {nodeLabels[activeIdx]}
        </Text>
      )}
    </group>
  );
}

export function ApiRoutePulse({ localProgress = 0 }: ApiRoutePulseProps) {
  // Map Scene 07 immerse phase [0.55, 0.88] to a route timeline
  const [immerseStart, immerseEnd] = SCENE_07_SUB_PHASES.immerse;
  const immerseT = Math.min(1, Math.max(0, (localProgress - immerseStart) / (immerseEnd - immerseStart)));

  // Overall pulse opacity (fades in at immerseT > 0, fades out toward 1.0)
  const pulseOpacity = Math.min(1.0, immerseT * 3.0) * (1 - Math.max(0, (immerseT - 0.8) / 0.2));

  // Stagger the three routes so they start at different phases
  const tA = Math.min(1, Math.max(0, (immerseT) / 0.6));
  const tB = Math.min(1, Math.max(0, (immerseT - 0.15) / 0.6));
  const tC = Math.min(1, Math.max(0, (immerseT - 0.3) / 0.6));

  return (
    <group>
      {/* Route A: API → Auth → Core → Database */}
      <RouteLayer
        route={ROUTE_A}
        pulseT={tA}
        nodeLabels={["API", "AUTH", "CORE", "DB"]}
        pulseOpacity={pulseOpacity}
      />

      {/* Route B: API → Core → Cache */}
      <RouteLayer
        route={ROUTE_B}
        pulseT={tB}
        nodeLabels={["API", "CORE", "CACHE"]}
        pulseOpacity={pulseOpacity * 0.75}
      />

      {/* Route C: API → Core → Queue */}
      <RouteLayer
        route={ROUTE_C}
        pulseT={tC}
        nodeLabels={["API", "CORE", "QUEUE"]}
        pulseOpacity={pulseOpacity * 0.6}
      />
    </group>
  );
}
export default ApiRoutePulse;
