// PUC Maths Ep 22: Graphs of standard functions (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): input x violet, output y / the curve coral (accent), wrong red, right green; earlier curves dim
const XC = C.violet, RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const X = xc('x'), Y = rc('y');
const mn = s => String(s).replace(/-/g, '−');
const pw = (t, keys) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; if (t < b) return va + (vb - va) * M.clamp((t - a) / Math.max(1e-3, b - a)); } return keys[keys.length - 1][1]; };
let clipN = 0;
// axes through the origin, ticks, and a clipped layer for curves
const plot = (svg, o) => {
  const Xf = v => o.x + (v - o.xmin) / (o.xmax - o.xmin) * o.w, Yf = v => o.y + o.h - (v - o.ymin) / (o.ymax - o.ymin) * o.h;
  const g = mk(svg, 'g', {}), sw = o.sw ?? 2.5, fs = o.fs ?? 18;
  if (o.grid) { for (let v = Math.ceil(o.xmin); v <= o.xmax; v++) mk(g, 'line', { x1: Xf(v), y1: o.y, x2: Xf(v), y2: o.y + o.h, stroke: C.line, 'stroke-width': 1 }); }
  mk(g, 'line', { x1: o.x, y1: Yf(0), x2: o.x + o.w, y2: Yf(0), stroke: C.ink, 'stroke-width': sw });
  mk(g, 'line', { x1: Xf(0), y1: o.y + o.h, x2: Xf(0), y2: o.y, stroke: C.ink, 'stroke-width': sw });
  if (!o.bare) { mk(g, 'path', { d: `M${o.x + o.w + 6},${Yf(0)} l-14,-7 v14 z`, fill: C.ink }); mk(g, 'path', { d: `M${Xf(0)},${o.y - 6} l-7,14 h14 z`, fill: C.ink }); }
  (o.xt || []).forEach(v => { if (!v) return; mk(g, 'line', { x1: Xf(v), y1: Yf(0) - 6, x2: Xf(v), y2: Yf(0) + 6, stroke: C.ink, 'stroke-width': 2 }); txt(g, Xf(v), Yf(0) + 28, mn(v), { 'text-anchor': 'middle', 'font-size': fs, fill: C.ink2, 'font-weight': 600 }); });
  (o.yt || []).forEach(v => { if (!v) return; mk(g, 'line', { x1: Xf(0) - 6, y1: Yf(v), x2: Xf(0) + 6, y2: Yf(v), stroke: C.ink, 'stroke-width': 2 }); txt(g, Xf(0) - 12, Yf(v) + 6, mn(v), { 'text-anchor': 'end', 'font-size': fs, fill: C.ink2, 'font-weight': 600 }); });
  if (!o.bare) { txt(g, o.x + o.w - 4, Yf(0) - 14, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: XC, 'font-weight': 600 });
    txt(g, Xf(0) + 14, o.y + 14, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: RC, 'font-weight': 600 }); }
  const id = 'qc' + (++clipN); const cp = mk(mk(svg, 'defs', {}), 'clipPath', { id }); mk(cp, 'rect', { x: o.x, y: o.y, width: o.w, height: o.h });
  const cg = mk(svg, 'g', { 'clip-path': `url(#${id})` });
  // path of fn over [a, b]; breaks where the curve leaves the sheet far (asymptotes)
  const pathD = (fn, a, b, n = 120) => { let d = '', pen = false; for (let i = 0; i <= n; i++) { const xv = a + (b - a) * i / n, yv = fn(xv); if (!isFinite(yv) || Math.abs(yv) > 1e3) { pen = false; continue; } const yy = Math.max(-5e3, Math.min(5e3, Yf(yv))); d += (pen ? 'L' : 'M') + Xf(xv).toFixed(1) + ',' + yy.toFixed(1); pen = true; } return d; };
  const curve = (col = RC, w = 5, a = {}) => mk(cg, 'path', Object.assign({ d: '', fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, a));
  return { X: Xf, Y: Yf, g, cg, pathD, curve };
};
const dotC = (p, x, y, r = 9, col = RC) => mk(p, 'circle', { cx: x, cy: y, r, fill: col });
const dotO = (p, x, y, r = 9, col = RC) => mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: col, 'stroke-width': 3.5 });

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tI1 = T0('I1'), tL1 = T0('L1'), tC1 = T0('C1'), tT = T0('T1'), tR1 = T0('R1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['RULE · y = x', 'A slanted line'], ['RULE · y = x²', 'A U shape'], ['RULE · y = 1/x', 'Two curves']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Six') - 0.05, wt('H1', 'Six', 1) - 0.05, wt('H1', 'shapes') - 0.1];

