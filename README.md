# MAN OF GOD

Site de la marque **MAN OF GOD** (collection MOG & WOG, Abidjan).
Next.js 16, App Router, TypeScript, CSS Modules. Aucune dépendance d'animation :
le hero est un moteur canvas maison, 20 Ko de source pour le moteur, le
composant et les styles réunis.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Le hero animé au scroll

Un seul mouvement de caméra, sans coupe : un travelling avant qui part du
hoodie cadré serré et entre dans la matière jusqu'au macro du molleton. La
dernière image est presque noire, si bien que le hero se fond dans le fond de
la page sans rupture visible.

Le scroll pilote la position dans ce mouvement, en avant comme en arrière.
Le composant vit dans `src/components/ScrollHero/`.

Trois blocs de texte apparaissent le long de la course : le logotype à
l'ouverture, le discours sur la matière au milieu, l'appel à l'action sur le
tissu presque noir à la fin.

### Deux modes de rendu

| Mode | Quand | Rendu |
|------|-------|-------|
| `keyframes` | par défaut, et repli réseau lent | deux images clés interpolées par zoom et fondu |
| `frames` | rendu final | séquence d'images extraites du clip vidéo |

Le mode se choisit dans `.env.local` :

```bash
NEXT_PUBLIC_HERO_MODE=frames
```

### Pipeline de production

1. **Images clés** — générées sur Higgsfield (GPT Image 2, 2k, 16:9).
   URL dans `docs/keyframes.txt`. À télécharger dans `public/hero/keyframes/`
   et à basculer sur `HERO_KEYFRAMES_LOCAL` avant la mise en ligne : le premier
   écran du site ne doit pas dépendre d'un CDN tiers.
2. **Clip vidéo** — un seul clip, de l'image clé du hoodie vers celle du tissu.
   Prompt dans `docs/prompts-fal.md`.
3. **Extraction** :
   ```bash
   ./scripts/extract-frames.sh clip.mp4 public/hero/frames/16x9 1600
   ```
   Le script affiche le nombre de frames obtenues et la ligne de configuration
   à reporter dans `src/config/hero.ts`.
4. Répéter en 9:16 dans `public/hero/frames/9x16/` pour le mobile, puis
   renseigner `HERO_FRAMES_MOBILE`.

### État actuel de la séquence

| | |
|---|---|
| Source | 7,8 s, 850x480, 30 images par seconde |
| Extrait | 187 frames WebP à 24 images par seconde, 4,1 Mo |

La source est en 850x480, soit un agrandissement d'environ 1,7x sur un écran
de 1440 px. La texture le supporte, la sérigraphie de la première frame est
visiblement adoucie. À retourner en 1080p, ou à agrandir, avant la mise en ligne.

### Réglages

Tous dans `src/components/ScrollHero/` :

- **Longueur de scroll** : `--hero-track` dans `hero.module.css`, 300vh en
  desktop et 260vh en mobile.
- **Apparition des textes** : option `chapters`, une plage de progression par bloc.
- **Inertie du scroll** : option `smoothing`, 0.14 par défaut. Plus bas rend le
  mouvement plus lourd, plus haut le rend plus nerveux.
- Sous `prefers-reduced-motion`, le hero devient une affiche fixe de 100vh.

## Structure

```
src/
├── app/                    layout, page, styles globaux, favicon
├── components/
│   ├── ScrollHero/         moteur canvas, composant React, styles
│   ├── Wordmark.tsx        logotype MAN / of / GOD, source unique
│   └── sections/           collection, matière, commande, pied de page
├── config/hero.ts          images clés, séquence, mode de rendu
└── data/                   produits et informations de contact
```

## À compléter

- Reprise du clip en 1080p, et sa déclinaison 9:16 pour le mobile.
- Prix des t-shirts. Le champ `priceXof` vaut `null` dans
  `src/data/products.ts`, ce qui affiche « prix sur demande ».
- Photos produit dans `public/products/`, qui remplaceront l'aperçu
  typographique des cartes.
- Polices de la marque, si elles diffèrent de Montserrat et Great Vibes.
- Paiement en ligne : Wave, Orange Money et MTN via CinetPay ou Paystack.
  Aujourd'hui la commande passe par WhatsApp et par téléphone.
