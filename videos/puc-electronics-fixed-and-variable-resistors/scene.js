// PUC Electronics Ep 25 - Fixed and variable resistors ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', RED = C.red;
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const zigH = (x0, x1, y, h = 18, n = 6) => { let d = `M${x0},${y}`; const s = (x1 - x0) / (2 * n); for (let i = 0; i < 2 * n; i++) d += ` L${(x0 + s * (i + 0.5)).toFixed(1)},${y + (i % 2 ? h : -h)}`; return d + ` L${x1},${y}`; };
const zigV = (x, y0, y1, h = 16, n = 6) => { let d = `M${x},${y0}`; const s = (y1 - y0) / (2 * n); for (let i = 0; i < 2 * n; i++) d += ` L${x + (i % 2 ? h : -h)},${(y0 + s * (i + 0.5)).toFixed(1)}`; return d + ` L${x},${y1}`; };
/* electrons as dots flowing along a polyline; positive offset = along the path */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  return { g, set(off, on = true, skip = () => false) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
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
const tMorph = wt('H1', 'music') - 0.2;
const tR = T0('R1'), tFx = T0('F1'), tV = T0('V1'), tB = T0('B1'), tS = T0('S1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('C1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tS, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook (the knob) ================= */
const kS = $('#kS'), KX = 250, KY = 290;
const kRing = mk(kS, 'circle', { cx: KX, cy: KY, r: 150, fill: 'none', stroke: '#CBD0DA', 'stroke-width': 3, 'stroke-dasharray': '4 10' });
const kBody = mk(kS, 'circle', { cx: KX, cy: KY, r: 120, fill: C.soft, stroke: INK, 'stroke-width': 4 });
const kTop = mk(kS, 'circle', { cx: KX, cy: KY, r: 88, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 3 });
const kPt = W(kS, `M${KX},${KY - 30} L${KX},${KY - 80}`, { stroke: AM, 'stroke-width': 10 });
const kMin = mono(kS, KX - 150, KY + 160, 'MIN', { 'font-weight': 600 }), kMax = mono(kS, KX + 110, KY + 160, 'MAX', { 'font-weight': 600 });
const bars = [...Array(10)].map((_, i) => mk(kS, 'rect', { x: 470 + i * 26, y: 400 - (30 + i * 22), width: 18, height: 30 + i * 22, rx: 4, fill: C.soft }));
const barL = mono(kS, 470, 440, 'VOLUME', { 'font-weight': 600 });
const tLoud = wt('H1', 'louder');
const kVal = t => 0.15 + 0.75 * M.io((t - tLoud + 0.6) / 2.2);

/* ================= R: what is a resistor ================= */
const rS = $('#rS');
const rBat = [W(rS, 'M95,222 H165', { 'stroke-width': 5 }), W(rS, 'M112,258 H148', { 'stroke-width': 9 })];
const rW = [W(rS, 'M130,222 V110 H300'), W(rS, 'M480,110 H640 V370 H130 V258')];
const rZ = W(rS, zigH(300, 480, 110, 18, 6));
const rLb = [tx(rS, 54, 218, '+', { 'font-size': 26 }), tx(rS, 58, 274, '-', { 'font-size': 28 }), mono(rS, 180, 246, '6 V', { fill: TE, 'font-weight': 600 }), tx(rS, 390, 172, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 30 })];
const eR = flow(rS, [[130, 258], [130, 370], [640, 370], [640, 110], [130, 110], [130, 222]], 22);
$('#rRo').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" style="color:${TE}">6.0</span><span class="u">V</span>
  <span class="k">R</span><span class="v" id="rRv">10</span><span class="u">Ω</span>
  <span class="k" style="color:${VI}">I = V/R</span><span class="v" id="rIv" style="color:${VI}">0.60</span><span class="u">A</span>`;
const tMore = wt('R2', 'More');
const Rnow = t => M.lerp(10, 30, M.io((t - tMore) / 0.8));
const fS = $('#fS');
const fRoot = mk(fS, 'g'); mk(fRoot, 'rect', { x: 262, y: 80, width: 260, height: 64, rx: 14, fill: INK }); tx(fRoot, 392, 122, 'RESISTORS', { 'text-anchor': 'middle', fill: '#fff', 'font-family': 'IBM Plex Mono', 'font-size': 24 });
const fSym = W(fS, 'M220,210 H290 L' + zigH(290, 494, 210, 18, 6).slice(1) + ' H564');
const fSymL = mono(fS, 392, 262, 'unit: ohm, Ω', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });
const fBr = [W(fS, 'M392,278 V286 H206 V300', { 'stroke-width': 3 }), W(fS, 'M392,286 H578 V300', { 'stroke-width': 3 })];
const fm = [$('#fm0'), $('#fm1')];
const tFam = [wt('R3', 'Fixed'), wt('R3', 'variable')];

/* ================= F: fixed types ================= */
const FT = [['Carbon composition', 'Carbon powder mixed with a binder', 'Cheap, not very precise', 'cheap'],
  ['Carbon film', 'Thin carbon layer on a ceramic rod', 'More precise than composition', 'thin film'],
  ['Metal film', 'Thin metal layer on a ceramic rod', 'Most precise and stable of these', 'precise'],
  ['Wire wound', 'Nichrome wire on a ceramic core', 'Handles large power', 'high power']];
$('#fTiles').innerHTML = FT.map(([n, a, b, c], i) => `<div class="card fT" style="left:${160 + i * 408}px"><svg width="376" height="180"></svg><div class="nm">${n}</div>
  <div class="kl" style="top:314px">MADE OF</div><div class="kv" style="top:338px">${a}</div><div class="kl" style="top:416px">KEY POINT</div><div class="kv" style="top:440px">${b}</div><div class="pillp ch">${c}</div></div>`).join('');
const fT = [...$('#fTiles').children], fSv = fT.map(e => e.querySelector('svg'));
const body = (sv, fill) => { W(sv, 'M28,90 H88 M288,90 H348', { 'stroke-width': 4 }); return mk(sv, 'rect', { x: 88, y: 58, width: 200, height: 64, rx: 30, fill, stroke: INK, 'stroke-width': 3 }); };
body(fSv[0], '#5B5B5B'); [[110, 76], [140, 100], [170, 70], [200, 104], [232, 80], [262, 98], [125, 92], [190, 88], [248, 66]].forEach(([x, y]) => mk(fSv[0], 'circle', { cx: x, cy: y, r: 3.5, fill: '#9A9A9A' }));
body(fSv[1], '#E9DCC0'); for (let i = 0; i < 7; i++) W(fSv[1], `M${110 + i * 24},60 L${126 + i * 24},120`, { stroke: '#3A3A3A', 'stroke-width': 4 });
body(fSv[2], '#C9D3E6'); for (let i = 0; i < 7; i++) W(fSv[2], `M${110 + i * 24},60 L${126 + i * 24},120`, { stroke: '#5F7399', 'stroke-width': 4 });
W(fSv[3], 'M28,90 H88 M288,90 H348', { 'stroke-width': 4 }); mk(fSv[3], 'rect', { x: 88, y: 66, width: 200, height: 48, rx: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const coil = W(fSv[3], [...Array(14)].map((_, i) => `M${100 + i * 13.5},60 C${108 + i * 13.5},78 ${108 + i * 13.5},102 ${100 + i * 13.5},120`).join(' '), { stroke: '#8A6A3A', 'stroke-width': 3.5 });
const tFt = [wt('F2', 'Carbon'), wt('F3', 'Carbon'), wt('F3', 'metal'), wt('F4', 'Wire')];

/* ================= V: variable types ================= */
const VT = [['Potentiometer', 'Two ends of a resistive track and a sliding wiper. Divides voltage.', '3 terminals'],
  ['Rheostat', 'One end and the wiper. Changes the current.', '2 terminals'],
  ['Preset (trimmer)', 'Tiny. Set once with a screwdriver, then left alone.', 'set once']];
$('#vTiles').innerHTML = VT.map(([n, d, c], i) => `<div class="card vT" style="left:${160 + i * 544}px"><svg width="512" height="230"></svg><div class="nm">${n}</div><div class="kv">${d}</div><div class="pillp ch">${c}</div></div>`).join('');
const vT = [...$('#vTiles').children], vSv = vT.map(e => e.querySelector('svg'));
const term = (sv, x, y) => mk(sv, 'circle', { cx: x, cy: y, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 });
// potentiometer
W(vSv[0], `M90,110 H150 L${zigH(150, 362, 110, 18, 6).slice(1)} H422`); term(vSv[0], 90, 110); term(vSv[0], 422, 110);
const pW = mk(vSv[0], 'g'); W(pW, 'M256,200 V140', { 'stroke-width': 4 }); mk(pW, 'path', { d: 'M256,132 L246,150 L266,150 Z', fill: INK }); term(pW, 256, 200);
// rheostat (wiper tied to one end)
W(vSv[1], `M90,110 H150 L${zigH(150, 362, 110, 18, 6).slice(1)} H400`); term(vSv[1], 90, 110);
const rhW = mk(vSv[1], 'g'); W(rhW, 'M256,140 V180 H400 V110', { 'stroke-width': 4 }); mk(rhW, 'path', { d: 'M256,132 L246,150 L266,150 Z', fill: INK }); term(vSv[1], 400, 180);
// preset
mk(vSv[2], 'rect', { x: 196, y: 60, width: 120, height: 120, rx: 14, fill: C.soft, stroke: INK, 'stroke-width': 4 }); mk(vSv[2], 'circle', { cx: 256, cy: 120, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const prS = W(vSv[2], 'M232,120 H280', { 'stroke-width': 7 }); W(vSv[2], 'M216,180 V212 M256,180 V212 M296,180 V212', { 'stroke-width': 4 });
const tVt = [wt('V2', 'potentiometer'), wt('V3', 'rheostat'), wt('V4', 'preset')];

/* ================= B: breadboard volume control ================= */
const ck = $('#ckS');
const src = [mk(ck, 'circle', { cx: 150, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M124,300 C134,280 142,280 150,300 S166,320 176,300')];
const bTop = W(ck, 'M150,254 V150 H420 V180'), bBot = W(ck, 'M150,346 V450 H600 V322 H700'), bPotB = W(ck, 'M420,420 V450');
const bTrack = W(ck, zigV(420, 180, 420, 16, 8));
const bWiper = W(ck, '', { 'stroke-width': 4 }), bWarr = mk(ck, 'path', { d: '', fill: INK });
const spk = [W(ck, 'M700,262 H728 V338 H700 Z', { fill: '#fff' }), W(ck, 'M728,274 L764,246 V354 L728,326', { fill: '#fff' })];
const arcs = [0, 1, 2].map(i => W(ck, `M${790 + i * 24},${270 - i * 14} Q${812 + i * 30},300 ${790 + i * 24},${330 + i * 14}`, { stroke: AM, 'stroke-width': 4 }));
const bJ = mk(ck, 'circle', { cx: 420, cy: 450, r: 6, fill: INK });
const bLb = [tx(ck, 136, 226, 'Music', { 'text-anchor': 'end', 'font-size': 22 }), tx(ck, 392, 296, 'Potentiometer', { 'text-anchor': 'end', 'font-size': 22 }), mono(ck, 392, 324, '10 kΩ', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }),
  tx(ck, 732, 392, 'Speaker', { 'text-anchor': 'middle', 'font-size': 22 })];
const wLab = mono(ck, 534, 0, 'wiper', { 'font-weight': 600, fill: INK });
const ch1T = mk(ck, 'g'); mk(ch1T, 'rect', { x: 236, y: 112, width: 72, height: 30, rx: 6, fill: '#16213E' }); mono(ch1T, 272, 133, 'CH1', { 'text-anchor': 'middle', fill: CH1, 'font-size': 17, 'font-weight': 600 });
const ch2T = mk(ck, 'g'); mk(ch2T, 'rect', { x: 0, y: 0, width: 72, height: 30, rx: 6, fill: '#16213E' }); mono(ch2T, 36, 21, 'CH2', { 'text-anchor': 'middle', fill: AM, 'font-size': 17, 'font-weight': 600 });
const SC = scope($('#scS'), 592, 200);
const trIn = SC.tr(CH1), trOut = SC.tr(AM);
const sL = [SC.lab(14, 22, 'CH1 · V IN', CH1), SC.lab(14, 194, 'CH2 · V OUT (SPEAKER)', AM)];
$('#ro1').innerHTML = `<span class="k n">WIPER</span><span class="v" id="rK">30</span><span class="u">%</span>
  <span class="k" style="color:${TE}">V<sub>in</sub> peak</span><span class="v" style="color:${TE}">1.00</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>out</sub> peak</span><span class="v" id="rVo" style="color:${TE}">0.30</span><span class="u">V</span>`;
const tUp = wt('B4', 'up'), tDn = wt('B5', 'down'), tBot = wt('B5', 'bottom'), tSig = T0('B1') + 1.2, FQ = 0.9;
const kB = τ => { let k = 0.3; k = M.lerp(k, 0.9, M.io((τ - tUp) / 1.6)); k = M.lerp(k, 0.35, M.io((τ - tDn) / 1.2)); k = M.lerp(k, 0, M.io((τ - tBot) / 0.8)); return k; };
const sgn = τ => τ < tSig ? 0 : Math.sin(2 * Math.PI * FQ * (τ - tSig));
const avB = PUC.avatar($('#sB'), { x: 192, y: 772, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the knob just slides the wiper!' });

/* ================= D: voltage divider ================= */
const dS = $('#dS'), X0 = 80, X1 = 700;
const dBar = mk(dS, 'rect', { x: X0, y: 160, width: X1 - X0, height: 40, rx: 8, fill: '#E3D8C4', stroke: INK, 'stroke-width': 3 });
const dLow = mk(dS, 'rect', { x: X0, y: 160, width: 0, height: 40, rx: 8, fill: C.ac2, stroke: AM, 'stroke-width': 3 });
const dEnds = [mono(dS, X0, 236, 'BOTTOM · 0 V', { 'font-weight': 600, fill: INK, 'font-size': 18 }), mono(dS, X1, 236, 'TOP · V in', { 'font-weight': 600, fill: TE, 'font-size': 18, 'text-anchor': 'end' })];
const dTerm = [mk(dS, 'circle', { cx: X0, cy: 180, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(dS, 'circle', { cx: X1, cy: 180, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const dWp = W(dS, '', { 'stroke-width': 5 }), dWh = mk(dS, 'path', { d: '', fill: INK });
const dWl = mono(dS, 0, 80, 'wiper', { 'font-weight': 600, fill: INK, 'text-anchor': 'middle' });
const bL1 = PUC.arrow(dS, INK, 3, 12), bL2 = PUC.arrow(dS, INK, 3, 12), bLl = mono(dS, 390, 316, 'L  (whole track, R)', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 });
const bx1 = PUC.arrow(dS, '#B7791F', 3, 12), bx2 = PUC.arrow(dS, '#B7791F', 3, 12), bxl = mono(dS, 0, 372, 'x  (lower part, Rx)', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
$('#dRo').innerHTML = `<span class="k n">x / L</span><span class="v" id="dK">0</span><span class="u">%</span>
  <span class="k">R<sub>x</sub></span><span class="v" id="dRx">0.0</span><span class="u">kΩ</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="dVo" style="color:${TE}">0.00</span><span class="u">V</span>`;
const tSlide = wt('D3', 'wiper');
const kD = t => 0.3 * M.io((t - tSlide) / 1.0);
const DST = [[K(`R \\propto L`), 'uniform track', 88], [K(`R_x = \\dfrac{x}{L}\\,R`), 'lower part', 176], [K(`\\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${TE}}{V_{in}}}{R}`), 'whole track', 284], [K(`\\textcolor{${TE}}{V_{out}} = \\textcolor{${VI}}{I}\\,R_x = \\textcolor{${TE}}{V_{in}}\\,\\dfrac{R_x}{R}`), '', 402]];
$('#dSteps').innerHTML = DST.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const WST = [[K(`R_x = 0.3 \\times 10\\,\\text{k}\\Omega = 3\\,\\text{k}\\Omega`), 92], [K(`\\textcolor{${VI}}{I} = \\dfrac{9\\,\\text{V}}{10\\,\\text{k}\\Omega} = 0.9\\,\\text{mA}`), 188], [K(`\\textcolor{${TE}}{V_{out}} = 9 \\times \\dfrac{3}{10} = 2.7\\,\\text{V}`), 330]];
$('#wSteps').innerHTML = WST.map(([s, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const dR = [...$('#dSteps').children], wR = [...$('#wSteps').children];
const tDs = [wt('D2', 'The'), wt('D3', 'If'), wt('D4', 'The'), wt('D5', 'The')], tWs = [wt('W2', 'The'), wt('W3', 'The'), wt('W4', 'V')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A pot and a rheostat connect the same way', right: 'Pot: 3 terminals · Rheostat: 2 terminals', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcP = mk(tcS, 'g'); W(tcP, `M60,130 H100 L${zigH(100, 300, 130, 16, 6).slice(1)} H340`); [60, 340].forEach(x => term(tcP, x, 130)); W(tcP, 'M200,210 V156', { 'stroke-width': 4 }); mk(tcP, 'path', { d: 'M200,148 L191,164 L209,164 Z', fill: INK }); term(tcP, 200, 210);
mono(tcP, 60, 104, 'V in', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 18 }); mono(tcP, 340, 104, '0 V', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }); mono(tcP, 236, 236, 'V out', { fill: TE, 'font-weight': 600, 'font-size': 18 });
tx(tcP, 200, 280, 'divides voltage', { 'text-anchor': 'middle', 'font-size': 22, fill: TE });
const tcR = mk(tcS, 'g'); W(tcR, `M440,130 H480 L${zigH(480, 680, 130, 16, 6).slice(1)} H710 V200 H580 V156`); term(tcR, 440, 130); mk(tcR, 'path', { d: 'M580,148 L571,164 L589,164 Z', fill: INK }); term(tcR, 710, 200);
tx(tcR, 580, 280, 'changes current', { 'text-anchor': 'middle', 'font-size': 22, fill: VI });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers: classify resistors, describe a wire wound resistor, potentiometer vs rheostat' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 20&nbsp;kΩ potentiometer is connected across 12&nbsp;V. The wiper is a quarter of the way up from the bottom. A 5&nbsp;kΩ load is connected between the wiper and the bottom. Find the output voltage.', qW: 800,
  opts: [K('3.0\\,\\text{V}'), K('1.71\\,\\text{V}'), K('2.4\\,\\text{V}'), K('6.0\\,\\text{V}')], right: 1, optW: 474, optY: 350 });
const sol = PUC.solution($('#so'), [[K(`R_{low} = 5\\,\\text{k}\\Omega,\\ R_{up} = 15\\,\\text{k}\\Omega`)], [K(`5 \\parallel 5 = 2.5\\,\\text{k}\\Omega`)],
  [K(`\\textcolor{${TE}}{V_{out}} = 12 \\times \\dfrac{2.5}{17.5}`)], [K(`\\textcolor{${TE}}{V_{out}} \\approx 1.71\\,\\text{V}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A3', 'Five'), wt('A4', 'V'), wt('A4', 'That')];

