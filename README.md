# MAN OF GOD

Site de la marque **MAN OF GOD** (collection MOG & WOG, Abidjan).
Next.js 16, App Router, TypeScript, CSS Modules. Aucune dépendance d'animation :
le hero est un moteur canvas maison d'environ 9 Ko.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Le hero animé au scroll

Un seul mouvement de caméra, sans coupe, en trois actes :

1. **Le vêtement** — cadrage serré sur le hoodie, la tête hors champ.
2. **La matière** — la caméra entre dans le tissu jusqu'au macro du molleton.
3. **La révélation** — elle recule jusqu'au plein pied du mannequin.

Le scroll pilote la position dans le mouvement, en avant comme en arrière.
Le composant vit dans `src/components/ScrollHero/`.

### Deux modes de rendu

| Mode | Quand | Rendu |
|------|-------|-------|
| `keyframes` | par défaut, et repli réseau lent | 3 images clés interpolées par zoom et fondu |
| `frames` | rendu final | séquence d'images extraites des clips vidéo |

Le mode se choisit dans `.env.local` :

```bash
NEXT_PUBLIC_HERO_MODE=frames
```

### Pipeline de production

1. **Images clés** — générées sur Higgsfield (GPT Image 2, 2k, 16:9).
   URL dans `docs/keyframes.txt`. À télécharger dans `public/hero/keyframes/`
   et à basculer sur `HERO_KEYFRAMES_LOCAL` avant la mise en ligne : le premier
   écran du site ne doit pas dépendre d'un CDN tiers.
2. **Clips vidéo** — deux clips seulement, prompts dans `docs/prompts-fal.md` :
   - **A** : image clé 1 vers image clé 2, entrée dans le tissu. **Livré.**
   - **B** : image clé 1 vers image clé 3, recul vers le mannequin. **À tourner.**

   Le dézoom tissu vers hoodie réutilise les frames de A à l'envers, il n'y a
   donc rien à générer pour lui. Les deux clips partant de la même image, la
   jonction est exacte.

   Tant que le clip B manque, le moteur couvre les deux premiers actes avec la
   séquence et joue la révélation en fondu depuis `HERO_KEYFRAMES.model`.
   Il suffira d'ajouter le champ `b` à `HERO_FRAMES` pour basculer.
3. **Extraction** :
   ```bash
   ./scripts/extract-frames.sh clipA.mp4 [clipB.mp4] public/hero/frames/16x9 1600
   ```
   Le script affiche le nombre de frames obtenues et la ligne de configuration
   à reporter dans `src/config/hero.ts`.
4. Répéter en 9:16 dans `public/hero/frames/9x16/` pour le mobile, puis
   renseigner `HERO_FRAMES_MOBILE`.

### État actuel de la séquence

| | |
|---|---|
| Source | clip A, 7,8 s, 850x480, 30 ips |
| Extrait | 187 frames WebP à 24 ips, 4,1 Mo |
| Couverture | actes 1 et 2 ; acte 3 en fondu sur l'image clé |

La source est en 850x480, soit un agrandissement d'environ 1,7x sur un écran
de 1440 px. La texture le supporte, la sérigraphie de la première frame est
visiblement adoucie. À retourner en 1080p, ou à agrandir, avant la mise en ligne.

### Réglages

Tous dans `src/components/ScrollHero/` :

- **Longueur de scroll** : `--hero-track` dans `hero.module.css`, 420vh en
  desktop et 340vh en mobile.
- **Découpage des actes** : option `acts`, champs `zoomIn`, `zoomOut`, `reveal`.
- **Apparition des textes** : option `chapters`.
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
├── config/hero.ts          images clés, séquences, mode de rendu
└── data/                   produits et informations de contact
```

## À compléter

- Clip B, et reprise du clip A en 1080p.
- Prix des t-shirts. Le champ `priceXof` vaut `null` dans
  `src/data/products.ts`, ce qui affiche « prix sur demande ».
- Photos produit dans `public/products/`, qui remplaceront l'aperçu
  typographique des cartes.
- Polices de la marque, si elles diffèrent de Montserrat et Great Vibes.
- Paiement en ligne : Wave, Orange Money et MTN via CinetPay ou Paystack.
  Aujourd'hui la commande passe par WhatsApp et par téléphone.
