/**
 * Catalogue MAN OF GOD.
 *
 * Les visuels sont générés sur Higgsfield avec un cadrage unique — pièce seule,
 * de face, fond charbon, même lumière — pour que la grille de la boutique tienne
 * comme une seule série. Ils sont servis depuis le CDN Higgsfield le temps de la
 * maquette : à télécharger dans `public/products/` avant la mise en ligne.
 */

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3HJdujTPUatDr1wioMxqGRiB5kw';

export type ProductLine = 'MOG' | 'WOG';
export type ProductCategory = 'Pull' | 'T-shirt' | 'Top';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  line: ProductLine;
  category: ProductCategory;
  /** Prix unitaire en francs CFA. */
  priceXof: number;
  /** Détail du vêtement : visuel au dos, ou particularité de la coupe. */
  detail: string;
  colors: ProductColor[];
  sizes: string[];
  image: string;
  /** Texte alternatif de l'image, pour les lecteurs d'écran. */
  alt: string;
}

const COLORS = {
  black: { name: 'Noir', hex: '#111111' },
  grey: { name: 'Gris', hex: '#8a8a8a' },
  white: { name: 'Blanc', hex: '#f4f2ee' },
  pink: { name: 'Rose', hex: '#eda9c4' },
  taupe: { name: 'Taupe délavé', hex: '#a08a76' },
  stone: { name: 'Gris délavé', hex: '#b3b1ad' },
} as const satisfies Record<string, ProductColor>;

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

/**
 * Offre en vigueur sur les tops, annoncée sur la boutique et reprise dans le
 * message de commande.
 */
export const TOP_BUNDLE = {
  quantity: 2,
  priceXof: 11000,
} as const;

export const PRODUCTS: Product[] = [
  {
    slug: 'pull-man-of-god',
    name: 'Pull MAN OF GOD',
    line: 'MOG',
    category: 'Pull',
    priceXof: 15000,
    detail: 'Les trois croix du Calvaire au dos',
    colors: [COLORS.black, COLORS.grey, COLORS.white],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161206_cf664aa9-89d8-4836-9869-ff606b580d7d.png`,
    alt: 'Pull à capuche noir MAN OF GOD, sérigraphie blanche et rouge sur la poitrine',
  },
  {
    slug: 'pull-woman-of-god',
    name: 'Pull WOMAN OF GOD',
    line: 'WOG',
    category: 'Pull',
    priceXof: 15000,
    detail: 'Les trois croix du Calvaire au dos',
    colors: [COLORS.black, COLORS.grey, COLORS.white],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161256_70eae80f-abdb-487c-a547-a3535f7c0ee7.png`,
    alt: 'Pull à capuche noir WOMAN OF GOD, sérigraphie blanche et rouge sur la poitrine',
  },
  {
    slug: 'tshirt-delave-man-of-god',
    name: 'T-shirt délavé MAN OF GOD',
    line: 'MOG',
    category: 'T-shirt',
    priceXof: 8000,
    detail: 'Au dos : « De Christ, par Christ, pour Christ » — Romains 11:36',
    colors: [COLORS.taupe],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161206_7aca93e2-2931-4cf3-bfc8-5f7222a19f09.png`,
    alt: 'T-shirt oversize délavé taupe MAN OF GOD, petite croix et logotype sur la poitrine',
  },
  {
    slug: 'tshirt-delave-woman-of-god',
    name: 'T-shirt délavé WOMAN OF GOD',
    line: 'WOG',
    category: 'T-shirt',
    priceXof: 8000,
    detail: 'Les trois croix du Calvaire au dos',
    colors: [COLORS.stone],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161258_861e769b-6deb-4b94-b242-b6d8d54e0fbd.png`,
    alt: 'T-shirt oversize délavé gris WOMAN OF GOD, logotype noir et rouge sur la poitrine',
  },
  {
    slug: 'tshirt-woman-of-god',
    name: 'T-shirt WOMAN OF GOD',
    line: 'WOG',
    category: 'T-shirt',
    priceXof: 8000,
    detail: 'Au dos : dessin au trait — 2 Corinthiens 6:18',
    colors: [COLORS.white, COLORS.black],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161206_cb665ba4-6b1a-4af0-90c7-fd2d4465464d.png`,
    alt: 'T-shirt blanc WOMAN OF GOD, petit logotype noir et rouge sur la poitrine',
  },
  {
    slug: 'tshirt-man-of-god',
    name: 'T-shirt MAN OF GOD',
    line: 'MOG',
    category: 'T-shirt',
    priceXof: 8000,
    detail: 'Les trois croix du Calvaire au dos',
    colors: [COLORS.white, COLORS.black],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161206_80d4ef33-741a-412c-b135-97a03188ca02.png`,
    alt: 'T-shirt oversize blanc MAN OF GOD, petit logotype noir sur la poitrine',
  },
  {
    slug: 'top-woman-of-god-manches-courtes',
    name: 'Top WOMAN OF GOD manches courtes',
    line: 'WOG',
    category: 'Top',
    priceXof: 6000,
    detail: 'Coupe ajustée, maille côtelée',
    colors: [COLORS.black, COLORS.white],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161206_5b6dfd1e-b470-4027-bb0b-bacbd2dde7b6.png`,
    alt: 'Top ajusté noir à manches courtes WOMAN OF GOD, petit logotype sur la poitrine',
  },
  {
    slug: 'top-woman-of-god-manches-longues',
    name: 'Top WOMAN OF GOD manches longues',
    line: 'WOG',
    category: 'Top',
    priceXof: 6000,
    detail: 'Coupe ajustée, maille côtelée',
    colors: [COLORS.black, COLORS.pink, COLORS.white],
    sizes: SIZES,
    image: `${CDN}/hf_20260910_161206_efbabf60-d671-4ed8-8fb6-134c5b0e993c.png`,
    alt: 'Top ajusté noir à manches longues WOMAN OF GOD, petit logotype sur la poitrine',
  },
];

/** Ordre d'affichage des filtres de catégorie. */
export const CATEGORIES: ProductCategory[] = ['Pull', 'T-shirt', 'Top'];

/** Prix formaté avec des espaces insécables : « 15 000 FCFA » ne se coupe pas. */
export function formatPrice(priceXof: number) {
  return `${priceXof.toLocaleString('fr-FR').replace(/\s/g, ' ')} FCFA`;
}
