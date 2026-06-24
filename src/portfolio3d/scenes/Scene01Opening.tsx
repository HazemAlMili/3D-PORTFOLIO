import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text, Html } from "@react-three/drei";
import { Group, RingGeometry, MeshBasicMaterial, Mesh, Color, DoubleSide } from "three";
import type { GLTF } from "three-stdlib";
import { usePortfolioStore } from "../store/portfolioStore";
import "./Scene01Opening.css";

interface Scene01OpeningProps {
  sceneId: string;
  sceneIndex: number;
  localProgress: number;
}

// Easing function for smooth reveal
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Fallback component for loading/error states
function FallbackMesh({ color = "#333", size = 1 }: { color?: string; size?: number }) {
  return (
    <mesh>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Static Reduced-Motion Variant Component
function Scene01OpeningStatic() {
  let logoGltf: GLTF | null = null;
  let displayGltf: GLTF | null = null;

  /* eslint-disable react-hooks/rules-of-hooks */
  try {
    logoGltf = useGLTF("/assets/scene-01/logo.glb") as unknown as GLTF;
    displayGltf = useGLTF("/assets/scene-01/display.glb") as unknown as GLTF;
  } catch (error) {
    console.warn("Failed to load static GLTF assets for Scene 01:", error);
  }
  /* eslint-enable react-hooks/rules-of-hooks */

  // Material refinement for static logo
  useEffect(() => {
    if (logoGltf) {
      logoGltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ('color' in mat) mat.color = new Color("#F4F7FA");
              if ('metalness' in mat) mat.metalness = 0.1;
              if ('roughness' in mat) mat.roughness = 0.4;
            });
          } else if (material) {
            if ('color' in material) material.color = new Color("#F4F7FA");
            if ('metalness' in material) material.metalness = 0.1;
            if ('roughness' in material) material.roughness = 0.4;
          }
        }
      });
    }
  }, [logoGltf]);

  // Material refinement for static display
  useEffect(() => {
    if (displayGltf) {
      displayGltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ('color' in mat) mat.color = new Color("#0B0F14");
              if ('metalness' in mat) mat.metalness = 0.8;
              if ('roughness' in mat) mat.roughness = 0.2;
            });
          } else if (material) {
            if ('color' in material) material.color = new Color("#0B0F14");
            if ('metalness' in material) material.metalness = 0.8;
            if ('roughness' in material) material.roughness = 0.2;
          }
        }
      });
    }
  }, [displayGltf]);

  return (
    <>
      {/* Logo at final position (no animation) */}
      <group position={[0, -0.5, 0.5]} scale={1}>
        {logoGltf ? (
          <primitive object={logoGltf.scene} scale={1} position={[0, 0, 0]} />
        ) : (
          <FallbackMesh color="#F4F7FA" size={1.5} />
        )}
        <Text
          position={[0, -1.2, 0.1]}
          fontSize={0.4}
          color="#F4F7FA"
          anchorX="center"
          anchorY="middle"
        >
          Full Stack Developer
        </Text>
        <Text
          position={[0, -1.8, 0.1]}
          fontSize={0.2}
          color="#A7B0BC"
          anchorX="center"
          anchorY="middle"
        >
          Systems · APIs · Performance
        </Text>
      </group>

      {/* Display at final position (no animation) */}
      <group position={[0, -0.8, 1.5]} scale={1}>
        {displayGltf ? (
          <primitive object={displayGltf.scene} scale={1} position={[0, 0, 0]} />
        ) : (
          <FallbackMesh color="#0B0F14" size={3} />
        )}
      </group>
    </>
  );
}

