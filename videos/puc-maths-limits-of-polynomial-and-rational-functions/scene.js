// PUC Maths Ep 82: Limits of polynomial and rational functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (this chapter): input x violet, the top (numerator) blue, the bottom (denominator) teal,
// the shared factor (x - a) orange, the limit / ratio coral accent, "no limit" red
const XV = C.violet, TB = '#2F6FEB', BT = C.teal, FO = C.orange, LC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xv = s => `\\textcolor{${XV}}{${s}}`, tb = s => `\\textcolor{${TB}}{${s}}`, bt = s => `\\textcolor{${BT}}{${s}}`, fo = s => `\\textcolor{${FO}}{${s}}`, lc = s => `\\textcolor{${LC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const X = xv('x');

/* ---------- small plotter ---------- */
const plot = (svg, o) => {
  const Xp = v => o.px + o.pw * (v - o.x0) / (o.x1 - o.x0), Yp = v => o.py + o.ph - o.ph * (v - o.y0) / (o.y1 - o.y0);
  (o.xt || []).forEach(v => mk(svg, 'line', { x1: Xp(v), y1: Yp(o.y0), x2: Xp(v), y2: Yp(o.y1), stroke: '#E9E5DA', 'stroke-width': 2 }));
  (o.yt || []).forEach(v => mk(svg, 'line', { x1: Xp(o.x0), y1: Yp(v), x2: Xp(o.x1), y2: Yp(v), stroke: '#E9E5DA', 'stroke-width': 2 }));
  mk(svg, 'line', { x1: Xp(o.x0), y1: Yp(0), x2: Xp(o.x1), y2: Yp(0), stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'line', { x1: Xp(0), y1: Yp(o.y0), x2: Xp(0), y2: Yp(o.y1), stroke: C.ink, 'stroke-width': 3 });
  (o.xt || []).forEach(v => { if (v) txt(svg, Xp(v), Yp(0) + 30, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { if (v) txt(svg, Xp(0) - 12, Yp(v) + 6, v, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
  const path = (fn, a, b, n = 80) => { let d = ''; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + Xp(x).toFixed(1) + ',' + Yp(fn(x)).toFixed(1); } return d; };
  return { X: Xp, Y: Yp, curve: (fn, a, b, col, sw = 5) => mk(svg, 'path', { d: path(fn, a, b), fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hole: (x, y, col, r = 9) => mk(svg, 'circle', { cx: Xp(x), cy: Yp(y), r, fill: '#fff', stroke: col, 'stroke-width': 4 }) };
};
const mover = (svg, p, col, toX = true) => {
  const g = mk(svg, 'g', {}), gy = mk(g, 'line', { stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }), gx = mk(g, 'line', { stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }), c = mk(g, 'circle', { r: 10, fill: col });
  return { g, set: (x, fn) => { const px = p.X(x), py = p.Y(fn(x)); attr(c, 'cx', px.toFixed(1)); attr(c, 'cy', py.toFixed(1)); attr(gy, 'x1', px.toFixed(1)); attr(gy, 'y1', py.toFixed(1)); attr(gy, 'x2', p.X(0)); attr(gy, 'y2', py.toFixed(1));
    attr(gx, 'x1', px.toFixed(1)); attr(gx, 'y1', py.toFixed(1)); attr(gx, 'x2', px.toFixed(1)); attr(gx, 'y2', toX ? p.Y(0) : py.toFixed(1)); } };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tR1 = T0('R1'), tL1 = T0('L1'), tD1 = T0('D1'), tS1 = T0('S1'), tK1 = T0('K1'), tK4 = T0('K4');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ROTIS', '0'], ['FRIENDS', '0'], ['EACH GETS', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:var(--ac)">${v}</div></div>`).join('');
const tLs = [wt('H1', 'zero') - 0.05, wt('H1', 'zero', 1) - 0.05, wt('H1', 'How') - 0.05];

