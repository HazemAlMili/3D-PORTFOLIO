import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const steps = [
  { name: "boundary_3_4_1_before_handoff", progress: 0.4570 }, // Local progress 0.90 in Scene 03
  { name: "boundary_3_4_2_handoff_moment", progress: 0.4648 }, // Local progress 0.96 in Scene 03
  { name: "boundary_3_4_3_exact_boundary", progress: 0.4700 }, // Scroll boundary
  { name: "boundary_3_4_4_early_scene04", progress: 0.4796 }, // Local progress 0.08 in Scene 04
];

async function capture() {
  console.log("Starting Scene 03 -> Scene 04 Boundary Isolation captures...");
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

  // Mobile confirmation at handoff moment
  const mCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mPage = await mCtx.newPage();
  await mPage.goto(`http://localhost:5173/?progress=0.4648`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await mPage.waitForTimeout(5000);
  await mPage.screenshot({ path: path.join(targetDir, "boundary_3_4_5_mobile.png") });
  console.log("\n  ✓ saved boundary 3 -> 4 mobile confirmation");
  await mPage.close();

  await browser.close();
  console.log("\nAll boundary 3 -> 4 captures completed successfully!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
