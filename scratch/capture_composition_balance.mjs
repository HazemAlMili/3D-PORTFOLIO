import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function toGlobal(local) {
  return 0.34 + local * 0.13;
}

const beats = [
  { name: "composition_0.08_idea",         local: 0.08 },
  { name: "composition_0.22_screens",      local: 0.22 },
  { name: "composition_0.36_interaction",  local: 0.36 },
  { name: "composition_0.50_connections",  local: 0.50 },
  { name: "composition_0.66_content",      local: 0.66 },
  { name: "composition_0.84_ready",        local: 0.84 },
  { name: "composition_0.96_handoff",      local: 0.96 },
];

const questions = [
  "Does the page feel balanced (left copy, right product)?",
  "Is there a clean breathing space/center gap between HUD card and product?",
  "Are HUD phase labels matching the user-friendly sequence?",
  "Is the product layout stable under camera tracking?",
  "Is mobile completely free of clipping/clutter?",
];

async function capture() {
  console.log("Starting PRODUCT-LAYOUT-07 composition balance captures...");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  for (const beat of beats) {
    const page = await ctx.newPage();
    const gp = toGlobal(beat.local);
    const url = `http://localhost:5173/?progress=${gp.toFixed(4)}`;
    console.log(`\n[${beat.name}] local=${beat.local} global=${gp.toFixed(4)}`);
    await page.goto(url);
    await page.waitForTimeout(4500);
    const out = path.join(targetDir, `${beat.name}.png`);
    await page.screenshot({ path: out });
    console.log(`  ✓ saved → ${out}`);
    await page.close();
  }

  // Mobile 390x844
  const mCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mPage = await mCtx.newPage();
  await mPage.goto(`http://localhost:5173/?progress=${toGlobal(0.50).toFixed(4)}`);
  await mPage.waitForTimeout(4500);
  await mPage.screenshot({ path: path.join(targetDir, "composition_mobile_390x844.png") });
  console.log("\n  ✓ saved mobile 390x844");
  await mPage.close();

  // Reduced motion
  const rPage = await ctx.newPage();
  await rPage.goto(`http://localhost:5173/?progress=${toGlobal(0.65).toFixed(4)}&reducedMotion=true`);
  await rPage.waitForTimeout(4500);
  await rPage.screenshot({ path: path.join(targetDir, "composition_reduced_motion.png") });
  console.log("  ✓ saved reduced motion");
  await rPage.close();

  await browser.close();

  console.log("\n═══════════════════════════════════════════════════");
  console.log("QA Questions for each screenshot:");
  questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));
  console.log("═══════════════════════════════════════════════════");
  console.log("All PRODUCT-LAYOUT-07 captures complete!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
