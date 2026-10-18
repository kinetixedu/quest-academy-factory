"""Clean SFX (synthesized, placed on the page's declared cues) + voice -> mix.wav, then mux with video.mp4.
No music (series rule). usage: python3 tools/audio.py samples/<id>"""
import sys, json, pathlib, subprocess, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
SR = 48000
def rng(seed): return np.random.default_rng(seed)
T = lambda d: np.arange(int(d*SR))/SR
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x)
def nz(x, p=1.0): return x/(np.abs(x).max()+1e-9)*p
def att(x, a=0.002): n = min(len(x), int(a*SR)); x = x.copy(); x[:n] *= np.linspace(0, 1, n); return x

def whoosh(d=0.5, peak=0.6, lo=250, hi=4500, seed=1):
    n = int(d*SR); x = rng(seed).standard_normal(n); u = np.arange(n)/n
    env = np.where(u < peak, (u/peak)**2.2, np.exp(-(u-peak)/(1-peak)*5)); out = np.zeros(n)
    for k in range(6):
        fa = lo*(hi/lo)**(k/6); fb = lo*(hi/lo)**((k+1)/6); c = k/5
        out += bp(x, fa, fb)*np.exp(-((np.clip(u/peak, 0, 1.2)-c)**2)/0.06)
    return nz(lp(out*env, 6000))
def swish(): return whoosh(0.24, 0.45, 900, 8000, 3)
def pop(f0=820, f1=420, d=0.08):
    t = T(d); ph = 2*np.pi*np.cumsum(f0*(f1/f0)**(t/d))/SR
    return nz(att(np.sin(ph)*np.exp(-t*42)))
def tick(f=2400): t = T(0.035); return nz(att(np.sin(2*np.pi*f*t)*np.exp(-t*160) + 0.2*hp(rng(5).standard_normal(len(t)), 4000)*np.exp(-t*400)))
def click(): t = T(0.03); return nz(hp(rng(7).standard_normal(len(t)), 2200)*np.exp(-t*240))
def key(seed=0):
    t = T(0.05); r = rng(11+seed); x = bp(r.standard_normal(len(t)), 1800, 6500)*np.exp(-t*170) + 0.4*np.sin(2*np.pi*(180+r.integers(0, 40))*t)*np.exp(-t*90)
    return nz(att(x))
def ding(f=1318.5, d=0.9):
    t = T(d); x = np.sin(2*np.pi*f*t)*np.exp(-t*6) + 0.45*np.sin(2*np.pi*f*2.01*t)*np.exp(-t*10) + 0.2*np.sin(2*np.pi*f*3.02*t)*np.exp(-t*14)
    return nz(att(x, 0.003))
def chime(): a = ding(1046.5, 0.8); b = ding(1568, 0.9); o = np.zeros(len(b)+int(0.09*SR)); o[:len(a)] += a; o[int(0.09*SR):] += b*0.9; return nz(o)
def correct(): a = ding(880, 0.5); b = ding(1318.5, 0.8); o = np.zeros(len(b)+int(0.11*SR)); o[:len(a)] += a*0.8; o[int(0.11*SR):] += b; return nz(o)
def thud(): t = T(0.45); return nz(att(np.sin(2*np.pi*np.cumsum(95*np.exp(-t*14)+48)/SR)*np.exp(-t*10)))
def paper(): t = T(0.32); x = bp(rng(21).standard_normal(len(t)), 1200, 7000); env = np.sin(np.pi*np.clip(t/0.32, 0, 1))**1.5; return nz(x*env*(0.6+0.4*np.sin(2*np.pi*23*t)))
def stamp(): return nz(thud()[:int(0.3*SR)] + 0.5*np.pad(click(), (0, int(0.3*SR)-len(click()))))
def zap(d=0.22):
    t = T(d); f = 900*np.exp(-t*9)+120; x = np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*0.5 + 0.5*bp(rng(31).standard_normal(len(t)), 2000, 9000)
    return nz(lp(x, 7000)*np.exp(-t*14))
def hum(d=0.6): t = T(d); return nz(lp(np.sin(2*np.pi*100*t)+0.5*np.sin(2*np.pi*200*t)+0.25*np.sin(2*np.pi*300*t), 900)*np.sin(np.pi*t/d))
def bubble(seed=0):
    t = T(0.12); r = rng(41+seed); f0 = 500+r.integers(0, 300); ph = 2*np.pi*np.cumsum(f0*(1+3*t/0.12))/SR
    return nz(att(np.sin(ph)*np.exp(-t*30)))
