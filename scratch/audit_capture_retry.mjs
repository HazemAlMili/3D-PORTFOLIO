import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = "D:\\PORT\\scratch\\audit_shots";
const BASE = "http://localhost:5173/";

const beats = [
  { name: "01_scene01_mid",         progress: 0.10,  width: 1280, height: 720 },
  { name: "05_scene07_system_core", progress: 0.695, width: 1280, height: 720 },
];

async function shot(browser, beat) {
  const context = await browser.newContext({
    viewport: { width: beat.width, height: beat.height },
  });
  const page = await context.newPage();
  const url = `${BASE}?progress=${beat.progress}`;
  // Use domcontentloaded — HMR keeps the network from going idle.
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3500);
  const out = path.join(OUT_DIR, `${beat.name}.png`);
  await page.screenshot({ path: out });
  console.log(`  saved ${out}`);
  const fpsText = await page.locator(".performance-monitor__value").textContent().catch(() => null);
  if (fpsText) console.log(`    FPS(rAF): ${fpsText}`);
  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const beat of beats) {
      console.log(`[${beat.name}]`);
      try { await shot(browser, beat); }
      catch (e) { console.log(`  ERROR: ${e.message}`); }
    }
  } finally { await browser.close(); }
}
main();
