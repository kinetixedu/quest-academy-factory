// PUC Maths Ep 48: Formation of quadratic equations from roots (Proof board) - last episode of Chapter 4
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
const I = iu('i');
const path = (f, x0, x1, X, Y, n = 90) => { let d = ''; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n; d += (k ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1); } return d; };
const arrowHead = (p, x, y, dir, col) => mk(p, 'path', { d: dir === 'r' ? `M${x},${y} l-14,-8 v16 z` : dir === 'd' ? `M${x},${y} l-8,-14 h16 z` : `M${x},${y} l-8,14 h16 z`, fill: col });
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const SUM = `\\alpha + \\beta`, PRO = `\\alpha\\beta`;
const cpx = (p, q, s = '+') => `${re(p)} ${s} ${im(q)}${I}`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tL7 = T0('L7'), tR1 = T0('R1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['USUALLY', 'Equation → roots', C.ink], ['TODAY', 'Roots → equation', C.ac], ['RAVI ASKS', 'Roots 2 and 5', C.ink]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'given') - 0.1, wt('H1', 'roots') + 0.2, wt('H1', 'roots') + 0.6];

/* ---------- H: Ravi's puzzle ---------- */
const PZ = [['ROUND 1 · ROOTS', `${re('2')}\\ \\text{and}\\ ${re('5')}`, 'Equation?'], ['ROUND 2 · ROOTS', `${cpx('1', '2')}\\ \\text{and}\\ ${cpx('1', '2', '-')}`, 'No i allowed']];
$('#pzs').innerHTML = PZ.map(([l, f, ch], i) => `<div class="pz" id="pz${i}" style="top:${92 + i * 150}px"><div class="ln">${l}</div><div class="fx">${K(f)}</div><div class="chip">${ch}</div></div>`).join('');

/* ---------- P: zero product rule ---------- */
$('#zr').innerHTML = K(`p \\times q = 0 \\;\\Rightarrow\\; p = 0\\ \\text{or}\\ q = 0`);
$('#zr2').innerHTML = K(`(x - ${re('2')})(x - ${re('5')}) = 0`);
$('#ck0').innerHTML = M.icon('check', 26, C.ok, 3) + K(`x = 2:\\ \\ 0 \\times (-3) = 0`);
$('#ck1').innerHTML = M.icon('check', 26, C.ok, 3) + K(`x = 5:\\ \\ 3 \\times 0 = 0`);
const PE = [['(x - 2)(x - 5)', ''], ['= x^2 - 5x - 2x + 10', 'multiply each term'], [`= x^2 ${bv('- 7')}x ${cv('+ 10')}`, 'collect like terms']];
$('#peR').innerHTML = PE.map(([f, g], i) => `<div class="rw" id="pe${i}" style="top:${96 + i * 100}px">${K(f)}${g ? `<span class="tg">${g.toUpperCase()}</span>` : ''}</div>`).join('');

/* ---------- L: move the roots, the equation rebuilds ---------- */
const as = $('#aS'), AX = x => 90 + x * 100, AY = v => 310 - v * 80;
mk(as, 'line', { x1: 50, y1: AY(0), x2: 742, y2: AY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, 754, AY(0), 'r', C.ink);
mk(as, 'line', { x1: AX(0), y1: 490, x2: AX(0), y2: 152, stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, AX(0), 140, 'u', C.ink);
[1, 2, 3, 4, 5, 6].forEach(v => { mk(as, 'line', { x1: AX(v), y1: AY(0) - 7, x2: AX(v), y2: AY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(v) + (v === 3 ? 14 : 0), AY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[[1, 'i'], [2, '2i'], [-1, '-i'], [-2, '-2i']].forEach(([v, l]) => { mk(as, 'line', { x1: AX(0) - 7, y1: AY(v), x2: AX(0) + 7, y2: AY(v), stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(0) - 14, AY(v) + 6, l, { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 }); });
txt(as, 742, AY(0) - 14, 'real', { 'text-anchor': 'end', fill: RE, 'font-weight': 600 });
const aPin = mk(as, 'line', { x1: AX(3), y1: 150, x2: AX(3), y2: 480, stroke: VB, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const aIm = [0, 1].map(() => mk(as, 'line', { x1: AX(3), y1: AY(0), x2: AX(3), y2: AY(0), stroke: IM, 'stroke-width': 5, 'stroke-dasharray': '8 6' }));
const aR = [0, 1].map(() => mk(as, 'circle', { r: 14, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const ls = $('#lS'), LX = x => 60 + (x + 0.5) * 96, LY = y => 520 - (y + 4.5) * 22;
mk(ls, 'line', { x1: 40, y1: LY(0), x2: 742, y2: LY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, 754, LY(0), 'r', C.ink);
mk(ls, 'line', { x1: LX(0), y1: 540, x2: LX(0), y2: 152, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, LX(0), 140, 'u', C.ink);
[1, 2, 3, 4, 5, 6].forEach(v => { mk(ls, 'line', { x1: LX(v), y1: LY(0) - 7, x2: LX(v), y2: LY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ls, LX(v), LY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
const lCurve = mk(ls, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const lR = [0, 1].map(() => mk(ls, 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const ts0 = wt('L3', 'Slide'), ts1 = wt('L4', 'three'), tq0 = wt('L5', 'step'), tq1 = wt('L5', 'Three'), tq2 = T0('L6') + 0.3, tq3 = wt('L6', 'thirteen');
const rootAt = t => { const d = 2 * (1 - M.io((t - ts0) / (ts1 - ts0))), q = M.io((t - tq0) / (tq1 - tq0)) + M.io((t - tq2) / (tq3 - tq2)); return [d, q]; };
let rLast = null;
const th1 = PUC.think($('#th1'), { q: 'The roots are 4 and -1. What is the constant term?', opts: ['4', '-4', '3'], right: 1,
  why: `Constant = product = ${K('4 \\times (-1) = -4')}. The equation: ${K(`x^2 ${bv('- 3')}x ${cv('- 4')} = 0`)}` });

/* ---------- R: general rule ---------- */
const RS = [[`(x - \\alpha)(x - \\beta) = 0`, 'zero exactly at α and at β'],
  [`x^2 - \\alpha x - \\beta x + ${PRO} = 0`, 'multiply out'],
  [`x^2 - (${SUM})\\,x + ${PRO} = 0`, 'group the middle terms'],
  [`x^2 - (\\text{sum})\\,x + (\\text{product}) = 0`, 'in words']];
$('#dSt').innerHTML = RS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 104}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:38px">${K(f)}</div><div class="why" style="top:64px">${w}</div></div>`).join('');
$('#rRes').innerHTML = K(`\\text{with } ${av('a')} = 1:\\ \\ ${bv('b')} = -(${SUM}),\\ \\ ${cv('c')} = ${PRO}`);
const tDs = [wt('R2', 'minus'), wt('R3', 'Multiply'), wt('R4', 'Group'), wt('R5', 'words')];
$('#rBx').innerHTML = [[60, 84, 'ROOT', '\\alpha'], [424, 84, 'ROOT', '\\beta'], [60, 230, 'SUM', SUM], [424, 230, 'PRODUCT', PRO]].map(([x, y, l, f], i) =>
  `<div class="fb" id="fb${i}" style="left:${x}px;top:${y}px;width:300px;${i > 1 ? `border-color:${i === 2 ? VB : VC}` : ''}"><span class="ln">${l}</span>${K(f)}</div>`).join('');
const rs = $('#rS'), rAr = [[210, 170, 210, 226], [574, 170, 574, 226], [250, 170, 534, 226], [534, 170, 250, 226], [210, 316, 300, 362], [574, 316, 484, 362]].map(([x1, y1, x2, y2]) => { const a = PUC.arrow(rs, C.dim, 3, 11); a.set(x1, y1, x2, y2); return a; });
$('#rTpl').innerHTML = K(`x^2 - (${bv('\\text{sum}')})\\,x + (${cv('\\text{product}')}) = 0`);
$('#rEx').innerHTML = K(`\\text{roots } 2, 5:\\ \\ x^2 ${bv('- 7')}x ${cv('+ 10')} = 0`);

/* ---------- S: k times the equation ---------- */
$('#s1F').innerHTML = K(`x^2 ${bv('- 7')}x ${cv('+ 10')} = 0`); $('#s2F').innerHTML = K(`${av('2')}x^2 ${bv('- 14')}x ${cv('+ 20')} = 0`);
$('#s2Q').innerHTML = `${K('k\\,(x^2 - 7x + 10) = 0,\\ k \\ne 0')}: same roots`;
const sGraph = (svg, k, ghost) => { const X = x => 60 + x * 100, Y = y => 360 - y * 20;
  const clip = mk(mk(svg, 'defs', {}), 'clipPath', { id: 'sc' + k }); mk(clip, 'rect', { x: 30, y: 130, width: 724, height: 350 });
  mk(svg, 'line', { x1: 40, y1: Y(0), x2: 742, y2: Y(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(svg, 754, Y(0), 'r', C.ink);
  [1, 2, 3, 4, 5, 6].forEach(v => { mk(svg, 'line', { x1: X(v), y1: Y(0) - 7, x2: X(v), y2: Y(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), Y(0) + (v === 2 || v === 5 ? 34 : 34), v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
  const g = ghost ? mk(svg, 'path', { d: path(x => x * x - 7 * x + 10, 0.2, 6.8, X, Y), fill: 'none', stroke: C.dim, 'stroke-width': 3.5, 'stroke-dasharray': '9 7', 'clip-path': `url(#sc${k})` }) : null;
  const cu = mk(svg, 'path', { d: path(x => k * (x * x - 7 * x + 10), 0.2, 6.8, X, Y, 120), fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'clip-path': `url(#sc${k})` });
  const dots = [2, 5].map(v => mk(svg, 'circle', { cx: X(v), cy: Y(0), r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
  return { g, cu, dots }; };
const sg1 = sGraph($('#s1S'), 1, false), sg2 = sGraph($('#s2S'), 2, true);
const th2 = PUC.think($('#th2'), { q: `Does ${K('-x^2 + 7x - 10 = 0')} have roots 2 and 5?`, opts: ['Yes', 'No'], right: 0,
  why: `It is ${K('-1')} times Ravi's equation. The curve flips, but still crosses at 2 and 5.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`x^2 - (${SUM})\\,x + ${PRO} = 0`);

/* ---------- W: worked example 1 +- 2i ---------- */
$('#wq').innerHTML = `Form a quadratic with real coefficients<br>whose roots are ${K(cpx('1', '2'))} and ${K(cpx('1', '2', '-'))}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{sum} = (${cpx('1', '2')}) + (${cpx('1', '2', '-')}) = 2`)],
  [K(`\\text{product} = 1^2 - (${im('2')}${I})^2 = 1 + 4 = 5`)],
  [K(`x^2 ${bv('- 2')}x ${cv('+ 5')} = 0`)],
  ['Real sum, real product: real coefficients']], { label: 'WORKED EXAMPLE', y0: 210, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'sum'), wt('W4', 'product'), wt('W5', 'Put'), wt('W6', 'conjugate')];
const ws = $('#wS'), WX = x => 230 + x * 180, WY = v => 290 - v * 82;
mk(ws, 'line', { x1: 110, y1: WY(0), x2: 742, y2: WY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ws, 754, WY(0), 'r', C.ink);
mk(ws, 'line', { x1: WX(0), y1: 480, x2: WX(0), y2: 104, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ws, WX(0), 92, 'u', C.ink);
[1, 2].forEach(v => { mk(ws, 'line', { x1: WX(v), y1: WY(0) - 7, x2: WX(v), y2: WY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ws, WX(v) + 14, WY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[[2, '2i'], [-2, '-2i']].forEach(([v, l]) => { mk(ws, 'line', { x1: WX(0) - 7, y1: WY(v), x2: WX(0) + 7, y2: WY(v), stroke: C.ink, 'stroke-width': 2 }); txt(ws, WX(0) - 14, WY(v) + 6, l, { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 }); });
const wRe = mk(ws, 'line', { x1: WX(0), y1: WY(0), x2: WX(1), y2: WY(0), stroke: RE, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wIm = [2, -2].map(v => mk(ws, 'line', { x1: WX(1), y1: WY(0), x2: WX(1), y2: WY(v), stroke: IM, 'stroke-width': 5, 'stroke-dasharray': '8 6' }));
const wPt = [2, -2].map(v => mk(ws, 'circle', { cx: WX(1), cy: WY(v), r: 13, fill: C.ink, stroke: '#fff', 'stroke-width': 3 }));
const wLb = [[2, cpx('1', '2')], [-2, cpx('1', '2', '-')]].map(([v, f]) => { const d = document.createElement('div'); d.className = 'fx'; d.style.cssText = `font-size:30px;left:${WX(1) + 28}px;top:${WY(v) - 24}px`; d.innerHTML = K(f); $('#wr').appendChild(d); return d; });
const wCan = document.createElement('div'); wCan.className = 'fx'; wCan.style.cssText = `font-size:24px;left:${WX(1) + 28}px;top:${WY(0) - 52}px`; wCan.innerHTML = K(`${im('+2')}${I}\\ \\text{and}\\ ${im('-2')}${I}\\ \\text{cancel}`); $('#wr').appendChild(wCan);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{roots } 2, 5:\\ \\ x^2 + 7x + 10 = 0`), right: K(`\\text{roots } 2, 5:\\ \\ x^2 - 7x + 10 = 0`) });
const ts = $('#tS');
const tChkL = txt(ts, 24, 92, 'PUT x = 2 BACK IN', { 'font-size': 18, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 });
const tChk = txt(ts, 24, 136, '4 + 14 + 10 = 28 ≠ 0', { 'font-size': 28, fill: C.red, 'font-weight': 600 });
const tChk2 = txt(ts, 24, 212, '4 - 14 + 10 = 0', { 'font-size': 28, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Build a new equation from the roots of an old one (JEE Main, 4 April 2024, Shift 1)' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K('\\alpha, \\beta')} are the roots of ${K('x^2 - 3x + 1 = 0')}.<br>Which equation has roots ${K('\\alpha^2')} and ${K('\\beta^2')}?`,
  opts: [K('x^2 - 7x + 1 = 0'), K('x^2 - 9x + 1 = 0'), K('x^2 + 7x + 1 = 0'), K('x^2 - 7x - 1 = 0')], right: 0, optW: 474, optY: 316, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${SUM} = 3,\\ \\ ${PRO} = 1`)], [K(`\\alpha^2 + \\beta^2 = 9 - 2 = 7`)], [K(`\\alpha^2\\beta^2 = (${PRO})^2 = 1`)], [K(`x^2 - 7x + 1 = 0`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'alpha'), wt('A3', 'Nine'), wt('A4', 'product'), wt('A4', 'equation')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 252, w: 1260, h: 492, title: 'Recap · equations from roots', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: [`<b>Roots</b> ${K('\\alpha, \\beta')} in, equation out`,
    K(`x^2 - (${SUM})\\,x + ${PRO} = 0`),
    K(`(x - \\alpha)(x - \\beta) = 0`),
    K(`k\\,\\big(x^2 - (${SUM})\\,x + ${PRO}\\big) = 0,\\ \\ k \\ne 0`),
    `Conjugate pair ${K(`${re('p')} \\pm ${im('q')}${I}`)}: ${K(`x^2 - 2${re('p')}x + (${re('p')}^2 + ${im('q')}^2) = 0`)}`] });
const YQ = ['Form a quadratic whose roots are 3 and -4.', 'Why does a conjugate pair always give real coefficients?', 'Write two different quadratics whose roots are both -2.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'CHAPTER 4 COMPLETE', topic: 'Every episode: PUC Maths | Class 11 playlist', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPush = ts1 - 0.3;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPush, 1.1, 1300, 640], [tq0 - 0.2, 1, 960, 540]]);
let ghX = null;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  if (ghX === null) { ghX = 160 + $('#nchip').offsetWidth + 16; $('#gh').style.left = ghX + 'px'; }
  M.vis($('#gh'), t, tMorph + 0.8, tQ - 0.05, { dy: 0, dx: -16, outDur: 0.01 });

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pz0'), t, wt('H2', 'roots') - 0.1, 1e9, { dy: 14 }); M.vis($('#pz0 .chip'), t, wt('H2', 'What') - 0.05, 1e9, POP);
    M.vis($('#pz1'), t, wt('H4', 'roots') - 0.1, 1e9, { dy: 14 }); M.vis($('#pz1 .chip'), t, wt('H4', 'Can') - 0.05, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'ten') - 0.1, wt('H5', 'backwards') - 0.2, POP);
    M.vis($('#hkP2'), t, wt('H5', 'backwards') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#zr'), t, wt('P1', 'product') - 0.1, 1.0);
    PUC.write($('#zr2'), t, T0('P2') + 0.1, 1.0);
    M.vis($('#ck0'), t, wt('P2', 'true') - 0.05, 1e9, { dx: -16, dy: 0 }); M.vis($('#ck1'), t, wt('P2', 'when', 1) - 0.05, 1e9, { dx: -16, dy: 0 });
    M.vis($('#ckN'), t, wt('P2', 'Nowhere') - 0.1, 1e9, POP);
    M.vis($('#pe'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('P3', 'Multiply'), wt('P3', 'out') + 0.4, wt('P3', 'squared')].forEach((tt, i) => PUC.write($('#pe' + i), t, tt, 0.8));
    M.vis($('#peP'), t, wt('P3', 'Ravi') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L7');
    M.vis($('#la'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lg'), t, wt('L1', 'watch') - 0.1, out, { dx: 60, dy: 0, ...o });
    const [d, q] = rootAt(t), key = d.toFixed(3) + q.toFixed(3);
    if (key !== rLast) {
      rLast = key; const P = d > 0.0005 ? 9 - d * d : 9 + q * q;
      aR.forEach((c, i) => { attr(c, 'cx', AX(3 + (i ? d : -d)).toFixed(1)); attr(c, 'cy', AY(i ? -q : q).toFixed(1)); attr(c, 'fill', q > 0.001 ? C.ink : RE); });
      aIm.forEach((l, i) => attr(l, 'y2', AY(i ? -q : q).toFixed(1)));
      $('#sumRd').innerHTML = `sum = ${f2(6)}`; $('#proRd').innerHTML = `product = ${f2(P)}`;
      $('#rRo').innerHTML = q > 0.001 ? `<span class="re">3</span> ± <span class="im">${f2(q)}</span><i class="iu">i</i>` : `<span class="re">${f2(3 - d)}</span> and <span class="re">${f2(3 + d)}</span>`;
      $('#eqLive').innerHTML = K(`x^2 ${bv('- 6')}x ${cv('+ ' + f2(P))} = 0`);
      const w = Math.sqrt(Math.max(0, 23 - P)); attr(lCurve, 'd', path(x => x * x - 6 * x + P, Math.max(-0.45, 3 - w), Math.min(6.45, 3 + w), LX, LY));
      lR.forEach((c, i) => { attr(c, 'cx', LX(3 + (i ? d : -d)).toFixed(1)); attr(c, 'cy', LY(0)); });
    }
    aR.forEach(c => M.vis(c, t, wt('L1', 'roots') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(aPin, t, wt('L1', 'three') - 0.1, 1e9, { dy: 0, fade: 0.25 });
    aIm.forEach(l => { l.style.opacity = M.clamp(q / 0.15); });
    M.vis($('#rRo'), t, wt('L1', 'roots') + 0.2, 1e9, { dy: 10 });
    M.vis($('#sumRd'), t, wt('L2', 'sum') - 0.1, 1e9, { dy: 10 }); M.vis($('#proRd'), t, wt('L2', 'product') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#eqLive'), t, wt('L2', 'equation') - 0.1, 0.9);
    M.vis(lCurve, t, wt('L2', 'equation') + 0.2, 1e9, { dy: 0, fade: 0.3 });
    lR.forEach(c => { const on = t >= wt('L2', 'equation') + 0.3 && q < 0.02; c.style.opacity = on ? M.clamp(1 - q / 0.02) : 0; M.hide(c, !on); });
    M.vis($('#th1'), t, tL7 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tL7, tOpts: wt('L7', 'constant') - 0.1, tCount: T1('L7') + 0.05, dur: 3, tAns: T0('L8') - 0.02, tWhy: wt('L8', 'constant') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#dp'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 104]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#rRes'), t, wt('R6', 'Here') - 0.1, 1e9, POP);
    M.vis($('#rC'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    [0, 1].forEach(i => M.vis($('#fb' + i), t, wt('R1', 'alpha') + i * 0.3, 1e9, POP));
    [2, 3].forEach(i => M.vis($('#fb' + i), t, tDs[2] + 0.4 + (i - 2) * 0.3, 1e9, { dy: 14 }));
    rAr.forEach((a, i) => M.vis(a.g, t, i < 4 ? tDs[2] + 0.2 : tDs[3] - 0.1, 1e9, { dy: 0, fade: 0.25 }));
    PUC.write($('#rTpl'), t, tDs[3] + 0.1, 0.9);
    PUC.write($('#rEx'), t, wt('R6', 'last') - 0.1, 0.9);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#s1'), t, wt('S1', 'Side') - 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#s1F'), t, T0('S2'), 0.8); M.draw(sg1.cu, t, wt('S2', 'curve') - 0.1, 0.8);
    sg1.dots.forEach((d, i) => M.vis(d, t, wt('S2', 'two') + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s1P'), t, wt('S2', 'five'), 1e9, POP);
    M.vis($('#s2'), t, T0('S3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#s2F'), t, T0('S3') + 0.1, 0.8); M.vis(sg2.g, t, T0('S3') + 0.3, 1e9, { dy: 0, fade: 0.3 }); M.draw(sg2.cu, t, wt('S3', 'curve') - 0.1, 0.8);
    sg2.dots.forEach((d, i) => M.vis(d, t, wt('S3', 'crosses') + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s2P'), t, wt('S3', 'same') - 0.1, T0('S4'), POP);
    M.vis($('#s2Q'), t, T0('S4') + 0.1, 1e9, POP);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'roots') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'minus') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'minus') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'product') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    wPt.forEach((c, i) => M.vis(c, t, T0('W2') + 0.8 + i * 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    wLb.forEach((d, i) => M.vis(d, t, T0('W2') + 1.0 + i * 0.2, 1e9, { dx: -10, dy: 0 }));
    M.vis(wRe, t, T0('W2') + 1.2, 1e9, { dy: 0, fade: 0.2 });
    wIm.forEach(l => { M.vis(l, t, T0('W2') + 1.3, 1e9, { dy: 0, fade: 0.2 }); attr(l, 'stroke-width', (5 + 3 * M.io((t - wt('W3', 'cancel') + 0.1) / 0.3)).toFixed(2)); });
    M.vis(wCan, t, wt('W3', 'cancel'), 1e9, { dy: 8 });
    M.vis($('#wP'), t, tWs[3] - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'roots') - 0.1, tRight: wt('X3', 'right') - 0.1 });
    M.vis(tChkL, t, wt('X3', 'Always') - 0.1, 1e9, { dy: 0 }); M.vis(tChk, t, wt('X3', 'Always') + 0.1, 1e9, { dy: 0 }); M.vis(tChk2, t, wt('X3', 'Always') + 0.5, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'build') });
    M.vis($('#waG'), t, wt('J1', 'current') - 0.1, 1e9, POP);
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
