import playwright from '/Users/macmini/quote-intake/node_modules/playwright/index.js';
import { resolve } from 'node:path';

const { chromium } = playwright;
const root = resolve(import.meta.dirname, '..');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`file://${resolve(root, 'cv.html')}?print=1`, { waitUntil: 'networkidle' });
await page.pdf({
  path: resolve(root, 'assets/arnaud-derhan-cv.pdf'),
  format: 'A4',
  scale: 0.78,
  printBackground: true,
  margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' }
});
await browser.close();
