import styles from './sections.module.css';

const SPECS = [
  ['Matière', 'Molleton 100 % coton brossé, 380 g/m²'],
  ['Impression', 'Sérigraphie haute densité, encres à l’eau'],
  ['Coupe', 'Oversize, épaules tombantes'],
  ['Tailles', 'S · M · L · XL · XXL'],
  ['Entretien', 'Lavage à 30°, envers, sans sèche-linge'],
];

export default function Material() {
  return (
    <section className="section" id="matiere">
      <div className="container">
        <div className={styles.split}>
          <div>
            <p className="eyebrow">La matière</p>
            <h2>
              Un coton lourd,
              <br />
              une main douce.
            </h2>
            <p>
              Le tissu est le premier message de la marque. Nous travaillons un molleton épais,
              brossé à l’intérieur, qui garde sa forme lavage après lavage. La sérigraphie est
              posée en haute densité pour que le lettrage reste net et souple au toucher.
            </p>
          </div>
          <ul className={styles.specs}>
            {SPECS.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
