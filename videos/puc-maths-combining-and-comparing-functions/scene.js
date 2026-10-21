// PUC Maths Ep 23: Combining and comparing functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: input x violet, f blue, g teal, the combined function (f+g, fg, f/g) coral, excluded / wrong red
const XC = C.violet, RC = C.ac, FC = '#2F6FEB', GC = C.teal;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, fb = s => `\\textcolor{${FC}}{${s}}`, gt = s => `\\textcolor{${GC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const X = xc('x'), F = fb('f'), G = gt('g');
const Fx = `${F}(${X})`, Gx = `${G}(${X})`;
const mn = s => String(s).replace(/-/g, '−');
const f1 = v => mn((Math.abs(v) < 0.05 ? 0 : v).toFixed(1));
const pw = (t, keys) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; if (t < b) return va + (vb - va) * M.clamp((t - a) / Math.max(1e-3, b - a)); } return keys[keys.length - 1][1]; };
let clipN = 0;
const plot = (svg, o) => {
  const Xf = v => o.x + (v - o.xmin) / (o.xmax - o.xmin) * o.w, Yf = v => o.y + o.h - (v - o.ymin) / (o.ymax - o.ymin) * o.h;
  const g = mk(svg, 'g', {}), fs = o.fs ?? 18;
  mk(g, 'line', { x1: o.x, y1: Yf(0), x2: o.x + o.w, y2: Yf(0), stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'line', { x1: Xf(0), y1: o.y + o.h, x2: Xf(0), y2: o.y, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${o.x + o.w + 6},${Yf(0)} l-14,-7 v14 z`, fill: C.ink }); mk(g, 'path', { d: `M${Xf(0)},${o.y - 6} l-7,14 h14 z`, fill: C.ink });
  (o.xt || []).forEach(v => { if (!v) return; mk(g, 'line', { x1: Xf(v), y1: Yf(0) - 6, x2: Xf(v), y2: Yf(0) + 6, stroke: C.ink, 'stroke-width': 2 }); txt(g, Xf(v), Yf(0) + 28, mn(v), { 'text-anchor': 'middle', 'font-size': fs, fill: C.ink2, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { if (!v) return; mk(g, 'line', { x1: Xf(0) - 6, y1: Yf(v), x2: Xf(0) + 6, y2: Yf(v), stroke: C.ink, 'stroke-width': 2 }); txt(g, Xf(0) - 12, Yf(v) + 6, mn(v), { 'text-anchor': 'end', 'font-size': fs, fill: C.ink2, 'font-weight': 600 }); });
  txt(g, o.x + o.w - 4, Yf(0) - 14, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: XC, 'font-weight': 600 });
  const id = 'qc' + (++clipN); const cp = mk(mk(svg, 'defs', {}), 'clipPath', { id }); mk(cp, 'rect', { x: o.x, y: o.y, width: o.w, height: o.h });
  const cg = mk(svg, 'g', { 'clip-path': `url(#${id})` });
  const pathD = (fn, a, b, n = 120) => { let d = '', pen = false; for (let i = 0; i <= n; i++) { const xv = a + (b - a) * i / n, yv = fn(xv); if (!isFinite(yv) || Math.abs(yv) > 1e3) { pen = false; continue; } d += (pen ? 'L' : 'M') + Xf(xv).toFixed(1) + ',' + Math.max(-5e3, Math.min(5e3, Yf(yv))).toFixed(1); pen = true; } return d; };
  const curve = (col = RC, w = 5, a = {}) => mk(cg, 'path', Object.assign({ d: '', fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, a));
  return { X: Xf, Y: Yf, g, cg, pathD, curve };
};
const setXY = (el, x, y) => { attr(el, 'cx', x.toFixed(1)); attr(el, 'cy', y.toFixed(1)); };
const setL = (el, x1, y1, x2, y2) => { attr(el, 'x1', x1.toFixed(1)); attr(el, 'y1', y1.toFixed(1)); attr(el, 'x2', x2.toFixed(1)); attr(el, 'y2', y2.toFixed(1)); };
const holeAt = (p, x, y, col) => mk(p, 'circle', { cx: x, cy: y, r: 11, fill: '#fff', stroke: col, 'stroke-width': 3.5 });

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tO1 = T0('O1'), tK1 = T0('K1'), tT = T0('T1'), tC1 = T0('C1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['TEA · ₹15 A CUP', '15x'], ['SAMOSA · ₹20 EACH', '20x'], ['THE BILL · ADD THE RULES', '35x']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${[FC, GC, RC][i]}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'tea') - 0.05, wt('H1', 'samosa') - 0.05, wt('H1', 'twenty') + 0.3];

/* ---------- H: the bill table ---------- */
const HC = [['FRIENDS x', XC], ['TEA 15x', FC], ['SAMOSA 20x', GC], ['BILL 35x', RC]], CX = i => i * 180;
$('#hb').innerHTML = HC.map(([h, col], i) => `<div class="bh" style="left:${CX(i)}px;top:72px;width:164px;color:${col}">${h}</div>`).join('') +
  [1, 2, 3, 4].map((n, r) => [n, 15 * n, 20 * n, 35 * n].map((v, i) => `<div class="bc" id="hc${r}${i}" style="left:${CX(i)}px;top:${124 + r * 72}px;width:164px;color:${HC[i][1]}">${i ? '₹' + v : v}</div>`).join('')).join('');
$('#hF').innerHTML = K(`${fb('15x')} + ${gt('20x')} = ${rc('35x')}`);

/* ---------- D: f + g live ---------- */
const ff = v => v * v, gg = v => 2 * v + 1;
$('#dF0').innerHTML = K(`${rc(`(${F} + ${G})`)}(${X}) = ${Fx} + ${Gx}`);
$('#dF1').innerHTML = K(`${Fx} = ${X}^2`); $('#dF2').innerHTML = K(`${Gx} = 2${X} + 1`);
$('#dF3').innerHTML = K(`${rc(`(${F} + ${G})`)}(${X}) = ${rc(`${X}^2 + 2${X} + 1 = (${X} + 1)^2`)}`);
const ds = $('#dS'), DG = plot(ds, { x: 70, y: 70, w: 650, h: 470, xmin: -3.4, xmax: 2.4, ymin: -3.5, ymax: 9.6, xt: [-3, -2, -1, 1, 2], yt: [-2, 2, 4, 6, 8] });
const dFc = DG.curve(FC, 4), dGc = DG.curve(GC, 4), dS = DG.curve(RC, 6);
attr(dFc, 'd', DG.pathD(ff, -3.4, 2.4)); attr(dGc, 'd', DG.pathD(gg, -3.4, 2.4, 4));
const dBf = mk(ds, 'line', { stroke: FC, 'stroke-width': 12, opacity: 0.55 }), dBg = mk(ds, 'line', { stroke: GC, 'stroke-width': 12, opacity: 0.55 });
const dDot = mk(ds, 'circle', { r: 12, fill: '#fff', stroke: RC, 'stroke-width': 5 }), dXd = mk(ds, 'circle', { r: 10, fill: XC });
const dLf = txt(ds, DG.X(-2.95), DG.Y(7.6), 'f', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 26, fill: FC, 'font-weight': 700 });
const dLg = txt(ds, DG.X(2.15), DG.Y(3.4), 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 26, fill: GC, 'font-weight': 700 });
const dLs = txt(ds, DG.X(1.5), DG.Y(8.7), 'f + g', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 26, fill: RC, 'font-weight': 700 });
const dK = [[wt('D4', 'stack') - 0.2, -3.2], [T0('D5') - 0.1, 2.15]];
let dLast = null;

