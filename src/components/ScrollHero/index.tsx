'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollHero, type ScrollHeroOptions } from './engine';
import styles from './hero.module.css';
import { SITE } from '@/data/site';
import Wordmark from '@/components/Wordmark';

export interface ScrollHeroProps {
  options: ScrollHeroOptions;
}

export default function Hero({ options }: ScrollHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const instance = new ScrollHero(root, {
      ...optionsRef.current,
      onReady: () => setReady(true),
    });
    return () => instance.destroy();
    // Le hero se construit une seule fois : ses options sont lues via la ref.
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} aria-label="MAN OF GOD, nouvelle collection">
      <div className={styles.sticky} data-hero-sticky>
        <canvas className={styles.canvas} aria-hidden="true" />

        <div className={`${styles.loader} ${ready ? styles.loaderHidden : ''}`} aria-hidden="true">
          <span>Man of God</span>
        </div>

        <div className={styles.ui}>
          <nav className={styles.nav} aria-label="Navigation principale">
            <a className={styles.brand} href="#top" aria-label="MAN OF GOD, accueil">
              <Wordmark top="Man" bottom="God" inline />
            </a>
            <ul className={styles.navLinks}>
              <li><a href="#collection">Collection</a></li>
              <li><a href="#matiere">La matière</a></li>
              <li><a href="#commander">Commander</a></li>
            </ul>
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
          </nav>

          <div className={styles.stage}>
            {/* Ouverture — le vêtement */}
            <div className={`${styles.chapter} ${styles.intro}`} data-chapter="intro">
              <p className="eyebrow">Nouvelle collection — MOG &amp; WOG</p>
              <h1 className={styles.title}>
                <Wordmark top="Man" bottom="God" />
              </h1>
            </div>

            {/* Milieu de course — la matière */}
            <div className={`${styles.chapter} ${styles.texture}`} data-chapter="texture">
              <p className="eyebrow label">La matière</p>
              <h2>Un coton lourd, une main douce.</h2>
              <p>
                Molleton 100 % coton brossé, sérigraphie haute densité. Conçu pour durer, pensé pour
                être porté tous les jours.
              </p>
            </div>

            {/* Fin de course — l'appel à l'action, sur le tissu presque noir */}
            <div className={`${styles.chapter} ${styles.outro}`} data-chapter="outro">
              <h2>
                Porté avec foi.
                <br />
                Porté avec style.
              </h2>
              <a className="button" href="#collection">
                Découvrir la collection
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.footer}>
            <span className={styles.hint}>
              <i /> Scroll
            </span>
            <span className={styles.progress}>
              <i />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
