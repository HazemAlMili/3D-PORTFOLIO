import "./ContentOverlayRoot.css";

// Static placeholder map (proves structure for all 8 scenes)
const SCENE_PLACEHOLDERS: Record<string, string> = {
  "scene-01-opening": "Opening Content PENDING",
  "scene-02-hero": "Hero Content PENDING",
  "scene-03-architecture": "Architecture Content PENDING",
  "scene-04-projects": "Projects Content PENDING",
  "scene-05-product-ux": "Product UX Content PENDING",
  "scene-06-responsive-performance": "Responsive Performance Content PENDING",
  "scene-07-system-core": "System Core Content PENDING",
  "scene-08-contact": "Contact Content PENDING",
};

export function ContentOverlayRoot() {
  return (
    <div className="content-overlay-root" aria-label="Content overlay root">
      <div className="content-overlay-container">
        {Object.entries(SCENE_PLACEHOLDERS).map(([sceneId, text]) => (
          <div key={sceneId} className="content-overlay-slot" data-scene-id={sceneId}>
            {text}
          </div>
        ))}
      </div>
      <div className="content-overlay-debug">
        Overlay mounted — scroll to update scenes (future integration).
      </div>
    </div>
  );
}
