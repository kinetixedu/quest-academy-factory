// PUC Electronics Ep 30 - Energy storage in passive components ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t, R, C, L ink; energy U gold (introduced in Ep 30)
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, GO = C.gold, FLD = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const U_ = c => `\\textcolor{${GO}}{U}`, Vv = `\\textcolor{${TE}}{V}`, Qq = `\\textcolor{${OR}}{Q}`, Ii = `\\textcolor{${VI}}{I}`;

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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'But') - 0.2;
const tI = T0('I1'), tD = wt('I2', 'Let'), tB = T0('B1'), tT = T0('T1'), tN = T0('D1'), tW = T0('W1'), tL = T0('L1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tN], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const chS = $('#chS');
// wall socket (fixed) + charger (slides down when unplugged)
const sock = [W(chS, 'M70,14 H230 V70 H70 Z', { fill: '#fff', 'stroke-width': 4 }), mk(chS, 'rect', { x: 118, y: 34, width: 10, height: 22, rx: 3, fill: INK }), mk(chS, 'rect', { x: 172, y: 34, width: 10, height: 22, rx: 3, fill: INK })];
const chG = mk(chS, 'g');
const chP = [W(chG, 'M123,70 V96 M177,70 V96', { 'stroke-width': 8, stroke: '#9AA0AC' }), W(chG, 'M95,96 H205 A16,16 0 0 1 221,112 V250 A16,16 0 0 1 205,266 H95 A16,16 0 0 1 79,250 V112 A16,16 0 0 1 95,96 Z', { fill: '#fff', 'stroke-width': 5 }),
  W(chG, 'M150,266 V300 C150,340 110,340 110,380 V420', { 'stroke-width': 6 })];
const chLed = mk(chG, 'circle', { cx: 150, cy: 214, r: 14, fill: AM, stroke: INK, 'stroke-width': 3 });
const tPull = wt('H1', 'out'), tFade = wt('H1', 'slowly');
const glow = t => t < tFade ? 1 : Math.exp(-(t - tFade) / 2.4);
// brightness vs time graph
const lgS = $('#lgS');
const lgAx = W(lgS, 'M20,20 V170 H290', { 'stroke-width': 2.5 });
const lgC = mk(lgS, 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const lgL = [mono(lgS, 30, 26, 'brightness', { 'font-size': 16 }), mono(lgS, 290, 162, 'time', { 'font-size': 16, 'text-anchor': 'end' })];
const lgM = mk(lgS, 'line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: TE, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
// tank that drains with the light
const tkS = $('#tkS');
const tkW = mk(tkS, 'rect', { x: 50, y: 30, width: 120, height: 0, fill: C.ac2 });
const tkB = [W(tkS, 'M50,20 V170 H170 V20', { 'stroke-width': 5 }), W(tkS, 'M170,150 H205', { 'stroke-width': 5 })];

/* ================= D: three passive parts ================= */
const PT = [['Resistor', 'turns energy into heat', 'NO · it spends energy', 'bad'], ['Capacitor', 'between its two plates', 'YES · electric field', 'good'], ['Inductor', 'around its coil', 'YES · magnetic field', 'good']];
$('#pTiles').innerHTML = PT.map(([n, e, p, k], i) => `<div class="card pT" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:28px">STORES ENERGY?</div><svg width="512" height="240"></svg><div class="nm">${n}</div><div class="ex">${e}</div><div class="pillp ${k}">${p}</div></div>`).join('');
const pT = [...$('#pTiles').children], pS = pT.map(e => e.querySelector('svg'));
pT.forEach(e => { const p = e.querySelector('.pillp'); p.style.left = '0px'; });
// resistor symbol + heat
const rSym = [W(pS[0], 'M86,130 H170 L182,106 L206,154 L230,106 L254,154 L278,106 L302,154 L326,106 L338,130 H426')];
const heat = [0, 1, 2].map(i => W(pS[0], '', { stroke: C.red, 'stroke-width': 3.5, opacity: 0.8 }));
// capacitor symbol + field
const cSym = [W(pS[1], 'M86,130 H236 M276,130 H426'), W(pS[1], 'M236,74 V186', { 'stroke-width': 7 }), W(pS[1], 'M276,74 V186', { 'stroke-width': 7 })];
const cPl = [tx(pS[1], 206, 76, '+', { fill: OR, 'font-size': 30 }), tx(pS[1], 292, 76, '-', { fill: OR, 'font-size': 34 })];
const cFl = [92, 116, 144, 168].map(y => W(pS[1], `M244,${y} H268`, { stroke: FLD, 'stroke-width': 3 }));
// inductor symbol + field loops
const lSym = [W(pS[2], 'M86,140 H166 a22,22 0 0 1 44,0 a22,22 0 0 1 44,0 a22,22 0 0 1 44,0 a22,22 0 0 1 44,0 H426')];
const lFl = [0, 1].map(i => mk(pS[2], 'ellipse', { cx: 254, cy: 130, rx: 120 + i * 40, ry: 40 + i * 22, fill: 'none', stroke: FLD, 'stroke-width': 3, 'stroke-dasharray': '8 8' }));
const tPart = [wt('I2', 'resistor'), wt('I3', 'capacitor'), wt('I4', 'inductor')];

/* ================= B: breadboard (charge then discharge) ================= */
const ck = $('#ckS');
const cw = [W(ck, 'M150,282 V150 H377'), W(ck, 'M464,157 V270'), W(ck, 'M551,150 H780 V256'), W(ck, 'M780,344 V450 H150 V318'), W(ck, 'M464,330 V450')];
const bat = [W(ck, 'M115,282 H185', { 'stroke-width': 5 }), W(ck, 'M132,318 H168', { 'stroke-width': 9 })];
const cap = [W(ck, 'M409,270 H519', { 'stroke-width': 7 }), W(ck, 'M409,330 H519', { 'stroke-width': 7 })];
const jn = mk(ck, 'circle', { cx: 464, cy: 450, r: 7, fill: INK });
const cA = mk(ck, 'circle', { cx: 384, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), cB = mk(ck, 'circle', { cx: 544, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const lev = W(ck, 'M464,150 H390', { 'stroke-width': 5 });
const piv = mk(ck, 'circle', { cx: 464, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const bulbC = mk(ck, 'circle', { cx: 780, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const bulbX = [W(ck, 'M749,269 L811,331'), W(ck, 'M811,269 L749,331')];
const plus = [418, 438, 490, 510].map(x => tx(ck, x, 258, '+', { fill: OR, 'font-size': 24, 'text-anchor': 'middle' }));
const minus = [418, 438, 490, 510].map(x => tx(ck, x, 358, '-', { fill: OR, 'font-size': 28, 'text-anchor': 'middle' }));
const fld = [428, 446, 482, 500].map(x => W(ck, `M${x},280 V320`, { stroke: FLD, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }));
const lb = [tx(ck, 64, 278, '+', { 'font-size': 28 }), tx(ck, 68, 336, '-', { 'font-size': 30 }), tx(ck, 196, 296, 'Battery'), mono(ck, 196, 324, '12 V'),
  tx(ck, 546, 296, 'Capacitor'), mono(ck, 546, 324, '100 µF'), tx(ck, 840, 292, 'Lamp'), mono(ck, 840, 320, 'small'),
  mono(ck, 384, 184, 'A', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(ck, 544, 184, 'B', { 'text-anchor': 'middle', 'font-weight': 600 }), tx(ck, 464, 96, 'Switch', { 'text-anchor': 'middle' })];
const noBat = mono(ck, 622, 500, 'no battery in this loop', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 });
const noBox = mk(ck, 'rect', { x: 430, y: 120, width: 420, height: 400, rx: 18, fill: 'none', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 10' });
const eCh = flow(ck, [[150, 318], [150, 450], [464, 450], [464, 330], [464, 270], [464, 150], [150, 150], [150, 282]], 28, {
  skip: (x, y) => (Math.abs(x - 464) < 2 && y > 266 && y < 334) || (Math.abs(x - 150) < 2 && y > 278 && y < 322) });
const eDis = flow(ck, [[464, 330], [464, 450], [780, 450], [780, 344], [780, 256], [780, 150], [464, 150], [464, 270]], 26, {
  skip: (x, y) => (Math.abs(x - 780) < 2 && y > 252 && y < 348) });
const tCh = wt('B3', 'Flip') + 0.2, tUp = wt('B6', 'flip') + 0.1, tDis = wt('B7', 'Yet') - 0.05;
const tauC = 1.3, tauD = Math.max(1.2, (T1('B8') - tDis) / 3.2);
const vC = τ => τ < tCh ? 0 : τ < tDis ? 12 * (1 - Math.exp(-(τ - tCh) / tauC)) : 12 * (1 - Math.exp(-(tDis - tCh) / tauC)) * Math.exp(-(τ - tDis) / tauD);
const VMAX = vC(tDis - 1e-6);
const iC = τ => τ < tCh ? 0 : τ < tUp ? Math.exp(-(τ - tCh) / tauC) : τ < tDis ? 0 : -(VMAX / 12) * Math.exp(-(τ - tDis) / tauD);
const levAng = t => { const a = M.spring(t - tCh, M.SNAP), b = M.spring(t - tUp, M.SNAP), c = M.spring(t - tDis, M.SNAP); return 90 - 90 * a + 90 * b + 90 * c; };
const SC = scope($('#scS'), 592, 200);
const trV = SC.tr(TE), trI = SC.tr(VI);
const sLab = [SC.lab(14, 26, 'CH1 · V ACROSS CAPACITOR', '#5FC4C4'), SC.lab(14, 190, 'CH2 · I CHARGING CURRENT', '#B9A6F2')];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="rV" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${OR}">Q</span><span class="v" id="rQ" style="color:${OR}">0.00</span><span class="u">mC</span>
  <span class="k" style="color:${GO}">U</span><span class="v" id="rU" style="color:${GO}">0.00</span><span class="u">mJ</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the charger light runs on a capacitor!' });

/* ================= N: derivation + worked example ================= */
const nS = $('#nS');
const X = q => 110 + 520 * q, Y = v => 520 - 400 * v;
const nAx = W(nS, `M110,96 V520 H680`, { 'stroke-width': 3 });
const nAxL = [tx(nS, 92, 112, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 30, 'text-anchor': 'end' }), tx(nS, 690, 528, 'Q', { fill: OR, 'font-style': 'italic', 'font-size': 30 })];
const triBig = mk(nS, 'path', { d: `M110,520 L${X(0.9)},520 L${X(0.9)},${Y(0.9)} Z`, fill: C.ac2, stroke: 'none' });
const tri = mk(nS, 'path', { d: `M110,520 L${X(0.45)},520 L${X(0.45)},${Y(0.45)} Z`, fill: '#F4DDA8', stroke: 'none' });
const bars = [...Array(9)].map((_, i) => { const q0 = i * 0.05, v = q0 + 0.025; return mk(nS, 'rect', { x: X(q0) + 1.5, y: Y(v), width: 520 * 0.05 - 3, height: 400 * v, fill: '#F4DDA8', stroke: GO, 'stroke-width': 1.5 }); });
const ln1 = W(nS, `M110,520 L${X(0.45)},${Y(0.45)}`, { stroke: INK, 'stroke-width': 5 });
const ln2 = W(nS, `M${X(0.45)},${Y(0.45)} L${X(0.9)},${Y(0.9)}`, { stroke: INK, 'stroke-width': 5 });
const pt1 = mk(nS, 'circle', { cx: X(0.45), cy: Y(0.45), r: 9, fill: INK });
const pt1L = tx(nS, X(0.45) - 16, Y(0.45) - 18, '(Q, V)', { 'text-anchor': 'end', 'font-size': 24 });
const avg = W(nS, `M110,${Y(0.225)} H${X(0.45)}`, { stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const avgL = tx(nS, 100, Y(0.225) + 8, 'V/2', { fill: TE, 'font-size': 22, 'text-anchor': 'end' });
const areaL = tx(nS, X(0.30), Y(0.07), 'U = ½ QV', { fill: GO, 'font-size': 24, 'text-anchor': 'middle' });
const triS = [W(nS, `M${X(0.45)},${Y(0.45)} L${X(0.9)},${Y(0.45)}`, { stroke: GO, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }), W(nS, `M${X(0.45)},520 L${X(0.9)},${Y(0.45)}`, { stroke: GO, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }),
  W(nS, `M${X(0.45)},520 V${Y(0.45)}`, { stroke: GO, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' })];
const pt2 = mk(nS, 'circle', { cx: X(0.9), cy: Y(0.9), r: 9, fill: INK });
const tk1 = [mono(nS, 100, Y(0.45) + 7, '12 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 }), mono(nS, X(0.45), 552, '1.2 mC', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600 })];
const tk2 = [mono(nS, 100, Y(0.9) + 7, '24 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 }), mono(nS, X(0.9), 552, '2.4 mC', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600 })];
const x4 = tx(nS, X(0.68), Y(0.62), '× 4', { fill: GO, 'font-size': 40, 'text-anchor': 'middle' });
const dSteps = [
  [K(`${Qq} = C\\,${Vv}`), 'charge grows with voltage', 96],
  [K(`${Vv}_{\\text{avg}} = \\dfrac{${Vv}}{2}`), 'climbs from 0 to V', 190],
  [K(`${U_()} = ${Qq}\\cdot\\dfrac{${Vv}}{2} = \\tfrac{1}{2}${Qq}${Vv}`), 'charge × voltage', 302],
  [K(`${U_()} = \\tfrac{1}{2}\\,C\\,${Vv}^{2}`), 'put Q = CV', 441]];
$('#nSteps').innerHTML = dSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const wRows = [
  [K(`C = 100\\,\\mu\\text{F},\\quad ${Vv} = 12\\,\\text{V}`), 'given', 96],
  [K(`${U_()} = \\tfrac{1}{2}\\times 100\\times10^{-6}\\times 12^{2}`), '', 196],
  [K(`${U_()} = 7.2\\,\\text{mJ}`), '', 300],
  [K(`${Vv} = 24\\,\\text{V} \\;\\Rightarrow\\; ${U_()} = 28.8\\,\\text{mJ}`), '4 times', 441]];
$('#wSteps').innerHTML = `<div id="wBox" style="position:absolute;left:24px;top:418px;width:736px;height:92px;border-radius:14px;background:${C.ac2}"></div>` +
  wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const dRows = [...$('#nSteps').children], wR = [...$('#wSteps').querySelectorAll('.st2')];
const tDer = [wt('D2', 'Q'), wt('D4', 'While'), wt('D5', 'Work'), wt('D6', 'The')];
const tWr = [wt('W1', 'one'), wt('W2', 'U'), wt('W3', 'That'), wt('W4', 'Now')];

/* ================= L: inductor ================= */
const lS = $('#lS');
const lw = [W(lS, 'M110,222 V110 H243'), W(lS, 'M337,110 H670 V160'), W(lS, 'M670,330 V380 H110 V258')];
const lbat = [W(lS, 'M75,222 H145', { 'stroke-width': 5 }), W(lS, 'M92,258 H128', { 'stroke-width': 9 })];
const coil = W(lS, 'M670,160 a24,21.25 0 0 1 0,42.5 a24,21.25 0 0 1 0,42.5 a24,21.25 0 0 1 0,42.5 a24,21.25 0 0 1 0,42.5', { 'stroke-width': 4.5 });
const lPiv = mk(lS, 'circle', { cx: 250, cy: 110, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), lCon = mk(lS, 'circle', { cx: 330, cy: 110, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const lLev = W(lS, 'M250,110 H326', { 'stroke-width': 5 });
const lFld = [0, 1, 2].map(i => mk(lS, 'ellipse', { cx: 670, cy: 245, rx: 0, ry: 0, fill: 'none', stroke: FLD, 'stroke-width': 3, 'stroke-dasharray': '9 8' }));
const spark = mk(lS, 'path', { d: 'M290,96 L300,70 L284,74 L298,44 M276,98 L262,78 M304,98 L322,82', fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const lLb = [tx(lS, 40, 218, '+', { 'font-size': 26 }), tx(lS, 44, 276, '-', { 'font-size': 28 }), tx(lS, 290, 150, 'Switch', { 'text-anchor': 'middle' }), tx(lS, 548, 236, 'Coil', { 'text-anchor': 'end' }), mono(lS, 548, 264, 'L = 0.4 H', { 'text-anchor': 'end' })];
const eL = flow(lS, [[110, 258], [110, 380], [670, 380], [670, 330], [670, 160], [670, 110], [110, 110], [110, 222]], 22, {
  skip: (x, y) => (Math.abs(x - 670) < 2 && y > 156 && y < 334) || (Math.abs(x - 110) < 2 && y > 218 && y < 262) });
$('#lRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="lI" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${GO}">U</span><span class="v" id="lU" style="color:${GO}">0.000</span><span class="u">J</span>`;
const tLon = wt('L2', 'When'), tLoff = wt('L4', 'Open') + 0.1, tauL = 0.9;
const iL = τ => τ < tLon ? 0 : τ < tLoff ? 1.5 * (1 - Math.exp(-(τ - tLon) / tauL)) : 1.5 * (1 - Math.exp(-(tLoff - tLon) / tauL)) * Math.exp(-(τ - tLoff) / 0.12);
const CMP = [['', 'CAPACITOR', 'INDUCTOR', 'h'], ['STORES IN', 'electric field', 'magnetic field'], ['ENERGY', K(`\\tfrac{1}{2}C${Vv}^{2}`), K(`\\tfrac{1}{2}L${Ii}^{2}`), 'f'],
  ['UNIT', 'farad (F)', 'henry (H)'], ['HOLDS ON TO', `<span style="color:${TE}">voltage</span>`, `<span style="color:${VI}">current</span>`]];
$('#cmp').innerHTML = CMP.map(([a, b, c, k]) => k === 'h' ? `<div class="h"></div><div class="h">${b}</div><div class="h">${c}</div>` :
  `<div class="rk">${a}</div><div class="${k === 'f' ? 'fx2' : ''}">${b}</div><div class="${k === 'f' ? 'fx2' : ''}">${c}</div>`).join('');
const cmpC = [...$('#cmp').children];
const tCmp = [tL + 0.4, wt('L2', 'field'), wt('L3', 'Its'), wt('L3', 'henries'), wt('L6', 'capacitor')];
const avL = PUC.avatar($('#sL'), { x: 1008, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'A half and a square, both times. Easy to remember!' });

/* ================= X: exam trap ================= */
const trap = PUC.trap($('#trap'), { wrong: 'The capacitor keeps all the energy, QV', right: 'It stores only ½QV, half is lost as heat', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcBar = mk(tcS, 'rect', { x: 40, y: 82, width: 0, height: 52, rx: 10, fill: INK });
const tcBL = tx(tcS, 60, 116, 'Battery gives QV', { fill: '#fff', 'font-size': 24 });
const tcH1 = mk(tcS, 'rect', { x: 40, y: 172, width: 0, height: 52, rx: 10, fill: '#F4DDA8', stroke: GO, 'stroke-width': 2 });
const tcH2 = mk(tcS, 'rect', { x: 396, y: 172, width: 0, height: 52, rx: 10, fill: C.redBg, stroke: C.red, 'stroke-width': 2 });
const tcL1 = tx(tcS, 58, 206, '½QV stored', { fill: '#8A5A12', 'font-size': 24 }), tcL2 = tx(tcS, 414, 206, '½QV lost as heat', { fill: C.red, 'font-size': 24 });
const tcSp = [W(tcS, 'M218,134 V172', { stroke: MU, 'stroke-width': 3 }), W(tcS, 'M574,134 V172', { stroke: MU, 'stroke-width': 3 })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Energy in a capacitor or an inductor, energy lost on charging or sharing' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 50&nbsp;mH inductor carries 2&nbsp;A. What capacitance stores the same energy at 20&nbsp;V?', qW: 780,
  opts: [K('250\\,\\mu\\text{F}'), K('500\\,\\mu\\text{F}'), K('1000\\,\\mu\\text{F}'), K('10\\,\\text{mF}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${U_()} = \\tfrac{1}{2}(0.05)(2)^{2} = 0.1\\,\\text{J}`)], [K(`C = \\dfrac{2${U_()}}{${Vv}^{2}}`)],
  [K(`C = \\dfrac{0.2}{400}`)], [K(`C = 5\\times10^{-4}\\,\\text{F}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Half'), wt('A3', 'So'), wt('A4', 'That'), wt('A4', 'Five')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 90, dy: 120, title: 'Energy storage · formula card', txt: [0, 0, 1, 1],
  lines: [K(`${U_()}_C = \\tfrac{1}{2}C${Vv}^{2} = \\dfrac{${Qq}^{2}}{2C} = \\tfrac{1}{2}${Qq}${Vv}`),
    K(`${U_()}_L = \\tfrac{1}{2}L${Ii}^{2}`),
    'Resistor stores nothing: it turns energy into heat',
    'Charging from a battery: half of <i>QV</i> is lost as heat'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 31', topic: 'Transducers and their applications', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gA = t >= tB + 0.5 && t < tT, gB = t >= tW && t < tX;
  M.vis(ghost, t, gA ? tB + 0.5 : tW + 0.2, gA ? tT - 0.4 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gA && !gB) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tD + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tD - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(sock.slice(0, 1), t, tMorph + 0.6, 0.4); fadeAt(sock.slice(1), t, tMorph + 0.9);
    drawSeq(chP, t, tMorph + 0.7, 0.45, 0.15); M.vis(chLed, t, tMorph + 1.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    PUC.attr(chG, 'transform', `translate(0,${(46 * M.spring(t - tPull, M.SNAP)).toFixed(1)})`);
    const g = glow(t); PUC.attr(chLed, 'fill', M.mix('#FFFFFF', AM, g));
    M.vis($('#aPill'), t, tPull + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, tPull + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(lgAx, t, tPull + 0.4, 0.5); fadeAt(lgL, t, tPull + 0.6);
    fadeAt([$('#thL0'), $('#thM'), $('#thL1'), $('#thN')], t, tPull + 0.5);
    // brightness graph draws live: 0..7 s window
    { let d = ''; const t0g = tPull, span = 7; const tn = Math.min(t, t0g + span); for (let i = 0; i <= 80; i++) { const τ = t0g + span * i / 80; if (τ > tn) break; d += (i ? 'L' : 'M') + (20 + 270 * i / 80).toFixed(1) + ',' + (170 - 120 * glow(τ)).toFixed(1); }
      PUC.attr(lgC, 'd', t > t0g + 0.6 ? d : ''); }
    M.setT($('#thN'), g > 0.6 ? 'ON' : g > 0.12 ? 'DIM' : 'OFF'); $('#thN').style.color = M.mix(MU, '#B7791F', Math.min(1, g * 1.4));
    M.vis($('#thL2'), t, tFade + 0.2, 1e9, { dy: 10 });
    M.vis($('#nwC'), t, tI - 0.1, out, { dy: 36, ...o });
    drawSeq(tkB, t, tI + 0.1, 0.4, 0.15);
    const lvl = 140 * (1 - M.io((t - wt('I1', 'tiny')) / 3.2)); PUC.attr(tkW, 'y', (170 - lvl).toFixed(1)); PUC.attr(tkW, 'height', lvl.toFixed(1)); M.vis(tkW, t, tI + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.rise($('#nwT'), t, wt('I1', 'like') - 0.1); M.vis($('#nwB'), t, wt('I1', 'tank') + 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#nwB2'), t, wt('I1', 'tank') + 0.3, 1e9, { dy: 10 });
  }

  /* D: three passive parts */
  const dOn = t >= tD - 0.05 && t < tB + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tB - 0.32;
    pT.forEach((el, i) => {
      M.vis(el, t, tD + 0.1 + i * 0.12, out, { dy: 36, ...o });
      const u = M.io((t - tPart[i] + 0.1) / 0.3);
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); el.querySelector('.ex').style.color = M.mix('#C4C8D0', MU, u);
      const p = el.querySelector('.pillp'); if (!p._c) { p._c = 1; p.style.left = ((512 - p.offsetWidth) / 2) + 'px'; }
      M.vis(p, t, tPart[i] + 0.5, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    });
    drawSeq(rSym, t, tD + 0.4, 0.6); drawSeq(cSym, t, tD + 0.55, 0.4, 0.1); drawSeq(lSym, t, tD + 0.7, 0.6);
    heat.forEach((h, k) => { const ph = ((t - tPart[0]) * 0.8 + k / 3) % 1, x = 190 + k * 66, y0 = 92 - 50 * ph;
      PUC.attr(h, 'd', `M${x},${y0.toFixed(1)} q8,-9 0,-18 q-8,-9 0,-18`); h.style.opacity = t < tPart[0] ? 0 : (0.85 * Math.sin(Math.PI * ph)).toFixed(3); });
    const uc = M.io((t - tPart[1]) / 0.4); fadeAt(cPl, t, tPart[1]); cFl.forEach((f, k) => M.draw(f, t, tPart[1] + 0.2 + k * 0.08, 0.3));
    lFl.forEach((f, k) => { M.draw(f, t, tPart[2] + 0.3 + k * 0.2, 0.7); });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    const t2 = T0('B2');
    drawSeq(cw, t, t2 - 0.1, 0.4, 0.15); drawSeq(bat, t, wt('B2', 'battery') - 0.1, 0.25, 0.1); drawSeq(cap, t, wt('B2', 'capacitor') - 0.1, 0.25, 0.1);
    [jn, cA, cB, piv].forEach((e, i) => M.vis(e, t, wt('B2', 'switch') - 0.3 + i * 0.06, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(lev, t, wt('B2', 'switch') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(bulbC, t, wt('B2', 'lamp') - 0.1, 1e9, { dy: 0, fade: 0.2 }); drawSeq(bulbX, t, wt('B2', 'lamp'), 0.25, 0.08);
    fadeAt(lb.slice(0, 4), t, wt('B2', 'battery')); fadeAt(lb.slice(4, 6), t, wt('B2', 'capacitor')); fadeAt(lb.slice(6, 8), t, wt('B2', 'lamp')); fadeAt(lb.slice(8), t, wt('B2', 'switch'));
    PUC.attr(lev, 'transform', `rotate(${levAng(t).toFixed(2)} 464 150)`);
    const v = vC(t), q = v / 12;
    plus.forEach((e, i) => { e.style.opacity = M.clamp(q * 4 - i).toFixed(3); }); minus.forEach((e, i) => { e.style.opacity = M.clamp(q * 4 - i).toFixed(3); });
    fld.forEach(e => { e.style.opacity = (0.9 * q).toFixed(3); });
    eCh.set(560 * (t < tCh ? 0 : 1 - Math.exp(-(Math.min(t, tUp) - tCh) / tauC)), t >= tCh - 0.1 && t < tUp + 0.25);
    eDis.set(560 * (1 - v / VMAX), t >= tDis - 0.05);
    const lit = t >= tDis ? Math.pow(v / VMAX, 1.4) : 0; PUC.attr(bulbC, 'fill', M.mix('#FFFFFF', AM, lit));
    M.vis(noBox, t, wt('B6', 'There') - 0.1, tDis + 1.2, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); M.vis(noBat, t, wt('B6', 'There'), tDis + 1.2, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    trV(τ => 130 * vC(τ) / 12, t, tCh - 0.6, 7, 172, t >= tCh - 0.6); trI(τ => 70 * iC(τ), t, tCh - 0.6, 7, 100, t >= tCh - 0.6);
    sLab.forEach(e => M.vis(e, t, tCh - 0.5, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tCh - 0.4, 1e9, { dy: 12 });
    M.setT($('#rV'), v.toFixed(1)); M.setT($('#rQ'), (0.1 * v).toFixed(2)); M.setT($('#rU'), (0.05 * v * v).toFixed(2));
    M.vis($('#slowT'), t, wt('B4', 'scope'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avB(t, wt('B8', 'That') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tN; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tN - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Capacitors') - 0.05, { out: tN - 0.35, outDur: 0.25 }); }

  /* N: derivation + worked example */
  const nOn = t >= tN - 0.05 && t < tL + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tL - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, tN + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(nAx, t, tN + 0.5, 0.6); fadeAt(nAxL, t, tN + 0.9);
    M.draw(ln1, t, wt('D3', 'graph'), 0.8); M.vis(pt1, t, wt('D3', 'straight'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pt1L, t, wt('D3', 'straight') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    const tb = wt('D4', 'each'); bars.forEach((b, i) => M.vis(b, t, tb - 0.6 + i * 0.12, wt('D5', 'area') - 0.2, { dy: 0, fade: 0.12, outDur: 0.3, ody: 0 }));
    if (t < tW) { M.draw(avg, t, wt('D4', 'average') - 0.1, 0.5, M.o3); M.vis(avgL, t, wt('D4', 'average') + 0.2, tW - 0.2, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); } else { M.hide(avg, true); M.hide(avgL, true); }
    M.vis(tri, t, wt('D5', 'area') - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(areaL, t, wt('D5', 'triangle') - 0.1, tW - 0.2, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#nRL1'), t, tN + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#nRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dRows.forEach((r, i) => { M.vis(r, t, tDer[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDer[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDer[i], 0.6); M.vis(r.querySelector('.why'), t, tDer[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#nBox'), t, tDer[3] + 0.6, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#nUnit'), t, T0('D7'), tW - 0.3, { dy: 12, outDur: 0.25 });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWr[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWr[i] - 0.15); });
    M.vis($('#wBox'), t, wt('W5', 'Twenty') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    fadeAt(tk1, t, tWr[0] + 0.3);
    const t4 = wt('W4', 'double'); M.draw(ln2, t, t4, 0.8); M.vis(pt2, t, t4 + 0.7, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); fadeAt(tk2, t, t4 + 0.6);
    M.vis(triBig, t, wt('W4', 'four') - 0.1, 1e9, { dy: 0, fade: 0.3 }); drawSeq(triS, t, wt('W5', 'Look') - 0.1, 0.4, 0.15);
    M.vis(x4, t, wt('W5', 'four') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
  }

  /* L: inductor */
  const lOn = t >= tL - 0.05 && t < tX + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tX - 0.32;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, tL + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(lw, t, tL + 0.4, 0.4, 0.15); drawSeq(lbat, t, tL + 0.6, 0.25, 0.1); M.draw(coil, t, wt('L1', 'coil') - 0.2, 0.7);
    [lPiv, lCon].forEach((e, i) => M.vis(e, t, tL + 0.8 + i * 0.06, 1e9, { dy: 0, fade: 0.2 }));
    const ang = t < tLon ? -32 : t < tLoff ? -32 * (1 - M.spring(t - tLon, M.SNAP)) : -32 * M.spring(t - tLoff, M.SNAP);
    PUC.attr(lLev, 'transform', `rotate(${ang.toFixed(2)} 250 110)`); M.vis(lLev, t, tL + 0.9, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(lLb, t, tL + 1.0, 0.06);
    const i = iL(t), fu = i / 1.5;
    lFld.forEach((f, k) => { PUC.attr(f, 'rx', (fu * (40 + k * 26)).toFixed(1)); PUC.attr(f, 'ry', (fu * (100 + k * 20)).toFixed(1)); f.style.opacity = M.clamp(fu * 1.5).toFixed(3); });
    // electrons: offset proportional to the charge that has passed (integral of current)
    const qAt = τ => { if (τ < tLon) return 0; const a = Math.min(τ, tLoff) - tLon; let s = 1.5 * (a - tauL * (1 - Math.exp(-a / tauL))); if (τ > tLoff) s += iL(tLoff) * 0.12 * (1 - Math.exp(-(τ - tLoff) / 0.12)); return s; };
    eL.set(-160 * qAt(t), t >= tLon - 0.1);
    const sp = t >= tLoff && t < tLoff + 0.5 ? 1 - M.io((t - tLoff - 0.25) / 0.25) : 0; spark.style.opacity = sp.toFixed(3); M.hide(spark, sp <= 0);
    M.vis($('#lRo'), t, tLon - 0.2, 1e9, { dy: 12 });
    M.setT($('#lI'), i.toFixed(2)); M.setT($('#lU'), (0.5 * 0.4 * i * i).toFixed(3));
    const nC = 3; cmpC.forEach((c, k) => { const r = Math.floor(k / nC); M.vis(c, t, tCmp[r] + (k % nC) * 0.08, 1e9, { dy: 10, fade: 0.2 }); });
    avL(t, wt('L6', 'Both') + 0.2, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'capacitor') - 0.1 });
    const b = M.io((t - wt('X3', 'battery')) / 0.6); PUC.attr(tcBar, 'width', (712 * b).toFixed(1)); M.vis(tcBL, t, wt('X3', 'battery') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(tcSp, t, wt('X3', 'stores') - 0.1, 0.3, 0.1);
    const h1 = M.io((t - wt('X3', 'stores')) / 0.5), h2 = M.io((t - wt('X3', 'other')) / 0.5);
    PUC.attr(tcH1, 'width', (340 * h1).toFixed(1)); PUC.attr(tcH2, 'width', (356 * h2).toFixed(1)); M.hide(tcH1, h1 <= 0); M.hide(tcH2, h2 <= 0);
    M.vis(tcL1, t, wt('X3', 'stores') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(tcL2, t, wt('X3', 'other') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'Find') - 0.2 });
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
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
