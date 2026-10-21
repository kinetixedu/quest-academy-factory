// PUC Electronics Ep 12 - Network theorems and Thevenin's theorem ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V and E teal, charge Q orange, t and R ink
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
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const kI = s => tc(VI, s), kE = s => tc(TE, s);
// resistor zigzags (IEC-style as the style frame): vertical at x from y1 to y2, horizontal at y from x1 to x2
const zigV = (x, y1, y2, w = 18, n = 6) => { let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -w : w)},${(y1 + (y2 - y1) * (i + 0.5) / n).toFixed(1)}`; return d + ` L${x},${y2}`; };
const zigH = (y, x1, x2, w = 18, n = 6) => { let d = `M${x1},${y}`; for (let i = 0; i < n; i++) d += ` L${(x1 + (x2 - x1) * (i + 0.5) / n).toFixed(1)},${y + (i % 2 ? -w : w)}`; return d + ` L${x2},${y}`; };
const node = (p, x, y) => mk(p, 'circle', { cx: x, cy: y, r: 8, fill: INK });

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  if (!n) n = Math.max(2, Math.round(L / 44));
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
    tr(col, sw = 4) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    path(col, sw = 4) { return mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
/* piecewise eased keyframes [[t, v], ...] */
const keys = (K) => t => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const [a, va] = K[i - 1], [b, vb] = K[i]; return va + (vb - va) * M.io((t - a) / (b - a)); } return K[K.length - 1][1]; };
/* integral of f from a to t (for electron offsets when the current changes) */
const integ = (f, a, t, n = 80) => { if (t <= a) return 0; const h = (t - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h; };


/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'circuit') - 0.2;
const tN = T0('N1'), tV = T0('V1'), tP = T0('P1'), tB = T0('B1'), tM = T0('M1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const cellV = (p, x, y, a = {}) => [W(p, `M${x - 35},${y} H${x + 35}`, { 'stroke-width': 5, ...a }), W(p, `M${x - 18},${y + 36} H${x + 18}`, { 'stroke-width': 9, ...a })]; // long plate (+) on top
const term = (p, x, y) => mk(p, 'circle', { cx: x, cy: y, r: 11, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const par = (a, b) => a * b / (a + b);
const lab = (p, x, y, s, a = {}) => mono(p, x, y, s, { fill: INK, 'font-weight': 600, ...a });
/* a battery + R1 (top, horizontal) + R2 (down, vertical) divider with terminals A, B on the right: returns parts */
const divider = (p, o) => {
  const { x0, x1, x2, yT, yB, r1a, r1b } = o, ym = (yT + yB) / 2;
  const P = {};
  P.w = [W(p, `M${x0},${ym - 18} V${yT} H${r1a}`), W(p, `M${r1b},${yT} H${x2}`), W(p, `M${x1},${yT} V${ym - 60}`), W(p, `M${x1},${ym + 60} V${yB}`), W(p, `M${x2},${yB} H${x0} V${ym + 18}`)];
  P.bat = cellV(p, x0, ym - 18);
  P.r1 = W(p, zigH(yT, r1a, r1b)); P.r2 = W(p, zigV(x1, ym - 60, ym + 60));
  P.n = [node(p, x1, yT), node(p, x1, yB)];
  P.t = [term(p, x2, yT), term(p, x2, yB)];
  P.tl = [tx(p, x2 + 22, yT + 9, 'A', { 'font-size': 28, 'font-weight': 700 }), tx(p, x2 + 22, yB + 9, 'B', { 'font-size': 28, 'font-weight': 700 })];
  return P;
};

/* ================= A: hook ================= */
const hS = $('#hS');
const HD = divider(hS, { x0: 90, x1: 380, x2: 560, yT: 110, yB: 370, r1a: 180, r1b: 300 });
const hRL = W(hS, zigV(660, 180, 300), { stroke: AM }), hRLw = [W(hS, 'M571,110 H660 V180', { stroke: AM }), W(hS, 'M571,370 H660 V300', { stroke: AM })];
const hQm = tx(hS, 690, 250, '?', { fill: '#B7791F', 'font-size': 40, 'font-weight': 700 });
const hLab = [lab(hS, 240, 76, '6 Ω', { 'text-anchor': 'middle' }), lab(hS, 406, 248, '3 Ω'), lab(hS, 44, 248, '12 V', { fill: TE, 'text-anchor': 'end' })];
const LDS = ['1 Ω', '2 Ω', '3 Ω', '6 Ω', '10 Ω'];
$('#hLd').innerHTML = LDS.map((s, i) => `<div class="ld" style="left:${36 + i * 144}px">${s}</div>`).join('');
const hLd = [...$('#hLd').children];
const tLd = wt('H1', 'five');

/* ================= N: theorems ================= */
const TH = [['Superposition', 'each source alone, then add the effects'], ["Thevenin's theorem", 'one voltage source, one series resistor'], ["Norton's theorem", 'one current source, one parallel resistor'], ['Maximum power', 'which load gets the most power']];
$('#nTiles').innerHTML = TH.map(([n, e], i) => `<div class="card sT" style="left:${160 + i * 408}px"><svg width="376" height="200"></svg><div class="nm">${n}</div><div class="ex">${e}</div></div>`).join('');
const nT = [...$('#nTiles').children], nSv = nT.map(e => e.querySelector('svg'));
const csym = (p, cx, cy, r = 30) => [mk(p, 'circle', { cx, cy, r, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(p, `M${cx},${cy + r - 10} V${cy - r + 10} M${cx - 9},${cy - r + 20} L${cx},${cy - r + 10} L${cx + 9},${cy - r + 20}`, { 'stroke-width': 3 })];
const nG = [
  [W(nSv[0], 'M60,110 H100'), ...cellV(nSv[0], 120, 92).map(e => (e.setAttribute('transform', 'rotate(90 120 110)'), e)), W(nSv[0], 'M140,110 H160'), tx(nSv[0], 178, 122, '+', { 'font-size': 40 }), W(nSv[0], 'M220,110 H240'), ...cellV(nSv[0], 260, 92).map(e => (e.setAttribute('transform', 'rotate(90 260 110)'), e)), W(nSv[0], 'M280,110 H316')],
  [...cellV(nSv[1], 90, 92).map(e => (e.setAttribute('transform', 'rotate(90 90 110)'), e)), W(nSv[1], 'M110,110 H150'), W(nSv[1], zigH(110, 150, 250)), W(nSv[1], 'M250,110 H300'), term(nSv[1], 312, 110), W(nSv[1], 'M40,110 H72')],
  [...csym(nSv[2], 110, 110), W(nSv[2], 'M110,80 V50 H230 V70'), W(nSv[2], zigV(230, 70, 150, 14)), W(nSv[2], 'M110,140 V170 H230 V150'), W(nSv[2], 'M230,50 H300 M230,170 H300'), term(nSv[2], 310, 50), term(nSv[2], 310, 170)],
  [W(nSv[3], 'M80,170 V40 M80,170 H310', { 'stroke-width': 3 }), W(nSv[3], 'M84,166 C120,40 160,50 200,90 S280,150 306,156', { stroke: AM }), W(nSv[3], 'M150,170 V58', { 'stroke-width': 2, 'stroke-dasharray': '6 6' })]];
const tTh = [wt('N2', 'Superposition'), wt('N5', 'Thevenin'), wt('N3', 'Norton'), wt('N4', 'Maximum')];

/* ================= V: who + statement ================= */
const vS = $('#vS');
const vBlob = W(vS, 'M60,140 H330 V430 H60 Z', { fill: C.soft, stroke: '#AEB4C2', 'stroke-dasharray': '10 10', 'stroke-width': 3 });
const vIn = [W(vS, 'M120,282 V200 H150'), W(vS, zigH(200, 150, 250, 12, 5)), W(vS, 'M250,200 H330'), W(vS, 'M290,200 V230'), W(vS, zigV(290, 230, 330, 12, 5)), W(vS, 'M290,330 V400'), W(vS, 'M120,318 V400 H160'), W(vS, zigH(400, 160, 240, 12, 5)), W(vS, 'M240,400 H330'), ...cellV(vS, 120, 282)];
const vInT = [W(vS, 'M330,200 H358'), W(vS, 'M330,400 H358'), term(vS, 370, 200), term(vS, 370, 400)];
const vInL = mono(vS, 195, 470, 'ANY LINEAR CIRCUIT', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 });
const vArr = PUC.arrow(vS, AM, 6, 18);
const vEq = [W(vS, 'M500,300 V240 H570'), W(vS, zigH(240, 570, 670)), W(vS, 'M670,240 H700'), W(vS, 'M500,336 V400 H700'), ...cellV(vS, 500, 300), term(vS, 712, 240), term(vS, 712, 400)];
const vEqL = [lab(vS, 440, 300, 'V', { fill: TE, 'text-anchor': 'end', 'font-size': 26 }), lab(vS, 620, 206, 'R', { 'text-anchor': 'middle', 'font-size': 26 })];
vEqL[0].innerHTML = 'V<tspan font-size="16" dy="6">TH</tspan>'; vEqL[1].innerHTML = 'R<tspan font-size="16" dy="6">TH</tspan>';
const vAB = [tx(vS, 370, 178, 'A', { 'font-size': 24, 'font-weight': 700, 'text-anchor': 'middle' }), tx(vS, 370, 446, 'B', { 'font-size': 24, 'font-weight': 700, 'text-anchor': 'middle' }), tx(vS, 712, 218, 'A', { 'font-size': 24, 'font-weight': 700, 'text-anchor': 'middle' }), tx(vS, 712, 446, 'B', { 'font-size': 24, 'font-weight': 700, 'text-anchor': 'middle' })];
const vEqT = mono(vS, 600, 470, 'THEVENIN EQUIVALENT', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 });

/* ================= P: four steps ================= */
const pS = $('#pS');
const PD = divider(pS, { x0: 110, x1: 420, x2: 600, yT: 130, yB: 430, r1a: 200, r1b: 330 });
const pLoad = [W(pS, 'M611,130 H690 V220'), W(pS, zigV(690, 220, 340)), W(pS, 'M690,340 V430 H611')];
const pLab = [lab(pS, 265, 96, '6 Ω', { 'text-anchor': 'middle' }), lab(pS, 446, 288, '3 Ω'), lab(pS, 64, 270, '12 V', { fill: TE, 'text-anchor': 'end' }), lab(pS, 716, 288, 'R', { 'font-style': 'italic' })];
const pVm = [mk(pS, 'circle', { cx: 690, cy: 280, r: 38, fill: '#fff', stroke: TE, 'stroke-width': 4 }), tx(pS, 690, 290, 'V', { 'text-anchor': 'middle', fill: TE, 'font-size': 28, 'font-weight': 700 }), W(pS, 'M611,130 H690 V242', { stroke: TE, 'stroke-width': 3 }), W(pS, 'M690,318 V430 H611', { stroke: TE, 'stroke-width': 3 })];
const pVr = lab(pS, 740, 290, '4 V', { fill: TE, 'font-size': 26 });
const pShort = W(pS, `M110,${280 - 60} V${280 + 40}`, { stroke: AM, 'stroke-width': 6 });
const pEye = [PUC.arrow(pS, AM, 5, 16), mono(pS, 690, 500, 'look in from A, B', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 })];
const pPar = mono(pS, 420, 520, '6 Ω ∥ 3 Ω = 2 Ω', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 });
const gEq = mk(pS, 'g');
const pEq = [W(gEq, 'M200,262 V130 H300'), W(gEq, zigH(130, 300, 420)), W(gEq, 'M420,130 H600 V220'), W(gEq, zigV(600, 220, 340), { stroke: AM }), W(gEq, 'M600,340 V430 H200 V298'), ...cellV(gEq, 200, 262)];
const pEqL = [lab(gEq, 150, 288, '4 V', { fill: TE, 'text-anchor': 'end' }), lab(gEq, 360, 96, '2 Ω', { 'text-anchor': 'middle' }), lab(gEq, 628, 288, 'R', { 'font-style': 'italic', fill: '#B7791F' }), mono(gEq, 160, 316, 'V TH', { 'text-anchor': 'end', 'font-size': 16 }), mono(gEq, 360, 172, 'R TH', { 'text-anchor': 'middle', 'font-size': 16 })];
const pIA = PUC.arrow(gEq, VI), pIL = tx(gEq, 500, 112, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const pSt = [
  ['<span class="sx t">Remove the load, mark A and B</span>', '', 84],
  [K(`${kE('V_{TH}')} = 12 \\times \\dfrac{3}{6 + 3} = 4\\,\\text{V}`), '', 170],
  [K(`R_{TH} = \\dfrac{6 \\times 3}{6 + 3} = 2\\,\\Omega`), 'battery shorted', 290],
  [K(`${kI('I_L')} = \\dfrac{${kE('V_{TH}')}}{R_{TH} + R_L}`), '', 410]];
$('#pSteps').innerHTML = pSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const pRw = [...$('#pSteps').children];
$('#pBox').style.top = '402px'; $('#pBox').style.height = '116px';
const tPs = [wt('P2', 'Step'), wt('P3', 'Step'), wt('P4', 'Step'), wt('P5', 'Step')];
const tPr = [wt('P2', 'Take'), wt('P3', 'voltage'), wt('P4', 'Replace'), wt('P5', 'Draw')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const ckSub = [mono(ck, 250, 92, 'REAL CIRCUIT', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }), mono(ck, 710, 92, 'THEVENIN COPY', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 })];
const ckDiv = W(ck, 'M482,120 V500', { stroke: '#D9DCE3', 'stroke-dasharray': '8 10', 'stroke-width': 3 });
// real: battery x=70, R1 top 130-250, node x=330, R2 down, load x=430
const bR = [W(ck, 'M70,262 V150 H130'), W(ck, zigH(150, 130, 250)), W(ck, 'M250,150 H390 V235'), W(ck, 'M300,150 V235'), W(ck, zigV(300, 235, 355)), W(ck, 'M300,355 V440'), W(ck, zigV(390, 235, 355), { stroke: AM }), W(ck, 'M390,355 V440 H70 V298'), ...cellV(ck, 70, 262)];
const bRn = [node(ck, 300, 150), node(ck, 300, 440)];
// copy: battery x=540, RTH top 600-720, load x=860
const bC = [W(ck, 'M540,262 V150 H600'), W(ck, zigH(150, 600, 720)), W(ck, 'M720,150 H860 V235'), W(ck, zigV(860, 235, 355), { stroke: AM }), W(ck, 'M860,355 V440 H540 V298'), ...cellV(ck, 540, 262)];
const bLab = [lab(ck, 190, 118, '6 Ω', { 'text-anchor': 'middle' }), lab(ck, 324, 300, '3 Ω'), lab(ck, 96, 300, '12 V', { fill: TE, 'font-size': 18 }),
  lab(ck, 660, 118, '2 Ω', { 'text-anchor': 'middle' }), lab(ck, 566, 300, '4 V', { fill: TE, 'font-size': 18 })];
const bRL = [lab(ck, 414, 300, '2 Ω', { fill: '#B7791F', 'font-size': 18 }), lab(ck, 884, 300, '2 Ω', { fill: '#B7791F', 'font-size': 18 })];
const bKn = [PUC.arrow(ck, INK, 3, 12), PUC.arrow(ck, INK, 3, 12)];
const tB2 = wt('B2', 'Connect'), tKn = wt('B3', 'turn');
const RLf = keys([[tKn, 2], [tKn + 2.4, 6], [tKn + 4.8, 1], [tKn + 7.2, 3]]);
const loadOn = t => t >= tB2;
const IL = t => loadOn(t) ? 4 / (2 + RLf(t)) : 0;
const Vab = t => loadOn(t) ? 4 * RLf(t) / (2 + RLf(t)) : 4;
const I2r = t => Vab(t) / 3, Itr = t => I2r(t) + IL(t);
const skR = (x, y) => (Math.abs(y - 150) < 3 && x > 126 && x < 254) || (Math.abs(y - 150) < 3 && x > 596 && x < 724) || ((Math.abs(x - 300) < 3 || Math.abs(x - 390) < 3 || Math.abs(x - 860) < 3) && y > 229 && y < 361);
const eRt1 = flow(ck, [[70, 298], [70, 440], [300, 440]], 0, { skip: skR }), eR2 = flow(ck, [[300, 440], [300, 150]], 0, { skip: skR }),
  eRL = flow(ck, [[300, 440], [390, 440], [390, 150], [300, 150]], 0, { skip: skR }), eRt2 = flow(ck, [[300, 150], [70, 150], [70, 262]], 0, { skip: skR });
const eC = flow(ck, [[540, 298], [540, 440], [860, 440], [860, 150], [540, 150], [540, 262]], 0, { skip: skR });
const SC = scope($('#scS'), 592, 200);
const trA = SC.tr(CH1, 10), trB = SC.tr(AM, 4);
const sLab = [SC.lab(14, 26, 'CH1 · LOAD V, REAL', CH1), SC.lab(578, 26, 'CH2 · LOAD V, COPY', AM, { 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k n">LOAD R<sub>L</sub></span><span class="v" id="rR">2.0</span><span class="u">Ω</span>
  <span class="k n" style="color:${VI}">I<sub>L</sub> REAL</span><span class="v" id="rA" style="color:${VI}">-</span><span class="u">A</span>
  <span class="k n" style="color:${VI}">I<sub>L</sub> COPY</span><span class="v" id="rB" style="color:${VI}">-</span><span class="u">A</span>`;

