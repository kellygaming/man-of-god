# Visuels boutique — le prompt unique

Un seul prompt, le même pour les huit vêtements. Vous joignez la photo, vous
collez ce texte, vous générez. C'est le fait de ne rien changer au texte d'une
pièce à l'autre qui donne à la grille son unité.

## Réglages

Modèle **GPT Image 2**. Format **3:4** vertical. Résolution **1k**, qualité
**medium** : 1 crédit par image, largement suffisant pour des vignettes de
boutique. Le 2k haute qualité coûte 6,5 crédits pour un gain invisible à cette
taille.

Une seule photo de référence par génération. Pas besoin de recadrer : le prompt
dit lui-même quoi faire quand la photo montre plusieurs vêtements.

Le prompt est en anglais. Les modèles d'image comprennent nettement mieux les
consignes de cadrage et de lumière dans cette langue. Le résultat ne contient
aucun texte en dehors de celui déjà imprimé sur le vêtement.

---

## Le prompt

```
Use the attached photo as the reference. Keep the garment exactly as it is and place it in
a new studio setting.

KEEP ONE GARMENT ONLY. If the photo shows several garments, keep a single one and remove
the others completely from the image. Keep the garment seen from the FRONT, the one showing
the print on the chest, and ignore any garment showing its back. If several front-facing
garments in different colours are shown, keep the one that appears largest and closest to
the camera.

DO NOT REDESIGN THE GARMENT. Reproduce it exactly: same cut, same length, same sleeves,
same neckline, same collar or hood, same pockets, same colour, same wash or dye pattern,
same fabric and knit. The print must be identical to the reference: same wording, same
typefaces, same colours, same size, same position on the chest. Do not add, remove,
translate, re-typeset, move, resize or restyle any lettering or artwork. Change ONLY the
background, the lighting and the framing.

SETTING, identical for every garment: studio product photograph. Seamless dark charcoal
background, a deep neutral grey-black, smooth subtle vertical gradient, no floor line, no
horizon, no surface, no props. The garment is centred and shown straight-on, front view,
floating on an invisible ghost mannequin so it keeps its natural shape and volume. Soft
broad key light from the top left, a distinct rim light along both shoulders and sleeves so
dark garments separate from the dark background, soft contact shadow under the hem. Even
margins on all four sides, the garment filling about 80% of the frame height. Sharp fabric
texture, premium catalogue look, photorealistic. Vertical 3:4 framing. No text anywhere
except the print already on the garment. No watermark, no username, no added logo.
```

## Le prompt négatif

Le même pour les huit, à coller dans le champ prévu si l'interface le propose.

```
person, model, face, hands, body, hanger, clothes rack, visible mannequin, flat lay,
folded garment, second garment, extra clothing, back view, changed text, altered lettering,
new logo, added slogan, watermark, username, social media handle, price tag, white
background, seamless white studio, floor line, horizon, props, blurry, low quality,
distorted typography
```

## La seule ligne à ajouter parfois

Deux de vos photos montrent la même pièce en plusieurs couleurs : le top manches
courtes en noir et blanc, le top manches longues en noir, rose et blanc. La règle
du prompt garde alors celui qui est le plus grand dans le cadre, ce qui n'est pas
forcément celui que vous voulez.

Pour trancher, ajoutez une phrase à la fin du prompt :

```
Keep only the black one.
```

---

## Vérifier avant de valider

Cinq points, plus rapides à contrôler maintenant qu'à rattraper plus tard.

1. Le texte imprimé est identique, lettre pour lettre. Un modèle d'image aime
   réécrire les mots : c'est le défaut le plus fréquent.
2. Le « of » manuscrit rouge est là, à sa place et à sa taille.
3. La coupe n'a pas bougé : un top ajusté ne doit pas être devenu ample.
4. Le fond est bien charbon, sans ligne de sol ni ombre portée étrange.
5. Aucun pseudo TikTok, aucun filigrane.

Si un point cloche, relancez la même image. Deux ou trois essais par vêtement
sont normaux, cela reste 1 crédit à chaque fois.

---

## Nommer les fichiers

Ces noms exacts me permettent de brancher le catalogue sans deviner quelle image
correspond à quelle pièce.

| Vêtement | Nom du fichier |
|---|---|
| Pull MAN OF GOD | `pull-man-of-god.png` |
| Pull WOMAN OF GOD | `pull-woman-of-god.png` |
| T-shirt délavé MAN OF GOD, taupe | `tshirt-delave-man-of-god.png` |
| T-shirt délavé WOMAN OF GOD, gris | `tshirt-delave-woman-of-god.png` |
| T-shirt WOMAN OF GOD, blanc | `tshirt-woman-of-god.png` |
| T-shirt MAN OF GOD, blanc | `tshirt-man-of-god.png` |
| Top WOMAN OF GOD manches courtes | `top-woman-of-god-manches-courtes.png` |
| Top WOMAN OF GOD manches longues | `top-woman-of-god-manches-longues.png` |

---

## Variante : les vues de dos

Plusieurs pièces portent un visuel au dos, notamment les trois croix du Calvaire
et le verset des t-shirts délavés. Elles méritent une seconde image, que la
boutique pourra montrer au survol de la carte.

Reprenez le même prompt et changez deux choses : dans le bloc de sélection,
remplacez `Keep the garment seen from the FRONT, the one showing the print on the
chest, and ignore any garment showing its back` par `Keep the garment seen from
the BACK, the one showing the print on the back, and ignore any garment showing
its front`. Dans le bloc de décor, remplacez `front view` par `back view`.

Nommez ces fichiers avec le suffixe `-dos`, par exemple
`tshirt-delave-man-of-god-dos.png`. Dites-le-moi si vous les faites, j'ajouterai
le second visuel au survol des cartes.
