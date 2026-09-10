# MAN OF GOD — Prompts fal.ai pour le hero

## Principe (2 clips suffisent)
Le hero se lit en 3 actes, mais comme le scroll est **scrubbé** (avant/arrière), le dézoom
tissu → hoodie est simplement le clip A joué à l'envers. On ne génère donc que :

| Clip | Départ (first frame) | Arrivée (last frame) | Mouvement |
|------|----------------------|----------------------|-----------|
| **A** | K1 `hoodie` | K2 `fabric` | push‑in continu jusqu'au macro tissu |
| **B** | K1 `hoodie` | K3 `model`  | pull‑out continu jusqu'au plein pied |

Timeline finale montée par le composant : `A → A inversé → B`.
Les deux clips partent de **la même image K1**, donc la jonction est parfaite.

## Modèle recommandé
`fal-ai/kling-video/v2.5-turbo/pro/image-to-video` (ou `v2.1/pro`) : il accepte
`image_url` **et** `tail_image_url` (first + last frame). Réglages :
- `duration`: `"5"`  ·  `aspect_ratio`: `"16:9"`  ·  `cfg_scale`: `0.5`
- Alternative : `fal-ai/veo3.1/first-last-frame-to-video` (plus cher, très propre sur le tissu).

Fichiers K1/K2/K3 : voir `keyframes/URLS.txt` (2688×1520, PNG).

---

## Clip A — Hoodie → Tissu (push‑in)
**image_url** = K1 hoodie · **tail_image_url** = K2 fabric

```
Slow, perfectly steady cinematic push-in on a black MAN OF GOD hoodie. The camera glides
straight forward toward the red script "of" on the chest print, accelerating gently, until
the frame is filled by an extreme macro of the heavyweight cotton fleece: individual fibers,
tight knit loops, the raised edge of the red ink catching a soft top-left light. Fabric
breathes almost imperceptibly (subtle micro-movement of the garment, no body movement).
Rack focus stays sharp on the weave. Deep charcoal blacks, soft warm rim light, luxury
textile advertising, ultra detailed, photoreal, 24fps, no camera shake, no cuts.
```
**negative_prompt**
```
text change, morphing letters, extra logos, hands, face, fast motion, camera shake,
flicker, blur, low quality, distortion, cartoon
```

## Clip B — Hoodie → Mannequin (pull‑out)
**image_url** = K1 hoodie · **tail_image_url** = K3 model

```
Slow, perfectly steady cinematic pull-back (dolly out) from a tight chest shot of a black
MAN OF GOD hoodie. As the camera glides backward, the frame widens to reveal the slim young
African man wearing it, standing calm and confident in a dark charcoal concrete studio,
hands in the kangaroo pocket, loose black trousers, white sneakers, dark stone cubes on the
floor. The chest print (MAN / red script "of" / GOD) stays crisp and unchanged. Soft
overhead key light, warm rim light on the shoulders, deep blacks, premium fashion campaign.
Photoreal, 24fps, smooth continuous dolly, no camera shake, no cuts.
```
**negative_prompt**
```
text change, morphing letters, extra people, extra logos, warped face, warped hands,
fast motion, camera shake, flicker, blur, low quality, distortion
```

---

## Version mobile (9:16)
Régénérer K1/K2/K3 en 9:16 sur Higgsfield (mêmes prompts, `aspect_ratio: 9:16`),
puis relancer les 2 clips avec `aspect_ratio: "9:16"`. Le composant charge la
séquence 9:16 automatiquement sous 768 px (`mobileFrames`).

## Contrôle qualité avant extraction
1. Le print **MAN / of / GOD** ne doit pas "vivre" (lettres qui bougent) → sinon baisser
   `cfg_scale` à 0.3 et relancer.
2. La première frame de A et de B doivent être identiques à K1 → Kling respecte l'image
   de départ, Veo aussi ; vérifier tout de même en scrubbant.
3. Aucun visage flou sur B → sinon utiliser un K3 où le visage est plus grand dans le cadre.
