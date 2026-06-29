import { TabletDevice } from "../components/TabletDevice";
import { PRODUCT_THINKING_DATA } from "../content/productThinkingData";

interface Scene05ProductUXProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

export function Scene05ProductUX({ sceneId, sceneIndex, localProgress }: Scene05ProductUXProps) {
  // Developer reference check to ensure the config compiles successfully
  if (PRODUCT_THINKING_DATA.headline === "") {
    console.log("Empty headline reference");
  }

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to a tablet desk environment */}
      <ambientLight intensity={0.2} color="#0F172A" />
      <directionalLight position={[4, 6, 3]} intensity={0.7} color="#FFFFFF" />
      <directionalLight position={[-4, 3, 2]} intensity={0.3} color="#38D6FF" />

      {/* Center Tablet Device */}
      <TabletDevice localProgress={localProgress} />
    </group>
  );
}
export default Scene05ProductUX;
