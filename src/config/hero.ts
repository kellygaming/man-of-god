import type { KeyframeSet, FrameSet } from '@/components/ScrollHero/engine';

/**
 * Images clés générées sur Higgsfield (GPT Image 2, 2k, 16:9). Elles servent
 * de repli quand la séquence n'est pas disponible, et de départ et d'arrivée
 * au clip vidéo.
 *
 * Elles sont servies depuis le CDN Higgsfield le temps de la maquette.
 * AVANT LA MISE EN LIGNE : télécharger les fichiers dans
 * `public/hero/keyframes/` et passer sur `HERO_KEYFRAMES_LOCAL` — un CDN tiers
 * n'est pas une dépendance acceptable pour le premier écran du site.
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3HJdujTPUatDr1wioMxqGRiB5kw';

export const HERO_KEYFRAMES: KeyframeSet = {
  hoodie: `${CDN}/hf_20260910_141007_3241e596-32a1-4849-a6d1-0a3e096dbc58.png`,
  fabric: `${CDN}/hf_20260910_141007_5e6abca3-f83b-4b16-819b-04a468903af5.png`,
};

/** Chemins locaux, à activer une fois les fichiers copiés dans public/. */
export const HERO_KEYFRAMES_LOCAL: KeyframeSet = {
  hoodie: '/hero/keyframes/k1-hoodie.png',
  fabric: '/hero/keyframes/k2-fabric.png',
};

/**
 * Séquence extraite du clip par `scripts/extract-frames.sh`.
 * `count` doit correspondre au nombre réel de fichiers : le script l'affiche
 * à la fin de l'extraction.
 */
export const HERO_FRAMES: FrameSet = {
  count: 187,
  path: '/hero/frames/16x9/',
};

/** Séquence 9:16, à remplir quand le clip sera tourné au format mobile. */
export const HERO_FRAMES_MOBILE: FrameSet | null = null;

/**
 * Bascule le hero en mode production dès que les frames sont présentes.
 * Se règle dans `.env.local`.
 */
export const HERO_MODE = (process.env.NEXT_PUBLIC_HERO_MODE ?? 'keyframes') as 'frames' | 'keyframes';