/* ---------- O: five operations ---------- */
const OS = [[`${rc(`(${F} + ${G})`)}(${X}) = ${Fx} + ${Gx}`, 'SUM'], [`${rc(`(${F} - ${G})`)}(${X}) = ${Fx} - ${Gx}`, 'DIFFERENCE'], [`${rc(`(\\alpha ${F})`)}(${X}) = \\alpha\\, ${Fx}`, 'SCALAR'],
  [`${rc(`(${F}${G})`)}(${X}) = ${Fx}\\, ${Gx}`, 'PRODUCT'], [`${rc(`\\left(\\tfrac{${F}}{${G}}\\right)`)}(${X}) = \\tfrac{${Fx}}{${Gx}},\\ ${Gx} \\ne 0`, 'QUOTIENT']];
$('#oSt').innerHTML = OS.map(([f, n], i) => `<div class="ps" id="os${i}" style="top:${92 + i * 90}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="nm">${n}</div></div>`).join('');
$('#oA').innerHTML = K(`f(2) = 4`); $('#oB').innerHTML = K(`g(2) = 5`);
const OV = [`(${F} + ${G})(2) = 4 + 5 = ${rc('9')}`, `(${F} - ${G})(2) = 4 - 5 = ${rc('-1')}`, `(3${F})(2) = 3 \\times 4 = ${rc('12')}`, `(${F}${G})(2) = 4 \\times 5 = ${rc('20')}`, `\\left(\\tfrac{${F}}{${G}}\\right)(2) = \\tfrac{4}{5} = ${rc('0.8')}`];
$('#oV').innerHTML = OV.map((f, i) => `<div class="vr" id="ov${i}" style="top:${170 + i * 80}px"><div class="sx">${K(f)}</div></div>`).join('');
$('#oV').querySelectorAll('.sx').forEach(e => { e.style.fontSize = '30px'; e.style.top = '14px'; });
const tOs = [wt('O2', 'The'), wt('O3', 'The'), wt('O4', 1), wt('O5', 'The'), wt('O6', 'The')];

