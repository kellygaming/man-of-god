import type { KeyframeSet, FrameSet } from '@/components/ScrollHero/engine';

/**
 * Images clés générées sur Higgsfield (GPT Image 2, 2k, 16:9).
 *
 * Elles sont servies depuis le CDN Higgsfield le temps de la maquette.
 * AVANT LA MISE EN LIGNE : télécharger les 3 fichiers dans
 * `public/hero/keyframes/` et repasser sur des chemins locaux — un CDN tiers
 * n'est pas une dépendance acceptable pour le premier écran du site.
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3HJdujTPUatDr1wioMxqGRiB5kw';

export const HERO_KEYFRAMES: KeyframeSet = {
  hoodie: `${CDN}/hf_20260910_141007_3241e596-32a1-4849-a6d1-0a3e096dbc58.png`,
  fabric: `${CDN}/hf_20260910_141007_5e6abca3-f83b-4b16-819b-04a468903af5.png`,
  model: `${CDN}/hf_20260910_142558_40384ff1-eea9-4a0c-ae06-20da328ee916.png`,
};

/** Chemins locaux, à activer une fois les fichiers copiés dans public/. */
export const HERO_KEYFRAMES_LOCAL: KeyframeSet = {
  hoodie: '/hero/keyframes/k1-hoodie.png',
  fabric: '/hero/keyframes/k2-fabric.png',
  model: '/hero/keyframes/k3-model.png',
};

/**
 * Séquences d'images extraites des clips par `scripts/extract-frames.sh`.
 * `a` et `b` doivent correspondre au nombre réel de fichiers : le script
 * l'affiche à la fin de l'extraction.
 *
 * `b` est absent tant que le clip B (hoodie → mannequin) n'est pas tourné :
 * la séquence couvre alors les deux premiers actes et la révélation est jouée
 * en fondu depuis `HERO_KEYFRAMES.model`.
 */
export const HERO_FRAMES: FrameSet = {
  a: 187,
  path: '/hero/frames/16x9/',
};

/** Séquence 9:16, à remplir quand les clips seront tournés au format mobile. */
export const HERO_FRAMES_MOBILE: FrameSet | null = null;

/**
 * Bascule le hero en mode production dès que les frames sont présentes.
 * Passer la variable à "frames" dans `.env.local` après extraction.
 */
export const HERO_MODE = (process.env.NEXT_PUBLIC_HERO_MODE ?? 'keyframes') as 'frames' | 'keyframes';
