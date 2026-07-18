import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function toGlobal(local) {
  return 0.34 + local * 0.13;
}

const beats = [
  { name: "readable02_0.12_idea_visible",         local: 0.12 },
  { name: "readable02_0.28_frame_ui_beginning",   local: 0.28 },
  { name: "readable02_0.40_ui_api_readable",      local: 0.40 },
  { name: "readable02_0.55_backend_data_joining", local: 0.55 },
  { name: "readable02_0.72_optimization_beat",    local: 0.72 },
  { name: "readable02_0.86_ready_product_state",  local: 0.86 },
  { name: "readable02_0.96_launch_handoff",       local: 0.96 },
];

const questions = [
  "Is the frame large enough?",
  "Are labels readable?",
  "Is the active story beat clear?",
  "Does it feel cinematic?",
  "Is HUD separation clean?",
];

async function capture() {
  console.log("Starting PRODUCT-READABLE-02 beat audit captures...");
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
  await mPage.goto(`http://localhost:5173/?progress=${toGlobal(0.55).toFixed(4)}`);
  await mPage.waitForTimeout(4500);
  await mPage.screenshot({ path: path.join(targetDir, "readable02_mobile_390x844.png") });
  console.log("\n  ✓ saved mobile 390x844");
  await mPage.close();

  // Reduced motion
  const rPage = await ctx.newPage();
  await rPage.goto(`http://localhost:5173/?progress=${toGlobal(0.65).toFixed(4)}&reducedMotion=true`);
  await rPage.waitForTimeout(4500);
  await rPage.screenshot({ path: path.join(targetDir, "readable02_reduced_motion.png") });
  console.log("  ✓ saved reduced motion");
  await rPage.close();

  await browser.close();

  console.log("\n═══════════════════════════════════════════════════");
  console.log("QA Questions for each screenshot:");
  questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));
  console.log("═══════════════════════════════════════════════════");
  console.log("All PRODUCT-READABLE-02 captures complete!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
