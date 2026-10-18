#!/usr/bin/env bash
# Build one video end to end: voice -> frames -> mix -> captions -> thumbnail. usage: tools/build.sh videos/<slug>
set -euo pipefail
V="$1"; cd "$(dirname "$0")/.."
python3 tools/tts.py "$V"
node tools/render.js "$V"
python3 tools/audio.py "$V"
python3 tools/srt.py "$V"
node tools/thumb.js "$V"
test -s "$V/final.mp4" && test -s "$V/thumbnail.jpg" && test -s "$V/captions.srt"
echo "built $V"