// Full Animated Variant Component
function Scene01OpeningAnimated({ localProgress }: { localProgress: number }) {
  const sealAnchorRef = useRef<Group>(null);
  const codeFragmentsAnchorRef = useRef<Group>(null);
  const logoAnchorRef = useRef<Group>(null);
  const displayAnchorRef = useRef<Group>(null);
  const rippleRingRef = useRef<Mesh>(null);
  const typoText1Ref = useRef<Mesh>(null);
  const typoText2Ref = useRef<Mesh>(null);

  // Create ripple ring geometry and material
  const ringGeometry = useMemo(() => new RingGeometry(0.8, 1.2, 32), []);
  const ringMaterial = useMemo(() => 
    new MeshBasicMaterial({ 
      color: new Color("#38D6FF"), 
      transparent: true, 
      opacity: 0,
      side: DoubleSide
    }), 
  []);

  // Load GLTF assets with error handling
  let sealGltf: GLTF | null = null;
  let fragmentsGltf: GLTF | null = null;
  let logoGltf: GLTF | null = null;
  let displayGltf: GLTF | null = null;

  /* eslint-disable react-hooks/rules-of-hooks */
  try {
    sealGltf = useGLTF("/assets/scene-01/seal.glb") as unknown as GLTF;
    fragmentsGltf = useGLTF("/assets/scene-01/codeFragments.glb") as unknown as GLTF;
    logoGltf = useGLTF("/assets/scene-01/logo.glb") as unknown as GLTF;
    displayGltf = useGLTF("/assets/scene-01/display.glb") as unknown as GLTF;
  } catch (error) {
    console.warn("Failed to load GLTF assets for Scene 01:", error);
  }
  /* eslint-enable react-hooks/rules-of-hooks */

  // Material refinement for animated seal
  useEffect(() => {
    if (sealGltf) {
      sealGltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ('color' in mat) mat.color = new Color("#D8A84F");
              if ('metalness' in mat) mat.metalness = 0.7;
              if ('roughness' in mat) mat.roughness = 0.3;
            });
          } else if (material) {
            if ('color' in material) material.color = new Color("#D8A84F");
            if ('metalness' in material) material.metalness = 0.7;
            if ('roughness' in material) material.roughness = 0.3;
          }
        }
      });
    }
  }, [sealGltf]);

  // Material refinement for animated code fragments
  useEffect(() => {
    if (fragmentsGltf) {
      fragmentsGltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ('color' in mat) mat.color = new Color("#38D6FF");
              if ('emissive' in mat) {
                mat.emissive = new Color("#38D6FF");
                mat.emissiveIntensity = 0.2;
              }
            });
          } else if (material) {
            if ('color' in material) material.color = new Color("#38D6FF");
            if ('emissive' in material) {
              material.emissive = new Color("#38D6FF");
              material.emissiveIntensity = 0.2;
            }
          }
        }
      });
    }
  }, [fragmentsGltf]);

  // Material refinement for animated logo
  useEffect(() => {
    if (logoGltf) {
      logoGltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ('color' in mat) mat.color = new Color("#F4F7FA");
              if ('metalness' in mat) mat.metalness = 0.1;
              if ('roughness' in mat) mat.roughness = 0.4;
            });
          } else if (material) {
            if ('color' in material) material.color = new Color("#F4F7FA");
            if ('metalness' in material) material.metalness = 0.1;
            if ('roughness' in material) material.roughness = 0.4;
          }
        }
      });
    }
  }, [logoGltf]);

  // Material refinement for animated display
  useEffect(() => {
    if (displayGltf) {
      displayGltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ('color' in mat) mat.color = new Color("#0B0F14");
              if ('metalness' in mat) mat.metalness = 0.8;
              if ('roughness' in mat) mat.roughness = 0.2;
            });
          } else if (material) {
            if ('color' in material) material.color = new Color("#0B0F14");
            if ('metalness' in material) material.metalness = 0.8;
            if ('roughness' in material) material.roughness = 0.2;
          }
        }
      });
    }
  }, [displayGltf]);

  // Update visibility and transforms based on progress
  useFrame(() => {
    const p = localProgress;

    // === SEAL IMPACT ANIMATION ===
    const sealGroup = sealAnchorRef.current;
    if (sealGroup) {
      // Impact window: 0.0 to 0.35
      // Impact peak at ~0.12
      const sealVisible = p < 0.35;
      sealGroup.visible = sealVisible;

      if (sealVisible) {
        // Normalize progress within the seal window
        const sealProgress = p / 0.35; // 0 to 1 across the seal window
        
        // Impact peak occurs at ~0.12 / 0.35 ≈ 0.34 into the seal window
        const impactPoint = 0.34;
        const impactWindow = 0.3; // Width of the impact effect
        const impactProgress = Math.max(0, Math.min(1, (sealProgress - (impactPoint - impactWindow/2)) / impactWindow));
        
        // Base scale (slight approach)
        const baseScale = 0.8 + sealProgress * 0.2;
        
        // Impact effect: compression + bounce
        let impactScale = 1;
        if (impactProgress > 0 && impactProgress < 1) {
          // Spring-like impact: compress, then overshoot, then settle
          const t = impactProgress;
          // Compression phase (0-0.3): scale down
          if (t < 0.3) {
            const compression = 1 - (t / 0.3) * 0.3; // Scale down to 0.7
            impactScale = compression;
          }
          // Bounce phase (0.3-1.0): spring back with overshoot
          else {
            const bounceT = (t - 0.3) / 0.7;
            // Simple spring: overshoot to 1.15, then settle to 1
            const spring = 1 + 0.15 * Math.sin(bounceT * Math.PI * 1.5) * Math.exp(-bounceT * 3);
            impactScale = Math.max(0.7, Math.min(1.15, spring));
          }
        }
        
        // Final scale = base approach * impact effect
        const finalScale = baseScale * impactScale;
        sealGroup.scale.set(finalScale, finalScale, finalScale);
        
        // Rotation: slightly tilt on impact
        const tilt = Math.sin(p * 30) * 0.05 * (1 - sealProgress);
        sealGroup.rotation.x = tilt;
        sealGroup.rotation.z = tilt * 0.5;
        
        // Position: slight bounce on impact
        const bounceY = Math.sin(p * 25) * 0.15 * (1 - sealProgress) * Math.exp(-sealProgress * 4);
        sealGroup.position.y = 0.5 + bounceY;
        
        // === RIPPLE TRIGGER ===
        // Activate ripple on impact (around 0.12)
        const rippleActive = Math.abs(p - 0.12) < 0.05;
        if (rippleActive) {
          const rippleProgress = (p - 0.12) / 0.05; // 0 to 1 across ripple
          // Ripple ring scaling
          if (rippleRingRef.current) {
            const ringScale = 1 + rippleProgress * 2;
            rippleRingRef.current.scale.set(ringScale, ringScale, ringScale);
            const opacity = 1 - rippleProgress;
            (rippleRingRef.current.material as MeshBasicMaterial).opacity = opacity;
          }
        } else {
          // Reset ripple
          if (rippleRingRef.current) {
            rippleRingRef.current.scale.set(1, 1, 1);
            (rippleRingRef.current.material as MeshBasicMaterial).opacity = 0;
          }
        }
      } else {
        // Reset seal when hidden
        sealGroup.scale.set(1, 1, 1);
        sealGroup.rotation.set(0, 0, 0);
        sealGroup.position.y = 0.5;
      }
    }

    // Code fragments: visible in mid-progress (0.2–0.5)
    const fragmentsGroup = codeFragmentsAnchorRef.current;
    if (fragmentsGroup) {
      const fragmentsVisible = p > 0.15 && p < 0.55;
      fragmentsGroup.visible = fragmentsVisible;
      if (fragmentsVisible && fragmentsGroup.children.length > 0) {
        fragmentsGroup.rotation.y = p * 3;
        fragmentsGroup.position.y = Math.sin(p * 15) * 0.2;
      }
    }

    // === LOGO REVEAL ANIMATION ===
    const logoGroup = logoAnchorRef.current;
    if (logoGroup) {
      const logoVisible = p > 0.4 && p < 0.7;
      logoGroup.visible = logoVisible;

      if (logoVisible) {
        // Normalize progress within the logo window (0.4 to 0.7)
        const logoProgress = Math.max(0, Math.min(1, (p - 0.4) / 0.3));
        
        // Ease the progress for a smooth reveal
        const eased = easeOutQuart(logoProgress);
        
        // Scale: start at 0.3, grow to 1.0
        const scale = 0.3 + (1 - 0.3) * eased;
        logoGroup.scale.set(scale, scale, scale);
        
        // Opacity: if the logo has materials that support opacity
        logoGroup.children.forEach((child) => {
          if (child instanceof Mesh) {
            const material = child.material;
            if (Array.isArray(material)) {
              material.forEach((mat) => {
                mat.transparent = true;
                mat.opacity = eased;
              });
            } else if (material) {
              material.transparent = true;
              material.opacity = eased;
            }
          }
        });

        // Set typography text opacities
        if (typoText1Ref.current && typoText1Ref.current.material) {
          const mat = typoText1Ref.current.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              m.transparent = true;
              m.opacity = eased;
            });
          } else {
            mat.transparent = true;
            mat.opacity = eased;
          }
        }
        if (typoText2Ref.current && typoText2Ref.current.material) {
          const mat = typoText2Ref.current.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              m.transparent = true;
              m.opacity = eased;
            });
          } else {
            mat.transparent = true;
            mat.opacity = eased;
          }
        }
        
        // Position: subtle slide-up
        const yOffset = -0.3 + 0.3 * eased;
        logoGroup.position.y = -0.5 + yOffset;
        
        // Rotation: subtle settling
        const rotationSettle = (1 - eased) * 0.05;
        logoGroup.rotation.z = rotationSettle;
      } else {
        // Reset when hidden
        logoGroup.scale.set(1, 1, 1);
        logoGroup.position.y = -0.5;
        logoGroup.rotation.z = 0;
        if (typoText1Ref.current && typoText1Ref.current.material) {
          const mat = typoText1Ref.current.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              m.opacity = 0;
            });
          } else {
            mat.opacity = 0;
          }
        }
        if (typoText2Ref.current && typoText2Ref.current.material) {
          const mat = typoText2Ref.current.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              m.opacity = 0;
            });
          } else {
            mat.opacity = 0;
          }
        }
      }
    }

    // === DISPLAY PULLBACK ANIMATION ===
    const displayGroup = displayAnchorRef.current;
    if (displayGroup) {
      const displayVisible = p > 0.6;
      displayGroup.visible = displayVisible;

      if (displayVisible) {
        // Normalize progress within the display window (0.6 to 1.0)
        const displayProgress = Math.max(0, Math.min(1, (p - 0.6) / 0.4));
        
        // Ease the progress for a smooth pullback
        const eased = easeOutCubic(displayProgress);
        
        // === SCALE: Start zoomed in (1.5), pull back to 1.0 ===
        const startScale = 1.5;
        const endScale = 1.0;
        const scale = startScale + (endScale - startScale) * eased;
        displayGroup.scale.set(scale, scale, scale);
        
        // === POSITION: Start close (Z=0.2), pull back to Z=1.5 ===
        const startZ = 0.2;
        const endZ = 1.5;
        const z = startZ + (endZ - startZ) * eased;
        displayGroup.position.z = z;
        
        // === POSITION: Slight vertical settling ===
        const startY = -0.2;
        const endY = -0.8;
        const y = startY + (endY - startY) * eased;
        displayGroup.position.y = y;
        
        // === ROTATION: Slight tilt correction ===
        const startRotX = 0.05;
        const endRotX = 0;
        const rotX = startRotX + (endRotX - startRotX) * eased;
        displayGroup.rotation.x = rotX;
        
        const startRotY = 0.03;
        const endRotY = 0;
        const rotY = startRotY + (endRotY - startRotY) * eased;
        displayGroup.rotation.y = rotY;
        
        // === OPACITY: Fade in from 0.3 to 1.0 ===
        displayGroup.children.forEach((child) => {
          if (child instanceof Mesh) {
            const material = child.material;
            const opacityStart = 0.3;
            const opacityEnd = 1.0;
            const opacity = opacityStart + (opacityEnd - opacityStart) * eased;
            if (Array.isArray(material)) {
              material.forEach((mat) => {
                mat.transparent = true;
                mat.opacity = Math.min(1, opacity);
              });
            } else if (material) {
              material.transparent = true;
              material.opacity = Math.min(1, opacity);
            }
          }
        });
      } else {
        // Reset when hidden
        displayGroup.scale.set(1, 1, 1);
        displayGroup.position.set(0, -0.8, 1.5);
        displayGroup.rotation.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      {/* Anchor for seal/stamp object */}
      <group ref={sealAnchorRef} position={[0, 0.5, 0]}>
        {sealGltf ? (
          <primitive object={sealGltf.scene} scale={1} position={[0, 0, 0]} />
        ) : (
          <FallbackMesh color="#D8A84F" size={1.2} />
        )}
        {/* Ripple ring overlay */}
        <mesh ref={rippleRingRef} geometry={ringGeometry} material={ringMaterial} position={[0, 0, 0.01]} />
      </group>

      {/* Anchor for code/data fragments */}
      <group ref={codeFragmentsAnchorRef} position={[0, 0, 0]}>
        {fragmentsGltf ? (
          <primitive object={fragmentsGltf.scene} scale={1} position={[0, 0, 0]} />
        ) : (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 1.2;
              return (
                <group
                  key={i}
                  position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 0.3, Math.sin(angle) * radius]}
                >
                  <FallbackMesh
                    color="#38D6FF"
                    size={0.3}
                  />
                </group>
              );
            })}
          </>
        )}
      </group>

      {/* Anchor for logo reveal */}
      <group ref={logoAnchorRef} position={[0, -0.5, 0.5]}>
        {logoGltf ? (
          <primitive object={logoGltf.scene} scale={1} position={[0, 0, 0]} />
        ) : (
          <FallbackMesh color="#F4F7FA" size={1.5} />
        )}
        {/* Typography overlay */}
        <Text
          ref={typoText1Ref}
          position={[0, -1.2, 0.1]}
          fontSize={0.4}
          color="#F4F7FA"
          anchorX="center"
          anchorY="middle"
        >
          Full Stack Developer
        </Text>
        <Text
          ref={typoText2Ref}
          position={[0, -1.8, 0.1]}
          fontSize={0.2}
          color="#A7B0BC"
          anchorX="center"
          anchorY="middle"
        >
          Systems · APIs · Performance
        </Text>
      </group>

      {/* Anchor for main display device */}
      <group ref={displayAnchorRef} position={[0, -0.8, 1.5]}>
        {displayGltf ? (
          <primitive object={displayGltf.scene} scale={1} position={[0, 0, 0]} />
        ) : (
          <FallbackMesh color="#0B0F14" size={3} />
        )}
      </group>
    </>
  );
}