/* ================= M: maximum power ================= */
const mS = $('#mS');
const G = PUC.graph(mS, { x: 110, y: 90, w: 600, h: 340, xmax: 10, ymin: 0, ymax: 2.4, xt: [0, 2, 4, 6, 8], yt: [0, 1, 2], xl: 'RL (Ω)', yl: 'P (W)' });
const Pf = r => 16 * r / Math.pow(2 + r, 2);
const mCurve = G.curve(INK, 5), mDot = G.dot(AM, 11);
const mPk = G.mk('path', { d: `M${G.X(2)},${G.Y(0)} V${G.Y(2)}`, fill: 'none', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const mPkL = [mono(mS, G.X(2) + 14, G.Y(2) - 14, 'peak: RL = RTH = 2 Ω, P = 2 W', { fill: '#B7791F', 'font-weight': 600 })];
const mNote = [mono(mS, G.X(0) + 12, G.Y(0) - 16, 'little V', { 'font-size': 18 }), mono(mS, G.X(10) - 4, G.Y(Pf(10)) - 22, 'little I', { 'font-size': 18, 'text-anchor': 'end' })];
const mRo = document.createElement('div'); mRo.className = 'ro2'; mRo.style.cssText = 'top:494px;left:40px;width:704px;grid-template-columns:auto 1fr auto auto 1fr auto';
mRo.innerHTML = `<span class="k">R<sub>L</sub></span><span class="v" id="mR1">2.0</span><span class="u">Ω</span><span class="k">P</span><span class="v" id="mP1">2.00</span><span class="u">W</span>`; $('#mL').appendChild(mRo);
const mSt = [
  [K(`P = ${kI('I_L')}^2 R_L = \\left(\\dfrac{${kE('V_{TH}')}}{R_{TH} + R_L}\\right)^{\\!2} R_L`), '', 84],
  [K(`\\text{maximum when } R_L = R_{TH}`), '', 214],
  [K(`P_{max} = \\dfrac{${kE('V_{TH}')}^2}{4R_{TH}} = \\dfrac{4^2}{4 \\times 2} = 2\\,\\text{W}`), '', 316]];
$('#mSteps').innerHTML = mSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const mRw = [...$('#mSteps').children];
$('#mBox').style.top = '200px'; $('#mBox').style.height = '76px';
const tMs = [wt('M2', 'Plot'), wt('M4', 'peak'), wt('M5', 'Then')];
const tSweep = wt('M2', 'changes') - 0.4;
const RLm = keys([[tSweep, 0.2], [tSweep + 2.2, 10], [wt('M4', 'equals') - 0.6, 10], [wt('M4', 'equals') + 0.8, 2]]);
const avM = PUC.avatar($('#sM'), { x: 1008, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The best load matches the source!' });

/* ================= W: worked example ================= */
const wS = $('#wS');
const WD = divider(wS, { x0: 110, x1: 420, x2: 600, yT: 130, yB: 430, r1a: 200, r1b: 330 });
const wLoad = [W(wS, 'M611,130 H690 V220', { stroke: AM }), W(wS, zigV(690, 220, 340), { stroke: AM }), W(wS, 'M690,340 V430 H611', { stroke: AM })];
const wLab = [lab(wS, 265, 96, '4 Ω', { 'text-anchor': 'middle' }), lab(wS, 446, 288, '12 Ω'), lab(wS, 64, 270, '24 V', { fill: TE, 'text-anchor': 'end' }), lab(wS, 716, 288, '6 Ω', { fill: '#B7791F' })];
const wIA = PUC.arrow(wS, VI), wIL = mono(wS, 716, 200, 'I = 2 A', { fill: VI, 'font-weight': 600, 'font-size': 24 });
const wSt = [
  [K(`${kE('V_{TH}')} = 24 \\times \\dfrac{12}{16} = 18\\,\\text{V}`), '', 84],
  [K(`R_{TH} = \\dfrac{4 \\times 12}{16} = 3\\,\\Omega`), '', 186],
  [K(`${kI('I_L')} = \\dfrac{18}{3 + 6} = 2\\,\\text{A}`), '', 288]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const wRw = [...$('#wSteps').children];
$('#wBox').style.top = '272px'; $('#wBox').style.height = '96px';
const tWs = [wt('W2', 'V'), wt('W3', 'With'), wt('W4', 'So')];
const wE = $('#wE');
const wEq = [W(wE, 'M150,82 V30 H260'), W(wE, zigH(30, 260, 380)), W(wE, 'M380,30 H560 V60'), W(wE, zigV(560, 60, 140), { stroke: AM }), W(wE, 'M560,140 V170 H150 V118'), ...cellV(wE, 150, 82)];
const wEqL = [lab(wE, 100, 108, '18 V', { fill: TE, 'text-anchor': 'end' }), lab(wE, 320, 76, '3 Ω', { 'text-anchor': 'middle' }), lab(wE, 586, 108, '6 Ω', { fill: '#B7791F' }), mono(wE, 0, 20, 'EQUIVALENT', { 'font-weight': 600, 'font-size': 16 })];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Take the battery out and leave a gap', right: 'Voltage source: short. Current source: open.', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tc1 = [W(tcS, 'M80,140 H150'), ...cellV(tcS, 170, 122).map(e => (e.setAttribute('transform', 'rotate(90 170 140)'), e)), W(tcS, 'M190,140 H250')];
const tcA1 = PUC.arrow(tcS, AM, 5, 14);
const tc1b = W(tcS, 'M300,140 H420', { stroke: INK, 'stroke-width': 4 });
const tc2 = [W(tcS, 'M460,140 H510'), ...csym(tcS, 540, 140), W(tcS, 'M570,140 H600')];
tc2[1].setAttribute('transform', 'rotate(90 540 140)'); tc2[2].setAttribute('transform', 'rotate(90 540 140)');
const tcA2 = PUC.arrow(tcS, AM, 5, 14);
const tc2b = [W(tcS, 'M640,140 H668'), W(tcS, 'M706,140 H734'), mk(tcS, 'circle', { cx: 672, cy: 140, r: 5, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(tcS, 'circle', { cx: 702, cy: 140, r: 5, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const tcT = [mono(tcS, 250, 230, 'VOLTAGE SOURCE → WIRE', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }), mono(tcS, 600, 230, 'CURRENT SOURCE → GAP', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: "State Thevenin's theorem · find V_TH, R_TH and the load current · condition for maximum power" });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');
$('#wa').querySelector('.wat').innerHTML = `State Thevenin's theorem · find V<sub>TH</sub>, R<sub>TH</sub> and the load current · condition for maximum power`;

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 9&nbsp;V battery feeds a 3&nbsp;Ω resistor, then a 6&nbsp;Ω resistor across terminals A and B. Which load across AB takes the maximum power, and how much?', qW: 780,
  opts: [K('2\\,\\Omega,\\ 4.5\\,\\text{W}'), K('9\\,\\Omega,\\ 2.25\\,\\text{W}'), K('2\\,\\Omega,\\ 18\\,\\text{W}'), K('6\\,\\Omega,\\ 1.5\\,\\text{W}')], right: 0, optW: 474, optY: 340 });
const qS = $('#qS');
const QD = divider(qS, { x0: 80, x1: 290, x2: 420, yT: 140, yB: 440, r1a: 150, r1b: 240 });
const qLd = [W(qS, 'M431,140 H470 V240', { stroke: AM, 'stroke-dasharray': '8 8' }), W(qS, 'M431,440 H470 V340', { stroke: AM, 'stroke-dasharray': '8 8' }), mk(qS, 'rect', { x: 452, y: 240, width: 36, height: 100, rx: 6, fill: '#fff', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '8 8' })];
const qLab = [lab(qS, 195, 106, '3 Ω', { 'text-anchor': 'middle' }), lab(qS, 314, 298, '6 Ω'), lab(qS, 38, 260, '9 V', { fill: TE, 'text-anchor': 'end' }), lab(qS, 470, 296, '?', { fill: '#B7791F', 'text-anchor': 'middle', 'font-size': 30 })];
QD.tl.forEach((e, i) => { e.setAttribute('x', 404); e.setAttribute('y', i ? 482 : 112); });
const sol = PUC.solution($('#so'), [[K(`${kE('V_{TH}')} = 9 \\times \\dfrac{6}{9} = 6\\,\\text{V}`)], [K(`R_{TH} = \\dfrac{3 \\times 6}{9} = 2\\,\\Omega`)], [K(`R_L = R_{TH} = 2\\,\\Omega`)],
  [K(`P_{max} = \\dfrac{6^2}{4 \\times 2} = 4.5\\,\\text{W}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'V'), wt('A3', 'R'), wt('A4', 'Maximum'), wt('A5', 'And')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 104, title: "Thevenin's theorem · formula card", txt: [0, 1, 0, 1],
  lines: [K(`${kI('I_L')} = \\dfrac{${kE('V_{TH}')}}{R_{TH} + R_L}`),
    '<b>R<sub>TH</sub></b>: short voltage sources, open current sources, look in from A, B',
    K(`P_{max} = ${kE('V_{TH}')}^2 / 4R_{TH} \\quad \\text{when } R_L = R_{TH}`),
    'Helmholtz 1853 · Thévenin 1883 · Norton: current source with parallel <i>R</i>'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 13', topic: 'AC waveform: frequency, period, phase, amplitude', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B4', 'scope') - 0.2, 1.1, 1300, 470], [tM - 0.5, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const tGh = [[tMorph + 0.6, tN - 0.32], [tP + 0.3, tB - 0.32], [tB + 0.3, tM - 0.32], [tM + 0.2, tT - 0.32], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gi = tGh.findIndex(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gi < 0) M.hide(ghost, true); else M.vis(ghost, t, tGh[gi][0], tGh[gi][1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tN + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tN - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tLd - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hC'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o });
    drawSeq([...HD.w, ...HD.bat, HD.r1, HD.r2], t, tMorph + 0.7, 0.3, 0.07); fadeAt([...HD.n, ...HD.t, ...HD.tl, ...hLab], t, tMorph + 1.4, 0.05);
    drawSeq([...hRLw, hRL], t, tLd - 0.1, 0.3, 0.1); M.vis(hQm, t, tLd + 0.3, 1e9, { dy: 0, fade: 0.2 });
    // the load slot tries each load in turn: one chip lights at a time
    const k = Math.floor(M.clamp((t - tLd - 0.4) / 0.9, 0, 4.999));
    hLd.forEach((el, i) => { M.vis(el, t, tLd + 0.1 + i * 0.08, 1e9, { dy: 16 }); const on = t > tLd + 0.4 && i === k && t < wt('H3', 'There');
      el.style.background = on ? AM : (t > tLd + 0.4 && i < k ? C.soft : '#fff'); el.style.color = on ? '#fff' : INK; el.style.borderColor = on ? AM : C.line; });
    M.vis($('#hQ'), t, wt('H2', 'solve') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* N: theorems */
  const nOn = t >= tN - 0.05 && t < tV + 0.05; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tV - 0.32;
    nT.forEach((el, i) => {
      M.vis(el, t, tN + 0.15 + i * 0.1, out, { dy: 36, ...o });
      const u = M.io((t - tTh[i]) / 0.3);
      drawSeq(nG[i], t, Math.min(tTh[i], wt('N2', 'Superposition') + i * 0.15) - 0.1, 0.3, 0.06);
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); el.querySelector('.ex').style.color = M.mix('#B8BCC6', MU, u);
      el.style.borderTopColor = M.mix('#D9DCE3', AM, u);
      if (i === 1) el.style.background = M.mix('#FFFFFF', C.ac3, M.io((t - tTh[1]) / 0.3));
    });
    M.vis($('#nStrip'), t, tTh[1] + 0.2, out, { dy: 30, ...o });
  }

  /* V: who + statement */
  const vOn = t >= tV - 0.05 && t < tP + 0.05; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = tP - 0.32;
    M.vis($('#vL'), t, tV + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#vR'), t, tV + 0.25, out, { dx: 60, dy: 0, ...o });
    const t1 = wt('V1', 'Hermann') - 0.2, t2 = wt('V1', 'Leon') - 0.2;
    M.vis($('#vy1'), t, wt('V1', 'eighteen') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.rise($('#vn1'), t, t1); M.vis($('#vp1'), t, t1 + 0.4, 1e9, { dy: 8 });
    M.vis($('#vy2'), t, wt('V1', 'eighteen', 1) - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.rise($('#vn2'), t, t2); M.vis($('#vp2'), t, t2 + 0.4, 1e9, { dy: 8 });
    M.vis($('#vSl'), t, T0('V2') - 0.1, 1e9, { dy: 10 }); M.rise($('#vStmt'), t, wt('V2', 'Any') - 0.05, { st: 0.04 });
    M.draw(vBlob, t, tV + 0.5, 0.8); drawSeq(vIn, t, tV + 0.8, 0.3, 0.08); drawSeq(vInT, t, wt('V2', 'terminals') - 0.1, 0.25, 0.08); fadeAt([vInL, vAB[0], vAB[1]], t, wt('V2', 'terminals'), 0.1);
    const ua = M.io((t - wt('V2', 'acts') + 0.1) / 0.4); vArr.set(400, 320, 400 + 60 * ua, 320);
    drawSeq(vEq, t, wt('V2', 'voltage') - 0.2, 0.3, 0.07); fadeAt([vAB[2], vAB[3], vEqT], t, wt('V2', 'resistance'), 0.1);
    fadeAt(vEqL, t, wt('V3', 'V') - 0.1, 0.3);
  }

  /* P: four steps */
  const pOn = t >= tP - 0.05 && t < tB + 0.05; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    const tEq = tPr[3] - 0.1, orig = t < tEq + 0.3;
    const oop = 1 - M.io((t - tEq) / 0.3);
    drawSeq([...PD.w, PD.r1, PD.r2], t, tP + 0.5, 0.3, 0.08); drawSeq(PD.bat, t, wt('P1', 'twelve') - 0.1, 0.25, 0.1); fadeAt([...PD.n, ...PD.t, ...PD.tl], t, tP + 1.2, 0.06);
    fadeAt([pLab[2]], t, wt('P1', 'twelve')); fadeAt([pLab[0]], t, wt('P1', 'six')); fadeAt([pLab[1]], t, wt('P1', 'three'));
    // the load: present, then removed in step 1
    const ldOut = M.io((t - tPr[0] - 0.2) / 0.4);
    drawSeq(pLoad, t, tP + 1.0, 0.3, 0.1); pLoad.forEach(e => { e.style.opacity = (1 - ldOut).toFixed(3); }); pLab[3].style.opacity = (Math.min(M.clamp((t - tP - 1.2) / 0.2), 1 - ldOut)).toFixed(3);
    // step 2: voltmeter across AB reads 4 V
    const vmOn = t >= tPr[1] - 0.1 && t < tPr[2];
    pVm.forEach(e => M.vis(e, t, tPr[1], tPr[2] - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }));
    M.vis(pVr, t, wt('P3', 'four') - 0.1, tPr[2] - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    // step 3: battery replaced by a wire, look in from AB
    const sh = M.io((t - tPr[2] - 0.2) / 0.3);
    PD.bat.forEach(e => { e.style.opacity = (oop * (1 - sh)).toFixed(3); }); M.vis(pShort, t, tPr[2] + 0.3, tEq, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    const ue = M.io((t - wt('P4', 'look') + 0.1) / 0.4) * oop; pEye[0].set(740, 200, 740 - 100 * ue, 200); M.vis(pEye[1], t, wt('P4', 'look'), tEq, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    const hl = M.io((t - wt('P4', 'parallel') + 0.3) / 0.3) * (t < tEq ? 1 : 0); PUC.attr(PD.r1, 'stroke', M.mix(INK, AM, hl)); PUC.attr(PD.r2, 'stroke', M.mix(INK, AM, hl));
    M.vis(pPar, t, wt('P4', 'parallel'), tEq, { dy: 10, outDur: 0.25 });
    // step 4: the Thevenin copy
    M.hide(gEq, t < tEq);
    if (t >= tEq) { drawSeq(pEq.slice(0, 5), t, tEq + 0.1, 0.3, 0.1); drawSeq(pEq.slice(5), t, tEq + 0.2, 0.25, 0.1); fadeAt(pEqL, t, wt('P5', 'four') - 0.1, 0.1);
      const ia = M.io((t - wt('P6', 'load') + 0.1) / 0.4); pIA.set(460, 104, 460 + 70 * ia, 104); pIL.style.opacity = ia; }
    if (t >= tEq) [...PD.w, ...PD.bat, PD.r1, PD.r2, ...PD.n, ...PD.t, ...PD.tl, ...pLab.slice(0, 3)].forEach(e => { e.style.opacity = oop.toFixed(3); });
    $('#pLb').textContent = t < tEq ? 'THE CIRCUIT' : 'THE THEVENIN COPY';
    pRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tPs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tPr[i] + (i === 1 ? 1.2 : i === 2 ? 1.0 : 0.1), 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tPr[i] + 1.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tPs[i] - 0.15); });
    M.vis($('#pBox'), t, wt('P6', 'load') + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tM + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    fadeAt(ckSub, t, wt('B1', 'real'), 0.6); M.draw(ckDiv, t, tB + 0.4, 0.6);
    drawSeq(bR.filter((e, i) => i !== 6), t, wt('B1', 'real') - 0.1, 0.25, 0.06); drawSeq(bC.filter((e, i) => i !== 3), t, wt('B1', 'copy') - 0.2, 0.25, 0.06);
    fadeAt([...bRn, ...bLab.slice(0, 3)], t, wt('B1', 'real') + 0.4, 0.06); fadeAt(bLab.slice(3), t, wt('B1', 'copy') + 0.4, 0.08);
    M.draw(bR[6], t, tB2 - 0.1, 0.3); M.draw(bC[3], t, tB2, 0.3); fadeAt(bRL, t, tB2 + 0.2, 0.1);
    const kn = M.io((t - (tKn - 0.5)) / 0.4); bKn[0].set(364, 380, 364 + 52 * kn, 380 - 170 * kn); bKn[1].set(834, 380, 834 + 52 * kn, 380 - 170 * kn);
    const R = RLf(t); bRL.forEach(e => M.setT(e, R.toFixed(1) + ' Ω'));
    const fOn = t >= tB2 - 0.1, q = f => 40 * integ(f, tB2 - 0.1, t);
    eRt1.set(q(Itr), fOn); eRt2.set(q(Itr), fOn); eR2.set(q(I2r), fOn); eRL.set(q(IL), fOn); eC.set(q(IL), fOn); M.vis($('#ckE'), t, tB2, 1e9, { dy: 0, fade: 0.2 });
    trA(τ => 40 * Vab(τ) * (loadOn(τ) ? 1 : 0), t, tB2, 6, 186, fOn); trB(τ => 40 * Vab(τ) * (loadOn(τ) ? 1 : 0), t, tB2, 6, 186, fOn);
    sLab.forEach((e, i) => M.vis(e, t, tB2 + i * 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#sameT'), t, wt('B4', 'never') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro1'), t, tB2, 1e9, { dy: 12 });
    M.setT($('#rR'), R.toFixed(1)); M.setT($('#rA'), fOn ? IL(t).toFixed(2) : '-'); M.setT($('#rB'), fOn ? IL(t).toFixed(2) : '-');
  }

  /* M: maximum power */
  const mOn = t >= tM - 0.05 && t < tT + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mL'), t, tM + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#mR'), t, tM + 0.25, 1e9, { dx: 60, dy: 0 });
    M.draw(G.axes, t, tM + 0.4, 0.6);
    const r = RLm(t); const on = t >= tSweep;
    const rMax = t < tSweep + 2.2 ? r : 10; mCurve(s => [s, Pf(s)], 0.01, on ? rMax : 0.01, 80);
    mDot(r, Pf(r), on);
    fadeAt([mNote[0]], t, wt('M3', 'small'), 0); fadeAt([mNote[1]], t, wt('M3', 'big'), 0);
    M.draw(mPk, t, wt('M4', 'equals'), 0.5); M.vis(mPkL[0], t, wt('M4', 'Here'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(mRo, t, tSweep, 1e9, { dy: 10 }); M.setT($('#mR1'), r.toFixed(1)); M.setT($('#mP1'), Pf(r).toFixed(2));
    mRw.forEach((rw, i) => { M.vis(rw.querySelector('.n'), t, tMs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(rw.querySelector('.sx'), t, tMs[i], 0.7); M.hide(rw, t < tMs[i] - 0.15); });
    M.vis($('#mBox'), t, tMs[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avM(t, wt('M5', 'watts') + 0.1, 1e9);
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'one') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...WD.w, ...WD.bat, WD.r1, WD.r2], t, wt('W1', 'twenty') - 0.1, 0.25, 0.07); fadeAt([...WD.n, ...WD.t, ...WD.tl], t, wt('W1', 'across'), 0.05);
    fadeAt([wLab[2]], t, wt('W1', 'twenty')); fadeAt([wLab[0]], t, wt('W1', 'four')); fadeAt([wLab[1]], t, wt('W1', 'twelve'));
    drawSeq(wLoad, t, wt('W1', 'six') - 0.1, 0.25, 0.1); fadeAt([wLab[3]], t, wt('W1', 'six'));
    const ia = M.io((t - tWs[2] - 0.6) / 0.4); wIA.set(740, 170, 740, 170 + 60 * ia); M.vis(wIL, t, wt('W4', 'Two'), 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(WD.r1, 'stroke', M.mix(INK, AM, M.io((t - tWs[1]) / 0.3) * (1 - M.io((t - tWs[2]) / 0.3)))); PUC.attr(WD.r2, 'stroke', M.mix(INK, AM, M.io((t - tWs[1]) / 0.3) * (1 - M.io((t - tWs[2]) / 0.3))));
    wRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wBox'), t, tWs[2] + 0.7, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    drawSeq(wEq, t, tWs[2] - 0.2, 0.25, 0.06); fadeAt(wEqL, t, tWs[2], 0.08);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'many') - 0.05, tStrike: wt('X3', 'Wrong'), tRight: wt('X3', 'Replace') - 0.1 });
    drawSeq(tc1, t, tX + 0.5, 0.25, 0.08); drawSeq(tc2, t, tX + 0.7, 0.25, 0.08);
    const a1 = M.io((t - wt('X3', 'short') + 0.1) / 0.3), a2 = M.io((t - wt('X3', 'open') + 0.1) / 0.3);
    tcA1.set(256, 140, 256 + 36 * a1, 140); tcA2.set(604, 140, 604 + 28 * a2, 140);
    M.draw(tc1b, t, wt('X3', 'plain'), 0.4); tc2b.forEach(e => M.vis(e, t, wt('X3', 'gap') - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(tcT[0], t, wt('X3', 'short'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tcT[1], t, wt('X3', 'open'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'state') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.4, tCount, tAns });
    M.vis($('#qc'), t, tQ + 0.3, tAns - 0.2, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    drawSeq([...QD.w, ...QD.bat, QD.r1, QD.r2], t, wt('Q1', 'nine') + 0.1, 0.25, 0.05); fadeAt([...QD.n, ...QD.t, ...QD.tl, ...qLab.slice(0, 3)], t, wt('Q1', 'across'), 0.05);
    drawSeq(qLd, t, wt('Q1', 'load') - 0.1, 0.3, 0.1); M.vis(qLab[3], t, wt('Q1', 'load') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
