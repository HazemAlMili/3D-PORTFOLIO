import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Global progress formula: globalProgress = 0.34 + localProgress * 0.13
function toGlobal(local) {
  return 0.34 + local * 0.13;
}

async function capture() {
  console.log("Starting PRODUCT-VISUAL-REBASE-02 beat audit captures...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  const beats = [
    { name: "rebase02_0.15_raw_fragments",    local: 0.15 },
    { name: "rebase02_0.27_magnetic_assembly", local: 0.27 },
    { name: "rebase02_0.35_blueprint_scaffold", local: 0.35 },
    { name: "rebase02_0.50_product_core",      local: 0.50 },
    { name: "rebase02_0.58_depth_reveal",      local: 0.58 },
    { name: "rebase02_0.65_full_stack",        local: 0.65 },
    { name: "rebase02_0.74_optimized",         local: 0.74 },
  ];

  for (const beat of beats) {
    const page = await context.newPage();
    const globalP = toGlobal(beat.local);
    const url = `http://localhost:5173/?progress=${globalP.toFixed(4)}`;
    console.log(`[${beat.name}] local=${beat.local} global=${globalP.toFixed(4)} → ${url}`);
    await page.goto(url);
    await page.waitForTimeout(4000);
    const screenshotPath = path.join(targetDir, `${beat.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`  ✓ saved → ${screenshotPath}`);
    await page.close();
  }

  // Mobile
  const mPage = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15"
  }).then(ctx => ctx.newPage());
  await mPage.goto(`http://localhost:5173/?progress=${toGlobal(0.58).toFixed(4)}`);
  await mPage.waitForTimeout(4000);
  await mPage.screenshot({ path: path.join(targetDir, "rebase02_mobile_390x844.png") });
  console.log("  ✓ saved mobile");
  await mPage.close();

  // Reduced motion
  const rPage = await context.newPage();
  await rPage.goto(`http://localhost:5173/?progress=${toGlobal(0.58).toFixed(4)}&reducedMotion=true`);
  await rPage.waitForTimeout(4000);
  await rPage.screenshot({ path: path.join(targetDir, "rebase02_reduced_motion.png") });
  console.log("  ✓ saved reduced motion");
  await rPage.close();

  await browser.close();
  console.log("All REBASE-02 beat captures complete!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
