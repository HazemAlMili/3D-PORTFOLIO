// performance/webglDetection.ts
export function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl1 = canvas.getContext("webgl");
    const gl2 = canvas.getContext("webgl2");
    return !!(gl1 || gl2);
  } catch {
    return false;
  }
}

export function detectWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl2 = canvas.getContext("webgl2");
    return !!gl2;
  } catch {
    return false;
  }
}
