// PUC Maths Ep 73: Distance of a point from a line (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 9): x and the run violet, y and the rise blue, the line and its slope m coral, inclination theta gold
const XC = C.violet, YC = '#2F6FEB', RC = C.ac, TC = C.gold;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const xc = s => `\\textcolor{${XC}}{${s}}`, yc = s => `\\textcolor{${YC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, tc = s => `\\textcolor{${TC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const LAB = { 'font-weight': 600, 'font-size': 20 };

/* plane: grid, axes, labels (from Ep 51) */
const PL = (svg, o) => {
  const X = v => o.ox + v * o.s, Y = v => o.oy - v * o.s, g = mk(svg, 'g', {}), lab = o.lab || 1;
  for (let v = o.x0; v <= o.x1; v++) mk(g, 'line', { x1: X(v), y1: Y(o.y0), x2: X(v), y2: Y(o.y1), stroke: '#ECEEF2', 'stroke-width': 1.5 });
  for (let v = o.y0; v <= o.y1; v++) mk(g, 'line', { x1: X(o.x0), y1: Y(v), x2: X(o.x1), y2: Y(v), stroke: '#ECEEF2', 'stroke-width': 1.5 });
  const ax = mk(svg, 'g', {});
  mk(ax, 'line', { x1: X(o.x0), y1: Y(0), x2: X(o.x1) + 18, y2: Y(0), stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'path', { d: `M${X(o.x1) + 24},${Y(0)} l-13,-7 v14 z`, fill: C.ink });
  mk(ax, 'line', { x1: X(0), y1: Y(o.y0), x2: X(0), y2: Y(o.y1) - 18, stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'path', { d: `M${X(0)},${Y(o.y1) - 24} l-7,13 h14 z`, fill: C.ink });
  txt(ax, X(o.x1) + 20, Y(0) + 32, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, 'font-weight': 600, fill: XC });
  txt(ax, X(0) - 26, Y(o.y1) - 10, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, 'font-weight': 600, fill: YC });
  if (!o.nolab) {
    for (let v = o.x0; v <= o.x1; v++) if (v && v % lab === 0) txt(ax, X(v), Y(0) + 26, v, { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink2, 'font-weight': 600 });
    for (let v = o.y0; v <= o.y1; v++) if (v && v % lab === 0) txt(ax, X(0) - 12, Y(v) + 6, v, { 'text-anchor': 'end', 'font-size': 16, fill: C.ink2, 'font-weight': 600 });
    txt(ax, X(0) - 10, Y(0) + 24, '0', { 'text-anchor': 'end', 'font-size': 16, fill: C.ink2, 'font-weight': 600 });
  }
  // the infinite line through (px, py) with direction (dx, dy), clipped to the window
  const clip = (px, py, dx, dy) => { let a = -1e9, b = 1e9;
    [[px, dx, o.x0, o.x1], [py, dy, o.y0, o.y1]].forEach(([p, d, lo, hi]) => { if (Math.abs(d) < 1e-12) { if (p < lo || p > hi) { a = 1; b = 0; } return; } let u = (lo - p) / d, w = (hi - p) / d; if (u > w) [u, w] = [w, u]; a = Math.max(a, u); b = Math.min(b, w); });
    return a > b ? null : [[px + dx * a, py + dy * a], [px + dx * b, py + dy * b]]; };
  return { X, Y, g, ax, clip, o };
};
// a coral line through two plane points, extended to the window; grows from one end
const fline = (svg, P, x1, y1, x2, y2, col = RC, w = 5) => { const el = mk(svg, 'line', { stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' });
  const set = (a, b, c, d) => { const s = P.clip(a, b, c - a, d - b); return s; };
  let S = set(x1, y1, x2, y2);
  const put = u => { u = M.clamp(u); if (!S) { M.hide(el, true); return; } const [p, q] = S; attr(el, 'x1', P.X(p[0]).toFixed(1)); attr(el, 'y1', P.Y(p[1]).toFixed(1)); attr(el, 'x2', P.X(p[0] + (q[0] - p[0]) * u).toFixed(1)); attr(el, 'y2', P.Y(p[1] + (q[1] - p[1]) * u).toFixed(1)); M.hide(el, u <= 0); };
  return { el, run: (t, t0, d = 0.8) => put(M.io((t - t0) / d)), to: (a, b, c, d) => { S = set(a, b, c, d); put(1); } };
};
const seg = (svg, P, x1, y1, x2, y2, col, w = 5, dash) => { const e = mk(svg, 'line', { x1: P.X(x1), y1: P.Y(y1), x2: P.X(x2), y2: P.Y(y2), stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }); if (dash) attr(e, 'stroke-dasharray', dash); return e; };
const dotG = (svg, x, y, r, fill, stroke, sw = 3) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); const c = mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': sw }); g.c = c; return g; };
// anticlockwise arc (screen) from a0 to a1 degrees around (cx, cy)
const arcD = (cx, cy, r, a0, a1) => { const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${x1.toFixed(1)},${y1.toFixed(1)}`; };
const arc = (svg, cx, cy, r, a0, a1, col = TC, w = 4) => mk(svg, 'path', { d: arcD(cx, cy, r, a0, a1), fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' });
const rightMark = (svg, x, y, sx, sy, s = 16) => mk(svg, 'path', { d: `M${x + sx * s},${y} L${x + sx * s},${y + sy * s} L${x},${y + sy * s}`, fill: 'none', stroke: C.ink2, 'stroke-width': 2 });
// piecewise eased value: keys [[t, v, dur], ...]
const ramp = (v0, keys) => t => { let v = v0, prev = v0; for (const [a, b, d] of keys) { v += (b - prev) * M.io((t - a) / d); prev = b; } return v; };
// Ep 73 colours: A and x violet, B and y blue, the line coral, the point P gold, the perpendicular distance d teal, the vertical gap orange
const PC = C.gold, DC = C.teal, GC = C.orange;
const dc = s => `\\textcolor{${DC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, gc = s => `\\textcolor{${GC}}{${s}}`;
const A_ = xc('A'), B_ = yc('B'), X_ = xc('x'), Y_ = yc('y');
const TOP = `|${A_}${pc('x_1')} + ${B_}${pc('y_1')} + C|`, ROOT = `\\sqrt{${A_}^2 + ${B_}^2}`;
const DF = `${dc('d')} = \\dfrac{${TOP}}{${ROOT}}`;
const lbl = (svg, x, y, s, col, a = {}) => txt(svg, x, y, s, Object.assign({ fill: col, 'font-weight': 600, 'font-size': 20 }, a));
// foot of the perpendicular from (px, py) to a x + b y + c = 0
const foot = (a, b, c, px, py) => { const k = (a * px + b * py + c) / (a * a + b * b); return [px - a * k, py - b * k]; };
const rmk = (svg, P, fx, fy, d1, d2, s = 14) => { const X0 = P.X(fx), Y0 = P.Y(fy), a = [d1[0] * s, -d1[1] * s], b = [d2[0] * s, -d2[1] * s];
  return mk(svg, 'path', { d: `M${X0 + a[0]},${Y0 + a[1]} L${X0 + a[0] + b[0]},${Y0 + a[1] + b[1]} L${X0 + b[0]},${Y0 + b[1]}`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); };
const U = (dx, dy) => { const L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
const house = (svg, x, y) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {});
  mk(g, 'path', { d: 'M-18,-2 L0,-20 L18,-2 Z', fill: PC }); mk(g, 'rect', { x: -13, y: -2, width: 26, height: 20, fill: '#fff', stroke: PC, 'stroke-width': 3 }); mk(g, 'rect', { x: -4, y: 7, width: 8, height: 11, fill: PC }); return g; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tL1 = T0('L1'), tG1 = T0('F1'), tD1 = T0('D1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F9'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tV1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE HOUSE', 'a point'], ['THE ROAD', 'a line'], ['SHORTEST WALK', 'how long?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'house'), wt('H1', 'road'), wt('H2', 'paths')];

/* ---------- H: house and road (same geometry as the lesson, no axes) ---------- */
const HX = v => 254 + v * 48, HY = v => 398 - v * 48, hs = $('#hS');
const hP0 = HX(-3), hP1 = HX(8);
const hBand = mk(hs, 'line', { x1: HX(-3), y1: HY(5.25), x2: HX(8), y2: HY(-3), stroke: '#E3E6EC', 'stroke-width': 44, 'stroke-linecap': 'round' });
const hRd = mk(hs, 'line', { x1: HX(-3), y1: HY(5.25), x2: HX(8), y2: HY(-3), stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '18 12' });
const hF = foot(3, 4, -12, 5, 4);
const hPaths = [-1.5, 0.6, 4.6, 6.6].map(x => mk(hs, 'line', { x1: HX(5), y1: HY(4), x2: HX(x), y2: HY((12 - 3 * x) / 4), stroke: C.dim, 'stroke-width': 3.5, 'stroke-dasharray': '8 7' }));
const hBest = mk(hs, 'line', { x1: HX(5), y1: HY(4), x2: HX(hF[0]), y2: HY(hF[1]), stroke: DC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hMk = (() => { const s = 16, a = U(-4, 3), b = U(3, 4), X0 = HX(hF[0]), Y0 = HY(hF[1]); return mk(hs, 'path', { d: `M${X0 + a[0] * s},${Y0 - a[1] * s} L${X0 + a[0] * s + b[0] * s},${Y0 - a[1] * s - b[1] * s} L${X0 + b[0] * s},${Y0 - b[1] * s}`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); })();
const hH = house(hs, HX(5), HY(4) - 4), hHt = lbl(hs, HX(5) + 26, HY(4) - 10, 'HOUSE', PC, { 'font-size': 18, 'letter-spacing': 1 });
const hRt = lbl(hs, HX(-2.2), HY(5.2) - 30, 'ROAD', RC, { 'font-size': 18, 'letter-spacing': 1 });
const hQ = lbl(hs, HX(3.6), HY(2.7), 'shortest?', DC, { 'font-size': 20, 'font-weight': 700 });

/* ---------- L: live ---------- */
const LO = { ox: 254, oy: 398, s: 48, x0: -3, x1: 8, y0: -3, y1: 6 };
const ls = $('#lSv'), LP = PL(ls, LO);
const lL = fline(ls, LP, 0, 3, 4, 0);
const lPQ = mk(ls, 'line', { stroke: C.ink2, 'stroke-width': 4, 'stroke-dasharray': '9 7', 'stroke-linecap': 'round' });
const lMk = rmk(ls, LP, hF[0], hF[1], U(-4, 3), U(3, 4), 14);
const lP = dotG(ls, LP.X(5), LP.Y(4), 12, PC, '#fff'), lPt = lbl(ls, LP.X(5) + 16, LP.Y(4) - 16, 'P(5, 4)', PC, { 'font-size': 22 });
const lQg = mk(ls, 'g', {}), lQ = mk(lQg, 'g', {}); mk(lQ, 'circle', { r: 11, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
const lQt = lbl(ls, 0, 0, 'Q', C.ink, { 'font-size': 22, 'text-anchor': 'end' });
const xK = ramp(6.5, [[wt('L2', 'slide'), -2, 2.4], [wt('L3', 'Five') - 0.35, 0, 0.6], [wt('L3', 'Four') - 0.35, 1, 0.6], [wt('L3', 'Three') - 0.35, 2, 0.6], [wt('L4', 'growing') - 0.3, 5, 1.4], [wt('L4', 'smallest') - 0.2, hF[0], 1.4]]);
$('#lW').innerHTML = `Distance of a point from a line = the length of the <span class="dd">perpendicular</span>.`;

/* ---------- G: general form ---------- */
$('#g0').innerHTML = K(`${A_}${X_} + ${B_}${Y_} + C = 0`);
$('#g1').innerHTML = K(`${xc('3')}${X_} + ${yc('4')}${Y_} - 12 = 0`);
$('#gP').innerHTML = K(`${A_} = 3, \\quad ${B_} = 4, \\quad C = -12`);
const gs = $('#gS'), GP = PL(gs, LO); const gL = fline(gs, GP, 0, 3, 4, 0);
const gP = dotG(gs, GP.X(5), GP.Y(4), 12, PC, '#fff'), gPt = lbl(gs, GP.X(5) + 16, GP.Y(4) - 16, 'P(x₁, y₁) = (5, 4)', PC, { 'font-size': 22, 'text-anchor': 'end' });
attr(gPt, 'x', GP.X(5) - 16);
const gLt = lbl(gs, GP.X(1.4), GP.Y(5.5), '3x + 4y − 12 = 0', RC, { 'font-size': 22, 'font-weight': 700 });

/* ---------- D: derivation ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${gc('\\text{gap}')} = \\dfrac{${TOP}}{|${B_}|}`)],
  ['Perpendicular + gap: a small right triangle'],
  [K(`${dc('d')} = ${gc('\\text{gap}')} \\times \\dfrac{|${B_}|}{${ROOT}}`) + '<span class="why2">&nbsp; same shape as 3, 4, 5</span>'],
  [K(DF)]], { label: 'THE DISTANCE FORMULA', y0: 104, dy: 118 });
const tDs = [wt('D1', 'vertical'), wt('D2', 'perpendicular'), wt('D3', 'general'), wt('D4', 'cancel')];
const DO = { ox: 166, oy: 410, s: 56, x0: -1, x1: 7, y0: -1, y1: 6 };
const ds = $('#dS'), DP = PL(ds, DO); const dL = fline(ds, DP, 0, 3, 4, 0);
const dGap = seg(ds, DP, 5, 4, 5, -0.75, GC, 5, '10 7'), dGapT = lbl(ds, DP.X(5) + 14, DP.Y(1.6), 'gap 19/4', GC);
const dPerp = seg(ds, DP, 5, 4, hF[0], hF[1], DC, 6), dPerpT = lbl(ds, DP.X(3.5) - 12, DP.Y(2.9), 'd', DC, { 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'end' });
const dMk = rmk(ds, DP, hF[0], hF[1], U(-4, 3), U(3, 4), 14);
const dTri = mk(ds, 'path', { d: `M${DP.X(5)},${DP.Y(4)} L${DP.X(hF[0])},${DP.Y(hF[1])} L${DP.X(5)},${DP.Y(-0.75)} Z`, fill: M.mix(DC, '#FFFFFF', 0.85), stroke: 'none' }); ds.insertBefore(dTri, dL.el);
const dS3 = seg(ds, DP, 0, 0, 0, 3, YC, 6), dS4 = seg(ds, DP, 0, 0, 4, 0, XC, 6);
const dS3t = lbl(ds, DP.X(0) + 12, DP.Y(1.2) + 7, '3', YC, { 'font-size': 24, 'font-weight': 700 }), dS4t = lbl(ds, DP.X(1.6), DP.Y(0) - 12, '4', XC, { 'font-size': 24, 'text-anchor': 'middle', 'font-weight': 700 }), dS5t = lbl(ds, DP.X(1.7), DP.Y(2.3), '5', RC, { 'font-size': 24, 'font-weight': 700 });
const dP = dotG(ds, DP.X(5), DP.Y(4), 12, PC, '#fff'), dPt = lbl(ds, DP.X(5) + 16, DP.Y(4) - 14, 'P(5, 4)', PC, { 'font-size': 22 });
$('#dP').innerHTML = K(`${dc('d')} = |15 + 16 - 12| \\div 5 = 19 \\div 5 = ${dc('3.8')}`);

/* ---------- K: point-line vs parallel lines ---------- */
$('#kpF').innerHTML = K(DF); $('#knF').innerHTML = K(`${dc('d')} = \\dfrac{|C_1 - C_2|}{${ROOT}}`);
const KO = { ox: 110, oy: 500, s: 48, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
const kp = $('#kpS'), KP = PL(kp, KO), kpL = fline(kp, KP, 0, 6, 8, 0);
const kF = foot(3, 4, -24, 8, 5), kpP = dotG(kp, KP.X(8), KP.Y(5), 11, PC, '#fff'), kpD = seg(kp, KP, 8, 5, kF[0], kF[1], DC, 6), kpM = rmk(kp, KP, kF[0], kF[1], U(-4, 3), U(3, 4), 13);
const kpT = lbl(kp, KP.X(7) + 14, KP.Y(3.2), 'd = 4', DC, { 'font-weight': 700 });
const kn = $('#knS'), KN = PL(kn, KO), knA = fline(kn, KN, 0, 3, 4, 0), knB = fline(kn, KN, 0, 6, 8, 0);
const knG = [[0.5, 2.625], [2.5, 1.125], [3.6, 0.3]].map(([x, y]) => seg(kn, KN, x, y, x + 1.44, y + 1.92, DC, 5));
const knT = lbl(kn, KN.X(5.2) + 6, KN.Y(4.1), 'same gap everywhere', DC, { 'font-weight': 700 });
const th1 = PUC.think($('#th1'), { q: 'A point lies on the line itself. What is its distance from the line?', opts: ['0', '1', 'It depends'], right: 0, why: 'On the line, Ax₁ + By₁ + C = 0, so the top of the formula is 0.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(DF);

/* ---------- V: make it equal zero ---------- */
$('#v0').innerHTML = K(`3${X_} + 4${Y_} = 10`); $('#v2').innerHTML = K(`3${X_} + 4${Y_} - 10 = 0`);
const VO = { ox: 200, oy: 440, s: 64, x0: -1, x1: 6, y0: -1, y1: 5 };
const vs = $('#vS'), VP = PL(vs, VO), vL = fline(vs, VP, 0, 2.5, 2, 1);
const vF = foot(3, 4, -10, 0, 0), vO = dotG(vs, VP.X(0), VP.Y(0), 11, PC, '#fff'), vD = seg(vs, VP, 0, 0, vF[0], vF[1], DC, 6), vM = rmk(vs, VP, vF[0], vF[1], U(-4, 3), U(-3, -4), 13);
const vT = lbl(vs, VP.X(vF[0] / 2) + 18, VP.Y(vF[1] / 2) + 18, 'd = 2', DC, { 'font-weight': 700 });
const th2 = PUC.think($('#th2'), { q: `How far is the origin from ${K('3x + 4y = 10')}?`, opts: [K('10'), K('2'), K('10/7')], right: 1, why: 'Write 3x + 4y − 10 = 0. Put in (0, 0): |−10| ÷ 5 = 2.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the distance of the point ${K(`${pc('(3,\\ 1)')}`)} from the line ${K(`12${X_} - 5${Y_} + 8 = 0`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${A_} = 12,\\ ${B_} = -5,\\ C = 8`)],
  [K(`|12(3) - 5(1) + 8| = 39`)],
  [K(`\\sqrt{144 + 25} = \\sqrt{169} = 13`)],
  [K(`${dc('d')} = \\dfrac{39}{13} = ${dc('3')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Read'), wt('W4', 'Top'), wt('W5', 'Bottom'), wt('W6', 'Thirty')];
const WO = { ox: 222, oy: 446, s: 56, x0: -2, x1: 5, y0: -2, y1: 6 };
const ws = $('#wS'), WP = PL(ws, WO), wL = fline(ws, WP, 0, 1.6, 1, 4);
const wF = foot(12, -5, 8, 3, 1), wP = dotG(ws, WP.X(3), WP.Y(1), 11, PC, '#fff'), wPt = lbl(ws, WP.X(3) + 16, WP.Y(1) + 26, '(3, 1)', PC, { 'font-size': 22 });
const wD = seg(ws, WP, 3, 1, wF[0], wF[1], DC, 6), wM = rmk(ws, WP, wF[0], wF[1], U(5, 12), U(12, -5), 13);
const wT = lbl(ws, WP.X(1.7) + 6, WP.Y(1.9), 'd = 3', DC, { 'font-weight': 700, 'font-size': 22 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`d = \\tfrac{|-2 - 1|}{5} = \\tfrac{3}{5}`) + '<span class="why2">&nbsp; x and y parts do not match</span>', right: K(`3x + 4y + \\tfrac{1}{2} = 0 \\Rightarrow d = \\tfrac{|-2 - \\frac{1}{2}|}{5} = ${dc('\\tfrac{1}{2}')}`) });
const TO = { ox: 280, oy: 150, s: 30, x0: -3, x1: 5, y0: -3, y1: 3, nolab: 1 };
const ts = $('#tS'), TP = PL(ts, TO), tA = fline(ts, TP, 0, 0.5, 2, -1, RC, 4), tB = fline(ts, TP, 0, -0.125, 2, -1.625, RC, 4);
const tG = seg(ts, TP, 2, -1, 2 - 0.3, -1 - 0.4, DC, 5);
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find lines parallel to a given line at a set distance from a point.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Two points on the x-axis are at a distance 4 from the line ${K('4x + 3y - 12 = 0')}. The sum of their x-coordinates is`,
  opts: [K('3'), K('6'), K('8'), K('10')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`(h, 0):\\ d = \\tfrac{|4h - 12|}{5}`)], [K(`|4h - 12| = 20`)], [K(`4h - 12 = \\pm 20`)], [K(`h = 8 \\text{ or } h = -2`)], [K(`8 + (-2) = 6`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'point'), wt('A3', 'Set'), wt('A3', 'So'), wt('A4', 'gives'), wt('A4', 'sum')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 216, w: 1320, h: 568, title: 'Recap · distance of a point from a line', y0: 92, dy: 76, txt: [1, 0, 0, 1, 1],
  lines: ['<b>Distance</b> = length of the perpendicular, the shortest path', K(DF), K(`\\text{Parallel lines: } ${dc('d')} = \\dfrac{|C_1 - C_2|}{${ROOT}}`),
    '<b>First</b> make the line equal 0: 3x + 4y − 10 = 0, so C = −10',
    '<b>Trap</b>: match the x and y parts before using C₁ − C₂'] });
[...document.querySelectorAll('#sF .fcard .fl')].forEach((e, i) => { const add = [0, 14, 56, 110, 120][i]; e.style.top = (parseFloat(e.style.top) + add) + 'px'; });
const YQ = ['How far is the origin from the line 5x + 12y = 26?', 'Why is the shortest path from a point to a line perpendicular?', 'What is the distance between x + y = 1 and x + y = 3?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 74', topic: 'Slice an ice cream cone four ways: Sections of a Cone and the Circle', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L4'), 1.05, 960, 560], [T0('L5') + 0.6, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tL1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('L1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hBand, t, tMorph + 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis(hRd, t, tMorph + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(hRt, t, tMorph + 0.5, 1e9, { dy: 0 });
    M.vis(hH, t, tMorph + 0.6, 1e9, { ...POP, sc: 0.4 }); M.vis(hHt, t, tMorph + 0.7, 1e9, { dy: 0 });
    hPaths.forEach((p, i) => M.draw(p, t, tMorph + 0.9 + i * 0.25, 0.5));
    M.draw(hBest, t, wt('H4', 'Which'), 0.6); M.vis(hQ, t, wt('H4', 'Which') + 0.3, 1e9, { dy: 0 }); M.vis(hMk, t, wt('H5', 'formula'), 1e9, { dy: 0 });
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'long') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tG1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('F1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o }); lL.run(t, wt('L1', 'line') - 0.1, 0.8);
    M.vis(lP, t, wt('L1', 'point'), 1e9, DOT); M.vis(lPt, t, wt('L1', 'point') + 0.1, 1e9, { dy: 0 });
    const tq = wt('L2', 'Q'), x = xK(t), y = (12 - 3 * x) / 4, d = Math.hypot(x - 5, y - 4), best = Math.abs(x - hF[0]) < 0.03;
    attr(lQg, 'transform', `translate(${LP.X(x).toFixed(1)},${LP.Y(y).toFixed(1)})`); M.vis(lQ, t, tq, 1e9, DOT);
    attr(lQt, 'x', (LP.X(x) - 16).toFixed(1)); attr(lQt, 'y', (LP.Y(y) - 14).toFixed(1)); M.vis(lQt, t, tq + 0.1, 1e9, { dy: 0 });
    attr(lPQ, 'x1', LP.X(5)); attr(lPQ, 'y1', LP.Y(4)); attr(lPQ, 'x2', LP.X(x).toFixed(1)); attr(lPQ, 'y2', LP.Y(y).toFixed(1));
    M.hide(lPQ, t < tq + 0.2); attr(lPQ, 'stroke', best ? DC : C.ink2); attr(lPQ, 'stroke-dasharray', best ? 'none' : '9 7'); attr(lPQ, 'stroke-width', best ? 6 : 4);
    M.hide(lMk, !best);
    M.vis($('#lA'), t, tq, 1e9, { dy: 10 }); M.setT($('#lX'), x.toFixed(2).replace('-', '−')); M.setT($('#lY'), y.toFixed(2).replace('-', '−'));
    M.vis($('#lB'), t, wt('L2', 'distance'), 1e9, { dy: 10 }); M.setT($('#lD'), d.toFixed(2));
    const st = best ? 'SHORTEST · MEETS THE ROAD AT 90°' : ''; M.setT($('#lP'), st || ' '); $('#lP').className = 'pillp ac';
    M.vis($('#lP'), t, best ? wt('L4', 'smallest') + 0.8 : null, best ? 1e9 : -1, POP);
    M.vis($('#lW'), t, wt('L5', 'distance') - 0.1, 1e9, { dy: 10 });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('D1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#g0'), t, wt('F1', 'plus') - 0.3, 0.8);
    PUC.write($('#g1'), t, T0('F2'), 0.6); M.vis($('#gP'), t, wt('F2', 'three'), 1e9, POP);
    M.vis($('#gr'), t, tG1 + 0.2, out, { dx: 60, dy: 0, ...o }); gL.run(t, tG1 + 0.4, 0.7); M.vis(gLt, t, tG1 + 0.9, 1e9, { dy: 0 });
    M.vis(gP, t, tG1 + 1.0, 1e9, DOT); M.vis(gPt, t, tG1 + 1.1, 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o }); dL.run(t, tD1 + 0.3, 0.6);
    M.vis(dP, t, tD1 + 0.5, 1e9, DOT); M.vis(dPt, t, tD1 + 0.6, 1e9, { dy: 0 });
    M.draw(dGap, t, wt('D1', 'straight'), 0.6); M.vis(dGapT, t, wt('D1', 'vertical'), 1e9, { dy: 0 });
    M.draw(dPerp, t, wt('D2', 'perpendicular') - 0.1, 0.5); M.vis(dPerpT, t, wt('D2', 'perpendicular') + 0.3, 1e9, { dy: 0 });
    M.vis(dTri, t, wt('D2', 'triangle') - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(dMk, t, wt('D2', 'triangle'), 1e9, { dy: 0 });
    M.draw(dS4, t, wt('D3', 'Run'), 0.4); M.vis(dS4t, t, wt('D3', 'Run') + 0.2, 1e9, { dy: 0 }); M.draw(dS3, t, wt('D3', 'rise'), 0.4); M.vis(dS3t, t, wt('D3', 'rise') + 0.2, 1e9, { dy: 0 }); M.vis(dS5t, t, wt('D3', 'long'), 1e9, { dy: 0 });
    M.vis($('#dP'), t, wt('D5', 'top') - 0.1, 1e9, POP);
  }

  /* K + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kpF'), t, tK1 + 0.4, 0.7); kpL.run(t, wt('K1', 'line') - 0.1, 0.6);
    M.vis(kpP, t, wt('K1', 'point'), 1e9, DOT); M.draw(kpD, t, wt('K1', 'line'), 0.5); M.vis(kpM, t, wt('K1', 'line') + 0.4, 1e9, { dy: 0 }); M.vis(kpT, t, wt('K1', 'line') + 0.5, 1e9, { dy: 0 });
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); knA.run(t, wt('K2', 'parallel') - 0.1, 0.6); knB.run(t, wt('K2', 'parallel') + 0.2, 0.6);
    knG.forEach((g, i) => M.draw(g, t, wt('K2', 'everywhere') - 0.2 + i * 0.2, 0.3)); M.vis(knT, t, wt('K2', 'everywhere') + 0.3, 1e9, { dy: 0 });
    PUC.write($('#knF'), t, wt('K2', 'size') - 0.2, 0.7);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'What') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'For') });
  }

  /* statement */
  const stOn = t >= tT && t < tV1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tV1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'shortest') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'length') - 0.1, 0.9);
  }

  /* V + think */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V3');
    M.vis($('#vl'), t, tV1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#v0'), t, T0('V2'), 0.6); M.vis($('#v1'), t, wt('V2', 'becomes'), 1e9, { dy: 8 }); PUC.write($('#v2'), t, wt('V2', 'becomes') + 0.3, 0.8);
    M.vis($('#vP'), t, wt('V2', 'So') - 0.1, 1e9, POP);
    M.vis($('#vr'), t, T0('V2') + 0.2, out, { dx: 60, dy: 0, ...o }); vL.run(t, T0('V2') + 0.4, 0.7);
    M.vis(vO, t, wt('V2', 'minus'), 1e9, DOT); M.draw(vD, t, wt('V2', 'So'), 0.5); M.vis(vM, t, wt('V2', 'So') + 0.4, 1e9, { dy: 0 });
    M.vis(vT, t, T0('V4') + 0.2, 1e9, { dy: 0 });
    M.vis($('#th2'), t, tV3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'How') + 0.4, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Put') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wP, t, wt('W2', 'point'), 1e9, DOT); M.vis(wPt, t, wt('W2', 'point') + 0.1, 1e9, { dy: 0 }); wL.run(t, wt('W2', 'twelve'), 0.8);
    M.draw(wD, t, tWs[3], 0.5); M.vis(wM, t, tWs[3] + 0.4, 1e9, { dy: 0 }); M.vis(wT, t, tWs[3] + 0.5, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'match') - 0.1, tRight: wt('X3', 'Halve') });
    tA.run(t, T0('X2') + 0.3, 0.5); tB.run(t, wt('X3', 'Halve') + 0.3, 0.5); M.draw(tG, t, wt('X3', 'answer'), 0.4);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'lines') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F9', 'Screenshot') });
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
