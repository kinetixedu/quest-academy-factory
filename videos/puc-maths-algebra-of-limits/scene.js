// PUC Maths Ep 81: Algebra of limits (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (this chapter): input x violet, f and its limit blue, g and its limit teal, (x - 1) orange,
// a constant k gold, the combined result / final limit coral accent, "rule off" red
const XV = C.violet, FB = '#2F6FEB', GT = C.teal, OR = C.orange, KG = C.gold, LC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xv = s => `\\textcolor{${XV}}{${s}}`, fb = s => `\\textcolor{${FB}}{${s}}`, gt = s => `\\textcolor{${GT}}{${s}}`, or = s => `\\textcolor{${OR}}{${s}}`, kg = s => `\\textcolor{${KG}}{${s}}`, lc = s => `\\textcolor{${LC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const X = xv('x'), PF = fb(`${X}^2 + 3${X}`), PO = or(`${X} - 1`), PG = gt(`${X} + 2`);
const BIG = `\\lim_{${X} \\to 2} \\dfrac{(${PF})(${PO})}{${PG}}`;

/* ---------- small plotter ---------- */
const plot = (svg, o) => {
  const Xp = v => o.px + o.pw * (v - o.x0) / (o.x1 - o.x0), Yp = v => o.py + o.ph - o.ph * (v - o.y0) / (o.y1 - o.y0);
  (o.xt || []).forEach(v => mk(svg, 'line', { x1: Xp(v), y1: Yp(o.y0), x2: Xp(v), y2: Yp(o.y1), stroke: '#E9E5DA', 'stroke-width': 2 }));
  (o.yt || []).forEach(v => mk(svg, 'line', { x1: Xp(o.x0), y1: Yp(v), x2: Xp(o.x1), y2: Yp(v), stroke: '#E9E5DA', 'stroke-width': 2 }));
  mk(svg, 'line', { x1: Xp(o.x0), y1: Yp(0), x2: Xp(o.x1), y2: Yp(0), stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'line', { x1: Xp(0), y1: Yp(o.y0), x2: Xp(0), y2: Yp(o.y1), stroke: C.ink, 'stroke-width': 3 });
  (o.xt || []).forEach(v => txt(svg, Xp(v), Yp(0) + 30, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }));
  (o.yt || []).forEach(v => { if (v) txt(svg, Xp(0) - 12, Yp(v) + 6, v, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); });
  const path = (fn, a, b, n = 60) => { let d = ''; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + Xp(x).toFixed(1) + ',' + Yp(fn(x)).toFixed(1); } return d; };
  return { X: Xp, Y: Yp, curve: (fn, a, b, col, sw = 5) => mk(svg, 'path', { d: path(fn, a, b), fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hole: (x, y, col, r = 9) => mk(svg, 'circle', { cx: Xp(x), cy: Yp(y), r, fill: '#fff', stroke: col, 'stroke-width': 4 }) };
};
const mover = (svg, p, col) => {
  const g = mk(svg, 'g', {}), gy = mk(g, 'line', { stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }), c = mk(g, 'circle', { r: 10, fill: col });
  return { g, set: (x, fn) => { const px = p.X(x), py = p.Y(fn(x)); attr(c, 'cx', px.toFixed(1)); attr(c, 'cy', py.toFixed(1)); attr(gy, 'x1', px.toFixed(1)); attr(gy, 'y1', py.toFixed(1)); attr(gy, 'x2', p.X(0)); attr(gy, 'y2', py.toFixed(1)); } };
};
const creep = (t, t0, t1) => 2 - 0.5 * Math.pow(10, -3 * M.clamp((t - t0) / Math.max(0.5, t1 - t0)));
const f3 = v => (Math.floor(v * 1000) / 1000).toFixed(3);
const F = x => x * x + 3 * x, G = x => x + 2;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tL1 = T0('L1'), tR1 = T0('R1'), tK1 = T0('K1'), tS1 = T0('S1'), tS3 = T0('S3'), tD1 = T0('D1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the three pieces ---------- */
const LS = [['PIECE 1', PF], ['PIECE 2', PO], ['PIECE 3', PG]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H1', 'squared') - 0.1, wt('H1', 'minus') - 0.1, wt('H1', 'over') - 0.1];

/* ---------- H: the scary limit, as chain links ---------- */
$('#hX').innerHTML = K(BIG);
const LK = [[PF, 250, 36, 36], [PO, 190, 230, 330], [PG, 190, 364, 560]];
$('#hLk').innerHTML = LK.map(([s, w], i) => `<div class="lk" id="lk${i}" style="width:${w}px;border-color:${[FB, OR, GT][i]}">${K(s)}</div>`).join('') +
  `<div class="op" id="op0" style="left:${292}px">×</div><div class="op" id="op1" style="left:${522}px">÷</div>`;
const tApart = wt('H3', 'apart'), tTog = wt('H4', 'together');

/* ---------- B: building blocks ---------- */
$('#bF1').innerHTML = K(`\\lim_{${X} \\to a} ${X} = a`);
$('#bF2').innerHTML = K(`\\lim_{${X} \\to a} ${kg('c')} = ${kg('c')}`);
const b1 = $('#b1S'), BX = v => 92 + (v - 1) * 300, BY = 300;
mk(b1, 'line', { x1: 60, y1: BY, x2: 724, y2: BY, stroke: C.ink, 'stroke-width': 3 });
[1, 1.5, 2, 2.5, 3].forEach(v => { mk(b1, 'line', { x1: BX(v), y1: BY - 9, x2: BX(v), y2: BY + 9, stroke: C.ink, 'stroke-width': 2 }); if (v % 1 === 0) txt(b1, BX(v), BY + 40, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); });
const b1D = mk(mk(b1, 'g', {}), 'g', {}); mk(b1D, 'circle', { cx: 0, cy: BY, r: 12, fill: XV });
const b1A = mk(b1, 'line', { x1: BX(2), y1: BY - 60, x2: BX(2), y2: BY + 12, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const tB2c = wt('B2', 'creeps'), tB2e = T1('B2');
const bp = plot($('#b2S'), { x0: 0, x1: 4, y0: 0, y1: 6.5, px: 96, pw: 620, py: 170, ph: 280, xt: [0, 1, 2, 3, 4], yt: [0, 5] });
const b2L = bp.curve(() => 5, 0, 4, KG, 5); const b2M = mover($('#b2S'), bp, KG);
const b2T = txt($('#b2S'), bp.X(3.4), bp.Y(5) - 18, 'y = 5', { 'text-anchor': 'middle', 'font-size': 22, fill: KG, 'font-weight': 600 });

/* ---------- L: live pieces ---------- */
const lp = plot($('#lS'), { x0: 0, x1: 3, y0: 0, y1: 20, px: 96, pw: 620, py: 150, ph: 330, xt: [0, 1, 2, 3], yt: [0, 5, 10, 15, 20] });
const lF = lp.curve(F, 0, 3, FB), lG = lp.curve(G, 0, 3, GT);
const lFm = mover($('#lS'), lp, FB), lGm = mover($('#lS'), lp, GT);
const lFt = txt($('#lS'), lp.X(2.62), lp.Y(F(2.62)) + 2, 'f', { 'font-size': 28, fill: FB, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'end' });
const lGt = txt($('#lS'), lp.X(2.9), lp.Y(G(2.9)) - 14, 'g', { 'font-size': 28, fill: GT, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'middle' });
const LR = [[`f(${X}) = ${PF}`, x => F(x), '→ 10', FB], [`g(${X}) = ${PG}`, x => G(x), '→ 4', GT], [`${fb('f')} + ${gt('g')}`, x => F(x) + G(x), '→ 14', LC], [`${fb('f')} \\times ${gt('g')}`, x => F(x) * G(x), '→ 40', LC], [`${fb('f')} \\div ${gt('g')}`, x => F(x) / G(x), '→ 2.5', LC]];
$('#lRs').innerHTML = LR.map(([s, , tg, c], i) => `<div class="lr" id="lr${i}" style="top:${84 + i * 92}px"><div class="sy">${K(s)}</div><div class="v" style="color:${c}"></div><div class="tg" style="color:${c}">${tg}</div></div>`).join('');
const tLr = [wt('L2', 'f'), wt('L2', 'g'), wt('L4', 'Add'), wt('L5', 'Multiply'), wt('L6', 'Divide')];
const tC0 = wt('L3', 'creeps'), tC1 = T0('L5');

/* ---------- R: the theorem ---------- */
const RS = [`\\lim (${fb('f')} + ${gt('g')}) = \\lim ${fb('f')} + \\lim ${gt('g')}`, `\\lim (${fb('f')} - ${gt('g')}) = \\lim ${fb('f')} - \\lim ${gt('g')}`, `\\lim (${fb('f')}\\,${gt('g')}) = \\lim ${fb('f')} \\cdot \\lim ${gt('g')}`, `\\lim \\dfrac{${fb('f')}}{${gt('g')}} = \\dfrac{\\lim ${fb('f')}}{\\lim ${gt('g')}}, \\ \\lim ${gt('g')} \\ne 0`, `\\lim (${kg('k')}\\,${fb('f')}) = ${kg('k')} \\lim ${fb('f')}`];
const RY = [84, 172, 260, 348, 452];
$('#rSt').innerHTML = RS.map((f, i) => `<div class="st" id="rs${i}" style="top:${RY[i]}px;height:84px"><div class="n">${i + 1}</div><div class="sx" style="font-size:32px;top:${i === 3 ? -12 : 4}px">${K(f)}</div></div>`).join('');
const RN = [[`${fb('10')} + ${gt('4')} = ${lc('14')}`], [`${fb('10')} - ${gt('4')} = ${lc('6')}`], [`${fb('10')} \\times ${gt('4')} = ${lc('40')}`], [`${fb('10')} \\div ${gt('4')} = ${lc('2.5')}`], [`${kg('3')} \\times ${fb('10')} = ${lc('30')} \\ (k = 3)`]];
$('#rNs').innerHTML = RN.map(([f], i) => `<div class="lr" id="rn${i}" style="top:${RY[i] - 4}px;height:72px"><div class="sy" style="top:14px">${K(f)}</div></div>`).join('');
const tRs = [T0('R2'), T0('R3'), T0('R4'), T0('R5'), T0('R6')];
const th1 = PUC.think($('#th1'), { q: 'The limit of 5x², as x tends to 3?', opts: ['45', '225'], right: 0, why: 'x² tends to 9, and the 5 just comes along: 5 × 9 = 45.' });

/* ---------- S: rule on vs rule off ---------- */
$('#s1F').innerHTML = K(`\\lim_{${X} \\to 2} \\dfrac{${PF}}{${PG}}`);
$('#s2F').innerHTML = K(`\\lim_{${X} \\to 2} \\dfrac{${X}^2 - 4}{${red(`${X} - 2`)}}`);
const th2 = PUC.think($('#th2'), { q: '1/x, as x tends to 0: can we use the quotient rule?', opts: ['Yes', 'No'], right: 1, why: 'The bottom tends to 0, so the rule is switched off. Think another way.' });

/* ---------- D: crack the scary limit ---------- */
const dsol = PUC.solution($('#da'), [
  [K(`${X}^2 = ${X} \\cdot ${X} \\to 2 \\cdot 2 = 4`)],
  [K(`${PF} \\to 4 + 6 = ${fb('10')}`)],
  [K(`${PO} \\to ${or('1')}; \\ \\text{top} \\to ${fb('10')} \\times ${or('1')} = 10`)],
  [K(`${PG} \\to ${gt('4')} \\ne 0`)],
  [K(`\\text{limit} = \\dfrac{10}{${gt('4')}} = ${lc('2.5')}`)]], { label: '', y0: 92, dy: 92 });
const tD = [wt('D2', 'times'), wt('D3', 'ten'), wt('D4', 'product'), wt('D5', 'bottom'), wt('D6', 'ten')];
const ub = (s, v) => `\\underbrace{${s}}_{\\to ${v}}`;
const DU = [`\\dfrac{(${PF})(${PO})}{${PG}}`,
  `\\dfrac{(${ub(`${X}^2`, '4')} + 3${X})(${PO})}{${PG}}`,
  `\\dfrac{${ub(`(${PF})`, fb('10'))}(${PO})}{${PG}}`,
  `\\dfrac{${ub(`(${PF})`, fb('10'))}${ub(`(${PO})`, or('1'))}}{${PG}}`,
  `\\dfrac{${ub(`(${PF})`, fb('10'))}${ub(`(${PO})`, or('1'))}}{${ub(PG, gt('4'))}}`,
  `\\dfrac{${ub(`(${PF})`, fb('10'))}${ub(`(${PO})`, or('1'))}}{${ub(PG, gt('4'))}} \\to \\dfrac{10}{4} = ${lc('2.5')}`];
let dLast = -1;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\lim (${fb('f')} \\pm ${gt('g')}),\\ \\ \\lim (${fb('f')}${gt('g')}),\\ \\ \\lim \\dfrac{${fb('f')}}{${gt('g')}}: \\ \\text{piece by piece}`);

