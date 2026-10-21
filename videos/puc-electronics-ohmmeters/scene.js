// PUC Electronics Ep 19 - Ohmmeters ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const wrapG = el => { const g = document.createElementNS(NS, 'g'); el.parentNode.insertBefore(g, el); g.appendChild(el); return g; };
const div = (host, css, html = '') => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;white-space:nowrap;' + css; d.innerHTML = html; host.appendChild(d); return d; };
// resistor zigzags (IEC-style zigzag as in the style frame)
const zigH = (x1, x2, y, a = 14, n = 6) => { let d = `M${x1},${y}`; const s = (x2 - x1) / (n * 2); for (let i = 0; i < n * 2; i++) d += ` L${(x1 + s * (i + 0.5)).toFixed(1)},${y + (i % 2 ? a : -a)}`; return d + ` L${x2},${y}`; };
const zigV = (x, y1, y2, a = 14, n = 6) => { let d = `M${x},${y1}`; const s = (y2 - y1) / (n * 2); for (let i = 0; i < n * 2; i++) d += ` L${x + (i % 2 ? a : -a)},${(y1 + s * (i + 0.5)).toFixed(1)}`; return d + ` L${x},${y2}`; };
// numeric integral of a rate (px/s) from a to t: keeps dot positions a pure function of t
const integ = (f, a, t, h = 1 / 60) => { if (t <= a) return 0; let s = 0; for (let u = a; u < t; u += h) s += f(Math.min(u + h / 2, t)) * Math.min(h, t - u); return s; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col }); e.textContent = s; return e; }
  };
};
/* analogue meter face: arc scale from a0 to a1 degrees (0 = straight up), labelled ticks, needle. set(u) with u = 0..1 of full scale */
const dial = (svg, cx, cy, r, labs, o = {}) => {
  const a0 = o.a0 ?? -55, a1 = o.a1 ?? 55, P = (a, rr) => [cx + rr * Math.sin(a * Math.PI / 180), cy - rr * Math.cos(a * Math.PI / 180)];
  const [sx, sy] = P(a0, r), [ex, ey] = P(a1, r);
  const parts = [W(svg, `M${sx.toFixed(1)},${sy.toFixed(1)} A${r},${r} 0 0 1 ${ex.toFixed(1)},${ey.toFixed(1)}`, { 'stroke-width': 3 })];
  const nT = o.minor ?? (labs.length - 1) * 5;
  for (let i = 0; i <= nT; i++) { const a = a0 + (a1 - a0) * i / nT, mj = i % Math.round(nT / (labs.length - 1)) === 0, [x1, y1] = P(a, r), [x2, y2] = P(a, r - (mj ? 18 : 9));
    parts.push(W(svg, `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`, { 'stroke-width': mj ? 3 : 2 })); }
  const lt = labs.map((s, i) => { const [x, y] = P(a0 + (a1 - a0) * i / (labs.length - 1), r - (o.lr ?? 40)); return mono(svg, x, y + 7, s, { 'text-anchor': 'middle', 'font-size': o.fs ?? 18, fill: INK, 'font-weight': 600 }); });
  const ng = mk(svg, 'g'), nd = W(ng, `M${cx},${cy} L${cx},${cy - r + 8}`, { stroke: o.col || AM, 'stroke-width': 4 });
  const pv = mk(svg, 'circle', { cx, cy, r: 9, fill: INK });
  return { parts, lt, nd, pv, set(u) { PUC.attr(ng, 'transform', `rotate(${(a0 + (a1 - a0) * M.clamp(u, -0.05, 1.03)).toFixed(2)} ${cx} ${cy})`); } };
};
/* diode symbol on a segment: triangle pointing from p to q (conventional current), bar at the tip */
const diode = (svg, p, q, s = 12) => {
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L, nx = -uy, ny = ux;
  const tri = mk(svg, 'path', { d: `M${mx + ux * s},${my + uy * s} L${mx - ux * s + nx * s},${my - uy * s + ny * s} L${mx - ux * s - nx * s},${my - uy * s - ny * s} Z`, fill: '#fff', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const bar = W(svg, `M${mx + ux * s + nx * s},${my + uy * s + ny * s} L${mx + ux * s - nx * s},${my + uy * s - ny * s}`, { 'stroke-width': 3 });
  return { tri, bar };
};

/* ohm scale on an arc: reversed and crowded. frac(R) = Rin/(Rin+R). marks [[frac, label]], minor = fractions */
const RIN = 1.5; // kΩ (example ohmmeter: 1.5 V cell, 1 mA meter)
const fr = R => R === Infinity ? 0 : RIN / (RIN + R);
const MINOR = [0.5, 1, 2, 2.5, 3.5, 4, 5, 6, 7, 8, 10, 12, 15, 20, 30].map(fr).concat([0.25, 0.75].map(fr));
const ohmArc = (svg, cx, cy, r, marks, o = {}) => {
  const a0 = o.a0 ?? -55, a1 = o.a1 ?? 55, P = (a, rr) => [cx + rr * Math.sin(a * Math.PI / 180), cy - rr * Math.cos(a * Math.PI / 180)], A = f => a0 + (a1 - a0) * f;
  const [sx, sy] = P(a0, r), [ex, ey] = P(a1, r);
  const parts = [W(svg, `M${sx.toFixed(1)},${sy.toFixed(1)} A${r},${r} 0 0 1 ${ex.toFixed(1)},${ey.toFixed(1)}`, { 'stroke-width': 3 })];
  const tick = (f, L, w) => { const [x1, y1] = P(A(f), r), [x2, y2] = P(A(f), r - L); parts.push(W(svg, `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`, { 'stroke-width': w })); };
  MINOR.forEach(f => tick(f, 9, 2)); marks.forEach(([f]) => tick(f, 18, 3));
  const lt = marks.map(([f, s]) => { const [x, y] = P(A(f), r - (o.lr ?? 36)); return mono(svg, x, y + 7, s, { 'text-anchor': 'middle', 'font-size': o.fs ?? 18, fill: INK, 'font-weight': 600 }); });
  const ng = mk(svg, 'g'), nd = W(ng, `M${cx},${cy} L${cx},${cy - r + 8}`, { stroke: AM, 'stroke-width': 4 }), pv = mk(svg, 'circle', { cx, cy, r: 8, fill: INK });
  return { parts, lt, nd, pv, set(f) { PUC.attr(ng, 'transform', `rotate(${A(M.clamp(f, -0.03, 1.02)).toFixed(2)} ${cx} ${cy})`); } };
};
/* the same scale as a straight strip (left = ∞, right = 0) with a triangle pointer */
const ohmStrip = (svg, x, y, w, marks, o = {}) => {
  const X = f => x + w * f, parts = [W(svg, `M${x},${y} H${x + w}`, { 'stroke-width': 3 })];
  MINOR.forEach(f => parts.push(W(svg, `M${X(f).toFixed(1)},${y} V${y - 12}`, { 'stroke-width': 2 })));
  marks.forEach(([f]) => parts.push(W(svg, `M${X(f).toFixed(1)},${y} V${y - 24}`, { 'stroke-width': 3 })));
  const lt = marks.map(([f, s]) => mono(svg, X(f), y - 36, s, { 'text-anchor': 'middle', 'font-size': o.fs ?? 20, fill: INK, 'font-weight': 600 }));
  const ptr = mk(svg, 'path', { d: `M0,0 L-13,24 H13 Z`, fill: AM, stroke: INK, 'stroke-width': 2, 'stroke-linejoin': 'round' });
  const pg = wrapG(ptr);
  return { parts, lt, ptr, set(f) { PUC.attr(pg, 'transform', `translate(${X(M.clamp(f, 0, 1)).toFixed(1)},${y + 8})`); } };
};
const MK8 = [[0, '∞'], [fr(10), '10k'], [fr(5), '5k'], [fr(3), '3k'], [fr(1.5), '1.5k'], [fr(1), '1k'], [fr(0.5), '500'], [1, '0']];
const MK5 = [[0, '∞'], [0.25, '4.5k'], [0.5, '1.5k'], [0.75, '500'], [1, '0']];
const fmtR = R => R === Infinity ? '∞' : R === 0 ? '0' : (R >= 1 ? R.toFixed(1) + ' k' : Math.round(R * 1000) + ' ');

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'The') - 0.2;
const tO = T0('O1'), tB = T0('B1'), tD = T0('D1'), tW = T0('W1'), tU = T0('Z1'), tT = T0('T1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tX], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hmS = $('#hmS');
const hmBox = W(hmS, 'M40,10 H280 A20,20 0 0 1 300,30 V230 A20,20 0 0 1 280,250 H40 A20,20 0 0 1 20,230 V30 A20,20 0 0 1 40,10 Z', { 'stroke-width': 5, fill: '#fff' });
const hmWin = mk(hmS, 'rect', { x: 44, y: 34, width: 232, height: 150, rx: 12, fill: C.ac3, stroke: '#CBD0DA', 'stroke-width': 2 });
const hDial = ohmArc(hmS, 160, 176, 130, MK5, { lr: 34, fs: 16 });
const hmT = [mk(hmS, 'circle', { cx: 110, cy: 216, r: 13, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(hmS, 'circle', { cx: 210, cy: 216, r: 13, fill: INK })];
const hTLg = () => 0;
const hL = W(hmS, '', { 'stroke-width': 5 }), hR = W(hmS, '', { 'stroke-width': 5 });
const hTL = mk(hmS, 'rect', { x: -7, y: -30, width: 14, height: 36, rx: 5, fill: INK }), hTR = mk(hmS, 'rect', { x: -7, y: -30, width: 14, height: 36, rx: 5, fill: INK });
const hTLw = wrapG(hTL), hTRw = wrapG(hTR);
const hsS = $('#hsS'), hStrip = ohmStrip(hsS, 20, 110, 680, MK8, { fs: 20 });
const hsL = [mono(hsS, 20, 170, 'HIGH R · SMALL CURRENT', { 'font-size': 17 }), mono(hsS, 700, 170, 'NO R · FULL CURRENT', { 'font-size': 17, 'text-anchor': 'end' })];
const tTouch = wt('H1', 'together'), tJump = wt('H1', 'jumps');

/* ================= B: breadboard ohmmeter ================= */
const ck = $('#ckS');
const box = mk(ck, 'rect', { x: 70, y: 76, width: 700, height: 294, rx: 18, fill: 'none', stroke: '#CBD0DA', 'stroke-width': 3, 'stroke-dasharray': '10 9' });
const boxL = mono(ck, 92, 104, 'INSIDE THE METER', { 'font-size': 17, 'font-weight': 600 });
const bW = [W(ck, 'M150,230 V130 H290'), W(ck, zigH(290, 450, 130, 14, 6)), W(ck, 'M450,130 H660 V190'), W(ck, 'M660,270 V320 H520 V370'), W(ck, 'M150,266 V320 H380 V370')];
const bBat = [W(ck, 'M115,230 H185', { 'stroke-width': 5 }), W(ck, 'M132,266 H168', { 'stroke-width': 9 })];
const za = PUC.arrow(ck, INK, 3.5, 14);
const bG = mk(ck, 'circle', { cx: 660, cy: 230, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), bGl = tx(ck, 660, 241, 'G', { 'text-anchor': 'middle', 'font-size': 30, 'font-style': 'italic' });
const bTm = [mk(ck, 'circle', { cx: 380, cy: 370, r: 10, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }), mk(ck, 'circle', { cx: 520, cy: 370, r: 10, fill: INK })];
const bLab = [tx(ck, 102, 226, '+', { 'font-size': 26 }), tx(ck, 106, 282, '-', { 'font-size': 28 }), tx(ck, 196, 244, 'E', { 'font-style': 'italic', fill: TE, 'font-size': 28 }), mono(ck, 196, 272, '1.5 V'),
  mono(ck, 370, 196, 'zero adjust', { 'text-anchor': 'middle' }), tx(ck, 716, 226, 'Meter'), mono(ck, 716, 254, '1 mA')];
const pL = W(ck, '', { 'stroke-width': 5 }), pR = W(ck, '', { 'stroke-width': 5 });
const tipL = mk(ck, 'rect', { x: -8, y: -6, width: 16, height: 40, rx: 6, fill: INK }), tipR = mk(ck, 'rect', { x: -8, y: -6, width: 16, height: 40, rx: 6, fill: INK });
const tipLw = wrapG(tipL), tipRw = wrapG(tipR);
const rx = W(ck, zigH(362, 538, 500, 13, 6)), rxL = tx(ck, 450, 560, 'Rx', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 26 }), rxV = mono(ck, 450, 588, '', { 'text-anchor': 'middle' });
const rxA = mono(ck, 450, 440, 'a resistor on its own: I = 0', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600 });
const P_OPEN = [[330, 512], [570, 512]], P_SHORT = [[441, 500], [459, 500]], P_RX = [[356, 500], [544, 500]];
const skG = (x, y) => Math.hypot(x - 660, y - 230) < 44 || (y < 140 && y > 118 && x > 286 && x < 454);
const loopA = [[150, 266], [150, 320], [380, 320], [380, 370], [380, 430]], loopB = [[520, 430], [520, 370], [520, 320], [660, 320], [660, 270], [660, 190], [660, 130], [450, 130], [290, 130], [150, 130], [150, 230]];
const eS = flow(ck, [...loopA, [441, 500], [459, 500], ...loopB], 40, { skip: (x, y) => skG(x, y) || Math.hypot(x - 380, y - 370) < 12 || Math.hypot(x - 520, y - 370) < 12 });
const eX = flow(ck, [...loopA, [356, 500], [544, 500], ...loopB], 42, { skip: (x, y) => skG(x, y) || (y > 486 && y < 514 && x > 358 && x < 542) || Math.hypot(x - 380, y - 370) < 12 || Math.hypot(x - 520, y - 370) < 12 });
const tBuild = wt('O3', 'simplest') - 0.2, tShort = wt('B2', 'short'), tZero = wt('B2', 'Turn'), tOpen = wt('B4', 'pull'), tRx = wt('B5', 'unknown'), tBig = wt('B6', 'bigger');
// probe tip positions over time
const tipPos = t => { let L = P_OPEN; const seq = [[tShort, P_SHORT], [tOpen, P_OPEN], [tRx, P_RX]]; let cur = P_OPEN, prev = P_OPEN, ts = -1;
  for (const [a, p] of seq) if (t >= a) { prev = cur; cur = p; ts = a; }
  const u = ts < 0 ? 1 : M.spring(t - ts, M.SOFT); return [0, 1].map(i => [M.lerp(prev[i][0], cur[i][0], u), M.lerp(prev[i][1], cur[i][1], u)]); };
const Rx = t => t < tRx ? null : (t < tBig ? 1.5 : 4.5);
// meter current as a fraction of full scale: each change springs in (zero adjust is a slow turn)
const sp = x => x <= 0 ? 0 : M.spring(x, M.SOFT);
const Ism = t => Math.max(0, 0.9 * sp(t - tShort) + 0.1 * M.io((t - tZero - 0.3) / 1.4) - 1.0 * sp(t - tOpen) + 0.5 * sp(t - tRx) - 0.25 * sp(t - tBig));
const SCo = scope($('#scS'), 592, 200), trI = SCo.tr(VI), sLab = SCo.lab(14, 24, 'CH1 · METER CURRENT I', '#B9A6F2');
const fs1 = SCo.lab(500, 44, 'FULL', '#B9A6F2');
const ndS = $('#ndS'), bDial = ohmArc(ndS, 165, 190, 150, MK5, { lr: 36, fs: 17 });
$('#bRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="bI" style="color:${VI}">0.00</span><span class="u">mA</span>
  <span class="k">R<sub>x</sub></span><span class="v" id="bR">∞</span><span class="u" id="bRu">Ω</span>`;

/* ================= D: derivation ================= */
const dS = $('#dS');
const dg = PUC.graph(dS, { x: 110, y: 80, w: 600, h: 290, xmax: 10, ymax: 1, xt: [0, 1.5, 3, 4.5, 6, 9], yt: [0, 0.5, 1], xl: 'Rx (kΩ)', yl: 'needle (fraction of full scale)' });
const dCur = dg.curve(VI, 5), dDot = dg.dot(AM, 11), dDot2 = dg.dot(C.ink2, 9);
const dGu = [mk(dS, 'path', { d: `M${dg.X(1.5)},${dg.Y(0)} V${dg.Y(0.5)} H${dg.X(0)}`, fill: 'none', stroke: AM, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' })];
const dHalf = mono(dS, dg.X(1.5) + 16, dg.Y(0.5) - 14, 'half scale at Rx = Rin', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const dNot = mono(dS, dg.X(3) + 16, dg.Y(1 / 3) + 4, 'double Rx: only 1/3, not 1/4', { fill: C.ink2, 'font-weight': 600, 'font-size': 18 });
const dStrip = ohmStrip(dS, 110, 520, 600, MK8, { fs: 18 });
const dSt = [
  [K(`\\textcolor{${VI}}{I_{fs}} = \\dfrac{\\textcolor{${TE}}{E}}{R_{in}}`), 'probes shorted', 72],
  [K(`\\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${TE}}{E}}{R_{in}+R_x}`), 'with Rx connected', 178],
  [K(`\\dfrac{\\textcolor{${VI}}{I}}{\\textcolor{${VI}}{I_{fs}}} = \\dfrac{R_{in}}{R_{in}+R_x}`), 'fraction of full scale', 286],
  [K(`R_x = R_{in}\\;\\Rightarrow\\;\\tfrac{1}{2}\\ \\text{scale}`), 'mid-scale', 424]];
$('#dSteps').innerHTML = dSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const dRows = [...$('#dSteps').children];
const tDs = [wt('D2', 'With'), wt('D3', 'With'), wt('D4', 'Divide'), wt('D5', 'When')];

/* ================= W: worked example ================= */
const wS = $('#wS');
const wStrip = ohmStrip(wS, 52, 200, 680, MK8, { fs: 20 });
const wBarBg = mk(wS, 'rect', { x: 52, y: 300, width: 680, height: 40, rx: 12, fill: C.soft }), wBar = mk(wS, 'rect', { x: 52, y: 300, width: 0, height: 40, rx: 12, fill: VI });
const wBarL = mono(wS, 52, 380, 'NEEDLE = I / Ifs', { 'font-size': 18, fill: VI, 'font-weight': 600 }), wBarV = mono(wS, 732, 380, '', { 'font-size': 20, fill: VI, 'font-weight': 600, 'text-anchor': 'end' });
const wC1 = div($('#wL'), 'left:52px;top:416px', '<span class="pillp ac" style="position:static">Half scale = 1500 Ω</span>');
const wC2 = div($('#wL'), 'left:400px;top:416px', '<span class="pillp ink" style="position:static">1/3 scale = 3000 Ω</span>');
const wSt = [
  [K(`\\textcolor{${TE}}{E} = 1.5\\,\\text{V},\\;\\; \\textcolor{${VI}}{I_{fs}} = 1\\times10^{-3}\\,\\text{A}`), 'given', 80],
  [K(`R_{in} = \\dfrac{1.5}{1\\times10^{-3}} = 1500\\,\\Omega`), '', 158],
  [K(`R_x = 1500\\,\\Omega \\;\\to\\; \\tfrac{1}{2}\\ \\text{scale}`), 'mid-scale mark', 279],
  [K(`\\dfrac{\\textcolor{${VI}}{I}}{\\textcolor{${VI}}{I_{fs}}} = \\dfrac{1500}{1500+3000}`), 'Rx = 3000 Ω', 366],
  [K(`= \\tfrac{1}{3}\\ \\text{of full scale}`), '', 497]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRows = [...$('#wSteps').children];
const tWs = [wt('W1', 'An'), wt('W2', 'R'), wt('W3', 'So'), wt('W4', 'The'), wt('W5', 'That')];
const avW = PUC.avatar($('#sW'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Mid-scale tells me the meter\'s own resistance!' });

/* ================= U: using it right ================= */
const u1S = $('#u1S'), uDial = ohmArc(u1S, 224, 270, 200, MK5, { lr: 38, fs: 17 });
const uE = mono(u1S, 0, 24, '', { fill: TE, 'font-size': 22, 'font-weight': 600 });
const knob = mk(u1S, 'g'); mk(knob, 'circle', { cx: 0, cy: 0, r: 24, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }); mk(knob, 'line', { x1: 0, y1: 0, x2: 0, y2: -18, stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const knobW = wrapG(knob);
const knobL = mono(u1S, 372, 24, 'ZERO ADJ', { 'font-size': 15, 'text-anchor': 'end', 'font-weight': 600 });
const tWeak = wt('Z2', 'weaker'), tKnob = wt('Z2', 'knob');
const u2S = $('#u2S');
const u2W = [W(u2S, 'M40,96 V50 H130'), W(u2S, zigH(130, 230, 50, 12, 4)), W(u2S, 'M230,50 H300 V92'), W(u2S, 'M300,148 V190 H40 V132'), W(u2S, 'M300,50 H400 V84'), W(u2S, zigV(400, 84, 156, 12, 4)), W(u2S, 'M400,156 V190 H300')];
const u2B = [W(u2S, 'M14,96 H66', { 'stroke-width': 5 }), W(u2S, 'M26,132 H54', { 'stroke-width': 8 })];
const u2G = mk(u2S, 'circle', { cx: 300, cy: 120, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }), u2Gl = tx(u2S, 300, 129, 'G', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 24 });
const u2L = [tx(u2S, 416, 128, 'Rx', { 'font-style': 'italic', 'font-size': 22 }), tx(u2S, 180, 30, 'R', { 'font-style': 'italic', 'font-size': 22, 'text-anchor': 'middle' }), tx(u2S, 76, 122, 'E', { 'font-style': 'italic', 'font-size': 22, fill: TE })];
const u2Sc = [W(u2S, 'M20,270 H428', { 'stroke-width': 3 }), ...[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(f => W(u2S, `M${20 + 408 * f},270 V${f === 0 || f === 1 ? 252 : 260}`, { 'stroke-width': 2.5 }))];
const u2T = [mono(u2S, 20, 240, '0 Ω', { fill: INK, 'font-weight': 600 }), mono(u2S, 428, 240, '∞', { fill: INK, 'font-weight': 600, 'text-anchor': 'end' })];
$('#r1 .ic').innerHTML = M.icon('zap', 34, C.red, 2.4); $('#r2 .ic').innerHTML = M.icon('arrowU', 34, C.red, 2.6);

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'The ohm scale is even, 0 Ω on the left', right: 'Reversed and crowded: half scale at R<sub>x</sub> = R<sub>in</sub>', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcA = [W(tcS, 'M190,120 H740', { 'stroke-width': 3 }), ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => W(tcS, `M${190 + 55 * i},120 V${i % 5 ? 110 : 100}`, { 'stroke-width': 2.5 }))];
const tcAl = [mono(tcS, 36, 124, 'AMMETER', { fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(tcS, 190, 88, '0', { 'text-anchor': 'middle', fill: INK }), mono(tcS, 740, 88, 'FULL', { 'text-anchor': 'middle', fill: INK })];
const tcO = ohmStrip(tcS, 190, 236, 550, [[0, '∞'], [fr(3), '3k'], [0.5, '1.5k'], [fr(0.5), '500'], [1, '0']], { fs: 17 });
const tcOl = mono(tcS, 36, 240, 'OHMMETER', { fill: INK, 'font-weight': 600, 'font-size': 18 });
M.hide(tcO.ptr, true);
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers: what an ohmmeter is, why it needs zero adjustment, precautions' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'An ohmmeter uses a 3&nbsp;V cell and a meter of 100&nbsp;µA full scale. Which resistance makes the needle stop at one fifth of full scale?', qW: 780,
  opts: [K('6\\,\\text{k}\\Omega'), K('24\\,\\text{k}\\Omega'), K('120\\,\\text{k}\\Omega'), K('150\\,\\text{k}\\Omega')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`R_{in} = \\dfrac{3}{100\\times10^{-6}} = 30\\,\\text{k}\\Omega`)], [K(`\\dfrac{R_{in}}{R_{in}+R_x} = \\dfrac{1}{5}`)],
  [K(`R_{in}+R_x = 5R_{in}`)], [K(`R_x = 4\\times30 = 120\\,\\text{k}\\Omega`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'First'), wt('A3', 'One'), wt('A4', 'So'), wt('A4', 'four')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 500, y0: 88, dy: 118, title: 'Ohmmeters · formula card', txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${VI}}{I_{fs}} = \\dfrac{\\textcolor{${TE}}{E}}{R_{in}} \\qquad \\dfrac{\\textcolor{${VI}}{I}}{\\textcolor{${VI}}{I_{fs}}} = \\dfrac{R_{in}}{R_{in}+R_x}`),
    'Half scale when R<sub>x</sub> = R<sub>in</sub> (the mid-scale resistance)',
    'Series type: 0 Ω on the right, ∞ on the left, crowded scale',
    'Zero adjust with probes shorted · never measure a live circuit'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 20', topic: 'Analogue and digital multimeters', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tRx - 0.2, 1.12, 620, 640], [T0('B6') - 0.3, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const VPX = 150;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tO + 0.5, tU - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tO + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tO - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.draw(hmBox, t, tMorph + 0.5, 0.6); M.vis(hmWin, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.25 });
    drawSeq(hDial.parts, t, tMorph + 0.9, 0.15, 0.01); fadeAt([...hDial.lt, hDial.nd, hDial.pv, ...hmT], t, tMorph + 1.0, 0.03);
    const u = t < tTouch ? 0 : M.spring(t - tTouch, M.SOFT), tipL = [M.lerp(90, 152, u), M.lerp(440, 420, u)], tipR = [M.lerp(230, 168, u), M.lerp(440, 420, u)];
    PUC.attr(hL, 'd', `M110,229 C110,320 ${tipL[0]},330 ${tipL[0].toFixed(1)},${(tipL[1] - 30).toFixed(1)}`); PUC.attr(hR, 'd', `M210,229 C210,320 ${tipR[0]},330 ${tipR[0].toFixed(1)},${(tipR[1] - 30).toFixed(1)}`);
    PUC.attr(hTLw, 'transform', `translate(${tipL[0].toFixed(1)},${tipL[1].toFixed(1)}) rotate(${(-30 * u).toFixed(1)})`); PUC.attr(hTRw, 'transform', `translate(${tipR[0].toFixed(1)},${tipR[1].toFixed(1)}) rotate(${(30 * u).toFixed(1)})`);
    fadeAt([hL, hR, hTL, hTR], t, tMorph + 1.1);
    const tInf = wt('H2', 'infinity'), sw = t < tJump ? 0 : M.spring(t - tJump, M.SOFT) - (t < tInf ? 0 : M.spring(t - tInf, M.SOFT));
    hDial.set(sw);
    M.vis($('#thC'), t, tJump - 0.2, out, { dx: 60, dy: 0, ...o });
    drawSeq(hStrip.parts, t, tJump, 0.12, 0.012); fadeAt(hStrip.lt, t, tJump + 0.2, 0.04); fadeAt(hsL, t, wt('H2', 'Zero') + 0.3, 0.3);
    hStrip.set(sw); M.vis(hStrip.ptr, t, tJump + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#nwC'), t, T0('H2') - 0.1, out, { dy: 36, ...o });
    M.vis($('#h1'), t, wt('H2', 'Zero') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#h2'), t, tInf - 0.1, 1e9, { dx: -20, dy: 0 });
  }

  /* O + B: breadboard ohmmeter */
  const bOn = t >= tO - 0.05 && t < tD + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tO + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tO + 0.4, out, { dy: 36, ...o });
    drawSeq(bBat, t, wt('O2', 'battery') - 0.2, 0.25, 0.1); fadeAt(bLab.slice(0, 4), t, wt('O2', 'battery'), 0.06);
    drawSeq([bW[0], bW[1], bW[2]], t, tBuild, 0.35, 0.18); M.vis(bG, t, wt('O3', 'galvanometer') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(bGl, t, wt('O3', 'galvanometer'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt(bLab.slice(5), t, wt('O3', 'galvanometer') + 0.1); M.vis(bLab[4], t, wt('O3', 'resistor'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq([bW[3], bW[4]], t, wt('O3', 'resistor') + 0.1, 0.35, 0.15); fadeAt(bTm, t, wt('O3', 'probes') - 0.2); M.draw(box, t, wt('O3', 'series'), 0.8); M.vis(boxL, t, wt('O3', 'series') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    // zero-adjust arrow slides while the knob is turned
    const kz = M.io((t - tZero - 0.3) / 1.4), zx = M.lerp(330, 300, kz);
    za.set(zx, 172, zx + 140, 88); if (t < wt('O3', 'resistor')) M.hide(za.g, true);
    const [pl, pr] = tipPos(t);
    PUC.attr(pL, 'd', `M380,380 V430 L${pl[0].toFixed(1)},${pl[1].toFixed(1)}`); PUC.attr(pR, 'd', `M520,380 V430 L${pr[0].toFixed(1)},${pr[1].toFixed(1)}`);
    PUC.attr(tipLw, 'transform', `translate(${pl[0].toFixed(1)},${pl[1].toFixed(1)})`); PUC.attr(tipRw, 'transform', `translate(${pr[0].toFixed(1)},${pr[1].toFixed(1)})`);
    fadeAt([pL, pR, tipL, tipR], t, wt('O3', 'probes'));
    const tO1 = tO + 0.5, tO3 = T0('O3') - 0.3;
    if (t < tRx) { M.vis(rx, t, tO1, tO3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); } else M.vis(rx, t, tRx + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(rxA, t, tO1 + 0.3, tO3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(rxL, t, tRx + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(rxV, t, tRx + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.setT(rxV, Rx(t) === 4.5 ? '4.5 kΩ' : '1.5 kΩ');
    // current and electrons (speed proportional to current)
    const I = Ism(t), sh = t >= tShort + 0.4 && t < tOpen, xr = t >= tRx + 0.4;
    const off = VPX * integ(Ism, tShort, t);
    eS.set(off, sh); eX.set(off, xr);
    M.vis($('#ckE'), t, tShort + 0.3, 1e9, { dy: 0, fade: 0.2 });
    trI(τ => 140 * Ism(τ), t, tB - 0.2, 6, 180, t >= tB - 0.2); M.vis(sLab, t, tB, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#scT'), t, tB, 1e9, { dy: 0, fade: 0.2 }); M.vis(fs1, t, tZero + 1.6, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(bDial.parts, t, tO + 0.6, 0.12, 0.01); fadeAt([...bDial.lt, bDial.nd, bDial.pv], t, tO + 0.8, 0.03);
    bDial.set(I);
    M.vis($('#bRo'), t, tO + 0.8, 1e9, { dy: 12 });
    M.setT($('#bI'), I.toFixed(2));
    const Rr = t < tShort ? Infinity : t < tOpen ? (t < tZero + 1.7 ? null : 0) : t < tRx ? Infinity : Rx(t);
    M.setT($('#bR'), Rr === null ? '--' : Rr === Infinity ? '∞' : Rr === 0 ? '0' : Rr.toFixed(1)); M.setT($('#bRu'), Rr && Rr !== Infinity ? 'kΩ' : 'Ω');
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(dg.axes, t, tD + 0.4, 1e9, { dy: 0, fade: 0.3 }); dS.querySelectorAll('text, line').forEach(e => { if (e !== dHalf && e !== dNot && !dStrip.lt.includes(e)) M.vis(e, t, tD + 0.5, 1e9, { dy: 0, fade: 0.3 }); });
    const cu = M.io((t - tDs[1] - 0.3) / 3.0); dCur(s => [s, RIN / (RIN + s)], 0, 10 * cu, 120);
    M.draw(dGu[0], t, tDs[3] + 0.2, 0.6); dDot(1.5, 0.5, t >= tDs[3] + 0.6); M.vis(dHalf, t, tDs[3] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    dDot2(3, 1 / 3, t >= wt('D6', 'doubling')); M.vis(dNot, t, wt('D6', 'doubling') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(dStrip.parts, t, wt('D6', 'marks') - 0.2, 0.12, 0.012); fadeAt(dStrip.lt, t, wt('D6', 'marks'), 0.05); M.hide(dStrip.ptr, true);
    dRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); M.vis(r.querySelector('.why'), t, tDs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tDs[i] - 0.15); });
    M.vis($('#dBox'), t, tDs[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dUnit'), t, T0('D6'), 1e9, { dy: 12 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tU + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tU - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(wStrip.parts, t, tW + 0.4, 0.12, 0.01); fadeAt(wStrip.lt, t, tW + 0.6, 0.04);
    const f = t < tWs[2] ? 1 : t < tWs[4] - 0.4 ? 1 - 0.5 * M.spring(t - tWs[2], M.SOFT) : 0.5 - (0.5 - 1 / 3) * M.spring(t - tWs[4] + 0.4, M.SOFT);
    wStrip.set(f); M.vis(wStrip.ptr, t, tW + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wBarBg, t, tW + 0.7, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wBar, 'width', (680 * f).toFixed(1)); M.vis(wBar, t, tW + 0.9, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wBarL, t, tW + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(wBarV, t, tW + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.setT(wBarV, f > 0.99 ? 'FULL' : f > 0.49 && f < 0.51 ? '1/2' : Math.abs(f - 1 / 3) < 0.005 ? '1/3' : f.toFixed(2));
    M.vis(wC1, t, tWs[2] + 0.5, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(wC2, t, tWs[4] + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    wRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wB1'), t, tWs[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#wB2'), t, tWs[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, tWs[4] + 1.0, out);
  }

  /* U: using it right */
  const uOn = t >= tU - 0.05 && t < tT + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    const tS1 = T0('S1'), tP1 = T0('P1');
    M.vis($('#u1'), t, tU + 0.1, 1e9, { dy: 36 }); M.vis($('#u2'), t, tS1 - 0.1, 1e9, { dy: 36 }); M.vis($('#u3'), t, tP1 - 0.1, 1e9, { dy: 36 });
    drawSeq(uDial.parts, t, tU + 0.4, 0.12, 0.01); fadeAt([...uDial.lt, uDial.nd, uDial.pv, uE, knobL], t, tU + 0.5, 0.03); M.vis(knob, t, tU + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const wk = M.io((t - tWeak) / 1.2), kb = M.io((t - tKnob) / 1.2);
    const E = 1.5 - 0.2 * wk; M.setT(uE, `E = ${E.toFixed(2)} V`);
    uDial.set(1 - 0.13 * wk + 0.13 * kb); PUC.attr(knobW, 'transform', `translate(400,40) rotate(${(-60 + 120 * kb).toFixed(1)})`);
    M.vis($('#u1 .ds'), t, tKnob, 1e9, { dy: 12 });
    drawSeq([...u2W, ...u2B], t, tS1 + 0.2, 0.2, 0.08); M.vis(u2G, t, tS1 + 0.5, 1e9, { dy: 0, fade: 0.2 }); fadeAt([u2Gl, ...u2L], t, tS1 + 0.7, 0.06);
    drawSeq(u2Sc, t, wt('S2', 'scale') - 0.2, 0.1, 0.03); fadeAt(u2T, t, wt('S2', 'zero') - 0.1, 0.2); M.vis($('#u2 .ds'), t, wt('S2', 'normal'), 1e9, { dy: 12 });
    M.vis($('#r1'), t, wt('P2', 'Never') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#r2'), t, wt('P3', 'take') - 0.1, 1e9, { dx: -20, dy: 0 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tX; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tX - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'It') - 0.05, { out: tX - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not'), tRight: wt('X3', 'reversed') - 0.1 });
    drawSeq(tcA, t, wt('X2', 'ammeter') - 0.3, 0.1, 0.03); fadeAt(tcAl, t, wt('X2', 'ammeter') - 0.2);
    drawSeq(tcO.parts, t, wt('X3', 'reversed') - 0.1, 0.1, 0.01); fadeAt([...tcO.lt, tcOl], t, wt('X3', 'reversed'), 0.04);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'What') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
M.sfx(tX - 0.1, 'whoosh', 0.22);
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
