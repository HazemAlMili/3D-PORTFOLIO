import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { TabletDevice } from "../components/TabletDevice";
import { PRODUCT_THINKING_DATA } from "../content/productThinkingData";
import { SCENE_05_COLORS, SCENE_05_ANCHORS, resolveScene05SourceAnchor } from "../constants/scene05Config";
import { isMobileDevice } from "../utils/mobileUtils";

interface Scene05ProductUXProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

export function Scene05ProductUX({ sceneId, sceneIndex, localProgress, opacity = 1.0 }: Scene05ProductUXProps) {
  const isMobile = isMobileDevice();
  const sourceAnchor = useMemo(() => resolveScene05SourceAnchor(isMobile), [isMobile]);

  // Transition budget check
  const shouldRenderHeavy = opacity > 0.02;
  if (!shouldRenderHeavy) return null;

  // Developer reference check to ensure the config compiles successfully
  if (PRODUCT_THINKING_DATA.headline === "") {
    console.log("Empty headline reference");
  }

  // Transition calculations from Scene 04 to Scene 05
  const transitionOpacity = localProgress < 0.30 ? (1 - localProgress / 0.30) : 0;
  const approachT = Math.min(1, Math.max(0, localProgress / 0.30));
  const packetPos = new Vector3().lerpVectors(
    new Vector3(...sourceAnchor),
    new Vector3(...SCENE_05_ANCHORS.tabletUXTarget),
    approachT
  );

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to a tablet desk environment */}
      <ambientLight intensity={0.2} color="#0F172A" />
      <directionalLight position={[4, 6, 3]} intensity={0.7} color="#FFFFFF" />
      <directionalLight position={[-4, 3, 2]} intensity={0.3} color="#38D6FF" />

      {/* Center Tablet Device */}
      <TabletDevice localProgress={localProgress} />

      {/* ================= TRANSITION SIGNAL (Scene 04 Laptop Screen -> Scene 05 Tablet UX Screen) ================= */}
      {transitionOpacity > 0.01 && (
        <group>
          {/* Transition connecting path */}
          <Line
            points={[sourceAnchor, SCENE_05_ANCHORS.tabletUXTarget]}
            color={SCENE_05_COLORS.accentCyan}
            lineWidth={1.2}
            transparent
            opacity={transitionOpacity * 0.4}
            dashed
            dashScale={12}
            dashSize={0.05}
            gapSize={0.03}
          />
          {/* Scroll-deterministic traveling packet */}
          <mesh position={[packetPos.x, packetPos.y, packetPos.z]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial
              color={SCENE_05_COLORS.accentCyan}
              transparent
              opacity={transitionOpacity * 0.9}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
export default Scene05ProductUX;
