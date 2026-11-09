// PUC Electronics Ep 43 - Full-wave and bridge rectifiers ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, t and R ink; scope CH1 (input) #8FA3C8, CH2 (output) amber
const AM = C.ac, VI = C.violet, TE = C.teal, GO = C.gold, INK = C.ink, MU = C.mute, RED = C.red, CH1 = '#8FA3C8', CH1D = '#5F7399', OFFG = '#E7E9F0';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
// italic symbol with an upright subscript, e.g. R with L
const vsub = (p, x, y, s, sb, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: TE, 'font-style': 'italic', ...a });
  const t1 = mk(e, 'tspan', {}); t1.textContent = s; if (sb) { const t2 = mk(e, 'tspan', { 'font-size': (a['font-size'] || 26) * 0.62, dy: 6, 'font-style': 'normal' }); t2.textContent = sb; } return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const TAU = 2 * Math.PI, HW = a => Math.max(0, Math.sin(a));
const wave = (x0, w, y0, a, cyc, f = Math.sin, n = 200) => { let d = ''; for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + w * u, y = y0 - a * f(TAU * cyc * u); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const area = (x0, w, y0, a, cyc, f) => wave(x0, w, y0, a, cyc, f) + `L${x0 + w},${y0}L${x0},${y0}Z`;
// diode symbol pointing right, centred at (cx, cy): triangle (anode side) + bar (cathode)
const diode = (p, cx, cy, s = 30) => ({ tri: W(p, `M${cx - s},${cy - s} L${cx + s},${cy} L${cx - s},${cy + s} Z`, { fill: '#fff' }), bar: W(p, `M${cx + s},${cy - s} V${cy + s}`, { 'stroke-width': 5 }) });
const zig = (x, y1, y2, n = 6) => { const h = (y2 - y1) / n; let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -16 : 16)},${y1 + h * (i + 0.5)}`; return d + ` L${x},${y2}`; };

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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 180) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
const steps = (host, rows, o = {}) => { host.innerHTML = rows.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx" style="${o.fs ? 'font-size:' + o.fs + 'px' : ''}">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runSteps = (rows, t, ts) => rows.forEach((r, i) => { M.hide(r, t < ts[i] - 0.15); M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
const lit = (el, u, on, onTxt) => { el.style.background = M.mix(C.soft, on, u * 0.18 + 0); el.style.borderColor = M.mix(C.soft, on, u); const v = el.querySelector('.v'); if (v) v.style.color = M.mix('#B8BCC6', onTxt, u); };
// colour-coded symbols
const Vm = `\\textcolor{${TE}}{V_m}`, Vdc = `\\textcolor{${TE}}{V_{dc}}`, Vo = `\\textcolor{${TE}}{v_{out}}`, Idc = `\\textcolor{${VI}}{I_{dc}}`, Im = `\\textcolor{${VI}}{I_m}`;

const ABS = a => Math.abs(Math.sin(a));
const zigH = (x1, x2, y, n = 6) => { const w = (x2 - x1) / n; let d = `M${x1},${y}`; for (let i = 0; i < n; i++) d += ` L${x1 + w * (i + 0.5)},${y + (i % 2 ? -16 : 16)}`; return d + ` L${x2},${y}`; };
// coil drawn as n arcs down a vertical line; side 1 bulges right, 0 bulges left
const coil = (x, y1, y2, n, side) => { const h = (y2 - y1) / n; let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` a${h / 2},${h / 2} 0 0 ${side} 0,${h}`; return d; };
// diode rotated to point from (x1,y1) to (x2,y2), centred at the midpoint
const diodeAt = (p, x1, y1, x2, y2, s = 24) => { const g = mk(p, 'g', { transform: `translate(${(x1 + x2) / 2},${(y1 + y2) / 2}) rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI).toFixed(2)})` }); return diode(g, 0, 0, s); };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'pedals') - 0.2;
const tP = T0('P1'), tC = T0('C1'), tB = T0('B1'), tT = T0('T1'), tR = T0('R1'), tK = T0('K1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q0'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tR], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook (pedals) ================= */
const chS = $('#chS'), CX = 150, CY = 190, CR = 92, OMC = TAU / 4;
const ring = [mk(chS, 'circle', { cx: CX, cy: CY, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(chS, 'circle', { cx: CX, cy: CY, r: 10, fill: INK })];
const crank = W(chS, `M${CX},${CY - CR} V${CY + CR}`, { 'stroke-width': 7 });
const ped = [0, 1].map(() => mk(chS, 'rect', { x: 0, y: 0, width: 56, height: 18, rx: 5, fill: '#fff', stroke: INK, 'stroke-width': 3 }));
const pedL = [mono(chS, 0, 0, 'LEFT', { 'font-weight': 600, 'font-size': 16, 'text-anchor': 'middle', fill: INK }), mono(chS, 0, 0, 'RIGHT', { 'font-weight': 600, 'font-size': 16, 'text-anchor': 'middle', fill: INK })];
const pushA = PUC.arrow(chS, '#B7791F', 5, 14);
const pushT = mono(chS, CX, 380, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 20, fill: '#B7791F' });
const hS1 = scope($('#hs1'), 720, 196), hS2 = scope($('#hs2'), 720, 196);
mk($('#hs1'), 'line', { x1: 0, y1: 160, x2: 720, y2: 160, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk($('#hs2'), 'line', { x1: 0, y1: 160, x2: 720, y2: 160, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const hT1 = hS1.tr(AM), hT2 = hS2.tr(AM);
const hL1 = [hS1.lab(14, 26, 'TWO LEGS · A PUSH EVERY HALF TURN', AM), hS1.lab(706, 26, 'SMOOTH', AM, { 'text-anchor': 'end' })];
const hL2 = [hS2.lab(14, 26, 'ONE LEG · GAPS BETWEEN PUSHES', CH1), hS2.lab(706, 26, 'JERKY', CH1, { 'text-anchor': 'end' })];
const tA0 = tMorph + 0.8, tTwo = wt('H2', 'Left') - 0.2, tOne = wt('H3', 'imagine') - 0.2;
const crankAng = t => OMC * (t - tA0);

/* ================= P: half wasted, then turned around ================= */
const pS = $('#pS'), PX = 60, PW = 660, PY = 300, PA = 130, PC = 2;
const pAx = [W(pS, `M${PX - 10},${PY} H${PX + PW + 10}`, { 'stroke-width': 2.5 }), W(pS, `M${PX},${PY - PA - 30} V${PY + PA + 30}`, { 'stroke-width': 2.5 })];
const pPos = W(pS, wave(PX, PW, PY, PA, PC, HW), { stroke: TE, 'stroke-width': 5 });
const pNeg = mk(pS, 'path', { d: '', fill: 'none', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' });
const negPath = k => { let d = ''; const n = 240; for (let i = 0; i <= n; i++) { const u = i / n, sv = Math.sin(TAU * PC * u); if (sv > 0) { d += ''; continue; } const x = PX + PW * u, y = PY - PA * sv * (1 - 2 * k); d += (d && Math.sin(TAU * PC * (i - 1) / n) <= 0 ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const pW = [0, 1].map(i => mono(pS, PX + PW * (0.375 + 0.5 * i), PY + PA + 34, 'WASTED', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 }));
const pU = [0, 1].map(i => mono(pS, PX + PW * (0.375 + 0.5 * i), PY - PA - 14, 'TURNED UP', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 }));
const pFl = [0, 1].map(i => PUC.arrow(pS, '#B7791F', 4, 12));
const pRS = $('#pRS');
const pin = W(pRS, wave(48, 190, 150, 50, 1.5), { stroke: CH1D, 'stroke-width': 4 });
const pBox = [mk(pRS, 'rect', { x: 300, y: 110, width: 184, height: 80, rx: 12, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mono(pRS, 392, 158, 'RECTIFIER', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 })];
const pAr = [W(pRS, 'M248,150 H290', { 'stroke-width': 3 }), W(pRS, 'M494,150 H536', { 'stroke-width': 3 })];
const pOut = mk(pRS, 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const outPath = k => { let d = ''; const n = 160; for (let i = 0; i <= n; i++) { const u = i / n, sv = Math.sin(TAU * 1.5 * u), y = 190 - 70 * (sv > 0 ? sv : -sv * k); d += (i ? 'L' : 'M') + (546 + 190 * u).toFixed(1) + ',' + y.toFixed(1); } return d; };
const pInL = mono(pRS, 143, 224, 'AC in', { 'text-anchor': 'middle', fill: CH1D, 'font-weight': 600 }), pOutL = mono(pRS, 641, 224, 'out', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 });
const ph = [$('#ph0'), $('#ph1')];
ph[0].querySelector('.v').innerHTML = `1 diode<span style="color:${MU};font-weight:500">·</span>half thrown away`;
ph[1].querySelector('.v').innerHTML = `2 or 4 diodes<span style="color:${MU};font-weight:500">·</span>both halves used`;
const tWaste = wt('P2', 'throws'), tTurn = wt('P4', 'turned') - 0.2;

/* ================= shared AC drive for both breadboards ================= */
const drive = (tPos, tNeg) => { const nCy = Math.max(1, Math.round((tNeg - tPos) / 4 - 0.58)), PER = (tNeg - tPos) / (nCy + 0.58), OMG = TAU / PER, tA = tPos - 0.04 * PER;
  const sig = τ => τ < tA ? 0 : Math.sin(OMG * (τ - tA));
  const intAbs = t => { if (t <= tA) return 0; const ph = OMG * (t - tA), n = Math.floor(ph / Math.PI), r = ph - n * Math.PI; return (n * 2 + 1 - Math.cos(r)) / OMG; };
  return { PER, tA, sig, intAbs }; };
const mkScope = id => { const sv = $(id), S = scope(sv, 592, 200);
  mk(sv, 'line', { x1: 0, y1: 56, x2: 592, y2: 56, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  mk(sv, 'line', { x1: 0, y1: 170, x2: 592, y2: 170, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  return { tin: S.tr(CH1), tout: S.tr(AM), lab: [S.lab(14, 22, 'CH1 · V IN', CH1), S.lab(14, 194, 'CH2 · V OUT ACROSS LOAD', AM)] }; };

/* ================= C: centre-tap breadboard ================= */
const cS = $('#cS');
const cSrc = [mk(cS, 'circle', { cx: 100, cy: 300, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(cS, 'M76,300 C84,280 92,280 100,300 S116,320 124,300')];
const cPri = [W(cS, 'M100,260 V170 H190'), W(cS, 'M100,340 V430 H190'), W(cS, coil(190, 170, 430, 5, 1), { 'stroke-width': 3.5 })];
const cCore = [W(cS, 'M238,160 V440', { 'stroke-width': 3 }), W(cS, 'M250,160 V440', { 'stroke-width': 3 })];
const cSec = W(cS, coil(298, 150, 450, 6, 0), { 'stroke-width': 3.5 });
const cWire = [W(cS, 'M298,150 H452'), W(cS, 'M508,150 H660 V450 H508'), W(cS, 'M452,450 H298')];
const cTap = [W(cS, 'M298,300 H420', { stroke: '#B7791F' }), mono(cS, 306, 324, 'CENTRE TAP', { fill: '#B7791F', 'font-weight': 600, 'font-size': 15 })];
const cRL = [W(cS, zigH(420, 560, 300)), W(cS, 'M560,300 H660'), mk(cS, 'circle', { cx: 660, cy: 300, r: 7, fill: INK })];
const cD1 = diode(cS, 480, 150, 28), cD2 = diode(cS, 480, 450, 28);
const cBr = [W(cS, 'M336,164 V284', { stroke: TE, 'stroke-width': 3 }), W(cS, 'M336,334 V438', { stroke: TE, 'stroke-width': 3 })];
const cBrL = [vsub(cS, 346, 236, 'V', 'm', { 'font-size': 24 }), vsub(cS, 346, 392, 'V', 'm', { 'font-size': 24 })];
const cLab = [tx(cS, 100, 512, 'AC supply', { 'text-anchor': 'middle', 'font-size': 22 }), tx(cS, 244, 512, 'transformer', { 'text-anchor': 'middle', 'font-size': 22 }),
  tx(cS, 480, 104, 'D1', { 'text-anchor': 'middle' }), tx(cS, 480, 516, 'D2', { 'text-anchor': 'middle' }),
  vsub(cS, 476, 356, 'R', 'L', { fill: INK, 'font-size': 26 }), mono(cS, 520, 356, '1 kΩ', { 'font-size': 18 }), mono(cS, 700, 306, 'load', { 'font-size': 18 })];
const cSt = [mono(cS, 480, 206, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }), mono(cS, 480, 410, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 })];
const cPol = [tx(cS, 268, 138, '+', { 'font-size': 28, fill: CH1D }), tx(cS, 268, 482, '-', { 'font-size': 30, fill: CH1D })];
const cI = PUC.arrow(cS, VI, 5, 14), cIL = tx(cS, 376, 270, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), cIL2 = mono(cS, 540, 256, 'same way, both halves', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 17 });
const cSkip = (x, y) => (x > 410 && x < 570 && Math.abs(y - 300) < 22) || (x < 306);
const ceP = flow(cS, [[298, 300], [660, 300], [660, 150], [298, 150]], 22, { skip: cSkip });
const ceN = flow(cS, [[298, 300], [660, 300], [660, 450], [298, 450]], 22, { skip: cSkip });
const dC = drive(wt('C5', 'Positive'), wt('C7', 'Negative'));
const scC = mkScope('#scCS');
$('#roC').innerHTML = `<span class="k" style="color:${CH1D}">V<sub>in</sub></span><span class="v" id="cRI" style="color:${CH1D}">+0.0</span><span class="u">V</span>
  <span class="k" style="color:#B7791F">V<sub>out</sub></span><span class="v" id="cRO" style="color:#B7791F">+0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="cRC" style="color:${VI}">0.00</span><span class="u">mA</span>`;

/* ================= B: bridge breadboard ================= */
const bS = $('#bS'), P = [380, 300], Q = [700, 300], TP = [540, 120], BT = [540, 480];
const bSide = [W(bS, `M${P} L${TP}`), W(bS, `M${Q} L${TP}`), W(bS, `M${BT} L${Q}`), W(bS, `M${BT} L${P}`)];
const bD = [diodeAt(bS, ...P, ...TP), diodeAt(bS, ...Q, ...TP), diodeAt(bS, ...BT, ...Q), diodeAt(bS, ...BT, ...P)];
const bOut = [W(bS, 'M540,120 V80 H860 V230'), W(bS, zig(860, 230, 370)), W(bS, 'M860,370 V520 H540 V480')];
const bSrcW = [W(bS, 'M380,300 H504'), W(bS, 'M576,300 H700')];
const bSrc = [mk(bS, 'circle', { cx: 540, cy: 300, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(bS, 'M518,300 C526,282 532,282 540,300 S554,318 562,300')];
const bNode = [P, Q, TP, BT].map(([x, y]) => mk(bS, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const bLab = [tx(bS, 430, 190, 'D1', { 'text-anchor': 'end' }), tx(bS, 650, 190, 'D2'), tx(bS, 650, 428, 'D3'), tx(bS, 430, 428, 'D4', { 'text-anchor': 'end' }),
  tx(bS, 540, 368, 'AC supply', { 'text-anchor': 'middle', 'font-size': 20 }), vsub(bS, 790, 296, 'R', 'L', { fill: INK, 'font-size': 26 }), mono(bS, 790, 326, '1 kΩ', { 'font-size': 18 }),
  tx(bS, 562, 108, '+', { 'font-size': 26, fill: '#B7791F' }), tx(bS, 562, 508, '-', { 'font-size': 30, fill: '#B7791F' })];
const bPol = [tx(bS, 338, 290, '+', { 'font-size': 28, fill: CH1D }), tx(bS, 720, 290, '-', { 'font-size': 30, fill: CH1D })];
const bI = PUC.arrow(bS, VI, 5, 14), bIL = tx(bS, 896, 316, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const bSkip = (x, y) => (x > 836 && x < 884 && y > 226 && y < 374) || Math.hypot(x - 540, y - 300) < 40;
const OUTP = [[540, 480], [540, 520], [860, 520], [860, 80], [540, 80], [540, 120]];
const beP = flow(bS, [Q, ...OUTP, P], 24, { skip: bSkip }), beN = flow(bS, [P, ...OUTP, Q], 24, { skip: bSkip });
const dB = drive(wt('B3', 'Positive'), wt('B4', 'Negative'));
const scB = mkScope('#scBS');
const bDS = $('#bDS');
const bTile = [0, 1, 2, 3].map(i => { const g = mk(bDS, 'g'); const r = mk(g, 'rect', { x: 32 + i * 148, y: 76, width: 128, height: 76, rx: 12, fill: '#F1EEE6', stroke: '#F1EEE6', 'stroke-width': 2.5 });
  const l = mono(g, 96 + i * 148, 124, 'D' + (i + 1), { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 30, fill: '#B8BCC6' }); return { g, r, l }; });
const bNow = mono(bDS, 320, 206, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22, fill: INK });

/* ================= R: derivation ================= */
const rS = $('#rS'), RX = 70, RWd = 560, RY = 400, RA = 220, CYC = 2;
const rAx = [W(rS, `M${RX - 10},${RY} H${RX + RWd + 14}`, { 'stroke-width': 2.5 }), W(rS, `M${RX},${RY - RA - 40} V${RY + 20}`, { 'stroke-width': 2.5 })];
const rFill = mk(rS, 'path', { d: area(RX, RWd, RY, RA, CYC, ABS), fill: C.ac2 });
const rOut = W(rS, wave(RX, RWd, RY, RA, CYC, ABS), { stroke: TE, 'stroke-width': 5 });
const rPk = mk(rS, 'line', { x1: RX, y1: RY - RA, x2: RX + RWd + 10, y2: RY - RA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rPkL = vsub(rS, RX + RWd + 22, RY - RA + 8, 'V', 'm', { 'font-size': 24 });
const HUMP = 2 / Math.PI, HWd = RWd / CYC / 2;
const rRect = mk(rS, 'rect', { x: RX, y: RY - RA * HUMP, width: HWd, height: RA * HUMP, fill: 'none', stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const rRectL = mono(rS, RX + 8, RY - RA * HUMP - 12, '2Vm/π', { fill: TE, 'font-weight': 600, 'font-size': 20 });
const rHalf = mk(rS, 'line', { x1: RX, y1: RY - RA / Math.PI, x2: RX + RWd + 10, y2: RY - RA / Math.PI, stroke: '#B8BCC6', 'stroke-width': 3, 'stroke-dasharray': '6 8' });
const rHalfL = mono(rS, RX + RWd + 22, RY - RA / Math.PI + 6, 'half-wave', { fill: MU, 'font-size': 17 });
const rAvgL = [mono(rS, RX + RWd + 22, RY - RA * HUMP + 2, 'Vdc', { fill: TE, 'font-weight': 600, 'font-size': 20 }), mono(rS, RX + RWd + 22, RY - RA * HUMP + 26, '0.637', { fill: TE, 'font-weight': 600, 'font-size': 18 })];
const rNo = mono(rS, 392, 470, 'NO GAPS · A HUMP EVERY HALF CYCLE', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const rRows = steps($('#rSteps'), [
  [K(`${Vo} = ${Vm}\\,|\\sin\\omega t|`), 'both halves', 76],
  [K(`\\text{one hump: } \\bar{v} = \\dfrac{2${Vm}}{\\pi}`), '', 160],
  [K(`${Vdc} = \\dfrac{2${Vm}}{\\pi} \\approx 0.637\\,${Vm}`), 'no gaps', 262],
  [K(`0.637 = 2 \\times 0.318`), 'double the half-wave', 372],
  [K(`${Idc} = \\dfrac{2${Im}}{\\pi}`), 'same rule for current', 450]]);
const rBox = $('#rBox'); rBox.style.top = '248px'; rBox.style.height = '100px';
const tRs = [wt('R2', 'Call'), wt('R3', 'One'), wt('R4', 'So'), wt('R5', 'Double'), wt('R6', 'I')];
const tStretch = wt('R4', 'No') - 0.1;
const avR = PUC.avatar($('#sR'), { x: 192, y: 770, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Same supply, double the DC!' });

/* ================= K: compare ================= */
const KSW = 720, KSH = 220, kSc = scope($('#kScope'), KSW, KSH), KC = 2;
const kIn = W($('#kScope'), wave(10, KSW - 20, 64, 42, KC), { stroke: CH1, 'stroke-width': 4 });
const kOut = W($('#kScope'), wave(10, KSW - 20, 198, 60, KC, ABS), { stroke: AM, 'stroke-width': 4 });
const kTick = [1].map(i => mk($('#kScope'), 'line', { x1: 10 + (KSW - 20) * i / KC, y1: 8, x2: 10 + (KSW - 20) * i / KC, y2: KSH - 8, stroke: '#8FA3C8', 'stroke-width': 2, 'stroke-dasharray': '4 6' }));
const kNum = [0, 1, 2, 3].map(i => kSc.lab(10 + (KSW - 20) * (i + 0.5) / 4, 182, String(i + 1), AM, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600 }));
const kSL = [kSc.lab(KSW - 12, 24, 'CH1 · 2 CYCLES IN', CH1, { 'text-anchor': 'end' }), kSc.lab(KSW - 12, 212, 'CH2 · 4 HUMPS OUT', AM, { 'text-anchor': 'end' })];
const kS = $('#kS');
const kCoil = W(kS, coil(200, 340, 560, 4, 0), { 'stroke-width': 3.5 });
const kCT = [W(kS, 'M200,450 H232', { stroke: '#B7791F' }), mono(kS, 236, 456, 'CT', { fill: '#B7791F', 'font-weight': 600, 'font-size': 16 })];
const kBr = [W(kS, 'M268,346 V442', { stroke: TE, 'stroke-width': 3 }), W(kS, 'M268,458 V554', { stroke: TE, 'stroke-width': 3 })];
const kBrL = [vsub(kS, 280, 402, 'V', 'm', { 'font-size': 22 }), vsub(kS, 280, 514, 'V', 'm', { 'font-size': 22 })];
const kBig = PUC.arrow(kS, TE, 4, 12), kBig2 = PUC.arrow(kS, TE, 4, 12), kBigL = mono(kS, 128, 456, '2Vm', { 'text-anchor': 'end', fill: TE, 'font-weight': 700, 'font-size': 24 });
const kTx = [tx(kS, 350, 384, 'A resting diode in the', { 'font-size': 24, 'font-weight': 500 }), tx(kS, 350, 416, 'centre-tap circuit faces', { 'font-size': 24, 'font-weight': 500 }),
  tx(kS, 350, 448, 'the WHOLE coil.', { 'font-size': 24 }), mono(kS, 350, 506, 'PIV = 2Vm', { fill: TE, 'font-weight': 700, 'font-size': 36 }), mono(kS, 350, 548, 'bridge: PIV = Vm', { fill: MU, 'font-weight': 600, 'font-size': 20 })];
const KT = [['OUTPUT FREQUENCY', '2f', '2f'], ['PEAK INVERSE VOLTAGE', '2Vm', 'Vm'], ['DIODES', '2', '4'], ['CENTRE TAP NEEDED', 'yes', 'no'], ['DIODE DROPS IN PATH', '1', '2'], ['MAX EFFICIENCY', '81.2%', '81.2%']];
$('#kTb').innerHTML = KT.map(([k, a, b], i) => `<div class="tb" style="top:${126 + i * 76}px"><div class="k">${k}</div><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');
const kT = [...$('#kTb').children];
const tKa = [wt('K3', 'So'), wt('K5', 'centre'), tK + 0.6, tK + 0.9, wt('K7', 'two'), wt('K8', 'eighty')], tKb = [wt('K3', 'So'), wt('K6', 'bridge'), tK + 0.6, tK + 0.9, wt('K7', 'two'), wt('K8', 'eighty')];

