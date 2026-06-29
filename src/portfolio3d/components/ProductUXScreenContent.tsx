import { Line, Text } from "@react-three/drei";
import { PRODUCT_THINKING_DATA } from "../content/productThinkingData";

interface ProductUXScreenContentProps {
  localProgress?: number;
}

export function ProductUXScreenContent({ localProgress = 0 }: ProductUXScreenContentProps) {
  const { steps } = PRODUCT_THINKING_DATA;
  if (!steps) return null;

  const points: [number, number, number][] = [
    [-0.5, 1.2, 0.01],
    [0.5, 0.5, 0.01],
    [-0.5, -0.2, 0.01],
    [0.5, -0.9, 0.01],
    [-0.5, -1.6, 0.01]
  ];

  // Normalized scroll progression inside Scene 05 immerse hold phase [0.55, 0.85]
  const immerseStart = 0.55;
  const immerseEnd = 0.85;
  const immerseLen = immerseEnd - immerseStart;
  const pathT = Math.min(1, Math.max(0, (localProgress - immerseStart) / immerseLen));

  // Interpolate dynamic user path progress
  const segmentCount = points.length - 1; // 4
  const activeSegmentIdx = Math.min(segmentCount - 1, Math.floor(pathT * segmentCount));
  const segmentT = (pathT * segmentCount) - activeSegmentIdx;

  const activePoints: [number, number, number][] = [];
  if (pathT > 0) {
    for (let i = 0; i <= activeSegmentIdx; i++) {
      activePoints.push(points[i]);
    }
    const pStart = points[activeSegmentIdx];
    const pEnd = points[activeSegmentIdx + 1];
    const pTip: [number, number, number] = [
      pStart[0] + (pEnd[0] - pStart[0]) * segmentT,
      pStart[1] + (pEnd[1] - pStart[1]) * segmentT,
      pStart[2] + (pEnd[2] - pStart[2]) * segmentT
    ];
    activePoints.push(pTip);
  }

  // Highlight step nodes based on active index
  const activeStepIndex = Math.min(steps.length - 1, Math.floor(pathT * steps.length));

  return (
    <group>
      {/* ───────────────────────────────────────────────────────────────────────
          HEADER
          ─────────────────────────────────────────────────────────────────────── */}
      <Text
        position={[0, 1.85, 0.02]}
        fontSize={0.08}
        color="#F4F7FA"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        PRODUCT ARCHITECTURE
      </Text>
      
      <Text
        position={[0, 1.62, 0.02]}
        fontSize={0.042}
        color="#A0AEC0"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
        lineHeight={1.3}
      >
        "intent → action → accessible layout"
      </Text>

      <mesh position={[0, 1.5, 0.02]}>
        <planeGeometry args={[2.4, 0.002]} />
        <meshBasicMaterial color="#38D6FF" transparent opacity={0.2} />
      </mesh>

      {/* ───────────────────────────────────────────────────────────────────────
          STATIC CONNECTOR LINE (PATHWAY BETWEEN STEPS)
          ─────────────────────────────────────────────────────────────────────── */}
      <Line
        points={points}
        color="#38D6FF"
        lineWidth={1.5}
        dashed
        dashScale={8}
        dashSize={0.1}
        gapSize={0.05}
        transparent
        opacity={0.2}
      />

      {/* ───────────────────────────────────────────────────────────────────────
          DYNAMIC USER PATH LINE (TIED TO SCROLL PROGRESS)
          ─────────────────────────────────────────────────────────────────────── */}
      {pathT > 0 && activePoints.length >= 2 && (
        <Line
          points={activePoints}
          color="#38D6FF"
          lineWidth={3.5}
          transparent
          opacity={0.85}
        />
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          STEP NODES (CARDS)
          ─────────────────────────────────────────────────────────────────────── */}
      {steps.map((step, idx) => {
        const [x, y] = points[idx];
        const isLeft = idx % 2 === 0;
        const isActive = idx === activeStepIndex && pathT > 0;

        return (
          <group key={step.id} position={[x, y, 0.02]}>
            {/* Card Background */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.7, 0.46, 0.015]} />
              <meshStandardMaterial
                color="#141822"
                roughness={0.7}
                metalness={0.1}
                transparent
                opacity={isActive ? 0.95 : 0.4}
              />
            </mesh>

            {/* Card Bezel border */}
            <mesh position={[0, 0, -0.002]}>
              <boxGeometry args={[1.74, 0.50, 0.016]} />
              <meshBasicMaterial
                color={isLeft ? "#38D6FF" : "#D8A84F"}
                transparent
                opacity={isActive ? 0.85 : 0.15}
              />
            </mesh>

            {/* Step Label */}
            <Text
              position={[-0.75, 0.15, 0.01]}
              fontSize={0.05}
              color={isLeft ? "#38D6FF" : "#D8A84F"}
              anchorX="left"
              anchorY="middle"
              fontWeight="bold"
              fillOpacity={isActive ? 1.0 : 0.4}
            >
              {`0${idx + 1}. ${step.title.toUpperCase()}`}
            </Text>

            {/* Step Description */}
            <Text
              position={[-0.75, -0.08, 0.01]}
              fontSize={0.038}
              color="#A0AEC0"
              anchorX="left"
              anchorY="middle"
              maxWidth={1.4}
              lineHeight={1.2}
              fillOpacity={isActive ? 1.0 : 0.3}
            >
              {step.description}
            </Text>

            {/* Mini visual indicator widget inside each card */}
            <group position={[0.62, 0, 0.01]} scale={isActive ? 1.05 : 0.85}>
              {idx === 0 && (
                <group scale={0.8}>
                  <mesh>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color="#38D6FF" transparent opacity={isActive ? 0.5 : 0.25} />
                  </mesh>
                  <mesh position={[0, -0.1, 0]}>
                    <planeGeometry args={[0.16, 0.05]} />
                    <meshBasicMaterial color="#38D6FF" transparent opacity={isActive ? 0.9 : 0.4} />
                  </mesh>
                </group>
              )}
              {idx === 1 && (
                <group scale={0.7}>
                  <mesh position={[-0.1, 0.06, 0]}>
                    <circleGeometry args={[0.04, 16]} />
                    <meshBasicMaterial color="#D8A84F" transparent opacity={isActive ? 0.9 : 0.4} />
                  </mesh>
                  <mesh position={[0.1, -0.06, 0]}>
                    <circleGeometry args={[0.04, 16]} />
                    <meshBasicMaterial color="#D8A84F" transparent opacity={isActive ? 0.9 : 0.4} />
                  </mesh>
                  <mesh position={[0, 0, 0]} rotation={[0, 0, -0.5]}>
                    <planeGeometry args={[0.2, 0.02]} />
                    <meshBasicMaterial color="#D8A84F" transparent opacity={isActive ? 0.6 : 0.25} />
                  </mesh>
                </group>
              )}
              {idx === 2 && (
                <group scale={0.8}>
                  <mesh position={[-0.05, -0.05, 0]}>
                    <boxGeometry args={[0.18, 0.14, 0.005]} />
                    <meshBasicMaterial color="#38D6FF" transparent opacity={isActive ? 0.6 : 0.3} />
                  </mesh>
                  <mesh position={[0.08, 0.08, 0]}>
                    <boxGeometry args={[0.12, 0.12, 0.005]} />
                    <meshBasicMaterial color="#38D6FF" transparent opacity={isActive ? 0.4 : 0.15} />
                  </mesh>
                </group>
              )}
              {idx === 3 && (
                <group scale={0.8}>
                  <mesh position={[0, 0.07, 0]}>
                    <boxGeometry args={[0.2, 0.06, 0.005]} />
                    <meshBasicMaterial color="#38D6FF" transparent opacity={isActive ? 0.9 : 0.4} />
                  </mesh>
                  <mesh position={[0, -0.07, 0]}>
                    <boxGeometry args={[0.2, 0.06, 0.005]} />
                    <meshBasicMaterial color="#E53E3E" transparent opacity={isActive ? 0.9 : 0.4} />
                  </mesh>
                </group>
              )}
              {idx === 4 && (
                <group scale={0.8}>
                  <mesh position={[-0.08, 0, 0]}>
                    <boxGeometry args={[0.08, 0.22, 0.005]} />
                    <meshBasicMaterial color="#D8A84F" transparent opacity={isActive ? 0.9 : 0.4} />
                  </mesh>
                  <mesh position={[0.08, 0.06, 0]}>
                    <boxGeometry args={[0.12, 0.08, 0.005]} />
                    <meshBasicMaterial color="#D8A84F" transparent opacity={isActive ? 0.7 : 0.3} />
                  </mesh>
                  <mesh position={[0.08, -0.06, 0]}>
                    <boxGeometry args={[0.12, 0.08, 0.005]} />
                    <meshBasicMaterial color="#D8A84F" transparent opacity={isActive ? 0.7 : 0.3} />
                  </mesh>
                </group>
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
}
export default ProductUXScreenContent;
