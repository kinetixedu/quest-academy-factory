// PUC Biology Ep 50: Simple and Complex Permanent Tissues (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const tag = (p, x, y, s, col = C.mute, fs = 15) => txt(p, x, y, s, { 'text-anchor': 'middle', 'font-size': fs, 'letter-spacing': 1.2, fill: col, 'font-weight': 600 });
const attr = PUC.attr;
const W = Q => { const o = document.createElementNS(nsv, 'g'); Q.parentNode.insertBefore(o, Q); o.appendChild(Q); return o; };
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// bible canon + batch canon (Eps 50-54, anatomy): xylem sky, phloem gold, cambium coral, endodermis suberin brown, pericycle rose, cuticle amber
const BR = '#2E2A24', LEAF = '#8CC48F', GRN = C.ac, WAT = '#5AA0C8', GOLD = '#C9962B';
const XY = '#5AA0C8', XYL = '#D6E9F5', PH = '#C9962B', PHL = '#F6EBC8', CAM = '#D0632F', CAML = '#F6D2C0', END = '#7A4E2D', ENDL = '#EAD9C6', PER = '#B5476E', PERL = '#F1D9E3';
const PAR = '#F3F7EA', COL = '#9C8A3E', COLL = '#E3D3A0', SCL = '#8A5A2B', SCLL = '#D9BE94', CUT = '#D9A441', CHL = '#3E9B5F', CHLL = '#6DB27A', PITH = '#FBF6E6', NUC = '#7B4B94', NUCL = '#D7C3E6', VAC = '#E4F0F8';
const cue = s => { if (typeof s === 'number') return s; const m = /^([A-Z]\d+)(\^)?(?::([^:]+?))?(?::(\d+))?([+-]\d*\.?\d+)?$/.exec(s); if (!m) { console.warn('bad cue', s); return 0; }
  const v = m[3] ? wt(m[1], m[3], +(m[4] || 0)) : m[2] ? T1(m[1]) : T0(m[1]); return v + (m[5] ? +m[5] : 0); };
