export interface Product {
  slug: string;
  name: string;
  line: 'MOG' | 'WOG';
  category: 'Hoodie' | 'T-shirt' | 'Ensemble';
  /** Prix en francs CFA. `null` = prix à confirmer, affiché « sur demande ». */
  priceXof: number | null;
  colors: { name: string; hex: string }[];
  sizes: string[];
  /** Mot du haut du logotype imprimé sur la poitrine (« MAN », « WOMAN »). */
  wordmarkTop: string;
  /** Description du visuel imprimé au dos. */
  back: string;
  image: string;
}

const COLORS = {
  black: { name: 'Noir', hex: '#0a0a0a' },
  grey: { name: 'Gris', hex: '#8a8a8a' },
  white: { name: 'Blanc', hex: '#f4f2ee' },
};

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const PRODUCTS: Product[] = [
  {
    slug: 'hoodie-man-of-god',
    name: 'Hoodie MAN OF GOD',
    line: 'MOG',
    category: 'Hoodie',
    priceXof: 15000,
    colors: [COLORS.black, COLORS.grey, COLORS.white],
    sizes: SIZES,
    wordmarkTop: 'MAN',
    back: 'Les trois croix du Calvaire',
    image: '/products/hoodie-mog.webp',
  },
  {
    slug: 'hoodie-woman-of-god',
    name: 'Hoodie WOMAN OF GOD',
    line: 'WOG',
    category: 'Hoodie',
    priceXof: 15000,
    colors: [COLORS.black, COLORS.grey, COLORS.white],
    sizes: SIZES,
    wordmarkTop: 'WOMAN',
    back: 'Les trois croix du Calvaire',
    image: '/products/hoodie-wog.webp',
  },
  {
    slug: 'tshirt-woman-of-god',
    name: 'T-shirt WOMAN OF GOD',
    line: 'WOG',
    category: 'T-shirt',
    priceXof: null,
    colors: [COLORS.white, COLORS.black],
    sizes: SIZES,
    wordmarkTop: 'WOMAN',
    back: 'Line art — 2 Corinthiens 6:18',
    image: '/products/tshirt-wog.webp',
  },
  {
    slug: 'tshirt-man-of-god',
    name: 'T-shirt MAN OF GOD',
    line: 'MOG',
    category: 'T-shirt',
    priceXof: null,
    colors: [COLORS.white, COLORS.black],
    sizes: SIZES,
    wordmarkTop: 'MAN',
    back: 'Les trois croix du Calvaire',
    image: '/products/tshirt-mog.webp',
  },
];

export function formatPrice(priceXof: number | null) {
  if (priceXof === null) return 'Prix sur demande';
  return `${priceXof.toLocaleString('fr-FR')} FCFA`;
}
