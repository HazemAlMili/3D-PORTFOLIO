import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { MobileDevice } from "../components/MobileDevice";
import { SCENE_06_COLORS, SCENE_06_ANCHORS } from "../constants/scene06Config";

interface Scene06ResponsivePerformanceProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

export function Scene06ResponsivePerformance({
  sceneId,
  sceneIndex,
  localProgress,
  opacity = 1.0,
}: Scene06ResponsivePerformanceProps) {
  // Transition budget check
  const shouldRenderHeavy = opacity > 0.02;
  if (!shouldRenderHeavy) return null;

  // Transition calculations from Scene 05 to Scene 06
  const transitionOpacity = localProgress < 0.40 ? (1 - localProgress / 0.40) : 0;
  const approachT = Math.min(1, Math.max(0, localProgress / 0.40));
  const packetPos = new Vector3().lerpVectors(
    new Vector3(...SCENE_06_ANCHORS.tabletUXSource),
    new Vector3(...SCENE_06_ANCHORS.mobileScreenTarget),
    approachT
  );

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to a phone screen environment */}
      <ambientLight intensity={0.2} color="#0F172A" />
      <directionalLight position={[3, 5, 2]} intensity={0.7} color="#FFFFFF" />
      <directionalLight position={[-3, 2, 2]} intensity={0.3} color="#38D6FF" />

      {/* Renders the MobileDevice with scroll-driven rotation foundation */}
      <MobileDevice localProgress={localProgress} />

      {transitionOpacity > 0.01 && (
        <group>
          {/* Transition connecting path */}
          <Line
            points={[SCENE_06_ANCHORS.tabletUXSource, SCENE_06_ANCHORS.mobileScreenTarget]}
            color={SCENE_06_COLORS.accentCyan}
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
              color={SCENE_06_COLORS.accentCyan}
              transparent
              opacity={transitionOpacity * 0.9}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
export default Scene06ResponsivePerformance;
