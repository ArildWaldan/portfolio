import playwright from '/Users/macmini/quote-intake/node_modules/playwright/index.js';
import { resolve } from 'node:path';

const { chromium } = playwright;
const root = resolve(import.meta.dirname, '..');
const browser = await chromium.launch({ headless: true });
for (const shot of [
  { path: '/tmp/cv-desktop.png', viewport: { width: 1440, height: 1000 } },
  { path: '/tmp/cv-mobile.png', viewport: { width: 390, height: 844 }, mobile: true }
]) {
  const page = await browser.newPage({ viewport: shot.viewport, isMobile: Boolean(shot.mobile) });
  await page.goto(`file://${resolve(root, 'cv.html')}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: shot.path, fullPage: true });
}
await browser.close();
