export const createEllipseOrbit = (
  rx: number,
  ry: number,
  tiltZ: number,
  tiltX: number,
  tiltY = 0,
  segments = 64
): [number, number, number][] => {
  const pts: [number, number, number][] = [];
  const cosZ = Math.cos(tiltZ), sinZ = Math.sin(tiltZ);
  const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
  const cosY = Math.cos(tiltY), sinY = Math.sin(tiltY);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x0 = rx * Math.cos(theta);
    const y0 = ry * Math.sin(theta);
    const z0 = 0;

    // Rotate around Z
    const x1 = x0 * cosZ - y0 * sinZ;
    const y1 = x0 * sinZ + y0 * cosZ;
    const z1 = z0;

    // Rotate around X
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    // Rotate around Y
    const x3 = x2 * cosY + z2 * sinY;
    const y3 = y2;
    const z3 = -x2 * sinY + z2 * cosY;

    pts.push([x3, y3, z3]);
  }
  return pts;
};

// 5 Large Off-screen Atomic Orbits for Scene 02 wrapping around the centered content
// rx, ry, tiltZ, tiltX, tiltY
export const ATOM_ORBITS = {
  // Orbit 1: Diagonal / Horizontal-leaning (FRONTEND)
  orbit1: createEllipseOrbit(4.8, 1.8, 0.2, 0.8),
  // Orbit 2: Steep Diagonal (APIS)
  orbit2: createEllipseOrbit(4.2, 1.6, 0.9, 0.5),
  // Orbit 3: Opposite Diagonal (BACKEND)
  orbit3: createEllipseOrbit(4.5, 1.7, -0.6, 0.7),
  // Orbit 4: Lower Diagonal (DATABASES)
  orbit4: createEllipseOrbit(4.4, 1.5, -0.2, 0.8),
  // Orbit 5: Bottom Diagonal (DEPLOYMENT)
  orbit5: createEllipseOrbit(4.6, 1.6, -1.1, 0.6),
};

// Map nodes exactly to points on these orbits so they are 100% attached on the outer edges.
export const ATOM_NODE_POSITIONS: Record<string, { orbitId: "orbit1" | "orbit2" | "orbit3" | "orbit4" | "orbit5", pointIndex: number }> = {
  frontend:   { orbitId: "orbit1", pointIndex: 2  }, // Upper-left edge of right system cluster (screen projection: [65.4%, 28.5%])
  apis:       { orbitId: "orbit2", pointIndex: 3  }, // Upper-right edge (screen projection: [70.2%, 18.0%])
  backend:    { orbitId: "orbit3", pointIndex: 6  }, // Upper-right edge (screen projection: [84.9%, 10.1%])
  databases:  { orbitId: "orbit4", pointIndex: 62 }, // Right-mid edge (screen projection: [74.5%, 49.3%])
  deployment: { orbitId: "orbit5", pointIndex: 13 }, // Lower-right edge (screen projection: [75.1%, 86.8%])
};

export const getLockedPosition = (id: string): [number, number, number] => {
  const config = ATOM_NODE_POSITIONS[id];
  if (!config) return [0, 0, 0];
  return ATOM_ORBITS[config.orbitId][config.pointIndex];
};
