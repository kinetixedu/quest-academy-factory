// PUC Electronics Ep 22 - Measuring voltage, current, resistance and waveforms ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', RED = C.red;
const TEL = M.mix(TE, '#FFFFFF', 0.35); // teal readable on the dark scope screen
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));

/* electrons as dots flowing along a polyline at a given offset (px along the path); positive offset = along the path */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  return { g, L, set(off, on = true, skip = () => false) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* a round meter symbol (circle + letter) */
const meterSym = (p, cx, cy, ch, col) => { const g = mk(p, 'g'); mk(g, 'circle', { cx, cy, r: 34, fill: '#fff', stroke: col, 'stroke-width': 4 });
  const s = tx(g, cx, cy + 11, ch, { 'text-anchor': 'middle', 'font-size': 32, 'font-weight': 700, fill: col }); return g; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'He') - 0.2;
const tI = T0('I1'), tB = T0('V1'), tS = T0('S1'), tW = T0('W1'), tD = T0('D1'), tXw = T0('X1'), tX = T0('T1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tS, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const lpS = $('#lpS');
const lpP = [W(lpS, 'M40,62 H150 V138 H40 Z', { fill: '#fff' }), W(lpS, 'M80,138 V176 M60,176 H100')];
const lens = mk(lpS, 'circle', { cx: 160, cy: 100, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const beams = [70, 100, 130].map(y => W(lpS, `M222,${y + (y - 100) * 0.1} L268,${y + (y - 100) * 0.5}`, { stroke: '#E9CF8F', 'stroke-width': 5, 'stroke-dasharray': '8 10' }));
const mS = $('#mS');
const mP = [W(mS, 'M34,12 H156 A14,14 0 0 1 170,26 V184 A14,14 0 0 1 156,198 H34 A14,14 0 0 1 20,184 V26 A14,14 0 0 1 34,12 Z', { fill: '#fff' })];
const mLcd = mk(mS, 'rect', { x: 40, y: 32, width: 110, height: 50, rx: 6, fill: '#E4E9DF', stroke: INK, 'stroke-width': 2.5 });
const mDial = [W(mS, 'M95,108 m-32,0 a32,32 0 1 0 64,0 a32,32 0 1 0 -64,0', { 'stroke-width': 3 }), W(mS, 'M95,108 L95,82', { 'stroke-width': 5 })];
const mLeads = [W(mS, 'M170,64 C236,64 226,40 268,40', { stroke: RED, 'stroke-width': 4 }), W(mS, 'M268,40 H306', { stroke: RED, 'stroke-width': 11 }), W(mS, 'M306,40 H324', { stroke: INK, 'stroke-width': 3 }),
  W(mS, 'M170,150 C236,150 226,172 268,172', { 'stroke-width': 4 }), W(mS, 'M268,172 H306', { 'stroke-width': 11 }), W(mS, 'M306,172 H324', { stroke: INK, 'stroke-width': 3 })];
const mLb = [mono(mS, 72, 172, 'V A Ω', { 'font-size': 15 })];
const tDim = wt('H1', 'dim');

/* ================= I: what we measure ================= */
const WAVE = `<svg width="72" height="48" viewBox="0 0 72 48"><path d="M4,24 C14,0 22,0 28,24 S44,48 52,24 S64,4 68,14" fill="none" stroke="#16213E" stroke-width="5" stroke-linecap="round"/></svg>`;
const Q4 = [['V', TE, 'Voltage', 'Voltmeter', 'across'], ['I', VI, 'Current', 'Ammeter', 'in series'], ['R', INK, 'Resistance', 'Ohmmeter', 'power off'], [WAVE, AM, 'Waveform', 'Oscilloscope', 'whole wave']];
$('#qTiles').innerHTML = Q4.map(([s, c, n, m, h], i) => `<div class="card qT" style="left:${160 + i * 408}px"><div class="ic" style="color:${c}">${s}</div><div class="nm">${n}</div><div class="mt">${m}</div><div style="position:absolute;left:0;top:318px;width:376px;display:flex;justify-content:center"><div class="pillp hw" style="position:relative">${h}</div></div></div>`).join('');
const qT = [...$('#qTiles').children];
const tQt = [wt('I1', 'Voltage'), wt('I1', 'current'), wt('I1', 'resistance'), wt('I3', 'oscilloscope')];
$('#qZ').innerHTML = M.icon('zap', 34, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bat = [W(ck, 'M115,282 H185', { 'stroke-width': 5 }), W(ck, 'M132,318 H168', { 'stroke-width': 9 })];
const wTop = [W(ck, 'M150,282 V150 H236'), W(ck, 'M324,150 H380'), W(ck, 'M520,150 H680 V256')];
const wA = W(ck, 'M680,344 V450 H596'), wGap = W(ck, 'M596,450 H524'), wB = W(ck, 'M524,450 H150 V318');
const swPiv = mk(ck, 'circle', { cx: 240, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), swEnd = mk(ck, 'circle', { cx: 320, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const swLev = W(ck, 'M240,150 H316', { 'stroke-width': 5 });
const rG = mk(ck, 'g');
const rZ = W(rG, 'M380,150 L392,130 L410,170 L428,130 L446,170 L464,130 L482,170 L500,130 L508,150 H520');
const rLb = [tx(rG, 450, 108, 'Resistor', { 'text-anchor': 'middle' }), mono(rG, 450, 204, '5 Ω', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 })];
const lampC = mk(ck, 'circle', { cx: 680, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const lampX = [W(ck, 'M649,269 L711,331'), W(ck, 'M711,269 L649,331')];
const lb = [tx(ck, 64, 278, '+', { 'font-size': 28 }), tx(ck, 68, 336, '-', { 'font-size': 30 }), tx(ck, 202, 296, 'Battery'), mono(ck, 202, 324, '6 V', { fill: TE, 'font-weight': 600 }),
  tx(ck, 250, 124, 'Switch'), tx(ck, 620, 308, 'Lamp', { 'text-anchor': 'end' })];
// electrons leave the minus plate (bottom), go round and enter the plus plate
const eB = flow(ck, [[150, 318], [150, 450], [680, 450], [680, 150], [150, 150], [150, 282]], 28);
// voltmeter across the lamp
const vLd = [W(ck, 'M680,200 H840 V266', { stroke: RED, 'stroke-width': 3.5 }), W(ck, 'M840,334 V400 H680', { 'stroke-width': 3.5 })];
const vJ = [mk(ck, 'circle', { cx: 680, cy: 200, r: 6, fill: INK }), mk(ck, 'circle', { cx: 680, cy: 400, r: 6, fill: INK })];
const vM = meterSym(ck, 840, 300, 'V', TE);
const vPm = [tx(ck, 878, 252, '+', { fill: RED, 'font-size': 26 }), tx(ck, 880, 362, '-', { 'font-size': 28 })];
// ammeter in the bottom wire
const aM = meterSym(ck, 560, 450, 'A', VI);
// ohmmeter on the lifted resistor
const oLd = [W(ck, 'M380,290 V396 H416', { stroke: RED, 'stroke-width': 3.5 }), W(ck, 'M520,290 V396 H484', { 'stroke-width': 3.5 })];
const oM = meterSym(ck, 450, 396, 'Ω', INK);
// meter: dial
const dS = $('#dialS'), DX = 532, DY = 150;
mk(dS, 'circle', { cx: DX, cy: DY, r: 64, fill: C.soft, stroke: INK, 'stroke-width': 3 });
const DL = [['V', -50, TE], ['A', 0, VI], ['Ω', 50, INK], ['OFF', 180, MU]].map(([s, a, c]) => { const r = a === 180 ? 88 : 90, x = DX + r * Math.sin(a * Math.PI / 180), y = DY - r * Math.cos(a * Math.PI / 180) + 9;
  return tx(dS, x, y, s, { 'text-anchor': 'middle', 'font-size': a === 180 ? 16 : 26, 'font-family': a === 180 ? 'IBM Plex Mono' : 'Poppins', fill: c }); });
const dPt = W(dS, `M${DX},${DY} L${DX},${DY - 52}`, { 'stroke-width': 7 }); mk(dS, 'circle', { cx: DX, cy: DY, r: 10, fill: INK });
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>lamp</sub></span><span class="v" id="rV" style="color:${TE}">?</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">?</span><span class="u">A</span>
  <span class="k">R</span><span class="v" id="rR">?</span><span class="u">Ω</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 772, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So a meter must not change what it measures!' });
const tOn1 = tB + 1.4, tOff1 = wt('C2', 'Switch'), tBreak = wt('C2', 'break'), tAmIn = wt('C2', 'ammeter'), tOn2 = wt('C3', 'Switch'), tOff2 = wt('R2', 'switch');
const tVm = wt('V2', 'voltmeter'), tRed = wt('V3', 'Red'), tBlk = wt('V3', 'black'), tVr = wt('V3', 'reads');
const tAmm = wt('C1', 'ammeter'), tIr = wt('C3', 'reads'), tOhm = wt('R1', 'ohmmeter'), tLift = wt('R2', 'lift'), tMeas = wt('R2', 'measure'), tFive = wt('R2', 'Five'), tLive = T0('R3');
const closed = τ => (τ >= tOn1 && τ < tOff1) || (τ >= tOn2 && τ < tOff2);
const onTime = t => Math.max(0, Math.min(t, tOff1) - tOn1) + Math.max(0, Math.min(t, tOff2) - tOn2);

/* ================= W: oscilloscope ================= */
const sk = $('#skS'), SWD = 560, SHT = 448, DV = 56;
mk(sk, 'rect', { x: 0, y: 0, width: SWD, height: SHT, rx: 8, fill: '#16213E' });
for (let i = 1; i < 10; i++) mk(sk, 'line', { x1: i * DV, y1: 0, x2: i * DV, y2: SHT, stroke: '#2A3758', 'stroke-width': i === 5 ? 2.5 : 1.5 });
for (let j = 1; j < 8; j++) mk(sk, 'line', { x1: 0, y1: j * DV, x2: SWD, y2: j * DV, stroke: '#2A3758', 'stroke-width': j === 4 ? 2.5 : 1.5 });
for (let i = 1; i < 50; i++) if (i % 5) { mk(sk, 'line', { x1: i * DV / 5, y1: 4 * DV - 5, x2: i * DV / 5, y2: 4 * DV + 5, stroke: '#3A4A70', 'stroke-width': 1.5 }); }
for (let j = 1; j < 40; j++) if (j % 5) { mk(sk, 'line', { x1: 5 * DV - 5, y1: j * DV / 5, x2: 5 * DV + 5, y2: j * DV / 5, stroke: '#3A4A70', 'stroke-width': 1.5 }); }
const trace = mk(sk, 'path', { d: '', fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const chL = mono(sk, 12, 24, 'CH1', { fill: CH1, 'font-size': 17 });
// measuring guides: amplitude (teal), one period (paper white)
const gTop = mk(sk, 'line', { x1: 8, y1: 112, x2: 552, y2: 112, stroke: TEL, 'stroke-width': 2, 'stroke-dasharray': '8 8' });
const gBot = mk(sk, 'line', { x1: 8, y1: 336, x2: 552, y2: 336, stroke: TEL, 'stroke-width': 2, 'stroke-dasharray': '8 8' });
const vBr = PUC.arrow(sk, TEL, 4, 14), vBr2 = PUC.arrow(sk, TEL, 4, 14);
const vBrL = mono(sk, 486, 232, '4 div', { stroke: '#16213E', 'stroke-width': 7, 'paint-order': 'stroke', fill: TEL, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const hBr = PUC.arrow(sk, '#E9E5DA', 4, 14), hBr2 = PUC.arrow(sk, '#E9E5DA', 4, 14);
const hBrL = mono(sk, 336, 404, '4 div = one cycle', { stroke: '#16213E', 'stroke-width': 7, 'paint-order': 'stroke', fill: '#E9E5DA', 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const hTk = [mk(sk, 'line', { x1: 224, y1: 380, x2: 224, y2: 432, stroke: '#E9E5DA', 'stroke-width': 3 }), mk(sk, 'line', { x1: 448, y1: 380, x2: 448, y2: 432, stroke: '#E9E5DA', 'stroke-width': 3 })];
// scope knobs
const kn = $('#knS');
const knob = (cx, cy) => { const ring = mk(kn, 'circle', { cx, cy, r: 60, fill: 'none', stroke: AM, 'stroke-width': 6 }); mk(kn, 'circle', { cx, cy, r: 50, fill: '#fff', stroke: INK, 'stroke-width': 4 });
  for (let i = 0; i < 9; i++) { const a = (-120 + i * 30) * Math.PI / 180; mk(kn, 'line', { x1: cx + 56 * Math.sin(a), y1: cy - 56 * Math.cos(a), x2: cx + 64 * Math.sin(a), y2: cy - 64 * Math.cos(a), stroke: '#B8BCC6', 'stroke-width': 2.5 }); }
  const p = W(kn, `M${cx},${cy} L${cx},${cy - 38}`, { 'stroke-width': 6 }); return { ring, p }; };
const kA = knob(760, 190), kB = knob(760, 430);
PUC.attr(kA.p, 'transform', 'rotate(30 760 190)'); PUC.attr(kB.p, 'transform', 'rotate(-30 760 430)');
// signal generator
const gS = $('#gS');
const gBox = [W(gS, 'M44,76 H596 V316 H44 Z', { fill: '#fff' })];
const gSrc = [mk(gS, 'circle', { cx: 134, cy: 186, r: 52, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(gS, 'M104,186 C114,156 124,156 134,186 S154,216 164,186')];
const gKn = [300, 470].map(cx => { mk(gS, 'circle', { cx, cy: 186, r: 46, fill: C.soft, stroke: INK, 'stroke-width': 4 }); return W(gS, `M${cx},186 L${cx},152`, { 'stroke-width': 6 }); });
const gLb = [mono(gS, 300, 270, 'AMPLITUDE', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 }), mono(gS, 470, 270, 'FREQUENCY', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 }),
  mono(gS, 580, 108, 'OUT → CH1', { 'text-anchor': 'end', 'font-size': 17, 'font-weight': 600, fill: '#5F7399' })];
const gEls = [...gBox, ...gSrc, ...gS.querySelectorAll('circle'), ...gKn, ...gLb];
$('#gRo').innerHTML = `<span class="k" style="color:${TE}">V<sub>pp</sub></span><span class="v" id="gV" style="color:${TE}">4.0</span><span class="u">V</span>
  <span class="k">f</span><span class="v" id="gF">50</span><span class="u">Hz</span>
  <span class="k">T</span><span class="v" id="gT">20</span><span class="u">ms</span>`;
const avW = PUC.avatar($('#sW'), { x: 192, y: 770, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Faster wave, shorter period!' });
const tDraw = wt('W1', 'draws'), tAmp = wt('W4', 'Turn'), tFrq = wt('W5', 'Turn');
const ampDiv = t => 2 + 2 * M.io((t - tAmp) / 1.4);
const perDiv = t => 4 - 2 * M.io((t - tFrq) / 1.4) + 2 * M.io((t - tD - 0.2) / 1.0);
// derivation + worked example (left card)
const DST = [
  K(`\\textcolor{${TE}}{V_{pp}} = \\text{boxes} \\times \\dfrac{\\text{volts}}{\\text{div}}`),
  K(`\\textcolor{${TE}}{V_m} = \\dfrac{\\textcolor{${TE}}{V_{pp}}}{2}`),
  K(`\\textcolor{${TE}}{V_{rms}} = \\dfrac{\\textcolor{${TE}}{V_m}}{\\sqrt{2}}`),
  K(`T = \\text{boxes} \\times \\dfrac{\\text{time}}{\\text{div}}`),
  K(`f = \\dfrac{1}{T}`)];
$('#dSteps').innerHTML = DST.map((s, i) => `<div class="st2" style="top:${76 + i * 90}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const XST = [
  K(`\\textcolor{${TE}}{V_{pp}} = 4 \\times 2 = 8\\,\\text{V} \\quad \\textcolor{${TE}}{V_m} = 4\\,\\text{V}`),
  K(`\\textcolor{${TE}}{V_{rms}} = 4/\\sqrt{2} \\approx 2.83\\,\\text{V}`),
  K(`T = 4 \\times 5 = 20\\,\\text{ms}`),
  K(`f = \\dfrac{1}{0.02\\,\\text{s}} = 50\\,\\text{Hz}`)];
$('#xSteps').innerHTML = `<div class="gv" style="position:absolute;left:36px;top:80px;font:500 24px 'IBM Plex Mono';color:${C.ink2};white-space:nowrap">HEIGHT  4 div × <span style="color:#B7791F">2 V/div</span></div><div class="gv" style="position:absolute;left:36px;top:120px;font:500 24px 'IBM Plex Mono';color:${C.ink2};white-space:nowrap">CYCLE   4 div × <span style="color:#B7791F">5 ms/div</span></div>` +
  XST.map((s, i) => `<div class="st2" style="top:${[184, 266, 348, 452][i]}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const dR = [...$('#dSteps').children], xR = [...$('#xSteps').querySelectorAll('.st2')], xG = [...$('#xSteps').querySelectorAll('.gv')];
const tDs = [wt('D2', 'Count'), wt('D3', 'Half'), wt('D4', 'For'), wt('D5', 'Now'), wt('D6', 'And')];
const tXs = [wt('X3', 'Peak'), wt('X4', 'The'), wt('X5', 'The'), wt('X5', 'So')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Ammeter across a part, like a voltmeter', right: 'Ammeter in series, voltmeter across', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcW = [W(tcS, 'M110,160 V100 H560 V139'), W(tcS, 'M560,211 V250 H110 V190'), W(tcS, 'M80,160 H140', { 'stroke-width': 5 }), W(tcS, 'M95,190 H125', { 'stroke-width': 9 }),
  W(tcS, 'M560,120 H690 V141', { stroke: VI }), W(tcS, 'M690,209 V230 H560', { stroke: VI })];
const tcLamp = mk(tcS, 'circle', { cx: 560, cy: 175, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const tcLx = [W(tcS, 'M535,150 L585,200'), W(tcS, 'M585,150 L535,200')];
const tcA = mk(tcS, 'g'); mk(tcA, 'circle', { cx: 690, cy: 175, r: 32, fill: '#fff', stroke: VI, 'stroke-width': 4 }); tx(tcA, 690, 186, 'A', { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 700, fill: VI });
const tcL = [tx(tcS, 54, 158, '+', { 'font-size': 26 }), tx(tcS, 58, 214, '-', { 'font-size': 28 }), tx(tcS, 470, 182, 'Lamp', { 'text-anchor': 'end', 'font-size': 22 })];
const tcE = flow(tcS, [[110, 190], [110, 250], [560, 250], [560, 230], [690, 230], [690, 120], [560, 120], [560, 100], [110, 100], [110, 160]], 22, { r: 6 });
const tcEL = tx(tcS, 330, 232, 'huge current, lamp dark', { fill: RED, 'font-size': 22, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers and problems: how to connect each meter; read V<sub>pp</sub>, V<sub>rms</sub> and f from an oscilloscope screen' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A sine wave on an oscilloscope is 5&nbsp;divisions peak to peak at 0.5&nbsp;V/div. One cycle is 8&nbsp;divisions wide at 0.1&nbsp;ms/div. Find the rms voltage and the frequency.', qW: 790,
  opts: [K('0.88\\,\\text{V},\\; 1.25\\,\\text{kHz}'), K('1.77\\,\\text{V},\\; 1.25\\,\\text{kHz}'), K('1.25\\,\\text{V},\\; 1.25\\,\\text{kHz}'), K('0.88\\,\\text{V},\\; 125\\,\\text{Hz}')], right: 0, optW: 474, optY: 350 });
const sol = PUC.solution($('#so'), [[K(`\\textcolor{${TE}}{V_{pp}} = 5 \\times 0.5 = 2.5\\,\\text{V}`)], [K(`\\textcolor{${TE}}{V_m} = 1.25\\,\\text{V}`)],
  [K(`\\textcolor{${TE}}{V_{rms}} = \\dfrac{1.25}{\\sqrt{2}} \\approx 0.88\\,\\text{V}`)], [K(`T = 8 \\times 0.1 = 0.8\\,\\text{ms}`)], [K(`f = \\dfrac{1}{T} = 1250\\,\\text{Hz}`)]], { dy: 98, y0: 92 });
const tSol = [wt('A2', 'Peak'), wt('A2', 'So'), wt('A3', 'Divide'), wt('A4', 'period'), wt('A4', 'One')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 360, y: 248, w: 1200, h: 500, y0: 92, dy: 104, title: 'Measuring instruments · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${TE}}{V_{pp}} = \\text{boxes}\\times\\text{V/div} \\qquad \\textcolor{${TE}}{V_{rms}} = \\textcolor{${TE}}{V_{pp}}/(2\\sqrt{2})`),
    K(`T = \\text{boxes}\\times\\text{time/div} \\qquad f = 1/T`),
    'Voltmeter across · Ammeter in series · Ohmmeter with the power off',
    'Good voltmeter: very high <i>R</i> · Good ammeter: very low <i>R</i>'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 23', topic: 'Instrument symbols, controls, ranges and precautions', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tAmIn - 0.3, 1.12, 720, 620], [wt('C4', 'A'), 1, 960, 540], [tXs[3] - 0.2, 1.1, 560, 620], [tX - 1.0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gOn = (t >= tB + 0.5 && t < tS) || (t >= tW + 0.5 && t < tX);
  M.vis(ghost, t, t < tS ? tB + 0.5 : tW + 0.5, t < tS ? tS - 0.4 : tX - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tDim, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#lpC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    drawSeq(lpP, t, tMorph + 0.6, 0.4, 0.15); M.vis(lens, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(lens, 'fill', M.mix('#FFFFFF', AM, 0.18 + 0.12 * (0.5 + 0.5 * Math.sin(9 * t)) * M.clamp((t - tDim) / 0.3)));
    drawSeq(beams, t, tDim, 0.3, 0.1);
    [0, 1, 2].forEach(i => M.vis($('#lp' + i), t, tDim + 0.4 + i * 0.25, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    M.vis($('#mtC'), t, wt('H1', 'picks') - 0.2, out, { dy: 36, ...o });
    drawSeq(mP, t, wt('H1', 'picks'), 0.4); M.vis(mLcd, t, wt('H1', 'picks') + 0.3, 1e9, { dy: 0, fade: 0.2 }); drawSeq(mDial, t, wt('H1', 'picks') + 0.35, 0.3, 0.1);
    drawSeq(mLeads, t, wt('H1', 'two'), 0.3, 0.08); fadeAt(mLb, t, wt('H1', 'picks') + 0.5);
    M.rise($('#mQ'), t, T0('H2'), { st: 0.06 });
  }

  /* I: what we measure */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    qT.forEach((el, i) => {
      M.vis(el, t, tI + 0.15 + i * 0.1, out, { dy: 36, ...o });
      const u = M.io((t - tQt[i]) / 0.3), ic = el.querySelector('.ic');
      ic.style.background = M.mix(C.soft, M.mix(Q4[i][1], '#FFFFFF', 0.82), u);
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); el.querySelector('.mt').style.color = M.mix('#B8BCC6', MU, u);
      const h = el.querySelector('.hw'); M.vis(h, t, i < 3 ? wt('I2', 'different') + i * 0.18 : tQt[3] + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      h.style.background = M.mix(Q4[i][1], '#FFFFFF', 0.86); h.style.color = i === 3 ? '#8A5B0B' : Q4[i][1];
    });
    M.vis($('#qStrip'), t, wt('I2', 'Each') - 0.1, out, { dy: 30, ...o });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tS + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#mt'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB + 1.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(wTop, t, tB + 0.3, 0.4, 0.15); drawSeq(bat, t, wt('V1', 'six') - 0.1, 0.25, 0.1);
    M.draw(wA, t, tB + 0.7, 0.4); M.draw(wB, t, tB + 0.85, 0.4);
    // the gap piece of wire is lifted out when the circuit is broken
    const gp = M.io((t - tBreak) / 0.4); M.draw(wGap, t, tB + 0.8, 0.2); PUC.attr(wGap, 'transform', `translate(0,${(60 * gp).toFixed(1)})`); wGap.style.opacity = (1 - gp).toFixed(3);
    [swPiv, swEnd].forEach((e, i) => M.vis(e, t, tB + 0.5 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(swLev, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const cl = M.spring(t - tOn1, M.SNAP) - M.spring(t - tOff1, M.SNAP) * (t >= tOff1 ? 1 : 0) + M.spring(t - tOn2, M.SNAP) * (t >= tOn2 ? 1 : 0) - M.spring(t - tOff2, M.SNAP) * (t >= tOff2 ? 1 : 0);
    PUC.attr(swLev, 'transform', `rotate(${(-32 * (1 - M.clamp(cl))).toFixed(2)} 240 150)`);
    M.draw(rZ, t, wt('V1', 'resistor') - 0.1, 0.4); fadeAt(rLb, t, wt('V1', 'resistor'));
    const lift = M.spring(t - tLift, M.SOFT) * (t >= tLift ? 1 : 0); PUC.attr(rG, 'transform', `translate(0,${(140 * lift).toFixed(1)})`);
    M.vis(lampC, t, wt('V1', 'lamp') - 0.1, 1e9, { dy: 0, fade: 0.2 }); drawSeq(lampX, t, wt('V1', 'lamp'), 0.25, 0.08);
    fadeAt(lb.slice(0, 4), t, wt('V1', 'battery') - 0.2, 0.06); fadeAt(lb.slice(4, 5), t, tB + 0.8); fadeAt(lb.slice(5), t, wt('V1', 'lamp'));
    const on = closed(t), lit = on ? 1 : 0;
    PUC.attr(lampC, 'fill', M.mix('#FFFFFF', AM, lit * 0.85));
    const gapHide = t >= tBreak;
    eB.set(110 * onTime(t), t >= tB + 1.2, (x, y) => (Math.abs(x - 680) < 2 && y > 252 && y < 348) || (y < 152 && x > 232 && x < 328) || (y < 152 && x > 376 && x < 524) || (gapHide && Math.abs(y - 450) < 2 && x > 520 && x < 600));
    // voltmeter
    const vOut = tOhm - 0.2;
    M.vis(vM, t, tVm, vOut, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1, outDur: 0.3, ody: 0 });
    M.draw(vLd[0], t, tRed, 0.4); M.draw(vLd[1], t, tBlk, 0.4); vJ.forEach((j, i) => M.vis(j, t, [tRed, tBlk][i] + 0.35, 1e9, { dy: 0, fade: 0.1 }));
    fadeAt(vPm, t, tRed + 0.3); const vf = 1 - M.io((t - vOut) / 0.3); [...vLd, ...vJ, ...vPm].forEach(e => { if (vf < 1) e.style.opacity = vf.toFixed(3); M.hide(e, vf <= 0 || e.style.visibility === 'hidden'); });
    // ammeter
    M.vis(aM, t, tAmIn, 1e9, { dy: -30, sc: 0.6, sp: M.POP, fade: 0.1 });
    // ohmmeter
    M.vis(oM, t, tMeas - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.draw(oLd[0], t, tMeas, 0.35); M.draw(oLd[1], t, tMeas + 0.12, 0.35);
    // the meter
    const mode = t < tVm ? 3 : t < tAmm ? 0 : t < tOhm ? 1 : 2;
    const ang = [-50, 0, 50, 180][mode], prev = t < tAmm ? 180 : t < tOhm ? -50 : 0, tm = [tVm, tAmm, tOhm][Math.min(mode, 2)] ?? 0;
    const aNow = mode === 3 ? 180 : M.lerp(prev, ang, M.spring(t - tm, M.SNAP));
    PUC.attr(dPt, 'transform', `rotate(${aNow.toFixed(2)} ${DX} ${DY})`);
    DL.forEach((d, i) => { const k = i === mode ? 1 : 0; PUC.attr(d, 'opacity', (0.35 + 0.65 * k).toFixed(2)); });
    let lv = '----', lu = '';
    if (mode === 0) { lv = t >= tVr ? '4.50' : '0.00'; lu = 'V'; }
    if (mode === 1) { lv = t >= tIr && on ? '0.30' : '0.00'; lu = 'A'; }
    if (mode === 2) { lv = t >= tFive ? '5.0' : 'O.L'; lu = 'Ω'; }
    M.setT($('#lcdV'), lv); M.setT($('#lcdU'), lu);
    const md = $('#mode'); M.setT(md, ['DC VOLTS · ACROSS', 'DC AMPS · IN SERIES', 'OHMS · POWER OFF', 'SELECT A RANGE'][mode]);
    md.style.background = [TE, VI, INK, MU][mode];
    const warn = t >= tLive && t < tS; M.vis(md, t, tB + 0.6, warn ? tLive : 1e9, { dy: 0, fade: 0.2, outDur: 0.15, ody: 0 }); M.vis($('#mWarn'), t, tLive, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    if (!warn) M.hide($('#mWarn'), true);
    // readout
    M.vis($('#ro1'), t, tB + 0.7, 1e9, { dy: 12 });
    M.setT($('#rV'), t >= tVr ? '4.50' : '?');
    M.setT($('#rI'), t >= tIr ? (on ? '0.30' : '0.00') : '?');
    M.setT($('#rR'), t >= tFive ? '5.0' : '?');
    avB(t, wt('C4', 'hardly') - 0.1, tOhm - 0.3);
  }

  /* S: statement */
  const sOn = t >= tS - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tS + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('S1', 'Ohmmeter') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: oscilloscope + derivation + worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.05; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#gk'), t, tW + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sk'), t, tW + 0.25, 1e9, { dx: 60, dy: 0 });
    const gOut = tD - 0.3, dOut = tXw - 0.3;
    M.vis($('#gL1'), t, tW + 0.3, gOut, { dy: 10, outDur: 0.25 }); M.vis($('#gL2'), t, tD + 0.1, dOut, { dy: 10, outDur: 0.25 }); M.vis($('#gL3'), t, tXw + 0.1, 1e9, { dy: 10 });
    const gf = 1 - M.io((t - gOut) / 0.3); gS.style.opacity = gf.toFixed(3); M.hide(gS, gf <= 0);
    drawSeq(gBox, t, tW + 0.4, 0.5); M.vis(gSrc[0], t, tW + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.draw(gSrc[1], t, tW + 0.7, 0.4);
    fadeAt([...gS.querySelectorAll('circle')].slice(1), t, tW + 0.8, 0.1); fadeAt(gKn, t, tW + 0.9, 0.1); fadeAt(gLb, t, tW + 1.0, 0.1);
    const A = ampDiv(t), P = perDiv(t);
    PUC.attr(gKn[0], 'transform', `rotate(${(-60 + 60 * (A - 2)).toFixed(1)} 300 186)`); PUC.attr(gKn[1], 'transform', `rotate(${(-40 + 80 * (4 / P - 1)).toFixed(1)} 470 186)`);
    M.vis($('#gRo'), t, wt('W4', 'readout') - 0.4, gOut, { dy: 12, outDur: 0.25 });
    M.setT($('#gV'), (2 * A).toFixed(1)); M.setT($('#gF'), Math.round(1000 / (5 * P)).toString()); M.setT($('#gT'), (5 * P).toFixed(1));
    avW(t, wt('W5', 'period'), gOut);
    // scope: triggered trace, swept on once, then follows the knobs
    const u = M.clamp((t - tDraw) / 1.2), N = 160; let d = '';
    if (u > 0) { for (let i = 0; i <= N * u; i++) { const x = SWD * i / N, y = 224 - (A * DV / 2) * Math.sin(2 * Math.PI * x / (P * DV)); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } }
    PUC.attr(trace, 'd', d); M.vis(chL, t, tDraw, 1e9, { dy: 0, fade: 0.2 });
    // knobs light when named
    const k1 = M.io((t - wt('W3', 'volts') + 0.1) / 0.25) * (1 - M.io((t - wt('W3', 'time')) / 0.25)) + M.io((t - wt('X1', 'two')) / 0.25) * (1 - M.io((t - tX + 0.5) / 0.25));
    const k2 = M.io((t - wt('W3', 'time') + 0.1) / 0.25) * (1 - M.io((t - T0('W4')) / 0.25)) + M.io((t - wt('X2', 'five')) / 0.25) * (1 - M.io((t - tX + 0.5) / 0.25));
    kA.ring.style.opacity = M.clamp(k1).toFixed(3); kB.ring.style.opacity = M.clamp(k2).toFixed(3);
    $('#kv1').style.color = M.mix(INK, '#B7791F', M.clamp(k1)); $('#kv2').style.color = M.mix(INK, '#B7791F', M.clamp(k2));
    // measuring guides
    const tVg = wt('D2', 'boxes'), tHg = wt('D5', 'boxes');
    M.draw(gTop, t, tVg - 0.2, 0.4); M.draw(gBot, t, tVg, 0.4);
    const va = M.io((t - tVg - 0.3) / 0.4); vBr.set(486, 224, 486, 224 - 108 * va); vBr2.set(486, 224, 486, 224 + 108 * va); M.vis(vBrL, t, tVg + 0.6, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(vBrL, 'x', 430);
    fadeAt(hTk, t, tHg - 0.1, 0.1);
    const ha = M.io((t - tHg) / 0.4); hBr.set(336, 406, 336 - 108 * ha, 406); hBr2.set(336, 406, 336 + 108 * ha, 406); M.vis(hBrL, t, tHg + 0.5, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(hBrL, 'y', 390);
    // derivation rows
    dR.forEach((r, i) => { M.vis(r, t, tDs[i] - 0.1, dOut, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tXw) { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); } });
    M.vis($('#dUnit'), t, wt('D6', 'Voltage') - 0.1, dOut, { dy: 12, outDur: 0.25 });
    xR.forEach((r, i) => { M.hide(r, t < tXs[i] - 0.15); M.vis(r.querySelector('.n'), t, tXs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tXs[i], 0.6); });
    xG.forEach((g, i) => M.vis(g, t, [wt('X1', 'four'), wt('X2', 'One')][i], 1e9, { dx: -16, dy: 0 }));
    M.vis($('#xBox'), t, wt('X5', 'Fifty') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('T4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('T2', 'Many') - 0.05, tStrike: wt('T2', 'Never'), tRight: wt('T3', 'An') });
    drawSeq(tcW, t, tX + 0.5, 0.4, 0.12); M.vis(tcLamp, t, tX + 0.7, 1e9, { dy: 0, fade: 0.2 }); drawSeq(tcLx, t, tX + 0.8, 0.2, 0.06); fadeAt(tcL, t, tX + 0.9);
    M.vis(tcA, t, wt('T2', 'ammeter'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    const tHuge = wt('T3', 'huge');
    tcE.set(260 * Math.max(0, t - tHuge), t >= tHuge - 0.1, (x, y) => (Math.abs(x - 690) < 2 && y > 140 && y < 210));
    M.vis(tcEL, t, tHuge + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#tcT'), t, wt('T3', 'short') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('T4', 'Where') - 0.2, tLight: [wt('T4', 'PUC')], tType: wt('T4', 'How') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.3, tCount, tAns });
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