def clunk(): t = T(0.4); x = np.sin(2*np.pi*140*t)*np.exp(-t*18) + 0.6*np.sin(2*np.pi*410*t)*np.exp(-t*26) + 0.35*bp(rng(51).standard_normal(len(t)), 800, 4000)*np.exp(-t*60); return nz(att(x))
def ratchet(n=5): o = np.zeros(int(0.06*SR*n+0.05*SR)); [o.__setitem__(slice(int(i*0.06*SR), int(i*0.06*SR)+int(0.035*SR)), o[int(i*0.06*SR):int(i*0.06*SR)+int(0.035*SR)] + tick(1700)) for i in range(n)]; return nz(o)
def riser(d=0.7): t = T(d); return nz(bp(rng(61).standard_normal(len(t)), 500, 7000)*(t/d)**2.5 + 0.3*np.sin(2*np.pi*np.cumsum(220+500*(t/d)**2)/SR)*(t/d)**2)
def sparkle(): o = np.zeros(int(0.5*SR)); [o.__setitem__(slice(int(i*0.07*SR), int(i*0.07*SR)+int(0.4*SR)), o[int(i*0.07*SR):int(i*0.07*SR)+int(0.4*SR)] + ding(f, 0.4)*0.5) for i, f in enumerate([2093, 2637, 3136])]; return nz(o)
def blip(f=1200): t = T(0.07); return nz(att(np.sin(2*np.pi*f*t)*np.exp(-t*45)))
def wrong(): a = np.sin(2*np.pi*520*T(0.1))*np.exp(-T(0.1)*16); b = np.sin(2*np.pi*390*T(0.16))*np.exp(-T(0.16)*14); return nz(np.concatenate([a, np.zeros(int(0.02*SR)), b]))
def drip(): return bubble(3)

LIB = {k: v for k, v in globals().items() if callable(v) and k not in ('rng', 'T', 'lp', 'hp', 'bp', 'nz', 'att', 'main', 'fftconvolve', 'butter', 'sosfilt')}
CACHE = {}
def sound(name):
    if name not in CACHE:
        base, _, arg = name.partition(':')
        CACHE[name] = LIB[base](int(arg)) if arg else LIB[base]()
    return CACHE[name]

# PROFESSIONAL SOUND POLICY: only these sounds, capped gains, and a minimum gap between whooshes
ALLOWED = {'whoosh': 0.25, 'swish': 0.2, 'tick': 0.3, 'correct': 0.35, 'chime': 0.25}
def police(cues):
    out, last_whoosh = [], -99
    for t, name, g, pan in sorted(cues):
        base = name.split(':')[0]
        if base not in ALLOWED: continue
        if base in ('whoosh', 'swish'):
            if t - last_whoosh < 6: continue
            last_whoosh = t; name = 'whoosh'
        out.append([t, name, min(g, ALLOWED[base]), 0])
    return out

def main(folder):
    F = pathlib.Path(folder); info = json.load(open(F/'sfx.json')); dur = info['dur']
    info['sfx'] = police(info['sfx'])
    N = int((dur+0.5)*SR); fx = np.zeros((N, 2))
    for t, name, g, pan in info['sfx']:
        s = sound(name)*g*0.32; peak = int(np.argmax(np.abs(s[:int(0.2*SR)])) if name.split(':')[0] in ('whoosh', 'swish', 'riser') else 0)
        if name.split(':')[0] in ('whoosh', 'swish', 'riser'): peak = int(np.argmax(np.abs(s)))  # land the peak on the cue
        i = int(t*SR) - peak
        if i < 0: s = s[-i:]; i = 0
        j = min(N, i+len(s)); L, R = np.sqrt(0.5*(1-pan)), np.sqrt(0.5*(1+pan))
        fx[i:j, 0] += s[:j-i]*L*1.414; fx[i:j, 1] += s[:j-i]*R*1.414
    ir = rng(9).standard_normal(int(0.5*SR))*np.exp(-np.arange(int(0.5*SR))/SR*10); ir = lp(ir, 5000)*0.06; ir[0] = 1
    fx = np.stack([fftconvolve(fx[:, c], ir)[:N] for c in range(2)], 1)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', str(F/'sfx.wav')], input=np.clip(fx, -1, 1).astype(np.float32).tobytes(), check=True)
    fc = ('[0:a]aresample=48000,highpass=f=70,acompressor=threshold=0.125:ratio=2.5:attack=5:release=120:makeup=1.4,apad=whole_dur=%.3f[v];'
          '[1:a]volume=0.32[s];[v][s]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.3:LRA=9[out]') % (dur+0.3)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', str(F/'voice.wav'), '-i', str(F/'sfx.wav'), '-filter_complex', fc, '-map', '[out]', '-ar', '48000', str(F/'mix.wav')], check=True)
    if (F/'video.mp4').exists():
        name = F.name
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', str(F/'video.mp4'), '-i', str(F/'mix.wav'), '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', str(F/'final.mp4')], check=True)
        print('wrote', F/'final.mp4')

if __name__ == '__main__':
    for f in sys.argv[1:]: main(f)
