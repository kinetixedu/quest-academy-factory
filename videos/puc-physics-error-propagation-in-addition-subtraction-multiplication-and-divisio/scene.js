// PUC Physics Ep 16: Error propagation in addition, subtraction, multiplication and division (Motion notebook, measuring bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ac, BC = C.violet, ZC = C.ink, EC = C.orange;   // colour-coding: A / L blue, B / W violet, result Z ink, every error (delta) orange
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ITAL = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 };
// KaTeX pieces (same colours as the sim and the readout)
const tA = `\\textcolor{${AC}}{A}`, tB = `\\textcolor{${BC}}{B}`, tZ = `\\textcolor{${ZC}}{Z}`;
const dA = `\\textcolor{${EC}}{\\Delta A}`, dB = `\\textcolor{${EC}}{\\Delta B}`, dZ = `\\textcolor{${EC}}{\\Delta Z}`;

Object.assign(M.IC, {
  scissors: ['M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M20 4 8.12 15.88', 'M14.47 14.48 20 20', 'M8.12 8.12 12 12'],
  brush: ['m14.622 17.897-10.68-2.913', 'M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z', 'M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 .762.35H11a5 5 0 0 0 5-5c0-2.3-1.7-4.8-4-6'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tM1 = T0('M1'), tR1 = T0('R1'), tC1 = T0('C1'), tC3 = T0('C3'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three jobs ---------- */
const JOBS = [['scissors', 'Tailor', 'LENGTHS OF CLOTH', '2.40 m + 1.10 m', 'tailor'], ['home', 'Builder', 'AREA OF A FLOOR', '4.0 m × 3.0 m', 'builder'], ['brush', 'Painter', 'AREA OF A WALL', '3.0 m × 2.5 m', 'painter']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[4]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv">${v}</div><div class="je">± 1 cm each</div></div>`).join('');

/* ---------- P: errors travel ---------- */
const pf = $('#pfS'), pAr = [PUC.arrow(pf, EC, 5, 16), PUC.arrow(pf, EC, 5, 16), PUC.arrow(pf, EC, 5, 16)];
const pw = $('#pwS'), NLY = 250;
mk(pw, 'line', { x1: 60, y1: NLY, x2: 724, y2: NLY, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
for (let x = 92; x <= 692; x += 50) mk(pw, 'line', { x1: x, y1: NLY - 8, x2: x, y2: NLY + 8, stroke: C.ink, 'stroke-width': 2 });
const pwBand = mk(pw, 'rect', { x: 392, y: NLY - 26, width: 0, height: 52, rx: 8, fill: EC, opacity: 0.22 });
const pwL = mk(pw, 'path', { d: `M232,${NLY - 40} v80`, stroke: EC, 'stroke-width': 4, 'stroke-linecap': 'round' }), pwR = mk(pw, 'path', { d: `M552,${NLY - 40} v80`, stroke: EC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const pwTl = txt(pw, 232, NLY + 76, 'smallest', { 'text-anchor': 'middle', fill: EC, 'font-weight': 600, 'font-size': 20 }), pwTr = txt(pw, 552, NLY + 76, 'largest', { 'text-anchor': 'middle', fill: EC, 'font-weight': 600, 'font-size': 20 });
const pwM = mk(pw, 'circle', { cx: 392, cy: NLY, r: 11, fill: C.ink }), pwMt = txt(pw, 392, NLY - 52, 'measured', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const pwT = mk(pw, 'circle', { cx: 486, cy: NLY, r: 11, fill: C.ok }), pwTt = txt(pw, 486, NLY + 120, 'true value', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 20 });
const pwTl2 = mk(pw, 'line', { x1: 486, y1: NLY + 14, x2: 486, y2: NLY + 98, stroke: C.ok, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const tPw = [wt('P4', 'worst'), wt('P4', 'worst') + 0.5, wt('P4', 'range'), wt('P4', 'true')];

/* ---------- S: the measuring bench, two rods ---------- */
const s = $('#simS'), PX = 14, EX = 10, X0 = 80, RY = 170, RH = 40, BY0 = 262;   // 14 px per cm, errors drawn 10x larger
mk(s, 'rect', { x: X0 - 20, y: 380, width: 640, height: 96, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
for (let c = 0; c <= 40; c++) { const x = X0 + c * PX, L = c % 10 === 0 ? 38 : c % 5 === 0 ? 26 : 14; mk(s, 'line', { x1: x, y1: 380, x2: x, y2: 380 + L, stroke: C.ink, 'stroke-width': c % 5 ? 1.4 : 2.2 }); if (c % 10 === 0) txt(s, x, 446, c, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
txt(s, X0 + 600, 466, 'cm', { 'text-anchor': 'end', fill: C.violet, 'font-weight': 600 });
const rodA = mk(s, 'rect', { x: X0, y: RY, height: RH, rx: 6, fill: '#D3E1FB', stroke: AC, 'stroke-width': 3 });
const rodB = mk(s, 'rect', { height: RH, rx: 6, fill: '#E6DCFA', stroke: BC, 'stroke-width': 3 });
const lA = txt(s, 0, RY + 29, 'A', { ...ITAL, 'font-size': 26, fill: AC, 'text-anchor': 'middle' }), lB = txt(s, 0, 0, 'B', { ...ITAL, 'font-size': 26, fill: BC, 'text-anchor': 'middle' });
const ebA = mk(s, 'rect', { y: RY - 10, width: 2 * 0.1 * PX * EX, height: RH + 20, rx: 4, fill: EC, opacity: 0.25 }), ebB = mk(s, 'rect', { width: 2 * 0.1 * PX * EX, height: RH + 20, rx: 4, fill: EC, opacity: 0.25 });
const ebAt = txt(s, 0, RY - 18, '± 0.1', { 'text-anchor': 'middle', fill: EC, 'font-weight': 600 }), ebBt = txt(s, 0, 0, '± 0.1', { 'text-anchor': 'middle', fill: EC, 'font-weight': 600 });
const ghostE = [0, 1, 2].map(k => mk(s, 'line', { y1: RY - 24, y2: 372, stroke: C.ink, 'stroke-width': 3, opacity: 0 }));
const endL = mk(s, 'line', { y1: RY - 24, y2: 372, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const zBand = mk(s, 'rect', { y: RY - 30, width: 2 * 0.2 * PX * EX, height: 228, rx: 6, fill: EC, opacity: 0.2 });
const zBt = txt(s, 0, RY - 40, '± 0.2', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 24 });
const brZ = mk(s, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }), brZt = txt(s, 0, 0, 'Z = A + B', { ...ITAL, 'font-size': 24, fill: C.ink, 'text-anchor': 'middle' });
const over = mk(s, 'rect', { y: RY - 6, height: RH + 12, rx: 6, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const overT = txt(s, 0, RY + RH + 30, 'A − B', { ...ITAL, 'font-size': 24, fill: C.ink, 'text-anchor': 'middle' });
// motion: errors (true cm) and positions
const tS2 = T0('S2'), tS3 = T0('S3'), tS4 = wt('S4', 'end'), tS5 = wt('S5', 'longest'), tS6 = wt('S6', 'shortest'), tS7 = T0('S7');
const tB3 = wt('B3', 'longest'), tB4 = wt('B4', 'shortest'), tB5 = T0('B5');
const eA = M.keys([[0, 0], [tS5, 0.1], [tS6, -0.1], [tS7, 0], [tB3, 0.1], [tB4, -0.1], [tB5, 0]], 1.4, M.io);
const eB = M.keys([[0, 0], [tS5, 0.1], [tS6, -0.1], [tS7, 0], [tB3, -0.1], [tB4, 0.1], [tB5, 0]], 1.4, M.io);
const join = M.keys([[0, 0], [tS4, 1], [wt('B1', 'Lay') - 0.1, 0]], 0.9, M.io);
const LA = t => (20 * PX + eA(t) * PX * EX), LB = t => (15 * PX + eB(t) * PX * EX);
const zVal = (t, add) => add ? 35 + eA(t) + eB(t) : 5 + eA(t) - eB(t);
$('#roG').innerHTML = `<span class="k" style="color:${AC}">A</span><span class="v" id="rA" style="color:${AC}">20.0</span><span class="u">cm</span>
  <span class="k" style="color:${BC}">B</span><span class="v" id="rB" style="color:${BC}">15.0</span><span class="u">cm</span>
  <span class="k" style="color:${ZC}" id="rZk">A + B</span><span class="v" id="rZ">35.0</span><span class="u">cm</span>
  <span class="k" style="color:${EC}">ΔZ max</span><span class="v" id="rE" style="color:${EC}">0.0</span><span class="u">cm</span>`;
// live error bar graph: an axis around the centre value, a dot linked to Z, the band of every Z reached so far
const g = $('#grS'), GX0 = 90, GW = 604, GYa = 168;
mk(g, 'line', { x1: GX0 - 20, y1: GYa, x2: GX0 + GW + 20, y2: GYa, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
const gTk = [0, 1, 2, 3, 4].map(i => { const x = GX0 + i * GW / 4; mk(g, 'line', { x1: x, y1: GYa - 8, x2: x, y2: GYa + 8, stroke: C.ink, 'stroke-width': 2 }); return txt(g, x, GYa + 38, '', { 'text-anchor': 'middle', 'font-size': 20 }); });
const gBand = mk(g, 'rect', { y: GYa - 30, height: 60, rx: 8, fill: EC, opacity: 0.25 });
const gDot = mk(g, 'circle', { cy: GYa, r: 12, fill: C.ink });
const gDt = txt(g, 0, GYa - 44, '', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
const gx = (v, c) => GX0 + (v - (c - 0.4)) / 0.8 * GW;
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Subtracting still made the error bigger!' });

/* ---------- D: rule for + and - ---------- */
const STEPS = [[`${tZ} = ${tA} + ${tB}`, 'A has error ΔA, B has error ΔB'],
  [`${tZ}_{\\max} = (${tA} + ${dA}) + (${tB} + ${dB})`, 'both readings at their worst'],
  [`${dZ} = ${dA} + ${dB}`, 'same for Z = A − B']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:136px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 160}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Z'), wt('D3', 'biggest'), wt('D4', 'error')];
const d = $('#drS'), DX = 70;
const dBar = (y, x, w, col, fill) => mk(d, 'rect', { x, y, width: w, height: 44, rx: 6, fill, stroke: col, 'stroke-width': 3 });
const dA1 = dBar(110, DX, 300, AC, '#D3E1FB'), dAe = mk(d, 'rect', { x: DX + 300, y: 104, width: 34, height: 56, rx: 4, fill: EC, opacity: 0.55 });
const dB1 = dBar(214, DX, 220, BC, '#E6DCFA'), dBe = mk(d, 'rect', { x: DX + 220, y: 208, width: 34, height: 56, rx: 4, fill: EC, opacity: 0.55 });
const dZa = dBar(370, DX, 300, AC, '#D3E1FB'), dZb = dBar(370, DX + 300, 220, BC, '#E6DCFA');
const dZe1 = mk(d, 'rect', { x: DX + 520, y: 364, width: 34, height: 56, rx: 4, fill: EC, opacity: 0.55 }), dZe2 = mk(d, 'rect', { x: DX + 554, y: 364, width: 34, height: 56, rx: 4, fill: EC, opacity: 0.85 });
const dT = [txt(d, DX + 12, 96, 'A', { ...ITAL, 'font-size': 26, fill: AC }), txt(d, DX + 304, 96, 'ΔA', { 'font-size': 22, fill: EC, 'font-weight': 700 }), txt(d, DX + 12, 200, 'B', { ...ITAL, 'font-size': 26, fill: BC }), txt(d, DX + 224, 200, 'ΔB', { 'font-size': 22, fill: EC, 'font-weight': 700 }),
  txt(d, DX + 12, 356, 'Z = A + B', { ...ITAL, 'font-size': 26, fill: ZC }), txt(d, DX + 520, 452, 'ΔA + ΔB', { 'font-size': 22, fill: EC, 'font-weight': 700 })];
$('#stF').innerHTML = K(`${dZ} = ${dA} + ${dB}`);

/* ---------- K: side by side + think ---------- */
const kbar = (svg, w) => { mk(svg, 'line', { x1: 36, y1: 300, x2: 748, y2: 300, stroke: C.line, 'stroke-width': 2 }); const b = mk(svg, 'rect', { x: 36, y: 276, width: w, height: 48, rx: 6, fill: C.ink }); const e = mk(svg, 'rect', { x: 36 + w - 28, y: 262, width: 56, height: 76, rx: 6, fill: EC, opacity: 0.35 }); const tt = txt(svg, 36, 384, 'error band drawn 10x larger', { 'font-size': 18 }); return [b, e, tt]; };
const kaB = kbar($('#kaS'), 490), kbB = kbar($('#kbS'), 70);
const th1 = PUC.think($('#th1'), { q: '(50 ± 1) − (30 ± 1) = 20 ± ?', opts: ['± 0', '± 2'], right: 1, why: 'Worst case 51 − 29 = 22 and 49 − 31 = 18. Errors never cancel: 1 + 1 = 2.' });

/* ---------- M: the table area ---------- */
const m = $('#mS'), TX = 80, TY = 130, TP = 4, SX = 50;     // 4 px per cm; strips drawn 50x thicker (0.1 cm -> 20 px)
const Wt = M.keys([[0, 60], [wt('M9', 'narrower'), 15]], 1.8, M.io);
const tbl = mk(m, 'rect', { x: TX, y: TY, width: 120 * TP, rx: 4, fill: '#D8B48C', stroke: C.ink, 'stroke-width': 3 });
const sL = mk(m, 'rect', { x: TX, fill: EC, opacity: 0.5, stroke: EC, 'stroke-width': 2 });     // along the length: L x dW
const sW = mk(m, 'rect', { x: TX + 120 * TP, y: TY, fill: EC, opacity: 0.5, stroke: EC, 'stroke-width': 2 });   // along the width: W x dL
const sC = mk(m, 'rect', { x: TX + 120 * TP, fill: C.red, opacity: 0.9 });
const ghS = [0, 1, 2].map(() => mk(m, 'rect', { x: TX, fill: 'none', stroke: EC, 'stroke-width': 2, opacity: 0 }));
const mLt = txt(m, TX + 240, TY - 16, 'L = 120.0 cm', { 'text-anchor': 'middle', fill: AC, 'font-weight': 600, 'font-size': 22 });
const mWt = txt(m, TX - 14, 0, 'W', { 'text-anchor': 'end', ...ITAL, 'font-size': 28, fill: BC });
const mSL = txt(m, TX + 240, 0, 'L × ΔW = 120 × 0.1 = 12 cm²', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 20 });
const mSW = txt(m, TX + 120 * TP + 30, 0, '', { fill: EC, 'font-weight': 700, 'font-size': 20 });
const mSW1 = mk(mSW, 'tspan', { x: TX + 120 * TP + 30, dy: 0 }), mSW2 = mk(mSW, 'tspan', { x: TX + 120 * TP + 30, dy: 26 });
mSW1.textContent = 'W × ΔL'; mSW2.textContent = '= 6 cm²';
const mSC = txt(m, TX + 120 * TP + 30, 0, 'corner 0.01 cm²', { fill: C.red, 'font-weight': 700, 'font-size': 18 });
const tM3 = wt('M3', 'stretch'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = wt('M6', 'tiny');
const gL = t => M.io((t - tM3) / 1.6), gW = t => M.io((t - tM3 - 0.4) / 1.6);
$('#mroG').innerHTML = `<span class="k" style="color:${AC}">L</span><span class="v" style="color:${AC}">120.0</span><span class="u">cm</span>
  <span class="k" style="color:${BC}">W</span><span class="v" id="mW" style="color:${BC}">60.0</span><span class="u">cm</span>
  <span class="k">A</span><span class="v" id="mA">7200</span><span class="u">cm²</span>
  <span class="k" style="color:${EC}">ΔA</span><span class="v" id="mE" style="color:${EC}">0.0</span><span class="u">cm² · <b id="mP" style="color:${EC}">0.00 %</b></span>`;
const pct = W => (0.1 / 120 + 0.1 / W) * 100;
const mg = PUC.graph($('#mgS'), { x: 120, y: 64, w: 580, h: 140, xmax: 120, ymin: 0, ymax: 1.2, xt: [0, 30, 60, 90, 120], yt: [0, 0.5, 1] });
mg.ticks.forEach(e => e.setAttribute('y', 64 + 140 + 30));
const mgC = mg.curve(EC, 5), mgD = mg.dot(C.ink, 11);
const tM9 = T0('M9'), tM8 = T0('M8');
const avD = PUC.avatar($('#sM'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The narrow side brings most of the error.' });

/* ---------- R: rule for x and / ---------- */
const RST = [[`${tZ} = ${tA}${tB} \\;\\Rightarrow\\; ${dZ} = ${tA}\\,${dB} + ${tB}\\,${dA}`, 'the two strips'],
  [`\\dfrac{${dZ}}{${tZ}} = \\dfrac{${tA}\\,${dB} + ${tB}\\,${dA}}{${tA}${tB}}`, 'divide both sides by Z = AB'],
  [`\\dfrac{${dZ}}{${tZ}} = \\dfrac{${dA}}{${tA}} + \\dfrac{${dB}}{${tB}}`, 'the relative errors add'],
  [`${tZ} = \\dfrac{${tA}}{${tB}} \\;\\Rightarrow\\; \\dfrac{${dZ}}{${tZ}} = \\dfrac{${dA}}{${tA}} + \\dfrac{${dB}}{${tB}}`, 'division: the same rule']];
$('#rsteps').innerHTML = `<div class="hiBox" id="hiR" style="left:20px;width:1000px;height:116px"></div>` + RST.map(([f, w], i) => `<div class="rs" id="rst${i}" style="top:${78 + i * 122}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tR = [wt('R2', 'Z'), wt('R3', 'Divide'), wt('R4', 'Delta'), wt('R5', 'For')];
const rr = $('#rrS'), RX = 56, RY0 = 150, RW = 300, RHh = 170;
mk(rr, 'rect', { x: RX, y: RY0, width: RW, height: RHh, rx: 4, fill: '#D8B48C', stroke: C.ink, 'stroke-width': 3 });
txt(rr, RX + RW / 2, RY0 - 16, 'A', { ...ITAL, 'font-size': 28, fill: AC, 'text-anchor': 'middle' }); txt(rr, RX - 14, RY0 + RHh / 2 + 10, 'B', { ...ITAL, 'font-size': 28, fill: BC, 'text-anchor': 'end' });
const rS1 = mk(rr, 'rect', { x: RX, y: RY0 + RHh, width: RW, height: 26, fill: EC, opacity: 0.5 }), rS2 = mk(rr, 'rect', { x: RX + RW, y: RY0, width: 26, height: RHh, fill: EC, opacity: 0.5 });
const rS1t = txt(rr, RX + RW / 2, RY0 + RHh + 62, 'A · ΔB', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 24 }), rS2t = txt(rr, RX + RW + 40, RY0 + RHh / 2 + 8, 'B · ΔA', { fill: EC, 'font-weight': 700, 'font-size': 24 });
const rDiv = txt(rr, RX + RW / 2 + 13, 460, 'divide by the area AB', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const rPill = document.createElement('div'); rPill.className = 'pillp ac'; rPill.style.cssText = 'left:36px;top:500px'; rPill.textContent = 'Each side brings its own share'; $('#rr').appendChild(rPill);

/* ---------- C: side by side rules + think ---------- */
$('#caF').innerHTML = K(`${dZ} = ${dA} + ${dB}`);
$('#cbF').innerHTML = K(`\\dfrac{${dZ}}{${tZ}} = \\dfrac{${dA}}{${tA}} + \\dfrac{${dB}}{${tB}}`);
const th2 = PUC.think($('#th2'), { q: 'Speed = distance ÷ time. Distance: 1 % error. Time: 2 % error. Error in speed?', opts: ['1 %', '3 %'], right: 1, why: 'Division still adds the relative errors: 1 % + 2 % = 3 %. They never subtract.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\dfrac{\\textcolor{${EC}}{\\Delta L}}{\\textcolor{${AC}}{L}} = \\dfrac{0.1}{120} \\approx 0.00083`)],
  [K(`\\dfrac{\\textcolor{${EC}}{\\Delta W}}{\\textcolor{${BC}}{W}} = \\dfrac{0.1}{60} \\approx 0.00167`)],
  [K(`\\dfrac{\\textcolor{${EC}}{\\Delta A}}{A} = 0.00083 + 0.00167 = 0.0025`)],
  [K(`\\textcolor{${EC}}{\\Delta A} = 7200 \\times 0.0025 = 18\\,\\text{cm}^2`)],
  [K(`A = (7200 \\pm \\textcolor{${EC}}{18})\\,\\text{cm}^2`)]], { label: 'WORKED EXAMPLE', y0: 178, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Relative'), wt('W4', 'Relative'), wt('W5', 'Add'), wt('W6', 'Times'), wt('W7', 'So')];
const wr = $('#wrS'), WB = 520 / 0.25;     // 600 px = 0.25 %
const wBars = [['L', 0.1 / 120 * 100, AC, 110], ['W', 0.1 / 60 * 100, BC, 190], ['A', 0.25, EC, 290]].map(([n, v, col, y]) => {
  txt(wr, 36, y + 30, n === 'A' ? 'area' : n, { ...ITAL, 'font-size': 26, fill: col });
  mk(wr, 'rect', { x: 120, y, width: 520, height: 44, rx: 8, fill: C.soft });
  const b = mk(wr, 'rect', { x: 120, y, width: 0, height: 44, rx: 8, fill: col, opacity: n === 'A' ? 0.85 : 0.75 });
  const l = txt(wr, 0, y + 30, (n === 'A' ? '0.25' : v.toFixed(3)) + ' %', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
  return [b, l, v];
});
const wSeg = mk(wr, 'rect', { x: 120, y: 290, width: 0, height: 44, rx: 8, fill: AC, opacity: 0.75 });
txt(wr, 120, 82, 'RELATIVE ERROR, AS A PERCENTAGE', { 'font-size': 16, 'letter-spacing': 2 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `For ${K('Z = A - B')}: ${K('\\Delta Z = \\Delta A - \\Delta B')}`, right: `Errors always add: ${K(`${dZ} = ${dA} + ${dB}`)}` });
const tr = $('#tr'), trL = [txt(tr, 40, 92, '51 − 29 = 22', { 'font-size': 30, fill: C.ink, 'font-weight': 600 }), txt(tr, 40, 146, '49 − 31 = 18', { 'font-size': 30, fill: C.ink, 'font-weight': 600 }), txt(tr, 40, 212, '20 ± 2, not 20 ± 0', { 'font-size': 30, fill: C.ok, 'font-weight': 700 })];
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: the maximum percentage error in a result built from measured values' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A trolley moves from ${K('x_1 = (10.0 \\pm 0.1)\\,\\text{cm}')} to ${K('x_2 = (60.0 \\pm 0.1)\\,\\text{cm}')} in ${K('t = (2.00 \\pm 0.02)\\,\\text{s}')}. Maximum percentage error in its average speed?`, qW: 800,
  opts: ['0.4 %', '1.0 %', '1.4 %', '2.2 %'], right: 2, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K('d = 60.0 - 10.0 = 50.0\\,\\text{cm}')], [K(`\\textcolor{${EC}}{\\Delta d} = 0.1 + 0.1 = 0.2\\,\\text{cm}`)], [K(`\\dfrac{\\Delta d}{d} = 0.4\\%,\\;\\; \\dfrac{\\Delta t}{t} = 1\\%`)], [K(`\\dfrac{\\Delta v}{v} = 0.4 + 1 = \\textcolor{${C.ok}}{1.4\\%}`)]], { y0: 100, dy: 108 });
const tSo = [wt('A2', 'distance'), wt('A2', 'error'), wt('A3', 'That'), wt('A4', 'add')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · error propagation', y0: 92, dy: 108, txt: [0, 0, 1, 1],
  lines: [K(`${tZ} = ${tA} \\pm ${tB}: \\quad ${dZ} = ${dA} + ${dB}`),
    K(`${tZ} = ${tA}${tB} \\text{ or } \\dfrac{${tA}}{${tB}}: \\quad \\dfrac{${dZ}}{${tZ}} = \\dfrac{${dA}}{${tA}} + \\dfrac{${dB}}{${tB}}`),
    '<b>Errors always add</b>, never cancel (worst case)', '<b>× or ÷</b>: add the percentage errors'] });
const YQ = ['Why do errors add, even when you subtract?', 'When do you add percentage errors instead of absolute errors?', 'What is the error in the perimeter of Aarav\'s table?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 17', topic: '8 calculator digits: which do you keep? Measurement Uncertainty', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 - 0.2, 1.06, 960, 560], [tS7 + 0.2, 1, 960, 540], [tM7 - 0.2, 1.06, 960, 560], [tM8 + 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  // P: arrows from the measured chips into the calculation and out to the result
  const r = id => { const e = $(id); return { l: e.offsetLeft, t: e.offsetTop, w: e.offsetWidth, h: e.offsetHeight }; };
  const A = r('#pA'), B = r('#pB'), Cc = r('#pC'), Z = r('#pZ');
  geo = { pa: [A.l + A.w + 10, A.t + A.h / 2, Cc.l - 8, Cc.t + 14], pb: [B.l + B.w + 10, B.t + B.h / 2, Cc.l - 8, Cc.t + Cc.h - 14], pz: [Cc.l + Cc.w + 10, Cc.t + Cc.h / 2, Z.l - 10, Z.t + Z.h / 2] };
  // K: values sit above the bars
}
const fmt1 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(1);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jr' + i).querySelector('.je'), t, wt('H2', 'error') - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'hides') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, wt('H3', 'hundred') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    const nt = $('#note'); nt.style.transform = (nt.style.transform && nt.style.transform !== 'none' ? nt.style.transform + ' ' : '') + 'rotate(-4deg)';
    M.vis($('#nt3'), t, wt('H4', 'millimetre') - 0.2, 1e9, POP);
    M.vis($('#wq0'), t, wt('H5', 'area') - 0.1, 1e9, POP);
    M.vis($('#wq1'), t, wt('H5', 'bigger') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pf'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tm = wt('P2', 'measured'), ttr = wt('P2', 'travel');
    M.vis($('#pA'), t, tm - 0.1, 1e9, POP); M.vis($('#pB'), t, tm + 0.05, 1e9, POP); M.vis($('#pC'), t, wt('P2', 'calculate') - 0.1, 1e9, POP);
    [geo.pa, geo.pb, geo.pz].forEach((p, i) => { const u = M.io((t - ttr - (i === 2 ? 0.5 : 0)) / 0.5); pAr[i].set(p[0], p[1], p[0] + (p[2] - p[0]) * u, p[1] + (p[3] - p[1]) * u); });
    M.vis($('#pZ'), t, ttr + 0.9, 1e9, POP);
    M.vis($('#pP'), t, wt('P3', 'spreading') - 0.1, 1e9, POP);
    M.vis($('#pw'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    M.vis(pwM, t, tP4 + 0.2, 1e9, POP); M.vis(pwMt, t, tP4 + 0.3, 1e9, { dy: 8 });
    const bw = 160 * M.io((t - tPw[1]) / 0.6); attr(pwBand, 'x', (392 - bw).toFixed(1)); attr(pwBand, 'width', (2 * bw).toFixed(1));
    M.vis(pwL, t, tPw[1] + 0.5, 1e9, { dy: 0, fade: 0.15 }); M.vis(pwR, t, tPw[1] + 0.5, 1e9, { dy: 0, fade: 0.15 });
    M.vis(pwTl, t, tPw[1] + 0.6, 1e9, { dy: 8 }); M.vis(pwTr, t, tPw[1] + 0.7, 1e9, { dy: 8 });
    M.vis(pwT, t, tPw[3] - 0.1, 1e9, POP); M.draw(pwTl2, t, tPw[3], 0.3); M.vis(pwTt, t, tPw[3] + 0.1, 1e9, { dy: 8 });
    M.vis($('#pwP'), t, tPw[2] + 0.2, 1e9, POP);
  }

  /* S: two rods, add then subtract */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), add = t < tB1;
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exS'), t, tS2 + 0.6, 1e9, { dy: 8 });
    const la = LA(t), lb = LB(t), j = join(t);
    // rod A grows in on S2, rod B on S3
    const gA = M.o3((t - tS2) / 0.7), gB = M.o3((t - tS3) / 0.7);
    attr(rodA, 'width', Math.max(0.01, la * gA).toFixed(1)); M.hide(rodA, gA <= 0);
    const bx = X0 + j * la, by = BY0 + (RY - BY0) * j;
    attr(rodB, 'x', bx.toFixed(1)); attr(rodB, 'y', by.toFixed(1)); attr(rodB, 'width', Math.max(0.01, lb * gB).toFixed(1)); M.hide(rodB, gB <= 0);
    attr(lA, 'x', X0 + la / 2); M.vis(lA, t, tS2 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    attr(lB, 'x', (bx + lb / 2).toFixed(1)); attr(lB, 'y', (by + 29).toFixed(1)); M.vis(lB, t, tS3 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    // each rod's own error band at its far end (true +-0.1, drawn 10x)
    const ew = 0.1 * PX * EX;
    attr(ebA, 'x', (X0 + 20 * PX - ew).toFixed(1)); M.vis(ebA, t, wt('S2', 'plus'), 1e9, { dy: 0, fade: 0.25 }); attr(ebAt, 'x', X0 + 20 * PX); M.vis(ebAt, t, wt('S2', 'plus'), 1e9, { dy: 6 });
    const bEnd = bx + 15 * PX;
    attr(ebB, 'x', (bEnd - ew).toFixed(1)); attr(ebB, 'y', (by - 10).toFixed(1)); M.vis(ebB, t, wt('S3', 'plus'), 1e9, { dy: 0, fade: 0.25 });
    attr(ebBt, 'x', bEnd.toFixed(1)); attr(ebBt, 'y', (add && j > 0.5 ? by + RH + 30 : by + RH + 30).toFixed(1)); M.vis(ebBt, t, wt('S3', 'plus'), 1e9, { dy: 6 });
    // end marker of Z (add) with ghost trails while it moves
    const endX = tt => add ? X0 + LA(tt) + LB(tt) : X0 + LA(tt);
    const ex = endX(t), eOn = add ? t > tS4 + 0.5 : t > wt('B1', 'Five') - 0.2;
    attr(endL, 'x1', ex.toFixed(1)); attr(endL, 'x2', ex.toFixed(1)); M.hide(endL, !eOn);
    ghostE.forEach((gl, k) => { const gx2 = endX(t - 0.1 * (k + 1)), mv = Math.abs(ex - gx2) > 1.5; attr(gl, 'x1', gx2.toFixed(1)); attr(gl, 'x2', gx2.toFixed(1)); gl.style.opacity = eOn && mv ? [0.3, 0.2, 0.12][k] : 0; });
    // Z bracket under rods (add)
    if (add) { attr(brZ, 'd', `M${X0},${RY + RH + 34} v12 H${ex.toFixed(1)} v-12`); attr(brZt, 'x', ((X0 + ex) / 2).toFixed(1)); attr(brZt, 'y', RY + RH + 80); M.setT(brZt, 'Z = A + B'); }
    M.hide(brZ, !(add && t > T0('S4') + 1.0)); brZt.style.opacity = add && t > T0('S4') + 1.0 ? 1 : 0;
    // overhang (subtract)
    attr(over, 'x', (X0 + lb).toFixed(1)); attr(over, 'width', Math.max(1, la - lb).toFixed(1)); M.hide(over, add || t < wt('B1', 'stick') - 0.1);
    attr(overT, 'x', (X0 + (la + lb) / 2).toFixed(1)); overT.style.opacity = !add && t > wt('B1', 'stick') ? 1 : 0;
    // final band +-0.2 around Z
    const bandOn = add ? M.io((t - wt('S7', 'plus') + 0.1) / 0.3) : M.io((t - wt('B5', 'plus') + 0.1) / 0.3);
    const zc = add ? X0 + 35 * PX : X0 + 20 * PX, zw = 0.2 * PX * EX;
    ebAt.style.opacity = add ? (1 - bandOn).toFixed(3) : 0; ebBt.style.opacity = (1 - bandOn).toFixed(3);
    attr(zBand, 'x', (zc - zw).toFixed(1)); zBand.style.opacity = (0.2 * bandOn).toFixed(3); attr(zBt, 'x', zc); zBt.style.opacity = bandOn.toFixed(3);
    // slow-mo tag during the first worst-case stretch
    M.vis($('#slo'), t, tS5 - 0.1, tS5 + 1.5, { dx: -16, dy: 0, outDur: 0.25 });
    // readout
    const z = zVal(t, add);
    M.setT($('#rA'), (20 + eA(t)).toFixed(2).replace(/0$/, '').replace(/\.$/, '.0')); M.setT($('#rB'), (15 + eB(t)).toFixed(2).replace(/0$/, '').replace(/\.$/, '.0'));
    M.setT($('#rZk'), add ? 'A + B' : 'A − B'); M.setT($('#rZ'), z.toFixed(2).replace(/0$/, '').replace(/\.$/, '.0'));
    const zc0 = add ? 35 : 5;
    M.vis($('#roG'), t, tS2, 1e9, { dy: 10 });
    // live error bar
    gTk.forEach((e, i) => M.setT(e, (zc0 - 0.4 + i * 0.2).toFixed(1)));
    M.setT($('#grL'), add ? 'LIVE ERROR BAR · Z = A + B' : 'LIVE ERROR BAR · Z = A − B');
    const ph0 = add ? tS4 : tB1; let lo = z, hi = z;
    for (let tt = ph0; tt < t; tt += 0.05) { const v = zVal(tt, add); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    M.setT($('#rE'), fmt1(Math.max(Math.abs(hi - zc0), Math.abs(lo - zc0))));
    attr(gBand, 'x', (gx(lo, zc0) - 14).toFixed(1)); attr(gBand, 'width', (gx(hi, zc0) - gx(lo, zc0) + 28).toFixed(1));
    attr(gDot, 'cx', gx(z, zc0).toFixed(1)); attr(gDt, 'x', gx(z, zc0).toFixed(1)); M.setT(gDt, z.toFixed(1));
    const gOn2 = add ? t > tS4 + 0.3 : t > wt('B1', 'Five') - 0.2; M.hide(gDot, !gOn2); M.hide(gDt, !gOn2); M.hide(gBand, !gOn2);
    avA(t, wt('B5', 'Even') + 0.3, out);
  }

  /* D: the rule for + and - */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 244], [tStep[2] - 0.1, 404]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[0] + 0.2, 1e9, { dx: 60, dy: 0 });
    [dA1, dB1].forEach((b, i) => attr(b, 'width', ([300, 220][i] * M.o3((t - tStep[0] - 0.4 - i * 0.2) / 0.6)).toFixed(1)));
    [[dT[0], tStep[0] + 0.5], [dT[2], tStep[0] + 0.7], [dAe, wt('D2', 'delta')], [dT[1], wt('D2', 'delta')], [dBe, wt('D2', 'delta', 1)], [dT[3], wt('D2', 'delta', 1)]].forEach(([e, tt]) => M.vis(e, t, tt - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    attr(dZa, 'width', (300 * M.o3((t - tStep[1]) / 0.6)).toFixed(1)); attr(dZb, 'width', (220 * M.o3((t - tStep[1] - 0.4) / 0.6)).toFixed(1));
    M.vis(dT[4], t, tStep[1] + 0.2, 1e9, { dy: 8 });
    M.vis(dZe1, t, wt('D3', 'delta') - 0.1, 1e9, { dx: -30, dy: 0 }); M.vis(dZe2, t, wt('D3', 'delta', 1) - 0.1, 1e9, { dx: -30, dy: 0 });
    M.vis(dT[5], t, tStep[2] + 0.3, 1e9, POP);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'When') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'errors') - 0.1, 0.8);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tM1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kaV'), t, wt('K1', 'thirty') - 0.1, 1e9, { dy: 14 });
    attr(kaB[0], 'width', (490 * M.o3((t - tK1 - 0.3) / 0.7)).toFixed(1)); M.vis(kaB[1], t, wt('K1', 'plus'), 1e9, { dy: 0, fade: 0.2 }); M.vis(kaB[2], t, wt('K1', 'plus') + 0.3, 1e9, { dy: 6 });
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kbV'), t, wt('K2', 'five') - 0.1, 1e9, { dy: 14 });
    attr(kbB[0], 'width', (70 * M.o3((t - T0('K2') - 0.3) / 0.7)).toFixed(1)); M.vis(kbB[1], t, wt('K2', 'same'), 1e9, { dy: 0, fade: 0.2 }); M.vis(kbB[2], t, wt('K2', 'same') + 0.3, 1e9, { dy: 6 });
    M.vis($('#kaC'), t, wt('K2', 'same') - 0.1, 1e9, POP); M.vis($('#kbC'), t, wt('K2', 'smaller') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'zero') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Errors') });
  }

  /* M: the table area */
  const mOn = t >= tM1 - 0.1 && t < tR1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('R1');
    M.vis($('#msim'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mro'), t, tM1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#mgr'), t, tM1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exM'), t, tM3 + 0.4, 1e9, { dy: 8 });
    const W = Wt(t), Wp = W * TP, gl = gL(t), gw = gW(t), L = 120 * TP, th = 0.1 * TP * SX;
    const gtb = M.o3((t - tM1 - 0.3) / 0.7);
    attr(tbl, 'height', Math.max(0.01, Wp * gtb).toFixed(1));
    attr(sL, 'y', (TY + Wp).toFixed(1)); attr(sL, 'width', L); attr(sL, 'height', Math.max(0.01, th * gw).toFixed(1)); M.hide(sL, gw <= 0);
    attr(sW, 'width', Math.max(0.01, th * gl).toFixed(1)); attr(sW, 'height', Wp.toFixed(1)); M.hide(sW, gl <= 0);
    attr(sC, 'y', (TY + Wp).toFixed(1)); attr(sC, 'width', (th * gl).toFixed(1)); attr(sC, 'height', (th * gw).toFixed(1)); M.hide(sC, gl * gw <= 0.01);
    ghS.forEach((r, k) => { const tt = t - 0.12 * (k + 1), a = gL(tt), b = gW(tt), mv = Math.abs(a - gl) + Math.abs(b - gw) > 0.01; attr(r, 'y', TY); attr(r, 'width', (L + th * a).toFixed(1)); attr(r, 'height', (Wp + th * b).toFixed(1)); r.style.opacity = mv ? [0.3, 0.2, 0.12][k] : 0; });
    M.vis($('#slo2'), t, tM3 - 0.1, tM3 + 2.0, { dx: -16, dy: 0, outDur: 0.25 });
    M.vis(mLt, t, tM1 + 0.8, 1e9, { dy: 6 }); attr(mWt, 'y', (TY + Wp / 2 + 10).toFixed(1)); M.vis(mWt, t, tM1 + 0.9, 1e9, { dy: 0 });
    const nar = wt('M9', 'narrower') - 0.3;
    attr(mSL, 'y', (TY + Wp + th + 34).toFixed(1)); M.vis(mSL, t, wt('M5', 'twelve') - 0.3, nar, { dy: 8 });
    attr(mSW, 'y', (TY + Wp / 2 - 4).toFixed(1)); M.vis(mSW, t, wt('M6', 'Six') - 0.3, nar, { dy: 8 });
    attr(mSC, 'y', (TY + Wp + th + 66).toFixed(1)); M.vis(mSC, t, wt('M6', 'corner') + 0.2, nar, { dy: 8 });
    // highlight the strip being spoken about
    const hiL = M.io((t - tM5) / 0.3) * (1 - M.io((t - tM6) / 0.3)), hiW = M.io((t - tM6) / 0.3) * (1 - M.io((t - tM7) / 0.3));
    sL.style.opacity = (0.5 + 0.4 * hiL).toFixed(3); sW.style.opacity = (0.5 + 0.4 * hiW).toFixed(3);
    // readout
    const dAr = 0.1 * 120 * gw + 0.1 * W * gl + 0.01 * gl * gw;
    M.setT($('#mW'), W.toFixed(1)); M.setT($('#mA'), Math.round(120 * W).toString()); M.setT($('#mE'), dAr.toFixed(1)); M.setT($('#mP'), (dAr / (120 * W) * 100).toFixed(2) + ' %');
    M.vis($('#mroG'), t, tM1 + 0.6, 1e9, { dy: 10 });
    // graph: % error against width, dot linked to the table
    const cu = M.io((t - tM9) / 1.2); mgC(s2 => [s2, pct(s2)], 10, 10 + 110 * cu);
    mgD(W, pct(W) * Math.min(1, gw + 0.0001) , t > tM8 - 0.2);
    avD(t, wt('M9', 'short') + 0.2, out);
  }

  /* R: rule for x and / */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RST.forEach((_, i) => { const el = $('#rst' + i); M.vis(el.querySelector('.n'), t, tR[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tR[i], 0.8); M.vis(el.querySelector('.why'), t, tR[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(78, [[tR[1] - 0.1, 200], [tR[2] - 0.1, 322], [tR[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiR'); M.vis(hb, t, tR[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 3).toFixed(1) + 'px';
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(rS1, t, wt('R2', 'extra') - 0.1, 1e9, { dy: -10, fade: 0.2 }); M.vis(rS1t, t, wt('R2', 'extra'), 1e9, { dy: 8 });
    M.vis(rS2, t, wt('R2', 'plus') - 0.1, 1e9, { dx: -10, dy: 0, fade: 0.2 }); M.vis(rS2t, t, wt('R2', 'plus'), 1e9, { dy: 8 });
    M.vis(rDiv, t, tR[1] + 0.3, 1e9, { dy: 8 });
    M.vis(rPill, t, tR[2] + 0.8, 1e9, POP);
  }

  /* C: side by side rules + think */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#ca'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#caF'), t, wt('C1', 'add', 1) - 0.1, 0.7); M.vis($('#caC'), t, wt('C1', 'absolute') - 0.1, 1e9, POP); M.vis($('#caU'), t, wt('C1', 'centimetres') - 0.1, 1e9, POP);
    M.vis($('#cb'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#cbF'), t, wt('C2', 'add') - 0.1, 0.8); M.vis($('#cbC'), t, wt('C2', 'relative') - 0.1, 1e9, POP); M.vis($('#cbU'), t, wt('C2', 'percentages') - 0.3, 1e9, POP);
    M.vis($('#th2'), t, tC3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC3, tOpts: wt('C3', 'one', 1) - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'Division') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wBars.forEach(([b, l, v], i) => { const tt = [tW[0], tW[1], tW[2]][i], u = M.o3((t - tt - 0.3) / 0.8), w = (i < 2 ? v : 0.25) * WB * u; attr(b, 'width', Math.max(0.01, i === 2 ? w : w).toFixed(1)); M.hide(b, u <= 0); attr(l, 'x', (130 + w + 6).toFixed(1)); l.style.opacity = M.clamp((t - tt - 0.8) / 0.3).toFixed(3); });
    // area bar shows its two shares: the L share in blue on top of the orange total
    const u3 = M.o3((t - tW[2] - 0.3) / 0.8); attr(wSeg, 'width', Math.max(0.01, 0.1 / 120 * 100 * WB * u3).toFixed(1)); M.hide(wSeg, u3 <= 0);
    M.vis($('#wP'), t, wt('W5', 'percent') - 0.2, 1e9, POP);
    const rc = $('#resC'); M.vis(rc, t, tW[4] + 0.2, 1e9, POP); rc.style.left = (392 - rc.offsetWidth / 2).toFixed(0) + 'px';
  }

  /* X: trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'subtract') - 0.1, tStrike: wt('X3', 'always') - 0.1, tRight: wt('X3', 'always') + 0.3 });
    trL.forEach((e, i) => M.vis(e, t, wt('X3', 'Delta') + i * 0.6, 1e9, { dx: -14, dy: 0 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
