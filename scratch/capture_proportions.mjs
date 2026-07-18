import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function scene03LocalToGlobal(local) {
  return 0.34 + local * 0.13;
}

const steps = [
  { name: "prop_1_main_composition", progress: scene03LocalToGlobal(0.50) }, // CONNECTIONS
  { name: "prop_2_desktop_midscene", progress: scene03LocalToGlobal(0.66) }, // CONTENT
];

async function capture() {
  console.log("Starting Scene 03 HUD Proportions captures...");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });

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

  // Mobile viewport (390x844)
  const mCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mPage = await mCtx.newPage();
  await mPage.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.50).toFixed(4)}`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await mPage.waitForTimeout(5000);
  await mPage.screenshot({ path: path.join(targetDir, "prop_3_mobile.png") });
  console.log("\n  ✓ saved mobile proportion confirmation");
  await mPage.close();

  // Reduced motion state
  const rPage = await ctx.newPage();
  await rPage.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.50).toFixed(4)}&reducedMotion=true`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await rPage.waitForTimeout(5000);
  await rPage.screenshot({ path: path.join(targetDir, "prop_4_reduced_motion.png") });
  console.log("\n  ✓ saved reduced motion proportion confirmation");
  await rPage.close();

  await browser.close();
  console.log("\nAll HUD proportions captures completed successfully!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
