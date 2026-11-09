// PUC Biology Ep 54: Dorsiventral and Isobilateral Leaves (Living diagram, leaf green)
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


const guardL = (g, cx, cy, H, W, side, f = '#CFE6C4') => mk(g, 'path', { d: '', fill: f, stroke: BR, 'stroke-width': 2.5, 'data-s': side });
const setGuard = (el, cx, cy, H, W, a, side) => { const s = side, x = cx + s * a; el.setAttribute('d', `M${cx},${cy - H} C${cx + s * W * 2},${cy - H} ${cx + s * W * 2},${cy + H} ${cx},${cy + H} C${x + s * a * 1.2},${cy + H * 0.5} ${x + s * a * 1.2},${cy - H * 0.5} ${cx},${cy - H}Z`); };
const dumb = (g, x, cy, f = '#CFE6C4') => mk(g, 'path', { d: `M${x + 5},${cy - 40} L${x + 5},${cy + 40} A23,23 0 1 1 ${x - 5},${cy + 40} L${x - 5},${cy - 40} A23,23 0 1 1 ${x + 5},${cy - 40}Z`, fill: f, stroke: BR, 'stroke-width': 2.5 });
const hairyStem = (g, x, y, s = 1) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: 'M0,120 C-6,40 6,-40 0,-120', stroke: '#4E7A34', 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 16; k++) { const yy = -104 + k * 14, sd = k % 2 ? 1 : -1; mk(Q, 'path', { d: `M${sd * 7},${yy} q${sd * 10},-4 ${sd * 18},-12`, stroke: '#6E8F5A', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' }); } return W(Q); };
const pill = (g, x, y, s, col = C.ac, bg = C.okBg, fs = 15) => { const Q = mk(g, 'g', {}), w = s.length * fs * 0.68 + 30; mk(Q, 'rect', { x: x - w / 2, y: y - 18, width: w, height: 36, rx: 8, fill: bg }); tag(Q, x, y + 6, s, col, fs); return Q; };
const rolled = (g, x, y, s = 1) => { const Q = G(g, x, y, s); mk(Q, 'path', { d: 'M-14,120 C-12,20 -6,-60 4,-130 C14,-60 18,20 16,120Z', fill: '#9FBF6A', stroke: BR, 'stroke-width': 2.5 }); mk(Q, 'path', { d: 'M2,116 C2,20 4,-60 4,-120', stroke: '#6E8E44', 'stroke-width': 3, fill: 'none' });
  mk(Q, 'path', { d: 'M-14,40 q-14,-6 -10,-24', stroke: BR, 'stroke-width': 2, fill: 'none' }); return W(Q); };
const curlD = (cx, by, L, c) => { const th = Math.max(1e-3, c * 5.2), r = L / th; let d = ''; for (let k = 0; k <= 40; k++) { const sx = -L / 2 + k * L / 40, ph = sx / r; d += (k ? 'L' : 'M') + (cx + r * Math.sin(ph)).toFixed(1) + ',' + (by - r * (1 - Math.cos(ph))).toFixed(1); } return d; };
const curlP = (cx, by, L, c, sx) => { const th = Math.max(1e-3, c * 5.2), r = L / th, ph = sx / r; return [cx + r * Math.sin(ph), by - r * (1 - Math.cos(ph)), ph]; };
const EP = { who: 'Diya',
  icons: { grassI: ['M10 21C10 12 11 6 13 3c1 4 1 11 1 18Z'], sun: ['M12 8a4 4 0 1 0 0.01 0Z', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'M5 5l1.5 1.5', 'M17.5 17.5 19 19', 'M5 19l1.5-1.5', 'M17.5 6.5 19 5'],
    skin: ['M3 6h18', 'M3 10h18'], cells: ['M3 3h8v8H3Z', 'M13 3h8v8h-8Z', 'M3 13h8v8H3Z', 'M13 13h8v8h-8Z'], pipes: ['M8 3v18', 'M16 3v18', 'M5 7h6', 'M13 12h6', 'M5 17h6'] },
  jobs: [['leaf', 'A mango leaf', 'DARK ON TOP', 'H1:mango'], ['grassI', 'A grass blade', 'SAME BOTH SIDES', 'H1:grass'], ['sun', 'Rolled-up grass', 'HOT AFTERNOON', 'H1:rolled']],
  H: { pillAt: 'H2:inside', hkAt: 'H3:purpose', splAt: 'H4:slice', splPAt: 'H5:curl',
    spl: [['skin', 'Epidermis', 'THE SKIN'], ['cells', 'Mesophyll', 'THE GREEN FILLING'], ['pipes', 'Vascular bundles', 'THE VEINS']],
    draw: s => { mk(s, 'line', { x1: 36, y1: 440, x2: 748, y2: 440, stroke: C.dim, 'stroke-width': 3 });
      const a = leafShape(s, 120, 270, 1.15, '#3F8A4A', -15), a2 = leafShape(s, 196, 290, 1.0, '#B4D69E', 20);
      const b = grass(s, 392, 300, 1.15); const sun = mk(s, 'circle', { cx: 690, cy: 120, r: 46, fill: '#FBE7A6' }); const c = rolled(s, 630, 300, 1.15);
      return [[a, 'H2+0.2'], [a2, 'H2+0.4'], [b, 'H2+0.6'], [sun, 'H2+0.8', { dy: 0, fade: 0.4 }], [c, 'H2+0.9'], [tag(s, 158, 480, 'TOP AND BOTTOM', C.ac), 'H2+1.2', { dy: 6 }], [tag(s, 392, 480, 'BOTH SIDES ALIKE', GOLD), 'H2+1.4', { dy: 6 }], [tag(s, 630, 480, 'ROLLED UP', C.mute), 'H2+1.6', { dy: 6 }]]; } },
  D: { tiles: ['Epidermis', 'Mesophyll', 'Vascular system'].map((n, i) => [n, ['Upper and lower skin, with a cuticle', 'Green filling with chloroplasts', 'Bundles in the veins and midrib'][i], ['D2:epidermis', 'D3:mesophyll', 'D4:vascular'][i],
    (s, w) => { const Q = G(s, 22, 14, 0.6); const P = leafVS(Q, 0, 10, (w - 44) / 0.6, false); const dim = e => e.setAttribute('opacity', 0.15);
      const all = [P.cut, P.ue, P.le, ...P.st.map(x => x[0]), P.pal, P.spo, P.mes, P.chl, ...P.vb.map(x => x[0])]; const keep = [[P.cut, P.ue, P.le, ...P.st.map(x => x[0])], [P.pal, P.spo, P.mes, P.chl], P.vb.map(x => x[0])][i];
      all.forEach(e => { if (!keep.includes(e)) dim(e); }); return []; }]) },
  Z: { av: { text: 'Like pencils standing in a box!', in: 'Z3:pencils+0.3', out: 'Z4-0.2' }, push: ['Z6:sheath-0.2', 990, 530, 'P1-0.4'],
    levels: [
      { chip: 'LEAF', at: 'Z1', tag: 'LEAF x1', info: ['MANGO LEAF · DICOT', 'Dorsiventral', 'Top and bottom are different.', 'Darker on top, paler below.'],
        draw: g => { const A = leafShape(g, 200, 263, 2.0, '#3F8A4A', -25), B = leafShape(g, 440, 280, 1.7, '#B4D69E', 20);
          return { labs: [[lab(g, 230, 200, 640, 170, 'Upper surface', 'start', [560, 170]), 'Z1:top'], [lab(g, 450, 330, 640, 360, 'Lower surface'), 'Z1:bottom']], items: [[A, 'Z1+0.1', { dy: 20 }], [B, 'Z1:bottom-0.3', { dy: 20 }]] }; } },
      { chip: 'SECTION', at: 'Z2', tag: 'x400', ring: [330, 300, 60], info: ['CUT FROM THE SIDE', 'The section', 'Palisade on top, spongy below.', 'More stomata on the lower side.'],
        draw: g => { const P = leafVS(g, 30, 100, 600, false); const tC = cue('Z5:chloroplasts'), tS = cue('Z2:stomata');
          const gas = P.st.map(([Q, x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 5, fill: C.dim }));
          return { labs: [[lab(g, 585, 115, 640, 110, 'Adaxial epidermis'), 'Z2:adaxial'], [lab(g, 573, 150, 640, 165, 'Chloroplast'), 'Z5:chloroplasts'], [lab(g, 549, 214, 640, 220, 'Palisade parenchyma'), 'Z3:palisade'],
            [lab(g, 545, 320, 640, 290, 'Spongy parenchyma'), 'Z4:spongy'], [lab(g, 512, 352, 640, 350, 'Air space'), 'Z4:spaces'], [lab(g, 475, 404, 640, 410, 'Stoma'), 'Z2:stomata'], [lab(g, 570, 404, 640, 470, 'Abaxial epidermis', 'start', [600, 470]), 'Z2:abaxial']],
            items: [[P.cut, 'Z2+0.1', { dy: 0, fade: 0.3 }], [P.ue, 'Z2:upper-0.2', { dy: -12 }], [P.le, 'Z2:lower-0.2', { dy: 12 }], ...P.st.map(([Q]) => [Q, 'Z2:stomata-0.2', POP]), [P.pal, 'Z3:palisade-0.2', { dy: -12 }], [P.spo, 'Z4:spongy-0.2', { dy: 12 }], [P.chl, 'Z3:palisade', { dy: 0, fade: 0.4 }], ...P.vb.map(([Q]) => [Q, 'Z2+0.4', { dy: 0, fade: 0.4 }])],
            anim: t => { P.chl.style.filter = t > tC ? `brightness(${(1 + 0.18 * (0.5 + 0.5 * Math.sin(t * 4))).toFixed(3)})` : '';
              gas.forEach((d, k) => { const u = ((t - tS) * 0.6 + k * 0.3) % 1; d.style.visibility = t > tS + 0.3 ? 'inherit' : 'hidden'; attr(d, 'cy', (P.st[k][2] + 60 - u * 110).toFixed(1)); d.style.opacity = (Math.sin(u * 3.1416)).toFixed(2); }); } }; } },
      { chip: 'VEIN', at: 'Z6', tag: 'x400', ring: [315, 270, 72], info: ['ONE VEIN', 'The vein', 'Xylem above, phloem below.', 'Wrapped in bundle sheath cells.'],
        draw: g => { const fill = mk(g, 'g', {}); field(fill, 40, 40, 600, 430, 26, (x, y) => Math.hypot(x - 300, y - 230) > 185, { f: '#EEF6E8', w: 1.4, j: 0.2 });
          const sh = mk(g, 'g', {}); ring(sh, 300, 230, 160, 22, 20, { f: '#F4EFDC', s: BR, w: 3.5, rr: 0.4 }); mk(g, 'circle', { cx: 300, cy: 230, r: 136, fill: '#FBF8F0' });
          const xy = mk(g, 'g', {}); [[250, 170, 26], [300, 160, 30], [350, 170, 26], [275, 220, 16], [325, 220, 16]].forEach(([x, y, r]) => xc(xy, x, y, r));
          const ph = mk(g, 'g', {}); mk(ph, 'path', { d: blobD(300, 300, 92, 48, 9, 0.05), fill: PHL, stroke: PH, 'stroke-width': 2.5 }); for (let k = 0; k < 6; k++) cell(ph, 248 + k * 21, 300 + (k % 2) * 10, 9, 8, { f: '#FBF3DC', s: PH, w: 1.1 });
          const sz = mk(g, 'g', {}); [[90, 480, 30], [190, 486, 21], [266, 490, 13]].forEach(([x, y, r]) => { mk(sz, 'circle', { cx: x, cy: y, r, fill: '#F4EFDC', stroke: BR, 'stroke-width': 2 }); xc(sz, x, y - r * 0.3, r * 0.35); }); const szT = pill(g, 420, 488, 'MANY SIZES', C.ac);
          return { labs: [[lab(g, 450, 230, 640, 230, 'Bundle sheath'), 'Z6:sheath'], [lab(g, 350, 170, 640, 120, 'Xylem', 'start', [560, 120]), 'Z6:bundles'], [lab(g, 360, 310, 640, 340, 'Phloem'), 'Z6:bundles+0.4']],
            items: [[fill, 'Z6+0.1', { dy: 0, fade: 0.3 }], [sh, 'Z6:sheath-0.3', { dy: 0, sc: 0.9 }], [xy, 'Z6:bundles-0.2', { dy: 0, sc: 0.9 }], [ph, 'Z6:bundles+0.2', { dy: 0, sc: 0.9 }], [sz, 'Z6:net', { dy: 12 }], [szT, 'Z6:sizes-0.2', POP]] }; } }] },
  P: { intro: ['GRASS LEAF · MONOCOT', 'Isobilateral', 'Both sides are alike.'],
    stages: [{ chip: 'BOTH SIDES', at: 'P2', info: ['STEP 1', 'Both sides', 'Stomata on both surfaces. Mesophyll not split.'] },
      { chip: 'BULLIFORM', at: 'P3', info: ['STEP 2', 'Bulliform cells', 'Large, empty, colourless upper cells.'] },
      { chip: 'FULL', at: 'P4', info: ['STEP 3', 'Full and firm', 'Plenty of water: the leaf stays flat.'] },
      { chip: 'LIMP', at: 'P5', info: ['STEP 4', 'Limp', 'Little water: bulliform cells go flaccid.'] },
      { chip: 'CURLED', at: 'P6', info: ['STEP 5', 'Curled', 'The leaf rolls inward. Less water is lost.'] }],
    draw: (s, tPs) => { const Q = G(s, 30, 14, 0.72), V = leafVS(Q, 0, 10, 760, true);
      const BUf = [0.25, 0.55].map(u => { const x = u * 760, B = mk(Q, 'g', {}); mk(B, 'rect', { x: x - 64, y: 8, width: 128, height: 36, fill: '#FBF8F0' }); const cs = [-1, 0, 1].map(k => mk(B, 'rect', { x: x + k * 40 - 19, y: 10, width: 38, height: 62, rx: 10, fill: VAC, stroke: XY, 'stroke-width': 2.5 })); return [B, cs]; });
      const L = 520, cx = 300, by = 500;
      const band = mk(s, 'path', { d: '', fill: 'none', stroke: '#7FB873', 'stroke-width': 30, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), band2 = mk(s, 'path', { d: '', fill: 'none', stroke: '#D8ECD2', 'stroke-width': 4, 'stroke-linecap': 'round' });
      const bm = [-0.3, -0.12, 0.12, 0.3].map(f => mk(s, 'circle', { cx: 0, cy: 0, r: 11, fill: VAC, stroke: XY, 'stroke-width': 2.5 })); const drops = bm.map(() => mk(s, 'circle', { cx: 0, cy: 0, r: 5, fill: WAT }));
      const PL = [['STOMATA ON BOTH SIDES', 'P2:both', C.ac, C.okBg], ['MESOPHYLL NOT SPLIT', 'P2:not', C.ac, C.okBg], ['BULLIFORM: LARGE, EMPTY', 'P3:bulliform', XY, '#E4F0F8'], ['FULL AND FIRM: FLAT', 'P4:firm', XY, '#E4F0F8'], ['LIMP: FLACCID', 'P5:limp', C.red, C.redBg], ['CURLED: LESS WATER LOST', 'P6:Less', C.ac, C.okBg]].map(([tx, c, col, bg], i) => [pill(s, 820, 60 + i * 64, tx, col, bg, 18), c]);
      return (t, st) => { const tCurl = cue('P6:curls') - 0.3, c = M.io(M.clamp((t - tCurl) / 2.4)), tLimp = cue('P5:limp') - 0.6, lim = M.io(M.clamp((t - tLimp) / 1.2));
        BUf.forEach(([B, cs]) => { M.vis(B, t, cue('P3:bulliform') - 0.3, 1e9, { ...POP, sc: 0.6 }); cs.forEach((r, k) => { const h = 62 - 26 * lim; attr(r, 'height', h.toFixed(1)); attr(r, 'fill', lim > 0.5 ? '#F3F4F6' : VAC); r.setAttribute('stroke-width', st === 1 ? (2.5 + 2 * (0.5 + 0.5 * Math.sin(t * 6))).toFixed(2) : 2.5); }); });
        const d = curlD(cx, by - 30, L, c); attr(band, 'd', d); attr(band2, 'd', curlD(cx, by - 30 - 13, L * 0.98, c));
        M.vis(band, t, tPs[0] - 0.2, 1e9, { dy: 16 }); M.vis(band2, t, tPs[0] - 0.2, 1e9, { dy: 16 });
        bm.forEach((m, i) => { const sx = [-0.3, -0.12, 0.12, 0.3][i] * L, [x, y, ph] = curlP(cx, by - 30, L, c, sx); attr(m, 'cx', (x + 22 * Math.sin(ph)).toFixed(1)); attr(m, 'cy', (y - 22 * Math.cos(ph)).toFixed(1)); attr(m, 'r', (11 - 5 * lim).toFixed(1)); attr(m, 'fill', lim > 0.5 ? '#F3F4F6' : VAC); M.vis(m, t, cue('P4:full') - 0.2, 1e9, { ...POP, sc: 0.3 });
          const u = ((t - tLimp) * 0.7 + i * 0.25) % 1, dr = drops[i]; dr.style.visibility = t > tLimp && t < tCurl + 0.5 ? 'inherit' : 'hidden'; attr(dr, 'cx', (x + 22 * Math.sin(ph)).toFixed(1)); attr(dr, 'cy', (y - 30 - u * 70).toFixed(1)); dr.style.opacity = (1 - u).toFixed(2); });
        PL.forEach(([p, cc]) => M.vis(p, t, cue(cc) - 0.15, 1e9, { dx: 16, dy: 0 })); }; } },
  V: { h: ['Dorsiventral leaf', 'Isobilateral leaf'], hAt: ['C1:dorsiventral', 'C1:isobilateral'],
    rows: [['Example', 'Mango (dicot)', 'Grass (monocot)', 0, 'C1:dorsiventral+0.4', 'C1:isobilateral+0.4'], ['Epidermis', 'With a cuticle', 'With a cuticle', 1, 'C2:epidermis', 'C2:cuticle'],
      ['Mesophyll', 'Palisade + spongy', 'One kind', 0, 'C3:palisade', 'C3:one'], ['Stomata', 'More on the lower side', 'On both sides', 0, 'C3:stomata', 'C3:both']],
    think: { q: 'A leaf section shows stomata on both surfaces, and no palisade layer. Dorsiventral, or isobilateral?', opts: ['Dorsiventral', 'Isobilateral'], right: 1, why: 'Isobilateral. Like grass: stomata on both sides, mesophyll not split.' }, thinkOpt: 'C4:Dorsiventral', thinkWhy: 'C5:Isobilateral' },
  T: { st2: 'Two kinds, or <span class="acc">one kind</span>.', stF: 'dorsiventral · isobilateral', c2: 'T1:Dorsiventral', cF: 'T1:Isobilateral' },
  W: { label: 'WORKED EXAMPLE · DORSIVENTRAL OR ISOBILATERAL?', targets: ['Dorsiventral', 'Isobilateral'],
    clues: [['Palisade cells below the upper epidermis', 0, 'W2'], ['Stomata on both surfaces', 1, 'W3'], ['Bulliform cells along the veins', 1, 'W4'], ['A net of veins, bundles of many sizes', 0, 'W5']] },
  X: { wrong: 'Bulliform cells are packed with chloroplasts', right: 'Bulliform cells are large, empty and colourless.', tW: 'X2:bulliform', tR: 'X3:bulliform', type: 'Statements and diagram labels: which surface has more stomata, palisade versus spongy, what bulliform cells do', tType: 'E1:statements',
    draw: s => { const a = mk(s, 'g', {}); cell(a, 110, 140, 50, 42, { f: '#EEF6E8', w: 2.5, j: 0.1 }); [[90, 125], [125, 128], [100, 155], [135, 158], [112, 140]].forEach(([x, y]) => chloro(a, x, y, 1.3));
      const at = mk(s, 'g', {}); mk(at, 'rect', { x: 30, y: 226, width: 160, height: 34, rx: 8, fill: C.soft }); tag(at, 110, 249, 'MESOPHYLL', C.ink, 15);
      const b = mk(s, 'g', {}); mk(b, 'rect', { x: 270, y: 82, width: 100, height: 120, rx: 14, fill: '#FFFFFF', stroke: XY, 'stroke-width': 3 });
      const bt = mk(s, 'g', {}); mk(bt, 'rect', { x: 236, y: 226, width: 168, height: 34, rx: 8, fill: C.okBg }); tag(bt, 320, 249, 'BULLIFORM · EMPTY', C.ok, 15);
      return [[a, 'X2:chloroplasts', { ...POP, sc: 0.5 }], [at, 'X2:mesophyll', POP], [b, 'X3:empty-0.2', { ...POP, sc: 0.5 }], [bt, 'X3:colourless', POP]]; } },
  Q: { pat: 'NEET PATTERN · ASSERTION AND REASON', qW: 820, tOpts: 'Q1:Read', cols: 1, optW: 960, optY: 262, optH: 68, optFs: 27, right: 0,
    q: '<div class="sl"><b>A</b>Grass leaves curl inward during water stress.</div><div class="sl"><b>R</b>Bulliform cells become flaccid when they lose water.</div>',
    opts: ['Both A and R are true, and R explains A', 'Both A and R are true, but R does not explain A', 'A is true, but R is false', 'A is false, but R is true'] },
  A: [['Answer: <b style="color:var(--ok)">A</b>', 'A1:is+0.2'], ['A is true', 'A1:Both'], ['R is true', 'A1:reason'], ['Bulliform cells: upper side', 'A2:upper'], ['Flaccid: leaf curls, less water lost', 'A3:flaccid']],
  F: { title: 'Recap · dorsiventral and isobilateral leaves', lines: ['<b>Dorsiventral</b> (dicot, e.g. mango): palisade on top, spongy below', '<b>Stomata</b>: more on the abaxial (lower) epidermis; upper may have none',
    `<b style="color:${CHL}">Mesophyll</b>: chloroplasts in palisade and spongy cells; bundle sheath round each vein`, '<b>Isobilateral</b> (grass): stomata on both sides, mesophyll not split', `<b style="color:${XY}">Bulliform cells</b>: large, empty, colourless · flaccid, so the leaf curls`] },
  Y: ['Which surface of a dorsiventral leaf has more stomata?', 'How are palisade cells different from spongy cells?', 'What do bulliform cells do in water stress?'],
  N: { label: 'NEXT · EP 55', topic: 'Sapling to thick trunk: Secondary Growth' } };
function drop0(g, x, y) { const Q = mk(g, 'g', {}); mk(Q, 'path', { d: 'M0,-14 C7,-4 11,2 11,7 A11,11 0 0 1 -11,7 C-11,2 -7,-4 0,-14 Z', fill: '#D6E9F5', stroke: WAT, 'stroke-width': 2.5 }); return Q; }


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
