import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8b3f8e12-ba2f-41e1-91c8-ade4c9971973";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function capture() {
  console.log("Starting Playwright capture for PRODUCT-STORY-05R Optimization Wave...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const beats = [
    { name: "scene_02_reference", progress: 0.25, width: 1280, height: 720 },
    { name: "0.65_before_optimization", progress: 0.4245, width: 1280, height: 720 },
    { name: "0.70_wave_begins", progress: 0.4310, width: 1280, height: 720 },
    { name: "0.74_transformation_moment", progress: 0.4362, width: 1280, height: 720 },
    { name: "0.78_slabs_aligning", progress: 0.4414, width: 1280, height: 720 },
    { name: "0.82_optimized_product_state", progress: 0.4466, width: 1280, height: 720 },
    { name: "mobile_390x844", progress: 0.4466, width: 390, height: 844 },
    { name: "reduced_motion", progress: 0.4466, width: 1280, height: 720, reducedMotion: true }
  ];

  for (const beat of beats) {
    let activeContext = context;
    let createdNewContext = false;

    if (beat.name.includes("mobile")) {
      activeContext = await browser.newContext({
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
        viewport: { width: beat.width, height: beat.height },
        hasTouch: true,
      });
      createdNewContext = true;
    }

    const page = await activeContext.newPage();
    if (!beat.name.includes("mobile")) {
      await page.setViewportSize({ width: beat.width, height: beat.height });
    }

    let url = `http://localhost:5174/?progress=${beat.progress}`;
    if (beat.reducedMotion) {
      url += "&reducedMotion=true";
    }

    console.log(`Navigating to ${url} (Viewport: ${beat.width}x${beat.height})...`);
    await page.goto(url);
    
    // Wait for animations and layout alignment
    await page.waitForTimeout(4000);

    const screenshotPath = path.join(targetDir, `${beat.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot to ${screenshotPath}`);
    await page.close();

    if (createdNewContext) {
      await activeContext.close();
    }
  }

  await browser.close();
  console.log("Capture complete!");
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