/* ---------- W: worked example ---------- */
const WT = fb(`2${X}^3 - 3${X} + 4`), WB = gt(`${X}^2 + 1`);
$('#wq').innerHTML = `Find &nbsp;${K(`\\lim_{${X} \\to 1} \\dfrac{${WT}}{${WB}}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${X} \\to 1: \\ ${X}^3 \\to 1, \\ ${X}^2 \\to 1`)],
  [K(`\\text{top} \\to 2 - 3 + 4 = ${fb('3')}`)],
  [K(`\\text{bottom} \\to 1 + 1 = ${gt('2')}`)],
  [K(`${gt('2')} \\ne 0 \\Rightarrow \\text{quotient rule}`)],
  [K(`\\text{limit} = \\dfrac{${fb('3')}}{${gt('2')}} = ${lc('1.5')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 70 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'cubed'), wt('W4', 'top'), wt('W5', 'bottom'), wt('W6', 'Two'), wt('W7', 'three')];
const WU = [`\\dfrac{${WT}}{${WB}}`, `\\dfrac{${ub(WT, fb('3'))}}{${WB}}`, `\\dfrac{${ub(WT, fb('3'))}}{${ub(WB, gt('2'))}}`, `\\dfrac{${ub(WT, fb('3'))}}{${ub(WB, gt('2'))}} \\to ${lc('\\dfrac{3}{2}')}`];
let wLast = -1;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\dfrac{\\lim (x^2 - 9)}{\\lim (x - 3)} = \\dfrac{0}{0} \\Rightarrow \\text{no limit}`), right: K(`\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \\to ${lc('6')}`) });
const tp = plot($('#tS'), { x0: 0, x1: 5, y0: 0, y1: 9, px: 70, pw: 440, py: 30, ph: 200, xt: [0, 1, 2, 3, 4, 5], yt: [0, 3, 6, 9] });
const tLn = tp.curve(x => x + 3, 0, 5, C.ink, 4), tHo = tp.hole(3, 6, C.ink, 9);
const t6 = mk($('#tS'), 'line', { x1: tp.X(0), y1: tp.Y(6), x2: tp.X(3) - 10, y2: tp.Y(6), stroke: LC, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' });
const t6L = txt($('#tS'), tp.X(0) + 10, tp.Y(6) - 10, 'limit 6', { 'font-size': 18, fill: LC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Split a limit into sums, products and quotients: a step inside most limit questions.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`\\lim_{x \\to 2} ${fb('f(x)')} = ${fb('3')}, \\ \\ \\lim_{x \\to 2} ${gt('g(x)')} = ${gt('-1')}`)}<br>Find ${K(`\\lim_{x \\to 2} \\dfrac{2\\,${fb('f(x)')}^2 + ${gt('g(x)')}}{${fb('f(x)')} - ${gt('g(x)')}}`)}`,
  opts: ['17/4', '19/4', '17/2', '5'], right: 0, optW: 474, optY: 340 });
