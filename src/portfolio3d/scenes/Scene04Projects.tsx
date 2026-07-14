import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Line } from "@react-three/drei";
import { LaptopDevice } from "../components/LaptopDevice";
import { ProjectCaseStudyPanel } from "../components/ProjectCaseStudyPanel";
import { PROJECT_DATA } from "../content/projectData";
import { SCENE_04_SUB_PHASES, SCENE_04_COLORS, SCENE_04_ANCHORS } from "../constants/scene04Config";
import { usePortfolioStore } from "../store/portfolioStore";

interface Scene04ProjectsProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
  opacity?: number;
}

export function Scene04Projects({ sceneId, sceneIndex, localProgress, opacity = 1.0 }: Scene04ProjectsProps) {
  const deviceGroupRef = useRef<Group>(null);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // Transition budget check
  const shouldRenderHeavy = opacity > 0.02;
  const shouldAnimate = opacity > 0.05;
  const shouldRenderStatic = reducedMotion === true || !shouldAnimate;

  const [enterStart] = SCENE_04_SUB_PHASES.enter;
  const [immerseStart, immerseEnd] = SCENE_04_SUB_PHASES.immerse;

  useFrame((state) => {
    if (!shouldRenderHeavy) return;
    if (shouldRenderStatic) return;
    if (!deviceGroupRef.current) return;

    const p = localProgress;
    const t = state.clock.getElapsedTime();

    // Damps out laptop breathing float animation to 0 when camera zooms in close
    const dampFactor = p < enterStart
      ? 1
      : Math.max(0, 1 - (p - enterStart) / (immerseStart - enterStart));

    deviceGroupRef.current.position.y = Math.sin(t * 0.8) * 0.02 * dampFactor;
    deviceGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.01 * dampFactor;
    deviceGroupRef.current.rotation.x = Math.cos(t * 0.5) * 0.005 * dampFactor;
  });

  // Transition calculations from Scene 03 to Scene 04
  const transitionOpacity = localProgress < 0.40 ? (1 - localProgress / 0.40) : 0;
  const approachT = Math.min(1, Math.max(0, localProgress / 0.40));
  const packetPos = new Vector3().lerpVectors(
    new Vector3(...SCENE_04_ANCHORS.architectureSource),
    new Vector3(...SCENE_04_ANCHORS.laptopScreenTarget),
    approachT
  );
  const immerseLen = immerseEnd - immerseStart;

  // Normalise progress inside immerse hold phase
  const immerseT = Math.min(1, Math.max(0, (localProgress - immerseStart) / immerseLen));

  // Determine active project based on progress slice
  const stepCount = PROJECT_DATA.length;
  const activeIndex = Math.min(stepCount - 1, Math.floor(immerseT * stepCount));

  if (!shouldRenderHeavy) return null;

  return (
    <group position={[0, 0, 0]} userData={{ sceneId, sceneIndex }}>
      {/* Lights tailored to a laptop desk environment */}
      <ambientLight intensity={0.15} color="#0F172A" />
      <directionalLight position={[4, 6, 3]} intensity={0.8} color="#FFFFFF" />
      <directionalLight position={[-4, 3, 2]} intensity={0.4} color="#38D6FF" />
      <pointLight position={[0, 1, 2]} intensity={0.3} color="#38D6FF" />

      {/* Floating chassis container */}
      <group ref={deviceGroupRef}>
        <LaptopDevice />

        {/* Project content rendered on screen face (Z=0.10) */}
        <group position={[0, 0.4, 0.10]}>
          {PROJECT_DATA.map((project, idx) => {
            const stepSize = 1 / stepCount;
            const fadeZone = 0.15; // 15% crossfade zone
            
            const projectStart = idx * stepSize;
            const projectEnd = (idx + 1) * stepSize;

            let opacity = 0;

            if (shouldRenderStatic) {
              opacity = idx === activeIndex ? 1 : 0;
            } else {
              const fadeIn = projectStart + stepSize * fadeZone;
              const fadeOut = projectEnd - stepSize * fadeZone;

              if (immerseT >= fadeIn && immerseT <= fadeOut) {
                opacity = 1;
              } else if (immerseT < fadeIn && immerseT >= projectStart) {
                opacity = (immerseT - projectStart) / (fadeIn - projectStart);
              } else if (immerseT > fadeOut && immerseT <= projectEnd) {
                opacity = 1 - (immerseT - fadeOut) / (projectEnd - fadeOut);
              }
            }

            // Hide everything if we are outside the hold phase
            const finalOpacity = localProgress < immerseStart || localProgress > immerseEnd
              ? 0
              : Math.max(0, Math.min(1, opacity));

            if (finalOpacity <= 0) return null;

            return (
              <ProjectCaseStudyPanel
                key={project.id}
                project={project}
                opacity={finalOpacity}
                projectCount={stepCount}
                activeIndex={activeIndex}
              />
            );
          })}
        </group>
      </group>

      {/* ================= TRANSITION SIGNAL (Scene 03 Architecture -> Scene 04 Laptop Screen) ================= */}
      {transitionOpacity > 0.01 && (
        <group>
          {/* Transition connecting path */}
          <Line
            points={[SCENE_04_ANCHORS.architectureSource, SCENE_04_ANCHORS.laptopScreenTarget]}
            color={SCENE_04_COLORS.accentCyan}
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
              color={SCENE_04_COLORS.accentCyan}
              transparent
              opacity={transitionOpacity * 0.9}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
export default Scene04Projects;
