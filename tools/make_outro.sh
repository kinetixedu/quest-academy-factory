#!/usr/bin/env bash
# Rebuild assets/outro.mp4 from the brand outro (assets/outro-source.mp4) + the "VIDEO BY" label (assets/outro-label.png).
# Label fades/rises in once the wordmark lands (3.5s) and fades out with the logo (5.55s). Audio raised to -14 LUFS.
set -e; cd "$(dirname "$0")/.."
ffmpeg -v error -y -i assets/outro-source.mp4 -loop 1 -t 6 -i assets/outro-label.png -filter_complex \
 "[1:v]format=rgba,fade=in:st=3.5:d=0.45:alpha=1,fade=out:st=5.55:d=0.4:alpha=1[lb];[0:v][lb]overlay=x=0:y='16*pow(max(0\,min(1\,1-(t-3.5)/0.55))\,3)':format=auto,format=yuv420p[v];[0:a]volume=3.5dB,alimiter=limit=0.89:level=false[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 15 -preset slow -r 30 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a aac -b:a 192k -ar 48000 -ac 2 -t 6 assets/outro.mp4
echo "assets/outro.mp4 rebuilt"
