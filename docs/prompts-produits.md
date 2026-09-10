# Visuels boutique — prompts prêts à l'emploi

But : obtenir huit visuels qui semblent pris dans la même séance photo, sans
jamais modifier le vêtement lui-même. On ne change que le fond, la lumière et
le cadrage.

---

## Avant de lancer

**Réglages.** Modèle `GPT Image 2`. Format **3:4** (vertical). Résolution **1k**,
qualité **medium** : cela coûte 1 crédit par image et suffit largement pour des
vignettes de boutique. Le 2k haute qualité coûte 6,5 crédits pour un gain
invisible à cette taille.

**Une seule image de référence par génération.** Joignez la photo du vêtement
concerné, rien d'autre.

**Recadrez d'abord si votre photo montre plusieurs vêtements.** Vos visuels
présentent souvent deux ou trois pièces côte à côte, ou le devant et le dos.
Le prompt demande d'ignorer les autres, mais un recadrage sur une seule pièce
donne un résultat nettement plus fiable. C'est trente secondes sur le téléphone
et cela évite de brûler des crédits pour rien.

**Les prompts sont en anglais.** Les modèles d'image comprennent beaucoup mieux
les consignes de cadrage et de lumière en anglais. Le résultat, lui, ne contient
aucun texte à part celui déjà imprimé sur le vêtement.

**Prompt négatif, le même pour les huit.** Collez-le dans le champ prévu si
l'interface le propose :

```
person, model, face, hands, body, hanger, clothes rack, visible mannequin, flat lay,
folded garment, second garment, extra clothing, back view, changed text, altered
lettering, new logo, added slogan, watermark, username, social media handle, price tag,
white background, seamless white studio, floor line, horizon, props, blurry, low quality,
distorted typography
```

---

## 1. Pull MAN OF GOD

Fichier attendu : `pull-man-of-god.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting.

DO NOT REDESIGN THE GARMENT. Same cut, same length, same sleeves, same hood, same pocket,
same colour, same fabric. The chest print must be identical to the reference: same wording,
same typefaces, same colours, same size, same position on the chest. Do not add, remove,
translate, re-typeset or restyle any lettering. Change ONLY the background, the lighting
and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props. The
garment is centred and shown straight-on, front view, floating on an invisible ghost
mannequin so it keeps its natural shape and volume. Soft broad key light from the top
left, a distinct rim light along both shoulders and sleeves so the dark fabric separates
from the dark background, soft contact shadow under the hem. Even margins on all four
sides. Sharp fabric texture, premium catalogue look, photorealistic. Vertical 3:4 framing.
No text anywhere except the print already on the garment. No watermark.
```

---

## 2. Pull WOMAN OF GOD

Fichier attendu : `pull-woman-of-god.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting.

DO NOT REDESIGN THE GARMENT. Same cut, same length, same sleeves, same hood, same pocket,
same colour, same fabric. The chest print must be identical to the reference: same wording,
same typefaces, same colours, same size, same position on the chest. Do not add, remove,
translate, re-typeset or restyle any lettering. Change ONLY the background, the lighting
and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props. The
garment is centred and shown straight-on, front view, floating on an invisible ghost
mannequin so it keeps its natural shape and volume. Soft broad key light from the top
left, a distinct rim light along both shoulders and sleeves so the dark fabric separates
from the dark background, soft contact shadow under the hem. Even margins on all four
sides. Sharp fabric texture, premium catalogue look, photorealistic. Vertical 3:4 framing.
No text anywhere except the print already on the garment. No watermark.
```

---

## 3. T-shirt délavé MAN OF GOD (taupe)

Recadrez sur le t-shirt de **devant** uniquement, celui qui porte la petite croix
et le logotype sur la poitrine.

