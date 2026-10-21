// PUC Electronics Ep 10 - Kirchhoff's current and voltage laws ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'phone') - 0.2;
const tK = T0('K1'), tB = T0('C1'), tD = T0('D1'), tL = T0('L1'), tV = T0('V1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const ebS = $('#ebS');
// extension board with two plugs: a desk lamp and a phone charger
const eb = [W(ebS, 'M40,380 H300 A16,16 0 0 1 316,396 V430 A16,16 0 0 1 300,446 H40 A16,16 0 0 1 24,430 V396 A16,16 0 0 1 40,380 Z', { fill: '#fff' }),
  W(ebS, 'M24,413 H4', { 'stroke-width': 5 })];
const sock = [[110, 413], [230, 413]].map(([x, y]) => mk(ebS, 'circle', { cx: x, cy: y, r: 20, fill: C.soft, stroke: INK, 'stroke-width': 3 }));
const cords = [W(ebS, 'M110,393 V320 C110,290 90,280 90,250', { 'stroke-width': 3 }), W(ebS, 'M230,393 V300 C230,280 250,270 250,250', { 'stroke-width': 3 })];
const lamp = [W(ebS, 'M90,250 V150', { 'stroke-width': 5 }), W(ebS, 'M90,150 L60,96', { 'stroke-width': 5 }), W(ebS, 'M30,120 L76,60 L118,100 Z', { fill: '#fff' }), W(ebS, 'M50,250 H130', { 'stroke-width': 6 })];
const lampGlow = mk(ebS, 'path', { d: 'M38,122 L76,72 L108,102 Z', fill: AM, opacity: 0 });
const phone = [W(ebS, 'M222,120 H278 A10,10 0 0 1 288,130 V240 A10,10 0 0 1 278,250 H222 A10,10 0 0 1 212,240 V130 A10,10 0 0 1 222,120 Z', { fill: '#fff' })];
const phScr = mk(ebS, 'rect', { x: 222, y: 136, width: 56, height: 96, rx: 4, fill: C.ac2 });
const batBar = mk(ebS, 'rect', { x: 236, y: 170, width: 0, height: 26, rx: 3, fill: AM });
const ebL = [mono(ebS, 110, 486, 'lamp', { 'text-anchor': 'middle' }), mono(ebS, 230, 486, 'charger', { 'text-anchor': 'middle' })];
// junction sketch
const jS = $('#jS');
const jW = [W(jS, 'M60,300 H360'), W(jS, 'M360,300 L520,170 H640'), W(jS, 'M360,300 L520,430 H640')];
const jN = node(jS, 360, 300);
const jEnd = [[690, 170, 'bulb'], [690, 430, 'zap']].map(([x, y]) => mk(jS, 'circle', { cx: x, cy: y, r: 50, fill: '#fff', stroke: INK, 'stroke-width': 4 }));
const jIco = [['bulb', 690, 170], ['zap', 690, 430]].map(([ic, x, y]) => { const f = mk(jS, 'foreignObject', { x: x - 22, y: y - 22, width: 44, height: 44 }); f.innerHTML = M.icon(ic, 44, INK, 2.2); return f; });
const jA = [PUC.arrow(jS, VI), PUC.arrow(jS, VI), PUC.arrow(jS, VI)];
const jQ = [mono(jS, 150, 270, 'I = ? A', { fill: VI, 'font-size': 26, 'font-weight': 600 }), mono(jS, 540, 146, '? A', { fill: VI, 'font-size': 26, 'font-weight': 600 }), mono(jS, 540, 474, '? A', { fill: VI, 'font-size': 26, 'font-weight': 600 })];
const jE = [flow(jS, [[640, 170], [520, 170], [360, 300], [60, 300]], 0, { skip: () => false }), flow(jS, [[640, 430], [520, 430], [360, 300]], 0)];

/* ================= K: kirchhoff ================= */
$('#kZ').innerHTML = M.icon('zap', 34, AM, 2.4);
const kT = [0, 1].map(i => $('#kt' + i)), kSv = kT.map(d => d.querySelector('svg'));
const kG0 = [W(kSv[0], 'M420,116 H540'), W(kSv[0], 'M540,116 L640,60'), W(kSv[0], 'M540,116 L640,172')];
node(kSv[0], 540, 116);
const kG1 = [W(kSv[1], 'M440,56 H640 V176 H440 Z'), W(kSv[1], 'M500,116 A40,40 0 1 1 540,156', { stroke: AM, 'stroke-dasharray': '8 8' })];
const kG1h = mk(kSv[1], 'path', { d: 'M540,156 L526,146 L526,166 Z', fill: AM });
const tLaw = [wt('K3', 'junctions'), wt('K3', 'loops')];

/* ================= B: breadboard KCL ================= */
const ck = $('#ckS');
const ckW = [W(ck, 'M150,262 V120 H760 V220'), W(ck, 'M760,340 V440 H150 V298'), W(ck, 'M500,120 V220'), W(ck, 'M500,340 V440')];
const ckBat = [W(ck, 'M115,262 H185', { 'stroke-width': 5 }), W(ck, 'M132,298 H168', { 'stroke-width': 9 })];
const ckR = [W(ck, zigV(500, 220, 340)), W(ck, zigV(760, 220, 340))];
const knob = PUC.arrow(ck, INK, 3, 14);
const ckN = [node(ck, 500, 120), node(ck, 500, 440)];
const ckP = tx(ck, 516, 104, 'P', { 'font-size': 28, 'font-weight': 700 });
const ckLab = [tx(ck, 64, 258, '+', { 'font-size': 28 }), tx(ck, 68, 316, '-', { 'font-size': 30 }), tx(ck, 204, 274, 'Battery'), mono(ck, 204, 302, '12 V', { fill: TE, 'font-weight': 600 }),
  tx(ck, 532, 276, 'R₁', { 'font-style': 'italic' }), mono(ck, 532, 304, '12 Ω'), tx(ck, 800, 276, 'R₂', { 'font-style': 'italic' })];
const r2L = mono(ck, 800, 304, '6.0 Ω', { fill: INK, 'font-weight': 600 });
const ckIA = [PUC.arrow(ck, VI), PUC.arrow(ck, VI), PUC.arrow(ck, VI)];
const ckIL = [tx(ck, 360, 96, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), tx(ck, 436, 196, 'I₁', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), tx(ck, 700, 96, 'I₂', { fill: VI, 'font-style': 'italic', 'font-size': 28 })];
const tB1 = tB + 0.2, tFlow = wt('C3', 'Follow') - 0.2, tKn = wt('C6', 'turn'), tKn1 = tKn + 2.4;
const R2 = keys([[tKn, 6], [tKn1, 3]]);
const I1f = () => 1, I2f = t => 12 / R2(t), If = t => I1f(t) + I2f(t);
const SPD = 40; // px per second per ampere (dot density is the same on every wire, so dot flux shows current)
const skB = (x, y) => (Math.abs(x - 500) < 3 || Math.abs(x - 760) < 3) && y > 214 && y < 346;
const eA = flow(ck, [[150, 298], [150, 440], [500, 440]], 0, { skip: skB }),
  e1 = flow(ck, [[500, 440], [500, 120]], 0, { skip: skB }),
  e2 = flow(ck, [[500, 440], [760, 440], [760, 120], [500, 120]], 0, { skip: skB }),
  eB = flow(ck, [[500, 120], [150, 120], [150, 262]], 0, { skip: skB });
const SC = scope($('#scS'), 592, 200);
const trIn = SC.tr(CH1, 10), trOut = SC.tr(AM, 4);
const sLab = [SC.lab(14, 26, 'CH1 · I INTO P', CH1), SC.lab(578, 26, 'CH2 · I₁ + I₂ OUT OF P', AM, { 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>1</sub></span><span class="v" id="rI1" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>2</sub></span><span class="v" id="rI2" style="color:${VI}">0.00</span><span class="u">A</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So nothing leaks out at the junction!' });

/* ================= D: KCL derivation ================= */
const dS = $('#dS');
const dW = [W(dS, 'M40,230 H380'), W(dS, 'M380,230 L560,120 H744'), W(dS, 'M380,230 L560,340 H744')];
const dN = node(dS, 380, 230); const dP = tx(dS, 372, 290, 'P', { 'font-size': 30, 'font-weight': 700 });
const dA = [PUC.arrow(dS, VI), PUC.arrow(dS, VI), PUC.arrow(dS, VI)];
const dAL = [tx(dS, 110, 196, 'I = 3 A', { fill: VI, 'font-size': 26 }), tx(dS, 590, 92, 'I₁ = 1 A', { fill: VI, 'font-size': 26 }), tx(dS, 590, 386, 'I₂ = 2 A', { fill: VI, 'font-size': 26 })];
const dE = [flow(dS, [[744, 120], [560, 120], [380, 230]], 6), flow(dS, [[744, 340], [560, 340], [380, 230]], 6), flow(dS, [[380, 230], [40, 230]], 9)];
$('#dRo').innerHTML = `<span class="k n" style="color:${OR}">CHARGE IN, EACH SECOND</span><span class="v" id="dQi" style="color:${OR}">3.0</span><span class="u">C</span>
  <span class="k n" style="color:${OR}">CHARGE OUT, EACH SECOND</span><span class="v" id="dQo" style="color:${OR}">3.0</span><span class="u">C</span>
  <span class="ln"></span>
  <span class="k n">PILED UP AT P</span><span class="v" id="dQp">0.0</span><span class="u">C</span>`;
const dRoR = [...$('#dRo').children];
const dSt = [
  [K(`\\sum ${kI('I_{\\text{in}}')} = \\sum ${kI('I_{\\text{out}}')}`), 'at any junction', 84],
  [K(`\\text{in} \\to +,\\quad \\text{out} \\to -`), 'sign rule', 180],
  [K(`\\sum ${kI('I')} = 0`), 'current law (KCL)', 272],
  [K(`${kI('I')} - ${kI('I_1')} - ${kI('I_2')} = 0`), 'at P', 366],
  [K(`${kI('I')} = ${kI('I_1')} + ${kI('I_2')}`), 'in = out', 466]];
$('#dSteps').innerHTML = dSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const dR = [...$('#dSteps').children];
const tDs = [wt('D2', 'At'), wt('D4', 'Call'), wt('D4', 'Then'), wt('D5', 'Here'), wt('D5', 'So')];

/* ================= L: breadboard KVL ================= */
const lk = $('#lkS');
const lkW = [W(lk, 'M150,262 V120 H380'), W(lk, 'M520,120 H760 V220'), W(lk, 'M760,340 V440 H150 V298')];
const lkBat = [W(lk, 'M115,262 H185', { 'stroke-width': 5 }), W(lk, 'M132,298 H168', { 'stroke-width': 9 })];
const lkR = [W(lk, zigH(120, 380, 520)), W(lk, zigV(760, 220, 340))];
const lkA = node(lk, 150, 440);
const lkLab = [tx(lk, 64, 258, '+', { 'font-size': 28 }), tx(lk, 68, 316, '-', { 'font-size': 30 }), tx(lk, 204, 274, 'Battery'), mono(lk, 204, 302, '12 V', { fill: TE, 'font-weight': 600 }),
  tx(lk, 412, 84, 'R₁', { 'font-style': 'italic' }), mono(lk, 446, 84, '2 Ω'), tx(lk, 800, 276, 'R₂', { 'font-style': 'italic' }), mono(lk, 800, 304, '4 Ω'),
  tx(lk, 112, 484, 'A', { 'font-size': 28, 'font-weight': 700 })];
const lkI = PUC.arrow(lk, VI), lkIL = tx(lk, 330, 488, 'I = 2 A', { fill: VI, 'font-size': 26 });
const skL = (x, y) => (Math.abs(y - 120) < 3 && x > 376 && x < 524) || (Math.abs(x - 760) < 3 && y > 214 && y < 346) || (Math.abs(x - 150) < 3 && y > 262 && y < 298);
const lkE = flow(lk, [[150, 298], [150, 440], [760, 440], [760, 120], [150, 120], [150, 262]], 0, { skip: skL });
// the probe walks clockwise from A (along I): up through the cell, across R1, down R2, back to A
const PW = [[150, 440], [150, 298], [150, 262], [150, 120], [380, 120], [520, 120], [760, 120], [760, 220], [760, 340], [760, 440], [150, 440]];
const PL = [0]; for (let i = 1; i < PW.length; i++) PL.push(PL[i - 1] + Math.hypot(PW[i][0] - PW[i - 1][0], PW[i][1] - PW[i - 1][1]));
const LT = PL[PL.length - 1];
const posAt = s => { s = M.clamp(s, 0, LT); for (let i = 1; i < PL.length; i++) if (s <= PL[i] + 1e-6) { const u = (s - PL[i - 1]) / (PL[i] - PL[i - 1]); return [PW[i - 1][0] + (PW[i][0] - PW[i - 1][0]) * u, PW[i - 1][1] + (PW[i][1] - PW[i - 1][1]) * u]; } return PW[0]; };
const Vat = s => { // potential relative to A along the walk
  if (s <= PL[1]) return 0; if (s <= PL[2]) return 12 * (s - PL[1]) / (PL[2] - PL[1]); if (s <= PL[4]) return 12;
  if (s <= PL[5]) return 12 - 4 * (s - PL[4]) / (PL[5] - PL[4]); if (s <= PL[7]) return 8; if (s <= PL[8]) return 8 - 8 * (s - PL[7]) / (PL[8] - PL[7]); return 0; };
const probeW = mk(lk, 'g'), probe = mk(probeW, 'g'); mk(probe, 'circle', { r: 16, fill: '#fff', stroke: TE, 'stroke-width': 4 }); mk(probe, 'circle', { r: 6, fill: TE });
const tWalk = wt('L3', 'walk'), tCl = wt('L4', 'climbs'), tR1 = wt('L5', 'drops'), tR2 = wt('L6', 'drops'), tBack = wt('L7', 'Back');
const S = keys([[tWalk, 0], [tCl - 0.5, PL[1]], [tCl + 0.6, PL[2]], [tR1 - 0.6, PL[4]], [tR1 + 0.6, PL[5]], [tR2 - 0.6, PL[7]], [tR2 + 0.6, PL[8]], [tBack + 0.9, LT]]);
const LS = scope($('#lsS'), 592, 200);
const lsY = v => 176 - v * 11.5, lsX = s => 8 + 576 * s / LT;
const lsTr = LS.path(CH1, 4); const lsDot = mk($('#lsS'), 'circle', { r: 7, fill: CH1 });
const lsLab = [LS.lab(14, 26, 'CH1 · V AT PROBE (FROM A)', CH1)];
const lsNote = [LS.lab(lsX(PL[2]) + 10, lsY(6), '+12 V', '#7FD1D1'), LS.lab(lsX(PL[5]) + 10, lsY(8) + 24, '-4 V', '#7FD1D1'), LS.lab(lsX(PL[8]) + 10, lsY(4), '-8 V', '#7FD1D1')];
$('#ro2').innerHTML = `<span class="k n">CELL, - TO +</span><span class="v" id="lv0" style="color:${TE}">+12</span><span class="u">V</span>
  <span class="k n">ACROSS R₁</span><span class="v" id="lv1" style="color:${TE}">-4</span><span class="u">V</span>
  <span class="k n">ACROSS R₂</span><span class="v" id="lv2" style="color:${TE}">-8</span><span class="u">V</span>
  <span class="ln"></span>
  <span class="k n" style="color:${INK}">ROUND THE LOOP</span><span class="v" id="lv3" style="color:${INK}">0</span><span class="u">V</span>`;
const lvR = [...$('#ro2').children];
const avL = PUC.avatar($('#sL'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Up the stairs, then back down to the ground!' });

/* ================= V: KVL derivation ================= */
const vS = $('#vS');
const vW = [W(vS, 'M120,232 V110 H300'), W(vS, 'M440,110 H640 V200'), W(vS, 'M640,320 V420 H120 V268')];
const vBat = [W(vS, 'M85,232 H155', { 'stroke-width': 5 }), W(vS, 'M102,268 H138', { 'stroke-width': 9 })];
const vR = [W(vS, zigH(110, 300, 440)), W(vS, zigV(640, 200, 320))];
const vLoop = W(vS, 'M380,190 A80,80 0 1 1 300,270', { stroke: AM, 'stroke-dasharray': '9 9', 'stroke-width': 4 });
const vLoopH = mk(vS, 'path', { d: 'M300,270 L284,256 L318,252 Z', fill: AM });
const vIA = PUC.arrow(vS, VI); const vIL = tx(vS, 452, 74, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const vTag = (x, y, s, col) => { const d = document.createElement('div'); d.className = 'chipT'; d.style.cssText = `left:${x}px;top:${y}px;background:${col}`; d.innerHTML = s; $('#vL').appendChild(d); return d; };
const vTags = [vTag(170, 268, '+E = +12 V', TE), vTag(296, 132, '-IR₁ = -4 V', TE), vTag(470, 330, '-IR₂ = -8 V', TE)];
const vChk = document.createElement('div'); vChk.style.cssText = 'position:absolute;left:36px;top:492px;white-space:nowrap;font-size:36px';
vChk.innerHTML = K(`${kE('12')} = ${kI('2')}(2) + ${kI('2')}(4) \\;\\checkmark`); $('#vL').appendChild(vChk);
const vSt = [
  [K(`\\sum \\text{rises} = \\sum \\text{drops}`), 'any closed loop', 84],
  [K(`\\sum \\Delta ${kE('V')} = 0`), 'same point, same energy', 192],
  [K(`\\sum ${kE('E')} = \\sum ${kI('I')}R`), 'voltage law (KVL)', 296],
  [K(`\\text{cell, } - \\text{ to } +:\\ +${kE('E')}`), 'sign rule 1', 392],
  [K(`R \\text{ along } ${kI('I')}:\\ -${kI('I')}R`), 'sign rule 2', 482]];
$('#vSteps').innerHTML = vSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const vRw = [...$('#vSteps').children];
const tVs = [wt('V2', 'Around'), wt('V3', 'same'), wt('V4', 'So'), wt('V5', 'Cross'), wt('V5', 'resistor')];
$('#vBox').style.top = '280px';

/* ================= W: worked example ================= */
const wS = $('#wS');
const wW = [W(wS, 'M110,262 V120 H220'), W(wS, 'M340,120 H680 V220'), W(wS, 'M470,120 V220'), W(wS, 'M470,340 V440'), W(wS, 'M680,340 V440 H110 V298')];
const wBat = [W(wS, 'M75,262 H145', { 'stroke-width': 5 }), W(wS, 'M92,298 H128', { 'stroke-width': 9 })];
const wR = [W(wS, zigH(120, 220, 340)), W(wS, zigV(470, 220, 340)), W(wS, zigV(680, 220, 340))];
const wN = [node(wS, 470, 120), node(wS, 470, 440)];
const wLab = [mono(wS, 60, 286, '12 V', { fill: TE, 'font-weight': 600, 'text-anchor': 'end' }), mono(wS, 280, 84, '2 Ω', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }),
  mono(wS, 498, 288, '6 Ω', { fill: INK, 'font-weight': 600 }), mono(wS, 708, 288, '3 Ω', { fill: INK, 'font-weight': 600 }), tx(wS, 486, 104, 'P', { 'font-size': 28, 'font-weight': 700 })];
const wIA = [PUC.arrow(wS, VI), PUC.arrow(wS, VI), PUC.arrow(wS, VI)];
const wIL = [tx(wS, 352, 84, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), tx(wS, 396, 196, 'I₂', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), tx(wS, 600, 84, 'I₃', { fill: VI, 'font-style': 'italic', 'font-size': 26 })];
const wVal = [mono(wS, 374, 84, '= 3 A', { fill: VI, 'font-weight': 600, 'font-size': 22 }), mono(wS, 380, 224, '= 1 A', { fill: VI, 'font-weight': 600, 'font-size': 22 }), mono(wS, 626, 84, '= 2 A', { fill: VI, 'font-weight': 600, 'font-size': 22 })];
const wLp = [W(wS, 'M170,170 H420 V390 H170 Z', { stroke: '#C9CDD6', 'stroke-dasharray': '8 8', 'stroke-width': 3 }), W(wS, 'M520,170 H630 V390 H520 Z', { stroke: '#C9CDD6', 'stroke-dasharray': '8 8', 'stroke-width': 3 })];
const wLpL = [mono(wS, 295, 414, 'LOOP 1', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }), mono(wS, 575, 414, 'LOOP 2', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 })];
const wSt = [
  [K(`${kI('I')} = ${kI('I_2')} + ${kI('I_3')}`), 'KCL at P', 84],
  [K(`${kE('12')} = 2${kI('I')} + 6${kI('I_2')}`), 'loop 1', 178],
  [K(`6${kI('I_2')} = 3${kI('I_3')} \\Rightarrow ${kI('I_3')} = 2${kI('I_2')}`), 'loop 2', 274],
  [K(`${kI('I')} = 3${kI('I_2')} \\Rightarrow ${kE('12')} = 12${kI('I_2')}`), '', 372],
  [K(`${kI('I_2')} = 1\\,\\text{A},\\ ${kI('I_3')} = 2\\,\\text{A},\\ ${kI('I')} = 3\\,\\text{A}`), '', 474]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRw = [...$('#wSteps').children];
const tWs = [wt('W3', 'At'), wt('W4', 'Left'), wt('W5', 'Right'), wt('W6', 'That'), wt('W7', 'So')];
const avW = PUC.avatar($('#sW'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Three equations, three unknowns. Done!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Write -IR for every resistor', right: 'Along I: -IR.  Against I: +IR', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcW = [W(tcS, 'M80,140 H300'), W(tcS, zigH(140, 300, 480)), W(tcS, 'M480,140 H700')];
const tcI = PUC.arrow(tcS, VI), tcIL = tx(tcS, 452, 100, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const tcA1 = PUC.arrow(tcS, TE, 5, 14), tcA2 = PUC.arrow(tcS, TE, 5, 14);
const tcL1 = tx(tcS, 480, 212, 'walk along I:  -IR', { fill: TE, 'font-size': 22 }), tcL2 = tx(tcS, 480, 266, 'walk against I:  +IR', { fill: TE, 'font-size': 22 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET', 'PUC BOARDS'], type: 'Find the current in each branch of a network (boards: 5 marks). State both laws.' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Cells of 12&nbsp;V and 6&nbsp;V, each in series with a 2&nbsp;Ω resistor, are joined in parallel across a 4&nbsp;Ω resistor. What current flows through the 4&nbsp;Ω resistor?', qW: 780,
  opts: [K('4.5\\,\\text{A}'), K('1.8\\,\\text{A}'), K('3.0\\,\\text{A}'), K('1.5\\,\\text{A}')], right: 1, optW: 474, optY: 340 });
const qS = $('#qS');
const qW = [W(qS, 'M90,130 H438'), W(qS, 'M90,500 H438'), W(qS, 'M90,130 V200'), W(qS, 'M90,320 V378'), W(qS, 'M90,414 V500'), W(qS, 'M264,130 V250'), W(qS, 'M264,370 V500'),
  W(qS, 'M438,130 V200'), W(qS, 'M438,320 V378'), W(qS, 'M438,414 V500')];
const qR = [W(qS, zigV(90, 200, 320)), W(qS, zigV(264, 250, 370)), W(qS, zigV(438, 200, 320))];
const qB = [W(qS, 'M58,378 H122', { 'stroke-width': 5 }), W(qS, 'M74,414 H106', { 'stroke-width': 9 }), W(qS, 'M406,378 H470', { 'stroke-width': 5 }), W(qS, 'M422,414 H454', { 'stroke-width': 9 })];
const qN = [node(qS, 264, 130), node(qS, 264, 500)];
const qL = [mono(qS, 60, 266, '2 Ω', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), mono(qS, 60, 404, '12 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 }),
  mono(qS, 292, 316, '4 Ω', { fill: INK, 'font-weight': 600 }), mono(qS, 468, 266, '2 Ω', { fill: INK, 'font-weight': 600 }), mono(qS, 482, 404, '6 V', { fill: TE, 'font-weight': 600 }),
  mono(qS, 136, 370, '+', { fill: INK, 'font-size': 24 }), mono(qS, 484, 370, '+', { fill: INK, 'font-size': 24 })];
const sol = PUC.solution($('#so'), [[K(`${kI('I')} = ${kI('I_1')} + ${kI('I_2')}`)], [K(`${kE('12')} = 2${kI('I_1')} + 4${kI('I')}`)], [K(`${kE('6')} = 2${kI('I_2')} + 4${kI('I')}`)],
  [K(`${kE('18')} = 2${kI('I')} + 8${kI('I')} = 10${kI('I')}`)], [K(`${kI('I')} = 1.8\\,\\text{A}`)]], { dy: 96, y0: 96 });
const soNote = document.createElement('div'); soNote.style.cssText = `position:absolute;left:36px;top:556px;font:500 22px Poppins;color:${MU};white-space:nowrap`;
soNote.innerHTML = `${K(`${kI('I_2')} = -0.6\\,\\text{A}`)}: the 6 V cell is charged`; $('#so').appendChild(soNote);
const tSol = [wt('A2', 'By'), wt('A3', 'Left'), wt('A3', 'Right'), wt('A4', 'Add'), wt('A5', 'So')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 92, dy: 104, title: "Kirchhoff's laws · formula card", txt: [0, 0, 1, 1],
  lines: [K(`\\sum ${kI('I_{\\text{in}}')} = \\sum ${kI('I_{\\text{out}}')} \\quad \\text{(junction)}`),
    K(`\\sum ${kE('E')} = \\sum ${kI('I')}R \\quad \\text{(closed loop)}`),
    `Cell from - to +: <b>+E</b> &nbsp;·&nbsp; resistor along <i>I</i>: <b>-IR</b>, against <i>I</i>: <b>+IR</b>`,
    'Current law keeps charge · Voltage law keeps energy'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 11', topic: 'DC sources and circuit analysis', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tKn - 0.3, 1.1, 700, 540], [T0('C8') + 0.2, 1, 960, 540], [tR1 - 0.8, 1.1, 1180, 520], [tR2 + 1.2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const tGh = [[tB + 0.5, tD - 0.32], [tL + 0.3, tV - 0.32], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gi = tGh.findIndex(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gi < 0) M.hide(ghost, true); else M.vis(ghost, t, tGh[gi][0], tGh[gi][1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tK + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tK - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(eb, t, tMorph + 0.6, 0.4, 0.1); fadeAt(sock, t, tMorph + 0.9);
    const tPl = wt('H1', 'lamp') - 0.1, tCh = wt('H1', 'charger') - 0.1;
    drawSeq([cords[0], ...lamp], t, tPl, 0.3, 0.08); drawSeq([cords[1], ...phone], t, tCh, 0.3, 0.08);
    M.vis(phScr, t, tCh + 0.4, 1e9, { dy: 0, fade: 0.2 }); fadeAt(ebL, t, tCh + 0.2, 0.1);
    const on = wt('H2', 'current');
    PUC.attr(lampGlow, 'opacity', (0.85 * M.io((t - on) / 0.3)).toFixed(3));
    PUC.attr(batBar, 'width', (28 * M.clamp((t - on) / 4)).toFixed(1));
    M.vis(batBar, t, on, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#jC'), t, wt('H2', 'One') - 0.2, out, { dx: 60, dy: 0, ...o });
    drawSeq(jW, t, wt('H2', 'wire') - 0.1, 0.4, 0.25);
    M.vis(jN, t, wt('H2', 'splits') - 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 });
    jEnd.forEach((e, i) => M.vis(e, t, wt('H2', 'two') + i * 0.1, 1e9, { dy: 0, fade: 0.2 })); jIco.forEach((e, i) => M.vis(e, t, wt('H2', 'two') + 0.1 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }));
    const tq = wt('H3', 'how') - 0.2;
    [[60, 240, 300, 240], [440, 200, 520, 136], [440, 400, 520, 464]].forEach(([a, b, c, d], i) => { const u = M.io((t - tq - i * 0.15) / 0.4); jA[i].set(a, b, a + (c - a) * u, b + (d - b) * u); });
    jQ.forEach((e, i) => M.vis(e, t, tq + 0.2 + i * 0.15, 1e9, { dy: 0, fade: 0.2 }));
    jE.forEach((f, k) => f.set(60 * Math.max(0, t - wt('H2', 'splits')) + k * 20, t >= wt('H2', 'splits')));
    M.vis($('#jLost'), t, wt('H3', 'lost') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* K: kirchhoff */
  const kOn = t >= tK - 0.05 && t < tB + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tB - 0.32;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    const tn = wt('K2', 'Gustav') - 0.1;
    M.rise($('#kName'), t, tn); M.vis($('#kYrs'), t, tn + 0.3, 1e9, { dy: 10 });
    M.vis($('#kYear'), t, wt('K2', 'eighteen') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.rise($('#kWhat'), t, wt('K2', 'while') - 0.1, { st: 0.03 });
    M.vis($('#kStrip'), t, wt('K1', 'rules') - 0.1, 1e9, { dy: 24 });
    kT.forEach((tl, i) => {
      const lit = M.io((t - tLaw[i]) / 0.3);
      M.vis(tl, t, tK + 0.5 + i * 0.12, 1e9, { dy: 20 });
      tl.style.background = M.mix(C.soft, '#FFFFFF', lit); tl.style.borderColor = M.mix(C.soft, AM, lit);
      tl.querySelector('.tn').style.color = M.mix('#9AA0AC', INK, lit);
    });
    drawSeq(kG0, t, tLaw[0] - 0.1, 0.3, 0.12); drawSeq(kG1, t, tLaw[1] - 0.1, 0.5, 0.2); M.vis(kG1h, t, tLaw[1] + 0.5, 1e9, { dy: 0, fade: 0.15 });
  }

  /* B: breadboard KCL */
  const bOn = t >= tB - 0.05 && t < tD + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tFlow, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(ckW, t, tB1 + 0.3, 0.45, 0.18); drawSeq(ckBat, t, wt('C1', 'battery') - 0.2, 0.25, 0.1); drawSeq(ckR, t, wt('C1', 'resistors') - 0.2, 0.35, 0.15);
    fadeAt(ckLab, t, wt('C1', 'battery'), 0.08); M.vis(r2L, t, wt('C1', 'resistors') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const tj = wt('C2', 'junction') - 0.1;
    ckN.forEach((n, i) => M.vis(n, t, tj + i * 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 })); M.vis(ckP, t, wt('C2', 'P') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    const kn = M.io((t - (tKn - 0.6)) / 0.4); knob.set(728, 388, 728 + (796 - 728) * kn, 388 + (214 - 388) * kn);
    // conventional current arrows (violet), electrons opposite (amber)
    const ta = [wt('C3', 'arrows') - 0.1, wt('C4', 'One') - 0.1, wt('C4', 'Two') - 0.1];
    [[260, 92, 350, 92], [470, 150, 470, 200], [580, 92, 690, 92]].forEach(([a, b, c, d], i) => { const u = M.io((t - ta[i]) / 0.4); ckIA[i].set(a, b, a + (c - a) * u, b + (d - b) * u); ckIL[i].style.opacity = u; });
    const fOn = t >= tFlow;
    const q = k => fOn ? SPD * integ(k, tFlow, t) : 0;
    const qI = q(If), q1 = q(I1f), q2 = q(I2f);
    eA.set(qI, fOn); e1.set(q1, fOn); e2.set(q2, fOn); eB.set(qI, fOn);
    M.setT(r2L, R2(t).toFixed(1) + ' Ω');
    // scope: CH1 = current into P, CH2 = I1 + I2 out of P (they overlap exactly)
    const ys = 4 / 6 * 26;
    trIn(τ => 26 * If(τ), t, tFlow, 6, 186, fOn); trOut(τ => 26 * (I1f(τ) + I2f(τ)), t, tFlow, 6, 186, fOn);
    sLab.forEach((e, i) => M.vis(e, t, tFlow + i * 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ioT'), t, wt('C8', 'stay') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro1'), t, tFlow, 1e9, { dy: 12 });
    const rv = [[$('#rI'), If(t), wt('C3', 'Three')], [$('#rI1'), I1f(t), wt('C4', 'One')], [$('#rI2'), I2f(t), wt('C4', 'Two')]];
    rv.forEach(([el, v, ts]) => M.setT(el, t < ts - 0.1 ? '-' : v.toFixed(2)));
    avB(t, wt('C5', 'Nothing') - 0.1, tKn - 0.5);
  }

  /* D: KCL derivation */
  const dOn = t >= tD - 0.05 && t < tL + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tL - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dW, t, tD + 0.4, 0.4, 0.15); M.vis(dN, t, tD + 0.8, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); M.vis(dP, t, tD + 0.9, 1e9, { dy: 0, fade: 0.2 });
    [[90, 230, 250, 230], [580, 120, 700, 120], [580, 340, 700, 340]].forEach(([a, b, c, d], i) => { const u = M.io((t - tD - 1.0 - i * 0.15) / 0.4); dA[i].set(a, b - 0, a + (c - a) * u, b + (d - b) * u); });
    fadeAt(dAL, t, tD + 1.2, 0.15);
    // electrons: in the wires they move opposite to I, at speeds set by the current
    const el = Math.max(0, t - tD - 0.6);
    dE[0].set(40 * 1 * el, t >= tD + 0.6); dE[1].set(40 * 2 * el, t >= tD + 0.6); dE[2].set(40 * 3 * el, t >= tD + 0.6);
    const tQr = wt('D3', 'charge') - 0.2;
    dRoR.forEach((e, i) => M.vis(e, t, tQr + Math.floor(i / 3) * 0.3, 1e9, { dy: 10 }));
    $('#dQp').style.color = M.mix(INK, C.ok, M.io((t - wt('D3', 'conserved')) / 0.3));
    dR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); M.vis(r.querySelector('.why'), t, tDs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tDs[i] - 0.15); });
    M.vis($('#dBox'), t, tDs[4] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* L: breadboard KVL */
  const lOn = t >= tL - 0.05 && t < tV + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tV - 0.32;
    M.vis($('#lk'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ls'), t, tL + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#lr'), t, tL + 0.45, out, { dy: 36, ...o });
    drawSeq(lkW, t, tL + 0.4, 0.45, 0.18); drawSeq(lkBat, t, wt('L1', 'battery') - 0.2, 0.25, 0.1); drawSeq(lkR, t, wt('L1', 'resistors') - 0.2, 0.35, 0.2);
    fadeAt(lkLab.slice(0, 4), t, wt('L1', 'battery'), 0.08); fadeAt(lkLab.slice(4, 6), t, wt('L1', 'two', 1) - 0.1); fadeAt(lkLab.slice(6, 8), t, wt('L1', 'four') - 0.1); fadeAt(lkLab.slice(8), t, wt('L3', 'walk') - 0.3);
    M.vis(lkA, t, wt('L3', 'walk') - 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 });
    const tc2 = wt('L2', 'current');
    const ia = M.io((t - tc2 + 0.1) / 0.4); lkI.set(560, 480, 560 - 140 * ia, 480); lkIL.style.opacity = ia;
    const fOn = t >= tc2 - 0.2; lkE.set(80 * Math.max(0, t - tc2 + 0.2), fOn); M.vis($('#lkE'), t, tc2 - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const s = S(t), [px, py] = posAt(s);
    PUC.attr(probe, 'transform', `translate(${px.toFixed(1)},${py.toFixed(1)})`); M.vis(probeW, t, tWalk - 0.3, 1e9, { dy: 0, fade: 0.2 });
    // scope: potential map drawn as the probe walks
    const on = t >= tWalk - 0.1; let d = '';
    if (on) { const N = 160; for (let i = 0; i <= N; i++) { const ss = s * i / N; d += (i ? 'L' : 'M') + lsX(ss).toFixed(1) + ',' + lsY(Vat(ss)).toFixed(1); } }
    PUC.attr(lsTr, 'd', d); M.hide(lsTr, !on);
    PUC.attr(lsDot, 'cx', lsX(s).toFixed(1)); PUC.attr(lsDot, 'cy', lsY(Vat(s)).toFixed(1)); M.hide(lsDot, !on);
    lsLab.forEach(e => M.vis(e, t, tWalk - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    const tn = [tCl + 0.3, tR1 + 0.3, tR2 + 0.3];
    lsNote.forEach((e, i) => M.vis(e, t, tn[i], 1e9, { dy: 0, fade: 0.2 }));
    [[0, 1, 2], [3, 4, 5], [6, 7, 8]].forEach((r, i) => r.forEach(j => M.vis(lvR[j], t, tn[i] - 0.1, 1e9, { dy: 10 })));
    const tz = wt('L7', 'Zero') - 0.1; [9, 10, 11, 12].forEach(j => M.vis(lvR[j], t, j === 9 ? tz - 0.2 : tz, 1e9, { dy: 10 }));
    lvR[11].style.color = M.mix(INK, C.ok, M.io((t - tz - 0.2) / 0.3));
    avL(t, wt('L7', 'Zero') + 0.5, out);
  }

  /* V: KVL derivation */
  const vOn = t >= tV - 0.05 && t < tT + 0.05; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vL'), t, tV + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#vR'), t, tV + 0.25, 1e9, { dx: 60, dy: 0 });
    drawSeq([...vW, ...vBat, ...vR], t, tV + 0.4, 0.3, 0.08);
    const ia = M.io((t - tV - 1.0) / 0.4); vIA.set(330, 74, 330 + 110 * ia, 74); vIL.style.opacity = ia;
    M.draw(vLoop, t, wt('V3', 'goes') - 0.2, 1.2, M.o3); M.vis(vLoopH, t, wt('V3', 'goes') + 1.0, 1e9, { dy: 0, fade: 0.15 });
    vTags.forEach((e, i) => M.vis(e, t, [tVs[3], tVs[4], tVs[4] + 0.4][i] + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    PUC.write(vChk, t, wt('V5', 'minus', 1) + 0.6, 0.7);
    vRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tVs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tVs[i], 0.6); M.vis(r.querySelector('.why'), t, tVs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tVs[i] - 0.15); });
    M.vis($('#vBox'), t, tVs[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Loops') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...wW, ...wBat], t, wt('W1', 'twelve') - 0.1, 0.3, 0.1); M.draw(wR[0], t, wt('W1', 'two') - 0.1, 0.3); drawSeq(wR.slice(1), t, wt('W1', 'six') - 0.1, 0.3, 0.3);
    fadeAt(wLab.slice(0, 2), t, wt('W1', 'two'), 0.1); fadeAt(wLab.slice(2, 4), t, wt('W1', 'six'), 0.3);
    wN.forEach((n, i) => M.vis(n, t, tWs[0] - 0.3 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 })); M.vis(wLab[4], t, tWs[0] - 0.2, 1e9, { dy: 0, fade: 0.2 });
    [[230, 92, 330, 92], [444, 150, 444, 210], [520, 92, 600, 92]].forEach(([a, b, c, d], i) => { const u = M.io((t - wt('W2', 'Find') - i * 0.15) / 0.4); wIA[i].set(a, b, a + (c - a) * u, b + (d - b) * u); wIL[i].style.opacity = u; });
    wLp.forEach((e, i) => M.draw(e, t, tWs[1 + i] - 0.1, 0.7)); wLpL.forEach((e, i) => M.vis(e, t, tWs[1 + i] + 0.3, 1e9, { dy: 0, fade: 0.2 }));
    const tv = [wt('W7', 'battery'), wt('W7', 'two', 0) - 0.2, wt('W7', 'two', 1)];
    wVal.forEach((e, i) => M.vis(e, t, tv[i], 1e9, { dy: 0, fade: 0.2 }));
    wRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wBox'), t, tWs[4] + 0.7, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, wt('W7', 'battery') + 0.6, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'sign') - 0.1, tRight: wt('X3', 'Walk') - 0.1 });
    drawSeq(tcW, t, tX + 0.5, 0.4, 0.15);
    const ia = M.io((t - tX - 1.0) / 0.4); tcI.set(340, 92, 340 + 100 * ia, 92); tcIL.style.opacity = ia;
    const a1 = M.io((t - wt('X3', 'Walk') + 0.1) / 0.5), a2 = M.io((t - wt('X3', 'Walk', 1) + 0.1) / 0.5);
    tcA1.set(90, 204, 90 + 360 * a1, 204); tcA2.set(450, 258, 450 - 360 * a2, 258);
    M.vis(tcL1, t, wt('X3', 'minus'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tcL2, t, wt('X3', 'plus'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'JEE'), wt('X5', 'NEET'), wt('X5', 'PUC')], tType: wt('X5', 'five') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns });
    M.vis($('#qc'), t, tQ + 0.3, tAns - 0.2, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    drawSeq([...qW, ...qR, ...qB], t, wt('Q1', 'Cells') + 0.2, 0.25, 0.05); fadeAt([...qN, ...qL], t, wt('Q1', 'joined'), 0.06);
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
    M.vis(soNote, t, wt('A5', 'negative') - 0.2, 1e9, { dx: -10, dy: 0 });
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
