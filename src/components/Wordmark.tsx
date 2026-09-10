import styles from './wordmark.module.css';

export interface WordmarkProps {
  /** Mot du haut : « MAN », « WOMAN », « MOG »… */
  top: string;
  /** Mot du bas, à droite du « of ». */
  bottom?: string;
  /** Sur une seule ligne, pour la navigation et les libellés courts. */
  inline?: boolean;
  className?: string;
}

/**
 * Logotype de la marque, repris de la sérigraphie : le mot du haut, puis le
 * « of » manuscrit rouge qui déborde à gauche du mot du bas.
 * Toutes les occurrences du site passent par ce composant pour rester alignées.
 */
export default function Wordmark({ top, bottom = 'GOD', inline = false, className }: WordmarkProps) {
  if (inline) {
    return (
      <span className={`${styles.inline} ${className ?? ''}`}>
        {top} <em className={styles.of}>of</em> {bottom}
      </span>
    );
  }

  return (
    <span className={`${styles.stack} ${className ?? ''}`}>
      <span className={styles.top}>{top}</span>
      <span className={styles.bottomRow}>
        <em className={styles.of}>of</em>
        <span className={styles.bottom}>{bottom}</span>
      </span>
    </span>
  );
}
