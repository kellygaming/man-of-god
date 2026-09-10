#!/usr/bin/env node
/**
 * Rapatrie les visuels produit du CDN Higgsfield vers `public/products/`, puis
 * réécrit `src/data/products.ts` pour pointer sur les fichiers locaux.
 *
 *   node scripts/localise-products.mjs
 *
 * À lancer une fois, avant la mise en ligne : le catalogue ne doit pas dépendre
 * d'un CDN tiers. Le script est idempotent et n'écrase rien s'il échoue.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DATA = 'src/data/products.ts';
const OUT_DIR = 'public/products';

const source = await readFile(DATA, 'utf8');

// Chaque entrée du catalogue expose un slug puis une URL construite depuis CDN.
const entries = [...source.matchAll(/slug: '([^']+)'[\s\S]*?image: `\$\{CDN\}(\/[^`]+)`/g)].map(
  ([, slug, path]) => ({ slug, path }),
);

if (entries.length === 0) {
  console.log('Aucune image distante à rapatrier : le catalogue est déjà local.');
  process.exit(0);
}

const cdn = source.match(/const CDN = '([^']+)'/)?.[1];
if (!cdn) throw new Error('Constante CDN introuvable dans ' + DATA);

await mkdir(OUT_DIR, { recursive: true });

let rewritten = source;
for (const { slug, path } of entries) {
  const url = cdn + path;
  const ext = path.split('.').pop();
  const file = `${slug}.${ext}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  await writeFile(join(OUT_DIR, file), Buffer.from(await response.arrayBuffer()));
  console.log(`${file}  ←  ${url}`);

  rewritten = rewritten.replace(`\`\${CDN}${path}\``, `'/products/${file}'`);
}

// La constante et son commentaire n'ont plus d'objet une fois tout rapatrié.
rewritten = rewritten
  .replace(/ Ils sont servis depuis le CDN Higgsfield le temps de la\n \* maquette : à télécharger dans `public\/products\/` avant la mise en ligne\.\n/, '\n')
  .replace(/\nconst CDN = '[^']+';\n/, '');

await writeFile(DATA, rewritten);
console.log(`\n${entries.length} visuels rapatriés. Pensez à retirer remotePatterns de next.config.mjs.`);
