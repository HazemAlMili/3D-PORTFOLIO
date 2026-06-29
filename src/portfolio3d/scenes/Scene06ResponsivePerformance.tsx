import { MobileDevice } from "../components/MobileDevice";

interface Scene06ResponsivePerformanceProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

export function Scene06ResponsivePerformance({
  sceneId,
  sceneIndex,
  localProgress,
}: Scene06ResponsivePerformanceProps) {
  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to a phone screen environment */}
      <ambientLight intensity={0.2} color="#0F172A" />
      <directionalLight position={[3, 5, 2]} intensity={0.7} color="#FFFFFF" />
      <directionalLight position={[-3, 2, 2]} intensity={0.3} color="#38D6FF" />

      {/* Renders the MobileDevice with scroll-driven rotation foundation */}
      <MobileDevice localProgress={localProgress} />
    </group>
  );
}
export default Scene06ResponsivePerformance;
