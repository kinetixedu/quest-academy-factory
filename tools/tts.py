"""Narrate a sample: script.txt (ID|pause_after|text per line) -> voice.wav + cues.json
Kokoro (sherpa-onnx), am_michael sid 16, speed 0.9 - the series voice.
usage: python3 tools/tts.py samples/<id>"""
import sys, json, re, pathlib, numpy as np, subprocess, sherpa_onnx

import os
D = pathlib.Path(os.environ.get('KOKORO_DIR', '/home/claude/tts/kokoro-multi-lang-v1_0'))
SID, SPEED, LEAD = 16, 0.9, 0.45   # LEAD: silence before the first line
_tts = None
def tts():
    global _tts
    if _tts is None:
        k = sherpa_onnx.OfflineTtsKokoroModelConfig(model=str(D/'model.onnx'), voices=str(D/'voices.bin'), tokens=str(D/'tokens.txt'),
            data_dir=str(D/'espeak-ng-data'), dict_dir=str(D/'dict'), lexicon=f"{D/'lexicon-us-en.txt'},{D/'lexicon-zh.txt'}")
        _tts = sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(kokoro=k, num_threads=2), max_num_sentences=1))
    return _tts

def trim(x, sr, thr=0.012):
    a = np.abs(x); idx = np.where(a > thr)[0]
    if not len(idx): return x
    s = max(0, idx[0] - int(0.02*sr)); e = min(len(x), idx[-1] + int(0.06*sr))
    return x[s:e]

def word_times(text, t0, t1):
    """estimate word start times from character weight (commas/periods add a pause weight)"""
    words = text.split(); wts = []
    for w in words:
        n = len(re.sub(r'[^A-Za-z0-9]', '', w)) + 2.2
        if re.search(r'[,;:]$', w): n += 3
        if re.search(r'[.?!]$', w): n += 5
        wts.append(n)
    tot = sum(wts); out = []; acc = 0
    for w, n in zip(words, wts):
        out.append({'w': w, 't': round(t0 + (t1 - t0) * acc / tot, 3)}); acc += n
    return out

def main(folder):
    F = pathlib.Path(folder); lines = []
    for ln in (F/'script.txt').read_text().splitlines():
        ln = ln.strip()
        if not ln or ln.startswith('#'): continue
        i, p, txt = ln.split('|', 2); lines.append((i.strip(), float(p), txt.strip()))
    sr = None; chunks = [np.zeros(int(LEAD*24000), np.float32)]; t = LEAD; cues = {}
    for i, p, txt in lines:
        say = txt.replace('₹', 'rupees ')
        a = tts().generate(say, sid=SID, speed=SPEED); sr = a.sample_rate
        x = trim(np.array(a.samples, np.float32), sr)
        d = len(x)/sr; cues[i] = {'t0': round(t, 3), 't1': round(t+d, 3), 'text': txt, 'words': word_times(txt, t, t+d)}
        chunks += [x, np.zeros(int(p*sr), np.float32)]; t += d + p
    v = np.concatenate(chunks); v = v/np.abs(v).max()*0.89
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(sr), '-ac', '1', '-i', '-', '-ar', '48000', str(F/'voice.wav')], input=v.tobytes(), check=True)
    C = {'lines': cues, 'order': [l[0] for l in lines], 'dur': round(t, 3)}
    json.dump(C, open(F/'cues.json', 'w'), indent=1); open(F/'cues.js', 'w').write('window.CUES=' + json.dumps(C) + ';')
    print(F.name, f'{t:.2f}s', ' '.join(f"{k}:{c['t0']:.2f}" for k, c in cues.items()))

if __name__ == '__main__':
    for f in sys.argv[1:]: main(f)
