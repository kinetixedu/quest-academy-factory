// PUC Electronics Ep 64 - MOSFET: enhancement and depletion ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, R and rho ink; holes hollow orange; scope CH1 #8FA3C8, CH2 amber
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', OR = C.orange || '#D9731A';
const NFILL = '#FDF1D6', PFILL = '#F8E0CC', DEP = '#CDD3DE';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const sub = (e, s, fs = 16) => { const q = mk(e, 'tspan', { 'font-size': fs, dy: 6, 'font-style': 'normal' }); q.textContent = s; return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const VGS = c(TE, 'V_{GS}'), ID = c(VI, 'I_D'), IG = c(VI, 'I_G'), VOFF = c(TE, 'V_{GS(\\text{off})}');

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions, roll-mode traces (newest at the right) */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 160) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
/* JFET symbol: channel bar, drain (top) and source (bottom) leads, gate with arrow (n channel: points in) */
const jsym = (p, cx, cy, h, pch = false) => {
  const out = [W(p, `M${cx},${cy - h} V${cy + h}`, { 'stroke-width': 6 }), W(p, `M${cx},${cy - h * 0.7} H${cx + 60} V${cy - h - 50}`), W(p, `M${cx},${cy + h * 0.7} H${cx + 60} V${cy + h + 50}`), W(p, `M${cx - 90},${cy} H${cx - 3}`)];
  const ax = pch ? cx - 50 : cx - 8, dir = pch ? -1 : 1;
  out.push(mk(p, 'path', { d: `M${ax},${cy} L${ax - 20 * dir},${cy - 10} L${ax - 20 * dir},${cy + 10} Z`, fill: INK }));
  out.push(mono(p, cx + 74, cy - h - 30, 'D', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(p, cx - 116, cy + 8, 'G', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(p, cx + 74, cy + h + 44, 'S', { fill: INK, 'font-weight': 600, 'font-size': 24 }));
  return out;
};
/* cross-section of an n channel JFET bar: n bar, depletion layers (grey), p gate regions top and bottom */
const xsec = (p, x, y, w, h, pw, ph) => {
  const px1 = x + (w - pw) / 2, px2 = px1 + pw;
  const nb = mk(p, 'rect', { x, y, width: w, height: h, fill: NFILL, stroke: INK, 'stroke-width': 3 });
  const dt = mk(p, 'path', { fill: DEP }), db = mk(p, 'path', { fill: DEP });
  const pt = mk(p, 'rect', { x: px1, y: y - ph, width: pw, height: ph, fill: PFILL, stroke: INK, 'stroke-width': 3 });
  const pb = mk(p, 'rect', { x: px1, y: y + h, width: pw, height: ph, fill: PFILL, stroke: INK, 'stroke-width': 3 });
  const holes = [];
  [y - ph / 2, y + h + ph / 2].forEach(yy => [0.12, 0.27, 0.73, 0.88].forEach(f => holes.push(mk(p, 'circle', { cx: px1 + pw * f, cy: yy, r: 6, fill: 'none', stroke: OR, 'stroke-width': 2.5 }))));
  const set = (d, wedge = 0) => { const dl = Math.min(h / 2, d), dr = Math.min(h / 2, d + wedge);
    PUC.attr(dt, 'd', `M${px1},${y} L${px2},${y} L${px2},${(y + dr).toFixed(1)} L${px1},${(y + dl).toFixed(1)} Z`);
    PUC.attr(db, 'd', `M${px1},${y + h} L${px2},${y + h} L${px2},${(y + h - dr).toFixed(1)} L${px1},${(y + h - dl).toFixed(1)} Z`); };
  set(0);
  return { nb, dt, db, pt, pb, holes, set, px1, px2 };
};
const VT = c(TE, 'V_T'), IDSS = c(VI, 'I_{DSS}');
const OXF = '#DDE6F3', MET = '#A9B2C4', CHF = '#FBE3A8';
/* MOSFET symbol: gate plate (gap = oxide), channel line (broken = enhancement), D, S, substrate arrow in (n channel) */
const msym = (p, cx, cy, h, enh) => {
  const out = [W(p, `M${cx - 22},${cy - h * 0.8} V${cy + h * 0.8}`), W(p, `M${cx - 80},${cy + h * 0.8} H${cx - 22}`)];
  if (enh) [[-1, -0.45], [-0.2, 0.2], [0.45, 1]].forEach(([a, b]) => out.push(W(p, `M${cx},${cy + a * h} V${cy + b * h}`, { 'stroke-width': 6, 'stroke-linecap': 'butt' })));
  else out.push(W(p, `M${cx},${cy - h} V${cy + h}`, { 'stroke-width': 6, 'stroke-linecap': 'butt' }));
  out.push(W(p, `M${cx},${cy - h * 0.72} H${cx + 46} V${cy - h - 40}`), W(p, `M${cx},${cy + h * 0.72} H${cx + 46} V${cy + h + 40}`), W(p, `M${cx + 4},${cy} H${cx + 46} V${cy + h * 0.72}`));
  out.push(mk(p, 'path', { d: `M${cx + 6},${cy} L${cx + 24},${cy - 9} L${cx + 24},${cy + 9} Z`, fill: INK }));
  out.push(mono(p, cx + 58, cy - h - 22, 'D', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(p, cx - 102, cy + h * 0.8 + 7, 'G', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(p, cx + 58, cy + h + 36, 'S', { fill: INK, 'font-weight': 600, 'font-size': 22 }));
  return out;
};
/* MOSFET cross-section: p substrate, n islands (S, D), oxide, metal gate, channel strip of thickness th under the oxide */
const mos = (p, x, y, w, h, iw, ih) => {
  const sub_ = mk(p, 'rect', { x, y, width: w, height: h, fill: PFILL, stroke: INK, 'stroke-width': 3 });
  const holes = [0.3, 0.42, 0.54, 0.66].flatMap(f => [mk(p, 'circle', { cx: x + w * f, cy: y + h * 0.62, r: 6, fill: 'none', stroke: OR, 'stroke-width': 2.5 }), mk(p, 'circle', { cx: x + w * (f + 0.06), cy: y + h * 0.82, r: 6, fill: 'none', stroke: OR, 'stroke-width': 2.5 })]);
  const ch = mk(p, 'rect', { x: x + iw, y, width: w - 2 * iw, height: 0, fill: CHF });
  const isl = [mk(p, 'rect', { x, y, width: iw, height: ih, fill: NFILL, stroke: INK, 'stroke-width': 3 }), mk(p, 'rect', { x: x + w - iw, y, width: iw, height: ih, fill: NFILL, stroke: INK, 'stroke-width': 3 })];
  const ox = mk(p, 'rect', { x: x + iw - 22, y: y - 14, width: w - 2 * iw + 44, height: 14, fill: OXF, stroke: INK, 'stroke-width': 2 });
  const gt = mk(p, 'rect', { x: x + iw, y: y - 36, width: w - 2 * iw, height: 22, fill: MET, stroke: INK, 'stroke-width': 3 });
  const nE = Math.round((w - 2 * iw) / 26), eD = [...Array(nE)].map((_, i) => mk(p, 'circle', { cx: x + iw + 13 + 26 * i, cy: y + 8, r: 6, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
  const set = th => { PUC.attr(ch, 'height', Math.max(0, th).toFixed(1)); eD.forEach(d => PUC.attr(d, 'cy', (y + Math.max(6, th / 2)).toFixed(1))); };
  return { sub_, holes, ch, isl, ox, gt, eD, set };
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'phone') - 0.2;
const tP = T0('P1'), tC = T0('C1'), tB = T0('B1'), tE = T0('E1'), tG = T0('G1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const idE = v => v <= 2 ? 0 : 0.5 * (v - 2) ** 2;   // EXAMPLE FIGURES: V_T 2 V, k 0.5 mA/V^2
const idD = v => v <= -3 ? 0 : 6 * (1 + v / 3) ** 2; // EXAMPLE FIGURES: I_DSS 6 mA, V_GS(off) -3 V

/* ================= A: hook ================= */
const h1S = $('#h1S');
const chip = mk(h1S, 'rect', { x: 40, y: 70, width: 190, height: 190, rx: 12, fill: INK });
const pins = [...Array(6)].map((_, i) => W(h1S, `M${62 + 30 * i},70 V58 M${62 + 30 * i},260 V272`, { 'stroke-width': 3, stroke: MU }));
const cells = []; for (let r = 0; r < 8; r++) for (let q = 0; q < 8; q++) cells.push(mk(h1S, 'rect', { x: 56 + q * 20, y: 86 + r * 20, width: 14, height: 14, rx: 2, fill: '#2A3758' }));
const zoomL = W(h1S, 'M230,70 L300,90 M230,260 L300,250', { stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const sw = [...Array(3)].map((_, i) => { const g = mk(h1S, 'g'); const x = 330 + 140 * i; W(g, `M${x},160 H${x + 34}`, { 'stroke-width': 4 }); const lv = W(g, `M${x + 34},160 L${x + 80},136`, { 'stroke-width': 4 }); W(g, `M${x + 80},160 H${x + 110}`, { 'stroke-width': 4 }); mk(g, 'circle', { cx: x + 34, cy: 160, r: 5, fill: INK }); mk(g, 'circle', { cx: x + 80, cy: 160, r: 5, fill: '#fff', stroke: INK, 'stroke-width': 2.5 }); return [g, lv, x]; });
const h1L = mono(h1S, 330, 236, 'tiny on-off switches', { fill: INK, 'font-weight': 600 });
const h2S = $('#h2S'), hM = mos(h2S, 120, 150, 380, 100, 90, 44);
const hGap = [mono(h2S, 524, 120, 'gate', { fill: INK, 'font-weight': 600 }), mono(h2S, 524, 146, 'thin glass', { fill: '#5F7399', 'font-weight': 600 }), mono(h2S, 524, 210, 'silicon', { fill: OR, 'font-weight': 600 })];
const hX = W(h2S, 'M690,150 L730,190 M730,150 L690,190', { stroke: C.red, 'stroke-width': 4 });

/* ================= P: magnet idea ================= */
const pS = $('#pS');
const glass = mk(pS, 'rect', { x: 60, y: 250, width: 660, height: 22, rx: 4, fill: OXF, stroke: INK, 'stroke-width': 2.5 });
const legs = W(pS, 'M90,272 V380 M690,272 V380', { 'stroke-width': 5, stroke: MU });
const mag = mk(pS, 'g'), magB = mk(mag, 'g');
mk(magB, 'rect', { x: -70, y: 0, width: 70, height: 46, fill: C.red, stroke: INK, 'stroke-width': 3 }); mk(magB, 'rect', { x: 0, y: 0, width: 70, height: 46, fill: '#8FA3C8', stroke: INK, 'stroke-width': 3 });
tx(magB, -35, 32, 'N', { 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 }); tx(magB, 35, 32, 'S', { 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 });
const rnd = i => { const s = Math.sin(i * 12.9898) * 43758.5453; return s - Math.floor(s); };
const dust = [...Array(26)].map((_, i) => ({ e: mk(pS, 'rect', { width: 12, height: 4, rx: 2, fill: INK }), x0: 90 + 600 * rnd(i + 1), y0: 160 + 80 * rnd(i + 40), r0: 180 * rnd(i + 80), x1: 250 + 22 * Math.floor(i / 2), y1: 234 - 12 * (i % 2) }));
const pLb = [mono(pS, 110, 300, 'glass', { fill: '#5F7399', 'font-weight': 600 }), mono(pS, 390, 380, 'magnet', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600 }), mono(pS, 90, 140, 'iron dust', { fill: INK, 'font-weight': 600 })];
const pNo = mono(pS, 390, 520, 'never touches', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });
const pX = $('#pX'), pM = mos(pX, 80, 300, 470, 160, 0.0001, 1);
pM.isl.forEach(e => e.remove());
const pXl = [mono(pX, 576, 278, 'metal gate', { fill: INK, 'font-weight': 600 }), mono(pX, 576, 304, 'oxide (glass)', { fill: '#5F7399', 'font-weight': 600 }), mono(pX, 576, 400, 'p silicon', { fill: OR, 'font-weight': 600 })];
const pPlus = tx(pX, 315, 258, '+  +  +  +  +  +', { 'text-anchor': 'middle', fill: C.red, 'font-size': 28 });
const pIG = mono(pX, 80, 200, 'gate current ≈ 0', { fill: VI, 'font-weight': 600, 'font-size': 22 });
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= C: construction ================= */
const cS = $('#cS'), cM = mos(cS, 240, 260, 560, 200, 120, 64);
const cLead = [W(cS, 'M300,260 V150'), W(cS, 'M740,260 V150'), W(cS, 'M520,224 V120')];
const cTerm = [[300, 142], [740, 142], [520, 112]].map(([x, y]) => mk(cS, 'circle', { cx: x, cy: y, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }));
const cLab = [tx(cS, 270, 150, 'S', { 'text-anchor': 'end', 'font-size': 28 }), tx(cS, 770, 150, 'D', { 'font-size': 28 }), tx(cS, 548, 120, 'G', { 'font-size': 28 })];
const cSub = [mono(cS, 300, 300, 'n', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 24 }), mono(cS, 740, 300, 'n', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 24 }),
  mono(cS, 520, 500, 'p type substrate', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600 }), mono(cS, 120, 300, 'source', { fill: INK, 'font-weight': 600 }), mono(cS, 920, 300, 'drain', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }),
  mono(cS, 820, 252, 'oxide', { fill: '#5F7399', 'font-weight': 600 }), mono(cS, 560, 214, 'metal', { fill: INK, 'font-weight': 600 })];
cSub[6].setAttribute('x', 680); cSub[6].setAttribute('y', 214);
const cNoL = W(cS, 'M372,300 H668', { stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '8 8' }), cNoT = mono(cS, 520, 330, 'no channel', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600 });

/* ================= B: breadboard ================= */
const ck = $('#ckS'), bM = mos(ck, 300, 300, 380, 140, 90, 50); bM.holes.filter((h, i) => i % 2).forEach(h => h.remove()); bM.holes = bM.holes.filter((h, i) => !(i % 2));
const bW = [W(ck, 'M345,300 V240 H200 V520 H446'), W(ck, 'M476,520 H800 V388'), W(ck, 'M800,332 V200 H635 V300'), W(ck, 'M490,264 V170 H120 V330'), W(ck, 'M120,358 V520 H200')];
const bBat = [W(ck, 'M452,500 V540', { 'stroke-width': 9 }), W(ck, 'M470,490 V550', { 'stroke-width': 5 }), W(ck, 'M96,334 H144', { 'stroke-width': 5 }), W(ck, 'M108,354 H132', { 'stroke-width': 9 })];
const bNode = mk(ck, 'circle', { cx: 200, cy: 520, r: 7, fill: INK });
const lampC = mk(ck, 'circle', { cx: 800, cy: 360, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 4 }), lampX = W(ck, 'M780,340 L820,380 M820,340 L780,380', { 'stroke-width': 3 });
const bLb = [tx(ck, 461, 584, 'V DD', { 'text-anchor': 'middle', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 486, 488, '+', { 'font-size': 26 }), tx(ck, 86, 352, 'V GG', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 150, 330, '+', { 'font-size': 26 }),
  tx(ck, 368, 232, 'S', {}), tx(ck, 612, 232, 'D', {}), tx(ck, 504, 196, 'G', {}), mono(ck, 840, 366, 'lamp', { fill: INK, 'font-weight': 600 }), mono(ck, 490, 428, 'p substrate', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600, 'font-size': 18 }),
  mono(ck, 345, 334, 'n', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 }), mono(ck, 635, 334, 'n', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 })];
const aID = PUC.arrow(ck, VI, 5, 14), lID = sub(tx(ck, 728, 180, 'I', { fill: VI, 'font-style': 'italic', 'text-anchor': 'middle' }), 'D');
const bInd = mono(ck, 490, 470, '', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const eC = flow(ck, [[446, 520], [200, 520], [200, 240], [345, 240], [345, 308], [635, 308], [635, 200], [800, 200], [800, 520], [476, 520]], 30, { skip: (x, y) => (y > 515 && x > 436 && x < 486) || Math.hypot(x - 800, y - 360) < 32 });
const tb2 = wt('B2', 'zero'), tb3 = wt('B3', 'one'), tb4 = wt('B4', 'two'), tb6 = wt('B6', 'Current'), tb7 = wt('B7', 'Raise'), tb7m = wt('B7', 'More');
const vgB = t => { const s = (a, tt) => a * M.io((t - tt) / 0.5); return s(1, tb3) + s(1, tb4) + s(0.6, tb6 - 0.3) + s(1.4, tb7 + 0.3) + s(1, tb7m); };
const offC = t => { let s = 0; const dt = 0.05; for (let x = tb2; x < t; x += dt) s += 14 * idE(vgB(x)) * Math.min(dt, t - x); return s; };
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 V GS · 5 V/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 I D · 2 mA/div', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>GS</sub></span><span class="v" id="rV" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>D</sub></span><span class="v" id="rI" style="color:${VI}">0.0</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>G</sub></span><span class="v" style="color:${VI}">≈ 0</span><span class="u">A</span>
  <span class="k n">LAMP</span><span class="v" id="rL" style="font-size:30px">OFF</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 470, y: 336, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The gate builds its own channel!' });

/* ================= E: depletion MOSFET ================= */
const eS = $('#eS'), eMx = mos(eS, 240, 290, 560, 190, 120, 60);
const eLead = [W(eS, 'M300,290 V200 H150'), W(eS, 'M740,290 V200 H890'), W(eS, 'M520,254 V150')];
const eLb = [tx(eS, 140, 192, 'S', { 'text-anchor': 'end' }), tx(eS, 900, 192, 'D', {}), tx(eS, 540, 160, 'G', {}), mono(eS, 520, 520, 'p substrate', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600 }), mono(eS, 520, 400, 'built-in n channel', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 })];
const eFl = flow(eS, [[150, 200], [300, 200], [300, 300], [740, 300], [740, 200], [890, 200]], 16, { skip: () => false });
const eSign = tx(eS, 520, 244, '', { 'text-anchor': 'middle', fill: C.red, 'font-size': 26 });
const eM = $('#eM');
const eBar = mk(eM, 'rect', { x: 64, y: 110, width: 120, height: 380, rx: 14, fill: C.soft }), eFill = mk(eM, 'rect', { x: 64, y: 490, width: 120, height: 0, rx: 14, fill: VI });
const eTick = [0, 5, 10, 15].map(i => mono(eM, 196, 496 - 380 * i / 15, String(i), { fill: MU, 'font-size': 18 }));
const eIv = tx(eM, 250, 250, '', { fill: VI, 'font-family': 'IBM Plex Mono', 'font-size': 52 }), eIu = mono(eM, 250, 286, 'mA · I D', { fill: MU, 'font-size': 20 });
const eMode = tx(eM, 250, 380, '', { fill: INK, 'font-size': 26 }), eMode2 = mono(eM, 250, 414, '', { fill: MU, 'font-size': 18 });
const te4 = wt('E4', 'negative'), te6 = wt('E6', 'positive');
const vgE = t => -1.5 * M.io((t - te4) / 0.6) + 3 * M.io((t - te6) / 0.6);
const offE = t => { let s = 0; const dt = 0.05; for (let x = tE; x < t; x += dt) s += 9 * idD(vgE(x)) * Math.min(dt, t - x); return s; };

