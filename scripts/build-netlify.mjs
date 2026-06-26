import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const manifestPath = path.join(rootDir, 'public', 'build', 'manifest.json');
const outputPath = path.join(rootDir, 'public', 'index.html');

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest file not found. Run the Vite build first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const entry = manifest['resources/js/main.tsx'];

if (!entry) {
  console.error('Entry point resources/js/main.tsx was not found in the manifest.');
  process.exit(1);
}

const cssTags = (entry.css || [])
  .map((asset) => `    <link rel="stylesheet" href="/build/${asset}">`)
  .join('\n');

const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Gorden Yulie Batu - Company profile dan katalog produk interior." />
    <title>Gorden Yulie Batu</title>
${cssTags ? `    ${cssTags.replace(/\n/g, '\n    ')}\n` : ''}  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/build/${entry.file}"></script>
  </body>
</html>
`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log(`Generated Netlify entry page at ${path.relative(rootDir, outputPath)}`);
