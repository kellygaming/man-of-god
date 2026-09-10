import { SITE, orderLink } from '@/data/site';
import styles from './sections.module.css';

export default function Order() {
  return (
    <section className="section" id="commander">
      <div className={`container ${styles.contact}`}>
        <p className="eyebrow">Commandes</p>
        <h2>
          Une pièce vous plaît&nbsp;?
        </h2>
        <p>
          Écrivez-nous sur WhatsApp ou appelez directement. Nous confirmons la taille, la couleur et
          la livraison dans la foulée. Paiement à la livraison sur {SITE.city}.
        </p>
        <div className={styles.actions}>
          <a className="button button--solid" href={orderLink()} target="_blank" rel="noreferrer">
            Commander sur WhatsApp
          </a>
          <a className="button" href={`tel:${SITE.phone}`}>
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