/* ---------- K: product vs quotient ---------- */
$('#kF0').innerHTML = K(`${rc(`(${F}${G})`)}(${X}) = ${X}^2(2${X} + 1)`);
$('#kF1').innerHTML = K(`${rc(`\\left(\\tfrac{${F}}{${G}}\\right)`)}(${X}) = \\dfrac{${X}^2}{2${X} + 1}`);
const kG = [0, 1].map(k => { const sv = $('#kS' + k), P = plot(sv, { x: 70, y: 170, w: 644, h: 300, xmin: -2.2, xmax: 2.2, ymin: -3, ymax: 3, xt: [-2, -1, 1, 2], yt: [-2, 2] });
  const c = P.curve(RC, 5); attr(c, 'd', k ? P.pathD(v => v * v / (2 * v + 1), -2.2, -0.52, 200) + P.pathD(v => v * v / (2 * v + 1), -0.48, 2.2, 200) : P.pathD(v => v * v * (2 * v + 1), -2.2, 2.2));
  const band = mk(sv, 'line', { x1: P.X(-2.15), y1: P.Y(0), x2: P.X(2.15), y2: P.Y(0), stroke: XC, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.3 });
  let asy = null, hole = null, lab = null;
  if (k) { asy = mk(sv, 'line', { x1: P.X(-0.5), y1: P.Y(3), x2: P.X(-0.5), y2: P.Y(-3), stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' }); hole = holeAt(sv, P.X(-0.5), P.Y(0), C.red); lab = txt(sv, P.X(-0.5) + 16, P.Y(-0.9), 'x = −1/2: g(x) = 0', { 'text-anchor': 'start', 'font-size': 18, fill: C.red, 'font-weight': 600 }); }
  return { c, band, asy, hole, lab }; });
const th1 = PUC.think($('#th1'), { q: 'f(x) = x², g(x) = x − 3. Is f/g defined at x = 3?', opts: ['Yes', 'No'], right: 1, why: 'g(3) = 0, and we can never divide by zero: 3 is thrown out of the domain of f/g.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${rc(`\\left(\\tfrac{${F}}{${G}}\\right)`)}(${X}) = \\dfrac{${Fx}}{${Gx}}, \\quad ${red(`${Gx} \\ne 0`)}`);

/* ---------- C: equal functions ---------- */
$('#cF0').innerHTML = K(`${Fx} = ${X} \\qquad \\text{domain } \\mathbb{R}`);
$('#cF1').innerHTML = K(`${Gx} = \\dfrac{${X}^2}{${X}} \\qquad \\text{domain } \\mathbb{R} - \\{${red('0')}\\}`);
const cs = $('#cS'), CG = plot(cs, { x: 70, y: 84, w: 644, h: 420, xmin: -3.4, xmax: 3.4, ymin: -3.4, ymax: 3.4, xt: [-3, -2, -1, 1, 2, 3], yt: [-3, -2, -1, 1, 2, 3] });
const cF = CG.curve(FC, 9, { opacity: 0.45 }), cGl = CG.curve(GC, 4); attr(cF, 'd', CG.pathD(v => v, -3.4, 3.4, 4)); attr(cGl, 'd', CG.pathD(v => v, -3.4, 3.4, 4));
const cH = holeAt(cs, CG.X(0), CG.Y(0), C.red), cRing = mk(cs, 'circle', { cx: CG.X(0), cy: CG.Y(0), r: 34, fill: 'none', stroke: C.red, 'stroke-width': 3 });
const cHl = txt(cs, CG.X(0.5), CG.Y(-1.4), 'g(0) is not defined', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
const cLf = txt(cs, CG.X(2.2), CG.Y(3), 'f(x) = x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, fill: FC, 'font-weight': 700 });
const cLg = txt(cs, CG.X(-3.2), CG.Y(1.6), 'g(x) = x²/x', { 'font-family': 'Poppins', 'font-size': 22, fill: GC, 'font-weight': 700 });
const th2 = PUC.think($('#th2'), { q: 'Are |x| and √(x²) equal functions?', opts: ['Yes, equal', 'No'], right: 0, why: 'Both have domain R, and √(x²) = |x| for every real x: same domain, same outputs.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${Fx} = \\sqrt{${X}},\\ \\ ${Gx} = ${X},\\ \\ ${X} \\ge 0`)}<br>Find f + g, fg and f/g.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${rc(`(${F} + ${G})`)}(${X}) = \\sqrt{${X}} + ${X}`)],
  [K(`${rc(`(${F}${G})`)}(${X}) = \\sqrt{${X}} \\cdot ${X} = ${X}^{3/2}`)],
  [K(`${rc(`\\left(\\tfrac{${F}}{${G}}\\right)`)}(${X}) = \\tfrac{\\sqrt{${X}}}{${X}} = \\tfrac{1}{\\sqrt{${X}}}`)],
  [K(`\\text{only where } ${X} > 0`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'Step')];
const wsv = $('#wS'), WG = plot(wsv, { x: 70, y: 84, w: 644, h: 400, xmin: -0.4, xmax: 4.4, ymin: -0.4, ymax: 3.4, xt: [1, 2, 3, 4], yt: [1, 2, 3] });
const wF = WG.curve(FC, 4), wG = WG.curve(GC, 4), wQ = WG.curve(RC, 6);
attr(wF, 'd', WG.pathD(Math.sqrt, 0, 4.4)); attr(wG, 'd', WG.pathD(v => v, 0, 4.4, 4)); attr(wQ, 'd', WG.pathD(v => 1 / Math.sqrt(v), 0.08, 4.4, 160));
const wLf = txt(wsv, WG.X(4.3), WG.Y(2.08) + 26, '√x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, fill: FC, 'font-weight': 700 });
const wLg = txt(wsv, WG.X(3.2), WG.Y(3.2), 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: GC, 'font-weight': 700 });
const wLq = txt(wsv, WG.X(2.4), WG.Y(0.95), '1/√x', { 'font-family': 'Poppins', 'font-size': 22, fill: RC, 'font-weight': 700 });
const wH = holeAt(wsv, WG.X(0), WG.Y(0), C.red), wHl = txt(wsv, WG.X(0) + 20, WG.Y(0) + 46, 'x = 0 removed', { 'font-size': 18, fill: C.red, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\sqrt{x} + \\sqrt{1 - x}:\\ \\text{domain } \\mathbb{R}`), right: K(`\\text{domain} = ${rc('[0,\\ 1]')}`) + '&nbsp; where both work' });
const ts = $('#tS'), TXv = v => 120 + (v + 1) * 110, TYl = 170;
mk(ts, 'line', { x1: 40, y1: TYl, x2: 590, y2: TYl, stroke: C.ink, 'stroke-width': 3 });
for (let v = -1; v <= 3; v++) { mk(ts, 'line', { x1: TXv(v), y1: TYl - 8, x2: TXv(v), y2: TYl + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TYl + 40, mn(v), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const tA = mk(mk(ts, 'g', {}), 'g', {}); mk(tA, 'line', { x1: TXv(0), y1: TYl - 54, x2: 590, y2: TYl - 54, stroke: FC, 'stroke-width': 8, 'stroke-linecap': 'round' }); txt(tA, 590, TYl - 70, '√x: x ≥ 0', { 'text-anchor': 'end', 'font-size': 18, fill: FC, 'font-weight': 600 }); mk(tA, 'circle', { cx: TXv(0), cy: TYl - 54, r: 8, fill: FC });
const tB = mk(mk(ts, 'g', {}), 'g', {}); mk(tB, 'line', { x1: 40, y1: TYl - 30, x2: TXv(1), y2: TYl - 30, stroke: GC, 'stroke-width': 8, 'stroke-linecap': 'round' }); txt(tB, 44, TYl - 104, '√(1 − x): x ≤ 1', { 'font-size': 18, fill: GC, 'font-weight': 600 }); mk(tB, 'circle', { cx: TXv(1), cy: TYl - 30, r: 8, fill: GC });
const tO = mk(ts, 'line', { x1: TXv(0), y1: TYl, x2: TXv(1), y2: TYl, stroke: RC, 'stroke-width': 10 });
const tOd = [0, 1].map(v => mk(ts, 'circle', { cx: TXv(v), cy: TYl, r: 10, fill: RC }));
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Combine two functions, then find the domain of the result.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`f(x) = \\sqrt{4 - x^2},\\quad g(x) = |x| - 1`)}<br>What is the domain of f/g?`,
  opts: [K('[-2,\\ 2]'), K('(-2,\\ 2)'), K('[-2,\\ 2] - \\{-1,\\ 1\\}'), K('(-2,\\ 2) - \\{-1,\\ 1\\}')], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`4 - x^2 \\ge 0`)], [K(`\\Rightarrow -2 \\le x \\le 2`)], [K(`g \\text{ works for every } x`)], [K(`g(x) = 0 \\iff x = \\pm 1`)], [K(`[-2,\\ 2] - \\{-1,\\ 1\\}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'needs'), wt('A2', 'runs'), wt('A3', 'works'), wt('A4', 'zero'), wt('A5', 'domain')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · algebra of real functions', y0: 96, dy: 80, txt: [0, 0, 0, 1, 1],
  lines: [K(`${rc(`(${F} \\pm ${G})`)}(${X}) = ${Fx} \\pm ${Gx} \\qquad ${rc(`(\\alpha ${F})`)}(${X}) = \\alpha\\, ${Fx}`),
    K(`${rc(`(${F}${G})`)}(${X}) = ${Fx}\\, ${Gx}`),
    K(`${rc(`\\left(\\tfrac{${F}}{${G}}\\right)`)}(${X}) = \\tfrac{${Fx}}{${Gx}},\\ \\ ${red(`${Gx} \\ne 0`)}`),
    '<b>Domain</b>: where both f and g work; for f/g also drop every x with g(x) = 0',
    '<b>Equal functions</b>: same domain and same output at every x'] });
const YQ = ['f(x) = x + 2 and g(x) = 3x. What is (f + g)(x)?', 'g(x) = x − 5. Where is f/g not defined?', 'Are x and x²/x equal functions? Why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 24', topic: 'Measure a wheel turn by the arc it rolls? Degree and Radian Measures', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('C4', 'hole') - 0.3, 1.05, 960, 560], [T0('C5') - 0.4, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#hG'), t, tMorph + 0.5, 1e9, { dy: 0 });
    const tc = [tMorph + 0.3, wt('H2', 'tea'), wt('H2', 'samosas'), wt('H4', 'thirty')];
    for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) M.vis($(`#hc${r}${i}`), t, tc[i] + r * 0.1, 1e9, { dy: 10, fade: 0.12 });
    PUC.write($('#hF'), t, wt('H4', 'Fifteen') - 0.1, 1.0);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'adds') - 0.1, 1e9, POP);
  }

  /* D: f + g live */
  const dOn = t >= tD1 - 0.1 && t < tO1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('O1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.4, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#dF0'), t, wt('D2', 'sum') - 0.1, 0.8);
    PUC.write($('#dF1'), t, wt('D3', 'squared') - 0.4, 0.5); PUC.write($('#dF2'), t, wt('D3', 'two') - 0.2, 0.5);
    M.draw(dFc, t, wt('D3', 'squared') - 0.2, 0.8); M.draw(dGc, t, wt('D3', 'two'), 0.7);
    M.vis(dLf, t, wt('D3', 'squared'), 1e9, { dy: 0 }); M.vis(dLg, t, wt('D3', 'two') + 0.3, 1e9, { dy: 0 });
    const live = t >= dK[0][0], xv = pw(t, dK), a = ff(xv), b = gg(xv), run = live && t < T1('D5') - 0.4;
    [dBf, dBg, dDot, dXd].forEach(e => M.hide(e, !run));
    setL(dBf, DG.X(xv), DG.Y(0), DG.X(xv), DG.Y(a)); setL(dBg, DG.X(xv), DG.Y(a), DG.X(xv), DG.Y(a + b)); setXY(dDot, DG.X(xv), DG.Y(a + b)); setXY(dXd, DG.X(xv), DG.Y(0));
    attr(dS, 'd', live ? DG.pathD(v => ff(v) + gg(v), -3.2, xv) : ''); M.hide(dS, !live);
    if (t >= T0('D5')) attr(dS, 'd', DG.pathD(v => ff(v) + gg(v), -3.4, 2.4));
    M.vis(dLs, t, T0('D5'), 1e9, { dy: 0 });
    const key = run ? xv.toFixed(1) : 'x'; if (key !== dLast) { dLast = key; $('#dRd').innerHTML = run ? `<span style="color:${XC}">x = ${f1(xv)}</span>&nbsp; <span style="color:${FC}">${f1(a)}</span> + <span style="color:${GC}">${f1(b)}</span> = <span style="color:${RC}">${f1(a + b)}</span>` : ''; }
    M.vis($('#dRd'), t, dK[0][0], T1('D5') - 0.4, { dy: 10 });
    PUC.write($('#dF3'), t, wt('D5', 'result') - 0.1, 1.2);
    M.vis($('#dP'), t, wt('D5', 'same') - 0.1, 1e9, POP);
  }

  /* O: five operations */
  const oOn = t >= tO1 - 0.1 && t < tK1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('K1');
    M.vis($('#ol'), t, tO1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#or'), t, tO1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#oA'), t, tO1 + 0.6, 1e9, POP); M.vis($('#oB'), t, tO1 + 0.75, 1e9, POP);
    OS.forEach((_, i) => { const el = $('#os' + i); M.vis(el.querySelector('.n'), t, tOs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tOs[i], 0.8); M.vis(el.querySelector('.nm'), t, tOs[i] - 0.1, 1e9, { dy: 0 }); M.vis($('#ov' + i), t, tOs[i] + 0.9, 1e9, { dx: -16, dy: 0 }); });
    const hy = M.track(92, tOs.slice(1).map((tt, i) => [tt - 0.1, 92 + (i + 1) * 90]), M.SOFT)(t);
    const hb = $('#oHi'); M.vis(hb, t, tOs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
  }

  /* K: product vs quotient + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kq'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#kF0'), t, wt('K1', 'product'), 0.6); PUC.write($('#kF1'), t, wt('K2', 'quotient'), 0.6);
    M.draw(kG[0].c, t, wt('K1', 'works') - 0.2, 0.9); M.vis(kG[0].band, t, wt('K1', 'every'), 1e9, { dy: 0, fade: 0.3 }); M.vis($('#kP0'), t, wt('K1', 'both') - 0.1, 1e9, POP);
    M.draw(kG[1].c, t, wt('K2', 'check') - 0.2, 0.9); M.vis(kG[1].band, t, wt('K2', 'check'), 1e9, { dy: 0, fade: 0.3 });
    M.vis(kG[1].asy, t, wt('K2', 'half') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(kG[1].hole, t, wt('K2', 'zero') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.vis(kG[1].lab, t, wt('K2', 'zero'), 1e9, { dy: 0 });
    M.vis($('#kP1'), t, wt('K2', 'breaks') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, T0('K3') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: T0('K3'), tOpts: wt('K3', 'defined') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'three') });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Combine') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'quotient') - 0.2, 0.8);
  }

  /* C: equal functions + think */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    M.vis($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); M.vis($('#cG'), t, wt('C1', 'beyond') - 0.1, 1e9, POP);
    M.vis($('#ct0'), t, wt('C2', 'domain') - 0.2, 1e9, { dx: -16, dy: 0 }); M.vis($('#ct1'), t, wt('C2', 'output') - 0.2, 1e9, { dx: -16, dy: 0 });
    PUC.write($('#cF0'), t, wt('C3', 'Compare') + 0.1, 0.5); PUC.write($('#cF1'), t, wt('C3', 'squared') - 0.1, 0.7);
    M.vis($('#cr'), t, T0('C2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(cF, t, wt('C3', 'Compare') + 0.3, 0.7); M.draw(cGl, t, wt('C3', 'squared') + 0.2, 0.7);
    M.vis(cLf, t, wt('C3', 'Compare') + 0.6, 1e9, { dy: 0 }); M.vis(cLg, t, wt('C3', 'squared') + 0.6, 1e9, { dy: 0 });
    M.vis(cH, t, wt('C4', 'hole') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.vis(cRing, t, wt('C4', 'hole'), 1e9, { dy: 0, sc: 0.4, sp: M.POP }); M.vis(cHl, t, wt('C4', 'hole') + 0.2, 1e9, { dy: 0 });
    M.vis($('#cP'), t, wt('C4', 'not', 1) - 0.1, 1e9, POP);
    M.vis($('#th2'), t, T0('C5') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('C5'), tOpts: wt('C5', 'equal') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'Both') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(wF, t, wt('W2', 'root') - 0.1, 0.8); M.draw(wG, t, wt('W2', 'be', 1), 0.7);
    M.vis(wLf, t, wt('W2', 'root') + 0.5, 1e9, { dy: 0 }); M.vis(wLg, t, wt('W2', 'be', 1) + 0.5, 1e9, { dy: 0 });
    M.draw(wQ, t, tW[2] + 0.2, 0.9); M.vis(wLq, t, tW[2] + 0.8, 1e9, { dy: 0 });
    M.vis(wH, t, tW[3] + 0.2, 1e9, { ...POP, sc: 0.3 }); M.vis(wHl, t, tW[3] + 0.4, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'both') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    M.vis(tA, t, wt('X3', 'Root') - 0.1, 1e9, { dx: 20, dy: 0, fade: 0.15 }); M.vis(tB, t, wt('X3', 'Root', 1) - 0.1, 1e9, { dx: -20, dy: 0, fade: 0.15 });
    M.draw(tO, t, wt('X3', 'So') - 0.1, 0.5); tOd.forEach(c => M.vis(c, t, wt('X3', 'So'), 1e9, { ...POP, sc: 0.3 }));
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'domain'), tCount, tAns });
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
