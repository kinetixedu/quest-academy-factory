// PUC Maths Ep 19: Constant, identity and polynomial functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: input x violet, output f(x) / curve coral, the constant c / coefficients coral, domain blue, not-polynomial red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
Object.assign(M.IC, {
  bus: ['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10H4z', 'M4 11h16', 'M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3', 'M17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3'],
  mirror: ['M12 3a6 8 0 1 0 0.01 0', 'M12 19v3', 'M9 22h6', 'M10 7l-2 3'],
  square: ['M4 4h16v16H4z'],
});
// generic axes: o = {ox, oy, sx, sy, x0, x1, y0, y1, xt, yt}
const axes = (svg, o) => {
  const X = v => o.ox + v * o.sx, Y = v => o.oy - v * o.sy;
  mk(svg, 'line', { x1: X(o.x0), y1: o.oy, x2: X(o.x1), y2: o.oy, stroke: C.ink, 'stroke-width': 2.5 }); mk(svg, 'path', { d: `M${X(o.x1) + 4},${o.oy} l-14,-7 v14 z`, fill: C.ink });
  mk(svg, 'line', { x1: o.ox, y1: Y(o.y0), x2: o.ox, y2: Y(o.y1), stroke: C.ink, 'stroke-width': 2.5 }); mk(svg, 'path', { d: `M${o.ox},${Y(o.y1) - 4} l-7,14 h14 z`, fill: C.ink });
  (o.xt || []).forEach(v => { mk(svg, 'line', { x1: X(v), y1: o.oy - 6, x2: X(v), y2: o.oy + 6, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), o.oy + 30, v, { 'text-anchor': 'middle', 'font-size': 17, fill: C.ink, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { mk(svg, 'line', { x1: o.ox - 6, y1: Y(v), x2: o.ox + 6, y2: Y(v), stroke: C.ink, 'stroke-width': 2 }); txt(svg, o.ox - 12, Y(v) + 6, v, { 'text-anchor': 'end', 'font-size': 17, fill: C.ink, 'font-weight': 600 }); });
  txt(svg, X(o.x1) - 2, o.oy - 14, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: XC, 'font-weight': 600 });
  txt(svg, o.ox + 14, Y(o.y1) + 16, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: RC, 'font-weight': 600 });
  const path = (f, a, b, n = 100) => { let d = '', on = false; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); if (y > o.y1 + 0.3 || y < o.y0 - 0.3) { on = false; continue; } d += (on ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1); on = true; } return d; };
  return { X, Y, path };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tC1 = T0('C1'), tI1 = T0('I1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tP1 = T0('P1'), tG1 = T0('G1'), tZ1 = T0('Z1'), tZ2 = T0('Z2');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tP1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['BUS FARE', 'same every ride'], ['MIRROR', 'copies you'], ['SQUARE PLOT', 'area = side²']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'flat'), wt('H2', 'mirror'), wt('H3', 'square')];

/* ---------- H ---------- */
const HR = [['bus', 'THE BUS FARE', '1 stop or 10 stops', K(`f(${xc('x')}) = ${rc('c')}`)], ['mirror', 'THE MIRROR', 'what goes in comes out', K(`f(${xc('x')}) = ${xc('x')}`)], ['square', 'THE SQUARE PLOT', 'side s, area s²', K(`A(${xc('s')}) = ${xc('s')}^2`)]];
$('#hRows').innerHTML = HR.map(([ic, n, v, f], i) => `<div class="er" id="he${i}" style="top:${88 + i * 136}px"><i>${M.icon(ic, 34, C.ink2, 2.2)}</i><div class="en">${n}</div><div class="ev">${v}</div><div class="ef">${f}</div></div>`).join('');
const tHe = [wt('H1', 'fare'), wt('H2', 'mirror'), wt('H3', 'square')], tHf = wt('H5', 'constant');

/* ---------- C: constant function ---------- */
$('#cF').innerHTML = K(`f(${xc('x')}) = ${rc('c')}`);
$('#cRows').innerHTML = [['2'], ['-5'], ['100']].map(([a], i) => `<div class="io" id="cr${i}" style="top:${182 + i * 86}px"><div class="ii">x = ${a}</div><div class="ia">→</div><div class="iv">c</div></div>`).join('');
$('#cD').innerHTML = K(`\\text{Domain} = ${ac('\\mathbb{R}')}, \\quad \\text{Range} = \\{${rc('c')}\\}`);
const cs = $('#cS'), ca = axes(cs, { ox: 392, oy: 330, sx: 72, sy: 46, x0: -4.5, x1: 4.6, y0: -4.4, y1: 4.6, xt: [-4, -2, 2, 4], yt: [-4, -2, 2, 4] });
const cLine = mk(cs, 'line', { x1: ca.X(-4.3), x2: ca.X(4.3), stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const cLab = txt(cs, ca.X(4.3), 0, '', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: RC, 'font-weight': 600 });
const cPts = [2, -3].map(v => mk(cs, 'circle', { r: 9, fill: XC, stroke: '#fff', 'stroke-width': 2 }));
const tCs0 = wt('C4', 'Change'), tCs1 = T1('C4');
const cOf = t => { if (t < tCs0) return 3; const u = (t - tCs0) / Math.max(1, tCs1 - tCs0); return u < 0.5 ? 3 - 5 * M.io(u / 0.5) : -2 + 4 * M.io((u - 0.5) / 0.5); };
let cLast = '';

/* ---------- I: identity function ---------- */
$('#iF').innerHTML = K(`f(${xc('x')}) = ${xc('x')}`);
$('#iRows').innerHTML = [['2', '2'], ['-3', '-3'], ['0.5', '0.5']].map(([a, b], i) => `<div class="io" id="ir${i}" style="top:${182 + i * 86}px"><div class="ii">x = ${a}</div><div class="ia">→</div><div class="iv">${b}</div></div>`).join('');
$('#iD').innerHTML = K(`\\text{Domain} = ${ac('\\mathbb{R}')}, \\quad \\text{Range} = ${rc('\\mathbb{R}')}`);
const is = $('#iS'), ia = axes(is, { ox: 392, oy: 320, sx: 60, sy: 52, x0: -5.4, x1: 5.6, y0: -4.4, y1: 4.6, xt: [-4, -2, 2, 4], yt: [-4, -2, 2, 4] });
const iLine = mk(is, 'line', { x1: ia.X(-4.2), y1: ia.Y(-4.2), x2: ia.X(4.3), y2: ia.Y(4.3), stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const iVg = mk(is, 'line', { stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), iHg = mk(is, 'line', { stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const iDot = mk(is, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const iLab = txt(is, 0, 0, '', { 'font-size': 20, fill: RC, 'font-weight': 600 });
const tIx = [wt('I3', 'two'), wt('I3', 'minus')];
const ixOf = t => { if (t < tIx[0] - 0.6) return 0; if (t < tIx[1] - 0.6) return 2 * M.io((t - tIx[0] + 0.6) / 0.6); return 2 - 5 * M.io((t - tIx[1] + 0.6) / 0.8); };
let iLast = '';

/* ---------- K: side by side ---------- */
const kAx = (svg) => axes(svg, { ox: 300, oy: 290, sx: 52, sy: 40, x0: -4.4, x1: 8, y0: -4.5, y1: 5.6, xt: [-3, 3, 6], yt: [-3, 3] });
const kas = $('#kaS'), kaA = kAx(kas), kbs = $('#kbS'), kbA = kAx(kbs);
const kaL = mk(kas, 'line', { x1: kaA.X(-4.2), y1: kaA.Y(4), x2: kaA.X(7.6), y2: kaA.Y(4), stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const kbL = mk(kbs, 'line', { x1: kbA.X(-4.2), y1: kbA.Y(-4.2), x2: kbA.X(5.4), y2: kbA.Y(5.4), stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const kaT = txt(kas, kaA.X(7.6), kaA.Y(4) - 16, 'y = 4', { 'text-anchor': 'end', 'font-size': 20, fill: RC, 'font-weight': 600 });
const kbT = txt(kbs, kbA.X(5.4) - 10, kbA.Y(5.4) + 4, 'y = x', { 'text-anchor': 'end', 'font-size': 20, fill: RC, 'font-weight': 600 });
// one-step staircase on the identity line
const kbStep = mk(kbs, 'path', { d: `M${kbA.X(1)},${kbA.Y(1)} H${kbA.X(2)} V${kbA.Y(2)} H${kbA.X(3)} V${kbA.Y(3)}`, fill: 'none', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const kaD = [-3, 0, 3, 6].map(v => mk(kas, 'circle', { cx: kaA.X(v), cy: kaA.Y(4), r: 9, fill: XC, stroke: '#fff', 'stroke-width': 2 }));
const th1 = PUC.think($('#th1'), { q: `${K('f(x) = 5')}. What is its range?`, opts: [K('\\mathbb{R}'), K('\\{5\\}')], right: 1, why: `Every input gives 5, so the range is ${K('\\{5\\}')}: one element, not all of R.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`f(${xc('x')}) = ${rc('c')} \\qquad\\qquad f(${xc('x')}) = ${xc('x')}`);

/* ---------- P: polynomial definition + square plot ---------- */
$('#pF').innerHTML = K(`f(${xc('x')}) = ${rc('a_0')} + ${rc('a_1')}${xc('x')} + ${rc('a_2')}${xc('x')}^2 + \\dots + ${rc('a_n')}${xc('x')}^{n}`);
const sqs = $('#sqS'), S0 = 120, SX = 80, SY = 100;
const sqBig = mk(sqs, 'rect', { x: SX, y: SY, width: 2 * S0 * 1.4, height: 2 * S0 * 1.4, fill: C.ac3, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const sqQ = [[1, 0], [0, 1], [1, 1]].map(([a, b]) => mk(sqs, 'rect', { x: SX + a * S0 * 1.4, y: SY + b * S0 * 1.4, width: S0 * 1.4, height: S0 * 1.4, fill: C.ac2, stroke: RC, 'stroke-width': 2 }));
const sq1 = mk(sqs, 'rect', { x: SX, y: SY, width: S0 * 1.4, height: S0 * 1.4, fill: '#E7EEFD', stroke: AC, 'stroke-width': 3 });
const sqL1 = txt(sqs, SX + S0 * 0.7, SY - 12, 's', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: XC, 'font-weight': 600 });
const sqL2 = txt(sqs, SX + S0 * 1.4, SY + 2 * S0 * 1.4 + 34, '2s', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: XC, 'font-weight': 600 });
const sqN = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([a, b], i) => txt(sqs, SX + (a + 0.5) * S0 * 1.4, SY + (b + 0.5) * S0 * 1.4 + 10, i + 1, { 'text-anchor': 'middle', 'font-size': 30, fill: i ? RC : AC, 'font-weight': 600 }));
const sqR = txt(sqs, 520, 230, '4 copies', { 'font-size': 28, fill: RC, 'font-weight': 700 });
const sqR2 = txt(sqs, 520, 268, 'of the old area', { 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
$('#sqA').innerHTML = K(`(2${xc('s')})^2 = 4${xc('s')}^2`);

/* ---------- G: live y = x^n ---------- */
const NR = [[0, 'y = 1', 'constant'], [1, 'y = x', 'identity'], [2, 'y = x^2', 'parabola'], [3, 'y = x^3', 'cubic']];
$('#nRows').innerHTML = NR.map(([n, f, w], i) => `<div class="nn" id="nr${i}" style="top:${180 + i * 74}px"><div class="nk">n = ${n}</div><div class="nv">${K(f)}</div><div class="nw">${w}</div></div>`).join('');
const gs = $('#gS'), ga = axes(gs, { ox: 392, oy: 330, sx: 150, sy: 52, x0: -2.4, x1: 2.4, y0: -4.4, y1: 4.6, xt: [-2, -1, 1, 2], yt: [-4, -2, 2, 4] });
const gGhost = [0, 1, 2].map(k => mk(gs, 'path', { d: ga.path(x => Math.pow(x, k), -2.3, 2.3), fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6' }));
const gCur = mk(gs, 'path', { d: '', fill: 'none', stroke: RC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const tGn = [T0('G2'), T0('G3'), T0('G4'), T0('G5')];
const nOf = t => { let n = 0; for (let k = 1; k <= 3; k++) n += M.io((t - tGn[k] + 0.1) / 0.7); return n; };
const pw = (x, n) => { const k = Math.floor(n), u = n - k; return k >= 3 ? x * x * x : (1 - u) * Math.pow(x, k) + u * Math.pow(x, k + 1); };
let gLast = '';
const avA = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the bus fare is a polynomial too!' });

/* ---------- Z: polynomial or not ---------- */
const ZR = [[`x^3 - x^2 + 2`, 1], [`x^{2/3} + 2x`, 0], [`\\dfrac{1}{x} = x^{-1}`, 0]];
$('#zRows').innerHTML = ZR.map(([f, ok], i) => `<div class="ze" id="ze${i}" style="top:${88 + i * 112}px"><div class="zf">${K(f)}</div><div class="zc" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 22, '#fff', 3)}${ok ? 'POLYNOMIAL' : 'NOT'}</div></div>`).join('');
const PWS = [['3', 1], ['2', 1], ['0', 1], ['\\tfrac{2}{3}', 0], ['-1', 0]];
$('#zPw').innerHTML = PWS.map(([p, ok], i) => `<div class="pw" id="pw${i}" style="left:${36 + i * 140}px;top:${200}px">${K(p)}</div>`).join('') +
  `<div class="lbl" id="zpl" style="left:36px;top:120px">POWERS SEEN ABOVE</div>`;
const th2 = PUC.think($('#th2'), { q: `Is ${K('x^{2/3} + 2x')} a polynomial function?`, opts: ['Yes', 'No'], right: 1, why: `The power ${K('\\tfrac{2}{3}')} is a fraction, not a whole number: not a polynomial function.` });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`f(${xc('x')}) = ${xc('x')}^3 - ${xc('x')}^2 + 2`)}<br>Is f a polynomial? Find ${K('f(-1),\\ f(0),\\ f(2)')}.`;
const wsol = PUC.solution($('#wl'), [
  ['Powers 3, 2, 0: whole numbers, so yes'],
  [K(`f(${xc('-1')}) = -1 - 1 + 2 = ${rc('0')}`)],
  [K(`f(${xc('0')}) = ${rc('2')}`)],
  [K(`f(${xc('2')}) = 8 - 4 + 2 = ${rc('6')}`)],
  ['Points ' + K(`(${xc('-1')}, ${rc('0')}),\\ (${xc('0')}, ${rc('2')}),\\ (${xc('2')}, ${rc('6')})`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 74 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'powers'), wt('W4', 'minus'), wt('W5', 'zero'), wt('W6', 'two'), wt('W7', 'graph')];
const ws = $('#wS'), wa = axes(ws, { ox: 330, oy: 470, sx: 120, sy: 48, x0: -2, x1: 3.3, y0: -1.8, y1: 8, xt: [-1, 1, 2], yt: [2, 4, 6] });
const wCur = mk(ws, 'path', { d: wa.path(x => x * x * x - x * x + 2, -1.75, 2.35), fill: 'none', stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wP = [[-1, 0], [0, 2], [2, 6]].map(([x, y], i) => { const g = mk(mk(ws, 'g', {}), 'g', {}); mk(g, 'circle', { cx: wa.X(x), cy: wa.Y(y), r: 10, fill: RC, stroke: '#fff', 'stroke-width': 3 }); txt(g, wa.X(x) + (i === 2 ? -18 : 16), wa.Y(y) + (i === 0 ? -14 : -12), `(${x}, ${y})`, { 'text-anchor': i === 2 ? 'end' : 'start', 'font-size': 18, fill: RC, 'font-weight': 600 }); return g; });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(x + 1)^2 - x^2 \\;\\text{ has degree } 2`), right: K(`(x + 1)^2 - x^2 = 2x + 1, \\;\\text{ degree } 1`) });
const ts = $('#tS'), ta = axes(ts, { ox: 250, oy: 200, sx: 52, sy: 30, x0: -3.6, x1: 5, y0: -1.2, y1: 5.2, xt: [-2, 2], yt: [] });
const tParab = mk(ts, 'path', { d: ta.path(x => x * x, -2.2, 2.2), fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const tLin = mk(ts, 'path', { d: ta.path(x => 2 * x + 1, -0.9, 2), fill: 'none', stroke: C.ok, 'stroke-width': 4, 'stroke-linecap': 'round' });
const tLt = txt(ts, ta.X(2) + 12, ta.Y(4.6), 'a straight line', { 'font-size': 18, fill: C.ok, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Spot constant, identity and polynomial functions inside bigger function questions.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`f \\text{ is a polynomial with } f(x + 1) - f(x) = 2x + 3`)}<br>for all x, and ${K('f(0) = 1')}. Find ${K('f(2)')}.`,
  opts: ['6', '8', '9', '10'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`x = 0:\\ f(1) - f(0) = 3`)], [K(`f(1) = 4`)], [K(`x = 1:\\ f(2) - f(1) = 5`)], [K(`f(2) = 4 + 5 = 9`)], [K(`\\text{check: } f(x) = (x + 1)^2`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Put'), wt('A2', 'four'), wt('A3', 'Put'), wt('A4', 'Nine'), wt('A4', 'fact')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · three functions', y0: 100, dy: 78, txt: [0, 0, 0, 1, 1],
  lines: [K(`f(${xc('x')}) = ${rc('c')}: \\ \\text{domain } ${ac('\\mathbb{R}')},\\ \\text{range } \\{${rc('c')}\\}`),
    K(`f(${xc('x')}) = ${xc('x')}: \\ \\text{domain } ${ac('\\mathbb{R}')},\\ \\text{range } ${rc('\\mathbb{R}')}`),
    K(`f(${xc('x')}) = ${rc('a_0')} + ${rc('a_1')}${xc('x')} + \\dots + ${rc('a_n')}${xc('x')}^n, \\ n = 0, 1, 2, \\dots`),
    `Powers must be whole numbers: ${K('x^{2/3}')} and ${K('1/x')} are not polynomials`,
    'Simplify first, then read the degree'] });
const YQ = [`What is the range of a constant function ${K('f(x) = c')}?`, `Is ${K('1/x')} a polynomial function? Why?`, `Find ${K('f(3)')} for ${K('f(x) = x^3 - x^2 + 2')}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 20', topic: 'Distance is never negative: Rational and Modulus Functions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('G4') - 0.2, 1.04, 960, 540], [T0('G6') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tC1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('C1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => { const el = $('#he' + i); M.vis(el, t, i ? tHe[i] - 0.1 : tMorph + 0.3, 1e9, { dy: 14 }); PUC.write(el.querySelector('.ef'), t, tHf + i * 0.9, 0.6); });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 });
    M.vis($('#hkP'), t, wt('H4', 'Three') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tI1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('I1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#cF'), t, wt('C1', 'f') - 0.05, 0.7);
    [0, 1, 2].forEach(i => M.vis($('#cr' + i), t, wt('C2', ['two', 'minus', 'hundred'][i]) - 0.1, 1e9, { dy: 14 }));
    PUC.write($('#cD'), t, wt('C3', 'domain') - 0.1, 0.9);
    M.vis($('#cg'), t, tC1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const c = cOf(t), key = c.toFixed(1);
    if (key !== cLast) { cLast = key; M.setT($('#cRd'), `c = ${key}`); attr(cLine, 'y1', ca.Y(c).toFixed(1)); attr(cLine, 'y2', ca.Y(c).toFixed(1)); attr(cLab, 'y', (ca.Y(c) - 14).toFixed(1)); M.setT(cLab, `y = ${key}`); }
    M.draw(cLine, t, wt('C1', 'fixed') - 0.1, 0.8); M.vis(cLab, t, wt('C1', 'fixed') + 0.4, 1e9, { dy: 0 }); M.vis($('#cRd'), t, wt('C1', 'fixed') + 0.2, 1e9, POP);
    cPts.forEach((p, i) => { attr(p, 'cx', ca.X([2, -3][i])); attr(p, 'cy', ca.Y(c).toFixed(1)); M.vis(p, t, wt('C2', i ? 'minus' : 'two'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
  }

  /* I */
  const iOn = t >= tI1 - 0.1 && t < tK1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('K1');
    M.vis($('#il'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#iF'), t, wt('I1', 'f') - 0.05, 0.7);
    [0, 1, 2].forEach(i => M.vis($('#ir' + i), t, wt('I1', 'Every') + i * 0.3, 1e9, { dy: 14 }));
    PUC.write($('#iD'), t, wt('I2', 'domain') - 0.1, 0.9);
    M.vis($('#ig'), t, tI1 + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(iLine, t, wt('I3', 'straight') - 0.1, 0.9);
    const x = ixOf(t), key = x.toFixed(1), on = M.clamp((t - tIx[0] + 0.8) / 0.25);
    if (key !== iLast) { iLast = key; M.setT($('#iRd'), `x = ${key}  →  y = ${key}`); M.setT(iLab, `(${key}, ${key})`); }
    const px = ia.X(x), py = ia.Y(x);
    attr(iDot, 'cx', px.toFixed(1)); attr(iDot, 'cy', py.toFixed(1)); attr(iLab, 'x', (px + 18).toFixed(1)); attr(iLab, 'y', (py + 30).toFixed(1));
    attr(iVg, 'x1', px.toFixed(1)); attr(iVg, 'x2', px.toFixed(1)); attr(iVg, 'y1', ia.Y(0)); attr(iVg, 'y2', py.toFixed(1));
    attr(iHg, 'x1', ia.X(0)); attr(iHg, 'x2', px.toFixed(1)); attr(iHg, 'y1', py.toFixed(1)); attr(iHg, 'y2', py.toFixed(1));
    [iDot, iLab, iVg, iHg].forEach(e => { e.style.opacity = on.toFixed(3); M.hide(e, on <= 0); });
    M.vis($('#iRd'), t, tIx[0] - 0.8, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(kaL, t, wt('K1', 'ignores') - 0.1, 0.8); M.vis(kaT, t, wt('K1', 'ignores') + 0.5, 1e9, { dy: 0 });
    kaD.forEach((d, i) => M.vis(d, t, wt('K1', 'input') + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#kaP'), t, wt('K1', 'flat') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(kbL, t, wt('K2', 'copies') - 0.1, 0.8); M.vis(kbT, t, wt('K2', 'copies') + 0.5, 1e9, { dy: 0 });
    M.draw(kbStep, t, wt('K2', 'step') - 0.1, 1.0);
    M.vis($('#kbP'), t, wt('K2', 'climbs') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'range') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Every') });
  }

  /* statement */
  const stOn = t >= tT && t < tP1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tP1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'constant') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'identity') - 0.2, 0.8);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('G1');
    M.vis($('#pl'), t, tP1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P1', 'f') - 0.05, 2.2);
    M.vis($('#pr0'), t, wt('P2', 'real') - 0.1, 1e9, { dy: 14 }); M.vis($('#pr1'), t, wt('P2', 'whole') - 0.1, 1e9, { dy: 14 });
    M.vis($('#pq'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tD = wt('P3', 'Double') - 0.1;
    M.vis(sq1, t, T0('P3') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(sqL1, t, T0('P3') + 0.3, 1e9, { dy: 0 }); M.vis(sqN[0], t, T0('P3') + 0.4, 1e9, { dy: 0 });
    M.vis(sqBig, t, tD, 1e9, { dy: 0, fade: 0.25 }); M.vis(sqL2, t, tD + 0.2, 1e9, { dy: 0 });
    sqQ.forEach((q, i) => M.vis(q, t, wt('P3', 'four') - 0.2 + i * 0.25, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    sqN.slice(1).forEach((n, i) => M.vis(n, t, wt('P3', 'four') - 0.1 + i * 0.25, 1e9, { dy: 0 }));
    M.vis(sqR, t, wt('P3', 'Four', 1) - 0.1, 1e9, { dy: 0 }); M.vis(sqR2, t, wt('P3', 'Four', 1), 1e9, { dy: 0 });
    PUC.write($('#sqA'), t, wt('P3', 'two') - 0.1, 0.8);
    const s = 1 + M.io((t - tD) / 0.8); M.setT($('#sRd'), `side ${s.toFixed(1)}s  ·  area ${(s * s).toFixed(1)}s²`); M.vis($('#sRd'), t, T0('P3') + 0.3, 1e9, POP);
  }

  /* G: live x^n */
  const gOn = t >= tG1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('Z1');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const n = nOf(t), ni = Math.min(3, Math.round(n));
    M.vis($('#nRd'), t, wt('G1', 'n') - 0.1, 1e9, { dy: 14 });
    const key = n.toFixed(3);
    if (key !== gLast) { gLast = key; M.setT($('#nV'), String(ni)); $('#nF').innerHTML = K(`y = ${xc('x')}^{${ni}}`); attr(gCur, 'd', ga.path(x => pw(x, n), -2.3, 2.3, 160)); }
    M.vis($('#nF'), t, wt('G1', 'Plot') - 0.1, 1e9, { dy: 14 });
    NR.forEach((_, i) => { const el = $('#nr' + i); M.vis(el, t, tGn[i] + 0.1, 1e9, { dy: 14 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tGn[i]) / 0.3) * (i === 3 ? 1 : 1 - M.io((t - tGn[i + 1]) / 0.3))); });
    M.vis($('#gp'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    gGhost.forEach((g, k) => M.vis(g, t, tGn[k + 1] - 0.1, 1e9, { dy: 0, fade: 0.3 }));
    M.draw(gCur, t, tGn[0] - 0.2, 0.8);
    avA(t, wt('G6', 'simplest') + 0.3, out);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('Z2');
    M.vis($('#zl'), t, tZ1 + 0.1, out, { dx: -60, dy: 0, ...o });
    ZR.forEach((_, i) => { M.vis($('#ze' + i), t, tZ1 + 0.3 + i * 0.35, 1e9, { dy: 14 }); M.vis($(`#ze${i} .zc`), t, wt('Z1', 'whole') + i * 0.2, 1e9, POP); });
    M.vis($('#zr'), t, tZ1 + 0.4, out, { dx: 60, dy: 0, ...o }); M.vis($('#zpl'), t, tZ1 + 0.6, 1e9, { dy: 10 });
    PWS.forEach(([p, ok], i) => { const el = $('#pw' + i); M.vis(el, t, tZ1 + 0.6 + i * 0.12, 1e9, POP); const u = M.io((t - wt('Z1', 'whole') - i * 0.12) / 0.3); el.style.borderColor = mix(C.line, ok ? C.ok : C.red, u); el.style.background = mix('#FFFFFF', ok ? C.okBg : C.redBg, u); });
    M.vis($('#zP'), t, wt('Z1', 'number') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tZ2 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ2, tOpts: wt('Z2', 'polynomial') - 0.1, tCount: T1('Z2') + 0.05, dur: 3, tAns: T0('Z3') - 0.02, tWhy: wt('Z3', 'power') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wCur, t, T0('W2') + 0.8, 1.4);
    wP.forEach((g, i) => M.vis(g, t, tW[i + 1] + 0.3, 1e9, POP));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'expand') - 0.1, tRight: wt('X3', 'leaves') - 0.1 });
    M.draw(tParab, t, wt('X2', 'squares') - 0.1, 0.7); tParab.style.opacity = (1 - 0.7 * M.io((t - wt('X3', 'leaves')) / 0.3)).toFixed(3);
    M.draw(tLin, t, wt('X3', 'leaves'), 0.7); M.vis(tLt, t, wt('X3', 'degree'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'building') - 0.6 });
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
