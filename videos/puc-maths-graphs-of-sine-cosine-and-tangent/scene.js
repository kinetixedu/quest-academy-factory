// PUC Maths Ep 30: Graphs of sine, cosine and tangent (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 3 colour-coding (bible): cos theta blue, sin theta coral (accent), theta violet, tan theta teal
const CO = '#2F6FEB', SI = C.ac, TH = C.violet, TA = '#0E8F8F', GR = '#8A8F9C';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const itx = (p, x, y, s, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26 }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const co = s => `\\textcolor{${CO}}{${s}}`, si = s => `\\textcolor{${SI}}{${s}}`, th = s => `\\textcolor{${TH}}{${s}}`, ta = s => `\\textcolor{${TA}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const TQ = th('\\theta'), COS = co('\\cos') + '\\,' + TQ, SIN = si('\\sin') + '\\,' + TQ, TAN = ta('\\tan') + '\\,' + TQ;
const PI = Math.PI, D2R = PI / 180, MIN = '\u2212';
const sg = v => (v > 0.004 ? '+' : v < -0.004 ? MIN : ' ') + Math.abs(v).toFixed(2);

/* ---------- unit circle (exactly as docs/series/puc-samples/3-maths-lesson.png) ---------- */
const UC = (svg, o) => {
  const { cx, cy, R, ax = 56, lw = 7, fs = 26, r0 = 44 } = o;
  const g = mk(svg, 'g', {});
  const quad = [0, 1, 2, 3].map(k => { const a0 = k * PI / 2, a1 = (k + 1) * PI / 2; return mk(g, 'path', { d: `M${cx},${cy} L${(cx + R * Math.cos(a0)).toFixed(1)},${(cy - R * Math.sin(a0)).toFixed(1)} A${R},${R} 0 0 0 ${(cx + R * Math.cos(a1)).toFixed(1)},${(cy - R * Math.sin(a1)).toFixed(1)} Z`, fill: C.ac2, 'fill-opacity': 0 }); });
  const xa = mk(g, 'line', { x1: cx - R - ax, y1: cy, x2: cx + R + ax, y2: cy, stroke: C.ink, 'stroke-width': 2 });
  const ya = mk(g, 'line', { x1: cx, y1: cy - R - ax, x2: cx, y2: cy + R + ax, stroke: C.ink, 'stroke-width': 2 });
  const circ = mk(g, 'circle', { cx, cy, r: R, fill: 'none', stroke: GR, 'stroke-width': 2.5 });
  const arc = mk(g, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3 });
  const rad = mk(g, 'line', { stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  const cosL = mk(g, 'line', { stroke: CO, 'stroke-width': lw, 'stroke-linecap': 'round' });
  const sinL = mk(g, 'line', { stroke: SI, 'stroke-width': lw, 'stroke-linecap': 'round' });
  const P = mk(g, 'circle', { r: Math.max(7, lw + 3), fill: C.ink });
  const thT = itx(g, 0, 0, 'θ', { fill: TH, 'font-size': fs, 'text-anchor': 'middle' });
  const cosT = itx(g, 0, 0, 'cos θ', { fill: CO, 'font-size': fs, 'text-anchor': 'middle' });
  const sinT = itx(g, 0, 0, 'sin θ', { fill: SI, 'font-size': fs });
  const pT = txt(g, 0, 0, 'P', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: C.ink, 'text-anchor': 'middle' });
  const u = { g, quad, xa, ya, circ, arc, rad, cosL, sinL, P, thT, cosT, sinT, pT, cx, cy, R };
  u.set = a => {
    const c = Math.cos(a), s = Math.sin(a), px = cx + R * c, py = cy - R * s, f = v => v.toFixed(1);
    attr(rad, 'x1', cx); attr(rad, 'y1', cy); attr(rad, 'x2', f(px)); attr(rad, 'y2', f(py));
    attr(cosL, 'x1', cx); attr(cosL, 'y1', cy); attr(cosL, 'x2', f(px)); attr(cosL, 'y2', cy);
    attr(sinL, 'x1', f(px)); attr(sinL, 'y1', cy); attr(sinL, 'x2', f(px)); attr(sinL, 'y2', f(py));
    attr(P, 'cx', f(px)); attr(P, 'cy', f(py));
    let d = ''; if (Math.abs(a) > 0.02) { const A = Math.max(-2 * PI + 0.01, Math.min(2 * PI - 0.01, a)); d = `M${cx + r0},${cy} A${r0},${r0} 0 ${Math.abs(A) > PI ? 1 : 0} ${A > 0 ? 0 : 1} ${f(cx + r0 * Math.cos(A))},${f(cy - r0 * Math.sin(A))}`; }
    attr(arc, 'd', d);
    const h = Math.max(-2 * PI, Math.min(2 * PI, a)) / 2;
    attr(thT, 'x', f(cx + (r0 + 22) * Math.cos(h))); attr(thT, 'y', f(cy - (r0 + 22) * Math.sin(h) + 9)); attr(thT, 'fill-opacity', M.clamp((Math.abs(a) - 0.3) / 0.2).toFixed(2));
    attr(cosT, 'x', f(cx + R * c / 2)); attr(cosT, 'y', f(cy + (s >= 0 ? fs + 10 : -14))); attr(cosT, 'fill-opacity', M.clamp((Math.abs(c) - 0.32) / 0.12).toFixed(2));
    attr(sinT, 'x', f(px + (c >= 0 ? 14 : -14))); attr(sinT, 'y', f(cy - R * s / 2 + 9)); attr(sinT, 'text-anchor', c >= 0 ? 'start' : 'end'); attr(sinT, 'fill-opacity', M.clamp((Math.abs(s) - 0.25) / 0.12).toFixed(2));
    attr(pT, 'x', f(cx + (R + 28) * c)); attr(pT, 'y', f(cy - (R + 28) * s + 9));
    return { c, s, px, py };
  };
  u.lit = (k, v) => attr(quad[k], 'fill-opacity', M.clamp(v).toFixed(3));
  return u;
};

/* number line: ticks [[v, label]], X(v) maps value to x */
const NL = (svg, y, X, ticks, x0 = 72, x1 = 712) => {
  const g = mk(svg, 'g', {});
  mk(g, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${x1 + 6},${y} l-14,-8 v16 z`, fill: C.ink }); mk(g, 'path', { d: `M${x0 - 6},${y} l14,-8 v16 z`, fill: C.ink });
  ticks.forEach(([v, l]) => { mk(g, 'line', { x1: X(v), y1: y - 9, x2: X(v), y2: y + 9, stroke: C.ink, 'stroke-width': 2 }); txt(g, X(v), y + 36, l, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 }); });
  return g;
};
const PT = [[-2 * PI, '-2π'], [-PI, '-π'], [0, '0'], [PI, 'π'], [2 * PI, '2π']].map(([v, l]) => [v, l.replace('-', MIN)]);
const TX = v => 392 + v * 300 / (2 * PI);   // angle number line, -2pi..2pi -> 92..692
const VX = v => 392 + v * 100;               // value number line, -3..3 -> 92..692
const VT = [-3, -2, -1, 0, 1, 2, 3].map(v => [v, (v < 0 ? MIN : '') + Math.abs(v)]);
const holes = (svg, y, vals) => vals.map(v => mk(svg, 'circle', { cx: TX(v), cy: y, r: 9, fill: '#fff', stroke: C.red, 'stroke-width': 3.5 }));
const ODD = [-3 * PI / 2, -PI / 2, PI / 2, 3 * PI / 2];