/* ================= G: transfer curves + symbols ================= */
const gSL = $('#gSL'), gpE = PUC.graph(gSL, { x: 100, y: 100, w: 360, h: 320, xmax: 6, ymax: 8, xt: [2, 4, 6], yt: [2, 4, 6, 8], xl: 'V GS (V)', yl: 'I D (mA)' });
gpE.xlab.setAttribute('fill', TE); gpE.xlab.setAttribute('y', 476); gpE.ylab.setAttribute('fill', VI);
const gcE = gpE.curve(VI, 5), gVT = gpE.mk('line', { x1: gpE.X(2), y1: gpE.Y(0), x2: gpE.X(2), y2: gpE.Y(7.6), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), gVTl = sub(tx(gSL, gpE.X(2) + 8, gpE.Y(7.2), 'V', { fill: TE, 'font-style': 'italic', 'font-size': 22 }), 'T', 15);
const gZero = mono(gSL, gpE.X(1), gpE.Y(0) - 14, 'zero', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const symE = msym(gSL, 620, 250, 64, true), symEl = mono(gSL, 620, 400, 'broken line', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const gSR = $('#gSR'), DXr = v => 100 + 72 * (v + 3), DYr = i => 420 - 20 * i;
const gAxR = [W(gSR, `M${DXr(-3)},420 H${DXr(2)}`, { 'stroke-width': 2.5 }), W(gSR, `M${DXr(0)},420 V100`, { 'stroke-width': 2.5 })];
const gTkR = [-3, -2, -1, 1, 2].map(v => mono(gSR, DXr(v), 450, String(v).replace('-', '−'), { 'text-anchor': 'middle', 'font-size': 18 }));
const gTkRl = [mono(gSR, DXr(0) + 10, 106, 'I D (mA)', { fill: VI, 'font-size': 18 }), mono(gSR, DXr(2), 476, 'V GS (V)', { 'text-anchor': 'end', fill: TE, 'font-size': 18 })];
const gcD = mk(gSR, 'path', { fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round' }); { let d = ''; for (let i = 0; i <= 60; i++) { const v = -3 + 4.6 * i / 60; d += (i ? 'L' : 'M') + DXr(v).toFixed(1) + ',' + DYr(idD(v)).toFixed(1); } gcD.setAttribute('d', d); }
const gDss = mk(gSR, 'circle', { cx: DXr(0), cy: DYr(6), r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 }), gDssL = sub(tx(gSR, DXr(0) + 16, DYr(6) + 28, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 22 }), 'DSS', 15);
const gOffP = mk(gSR, 'circle', { cx: DXr(-3), cy: 420, r: 14, fill: 'none', stroke: C.red, 'stroke-width': 3 }), gOffL = sub(tx(gSR, DXr(-3), 378, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 20 }), 'GS(off)', 14);
const gMd = [mono(gSR, DXr(-1.5), 500, 'depletion mode', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 17 }), mono(gSR, DXr(1), 500, 'enhancement mode', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 17 })];
const symD = msym(gSR, 640, 250, 64, false), symDl = mono(gSR, 640, 400, 'solid line', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });

