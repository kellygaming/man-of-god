import type { Metadata, Viewport } from 'next';
import { Montserrat, Great_Vibes, Archivo } from 'next/font/google';
import { SITE } from '@/data/site';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Archivo porte un axe de largeur : c'est ce qui permet d'obtenir le lettrage
// très large du logo AURA. Remplacer par la police de la marque le jour où le
// fichier est disponible.
const logo = Archivo({
  subsets: ['latin'],
  // Police variable : la graisse et la largeur se règlent en CSS, ce qui permet
  // le lettrage très large du logo sans charger plusieurs fichiers.
  weight: 'variable',
  axes: ['wdth'],
  variable: '--font-logo',
  display: 'swap',
});

const script = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: 'website',
    locale: 'fr_CI',
    siteName: SITE.name,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${script.variable} ${logo.variable}`}>
      <body id="top">{children}</body>
    </html>
  );
}
