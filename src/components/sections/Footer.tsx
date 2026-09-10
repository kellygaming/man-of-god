import { SITE } from '@/data/site';
import styles from './sections.module.css';

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`container ${styles.footerInner}`}>
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <a href={SITE.tiktok} target="_blank" rel="noreferrer">
          TikTok {SITE.tiktokHandle}
        </a>
        <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
      </div>
    </footer>
  );
}
