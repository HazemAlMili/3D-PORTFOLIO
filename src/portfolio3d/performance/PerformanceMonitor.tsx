import { useState, useEffect, useRef } from "react";
import "./PerformanceMonitor.css";

function PerformanceMonitorContent() {
  const [fps, setFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let rafId: number;

    function tick(time: number) {
      frameCountRef.current += 1;
      const delta = time - lastTimeRef.current;

      if (delta >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / delta));
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

  return (
    <div className="performance-monitor" aria-label="Performance monitor">
      <span className="performance-monitor__label">FPS</span>
      <span className="performance-monitor__value">{fps}</span>
    </div>
  );
}

export function PerformanceMonitor() {
  // Strict dev-only guard
  if (!import.meta.env.DEV) {
    return null;
  }

  return <PerformanceMonitorContent />;
}
