"""cues.json -> captions.srt (2-line max, <= 42 chars per line, sentence-aware).
usage: python3 tools/srt.py videos/<slug>"""
import sys, json, pathlib, re

def ts(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}".replace(',1000', ',999')

def main(folder):
    F = pathlib.Path(folder); C = json.load(open(F / 'cues.json'))
    blocks = []
    for lid in C['order']:
        L = C['lines'][lid]; words = L['words']; cur = []
        for i, w in enumerate(words):
            cur.append(w)
            text = ' '.join(x['w'] for x in cur)
            end_sentence = re.search(r'[.?!]$', w['w'])
            if len(text) >= 70 or end_sentence or i == len(words) - 1:
                t0 = cur[0]['t']; t1 = words[i + 1]['t'] if i + 1 < len(words) else L['t1']
                blocks.append([t0, max(t1, t0 + 0.9), text]); cur = []
    out = []
    for n, (a, b, text) in enumerate(blocks, 1):
        text = re.sub(r'\b([A-Z]) (?=[A-Z]\b)', r'\1', text)   # spelled-out acronyms: 'P R' -> 'PR'
        if len(text) > 42:   # split into two balanced lines
            ws = text.split(); best = min(range(1, len(ws)), key=lambda k: abs(len(' '.join(ws[:k])) - len(' '.join(ws[k:]))))
            text = ' '.join(ws[:best]) + '\n' + ' '.join(ws[best:])
        out.append(f"{n}\n{ts(a)} --> {ts(b)}\n{text}\n")
    (F / 'captions.srt').write_text('\n'.join(out))
    print('srt', F.name, len(blocks), 'blocks')

if __name__ == '__main__':
    for f in sys.argv[1:]: main(f)
