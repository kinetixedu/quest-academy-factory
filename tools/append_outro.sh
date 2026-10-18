#!/usr/bin/env bash
# Append the official Quest Academy outro (assets/outro.mp4) to videos/<slug>/final.mp4 with a 0.5s crossfade.
set -euo pipefail
V="$1"; cd "$(dirname "$0")/.."
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V/final.mp4")
OFF=$(python3 -c "print(round($D - 0.5, 3))")
ffmpeg -v error -y -i "$V/final.mp4" -i assets/outro.mp4 -filter_complex \
 "[0:v]fps=30,format=yuv420p,settb=AVTB,setsar=1[a];[1:v]fps=30,format=yuv420p,settb=AVTB,setsar=1[b];[a][b]xfade=transition=fade:duration=0.5:offset=$OFF[v];[0:a]aresample=48000[x];[1:a]aresample=48000[y];[x][y]acrossfade=d=0.5:c1=tri:c2=tri[au]" \
 -map "[v]" -map "[au]" -c:v libx264 -crf 15 -preset medium -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart -c:a aac -b:a 192k "$V/final_outro.mp4"
mv "$V/final_outro.mp4" "$V/final.mp4"; echo "outro appended ($D s + 5.5 s)"