/* ================= D: maths ================= */
const dS = $('#dS'), DX = v => 110 + 68 * (v + 3), DY = i => 480 - 22 * i;
const dAx = [W(dS, `M${DX(-3)},480 H${DX(6.3)}`, { 'stroke-width': 2.5 }), W(dS, `M${DX(0)},480 V90`, { 'stroke-width': 2.5 })];
const dTk = [-3, -2, -1, 1, 2, 3, 4, 5, 6].map(v => mono(dS, DX(v), 508, String(v).replace('-', '−'), { 'text-anchor': 'middle', 'font-size': 17 }));
const dTkL = [mono(dS, DX(0) + 10, 98, 'I D (mA)', { fill: VI, 'font-size': 18 }), mono(dS, DX(6.3), 470, 'V GS (V)', { 'text-anchor': 'end', fill: TE, 'font-size': 18 })];
const dcE = mk(dS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round' }), dcD = mk(dS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' });
{ let a = '', b = ''; for (let i = 0; i <= 60; i++) { const v = 6 * i / 60, u = -3 + 4.6 * i / 60; a += (i ? 'L' : 'M') + DX(v).toFixed(1) + ',' + DY(idE(v)).toFixed(1); b += (i ? 'L' : 'M') + DX(u).toFixed(1) + ',' + DY(idD(u)).toFixed(1); } dcE.setAttribute('d', a); dcD.setAttribute('d', b); }
const dLe = mono(dS, DX(6) - 6, DY(8) - 14, 'enhancement', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 18 }), dLd = mono(dS, DX(-1.2), DY(5.5), 'depletion', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 18 });
const dBr = W(dS, `M${DX(2)},522 V532 H${DX(6)} V522`, { stroke: TE, 'stroke-width': 3 }), dBrL = mono(dS, DX(4), 558, 'V GS − V T', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 18 });
const dRows = rows($('#dSteps'), [
  [K(`${VGS} < ${VT},\\quad ${ID} = 0`), 'no channel', 84],
  [K(`${ID} = k\\,(${VGS} - ${VT})^2`), 'above V<sub>T</sub>', 170],
  [K('k\\ \\text{in mA/V}^2'), 'device constant', 258],
  [K(`${ID} = ${IDSS}\\left(1 - \\dfrac{${VGS}}{${VOFF}}\\right)^2`), 'depletion type', 364],
  [K(`${VGS} > 0 \\Rightarrow ${ID} > ${IDSS}`), 'enhancement mode', 486]]);
