import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { usePortfolioStore } from "../../store/portfolioStore";

const BOOT_MESSAGES = [
  "[SYSTEM] INITIALIZING...",
  "[KERNEL] LOADED",
  "[DRIVERS] ACTIVE",
  "[UI] READY",
  "[CONNECTION] ESTABLISHED",
];

export function BootIndicator() {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false); // Skip boot sequence in reduced motion
      return;
    }

    const timers: number[] = [];
    let delay = 200;

    BOOT_MESSAGES.forEach((_, idx) => {
      const timeout = window.setTimeout(() => {
        setCurrentIndex(idx);
        if (idx === BOOT_MESSAGES.length - 1) {
          // Start fade-out after last message
          const fadeTimeout = window.setTimeout(() => setFadeOut(true), 600);
          timers.push(fadeTimeout);
        }
      }, delay);
      timers.push(timeout);
      delay += 400 + Math.random() * 300;
    });

    // Hide completely after fade-out
    const hideTimeout = window.setTimeout(() => setVisible(false), delay + 800);
    timers.push(hideTimeout);

    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  if (!visible || reducedMotion) return null;

  return (
    <Html
      transform
      position={[0, -0.5, -3.5]}
      className="boot-indicator"
      style={{
        opacity: fadeOut ? 0 : 0.6,
        transition: "opacity 0.8s ease",
        pointerEvents: "none",
        fontFamily: "monospace",
        fontSize: "0.7rem",
        color: "#00B4D8",
        textShadow: "0 0 10px rgba(0,180,216,0.3)",
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid rgba(0,180,216,0.1)",
      }}
    >
      <div>{BOOT_MESSAGES[currentIndex]}</div>
    </Html>
  );
}