Fichier attendu : `tshirt-delave-man-of-god.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting. Use ONLY the front-facing t-shirt with the small chest print; ignore any
other garment visible in the reference.

DO NOT REDESIGN THE GARMENT. Same oversized cut, same drop shoulders, same sleeve length,
same neckline, same warm taupe acid-wash colour and its exact mottled wash pattern, same
heavy cotton. The chest print must be identical to the reference: same small cross, same
wording, same typefaces, same colours, same size, same position high on the chest. Do not
add, remove, translate, re-typeset or restyle any lettering. Change ONLY the background,
the lighting and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props. The
garment is centred and shown straight-on, front view, floating on an invisible ghost
mannequin so it keeps its natural shape and volume. Soft broad key light from the top
left, a distinct rim light along both shoulders and sleeves, soft contact shadow under
the hem. Even margins on all four sides. Sharp washed-cotton texture, premium catalogue
look, photorealistic. Vertical 3:4 framing. No text anywhere except the print already on
the garment. No watermark.
```

---

## 4. T-shirt délavé WOMAN OF GOD (gris)

Recadrez sur le t-shirt de **devant**, celui qui porte « WOMAN of GOD » sur la
poitrine, et non celui qui montre les trois croix au dos.

Fichier attendu : `tshirt-delave-woman-of-god.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting. Use ONLY the front-facing t-shirt with the chest print; ignore the
back-facing garment visible in the reference.

DO NOT REDESIGN THE GARMENT. Same oversized cut, same drop shoulders, same sleeve length,
same neckline, same light grey acid-wash colour and its exact mottled wash pattern, same
heavy cotton. The chest print must be identical to the reference: same wording, same
typefaces, same colours, same size, same position on the chest. Do not add, remove,
translate, re-typeset or restyle any lettering. Change ONLY the background, the lighting
and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props. The
garment is centred and shown straight-on, front view, floating on an invisible ghost
mannequin so it keeps its natural shape and volume. Soft broad key light from the top
left, a distinct rim light along both shoulders and sleeves, soft contact shadow under
the hem. Even margins on all four sides. Sharp washed-cotton texture, premium catalogue
look, photorealistic. Vertical 3:4 framing. No text anywhere except the print already on
the garment. No watermark.
```

---

## 5. T-shirt WOMAN OF GOD (blanc)

Recadrez sur le t-shirt de **devant**, celui qui porte le petit logotype sur la
poitrine.

Fichier attendu : `tshirt-woman-of-god.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting. Use ONLY the front-facing t-shirt with the small chest print; ignore the
back-facing garment visible in the reference.

DO NOT REDESIGN THE GARMENT. Same cut, same sleeve length, same neckline, same pure white
colour, same cotton. The chest print must be identical to the reference: same wording,
same typefaces, same colours, same small size, same position high on the chest. Do not
add, remove, translate, re-typeset or restyle any lettering. Change ONLY the background,
the lighting and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props, so the
white fabric stands out cleanly. The garment is centred and shown straight-on, front view,
floating on an invisible ghost mannequin so it keeps its natural shape and volume. Soft
broad key light from the top left, gentle rim light along both shoulders, soft contact
shadow under the hem. Even margins on all four sides. Sharp cotton texture, premium
catalogue look, photorealistic. Vertical 3:4 framing. No text anywhere except the print
already on the garment. No watermark.
```

---

## 6. T-shirt MAN OF GOD (blanc)

Recadrez sur le t-shirt de **devant**, celui qui porte le logotype sur la
poitrine.

Fichier attendu : `tshirt-man-of-god.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting. Use ONLY the front-facing t-shirt with the chest print; ignore any other
garment or person visible in the reference.

DO NOT REDESIGN THE GARMENT. Same oversized cut, same drop shoulders, same sleeve length,
same neckline, same pure white colour, same cotton. The chest print must be identical to
the reference: same wording, same typefaces, same colours, same size, same position on the
chest. Do not add, remove, translate, re-typeset or restyle any lettering. Change ONLY the
background, the lighting and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props, so the
white fabric stands out cleanly. The garment is centred and shown straight-on, front view,
floating on an invisible ghost mannequin so it keeps its natural shape and volume. Soft
broad key light from the top left, gentle rim light along both shoulders, soft contact
shadow under the hem. Even margins on all four sides. Sharp cotton texture, premium
catalogue look, photorealistic. Vertical 3:4 framing. No text anywhere except the print
already on the garment. No watermark.
```