// Parent controller component that manages lights, skip buttons, timer, and variant routing
export function Scene01Opening({ localProgress }: Scene01OpeningProps) {
  const rootGroupRef = useRef<Group>(null);
  const hasAdvancedRef = useRef(false);
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);

  // Auto-advance after 10s of inactivity if not scrolled past Scene 01
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAdvancedRef.current && localProgress < 0.09) {
        const targetProgress = 0.09; // Start of Scene 02
        usePortfolioStore.getState().setScrollProgress(targetProgress);
        hasAdvancedRef.current = true;
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [localProgress]);

  const handleSkipIntro = () => {
    const targetProgress = 0.09; // Start of Scene 02
    usePortfolioStore.getState().setScrollProgress(targetProgress);
    hasAdvancedRef.current = true;
  };

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* Basic Studio Lighting Environment */}
      <ambientLight intensity={0.3} color="#1E2A33" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#F4F7FA" />
      <directionalLight position={[-3, 2, 4]} intensity={0.4} color="#38D6FF" />
      <pointLight position={[0, 3, 2]} intensity={0.3} color="#2F80ED" />

      {/* Skip-Intro Button Overlay */}
      {localProgress < 0.9 && (
        <Html position={[0, 0, 0]} center>
          <button
            className="skip-intro-button"
            onClick={handleSkipIntro}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSkipIntro(); }}
            aria-label="Skip intro and go to hero section"
          >
            Skip Intro ⏭
          </button>
        </Html>
      )}

      {/* Route to Animated or Static Variant */}
      {reducedMotion ? (
        <Scene01OpeningStatic />
      ) : (
        <Scene01OpeningAnimated localProgress={localProgress} />
      )}
    </group>
  );
}
