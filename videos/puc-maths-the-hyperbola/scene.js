// PUC Maths Ep 77: The hyperbola (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 10): the curve coral (accent), foci and c violet, PF1 blue, PF2 gold, a orange, b teal,
// eccentricity e magenta, latus rectum green
const RC = C.ac, FV = C.violet, PB = '#2F6FEB', PG = C.gold, AO = C.orange, BT = C.teal, EM = '#C2378A', LG = C.ok;
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const col = c => s => `\\textcolor{${c}}{${s}}`;
const fv = col(FV), b = col(PB), gd = col(PG), o = col(AO), bt = col(BT), em = col(EM), lg = col(LG);
const HALO = { stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' };
const ital = (p, x, y, s, fill, size = 26, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': size, fill }, a));
const dotG = (svg, x, y, r, fill, stroke, sw = 3) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); g.c = mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': sw }); return g; };
const fade = (el, t, t0, d = 0.4, to = 1) => { el.style.opacity = (to * M.io((t - t0) / d)).toFixed(3); M.hide(el, t < t0); };
const lab = (p, x, y, s, fill, a = {}) => txt(p, x, y, s, Object.assign({ 'font-size': 19, fill, 'font-weight': 600 }, HALO, a));
const ln = (p, x1, y1, x2, y2, stroke, w = 4, a = {}) => mk(p, 'line', Object.assign({ x1, y1, x2, y2, stroke, 'stroke-width': w, 'stroke-linecap': 'round' }, a));
const setL = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
const clipG = (svg, id, x, y, w, h) => { const cp = mk(mk(svg, 'defs', {}), 'clipPath', { id }); mk(cp, 'rect', { x, y, width: w, height: h, rx: 8 }); return mk(svg, 'g', { 'clip-path': `url(#${id})` }); };
// branch of x^2/a^2 - y^2/b^2 = 1 (s = +1 right, -1 left), y in [-ym, ym]; vert swaps the axes
const brD = (O, u, a, bb, s, ym, vert = false) => { let d = ''; for (let i = 0; i <= 90; i++) { const y = -ym + 2 * ym * i / 90, x = s * a * Math.sqrt(1 + y * y / (bb * bb));
  const px = vert ? O[0] + y * u : O[0] + x * u, py = vert ? O[1] - x * u : O[1] - y * u; d += (i ? 'L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1); } return d; };
const axes = (svg, O, x0, x1, y0, y1) => { const g = mk(svg, 'g', {});
  ln(g, x0, O[1], x1, O[1], C.ink, 2.5, { 'stroke-linecap': 'butt' }); mk(g, 'path', { d: `M${x1 + 6},${O[1]} l-13,-7 v14 z`, fill: C.ink });
  ln(g, O[0], y0, O[0], y1, C.ink, 2.5, { 'stroke-linecap': 'butt' }); mk(g, 'path', { d: `M${O[0]},${y1 - 6} l-7,13 h14 z`, fill: C.ink });
  ital(g, x1 + 2, O[1] + 30, 'x', C.ink2, 22); ital(g, O[0] + 12, y1 + 10, 'y', C.ink2, 22); return g; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tP1 = T0('P1'), tT = T0('T1'), tG1 = T0('G1'), tR1 = T0('R1'), tE1 = T0('E1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tG1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['A LAMP NEAR A WALL', 'not a circle'], ['THE EDGES OF THE LIGHT', 'two open curves'], ['WHAT CURVE?', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H2', 'circle'), wt('H2', 'curves'), wt('H2', 'never')];

/* ---------- H: lamp light on a wall ---------- */
const hs = $('#hS'), HL = [392, 318], HA = 72, HB = 120;
mk(hs, 'rect', { x: 44, y: 70, width: 696, height: 476, rx: 16, fill: '#EDEAE3', stroke: '#DAD5CA', 'stroke-width': 2 });
const hy = (dx, s) => HL[1] + s * HA * Math.sqrt(1 + dx * dx / (HB * HB));
const hRegion = s => { let d = `M48,${s < 0 ? 74 : 542}`; for (let i = 0; i <= 60; i++) { const dx = -344 + 688 * i / 60; d += `L${(HL[0] + dx).toFixed(1)},${Math.max(74, Math.min(542, hy(dx, s))).toFixed(1)}`; } return d + `L736,${s < 0 ? 74 : 542}Z`; };
const hLit = [-1, 1].map(s => mk(hs, 'path', { d: hRegion(s), fill: '#FFE9A8' }));
const hEdge = [-1, 1].map(s => { let d = ''; for (let i = 0; i <= 60; i++) { const dx = -344 + 688 * i / 60, y = hy(dx, s); d += (i ? 'L' : 'M') + (HL[0] + dx).toFixed(1) + ',' + Math.max(74, Math.min(542, y)).toFixed(1); } return mk(hs, 'path', { d, fill: 'none', stroke: RC, 'stroke-width': 5 }); });
const hLamp = mk(mk(hs, 'g', {}), 'g', {});
ln(hLamp, HL[0], HL[1] + 40, HL[0], 520, C.ink2, 6); mk(hLamp, 'rect', { x: HL[0] - 46, y: 516, width: 92, height: 14, rx: 7, fill: C.ink2 });
mk(hLamp, 'path', { d: `M${HL[0] - 36},${HL[1] - 40} L${HL[0] + 36},${HL[1] - 40} L${HL[0] + 52},${HL[1] + 40} L${HL[0] - 52},${HL[1] + 40} Z`, fill: '#F2B33D', stroke: C.ink2, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const hT = [lab(hs, HL[0] + 140, 104, 'open edge', RC), lab(hs, HL[0] + 140, 530, 'open edge', RC)];

/* ---------- P: definition + live (a = 3, b = 4, c = 5) ---------- */
$('#dfT').style.top = '80px';
const ps = $('#pS'), PCn = [392, 318], PU = 44, A = 3, Bb = 4, Cc = 5;
axes(ps, PCn, 60, 724, 548, 82);
const pg = clipG(ps, 'pClip', 20, 70, 744, 490);
const pBrF = [1, -1].map(s => mk(pg, 'path', { d: brD(PCn, PU, A, Bb, s, 5.6), fill: 'none', stroke: '#F3D0C4', 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }));
const pBr = [1, -1].map(s => mk(pg, 'path', { d: brD(PCn, PU, A, Bb, s, 5.6), fill: 'none', stroke: RC, 'stroke-width': 5 }));
const pL1 = ln(ps, 0, 0, 0, 0, PB, 5), pL2 = ln(ps, 0, 0, 0, 0, PG, 5);
const pF = [-1, 1].map(s => dotG(ps, PCn[0] + s * Cc * PU, PCn[1], 10, FV, '#fff'));
const pFT = [lab(ps, PCn[0] - Cc * PU, PCn[1] + 32, 'F₁', FV, { 'text-anchor': 'middle' }), lab(ps, PCn[0] + Cc * PU, PCn[1] + 32, 'F₂', FV, { 'text-anchor': 'middle' })];
const pP = mk(ps, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 }); const pPT = ital(ps, 0, 0, 'P', RC, 24, HALO);
const tJump = wt('P5', 'other') - 0.1;
const kY = [[wt('P3', 'Watch'), 0], [wt('P4', 'Eight'), 0], [wt('P4', 'Ten'), 3.919], [wt('P4', 'Eleven'), 5.0], [tJump - 0.3, -5.0]];
const yR = t => { if (t <= kY[0][0]) return 0; for (let i = 1; i < kY.length; i++) if (t < kY[i][0]) { const [a, ya] = kY[i - 1], [c, yc] = kY[i]; const d = i === 4 ? c - a - 0.5 : Math.max(0.25, Math.min(0.9, c - a - 0.95)); return ya + (yc - ya) * M.io((t - (c - d)) / d); } return kY[kY.length - 1][1]; };
const yL = t => 5 - 10 * M.io((t - tJump - 0.3) / Math.max(1, T1('P5') - tJump - 0.6));
let pLast = '';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`|\\,${b('PF_1')} - ${gd('PF_2')}\\,| = \\text{constant}`);

/* ---------- G: parts ---------- */
const gsol = PUC.solution($('#gl'), [
  ['Transverse axis: through the foci · centre: their midpoint'],
  [K(`\\text{vertices } ${o('2a')} \\text{ apart},\\ \\ \\text{foci } ${fv('2c')} \\text{ apart}`)],
  [K(`\\text{at a vertex: } ${b('(c + a)')} - ${gd('(c - a)')} = ${o('2a')}`)],
  [K(`c > a:\\ \\ ${bt('b')}^2 = ${fv('c')}^2 - ${o('a')}^2`)],
  [K(`${fv('c')}^2 = ${o('a')}^2 + ${bt('b')}^2`)]], { label: 'THE PARTS', y0: 100, dy: 92 });
$('#gl .sol .sx').style.fontSize = '24px';
const tGs = [wt('G1', 'transverse'), wt('G2', 'vertices'), wt('G3', 'vertex'), wt('G4', 'defines'), wt('G5', 'equals')];
const gs = $('#gS'), GC = [392, 318];
const gX = v => GC[0] + v * PU, gY = v => GC[1] - v * PU;
const gg = clipG(gs, 'gClip', 20, 70, 744, 490);
[1, -1].forEach(s => mk(gg, 'path', { d: brD(GC, PU, A, Bb, s, 5.6), fill: 'none', stroke: RC, 'stroke-width': 5 }));
const gTr = ln(gs, gX(-7.6), gY(0), gX(7.6), gY(0), C.ink, 3);
const gTrT = lab(gs, gX(-6.2), gY(0) + 28, 'transverse axis', C.ink2, { 'text-anchor': 'middle', 'font-size': 17 });
const gO = dotG(gs, GC[0], GC[1], 8, C.ink); const gOT = lab(gs, GC[0] - 10, GC[1] - 14, 'centre', C.ink, { 'text-anchor': 'end' });
const gV = [-3, 3].map(x => dotG(gs, gX(x), gY(0), 9, AO, '#fff'));
const gF = [-5, 5].map(x => dotG(gs, gX(x), gY(0), 10, FV, '#fff'));
const g2a = ln(gs, gX(-3), gY(0) + 40, gX(3), gY(0) + 40, AO, 4); const g2aT = lab(gs, GC[0] + 12, gY(0) + 64, '2a', AO);
const g2c = ln(gs, gX(-5), gY(0) + 86, gX(5), gY(0) + 86, FV, 4); const g2cT = lab(gs, GC[0] + 12, gY(0) + 110, '2c', FV);
const gE1 = ln(gs, gX(-5), gY(0) - 8, gX(3), gY(0) - 8, PB, 4), gE2 = ln(gs, gX(5), gY(0) - 16, gX(3), gY(0) - 16, PG, 4);
const gE1T = lab(gs, gX(-4), gY(0) - 22, 'c + a', PB, { 'text-anchor': 'middle' }), gE2T = lab(gs, gX(4.3), gY(0) - 32, 'c - a', PG, { 'text-anchor': 'middle' });
const gBox = mk(gs, 'rect', { x: gX(-3), y: gY(4), width: 6 * PU, height: 8 * PU, fill: 'none', stroke: BT, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const gConj = ln(gs, gX(0), gY(-4), gX(0), gY(4), BT, 5); const gConjT = lab(gs, gX(0) + 12, gY(3.3), 'conjugate axis', BT, { 'font-size': 17 });
const gDiag = ln(gs, gX(0), gY(0), gX(3), gY(4), FV, 4); const gDiagT = lab(gs, gX(1.2), gY(2.4), 'c', FV, { 'font-size': 24, 'text-anchor': 'end' });
const gbT = lab(gs, gX(3) + 10, gY(2), 'b', BT, { 'font-size': 24 });

/* ---------- R: derivation ---------- */
const rsol = PUC.solution($('#rl'), [
  [K(`${b('\\sqrt{(x + c)^2 + y^2}')} - ${gd('\\sqrt{(x - c)^2 + y^2}')} = ${o('2a')}`)],
  [K(`\\dfrac{c}{a}x - a = ${gd('\\sqrt{(x - c)^2 + y^2}')}`)],
  [K(`x^2\\,\\dfrac{c^2 - a^2}{a^2} - y^2 = c^2 - a^2`)],
  [K(`x^2\\,\\dfrac{${bt('b')}^2}{a^2} - y^2 = ${bt('b')}^2`)],
  [K(`\\dfrac{x^2}{${o('a')}^2} - \\dfrac{y^2}{${bt('b')}^2} = 1`)]], { label: 'THE EQUATION · STEP BY STEP', y0: 104, dy: 92 });
const tRs = [wt('R2', 'Step'), wt('R3', 'square'), wt('R4', 'square'), wt('R5', 'Swap'), wt('R6', 'Divide')];
const rs = $('#rS'), RCn = [392, 318];
axes(rs, RCn, 60, 724, 548, 82);
const rg = clipG(rs, 'rClip', 20, 70, 744, 490);
const rBr = [1, -1].map(s => mk(rg, 'path', { d: brD(RCn, PU, A, Bb, s, 5.6), fill: 'none', stroke: RC, 'stroke-width': 5 }));
const RPy = 3, RPx = 3 * Math.sqrt(1 + 9 / 16), RPt = [RCn[0] + RPx * PU, RCn[1] - RPy * PU];
const rL1 = ln(rs, RCn[0] - 5 * PU, RCn[1], RPt[0], RPt[1], PB, 5), rL2 = ln(rs, RCn[0] + 5 * PU, RCn[1], RPt[0], RPt[1], PG, 5);
const rF = [-1, 1].map(s => dotG(rs, RCn[0] + s * 5 * PU, RCn[1], 10, FV, '#fff'));
const rFT = [lab(rs, RCn[0] - 5 * PU, RCn[1] + 32, '(-c, 0)', FV, { 'text-anchor': 'middle' }), lab(rs, RCn[0] + 5 * PU, RCn[1] + 32, '(c, 0)', FV, { 'text-anchor': 'middle' })];
const rP = dotG(rs, RPt[0], RPt[1], 11, RC, '#fff'); const rPT = lab(rs, RPt[0] - 16, RPt[1] - 14, 'P (x, y)', RC, { 'text-anchor': 'end' });
const rSum = lab(rs, 44, 96, 'blue - gold = 2a', C.ink, { 'font-size': 22 });
const rHi = $('#rHi');

/* ---------- E: live eccentricity (a = 3) ---------- */
const es = $('#eS'), ECn = [392, 318], EU = 30;
axes(es, ECn, 60, 724, 548, 82);
const eg = clipG(es, 'eClip', 20, 70, 744, 490);
const eBr = [1, -1].map(() => mk(eg, 'path', { fill: 'none', stroke: RC, 'stroke-width': 5 }));
const eF = [-1, 1].map(() => dotG(es, 0, 0, 10, FV, '#fff'));
const eV = [-1, 1].map(s => dotG(es, ECn[0] + s * 3 * EU, ECn[1], 8, AO, '#fff'));
const eCb = ln(es, 0, 0, 0, 0, FV, 4), eAb = ln(es, ECn[0], ECn[1] + 30, ECn[0] + 3 * EU, ECn[1] + 30, AO, 4);
const eCT = lab(es, 0, 0, 'c', FV, { 'font-size': 22, 'text-anchor': 'middle' }), eAT = lab(es, ECn[0] + 1.5 * EU, ECn[1] + 56, 'a = 3', AO, { 'text-anchor': 'middle' });
const eb = $('#eB'), EBx = v => 60 + (v - 1) / 2 * 660, EBy = 330;
ln(eb, EBx(1), EBy, EBx(3), EBy, C.ink, 3); [1, 2, 3].forEach(v => { ln(eb, EBx(v), EBy - 12, EBx(v), EBy + 12, C.ink, 3); txt(eb, EBx(v), EBy + 44, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); });
const eBar = ln(eb, EBx(1), EBy, EBx(1), EBy, EM, 10); const eMk = mk(eb, 'circle', { cx: EBx(1), cy: EBy, r: 13, fill: EM, stroke: '#fff', 'stroke-width': 3 });
const eBl = [lab(eb, EBx(1) + 6, EBy - 30, 'narrow', C.mute), lab(eb, EBx(3) - 6, EBy - 30, 'wide open', C.mute, { 'text-anchor': 'end' })];
const tE0 = wt('E2', 'grow'), tE1b = wt('E2', 'wider') + 0.4, eAt = t => 1.15 + 1.6 * M.io((t - tE0) / (tE1b - tE0));
let eLast = '';

/* ---------- K: ellipse vs hyperbola ---------- */
const KU = 24;
const kS1 = $('#kS1'), KO1 = [392, 184]; axes(kS1, KO1, 140, 640, 300, 64);
const kE = mk(kS1, 'path', { d: `M${KO1[0] + 5 * KU},${KO1[1]} A${5 * KU},${4 * KU} 0 1 1 ${KO1[0] - 5 * KU},${KO1[1]} A${5 * KU},${4 * KU} 0 1 1 ${KO1[0] + 5 * KU},${KO1[1]}`, fill: 'none', stroke: RC, 'stroke-width': 5 });
const kEP = [KO1[0] + 5 * KU * Math.cos(1.1), KO1[1] - 4 * KU * Math.sin(1.1)];
const kE1 = ln(kS1, KO1[0] - 3 * KU, KO1[1], kEP[0], kEP[1], PB, 4), kE2 = ln(kS1, KO1[0] + 3 * KU, KO1[1], kEP[0], kEP[1], PG, 4);
[-3, 3].forEach(x => dotG(kS1, KO1[0] + x * KU, KO1[1], 8, FV, '#fff'));
const kS2 = $('#kS2'), KO2 = [392, 184]; axes(kS2, KO2, 140, 640, 300, 64);
const kg = clipG(kS2, 'kClip', 140, 64, 500, 236);
const kH = [1, -1].map(s => mk(kg, 'path', { d: brD(KO2, KU, 3, 4, s, 4.6), fill: 'none', stroke: RC, 'stroke-width': 5 }));
const kHP = [KO2[0] + 3 * Math.sqrt(1 + 9 / 16) * KU, KO2[1] - 3 * KU];
const kH1 = ln(kS2, KO2[0] - 5 * KU, KO2[1], kHP[0], kHP[1], PB, 4), kH2 = ln(kS2, KO2[0] + 5 * KU, KO2[1], kHP[0], kHP[1], PG, 4);
[-5, 5].forEach(x => dotG(kS2, KO2[0] + x * KU, KO2[1], 8, FV, '#fff'));
const KR1 = [K(`${b('PF_1')} + ${gd('PF_2')} = ${o('2a')}`), K(`${fv('c')}^2 = ${o('a')}^2 - ${bt('b')}^2`), K(`${em('e')} < 1`)];
const KR2 = [K(`|\\,${b('PF_1')} - ${gd('PF_2')}\\,| = ${o('2a')}`), K(`${fv('c')}^2 = ${o('a')}^2 + ${bt('b')}^2`), K(`${em('e')} > 1`)];
$('#kR1').innerHTML = KR1.map((h, i) => `<div class="rw" id="kr1${i}" style="top:${312 + i * 86}px">${h}</div>`).join('');
$('#kR2').innerHTML = KR2.map((h, i) => `<div class="rw" id="kr2${i}" style="top:${312 + i * 86}px;background:var(--ac2)">${h}</div>`).join('');
const tK1r = [wt('K1', 'add'), wt('K1', 'minus'), wt('K1', 'less')], tK2r = [wt('K2', 'differ'), wt('K2', 'plus'), wt('K2', 'more')];
const th1 = PUC.think($('#th1'), { q: `${K('\\tfrac{x^2}{16} - \\tfrac{y^2}{9} = 1')}: where are the foci?`, opts: ['(±5, 0)', '(±√7, 0)'], right: 0, why: 'A hyperbola: c² = a² + b² = 16 + 9 = 25, so c = 5.' });

/* ---------- W: worked example (y^2/16 - x^2/9 = 1) ---------- */
$('#wq').innerHTML = K('9y^2 - 16x^2 = 144') + '<span class="why2" style="font-size:26px">&nbsp;&nbsp;foci, e, latus rectum?</span>';
const wsol = PUC.solution($('#wl'), [
  [K(`\\div 144:\\ \\ \\dfrac{y^2}{${o('16')}} - \\dfrac{x^2}{${bt('9')}} = 1`)],
  [K(`\\text{plus term } y:\\ \\ ${o('a')} = 4,\\ \\ ${bt('b')} = 3`)],
  [K(`${fv('c')}^2 = 16 + 9:\\ \\ \\text{foci } ${fv('(0, \\pm 5)')}`)],
  [K(`${em('e')} = \\dfrac{5}{4},\\ \\ \\dfrac{2b^2}{a} = ${lg('\\dfrac{9}{2}')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Divide'), wt('W4', 'plus'), wt('W5', 'c'), wt('W6', 'eccentricity')];
const ws = $('#wS'), WC = [392, 318], WU = 26;
axes(ws, WC, 60, 724, 548, 82);
const wg = clipG(ws, 'wClip', 20, 70, 744, 490);
const wBr = [1, -1].map(s => mk(wg, 'path', { d: brD(WC, WU, 4, 3, s, 9, true), fill: 'none', stroke: RC, 'stroke-width': 5 }));
const wV = [-1, 1].map(s => dotG(ws, WC[0], WC[1] - s * 4 * WU, 8, AO, '#fff')); const wVT = lab(ws, WC[0] + 14, WC[1] - 4 * WU + 26, 'vertex (0, 4)', AO);
const wF = [-1, 1].map(s => dotG(ws, WC[0], WC[1] - s * 5 * WU, 10, FV, '#fff')); const wFT = lab(ws, WC[0] - 2.25 * WU - 12, WC[1] - 5 * WU + 6, 'focus (0, 5)', FV, { 'text-anchor': 'end' });
const wLR = ln(ws, WC[0] - 2.25 * WU, WC[1] - 5 * WU, WC[0] + 2.25 * WU, WC[1] - 5 * WU, LG, 6); const wLRT = lab(ws, WC[0] + 2.25 * WU + 12, WC[1] - 5 * WU + 6, '9/2', LG);
const wAx = lab(ws, WC[0] - 14, 100, 'transverse axis: y', C.ink2, { 'text-anchor': 'end', 'font-size': 17 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\tfrac{x^2}{9} - \\tfrac{y^2}{16} = 1:\\ \\ a^2 = 16 \\text{ (bigger)}`), right: K(`${o('a')}^2 \\text{ sits under the plus term: } ${o('a')} = 3,\\ ${fv('c')} = 5`) });
const ts = $('#tS'), TC = [280, 137], TU = 22;
const tg = clipG(ts, 'tClip', 20, 10, 520, 254);
[1, -1].forEach(s => mk(tg, 'path', { d: brD(TC, TU, 3, 4, s, 5), fill: 'none', stroke: RC, 'stroke-width': 4 }));
ln(ts, 40, TC[1], 520, TC[1], C.ink, 2);
const tA = ln(ts, TC[0], TC[1] + 14, TC[0] + 3 * TU, TC[1] + 14, AO, 4); const tAT = lab(ts, TC[0] + 1.5 * TU, TC[1] + 40, 'a = 3', AO, { 'text-anchor': 'middle' });
[-5, 5].forEach(x => dotG(ts, TC[0] + x * TU, TC[1], 7, FV, '#fff'));
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find a, b, c, the eccentricity or the latus rectum of a hyperbola from two facts.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: 'The hyperbola x²/a² - y²/b² = 1 has eccentricity 5/3, and its foci are 10 apart. Its latus rectum is',
  opts: ['16/3', '32/3', '25/3', '8'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`2c = 10 \\Rightarrow c = 5`)], [K(`e = \\dfrac{c}{a} = \\dfrac{5}{3} \\Rightarrow a = 3`)], [K(`b^2 = 25 - 9 = 16`)], [K(`\\text{latus rectum} = \\dfrac{2b^2}{a}`)], [K(`= \\dfrac{2 \\times 16}{3} = \\dfrac{32}{3}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'foci'), wt('A2', 'e'), wt('A3', 'b'), wt('A4', 'latus'), wt('A4', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · the hyperbola', y0: 96, dy: 76, txt: [1, 1, 0, 1, 1],
  lines: ['<b>Hyperbola</b>: |PF<sub>1</sub> - PF<sub>2</sub>| = 2a for every point P',
    '<b>Equation</b>: x²/a² - y²/b² = 1, foci (±c, 0)',
    K(`${fv('c')}^2 = ${o('a')}^2 + ${bt('b')}^2 \\qquad ${em('e')} = c/a > 1`),
    '<b>Latus rectum</b> = 2b²/a · <b>a²</b> sits under the plus term',
    '<b>Ellipse</b>: sum, e &lt; 1 · <b>Hyperbola</b>: difference, e &gt; 1'] });
const YQ = ['What stays the same for every point on a hyperbola?', 'For x²/9 - y²/7 = 1, find c.', 'Why is the eccentricity of a hyperbola always more than 1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 78', topic: 'Where exactly is the fan in the room? Coordinate Axes and Planes in 3D', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('P4', 'Eight') - 0.4, 1.04, 960, 560], [T1('P5'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const oo = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...oo });
    M.vis(hLamp, t, tMorph + 0.3, 1e9, { dy: 12 });
    hLit.forEach((l, i) => fade(l, t, tMorph + 0.8 + i * 0.1, 0.5));
    hEdge.forEach((e, i) => M.draw(e, t, tMorph + 1.3 + i * 0.3, 0.8)); hT.forEach((x, i) => M.vis(x, t, tMorph + 1.8 + i * 0.3, 1e9, { dy: 0 }));
    M.vis($('#hk'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis($('#hkImg'), t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'What') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('T1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.rise($('#dfT'), t, T0('P2'), { st: 0.05, sp: M.HEAVY });
    const sd = $('#dfT b'); sd.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('P2', 'difference')) / 0.3)); sd.style.borderRadius = '8px';
    M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    pF.forEach((f, i) => M.vis(f, t, wt('P1', 'foci') - 0.1 + i * 0.12, 1e9, DOT)); pFT.forEach((f, i) => M.vis(f, t, wt('P1', 'foci') + i * 0.12, 1e9, { dy: 0 }));
    pBrF.forEach(p => M.vis(p, t, wt('P3', 'Watch') - 0.3, 1e9, { dy: 0, fade: 0.3 }));
    M.draw(pBr[0], t, wt('P5', 'grow'), 1.2); M.draw(pBr[1], t, tJump, 1.2);
    const left = t >= tJump, y = left ? yL(t) : yR(t), x = (left ? -1 : 1) * A * Math.sqrt(1 + y * y / (Bb * Bb)), Px = PCn[0] + x * PU, Py = PCn[1] - y * PU;
    attr(pP, 'cx', Px.toFixed(1)); attr(pP, 'cy', Py.toFixed(1)); attr(pPT, 'x', (Px + (left ? -30 : 14)).toFixed(1)); attr(pPT, 'y', (Py - 14).toFixed(1));
    setL(pL1, PCn[0] - Cc * PU, PCn[1], Px, Py); setL(pL2, PCn[0] + Cc * PU, PCn[1], Px, Py);
    const live = wt('P3', 'Watch') - 0.2, jf = 1 - M.io((t - tJump + 0.25) / 0.2) + M.io((t - tJump - 0.05) / 0.2);
    [pP, pPT, pL1, pL2].forEach(el => { M.vis(el, t, live, 1e9, { dy: 0, fade: 0.2 }); if (t > tJump - 0.3 && t < tJump + 0.3) el.style.opacity = Math.min(1, jf).toFixed(3); });
    const r1 = Math.hypot(x + Cc, y), r2 = Math.hypot(x - Cc, y), s = r1.toFixed(2) + r2.toFixed(2);
    if (s !== pLast) { pLast = s; $('#pR1').innerHTML = `<span style="color:${PB}">PF<sub style="font-size:.6em">1</sub></span> = ${r1.toFixed(2)}`; $('#pR2').innerHTML = `<span style="color:${PG}">PF<sub style="font-size:.6em">2</sub></span> = ${r2.toFixed(2)}`;
      $('#pR3').innerHTML = `${r1 >= r2 ? 'PF<sub style="font-size:.6em">1</sub> - PF<sub style="font-size:.6em">2</sub>' : 'PF<sub style="font-size:.6em">2</sub> - PF<sub style="font-size:.6em">1</sub>'} = ${Math.abs(r1 - r2).toFixed(2)}`; }
    M.vis($('#pR1'), t, wt('P3', 'blue') - 0.1, 1e9, { dy: 10 }); M.vis($('#pR2'), t, wt('P3', 'gold') - 0.1, 1e9, { dy: 10 }); M.vis($('#pR3'), t, wt('P5', 'beats') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'hyperbola') - 0.4, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'differ') - 0.1, 0.9);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...oo }); gsol(t, tG1, tGs);
    M.vis($('#gr'), t, tG1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    gF.forEach(f => M.vis(f, t, tG1 + 0.4, 1e9, DOT)); M.draw(gTr, t, wt('G1', 'transverse') - 0.1, 0.6); M.vis(gTrT, t, wt('G1', 'axis'), 1e9, { dy: 0 });
    M.vis(gO, t, wt('G1', 'centre'), 1e9, DOT); M.vis(gOT, t, wt('G1', 'centre') + 0.1, 1e9, { dy: 0 });
    gV.forEach(v => M.vis(v, t, wt('G2', 'vertices'), 1e9, DOT)); M.draw(g2a, t, wt('G2', 'two'), 0.5); M.vis(g2aT, t, wt('G2', 'a', 2) + 0.1, 1e9, { dy: 0 });
    M.draw(g2c, t, wt('G2', 'foci'), 0.5); M.vis(g2cT, t, wt('G2', 'apart', 1), 1e9, { dy: 0 });
    const eOut = T0('G4');
    M.vis(gE1, t, wt('G3', 'One'), eOut, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); M.vis(gE1T, t, wt('G3', 'One') + 0.2, eOut, { dy: 0, outDur: 0.3, ody: 0 });
    M.vis(gE2, t, wt('G3', 'other'), eOut, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); M.vis(gE2T, t, wt('G3', 'other') + 0.2, eOut, { dy: 0, outDur: 0.3, ody: 0 });
    M.vis(gBox, t, wt('G4', 'defines'), 1e9, { dy: 0, fade: 0.3 }); M.draw(gDiag, t, wt('G4', 'squared') , 0.5); M.vis(gDiagT, t, wt('G4', 'c') , 1e9, { dy: 0 }); M.vis(gbT, t, wt('G4', 'b', 1), 1e9, { dy: 0 });
    M.draw(gConj, t, wt('G5', 'conjugate') - 0.4, 0.6); M.vis(gConjT, t, wt('G5', 'conjugate'), 1e9, { dy: 0 });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tE1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('E1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...oo }); rsol(t, tR1, tRs);
    const cur = tRs.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, 0);
    M.vis(rHi, t, tRs[0] - 0.15, 1e9, { dy: 0, fade: 0.2 }); rHi.style.top = (104 + cur * 92 - 18) + 'px';
    M.vis($('#rr'), t, tR1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    rBr.forEach((p, i) => M.draw(p, t, tR1 + 0.4 + i * 0.3, 0.9)); rF.forEach((f, i) => M.vis(f, t, wt('R1', 'foci') + i * 0.15, 1e9, DOT)); M.vis(rFT[0], t, wt('R1', 'minus'), 1e9, { dy: 0 }); M.vis(rFT[1], t, wt('R1', 'c', 1), 1e9, { dy: 0 });
    M.vis(rP, t, tRs[0] - 0.3, 1e9, DOT); M.vis(rPT, t, tRs[0] - 0.2, 1e9, { dy: 0 });
    M.draw(rL1, t, tRs[0], 0.4); M.draw(rL2, t, tRs[0] + 0.3, 0.4); M.vis(rSum, t, tRs[0] + 0.7, 1e9, { dy: 0 });
  }

  /* E */
  const eOn = t >= tE1 - 0.1 && t < tK1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('K1');
    M.vis($('#el'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...oo }); M.vis($('#er'), t, tE1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    const e = eAt(t), s = e.toFixed(2);
    if (s !== eLast) { eLast = s; const c = 3 * e, bb = Math.sqrt(c * c - 9);
      $('#eV').innerHTML = `<i style="font-family:Poppins;color:${EM}">e</i> = ${s}`; $('#eF').innerHTML = K(`${em('e')} = \\dfrac{${fv('c')}}{${o('a')}} = \\dfrac{${fv(c.toFixed(1))}}{${o('3')}}`);
      eBr.forEach((p, i) => attr(p, 'd', brD(ECn, EU, 3, bb, i ? -1 : 1, 7.5))); eF.forEach((f, i) => attr(f.parentNode, 'transform', `translate(${(ECn[0] + (i ? 1 : -1) * c * EU).toFixed(1)},${ECn[1]})`));
      setL(eCb, ECn[0], ECn[1] - 30, ECn[0] + c * EU, ECn[1] - 30); attr(eCT, 'x', (ECn[0] + c * EU / 2).toFixed(1)); attr(eCT, 'y', ECn[1] - 42);
      setL(eBar, EBx(1), EBy, EBx(e), EBy); attr(eMk, 'cx', EBx(e).toFixed(1)); }
    M.vis($('#eV'), t, wt('E1', 'eccentricity'), 1e9, { dy: 10 }); M.vis($('#eF'), t, wt('E1', 'over') - 0.2, 1e9, { dy: 10 });
    eBr.forEach(p => M.vis(p, t, tE1 + 0.3, 1e9, { dy: 0, fade: 0.3 })); eF.forEach(f => M.vis(f, t, tE1 + 0.4, 1e9, DOT)); eV.forEach(v => M.vis(v, t, tE1 + 0.4, 1e9, DOT));
    M.vis(eCb, t, wt('E1', 'c'), 1e9, { dy: 0, fade: 0.2 }); M.vis(eCT, t, wt('E1', 'c'), 1e9, { dy: 0 }); M.draw(eAb, t, wt('E1', 'over'), 0.4); M.vis(eAT, t, wt('E1', 'over') + 0.2, 1e9, { dy: 0 });
    M.vis(eBar, t, wt('E1', 'eccentricity') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(eMk, t, wt('E1', 'eccentricity') + 0.2, 1e9, DOT); eBl.forEach(l => M.vis(l, t, tE0, 1e9, { dy: 0 }));
    M.vis($('#eP'), t, wt('E2', 'always') - 0.1, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.draw(kE, t, wt('K1', 'Ellipse'), 0.8); M.draw(kE1, t, wt('K1', 'distances'), 0.4); M.draw(kE2, t, wt('K1', 'distances') + 0.2, 0.4);
    tK1r.forEach((tt, i) => M.vis($('#kr1' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...oo });
    kH.forEach((p, i) => M.draw(p, t, wt('K2', 'Hyperbola') + i * 0.2, 0.8)); M.draw(kH1, t, wt('K2', 'distances'), 0.4); M.draw(kH2, t, wt('K2', 'distances') + 0.2, 0.4);
    tK2r.forEach((tt, i) => M.vis($('#kr2' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...oo });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Where') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'hyperbola') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#wq'), t, T0('W2') + 0.2, 1.0); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...oo });
    wBr.forEach((p, i) => M.draw(p, t, tWs[0] + 0.5 + i * 0.3, 0.9));
    M.vis(wAx, t, wt('W4', 'transverse'), 1e9, { dy: 0 }); wV.forEach(v => M.vis(v, t, wt('W4', 'four'), 1e9, DOT)); M.vis(wVT, t, wt('W4', 'four') + 0.1, 1e9, { dy: 0 });
    wF.forEach(f => M.vis(f, t, wt('W5', 'foci'), 1e9, DOT)); M.vis(wFT, t, wt('W5', 'foci') + 0.2, 1e9, { dy: 0 });
    M.draw(wLR, t, wt('W6', 'latus'), 0.5); M.vis(wLRT, t, wt('W6', 'nine'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'In') });
    M.draw(tA, t, wt('X3', 'three') - 0.2, 0.4); M.vis(tAT, t, wt('X3', 'three'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'question') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
