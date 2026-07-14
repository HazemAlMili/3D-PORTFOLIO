// camera/cameraTypes.ts
export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface SceneCameraStates {
  approach: CameraPose;
  enter: CameraPose;
  exit: CameraPose;
  /** Optional mobile-specific override for approach/enter/exit poses */
  mobile?: {
    approach: CameraPose;
    enter: CameraPose;
    exit: CameraPose;
  };
}
