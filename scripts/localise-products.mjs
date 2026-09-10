#!/usr/bin/env node
/**
 * Rapatrie les visuels produit encore servis par le CDN Higgsfield vers
 * `public/products/`, puis réécrit `src/data/products.ts` pour pointer sur les
 * fichiers locaux.
 *
 *   node scripts/localise-products.mjs
 *
 * À lancer avant la mise en ligne : le catalogue ne doit pas dépendre d'un
 * service tiers. Le script est sans effet une fois tout rapatrié.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DATA = 'src/data/products.ts';
const OUT_DIR = 'public/products';

const source = await readFile(DATA, 'utf8');

// Le découpage se fait entrée par entrée : une expression qui balaierait tout
// le fichier apparierait le slug d'un produit avec l'image du suivant, et
// écraserait alors une photo déjà livrée.
const entries = source
  .split(/(?=\n  \{\n    slug: ')/)
  .map((block) => ({
    slug: block.match(/slug: '([^']+)'/)?.[1],
    path: block.match(/image: `\$\{CDN\}(\/[^`]+)`/)?.[1],
  }))
  .filter((entry) => entry.slug && entry.path);

if (entries.length === 0) {
  console.log('Aucun visuel distant : le catalogue est déjà entièrement local.');
  process.exit(0);
}

const cdn = source.match(/const CDN = '([^']+)'/)?.[1];
if (!cdn) throw new Error(`Constante CDN introuvable dans ${DATA}`);

await mkdir(OUT_DIR, { recursive: true });

let rewritten = source;
for (const { slug, path } of entries) {
  const url = cdn + path;
  const file = `${slug}.${path.split('.').pop()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  await writeFile(join(OUT_DIR, file), Buffer.from(await response.arrayBuffer()));
  console.log(`${file}  ←  ${url}`);

  rewritten = rewritten.replace(`\`\${CDN}${path}\``, `'/products/${file}'`);
}

// La constante n'a plus d'objet une fois le dernier visuel rapatrié.
rewritten = rewritten.replace(/\nconst CDN = '[^']+';\n/, '');

await writeFile(DATA, rewritten);
console.log(
  `\n${entries.length} visuels rapatriés. Retirez maintenant remotePatterns de next.config.mjs.`,
);
