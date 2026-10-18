#!/usr/bin/env bash
# One-time tool setup for an authoring session (idempotent).
set -e
cd "$(dirname "$0")/.."
[ -d node_modules/playwright ] || npm install --no-audit --no-fund >/dev/null
if [ -z "$PLAYWRIGHT_BROWSERS_PATH" ] || [ ! -d "$PLAYWRIGHT_BROWSERS_PATH" ]; then npx playwright install chromium >/dev/null; fi
python3 -c "import sherpa_onnx" 2>/dev/null || pip install -q --break-system-packages sherpa-onnx numpy scipy
python3 -c "import rembg" 2>/dev/null || pip install -q --break-system-packages "rembg[cpu]" || true
K=~/.kokoro/kokoro-multi-lang-v1_0
if [ ! -d "$K" ]; then mkdir -p ~/.kokoro && cd ~/.kokoro && curl -sSL -o k.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/kokoro-multi-lang-v1_0.tar.bz2 && tar xjf k.tar.bz2 && rm k.tar.bz2; fi
command -v ffmpeg >/dev/null || (sudo apt-get install -y -qq ffmpeg || apt-get install -y -qq ffmpeg)
echo "setup ok (KOKORO_DIR=$K)"
