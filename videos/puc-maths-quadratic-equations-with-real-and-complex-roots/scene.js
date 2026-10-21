// PUC Maths Ep 45: Quadratic equations with real and complex roots (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: a violet, b blue, c teal, b^2 - 4ac coral; real part blue, imaginary part coral, i violet
const VA = C.violet, VB = '#2F6FEB', VC = C.teal, VD = C.ac, RE = '#2F6FEB', IM = C.ac, IU = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const av = s => tc(VA, s), bv = s => tc(VB, s), cv = s => tc(VC, s), dv = s => tc(VD, s), re = s => tc(RE, s), im = s => tc(IM, s), iu = s => tc(IU, s);
const I = iu('i');
const D = dv('b^2 - 4ac');
const path = (f, x0, x1, X, Y, n = 90) => { let d = ''; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n; d += (k ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1); } return d; };
const arrowHead = (p, x, y, dir, col) => mk(p, 'path', { d: dir === 'r' ? `M${x},${y} l-14,-8 v16 z` : `M${x},${y} l-8,14 h16 z`, fill: col });

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tL7 = T0('L7'), tD1 = T0('D1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three heights ---------- */
const LS = [['HEIGHT 15 m', 'Twice', C.ok], ['HEIGHT 20 m', '?', C.dim], ['HEIGHT 25 m', '?', C.dim]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'fifteen') - 0.1, wt('H1', 'twice') + 0.1, wt('H1', 'twice') + 0.3];

