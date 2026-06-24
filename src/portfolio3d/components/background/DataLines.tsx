import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";

interface DataLinesProps {
  nodeCount?: number; // default 12
  lineOpacity?: number; // default 0.1
  color?: string; // default "#00B4D8" (Cyan)
}

export function DataLines({ nodeCount = 12, lineOpacity = 0.1, color = "#00B4D8" }: DataLinesProps) {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // Generate random node positions in a disk behind the display
  const nodes = useMemo(() => {
    const positions: Vector3[] = [];
    // Seeded random helper to ensure identical positions across re-renders
    let seed = 42;
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    for (let i = 0; i < nodeCount; i++) {
      const angle = random() * Math.PI * 2;
      const radius = 1.5 + random() * 3;
      positions.push(
        new Vector3(
          Math.cos(angle) * radius,
          (random() - 0.5) * 3,
          -3.5 - random() * 2.5
        )
      );
    }
    return positions;
  }, [nodeCount]);

  // Connect nodes with lines based on proximity
  const lines = useMemo(() => {
    const result: [Vector3, Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.8) {
          result.push([nodes[i], nodes[j]]);
        }
      }
    }
    return result;
  }, [nodes]);

  // Pulse animation
  const progressRef = useRef(0.5);
  useFrame(({ clock }) => {
    if (!reducedMotion) {
      progressRef.current = Math.sin(clock.getElapsedTime() * 0.3) * 0.5 + 0.5;
    } else {
      progressRef.current = 0.5; // Freeze pulsing
    }
  });

  return (
    <group>
      {lines.map(([start, end], idx) => (
        <Line
          key={idx}
          points={[start, end]}
          color={color}
          opacity={lineOpacity * (0.5 + 0.5 * progressRef.current)}
          transparent
          lineWidth={0.5}
        />
      ))}
    </group>
  );
}
