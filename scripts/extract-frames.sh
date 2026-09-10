#!/usr/bin/env bash
#
# Extrait les frames du clip du hero en WebP, calibrées pour le scroll-scrub.
#
#   ./scripts/extract-frames.sh clip.mp4 public/hero/frames/16x9 [largeur] [fps]
#
# Le hero joue un seul mouvement : un travelling avant du hoodie vers le macro
# du molleton. Reporter le nombre affiché à la fin dans `src/config/hero.ts`,
# champ `HERO_FRAMES.count`.
set -euo pipefail

usage() { sed -n '2,10p' "$0"; exit 1; }
[ $# -ge 2 ] || usage

SRC="$1"
OUT="$2"
W="${3:-1600}"
FPS="${4:-24}"

command -v ffmpeg >/dev/null || { echo "ffmpeg est requis." >&2; exit 1; }
[ -f "$SRC" ] || { echo "Fichier introuvable : $SRC" >&2; exit 1; }

mkdir -p "$OUT"
rm -f "$OUT"/a_*.webp

# `min(W,iw)` évite d'agrandir une source plus petite que la cible : cela
# alourdirait les fichiers sans ajouter le moindre détail.
ffmpeg -v error -y -i "$SRC" \
  -vf "fps=$FPS,scale='min($W,iw)':-2:flags=lanczos" \
  -c:v libwebp -quality 80 -compression_level 6 \
  "$OUT/a_%04d.webp"

COUNT=$(ls "$OUT"/a_*.webp | wc -l)
echo "$COUNT frames extraites."
echo "→ src/config/hero.ts : { count: $COUNT, path: '/${OUT#public/}/' }"
du -sh "$OUT"
