#!/usr/bin/env bash
# Small review pack committed to the repo for every build: contact sheet + facts (duration, size, loudness).
set -euo pipefail
V="$1"; mkdir -p "$V/review"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V/final.mp4")
ffmpeg -v error -y -i "$V/final.mp4" -vf "fps=16/$D,scale=480:-2,tile=4x4:padding=6:color=0x111111" -frames:v 1 -q:v 3 "$V/review/contact.jpg"
L=$(ffmpeg -nostats -i "$V/final.mp4" -af ebur128 -f null - 2>&1 | awk '/I:/{v=$2} END{print v}')
python3 - "$V" "$D" "$L" <<'PY'
import sys, json, os
v, d, l = sys.argv[1:]
json.dump({"duration_s": round(float(d), 1), "size_mb": round(os.path.getsize(f"{v}/final.mp4")/1e6, 1), "loudness_lufs": l}, open(f"{v}/review/build.json", "w"), indent=1)
PY
cp "$V/thumbnail.jpg" "$V/review/thumbnail.jpg"; cat "$V/review/build.json"
