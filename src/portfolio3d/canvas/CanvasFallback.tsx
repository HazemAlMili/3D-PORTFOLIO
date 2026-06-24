export function CanvasFallback() {
  return (
    <div className="portfolio3d-canvas-fallback" role="alert" aria-live="assertive">
      <h2>3D Experience Fallback Active</h2>
      <p>3D experience fallback is active.</p>
      <p>The accessible portfolio fallback will be built in a later task.</p>
      <p className="portfolio3d-fallback-note">Note: This is currently a WebGL fallback skeleton.</p>
    </div>
  );
}
