// PUC Maths Ep 20: Rational and modulus functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: position / input x violet, distance |x| / output coral, domain blue, excluded / wrong red, the shift k coral
const XC = C.violet, RC = C.ac, AC = '#2F6FEB';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);
const axes = (svg, o) => {
  const X = v => o.ox + v * o.sx, Y = v => o.oy - v * o.sy;
  mk(svg, 'line', { x1: X(o.x0), y1: o.oy, x2: X(o.x1), y2: o.oy, stroke: C.ink, 'stroke-width': 2.5 }); mk(svg, 'path', { d: `M${X(o.x1) + 4},${o.oy} l-14,-7 v14 z`, fill: C.ink });
  mk(svg, 'line', { x1: o.ox, y1: Y(o.y0), x2: o.ox, y2: Y(o.y1), stroke: C.ink, 'stroke-width': 2.5 }); mk(svg, 'path', { d: `M${o.ox},${Y(o.y1) - 4} l-7,14 h14 z`, fill: C.ink });
  (o.xt || []).forEach(v => { mk(svg, 'line', { x1: X(v), y1: o.oy - 6, x2: X(v), y2: o.oy + 6, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), o.oy + 30, v, { 'text-anchor': 'middle', 'font-size': 17, fill: C.ink, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { mk(svg, 'line', { x1: o.ox - 6, y1: Y(v), x2: o.ox + 6, y2: Y(v), stroke: C.ink, 'stroke-width': 2 }); txt(svg, o.ox - 12, Y(v) + 6, v, { 'text-anchor': 'end', 'font-size': 17, fill: C.ink, 'font-weight': 600 }); });
  if (o.lab !== false) { txt(svg, X(o.x1) - 2, o.oy - 14, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: XC, 'font-weight': 600 });
    txt(svg, o.ox + 14, Y(o.y1) + 16, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: RC, 'font-weight': 600 }); }
  const path = (f, a, b, n = 120) => { let d = '', on = false; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); if (!isFinite(y) || y > o.y1 + 0.3 || y < o.y0 - 0.3) { on = false; continue; } d += (on ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1); on = true; } return d; };
  return { X, Y, path };
};
// a road / number line with home at 0: returns X()
const road = (svg, y, ox = 392, sx = 80, lo = -4, hi = 4) => {
  const X = v => ox + v * sx;
  mk(svg, 'line', { x1: X(lo) - 30, y1: y, x2: X(hi) + 30, y2: y, stroke: C.ink, 'stroke-width': 3 });
  for (let v = lo; v <= hi; v++) { mk(svg, 'line', { x1: X(v), y1: y - 8, x2: X(v), y2: y + 8, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), y + 38, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
  return X;
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tM1 = T0('M1'), tL1 = T0('L1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tR1 = T0('R1'), tR6 = T0('R6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['RIDE 3 KM EAST', '3 km from home'], ['RIDE 3 KM WEST', '3 km from home'], ['DISTANCE', 'never negative']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'east'), wt('H2', 'west'), wt('H2', 'Not')];

/* ---------- H: the road ---------- */
const hs = $('#hS'), HY = 380, HX = road(hs, HY, 392, 80);
const hHome = mk(mk(hs, 'g', {}), 'g', {}); mk(hHome, 'rect', { x: HX(0) - 22, y: HY - 66, width: 44, height: 34, rx: 4, fill: C.ink }); mk(hHome, 'path', { d: `M${HX(0) - 30},${HY - 64} L${HX(0)},${HY - 90} L${HX(0) + 30},${HY - 64} Z`, fill: C.ink }); txt(hHome, HX(0), HY - 100, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 700, 'letter-spacing': 1.5 });
txt(hs, HX(-4) - 30, HY + 80, 'WEST · NEGATIVE', { 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1 });
txt(hs, HX(4) + 30, HY + 80, 'EAST · POSITIVE', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1 });
const hBar = mk(hs, 'line', { y1: HY - 30, y2: HY - 30, stroke: RC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const hDot = mk(hs, 'circle', { cy: HY, r: 14, fill: XC, stroke: '#fff', 'stroke-width': 3 });
const tE0 = tMorph + 0.3, tE1 = tMorph + 1.3, tW0 = wt('H2', 'west') - 0.2, tW1e = wt('H2', 'still');
const hxOf = t => t < tW0 ? 3 * M.io((t - tE0) / Math.max(0.6, tE1 - tE0)) : 3 - 6 * M.io((t - tW0) / Math.max(0.8, tW1e - tW0));

/* ---------- M: modulus definition ---------- */
$('#mF').innerHTML = K(`${rc('|')}${xc('x')}${rc('|')} = \\begin{cases} \\ ${xc('x')}, & ${xc('x')} \\ge 0 \\\\ -${xc('x')}, & ${xc('x')} < 0 \\end{cases}`);
const MR = [['IF x IS NEGATIVE, SAY -3', K(`-${xc('x')} = -(${xc('-3')}) = ${rc('3')}`)], ['DOMAIN AND RANGE', K(`${ac('\\mathbb{R}')} \\ \\to \\ ${rc('[0, \\infty)')}`)]];
$('#mRows').innerHTML = MR.map(([k, v], i) => `<div class="st" id="ms${i}" style="top:${290 + i * 112}px"><div class="sk">${k}</div><div class="sv">${v}</div></div>`).join('');
const ms = $('#mS'), MY = 330, MX = road(ms, MY, 392, 80);
const mHome = txt(ms, MX(0), MY - 70, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 700, 'letter-spacing': 1.5 });
const mBar = mk(ms, 'line', { y1: MY - 34, y2: MY - 34, stroke: RC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const mDot = mk(ms, 'circle', { cy: MY, r: 14, fill: XC, stroke: '#fff', 'stroke-width': 3 });
const mLab = txt(ms, 0, MY - 50, '', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 700 });
const mXl = txt(ms, 0, MY + 76, '', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 700 });
const mxOf = t => { const a = wt('M2', 'distance'), b = wt('M3', 'zero'), c = wt('M3', 'negative'), d = wt('M4', 'three'); let x = -3 * M.io((t - a + 0.3) / 0.6); x += 5 * M.io((t - b) / 0.6); x += -5 * M.io((t - c) / 0.6); return x; };

/* ---------- L: live V and sliding k ---------- */
const ls = $('#lS'), la = axes(ls, { ox: 392, oy: 470, sx: 80, sy: 80, x0: -4.6, x1: 4.6, y0: -0.6, y1: 4.9, xt: [-4, -2, 2, 4], yt: [1, 2, 3, 4] });
const lCur = mk(ls, 'path', { d: '', fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const lDot = mk(ls, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const lVg = mk(ls, 'line', { stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const lKm = mk(mk(ls, 'g', {}), 'g', {}); mk(lKm, 'circle', { cx: 0, cy: 470, r: 10, fill: '#fff', stroke: RC, 'stroke-width': 4 }); const lKt = txt(lKm, 0, 470 + 56, 'k', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: RC, 'font-weight': 700 });
$('#lA0').innerHTML = K(`y = -${xc('x')}`); $('#lA1').innerHTML = K(`y = ${xc('x')}`);
const tLx0 = wt('L2', 'west'), tLx1 = T1('L2');
const lxOf = t => -4 + 8 * M.clamp((t - tLx0) / (tLx1 - tLx0));
const tK0 = wt('L4', 'slide'), tKe = T1('L4') + 0.3;
const kOf = t => { const u = M.clamp((t - tK0) / Math.max(1.2, tKe - tK0)); return u < 0.55 ? 2 * M.io(u / 0.55) : 2 - 3.5 * M.io((u - 0.55) / 0.45); };
let lLast = '';

/* ---------- K: identity vs modulus ---------- */
$('#kaF').innerHTML = K(`${xc('-3')} \\ \\to \\ ${xc('-3')}`); $('#kbF').innerHTML = K(`${xc('-3')} \\ \\to \\ ${rc('3')}`);
const kAx = svg => axes(svg, { ox: 392, oy: 380, sx: 62, sy: 46, x0: -4.6, x1: 4.6, y0: -3.6, y1: 3.9, xt: [-3, 3], yt: [-3, 3] });
const kas = $('#kaS'), kaA = kAx(kas), kbs = $('#kbS'), kbA = kAx(kbs);
const kaL = mk(kas, 'path', { d: kaA.path(x => x, -3.5, 3.6), fill: 'none', stroke: XC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const kbL = mk(kbs, 'path', { d: kbA.path(x => Math.abs(x), -3.6, 3.6), fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const kaP = mk(kas, 'circle', { cx: kaA.X(-3), cy: kaA.Y(-3), r: 10, fill: XC, stroke: '#fff', 'stroke-width': 3 });
const kbP = mk(kbs, 'circle', { cx: kbA.X(-3), cy: kbA.Y(3), r: 10, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const kbG = mk(kbs, 'path', { d: kbA.path(x => x, 0, 3.6), fill: 'none', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const kbGt = txt(kbs, kbA.X(3.6), kbA.Y(3.6) + 34, 'same for x ≥ 0', { 'text-anchor': 'end', 'font-size': 17, fill: C.ink2, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: `Is ${K('|x| = x')} for every real number ${K('x')}?`, opts: ['Yes', 'No'], right: 1, why: `Only when ${K('x \\ge 0')}. For ${K('x = -2')}: ${K('|x| = 2')}, but ${K('x = -2')}.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\lvert ${xc('-3')} \\rvert = ${rc('3')} \\qquad\\qquad \\lvert ${xc('3')} \\rvert = ${rc('3')}`);

/* ---------- R: rational, 1/x ---------- */
$('#rF').innerHTML = K(`\\dfrac{f(${xc('x')})}{g(${xc('x')})}, \\quad g(${xc('x')}) \\ne 0`);
const RT = [['1', '1'], ['0.1', '10'], ['0.01', '100']];
$('#rRows').innerHTML = RT.map(([a, b], i) => `<div class="tb" id="rt${i}" style="top:${206 + i * 82}px"><div class="tx">x = ${a}</div><div class="ta">→</div><div class="tv">1/x = ${b}</div></div>`).join('');
$('#rD').innerHTML = K(`y = \\dfrac{1}{${xc('x')}}: \\ \\text{domain } ${ac('\\mathbb{R} - \\{0\\}')}`);
const rs = $('#rS'), ra = axes(rs, { ox: 392, oy: 320, sx: 80, sy: 36, x0: -4.6, x1: 4.6, y0: -6, y1: 6.4, xt: [-4, -2, 2, 4], yt: [-4, 4] });
const rR = mk(rs, 'path', { d: '', fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rL = mk(rs, 'path', { d: ra.path(x => 1 / x, -4.5, -1 / 6.3, 200), fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const rDot = mk(rs, 'circle', { r: 11, fill: XC, stroke: '#fff', 'stroke-width': 3 });
const rHug = [mk(rs, 'line', { x1: ra.X(-4.5), y1: ra.Y(0), x2: ra.X(4.5), y2: ra.Y(0), stroke: C.ac2, 'stroke-width': 14, 'stroke-linecap': 'round' }), mk(rs, 'line', { x1: ra.X(0), y1: ra.Y(-5.8), x2: ra.X(0), y2: ra.Y(6.2), stroke: C.ac2, 'stroke-width': 14, 'stroke-linecap': 'round' })];
rHug.forEach(l => rs.insertBefore(l, rs.firstChild));
const rNo = txt(rs, ra.X(0) + 16, ra.Y(-4.6), 'never touches the axes', { 'font-size': 17, fill: C.red, 'font-weight': 700 });
const tRx = [wt('R3', 'one', 1), wt('R3', 'tenth'), wt('R3', 'hundredth')];
const rxOf = t => { const t0 = T0('R3'), t1 = wt('R3', 'hundredth') + 0.5; const u = M.clamp((t - t0) / (t1 - t0)); return Math.pow(10, 0.6 - 2.6 * M.io(u)); };
let rLast = '';
const th2 = PUC.think($('#th2'), { q: `Is 0 in the range of ${K('\\dfrac{1}{x}')}?`, opts: ['Yes', 'No'], right: 1, why: `One divided by any number is never 0. The range of ${K('\\tfrac{1}{x}')} is ${K(rc('\\mathbb{R} - \\{0\\}'))}.` });

/* ---------- W: |x - 2| = 5 ---------- */
$('#wq').innerHTML = `Solve &nbsp;${K(`|${xc('x')} - 2| = 5`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`|${xc('x')} - 2|`) + ' = distance of ' + K(xc('x')) + ' from 2'],
  [K(`${xc('x')} - 2 \\ge 0: \\ ${xc('x')} - 2 = 5 \\Rightarrow ${xc('x')} = ${rc('7')}`)],
  [K(`${xc('x')} - 2 < 0: \\ -(${xc('x')} - 2) = 5 \\Rightarrow ${xc('x')} = ${rc('-3')}`)],
  [K(`\\lvert 7 - 2 \\rvert = 5, \\quad \\lvert -3 - 2 \\rvert = \\lvert -5 \\rvert = 5`)],
  [K(`${xc('x')} = ${rc('7')} \\ \\text{ or } \\ ${xc('x')} = ${rc('-3')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 82 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'distance'), wt('W4', 'If'), wt('W5', 'If'), wt('W6', 'Check'), wt('W7', 'Two')];
const ws = $('#wS'), WXr = road(ws, 470, 392, 44, -4, 8);
const wC = mk(ws, 'circle', { cx: WXr(2), cy: 470, r: 12, fill: C.ink });
const wArc = [7, -3].map(v => mk(ws, 'path', { d: `M${WXr(2)},450 Q${(WXr(2) + WXr(v)) / 2},${300} ${WXr(v)},450`, fill: 'none', stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '2 0' }));
const wFive = [7, -3].map(v => txt(ws, (WXr(2) + WXr(v)) / 2, 360, '5 away', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 700 }));
const wEnd = [7, -3].map(v => mk(ws, 'circle', { cx: WXr(v), cy: 470, r: 13, fill: RC, stroke: '#fff', 'stroke-width': 3 }));
// V graph y = |x - 2| above
const wa2 = axes(ws, { ox: WXr(0), oy: 250, sx: 44, sy: 26, x0: -4.6, x1: 8.6, y0: -0.4, y1: 6.2, xt: [], yt: [5], lab: false });
const wV = mk(ws, 'path', { d: wa2.path(x => Math.abs(x - 2), -4.3, 8.3), fill: 'none', stroke: RC, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const wH5 = mk(ws, 'line', { x1: wa2.X(-4.3), y1: wa2.Y(5), x2: wa2.X(8.3), y2: wa2.Y(5), stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wHits = [7, -3].map(v => mk(ws, 'circle', { cx: wa2.X(v), cy: wa2.Y(5), r: 9, fill: RC, stroke: '#fff', 'stroke-width': 2 }));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\sqrt{x^2} = x`), right: K(`\\sqrt{x^2} = |x|`) + '&nbsp; for ' + K('x = -4') + ': ' + K('\\sqrt{16} = 4') });
const ts = $('#tS'), ta = axes(ts, { ox: 270, oy: 210, sx: 34, sy: 40, x0: -5, x1: 5, y0: -1.4, y1: 4.6, xt: [-4, 4], yt: [], lab: false });
const tWr = mk(ts, 'path', { d: ta.path(x => x, -1.2, 4.3), fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const tRt = mk(ts, 'path', { d: ta.path(x => Math.abs(x), -4.3, 4.3), fill: 'none', stroke: C.ok, 'stroke-width': 5, 'stroke-linejoin': 'round' });
const tP = mk(ts, 'circle', { cx: ta.X(-4), cy: ta.Y(4), r: 9, fill: C.ok });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Count the real solutions of an equation with mod. Boards: domain and range.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`|x - 1| + |x - 3| = 2`)}<br>How many real solutions does it have?`,
  opts: ['0', '1', '2', 'Infinitely many'], right: 3, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`|x - 1|`) + ': distance from 1'], [K(`|x - 3|`) + ': distance from 3'], ['1 and 3 are 2 apart'], [K(`1 \\le x \\le 3: \\text{ sum} = 2`)], ['Every x in ' + K('[1, 3]') + ' works']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Read'), wt('A2', 'Mod', 1), wt('A3', 'two'), wt('A4', 'any'), wt('A5', 'every')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · rational and modulus', y0: 100, dy: 78, txt: [0, 0, 1, 0, 0],
  lines: [K(`|${xc('x')}| = ${xc('x')} \\ (${xc('x')} \\ge 0), \\qquad |${xc('x')}| = -${xc('x')} \\ (${xc('x')} < 0)`),
    K(`|${xc('x')}|: \\ \\text{domain } ${ac('\\mathbb{R}')},\\ \\text{range } ${rc('[0, \\infty)')}`),
    `${K('|x - k|')} is the distance of x from k. And ${K('\\sqrt{x^2} = |x|')}`,
    K(`\\text{Rational: } f(x)/g(x),\\ g(x) \\ne 0`),
    K(`1/x: \\ \\text{domain } ${ac('\\mathbb{R} - \\{0\\}')},\\ \\text{range } ${rc('\\mathbb{R} - \\{0\\}')}`)] });
const YQ = [`What is ${K('\\lvert -7 \\rvert')}?`, `What is the domain of ${K('1/(x - 4)')}?`, `Solve ${K('|x + 1| = 3')}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 21', topic: 'Is 16.9 years old still 16? Signum and Greatest Integer', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L4') - 0.2, 1.04, 960, 540], [T1('L4') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the ride */
  const hOn = t >= tMorph && t < tM1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('M1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const x = hxOf(t);
    M.vis($('#hX'), t, tMorph + 0.3, 1e9, { dy: 14 }); M.vis($('#hD'), t, tMorph + 0.45, 1e9, { dy: 14 });
    M.setT($('#hXv'), f1(x)); M.setT($('#hDv'), f1(Math.abs(x)));
    attr(hDot, 'cx', HX(x).toFixed(1)); attr(hBar, 'x1', HX(0)); attr(hBar, 'x2', HX(x).toFixed(1)); M.hide(hBar, Math.abs(x) < 0.05);
    M.vis(hHome, t, tMorph + 0.3, 1e9, { dy: 0 });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Direction') - 0.1, 1e9, POP);
  }

  /* M: modulus definition */
  const mOn = t >= tM1 - 0.1 && t < tL1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('L1');
    M.vis($('#ml'), t, T0('M2') - 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#mF'), t, wt('M2', 'written') - 0.1, 1.2);
    M.vis($('#ms0'), t, wt('M4', 'If') - 0.1, 1e9, { dy: 14 }); M.vis($('#ms1'), t, wt('M5', 'domain') - 0.1, 1e9, { dy: 14 });
    M.vis($('#mr'), t, tM1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const x = mxOf(t); M.vis(mHome, t, tM1 + 0.5, 1e9, { dy: 0 });
    attr(mDot, 'cx', MX(x).toFixed(1)); M.vis(mDot, t, wt('M1', 'position') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    attr(mBar, 'x1', MX(0)); attr(mBar, 'x2', MX(x).toFixed(1)); const bo = M.clamp((t - wt('M2', 'distance')) / 0.3); mBar.style.opacity = bo.toFixed(3); M.hide(mBar, bo <= 0 || Math.abs(x) < 0.05);
    attr(mLab, 'x', MX(x / 2).toFixed(1)); M.setT(mLab, `|x| = ${f1(Math.abs(x))}`); mLab.style.opacity = bo.toFixed(3); M.hide(mLab, bo <= 0 || Math.abs(x) < 0.3);
    attr(mXl, 'x', MX(x).toFixed(1)); M.setT(mXl, `x = ${f1(x)}`); M.vis(mXl, t, wt('M1', 'position'), 1e9, { dy: 0 });
    M.setT($('#mRd'), x < -0.01 ? 'x < 0: use -x' : 'x ≥ 0: use x'); M.vis($('#mRd'), t, wt('M3', 'zero') - 0.2, 1e9, POP);
  }

  /* L: live V + sliding k */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lX'), t, tL1 + 0.3, 1e9, { dy: 14 }); M.vis($('#lY'), t, tL1 + 0.45, 1e9, { dy: 14 });
    M.vis($('#lg0'), t, wt('L3', 'left') - 0.1, 1e9, { dy: 14 }); M.vis($('#lg1'), t, wt('L3', 'right') - 0.1, 1e9, { dy: 14 }); M.vis($('#lg2'), t, T0('L4') - 0.1, 1e9, { dy: 14 });
    M.vis($('#lp'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const x = lxOf(t), k = kOf(t), drawn = t < tK0 ? x : 4, key = `${x.toFixed(2)}|${k.toFixed(2)}`;
    if (key !== lLast) { lLast = key;
      attr(lCur, 'd', drawn > -3.99 ? la.path(v => Math.abs(v - k), -4, Math.min(4.4, drawn + (t < tK0 ? 0 : 0.4)), 160) : '');
      M.setT($('#lXv'), f1(t < tK0 ? x : 4)); M.setT($('#lYv'), f1(Math.abs((t < tK0 ? x : 4) - k)));
      $('#lK').innerHTML = K(+f1(k) < 0 ? `y = |${xc('x')} + ${rc(f1(-k))}|` : `y = |${xc('x')} - ${rc(f1(k))}|`); attr(lKm.parentNode, 'transform', `translate(${la.X(k).toFixed(1)},0)`); }
    const on = M.clamp((t - tLx0 + 0.3) / 0.3) * (1 - M.clamp((t - tK0 + 0.3) / 0.3));
    attr(lDot, 'cx', la.X(x).toFixed(1)); attr(lDot, 'cy', la.Y(Math.abs(x)).toFixed(1)); lDot.style.opacity = on.toFixed(3); M.hide(lDot, on <= 0);
    attr(lVg, 'x1', la.X(x).toFixed(1)); attr(lVg, 'x2', la.X(x).toFixed(1)); attr(lVg, 'y1', la.Y(0)); attr(lVg, 'y2', la.Y(Math.abs(x)).toFixed(1)); lVg.style.opacity = on.toFixed(3); M.hide(lVg, on <= 0);
    M.vis(lKm, t, tK0 - 0.4, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(kaL, t, wt('K1', 'identity') - 0.1, 0.8); PUC.write($('#kaF'), t, wt('K1', 'Minus') - 0.1, 0.7); M.vis(kaP, t, wt('K1', 'stays') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(kbL, t, wt('K2', 'modulus') - 0.1, 0.8); PUC.write($('#kbF'), t, wt('K2', 'Minus') - 0.1, 0.7); M.vis(kbP, t, wt('K2', 'becomes') - 0.1, 1e9, POP);
    M.draw(kbG, t, wt('K2', 'positive') - 0.1, 0.6); M.vis(kbGt, t, wt('K2', 'agree') - 0.1, 1e9, { dy: 0 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'every') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Only') });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Modulus') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'throws') - 0.2, 0.8);
  }

  /* R: rational */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R6');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#rF'), t, wt('R1', 'polynomial') - 0.1, 0.9);
    RT.forEach((_, i) => M.vis($('#rt' + i), t, tRx[i] - 0.1, 1e9, { dy: 14 }));
    PUC.write($('#rD'), t, wt('R2', 'domain') - 0.1, 0.9);
    M.vis($('#rp'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const x = rxOf(t), key = x.toFixed(3);
    if (key !== rLast) { rLast = key; attr(rR, 'd', ra.path(v => 1 / v, Math.max(x, 1 / 6.3), 4.5, 200)); M.setT($('#rRd'), `x = ${x < 0.1 ? x.toFixed(2) : x.toFixed(1)}  →  1/x = ${(1 / x).toFixed(1)}`); }
    M.vis(rR, t, T0('R3') - 0.1, 1e9, { dy: 0 }); M.vis($('#rRd'), t, T0('R3'), 1e9, POP);
    const dv = M.clamp((t - T0('R3') + 0.1) / 0.3) * (1 - M.clamp((t - T0('R4')) / 0.3)), yy = Math.min(6.3, 1 / x);
    attr(rDot, 'cx', ra.X(x).toFixed(1)); attr(rDot, 'cy', ra.Y(yy).toFixed(1)); rDot.style.opacity = dv.toFixed(3); M.hide(rDot, dv <= 0);
    M.vis(rNo, t, wt('R4', 'never') - 0.1, 1e9, { dy: 0 });
    M.draw(rL, t, wt('R4', 'left') - 0.1, 0.9);
    rHug.forEach(l => M.vis(l, t, wt('R5', 'hugs') - 0.1, 1e9, { dy: 0, fade: 0.3 }));
    M.vis($('#th2'), t, tR6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tR6, tOpts: wt('R6', 'range') - 0.1, tCount: T1('R6') + 0.05, dur: 3, tAns: T0('R7') - 0.02, tWhy: wt('R7', 'One') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(wC, t, wt('W3', 'two') - 0.1, 1e9, POP);
    [0, 1].forEach(i => { M.draw(wArc[i], t, wt(i ? 'W5' : 'W4', 'So') - 0.1, 0.6); M.vis(wFive[i], t, wt(i ? 'W5' : 'W4', 'So') + 0.3, 1e9, { dy: 0 }); M.vis(wEnd[i], t, wt(i ? 'W5' : 'W4', i ? 'minus' : 'seven', i ? 1 : 0) - 0.1, 1e9, POP); });
    M.draw(wV, t, wt('W7', 'arms') - 0.6, 0.8); M.draw(wH5, t, wt('W7', 'arms') - 0.2, 0.5); wHits.forEach(c => M.vis(c, t, wt('W7', 'arms') + 0.3, 1e9, POP));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'try') - 0.1, tRight: wt('X3', 'mod') - 0.4 });
    M.draw(tWr, t, wt('X2', 'cancel') - 0.1, 0.7); M.draw(tRt, t, wt('X3', 'sixteen', 1) - 0.1, 0.8); M.vis(tP, t, wt('X3', 'four') - 0.1, 1e9, POP);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'equations') });
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