/* ---------- H: six mini graphs ---------- */
const MF = [v => v, v => 1.2, v => v * v, v => v * v * v, v => Math.abs(v), v => 1 / v];
const hW = ['slanted', 'flat', 'U', 'S', 'V', 'two'];
$('#hm').innerHTML = MF.map((_, i) => `<div class="mini" id="mi${i}" style="left:${36 + (i % 3) * 248}px;top:${84 + Math.floor(i / 3) * 224}px"><svg width="224" height="200" class="sv"></svg></div>`).join('');
const minis = MF.map((f, i) => { const sv = $(`#mi${i} svg`), P = plot(sv, { x: 14, y: 14, w: 196, h: 172, xmin: -2.2, xmax: 2.2, ymin: -2.2, ymax: 2.2, bare: true, sw: 1.5 });
  const p = P.curve(RC, 4.5); attr(p, 'd', i === 5 ? P.pathD(f, -2.2, -0.02, 80) + P.pathD(f, 0.02, 2.2, 80) : P.pathD(f, -2.2, 2.2, 80)); return p; });
const tMi = [1, 4, 7, 9, 12, 14].map(i => wt('H2', i));

/* ---------- P: table to graph, y = x^2 ---------- */
$('#pw').innerHTML = ['Pick x', 'Find y', 'Plot', 'Join'].map((s, i) => `<div class="hw" id="pw${i}" style="left:${36 + i * 176}px"><i>${i + 1}</i>${s}</div>`).join('');
const PX = [-3, -2, -1, 0, 1, 2, 3];
$('#ptb').innerHTML = `<div class="th" style="top:0">${K(X)}</div><div class="th" style="top:84px">${K(`${Y} = ${X}^2`)}</div>` +
  PX.map((v, i) => `<div class="tc" id="pxc${i}" style="left:${126 + i * 84}px;top:0;color:${XC}">${mn(v)}</div><div class="tc" id="pyc${i}" style="left:${126 + i * 84}px;top:84px;color:${RC}">${v * v}</div>`).join('');
