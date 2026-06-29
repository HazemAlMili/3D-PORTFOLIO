import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3, Mesh, MeshStandardMaterial } from "three";
import { SCENE_08_COLORS, SCENE_08_ANCHORS } from "../constants/scene08Config";
import { usePortfolioStore } from "../store/portfolioStore";

export function FinalSystemComposition() {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // References for animation
  const pedestalRingRef = useRef<MeshStandardMaterial>(null);
  const packetProgressRef = useRef<number>(0);

  // Setup device outline coordinates dynamically
  const monitorPoints = useMemo(() => {
    const w = 1.6;
    const h = 0.95;
    const standH = 0.35;
    const baseW = 0.5;
    return {
      screen: [
        [-w / 2, -h / 2, 0],
        [w / 2, -h / 2, 0],
        [w / 2, h / 2, 0],
        [-w / 2, h / 2, 0],
        [-w / 2, -h / 2, 0],
      ] as [number, number, number][],
      stand: [
        [0, -h / 2, 0],
        [0, -h / 2 - standH, 0],
      ] as [number, number, number][],
      base: [
        [-baseW / 2, -h / 2 - standH, 0.1],
        [baseW / 2, -h / 2 - standH, 0.1],
      ] as [number, number, number][],
    };
  }, []);

  const laptopPoints = useMemo(() => {
    const w = 1.4;
    const h = 0.85;
    const baseD = 0.85;
    const angle = 0.25; // Lid tilt back
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    return {
      lid: [
        [-w / 2, 0, 0],
        [w / 2, 0, 0],
        [w / 2, h * cosA, -h * sinA],
        [-w / 2, h * cosA, -h * sinA],
        [-w / 2, 0, 0],
      ] as [number, number, number][],
      base: [
        [-w / 2, 0, 0],
        [w / 2, 0, 0],
        [w / 2 * 1.05, -0.02, baseD],
        [-w / 2 * 1.05, -0.02, baseD],
        [-w / 2, 0, 0],
      ] as [number, number, number][],
    };
  }, []);

  const mobilePoints = useMemo(() => {
    const w = 0.5;
    const h = 0.95;
    const notchW = 0.15;
    const notchH = 0.03;
    return [
      [-w / 2, -h / 2, 0],
      [w / 2, -h / 2, 0],
      [w / 2, h / 2, 0],
      [notchW / 2, h / 2, 0],
      [notchW / 2, h / 2 - notchH, 0],
      [-notchW / 2, h / 2 - notchH, 0],
      [-notchW / 2, h / 2, 0],
      [-w / 2, h / 2, 0],
      [-w / 2, -h / 2, 0],
    ] as [number, number, number][];
  }, []);

  // Connection line vectors (converging on central pedestal)
  const connectionPaths = useMemo(() => {
    const pedestalCenter = new Vector3(...SCENE_08_ANCHORS.pedestal);
    
    // Define exit ports from each anchor
    const monitorExit = new Vector3(...SCENE_08_ANCHORS.monitor).add(new Vector3(0, -0.4, 0));
    const laptopExit = new Vector3(...SCENE_08_ANCHORS.laptop).add(new Vector3(0, -0.1, 0.2));
    const mobileExit = new Vector3(...SCENE_08_ANCHORS.mobile).add(new Vector3(0, -0.2, 0));
    const backendExit = new Vector3(...SCENE_08_ANCHORS.backend).add(new Vector3(0, -0.2, 0));

    return [
      { start: monitorExit, end: pedestalCenter, color: SCENE_08_COLORS.accentBlue },
      { start: laptopExit, end: pedestalCenter, color: SCENE_08_COLORS.accentCyan },
      { start: mobileExit, end: pedestalCenter, color: SCENE_08_COLORS.accentBlue },
      { start: backendExit, end: pedestalCenter, color: SCENE_08_COLORS.accentCyan },
    ];
  }, []);

  // Set up pedestal glowing ring points
  const pedestalRingPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    const radius = 0.75;
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. Pedestal glow pulse
    if (pedestalRingRef.current) {
      pedestalRingRef.current.emissiveIntensity = 0.4 + Math.sin(elapsed * 2) * 0.2;
    }

    // 2. Animate packets along lines
    if (!reducedMotion) {
      packetProgressRef.current = (elapsed * 0.3) % 1.0;
    } else {
      packetProgressRef.current = 0.5;
    }
  });

  return (
    <group>
      {/* ================= PEDESTAL ================= */}
      <group position={SCENE_08_ANCHORS.pedestal}>
        {/* Core base cylinder */}
        <mesh>
          <cylinderGeometry args={[0.7, 0.72, 0.08, 32]} />
          <meshStandardMaterial
            color="#0E121A"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        {/* Inner glossy platform */}
        <mesh position={[0, 0.042, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.01, 32]} />
          <meshStandardMaterial
            ref={pedestalRingRef}
            color="#080F1B"
            emissive={SCENE_08_COLORS.accentCyan}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Outer glowing edge loop */}
        <group position={[0, 0.045, 0]}>
          <Line
            points={pedestalRingPoints}
            color={SCENE_08_COLORS.accentCyan}
            lineWidth={1.2}
            transparent
            opacity={0.8}
          />
        </group>
      </group>

      {/* ================= MONITOR ANCHOR ================= */}
      <group position={SCENE_08_ANCHORS.monitor} rotation={[0, 0.4, 0]}>
        <Line points={monitorPoints.screen} color={SCENE_08_COLORS.accentBlue} lineWidth={0.8} transparent opacity={0.3} />
        <Line points={monitorPoints.stand} color={SCENE_08_COLORS.accentBlue} lineWidth={0.8} transparent opacity={0.3} />
        <Line points={monitorPoints.base} color={SCENE_08_COLORS.accentBlue} lineWidth={0.8} transparent opacity={0.3} />
        {/* Glowing screen center indicator */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentBlue} transparent opacity={0.15} />
        </mesh>
      </group>

      {/* ================= LAPTOP ANCHOR ================= */}
      <group position={SCENE_08_ANCHORS.laptop} rotation={[0, -0.4, 0]}>
        <Line points={laptopPoints.lid} color={SCENE_08_COLORS.accentCyan} lineWidth={0.8} transparent opacity={0.3} />
        <Line points={laptopPoints.base} color={SCENE_08_COLORS.accentCyan} lineWidth={0.8} transparent opacity={0.3} />
        {/* Glowing keyboard base indicator */}
        <mesh position={[0, 0.01, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentCyan} transparent opacity={0.12} />
        </mesh>
      </group>

      {/* ================= MOBILE ANCHOR ================= */}
      <group position={SCENE_08_ANCHORS.mobile} rotation={[0.15, 0.35, -0.05]}>
        <Line points={mobilePoints} color={SCENE_08_COLORS.accentBlue} lineWidth={0.8} transparent opacity={0.3} />
        {/* Home/screen indicator dot */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentBlue} transparent opacity={0.2} />
        </mesh>
      </group>

      {/* ================= BACKEND CORE ANCHOR ================= */}
      <group position={SCENE_08_ANCHORS.backend} rotation={[0, -0.3, 0]}>
        {/* Database Cylinder silhouette */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5, 8, 2, true]} />
          <meshBasicMaterial
            color={SCENE_08_COLORS.accentCyan}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
        {/* Database plates */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 8]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentCyan} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 8]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentCyan} transparent opacity={0.3} />
        </mesh>
        {/* Small floating node spheres around database */}
        <mesh position={[-0.35, 0.1, -0.1]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentCyan} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.3, -0.1, 0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentCyan} transparent opacity={0.4} />
        </mesh>
        {/* Small line to nodes */}
        <Line points={[[0, 0.1, 0], [-0.35, 0.1, -0.1]]} color={SCENE_08_COLORS.accentCyan} lineWidth={0.5} transparent opacity={0.2} />
        <Line points={[[0, -0.1, 0], [0.3, -0.1, 0.2]]} color={SCENE_08_COLORS.accentCyan} lineWidth={0.5} transparent opacity={0.2} />
      </group>

      {/* ================= CONNECTION LINES ================= */}
      {connectionPaths.map((path, idx) => (
        <group key={`conn-group-${idx}`}>
          {/* Static track line */}
          <Line
            points={[path.start, path.end]}
            color={path.color}
            lineWidth={0.8}
            transparent
            opacity={0.25}
          />
          {/* Animate traveling packet (moving from start to end) */}
          <PacketAlongLine start={path.start} end={path.end} color={path.color} progressRef={packetProgressRef} offset={0} />
          <PacketAlongLine start={path.start} end={path.end} color={path.color} progressRef={packetProgressRef} offset={0.5} />
        </group>
      ))}
    </group>
  );
}

// Inner helper component to render individual dynamic packets
interface PacketProps {
  start: Vector3;
  end: Vector3;
  color: string;
  progressRef: React.MutableRefObject<number>;
  offset: number;
}

function PacketAlongLine({ start, end, color, progressRef, offset }: PacketProps) {
  const packetRef = useRef<Mesh>(null);

  useFrame(() => {
    if (packetRef.current) {
      // Calculate cycle progress (0 to 1) using offset
      const progress = (progressRef.current + offset) % 1.0;
      // Interpolate position along the vector path
      const pos = new Vector3().lerpVectors(start, end, progress);
      packetRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={packetRef}>
      <sphereGeometry args={[0.024, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

export default FinalSystemComposition;
