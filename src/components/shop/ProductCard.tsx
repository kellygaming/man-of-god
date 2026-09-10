import Image from 'next/image';
import { formatPrice, TOP_BUNDLE, type Product } from '@/data/products';
import { orderLink } from '@/data/site';
import styles from './shop.module.css';

export interface ProductCardProps {
  product: Product;
  /** Charge l'image sans attendre le défilement, pour les premières cartes. */
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const isTop = product.category === 'Top';

  return (
    <li className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 23vw"
          className={styles.image}
          priority={priority}
        />
        <span className={styles.badge}>{product.line}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.detail}>{product.detail}</p>

        <ul className={styles.swatches} aria-label="Couleurs disponibles">
          {product.colors.map((color) => (
            <li
              key={color.name}
              className={styles.swatch}
              style={{ background: color.hex }}
              title={color.name}
            >
              <span className={styles.srOnly}>{color.name}</span>
            </li>
          ))}
          <li className={styles.sizes}>{product.sizes.join(' · ')}</li>
        </ul>

        <p className={styles.price}>
          {formatPrice(product.priceXof)}
          {isTop && (
            <span className={styles.bundle}>
              {TOP_BUNDLE.quantity} pour {formatPrice(TOP_BUNDLE.priceXof)}
            </span>
          )}
        </p>

        <a
          className={`button ${styles.cta}`}
          href={orderLink(product.name)}
          target="_blank"
          rel="noreferrer"
        >
          Commander
        </a>
      </div>
    </li>
  );
}
