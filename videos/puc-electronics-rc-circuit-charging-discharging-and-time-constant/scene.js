// PUC Electronics Ep 34 - RC circuit: charging, discharging and time constant ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, charge Q orange, t, R, C, tau ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, GD = '#B7791F', TEL = '#9FD2D2';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const Iv = c(VI, 'I'), I0 = c(VI, 'I_0'), VC = c(TE, 'V_C'), VR = c(TE, 'V_R'), Vv = c(TE, 'V'), V0 = c(TE, 'V_0');
const OM = '\\Omega';
const ex = Math.exp;
const subify = el => { if (el && /_/.test(el.textContent)) el.innerHTML = el.textContent.replace(/_(\w+)/g, '<tspan baseline-shift="sub" font-size="72%">$1</tspan>'); return el; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions; single-shot sweep traces drawn live from the switch moment */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': j === 2 ? 2.5 : 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      // f(seconds since start) -> y offset (px, up = +); span = seconds across the screen
      return (f, el, span, on = true, N = 140) => { M.hide(p, !on || el <= 0); if (!on || el <= 0) return; const e = Math.min(el, span); let d = '';
        for (let i = 0; i <= N; i++) { const s = e * i / N, x = 6 + (w - 12) * s / span, y = h / 2 - f(s); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
const capSym = (p, x, y, s = 1, a = {}) => [W(p, `M${x},${y - 30 * s} V${y - 8 * s}`, a), W(p, `M${x - 26 * s},${y - 8 * s} H${x + 26 * s}`, { 'stroke-width': 5, ...a }), W(p, `M${x - 26 * s},${y + 8 * s} H${x + 26 * s}`, { 'stroke-width': 5, ...a }), W(p, `M${x},${y + 8 * s} V${y + 30 * s}`, a)];
const resSym = (p, x, y, a = {}) => W(p, `M${x},${y} H${x + 26} L${x + 34},${y - 14} L${x + 48},${y + 14} L${x + 62},${y - 14} L${x + 76},${y + 14} L${x + 90},${y - 14} L${x + 98},${y} H${x + 124}`, a);

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'clicks') - 0.2;
const tI = T0('I1'), tB = T0('B1'), tM = T0('M1'), tC = T0('C1'), tD = T0('D1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const TAU = 2.2; // our breadboard: 10 kOhm x 220 uF

/* ================= A: hook ================= */
const camera = (svg, on) => {
  const b = [W(svg, 'M40,64 H250 Q262,64 262,76 V170 Q262,182 250,182 H40 Q28,182 28,170 V76 Q28,64 40,64 Z', { fill: '#fff' }),
    W(svg, 'M62,64 V50 H112 V64', { 'stroke-width': 3 })];
  const lens = mk(svg, 'circle', { cx: 132, cy: 124, r: 40, fill: '#E9ECF2', stroke: INK, 'stroke-width': 4 });
  const lens2 = mk(svg, 'circle', { cx: 132, cy: 124, r: 18, fill: INK });
  const fl = mk(svg, 'rect', { x: 196, y: 78, width: 46, height: 26, rx: 4, fill: on ? '#FFF1C9' : '#D9DCE3', stroke: INK, 'stroke-width': 3 });
  return { b, lens, lens2, fl };
};
const h1S = $('#h1S'), h2S = $('#h2S');
const cam1 = camera(h1S, true), cam2 = camera(h2S, false);
const burst = [[219, 60, 219, 22], [244, 70, 272, 44], [194, 70, 168, 44], [252, 92, 284, 92]].map(([a, b2, c2, d]) => W(h1S, `M${a},${b2} L${c2},${d}`, { stroke: AM, 'stroke-width': 5 }));
const tFire = wt('H1', 'fires'), tAgain = wt('H2', 'again'), tNot = wt('H2', 'not');

/* ================= I: water tank analogy ================= */
const iS = $('#iS');
const tap = [W(iS, 'M70,96 H150 V140 H70 Z', { fill: '#E9ECF2' }), W(iS, 'M96,96 V76 M80,76 H112', { 'stroke-width': 5 })];
const pipe = W(iS, 'M150,118 H392 V196', { 'stroke-width': 10, stroke: '#8B93A7' });
const pipeL = mono(iS, 230, 104, 'thin pipe', { 'font-weight': 600 });
const tank = W(iS, 'M300,190 V520 H660 V190', { 'stroke-width': 5 });
const tankL = mono(iS, 680, 512, 'tank', { 'font-weight': 600 });
const water = mk(iS, 'rect', { x: 302.5, y: 517, width: 355, height: 0, fill: '#BFE0E0' });
const surf = mk(iS, 'line', { x1: 303, x2: 657, y1: 517, y2: 517, stroke: TE, 'stroke-width': 4 });
const stream = mk(iS, 'rect', { x: 386, y: 200, width: 12, height: 0, fill: '#7FC4C4' });
const pushA = PUC.arrow(iS, INK, 5, 14);
const pushL = mono(iS, 430, 0, 'pushes back', { 'font-weight': 600, fill: INK });
const lvlL = mono(iS, 470, 0, 'level', { fill: TE, 'font-weight': 600 });
const flowL = mono(iS, 410, 236, 'flow', { fill: VI, 'font-weight': 600 });
const tFill = wt('I2', 'rushes') - 0.3, TAUI = 1.7;
const lvl = t => t < tFill ? 0 : 1 - ex(-(t - tFill) / TAUI);
const iG = $('#iG');
const gi = PUC.graph(iG, { x: 110, y: 110, w: 580, h: 300, xmax: 8, ymax: 1.05, xl: 'time', yl: '' });
gi.xlab.setAttribute('y', 444);
const giL = gi.curve(TE, 5), giF = gi.curve(VI, 5);
const giLL = mono(iG, 0, 0, 'water level', { fill: TE, 'font-weight': 600, 'font-size': 22 }), giFL = mono(iG, 0, 0, 'flow', { fill: VI, 'font-weight': 600, 'font-size': 22 });
const giN = mono(iG, 110, 520, 'fast at first, then slower and slower', { fill: INK, 'font-weight': 600, 'font-size': 24 });
const it0 = $('#it0 svg'), it1 = $('#it1 svg');
const itC = capSym(it0, 75, 40, 1.1), itR = resSym(it1, 13, 40);
$('#iZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M170,268 V130 H323'), W(ck, 'M170,300 V490 H780 V330'), W(ck, 'M780,300 V183 H640'), W(ck, 'M480,183 H420'), W(ck, 'M330,243 V490')];
const bRes = resSym(ck, 480, 183); PUC.attr(bRes, 'd', 'M480,183 L490,169 L506,197 L522,169 L538,197 L554,169 L570,197 L586,169 L602,197 L618,169 L634,197 L640,183');
const bCell = [W(ck, 'M135,268 H205', { 'stroke-width': 5 }), W(ck, 'M152,300 H188', { 'stroke-width': 9 })];
const bCap = [W(ck, 'M730,300 H830', { 'stroke-width': 6 }), W(ck, 'M730,330 H830', { 'stroke-width': 6 })];
const cA = mk(ck, 'circle', { cx: 330, cy: 130, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), cB = mk(ck, 'circle', { cx: 330, cy: 236, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const piv = mk(ck, 'circle', { cx: 420, cy: 183, r: 8, fill: INK });
const blade = W(ck, 'M420,183 L420,183', { 'stroke-width': 5 });
const bLb = [tx(ck, 112, 276, '+', { 'font-size': 28 }), mono(ck, 60, 330, '10 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }),
  tx(ck, 560, 146, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 560, 236, '10 kΩ', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 }),
  tx(ck, 852, 312, 'C', { 'font-style': 'italic', 'font-size': 28 }), mono(ck, 852, 344, '220 μF', { 'font-weight': 600, 'font-size': 22 }),
  mono(ck, 330, 108, 'charge', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(ck, 344, 270, 'discharge', { 'font-weight': 600 }), tx(ck, 432, 226, 'S', { 'font-size': 24 })];
const qP = [742, 766, 794, 818].map(x => tx(ck, x, 292, '+', { 'text-anchor': 'middle', fill: OR, 'font-size': 24, 'font-weight': 700 }));
const qN = [742, 766, 794, 818].map(x => tx(ck, x, 356, '−', { 'text-anchor': 'middle', fill: OR, 'font-size': 26, 'font-weight': 700 }));
const bI = PUC.arrow(ck, VI, 5, 16), bIL = tx(ck, 0, 0, 'I', { 'font-style': 'italic', fill: VI, 'font-size': 26, 'text-anchor': 'middle' });
const skipC = (x, y) => (Math.abs(x - 170) < 2 && y > 262 && y < 306) || (Math.abs(x - 780) < 2 && y > 296 && y < 334) || (Math.abs(y - 183) < 2 && x > 478 && x < 642);
const eC = flow(ck, [[170, 300], [170, 490], [780, 490], [780, 330], [780, 300], [780, 183], [420, 183], [330, 130], [170, 130], [170, 268], [170, 300]], 30, { skip: skipC });
const eD = flow(ck, [[780, 330], [780, 490], [330, 490], [330, 236], [420, 183], [780, 183], [780, 300], [780, 330]], 24, { skip: skipC });
const tOn = wt('B3', 'Flip'), tOff = wt('B8', 'flip');
// physics on the breadboard (real time, tau = 2.2 s)
const bV = t => t < tOn ? 0 : t < tOff ? 10 * (1 - ex(-(t - tOn) / TAU)) : 10 * (1 - ex(-(tOff - tOn) / TAU)) * ex(-(t - tOff) / TAU);
const bI_ = t => t < tOn ? 0 : t < tOff ? ex(-(t - tOn) / TAU) : -(bV(tOff - 1e-6) / 10) * ex(-(t - tOff) / TAU); // mA
const V0B = bV(tOff - 1e-6);
const sv = 165; // px/s per mA
const offC = t => t < tOn ? 0 : sv * TAU * (1 - ex(-(Math.min(t, tOff) - tOn) / TAU));
const offD = t => t < tOff ? 0 : sv * (V0B / 10) * TAU * (1 - ex(-(t - tOff) / TAU));
const scS = $('#scS'), sco = scope(scS, 592, 200), trV = sco.tr(TE), trI = sco.tr(VI);
const scL = [sco.lab(470, 190, 'CH1 V_C', TE, { 'text-anchor': 'end' }), sco.lab(578, 190, 'CH2 I', VI, { 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>C</sub></span><span class="v" id="rV" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">mA</span>
  <span class="k">t</span><span class="v" id="rT">0.0</span><span class="u">s</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The current is biggest right at the start!' });

/* ================= M: why it slows ================= */
const mS = $('#mS');
const mBx = 96, mBy = 96, mBw = 150, mBh = 400;
const mFrame = mk(mS, 'rect', { x: mBx, y: mBy, width: mBw, height: mBh, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const mR = mk(mS, 'rect', { x: mBx + 3, y: mBy + 3, width: mBw - 6, height: 0, fill: TEL });
const mCb = mk(mS, 'rect', { x: mBx + 3, y: mBy + mBh - 3, width: mBw - 6, height: 0, fill: TE });
const mTop = mono(mS, mBx + mBw / 2, mBy - 16, '10 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 });
const mSw = [mk(mS, 'rect', { x: 290, y: 150, width: 22, height: 22, rx: 4, fill: TEL }), mk(mS, 'rect', { x: 290, y: 270, width: 22, height: 22, rx: 4, fill: TE })];
const mLR = [tx(mS, 328, 170, 'V', { 'font-style': 'italic', fill: TE, 'font-size': 30 }), tx(mS, 348, 178, 'R', { 'font-style': 'italic', fill: TE, 'font-size': 19 }), mono(mS, 400, 170, '', { fill: TE, 'font-weight': 600, 'font-size': 30 }), mono(mS, 560, 170, 'resistor', { 'font-size': 20 })];
const mLC = [tx(mS, 328, 290, 'V', { 'font-style': 'italic', fill: TE, 'font-size': 30 }), tx(mS, 348, 298, 'C', { 'font-style': 'italic', fill: TE, 'font-size': 19 }), mono(mS, 400, 290, '', { fill: TE, 'font-weight': 600, 'font-size': 30 }), mono(mS, 560, 290, 'capacitor', { 'font-size': 20 })];
const mIl = [mono(mS, 290, 400, 'CURRENT', { 'font-weight': 600, 'font-size': 18, 'letter-spacing': '0.08em' }), mk(mS, 'rect', { x: 290, y: 420, width: 440, height: 26, rx: 13, fill: '#EEF0F4' })];
const mIb = mk(mS, 'rect', { x: 290, y: 420, width: 0, height: 26, rx: 13, fill: VI });
const mIv = mono(mS, 730, 400, '', { 'text-anchor': 'end', fill: VI, 'font-weight': 600, 'font-size': 24 });
const tMs = wt('M5', 'piles') - 0.3;
const mV = t => t < tMs ? 0 : 10 * (1 - ex(-(t - tMs) / TAU));
const mRows = rows($('#mSteps'), [
  [K(`${Vv} = ${VR} + ${VC}`), 'the 10 V is shared', 84],
  [K(`${VC} = 0,\\ \\ ${VR} = 10\\,\\text{V}`), 'empty at the start', 176],
  [K(`${Iv} = ${VR}\\,/\\,R`), 'so the current is big', 268],
  [K(`${VC}\\uparrow \\ \\Rightarrow\\ ${VR}\\downarrow`), 'charge piles up', 360]]);
const tMR = [wt('M2', 'shared'), wt('M3', 'empty'), wt('M4', 'current'), wt('M6', 'Less')];
$('#mZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= C: time constant ================= */
const cS = $('#cS');
const gc = PUC.graph(cS, { x: 110, y: 96, w: 580, h: 360, xmax: 5.4, ymax: 100, xt: [1, 2, 3, 4, 5], yt: [20, 40, 60, 80, 100], xl: 't ÷ τ', yl: 'V_C (% of 10 V)' });
gc.ylab.setAttribute('fill', TE); gc.ylab.setAttribute('y', 76); gc.ylab.setAttribute('x', 110); gc.xlab.setAttribute('y', 508);
const gcc = gc.curve(TE, 5), gcc2 = gc.curve(INK, 3);
const tauPts = [[1, 63.2], [2, 86.5], [5, 99.3]];
const cDrop = tauPts.map(([a, b]) => gc.mk('path', { d: `M${gc.X(a)},${gc.Y(0)} V${gc.Y(b)} H${gc.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const cDot = tauPts.map(([a, b]) => gc.mk('circle', { cx: gc.X(a), cy: gc.Y(b), r: 9, fill: TE, stroke: '#fff', 'stroke-width': 2 }));
const cLab = tauPts.map(([a, b], i) => mono(cS, gc.X(a) - 14, gc.Y(b) - 14, b.toFixed(1) + '%', { fill: TE, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' }));
$('#cZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const c2L = mono(cS, gc.X(3.3), gc.Y(62), 'bigger RC', { 'font-weight': 600, fill: INK, 'font-size': 20 });
$('#cF').innerHTML = K('\\tau = R\\,C');
$('#cTb').innerHTML = `<div class="h">AFTER</div><div class="h">CHARGED</div><div class="h" style="justify-content:flex-end">V<sub>C</sub></div>` +
  [['1 τ', 63.2], ['2 τ', 86.5], ['3 τ', 95.0], ['5 τ', 99.3]].map(([a, p]) => `<div class="r">${a}</div><div class="r bw"><i style="width:${p}%"></i></div><div class="r pc">${p.toFixed(1)}%</div>`).join('');
const cTbR = [...$('#cTb').querySelectorAll('.r')], cTbH = [...$('#cTb').querySelectorAll('.h')];
const tCR = [wt('C4', 'sixty'), wt('C5', 'eighty'), wt('C5', 'eighty') + 0.9, wt('C6', 'ninety')];

/* ================= D: the rules ================= */
const dS = $('#dS');
const gd = PUC.graph(dS, { x: 100, y: 110, w: 600, h: 330, xmax: 5.2, ymax: 1.1, xt: [1, 2, 3, 4, 5], xl: 't ÷ τ' });
gd.xlab.setAttribute('y', 494);
const gdV = gd.curve(TE, 5), gdI = gd.curve(VI, 5), gdV2 = gd.curve(TE, 5);
const dLV = mono(dS, gd.X(3.4), gd.Y(1.0) - 14, 'V_C', { fill: TE, 'font-weight': 600, 'font-size': 24 });
const dLI = mono(dS, gd.X(1.1), gd.Y(0.42), 'I', { fill: VI, 'font-weight': 600, 'font-size': 24 });
const dLV0 = mono(dS, gd.X(0) + 14, gd.Y(1.0) - 12, 'V_0', { fill: TE, 'font-weight': 600, 'font-size': 24 });
const dDrop = gd.mk('path', { d: `M${gd.X(1)},${gd.Y(0)} V${gd.Y(0.368)} H${gd.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const dDot = gd.mk('circle', { cx: gd.X(1), cy: gd.Y(0.368), r: 9, fill: TE, stroke: '#fff', 'stroke-width': 2 });
const dDotL = mono(dS, gd.X(1) + 16, gd.Y(0.368) - 10, '37% left', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const dDrop1 = gd.mk('path', { d: `M${gd.X(1)},${gd.Y(0)} V${gd.Y(0.632)} H${gd.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const dDot1 = gd.mk('circle', { cx: gd.X(1), cy: gd.Y(0.632), r: 9, fill: TE, stroke: '#fff', 'stroke-width': 2 });
const dDot1L = mono(dS, gd.X(1) + 16, gd.Y(0.632) + 30, '63%', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const dRows1 = rows($('#dSteps1'), [
  [K(`${VC} = ${Vv}\\left(1 - e^{-t/\\tau}\\right)`), '', 92],
  [K('e \\approx 2.718'), 'a special number, not the electron charge', 196],
  [K('t = \\tau:\\ \\ 1 - \\tfrac{1}{e} = 0.632'), '63%', 284],
  [K(`${Iv} = ${I0}\\,e^{-t/\\tau}`), '', 372],
  [K(`${I0} = ${Vv}\\,/\\,R`), 'the current at the start', 460]]);
const tDR1 = [wt('D2', 'equals'), wt('D3b', 'special'), wt('D4', 'Put'), wt('D5', 'current'), wt('D5b', 'nought')];
const dRows2 = rows($('#dSteps2'), [
  [K(`${VC} = ${V0}\\,e^{-t/\\tau}`), '', 92],
  [K('t = \\tau:\\ \\ \\tfrac{1}{e} = 0.368'), '37% left', 196],
  [K(`1\\,${OM} = 1\\,\\text{V/A}`), 'ohm', 284],
  [K('1\\,\\text{F} = 1\\,\\text{C/V}'), 'farad', 372],
  [K(`${OM}\\times\\text{F} = \\text{C/A} = \\text{s}`), 'tau is in seconds', 460]]);
const tDR2 = [wt('D6', 'equals'), wt('D7', 'thirty'), wt('D8', 'ohm'), wt('D8b', 'farad'), wt('D9', 'cancel')];
const tDis = T0('D6');

/* ================= W: worked example ================= */
const wS = $('#wS');
const gw = PUC.graph(wS, { x: 110, y: 96, w: 580, h: 270, xmax: 12, ymax: 11, xt: [2.2, 4.4, 6.6, 8.8, 11], yt: [2, 4, 6, 8, 10], xl: 't (s)', yl: 'V_C (V)' });
gw.ylab.setAttribute('fill', TE); gw.ylab.setAttribute('y', 76); gw.ylab.setAttribute('x', 110); gw.xlab.setAttribute('y', 416);
const gwc = gw.curve(TE, 5);
const wDrop = gw.mk('path', { d: `M${gw.X(2.2)},${gw.Y(0)} V${gw.Y(6.32)} H${gw.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wDot = gw.mk('circle', { cx: gw.X(2.2), cy: gw.Y(6.32), r: 9, fill: TE, stroke: '#fff', 'stroke-width': 2 });
const wDotL = mono(wS, gw.X(2.2) + 16, gw.Y(6.32) + 30, '6.3 V at 2.2 s', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const wDot5 = gw.mk('circle', { cx: gw.X(11), cy: gw.Y(9.93), r: 9, fill: TE, stroke: '#fff', 'stroke-width': 2 });
const wDot5L = mono(wS, gw.X(11) - 8, gw.Y(9.93) - 18, 'full at 11 s', { fill: TE, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' });
const wChips = [mono(wS, 110, 462, 'R = 10 kΩ', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(wS, 330, 462, 'C = 220 μF', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(wS, 560, 462, 'τ = 2.2 s', { fill: AM, 'font-weight': 700, 'font-size': 24 })];
const wRows = rows($('#wSteps'), [
  [K(`R = 10\\,\\text{k}${OM},\\ \\ C = 220\\,\\mu\\text{F}`), 'given', 84],
  [K('\\tau = RC = 10^{4}\\times 220\\times10^{-6}'), '', 176],
  [K('\\tau = 2.2\\,\\text{s}'), 'the time constant', 280],
  [K(`${VC}(\\tau) = 0.632\\times 10 \\approx 6.3\\,\\text{V}`), '', 380],
  [K('5\\tau = 5\\times 2.2 = 11\\,\\text{s}'), 'practically full', 472]]);
const tWR = [wt('W1', 'ten'), wt('W2', 'Tau'), wt('W3', 'two'), wt('W4', 'voltage'), wt('W5', 'Five')];
$('#wZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'After one τ the capacitor is full', right: 'One τ is only 63%. Full takes about 5τ', y0: 96, y1: 184 });
const tcS = $('#tcS');
const gx = PUC.graph(tcS, { x: 70, y: 76, w: 330, h: 170, xmax: 5.4, ymax: 100, xl: 't ÷ τ', yl: 'V_C' });
gx.xlab.setAttribute('y', 286); gx.ylab.setAttribute('fill', TE);
const gxc = gx.curve(TE, 4);
const gxP = [[1, 63.2, C.red], [5, 99.3, C.ok]].map(([a, b, col]) => gx.mk('circle', { cx: gx.X(a), cy: gx.Y(b), r: 9, fill: col, stroke: '#fff', 'stroke-width': 2 }));
const gxL = [mono(tcS, 450, 150, '1 τ  →  63%', { fill: C.red, 'font-weight': 600, 'font-size': 26 }), mono(tcS, 450, 206, '5 τ  →  99%', { fill: C.ok, 'font-weight': 600, 'font-size': 26 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'JEE MAIN'], type: 'Find τ = RC, the voltage after a time t, or the time to reach a voltage' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 4&nbsp;μF capacitor charged to 12&nbsp;V discharges through 500&nbsp;kΩ. How long until its voltage falls to 3&nbsp;V? (Take ln&nbsp;2 = 0.693)', qW: 780,
  opts: [K('1.39\\,\\text{s}'), K('2.00\\,\\text{s}'), K('2.77\\,\\text{s}'), K('8.00\\,\\text{s}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K('\\tau = RC = 2\\,\\text{s}')], [K('\\tfrac{3}{12} = \\tfrac{1}{4} = \\left(\\tfrac{1}{2}\\right)^{2}')], [K('t_{1/2} = \\tau\\ln 2 \\approx 1.39\\,\\text{s}')], [K('t = 2\\,t_{1/2} \\approx 2.77\\,\\text{s}')]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'First'), wt('A3', 'Twelve'), wt('A4', 'Each'), wt('A5', 'So')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 510, y0: 96, dy: 80, title: 'RC circuit · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K('\\tau = R\\,C \\qquad \\text{(seconds)}'), K(`\\text{Charging:}\\ \\ ${VC} = ${Vv}\\left(1 - e^{-t/\\tau}\\right)`), K(`\\text{Discharging:}\\ \\ ${VC} = ${V0}\\,e^{-t/\\tau}`),
    K(`${Iv} = ${I0}\\,e^{-t/\\tau},\\qquad ${I0} = ${Vv}/R`), 'After 1τ: 63% charged, or 37% left. After 5τ: practically full.'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 35', topic: 'RL circuit and time constant', y: 772 });

[...document.querySelectorAll('svg text')].forEach(subify);
/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B4', 'Watch'), 1.1, 1010, 560], [T1('B7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gwd = 0;
const GH = [[tB + 0.5, tM - 0.4], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gwd) { gwd = ghost.offsetWidth; ghost.style.left = (1760 - gwd) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o }); drawSeq([...cam1.b], t, tMorph + 0.5, 0.5, 0.15); fadeAt([cam1.lens, cam1.lens2, cam1.fl], t, tMorph + 0.7);
    drawSeq(burst, t, tFire - 0.05, 0.2, 0.05); burst.forEach(b => PUC.attr(b, 'opacity', t < tFire + 1.2 ? 1 : Math.max(0, 1 - (t - tFire - 1.2) / 0.3).toFixed(2)));
    PUC.attr(cam1.fl, 'fill', t >= tFire - 0.05 && t < tFire + 1.4 ? AM : '#FFF1C9');
    M.rise($('#h1T'), t, tFire - 0.3); M.vis($('#h1M'), t, tFire + 0.3, 1e9, { dy: 10 });
    M.vis($('#h2C'), t, tAgain - 0.3, out, { dx: 60, dy: 0, ...o }); drawSeq([...cam2.b], t, tAgain - 0.2, 0.4, 0.12); fadeAt([cam2.lens, cam2.lens2, cam2.fl], t, tAgain);
    M.rise($('#h2T'), t, tNot - 0.2); M.vis($('#h2B'), t, tNot, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#h2M'), t, tNot + 0.3, 1e9, { dy: 10 });
    $('#h2B i').style.width = (300 * (1 - ex(-Math.max(0, t - tNot) / 2.2))).toFixed(1) + 'px';
    M.vis($('#h2Q'), t, T0('H3') + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I: water tank */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(tap, t, wt('I1', 'tap') - 0.2, 0.3, 0.1); M.draw(pipe, t, wt('I1', 'thin') - 0.2, 0.5); M.draw(tank, t, wt('I1', 'water'), 0.6);
    fadeAt([pipeL], t, wt('I1', 'pipe')); fadeAt([tankL], t, wt('I1', 'tank'));
    const u = lvl(t), H = 330 * 0.92 * u, top = 517 - H;
    PUC.attr(water, 'y', top.toFixed(1)); PUC.attr(water, 'height', H.toFixed(1)); PUC.attr(surf, 'y1', top.toFixed(1)); PUC.attr(surf, 'y2', top.toFixed(1)); M.hide(surf, u <= 0.001);
    const fl = t < tFill ? 0 : (1 - u);
    PUC.attr(stream, 'x', (392 - 2 - 12 * fl).toFixed(1)); PUC.attr(stream, 'width', (4 + 24 * fl).toFixed(1)); PUC.attr(stream, 'height', Math.max(0, top - 200).toFixed(1)); M.hide(stream, t < tFill);
    M.vis(flowL, t, tFill + 0.3, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(flowL, 'x', (408 + 12 * fl).toFixed(1));
    const tP = wt('I3', 'pushes') - 0.2, pa = M.io((t - tP) / 0.4);
    pushA.set(600, top - 8, 600, top - 8 - 70 * pa); M.hide(pushA.g, pa <= 0);
    M.vis(pushL, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(pushL, 'y', (top - 34).toFixed(1)); PUC.attr(pushL, 'x', 430);
    M.vis(lvlL, t, wt('I2', 'fast'), 1e9, { dy: 0, fade: 0.2 }); PUC.attr(lvlL, 'x', 316); PUC.attr(lvlL, 'y', (top + 28).toFixed(1));
    const tSwapI = T0('I6') - 0.1, gOn2 = t < tSwapI + 0.1;
    M.vis($('#iRL1'), t, tI + 0.4, tSwapI - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#iRL2'), t, tSwapI, 1e9, { dy: 10 });
    M.vis(iG, t, tFill - 0.2, tSwapI - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    if (gOn2) { const e2 = Math.max(0, t - tFill); giL(s => [s, 1 - ex(-s / TAUI)], 0, Math.min(e2, 7.8)); giF(s => [s, ex(-s / TAUI)], 0, Math.min(e2, 7.8));
      const xe = Math.min(e2, 7.8); PUC.attr(giLL, 'x', (gi.X(xe) - 10).toFixed(1)); PUC.attr(giLL, 'y', (gi.Y(1 - ex(-xe / TAUI)) - 16).toFixed(1)); PUC.attr(giLL, 'text-anchor', 'end');
      PUC.attr(giFL, 'x', (gi.X(xe) + 10).toFixed(1)); PUC.attr(giFL, 'y', (gi.Y(ex(-xe / TAUI)) + 8).toFixed(1)); M.hide(giFL, xe > 6.6); M.hide(giLL, xe < 1.2);
      M.vis(giN, t, wt('I4', 'slower'), 1e9, { dy: 10 }); }
    M.vis($('#it0'), t, wt('I6', 'tank') - 0.1, 1e9, { dy: 20 }); drawSeq(itC, t, wt('I6', 'capacitor'), 0.25, 0.08);
    M.vis($('#it1'), t, wt('I7', 'pipe') - 0.1, 1e9, { dy: 20 }); M.draw(itR, t, wt('I7', 'resistor'), 0.5);
    M.vis($('#iStrip'), t, T0('I8') + 0.1, 1e9, { dy: 24 }); M.vis($('#iNote'), t, wt('I8', 'circuit'), 1e9, { dy: 12 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tM + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    drawSeq(bw, t, wt('B2', 'ten') - 0.2, 0.4, 0.12); drawSeq(bCell, t, wt('B2', 'battery') - 0.2, 0.25, 0.1);
    M.draw(bRes, t, wt('B2', 'resistor') - 0.2, 0.4); drawSeq(bCap, t, wt('B2', 'capacitor') - 0.2, 0.25, 0.1);
    fadeAt([cA, cB, piv, blade], t, wt('B2', 'switch') - 0.2, 0.06); fadeAt(bLb, t, wt('B2', 'battery'), 0.06);
    // switch blade: rest midway, then to the charge contact, then to the discharge contact
    const kA = M.io((t - tOn + 0.15) / 0.3), kB = M.io((t - tOff + 0.15) / 0.3);
    const ang0 = -1.9, angA = Math.atan2(130 - 183, 330 - 420), angB = Math.atan2(236 - 183, 330 - 420);
    const ang = M.lerp(M.lerp(ang0 - 0.55, angA, kA), angB, kB), Lb = 104;
    PUC.attr(blade, 'd', `M420,183 L${(420 + Lb * Math.cos(ang)).toFixed(1)},${(183 + Lb * Math.sin(ang)).toFixed(1)}`);
    const V = bV(t), I = bI_(t), el = t < tOn ? 0 : t < tOff ? t - tOn : t - tOff;
    eC.set(offC(t), t >= tOn && t < tOff); eD.set(offD(t), t >= tOff);
    M.vis($('#ckE'), t, tOn, 1e9, { dy: 0, fade: 0.2 });
    [...qP, ...qN].forEach(e => PUC.attr(e, 'opacity', (V / 10).toFixed(2)));
    const ia = Math.abs(I); if (ia > 0.02 && t >= tOn) { const dir = I > 0 ? 1 : -1, cx2 = 712, len = 34 + 46 * ia; bI.set(cx2 - dir * len / 2, 154, cx2 + dir * len / 2, 154); PUC.attr(bIL, 'x', cx2); PUC.attr(bIL, 'y', 134); M.hide(bIL, false); } else { bI.set(0, 0, 0, 0); M.hide(bIL, true); }
    M.setT($('#rV'), V.toFixed(2)); M.setT($('#rI'), I.toFixed(2)); M.setT($('#rT'), el.toFixed(1));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 }); M.vis($('#slowT'), t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(scL, t, tB + 0.6);
    const span = 12, vOn = t >= tOn;
    if (t < tOff) { trV(s => 9 * 10 * (1 - ex(-s / TAU)), el, span, vOn); trI(s => 9 * 10 * ex(-s / TAU), el, span, vOn); }
    else { trV(s => 9 * V0B * ex(-s / TAU), el, span); trI(s => -9 * V0B * ex(-s / TAU), el, span); }
    avB(t, T0('B7') + 0.3, tOff - 0.2);
  }

  /* M: why it slows */
  const mOn = t >= tM - 0.05 && t < tC + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tC - 0.32;
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    const t2 = wt('M2', 'ten') - 0.2;
    fadeAt([mFrame, mTop], t, t2); M.vis(mR, t, wt('M3', 'resistor') - 0.3, 1e9, { dy: 0, fade: 0.25 }); M.vis(mCb, t, tMs - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const v = mV(t), hC = (mBh - 6) * v / 10, hR = (mBh - 6) - hC;
    PUC.attr(mCb, 'y', (mBy + mBh - 3 - hC).toFixed(1)); PUC.attr(mCb, 'height', hC.toFixed(1)); PUC.attr(mR, 'height', hR.toFixed(1));
    M.setT(mLR[2], (10 - v).toFixed(1) + ' V'); M.setT(mLC[2], v.toFixed(1) + ' V');
    fadeAt([mSw[0], ...mLR], t, wt('M3', 'resistor') - 0.2, 0.05); fadeAt([mSw[1], ...mLC], t, wt('M3', 'capacitor') - 0.2, 0.05);
    fadeAt([...mIl, mIb, mIv], t, wt('M4', 'current') - 0.3, 0.05);
    const I = (10 - v) / 10; PUC.attr(mIb, 'width', (440 * I).toFixed(1)); M.setT(mIv, I.toFixed(2) + ' mA');
    M.vis($('#mT'), t, tMs, 1e9, { dy: 0, fade: 0.2 });
    runRows(mRows, t, tMR);
    M.vis($('#mStrip'), t, T0('M7') + 0.1, 1e9, { dy: 24 });
  }

  /* C: time constant */
  const cOn = t >= tC - 0.05 && t < tD + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tD - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    const tc0 = tC + 0.5; gcc(s => [s, 100 * (1 - ex(-s))], 0, M.clamp((t - tc0) / 2.4) * 5.3);
    tauPts.forEach((p, i) => { const ti = i === 0 ? tCR[0] : i === 1 ? tCR[1] : tCR[3]; M.draw(cDrop[i], t, ti - 0.3, 0.5); M.vis(cDot[i], t, ti - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(cLab[i], t, ti + 0.1, 1e9, { dy: 0, fade: 0.2 }); });
    const t7 = wt('C7', 'Bigger'); gcc2(s => [s, 100 * (1 - ex(-s / 2))], 0, M.clamp((t - t7) / 1.6) * 5.3); M.vis(c2L, t, t7 + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#cStrip'), t, t7 + 0.2, 1e9, { dy: 24 });
    M.vis($('#cBox'), t, wt('C2', 'Multiply') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#cF'), t, wt('C2', 'capacitance') - 0.2, 0.6); M.vis($('#cFu'), t, wt('C3', 'time') , 1e9, { dx: -10, dy: 0 });
    cTbH.forEach(e => M.vis(e, t, tCR[0] - 0.4, 1e9, { dy: 0, fade: 0.2 }));
    for (let k = 0; k < 4; k++) { const ti = tCR[k]; for (let j = 0; j < 3; j++) M.vis(cTbR[k * 3 + j], t, ti - 0.15 + j * 0.06, 1e9, { dx: -12, dy: 0 }); const bi = cTbR[k * 3 + 1].querySelector('i'); bi.style.transform = `scaleX(${M.o3((t - ti) / 0.6).toFixed(3)})`; bi.style.transformOrigin = 'left'; }
  }

  /* D: rules */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.3, dis = t >= tDis - 0.2;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dLL1'), t, tD + 0.3, tDis - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dLL2'), t, tDis, 1e9, { dy: 10 });
    M.vis($('#dRL1'), t, tD + 0.4, tDis - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dRL2'), t, tDis, 1e9, { dy: 10 });
    const ch = !dis;
    gdV(s => [s, 1 - ex(-s)], 0, ch ? M.clamp((t - tD - 0.6) / 1.6) * 5.1 : 0); gdI(s => [s, ex(-s)], 0, ch ? M.clamp((t - tDR1[3]) / 1.4) * 5.1 : 0);
    gdV2(s => [s, ex(-s)], 0, dis ? M.clamp((t - tDR2[0]) / 1.4) * 5.1 : 0);
    M.hide(dLV, !ch); if (ch) M.vis(dLV, t, tD + 1.8, 1e9, { dy: 0, fade: 0.2 });
    M.hide(dLI, !ch); if (ch) M.vis(dLI, t, tDR1[3] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    [dDrop1, dDot1, dDot1L].forEach(e => M.hide(e, !ch)); if (ch) { M.draw(dDrop1, t, tDR1[2] + 0.2, 0.5); M.vis(dDot1, t, tDR1[2] + 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dDot1L, t, tDR1[2] + 0.7, 1e9, { dy: 0, fade: 0.2 }); }
    M.hide(dLV0, !dis); if (dis) M.vis(dLV0, t, tDR2[0] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    [dDrop, dDot, dDotL].forEach(e => M.hide(e, !dis)); if (dis) { M.draw(dDrop, t, tDR2[1] - 0.2, 0.5); M.vis(dDot, t, tDR2[1], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dDotL, t, tDR2[1] + 0.2, 1e9, { dy: 0, fade: 0.2 }); }
    dRows1.forEach(r => M.hide(r, dis)); if (!dis) runRows(dRows1, t, tDR1, tDis - 0.3);
    dRows2.forEach(r => M.hide(r, !dis)); if (dis) runRows(dRows2, t, tDR2);
    M.vis($('#dBox1'), t, tDR1[0] + 0.5, tDis - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#dBox2'), t, tDR2[0] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([wChips[0]], t, tWR[0]); fadeAt([wChips[1]], t, wt('W1b', 'two')); M.vis(wChips[2], t, tWR[2] + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    gwc(s => [s, 10 * (1 - ex(-s / 2.2))], 0, M.clamp((t - tWR[1]) / 2.6) * 11.6);
    M.draw(wDrop, t, wt('W4b', 'six') - 0.3, 0.5); M.vis(wDot, t, wt('W4b', 'six'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(wDotL, t, wt('W4b', 'six') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wDot5, t, wt('W5', 'eleven'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(wDot5L, t, wt('W5', 'eleven') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[2] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#wStrip'), t, T0('W6') + 0.1, 1e9, { dy: 24 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('X5') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'It') - 0.05, tRight: wt('X3', 'only') - 0.2 });
    gxc(s => [s, 100 * (1 - ex(-s))], 0, M.clamp((t - tX - 0.6) / 1.0) * 5.3);
    M.vis(gxP[0], t, wt('X3', 'sixty'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(gxL[0], t, wt('X3', 'sixty') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(gxP[1], t, wt('X4', 'five'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(gxL[1], t, wt('X4', 'five') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: T0('X5') - 0.2, tLight: [wt('X5', 'PUC'), wt('X6', 'JEE')], tType: T0('X7') - 0.1 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'When') - 0.4, tCount, tAns });
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
