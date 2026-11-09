// PUC Maths Ep 75: The parabola (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 10): the curve coral (accent), focus F violet, distance to the focus PF blue,
// distance to the directrix PM gold, a orange, latus rectum teal, directrix ink dashed
const RC = C.ac, FV = C.violet, PB = '#2F6FEB', PG = C.gold, AO = C.orange, LT = C.teal;
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const col = c => s => `\\textcolor{${c}}{${s}}`;
const rc = col(RC), fv = col(FV), b = col(PB), gd = col(PG), o = col(AO), tl = col(LT);
const HALO = { stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' };
const ital = (p, x, y, s, fill, size = 26, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': size, fill }, a));
const dotG = (svg, x, y, r, fill, stroke, sw = 3) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); g.c = mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': sw }); return g; };
const fade = (el, t, t0, d = 0.4, to = 1) => { el.style.opacity = (to * M.io((t - t0) / d)).toFixed(3); M.hide(el, t < t0); };
const lab = (p, x, y, s, fill, a = {}) => txt(p, x, y, s, Object.assign({ 'font-size': 19, fill, 'font-weight': 600 }, HALO, a));
// plane: origin O px, unit u px
const plane = (svg, O, u, x0, x1, y0, y1) => { const X = v => O[0] + v * u, Y = v => O[1] - v * u, g = mk(svg, 'g', {});
  for (let v = Math.ceil(x0); v <= x1; v++) mk(g, 'line', { x1: X(v), y1: Y(y0), x2: X(v), y2: Y(y1), stroke: '#EEF0F4', 'stroke-width': 1.5 });
  for (let v = Math.ceil(y0); v <= y1; v++) mk(g, 'line', { x1: X(x0), y1: Y(v), x2: X(x1), y2: Y(v), stroke: '#EEF0F4', 'stroke-width': 1.5 });
  mk(g, 'line', { x1: X(x0), y1: O[1], x2: X(x1), y2: O[1], stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: `M${X(x1) + 6},${O[1]} l-13,-7 v14 z`, fill: C.ink });
  mk(g, 'line', { x1: O[0], y1: Y(y0), x2: O[0], y2: Y(y1), stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: `M${O[0]},${Y(y1) - 6} l-7,13 h14 z`, fill: C.ink });
  ital(g, X(x1) + 2, O[1] + 30, 'x', C.ink2, 22); ital(g, O[0] + 12, Y(y1) + 10, 'y', C.ink2, 22);
  return { X, Y, g }; };
// sideways parabola y^2 = 4 a x (dir +1 right, -1 left), y in [-ym, ym]
const parD = (P, a, ym, dir = 1) => { let d = ''; for (let i = 0; i <= 80; i++) { const y = -ym + 2 * ym * i / 80, x = dir * y * y / (4 * a); d += (i ? 'L' : 'M') + P.X(x).toFixed(1) + ',' + P.Y(y).toFixed(1); } return d; };
const upD = (P, a, xm, dir = 1) => { let d = ''; for (let i = 0; i <= 80; i++) { const x = -xm + 2 * xm * i / 80, y = dir * x * x / (4 * a); d += (i ? 'L' : 'M') + P.X(x).toFixed(1) + ',' + P.Y(y).toFixed(1); } return d; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tP1 = T0('P1'), tT = T0('T1'), tR1 = T0('R1'), tM1 = T0('M1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['A CRICKET BALL', 'one smooth curve'], ['A DISH ANTENNA', 'the same curve'], ['WHY THE SAME?', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'curve'), wt('H2', 'same'), wt('H2', 'point')];

/* ---------- H: ball + dish ---------- */
const hs = $('#hS');
mk(hs, 'line', { x1: 40, y1: 290, x2: 744, y2: 290, stroke: '#C5D9BC', 'stroke-width': 4, 'stroke-linecap': 'round' });
const hTr = mk(hs, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 60; i++) { const u = i / 60; d += (i ? 'L' : 'M') + (80 + 560 * u).toFixed(1) + ',' + (282 - 760 * u * (1 - u)).toFixed(1); } return d; })(), fill: 'none', stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const hBall = mk(hs, 'circle', { r: 11, fill: '#C0392B', stroke: '#fff', 'stroke-width': 2 });
const hBallT = txt(hs, 360, 76, 'up, slower, down', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const DV = [392, 548], DA = 34;
const dishY = dx => DV[1] - dx * dx / (4 * DA);
const hDish = mk(hs, 'path', { d: (() => { let d = ''; for (let i = 0; i <= 40; i++) { const dx = -120 + 6 * i; d += (i ? 'L' : 'M') + (DV[0] + dx) + ',' + dishY(dx).toFixed(1); } return d; })(), fill: 'none', stroke: C.ink2, 'stroke-width': 8, 'stroke-linecap': 'round' });
const hSig = [-100, -60, 60, 100].map(dx => mk(hs, 'path', { d: `M${DV[0] + dx},330 L${DV[0] + dx},${dishY(dx).toFixed(1)} L${DV[0]},${DV[1] - DA}`, fill: 'none', stroke: PB, 'stroke-width': 3 }));
const hFoc = dotG(hs, DV[0], DV[1] - DA, 9, FV); const hFocL = mk(hs, 'line', { x1: DV[0] + 12, y1: DV[1] - DA, x2: DV[0] + 150, y2: DV[1] - DA, stroke: FV, 'stroke-width': 2, 'stroke-dasharray': '4 4' }); const hFocT = lab(hs, DV[0] + 158, DV[1] - DA + 6, 'one point', FV);
const tBall0 = tMorph + 0.3, tBall1 = tBall0 + 2.4;

/* ---------- P: definition + live test ---------- */
$('#dfT').style.top = '80px';
$('#pP1').innerHTML = `<span style="width:16px;height:16px;border-radius:50%;background:${FV}"></span>Fixed point: the focus F`;
$('#pP2').innerHTML = `<span style="width:28px;height:0;border-top:4px dashed ${C.ink}"></span>Fixed line: the directrix`;
const ps = $('#pS'), PP = plane(ps, [340, 320], 32, -3, 8, -7, 7), A2 = 2;
const pDir = mk(ps, 'line', { x1: PP.X(-A2), y1: PP.Y(-7), x2: PP.X(-A2), y2: PP.Y(7), stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
const pDirT = lab(ps, PP.X(-A2) - 10, PP.Y(7) + 4, 'directrix', C.ink, { 'text-anchor': 'end' });
const pCurve = mk(ps, 'path', { d: parD(PP, A2, 7.2), fill: 'none', stroke: RC, 'stroke-width': 5 });
const pAx = mk(ps, 'line', { x1: PP.X(-3), y1: PP.Y(0), x2: PP.X(8), y2: PP.Y(0), stroke: LT, 'stroke-width': 5, opacity: 0.8 });
const pAxT = lab(ps, PP.X(6.4), PP.Y(0) - 12, 'axis', LT);
const pV = dotG(ps, PP.X(0), PP.Y(0), 9, C.ink); const pVT = lab(ps, PP.X(0) + 12, PP.Y(0) + 28, 'vertex', C.ink);
const pHalf = [mk(ps, 'line', { x1: PP.X(-A2), y1: PP.Y(0) + 40, x2: PP.X(0), y2: PP.Y(0) + 40, stroke: AO, 'stroke-width': 3 }), mk(ps, 'line', { x1: PP.X(0), y1: PP.Y(0) + 40, x2: PP.X(A2), y2: PP.Y(0) + 40, stroke: AO, 'stroke-width': 3 })];
const pPF = mk(ps, 'line', { stroke: PB, 'stroke-width': 4, 'stroke-linecap': 'round' }), pPM = mk(ps, 'line', { stroke: PG, 'stroke-width': 4, 'stroke-linecap': 'round' });
const pM = mk(ps, 'circle', { r: 6, fill: PG });
const pFg = dotG(ps, PP.X(A2), PP.Y(0), 10, FV); const pFT = lab(ps, PP.X(A2) + 14, PP.Y(0) + 28, 'F', FV);
const pP = mk(ps, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 }); const pPT = ital(ps, 0, 0, 'P', RC, 24, HALO);
const YS = []; for (let v = -7; v <= 7.01; v += 0.7) YS.push(+v.toFixed(2));
const pDots = YS.map(y => mk(ps, 'circle', { cx: PP.X(y * y / 8), cy: PP.Y(y), r: 6, fill: RC }));
const kP = [[wt('P3', 'moves'), 0], [wt('P4', 'Five'), Math.sqrt(24)], [wt('P4', 'Eight'), Math.sqrt(48)], [wt('P4', 'Every'), Math.sqrt(48)], [T1('P4') + 0.2, -Math.sqrt(48)]];
const yAt = t => { if (t <= kP[0][0]) return 0; for (let i = 1; i < kP.length; i++) if (t < kP[i][0]) { const [a, ya] = kP[i - 1], [c, yc] = kP[i]; return ya + (yc - ya) * M.io((t - a) / Math.min(0.9, c - a)); } return kP[kP.length - 1][1]; };
const tDot = YS.map(y => { for (let t = kP[0][0]; t < kP[4][0] + 1; t += 0.02) if (Math.abs(yAt(t) - y) < 0.12) return t; return 1e9; });
let pLast = '';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${b('PF')} = ${gd('PM')}`);

/* ---------- R: derivation ---------- */
const rsol = PUC.solution($('#rl'), [
  [K(`${b('PF')} = \\sqrt{(x - ${o('a')})^2 + y^2}`)],
  [K(`${gd('PM')} = x + ${o('a')}`)],
  [K(`(x - ${o('a')})^2 + y^2 = (x + ${o('a')})^2`)],
  [K(`x^2 - 2${o('a')}x + ${o('a')}^2 + y^2 = x^2 + 2${o('a')}x + ${o('a')}^2`)],
  [K(`y^2 = 4${o('a')}x`)]], { label: 'THE EQUATION · STEP BY STEP', y0: 104, dy: 92 });
const tRs = [wt('R2', 'distance'), wt('R3', 'distance'), wt('R4', 'Set'), wt('R5', 'Open'), wt('R6', 'left')];
const rs = $('#rS'), RP = plane(rs, [340, 320], 32, -3, 8, -7, 7);
const rDir = mk(rs, 'line', { x1: RP.X(-2), y1: RP.Y(-7), x2: RP.X(-2), y2: RP.Y(7), stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
const rDirT = lab(rs, RP.X(-2) - 10, RP.Y(-6.4), 'x = -a', C.ink, { 'text-anchor': 'end' });
const rCurve = mk(rs, 'path', { d: parD(RP, 2, 7.2), fill: 'none', stroke: RC, 'stroke-width': 5 });
const RPy = 5, RPx = RPy * RPy / 8;
const rPF = mk(rs, 'line', { x1: RP.X(RPx), y1: RP.Y(RPy), x2: RP.X(2), y2: RP.Y(0), stroke: PB, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rPM = mk(rs, 'line', { x1: RP.X(RPx), y1: RP.Y(RPy), x2: RP.X(-2), y2: RP.Y(RPy), stroke: PG, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rPFT = lab(rs, RP.X((RPx + 2) / 2) + 14, RP.Y(RPy / 2) + 6, 'PF', PB);
const rPMT = lab(rs, RP.X(-2) - 14, RP.Y(RPy) + 34, 'PM = x + a', PG, { 'text-anchor': 'end' });
const rFg = dotG(rs, RP.X(2), RP.Y(0), 10, FV); const rFT = lab(rs, RP.X(2) + 12, RP.Y(0) + 30, 'F (a, 0)', FV);
const rMg = mk(rs, 'circle', { cx: RP.X(-2), cy: RP.Y(RPy), r: 7, fill: PG }); const rMT = lab(rs, RP.X(-2) - 12, RP.Y(RPy) + 6, 'M', PG, { 'text-anchor': 'end' });
const rPg = dotG(rs, RP.X(RPx), RP.Y(RPy), 11, RC, '#fff'); const rPT = lab(rs, RP.X(RPx) + 16, RP.Y(RPy) - 14, 'P (x, y)', RC);
const rHi = $('#rHi');

/* ---------- M: change a, latus rectum ---------- */
const ms = $('#mS'); const mClip = mk(mk(ms, 'defs', {}), 'clipPath', { id: 'mClip' }); mk(mClip, 'rect', { x: 20, y: 64, width: 744, height: 500 });
const mg = mk(ms, 'g', { 'clip-path': 'url(#mClip)' }); const MP = plane(mg, [300, 320], 32, -4, 13, -7, 7);
const mDir = mk(mg, 'line', { y1: MP.Y(-7), y2: MP.Y(7), stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
const mCurve = mk(mg, 'path', { fill: 'none', stroke: RC, 'stroke-width': 5 });
const mLR = mk(mg, 'line', { x1: MP.X(3), y1: MP.Y(-6), x2: MP.X(3), y2: MP.Y(6), stroke: LT, 'stroke-width': 6, 'stroke-linecap': 'round' });
const mLRe = [6, -6].map(y => mk(mg, 'circle', { cx: MP.X(3), cy: MP.Y(y), r: 8, fill: LT, stroke: '#fff', 'stroke-width': 3 }));
const mLRT = [lab(mg, MP.X(3) + 14, MP.Y(6) + 6, '(a, 2a)', LT), lab(mg, MP.X(3) + 14, MP.Y(-6) + 6, '(a, -2a)', LT)];
const mLen = lab(mg, MP.X(3) + 16, MP.Y(0) - 14, 'length 4a', LT);
const mFg = dotG(mg, 0, 0, 10, FV); const mFT = lab(mg, 0, 0, 'F', FV);
const mVg = dotG(mg, MP.X(0), MP.Y(0), 8, C.ink);
const mBr = mk(mg, 'line', { y1: MP.Y(0) + 38, y2: MP.Y(0) + 38, x1: MP.X(0), stroke: AO, 'stroke-width': 4, 'stroke-linecap': 'round' }); const mBrT = ital(mg, 0, MP.Y(0) + 66, 'a', AO, 24, HALO);
const tA0 = wt('M2', 'Grow'), tA1 = T1('M2') - 0.3, aAt = t => 1 + 2 * M.io((t - tA0) / (tA1 - tA0));
$('#mr0').innerHTML = K(`x = ${o('a')} \\;\\Rightarrow\\; y^2 = 4${o('a')}^2`);
$('#mr1').innerHTML = K(`y = \\pm 2${o('a')} \\;\\Rightarrow\\; \\text{length } ${tl('4a')}`);
let mLast = '';

/* ---------- K: x not squared vs y not squared ---------- */
$('#kF1').innerHTML = K(`y^2 = 4a\\,${rc('x')}`); $('#kF2').innerHTML = K(`x^2 = 4a\\,${rc('y')}`);
const k1 = $('#kS1'), KP1 = plane(k1, [250, 330], 22, -4, 13, -6.6, 6.6);
const k1Ax = mk(k1, 'line', { x1: KP1.X(-4), y1: KP1.Y(0), x2: KP1.X(13), y2: KP1.Y(0), stroke: LT, 'stroke-width': 7, opacity: 0.55 });
const k1C = mk(k1, 'path', { d: parD(KP1, 1, 6.5), fill: 'none', stroke: RC, 'stroke-width': 5 });
const k1Ar = mk(k1, 'path', { d: `M${KP1.X(5)},${KP1.Y(0) - 0} l60,0 m-14,-9 l14,9 l-14,9`, fill: 'none', stroke: RC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const k2 = $('#kS2'), KP2 = plane(k2, [392, 450], 22, -9, 9, -1, 11);
const k2Ax = mk(k2, 'line', { x1: KP2.X(0), y1: KP2.Y(-1), x2: KP2.X(0), y2: KP2.Y(11), stroke: LT, 'stroke-width': 7, opacity: 0.55 });
const k2C = mk(k2, 'path', { d: upD(KP2, 2, 8.5), fill: 'none', stroke: RC, 'stroke-width': 5 });
const k2Ar = mk(k2, 'path', { d: `M${KP2.X(0)},${KP2.Y(3)} l0,-60 m-9,14 l9,-14 l9,14`, fill: 'none', stroke: RC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const th1 = PUC.think($('#th1'), { q: `${K('x^2 = -8y')}: which way does it open, and where is the focus?`, opts: ['Down, focus (0, -2)', 'Left, focus (-2, 0)'], right: 0, why: 'y is not squared: the y axis. The minus: down. 4a = 8, so a = 2.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = K('y^2 = 12x') + '<span class="why2" style="font-size:26px">&nbsp;&nbsp;focus, directrix, latus rectum?</span>';
const wsol = PUC.solution($('#wl'), [
  [K(`4${o('a')} = 12 \\;\\Rightarrow\\; ${o('a')} = 3`)],
  [K(`\\text{focus } ${fv('(3, 0)')},\\ \\ \\text{directrix } x = -3`)],
  [K(`\\text{latus rectum } = ${tl('4a = 12')}`)],
  [K(`(3, 6):\\ \\ 6^2 = 36 = 12 \\times 3`) + ' &nbsp;<span style="color:var(--ok);font-weight:700">on it</span>']], { label: 'WORKED EXAMPLE', y0: 186, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Match'), wt('W4', 'focus'), wt('W5', 'latus'), wt('W6', 'Check')];
const ws = $('#wS'), WP = plane(ws, [300, 320], 28, -4, 15, -8, 8);
const wDir = mk(ws, 'line', { x1: WP.X(-3), y1: WP.Y(-8), x2: WP.X(-3), y2: WP.Y(8), stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
const wDirT = lab(ws, WP.X(-3) - 10, WP.Y(8) + 4, 'x = -3', C.ink, { 'text-anchor': 'end' });
const wCurve = mk(ws, 'path', { d: parD(WP, 3, 8.2), fill: 'none', stroke: RC, 'stroke-width': 5 });
const wLR = mk(ws, 'line', { x1: WP.X(3), y1: WP.Y(-6), x2: WP.X(3), y2: WP.Y(6), stroke: LT, 'stroke-width': 6, 'stroke-linecap': 'round' }); const wLRT = lab(ws, WP.X(3) + 14, WP.Y(-3), '12', LT);
const wFg = dotG(ws, WP.X(3), WP.Y(0), 10, FV); const wFT = lab(ws, WP.X(3) + 14, WP.Y(0) + 28, '(3, 0)', FV);
const wPt = dotG(ws, WP.X(3), WP.Y(6), 11, C.ok, '#fff'); const wPtT = lab(ws, WP.X(3) + 16, WP.Y(6) - 12, '(3, 6)', C.ok);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`y^2 = 8x \\;\\Rightarrow\\; \\text{focus } (8, 0)`), right: K(`4${o('a')} = 8 \\Rightarrow ${o('a')} = 2:\\ \\ \\text{focus } (2, 0)`) });
const ts = $('#tS'), TP = plane(ts, [110, 140], 20, -3, 20, -5.5, 5.5);
mk(ts, 'path', { d: parD(TP, 2, 5.5), fill: 'none', stroke: RC, 'stroke-width': 4 });
const tBad = mk(ts, 'g', {}); const tBadI = mk(tBad, 'g', {}); mk(tBadI, 'path', { d: `M${TP.X(8) - 9},${TP.Y(0) - 9} l18,18 m0,-18 l-18,18`, stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' }); lab(tBadI, TP.X(8), TP.Y(0) - 18, '(8, 0)?', C.red, { 'text-anchor': 'middle' });
const tGood = dotG(ts, TP.X(2), TP.Y(0), 8, FV); const tGoodT = lab(ts, TP.X(2), TP.Y(0) + 30, '(2, 0)', FV, { 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Use the focus, the directrix or the latus rectum of a parabola to find a length.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `On ${K('y^2 = 4ax')}, a point P has x = 4, and its distance from the focus is 6. The length of the latus rectum is`,
  opts: ['4', '6', '8', '16'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`PS = \\text{distance to directrix}`)], [K(`\\text{directrix: } x = -a`)], [K(`PS = 4 + a`)], [K(`4 + a = 6 \\Rightarrow a = 2`)], [K(`4a = 8`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'rule'), wt('A3', 'directrix'), wt('A3', 'four'), wt('A4', 'Four'), wt('A4', 'latus')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · the parabola', y0: 96, dy: 76, txt: [1, 0, 0, 1, 1],
  lines: ['<b>Parabola</b>: every point as far from the focus as from the directrix',
    K(`y^2 = 4${o('a')}x:\\ \\ \\text{focus } (${o('a')}, 0),\\ \\ \\text{directrix } x = -${o('a')}`),
    K(`y^2 = \\pm 4ax\\ \\ \\text{right, left} \\qquad x^2 = \\pm 4ay\\ \\ \\text{up, down}`),
    '<b>Latus rectum</b>: the chord through the focus, length 4a',
    '<b>The letter that is not squared</b> names the axis'] });
const YQ = ['Every point on a parabola is equally far from which two things?', 'Where is the focus of x² = 20y?', 'Which way does y² = -6x open?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 76', topic: 'A loop of string, two pins and a pencil: The Ellipse', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('P3', 'Watch') - 0.2, 1.04, 960, 560], [T1('P4'), 1, 960, 540]]);

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
    const u = M.clamp((t - tBall0) / (tBall1 - tBall0)); // constant speed across, height from gravity
    attr(hBall, 'cx', (80 + 560 * u).toFixed(1)); attr(hBall, 'cy', (282 - 760 * u * (1 - u)).toFixed(1)); M.hide(hBall, t < tBall0 - 0.1);
    M.drawU(hTr, u); M.vis(hBallT, t, tBall0 + 1.0, 1e9, { dy: 0 });
    M.draw(hDish, t, tBall0 + 0.6, 0.6);
    hSig.forEach((s, i) => M.draw(s, t, wt('H4', 'metal') - 0.6 + i * 0.25, 0.9));
    M.vis(hFoc, t, wt('H4', 'metal') + 0.5, 1e9, DOT); M.vis(hFocT, t, wt('H4', 'metal') + 0.7, 1e9, { dy: 0 }); M.vis(hFocL, t, wt('H4', 'metal') + 0.6, 1e9, { dy: 0 });
    M.vis($('#hk'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis($('#hkImg'), t, tMorph + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P: definition + live test */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('T1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.vis($('#pP1'), t, wt('P1', 'focus') - 0.1, 1e9, POP); M.vis($('#pP2'), t, wt('P1', 'directrix') - 0.1, 1e9, POP);
    M.rise($('#dfT'), t, T0('P2'), { st: 0.05, sp: M.HEAVY });
    const sd = $('#dfT b'); sd.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('P2', 'same')) / 0.3)); sd.style.borderRadius = '8px';
    M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.vis(pFg, t, wt('P1', 'focus'), 1e9, DOT); M.vis(pFT, t, wt('P1', 'focus') + 0.1, 1e9, { dy: 0 });
    M.draw(pDir, t, wt('P1', 'directrix') - 0.2, 0.6); M.vis(pDirT, t, wt('P1', 'directrix'), 1e9, { dy: 0 });
    const y = yAt(t), x = y * y / 8, Px = PP.X(x), Py = PP.Y(y), live = t >= wt('P3', 'moves') - 0.2;
    attr(pP, 'cx', Px.toFixed(1)); attr(pP, 'cy', Py.toFixed(1)); attr(pPT, 'x', (Px + 14).toFixed(1)); attr(pPT, 'y', (Py - 14).toFixed(1));
    attr(pPF, 'x1', Px.toFixed(1)); attr(pPF, 'y1', Py.toFixed(1)); attr(pPF, 'x2', PP.X(A2)); attr(pPF, 'y2', PP.Y(0));
    attr(pPM, 'x1', Px.toFixed(1)); attr(pPM, 'y1', Py.toFixed(1)); attr(pPM, 'x2', PP.X(-A2)); attr(pPM, 'y2', Py.toFixed(1)); attr(pM, 'cx', PP.X(-A2)); attr(pM, 'cy', Py.toFixed(1));
    [pP, pPT, pPF, pPM, pM].forEach(el => M.vis(el, t, wt('P3', 'moves') - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    pDots.forEach((d, i) => M.vis(d, t, tDot[i] + 0.05, 1e9, DOT));
    M.draw(pCurve, t, T1('P4') + 0.2, 0.8);
    const s = (x + A2).toFixed(2); if (s !== pLast) { pLast = s; $('#pR1').innerHTML = `<span style="color:${PB}">PF</span> = ${Math.hypot(x - A2, y).toFixed(2)}`; $('#pR2').innerHTML = `<span style="color:${PG}">PM</span> = ${s}`; }
    M.vis($('#pR1'), t, wt('P3', 'distance') - 0.1, 1e9, { dy: 10 }); M.vis($('#pR2'), t, wt('P3', 'equals') - 0.1, 1e9, { dy: 10 });
    M.draw(pAx, t, wt('P5', 'axis') - 0.4, 0.6); M.vis(pAxT, t, wt('P5', 'axis'), 1e9, { dy: 0 });
    M.vis(pV, t, wt('P5', 'vertex') - 0.1, 1e9, DOT); M.vis(pVT, t, wt('P5', 'vertex'), 1e9, { dy: 0 });
    pHalf.forEach((l, i) => M.draw(l, t, wt('P5', 'halfway') + i * 0.3, 0.4));
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'focus') - 0.1, 0.8);
  }

  /* R: derivation */
  const rOn = t >= tR1 - 0.1 && t < tM1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('M1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...oo }); rsol(t, tR1, tRs);
    const cur = tRs.reduce((a, tt, i) => t >= tt - 0.15 ? i : a, 0);
    M.vis(rHi, t, tRs[0] - 0.15, 1e9, { dy: 0, fade: 0.2 }); rHi.style.top = (104 + cur * 92 - 18) + 'px';
    M.vis($('#rr'), t, tR1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.draw(rCurve, t, tR1 + 0.4, 0.8);
    M.vis(rFg, t, wt('R1', 'focus'), 1e9, DOT); M.vis(rFT, t, wt('R1', 'focus') + 0.1, 1e9, { dy: 0 });
    M.draw(rDir, t, wt('R1', 'directrix'), 0.6); M.vis(rDirT, t, wt('R1', 'minus'), 1e9, { dy: 0 });
    M.vis(rPg, t, tRs[0] - 0.4, 1e9, DOT); M.vis(rPT, t, tRs[0] - 0.3, 1e9, { dy: 0 });
    M.draw(rPF, t, tRs[0], 0.5); M.vis(rPFT, t, tRs[0] + 0.3, 1e9, { dy: 0 });
    M.draw(rPM, t, tRs[1], 0.5); M.vis(rMg, t, tRs[1] + 0.3, 1e9, DOT); M.vis(rMT, t, tRs[1] + 0.3, 1e9, { dy: 0 }); M.vis(rPMT, t, wt('R3', 'across'), 1e9, { dy: 0 });
  }

  /* M: change a + latus rectum */
  const mOn = t >= tM1 - 0.1 && t < tK1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('K1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...oo });
    M.vis($('#mr'), t, tM1 + 0.2, out, { dx: 60, dy: 0, ...oo });
    const a = aAt(t), s = a.toFixed(2);
    if (s !== mLast) { mLast = s; $('#mA').innerHTML = `<i style="font-family:Poppins;color:${AO}">a</i> = ${s}`; $('#mF').innerHTML = K(`y^2 = 4 \\times ${o(a.toFixed(1))}\\; x`);
      attr(mCurve, 'd', parD(MP, a, 7.2)); attr(mDir, 'x1', MP.X(-a).toFixed(1)); attr(mDir, 'x2', MP.X(-a).toFixed(1));
      attr(mFg.parentNode, 'transform', `translate(${MP.X(a).toFixed(1)},${MP.Y(0)})`); attr(mFT, 'x', (MP.X(a) - 26).toFixed(1)); attr(mFT, 'y', (MP.Y(0) - 14).toFixed(1));
      attr(mBr, 'x2', MP.X(a).toFixed(1)); attr(mBrT, 'x', ((MP.X(0) + MP.X(a)) / 2 - 6).toFixed(1)); }
    M.vis($('#mA'), t, wt('M1', 'a') - 0.1, 1e9, { dy: 10 }); M.vis($('#mF'), t, wt('M1', 'distance'), 1e9, { dy: 10 });
    [mCurve, mDir].forEach(el => M.vis(el, t, tM1 + 0.3, 1e9, { dy: 0, fade: 0.3 })); M.vis(mFg, t, wt('M1', 'focus'), 1e9, DOT); M.vis(mFT, t, wt('M1', 'focus'), 1e9, { dy: 0 }); M.vis(mVg, t, wt('M1', 'vertex'), 1e9, DOT);
    M.draw(mBr, t, wt('M1', 'distance'), 0.5); M.vis(mBrT, t, wt('M1', 'distance') + 0.3, 1e9, { dy: 0 });
    M.vis($('#mLb'), t, wt('M3', 'latus') - 0.1, 1e9, { dy: 10 });
    M.draw(mLR, t, wt('M3', 'chord'), 0.7); mLRe.forEach(e => M.vis(e, t, wt('M4', 'plus'), 1e9, DOT)); mLRT.forEach(e => M.vis(e, t, wt('M4', 'two'), 1e9, { dy: 0 }));
    M.vis(mLen, t, wt('M5', 'length'), 1e9, { dy: 0 });
    M.vis($('#mr0'), t, wt('M4', 'Put') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#mr1'), t, wt('M4', 'plus') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#mP'), t, wt('M5', 'length') - 0.1, 1e9, POP);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#kF1'), t, tK1 + 0.3, 0.6);
    M.draw(k1C, t, wt('K1', 'squared') , 0.8); fade(k1Ax, t, wt('K1', 'axis') - 0.1, 0.4, 0.55); M.draw(k1Ar, t, wt('K1', 'right') - 0.2, 0.4);
    M.vis($('#kP1'), t, wt('K1', 'opens') - 0.1, 1e9, POP);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...oo }); PUC.write($('#kF2'), t, T0('K2') + 0.2, 0.6);
    M.draw(k2C, t, wt('K2', 'squared'), 0.8); fade(k2Ax, t, wt('K2', 'axis') - 0.1, 0.4, 0.55); M.draw(k2Ar, t, wt('K2', 'up') - 0.2, 0.4);
    M.vis($('#kP2'), t, wt('K2', 'minus') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...oo });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'squared') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...oo }); PUC.write($('#wq'), t, T0('W2') + 0.2, 1.0); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...oo });
    M.draw(wCurve, t, T0('W2') + 0.5, 0.9);
    M.vis(wFg, t, wt('W4', 'focus'), 1e9, DOT); M.vis(wFT, t, wt('W4', 'focus') + 0.2, 1e9, { dy: 0 });
    M.draw(wDir, t, wt('W4', 'directrix'), 0.6); M.vis(wDirT, t, wt('W4', 'directrix') + 0.3, 1e9, { dy: 0 });
    M.draw(wLR, t, tWs[2], 0.6); M.vis(wLRT, t, tWs[2] + 0.4, 1e9, { dy: 0 });
    M.vis(wPt, t, wt('W6', 'three'), 1e9, DOT); M.vis(wPtT, t, wt('W6', 'six'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'focus') - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'eight') - 0.1, tRight: wt('X3', 'So') });
    M.vis(tBadI, t, wt('X2', 'eight', 1) - 0.1, tR, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1, outDur: 0.25, ody: 0 });
    M.vis(tGood, t, tR, 1e9, DOT); M.vis(tGoodT, t, tR + 0.1, 1e9, { dy: 0 });
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
