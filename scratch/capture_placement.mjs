import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function scene03LocalToGlobal(local) {
  return 0.34 + local * 0.13;
}

const steps = [
  { name: "place_1_mid_story", progress: scene03LocalToGlobal(0.50) },      // CONNECTIONS
  { name: "place_2_stabilized", progress: scene03LocalToGlobal(0.84) },     // READY
  { name: "place_3_close_read", progress: scene03LocalToGlobal(0.66) },     // CONTENT
];

async function capture() {
  console.log("Starting Scene 03 Placement & Hierarchy captures...");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  // Cold start pre-load to warm up WebGL shaders
  console.log("Pre-loading app to warm up WebGL...");
  const warmPage = await ctx.newPage();
  await warmPage.goto("http://localhost:5173/?progress=0.4000", { timeout: 60000, waitUntil: "domcontentloaded" });
  await warmPage.waitForTimeout(8000);
  await warmPage.close();

  for (const step of steps) {
    const page = await ctx.newPage();
    const url = `http://localhost:5173/?progress=${step.progress.toFixed(4)}`;
    console.log(`\n[${step.name}] progress=${step.progress.toFixed(4)}`);
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });
    await page.waitForTimeout(5000);
    const out = path.join(targetDir, `${step.name}.png`);
    await page.screenshot({ path: out });
    console.log(`  ✓ saved → ${out}`);
    await page.close();
  }

  // Mobile viewport (390x844) at CONNECTIONS
  const mCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mPage = await mCtx.newPage();
  await mPage.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.50).toFixed(4)}`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await mPage.waitForTimeout(5000);
  await mPage.screenshot({ path: path.join(targetDir, "place_4_mobile.png") });
  console.log("\n  ✓ saved mobile placement confirmation");
  await mPage.close();

  await browser.close();
  console.log("\nAll placement & hierarchy captures completed successfully!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