/* ================= W: worked example ================= */
const wS = $('#wS'), WX = 70, WWd = 560, WY = 300, WA = 180, WC = 2.5;
const wAx = [W(wS, `M${WX - 10},${WY} H${WX + WWd + 14}`, { 'stroke-width': 2.5 }), W(wS, `M${WX},${WY - WA - 20} V${WY + 16}`, { 'stroke-width': 2.5 })];
const wFill = mk(wS, 'path', { d: area(WX, WWd, WY, WA, WC, ABS), fill: C.ac2 });
const wOut = W(wS, wave(WX, WWd, WY, WA, WC, ABS), { stroke: TE, 'stroke-width': 5 });
const wPk = mk(wS, 'line', { x1: WX, y1: WY - WA, x2: WX + WWd + 10, y2: WY - WA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wPkL = mono(wS, WX + WWd + 22, WY - WA + 7, '20 V', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const wAvg = mk(wS, 'line', { x1: WX, y1: WY - WA * HUMP, x2: WX + WWd + 10, y2: WY - WA * HUMP, stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const wAvgL = mono(wS, WX + WWd + 22, WY - WA * HUMP + 7, '12.7 V', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const WT = [['V DC', TE, 12.73, 2, 'V'], ['I DC', VI, 12.73, 2, 'mA'], ['PIV (BRIDGE)', TE, 20, 0, 'V'], ['OUTPUT FREQUENCY', INK, 100, 0, 'Hz']];
$('#wTiles').innerHTML = WT.map(([k, c], i) => `<div class="wt" style="left:${32 + (i % 2) * 372}px;top:${366 + Math.floor(i / 2) * 112}px"><div class="k">${k}</div><div class="v" style="color:${c}"><span>0</span><small>${WT[i][4]}</small></div></div>`).join('');
const wT = [...$('#wTiles').children];
const wRows = steps($('#wSteps'), [
  [K(`${Vm} = 20\\,\\text{V},\\ R_L = 1\\,\\text{k}\\Omega,\\ f = 50\\,\\text{Hz}`), '', 80],
  [K(`${Vdc} = \\dfrac{2 \\times 20}{\\pi} \\approx 12.7\\,\\text{V}`), '', 170],
  [K(`${Idc} = \\dfrac{12.7\\,\\text{V}}{1000\\,\\Omega} \\approx 12.7\\,\\text{mA}`), '', 272],
  [K(`\\text{PIV} = ${Vm} = 20\\,\\text{V}`), 'bridge', 374],
  [K(`f_{out} = 2f_{in} = 100\\,\\text{Hz}`), 'two humps per cycle', 460]], { fs: 30 });
const wBox = $('#wBox'); wBox.style.top = '156px'; wBox.style.height = '96px';
const tWs = [wt('W1', 'bridge'), wt('W3', 'V'), wt('W5', 'That'), wt('W6', 'Each'), wt('W7', 'And')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Centre-tap PIV = Vm', right: 'Centre-tap PIV = 2Vm, the whole coil', y0: 96, y1: 184 });
const tcS = $('#tcS'), BU = 200;
const tcRow = [mono(tcS, 32, 138, 'CENTRE TAP', { fill: INK, 'font-weight': 600 }), mono(tcS, 32, 226, 'BRIDGE', { fill: INK, 'font-weight': 600 })];
const tcBar = [mk(tcS, 'rect', { x: 210, y: 108, width: 0, height: 44, rx: 8, fill: TE }), mk(tcS, 'rect', { x: 210, y: 196, width: 0, height: 44, rx: 8, fill: TE })];
const tcSeg = mk(tcS, 'line', { x1: 210 + BU, y1: 100, x2: 210 + BU, y2: 160, stroke: '#fff', 'stroke-width': 3 });
const tcV = [mono(tcS, 0, 140, '2Vm', { fill: TE, 'font-weight': 700, 'font-size': 26 }), mono(tcS, 0, 228, 'Vm', { fill: TE, 'font-weight': 700, 'font-size': 26 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'], type: 'Draw both circuits and waveforms · compare them · which diode conducts · find V<sub>dc</sub>' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `The voltage <i>v</i> = 30 sin(100π<i>t</i>) V feeds a bridge rectifier with ideal diodes and a 2&nbsp;kΩ load. Find the DC load current and the output frequency.`,
  opts: [K('4.77\\,\\text{mA},\\ 50\\,\\text{Hz}'), K('9.55\\,\\text{mA},\\ 50\\,\\text{Hz}'), K('9.55\\,\\text{mA},\\ 100\\,\\text{Hz}'), K('15\\,\\text{mA},\\ 100\\,\\text{Hz}')], right: 2, optW: 474, optY: 344 });
const sol = PUC.solution($('#so'), [[K(`${Vm} = 30\\,\\text{V},\\ f_{in} = 50\\,\\text{Hz}`)], [K(`${Vdc} = \\dfrac{2 \\times 30}{\\pi} \\approx 19.1\\,\\text{V}`)],
  [K(`${Idc} = \\dfrac{19.1}{2000} \\approx 9.55\\,\\text{mA}`)], [K(`f_{out} = 2 \\times 50 = 100\\,\\text{Hz}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A2', 'So'), wt('A4', 'Divide'), wt('A5', 'Full')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 360, y: 236, w: 1200, h: 504, y0: 90, dy: 112, title: 'Full-wave rectifiers · formula card', txt: [0, 0, 0, 1],
  lines: [K(`${Vdc} = \\dfrac{2${Vm}}{\\pi} \\approx 0.637\\,${Vm} \\qquad ${Idc} = \\dfrac{2${Im}}{\\pi}`),
    K(`f_{out} = 2f_{in} \\qquad \\eta_{max} = 81.2\\%`),
    K(`\\text{PIV: centre tap } 2${Vm} \\qquad \\text{bridge } ${Vm}`),
    'Bridge: 4 diodes, no centre tap, two diode drops'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 44', topic: 'Capacitor filter and ripple', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [T0('B3'), 1.08, 960, 540], [T0('B6'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const runBoard = (t, d, sc, rd) => {
  const s = d.sig(t);
  sc.tin(τ => 40 * d.sig(τ), t, d.tA, 2 * d.PER, 56, t >= d.tA); sc.tout(τ => 62 * Math.abs(d.sig(τ)), t, d.tA, 2 * d.PER, 170, t >= d.tA);
  fadeAt(sc.lab, t, d.tA, 0.3);
  if (rd) { M.setT($(rd[0]), (s >= 0 ? '+' : '') + (20 * s).toFixed(1)); M.setT($(rd[1]), '+' + (20 * Math.abs(s)).toFixed(1)); M.setT($(rd[2]), (20 * Math.abs(s)).toFixed(2)); }
  return s; };

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gB = t >= tC + 0.4 && t < tT, gW = t >= tW && t < tX;
  M.vis(ghost, t, gB ? tC + 0.5 : tW + 0.2, gB ? tT - 0.4 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gB && !gW) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    fadeAt(ring, t, tMorph + 0.6); M.vis(crank, t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 });
    const th = Math.max(0, crankAng(t)), ps = [[CX + CR * Math.sin(th), CY - CR * Math.cos(th)], [CX - CR * Math.sin(th), CY + CR * Math.cos(th)]];
    PUC.attr(crank, 'd', `M${ps[1][0].toFixed(1)},${ps[1][1].toFixed(1)} L${ps[0][0].toFixed(1)},${ps[0][1].toFixed(1)}`);
    const down = Math.sin(th) >= 0 ? 0 : 1, oneLeg = t >= tOne;
    ped.forEach((p, i) => { PUC.attr(p, 'x', (ps[i][0] - 28).toFixed(1)); PUC.attr(p, 'y', (ps[i][1] - 9).toFixed(1)); M.vis(p, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 });
      const act = t >= tTwo && i === down && !(oneLeg && i === 1); PUC.attr(p, 'fill', act ? AM : '#fff'); });
    pedL.forEach((l, i) => { PUC.attr(l, 'x', ps[i][0].toFixed(1)); PUC.attr(l, 'y', (ps[i][1] + (ps[i][1] > CY ? 36 : -20)).toFixed(1)); M.vis(l, t, tMorph + 0.9, 1e9, { dy: 0, fade: 0.2 }); });
    const pushing = t >= tTwo && !(oneLeg && down === 1);
    if (pushing) { const [x, y] = ps[down]; pushA.set(x + 48, y - 26, x + 48, y + 26); } M.hide(pushA.g, !pushing);
    M.setT(pushT, t < tTwo ? '' : (pushing ? 'PUSH' : 'NO PUSH')); PUC.attr(pushT, 'fill', pushing ? '#B7791F' : RED);
    M.vis($('#aPill'), t, tTwo + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hS'), t, tTwo - 0.3, out, { dx: 60, dy: 0, ...o });
    hT1(τ => 110 * ABS(crankAng(τ)), t, tTwo, 8, 160, t >= tTwo); fadeAt(hL1, t, tTwo, 0.3);
    hT2(τ => 110 * Math.max(0, Math.sin(crankAng(τ))), t, tOne, 8, 160, t >= tOne); fadeAt(hL2, t, tOne, 0.3);
    M.vis($('#hQ'), t, wt('H4', 'Can') - 0.1, 1e9, { dy: 20 });
  }

  /* P: wasted half, turned around */
  const pOn = t >= tP - 0.05 && t < tC + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tC - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(pAx, t, tP + 0.4, 0.4, 0.1); M.draw(pPos, t, tP + 0.7, 1.4, M.clamp);
    const k = M.io((t - tTurn) / 1.4);
    PUC.attr(pNeg, 'd', negPath(k)); M.vis(pNeg, t, tWaste - 0.3, 1e9, { dy: 0, fade: 0.25 });
    PUC.attr(pNeg, 'stroke', k > 0.02 ? TE : RED); PUC.attr(pNeg, 'stroke-dasharray', k > 0.02 ? 'none' : '10 8'); PUC.attr(pNeg, 'stroke-width', k > 0.02 ? 5 : 4);
    pW.forEach((e, i) => M.vis(e, t, tWaste + 0.1 + i * 0.2, tTurn, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }));
    pU.forEach((e, i) => M.vis(e, t, tTurn + 1.2 + i * 0.15, 1e9, { dy: 0, fade: 0.2 }));
    pFl.forEach((a, i) => { const x = PX + PW * (0.375 + 0.5 * i) + 46, u = M.io((t - tTurn) / 1.2); a.set(x, PY + 90, x, PY + 90 - 150 * u); M.hide(a.g, u < 0.05 || t > tTurn + 2.2); });
    M.draw(pin, t, tP + 0.6, 0.9, M.clamp); fadeAt(pBox, t, tP + 0.8, 0.12); drawSeq(pAr, t, tP + 1, 0.3, 0.1);
    PUC.attr(pOut, 'd', outPath(k)); M.vis(pOut, t, tP + 1.3, 1e9, { dy: 0, fade: 0.3 }); fadeAt([pInL, pOutL], t, tP + 1.2, 0.2);
    ph.forEach((e, i) => { M.vis(e, t, (i ? tTurn : tWaste) - 0.2, 1e9, { dy: 16 }); lit(e, M.io((t - (i ? tTurn : tWaste)) / 0.3), i ? '#B7791F' : RED, i ? '#B7791F' : RED); });
    M.vis($('#pStrip'), t, T0('P5') - 0.1, 1e9, { dy: 24 });
  }

  /* C: centre-tap breadboard */
  const cOn = t >= tC - 0.05 && t < tB + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tB - 0.32;
    M.vis($('#ckC'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#scC'), t, tC + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rbC'), t, tC + 0.45, out, { dy: 36, ...o });
    drawSeq(cSrc, t, tC + 0.3, 0.3, 0.1); drawSeq(cPri, t, tC + 0.5, 0.4, 0.12); drawSeq(cCore, t, wt('C1', 'transformer') - 0.1, 0.3, 0.1); M.draw(cSec, t, wt('C1', 'transformer') + 0.2, 0.6);
    fadeAt(cLab.slice(0, 2), t, wt('C1', 'transformer'), 0.2);
    M.draw(cTap[0], t, wt('C2', 'centre') - 0.2, 0.4); M.vis(cTap[1], t, wt('C2', 'centre'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq(cBr, t, wt('C3', 'two') - 0.1, 0.3, 0.3); fadeAt(cBrL, t, wt('C3', 'two') + 0.1, 0.3);
    const tc4 = T0('C4');
    drawSeq(cWire, t, tc4 - 0.1, 0.4, 0.12); M.draw(cD1.tri, t, wt('C4', 'D') - 0.1, 0.35); M.draw(cD1.bar, t, wt('C4', 'D') + 0.15, 0.2);
    M.draw(cD2.tri, t, wt('C4', 'two') - 0.1, 0.35); M.draw(cD2.bar, t, wt('C4', 'two') + 0.15, 0.2); fadeAt(cLab.slice(2, 4), t, wt('C4', 'D'), 0.3);
    drawSeq(cRL, t, wt('C4', 'load') - 0.2, 0.35, 0.1); fadeAt(cLab.slice(4), t, wt('C4', 'load'), 0.1);
    M.vis($('#ckCE'), t, dC.tA, 1e9, { dy: 0, fade: 0.2 });
    const s = runBoard(t, dC, scC, ['#cRI', '#cRO', '#cRC']), live = t >= dC.tA;
    [cD1, cD2].forEach((d, i) => { const on = live && (i ? s < 0 : s > 0); PUC.attr(d.tri, 'fill', !live ? '#FFFFFF' : (on ? AM : OFFG));
      M.setT(cSt[i], !live ? '' : (on ? 'ON · CONDUCTS' : 'OFF · RESTS')); PUC.attr(cSt[i], 'fill', on ? '#B7791F' : RED); });
    cPol.forEach((p, i) => { M.vis(p, t, dC.tA, 1e9, { dy: 0, fade: 0.15 }); M.setT(p, (s >= 0) === (i === 0) ? '+' : '-'); });
    const off = 150 * dC.intAbs(t); ceP.set(off, live && s > 0.02); ceN.set(off, live && s < -0.02);
    const ia = M.io((t - wt('C8', 'load')) / 0.45); cI.set(600, 262, 600 - 180 * ia, 262); M.hide(cI.g, ia < 0.03); M.vis(cIL, t, wt('C8', 'load') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(cIL2, t, wt('C8', 'same') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#slowC'), t, dC.tA + 0.5, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#roC'), t, dC.tA - 0.2, 1e9, { dy: 12 });
  }

  /* B: bridge breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ckB'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#scB'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rbB'), t, tB + 0.45, 1e9, { dy: 36 });
    drawSeq(bSrcW, t, tB + 0.4, 0.3, 0.1); drawSeq(bSrc, t, tB + 0.5, 0.3, 0.1);
    const td = wt('B1', 'four') - 0.2;
    drawSeq(bSide, t, td, 0.35, 0.15); bD.forEach((d, i) => { M.draw(d.tri, t, td + 0.2 + i * 0.15, 0.3); M.draw(d.bar, t, td + 0.4 + i * 0.15, 0.2); });
    fadeAt(bLab.slice(0, 4), t, td + 0.4, 0.12); fadeAt(bNode, t, wt('B2', 'diamond'), 0.08); fadeAt([bLab[4]], t, tB + 0.6);
    drawSeq(bOut, t, wt('B2', 'bridge') - 0.1, 0.35, 0.15); fadeAt(bLab.slice(5), t, wt('B2', 'bridge') + 0.3, 0.1);
    M.vis($('#ckBE'), t, dB.tA, 1e9, { dy: 0, fade: 0.2 });
    const s = runBoard(t, dB, scB, null), live = t >= dB.tA;
    bD.forEach((d, i) => { const on = live && ((i === 0 || i === 2) ? s > 0 : s < 0); PUC.attr(d.tri, 'fill', !live ? '#FFFFFF' : (on ? AM : OFFG)); });
    bTile.forEach((b, i) => { M.vis(b.g, t, tB + 0.6 + i * 0.1, 1e9, { dy: 10 }); const on = live && ((i === 0 || i === 2) ? s > 0 : s < 0);
      PUC.attr(b.r, 'fill', on ? '#FBEFD2' : '#F1EEE6'); PUC.attr(b.r, 'stroke', on ? AM : '#F1EEE6'); PUC.attr(b.l, 'fill', on ? '#B7791F' : '#B8BCC6'); });
    M.setT(bNow, !live ? '' : (s >= 0 ? 'POSITIVE HALF · D1 and D3 conduct' : 'NEGATIVE HALF · D2 and D4 conduct'));
    bPol.forEach((p, i) => { M.vis(p, t, dB.tA, 1e9, { dy: 0, fade: 0.15 }); M.setT(p, (s >= 0) === (i === 0) ? '+' : '-'); });
    const off = 150 * dB.intAbs(t); beP.set(off, live && s > 0.02); beN.set(off, live && s < -0.02);
    const ia = M.io((t - wt('B5', 'crosses')) / 0.45); bI.set(904, 236, 904, 236 + 130 * ia); M.hide(bI.g, ia < 0.03); M.vis(bIL, t, wt('B5', 'crosses') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#slowB'), t, dB.tA + 0.5, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tR; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tR - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { out: tR - 0.35, outDur: 0.25 }); }

  /* R: derivation */
  const rOn = t >= tR - 0.05 && t < tK + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tK - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(rAx, t, tR + 0.4, 0.4, 0.1); M.draw(rOut, t, tR + 0.6, 2.2, M.clamp); M.vis(rFill, t, tR + 1.6, 1e9, { dy: 0, fade: 0.3 });
    M.vis(rPk, t, wt('R2', 'peak') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(rPkL, t, wt('R2', 'peak'), 1e9, { dy: 0, fade: 0.2 }); M.vis(rNo, t, wt('R2', 'humps'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(rRect, t, tRs[1] - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(rRectL, t, tRs[1] + 0.2, tStretch, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 });
    PUC.attr(rRect, 'width', (HWd * (1 + 3 * M.io((t - tStretch) / 1.4))).toFixed(1));
    fadeAt(rAvgL, t, tRs[2] + 0.4, 0.15);
    M.vis(rHalf, t, tRs[3] - 0.2, 1e9, { dy: 0, fade: 0.25 }); M.vis(rHalfL, t, tRs[3], 1e9, { dy: 0, fade: 0.2 });
    runSteps(rRows, t, tRs);
    M.vis(rBox, t, tRs[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avR(t, wt('R6', 'Current') - 0.2, out);
  }

  /* K: compare */
  const kOn = t >= tK - 0.05 && t < tW + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tW - 0.32;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    const tk2 = wt('K2', 'Two');
    M.draw(kIn, t, T0('K2') - 0.1, 1.4, M.clamp); M.draw(kOut, t, tk2 - 0.2, 1.6, M.clamp);
    kTick.forEach(e => M.vis(e, t, tk2 + 0.4, 1e9, { dy: 0, fade: 0.2 }));
    kNum.forEach((e, i) => M.vis(e, t, tk2 + i * 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    fadeAt(kSL, t, tk2, 0.4);
    const tp = T0('K4');
    M.draw(kCoil, t, tp, 0.6); fadeAt(kCT, t, tp + 0.3); drawSeq(kBr, t, wt('K5', 'faces') - 0.4, 0.3, 0.2); fadeAt(kBrL, t, wt('K5', 'faces') - 0.2, 0.2);
    const ua = M.io((t - wt('K5', 'two') + 0.1) / 0.5); kBig.set(140, 450, 140, 450 - 104 * ua); kBig2.set(140, 450, 140, 450 + 104 * ua); M.hide(kBig.g, ua < 0.05); M.hide(kBig2.g, ua < 0.05);
    M.vis(kBigL, t, wt('K5', 'two'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt(kTx.slice(0, 3), t, wt('K5', 'resting'), 0.15); M.vis(kTx[3], t, wt('K5', 'two'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(kTx[4], t, wt('K6', 'bridge'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#thA'), t, tK + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#thB'), t, tK + 0.5, 1e9, { dy: 0, fade: 0.2 });
    kT.forEach((e, i) => { M.vis(e, t, tK + 0.5 + i * 0.1, 1e9, { dy: 14 });
      const ua2 = M.io((t - tKa[i]) / 0.3), ub = M.io((t - tKb[i]) / 0.3);
      e.style.background = M.mix(C.soft, '#FFFFFF', Math.max(ua2, ub)); e.style.borderColor = M.mix(C.soft, AM, Math.max(ua2, ub));
      e.querySelector('.a').style.opacity = (0.1 + 0.9 * ua2).toFixed(3); e.querySelector('.b').style.opacity = (0.1 + 0.9 * ub).toFixed(3);
      e.querySelector('.a').style.color = i === 1 ? TE : INK; e.querySelector('.b').style.color = i === 1 ? TE : INK; });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(wAx, t, tW + 0.4, 0.4, 0.1); M.draw(wOut, t, tW + 0.6, 1.8, M.clamp); M.vis(wFill, t, tW + 1.6, 1e9, { dy: 0, fade: 0.3 });
    M.vis(wPk, t, wt('W1', 'twenty') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(wPkL, t, wt('W1', 'twenty'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(wAvg, t, tWs[1] + 0.2, 0.7); M.vis(wAvgL, t, tWs[1] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    wT.forEach((e, i) => { const ti = tWs[i + 1]; M.vis(e, t, ti - 0.1, 1e9, { dy: 16 });
      const [, , v, d] = WT[i]; M.setT(e.querySelector('.v span'), (v * M.o3((t - ti) / 0.9)).toFixed(d)); });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not') - 0.2, tRight: wt('X3', 'faces') - 0.1 });
    fadeAt(tcRow, t, tX + 0.6, 0.2);
    const u1 = M.io((t - wt('X2', 'faces')) / 0.6), u2 = M.io((t - wt('X3', 'whole')) / 0.8);
    PUC.attr(tcBar[0], 'width', (BU * u1 + BU * u2).toFixed(1)); PUC.attr(tcBar[1], 'width', (BU * M.io((t - tX - 0.8) / 0.6)).toFixed(1));
    M.vis(tcSeg, t, wt('X3', 'whole') + 0.6, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(tcV[0], 'x', (226 + BU * u1 + BU * u2).toFixed(1)); M.setT(tcV[0], u2 > 0.5 ? '2Vm' : 'Vm ?'); PUC.attr(tcV[0], 'fill', u2 > 0.5 ? TE : RED); M.hide(tcV[0], u1 < 0.05);
    PUC.attr(tcV[1], 'x', (226 + BU).toFixed(1)); M.vis(tcV[1], t, tX + 1.3, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X5', 'NEET'), wt('X4', 'PUC'), wt('X4', 'CBSE'), wt('X4', 'ISC')], tType: T0('X6') - 0.1 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
