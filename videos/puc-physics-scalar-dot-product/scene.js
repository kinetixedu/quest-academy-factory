// PUC Physics Ep 71: Scalar (dot) product (Motion notebook, Aarav's suitcase: a slanted pull and its shadow on the floor)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ac, BC = C.violet, FC = C.orange, DC = C.violet, TH = C.gold, KC = C.gold;   // A blue, B violet, F orange, d violet, theta gold, k-hat gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const vA = tc(AC, '\\vec{A}'), vB = tc(BC, '\\vec{B}'), sA = tc(AC, 'A'), sB = tc(BC, 'B'), th = tc(TH, '\\theta');
const ih = tc(AC, '\\hat{i}'), jh = tc(BC, '\\hat{j}'), kh = tc(KC, '\\hat{k}');
const D2R = Math.PI / 180, cosd = a => Math.cos(a * D2R), sind = a => Math.sin(a * D2R);
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);

Object.assign(M.IC, {
  suitcase: ['M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z', 'M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2', 'M8 22a1 1 0 1 0 0-.01', 'M16 22a1 1 0 1 0 0-.01'],
  car: ['M5 16h14l-1.5-5h-11z', 'M7 11l2-4h6l2 4', 'M8 19a2 2 0 1 0 0-.01', 'M16 19a2 2 0 1 0 0-.01'],
  mower: ['M4 14h11v4H4z', 'M15 14l5-10', 'M6 21a2 2 0 1 0 0-.01', 'M13 21a2 2 0 1 0 0-.01'],
  slant: ['M4 20L20 6', 'M14 6h6v6'],
  arrowL: ['M19 12H5', 'm12 19-7-7 7-7'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook: three slanted pulls ---------- */
const JOBS = [['suitcase', 'Suitcase', 'PULLED BY ITS HANDLE', 'suitcase', 40, 1], ['car', 'Toy car', 'TOWED ON A STRING', 'car', 22, 1], ['mower', 'Lawn mower', 'PUSHED ON A LONG HANDLE', 'mower', 35, -1]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="js${i}" width="300" height="120"></svg></div>`).join('');
const JR = JOBS.map(([, , , , ang, dir], i) => {
  const s = $('#js' + i), gy = 96, bx = 40, by = gy - 36;
  mk(s, 'line', { x1: 6, y1: gy, x2: 294, y2: gy, stroke: C.dim, 'stroke-width': 2.5 });
  mk(s, 'rect', { x: bx, y: by, width: 54, height: 34, rx: 6, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2 });
  // pull: from the front of the object, up and forward; push (mower): from behind, down and forward
  const px = dir > 0 ? bx + 54 : bx, py = by + 4, L = 120;
  const ex = dir > 0 ? px + L * cosd(ang) : px - L * cosd(ang), ey = py - L * sind(ang);
  const f = PUC.arrow(s, FC, 5, 14), m = PUC.arrow(s, DC, 5, 14);
  return { f, m, px, py, ex, ey, dir, gy };
});
const TILES = [['help', 'How much moves it forward?'], ['slant', 'All 40 N?'], ['arrowR', 'Or less?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, i ? FC : C.ink, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'forward'), wt('H4', 'All'), wt('H4', 'less')];
// hook sketch: Aarav's suitcase, 40 N along a slanted handle
const hs = $('#hkS'), HF = 300, HP = [150, 172];
mk(hs, 'line', { x1: 14, y1: HF, x2: 396, y2: HF, stroke: C.ink, 'stroke-width': 3 });
for (let x = 24; x < 396; x += 26) mk(hs, 'line', { x1: x, y1: HF + 4, x2: x - 12, y2: HF + 16, stroke: C.dim, 'stroke-width': 2 });
const hBox = mk(hs, 'g', {});
mk(hBox, 'rect', { x: 50, y: 172, width: 100, height: 112, rx: 10, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
mk(hBox, 'line', { x1: 66, y1: 196, x2: 134, y2: 196, stroke: C.ink, 'stroke-width': 2, opacity: 0.5 });
[72, 128].forEach(x => mk(hBox, 'circle', { cx: x, cy: HF - 8, r: 8, fill: C.ink }));
const hH = mk(hs, 'line', { x1: HP[0], y1: HP[1], x2: HP[0] + 170 * cosd(40), y2: HP[1] - 170 * sind(40), stroke: C.ink2, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hF = PUC.arrow(hs, FC, 7, 18), hFl = it(hs, 206, 82, 'F = 40 N', FC, { 'font-size': 24 });
const hQ = mk(hs, 'path', { d: `M${HP[0]},${HF + 36} H${HP[0] + 118}`, stroke: FC, 'stroke-width': 4, 'stroke-dasharray': '8 8', fill: 'none', 'stroke-linecap': 'round' });
const hQl = txt(hs, HP[0] + 132, HF + 46, '?', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: FC });
const hTh = mk(hs, 'path', { d: `M${HP[0] + 44},${HP[1]} A44,44 0 0 0 ${(HP[0] + 44 * cosd(40)).toFixed(1)},${(HP[1] - 44 * sind(40)).toFixed(1)}`, stroke: TH, 'stroke-width': 2.5, fill: 'none' });
const hThl = it(hs, HP[0] + 52, HP[1] - 8, 'θ', TH, { 'font-size': 24 });
mk(hs, 'line', { x1: HP[0], y1: HP[1], x2: HP[0] + 70, y2: HP[1], stroke: C.mute, 'stroke-width': 1.5, 'stroke-dasharray': '4 5' });

/* ---------- P: torch, stick, shadow ---------- */
const pl = $('#plS'), PF = 440, PB = [210, PF - 6];
mk(pl, 'line', { x1: 40, y1: PF, x2: 744, y2: PF, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(pl, 'line', { x1: x, y1: PF + 4, x2: x - 14, y2: PF + 18, stroke: C.dim, 'stroke-width': 2 });
const light = mk(pl, 'path', { d: `M330,170 L454,170 L640,${PF} L144,${PF} Z`, fill: '#F6E7B8', opacity: 0.55 });
const torch = mk(pl, 'g', {});
mk(torch, 'rect', { x: 352, y: 94, width: 80, height: 54, rx: 10, fill: C.ink2, stroke: C.ink, 'stroke-width': 2.5 });
mk(torch, 'path', { d: 'M340,148 H444 L454,170 H330 Z', fill: '#E8C25A', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
txt(torch, 470, 130, 'TORCH', { 'font-size': 16, 'letter-spacing': 2 });
const rays = [200, 300, 400, 500, 600].map(x => mk(pl, 'line', { x1: 392 + (x - 392) * 0.32, y1: 176, x2: x, y2: PF - 8, stroke: '#D9A92E', 'stroke-width': 2, 'stroke-dasharray': '6 8', opacity: 0.7 }));
const shBand = mk(pl, 'line', { y1: PF - 1, y2: PF - 1, stroke: C.ink, 'stroke-width': 12, 'stroke-linecap': 'butt', opacity: 0.55 });
const stickO = mk(pl, 'line', { x1: PB[0], y1: PB[1], stroke: C.ink, 'stroke-width': 18, 'stroke-linecap': 'round' });
const stick = mk(pl, 'line', { x1: PB[0], y1: PB[1], stroke: '#C9A27A', 'stroke-width': 11, 'stroke-linecap': 'round' });
const pDrop = mk(pl, 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0.6 });
const pStL = txt(pl, 0, 0, 'STICK', { 'font-size': 17, 'font-weight': 600, fill: C.ink, 'letter-spacing': 2 });
const pShL = txt(pl, 0, PF + 46, 'SHADOW', { 'font-size': 17, 'font-weight': 600, fill: C.ink, 'letter-spacing': 2, 'text-anchor': 'middle' });
const tStick = wt('P2', 'slanted'), tShadow = wt('P2', 'shadow');
const phiK = M.keys([[0, 34], [wt('P3', 'part') - 0.2, 58], [wt('P3', 'floor') - 0.1, 22]], 1.1);
// right: two arrows, the shadow of A on B
const pr = $('#prS'), PO = [110, 320], PA = 250, PBL = 440, PTH = 48;
const pBl = mk(pr, 'line', { x1: PO[0], y1: PO[1], x2: PO[0] + PBL + 160, y2: PO[1], stroke: BC, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0.5 });
const pB = PUC.arrow(pr, BC, 6, 18), pA = PUC.arrow(pr, AC, 6, 18);
const pAl = it(pr, PO[0] + PA * cosd(PTH) - 30, PO[1] - PA * sind(PTH) - 14, 'A', AC), pBlb = it(pr, PO[0] + PBL - 14, PO[1] + 42, 'B', BC);
const pArc = mk(pr, 'path', { d: `M${PO[0] + 60},${PO[1]} A60,60 0 0 0 ${(PO[0] + 60 * cosd(PTH)).toFixed(1)},${(PO[1] - 60 * sind(PTH)).toFixed(1)}`, stroke: TH, 'stroke-width': 2.5, fill: 'none' });
const pThl = it(pr, PO[0] + 70, PO[1] - 22, 'θ', TH, { 'font-size': 26 });
const pDr = mk(pr, 'line', { x1: PO[0] + PA * cosd(PTH), y1: PO[1] - PA * sind(PTH), x2: PO[0] + PA * cosd(PTH), y2: PO[1], stroke: AC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const pSh = mk(pr, 'line', { x1: PO[0], y1: PO[1], x2: PO[0] + PA * cosd(PTH), y2: PO[1], stroke: AC, 'stroke-width': 14, opacity: 0.35 });
const pBr = mk(pr, 'path', { d: `M${PO[0]},${PO[1] + 20} v10 H${(PO[0] + PA * cosd(PTH)).toFixed(1)} v-10`, stroke: AC, 'stroke-width': 2.5, fill: 'none' });
const pShl = txt(pr, PO[0] + PA * cosd(PTH) / 2, PO[1] + 62, 'shadow of A on B', { 'text-anchor': 'middle', fill: AC, 'font-size': 18, 'font-weight': 600 });
$('#prF').innerHTML = K(`${vA}\\cdot${vB} = (\\text{shadow of } ${sA} \\text{ on } ${sB}) \\times ${sB}`);

/* ---------- S: Aarav's suitcase (sim) ---------- */
const s = $('#simS'), FY = 430, SW_ = 120, SH = 150, HL = 190, FS = 4, X0 = 70;   // 4 px per newton, handle 190 px
const SY = FY - 18 - SH, V0 = 26;                                                 // body top; 26 px/s forward at theta = 0
mk(s, 'line', { x1: 30, y1: FY, x2: 754, y2: FY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 42; x < 754; x += 28) mk(s, 'line', { x1: x, y1: FY + 4, x2: x - 14, y2: FY + 18, stroke: C.dim, 'stroke-width': 2 });
const ghosts = [0, 1, 2].map(() => { const g0 = mk(s, 'g', {}), gg = mk(g0, 'g', { opacity: 0 }); mk(gg, 'rect', { x: 0, y: SY, width: SW_, height: SH, rx: 12, fill: C.ink }); [24, 96].forEach(x => mk(gg, 'circle', { cx: x, cy: FY - 14, r: 14, fill: C.ink })); return gg; });
const sDropT = mk(s, 'line', { stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), sDropP = mk(s, 'line', { stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const sRef = mk(s, 'line', { stroke: C.mute, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' });
const suit = mk(s, 'g', {});
mk(suit, 'rect', { x: 0, y: SY, width: SW_, height: SH, rx: 12, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3 });
mk(suit, 'line', { x1: 18, y1: SY + 34, x2: SW_ - 18, y2: SY + 34, stroke: C.ink, 'stroke-width': 2, opacity: 0.45 });
mk(suit, 'line', { x1: 18, y1: SY + SH - 30, x2: SW_ - 18, y2: SY + SH - 30, stroke: C.ink, 'stroke-width': 2, opacity: 0.45 });
const wheels = [24, 96].map(x => { const w = mk(suit, 'g', {}); mk(w, 'circle', { cx: 0, cy: 0, r: 14, fill: C.ink }); mk(w, 'line', { x1: -9, y1: 0, x2: 9, y2: 0, stroke: '#fff', 'stroke-width': 2.5 }); mk(w, 'line', { x1: 0, y1: -9, x2: 0, y2: 9, stroke: '#fff', 'stroke-width': 2.5 }); return [w, x]; });
const handle = mk(s, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const grip = mk(s, 'circle', { r: 10, fill: C.ink2 });
const sArc = mk(s, 'path', { stroke: TH, 'stroke-width': 3, fill: 'none' }), sThl = it(s, 0, 0, 'θ', TH, { 'font-size': 28 });
const sF = PUC.arrow(s, FC, 7, 20), sSh = PUC.arrow(s, FC, 7, 20), sD = PUC.arrow(s, DC, 6, 18);
const sFl = it(s, 0, 0, 'F', FC, { 'font-size': 30 }), sShl = it(s, 0, 0, 'F cos θ', FC, { 'font-size': 26 }), sDl = it(s, 0, 0, 'd', DC, { 'font-size': 30 });
const SHY = FY + 40;
// angle in the first run: 0, raised to 60 on "raises", 90 on "ninety"
const tGo = wt('S2', 'handle') - 0.2, tRaise = wt('S3', 'raises'), tNin = wt('S5', 'ninety');
const thMain = M.keys([[0, 0], [tRaise, 60], [tNin, 90]], 1.2);
// forward speed follows V0 cos(theta) with a short lag (rolling, then rolling to a stop)
const TAB = [], DT = 1 / 60; { let x = X0, v = 0; for (let tt = tS1 - 0.5; tt <= tS6 + 0.5; tt += DT) { const tgt = tt < tGo ? 0 : V0 * cosd(thMain(tt)); v += (tgt - v) * Math.min(1, DT / 0.45); x += v * DT; TAB.push(x); } }
const xMain = t => { const i = (t - (tS1 - 0.5)) / DT; if (i <= 0) return TAB[0]; if (i >= TAB.length - 1) return TAB[TAB.length - 1]; const a = Math.floor(i); return TAB[a] + (TAB[a + 1] - TAB[a]) * (i - a); };
// slow-mo replay at 60 degrees: freeze, vectors grow, then resume at 0.25x
const tRep = tS6 + 0.05, tRes = wt('S7', 'moves') - 0.1, xRep = xMain(wt('S3', 'shadow')), vRep = 0.25 * V0 * cosd(60);
const tG8 = wt('S8', 'grows') - 0.3;
const thS = t => t < tRep ? thMain(t) : t < tS8 ? 60 : 60 - 60 * M.io((t - tS8) / 0.8) + 90 * M.io((t - tG8) / 2.4);
const xS = t => t < tRep ? xMain(t) : xRep + vRep * M.clamp(t - tRes, 0, tS8 - tRes);
$('#roG').innerHTML = `<span class="k" style="color:${TH}">θ</span><span class="v" id="r_th" style="color:${TH}">0</span><span class="u">°</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_F" style="color:${FC}">40.0</span><span class="u">N</span>
  <span class="k" style="color:${FC}">F <span style="font-style:normal">cos</span> <span style="color:${TH}">θ</span></span><span class="v" id="r_fc" style="color:${FC}">40.0</span><span class="u">N</span>
  <span class="k" style="color:${C.ink}"><span style="font-style:normal">cos</span> <span style="color:${TH}">θ</span></span><span class="v" id="r_c">1.000</span><span class="u"></span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 70, w: 560, h: 150, xmax: 90, ymax: 40, xt: [0, 30, 60, 90], yt: [0, 20, 40], xl: '', yl: '' });
txt($('#grS'), 690, 226, 'θ (°)', { fill: TH, 'font-weight': 600 });
const gc = g.curve(FC), gd = g.dot(FC, 11);
const gGu = mk($('#grS'), 'line', { stroke: TH, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So a flatter handle pulls me forward more.' });

/* ---------- D: the formula ---------- */
const STEPS = [[`${th} = \\text{angle between } ${vA} \\text{ and } ${vB}`, 'measured tail to tail'],
  [`\\text{shadow of } ${sA} \\text{ on } ${sB} = ${sA}\\cos${th}`, 'cos θ = fraction kept: 1 at 0°, 0.5 at 60°, 0 at 90°'],
  [`${vA}\\cdot${vB} = ${sA}\\,${sB}\\cos${th}`, 'the shadow times the length of B'],
  [`${vA}\\cdot${vB} = ${vB}\\cdot${vA}`, 'shadow of B on A, times A: the same number']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Theta'), wt('D3', 'shadow'), wt('D4', 'Multiply'), wt('D5', 'shadow')];
const dS = $('#drS'), DO = [140, 410], DU = 65, DA = 4, DB = 5;          // 65 px per unit, A = 4, B = 5 (example figures)
const dBl = mk(dS, 'line', { x1: 60, y1: DO[1], x2: 744, y2: DO[1], stroke: BC, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0.45 });
const dAl = mk(dS, 'line', { stroke: AC, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0.45 });
const dShA = mk(dS, 'line', { stroke: AC, 'stroke-width': 14, opacity: 0.32 }), dShB = mk(dS, 'line', { stroke: BC, 'stroke-width': 14, opacity: 0.32 });
const dDrA = mk(dS, 'line', { stroke: AC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }), dDrB = mk(dS, 'line', { stroke: BC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dB = PUC.arrow(dS, BC, 6, 18), dA = PUC.arrow(dS, AC, 6, 18);
const dArc = mk(dS, 'path', { stroke: TH, 'stroke-width': 2.5, fill: 'none' }), dThl = it(dS, 0, 0, 'θ', TH, { 'font-size': 26 });
const dAlb = it(dS, 0, 0, 'A = 4', AC, { 'font-size': 26 }), dBlb = it(dS, DO[0] + DB * DU - 60, DO[1] + 44, 'B = 5', BC, { 'font-size': 26 });
const dTail = mk(dS, 'circle', { cx: DO[0], cy: DO[1], r: 9, fill: C.ink });
const dTailR = mk(dS, 'circle', { cx: DO[0], cy: DO[1], r: 22, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const dTailL = txt(dS, DO[0] - 20, DO[1] + 50, 'TAILS TOGETHER', { 'font-size': 16, 'font-weight': 600, fill: C.ink, 'letter-spacing': 1.5 });
const dShAl = txt(dS, 0, 0, 'A cos θ', { fill: AC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const dShBl = txt(dS, 0, 0, 'B cos θ', { fill: BC, 'font-size': 20, 'font-weight': 600 });
const tZ = wt('D3', 'zero'), tSx = wt('D3', 'sixty'), tNn = wt('D3', 'ninety');
const thD = M.keys([[0, 40], [tZ - 0.3, 0], [tSx - 0.3, 60], [tNn - 0.3, 90], [T0('D4') - 0.2, 40]], 0.6);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vA}\\cdot${vB} = ${sA}\\,${sB}\\cos${th}`);

/* ---------- C: side by side, the angle decides the sign ---------- */
const CS = [[$('#c0S'), 60, [170, 250]], [$('#c1S'), 120, [400, 250]]].map(([sv, ang, O]) => {
  const LA = 190, LB = 270, ax = O[0] + LA * cosd(ang), ay = O[1] - LA * sind(ang);
  mk(sv, 'line', { x1: 20, y1: O[1], x2: 692, y2: O[1], stroke: BC, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0.45 });
  const sh = mk(sv, 'line', { x1: O[0], y1: O[1], x2: ax, y2: O[1], stroke: AC, 'stroke-width': 14, opacity: 0.32 });
  const dr = mk(sv, 'line', { x1: ax, y1: ay, x2: ax, y2: O[1], stroke: AC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
  const b = PUC.arrow(sv, BC, 6, 18), a = PUC.arrow(sv, AC, 6, 18);
  const arc = mk(sv, 'path', { d: `M${O[0] + 50},${O[1]} A50,50 0 0 0 ${(O[0] + 50 * cosd(ang)).toFixed(1)},${(O[1] - 50 * sind(ang)).toFixed(1)}`, stroke: TH, 'stroke-width': 2.5, fill: 'none' });
  const thl = it(sv, O[0] + 58 * cosd(ang / 2) - 6, O[1] - 58 * sind(ang / 2) - 2, 'θ', TH, { 'font-size': 24 });
  const al = it(sv, ax + (ang < 90 ? 14 : -40), ay + 4, 'A', AC, { 'font-size': 28 }), bl = it(sv, O[0] + LB - 20, O[1] + 40, 'B', BC, { 'font-size': 28 });
  const sl = txt(sv, (O[0] + ax) / 2, O[1] + 70, ang < 90 ? 'SHADOW FORWARD' : 'SHADOW BACKWARD', { 'text-anchor': 'middle', fill: AC, 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.5 });
  return { O, ax, ay, LB, sh, dr, a, b, arc, thl, al, bl, sl };
});
$('#c0a').innerHTML = K(`${vA}\\cdot${vB} = ${sA}${sB}\\cos 60^\\circ = +\\tfrac{1}{2}${sA}${sB}`);
$('#c1a').innerHTML = K(`${vA}\\cdot${vB} = ${sA}${sB}\\cos 120^\\circ = -\\tfrac{1}{2}${sA}${sB}`);
const th1 = PUC.think($('#th1'), { q: 'θ is exactly 90°. Is the dot product positive, negative or zero?', opts: ['Positive', 'Negative', 'Zero'], right: 2, why: 'At 90° the shadow is just a point, and cos 90° = 0.' });
const avD = PUC.avatar($('#sC'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Backward shadow, so a minus sign.' });

/* ---------- R: unit vectors, link by link ---------- */
const UV = [ih, jh, kh], GX0 = 36, GY0 = 84;
$('#grid').innerHTML = `<div class="gh" style="left:${GX0}px;top:${GY0}px">${K('\\cdot')}</div>` +
  UV.map((u, c) => `<div class="gh" id="gch${c}" style="left:${GX0 + 116 * (c + 1)}px;top:${GY0}px">${K(u)}</div><div class="gh" id="grh${c}" style="left:${GX0}px;top:${GY0 + 64 + 104 * c + 20}px">${K(u)}</div>`).join('') +
  [0, 1, 2].map(r => [0, 1, 2].map(c => `<div class="gc" id="gc${r}${c}" style="left:${GX0 + 116 * (c + 1)}px;top:${GY0 + 64 + 104 * r}px">${r === c ? 1 : 0}</div>`).join('')).join('') +
  `<div class="pillp" id="grP" style="left:36px;top:490px">Matching pair: 1 &nbsp;·&nbsp; mixed pair: 0</div>`;
const tCell = [[wt('R2', 'one'), wt('R3', 'zero'), wt('R3', 'k', 1)], [wt('R3', 'zero'), wt('R2', 'one') + 0.35, wt('R3', 'j', 1)], [wt('R3', 'k', 1), wt('R3', 'j', 1), wt('R2', 'one') + 0.7]];
const ax = $('#axS'), AO = [640, 250];
const aI = PUC.arrow(ax, AC, 5, 16), aJ = PUC.arrow(ax, BC, 5, 16), aK = PUC.arrow(ax, KC, 5, 16);
const aIl = it(ax, AO[0] + 92, AO[1] + 10, 'î', AC, { 'font-size': 30 }), aJl = it(ax, AO[0] - 8, AO[1] - 98, 'ĵ', BC, { 'font-size': 30 }), aKl = it(ax, AO[0] - 84, AO[1] + 80, 'k̂', KC, { 'font-size': 30 });
const aR = mk(ax, 'path', { d: `M${AO[0] + 22},${AO[1]} V${AO[1] - 22} H${AO[0]}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
const aTag = txt(ax, AO[0], AO[1] + 130, 'EACH PAIR AT 90°', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.ink, 'letter-spacing': 1.5 });
const LKS = [`${K(`${ih}\\cdot${ih} = 1`)}&nbsp; <span style="color:var(--mute);font-weight:500">same way, θ = 0°</span>`,
  `${K(`${ih}\\cdot${jh} = 0`)}&nbsp; <span style="color:var(--mute);font-weight:500">right angle, θ = 90°</span>`,
  `Multiply out: every mixed pair gives 0`,
  `${K(`${vA}\\cdot${vB} = A_xB_x + A_yB_y + A_zB_z`)}`];
$('#lks').innerHTML = LKS.map((l, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), wt('R5', 'Only')];
const th2 = PUC.think($('#th2'), { q: `${K(`${vA} = 3${ih} + 4${jh}`)} and ${K(`${vB} = 4${ih} - 3${jh}`)}. Are they at right angles?`, opts: ['Yes', 'No'], right: 0, why: `${K('\\vec A\\cdot\\vec B = 12 - 12 = 0')}, and zero means exactly 90°.` });
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Only the matching pairs survive!' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${vA} = 2${ih} + 2${jh} + ${kh}`)}, &nbsp;${K(`${vB} = 3${ih} + 4${kh}`)}.<br>Find ${K(`${vA}\\cdot${vB}`)} and the angle ${K(th)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${vA}\\cdot${vB} = (2)(3) + (2)(0) + (1)(4) = 10`)],
  [K(`${sA} = \\sqrt{4+4+1} = 3,\\;\\; ${sB} = \\sqrt{9+16} = 5`)],
  [K(`\\cos${th} = \\dfrac{${vA}\\cdot${vB}}{${sA}${sB}} = \\dfrac{10}{15} = \\dfrac{2}{3}`)],
  [K(`${th} = \\cos^{-1}(2/3) \\approx 48^\\circ`)]], { label: 'WORKED EXAMPLE', y0: 184, dy: 104 });
const tW = [wt('W3', 'Multiply'), wt('W4', 'sizes'), wt('W5', 'Cos'), wt('W6', 'theta')];
const TCOL = [96, 262, 392, 522, 668];
$('#tbl').innerHTML = ['x', 'y', 'z'].map((h, c) => `<div class="tbh" style="left:${TCOL[c + 1] - 50}px;width:100px;top:72px">${h.toUpperCase()}</div>`).join('') + `<div class="tbh" style="left:${TCOL[4] - 70}px;width:140px;top:72px">ADD</div>` +
  [[sA, [2, 2, 1], AC], [sB, [3, 0, 4], BC], ['\\times', [6, 0, 4], C.ink]].map(([lb, vv, col], r) => `<div class="tr" id="tr${r}" style="top:${116 + r * 80}px"></div><div class="tb" style="left:${TCOL[0] - 60}px;width:120px;top:${120 + r * 80}px">${K(r < 2 ? lb : `${sA}${lb}${sB}`)}</div>` +
    vv.map((v, c) => `<div class="tb" id="tb${r}${c}" style="left:${TCOL[c + 1] - 50}px;width:100px;top:${120 + r * 80}px;color:${col}">${v}</div>`).join('')).join('') +
  `<div class="tb" id="tbS" style="left:${TCOL[4] - 70}px;width:140px;top:280px;color:var(--ink)">= 10</div>`;
const tTb = [wt('W3', 'Six'), wt('W3', 'zero'), wt('W3', 'four')], tSum = wt('W3', 'ten');
const ws = $('#wrS'), WO = [100, 548], WU = 64, WTH = Math.acos(2 / 3) / D2R;     // true sizes 3 and 5, true angle 48.19 degrees
const wB = PUC.arrow(ws, BC, 6, 18), wA = PUC.arrow(ws, AC, 6, 18);
const wArc = mk(ws, 'path', { d: `M${WO[0] + 62},${WO[1]} A62,62 0 0 0 ${(WO[0] + 62 * cosd(WTH)).toFixed(1)},${(WO[1] - 62 * sind(WTH)).toFixed(1)}`, stroke: TH, 'stroke-width': 2.5, fill: 'none' });
const wThl = it(ws, WO[0] + 70, WO[1] - 18, 'θ', TH, { 'font-size': 24 });
const wAl = it(ws, WO[0] + 3 * WU * cosd(WTH) - 92, WO[1] - 3 * WU * sind(WTH) + 4, '|A| = 3', AC, { 'font-size': 22 }), wBl = it(ws, WO[0] + 5 * WU - 40, WO[1] - 14, '|B| = 5', BC, { 'font-size': 22 });
$('#wc2').innerHTML = `θ ≈ 48°`;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${vA}\\cdot${vB} = 6${ih} + 4${kh}`)} &nbsp;(kept the arrows)`, right: `${K(`${vA}\\cdot${vB} = 6 + 0 + 4 = 10`)} &nbsp;(one plain number)` });
const tg = $('#tg');
const tgA = PUC.arrow(tg, C.ink, 6, 18); const tgX = mk(tg, 'path', { d: 'M90,60 L170,140 M170,60 L90,140', stroke: C.red, 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none' });
const tgN = txt(tg, 300, 128, '10', { 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 600, fill: C.ink });
const tgL0 = txt(tg, 130, 196, 'NOT AN ARROW', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.red, 'letter-spacing': 1.5 });
const tgL1 = txt(tg, 300, 196, 'A NUMBER', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: C.ok, 'letter-spacing': 1.5 });
const where = PUC.where($('#wa'), { on: [], type: 'Angle between two vectors, right-angle checks, and work as F · d' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `${K(`${vA} = 4${ih} - 2${jh} + 4${kh}`)} and ${K(`${vB} = 3${jh} + 4${kh}`)}.<br>What is the component of ${K(vA)} along ${K(vB)}?`, qW: 780,
  opts: [K('2'), K('5/3'), K('10'), K('4.4')], right: 0, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${vA}\\cdot${vB} = 0 - 6 + 16 = 10`)], [K(`${sB} = \\sqrt{9 + 16} = 5`)], [K(`\\text{shadow} = \\dfrac{${vA}\\cdot${vB}}{${sB}}`)], [K(`= 10/5 = 2 \\;\\Rightarrow\\; \\textbf{A}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'dot'), wt('A3', 'size'), wt('A4', 'shadow'), wt('A4', 'Ten')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · the dot product', y0: 104, dy: 92, txt: [0, 0, 0, 1],
  lines: [K(`${vA}\\cdot${vB} = ${sA}${sB}\\cos${th} = ${vB}\\cdot${vA}`), K(`${vA}\\cdot${vB} = A_xB_x + A_yB_y + A_zB_z`),
    K(`${ih}\\cdot${ih} = 1 \\qquad ${ih}\\cdot${jh} = 0 \\qquad \\cos${th} = ${vA}\\cdot${vB}\\,/\\,${sA}${sB}`),
    `<span class="th">θ</span> &lt; 90°: positive &nbsp;·&nbsp; <span class="th">θ</span> = 90°: zero &nbsp;·&nbsp; <span class="th">θ</span> &gt; 90°: negative`] });
const YQ = ['Why is the dot product a scalar, and not a vector?', 'When is the dot product of two vectors zero?', 'Why does a lower handle help Aarav pull his suitcase forward?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 72', topic: 'Carry a bag, do no work? Work Done by a Constant Force', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.06, 960, 540], [tS8 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px';
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
}
const seg = (ln, x1, y1, x2, y2) => { attr(ln, 'x1', x1.toFixed(1)); attr(ln, 'y1', y1.toFixed(1)); attr(ln, 'x2', x2.toFixed(1)); attr(ln, 'y2', y2.toFixed(1)); };
const arcD = (cx, cy, r, a0, a1) => `M${(cx + r * cosd(a0)).toFixed(1)},${(cy - r * sind(a0)).toFixed(1)} A${r},${r} 0 0 0 ${(cx + r * cosd(a1)).toFixed(1)},${(cy - r * sind(a1)).toFixed(1)}`;

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JR.forEach((r, i) => {
      vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const uf = M.o3((t - wt('H2', 'pull') + 0.1 - i * 0.12) / 0.5), um = M.o3((t - wt('H2', 'moves') + 0.1 - i * 0.12) / 0.5);
      r.f.set(r.px + (r.ex - r.px) * (r.dir > 0 ? 0 : 1), r.py + (r.ey - r.py) * (r.dir > 0 ? 0 : 1), r.dir > 0 ? r.px + (r.ex - r.px) * uf : r.ex + (r.px - r.ex) * uf, r.dir > 0 ? r.py + (r.ey - r.py) * uf : r.ey + (r.py - r.ey) * uf);
      r.m.set(150, r.gy - 18, 150 + 120 * um, r.gy - 18);
    });
    vis($('#hjP'), t, wt('H2', 'ground') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    vis($('#hkSk'), t, wt('H3', 'drags') - 0.1, 1e9, { dy: 20 });
    M.draw(hH, t, wt('H3', 'drags') + 0.1, 0.5);
    const uf = M.o3((t - wt('H3', 'forty') + 0.1) / 0.5); hF.set(HP[0], HP[1], HP[0] + 120 * cosd(40) * uf, HP[1] - 120 * sind(40) * uf);
    vis(hFl, t, wt('H3', 'newtons') - 0.1, 1e9, { dy: 6 });
    M.draw(hTh, t, wt('H3', 'slanted') - 0.1, 0.4); vis(hThl, t, wt('H3', 'slanted') + 0.1, 1e9, { dy: 6 });
    M.draw(hQ, t, wt('H4', 'forward') - 0.2, 0.5); vis(hQl, t, wt('H4', 'forward') + 0.1, 1e9, { dy: 6 });
    TILES.forEach((_, i) => { const el = $('#wq' + i); vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (1 - M.io((t - (i < 2 ? tTile[i + 1] : T0('H5'))) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* P: torch, stick, shadow -> the dot product */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis(torch, t, wt('P2', 'torch') - 0.15, 1e9, { dy: -20 });
    const lu = M.io((t - wt('P2', 'straight')) / 0.4); light.style.opacity = (0.55 * lu).toFixed(3); rays.forEach(r => { r.style.opacity = (0.7 * lu).toFixed(3); });
    const phi = phiK(t), su = M.o3((t - tStick + 0.1) / 0.6), L = 300 * su, ex = PB[0] + L * cosd(phi), ey = PB[1] - L * sind(phi);
    seg(stickO, PB[0], PB[1], ex, ey); seg(stick, PB[0], PB[1], ex, ey); M.hide(stickO, su < 0.01); M.hide(stick, su < 0.01);
    const shu = M.io((t - tShadow + 0.1) / 0.4);
    seg(shBand, PB[0], PF - 1, PB[0] + (ex - PB[0]) * shu, PF - 1); M.hide(shBand, shu < 0.01);
    seg(pDrop, ex, ey, ex, PF - 8); pDrop.style.opacity = (0.6 * shu).toFixed(3);
    attr(pStL, 'x', (PB[0] + 150 * cosd(phi) + 26).toFixed(1)); attr(pStL, 'y', (PB[1] - 150 * sind(phi) + 12).toFixed(1)); pStL.style.opacity = su.toFixed(3);
    attr(pShL, 'x', (PB[0] + (ex - PB[0]) / 2).toFixed(1)); pShL.style.opacity = shu.toFixed(3);
    vis($('#plP'), t, wt('P3', 'along') - 0.1, 1e9, POP);
    vis($('#pr'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    const ub = M.o3((t - wt('P4', 'B') + 0.1) / 0.5), ua = M.o3((t - wt('P4', 'A') + 0.1) / 0.5);
    pA.set(PO[0], PO[1], PO[0] + PA * cosd(PTH) * ua, PO[1] - PA * sind(PTH) * ua); pB.set(PO[0], PO[1], PO[0] + PBL * ub, PO[1]);
    pAl.style.opacity = ua.toFixed(3); pBlb.style.opacity = ub.toFixed(3); pBl.style.opacity = (0.5 * ub).toFixed(3);
    M.draw(pArc, t, wt('P4', 'B') + 0.2, 0.4); vis(pThl, t, wt('P4', 'B') + 0.4, 1e9, { dy: 6 });
    M.draw(pDr, t, wt('P4', 'shadow') - 0.1, 0.4);
    const us = M.io((t - wt('P4', 'shadow') + 0.1) / 0.5); attr(pSh, 'x2', (PO[0] + PA * cosd(PTH) * us).toFixed(1)); M.hide(pSh, us < 0.01);
    M.draw(pBr, t, wt('P4', 'shadow') + 0.4, 0.4); vis(pShl, t, wt('P4', 'shadow') + 0.5, 1e9, { dy: 6 });
    PUC.write($('#prF'), t, wt('P4', 'multiply') - 0.1, 0.9);
    vis($('#prP'), t, wt('P5', 'number') - 0.1, 1e9, POP);
  }

  /* S: the suitcase sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const thv = thS(t), thR = Math.round(thv), x = xS(t), px = x + SW_, py = SY;
    attr(suit, 'transform', `translate(${x.toFixed(1)},0)`);
    wheels.forEach(([w, wx]) => attr(w, 'transform', `translate(${wx},${FY - 14}) rotate(${((x - X0) / 14 / D2R).toFixed(1)})`));
    const hx = px + HL * cosd(thv), hy = py - HL * sind(thv);
    seg(handle, px, py, hx, hy); attr(grip, 'cx', hx.toFixed(1)); attr(grip, 'cy', hy.toFixed(1));
    // ghosts while it rolls (first run, and the 0.25x resume)
    ghosts.forEach((gg, k) => { const gx = xS(t - (t < tRep ? 0.55 : 1.6) * (k + 1)); attr(gg, 'transform', `translate(${gx.toFixed(1)},0)`); const okG = t < tRep || t - 1.6 * (k + 1) > tRes; gg.style.opacity = okG && Math.abs(x - gx) > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    // vectors: F along the handle, its shadow F cos theta along the floor; in the replay they grow again
    const rep = t >= tRep && t < tS8;
    const uF = rep ? M.o3((t - wt('S7', 'points') + 0.1) / 0.5) : M.o3((t - wt('S1', 'force') + 0.1) / 0.5);
    const uS = rep ? M.o3((t - wt('S7', 'shadow') + 0.1) / 0.5) : M.o3((t - wt('S2', 'shadow') + 0.1) / 0.5);
    const fL = 40 * FS * uF, fx = px + fL * cosd(thv), fy = py - fL * sind(thv), shL = 40 * FS * cosd(thv) * uS;
    sF.set(px, py, fx, fy); attr(sFl, 'x', (px + fL * 0.55 * cosd(thv) - 30 * sind(thv) - 10).toFixed(1)); attr(sFl, 'y', (py - fL * 0.55 * sind(thv) - 30 * cosd(thv) + 8).toFixed(1)); sFl.style.opacity = uF.toFixed(3);
    sSh.set(px, SHY, px + shL, SHY); attr(sShl, 'x', (px + Math.max(shL, 0) + 14).toFixed(1)); attr(sShl, 'y', SHY + 9); sShl.style.opacity = uS.toFixed(3);
    seg(sDropP, px, py + 4, px, SHY - 6); seg(sDropT, fx, fy, fx, SHY - 6); sDropP.style.opacity = (uS * uF).toFixed(3); sDropT.style.opacity = (uS * uF).toFixed(3);
    seg(sRef, px, py, px + 120, py); sRef.style.opacity = uF.toFixed(3);
    const ua = M.clamp((thv - 1.5) / 4) * uF; attr(sArc, 'd', arcD(px, py, 54, 0, thv)); sArc.style.opacity = ua.toFixed(3);
    attr(sThl, 'x', (px + 64 * cosd(thv / 2) + 2).toFixed(1)); attr(sThl, 'y', (py - 64 * sind(thv / 2) + 10).toFixed(1)); sThl.style.opacity = ua.toFixed(3);
    const uD = rep ? M.o3((t - tRes) / 0.6) : 0; sD.set(x, FY + 92, x + 150 * uD, FY + 92); attr(sDl, 'x', (x + 150 * uD + 10).toFixed(1)); attr(sDl, 'y', FY + 102); sDl.style.opacity = uD.toFixed(3);
    vis($('#slo'), t, tRep, tS8 - 0.3, { ...POP, sc: 0.8 });
    // readout: round theta first, then compute from it
    const cR = cosd(thR), fc = 40 * cR;
    M.setT($('#r_th'), String(thR)); M.setT($('#r_fc'), f1(fc)); M.setT($('#r_c'), (Math.abs(cR) < 5e-4 ? 0 : cR).toFixed(3));
    // graph: forward part against theta, dot linked to the handle
    const thMax = t < tRep ? thv : 90;
    gc(q => [q, 40 * cosd(q)], 0, thMax); gd(thv, 40 * cosd(thv), t > tS1 + 0.6);
    seg(gGu, g.X(thv), g.Y(40 * cosd(thv)), g.X(thv), g.Y(0)); gGu.style.opacity = t > tS1 + 0.6 ? 0.8 : 0;
    vis($('#grP'), t, wt('S8', 'cos') - 0.1, 1e9, POP);
    avA(t, wt('S5', 'roll') + 0.1, OUT('S6'));
  }

  /* D: the formula, 4 steps + the tail-to-tail picture */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 }); vis($('#exD'), t, tD1 + 0.8, 1e9, { dy: 8 });
    const a = thD(t), aR = Math.round(a), ua = M.o3((t - wt('D2', 'A') + 0.1) / 0.5), ub = M.o3((t - wt('D2', 'B') + 0.1) / 0.5);
    const Ax = DO[0] + DA * DU * cosd(a) * ua, Ay = DO[1] - DA * DU * sind(a) * ua;
    dA.set(DO[0], DO[1], Ax, Ay); dB.set(DO[0], DO[1], DO[0] + DB * DU * ub, DO[1]);
    attr(dAlb, 'x', (Ax + (a > 60 ? 16 : -30)).toFixed(1)); attr(dAlb, 'y', (Ay - 14).toFixed(1)); dAlb.style.opacity = ua.toFixed(3); dBlb.style.opacity = ub.toFixed(3);
    const uarc = M.io((t - wt('D2', 'angle') + 0.1) / 0.4) * M.clamp((a - 1) / 4); attr(dArc, 'd', arcD(DO[0], DO[1], 60, 0, Math.max(a, 0.01))); dArc.style.opacity = uarc.toFixed(3);
    attr(dThl, 'x', (DO[0] + 72 * cosd(a / 2)).toFixed(1)); attr(dThl, 'y', (DO[1] - 72 * sind(a / 2) + 8).toFixed(1)); dThl.style.opacity = uarc.toFixed(3);
    const tTl = wt('D2', 'tail'); vis(dTailR, t, tTl - 0.1, T0('D3'), { dy: 0, fade: 0.1, outDur: 0.3, ody: 0 }); vis(dTailL, t, tTl, T0('D3'), { dy: 6, outDur: 0.3, ody: 0 }); dTail.style.opacity = ua.toFixed(3);
    // shadow of A on B
    const uSA = M.io((t - tStep[1] + 0.1) / 0.5) * (1 - 0.6 * M.io((t - tStep[3] + 0.1) / 0.4)), shA = DA * DU * cosd(a);
    seg(dDrA, Ax, Ay, Ax, DO[1]); dDrA.style.opacity = uSA.toFixed(3); seg(dShA, DO[0], DO[1], DO[0] + shA, DO[1]); dShA.style.opacity = (0.32 * uSA).toFixed(3);
    attr(dShAl, 'x', (DO[0] + Math.max(shA, 60) / 2 + 20).toFixed(1)); attr(dShAl, 'y', DO[1] + 78); dShAl.style.opacity = uSA.toFixed(3);
    // step 4: shadow of B on A (along the A line)
    const uSB = M.io((t - tStep[3] + 0.1) / 0.5), shB = DB * DU * cosd(a), bx = DO[0] + DB * DU, qx = DO[0] + shB * cosd(a), qy = DO[1] - shB * sind(a);
    seg(dAl, DO[0], DO[1], DO[0] + 560 * cosd(a), DO[1] - 560 * sind(a)); dAl.style.opacity = (0.45 * uSB).toFixed(3);
    seg(dDrB, bx, DO[1], qx, qy); dDrB.style.opacity = uSB.toFixed(3); seg(dShB, DO[0], DO[1], qx, qy); dShB.style.opacity = (0.32 * uSB).toFixed(3);
    attr(dShBl, 'x', (qx + 18).toFixed(1)); attr(dShBl, 'y', (qy + 26).toFixed(1)); dShBl.style.opacity = uSB.toFixed(3);
    // live chip: A.B = 4 x 5 x cos(theta), theta rounded first
    const dc = $('#dc'); vis(dc, t, tStep[1] + 0.6, 1e9, POP);
    const v = 4 * 5 * cosd(aR);
    dc.innerHTML = `<span style="color:#9DBBF7">A</span>·<span style="color:#C9B6F5">B</span> = 4 × 5 × cos <span style="color:#F0C674">${aR}°</span> = ${f1(v)}`;
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'one') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'number') - 0.1, 0.8);
  }

  /* C: side by side + pause and think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    [[$('#c0'), T0('C2'), 'C2', $('#sg0'), $('#c0a')], [$('#c1'), T0('C3'), 'C3', $('#sg1'), $('#c1a')]].forEach(([card, tin, id, sg, fa], k) => {
      vis(card, t, tin - 0.1, out, { dx: k ? 60 : -60, dy: 0, ...o });
      const c = CS[k], ub = M.o3((t - tin) / 0.5), ua = M.o3((t - tin - 0.25) / 0.5);
      c.b.set(c.O[0], c.O[1], c.O[0] + c.LB * ub, c.O[1]); c.a.set(c.O[0], c.O[1], c.O[0] + (c.ax - c.O[0]) * ua, c.O[1] + (c.ay - c.O[1]) * ua);
      c.al.style.opacity = ua.toFixed(3); c.bl.style.opacity = ub.toFixed(3);
      M.draw(c.arc, t, tin + 0.6, 0.4); c.thl.style.opacity = M.io((t - tin - 0.8) / 0.3).toFixed(3);
      const tsh = wt(id, 'shadow'); M.draw(c.dr, t, tsh - 0.1, 0.4);
      const us = M.io((t - tsh) / 0.5); attr(c.sh, 'x2', (c.O[0] + (c.ax - c.O[0]) * us).toFixed(1)); M.hide(c.sh, us < 0.01); vis(c.sl, t, wt(id, k ? 'backward' : 'forward') - 0.1, 1e9, { dy: 6 });
      vis(sg, t, wt(id, k ? 'negative' : 'positive') - 0.1, 1e9, POP); PUC.write(fa, t, wt(id, 'dot') - 0.1, 0.8);
    });
    avD(t, wt('C3', 'negative') + 0.3, out);
    vis($('#th1'), t, T0('C4') + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: T0('C4'), tOpts: wt('C4', 'positive') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'At') });
  }

  /* R: unit vectors, link by link + pause and think */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(c => { vis($('#gch' + c), t, tR1 + 0.5 + c * 0.08, 1e9, { dy: 10 }); vis($('#grh' + c), t, tR1 + 0.6 + c * 0.08, 1e9, { dy: 10 }); });
    [0, 1, 2].forEach(r => [0, 1, 2].forEach(c => { const el = $('#gc' + r + c), tt = tCell[r][c]; vis(el, t, tR1 + 0.7 + (r * 3 + c) * 0.04, 1e9, { dy: 10 }); const on = M.io((t - tt) / 0.3);
      el.style.background = r === c ? mix(C.soft, C.okBg, on) : C.soft; el.style.color = mix(C.soft, r === c ? '#1F6B3F' : C.ink, on); }));
    vis($('#grP'), t, wt('R4', 'mixed') - 0.1, 1e9, POP);
    const ui = M.o3((t - wt('R2', 'i') + 0.1) / 0.5), uj = M.o3((t - wt('R3', 'j') + 0.1) / 0.5), uk = M.o3((t - wt('R3', 'k', 1) + 0.1) / 0.5);
    aI.set(AO[0], AO[1], AO[0] + 86 * ui, AO[1]); aJ.set(AO[0], AO[1], AO[0], AO[1] - 86 * uj); aK.set(AO[0], AO[1], AO[0] - 60 * uk, AO[1] + 60 * uk);
    aIl.style.opacity = ui.toFixed(3); aJl.style.opacity = uj.toFixed(3); aKl.style.opacity = uk.toFixed(3);
    M.draw(aR, t, wt('R3', 'ninety') - 0.1, 0.3); vis(aTag, t, wt('R3', 'ninety'), 1e9, { dy: 6 });
    tLk.forEach((tt, i) => { const el = $('#lk' + i); vis(el, t, tt - 0.1, 1e9, { dx: -24, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tt) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('K1'))) / 0.3))); });
    avR(t, wt('R5', 'survive') + 0.2, out);
    vis($('#th2'), t, T0('K1') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('K1'), tOpts: wt('K1', 'Are') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Twelve') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(r => { vis($('#tr' + r), t, r < 2 ? wt('W2', r ? 'B' : 'A') - 0.1 : tTb[0] - 0.3, 1e9, { dy: 10 });
      [0, 1, 2].forEach(c => { const el = $('#tb' + r + c); vis(el, t, r < 2 ? wt('W2', r ? 'B' : 'A') + 0.1 + c * 0.25 : tTb[c] - 0.1, 1e9, POP); }); });
    $('#wr').querySelectorAll('.tb').forEach((el, i) => { if (!el.id) vis(el, t, i < 1 ? wt('W2', 'A') - 0.1 : i < 7 ? wt('W2', 'B') - 0.1 : tTb[0] - 0.3, 1e9, { dy: 10 }); });
    $('#wr').querySelectorAll('.tbh').forEach(el => vis(el, t, T0('W2') + 0.4, 1e9, { dy: 8 }));
    vis($('#tbS'), t, tSum - 0.1, 1e9, POP); $('#tr2').style.background = mix(C.soft, C.ac2, M.io((t - tSum) / 0.3));
    const ub = M.o3((t - wt('W4', 'B') + 0.1) / 0.5), ua = M.o3((t - wt('W4', 'A') + 0.1) / 0.5);
    wB.set(WO[0], WO[1], WO[0] + 5 * WU * ub, WO[1]); wA.set(WO[0], WO[1], WO[0] + 3 * WU * cosd(WTH) * ua, WO[1] - 3 * WU * sind(WTH) * ua);
    vis(wAl, t, wt('W4', 'three') - 0.1, 1e9, { dy: 6 }); vis(wBl, t, wt('W4', 'five') - 0.1, 1e9, { dy: 6 });
    M.draw(wArc, t, wt('W5', 'Cos') - 0.1, 0.4); vis(wThl, t, wt('W5', 'Cos') + 0.1, 1e9, { dy: 6 });
    vis($('#wc2'), t, wt('W6', 'about') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'scalar') - 0.1, tRight: wt('X3', 'Add') });
    const ua = M.o3((t - wt('X2', 'six') + 0.1) / 0.5); tgA.set(70, 100, 70 + 120 * ua, 100);
    M.draw(tgX, t, wt('X3', 'scalar') - 0.1, 0.4); vis(tgL0, t, wt('X3', 'scalar'), 1e9, { dy: 6 });
    vis(tgN, t, wt('X3', 'ten') - 0.1, 1e9, { dy: 10 }); vis(tgL1, t, wt('X3', 'ten'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'angle') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
