import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Convert Scene 03 local progress to global
function scene03LocalToGlobal(local) {
  return 0.34 + local * 0.13;
}

// Convert other scenes' progress to global
function scene02LocalToGlobal(local) {
  return 0.12 + local * 0.22;
}

function scene04LocalToGlobal(local) {
  return 0.47 + local * 0.23;
}

const steps = [
  // 1. Scene 02 reference
  { name: "qa_1_scene02_reference", url: `http://localhost:5173/?progress=${scene02LocalToGlobal(0.5).toFixed(4)}` },
  // 2. Scene 03 0.08 IDEA
  { name: "qa_2_scene03_0.08_idea", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.08).toFixed(4)}` },
  // 3. Scene 03 0.22 SCREENS
  { name: "qa_3_scene03_0.22_screens", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.22).toFixed(4)}` },
  // 4. Scene 03 0.36 INTERACTION
  { name: "qa_4_scene03_0.36_interaction", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.36).toFixed(4)}` },
  // 5. Scene 03 0.50 CONNECTIONS
  { name: "qa_5_scene03_0.50_connections", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.50).toFixed(4)}` },
  // 6. Scene 03 0.66 CONTENT
  { name: "qa_6_scene03_0.66_content", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.66).toFixed(4)}` },
  // 7. Scene 03 0.84 READY
  { name: "qa_7_scene03_0.84_ready", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.84).toFixed(4)}` },
  // 8. Scene 03 0.96 HANDOFF
  { name: "qa_8_scene03_0.96_handoff", url: `http://localhost:5173/?progress=${scene03LocalToGlobal(0.96).toFixed(4)}` },
  // 9. Scene 04 receiver
  { name: "qa_9_scene04_receiver", url: `http://localhost:5173/?progress=${scene04LocalToGlobal(0.05).toFixed(4)}` },
];

async function capture() {
  console.log("Starting Scene 03 Final QA Capture Sequence...");
  const browser = await chromium.launch({ headless: true });
  
  // Create desktop context
  const desktopCtx = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  const consoleErrors = [];
  const consoleWarnings = [];

  // Capture desktop steps
  for (const step of steps) {
    const page = await desktopCtx.newPage();
    page.on("console", msg => {
      const text = msg.text();
      if (msg.type() === "error") {
        consoleErrors.push({ step: step.name, text });
      } else if (msg.type() === "warning") {
        consoleWarnings.push({ step: step.name, text });
      }
    });

    console.log(`Navigating to ${step.name}...`);
    await page.goto(step.url, { timeout: 60000, waitUntil: "domcontentloaded" });
    await page.waitForTimeout(5000); // Settle WebGL render and labels
    const outPath = path.join(targetDir, `${step.name}.png`);
    await page.screenshot({ path: outPath });
    console.log(`  ✓ Saved desktop screenshot: ${outPath}`);
    await page.close();
  }

  // 10. mobile 375x667 (Local progress 0.84 - READY)
  const m375Ctx = await browser.newContext({
    viewport: { width: 375, height: 667 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const m375Page = await m375Ctx.newPage();
  await m375Page.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.84).toFixed(4)}`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await m375Page.waitForTimeout(5000);
  await m375Page.screenshot({ path: path.join(targetDir, "qa_10_mobile_375x667.png") });
  console.log("  ✓ Saved mobile 375x667");
  await m375Page.close();

  // 11. mobile 390x844 (Local progress 0.84 - READY)
  const m390Ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const m390Page = await m390Ctx.newPage();
  await m390Page.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.84).toFixed(4)}`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await m390Page.waitForTimeout(5000);
  await m390Page.screenshot({ path: path.join(targetDir, "qa_11_mobile_390x844.png") });
  console.log("  ✓ Saved mobile 390x844");
  await m390Page.close();

  // 12. mobile 430x932 (Local progress 0.84 - READY)
  const m430Ctx = await browser.newContext({
    viewport: { width: 430, height: 932 },
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const m430Page = await m430Ctx.newPage();
  await m430Page.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.84).toFixed(4)}`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await m430Page.waitForTimeout(5000);
  await m430Page.screenshot({ path: path.join(targetDir, "qa_12_mobile_430x932.png") });
  console.log("  ✓ Saved mobile 430x932");
  await m430Page.close();

  // 13. reduced motion (Local progress 0.84 - READY)
  const rmPage = await desktopCtx.newPage();
  await rmPage.goto(`http://localhost:5173/?progress=${scene03LocalToGlobal(0.84).toFixed(4)}&reducedMotion=true`, { timeout: 60000, waitUntil: "domcontentloaded" });
  await rmPage.waitForTimeout(5000);
  await rmPage.screenshot({ path: path.join(targetDir, "qa_13_reduced_motion.png") });
  console.log("  ✓ Saved reduced motion");
  await rmPage.close();

  await browser.close();

  console.log("\nConsole Verification Results:");
  console.log(`Errors: ${consoleErrors.length}`);
  consoleErrors.forEach(err => console.log(`  [${err.step}] ERROR: ${err.text}`));
  console.log(`Warnings: ${consoleWarnings.length}`);
  consoleWarnings.forEach(warn => console.log(`  [${warn.step}] WARN: ${warn.text}`));
  
  console.log("\nAll QA captures completed successfully.");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