const lab = (g, px, py, lx, ly, s, an = 'start', el, fs) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: an === 'middle' ? lx : lx + (an === 'start' ? 12 : -12), y: an === 'middle' ? ly + 30 : ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  if (fs) tx.style.fontSize = fs + 'px';
  return { ln, dot, tx };
};
const labRun = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const G = (p, x, y, s = 1, r = 0) => mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s})${r ? ` rotate(${r})` : ''}` });
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const blobD = (cx, cy, rx, ry, n = 7, j = 0.12) => { const P = [], a0 = rnd() * 6.283;
  for (let k = 0; k < n; k++) { const a = a0 + k * 6.283 / n, f = 1 + (rnd() - 0.5) * 2 * j; P.push([cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]); }
  const mid = k => { const p = P[k % n], q = P[(k + 1) % n]; return `${((p[0] + q[0]) / 2).toFixed(1)},${((p[1] + q[1]) / 2).toFixed(1)}`; };
  let d = `M${mid(n - 1)}`; for (let k = 0; k < n; k++) d += ` Q${P[k][0].toFixed(1)},${P[k][1].toFixed(1)} ${mid(k)}`; return d + 'Z'; };
const cell = (g, cx, cy, rx, ry, o = {}) => mk(g, 'path', { d: blobD(cx, cy, rx, ry ?? rx, o.n || 7, o.j ?? 0.12), fill: o.f || PAR, stroke: o.s || BR, 'stroke-width': o.w || 1.6 });
// hex field of cells inside test(x, y)
const field = (g, x0, y0, x1, y1, sz, test, o = {}) => { const out = []; const dy = sz * 1.72;
  for (let r = 0, y = y0; y <= y1; r++, y += dy) for (let x = x0 + (r % 2 ? sz : 0); x <= x1; x += sz * 2) {
    const jx = x + (rnd() - 0.5) * sz * 0.2, jy = y + (rnd() - 0.5) * sz * 0.2; if (!test(jx, jy)) continue;
    out.push(cell(g, jx, jy, sz * (o.k ?? 0.92), sz * (o.k ?? 0.92) * (o.ar ?? 1), o)); } return out; };
// ring of cells around (cx, cy) at radius r, tangential size a, radial size b
const ring = (g, cx, cy, r, a, b, o = {}) => { const n = o.n || Math.max(6, Math.round(6.283 * r / (a * 2.05))), out = [];
  for (let k = 0; k < n; k++) { const an = (k + (o.off || 0)) * 6.283 / n, x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
    out.push(mk(g, 'rect', { x: (x - b).toFixed(1), y: (y - a).toFixed(1), width: (2 * b).toFixed(1), height: (2 * a).toFixed(1), rx: Math.min(a, b) * (o.rr ?? 0.7), fill: o.f || PAR, stroke: o.s || BR, 'stroke-width': o.w || 1.4, transform: `rotate(${(an * 57.3).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})` })); }
  return out; };
const inAnn = (cx, cy, r0, r1) => (x, y) => { const d = Math.hypot(x - cx, y - cy); return d >= r0 && d <= r1; };
const dots = (g, pts, r, f) => pts.map(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r, fill: f }));
const chloro = (g, cx, cy, s = 1) => mk(g, 'ellipse', { cx, cy, rx: 7 * s, ry: 4.2 * s, fill: CHLL, stroke: '#1F5E37', 'stroke-width': 1.2, transform: `rotate(${(rnd() * 180).toFixed(0)} ${cx} ${cy})` });
// xylem cell (open circle, thick sky wall) and phloem patch
const xc = (g, x, y, r) => mk(g, 'circle', { cx: x, cy: y, r, fill: XYL, stroke: XY, 'stroke-width': Math.max(2, r * 0.28) });
const phPatch = (g, x, y, r) => { const Q = mk(g, 'g', {}); mk(Q, 'path', { d: blobD(x, y, r, r * 0.8, 8, 0.08), fill: PHL, stroke: PH, 'stroke-width': 2.5 });
  for (let k = 0; k < 5; k++) { const a = k * 1.256 + 0.3; cell(Q, x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.38, r * 0.26, r * 0.22, { f: '#FBF3DC', s: PH, w: 1.2 }); } return Q; };
// dicot / monocot root T.S. (exarch, radial)
const rootTS = (g, cx, cy, R, mono = false, o = {}) => { const P = {};
  P.hairs = mk(g, 'g', {}); if (!o.noHair) for (let k = 0; k < 9; k++) { const a = -2.3 + k * 0.5, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; mk(P.hairs, 'path', { d: `M${x.toFixed(1)},${y.toFixed(1)} q${(Math.cos(a) * 30 + 8).toFixed(1)},${(Math.sin(a) * 30).toFixed(1)} ${(Math.cos(a) * 56).toFixed(1)},${(Math.sin(a) * 56 - 6).toFixed(1)}`, stroke: BR, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }); }
  P.epi = mk(g, 'g', {}); ring(P.epi, cx, cy, R - 7, R * 0.045, 7, { f: '#F6F1E2' });
  P.cor = mk(g, 'g', {}); field(P.cor, cx - R, cy - R, cx + R, cy + R, R * 0.052, inAnn(cx, cy, R * 0.64, R * 0.9), { f: PAR, w: 1.3, n: 6 });
  P.end = mk(g, 'g', {}); ring(P.end, cx, cy, R * 0.6, R * 0.028, R * 0.034, { f: ENDL, s: END, w: 1.8, rr: 0.3 });
  P.cas = mk(g, 'g', {}); { const n = Math.round(6.283 * R * 0.6 / (R * 0.028 * 2.05)); for (let k = 0; k < n; k++) { const a = (k + 0.5) * 6.283 / n; mk(P.cas, 'circle', { cx: (cx + Math.cos(a) * R * 0.6).toFixed(1), cy: (cy + Math.sin(a) * R * 0.6).toFixed(1), r: Math.max(2, R * 0.011), fill: END }); } }
  P.per = mk(g, 'g', {}); ring(P.per, cx, cy, R * 0.545, R * 0.024, R * 0.02, { f: PERL, s: PER, w: 1.4, rr: 0.4 });
  const n = mono ? 12 : 4, rp = mono ? R * 0.3 : R * 0.08; P.n = n;
  P.pith = mk(g, 'g', {}); mk(P.pith, 'circle', { cx, cy, r: rp, fill: PITH, stroke: BR, 'stroke-width': 1.2 }); if (mono) field(P.pith, cx - rp, cy - rp, cx + rp, cy + rp, R * 0.04, inAnn(cx, cy, 0, rp - R * 0.03), { f: PITH, w: 1.1 });
  P.conj = mk(g, 'g', {}); field(P.conj, cx - R * 0.52, cy - R * 0.52, cx + R * 0.52, cy + R * 0.52, R * 0.036, inAnn(cx, cy, rp + 2, R * 0.5), { f: '#F7F9EF', s: '#B9B39C', w: 1 });
  P.xy = []; P.proto = []; P.meta = []; P.ph = [];
  for (let k = 0; k < n; k++) { const a = -1.5708 + k * 6.283 / n, Q = mk(g, 'g', {}), pr = mk(Q, 'g', {}), me = mk(Q, 'g', {}); P.xy.push(Q); P.proto.push(pr); P.meta.push(me);
    const steps = mono ? [[0.48, 0.022], [0.41, 0.034], [0.34, 0.05]] : [[0.48, 0.024], [0.4, 0.034], [0.3, 0.046], [0.18, 0.06]];
    steps.forEach(([rr, s], i) => xc(i ? me : pr, cx + Math.cos(a) * R * rr, cy + Math.sin(a) * R * rr, R * s));
    const b = a + 3.1416 / n; P.ph.push(phPatch(g, cx + Math.cos(b) * R * (mono ? 0.43 : 0.38), cy + Math.sin(b) * R * (mono ? 0.43 : 0.38), R * (mono ? 0.05 : 0.085))); }
  P.ptX = k => { const a = -1.5708 + k * 6.283 / n; return [cx + Math.cos(a) * R * 0.48, cy + Math.sin(a) * R * 0.48]; };
  P.ptP = k => { const b = -1.5708 + k * 6.283 / n + 3.1416 / n, r = R * (mono ? 0.43 : 0.38); return [cx + Math.cos(b) * r, cy + Math.sin(b) * r]; };
  return P; };
// one conjoint bundle (phloem outer = up), x,y = centre of xylem base
const bundle = (g, x, y, s, open = true) => { const Q = G(g, x, y, s), P = { g: W(Q) };
  P.cap = mk(Q, 'path', { d: 'M-62,-118 Q0,-170 62,-118 Q0,-140 -62,-118Z', fill: SCLL, stroke: SCL, 'stroke-width': 2.5 });
  P.ph = mk(Q, 'path', { d: 'M-58,-112 Q0,-138 58,-112 L52,-62 Q0,-72 -52,-62Z', fill: PHL, stroke: PH, 'stroke-width': 2.5 });
  for (let k = 0; k < 6; k++) cell(Q, -36 + k * 15, -92 + (k % 2) * 8, 7, 6, { f: '#FBF3DC', s: PH, w: 1.1 });
  P.cam = mk(Q, 'path', { d: 'M-52,-58 Q0,-68 52,-58 L50,-46 Q0,-54 -50,-46Z', fill: CAML, stroke: CAM, 'stroke-width': 2.2 });
  P.camL = []; for (let k = 0; k < 7; k++) P.camL.push(mk(Q, 'line', { x1: -40 + k * 13, y1: -58, x2: -40 + k * 13, y2: -47, stroke: CAM, 'stroke-width': 1.4 }));
  P.xyg = mk(Q, 'path', { d: 'M-50,-42 Q0,-50 50,-42 L22,30 Q0,36 -22,30Z', fill: '#EEF5FA', stroke: XY, 'stroke-width': 1.6 });
  P.meta = mk(Q, 'g', {}); [[-26, -28, 13], [0, -30, 14], [26, -28, 13]].forEach(([a, b, r]) => xc(P.meta, a, b, r));
  P.proto = mk(Q, 'g', {}); [[-12, 0, 8], [10, 2, 8], [0, 20, 6]].forEach(([a, b, r]) => xc(P.proto, a, b, r));
  if (!open) { P.cam.style.display = 'none'; P.camL.forEach(l => l.style.display = 'none'); }
  return P; };
// dicot stem T.S. (full circle)
const stemTS = (g, cx, cy, R, o = {}) => { const P = {}, nb = o.nb || 9;
  P.epi = mk(g, 'g', {}); ring(P.epi, cx, cy, R - 7, R * 0.04, 7, { f: '#F6F1E2' }); P.cut = mk(g, 'circle', { cx, cy, r: R, fill: 'none', stroke: CUT, 'stroke-width': 3.5 });
  P.hyp = mk(g, 'g', {}); field(P.hyp, cx - R, cy - R, cx + R, cy + R, R * 0.035, inAnn(cx, cy, R * 0.8, R * 0.93), { f: COLL, s: COL, w: 1.5, n: 5 });
  P.cor = mk(g, 'g', {}); field(P.cor, cx - R, cy - R, cx + R, cy + R, R * 0.045, inAnn(cx, cy, R * 0.66, R * 0.79), { f: PAR, w: 1.2, n: 6 });
  P.end = mk(g, 'g', {}); ring(P.end, cx, cy, R * 0.63, R * 0.026, R * 0.024, { f: ENDL, s: END, w: 1.5, rr: 0.5 });
  P.pith = mk(g, 'g', {}); field(P.pith, cx - R, cy - R, cx + R, cy + R, R * 0.06, inAnn(cx, cy, 0, R * 0.36), { f: PITH, w: 1.2, n: 7 });
  P.ray = mk(g, 'g', {}); P.bun = [];
  for (let k = 0; k < nb; k++) { const a = -1.5708 + k * 6.283 / nb, bx = cx + Math.cos(a) * R * 0.46, by = cy + Math.sin(a) * R * 0.46;
    const ra = a + 3.1416 / nb; for (let q = 0; q < 4; q++) { const rr = R * (0.38 + q * 0.06); cell(P.ray, cx + Math.cos(ra) * rr, cy + Math.sin(ra) * rr, R * 0.024, R * 0.024, { f: '#F7F9EF', w: 1.1 }); }
    const Q = mk(g, 'g', { transform: `translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${(a * 57.3 + 90).toFixed(1)}) scale(${(R / 900).toFixed(3)})` });
    const B = bundle(Q, 0, 60, 1, true); P.bun.push(B); }
  P.at = (k, part) => { const a = -1.5708 + k * 6.283 / nb, r = { cap: 0.6, ph: 0.55, cam: 0.5, xy: 0.44, ray: 0.47 }[part] ?? 0.46, aa = part === 'ray' ? a + 3.1416 / nb : a; return [cx + Math.cos(aa) * R * r, cy + Math.sin(aa) * R * r]; };
  return P; };
// monocot stem T.S.
const monoStem = (g, cx, cy, R) => { const P = {};
  P.epi = mk(g, 'g', {}); ring(P.epi, cx, cy, R - 7, R * 0.04, 7, { f: '#F6F1E2' });
  P.hyp = mk(g, 'g', {}); field(P.hyp, cx - R, cy - R, cx + R, cy + R, R * 0.03, inAnn(cx, cy, R * 0.86, R * 0.93), { f: SCLL, s: SCL, w: 1.3, n: 5 });
  P.gr = mk(g, 'g', {}); field(P.gr, cx - R, cy - R, cx + R, cy + R, R * 0.05, inAnn(cx, cy, 0, R * 0.85), { f: PAR, w: 1.1, n: 7 });
  P.bun = []; const pts = []; for (let k = 0; k < 60 && pts.length < 26; k++) { const a = rnd() * 6.283, r = Math.sqrt(rnd()) * R * 0.78, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (pts.every(([u, v]) => Math.hypot(u - x, v - y) > R * 0.2)) pts.push([x, y, r]); }
  pts.forEach(([x, y, r]) => { const s = (0.13 - 0.06 * r / (R * 0.78)) * R / 90, Q = mk(g, 'g', {}); P.bun.push(Q);
    mk(Q, 'ellipse', { cx: x, cy: y, rx: 55 * s, ry: 62 * s, fill: SCLL, stroke: SCL, 'stroke-width': 1.5 });
    mk(Q, 'ellipse', { cx: x, cy: y - 22 * s, rx: 26 * s, ry: 18 * s, fill: PHL, stroke: PH, 'stroke-width': 1.3 });
    [[-22, 8, 12], [22, 8, 12], [0, 26, 9]].forEach(([a, b, rr]) => xc(Q, x + a * s, y + b * s, rr * s)); });
  return P; };
// leaf vertical section: x0..x1 at top y0; returns parts
const leafVS = (g, x0, y0, x1, mono = false) => { const P = {}, w = x1 - x0;
  P.cut = mk(g, 'g', {}); mk(P.cut, 'rect', { x: x0, y: y0 - 7, width: w, height: 7, rx: 3, fill: CUT }); mk(P.cut, 'rect', { x: x0, y: y0 + 318, width: w, height: 7, rx: 3, fill: CUT });
  P.ue = mk(g, 'g', {}); P.le = mk(g, 'g', {});
  for (let x = x0; x < x1 - 4; x += 40) { mk(P.ue, 'rect', { x: x + 1, y: y0, width: 38, height: 30, rx: 6, fill: '#F6F1E2', stroke: BR, 'stroke-width': 1.6 }); }
  const gaps = mono ? [0.18, 0.62] : [0.22, 0.5, 0.78], ugaps = mono ? [0.3, 0.84] : [];
  for (let x = x0; x < x1 - 4; x += 40) { const u = (x - x0) / w; if (gaps.some(gg => Math.abs(u - gg) < 0.025)) continue; mk(P.le, 'rect', { x: x + 1, y: y0 + 288, width: 38, height: 30, rx: 6, fill: '#F6F1E2', stroke: BR, 'stroke-width': 1.6 }); }
  P.st = []; gaps.forEach(gg => { const x = x0 + gg * w; const Q = mk(g, 'g', {}); mk(Q, 'ellipse', { cx: x - 14, cy: y0 + 304, rx: 12, ry: 14, fill: '#E6F2DF', stroke: BR, 'stroke-width': 1.8 }); mk(Q, 'ellipse', { cx: x + 14, cy: y0 + 304, rx: 12, ry: 14, fill: '#E6F2DF', stroke: BR, 'stroke-width': 1.8 }); chloro(Q, x - 14, y0 + 304, 0.7); chloro(Q, x + 14, y0 + 304, 0.7); P.st.push([Q, x, y0 + 304]); });
  if (mono) ugaps.forEach(gg => { const x = x0 + gg * w; const Q = mk(g, 'g', {}); mk(Q, 'rect', { x: x - 26, y: y0, width: 52, height: 30, fill: '#FBF8F0' }); mk(Q, 'ellipse', { cx: x - 13, cy: y0 + 15, rx: 12, ry: 14, fill: '#E6F2DF', stroke: BR, 'stroke-width': 1.8 }); mk(Q, 'ellipse', { cx: x + 13, cy: y0 + 15, rx: 12, ry: 14, fill: '#E6F2DF', stroke: BR, 'stroke-width': 1.8 }); P.st.push([Q, x, y0 + 15]); });
  P.pal = mk(g, 'g', {}); P.spo = mk(g, 'g', {}); P.mes = mk(g, 'g', {}); P.chl = mk(g, 'g', {});
  if (!mono) { for (let x = x0 + 4; x < x1 - 20; x += 24) { mk(P.pal, 'rect', { x, y: y0 + 34, width: 21, height: 100, rx: 9, fill: '#EEF6E8', stroke: BR, 'stroke-width': 1.5 }); for (let q = 0; q < 4; q++) chloro(P.chl, x + 10.5, y0 + 50 + q * 22, 0.75); }
    for (let k = 0; k < 46; k++) { const x = x0 + 20 + rnd() * (w - 40), y = y0 + 158 + rnd() * 110; cell(P.spo, x, y, 16, 13, { f: '#EEF6E8', w: 1.4, j: 0.2 }); chloro(P.chl, x, y, 0.65); } }
  else { field(P.mes, x0 + 14, y0 + 52, x1 - 14, y0 + 270, 17, () => true, { f: '#EEF6E8', w: 1.3, k: 0.86, j: 0.18 }).forEach(c => { const b = c.getBBox ? null : null; }); }
  P.vb = []; const vbs = mono ? [0.1, 0.4, 0.7, 0.96].map(u => [x0 + u * w, 20]) : [[x0 + w * 0.5, 34]];
  vbs.forEach(([x, r]) => { const Q = mk(g, 'g', {}); const y = y0 + 170; ring(Q, x, y, r * 1.9, 7, 7, { f: '#F4EFDC', s: BR, w: 1.3, n: mono ? 12 : 16 });
    mk(Q, 'circle', { cx: x, cy: y, r: r * 1.6, fill: '#FBF8F0', stroke: 'none' }); [[-r * 0.5, -r * 0.6, r * 0.32], [r * 0.5, -r * 0.6, r * 0.32], [0, -r * 0.2, r * 0.26]].forEach(([a, b, rr]) => xc(Q, x + a, y + b, rr));
    mk(Q, 'path', { d: blobD(x, y + r * 0.75, r * 0.85, r * 0.45, 8, 0.05), fill: PHL, stroke: PH, 'stroke-width': 2 }); P.vb.push([Q, x, y, r]); });
  if (mono) { field(P.mes, x0, y0, x1, y0, 1, () => false); const mes = P.mes; [...mes.children].forEach(c => { const bb = c.getAttribute('d').match(/M([\d.]+),([\d.]+)/); if (bb) { const cx = +bb[1], cy = +bb[2]; if (P.vb.some(([_, x, y, r]) => Math.hypot(cx - x, cy - y) < r * 2.4)) c.remove(); else chloro(P.chl, cx + 6, cy + 10, 0.6); } }); }
  if (!mono) [...P.spo.children].forEach(c => { const bb = c.getAttribute('d').match(/M([\d.]+),([\d.]+)/); if (bb && P.vb.some(([_, x, y, r]) => Math.hypot(+bb[1] - x, +bb[2] - y) < r * 2.5)) c.remove(); });
  [...P.chl.children].forEach(c => { const x = +c.getAttribute('cx'), y = +c.getAttribute('cy'); if (P.vb.some(([_, vx, vy, r]) => Math.hypot(x - vx, y - vy) < r * 2.3)) c.remove(); });
  return P; };
const potato = (g, x, y, s = 1) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: blobD(0, 0, 70, 50, 9, 0.06), fill: '#C9A46A', stroke: BR, 'stroke-width': 3 }); mk(Q, 'path', { d: blobD(4, 2, 54, 36, 9, 0.04), fill: '#F6E9C3', stroke: '#B89A5A', 'stroke-width': 2 }); return W(Q); };
const guava = (g, x, y, s = 1) => { const Q = G(g, x, y, s); mk(Q, 'circle', { cx: 0, cy: 0, r: 62, fill: '#9CCB6E', stroke: BR, 'stroke-width': 3 }); mk(Q, 'circle', { cx: 0, cy: 0, r: 50, fill: '#F6D6D6' }); mk(Q, 'circle', { cx: 0, cy: 0, r: 26, fill: '#F2C2C2' });
  for (let k = 0; k < 26; k++) { const a = rnd() * 6.28, r = 30 + rnd() * 16; mk(Q, 'circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 2.2, fill: SCL }); } for (let k = 0; k < 8; k++) { const a = k * 0.785; mk(Q, 'ellipse', { cx: Math.cos(a) * 14, cy: Math.sin(a) * 14, rx: 4, ry: 3, fill: '#F3E7C9', stroke: BR, 'stroke-width': 1 }); } return W(Q); };
const rope = (g, x, y, s = 1) => { const Q = G(g, x, y, s); for (let k = 0; k < 4; k++) mk(Q, 'ellipse', { cx: 0, cy: 30 - k * 18, rx: 64 - k * 4, ry: 22, fill: k === 3 ? '#E3C990' : 'none', stroke: '#A8742A', 'stroke-width': 9 });
  for (let k = 0; k < 4; k++) mk(Q, 'ellipse', { cx: 0, cy: 30 - k * 18, rx: 64 - k * 4, ry: 22, fill: 'none', stroke: BR, 'stroke-width': 1.5, 'stroke-dasharray': '4 8' }); return W(Q); };
const leafShape = (g, x, y, s = 1, col = LEAF, r = 0) => { const Q = G(g, x, y, s, r); mk(Q, 'path', { d: 'M0,-110 C60,-70 66,30 0,110 C-66,30 -60,-70 0,-110Z', fill: col, stroke: BR, 'stroke-width': 3 }); mk(Q, 'path', { d: 'M0,-100 L0,112', stroke: '#D8ECD2', 'stroke-width': 3 });
  for (let k = 0; k < 5; k++) { const yy = -64 + k * 32; mk(Q, 'path', { d: `M0,${yy + 10} Q22,${yy} 40,${yy - 14} M0,${yy + 10} Q-22,${yy} -40,${yy - 14}`, stroke: '#D8ECD2', 'stroke-width': 2, fill: 'none' }); } return W(Q); };
const grass = (g, x, y, s = 1) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: 'M-10,110 C-8,20 -2,-60 6,-120 C10,-60 12,20 12,110Z', fill: '#7FB873', stroke: BR, 'stroke-width': 2.5 }); for (let k = -1; k <= 1; k++) mk(Q, 'path', { d: `M${1 + k * 5},104 L${3 + k * 2},-100`, stroke: '#D8ECD2', 'stroke-width': 1.5 }); return W(Q); };
// tissue close-ups
const parenG = (g, cx, cy, r, sz, o = {}) => { const Q = mk(g, 'g', {}); const cs = field(Q, cx - r, cy - r, cx + r, cy + r, sz, inAnn(cx, cy, 0, r), { f: o.f || PAR, w: o.w || 2.2, k: o.k || 1.12, j: 0.08, n: 6 }); return { g: Q, cs }; };
const collG = (g, x0, y0, cols, rows, sz) => { const Q = mk(g, 'g', {}), cn = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * sz + (r % 2 ? sz / 2 : 0), y = y0 + r * sz * 0.9; mk(Q, 'rect', { x, y, width: sz, height: sz * 0.9, fill: COLL, stroke: COL, 'stroke-width': 1.6 }); mk(Q, 'rect', { x: x + sz * 0.1, y: y + sz * 0.09, width: sz * 0.8, height: sz * 0.72, rx: sz * 0.3, fill: '#EEF5E4', stroke: COL, 'stroke-width': 1.4 }); }
  const T = mk(g, 'g', {}); for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) { const x = x0 + c * sz + (r % 2 ? sz / 2 : 0), y = y0 + r * sz * 0.9; if (r < rows || c < cols) cn.push(mk(T, 'circle', { cx: x, cy: y, r: sz * 0.13, fill: '#C9B36A', opacity: 0.85 })); }
  return { g: Q, corners: T }; };
const fibreP = (g, x, y, w, h, o = {}) => { const Q = mk(g, 'g', {}); mk(Q, 'path', { d: `M${x},${y - h / 2} C${x + w},${y - h / 3} ${x + w},${y + h / 3} ${x},${y + h / 2} C${x - w},${y + h / 3} ${x - w},${y - h / 3} ${x},${y - h / 2}Z`, fill: o.f || SCLL, stroke: o.s || SCL, 'stroke-width': o.sw || 3 });
  mk(Q, 'path', { d: `M${x},${y - h / 2 + 18} L${x},${y + h / 2 - 18}`, stroke: o.s || SCL, 'stroke-width': 1.6 }); return Q; };
const sclereid = (g, x, y, r) => { const Q = mk(g, 'g', {}); mk(Q, 'circle', { cx: x, cy: y, r, fill: SCLL, stroke: SCL, 'stroke-width': 3 }); for (let k = 1; k < 4; k++) mk(Q, 'circle', { cx: x, cy: y, r: r * (1 - k * 0.2), fill: 'none', stroke: SCL, 'stroke-width': 1.2, opacity: 0.6 });
  for (let k = 0; k < 8; k++) { const a = k * 0.785; mk(Q, 'line', { x1: x + Math.cos(a) * r * 0.22, y1: y + Math.sin(a) * r * 0.22, x2: x + Math.cos(a) * r * 0.95, y2: y + Math.sin(a) * r * 0.95, stroke: SCL, 'stroke-width': 1.4 }); }
  mk(Q, 'circle', { cx: x, cy: y, r: r * 0.2, fill: '#FBF3DC', stroke: SCL, 'stroke-width': 1.5 }); return Q; };
const vesselP = (g, x, y, w, h, n = 4) => { const Q = mk(g, 'g', {}), mh = h / n;
  for (let k = 0; k < n; k++) { const yy = y + k * mh; mk(Q, 'rect', { x, y: yy + 2, width: w, height: mh - 4, rx: 4, fill: XYL, stroke: XY, 'stroke-width': 3 });
    for (let q = 1; q < 5; q++) mk(Q, 'line', { x1: x + 3, y1: yy + q * mh / 5, x2: x + w - 3, y2: yy + q * mh / 5, stroke: XY, 'stroke-width': 2.2 });
    if (k) mk(Q, 'rect', { x: x + w * 0.2, y: yy - 3, width: w * 0.6, height: 6, fill: XYL }); }
  return Q; };
const tracheidP = (g, x, y, w, h) => { const Q = mk(g, 'g', {}); mk(Q, 'path', { d: `M${x},${y} L${x + w / 2},${y + 30} L${x + w / 2},${y + h - 30} L${x},${y + h} L${x - w / 2},${y + h - 30} L${x - w / 2},${y + 30}Z`, fill: XYL, stroke: XY, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  for (let k = 0; k < 7; k++) mk(Q, 'ellipse', { cx: x, cy: y + 50 + k * (h - 100) / 6, rx: 5, ry: 3, fill: '#FFFFFF', stroke: XY, 'stroke-width': 1.5 }); return Q; };
const sieveP = (g, x, y, w, h, n = 3) => { const Q = mk(g, 'g', {}), mh = h / n, pl = [];
  for (let k = 0; k < n; k++) mk(Q, 'rect', { x, y: y + k * mh, width: w, height: mh, fill: PHL, stroke: PH, 'stroke-width': 3 });
  for (let k = 1; k < n; k++) { const P2 = mk(Q, 'g', {}); mk(P2, 'line', { x1: x, y1: y + k * mh, x2: x + w, y2: y + k * mh, stroke: PH, 'stroke-width': 6 }); for (let q = 1; q < 6; q++) mk(P2, 'circle', { cx: x + q * w / 6, cy: y + k * mh, r: 2.4, fill: '#FFFFFF' }); pl.push(P2); }
  return { g: Q, plates: pl }; };
const compP = (g, x, y, w, h, n = 3) => { const Q = mk(g, 'g', {}), nu = [], mh = h / n;
  for (let k = 0; k < n; k++) { mk(Q, 'rect', { x, y: y + k * mh + 3, width: w, height: mh - 6, rx: w / 2, fill: '#F1EBDD', stroke: BR, 'stroke-width': 2 }); nu.push(mk(Q, 'ellipse', { cx: x + w / 2, cy: y + k * mh + mh / 2, rx: w * 0.3, ry: w * 0.42, fill: NUCL, stroke: NUC, 'stroke-width': 2 })); }
  return { g: Q, nu }; };
const boxCells = (g, x, y, w, h, n, f = PAR, s = BR) => { const Q = mk(g, 'g', {}), mh = h / n; for (let k = 0; k < n; k++) { mk(Q, 'rect', { x, y: y + k * mh + 2, width: w, height: mh - 4, rx: 8, fill: f, stroke: s, 'stroke-width': 2 }); mk(Q, 'circle', { cx: x + w * 0.35, cy: y + k * mh + mh * 0.45, r: Math.min(w, mh) * 0.12, fill: NUCL, stroke: NUC, 'stroke-width': 1.5 }); } return Q; };
const GL = (p, o = {}) => { const a = mk(p, 'g', {}), b = mk(a, 'g', {}); return [a, b]; }; // outer for vis, inner for opacity


const EP = { who: 'Diya',
  icons: { potato: ['M5 10c0-4 5-6 9-5s6 5 4 9-7 5-10 3-3-4-3-7Z', 'M10 10h.01', 'M14 13h.01'], guava: ['M12 4a8 8 0 1 0 .01 0Z', 'M12 9h.01', 'M9 12h.01', 'M15 12h.01', 'M12 15h.01'], rope: ['M4 7c0-2 16-2 16 0s-16 2-16 5 16 2 16 5-16 2-16 4'],
    cells: ['M3 3h8v8H3Z', 'M13 3h8v8h-8Z', 'M3 13h8v8H3Z', 'M13 13h8v8h-8Z'], layers: ['M12 3 2 8l10 5 10-5Z', 'M2 13l10 5 10-5', 'M2 18l10 5 10-5'] },
  jobs: [['potato', 'A soft potato', 'IN THE KITCHEN', 'H1:potato'], ['guava', 'A gritty guava', 'FROM THE MARKET', 'H1:guava'], ['rope', 'A jute rope', 'ON THE CART', 'H1:jute']],
  H: { pillAt: 'H2:plants', hkAt: 'H3:what', splAt: 'H4:team', splPAt: 'H5:five',
    spl: [['cells', 'Simple tissues', 'ONE TYPE OF CELL'], ['layers', 'Complex tissues', 'MANY TYPES OF CELL'], ['leaf', 'Spot each one', 'BY ITS CELLS']],
    draw: s => { mk(s, 'line', { x1: 36, y1: 430, x2: 748, y2: 430, stroke: C.dim, 'stroke-width': 3 });
      const a = potato(s, 150, 300, 1.75), b = guava(s, 392, 300, 1.7), c = rope(s, 630, 320, 1.75);
      return [[a, 'H2+0.3'], [b, 'H2+0.6'], [c, 'H2+0.9'], [tag(s, 150, 470, 'SOFT', WAT), 'H2:soft', { dy: 6 }], [tag(s, 392, 470, 'SANDY GRAINS', SCL), 'H2:sandy', { dy: 6 }], [tag(s, 630, 470, 'STRONG FIBRES', PH), 'H2:strong', { dy: 6 }]]; } },
  D: { tiles: [
      ['Parenchyma', 'Thin walls, the soft filling', 'D3:parenchyma', (s, w) => { const p = parenG(s, w / 2, 118, 92, 20); return []; }],
      ['Collenchyma', 'Walls thick at the corners', 'D3:collenchyma', (s, w) => { collG(s, w / 2 - 92, 40, 4, 4, 44); return []; }],
      ['Sclerenchyma', 'Hard lignified walls, dead', 'D3:sclerenchyma', (s, w) => { for (let k = 0; k < 5; k++) fibreP(s, w / 2 - 64 + k * 32, 120 + (k % 2) * 10, 14, 170); return []; }],
      ['Xylem', 'Carries water. Many cell types', 'D4:xylem', (s, w) => { vesselP(s, w / 2 - 70, 30, 52, 184, 4); tracheidP(s, w / 2 + 40, 34, 40, 176); return []; }],
      ['Phloem', 'Carries food. Many cell types', 'D4:phloem', (s, w) => { sieveP(s, w / 2 - 60, 30, 60, 184, 3); compP(s, w / 2 + 4, 30, 22, 184, 3); fibreP(s, w / 2 + 64, 122, 12, 170, { f: '#E8D5B0' }); return []; }]],
    extra: s => { const A = mk(s, 'g', {}), Ai = [], X = {};
      for (let k = 0; k < 4; k++) { const Q = mk(A, 'g', {}); mk(Q, 'rect', { x: 300 + (k % 2) * 92, y: 150 + Math.floor(k / 2) * 92, width: 86, height: 86, rx: 14, fill: '#EEF5E4', stroke: BR, 'stroke-width': 3 }); mk(Q, 'circle', { cx: 343 + (k % 2) * 92, cy: 193 + Math.floor(k / 2) * 92, r: 14, fill: NUCL, stroke: NUC, 'stroke-width': 2.5 }); Ai.push(Q); }
      X.t1 = tag(A, 392, 420, 'YOUNG CELLS KEEP DIVIDING', C.ac, 17); X.ar = mk(A, 'path', { d: 'M560,246 L760,246 M744,232 L760,246 L744,260', stroke: C.ac, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
      X.p = mk(A, 'g', {}); parenG(X.p, 900, 246, 70, 18); collG(X.p, 1010, 186, 3, 3, 40); for (let k = 0; k < 4; k++) fibreP(X.p, 1190 + k * 26, 246, 11, 150);
      X.t2 = tag(A, 1060, 420, 'STOPPED DIVIDING · ONE JOB EACH', C.ac, 17);
      const B0 = mk(s, 'g', {}); mk(B0, 'path', { d: 'M52,470 L52,486 L956,486 L956,470', stroke: C.ac, 'stroke-width': 3, fill: 'none' }); tag(B0, 504, 516, 'SIMPLE · ONE TYPE OF CELL', C.ac, 17);
      const B1 = mk(s, 'g', {}); mk(B1, 'path', { d: 'M972,470 L972,486 L1548,486 L1548,470', stroke: PH, 'stroke-width': 3, fill: 'none' }); tag(B1, 1260, 516, 'COMPLEX · MANY TYPES OF CELL', PH, 17);
      const tDiv = cue('D2:dividing'), tOut = cue('D3') - 0.2;
      return { items: [[B0, 'D3:simple', { dy: 10 }], [B1, 'D4:complex', { dy: 10 }]], anim: t => { M.vis(A, t, cue('D2') - 0.1, tOut, { dy: 20, outDur: 0.3 });
        Ai.forEach((q, k) => M.vis(q, t, tDiv - 0.6 + k * 0.35, 1e9, { ...POP, sc: 0.3 })); M.vis(X.t1, t, tDiv, 1e9, { dy: 6 }); M.draw(X.ar, t, cue('D2:stop') - 0.2, 0.5); M.vis(X.p, t, cue('D2:stop'), 1e9, { dx: -20, dy: 0 }); M.vis(X.t2, t, cue('D2:job'), 1e9, { dy: 6 }); } }; } },
  Z: { av: { text: 'So that is the grit in a guava!', in: 'Z6:guava+0.5', out: 'P1-0.3' }, push: ['Z6:guava-0.2', 1000, 520, 'P1-0.5'],
    levels: [
      { chip: 'YOUNG STEM', at: 'Z1', tag: 'STEM x10', info: ['A YOUNG STEM, CUT ACROSS', 'The stem', 'Each ring is a team of cells.', 'Zoom in, one tissue at a time.'],
        draw: g => { const S = stemTS(g, 300, 263, 236); return { labs: [[lab(g, 300 + 236 * 0.98 * 0.707, 263 - 236 * 0.98 * 0.707, 640, 70, 'Epidermis'), 'Z1:stem'], [lab(g, 300 + 236 * 0.86 * 0.96, 263 - 236 * 0.86 * 0.28, 640, 170, 'Collenchyma'), 'Z1:simple'], [lab(g, 300 + 236 * 0.72, 263 + 30, 640, 300, 'Parenchyma'), 'Z2:Parenchyma']] }; } },
      { chip: 'PARENCHYMA', at: 'Z2:thin-0.3', tag: 'x400', ring: [470, 293, 40], info: ['SIMPLE TISSUE 1 OF 3', 'Parenchyma', 'Thin cellulose walls. Living cells.', 'Makes food, stores food, secretes.'],
        draw: g => { const p = parenG(g, 330, 270, 210, 42, { w: 3 }); const ch = mk(g, 'g', {}), sg = mk(g, 'g', {}), nu = mk(g, 'g', {});
          p.cs.forEach((c, i) => { const m = c.getAttribute('d').match(/M([\d.]+),([\d.]+)/), b = c.getBBox ? null : null; });
          const pts = []; for (let r = 0, y = 270 - 210; y <= 480; r++, y += 42 * 1.72) for (let x = 120 + (r % 2 ? 42 : 0); x <= 540; x += 84) if (Math.hypot(x - 330, y - 270) < 180) pts.push([x, y]);
          pts.forEach(([x, y], i) => { mk(nu, 'circle', { cx: x - 12, cy: y - 10, r: 8, fill: NUCL, stroke: NUC, 'stroke-width': 1.5 }); chloro(ch, x + 12, y + 4, 1); chloro(ch, x - 4, y + 16, 1); mk(sg, 'ellipse', { cx: x + 10, cy: y - 14, rx: 6, ry: 4.5, fill: '#FFFFFF', stroke: GOLD, 'stroke-width': 1.8 }); });
          const sp = []; for (let k = 0; k < 9; k++) { const a = k * 0.7, r = 40 + k * 16; sp.push([330 + Math.cos(a) * r * 0.8, 270 + Math.sin(a) * r * 0.8]); }
          const ins = mk(g, 'g', {}); potato(ins, 930, 260, 1.15); tag(ins, 930, 350, 'POTATO · STORES FOOD', GOLD, 15);
          return { labs: [[lab(g, 414, 204, 640, 100, 'Thin cellulose wall'), 'Z2:thin'], [lab(g, 330, 325, 640, 410, 'Intercellular space'), 'Z2:spaces'], [lab(g, 300, 353, 640, 300, 'Chloroplast'), 'Z3:photosynthesis'], [lab(g, 382, 190, 640, 190, 'Stored food'), 'Z3:stores']],
            items: [[nu, 'Z2:cells'], [ch, 'Z3:photosynthesis'], [sg, 'Z3:stores'], [ins, 'Z3:potato-0.3']] }; } },
      { chip: 'COLLENCHYMA', at: 'Z4', tag: 'x400', ring: [520, 380, 44], info: ['SIMPLE TISSUE 2 OF 3', 'Collenchyma', 'Walls thick only at the corners.', 'Strong but bendy: young stems, petioles.'],
        draw: g => { const B = mk(g, 'g', {}), Bi = mk(B, 'g', {}); for (let x = 60; x < 600; x += 60) mk(Bi, 'rect', { x, y: 60, width: 58, height: 44, rx: 8, fill: '#F6F1E2', stroke: BR, 'stroke-width': 2.2 }); mk(Bi, 'rect', { x: 60, y: 52, width: 540, height: 8, rx: 4, fill: CUT });
          const cg = collG(Bi, 60, 108, 8, 5, 66); const pet = mk(g, 'g', {}); mk(pet, 'path', { d: 'M820,470 C820,380 840,300 880,240', stroke: '#4E7A34', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }); leafShape(pet, 920, 170, 0.7, LEAF, 40); tag(pet, 820, 500, 'PETIOLE', C.ac, 15);
          const tp = tag(g, 330, 470, 'CELLULOSE · HEMICELLULOSE · PECTIN', COL, 16);
          const tB = cue('Z5:bendy');
          return { labs: [[lab(g, 300, 80, 700, 70, 'Epidermis'), 'Z4:skin'], [lab(g, 60 + 4 * 66, 108 + 2 * 59.4, 700, 220, 'Thickened corners', 'start', [560, 220]), 'Z4:corners']], items: [[cg.corners, 'Z4:thick', { ...POP, sc: 0.2 }], [tp, 'Z4:cellulose', { dy: 6 }], [pet, 'Z5:petiole-0.4', { dy: 20 }]],
            anim: t => { const u = t > tB ? Math.sin((t - tB) * 3) * 4 * M.clamp((t - tB) / 0.5) : 0; Bi.setAttribute('transform', `skewX(${u.toFixed(2)})`); } }; } },
      { chip: 'SCLERENCHYMA', at: 'Z6', tag: 'x400', ring: [300, 92, 36], info: ['SIMPLE TISSUE 3 OF 3', 'Sclerenchyma', 'Thick walls hardened with lignin. Usually dead.', 'Long fibres and short sclereids.'],
        draw: g => { const F = mk(g, 'g', {}); for (let k = 0; k < 6; k++) fibreP(F, 90 + k * 40, 270 + (k % 2) * 16, 18, 400, { sw: 5 });
          const S = mk(g, 'g', {}); [[470, 190, 48], [580, 250, 56], [480, 330, 44], [600, 380, 40]].forEach(([x, y, r]) => sclereid(S, x, y, r));
          const ins = mk(g, 'g', {}); guava(ins, 860, 340, 1.25); tag(ins, 860, 440, 'GUAVA PULP · SCLEREIDS', SCL, 15);
          return { labs: [[lab(g, 130, 150, 60, 50, 'Lignified wall', 'start', [60, 50]), 'Z6:lignin'], [lab(g, 250, 420, 250, 470, 'Fibres', 'start'), 'Z6:fibres'], [lab(g, 620, 228, 760, 120, 'Sclereids'), 'Z6:sclereids']], items: [[F, 'Z6:fibres-0.6', { dy: 20 }], [S, 'Z6:sclereids-0.3', { ...POP, sc: 0.3 }], [ins, 'Z6:guava-0.3', { ...POP, sc: 0.5 }]] }; } }] },
  P: { intro: ['TWO COMPLEX TISSUES', 'Xylem, phloem', 'Many types of cells, working as one.'],
    stages: [{ chip: 'WATER UP', at: 'P2', info: ['XYLEM', 'Water up', 'Tracheids and vessels: dead, empty tubes with lignified walls.'] },
      { chip: 'VESSELS', at: 'P3', info: ['XYLEM', 'Vessels', 'Many cells joined end to end. A feature of angiosperms. Gymnosperms lack them.'] },
      { chip: 'FIBRES + PARENCHYMA', at: 'P4', info: ['XYLEM', 'Helpers', 'Xylem fibres for strength. Living xylem parenchyma stores food.'] },
      { chip: 'FOOD FLOWS', at: 'P5', info: ['PHLOEM', 'Food flows', 'Sieve tubes carry food. Their end walls are sieve plates.'] },
      { chip: 'COMPANION CELL', at: 'P6', info: ['PHLOEM', 'The controller', 'No nucleus in a mature sieve tube. The companion cell controls it.'] }],
    draw: (s, tPs) => { mk(s, 'line', { x1: 528, y1: 30, x2: 528, y2: 496, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
      const hx = tag(s, 270, 46, 'XYLEM · WATER UP', XY, 17), hp = tag(s, 790, 46, 'PHLOEM · FOOD', PH, 17);
      const E = {}; const el = (k, fn, lb, lx, ly) => { const [a, b] = GL(s); fn(b); const tl = tag(b, lx, ly, lb, C.ink, 13); E[k] = [a, b]; };
      let V, Sv, Cc, flow = [], food = [];
      el('ves', b => { V = vesselP(b, 70, 80, 74, 380, 4); for (let k = 0; k < 3; k++) flow.push(mk(b, 'line', { x1: 92 + k * 15, y1: 458, x2: 92 + k * 15, y2: 84, stroke: '#2F6FEB', 'stroke-width': 3, 'stroke-dasharray': '6 16' })); }, 'VESSEL', 107, 490);
      el('tra', b => { tracheidP(b, 210, 90, 56, 360); flow.push(mk(b, 'line', { x1: 210, y1: 430, x2: 210, y2: 110, stroke: '#2F6FEB', 'stroke-width': 3, 'stroke-dasharray': '6 16' })); }, 'TRACHEID', 210, 490);
      el('fib', b => { fibreP(b, 310, 270, 16, 360); fibreP(b, 344, 280, 16, 340); }, 'FIBRES', 327, 490);
      el('xpa', b => { boxCells(b, 392, 110, 90, 330, 5); }, 'PARENCHYMA', 437, 490);
      el('sie', b => { Sv = sieveP(b, 570, 80, 86, 380, 3); for (let k = 0; k < 7; k++) food.push(mk(b, 'circle', { cx: 590 + (k % 3) * 22, cy: 100, r: 6, fill: GOLD, stroke: '#8A6414', 'stroke-width': 1.5 })); }, 'SIEVE TUBE', 613, 490);
      el('com', b => { Cc = compP(b, 662, 80, 30, 380, 3); }, 'COMPANION', 677, 512);
      el('ppa', b => { boxCells(b, 740, 110, 90, 330, 5, '#FBF3DC', PH); }, 'PARENCHYMA', 785, 490);
      el('pfi', b => { fibreP(b, 890, 270, 16, 360, { f: '#E8D5B0' }); fibreP(b, 930, 280, 16, 340, { f: '#E8D5B0' }); }, 'FIBRES · JUTE', 912, 512);
      const gy = mk(s, 'g', {}); mk(gy, 'rect', { x: 40, y: 2, width: 0, height: 0 }); const gyT = mk(s, 'g', {}); mk(gyT, 'rect', { x: 60, y: 416, width: 300, height: 34, rx: 8, fill: C.redBg }); tag(gyT, 210, 439, 'GYMNOSPERMS: NO VESSELS', C.red, 15);
      const join = mk(s, 'g', {}); [175, 270, 365].forEach(y => { mk(join, 'path', { d: `M150,${y} l18,0 m-8,-8 l8,8 l-8,8`, stroke: C.ac, 'stroke-width': 3, fill: 'none' }); });
      const LIT = [['ves', 'tra'], ['ves'], ['fib', 'xpa'], ['sie'], ['com', 'ppa', 'pfi']], IN = [['ves', 'tra'], [], ['fib', 'xpa'], ['sie'], ['com', 'ppa', 'pfi']];
      return (t, st) => { M.vis(hx, t, cue('P1') + 0.3, 1e9, { dy: 6 }); M.vis(hp, t, cue('P1') + 0.5, 1e9, { dy: 6 });
        Object.keys(E).forEach((k, j) => M.vis(E[k][0], t, cue('P1') + 0.6 + j * 0.15, 1e9, { dy: 20 }));
        Object.keys(E).forEach(k => { const on = st >= 0 && LIT[st].includes(k); E[k][1].style.opacity = on ? 1 : 0.4; });
        flow.forEach((f, i) => f.style.strokeDashoffset = ((t * 40 + i * 7) % 22).toFixed(1));
        food.forEach((f, k) => { const u = ((t * 0.22 + k / 7) % 1); attr(f, 'cy', (100 + u * 350).toFixed(1)); });
        Cc.nu.forEach((n, i) => { const sc = st === 4 ? 1 + 0.15 * Math.sin(t * 5 + i) : 1; n.setAttribute('rx', (9 * sc).toFixed(2)); n.setAttribute('ry', (12.6 * sc).toFixed(2)); });
        M.vis(gyT, t, cue('P3:Gymnosperms') - 0.1, cue('P4'), { ...POP, outDur: 0.25 }); M.vis(join, t, cue('P3:joined') - 0.1, cue('P4'), { ...POP, outDur: 0.25 }); }; } },
  V: { h: ['Xylem', 'Phloem'], hAt: ['C1:xylem', 'C1:phloem'],
    rows: [['Tissue type', 'Complex', 'Complex', 1, 'C2:complex', 'C2:complex+0.3'], ['Shape', 'Long tubes', 'Long tubes', 1, 'C2:long', 'C2:long+0.3'], ['Runs', 'Root to leaf', 'Root to leaf', 1, 'C2:root', 'C2:root+0.3'],
      ['Carries', 'Water and minerals', 'Food', 0, 'C3:water', 'C3:food'], ['Main tubes', 'Dead', 'Alive (sieve tubes)', 0, 'C3:dead', 'C3:alive']],
    think: { q: 'A mature sieve tube has no nucleus. So who controls it?', opts: ['The companion cell', 'The vessel'], right: 0, why: 'The companion cell. It sits right beside the sieve tube. A vessel is dead xylem.' }, thinkOpt: 'C4:companion', thinkWhy: 'C5:It' },
  T: { st2: 'One type of cell, or <span class="acc">many</span>.', stF: 'simple: parenchyma · collenchyma · sclerenchyma &nbsp;|&nbsp; complex: <b style="color:#5AA0C8">xylem</b> · <b style="color:#C9962B">phloem</b>', c2: 'T1:One', cF: 'T1:Many' },
  W: { label: 'WORKED EXAMPLE · MATCH EACH CLUE TO ITS TISSUE', targets: ['Parenchyma', 'Collenchyma', 'Sclerenchyma', 'Phloem'],
    clues: [['Walls thick only at the corners', 1, 'W2'], ['Hard grains in guava pulp', 2, 'W3'], ['Thin walls, living, food stored inside', 0, 'W4'], ['End walls with sieve plates', 3, 'W5']] },
  X: { wrong: 'Every plant with xylem has vessels', right: 'Gymnosperms lack vessels. They use tracheids.', tW: 'X2:every', tR: 'X3:They', type: 'Statements: which plants lack vessels, which cells are dead, where sclereids are found', tType: 'E1:statements',
    draw: s => { const a = mk(s, 'g', {}); vesselP(a, 80, 40, 50, 150, 3); const at = mk(s, 'g', {}); mk(at, 'rect', { x: 30, y: 214, width: 150, height: 34, rx: 8, fill: C.okBg }); tag(at, 105, 237, 'ANGIOSPERM', C.ok, 15);
      const b = mk(s, 'g', {}); tracheidP(b, 330, 40, 40, 150); const bt = mk(s, 'g', {}); mk(bt, 'rect', { x: 245, y: 214, width: 170, height: 34, rx: 8, fill: C.okBg }); tag(bt, 330, 237, 'GYMNOSPERM', C.ok, 15);
      return [[a, 'X3:angiosperms-0.2', { ...POP, sc: 0.5 }], [at, 'X3:angiosperms', POP], [b, 'X3:tracheids-0.2', { ...POP, sc: 0.5 }], [bt, 'X3:tracheids', POP]]; } },
  Q: { pat: 'NEET PATTERN · HOW MANY ARE CORRECT?', qW: 820, tOpts: 'Q1:Read', cols: 2, optW: 474, optY: 330, optH: 84, optFs: 30, right: 1,
    q: '<div class="sl"><b style="width:60px">I</b>Sclereids are found in the pulp of guava.</div><div class="sl"><b style="width:60px">II</b>Phloem parenchyma is absent in most monocots.</div><div class="sl"><b style="width:60px">III</b>Gymnosperms have companion cells.</div><div class="sl"><b style="width:60px">IV</b>Collenchyma has thick, lignified walls.</div>',
    opts: ['Only one', 'Only two', 'Only three', 'All four'] },
  A: [['Answer: <b style="color:var(--ok)">B</b>', 'A1:B'], ['I is true: guava pulp', 'A2:Sclereids'], ['II is true: most monocots', 'A2:monocots'], ['III is false: no companion cells', 'A3:Three'], ['IV is false: not lignified', 'A3:Four']],
  F: { title: 'Recap · permanent tissues', lines: ['<b>Simple</b> (one cell type): parenchyma, collenchyma, sclerenchyma', '<b>Parenchyma</b>: thin cellulose walls · makes food, stores, secretes',
    `<b>Collenchyma</b>: corners thickened · <b>Sclerenchyma</b>: lignified, dead (fibres, sclereids)`, `<b style="color:${XY}">Xylem</b>: water · tracheids, vessels (none in gymnosperms), fibres, parenchyma`,
    `<b style="color:${PH}">Phloem</b>: food · sieve tubes, companion cells, parenchyma, fibres`] },
  Y: ['What makes a tissue simple, and what makes it complex?', 'Where are the walls of collenchyma thickened?', 'Which group of plants lacks vessels?'],
  N: { label: 'NEXT · EP 51', topic: 'A waxy leaf that breathes: Tissue Systems in Plants' } };


/* ---------- generic episode frame (Eps 50-54) ---------- */
Object.assign(M.IC, EP.icons || {});
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tD1 = T0('D1'), tZ1 = T0('Z1'), tP1 = T0('P1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const FACE = IMG + (EP.who === 'Aarav' ? 'aarav-face.jpg' : 'diya-face.jpg');
const runItems = (its, t) => its.forEach(([el, c, o]) => M.vis(el, t, cue(c), 1e9, o || { ...POP, sc: 0.5 }));

/* title card */
$('#jobs').innerHTML = EP.jobs.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = EP.jobs.map(j => cue(j[3]));

/* H */
const HIT = EP.H.draw($('#hlS'));
$('#hdF').style.backgroundImage = `url(${FACE})`;
$('#sbs').innerHTML = EP.H.spl.map(([ic, n, s], i) => `<div class="sb" id="sb${i}" style="top:${84 + i * 94}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="sn">${n}</div><div class="ss">${s}</div></div>`).join('');

