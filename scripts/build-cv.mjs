import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const data = JSON.parse(await readFile(resolve(root, 'data/cv.json'), 'utf8'));
const template = await readFile(resolve(root, 'cv.template.html'), 'utf8');

for (const field of ['identity', 'headline', 'summary', 'lenses', 'capabilities', 'proofs', 'experience']) {
  if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
    throw new Error(`Champ CV requis absent : ${field}`);
  }
}

const output = template.replace('/*__CV_DATA__*/', `window.CV_DATA = ${JSON.stringify(data).replaceAll('<', '\\u003c')};`);
if (output === template) throw new Error('Marqueur de données introuvable');
await writeFile(resolve(root, 'cv.html'), output);
console.log(`cv.html généré — ${data.meta.version}`);
