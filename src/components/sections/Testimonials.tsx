import { TESTIMONIALS, type Testimonial } from '@/data/testimonials';
import { SITE } from '@/data/site';
import styles from './testimonials.module.css';

/**
 * Trois colonnes qui défilent verticalement à des vitesses différentes, en CSS
 * pur : la boucle est un simple `translateY` de -50 % sur une liste dupliquée,
 * ce qui évite d'embarquer une bibliothèque d'animation pour un seul bandeau.
 *
 * Le défilement s'arrête au survol pour qu'un commentaire reste lisible, et
 * `prefers-reduced-motion` le remplace par une grille fixe.
 */
function Column({ items, speed, className }: { items: Testimonial[]; speed: number; className?: string }) {
  return (
    <div className={`${styles.column} ${className ?? ''}`}>
      <ul className={styles.track} style={{ ['--duration' as string]: `${speed}s` }}>
        {items.map((t) => (
          <Card key={t.name} testimonial={t} />
        ))}
        {/* Copie de la liste : c'est elle qui rend la boucle continue. */}
        {items.map((t) => (
          <Card key={`${t.name}-copie`} testimonial={t} ariaHidden />
        ))}
      </ul>
    </div>
  );
}

function Card({ testimonial, ariaHidden }: { testimonial: Testimonial; ariaHidden?: boolean }) {
  return (
    <li className={styles.card} aria-hidden={ariaHidden}>
      <p className={styles.text}>{testimonial.text}</p>
      <p className={styles.author}>
        <span className={styles.monogram} aria-hidden="true">
          {firstLetter(testimonial.name)}
        </span>
        {testimonial.name}
      </p>
    </li>
  );
}

/** Première lettre du pseudonyme, en ignorant les emoji de tête. */
function firstLetter(name: string) {
  const letter = [...name].find((c) => /\p{L}/u.test(c));
  return (letter ?? '•').toUpperCase();
}

const third = Math.ceil(TESTIMONIALS.length / 3);

export default function Testimonials() {
  return (
    <section className="section" id="avis" aria-label="Avis des clients">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">Avis</p>
          <h2>Ce que vous nous dites</h2>
          <p className={styles.lede}>
            Les commentaires laissés sous nos publications, repris tels quels.
            Retrouvez-nous sur TikTok&nbsp;: <a href={SITE.tiktok} target="_blank" rel="noreferrer">{SITE.tiktokHandle}</a>
          </p>
        </header>

        <div className={styles.columns}>
          <Column items={TESTIMONIALS.slice(0, third)} speed={38} />
          <Column items={TESTIMONIALS.slice(third, third * 2)} speed={48} className={styles.hideSmall} />
          <Column items={TESTIMONIALS.slice(third * 2)} speed={43} className={styles.hideMedium} />
        </div>
      </div>
    </section>
  );
}
