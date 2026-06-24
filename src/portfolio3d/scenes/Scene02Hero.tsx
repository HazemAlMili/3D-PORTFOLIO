// scenes/Scene02Hero.tsx
// T4.3 — Screen UI overlay and identity typography layers implemented inside screenContentAnchor.
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import { Text } from "@react-three/drei";
import { CodeFragment, DataLines, BootIndicator } from "../components/background";
import { CODE_FRAGMENTS } from "../constants/backgroundConfig";
import { usePortfolioStore } from "../store/portfolioStore";

interface Scene02HeroProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// MainDisplay — Three.js JSX geometry matching the mainDisplay.glb geometry spec
// ─────────────────────────────────────────────────────────────────────────────
function MainDisplay() {
  return (
    <group>
      {/* Bezel body — dark graphite box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 3, 0.3]} />
        <meshStandardMaterial
          color="#0B0F14"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Screen panel — emissive deep blue */}
      <mesh position={[0, 0, 0.165]}>
        <planeGeometry args={[3.6, 2.6]} />
        <meshStandardMaterial
          color="#04090F"
          emissive="#081A2A"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Subtle rim light strip — accent edge on top */}
      <mesh position={[0, 1.52, 0]}>
        <boxGeometry args={[4.02, 0.04, 0.32]} />
        <meshStandardMaterial
          color="#38D6FF"
          emissive="#38D6FF"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Easing and Helper Utilities
// ─────────────────────────────────────────────────────────────────────────────
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Helper to recursively update opacity of children meshes (such as Drei Text meshes)
const setMeshOpacity = (node: Object3D, opacity: number) => {
  if (node instanceof Mesh) {
    const material = node.material;
    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = opacity;
    });
  }
  if (node.children) {
    node.children.forEach((child) => setMeshOpacity(child, opacity));
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene02Hero — outer shell with animation + layout anchors
// ─────────────────────────────────────────────────────────────────────────────
export function Scene02Hero({ sceneId, sceneIndex, localProgress }: Scene02HeroProps) {
  const rootGroupRef = useRef<Group>(null);
  const displayAnchorRef = useRef<Group>(null);
  const screenContentAnchorRef = useRef<Group>(null);
  const backgroundAnchorRef = useRef<Group>(null);

  // Refs for each typography group to animate them individually
  const nameRef = useRef<Group>(null);
  const roleRef = useRef<Group>(null);
  const valueRef = useRef<Group>(null);
  const ctaLeftRef = useRef<Group>(null);
  const ctaRightRef = useRef<Group>(null);

  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const deviceTier = usePortfolioStore((state) => state.deviceTier);
  const shouldRenderStatic = reducedMotion === true || deviceTier === "low";

  // Structural scaling + settle animation driven by localProgress sub-phases
  // Sub-phase boundaries match scrollSegments.ts (P2.P3.RECOVERY.01 calibration):
  //   approach: 0.00-0.35 | enter: 0.35-0.55 | immerse: 0.55-0.85 | exit: 0.85-1.00
  useFrame(() => {
    if (shouldRenderStatic) return;
    const p = localProgress;

    // ── Display anchor: sub-phase scale + vertical settle ──────────────────
    const displayGroup = displayAnchorRef.current;
    if (displayGroup) {
      let scale = 1;
      if (p < 0.35) {
        // Approach: linear grow 0.6 → 1.0
        scale = 0.6 + 0.4 * (p / 0.35);
      } else if (p < 0.55) {
        // Enter: overshoot-settle via dampened sin curve
        const ep = (p - 0.35) / 0.2;
        scale = 1 + 0.05 * Math.sin(ep * Math.PI * 2) * (1 - ep);
      } else if (p < 0.85) {
        // Immerse: hold at 1.0
        scale = 1;
      } else {
        // Exit: slight pullback 1.0 → 0.95
        scale = 1 - 0.05 * ((p - 0.85) / 0.15);
      }
      displayGroup.scale.setScalar(scale);
      // Organic vertical settle damped by overall progress
      displayGroup.position.y = -0.02 * Math.sin(p * 15) * (1 - p);
    }

    // ── Typography visibility and transitions ─────────────────────────────
    const typographyVisible = p > 0.45 && p < 0.8;
    const exitPhase = p >= 0.8;
    const typographyGroups = [nameRef, roleRef, valueRef, ctaLeftRef, ctaRightRef];

    typographyGroups.forEach((ref) => {
      if (ref.current) {
        if (typographyVisible) {
          // Enter/Immerse phase: fade in and settle
          const enterProgress = Math.min(1, (p - 0.45) / 0.15);
          const eased = easeOutCubic(enterProgress);
          ref.current.visible = true;
          ref.current.scale.setScalar(0.8 + 0.2 * eased);
          ref.current.position.y = -0.3 * (1 - eased);
          setMeshOpacity(ref.current, eased);
        } else if (exitPhase) {
          // Exit phase: fade out and slide out
          const exitProgress = Math.min(1, (p - 0.8) / 0.2);
          const eased = easeOutCubic(exitProgress);
          ref.current.scale.setScalar(1.0 - 0.3 * eased);
          ref.current.position.y = -0.3 * eased;
          setMeshOpacity(ref.current, 1 - eased);
          if (eased >= 0.95) {
            ref.current.visible = false;
          }
        } else {
          ref.current.visible = false;
          setMeshOpacity(ref.current, 0);
        }
      }
    });

    // ── Screen mesh opacity sync ──────────────────────────────────────────
    const screenMesh = screenContentAnchorRef.current?.children[0] as Mesh;
    if (screenMesh && screenMesh.material) {
      const material = screenMesh.material as MeshStandardMaterial;
      if (typographyVisible) {
        const enterProgress = Math.min(1, (p - 0.45) / 0.15);
        material.opacity = 0.5 + 0.4 * enterProgress;
      } else if (exitPhase) {
        const exitProgress = Math.min(1, (p - 0.8) / 0.2);
        material.opacity = 0.9 - 0.5 * exitProgress;
      } else {
        material.opacity = 0.5;
      }
    }

    // ── Screen Content Group: vertical Z-depth transition ──────────────────
    const screenGroup = screenContentAnchorRef.current;
    if (screenGroup) {
      const active = p > 0.45;
      screenGroup.visible = active;
      if (active) {
        if (p < 0.8) {
          const enterProgress = Math.min(1, (p - 0.45) / 0.15);
          const eased = easeOutCubic(enterProgress);
          screenGroup.position.z = 0.17 + 0.02 * (1 - eased);
        } else {
          const exitProgress = Math.min(1, (p - 0.8) / 0.2);
          const eased = easeOutCubic(exitProgress);
          screenGroup.position.z = 0.17 - 0.02 * eased;
        }
      }
    }

    // ── Background: slow Y rotation ────────────────────────────────────────
    const bgGroup = backgroundAnchorRef.current;
    if (bgGroup) {
      bgGroup.rotation.y = p * 0.5;
    }
  });

  return (
    <group
      ref={rootGroupRef}
      position={[0, 0, 0]}
      userData={{ sceneId, sceneIndex }}
    >
      {/* Anchor for main display device */}
      <group ref={displayAnchorRef} position={[0, 0, 0]}>
        <MainDisplay />
      </group>

      {/* Screen portal content anchor */}
      <group ref={screenContentAnchorRef} position={[0, 0, 0.17]}>
        {/* Screen surface mesh (acts as background/portal for text) */}
        <mesh>
          <planeGeometry args={[3.6, 2.6]} />
          <meshStandardMaterial
            color="#05070A"
            emissive="#081A2A"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>

        {/* Typography layers */}
        <group ref={nameRef} position={[0, 0, 0]}>
          <Text
            position={[0, 0.8, 0.01]}
            fontSize={0.6}
            color="#F4F7FA"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            FULL_NAME_PENDING
          </Text>
        </group>

        <group ref={roleRef} position={[0, 0, 0]}>
          <Text
            position={[0, 0.3, 0.01]}
            fontSize={0.35}
            color="#38D6FF"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            Full Stack Developer
          </Text>
        </group>

        <group ref={valueRef} position={[0, 0, 0]}>
          <Text
            position={[0, -0.2, 0.01]}
            fontSize={0.25}
            color="#A7B0BC"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.2}
            textAlign="center"
          >
            Building systems that feel as good as they work
          </Text>
        </group>

        <group ref={ctaLeftRef} position={[0, 0, 0]}>
          <Text
            position={[-0.8, -0.8, 0.01]}
            fontSize={0.2}
            color="#2F80ED"
            anchorX="center"
            anchorY="middle"
          >
            View Projects
          </Text>
        </group>

        <group ref={ctaRightRef} position={[0, 0, 0]}>
          <Text
            position={[0.8, -0.8, 0.01]}
            fontSize={0.2}
            color="#F4F7FA"
            anchorX="center"
            anchorY="middle"
          >
            Contact Me
          </Text>
        </group>
      </group>

      {/* Background system elements — minimal floating accent nodes & data lines/code fragments */}
      <group ref={backgroundAnchorRef} position={[0, 0, -0.5]}>
        {[-1.8, -0.9, 0, 0.9, 1.8].map((x, i) => (
          <mesh key={i} position={[x, -1.8, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#38D6FF"
              emissive="#38D6FF"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* Data Lines - rendered first (furthest back) */}
        <DataLines nodeCount={12} lineOpacity={0.08} color="#00B4D8" />
        
        {/* Floating Code Fragments */}
        {CODE_FRAGMENTS.map((f, idx) => (
          <CodeFragment
            key={idx}
            content={f.content}
            position={f.pos}
            color="#D4AF37" // Gold
            opacity={0.15 + (idx % 3) * 0.05}
          />
        ))}
        
        {/* Boot Indicator - rendered on top */}
        <BootIndicator />
      </group>
    </group>
  );
}
