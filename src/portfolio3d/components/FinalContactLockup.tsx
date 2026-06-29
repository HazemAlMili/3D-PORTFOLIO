import { Text, Line } from "@react-three/drei";
import { SCENE_08_COLORS, SCENE_08_LAYOUT } from "../constants/scene08Config";
import { CONTACT_DATA } from "../content/contactData";

export function FinalContactLockup() {
  const name = CONTACT_DATA.developerName || "Developer Name";
  const role = CONTACT_DATA.developerRole || "Full-Stack Developer";

  // Coordinates of the horizontal divider line
  const dividerPoints: [number, number, number][] = [
    [-0.8, 0, 0],
    [0.8, 0, 0],
  ];

  return (
    <group position={[0, 0, 0.05]}>
      {/* 1. Developer Name */}
      <Text
        position={SCENE_08_LAYOUT.namePos}
        fontSize={0.24}
        color={SCENE_08_COLORS.textPrimary}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.03}
      >
        {name}
      </Text>

      {/* 2. Developer Role / Title */}
      <Text
        position={SCENE_08_LAYOUT.rolePos}
        fontSize={0.09}
        color={SCENE_08_COLORS.textSecondary}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {role.toUpperCase()}
      </Text>

      {/* 3. Sleek Divider Line */}
      <group position={SCENE_08_LAYOUT.dividerPos}>
        <Line
          points={dividerPoints}
          color={SCENE_08_COLORS.accentCyan}
          lineWidth={1.2}
          transparent
          opacity={0.4}
        />
        {/* Subtle center node dot on divider */}
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.015, 8]} />
          <meshBasicMaterial color={SCENE_08_COLORS.accentCyan} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* 4. Headline */}
      <Text
        position={SCENE_08_LAYOUT.titlePos}
        fontSize={0.16}
        color={SCENE_08_COLORS.textPrimary}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={2.8}
        textAlign="center"
      >
        {CONTACT_DATA.headline}
      </Text>

      {/* 5. Intro Description */}
      {CONTACT_DATA.intro && (
        <Text
          position={SCENE_08_LAYOUT.introPos}
          fontSize={0.08}
          color={SCENE_08_COLORS.textSecondary}
          maxWidth={2.6}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          lineHeight={1.45}
        >
          {CONTACT_DATA.intro}
        </Text>
      )}

      {/* 6. Primary CTA Link */}
      <Text
        position={SCENE_08_LAYOUT.primaryPos}
        fontSize={0.085}
        color={SCENE_08_COLORS.accentCyan}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.02}
      >
        {`[ ${CONTACT_DATA.primaryCta.label} ]`}
      </Text>

      {/* 7. Secondary horizontal links */}
      <group position={SCENE_08_LAYOUT.linksPos}>
        {CONTACT_DATA.secondaryLinks.map((link, i) => {
          // Calculate spacing based on number of items (4 items total)
          const offsetCount = CONTACT_DATA.secondaryLinks.length - 1;
          const spacing = 0.72;
          const xPos = (i - offsetCount / 2) * spacing;

          // Color coded: red/muted if missing, otherwise textSecondary
          const linkColor =
            link.status === "missing" ? "#7A828E" : SCENE_08_COLORS.textSecondary;
          
          const labelWithStatus =
            link.status === "missing" ? `${link.label} (n/a)` : link.label;

          return (
            <Text
              key={link.id}
              position={[xPos, 0, 0]}
              fontSize={0.055}
              color={linkColor}
              anchorX="center"
              anchorY="middle"
              fillOpacity={link.status === "missing" ? 0.45 : 0.8}
            >
              {labelWithStatus}
            </Text>
          );
        })}
      </group>
    </group>
  );
}

export default FinalContactLockup;
