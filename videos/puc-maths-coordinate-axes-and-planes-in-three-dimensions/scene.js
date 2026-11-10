// PUC Maths Ep 78: Coordinate axes and planes in three dimensions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 11): x and the x axis blue, y teal, z orange, the point P coral (accent), its foot violet;
// planes: XY light blue, YZ light teal, ZX light orange
const XB = '#2F6FEB', YT = C.teal, ZO = C.orange, RC = C.ac, FV = C.violet;
const PXY = '#E7EEFD', PYZ = '#DDF0F0', PZX = '#FBE6D3';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const col = c => s => `\\textcolor{${c}}{${s}}`;
const xb = col(XB), yt = col(YT), zo = col(ZO), rc = col(RC), fv = col(FV);
const HALO = { stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' };
const ital = (p, x, y, s, fill, size = 26, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': size, fill }, a));
const dotG = (svg, x, y, r, fill, stroke, sw = 3) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); g.c = mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': sw }); return g; };
const fade = (el, t, t0, d = 0.4, to = 1) => { el.style.opacity = (to * M.io((t - t0) / d)).toFixed(3); M.hide(el, t < t0); };
const lab = (p, x, y, s, fill, a = {}) => txt(p, x, y, s, Object.assign({ 'font-size': 19, fill, 'font-weight': 600 }, HALO, a));
const ln = (p, a, b, stroke, w = 4, o = {}) => mk(p, 'line', Object.assign({ x1: a[0].toFixed(1), y1: a[1].toFixed(1), x2: b[0].toFixed(1), y2: b[1].toFixed(1), stroke, 'stroke-width': w, 'stroke-linecap': 'round' }, o));
const setL = (l, a, b) => { attr(l, 'x1', a[0].toFixed(1)); attr(l, 'y1', a[1].toFixed(1)); attr(l, 'x2', b[0].toFixed(1)); attr(l, 'y2', b[1].toFixed(1)); };
const poly = (p, pts, fill, o = {}) => mk(p, 'path', Object.assign({ d: 'M' + pts.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join('L') + 'Z', fill }, o));
// oblique projection: x comes toward the viewer (down-left), y to the right, z up
const proj = (O, u, ey = 0.95) => (x, y, z) => [O[0] + u * (-0.6 * x + ey * y), O[1] + u * (0.45 * x - z)];
// axes with arrows; neg = also draw the negative half dashed
const axes3 = (svg, Q, L, neg = false) => { const g = mk(svg, 'g', {}), o = Q(0, 0, 0);
  [[[L[0], 0, 0], XB, 'x'], [[0, L[1], 0], YT, 'y'], [[0, 0, L[2]], ZO, 'z']].forEach(([p, c, n], i) => {
    const e = Q(...p); ln(g, o, e, c, 3.5); const dx = e[0] - o[0], dy = e[1] - o[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    mk(g, 'path', { d: `M${e[0] + ux * 12},${e[1] + uy * 12} L${e[0] - uy * 7},${e[1] + ux * 7} L${e[0] + uy * 7},${e[1] - ux * 7} Z`, fill: c });
    ital(g, e[0] + ux * 30 - 8, e[1] + uy * 30 + 9, n, c, 26);
    if (neg) { const q = Q(...p.map(v => -v * (i === 2 ? 1 : 1))); ln(g, o, q, c, 3, { 'stroke-dasharray': '8 7', opacity: 0.75 }); ital(g, q[0] + (q[0] - o[0]) / d * 26 - 10, q[1] + (q[1] - o[1]) / d * 26 + 9, n + "'", c, 22); } });
  return g; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tG1 = T0('G1'), tP1 = T0('P1'), tS1 = T0('S1'), tS3 = T0('S3'), tT = T0('T1'), tO1 = T0('O1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tO1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ON THE FLOOR', 'two numbers'], ['THE FAN', 'up in the air'], ['HOW HIGH?', 'a third number']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H2', 'Two'), wt('H2', 'air'), wt('H2', 'air') + 0.6];

/* ---------- the room (shared drawing) ---------- */
const RQ = proj([330, 384], 66, 0.92), RX = 5, RY = 6, RZ = 3;
const room = (svg, withAxes = true) => { const g = mk(svg, 'g', {});
  const fl = poly(g, [RQ(0, 0, 0), RQ(RX, 0, 0), RQ(RX, RY, 0), RQ(0, RY, 0)], PXY);
  const yz = poly(g, [RQ(0, 0, 0), RQ(0, RY, 0), RQ(0, RY, RZ), RQ(0, 0, RZ)], PYZ);
  const zx = poly(g, [RQ(0, 0, 0), RQ(RX, 0, 0), RQ(RX, 0, RZ), RQ(0, 0, RZ)], PZX);
  [[RQ(RX, 0, 0), RQ(RX, RY, 0)], [RQ(0, RY, 0), RQ(RX, RY, 0)], [RQ(0, RY, 0), RQ(0, RY, RZ)], [RQ(0, RY, RZ), RQ(0, 0, RZ)], [RQ(RX, 0, 0), RQ(RX, 0, RZ)], [RQ(RX, 0, RZ), RQ(0, 0, RZ)]].forEach(([a, b]) => ln(g, a, b, '#C9CED8', 2));
  const ax = withAxes ? axes3(svg, RQ, [5.9, 6.9, 4.1]) : null;
  return { g, fl, yz, zx, ax }; };
const fanAt = (svg, p, s = 1) => { const g = mk(mk(svg, 'g', { transform: `translate(${p[0].toFixed(1)},${p[1].toFixed(1)})` }), 'g', {});
  mk(g, 'ellipse', { cx: 0, cy: 0, rx: 70 * s, ry: 14 * s, fill: '#9AA3B5', opacity: 0.9 }); mk(g, 'ellipse', { cx: 0, cy: -2, rx: 16 * s, ry: 10 * s, fill: C.ink2 }); return g; };

/* ---------- H: room + fan ---------- */
const hs = $('#hS'), hR = room(hs, false);
const HF = RQ(3, 4, 2), HFl = RQ(3, 4, 0), HC = RQ(3, 4, RZ);
const hRod = ln(hs, HC, HF, C.ink2, 4); const hFan = fanAt(hs, HF);
const hSpot = dotG(hs, HFl[0], HFl[1], 9, FV, '#fff'); const hDrop = ln(hs, HF, HFl, FV, 3, { 'stroke-dasharray': '7 6' });
const hA = ln(hs, RQ(0, 4, 0), HFl, XB, 3, { 'stroke-dasharray': '7 6' }), hB = ln(hs, RQ(3, 0, 0), HFl, YT, 3, { 'stroke-dasharray': '7 6' });
const hQ = lab(hs, HF[0] + 84, HF[1] + 8, 'how high?', RC, { 'font-size': 22 });

/* ---------- G: axes and planes ---------- */
const gsv = $('#gS'), gR = room(gsv);
const gO = dotG(gsv, ...RQ(0, 0, 0), 9, C.ink); const gOT = lab(gsv, RQ(0, 0, 0)[0] + 14, RQ(0, 0, 0)[1] + 28, 'O', C.ink, { 'font-size': 22 });
const gPl = [lab(gsv, RQ(3.2, 3.2, 0)[0], RQ(3.2, 3.2, 0)[1] + 8, 'XY plane', XB, { 'text-anchor': 'middle' }), lab(gsv, RQ(0, 3.6, 1.6)[0], RQ(0, 3.6, 1.6)[1], 'YZ plane', YT, { 'text-anchor': 'middle' }), lab(gsv, RQ(2.8, 0, 1.6)[0], RQ(2.8, 0, 1.6)[1], 'ZX plane', ZO, { 'text-anchor': 'middle' })];
const GPL = [['XY', 'XY plane', 'THE FLOOR · HOLDS THE x AND y AXES', PXY, XB], ['YZ', 'YZ plane', 'ONE WALL · HOLDS THE y AND z AXES', PYZ, YT], ['ZX', 'ZX plane', 'THE OTHER WALL · HOLDS z AND x', PZX, ZO]];
$('#gR').innerHTML = GPL.map(([s, n, e, bg, c], i) => `<div class="ss" id="gr${i}" style="top:${92 + i * 116}px;height:100px"><div class="sy" style="top:18px;background:${bg};font:700 22px Poppins;color:${c}">${s}</div><div class="sn" style="top:18px">${n}</div><div class="se" style="top:58px">${e}</div></div>`).join('') +
  `<div class="pillp ac" id="gP" style="left:36px;top:470px">They meet at the origin O (0, 0, 0)</div>`;
const tGp = [wt('G4', 'floor'), wt('G4', 'Y', 1), wt('G4', 'Z', 2)];

/* ---------- P: walk to the fan ---------- */
const psv = $('#pS'), pR = room(psv);
[pR.fl, pR.yz, pR.zx].forEach(p => attr(p, 'opacity', 0.75));
const pRod = ln(psv, HC, HF, C.ink2, 4); const pFan = fanAt(psv, HF);
const W0 = RQ(0, 0, 0), W1p = RQ(3, 0, 0), W2p = RQ(3, 4, 0), W3p = RQ(3, 4, 2);
const pT1 = ln(psv, W0, W1p, XB, 6), pT2 = ln(psv, W1p, W2p, YT, 6), pT3 = ln(psv, W2p, W3p, ZO, 6);
const pT1L = lab(psv, (W0[0] + W1p[0]) / 2 - 16, (W0[1] + W1p[1]) / 2 + 30, '3', XB, { 'font-size': 24 }), pT2L = lab(psv, (W1p[0] + W2p[0]) / 2, W1p[1] + 32, '4', YT, { 'font-size': 24 }), pT3L = lab(psv, W2p[0] + 14, (W2p[1] + W3p[1]) / 2 + 8, '2', ZO, { 'font-size': 24 });
const pDot = mk(psv, 'circle', { r: 12, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const pPT = lab(psv, W3p[0] + 80, W3p[1] - 14, 'P (3, 4, 2)', RC, { 'font-size': 22 });
const tW = [wt('P2', 'Walk'), wt('P2', 'four'), wt('P3', 'climb')], dW = [1.2, 1.4, 1.0];
const PRW = [[`${xb('x')} = 3`, 'distance from the YZ plane', 'YZ'], [`${yt('y')} = 4`, 'distance from the ZX plane', 'ZX'], [`${zo('z')} = 2`, 'distance from the XY plane', 'XY']];
$('#pR').innerHTML = PRW.map(([f, w], i) => `<div class="rw" id="prw${i}" style="top:${200 + i * 92}px">${K(f)}<span class="why2">${w}</span></div>`).join('');
const tPr = [wt('P4', 'x'), wt('P4', 'y'), wt('P4', 'z')];
let pLast = '';

/* ---------- S: on an axis vs on a plane ---------- */
const s1 = $('#sS1'), SQ1 = proj([300, 330], 48); axes3(s1, SQ1, [6, 8, 4.4]);
const sA = SQ1(4, 0, 0); const sAd = dotG(s1, sA[0], sA[1], 11, RC, '#fff'); const sAT = lab(s1, sA[0] + 16, sA[1] + 8, '(4, 0, 0)', RC, { 'font-size': 22 });
const sB = SQ1(0, 5, 0); const sBd = dotG(s1, sB[0], sB[1], 9, RC, '#fff'); const sBT = lab(s1, sB[0] - 10, sB[1] + 34, '(0, 5, 0)', RC, { 'text-anchor': 'middle' });
const sC = SQ1(0, 0, 3); const sCd = dotG(s1, sC[0], sC[1], 9, RC, '#fff'); const sCT = lab(s1, sC[0] + 16, sC[1] + 6, '(0, 0, 3)', RC);
$('#sP1').innerHTML = 'x axis: (x, 0, 0)';
const s2 = $('#sS2'), SQ2 = proj([300, 330], 48);
const s2Pl = poly(s2, [SQ2(0, 0, 0), SQ2(5.5, 0, 0), SQ2(5.5, 7, 0), SQ2(0, 7, 0)], PXY); axes3(s2, SQ2, [6, 8, 4.4]);
const sD = SQ2(3, 4, 0); const sDd = dotG(s2, sD[0], sD[1], 11, RC, '#fff'); const sDT = lab(s2, sD[0] + 16, sD[1] + 8, '(3, 4, 0)', RC, { 'font-size': 22 });
const sO = SQ2(0, 0, 0); const sOd = dotG(s2, sO[0], sO[1], 10, C.ink, '#fff'); const sOT = lab(s2, sO[0] - 14, sO[1] - 14, '(0, 0, 0)', C.ink, { 'text-anchor': 'end' });
const s2L = lab(s2, SQ2(4.6, 6.2, 0)[0], SQ2(4.6, 6.2, 0)[1] + 6, 'XY plane: z = 0', XB, { 'text-anchor': 'middle' });
$('#sP2').innerHTML = 'XY plane: (x, y, 0)';
const th1 = PUC.think($('#th1'), { q: 'Where is the point (0, 5, 3)?', opts: ['On the YZ plane', 'On the y axis'], right: 0, why: 'Only x is zero, so it is on the YZ plane. On the y axis, x and z are both zero.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${rc('P')}(${xb('x')},\\ ${yt('y')},\\ ${zo('z')})`);

/* ---------- O: octants ---------- */
const osv = $('#oS'), OQ = proj([392, 300], 44);
const oPos = [poly(osv, [OQ(0, 0, 0), OQ(4, 0, 0), OQ(4, 5, 0), OQ(0, 5, 0)], PXY, { opacity: 0 })][0];
const oAx = axes3(osv, OQ, [5, 6.2, 4.6], true);
const oBox = [...Array(9)].map(() => ln(osv, [0, 0], [0, 0], '#9AA3B5', 2.5, { 'stroke-dasharray': '6 5' }));
const oDot = mk(osv, 'circle', { r: 12, fill: RC, stroke: '#fff', 'stroke-width': 3 }); const oDT = lab(osv, 0, 0, '', RC, { 'font-size': 22 });
const OCT = [[1, 1, 1], [-1, 1, 1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [-1, -1, -1], [1, -1, -1]], ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const NAMES = ['XOYZ', "X'OYZ", "X'OY'Z", "XOY'Z", "XOYZ'", "X'OYZ'", "X'OY'Z'", "XOY'Z'"];
const sg = v => v > 0 ? '+' : '−';
$('#oT').innerHTML = `<table class="ot" id="otT" style="top:262px"><tr><td class="h"></td>${ROM.map((r, i) => `<td class="h" id="oh${i}">${r}</td>`).join('')}</tr>` +
  ['x', 'y', 'z'].map((n, k) => `<tr><td class="h" style="color:${[XB, YT, ZO][k]};font-family:Poppins;font-style:italic;font-size:24px">${n}</td>${OCT.map((o, i) => `<td id="oc${k}${i}" style="color:${o[k] > 0 ? C.ink : C.red}">${sg(o[k])}</td>`).join('')}</tr>`).join('') + '</table>';
const oKeys = [[wt('O3', 'first'), [2, 3, 2], 0], [wt('O4', 'negative'), [2, 3, -2], 4], [wt('O5', 'three'), [-2, -3, -2], 6]];
const oAt = t => { let p = [2, 3, 2], k = 0; for (let i = 0; i < oKeys.length; i++) { if (t >= oKeys[i][0] - 0.6) { const u = i ? M.io((t - (oKeys[i][0] - 0.6)) / 0.7) : 1; const a = i ? oKeys[i - 1][1] : oKeys[0][1]; p = a.map((v, j) => v + (oKeys[i][1][j] - v) * u); k = oKeys[i][2]; } } return [p, k]; };
let oLast = '';

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = K(`${rc('P')}(${xb('3')},\\ ${yt('-4')},\\ ${zo('5')})`) + '<span class="why2" style="font-size:26px">&nbsp;&nbsp;octant, distances, foot?</span>';
const wsol = PUC.solution($('#wl'), [
  [K(`(${xb('+')},\\ ${yt('-')},\\ ${zo('+')}) \\Rightarrow \\text{octant IV}`)],
  [K(`\\text{from } YZ\\!: ${xb('3')},\\ \\ ZX\\!: ${yt('4')},\\ \\ XY\\!: ${zo('5')}`)],
  [K(`\\text{foot on } XY\\!:\\ ${fv('(3, -4, 0)')}`)],
  ['One point: three distances and a foot']], { label: 'WORKED EXAMPLE', y0: 186, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'signs'), wt('W4', 'Distance'), wt('W5', 'Drop'), wt('W6', 'one')];
const wsv = $('#wS'), WQ = proj([520, 350], 44); axes3(wsv, WQ, [5, 4.6, 5.6], true);
const WP = WQ(3, -4, 5), WF = WQ(3, -4, 0);
const wB = [ln(wsv, WQ(3, 0, 0), WF, '#9AA3B5', 2.5, { 'stroke-dasharray': '6 5' }), ln(wsv, WQ(0, -4, 0), WF, '#9AA3B5', 2.5, { 'stroke-dasharray': '6 5' })];
const wDrop = ln(wsv, WP, WF, FV, 4, { 'stroke-dasharray': '9 6' });
const wPd = dotG(wsv, WP[0], WP[1], 12, RC, '#fff'); const wPT = lab(wsv, WP[0] + 18, WP[1] + 6, 'P (3, -4, 5)', RC, { 'font-size': 22 });
const wFd = dotG(wsv, WF[0], WF[1], 10, FV, '#fff'); const wFT = lab(wsv, WF[0] + 16, WF[1] + 26, '(3, -4, 0)', FV, { 'font-size': 22 });
const w5 = lab(wsv, WP[0] - 14, (WP[1] + WF[1]) / 2, '5', ZO, { 'font-size': 24, 'text-anchor': 'end' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(-3, 2, 5):\\ \\text{distance from } YZ = -3`), right: K(`\\text{distance} = |${xb('-3')}| = 3,\\ \\text{the sign says which side}`) });
const ts = $('#tS'), TQ = proj([300, 150], 22);
poly(ts, [TQ(0, -6, -3), TQ(0, 8, -3), TQ(0, 8, 4.5), TQ(0, -6, 4.5)], PYZ);
axes3(ts, TQ, [7, 9.5, 5]);
const TP = TQ(-3, 2, 5 - 2.5), TFt = TQ(0, 2, 2.5);
const tD = ln(ts, TP, TFt, RC, 4, { 'stroke-dasharray': '7 5' }); const tPd = dotG(ts, TP[0], TP[1], 8, RC, '#fff');
const tDT = lab(ts, (TP[0] + TFt[0]) / 2 - 4, (TP[1] + TFt[1]) / 2 - 12, '3', RC, { 'font-size': 22 });
const where = PUC.where($('#wa'), { on: [], type: 'Name the octant from the signs, or find the foot of a point on an axis or a plane.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: 'P(a, b, c) lies in octant IV. Its distances from the XY, YZ and ZX planes are 6, 2 and 3. Then a + b + c is',
  opts: ['11', '5', '-1', '7'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{from } YZ = |a| = 2 \\Rightarrow a = 2`)], [K(`\\text{from } XY = |c| = 6 \\Rightarrow c = 6`)], [K(`\\text{from } ZX = |b| = 3`)], [K(`\\text{octant IV: } y < 0 \\Rightarrow b = -3`)], [K(`2 - 3 + 6 = 5`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Distance'), wt('A2', 'Distance', 1), wt('A3', 'Distance'), wt('A3', 'fourth'), wt('A4', 'Two')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · axes, planes and octants', y0: 96, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Three axes</b> at right angles meet at the origin O (0, 0, 0)',
    '<b>Planes</b>: XY (z = 0), YZ (x = 0), ZX (y = 0)',
    '<b>P(x, y, z)</b>: x from YZ, y from ZX, z from XY',
    '<b>On an axis</b>: two zeros &nbsp;·&nbsp; <b>on a plane</b>: one zero',
    '<b>8 octants</b>: the signs decide · I is (+, +, +), VII is (-, -, -)'] });
const YQ = ['Which number is zero for every point on the ZX plane?', 'Which octant holds the point (-2, 5, -1)?', 'What is the foot of (4, -1, 6) on the XY plane?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 79', topic: 'A stick from corner to corner of a box: Distance Formula in 3D', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tW[0] - 0.3, 1.04, 960, 560], [T1('P3'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const oo = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tG1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('G1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...oo });
    M.vis(hRod, t, tMorph + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(hFan, t, tMorph + 0.5, 1e9, { dy: -10, fade: 0.2 });
    M.draw(hA, t, tMorph + 0.9, 0.5); M.draw(hB, t, tMorph + 1.2, 0.5); M.vis(hSpot, t, tMorph + 1.6, 1e9, DOT);
    M.draw(hDrop, t, wt('H4', 'Floor'), 0.5); M.vis(hQ, t, wt('H4', 'missing') - 0.2, 1e9, { dy: 0 });
    M.vis($('#hk'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis($('#hkImg'), t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'missing') - 0.1, 1e9, POP);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tP1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('P1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.vis(gR.g, t, tG1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    [gR.fl, gR.yz, gR.zx].forEach((p, i) => { const a = M.io((t - tGp[i] + 0.1) / 0.4); attr(p, 'fill', mix('#F4F5F8', [PXY, PYZ, PZX][i], a)); });
    M.vis(gR.ax, t, wt('G2', 'number') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis(gO, t, wt('G3', 'origin') - 0.1, 1e9, DOT); M.vis(gOT, t, wt('G3', 'O', 1), 1e9, { dy: 0 });
    gPl.forEach((l, i) => M.vis(l, t, tGp[i] + 0.1, 1e9, { dy: 0 }));
    M.vis($('#gr'), t, wt('G4', 'pair') - 0.1, out, { dx: 60, dy: 0, ...oo });
    tGp.forEach((tt, i) => M.vis($('#gr' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#gP'), t, T1('G4') - 0.6, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.vis(pRod, t, tP1 + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(pFan, t, tP1 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const u = tW.map((tt, i) => M.io((t - tt) / dW[i]));
    const x = 3 * u[0], y = 4 * u[1], z = 2 * u[2], p = RQ(x, y, z);
    attr(pDot, 'cx', p[0].toFixed(1)); attr(pDot, 'cy', p[1].toFixed(1)); M.vis(pDot, t, wt('P1', 'origin') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    [pT1, pT2, pT3].forEach((l, i) => M.draw(l, t, tW[i], dW[i])); [pT1L, pT2L, pT3L].forEach((l, i) => M.vis(l, t, tW[i] + dW[i] - 0.2, 1e9, { dy: 0 }));
    M.vis(pPT, t, wt('P3', 'point') - 0.1, 1e9, { dy: 0 });
    M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    const s = `(${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)})`; if (s !== pLast) { pLast = s; $('#pV').innerHTML = `<span style="color:${RC}">P</span> = (<span style="color:${XB}">${x.toFixed(1)}</span>, <span style="color:${YT}">${y.toFixed(1)}</span>, <span style="color:${ZO}">${z.toFixed(1)}</span>)`; }
    M.vis($('#pV'), t, wt('P1', 'origin'), 1e9, { dy: 10 });
    tPr.forEach((tt, i) => { M.vis($('#prw' + i), t, tt - 0.2, 1e9, { dx: -16, dy: 0 }); const pl = [pR.yz, pR.zx, pR.fl][i], k = M.io((t - tt) / 0.3) * (1 - M.io((t - (tPr[i + 1] ?? T1('P4'))) / 0.3)); attr(pl, 'opacity', (0.75 + 0.25 * k).toFixed(3)); attr(pl, 'stroke', k > 0.02 ? [YT, ZO, XB][i] : 'none'); attr(pl, 'stroke-width', (3 * k).toFixed(2)); });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.vis(sAd, t, wt('S1', 'x'), 1e9, DOT); M.vis(sAT, t, wt('S1', 'x') + 0.2, 1e9, { dy: 0 });
    [[sBd, sBT], [sCd, sCT]].forEach(([d, l], i) => { M.vis(d, t, wt('S1', 'zero', 1) + 0.3 + i * 0.3, 1e9, DOT); M.vis(l, t, wt('S1', 'zero', 1) + 0.4 + i * 0.3, 1e9, { dy: 0 }); });
    M.vis($('#sP1'), t, wt('S1', 'looks'), 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...oo });
    fade(s2Pl, t, wt('S2', 'floor') - 0.2, 0.4); M.vis(s2L, t, wt('S2', 'z'), 1e9, { dy: 0 });
    M.vis(sDd, t, wt('S2', 'Every'), 1e9, DOT); M.vis(sDT, t, wt('S2', 'Every') + 0.2, 1e9, { dy: 0 }); M.vis($('#sP2'), t, wt('S2', 'equal'), 1e9, POP);
    M.vis(sOd, t, wt('S2', 'origin'), 1e9, DOT); M.vis(sOT, t, wt('S2', 'origin') + 0.2, 1e9, { dy: 0 });
    M.vis($('#th1'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...oo });
    th1(t, { tin: tS3, tOpts: wt('S3', 'On') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Only') });
  }

  /* statement */
  const stOn = t >= tT && t < tO1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tO1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'x') - 0.1, 0.9);
  }

  /* O */
  const oOn = t >= tO1 - 0.1 && t < tW1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('W1');
    M.vis($('#ol'), t, tO1 + 0.05, out, { dx: -60, dy: 0, ...oo }); M.vis(oAx, t, tO1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    const [p, k] = oAt(t), on = t >= oKeys[0][0] - 0.3, P = OQ(...p), Fl = OQ(p[0], p[1], 0), Ax = OQ(p[0], 0, 0), Ay = OQ(0, p[1], 0), Az = OQ(0, 0, p[2]);
    attr(oDot, 'cx', P[0].toFixed(1)); attr(oDot, 'cy', P[1].toFixed(1)); M.vis(oDot, t, oKeys[0][0] - 0.3, 1e9, { dy: 0, fade: 0.2 });
    [[P, Fl], [Fl, Ax], [Fl, Ay], [P, OQ(p[0], 0, p[2])], [P, OQ(0, p[1], p[2])], [OQ(p[0], 0, p[2]), Ax], [OQ(p[0], 0, p[2]), Az], [OQ(0, p[1], p[2]), Ay], [OQ(0, p[1], p[2]), Az]].forEach(([a, b], i) => { setL(oBox[i], a, b); M.hide(oBox[i], !on); });
    const s = p.map(v => Math.round(v)).join(','); if (s !== oLast) { oLast = s; const r = p.map(v => Math.round(v));
      M.setT(oDT, `(${r.join(', ')})`); $('#oV').innerHTML = `(<span style="color:${XB}">${r[0]}</span>, <span style="color:${YT}">${r[1]}</span>, <span style="color:${ZO}">${r[2]}</span>)`;
      $('#oN').innerHTML = `Octant ${ROM[k]} · ${NAMES[k]}`; for (let i = 0; i < 8; i++) { $('#oh' + i).style.color = i === k ? RC : ''; for (let j = 0; j < 3; j++) $('#oc' + j + i).className = i === k ? 'on' : ''; } }
    attr(oDT, 'x', (P[0] + 18).toFixed(1)); attr(oDT, 'y', (P[1] - 14).toFixed(1)); M.vis(oDT, t, oKeys[0][0], 1e9, { dy: 0 });
    M.vis($('#or'), t, tO1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis($('#otT'), t, wt('O2', 'eight') - 0.1, 1e9, { dy: 14 }); M.vis($('#oV'), t, oKeys[0][0], 1e9, { dy: 10 }); M.vis($('#oN'), t, oKeys[0][0] + 0.2, 1e9, POP);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#wq'), t, T0('W2') + 0.2, 1.0); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis(wPd, t, T0('W2') + 0.6, 1e9, DOT); M.vis(wPT, t, T0('W2') + 0.8, 1e9, { dy: 0 });
    wB.forEach((l, i) => M.draw(l, t, tWs[0] + i * 0.3, 0.5));
    M.draw(wDrop, t, tWs[2], 0.6); M.vis(w5, t, wt('W4', 'five'), 1e9, { dy: 0 }); M.vis(wFd, t, tWs[2] + 0.5, 1e9, DOT); M.vis(wFT, t, wt('W5', 'foot'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'never') - 0.1, tRight: wt('X3', 'three') });
    M.vis(tPd, t, wt('X2', 'point'), 1e9, DOT); M.draw(tD, t, wt('X3', 'distance'), 0.5); M.vis(tDT, t, wt('X3', 'three'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'type') });
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