/* D */
const DN = EP.D.tiles.length, DWd = (1528 - (DN - 1) * 20) / DN;
$('#gts').innerHTML = EP.D.tiles.map(([n, s], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * (DWd + 20)}px;width:${DWd}px"><div class="gx">${i + 1} OF ${DN}</div><svg id="gs${i}" width="${DWd}" height="230" style="position:absolute;left:0;top:0"></svg><div class="gn">${n}</div><div class="gs" style="width:${DWd - 36}px">${s}</div></div>`).join('');
const DIT = EP.D.tiles.map((tl, i) => tl[3]($('#gs' + i), DWd) || []);
const DX = EP.D.extra ? EP.D.extra($('#dwS')) : { items: [] };
const TC = EP.D.chips || [];
$('#tcs').innerHTML = TC.map(([ic, n], i) => `<div class="tc" id="tc${i}">${M.icon(ic, 24, '#fff', 2.2)}${n}</div>`).join('');

/* Z: zoom ladder */
const ZL = EP.Z.levels, ZN = ZL.length;
$('#zch').innerHTML = ZL.map((L, i) => `<span class="zc" id="zc${i}">${L.chip}</span>${i < ZN - 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
$('#lvs').innerHTML = ZL.map(({ info: [r, n, d, h] }, i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 13 ? 44 : 56}px">${n}</div><div class="ld">${d}</div><div class="lh">${h || ''}</div></div>`).join('');
const zs = $('#zS'), tZ = ZL.map(L => cue(L.at));
const ZG = ZL.map((L, k) => { const g = mk(zs, 'g', {}); const R = L.draw(g) || {}; R.g = g; R.labs = R.labs || []; R.items = R.items || []; return R; });
const ZR = ZL.map(L => L.ring ? mk(zs, 'circle', { cx: L.ring[0], cy: L.ring[1], r: L.ring[2], fill: 'none', stroke: C.ac, 'stroke-width': 3.5, 'stroke-dasharray': '10 8', transform: `rotate(-90 ${L.ring[0]} ${L.ring[1]})` }) : null);
const ZT = ZL.map(L => { if (!L.tag) return null; const g = mk(zs, 'g', {}); mk(g, 'rect', { x: 1056 - 24 - 160, y: 20, width: 160, height: 36, rx: 8, fill: C.ink }); tag(g, 1056 - 24 - 80, 44, L.tag, '#FFFFFF', 16);
  mk(g, 'rect', { x: 1056 - 24 - 160, y: 64, width: 160, height: 30, rx: 7, fill: C.paper, stroke: C.dim, 'stroke-dasharray': '4 3' }); txt(g, 1056 - 24 - 80, 85, 'EXAMPLE FIGURES', { 'text-anchor': 'middle', 'font-size': 13, 'letter-spacing': 1.5 }); return g; });
const avZ = EP.Z.av ? PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 104, who: EP.who, face: FACE, text: EP.Z.av.text }) : null;

