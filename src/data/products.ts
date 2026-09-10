/**
 * Catalogue AURA BRAND.
 *
 * Les visuels sont les photos de la marque, détourées et posées sur une planche
 * de fond commune : la grille tient comme une seule série sans qu'aucun vêtement
 * n'ait été redessiné. Ils vivent dans `public/products/`, nommés d'après le slug.
 *
 * Trois pièces attendent encore leur composition. Leur visuel est généré à
 * partir de la vraie photo du vêtement et de la planche composée prise comme
 * référence de décor, et servi depuis le CDN Higgsfield. Avant la mise en ligne, `node
 * scripts/localise-products.mjs` les rapatrie dans `public/products/` et réécrit
 * ce fichier : le catalogue ne doit pas dépendre d'un service tiers.
 *
 * `image: null` marque une pièce sans aucun visuel : la carte affiche alors un
 * cadre « visuel à venir » et reste commandable.
 */

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3HJdujTPUatDr1wioMxqGRiB5kw';

export type ProductLine = 'MOG' | 'WOG' | 'CIELOS';
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
  /** Chemin du visuel, ou `null` tant que la photo n'est pas composée. */
  image: string | null;
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
    image: `${CDN}/hf_20260910_195921_dc227150-4b6e-4779-95d9-c7f6306b9756.png`,
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
    image: `${CDN}/hf_20260910_195921_a88ea69d-ab89-47b3-99e2-a3ebed39eff2.png`,
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
    image: '/products/tshirt-delave-man-of-god.jpg',
    alt: 'T-shirt oversize délavé taupe MAN OF GOD, vu de face et de dos',
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
    image: '/products/tshirt-delave-woman-of-god.jpg',
    alt: 'T-shirt oversize délavé gris WOMAN OF GOD, vu de face et de dos',
  },
  {
    slug: 'tshirt-manches-longues-woman-of-god',
    name: 'T-shirt manches longues WOMAN OF GOD',
    line: 'WOG',
    category: 'T-shirt',
    priceXof: 8000,
    detail: 'Dessin au trait : le berger et l’agneau',
    colors: [COLORS.white],
    sizes: SIZES,
    image: '/products/tshirt-manches-longues-woman-of-god.jpg',
    alt: 'T-shirt blanc à manches longues WOMAN OF GOD, avec un dessin au trait',
  },
  {
    slug: 'tshirt-cielos',
    name: 'T-shirt CIELOS',
    line: 'CIELOS',
    category: 'T-shirt',
    priceXof: 8000,
    detail: 'Au dos : dessin au trait — Éphésiens 2:19',
    colors: [COLORS.white],
    sizes: SIZES,
    image: '/products/tshirt-cielos.jpg',
    alt: 'T-shirt blanc CIELOS, vu de face et de dos',
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
    image: `${CDN}/hf_20260910_195921_1a99a798-2477-4b52-9dfd-1722b2a23781.png`,
    alt: 'T-shirt oversize blanc MAN OF GOD, vu de face et de dos',
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
    image: '/products/top-woman-of-god-manches-courtes.jpg',
    alt: 'Top ajusté WOMAN OF GOD à manches courtes, en noir et en blanc',
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
    image: '/products/top-woman-of-god-manches-longues.jpg',
    alt: 'Top ajusté WOMAN OF GOD à manches longues, en blanc, rose et noir',
  },
];

/** Ordre d'affichage des filtres de catégorie. */
export const CATEGORIES: ProductCategory[] = ['Pull', 'T-shirt', 'Top'];

/** Prix formaté avec des espaces insécables : « 15 000 FCFA » ne se coupe pas. */
export function formatPrice(priceXof: number) {
  return `${priceXof.toLocaleString('fr-FR').replace(/\s/g, ' ')} FCFA`;
}