/* ---------- H: 0 / 0 ---------- */
const HE = [['0 = 0 × 5', 'Five'], ['0 = 0 × 10', 'Ten'], ['0 = 0 × 137', 'Any']];
$('#hEq').innerHTML = `<div class="lbl" style="left:36px;top:84px;font-size:16px">IF EACH FRIEND GETS n ROTIS, THEN 0 = 0 × n</div>` + HE.map(([s], i) => `<div class="eq" id="he${i}" style="top:${128 + i * 96}px">${s}<b>${M.icon('check', 22, C.ok, 3)} fits</b></div>`).join('');
const tHe = HE.map(([, w]) => wt('H2', w));

/* ---------- P: polynomial ---------- */
$('#pF').innerHTML = K(`f(${X}) = ${X}^2 + 3${X} - 1`);
$('#pR').innerHTML = K(`\\lim_{${X} \\to a} f(${X}) = f(a)`);
$('#pC').innerHTML = K(`\\lim_{${X} \\to 2} f(${X}) = 4 + 6 - 1 = ${lc('9')}`);
const PF = x => x * x + 3 * x - 1;
const pp = plot($('#pS'), { x0: -0.2, x1: 3, y0: -2, y1: 18, px: 110, pw: 600, py: 84, ph: 400, xt: [0, 1, 2, 3], yt: [0, 5, 10, 15] });
const pC = pp.curve(PF, -0.2, 3, C.ink, 5), pM = mover($('#pS'), pp, LC);
const pL = txt($('#pS'), pp.X(2) - 14, pp.Y(9) - 18, 'f(2) = 9', { 'text-anchor': 'end', 'font-size': 22, fill: LC, 'font-weight': 600 });
const tPl = wt('P4', 'Plug');

