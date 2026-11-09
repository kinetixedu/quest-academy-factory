// PUC Maths Ep 51: Graphical solution of inequalities in two variables (Proof board)
// Not in the current (rationalised) NCERT text: ghost chip, no board chip.
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: x violet, y blue, the boundary line coral (accent), the answer half plane light coral, true green, false red
const XC = C.violet, YC = '#2F6FEB', RC = C.ac, RF = C.ac2;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const xc = s => `\\textcolor{${XC}}{${s}}`, yc = s => `\\textcolor{${YC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`;
const X_ = xc('x'), Y_ = yc('y');
const ok = s => `<span style="color:var(--ok);font-weight:600">${s}</span>`, no = s => `<span style="color:var(--red);font-weight:600">${s}</span>`, why = s => `<span class="why2">&nbsp; ${s}</span>`;

/* plane: grid, axes, labels; poly(a,b,c,sense) = path of {sense*(a x + b y - c) < 0} inside the window; seg(a,b,c) = line ends */
const PL = (svg, o) => {
  const X = v => o.ox + v * o.s, Y = v => o.oy - v * o.s, g = mk(svg, 'g', {}), lab = o.lab || 1;
  for (let v = o.x0; v <= o.x1; v++) mk(g, 'line', { x1: X(v), y1: Y(o.y0), x2: X(v), y2: Y(o.y1), stroke: '#ECEEF2', 'stroke-width': 1.5 });
  for (let v = o.y0; v <= o.y1; v++) mk(g, 'line', { x1: X(o.x0), y1: Y(v), x2: X(o.x1), y2: Y(v), stroke: '#ECEEF2', 'stroke-width': 1.5 });
  const ax = mk(svg, 'g', {});
  mk(ax, 'line', { x1: X(o.x0), y1: Y(0), x2: X(o.x1) + 18, y2: Y(0), stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'path', { d: `M${X(o.x1) + 24},${Y(0)} l-13,-7 v14 z`, fill: C.ink });
  mk(ax, 'line', { x1: X(0), y1: Y(o.y0), x2: X(0), y2: Y(o.y1) - 18, stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'path', { d: `M${X(0)},${Y(o.y1) - 24} l-7,13 h14 z`, fill: C.ink });
  txt(ax, X(o.x1) + 20, Y(0) + 32, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, 'font-weight': 600, fill: XC });
  txt(ax, X(0) - 26, Y(o.y1) - 10, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, 'font-weight': 600, fill: YC });
  for (let v = o.x0; v <= o.x1; v++) if (v && v % lab === 0) txt(ax, X(v), Y(0) + 26, v, { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink2, 'font-weight': 600 });
  for (let v = o.y0; v <= o.y1; v++) if (v && v % lab === 0) txt(ax, X(0) - 12, Y(v) + 6, v, { 'text-anchor': 'end', 'font-size': 16, fill: C.ink2, 'font-weight': 600 });
  txt(ax, X(0) - 10, Y(0) + 24, '0', { 'text-anchor': 'end', 'font-size': 16, fill: C.ink2, 'font-weight': 600 });
  const R = [[o.x0, o.y0], [o.x1, o.y0], [o.x1, o.y1], [o.x0, o.y1]];
  const poly = (a, b, c, sense) => { const f = p => sense * (a * p[0] + b * p[1] - c); let out = [];
    R.forEach((p, i) => { const q = R[(i + 1) % 4], fp = f(p), fq = f(q); if (fp <= 0) out.push(p); if ((fp < 0) !== (fq < 0) && fp !== fq) { const u = fp / (fp - fq); out.push([p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u]); } });
    return out.length ? 'M' + out.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join('L') + 'Z' : ''; };
  const seg = (a, b, c) => { const pts = [];
    if (b) [o.x0, o.x1].forEach(x => { const y = (c - a * x) / b; if (y >= o.y0 - 1e-9 && y <= o.y1 + 1e-9) pts.push([x, y]); });
    if (a) [o.y0, o.y1].forEach(y => { const x = (c - b * y) / a; if (x >= o.x0 - 1e-9 && x <= o.x1 + 1e-9) pts.push([x, y]); });
    pts.sort((p, q) => p[0] - q[0] || q[1] - p[1]); return [pts[0], pts[pts.length - 1]]; };
  return { X, Y, g, ax, poly, seg };
};
// a boundary line that grows from p1 to p2 (works for dashed lines too)
const bline = (svg, P, a, b, c, dashed, w = 5) => { const [p, q] = P.seg(a, b, c), el = mk(svg, 'line', { stroke: RC, 'stroke-width': w, 'stroke-linecap': 'round' }); if (dashed) attr(el, 'stroke-dasharray', '14 10');
  const set = u => { u = M.clamp(u); attr(el, 'x1', P.X(p[0]).toFixed(1)); attr(el, 'y1', P.Y(p[1]).toFixed(1)); attr(el, 'x2', P.X(p[0] + (q[0] - p[0]) * u).toFixed(1)); attr(el, 'y2', P.Y(p[1] + (q[1] - p[1]) * u).toFixed(1)); M.hide(el, u <= 0); };
  return { el, set, run: (t, t0, d = 0.8) => set(M.io((t - t0) / d)), dash: on => attr(el, 'stroke-dasharray', on ? '14 10' : 'none') }; };
