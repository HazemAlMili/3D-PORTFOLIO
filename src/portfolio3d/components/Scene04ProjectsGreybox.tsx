import { usePortfolioStore } from "../store/portfolioStore";
import { ConnectedProjectScreenRing } from "./ConnectedProjectScreenRing";
import { Scene04HubTitle } from "./Scene04HubTitle";

interface Scene04ProjectsGreyboxProps {
  localProgress: number;
  opacity?: number;
}

export function Scene04ProjectsGreybox({ localProgress, opacity = 1.0 }: Scene04ProjectsGreyboxProps) {
  const reducedMotion = usePortfolioStore((state) => state.reducedMotion);
  const p = localProgress;

  // Rail & overall ring visibility (0.00 - 1.00)
  const ringOpacity = opacity * (reducedMotion ? 1.0 : Math.max(0, Math.min(1, p / 0.10)));

  if (ringOpacity <= 0.005) return null;

  return (
    <group name="s04_greybox_root">
      {/* Scene 04 Hub Title Group (Hub-only reveal, fades out during P1 approach) */}
      <Scene04HubTitle localProgress={localProgress} opacity={opacity} />

      {/* 3D Connected Project Screen Ring (4 verified screens, pure math resolver) */}
      <ConnectedProjectScreenRing localProgress={localProgress} opacity={ringOpacity} />
    </group>
  );
}

export default Scene04ProjectsGreybox;
