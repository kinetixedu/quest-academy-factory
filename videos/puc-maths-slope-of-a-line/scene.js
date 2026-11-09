// PUC Maths Ep 69: Slope of a line (Proof board)
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

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tI1 = T0('I1'), tL1 = T0('L1'), tD1 = T0('D1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tV1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ROAD 1', 'up 3 m per 10 m'], ['ROAD 2', 'up 1 m per 2 m'], ['STEEPER?', 'one number']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Road'), wt('H2', 'Road'), wt('H2', 'steeper')];

/* ---------- H: two roads, drawn to scale (50 px per metre) ---------- */
const hs = $('#hS');
const road = (y0, run, rise, name, tR) => { const x0 = 120, s = 50, x1 = x0 + run * s, y1 = y0 - rise * s;
  const hill = mk(hs, 'path', { d: `M${x0},${y0} L${x1},${y0} L${x1},${y1} Z`, fill: '#EEF0F4' });
  const rd = mk(hs, 'line', { x1: x0, y1: y0, x2: x1, y2: y1, stroke: RC, 'stroke-width': 7, 'stroke-linecap': 'round' });
  const ru = mk(hs, 'line', { x1: x0, y1: y0, x2: x1, y2: y0, stroke: XC, 'stroke-width': 4 }), ri = mk(hs, 'line', { x1: x1, y1: y0, x2: x1, y2: y1, stroke: YC, 'stroke-width': 4 });
  const nm = txt(hs, 40, y0 - 4, name, { fill: C.ink, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins' });
  const lr = txt(hs, (x0 + x1) / 2, y0 + 32, `run ${run} m`, { ...LAB, 'text-anchor': 'middle', fill: XC }), li = txt(hs, x1 + 14, (y0 + y1) / 2 + 7, `rise ${rise} m`, { ...LAB, fill: YC });
  return { hill, rd, ru, ri, nm, lr, li, tR }; };
const R1 = road(270, 10, 3, 'ROAD 1', wt('H1', 'rises')), R2 = road(450, 2, 1, 'ROAD 2', wt('H2', 'rises'));
const hQ = txt(hs, 470, 420, '?', { fill: C.red, 'font-weight': 700, 'font-size': 72, 'font-family': 'Poppins', 'text-anchor': 'middle' });

/* ---------- I: rise and run ---------- */
$('#i0').innerHTML = `On a ramp you go <span class="x">across</span> and you go <span class="y">up</span>.`;
$('#i1').innerHTML = `<span class="x">run</span> = across &nbsp;·&nbsp; <span class="y">rise</span> = up`;
$('#i2').innerHTML = K(`${rc('\\text{slope}')} = \\dfrac{${yc('\\text{rise}')}}{${xc('\\text{run}')}}`);
$('#i3').innerHTML = `Road 1: <span class="y">3</span> ÷ <span class="x">10</span> = <span class="a">0.3</span>`;
$('#i4').innerHTML = `Road 2: <span class="y">1</span> ÷ <span class="x">2</span> &nbsp;= <span class="a">0.5</span>`;
const IO = { ox: 110, oy: 470, s: 52, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
const is = $('#iS'), IP = PL(is, IO);
const iL1 = fline(is, IP, 0, 0, 10, 3), iL2 = fline(is, IP, 0, 0, 10, 5);
const iRun = seg(is, IP, 0, 0, 10, 0, XC, 6), iRise = seg(is, IP, 10, 0, 10, 3, YC, 6), iRise2 = seg(is, IP, 10, 3, 10, 5, YC, 6, '10 7');
const iRunT = txt(is, IP.X(5), IP.Y(0) - 14, 'run 10', { ...LAB, 'text-anchor': 'middle', fill: XC }), iRiseT = txt(is, IP.X(10) + 12, IP.Y(1.5) + 7, 'rise 3', { ...LAB, fill: YC });
const iSt = mk(is, 'path', { d: `M${IP.X(4)},${IP.Y(1.2)} H${IP.X(5)} V${IP.Y(1.5)}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const iStT = txt(is, IP.X(5) + 10, IP.Y(1.2) + 24, '1 across: 0.3 up', { ...LAB, fill: C.ink });
const iM1 = txt(is, IP.X(6.4), IP.Y(1.2) + 8, 'm = 0.3', { fill: RC, 'font-weight': 700, 'font-size': 24 });
const iM2 = txt(is, IP.X(3.2), IP.Y(3.3), 'm = 0.5', { fill: RC, 'font-weight': 700, 'font-size': 24 });
const iRiseT2 = txt(is, IP.X(10) + 12, IP.Y(4) + 7, 'rise 5', { ...LAB, fill: YC });

/* ---------- L: live, turn the line ---------- */
$('#lF').innerHTML = K(`${rc('m')} = \\tan ${tc('\\theta')} = \\dfrac{${yc('\\text{rise}')}}{${xc('\\text{run}')}}`);
const LO = { ox: 392, oy: 320, s: 46, x0: -6, x1: 6, y0: -4, y1: 4 };
const ls = $('#lS'), LP = PL(ls, LO);
const cp = mk(mk(ls, 'defs', {}), 'clipPath', { id: 'lclip' }); mk(cp, 'rect', { x: LP.X(-6), y: LP.Y(4), width: LO.s * 12, height: LO.s * 8 });
const lTri = mk(ls, 'g', { 'clip-path': 'url(#lclip)' });
const lRun = mk(lTri, 'line', { stroke: XC, 'stroke-width': 6, 'stroke-linecap': 'round' }), lRise = mk(lTri, 'line', { stroke: YC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const lLn = mk(ls, 'line', { stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const lArc = mk(ls, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 });
const lArT = txt(ls, 0, 0, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic', 'text-anchor': 'middle' });
const lRunT = txt(ls, LP.X(1.5), LP.Y(0) + 44, 'run', { ...LAB, 'text-anchor': 'middle', fill: XC }), lRiseT = txt(ls, 0, 0, 'rise', { ...LAB, fill: YC });
const lZero = txt(ls, LP.X(0) + 16, LP.Y(3.2), 'run = 0', { fill: C.red, 'font-weight': 700, 'font-size': 22 });
const lO = dotG(ls, LP.X(0), LP.Y(0), 8, C.ink);
const thK = ramp(30, [[wt('L3', 'zero') - 0.2, 0, 0.9], [wt('L4', 'tips'), 45, 2.2], [wt('L5', 'Near'), 75, 1.6], [wt('L5', 'Ten') - 0.25, 84.29, 0.4], [wt('L5', 'Twenty') - 0.25, 87.14, 0.4], [wt('L5', 'hundred') - 0.3, 89.43, 0.4], [wt('L5', 'ninety', 1) - 0.2, 90, 0.4], [wt('L7', 'Past') + 0.1, 150, 1.6], [wt('L8', 'right') - 0.2, 40, 1.4]]);
const stTxt = th => th < 0.3 ? ['FLAT · NO RISE', C.soft, C.ink] : Math.abs(th - 90) < 0.3 ? ['STANDING UP · NOT DEFINED', C.redBg, C.red] : th < 90 ? ['RISING · m > 0', C.okBg, '#1F6B3F'] : ['FALLING · m < 0', C.ac2, '#A63A1C'];
let lLast = '';
const HIS = [['0°', '0', 'L3', 'zero'], ['45°', '1', 'L4', 'forty'], ['90°', 'none', 'L6', 'not'], ['150°', '−0.58', 'L7', 'negative']];
$('#lH').innerHTML = HIS.map(([a, b], i) => `<div class="hc" id="lh${i}" style="left:${36 + i * 176}px"><b>${a}</b> → ${b}</div>`).join('');

/* ---------- D: slope from two points ---------- */
const dsol = PUC.solution($('#dl'), [
  ['Right triangle: across from P, up to Q'],
  [K(`${xc('\\text{run}')} = ${xc('x_2 - x_1')}`)],
  [K(`${yc('\\text{rise}')} = ${yc('y_2 - y_1')}`)],
  [K(`${rc('m')} = \\dfrac{${yc('y_2 - y_1')}}{${xc('x_2 - x_1')}}`) + '<span class="why2">&nbsp; x₁ ≠ x₂</span>']], { label: 'SLOPE FROM TWO POINTS', y0: 104, dy: 110 });
const tDs = [wt('D2', 'Draw'), wt('D3', 'run'), wt('D4', 'rise'), wt('D5', 'equals')];
const DO = { ox: 100, oy: 490, s: 64, x0: 0, x1: 9, y0: 0, y1: 6, nolab: 1 };
const ds = $('#dS'), DP = PL(ds, DO);
const dLn = fline(ds, DP, 1, 1, 6, 4);
const dRun = seg(ds, DP, 1, 1, 6, 1, XC, 6), dRise = seg(ds, DP, 6, 1, 6, 4, YC, 6);
const dRm = rightMark(ds, DP.X(6), DP.Y(1), -1, -1);
const dP = dotG(ds, DP.X(1), DP.Y(1), 11, C.ink, '#fff'), dQ = dotG(ds, DP.X(6), DP.Y(4), 11, C.ink, '#fff');
const dPt = txt(ds, DP.X(1) - 4, DP.Y(1) + 40, 'P(x₁, y₁)', { fill: C.ink, 'font-weight': 600, 'font-size': 22 }), dQt = txt(ds, DP.X(6) - 14, DP.Y(4) - 22, 'Q(x₂, y₂)', { fill: C.ink, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'end' });
const dRunT = txt(ds, DP.X(4.3), DP.Y(1) + 40, 'x₂ − x₁', { ...LAB, 'font-size': 22, 'text-anchor': 'middle', fill: XC }), dRiseT = txt(ds, DP.X(6) + 16, DP.Y(2.5) + 8, 'y₂ − y₁', { ...LAB, 'font-size': 22, fill: YC });

/* ---------- K: positive vs negative ---------- */
const KO = { ox: 110, oy: 450, s: 54, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
$('#kpF').innerHTML = K(`${rc('m')} = \\frac{${yc('3')}}{${xc('4')}}`); $('#knF').innerHTML = K(`${rc('m')} = \\frac{${yc('-3')}}{${xc('4')}}`);
const kSide = (svg, neg) => { const P = PL(svg, KO); const L = neg ? fline(svg, P, 0, 6, 8, 0) : fline(svg, P, 0, 0, 8, 6);
  const ya = neg ? 4.5 : 1.5, yb = neg ? 1.5 : 4.5;
  const ru = seg(svg, P, 2, ya, 6, ya, XC, 6), ri = seg(svg, P, 6, ya, 6, yb, YC, 6);
  const ruT = txt(svg, P.X(4), P.Y(ya) + (neg ? -14 : 30), 'run 4', { ...LAB, 'text-anchor': 'middle', fill: XC }), riT = txt(svg, P.X(6) + 14, P.Y(3) + 7, neg ? 'rise −3' : 'rise 3', { ...LAB, fill: YC });
  const ax = neg ? 8 : 0, a = arc(svg, P.X(ax), P.Y(0), 40, 0, neg ? 143.13 : 36.87);
  const aT = txt(svg, P.X(ax) + (neg ? -8 : 60), P.Y(0) - (neg ? 52 : 14), 'θ', { fill: TC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
  return { L, ru, ri, ruT, riT, a, aT }; };
const KP = kSide($('#kpS'), 0), KN = kSide($('#knS'), 1);
const th1 = PUC.think($('#th1'), { q: 'A line passes through (2, 5) and (6, 1). Is its slope positive or negative?', opts: ['Positive', 'Negative'], right: 1, why: 'As x grows from 2 to 6, y drops from 5 to 1: rise −4, run 4, slope −1.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${rc('m')} = \\dfrac{${yc('y_2 - y_1')}}{${xc('x_2 - x_1')}} = \\tan ${tc('\\theta')}`);

/* ---------- V: flat vs standing ---------- */
const VO = { ox: 110, oy: 450, s: 54, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
$('#vhF').innerHTML = K(`${rc('m')} = \\frac{${yc('0')}}{${xc('6')}} = 0`); $('#vvF').innerHTML = K(`${rc('m')} = \\frac{${yc('4')}}{${xc('0')}}\\ ${red('?')}`);
const vh = $('#vhS'), VH = PL(vh, VO), vhL = fline(vh, VH, 0, 3, 10, 3);
const vhA = dotG(vh, VH.X(1), VH.Y(3), 11, C.ink, '#fff'), vhB = dotG(vh, VH.X(7), VH.Y(3), 11, C.ink, '#fff');
const vhR = seg(vh, VH, 1, 3.6, 7, 3.6, XC, 4, '8 6'), vhT = txt(vh, VH.X(4), VH.Y(3.6) - 14, 'run 6 · rise 0', { ...LAB, 'text-anchor': 'middle', fill: C.ink2 });
const vv = $('#vvS'), VV = PL(vv, VO), vvL = fline(vv, VV, 4, 0, 4, 6);
const vvA = dotG(vv, VV.X(4), VV.Y(1), 11, C.ink, '#fff'), vvB = dotG(vv, VV.X(4), VV.Y(5), 11, C.ink, '#fff');
const vvR = seg(vv, VV, 4.6, 1, 4.6, 5, YC, 4, '8 6'), vvT = txt(vv, VV.X(4.6) + 14, VV.Y(3) + 7, 'rise 4 · run 0', { ...LAB, fill: C.ink2 });
const th2 = PUC.think($('#th2'), { q: 'A line passes through (3, 1) and (3, 7). What is its slope?', opts: ['0', '6', 'Not defined'], right: 2, why: 'Both points have x = 3: the line stands straight up, so the run is 0.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the slope and inclination of the line through ${K('(-1,\\ 2)')} and ${K('(3,\\ -2)')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${yc('\\text{rise}')} = -2 - 2 = ${yc('-4')}`)],
  [K(`${xc('\\text{run}')} = 3 - (-1) = ${xc('4')}`)],
  [K(`${rc('m')} = \\dfrac{${yc('-4')}}{${xc('4')}} = ${rc('-1')}`)],
  [K(`\\tan ${tc('\\theta')} = -1 \\;\\Rightarrow\\; ${tc('\\theta = 135^\\circ')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 98 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'rise'), wt('W4', 'run'), wt('W5', 'slope'), wt('W6', 'tan')];
const WO = { ox: 288, oy: 354, s: 56, x0: -3, x1: 6, y0: -3, y1: 4 };
const ws = $('#wS'), WP = PL(ws, WO);
const wLn = fline(ws, WP, -1, 2, 3, -2);
const wRun = seg(ws, WP, -1, 2, 3, 2, XC, 6), wRise = seg(ws, WP, 3, 2, 3, -2, YC, 6);
const wA = dotG(ws, WP.X(-1), WP.Y(2), 11, C.ink, '#fff'), wB = dotG(ws, WP.X(3), WP.Y(-2), 11, C.ink, '#fff');
const wAt = txt(ws, WP.X(-1) - 16, WP.Y(2) + 32, '(−1, 2)', { fill: C.ink, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'end' }), wBt = txt(ws, WP.X(3) + 18, WP.Y(-2) + 8, '(3, −2)', { fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const wRunT = txt(ws, WP.X(1), WP.Y(2) - 14, 'run 4', { ...LAB, 'text-anchor': 'middle', fill: XC }), wRiseT = txt(ws, WP.X(3) + 14, WP.Y(0.6), 'rise −4', { ...LAB, fill: YC });
const wArc = arc(ws, WP.X(1), WP.Y(0), 34, 0, 135), wArT = txt(ws, WP.X(1) + 22, WP.Y(0) - 44, '135°', { fill: TC, 'font-weight': 700, 'font-size': 22 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`m = \\frac{8 - 2}{1 - 4} = -2`) + '<span class="why2">&nbsp; top and bottom in different orders</span>', right: K(`m = \\frac{${yc('8 - 2')}}{${xc('4 - 1')}} = ${rc('+2')}`) + '<span class="why2">&nbsp; same order, top and bottom</span>' });
const TO = { ox: 230, oy: 238, s: 22, x0: 0, x1: 6, y0: 0, y1: 9, nolab: 1 };
const ts = $('#tS'), TP = PL(ts, TO); const tLn = fline(ts, TP, 1, 2, 4, 8, RC, 4);
const tA = dotG(ts, TP.X(1), TP.Y(2), 7, C.ink, '#fff', 2), tB = dotG(ts, TP.X(4), TP.Y(8), 7, C.ink, '#fff', 2);
const tAt = txt(ts, TP.X(1) + 12, TP.Y(2) + 6, '(1, 2)', { fill: C.ink, 'font-weight': 600, 'font-size': 16 }), tBt = txt(ts, TP.X(4) + 12, TP.Y(8) + 6, '(4, 8)', { fill: C.ink, 'font-weight': 600, 'font-size': 16 });
const tUp = txt(ts, TP.X(4.6), TP.Y(4.4), 'goes up: m > 0', { fill: C.ok, 'font-weight': 600, 'font-size': 18 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find a missing coordinate from the slope of a line through two points.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `The line through ${K('A(k,\\ 3)')} and ${K('B(4,\\ 2k)')} makes an angle of ${K('135^\\circ')} with the positive <span style="white-space:nowrap">x-axis</span>. Then k =`,
  opts: [K('7/3'), K('-1'), K('1'), K('-7/3')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${rc('m')} = \\tan 135^\\circ = -1`)], [K(`${rc('m')} = \\dfrac{${yc('2k - 3')}}{${xc('4 - k')}}`)], [K(`2k - 3 = k - 4`)], [K(`k = -1`)], [K(`\\text{check: } \\tfrac{-2 - 3}{4 + 1} = -1`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'tan'), wt('A3', 'From'), wt('A4', 'So'), wt('A4', 'and'), wt('A4', 'Check')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 236, w: 1320, h: 524, title: 'Recap · slope of a line', y0: 96, dy: 86, txt: [1, 0, 0, 1, 1],
  lines: ['<b>Slope</b> m = rise ÷ run: how far up for one step across',
    K(`${rc('m')} = \\dfrac{${yc('y_2 - y_1')}}{${xc('x_2 - x_1')}}, \\quad ${xc('x_1')} \\ne ${xc('x_2')}`),
    K(`${rc('m')} = \\tan ${tc('\\theta')}, \\quad ${tc('\\theta')} \\ne 90^\\circ`),
    '<b>Up</b> to the right: m &gt; 0 &nbsp;·&nbsp; <b>down</b> to the right: m &lt; 0',
    '<b>Flat</b> line: m = 0 &nbsp;·&nbsp; <b>standing</b> line: not defined'] });
const YQ = ['What is the slope of a line that goes up 3 for every 2 across?', 'Why is the slope of the y-axis not defined?', 'A line has inclination 60°. What is its slope?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 70', topic: 'Never meet, or cross square? Parallel and Perpendicular Lines', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L5', 'Near') - 0.3, 1.05, 960, 560], [T0('L6') + 0.6, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tI1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('I1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    [R1, R2].forEach((r, i) => { const t0 = tMorph + 0.3 + i * 0.5;
      M.vis(r.hill, t, t0, 1e9, { dy: 0, fade: 0.3 }); M.vis(r.nm, t, t0, 1e9, { dy: 0 }); M.draw(r.rd, t, t0 + 0.1, 0.6);
      M.draw(r.ru, t, t0 + 0.4, 0.4); M.draw(r.ri, t, t0 + 0.6, 0.3); M.vis(r.lr, t, t0 + 0.5, 1e9, { dy: 0 }); M.vis(r.li, t, t0 + 0.7, 1e9, { dy: 0 }); });
    M.vis(hQ, t, wt('H4', 'looking'), 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hG'), t, tMorph + 1.2, 1e9, { dy: 0 });
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'one') - 0.1, 1e9, POP);
  }

  /* I */
  const iOn = t >= tI1 - 0.1 && t < tL1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('L1');
    M.vis($('#il'), t, tI1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#i0'), t, tI1 + 0.2, { st: 0.04 });
    M.vis($('#i1'), t, wt('I2', 'run') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#i2'), t, wt('I3', 'Slope') - 0.05, 0.8);
    PUC.write($('#i3'), t, wt('I4', 'Three') - 0.1, 0.9); PUC.write($('#i4'), t, wt('I5', 'One') - 0.1, 0.9);
    M.vis($('#iP'), t, wt('I5', 'Bigger') - 0.1, 1e9, POP);
    M.vis($('#ir'), t, tI1 + 0.3, out, { dx: 60, dy: 0, ...o });
    iL1.run(t, wt('I1', 'ramp') - 0.1, 0.8);
    M.draw(iRun, t, wt('I2', 'across') - 0.1, 0.5); M.vis(iRunT, t, wt('I2', 'run') - 0.1, 1e9, { dy: 0 });
    M.draw(iRise, t, wt('I2', 'height') - 0.1, 0.4); M.vis(iRiseT, t, wt('I2', 'rise') - 0.1, 1e9, { dy: 0 });
    const st = M.vis(iSt, t, wt('I3', 'every') - 0.1, wt('I4', 'Road'), { dy: 0 }); M.vis(iStT, t, wt('I3', 'every'), wt('I4', 'Road'), { dy: 0 });
    M.vis(iM1, t, wt('I4', 'zero'), 1e9, POP);
    iL2.run(t, wt('I5', 'Road'), 0.8); M.draw(iRise2, t, wt('I5', 'divided'), 0.4); M.vis(iRiseT2, t, wt('I5', 'divided') + 0.1, 1e9, { dy: 0 });
    M.vis(iM2, t, wt('I5', 'zero'), 1e9, POP);
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const th = thK(t), r = th * Math.PI / 180, cs = Math.cos(r), sn = Math.sin(r);
    const S = LP.clip(0, 0, cs, sn), u = M.io((t - tL1 - 0.5) / 0.8);
    if (S) { const [p, q] = S, mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, hl = 0.5 * u;
      attr(lLn, 'x1', LP.X(mx + (p[0] - mx) * u).toFixed(1)); attr(lLn, 'y1', LP.Y(my + (p[1] - my) * u).toFixed(1)); attr(lLn, 'x2', LP.X(mx + (q[0] - mx) * u).toFixed(1)); attr(lLn, 'y2', LP.Y(my + (q[1] - my) * u).toFixed(1)); }
    M.hide(lLn, u <= 0); M.vis(lO, t, tL1 + 0.5, 1e9, DOT);
    const arcOn = t >= wt('L2', 'angle') - 0.1;
    attr(lArc, 'd', arcD(LP.X(0), LP.Y(0), 42, 0, Math.max(0.01, th))); M.hide(lArc, !arcOn || th < 0.5);
    attr(lArT, 'x', (LP.X(0) + 68 * Math.cos(r / 2)).toFixed(1)); attr(lArT, 'y', (LP.Y(0) - 68 * Math.sin(r / 2) + 8).toFixed(1)); M.hide(lArT, !arcOn || th < 4);
    const triOn = t >= wt('L3', 'flat') && Math.abs(th - 90) > 0.6, tn = Math.tan(r), rh = 3 * tn;
    attr(lRun, 'x1', LP.X(0)); attr(lRun, 'y1', LP.Y(0)); attr(lRun, 'x2', LP.X(3)); attr(lRun, 'y2', LP.Y(0));
    attr(lRise, 'x1', LP.X(3)); attr(lRise, 'y1', LP.Y(0)); attr(lRise, 'x2', LP.X(3)); attr(lRise, 'y2', LP.Y(M.clamp(rh, -5, 5)).toFixed(1));
    M.hide(lTri, !triOn); M.hide(lRunT, !triOn); M.hide(lRiseT, !triOn || Math.abs(rh) < 0.3);
    attr(lRiseT, 'x', LP.X(3) + 12); attr(lRunT, 'y', (LP.Y(0) + (rh < 0 ? -16 : 54)).toFixed(1)); attr(lRiseT, 'y', (LP.Y(M.clamp(rh / 2, -3.6, 3.6)) + 7).toFixed(1));
    M.vis(lZero, t, T0('L6'), wt('L7', 'Past') + 0.1, { dy: 0 });
    M.vis($('#lT'), t, wt('L2', 'angle'), 1e9, { dy: 12 }); M.setT($('#lTv'), String(Math.round(th)));
    M.vis($('#lM'), t, wt('L3', 'Slope') - 0.2, 1e9, { dy: 12 });
    const und = Math.abs(th - 90) < 0.3, mv = und ? 'not defined' : (Math.abs(tn) < 0.005 ? '0' : tn.toFixed(2));
    M.setT($('#lMv'), mv); $('#lMv').style.color = und ? C.red : '';
    const [sl, bg, fg] = stTxt(th); if (sl !== lLast) { lLast = sl; M.setT($('#lSt'), sl); $('#lSt').style.background = bg; $('#lSt').style.color = fg; }
    M.vis($('#lSt'), t, wt('L3', 'flat'), 1e9, POP);
    HIS.forEach(([, , id, w], i) => M.vis($('#lh' + i), t, wt(id, w) + 0.2, 1e9, POP));
    PUC.write($('#lF'), t, wt('L8', 'So') - 0.1, 0.8);
    M.vis($('#lW'), t, wt('L2', 'anticlockwise') - 0.1, 1e9, { dy: 8 });
  }

  /* D: two points */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    dLn.run(t, tD1 + 0.4, 0.8);
    M.vis(dP, t, wt('D1', 7), 1e9, DOT); M.vis(dPt, t, wt('D1', 7) + 0.1, 1e9, { dy: 0 });
    M.vis(dQ, t, wt('D1', 13), 1e9, DOT); M.vis(dQt, t, wt('D1', 13) + 0.1, 1e9, { dy: 0 });
    M.draw(dRun, t, wt('D2', 'across'), 0.5); M.draw(dRise, t, wt('D2', 'up'), 0.4); M.vis(dRm, t, wt('D2', 'up') + 0.3, 1e9, { dy: 0 });
    M.vis(dRunT, t, tDs[1], 1e9, { dy: 0 }); M.vis(dRiseT, t, tDs[2], 1e9, { dy: 0 });
    const h1 = M.io((t - tDs[1]) / 0.3) * (1 - M.io((t - tDs[2]) / 0.3)), h2 = M.io((t - tDs[2]) / 0.3) * (1 - M.io((t - tDs[3] - 0.8) / 0.3));
    attr(dRun, 'stroke-width', (6 + 4 * h1).toFixed(2)); attr(dRise, 'stroke-width', (6 + 4 * h2).toFixed(2));
  }

  /* K: up vs down + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    [[$('#kp'), $('#kpF'), $('#kpP'), KP, 'K1', tK1 + 0.05], [$('#kn'), $('#knF'), $('#knP'), KN, 'K2', T0('K2') - 0.1]].forEach(([c, f, p, S, id, t0]) => {
      M.vis(c, t, t0, out, { dx: c.id === 'kp' ? -60 : 60, dy: 0, ...o });
      S.L.run(t, wt(id, 'goes') - 0.1, 0.7); M.draw(S.ru, t, wt(id, 'rise') - 0.3, 0.4); M.draw(S.ri, t, wt(id, 'rise') - 0.05, 0.4);
      M.vis(S.ruT, t, wt(id, 'rise') - 0.2, 1e9, { dy: 0 }); M.vis(S.riT, t, wt(id, 'rise'), 1e9, { dy: 0 });
      PUC.write(f, t, wt(id, 'slope') - 0.1, 0.5);
      M.draw(S.a, t, wt(id, 'Theta') - 0.1, 0.5); M.vis(S.aT, t, wt(id, 'Theta'), 1e9, { dy: 0 });
      M.vis(p, t, wt(id, 'than') - 0.1, 1e9, POP); });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'positive') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'As') });
  }

  /* statement */
  const stOn = t >= tT && t < tV1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tV1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Slope') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Going') - 0.2, 0.8);
  }

  /* V: flat vs standing + think */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V3');
    M.vis($('#vh'), t, tV1 + 0.3, out, { dx: -60, dy: 0, ...o }); vhL.run(t, wt('V1', 'flat') - 0.1, 0.7);
    M.vis(vhA, t, wt('V1', 'axis'), 1e9, DOT); M.vis(vhB, t, wt('V1', 'axis') + 0.15, 1e9, DOT);
    M.draw(vhR, t, wt('V1', 'rise') - 0.2, 0.5); M.vis(vhT, t, wt('V1', 'rise'), 1e9, { dy: 0 });
    PUC.write($('#vhF'), t, wt('V1', 'So') - 0.1, 0.6); M.vis($('#vhP'), t, wt('V1', 'zero', 1) - 0.1, 1e9, POP);
    M.vis($('#vv'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o }); vvL.run(t, wt('V2', 'standing') - 0.1, 0.7);
    M.vis(vvA, t, wt('V2', 'axis'), 1e9, DOT); M.vis(vvB, t, wt('V2', 'axis') + 0.15, 1e9, DOT);
    M.draw(vvR, t, wt('V2', 'run') - 0.2, 0.5); M.vis(vvT, t, wt('V2', 'run'), 1e9, { dy: 0 });
    PUC.write($('#vvF'), t, wt('V2', 'So') - 0.1, 0.6); M.vis($('#vvP'), t, wt('V2', 'not') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tV3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'What') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wA, t, wt('W2', 'minus'), 1e9, DOT); M.vis(wAt, t, wt('W2', 'minus') + 0.1, 1e9, { dy: 0 });
    M.vis(wB, t, wt('W2', 'three'), 1e9, DOT); M.vis(wBt, t, wt('W2', 'three') + 0.1, 1e9, { dy: 0 });
    M.draw(wRise, t, tWs[0], 0.5); M.vis(wRiseT, t, tWs[0] + 0.4, 1e9, { dy: 0 });
    M.draw(wRun, t, tWs[1], 0.5); M.vis(wRunT, t, tWs[1] + 0.4, 1e9, { dy: 0 });
    wLn.run(t, tWs[2], 0.8);
    M.draw(wArc, t, tWs[3] + 0.2, 0.6); M.vis(wArT, t, wt('W6', 'hundred'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'order') - 0.1, tRight: wt('X3', 'Six') - 0.1 });
    M.vis(tA, t, wt('X2', 'one'), 1e9, DOT); M.vis(tAt, t, wt('X2', 'one'), 1e9, { dy: 0 }); M.vis(tB, t, wt('X2', 'four'), 1e9, DOT); M.vis(tBt, t, wt('X2', 'four'), 1e9, { dy: 0 });
    tLn.run(t, wt('X2', 'eight') + 0.2, 0.6); M.vis(tUp, t, wt('X3', 'clearly') - 0.1, 1e9, { dy: 0 });
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
