// PUC Maths Ep 72: Slope-intercept and intercept forms of a line (Proof board)
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
// Ep 72 colours: x and the x-intercept a violet, y and the y-intercept c (or b) blue, slope m and the line coral
const X_ = xc('x'), Y_ = yc('y'), M_ = rc('m'), C_ = yc('c'), A_ = xc('a'), B_ = yc('b');
const SIF = `${Y_} = ${M_}${X_} + ${C_}`, ICF = `\\dfrac{${X_}}{${A_}} + \\dfrac{${Y_}}{${B_}} = 1`;
const lbl = (svg, x, y, s, col, a = {}) => txt(svg, x, y, s, Object.assign({ fill: col, 'font-weight': 600, 'font-size': 20 }, a));
const ring = (svg, x, y, col) => mk(svg, 'circle', { cx: x, cy: y, r: 18, fill: 'none', stroke: col, 'stroke-width': 3.5 });
const fmt = v => (Math.abs(v) < 0.005 ? '0.0' : v.toFixed(1)).replace('-', '−');

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tI1 = T0('I1'), tL1 = T0('L1'), tD1 = T0('D1'), tB1 = T0('B1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tR1 = T0('R1'), tR3 = T0('R3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['MAIN STREET 1', 'east to west'], ['MAIN STREET 2', 'north to south'], ['NEW ROAD', 'crosses where?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'two'), wt('H1', 'crossing'), wt('H2', 'new')];

/* ---------- H: town map ---------- */
const HO = { ox: 390, oy: 334, s: 56, x0: -5, x1: 6, y0: -3, y1: 4, nolab: 1 };
const hs = $('#hS');
const hSt = [mk(hs, 'rect', { x: 390 - 5 * 56, y: 334 - 16, width: 11 * 56, height: 32, fill: '#E3E6EC', rx: 6 }), mk(hs, 'rect', { x: 390 - 16, y: 334 - 4 * 56, width: 32, height: 7 * 56, fill: '#E3E6EC', rx: 6 })];
const HP = PL(hs, HO);
const hRd = fline(hs, HP, 0, 2.4, 4, 0, RC, 8);
const hR = [ring(hs, HP.X(4), HP.Y(0), C.red), ring(hs, HP.X(0), HP.Y(2.4), C.red)];
const hT = [lbl(hs, HP.X(-4.8), HP.Y(0) - 26, 'EAST-WEST STREET', C.ink2, { 'font-size': 16, 'letter-spacing': 1 }), lbl(hs, HP.X(0) + 24, HP.Y(3.8), 'NORTH-SOUTH STREET', C.ink2, { 'font-size': 16, 'letter-spacing': 1 })];
const hC = lbl(hs, HP.X(0) - 22, HP.Y(0) + 34, 'centre', C.mute, { 'text-anchor': 'end', 'font-size': 18 });
const hQ = [lbl(hs, HP.X(4) + 14, HP.Y(0) + 46, '?', C.red, { 'font-size': 30, 'font-family': 'Poppins', 'font-weight': 700 }), lbl(hs, HP.X(0) + 26, HP.Y(2.4) - 18, '?', C.red, { 'font-size': 30, 'font-family': 'Poppins', 'font-weight': 700 })];

/* ---------- I: intercepts ---------- */
$('#i1').innerHTML = `<span class="y">y-intercept c</span>: crosses at (0, <span class="y">c</span>)`;
$('#i2').innerHTML = `<span class="x">x-intercept a</span>: crosses at (<span class="x">a</span>, 0)`;
const IO = { ox: 300, oy: 380, s: 56, x0: -3, x1: 7, y0: -3, y1: 4 };
const is = $('#iS'), IP = PL(is, IO);
const iL = fline(is, IP, 0, 3, 4, 0);
const iC = dotG(is, IP.X(0), IP.Y(3), 12, YC, '#fff'), iCt = lbl(is, IP.X(0) + 18, IP.Y(3) - 14, '(0, c)', YC, { 'font-size': 22 });
const iA = dotG(is, IP.X(4), IP.Y(0), 12, XC, '#fff'), iAt = lbl(is, IP.X(4) + 10, IP.Y(0) - 18, '(a, 0)', XC, { 'font-size': 22 });
const iL2 = fline(is, IP, 0, -2, 2, -1, C.dim, 4); attr(iL2.el, 'stroke-dasharray', '10 8');
const iN = dotG(is, IP.X(0), IP.Y(-2), 10, YC, '#fff'), iNt = lbl(is, IP.X(0) + 16, IP.Y(-2) + 30, 'c = −2', YC);

/* ---------- L: live ---------- */
$('#lF').innerHTML = K(SIF);
const LO = { ox: 392, oy: 320, s: 46, x0: -6, x1: 6, y0: -4, y1: 4 };
const ls = $('#lSv'), LP = PL(ls, LO);
const lLn = mk(ls, 'line', { stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const lDg = mk(ls, 'g', {}), lD = mk(lDg, 'g', {}); mk(lD, 'circle', { r: 12, fill: YC, stroke: '#fff', 'stroke-width': 3 });
const lDt = lbl(ls, 0, 0, '(0, c)', YC, { 'font-size': 22, 'text-anchor': 'end' });
const cK = ramp(-2, [[wt('L2', 'Minus') - 0.2, -1, 0.5], [wt('L2', 'Zero') - 0.2, 0, 0.5], [wt('L2', 'One') - 0.2, 1, 0.5], [wt('L2', 'Two') - 0.2, 2, 0.5], [wt('L4', 'hold') - 0.1, 1, 0.8]]);
const mK = ramp(0.5, [[wt('L5', 'Steeper') - 0.3, 2.5, 0.8], [wt('L5', 'Flatter') - 0.3, 0.15, 0.8], [wt('L5', 'downhill') - 0.3, -1, 0.9], [wt('L6', 'So'), 0.5, 0.9]]);
let lLast = '';

/* ---------- D: slope-intercept derivation ---------- */
const dsol = PUC.solution($('#dl'), [
  ['Through ' + K(`(0,\\ ${C_})`) + ' with slope ' + K(M_)],
  [K(`${Y_} - ${C_} = ${M_}\\,(${X_} - 0)`)],
  [K(`${Y_} - ${C_} = ${M_}${X_}`)],
  [K(SIF)]], { label: 'THE SLOPE-INTERCEPT FORM', y0: 104, dy: 104 });
const tDs = [wt('D2', 'passes'), wt('D3', 'Point'), wt('D4', 'just'), wt('D5', 'Add')];
const DO = { ox: 110, oy: 470, s: 62, x0: 0, x1: 9, y0: 0, y1: 6, nolab: 1 };
const ds = $('#dS'), DP = PL(ds, DO);
const dL = fline(ds, DP, 0, 2, 4, 4);
const dRu = seg(ds, DP, 3, 3.5, 6, 3.5, XC, 5), dRi = seg(ds, DP, 6, 3.5, 6, 5, YC, 5), dM = lbl(ds, DP.X(6) + 12, DP.Y(4.25) + 7, 'slope m', RC, { 'font-weight': 700 });
const dC = dotG(ds, DP.X(0), DP.Y(2), 12, YC, '#fff'), dCt = lbl(ds, DP.X(0) + 18, DP.Y(2) + 32, '(0, c)', YC, { 'font-size': 22 });

/* ---------- B: intercept form derivation ---------- */
const bsol = PUC.solution($('#bl'), [
  [K(`${M_} = \\dfrac{${B_} - 0}{0 - ${A_}} = -\\dfrac{${B_}}{${A_}}`)],
  [K(`${Y_} = -\\dfrac{${B_}}{${A_}}\\,${X_} + ${B_}`)],
  [K(`\\dfrac{${Y_}}{${B_}} = -\\dfrac{${X_}}{${A_}} + 1`)],
  [K(ICF)]], { label: 'THE INTERCEPT FORM', y0: 104, dy: 112 });
const tBs = [wt('B2', 'slope'), wt('B3', 'Slope'), wt('B4', 'Divide'), wt('B5', 'over')];
const bs = $('#bS'), BP = PL(bs, DO);
const bL = fline(bs, BP, 6, 0, 0, 4);
const bA = dotG(bs, BP.X(6), BP.Y(0), 12, XC, '#fff'), bAt = lbl(bs, BP.X(6) + 8, BP.Y(0) - 20, '(a, 0)', XC, { 'font-size': 22 });
const bB = dotG(bs, BP.X(0), BP.Y(4), 12, YC, '#fff'), bBt = lbl(bs, BP.X(0) + 18, BP.Y(4) - 16, '(0, b)', YC, { 'font-size': 22 });

/* ---------- K: side by side ---------- */
$('#kpF').innerHTML = K(SIF); $('#knF').innerHTML = K(ICF);
const KO = { ox: 110, oy: 500, s: 50, x0: 0, x1: 10, y0: 0, y1: 5, lab: 2 };
const kp = $('#kpS'), KP = PL(kp, KO), kpL = fline(kp, KP, 0, 1, 2, 2);
const kpC = dotG(kp, KP.X(0), KP.Y(1), 11, YC, '#fff'), kpCt = lbl(kp, KP.X(0) + 16, KP.Y(1) + 30, 'c', YC, { 'font-size': 24, 'font-style': 'italic', 'font-family': 'Poppins' });
const kpRu = seg(kp, KP, 4, 3, 6, 3, XC, 5), kpRi = seg(kp, KP, 6, 3, 6, 4, YC, 5), kpM = lbl(kp, KP.X(6) + 12, KP.Y(3.5) + 7, 'slope m', RC, { 'font-weight': 700 });
const kn = $('#knS'), KN = PL(kn, KO), knL = fline(kn, KN, 8, 0, 0, 4);
const knA = dotG(kn, KN.X(8), KN.Y(0), 11, XC, '#fff'), knAt = lbl(kn, KN.X(8) + 6, KN.Y(0) - 18, 'a', XC, { 'font-size': 24, 'font-style': 'italic', 'font-family': 'Poppins' });
const knB = dotG(kn, KN.X(0), KN.Y(4), 11, YC, '#fff'), knBt = lbl(kn, KN.X(0) + 18, KN.Y(4) - 12, 'b', YC, { 'font-size': 24, 'font-style': 'italic', 'font-family': 'Poppins' });
const th1 = PUC.think($('#th1'), { q: `${K('\\tfrac{x}{3} + \\tfrac{y}{4} = 1')}: where does the line cross the y-axis?`, opts: [K('(0,\\ 3)'), K('(0,\\ 4)'), K('(0,\\ 1)')], right: 1, why: 'In intercept form the number under y is the y-intercept: b = 4.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${SIF} \\qquad ${ICF}`);

/* ---------- R: get y alone ---------- */
$('#r0').innerHTML = K(`2${Y_} = 4${X_} + 6`); $('#r2').innerHTML = K(`${Y_} = ${rc('2')}${X_} + ${yc('3')}`);
$('#rP').innerHTML = K(`${M_} = 2, \\quad ${C_} = 3`);
const RO = { ox: 392, oy: 450, s: 46, x0: -6, x1: 6, y0: -2, y1: 7 };
const rs = $('#rS'), RP = PL(rs, RO), rL = fline(rs, RP, -2, -1, 1, 5);
const rC = dotG(rs, RP.X(0), RP.Y(3), 11, YC, '#fff'), rCt = lbl(rs, RP.X(0) + 18, RP.Y(3) + 8, '(0, 3)', YC, { 'font-size': 22 });
const th2 = PUC.think($('#th2'), { q: `${K('3y = 6x - 9')}: what is the y-intercept?`, opts: [K('-9'), K('3'), K('-3')], right: 2, why: 'Divide by 3: y = 2x − 3, so c = −3.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Write ${K(`3${X_} + 2${Y_} = 12`)} in intercept form and in slope-intercept form.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\dfrac{3${X_}}{12} + \\dfrac{2${Y_}}{12} = 1`)],
  [K(`\\dfrac{${X_}}{${xc('4')}} + \\dfrac{${Y_}}{${yc('6')}} = 1`)],
  [K(`2${Y_} = -3${X_} + 12`)],
  [K(`${Y_} = ${rc('-\\tfrac{3}{2}')}${X_} + ${yc('6')}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 106 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Divide'), wt('W4', 'Simplify'), wt('W5', 'For'), wt('W6', 'Divide')];
const WO = { ox: 130, oy: 470, s: 56, x0: 0, x1: 8, y0: 0, y1: 6.5 };
const ws = $('#wS'), WP = PL(ws, Object.assign({}, WO, { y1: 6 }));
const wL = fline(ws, WP, 4, 0, 0, 6);
const wA = dotG(ws, WP.X(4), WP.Y(0), 12, XC, '#fff'), wAt = lbl(ws, WP.X(4) + 10, WP.Y(0) - 18, '(4, 0)', XC, { 'font-size': 22 });
const wB = dotG(ws, WP.X(0), WP.Y(6), 12, YC, '#fff'), wBt = lbl(ws, WP.X(0) + 18, WP.Y(6) + 8, '(0, 6)', YC, { 'font-size': 22 });
const wM = lbl(ws, WP.X(2.4) + 14, WP.Y(2.6), 'slope −3/2', RC, { 'font-weight': 700, 'font-size': 22 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\tfrac{x}{2} + \\tfrac{y}{3} = 2 \\;\\Rightarrow\\; \\text{intercepts } 2, 3`), right: K(`\\tfrac{x}{4} + \\tfrac{y}{6} = 1 \\;\\Rightarrow\\; \\text{intercepts } ${xc('4')}, ${yc('6')}`) + '<span class="why2">&nbsp; first make the right side 1</span>' });
const TO = { ox: 230, oy: 240, s: 28, x0: 0, x1: 7, y0: 0, y1: 7, nolab: 1 };
const ts = $('#tS'), TP = PL(ts, TO);
const tW = fline(ts, TP, 2, 0, 0, 3, C.red, 4), tR = fline(ts, TP, 4, 0, 0, 6, C.ok, 4); attr(tW.el, 'stroke-dasharray', '9 7');
const tRt = [lbl(ts, TP.X(4) - 4, TP.Y(0) + 24, '4', XC, { 'font-size': 18 }), lbl(ts, TP.X(0) - 18, TP.Y(6) + 6, '6', YC, { 'font-size': 18 })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find the equation of a line from where it cuts the two axes.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A line through ${K('(2,\\ 3)')} makes equal non-zero intercepts on the coordinate axes. The area of the triangle it forms with the axes is`,
  opts: [K('25'), K('5'), K('25/2'), K('10')], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`a = b:\\ \\tfrac{x}{a} + \\tfrac{y}{a} = 1`)], [K(`x + y = a`)], [K(`(2,\\ 3):\\ a = 5`)], [K(`\\text{area} = \\tfrac{1}{2} \\cdot 5 \\cdot 5 = \\tfrac{25}{2}`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'Equal'), wt('A2', 'That'), wt('A3', 'point'), wt('A4', 'area')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 226, w: 1320, h: 540, title: 'Recap · slope-intercept and intercept forms', y0: 96, dy: 80, txt: [0, 0, 1, 1, 1],
  lines: [K(`\\text{Slope-intercept: } ${SIF}`), K(`\\text{Intercept form: } ${ICF}`),
    '<b>c</b>: crossing at (0, c) &nbsp;·&nbsp; <b>a</b>, <b>b</b>: crossings at (a, 0) and (0, b)',
    '<b>First</b> get y alone: 2y = 4x + 6 becomes y = 2x + 3',
    '<b>Trap</b>: intercept form needs 1 on the right side'] });
[...document.querySelectorAll('#sF .fcard .fl')].forEach((e, i) => { if (i === 1) e.style.top = (parseFloat(e.style.top) + 10) + 'px'; if (i >= 2) e.style.top = (parseFloat(e.style.top) + 40) + 'px'; });
const YQ = ['What is the y-intercept of y = 4x − 7?', 'Where does x/5 + y/2 = 1 cross the x-axis?', 'Why can a line through the origin not be written in intercept form?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 73', topic: 'The shortest walk to the road: Distance of a Point from a Line', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L5'), 1.05, 960, 560], [T0('L6') + 0.6, 1, 960, 540]]);

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
    hSt.forEach((s, i) => M.vis(s, t, tMorph + 0.3 + i * 0.2, 1e9, { dy: 0, fade: 0.3 })); hT.forEach((s, i) => M.vis(s, t, tMorph + 0.5 + i * 0.2, 1e9, { dy: 0 })); M.vis(hC, t, tMorph + 0.8, 1e9, { dy: 0 });
    hRd.run(t, tMorph + 0.9, 0.8);
    hR.forEach((r, i) => M.vis(r, t, wt('H3', 'exactly') + i * 0.3, 1e9, { ...POP, sc: 0.4 })); hQ.forEach((q, i) => M.vis(q, t, wt('H3', 'exactly') + 0.1 + i * 0.3, 1e9, { dy: 0 }));
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'both') - 0.1, 1e9, POP);
  }

  /* I */
  const iOn = t >= tI1 - 0.1 && t < tL1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('L1');
    M.vis($('#il'), t, tI1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#i0'), t, wt('I1', 'main'), { st: 0.04 });
    M.vis($('#i1'), t, wt('I2', 'number') - 0.1, 1e9, { dy: 10 }); M.vis($('#i2'), t, wt('I3', 'number') - 0.1, 1e9, { dy: 10 }); M.vis($('#iP'), t, wt('I3', 'negative') - 0.1, 1e9, POP);
    M.vis($('#ir'), t, tI1 + 0.2, out, { dx: 60, dy: 0, ...o }); iL.run(t, T0('I2'), 0.8);
    M.vis(iC, t, wt('I2', 'point'), 1e9, DOT); M.vis(iCt, t, wt('I2', 'point') + 0.1, 1e9, { dy: 0 });
    M.vis(iA, t, wt('I3', 'crosses'), 1e9, DOT); M.vis(iAt, t, wt('I3', 'crosses') + 0.1, 1e9, { dy: 0 });
    iL2.run(t, wt('I3', 'negative') - 0.2, 0.6); M.vis(iN, t, wt('I3', 'negative'), 1e9, DOT); M.vis(iNt, t, wt('I3', 'negative') + 0.1, 1e9, { dy: 0 });
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const c = cK(t), m = mK(t), S = LP.clip(0, c, 1, m), u = M.io((t - tL1 - 0.5) / 0.8);
    if (S) { attr(lLn, 'x1', LP.X(S[0][0]).toFixed(1)); attr(lLn, 'y1', LP.Y(S[0][1]).toFixed(1)); attr(lLn, 'x2', LP.X(S[0][0] + (S[1][0] - S[0][0]) * u).toFixed(1)); attr(lLn, 'y2', LP.Y(S[0][1] + (S[1][1] - S[0][1]) * u).toFixed(1)); }
    M.hide(lLn, u <= 0);
    attr(lDg, 'transform', `translate(${LP.X(0)},${LP.Y(c).toFixed(1)})`); M.vis(lD, t, tL1 + 1.0, 1e9, DOT);
    attr(lDt, 'x', LP.X(0) - 16); attr(lDt, 'y', (LP.Y(c) - 14).toFixed(1)); M.vis(lDt, t, tL1 + 1.1, 1e9, { dy: 0 });
    M.vis($('#lE'), t, tL1 + 0.3, 1e9, { dy: 10 });
    M.setT($('#lM'), m.toFixed(2).replace('-', '−')); M.setT($('#lSg'), c < -0.005 ? '−' : '+'); M.setT($('#lC'), Math.abs(c).toFixed(1));
    M.vis($('#lA'), t, wt('L1', 'half'), 1e9, { dy: 10 }); M.vis($('#lB'), t, wt('L1', 'c', 1), 1e9, { dy: 10 });
    M.setT($('#lMv'), m.toFixed(2).replace('-', '−')); M.setT($('#lCv'), fmt(c));
    const st = t >= wt('L5', 'turns') - 0.2 && t < T0('L6') ? 'c FIXED · ONLY THE TILT CHANGES' : (t >= wt('L3', 'slides') - 0.2 && t < T0('L4')) ? 'SLOPE FIXED · ONLY c MOVES' : '';
    if (st !== lLast) { lLast = st; M.setT($('#lP'), st); }
    M.vis($('#lP'), t, st ? (st[0] === 'c' ? wt('L5', 'turns') - 0.2 : wt('L3', 'slides') - 0.2) : null, st ? 1e9 : -1, POP);
    PUC.write($('#lF'), t, wt('L6', 'equals') - 0.1, 0.7);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tB1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('B1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(dC, t, wt('D1', 'point', 1), 1e9, DOT); M.vis(dCt, t, wt('D1', 'point', 1) + 0.1, 1e9, { dy: 0 });
    dL.run(t, tDs[0], 0.8); M.draw(dRu, t, wt('D2', 'slope') - 0.1, 0.3); M.draw(dRi, t, wt('D2', 'slope') + 0.2, 0.3); M.vis(dM, t, wt('D2', 'slope') + 0.3, 1e9, { dy: 0 });
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tK1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('K1');
    M.vis($('#bl'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o }); bsol(t, tB1, tBs);
    M.vis($('#br'), t, tB1 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(bA, t, wt('B1', 'meets'), 1e9, DOT); M.vis(bAt, t, wt('B1', 'meets') + 0.1, 1e9, { dy: 0 });
    M.vis(bB, t, wt('B1', 'y'), 1e9, DOT); M.vis(bBt, t, wt('B1', 'y') + 0.1, 1e9, { dy: 0 });
    bL.run(t, tBs[0], 0.8);
  }

  /* K + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kpF'), t, tK1 + 0.4, 0.6); kpL.run(t, tK1 + 0.6, 0.7);
    M.draw(kpRu, t, wt('K1', 'slope', 1) - 0.2, 0.3); M.draw(kpRi, t, wt('K1', 'slope', 1), 0.3); M.vis(kpM, t, wt('K1', 'slope', 1) + 0.2, 1e9, { dy: 0 });
    M.vis(kpC, t, wt('K1', 'crossing'), 1e9, DOT); M.vis(kpCt, t, wt('K1', 'crossing') + 0.1, 1e9, { dy: 0 });
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#knF'), t, T0('K2') + 0.2, 0.6); knL.run(t, T0('K2') + 0.4, 0.7);
    M.vis(knA, t, wt('K2', 'x'), 1e9, DOT); M.vis(knAt, t, wt('K2', 'x') + 0.1, 1e9, { dy: 0 }); M.vis(knB, t, wt('K2', 'y'), 1e9, DOT); M.vis(knBt, t, wt('K2', 'y') + 0.1, 1e9, { dy: 0 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Where') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'In') });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'equals') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'over') - 0.3, 0.9);
  }

  /* R + think */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R3');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#r0'), t, wt('R2', 'Take'), 0.7); M.vis($('#r1'), t, wt('R2', 'Divide') - 0.1, 1e9, { dy: 8 });
    PUC.write($('#r2'), t, wt('R2', 'equals', 1) - 0.3, 0.7); M.vis($('#rP'), t, wt('R2', 'Now') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, wt('R2', 'equals', 1) - 0.2, out, { dx: 60, dy: 0, ...o }); rL.run(t, wt('R2', 'equals', 1), 0.7);
    M.vis(rC, t, wt('R2', 'c'), 1e9, DOT); M.vis(rCt, t, wt('R2', 'c') + 0.1, 1e9, { dy: 0 });
    M.vis($('#th2'), t, tR3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tR3, tOpts: wt('R3', 'what') - 0.1, tCount: T1('R3') + 0.05, dur: 3, tAns: T0('R4') - 0.02, tWhy: wt('R4', 'Divide') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); wL.run(t, T0('W2') + 0.5, 0.8);
    M.vis(wA, t, wt('W4', 'four'), 1e9, DOT); M.vis(wAt, t, wt('W4', 'four', 1), 1e9, { dy: 0 });
    M.vis(wB, t, wt('W4', 'six'), 1e9, DOT); M.vis(wBt, t, wt('W4', 'six', 1), 1e9, { dy: 0 });
    M.vis(wM, t, wt('W6', 'Slope'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'needs') - 0.1, tRight: wt('X3', 'Divide') + 0.2 });
    tW.run(t, wt('X2', 'off'), 0.5); tW.el.style.opacity = (1 - 0.65 * M.io((t - wt('X3', 'Divide')) / 0.4)).toFixed(3);
    tR.run(t, wt('X3', 'Divide') + 0.4, 0.5); tRt.forEach((r, i) => M.vis(r, t, wt('X3', 'intercepts') + i * 0.3, 1e9, { dy: 0 }));
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
