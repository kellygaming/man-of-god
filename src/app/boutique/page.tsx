import type { Metadata } from 'next';
import Link from 'next/link';
import Shop from '@/components/shop/Shop';
import Footer from '@/components/sections/Footer';
import Logotype from '@/components/Logotype';
import { SITE, orderLink } from '@/data/site';
import styles from './boutique.module.css';

export const metadata: Metadata = {
  title: 'Boutique',
  description:
    'Pulls, t-shirts et tops MAN OF GOD et WOMAN OF GOD. Livraison à Abidjan, commande par WhatsApp.',
};

export default function BoutiquePage() {
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link className={styles.brand} href="/" aria-label="AURA BRAND, accueil">
            <Logotype />
          </Link>
          <nav className={styles.nav} aria-label="Navigation">
            <Link href="/">Accueil</Link>
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className={styles.intro}>
              <p className="eyebrow">Collection MOG &amp; WOG</p>
              <h1 className={styles.title}>Boutique</h1>
              <p className={styles.lede}>
                Coton lourd, sérigraphie haute densité, coupes oversize et ajustées. Toutes les
                pièces sont disponibles de la taille S au XXL. Commande par WhatsApp, paiement à la
                livraison à {SITE.city}.
              </p>
            </div>

            <Shop />

            <aside className={styles.help}>
              <p>Une taille, une couleur ou une pièce qui n’apparaît pas ici ?</p>
              <a className="button button--solid" href={orderLink()} target="_blank" rel="noreferrer">
                Nous écrire sur WhatsApp
              </a>
            </aside>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
