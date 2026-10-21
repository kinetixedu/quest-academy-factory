// PUC Electronics Ep 11 - DC sources and circuit analysis ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'start') - 0.2;
const tS = T0('S1'), tE = T0('E1'), tB = T0('B1'), tD = T0('D1'), tG = T0('G1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const cellV = (p, x, y, a = {}) => [W(p, `M${x - 35},${y} H${x + 35}`, { 'stroke-width': 5, ...a }), W(p, `M${x - 18},${y + 34} H${x + 18}`, { 'stroke-width': 9, ...a })]; // long plate (+) on top
const cellH = (p, x, y) => [W(p, `M${x},${y - 40} V${y + 40}`, { 'stroke-width': 5 }), W(p, `M${x + 26},${y - 20} V${y + 20}`, { 'stroke-width': 9 })]; // long plate (+) on the left

/* ================= A: hook ================= */
const hS = $('#hS');
const hBat = [W(hS, 'M110,110 V250'), W(hS, 'M110,286 V470'), ...cellV(hS, 110, 250)];
const hW = [W(hS, 'M110,110 H360 V130'), W(hS, 'M360,230 V470 H110'), W(hS, 'M360,110 V110 H230 M230,110 V300'), W(hS, 'M230,420 V470')];
const hLamp = mk(hS, 'circle', { cx: 360, cy: 180, r: 50, fill: AM, stroke: INK, 'stroke-width': 4 });
const hLx = [W(hS, 'M325,145 L395,215'), W(hS, 'M395,145 L325,215')];
const hMot = mk(hS, 'circle', { cx: 230, cy: 380, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const hMt = tx(hS, 230, 390, 'M', { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 700 });
const hBtnW = mk(hS, 'g'), hBtn = mk(hBtnW, 'g'); W(hBtn, 'M206,300 H254'); W(hBtn, 'M230,300 V284'); mk(hBtn, 'rect', { x: 212, y: 268, width: 36, height: 16, rx: 4, fill: C.red });
W(hS, 'M206,330 H254'); W(hS, 'M230,330 V340');
const hLab = [mono(hS, 424, 186, 'headlight'), mono(hS, 170, 390, 'starter', { 'text-anchor': 'end' }), mono(hS, 60, 274, '12 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 })];
const tPress = wt('H1', 'scooter'), tDim = wt('H1', 'dim') - 0.2;

/* ================= S: dc sources ================= */
const SRC = [['Cell', 'makes it from chemicals'], ['Battery', 'cells joined together'], ['Solar cell', 'makes it from light'], ['DC power supply', 'makes it from the AC mains']];
$('#sTiles').innerHTML = SRC.map(([n, e], i) => `<div class="card sT" style="left:${160 + i * 408}px"><svg width="376" height="200"></svg><div class="nm">${n}</div><div class="ex">${e}</div></div>`).join('');
const sT = [...$('#sTiles').children], sSv = sT.map(e => e.querySelector('svg'));
const sG = [
  [W(sSv[0], 'M90,120 H176'), ...cellH(sSv[0], 176, 120), W(sSv[0], 'M202,120 H286')],
  [W(sSv[1], 'M70,120 H138'), ...cellH(sSv[1], 138, 120), W(sSv[1], 'M164,120 H212', { 'stroke-dasharray': '6 8' }), ...cellH(sSv[1], 212, 120), W(sSv[1], 'M238,120 H306')],
  [W(sSv[2], 'M90,130 H176'), ...cellH(sSv[2], 176, 130), W(sSv[2], 'M202,130 H286'), W(sSv[2], 'M120,50 L160,82', { stroke: AM }), W(sSv[2], 'M150,40 L190,72', { stroke: AM }), W(sSv[2], 'M146,84 L160,82 L156,68', { stroke: AM }), W(sSv[2], 'M176,74 L190,72 L186,58', { stroke: AM })],
  [W(sSv[3], 'M128,62 H248 V170 H128 Z', { fill: '#fff' }), W(sSv[3], 'M60,116 H128'), W(sSv[3], 'M248,100 H316'), W(sSv[3], 'M248,132 H316'),
    W(sSv[3], 'M146,116 C156,100 166,100 172,116 S188,132 196,116', { 'stroke-width': 3 }), W(sSv[3], 'M206,108 H232', { 'stroke-width': 3 }), W(sSv[3], 'M206,124 H232', { 'stroke-width': 3, 'stroke-dasharray': '5 4' })]];
const sPl = [0, 1, 2].map(i => tx(sSv[i], i === 1 ? 118 : 156, i === 2 ? 108 : 98, '+', { 'font-size': 26 }));
const tSrc = [wt('S2', 'cell'), wt('S2', 'battery'), wt('S3', 'solar'), wt('S3', 'power')];
const sDc = $('#sDc'); mk(sDc, 'rect', { x: 0, y: 0, width: 300, height: 60, rx: 8, fill: '#2A3758' });
const sDcL = W(sDc, 'M12,22 H288', { stroke: AM, 'stroke-width': 4 }); W(sDc, 'M12,44 H288', { stroke: '#46557A', 'stroke-width': 1.5, 'stroke-dasharray': '4 6' });

/* ================= E: emf and internal resistance ================= */
const eSv = $('#eSv');
const eBox = W(eSv, 'M180,150 H604 V410 H180 Z', { stroke: '#AEB4C2', 'stroke-dasharray': '10 10', 'stroke-width': 3 });
const eBoxL = mono(eSv, 392, 140 - 12, 'ONE REAL CELL', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 });
const eW = [W(eSv, 'M130,280 H286'), W(eSv, 'M312,280 H400'), W(eSv, zigH(280, 400, 520, 16)), W(eSv, 'M520,280 H654')];
const ePl = cellH(eSv, 286, 280);
const eT = [mk(eSv, 'circle', { cx: 120, cy: 280, r: 12, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(eSv, 'circle', { cx: 664, cy: 280, r: 12, fill: '#fff', stroke: INK, 'stroke-width': 4 })];
const eLab = [tx(eSv, 298, 214, 'E', { fill: TE, 'font-style': 'italic', 'font-size': 36, 'text-anchor': 'middle' }), mono(eSv, 298, 360, 'perfect EMF', { 'text-anchor': 'middle' }),
  tx(eSv, 460, 230, 'r', { 'font-style': 'italic', 'font-size': 36, 'text-anchor': 'middle' }), mono(eSv, 460, 360, 'hidden resistor', { 'text-anchor': 'middle' }),
  tx(eSv, 112, 248, '+', { 'font-size': 30 }), tx(eSv, 658, 248, '-', { 'font-size': 32 }), mono(eSv, 392, 480, 'the terminals are all the outside world sees', { 'text-anchor': 'middle' })];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const ckBox = W(ck, 'M70,140 H300 V410 H70 Z', { stroke: '#AEB4C2', 'stroke-dasharray': '10 10', 'stroke-width': 3 });
const ckBoxL = mono(ck, 185, 398, 'BATTERY', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 17 });
const ckW = [W(ck, 'M160,110 V180'), W(ck, 'M160,214 V260'), W(ck, zigV(160, 260, 340, 14)), W(ck, 'M160,340 V440'),
  W(ck, 'M160,110 H330'), W(ck, 'M410,110 H760 V215'), W(ck, zigV(760, 215, 335)), W(ck, 'M760,335 V440 H160')];
const ckPl = cellV(ck, 160, 180);
const swPiv = mk(ck, 'circle', { cx: 330, cy: 110, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), swEnd = mk(ck, 'circle', { cx: 410, cy: 110, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const swLevW = mk(ck, 'g'), swLev = W(swLevW, 'M330,110 H406', { 'stroke-width': 5 });
const vmW = [W(ck, 'M540,110 V235', { 'stroke-width': 3 }), W(ck, 'M540,315 V440', { 'stroke-width': 3 })];
const vm = mk(ck, 'circle', { cx: 540, cy: 275, r: 40, fill: '#fff', stroke: TE, 'stroke-width': 4 }), vmT = tx(ck, 540, 285, 'V', { 'text-anchor': 'middle', fill: TE, 'font-size': 30, 'font-weight': 700 });
const vmR = mono(ck, 596, 284, '12.0 V', { fill: TE, 'font-weight': 600, 'font-size': 26 });
const knob = PUC.arrow(ck, INK, 3, 14);
const ckN = [node(ck, 540, 110), node(ck, 540, 440)];
const ckLab = [tx(ck, 210, 206, 'E', { fill: TE, 'font-style': 'italic' }), mono(ck, 230, 206, '12 V', { fill: TE, 'font-weight': 600, 'font-size': 18 }),
  tx(ck, 210, 308, 'r', { 'font-style': 'italic' }), mono(ck, 226, 308, '0.5 Ω', { 'font-size': 18 }), tx(ck, 352, 84, 'Switch'), tx(ck, 800, 266, 'Load', { 'font-size': 22 })];
const rL = mono(ck, 800, 296, '5.5 Ω', { fill: INK, 'font-weight': 600 });
const ckIA = PUC.arrow(ck, VI), ckIL = tx(ck, 640, 92, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const tClose = wt('B3', 'close'), tHv = wt('B5', 'heavier') - 0.2, tHv1 = tHv + 1.6;
const RL = keys([[tHv, 5.5], [tHv1, 1.5]]);
const closed = t => t >= tClose;
const If = t => closed(t) ? 12 / (RL(t) + 0.5) : 0, Vf = t => 12 - 0.5 * If(t);
const skB = (x, y) => (Math.abs(x - 760) < 3 && y > 209 && y < 341) || (Math.abs(y - 110) < 3 && x > 326 && x < 414);
const eFl = flow(ck, [[160, 440], [760, 440], [760, 110], [160, 110]], 0, { skip: skB });
const SC = scope($('#scS'), 592, 200);
const trE = SC.tr(CH1, 4), trV = SC.tr(AM, 4);
const sLab = [SC.lab(14, 26, 'CH1 · E (EMF)', CH1), SC.lab(14, 190, 'CH2 · V AT THE TERMINALS', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">E</span><span class="v" style="color:${TE}">12.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k n">LOST, <i>Ir</i></span><span class="v" id="rLo" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V</span><span class="v" id="rV" style="color:${TE}">12.0</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the battery uses up some voltage inside itself!' });

/* ================= D: derivation ================= */
const dS = $('#dS');
const dBox = W(dS, 'M60,150 H230 V410 H60 Z', { stroke: '#AEB4C2', 'stroke-dasharray': '10 10', 'stroke-width': 3 });
const dW = [W(dS, 'M145,110 V200'), W(dS, 'M145,234 V270'), W(dS, zigV(145, 270, 350, 14)), W(dS, 'M145,350 V450'), W(dS, 'M145,110 H640 V220'), W(dS, zigV(640, 220, 340)), W(dS, 'M640,340 V450 H145')];
const dPl = cellV(dS, 145, 200);
const dI = PUC.arrow(dS, VI), dIL = tx(dS, 470, 92, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const dLp = W(dS, 'M440,230 A70,70 0 1 1 370,300', { stroke: AM, 'stroke-dasharray': '9 9' }); const dLpH = mk(dS, 'path', { d: 'M370,300 L354,286 L388,282 Z', fill: AM });
const chip = (host, x, y, s, col) => { const d = document.createElement('div'); d.className = 'pillp'; d.style.cssText = `left:${x}px;top:${y}px;background:${col};color:#fff;font:600 24px 'IBM Plex Mono';height:44px`; d.innerHTML = s; host.appendChild(d); return d; };
const dTags = [chip($('#dL'), 250, 176, '+E', TE), chip($('#dL'), 250, 296, '-Ir', TE), chip($('#dL'), 516, 256, '-IR', TE)];
const dLab = [tx(dS, 668, 340, 'R', { 'font-style': 'italic', 'font-size': 28 }), mono(dS, 145, 500, 'source', { 'text-anchor': 'middle' }), mono(dS, 640, 500, 'load', { 'text-anchor': 'middle' })];
const dSt = [
  [K(`${kE('E')} - ${kI('I')}r - ${kI('I')}R = 0`), 'KVL round the loop', 84],
  [K(`${kI('I')} = \\dfrac{${kE('E')}}{R + r}`), 'the current', 168],
  [K(`${kE('V')} = ${kI('I')}R`), 'across the load', 292],
  [K(`${kE('V')} = ${kE('E')} - ${kI('I')}r`), 'terminal voltage', 386],
  [K(`${kI('I')}r`), 'lost voltage, used up inside', 486]];
$('#dSteps').innerHTML = dSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const dR = [...$('#dSteps').children];
$('#dBox').style.top = '374px';
const tDs = [wt('D2', 'E'), wt('D3', 'So'), wt('D4', 'V'), wt('D5', 'And'), wt('D6', 'I')];
const dUnit = document.createElement('div'); dUnit.style.cssText = `position:absolute;left:36px;top:546px;font:500 22px 'IBM Plex Mono';color:${C.ink2};white-space:nowrap`; dUnit.textContent = 'V · A · Ω'; $('#dR').appendChild(dUnit);

/* ================= G: V-I line ================= */
const gS = $('#gS');
const G = PUC.graph(gS, { x: 110, y: 90, w: 600, h: 380, xmax: 24, ymin: 0, ymax: 14, xt: [0, 6, 12, 18, 24], yt: [0, 4, 8, 12], xl: 'I (A)', yl: 'V (V)' });
const gReal = G.curve(TE, 5), gIdeal = G.mk('path', { d: `M${G.X(0)},${G.Y(12)} H${G.X(24)}`, fill: 'none', stroke: TE, 'stroke-width': 4, 'stroke-dasharray': '10 10', opacity: 0.55 });
const gDot = G.dot(AM, 11);
const gLab = [mono(gS, G.X(0) + 16, G.Y(12) - 14, 'E = 12 V', { fill: TE, 'font-weight': 600 }), mono(gS, G.X(12) + 10, G.Y(6) - 16, 'slope = -r', { fill: INK, 'font-weight': 600 }),
  mono(gS, G.X(24) - 6, G.Y(12) - 14, 'ideal, r = 0', { fill: TE, 'text-anchor': 'end' }), mono(gS, G.X(2) + 16, G.Y(11) + 32, '2 A, 11 V', { 'font-size': 18 }), mono(gS, G.X(6) + 16, G.Y(9) + 32, '6 A, 9 V', { 'font-size': 18 })];
const gPts = [G.mk('circle', { cx: G.X(2), cy: G.Y(11), r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), G.mk('circle', { cx: G.X(6), cy: G.Y(9), r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const gT = [0, 1].map(i => $('#gt' + i)), gTs = gT.map(e => e.querySelector('svg'));
const mini = (sv) => { W(sv, 'M470,40 V200 H690', { 'stroke-width': 2.5 }); mono(sv, 676, 226, 'I', { 'font-size': 16 }); mono(sv, 444, 52, 'V', { 'font-size': 16 }); };
mini(gTs[0]); mini(gTs[1]);
const gM = [[W(gTs[0], 'M474,90 H680', { stroke: TE, 'stroke-width': 5 }), W(gTs[0], 'M474,90 L680,140', { stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '8 8' })],
  [W(gTs[1], 'M580,196 V50', { stroke: VI, 'stroke-width': 5 }), W(gTs[1], 'M580,196 L610,50', { stroke: VI, 'stroke-width': 3, 'stroke-dasharray': '8 8' })]];
const gMl = [mono(gTs[0], 690, 82, 'ideal', { 'text-anchor': 'end', fill: TE, 'font-size': 16 }), mono(gTs[1], 568, 64, 'ideal', { 'text-anchor': 'end', fill: VI, 'font-size': 16 })];
const tGl = [wt('G3', 'ideal'), wt('G4', 'ideal')];

/* ================= W: worked example ================= */
const wS = $('#wS');
const wBox = W(wS, 'M70,120 H250 V350 H70 Z', { stroke: '#AEB4C2', 'stroke-dasharray': '10 10', 'stroke-width': 3 });
const wW = [W(wS, 'M160,90 V170'), W(wS, 'M160,204 V230'), W(wS, zigV(160, 230, 300, 14)), W(wS, 'M160,300 V380'), W(wS, 'M160,90 H620 V180'), W(wS, 'M620,290 V380 H160')];
const wPl = cellV(wS, 160, 170);
const wLamp = mk(wS, 'circle', { cx: 620, cy: 235, r: 55, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const wLx = [W(wS, 'M581,196 L659,274'), W(wS, 'M659,196 L581,274')];
const wLab = [mono(wS, 186, 190, '1.5 V', { fill: TE, 'font-weight': 600 }), mono(wS, 186, 272, '0.5 Ω', { fill: INK, 'font-weight': 600 }), mono(wS, 696, 244, '2.5 Ω', { fill: INK, 'font-weight': 600 }), mono(wS, 160, 372 - 0, '', {})];
const wI = PUC.arrow(wS, VI), wIL = tx(wS, 420, 72, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
$('#wRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="wI" style="color:${VI}">?</span><span class="u">A</span>
  <span class="k" style="color:${TE}">V</span><span class="v" id="wV" style="color:${TE}">?</span><span class="u">V</span>`;
const wSt = [
  [K(`${kI('I')} = \\dfrac{${kE('E')}}{R + r} = \\dfrac{1.5}{2.5 + 0.5}`), '', 84],
  [K(`${kI('I')} = 0.5\\,\\text{A}`), 'the current', 210],
  [K(`${kI('I')}r = 0.5 \\times 0.5 = 0.25\\,\\text{V}`), 'lost inside', 300],
  [K(`${kE('V')} = 1.5 - 0.25 = 1.25\\,\\text{V}`), '', 400]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRw = [...$('#wSteps').children];
const tWs = [wt('W3', 'I'), wt('W3', 'That'), wt('W4', 'The'), wt('W5', 'So')];
const avW = PUC.avatar($('#sW'), { x: 1008, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'A quarter volt never reaches the lamp.' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Terminal voltage always equals the EMF', right: 'V = E only when no current flows', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcC = [[W(tcS, 'M150,150 H215'), ...cellH(tcS, 215, 150), W(tcS, 'M241,150 H306')], [W(tcS, 'M480,150 H545'), ...cellH(tcS, 545, 150), W(tcS, 'M571,150 H636')]];
const tcA = [PUC.arrow(tcS, VI), PUC.arrow(tcS, VI)];
const tcT = [mono(tcS, 228, 230, 'GIVING CURRENT', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }), mono(tcS, 558, 230, 'BEING CHARGED', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 })];
const tcF = [0, 1].map(i => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${[110, 440][i]}px;top:240px;font-size:32px;white-space:nowrap`; d.innerHTML = K(i ? `${kE('V')} = ${kE('E')} + ${kI('I')}r` : `${kE('V')} = ${kE('E')} - ${kI('I')}r`); $('#tc').appendChild(d); return d; });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET', 'PUC BOARDS'], type: 'Define EMF and internal resistance · find E, r or the terminal voltage from readings' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A battery reads 11&nbsp;V at its terminals when it supplies 2&nbsp;A, and 10&nbsp;V when it supplies 4&nbsp;A. Find its EMF and internal resistance.', qW: 780,
  opts: [K('12\\,\\text{V},\\ 0.5\\,\\Omega'), K('11\\,\\text{V},\\ 0.5\\,\\Omega'), K('12\\,\\text{V},\\ 0.25\\,\\Omega'), K('13\\,\\text{V},\\ 1\\,\\Omega')], right: 0, optW: 474, optY: 330 });
const qS = $('#qS');
const QG = PUC.graph(qS, { x: 90, y: 280, w: 380, h: 240, xmax: 6, ymin: 0, ymax: 14, xt: [0, 2, 4], yt: [], xl: 'I (A)', yl: 'V' });
const qLine = QG.mk('path', { d: `M${QG.X(0)},${QG.Y(12)} L${QG.X(6)},${QG.Y(9)}`, fill: 'none', stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const qP = [QG.mk('circle', { cx: QG.X(2), cy: QG.Y(11), r: 9, fill: AM, stroke: INK, 'stroke-width': 2 }), QG.mk('circle', { cx: QG.X(4), cy: QG.Y(10), r: 9, fill: AM, stroke: INK, 'stroke-width': 2 })];
const qQ = mono(qS, QG.X(0) + 14, QG.Y(12) - 14, 'E = ?', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const qRows = [[`${kI('I')} = 2\\,\\text{A}`, `${kE('V')} = 11\\,\\text{V}`], [`${kI('I')} = 4\\,\\text{A}`, `${kE('V')} = 10\\,\\text{V}`]].map(([a, b], i) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:36px;top:${86 + i * 72}px;font-size:32px;white-space:nowrap`; d.innerHTML = K(`${a} \\;\\to\\; ${b}`); $('#qc').appendChild(d); return d; });
const sol = PUC.solution($('#so'), [[K(`${kE('V')} = ${kE('E')} - ${kI('I')}r`)], [K(`11 = ${kE('E')} - 2r`)], [K(`10 = ${kE('E')} - 4r`)],
  [K(`1 = 2r \\Rightarrow r = 0.5\\,\\Omega`)], [K(`${kE('E')} = 11 + 2(0.5) = 12\\,\\text{V}`)]], { dy: 96, y0: 96 });
const tSol = [wt('A2', 'Use'), wt('A3', 'Eleven'), wt('A3', 'ten'), wt('A4', 'Subtract'), wt('A5', 'Then')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 104, title: 'DC sources · formula card', txt: [0, 0, 1, 1],
  lines: [K(`${kI('I')} = \\dfrac{${kE('E')}}{R + r}`),
    K(`${kE('V')} = ${kE('E')} - ${kI('I')}r \\;\\;\\text{(giving)} \\qquad ${kE('V')} = ${kE('E')} + ${kI('I')}r \\;\\;\\text{(charging)}`),
    'Ideal voltage source: <i>r</i> = 0 &nbsp;·&nbsp; ideal current source: same <i>I</i> into any load',
    'EMF <i>E</i>: voltage with no current drawn &nbsp;·&nbsp; <i>r</i>: resistance inside'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 12', topic: "Network theorems and Thevenin's theorem", y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tB6 = wt('B6', 'scope') - 0.2;
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tB6, 1.1, 1300, 470], [wt('B6', 'That') - 0.6, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const tGh = [[tMorph + 0.6, tS - 0.32], [tB + 0.3, tD - 0.32], [tG + 0.2, tT - 0.32], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gi = tGh.findIndex(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gi < 0) M.hide(ghost, true); else M.vis(ghost, t, tGh[gi][0], tGh[gi][1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tS + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tS - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tPress - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hC'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o });
    drawSeq([...hBat, ...hW], t, tMorph + 0.7, 0.3, 0.08); M.vis(hLamp, t, tMorph + 1.0, 1e9, { dy: 0, fade: 0.2 }); drawSeq(hLx, t, tMorph + 1.1, 0.2, 0.06);
    fadeAt([hMot, hMt, hBtnW], t, tMorph + 1.2, 0.08); fadeAt(hLab, t, tMorph + 1.4, 0.1);
    const pr = M.io((t - tPress) / 0.2); PUC.attr(hBtn, 'transform', `translate(0,${(26 * pr).toFixed(1)})`);
    const dim = M.io((t - tDim) / 0.35);
    PUC.attr(hLamp, 'fill', M.mix(AM, C.ac2, dim));
    PUC.attr(hMot, 'fill', M.mix('#FFFFFF', C.ac2, pr));
    fadeAt([$('#hV'), $('#hVl')], t, tMorph + 1.3);
    M.setT($('#hV'), (12 - 3 * dim).toFixed(1) + ' V');
    M.vis($('#hQ'), t, wt('H3', 'missing') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* S: dc sources */
  const sOn2 = t >= tS - 0.05 && t < tE + 0.05; M.hide($('#sS'), !sOn2);
  if (sOn2) {
    const out = tE - 0.32;
    sT.forEach((el, i) => {
      M.vis(el, t, tS + 0.15 + i * 0.1, out, { dy: 36, ...o });
      const u = M.io((t - tSrc[i]) / 0.3);
      drawSeq(sG[i], t, tSrc[i] - 0.15, 0.3, 0.08);
      if (sPl[i]) M.vis(sPl[i], t, tSrc[i] + 0.2, 1e9, { dy: 0, fade: 0.2 });
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); el.querySelector('.ex').style.color = M.mix('#B8BCC6', MU, u);
      el.style.borderTopColor = M.mix('#D9DCE3', AM, u);
    });
    M.vis($('#sStrip'), t, wt('S4', 'Each') - 0.1, out, { dy: 30, ...o }); M.draw(sDcL, t, wt('S4', 'terminals'), 0.9, M.o3);
  }

  /* E: emf + internal resistance */
  const eOn = t >= tE - 0.05 && t < tB + 0.05; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = tB - 0.32;
    M.vis($('#eL'), t, tE + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#eR'), t, tE + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#eS1'), t, wt('E1', 'E') - 0.1, 1e9, { dy: 10 }); M.rise($('#eD1'), t, wt('E1', 'It') - 0.05, { st: 0.04 });
    M.vis($('#eS2'), t, wt('E2', 'internal') - 0.2, 1e9, { dy: 10 }); M.rise($('#eD2'), t, wt('E2', 'internal'), { st: 0.04 });
    drawSeq([...eW.slice(0, 2), ...ePl, eW[3]], t, tE + 0.5, 0.3, 0.1); fadeAt(eT, t, tE + 0.9); fadeAt([eLab[0], eLab[1], eLab[4], eLab[5]], t, wt('E1', 'E') + 0.2, 0.1);
    M.draw(eW[2], t, wt('E2', 'resist') - 0.1, 0.5); fadeAt([eLab[2], eLab[3]], t, wt('E2', 'small') - 0.2, 0.1);
    M.draw(eBox, t, wt('E3', 'real') - 0.2, 0.9); M.vis(eBoxL, t, wt('E3', 'real') + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(eLab[6], t, wt('E3', 'hidden'), 1e9, { dy: 8 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    drawSeq(ckW, t, tB + 0.5, 0.35, 0.1); drawSeq(ckPl, t, wt('B1', 'twelve') - 0.1, 0.25, 0.1);
    M.draw(ckBox, t, wt('B1', 'internal') - 0.3, 0.8); M.vis(ckBoxL, t, wt('B1', 'internal') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(ckLab.slice(0, 2), t, wt('B1', 'twelve'), 0.08); fadeAt(ckLab.slice(2, 4), t, wt('B1', 'internal'), 0.08); fadeAt(ckLab.slice(4), t, tB + 1.4, 0.1);
    fadeAt([swPiv, swEnd], t, tB + 1.2, 0.08); M.vis(swLevW, t, tB + 1.3, 1e9, { dy: 0, fade: 0.2 });
    const s1 = M.spring(t - tClose, M.SNAP); PUC.attr(swLev, 'transform', `rotate(${(t < tClose ? -32 : -32 * (1 - s1)).toFixed(2)} 330 110)`);
    drawSeq(vmW, t, wt('B2', 'voltmeter') - 0.3, 0.3, 0.1); fadeAt([vm, vmT, vmR, ...ckN], t, wt('B2', 'voltmeter') - 0.1, 0.06);
    M.vis(rL, t, tB + 1.5, 1e9, { dy: 0, fade: 0.2 }); M.setT(rL, RL(t).toFixed(1) + ' Ω');
    const kn = M.io((t - (tHv - 0.5)) / 0.4); knob.set(728, 368, 728 + (796 - 728) * kn, 368 + (184 - 368) * kn);
    const ia = M.io((t - tClose - 0.2) / 0.4); ckIA.set(560, 84, 560 + 70 * ia, 84); ckIL.style.opacity = ia;
    const fOn = closed(t); eFl.set(fOn ? 40 * integ(If, tClose, t) : 0, fOn); M.vis($('#ckE'), t, tClose, 1e9, { dy: 0, fade: 0.2 });
    const V = Vf(t), I = If(t);
    M.setT(vmR, V.toFixed(1) + ' V');
    trE(() => 150, t, tB + 0.8, 6, 186, t >= tB + 0.8); trV(τ => 12.5 * Vf(τ), t, tB + 0.8, 6, 186, t >= tB + 0.8);
    sLab.forEach((e, i) => M.vis(e, t, tB + 0.8 + i * 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#sagT'), t, wt('B6', 'sinks') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro1'), t, tB + 0.9, 1e9, { dy: 12 });
    M.setT($('#rI'), I.toFixed(2)); M.setT($('#rLo'), (0.5 * I).toFixed(1)); M.setT($('#rV'), V.toFixed(1));
    avB(t, wt('B6', 'dims') + 0.3, out);
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tG + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tG - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...dW, ...dPl], t, tD + 0.4, 0.25, 0.07); M.draw(dBox, t, tD + 0.8, 0.7); fadeAt(dLab, t, tD + 1.0, 0.1);
    const ia = M.io((t - tD - 1.2) / 0.4); dI.set(400, 80, 400 + 60 * ia, 80); dIL.style.opacity = ia;
    M.draw(dLp, t, wt('D2', 'Walk') - 0.1, 1.0, M.o3); M.vis(dLpH, t, wt('D2', 'Walk') + 0.8, 1e9, { dy: 0, fade: 0.15 });
    dTags.forEach((e, i) => M.vis(e, t, wt('D2', ['E', 'minus', 'minus'][i], i === 2 ? 1 : 0), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    dR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); M.vis(r.querySelector('.why'), t, tDs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tDs[i] - 0.15); });
    M.vis($('#dBox'), t, tDs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis(dUnit, t, wt('D6', 'Volts'), 1e9, { dy: 10 });
  }

  /* G: V-I line */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gL'), t, tG + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#gR'), t, tG + 0.25, 1e9, { dx: 60, dy: 0 });
    M.draw(G.axes, t, tG + 0.4, 0.6);
    const u = M.io((t - wt('G1', 'straight') + 0.2) / 1.6); gReal(s => [s, 12 - 0.5 * s], 0, 24 * u);
    fadeAt(gPts, t, wt('G1', 'straight') + 0.2, 0.2); fadeAt(gLab.slice(3), t, wt('G1', 'straight') + 0.3, 0.2);
    M.vis(gLab[0], t, wt('G2', 'starts'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gLab[1], t, wt('G2', 'steepness') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const ip = 2 + 4 * (0.5 - 0.5 * Math.cos(Math.max(0, t - wt('G2', 'slopes')) * 1.4));
    gDot(ip, 12 - 0.5 * ip, t >= wt('G2', 'slopes') - 0.2);
    M.drawU(gIdeal, M.io((t - tGl[0]) / 0.8)); M.vis(gLab[2], t, tGl[0] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    gT.forEach((el, i) => { M.vis(el, t, tG + 0.5 + i * 0.12, 1e9, { dy: 20 }); const lit = M.io((t - tGl[i]) / 0.3);
      el.style.background = M.mix(C.soft, '#FFFFFF', lit); el.style.borderColor = M.mix(C.soft, AM, lit); el.querySelector('.tn').style.color = M.mix('#9AA0AC', INK, lit);
      M.draw(gM[i][0], t, tGl[i] + 0.2, 0.5); M.vis(gMl[i], t, tGl[i] + 0.6, 1e9, { dy: 0, fade: 0.2 });
      M.draw(gM[i][1], t, wt('G5', i ? 'current' : 'voltage') - 0.1, 0.5); });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Terminal') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...wW, ...wPl], t, wt('W1', 'cell') - 0.1, 0.25, 0.07); M.draw(wBox, t, wt('W1', 'internal') - 0.2, 0.7);
    fadeAt(wLab.slice(0, 2), t, wt('W1', 'one'), 0.4); M.vis(wLamp, t, wt('W1', 'lamp') - 0.3, 1e9, { dy: 0, fade: 0.2 }); drawSeq(wLx, t, wt('W1', 'lamp') - 0.2, 0.2, 0.06); M.vis(wLab[2], t, wt('W1', 'lamp') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const ia = M.io((t - wt('W2', 'current') + 0.1) / 0.4); wI.set(360, 62, 360 + 50 * ia, 62); wIL.style.opacity = ia;
    PUC.attr(wLamp, 'fill', M.mix('#FFFFFF', AM, 0.75 * M.io((t - tWs[1]) / 0.4)));
    M.vis($('#wRo'), t, wt('W2', 'Find'), 1e9, { dy: 12 });
    M.setT($('#wI'), t < tWs[1] ? '?' : '0.50'); M.setT($('#wV'), t < tWs[3] ? '?' : '1.25');
    wRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wBox'), t, tWs[3] + 0.7, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, wt('W5', 'one', 1) + 0.4, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Only'), tRight: wt('X3', 'Only') + 0.2 });
    drawSeq(tcC[0], t, tX + 0.5, 0.3, 0.1); drawSeq(tcC[1], t, tX + 0.7, 0.3, 0.1); fadeAt(tcT, t, tX + 0.9, 0.1);
    const a1 = M.io((t - wt('X3', 'gives') + 0.1) / 0.4), a2 = M.io((t - wt('X3', 'charged') + 0.1) / 0.4);
    tcA[0].set(320, 120, 320 + 80 * a1, 120); tcA[1].set(730, 120, 730 - 80 * a2, 120);
    M.vis(tcF[0], t, wt('X3', 'V'), 1e9, { dx: -10, dy: 0 }); M.vis(tcF[1], t, wt('X3', 'V', 1), 1e9, { dx: -10, dy: 0 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'NEET'), wt('X4', 'PUC')], tType: wt('X4', 'definitions') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.4, tCount, tAns });
    M.vis($('#qc'), t, tQ + 0.3, tAns - 0.2, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    qRows.forEach((r, i) => M.vis(r, t, wt('Q1', i ? 'ten' : 'eleven') - 0.1, 1e9, { dx: -12, dy: 0 }));
    M.draw(QG.axes, t, tQ + 0.6, 0.5); qP.forEach((p, i) => M.vis(p, t, wt('Q1', i ? 'ten' : 'eleven') + 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }));
    M.draw(qLine, t, wt('Q1', 'Find'), 0.8); M.vis(qQ, t, wt('Q1', 'Find') + 0.6, 1e9, { dy: 0, fade: 0.2 });
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