/* ---------- R: rational, three cases ---------- */
$('#rF').innerHTML = K(`\\dfrac{${tb('g(x)')}}{${bt('h(x)')}}`);
const RC = [[`${bt('h(a)')} \\ne 0`, 'Plug in: the limit is g(a)/h(a)', C.ok], [`${bt('h(a)')} = 0, \\ ${tb('g(a)')} \\ne 0`, 'The values shoot off: no limit', C.red], [`${bt('h(a)')} = 0, \\ ${tb('g(a)')} = 0`, '0/0: factor, cancel, then plug in', LC]];
const RY = [200, 316, 432];
$('#rCs').innerHTML = RC.map(([s, v, c], i) => `<div class="cr" id="rc${i}" style="top:${RY[i]}px;height:104px"><div class="sy">${K(s)}</div><div class="ve" style="color:${c}">${v}</div></div>`).join('');
const tRc = [T0('R2'), T0('R3'), T0('R4')];
const rp = plot($('#rS'), { x0: 0, x1: 3, y0: -6, y1: 6, px: 96, pw: 620, py: 80, ph: 400, xt: [0, 1, 2, 3], yt: [-4, -2, 0, 2, 4] });
const rA = mk($('#rS'), 'line', { x1: rp.X(1), y1: rp.Y(6), x2: rp.X(1), y2: rp.Y(-6), stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const rC1 = rp.curve(x => 1 / (x - 1), 0, 0.835, C.ink, 5), rC2 = rp.curve(x => 1 / (x - 1), 1.165, 3, C.ink, 5);

/* ---------- L: live ratio ---------- */
const lp = plot($('#lS'), { x0: 0, x1: 2.2, y0: -1, y1: 3.2, px: 96, pw: 620, py: 84, ph: 400, xt: [0, 1, 2], yt: [-1, 1, 2, 3] });
const lTop = lp.curve(x => x * x - 1, 0, 2.1, TB), lBot = lp.curve(x => x - 1, 0, 2.1, BT);
const lTl = txt($('#lS'), lp.X(1.25), lp.Y(2.9), 'top: x² - 1', { 'text-anchor': 'end', 'font-size': 22, fill: TB, 'font-weight': 600 });
const lBl = txt($('#lS'), lp.X(2.15), lp.Y(0.3), 'bottom: x - 1', { 'text-anchor': 'end', 'font-size': 22, fill: BT, 'font-weight': 600 });
const lMt = mover($('#lS'), lp, TB), lMb = mover($('#lS'), lp, BT);
$('#lF').innerHTML = K(`\\dfrac{${tb(`${X}^2 - 1`)}}{${bt(`${X} - 1`)}}, \\ \\ ${X} \\to 1`);
const LR = [[X, x => x, '→ 1', XV], [tb('\\text{top}'), x => x * x - 1, '→ 0', TB], [bt('\\text{bottom}'), x => x - 1, '→ 0', BT], [lc('\\text{top} \\div \\text{bottom}'), x => x + 1, '→ 2', LC]];
$('#lRs').innerHTML = LR.map(([s, , tg, c], i) => `<div class="lr" id="lr${i}" style="top:${186 + i * 80}px;height:70px"><div class="sy">${K(s)}</div><div class="v" style="color:${c}"></div><div class="tg" style="color:${c}">${tg}</div></div>`).join('');
const tLr = [wt('L2', 'creeps'), wt('L2', 'top'), wt('L2', 'bottom'), wt('L3', 'ratio')];
const tC0 = wt('L2', 'creeps'), tC1 = T1('L3');
const xOf = t => 1 + Math.pow(10, -3 * M.clamp((t - tC0) / Math.max(0.5, tC1 - tC0)));

/* ---------- D: the way out ---------- */
const dsol = PUC.solution($('#da'), [
  [K(`${X} = 1 \\Rightarrow \\text{top} = 0 \\Rightarrow ${fo('(x - 1)')} \\text{ is a factor}`)],
  [K(`${tb('x^2 - 1')} = ${fo('(x - 1)')}(x + 1)`)],
  [K(`x \\ne 1 \\Rightarrow ${fo('x - 1')} \\ne 0: \\text{ cancel}`)],
  [K(`x + 1 \\to 1 + 1 = ${lc('2')}`)]], { label: '', y0: 100, dy: 100 });
[...$('#da').querySelectorAll('.lbl')].slice(1).forEach(e => e.remove());
const tD = [wt('D2', 'factor'), wt('D3', 'splits'), wt('D4', 'cancel'), wt('D5', 'plug')];
const DX = [`\\dfrac{${tb('x^2 - 1')}}{${bt('x - 1')}}`, `\\dfrac{${tb('x^2 - 1')}}{${bt('x - 1')}}`, `\\dfrac{${fo('(x - 1)')}(x + 1)}{${fo('x - 1')}}`, `\\dfrac{\\cancel{${fo('(x - 1)')}}(x + 1)}{\\cancel{${fo('x - 1')}}}`, `x + 1 \\to ${lc('2')}`];
let dLast = -1;
const dp = plot($('#dS'), { x0: 0, x1: 2.2, y0: 0, y1: 3.4, px: 96, pw: 620, py: 270, ph: 210, xt: [0, 1, 2], yt: [1, 2, 3] });
const dLn = dp.curve(x => x + 1, 0, 2.1, C.ink, 5), dHo = dp.hole(1, 2, LC, 10);
const dLb = txt($('#dS'), dp.X(1) + 18, dp.Y(2) + 36, 'hole at x = 1, limit 2', { 'font-size': 20, fill: LC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: '(x² - 4)/(x - 2), as x tends to 2: stuck?', opts: ['Stuck', 'Not stuck'], right: 1, why: 'Cancel x - 2. Then x + 2 tends to 4.' });

/* ---------- K: shortcut ---------- */
$('#kF').innerHTML = K(`\\lim_{${X} \\to a} \\dfrac{${X}^n - a^n}{${X} - a} = ${lc('n\\,a^{n-1}')}`);
$('#kC').innerHTML = K(`n = 2, \\ a = 1: \\ \\dfrac{${X}^2 - 1}{${X} - 1} \\to 2 \\times 1^1 = ${lc('2')}`);
const xk = 1.001;
const KR = [1, 2, 3, 4].map(n => [n, (Math.pow(xk, n) - 1) / (xk - 1)]);
$('#kRs').innerHTML = `<div class="lr" style="top:84px;height:44px;background:#fff"><div class="sy" style="top:8px;font:600 18px 'IBM Plex Mono';color:var(--mute)">n</div><div class="v" style="top:10px;font:600 18px 'IBM Plex Mono';color:var(--mute)">(xⁿ - 1)/(x - 1)</div><div class="tg" style="top:10px;font:600 18px 'IBM Plex Mono';color:var(--mute)">n·1ⁿ⁻¹</div></div>` +
  KR.map(([n, v], i) => `<div class="lr" id="kr${i}" style="top:${140 + i * 86}px"><div class="sy" style="font:600 30px 'IBM Plex Mono';top:20px;color:${XV}">${n}</div><div class="v">${v.toFixed(3)}</div><div class="tg" style="color:${LC}">${n}</div></div>`).join('');
const tKr = [0, 1, 2, 3].map(i => T0('K2') + 1.2 + i * 1.6);
const th2 = PUC.think($('#th2'), { q: '(x³ - 8)/(x - 2), as x tends to 2?', opts: ['6', '12'], right: 1, why: 'n = 3 and a = 2: 3 × 2² = 12.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\dfrac{0}{0} \\ \\Rightarrow \\ \\text{factor out } ${fo('(x - a)')}, \\ \\text{cancel, plug in}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find &nbsp;${K(`\\lim_{${X} \\to 3} \\dfrac{${tb(`${X}^2 - 5${X} + 6`)}}{${bt(`${X}^2 - 9`)}}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`x = 3: \\ \\dfrac{9 - 15 + 6}{9 - 9} = \\dfrac{0}{0}`)],
  [K(`\\dfrac{(x - 2)${fo('(x - 3)')}}{${fo('(x - 3)')}(x + 3)}`)],
  [K(`\\text{cancel } ${fo('(x - 3)')}: \\ \\dfrac{x - 2}{x + 3}`)],
  [K(`x = 3: \\ \\dfrac{1}{6}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Plug'), wt('W4', 'top'), wt('W5', 'Cancel'), wt('W6', 'Plug')];
const WX = [`\\dfrac{${tb('x^2 - 5x + 6')}}{${bt('x^2 - 9')}}`, `\\dfrac{${tb('(x - 2)')}${fo('(x - 3)')}}{${fo('(x - 3)')}${bt('(x + 3)')}}`, `\\dfrac{${tb('(x - 2)')}\\cancel{${fo('(x - 3)')}}}{\\cancel{${fo('(x - 3)')}}${bt('(x + 3)')}}`, `\\dfrac{${tb('x - 2')}}{${bt('x + 3')}} \\to ${lc('\\dfrac{1}{6}')}`];
let wLast = -1;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(x^3 - 8)/(x^2 - 4) \\to 0/0 = 1`), right: K(`\\text{cancel } (x - 2): \\ (x^2 + 2x + 4)/(x + 2) \\to 12/4 = ${lc('3')}`) });
const tp = plot($('#tS'), { x0: 0, x1: 4, y0: 0, y1: 5, px: 70, pw: 440, py: 30, ph: 200, xt: [0, 1, 2, 3, 4], yt: [0, 1, 2, 3, 4, 5] });
const tLn = tp.curve(x => (x * x + 2 * x + 4) / (x + 2), 0, 4, C.ink, 4), tHo = tp.hole(2, 3, LC, 9);
const t3 = mk($('#tS'), 'line', { x1: tp.X(0), y1: tp.Y(3), x2: tp.X(2) - 10, y2: tp.Y(3), stroke: LC, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' });
const t3L = txt($('#tS'), tp.X(0) + 10, tp.Y(3) - 10, 'limit 3', { 'font-size': 18, fill: LC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A rational function that gives 0/0 at a point: factor, or use the xⁿ - aⁿ shortcut.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find &nbsp;${K(`\\lim_{x \\to 1} \\dfrac{x^5 + x^3 - 2}{x - 1}`)}`,
  opts: ['8', '15', '6', 'does not exist'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{top} = (x^5 - 1) + (x^3 - 1)`)], [K(`\\dfrac{x^5 - 1}{x - 1} + \\dfrac{x^3 - 1}{x - 1}`)], [K(`\\to 5 \\cdot 1^4 + 3 \\cdot 1^2`)], [K(`= 5 + 3 = ${lc('8')}`)]], { y0: 100, dy: 108 });
const tSo = [wt('A2', 'Split'), wt('A3', 'splits'), wt('A4', 'first'), wt('A4', 'eight')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · polynomial and rational limits', y0: 98, dy: 78, txt: [0, 0, 1, 0, 1],
  lines: [K(`\\text{Polynomial: } \\lim_{x \\to a} f(x) = f(a) \\ \\ \\text{(plug in)}`),
    K(`\\text{Rational, } ${bt('h(a)')} \\ne 0: \\ \\lim \\frac{${tb('g')}}{${bt('h')}} = \\frac{${tb('g(a)')}}{${bt('h(a)')}}`),
    '<b>0/0</b>: factor out (x - a), cancel, then plug in',
    K(`\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = ${lc('n\\,a^{n-1}')}`),
    '<b>Not 0 over 0</b> (like 1/0): the values shoot off, no limit'] });
const YQ = ['What is the limit of x³ + 1, as x tends to 2?', 'What should you do when you get 0/0?', 'What is the limit of (x⁵ - 1)/(x - 1), as x tends to 1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 83', topic: 'sin x over x, when x is tiny: Limits of Trigonometric Functions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tC0 - 0.3, 1.05, 960, 560], [T1('L3') + 0.4, 1, 960, 540]]);

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
    HE.forEach((_, i) => { M.vis($('#he' + i), t, tHe[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#he' + i + ' b'), t, tHe[i] + 0.4, 1e9, POP); });
    M.vis($('#hP'), t, wt('H2', 'single') - 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'signal') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tR1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('R1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P2', 'like') - 0.1, 0.8);
    [wt('P3', 'smooth'), wt('P3', 'holes'), wt('P3', 'jumps')].forEach((tt, i) => M.vis($('#pc' + i), t, tt - 0.1, 1e9, POP));
    PUC.write($('#pR'), t, wt('P4', 'limit') - 0.1, 0.8); PUC.write($('#pC'), t, wt('P4', 'As') - 0.1, 1.0);
    M.vis($('#pb'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(pC, t, T0('P3') + 0.2, 1.0);
    M.vis(pM.g, t, tPl - 0.2, 1e9, { dy: 0, fade: 0.15 }); pM.set(0.3 + 1.7 * M.io((t - tPl) / 1.2), PF);
    M.vis(pL, t, wt('P4', 'nine') - 0.1, 1e9, { dy: 0 });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tL1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('L1');
    M.vis($('#ra'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#rF'), t, wt('R1', 'g') - 0.1, 0.7);
    RC.forEach((_, i) => M.vis($('#rc' + i), t, tRc[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    const hy = M.track(RY[0], tRc.slice(1).map((tt, i) => [tt - 0.1, RY[i + 1]]), M.SOFT)(t);
    const hb = $('#rHi'); M.vis(hb, t, tRc[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
    M.vis($('#rb'), t, tRc[1] - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(rA, t, wt('R3', 'like'), 0.5); M.draw(rC1, t, wt('R3', 'one', 1), 0.7); M.draw(rC2, t, wt('R3', 'one', 1) + 0.3, 0.7);
    M.vis($('#rP'), t, wt('R3', 'shoot') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(lTop, t, wt('L1', 'squared') - 0.1, 0.7); M.vis(lTl, t, wt('L1', 'squared') + 0.4, 1e9, { dy: 0 });
    M.draw(lBot, t, wt('L1', 'over') - 0.1, 0.7); M.vis(lBl, t, wt('L1', 'over') + 0.4, 1e9, { dy: 0 });
    const x = xOf(t);
    M.vis(lMt.g, t, tC0 - 0.2, 1e9, { dy: 0, fade: 0.15 }); lMt.set(x, v => v * v - 1);
    M.vis(lMb.g, t, tC0 - 0.2, 1e9, { dy: 0, fade: 0.15 }); lMb.set(x, v => v - 1);
    M.vis($('#lb'), t, wt('L1', 'Plugging') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#lF'), t, wt('L1', 'Plugging'), 0.7);
    LR.forEach(([, fn], i) => { const el = $('#lr' + i); M.vis(el, t, tLr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.setT(el.querySelector('.v'), fn(x).toFixed(3)); M.vis(el.querySelector('.tg'), t, i === 3 ? wt('L3', 'two') : tLr[i] + 1.2, 1e9, POP); });
    M.vis($('#lP'), t, wt('L4', 'steady') - 0.1, 1e9, POP);
  }

  /* D + think 1 */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('S1');
    M.vis($('#da'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tD);
    M.vis($('#db'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const st = t >= tD[3] ? 4 : t >= tD[2] + 0.3 ? 3 : t >= tD[1] + 0.3 ? 2 : t >= tD[0] ? 1 : 0;
    if (st !== dLast) { dLast = st; $('#dX').innerHTML = K(DX[st]); }
    M.vis($('#dX'), t, tD1 + 0.5, 1e9, { dy: 12 });
    M.draw(dLn, t, tD[2] + 0.6, 0.7); M.vis(dHo, t, tD[2] + 1.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dLb, t, tD[3], 1e9, { dy: 0 });
    M.vis($('#th1'), t, tS1 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tS1, tOpts: wt('S1', 'stuck') - 0.1, tCount: T1('S1') + 0.05, dur: 3, tAns: T0('S2') - 0.02, tWhy: wt('S2', 'Cancel') });
  }

  /* K: shortcut + think 2 */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kF'), t, T0('K2') + 0.1, 1.4);
    PUC.write($('#kC'), t, T0('K3') + 0.1, 1.0); M.vis($('#kP'), t, wt('K3', 'matches') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') + 0.8, out, { dx: 60, dy: 0, ...o });
    KR.forEach((_, i) => { const el = $('#kr' + i); M.vis(el, t, tKr[i], 1e9, { dx: -16, dy: 0 }); M.vis(el.querySelector('.tg'), t, tKr[i] + 0.6, 1e9, POP); });
    M.vis($('#th2'), t, tK4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK4, tOpts: wt('K4', 'Six') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Here') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Zero') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Factor') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const st = t >= tW[3] ? 3 : t >= tW[2] + 0.3 ? 2 : t >= tW[1] + 0.3 ? 1 : 0;
    if (st !== wLast) { wLast = st; $('#wX').innerHTML = K(WX[st]); }
    M.vis($('#wX'), t, T0('W2') + 0.6, 1e9, { dy: 12 });
    M.vis($('#wP'), t, wt('W3', 'factor') - 0.2, 1e9, POP); M.vis($('#wRes'), t, wt('W6', 'One') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'number') - 0.1, tRight: wt('X3', 'Cancel') });
    M.draw(tLn, t, wt('X3', 'Cancel'), 0.7); M.vis(tHo, t, wt('X3', 'Cancel') + 0.6, 1e9, { dy: 0 });
    M.draw(t3, t, wt('X3', 'answer') - 0.2, 0.4); M.vis(t3L, t, wt('X3', 'answer'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'sum') });
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
