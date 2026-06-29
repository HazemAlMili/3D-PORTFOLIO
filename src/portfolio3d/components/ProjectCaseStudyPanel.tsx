import { Text } from "@react-three/drei";
import type { ProjectEntry } from "../content/types";
import { SCENE_04_COLORS } from "../constants/scene04Config";

interface ProjectCaseStudyPanelProps {
  project: ProjectEntry;
  opacity: number;
  projectCount: number;
  activeIndex: number;
}

const GOLD_COLOR = "#D8A84F";

export function ProjectCaseStudyPanel({
  project,
  opacity,
  projectCount,
  activeIndex,
}: ProjectCaseStudyPanelProps) {
  // Common text props
  const baseTextProps = {
    font: undefined, // uses default Drei font
    anchorX: "left" as const,
    anchorY: "middle" as const,
    fillOpacity: opacity,
  };

  // Y layout positions
  const titleY = 0.85;
  const descY = 0.65;
  
  const colLeftX = -1.65;
  const colRightX = 0.35;

  return (
    <group position={[0, 0, 0]}>
      {/* ───────────────────────────────────────────────────────────────────────
          LEFT COLUMN — Title, Subtitle, Problem, Solution
          ─────────────────────────────────────────────────────────────────────── */}
      {/* Project Title */}
      <Text
        {...baseTextProps}
        position={[colLeftX, titleY, 0]}
        fontSize={0.13}
        color={SCENE_04_COLORS.textPrimary}
        maxWidth={1.9}
      >
        {project.title}
      </Text>

      {/* One line description */}
      <Text
        {...baseTextProps}
        position={[colLeftX, descY, 0]}
        fontSize={0.065}
        color={SCENE_04_COLORS.accentCyan}
        maxWidth={1.9}
      >
        {project.oneLineDescription}
      </Text>

      {/* Horizontal divider line under title area */}
      <mesh position={[colLeftX + 0.95, 0.52, 0]}>
        <planeGeometry args={[1.9, 0.003]} />
        <meshBasicMaterial
          color={SCENE_04_COLORS.accentCyan}
          transparent
          opacity={opacity * 0.3}
        />
      </mesh>

      {/* PROBLEM Section */}
      <Text
        {...baseTextProps}
        position={[colLeftX, 0.35, 0]}
        fontSize={0.06}
        color={GOLD_COLOR}
        maxWidth={1.9}
      >
        PROBLEM
      </Text>
      <Text
        {...baseTextProps}
        position={[colLeftX, 0.12, 0]}
        fontSize={0.052}
        color={SCENE_04_COLORS.textSecondary}
        lineHeight={1.4}
        maxWidth={1.9}
      >
        {project.problem}
      </Text>

      {/* SOLUTION / BUILT Section */}
      <Text
        {...baseTextProps}
        position={[colLeftX, -0.15, 0]}
        fontSize={0.06}
        color={GOLD_COLOR}
        maxWidth={1.9}
      >
        IMPLEMENTATION
      </Text>
      <Text
        {...baseTextProps}
        position={[colLeftX, -0.38, 0]}
        fontSize={0.052}
        color={SCENE_04_COLORS.textSecondary}
        lineHeight={1.4}
        maxWidth={1.9}
      >
        {project.built}
      </Text>

      {/* Links representation */}
      <group position={[colLeftX, -0.68, 0]}>
        <Text
          {...baseTextProps}
          position={[0, 0, 0]}
          fontSize={0.05}
          color={SCENE_04_COLORS.accentCyan}
        >
          {project.githubUrl ? "CODE: GITHUB" : "CODE: RESTRICTED"}
        </Text>
        <Text
          {...baseTextProps}
          position={[0.9, 0, 0]}
          fontSize={0.05}
          color={project.liveUrl ? SCENE_04_COLORS.accentCyan : SCENE_04_COLORS.textSecondary}
        >
          {project.liveUrl ? "LIVE: ONLINE" : "LIVE: INTERNAL"}
        </Text>
      </group>

      {/* Vertical separation boundary line */}
      <mesh position={[0.15, 0.08, 0]}>
        <planeGeometry args={[0.003, 1.7]} />
        <meshBasicMaterial
          color={SCENE_04_COLORS.accentCyan}
          transparent
          opacity={opacity * 0.15}
        />
      </mesh>

      {/* ───────────────────────────────────────────────────────────────────────
          RIGHT COLUMN — Tech Stack, Architecture Note, Result
          ─────────────────────────────────────────────────────────────────────── */}
      {/* Tech Stack Header */}
      <Text
        {...baseTextProps}
        position={[colRightX, titleY, 0]}
        fontSize={0.06}
        color={SCENE_04_COLORS.accentCyan}
        maxWidth={1.3}
      >
        TECHNOLOGY STACK
      </Text>
      <Text
        {...baseTextProps}
        position={[colRightX, 0.58, 0]}
        fontSize={0.052}
        color={SCENE_04_COLORS.textPrimary}
        lineHeight={1.5}
        maxWidth={1.3}
      >
        {project.stack.join(" · ")}
      </Text>

      {/* Architecture Note Header */}
      <Text
        {...baseTextProps}
        position={[colRightX, 0.22, 0]}
        fontSize={0.06}
        color={SCENE_04_COLORS.accentCyan}
        maxWidth={1.3}
      >
        ARCHITECTURE
      </Text>
      <Text
        {...baseTextProps}
        position={[colRightX, 0.02, 0]}
        fontSize={0.052}
        color={SCENE_04_COLORS.textSecondary}
        lineHeight={1.4}
        maxWidth={1.3}
      >
        {project.architectureNote}
      </Text>

      {/* Result Header */}
      <Text
        {...baseTextProps}
        position={[colRightX, -0.28, 0]}
        fontSize={0.06}
        color={GOLD_COLOR}
        maxWidth={1.3}
      >
        OUTCOME & IMPACT
      </Text>
      <Text
        {...baseTextProps}
        position={[colRightX, -0.48, 0]}
        fontSize={0.052}
        color={SCENE_04_COLORS.textPrimary}
        lineHeight={1.4}
        maxWidth={1.3}
      >
        {project.result}
      </Text>

      {/* ───────────────────────────────────────────────────────────────────────
          DOT INDICATORS & INSTRUCTION
          ─────────────────────────────────────────────────────────────────────── */}
      <group position={[0, -0.98, 0]}>
        {/* Pagination Dots */}
        <group position={[0, 0, 0]}>
          {Array.from({ length: projectCount }).map((_, idx) => (
            <mesh key={idx} position={[(idx - (projectCount - 1) / 2) * 0.12, 0, 0]}>
              <circleGeometry args={[idx === activeIndex ? 0.02 : 0.01, 12]} />
              <meshBasicMaterial
                color={idx === activeIndex ? SCENE_04_COLORS.accentCyan : SCENE_04_COLORS.textSecondary}
                transparent
                opacity={opacity * (idx === activeIndex ? 0.9 : 0.3)}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
