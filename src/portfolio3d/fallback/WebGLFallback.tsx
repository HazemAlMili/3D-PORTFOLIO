// fallback/WebGLFallback.tsx
import "./WebGLFallback.css";

export function WebGLFallback() {
  return (
    <div className="webgl-fallback" aria-label="WebGL unavailable fallback">
      <div className="webgl-fallback__container">
        <div className="webgl-fallback__badge">⚠️ WebGL Unavailable</div>
        <h1 className="webgl-fallback__title">3D Experience Not Supported</h1>
        <p className="webgl-fallback__subtitle">
          Your browser or device does not support WebGL, which is required for the interactive 3D experience.
        </p>
        <p className="webgl-fallback__body">
          Please try using a modern browser (Chrome, Edge, Firefox, Safari) with hardware acceleration enabled.
        </p>
        <div className="webgl-fallback__content">
          <div className="webgl-fallback__section">
            <h2>About Me</h2>
            <p>Full Stack Developer — PENDING</p>
          </div>
          <div className="webgl-fallback__section">
            <h2>Contact</h2>
            <ul>
              <li>Email: CONTACT_PENDING</li>
              <li>LinkedIn: LINK_PENDING</li>
              <li>GitHub: LINK_PENDING</li>
            </ul>
          </div>
          <div className="webgl-fallback__section">
            <h2>Projects</h2>
            <p>Project details are pending. Please check back later.</p>
          </div>
        </div>
        <div className="webgl-fallback__footer">
          Let’s build systems that feel as good as they work.
        </div>
      </div>
    </div>
  );
}