---

## 7. Top WOMAN OF GOD manches courtes

Votre photo montre le noir et le blanc côte à côte. Recadrez sur **le noir**.

Fichier attendu : `top-woman-of-god-manches-courtes.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting. Use ONLY the black short-sleeve top; ignore the white one visible in the
reference.

DO NOT REDESIGN THE GARMENT. Same slim fitted cut, same cropped length, same short sleeves,
same crew neckline, same black colour, same ribbed knit. The chest print must be identical
to the reference: same wording, same typefaces, same colours, same small size, same
position high on the chest. Do not add, remove, translate, re-typeset or restyle any
lettering. Change ONLY the background, the lighting and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props. The
garment is centred and shown straight-on, front view, floating on an invisible ghost
mannequin so it keeps its slim shape. Soft broad key light from the top left, a distinct
rim light along both shoulders and sleeves so the black fabric separates from the dark
background, soft contact shadow under the hem. Even margins on all four sides. Sharp
ribbed knit texture, premium catalogue look, photorealistic. Vertical 3:4 framing. No text
anywhere except the print already on the garment. No watermark.
```

---

## 8. Top WOMAN OF GOD manches longues

Votre photo montre le noir, le rose et le blanc. Recadrez sur **le noir**.

Fichier attendu : `top-woman-of-god-manches-longues.png`

```
Reproduce the garment from the reference image exactly as it is, and place it in a new
studio setting. Use ONLY the black long-sleeve top; ignore the pink and white ones visible
in the reference.

DO NOT REDESIGN THE GARMENT. Same slim fitted cut, same cropped length, same long fitted
sleeves, same crew neckline, same black colour, same ribbed knit. The chest print must be
identical to the reference: same wording, same typefaces, same colours, same small size,
same position high on the chest. Do not add, remove, translate, re-typeset or restyle any
lettering. Change ONLY the background, the lighting and the framing.

SETTING: studio product photograph. Seamless dark charcoal background, a deep neutral
grey-black, smooth subtle vertical gradient, no floor line, no horizon, no props. The
garment is centred and shown straight-on, front view, floating on an invisible ghost
mannequin so it keeps its slim shape. Soft broad key light from the top left, a distinct
rim light along both shoulders and sleeves so the black fabric separates from the dark
background, soft contact shadow under the hem. Even margins on all four sides. Sharp
ribbed knit texture, premium catalogue look, photorealistic. Vertical 3:4 framing. No text
anywhere except the print already on the garment. No watermark.
```

---

## Vérifier avant de valider

Passez chaque image sur ces cinq points. C'est plus rapide que de tout refaire
plus tard.

1. Le texte imprimé est exactement le même, lettre pour lettre. Un modèle
   d'image aime réécrire les mots : c'est le défaut le plus fréquent.
2. Le « of » manuscrit rouge est toujours là, à sa place et de la bonne taille.
3. La coupe n'a pas changé : un top ajusté ne doit pas être devenu ample.
4. Le fond est bien charbon, sans ligne de sol ni ombre portée bizarre.
5. Aucun pseudo TikTok, aucun filigrane.

Si un point cloche, relancez la même image. Deux ou trois essais par vêtement
sont normaux, cela reste 1 crédit à chaque fois.

---

## Variante : les vues de dos

Plusieurs pièces portent un visuel au dos, notamment les trois croix du Calvaire
et le verset des t-shirts délavés. Elles méritent une seconde image, que la
boutique pourra montrer au survol de la carte.

Reprenez le prompt de la pièce concernée et remplacez, dans le bloc SETTING,
`front view` par `back view`, puis ajustez la ligne de fidélité pour parler du
dos plutôt que de la poitrine :

> The back print must be identical to the reference: same artwork, same size,
> same position. Do not redraw it.

Dites-le-moi si vous les faites, j'ajouterai le second visuel aux cartes.

---

## Me les envoyer

Nommez les fichiers exactement comme indiqué sous chaque prompt. Avec ces noms,
je les dépose dans `public/products/` et je bascule le catalogue en une
opération, sans avoir à deviner quelle image correspond à quelle pièce.