/* ================= C: formula card + next ================= */
const fc = PUC.fcard($('#sC'), { x: 360, y: 248, w: 1200, h: 500, y0: 86, dy: 112, title: 'Fixed and variable resistors · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${TE}}{V_{out}} = \\textcolor{${TE}}{V_{in}}\\,R_x/R \\qquad R_x = (x/L)\\,R`),
    K(`R \\propto L \\qquad \\textcolor{${VI}}{I} = \\textcolor{${TE}}{V}/R`),
    'Fixed: carbon composition · carbon film · metal film · wire wound',
    'Potentiometer: 3 terminals, divides V · Rheostat: 2 terminals, changes I'] });
const nx = PUC.next($('#sC'), { label: 'NEXT · EP 26', topic: 'Resistor colour codes and ratings', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tUp - 0.3, 1.08, 900, 560], [T0('B5') + 2.0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gOn = (t >= tR + 0.5 && t < tR + 1e-9 + (T0('R3') - tR)) || (t >= tB + 0.5 && t < tS) || (t >= tD && t < tX);
  M.vis(ghost, t, t < tB ? tR + 0.5 : t < tS ? tB + 0.5 : tD + 0.2, t < tB ? T0('R3') - 0.4 : t < tS ? tS - 0.4 : tX - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, wt('H1', 'smoothly'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#kC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    M.vis(kRing, t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(kBody, t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(kTop, t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 }); M.vis(kPt, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([kMin, kMax, barL], t, tMorph + 0.9); fadeAt(bars, t, tMorph + 0.9, 0.04);
    const k = kVal(t); PUC.attr(kPt, 'transform', `rotate(${(-135 + 270 * k).toFixed(2)} ${KX} ${KY})`);
    bars.forEach((b, i) => PUC.attr(b, 'fill', k * 10 > i + 0.5 ? AM : C.soft));
    M.vis($('#kQ'), t, T0('H2'), 1e9, { dy: 16 });
  }

  /* R: what is a resistor */
  const rOn = t >= tR - 0.05 && t < tFx + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tFx - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(rBat, t, tR + 0.4, 0.25, 0.1); drawSeq(rW, t, tR + 0.5, 0.45, 0.2); M.draw(rZ, t, wt('R1', 'resistor') - 0.1, 0.4); fadeAt(rLb, t, tR + 0.6, 0.06);
    M.vis($('#rE'), t, tR + 1.0, 1e9, { dy: 0, fade: 0.2 });
    const R = Rnow(t), I = 6 / R;
    // electrons: speed proportional to current (integrated so the change is smooth)
    const tm = tMore, a = Math.max(0, Math.min(t, tm) - (tR + 0.9)), b = Math.max(0, t - tm);
    eR.set(160 * 0.6 * a + 160 * 0.2 * b, t >= tR + 0.9, (x, y) => y < 130 && x > 296 && x < 484);
    PUC.attr(rZ, 'stroke-width', (4 + 2 * M.io((t - tMore) / 0.8)).toFixed(2));
    M.vis($('#rRo'), t, tR + 0.8, 1e9, { dy: 12 }); M.setT($('#rRv'), Math.round(R).toString()); M.setT($('#rIv'), I.toFixed(2));
    M.vis(fRoot, t, wt('R1', 'resistor'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.draw(fSym, t, wt('R1', 'opposes'), 0.6); M.vis(fSymL, t, wt('R2', 'ohms'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq(fBr, t, T0('R3') + 0.4, 0.35, 0.1);
    fm.forEach((f, i) => { M.vis(f, t, tFam[i] - 0.1, 1e9, { dy: 20 }); });
  }

  /* F: fixed types */
  const fOn = t >= tFx - 0.05 && t < tV + 0.1; M.hide($('#sF2'), !fOn);
  if (fOn) {
    const out = tV - 0.32;
    fT.forEach((el, i) => { M.vis(el, t, tFx + 0.15 + i * 0.1, out, { dy: 36, ...o }); const lit = M.io((t - tFt[i]) / 0.3);
      el.querySelector('svg').style.opacity = (0.3 + 0.7 * lit).toFixed(3); el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, lit);
      el.querySelectorAll('.kv').forEach(k => { k.style.color = M.mix('#C4C8D0', C.ink2, lit); });
      const ch = el.querySelector('.ch'); M.vis(ch, t, tFt[i] + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); ch.style.background = C.ac2; ch.style.color = '#8A5B0B'; });
    M.draw(coil, t, tFt[3], 1.0);
  }

  /* V: variable types */
  const vOn = t >= tV - 0.05 && t < tB + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = tB - 0.32;
    vT.forEach((el, i) => { M.vis(el, t, tV + 0.15 + i * 0.1, out, { dy: 36, ...o }); const lit = M.io((t - tVt[i]) / 0.3);
      el.querySelector('svg').style.opacity = (0.3 + 0.7 * lit).toFixed(3); el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, lit); el.querySelector('.kv').style.color = M.mix('#C4C8D0', C.ink2, lit);
      const ch = el.querySelector('.ch'); M.vis(ch, t, tVt[i] + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); ch.style.background = C.ac2; ch.style.color = '#8A5B0B'; });
    const sx = t >= tVt[0] ? 70 * Math.sin(2 * Math.PI * 0.35 * (t - tVt[0])) : 0; PUC.attr(pW, 'transform', `translate(${sx.toFixed(1)},0)`);
    PUC.attr(prS, 'transform', `rotate(${t >= tVt[2] ? (60 * M.io((t - tVt[2] - 0.5) / 0.8)).toFixed(1) : 0} 256 120)`);
  }

  /* B: breadboard volume control */
  const bOn = t >= tB - 0.05 && t < tS + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    fadeAt([src[0]], t, tB + 0.3); M.draw(src[1], t, tB + 0.4, 0.4); drawSeq([bTop, bBot, bPotB], t, tB + 0.5, 0.5, 0.2); M.draw(bTrack, t, wt('B1', 'potentiometer') - 0.1, 0.5);
    M.vis(bJ, t, tB + 1.2, 1e9, { dy: 0, fade: 0.2 }); fadeAt(bLb.slice(0, 1), t, tB + 0.6); fadeAt(bLb.slice(1, 3), t, wt('B1', 'potentiometer')); fadeAt(bLb.slice(3), t, wt('B2', 'speaker') - 0.2);
    drawSeq(spk, t, wt('B2', 'speaker') - 0.3, 0.3, 0.1);
    const k = kB(t), yw = 420 - 240 * k;
    PUC.attr(bWiper, 'd', `M440,${yw.toFixed(1)} H600 V278 H700`); PUC.attr(bWarr, 'd', `M438,${yw.toFixed(1)} L456,${(yw - 9).toFixed(1)} L456,${(yw + 9).toFixed(1)} Z`);
    const wOn = t >= wt('B2', 'wiper') - 0.1; M.hide(bWiper, !wOn); M.hide(bWarr, !wOn); PUC.attr(wLab, 'y', (yw - 14).toFixed(1)); M.vis(wLab, t, wt('B2', 'wiper'), 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(ch2T, 'transform', `translate(${612},${(yw + 10).toFixed(1)})`);
    M.vis(ch1T, t, wt('B3', 'Channel'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(ch2T.firstChild, t, wt('B3', 'Channel', 1), 1e9, { dy: 0, fade: 0.1 }); M.vis(ch2T.lastChild, t, wt('B3', 'Channel', 1), 1e9, { dy: 0, fade: 0.1 });
    const s = sgn(t), loud = Math.abs(s) * k;
    arcs.forEach((a, i) => { M.hide(a, !(t >= tSig && k > 0.05 && k * 3 > i)); a.style.opacity = (0.35 + 0.65 * loud).toFixed(3); });
    PUC.attr(spk[0], 'fill', M.mix('#FFFFFF', AM, t >= tSig ? 0.6 * loud : 0));
    trIn(τ => 40 * sgn(τ), t, tSig, 4, 55, t >= tSig); trOut(τ => 40 * kB(τ) * sgn(τ), t, tSig, 4, 145, t >= wt('B2', 'wiper'));
    sL.forEach((e, i) => M.vis(e, t, i ? wt('B2', 'wiper') : tSig, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.7, 1e9, { dy: 12 }); M.setT($('#rK'), Math.round(100 * k).toString()); M.setT($('#rVo'), k.toFixed(2));
    avB(t, wt('B5', 'silent') + 0.2, tS - 0.3);
  }

  /* S: statement */
  const sOn = t >= tS - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tS + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('S1', 'Variable') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: voltage divider + worked example */
  const dOn = t >= tD - 0.05 && t < tX + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dL'), t, tD + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#dR'), t, tD + 0.25, 1e9, { dx: 60, dy: 0 });
    M.vis(dBar, t, tD + 0.4, 1e9, { dy: 0, fade: 0.2 }); fadeAt([...dTerm, ...dEnds], t, tD + 0.5, 0.08);
    const k = kD(t), xw = X0 + (X1 - X0) * k;
    PUC.attr(dLow, 'width', Math.max(0, xw - X0).toFixed(1)); M.hide(dLow, k < 0.01);
    PUC.attr(dWp, 'd', `M${xw.toFixed(1)},92 V142`); PUC.attr(dWh, 'd', `M${xw.toFixed(1)},156 L${(xw - 10).toFixed(1)},138 L${(xw + 10).toFixed(1)},138 Z`); PUC.attr(dWl, 'x', xw.toFixed(1));
    [dWp, dWh, dWl].forEach(e => M.vis(e, t, tD + 0.7, 1e9, { dy: 0, fade: 0.2 }));
    const la = M.io((t - wt('D2', 'length')) / 0.4); bL1.set(390, 286, 390 - 310 * la, 286); bL2.set(390, 286, 390 + 310 * la, 286); M.vis(bLl, t, wt('D2', 'length') + 0.3, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(bLl, 'y', 272);
    const xa = M.io((t - wt('D3', 'length')) / 0.4) * (k > 0.02 ? 1 : 0), xm = (X0 + xw) / 2; bx1.set(xm, 322, xm - (xw - X0) / 2 * xa, 322); bx2.set(xm, 322, xm + (xw - X0) / 2 * xa, 322);
    PUC.attr(bxl, 'x', Math.max(150, xm).toFixed(1)); PUC.attr(bxl, 'y', 350); M.vis(bxl, t, wt('D3', 'length') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dRo'), t, tD + 0.8, 1e9, { dy: 12 });
    M.setT($('#dK'), Math.round(100 * k).toString()); M.setT($('#dRx'), (10 * k).toFixed(1)); M.setT($('#dVo'), (9 * k).toFixed(2));
    M.vis($('#dL1'), t, tD + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dR.forEach((r, i) => { M.vis(r, t, tDs[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tDs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#dBox'), t, wt('D5', 'So') + 0.4, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#dUnit'), t, wt('D6', 'Volts') - 0.1, tW - 0.3, { dy: 12, outDur: 0.25 });
    wR.forEach((r, i) => { M.hide(r, t < tWs[i] - 0.15); M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.6); });
    M.vis($('#wBox'), t, wt('W4', 'Two') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'A') - 0.1 });
    M.vis(tcP, t, wt('X3', 'potentiometer'), 1e9, { dy: 20 }); M.vis(tcR, t, wt('X3', 'rheostat'), 1e9, { dy: 20 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Classify') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.3, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* C: formula card + NEXT */
  const cOn = t >= tF - 0.05; M.hide($('#sC'), !cOn);
  if (cOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('C1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
