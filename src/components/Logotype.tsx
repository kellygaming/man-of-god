import styles from './logotype.module.css';

export interface LogotypeProps {
  className?: string;
}

/**
 * Logotype de la marque : AURA en large et gras, BRAND en petit dessous, aligné
 * à droite, comme sur le logo rond.
 *
 * Le lettrage est composé en Archivo très large et très gras, l'approche libre
 * la plus proche de la police du logo. Pour un rendu strictement identique, il
 * suffit de déposer le fichier de la police de la marque et de changer
 * `--font-logo` : rien d'autre ne bouge.
 */
export default function Logotype({ className }: LogotypeProps) {
  return (
    <span className={`${styles.logo} ${className ?? ''}`}>
      <span className={styles.aura}>Aura</span>
      <span className={styles.brand}>Brand</span>
    </span>
  );
}
