'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import {
  CATEGORIES,
  PRODUCTS,
  TOP_BUNDLE,
  formatPrice,
  type ProductCategory,
  type ProductLine,
} from '@/data/products';
import styles from './shop.module.css';

type LineFilter = ProductLine | 'all';
type CategoryFilter = ProductCategory | 'all';

const LINES: { value: LineFilter; label: string }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'MOG', label: 'MOG — Homme' },
  { value: 'WOG', label: 'WOG — Femme' },
  { value: 'CIELOS', label: 'Cielos' },
];

/** Pluriel des catégories pour les puces de filtre. */
const CATEGORY_LABEL: Record<ProductCategory, string> = {
  Pull: 'Pulls',
  'T-shirt': 'T-shirts',
  Top: 'Tops',
};

export default function Shop() {
  const [line, setLine] = useState<LineFilter>('all');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const visible = useMemo(() => {
    const matching = PRODUCTS.filter(
      (p) => (line === 'all' || p.line === line) && (category === 'all' || p.category === category),
    );
    // Les pièces photographiées passent devant : deux cadres « visuel à venir »
    // en tête de grille feraient une mauvaise première impression. Le tri
    // devient sans effet dès que toutes les photos sont livrées.
    return [...matching].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  }, [line, category]);

  return (
    <>
      <div className={styles.filters}>
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Ligne</legend>
          {LINES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.chip}
              aria-pressed={line === option.value}
              onClick={() => setLine(option.value)}
            >
              {option.label}
            </button>
          ))}
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.legend}>Pièce</legend>
          <button
            type="button"
            className={styles.chip}
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            Tout
          </button>
          {CATEGORIES.map((value) => (
            <button
              key={value}
              type="button"
              className={styles.chip}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {CATEGORY_LABEL[value]}
            </button>
          ))}
        </fieldset>
      </div>

      <p className={styles.count} role="status">
        {visible.length} pièce{visible.length > 1 ? 's' : ''}
        {visible.some((p) => p.category === 'Top') && (
          <>
            {' · '}
            <strong>
              {TOP_BUNDLE.quantity} tops pour {formatPrice(TOP_BUNDLE.priceXof)}
            </strong>
          </>
        )}
      </p>

      {visible.length > 0 ? (
        <ul className={styles.grid}>
          {visible.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 4} />
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Aucune pièce dans cette combinaison.</p>
      )}
    </>
  );
}
