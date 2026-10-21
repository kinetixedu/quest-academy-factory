// PUC Maths Ep 31: Periodicity and symmetry (Proof board)
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

const brk = (svg, xa, xb, y, label, col) => { const g = mk(svg, 'g', {}); mk(g, 'path', { d: `M${xa + 3},${y + 10} V${y} H${xb - 3} V${y + 10}`, fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  txt(g, (xa + xb) / 2, y - 10, label, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: col }); return g; };
const dg_ = d => `${d}^\\circ`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tD1 = T0('D1'), tG1 = T0('G1'), tK1 = T0('K1'), tK3 = T0('K3'), tS1 = T0('S1'), tT = T0('T1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['sin x · REPEATS EVERY', SI], ['tan x · REPEATS EVERY', TA], ['cos(' + MIN + 'x) · EQUALS', CO]];
$('#lists').innerHTML = LS.map(([n, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">?</div></div>`).join('');
const tLs = i => wt('H1', 'heart') - 0.1 + i * 0.22;

/* ---------- H: heart monitor ---------- */
const hs = $('#hS'), MX0 = 60, MX1 = 724, MY = 300, MA = 150, BEAT = 1.1, SPD = 170;
mk(hs, 'rect', { x: 36, y: 84, width: 712, height: 400, rx: 14, fill: C.ink });
for (let x = 76; x < 748; x += 40) mk(hs, 'line', { x1: x, y1: 84, x2: x, y2: 484, stroke: '#24304F', 'stroke-width': 1 });
for (let y = 104; y < 484; y += 40) mk(hs, 'line', { x1: 36, y1: y, x2: 748, y2: y, stroke: '#24304F', 'stroke-width': 1 });
const gss = (u, m, s) => Math.exp(-((u - m) * (u - m)) / (2 * s * s));
const ecg = u => { u = ((u % 1) + 1) % 1; return 0.14 * gss(u, 0.14, 0.03) - 0.18 * gss(u, 0.3, 0.01) + 1.0 * gss(u, 0.34, 0.012) - 0.32 * gss(u, 0.38, 0.012) + 0.26 * gss(u, 0.6, 0.05); };
const hTr = mk(hs, 'path', { d: '', fill: 'none', stroke: '#3DDC84', 'stroke-width': 3.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const hHead = mk(hs, 'circle', { r: 6, fill: '#B9F6CF' });
const hBpm = txt(hs, 728, 124, '', { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 600, fill: '#3DDC84' });
const tE0 = wt('H1', 'monitor') - 0.2, PXB = SPD * BEAT;
const hBr = [0, 1, 2].map(k => brk(hs, MX0 + PXB * k, MX0 + PXB * (k + 1), 150, 'same shape', '#B9F6CF'));

/* ---------- P: keep turning ---------- */
const ps = $('#pS'), SX = 300, SY = 330, SR = 160, pg = GG(660, 1540, 0, 4 * PI, SY, SR);
const pu = UC(ps, { cx: SX, cy: SY, R: SR, ax: 44, fs: 24, r0: 38 });
const pAx = axes(ps, pg, 640, 1560, 150, 510, [[0, '0'], [PI, 'π'], [2 * PI, '2π'], [3 * PI, '3π'], [4 * PI, '4π']], 534);
txt(pAx, 648, pg.Y(1) + 6, '1', { 'text-anchor': 'end', 'font-size': 18 }); txt(pAx, 648, pg.Y(-1) + 6, MIN + '1', { 'text-anchor': 'end', 'font-size': 18 });
const pCur = mk(ps, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const pLink = mk(ps, 'line', { stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.85 });
const pDot = mk(ps, 'circle', { r: 10, fill: SI });
const pMk = [PI / 6, 13 * PI / 6].map((a, i) => { const g = mk(mk(ps, 'g', { transform: `translate(${pg.X(a).toFixed(1)},${pg.Y(0.5).toFixed(1)})` }), 'g', {}); mk(g, 'circle', { r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }); txt(g, 0, -24, i ? '390°' : '30°', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: C.ink }); return g; });
const pEq = mk(ps, 'line', { x1: pg.X(PI / 6), y1: pg.Y(0.5), x2: pg.X(13 * PI / 6), y2: pg.Y(0.5), stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '4 6' });
const pEqT = txt(ps, (pg.X(PI / 6) + pg.X(13 * PI / 6)) / 2, pg.Y(0.5) - 12, 'same height', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: C.ink });
const pBr = [0, 1].map(k => brk(ps, pg.X(2 * PI * k), pg.X(2 * PI * (k + 1)), 118, k ? 'the same wave again' : 'one period: 2π', SI));
const PSEG = [[T0('P1') + 0.4, T1('P1'), 0, 2 * PI], [wt('P2', 'thirty', 1) - 0.2, wt('P2', 'ninety') + 0.1, 2 * PI, 2 * PI + PI / 6], [T0('P4') + 0.2, T1('P4') + 0.2, 2 * PI + PI / 6, 4 * PI]];
const segAng = (S, t) => { let a = S[0][2]; for (const [s, e, a0, a1] of S) if (t >= s) a = a0 + (a1 - a0) * (a1 - a0 > 3 ? M.clamp((t - s) / (e - s)) : M.io((t - s) / (e - s))); return a; };

/* ---------- D: proof + sliding window ---------- */
const X_ = th('x');
const DS = [[`${X_} \\to ${X_} + 2\\pi`, 'one full turn: P comes back to the same point'], [`${si('\\sin')}(2\\pi + ${X_}) = ${si('\\sin')}\\,${X_},\\ \\ ${co('\\cos')}(2\\pi + ${X_}) = ${co('\\cos')}\\,${X_}`, 'same point, same values'],
  [`${si('\\sin')}(2n\\pi + ${X_}) = ${si('\\sin')}\\,${X_},\\ \\ n \\in \\mathbb{Z}`, 'any whole number of turns; the same for cos'], [`\\text{period of } ${si('\\sin')},\\ ${co('\\cos')} = 2\\pi`, 'the smallest positive gap after which values repeat']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${i === 1 ? 30 : 36}px">${K(f)}</div><div class="why" style="top:58px">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Adding'), wt('D3', 'So'), wt('D4', 'For'), wt('D5', 'smallest')];
const ds = $('#dS'), dgg = GG(80, 740, 0, 6 * PI, 330, 110);
const dAx = axes(ds, dgg, 60, 750, 200, 460, [[0, '0'], [2 * PI, '2π'], [4 * PI, '4π'], [6 * PI, '6π']], 484);
const dWin = mk(ds, 'rect', { x: dgg.X(0), y: 206, width: dgg.X(2 * PI) - dgg.X(0), height: 248, rx: 10, fill: C.ac2, stroke: SI, 'stroke-width': 2.5 });
const dCur = mk(ds, 'path', { d: dgg.path(Math.sin, 0, 6 * PI, 240), fill: 'none', stroke: SI, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const dN = txt(ds, 740, 530, '', { 'text-anchor': 'end', 'font-size': 24, 'font-weight': 700, fill: C.ink });
const tWn = [tDs[2], wt('D4', 'again'), wt('D4', 'integer')];
const dWinX = t => { let k = 0; tWn.forEach((tt, i) => { if (i) k += M.io((t - tt) / 0.6); }); return k; };

/* ---------- G: tangent, period pi ---------- */
const gs = $('#gS'), GA = 35 * D2R, gu = UC(gs, { cx: 392, cy: 290, R: 180, ax: 40, fs: 22, r0: 34 });
gu.set(GA);
const gQ = mk(gs, 'g', {}); const gDia = mk(gQ, 'line', { x1: 392, y1: 290, x2: 392 - 180 * Math.cos(GA), y2: 290 + 180 * Math.sin(GA), stroke: C.ink, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' });
mk(gQ, 'line', { x1: 392, y1: 290, x2: 392 - 180 * Math.cos(GA), y2: 290, stroke: CO, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.55 });
mk(gQ, 'line', { x1: 392 - 180 * Math.cos(GA), y1: 290, x2: 392 - 180 * Math.cos(GA), y2: 290 + 180 * Math.sin(GA), stroke: SI, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.55 });
mk(gQ, 'circle', { cx: 392 - 180 * Math.cos(GA), cy: 290 + 180 * Math.sin(GA), r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 });
txt(gQ, 392 - 208 * Math.cos(GA), 290 + 208 * Math.sin(GA) + 18, 'Q', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: C.ink });
const gSig = txt(gs, 744, 120, '', { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 700, fill: C.ink }); gSig.innerHTML = `<tspan fill="${CO}">(${MIN}cos, </tspan><tspan fill="${SI}">${MIN}sin)</tspan>`;
const gArc = mk(gs, 'path', { d: `M${392 + 230 * Math.cos(GA)},${290 - 230 * Math.sin(GA)} A230,230 0 0 0 ${392 - 230 * Math.cos(GA)},${290 + 230 * Math.sin(GA)}`, fill: 'none', stroke: TH, 'stroke-width': 3, 'stroke-dasharray': '3 7', 'stroke-linecap': 'round' });
const gArcT = txt(gs, 392 - 236 * Math.cos(GA + PI / 2), 290 - 236 * Math.sin(GA + PI / 2) - 8, '+π', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: TH });
const gn = $('#gN'), tg = GG(90, 730, -PI / 2, 5 * PI / 2, 300, 42), CL = 4.6;
const gAx = axes(gn, tg, 70, 750, 100, 500, [[0, '0'], [PI / 2, 'π/2'], [PI, 'π'], [3 * PI / 2, '3π/2'], [2 * PI, '2π']], 530);
const gAs = [-PI / 2, PI / 2, 3 * PI / 2, 5 * PI / 2].map(a => mk(gn, 'line', { x1: tg.X(a), y1: 96, x2: tg.X(a), y2: 500, stroke: C.red, 'stroke-width': 2, 'stroke-dasharray': '8 7' }));
const gPc = [0, 1, 2].map(k => mk(gn, 'path', { d: tg.path(tan, -PI / 2 + k * PI + 0.02, PI / 2 + k * PI - 0.02, 100, CL), fill: 'none', stroke: TA, 'stroke-width': 4.5, 'stroke-linecap': 'round' }));
const gBr = [0, 1, 2].map(k => brk(gn, tg.X(-PI / 2 + k * PI), tg.X(PI / 2 + k * PI), 90, 'π', TA));

/* ---------- K: 2pi vs pi ---------- */
const ka = $('#kaS'), kg = GG(80, 740, 0, 4 * PI, 300, 120);
const kaAx = axes(ka, kg, 60, 750, 160, 440, [[0, '0'], [2 * PI, '2π'], [4 * PI, '4π']], 470);
const kaC = mk(ka, 'path', { d: kg.path(Math.sin, 0, 4 * PI, 200), fill: 'none', stroke: SI, 'stroke-width': 4.5 });
const kaC2 = mk(ka, 'path', { d: kg.path(Math.cos, 0, 4 * PI, 200), fill: 'none', stroke: CO, 'stroke-width': 3, opacity: 0.6 });
const kaB = [0, 1].map(k => brk(ka, kg.X(2 * PI * k), kg.X(2 * PI * (k + 1)), 136, '2π', SI));
const kb = $('#kbS'), kbg = GG(90, 730, -PI / 2, 7 * PI / 2, 300, 34);
const kbAx = axes(kb, kbg, 70, 750, 140, 450, [[0, '0'], [PI, 'π'], [2 * PI, '2π'], [3 * PI, '3π']], 480);
const kbC = [0, 1, 2, 3].map(k => mk(kb, 'path', { d: kbg.path(tan, -PI / 2 + k * PI + 0.03, PI / 2 + k * PI - 0.03, 80, 4.2), fill: 'none', stroke: TA, 'stroke-width': 4.5 }));
const kbB = [0, 1, 2, 3].map(k => brk(kb, kbg.X(-PI / 2 + k * PI), kbg.X(PI / 2 + k * PI), 126, 'π', TA));
const th1 = PUC.think($('#th1'), { q: `Is ${K(`\\sin ${dg_(750)}`)} the same as ${K(`\\sin ${dg_(30)}`)}?`, opts: ['Yes', 'No'], right: 0, why: `${K(`750^\\circ = 2 \\times 360^\\circ + 30^\\circ`)}: two full turns. So ${K(`\\sin 750^\\circ = \\sin 30^\\circ = \\tfrac{1}{2}`)}.` });

/* ---------- S: symmetry ---------- */
const sv = $('#sSv'), SA = 50 * D2R, su = UC(sv, { cx: 392, cy: 290, R: 180, ax: 40, fs: 22, r0: 34 }); su.set(SA);
const sQx = 392 + 180 * Math.cos(SA), sQy = 290 + 180 * Math.sin(SA);
const sQ = mk(sv, 'g', {}); mk(sQ, 'line', { x1: 392, y1: 290, x2: sQx, y2: sQy, stroke: C.ink, 'stroke-width': 3.5, 'stroke-dasharray': '7 6' });
mk(sQ, 'line', { x1: sQx, y1: 290, x2: sQx, y2: sQy, stroke: SI, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-dasharray': '2 10' });
mk(sQ, 'circle', { cx: sQx, cy: sQy, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 });
txt(sQ, 392 + 208 * Math.cos(SA), 290 + 208 * Math.sin(SA) + 16, 'Q', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: C.ink });
itx(sQ, sQx + 14, 290 + 90 * Math.sin(SA) + 8, MIN + 'sin x', { fill: SI, 'font-size': 22 });
const sArc = mk(sv, 'path', { d: `M${392 + 34},290 A34,34 0 0 1 ${392 + 34 * Math.cos(SA)},${290 + 34 * Math.sin(SA)}`, fill: 'none', stroke: TH, 'stroke-width': 3 });
const sArcT = itx(sv, 392 + 58 * Math.cos(SA / 2), 290 + 58 * Math.sin(SA / 2) + 10, MIN + 'x', { fill: TH, 'font-size': 22, 'text-anchor': 'middle' });
M.setT(su.thT, 'x'); M.setT(su.sinT, 'sin x'); M.setT(su.cosT, 'cos x'); attr(su.cosT, 'y', 290 - 14); attr(su.cosT, 'x', 392 + 74);
const sMir = mk(sv, 'line', { x1: 160, y1: 290, x2: 624, y2: 290, stroke: TH, 'stroke-width': 4, 'stroke-dasharray': '12 8', opacity: 0.6 });
$('#sF1').innerHTML = K(`${co('\\cos')}(-${X_}) = ${co('\\cos')}\\,${X_}`); $('#sF2').innerHTML = K(`${si('\\sin')}(-${X_}) = -\\,${si('\\sin')}\\,${X_}`);
$('#sF2').style.left = '400px';
const sg_ = $('#sGr'), sgg = GG(70, 714, -2 * PI, 2 * PI, 300, 110);
const sAx = axes(sg_, sgg, 56, 728, 170, 430, [[-2 * PI, MIN + '2π'], [-PI, MIN + 'π'], [0, '0'], [PI, 'π'], [2 * PI, '2π']], 460);
const sCosR = mk(sg_, 'path', { d: sgg.path(Math.cos, 0, 2 * PI), fill: 'none', stroke: CO, 'stroke-width': 4.5 });
const sCosL = mk(sg_, 'path', { d: '', fill: 'none', stroke: CO, 'stroke-width': 4.5 });
const sSinR = mk(sg_, 'path', { d: sgg.path(Math.sin, 0, 2 * PI), fill: 'none', stroke: SI, 'stroke-width': 4.5 });
const sSinL = mk(sg_, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 4.5 });
const sFold = mk(sg_, 'line', { x1: sgg.X(0), y1: 160, x2: sgg.X(0), y2: 440, stroke: TH, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const sPiv = mk(sg_, 'circle', { cx: sgg.X(0), cy: sgg.Y(0), r: 9, fill: TH });
const foldPath = (fn, u) => { let d = ''; for (let i = 0; i <= 100; i++) { const a = 2 * PI * i / 100; d += (i ? 'L' : 'M') + (sgg.X(0) + (sgg.X(a) - sgg.X(0)) * u).toFixed(1) + ',' + sgg.Y(fn(a)).toFixed(1); } return d; };
const spinPath = (fn, ph) => { let d = ''; const ox = sgg.X(0), oy = sgg.Y(0), c = Math.cos(ph), s = Math.sin(ph); for (let i = 0; i <= 100; i++) { const a = 2 * PI * i / 100, dx = sgg.X(a) - ox, dy = sgg.Y(fn(a)) - oy; d += (i ? 'L' : 'M') + (ox + dx * c - dy * s).toFixed(1) + ',' + (oy + dx * s + dy * c).toFixed(1); } return d; };
const tFold = wt('S4', 'Fold'), tSpin = wt('S5', 'Spin');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${co('\\cos')}(-x) = ${co('\\cos')}\\,x \\qquad ${si('\\sin')}(-x) = -\\,${si('\\sin')}\\,x`);

/* ---------- Z ---------- */
const th2 = PUC.think($('#th2'), { q: `Is ${K(`\\cos(-60^\\circ)`)} equal to ${K('+\\tfrac{1}{2}')} or ${K('-\\tfrac{1}{2}')}?`, opts: [K('+\\tfrac{1}{2}'), K('-\\tfrac{1}{2}')], right: 0, why: `${K(`\\cos(-x) = \\cos x`)}, so ${K(`\\cos(-60^\\circ) = \\cos 60^\\circ = \\tfrac{1}{2}`)}.` });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the value of<br>${K(`${si('\\sin')}(-1050^\\circ)`)}`;
const wsol = PUC.solution($('#wl'), [[K(`\\sin(-1050^\\circ) = -\\sin 1050^\\circ`)], [K(`1050^\\circ = 3 \\times 360^\\circ - 30^\\circ`)], [K(`\\sin 1050^\\circ = \\sin(-30^\\circ) = -\\tfrac{1}{2}`)], [K(`\\sin(-1050^\\circ) = -\\left(-\\tfrac{1}{2}\\right) = \\tfrac{1}{2}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'odd'), wt('W4', 'three'), wt('W5', 'minus'), wt('W6', 'answer')];
const ws = $('#wS'), wu = UC(ws, { cx: 392, cy: 320, R: 180, ax: 40, fs: 22, r0: 36 });
M.setT(wu.thT, ''); M.setT(wu.cosT, ''); 
const wTurns = txt(ws, 744, 540, '', { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 700, fill: TH });
const wSpin = t => -1050 * D2R * M.io((t - wt('W4', 'three') + 0.2) / 2.6);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\sin(-x) = \\sin x \\quad \\text{(like cos)}`), right: K(`\\sin(-x) = -\\sin x:\\ \\ \\sin(-30^\\circ) = -\\tfrac{1}{2}`) });
const ts = $('#tS'), xg = GG(60, 560, -PI, PI, 137, 90);
const tAx = axes(ts, xg, 40, 580, 30, 250, [[-PI / 6, MIN + '30°'], [PI / 6, '30°']], 168);
const tCur = mk(ts, 'path', { d: xg.path(Math.sin, -PI, PI), fill: 'none', stroke: SI, 'stroke-width': 4 });
const tPt = [[PI / 6, 0.5, C.ok, '+1/2'], [-PI / 6, -0.5, C.red, MIN + '1/2']].map(([a, v, col, l]) => { const g = mk(ts, 'g', {}); mk(g, 'line', { x1: xg.X(a), y1: xg.Y(0), x2: xg.X(a), y2: xg.Y(v), stroke: col, 'stroke-width': 3, 'stroke-dasharray': '4 4' }); mk(g, 'circle', { cx: xg.X(a), cy: xg.Y(v), r: 9, fill: col }); txt(g, xg.X(a) + (a > 0 ? 16 : -16), xg.Y(v) + 7, l, { 'text-anchor': a > 0 ? 'start' : 'end', 'font-size': 20, 'font-weight': 700, fill: col }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'Values of large or negative angles; the period of a function.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find the value of<br>${K(`\\sin(-750^\\circ) + \\cos(-420^\\circ) + \\tan 1125^\\circ`)}`, opts: ['0', '1', '2', '-1'].map(s => K(s)), right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\sin(-750^\\circ) = -\\sin 30^\\circ = -\\tfrac{1}{2}`)], [K(`\\cos(-420^\\circ) = \\cos 60^\\circ = \\tfrac{1}{2}`)], [K(`1125^\\circ = 6 \\times 180^\\circ + 45^\\circ`)], [K(`\\tan 1125^\\circ = \\tan 45^\\circ = 1`)], [K(`-\\tfrac{1}{2} + \\tfrac{1}{2} + 1 = 1`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Sine'), wt('A3', 'Cosine'), wt('A4', 'Eleven'), wt('A4', 'tan'), wt('A5', 'total')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · periodicity and symmetry', y0: 104, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`${si('\\sin')}(2n\\pi + x) = ${si('\\sin')}\\,x,\\quad ${co('\\cos')}(2n\\pi + x) = ${co('\\cos')}\\,x`),
    K(`\\text{period: } ${si('\\sin')},\\ ${co('\\cos')} \\to 2\\pi,\\quad ${ta('\\tan')} \\to \\pi`),
    K(`${co('\\cos')}(-x) = ${co('\\cos')}\\,x \\quad (\\text{even: mirror in the } y\\text{-axis})`),
    K(`${si('\\sin')}(-x) = -\\,${si('\\sin')}\\,x \\quad (\\text{odd: half-turn about the origin})`),
    'Drop the full turns first, then fix the sign'] });
const YQ = ['What is the period of tan x?', 'Is sin(' + MIN + 'x) equal to sin x?', 'Simplify cos(x + 4π).'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 32', topic: 'Three different expressions, always the same number: Identities', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const pv = (els, t, t0, gap = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * gap, 1e9, { dy: 0, fade: 0.2 }));
const steps = (pre, n, ts, t) => { for (let i = 0; i < n; i++) { const el = $('#' + pre + i); M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.8); M.vis(el.querySelector('.why'), t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); } };
const deg = a => Math.round(a / D2R) + '°';

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs(i), tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: monitor */
  const hOn = t >= tMorph - 0.05 && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hw'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    const xe = Math.min(MX1, MX0 + SPD * Math.max(0, t - tE0)); let d = '';
    for (let x = MX0; x <= xe; x += 3) d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + (MY - MA * ecg((x - MX0) / PXB)).toFixed(1);
    attr(hTr, 'd', d); attr(hHead, 'cx', xe.toFixed(1)); attr(hHead, 'cy', (MY - MA * ecg((xe - MX0) / PXB)).toFixed(1)); M.hide(hHead, xe <= MX0 + 1);
    M.setT(hBpm, 'BEAT ' + Math.max(1, Math.min(4, Math.floor((xe - MX0) / PXB + 0.66) )));
    hBr.forEach((g, k) => M.vis(g, t, wt('H2', 'same') + k * 0.25, 1e9, { dy: 0, fade: 0.25 }));
    M.vis($('#hP'), t, wt('H2', 'every') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'how') - 0.1, 1e9, POP);
  }

  /* P: keep turning */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pc'), t, tP1 + 0.05, OUT('D1'), { dy: 36, ...o });
    const a = segAng(PSEG, t), r = pu.set(a);
    pv([pu.xa, pu.ya, pu.circ, pu.rad, pu.P, pu.pT, pu.cosL, pu.sinL, pu.cosT, pu.sinT, pu.arc, pu.thT], t, tP1 + 0.2, 0.02);
    M.vis(pAx, t, tP1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    attr(pCur, 'd', a > 0.005 ? pg.path(Math.sin, 0, a, Math.max(2, Math.ceil(a / (4 * PI) * 200))) : '');
    attr(pDot, 'cx', pg.X(a).toFixed(1)); attr(pDot, 'cy', pg.Y(r.s).toFixed(1));
    attr(pLink, 'x1', r.px.toFixed(1)); attr(pLink, 'y1', r.py.toFixed(1)); attr(pLink, 'x2', pg.X(a).toFixed(1)); attr(pLink, 'y2', pg.Y(r.s).toFixed(1));
    pv([pDot, pLink], t, tP1 + 0.4, 0.05);
    M.vis(pMk[0], t, wt('P2', 'Thirty') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(pMk[1], t, wt('P2', 'ninety') + 0.1, 1e9, { ...POP, sc: 0.4 });
    M.draw(pEq, t, wt('P3', 'same') - 0.1, 0.6); M.vis(pEqT, t, wt('P3', 'height') - 0.1, 1e9, { dy: 0 });
    pBr.forEach((g, k) => M.vis(g, t, k ? wt('P4', 'printed') : wt('P4', 'Every'), 1e9, { dy: 0, fade: 0.25 }));
    M.vis($('#sRo'), t, tP1 + 0.4, 1e9, { dy: 10 }); M.setT($('#rT'), deg(a)); M.setT($('#rS'), sg(r.s));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('G1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    steps('ds', 4, tDs, t);
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 12).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(dAx, t, tD1 + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.draw(dCur, t, tD1 + 0.6, 1.6);
    const k = dWinX(t), n = Math.round(k); attr(dWin, 'x', dgg.X(2 * PI * k).toFixed(1)); M.vis(dWin, t, tDs[0], 1e9, { dy: 0, fade: 0.3 });
    M.setT(dN, 'n = ' + n); M.vis(dN, t, tDs[2], 1e9, { dy: 0 });
    $('#dF').innerHTML !== '' || ($('#dF').innerHTML = K(`${si('\\sin')}(2n\\pi + ${X_}) = ${si('\\sin')}\\,${X_}`)); PUC.write($('#dF'), t, tDs[2] + 0.2, 0.8);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tK1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('K1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    pv([gu.xa, gu.ya, gu.circ, gu.rad, gu.P, gu.pT, gu.cosL, gu.sinL, gu.cosT, gu.sinT, gu.arc, gu.thT], t, tG1 + 0.2, 0.02);
    M.draw(gArc, t, wt('G2', 'Half') - 0.1, 0.9); M.vis(gArcT, t, wt('G2', 'Half') + 0.3, 1e9, { dy: 0 });
    M.vis(gQ, t, wt('G2', 'opposite') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(gSig, t, wt('G2', 'flip') - 0.1, 1e9, { dy: 0 });
    M.vis($('#gP'), t, wt('G2', 'ratio'), 1e9, POP);
    M.vis($('#gr'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(gAx, t, tG1 + 0.5, 1e9, { dy: 0, fade: 0.3 }); gAs.forEach((l, i) => M.vis(l, t, tG1 + 0.6 + i * 0.06, 1e9, { dy: 0 }));
    gPc.forEach((p, k) => M.draw(p, t, tG1 + 0.8 + k * 0.4, 0.6)); gBr.forEach((g, k) => M.vis(g, t, wt('G1', 'pi') + k * 0.25, 1e9, { dy: 0, fade: 0.25 }));
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tS1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(kaAx, t, tK1 + 0.3, 1e9, { dy: 0 }); M.draw(kaC, t, tK1 + 0.4, 1.2); M.draw(kaC2, t, tK1 + 0.6, 1.2); kaB.forEach((g, k) => M.vis(g, t, wt('K1', 'full') + k * 0.3, 1e9, { dy: 0, fade: 0.25 }));
    M.vis(kbAx, t, T0('K2') + 0.1, 1e9, { dy: 0 }); kbC.forEach((p, k) => M.draw(p, t, T0('K2') + 0.2 + k * 0.25, 0.5)); kbB.forEach((g, k) => M.vis(g, t, wt('K2', 'half') + k * 0.2, 1e9, { dy: 0, fade: 0.25 }));
    M.vis($('#kaP'), t, wt('K1', 'repeat'), 1e9, POP); M.vis($('#kbP'), t, wt('K2', 'twice') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('S1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'same') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Seven') });
  }

  /* S: symmetry */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    M.vis($('#sl'), t, tS1 + 0.05, 1e9, { dx: -60, dy: 0 });
    pv([su.xa, su.ya, su.circ, su.rad, su.P, su.pT, su.cosL, su.sinL, su.cosT, su.sinT, su.arc, su.thT], t, tS1 + 0.3, 0.02);
    M.draw(sArc, t, wt('S1', 'minus') - 0.1, 0.5); M.vis(sArcT, t, wt('S1', 'minus') + 0.3, 1e9, { dy: 0 });
    M.vis(sQ, t, wt('S1', 'clockwise') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.draw(sMir, t, wt('S2', 'mirror') - 0.1, 0.6); M.vis($('#sP1'), t, wt('S2', 'mirror') + 0.2, 1e9, POP);
    M.vis($('#sr'), t, T0('S3') - 0.2, 1e9, { dx: 60, dy: 0 });
    PUC.write($('#sF1'), t, wt('S3', 'cosine'), 0.7); PUC.write($('#sF2'), t, wt('S3', 'sine'), 0.7);
    M.vis(sAx, t, T0('S3') + 0.1, 1e9, { dy: 0, fade: 0.3 });
    const cosOn = t < tSpin - 0.6, u = -1 + 2 * M.io((t - tFold) / 1.4);
    M.vis(sCosR, t, wt('S4', 'cosine') - 0.1, cosOn ? 1e9 : tSpin - 0.6, { dy: 0, fade: 0.3, outDur: 0.3, ody: 0 }); attr(sCosL, 'd', foldPath(Math.cos, -u));
    M.vis(sCosL, t, tFold - 0.1, cosOn ? 1e9 : tSpin - 0.6, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); M.vis(sFold, t, wt('S4', 'y') - 0.1, tSpin - 0.6, { dy: 0, fade: 0.3, outDur: 0.3, ody: 0 });
    const ph = PI * M.io((t - tSpin) / 1.6);
    M.vis(sSinR, t, tSpin - 0.4, 1e9, { dy: 0, fade: 0.3 }); attr(sSinL, 'd', spinPath(Math.sin, ph)); M.vis(sSinL, t, tSpin - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(sPiv, t, wt('S5', 'origin') - 0.1, 1e9, { ...POP, sc: 0.3 });
    $('#srL').textContent = t < tSpin - 0.6 ? 'y = cos x · FOLD ALONG THE y-AXIS' : 'y = sin x · HALF A TURN ABOUT O';
    M.vis($('#sE'), t, wt('S6', 'even') - 0.1, 1e9, POP); M.vis($('#sO'), t, wt('S6', 'odd') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Sine') - 0.05, { st: 0.1, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Tangent') + 0.4, 0.8);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'plus') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'Cosine') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const a = wSpin(t), r = wu.set(a);
    pv([wu.xa, wu.ya, wu.circ, wu.rad, wu.P, wu.pT, wu.sinL, wu.sinT], t, T0('W2') + 0.5, 0.03);
    M.vis(wu.arc, t, wt('W4', 'three') - 0.2, 1e9, { dy: 0 });
    const dgv = Math.round(a / D2R); $('#wRo').innerHTML = `<span class="th">θ = ${dgv < 0 ? MIN : ''}${Math.abs(dgv)}°</span>`; M.vis($('#wRo'), t, T0('W2') + 0.5, 1e9, { dy: 10 });
    const tn = Math.floor(Math.abs(dgv) / 360); M.setT(wTurns, tn ? `full turns: ${tn}` : ''); M.vis(wTurns, t, wt('W4', 'three'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'flips') - 0.1 });
    M.vis(tAx, t, wt('X2', 'sine'), 1e9, { dy: 0 }); M.draw(tCur, t, wt('X2', 'sine') + 0.1, 0.8);
    M.vis(tPt[0], t, wt('X3', 'Sine') , 1e9, { dy: 0, fade: 0.3 }); M.vis(tPt[1], t, wt('X3', 'minus') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'questions') });
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
