// Screenshot every skin at mobile + desktop sizes so Claude can see the rendered result.
// Runs in GitHub Actions (cloud Chrome via Playwright). Output: shots/*.png (uploaded as an artifact).
import { chromium } from 'playwright';
import fs from 'fs';

const KEYS = ['pixel','cyber','rain','vapor','gameboy','matrix','lofi','forest','space','dungeon'];
const url = 'file://' + process.cwd() + '/index.html';
const out = 'shots';
fs.mkdirSync(out, { recursive: true });

const views = [
  { name: 'mobile',  vp: { width: 390, height: 844 },  isMobile: true,  dsf: 2, full: true  },
  { name: 'desktop', vp: { width: 1280, height: 800 }, isMobile: false, dsf: 1, full: false },
];

const browser = await chromium.launch();
for (const v of views) {
  const ctx = await browser.newContext({
    viewport: v.vp, deviceScaleFactor: v.dsf, isMobile: v.isMobile, hasTouch: v.isMobile,
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log(`PAGEERROR[${v.name}]`, e.message));
  await page.goto(url, { waitUntil: 'load' });
  // start playback so beat-reactive layers (synthwave/vapor spectrum, etc.) are visible
  await page.evaluate(() => { try { start(); } catch (e) {} });
  for (const k of KEYS) {
    await page.evaluate((key) => { try { setSection(key); } catch (e) { document.body.dataset.skin = key; } }, k);
    await page.waitForTimeout(1100); // let the canvas scenes render/animate a few frames
    await page.screenshot({ path: `${out}/${v.name}-${k}.png`, fullPage: v.full });
    console.log(`shot ${v.name}-${k}`);
  }
  await ctx.close();
}
await browser.close();
console.log('done');
