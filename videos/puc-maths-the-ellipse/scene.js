// PUC Maths Ep 76: The ellipse (Proof board)
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
const ellD = (cx, cy, rx, ry) => `M${cx + rx},${cy} A${rx},${ry} 0 1 1 ${cx - rx},${cy} A${rx},${ry} 0 1 1 ${cx + rx},${cy}`;
// partial ellipse from angle 0 to th (math angle, counter-clockwise), centre px, radii px
const arcD = (cx, cy, rx, ry, th0, th1) => { let d = ''; const n = Math.max(2, Math.ceil(Math.abs(th1 - th0) / 0.04)); for (let i = 0; i <= n; i++) { const q = th0 + (th1 - th0) * i / n; d += (i ? 'L' : 'M') + (cx + rx * Math.cos(q)).toFixed(1) + ',' + (cy - ry * Math.sin(q)).toFixed(1); } return d; };
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
const LS = [['TWO PINS', 'a loop of string'], ['A TIGHT PENCIL', 'a perfect oval'], ['WHY SO NEAT?', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Loop'), wt('H2', 'oval'), wt('H2', 'oval') + 0.6];

/* ---------- H: pins and string on a board ---------- */
const hs = $('#hS');
mk(hs, 'rect', { x: 44, y: 70, width: 696, height: 476, rx: 16, fill: '#F1E2C6', stroke: '#D9C29A', 'stroke-width': 3 });
mk(hs, 'rect', { x: 92, y: 120, width: 600, height: 376, rx: 6, fill: '#FFFFFF', stroke: '#E6DCC8', 'stroke-width': 2 });
const HC = [392, 308], HA = 250, HB = 150, HCc = Math.sqrt(HA * HA - HB * HB);
const hTr = mk(hs, 'path', { fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hS1 = ln(hs, 0, 0, 0, 0, '#8A6D3B', 3), hS2 = ln(hs, 0, 0, 0, 0, '#8A6D3B', 3), hS3 = ln(hs, HC[0] - HCc, HC[1], HC[0] + HCc, HC[1], '#8A6D3B', 3);
const hPins = [-1, 1].map(s => dotG(hs, HC[0] + s * HCc, HC[1], 10, FV, '#fff'));
const hPen = mk(mk(hs, 'g', {}), 'g', {}); mk(hPen, 'path', { d: 'M0,0 l-8,-16 l46,-46 l16,16 l-46,46 z', fill: '#F2B33D', stroke: C.ink2, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); mk(hPen, 'path', { d: 'M0,0 l-8,-16 l8,4 z', fill: C.ink2 });
const tH0 = tMorph + 0.4, tH1 = wt('H4', 'neat') - 0.3, hTh = t => 2 * Math.PI * M.io((t - tH0) / (tH1 - tH0));

/* ---------- P: definition + the pencil runs round (a = 5, b = 4, c = 3) ---------- */
$('#dfT').style.top = '80px';
const ps = $('#pS'), PCn = [392, 316], PU = 56, PA = 5, PBb = 4, PCc = 3;
axes(ps, PCn, 60, 724, 548, 82);
mk(ps, 'path', { d: ellD(PCn[0], PCn[1], PA * PU, PBb * PU), fill: 'none', stroke: '#F3D0C4', 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const pTr = mk(ps, 'path', { fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pL0 = ln(ps, PCn[0] - PCc * PU, PCn[1], PCn[0] + PCc * PU, PCn[1], '#C9CED8', 3);
const pL1 = ln(ps, 0, 0, 0, 0, PB, 5), pL2 = ln(ps, 0, 0, 0, 0, PG, 5);
const pF = [-1, 1].map(s => dotG(ps, PCn[0] + s * PCc * PU, PCn[1], 10, FV, '#fff'));
const pFT = [lab(ps, PCn[0] - PCc * PU, PCn[1] + 32, 'F₁', FV, { 'text-anchor': 'middle' }), lab(ps, PCn[0] + PCc * PU, PCn[1] + 32, 'F₂', FV, { 'text-anchor': 'middle' })];
const pP = mk(ps, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 }); const pPT = ital(ps, 0, 0, 'P', RC, 24, HALO);
const TH7 = Math.acos(2 / 3), TH4 = Math.acos(-1 / 3);
const kP = [[wt('P3', 'Watch'), 0], [wt('P4', 'Seven'), TH7], [wt('P4', 'Four'), TH4], [wt('P5', 'add'), TH4], [T1('P5') - 0.2, TH4 + 2 * Math.PI]];
const thAt = t => { if (t <= kP[0][0]) return 0; for (let i = 1; i < kP.length; i++) if (t < kP[i][0]) { const [a, ya] = kP[i - 1], [c, yc] = kP[i]; const d = i === 4 ? c - a : Math.max(0.3, Math.min(0.9, c - a - 0.7)); return ya + (yc - ya) * M.io((t - (c - d)) / d); } return kP[kP.length - 1][1]; };
let pLast = '';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${b('PF_1')} + ${gd('PF_2')} = \\text{constant}`);

/* ---------- G: parts ---------- */
const gsol = PUC.solution($('#gl'), [
  ['Centre: the midpoint of the foci'],
  [K(`\\text{major axis } ${o('2a')},\\ \\ \\text{minor axis } ${bt('2b')},\\ \\ F_1F_2 = ${fv('2c')}`)],
  [K(`\\text{at the end: } ${b('PF_1')} + ${gd('PF_2')} = ${o('2a')}`)],
  [K(`\\text{at the top: each distance} = ${o('a')}`)],
  [K(`${o('a')}^2 = ${bt('b')}^2 + ${fv('c')}^2`)]], { label: 'THE PARTS', y0: 100, dy: 92 });
const tGs = [wt('G1', 'centre'), wt('G2', 'major'), wt('G4', 'end'), wt('G5', 'top'), wt('G6', 'So')];
const gs = $('#gS'), GC = [392, 316];
const gX = v => GC[0] + v * PU, gY = v => GC[1] - v * PU;
mk(gs, 'path', { d: ellD(GC[0], GC[1], 5 * PU, 4 * PU), fill: 'none', stroke: RC, 'stroke-width': 5 });
const gMaj = ln(gs, gX(-5), gY(0), gX(5), gY(0), AO, 5), gMin = ln(gs, gX(0), gY(-4), gX(0), gY(4), BT, 5);
const gMajT = lab(gs, gX(-4.5), gY(0) - 12, '2a', AO), gMinT = lab(gs, gX(0) + 12, gY(-3.1), '2b', BT);
const gO = dotG(gs, GC[0], GC[1], 8, C.ink); const gOT = lab(gs, GC[0] - 12, GC[1] - 14, 'centre', C.ink, { 'text-anchor': 'end' });
const gF = [-3, 3].map(x => dotG(gs, gX(x), gY(0), 10, FV, '#fff'));
const g2c = ln(gs, gX(-3), gY(0) + 48, gX(3), gY(0) + 48, FV, 3); const g2cT = lab(gs, GC[0] + 14, gY(0) + 74, '2c', FV);
const gE1 = ln(gs, gX(-3), gY(0), gX(5), gY(0) - 6, PB, 4), gE2 = ln(gs, gX(3), gY(0), gX(5), gY(0) + 6, PG, 4);
const gEd = dotG(gs, gX(5), gY(0), 10, RC, '#fff');
const gT1 = ln(gs, gX(-3), gY(0), gX(0), gY(4), PB, 4), gT2 = ln(gs, gX(3), gY(0), gX(0), gY(4), PG, 4);
const gTd = dotG(gs, gX(0), gY(4), 10, RC, '#fff');
const gTa = [lab(gs, gX(-1.9), gY(2.3), 'a', AO, { 'font-size': 24, 'text-anchor': 'end' }), lab(gs, gX(1.9), gY(2.3), 'a', AO, { 'font-size': 24 })];
const gTri = mk(gs, 'path', { d: `M${gX(0)},${gY(0)} L${gX(3)},${gY(0)} L${gX(0)},${gY(4)} Z`, fill: C.ac2, opacity: 0.8 }); gs.insertBefore(gTri, gs.firstChild);
const gSq = mk(gs, 'path', { d: `M${gX(0) + 18},${gY(0)} v-18 h-18`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 });
const gc = lab(gs, gX(1.5), gY(0) + 26, 'c', FV, { 'font-size': 24, 'text-anchor': 'middle' }), gb = lab(gs, gX(0) - 14, gY(1.4), 'b', BT, { 'font-size': 24, 'text-anchor': 'end' });

/* ---------- R: derivation ---------- */
const rsol = PUC.solution($('#rl'), [
  [K(`${b('\\sqrt{(x + c)^2 + y^2}')} + ${gd('\\sqrt{(x - c)^2 + y^2}')} = ${o('2a')}`)],
  [K(`a - \\dfrac{c}{a}x = ${gd('\\sqrt{(x - c)^2 + y^2}')}`)],
  [K(`x^2\\,\\dfrac{a^2 - c^2}{a^2} + y^2 = a^2 - c^2`)],
  [K(`x^2\\,\\dfrac{${bt('b')}^2}{a^2} + y^2 = ${bt('b')}^2`)],
  [K(`\\dfrac{x^2}{${o('a')}^2} + \\dfrac{y^2}{${bt('b')}^2} = 1`)]], { label: 'THE EQUATION · STEP BY STEP', y0: 104, dy: 92 });
const tRs = [wt('R2', 'Step'), wt('R3', 'square'), wt('R4', 'square'), wt('R5', 'Swap'), wt('R6', 'there')];
const rs = $('#rS'), RCn = [392, 316];
axes(rs, RCn, 60, 724, 548, 82);
const rE = mk(rs, 'path', { d: ellD(RCn[0], RCn[1], 5 * PU, 4 * PU), fill: 'none', stroke: RC, 'stroke-width': 5 });
const RPt = [RCn[0] + 5 * PU * Math.cos(1.0), RCn[1] - 4 * PU * Math.sin(1.0)];
const rL1 = ln(rs, RCn[0] - 3 * PU, RCn[1], RPt[0], RPt[1], PB, 5), rL2 = ln(rs, RCn[0] + 3 * PU, RCn[1], RPt[0], RPt[1], PG, 5);
const rF = [-1, 1].map(s => dotG(rs, RCn[0] + s * 3 * PU, RCn[1], 10, FV, '#fff'));
const rFT = [lab(rs, RCn[0] - 3 * PU, RCn[1] + 32, '(-c, 0)', FV, { 'text-anchor': 'middle' }), lab(rs, RCn[0] + 3 * PU, RCn[1] + 32, '(c, 0)', FV, { 'text-anchor': 'middle' })];
const rP = dotG(rs, RPt[0], RPt[1], 11, RC, '#fff'); const rPT = lab(rs, RPt[0] + 16, RPt[1] - 14, 'P (x, y)', RC);
const rSum = lab(rs, 44, 96, 'blue + gold = 2a', C.ink, { 'font-size': 22 });
const rHi = $('#rHi');

/* ---------- E: live eccentricity ---------- */
const es = $('#eS'), ECn = [392, 316];
axes(es, ECn, 60, 724, 548, 82);
const eE = mk(es, 'path', { fill: 'none', stroke: RC, 'stroke-width': 5 });
const eF = [-1, 1].map(() => dotG(es, 0, 0, 10, FV, '#fff'));
const eCb = ln(es, 0, 0, 0, 0, FV, 4), eAb = ln(es, ECn[0], ECn[1] + 44, ECn[0] + 5 * PU, ECn[1] + 44, AO, 4);
const eCT = lab(es, 0, 0, 'c', FV, { 'font-size': 22, 'text-anchor': 'middle' }), eAT = lab(es, ECn[0] + 2.5 * PU, ECn[1] + 72, 'a = 5', AO, { 'text-anchor': 'middle' });
const eb = $('#eB'), EBx = v => 60 + v * 660, EBy = 330;
ln(eb, EBx(0), EBy, EBx(1), EBy, C.ink, 3); [0, 1].forEach(v => { ln(eb, EBx(v), EBy - 12, EBx(v), EBy + 12, C.ink, 3); txt(eb, EBx(v), EBy + 44, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); });
const eBar = ln(eb, EBx(0), EBy, EBx(0), EBy, EM, 10); const eMk = mk(eb, 'circle', { cx: EBx(0), cy: EBy, r: 13, fill: EM, stroke: '#fff', 'stroke-width': 3 });
const eBl = [lab(eb, EBx(0) + 6, EBy - 30, 'round', C.mute), lab(eb, EBx(1) - 6, EBy - 30, 'flat', C.mute, { 'text-anchor': 'end' })];
const tE0 = wt('E2', 'grow'), tE1b = wt('E2', 'flatter') + 0.4, eAt = t => 0.2 + 0.7 * M.io((t - tE0) / (tE1b - tE0));
let eLast = '';

/* ---------- K: major axis on x vs on y ---------- */
$('#kF1').innerHTML = K(`\\tfrac{x^2}{${o('16')}} + \\tfrac{y^2}{${bt('4')}} = 1`); $('#kF2').innerHTML = K(`\\tfrac{x^2}{${bt('4')}} + \\tfrac{y^2}{${o('16')}} = 1`);
const KU = 44, mini = (svg, O, A, B, vert) => { axes(svg, O, O[0] - 230, O[0] + 230, O[1] + 190, O[1] - 190); const rx = (vert ? B : A) * KU, ry = (vert ? A : B) * KU;
  const e = mk(svg, 'path', { d: ellD(O[0], O[1], rx, ry), fill: 'none', stroke: RC, 'stroke-width': 5 }); const c = Math.sqrt(A * A - B * B) * KU;
  const f = [-1, 1].map(s => dotG(svg, O[0] + (vert ? 0 : s * c), O[1] - (vert ? s * c : 0), 9, FV, '#fff'));
  const m = vert ? ln(svg, O[0], O[1] - ry, O[0], O[1] + ry, AO, 5) : ln(svg, O[0] - rx, O[1], O[0] + rx, O[1], AO, 5); svg.insertBefore(m, e); return { e, f, m }; };
const k1 = mini($('#kS1'), [392, 300], 4, 2, false), k2 = mini($('#kS2'), [392, 300], 4, 2, true);
const th1 = PUC.think($('#th1'), { q: `${K('\\tfrac{x^2}{9} + \\tfrac{y^2}{25} = 1')}: which axis is major, and where are the foci?`, opts: ['y axis, foci (0, ±4)', 'x axis, foci (±4, 0)'], right: 0, why: '25 is bigger, so a = 5 on the y axis, b = 3, and c = √(25 - 9) = 4.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = K('4x^2 + 9y^2 = 36') + '<span class="why2" style="font-size:26px">&nbsp;&nbsp;a, b, c, e, latus rectum?</span>';
const wsol = PUC.solution($('#wl'), [
  [K(`\\div 36:\\ \\ \\dfrac{x^2}{${o('9')}} + \\dfrac{y^2}{${bt('4')}} = 1`)],
  [K(`${o('a')} = 3,\\ \\ ${bt('b')} = 2,\\ \\ ${fv('c')} = \\sqrt{9 - 4} = \\sqrt{5}`)],
  [K(`${em('e')} = \\dfrac{c}{a} = \\dfrac{\\sqrt{5}}{3}`)],
  [K(`\\text{latus rectum} = \\dfrac{2b^2}{a} = ${lg('\\dfrac{8}{3}')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Divide'), wt('W4', 'So'), wt('W5', 'eccentricity'), wt('W6', 'latus')];
const ws = $('#wS'), WC = [392, 316], WU = 84;
axes(ws, WC, 60, 724, 548, 82);
const wE = mk(ws, 'path', { d: ellD(WC[0], WC[1], 3 * WU, 2 * WU), fill: 'none', stroke: RC, 'stroke-width': 5 });
const wA = ln(ws, WC[0], WC[1], WC[0] + 3 * WU, WC[1], AO, 5), wB = ln(ws, WC[0], WC[1], WC[0], WC[1] - 2 * WU, BT, 5);
const wAT = lab(ws, WC[0] + 1.5 * WU, WC[1] - 12, 'a = 3', AO, { 'text-anchor': 'middle' }), wBT = lab(ws, WC[0] - 12, WC[1] - WU, 'b = 2', BT, { 'text-anchor': 'end' });
const W5 = Math.sqrt(5) * WU; const wF = [-1, 1].map(s => dotG(ws, WC[0] + s * W5, WC[1], 10, FV, '#fff'));
const wFT = lab(ws, WC[0] + W5 - 14, WC[1] + 32, '(√5, 0)', FV, { 'text-anchor': 'end' });
const wLR = ln(ws, WC[0] + W5, WC[1] - 4 / 3 * WU, WC[0] + W5, WC[1] + 4 / 3 * WU, LG, 6); const wLRT = lab(ws, WC[0] + W5 + 14, WC[1] + 0.9 * WU, '8/3', LG);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{ellipse: } c^2 = a^2 + b^2`), right: K(`\\text{ellipse: } ${fv('c')}^2 = ${o('a')}^2 - ${bt('b')}^2,\\ \\ \\text{so } c < a`) });
const ts = $('#tS'), TC = [280, 137], TU = 36;
mk(ts, 'path', { d: ellD(TC[0], TC[1], 5 * TU, 3 * TU), fill: 'none', stroke: RC, 'stroke-width': 4 });
ln(ts, TC[0], TC[1] + 2, TC[0] + 5 * TU, TC[1] + 2, AO, 4); lab(ts, TC[0] + 4.2 * TU, TC[1] - 10, 'a', AO, { 'font-size': 22 });
ln(ts, TC[0], TC[1] + 12, TC[0] + 4 * TU, TC[1] + 12, FV, 4); lab(ts, TC[0] + 2 * TU, TC[1] + 38, 'c', FV, { 'font-size': 22 });
[-4, 4].forEach(x => dotG(ts, TC[0] + x * TU, TC[1], 8, FV, '#fff'));
const tIn = lab(ts, TC[0], TC[1] - 34, 'foci inside', FV, { 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find a, b, c, the eccentricity or the latus rectum from the foci and one more fact.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: 'An ellipse has foci at (±4, 0), and for every point on it the distances to the foci add up to 10. Its latus rectum is',
  opts: ['9/5', '18/5', '16/5', '36/5'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`2a = 10 \\Rightarrow a = 5`)], [K(`\\text{foci} \\Rightarrow c = 4`)], [K(`b^2 = 25 - 16 = 9`)], [K(`\\text{latus rectum} = \\dfrac{2b^2}{a}`)], [K(`= \\dfrac{2 \\times 9}{5} = \\dfrac{18}{5}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'sum'), wt('A2', 'foci'), wt('A3', 'b'), wt('A4', 'latus'), wt('A4', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · the ellipse', y0: 96, dy: 76, txt: [1, 1, 0, 1, 1],
  lines: ['<b>Ellipse</b>: PF<sub>1</sub> + PF<sub>2</sub> = 2a for every point P',
    '<b>Equation</b>: x²/a² + y²/b² = 1 with a &gt; b, foci (±c, 0)',
    K(`${fv('c')}^2 = ${o('a')}^2 - ${bt('b')}^2 \\qquad ${em('e')} = c/a < 1`),
    '<b>Latus rectum</b> = 2b²/a',
    '<b>The bigger number</b> is a², and it names the major axis'] });
const YQ = ['What stays the same for every point on an ellipse?', 'For x²/16 + y²/7 = 1, find c.', 'Why is the eccentricity of an ellipse always less than 1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 77', topic: 'The curved shadow of a lamp on a wall: The Hyperbola', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('P4', 'Seven') - 0.4, 1.04, 960, 560], [T1('P5'), 1, 960, 540]]);

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
    const th = hTh(t), px = HC[0] + HA * Math.cos(th), py = HC[1] - HB * Math.sin(th);
    attr(hTr, 'd', arcD(HC[0], HC[1], HA, HB, 0, Math.max(0.001, th))); M.hide(hTr, t < tH0 + 0.02);
    setL(hS1, HC[0] - HCc, HC[1], px, py); setL(hS2, HC[0] + HCc, HC[1], px, py);
    attr(hPen.parentNode, 'transform', `translate(${px.toFixed(1)},${py.toFixed(1)})`);
    [hS1, hS2, hS3, hPen].forEach(el => M.vis(el, t, tMorph + 0.3, 1e9, { dy: 0, fade: 0.2 })); hPins.forEach((p, i) => M.vis(p, t, tMorph + 0.2 + i * 0.1, 1e9, DOT));
    M.vis($('#hk'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis($('#hkImg'), t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'why') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('T1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.rise($('#dfT'), t, T0('P2'), { st: 0.05, sp: M.HEAVY });
    const sd = $('#dfT b'); sd.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('P2', 'constant')) / 0.3)); sd.style.borderRadius = '8px';
    M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    pF.forEach((f, i) => M.vis(f, t, wt('P1', 'foci') - 0.1 + i * 0.12, 1e9, DOT)); pFT.forEach((f, i) => M.vis(f, t, wt('P1', 'foci') + i * 0.12, 1e9, { dy: 0 }));
    const th = thAt(t), x = PA * Math.cos(th), y = PBb * Math.sin(th), Px = PCn[0] + x * PU, Py = PCn[1] - y * PU, live = wt('P3', 'Watch') - 0.2;
    attr(pP, 'cx', Px.toFixed(1)); attr(pP, 'cy', Py.toFixed(1)); attr(pPT, 'x', (PCn[0] + (x * 1.1) * PU - 8).toFixed(1)); attr(pPT, 'y', (PCn[1] - (y * 1.14) * PU + 9).toFixed(1));
    setL(pL1, PCn[0] - PCc * PU, PCn[1], Px, Py); setL(pL2, PCn[0] + PCc * PU, PCn[1], Px, Py);
    [pP, pPT, pL0].forEach(el => M.vis(el, t, live, 1e9, { dy: 0, fade: 0.2 })); M.vis(pL1, t, wt('P3', 'blue') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(pL2, t, wt('P3', 'gold') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    attr(pTr, 'd', arcD(PCn[0], PCn[1], PA * PU, PBb * PU, 0, Math.max(0.001, th))); M.hide(pTr, t < live + 0.3);
    const r1 = Math.hypot(x + PCc, y), r2 = Math.hypot(x - PCc, y), s = r1.toFixed(2) + r2.toFixed(2);
    if (s !== pLast) { pLast = s; $('#pR1').innerHTML = `<span style="color:${PB}">PF<sub style="font-size:.6em">1</sub></span> = ${r1.toFixed(2)}`; $('#pR2').innerHTML = `<span style="color:${PG}">PF<sub style="font-size:.6em">2</sub></span> = ${r2.toFixed(2)}`; $('#pR3').innerHTML = `sum = ${(r1 + r2).toFixed(2)}`; }
    M.vis($('#pR1'), t, wt('P3', 'blue') - 0.1, 1e9, { dy: 10 }); M.vis($('#pR2'), t, wt('P3', 'gold') - 0.1, 1e9, { dy: 10 }); M.vis($('#pR3'), t, wt('P5', 'add') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'two') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'add') - 0.1, 0.9);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...oo }); gsol(t, tG1, tGs);
    M.vis($('#gr'), t, tG1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    gF.forEach(f => M.vis(f, t, tG1 + 0.4, 1e9, DOT)); M.vis(gO, t, wt('G1', 'centre'), 1e9, DOT); M.vis(gOT, t, wt('G1', 'centre') + 0.1, 1e9, { dy: 0 });
    M.draw(gMaj, t, wt('G2', 'long'), 0.6); M.vis(gMajT, t, wt('G2', 'two'), 1e9, { dy: 0 });
    M.draw(gMin, t, wt('G3', 'short'), 0.6); M.vis(gMinT, t, wt('G3', 'two'), 1e9, { dy: 0 });
    M.draw(g2c, t, wt('G3', 'foci'), 0.5); M.vis(g2cT, t, wt('G3', 'apart') - 0.2, 1e9, { dy: 0 });
    const eOut = T0('G5') - 0.1;
    [gE1, gE2].forEach((l, i) => M.vis(l, t, wt('G4', 'end') + i * 0.2, eOut, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 })); M.vis(gEd, t, wt('G4', 'end'), eOut, { ...DOT, outDur: 0.3, ody: 0 });
    [gT1, gT2].forEach((l, i) => M.draw(l, t, wt('G5', 'top') + i * 0.2, 0.5)); M.vis(gTd, t, wt('G5', 'top'), 1e9, DOT); gTa.forEach(a => M.vis(a, t, wt('G5', 'each'), 1e9, { dy: 0 }));
    fade(gTri, t, wt('G6', 'right') - 0.1, 0.5, 0.8); M.vis(gSq, t, wt('G6', 'right'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gb, t, wt('G6', 'b'), 1e9, { dy: 0 }); M.vis(gc, t, wt('G6', 'c'), 1e9, { dy: 0 });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tE1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('E1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...oo }); rsol(t, tR1, tRs);
    const cur = tRs.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, 0);
    M.vis(rHi, t, tRs[0] - 0.15, 1e9, { dy: 0, fade: 0.2 }); rHi.style.top = (104 + cur * 92 - 18) + 'px';
    M.vis($('#rr'), t, tR1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.draw(rE, t, tR1 + 0.4, 0.9); rF.forEach((f, i) => M.vis(f, t, wt('R1', 'foci') + i * 0.15, 1e9, DOT)); M.vis(rFT[0], t, wt('R1', 'minus'), 1e9, { dy: 0 }); M.vis(rFT[1], t, wt('R1', 'c', 1), 1e9, { dy: 0 });
    M.vis(rP, t, tRs[0] - 0.3, 1e9, DOT); M.vis(rPT, t, tRs[0] - 0.2, 1e9, { dy: 0 });
    M.draw(rL1, t, tRs[0], 0.4); M.draw(rL2, t, tRs[0] + 0.3, 0.4); M.vis(rSum, t, tRs[0] + 0.7, 1e9, { dy: 0 });
  }

  /* E */
  const eOn = t >= tE1 - 0.1 && t < tK1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('K1');
    M.vis($('#el'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...oo }); M.vis($('#er'), t, tE1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    const e = eAt(t), s = e.toFixed(2);
    if (s !== eLast) { eLast = s; const c = 5 * e, bb = 5 * Math.sqrt(1 - e * e);
      $('#eV').innerHTML = `<i style="font-family:Poppins;color:${EM}">e</i> = ${s}`; $('#eF').innerHTML = K(`${em('e')} = \\tfrac{${fv('c')}}{${o('a')}} = \\tfrac{${fv(c.toFixed(1))}}{${o('5')}}`);
      attr(eE, 'd', ellD(ECn[0], ECn[1], 5 * PU, bb * PU)); eF.forEach((f, i) => attr(f.parentNode, 'transform', `translate(${(ECn[0] + (i ? 1 : -1) * c * PU).toFixed(1)},${ECn[1]})`));
      setL(eCb, ECn[0], ECn[1] - 36, ECn[0] + c * PU, ECn[1] - 36); attr(eCT, 'x', (ECn[0] + c * PU / 2).toFixed(1)); attr(eCT, 'y', ECn[1] - 48);
      setL(eBar, EBx(0), EBy, EBx(e), EBy); attr(eMk, 'cx', EBx(e).toFixed(1)); }
    M.vis($('#eV'), t, wt('E1', 'eccentricity'), 1e9, { dy: 10 }); M.vis($('#eF'), t, wt('E1', 'over') - 0.2, 1e9, { dy: 10 });
    M.vis(eE, t, tE1 + 0.3, 1e9, { dy: 0, fade: 0.3 }); eF.forEach(f => M.vis(f, t, tE1 + 0.4, 1e9, DOT));
    M.vis(eCb, t, wt('E1', 'c') , 1e9, { dy: 0, fade: 0.2 }); M.vis(eCT, t, wt('E1', 'c'), 1e9, { dy: 0 }); M.draw(eAb, t, wt('E1', 'a', 2), 0.4); M.vis(eAT, t, wt('E1', 'a', 2), 1e9, { dy: 0 });
    M.vis(eBar, t, wt('E1', 'eccentricity') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(eMk, t, wt('E1', 'eccentricity') + 0.2, 1e9, DOT); eBl.forEach(l => M.vis(l, t, tE0, 1e9, { dy: 0 }));
    M.vis($('#eP'), t, wt('E2', 'between') - 0.1, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#kF1'), t, tK1 + 0.3, 0.6);
    M.draw(k1.e, t, wt('K1', 'bigger'), 0.8); M.draw(k1.m, t, wt('K1', 'major'), 0.5); k1.f.forEach(f => M.vis(f, t, wt('K1', 'axis') , 1e9, DOT));
    M.vis($('#kP1'), t, T1('K1') - 0.6, 1e9, POP);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...oo }); PUC.write($('#kF2'), t, T0('K2') + 0.2, 0.6);
    M.draw(k2.e, t, wt('K2', 'squared'), 0.8); M.draw(k2.m, t, wt('K2', 'major'), 0.5); k2.f.forEach(f => M.vis(f, t, wt('K2', 'stands'), 1e9, DOT));
    M.vis($('#kP2'), t, wt('K2', 'always') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...oo });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Twenty') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#wq'), t, T0('W2') + 0.2, 1.0); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.draw(wE, t, tWs[0] + 0.5, 0.9);
    M.draw(wA, t, wt('W4', 'a'), 0.4); M.vis(wAT, t, wt('W4', 'three'), 1e9, { dy: 0 }); M.draw(wB, t, wt('W4', 'b'), 0.4); M.vis(wBT, t, wt('W4', 'two', 1), 1e9, { dy: 0 });
    wF.forEach(f => M.vis(f, t, wt('W4', 'c'), 1e9, DOT)); M.vis(wFT, t, wt('W4', 'root', 1), 1e9, { dy: 0 });
    M.draw(wLR, t, tWs[3], 0.5); M.vis(wLRT, t, wt('W6', 'eight'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'foci') - 0.1, tRight: wt('X3', 'For') });
    M.vis(tIn, t, wt('X3', 'inside'), 1e9, { dy: 0 });
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
