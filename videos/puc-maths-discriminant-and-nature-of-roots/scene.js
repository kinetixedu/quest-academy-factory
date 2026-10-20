// PUC Maths Ep 46: Discriminant and nature of roots (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: a violet, b blue, c teal, discriminant D coral; real part blue, imaginary part coral, i violet
const VA = C.violet, VB = '#2F6FEB', VC = C.teal, VD = C.ac, RE = '#2F6FEB', IM = C.ac, IU = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const av = s => tc(VA, s), bv = s => tc(VB, s), cv = s => tc(VC, s), dv = s => tc(VD, s), re = s => tc(RE, s), im = s => tc(IM, s), iu = s => tc(IU, s);
const I = iu('i'), DD = dv('D'), DF = dv('b^2 - 4ac');
const path = (f, x0, x1, X, Y, n = 90) => { let d = ''; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n; d += (k ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1); } return d; };
const arrowHead = (p, x, y, dir, col) => mk(p, 'path', { d: dir === 'r' ? `M${x},${y} l-14,-8 v16 z` : `M${x},${y} l-8,14 h16 z`, fill: col });
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tL7 = T0('L7'), tR1 = T0('R1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three equations ---------- */
const EQ = [5, 9, 13];
$('#lists').innerHTML = EQ.map((c, i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">EQUATION ${i + 1}</div><div class="lv">${K(`x^2 ${bv('- 6')}x ${cv('+ ' + c)} = 0`)}</div></div>`).join('');
const tLs = [wt('H1', 'five') - 0.1, wt('H1', 'nine') - 0.1, wt('H1', 'thirteen') - 0.1];

/* ---------- H: three rows + Aarav ---------- */
$('#eqR').innerHTML = EQ.map((c, i) => `<div class="er" id="er${i}" style="top:${92 + i * 132}px"><div class="fx">${K(`x^2 ${bv('- 6')}x ${cv('+ ' + c)} = 0`)}</div><div class="chip">?</div></div>`).join('');
const tEr = [wt('H2', 'One'), wt('H2', 'One', 1), wt('H2', 'And')];

/* ---------- P: the part under the root ---------- */
$('#pF').innerHTML = K(`x = \\frac{-${bv('b')} \\pm \\sqrt{${DF}}}{2${av('a')}}`);
$('#dr0 .dk').innerHTML = K(`-\\frac{${bv('b')}}{2${av('a')}}`); $('#dr1 .dk').innerHTML = K(`\\sqrt{${DF}}`);
$('#dBig').innerHTML = K(`${DD} = ${DF}`); $('#dr3 .dk').innerHTML = K(`${DD} \\gtrless 0`);
let boxSet = false;

/* ---------- L: live, c counts up, D falls ---------- */
$('#lFx').innerHTML = K(`y = x^2 ${bv('- 6')}x + ${cv('c')}`);
const ls = $('#lS'), LX = x => 60 + (x + 0.5) * 96, LY = y => 520 - (y + 4.5) * 24;
mk(ls, 'line', { x1: 40, y1: LY(0), x2: 742, y2: LY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, 754, LY(0), 'r', C.ink);
mk(ls, 'line', { x1: LX(0), y1: 540, x2: LX(0), y2: 132, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, LX(0), 120, 'u', C.ink);
[1, 2, 3, 4, 5, 6].forEach(v => { mk(ls, 'line', { x1: LX(v), y1: LY(0) - 7, x2: LX(v), y2: LY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ls, LX(v), LY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
txt(ls, 742, LY(0) - 14, 'x', { 'text-anchor': 'end', 'font-family': 'KaTeX_Math', 'font-size': 24, fill: C.ink });
const lCurve = mk(ls, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const lR = [0, 1].map(() => mk(ls, 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const as = $('#aS'), AX = x => 100 + x * 100, AY = v => 290 - v * 72;
mk(as, 'line', { x1: 50, y1: AY(0), x2: 742, y2: AY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, 754, AY(0), 'r', C.ink);
mk(as, 'line', { x1: AX(0), y1: 470, x2: AX(0), y2: 112, stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, AX(0), 100, 'u', C.ink);
[1, 2, 3, 4, 5, 6].forEach(v => { mk(as, 'line', { x1: AX(v), y1: AY(0) - 7, x2: AX(v), y2: AY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(v), AY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[[1, 'i'], [2, '2i'], [-1, '-i'], [-2, '-2i']].forEach(([v, l]) => { mk(as, 'line', { x1: AX(0) - 7, y1: AY(v), x2: AX(0) + 7, y2: AY(v), stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(0) - 14, AY(v) + 6, l, { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 }); });
txt(as, 742, AY(0) - 14, 'real', { 'text-anchor': 'end', fill: RE, 'font-weight': 600 }); txt(as, AX(0) + 14, 116, 'imaginary', { fill: IM, 'font-weight': 600 });
const aRe = mk(as, 'line', { x1: AX(0), y1: AY(0), x2: AX(3), y2: AY(0), stroke: RE, 'stroke-width': 8, 'stroke-linecap': 'round' });
const aIm = [0, 1].map(() => mk(as, 'line', { x1: AX(3), y1: AY(0), x2: AX(3), y2: AY(0), stroke: IM, 'stroke-width': 5, 'stroke-dasharray': '8 6' }));
const aR = [0, 1].map(() => mk(as, 'circle', { r: 13, fill: C.ink, stroke: '#fff', 'stroke-width': 3 }));
const tc0 = wt('L3', 'grows') - 0.1, tc1 = wt('L4', 'hits'), tc2 = wt('L5', 'past'), tc3 = wt('L6', 'thirteen');
const cAt = t => 5 + 4 * M.io((t - tc0) / (tc1 - tc0)) + 4 * M.io((t - tc2) / (tc3 - tc2));
let cLast = null;
const NAT = [['Two different real roots', C.okBg, '#1F6B3F'], ['Two equal real roots', '#E7EEFD', VB], ['A complex conjugate pair', C.ac, '#FFFFFF']];
const th1 = PUC.think($('#th1'), { q: `For ${K('x^2 + 2x + 5 = 0')}, is ${K(DD)} positive, zero or negative?`, opts: ['Positive', 'Zero', 'Negative'], right: 2,
  why: `${K(`${DD} = 4 - 20 = ${dv('-16')}`)}, so the roots are complex: ${K(`${re('-1')} \\pm ${im('2')}${I}`)}` });

/* ---------- R: why the sign decides ---------- */
const RS = [[`x = -\\frac{${bv('b')}}{2${av('a')}} \\pm \\frac{\\sqrt{${DD}}}{2${av('a')}}`, 'a centre, plus or minus a step'],
  [`${DD} > 0:\\ \\ \\sqrt{${DD}} > 0`, 'two different real roots'],
  [`${DD} = 0:\\ \\ \\sqrt{${DD}} = 0`, 'one root, -b/2a, counted twice'],
  [`${DD} < 0:\\ \\ \\sqrt{${DD}} = ${I}\\sqrt{-${DD}}`, 'a complex conjugate pair']];
$('#dSt').innerHTML = RS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 104}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:36px;top:${i ? 4 : -6}px">${K(f)}</div><div class="why" style="top:64px">${w}</div></div>`).join('');
const tDs = [wt('R2', 'roots'), wt('R3', 'positive'), wt('R4', 'zero'), wt('R5', 'negative')];
const MR = [[-1, `${DD} > 0`, 'crosses twice: two real roots'], [0, `${DD} = 0`, 'touches once: equal roots'], [1.2, `${DD} < 0`, 'misses: a complex pair']];
$('#mrs').innerHTML = MR.map(([s, f, w], i) => `<div class="mr" id="mr${i}" style="top:${78 + i * 162}px"><svg width="270" height="150" style="position:absolute;left:0;top:0"></svg><div class="fx">${K(f)}</div><div class="mw">${w}</div></div>`).join('');
const mrC = MR.map(([s], i) => { const sv = $('#mr' + i + ' svg'), X = x => 30 + x * 52, Y = y => 104 - y * 20;
  mk(sv, 'line', { x1: 16, y1: Y(0), x2: 250, y2: Y(0), stroke: C.ink, 'stroke-width': 2.5 });
  const cu = mk(sv, 'path', { d: path(x => (x - 2) * (x - 2) + s, 0.15, 3.85, X, Y), fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const pts = s < 0 ? [2 - 1, 2 + 1] : s === 0 ? [2] : []; pts.forEach(x => mk(sv, 'circle', { cx: X(x), cy: Y(0), r: 9, fill: RE, stroke: '#fff', 'stroke-width': 2.5 }));
  return cu; });

/* ---------- S: rational vs irrational ---------- */
const S1R = [`x^2 ${bv('- 6')}x ${cv('+ 5')} = 0`, `${DD} = 36 - 20 = 16 = 4^2`, `x = \\frac{6 \\pm 4}{2} = 5,\\ 1`];
const S2R = [`x^2 ${bv('- 6')}x ${cv('+ 7')} = 0`, `${DD} = 36 - 28 = 8`, `x = \\frac{6 \\pm 2\\sqrt{2}}{2} = 3 \\pm \\sqrt{2}`];
$('#s1R').innerHTML = S1R.map((f, i) => `<div class="fx" id="s1r${i}" style="left:36px;top:${76 + i * 84}px;font-size:36px">${K(f)}</div>`).join('');
$('#s2R').innerHTML = S2R.map((f, i) => `<div class="fx" id="s2r${i}" style="left:36px;top:${76 + i * 84}px;font-size:36px">${K(f)}</div>`).join('');
$('#s2P').innerHTML = `Roots ${K('3 \\pm \\sqrt{2}')}: irrational`;
const nLine = (svg, pts, labs) => { const X = x => 70 + x * 106, Y = 400;
  mk(svg, 'line', { x1: 40, y1: Y, x2: 744, y2: Y, stroke: C.ink, 'stroke-width': 3 });
  [0, 1, 2, 3, 4, 5, 6].forEach(v => { mk(svg, 'line', { x1: X(v), y1: Y - 8, x2: X(v), y2: Y + 8, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), Y + 36, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
  return pts.map((x, i) => { const g = mk(mk(svg, 'g', { transform: `translate(${X(x).toFixed(1)},${Y})` }), 'g', {}); mk(g, 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }); txt(g, 0, -26, labs[i], { 'text-anchor': 'middle', fill: RE, 'font-weight': 600, 'font-size': 22 }); return g; }); };
const n1 = nLine($('#s1S'), [1, 5], ['1', '5']), n2 = nLine($('#s2S'), [3 - Math.SQRT2, 3 + Math.SQRT2], ['3 - √2', '3 + √2']);
const th2 = PUC.think($('#th2'), { q: `${K('x^2 - 4x + 1 = 0')}: rational roots, or irrational?`, opts: ['Rational', 'Irrational'], right: 1,
  why: `${K(`${DD} = 16 - 4 = 12`)}, not a perfect square. Roots: ${K('2 \\pm \\sqrt{3}')}` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${DD} > 0\\ \\text{real, unequal} \\qquad ${DD} = 0\\ \\text{equal} \\qquad ${DD} < 0\\ \\text{complex}`);

/* ---------- W: worked example, live k ---------- */
$('#wq').innerHTML = `Find ${K('k')} so that ${K(`x^2 ${bv('- k')}x ${cv('+ 9')} = 0`)} has equal roots.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${av('a')} = 1,\\ ${bv('b')} = -k,\\ ${cv('c')} = 9`)],
  [K(`${DD} = k^2 - 36`)],
  [K(`${DD} = 0 \\;\\Rightarrow\\; k^2 = 36`)],
  [K(`k = 6 \\ \\ \\text{or}\\ \\ k = -6`)],
  [K(`k = 6:\\ \\ x^2 - 6x + 9 = (x - 3)^2`)]], { label: 'WORKED EXAMPLE', y0: 168, dy: 78 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Here'), wt('W4', 'squared'), wt('W5', 'Equal'), wt('W6', 'six'), wt('W7', 'Check')];
const ws = $('#wS'), WX = x => 392 + x * 76, WY = y => 420 - y * 24;
const clip = mk(mk(ws, 'defs', {}), 'clipPath', { id: 'wClip' }); mk(clip, 'rect', { x: 30, y: 116, width: 724, height: 370 });
mk(ws, 'line', { x1: 40, y1: WY(0), x2: 742, y2: WY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ws, 754, WY(0), 'r', C.ink);
mk(ws, 'line', { x1: WX(0), y1: 480, x2: WX(0), y2: 132, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ws, WX(0), 120, 'u', C.ink);
[-4, -3, -2, -1, 1, 2, 3, 4].forEach(v => { mk(ws, 'line', { x1: WX(v), y1: WY(0) - 7, x2: WX(v), y2: WY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ws, WX(v), WY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
const wG = mk(ws, 'path', { d: path(x => x * x + 6 * x + 9, -4.45, 4.45, WX, WY), fill: 'none', stroke: C.dim, 'stroke-width': 4, 'stroke-dasharray': '10 8', 'clip-path': 'url(#wClip)' });
const wGl = txt(ws, WX(-3), WY(0) - 22, 'k = -6', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 });
const wCurve = mk(ws, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'clip-path': 'url(#wClip)' });
const wTouch = mk(ws, 'circle', { cx: WX(3), cy: WY(0), r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 });
const tk0 = T0('W3'), tk1 = wt('W6', 'six');
const kAt = t => 6 * M.io((t - tk0) / (tk1 - tk0));
let kLast = null;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{real roots}:\\ ${DD} > 0 \\;\\Rightarrow\\; k > 2\\ \\text{or}\\ k < -2`), right: K(`\\text{real roots}:\\ ${DD} \\ge 0 \\;\\Rightarrow\\; k \\ge 2\\ \\text{or}\\ k \\le -2`) });
const ts = $('#tS'), TXk = v => 280 + v * 56, TYk = 150;
mk(ts, 'line', { x1: 24, y1: TYk, x2: 536, y2: TYk, stroke: C.ink, 'stroke-width': 3 });
for (let v = -4; v <= 4; v++) { mk(ts, 'line', { x1: TXk(v), y1: TYk - 8, x2: TXk(v), y2: TYk + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXk(v), TYk + 38, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
const tRays = [mk(ts, 'line', { x1: TXk(-2), y1: TYk, x2: 30, y2: TYk, stroke: C.ok, 'stroke-width': 9, 'stroke-linecap': 'round' }), mk(ts, 'line', { x1: TXk(2), y1: TYk, x2: 530, y2: TYk, stroke: C.ok, 'stroke-width': 9, 'stroke-linecap': 'round' })];
const tEnds = [-2, 2].map(v => mk(ts, 'circle', { cx: TXk(v), cy: TYk, r: 12, fill: C.ok, stroke: '#fff', 'stroke-width': 3 }));
const tNote = txt(ts, TXk(0), TYk - 40, 'k = 2: (x - 2)² = 0, real and equal', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A condition on the roots becomes a condition on D (JEE Main, 26 Aug 2021, Shift 1)' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`x^2 - 2kx + (k + 6) = 0`)}<br>For how many integers k does this<br>equation have no real roots?`,
  opts: ['3', '4', '5', '6'], right: 1, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`${DD} < 0:\\ 4k^2 - 4(k + 6) < 0`)], [K(`k^2 - k - 6 < 0`)], [K(`(k - 3)(k + 2) < 0`)], [K(`-2 < k < 3`)], [K(`k = -1, 0, 1, 2 \\;\\Rightarrow\\; 4`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'No'), wt('A3', 'Divide'), wt('A3', 'That'), wt('A4', 'between'), wt('A4', 'integers')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 252, w: 1260, h: 492, title: 'Recap · the discriminant', y0: 98, dy: 78, txt: [1, 0, 0, 0, 1],
  lines: [`<b>Discriminant</b>: ${K(`${DD} = ${DF}`)}, read its sign before you solve`,
    K(`${DD} > 0:\\ \\text{two real, unequal roots}`),
    K(`${DD} = 0:\\ \\text{two equal real roots},\\ x = -\\tfrac{${bv('b')}}{2${av('a')}}`),
    K(`${DD} < 0:\\ \\text{a complex conjugate pair}`),
    'Rational a, b, c and D a perfect square: rational roots'] });
const YQ = [`Find D for ${K('2x^2 + 3x + 4 = 0')}. What kind of roots?`, 'Why does D = 0 give two equal roots?', `For which k does ${K('x^2 + kx + 4 = 0')} have equal roots?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 47', topic: 'Sum and product without solving: Roots and Coefficients', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPush = wt('L4', 'hits') - 0.3;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPush, 1.12, 620, 640], [tc2 - 0.2, 1, 960, 540]]);
let ghX = null;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  if (ghX === null) { ghX = 160 + $('#nchip').offsetWidth + 16; $('#gh').style.left = ghX + 'px'; }
  M.vis($('#gh'), t, tMorph + 0.8, tQ - 0.05, { dy: 0, dx: -16, outDur: 0.01 });

  /* title card */
  EQ.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    EQ.forEach((_, i) => { M.vis($('#er' + i), t, tMorph + 0.25 + i * 0.12, 1e9, { dy: 14 }); M.vis($('#er' + i + ' .chip'), t, tEr[i] - 0.05, 1e9, POP); });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Can') - 0.1, wt('H5', 'number') - 0.1, POP);
    M.vis($('#hkP2'), t, wt('H5', 'number'), 1e9, POP);
  }

  /* P: the part under the root */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P1', 'formula') - 0.1, 1.0);
    const card = $('#df'), sq = $('#pF .sqrt'), bx = $('#pBox');
    if (sq && t >= wt('P2', 'Only') - 0.3) { const cr = card.getBoundingClientRect(), r = sq.getBoundingClientRect(), k = card.offsetWidth / cr.width;
      bx.style.left = ((r.left - cr.left) * k - 10).toFixed(1) + 'px'; bx.style.top = ((r.top - cr.top) * k - 8).toFixed(1) + 'px'; bx.style.width = (r.width * k + 20).toFixed(1) + 'px'; bx.style.height = (r.height * k + 16).toFixed(1) + 'px'; }
    M.vis(bx, t, wt('P2', 'Only') - 0.05, 1e9, { ...POP, sc: 0.9 });
    M.vis($('#dr0'), t, wt('P2', 'Minus') - 0.1, 1e9, { dy: 14 }); M.vis($('#dr1'), t, wt('P2', 'Only') + 0.1, 1e9, { dy: 14 });
    M.vis($('#dd'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#dBig'), t, wt('P3', 'discriminant') - 0.1, 1.0);
    M.vis($('#dr2'), t, wt('P4', 'discriminate') - 0.1, 1e9, { dy: 14 }); M.vis($('#dr3'), t, wt('P4', 'kinds') - 0.1, 1e9, { dy: 14 });
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L7');
    M.vis($('#lg'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#lFx'), t, wt('L1', 'equals') - 0.2, 0.9);
    const c = cAt(t), ck = c.toFixed(3), Dv = 36 - 4 * c;
    M.vis($('#dRd'), t, wt('L1', 'Watch'), 1e9, { dy: 10 }); M.vis($('#cRd2'), t, wt('L1', 'counting'), 1e9, { dy: 10 });
    if (ck !== cLast) {
      cLast = ck; M.setT($('#cV'), c.toFixed(2)); M.setT($('#dV'), (Math.abs(Dv) < 0.005 ? 0 : Dv).toFixed(2));
      const w = Math.sqrt(Math.max(0, 21.5 - c)); attr(lCurve, 'd', path(x => x * x - 6 * x + c, Math.max(-0.45, 3 - w), Math.min(6.45, 3 + w), LX, LY));
      const r = Math.sqrt(Math.max(0, 9 - c)), q = Math.sqrt(Math.max(0, c - 9));
      lR.forEach((d, i) => { attr(d, 'cx', LX(3 + (i ? r : -r)).toFixed(1)); attr(d, 'cy', LY(0)); });
      aR.forEach((d, i) => { attr(d, 'cx', AX(3 + (i ? r : -r)).toFixed(1)); attr(d, 'cy', AY(i ? -q : q).toFixed(1)); attr(d, 'fill', c > 9.001 ? C.ink : RE); });
      aIm.forEach((l, i) => attr(l, 'y2', AY(i ? -q : q).toFixed(1)));
      $('#rRo').innerHTML = c < 8.9995 ? `x = <span class="re">${f2(3 - r)}</span> and <span class="re">${f2(3 + r)}</span>` : c <= 9.0005 ? `x = <span class="re">3</span> and <span class="re">3</span>` : `x = <span class="re">3</span> ± <span class="im">${f2(q)}</span><i class="iu">i</i>`;
      const n = Dv > 0.01 ? 0 : Dv > -0.01 ? 1 : 2, pl = $('#natP'); if (pl._n !== n) { pl._n = n; pl.textContent = NAT[n][0]; pl.style.background = NAT[n][1]; pl.style.color = NAT[n][2]; }
    }
    M.vis(lCurve, t, wt('L1', 'squared'), 1e9, { dy: 0, fade: 0.3 });
    const reOn = t >= wt('L2', 'cuts') - 0.1 && cAt(t) < 9.02;
    lR.forEach(d => { d.style.opacity = reOn ? M.clamp((t - wt('L2', 'cuts') + 0.1) / 0.2) * M.clamp((9.02 - c) / 0.02) : 0; M.hide(d, !reOn); });
    M.vis($('#la'), t, wt('L2', 'cuts') - 0.1, out, { dx: 60, dy: 0, ...o });
    aR.forEach(d => M.vis(d, t, wt('L2', 'cuts') + 0.2, 1e9, { dy: 0, fade: 0.15 }));
    const cpx = M.clamp((c - 9) / 0.25); aRe.style.opacity = cpx; aIm.forEach(l => { l.style.opacity = cpx; });
    M.vis($('#rRo'), t, wt('L2', 'cuts') + 0.3, 1e9, { dy: 10 });
    M.vis($('#natP'), t, wt('L2', 'Positive') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tL7 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tL7, tOpts: wt('L7', 'positive') - 0.1, tCount: T1('L7') + 0.05, dur: 3, tAns: T0('L8') - 0.02, tWhy: wt('L8', 'four') });
  }

  /* R: why the sign decides */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#dp'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 104]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#rSum'), t, wt('R6', 'sign') - 0.1, 1e9, POP);
    M.vis($('#rC'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    MR.forEach((_, i) => { const el = $('#mr' + i); M.vis(el, t, tDs[i + 1] - 0.15, 1e9, { dy: 14 }); M.draw(mrC[i], t, tDs[i + 1], 0.7);
      const on = M.io((t - tDs[i + 1] + 0.1) / 0.3) * (i < 2 ? 1 - M.io((t - tDs[i + 2] + 0.1) / 0.3) : 1 - M.io((t - T0('R6')) / 0.3)); el.style.background = mix('#FFFFFF', C.ac3, on); });
  }

  /* S: rational vs irrational + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#sRat'), t, wt('S1', 'rational') - 0.1, out, POP);
    M.vis($('#s1'), t, wt('S1', 'Take'), out, { dx: -60, dy: 0, ...o });
    [wt('S2', 'squared'), wt('S2', 'sixteen'), wt('S2', 'roots', 1)].forEach((tt, i) => PUC.write($('#s1r' + i), t, tt - 0.1, 0.7));
    n1.forEach((g, i) => M.vis(g, t, wt('S2', 'roots', 1) + 0.3 + i * 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s1P'), t, wt('S2', 'five', 1), 1e9, POP);
    M.vis($('#s2'), t, T0('S3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('S3', 'squared'), wt('S3', 'eight'), wt('S3', 'three')].forEach((tt, i) => PUC.write($('#s2r' + i), t, tt - 0.1, 0.7));
    n2.forEach((g, i) => M.vis(g, t, wt('S3', 'three') + 0.3 + i * 0.4, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s2P'), t, wt('S3', 'minus', 1), 1e9, POP);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Rational') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'sixteen') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Check') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'tells') - 0.2, 1.0);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const k = kAt(t), kk = k.toFixed(3);
    if (kk !== kLast) { kLast = kk; M.setT($('#kV'), k.toFixed(2)); M.setT($('#cRd3'), `D = k² - 36 = ${(k * k - 36).toFixed(2)}`); attr(wCurve, 'd', path(x => x * x - k * x + 9, -4.45, 4.45, WX, WY)); }
    M.vis($('#kRd'), t, T0('W2') + 0.5, 1e9, { dy: 10 }); M.vis($('#cRd3'), t, T0('W2') + 0.6, 1e9, { dy: 10 });
    M.vis(wCurve, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.3 });
    M.vis(wTouch, t, tk1 - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#wP'), t, tk1 + 0.1, 1e9, POP);
    M.vis(wG, t, wt('W6', 'minus') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(wGl, t, wt('W6', 'minus'), 1e9, { dy: 0 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'means') + 0.1 });
    tRays.forEach(l => M.draw(l, t, wt('X3', 'least') - 0.1, 0.6)); tEnds.forEach(c => M.vis(c, t, wt('X3', 'least') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(tNote, t, wt('X3', 'most') - 0.2, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'condition') });
    M.vis($('#waG'), t, wt('J1', 'current') - 0.1, 1e9, POP);
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'For'), tCount, tAns });
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
