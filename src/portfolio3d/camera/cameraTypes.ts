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
}
