// PUC Maths Ep 71: Point-slope and two-point forms of a line (Proof board)
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
// Ep 71 colours: x violet, y blue, slope m and the line coral, the fixed point P0 (x0, y0) gold
const P0C = C.gold;
const pc = s => `\\textcolor{${P0C}}{${s}}`;
const X_ = xc('x'), Y_ = yc('y'), M_ = rc('m'), X0 = pc('x_0'), Y0 = pc('y_0');
const PSF = `${Y_} - ${Y0} = ${M_}\\,(${X_} - ${X0})`;
const lbl = (svg, x, y, s, col, a = {}) => txt(svg, x, y, s, Object.assign({ fill: col, 'font-weight': 600, 'font-size': 20 }, a));

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tE1 = T0('E1'), tL1 = T0('L1'), tD1 = T0('D1'), tP1 = T0('P1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tV1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['DOT 1', 'home'], ['DOT 2', 'college'], ['THE ROAD', 'one rule?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'home'), wt('H1', 'college'), wt('H2', 'rule')];

/* ---------- H: two dots on a map ---------- */
const HO = { ox: 110, oy: 470, s: 62, x0: 0, x1: 9, y0: 0, y1: 6 };
const hs = $('#hS'), HP = PL(hs, HO);
const hRoad = mk(hs, 'line', { x1: HP.X(1), y1: HP.Y(2), x2: HP.X(5), y2: HP.Y(4), stroke: RC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hExt = [[1, 2, -1.2], [5, 4, 3.8]].map(([x, y, dx]) => mk(hs, 'line', { x1: HP.X(x), y1: HP.Y(y), x2: HP.X(x + dx), y2: HP.Y(y + dx / 2), stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' }));
const hH = dotG(hs, HP.X(1), HP.Y(2), 12, C.ink, '#fff'), hC = dotG(hs, HP.X(5), HP.Y(4), 12, C.ink, '#fff');
const hHt = lbl(hs, HP.X(1) + 16, HP.Y(2) + 32, 'HOME (1, 2)', C.ink), hCt = lbl(hs, HP.X(5) - 14, HP.Y(4) - 22, 'COLLEGE (5, 4)', C.ink, { 'text-anchor': 'end' });
const hQ = dotG(hs, HP.X(3), HP.Y(5), 11, '#fff', C.mute), hQt = lbl(hs, HP.X(3) + 18, HP.Y(5) + 7, 'on the road?', C.mute);
const hF = lbl(hs, HP.X(8.3), HP.Y(5.6), 'forever', RC, { 'text-anchor': 'end' });

/* ---------- E: equation = a rule ---------- */
$('#e1').innerHTML = `<span style="color:var(--ok)">On the line</span>: the point obeys the rule.`;
$('#e2').innerHTML = `<span style="color:var(--red)">Off the line</span>: the point breaks it.`;
const EO = { ox: 110, oy: 470, s: 62, x0: 0, x1: 9, y0: 0, y1: 6 };
const es = $('#eS'), EP = PL(es, EO);
const eL = fline(es, EP, 1, 2, 5, 4);
const eD = [[3, 3, 1], [7, 5, 1], [5, 1.5, 0]].map(([x, y, ok]) => ({ g: dotG(es, EP.X(x), EP.Y(y), 12, ok ? C.ok : C.red, '#fff'), t: lbl(es, EP.X(x) + 18, EP.Y(y) + (ok ? 26 : 7), ok ? `(${x}, ${y}) ✓` : `(${x}, ${y}) ✗`, ok ? C.ok : C.red), ok }));

/* ---------- L: live, slide P ---------- */
$('#lF').innerHTML = K(`\\dfrac{${Y_} - ${Y0}}{${X_} - ${X0}} = ${M_}`);
const LO = { ox: 110, oy: 470, s: 62, x0: 0, x1: 9, y0: 0, y1: 6 };
const ls = $('#lSv'), LP = PL(ls, LO);
const lL = fline(ls, LP, 1, 2, 5, 4);
const lRu = mk(ls, 'line', { stroke: XC, 'stroke-width': 6, 'stroke-linecap': 'round' }), lRi = mk(ls, 'line', { stroke: YC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const lP0 = dotG(ls, LP.X(1), LP.Y(2), 12, P0C, '#fff'), lP0t = lbl(ls, LP.X(1) - 6, LP.Y(2) + 36, 'P₀(1, 2)', P0C, { 'font-size': 22 });
const lPg = mk(ls, 'g', {}), lP = mk(lPg, 'g', {}); const lPc = mk(lP, 'circle', { r: 12, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
const lPt = lbl(ls, 0, 0, 'P(x, y)', C.ink, { 'font-size': 22, 'text-anchor': 'end' });
const xK = ramp(3, [[wt('L2', 'slide'), 7, 2.6], [wt('L3', 'Still') - 0.3, 3.5, 1.8]]);
const offK = ramp(0, [[wt('L4', 'push'), 0.8, 0.8], [wt('L5', 'So'), 0, 0.8]]);
let lLast = '';

/* ---------- D: point-slope derivation ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`\\text{slope } P_0P = \\dfrac{${Y_} - ${Y0}}{${X_} - ${X0}}`)],
  [K(`\\dfrac{${Y_} - ${Y0}}{${X_} - ${X0}} = ${M_}`)],
  ['Multiply both sides by ' + K(`(${X_} - ${X0})`)],
  [K(PSF)]], { label: 'THE POINT-SLOPE FORM', y0: 104, dy: 112 });
const tDs = [wt('D2', 'slope'), wt('D3', 'For'), wt('D4', 'Multiply'), wt('D5', 'equals')];
const DO = { ox: 110, oy: 470, s: 62, x0: 0, x1: 9, y0: 0, y1: 6, nolab: 1 };
const ds = $('#dS'), DP = PL(ds, DO);
const dL = fline(ds, DP, 1, 2, 5, 4);
const dRu = seg(ds, DP, 1, 2, 6, 2, XC, 6), dRi = seg(ds, DP, 6, 2, 6, 4.5, YC, 6);
const dP0 = dotG(ds, DP.X(1), DP.Y(2), 12, P0C, '#fff'), dP = dotG(ds, DP.X(6), DP.Y(4.5), 12, C.ink, '#fff');
const dP0t = lbl(ds, DP.X(1) - 6, DP.Y(2) + 36, 'P₀(x₀, y₀)', P0C, { 'font-size': 22 }), dPt = lbl(ds, DP.X(6) - 16, DP.Y(4.5) - 20, 'P(x, y)', C.ink, { 'font-size': 22, 'text-anchor': 'end' });
const dRut = lbl(ds, DP.X(4.3), DP.Y(2) + 34, 'x − x₀', XC, { 'font-size': 22, 'text-anchor': 'middle' }), dRit = lbl(ds, DP.X(6) + 16, DP.Y(3.25) + 8, 'y − y₀', YC, { 'font-size': 22 });
$('#dP').innerHTML = K(`${Y_} - ${pc('2')} = ${rc('\\tfrac{1}{2}')}\\,(${X_} - ${pc('1')})`);

/* ---------- P: two-point form ---------- */
const psol = PUC.solution($('#pl'), [
  [K(`${M_} = \\dfrac{y_2 - y_1}{x_2 - x_1}`)],
  [K(`${Y_} - y_1 = ${M_}\\,(${X_} - x_1)`)],
  [K(`${Y_} - y_1 = \\dfrac{y_2 - y_1}{x_2 - x_1}\\,(${X_} - x_1)`)]], { label: 'THE TWO-POINT FORM', y0: 110, dy: 130 });
const tPs = [wt('P2', 'Find'), wt('P3', 'Put'), wt('P4', 'two')];
const ps = $('#pS'), PP = PL(ps, DO);
const pL = fline(ps, PP, 1, 2, 5, 4);
const pRu = seg(ps, PP, 1, 2, 5, 2, XC, 6), pRi = seg(ps, PP, 5, 2, 5, 4, YC, 6);
const pA = dotG(ps, PP.X(1), PP.Y(2), 12, C.ink, '#fff'), pB = dotG(ps, PP.X(5), PP.Y(4), 12, C.ink, '#fff');
const pAt = lbl(ps, PP.X(1) - 6, PP.Y(2) + 36, '(x₁, y₁)', C.ink, { 'font-size': 22 }), pBt = lbl(ps, PP.X(5) - 16, PP.Y(4) - 20, '(x₂, y₂)', C.ink, { 'font-size': 22, 'text-anchor': 'end' });
const pRut = lbl(ps, PP.X(3.6), PP.Y(2) + 34, 'x₂ − x₁', XC, { 'font-size': 22, 'text-anchor': 'middle' }), pRit = lbl(ps, PP.X(5) + 16, PP.Y(3) + 8, 'y₂ − y₁', YC, { 'font-size': 22 });

/* ---------- K: side by side ---------- */
$('#kpF').innerHTML = K(PSF);
$('#knF').innerHTML = K(`${Y_} - y_1 = \\dfrac{y_2 - y_1}{x_2 - x_1}(${X_} - x_1)`);
const KO = { ox: 110, oy: 500, s: 50, x0: 0, x1: 10, y0: 0, y1: 5, lab: 2 };
const kp = $('#kpS'), KP = PL(kp, KO), kpL = fline(kp, KP, 2, 1, 6, 3);
const kpD = dotG(kp, KP.X(2), KP.Y(1), 12, P0C, '#fff'), kpDt = lbl(kp, KP.X(2) + 16, KP.Y(1) + 30, '1 point', P0C);
const kpRu = seg(kp, KP, 5, 2.5, 7, 2.5, XC, 5), kpRi = seg(kp, KP, 7, 2.5, 7, 3.5, YC, 5), kpM = lbl(kp, KP.X(7) + 12, KP.Y(3) + 7, 'slope m', RC, { 'font-weight': 700 });
const kn = $('#knS'), KN = PL(kn, KO), knL = fline(kn, KN, 2, 1, 6, 3);
const knA = dotG(kn, KN.X(2), KN.Y(1), 12, C.ink, '#fff'), knB = dotG(kn, KN.X(6), KN.Y(3), 12, C.ink, '#fff');
const knT = lbl(kn, KN.X(6) + 16, KN.Y(3) + 26, '2 points', C.ink);
const th1 = PUC.think($('#th1'), { q: `Through ${K('(2,\\ 3)')} with slope ${K('-1')}: which form fits best?`, opts: ['Point-slope', 'Two-point'], right: 0, why: 'One point and a slope given: y − 3 = −1 (x − 2).' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(PSF);

/* ---------- V: vertical vs horizontal ---------- */
const VO = { ox: 110, oy: 470, s: 54, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
$('#vvF').innerHTML = K(`${X_} = 3`); $('#vhF').innerHTML = K(`${Y_} = 2`);
const vv = $('#vvS'), VV = PL(vv, VO), vvL = fline(vv, VV, 3, 0, 3, 6);
const vvD = [1, 3, 5].map(y => dotG(vv, VV.X(3), VV.Y(y), 10, C.ink, '#fff')), vvT = [1, 3, 5].map(y => lbl(vv, VV.X(3) + 18, VV.Y(y) + 7, `(3, ${y})`, C.ink));
const vh = $('#vhS'), VH = PL(vh, VO), vhL = fline(vh, VH, 0, 2, 10, 2);
const vhD = [2, 5, 8].map(x => dotG(vh, VH.X(x), VH.Y(2), 10, C.ink, '#fff')), vhT = [2, 5, 8].map(x => lbl(vh, VH.X(x), VH.Y(2) - 22, `(${x}, 2)`, C.ink, { 'text-anchor': 'middle' }));
const th2 = PUC.think($('#th2'), { q: `A line passes through ${K('(4,\\ 1)')} and ${K('(4,\\ 6)')}. Its equation?`, opts: [K('y = 4'), K('x = 4'), K('y = x - 3')], right: 1, why: 'Both points have x = 4: the line is vertical, so its rule is x = 4.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the equation of the line through ${K('(1,\\ -1)')} and ${K('(3,\\ 5)')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${M_} = \\dfrac{5 - (-1)}{3 - 1} = \\dfrac{6}{2} = ${rc('3')}`)],
  [K(`${Y_} - (${pc('-1')}) = ${rc('3')}\\,(${X_} - ${pc('1')})`)],
  [K(`${Y_} + 1 = 3${X_} - 3 \\;\\Rightarrow\\; ${Y_} = 3${X_} - 4`)],
  [K(`\\text{check } (3, 5):\\ 3(3) - 4 = 5\\ \\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'slope'), wt('W4', 'Use'), wt('W5', 'So'), wt('W6', 'Check')];
const WO = { ox: 204, oy: 424, s: 54, x0: -1, x1: 6, y0: -2, y1: 6 };
const ws = $('#wS'), WP = PL(ws, WO);
const wL = fline(ws, WP, 1, -1, 3, 5);
const wRu = seg(ws, WP, 1, -1, 3, -1, XC, 6), wRi = seg(ws, WP, 3, -1, 3, 5, YC, 6);
const wA = dotG(ws, WP.X(1), WP.Y(-1), 11, P0C, '#fff'), wB = dotG(ws, WP.X(3), WP.Y(5), 11, C.ink, '#fff');
const wAt = lbl(ws, WP.X(1) - 14, WP.Y(-1) + 8, '(1, −1)', P0C, { 'text-anchor': 'end' }), wBt = lbl(ws, WP.X(3) + 18, WP.Y(5) + 8, '(3, 5)', C.ink);
const wRut = lbl(ws, WP.X(2), WP.Y(-1) + 30, 'run 2', XC, { 'text-anchor': 'middle' }), wRit = lbl(ws, WP.X(3) + 14, WP.Y(2) + 7, 'rise 6', YC);
const wEq = lbl(ws, WP.X(3.7) + 10, WP.Y(4.2), 'y = 3x − 4', RC, { 'font-size': 24, 'font-weight': 700 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${Y_} - 5 = 4\\,(${X_} - 2)`) + '<span class="why2">&nbsp; that is the point (2, 5)</span>', right: K(`${Y_} - 5 = 4\\,(${X_} - (${pc('-2')})) = 4\\,(${X_} + 2)`) });
const TO = { ox: 300, oy: 236, s: 26, x0: -4, x1: 4, y0: -1, y1: 7, nolab: 1 };
const ts = $('#tS'), TP = PL(ts, TO);
const tW = fline(ts, TP, 2, 5, 3, 9, C.red, 4), tR = fline(ts, TP, -2, 5, -1, 9, C.ok, 4); attr(tW.el, 'stroke-dasharray', '9 7');
const tA = dotG(ts, TP.X(-2), TP.Y(5), 8, P0C, '#fff', 2), tB = dotG(ts, TP.X(2), TP.Y(5), 7, '#fff', C.red, 2);
const tAt = lbl(ts, TP.X(-2) - 12, TP.Y(5) + 6, '(−2, 5)', P0C, { 'font-size': 16, 'text-anchor': 'end' }), tBt = lbl(ts, TP.X(2) + 12, TP.Y(5) + 6, '(2, 5)', C.red, { 'font-size': 16 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: "Find a line's equation from the points where it meets the axes." });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `The line through ${K('A(2,\\ 3)')} and ${K('B(6,\\ 11)')} meets the y-axis at ${K('(0,\\ k)')} and passes through ${K('(a,\\ 15)')}. Then ${K('k + a')} =`,
  opts: [K('6'), K('7'), K('8'), K('9')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${M_} = \\tfrac{11 - 3}{6 - 2} = 2`)], [K(`${Y_} - 3 = 2(${X_} - 2)`)], [K(`${Y_} = 2${X_} - 1 \\Rightarrow k = -1`)], [K(`15 = 2a - 1 \\Rightarrow a = 8`)], [K(`k + a = 7`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'slope'), wt('A3', 'Point'), wt('A4', 'At'), wt('A4', 'Fifteen'), wt('A4', 'plus')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 226, w: 1320, h: 540, title: 'Recap · point-slope and two-point forms', y0: 96, dy: 82, txt: [1, 0, 0, 1, 1],
  lines: ['<b>Equation of a line</b>: a rule every point on it obeys',
    K(`\\text{Point-slope: } ${PSF}`),
    K(`\\text{Two-point: } ${Y_} - y_1 = \\dfrac{y_2 - y_1}{x_2 - x_1}(${X_} - x_1)`),
    '<b>Vertical</b> line: x = a &nbsp;·&nbsp; <b>horizontal</b> line: y = b',
    '<b>Trap</b>: through (−2, 5), write x + 2, not x − 2'] });
[...document.querySelectorAll('#sF .fcard .fl')].forEach((e, i) => { if (i >= 3) e.style.top = (parseFloat(e.style.top) + 34) + 'px'; if (i === 2) e.style.top = (parseFloat(e.style.top) + 14) + 'px'; });
const YQ = ['Write the line through the origin with slope 2.', 'Which line can the point-slope form not describe, and why?', 'What is the slope of the line through (1, 1) and (2, 3)?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 72', topic: 'Where the road crosses the main streets: Slope-Intercept and Intercept Forms', y: 764 });

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
  const hOn = t >= tMorph && t < tE1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('E1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hH, t, tMorph + 0.4, 1e9, DOT); M.vis(hHt, t, tMorph + 0.5, 1e9, { dy: 0 }); M.vis(hC, t, tMorph + 0.7, 1e9, DOT); M.vis(hCt, t, tMorph + 0.8, 1e9, { dy: 0 });
    M.draw(hRoad, t, tMorph + 1.0, 0.7); M.vis(hQ, t, tMorph + 1.6, 1e9, DOT); M.vis(hQt, t, tMorph + 1.7, 1e9, { dy: 0 });
    hExt.forEach(e => M.draw(e, t, wt('H4', 'forever') - 0.1, 0.6)); M.vis(hF, t, wt('H4', 'forever'), 1e9, { dy: 0 });
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'really') - 0.1, 1e9, POP);
  }

  /* E */
  const eOn = t >= tE1 - 0.1 && t < tL1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('L1');
    M.vis($('#el'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#e0'), t, wt('E1', 'rule'), { st: 0.04 });
    M.vis($('#e1'), t, wt('E2', 'obeys') - 0.3, 1e9, { dy: 10 }); M.vis($('#e2'), t, wt('E2', 'breaks') - 0.3, 1e9, { dy: 10 }); M.vis($('#eP'), t, wt('E2', 'password') - 0.1, 1e9, POP);
    M.vis($('#er'), t, tE1 + 0.2, out, { dx: 60, dy: 0, ...o }); eL.run(t, tE1 + 0.4, 0.8);
    eD.forEach((d, i) => { const tt = d.ok ? wt('E2', 'obeys') + i * 0.3 : wt('E2', 'breaks'); M.vis(d.g, t, tt, 1e9, DOT); M.vis(d.t, t, tt + 0.1, 1e9, { dy: 0 }); });
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(lP0, t, wt('L1', 'fixed'), 1e9, DOT); M.vis(lP0t, t, wt('L1', 'fixed') + 0.1, 1e9, { dy: 0 });
    lL.run(t, wt('L1', 'slope') - 0.1, 0.8); M.vis($('#lW'), t, wt('L1', 'slope'), 1e9, { dy: 8 });
    const tp = wt('L2', 'point'), x = xK(t), off = offK(t), y = 0.5 * x + 1.5 + off, sl = (y - 2) / (x - 1), on = off < 0.02;
    attr(lPg, 'transform', `translate(${LP.X(x).toFixed(1)},${LP.Y(y).toFixed(1)})`); M.vis(lP, t, tp, 1e9, DOT);
    attr(lPt, 'x', (LP.X(x) - 16).toFixed(1)); attr(lPt, 'y', (LP.Y(y) - 18).toFixed(1)); M.vis(lPt, t, tp + 0.1, 1e9, { dy: 0 });
    attr(lPc, 'fill', on ? C.ink : C.red);
    const triOn = t >= wt('L3', 'Watch');
    attr(lRu, 'x1', LP.X(1)); attr(lRu, 'y1', LP.Y(2)); attr(lRu, 'x2', LP.X(x).toFixed(1)); attr(lRu, 'y2', LP.Y(2));
    attr(lRi, 'x1', LP.X(x).toFixed(1)); attr(lRi, 'y1', LP.Y(2)); attr(lRi, 'x2', LP.X(x).toFixed(1)); attr(lRi, 'y2', LP.Y(y).toFixed(1));
    M.hide(lRu, !triOn); M.hide(lRi, !triOn);
    M.vis($('#lA'), t, tp, 1e9, { dy: 10 }); M.setT($('#lX'), x.toFixed(1)); M.setT($('#lY'), y.toFixed(2));
    M.vis($('#lB'), t, wt('L3', 'Watch'), 1e9, { dy: 10 }); M.setT($('#lS'), sl.toFixed(2)); $('#lS').style.color = on ? '' : C.red;
    const st = on ? 'ON THE LINE · SLOPE = 1/2' : 'OFF THE LINE · SLOPE ≠ 1/2';
    if (st !== lLast) { lLast = st; M.setT($('#lC'), st); $('#lC').className = 'pillp ' + (on ? 'good' : 'bad'); }
    M.vis($('#lC'), t, wt('L3', 'Rise'), 1e9, POP);
    PUC.write($('#lF'), t, wt('L5', 'equals') - 0.1, 0.8);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tP1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('P1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o }); dL.run(t, tD1 + 0.4, 0.8);
    M.vis(dP0, t, tD1 + 0.6, 1e9, DOT); M.vis(dP0t, t, tD1 + 0.7, 1e9, { dy: 0 }); M.vis(dP, t, tD1 + 0.9, 1e9, DOT); M.vis(dPt, t, tD1 + 1.0, 1e9, { dy: 0 });
    M.draw(dRi, t, wt('D2', 'y') - 0.1, 0.4); M.vis(dRit, t, wt('D2', 'y'), 1e9, { dy: 0 });
    M.draw(dRu, t, wt('D2', 'over') - 0.1, 0.4); M.vis(dRut, t, wt('D2', 'over'), 1e9, { dy: 0 });
    M.vis($('#dP'), t, T0('D6') + 0.2, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tK1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); psol(t, tP1, tPs);
    M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(pA, t, wt('P1', 'two'), 1e9, DOT); M.vis(pAt, t, wt('P1', 'two') + 0.1, 1e9, { dy: 0 }); M.vis(pB, t, wt('P1', 'two') + 0.3, 1e9, DOT); M.vis(pBt, t, wt('P1', 'two') + 0.4, 1e9, { dy: 0 });
    M.draw(pRi, t, wt('P2', 'y') - 0.1, 0.4); M.vis(pRit, t, wt('P2', 'y'), 1e9, { dy: 0 });
    M.draw(pRu, t, wt('P2', 'over') - 0.1, 0.4); M.vis(pRut, t, wt('P2', 'over'), 1e9, { dy: 0 });
    pL.run(t, tPs[1], 0.8);
  }

  /* K + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kpF'), t, tK1 + 0.4, 0.7);
    M.vis(kpD, t, wt('K1', 'one'), 1e9, DOT); M.vis(kpDt, t, wt('K1', 'one') + 0.1, 1e9, { dy: 0 });
    M.draw(kpRu, t, wt('K1', 'slope', 1) - 0.2, 0.3); M.draw(kpRi, t, wt('K1', 'slope', 1), 0.3); M.vis(kpM, t, wt('K1', 'slope', 1) + 0.2, 1e9, { dy: 0 }); kpL.run(t, wt('K1', 'slope', 1) + 0.3, 0.7);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#knF'), t, T0('K2') + 0.2, 0.7);
    M.vis(knA, t, wt('K2', 'needs'), 1e9, DOT); M.vis(knB, t, wt('K2', 'needs') + 0.2, 1e9, DOT); M.vis(knT, t, wt('K2', 'points'), 1e9, { dy: 0 }); knL.run(t, wt('K2', 'finds'), 0.7);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'One') });
  }

  /* statement */
  const stOn = t >= tT && t < tV1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tV1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'minus') - 0.4, 0.9);
  }

  /* V + think */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V3');
    M.vis($('#vv'), t, tV1 + 0.3, out, { dx: -60, dy: 0, ...o }); vvL.run(t, wt('V1', 'vertical') - 0.1, 0.7);
    vvD.forEach((d, i) => { M.vis(d, t, wt('V2', 'same') + i * 0.15, 1e9, DOT); M.vis(vvT[i], t, wt('V2', 'same') + i * 0.15 + 0.1, 1e9, { dy: 0 }); });
    PUC.write($('#vvF'), t, wt('V2', 'rule') - 0.1, 0.5); M.vis($('#vvP'), t, wt('V2', 'number') - 0.1, 1e9, POP);
    M.vis($('#vh'), t, wt('V2', 'horizontal') - 0.2, out, { dx: 60, dy: 0, ...o }); vhL.run(t, wt('V2', 'horizontal'), 0.7);
    vhD.forEach((d, i) => { M.vis(d, t, wt('V2', 'rule', 1) + i * 0.15, 1e9, DOT); M.vis(vhT[i], t, wt('V2', 'rule', 1) + i * 0.15 + 0.1, 1e9, { dy: 0 }); });
    PUC.write($('#vhF'), t, wt('V2', 'rule', 1), 0.5); M.vis($('#vhP'), t, wt('V2', 'number', 1) - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tV3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'What') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wA, t, wt('W2', 'one'), 1e9, DOT); M.vis(wAt, t, wt('W2', 'one') + 0.1, 1e9, { dy: 0 }); M.vis(wB, t, wt('W2', 'three'), 1e9, DOT); M.vis(wBt, t, wt('W2', 'three') + 0.1, 1e9, { dy: 0 });
    M.draw(wRi, t, wt('W3', 'five') - 0.1, 0.4); M.vis(wRit, t, wt('W3', 'Six'), 1e9, { dy: 0 }); M.draw(wRu, t, wt('W3', 'over') + 0.3, 0.4); M.vis(wRut, t, wt('W3', 'Six') + 0.2, 1e9, { dy: 0 });
    wL.run(t, tWs[1], 0.8); M.vis(wEq, t, wt('W5', 'That'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'zero') - 0.1, tRight: wt('X3', 'right') - 0.1 });
    M.vis(tA, t, wt('X2', 'minus'), 1e9, DOT); M.vis(tAt, t, wt('X2', 'minus') + 0.1, 1e9, { dy: 0 });
    M.vis(tB, t, wt('X2', 'two', 1), 1e9, DOT); M.vis(tBt, t, wt('X2', 'two', 1) + 0.1, 1e9, { dy: 0 }); tW.run(t, wt('X2', 'two', 1) + 0.2, 0.5);
    tW.el.style.opacity = (1 - 0.65 * M.io((t - wt('X3', 'right')) / 0.4)).toFixed(3);
    tR.run(t, wt('X3', 'right'), 0.5);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'find') });
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