/* P: process */
const PS = EP.P.stages, tPs = PS.map(s => cue(s.at));
$('#pch').innerHTML = PS.map((s, i) => `<span class="zc" id="pc${i}">${i + 1} ${s.chip}</span>${i < PS.length - 1 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const PI = [EP.P.intro, ...PS.map(s => s.info)];
$('#pis').innerHTML = PI.map(([r, n, d], i) => `<div class="lvI" id="pi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln" style="font-size:${n.length > 12 ? 44 : 54}px">${n}</div><div class="ld" style="font-size:25px;top:150px">${d}</div></div>`).join('');
const PRUN = EP.P.draw($('#pS'), tPs);

/* V + think */
const VR = EP.V.rows.map(r => [r[0], r[1], r[2], r[3], cue(r[4]), cue(r[5])]);
$('#vh0').innerHTML = EP.V.h[0]; $('#vh1').innerHTML = EP.V.h[1];
$('#vrs').innerHTML = VR.map(([k, a, b, same], i) => `<div class="vr" id="vr${i}" style="top:${100 + i * 92}px"><div class="vk">${k}</div><div class="vt" id="vt${i}a" style="left:320px">${a}</div><div class="vt" id="vt${i}b" style="left:890px">${b}</div>
  <div class="eq" id="eq${i}" style="background:${same ? C.soft : C.ac};color:${same ? C.mute : '#fff'}">${same ? 'SAME' : 'DIFFERENT'}</div></div>`).join('');
const th1 = PUC.think($('#th1'), EP.V.think);

/* statement */
$('#st2').innerHTML = EP.T.st2; $('#stF').innerHTML = `<span style="font:600 30px 'IBM Plex Mono';color:var(--mute);letter-spacing:.02em">${EP.T.stF}</span>`;

/* W: matching */
const MC = EP.W.clues, MG = EP.W.targets, MGy = j => MG.length === 1 ? 84 + 174 : 84 + j * (348 / (MG.length - 1));
$('#wlb').textContent = EP.W.label;
$('#mcs').innerHTML = MC.map(([s], i) => `<div class="mc" id="mc${i}" style="top:${84 + i * 116}px"><div class="mn">${i + 1}</div><div class="mt2">${s}</div></div>`).join('') + MG.map((g, j) => `<div class="mg" id="mg${j}" style="top:${MGy(j)}px">${g}</div>`).join('');
const MLN = MC.map(([s, j], i) => mk($('#wS'), 'path', { d: `M936,${132 + i * 116} C1060,${132 + i * 116} 1060,${MGy(j) + 48} 1180,${MGy(j) + 48}`, stroke: C.ac, 'stroke-width': 3.5, fill: 'none' }));
const tMc = MC.map(m => T0(m[2])), tMg = MC.map(m => wt(m[2], 'That'));

/* X / Q / F */
const trap = PUC.trap($('#trap'), { wrong: EP.X.wrong, right: EP.X.right });
const TPI = EP.X.draw ? EP.X.draw($('#tS')) : [];
const where = PUC.where($('#wa'), { on: [], type: EP.X.type });
const mcq = PUC.mcq($('#mq'), EP.Q);
const so = PUC.solution($('#so'), EP.A.map(a => [a[0]]), { y0: 100, dy: EP.A.length > 4 ? 100 : 120 });
const tSo = EP.A.map(a => cue(a[1]));
const fc = PUC.fcard($('#sF'), { x: 230, y: 262, w: 1460, h: 470, title: EP.F.title, y0: 100, dy: 70, txt: EP.F.lines.map(() => 1), lines: EP.F.lines });
$('#yrs').innerHTML = EP.Y.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: EP.N.label, topic: EP.N.topic, y: 764 });

/* helpers */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const ck = [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]];
if (EP.Z.push) ck.push([cue(EP.Z.push[0]), 1.05, EP.Z.push[1], EP.Z.push[2]], [cue(EP.Z.push[3]), 1, 960, 540]);
const camF = M.camera($('#cam'), ck);
let geo = null;
function measure() { geo = 1; let w = 0; TC.forEach((_, i) => w += $('#tc' + i).offsetWidth); w += (TC.length - 1) * 16; let x = 800 - w / 2; TC.forEach((_, i) => { const e = $('#tc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const lite = (el, on, done) => { el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; };

/* frame */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  EP.jobs.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o }); runItems(HIT, t);
    M.vis($('#hlP'), t, cue(EP.H.pillAt) - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.15;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, kOut, { ...POP, sc: 0.5, outDur: 0.25 });
    M.vis($('#hkP'), t, cue(EP.H.hkAt) - 0.2, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    const sOn = M.vis($('#spl'), t, tH4, 1e9, { dy: 0, fade: 0.25 });
    if (sOn) { const ts = cue(EP.H.splAt); EP.H.spl.forEach((_, i) => M.vis($('#sb' + i), t, ts + i * 0.3, 1e9, { dx: -16, dy: 0 })); M.vis($('#splP'), t, cue(EP.H.splPAt) - 0.1, 1e9, POP); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dw'), t, tD1 + 0.05, OUT('Z1'), { dy: 36, ...o });
    EP.D.tiles.forEach((g, i) => { M.vis($('#gt' + i), t, cue(g[2]) - 0.15, 1e9, { dy: 24 }); runItems(DIT[i], t); });
    TC.forEach((c, i) => M.vis($('#tc' + i), t, cue(c[2]) - 0.1, 1e9, POP));
    runItems(DX.items, t); if (DX.anim) DX.anim(t);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tP1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('P1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < ZN; k++) if (t >= tZ[k]) cur = k;
    ZL.forEach((_, i) => lite($('#zc' + i), i === cur, i < cur));
    ZG.forEach((R, k) => { const tout = k < ZN - 1 ? tZ[k + 1] : 1e9; const on = M.vis(R.g, t, tZ[k] + (k ? 0.15 : 0.1), tout, { dy: 0, sc: 0.94, fade: 0.3, outDur: 0.3, osc: 1.06, ody: 0 });
      if (on) { R.labs.forEach(([l, c]) => labRun(l, t, cue(c))); runItems(R.items, t); if (R.anim) R.anim(t); }
      if (ZT[k]) M.vis(ZT[k], t, tZ[k] + 0.5, tout, { ...POP, outDur: 0.25 });
      if (ZR[k]) { M.draw(ZR[k], t, tZ[k] - 0.9, 0.6); M.vis(ZR[k], t, tZ[k] - 0.9, tZ[k] + 0.1, { dy: 0, fade: 0.1, outDur: 0.2 }); } });
    ZL.forEach((_, i) => M.vis($('#lvi' + i), t, i ? tZ[i] + 0.3 : tZ1 + 0.4, i < ZN - 1 ? tZ[i + 1] + 0.1 : 1e9, { dy: 20, outDur: 0.25, ody: -12 }));
    if (avZ) avZ(t, cue(EP.Z.av.in), cue(EP.Z.av.out));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pch'), t, tP1, out, { dy: 12, ...o });
    M.vis($('#pd'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pe'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let st = -1; tPs.forEach((tt, i) => { if (t >= tt - 0.05) st = i; });
    PS.forEach((_, i) => lite($('#pc' + i), i === st, i < st));
    PRUN(t, st);
    PI.forEach((_, i) => M.vis($('#pi' + i), t, i ? tPs[i - 1] + 0.1 : tP1 + 0.4, i < PS.length ? tPs[i] : 1e9, { dy: 20, outDur: 0.25, ody: -12 }));
  }

  /* V + think */
  const vOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vc'), t, tC1 + 0.05, OUT('C4'), { dy: 36, ...o });
    M.vis($('#vh0'), t, cue(EP.V.hAt[0]) - 0.1, 1e9, POP); M.vis($('#vh1'), t, cue(EP.V.hAt[1]) - 0.1, 1e9, POP);
    let cur = -1; VR.forEach((v, i) => { if (t >= v[4] - 0.1) cur = i; });
    VR.forEach((v, i) => { const r = $('#vr' + i); M.vis(r, t, tC1 + 0.6 + i * 0.12, 1e9, { dy: 14 }); r.style.background = i === cur ? C.ac3 : 'transparent';
      M.vis($('#vt' + i + 'a'), t, v[4], 1e9, { dx: -12, dy: 0 }); M.vis($('#vt' + i + 'b'), t, v[5], 1e9, { dx: -12, dy: 0 }); M.vis($('#eq' + i), t, v[5] + 0.3, 1e9, POP); });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: cue(EP.V.thinkOpt) - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: cue(EP.V.thinkWhy) - 0.2 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, cue(EP.T.c2) - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, cue(EP.T.cF) - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wbd'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    MG.forEach((_, j) => M.vis($('#mg' + j), t, tW1 + 0.4 + j * 0.1, 1e9, { dx: 16, dy: 0 }));
    MG.forEach((_, j) => { let on = 0; MC.forEach(([s, jj], i) => { if (jj === j) on = Math.max(on, M.io((t - tMg[i]) / 0.3) * (1 - M.io((t - (i < MC.length - 1 ? tMg[i + 1] - 0.1 : 1e9)) / 0.3))); });
      const done = MC.some(([s, jj], i) => jj === j && t >= tMg[i]), el = $('#mg' + j);
      el.style.background = mix(done ? C.ac3 : '#FFFFFF', C.ac, on); el.style.borderColor = mix(done ? C.ac : '#CBD0DA', C.ac, on); el.style.color = mix(done ? C.ac : '#9AA0AC', '#FFFFFF', on); });
    MC.forEach(([s, j], i) => { M.vis($('#mc' + i), t, tMc[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.draw(MLN[i], t, tMg[i] - 0.2, 0.5); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: cue(EP.X.tW) - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: cue(EP.X.tR) - 0.1 });
    runItems(TPI, t);
    where(t, { tin: T0('E1'), tLight: [], tType: cue(EP.X.tType) });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: cue(EP.Q.tOpts) - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: EP.F.lines.map((_, i) => tF + 0.4 + i * 0.4), tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
