// PUC Physics Ep 13: Accuracy and precision (Motion notebook, measuring bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, T0 = M.t0, T1 = M.t1, mix = M.mix;
const GAP = C.red, SPR = C.ac, TRUE = C.ok, S2C = C.violet;    // colour-coding: gap (accuracy) red, spread (precision) blue, true value green, second set violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// exact word time (no prefix matches): ew('S2', 'hundred', 3)
const ew = (id, w, nth = 0) => { const L = M.L(id), cl = s => s.toLowerCase().replace(/[^a-z0-9]/g, ''); const h = L.words.filter(x => cl(x.w) === cl(w)); if (!h.length) { console.warn('word not found', id, w); return L.t0; } return h[Math.min(nth, h.length - 1)].t; };
const kc = (c, s) => `\\textcolor{${c}}{${s}}`;
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tR1 = T0('R1'), tB1 = T0('B1'), tB6 = T0('B6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the dart board ---------- */
const ds = $('#dartS');
[62, 44, 26, 10].forEach((r, i) => mk(ds, 'circle', { cx: 150, cy: 85, r, fill: i % 2 ? '#fff' : C.ac2, stroke: C.ac, 'stroke-width': 2 }));
mk(ds, 'circle', { cx: 150, cy: 85, r: 5, fill: C.red });
const DART = [[196, 44], [200, 50], [192, 49], [198, 41]];
const dDots = DART.map(() => mk(ds, 'circle', { r: 7, fill: C.ink }));
const tDart = [ew('H1', 'hits'), ew('H1', 'same'), ew('H1', 'spot'), ew('H1', 'every')];

/* ---------- H: two kitchen scales ---------- */
const R1 = [512, 511, 512, 513, 512], R2 = [494, 507, 497, 505, 497], TV = 500;
$('#srs').innerHTML = [['Scale 1', 'THE SAME EVERY TIME', R1], ['Scale 2', 'JUMPS AROUND 500', R2]].map(([n, w, R], i) => `<div class="sr" id="sr${i}" style="top:${84 + i * 172}px"><div class="jn">${n}</div><div class="jw">${w}</div><div class="rds">${R.map((v, k) => `<span id="h${i}${k}">${v} g</span>`).join('')}</div></div>`).join('');
const tH1r = [0, 1, 2].map(k => ew('H4', 'hundred', k) - 0.3).concat([ew('H4', 'same') - 0.2, ew('H4', 'time')]);
const tH2r = [0, 1, 2, 3, 4].map(k => ew('H4', 'jumps') + k * 0.16);
const TILES = [['check', 'Same every time?'], ['help', 'Or near 500 g?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, i ? C.red : C.ac, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [ew('H5', 'better') - 0.2, ew('H5', 'better') + 0.5];

/* ---------- P: one picture, gap and spread ---------- */
const pn = $('#pnS'), PNX = g => 80 + (g - 490) * 24.8;
const pLine = mk(pn, 'line', { x1: 60, y1: 300, x2: 724, y2: 300, stroke: C.ink, 'stroke-width': 3 });
for (let g = 490; g <= 515; g += 5) { mk(pn, 'line', { x1: PNX(g), y1: 300, x2: PNX(g), y2: 312, stroke: C.ink, 'stroke-width': 2 }); txt(pn, PNX(g), 340, g, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const pTrue = mk(pn, 'line', { x1: PNX(500), y1: 140, x2: PNX(500), y2: 300, stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const pTL = txt(pn, PNX(500), 128, 'TRUE VALUE 500 g', { 'text-anchor': 'middle', fill: TRUE, 'font-weight': 600 });
const pDots = R1.map((v, k) => mk(pn, 'circle', { cx: PNX(v), cy: 284 - 22 * R1.slice(0, k).filter(x => x === v).length, r: 10, fill: C.ink }));
const pGap = PUC.arrow(pn, GAP, 5, 14), pGapL = txt(pn, (PNX(500) + PNX(512)) / 2, 196, 'GAP = ACCURACY', { 'text-anchor': 'middle', fill: GAP, 'font-weight': 600, 'font-size': 18 });
const pSpr = mk(pn, 'path', { d: `M${PNX(511) - 10},236 v-12 H${PNX(513) + 10} v12`, fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const pSprL = txt(pn, PNX(512), 410, 'SPREAD = PRECISION', { 'text-anchor': 'middle', fill: SPR, 'font-weight': 600, 'font-size': 18 });
const pSpr2 = mk(pn, 'path', { d: `M${PNX(511) - 10},360 v12 H${PNX(513) + 10} v-12`, fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' });

/* ---------- S: the measuring bench ---------- */
const s = $('#simS'), NX = g => 92 + (g - 490) * 24, LY = [350, 482], SY = -46;
// kitchen scale
const pk = mk(s, 'g', {});
mk(pk, 'rect', { x: 330, y: 132 + SY, width: 124, height: 70, rx: 8, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2.5 });
txt(pk, 392, 174 + SY, 'DAL 500 g', { 'text-anchor': 'middle', 'font-size': 15, fill: C.ink, 'font-weight': 600 });
mk(s, 'rect', { x: 290, y: 202 + SY, width: 204, height: 10, rx: 4, fill: C.dim, stroke: C.ink, 'stroke-width': 2.5 });
mk(s, 'rect', { x: 270, y: 212 + SY, width: 244, height: 60, rx: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
mk(s, 'rect', { x: 316, y: 222 + SY, width: 152, height: 40, rx: 6, fill: C.ink });
const disp = txt(s, 454, 252 + SY, '0 g', { 'text-anchor': 'end', 'font-size': 26, fill: '#9EE6B8', 'font-weight': 600 });
// two number lines (scale 1, scale 2) with the true value
LY.forEach((y, i) => { mk(s, 'line', { x1: 72, y1: y, x2: 712, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let g = 490; g <= 515; g += 5) { mk(s, 'line', { x1: NX(g), y1: y, x2: NX(g), y2: y + 10, stroke: C.ink, 'stroke-width': 2 }); txt(s, NX(g), y + 32, g, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute }); } txt(s, 72, y - 50, i ? 'SCALE 2' : 'SCALE 1', { 'font-size': 15, 'letter-spacing': 2, fill: i ? S2C : C.ink, 'font-weight': 600 }); });
mk(s, 'line', { x1: NX(500), y1: 262, x2: NX(500), y2: 492, stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
txt(s, NX(500) - 8, 278, 'TRUE 500', { 'text-anchor': 'end', fill: TRUE, 'font-weight': 600, 'font-size': 15 });
const stackY = (R, k, y) => y - 14 - 22 * R.slice(0, k).filter(x => x === R[k]).length;
const D1 = R1.map(() => mk(s, 'circle', { r: 10, fill: C.ink })), D2 = R2.map(() => mk(s, 'circle', { r: 10, fill: S2C }));
const GH = [0.3, 0.2, 0.12].map(o => mk(s, 'circle', { r: 9, fill: C.ink, opacity: 0 }));
const sSpr = [mk(s, 'path', { fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' }), mk(s, 'path', { fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' })];
const sGap = PUC.arrow(s, GAP, 4, 12), sMean2 = mk(s, 'line', { x1: NX(500), y1: LY[1] - 70, x2: NX(500), y2: LY[1] + 4, stroke: S2C, 'stroke-width': 4 });
// reading times: each "hundred" in the line
const tRd1 = [0, 1, 2, 3, 4].map(k => ew('S2', 'hundred', k) - 0.35), tR2 = [0, 1, 2, 3, 4].map(k => ew('S5', 'hundred', k) - 0.35);
const FLY = 0.55, SLOW = FLY * 4;     // the first scale-2 reading is the slow-mo replay
const flyD = (i, k) => i === 1 && k === 0 ? SLOW : FLY;
$('#roG').innerHTML = `<span class="k">x</span><span class="v" id="roX">-</span><span class="u">g · reading</span>
  <span class="k">x̄</span><span class="v" id="roM">-</span><span class="u">g · mean</span>
  <span class="k" style="color:${GAP};font-style:normal;font-size:22px">gap</span><span class="v" id="roG2" style="color:${GAP}">-</span><span class="u">g · accuracy</span>
  <span class="k" style="color:${SPR};font-style:normal;font-size:22px">spread</span><span class="v" id="roS" style="color:${SPR}">-</span><span class="u">g · precision</span>`;
document.querySelectorAll('#roG .v').forEach(e => e.style.fontSize = '30px');
const gr = PUC.graph($('#grS'), { x: 110, y: 66, w: 600, h: 150, xmax: 5.5, ymin: 490, ymax: 516, xt: [1, 2, 3, 4, 5], yt: [490, 500, 510], yl: 'g' });
const gTrue = gr.mk('line', { x1: gr.X(0), y1: gr.Y(500), x2: gr.X(5.5), y2: gr.Y(500), stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const cv = [gr.curve(C.ink, 4), gr.curve(S2C, 4)], gdot = [gr.dot(C.ink), gr.dot(S2C)];
const avD = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Scale 1 agrees with itself, but not with the truth!' });

/* ---------- D: in numbers ---------- */
const STEPS = [[`\\bar{x} = (x_1 + x_2 + \\dots + x_n)\\,/\\,n`, 'the mean: add, then divide'],
  [`${kc(GAP, '\\text{gap}')} = |\\,\\bar{x} - ${kc(TRUE, 'x_{\\text{true}}')}\\,|`, 'small gap: accurate'],
  [`${kc(SPR, '\\text{spread}')} = x_{\\max} - x_{\\min}`, 'small spread: precise']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:140px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 160}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');

const tStep = [ew('D2', 'Take'), ew('D3', 'Accuracy'), ew('D4', 'Precision')];
const dr = $('#dr'), DROWS = [['', 'Scale 1', 'Scale 2'], ['mean', '512 g', '500 g'], ['gap', '12 g', '0 g'], ['spread', '2 g', '13 g']];
dr.insertAdjacentHTML('beforeend', DROWS.map((r, i) => `<div id="drr${i}" style="position:absolute;left:36px;top:${96 + i * 104}px;width:712px;height:88px;border-radius:14px;background:${i ? C.soft : 'transparent'}">${r.map((c, j) => `<div style="position:absolute;left:${[24, 300, 520][j]}px;top:${i ? 20 : 30}px;font:${i ? (j ? "600 40px 'IBM Plex Mono'" : '700 30px Poppins') : "600 18px 'IBM Plex Mono'"};letter-spacing:${i ? 0 : '.08em'};color:${i === 2 && j ? GAP : i === 3 && j ? SPR : !i ? (j === 2 ? S2C : C.ink) : C.ink};white-space:nowrap">${c}</div>`).join('')}</div>`).join(''));
const tDr = [tStep[0] + 0.6, ew('D2', 'divide') + 0.3, ew('D3', 'gap') + 0.2, ew('D4', 'spread') + 0.2];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${kc(GAP, '\\text{gap}')} \\to \\text{accuracy} \\qquad ${kc(SPR, '\\text{spread}')} \\to \\text{precision}`);

/* ---------- K: side by side ---------- */
const mini = (svg, R, col) => { const X = g => 70 + (g - 490) * 25.6, y = 250;
  mk(svg, 'line', { x1: 50, y1: y, x2: 734, y2: y, stroke: C.ink, 'stroke-width': 3 });
  for (let g = 490; g <= 515; g += 5) { mk(svg, 'line', { x1: X(g), y1: y, x2: X(g), y2: y + 10, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(g), y + 32, g, { 'text-anchor': 'middle', 'font-size': 16 }); }
  mk(svg, 'line', { x1: X(500), y1: 96, x2: X(500), y2: y, stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
  const dots = R.map((v, k) => mk(svg, 'circle', { cx: X(v), cy: stackY(R, k, y), r: 10, fill: col }));
  const lo = Math.min(...R), hi = Math.max(...R), m = mean(R);
  const spr = mk(svg, 'path', { d: `M${X(lo) - 10},${y - 96} v-12 H${X(hi) + 10} v12`, fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  const gap = PUC.arrow(svg, GAP, 5, 14), mm = mk(svg, 'line', { x1: X(m), y1: y - 80, x2: X(m), y2: y + 4, stroke: col, 'stroke-width': 4 });
  return { dots, spr, gap, mm, X, m };
};
const KM = [mini($('#k1S'), R1, C.ink), mini($('#k2S'), R2, S2C)];
const th1 = PUC.think($('#th1'), { q: 'Scale 1 is wrong by the same 12 g every time. Can one correction fix it?', opts: ['Yes', 'No'], right: 0, why: 'Subtract 12 g from every reading. A steady shift like this is a systematic error.' });

/* ---------- R: resolution ---------- */
const rl = $('#rlS'), RX = v => 80 + (v - 3.3) * 1240;
mk(rl, 'rect', { x: 60, y: 260, width: 664, height: 90, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
for (let k = 0; k <= 50; k++) { const v = 3.3 + k * 0.01, x = RX(v), L = k % 10 ? (k % 5 ? 16 : 26) : 42; mk(rl, 'line', { x1: x, y1: 260, x2: x, y2: 260 + L, stroke: C.ink, 'stroke-width': k % 10 ? 1.4 : 2.5 }); if (k % 10 === 0) txt(rl, x, 330, v.toFixed(1), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
txt(rl, 712, 342, 'cm', { 'text-anchor': 'end', fill: C.violet, 'font-weight': 600 });
txt(rl, 60, 120, 'ZOOMED IN · 3.3 TO 3.8 cm', { 'font-size': 16, 'letter-spacing': 2 });
const rObj = mk(rl, 'rect', { x: 60, y: 196, height: 40, rx: 6, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
const rTrue = mk(rl, 'line', { x1: RX(3.678), y1: 150, x2: RX(3.678), y2: 510, stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const rTL = txt(rl, RX(3.678) + 8, 170, 'TRUE 3.678', { fill: TRUE, 'font-weight': 600 });
const rA = mk(rl, 'circle', { cx: RX(3.5), cy: 430, r: 11, fill: C.ink }), rAL = txt(rl, RX(3.5), 466, '3.5', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const rB = mk(rl, 'circle', { cx: RX(3.38), cy: 430, r: 11, fill: C.violet }), rBL = txt(rl, RX(3.38), 466, '3.38', { 'text-anchor': 'middle', fill: C.violet, 'font-weight': 600, 'font-size': 22 });
const rGa = PUC.arrow(rl, GAP, 4, 12), rGb = PUC.arrow(rl, GAP, 4, 12);
const rGaL = txt(rl, (RX(3.5) + RX(3.678)) / 2, 386, 'gap 0.178', { 'text-anchor': 'middle', fill: GAP, 'font-size': 17, 'font-weight': 600 }), rGbL = txt(rl, (RX(3.38) + RX(3.678)) / 2, 528, 'gap 0.298', { 'text-anchor': 'middle', fill: GAP, 'font-size': 17, 'font-weight': 600 });
const avA = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'More digits do not mean more correct.' });

/* ---------- B: four targets ---------- */
const tg = $('#tgS'), TCX = [216, 612, 1008, 1404], TCY = 230;
const TT = [['Accurate and precise', 'TIGHT · ON CENTRE'], ['Precise, not accurate', 'TIGHT · OFF CENTRE'], ['Accurate on average', 'SPREAD · AROUND CENTRE'], ['Neither', 'SPREAD · OFF CENTRE']];
const HITS = [[[0, 4], [6, -3], [-4, -5], [-3, 6], [4, 2]], [[64, -58], [72, -50], [58, -48], [68, -64], [62, -54]], [[-70, 20], [58, 64], [10, -86], [-40, -66], [72, -18]], [[90, -40], [40, -100], [104, 10], [30, -30], [70, -84]]];
const targets = TCX.map((cx, i) => { const g = mk(tg, 'g', {});
  [128, 96, 64, 32].forEach((r, k) => mk(g, 'circle', { cx, cy: TCY, r, fill: k % 2 ? '#fff' : C.ac2, stroke: C.ac, 'stroke-width': 2 }));
  mk(g, 'circle', { cx, cy: TCY, r: 8, fill: TRUE });
  const hs = HITS[i].map(([dx, dy]) => mk(g, 'circle', { cx: cx + dx, cy: TCY + dy, r: 9, fill: C.ink, stroke: '#fff', 'stroke-width': 2 }));
  return { g, hs }; });
$('#tcs').innerHTML = TT.map(([a, b], i) => `<div class="tc" id="tc${i}" style="left:${TCX[i] - 190}px">${a}</div><div class="tc2" id="tcb${i}" style="left:${TCX[i] - 190}px">${b}</div>`).join('');
const tTg = [T0('B2'), T0('B3'), T0('B4'), T0('B5')];
const th2 = PUC.think($('#th2'), { q: 'A clock runs exactly 2 minutes fast, every day. Precise or accurate?', opts: ['Precise', 'Accurate'], right: 0, why: 'Readings agree day after day, but are always 2 min off the truth.' });

/* ---------- W: worked example ---------- */
const P = [50.1, 50.3, 49.9, 50.1], Q = [52.2, 52.1, 52.3, 52.2];
const wsol = PUC.solution($('#wl'), [
  [K(`\\bar{x}_P = \\dfrac{200.4}{4} = 50.1 \\qquad \\bar{x}_Q = \\dfrac{208.8}{4} = 52.2`)],
  [K(`${kc(GAP, '\\text{gap}')}: \\; P\\; 0.1 \\quad Q\\; 2.2 \\;\\Rightarrow\\; P \\text{ more accurate}`)],
  [K(`${kc(SPR, '\\text{spread}')}: \\; P\\; 0.4 \\quad Q\\; 0.2 \\;\\Rightarrow\\; Q \\text{ more precise}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 110 });
const tW = [T0('W3'), T0('W5'), T0('W6')];
const w = $('#wrS'), WX = v => 70 + (v - 49.6) * 240, WL = [260, 430];
WL.forEach((y, i) => { mk(w, 'line', { x1: 50, y1: y, x2: 734, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let k = 0; k <= 28; k++) { const v = 49.6 + k * 0.1, x = WX(v); mk(w, 'line', { x1: x, y1: y, x2: x, y2: y + (k % 5 === 4 ? 14 : 7), stroke: C.ink, 'stroke-width': k % 5 === 4 ? 2 : 1.2 }); if (k % 5 === 4) txt(w, x, y + 36, v.toFixed(0) === v.toFixed(1).replace('.0', '') ? v.toFixed(1) : v.toFixed(1), { 'text-anchor': 'middle', 'font-size': 16 }); }
  txt(w, 50, y - 88, i ? 'STUDENT Q' : 'STUDENT P', { 'font-size': 15, 'letter-spacing': 2, fill: i ? S2C : C.ac, 'font-weight': 600 }); });
mk(w, 'line', { x1: WX(50), y1: 110, x2: WX(50), y2: 450, stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' }); txt(w, WX(50) + 8, 108, 'TRUE 50.0', { fill: TRUE, 'font-weight': 600, 'font-size': 15 });
const WP = P.map((v, k) => mk(w, 'circle', { cx: WX(v), cy: stackY(P, k, WL[0]), r: 10, fill: C.ac })), WQ = Q.map((v, k) => mk(w, 'circle', { cx: WX(v), cy: stackY(Q, k, WL[1]), r: 10, fill: S2C }));
const wG = [PUC.arrow(w, GAP, 4, 12), PUC.arrow(w, GAP, 4, 12)];
const wS = [mk(w, 'path', { d: `M${WX(49.9) - 10},${WL[0] - 66} v-10 H${WX(50.3) + 10} v10`, fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' }), mk(w, 'path', { d: `M${WX(52.1) - 10},${WL[1] - 66} v-10 H${WX(52.3) + 10} v10`, fill: 'none', stroke: SPR, 'stroke-width': 3.5, 'stroke-linecap': 'round' })];
const tWp = [0, 1, 2, 3].map(k => ew('W2', 'Two') + k * 0.2), tWq = [0, 1, 2, 3].map(k => ew('W2', 'four') + k * 0.2);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Readings agree, so they must be correct', right: 'Agreement shows precision only; a zero error shifts them all' });
const tp = $('#tpS'), TPX = v => 60 + (v - 9.8) * 400;
mk(tp, 'line', { x1: 40, y1: 170, x2: 480, y2: 170, stroke: C.ink, 'stroke-width': 3 });
[9.8, 10.0, 10.2, 10.4, 10.6, 10.8].forEach(v => { mk(tp, 'line', { x1: TPX(v), y1: 170, x2: TPX(v), y2: 180, stroke: C.ink, 'stroke-width': 2 }); txt(tp, TPX(v), 204, v.toFixed(1), { 'text-anchor': 'middle', 'font-size': 16 }); });
mk(tp, 'line', { x1: TPX(10), y1: 50, x2: TPX(10), y2: 170, stroke: TRUE, 'stroke-width': 3, 'stroke-dasharray': '7 7' }); txt(tp, TPX(10), 40, 'TRUE', { 'text-anchor': 'middle', fill: TRUE, 'font-weight': 600, 'font-size': 15 });
const TPR = [10.40, 10.42, 10.41, 10.41];
const tpD = TPR.map((v, k) => mk(tp, 'circle', { cx: TPX(10.41) + (k - 1.5) * 12, cy: 156 - (k % 2) * 14, r: 7, fill: C.ink }));
const tpA = PUC.arrow(tp, GAP, 4, 12), tpL = txt(tp, (TPX(10) + TPX(10.41)) / 2, 74, 'zero error', { 'text-anchor': 'middle', fill: GAP, 'font-weight': 600, 'font-size': 17 });
const where = PUC.where($('#wa'), { on: [], type: 'Concept questions comparing sets of readings; vernier and screw gauge experiments' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 780,
  q: 'The true length is 10.00 mm. Which set of readings (in mm) is precise but not accurate?',
  opts: ['9.8, 10.2, 10.0, 9.9', '9.6, 10.9, 10.3, 11.0', '10.40, 10.42, 10.41, 10.41', '10.01, 9.99, 10.00, 10.00'].map(s => `<span class="mono">${s}</span>`), right: 2, cols: 1, optW: 968, optH: 64, optFs: 28, optY: 300 });
const so = PUC.solution($('#so'), [['<b style="color:var(--red)">A</b>: near 10, spread 0.4'], ['<b style="color:var(--red)">B</b>: spread 1.4, mean off'], ['<b style="color:var(--red)">D</b>: accurate and precise'], ['<b style="color:var(--ok)">C</b>: spread 0.02, mean 10.41'], ['<b style="color:var(--red)">gap 0.41 mm</b>: not accurate']], { y0: 100, dy: 96 });
const tSo = [ew('A2', 'A'), ew('A2', 'B'), ew('A2', 'D'), ew('A3', 'C'), ew('A3', 'mean')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · accuracy and precision', y0: 100, dy: 74, txt: [1, 1, 0, 1, 1],
  lines: ['<b style="color:var(--red)">Accuracy</b>: closeness to the <b>true value</b>',
    '<b style="color:var(--ac)">Precision</b>: closeness of readings to <b>each other</b>',
    K(`${kc(GAP, '\\text{gap}')} = |\\bar{x} - x_{\\text{true}}| \\qquad ${kc(SPR, '\\text{spread}')} = x_{\\max} - x_{\\min}`),
    'Precise but not accurate: a <b>systematic error</b> (e.g. zero error)',
    'Finer instrument: more <b>precise</b>, not always more accurate'] });
const YQ = ['What is the difference between accuracy and precision?', 'Can readings be precise but not accurate? Give an example.', 'Why does an instrument with finer markings give more precise readings?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 14', topic: 'The smallest length a ruler can read: Least Count', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S3') - 0.1, 1.1, 560, 560], [T0('S4') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const fmt = v => (Math.round(v * 10) / 10).toString();

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: darts land in a tight bunch off the bullseye */
  M.vis($('#jb0'), t, 0.2, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 });
  dDots.forEach((d, i) => { const u = M.io((t - tDart[i]) / 0.3); attr(d, 'cx', M.lerp(300, DART[i][0], u).toFixed(1)); attr(d, 'cy', M.lerp(DART[i][1] - 40, DART[i][1], u).toFixed(1)); M.hide(d, t < tDart[i]); });

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    [0, 1].forEach(i => M.vis($('#sr' + i), t, tMorph + 0.4 + i * 0.15, 1e9, { dy: 16 }));
    R1.forEach((_, k) => M.vis($('#h0' + k), t, tH1r[k], 1e9, POP)); R2.forEach((_, k) => M.vis($('#h1' + k), t, tH2r[k], 1e9, POP));
    M.vis($('#hjP'), t, T0('H5') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, ew('H3', 'packet') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i], 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#df0'), t, T0('P2') - 0.1, 1e9, { dy: 20 }); M.vis($('#df1'), t, T0('P3') - 0.1, 1e9, { dy: 20 });
    M.vis($('#dq0'), t, ew('P4', 'Accuracy') - 0.05, 1e9, { dx: -12, dy: 0 }); M.vis($('#dq1'), t, ew('P4', 'Precision') - 0.05, 1e9, { dx: -12, dy: 0 });
    M.vis($('#pn'), t, T0('P2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(pLine, t, T0('P2') + 0.4, 0.5); M.draw(pTrue, t, ew('P2', 'true') - 0.1, 0.5); M.vis(pTL, t, ew('P2', 'true'), 1e9, { dy: 8 });
    pDots.forEach((d, k) => M.vis(d, t, T0('P3') + k * 0.12, 1e9, { dy: -40, sp: M.SOFT, fade: 0.08 }));
    const ug = M.o3((t - ew('P4', 'truth') + 0.2) / 0.5); pGap.set(PNX(500), 214, PNX(500) + (PNX(512) - PNX(500)) * ug, 214); pGapL.style.opacity = ug.toFixed(2);
    M.draw(pSpr, t, ew('P4', 'ourselves') - 0.3, 0.4); M.draw(pSpr2, t, ew('P4', 'ourselves') - 0.3, 0.4); M.vis(pSprL, t, ew('P4', 'ourselves'), 1e9, { dy: 8 });
  }

  /* S: bench + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#exS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const i = t >= T0('S5') - 0.2 ? 1 : 0, R = i ? R2 : R1, TR = i ? tR2 : tRd1, D = i ? D2 : D1;
    M.setT($('#simL'), i ? 'MEASURING BENCH · SCALE 2' : 'MEASURING BENCH · SCALE 1');
    let n = 0; TR.forEach((tt, k) => { if (t >= tt) n = k + 1; });
    // the packet is lifted and set down for each reading; display shows the latest reading
    const k0 = n - 1, lift = n ? Math.sin(Math.PI * M.clamp((t - TR[k0] + 0.35) / 0.35)) : 0;
    pk.setAttribute('transform', `translate(0,${(-lift * 26).toFixed(1)})`);
    M.setT(disp, n ? R[k0] + ' g' : '0 g');
    // dots fly from the display to their number line, ghost trail behind
    const place = (d, k, tt, RR, li, dur) => { const u = M.o3((t - tt) / dur), x = M.lerp(392, NX(RR[k]), u), y = M.lerp(262 + SY, stackY(RR, k, LY[li]), u) - Math.sin(Math.PI * u) * 60; attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1)); M.hide(d, t < tt); return [u, x, y]; };
    R1.forEach((_, k) => place(D1[k], k, tRd1[k], R1, 0, FLY)); R2.forEach((_, k) => place(D2[k], k, tR2[k], R2, 1, flyD(1, k)));
    const fk = k0 >= 0 ? k0 : 0, fd = flyD(i, fk), fu = M.clamp((t - TR[fk]) / fd);
    GH.forEach((g, j) => { const lag = (j + 1) * 0.06 * fd / FLY, u = M.o3((t - lag - TR[fk]) / fd); attr(g, 'fill', i ? S2C : C.ink); attr(g, 'cx', M.lerp(392, NX(R[fk]), u).toFixed(1)); attr(g, 'cy', (M.lerp(262 + SY, stackY(R, fk, LY[i]), u) - Math.sin(Math.PI * u) * 60).toFixed(1)); g.style.opacity = fu > 0 && fu < 1 && u > 0 ? [0.3, 0.2, 0.12][j] : 0; });
    M.vis($('#slow'), t, tR2[0] - 0.2, tR2[0] + SLOW + 0.3, POP);
    // spread brackets and gap arrow
    attr(sSpr[0], 'd', `M${NX(511) - 10},${LY[0] - 70} v-10 H${NX(513) + 10} v10`); M.draw(sSpr[0], t, ew('S3', 'spread') - 0.2, 0.4);
    const ug = M.o3((t - ew('S4', 'twelve') + 0.2) / 0.5); sGap.set(NX(500), LY[0] - 112, NX(500) + (NX(512) - NX(500)) * ug, LY[0] - 112);
    attr(sSpr[1], 'd', `M${NX(494) - 10},${LY[1] - 70} v-10 H${NX(507) + 10} v10`); M.draw(sSpr[1], t, ew('S6', 'spread') - 0.2, 0.5);
    M.draw(sMean2, t, ew('S7', 'average') - 0.1, 0.4);
    // readout + graph, linked to the latest reading
    const got = R.slice(0, n);
    M.setT($('#roX'), n ? String(R[k0]) : '-'); M.setT($('#roM'), n ? fmt(mean(got)) : '-');
    M.setT($('#roG2'), n ? fmt(Math.abs(mean(got) - TV)) : '-'); M.setT($('#roS'), n ? String(Math.max(...got) - Math.min(...got)) : '-');
    [0, 1].forEach(j => { const RR = j ? R2 : R1, TT2 = j ? tR2 : tRd1, on = j === i; let m = 0; TT2.forEach((tt, k) => { if (t >= tt) m = k + 1 + M.o3((t - tt) / flyD(j, k)) - 1; });
      const val = s2 => { const a = Math.floor(s2 - 1), f = s2 - 1 - a; return RR[Math.max(0, Math.min(4, a))] + (a + 1 < 5 ? (RR[a + 1] - RR[a]) * f : 0); };
      cv[j](s2 => [s2, val(s2)], 1, on && m >= 1 ? m : 1); gdot[j](Math.max(1, m), val(Math.max(1, m)), on && m > 0); });
    avD(t, ew('S4', 'accurate') + 0.3, T0('S5') - 0.3);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 244], [tStep[2] - 0.1, 404]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[0] + 0.3, 1e9, { dx: 60, dy: 0 });
    tDr.forEach((tt, i) => M.vis($('#drr' + i), t, tt, 1e9, { dx: -16, dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, ew('T1', 'Accuracy') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, ew('T1', 'Precision') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    [['#k1', tK1 + 0.1, ew('K1', 'gap'), ew('K1', 'spread'), -60], ['#k2', T0('K2') - 0.1, ew('K2', 'gap'), ew('K2', 'spread'), 60]].forEach(([id, tin, tg2, ts2, dx], j) => {
      M.vis($(id), t, tin, out, { dx, dy: 0, ...o });
      const m = KM[j]; m.dots.forEach((d, k) => M.vis(d, t, tin + 0.3 + k * 0.1, 1e9, { dy: -30, sp: M.SOFT, fade: 0.08 }));
      M.draw(m.mm, t, tg2 - 0.3, 0.3);
      const ug = M.o3((t - tg2 + 0.1) / 0.5); m.gap.set(m.X(500), 120, m.X(500) + (m.X(m.m) - m.X(500)) * ug, 120);
      M.vis($(id + 'a'), t, tg2, 1e9, { dy: 10 }); M.draw(m.spr, t, ts2 - 0.1, 0.4); M.vis($(id + 'b'), t, ts2, 1e9, { dy: 10 });
      M.vis($(id + 't'), t, ts2 + 0.6, 1e9, POP); });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: ew('K3', 'correction') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: ew('K4', 'Subtract') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tB1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('B1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    attr(rObj, 'width', ((RX(3.678) - 60) * M.o3((t - T0('R2')) / 0.8)).toFixed(1));
    M.draw(rTrue, t, ew('R2', 'three') - 0.1, 0.5); M.vis(rTL, t, ew('R2', 'three'), 1e9, { dy: 8 });
    M.vis(rA, t, ew('R3', 'gives') - 0.1, 1e9, POP); M.vis(rAL, t, ew('R3', 'gives'), 1e9, { dy: 8 });
    M.vis(rB, t, ew('R4', 'give') - 0.1, 1e9, POP); M.vis(rBL, t, ew('R4', 'give'), 1e9, { dy: 8 });
    const ua = M.o3((t - ew('R5', 'closer') + 0.2) / 0.5); rGa.set(RX(3.5), 374, RX(3.5) + (RX(3.678) - RX(3.5)) * ua, 374); rGaL.style.opacity = ua.toFixed(2); attr(rGaL, 'y', 398);
    rGb.set(RX(3.38), 500, RX(3.38) + (RX(3.678) - RX(3.38)) * ua, 500); rGbL.style.opacity = ua.toFixed(2);
    M.vis($('#rg'), t, T0('R3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#rr0'), t, T0('R3'), 1e9, { dy: 16 }); M.vis($('#rr1'), t, T0('R4'), 1e9, { dy: 16 });
    M.vis($('#rb1'), t, ew('R5', 'precise') - 0.1, 1e9, POP); M.vis($('#rb0'), t, ew('R5', 'accurate') - 0.1, 1e9, POP);
    avA(t, ew('R5', 'digits') + 0.3, out);
  }

  /* B: targets + think */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#tg'), t, tB1 + 0.05, OUT('B6'), { dy: 36, ...o });
    targets.forEach((tgt, i) => { M.vis(tgt.g, t, tB1 + 0.3 + i * 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.12 });
      tgt.hs.forEach((h, k) => M.vis(h, t, tTg[i] + 0.2 + k * 0.14, 1e9, { dy: -30, sc: 1.6, sp: M.POP, fade: 0.06 }));
      const on = M.io((t - tTg[i]) / 0.3); M.vis($('#tc' + i), t, tTg[i] + 0.3, 1e9, { dy: 10 }); M.vis($('#tcb' + i), t, tTg[i] + 0.45, 1e9, { dy: 8 });
      tgt.g.style.opacity = t < tTg[i] ? '0.45' : (0.45 + 0.55 * on).toFixed(2); });
    M.vis($('#th2'), t, tB6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tB6, tOpts: ew('B6', 'Precise') - 0.1, tCount: T1('B6') + 0.05, dur: 3, tAns: T0('B7') - 0.02, tWhy: ew('B7', 'Precise') + 0.3 });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    WP.forEach((d, k) => M.vis(d, t, tWp[k], 1e9, { dy: -30, sp: M.SOFT, fade: 0.08 })); WQ.forEach((d, k) => M.vis(d, t, tWq[k], 1e9, { dy: -30, sp: M.SOFT, fade: 0.08 }));
    const ug = M.o3((t - ew('W5', 'Gaps') + 0.1) / 0.6);
    wG[0].set(WX(50), WL[0] - 98, WX(50) + (WX(50.1) - WX(50)) * ug, WL[0] - 98); wG[1].set(WX(50), WL[1] - 98, WX(50) + (WX(52.2) - WX(50)) * ug, WL[1] - 98);
    M.draw(wS[0], t, ew('W6', 'Spreads') - 0.1, 0.4); M.draw(wS[1], t, ew('W6', 'Spreads') + 0.3, 0.4);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: ew('X2', 'think') - 0.1, tStrike: ew('X3', 'precision') - 0.1, tRight: ew('X3', 'precision') + 0.3 });
    tpD.forEach((d, k) => M.vis(d, t, ew('X2', 'agree') + k * 0.12, 1e9, { dy: -30, sp: M.SOFT, fade: 0.08 }));
    const ua = M.o3((t - ew('X3', 'zero') + 0.1) / 0.5); tpA.set(TPX(10), 90, TPX(10) + (TPX(10.41) - TPX(10)) * ua, 90); tpL.style.opacity = ua.toFixed(2);
    where(t, { tin: T0('E1'), tLight: [], tType: ew('E1', 'concept') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: ew('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: ew('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