/* plot helper: X maps angle a0..a1 to x0..x1, Y maps value (centre yc, k px per unit); path() lifts the pen where |v| > clip */
const GG = (x0, x1, a0, a1, yc, k) => { const g = { X: a => x0 + (x1 - x0) * (a - a0) / (a1 - a0), Y: v => yc - k * v };
  g.path = (fn, s0, s1, n = 120, clip = 1e9) => { let d = '', pen = false; if (s1 <= s0) return ''; for (let i = 0; i <= n; i++) { const a = s0 + (s1 - s0) * i / n, v = fn(a); if (!isFinite(v) || Math.abs(v) > clip) { pen = false; continue; } d += (pen ? 'L' : 'M') + g.X(a).toFixed(1) + ',' + g.Y(v).toFixed(1); pen = true; } return d; };
  return g; };
const PIL = ['0', 'π/2', 'π', '3π/2', '2π'];
const axes = (svg, g, xa, xb, ya, yb, ticks, ty) => { const e = mk(svg, 'g', {}); mk(e, 'line', { x1: xa, y1: g.Y(0), x2: xb, y2: g.Y(0), stroke: C.ink, 'stroke-width': 2 }); mk(e, 'line', { x1: g.X(0), y1: ya, x2: g.X(0), y2: yb, stroke: C.ink, 'stroke-width': 2 });
  ticks.forEach(([a, l]) => { if (a) mk(e, 'line', { x1: g.X(a), y1: g.Y(0) - 7, x2: g.X(a), y2: g.Y(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(e, g.X(a), ty, l, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }); }); return e; };
const Q4 = PIL.map((l, k) => [k * PI / 2, l]);
const tan = a => Math.abs(Math.cos(a)) < 1e-9 ? Infinity : Math.tan(a);

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tD1 = T0('D1'), tC1 = T0('C1'), tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tT = T0('T1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['y = sin x · SHAPE', SI], ['y = cos x · SHAPE', CO], ['y = tan x · SHAPE', TA]];
$('#lists').innerHTML = LS.map(([n, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">?</div></div>`).join('');
const tLs = i => wt('H1', 'pen') - 0.1 + i * 0.22;

/* ---------- H: the pen on the valve, paper sliding ---------- */
const hs = $('#hS'), HX = 220, HY = 300, HR = 150, PX = 470, PV = 62;
mk(hs, 'rect', { x: PX - 10, y: HY - HR - 30, width: 748 - PX + 10, height: 2 * HR + 60, rx: 8, fill: '#FBFAF6', stroke: C.line, 'stroke-width': 2 });
mk(hs, 'line', { x1: PX - 10, y1: HY, x2: 748, y2: HY, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const hArr = txt(hs, 740, HY + HR + 22, 'paper slides →', { 'text-anchor': 'end', 'font-size': 18, 'font-weight': 600 });
mk(hs, 'circle', { cx: HX, cy: HY, r: HR, fill: 'none', stroke: C.ink, 'stroke-width': 14 });
mk(hs, 'circle', { cx: HX, cy: HY, r: HR - 12, fill: 'none', stroke: GR, 'stroke-width': 3 });
const spk = []; for (let k = 0; k < 16; k++) spk.push(mk(hs, 'line', { stroke: '#C9CCD4', 'stroke-width': 1.8 }));
mk(hs, 'circle', { cx: HX, cy: HY, r: 16, fill: C.ink });
const hLink = mk(hs, 'line', { stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const hTrace = mk(hs, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const hPen = mk(hs, 'circle', { r: 9, fill: C.ink });
const hVal = mk(hs, 'circle', { r: 12, fill: SI, stroke: '#fff', 'stroke-width': 3 });
const hAng = t => 0.3 + Math.max(0, t - tMorph) * 2 * PI / 6.5;
const tPen = wt('H4', 'valve') - 0.2;

/* ---------- P: sine wave from the circle ---------- */
const ps = $('#pS'), SX = 300, SY = 320, SR = 170, pg = GG(660, 1540, 0, 2 * PI, SY, SR);
const pu = UC(ps, { cx: SX, cy: SY, R: SR, ax: 46, fs: 24, r0: 40 });
const pAx = axes(ps, pg, 640, 1560, 130, 510, Q4, 534);
txt(pAx, 1556, SY - 14, 'x', { 'text-anchor': 'end', 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, fill: C.ink2 });
txt(pAx, 648, pg.Y(1) + 6, '1', { 'text-anchor': 'end', 'font-size': 18 }); txt(pAx, 648, pg.Y(-1) + 6, MIN + '1', { 'text-anchor': 'end', 'font-size': 18 });
const pGhost = mk(ps, 'path', { d: pg.path(Math.sin, 0, 2 * PI), fill: 'none', stroke: GR, 'stroke-width': 2.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' });
const pCur = mk(ps, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const pLink = mk(ps, 'line', { stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.85 });
const pDot = mk(ps, 'circle', { r: 10, fill: SI });
const KP = [[0, 0], [PI / 2, 1], [PI, 0], [3 * PI / 2, -1], [2 * PI, 0]];
const pKey = KP.map(([a, v]) => { const g = mk(mk(ps, 'g', { transform: `translate(${pg.X(a).toFixed(1)},${pg.Y(v).toFixed(1)})` }), 'g', {}); mk(g, 'circle', { r: 11, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 });
  txt(g, a > 6 ? -14 : 14, v > 0 ? -16 : v < 0 ? 32 : -16, `(${PIL[Math.round(a / (PI / 2))]}, ${v < 0 ? MIN + '1' : v})`, { 'text-anchor': a > 6 ? 'end' : 'start', 'font-size': 18, 'font-weight': 700, fill: C.ink }); return g; });
const PSEG = [[T0('P3') + 0.2, wt('P3', 'reaches') + 0.3, 0, PI / 2], [T0('P4') + 0.1, wt('P4', 'zero') + 0.3, PI / 2, PI], [wt('P4', 'three') - 0.1, wt('P4', 'bottom') + 0.1, PI, 3 * PI / 2], [T0('P5') + 0.1, wt('P5', 'home') + 0.3, 3 * PI / 2, 2 * PI]];
const segAng = (S, t) => { let a = S[0][2]; for (const [s, e, a0, a1] of S) if (t >= s) a = a0 + (a1 - a0) * M.io((t - s) / (e - s)); return a; };
const tKey = [T0('P3') + 0.15, wt('P3', 'reaches') + 0.3, wt('P4', 'zero') + 0.3, wt('P4', 'bottom') + 0.1, wt('P5', 'home') + 0.3];

/* ---------- D: five key points ---------- */
const DS = [[`${th('x')} = 0:\\ \\ ${si('\\sin 0 = 0')}`, 'the wave starts at the origin'], [`${th('x')} = \\tfrac{\\pi}{2}:\\ \\ ${si('\\sin\\tfrac{\\pi}{2} = 1')}`, 'the highest point'],
  [`${th('x')} = \\pi:\\ \\ ${si('\\sin\\pi = 0')}`, 'crosses the axis on its way down'], [`${th('x')} = \\tfrac{3\\pi}{2}:\\ ${si('-1')},\\ \\ ${th('x')} = 2\\pi:\\ ${si('0')}`, 'the lowest point, then back to zero']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:36px">${K(f)}</div><div class="why" style="top:58px">${w}</div></div>`).join('');
const tDs = [wt('D2', 'zero'), wt('D3', 'pi'), wt('D4', 'pi'), wt('D5', 'three')];
const KX = ['0', '\\tfrac{\\pi}{2}', '\\pi', '\\tfrac{3\\pi}{2}', '2\\pi'], KV = ['0', '1', '0', '-1', '0'];
$('#kTab').innerHTML = `<div class="kh" style="top:76px">${K(th('x'))}</div><div class="kh" style="top:138px">${K(si('\\sin x'))}</div>` +
  KX.map((x, j) => `<div class="kt" id="kx${j}" style="left:${150 + j * 122}px;top:76px">${K(th(x))}</div><div class="kt" id="kv${j}" style="left:${150 + j * 122}px;top:138px">${K(si(KV[j]))}</div>`).join('');
const tKt = [tDs[0], tDs[1], tDs[2], tDs[3], wt('D5', 'back')];
const ds = $('#dS'), dg = GG(110, 720, 0, 2 * PI, 400, 100);
const dAx = axes(ds, dg, 90, 740, 290, 510, Q4.map(([a, l]) => [a, a ? l : '']), 540);
const dDots = KP.map(([a, v]) => mk(ds, 'circle', { cx: dg.X(a), cy: dg.Y(v), r: 10, fill: SI }));
const dCur = mk(ds, 'path', { d: dg.path(Math.sin, 0, 2 * PI), fill: 'none', stroke: SI, 'stroke-width': 4.5, 'stroke-linecap': 'round' });

/* ---------- C: cosine wave ---------- */
const cs = $('#cS'), cg = GG(660, 1540, 0, 2 * PI, SY, SR);
const cu = UC(cs, { cx: SX, cy: SY, R: SR, ax: 46, fs: 24, r0: 40 });
const cAx = axes(cs, cg, 640, 1560, 130, 510, Q4, 534);
txt(cAx, 648, cg.Y(1) + 6, '1', { 'text-anchor': 'end', 'font-size': 18 }); txt(cAx, 648, cg.Y(-1) + 6, MIN + '1', { 'text-anchor': 'end', 'font-size': 18 });
const cGhost = mk(cs, 'path', { d: cg.path(Math.cos, 0, 2 * PI), fill: 'none', stroke: GR, 'stroke-width': 2.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' });
const cSlide = mk(cs, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 3, 'stroke-dasharray': '10 8', opacity: 0.9 });
const cSlideT = txt(cs, 1100, 112, 'the sine wave, slid left by π/2', { class: 'pp', 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: SI });
const cCur = mk(cs, 'path', { d: '', fill: 'none', stroke: CO, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const MBX = 590, cBar = mk(cs, 'line', { x1: MBX, x2: MBX, y1: SY, y2: SY, stroke: CO, 'stroke-width': 12, 'stroke-linecap': 'round' });
const cBarT = txt(cs, MBX, 548, 'cos x', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: CO });
const cLink = mk(cs, 'line', { stroke: CO, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.85 });
const cDot = mk(cs, 'circle', { r: 10, fill: CO });
const CSEG = [[T0('C2') + 0.1, wt('C2', 'minus') + 0.5, 0, PI], [T0('C3') + 0.1, wt('C3', 'two') + 0.3, PI, 2 * PI]];
const tSl = T0('C4');

/* ---------- K: sine vs cosine ---------- */
const kMini = (svg, fn, col, v0) => { const g = GG(110, 720, 0, 2 * PI, 290, 140); const ax = axes(svg, g, 80, 740, 110, 460, Q4.map(([a, l]) => [a, a ? l : '']), 330 + (v0 ? 0 : 0));
  const c = mk(svg, 'path', { d: g.path(fn, 0, 2 * PI), fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' });
  const d = mk(mk(svg, 'g', { transform: `translate(${g.X(0)},${g.Y(v0)})` }), 'g', {}); mk(d, 'circle', { r: 20, fill: 'none', stroke: col, 'stroke-width': 3 }); mk(d, 'circle', { r: 9, fill: col });
  const l = txt(svg, g.X(0) + 30, g.Y(v0) - 18, v0 ? '(0, 1)' : '(0, 0)', { 'font-size': 22, 'font-weight': 700, fill: col }); return { ax, c, d, l }; };
const kA = kMini($('#kaS'), Math.sin, SI, 0), kB = kMini($('#kbS'), Math.cos, CO, 1);
const th1 = PUC.think($('#th1'), { q: 'Which graph passes through the point (0, 1)?', opts: ['y = sin x', 'y = cos x'], right: 1, why: 'At x = 0, cos 0 = 1 but sin 0 = 0. The sine graph goes through (0, 0) instead.' });

/* ---------- G: tangent ---------- */
const gs = $('#gS'), gg = GG(150, 1530, -PI / 2, 2 * PI, 310, 46), CL = 4.4;
const gAx = axes(gs, gg, 120, 1556, 96, 524, [[-PI / 2, MIN + 'π/2'], ...Q4.map(([a, l]) => [a, a ? l : ''])], 552);
[2, 4].forEach(v => [v, -v].forEach(w => { mk(gAx, 'line', { x1: gg.X(0) - 7, y1: gg.Y(w), x2: gg.X(0) + 7, y2: gg.Y(w), stroke: C.ink, 'stroke-width': 2 }); txt(gAx, gg.X(0) - 12, gg.Y(w) + 6, (w < 0 ? MIN : '') + Math.abs(w), { 'text-anchor': 'end', 'font-size': 18 }); }));
const asy = [-PI / 2, PI / 2, 3 * PI / 2].map(a => mk(gs, 'line', { x1: gg.X(a), y1: 90, x2: gg.X(a), y2: 524, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '9 7' }));
const asyT = txt(gs, gg.X(PI / 2) + 12, 112, 'asymptote x = π/2', { 'font-size': 20, 'font-weight': 700, fill: C.red });
const GP = [[0, PI / 2 - 0.02], [PI / 2 + 0.02, PI], [-PI / 2 + 0.02, 0], [PI, 3 * PI / 2 - 0.02], [3 * PI / 2 + 0.02, 2 * PI]].map(() => mk(gs, 'path', { d: '', fill: 'none', stroke: TA, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
const GPR = [[0, PI / 2 - 0.02], [PI / 2 + 0.02, PI], [-PI / 2 + 0.02, 0], [PI, 3 * PI / 2 - 0.02], [3 * PI / 2 + 0.02, 2 * PI]];
const gDot = mk(gs, 'circle', { r: 10, fill: TA });
const gEvery = txt(gs, (gg.X(PI / 2) + gg.X(3 * PI / 2)) / 2, 504, '←  a new piece every π  →', { class: 'pp', 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700, fill: TA });
const tG2 = T0('G2') + 0.1, tG3e = wt('G3', 'limit') + 0.2, tG4 = wt('G4', 'Just') - 0.1, tG4e = wt('G4', 'breaks'), tG5 = T0('G5') + 0.1;
const p1x = t => t < T0('G3') ? 1.2 * M.clamp((t - tG2) / (T1('G2') - tG2)) : 1.2 + (PI / 2 - 0.02 - 1.2) * M.io((t - T0('G3')) / (tG3e - T0('G3')));
const GW = [[tG2, null], [tG4, tG4e], [tG5, tG5 + 0.9], [tG5 + 0.6, tG5 + 1.5], [tG5 + 1.2, tG5 + 2.0]];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${ta('\\tan x')}\\ \\text{breaks at}\\ x = (2n+1)\\tfrac{\\pi}{2}`);

/* ---------- Z ---------- */
const th2 = PUC.think($('#th2'), { q: 'From 0 to 2π, counting both ends, how many times does y = sin x meet the x-axis?', opts: ['2', '3', '4'], right: 1, why: 'At x = 0, π and 2π: exactly where sin x = 0.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `How many solutions does<br>${K(`${si('\\sin x')} = \\tfrac{1}{2}`)} have in ${K('[0,\\ 2\\pi]')}?`;
const wsol = PUC.solution($('#wl'), [[K(`\\text{draw } y = ${si('\\sin x')} \\text{ on } [0,\\ 2\\pi]`)], [K(`\\text{draw the line } y = \\tfrac{1}{2}`)], ['upper hump: 2 meetings, lower half: none'], [K(`\\text{2 solutions}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Draw'), wt('W4', 'Draw'), wt('W5', 'Count'), wt('W6', 'two')];
const ws = $('#wS'), wg = GG(96, 720, 0, 2 * PI, 300, 150);
const wShade = mk(ws, 'path', { d: wg.path(Math.sin, PI, 2 * PI) + `L${wg.X(PI)},${wg.Y(0)}Z`, fill: C.redBg });
const wShT = txt(ws, wg.X(3 * PI / 2), wg.Y(-0.45), 'never reaches 1/2', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: C.red });
const wAx = axes(ws, wg, 80, 744, 110, 480, Q4.map(([a, l]) => [a, a ? l : '']), 334);
const wCur = mk(ws, 'path', { d: wg.path(Math.sin, 0, 2 * PI), fill: 'none', stroke: SI, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wLine = mk(ws, 'line', { x1: 96, y1: wg.Y(0.5), x2: 740, y2: wg.Y(0.5), stroke: C.ok, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const wLT = txt(ws, 740, wg.Y(0.5) - 12, 'y = 1/2', { 'text-anchor': 'end', 'font-size': 20, 'font-weight': 700, fill: C.ok });
const wHit = [PI / 6, 5 * PI / 6].map(a => { const g = mk(mk(ws, 'g', { transform: `translate(${wg.X(a).toFixed(1)},${wg.Y(0.5).toFixed(1)})` }), 'g', {}); mk(g, 'circle', { r: 18, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }); mk(g, 'circle', { r: 7, fill: C.ink }); return g; });
const wNum = [PI / 6, 5 * PI / 6].map((a, i) => txt(ws, wg.X(a), wg.Y(0.5) + 46, String(i + 1), { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: C.ink }));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'tan x drawn as one smooth curve across ' + K('x = \\tfrac{\\pi}{2}'), right: K('\\tan\\tfrac{\\pi}{2}') + ' is not defined: the graph breaks at an asymptote' });
const ts = $('#tS'), tg = GG(60, 560, 0, PI, 137, 28);
mk(ts, 'line', { x1: 40, y1: 137, x2: 580, y2: 137, stroke: C.ink, 'stroke-width': 2 });
const tAs = mk(ts, 'line', { x1: tg.X(PI / 2), y1: 12, x2: tg.X(PI / 2), y2: 262, stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const tPcs = [mk(ts, 'path', { d: tg.path(tan, 0, PI / 2 - 0.02, 80, 4.3), fill: 'none', stroke: TA, 'stroke-width': 4.5 }), mk(ts, 'path', { d: tg.path(tan, PI / 2 + 0.02, PI, 80, 4.3), fill: 'none', stroke: TA, 'stroke-width': 4.5 })];
const tWrong = mk(ts, 'path', { d: `M${tg.X(PI / 2 - 0.23)},${tg.Y(4.3)} C${tg.X(PI / 2 + 0.05)},${tg.Y(5.5)} ${tg.X(PI / 2 - 0.05)},${tg.Y(-5.5)} ${tg.X(PI / 2 + 0.23)},${tg.Y(-4.3)}`, fill: 'none', stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '3 6', 'stroke-linecap': 'round' });
const tAsT = txt(ts, tg.X(PI / 2) + 12, 30, 'x = π/2', { 'font-size': 18, 'font-weight': 700, fill: C.red });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Use graphs to count the solutions of an equation.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `How many solutions does ${K('|\\sin x| = \\tfrac{1}{2}')}<br>have in ${K('[0,\\ 2\\pi]')}?`, opts: ['2', '3', '4', '6'].map(s => K(s)), right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`|\\sin x|:\\ \\text{lower half flips up}`)], [K(`\\text{two humps on } [0,\\ 2\\pi]`)], [K(`y = \\tfrac{1}{2}\\ \\text{cuts each twice}`)], [K(`2 \\times 2 = 4`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'flips'), wt('A3', 'two'), wt('A4', 'cuts'), wt('A4', 'Four')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · graphs of sin, cos, tan', y0: 104, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`${si('y = \\sin x')}:\\ \\text{starts at } (0, 0),\\ \\text{peak } 1 \\text{ at } \\tfrac{\\pi}{2}`),
    K(`${co('y = \\cos x')}:\\ \\text{starts at } (0, 1),\\ \\text{sine slid left by } \\tfrac{\\pi}{2}`),
    K(`\\text{key points: } x = 0,\\ \\tfrac{\\pi}{2},\\ \\pi,\\ \\tfrac{3\\pi}{2},\\ 2\\pi`),
    K(`${ta('y = \\tan x')}:\\ \\text{breaks at } x = (2n+1)\\tfrac{\\pi}{2}`),
    'Count solutions by counting where two graphs meet'] });
const YQ = ['Where does the sine graph first reach its highest point?', 'Which graph is the sine graph slid left by π/2?', 'Why does the tangent graph break at π/2?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 31', topic: 'A heartbeat repeats its shape: Periodicity and Symmetry', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const pv = (els, t, t0, gap = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * gap, 1e9, { dy: 0, fade: 0.2 }));
const steps = (pre, n, ts, t) => { for (let i = 0; i < n; i++) { const el = $('#' + pre + i); M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.8); M.vis(el.querySelector('.why'), t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); } };
const wave = (el, g, fn, a) => { attr(el, 'd', a > 0.005 ? g.path(fn, 0, a, Math.max(2, Math.ceil(a / (2 * PI) * 120))) : ''); };
const deg = a => Math.round(a / D2R) + '°';

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs(i), tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hw'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = hAng(t), c = Math.cos(a), s = Math.sin(a), vx = HX + (HR - 2) * c, vy = HY - (HR - 2) * s;
    spk.forEach((l, k) => { const b = a + k * PI / 8, cb = Math.cos(b), sb = Math.sin(b); attr(l, 'x1', (HX + 16 * cb).toFixed(1)); attr(l, 'y1', (HY - 16 * sb).toFixed(1)); attr(l, 'x2', (HX + (HR - 14) * cb).toFixed(1)); attr(l, 'y2', (HY - (HR - 14) * sb).toFixed(1)); });
    attr(hVal, 'cx', vx.toFixed(1)); attr(hVal, 'cy', vy.toFixed(1));
    attr(hPen, 'cx', PX); attr(hPen, 'cy', vy.toFixed(1)); attr(hLink, 'x1', vx.toFixed(1)); attr(hLink, 'y1', vy.toFixed(1)); attr(hLink, 'x2', PX); attr(hLink, 'y2', vy.toFixed(1));
    let d = ''; const n = 160; if (t > tPen) for (let i = 0; i <= n; i++) { const sT = tPen + (t - tPen) * i / n, x = PX + PV * (t - sT); if (x > 744) continue; const y = HY - (HR - 2) * Math.sin(hAng(sT)); d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
    attr(hTrace, 'd', d);
    pv([hLink, hPen], t, tPen - 0.3, 0.05); M.vis(hArr, t, tPen, 1e9, { dy: 0 });
    M.vis($('#hP'), t, wt('H5', 'wave') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, 1e9, POP);
  }

  /* P: sine from the circle */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pc'), t, tP1 + 0.05, OUT('D1'), { dy: 36, ...o });
    const a = segAng(PSEG, t), r = pu.set(a);
    pv([pu.xa, pu.ya, pu.circ, pu.rad, pu.P, pu.pT, pu.cosL, pu.sinL, pu.cosT, pu.sinT, pu.arc, pu.thT], t, wt('P2', 'turn') - 0.2, 0.02);
    M.vis(pAx, t, wt('P1', 'angle') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(pGhost, t, wt('P1', 'value'), 1e9, { dy: 0, fade: 0.4 });
    wave(pCur, pg, Math.sin, a); attr(pDot, 'cx', pg.X(a).toFixed(1)); attr(pDot, 'cy', pg.Y(r.s).toFixed(1));
    attr(pLink, 'x1', r.px.toFixed(1)); attr(pLink, 'y1', r.py.toFixed(1)); attr(pLink, 'x2', pg.X(a).toFixed(1)); attr(pLink, 'y2', pg.Y(r.s).toFixed(1));
    pv([pDot, pLink], t, wt('P2', 'Carry'), 0.05);
    pKey.forEach((g, k) => M.vis(g, t, tKey[k], 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#sRo'), t, wt('P2', 'turn'), 1e9, { dy: 10 }); M.setT($('#rT'), deg(a)); M.setT($('#rS'), sg(r.s));
  }

  /* D: key points */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    steps('ds', 4, tDs, t);
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, T0('D6'), { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 12).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kTab').children[0], t, tD1 + 0.5, 1e9, { dy: 0 }); M.vis($('#kTab').children[1], t, tD1 + 0.6, 1e9, { dy: 0 });
    M.vis(dAx, t, tD1 + 0.6, 1e9, { dy: 0, fade: 0.3 });
    KX.forEach((_, j) => { M.vis($('#kx' + j), t, tD1 + 0.7 + j * 0.06, 1e9, { dy: 10 }); M.vis($('#kv' + j), t, tKt[j], 1e9, { ...POP, sc: 0.5 }); M.vis(dDots[j], t, tKt[j] + 0.15, 1e9, { ...POP, sc: 0.3 }); });
    M.draw(dCur, t, T0('D6') + 0.1, 1.4);
  }

  /* C: cosine */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cc'), t, tC1 + 0.05, OUT('K1'), { dy: 36, ...o });
    const a = segAng(CSEG, t), r = cu.set(a);
    pv([cu.xa, cu.ya, cu.circ, cu.rad, cu.P, cu.pT, cu.cosL, cu.sinL, cu.cosT, cu.sinT, cu.arc, cu.thT], t, tC1 + 0.2, 0.02);
    M.vis(cAx, t, tC1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(cGhost, t, tC1 + 0.6, 1e9, { dy: 0, fade: 0.4 });
    wave(cCur, cg, Math.cos, a); const by = SY - SR * r.c;
    attr(cBar, 'y2', by.toFixed(1)); attr(cDot, 'cx', cg.X(a).toFixed(1)); attr(cDot, 'cy', cg.Y(r.c).toFixed(1));
    attr(cLink, 'x1', MBX); attr(cLink, 'y1', by.toFixed(1)); attr(cLink, 'x2', cg.X(a).toFixed(1)); attr(cLink, 'y2', cg.Y(r.c).toFixed(1));
    pv([cBar, cBarT, cDot, cLink], t, wt('C1', 'side') - 0.1, 0.05);
    const u = M.io((t - tSl - 0.3) / 1.6); attr(cSlide, 'd', cg.path(x => Math.sin(x + u * PI / 2), 0, 2 * PI)); M.vis(cSlide, t, tSl, 1e9, { dy: 0, fade: 0.3 }); M.vis(cSlideT, t, wt('C4', 'slid'), 1e9, POP);
    M.vis($('#cRo'), t, tC1 + 0.4, 1e9, { dy: 10 }); M.setT($('#cT'), deg(a)); M.setT($('#cV'), sg(r.c));
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [[kA, tK1 + 0.3, wt('K1', 'origin')], [kB, T0('K2') + 0.1, wt('K2', 'peak')]].forEach(([k, t1, t2]) => { M.vis(k.ax, t, t1, 1e9, { dy: 0 }); M.draw(k.c, t, t1 + 0.1, 1); M.vis(k.d, t, t2, 1e9, { ...POP, sc: 0.3 }); M.vis(k.l, t, t2 + 0.15, 1e9, { dy: 0 }); });
    M.vis($('#kaP'), t, wt('K1', 'zero'), 1e9, POP); M.vis($('#kbP'), t, wt('K2', 'shape'), 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'passes') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'At') });
  }

  /* G: tangent */
  const gOn = t >= tG1 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gc'), t, tG1 + 0.05, 1e9, { dy: 36 });
    M.vis(gAx, t, tG1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    const x1 = p1x(t); attr(GP[0], 'd', gg.path(tan, 0, x1, 120, CL));
    for (let i = 1; i < 5; i++) { const [s, e] = GW[i], [a0, a1] = GPR[i]; attr(GP[i], 'd', gg.path(tan, a0, a0 + (a1 - a0) * M.io((t - s) / (e - s)), 120, CL)); }
    const live = t < tG4 ? x1 : PI / 2 + 0.02 + (PI / 2 - 0.02) * M.io((t - tG4) / (tG4e - tG4)), lv = tan(live), undef = t >= wt('G3', 'At') && t < tG4;
    attr(gDot, 'cx', gg.X(live).toFixed(1)); attr(gDot, 'cy', gg.Y(Math.max(-CL, Math.min(CL, lv))).toFixed(1)); M.vis(gDot, t, tG2, tG5 - 0.2, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); M.hide(gDot, gDot.style.visibility === 'hidden' || Math.abs(lv) > CL);
    M.vis(asy[1], t, wt('G3', 'defined') - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(asyT, t, wt('G4', 'asymptote') - 0.1, 1e9, { dy: 0 });
    M.vis(asy[0], t, tG5, 1e9, { dy: 0, fade: 0.3 }); M.vis(asy[2], t, tG5 + 0.6, 1e9, { dy: 0, fade: 0.3 }); M.vis(gEvery, t, wt('G5', 'every') - 0.1, 1e9, POP);
    M.vis($('#gRo'), t, tG2, 1e9, { dy: 10 }); M.setT($('#gT'), undef ? '90°' : deg(live)); const gv = $('#gV'); M.setT(gv, undef ? 'not defined' : (Math.abs(lv) > 999 ? (lv > 0 ? '+' : MIN) + 'huge' : sg(lv))); gv.style.color = undef ? C.red : TA;
  }

  /* statement */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Sine') - 0.05, { st: 0.1, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'tangent') - 0.1, 0.8);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'meet') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'At') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(wAx, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.draw(wCur, t, tW[0], 1.2);
    M.draw(wLine, t, tW[1], 0.7); M.vis(wLT, t, tW[1] + 0.4, 1e9, { dy: 0 });
    wHit.forEach((g, i) => M.vis(g, t, wt('W5', 'twice') - 0.1 + i * 0.3, 1e9, { ...POP, sc: 0.3 })); wNum.forEach((e, i) => M.vis(e, t, wt('W5', 'twice') + i * 0.3, 1e9, { dy: 0 }));
    M.vis(wShade, t, wt('W5', 'never') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(wShT, t, wt('W5', 'never'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'not') - 0.1, tRight: wt('X3', 'breaks') - 0.1 });
    tPcs.forEach(p => M.vis(p, t, wt('X2', 'tangent'), 1e9, { dy: 0, fade: 0.3 }));
    M.vis(tWrong, t, wt('X2', 'joined') - 0.1, wt('X3', 'breaks') - 0.1, { dy: 0, fade: 0.3, outDur: 0.3, ody: 0 });
    M.vis(tAs, t, wt('X3', 'asymptote') - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(tAsT, t, wt('X3', 'asymptote'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'graphs') });
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
