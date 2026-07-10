import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Object3D } from "three";

interface AvatarProps {
  localProgress: number;
}

export function Avatar({ localProgress }: AvatarProps) {
  // Load the realistic Joe model from the public assets folder
  const { scene } = useGLTF("/assets/models/opening-avatar/optimized/opening_avatar.glb");
  const avatarGroupRef = useRef<Group>(null);

  // Keep references to nodes we want to animate procedurally
  const joeNodeRef = useRef<Object3D | null>(null);
  const armsNodeRef = useRef<Object3D | null>(null);
  const faceNodeRef = useRef<Object3D | null>(null);
  const hairNodeRef = useRef<Object3D | null>(null);
  const eyesNodeRef = useRef<Object3D | null>(null);
  const mouthNodeRef = useRef<Object3D | null>(null);

  // Initialize node references on mount
  useEffect(() => {
    if (scene) {
      joeNodeRef.current = scene.getObjectByName("Joe") || null;
      armsNodeRef.current = scene.getObjectByName("Arms") || null;
      faceNodeRef.current = scene.getObjectByName("Face") || null;
      hairNodeRef.current = scene.getObjectByName("Hair") || null;
      eyesNodeRef.current = scene.getObjectByName("Eyes") || null;
      mouthNodeRef.current = scene.getObjectByName("Mouth") || null;
    }
  }, [scene]);

  // Adjust material properties for realistic skin, hair, and clothing
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Adjust roughness and metalness for a more cinematic look
          if (child.name.includes("Face") || child.name.includes("Arms_Torso")) {
            child.material.roughness = 0.65; // skin
            child.material.metalness = 0.1;
          } else if (child.name.includes("Hair")) {
            child.material.roughness = 0.8; // hair matte
            child.material.metalness = 0.05;
          } else if (child.name.includes("TShirt") || child.name.includes("Shorts")) {
            child.material.roughness = 0.85; // fabric
            child.material.metalness = 0.05;
          } else if (child.name.includes("Shoes") || child.name.includes("Feet")) {
            child.material.roughness = 0.5;
            child.material.metalness = 0.2;
          }
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = localProgress;

    // --- 1. Idle Breathing (Active across all phases, subtler during hold) ---
    const breathingFactor = p >= 0.45 && p <= 0.58 ? 0.5 : 1.0;
    const breatheY = Math.sin(t * 1.5) * 0.03 * breathingFactor; // 3mm vertical movement
    const breatheChestTilt = Math.sin(t * 1.5) * 0.015 * breathingFactor;
    const breatheHeadTilt = Math.sin(t * 1.5 + 0.5) * 0.01 * breathingFactor;

    // Apply baseline breathing to Joe (entire body offset)
    if (joeNodeRef.current) {
      joeNodeRef.current.position.y = 107.38 + breatheY * 100; // Multiply by 100 as Joe's local coordinates are in cm
    }

    // Apply breathing chest tilt to Arms (which contains arms/chest)
    if (armsNodeRef.current) {
      armsNodeRef.current.rotation.x = breatheChestTilt;
    }

    // Apply breathing to head elements together
    const setHeadRotation = (rx: number, ry: number, rz: number) => {
      [faceNodeRef.current, hairNodeRef.current, eyesNodeRef.current, mouthNodeRef.current].forEach(node => {
        if (node) {
          node.rotation.x = rx;
          node.rotation.y = ry;
          node.rotation.z = rz;
        }
      });
    };

    let headRx = breatheHeadTilt;
    let headRy = 0;
    let headRz = 0;

    // --- 2. Hello Wave (Beat 02: 0.12 -> 0.25) ---
    if (p >= 0.12 && p <= 0.25) {
      const waveProgress = (p - 0.12) / 0.13; // 0 to 1
      const waveScale = Math.sin(waveProgress * Math.PI); // Smooth ease-in, ease-out multiplier

      // Rotate Arms (raising body and arms)
      if (armsNodeRef.current) {
        // Raise arms Z-axis and rotate X-axis for greeting
        armsNodeRef.current.rotation.z = waveScale * 0.25;
        armsNodeRef.current.rotation.y = waveScale * 0.15;
        // Waving oscillation
        armsNodeRef.current.rotation.x = breatheChestTilt + waveScale * Math.sin(t * 10) * 0.06;
      }

      // Friendly head tilt
      headRz = waveScale * -0.05;
      headRy = waveScale * 0.05;
    } else {
      // Reset arm rotation if not in wave or activation phase
      if (p < 0.12 && armsNodeRef.current) {
        armsNodeRef.current.rotation.z = 0;
        armsNodeRef.current.rotation.y = 0;
      }
    }

    // --- 3. Name & Title Entrance + Hold (Beat 03 & 04: 0.25 -> 0.58) ---
    // Calm presentation, only breathing active

    // --- 4. O / Lens Activation (Beat 05: 0.58 -> 0.75) ---
    if (p >= 0.58 && p <= 0.75) {
      const activeProgress = (p - 0.58) / 0.17; // 0 to 1
      const activeScale = Math.sin(activeProgress * Math.PI / 2); // Ease-out curve

      // Look toward the lens (center of O is near [0, 0, 1.2])
      headRx = breatheHeadTilt - activeScale * 0.08; // look slightly down/forward
      headRy = activeScale * 0.05; // look slightly right

      // Raise hand toward eye/lens area (rotate Arms forward and up)
      if (armsNodeRef.current) {
        armsNodeRef.current.rotation.x = breatheChestTilt - activeScale * 0.45;
        armsNodeRef.current.rotation.y = -activeScale * 0.1;
        armsNodeRef.current.rotation.z = activeScale * 0.15;
      }
    } else if (p > 0.75) {
      // Hold the portal activation pose during camera entry
      const activeScale = 1.0;
      headRx = breatheHeadTilt - activeScale * 0.08;
      headRy = activeScale * 0.05;
      if (armsNodeRef.current) {
        armsNodeRef.current.rotation.x = breatheChestTilt - activeScale * 0.45;
        armsNodeRef.current.rotation.y = -activeScale * 0.1;
        armsNodeRef.current.rotation.z = activeScale * 0.15;
      }
    }

    // Apply the computed head rotations
    setHeadRotation(headRx, headRy, headRz);

    // --- 5. Fade out as camera enters the lens (Beat 06: 0.75 -> 1.00) ---
    if (p >= 0.75) {
      const exitProgress = (p - 0.75) / 0.25; // 0 to 1
      if (avatarGroupRef.current) {
        // As the camera dollies past the avatar, we scale down/fade out to prevent clipping
        avatarGroupRef.current.scale.setScalar(Math.max(0.001, 1 - exitProgress * 1.2));
      }
    } else {
      if (avatarGroupRef.current) {
        avatarGroupRef.current.scale.setScalar(1.0);
      }
    }
  });

  return (
    <group ref={avatarGroupRef} position={[0, -0.65, 0.4]} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the GLB model
useGLTF.preload("/assets/models/opening-avatar/optimized/opening_avatar.glb");
