import { Line, Text } from "@react-three/drei";
import { SystemCoreDevice } from "../components/SystemCoreDevice";
import { DatabaseCylinder } from "../components/DatabaseCylinder";
import { ServiceNode } from "../components/ServiceNode";
import { DataTunnel } from "../components/DataTunnel";
import { ApiRoutePulse } from "../components/ApiRoutePulse";
import { DeploymentPipeline } from "../components/DeploymentPipeline";
import { SystemHeartbeat } from "../components/SystemHeartbeat";
import { SCENE_07_COLORS, SCENE_07_LAYOUT } from "../constants/scene07Config";
// Dev reference — content config for later node-label and panel integration
import { SYSTEM_CORE_DATA } from "../content/systemCoreData";

interface Scene07SystemCoreProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

export function Scene07SystemCore({
  sceneId,
  sceneIndex,
  localProgress,
}: Scene07SystemCoreProps) {
  // Content config reference — used for later node-label integration (Task 9.4+)
  void SYSTEM_CORE_DATA;
  // Static connection lines matching the layout coordinates
  const databaseLine: [number, number, number][] = [SCENE_07_LAYOUT.database, SCENE_07_LAYOUT.core];
  const apiLine: [number, number, number][] = [SCENE_07_LAYOUT.api, SCENE_07_LAYOUT.core];
  const authLine: [number, number, number][] = [SCENE_07_LAYOUT.auth, SCENE_07_LAYOUT.core];
  const cacheLine: [number, number, number][] = [SCENE_07_LAYOUT.cache, SCENE_07_LAYOUT.core];
  const queueLine: [number, number, number][] = [SCENE_07_LAYOUT.queue, SCENE_07_LAYOUT.core];

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to a technical server cluster */}
      <ambientLight intensity={0.25} color="#0B132B" />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#FFFFFF" />
      <directionalLight position={[-4, 3, 2]} intensity={0.4} color={SCENE_07_COLORS.accentCyan} />

      {/* Isometric cluster grouping */}
      <group rotation={[0.25, -0.45, 0]}>
        {/* 1. Ground Server Rack Base Plate */}
        <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshStandardMaterial
            color="#080B11"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[0, -0.86, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.25, 3.25]} />
          <meshBasicMaterial color="#1E293B" transparent opacity={0.3} />
        </mesh>

        {/* 2. Data Tunnel transition from Scene 06 */}
        <DataTunnel localProgress={localProgress} />

        {/* 4. API Route Pulse (request/response flow between service nodes) */}
        <ApiRoutePulse localProgress={localProgress} />

        {/* 5. Deployment Pipeline (build → test → deploy → live) */}
        <DeploymentPipeline localProgress={localProgress} />

        {/* 6. System Heartbeat (core health status rings + service pings) */}
        <SystemHeartbeat localProgress={localProgress} />

        {/* 3. Static Connection Pipelines (API Routes/Data Links) */}
        <Line points={databaseLine} color={SCENE_07_COLORS.accentCyan} lineWidth={1.5} dashed dashScale={10} dashSize={0.06} gapSize={0.04} transparent opacity={0.4} />
        <Line points={apiLine} color={SCENE_07_COLORS.accentCyan} lineWidth={1.5} dashed dashScale={10} dashSize={0.06} gapSize={0.04} transparent opacity={0.4} />
        <Line points={authLine} color={SCENE_07_COLORS.accentCyan} lineWidth={1.5} dashed dashScale={10} dashSize={0.06} gapSize={0.04} transparent opacity={0.4} />
        <Line points={cacheLine} color={SCENE_07_COLORS.accentCyan} lineWidth={1.5} dashed dashScale={10} dashSize={0.06} gapSize={0.04} transparent opacity={0.4} />
        <Line points={queueLine} color={SCENE_07_COLORS.accentCyan} lineWidth={1.5} dashed dashScale={10} dashSize={0.06} gapSize={0.04} transparent opacity={0.4} />

        {/* 3. Central System Core (Server Stack Cabinet) */}
        <group position={SCENE_07_LAYOUT.core}>
          <SystemCoreDevice />
        </group>

        {/* 4. Database Cylinder Tower */}
        <group position={SCENE_07_LAYOUT.database}>
          <DatabaseCylinder />
          <Text position={[0, 0.55, 0]} fontSize={0.05} color={SCENE_07_COLORS.textSecondary} fontWeight="bold">
            DB_STORAGE
          </Text>
        </group>

        {/* 5. Service Nodes Blades */}
        <group position={SCENE_07_LAYOUT.api}>
          <ServiceNode label="API" />
          <Text position={[0, 0.35, 0.12]} fontSize={0.045} color={SCENE_07_COLORS.textPrimary} fontWeight="bold">
            API_GATEWAY
          </Text>
        </group>

        <group position={SCENE_07_LAYOUT.auth}>
          <ServiceNode label="AUTH" />
          <Text position={[0, 0.35, 0.12]} fontSize={0.045} color={SCENE_07_COLORS.textPrimary} fontWeight="bold">
            AUTH_SERVICE
          </Text>
        </group>

        <group position={SCENE_07_LAYOUT.cache}>
          <ServiceNode label="CACHE" />
          <Text position={[0, 0.35, 0.12]} fontSize={0.045} color={SCENE_07_COLORS.textPrimary} fontWeight="bold">
            CACHE_STORE
          </Text>
        </group>

        <group position={SCENE_07_LAYOUT.queue}>
          <ServiceNode label="QUEUE" />
          <Text position={[0, 0.35, 0.12]} fontSize={0.045} color={SCENE_07_COLORS.textPrimary} fontWeight="bold">
            TASK_QUEUE
          </Text>
        </group>
      </group>
    </group>
  );
}
export default Scene07SystemCore;