$('#ptb').querySelectorAll('.th').forEach(e => e.style.fontSize = '30px');
$('#pF').innerHTML = K(`${Y} = ${X}^2`);
const ps = $('#pS'), PG = plot(ps, { x: 70, y: 70, w: 650, h: 470, xmin: -3.6, xmax: 3.6, ymin: -0.8, ymax: 10, xt: [-3, -2, -1, 1, 2, 3], yt: [1, 4, 9], grid: false });
const pCurve = PG.curve(RC, 5); attr(pCurve, 'd', PG.pathD(v => v * v, -3.15, 3.15));
const pPts = PX.map(v => dotC(ps, PG.X(v), PG.Y(v * v), 10, RC));
const pTr = mk(ps, 'circle', { r: 13, fill: '#fff', stroke: RC, 'stroke-width': 5, cx: -99, cy: -99 }), pXd = mk(ps, 'circle', { r: 10, fill: XC, cx: -99, cy: -99 });
const pV = mk(ps, 'line', { stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }), pH = mk(ps, 'line', { stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const pLab = txt(ps, PG.X(1.75), PG.Y(6.4), 'parabola', { 'font-family': 'Poppins', 'font-size': 26, fill: RC, 'font-weight': 700 });
const tPx = [wt('P4', 'Minus'), wt('P4', 'Minus', 1), wt('P4', 'Minus', 2), wt('P4', 'Zero'), wt('P5', 'one'), wt('P5', 'four'), wt('P5', 'nine')];
const pK = tPx.map((tt, i) => [tt, PX[i]]); pK.unshift([T0('P3') + 0.6, -3]);
let pLast = null;

/* ---------- I: identity + constant ---------- */
$('#iF0').innerHTML = K(`${Y} = ${X}`); $('#iF1').innerHTML = K(`${Y} = 3`);
const iG = [0, 1].map(k => { const sv = $('#iS' + k), P = plot(sv, { x: 70, y: 150, w: 644, h: 390, xmin: -4, xmax: 4, ymin: -4, ymax: 4.6, xt: [-3, -2, -1, 1, 2, 3], yt: [-3, -2, -1, 1, 2, 3] });
  const c = P.curve(RC, 5); attr(c, 'd', P.pathD(k ? () => 3 : v => v, -3.9, 3.9));
  const pts = (k ? [[-2, 3], [1, 3]] : [[2, 2], [-1, -1]]).map(([a, b]) => { const g = mk(mk(sv, 'g', {}), 'g', {}); dotC(g, P.X(a), P.Y(b), 10); txt(g, P.X(a) + (k ? 0 : 16), P.Y(b) + (k ? -22 : 26), `(${mn(a)}, ${mn(b)})`, { 'text-anchor': k ? 'middle' : 'start', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }); return g; });
  return { c, pts }; });

/* ---------- L: y = x^n morph ---------- */
$('#lF').innerHTML = K(`${Y} = ${X}^{\\,n}`);
const LR = [['n = 1', 'Straight line'], ['n = 2', 'U · never negative'], ['n = 3', 'S bend · keeps the sign']];
$('#lR').innerHTML = LR.map(([a, b], i) => `<div class="sr" id="lr${i}" style="top:${190 + i * 100}px"><div class="o">${a}</div><div class="c">${b}</div></div>`).join('');
const ls = $('#lS'), LG = plot(ls, { x: 70, y: 140, w: 644, h: 400, xmin: -2.5, xmax: 2.5, ymin: -9, ymax: 9, xt: [-2, -1, 1, 2], yt: [-8, -4, 4, 8] });
const lCurve = LG.curve(RC, 5);
const lDot = mk(ls, 'circle', { r: 12, fill: '#fff', stroke: RC, 'stroke-width': 5 }), lXd = dotC(ls, LG.X(-2), LG.Y(0), 10, XC), lVl = mk(ls, 'line', { stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const tL3 = wt('L3', 'bends'), tL4 = wt('L4', 'flips');
const nOf = t => 1 + M.io((t - tL3 + 0.3) / 1.4) + M.io((t - tL4 + 0.3) / 1.4);
const powB = (v, n) => { const k = Math.min(2, Math.floor(n)), u = n - k; return (1 - u) * Math.pow(v, k) + u * Math.pow(v, k + 1); };
let lLast = null;

/* ---------- C: x^2 vs x^3 ---------- */
$('#cF0').innerHTML = K(`${Y} = ${X}^2`); $('#cF1').innerHTML = K(`${Y} = ${X}^3`);
const cG = [[v => v * v, -1, 5.2, [-2, 2], [4, 4], [1, 2, 3, 4]], [v => v * v * v, -9.5, 9.5, [-2, 2], [-8, 8], [-8, -4, 4, 8]]].map(([f, y0, y1, xs, ys, yt], k) => {
  const sv = $('#cS' + k), P = plot(sv, { x: 70, y: 140, w: 644, h: 340, xmin: -2.6, xmax: 2.6, ymin: y0, ymax: y1, xt: [-2, -1, 1, 2], yt });
  const c = P.curve(RC, 5); attr(c, 'd', P.pathD(f, -2.6, 2.6));
  const band = mk(sv, 'line', { x1: P.X(0), y1: P.Y(k ? y0 : 0), x2: P.X(0), y2: P.Y(y1), stroke: RC, 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.3 });
  const pts = xs.map((a, i) => { const g = mk(mk(sv, 'g', {}), 'g', {}); dotC(g, P.X(a), P.Y(ys[i]), 10); txt(g, P.X(a) + (a < 0 ? 16 : -16), P.Y(ys[i]) + (k ? 6 : -16), `(${mn(a)}, ${mn(ys[i])})`, { 'text-anchor': a < 0 ? 'start' : 'end', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }); return g; });
  const mir = k ? null : mk(sv, 'line', { x1: P.X(-2), y1: P.Y(4), x2: P.X(2), y2: P.Y(4), stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  return { c, band, pts, mir }; });
const th1 = PUC.think($('#th1'), { q: 'Can x² ever equal −4?', opts: ['Yes', 'No'], right: 1, why: 'A square is never negative: range of x² is [0, ∞). The range of x³ is every real number.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{domain} \\to ${xc('x\\text{-axis}')} \\qquad \\text{range} \\to ${rc('y\\text{-axis}')}`);

/* ---------- R: read the shadows (1/x and |x|) ---------- */
// a scan line sweeps; the shadow band paints only where the curve casts one
const band = (svg, col, vert) => mk(svg, 'line', { stroke: col, 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.35 });
const shadowSet = (svg, P, o) => {
  const sx = mk(svg, 'line', { stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' }), sy = mk(svg, 'line', { stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' });
  const bx = o.xs.map(() => band(svg, XC)), by = o.ys.map(() => band(svg, RC));
  const hole = o.hole ? [dotO(svg, P.X(0), P.Y(0), 10, XC), dotO(svg, P.X(0), P.Y(0), 10, RC)] : null;
  return (t, txA, txB, tyA, tyB) => {
    const ux = M.clamp((t - txA) / (txB - txA)), uy = M.clamp((t - tyA) / (tyB - tyA));
    const xs = o.x0 + (o.x1 - o.x0) * ux, ys = o.y1 + (o.y0 - o.y1) * uy;
    M.hide(sx, ux <= 0 || ux >= 1); setL(sx, P.X(xs), P.Y(o.y0), P.X(xs), P.Y(o.y1));
    M.hide(sy, uy <= 0 || uy >= 1); setL(sy, P.X(o.x0), P.Y(ys), P.X(o.x1), P.Y(ys));
    o.xs.forEach(([a, b], i) => { const e = Math.min(b, xs); M.hide(bx[i], ux <= 0 || e <= a); setL(bx[i], P.X(a), P.Y(0), P.X(e), P.Y(0)); });
    o.ys.forEach(([a, b], i) => { const e = Math.max(a, ys); M.hide(by[i], uy <= 0 || e >= b); setL(by[i], P.X(0), P.Y(b), P.X(0), P.Y(e)); });
    if (hole) { M.hide(hole[0], ux < 0.5); M.hide(hole[1], uy < 0.5); }
  };
};
const rs = $('#rS'), RG = plot(rs, { x: 70, y: 84, w: 644, h: 380, xmin: -4.4, xmax: 4.4, ymin: -4.4, ymax: 4.4, xt: [-4, -2, 2, 4], yt: [-4, -2, 2, 4] });
const rC = RG.curve(RC, 5); attr(rC, 'd', RG.pathD(v => 1 / v, -4.4, -0.2, 140) + RG.pathD(v => 1 / v, 0.2, 4.4, 140));
const rSh = shadowSet(rs, RG, { x0: -4.3, x1: 4.3, y0: -4.3, y1: 4.3, xs: [[-4.3, -0.18], [0.18, 4.3]], ys: [[-4.3, -0.18], [0.18, 4.3]], hole: true });
const vs = $('#vS'), VG = plot(vs, { x: 70, y: 84, w: 644, h: 380, xmin: -4.4, xmax: 4.4, ymin: -1.2, ymax: 4.4, xt: [-4, -2, 2, 4], yt: [2, 4] });
const vC = VG.curve(RC, 5); attr(vC, 'd', VG.pathD(Math.abs, -4.4, 4.4, 4));
const vSh = shadowSet(vs, VG, { x0: -4.3, x1: 4.3, y0: -1.1, y1: 4.3, xs: [[-4.3, 4.3]], ys: [[0, 4.3]] });
$('#rD').innerHTML = 'Domain&nbsp;' + K('\\mathbb{R} - \\{0\\}'); $('#rR').innerHTML = 'Range&nbsp;' + K('\\mathbb{R} - \\{0\\}');
$('#vD').innerHTML = 'Domain&nbsp;' + K('\\mathbb{R}'); $('#vRg').innerHTML = 'Range&nbsp;' + K('[0, \\infty)');

/* ---------- U: the U vs the V ---------- */
const uG = [v => v * v, Math.abs].map((f, k) => { const sv = $('#uS' + k), P = plot(sv, { x: 70, y: 84, w: 644, h: 390, xmin: -2.4, xmax: 2.4, ymin: -0.6, ymax: 3.4, xt: [-2, -1, 1, 2], yt: [1, 2, 3] });
  const c = P.curve(RC, 5); attr(c, 'd', P.pathD(f, -2.4, 2.4, k ? 4 : 120));
  const ring = mk(sv, 'circle', { cx: P.X(0), cy: P.Y(0), r: 40, fill: 'none', stroke: k ? RC : C.ink2, 'stroke-width': 3.5 });
  const lab = txt(sv, P.X(0) + 52, P.Y(0) - 18, k ? 'corner' : 'round', { 'font-family': 'Poppins', 'font-size': 22, fill: k ? RC : C.ink2, 'font-weight': 700 });
  return { c, ring, lab }; });
const th2 = PUC.think($('#th2'), { q: 'Through (0, 0), never below the x axis, with a sharp corner. Which is it?', opts: ['y = x²', 'y = |x|'], right: 1, why: 'y = |x|: the sharp corner gives it away. The graph of x² is smooth and round at the bottom.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Where do ${K(`${Y} = ${X}^2`)} and ${K(`${Y} = |${X}|`)} meet?`;
const wsol = PUC.solution($('#wl'), [
  [K(`${X} \\ge 0:\\ ${X}^2 = ${X} \\;\\Rightarrow\\; ${X} = 0,\\ 1`)],
  [K(`${X} < 0:\\ ${X}^2 = -${X} \\;\\Rightarrow\\; ${X} = -1`)],
  [K(`(-1, 1),\\ (0, 0),\\ (1, 1)`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'meeting')];
const wsv = $('#wS'), WG = plot(wsv, { x: 70, y: 80, w: 644, h: 390, xmin: -2.2, xmax: 2.2, ymin: -0.6, ymax: 3.4, xt: [-2, -1, 1, 2], yt: [1, 2, 3] });
const wU = WG.curve(RC, 5), wV = WG.curve(C.teal, 5); attr(wU, 'd', WG.pathD(v => v * v, -2.2, 2.2)); attr(wV, 'd', WG.pathD(Math.abs, -2.2, 2.2, 4));
const wLu = txt(wsv, WG.X(-1.75), WG.Y(3.05), 'y = x²', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, fill: RC, 'font-weight': 700 });
const wLv = txt(wsv, WG.X(2.1), WG.Y(1.6), 'y = |x|', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, fill: C.teal, 'font-weight': 700 });
const wPts = [[-1, 1], [0, 0], [1, 1]].map(([a, b]) => { const g = mk(mk(wsv, 'g', {}), 'g', {}); mk(g, 'circle', { cx: WG.X(a), cy: WG.Y(b), r: 13, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); return g; });
const tWp = [wt('W4', 'one', 0), wt('W3', 'zero', 1), wt('W3', 'one', 1)];

/* ---------- X / Q / F: exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`-1 \\le ${X} \\le 2 \\;\\Rightarrow\\; ${X}^2 \\in [1,\\ 4]`), right: K(`${X}^2 \\in [${rc('0')},\\ 4]`) + '&nbsp; the U dips to 0 at x = 0' });
const ts = $('#tS'), TG = plot(ts, { x: 70, y: 40, w: 420, h: 200, xmin: -1.6, xmax: 2.6, ymin: -0.5, ymax: 4.6, xt: [-1, 1, 2], yt: [4], bare: true, fs: 16 });
const tAll = TG.curve(C.dim, 3); attr(tAll, 'd', TG.pathD(v => v * v, -1.6, 2.15));
const tSeg = TG.curve(RC, 5); attr(tSeg, 'd', TG.pathD(v => v * v, -1, 2));
const tMin = dotC(ts, TG.X(0), TG.Y(0), 9, C.ok), tBand = mk(ts, 'line', { x1: TG.X(0) - 0, y1: TG.Y(0), x2: TG.X(0), y2: TG.Y(4), stroke: C.ok, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.35 });
const tMinL = txt(ts, TG.X(0.65), TG.Y(1.7), 'lowest: 0', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Count the solutions of an equation like x² − |x| − 12 = 0.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`y = x^3 \\quad \\text{and} \\quad y = |x|`)}<br>How many points do the two graphs share?`,
  opts: ['1', '2', '3', '4'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`x \\ge 0:\\ x^3 = x`)], [K(`\\Rightarrow x = 0 \\text{ or } x = 1`)], [K(`x < 0:\\ x^3 = -x \\Rightarrow x^2 = -1`)], ['impossible: no point on the left'], [K(`(0, 0),\\ (1, 1) \\;\\Rightarrow\\; 2`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'For'), wt('A2', 'So'), wt('A3', 'For'), wt('A3', 'impossible'), wt('A4', 'only')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · six standard graphs', y0: 96, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Any graph</b>: make a table, plot the points, join them',
    K(`${Y} = ${X}\\ \\text{line} \\quad ${Y} = c\\ \\text{flat} \\quad ${Y} = ${X}^2\\ \\text{U, range } [0, \\infty)`),
    K(`${Y} = ${X}^3\\ \\text{S bend, range } \\mathbb{R} \\qquad ${Y} = |${X}|\\ \\text{V, range } [0, \\infty)`),
    K(`${Y} = \\tfrac{1}{${X}}:\\ \\text{domain and range } \\mathbb{R} - \\{0\\}`),
    '<b>Domain</b> along the x axis · <b>range</b> up the y axis'] });
const YQ = ['Which of the six graphs never touches either axis?', 'What is the range of x² for x from −2 to 1?', 'Where does y = x meet y = 1/x?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 23', topic: 'Can a canteen bill add two rules? Combining functions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('U2', 'sharp') - 0.3, 1.05, 960, 560], [T0('U3') - 0.4, 1, 960, 540]]);
const setXY = (el, x, y) => { attr(el, 'cx', x.toFixed(1)); attr(el, 'cy', y.toFixed(1)); };
const setL = (el, x1, y1, x2, y2) => { attr(el, 'x1', x1.toFixed(1)); attr(el, 'y1', y1.toFixed(1)); attr(el, 'x2', x2.toFixed(1)); attr(el, 'y2', y2.toFixed(1)); };

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
    minis.forEach((p, i) => { M.vis($('#mi' + i), t, tMorph + 0.3 + i * 0.06, 1e9, { dy: 14 }); M.draw(p, t, tMi[i] - 0.1, 0.7); });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'which') - 0.1, 1e9, POP);
  }

  /* P: table to graph */
  const pOn = t >= tP1 - 0.1 && t < tI1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('I1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [wt('P2', 'Pick'), wt('P2', 'find'), wt('P2', 'Plot'), wt('P2', 'join')].forEach((tt, i) => M.vis($('#pw' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#ptb'), t, wt('P2', 'Pick') + 0.2, 1e9, { dy: 14 });
    PX.forEach((_, i) => { M.vis($('#pxc' + i), t, wt('P2', 'Pick') + 0.3 + i * 0.05, 1e9, { dy: 8, fade: 0.1 }); M.vis($('#pyc' + i), t, tPx[i] + 0.15, 1e9, { ...POP, sc: 0.5 }); });
    PUC.write($('#pF'), t, wt('P3', 'equals') - 0.1, 0.6);
    M.vis($('#pr'), t, T0('P2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const live = t >= pK[0][0], xv = pw(t, pK), yv = xv * xv, run = live && t < tPx[6] + 0.6;
    M.hide(pTr, !run); M.hide(pXd, !run); M.hide(pV, !run); M.hide(pH, !run);
    setXY(pTr, PG.X(xv), PG.Y(yv)); setXY(pXd, PG.X(xv), PG.Y(0)); setL(pV, PG.X(xv), PG.Y(0), PG.X(xv), PG.Y(yv)); setL(pH, PG.X(0), PG.Y(yv), PG.X(xv), PG.Y(yv));
    pPts.forEach((p, i) => M.vis(p, t, tPx[i] + 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    const key = live ? `${(Math.abs(xv) < 0.005 ? 0 : xv).toFixed(1)}|${yv.toFixed(1)}` : ''; if (key !== pLast) { pLast = key; $('#pRd').innerHTML = `<span style="color:${XC}">x = ${mn((Math.abs(xv) < 0.005 ? 0 : xv).toFixed(1))}</span> <span style="color:var(--mute)">→</span> <span style="color:${RC}">y = ${yv.toFixed(1)}</span>`; }
    M.vis($('#pRd'), t, pK[0][0], 1e9, { dy: 10 });
    M.draw(pCurve, t, wt('P5', 'Join'), 1.1);
    M.vis(pLab, t, wt('P5', 'parabola') - 0.1, 1e9, { dy: 0 });
  }

  /* I: identity + constant */
  const iOn = t >= tI1 - 0.1 && t < tL1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('L1');
    M.vis($('#il'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ir'), t, T0('I3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#iF0'), t, wt('I2', 'equals') - 0.1, 0.5); PUC.write($('#iF1'), t, wt('I3', 'equals') - 0.1, 0.5);
    M.draw(iG[0].c, t, wt('I2', 'straight') - 0.2, 0.9); M.draw(iG[1].c, t, wt('I3', 'flat') - 0.2, 0.9);
    iG[0].pts.forEach((g, i) => M.vis(g, t, wt('I2', 'gives') + i * 0.3, 1e9, { dy: 0, fade: 0.12 }));
    iG[1].pts.forEach((g, i) => M.vis(g, t, wt('I3', 'same') + i * 0.3, 1e9, { dy: 0, fade: 0.12 }));
  }

  /* L: x^n morph */
  const lOn = t >= tL1 - 0.1 && t < tC1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('C1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#lF'), t, wt('L1', 'equals') - 0.1, 0.6);
    const n = nOf(t), ni = Math.round(n);
    LR.forEach((_, i) => { const el = $('#lr' + i); M.vis(el, t, [T0('L2'), tL3, tL4][i] - 0.1, 1e9, { dx: -16, dy: 0 }); el.style.background = ni === i + 1 && t >= T0('L2') - 0.1 ? C.ac2 : C.soft; });
    attr(lCurve, 'd', LG.pathD(v => powB(v, n), -2.5, 2.5)); M.vis(lCurve, t, T0('L2') - 0.2, 1e9, { dy: 0, fade: 0.3 });
    const y2 = powB(-2, n); setXY(lDot, LG.X(-2), LG.Y(y2)); setL(lVl, LG.X(-2), LG.Y(0), LG.X(-2), LG.Y(y2));
    [lDot, lXd, lVl].forEach(e => M.vis(e, t, T0('L2') + 0.3, 1e9, { dy: 0, fade: 0.2 }));
    const key = ni + '|' + y2.toFixed(1); if (key !== lLast) { lLast = key; $('#lN').innerHTML = `<i style="font-family:Poppins">n</i> = ${ni}`; $('#lV').innerHTML = `x = −2 <span style="color:var(--mute)">→</span> <span style="color:${RC}">y = ${mn(y2.toFixed(Math.abs(y2 - Math.round(y2)) < 0.05 ? 0 : 1))}</span>`; }
    M.vis($('#lN'), t, T0('L2') - 0.1, 1e9, { dy: 10 }); M.vis($('#lV'), t, T0('L2') + 0.3, 1e9, { dy: 10 });
  }

  /* C: x^2 vs x^3 + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cr'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#cF0'), t, tC1 + 0.3, 0.5); PUC.write($('#cF1'), t, T0('C2') + 0.2, 0.5);
    M.draw(cG[0].c, t, tC1 + 0.4, 0.9); M.draw(cG[1].c, t, T0('C2') + 0.3, 0.9);
    cG[0].pts.forEach((g, i) => M.vis(g, t, wt('C1', 'two', i) - 0.05, 1e9, { dy: 0, fade: 0.12 }));
    M.draw(cG[0].mir, t, wt('C1', 'mirror') - 0.1, 0.6);
    M.vis(cG[0].band, t, wt('C1', 'never') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis($('#cP0'), t, wt('C1', 'never') - 0.1, 1e9, POP);
    cG[1].pts.forEach((g, i) => M.vis(g, t, wt('C2', 'eight') + i * 0.4, 1e9, { dy: 0, fade: 0.12 }));
    M.vis(cG[1].band, t, wt('C2', 'climbs') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis($('#cP1'), t, wt('C2', 'climbs') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, T0('C3') + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: T0('C3'), tOpts: wt('C3', 'minus') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'square') });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'domain') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'range') - 0.2, 0.8);
  }

  /* R: shadows */
  const rOn = t >= tR1 - 0.1 && t < T0('U1') + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('U1');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o }); M.vis($('#rr'), t, wt('R1', 'mod') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(rC, t, tR1 + 0.6, 1.0); M.draw(vC, t, wt('R1', 'mod') + 0.1, 0.8);
    rSh(t, wt('R2', 'Shine'), wt('R2', 'except') + 0.3, wt('R3', 'across'), wt('R3', 'zero') + 0.3);
    vSh(t, wt('R4', 'shadow'), wt('R4', 'axis') + 0.2, wt('R4', 'starts') - 0.4, wt('R4', 'goes') + 0.4);
    M.vis($('#rD'), t, wt('R2', 'domain') - 0.1, 1e9, POP); M.vis($('#rR'), t, wt('R3', 'range') - 0.1, 1e9, POP);
    M.vis($('#vD'), t, wt('R4', 'axis') + 0.2, 1e9, POP); M.vis($('#vRg'), t, wt('R4', 'goes'), 1e9, POP);
  }

  /* U: U vs V + think */
  const uOn = t >= T0('U1') - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U3');
    M.vis($('#ul'), t, T0('U1') + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ur'), t, wt('U1', 'V') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(uG[0].c, t, wt('U1', 'U') , 0.9); M.draw(uG[1].c, t, wt('U1', 'V') + 0.1, 0.9);
    uG.forEach((g, k) => { const tt = k ? wt('U2', 'sharp') : wt('U2', 'smooth'); M.vis(g.ring, t, tt - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP }); M.vis(g.lab, t, tt, 1e9, { dy: 0 }); });
    M.vis($('#uP1'), t, wt('U2', 'straight') - 0.1, 1e9, POP); M.vis($('#uP0'), t, wt('U2', 'round') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, T0('U3') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('U3'), tOpts: wt('U3', 'Which') - 0.1, tCount: T1('U3') + 0.05, dur: 3, tAns: T0('U4') - 0.02, tWhy: wt('U4', 'sharp') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wU, t, wt('W2', 'squared') - 0.1, 0.9); M.draw(wV, t, wt('W2', 'mod'), 0.9);
    M.vis(wLu, t, wt('W2', 'squared') + 0.4, 1e9, { dy: 0 }); M.vis(wLv, t, wt('W2', 'mod') + 0.4, 1e9, { dy: 0 });
    wPts.forEach((g, i) => M.vis(g, t, tWp[i], 1e9, { ...POP, sc: 0.3 }));
    M.vis($('#wP'), t, wt('W6', 'three') - 0.1, 1e9, POP);
  }

  /* X: trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'dips') - 0.1, tRight: wt('X3', 'true') - 0.1 });
    M.vis(TG.g, t, wt('X2', 'range'), 1e9, { dy: 0, fade: 0.2 }); M.draw(tAll, t, wt('X2', 'range') + 0.1, 0.6); M.draw(tSeg, t, wt('X2', 'from') - 0.1, 0.7);
    M.vis(tMin, t, wt('X3', 'dips'), 1e9, { ...POP, sc: 0.3 }); M.vis(tMinL, t, wt('X3', 'zero'), 1e9, { dy: 0 });
    M.vis(tBand, t, wt('X3', 'true') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'equations') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'share') - 0.4, tCount, tAns });
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