const tDR = [wt('D2', 'zero'), wt('D3', 'equals'), wt('D4', 'unit'), wt('D6', 'equals'), wt('D7', 'positive')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VT} = 2\\,\\text{V}`), K('k = 0.5\\,\\text{mA/V}^2'), K(`${VGS} = 5\\,\\text{V}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS'), gpW = PUC.graph(wS, { x: 110, y: 190, w: 560, h: 300, xmax: 6, ymax: 8, xt: [1, 2, 3, 4, 5, 6], yt: [2, 4, 6, 8], xl: 'V GS (V)', yl: 'I D (mA)' });
gpW.xlab.setAttribute('fill', TE); gpW.xlab.setAttribute('y', 546); gpW.ylab.setAttribute('fill', VI);
const wc = gpW.curve(VI, 5), wDot = gpW.dot(AM, 11);
const wG1 = gpW.mk('line', { x1: gpW.X(5), y1: gpW.Y(0), x2: gpW.X(5), y2: gpW.Y(4.5), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), wG2 = gpW.mk('line', { x1: gpW.X(0), y1: gpW.Y(4.5), x2: gpW.X(5), y2: gpW.Y(4.5), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wDL = mono(wS, gpW.X(5) - 14, gpW.Y(4.5) - 16, '4.5 mA', { 'text-anchor': 'end', fill: VI, 'font-weight': 600, 'font-size': 22 });
const wRows = rows($('#wSteps'), [
  [K('5\\,\\text{V} > 2\\,\\text{V}'), 'above V<sub>T</sub>: channel exists', 84],
  [K(`${VGS} - ${VT} = 3\\,\\text{V}`), '', 180],
  [K('3^2 = 9\\,\\text{V}^2'), '', 276],
  [K(`${ID} = 0.5 \\times 9 = 4.5\\,\\text{mA}`), '', 388]]);
const tWR = [wt('W4', 'Five'), wt('W5', 'three'), wt('W6', 'Three'), wt('W7', 'zero')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Every MOSFET conducts at zero gate volts', right: 'Enhancement type is OFF at zero gate volts', y0: 96, y1: 184 });
const tcS = $('#tcS'), xsE = msym(tcS, 100, 100, 44, true), xsD = msym(tcS, 222, 100, 44, false);
xsD.forEach(e => e.setAttribute('transform', 'translate(0,0)'));
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Name the types of FET, compare E and D MOSFETs, draw the symbols, short answers' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A depletion MOSFET has I<sub>DSS</sub> = 8&nbsp;mA and V<sub>GS(off)</sub> = −4&nbsp;V. Find I<sub>D</sub> at V<sub>GS</sub> = +2&nbsp;V.', qW: 780,
  opts: ['2 mA', '8 mA', '12 mA', '18 mA'], right: 3, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${ID} = 8\\left(1 - \\dfrac{2}{-4}\\right)^2`)], [K('= 8\\,(1.5)^2')], [K('= 8 \\times 2.25')], [K(`= 18\\,\\text{mA} > ${IDSS}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Use'), wt('A3', 'One'), wt('A4', 'One'), wt('A5', 'Eight')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'MOSFET: enhancement and depletion · formula card', txt: [1, 0, 0, 1, 1],
  lines: ['Metal gate on thin oxide (SiO<sub>2</sub>) · gate current ≈ 0', K(`\\text{E-type: } ${ID} = 0 \;(${VGS} < ${VT}),\\quad ${ID} = k\\,(${VGS} - ${VT})^2`), K(`\\text{D-type: } ${ID} = ${IDSS}\\,(1 - ${VGS}/${VOFF})^2`),
    'Enhancement: normally OFF · broken channel line in the symbol', 'Depletion: normally ON · works in both modes · solid line'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 65', topic: 'DC load line and operating point', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B5', 'thin') - 0.3, 1.08, 900, 560], [T1('B6'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tB + 0.2, tT - 0.4], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    const t1 = wt('H1', 'chip') - 0.4;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); fadeAt([chip, ...pins], t, t1 + 0.2, 0.03);
    cells.forEach((e, i) => { M.vis(e, t, t1 + 0.4 + i * 0.01, 1e9, { dy: 0, fade: 0.1 }); const on = Math.sin(i * 7.3 + Math.floor((t - t1) * 3) * 1.7) > 0.3; PUC.attr(e, 'fill', on ? AM : '#2A3758'); });
    M.draw(zoomL, t, wt('H1', 'billions'), 0.4);
    sw.forEach(([g, lv, x], i) => { M.vis(g, t, wt('H1', 'switches') - 0.1 + i * 0.12, 1e9, { dy: 0, fade: 0.15 }); const on = Math.sin((t - t1) * 2.2 + i * 2) > 0; PUC.attr(lv, 'd', on ? `M${x + 34},160 L${x + 80},160` : `M${x + 34},160 L${x + 80},136`); });
    M.vis(h1L, t, wt('H1', 'switches') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h1T'), t, wt('H1', 'billions'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const t2 = wt('H2', 'control') - 0.6;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o });
    fadeAt([hM.sub_, ...hM.holes, ...hM.isl, hM.ox], t, t2 + 0.2, 0.02);
    const tg = wt('H3', 'gate'); M.vis(hM.gt, t, tg - 0.1, 1e9, { dy: -20 }); fadeAt(hGap, t, tg, 0.15);
    M.vis(hX, t, wt('H3', 'touch'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis($('#h2T'), t, wt('H3', 'touch'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    hM.set(0); hM.eD.forEach(e => M.hide(e, true));
    M.vis($('#aPill'), t, wt('H4', 'MOSFET') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: magnet idea */
  const pOn = t >= tP - 0.05 && t < tC + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tC - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P5', 'MOSFET') - 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(glass, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(legs, t, tP + 0.4, 0.4); M.vis(pLb[0], t, wt('P1', 'glass'), 1e9, { dy: 0, fade: 0.2 });
    const tin = wt('P1', 'magnet'), tal = wt('P2', 'lines'), taw = wt('P4', 'away');
    let mx = M.lerp(-120, 390, M.io((t - tin) / 0.8)); if (t >= taw) mx = M.lerp(390, 900, M.io((t - taw) / 0.8));
    magB.style.transform = `translate(${mx.toFixed(1)}px, 300px)`; M.vis(mag, t, tin - 0.1, 1e9, { dy: 0, fade: 0.1 }); M.vis(pLb[1], t, tin + 0.5, taw, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 });
    const al = M.io((t - tal) / 0.8) * (1 - M.io((t - taw - 0.2) / 0.8));
    dust.forEach((d, i) => { M.vis(d.e, t, wt('P2', 'Iron') + i * 0.02, 1e9, { dy: 0, fade: 0.1 }); const x = M.lerp(d.x0, d.x1, al), y = M.lerp(d.y0, d.y1, al), r = M.lerp(d.r0, 0, al);
      PUC.attr(d.e, 'x', (x - 6).toFixed(1)); PUC.attr(d.e, 'y', (y - 2).toFixed(1)); PUC.attr(d.e, 'transform', `rotate(${r.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})`); });
    M.vis(pLb[2], t, wt('P2', 'Iron'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pNo, t, wt('P3', 'never'), 1e9, { dy: 0, fade: 0.2 });
    // MOSFET gate stack
    const t6 = wt('P6', 'gate');
    M.vis(pM.sub_, t, wt('P5', 'MOSFET') - 0.2, 1e9, { dy: 0, fade: 0.2 }); fadeAt(pM.holes, t, wt('P5', 'MOSFET'), 0.03);
    M.vis(pM.gt, t, t6, 1e9, { dy: -20 }); M.vis(pXl[0], t, wt('P6', 'metal'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pM.ox, t, wt('P6', 'thin'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pXl[1], t, wt('P7', 'glass'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pXl[2], t, wt('P6', 'thin') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const t8 = wt('P8', 'pulls'), u = M.io((t - t8) / 0.8);
    M.vis(pPlus, t, t8 - 0.3, 1e9, { dy: 0, fade: 0.2 }); pM.set(14 * u); pM.eD.forEach((e, i) => { M.hide(e, u <= 0); PUC.attr(e, 'cy', (300 + 7 + 80 * (1 - u) * (0.3 + 0.7 * rnd(i + 5))).toFixed(1)); });
    M.vis(pIG, t, wt('P7', 'no'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip'), t, wt('P8', 'voltage') - 0.2, 1e9, { dy: 24 });
  }

  /* C: construction */
  const cOn = t >= tC - 0.05 && t < tB + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tB - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, wt('C5', 'Metal') - 0.4, out, { dx: 60, dy: 0, ...o });
    const c2 = wt('C2', 'block'); M.vis(cM.sub_, t, c2 - 0.1, 1e9, { dy: 0, fade: 0.3 }); fadeAt(cM.holes, t, c2 + 0.2, 0.03); M.vis(cSub[2], t, wt('C2', 'substrate'), 1e9, { dy: 0, fade: 0.2 });
    const c3 = wt('C3', 'islands'); cM.isl.forEach((e, i) => M.vis(e, t, c3 - 0.2 + i * 0.15, 1e9, { dy: -16 })); fadeAt(cSub.slice(0, 2), t, c3, 0.15);
    M.draw(cLead[0], t, wt('C3', 'source') - 0.1, 0.3); M.vis(cTerm[0], t, wt('C3', 'source'), 1e9, { dy: 0, fade: 0.2 }); M.vis(cLab[0], t, wt('C3', 'source'), 1e9, { dy: 0, fade: 0.2 }); M.vis(cSub[3], t, wt('C3', 'source') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.draw(cLead[1], t, wt('C3', 'drain') - 0.1, 0.3); M.vis(cTerm[1], t, wt('C3', 'drain'), 1e9, { dy: 0, fade: 0.2 }); M.vis(cLab[1], t, wt('C3', 'drain'), 1e9, { dy: 0, fade: 0.2 }); M.vis(cSub[4], t, wt('C3', 'drain') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    const c4 = wt('C4', 'thin'); M.vis(cM.ox, t, c4 - 0.1, 1e9, { dy: -10 }); M.vis(cSub[5], t, c4 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const c5 = wt('C5', 'metal'); M.vis(cM.gt, t, c5 - 0.1, 1e9, { dy: -16 }); M.draw(cLead[2], t, c5 + 0.2, 0.3); M.vis(cTerm[2], t, c5 + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLab[2], t, c5 + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(cSub[6], t, c5 + 0.2, 1e9, { dy: 0, fade: 0.2 });
    cM.set(0); cM.eD.forEach(e => M.hide(e, true));
    [wt('C5', 'Metal'), wt('C5', 'oxide'), wt('C5', 'semiconductor')].forEach((tt, i) => M.vis($('#m' + i), t, tt - 0.15, 1e9, { dy: 20 }));
    const c7 = wt('C7', 'no'); M.draw(cNoL, t, c7 - 0.2, 0.5); M.vis(cNoT, t, c7, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#cNo'), t, c7 + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tE + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tE - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    fadeAt([bM.sub_, ...bM.holes, ...bM.isl, bM.ox, bM.gt, ...bLb.slice(8)], t, tB + 0.3, 0.02);
    drawSeq(bW, t, wt('B1', 'lamp') - 0.2, 0.4, 0.12); fadeAt([...bBat, bNode, lampC, lampX, ...bLb.slice(0, 8)], t, wt('B1', 'lamp') + 0.3, 0.04);
    M.vis($('#tg'), t, tb2 - 0.3, 1e9, { dy: 10 });
    const v = vgB(t), id = idE(v), on = t >= tb2;
    M.setT($('#tgV'), v.toFixed(1) + ' V');
    const g = M.clamp((v - 1.2) / 0.8), th = v > 2 ? 4 + 4 * (v - 2) : 0;
    bM.set(th); bM.eD.forEach((e, i) => { M.hide(e, g <= 0); e.style.opacity = g.toFixed(2); PUC.attr(e, 'cy', (300 + Math.max(6, th / 2) + 60 * (1 - g) * (0.3 + 0.7 * rnd(i + 3))).toFixed(1)); });
    M.setT(bInd, t >= wt('B5', 'induced') ? 'induced n channel' : ''); PUC.attr(bInd, 'y', 468);
    eC.set(offC(t), on && id > 0.01); M.vis($('#ckE'), t, tb6, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(lampC, 'fill', M.mix('#FFFFFF', AM, M.clamp(id / 4.5)));
    aID.set(760, 186, id > 0.01 ? 760 - 20 - 8 * id : 760, 186); M.hide(lID, !(id > 0.01));
    M.vis($('#rgT'), t, tb2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), id > 0.01 ? 'ON · CHANNEL BUILT' : 'OFF · NO CHANNEL');
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rV'), v.toFixed(1)); M.setT($('#rI'), id.toFixed(1)); M.setT($('#rL'), id < 0.01 ? 'OFF' : id < 1 ? 'DIM' : id < 3 ? 'ON' : 'BRIGHT');
    tr1(u => 9.2 * vgB(u), t, tb2, 4, 60, on); tr2(u => 23 * idE(vgB(u)), t, tb2, 4, 176, on); fadeAt(scL, t, tb2, 0.1);
    avB(t, wt('B8', 'builds'), T0('B9') + 1.2);
  }

  /* E: depletion MOSFET */
  const eOn = t >= tE - 0.05 && t < tG + 0.05; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = tG - 0.32;
    M.vis($('#eL'), t, tE + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#eR'), t, tE + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([eMx.sub_, ...eMx.holes, ...eMx.isl, eMx.ox, eMx.gt], t, tE + 0.3, 0.02); drawSeq(eLead, t, tE + 0.5, 0.3, 0.1); fadeAt(eLb.slice(0, 4), t, tE + 0.7, 0.08);
    const v = vgE(t), id = idD(v), th = 18 + 7 * v;
    eMx.set(t >= wt('E2', 'built') - 0.3 ? th * M.io((t - wt('E2', 'built') + 0.3) / 0.5) : 0); eMx.eD.forEach(e => M.hide(e, t < wt('E2', 'built')));
    M.vis(eLb[4], t, wt('E2', 'channel'), 1e9, { dy: 0, fade: 0.2 }); PUC.attr(eLb[4], 'y', 290 + th + 32);
    const fon = t >= wt('E3', 'current');
    eFl.set(offE(t), fon); M.vis($('#eg'), t, wt('E3', 'zero') - 0.2, 1e9, { dy: 10 }); M.setT($('#egV'), (v > 0.04 ? '+' : '') + (Math.abs(v) < 0.04 ? '0' : v.toFixed(1)) + ' V');
    M.setT(eSign, v < -0.3 ? '−  −  −  −  −  −' : v > 0.3 ? '+  +  +  +  +  +' : ''); PUC.attr(eSign, 'fill', v < 0 ? C.ink : C.red);
    fadeAt([eBar, ...eTick, eIu], t, tE + 0.4, 0.05);
    const ii = fon ? id : 0; PUC.attr(eFill, 'height', (380 * ii / 15).toFixed(1)); PUC.attr(eFill, 'y', (490 - 380 * ii / 15).toFixed(1)); M.setT(eIv, ii.toFixed(1)); M.vis(eIv, t, wt('E3', 'current'), 1e9, { dy: 0, fade: 0.2 });
    const md = t >= wt('E7', 'enhancement') - 0.3 ? 'ENHANCEMENT MODE' : t >= wt('E5', 'depletion') - 0.3 ? 'DEPLETION MODE' : t >= wt('E3', 'current') ? 'ZERO GATE VOLTS' : '';
    M.setT(eMode, md === 'ENHANCEMENT MODE' ? 'Enhancement mode' : md === 'DEPLETION MODE' ? 'Depletion mode' : md ? 'Gate at 0 V' : '');
    M.setT(eMode2, md === 'ENHANCEMENT MODE' ? 'gate +, more electrons' : md === 'DEPLETION MODE' ? 'gate −, fewer electrons' : md ? 'current already flows' : '');
    M.setT($('#eT'), md === 'ENHANCEMENT MODE' || md === 'DEPLETION MODE' ? md : 'BUILT-IN CHANNEL');
  }

  /* G: transfer curves + symbols */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    const t2 = wt('G2', 'enhancement'); gcE(v => [v, idE(v)], 0, 6 * M.clamp((t - t2) / 2.4), 80);
    M.vis(gZero, t, wt('G2', 'zero'), 1e9, { dy: 0, fade: 0.2 }); M.draw(gVT, t, wt('G2', 'V') - 0.2, 0.4); M.vis(gVTl, t, wt('G2', 'V'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#gTL'), t, wt('G2', 'rises'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    drawSeq(gAxR, t, tG + 0.5, 0.4, 0.1); fadeAt([...gTkR, ...gTkRl], t, tG + 0.7, 0.04);
    M.draw(gcD, t, wt('G3', 'depletion'), 2.2); M.vis(gDss, t, wt('G3', 'I'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); M.vis(gDssL, t, wt('G3', 'I'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#gTR'), t, wt('G3', 'zero'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(gOffP, t, wt('G4', 'zero'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(gOffL, t, wt('G4', 'V'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gMd[0], t, wt('G4', 'falls'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gMd[1], t, wt('G4', 'rises'), 1e9, { dy: 0, fade: 0.2 });
    const t5 = wt('G5', 'symbol'), t6 = wt('G6', 'solid');
    drawSeq(symE.slice(0, 7), t, t5, 0.3, 0.06); fadeAt(symE.slice(7), t, t5 + 0.5, 0.05); M.vis(symEl, t, wt('G5', 'broken'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq(symD.slice(0, 5), t, t6 - 0.3, 0.3, 0.06); fadeAt(symD.slice(5), t, t6, 0.05); M.vis(symDl, t, t6, 1e9, { dy: 0, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Enhancement') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: maths */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dAx, t, tD + 0.3, 0.4, 0.1); fadeAt([...dTk, ...dTkL], t, tD + 0.5, 0.03);
    M.draw(dcE, t, tDR[0] - 0.3, 1.6); M.vis(dLe, t, tDR[1], 1e9, { dy: 0, fade: 0.2 }); M.draw(dBr, t, wt('D3', 'minus') - 0.1, 0.5); M.vis(dBrL, t, wt('D3', 'minus') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(dcD, t, wt('D5', 'depletion'), 1.6); M.vis(dLd, t, wt('D5', 'Shockley'), 1e9, { dy: 0, fade: 0.2 });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W1', 'two'), wt('W2', 'zero'), wt('W3', 'five')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    wc(v => [v, idE(v)], 0, 6 * M.clamp((t - tW - 0.6) / 1.6), 80);
    M.draw(wG1, t, wt('W3', 'five'), 0.4); M.draw(wG2, t, tWR[3] + 0.6, 0.5); wDot(5, 4.5, t >= tWR[3] + 0.4); M.vis(wDL, t, tWR[3] + 0.8, 1e9, { dy: 0, fade: 0.2 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Only') - 0.05, tRight: wt('X3', 'Only') + 0.2 });
    fadeAt([...xsE, ...xsD], t, tX + 0.5, 0.02);
    M.vis($('#tcP'), t, wt('X3', 'enhancement'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#tcQ'), t, wt('X3', 'depletion'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#tcR'), t, wt('X4', 'Static'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Name') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
