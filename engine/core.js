/* Quest worlds engine - everything is a pure function of time t (seconds).
   No CSS transitions, no timers, no Math.random. window.seek(t) draws frame t. */
(function () {
const M = window.M = {};
M.W = 1920; M.H = 1080; M.FPS = 30;
const SAFE = M.SAFE = { x0: 160, x1: 1760, y0: 120, y1: 1000 };   // 1600 x 880 content area
// 12-column grid: col 104, gutter 32
M.col = (c) => SAFE.x0 + c * 136;            // left edge of column c (0..11)
M.span = (n) => n * 104 + (n - 1) * 32;      // width of n columns

/* ---------- maths ---------- */
M.clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
M.lerp = (a, b, u) => a + (b - a) * u;
M.io = x => { x = M.clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
M.o3 = x => 1 - Math.pow(1 - M.clamp(x), 3);
M.o5 = x => 1 - Math.pow(1 - M.clamp(x), 5);
M.i3 = x => Math.pow(M.clamp(x), 3);
M.expo = x => { x = M.clamp(x); return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); };
M.u = (t, a, d) => M.clamp((t - a) / d);     // linear progress of [a, a+d]
// closed-form spring step response; snaps to exactly 1 once the envelope is negligible
M.spring = (tau, sp = M.SOFT) => {
  if (tau <= 0) return 0;
  const [w, z] = sp;
  if (Math.exp(-z * w * tau) * (1 + w * tau) < 0.0015) return 1;
  if (z < 1) { const wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * tau) * (Math.cos(wd * tau) + z * w / wd * Math.sin(wd * tau)); }
  return 1 - Math.exp(-w * tau) * (1 + w * tau);
};
M.SNAP = [24, .84];  M.SOFT = [13, .88];  M.HEAVY = [9.5, .86];  M.CAM = [5.2, 1];  M.POP = [20, .74];
// value with many targets: sum of one spring per change. keys [[t, v, sp?], ...]
M.track = (v0, keys, sp0 = M.SOFT) => {
  const ks = []; let prev = v0;
  for (const [t, v, sp] of keys) { if (v !== prev) { ks.push([t, v - prev, sp || sp0]); prev = v; } }
  return t => { let v = v0; for (const [a, d, sp] of ks) v += d * M.spring(t - a, sp); return v; };
};
// eased keyframes (no overshoot) [[t, v], ...] with transition length d
M.keys = (pts, d = 0.6, ease = M.io) => t => {
  let v = pts[0][1];
  for (let i = 1; i < pts.length; i++) v += (pts[i][1] - pts[i - 1][1]) * ease((t - pts[i][0]) / d);
  return v;
};
// seeded PRNG
M.rng = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };
// colours
const hx = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
M.mix = (a, b, u) => { u = M.clamp(u); const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); };
M.rgba = (h, a) => { const c = hx(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
M.ctrack = (c0, keys, d = 0.35) => t => { let c = c0, prev = c0; for (const [a, cc] of keys) { c = M.mix(c, cc, M.io((t - a) / d)); prev = cc; } return c; };

/* ---------- DOM helpers ---------- */
M.$ = (s, r = document) => r.querySelector(s);
M.$$ = (s, r = document) => [...r.querySelectorAll(s)];
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
M.hide = (el, h) => { const v = h ? 'hidden' : 'inherit'; if (el.style.visibility !== v) el.style.visibility = v; };
M.setT = (el, s) => { if (el._t !== s) { el._t = s; el.textContent = s; } };

// wrap each word of el in a mask (.w > .wi). Child elements count as one word.
M.split = (el) => {
  if (el._wi) return el._wi;
  const out = [];
  const wrap = (node) => { const w = document.createElement('span'); w.className = 'w'; const wi = document.createElement('span'); wi.className = 'wi'; w.appendChild(wi); wi.appendChild(node); out.push(wi); return w; };
  [...el.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const parts = n.textContent.split(/(\s+)/); const frag = document.createDocumentFragment();
      parts.forEach(p => { if (!p) return; if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' ')); else frag.appendChild(wrap(document.createTextNode(p))); });
      el.replaceChild(frag, n);
    } else if (n.nodeType === 1) { const ph = document.createComment(''); el.replaceChild(ph, n); el.replaceChild(wrap(n), ph); }
  });
  return (el._wi = out);
};
// masked word rise. o: st (stagger), sp, out (exit time), outDur, rot
M.rise = (el, t, t0, o = {}) => {
  const ws = M.split(el), st = o.st ?? 0.055, sp = o.sp || M.SOFT, rot = o.rot ?? 3;
  const outT = o.out ?? 1e9, od = o.outDur ?? 0.38;
  if (t < t0 - 0.001 || t > outT + od + ws.length * 0.03) { M.hide(el, true); return; }
  M.hide(el, false);
  ws.forEach((wi, i) => {
    const p = M.spring(t - t0 - i * st, sp), q = M.io((t - outT - i * 0.03) / od);
    if (p >= 1 && q <= 0) { if (wi.style.transform !== 'none') wi.style.transform = 'none'; return; }
    const y = (1 - p) * 112 - q * 112;
    wi.style.transform = `translateY(${f2(y)}%) rotate(${f2((1 - p) * rot)}deg)`;
  });
};
// generic entrance / exit. o: dx, dy, sc, sp, fade, outDur, ody, odx, osc, blur
M.vis = (el, t, tin, tout = 1e9, o = {}) => {
  const sp = o.sp || M.SOFT, fade = o.fade ?? 0.18, od = o.outDur ?? 0.32;
  const p = tin == null ? 1 : M.spring(t - tin, sp);
  const q = M.io((t - tout) / od);
  const op = (tin == null ? 1 : M.clamp((t - tin) / fade)) * (1 - q);
  if (op <= 0.001) { M.hide(el, true); return 0; }
  M.hide(el, false);
  el.style.opacity = op >= 0.999 ? '' : op.toFixed(3);
  const dx = (o.dx || 0) * (1 - p) + (o.odx || 0) * q, dy = (o.dy ?? 24) * (1 - p) + (o.ody ?? -16) * q;
  const sc = (o.sc ?? 1) + (1 - (o.sc ?? 1)) * p + ((o.osc ?? 1) - 1) * q;
  const bl = (o.blur || 0) * (1 - p);
  if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01 && Math.abs(sc - 1) < 0.0005) { if (el.style.transform !== 'none') el.style.transform = 'none'; }
  else el.style.transform = `translate(${f2(dx)}px,${f2(dy)}px) scale(${sc.toFixed(4)})`;
  el.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : '';
  return p;
};
// draw an SVG stroke on. el: path/line/circle... u: 0..1
M.drawU = (el, u) => {
  if (el._L == null) el._L = el.getTotalLength ? el.getTotalLength() : 1000;
  el.style.strokeDasharray = el._L.toFixed(1); el.style.strokeDashoffset = (el._L * (1 - M.clamp(u))).toFixed(2);
  M.hide(el, u <= 0);
};
M.draw = (el, t, t0, dur = 0.7, ease = M.io) => M.drawU(el, ease((t - t0) / dur));
// counter
M.count = (el, t, t0, dur, a, b, fmt = v => Math.round(v).toString()) => M.setT(el, fmt(a + (b - a) * M.o5((t - t0) / dur)));

