// PUC Maths Ep 21: Signum and greatest integer functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): input x violet, output / rule coral (accent), wrong red, right green
const XC = C.violet, RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`, okc = s => `\\textcolor{${C.ok}}{${s}}`;
const X = xc('x'), GX = rc(`[${X}]`), gi = v => rc(`[${xc(v)}]`);
const fl = Math.floor, sgn = v => (v > 0) - (v < 0);
const fmt = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2).replace('-', '−');
const mn = s => String(s).replace(/-/g, '−');
// piecewise-linear parameter through keyframes [[t, v], ...] (constant speed between keys)
const pw = (t, keys) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; if (t < b) return va + (vb - va) * M.clamp((t - a) / Math.max(1e-3, b - a)); } return keys[keys.length - 1][1]; };
// axes with ticks for a graph that can go negative
const plot = (svg, o) => {
  const Xf = v => o.x + (v - o.xmin) / (o.xmax - o.xmin) * o.w, Yf = v => o.y + o.h - (v - o.ymin) / (o.ymax - o.ymin) * o.h;
  const g = mk(svg, 'g', {});
  mk(g, 'line', { x1: o.x, y1: Yf(0), x2: o.x + o.w, y2: Yf(0), stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${o.x + o.w + 6},${Yf(0)} l-14,-7 v14 z`, fill: C.ink });
  mk(g, 'line', { x1: Xf(0), y1: o.y + o.h, x2: Xf(0), y2: o.y, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${Xf(0)},${o.y - 6} l-7,14 h14 z`, fill: C.ink });
  (o.xt || []).forEach(v => { if (!v) return; mk(g, 'line', { x1: Xf(v), y1: Yf(0) - 7, x2: Xf(v), y2: Yf(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(g, Xf(v), Yf(0) + 30, mn(v), { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { if (!v) return; mk(g, 'line', { x1: Xf(0) - 7, y1: Yf(v), x2: Xf(0) + 7, y2: Yf(v), stroke: C.ink, 'stroke-width': 2 }); txt(g, Xf(0) - 14, Yf(v) + 6, mn(v), { 'text-anchor': 'end', fill: C.ink2, 'font-weight': 600 }); });
  txt(g, o.x + o.w - 4, Yf(0) - 14, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: XC, 'font-weight': 600 });
  txt(g, Xf(0) + 14, o.y + 14, o.yl || 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: RC, 'font-weight': 600 });
  return { X: Xf, Y: Yf, g };
};
const dotC = (p, x, y, r = 9) => mk(p, 'circle', { cx: x, cy: y, r, fill: RC });
const dotO = (p, x, y, r = 9) => mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: RC, 'stroke-width': 3.5 });

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tS1 = T0('S1'), tM1 = T0('M1'), tG1 = T0('G1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tD1 = T0('D1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three exact ages ---------- */
const LS = [['EXACT AGE · 16.1 YEARS', 'Age: 16'], ['EXACT AGE · 16.5 YEARS', 'Age: 16'], ['EXACT AGE · 16.9 YEARS', 'Age: 16']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'sixteen') - 0.05, wt('H1', 'sixteen') + 0.25, wt('H1', 'sixteen') + 0.55];

/* ---------- H: ages on a number line ---------- */
const hs = $('#hS'), HX = v => 92 + (v - 15) * 200, HY = 300;
mk(hs, 'line', { x1: 52, y1: HY, x2: 732, y2: HY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 15; v <= 18; v += 0.5) { const big = v % 1 === 0; mk(hs, 'line', { x1: HX(v), y1: HY - (big ? 12 : 6), x2: HX(v), y2: HY + (big ? 12 : 6), stroke: C.ink, 'stroke-width': 2 }); if (big) txt(hs, HX(v), HY + 44, v, { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); }
const hBand = mk(hs, 'line', { x1: HX(16), y1: HY, x2: HX(17), y2: HY, stroke: RC, 'stroke-width': 10 });
const hC = dotC(hs, HX(16), HY, 11), hO = dotO(hs, HX(17), HY, 11);
const hBl = txt(hs, HX(16.5), HY + 92, 'every age in here is 16', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const hA = [16.1, 16.5, 16.9].map((v, i) => { const pg = mk(hs, 'g', { transform: `translate(${HX(v)},${HY - 120})` }), g = mk(pg, 'g', {}); mk(g, 'line', { x1: 0, y1: 30, x2: 0, y2: 104, stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }); mk(g, 'circle', { cx: 0, cy: 0, r: 30, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 7, v, { 'text-anchor': 'middle', 'font-size': 19, fill: XC, 'font-weight': 600 }); mk(g, 'circle', { cx: 0, cy: 120, r: 9, fill: XC }); return g; });
const tHa = [wt('H2', 'Sixteen'), wt('H2', 'Sixteen', 1), wt('H2', 'Sixteen', 2)];

/* ---------- S: signum live ---------- */
$('#sgT').innerHTML = K(`${rc('f')}(${X}) = ${rc('\\operatorname{sgn}')}\\, ${X}`);
const SR = [['1', `\\text{if } ${X} > 0`, 'POSITIVE'], ['0', `\\text{if } ${X} = 0`, 'ZERO'], ['−1', `\\text{if } ${X} < 0`, 'NEGATIVE']];
$('#sgR').innerHTML = SR.map(([o, c, w], i) => `<div class="sr" id="sr${i}" style="top:${170 + i * 100}px"><div class="o">${o}</div><div class="c">${K(c)}</div><div class="w">${w}</div></div>`).join('');
const tSr = [wt('S3', 'Positive'), wt('S3', 'Zero'), wt('S3', 'Negative')];
$('#sgDm').innerHTML = 'Domain&nbsp;' + K('\\mathbb{R}');
$('#sgRg').innerHTML = 'Range&nbsp;' + K('\\{-1,\\ 0,\\ 1\\}');
const sgs = $('#sgS'), SG = plot(sgs, { x: 52, y: 170, w: 680, h: 360, xmin: -4.3, xmax: 4.3, ymin: -1.7, ymax: 1.7, xt: [-4, -3, -2, -1, 1, 2, 3, 4], yt: [-1, 1], yl: 'sgn x' });
const sgL = mk(sgs, 'path', { d: '', stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const sgRr = mk(sgs, 'path', { d: '', stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const sgO1 = dotO(sgs, SG.X(0), SG.Y(-1)), sgO2 = dotO(sgs, SG.X(0), SG.Y(1)), sgC0 = dotC(sgs, SG.X(0), SG.Y(0), 10);
const sgV = mk(sgs, 'line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const sgXd = mk(sgs, 'circle', { r: 11, fill: XC, cx: -99, cy: -99 }), sgYd = mk(sgs, 'circle', { r: 13, fill: '#fff', stroke: RC, 'stroke-width': 5, cx: -99, cy: -99 });
const sgK = [[T0('S4') - 0.3, -4.2], [wt('S4', 'three'), -3], [wt('S4', 'half'), -0.5], [wt('S5', 'zero'), 0], [wt('S5', 'Just'), 0], [wt('S5', 'one'), 0.5], [T1('S5') + 0.2, 4.1]];
let sgLast = null;

/* ---------- M: signum with the modulus ---------- */
$('#mT').innerHTML = K(`${rc('f')}(${X}) = \\dfrac{|${X}|}{${X}},\\ ${X} \\ne 0 \\qquad ${rc('f')}(0) = ${rc('0')}`);
$('#mT').style.fontSize = '38px';
const MS = [[`${X} = 5:\\ \\ \\dfrac{|5|}{5} = \\dfrac{5}{5} = ${rc('1')}`, 'top and bottom have the same sign'],
  [`${X} = -5:\\ \\ \\dfrac{|-5|}{-5} = \\dfrac{5}{-5} = ${rc('-1')}`, 'the bottom is negative, the top never is'],
  [`${X} = 0:\\ \\ \\dfrac{0}{0}\\ ${red('\\text{undefined}')} \\;\\Rightarrow\\; ${rc('f')}(0) = ${rc('0')}`, 'so zero gets its own rule']];
$('#mSt').innerHTML = MS.map(([f, w], i) => `<div class="st" id="ms${i}" style="top:${176 + i * 128}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#mSt').querySelectorAll('.sx').forEach(e => e.style.fontSize = '32px');
$('#mSt').querySelectorAll('.why').forEach(e => e.style.top = '80px');
const tMs = [wt('M2', 'If'), wt('M3', 'If'), wt('M4', 'zero')];
const ms = $('#mS'), MX = v => 392 + v * 52, MY = 210;
mk(ms, 'line', { x1: 40, y1: MY, x2: 744, y2: MY, stroke: C.ink, 'stroke-width': 3 });
for (let v = -6; v <= 6; v++) { mk(ms, 'line', { x1: MX(v), y1: MY - 8, x2: MX(v), y2: MY + 8, stroke: C.ink, 'stroke-width': 2 }); if (v % 5 === 0 || v === 0) txt(ms, MX(v), MY + 40, mn(v), { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const mBr = [5, -5].map(v => { const g = mk(mk(ms, 'g', {}), 'g', {}); const a = Math.min(0, v), b = Math.max(0, v);
  const p = mk(g, 'path', { d: `M${MX(a)},${MY - 30} v-14 H${MX(b)} v14`, stroke: C.ink2, 'stroke-width': 2.5, fill: 'none' });
  txt(g, MX(v / 2), MY - 58, v > 0 ? '|5| = 5' : '|−5| = 5', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
  const d = mk(g, 'circle', { cx: MX(v), cy: MY, r: 11, fill: XC }); return { g, p }; });
const mZ = mk(ms, 'circle', { cx: MX(0), cy: MY, r: 20, fill: 'none', stroke: C.red, 'stroke-width': 3 });
$('#mf0').innerHTML = K(`\\dfrac{|5|}{5} = ${rc('1')}`);
$('#mf1').innerHTML = K(`\\dfrac{|-5|}{-5} = ${rc('-1')}`);
$('#mf2').innerHTML = K(`\\dfrac{0}{0} = ${red('\\,?')}`);
const avA = PUC.avatar($('#sM'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The distance is always 5. Only the sign changes.' });

/* ---------- G: greatest integer, live number line ---------- */
$('#gT').innerHTML = K(`${rc('f')}(${X}) = ${GX}`);
$('#gT').style.fontSize = '52px';
$('#gr0').innerHTML = K(`${gi('2.7')} = ${rc('2')}`); $('#gr1').innerHTML = K(`${gi('3')} = ${rc('3')}`);
const gs = $('#gS'), GXp = v => 92 + (v + 3) * 86, GY = 320;
mk(gs, 'line', { x1: 40, y1: GY, x2: 744, y2: GY, stroke: C.ink, 'stroke-width': 3 });
mk(gs, 'path', { d: `M744,${GY} l-14,-8 v16 z`, fill: C.ink }); mk(gs, 'path', { d: `M40,${GY} l14,-8 v16 z`, fill: C.ink });
const gBand = mk(gs, 'line', { x1: 50, y1: GY, x2: 50, y2: GY, stroke: RC, 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.28 });
const gInt = []; for (let v = -3; v <= 4; v++) { const c = mk(gs, 'circle', { cx: GXp(v), cy: GY, r: 13, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); const l = txt(gs, GXp(v), GY + 50, mn(v), { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); gInt.push({ v, c, l }); }
const gRing = mk(gs, 'circle', { cx: 0, cy: GY, r: 26, fill: 'none', stroke: RC, 'stroke-width': 4 });
const gMkP = mk(gs, 'g', {}), gMk = mk(gMkP, 'g', {});
mk(gMk, 'path', { d: `M0,${GY - 22} l-12,-20 h24 z`, fill: XC }); mk(gMk, 'line', { x1: 0, y1: GY - 20, x2: 0, y2: GY + 6, stroke: XC, 'stroke-width': 3 });
const gMkT = txt(gMk, 0, GY - 56, 'x = 2.7', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
const gLeft = txt(gs, GXp(-0.5), GY + 104, '← not bigger than x', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const tG4i = wt('G4', 'integers'), tG4l = wt('G4', 'largest'), tG5 = wt('G5', 'take'), tG5i = T1('G5') - 0.6;
const gxv = t => pw(t, [[tG5 - 0.2, 2.7], [tG5 + 0.6, 3]]);
const gLit = v => v === 3 ? tG5 + 0.7 : tG4i + 0.15 + (2 - v) * 0.16;
const avD = PUC.avatar($('#sG'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my age is just the greatest integer of my exact age.' });

/* ---------- K: chop vs round down ---------- */
$('#kcR').innerHTML = [[`2.7 \\to 2`, 'RIGHT', C.ok, 'check'], [`-2.1 \\to -2`, 'TOO BIG', C.red, 'x']].map(([f, w, col, ic], i) =>
  `<div class="nr" id="kc${i}" style="top:${92 + i * 120}px"><div class="nn">${K(f)}</div><div class="chip" style="right:22px;top:22px;background:${col}">${M.icon(ic, 22, '#fff', 3)}${w}</div></div>`).join('');
$('#kdR').innerHTML = `<div class="nr" id="kd0" style="top:92px"><div class="nn">${K(`${gi('2.7')} = ${rc('2')}`)}</div><div class="chip" style="right:22px;top:22px;background:${C.ok}">${M.icon('check', 22, '#fff', 3)}SAME</div></div>`;
const ks = $('#kS'), KX = v => 92 + (v + 4) * 120, KY = 330;
mk(ks, 'line', { x1: 40, y1: KY, x2: 744, y2: KY, stroke: C.ink, 'stroke-width': 3 });
for (let v = -4; v <= 1; v++) { mk(ks, 'line', { x1: KX(v), y1: KY - 10, x2: KX(v), y2: KY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(ks, KX(v), KY + 44, mn(v), { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); }
const kM = mk(mk(ks, 'g', {}), 'g', {}); mk(kM, 'path', { d: `M${KX(-2.1)},${KY - 18} l-12,-20 h24 z`, fill: XC }); txt(kM, KX(-2.1), KY - 52, '−2.1', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
const kMd = mk(kM, 'circle', { cx: KX(-2.1), cy: KY, r: 10, fill: XC });
const kR2 = mk(mk(ks, 'g', {}), 'g', {}); mk(kR2, 'circle', { cx: KX(-2), cy: KY, r: 22, fill: 'none', stroke: C.red, 'stroke-width': 3.5 }); txt(kR2, KX(-2) + 34, KY - 46, '−2 is to the right: bigger', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
const kQ = txt(ks, KX(-3), KY - 40, '?', { 'text-anchor': 'middle', 'font-size': 40, fill: RC, 'font-weight': 700 });
const th1 = PUC.think($('#th1'), { q: `${K(gi('-2.1'))} &nbsp;is it −2 or −3?`, opts: ['−2', '−3'], right: 1, why: '−3. It is the first integer to the left of −2.1, and −3 ≤ −2.1 < −2.' });
$('#th1 .tq').style.fontSize = '52px';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${gi('2.7')} = ${rc('2')} \\qquad ${gi('-2.1')} = ${rc('-3')}`);

/* ---------- D: staircase live ---------- */
const ds = $('#dS'), DG = plot(ds, { x: 56, y: 76, w: 676, h: 460, xmin: -2.6, xmax: 4.5, ymin: -2.6, ymax: 3.7, xt: [-2, -1, 1, 2, 3, 4], yt: [-2, -1, 1, 2, 3], yl: '[x]' });
const steps = []; for (let n = -2; n <= 3; n++) { const s = mk(ds, 'line', { x1: DG.X(n), y1: DG.Y(n), x2: DG.X(n), y2: DG.Y(n), stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'butt' }); steps.push({ n, s, c: dotC(ds, DG.X(n), DG.Y(n), 10), o: dotO(ds, DG.X(n + 1), DG.Y(n), 10) }); }
const dRings = [mk(ds, 'circle', { cx: DG.X(1), cy: DG.Y(1), r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 3 }), mk(ds, 'circle', { cx: DG.X(2), cy: DG.Y(1), r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 3 })];
const dV = mk(ds, 'line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dXd = mk(ds, 'circle', { r: 11, fill: XC, cx: -99, cy: -99 }), dYd = mk(ds, 'circle', { r: 13, fill: '#fff', stroke: RC, 'stroke-width': 5, cx: -99, cy: -99 });
const dK = [[wt('D2', 'From'), -2], [T1('D2'), -0.9], [wt('D3', 'zero'), 0.05], [wt('D3', 'one'), 1.05], [wt('D3', 'jumps'), 2], [T1('D4') - 0.2, 4]];
const DS = [`0 \\le ${X} < 1 \\;\\Rightarrow\\; ${GX} = ${rc('0')}`, `1 \\le ${X} < 2 \\;\\Rightarrow\\; ${GX} = ${rc('1')}`, `${GX} = ${rc('n')} \\iff n \\le ${X} < n + 1`];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="ps" id="ds${i}" style="top:${232 + i * 84}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
$('#dRg').innerHTML = 'Domain&nbsp;' + K('\\mathbb{R}') + '&nbsp;&nbsp;·&nbsp;&nbsp;Range&nbsp;' + K('\\mathbb{Z}') + '&nbsp;(the integers)';
const tDs = [wt('D6', 'Step'), wt('D7', 'Step'), wt('D8', 'general')];
let dLast = null;
const th2 = PUC.think($('#th2'), { q: 'At x = 2, is the staircase at height 1 or 2?', opts: ['Height 1', 'Height 2'], right: 1, why: '[2] = 2. The filled dot sits at the start of the new step; the empty dot ends the old one.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Solve&nbsp; ${K(`2${GX} - 1 = 5`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`2${GX} = 6`) + '&nbsp; <span style="font:500 22px Poppins;color:var(--mute)">add 1 to both sides</span>'],
  [K(`${GX} = ${rc('3')}`) + '&nbsp; <span style="font:500 22px Poppins;color:var(--mute)">divide by 2</span>'],
  [K(`3 \\le ${X} < 4`) + '&nbsp; <span style="font:500 22px Poppins;color:var(--mute)">the staircase rule</span>'],
  [K(`${X} \\in [3,\\ 4)`) + '&nbsp; <span style="font:500 22px Poppins;color:var(--mute)">3 included, 4 not</span>']], { label: 'WORKED EXAMPLE', y0: 176, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Add'), wt('W4', 'Divide'), wt('W5', 'Three'), wt('W6', 'any')];
const ws = $('#wS'), WG = plot(ws, { x: 70, y: 84, w: 660, h: 220, xmin: -0.4, xmax: 5.3, ymin: -0.5, ymax: 4.4, xt: [1, 2, 3, 4, 5], yt: [1, 2, 3, 4], yl: '[x]' });
const wSt = []; for (let n = 0; n <= 4; n++) { const g = mk(ws, 'g', {}); const hot = n === 3; mk(g, 'line', { x1: WG.X(n), y1: WG.Y(n), x2: WG.X(n + 1), y2: WG.Y(n), stroke: hot ? RC : C.dim, 'stroke-width': hot ? 7 : 5 }); mk(g, 'circle', { cx: WG.X(n), cy: WG.Y(n), r: 8, fill: hot ? RC : C.dim }); mk(g, 'circle', { cx: WG.X(n + 1), cy: WG.Y(n), r: 8, fill: '#fff', stroke: hot ? RC : C.dim, 'stroke-width': 3 }); wSt.push({ n, g }); }
const wHl = mk(ws, 'line', { x1: WG.X(-0.2), y1: WG.Y(3), x2: WG.X(3), y2: WG.Y(3), stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const WX = v => 70 + (v + 0.4) / 5.7 * 660, WY = 410;
mk(ws, 'line', { x1: 60, y1: WY, x2: 740, y2: WY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 5; v++) { mk(ws, 'line', { x1: WX(v), y1: WY - 8, x2: WX(v), y2: WY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ws, WX(v), WY + 38, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const wDrop = [3, 4].map(v => mk(ws, 'line', { x1: WX(v), y1: WG.Y(3) + 12, x2: WX(v), y2: WY - 14, stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '5 6' }));
const wSeg = mk(ws, 'line', { x1: WX(3), y1: WY, x2: WX(4), y2: WY, stroke: RC, 'stroke-width': 10 });
const wC = dotC(ws, WX(3), WY, 11), wO = dotO(ws, WX(4), WY, 11);
const w399 = mk(mk(ws, 'g', {}), 'g', {}); txt(w399, WX(3.99) - 8, WY - 22, '3.99 ✓', { 'text-anchor': 'end', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
const w4 = mk(mk(ws, 'g', {}), 'g', {}); txt(w4, WX(4) + 18, WY - 22, '4 ✗', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
$('#wP').innerHTML = 'Every x from 3 up to 4, but not 4';

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${gi('-3.7')} = -3`) + '&nbsp; drop the decimal', right: K(`${gi('-3.7')} = ${rc('-4')}`) + '&nbsp; because ' + K(`-4 \\le -3.7 < -3`) });
const ts = $('#tS'), TXv = v => 70 + (v + 5) * 160, TYl = 180;
mk(ts, 'line', { x1: 30, y1: TYl, x2: 590, y2: TYl, stroke: C.ink, 'stroke-width': 3 });
for (let v = -5; v <= -2; v++) { mk(ts, 'line', { x1: TXv(v), y1: TYl - 8, x2: TXv(v), y2: TYl + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TYl + 40, mn(v), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const tM = mk(mk(ts, 'g', {}), 'g', {}); mk(tM, 'circle', { cx: TXv(-3.7), cy: TYl, r: 10, fill: XC }); txt(tM, TXv(-3.7), TYl - 26, '−3.7', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });
const tBad = mk(mk(ts, 'g', {}), 'g', {}); mk(tBad, 'circle', { cx: TXv(-3), cy: TYl, r: 18, fill: 'none', stroke: C.red, 'stroke-width': 3 }); txt(tBad, TXv(-3), TYl - 30, 'bigger', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600 });
const tArr = PUC.arrow(ts, C.ok, 4, 14);
const tGood = mk(mk(ts, 'g', {}), 'g', {}); mk(tGood, 'circle', { cx: TXv(-4), cy: TYl, r: 18, fill: 'none', stroke: C.ok, 'stroke-width': 4 }); txt(tGood, TXv(-4) - 30, TYl - 92, 'first integer to the left', { 'text-anchor': 'start', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A function built from [x]: find its values or its range.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`f(x) = [x] + [-x] + \\operatorname{sgn} x,\\quad x \\in \\mathbb{R}`)}<br>What is the range of f?`,
  opts: [K('\\{-1,\\ 0,\\ 1\\}'), K('\\{-2,\\ 0\\}'), K('\\{-2,\\ -1,\\ 0,\\ 1\\}'), K('\\{-1,\\ 0\\}')], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`x = 0:\\ f = 0`)], [K(`x = n \\ne 0:\\ f = 0 \\pm 1`)], [K(`x \\notin \\mathbb{Z}:\\ [x] + [-x] = -1`)], [K(`f = -1 \\pm 1 = 0 \\text{ or } -2`)], [K(`\\text{Range} = \\{-2, -1, 0, 1\\}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'zero'), wt('A3', 'integer'), wt('A4', 'not'), wt('A5', 'positive'), wt('A5', 'Range')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · signum and greatest integer', y0: 96, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Signum</b>: keeps only the sign of x · range {−1, 0, 1}',
    K(`\\operatorname{sgn} ${X} = \\tfrac{|${X}|}{${X}}\\ (${X} \\ne 0), \\qquad \\operatorname{sgn} 0 = 0`),
    K(`${GX} = ${rc('n')} \\iff n \\le ${X} < n + 1`),
    K(`${gi('2.7')} = ${rc('2')} \\qquad ${gi('3')} = ${rc('3')} \\qquad ${gi('-2.1')} = ${rc('-3')}`),
    '<b>Graph</b>: a staircase · filled dot in, empty dot out · range Z'] });
const YQ = ['What is the signum of −7? And the signum of 0?', 'Find [−0.5].', 'For which numbers x is [x] equal to 5?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 22', topic: 'Six shapes on one sheet: can you name each graph?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('D4', 'staircase') - 0.2, 1.07, 1200, 560], [T0('D6'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: three exact ages */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tS1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('S1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    hA.forEach((g, i) => M.vis(g, t, tHa[i] - 0.1, 1e9, { dy: -20, fade: 0.15 }));
    M.draw(hBand, t, wt('H2', 'just') - 0.1, 0.6); M.vis(hC, t, wt('H2', 'just'), 1e9, { dy: 0, fade: 0.1 }); M.vis(hO, t, wt('H2', 'just') + 0.4, 1e9, { dy: 0, fade: 0.1 });
    M.vis(hBl, t, wt('H2', 'just') + 0.5, 1e9, { dy: 0 });
    M.vis($('#hlP'), t, T1('H2') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'minus') - 0.1, 1e9, POP);
  }

  /* S: signum live */
  const sOn = t >= tS1 - 0.1 && t < tM1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('M1');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#sgT'), t, wt('S1', 'signum') + 0.1, 0.7);
    const xv = pw(t, sgK), live = t >= T0('S4') - 0.3, s = sgn(xv);
    SR.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tSr[i] - 0.15, 1e9, { dx: -16, dy: 0 }); const act = live && t < T0('S6') ? ((i === 0 && s > 0) || (i === 1 && s === 0) || (i === 2 && s < 0)) : false; el.style.background = act ? C.ac2 : C.soft; });
    M.vis($('#sgDm'), t, wt('S6', 'domain') - 0.1, 1e9, POP); M.vis($('#sgRg'), t, wt('S6', 'range') - 0.1, 1e9, POP);
    M.vis($('#sg'), t, T0('S2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#sgX'), t, T0('S4') - 0.3, 1e9, { dy: 10 }); M.vis($('#sgY'), t, T0('S4') - 0.2, 1e9, { dy: 10 });
    const key = fmt(xv); if (key !== sgLast) { sgLast = key; $('#sgX').innerHTML = `<span style="color:${XC};font-family:Poppins;font-style:italic">x</span> = ${key}`; $('#sgY').innerHTML = `<span style="color:${RC}">sgn x</span> = ${mn(s)}`; }
    const L = live ? Math.min(xv, 0) : -4.3;
    attr(sgL, 'd', L > -4.2 ? `M${SG.X(-4.2)},${SG.Y(-1)} H${SG.X(Math.min(L, -0.12)).toFixed(1)}` : ''); M.hide(sgL, !(L > -4.2));
    const R = live ? xv : -1; attr(sgRr, 'd', R > 0.12 ? `M${SG.X(0.12)},${SG.Y(1)} H${SG.X(R).toFixed(1)}` : ''); M.hide(sgRr, !(R > 0.12));
    M.hide(sgO1, !(live && xv >= 0)); M.hide(sgC0, !(live && xv >= 0)); M.hide(sgO2, !(live && xv > 0.12));
    M.hide(sgXd, !live); M.hide(sgYd, !live || t > T0('S6')); M.hide(sgV, !live || t > T0('S6'));
    attr(sgXd, 'cx', SG.X(xv).toFixed(1)); attr(sgXd, 'cy', SG.Y(0)); attr(sgYd, 'cx', SG.X(xv).toFixed(1)); attr(sgYd, 'cy', SG.Y(s).toFixed(1));
    attr(sgV, 'x1', SG.X(xv).toFixed(1)); attr(sgV, 'x2', SG.X(xv).toFixed(1)); attr(sgV, 'y1', SG.Y(0)); attr(sgV, 'y2', SG.Y(s));
  }

  /* M: signum with the modulus */
  const mOn = t >= tM1 - 0.1 && t < tG1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('G1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#mT'), t, wt('M1', 'Mod') - 0.1, 0.9);
    MS.forEach((_, i) => { const el = $('#ms' + i); M.vis(el.querySelector('.n'), t, tMs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tMs[i], 0.8); M.vis(el.querySelector('.why'), t, tMs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(176, [[tMs[1] - 0.1, 304], [tMs[2] - 0.1, 432]], M.SOFT)(t);
    const hb = $('#mHi'); M.vis(hb, t, tMs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#mr'), t, tM1 + 0.3, out, { dx: 60, dy: 0, ...o });
    mBr.forEach((b, i) => { M.vis(b.g, t, tMs[i] + 0.1, 1e9, { dy: 0, fade: 0.15 }); });
    M.vis(mZ, t, tMs[2] + 0.2, 1e9, { dy: 0, sc: 0.4, sp: M.POP });
    [0, 1, 2].forEach(i => M.vis($('#mf' + i), t, tMs[i] + 0.3, i < 2 ? tMs[i + 1] - 0.2 : 1e9, { dy: 16, outDur: 0.2, ody: -12 }));
    avA(t, T1('M3') + 0.2, out);
  }

  /* G: greatest integer */
  const gOn = t >= tG1 - 0.1 && t < tK1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('K1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#gT'), t, wt('G1', 'square') - 0.1, 0.6);
    M.rise($('#gD'), t, T0('G2') + 0.1, { st: 0.05, sp: M.HEAVY });
    const wd = $('#gD b'); wd.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('G2', 'greatest')) / 0.3)); wd.style.borderRadius = '8px';
    M.vis($('#gw0'), t, wt('G3', 'List') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#gw1'), t, wt('G3', 'pick') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#gr0'), t, wt('G4', 'largest') + 0.5, 1e9, POP); M.vis($('#gr1'), t, wt('G5', 'so') - 0.1, 1e9, POP);
    M.vis($('#gr'), t, T0('G3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const xv = gxv(t), fx = fl(xv + 1e-9);
    attr(gMkP, 'transform', `translate(${GXp(xv).toFixed(1)},0)`); M.vis(gMk, t, wt('G4', 'Take') - 0.1, 1e9, { dy: -16, fade: 0.12 });
    M.setT(gMkT, xv > 2.99 ? 'x = 3' : 'x = 2.7');
    gInt.forEach(g => { const u = M.io((t - gLit(g.v)) / 0.2) * (g.v <= xv + 1e-9 ? 1 : 0); attr(g.c, 'fill', mix('#FFFFFF', RC, u)); attr(g.c, 'stroke', mix(C.ink, RC, u)); });
    const bu = M.io((t - tG4i) / 0.8); M.hide(gBand, bu <= 0); attr(gBand, 'x2', (50 + (GXp(xv) - 50) * bu).toFixed(1));
    M.vis(gLeft, t, tG4i + 0.3, 1e9, { dy: 0 });
    attr(gRing, 'cx', GXp(fx).toFixed(1)); M.vis(gRing, t, tG4l - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP });
    const rk = xv > 2.99 ? 3 : 2; if ($('#gRd')._k !== rk) { $('#gRd')._k = rk; $('#gRd').innerHTML = K(`${gi(rk === 3 ? '3' : '2.7')} = ${rc(rk)}`); }
    M.vis($('#gRd'), t, tG4l + 0.2, 1e9, { dy: 12 });
    avD(t, tG5i + 0.4, out);
  }

  /* K: side by side + pause and think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kc'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kc0'), t, wt('K1', 'two') - 0.1, 1e9, { dy: 16 }); M.vis($('#kc0 .chip'), t, wt('K1', 'both') - 0.05, 1e9, POP);
    M.vis($('#kc1'), t, wt('K2', 'chopping') - 0.1, 1e9, { dy: 16 }); M.vis($('#kc1 .chip'), t, wt('K2', 'bigger') - 0.05, 1e9, POP);
    M.vis($('#kcP'), t, wt('K2', 'right') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, wt('K1', 'Chopping') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kd0'), t, wt('K1', 'two') + 0.1, 1e9, { dy: 16 }); M.vis($('#kd0 .chip'), t, wt('K1', 'both') + 0.1, 1e9, POP);
    M.vis(kM, t, wt('K2', 'minus') - 0.1, 1e9, { dy: -16, fade: 0.12 });
    M.vis(kR2, t, wt('K2', 'bigger') - 0.1, 1e9, { dy: 0, fade: 0.15 });
    M.vis(kQ, t, wt('K2', 'right') + 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'two', 1) - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'first') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'always') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'left') - 0.2, 0.8);
  }

  /* D: staircase live */
  const dOn = t >= tD1 - 0.1 && t < tW1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('W1');
    M.vis($('#dl'), t, tD1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr'), t, tD1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const live = t >= wt('D2', 'From') - 0.2, xv = pw(t, dK), n = fl(xv + 1e-9), tEnd = T1('D4') - 0.2;
    M.vis($('#dX'), t, wt('D2', 'From') - 0.2, 1e9, { dy: 10 }); M.vis($('#dY'), t, wt('D2', 'From') - 0.1, 1e9, { dy: 10 });
    const key = fmt(xv); if (key !== dLast) { dLast = key; $('#dX').innerHTML = `<span style="color:${XC};font-family:Poppins;font-style:italic">x</span> = ${key}`; $('#dY').innerHTML = `<span style="color:${RC}">[x]</span> = ${mn(Math.min(n, 3))}`; }
    steps.forEach(st => { const on = live && xv >= st.n - 1e-9; M.hide(st.s, !on); M.hide(st.c, !on); if (on) attr(st.s, 'x2', DG.X(Math.min(xv, st.n + 1)).toFixed(1)); M.hide(st.o, !(live && (xv >= st.n + 1 - 1e-6 || (st.n === 3 && t >= tEnd)))); });
    const run = live && t < tEnd + 0.4; M.hide(dXd, !run); M.hide(dYd, !run); M.hide(dV, !run);
    const nn = Math.min(n, 3);
    attr(dXd, 'cx', DG.X(xv).toFixed(1)); attr(dXd, 'cy', DG.Y(0)); attr(dYd, 'cx', DG.X(Math.min(xv, 3.999)).toFixed(1)); attr(dYd, 'cy', DG.Y(nn).toFixed(1));
    attr(dV, 'x1', DG.X(xv).toFixed(1)); attr(dV, 'x2', DG.X(xv).toFixed(1)); attr(dV, 'y1', DG.Y(0)); attr(dV, 'y2', DG.Y(nn));
    M.vis(dRings[0], t, wt('D4', 'filled') - 0.05, T0('D6'), { dy: 0, sc: 0.4, sp: M.POP }); M.vis(dRings[1], t, wt('D4', 'empty') - 0.05, T0('D6'), { dy: 0, sc: 0.4, sp: M.POP });
    M.vis($('#lg0'), t, wt('D5', 'filled') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#lg1'), t, wt('D5', 'empty') - 0.1, 1e9, { dx: -16, dy: 0 });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); });
    const hiY = M.track(232, [[tDs[1] - 0.1, 316], [tDs[2] - 0.1, 400]], M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, T0('D9'), { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#dRg'), t, wt('D9', 'domain') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'height') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'Square') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, wt('W5', 'staircase') - 0.2, out, { dx: 60, dy: 0, ...o });
    wSt.forEach((s, i) => M.vis(s.g, t, wt('W5', 'staircase') + i * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.draw(wHl, t, wt('W5', 'Three') - 0.1, 0.5);
    wDrop.forEach((l, i) => M.draw(l, t, wt('W5', 'Three') + 0.3 + i * 0.4, 0.4));
    M.draw(wSeg, t, wt('W6', 'any') - 0.1, 0.6); M.vis(wC, t, wt('W6', 'included') - 0.1, 1e9, POP); M.vis(wO, t, wt('W6', 'not') - 0.1, 1e9, POP);
    M.vis(w399, t, wt('W7', 'nine', 1) - 0.1, 1e9, { dy: 10 }); M.vis(w4, t, wt('W7', 'Four') - 0.1, 1e9, { dy: 10 });
    M.vis($('#wP'), t, wt('W7', 'whole') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'bigger') - 0.1, tRight: wt('X3', 'answer') - 0.1 });
    M.vis(tM, t, wt('X2', 'Find') + 0.2, 1e9, { dy: 0, fade: 0.15 });
    M.vis(tBad, t, wt('X3', 'bigger') - 0.1, 1e9, { dy: 0, fade: 0.15 });
    const au = M.io((t - wt('X3', 'Move')) / 0.6); if (au > 0) tArr.set(TXv(-3.7), TYl - 62, TXv(-3.7) + (TXv(-4) - TXv(-3.7) - 4) * au, TYl - 62); else tArr.set(0, 0, 0, 0);
    M.vis(tGood, t, wt('X3', 'first') - 0.05, 1e9, { dy: 0, fade: 0.15 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'range'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + three questions + NEXT */
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
