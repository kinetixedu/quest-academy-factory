// PUC Electronics Ep 36 - Series RC and RL circuits on AC ("Breadboard" style, Lab Notebook world)
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
const Iv = c(VI, 'I'), I0 = c(VI, 'I_0'), VC = c(TE, 'V_C'), VL = c(TE, 'V_L'), VR = c(TE, 'V_R'), Vv = c(TE, 'V'), V0 = c(TE, 'V_0');
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
const CH1 = '#8FA3C8', TP = 2 * Math.PI, PH = Math.atan(80 / 60), SQ2 = Math.SQRT2;
/* roll-mode scope trace: newest at the right */
const rollTr = (svg, w, h, col) => { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return (f, tNow, tStart, Wn, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
    for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = h / 2 - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
    PUC.attr(p, 'd', d); }; };
const arcP = (cx, cy, r, a0, a1) => { const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 ${a1 > a0 ? 1 : 0} ${x1.toFixed(1)},${y1.toFixed(1)}`; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'lab') - 0.2;
const tI = T0('I1'), tP = T0('P1'), tB = T0('B1'), tM = T0('M1'), tZ = T0('Z1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= I: ropes + waves ================= */
const iS = $('#iS'), OX = 280, OY = 470, U = 40;
const iPar = W(iS, `M${OX + 6 * U},${OY} V${OY - 8 * U} M${OX},${OY - 8 * U} H${OX + 6 * U}`, { 'stroke-width': 2.5, stroke: MU, 'stroke-dasharray': '8 8' });
const iE = PUC.arrow(iS, INK, 6, 18), iN = PUC.arrow(iS, INK, 6, 18), iRz = PUC.arrow(iS, AM, 7, 20);
const iBox = mk(iS, 'rect', { x: OX - 34, y: OY - 34, width: 68, height: 68, rx: 6, fill: '#F1D9A0', stroke: INK, 'stroke-width': 3 });
const iRA = W(iS, `M${OX + 50},${OY} V${OY - 50} H${OX}`, { 'stroke-width': 2, stroke: MU });
const iLb = [mono(iS, OX + 3 * U, OY + 44, 'east · 6', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(iS, OX - 22, OY - 4 * U, 'north · 8', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 24 }),
  mono(iS, OX + 3 * U + 40, OY - 4 * U - 10, '10', { fill: AM, 'font-weight': 700, 'font-size': 30 })];
const iNote = mono(iS, 60, 548, '6 and 8 at right angles make 10', { fill: INK, 'font-weight': 600, 'font-size': 24 });
const iG = $('#iG');
const gi = PUC.graph(iG, { x: 80, y: 110, w: 620, h: 300, xmax: 2, ymin: -1.25, ymax: 1.25, xl: 'time', yl: '' });
gi.xlab.setAttribute('y', 444);
const giR = gi.curve(TE, 5), giC = gi.curve(AM, 5);
const giRL = mono(iG, 0, 0, 'V_R', { fill: TE, 'font-weight': 600, 'font-size': 24 }), giCL = mono(iG, 0, 0, 'V_C', { fill: AM, 'font-weight': 600, 'font-size': 24 });
const giPk = [[0.25, TE], [0.5, AM]].map(([x, col]) => gi.mk('line', { x1: gi.X(x), x2: gi.X(x), y1: gi.Y(1.2), y2: gi.Y(-1.2), stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }));
const giQ = mono(iG, gi.X(0.375), gi.Y(1.2) - 8, 'quarter cycle', { 'text-anchor': 'middle', 'font-weight': 600, fill: INK });
const giN = mono(iG, 80, 520, 'they never peak together', { fill: INK, 'font-weight': 600, 'font-size': 24 });

/* ================= P: phase in R, C, L ================= */
const pg = ['#pRS', '#pCS', '#pLS'].map(id => { const g = PUC.graph($(id), { x: 50, y: 100, w: 410, h: 300, xmax: 2, ymin: -1.25, ymax: 1.25 }); return { g, v: g.curve(TE, 5), i: g.curve(VI, 5) }; });
const pSh = [0, Math.PI / 2, -Math.PI / 2];
const pLab = pg.map((q, k) => [mono($(['#pRS', '#pCS', '#pLS'][k]), 410, 96, 'V', { fill: TE, 'font-weight': 700, 'font-size': 24 }), mono($(['#pRS', '#pCS', '#pLS'][k]), 440, 96, 'I', { fill: VI, 'font-weight': 700, 'font-size': 24 })]);
const tPC = [wt('P2', 'resistor'), wt('P3', 'capacitor'), wt('P5', 'inductor')], tPT = [wt('P2', 'phase'), wt('P4', 'Current'), wt('P6', 'Current')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M170,280 V150 H420'), W(ck, 'M580,150 H780 V300'), W(ck, 'M780,330 V490 H170 V360')];
const bwL = [W(ck, 'M780,300 V270'), W(ck, 'M780,330 V390')];
const bRes = W(ck, 'M420,150 L430,136 L446,164 L462,136 L478,164 L494,136 L510,164 L526,136 L542,164 L558,136 L574,164 L580,150');
const bSrc = [mk(ck, 'circle', { cx: 170, cy: 320, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M146,320 C156,296 168,296 170,320 S184,344 194,320', { 'stroke-width': 3.5 })];
const bCap = [W(ck, 'M730,300 H830', { 'stroke-width': 6 }), W(ck, 'M730,330 H830', { 'stroke-width': 6 })];
const bCoil = coilV(ck, 780, 255, 4, 17);
const bLb = [mono(ck, 230, 326, '10 V rms', { fill: TE, 'font-weight': 600, 'font-size': 22 }), tx(ck, 500, 118, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 500, 214, '60 Ω', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 })];
const bLC = [tx(ck, 712, 306, 'C', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'end' }), mono(ck, 712, 344, 'X_C = 80 Ω', { 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' })];
const bLL = [tx(ck, 750, 306, 'L', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'end' }), mono(ck, 750, 344, 'X_L = 80 Ω', { 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' })];
const bInst = mono(ck, 40, 562, '', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const skipB = (x, y) => Math.hypot(x - 170, y - 320) < 44 || (Math.abs(y - 150) < 2 && x > 418 && x < 582) || (Math.abs(x - 780) < 2 && y > 252 && y < 394);
const eB = flow(ck, [[170, 360], [170, 490], [780, 490], [780, 150], [170, 150], [170, 280]], 30, { skip: skipB });
const tAC = wt('B3', 'slow'), tSwapB = wt('B8', 'swap'), FQ = 0.5, WD = TP * FQ;
const isL = t => t >= tSwapB + 0.3;
const th = t => WD * (t - tAC);
const vR = t => 6 * SQ2 * Math.sin(th(t)), vX = t => (isL(t) ? 1 : -1) * 8 * SQ2 * Math.cos(th(t)), vS = t => vR(t) + vX(t);
const scS = $('#scS');
mk(scS, 'rect', { x: 0, y: 0, width: 592, height: 200, rx: 8, fill: '#16213E' }); for (let i = 1; i < 6; i++) mk(scS, 'line', { x1: 592 * i / 6, y1: 0, x2: 592 * i / 6, y2: 200, stroke: '#2A3758', 'stroke-width': 1.5 }); for (let j = 1; j < 4; j++) mk(scS, 'line', { x1: 0, y1: 50 * j, x2: 592, y2: 50 * j, stroke: '#2A3758', 'stroke-width': j === 2 ? 2.5 : 1.5 });
const trS = rollTr(scS, 592, 200, CH1), trR = rollTr(scS, 592, 200, TE), trX = rollTr(scS, 592, 200, AM);
const scL = [mono(scS, 330, 190, 'V', { fill: CH1, 'font-size': 17 }), mono(scS, 400, 190, 'V_R', { fill: TE, 'font-size': 17 }), mono(scS, 490, 190, 'V_C', { fill: AM, 'font-size': 17 })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>R</sub></span><span class="v" style="color:${TE}">6.0</span><span class="u">V</span>
  <span class="k" style="color:${AM}" id="roX">V<sub>C</sub></span><span class="v" style="color:${AM}">8.0</span><span class="u">V</span>
  <span class="k" style="color:${INK}">V</span><span class="v" style="color:${INK}">10.0</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'They add at every instant, but not at their peaks!' });

/* ================= M: phasors ================= */
const mS = $('#mS'), PO = [130, 160], PU = 40;
const mI = PUC.arrow(mS, VI, 5, 16), mVR = PUC.arrow(mS, TE, 7, 20), mVC = PUC.arrow(mS, TE, 7, 20), mV = PUC.arrow(mS, TE, 9, 24);
const mIL = tx(mS, PO[0] + 214, 92, 'I', { 'font-style': 'italic', fill: VI, 'font-size': 28 });
const mRA = W(mS, `M${PO[0] + 6 * PU - 28},${PO[1]} V${PO[1] + 28} H${PO[0] + 6 * PU}`, { 'stroke-width': 2, stroke: MU });
const mArc = W(mS, arcP(PO[0], PO[1], 70, 0, PH), { 'stroke-width': 3, stroke: INK });
const mPhi = tx(mS, PO[0] + 84, PO[1] + 50, 'φ', { 'font-size': 28, 'font-style': 'italic' });
const mLb = [mono(mS, PO[0] + 3 * PU, PO[1] - 16, 'V_R = 6 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 }), mono(mS, PO[0] + 6 * PU + 20, PO[1] + 4 * PU, 'V_C = 8 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }),
  mono(mS, PO[0] + 3 * PU - 24, PO[1] + 4 * PU + 40, 'V = 10 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 700, 'font-size': 26 })];
const mNote = mono(mS, 430, 560, '90° behind the current', { fill: MU, 'font-weight': 600, 'font-size': 20 });
const mRows = rows($('#mSteps'), [
  ['<span class="tt">Phasor: an arrow, length = size</span>', '', 84],
  [K(`${VR}\\ \\text{along}\\ ${Iv}`), 'in phase', 168],
  [K(`${VC}\\ \\perp\\ ${Iv}`), '90° behind', 252],
  [K(`${Vv} = \\sqrt{${VR}^{2} + ${VC}^{2}}`), 'Pythagoras', 362],
  [K('\\sqrt{36 + 64} = \\sqrt{100} = 10\\,\\text{V}'), '', 476]]);
const tMR = [wt('M2', 'phasors'), wt('M4', 'points'), wt('M5', 'straight'), wt('M7', 'square'), wt('M8', 'Root')];
$('#mBox').style.top = '348px';

/* ================= Z: impedance ================= */
const zS = $('#zS'), ZO = [160, 310], ZU = 30;
const zR = W(zS, '', { 'stroke-width': 6 }), zX = W(zS, '', { 'stroke-width': 6 }), zZ = W(zS, '', { 'stroke-width': 8, stroke: AM }), zArc = W(zS, '', { 'stroke-width': 3 });
const zLR = mono(zS, ZO[0] + 3 * ZU, 0, 'R', { 'text-anchor': 'middle', fill: INK, 'font-weight': 700, 'font-size': 28 });
const zLX = mono(zS, ZO[0] + 6 * ZU + 18, 0, 'X_C', { fill: INK, 'font-weight': 700, 'font-size': 28 });
const zLZ = mono(zS, 0, 0, 'Z', { fill: AM, 'font-weight': 700, 'font-size': 30, 'text-anchor': 'end' });
const zPhi = tx(zS, 0, 0, 'φ', { 'font-size': 26, 'font-style': 'italic' });
const zN1 = mono(zS, 440, 200, '', { fill: VI, 'font-weight': 700, 'font-size': 26 }), zN2 = mono(zS, 440, 250, 'cos φ = R / Z', { fill: INK, 'font-weight': 600, 'font-size': 24 });
const zRows1 = rows($('#zSteps1'), [
  [K(`\\dfrac{${VR}}{${Iv}} = R,\\ \\ \\dfrac{${VC}}{${Iv}} = X_C`), '', 84],
  [K('Z = \\sqrt{R^{2} + X_C^{2}}'), 'impedance, in ohms', 186],
  [K('\\tan\\varphi = \\dfrac{X_C}{R}'), 'current leads', 300],
  [K('X_C = \\dfrac{1}{2\\pi f C}'), 'capacitive reactance', 420]]);
const tZ1 = [wt('Z2', 'over'), wt('Z3', 'impedance'), wt('Z4', 'Tan'), wt('Z2', 'reactance')];
const zRows2 = rows($('#zSteps2'), [
  [K('Z = \\sqrt{R^{2} + X_L^{2}}'), '', 84],
  [K('\\tan\\varphi = \\dfrac{X_L}{R}'), 'current lags', 196],
  [K('X_L = 2\\pi f L'), 'inductive reactance', 310],
  [K('\\cos\\varphi = \\dfrac{R}{Z}'), 'power factor', 410]]);
const tZ2 = [wt('Z6', 'Z'), wt('Z6', 'Tan'), wt('Z5', 'inductive'), wt('Z8', 'Cos')];
const tZL = T0('Z5');

/* ================= W: worked example ================= */
const wS = $('#wS'), WO = [140, 110], WU = 3;
const wR = W(wS, `M${WO[0]},${WO[1]} H${WO[0] + 60 * WU}`, { 'stroke-width': 6 }), wX = W(wS, `M${WO[0] + 60 * WU},${WO[1]} V${WO[1] + 80 * WU}`, { 'stroke-width': 6 }), wZ = W(wS, `M${WO[0]},${WO[1]} L${WO[0] + 60 * WU},${WO[1] + 80 * WU}`, { 'stroke-width': 8, stroke: AM });
const wArc = W(wS, arcP(WO[0], WO[1], 56, 0, PH), { 'stroke-width': 3 });
const wLb = [mono(wS, WO[0] + 30 * WU, WO[1] - 18, 'R = 60 Ω', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(wS, WO[0] + 60 * WU + 18, WO[1] + 40 * WU, 'X_C = 80 Ω', { fill: INK, 'font-weight': 600, 'font-size': 24 }),
  mono(wS, WO[0] + 30 * WU - 18, WO[1] + 40 * WU + 30, 'Z = ?', { 'text-anchor': 'end', fill: AM, 'font-weight': 700, 'font-size': 26 }), tx(wS, WO[0] + 66, WO[1] + 42, 'φ', { 'font-size': 26, 'font-style': 'italic' })];
const wChips = [['I = 0.1 A', VI, 470, 480], ['V_R = 6 V', TE, 470, 400], ['V_C = 8 V', TE, 470, 440], ['φ ≈ 53°', INK, 530, 400], ['cos φ = 0.6', INK, 530, 440]];
const wCh = [mono(wS, 500, 160, 'I = 0.1 A', { fill: VI, 'font-weight': 700, 'font-size': 26 }), mono(wS, 500, 214, 'V_R = 6 V', { fill: TE, 'font-weight': 600, 'font-size': 26 }), mono(wS, 500, 262, 'V_C = 8 V', { fill: TE, 'font-weight': 600, 'font-size': 26 }),
  mono(wS, 60, 470, 'φ ≈ 53°', { fill: INK, 'font-weight': 600, 'font-size': 26 }), mono(wS, 300, 470, 'power factor 0.6', { fill: INK, 'font-weight': 600, 'font-size': 26 })];
const wRows = rows($('#wSteps'), [
  [K(`R = 60\\,${OM},\\ X_C = 80\\,${OM},\\ ${Vv} = 10\\,\\text{V}`), '', 84],
  [K(`Z = \\sqrt{60^{2} + 80^{2}} = 100\\,${OM}`), '', 176],
  [K(`${Iv} = \\dfrac{${Vv}}{Z} = \\dfrac{10}{100} = 0.1\\,\\text{A}`), '', 272],
  [K(`${VR} = 6\\,\\text{V},\\ \\ ${VC} = 8\\,\\text{V}`), 'I R and I X', 372],
  [K('\\tan\\varphi = \\tfrac{80}{60},\\ \\ \\varphi \\approx 53^{\\circ}'), '', 448],
  [K('\\cos\\varphi = \\tfrac{60}{100} = 0.6'), 'power factor', 524]]);
const tWR = [wt('W1', 'sixty'), wt('W2', 'Z'), wt('W4', 'Current'), wt('W5', 'V'), wt('W6', 'Tan'), wt('W7', 'power')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'V = V<sub>R</sub> + V<sub>C</sub> = 14 V', right: 'V = √(V<sub>R</sub>² + V<sub>C</sub>²) = 10 V', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xTri = [W(tcS, 'M80,90 H200', { 'stroke-width': 5, stroke: TE }), W(tcS, 'M200,90 V250', { 'stroke-width': 5, stroke: TE }), W(tcS, 'M80,90 L200,250', { 'stroke-width': 6, stroke: AM })];
const xL = [mono(tcS, 140, 76, '6', { 'text-anchor': 'middle', fill: TE, 'font-weight': 700, 'font-size': 24 }), mono(tcS, 214, 178, '8', { fill: TE, 'font-weight': 700, 'font-size': 24 }), mono(tcS, 118, 192, '10', { 'text-anchor': 'end', fill: AM, 'font-weight': 700, 'font-size': 24 })];
const xT = [mono(tcS, 330, 140, '6 + 8 = 14   ✗', { fill: C.red, 'font-weight': 600, 'font-size': 30 }), mono(tcS, 330, 210, '√(36 + 64) = 10   ✓', { fill: C.ok, 'font-weight': 600, 'font-size': 30 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS', 'JEE MAIN'], type: 'Find Z, the current, the phase angle φ or the power factor cos φ' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 50&nbsp;Ω resistor and a coil are in series across 100&nbsp;V (rms), 50&nbsp;Hz. The current is 1&nbsp;A. Find the coil’s reactance and the phase of the current.', qW: 780,
  opts: [K(`50\\,${OM},\\ \\text{lags}\\ 45^{\\circ}`), K(`86.6\\,${OM},\\ \\text{lags}\\ 60^{\\circ}`), K(`86.6\\,${OM},\\ \\text{leads}\\ 30^{\\circ}`), K(`150\\,${OM},\\ \\text{lags}\\ 60^{\\circ}`)], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`Z = V/I = 100\\,${OM}`)], [K(`X_L = \\sqrt{100^{2} - 50^{2}} \\approx 86.6\\,${OM}`)], [K('\\cos\\varphi = \\tfrac{50}{100} \\Rightarrow \\varphi = 60^{\\circ}')], ['<span style="font:600 28px Poppins">Coil: current lags</span>']], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'First'), wt('A3', 'X'), wt('A4', 'Cos'), wt('A5', 'coil')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 510, y0: 96, dy: 82, title: 'Series RC and RL on AC · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K('Z = \\sqrt{R^{2} + X^{2}} \\qquad (X = X_C\\ \\text{or}\\ X_L)'), K('\\tan\\varphi = X/R \\qquad \\cos\\varphi = R/Z'), K(`${Vv} = \\sqrt{${VR}^{2} + ${VC}^{2}}`), K('X_C = \\tfrac{1}{2\\pi f C} \\qquad X_L = 2\\pi f L'), 'RC: current leads. RL: current lags. Voltages add as arrows.'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 37', topic: 'Low-pass and high-pass RC filters', y: 772 });

[...document.querySelectorAll('svg text')].forEach(subify);
/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B5', 'Look'), 1.1, 1010, 560], [T1('B7'), 1, 960, 540]]);
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
    M.vis($('#h1C'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hm1'), t, wt('H2', 'six') - 0.2, 1e9, { dx: -16, dy: 0 }); M.vis($('#hm2'), t, wt('H2', 'eight') - 0.2, 1e9, { dx: -16, dy: 0 });
    M.vis($('#h2C'), t, T0('H3') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#hm3'), t, wt('H3', 'ten') - 0.2, 1e9, { dx: -16, dy: 0 });
    M.rise($('#bigQ'), t, wt('H3', 'Why') - 0.2); M.vis($('#h2Q'), t, wt('H3', 'fourteen'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I: ropes + waves */
  const iOn = t >= tI - 0.05 && t < tP + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tP - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    const sl = 0;
    const bx = OX + 6 * U * sl, by = OY - 8 * U * sl;
    PUC.attr(iBox, 'x', (bx - 34).toFixed(1)); PUC.attr(iBox, 'y', (by - 34).toFixed(1)); M.vis(iBox, t, tI + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const e = M.io((t - wt('I2', 'east')) / 0.5), n = M.io((t - wt('I2', 'north')) / 0.5), r = M.io((t - wt('I3', 'slant') + 0.2) / 0.6);
    iE.set(bx + 34, by, bx + 34 + (6 * U - 34) * e + 0.01, by); M.hide(iE.g, e <= 0);
    iN.set(bx, by - 34, bx, by - 34 - (8 * U - 34) * n - 0.01); M.hide(iN.g, n <= 0);
    iRz.set(OX, OY, OX + 6 * U * r, OY - 8 * U * r); M.hide(iRz.g, r <= 0);
    M.vis(iLb[0], t, wt('I2', 'six'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iLb[1], t, wt('I2', 'eight'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iLb[2], t, wt('I4', 'ten') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.draw(iPar, t, wt('I4', 'right') - 0.2, 0.6); M.vis(iRA, t, wt('I4', 'right'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iNote, t, wt('I4', 'triangle') - 0.2, 1e9, { dy: 10 });
    const t5 = wt('I5', 'voltages') - 0.2, xe = M.clamp((t - t5) / 3.2) * 2;
    M.vis(gi.axes, t, t5 - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(gi.xlab, t, t5 - 0.3, 1e9, { dy: 0, fade: 0.2 }); if (gi.zero) M.vis(gi.zero, t, t5 - 0.3, 1e9, { dy: 0, fade: 0.2 });
    giR(x => [x, Math.sin(TP * x)], 0, xe); giC(x => [x, -Math.cos(TP * x)], 0, xe);
    PUC.attr(giRL, 'x', (gi.X(xe) + 8).toFixed(1)); PUC.attr(giRL, 'y', (gi.Y(Math.sin(TP * xe)) - 8).toFixed(1)); M.hide(giRL, xe <= 0.05 || xe >= 1.95);
    PUC.attr(giCL, 'x', (gi.X(xe) + 8).toFixed(1)); PUC.attr(giCL, 'y', (gi.Y(-Math.cos(TP * xe)) + 24).toFixed(1)); M.hide(giCL, xe <= 0.05 || xe >= 1.95);
    const t6 = wt('I6', 'peaks'); M.draw(giPk[0], t, t6 - 0.2, 0.4); M.draw(giPk[1], t, wt('I6', 'quarter') - 0.2, 0.4); M.vis(giQ, t, wt('I6', 'quarter'), 1e9, { dy: 0, fade: 0.2 }); M.vis(giN, t, wt('I6', 'later'), 1e9, { dy: 10 });
  }

  /* P: phase in R, C, L */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    ['#pR', '#pC', '#pL'].forEach((id, k) => { M.vis($(id), t, tP + 0.1 + k * 0.12, out, { dy: 36, ...o });
      const q = pg[k], u = M.clamp((t - tPC[k]) / 1.4) * 2;
      [q.g.axes, q.g.zero].forEach(e => e && M.vis(e, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }));
      q.v(x => [x, Math.sin(TP * x)], 0, u); q.i(x => [x, 0.7 * Math.sin(TP * x + pSh[k])], 0, u);
      pLab[k].forEach(e => M.vis(e, t, tPC[k] + 1.2, 1e9, { dy: 0, fade: 0.2 }));
      M.vis($(['#pRc', '#pCc', '#pLc'][k]), t, tPT[k] - 0.1, 1e9, { dy: 16 }); M.vis($(['#pRd', '#pCd', '#pLd'][k]), t, tPT[k] + 0.3, 1e9, { dy: 10 }); });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tM + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32, L = isL(t);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckL1'), t, tB + 0.3, tSwapB, { dy: 10, outDur: 0.2 }); M.vis($('#ckL2'), t, tSwapB + 0.25, 1e9, { dy: 10 });
    drawSeq(bw, t, wt('B2', 'supply') - 0.3, 0.4, 0.12); fadeAt(bSrc, t, wt('B2', 'supply') - 0.2); M.draw(bRes, t, wt('B2', 'resistor') - 0.2, 0.4);
    drawSeq(bCap, t, wt('B2', 'capacitor') - 0.2, 0.25, 0.1); fadeAt(bLb, t, wt('B2', 'ten'), 0.08); fadeAt(bLC, t, wt('B2', 'capacitor'), 0.08);
    const sw = M.io((t - tSwapB) / 0.4);
    [...bCap, ...bLC].forEach(e => PUC.attr(e, 'opacity', (1 - sw).toFixed(2))); M.hide(bCoil, sw <= 0); bwL.forEach(e => M.hide(e, sw <= 0));
    if (sw > 0) { M.draw(bCoil, t, tSwapB + 0.2, 0.5); bwL.forEach(e => M.draw(e, t, tSwapB + 0.1, 0.2)); } fadeAt(bLL, t, tSwapB + 0.5, 0.08); bLL.forEach(e => M.hide(e, sw <= 0));
    const on = t >= tAC;
    eB.set(on ? 30 * Math.sin(th(t) + 0.0) * 1.0 + 0 : 0, t >= tAC - 0.1); M.vis($('#ckE'), t, tAC, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#slowT'), t, tAC - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const k = 6.4; trS(q => k * vS(q), t, tAC, 4, on); trR(q => k * vR(q), t, tAC, 4, on); trX(q => k * vX(q), t, tAC, 4, on);
    fadeAt(scL, t, tAC); M.setT(scL[2], L ? 'V_L' : 'V_C'); subify(scL[2]);
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 }); const rx = $('#roX'); if ((rx._l || 0) !== (L ? 1 : 2)) { rx._l = L ? 1 : 2; rx.innerHTML = L ? 'V<sub>L</sub>' : 'V<sub>C</sub>'; }
    M.vis(bInst, t, wt('B6', 'instant') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const a = vR(t), b = vX(t); M.setT(bInst, `instant:  v_R ${a.toFixed(1)}  +  ${L ? 'v_L' : 'v_C'} ${b.toFixed(1)}  =  v ${(a + b).toFixed(1)} V`); subify(bInst);
    avB(t, T0('B7') + 0.4, tSwapB - 0.2);
  }

  /* M: phasors */
  const mOn = t >= tM - 0.05 && t < tZ + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tZ - 0.32;
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    const ai = M.io((t - wt('M3', 'current')) / 0.5); mI.set(PO[0], 100, PO[0] + 200 * ai + 0.01, 100); M.hide(mI.g, ai <= 0); M.vis(mIL, t, wt('M3', 'current') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const ar = M.io((t - wt('M4', 'resistor')) / 0.6); mVR.set(PO[0], PO[1], PO[0] + 6 * PU * ar + 0.01, PO[1]); M.hide(mVR.g, ar <= 0);
    const ac = M.io((t - wt('M5', 'capacitor')) / 0.6); mVC.set(PO[0] + 6 * PU, PO[1], PO[0] + 6 * PU, PO[1] + 8 * PU * ac + 0.01); M.hide(mVC.g, ac <= 0);
    const av = M.io((t - wt('M6', 'total')) / 0.7); mV.set(PO[0], PO[1], PO[0] + 6 * PU * av + 0.01, PO[1] + 8 * PU * av); M.hide(mV.g, av <= 0);
    M.vis(mLb[0], t, wt('M4', 'R') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(mLb[1], t, wt('M5', 'C') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(mLb[2], t, wt('M8', 'Ten') - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis(mRA, t, wt('M5', 'Ninety'), 1e9, { dy: 0, fade: 0.2 }); M.vis(mNote, t, wt('M5', 'Ninety'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(mArc, t, wt('M6', 'slanted'), 0.5); M.vis(mPhi, t, wt('M6', 'slanted') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    runRows(mRows, t, tMR);
    M.vis($('#mBox'), t, tMR[3] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* Z: impedance */
  const zOn = t >= tZ - 0.05 && t < tT + 0.05; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = tT - 0.3, rl = t >= tZL - 0.2;
    M.vis($('#zL'), t, tZ + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#zR'), t, tZ + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#zLL1'), t, tZ + 0.3, tZL - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#zLL2'), t, tZL, 1e9, { dy: 10 });
    M.vis($('#zRL1'), t, tZ + 0.4, tZL - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#zRL2'), t, tZL, 1e9, { dy: 10 });
    const sg = M.lerp(1, -1, M.io((t - tZL - 0.2) / 0.7)), xe = ZO[0] + 6 * ZU, ye = ZO[1] + 8 * ZU * sg;
    PUC.attr(zR, 'd', `M${ZO[0]},${ZO[1]} H${xe}`); PUC.attr(zX, 'd', `M${xe},${ZO[1]} V${ye.toFixed(1)}`); PUC.attr(zZ, 'd', `M${ZO[0]},${ZO[1]} L${xe},${ye.toFixed(1)}`);
    PUC.attr(zArc, 'd', arcP(ZO[0], ZO[1], 56, 0, Math.atan2(ye - ZO[1], 6 * ZU)));
    const tz = wt('Z2', 'R') - 0.2; M.draw(zR, t, tz, 0.4); M.draw(zX, t, wt('Z2', 'capacitive') - 0.2, 0.4); M.draw(zZ, t, wt('Z3', 'impedance') - 0.2, 0.5);
    PUC.attr(zLR, 'y', ZO[1] - sg * 20 + (sg > 0 ? 0 : 10)); M.vis(zLR, t, tz + 0.3, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(zLX, 'y', (ZO[1] + 4 * ZU * sg + 8).toFixed(1)); M.vis(zLX, t, wt('Z2', 'capacitive'), 1e9, { dy: 0, fade: 0.2 }); M.setT(zLX, t >= tZL ? 'X_L' : 'X_C'); subify(zLX);
    PUC.attr(zLZ, 'x', (ZO[0] + 3 * ZU - 16).toFixed(1)); PUC.attr(zLZ, 'y', (ZO[1] + 4 * ZU * sg + (sg > 0 ? 34 : -14)).toFixed(1)); M.vis(zLZ, t, wt('Z3', 'impedance'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(zArc, t, wt('Z4', 'angle') - 0.1, 0.4); PUC.attr(zPhi, 'x', ZO[0] + 66); PUC.attr(zPhi, 'y', (ZO[1] + 40 * sg + 8).toFixed(1)); M.vis(zPhi, t, wt('Z4', 'angle') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.setT(zN1, rl ? 'current lags' : 'current leads'); M.vis(zN1, t, wt('Z4', 'ahead') - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(zN1, 'fill', VI);
    M.vis(zN2, t, wt('Z8', 'Cos'), 1e9, { dy: 0, fade: 0.2 });
    zRows1.forEach(r => M.hide(r, rl)); if (!rl) runRows(zRows1, t, tZ1, tZL - 0.3);
    zRows2.forEach(r => M.hide(r, !rl)); if (rl) runRows(zRows2, t, tZ2);
    M.vis($('#zBox1'), t, tZ1[1] + 0.5, tZL - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#zBox2'), t, tZ2[0] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'not') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(wR, t, tWR[0], 0.4); M.vis(wLb[0], t, tWR[0] + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(wX, t, wt('W1b', 'reactance'), 0.4); M.vis(wLb[1], t, wt('W1b', 'eighty'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(wZ, t, tWR[1], 0.5); M.vis(wLb[2], t, tWR[1] + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.setT(wLb[2], t >= wt('W3', 'hundred') ? 'Z = 100 Ω' : 'Z = ?');
    M.draw(wArc, t, tWR[4], 0.4); M.vis(wLb[3], t, tWR[4] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    [wt('W4', 'zero'), wt('W5', 'six'), wt('W5', 'eight'), wt('W6', 'fifty'), wt('W7', 'zero')].forEach((ti, i) => M.vis(wCh[i], t, ti, 1e9, { dx: -12, dy: 0 }));
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('X4') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'That') - 0.05, tRight: wt('X3', 'Use') - 0.2 });
    drawSeq(xTri, t, tX + 0.6, 0.4, 0.2); fadeAt(xL, t, tX + 1.0, 0.15);
    M.vis(xT[0], t, wt('X2', 'fourteen'), 1e9, { dx: -12, dy: 0 }); M.vis(xT[1], t, wt('X3', 'Ten') - 0.1, 1e9, { dx: -12, dy: 0 });
    where(t, { tin: T0('X4') - 0.2, tLight: [wt('X4', 'PUC'), wt('X4', 'E'), wt('X4', 'board') - 0.15, wt('X5', 'JEE')], tType: T0('X6') - 0.1 });
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
