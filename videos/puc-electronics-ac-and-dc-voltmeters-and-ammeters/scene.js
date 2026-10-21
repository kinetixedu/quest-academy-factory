// PUC Electronics Ep 18 - AC and DC voltmeters and ammeters ("Breadboard" style, Lab Notebook world)
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Its') - 0.2;
const tG = T0('G1'), tB = T0('B1'), tD = T0('D1'), tV = T0('V1'), tW = T0('W1'), tC = T0('C1'), tT = T0('T1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tX], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hmS = $('#hmS');
const hmBox = W(hmS, 'M40,20 H280 A20,20 0 0 1 300,40 V310 A20,20 0 0 1 280,330 H40 A20,20 0 0 1 20,310 V40 A20,20 0 0 1 40,20 Z', { 'stroke-width': 5, fill: '#fff' });
const hmWin = mk(hmS, 'rect', { x: 44, y: 46, width: 232, height: 190, rx: 12, fill: C.ac3, stroke: '#CBD0DA', 'stroke-width': 2 });
const hDial = dial(hmS, 160, 214, 140, ['0', '0.5', '1'], { lr: 38, fs: 20, minor: 10 });
const hmU = mono(hmS, 252, 228, 'mA', { 'text-anchor': 'middle', 'font-size': 20, fill: VI, 'font-weight': 600 });
const hmT = [mk(hmS, 'circle', { cx: 100, cy: 286, r: 15, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(hmS, 'circle', { cx: 220, cy: 286, r: 15, fill: INK })];
const thBar = $('#thBar'); mk(thBar, 'rect', { x: 0, y: 16, width: 300, height: 26, rx: 13, fill: C.soft });
const thFill = mk(thBar, 'rect', { x: 0, y: 16, width: 0, height: 26, rx: 13, fill: VI });
const tSwing = wt('H1', 'swings'), tFull = wt('H1', 'way');

/* ================= G: galvanometer mechanism ================= */
const gS = $('#gS'), GC = [392, 360];
const gScale = dial(gS, GC[0], GC[1], 250, ['0', '', '', '', 'FULL'], { a0: -50, a1: 50, lr: -26, fs: 18, minor: 20 });
M.hide(gScale.nd, true); M.hide(gScale.pv, true);
const poles = [W(gS, 'M60,280 H262 A150,150 0 0 0 262,440 H60 Z', { fill: '#E9EBF0', 'stroke-width': 3 }), W(gS, 'M724,280 H522 A150,150 0 0 1 522,440 H724 Z', { fill: '#E9EBF0', 'stroke-width': 3 })];
const pN = tx(gS, 120, 376, 'N', { 'font-size': 44, fill: INK2(), 'text-anchor': 'middle' }), pS2 = tx(gS, 664, 376, 'S', { 'font-size': 44, fill: INK2(), 'text-anchor': 'middle' });
function INK2() { return C.ink2; }
const fld = [320, 345, 370, 395, 420].map(y => mk(gS, 'line', { x1: 268, y1: y - 10, x2: 516, y2: y - 10, stroke: CH1, 'stroke-width': 2, 'stroke-dasharray': '6 8' }));
const core = mk(gS, 'circle', { cx: GC[0], cy: GC[1], r: 62, fill: '#F3F1EA', stroke: '#B8BCC6', 'stroke-width': 3 });
const coilG = mk(gS, 'g');
const coilL = mk(coilG, 'line', { x1: GC[0] - 104, y1: GC[1], x2: GC[0] + 104, y2: GC[1], stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
const ptr = mk(coilG, 'line', { x1: GC[0], y1: GC[1], x2: GC[0], y2: GC[1] - 236, stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const sideL = mk(coilG, 'circle', { cx: GC[0] - 104, cy: GC[1], r: 18, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const sideR = mk(coilG, 'circle', { cx: GC[0] + 104, cy: GC[1], r: 18, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const dotL = mk(coilG, 'circle', { cx: GC[0] - 104, cy: GC[1], r: 5, fill: VI });
const crR = W(coilG, `M${GC[0] + 96},${GC[1] - 8} L${GC[0] + 112},${GC[1] + 8} M${GC[0] + 112},${GC[1] - 8} L${GC[0] + 96},${GC[1] + 8}`, { stroke: VI, 'stroke-width': 3 });
let spd = ''; for (let i = 0; i <= 80; i++) { const a = i / 80 * 5.5 * Math.PI, r = 6 + i / 80 * 30; spd += (i ? 'L' : 'M') + (GC[0] + r * Math.cos(a)).toFixed(1) + ',' + (GC[1] + r * Math.sin(a)).toFixed(1); }
const spring = W(coilG, spd, { stroke: C.gold, 'stroke-width': 2.5 });
const coilR = wrapG(coilG);
const piv = mk(gS, 'circle', { cx: GC[0], cy: GC[1], r: 8, fill: INK });
const fA = [PUC.arrow(gS, C.ink2, 5, 14), PUC.arrow(gS, C.ink2, 5, 14)], fL = [tx(gS, 0, 0, 'F', { 'font-style': 'italic', fill: C.ink2 }), tx(gS, 0, 0, 'F', { 'font-style': 'italic', fill: C.ink2 })];
const gLeg = [mono(gS, 40, 566, 'magnet poles', { fill: MU }), mono(gS, 250, 566, 'coil', { fill: MU }), mono(gS, 340, 566, 'spring', { fill: C.gold }), mono(gS, 460, 566, 'pointer', { fill: '#B7791F' })];
const gLeg2 = mono(gS, 752, 40, 'current  • out   × in', { fill: VI, 'font-size': 18, 'text-anchor': 'end' });
$('#gRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="gI" style="color:${VI}">0.00</span><span class="u">mA</span>
  <span class="k">θ</span><span class="v" id="gT">0</span><span class="u">°</span>`;
const gg = PUC.graph($('#gGr'), { x: 80, y: 20, w: 560, h: 180, xmax: 1.18, ymax: 100, xt: [0, 0.25, 0.5, 0.75, 1], yt: [0, 50, 100], xl: 'I (mA)', yl: 'θ (°)' });
const gLine = gg.curve(VI, 4), gDot = gg.dot(AM, 10);
$('#tG .k').innerHTML = K('G'); $('#tI .k').innerHTML = K(`\\textcolor{${VI}}{I_g}`);
const tG3 = wt('G3', 'Send'), tG5 = wt('G5', 'Double'), tG5b = wt('G5', 'proportional'), tG6 = wt('G6', 'all');
const IST = [[tG3, 0.25], [tG5, 0.5], [tG5b, 0.75], [tG6 - 0.2, 1]];
const Ig = t => { let v = 0; for (const [a, x] of IST) if (t >= a) v = x; return v; };
const defl = t => { let v = 0, prev = 0; for (const [a, x] of IST) { v += (x - prev) * M.spring(t - a, M.SOFT); prev = x; } return v; };
const avG = PUC.avatar($('#sG'), { x: 1008, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'A straight line. The scale is even!' });

/* ================= B: breadboard ammeter ================= */
const ck = $('#ckS');
const bW = [W(ck, 'M120,282 V150 H360'), W(ck, 'M360,150 H442'), W(ck, 'M518,150 H600'), W(ck, 'M360,150 V260 H420'), W(ck, zigH(420, 540, 260, 14, 5)), W(ck, 'M540,260 H600 V150'),
  W(ck, 'M600,150 H800 V250'), W(ck, zigV(800, 250, 370, 16, 5)), W(ck, 'M800,370 V470 H120 V318')];
const bBat = [W(ck, 'M85,282 H155', { 'stroke-width': 5 }), W(ck, 'M102,318 H138', { 'stroke-width': 9 })];
const bG = mk(ck, 'circle', { cx: 480, cy: 150, r: 38, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const bGl = tx(ck, 480, 160, 'G', { 'text-anchor': 'middle', 'font-size': 30, 'font-style': 'italic' });
const bJ = [mk(ck, 'circle', { cx: 360, cy: 150, r: 7, fill: INK }), mk(ck, 'circle', { cx: 600, cy: 150, r: 7, fill: INK })];
const bBox = mk(ck, 'rect', { x: 326, y: 92, width: 308, height: 212, rx: 16, fill: 'none', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const bLab = [tx(ck, 58, 278, '+', { 'font-size': 28 }), tx(ck, 62, 336, '-', { 'font-size': 30 }), tx(ck, 172, 296, 'Battery'), mono(ck, 172, 324, '6 V'),
  tx(ck, 834, 304, 'Load'), mono(ck, 834, 332, 'R'), tx(ck, 480, 338, 'S', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 480, 364, 'shunt', { 'text-anchor': 'middle' }),
  mono(ck, 480, 84, 'AMMETER = G + SHUNT', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 })];
const eSk = (x, y) => (Math.abs(x - 800) < 3 && y > 246 && y < 374);
const bM1 = flow(ck, [[120, 318], [120, 470], [800, 470], [800, 150], [600, 150]], 34, { skip: eSk });
const bM2 = flow(ck, [[360, 150], [120, 150], [120, 282]], 9);
const bSh = flow(ck, [[600, 150], [600, 260], [360, 260], [360, 150]], 12, { skip: (x, y) => y > 240 && x > 416 && x < 544 });
const bCo = flow(ck, [[600, 150], [360, 150]], 1, { skip: (x, y) => x > 436 && x < 524 });
const dlS = $('#dlS'), bDial = dial(dlS, 296, 206, 176, ['0', '0.2', '0.4', '0.6', '0.8', '1.0']);
const dlU = mono(dlS, 296, 180, 'A', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 22 });
$('#bRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="bI" style="color:${VI}">0.000</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>S</sub></span><span class="v" id="bS" style="color:${VI}">0.000</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>g</sub></span><span class="v" id="bGv" style="color:${VI}">0.00</span><span class="u">mA</span>`;
const tB2 = wt('B2', 'So'), tB3 = wt('B3', 'Watch'), tUp = wt('B4', 'Turn');
const Ib = t => t < tB3 - 0.3 ? 0 : M.lerp(0.4, 1.0, M.io((t - tUp) / 1.6));
const VPX = 150; // px per second per ampere (slow-motion view)
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The shunt is a bypass lane for current!' });

/* ================= D: shunt derivation ================= */
const pS = $('#pS');
const pW = [W(pS, 'M80,300 H220'), W(pS, 'M220,300 V180 H348'), W(pS, 'M436,180 H564 V300'), W(pS, 'M220,300 V420 H330'), W(pS, zigH(330, 454, 420, 14, 5)), W(pS, 'M454,420 H564 V300'), W(pS, 'M564,300 H704')];
const pG = mk(pS, 'circle', { cx: 392, cy: 180, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), pGl = tx(pS, 392, 191, 'G', { 'text-anchor': 'middle', 'font-size': 32, 'font-style': 'italic' });
const pJ = [mk(pS, 'circle', { cx: 220, cy: 300, r: 7, fill: INK }), mk(pS, 'circle', { cx: 564, cy: 300, r: 7, fill: INK })];
const pSl = tx(pS, 392, 474, 'S', { 'text-anchor': 'middle', 'font-size': 30, 'font-style': 'italic' });
const pIa = PUC.arrow(pS, VI, 5, 14), pIt = div($('#pL'), 'left:96px;top:236px;font-size:34px', K(`\\textcolor{${VI}}{I}`));
const pIg = PUC.arrow(pS, VI, 5, 14), pIgt = div($('#pL'), 'left:250px;top:100px;font-size:30px', K(`\\textcolor{${VI}}{I_g}`));
const pIs = PUC.arrow(pS, VI, 5, 14), pIst = div($('#pL'), 'left:236px;top:432px;font-size:30px', K(`\\textcolor{${VI}}{I}-\\textcolor{${VI}}{I_g}`));
const pVb = W(pS, 'M220,508 V528 H564 V508', { stroke: TE, 'stroke-width': 3 }), pVt = mono(pS, 392, 566, 'same V across both', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600 });
const pVg = div($('#pL'), 'left:470px;top:100px;font-size:28px', K(`\\textcolor{${TE}}{V} = \\textcolor{${VI}}{I_g}G`));
const pE = [flow(pS, [[704, 300], [564, 300]], 4), flow(pS, [[220, 300], [80, 300]], 4), flow(pS, [[564, 300], [564, 420], [220, 420], [220, 300]], 9, { skip: (x, y) => y > 400 && x > 326 && x < 458 }), flow(pS, [[564, 300], [564, 180], [220, 180], [220, 300]], 1, { skip: (x, y) => y < 230 && x > 344 && x < 440 })];
const pSteps = [
  [K(`\\textcolor{${TE}}{V_G} = \\textcolor{${TE}}{V_S}`), 'in parallel: same voltage', 92],
  [K(`\\textcolor{${TE}}{V} = \\textcolor{${VI}}{I_g}\\,G`), 'across the coil', 196],
  [K(`\\textcolor{${TE}}{V} = (\\textcolor{${VI}}{I}-\\textcolor{${VI}}{I_g})\\,S`), 'across the shunt', 300],
  [K(`S = \\dfrac{\\textcolor{${VI}}{I_g}\\,G}{\\textcolor{${VI}}{I}-\\textcolor{${VI}}{I_g}}`), 'the shunt', 402]];
$('#pSteps').innerHTML = pSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const pRows = [...$('#pSteps').children];
const tP = [wt('D2', 'The'), wt('D3', 'The'), wt('D4', 'flows'), wt('D5', 'Set')];

/* ================= V: voltmeter ================= */
const vS = $('#vS');
const vW = [W(vS, 'M110,282 V150 H400 V230'), W(vS, zigV(400, 230, 370, 16, 5)), W(vS, 'M400,370 V450 H110 V318')];
const vBat = [W(vS, 'M75,282 H145', { 'stroke-width': 5 }), W(vS, 'M92,318 H128', { 'stroke-width': 9 })];
const vMw = [W(vS, 'M400,150 H580 V200'), W(vS, zigV(580, 200, 290, 14, 5)), W(vS, 'M580,290 V324'), W(vS, 'M580,396 V450 H400')];
const vG = mk(vS, 'circle', { cx: 580, cy: 360, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), vGl = tx(vS, 580, 370, 'G', { 'text-anchor': 'middle', 'font-size': 28, 'font-style': 'italic' });
const vJ = [mk(vS, 'circle', { cx: 400, cy: 150, r: 7, fill: INK }), mk(vS, 'circle', { cx: 400, cy: 450, r: 7, fill: INK })];
const vBox = mk(vS, 'rect', { x: 530, y: 180, width: 100, height: 236, rx: 14, fill: 'none', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const vLab = [tx(vS, 48, 278, '+', { 'font-size': 28 }), tx(vS, 52, 336, '-', { 'font-size': 30 }), tx(vS, 160, 296, 'Battery'),
  tx(vS, 430, 298, 'Load'), tx(vS, 646, 254, 'R', { 'font-style': 'italic', 'font-size': 28 }), mono(vS, 646, 280, 'multiplier'),
  mono(vS, 392, 540, 'VOLTMETER = G + R, connected across the load', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 })];
const vVb = W(vS, 'M350,236 H336 V364 H350', { stroke: TE, 'stroke-width': 3 }), vVt = tx(vS, 306, 310, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 30 });
const vM = flow(vS, [[110, 318], [110, 450], [400, 450], [400, 150], [110, 150], [110, 282]], 28, { skip: (x, y) => Math.abs(x - 400) < 3 && y > 226 && y < 374 });
const vB = flow(vS, [[400, 450], [580, 450], [580, 150], [400, 150]], 2, { skip: (x, y) => Math.abs(x - 580) < 3 && y > 196 && y < 400 });
const vSt = [
  [K(`\\textcolor{${TE}}{V} = \\textcolor{${VI}}{I_g}\\,(G+R)`), 'at full scale', 352],
  [K(`R = \\dfrac{\\textcolor{${TE}}{V}}{\\textcolor{${VI}}{I_g}} - G`), 'the multiplier', 452]];
$('#vSteps').innerHTML = vSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const vRows = [...$('#vSteps').children];
const tV2 = wt('V2', 'We'), tV3 = T0('V3'), tVs = [wt('V4', 'So'), wt('V5', 'Rearrange')];

/* ================= W: worked example ================= */
const wS = $('#wS');
const wA = [W(wS, 'M90,190 H230'), W(wS, 'M230,190 H332'), W(wS, 'M404,190 H500'), W(wS, 'M230,190 V262 H300'), W(wS, zigH(300, 430, 262, 12, 5)), W(wS, 'M430,262 H500 V190'), W(wS, 'M500,190 H640')];
const wAg = mk(wS, 'circle', { cx: 368, cy: 190, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), wAgl = tx(wS, 368, 200, 'G', { 'text-anchor': 'middle', 'font-size': 28, 'font-style': 'italic' });
const wAj = [mk(wS, 'circle', { cx: 230, cy: 190, r: 6, fill: INK }), mk(wS, 'circle', { cx: 500, cy: 190, r: 6, fill: INK }), mk(wS, 'circle', { cx: 90, cy: 190, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(wS, 'circle', { cx: 640, cy: 190, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const wDiv = mk(wS, 'line', { x1: 32, y1: 330, x2: 752, y2: 330, stroke: C.line, 'stroke-width': 2 });
const wVv = [W(wS, 'M90,460 H190'), W(wS, zigH(190, 380, 460, 14, 7)), W(wS, 'M380,460 H450'), W(wS, 'M522,460 H640')];
const wVg = mk(wS, 'circle', { cx: 486, cy: 460, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), wVgl = tx(wS, 486, 470, 'G', { 'text-anchor': 'middle', 'font-size': 28, 'font-style': 'italic' });
const wVj = [mk(wS, 'circle', { cx: 90, cy: 460, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(wS, 'circle', { cx: 640, cy: 460, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const wL = $('#wL');
const wT1 = div(wL, 'left:32px;top:84px', '<span class="pillp ink" style="position:static">AMMETER · 0 TO 1 A</span>');
const wT2 = div(wL, 'left:32px;top:356px', '<span class="pillp ink" style="position:static">VOLTMETER · 0 TO 10 V</span>');
const wGv1 = div(wL, 'left:430px;top:94px;font:600 24px IBM Plex Mono;color:#16213E', 'G = 50 Ω');
const wSv = div(wL, 'left:300px;top:282px', `<span class="pillp ac" style="position:static">S ≈ 0.05 Ω</span>`);
const wGv2 = div(wL, 'left:430px;top:364px;font:600 24px IBM Plex Mono;color:#16213E', 'G = 50 Ω');
const wRv = div(wL, 'left:190px;top:496px', `<span class="pillp ac" style="position:static">R = 9950 Ω</span>`);
const wSt = [
  [K(`G = 50\\,\\Omega,\\;\\; \\textcolor{${VI}}{I_g} = 1\\times10^{-3}\\,\\text{A}`), 'given', 80],
  [K(`S = \\dfrac{(1\\times10^{-3})(50)}{1-0.001}`), 'I = 1 A', 156],
  [K(`S \\approx 0.05\\,\\Omega`), 'a tiny shunt', 279],
  [K(`R = \\dfrac{10}{1\\times10^{-3}} - 50`), 'V = 10 V', 366],
  [K(`R = 9950\\,\\Omega`), 'a big multiplier', 497]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const wRows = [...$('#wSteps').children];
const tWs = [wt('W1', 'G'), wt('W3', 'S'), wt('W4', 'That'), wt('W6', 'R'), wt('W7', 'That')];
const avW = PUC.avatar($('#sW'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Same coil. Tiny shunt or big multiplier.' });

/* ================= C: AC meters ================= */
const acS = $('#acS');
const srcC = mk(acS, 'circle', { cx: 150, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), srcW = W(acS, 'M122,300 C132,276 142,276 150,300 S168,324 178,300', { 'stroke-width': 4 });
const srcL = [tx(acS, 214, 292, 'AC in'), mono(acS, 214, 320, '230 V · 50 Hz')];
const met = mk(acS, 'circle', { cx: 760, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), metL = tx(acS, 760, 311, 'V', { 'text-anchor': 'middle', 'font-size': 32, 'font-style': 'italic' });
const metT = [tx(acS, 822, 296, 'Meter'), mono(acS, 822, 324, 'coil')];
const w1 = [W(acS, 'M150,254 V160 H760 V254'), W(acS, 'M150,346 V440 H760 V346')];
const w2 = [W(acS, 'M150,254 V160 H290 V250 H340'), W(acS, 'M150,346 V440 H290 V350 H340'), W(acS, 'M560,250 H640 V160 H760 V254'), W(acS, 'M560,350 H640 V440 H760 V346')];
const rBox = mk(acS, 'rect', { x: 340, y: 200, width: 220, height: 200, rx: 16, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const ND = { T: [450, 236], R: [520, 300], B: [450, 364], L: [380, 300] };
const dEdge = [W(acS, `M${ND.L} L${ND.T} L${ND.R} L${ND.B} Z`, { 'stroke-width': 3 })];
const dD = [diode(acS, ND.T, ND.R), diode(acS, ND.L, ND.B), diode(acS, ND.B, ND.R), diode(acS, ND.L, ND.T)]; // pair A: 0,1 (positive half) · pair B: 2,3
const rWi = [W(acS, `M340,250 H400 L${ND.T}`, { 'stroke-width': 2.5 }), W(acS, `M340,350 H400 L${ND.B}`, { 'stroke-width': 2.5 }), W(acS, `M${ND.R} H560`, { 'stroke-width': 2.5 }), W(acS, `M${ND.L} V350`, { 'stroke-width': 0 })];
const rLab = [mono(acS, 450, 428, 'RECTIFIER · 4 DIODES', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 17 }), tx(acS, 578, 240, '+', { 'font-size': 24 }), tx(acS, 580, 378, '-', { 'font-size': 26 })];
// the - output: from node L out to the bottom-right terminal, routed under the diamond
const rMinus = W(acS, `M${ND.L} L380,384 H540 V350 H560`, { 'stroke-width': 2.5 });
const fq = 0.5, OMG = 2 * Math.PI * fq;
const tC2 = T0('C2'), tC4 = T0('C4'), tRect = wt('C4', 'rectifier'), tC5 = wt('C5', 'Watch'), tC6 = T0('C6'), tC7 = T0('C7'), tAvg = wt('C6', 'average'), tRms = wt('C7', 'R');
const skipM = (x, y) => (Math.hypot(x - 150, y - 300) < 50) || (Math.hypot(x - 760, y - 300) < 50);
const e1 = flow(acS, [[150, 254], [150, 160], [760, 160], [760, 254], [760, 346], [760, 440], [150, 440], [150, 346]], 30, { skip: skipM });
const eIn = flow(acS, [[340, 250], [290, 250], [290, 160], [150, 160], [150, 254], [150, 346], [150, 440], [290, 440], [290, 350], [340, 350]], 14, { skip: skipM });
const eOut = flow(acS, [[560, 350], [640, 350], [640, 440], [760, 440], [760, 346], [760, 254], [760, 160], [640, 160], [640, 250], [560, 250]], 16, { skip: skipM });
const absInt = tau => { if (tau <= 0) return 0; const ph = OMG * tau, k = Math.floor(ph / Math.PI); return (2 * k + (1 - Math.cos(ph - k * Math.PI))) / OMG; };
const SCc = scope($('#scS'), 592, 200);
const trIn = SCc.tr(CH1), trOut = SCc.tr(AM);
const sLab1 = SCc.lab(14, 24, 'CH1 · V IN (AC)', CH1), sLab2 = SCc.lab(14, 196, 'CH2 · AFTER RECTIFIER', AM);
const avgL = mk($('#scS'), 'line', { x1: 6, y1: 175 - 70 * 0.637, x2: 586, y2: 175 - 70 * 0.637, stroke: AM, 'stroke-width': 2, 'stroke-dasharray': '8 8', opacity: 0.9 });
const avgBg = mk($('#scS'), 'rect', { x: 476, y: 175 - 70 * 0.637 - 26, width: 104, height: 24, rx: 5, fill: '#16213E' }), avgT = SCc.lab(486, 175 - 70 * 0.637 - 8, 'AVERAGE', AM);
const ndS = $('#ndS'), cDial = dial(ndS, 125, 168, 112, ['0', '100', '200', '300'], { lr: 34, fs: 16, minor: 15 });
const cU = mono(ndS, 125, 150, 'V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600 });
$('#cRo').innerHTML = `<span class="k" style="color:${TE}">V<sub>m</sub></span><span class="v" id="cP" style="color:${TE}">325</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>avg</sub></span><span class="v" id="cA" style="color:${TE}">207</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>rms</sub></span><span class="v" id="cR" style="color:${TE}">230</span><span class="u">V</span>`;
const cRk = [...$('#cRo').children];
const avC = PUC.avatar($('#sC'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the wall\'s 230 volts peaks near 325!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A shunt in series makes an ammeter', right: 'A shunt goes in parallel with the coil', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcA = [W(tcS, 'M40,150 H110'), W(tcS, 'M110,150 V104 H172'), W(tcS, 'M232,104 H300 V150'), W(tcS, 'M110,150 V200 H150'), W(tcS, zigH(150, 260, 200, 11, 4)), W(tcS, 'M260,200 H300 V150'), W(tcS, 'M300,150 H370')];
const tcAg = mk(tcS, 'circle', { cx: 202, cy: 104, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 3.5 });
const tcV = [W(tcS, 'M420,150 H470'), W(tcS, zigH(470, 580, 150, 12, 5)), W(tcS, 'M580,150 H612'), W(tcS, 'M668,150 H750')];
const tcVg = mk(tcS, 'circle', { cx: 640, cy: 150, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 3.5 });
const tcL = [tx(tcS, 202, 113, 'G', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 24 }), tx(tcS, 640, 159, 'G', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 24 }),
  tx(tcS, 205, 252, 'Ammeter', { 'text-anchor': 'middle' }), mono(tcS, 205, 278, 'shunt S in parallel', { 'text-anchor': 'middle', 'font-size': 18 }),
  tx(tcS, 585, 252, 'Voltmeter', { 'text-anchor': 'middle' }), mono(tcS, 585, 278, 'multiplier R in series', { 'text-anchor': 'middle', 'font-size': 18 }),
  tx(tcS, 205, 240 - 6, '', {}), tx(tcS, 524, 128, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 22 }), tx(tcS, 205, 232, '', {})];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Short answers and numericals: find the shunt or the series resistance' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A galvanometer of resistance 40&nbsp;Ω gives full-scale deflection at 2&nbsp;mA. What should be connected to make a voltmeter of range 0 to 5&nbsp;V?', qW: 780,
  opts: [`${K('2540\\,\\Omega')}&nbsp;in series`, `${K('2460\\,\\Omega')}&nbsp;in series`, `${K('2460\\,\\Omega')}&nbsp;in parallel`, `${K('2500\\,\\Omega')}&nbsp;in series`], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [['Multiplier <b>in series</b>'], [K(`G + R = \\dfrac{\\textcolor{${TE}}{V}}{\\textcolor{${VI}}{I_g}} = \\dfrac{5}{2\\times10^{-3}}`)],
  [K(`G + R = 2500\\,\\Omega`)], [K(`R = 2500 - 40 = 2460\\,\\Omega`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'A'), wt('A3', 'The'), wt('A3', 'two', 1), wt('A4', 'Take')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 500, y0: 88, dy: 118, title: 'Voltmeters and ammeters · formula card', txt: [0, 0, 1, 1],
  lines: [K(`S = \\dfrac{\\textcolor{${VI}}{I_g}\\,G}{\\textcolor{${VI}}{I}-\\textcolor{${VI}}{I_g}} \\qquad R = \\dfrac{\\textcolor{${TE}}{V}}{\\textcolor{${VI}}{I_g}} - G`),
    K(`\\textcolor{${TE}}{V_{rms}} = 0.707\\,\\textcolor{${TE}}{V_m} \\qquad \\textcolor{${TE}}{V_{avg}} = 0.637\\,\\textcolor{${TE}}{V_m}`),
    'Ammeter: in series, very low resistance · Voltmeter: across, very high',
    'Rectifier AC meters show the RMS value of a sine wave · form factor 1.11'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 19', topic: 'Ohmmeters', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tB3, 1.12, 620, 470], [tUp + 1.8, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tG + 0.5, tC - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tG + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tG - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.draw(hmBox, t, tMorph + 0.6, 0.6); M.vis(hmWin, t, tMorph + 0.9, 1e9, { dy: 0, fade: 0.25 });
    drawSeq(hDial.parts, t, tMorph + 1.0, 0.2, 0.02); fadeAt(hDial.lt, t, tMorph + 1.2); M.vis(hDial.nd, t, tMorph + 1.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(hDial.pv, t, tMorph + 1.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(hmU, t, tMorph + 1.3, 1e9, { dy: 0, fade: 0.2 }); fadeAt(hmT, t, tMorph + 1.3);
    const u = M.spring(t - tSwing, M.SOFT); hDial.set(t < tSwing ? 0 : u);
    M.vis($('#aPill'), t, tMorph + 0.9, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, tSwing - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#thN'), t, tFull - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#thL'), t, tFull + 0.2, 1e9, { dy: 10 });
    PUC.attr(thFill, 'width', (300 * M.clamp(t < tSwing ? 0 : u)).toFixed(1));
    M.vis($('#nwC'), t, T0('H2') - 0.1, out, { dy: 36, ...o });
    M.vis($('#q1'), t, wt('H2', 'ten') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.vis($('#q2'), t, wt('H2', 'two') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* G: mechanism */
  const gOn = t >= tG - 0.05 && t < tB + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tB - 0.32;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    const tMag = wt('G2', 'magnet') - 0.3;
    drawSeq(poles, t, tMag, 0.5, 0.1); fadeAt([pN, pS2], t, tMag + 0.4); fld.forEach((f, i) => M.draw(f, t, tMag + 0.5 + i * 0.05, 0.4));
    M.vis(core, t, wt('G2', 'coil') - 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(coilG, t, wt('G2', 'coil') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(piv, t, wt('G2', 'coil'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq(gScale.parts, t, tG + 0.6, 0.18, 0.015); fadeAt(gScale.lt, t, tG + 0.9);
    const u = defl(t), ang = -50 + 100 * u, on = Ig(t) > 0;
    PUC.attr(coilR, 'transform', `rotate(${ang.toFixed(2)} ${GC[0]} ${GC[1]})`);
    M.hide(dotL, !on); M.hide(crR, !on); M.vis(spring, t, wt('G4', 'spring') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const ar = ang * Math.PI / 180, ca = Math.cos(ar), sa = Math.sin(ar), Lf = on ? 40 + 50 * Ig(t) : 0;
    const pL = [GC[0] - 104 * ca, GC[1] - 104 * sa], pR = [GC[0] + 104 * ca, GC[1] + 104 * sa], tg = [sa, -ca];
    fA[0].set(pL[0] + tg[0] * 22, pL[1] + tg[1] * 22, pL[0] + tg[0] * (22 + Lf), pL[1] + tg[1] * (22 + Lf));
    fA[1].set(pR[0] - tg[0] * 22, pR[1] - tg[1] * 22, pR[0] - tg[0] * (22 + Lf), pR[1] - tg[1] * (22 + Lf));
    if (!on) { M.hide(fA[0].g, true); M.hide(fA[1].g, true); }
    [[fL[0], pL, 1], [fL[1], pR, -1]].forEach(([e, p, s]) => { PUC.attr(e, 'x', (p[0] + s * tg[0] * (34 + Lf) - 8 + (s > 0 ? -22 : 14)).toFixed(1)); PUC.attr(e, 'y', (p[1] + s * tg[1] * (34 + Lf) + 8).toFixed(1)); M.hide(e, !on); });
    fadeAt(gLeg, t, wt('G4', 'needle'), 0.1); M.vis(gLeg2, t, tG3 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#gRo'), t, tG + 0.6, 1e9, { dy: 16 });
    M.setT($('#gI'), Ig(t).toFixed(2)); M.setT($('#gT'), Math.round(100 * u).toString());
    M.vis(gg.axes, t, tG + 0.7, 1e9, { dy: 0, fade: 0.3 });
    [gg.xlab, gg.ylab].forEach(e => M.vis(e, t, tG + 0.8, 1e9, { dy: 0, fade: 0.3 }));
    $('#gGr').querySelectorAll('text, line').forEach(e => { if (e !== gg.xlab && e !== gg.ylab) M.vis(e, t, tG + 0.8, 1e9, { dy: 0, fade: 0.3 }); });
    const ii = Ig(t) > 0 ? M.lerp(0, Ig(t), 1) : 0; gLine(s => [s, 100 * s], 0, Math.min(ii, u)); gDot(Math.min(ii, u), 100 * u, t >= tG3);
    M.vis($('#tG'), t, wt('G6', 'G') - 0.1, out, { dy: 20 }); M.vis($('#tI'), t, wt('G6', 'I') - 0.1, out, { dy: 20 });
    const hi = M.io((t - tG6) / 0.3); $('#tI').style.background = M.mix(C.soft, C.ac2, hi);
    avG(t, wt('G5', 'deflection') - 0.2, T0('G6') - 0.1);
  }

  /* B: breadboard ammeter */
  const bOn = t >= tB - 0.05 && t < tD + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dl'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tB3 - 0.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([bW[0], bW[6], bW[7], bW[8]], t, tB + 0.3, 0.4, 0.15); drawSeq(bBat, t, tB + 0.4, 0.25, 0.1);
    M.draw(bW[1], t, tB + 0.6, 0.2); M.draw(bW[2], t, tB + 0.7, 0.2); M.vis(bG, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(bGl, t, tB + 0.7, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(bLab.slice(0, 6), t, tB + 0.8, 0.06);
    drawSeq([bW[3], bW[4], bW[5]], t, wt('B2', 'tiny') - 0.1, 0.3, 0.15); fadeAt(bJ, t, wt('B2', 'parallel') - 0.1); fadeAt(bLab.slice(6, 8), t, wt('B2', 'shunt') - 0.2);
    M.draw(bBox, t, wt('B2', 'shunt'), 0.6); M.vis(bLab[8], t, wt('B2', 'shunt') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const run = t >= tB3 - 0.3, off = VPX * integ(Ib, tB3 - 0.3, t);
    bM1.set(off, run); bM2.set(off, run); bSh.set(off, run); bCo.set(off * 0.25, run);
    drawSeq(bDial.parts, t, tB + 0.6, 0.15, 0.02); fadeAt(bDial.lt, t, tB + 0.8, 0.04); fadeAt([bDial.nd, bDial.pv, dlU], t, tB + 0.9);
    const I = Ib(t); bDial.set(I);
    M.vis($('#dlT'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#bRo'), t, tB + 0.9, 1e9, { dy: 12 });
    M.setT($('#bI'), I.toFixed(3)); M.setT($('#bS'), (I * 0.999).toFixed(3)); M.setT($('#bGv'), (I * 1.0).toFixed(2));
    avB(t, wt('B5', 'An') - 0.1, out);
  }

  /* D: shunt derivation */
  const dOn = t >= tD - 0.05 && t < tV + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tV - 0.32;
    M.vis($('#pL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(pW, t, tD + 0.4, 0.3, 0.1); M.vis(pG, t, tD + 0.6, 1e9, { dy: 0, fade: 0.2 }); fadeAt([pGl, pSl, ...pJ], t, tD + 0.8, 0.06);
    const ia = M.io((t - tD - 1.0) / 0.4); pIa.set(100, 268, 100 + 90 * ia, 268); M.vis(pIt, t, tD + 1.1, 1e9, { dy: 0, fade: 0.2 }); if (ia <= 0) M.hide(pIa.g, true);
    const ig = M.io((t - tP[1] + 0.1) / 0.4); pIg.set(270, 154, 270 + 60 * ig, 154); M.vis(pIgt, t, tP[1], 1e9, { dy: 0, fade: 0.2 }); if (ig <= 0) M.hide(pIg.g, true);
    const is = M.io((t - tP[2] + 0.2) / 0.4); pIs.set(470, 448, 470 + 60 * is, 448); M.vis(pIst, t, tP[2] - 0.1, 1e9, { dy: 0, fade: 0.2 }); if (is <= 0) M.hide(pIs.g, true);
    M.draw(pVb, t, tP[0], 0.5); M.vis(pVt, t, tP[0] + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(pVg, t, tP[1] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const eo = 90 * Math.max(0, t - tD - 1.0); pE.forEach((f, k) => f.set(eo * (k === 3 ? 0.25 : 1) + k * 17, t >= tD + 1.0));
    pRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tP[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tP[i], 0.6); M.vis(r.querySelector('.why'), t, tP[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tP[i] - 0.15); });
    M.vis($('#pBox'), t, wt('D5', 'divided') + 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#pUnit'), t, T0('D6'), 1e9, { dy: 12 });
  }

  /* V: voltmeter */
  const vOn = t >= tV - 0.05 && t < tW + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = tW - 0.32;
    M.vis($('#vL'), t, tV + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#vR'), t, tV + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(vW, t, tV + 0.3, 0.35, 0.12); drawSeq(vBat, t, tV + 0.4, 0.25, 0.1); fadeAt(vLab.slice(0, 4), t, tV + 0.6, 0.06);
    drawSeq(vMw.slice(0, 3), t, tV2 - 0.1, 0.3, 0.12); M.vis(vG, t, tV2 + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(vGl, t, tV2 + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(vMw[3], t, tV2 + 0.3, 0.3);
    fadeAt(vJ, t, tV2 + 0.4); fadeAt(vLab.slice(4, 6), t, wt('V2', 'multiplier') - 0.2); M.draw(vBox, t, wt('V2', 'multiplier'), 0.6); M.vis(vLab[6], t, tV3, 1e9, { dy: 0, fade: 0.2 });
    M.draw(vVb, t, wt('V3', 'across') - 0.1, 0.4); M.vis(vVt, t, wt('V3', 'across'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#vE'), t, tV + 0.8, 1e9, { dy: 0, fade: 0.2 });
    vM.set(110 * Math.max(0, t - tV - 0.8), t >= tV + 0.8); vB.set(12 * Math.max(0, t - tV2 - 0.6), t >= tV2 + 0.6);
    M.vis($('#cA'), t, tV + 0.5, 1e9, { dy: 20 }); M.vis($('#cV'), t, tV3 - 0.1, 1e9, { dy: 20 });
    const lv = M.io((t - tV3) / 0.3); $('#cV').style.background = M.mix(C.soft, C.ac2, lv);
    M.vis($('#vRL'), t, tVs[0] - 0.3, 1e9, { dy: 10 });
    vRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tVs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tVs[i], 0.6); M.vis(r.querySelector('.why'), t, tVs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tVs[i] - 0.15); });
    M.vis($('#vBox'), t, wt('V5', 'minus') + 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tC + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tC - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tA = T0('W2'), tVv = T0('W5');
    M.vis(wT1, t, tA - 0.1, 1e9, { dy: 12 }); drawSeq(wA, t, tA, 0.25, 0.08); M.vis(wAg, t, tA + 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt([wAgl, ...wAj, wGv1], t, tA + 0.3, 0.04);
    M.vis(wSv, t, tWs[2] + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(wDiv, t, tVv - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wT2, t, tVv - 0.1, 1e9, { dy: 12 }); drawSeq(wVv, t, tVv, 0.25, 0.08); M.vis(wVg, t, tVv + 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt([wVgl, ...wVj, wGv2], t, tVv + 0.3, 0.04);
    M.vis(wRv, t, tWs[4] + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    wRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wB1'), t, tWs[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#wB2'), t, tWs[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, wt('W7', 'multiplier') + 0.2, out);
  }

  /* C: AC meters */
  const cOn = t >= tC - 0.05 && t < tT + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#acK'), t, tC + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tC + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb2'), t, tC + 0.45, 1e9, { dy: 36 });
    M.vis(srcC, t, tC + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(srcW, t, tC + 0.4, 0.4); fadeAt(srcL, t, tC + 0.5);
    M.vis(met, t, tC + 0.5, 1e9, { dy: 0, fade: 0.2 }); fadeAt([metL, ...metT], t, tC + 0.6);
    const ph2 = t >= tRect - 0.3, x1 = 1 - M.io((t - tRect + 0.3) / 0.3);
    M.vis($('#acL1'), t, tC + 0.3, tRect - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#acL2'), t, tRect, 1e9, { dy: 10 });
    w1.forEach((w, i) => { M.draw(w, t, tC + 0.5 + i * 0.15, 0.5); if (ph2) w.style.opacity = x1.toFixed(3); else w.style.opacity = ''; if (x1 <= 0) M.hide(w, true); });
    drawSeq(w2, t, tRect, 0.4, 0.1); M.vis(rBox, t, tRect - 0.1, 1e9, { dy: 0, sc: 0.9, fade: 0.2 });
    drawSeq([...dEdge, ...rWi.slice(0, 3), rMinus], t, tRect + 0.2, 0.3, 0.06);
    dD.forEach((d, i) => fadeAt([d.tri, d.bar], t, wt('C4', 'Four') - 0.1 + i * 0.1));
    fadeAt(rLab, t, wt('C4', 'Four'), 0.08);
    const tau = t - T0('C2'), s = Math.sin(OMG * Math.max(0, tau));
    // which diode pair conducts (flat fill change, never a glow)
    dD.forEach((d, i) => { const onP = ph2 && t > tRect + 0.6 && ((i < 2) ? s > 0.05 : s < -0.05); PUC.attr(d.tri, 'fill', onP ? AM : '#fff'); });
    // electrons: phase 1 sloshes back and forth; phase 2 the meter side moves one way only
    e1.set(70 * (1 - Math.cos(OMG * Math.max(0, tau))) / OMG * OMG, t >= T0('C2') - 0.1 && t < tRect - 0.3);
    eIn.set(70 * (1 - Math.cos(OMG * Math.max(0, tau))), t >= tRect + 0.5);
    eOut.set(70 * OMG * absInt(Math.max(0, tau)), t >= tRect + 0.5);
    M.vis($('#acE'), t, T0('C2'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#slowT'), t, T0('C2'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    // scope
    const tS0 = T0('C2') - 0.2;
    trIn(τ => 40 * Math.sin(OMG * (τ - T0('C2'))), t, tS0, 6, 62, t >= tS0);
    trOut(τ => 70 * Math.abs(Math.sin(OMG * (τ - T0('C2')))), t, tRect + 0.3, 6, 175, t >= tRect + 0.3);
    M.vis(sLab1, t, tS0, 1e9, { dy: 0, fade: 0.2 }); M.vis(sLab2, t, tRect + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.draw(avgL, t, tAvg, 0.5); M.vis(avgT, t, tAvg + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(avgBg, t, tAvg + 0.3, 1e9, { dy: 0, fade: 0.2 });
    // meter needle: shivers near zero on raw AC, settles on the RMS mark with the rectifier
    drawSeq(cDial.parts, t, tC + 0.6, 0.12, 0.015); fadeAt([...cDial.lt, cDial.nd, cDial.pv, cU], t, tC + 0.8, 0.03);
    const jit = t < tRect ? 0.025 * Math.sin(2 * Math.PI * 7 * t) * M.clamp((t - T0('C3')) / 0.3) : 0;
    const set2 = t >= tRect + 0.6 ? (230 / 300) * M.spring(t - tRect - 0.6, M.SOFT) : 0;
    cDial.set(jit + set2);
    M.vis($('#cRo'), t, tC5, 1e9, { dy: 12 });
    [[0, 1, 2, tC5 + 0.3], [3, 4, 5, tAvg], [6, 7, 8, tRms]].forEach(([a, b, c, tt]) => [cRk[a], cRk[b], cRk[c]].forEach(e => M.vis(e, t, tt, 1e9, { dy: 0, fade: 0.2 })));
    const hr = M.io((t - tRms) / 0.3); $('#cR').style.color = M.mix(TE, '#0A6B6B', hr);
    avC(t, wt('C8', 'peak') - 0.2, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tX; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tX - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'A', 1) - 0.05, { out: tX - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not'), tRight: wt('X3', 'shunt') - 0.1 });
    drawSeq(tcA, t, wt('X3', 'shunt') - 0.2, 0.25, 0.08); M.vis(tcAg, t, wt('X3', 'shunt'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq(tcV, t, wt('X3', 'multiplier') - 0.2, 0.25, 0.08); M.vis(tcVg, t, wt('X3', 'multiplier'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(tcL[0], t, wt('X3', 'shunt'), 1e9, { dy: 0, fade: 0.2 }); fadeAt(tcL.slice(2, 4), t, wt('X3', 'parallel') - 0.1);
    fadeAt([tcL[1], tcL[7]], t, wt('X3', 'multiplier')); fadeAt(tcL.slice(4, 6), t, wt('X3', 'voltmeter') - 0.2);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'as') - 0.1 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns });
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
