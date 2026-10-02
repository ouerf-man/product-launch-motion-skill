#!/usr/bin/env bash
# Contact sheets of a reference video: whole film at 15 fps (2 s per sheet) + dense sheets around given times.
# Usage: bash contact-sheets.sh ref.mov [t1 t2 ...]   → sheets/ folder
set -e; V="$1"; shift; mkdir -p sheets
ffmpeg -v error -y -i "$V" -vf "fps=15,scale=300:-1,tile=6x5" sheets/all_%02d.jpg
for t in "$@"; do s=$(python3 -c "print(max(0,$t-0.4))"); ffmpeg -v error -y -ss "$s" -t 0.8 -i "$V" -vf "fps=30,scale=300:-1,tile=6x4" "sheets/t_${t}.jpg"; done
ls sheets