const so = PUC.solution($('#so'), [[K(`\\text{top} \\to 2(${fb('3')})^2 + (${gt('-1')}) = 17`)], [K(`\\text{bottom} \\to ${fb('3')} - (${gt('-1')}) = 4`)], [K(`4 \\ne 0 \\Rightarrow \\text{quotient rule}`)], [K(`\\text{limit} = ${lc('\\dfrac{17}{4}')}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Two'), wt('A3', 'bottom'), wt('A4', 'Four'), wt('A4', 'seventeen')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · algebra of limits', y0: 98, dy: 76, txt: [1, 0, 0, 0, 0],
  lines: ['<b>Break it up</b>: find each small limit, then put them back',
    K(`\\lim (${fb('f')} \\pm ${gt('g')}) = \\lim ${fb('f')} \\pm \\lim ${gt('g')}, \\quad \\lim (${kg('k')}${fb('f')}) = ${kg('k')} \\lim ${fb('f')}`),
    K(`\\lim (${fb('f')}${gt('g')}) = \\lim ${fb('f')} \\cdot \\lim ${gt('g')}`),
    K(`\\lim \\frac{${fb('f')}}{${gt('g')}} = \\frac{\\lim ${fb('f')}}{\\lim ${gt('g')}} \\ \\ \\text{only if } \\lim ${gt('g')} \\ne 0`),
    K(`\\text{Blocks: } \\lim_{x \\to a} x = a, \\ \\ \\lim_{x \\to a} ${kg('c')} = ${kg('c')}`)] });
const YQ = ['What is the limit of x + 7, as x tends to 3?', 'When is the quotient rule switched off?', 'Why is the limit of 4x², as x tends to 2, equal to 16?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 82', topic: 'Zero over zero: stuck or not? Limits of Polynomial and Rational Functions', y: 764 });

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
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#hX'), t, tMorph + 0.3, 1.0);
    M.vis($('#hP1'), t, wt('H2', 'ages') - 0.3, 1e9, POP);
    const sp = M.io((t - tApart) / 0.6) * (1 - M.io((t - tTog) / 0.6));
    LK.forEach(([, , j, a], i) => { const el = $('#lk' + i); M.vis(el, t, tMorph + 0.8 + i * 0.12, 1e9, { dy: 16 }); el.style.left = (j + (a - j) * sp).toFixed(1) + 'px'; });
    ['#op0', '#op1'].forEach(id => { const el = $(id); el.style.opacity = sp.toFixed(3); M.hide(el, sp < 0.01); });
    M.vis($('#hP2'), t, tApart + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'puts') - 0.1, 1e9, POP);
  }

  /* B: building blocks */
  const bOn = t >= tB1 - 0.1 && t < tL1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('L1');
    M.vis($('#ba'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#bF1'), t, T0('B2') + 0.1, 0.8);
    const x = creep(t, tB2c, tB2e); attr(b1D, 'transform', `translate(${BX(x).toFixed(1)},0)`); M.setT($('#b1V'), f3(x));
    M.vis(b1D, t, wt('B2', 'If') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(b1A, t, wt('B2', 'If'), 1e9, { dy: 0 }); M.vis($('#b1R'), t, wt('B2', 'If'), 1e9, { dy: 12 });
    M.vis($('#bb'), t, T0('B3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#bF2'), t, T0('B3') + 0.2, 0.8);
    M.draw(b2L, t, wt('B3', 'always') - 0.1, 0.7); M.vis(b2T, t, wt('B3', 'five'), 1e9, { dy: 0 });
    M.vis(b2M.g, t, wt('B3', 'stays') - 0.1, 1e9, { dy: 0, fade: 0.15 }); b2M.set(0.4 + 3.2 * M.io((t - wt('B3', 'stays')) / 1.6), () => 5);
    M.vis($('#b2P'), t, wt('B3', 'near') - 0.1, 1e9, POP);
  }

  /* L: live pieces */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('R1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const x = creep(t, tC0, tC1); M.setT($('#lXv'), f3(x));
    M.vis($('#lX'), t, tL1 + 0.3, 1e9, { dy: 12 });
    M.draw(lF, t, tLr[0], 0.7); M.vis(lFt, t, tLr[0] + 0.5, 1e9, { dy: 0 }); M.draw(lG, t, tLr[1], 0.7); M.vis(lGt, t, tLr[1] + 0.5, 1e9, { dy: 0 });
    M.vis(lFm.g, t, tC0 - 0.2, 1e9, { dy: 0, fade: 0.15 }); lFm.set(x, F); M.vis(lGm.g, t, tC0 - 0.2, 1e9, { dy: 0, fade: 0.15 }); lGm.set(x, G);
    M.vis($('#lb'), t, tLr[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    LR.forEach(([, fn], i) => { const el = $('#lr' + i); M.vis(el, t, tLr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.setT(el.querySelector('.v'), t >= tC0 - 0.2 ? fn(x).toFixed(3) : ''); M.vis(el.querySelector('.tg'), t, i < 2 ? wt('L3', i ? 'four' : 'ten') : tLr[i] + 0.8, 1e9, POP); });
  }

  /* R: theorem */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#ra'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#rs' + i); M.vis(el.querySelector('.n'), t, tRs[i] - 0.1, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRs[i] + 0.2, 0.9); });
    const hy = M.track(RY[0], tRs.slice(1).map((tt, i) => [tt - 0.1, RY[i + 1]]), M.SOFT)(t);
    const hb = $('#rHi'); M.vis(hb, t, tRs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px'; hb.style.height = (Math.abs(hy - RY[3]) < 3 ? 100 : 84) + 'px';
    M.vis($('#rb'), t, tRs[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    RN.forEach((_, i) => M.vis($('#rn' + i), t, tRs[i] + 1.0, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#rP'), t, wt('R5', 'only') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('S1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Forty') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'squared') });
  }

  /* S: on vs off */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#s1'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#s1F'), t, wt('S1', 'bottom') - 0.2, 0.8);
    const x1 = creep(t, wt('S1', 'tends'), wt('S1', 'four') + 0.6); M.setT($('#s1V'), f3(G(x1)));
    M.vis($('#s1R'), t, wt('S1', 'tends') - 0.1, 1e9, { dy: 12 });
    M.vis($('#sw1'), t, wt('S1', 'quotient') - 0.1, 1e9, POP); M.vis($('#sw1L'), t, wt('S1', 'works') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis($('#s2'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#s2F'), t, T0('S2') + 0.3, 0.8);
    const x2 = creep(t, wt('S2', 'bottom'), wt('S2', 'zero') + 0.6); const bv = x2 - 2; M.setT($('#s2V'), (bv < 0 ? '-' : '') + f3(Math.abs(bv) + 1e-9));
    M.vis($('#s2R'), t, wt('S2', 'bottom') - 0.1, 1e9, { dy: 12 });
    M.vis($('#sw2'), t, wt('S2', 'switched') - 0.1, 1e9, POP); M.vis($('#sw2L'), t, wt('S2', 'switched'), 1e9, { dx: -12, dy: 0 });
    M.vis($('#th2'), t, tS3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th2(t, { tin: tS3, tOpts: wt('S3', 'can') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'bottom') });
  }

  /* D: crack it */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#da'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tD);
    M.vis($('#db'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const st = tD.reduce((a, tt, i) => t >= tt + 0.3 ? i + 1 : a, 0);
    if (st !== dLast) { dLast = st; $('#uX').innerHTML = K(DU[st]); }
    M.vis($('#uX'), t, tD1 + 0.5, 1e9, { dy: 12 });
    M.vis($('#dRes'), t, wt('D6', 'table') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Break') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'put') - 0.2, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const st = t >= tW[4] ? 3 : t >= tW[2] + 0.4 ? 2 : t >= tW[1] + 0.4 ? 1 : 0;
    if (st !== wLast) { wLast = st; $('#wU').innerHTML = K(WU[st]); }
    M.vis($('#wU'), t, T0('W2') + 0.6, 1e9, { dy: 12 });
    M.vis($('#wP'), t, tW[3] - 0.1, 1e9, POP); M.vis($('#wRes'), t, tW[4] + 0.2, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'switches') - 0.1, tRight: wt('X3', 'Factor') });
    M.draw(tLn, t, wt('X3', 'cancel'), 0.6); M.vis(tHo, t, wt('X3', 'cancel') + 0.5, 1e9, { dy: 0 });
    M.draw(t6, t, wt('X3', 'six') - 0.2, 0.4); M.vis(t6L, t, wt('X3', 'six'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'step') - 0.3 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'find'), tCount, tAns });
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
