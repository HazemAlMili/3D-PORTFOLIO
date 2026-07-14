const createEllipseOrbit = (
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

    const x1 = x0 * cosZ - y0 * sinZ;
    const y1 = x0 * sinZ + y0 * cosZ;
    const z1 = z0;

    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    const x3 = x2 * cosY + z2 * sinY;
    const y3 = y2;
    const z3 = -x2 * sinY + z2 * cosY;

    pts.push([x3, y3, z3]);
  }
  return pts;
};

const orbit1 = createEllipseOrbit(1.8, 0.7, 0.2, 1.2);
const orbit2 = createEllipseOrbit(1.7, 0.8, 1.4, 0.3);
const orbit3 = createEllipseOrbit(1.8, 0.7, -0.5, 0.8);

console.log("FRONTEND (orbit1, 30):", orbit1[30].map(v => v.toFixed(2)));
console.log("APIS (orbit2, 12):", orbit2[12].map(v => v.toFixed(2)));
console.log("BACKEND (orbit2, 4):", orbit2[4].map(v => v.toFixed(2)));
console.log("DATABASES (orbit3, 61):", orbit3[61].map(v => v.toFixed(2)));
console.log("DEPLOYMENT (orbit1, 54):", orbit1[54].map(v => v.toFixed(2)));

// Let's find better points!
console.log("\nSearching for better points...");
for (let i = 0; i < 64; i += 4) {
  console.log(`Orbit1[${i}]:`, orbit1[i].map(v => v.toFixed(2)));
}
for (let i = 0; i < 64; i += 4) {
  console.log(`Orbit3[${i}]:`, orbit3[i].map(v => v.toFixed(2)));
}
