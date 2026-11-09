// PUC Maths Ep 70: Parallel and perpendicular lines and the angle between them (Proof board)
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
// Ep 70 colours: line 1 and m1 coral (accent), line 2 and m2 teal, angle between the lines theta gold
const M2 = C.teal;
const t2 = s => `\\textcolor{${M2}}{${s}}`;
const m1 = rc('m_1'), m2 = t2('m_2'), TH = tc('\\theta');
// right-angle mark at plane point (px, py) between plane directions d1 and d2 (unit vectors)
const rmark = (svg, P, px, py, d1, d2, s = 18) => { const X0 = P.X(px), Y0 = P.Y(py), a = [d1[0] * s, -d1[1] * s], b = [d2[0] * s, -d2[1] * s];
  return mk(svg, 'path', { d: `M${X0 + a[0]},${Y0 + a[1]} L${X0 + a[0] + b[0]},${Y0 + a[1] + b[1]} L${X0 + b[0]},${Y0 + b[1]}`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); };
const U = (dx, dy) => { const L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
const deg = m => Math.atan(m) * 180 / Math.PI;

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tG1 = T0('G1'), tG8 = T0('G8');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tG1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['NEVER MEET', 'parallel roads'], ['CROSS SQUARE', 'perpendicular roads'], ['THE SECRET', 'in the slopes']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Some'), wt('H2', 'Other'), wt('H2', 'corner')];

/* ---------- H: town map ---------- */
const hs = $('#hS');
mk(hs, 'rect', { x: 36, y: 72, width: 712, height: 476, rx: 16, fill: '#EEF2EA', stroke: '#D5DECF', 'stroke-width': 2 });
const ang = 20 * Math.PI / 180, dA = [Math.cos(ang), -Math.sin(ang)], dB = [Math.sin(ang), Math.cos(ang)];
const road = (x, y, d, len, col) => { const g = mk(hs, 'g', {}); const p = [x - d[0] * len, y - d[1] * len], q = [x + d[0] * len, y + d[1] * len];
  mk(g, 'line', { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: '#FFFFFF', 'stroke-width': 30, 'stroke-linecap': 'butt' });
  const c = mk(g, 'line', { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }); return { g, c }; };
const cp0 = mk(mk(hs, 'defs', {}), 'clipPath', { id: 'hclip' }); mk(cp0, 'rect', { x: 36, y: 72, width: 712, height: 476, rx: 16 });
const hG = mk(hs, 'g', { 'clip-path': 'url(#hclip)' });
const hsv = hs; // roads drawn inside the clip group
const roadC = (x, y, d, len, col) => { const g = mk(hG, 'g', {}); const p = [x - d[0] * len, y - d[1] * len], q = [x + d[0] * len, y + d[1] * len];
  mk(g, 'line', { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: '#FFFFFF', 'stroke-width': 30 });
  const c = mk(g, 'line', { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }); return { g, c }; };
const hA = roadC(392, 230, dA, 480, RC), hB = roadC(392, 400, dA, 480, M2), hC = roadC(420, 315, dB, 300, C.ink2);
// crossings of road C with A and B
const cross = (P0, d0, P1, d1) => { const det = d0[0] * -d1[1] - d0[1] * -d1[0], dx = P1[0] - P0[0], dy = P1[1] - P0[1]; const u = (dx * -d1[1] - dy * -d1[0]) / det; return [P0[0] + d0[0] * u, P0[1] + d0[1] * u]; };
const xA = cross([392, 230], dA, [420, 315], dB), xB = cross([392, 400], dA, [420, 315], dB);
const hm = [xA, xB].map(([x, y]) => { const s = 22; return mk(hs, 'path', { d: `M${x + dA[0] * s},${y + dA[1] * s} L${x + dA[0] * s + dB[0] * s},${y + dA[1] * s + dB[1] * s} L${x + dB[0] * s},${y + dB[1] * s}`, fill: 'none', stroke: TC, 'stroke-width': 3.5 }); });
const hT1 = txt(hs, 120, 410, 'never meet', { fill: C.ink, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', transform: 'rotate(-20 120 410)' });
const hT2 = txt(hs, xA[0] + 34, xA[1] - 34, 'cross square', { fill: TC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins' });

/* ---------- P: parallel ---------- */
$('#p1').innerHTML = `<span class="a">line 1</span>: up 1 for every 2 across`;
$('#p2').innerHTML = `<span class="t2">line 2</span>: up 1 for every 2 across`;
$('#p3').innerHTML = K(`${m1} = \\tfrac{1}{2} = ${m2}`);
const PO = { ox: 110, oy: 470, s: 52, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
const ps = $('#pS'), PP = PL(ps, PO);
const pL1 = fline(ps, PP, 0, 3, 2, 4), pL2 = fline(ps, PP, 0, 0, 2, 1, M2);
const pT = [[2, 4, RC], [6, 3, M2]].map(([x, y, col]) => ({ ru: seg(ps, PP, x, y, x + 2, y, XC, 5), ri: seg(ps, PP, x + 2, y, x + 2, y + 1, YC, 5) }));
const pGap = [[3, 4.5, 4.5, 1.5], [7, 6.5, 8.5, 3.5]].map(() => null);
const pD = [1, 3, 5].map(x => seg(ps, PP, x, 0.5 * x, x, 0.5 * x + 3, C.dim, 2.5, '6 6'));
const pDt = txt(ps, PP.X(5) + 12, PP.Y(4) + 7, 'same gap', { ...LAB, fill: C.ink2 });

/* ---------- L: live, turn line 2 ---------- */
const LO = { ox: 392, oy: 320, s: 46, x0: -6, x1: 6, y0: -4, y1: 4 };
const ls = $('#lS'), LP = PL(ls, LO);
const lL1 = fline(ls, LP, 0, 1, 2, 2), lL2 = mk(ls, 'line', { stroke: M2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const lPiv = dotG(ls, LP.X(0), LP.Y(-2), 8, M2);
const lArc = mk(ls, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 });
const lMeet = dotG(ls, 0, 0, 11, C.ink, '#fff');
const lMk = mk(ls, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 });
const lFar = txt(ls, LP.X(4.2), LP.Y(3.4), 'meets far away →', { fill: C.ink2, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'middle' });
const A1 = deg(0.5);
const phK = ramp(80, [[wt('L2', 'turns') - 0.2, 45, 2.4], [T0('L3') + 0.4, 30, 3.6], [wt('L4', 'equal') - 0.4, A1, 0.6], [wt('L5', 'Watch'), -63.4349, 4.2]]);
let lLast = '';

/* ---------- R: why -1 (a quarter turn) ---------- */
const rsol = PUC.solution($('#rl'), [
  ['Turn the picture 90° anticlockwise'],
  [K(`${xc('\\text{run } 2')} \\to ${yc('\\text{rise } 2')}`)],
  [K(`${yc('\\text{rise } 1')} \\to ${xc('\\text{run } -1')}`)],
  [K(`${m2} = \\frac{2}{-1} = -2, \\quad \\tfrac{1}{2} \\times (-2) = -1`)],
  [K(`${m1} \\cdot ${m2} = -1`) + '<span class="why2">&nbsp; flip, change sign</span>']], { label: 'WHY THE PRODUCT IS −1', y0: 100, dy: 96 });
const tRs = [wt('R2', 'Turn'), wt('R3', 'run'), wt('R4', 'rise'), wt('R5', 'new'), wt('R6', 'perpendicular')];
const RO = { ox: 370, oy: 330, s: 54, x0: -4, x1: 5, y0: -3, y1: 4 };
const rs = $('#rS'), RP = PL(rs, RO);
const rG1 = mk(rs, 'g', {}); // ghost original
const rL0 = mk(rG1, 'line', { x1: RP.X(-3.5), y1: RP.Y(-1.75), x2: RP.X(5), y2: RP.Y(2.5), stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rRu0 = seg(rG1, RP, 1, 0.5, 3, 0.5, XC, 6), rRi0 = seg(rG1, RP, 3, 0.5, 3, 1.5, YC, 6);
const rRot = mk(rs, 'g', {}), rIn = mk(rRot, 'g', {});
rRot.style.transformBox = 'view-box'; rRot.style.transformOrigin = `${RP.X(0)}px ${RP.Y(0)}px`;
const rL = mk(rIn, 'line', { x1: RP.X(-3), y1: RP.Y(-1.5), x2: RP.X(3.2), y2: RP.Y(1.6), stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const rRu = seg(rIn, RP, 1, 0.5, 3, 0.5, XC, 6), rRi = seg(rIn, RP, 3, 0.5, 3, 1.5, YC, 6);
const rO = dotG(rs, RP.X(0), RP.Y(0), 7, C.ink);
const rT = { ru: txt(rs, RP.X(2), RP.Y(0.5) + 30, 'run 2', { ...LAB, 'text-anchor': 'middle', fill: XC }), ri: txt(rs, RP.X(3) + 12, RP.Y(1) + 7, 'rise 1', { ...LAB, fill: YC }),
  ri2: txt(rs, RP.X(-0.5) - 12, RP.Y(2) + 7, 'rise 2', { ...LAB, 'text-anchor': 'end', fill: YC }), ru2: txt(rs, RP.X(-1), RP.Y(3) - 14, 'run −1', { ...LAB, 'text-anchor': 'middle', fill: XC }),
  m1: txt(rs, RP.X(3.6), RP.Y(1.8) - 6, 'slope 1/2', { fill: RC, 'font-weight': 700, 'font-size': 20 }), m2: txt(rs, RP.X(-2.2) + 0, RP.Y(3.8), 'slope −2', { fill: M2, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }) };
const rArc = arc(rs, RP.X(0), RP.Y(0), 40, 26.57, 116.57, TC, 3);
const rMk = rmark(rs, RP, 0, 0, U(2, 1), U(-1, 2), 16);

/* ---------- K: parallel vs perpendicular ---------- */
const KO = { ox: 110, oy: 450, s: 54, x0: 0, x1: 10, y0: 0, y1: 6, lab: 2 };
$('#kpF').innerHTML = K(`${m1} = 2,\\ ${m2} = 2`);
const kp = $('#kpS'), KP = PL(kp, KO), kpA = fline(kp, KP, 1, 0, 2, 2), kpB = fline(kp, KP, 4, 0, 5, 2, M2);
const kpT = txt(kp, KP.X(3.4), KP.Y(5.2), 'never meet', { ...LAB, fill: C.ink2 });
const kn = $('#knS'), KN = PL(kn, KO), knA = fline(kn, KN, 2, 0, 3, 2), knB = fline(kn, KN, 0, 4.5, 2, 3.5, M2);
const knM = rmark(kn, KN, 3.4, 2.8, U(1, 2), U(-2, 1), 18);
const knF = txt(kn, KN.X(5.2), KN.Y(5.4), 'm₁ = 2', { fill: RC, 'font-weight': 700, 'font-size': 22 }), knG = txt(kn, KN.X(7.4), KN.Y(1.6), 'm₂ = −1/2', { fill: M2, 'font-weight': 700, 'font-size': 22 });
const th1 = PUC.think($('#th1'), { q: `Slopes ${K('3')} and ${K('-\\tfrac{1}{3}')}: parallel, perpendicular, or neither?`, opts: ['Parallel', 'Perpendicular', 'Neither'], right: 1, why: '3 × (−1/3) = −1, so the lines cross at 90°.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{Perpendicular: } ${m1} \\cdot ${m2} = -1`);

/* ---------- G: angle between two lines ---------- */
const a1 = tc('\\alpha_1').replace(TC, RC), a2 = `\\textcolor{${M2}}{\\alpha_2}`;
const gsol = PUC.solution($('#gl'), [
  [K(`${TH} = ${a2} - ${a1}`)],
  [K(`\\tan ${TH} = \\dfrac{\\tan ${a2} - \\tan ${a1}}{1 + \\tan ${a1} \\tan ${a2}}`)],
  [K(`\\tan ${TH} = \\dfrac{${m2} - ${m1}}{1 + ${m1} ${m2}}`)],
  [K(`\\tan ${TH} = \\left| \\dfrac{${m2} - ${m1}}{1 + ${m1} ${m2}} \\right|`) + '<span class="why2">&nbsp; sharp angle</span>']], { label: 'THE ANGLE BETWEEN TWO LINES', y0: 100, dy: 116 });
const tGs = [wt('G3', 'angle'), wt('G4', 'tan'), wt('G5', 'Put'), wt('G6', 'size')];
const GO = { ox: 206, oy: 440, s: 62, x0: -1, x1: 7, y0: -1, y1: 5 };
const gs = $('#gS'), GP = PL(gs, GO);
const gL1 = fline(gs, GP, 0, 0, 2, 1), gL2 = fline(gs, GP, 2, 0, 3, 3, M2);
const gA1 = arc(gs, GP.X(0), GP.Y(0), 56, 0, 26.57, RC, 4), gA2 = arc(gs, GP.X(2), GP.Y(0), 44, 0, 71.57, M2, 4);
const gA1t = txt(gs, GP.X(0) + 64, GP.Y(0) - 8, 'α₁', { fill: RC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins' }), gA2t = txt(gs, GP.X(2) + 34, GP.Y(0) - 40, 'α₂', { fill: M2, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins' });
const gc = [2.4, 1.2], gTh = arc(gs, GP.X(gc[0]), GP.Y(gc[1]), 46, 26.57, 71.57, TC, 4.5);
const gTht = txt(gs, GP.X(gc[0]) + 52, GP.Y(gc[1]) - 46, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' });
const gOb = arc(gs, GP.X(gc[0]), GP.Y(gc[1]), 30, 71.57, 206.57, C.ink2, 3.5);
const gObt = txt(gs, GP.X(gc[0]) - 40, GP.Y(gc[1]) - 46, '180° − θ', { fill: C.ink2, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
const gM = [txt(gs, GP.X(5.4), GP.Y(2.7) + 30, 'm₁ = 1/2', { fill: RC, 'font-weight': 700, 'font-size': 20 }), txt(gs, GP.X(3.75) + 14, GP.Y(5) + 22, 'm₂ = 3', { fill: M2, 'font-weight': 700, 'font-size': 20 })];
$('#gP').innerHTML = K(`\\tan ${TH} = \\left|\\frac{3 - \\frac{1}{2}}{1 + \\frac{3}{2}}\\right| = 1 \\;\\Rightarrow\\; ${tc('\\theta = 45^\\circ')}`);
const th2 = PUC.think($('#th2'), { q: 'Can this formula find the angle between two perpendicular lines?', opts: ['Yes', 'No'], right: 1, why: 'For perpendicular lines 1 + m₁m₂ = 0, and we cannot divide by 0. That angle is 90°.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the sharp angle between two lines with slopes ${K(`${m1} = 2`)} and ${K(`${m2} = -3`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${m2} - ${m1} = -3 - 2 = -5`)],
  [K(`1 + ${m1} ${m2} = 1 + (-6) = -5`)],
  [K(`\\tan ${TH} = \\left| \\dfrac{-5}{-5} \\right| = 1`)],
  [K(`${tc('\\theta = 45^\\circ')}`)]], { label: 'WORKED EXAMPLE', y0: 186, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Top'), wt('W4', 'Bottom'), wt('W5', 'tan'), wt('W6', 'theta', 1)];
const WO = { ox: 240, oy: 470, s: 70, x0: -1, x1: 5, y0: -1, y1: 5 };
const ws = $('#wS'), WP = PL(ws, WO);
const wL1 = fline(ws, WP, 0, 0, 1, 2), wL2 = fline(ws, WP, 0, 5, 1, 2, M2);
const wX = dotG(ws, WP.X(1), WP.Y(2), 9, C.ink);
const wTh = arc(ws, WP.X(1), WP.Y(2), 50, 63.43, 108.43, TC, 4.5);
const wTht = txt(ws, WP.X(1) + 4, WP.Y(2) - 62, '45°', { fill: TC, 'font-weight': 700, 'font-size': 24, 'text-anchor': 'middle' });
const wM = [txt(ws, WP.X(2.1) + 16, WP.Y(4.2), 'm₁ = 2', { fill: RC, 'font-weight': 700, 'font-size': 22 }), txt(ws, WP.X(1.9) + 18, WP.Y(-0.7), 'm₂ = −3', { fill: M2, 'font-weight': 700, 'font-size': 22 })];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${m2} = -2:\\quad 2 \\times (-2) = -4`) + '<span class="why2">&nbsp; only the sign changed</span>', right: K(`${m2} = -\\tfrac{1}{2}:\\quad 2 \\times \\left(-\\tfrac{1}{2}\\right) = -1`) + '<span class="why2">&nbsp; flip and change sign</span>' });
const TO = { ox: 280, oy: 140, s: 30, x0: -4, x1: 4, y0: -3, y1: 3, nolab: 1 };
const ts = $('#tS'), TP = PL(ts, TO);
const tL = fline(ts, TP, 0, 0, 1, 2, RC, 4), tW = fline(ts, TP, 0, 0, 1, -2, C.red, 4), tR = fline(ts, TP, 0, 0, 2, -1, C.ok, 4);
attr(tW.el, 'stroke-dasharray', '9 7');
const tMk = rmark(ts, TP, 0, 0, U(1, 2), U(2, -1), 12);
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find a missing coordinate so that two lines are perpendicular.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K('L_1')} passes through ${K('(0,\\ 0)')} and ${K('(1,\\ 3)')}. ${K('L_2')} has positive slope ${K('m')} and makes an angle of ${K('45^\\circ')} with ${K('L_1')}. Then ${K('m')} =`,
  opts: [K('2'), K('-2'), K('1/2'), K('1/3')], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${m1} = 3`)], [K(`\\left|\\dfrac{m - 3}{1 + 3m}\\right| = 1`)], [K(`m - 3 = \\pm (1 + 3m)`)], [K(`+:\\ m = -2\\ \\ ${red('\\times')}`)], [K(`-:\\ 4m = 2 \\Rightarrow m = \\tfrac{1}{2}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'L'), wt('A2', 'tan'), wt('A3', 'Without'), wt('A4', 'Plus'), wt('A4', 'Minus', 1)];
const fc = PUC.fcard($('#sF'), { x: 300, y: 226, w: 1320, h: 540, title: 'Recap · parallel, perpendicular, angle', y0: 96, dy: 78, txt: [0, 0, 1, 1, 0],
  lines: [K(`\\text{Parallel: } ${m1} = ${m2}`), K(`\\text{Perpendicular: } ${m1} \\cdot ${m2} = -1`),
    '<b>Sharp</b> angle θ, <b>wide</b> angle 180° − θ',
    '<b>Trap</b>: perpendicular to slope 2 is −1/2, not −2',
    K(`\\tan ${TH} = \\left| \\dfrac{${m2} - ${m1}}{1 + ${m1} ${m2}} \\right|, \\quad 1 + ${m1}${m2} \\ne 0`)] });
[...document.querySelectorAll('#sF .fcard .fl')].forEach((e, i) => { if (i === 4) e.style.top = (parseFloat(e.style.top) + 24) + 'px'; });
const YQ = ['What is the slope of a line parallel to a line of slope −4?', 'Lines with slopes 1/2 and −2 meet at what angle?', 'Why does the angle formula fail for perpendicular lines?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 71', topic: 'Two dots on a map: draw the road. Point-Slope and Two-Point Forms', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L3'), 1.05, 960, 560], [wt('L4', 'parallel') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    [hA, hB, hC].forEach((r, i) => { M.vis(r.g, t, tMorph + 0.3 + i * 0.35, 1e9, { dy: 0, fade: 0.3 }); M.draw(r.c, t, tMorph + 0.35 + i * 0.35, 0.7); });
    M.vis(hT1, t, tMorph + 1.4, 1e9, { dy: 0 });
    hm.forEach((m, i) => M.vis(m, t, tMorph + 1.6 + i * 0.15, 1e9, { dy: 0, fade: 0.1 })); M.vis(hT2, t, tMorph + 1.8, 1e9, { dy: 0 });
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'tell') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#p0'), t, wt('P1', 'means'), { st: 0.04 });
    M.vis($('#p1'), t, wt('P2', 'climbs'), 1e9, { dy: 10 }); M.vis($('#p2'), t, wt('P2', 'climbs') + 0.4, 1e9, { dy: 10 });
    PUC.write($('#p3'), t, wt('P3', 'slope') - 0.1, 0.7); M.vis($('#pP'), t, wt('P4', 'parallel') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tP1 + 0.2, out, { dx: 60, dy: 0, ...o });
    pL1.run(t, wt('P2', 'two') - 0.2, 0.8); pL2.run(t, wt('P2', 'lines'), 0.8);
    pT.forEach((p, i) => { M.draw(p.ru, t, wt('P2', 'every') + i * 0.3, 0.4); M.draw(p.ri, t, wt('P2', 'up') + i * 0.3, 0.3); });
    pD.forEach((d, i) => M.draw(d, t, wt('P3', 'lean') + i * 0.2, 0.3)); M.vis(pDt, t, wt('P3', 'lean') + 0.4, 1e9, { dy: 0 });
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('R1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    lL1.run(t, tL1 + 0.4, 0.7);
    const ph = phK(t), mm = Math.tan(ph * Math.PI / 180), S = LP.clip(0, -2, Math.cos(ph * Math.PI / 180), Math.sin(ph * Math.PI / 180));
    const u = M.io((t - wt('L2', 'Line', 1) + 0.1) / 0.7);
    if (S) { attr(lL2, 'x1', LP.X(S[0][0]).toFixed(1)); attr(lL2, 'y1', LP.Y(S[0][1]).toFixed(1)); attr(lL2, 'x2', LP.X(S[0][0] + (S[1][0] - S[0][0]) * u).toFixed(1)); attr(lL2, 'y2', LP.Y(S[0][1] + (S[1][1] - S[0][1]) * u).toFixed(1)); }
    M.hide(lL2, u <= 0); M.vis(lPiv, t, wt('L2', 'Line', 1), 1e9, DOT);
    const par = Math.abs(mm - 0.5) < 0.004, mx = par ? 1e9 : 3 / (mm - 0.5), my = 0.5 * mx + 1, inW = Math.abs(mx) <= 6 && Math.abs(my) <= 4;
    attr(lMeet.parentNode, 'transform', `translate(${LP.X(M.clamp(mx, -7, 7)).toFixed(1)},${LP.Y(M.clamp(my, -5, 5)).toFixed(1)})`);
    M.hide(lMeet, !(inW && u >= 1)); M.hide(lFar, !(u >= 1 && !inW && !par && t < T0('L5')));
    M.vis($('#l1'), t, wt('L2', 'one'), 1e9, { dy: 10 }); M.vis($('#l2'), t, wt('L2', 'Line', 1), 1e9, { dy: 10 });
    M.setT($('#l2v'), mm.toFixed(2));
    M.vis($('#l3'), t, T0('L3') - 0.2, 1e9, { dy: 10 });
    const l3 = par ? 'never' : Math.abs(mx) > 999 ? (mx > 0 ? '> 999' : '< −999') : mx.toFixed(1).replace('-', '−'); M.setT($('#l3v'), l3);
    const d = Math.abs(ph - A1), th = Math.min(d, 180 - d);
    const aOn = t >= wt('L5', 'Watch'); M.vis($('#l4'), t, wt('L5', 'crossing') - 0.1, 1e9, { dy: 10 }); M.vis($('#l5'), t, wt('L5', 'multiplied') - 0.2, 1e9, { dy: 10 });
    M.setT($('#l4v'), String(Math.round(th))); M.setT($('#l5v'), (0.5 * mm).toFixed(2).replace('-', '−'));
    if (aOn && inW && th > 2) { const lo = Math.min(ph, A1), hi = Math.max(ph, A1); attr(lArc, 'd', arcD(LP.X(mx), LP.Y(my), 40, lo, hi)); M.hide(lArc, false); } else M.hide(lArc, true);
    const perp = Math.abs(th - 90) < 0.3; if (perp && inW) { attr(lMk, 'd', (() => { const s = 16, a = U(2, 1), b = U(-1, 2), X0 = LP.X(mx), Y0 = LP.Y(my); return `M${X0 + a[0] * s},${Y0 - a[1] * s} L${X0 + a[0] * s + b[0] * s},${Y0 - a[1] * s - b[1] * s} L${X0 + b[0] * s},${Y0 - b[1] * s}`; })()); } M.hide(lMk, !(perp && inW));
    const st = t >= wt('L6', 'product') - 0.1 ? 'PERPENDICULAR · PRODUCT −1' : (t >= wt('L4', 'parallel') - 0.1 && t < wt('L5', 'Watch') + 0.4) ? 'PARALLEL · EQUAL SLOPES' : '';
    if (st !== lLast) { lLast = st; M.setT($('#lP'), st); $('#lP').className = 'pillp ' + (st ? 'ac' : ''); }
    M.vis($('#lP'), t, st ? (st[1] === 'E' ? wt('L6', 'product') - 0.1 : wt('L4', 'parallel') - 0.1) : null, st ? 1e9 : -1, POP);
  }

  /* R: quarter turn */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); rsol(t, tR1, tRs);
    M.vis($('#rr'), t, tR1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const tr0 = wt('R2', 'quarter') - 0.2, rot = 90 * M.io((t - tr0) / 1.6);
    M.vis(rIn, t, tR1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); rRot.style.transform = `rotate(${(-rot).toFixed(2)}deg)`;
    rG1.style.opacity = t < tr0 ? 0 : 0.28; M.hide(rG1, t < tr0);
    attr(rL, 'stroke', mix(RC, M2, rot / 90));
    attr(rRu, 'stroke', mix(XC, YC, M.io((t - tRs[1]) / 0.3))); attr(rRi, 'stroke', mix(YC, XC, M.io((t - tRs[2]) / 0.3)));
    M.vis(rT.ru, t, wt('R1', 'Run'), tr0, { dy: 0 }); M.vis(rT.ri, t, wt('R1', 'rise'), tr0, { dy: 0 }); M.vis(rT.m1, t, wt('R1', 'Slope'), 1e9, { dy: 0 });
    M.vis(rT.ri2, t, tRs[1] + 0.3, 1e9, { dy: 0 }); M.vis(rT.ru2, t, tRs[2] + 0.3, 1e9, { dy: 0 }); M.vis(rT.m2, t, wt('R5', 'minus', 1), 1e9, { dy: 0 });
    M.vis(rO, t, tR1 + 0.4, 1e9, DOT); M.draw(rArc, t, tr0, 1.6); M.vis(rMk, t, wt('R6', 'perpendicular'), 1e9, { dy: 0 });
  }

  /* K + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); kpA.run(t, wt('K1', 'Parallel'), 0.6); kpB.run(t, wt('K1', 'Parallel') + 0.3, 0.6);
    PUC.write($('#kpF'), t, wt('K1', 'same') - 0.1, 0.5); M.vis(kpT, t, wt('K1', 'slope'), 1e9, { dy: 0 }); M.vis($('#kpP'), t, wt('K1', 'Two'), 1e9, POP);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); knA.run(t, T0('K2') + 0.2, 0.6); knB.run(t, wt('K2', 'flip'), 0.6);
    M.vis(knF, t, T0('K2') + 0.6, 1e9, { dy: 0 }); M.vis(knG, t, wt('K2', 'sign'), 1e9, { dy: 0 }); M.vis(knM, t, wt('K2', 'sign') + 0.2, 1e9, { dy: 0 });
    M.vis($('#knP'), t, wt('K2', 'minus') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Parallel') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Three') });
  }

  /* statement */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Parallel') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Perpendicular') - 0.1, 0.8);
  }

  /* G + think */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G8');
    M.vis($('#gl'), t, tG1 + 0.3, out, { dx: -60, dy: 0, ...o }); gsol(t, tG1, tGs);
    M.vis($('#gr'), t, tG1 + 0.4, out, { dx: 60, dy: 0, ...o });
    gL1.run(t, tG1 + 0.6, 0.7); gL2.run(t, tG1 + 0.9, 0.7);
    M.draw(gA1, t, wt('G2', 'alpha') - 0.1, 0.5); M.vis(gA1t, t, wt('G2', 'alpha'), 1e9, { dy: 0 });
    M.draw(gA2, t, wt('G2', 'alpha', 1) - 0.1, 0.5); M.vis(gA2t, t, wt('G2', 'alpha', 1), 1e9, { dy: 0 });
    gM.forEach((m, i) => M.vis(m, t, wt('G2', 'slopes') + i * 0.5, 1e9, { dy: 0 }));
    M.draw(gTh, t, tGs[0] + 0.3, 0.5); M.vis(gTht, t, tGs[0] + 0.5, 1e9, { dy: 0 });
    M.vis($('#gP'), t, wt('G6', 'sharp') - 0.1, 1e9, POP);
    M.draw(gOb, t, wt('G7', 'wide') - 0.1, 0.6); M.vis(gObt, t, wt('G7', 'eighty'), 1e9, { dy: 0 });
    M.vis($('#th2'), t, tG8 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG8, tOpts: wt('G8', 'perpendicular') - 0.1, tCount: T1('G8') + 0.05, dur: 3, tAns: T0('G9') - 0.02, tWhy: wt('G9', 'For') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wL1.run(t, wt('W2', 'two', 1) - 0.1, 0.6); wL2.run(t, wt('W2', 'minus') - 0.1, 0.6);
    wM.forEach((m, i) => M.vis(m, t, (i ? wt('W2', 'minus') : wt('W2', 'two', 1)) + 0.3, 1e9, { dy: 0 })); M.vis(wX, t, wt('W2', 'minus') + 0.5, 1e9, DOT);
    M.draw(wTh, t, tWs[3], 0.5); M.vis(wTht, t, wt('W6', 'forty'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'four') - 0.1, tRight: wt('X3', 'Flip') - 0.1 });
    tL.run(t, wt('X2', 'two') - 0.1, 0.5); tW.run(t, wt('X2', 'write') - 0.1, 0.5);
    tW.el.style.opacity = (1 - 0.65 * M.io((t - wt('X3', 'Flip')) / 0.4)).toFixed(3);
    tR.run(t, wt('X3', 'answer') - 0.1, 0.5); M.vis(tMk, t, wt('X3', 'answer') + 0.4, 1e9, { dy: 0 });
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
