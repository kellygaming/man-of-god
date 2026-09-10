#!/usr/bin/env bash
#
# Extrait les frames des clips du hero en WebP, calibrés pour le scroll-scrub.
#
#   ./scripts/extract-frames.sh clipA.mp4 [clipB.mp4] public/hero/frames/16x9 [largeur] [fps]
#
#   clipA : hoodie → tissu   (push-in)
#   clipB : hoodie → mannequin (pull-out) — facultatif
#
# Le dézoom tissu → hoodie réutilise les frames de A à l'envers : il n'y a rien
# à extraire pour lui. Tant que clipB manque, la révélation est jouée en fondu
# depuis l'image clé `HERO_KEYFRAMES.model`.
#
# Reporter les nombres affichés à la fin dans `src/config/hero.ts`.
set -euo pipefail

usage() { sed -n '2,14p' "$0"; exit 1; }
[ $# -ge 2 ] || usage

A="$1"; shift
B=""
case "$1" in
  *.mp4|*.mov|*.webm|*.MP4|*.MOV|*.WEBM) B="$1"; shift ;;
esac
OUT="$1"; shift
W="${1:-1600}"
FPS="${2:-24}"

command -v ffmpeg >/dev/null || { echo "ffmpeg est requis." >&2; exit 1; }
mkdir -p "$OUT"

extract() {
  local src="$1" clip="$2"
  rm -f "$OUT/${clip}_"*.webp
  ffmpeg -v error -y -i "$src" \
    -vf "fps=$FPS,scale='min($W,iw)':-2:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 \
    "$OUT/${clip}_%04d.webp"
  echo "$(ls "$OUT/${clip}_"*.webp | wc -l)"
}

NA=$(extract "$A" a)
echo "clip A : $NA frames"
if [ -n "$B" ]; then
  NB=$(extract "$B" b)
  echo "clip B : $NB frames"
  echo "→ src/config/hero.ts : { a: $NA, b: $NB, path: '/${OUT#public/}/' }"
else
  echo "→ src/config/hero.ts : { a: $NA, path: '/${OUT#public/}/' }   (clip B absent)"
fi
du -sh "$OUT"
