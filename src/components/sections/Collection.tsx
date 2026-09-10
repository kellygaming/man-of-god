import { PRODUCTS, formatPrice } from '@/data/products';
import { orderLink } from '@/data/site';
import Wordmark from '@/components/Wordmark';
import styles from './sections.module.css';

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
            Quatre pièces, deux lignes. Disponibles en blanc, gris et noir, de la taille S au XXL.
            Livraison partout à Abidjan.
          </p>
        </header>

        <ul className={styles.grid}>
          {PRODUCTS.map((product) => (
              <li key={product.slug} className={styles.card}>
                <div className={styles.thumb}>
                  <span className={styles.badge}>{product.line}</span>
                  <Wordmark className={styles.thumbText} top={product.wordmarkTop} />
                </div>
                <div className={styles.body}>
                  <h3>{product.name}</h3>
                  <p className={styles.meta}>Dos : {product.back}</p>
                  <ul className={styles.swatches} aria-label="Couleurs disponibles">
                    {product.colors.map((color) => (
                      <li
                        key={color.name}
                        className={styles.swatch}
                        style={{ background: color.hex }}
                        title={color.name}
                      />
                    ))}
                    <li className={styles.meta}>{product.sizes.join(' · ')}</li>
                  </ul>
                  <p className={styles.price}>{formatPrice(product.priceXof)}</p>
                  <a
                    className={`button ${styles.cardCta}`}
                    href={orderLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Commander
                  </a>
                </div>
              </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
