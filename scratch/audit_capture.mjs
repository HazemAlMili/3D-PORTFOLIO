import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = "D:\\PORT\\scratch\\audit_shots";
const BASE = "http://localhost:5173/";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Scene global progress targets.
// Weights: [0.20, 0.14, 0.13, 0.12, 0.11, 0.11, 0.11, 0.08]
// Scene midpoints:
//   S1 0.10  S2 0.27  S3 0.365  S4 0.455  S5 0.535  S6 0.615  S7 0.695  S8 0.775
const beats = [
  { name: "01_scene01_mid",         progress: 0.10,  width: 1280, height: 720 },
  { name: "02_scene02_mid",         progress: 0.27,  width: 1280, height: 720 },
  { name: "03_scene03_current",     progress: 0.365, width: 1280, height: 720 },
  { name: "04_scene04_mid",         progress: 0.455, width: 1280, height: 720 },
  { name: "05_scene07_system_core", progress: 0.695, width: 1280, height: 720 },
  { name: "06_scene08_contact",     progress: 0.80,  width: 1280, height: 720 },
  { name: "07_mobile_375_scene03",  progress: 0.365, width: 375,  height: 667, mobile: true },
  { name: "08_mobile_390_scene03",  progress: 0.365, width: 390,  height: 844, mobile: true },
  { name: "09_reduced_motion_s2",   progress: 0.27,  width: 1280, height: 720, reducedMotion: true },
  { name: "10_reduced_motion_s3",   progress: 0.365, width: 1280, height: 720, reducedMotion: true },
];

async function shot(browser, beat) {
  const ctxOpts = { viewport: { width: beat.width, height: beat.height } };
  if (beat.mobile) {
    ctxOpts.userAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1";
    ctxOpts.hasTouch = true;
    ctxOpts.isMobile = true;
  }
  const context = await browser.newContext(ctxOpts);
  const page = await context.newPage();

  const url = `${BASE}?progress=${beat.progress}${beat.reducedMotion ? "&reducedMotion=true" : ""}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  // Allow the 3D scene to settle (camera damping, Suspense, instanced meshes)
  await page.waitForTimeout(2500);

  const out = path.join(OUT_DIR, `${beat.name}.png`);
  await page.screenshot({ path: out });
  console.log(`  saved ${out}`);

  // Read FPS if present (dev-only HUD)
  const fpsText = await page.locator(".performance-monitor__value").textContent().catch(() => null);
  if (fpsText) console.log(`    FPS(rAF): ${fpsText}`);

  await context.close();
}

async function main() {
  console.log("Launching chromium (headless)...");
  const browser = await chromium.launch({ headless: true });
  try {
    for (const beat of beats) {
      process.stdout.write(`[${beat.name}] p=${beat.progress} ${beat.width}x${beat.height}\n`);
      try {
        await shot(browser, beat);
      } catch (e) {
        console.log(`  ERROR: ${e.message}`);
      }
    }
  } finally {
    await browser.close();
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