/* ---------- H: the throw, h = 20t - 5t^2 ---------- */
$('#hFx').innerHTML = K('h = 20t - 5t^2');
const hs = $('#hS'), GX = s => 96 + s * 140, GY = h => 452 - h * 13, hf = s => 20 * s - 5 * s * s;
mk(hs, 'line', { x1: GX(0), y1: GY(0), x2: 716, y2: GY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(hs, 728, GY(0), 'r', C.ink);
mk(hs, 'line', { x1: GX(0), y1: GY(0), x2: GX(0), y2: 104, stroke: C.ink, 'stroke-width': 3 }); arrowHead(hs, GX(0), 92, 'u', C.ink);
[1, 2, 3, 4].forEach(s => { mk(hs, 'line', { x1: GX(s), y1: GY(0) - 7, x2: GX(s), y2: GY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(hs, GX(s), GY(0) + 34, s + ' s', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[5, 10, 15, 20, 25].forEach(h => { mk(hs, 'line', { x1: GX(0) - 7, y1: GY(h), x2: GX(0) + 7, y2: GY(h), stroke: C.ink, 'stroke-width': 2 }); txt(hs, GX(0) - 14, GY(h) + 6, h, { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 }); });
txt(hs, GX(0) + 14, 112, 'height (m)', { fill: C.mute });
const HL = [[15, C.ok, '15 m · twice'], [20, VB, '20 m · once'], [25, C.red, '25 m · never']].map(([h, col, l]) => {
  const g = mk(hs, 'g', {}); mk(g, 'line', { x1: GX(0), y1: GY(h), x2: 690, y2: GY(h), stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '9 7' });
  txt(g, 690, GY(h) - 10, l, { 'text-anchor': 'end', fill: col, 'font-weight': 600, 'font-size': 19 }); return g; });
const hCurve = mk(hs, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const hHits = [[1, 15, C.ok], [3, 15, C.ok], [2, 20, VB]].map(([s, h, col]) => ({ s, h, c: mk(hs, 'circle', { cx: GX(s), cy: GY(h), r: 10, fill: col }) }));
const hBall = mk(hs, 'circle', { r: 13, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 });
const tA = tMorph + 0.35, tThrow = s => tA + s * 0.75;
const hLt = [tMorph + 0.15, wt('H2', 'twenty') - 0.1, wt('H2', 'twenty', 1) - 0.1];

/* ---------- P: definition + the ball at 15 m ---------- */
$('#qf').innerHTML = K(`${av('a')}x^2 + ${bv('b')}x + ${cv('c')} = 0`);
const DK = [K(`${av('a')} \\ne 0`), K(`${av('a')},\\ ${bv('b')},\\ ${cv('c')}`), K(`x = \\,?`)];
DK.forEach((h, i) => { $('#dr' + i + ' .dk').innerHTML = h; });
const tDr = [wt('P2', 'not'), wt('P3', 'coefficients'), wt('P3', 'roots')];
const BS = [[`h = 20t - 5t^2 = 15`, 'the ball at 15 m'], [`5t^2 - 20t + 15 = 0`, 'all on one side'], [`${av('t^2')} ${bv('- 4')}t ${cv('+ 3')} = 0`, 'divide by 5'],
  [`(t - 1)(t - 3) = 0`, 'factorise'], [`t = 1\\ \\text{s} \\ \\text{or}\\ 3\\ \\text{s}`, 'going up, coming down']];
$('#bSt').innerHTML = BS.map(([f, w], i) => `<div class="st" id="bs${i}" style="top:${80 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="wr">${w}</div></div>`).join('');
const tBs = [wt('P4', 'fifteen'), wt('P5', 'Tidy'), wt('P5', 'squared'), wt('P6', 'factors'), wt('P6', 'one')];

/* ---------- L: live family y = x^2 - 4x + c ---------- */
$('#lFx').innerHTML = K(`y = x^2 ${bv('- 4')}x + ${cv('c')}`);
const ls = $('#lS'), LX = x => 70 + (x + 0.5) * 132, LY = y => 520 - (y + 4.5) * 31.2;
mk(ls, 'line', { x1: 50, y1: LY(0), x2: 742, y2: LY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, 754, LY(0), 'r', C.ink);
mk(ls, 'line', { x1: LX(0), y1: 540, x2: LX(0), y2: 132, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, LX(0), 120, 'u', C.ink);
[1, 2, 3, 4].forEach(v => { mk(ls, 'line', { x1: LX(v), y1: LY(0) - 7, x2: LX(v), y2: LY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ls, LX(v), LY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
txt(ls, LX(0) - 12, LY(0) + 32, '0', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 });
txt(ls, 742, LY(0) - 14, 'x', { 'text-anchor': 'end', 'font-family': 'KaTeX_Math', 'font-size': 24, fill: C.ink });
const lCurve = mk(ls, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const lInt = mk(ls, 'circle', { r: 10, fill: VC }), lIntL = txt(ls, 0, 0, 'c', { 'font-family': 'KaTeX_Math', 'font-size': 26, fill: VC, 'text-anchor': 'end' });
const lR = [0, 1].map(() => mk(ls, 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const as = $('#aS'), AX = x => 120 + x * 110, AY = v => 290 - v * 72;
mk(as, 'line', { x1: 50, y1: AY(0), x2: 742, y2: AY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, 754, AY(0), 'r', C.ink);
mk(as, 'line', { x1: AX(0), y1: 470, x2: AX(0), y2: 112, stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, AX(0), 100, 'u', C.ink);
[1, 2, 3, 4, 5].forEach(v => { mk(as, 'line', { x1: AX(v), y1: AY(0) - 7, x2: AX(v), y2: AY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(v), AY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[[1, 'i'], [2, '2i'], [-1, '-i'], [-2, '-2i']].forEach(([v, l]) => { mk(as, 'line', { x1: AX(0) - 7, y1: AY(v), x2: AX(0) + 7, y2: AY(v), stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(0) - 14, AY(v) + 6, l, { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 }); });
txt(as, 742, AY(0) - 14, 'real', { 'text-anchor': 'end', fill: RE, 'font-weight': 600 }); txt(as, AX(0) + 14, 116, 'imaginary', { fill: IM, 'font-weight': 600 });
const aRe = mk(as, 'line', { x1: AX(0), y1: AY(0), x2: AX(2), y2: AY(0), stroke: RE, 'stroke-width': 8, 'stroke-linecap': 'round' });
const aIm = [0, 1].map(() => mk(as, 'line', { x1: AX(2), y1: AY(0), x2: AX(2), y2: AY(0), stroke: IM, 'stroke-width': 5, 'stroke-dasharray': '8 6' }));
const aR = [0, 1].map(() => mk(as, 'circle', { r: 13, fill: C.ink, stroke: '#fff', 'stroke-width': 3 }));
const tc0 = wt('L3', 'grows') - 0.1, tc1 = wt('L4', 'meet'), tc2 = wt('L5', 'Past'), tc3 = T1('L5');
const cAt = t => 4 * M.io((t - tc0) / (tc1 - tc0)) + M.io((t - tc2) / (tc3 - tc2));
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
let cLast = null;
const th1 = PUC.think($('#th1'), { q: `At ${K(`${cv('c')} = 6`)}, are the roots of ${K(`x^2 ${bv('- 4')}x + ${cv('c')} = 0`)} real or complex?`, opts: ['Real', 'Complex'], right: 1,
  why: `The curve stays above the axis. Roots: ${K(`${re('2')} \\pm ${im('\\sqrt{2}')}\\,${I}`)}` });

/* ---------- D: the quadratic formula ---------- */
const DS = [[`x^2 + \\frac{${bv('b')}}{${av('a')}}x + \\frac{${cv('c')}}{${av('a')}} = 0`, 'divide by a (allowed: a is not 0)'],
  [`x^2 + \\frac{${bv('b')}}{${av('a')}}x = -\\frac{${cv('c')}}{${av('a')}}`, 'move c/a to the right'],
  [`\\left(x + \\frac{${bv('b')}}{2${av('a')}}\\right)^2 = \\frac{${D}}{4${av('a')}^2}`, 'add (b/2a)² to both sides: a perfect square'],
  [`x + \\frac{${bv('b')}}{2${av('a')}} = \\pm\\frac{\\sqrt{${D}}}{2${av('a')}}`, 'square root: + and - both square to it'],
  [`x = \\frac{-${bv('b')} \\pm \\sqrt{${D}}}{2${av('a')}}`, 'subtract b/2a: the quadratic formula']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${78 + i * 98}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:38px;top:-6px">${K(f)}</div><div class="why" style="top:60px">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Divide'), wt('D3', 'Move'), wt('D4', 'Add'), wt('D5', 'Take'), wt('D6', 'Subtract')];
const ds = $('#dS'), DX = x => 80 + (x + 0.5) * 124, DY = y => 350 - (y + 1.5) * 34;
mk(ds, 'line', { x1: 50, y1: DY(0), x2: 742, y2: DY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ds, 754, DY(0), 'r', C.ink);
mk(ds, 'line', { x1: DX(0), y1: 400, x2: DX(0), y2: 104, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ds, DX(0), 92, 'u', C.ink);
[1, 2, 3, 4].forEach(v => { mk(ds, 'line', { x1: DX(v), y1: DY(0) - 7, x2: DX(v), y2: DY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ds, DX(v) + (v === 2 ? 16 : 0), DY(0) - 16, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
const dCurve = mk(ds, 'path', { d: path(x => x * x - 4 * x + 3, -0.45, 4.45, DX, DY), fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const dAx = mk(ds, 'line', { x1: DX(2), y1: DY(5.6), x2: DX(2), y2: DY(-1.4), stroke: VB, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const dRt = [1, 3].map(v => mk(ds, 'circle', { cx: DX(v), cy: DY(0), r: 11, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const dA1 = PUC.arrow(ds, VD, 5, 14), dA2 = PUC.arrow(ds, VD, 5, 14);
$('#dO1').innerHTML = K(`${bv('x = -\\frac{b}{2a}')}`); $('#dO1').style.cssText += `;left:${DX(2) + 14}px;top:92px`;
$('#dO2').innerHTML = K(`\\pm\\frac{\\sqrt{${D}}}{2${av('a')}}`); $('#dO2').style.cssText += `;left:${DX(2) - 80}px;top:${DY(0) + 44}px;font-size:30px`;
$('#dnF').innerHTML = K(`\\sqrt{${D}} = ${I}\\,\\sqrt{${dv('4ac - b^2')}}`);

/* ---------- S: real vs complex ---------- */
$('#s1F').innerHTML = K(`x^2 ${bv('- 4')}x ${cv('+ 3')} = 0`); $('#s2F').innerHTML = K(`x^2 ${bv('- 4')}x ${cv('+ 5')} = 0`);
$('#s2P').innerHTML = `Two complex roots: ${K(`${re('2')} \\pm ${I}`)}`;
const sPane = (svg, c) => {
  const X = x => 50 + (x + 0.5) * 72, Y = y => 416 - y * 34.5, ax = x => 492 + x * 50, ay = v => 300 - v * 62;
  mk(svg, 'line', { x1: 36, y1: Y(0), x2: 420, y2: Y(0), stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'line', { x1: X(0), y1: 440, x2: X(0), y2: 132, stroke: C.ink, 'stroke-width': 3 });
  [1, 2, 3, 4].forEach(v => { mk(svg, 'line', { x1: X(v), y1: Y(0) - 6, x2: X(v), y2: Y(0) + 6, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), Y(0) + 30, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 17 }); });
  const cu = mk(svg, 'path', { d: path(x => x * x - 4 * x + c, -0.45, 4.45, X, Y), fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
  mk(svg, 'line', { x1: 452, y1: 150, x2: 452, y2: 450, stroke: C.line, 'stroke-width': 2 });
  mk(svg, 'line', { x1: 470, y1: ay(0), x2: 752, y2: ay(0), stroke: C.ink, 'stroke-width': 2.5 });
  mk(svg, 'line', { x1: ax(0), y1: 440, x2: ax(0), y2: 160, stroke: C.ink, 'stroke-width': 2.5 });
  [1, 2, 3, 4].forEach(v => { mk(svg, 'line', { x1: ax(v), y1: ay(0) - 6, x2: ax(v), y2: ay(0) + 6, stroke: C.ink, 'stroke-width': 2 }); txt(svg, ax(v), ay(0) + 28, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 16 }); });
  txt(svg, 600, 172, 'ARGAND PLANE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 });
  const pts = c < 4 ? [[2 - Math.sqrt(4 - c), 0], [2 + Math.sqrt(4 - c), 0]] : [[2, Math.sqrt(c - 4)], [2, -Math.sqrt(c - 4)]];
  const hits = c < 4 ? pts.map(([x]) => mk(svg, 'circle', { cx: X(x), cy: Y(0), r: 11, fill: RE, stroke: '#fff', 'stroke-width': 3 })) : [];
  const seg = c < 4 ? [] : [mk(svg, 'line', { x1: ax(0), y1: ay(0), x2: ax(2), y2: ay(0), stroke: RE, 'stroke-width': 7, 'stroke-linecap': 'round' }), ...pts.map(([x, v]) => mk(svg, 'line', { x1: ax(2), y1: ay(0), x2: ax(2), y2: ay(v), stroke: IM, 'stroke-width': 4, 'stroke-dasharray': '7 5' }))];
  const dots = pts.map(([x, v]) => mk(svg, 'circle', { cx: ax(x), cy: ay(v), r: 11, fill: c < 4 ? RE : C.ink, stroke: '#fff', 'stroke-width': 3 }));
  const labs = c < 4 ? [] : [txt(svg, ax(2) + 18, ay(1) + 6, '2 + i', { 'font-size': 20, fill: C.ink, 'font-weight': 600 }), txt(svg, ax(2) + 18, ay(-1) + 6, '2 - i', { 'font-size': 20, fill: C.ink, 'font-weight': 600 })];
  return { cu, hits, seg, dots, labs };
};
const sp1 = sPane($('#s1S'), 3), sp2 = sPane($('#s2S'), 5);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So 25 m was never: its roots are 2 + i and 2 - i.' });
const th2 = PUC.think($('#th2'), { q: `Does ${K(`x^2 + 9 = 0`)} have real roots?`, opts: ['Yes, real roots', 'No, complex roots'], right: 1,
  why: `${K('x^2 = -9')}, and no real number squares to a negative. Roots: ${K(`${im('3')}${I}`)} and ${K(`-${im('3')}${I}`)}.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`x = \\frac{-${bv('b')} \\pm \\sqrt{${D}}}{2${av('a')}}`);

/* ---------- W: worked example x^2 + x + 1 = 0 ---------- */
$('#wq').innerHTML = `Solve ${K(`x^2 + x + 1 = 0`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${av('a')} = 1,\\ ${bv('b')} = 1,\\ ${cv('c')} = 1`)],
  [K(`${D} = 1 - 4 = ${dv('-3')}`)],
  [K(`\\sqrt{${dv('-3')}} = ${I}\\sqrt{3}`)],
  [K(`x = \\frac{${re('-1')} \\pm ${I}${im('\\sqrt{3}')}}{2}`)],
  [`A conjugate pair, real part ${K(re('-\\tfrac{1}{2}'))}`]], { label: 'WORKED EXAMPLE', y0: 160, dy: 80 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'all'), wt('W4', 'one'), wt('W5', 'root'), wt('W6', 'minus'), wt('W7', 'conjugate')];
const ws = $('#wS'), WX = x => 420 + x * 180, WY = v => 290 - v * 180;
mk(ws, 'line', { x1: 110, y1: WY(0), x2: 742, y2: WY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ws, 754, WY(0), 'r', C.ink);
mk(ws, 'line', { x1: WX(0), y1: 480, x2: WX(0), y2: 104, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ws, WX(0), 92, 'u', C.ink);
[-1, 1].forEach(v => { mk(ws, 'line', { x1: WX(v), y1: WY(0) - 7, x2: WX(v), y2: WY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ws, WX(v), WY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
txt(ws, 742, WY(0) - 14, 'real', { 'text-anchor': 'end', fill: RE, 'font-weight': 600 }); txt(ws, WX(0) + 14, 116, 'imaginary', { fill: IM, 'font-weight': 600 });
const wCirc = mk(ws, 'circle', { cx: WX(0), cy: WY(0), r: 180, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const r3 = Math.sqrt(3) / 2;
const wRe = mk(ws, 'line', { x1: WX(0), y1: WY(0), x2: WX(-0.5), y2: WY(0), stroke: RE, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wIm = [r3, -r3].map(v => mk(ws, 'line', { x1: WX(-0.5), y1: WY(0), x2: WX(-0.5), y2: WY(v), stroke: IM, 'stroke-width': 4, 'stroke-dasharray': '7 5' }));
const wPt = [r3, -r3].map(v => mk(ws, 'circle', { cx: WX(-0.5), cy: WY(v), r: 12, fill: C.ink, stroke: '#fff', 'stroke-width': 3 }));
const wLb = [r3, -r3].map((v, i) => { const d = document.createElement('div'); d.className = 'fx'; d.style.cssText = `font-size:28px;left:${WX(-0.5) - 236}px;top:${WY(v) - 26}px`;
  d.innerHTML = K(`${re('-\\tfrac{1}{2}')} ${i ? '-' : '+'} ${im('\\tfrac{\\sqrt{3}}{2}')}\\,${I}`); $('#wr').appendChild(d); return d; });
$('#wP').textContent = 'Mirror images in the real axis';

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\sqrt{-16} = -4 \\;\\Rightarrow\\; x = 3 \\ \\text{or}\\ -1`), right: K(`\\sqrt{-16} = 4${I} \\;\\Rightarrow\\; x = ${re('1')} \\pm ${im('2')}${I}`) });
const ts = $('#tS');
const tChkL = txt(ts, 24, 104, 'CHECK x = 3', { 'font-size': 18, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 });
const tChk = txt(ts, 24, 142, '9 - 6 + 5 = 8 ≠ 0', { 'font-size': 28, fill: C.red, 'font-weight': 600 });
const tChk2 = txt(ts, 24, 210, '(1 + 2i)² - 2(1 + 2i) + 5 = 0', { 'font-size': 24, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Solve a quadratic with complex roots, then use those roots (JEE Main, 8 April 2019, Shift 1)' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`x^2 - 4x + 13 = 0`)}<br>Its two roots and the origin O make a<br>triangle on the Argand plane. Its area is`,
  opts: ['3', '6', '12', '13'], right: 1, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`${D} = 16 - 52 = ${dv('-36')}`)], [K(`\\sqrt{${dv('-36')}} = 6${I}`)], [K(`x = \\tfrac{4 \\pm 6${I}}{2} = ${re('2')} \\pm ${im('3')}${I}`)],
  [K(`\\text{base } ${im('3')} - (${im('-3')}) = 6,\\ \\text{height } ${re('2')}`)], [K(`\\text{area} = \\tfrac{1}{2} \\cdot 6 \\cdot 2 = 6`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'sixteen'), wt('A3', 'six'), wt('A3', 'two'), wt('A4', 'base'), wt('A4', 'Half')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 236, w: 1320, h: 540, title: 'Recap · quadratic equations', y0: 96, dy: 76, txt: [1, 1, 1, 0, 0],
  lines: [`<b>Quadratic</b>: ${K(`${av('a')}x^2 + ${bv('b')}x + ${cv('c')} = 0,\\ ${av('a')} \\ne 0`)} always has two roots`,
    'Curve crosses the x-axis: real roots. Stays off it: complex roots',
    `Real a, b, c: complex roots come as a conjugate pair ${K(`${re('p')} \\pm ${im('q')}${I}`)}`,
    K(`${D} < 0:\\ \\ \\sqrt{${D}} = ${I}\\sqrt{${dv('4ac - b^2')}}`),
    K(`x = \\dfrac{-${bv('b')} \\pm \\sqrt{${D}}}{2${av('a')}}`)] });
M.$$('#sF .fcard .fl')[4].style.cssText += ';font-size:46px;top:398px';
const YQ = [`Solve ${K('x^2 + 4 = 0')}.`, 'Why does the formula need plus or minus?', `${K(`3 - 2${I}`)} is a root of a quadratic with real coefficients. What is the other root?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 46', topic: 'One number decides the roots: Discriminant and Nature of Roots', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPush = wt('L4', 'meet') - 0.3;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPush, 1.1, 760, 580], [tc2 - 0.2, 1, 960, 540]]);
let ghX = null;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  if (ghX === null) { ghX = 1760 - $('#gh').offsetWidth; $('#gh').style.left = ghX + 'px'; $('#gh').style.top = '164px'; }
  M.vis($('#gh'), t, tMorph + 0.8, tQ - 0.05, { dy: 0, dx: 16, outDur: 0.01 });

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the throw */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hFx'), t, tMorph + 0.3, 1e9, { dy: 10 });
    HL.forEach((g, i) => M.vis(g, t, hLt[i], 1e9, { dy: 0, fade: 0.2 }));
    const s = M.clamp((t - tA) / 3, 0, 1) * 4;
    attr(hCurve, 'd', s > 0.01 ? path(hf, 0, s, GX, GY, 80) : ''); M.hide(hCurve, s <= 0.01);
    attr(hBall, 'cx', GX(s).toFixed(1)); attr(hBall, 'cy', GY(hf(s)).toFixed(1)); M.vis(hBall, t, tA - 0.1, 1e9, { dy: 0, fade: 0.1 });
    hHits.forEach(h => M.vis(h.c, t, Math.max(tA + h.s * 0.75, h.h === 20 ? hLt[1] : 0), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#hG'), t, tMorph + 0.6, 1e9, { dy: 10 });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'why') - 0.1, wt('H5', 'twist'), POP);
    M.vis($('#hkP2'), t, wt('H5', 'never') - 0.05, 1e9, POP);
  }

  /* P: definition + the ball at 15 m */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#qf'), t, wt('P2', 'looks') + 0.1, 1.4);
    [0, 1, 2].forEach(i => { M.vis($('#dr' + i), t, tDr[i] - 0.15, 1e9, { dy: 14 }); });
    M.vis($('#bl'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    BS.forEach((_, i) => { const el = $('#bs' + i); M.vis(el.querySelector('.n'), t, tBs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tBs[i], 0.7); M.vis(el.querySelector('.wr'), t, tBs[i] + 0.5, 1e9, { dx: 12, dy: 0 }); });
    const hiY = M.track(80, tBs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#bHi'); M.vis(hb, t, tBs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
  }

  /* L: the live family */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L7');
    M.vis($('#lg'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#lFx'), t, wt('L1', 'equals') - 0.2, 0.9);
    const c = cAt(t), ck = c.toFixed(3);
    M.vis($('#cRd'), t, wt('L1', 'family'), 1e9, { dy: 10 }); M.vis($('#cBall'), t, wt('L1', 'ball'), 1e9, { dy: 10 });
    if (ck !== cLast) {
      cLast = ck; M.setT($('#cV'), c.toFixed(2)); M.setT($('#cBall'), `BALL HEIGHT 5c = ${(5 * c).toFixed(1)} m`);
      attr(lCurve, 'd', path(x => x * x - 4 * x + c, -0.45, 4.45, LX, LY));
      attr(lInt, 'cx', LX(0)); attr(lInt, 'cy', LY(c).toFixed(1)); attr(lIntL, 'x', LX(0) - 16); attr(lIntL, 'y', (LY(c) + 8).toFixed(1));
      const r = Math.sqrt(Math.max(0, 4 - c)), q = Math.sqrt(Math.max(0, c - 4));
      lR.forEach((d, i) => { attr(d, 'cx', LX(2 + (i ? r : -r)).toFixed(1)); attr(d, 'cy', LY(0)); });
      aR.forEach((d, i) => { attr(d, 'cx', AX(2 + (i ? r : -r)).toFixed(1)); attr(d, 'cy', AY(i ? -q : q).toFixed(1)); attr(d, 'fill', c > 4.001 ? C.ink : RE); });
      aIm.forEach((l, i) => attr(l, 'y2', AY(i ? -q : q).toFixed(1)));
      $('#rRo').innerHTML = c < 3.9995 ? `x = <span class="re">${f2(2 - r)}</span> and <span class="re">${f2(2 + r)}</span>` : c <= 4.0005 ? `x = <span class="re">2</span> and <span class="re">2</span> · equal` : `x = <span class="re">2</span> ± <span class="im">${f2(q)}</span><i class="iu">i</i>`;
    }
    M.vis(lCurve, t, wt('L1', 'squared'), 1e9, { dy: 0, fade: 0.3 }); M.vis(lInt, t, wt('L1', 'ball'), 1e9, { dy: 0, sc: 0.3, sp: M.POP }); M.vis(lIntL, t, wt('L1', 'ball'), 1e9, { dy: 0 });
    const reOn = t >= wt('L2', 'roots') - 0.1 && c < 4.02;
    lR.forEach(d => { d.style.opacity = reOn ? M.clamp((t - wt('L2', 'roots') + 0.1) / 0.2) * M.clamp((4.02 - c) / 0.02) : 0; M.hide(d, !reOn); });
    M.vis($('#la'), t, wt('L2', 'roots') - 0.1, out, { dx: 60, dy: 0, ...o });
    aR.forEach(d => M.vis(d, t, wt('L2', 'meets'), 1e9, { dy: 0, fade: 0.15 }));
    const cpx = M.clamp((c - 4) / 0.25);
    aRe.style.opacity = cpx; aIm.forEach(l => { l.style.opacity = cpx; });
    M.vis($('#rRo'), t, wt('L2', 'meets') + 0.1, 1e9, { dy: 10 });
    M.vis($('#noR'), t, c > 4.05 ? wt('L5', 'real') - 0.1 : null, c > 4.05 ? 1e9 : -1, POP);
    M.vis($('#th1'), t, tL7 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tL7, tOpts: wt('L7', 'real') - 0.1, tCount: T1('L7') + 0.05, dur: 3, tAns: T0('L8') - 0.02, tWhy: wt('L8', 'curve') });
  }

  /* D: the formula */
  const dOn = t >= tD1 - 0.1 && t < tS1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('S1');
    M.vis($('#dp'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(78, tDs.slice(1).map((tt, i) => [tt - 0.1, 78 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dC'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(dCurve, t, tD1 + 0.6, 1.0);
    dRt.forEach((d, i) => M.vis(d, t, tD1 + 1.4 + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(dAx, t, wt('D7', 'middle') - 0.1, 0.6); M.vis($('#dO1'), t, wt('D7', 'middle') + 0.2, 1e9, { dy: 10 });
    const ua = M.io((t - wt('D7', 'equal') + 0.1) / 0.5), yA = DY(0) + 20;
    dA1.set(DX(2), yA, DX(2) - (DX(2) - DX(1)) * ua, yA); dA2.set(DX(2), yA, DX(2) + (DX(3) - DX(2)) * ua, yA);
    M.vis($('#dO2'), t, wt('D7', 'equal') + 0.3, 1e9, { dy: 10 });
    M.vis($('#dneg'), t, wt('D8', 'negative') - 0.1, 1e9, { dy: 16 });
    PUC.write($('#dnF'), t, wt('D8', 'becomes') - 0.2, 0.9);
  }

  /* S: real vs complex + pause and think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#s1'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#s1F'), t, wt('S1', 'squared') - 0.1, 0.8);
    M.draw(sp1.cu, t, wt('S1', 'crosses') - 0.1, 0.8);
    sp1.hits.forEach((d, i) => M.vis(d, t, wt('S1', 'twice') + i * 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    sp1.dots.forEach((d, i) => M.vis(d, t, wt('S1', 'roots') + i * 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s1P'), t, wt('S1', 'both') - 0.1, T0('S3'), POP);
    avA(t, T0('S3') + 0.1, out);
    M.vis($('#s2'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#s2F'), t, T0('S2') + 0.1, 0.8);
    M.draw(sp2.cu, t, wt('S2', 'curve') - 0.1, 0.8);
    sp2.seg.forEach(l => M.vis(l, t, wt('S2', 'two', 0) - 0.05, 1e9, { dy: 0, fade: 0.2 }));
    sp2.dots.forEach((d, i) => M.vis(d, t, wt('S2', 'two') + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    sp2.labs.forEach((d, i) => M.vis(d, t, wt('S2', 'two') + 0.1 + i * 0.3, 1e9, { dy: 0 }));
    M.vis($('#s2P'), t, wt('S2', 'roots') - 0.05, wt('S3', 'opposite') - 0.2, POP);
    M.vis($('#s2Q'), t, wt('S3', 'opposite') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'real') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'squared') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Real') - 0.3, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(wCirc, t, T0('W2') + 0.6, 0.9);
    M.vis(wRe, t, tWs[3] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    wIm.forEach((l, i) => M.vis(l, t, tWs[3] + 0.6 + i * 0.2, 1e9, { dy: 0, fade: 0.2 }));
    wPt.forEach((d, i) => M.vis(d, t, tWs[3] + 0.5 + i * 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    wLb.forEach((d, i) => M.vis(d, t, tWs[3] + 0.8 + i * 0.2, 1e9, { dx: 12, dy: 0 }));
    M.vis($('#wP'), t, tWs[4] - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'roots') + 0.1 });
    M.vis(tChkL, t, wt('X3', 'Check') - 0.1, 1e9, { dy: 0 }); M.vis(tChk, t, wt('X3', 'Check') + 0.1, 1e9, { dy: 0 });
    M.vis(tChk2, t, wt('X3', 'roots') + 0.6, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'solve') });
    M.vis($('#waG'), t, wt('J1', 'current') - 0.1, 1e9, POP);
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