/* ---------- icons: 24-unit line paths (lucide style). M.icon(name|paths, size, colour, stroke) ---------- */
M.IC = {
  check: ['M20 6 9 17l-5-5'], x: ['M18 6 6 18', 'm6 6 12 12'],
  package: ['M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z', 'M12 22V12', 'm3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7', 'm7.5 4.27 9 5.15'],
  tag: ['M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z', 'M7.5 7.5h.01'],
  pin: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6'],
  megaphone: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
  arrowR: ['M5 12h14', 'm12 5 7 7-7 7'], arrowD: ['M12 5v14', 'm19 12-7 7-7-7'], arrowU: ['M12 19V5', 'm5 12 7-7 7 7'],
  plus: ['M5 12h14', 'M12 5v14'], minus: ['M5 12h14'], equal: ['M5 9h14', 'M5 15h14'],
  bulb: ['M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5', 'M9 18h6', 'M10 22h4'],
  user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  coin: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8', 'M12 18V6'],
  store: ['m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7', 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4', 'M2 7h20', 'M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7'],
  book: ['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'],
  zap: ['M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  chart: ['M3 3v16a2 2 0 0 0 2 2h16', 'm19 9-5 5-4-4-3 3'],
  cpu: ['M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M9 9h6v6H9z', 'M15 2v2', 'M15 20v2', 'M2 15h2', 'M2 9h2', 'M20 15h2', 'M20 9h2', 'M9 2v2', 'M9 20v2'],
  code: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6'], db: ['M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3Z', 'M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5', 'M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3'],
  flask: ['M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2', 'M8.5 2h7', 'M7 16h10'],
  leaf: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
  gear: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  home: ['M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', 'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
};
M.icon = (n, s = 32, c = 'currentColor', sw = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block;overflow:visible">${(Array.isArray(n) ? n : M.IC[n]).map(d => `<path d="${d}"/>`).join('')}</svg>`;

/* ---------- camera: keys [[t, zoom, cx, cy, sp?]] (cx, cy = world point at screen centre) ---------- */
M.camera = (el, keys, sp = M.CAM) => {
  // keys[0] is the starting framing
  const [k0, ...ks] = keys;
  const lz = M.track(Math.log(k0[1]), ks.map(k => [k[0], Math.log(k[1]), k[4] || sp]), sp);
  const cx = M.track(k0[2] ?? 960, ks.map(k => [k[0], k[2] ?? 960, k[4] || sp]), sp);
  const cy = M.track(k0[3] ?? 540, ks.map(k => [k[0], k[3] ?? 540, k[4] || sp]), sp);
  el.style.transformOrigin = '0 0';
  return t => {
    const z = Math.exp(lz(t)), x = cx(t), y = cy(t);
    if (Math.abs(z - 1) < 1e-4 && Math.abs(x - 960) < .01 && Math.abs(y - 540) < .01) { if (el.style.transform !== 'none') el.style.transform = 'none'; return; }
    el.style.transform = `translate(960px,540px) scale(${z.toFixed(5)}) translate(${(-x).toFixed(2)}px,${(-y).toFixed(2)}px)`;
  };
};

/* ---------- cues (from tts.py) ---------- */
M.CUES = window.CUES || { lines: {}, dur: 10 };
M.L = id => M.CUES.lines[id] || { t0: 0, t1: 0, words: [] };
M.t0 = id => M.L(id).t0;  M.t1 = id => M.L(id).t1;
// time a word starts: wt('P1', 'Price') (first match, punctuation ignored) or wt('P1', 3) (index)
M.wt = (id, w, nth = 0) => {
  const L = M.L(id); if (typeof w === 'number') return (L.words[w] || L.words[L.words.length - 1] || { t: L.t0 }).t;
  const clean = s => s.toLowerCase().replace(/[^a-z0-9₹]/g, '');
  const hits = L.words.filter(x => clean(x.w) === clean(w) || clean(x.w).startsWith(clean(w)));
  if (!hits.length) { console.warn('word not found', id, w); return L.t0; }
  return hits[Math.min(nth, hits.length - 1)].t;
};

/* ---------- captions: karaoke groups of <= maxW words, active word highlighted ---------- */
M.captions = (box, ids, o = {}) => {
  const maxW = o.maxW || 6, groups = [];
  ids.forEach(id => {
    const L = M.L(id); let g = [];
    L.words.forEach((w, i) => {
      g.push(w); const end = /[.?!,;:]$/.test(w.w) && g.length >= 2;
      if (g.length >= maxW || end || i === L.words.length - 1) { groups.push(g); g = []; }
    });
  });
  groups.forEach((g, i) => { g.t0 = g[0].t; g.t1 = (groups[i + 1] ? groups[i + 1][0].t : 1e9); });
  // close the last group of each line after the line ends (+0.5s) so captions clear during long pauses
  ids.forEach(id => { const L = M.L(id); const last = groups.filter(g => g[0].t >= L.t0 - 1e-3 && g[0].t <= L.t1).pop(); if (last) last.t1 = Math.min(last.t1, L.t1 + 0.5); });
  let cur = -2;
  return t => {
    let gi = groups.findIndex(g => t >= g.t0 - 0.04 && t < g.t1);
    if (gi !== cur) {
      cur = gi; box.innerHTML = '';
      if (gi >= 0) groups[gi].forEach(w => { const s = document.createElement('span'); s.className = 'cw'; s.textContent = w.w; box.appendChild(s); box.appendChild(document.createTextNode(' ')); });
    }
    if (gi < 0) { M.hide(box, true); return; }
    M.hide(box, false);
    const g = groups[gi], p = M.spring(t - g.t0 + 0.04, M.SNAP), q = M.io((t - (g.t1 - 0.12)) / 0.12);
    box.style.opacity = ((1 - q) * M.clamp((t - g.t0 + 0.04) / 0.1)).toFixed(3);
    box.style.transform = p >= 1 ? 'translateX(-50%)' : `translateX(-50%) translateY(${f2((1 - p) * 14)}px)`;
    [...box.children].forEach((s, k) => { const on = t >= g[k].t - 0.02, act = on && (k === g.length - 1 || t < g[k + 1].t - 0.02); const c = act ? 'cw act' : on ? 'cw on' : 'cw'; if (s.className !== c) s.className = c; });
  };
};

/* ---------- sound cues: declared once at build time, exported for audio.py ---------- */
window.SFX = [];
M.sfx = (t, name, gain = 1, pan = 0) => { window.SFX.push([+t.toFixed(3), name, gain, pan]); };

/* ---------- frame loop ---------- */
const fns = [];
M.on = fn => fns.push(fn);
M.T = () => M.CUES.dur + (window.TAIL ?? 1.2);
window.seek = (t) => { for (const fn of fns) fn(t); };
window.ready = false;
M.start = async () => {
  await document.fonts.ready;
  window.DUR = M.T(); window.seek(0); window.ready = true;
  if (!/render/.test(location.search)) hud();
};

/* ---------- preview HUD (never in renders) ---------- */
function hud() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;height:44px;background:#111;color:#eee;font:13px Inter,sans-serif;display:flex;align-items:center;gap:12px;padding:0 14px;z-index:99999';
  bar.innerHTML = '<button id="hp">play</button><input id="hs" type="range" min="0" max="1000" value="0" style="flex:1"><span id="ht">0.00</span>';
  document.body.appendChild(bar);
  const au = new Audio('voice.wav'); let playing = false, t = 0, t0 = 0, w0 = 0;
  const set = v => { t = M.clamp(v, 0, window.DUR); window.seek(t); M.$('#hs').value = t / window.DUR * 1000; M.$('#ht').textContent = t.toFixed(2); };
  const loop = () => { if (!playing) return; set(w0 + (performance.now() - t0) / 1000); if (t >= window.DUR) { playing = false; au.pause(); } requestAnimationFrame(loop); };
  const toggle = () => { playing = !playing; if (playing) { t0 = performance.now(); w0 = t >= window.DUR ? 0 : t; au.currentTime = w0; au.play().catch(() => {}); loop(); } else au.pause(); };
  M.$('#hp').onclick = toggle; M.$('#hs').oninput = e => { playing = false; au.pause(); set(e.target.value / 1000 * window.DUR); };
  addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); toggle(); } if (e.code === 'ArrowRight') set(t + 1 / 30); if (e.code === 'ArrowLeft') set(t - 1 / 30); if (e.code === 'KeyR') { set(0); if (!playing) toggle(); } });
  const q = new URLSearchParams(location.search).get('t'); if (q) set(+q);
}
})();
