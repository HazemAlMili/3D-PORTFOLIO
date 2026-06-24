import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { Group } from "three";
import { usePortfolioStore } from "../../store/portfolioStore";

interface CodeFragmentProps {
  content: string; // e.g., "const", "async", "await", "{}", "=>"
  position: [number, number, number];
  color: string; // From palette: Graphite (#2D2D2D), Gold (#D4AF37), Cyan (#00B4D8)
  opacity?: number; // default 0.15-0.3
}

export function CodeFragment({ content, position, color, opacity = 0.2 }: CodeFragmentProps) {
  const ref = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  
  // Floating animation
  useFrame(({ clock }) => {
    if (ref.current && !reducedMotion) {
      const t = clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.3 + position[1]) * 0.05;
      ref.current.rotation.z = Math.sin(t * 0.2 + position[0]) * 0.03;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        {content}
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </Text>
    </group>
  );
}
