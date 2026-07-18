import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const steps = [
  { name: "boundary_1_late_scene02", progress: 0.3316 }, // Local progress 0.94 in Scene 02
  { name: "boundary_2_exact_boundary", progress: 0.3400 }, // Scroll boundary
  { name: "boundary_3_early_scene03", progress: 0.3478 }, // Local progress 0.06 in Scene 03
];

async function capture() {
  console.log("Starting Scene 02 -> Scene 03 Boundary Isolation captures...");
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

  // Reduced motion confirmation at boundary
  const rPage = await ctx.newPage();
  await rPage.goto(`http://localhost:5173/?progress=0.3400&reducedMotion=true`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await rPage.waitForTimeout(5000);
  await rPage.screenshot({ path: path.join(targetDir, "boundary_4_reduced_motion.png") });
  console.log("\n  ✓ saved boundary reduced motion confirmation");
  await rPage.close();

  await browser.close();
  console.log("\nAll boundary captures completed successfully!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
