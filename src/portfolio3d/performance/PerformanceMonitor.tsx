import { useState, useEffect, useRef } from "react";
import "./PerformanceMonitor.css";

interface PerformanceMonitorContentProps {
  showUI: boolean;
}

function PerformanceMonitorContent({ showUI }: PerformanceMonitorContentProps) {
  const [fps, setFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let rafId: number;

    function tick(time: number) {
      frameCountRef.current += 1;
      const delta = time - lastTimeRef.current;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFps);

        frameCountRef.current = 0;
        lastTimeRef.current = time;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!showUI) {
    return null; // Invisible in production
  }

  return (
    <div
      className="performance-monitor"
      aria-label="Performance monitor"
      title="Measures browser requestAnimationFrame (rAF) frame pacing"
    >
      <span className="performance-monitor__label">FPS (rAF)</span>
      <span className="performance-monitor__value">{fps}</span>
    </div>
  );
}

export function PerformanceMonitor() {
  const isDev = import.meta.env.DEV;
  return <PerformanceMonitorContent showUI={isDev} />;
}
