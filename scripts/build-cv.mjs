import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const data = JSON.parse(await readFile(resolve(root, 'data/cv.json'), 'utf8'));
const template = await readFile(resolve(root, 'cv.template.html'), 'utf8');
const printTemplate = await readFile(resolve(root, 'cv-print.template.html'), 'utf8');

for (const field of [
  'identity',
  'headline',
  'subheadline',
  'summary',
  'pdf',
  'lenses',
  'capabilities',
  'proofs',
  'experience',
  'education',
  'languages'
]) {
  if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
    throw new Error(`Champ CV requis absent : ${field}`);
  }
}

for (const field of ['name', 'location', 'phone', 'email', 'portfolio']) {
  if (!data.identity[field]) throw new Error(`Identité CV incomplète : ${field}`);
}

const output = template.replace('/*__CV_DATA__*/', `window.CV_DATA = ${JSON.stringify(data).replaceAll('<', '\\u003c')};`);
if (output === template) throw new Error('Marqueur de données introuvable');
await writeFile(resolve(root, 'cv.html'), output);
const printOutput = printTemplate.replace('/*__CV_DATA__*/', `window.CV_DATA = ${JSON.stringify(data).replaceAll('<', '\\u003c')};`);
if (printOutput === printTemplate) throw new Error('Marqueur de données PDF introuvable');
await writeFile(resolve(root, 'cv-print.html'), printOutput);
console.log('cv.html et cv-print.html générés');