const region = (svg, P, a, b, c, sense, fill = RF) => { const e = mk(svg, 'path', { d: P.poly(a, b, c, sense), fill, opacity: 0.85 }); svg.insertBefore(e, P.ax); return e; };
const dotG = (svg, x, y, r, fill, stroke, sw = 3) => { const g = mk(mk(svg, 'g', { transform: `translate(${x},${y})` }), 'g', {}); const c = mk(g, 'circle', { r, fill, stroke: stroke || fill, 'stroke-width': sw }); g.c = c; return g; };
const fade = (el, t, t0, d = 0.4, to = 1) => { el.style.opacity = (to * M.io((t - t0) / d)).toFixed(3); M.hide(el, t < t0); };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tI1 = T0('I1'), tL1 = T0('L1'), tS1 = T0('S1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tV1 = T0('V1'), tV3 = T0('V3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tV1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ONE CHALK LINE', 'across the ground'], ['THIS SIDE', '?'], ['THAT SIDE', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'chalk'), wt('H2', 'one'), wt('H2', 'other')];

/* ---------- H: the ground ---------- */
const hs = $('#hS');
mk(hs, 'rect', { x: 40, y: 72, width: 704, height: 476, rx: 16, fill: '#E9F1E4', stroke: '#C5D9BC', 'stroke-width': 2 });
const hA = mk(hs, 'path', { d: 'M56,88 L56,532 L196,532 L600,88 Z', fill: RF, opacity: 0.9 }), hB = mk(hs, 'path', { d: 'M600,88 L728,88 L728,532 L196,532 Z', fill: '#E7EEFD', opacity: 0.9 });
const hL = mk(hs, 'line', { x1: 196, y1: 532, x2: 600, y2: 88, stroke: '#FFFFFF', 'stroke-width': 10, 'stroke-linecap': 'round' });
const hLb = [txt(hs, 150, 160, 'SIDE 1', { fill: RC, 'font-weight': 600, 'font-size': 22, 'letter-spacing': 2 }), txt(hs, 560, 470, 'SIDE 2', { fill: YC, 'font-weight': 600, 'font-size': 22, 'letter-spacing': 2 }), txt(hs, 420, 300, 'ON THE LINE', { fill: C.ink2, 'font-weight': 600, 'font-size': 18, 'letter-spacing': 2 })];
const hAa = dotG(hs, 300, 420, 16, XC, '#fff', 4); const hAq = txt(hs, 300, 384, 'Aarav ?', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins' });

/* ---------- I: from a line to a region ---------- */
$('#i0').innerHTML = `Every spot gets two numbers: <span style="color:${XC}">x across</span>, <span style="color:${YC}">y up</span>.`;
$('#i1').innerHTML = K(`${X_} + ${Y_} = 6`) + `<span class="why2" style="font-size:24px">&nbsp; a straight line</span>`;
$('#i2').innerHTML = '(0, 6) · (2, 4) · (6, 0)';
$('#i3').innerHTML = K(`${X_} + ${Y_} ${rc('<')} 6`) + `<span class="why2" style="font-size:24px">&nbsp; a whole region</span>`;
const PO = { ox: 100, oy: 500, s: 60, x0: 0, x1: 7, y0: 0, y1: 7 };
const is = $('#iS'), IP = PL(is, PO);
const iGx = mk(is, 'line', { x1: IP.X(0), y1: IP.Y(3), x2: IP.X(2), y2: IP.Y(3), stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const iGy = mk(is, 'line', { x1: IP.X(2), y1: IP.Y(0), x2: IP.X(2), y2: IP.Y(3), stroke: YC, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const iP = dotG(is, IP.X(2), IP.Y(3), 12, C.ink); const iPl = txt(is, IP.X(2) + 18, IP.Y(3) - 14, '(2, 3)', { fill: C.ink, 'font-weight': 600, 'font-size': 20 });
const iLn = bline(is, IP, 1, 1, 6, false);
const iDs = [[0, 6], [2, 4], [6, 0]].map(([x, y]) => dotG(is, IP.X(x), IP.Y(y), 11, RC, '#fff', 3));
const iSide = txt(is, IP.X(0.6), IP.Y(1.2), 'every point here: x + y < 6', { fill: RC, 'font-weight': 600, 'font-size': 18 });

/* ---------- L: live test ---------- */
$('#lR').innerHTML = K(`${X_} + ${Y_} < 6`);
const ls = $('#lSv'), LP = PL(ls, PO);
const lReg = region(ls, LP, 1, 1, 6, 1); const lLn = bline(ls, LP, 1, 1, 6, true);
const lRegT = txt(ls, LP.X(0.5), LP.Y(0.6), 'half plane x + y < 6', { fill: RC, 'font-weight': 600, 'font-size': 18 });
const LPTS = [[1, 1], [5, 4], [3, 1], [6, 3], [0.5, 4], [4, 5], [2, 2], [1, 6], [5, 0.5], [2.5, 6], [4, 1], [6, 6], [0.5, 2.5], [3, 5], [2, 3.5], [6.5, 1.5]];
const tL0 = wt('L2', 'One'), tL1b = wt('L3', 'Five'), tL4a = wt('L4', 'Keep'), tL4b = T1('L4');
const tPt = i => i === 0 ? tL0 : i === 1 ? tL1b : tL4a + (i - 2) * (tL4b - tL4a) / (LPTS.length - 2);
const lDs = LPTS.map(([x, y]) => dotG(ls, LP.X(x), LP.Y(y), 12, '#fff', C.ink));

/* ---------- S: test point shortcut ---------- */
const ssol = PUC.solution($('#sl'), [['Pick a point that is not on the line'], ['Easiest: the origin (0, 0)'], [K(`0 + 0 = 0 < 6`) + '&nbsp; ' + ok('true')], ['True: shade the side with (0, 0)'], ['False: shade the other side']], { label: 'THE TEST POINT SHORTCUT', y0: 96, dy: 92 });
const tSs = [wt('S1', 'Pick'), wt('S1', 'origin'), wt('S2', 'Zero'), wt('S2', 'shade'), wt('S3', 'false')];
const ssv = $('#sSv'), SP = PL(ssv, PO);
const sReg = region(ssv, SP, 1, 1, 6, 1); const sLn = bline(ssv, SP, 1, 1, 6, true);
const sO = dotG(ssv, SP.X(0), SP.Y(0), 13, C.ok, '#fff'); const sRing = mk(ssv, 'circle', { cx: SP.X(0), cy: SP.Y(0), r: 28, fill: 'none', stroke: C.ok, 'stroke-width': 3 });
const sOt = txt(ssv, SP.X(0) + 30, SP.Y(0) - 26, '(0, 0): 0 < 6 true', { fill: C.ok, 'font-weight': 600, 'font-size': 20 });

/* ---------- K: strict vs slack ---------- */
const KO = { ox: 100, oy: 440, s: 48, x0: 0, x1: 7, y0: 0, y1: 7 };
$('#kdF').innerHTML = K(`${X_} + ${Y_} < 6`); $('#ksF').innerHTML = K(`${X_} + ${Y_} \\le 6`);
const kd = $('#kdS'), KD = PL(kd, KO), ks = $('#ksS'), KS = PL(ks, KO);
const kdR = region(kd, KD, 1, 1, 6, 1), ksR = region(ks, KS, 1, 1, 6, 1);
const kdL = bline(kd, KD, 1, 1, 6, true), ksL = bline(ks, KS, 1, 1, 6, false);
const kdP = dotG(kd, KD.X(3), KD.Y(3), 12, '#fff', C.red, 4), ksP = dotG(ks, KS.X(3), KS.Y(3), 12, C.ok, '#fff', 3);
const kdT = txt(kd, KD.X(3) + 20, KD.Y(3) - 14, '(3, 3) left out', { fill: C.red, 'font-weight': 600, 'font-size': 19 }), ksT = txt(ks, KS.X(3) + 20, KS.Y(3) - 14, '(3, 3) counts', { fill: C.ok, 'font-weight': 600, 'font-size': 19 });
const th1 = PUC.think($('#th1'), { q: `${K(`2${X_} + 3${Y_} \\ge 12`)}: test (0, 0). Which side wins?`, opts: ['The origin side', 'The other side'], right: 1, why: '0 ≥ 12 is false, so shade away from (0, 0). Solid line: equal is allowed.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`(0, 0):\\ 0 + 0 < 6 \\;\\Rightarrow\\; \\text{shade the origin side}`);

/* ---------- V: one letter ---------- */
$('#vF').innerHTML = K(`${X_} > 2`);
const vl = $('#vlS'), VX = v => 92 + (v + 1) * 84;
mk(vl, 'line', { x1: 60, y1: 320, x2: 730, y2: 320, stroke: C.ink, 'stroke-width': 3 }); mk(vl, 'path', { d: 'M736,320 l-14,-8 v16 z', fill: C.ink });
for (let v = -1; v <= 6; v++) { mk(vl, 'line', { x1: VX(v), y1: 311, x2: VX(v), y2: 329, stroke: C.ink, 'stroke-width': 2 }); txt(vl, VX(v), 362, v, { 'text-anchor': 'middle', fill: C.ink, 'font-size': 20, 'font-weight': 600 }); }
const vRay = mk(vl, 'line', { x1: VX(2), y1: 320, x2: 744, y2: 320, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const vO = mk(vl, 'circle', { cx: VX(2), cy: 320, r: 15, fill: '#fff', stroke: XC, 'stroke-width': 4 });
const VO = { ox: 100, oy: 440, s: 48, x0: 0, x1: 12, y0: 0, y1: 7, lab: 2 };
const vr = $('#vrS'), VP = PL(vr, VO); const vReg = region(vr, VP, 1, 0, 2, -1); const vLn = bline(vr, VP, 1, 0, 2, true);
const vLt = txt(vr, VP.X(2) + 12, VP.Y(7) + 8, 'x = 2', { fill: RC, 'font-weight': 600, 'font-size': 20 });
const th2 = PUC.think($('#th2'), { q: `${K(`${Y_} < 3`)}: shade above the line y = 3, or below it?`, opts: ['Above', 'Below'], right: 1, why: 'Every point lower than height 3 works, whatever its x.' });

/* ---------- W: 3x + 2y > 6 ---------- */
$('#wq').innerHTML = K(`3${X_} + 2${Y_} > 6`);
const wsol = PUC.solution($('#wl'), [
  [K(`3${X_} + 2${Y_} = 6`) + why('meets the axes at (2, 0) and (0, 3)')],
  ['Sign &gt; with no equals: a dashed line'],
  [K(`(0, 0):\\ 0 > 6`) + '&nbsp; ' + no('false')],
  ['Shade the side away from (0, 0)']], { label: 'WORKED EXAMPLE', y0: 176, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Draw'), wt('W4', 'sign'), wt('W5', 'Test'), wt('W6', 'shade')];
const WO = { ox: 100, oy: 500, s: 72, x0: 0, x1: 8, y0: 0, y1: 5 };
const wsv = $('#wS'), WP = PL(wsv, WO); const wReg = region(wsv, WP, 3, 2, 6, -1); const wLn = bline(wsv, WP, 3, 2, 6, false);
const wI = [[2, 0, 'two'], [0, 3, 'three']].map(([x, y, w]) => ({ g: dotG(wsv, WP.X(x), WP.Y(y), 11, RC, '#fff'), t: wt('W3', w) }));
const wO = dotG(wsv, WP.X(0), WP.Y(0), 13, C.red, '#fff'); const wOt = txt(wsv, WP.X(0) + 24, WP.Y(0) - 22, '(0, 0): 0 > 6 false', { fill: C.red, 'font-weight': 600, 'font-size': 20 });
const wRt = txt(wsv, WP.X(3.2), WP.Y(3.4), '3x + 2y > 6', { fill: RC, 'font-weight': 700, 'font-size': 24 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`2${X_} - ${Y_} > 4:\\ \\text{greater, so shade above}`), right: K(`(0, 0):\\ 0 > 4 \\text{ false} \\Rightarrow \\text{shade below}`) });
const TO = { ox: 170, oy: 150, s: 24, x0: -4, x1: 15, y0: -4, y1: 4, lab: 2 };
const ts = $('#tS'), TP = PL(ts, TO); const tWr = region(ts, TP, 2, -1, 4, 1, C.redBg), tRt = region(ts, TP, 2, -1, 4, -1);
const tLn = bline(ts, TP, 2, -1, 4, true, 4); const tO = dotG(ts, TP.X(0), TP.Y(0), 8, C.red, '#fff', 2);
ts.insertBefore(tWr, TP.ax); ts.insertBefore(tRt, TP.ax);
const where = PUC.where($('#wa'), { on: [], type: 'Which side of a line is a point on? It helps in coordinate geometry problems.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`${X_} + 2${Y_} < 8`)}<br>How many points (x, y) with x and y positive integers make it true?`,
  opts: ['6', '9', '12', '15'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${Y_} = 1:\\ ${X_} < 6 \\Rightarrow 5`)], [K(`${Y_} = 2:\\ ${X_} < 4 \\Rightarrow 3`)], [K(`${Y_} = 3:\\ ${X_} < 2 \\Rightarrow 1`)], [K(`${Y_} = 4:\\ ${X_} < 0 \\Rightarrow 0`)], [K(`5 + 3 + 1 = 9`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'one'), wt('A3', 'two'), wt('A3', 'three'), wt('A4', 'four'), wt('A4', 'plus')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · inequalities in two variables', y0: 96, dy: 76, txt: [1, 1, 1, 0, 1],
  lines: ['<b>A line</b> ax + by = c cuts the plane into two half planes',
    '<b>Test point</b> (0, 0): true, shade its side · false, the other side',
    '<b>&lt; or &gt;</b>: dashed line &nbsp;·&nbsp; <b>≤ or ≥</b>: solid line',
    K(`${X_} + ${Y_} < 6:\\quad 0 + 0 < 6 \\;\\Rightarrow\\; \\text{shade the origin side}`),
    '<b>x &gt; 2</b> on the plane: every point right of the line x = 2'] });
const YQ = ['What does a dashed line tell you?', 'Which test point is the easiest to use?', 'For y > x, which side of the line y = x do you shade?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q.replace('>', '&gt;')}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 52', topic: '3 shirts, 4 pants: how many outfits? Fundamental Principle of Counting', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tL0 - 0.3, 1.05, 960, 560], [T0('L5') + 0.2, 1, 960, 540]]);
let lLast = -2;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  const nc = $('#nchip'), gh = $('#gh'); gh.style.left = (parseFloat(nc.style.left || 0) + nc.offsetWidth + 16).toFixed(1) + 'px';
  M.vis(gh, t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: -16, outDur: 0.01 });
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tI1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('I1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(hL, t, tMorph + 0.4, 0.8);
    fade(hA, t, wt('H4', 'splits'), 0.5, 0.9); fade(hB, t, wt('H4', 'splits') + 0.2, 0.5, 0.9);
    hLb.forEach((l, i) => M.vis(l, t, wt('H4', i === 2 ? 'two' : 'splits') + 0.2 + i * 0.2, 1e9, { dy: 0 }));
    M.vis(hAa, t, wt('H3', 'standing'), 1e9, DOT); M.vis(hAq, t, wt('H3', 'wonders'), 1e9, { dy: 0 });
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'which') - 0.1, 1e9, POP);
  }

  /* I */
  const iOn = t >= tI1 - 0.1 && t < tL1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('L1');
    M.vis($('#il'), t, tI1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#i0'), t, tI1 + 0.2, { st: 0.04 });
    PUC.write($('#i1'), t, wt('I2', 'equation') - 0.1, 0.7); PUC.write($('#i2'), t, wt('I3', 'Zero') - 0.1, 2.2); PUC.write($('#i3'), t, wt('I4', 'less') - 0.2, 0.7);
    M.vis($('#iP'), t, wt('I5', 'side') - 0.3, 1e9, POP);
    M.vis($('#ir'), t, tI1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(iP, t, wt('I1', 'two') , wt('I2', 'equation'), DOT); M.vis(iPl, t, wt('I1', 'two') + 0.2, wt('I2', 'equation'), { dy: 0 });
    M.draw(iGx, t, wt('I1', 'across') - 0.1, 0.5); M.draw(iGy, t, wt('I1', 'up') - 0.1, 0.5);
    const gO = 1 - M.io((t - wt('I2', 'equation')) / 0.3); iGx.style.opacity = iGy.style.opacity = gO.toFixed(3);
    iLn.run(t, wt('I2', 'straight') - 0.1, 0.8); iLn.dash(t >= wt('I4', 'less'));
    iDs.forEach((d, i) => M.vis(d, t, wt('I3', ['Zero', 'Two', 'Six'][i]), 1e9, DOT));
    M.vis(iSide, t, wt('I5', 'side') - 0.2, 1e9, { dy: 0 });
  }

  /* L: live test */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('S1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#lR'), t, tL1 + 0.3, 0.6);
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o }); lLn.run(t, tL1 + 0.4, 0.7);
    let cur = -1, g = 0, b = 0;
    LPTS.forEach(([x, y], i) => { const d = lDs[i], tp = tPt(i), tr = x + y < 6; M.vis(d, t, tp, 1e9, DOT);
      const u = M.io((t - tp - 0.25) / 0.25); attr(d.c, 'fill', mix('#FFFFFF', tr ? C.ok : C.red, u)); attr(d.c, 'stroke', mix(C.ink, '#FFFFFF', u));
      if (t >= tp) { cur = i; if (t >= tp + 0.25) { if (tr) g++; else b++; } } });
    if (cur !== lLast) { lLast = cur; if (cur >= 0) { const [x, y] = LPTS[cur], s = x + y, tr = s < 6; M.setT($('#lP'), `P = (${x}, ${y})`); M.setT($('#lS'), `x + y = ${s}`);
      $('#lV').innerHTML = `${M.icon(tr ? 'check' : 'x', 22, '#fff', 3)}${s} ${tr ? '<' : '≥'} 6 · ${tr ? 'TRUE' : 'FALSE'}`; $('#lV').style.background = tr ? C.ok : C.red; } }
    M.setT($('#lG'), `green ${g}`); M.setT($('#lB'), `red ${b}`);
    M.vis($('#lP'), t, tL0 - 0.1, 1e9, { dy: 10 }); M.vis($('#lS'), t, tL0, 1e9, { dy: 10 }); M.vis($('#lV'), t, tL0 + 0.2, 1e9, POP);
    M.vis($('#lG'), t, tL4a - 0.2, 1e9, POP); M.vis($('#lB'), t, tL4a - 0.1, 1e9, POP);
    fade(lReg, t, wt('L5', 'shade') - 0.2, 0.6, 0.85); M.hide(lRegT, true);
    M.vis($('#lPl'), t, wt('L5', 'answer') - 0.1, 1e9, POP);
  }

  /* S: shortcut */
  const sOn = t >= tS1 - 0.1 && t < tK1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#sl'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); ssol(t, tS1, tSs);
    M.vis($('#sr'), t, tS1 + 0.2, out, { dx: 60, dy: 0, ...o }); sLn.run(t, tS1 + 0.3, 0.6);
    M.vis(sO, t, tSs[1], 1e9, DOT); const r = M.clamp((t - tSs[1]) / 1.2); attr(sRing, 'r', (14 + 30 * r).toFixed(1)); sRing.style.opacity = t < tSs[1] ? 0 : (1 - r).toFixed(3);
    M.vis(sOt, t, tSs[2] + 0.3, 1e9, { dy: 0 }); fade(sReg, t, tSs[3], 0.6, 0.85);
  }

  /* K: strict vs slack + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kd'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kdF'), t, tK1 + 0.3, 0.5);
    fade(kdR, t, tK1 + 0.4, 0.5, 0.85); kdL.run(t, wt('K1', 'dashed') - 0.4, 0.7); M.vis(kdP, t, wt('K1', 'line') , 1e9, DOT); M.vis(kdT, t, wt('K1', 'count'), 1e9, { dy: 0 });
    M.vis($('#kdP'), t, wt('K1', 'dashed') - 0.1, 1e9, POP);
    M.vis($('#ks'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#ksF'), t, T0('K2') + 0.2, 0.5);
    fade(ksR, t, T0('K2') + 0.3, 0.5, 0.85); ksL.run(t, wt('K2', 'solid') - 0.5, 0.7); M.vis(ksP, t, wt('K2', 'line'), 1e9, DOT); M.vis(ksT, t, wt('K2', 'counts'), 1e9, { dy: 0 });
    M.vis($('#ksP'), t, wt('K2', 'solid') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Shade') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Zero') });
  }

  /* statement */
  const stOn = t >= tT && t < tV1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tV1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'which') - 0.1, 0.8);
  }

  /* V: one letter + think */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('W1');
    M.vis($('#vl'), t, tV1 + 0.3, out, { dx: -60, dy: 0, ...o }); PUC.write($('#vF'), t, wt('V1', 'Take'), 0.6);
    M.vis(vO, t, wt('V1', 'two') + 0.1, 1e9, DOT); M.draw(vRay, t, wt('V2', 'ray') - 0.3, 0.6); M.vis($('#vlP'), t, wt('V2', 'ray'), 1e9, POP);
    M.vis($('#vr'), t, wt('V2', 'plane') - 0.2, out, { dx: 60, dy: 0, ...o }); vLn.run(t, wt('V2', 'line') - 0.1, 0.6); M.vis(vLt, t, wt('V2', 'equals'), 1e9, { dy: 0 });
    fade(vReg, t, wt('V2', 'right') - 0.1, 0.6, 0.85); M.vis($('#vrP'), t, wt('V2', 'whole') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tV3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV3, tOpts: wt('V3', 'Shade') - 0.1, tCount: T1('V3') + 0.05, dur: 3, tAns: T0('V4') - 0.02, tWhy: wt('V4', 'Every') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#wq'), t, T0('W2') + 0.3, 0.7); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wLn.run(t, tWs[0], 0.8); wLn.dash(t >= wt('W4', 'dashed') - 0.1);
    wI.forEach(d => M.vis(d.g, t, d.t, 1e9, DOT));
    M.vis(wO, t, tWs[2], 1e9, DOT); M.hide(wOt, true);
    fade(wReg, t, tWs[3], 0.6, 0.85); M.vis(wRt, t, wt('W6', 'half'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'below') - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'test') - 0.1, tRight: tR });
    tLn.run(t, tX1 + 0.3, 0.6);
    const wr = M.io((t - wt('X2', 'shade')) / 0.4) * (1 - M.io((t - tR) / 0.4)); tWr.style.opacity = (0.95 * wr).toFixed(3); M.hide(tWr, wr < 0.01);
    fade(tRt, t, tR, 0.5, 0.85); M.vis(tO, t, wt('X3', 'origin') - 0.1, 1e9, DOT);
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'same') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
