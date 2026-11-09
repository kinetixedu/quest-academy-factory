// PUC Electronics Ep 42 - Half-wave rectifier ("Breadboard" style, Lab Notebook world)
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'charger') - 0.2;
const tP = T0('P1'), tB = T0('B1'), tT = T0('T1'), tR = T0('R1'), tK = T0('K1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tR], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const chS = $('#chS');
const sock = [W(chS, 'M36,14 H124 A16,16 0 0 1 140,30 V114 A16,16 0 0 1 124,130 H36 A16,16 0 0 1 20,114 V30 A16,16 0 0 1 36,14 Z', { 'stroke-width': 4, fill: '#fff' }),
  W(chS, 'M58,52 V80 M102,52 V80', { 'stroke-width': 7 })];
const brick = [W(chS, 'M58,96 V150 M102,96 V150', { 'stroke-width': 4 }), W(chS, 'M50,150 H110 A10,10 0 0 1 120,160 V232 A10,10 0 0 1 110,242 H50 A10,10 0 0 1 40,232 V160 A10,10 0 0 1 50,150 Z', { 'stroke-width': 4, fill: '#fff' }),
  W(chS, 'M80,242 C80,330 120,400 225,404', { 'stroke-width': 4 })];
const phone = [W(chS, 'M186,170 H264 A16,16 0 0 1 280,186 V386 A16,16 0 0 1 264,402 H186 A16,16 0 0 1 170,386 V186 A16,16 0 0 1 186,170 Z', { 'stroke-width': 5, fill: '#fff' }),
  W(chS, 'M204,236 H246 A6,6 0 0 1 252,242 V346 A6,6 0 0 1 246,352 H204 A6,6 0 0 1 198,346 V242 A6,6 0 0 1 204,236 Z', { 'stroke-width': 3 }), W(chS, 'M216,228 H234', { 'stroke-width': 6 })];
const batFill = mk(chS, 'rect', { x: 204, y: 346, width: 42, height: 0, rx: 3, fill: AM });
const chL = [mono(chS, 80, 206, 'AC', { 'text-anchor': 'middle', fill: CH1D, 'font-weight': 600, 'font-size': 22 }), mono(chS, 225, 210, 'DC', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 22 })];
const hS1 = scope($('#hs1'), 720, 196), hS2 = scope($('#hs2'), 720, 196);
mk($('#hs1'), 'line', { x1: 0, y1: 98, x2: 720, y2: 98, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk($('#hs2'), 'line', { x1: 0, y1: 150, x2: 720, y2: 150, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const hT1 = hS1.tr(CH1), hT2 = hS2.tr(AM);
const hL1 = [hS1.lab(14, 26, 'CH1 · WALL SOCKET · AC', CH1), hS1.lab(706, 26, 'FLIPS 50 TIMES A SECOND', CH1, { 'text-anchor': 'end' }), hS1.lab(14, 70, '+', CH1, { 'font-size': 22 }), hS1.lab(14, 140, '-', CH1, { 'font-size': 22 })];
const hL2 = [hS2.lab(14, 26, 'CH2 · PHONE BATTERY NEEDS · DC', AM), hS2.lab(706, 26, 'ONE WAY ONLY', AM, { 'text-anchor': 'end' })];
const tAC0 = wt('H2', 'socket') - 0.2, tDC0 = wt('H3', 'battery') - 0.2;

/* ================= P: one-way flap + diode ================= */
const pS = $('#pS'), PY0 = 156, PY1 = 276, HX = 392;
const pipeBg = mk(pS, 'rect', { x: 40, y: PY0, width: 704, height: PY1 - PY0, fill: '#EAF2FB' });
const pipe = [W(pS, `M40,${PY0} H744`, { 'stroke-width': 5 }), W(pS, `M40,${PY1} H744`, { 'stroke-width': 5 })];
const stopper = mk(pS, 'rect', { x: HX - 22, y: PY1 - 22, width: 14, height: 20, rx: 3, fill: INK });
const flapG = mk(pS, 'g'), flap = W(flapG, `M${HX},${PY0 + 4} V${PY1 - 6}`, { 'stroke-width': 9, stroke: '#B7791F' });
const hinge = mk(pS, 'circle', { cx: HX, cy: PY0 + 4, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const WAT = { fill: '#8DBDEB', stroke: '#3F7CC0', r: 9 };
const wf = [flow(pS, [[52, 194], [732, 194]], 10, WAT), flow(pS, [[52, 240], [732, 240]], 10, WAT)];
const pushA = PUC.arrow(pS, INK, 6, 18), pushL = mono(pS, 392, 112, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 20, fill: INK });
const flapX = mk(pS, 'g'); W(flapX, `M${HX - 30},${PY1 + 22} l18,18 m0,-18 l-18,18`, { stroke: RED, 'stroke-width': 4 });
const flapXL = mono(pS, HX - 2, PY1 + 38, 'SHUT', { fill: RED, 'font-weight': 600, 'font-size': 20 });
const ph = [$('#ph0'), $('#ph1')];
ph[0].querySelector('.v').innerHTML = `Flap opens<span style="color:${MU};font-weight:500">·</span>water flows`;
ph[1].querySelector('.v').innerHTML = `Flap shuts<span style="color:${MU};font-weight:500">·</span>nothing flows`;
const tFw = wt('P2', 'Push'), tBw = wt('P3', 'Push');
// diode card
const dS = $('#dS'), DY = 140;
const dLead = [W(dS, `M120,${DY} H332`), W(dS, `M452,${DY} H664`)];
const dD = diode(dS, 392, DY, 58); dD.tri.setAttribute('stroke-width', 5);
const dLab = [mono(dS, 226, DY - 22, 'ANODE', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18, 'letter-spacing': '.08em' }), mono(dS, 558, DY - 22, 'CATHODE', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18, 'letter-spacing': '.08em' })];
const dI = PUC.arrow(dS, VI, 5, 16), dIL = tx(dS, 512, 238, 'I  only this way', { fill: VI, 'font-size': 22 });
const dX = mk(dS, 'g'); W(dX, 'M180,226 l20,20 m0,-20 l-20,20', { stroke: RED, 'stroke-width': 4 }); mono(dX, 212, 244, 'never backwards', { fill: RED, 'font-weight': 600, 'font-size': 18 });
const pb = [$('#pb0'), $('#pb1')];
pb[0].querySelector('.v').textContent = 'ON · current flows'; pb[1].querySelector('.v').textContent = 'OFF · current blocked';
const tDi = wt('P4', 'diode'), tArr = wt('P5', 'arrow'), tFB = wt('P6', 'forward'), tRB = wt('P7', 'reverse');

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cW = [W(ck, 'M150,256 V150 H362'), W(ck, 'M422,150 H780 V236'), W(ck, zig(780, 236, 364)), W(ck, 'M780,364 V450 H150 V344')];
const src = [mk(ck, 'circle', { cx: 150, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M122,300 C132,276 140,276 150,300 S168,324 178,300')];
const cD = diode(ck, 392, 150, 30);
const pol = [tx(ck, 96, 252, '+', { 'font-size': 30, fill: CH1D }), tx(ck, 98, 372, '-', { 'font-size': 32, fill: CH1D })];
const ckL = [tx(ck, 214, 292, 'AC supply'), mono(ck, 214, 322, '20 V peak', { fill: TE, 'font-weight': 600 }), tx(ck, 392, 100, 'Diode D', { 'text-anchor': 'middle' }),
  vsub(ck, 820, 296, 'R', 'L', { fill: INK, 'font-size': 30 }), mono(ck, 820, 328, '1 kΩ'), mono(ck, 820, 372, 'load', { 'font-size': 18 })];
const dSt = mono(ck, 392, 214, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 20 });
const eB = flow(ck, [[150, 344], [150, 450], [780, 450], [780, 150], [150, 150], [150, 256]], 26, {
  skip: (x, y) => Math.hypot(x - 150, y - 300) < 48 || (x > 756 && x < 804 && y > 232 && y < 368) });
const tPos = wt('B4', 'positive'), tNeg = wt('B6', 'negative');
const nCy = Math.max(1, Math.round((tNeg - tPos) / 4 - 0.58)), PER = (tNeg - tPos) / (nCy + 0.58), OMG = TAU / PER, tA = tPos - 0.04 * PER;
const sig = τ => τ < tA ? 0 : Math.sin(OMG * (τ - tA));
// integral of the half-wave output, for electron speed proportional to current
const intHW = t => { if (t <= tA) return 0; const ph = OMG * (t - tA), n = Math.floor(ph / TAU), r = ph - n * TAU; return (n * 2 + (r < Math.PI ? 1 - Math.cos(r) : 2)) / OMG; };
const SC = scope($('#scS'), 592, 200);
mk($('#scS'), 'line', { x1: 0, y1: 56, x2: 592, y2: 56, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk($('#scS'), 'line', { x1: 0, y1: 170, x2: 592, y2: 170, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const trIn = SC.tr(CH1), trOut = SC.tr(AM);
const sLab = [SC.lab(14, 22, 'CH1 · V IN', CH1), SC.lab(14, 194, 'CH2 · V OUT ACROSS LOAD', AM)];
$('#ro').innerHTML = `<span class="k" style="color:${CH1D}">V<sub>in</sub></span><span class="v" id="rI" style="color:${CH1D}">+0.0</span><span class="u">V</span>
  <span class="k" style="color:#B7791F">V<sub>out</sub></span><span class="v" id="rO" style="color:#B7791F">+0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rC" style="color:${VI}">0.00</span><span class="u">mA</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the diode just throws away the negative half!' });

/* ================= R: derivation ================= */
const rS = $('#rS'), RX = 70, RWd = 560, RY = 330, RA = 150, CYC = 2;
const rAx = [W(rS, `M${RX - 10},${RY} H${RX + RWd + 14}`, { 'stroke-width': 2.5 }), W(rS, `M${RX},${RY - RA - 40} V${RY + RA + 30}`, { 'stroke-width': 2.5 })];
const rIn = W(rS, wave(RX, RWd, RY, RA, CYC), { stroke: CH1, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const rFill = mk(rS, 'path', { d: area(RX, RWd, RY, RA, CYC, HW), fill: C.ac2 });
const rOut = W(rS, wave(RX, RWd, RY, RA, CYC, HW), { stroke: TE, 'stroke-width': 5 });
const rPk = mk(rS, 'line', { x1: RX, y1: RY - RA, x2: RX + RWd + 10, y2: RY - RA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rPkL = vsub(rS, RX + RWd + 22, RY - RA + 8, 'V', 'm', { 'font-size': 24 });
const rLeg = [mk(rS, 'line', { x1: 380, y1: 84, x2: 420, y2: 84, stroke: CH1, 'stroke-width': 3, 'stroke-dasharray': '8 6' }), mono(rS, 430, 91, 'input'), mk(rS, 'line', { x1: 540, y1: 84, x2: 580, y2: 84, stroke: TE, 'stroke-width': 5 }), mono(rS, 590, 91, 'output')];
const rZero = [mono(rS, RX + RWd * 3 / 8, RY + 44, 'ZERO', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 }), mono(rS, RX + RWd * 7 / 8, RY + 44, 'ZERO', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 })];
const HUMP = 2 / Math.PI, HWd = RWd / CYC / 2;
const rRect = mk(rS, 'rect', { x: RX, y: RY - RA * HUMP, width: HWd, height: RA * HUMP, fill: 'none', stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const rRectL = mono(rS, RX + 8, RY - RA * HUMP - 12, '2Vm/π', { fill: TE, 'font-weight': 600, 'font-size': 20 });
const rAvg = mk(rS, 'line', { x1: RX, y1: RY - RA / Math.PI, x2: RX + RWd + 10, y2: RY - RA / Math.PI, stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const rAvgL = [mono(rS, RX + RWd + 22, RY - RA / Math.PI + 2, 'Vdc', { fill: TE, 'font-weight': 600, 'font-size': 20 }), mono(rS, RX + RWd + 22, RY - RA / Math.PI + 26, '0.318', { fill: TE, 'font-weight': 600, 'font-size': 18 })];
const rRows = steps($('#rSteps'), [
  [K(`${Vo} = ${Vm}\\sin\\omega t`), 'positive half', 76],
  [K(`${Vo} = 0`), 'negative half', 160],
  [K(`\\text{one hump: } \\bar{v} = \\dfrac{2${Vm}}{\\pi}`), '', 244],
  [K(`${Vdc} = \\dfrac{1}{2}\\cdot\\dfrac{2${Vm}}{\\pi} = \\dfrac{${Vm}}{\\pi} \\approx 0.318\\,${Vm}`), '', 344],
  [K(`${Idc} = \\dfrac{${Im}}{\\pi}`), 'same rule for current', 448]]);
const rBox = $('#rBox'); rBox.style.top = '330px'; rBox.style.height = '100px';
const tRs = [wt('R3', 'In'), wt('R4', 'In'), wt('R5', 'One'), wt('R7', 'V'), wt('R8', 'I')];
const tSquash = wt('R6', 'cut') - 0.3;
const avR = PUC.avatar($('#sR'), { x: 1008, y: 770, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Less than a third of the peak? That is not much DC!' });

/* ================= K: key numbers ================= */
const kS = $('#kS');
const kW = [W(kS, 'M110,134 V70 H290'), W(kS, 'M350,70 H620 V126'), W(kS, zig(620, 126, 214, 5)), W(kS, 'M620,214 V270 H110 V206')];
const kSrc = [mk(kS, 'circle', { cx: 110, cy: 170, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(kS, 'M88,170 C96,151 102,151 110,170 S124,189 132,170')];
const kD = diode(kS, 320, 70, 30); PUC.attr(kD.tri, 'fill', OFFG);
const kPol = [tx(kS, 58, 140, '-', { 'font-size': 32, fill: CH1D }), tx(kS, 56, 222, '+', { 'font-size': 30, fill: CH1D })];
const kRL = vsub(kS, 652, 178, 'R', 'L', { fill: INK, 'font-size': 26 });
const kPA = PUC.arrow(kS, TE, 4, 14), kPB = PUC.arrow(kS, TE, 4, 14);
const kPL = [mono(kS, 320, 160, 'full peak Vm, backwards', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 20 }), mono(kS, 320, 186, 'OFF · BLOCKS', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 })];
const KSW = 720, KSH = 230, kSc = scope($('#kScope'), KSW, KSH), KC = 3;
const kIn = W($('#kScope'), wave(10, KSW - 20, 66, 44, KC), { stroke: CH1, 'stroke-width': 4 });
const kOut = W($('#kScope'), wave(10, KSW - 20, 200, 60, KC, HW), { stroke: AM, 'stroke-width': 4 });
const kTick = [1, 2].map(i => mk($('#kScope'), 'line', { x1: 10 + (KSW - 20) * i / KC, y1: 8, x2: 10 + (KSW - 20) * i / KC, y2: KSH - 8, stroke: '#8FA3C8', 'stroke-width': 2, 'stroke-dasharray': '4 6' }));
const kNum = [0, 1, 2].map(i => kSc.lab(10 + (KSW - 20) * (i + 0.25) / KC, 150, String(i + 1), AM, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600 }));
const kSL = [kSc.lab(KSW - 12, 24, 'CH1 · 3 CYCLES IN', CH1, { 'text-anchor': 'end' }), kSc.lab(KSW - 12, 222, 'CH2 · 3 HUMPS OUT', AM, { 'text-anchor': 'end' })];
const KT = [['PEAK INVERSE VOLTAGE', K(`\\text{PIV} = ${Vm}`), 'the blocked diode must survive it'],
  ['OUTPUT FREQUENCY', K('f_{out} = f_{in}'), '50 Hz in, 50 Hz out'],
  ['MAXIMUM EFFICIENCY', K('\\eta_{max} = 40.6\\%'), '']];
$('#kTiles').innerHTML = KT.map(([k, f, w], i) => `<div class="kt" style="top:${76 + i * 170}px"><div class="k">${k}</div><div class="f">${f}</div>${w ? `<div class="w">${w}</div>` : '<div class="bar"><i></i></div><div class="w">of the power</div>'}</div>`).join('');
const kT = [...$('#kTiles').children];
const tKt = [wt('K3', 'peak'), wt('K4', 'output'), wt('K5', 'forty')];

/* ================= W: worked example ================= */
const wS = $('#wS'), WX = 70, WWd = 560, WY = 300, WA = 180, WC = 2.5;
const wAx = [W(wS, `M${WX - 10},${WY} H${WX + WWd + 14}`, { 'stroke-width': 2.5 }), W(wS, `M${WX},${WY - WA - 20} V${WY + 16}`, { 'stroke-width': 2.5 })];
const wFill = mk(wS, 'path', { d: area(WX, WWd, WY, WA, WC, HW), fill: C.ac2 });
const wOut = W(wS, wave(WX, WWd, WY, WA, WC, HW), { stroke: TE, 'stroke-width': 5 });
const wPk = mk(wS, 'line', { x1: WX, y1: WY - WA, x2: WX + WWd + 10, y2: WY - WA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wPkL = mono(wS, WX + WWd + 22, WY - WA + 7, '20 V', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const wAvg = mk(wS, 'line', { x1: WX, y1: WY - WA / Math.PI, x2: WX + WWd + 10, y2: WY - WA / Math.PI, stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const wAvgL = mono(wS, WX + WWd + 22, WY - WA / Math.PI + 7, '6.37 V', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const WT = [['V DC', TE, 6.366, 2, 'V'], ['I DC', VI, 6.366, 2, 'mA'], ['PIV', TE, 20, 0, 'V'], ['OUTPUT FREQUENCY', INK, 50, 0, 'Hz']];
$('#wTiles').innerHTML = WT.map(([k, c], i) => `<div class="wt" style="left:${32 + (i % 2) * 372}px;top:${366 + Math.floor(i / 2) * 112}px"><div class="k">${k}</div><div class="v" style="color:${c}"><span>0</span><small>${WT[i][4]}</small></div></div>`).join('');
const wT = [...$('#wTiles').children];
const wRows = steps($('#wSteps'), [
  [K(`${Vm} = 20\\,\\text{V},\\ R_L = 1\\,\\text{k}\\Omega,\\ f = 50\\,\\text{Hz}`), '', 80],
  [K(`${Vdc} = \\dfrac{20}{\\pi} \\approx 6.37\\,\\text{V}`), '', 170],
  [K(`${Idc} = \\dfrac{6.37\\,\\text{V}}{1000\\,\\Omega} \\approx 6.37\\,\\text{mA}`), '', 272],
  [K(`\\text{PIV} = ${Vm} = 20\\,\\text{V}`), '', 374],
  [K(`f_{out} = f_{in} = 50\\,\\text{Hz}`), 'one hump per cycle', 460]], { fs: 30 });
const wBox = $('#wBox'); wBox.style.top = '156px'; wBox.style.height = '96px';
const tWs = [wt('W1', 'The'), wt('W3', 'V'), wt('W4', 'I'), wt('W5', 'The'), wt('W6', 'And')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Half-wave output frequency = 100 Hz', right: 'One hump per cycle: 50 Hz in, 50 Hz out', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcIn = W(tcS, wave(40, 480, 108, 40, 2), { stroke: CH1D, 'stroke-width': 4 });
const tcOut = W(tcS, wave(40, 480, 250, 60, 2, HW), { stroke: AM, 'stroke-width': 4 });
const tcAx = [W(tcS, 'M36,108 H524', { 'stroke-width': 2, stroke: '#CBD0DA' }), W(tcS, 'M36,250 H524', { 'stroke-width': 2, stroke: '#CBD0DA' })];
const tcN = [0, 1].map(i => mono(tcS, 40 + 240 * i + 60, 236 - 64, String(i + 1), { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 700, 'font-size': 24 }));
const tcL = [mono(tcS, 548, 114, '2 CYCLES IN', { fill: CH1D, 'font-weight': 600 }), mono(tcS, 548, 236, '2 HUMPS OUT', { fill: '#B7791F', 'font-weight': 600 }), mono(tcS, 548, 264, 'same frequency', { 'font-size': 18 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'], type: 'Draw the circuit and waveforms · find V<sub>dc</sub>, PIV and the output frequency' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `The voltage <i>v</i> = 30 sin(100π<i>t</i>) V feeds a half-wave rectifier with an ideal diode and a 2&nbsp;kΩ load. Find the DC load current and the output frequency.`,
  opts: [K('9.55\\,\\text{mA},\\ 100\\,\\text{Hz}'), K('4.77\\,\\text{mA},\\ 50\\,\\text{Hz}'), K('4.77\\,\\text{mA},\\ 100\\,\\text{Hz}'), K('7.5\\,\\text{mA},\\ 50\\,\\text{Hz}')], right: 1, optW: 474, optY: 344 });
const sol = PUC.solution($('#so'), [[K(`${Vm} = 30\\,\\text{V},\\ \\omega = 100\\pi`)], [K(`${Vdc} = \\dfrac{30}{\\pi} \\approx 9.55\\,\\text{V}`)],
  [K(`${Idc} = \\dfrac{9.55}{2000} \\approx 4.77\\,\\text{mA}`)], [K(`f = \\dfrac{\\omega}{2\\pi} = 50\\,\\text{Hz}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A2', 'So'), wt('A3', 'Divide'), wt('A4', 'Omega')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 504, y0: 90, dy: 112, title: 'Half-wave rectifier · formula card', txt: [0, 0, 1, 1],
  lines: [K(`${Vdc} = \\dfrac{${Vm}}{\\pi} \\approx 0.318\\,${Vm} \\qquad ${Idc} = \\dfrac{${Im}}{\\pi}`),
    K(`\\text{PIV} = ${Vm} \\qquad f_{out} = f_{in}`),
    'Forward biased: conducts · Reverse biased: blocks',
    'One hump per input cycle · maximum efficiency 40.6%'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 43', topic: 'Full-wave and bridge rectifiers', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tB6 = T0('B6'), tB8 = T0('B8');
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tB6, 1.08, 600, 430], [tB8, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const pLw = document.createElement('div'); pLw.style.cssText = 'position:absolute;left:0;top:0;width:1920px;height:1080px'; $('#sP').insertBefore(pLw, $('#pL')); pLw.appendChild($('#pL'));

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gB = t >= tB + 0.4 && t < tT, gW = t >= tW && t < tX;
  M.vis(ghost, t, gB ? tB + 0.5 : tW + 0.2, gB ? tT - 0.4 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gB && !gW) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(sock, t, tMorph + 0.6, 0.4, 0.12); drawSeq(brick, t, tMorph + 0.9, 0.4, 0.15); drawSeq(phone, t, tMorph + 1.3, 0.4, 0.12);
    fadeAt([chL[0]], t, tAC0); fadeAt([chL[1]], t, tDC0);
    const ch = M.clamp((t - tDC0) / 6); PUC.attr(batFill, 'height', (100 * ch).toFixed(1)); PUC.attr(batFill, 'y', (346 - 100 * ch).toFixed(1)); M.hide(batFill, ch <= 0);
    M.vis($('#aPill'), t, wt('H4', 'turn') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hS'), t, tAC0 - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hSlow'), t, tAC0 + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const om = TAU * 0.5;
    hT1(τ => 62 * Math.sin(om * (τ - tAC0)), t, tAC0, 4, 98, t >= tAC0);
    fadeAt(hL1.slice(0, 1), t, tAC0); fadeAt(hL1.slice(1), t, wt('H2', 'fifty') - 0.1, 0.1);
    hT2(() => 62, t, tDC0, 4, 150, t >= tDC0); fadeAt(hL2, t, tDC0, 0.3);
    M.vis($('#hQ'), t, T0('H4') + 0.1, 1e9, { dy: 20 });
  }

  /* P: one-way flap + diode */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    pLw.style.transform = `translateX(${(408 * (1 - M.spring(t - tDi + 0.4, M.HEAVY))).toFixed(1)}px)`;
    M.vis($('#pL'), t, tP + 0.1, out, { dy: 36, ...o }); M.vis($('#pR'), t, tDi - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(pipeBg, t, tP + 0.4, 1e9, { dy: 0, fade: 0.3 }); drawSeq(pipe, t, tP + 0.4, 0.5, 0.1);
    M.vis(stopper, t, tP + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(hinge, t, tP + 0.8, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(flapG, t, wt('P1', 'flap') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    // flap angle: open while pushed forward, shut when pushed back
    const open = M.spring(t - tFw - 0.15, M.SNAP) * (1 - M.spring(t - tBw - 0.15, M.SNAP) * (t >= tBw ? 1 : 0));
    PUC.attr(flapG, 'transform', `rotate(${(-78 * Math.max(0, open)).toFixed(2)} ${HX} ${PY0 + 4})`);
    const xF = 140 * (M.clamp(t, tFw, tBw) - tFw) - 30 * M.io((t - tBw) / 0.5);
    wf.forEach((f, k) => f.set(xF + k * 34, t >= tP + 0.6));
    const fwd = t >= tFw - 0.2 && t < tBw - 0.2, bwd = t >= tBw - 0.2;
    if (fwd) { const a = M.io((t - tFw + 0.2) / 0.4); pushA.set(300, 120, 300 + 190 * a, 120); M.setT(pushL, ''); }
    else if (bwd) { const a = M.io((t - tBw + 0.2) / 0.4); pushA.set(490, 120, 490 - 190 * a, 120); }
    else pushA.set(0, 0, 0, 0);
    M.vis(flapX, t, wt('P3', 'slams') + 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(flapXL, t, wt('P3', 'slams') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    ph.forEach((e, i) => { M.vis(e, t, tP + 0.7 + i * 0.12, 1e9, { dy: 16 }); lit(e, M.io((t - (i ? tBw : tFw)) / 0.3), i ? RED : C.ok, i ? RED : C.ok); });
    // diode
    drawSeq(dLead, t, tDi - 0.1, 0.4, 0.1); M.draw(dD.tri, t, tDi + 0.1, 0.5); M.draw(dD.bar, t, tDi + 0.4, 0.3);
    fadeAt(dLab, t, tDi + 0.5, 0.15);
    const ia = M.io((t - tArr) / 0.45); dI.set(300, 236, 300 + 190 * ia, 236); M.hide(dI.g, ia <= 0.02); M.vis(dIL, t, tArr + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(dX, t, wt('P5', 'only'), 1e9, { dy: 0, fade: 0.2 });
    const on = M.io((t - tFB) / 0.3) * (1 - M.io((t - tRB) / 0.3));
    PUC.attr(dD.tri, 'fill', t >= tRB ? M.mix('#FFFFFF', OFFG, M.io((t - tRB) / 0.3)) : M.mix('#FFFFFF', AM, on));
    pb.forEach((e, i) => { M.vis(e, t, (i ? tRB : tFB) - 0.2, 1e9, { dy: 16 }); lit(e, M.io((t - (i ? tRB : tFB)) / 0.3), i ? RED : '#B7791F', i ? RED : '#B7791F'); });
    M.vis($('#pStrip'), t, wt('P8', 'rectification') - 0.3, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    const tB2 = T0('B2');
    drawSeq(cW, t, tB2, 0.45, 0.16); drawSeq(src, t, tB2 + 0.1, 0.35, 0.15); M.draw(cD.tri, t, wt('B2', 'diode') - 0.1, 0.4); M.draw(cD.bar, t, wt('B2', 'diode') + 0.2, 0.25);
    fadeAt(ckL.slice(0, 2), t, wt('B2', 'AC') - 0.1); fadeAt(ckL.slice(2, 3), t, wt('B2', 'diode')); fadeAt(ckL.slice(3), t, wt('B2', 'resistor') - 0.1, 0.1);
    M.vis($('#ckE'), t, tA, 1e9, { dy: 0, fade: 0.2 });
    const s = sig(t), on = t >= tA && s > 0;
    PUC.attr(cD.tri, 'fill', t < tA ? '#FFFFFF' : (on ? AM : OFFG));
    M.setT(dSt, t < tA ? '' : (on ? 'ON · FORWARD BIASED' : 'OFF · REVERSE BIASED')); PUC.attr(dSt, 'fill', on ? '#B7791F' : RED);
    pol.forEach((p, i) => { M.vis(p, t, tA, 1e9, { dy: 0, fade: 0.15 }); M.setT(p, (s >= 0) === (i === 0) ? '+' : '-'); });
    eB.set(150 * intHW(t), t >= tA);
    trIn(τ => 40 * sig(τ), t, tA, 2 * PER, 56, t >= tA); trOut(τ => 62 * Math.max(0, sig(τ)), t, tA, 2 * PER, 170, t >= tA);
    fadeAt(sLab, t, tA, 0.3);
    M.vis($('#slowT'), t, tA + 0.5, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.setT($('#rI'), (s >= 0 ? '+' : '') + (20 * s).toFixed(1)); M.setT($('#rO'), '+' + (20 * Math.max(0, s)).toFixed(1)); M.setT($('#rC'), (20 * Math.max(0, s)).toFixed(2));
    M.vis($('#ro'), t, tA - 0.2, 1e9, { dy: 12 });
    avB(t, wt('B9', 'never') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tR; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tR - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'It') - 0.05, { out: tR - 0.35, outDur: 0.25 }); }

  /* R: derivation */
  const rOn = t >= tR - 0.05 && t < tK + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tK - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(rAx, t, tR + 0.4, 0.4, 0.1); M.draw(rIn, t, tR + 0.7, 1.4, M.o3); fadeAt(rLeg.slice(0, 2), t, tR + 0.8);
    M.vis(rPk, t, wt('R2', 'peak') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(rPkL, t, wt('R2', 'peak'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(rOut, t, tRs[0] - 0.1, 2.6, M.clamp); fadeAt(rLeg.slice(2), t, tRs[0]);
    M.vis(rFill, t, tRs[0] + 0.8, 1e9, { dy: 0, fade: 0.3 });
    fadeAt(rZero, t, tRs[1] + 0.1, 0.2);
    // hump average, then spread over the whole cycle
    M.vis(rRect, t, tRs[2] + 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(rRectL, t, tRs[2] + 0.3, tSquash, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 });
    const sq = M.io((t - tSquash) / 1.2);
    PUC.attr(rRect, 'width', (HWd * (1 + sq)).toFixed(1)); PUC.attr(rRect, 'height', (RA * HUMP * (1 - sq / 2)).toFixed(1)); PUC.attr(rRect, 'y', (RY - RA * HUMP * (1 - sq / 2)).toFixed(1));
    M.draw(rAvg, t, tRs[3] - 0.2, 0.7); fadeAt(rAvgL, t, tRs[3] + 0.3, 0.15);
    runSteps(rRows, t, tRs);
    M.vis(rBox, t, tRs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avR(t, wt('R8', 'Current') - 0.2, out);
  }

  /* K: key numbers */
  const kOn = t >= tK - 0.05 && t < tW + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tW - 0.32;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    const tk2 = T0('K2');
    drawSeq(kW, t, tK + 0.4, 0.4, 0.12); drawSeq(kSrc, t, tK + 0.5, 0.3, 0.12); M.draw(kD.tri, t, tK + 0.7, 0.35); M.draw(kD.bar, t, tK + 0.9, 0.2);
    fadeAt([...kPol, kRL], t, tk2, 0.1);
    const a = M.io((t - wt('K2', 'full') + 0.1) / 0.5); kPA.set(320, 118, 320 - 50 * a, 118); kPB.set(320, 118, 320 + 50 * a, 118); M.hide(kPA.g, a < 0.05); M.hide(kPB.g, a < 0.05);
    fadeAt(kPL, t, wt('K2', 'full') + 0.2, 0.3);
    const tk4 = T0('K4');
    M.draw(kIn, t, tk4 - 0.3, 1.6, M.clamp); M.draw(kOut, t, tk4 - 0.1, 1.6, M.clamp);
    kTick.forEach((e, i) => M.vis(e, t, tk4 + 0.3 + i * 0.5, 1e9, { dy: 0, fade: 0.2 }));
    kNum.forEach((e, i) => M.vis(e, t, tk4 + 0.2 + i * 0.5, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    fadeAt(kSL, t, wt('K4', 'One'), 0.4);
    kT.forEach((e, i) => { M.vis(e, t, tK + 0.5 + i * 0.12, 1e9, { dy: 16 });
      const u = M.io((t - tKt[i]) / 0.3); e.style.background = M.mix(C.soft, '#FFFFFF', u); e.style.borderColor = M.mix(C.soft, AM, u);
      [e.querySelector('.f'), e.querySelector('.w')].forEach(x => x && (x.style.opacity = (0.15 + 0.85 * u).toFixed(3))); });
    const bar = kT[2].querySelector('.bar i'); bar.style.width = (240 * 0.406 * M.o3((t - tKt[2] - 0.3) / 1.2)).toFixed(1) + 'px';
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
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not') - 0.2, tRight: wt('X3', 'One') - 0.1 });
    drawSeq(tcAx, t, tX + 0.5, 0.3, 0.1); M.draw(tcIn, t, tX + 0.7, 1.2, M.clamp); M.vis(tcL[0], t, tX + 1.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(tcOut, t, wt('X3', 'One') - 0.1, 1.2, M.clamp);
    tcN.forEach((e, i) => M.vis(e, t, wt('X3', 'One') + 0.1 + i * 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    fadeAt(tcL.slice(1), t, wt('X3', 'Fifty') - 0.1, 0.3);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'NEET'), wt('X4', 'PUC'), wt('X4', 'CBSE'), wt('X4', 'ISC')], tType: wt('X4', 'Draw') - 0.2 });
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
