import { Text } from "@react-three/drei";

interface ProductSemanticLabelProps {
  /** Label text (e.g. "IDEA", "SCREENS", "INTERACTION", "CONNECTIONS", "CONTENT", "READY") */
  text: string;
  /** Optional shorter label for mobile viewports (e.g. "FLOW" instead of "INTERACTION") */
  mobileText?: string;
  /** Position in the enclosing group's local space */
  position: [number, number, number];
  /** CSS hex color — defaults to accentCyan */
  color?: string;
  /** Master opacity — pass 0 to hide */
  opacity?: number;
  /** World-unit font size */
  fontSize?: number;
  /** Anchor horizontal alignment */
  anchorX?: "left" | "center" | "right";
  /** Mobile viewport flag */
  isMobile?: boolean;
  /** Whether to display this label on mobile (default false) */
  showOnMobile?: boolean;
}

/**
 * ProductSemanticLabel — user-friendly story label attached to a 3D product module.
 *
 * Uses @react-three/drei Text. Locked flat onto screen surface.
 */
export function ProductSemanticLabel({
  text,
  mobileText,
  position,
  color = "#38D6FF",
  opacity = 1.0,
  fontSize = 0.095,
  anchorX = "left",
  isMobile = false,
  showOnMobile = false,
}: ProductSemanticLabelProps) {
  if (isMobile && !showOnMobile && !mobileText) return null;
  if (opacity <= 0.01) return null;

  const displayText = isMobile ? (mobileText || text) : text;
  const effectiveFontSize = isMobile ? fontSize * 0.78 : fontSize;

  return (
    <group position={position}>
      <Text
        fontSize={effectiveFontSize}
        color={color}
        anchorX={anchorX}
        anchorY="middle"
        letterSpacing={0.08}
        fillOpacity={Math.min(1, Math.max(0, opacity))}
        material-depthWrite={false}
        renderOrder={30}
      >
        {displayText}
      </Text>
    </group>
  );
}
