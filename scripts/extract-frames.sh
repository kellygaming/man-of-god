#!/usr/bin/env bash
# Extrait les frames des deux clips fal.ai en WebP optimisés pour le scroll-scrub.
# Usage : ./scripts/extract-frames.sh clipA.mp4 clipB.mp4 public/hero/frames/16x9 [largeur]
# A = hoodie → tissu (push-in)   B = hoodie → mannequin (pull-out)
set -euo pipefail
A="$1"; B="$2"; OUT="$3"; W="${4:-1600}"
FPS=24
mkdir -p "$OUT"
ffmpeg -y -i "$A" -vf "fps=$FPS,scale=$W:-2:flags=lanczos" -c:v libwebp -quality 78 -compression_level 6 "$OUT/a_%04d.webp"
ffmpeg -y -i "$B" -vf "fps=$FPS,scale=$W:-2:flags=lanczos" -c:v libwebp -quality 78 -compression_level 6 "$OUT/b_%04d.webp"
NA=$(ls "$OUT"/a_*.webp | wc -l); NB=$(ls "$OUT"/b_*.webp | wc -l)
echo "a: $NA frames, b: $NB frames → ScrollHero({ frames: { a: $NA, b: $NB, path: '/hero/frames/16x9/' } })"
du -sh "$OUT"
