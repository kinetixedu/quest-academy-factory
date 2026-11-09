// PUC Electronics Ep 35 - RL circuit and time constant ("Breadboard" style, Lab Notebook world)
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
const Iv = c(VI, 'I'), I0 = c(VI, 'I_0'), VL = c(TE, 'V_L'), VR = c(TE, 'V_R'), Vv = c(TE, 'V'), V0 = c(TE, 'V_0');
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

const coilV = (p, x, y0, n = 4, r = 15, a = {}) => { let d = `M${x},${y0}`; for (let i = 0; i < n; i++) d += ` a${r},${r} 0 0 1 0,${2 * r}`; return W(p, d, a); };
const coilH = (p, x0, y, n = 4, r = 13, a = {}) => { let d = `M${x0 - 20},${y} H${x0}`; for (let i = 0; i < n; i++) d += ` a${r},${r} 0 0 1 ${2 * r},0`; d += ` h20`; return W(p, d, a); };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'switches') - 0.2;
const tI = T0('I1'), tB = T0('B1'), tM = T0('M1'), tC = T0('C1'), tD = T0('D1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const TAU = 2.2; // on-screen seconds per tau (slow motion: tau = 5 ms)

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const fanG = mk(h1S, 'g');
const fanO = [W(h1S, 'M110,165 V178 M70,182 H150', { 'stroke-width': 5 }), mk(h1S, 'circle', { cx: 110, cy: 92, r: 70, fill: 'none', stroke: INK, 'stroke-width': 4 })];
const blades = mk(fanG, 'g'); [0, 120, 240].forEach(a => mk(blades, 'ellipse', { cx: 110, cy: 56, rx: 16, ry: 32, fill: '#E9ECF2', stroke: INK, 'stroke-width': 3, transform: `rotate(${a} 110 92)` }));
mk(fanG, 'circle', { cx: 110, cy: 92, r: 11, fill: INK });
const swB = [W(h1S, 'M212,70 H272 V140 H212 Z', { fill: '#fff' })], swT = W(h1S, 'M242,105 L232,82', { 'stroke-width': 7 });
const tOffH = wt('H1', 'off');
const fanAng = t => { const a = Math.max(0, t - tMorph); if (t < tOffH) return 720 * a; const b = t - tOffH; return 720 * (tOffH - tMorph) + 720 * 1.6 * (1 - ex(-b / 1.6)); };
const ct = [W(h2S, 'M30,100 H120', { 'stroke-width': 10 }), W(h2S, 'M170,100 H260', { 'stroke-width': 10 })];
const spark = W(h2S, 'M124,100 L134,84 L142,112 L152,86 L160,108 L168,100', { stroke: AM, 'stroke-width': 5 });
const spark2 = [W(h2S, 'M146,78 L146,60', { stroke: AM, 'stroke-width': 4 }), W(h2S, 'M130,72 L120,58', { stroke: AM, 'stroke-width': 4 }), W(h2S, 'M162,72 L172,58', { stroke: AM, 'stroke-width': 4 })];
const tSpark = wt('H2', 'spark');

/* ================= I: heavy water wheel ================= */
const iS = $('#iS');
const pipeW = [W(iS, 'M150,270 H330 M510,270 H720', { 'stroke-width': 5 }), W(iS, 'M150,330 H330 M510,330 H720', { 'stroke-width': 5 })];
const tapB = [W(iS, 'M70,250 H150 V350 H70 Z', { fill: '#E9ECF2' })];
const tapH = W(iS, 'M110,250 V214', { 'stroke-width': 7 });
const tapL = mono(iS, 110, 386, 'tap', { 'text-anchor': 'middle', 'font-weight': 600 });
const wHouse = mk(iS, 'circle', { cx: 420, cy: 300, r: 96, fill: '#F3F1EA', stroke: INK, 'stroke-width': 5 });
const wheelG = mk(iS, 'g');
const wheel = mk(wheelG, 'g');
mk(wheel, 'circle', { cx: 420, cy: 300, r: 70, fill: 'none', stroke: INK, 'stroke-width': 8 });
for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(wheel, 'line', { x1: 420, y1: 300, x2: 420 + 84 * Math.cos(a), y2: 300 + 84 * Math.sin(a), stroke: INK, 'stroke-width': 7, 'stroke-linecap': 'round' }); }
mk(wheel, 'circle', { cx: 420, cy: 300, r: 16, fill: INK });
const wL = mono(iS, 420, 440, 'heavy wheel', { 'text-anchor': 'middle', 'font-weight': 600, fill: INK });
const iWat = flow(iS, [[150, 288], [720, 288]], 9, { r: 6, fill: '#7FC4C4', stroke: '#0E8F8F', skip: x => x > 316 && x < 524 });
const iWat2 = flow(iS, [[150, 312], [720, 312]], 9, { r: 6, fill: '#7FC4C4', stroke: '#0E8F8F', skip: x => x > 316 && x < 524 });
const iArr = PUC.arrow(iS, VI, 5, 14), iArrL = mono(iS, 640, 236, 'flow', { fill: VI, 'font-weight': 600, 'text-anchor': 'middle' });
const tOpen = wt('I2', 'Open'), tClose = wt('I4', 'Close'), TW = 1.5;
const fI = t => t < tOpen ? 0 : t < tClose ? 1 - ex(-(t - tOpen) / TW) : (1 - ex(-(tClose - tOpen) / TW)) * ex(-(t - tClose) / TW);
const fc0 = 1 - ex(-(tClose - tOpen) / TW);
const sI = t => { if (t < tOpen) return 0; const a = Math.min(t, tClose) - tOpen; let s = a - TW * (1 - ex(-a / TW)); if (t > tClose) s += fc0 * TW * (1 - ex(-(t - tClose) / TW)); return s; };
const iG = $('#iG');
const gi = PUC.graph(iG, { x: 110, y: 110, w: 580, h: 300, xmax: 11, ymax: 1.05, xl: 'time', yl: '' });
gi.xlab.setAttribute('y', 444);
const giF = gi.curve(VI, 5);
const giFL = mono(iG, 0, 0, 'flow', { fill: VI, 'font-weight': 600, 'font-size': 22 });
const giC = gi.mk('line', { x1: gi.X(tClose - tOpen), x2: gi.X(tClose - tOpen), y1: gi.Y(0), y2: gi.Y(1.05), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const giCL = mono(iG, gi.X(tClose - tOpen) + 10, gi.Y(1.0), 'tap closed', { 'font-weight': 600 });
const giOL = mono(iG, gi.X(0) + 10, gi.Y(1.0), 'tap opened', { 'font-weight': 600 });
const giN = mono(iG, 110, 520, 'slow to start, and slow to stop', { fill: INK, 'font-weight': 600, 'font-size': 24 });
const it0 = $('#it0 svg'), it1 = $('#it1 svg');
const itL = coilH(it0, 40, 44, 4, 13), itA = PUC.arrow(it1, C.red, 5, 14), itA2 = PUC.arrow(it1, VI, 5, 14);
$('#iZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M170,268 V130 H323'), W(ck, 'M170,300 V490 H780 V380'), W(ck, 'M780,260 V183 H640'), W(ck, 'M480,183 H420'), W(ck, 'M330,243 V490')];
const bRes = W(ck, 'M480,183 L490,169 L506,197 L522,169 L538,197 L554,169 L570,197 L586,169 L602,197 L618,169 L634,197 L640,183');
const bCell = [W(ck, 'M135,268 H205', { 'stroke-width': 5 }), W(ck, 'M152,300 H188', { 'stroke-width': 9 })];
const bCoil = coilV(ck, 780, 260, 4, 15);
const cA = mk(ck, 'circle', { cx: 330, cy: 130, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), cB = mk(ck, 'circle', { cx: 330, cy: 236, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const piv = mk(ck, 'circle', { cx: 420, cy: 183, r: 8, fill: INK });
const blade = W(ck, 'M420,183 L420,183', { 'stroke-width': 5 });
const bLb = [tx(ck, 112, 276, '+', { 'font-size': 28 }), mono(ck, 60, 330, '10 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }),
  tx(ck, 560, 146, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 560, 236, '100 Ω', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 }),
  tx(ck, 822, 312, 'L', { 'font-style': 'italic', 'font-size': 28 }), mono(ck, 822, 344, '0.5 H', { 'font-weight': 600, 'font-size': 22 }),
  mono(ck, 330, 108, 'on', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(ck, 344, 270, 'off, with a path', { 'font-weight': 600 }), tx(ck, 432, 226, 'S', { 'font-size': 24 })];
const bSpark = W(ck, 'M300,112 L312,98 L318,120 L330,96 L336,118 L348,104', { stroke: AM, 'stroke-width': 5 });
const bI = PUC.arrow(ck, VI, 5, 16), bIL = tx(ck, 0, 0, 'I', { 'font-style': 'italic', fill: VI, 'font-size': 26, 'text-anchor': 'middle' });
const skipL = (x, y) => (Math.abs(x - 170) < 2 && y > 262 && y < 306) || (Math.abs(x - 780) < 2 && y > 256 && y < 384) || (Math.abs(y - 183) < 2 && x > 478 && x < 642);
const eC = flow(ck, [[170, 300], [170, 490], [780, 490], [780, 183], [420, 183], [330, 130], [170, 130], [170, 268], [170, 300]], 30, { skip: skipL });
const eD = flow(ck, [[330, 490], [780, 490], [780, 183], [420, 183], [330, 236], [330, 490]], 24, { skip: skipL });
const tOn = wt('B4', 'Flip'), tOff = wt('B8', 'flip');
const bI_ = t => t < tOn ? 0 : t < tOff ? 100 * (1 - ex(-(t - tOn) / TAU)) : 100 * (1 - ex(-(tOff - tOn) / TAU)) * ex(-(t - tOff) / TAU); // mA
const kOff = 1 - ex(-(tOff - tOn) / TAU);
const bVL = t => t < tOn ? 0 : t < tOff ? 10 * ex(-(t - tOn) / TAU) : -10 * kOff * ex(-(t - tOff) / TAU);
const sv = 165;
const offC = t => { if (t < tOn) return 0; const a = Math.min(t, tOff) - tOn; return sv * (a - TAU * (1 - ex(-a / TAU))); };
const offD = t => t < tOff ? 0 : sv * kOff * TAU * (1 - ex(-(t - tOff) / TAU));
const scS = $('#scS'), sco = scope(scS, 592, 200), trV = sco.tr(TE), trI = sco.tr(VI);
const scL = [sco.lab(470, 190, 'CH1 V_L', TE, { 'text-anchor': 'end' }), sco.lab(578, 190, 'CH2 I', VI, { 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.0</span><span class="u">mA</span>
  <span class="k" style="color:${TE}">V<sub>L</sub></span><span class="v" id="rV" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k">t</span><span class="v" id="rT">0.0</span><span class="u">ms</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The current keeps going the same way!' });

/* ================= M: why it rises slowly ================= */
const mS = $('#mS');
const mBx = 96, mBy = 96, mBw = 150, mBh = 400;
const mFrame = mk(mS, 'rect', { x: mBx, y: mBy, width: mBw, height: mBh, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const mTopR = mk(mS, 'rect', { x: mBx + 3, y: mBy + 3, width: mBw - 6, height: 0, fill: TEL });
const mBot = mk(mS, 'rect', { x: mBx + 3, y: mBy + mBh - 3, width: mBw - 6, height: 0, fill: TE });
const mTop = mono(mS, mBx + mBw / 2, mBy - 16, '10 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 });
const mSw = [mk(mS, 'rect', { x: 290, y: 150, width: 22, height: 22, rx: 4, fill: TEL }), mk(mS, 'rect', { x: 290, y: 270, width: 22, height: 22, rx: 4, fill: TE })];
const mLL = [tx(mS, 328, 170, 'V', { 'font-style': 'italic', fill: TE, 'font-size': 30 }), tx(mS, 348, 178, 'L', { 'font-style': 'italic', fill: TE, 'font-size': 19 }), mono(mS, 400, 170, '', { fill: TE, 'font-weight': 600, 'font-size': 30 }), mono(mS, 560, 170, 'coil', { 'font-size': 20 })];
const mLR = [tx(mS, 328, 290, 'V', { 'font-style': 'italic', fill: TE, 'font-size': 30 }), tx(mS, 348, 298, 'R', { 'font-style': 'italic', fill: TE, 'font-size': 19 }), mono(mS, 400, 290, '', { fill: TE, 'font-weight': 600, 'font-size': 30 }), mono(mS, 560, 290, 'resistor', { 'font-size': 20 })];
const mIl = [mono(mS, 290, 400, 'CURRENT', { 'font-weight': 600, 'font-size': 18, 'letter-spacing': '0.08em' }), mk(mS, 'rect', { x: 290, y: 420, width: 440, height: 26, rx: 13, fill: '#EEF0F4' })];
const mIb = mk(mS, 'rect', { x: 290, y: 420, width: 0, height: 26, rx: 13, fill: VI });
const mIv = mono(mS, 730, 400, '', { 'text-anchor': 'end', fill: VI, 'font-weight': 600, 'font-size': 24 });
const tMs = wt('M5', 'current') - 0.3;
const mV = t => t < tMs ? 0 : 10 * (1 - ex(-(t - tMs) / TAU)); // V_R
const mRows = rows($('#mSteps'), [
  [K(`${Vv} = ${VL} + ${VR}`), 'the 10 V is shared', 84],
  [K(`${VL} = L\\,\\dfrac{\\Delta ${Iv}}{\\Delta t}`), 'pushes back against change', 168],
  [K(`t = 0:\\ \\ ${VL} = 10\\,\\text{V},\\ ${VR} = 0`), 'all on the coil', 284],
  [K(`${Iv}\\uparrow\\ \\Rightarrow\\ ${VR}\\uparrow,\\ ${VL}\\downarrow`), 'more reaches the resistor', 376]]);
const tMR = [wt('M2', 'shared'), wt('M3', 'change'), wt('M4', 'all'), wt('M6', 'More')];
$('#mZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= C: time constant ================= */
const cS = $('#cS');
const gc = PUC.graph(cS, { x: 110, y: 96, w: 580, h: 360, xmax: 5.4, ymax: 100, xt: [1, 2, 3, 4, 5], yt: [20, 40, 60, 80, 100], xl: 't ÷ τ', yl: 'I (% of full current)' });
gc.ylab.setAttribute('fill', VI); gc.ylab.setAttribute('y', 76); gc.ylab.setAttribute('x', 110); gc.xlab.setAttribute('y', 508);
const gcc = gc.curve(VI, 5), gcc2 = gc.curve(INK, 3), gcc3 = gc.curve(GD, 3);
const tauPts = [[1, 63.2], [5, 99.3]];
const cDrop = tauPts.map(([a, b]) => gc.mk('path', { d: `M${gc.X(a)},${gc.Y(0)} V${gc.Y(b)} H${gc.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const cDot = tauPts.map(([a, b]) => gc.mk('circle', { cx: gc.X(a), cy: gc.Y(b), r: 9, fill: VI, stroke: '#fff', 'stroke-width': 2 }));
const cLab = tauPts.map(([a, b]) => mono(cS, gc.X(a) - 14, gc.Y(b) - 14, b.toFixed(1) + '%', { fill: VI, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' }));
const c2L = mono(cS, gc.X(3.3), gc.Y(62), 'bigger L', { 'font-weight': 600, fill: INK, 'font-size': 20 });
const c3L = mono(cS, gc.X(2.4), gc.Y(100) - 12, 'bigger R', { 'font-weight': 600, fill: GD, 'font-size': 20 });
$('#cZ').innerHTML = M.icon('zap', 32, AM, 2.4);
$('#cF').innerHTML = K('\\tau = \\dfrac{L}{R}');
$('#cTb').innerHTML = `<div class="h">AFTER</div><div class="h">CURRENT</div><div class="h" style="justify-content:flex-end">OF FULL</div>` +
  [['1 τ', 63.2], ['2 τ', 86.5], ['3 τ', 95.0], ['5 τ', 99.3]].map(([a, p]) => `<div class="r">${a}</div><div class="r bw"><i style="width:${p}%"></i></div><div class="r pc">${p.toFixed(1)}%</div>`).join('');
const cTbR = [...$('#cTb').querySelectorAll('.r')], cTbH = [...$('#cTb').querySelectorAll('.h')];
const tCR = [wt('C4', 'sixty'), wt('C4', 'sixty') + 0.9, wt('C4', 'full') + 0.3, wt('C5', 'five')];

/* ================= D: the rules ================= */
const dS = $('#dS');
const gd = PUC.graph(dS, { x: 100, y: 110, w: 600, h: 330, xmax: 5.2, ymax: 1.1, xt: [1, 2, 3, 4, 5], xl: 't ÷ τ' });
gd.xlab.setAttribute('y', 494);
const gdI = gd.curve(VI, 5), gdI2 = gd.curve(VI, 5);
const dLI = mono(dS, gd.X(2.2), gd.Y(0.72), 'I', { fill: VI, 'font-weight': 600, 'font-size': 24 });
const dLI0 = mono(dS, gd.X(0) + 14, gd.Y(1.0) - 12, 'I_0', { fill: VI, 'font-weight': 600, 'font-size': 24 });
const dFull = gd.mk('line', { x1: gd.X(0), x2: gd.X(5.2), y1: gd.Y(1), y2: gd.Y(1), stroke: VI, 'stroke-width': 2, 'stroke-dasharray': '8 8', opacity: 0.6 });
const dFullL = mono(dS, gd.X(5.2), gd.Y(1) - 12, 'I_0 = V/R', { fill: VI, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' });
const dDrop1 = gd.mk('path', { d: `M${gd.X(1)},${gd.Y(0)} V${gd.Y(0.632)} H${gd.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const dDot1 = gd.mk('circle', { cx: gd.X(1), cy: gd.Y(0.632), r: 9, fill: VI, stroke: '#fff', 'stroke-width': 2 });
const dDot1L = mono(dS, gd.X(1) + 16, gd.Y(0.632) + 30, '63%', { fill: VI, 'font-weight': 600, 'font-size': 22 });
const dDrop = gd.mk('path', { d: `M${gd.X(1)},${gd.Y(0)} V${gd.Y(0.368)} H${gd.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const dDot = gd.mk('circle', { cx: gd.X(1), cy: gd.Y(0.368), r: 9, fill: VI, stroke: '#fff', 'stroke-width': 2 });
const dDotL = mono(dS, gd.X(1) + 16, gd.Y(0.368) - 10, '37% left', { fill: VI, 'font-weight': 600, 'font-size': 22 });
const dRows1 = rows($('#dSteps1'), [
  [K(`${I0} = ${Vv}\\,/\\,R`), 'the full current', 92],
  [K(`${Iv} = ${I0}\\left(1 - e^{-t/\\tau}\\right)`), 'growth', 196],
  [K('e \\approx 2.718'), 'the same special number', 300],
  [K(`t = \\tau:\\ \\ ${Iv} = 0.632\\,${I0}`), '63%', 388]]);
const tDR1 = [wt('D2', 'full'), wt('D3', 'equals'), wt('D4', 'special'), wt('D4b', 'At')];
const dRows2 = rows($('#dSteps2'), [
  [K(`${Iv} = ${I0}\\,e^{-t/\\tau}`), 'decay', 92],
  [K(`t = \\tau:\\ \\ ${Iv} = 0.368\\,${I0}`), '37% left', 196],
  [K('1\\,\\text{H} = 1\\,\\text{V s/A}'), 'henry', 284],
  [K(`1\\,${OM} = 1\\,\\text{V/A}`), 'ohm', 372],
  [K(`\\text{H} \\div ${OM} = \\text{s}`), 'tau is in seconds', 460]]);
const tDR2 = [wt('D5', 'equals'), wt('D6', 'thirty'), wt('D7', 'henry'), wt('D7b', 'ohm'), wt('D8', 'cancel')];
const tDis = T0('D5');

/* ================= W: worked example ================= */
const wS = $('#wS');
const gw = PUC.graph(wS, { x: 110, y: 96, w: 580, h: 270, xmax: 30, ymax: 110, xt: [5, 10, 15, 20, 25], yt: [20, 40, 60, 80, 100], xl: 't (ms)', yl: 'I (mA)' });
gw.ylab.setAttribute('fill', VI); gw.ylab.setAttribute('y', 76); gw.ylab.setAttribute('x', 110); gw.xlab.setAttribute('y', 416);
const gwc = gw.curve(VI, 5);
const wDrop = gw.mk('path', { d: `M${gw.X(5)},${gw.Y(0)} V${gw.Y(63.2)} H${gw.X(0)}`, fill: 'none', stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wDot = gw.mk('circle', { cx: gw.X(5), cy: gw.Y(63.2), r: 9, fill: VI, stroke: '#fff', 'stroke-width': 2 });
const wDotL = mono(wS, gw.X(5) + 16, gw.Y(63.2) + 30, '63 mA at 5 ms', { fill: VI, 'font-weight': 600, 'font-size': 22 });
const wDot5 = gw.mk('circle', { cx: gw.X(25), cy: gw.Y(99.3), r: 9, fill: VI, stroke: '#fff', 'stroke-width': 2 });
const wDot5L = mono(wS, gw.X(25) - 8, gw.Y(99.3) - 18, 'full at 25 ms', { fill: VI, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' });
const wChips = [mono(wS, 110, 462, 'L = 0.5 H', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(wS, 300, 462, 'R = 100 Ω', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(wS, 490, 462, 'V = 10 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }), mono(wS, 110, 530, 'τ = 5 ms', { fill: AM, 'font-weight': 700, 'font-size': 26 })];
const wRows = rows($('#wSteps'), [
  [K(`L = 0.5\\,\\text{H},\\ R = 100\\,${OM},\\ ${Vv} = 10\\,\\text{V}`), '', 84],
  [K('\\tau = \\dfrac{L}{R} = \\dfrac{0.5}{100}'), '', 168],
  [K('\\tau = 0.005\\,\\text{s} = 5\\,\\text{ms}'), '', 272],
  [K(`${I0} = \\dfrac{${Vv}}{R} = 0.1\\,\\text{A}`), 'full current', 356],
  [K(`${Iv}(\\tau) = 0.632\\times 0.1 \\approx 63\\,\\text{mA}`), '', 450],
  [K('5\\tau = 25\\,\\text{ms}'), 'practically full', 520]]);
const tWR = [wt('W1', 'coil'), wt('W2', 'Tau'), wt('W3', 'zero'), wt('W4', 'full'), wt('W5', 'After'), wt('W6', 'five')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'τ = L × R, just like RC', right: 'For a coil, τ = L ÷ R', y0: 96, y1: 184 });
const tcS = $('#tcS');
const gxL = [mono(tcS, 40, 130, 'L × R  →  H × Ω   not seconds', { fill: C.red, 'font-weight': 600, 'font-size': 28 }), mono(tcS, 40, 210, 'L ÷ R  →  H ÷ Ω = s', { fill: C.ok, 'font-weight': 600, 'font-size': 28 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'JEE MAIN'], type: 'Find τ = L/R, or the current at a time after the switch moves' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 2&nbsp;H coil and a 10&nbsp;Ω resistor are in series with a 20&nbsp;V battery. When does the current reach half its full value? (ln&nbsp;2 = 0.693)', qW: 780,
  opts: [K('13.9\\,\\text{s}'), K('0.200\\,\\text{s}'), K('0.139\\,\\text{s}'), K('3.47\\,\\text{s}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K('\\tau = L/R = 0.2\\,\\text{s}')], [K(`${I0} = 20/10 = 2\\,\\text{A}`)], [K('1 - e^{-t/\\tau} = \\tfrac{1}{2}')], [K('t = \\tau\\ln 2 \\approx 0.139\\,\\text{s}')]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Tau'), wt('A3', 'full'), wt('A4', 'So'), wt('A5', 'gives')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 510, y0: 96, dy: 80, title: 'RL circuit · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K('\\tau = L/R \\qquad \\text{(seconds)}'), K(`\\text{Growth:}\\ \\ ${Iv} = ${I0}\\left(1 - e^{-t/\\tau}\\right)`), K(`\\text{Decay:}\\ \\ ${Iv} = ${I0}\\,e^{-t/\\tau}`),
    K(`${I0} = ${Vv}/R \\qquad ${VL} = L\\,\\Delta ${Iv}/\\Delta t`), 'After 1τ: 63% of the full current. After 5τ: practically steady.'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 36', topic: 'Series RC and RL circuits on AC', y: 772 });

[...document.querySelectorAll('svg text')].forEach(subify);
/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B5', 'rises'), 1.1, 1010, 560], [T1('B7'), 1, 960, 540]]);
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
    M.vis($('#h1C'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o }); fadeAt([...fanO, fanG, ...swB], t, tMorph + 0.5, 0.06); M.vis(swT, t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(blades, 'transform', `rotate(${(fanAng(t) % 360).toFixed(1)} 110 92)`);
    PUC.attr(swT, 'd', t < tOffH ? 'M242,105 L232,82' : 'M242,105 L252,128');
    M.rise($('#h1T'), t, tOffH - 0.2); M.vis($('#h1M'), t, tOffH + 0.4, 1e9, { dy: 10 });
    M.vis($('#h2C'), t, T0('H2') - 0.2, out, { dx: 60, dy: 0, ...o }); drawSeq(ct, t, T0('H2'), 0.3, 0.1);
    const sp = t >= tSpark - 0.3 && t < tSpark + 1.6 && Math.floor((t - tSpark) * 8) % 3 !== 2;
    M.hide(spark, !sp); spark2.forEach(e => M.hide(e, !sp));
    M.rise($('#h2T'), t, tSpark - 0.2); M.vis($('#h2M'), t, tSpark + 0.3, 1e9, { dy: 10 });
    M.vis($('#h2Q'), t, T0('H3') + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I: heavy water wheel */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(pipeW, t, wt('I1', 'pipe') - 0.3, 0.5, 0.1); M.vis(wHouse, t, wt('I1', 'heavy') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(wheelG, t, wt('I1', 'wheel') - 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis(wL, t, wt('I1', 'wheel'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt([...tapB, tapH, tapL], t, tOpen - 0.6, 0.06);
    const op = M.io((t - tOpen) / 0.3) * (1 - M.io((t - tClose) / 0.3));
    PUC.attr(tapH, 'd', `M110,250 L${(110 + 36 * Math.sin(op * 1.4)).toFixed(1)},${(250 - 36 * Math.cos(op * 1.4)).toFixed(1)}`);
    const f = fI(t), s = sI(t);
    PUC.attr(wheel, 'transform', `rotate(${(110 * s % 360).toFixed(1)} 420 300)`);
    iWat.set(160 * s, t >= tOpen); iWat2.set(160 * s + 30, t >= tOpen);
    if (f > 0.03) { iArr.set(600, 236, 600 + 90 * f, 236); M.hide(iArrL, false); PUC.attr(iArrL, 'x', 560); PUC.attr(iArrL, 'text-anchor', 'end'); } else { iArr.set(0, 0, 0, 0); M.hide(iArrL, true); }
    const tSwapI = T0('I5') + 0.4, gOn2 = t < tSwapI + 0.1;
    M.vis($('#iRL1'), t, tI + 0.4, tSwapI - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#iRL2'), t, tSwapI, 1e9, { dy: 10 });
    M.vis(iG, t, tOpen - 0.2, tSwapI - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    if (gOn2) { const e2 = Math.max(0, t - tOpen), xe = Math.min(e2, 10.8);
      giF(q => [q, fI(tOpen + q)], 0, xe); PUC.attr(giFL, 'x', (gi.X(xe) + 10).toFixed(1)); PUC.attr(giFL, 'y', (gi.Y(fI(tOpen + xe)) - 10).toFixed(1));
      M.vis(giOL, t, tOpen + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(giC, t, tClose, 0.4); M.vis(giCL, t, tClose + 0.1, 1e9, { dy: 0, fade: 0.2 });
      M.vis(giN, t, wt('I4', 'while') - 0.3, 1e9, { dy: 10 }); }
    M.vis($('#it0'), t, wt('I5', 'inductor') - 0.2, 1e9, { dy: 20 }); M.draw(itL, t, wt('I5', 'inductor'), 0.6);
    M.vis($('#it1'), t, wt('I6', 'fights') - 0.2, 1e9, { dy: 20 });
    const fa = M.io((t - wt('I6', 'fights')) / 0.4); itA2.set(10, 26, 10 + 60 * fa, 26); itA.set(130, 54, 130 - 60 * fa, 54); M.hide(itA.g, fa <= 0); M.hide(itA2.g, fa <= 0);
    M.vis($('#iStrip'), t, T0('I7') + 0.1, 1e9, { dy: 24 }); M.vis($('#iNote'), t, wt('I7', 'circuit'), 1e9, { dy: 12 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tM + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    drawSeq(bw, t, wt('B2', 'ten') - 0.2, 0.4, 0.12); drawSeq(bCell, t, wt('B2', 'battery') - 0.2, 0.25, 0.1);
    M.draw(bRes, t, wt('B2', 'resistor') - 0.2, 0.4); M.draw(bCoil, t, wt('B2', 'coil') - 0.2, 0.5);
    fadeAt([cA, cB, piv, blade], t, wt('B2', 'switch') - 0.2, 0.06); fadeAt(bLb, t, wt('B2', 'battery'), 0.06);
    const kA = M.io((t - tOn + 0.15) / 0.3), kB = M.io((t - tOff + 0.15) / 0.3);
    const ang0 = -1.9, angA = Math.atan2(130 - 183, 330 - 420), angB = Math.atan2(236 - 183, 330 - 420);
    const ang = M.lerp(M.lerp(ang0 - 0.55, angA, kA), angB, kB), Lb = 104;
    PUC.attr(blade, 'd', `M420,183 L${(420 + Lb * Math.cos(ang)).toFixed(1)},${(183 + Lb * Math.sin(ang)).toFixed(1)}`);
    const I = bI_(t), VLn = bVL(t), el = t < tOn ? 0 : t < tOff ? t - tOn : t - tOff;
    eC.set(offC(t), t >= tOn && t < tOff); eD.set(offD(t), t >= tOff);
    M.vis($('#ckE'), t, tOn, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(bCoil, 'stroke', M.mix(INK, AM, Math.min(1, Math.abs(VLn) / 10)));
    if (I > 2) { const len = 34 + 46 * I / 100; bI.set(712 - len / 2, 154, 712 + len / 2, 154); PUC.attr(bIL, 'x', 712); PUC.attr(bIL, 'y', 134); M.hide(bIL, false); } else { bI.set(0, 0, 0, 0); M.hide(bIL, true); }
    const tSp = wt('B11', 'spark'); M.hide(bSpark, !(t >= tSp - 0.1 && t < tSp + 1.4 && Math.floor((t - tSp) * 8) % 3 !== 2));
    M.setT($('#rV'), VLn.toFixed(2)); M.setT($('#rI'), I.toFixed(1)); M.setT($('#rT'), (el / TAU * 5).toFixed(1));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 }); M.vis($('#slowT'), t, wt('B3', 'slow') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    fadeAt(scL, t, tB + 0.6);
    const span = 13.2;
    if (t < tOff) { trI(q => 90 * (1 - ex(-q / TAU)), el, span, t >= tOn); trV(q => 90 * ex(-q / TAU), el, span, t >= tOn); }
    else { trI(q => 90 * kOff * ex(-q / TAU), el, span); trV(q => -90 * kOff * ex(-q / TAU), el, span); }
    avB(t, wt('B9', 'same') + 0.2, out);
  }

  /* M: why it rises slowly */
  const mOn = t >= tM - 0.05 && t < tC + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tC - 0.32;
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([mFrame, mTop], t, wt('M2', 'ten') - 0.2); M.vis(mTopR, t, wt('M4', 'coil') - 0.3, 1e9, { dy: 0, fade: 0.25 }); M.vis(mBot, t, tMs - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const v = mV(t), hR = (mBh - 6) * v / 10, hL = (mBh - 6) - hR;
    PUC.attr(mBot, 'y', (mBy + mBh - 3 - hR).toFixed(1)); PUC.attr(mBot, 'height', hR.toFixed(1)); PUC.attr(mTopR, 'height', hL.toFixed(1));
    M.setT(mLL[2], (10 - v).toFixed(1) + ' V'); M.setT(mLR[2], v.toFixed(1) + ' V');
    fadeAt([mSw[0], ...mLL], t, wt('M4', 'coil') - 0.2, 0.05); fadeAt([mSw[1], ...mLR], t, wt('M4', 'resistor') - 0.2, 0.05);
    fadeAt([...mIl, mIb, mIv], t, wt('M4', 'resistor'), 0.05);
    const I = v * 10; PUC.attr(mIb, 'width', (440 * I / 100).toFixed(1)); M.setT(mIv, I.toFixed(0) + ' mA');
    M.vis($('#mT'), t, tMs, 1e9, { dy: 0, fade: 0.2 }); M.setT($('#mT'), 'CURRENT GROWING · LIVE');
    runRows(mRows, t, tMR);
    M.vis($('#mStrip'), t, T0('M7') + 0.1, 1e9, { dy: 24 });
  }

  /* C: time constant */
  const cOn = t >= tC - 0.05 && t < tD + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tD - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    gcc(q => [q, 100 * (1 - ex(-q))], 0, M.clamp((t - tC - 0.5) / 2.4) * 5.3);
    [tCR[0], tCR[3]].forEach((ti, i) => { M.draw(cDrop[i], t, ti - 0.3, 0.5); M.vis(cDot[i], t, ti - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(cLab[i], t, ti + 0.1, 1e9, { dy: 0, fade: 0.2 }); });
    const t6 = wt('C6', 'bigger'), t7 = wt('C7', 'bigger');
    gcc2(q => [q, 100 * (1 - ex(-q / 2))], 0, M.clamp((t - t6) / 1.6) * 5.3); M.vis(c2L, t, t6 + 0.8, 1e9, { dy: 0, fade: 0.2 });
    gcc3(q => [q, 100 * (1 - ex(-q * 2))], 0, M.clamp((t - t7) / 1.2) * 5.3); M.vis(c3L, t, t7 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#cStrip'), t, t7 + 0.3, 1e9, { dy: 24 });
    M.vis($('#cBox'), t, wt('C2', 'Divide') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#cF'), t, wt('C2', 'resistance') - 0.2, 0.6); M.vis($('#cFu'), t, wt('C3', 'time'), 1e9, { dx: -10, dy: 0 });
    cTbH.forEach(e => M.vis(e, t, tCR[0] - 0.4, 1e9, { dy: 0, fade: 0.2 }));
    for (let k = 0; k < 4; k++) { const ti = tCR[k]; for (let j = 0; j < 3; j++) M.vis(cTbR[k * 3 + j], t, ti - 0.15 + j * 0.06, 1e9, { dx: -12, dy: 0 }); const bi = cTbR[k * 3 + 1].querySelector('i'); bi.style.transform = `scaleX(${M.o3((t - ti) / 0.6).toFixed(3)})`; bi.style.transformOrigin = 'left'; }
  }

  /* D: rules */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.3, dis = t >= tDis - 0.2, ch = !dis;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dLL1'), t, tD + 0.3, tDis - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dLL2'), t, tDis, 1e9, { dy: 10 });
    M.vis($('#dRL1'), t, tD + 0.4, tDis - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dRL2'), t, tDis, 1e9, { dy: 10 });
    gdI(q => [q, 1 - ex(-q)], 0, ch ? M.clamp((t - tD - 0.6) / 1.6) * 5.1 : 0);
    gdI2(q => [q, ex(-q)], 0, dis ? M.clamp((t - tDR2[0]) / 1.4) * 5.1 : 0);
    M.hide(dLI, !ch); if (ch) M.vis(dLI, t, tD + 1.8, 1e9, { dy: 0, fade: 0.2 });
    [dFull, dFullL].forEach(e => M.hide(e, !ch)); if (ch) { M.draw(dFull, t, tDR1[0], 0.5); M.vis(dFullL, t, tDR1[0] + 0.3, 1e9, { dy: 0, fade: 0.2 }); }
    [dDrop1, dDot1, dDot1L].forEach(e => M.hide(e, !ch)); if (ch) { M.draw(dDrop1, t, tDR1[3] + 0.2, 0.5); M.vis(dDot1, t, tDR1[3] + 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dDot1L, t, tDR1[3] + 0.7, 1e9, { dy: 0, fade: 0.2 }); }
    M.hide(dLI0, !dis); if (dis) M.vis(dLI0, t, tDR2[0] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    [dDrop, dDot, dDotL].forEach(e => M.hide(e, !dis)); if (dis) { M.draw(dDrop, t, tDR2[1] - 0.2, 0.5); M.vis(dDot, t, tDR2[1], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dDotL, t, tDR2[1] + 0.2, 1e9, { dy: 0, fade: 0.2 }); }
    dRows1.forEach(r => M.hide(r, dis)); if (!dis) runRows(dRows1, t, tDR1, tDis - 0.3);
    dRows2.forEach(r => M.hide(r, !dis)); if (dis) runRows(dRows2, t, tDR2);
    M.vis($('#dBox1'), t, tDR1[1] + 0.5, tDis - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 }); $('#dBox1').style.top = '180px';
    M.vis($('#dBox2'), t, tDR2[0] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Tau') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([wChips[0]], t, tWR[0]); fadeAt([wChips[1], wChips[2]], t, wt('W1b', 'resistor'), 0.4); M.vis(wChips[3], t, tWR[2] + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    gwc(q => [q, 100 * (1 - ex(-q / 5))], 0, M.clamp((t - tWR[3]) / 2.6) * 29);
    M.draw(wDrop, t, wt('W5b', 'sixty') - 0.3, 0.5); M.vis(wDot, t, wt('W5b', 'sixty'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(wDotL, t, wt('W5b', 'sixty') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wDot5, t, wt('W6', 'twenty'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(wDot5L, t, wt('W6', 'twenty') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[2] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('X5') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'That') - 0.05, tRight: wt('X3', 'For') - 0.2 });
    M.vis(gxL[0], t, wt('X4', 'Check'), 1e9, { dx: -12, dy: 0 }); M.vis(gxL[1], t, wt('X4', 'Henry'), 1e9, { dx: -12, dy: 0 });
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
