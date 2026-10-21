// PUC Maths Ep 29: Domain and range of trigonometric functions (Proof board)
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

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tI1 = T0('I1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tR1 = T0('R1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three limits ---------- */
const LS = [['sin θ · HIGHEST VALUE', SI], ['sin θ · LOWEST VALUE', SI], ['tan θ · HIGHEST VALUE', TA]];
$('#lists').innerHTML = LS.map(([n, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">?</div></div>`).join('');
const tLs = i => wt('H1', 'high') - 0.1 + i * 0.22;

/* ---------- H: the valve height on a ruler ---------- */
const hs = $('#hS'), HX = 250, HY = 304, HR = 176, RX = 600;
[[HY - HR, '+R'], [HY + HR, MIN + 'R']].forEach(([y, l]) => { mk(hs, 'line', { x1: HX - HR - 30, y1: y, x2: RX + 20, y2: y, stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '7 7', opacity: 0.8 }); txt(hs, RX + 34, y + 7, l, { 'font-size': 22, 'font-weight': 700, fill: SI }); });
mk(hs, 'line', { x1: HX - HR - 30, y1: HY, x2: RX + 20, y2: HY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '8 7' }); txt(hs, RX + 34, HY + 7, '0', { 'font-size': 22, 'font-weight': 700, fill: C.ink2 });
mk(hs, 'line', { x1: RX, y1: HY - HR, x2: RX, y2: HY + HR, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(hs, 'circle', { cx: HX, cy: HY, r: HR, fill: 'none', stroke: C.ink, 'stroke-width': 16 });
mk(hs, 'circle', { cx: HX, cy: HY, r: HR - 14, fill: 'none', stroke: GR, 'stroke-width': 3 });
const spk = []; for (let k = 0; k < 16; k++) spk.push(mk(hs, 'line', { stroke: '#C9CCD4', 'stroke-width': 1.8 }));
const hSin = mk(hs, 'line', { stroke: SI, 'stroke-width': 6, 'stroke-linecap': 'round' });
const hLink = mk(hs, 'line', { stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
mk(hs, 'circle', { cx: HX, cy: HY, r: 18, fill: C.ink });
const hVal = mk(hs, 'circle', { r: 13, fill: SI, stroke: '#fff', 'stroke-width': 3 });
const hMk = mk(hs, 'path', { d: '', fill: SI });
const hAng = t => 0.6 + Math.max(0, t - tMorph) * 2 * PI / 6.5;

/* ---------- I: domain -> function -> range ---------- */
$('#mach').innerHTML = K(si('\\sin'));
const IN = ['30°', '200°', '750°'], OU = ['+0.50', MIN + '0.34', '+0.50'];
$('#toks').innerHTML = IN.map((s, i) => `<div class="tok th" id="ti${i}" style="border-color:${TH}">${s}</div>`).join('') + OU.map((s, i) => `<div class="tok si" id="to${i}" style="border-color:${SI}">${s}</div>`).join('');
const iS = $('#iS'); [[500, 960], [960, 1100]].forEach(([a, b], k) => { mk(iS, 'line', { x1: k ? 960 : 500, y1: 300, x2: k ? 1100 : 640, y2: 300, stroke: C.ink, 'stroke-width': 3 }); mk(iS, 'path', { d: `M${k ? 1100 : 640},300 l-14,-8 v16 z`, fill: C.ink }); });
const tIn = i => wt('I1', 'domain') + 0.3 + i * 0.18, tGo = i => wt('I2', 'range') - 0.2 + i * 0.5;

/* ---------- L: two turns, sine trapped ---------- */
const ls = $('#lS'), SX = 300, SY = 320, SR = 170;
const GX = a => 660 + 880 * a / (4 * PI), GY = v => SY - SR * v;
const lu = UC(ls, { cx: SX, cy: SY, R: SR, ax: 46, fs: 24, r0: 40 });
const lAx = mk(ls, 'g', {});
mk(lAx, 'line', { x1: 640, y1: SY, x2: 1560, y2: SY, stroke: C.ink, 'stroke-width': 2 });
mk(lAx, 'line', { x1: 660, y1: 120, x2: 660, y2: 520, stroke: C.ink, 'stroke-width': 2 });
[1, 2, 3, 4].forEach(k => { mk(lAx, 'line', { x1: GX(k * PI), y1: SY - 8, x2: GX(k * PI), y2: SY + 8, stroke: C.ink, 'stroke-width': 2 }); });
['π', '2π', '3π', '4π'].forEach((s, k) => txt(lAx, GX((k + 1) * PI) + 8, SY + 30, s, { 'font-size': 20, fill: C.ink2, 'font-weight': 600 }));
const lim = [1, -1].map(v => { const g = mk(ls, 'g', {}); mk(g, 'line', { x1: 660, y1: GY(v), x2: 1560, y2: GY(v), stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '8 7', opacity: 0.8 }); txt(g, 648, GY(v) + 7, v > 0 ? '1' : MIN + '1', { 'text-anchor': 'end', 'font-size': 20, 'font-weight': 700, fill: SI }); return g; });
const lCurve = mk(ls, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const lLink = mk(ls, 'line', { stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.85 });
const lDot = mk(ls, 'circle', { r: 10, fill: SI });
const BX = 590, lBar = mk(ls, 'line', { x1: BX, x2: BX, y1: SY, y2: SY, stroke: SI, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.9 });
const lBarT = txt(ls, BX, 548, 'range', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: SI });
const lBr = txt(ls, 1110, 112, '', { class: 'pp', 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 700, fill: SI });
lBr.textContent = 'sin θ stays in [' + MIN + '1, 1]';
const LSEG = [[T0('L2') + 0.1, wt('L2', 'ninety') + 0.3, 0, PI / 2], [T0('L3') + 0.1, wt('L3', 'seventy') + 0.3, PI / 2, 3 * PI / 2], [T0('L4') + 0.1, T1('L4') + 0.2, 3 * PI / 2, 4 * PI]];
const lAng = t => { let a = 0; for (const [s, e, a0, a1] of LSEG) if (t >= s) a = a0 + (a1 - a0) * (e - s > 3 ? M.clamp((t - s) / (e - s)) : M.io((t - s) / (e - s))); return a; };

/* ---------- D: the proof ---------- */
const DS = [['|x| \\le 1,\\ \\ |y| \\le 1', 'P is on a circle of radius 1'], [`-1 \\le ${COS} \\le 1,\\ \\ -1 \\le ${SIN} \\le 1`, 'cos θ is the x of P, sin θ is the y of P'],
  [`\\text{domain} = ${th('\\mathbb{R}')}`, 'every real θ gives a point P'], [`\\text{range} = ${si('[-1,\\ 1]')}`, 'every height from ' + MIN + '1 to 1 is reached']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:36px">${K(f)}</div><div class="why" style="top:58px">${w}</div></div>`).join('');
const tDs = [wt('D2', 'P'), wt('D3', 'cosine'), wt('D4', 'Every'), wt('D5', 'Every')];
const ds = $('#dS'), du = UC(ds, { cx: 392, cy: 200, R: 104, ax: 24, fs: 20, lw: 5, r0: 26 }); du.set(50 * D2R);
const dSq = mk(ds, 'rect', { x: 392 - 104, y: 200 - 104, width: 208, height: 208, fill: 'none', stroke: SI, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
const dSqL = mk(ds, 'g', {}); [[392 + 104 + 8, 200 + 26, '1', 'start'], [392 - 104 - 8, 200 + 26, MIN + '1', 'end'], [392 + 12, 200 - 104 - 10, '1', 'start'], [392 + 12, 200 + 104 + 24, MIN + '1', 'start']].forEach(([x, y, s, an]) => txt(dSqL, x, y, s, { 'text-anchor': an, 'font-size': 20, 'font-weight': 700, fill: SI }));
const dDomL = txt(ds, 36, 360, 'DOMAIN OF sin θ, cos θ: EVERY ANGLE', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1.2 });
const dDom = NL(ds, 400, TX, PT); const dDomS = mk(ds, 'line', { x1: 84, y1: 400, x2: 700, y2: 400, stroke: TH, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0.85 });
const dRanL = txt(ds, 36, 476, 'RANGE: ONLY ' + MIN + '1 TO 1', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1.2 });
const dRan = NL(ds, 516, VX, VT); const dRanS = mk(ds, 'line', { x1: VX(-1), y1: 516, x2: VX(1), y2: 516, stroke: SI, 'stroke-width': 9 });
const dRanD = [-1, 1].map(v => mk(ds, 'circle', { cx: VX(v), cy: 516, r: 10, fill: SI }));

/* ---------- G: tangent blows up near 90 degrees ---------- */
const gs = $('#gS'), GCX = 240, GCY = 420, GR2 = 136, TLX = GCX + GR2;
const gu = UC(gs, { cx: GCX, cy: GCY, R: GR2, ax: 24, fs: 22, r0: 32 });
const gTl = mk(gs, 'line', { x1: TLX, y1: 64, x2: TLX, y2: GCY + GR2 + 20, stroke: GR, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gTlT = txt(gs, TLX + 14, GCY + GR2 + 16, 'x = 1', { 'font-size': 18, 'font-weight': 600, fill: C.mute });
const gRay = mk(gs, 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const gTan = mk(gs, 'line', { stroke: TA, 'stroke-width': 8, 'stroke-linecap': 'round' });
const gTanT = itx(gs, TLX + 16, 0, 'tan θ', { fill: TA, 'font-size': 24 });
const gUp = txt(gs, TLX + 16, 96, '', { 'font-size': 20, 'font-weight': 600, fill: TA }); gUp.textContent = '↑ still rising';
const GSTEP = [[wt('G2', 'creep'), 45], [wt('G3', 'Five'), 80], [wt('G3', 'eleven'), 85], [wt('G3', 'fifty'), 89], [wt('G3', 'five', 1), 89.9], [wt('G4', 'exactly'), 90]];
const gDeg = t => { let d = 45; GSTEP.forEach(([s, v], i) => { if (i === 0) return; const p = GSTEP[i - 1]; const dur = i === 1 ? s - p[0] : 0.35; d += (v - p[1]) * M.io((t - (i === 1 ? p[0] : s - 0.2)) / dur); }); return d; };
$('#gDom').innerHTML = K(`${ta('\\tan\\theta')}:\\ \\theta \\ne (2n+1)\\tfrac{\\pi}{2}`);
const gn = $('#gN'); const gNL = NL(gn, 470, TX, PT); const gNS = mk(gn, 'line', { x1: 84, y1: 470, x2: 700, y2: 470, stroke: TA, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0.85 });
const gHo = holes(gn, 470, ODD); const gHoT = ODD.map(v => txt(gn, TX(v), 440, (v < 0 ? MIN : '') + (Math.abs(v) > PI ? '3π/2' : 'π/2'), { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 700, fill: C.red }));

/* ---------- R: table of all six ---------- */
const RS = 'n ∈ Z';
const RT = [['\\sin\\theta', '\\mathbb{R}', '[-1,\\ 1]', SI], ['\\cos\\theta', '\\mathbb{R}', '[-1,\\ 1]', CO], ['\\tan\\theta', '\\mathbb{R} - \\{(2n+1)\\tfrac{\\pi}{2}\\}', '\\mathbb{R}', TA],
  ['\\sec\\theta', '\\mathbb{R} - \\{(2n+1)\\tfrac{\\pi}{2}\\}', '(-\\infty, -1] \\cup [1, \\infty)', C.ink], ['\\operatorname{cosec}\\theta', '\\mathbb{R} - \\{n\\pi\\}', '(-\\infty, -1] \\cup [1, \\infty)', C.ink], ['\\cot\\theta', '\\mathbb{R} - \\{n\\pi\\}', '\\mathbb{R}', C.ink]];
$('#rRows').innerHTML = `<div class="hiBox" id="rHi" style="left:14px;width:1572px;height:74px"></div>` + RT.map(([f, d, r, col], i) => `<div class="rr" id="rr${i}" style="top:${124 + i * 72}px"><div class="c" style="left:36px">${K(`\\textcolor{${col}}{${f}}`)}</div><div class="c rd" style="left:280px">${K(d)}</div><div class="c rg" style="left:1020px">${K(r)}</div></div>`).join('');
const tRr = [tR1 + 0.1, tR1 + 0.3, tR1 + 0.5, wt('R1', 'Secant'), wt('R3', 'Cosecant'), wt('R3', 'cotangent')], tRg = [tR1 + 0.1, tR1 + 0.3, tR1 + 0.5, wt('R2', 'Secant'), wt('R3', 'skip'), wt('R3', 'skip') + 0.3];

/* ---------- K: sine vs tangent ---------- */
const kSide = (svg, isTan) => { const g1 = txt(svg, 36, 112, 'DOMAIN', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1.5 }); const n1 = NL(svg, 170, TX, PT);
  const s1 = mk(svg, 'line', { x1: 84, y1: 170, x2: 700, y2: 170, stroke: TH, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0.85 }); const ho = isTan ? holes(svg, 170, ODD) : [];
  const g2 = txt(svg, 36, 292, 'RANGE', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1.5 }); const n2 = NL(svg, 350, VX, VT);
  const s2 = isTan ? mk(svg, 'line', { x1: 84, y1: 350, x2: 700, y2: 350, stroke: TA, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0.85 }) : mk(svg, 'line', { x1: VX(-1), y1: 350, x2: VX(1), y2: 350, stroke: SI, 'stroke-width': 9 });
  const dts = isTan ? [] : [-1, 1].map(v => mk(svg, 'circle', { cx: VX(v), cy: 350, r: 10, fill: SI }));
  return { a: [g1, n1], s1, ho, b: [g2, n2], s2, dts }; };
const kA = kSide($('#kaS'), false), kB = kSide($('#kbS'), true);
const th1 = PUC.think($('#th1'), { q: `Can ${K(SIN)} ever equal 1.2?`, opts: ['Yes', 'No'], right: 1, why: `sin θ is a height on a circle of radius 1, so ${K(`-1 \\le \\sin\\theta \\le 1`)}. 1.2 is too big.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`-1 \\le ${SIN} \\le 1 \\qquad -1 \\le ${COS} \\le 1`);

/* ---------- Z: pause and think 2 ---------- */
const th2 = PUC.think($('#th2'), { q: `Is ${K(TAN)} defined at ${K(`${TQ} = \\pi`)}?`, opts: ['Yes', 'No'], right: 0, why: `${K(`\\cos\\pi = -1 \\ne 0`)}, so ${K(`\\tan\\pi = 0`)}. Only the odd multiples of π/2 are missing.` });

/* ---------- W: worked example with a live morph ---------- */
$('#wq').innerHTML = `Find the range of<br>${K(`f(${TQ}) = 3 + 2\\,${SIN}`)}`;
const wsol = PUC.solution($('#wl'), [[K(`-1 \\le ${SIN} \\le 1`)], [K(`-2 \\le 2\\,${SIN} \\le 2`)], [K(`1 \\le 3 + 2\\,${SIN} \\le 5`)], [K(`\\text{range of } f = [1,\\ 5]`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Sine'), wt('W4', 'Two'), wt('W5', 'Three'), wt('W6', 'range')];
const ws = $('#wS'), WX = a => 96 + 620 * a / (2 * PI), WY = v => 486 - 52 * (v + 1.5);
const wAx = mk(ws, 'g', {});
mk(wAx, 'line', { x1: 80, y1: WY(0), x2: 730, y2: WY(0), stroke: C.ink, 'stroke-width': 2 }); mk(wAx, 'line', { x1: 96, y1: WY(-1.5), x2: 96, y2: WY(5.9), stroke: C.ink, 'stroke-width': 2 });
[-1, 1, 3, 5].forEach(v => { mk(wAx, 'line', { x1: 88, y1: WY(v), x2: 104, y2: WY(v), stroke: C.ink, 'stroke-width': 2 }); txt(wAx, 78, WY(v) + 6, (v < 0 ? MIN : '') + Math.abs(v), { 'text-anchor': 'end', 'font-size': 18, fill: C.ink2, 'font-weight': 600 }); });
['π', '2π'].forEach((s, k) => txt(wAx, WX((k + 1) * PI), WY(0) + 30, s, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 }));
const wGhost = mk(ws, 'path', { d: '', fill: 'none', stroke: GR, 'stroke-width': 2.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' });
const wCur = mk(ws, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const wPath = (A, B) => { let d = ''; for (let i = 0; i <= 90; i++) { const x = 2 * PI * i / 90; d += (i ? 'L' : 'M') + WX(x).toFixed(1) + ',' + WY(A + B * Math.sin(x)).toFixed(1); } return d; };
attr(wGhost, 'd', wPath(0, 1));
const wLim = [1, 5].map(v => { const g = mk(ws, 'g', {}); mk(g, 'line', { x1: 96, y1: WY(v), x2: 730, y2: WY(v), stroke: C.ok, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' }); txt(g, 726, WY(v) + (v > 3 ? 26 : -10), v > 3 ? 'max 5' : 'min 1', { 'text-anchor': 'end', 'font-size': 20, 'font-weight': 700, fill: C.ok }); return g; });
const tB = wt('W4', 'Multiply'), tA = wt('W5', 'Add');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`-1 \\le \\cos\\theta \\le 1 \;\\Rightarrow\; -1 \\le \\sec\\theta \\le 1`), right: K(`\\sec\\theta \\le -1\\ \\ \\text{or}\\ \\ \\sec\\theta \\ge 1`) + '&nbsp; (cos θ = 1/2 gives sec θ = 2)' });
const ts = $('#tS'), XX = a => 40 + 520 * a / (2 * PI), XY = v => 146 - 34 * v;
const tBand = mk(ts, 'rect', { x: 40, y: XY(1), width: 520, height: XY(-1) - XY(1), fill: C.redBg });
const tBandT = txt(ts, 300, XY(0.45), 'sec θ never here', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: C.red });
mk(ts, 'line', { x1: 30, y1: XY(0), x2: 570, y2: XY(0), stroke: C.ink, 'stroke-width': 2 });
const tCos = mk(ts, 'path', { d: '', fill: 'none', stroke: CO, 'stroke-width': 3.5 });
{ let d = ''; for (let i = 0; i <= 80; i++) { const x = 2 * PI * i / 80; d += (i ? 'L' : 'M') + XX(x).toFixed(1) + ',' + XY(Math.cos(x)).toFixed(1); } attr(tCos, 'd', d); }
const tSec = mk(ts, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
{ let d = '', pen = false; for (let i = 0; i <= 400; i++) { const x = 2 * PI * i / 400, v = 1 / Math.cos(x); if (Math.abs(v) > 3.05) { pen = false; continue; } d += (pen ? 'L' : 'M') + XX(x).toFixed(1) + ',' + XY(v).toFixed(1); pen = true; } attr(tSec, 'd', d); }
const tLab = [txt(ts, 560, XY(-1) + 26, 'cos θ', { 'text-anchor': 'end', 'font-size': 18, 'font-weight': 700, fill: CO, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(ts, XX(0.25), 40, 'sec θ', { 'font-size': 18, 'font-weight': 700, fill: C.ink, 'font-family': 'Poppins', 'font-style': 'italic' })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find the range of an expression built from sin θ and cos θ.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `How many integers lie in the range of<br>${K(`f(${TQ}) = 4\\,${SIN} - 3\\ ?`)}`, opts: ['8', '9', '10', '11'].map(s => K(s)), right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`-1 \\le \\sin\\theta \\le 1`)], [K(`-4 \\le 4\\sin\\theta \\le 4`)], [K(`-7 \\le f(\\theta) \\le 1`)], [K(`-7, -6, \\dots, 0, 1`)], [K(`9\\ \\text{integers}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Sine'), wt('A3', 'Multiply'), wt('A4', 'Subtract'), wt('A5', 'integers'), wt('A5', 'nine')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · domain and range', y0: 104, dy: 78,
  lines: [K(`-1 \\le ${SIN} \\le 1,\\qquad -1 \\le ${COS} \\le 1`),
    K(`${si('\\sin')},\\ ${co('\\cos')}:\\ \\text{domain } \\mathbb{R},\\ \\text{range } [-1,\\ 1]`),
    K(`${ta('\\tan')},\\ \\sec:\\ \\theta \\ne (2n+1)\\tfrac{\\pi}{2},\\ \\ n \\in \\mathbb{Z}`),
    K(`\\cot,\\ \\operatorname{cosec}:\\ \\theta \\ne n\\pi,\\ \\ n \\in \\mathbb{Z}`),
    K(`\\sec,\\ \\operatorname{cosec}:\\ \\text{range } (-\\infty, -1] \\cup [1, \\infty)`)] });
const YQ = ['What is the range of cos θ?', 'Name two angles where tan θ is not defined.', 'Can sec θ equal 1/2? Why not?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 30', topic: 'Trace the valve over time and a wave appears: the graphs', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const pv = (els, t, t0, gap = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * gap, 1e9, { dy: 0, fade: 0.2 }));
const steps = (pre, n, ts, t, dy) => { for (let i = 0; i < n; i++) { const el = $('#' + pre + i); M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.8); M.vis(el.querySelector('.why'), t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); } };

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs(i), tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the valve height */
  const hOn = t >= tMorph && t < tI1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('I1');
    M.vis($('#hw'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = hAng(t), c = Math.cos(a), s = Math.sin(a), vx = HX + (HR - 2) * c, vy = HY - (HR - 2) * s;
    spk.forEach((l, k) => { const b = a + k * PI / 8, cb = Math.cos(b), sb = Math.sin(b); attr(l, 'x1', (HX + 16 * cb).toFixed(1)); attr(l, 'y1', (HY - 16 * sb).toFixed(1)); attr(l, 'x2', (HX + (HR - 16) * cb).toFixed(1)); attr(l, 'y2', (HY - (HR - 16) * sb).toFixed(1)); });
    attr(hVal, 'cx', vx.toFixed(1)); attr(hVal, 'cy', vy.toFixed(1));
    attr(hSin, 'x1', vx.toFixed(1)); attr(hSin, 'y1', HY); attr(hSin, 'x2', vx.toFixed(1)); attr(hSin, 'y2', vy.toFixed(1));
    attr(hLink, 'x1', vx.toFixed(1)); attr(hLink, 'y1', vy.toFixed(1)); attr(hLink, 'x2', RX); attr(hLink, 'y2', vy.toFixed(1));
    attr(hMk, 'd', `M${RX - 8},${vy.toFixed(1)} l-18,-11 v22 z`);
    const tl = wt('H2', 'Above') - 0.1; [hSin, hLink, hMk].forEach(e => M.vis(e, t, tl, 1e9, { dy: 0, fade: 0.3 }));
    M.setT($('#hV'), 'height = ' + sg(s) + ' R'); M.vis($('#hV'), t, tl + 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'stayed') - 0.1, 1e9, POP);
  }

  /* I: domain and range */
  const iOn = t >= tI1 - 0.1 && t < tL1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    M.vis($('#ic'), t, tI1 + 0.05, OUT('L1'), { dy: 36, ...o });
    M.vis($('#bxD'), t, wt('I1', 'domain') - 0.2, 1e9, { dy: 16 }); M.vis($('#mach'), t, wt('I1', 'domain'), 1e9, POP); M.vis(iS, t, wt('I1', 'domain') + 0.1, 1e9, { dy: 0 });
    M.vis($('#bxR'), t, wt('I2', 'range') - 0.3, 1e9, { dy: 16 });
    IN.forEach((_, i) => { const el = $('#ti' + i), eo = $('#to' + i), u = M.io((t - tGo(i)) / 0.5);
      const x0 = 100 + i * 128, y0 = 260 + (i % 2) * 80, x = M.lerp(x0, 760, u), y = M.lerp(y0, 272, u);
      el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px';
      M.vis(el, t, tIn(i), tGo(i) + 0.45, { ...POP, sc: 0.6, outDur: 0.12, ody: 0 });
      eo.style.left = (1140 + i * 128) + 'px'; eo.style.top = (260 + (i % 2) * 80) + 'px';
      M.vis(eo, t, tGo(i) + 0.55, 1e9, { ...POP, sc: 0.6 }); });
  }

  /* L: two turns */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lc'), t, tL1 + 0.05, OUT('D1'), { dy: 36, ...o });
    const a = lAng(t), r = lu.set(a);
    pv([lu.xa, lu.ya, lu.circ, lu.rad, lu.P, lu.pT, lu.cosL, lu.sinL, lu.cosT, lu.sinT, lu.arc, lu.thT], t, tL1 + 0.2, 0.02);
    M.vis(lAx, t, tL1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
    let d = ''; const n = Math.max(2, Math.ceil(a / (4 * PI) * 200)); if (a > 0.005) for (let i = 0; i <= n; i++) { const x = a * i / n; d += (i ? 'L' : 'M') + GX(x).toFixed(1) + ',' + GY(Math.sin(x)).toFixed(1); }
    attr(lCurve, 'd', d); attr(lDot, 'cx', GX(a).toFixed(1)); attr(lDot, 'cy', GY(r.s).toFixed(1));
    attr(lLink, 'x1', r.px.toFixed(1)); attr(lLink, 'y1', r.py.toFixed(1)); attr(lLink, 'x2', GX(a).toFixed(1)); attr(lLink, 'y2', GY(r.s).toFixed(1));
    M.vis(lDot, t, wt('L1', 'track'), 1e9, { dy: 0, fade: 0.2 }); M.vis(lLink, t, wt('L1', 'track'), 1e9, { dy: 0, fade: 0.2 });
    const hi = a >= PI / 2 ? 1 : Math.sin(a), lo = a >= 3 * PI / 2 ? -1 : a > PI ? Math.sin(a) : 0;
    attr(lBar, 'y1', GY(hi).toFixed(1)); attr(lBar, 'y2', GY(lo).toFixed(1)); M.vis(lBar, t, wt('L1', 'meter'), 1e9, { dy: 0, fade: 0.2 }); M.vis(lBarT, t, wt('L1', 'meter'), 1e9, { dy: 0 });
    lim.forEach((g, k) => M.vis(g, t, k ? wt('L3', 'minus') : wt('L2', 'one'), 1e9, { dy: 0, fade: 0.3 }));
    M.vis(lBr, t, wt('L4', 'never'), 1e9, POP);
    M.vis($('#sRo'), t, wt('L1', 'track'), 1e9, { dy: 10 });
    M.setT($('#rT'), Math.round(a / D2R) + '°'); M.setT($('#rS'), sg(r.s));
  }

  /* D: the proof */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('G1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    steps('ds', 4, tDs, t);
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 12).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    pv([du.xa, du.ya, du.circ, du.rad, du.cosL, du.sinL, du.P, du.arc, du.thT, du.cosT, du.sinT, du.pT], t, tD1 + 0.5, 0.03);
    M.draw(dSq, t, tDs[0] + 0.3, 0.8); M.vis(dSqL, t, tDs[0] + 0.8, 1e9, { dy: 0 });
    M.vis(dDomL, t, tDs[2] - 0.1, 1e9, { dy: 0 }); M.vis(dDom, t, tDs[2] - 0.1, 1e9, { dy: 0 }); M.draw(dDomS, t, tDs[2] + 0.2, 0.9);
    M.vis(dRanL, t, tDs[3] - 0.1, 1e9, { dy: 0 }); M.vis(dRan, t, tDs[3] - 0.1, 1e9, { dy: 0 }); M.draw(dRanS, t, tDs[3] + 0.2, 0.6); dRanD.forEach(c => M.vis(c, t, tDs[3] + 0.7, 1e9, { ...POP, sc: 0.3 }));
  }

  /* G: tangent */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const dg = gDeg(t), a = dg * D2R, r = gu.set(a), tn = dg >= 89.999 ? Infinity : Math.tan(a);
    pv([gu.xa, gu.ya, gu.circ, gu.rad, gu.P, gu.pT, gu.cosL, gu.sinL, gu.cosT, gu.sinT, gu.arc, gu.thT], t, tG1 + 0.2, 0.02);
    const ty = Math.max(76, GCY - GR2 * Math.min(tn, 50));
    attr(gTan, 'x1', TLX); attr(gTan, 'y1', GCY); attr(gTan, 'x2', TLX); attr(gTan, 'y2', ty.toFixed(1));
    const rx = isFinite(tn) ? GCX + (TLX - GCX) * Math.min(1, (GCY - ty) / Math.max(1e-6, GR2 * tn)) : GCX; attr(gRay, 'x1', GCX); attr(gRay, 'y1', GCY); attr(gRay, 'x2', rx.toFixed(1)); attr(gRay, 'y2', isFinite(tn) ? ty.toFixed(1) : 64);
    attr(gTanT, 'y', ((GCY + ty) / 2 + 8).toFixed(1));
    const tTanIn = wt('G1', 'Tangent', 1); [gTl, gTlT, gRay, gTan, gTanT].forEach((e, i) => M.vis(e, t, tTanIn + i * 0.06, isFinite(tn) ? 1e9 : (i === 2 || i === 3 || i === 4 ? wt('G4', 'exactly') : 1e9), { dy: 0, fade: 0.25, outDur: 0.2, ody: 0 }));
    M.vis(gUp, t, ty <= 77 ? wt('G3', 'Five') : 1e9, wt('G4', 'exactly'), { dy: 0, outDur: 0.2, ody: 0 });
    M.vis($('#gr'), t, wt('G2', 'Let') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.setT($('#gT'), (dg > 89.5 && dg < 89.999 ? dg.toFixed(1) : Math.round(dg)) + '°');
    const cv = Math.cos(a); M.setT($('#gC'), dg >= 89.999 ? '0' : cv.toFixed(dg > 89.5 ? 4 : 3));
    const tv = $('#gTn'); M.setT(tv, isFinite(tn) ? tn.toFixed(2) : 'not defined'); tv.style.color = isFinite(tn) ? TA : C.red;
    M.vis($('#gDom'), t, wt('G5', 'domain') - 0.1, 1e9, { dy: 10 });
    M.vis(gNL, t, wt('G5', 'odd') - 0.3, 1e9, { dy: 0 }); M.draw(gNS, t, wt('G5', 'odd'), 0.8);
    gHo.forEach((c, i) => M.vis(c, t, wt('G5', 'multiple') + i * 0.12, 1e9, { ...POP, sc: 0.3 })); gHoT.forEach((e, i) => M.vis(e, t, wt('G5', 'multiple') + 0.1 + i * 0.12, 1e9, { dy: 0 }));
  }

  /* R: all six */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rt'), t, tR1 + 0.02, OUT('K1'), { dy: 36, ...o });
    RT.forEach((_, i) => { const el = $('#rr' + i); M.vis(el, t, tRr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write(el.querySelector('.rd'), t, tRr[i], 0.6); PUC.write(el.querySelector('.rg'), t, tRg[i] + 0.1, 0.6); });
    const hy = M.track(124 + 3 * 72, [[tRr[4] - 0.1, 124 + 4 * 72]], M.SOFT)(t);
    const hb = $('#rHi'); M.vis(hb, t, tRr[3] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    hb.style.height = (74 + 72 * M.io((t - tRr[5] + 0.1) / 0.3)).toFixed(1) + 'px';
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [[kA, wt('K1', 'accepts'), wt('K1', 'range')], [kB, wt('K2', 'domain'), wt('K2', 'range')]].forEach(([k, t1, t2]) => {
      pv(k.a, t, t1 - 0.3, 0.05); M.draw(k.s1, t, t1, 0.8); k.ho.forEach((c, i) => M.vis(c, t, t1 + 0.5 + i * 0.1, 1e9, { ...POP, sc: 0.3 }));
      pv(k.b, t, t2 - 0.3, 0.05); M.draw(k.s2, t, t2, 0.7); k.dts.forEach(c => M.vis(c, t, t2 + 0.5, 1e9, { ...POP, sc: 0.3 })); });
    M.vis($('#kaP'), t, wt('K1', 'only'), 1e9, POP); M.vis($('#kbP'), t, wt('K2', 'every'), 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'equal') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'One') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Sine') - 0.05, { st: 0.1, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'between') - 0.1, 0.8);
  }

  /* Z: think 2 */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'defined') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'Cosine') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(wAx, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.vis(wGhost, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.3 });
    const B = 1 + M.io((t - tB) / 1.2), A = 3 * M.io((t - tA) / 1.2);
    attr(wCur, 'd', wPath(A, B)); M.vis(wCur, t, tW[0] - 0.1, 1e9, { dy: 0, fade: 0.3 });
    const wh = `<i>y</i> = <span style="color:${C.ok}">${A.toFixed(1)}</span> + <span class="si">${B.toFixed(1)}</span> sin <i class="th">θ</i>`; if ($('#wRo')._h !== wh) { $('#wRo')._h = wh; $('#wRo').innerHTML = wh; }
    M.vis($('#wRo'), t, tW[0], 1e9, { dy: 10 });
    wLim.forEach((g, k) => M.vis(g, t, wt('W6', 'squeezed') + k * 0.15, 1e9, { dy: 0, fade: 0.3 }));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'big') - 0.1, tRight: wt('X3', 'Secant') - 0.1 });
    M.vis(tCos, t, wt('X2', 'cosine'), 1e9, { dy: 0, fade: 0.3 }); M.vis(tLab[0], t, wt('X2', 'cosine'), 1e9, { dy: 0 });
    M.vis(tSec, t, wt('X3', 'half'), 1e9, { dy: 0, fade: 0.3 }); M.vis(tLab[1], t, wt('X3', 'half'), 1e9, { dy: 0 });
    M.vis(tBand, t, wt('X3', 'never') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(tBandT, t, wt('X3', 'never'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'find') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + questions + NEXT */
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
