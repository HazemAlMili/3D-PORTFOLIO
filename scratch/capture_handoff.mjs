import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function toGlobal(local) {
  return 0.34 + local * 0.13;
}

const beats = [
  { name: "handoff_0.88_ready_hero", local: 0.88 },
  { name: "handoff_0.94_output_activates", local: 0.94 },
  { name: "handoff_0.96_packet_motion", local: 0.96 },
  { name: "handoff_0.99_packet_reaches", local: 0.99 },
  { name: "handoff_1.00_scene04_receiver", local: 1.00 },
];

const questions = [
  "What changed from previous beat?",
  "Is the proof packet readable?",
  "Does the path look premium or debug-like?",
  "Does the handoff naturally lead to Scene 04?",
  "Is HUD separation preserved?",
];

async function capture() {
  console.log("Starting PRODUCT-HANDOFF-09 captures...");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  for (const beat of beats) {
    const page = await ctx.newPage();
    const gp = toGlobal(beat.local);
    const url = `http://localhost:5173/?progress=${gp.toFixed(4)}`;
    console.log(`\n[${beat.name}] local=${beat.local} global=${gp.toFixed(4)}`);
    await page.goto(url);
    await page.waitForTimeout(4500); // Allow animations to settle
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
  await mPage.goto(`http://localhost:5173/?progress=${toGlobal(0.96).toFixed(4)}`);
  await mPage.waitForTimeout(4500);
  await mPage.screenshot({ path: path.join(targetDir, "handoff_mobile_390x844.png") });
  console.log("\n  ✓ saved mobile 390x844");
  await mPage.close();

  // Reduced motion
  const rPage = await ctx.newPage();
  await rPage.goto(`http://localhost:5173/?progress=${toGlobal(0.96).toFixed(4)}&reducedMotion=true`);
  await rPage.waitForTimeout(4500);
  await rPage.screenshot({ path: path.join(targetDir, "handoff_reduced_motion.png") });
  console.log("  ✓ saved reduced motion");
  await rPage.close();

  await browser.close();

  console.log("\n═══════════════════════════════════════════════════");
  console.log("QA Questions for each screenshot:");
  questions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));
  console.log("═══════════════════════════════════════════════════");
  console.log("All PRODUCT-HANDOFF-09 captures complete!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
