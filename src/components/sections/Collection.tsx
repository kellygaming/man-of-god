import Link from 'next/link';
import ProductCard from '@/components/shop/ProductCard';
import shopStyles from '@/components/shop/shop.module.css';
import { PRODUCTS } from '@/data/products';
import styles from './sections.module.css';

/** Aperçu de la collection sur l'accueil : quatre pièces, puis la boutique. */
const PREVIEW_SLUGS = [
  'tshirt-delave-man-of-god',
  'tshirt-delave-woman-of-god',
  'tshirt-cielos',
  'top-woman-of-god-manches-longues',
];

const PREVIEW = PREVIEW_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p),
);

export default function Collection() {
  return (
    <section className="section" id="collection">
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className="eyebrow">Collection MOG &amp; WOG</p>
            <h2>La collection</h2>
          </div>
          <p>
            Pulls, t-shirts et tops, du S au XXL. Livraison partout à Abidjan, paiement à la
            livraison.
          </p>
        </header>

        <ul className={shopStyles.grid}>
          {PREVIEW.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>

        <div className={styles.more}>
          <Link className="button" href="/boutique">
            Voir toute la boutique
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
