import playwright from '/Users/macmini/quote-intake/node_modules/playwright/index.js';
import { resolve } from 'node:path';

const { chromium } = playwright;
const root = resolve(import.meta.dirname, '..');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`file://${resolve(root, 'cv-print.html')}`, { waitUntil: 'networkidle' });
await page.pdf({
  path: resolve(root, 'assets/arnaud-derhan-cv.pdf'),
  format: 'A4',
  scale: 1,
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' }
});
await browser.close();
