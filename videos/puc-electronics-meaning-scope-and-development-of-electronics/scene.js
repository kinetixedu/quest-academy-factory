// PUC Electronics Ep 1 - Meaning, scope and development of electronics ("Breadboard" style, Lab Notebook world)
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
const sci = (x, d = 2) => { if (x <= 0) return '0'; const e = Math.floor(Math.log10(x) + 1e-9), m = x / Math.pow(10, e); return `${m.toFixed(d)} × 10<sup>${e}</sup>`; };

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
const tMorph = wt('H1', 'Yet') - 0.2;
const tD = T0('D1'), tB = T0('E1'), tT = T0('T1'), tN = T0('N1'), tW = T0('W1'), tV = T0('V1'), tS = T0('S1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tN], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const phS = $('#phS');
const phP = [W(phS, 'M95,40 H205 A20,20 0 0 1 225,60 V310 A20,20 0 0 1 205,330 H95 A20,20 0 0 1 75,310 V60 A20,20 0 0 1 95,40 Z', { 'stroke-width': 5 }),
  W(phS, 'M135,58 H165', { 'stroke-width': 4 }), W(phS, 'M140,312 H160', { 'stroke-width': 4 })];
const phScr = mk(phS, 'rect', { x: 92, y: 76, width: 116, height: 220, rx: 8, fill: C.ac2 });
const phIn = [W(phS, 'M112,120 H188', { stroke: AM, 'stroke-width': 4 }), W(phS, 'M112,150 H170', { stroke: AM, 'stroke-width': 4 }), W(phS, 'M112,180 H182', { stroke: AM, 'stroke-width': 4 }), W(phS, 'M112,210 H160', { stroke: AM, 'stroke-width': 4 })];
// ENIAC: a block of tube glyphs that fills while 17,468 counts up
const tubeS = $('#tubeS'), TUBES = [];
for (let r = 0; r < 5; r++) for (let c = 0; c < 12; c++) { const x = 6 + c * 30, y = 10 + r * 36;
  const g = mk(tubeS, 'g'); mk(g, 'rect', { x, y, width: 20, height: 28, rx: 9, fill: '#fff', stroke: INK, 'stroke-width': 2 }); mk(g, 'line', { x1: x + 6, y1: y + 20, x2: x + 14, y2: y + 20, stroke: AM, 'stroke-width': 3, 'stroke-linecap': 'round' }); TUBES.push(g); }
// chip
const chipS = $('#chipS'), chipP = [W(chipS, 'M50,45 H150 V145 H50 Z', { 'stroke-width': 5, fill: '#fff' }), W(chipS, 'M78,73 H122 V117 H78 Z', { stroke: AM, 'stroke-width': 4 })];
for (let i = 0; i < 5; i++) { const p = 60 + i * 20; chipP.push(W(chipS, `M${p},45 V31`, { 'stroke-width': 3 }), W(chipS, `M${p},145 V159`, { 'stroke-width': 3 }), W(chipS, `M50,${p + 0} H36`, { 'stroke-width': 3 }), W(chipS, `M150,${p} H164`, { 'stroke-width': 3 })); }
const tEn = T0('I1') + 0.6, tNow = T0('I3');

/* ================= D: definition ================= */
$('#dZ').innerHTML = M.icon('zap', 34, AM, 2.4);
const dTiles = [0, 1, 2].map(i => $('#dt' + i)), dSv = dTiles.map(d => d.querySelector('svg'));
// vacuum tube
mk(dSv[0], 'rect', { x: 300, y: 30, width: 390, height: 100, rx: 50, fill: '#fff', stroke: INK, 'stroke-width': 3 });
mk(dSv[0], 'rect', { x: 334, y: 52, width: 8, height: 56, fill: INK }); mk(dSv[0], 'rect', { x: 648, y: 52, width: 8, height: 56, fill: INK });
const fV = [flow(dSv[0], [[352, 66], [640, 66]], 5, { r: 6 }), flow(dSv[0], [[352, 94], [640, 94]], 5, { r: 6 })];
// gas lamp
mk(dSv[1], 'rect', { x: 300, y: 30, width: 390, height: 100, rx: 50, fill: '#FDF1D6', stroke: INK, 'stroke-width': 3 });
mk(dSv[1], 'rect', { x: 334, y: 52, width: 8, height: 56, fill: INK }); mk(dSv[1], 'rect', { x: 648, y: 52, width: 8, height: 56, fill: INK });
[[400, 58], [470, 100], [540, 62], [600, 96], [430, 88], [570, 72]].forEach(([x, y]) => mk(dSv[1], 'circle', { cx: x, cy: y, r: 9, fill: 'none', stroke: '#C9B98F', 'stroke-width': 2 }));
const fG = [flow(dSv[1], [[352, 70], [420, 92], [495, 66], [570, 94], [640, 72]], 6, { r: 6 })];
// silicon lattice
for (let i = 0; i < 9; i++) { mk(dSv[2], 'line', { x1: 320 + i * 46, y1: 50, x2: 320 + i * 46, y2: 110, stroke: '#D9DCE3', 'stroke-width': 3 }); }
mk(dSv[2], 'line', { x1: 320, y1: 50, x2: 688, y2: 50, stroke: '#D9DCE3', 'stroke-width': 3 }); mk(dSv[2], 'line', { x1: 320, y1: 110, x2: 688, y2: 110, stroke: '#D9DCE3', 'stroke-width': 3 });
for (let i = 0; i < 9; i++) for (const y of [50, 110]) mk(dSv[2], 'circle', { cx: 320 + i * 46, cy: y, r: 13, fill: '#E3E6EC', stroke: '#B8BCC6', 'stroke-width': 2 });
const fS = [flow(dSv[2], [[320, 80], [690, 80]], 6, { r: 6 })];
const dFlows = [fV, fG, fS];
const tMed = [wt('D3', 'vacuum'), wt('D3', 'gas'), wt('D3', 'semiconductor')];

/* ================= B: breadboard ================= */
const ck = $('#ckS'), g1 = mk(ck, 'g'), g2 = mk(ck, 'g');
// circuit 1: battery (left), switch (top), bulb (right)
const c1w = [W(g1, 'M150,282 V150 H400'), W(g1, 'M500,150 H780 V256'), W(g1, 'M780,344 V450 H150 V318')];
const bat1 = [W(g1, 'M115,282 H185', { 'stroke-width': 5 }), W(g1, 'M132,318 H168', { 'stroke-width': 9 })];
const swPiv = mk(g1, 'circle', { cx: 400, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), swEnd = mk(g1, 'circle', { cx: 500, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const swLev = W(g1, 'M400,150 H496', { 'stroke-width': 5 });
const bulbC = mk(g1, 'circle', { cx: 780, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const bulbX = [W(g1, 'M749,269 L811,331'), W(g1, 'M811,269 L749,331')];
const lb1 = [tx(g1, 64, 278, '+', { 'font-size': 28 }), tx(g1, 68, 336, '-', { 'font-size': 30 }), tx(g1, 202, 296, 'Battery'), mono(g1, 202, 324, '3 V'),
  tx(g1, 410, 124, 'Switch'), tx(g1, 840, 292, 'Bulb'), mono(g1, 840, 320, 'lamp')];
const e1 = flow(ck, [[150, 318], [150, 450], [780, 450], [780, 150], [150, 150], [150, 282]], 26, {
  skip: (x, y) => (Math.abs(x - 780) < 2 && y > 252 && y < 348) || (y < 152 && x > 404 && x < 498) });
// circuit 2: microphone -> transistor -> speaker + supply
const c2w = [W(g2, 'M240,346 V450 H780 V392'), W(g2, 'M286,300 H462'), W(g2, 'M512,150 H780 V214'), W(g2, 'M780,286 V352'), W(g2, 'M512,450 V352')];
const mic = [mk(g2, 'circle', { cx: 240, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(g2, 'M214,300 C224,280 232,280 240,300 S256,320 266,300')];
const trC = mk(g2, 'circle', { cx: 492, cy: 300, r: 58, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const trP = [W(g2, 'M466,264 V336', { 'stroke-width': 7 }), W(g2, 'M468,284 L512,254 V150'), W(g2, 'M468,316 L512,346 V452')];
const trA = mk(g2, 'path', { d: 'M512,346 L494,344 L503,331 Z', fill: INK });
const spk = [W(g2, 'M766,214 H794 V286 H766 Z', { fill: '#fff' }), W(g2, 'M794,226 L826,204 V296 L794,274', { fill: '#fff' })];
const bat2 = [W(g2, 'M745,352 H815', { 'stroke-width': 5 }), W(g2, 'M762,392 H798', { 'stroke-width': 9 })];
const lb2 = [null, tx(g2, 210, 206, 'Microphone', { 'text-anchor': 'middle' }), mono(g2, 210, 234, 'tiny signal', { 'text-anchor': 'middle' }),
  tx(g2, 410, 226, 'Transistor', { 'text-anchor': 'middle' }), tx(g2, 748, 244, 'Speaker', { 'text-anchor': 'end' }), mono(g2, 748, 272, 'big current', { 'text-anchor': 'end' }), tx(g2, 728, 370, 'Supply', { 'text-anchor': 'end' }), mono(g2, 728, 398, '9 V', { 'text-anchor': 'end' })];
const fq = 0.5, OMG = 2 * Math.PI * fq;
const e2out = flow(ck, [[780, 392], [780, 450], [512, 450], [512, 346], [468, 316], [468, 284], [512, 254], [512, 150], [780, 150], [780, 214]], 24, {
  skip: (x, y) => (x > 462 && x < 520 && y > 250 && y < 350) || (x > 760 && x < 800 && y > 208 && y < 292) });
const e2in = flow(ck, [[300, 300], [460, 300]], 4, { r: 5 });
const tC1 = tB + 0.2, tClose = wt('E3', 'Close'), tOpen = wt('E4', 'Open'), tC2 = T0('E5'), tSig = wt('E5', 'tiny');
const closed = τ => τ >= tClose && τ < tOpen;
const onT = t => M.clamp(t, tClose, tOpen) - tClose;
const sig = τ => τ < tSig ? 0 : Math.sin(OMG * (τ - tSig));
const outOff = t => { const a = 90 * (t - tC2); if (t < tSig) return a; return a + 90 * 0.7 * (1 - Math.cos(OMG * (t - tSig))) / OMG; };
// scope + readouts
const SC = scope($('#scS'), 592, 200);
const trI = SC.tr(VI), trIn = SC.tr(CH1), trOut = SC.tr(AM);
const sL1 = [SC.lab(14, 26, 'I · CURRENT', '#B9A6F2')], sL2 = [SC.lab(14, 26, 'CH1 · V IN · ZOOM ×20', CH1), SC.lab(14, 190, 'CH2 · V OUT (SPEAKER)', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" style="color:${TE}">3.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="r1I" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k n">BULB</span><span class="v" id="r1B">OFF</span><span class="u"></span>`;
$('#ro2').innerHTML = `<span class="k" style="color:#5F7399">V<sub>in</sub></span><span class="v" id="r2i" style="color:#5F7399">+0.0</span><span class="u">mV</span>
  <span class="k" style="color:${AM}">V<sub>out</sub></span><span class="v" id="r2o" style="color:${AM}">+0.00</span><span class="u">V</span>
  <span class="k n">GAIN</span><span class="v">×100</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the transistor is like a tap for current!' });

/* ================= N: counting electrons ================= */
const nS = $('#nS');
mk(nS, 'rect', { x: 40, y: 100, width: 704, height: 120, rx: 60, fill: '#F3F1EA', stroke: INK, 'stroke-width': 3 });
const gate = mk(nS, 'line', { x1: 392, y1: 88, x2: 392, y2: 232, stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const gateL = mono(nS, 392, 74, 'COUNT HERE', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const sk = (x) => x < 64 || x > 720;
const eN = [flow(nS, [[740, 136], [44, 136]], 9, { skip: sk }), flow(nS, [[740, 184], [44, 184]], 9, { skip: sk })];
const iArr = PUC.arrow(nS, VI); const iLab = tx(nS, 712, 64, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 32 });
const eLeg = document.createElement('div'); eLeg.style.cssText = 'position:absolute;left:40px;top:250px;display:flex;align-items:center;gap:14px;white-space:nowrap';
eLeg.innerHTML = `<svg width="22" height="22"><circle cx="11" cy="11" r="8" fill="${AM}" stroke="${OR}" stroke-width="3"/></svg><span class="mono" style="font:500 22px 'IBM Plex Mono';color:${MU}">one electron carries</span><span style="font-size:30px">${K(`\\textcolor{${OR}}{e} = 1.6\\times10^{-19}\\,\\text{C}`)}</span>`;
$('#nL').appendChild(eLeg);
$('#nRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="nI" style="color:${VI}">?</span><span class="u">A</span>
  <span class="k">t</span><span class="v" id="nT">?</span><span class="u">s</span>
  <span class="k" style="color:${AM}">n</span><span class="v" id="nN" style="color:#B7791F">?</span><span class="u"></span>`;
const dSteps = [
  [K(`\\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${OR}}{Q}}{t}`), 'charge per second', 92],
  [K(`\\textcolor{${OR}}{e} = 1.6\\times10^{-19}\\,\\text{C}`), 'charge of one electron', 206],
  [K(`\\textcolor{${OR}}{Q} = \\textcolor{${AM}}{n}\\,\\textcolor{${OR}}{e}`), 'n electrons, n packets', 300],
  [K(`\\textcolor{${AM}}{n} = \\dfrac{\\textcolor{${VI}}{I}\\,t}{\\textcolor{${OR}}{e}}`), 'number of electrons', 402]];
$('#nSteps').innerHTML = dSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const wRows = [
  [K(`\\textcolor{${VI}}{I} = 2\\,\\text{A},\\quad t = 1\\,\\text{s}`), 'given', 92],
  [K(`\\textcolor{${AM}}{n} = \\dfrac{\\textcolor{${VI}}{I}\\,t}{\\textcolor{${OR}}{e}} = \\dfrac{2 \\times 1}{1.6\\times10^{-19}}`), '', 196],
  [K(`\\textcolor{${AM}}{n} = 1.25\\times10^{19}`), 'every second', 330]];
$('#wSteps').innerHTML = `<div id="wBox" style="position:absolute;left:24px;top:318px;width:736px;height:96px;border-radius:14px;background:${C.ac2}"></div>` +
  wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const dRows = [...$('#nSteps').children], wR = [...$('#wSteps').querySelectorAll('.st2')];
const tDer = [wt('N2', 'So'), wt('N3', 'Each'), wt('N4', 'So'), wt('N5', 'and')];
const tWr = [wt('W1', 'two'), wt('W3', 'n'), wt('W4', 'That')];
const tTick = wt('W2', 'How'), N_RATE = 2 / 1.6e-19;
const avN = PUC.avatar($('#sN'), { x: 1008, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'That is over ten billion billion!' });

/* ================= V: development timeline ================= */
const vS = $('#vS');
const tl = W(vS, 'M60,300 H1540', { 'stroke-width': 4, stroke: '#CBD0DA' });
const NX = [150, 410, 670, 930, 1190, 1450];
const ITEMS = [['1904', 'Vacuum diode', 'John Ambrose Fleming'], ['1906', 'Triode', 'Lee de Forest'], ['1947', 'Transistor', 'Bardeen, Brattain and Shockley'],
  ['1958', 'Integrated circuit', 'Jack Kilby'], ['1971', 'Microprocessor', 'a computer brain on one chip'], ['LATER', 'Microcontroller', 'a small computer on one chip']];
const valve = (cx, grid) => { const a = [W(vS, `M${cx - 46},240 V128 A46,46 0 0 1 ${cx + 46},128 V240 Z`, { fill: '#fff' }), W(vS, `M${cx - 26},118 H${cx + 26}`, { 'stroke-width': 7 }),
  W(vS, `M${cx - 24},226 L${cx - 12},204 L${cx},226 L${cx + 12},204 L${cx + 24},226`, { stroke: AM, 'stroke-width': 4 }), W(vS, `M${cx - 24},240 V262 M${cx + 24},240 V262`)];
  if (grid) a.splice(2, 0, W(vS, `M${cx - 32},168 H${cx + 32}`, { 'stroke-dasharray': '7 7', 'stroke-width': 4 })); return a; };
const chipG = (cx, s, inner) => { const a = [W(vS, `M${cx - s},${200 - s} H${cx + s} V${200 + s} H${cx - s} Z`, { fill: '#fff' })];
  const n = 4, pins = []; for (let i = 0; i < n; i++) { const p = -s + (2 * s) * (i + 0.5) / n; pins.push(`M${cx + p},${200 - s} V${200 - s - 12} M${cx + p},${200 + s} V${200 + s + 12} M${cx - s},${200 + p} H${cx - s - 12} M${cx + s},${200 + p} H${cx + s + 12}`); }
  a.push(W(vS, pins.join(' '), { 'stroke-width': 3 }));
  if (inner === 1) a.push(W(vS, `M${cx - 18},182 H${cx + 18} V218 H${cx - 18} Z`, { stroke: AM }));
  if (inner === 2) a.push(W(vS, `M${cx - 22},178 h18 v18 h-18 Z M${cx + 4},178 h18 v18 h-18 Z M${cx - 22},204 h18 v18 h-18 Z M${cx + 4},204 h18 v18 h-18 Z`, { stroke: AM, 'stroke-width': 3 }));
  return a; };
const GLY = [valve(NX[0], false), valve(NX[1], true),
  [W(vS, `M${NX[2] - 32},214 V176 A32,32 0 0 1 ${NX[2] + 32},176 V214 Z`, { fill: '#fff' }), W(vS, `M${NX[2] - 16},214 V262 M${NX[2]},214 V262 M${NX[2] + 16},214 V262`, { 'stroke-width': 3 })],
  [W(vS, `M${NX[3] - 64},170 H${NX[3] + 64} V230 H${NX[3] - 64} Z`, { fill: '#fff' }), W(vS, `M${NX[3] - 64},190 A10,10 0 0 1 ${NX[3] - 64},210`, { 'stroke-width': 3 }),
    W(vS, [0, 1, 2, 3, 4].map(i => `M${NX[3] - 48 + i * 24},170 V156 M${NX[3] - 48 + i * 24},230 V244`).join(' '), { 'stroke-width': 3 })],
  chipG(NX[4], 46, 1), chipG(NX[5], 46, 2)];
const DOT = NX.map(x => mk(vS, 'circle', { cx: x, cy: 300, r: 12, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 4 }));
$('#vNodes').innerHTML = ITEMS.map(([y, n, p], i) => `<div class="nd" style="left:${NX[i] - 120}px;top:330px"><div class="y">${y}</div><div class="nm">${n}</div><div class="pp">${p}</div></div>`).join('');
const ND = [...$('#vNodes').children];
const tNd = [wt('V2', 'nineteen'), wt('V3', 'nineteen'), wt('V5', 'nineteen'), wt('V6', 'nineteen'), wt('V7', 'nineteen'), wt('V8', 'Later')];
$('#vArr').innerHTML = M.icon('arrowR', 30, AM, 2.6);

/* ================= S: scope ================= */
const ICS = {
  comm: ['M4.9 19.1C1 15.2 1 8.8 4.9 4.9', 'M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5', 'M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5', 'M19.1 4.9C23 8.8 23 15.1 19.1 19', 'M12 12h.01'],
  tv: ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z', 'm17 2-5 5-5-5'],
  radar: ['M19.07 4.93A10 10 0 0 0 6.99 3.34', 'M4 6h.01', 'M2.29 9.62A10 10 0 1 0 21.31 8.35', 'M16.24 7.76A6 6 0 1 0 8.23 16.67', 'M12 18h.01', 'M17.99 11.66A6 6 0 0 1 15.77 16.67', 'M12 12h.01', 'm13.41 10.59 5.66-5.66'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z', 'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27']
};
const SC5 = [['Communication', 'phones and the internet', ICS.comm], ['Entertainment', 'television and music', ICS.tv], ['Defence', 'radar', ICS.radar], ['Industry', 'robots and automatic machines', 'gear'], ['Medicine', 'heart monitors and scanners', ICS.heart]];
$('#sTiles').innerHTML = SC5.map(([n, e], i) => `<div class="card sT" style="left:${160 + i * 326.5}px"><div class="ic"></div><div class="nm">${n}</div><div class="ex">${e}</div></div>`).join('');
const sT = [...$('#sTiles').children];
const tSc = [wt('S2', 'Communication'), wt('S2', 'Entertainment'), wt('S3', 'Defence'), wt('S3', 'Industry'), wt('S4', 'medicine')];
const avS = PUC.avatar($('#sS'), { x: 160, y: 776, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Medicine too? That is my dream!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Electrons flow the same way as current', right: 'Electrons move opposite to current I', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcW = [W(tcS, 'M110,160 V100 H670 V135'), W(tcS, 'M670,215 V250 H110 V190'),
  W(tcS, 'M80,160 H140', { 'stroke-width': 5 }), W(tcS, 'M95,190 H125', { 'stroke-width': 9 }),
  W(tcS, 'M670,135 L650,145 L690,160 L650,175 L690,190 L650,205 L670,215')];
const tcL = [tx(tcS, 54, 158, '+', { 'font-size': 26 }), tx(tcS, 58, 214, '-', { 'font-size': 28 }), tx(tcS, 706, 184, 'R', { 'font-style': 'italic', 'font-size': 28 })];
const tcI = PUC.arrow(tcS, VI), tcIL = tx(tcS, 474, 80, 'I  (conventional, + to -)', { fill: VI, 'font-size': 22 });
const tcE = flow(tcS, [[110, 190], [110, 250], [670, 250], [670, 215], [670, 135], [670, 100], [110, 100], [110, 160]], 18, { r: 6, skip: (x, y) => x > 640 && y > 130 && y < 220 });
const tcEL = tx(tcS, 300, 232, 'electrons, - to +', { fill: '#B7791F', 'font-size': 22 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers: define electronics, name an invention and its year, count electrons with n = It/e' });
// the type line is long: keep it inside the card
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A current of 3.2&nbsp;mA flows through a small lamp for 5&nbsp;s. How many electrons pass through it?', qW: 780,
  opts: [K('2.0 \\times 10^{16}'), K('1.0 \\times 10^{17}'), K('1.0 \\times 10^{20}'), K('2.56 \\times 10^{-21}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`\\textcolor{${VI}}{I} = 3.2\\times10^{-3}\\,\\text{A}`)], [K(`\\textcolor{${OR}}{Q} = \\textcolor{${VI}}{I}\\,t = 0.016\\,\\text{C}`)],
  [K(`\\textcolor{${AM}}{n} = \\dfrac{0.016}{1.6\\times10^{-19}}`)], [K(`\\textcolor{${AM}}{n} = 1.0\\times10^{17}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'That'), wt('A3', 'Charge'), wt('A4', 'Divide'), wt('A4', 'you')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 92, dy: 110, title: 'Introduction to electronics · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${AM}}{n} = \\dfrac{\\textcolor{${VI}}{I}\\,t}{\\textcolor{${OR}}{e}}`),
    K(`\\textcolor{${VI}}{I} = \\textcolor{${OR}}{Q}/t \\qquad \\textcolor{${OR}}{Q} = \\textcolor{${AM}}{n}\\,\\textcolor{${OR}}{e} \\qquad \\textcolor{${OR}}{e} = 1.6\\times10^{-19}\\,\\text{C}`),
    'Electrons drift from minus to plus, opposite to <i>I</i>',
    'Diode 1904 · Transistor 1947 · IC 1958 · Microprocessor 1971'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 02', topic: 'Vacuum tubes and semiconductor devices', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tE6 = wt('E6', 'transistor'), tE7 = T0('E7'), tV4 = T0('V4'), tV5 = T0('V5');
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tE6, 1.1, 640, 560], [tE7 + 0.4, 1, 960, 540], [tV4, 1.1, 520, 500], [tV5, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const scn = (id, a, b) => { const on = t => t >= a - 0.05 && t < b; return on; };

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gOn = (t >= tB + 0.5 && t < tT) || (t >= tW && t < tV);
  M.vis(ghost, t, t < tW ? tB + 0.5 : tW + 0.2, t < tW ? tT - 0.4 : tV - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tD + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tD - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(phP, t, tMorph + 0.7, 0.5, 0.15); M.vis(phScr, t, tMorph + 1.1, 1e9, { dy: 0, fade: 0.25 }); drawSeq(phIn, t, tMorph + 1.25, 0.3, 0.1);
    M.vis($('#aPill'), t, wt('H1', 'filled') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, wt('H1', 'computer') - 0.1, out, { dx: 60, dy: 0, ...o });
    const cnt = 17468 * M.o3((t - tEn) / 1.8);
    M.setT($('#thN'), Math.round(cnt).toLocaleString('en-IN'));
    const nT = Math.ceil(60 * cnt / 17468); TUBES.forEach((g, i) => M.hide(g, i >= nT));
    fadeAt([$('#thN'), $('#thL')], t, tEn - 0.1);
    M.vis($('#thW'), t, wt('I2', 'twenty') - 0.1, 1e9, { dy: 12 }); M.vis($('#thW2'), t, wt('I2', 'twenty'), 1e9, { dy: 12 });
    M.vis($('#nwC'), t, tNow - 0.1, out, { dy: 36, ...o });
    drawSeq(chipP, t, wt('I3', 'chip') - 0.3, 0.3, 0.025);
    M.rise($('#nwT'), t, tNow + 0.1); M.vis($('#nwB'), t, wt('I3', 'billions') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#nwB2'), t, wt('I3', 'billions') + 0.1, 1e9, { dy: 10 });
  }

  /* D: definition */
  const dOn = t >= tD - 0.05 && t < tB + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tB - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.rise($('#dq'), t, wt('D2', 'Electronics') - 0.05, { st: 0.045 });
    [0, 1, 2].forEach(i => {
      const p = $('#dp' + i), lit = M.io((t - tMed[i]) / 0.25);
      M.vis(p, t, wt('D3', 'Those') - 0.1 + i * 0.08, 1e9, { dy: 14 });
      p.style.background = M.mix(C.soft, AM, lit); p.style.color = M.mix(INK, '#FFFFFF', lit);
      const tl2 = dTiles[i]; M.vis(tl2, t, tD + 0.5 + i * 0.12, 1e9, { dy: 20 });
      tl2.style.background = M.mix(C.soft, '#FFFFFF', lit); tl2.style.borderColor = M.mix(C.soft, AM, lit);
      tl2.querySelector('.tn').style.color = M.mix(C.ink2, INK, lit);
      dFlows[i].forEach((f, k) => f.set(60 * Math.max(0, t - tMed[i]) + k * 23, t >= tMed[i] - 0.2));
    });
    M.vis($('#dStrip'), t, wt('D4', 'Electronics') - 0.1, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    const c1 = t < tC2 + 0.3, c1out = tC2 - 0.3;
    // circuit 1
    M.vis($('#ckL1'), t, tB + 0.3, c1out, { dy: 10, outDur: 0.25 }); M.hide(g1, !c1);
    if (c1) {
      g1.style.opacity = (1 - M.io((t - c1out) / 0.3)).toFixed(3);
      drawSeq(c1w, t, tC1 + 0.2, 0.45, 0.2); drawSeq(bat1, t, tC1 + 0.4, 0.25, 0.1);
      [swPiv, swEnd, bulbC].forEach((e, i) => M.vis(e, t, tC1 + 0.6 + i * 0.1, 1e9, { dy: 0, fade: 0.2 })); drawSeq(bulbX, t, tC1 + 0.9, 0.25, 0.08);
      fadeAt(lb1, t, wt('E2', 'battery') - 0.2, 0.06);
      const s1 = M.spring(t - tClose, M.SNAP), s2 = M.spring(t - tOpen, M.SNAP), ang = -32 * (1 - s1) - 32 * s2 * (t >= tOpen ? 1 : 0);
      PUC.attr(swLev, 'transform', `rotate(${(t < tClose ? -32 : ang).toFixed(2)} 400 150)`); M.vis(swLev, t, tC1 + 0.7, 1e9, { dy: 0, fade: 0.2 });
      const lit = M.io((t - tClose) / 0.15) * (1 - M.io((t - tOpen) / 0.15));
      PUC.attr(bulbC, 'fill', M.mix('#FFFFFF', AM, lit));
      e1.set(-150 * onT(t) + 0, t >= tB + 1.0 && t < c1out + 0.3);
      trI(τ => closed(τ) ? 120 : 0, t, tB + 0.6, 6, 168, t >= tB + 0.6);
      M.setT($('#r1I'), closed(t) ? '0.30' : '0.00'); M.setT($('#r1B'), closed(t) ? 'ON' : 'OFF'); $('#r1B').style.color = closed(t) ? '#B7791F' : MU;
    } else { trI(() => 0, t, 0, 6, 168, false); e1.set(0, false); }
    sL1.forEach(e => M.vis(e, t, tB + 0.6, c1out, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }));
    M.vis($('#ro1'), t, tB + 0.6, c1out, { dy: 12, outDur: 0.25, ody: -8 });
    // circuit 2
    const c2 = t >= tC2 - 0.05; M.hide(g2, !c2);
    M.vis($('#ckL2'), t, tC2 + 0.05, 1e9, { dy: 10 });
    if (c2) {
      drawSeq(c2w, t, tC2 + 0.1, 0.4, 0.14); drawSeq(mic, t, tC2 + 0.2, 0.35, 0.15);
      M.vis(trC, t, wt('E5', 'transistor') - 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq(trP, t, wt('E5', 'transistor') - 0.1, 0.3, 0.1); M.vis(trA, t, wt('E5', 'transistor') + 0.25, 1e9, { dy: 0, fade: 0.15 });
      drawSeq(spk, t, wt('E6', 'speaker') - 0.4, 0.3, 0.1); drawSeq(bat2, t, wt('E6', 'bigger') - 0.2, 0.25, 0.1);
      fadeAt(lb2.slice(1, 3), t, wt('E5', 'microphone') - 0.1); fadeAt(lb2.slice(3, 4), t, wt('E5', 'transistor')); fadeAt(lb2.slice(4), t, wt('E6', 'speaker') - 0.2, 0.08);
      const s = sig(t), lit = M.io((t - tSig) / 0.3);
      PUC.attr(trC, 'fill', M.mix('#FFFFFF', C.ac2, lit));
      PUC.attr(spk[0], 'fill', M.mix('#FFFFFF', AM, lit * (0.45 + 0.4 * (s + 1) / 2)));
      e2in.set(30 * Math.max(0, t - tSig) + 18 * (1 - Math.cos(OMG * Math.max(0, t - tSig))) / OMG, t >= tSig);
      e2out.set(outOff(t), t >= wt('E6', 'bigger') - 0.3);
      trIn(τ => 18 * sig(τ), t, tSig, 6, 58, t >= tSig); trOut(τ => 42 * sig(τ), t, tSig, 6, 128, t >= tSig);
      M.setT($('#r2i'), (s >= 0 ? '+' : '') + (10 * s).toFixed(1)); M.setT($('#r2o'), (s >= 0 ? '+' : '') + (1 * s).toFixed(2));
    } else { trIn(() => 0, t, 0, 6, 0, false); trOut(() => 0, t, 0, 6, 0, false); e2in.set(0, false); e2out.set(0, false); }
    sL2.forEach(e => M.vis(e, t, tSig, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro2'), t, tSig + 0.1, 1e9, { dy: 12 });
    M.vis($('#slowT'), t, tE7, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avB(t, wt('E8', 'small') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tN; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tN - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Electronic') - 0.05, { out: tN - 0.35, outDur: 0.25 }); }

  /* N: counting electrons + worked example */
  const nOn = t >= tN - 0.05 && t < tV + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tV - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, tN + 0.25, out, { dx: 60, dy: 0, ...o });
    eN.forEach((f, k) => f.set(70 * (t - tN) + k * 38, true));
    const ia = M.io((t - wt('N2', 'Current') + 0.1) / 0.4); iArr.set(520, 64, 520 + 170 * ia, 64); iLab.style.opacity = ia;
    M.draw(gate, t, wt('N2', 'passes') - 0.1, 0.5); M.vis(gateL, t, wt('N2', 'passes'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(eLeg, t, wt('N3', 'Each') - 0.05, 1e9, { dx: -16, dy: 0 });
    M.vis($('#nRo'), t, tN + 0.6, 1e9, { dy: 16 });
    M.vis($('#nRL1'), t, tN + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#nRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dRows.forEach((r, i) => { M.vis(r, t, tDer[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDer[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDer[i], 0.6); M.vis(r.querySelector('.why'), t, tDer[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#nBox'), t, wt('N5', 'n') + 0.4, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#nUnit'), t, wt('N6', 'Current'), tW - 0.3, { dy: 12, outDur: 0.25 });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWr[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWr[i] - 0.15); });
    M.vis($('#wBox'), t, tWr[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    // live counter: the charger delivers 2 A; t runs 1 s of real time
    if (t >= tWr[0]) {
      M.setT($('#nI'), '2.00'); const el = M.clamp(t - tTick, 0, 1);
      M.setT($('#nT'), t < tTick ? '0.00' : el.toFixed(2)); setH($('#nN'), sci(N_RATE * el));
    } else { M.setT($('#nI'), '?'); M.setT($('#nT'), '?'); setH($('#nN'), '?'); }
    avN(t, wt('W4', 'every') + 0.1, out);
  }

  /* V: development timeline */
  const vOn = t >= tV - 0.05 && t < tS + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vC'), t, tV + 0.1, tS - 0.32, { dy: 36, ...o });
    M.draw(tl, t, tV + 0.5, 1.4, M.o3);
    NX.forEach((x, i) => {
      const a = tNd[i], u = M.io((t - a) / 0.3);
      M.vis(DOT[i], t, tV + 0.6 + i * 0.12, 1e9, { dy: 0, fade: 0.2 });
      PUC.attr(DOT[i], 'fill', M.mix('#FFFFFF', AM, u)); PUC.attr(DOT[i], 'stroke', M.mix('#CBD0DA', INK, u));
      drawSeq(GLY[i], t, a - 0.1, 0.4, 0.1);
      M.vis(ND[i], t, a + 0.1, 1e9, { dy: 16 });
    });
    const bad = [...$('#vBad').children]; bad.forEach((b, i) => M.vis(b, t, wt('V4', ['big', 'hot', 'power'][i]) - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    M.vis($('#vGood'), t, wt('V8', 'Each') - 0.1, 1e9, { dx: -40, dy: 0 });
  }

  /* S: scope of electronics */
  const s2On = t >= tS - 0.05 && t < tX + 0.02; M.hide($('#sS'), !s2On);
  if (s2On) {
    sT.forEach((el, i) => {
      M.vis(el, t, tS + 0.15 + i * 0.1, 1e9, { dy: 36 });
      const u = M.io((t - tSc[i]) / 0.3);
      const ic = el.querySelector('.ic'); ic.style.background = M.mix(C.soft, AM, u);
      PUC.setIco(ic, SC5[i][2], u > 0.5 ? '#FFFFFF' : C.ink2, 52, 2);
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); el.querySelector('.ex').style.color = M.mix('#B8BCC6', MU, u);
    });
    M.vis($('#sStrip'), t, wt('S4', 'We') - 0.1, 1e9, { dy: 30 });
    avS(t, wt('S4', 'scanners') + 0.2, 1e9);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Electrons') - 0.1 });
    drawSeq(tcW, t, tX + 0.5, 0.4, 0.12); fadeAt(tcL, t, tX + 0.9);
    const ia = M.io((t - wt('X3', 'Conventional') + 0.1) / 0.45); tcI.set(250, 72, 250 + 190 * ia, 72); tcIL.style.opacity = ia;
    tcE.set(-80 * Math.max(0, t - wt('X3', 'Electrons')), t >= wt('X3', 'Electrons') - 0.2); M.vis(tcEL, t, wt('X3', 'Electrons'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Define') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.4, tCount, tAns });
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
