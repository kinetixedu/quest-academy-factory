// PUC Maths Ep 28: Signs of trigonometric functions in the four quadrants (Proof board)
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

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tK1 = T0('K1'), tK4 = T0('K4'), tM1 = T0('M1'), tT = T0('T1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: four quadrants, signs unknown ---------- */
const LS = ['QUADRANT I', 'QUADRANT II', 'QUADRANT III', 'QUADRANT IV'];
$('#lists').innerHTML = LS.map((n, i) => `<div class="lst" id="ls${i}" style="left:${272 + i * 352}px"><div class="ln">${n}</div><div class="lv">( <span class="co">?</span> , <span class="si">?</span> )</div></div>`).join('');
const tLs = i => wt('H1', 'watch') - 0.1 + i * 0.22;

/* ---------- H: the valve goes round ---------- */
const hs = $('#hS'), HX = 270, HY = 320, HR = 176;
mk(hs, 'line', { x1: HX - HR - 40, y1: HY, x2: HX + HR + 40, y2: HY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '8 7' });
mk(hs, 'line', { x1: HX, y1: HY - HR - 40, x2: HX, y2: HY + HR + 40, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '8 7' });
mk(hs, 'circle', { cx: HX, cy: HY, r: HR, fill: 'none', stroke: C.ink, 'stroke-width': 16 });
mk(hs, 'circle', { cx: HX, cy: HY, r: HR - 14, fill: 'none', stroke: GR, 'stroke-width': 3 });
const spk = []; for (let k = 0; k < 16; k++) spk.push(mk(hs, 'line', { stroke: '#C9CCD4', 'stroke-width': 1.8 }));
const hCos = mk(hs, 'line', { stroke: CO, 'stroke-width': 6, 'stroke-linecap': 'round' }), hSin = mk(hs, 'line', { stroke: SI, 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(hs, 'circle', { cx: HX, cy: HY, r: 18, fill: C.ink });
const hVal = mk(hs, 'circle', { r: 13, fill: SI, stroke: '#fff', 'stroke-width': 3 });
const hHub = txt(hs, HX + 26, HY + 36, 'hub', { 'font-size': 18, fill: C.mute });
const hAng = t => 0.6 + Math.max(0, t - tMorph) * 2 * PI / 6.5;

/* ---------- P: recall ---------- */
const pu = UC($('#pS'), { cx: 392, cy: 306, R: 186, ax: 50 });
const pO = txt(pu.g, 392 - 24, 306 + 30, 'O', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: C.ink, 'text-anchor': 'middle' });
const p1 = txt(pu.g, 392 - 64, 306 - 72, '1', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: C.ink });
const pSg = [[392 + 186 + 50 - 4, 306 - 14, '+', CO], [392 - 186 - 50 + 4, 306 - 14, MIN, CO], [392 + 16, 306 - 186 - 50 + 22, '+', SI], [392 + 16, 306 + 186 + 50 - 2, MIN, SI]].map(([x, y, s, col]) => txt(pu.g, x, y, s, { class: 'pp', 'font-size': 34, 'font-weight': 700, fill: col, 'text-anchor': x > 392 + 20 ? 'end' : x < 392 - 20 ? 'start' : 'start' }));
const PS = [[`O${si('')}P = 1`, 'unit circle: radius 1, centre at the origin O'], [`P = (${COS},\\ ${SIN})`, 'x-coordinate is cos θ, y-coordinate is sin θ'], [`${COS}:\\ \\text{left or right}`, 'right of O is plus, left of O is minus'], [`${SIN}:\\ \\text{up or down}`, 'above O is plus, below O is minus']];
$('#pSt').innerHTML = `<div class="hiBox" id="pHi" style="left:20px;width:744px;height:104px"></div>` + PS.map(([f, w], i) => `<div class="st" id="ps${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tPs = [wt('P1', 'radius'), wt('P4', 'x'), wt('P5', 'cosine'), wt('P5', 'Sine')];
const tPa = wt('P3', 'Turn');

/* ---------- S: P goes round, the sine graph draws live ---------- */
const ssv = $('#sSv'), SX = 300, SY = 320, SR = 170;
const GX = a => 640 + 880 * a / (2 * PI), GY = v => SY - SR * v;
const bands = [0, 1, 2, 3].map(k => mk(ssv, 'rect', { x: GX(k * PI / 2), y: 140, width: 220, height: 360, fill: C.ac2, 'fill-opacity': 0 }));
const hump = mk(ssv, 'path', { d: '', fill: C.ac2, 'fill-opacity': 0 }), trough = mk(ssv, 'path', { d: '', fill: C.redBg, 'fill-opacity': 0 });
{ let a = `M${GX(0)},${SY}`, b = `M${GX(PI)},${SY}`; for (let i = 0; i <= 60; i++) { const x = PI * i / 60; a += `L${GX(x).toFixed(1)},${GY(Math.sin(x)).toFixed(1)}`; b += `L${GX(PI + x).toFixed(1)},${GY(Math.sin(PI + x)).toFixed(1)}`; } attr(hump, 'd', a + 'Z'); attr(trough, 'd', b + 'Z'); }
const su = UC(ssv, { cx: SX, cy: SY, R: SR, ax: 50, fs: 24, r0: 40 });
const gAx = mk(ssv, 'g', {});
mk(gAx, 'line', { x1: 620, y1: SY, x2: 1544, y2: SY, stroke: C.ink, 'stroke-width': 2 });
mk(gAx, 'line', { x1: 640, y1: 130, x2: 640, y2: 510, stroke: C.ink, 'stroke-width': 2 });
[1, 2, 3, 4].forEach(k => mk(gAx, 'line', { x1: GX(k * PI / 2), y1: 140, x2: GX(k * PI / 2), y2: 500, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
['0', 'π/2', 'π', '3π/2', '2π'].forEach((s, k) => txt(gAx, GX(k * PI / 2), 534, s, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }));
txt(gAx, 628, GY(1) + 6, '1', { 'text-anchor': 'end', 'font-size': 18 }); txt(gAx, 628, GY(-1) + 6, MIN + '1', { 'text-anchor': 'end', 'font-size': 18 });
const bandL = ['I', 'II', 'III', 'IV'].map((s, k) => txt(ssv, GX(k * PI / 2 + PI / 4), 124, s, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600 }));
const ghost = mk(ssv, 'path', { d: '', fill: 'none', stroke: GR, 'stroke-width': 2.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' });
{ let d = ''; for (let i = 0; i <= 120; i++) { const x = 2 * PI * i / 120; d += (i ? 'L' : 'M') + GX(x).toFixed(1) + ',' + GY(Math.sin(x)).toFixed(1); } attr(ghost, 'd', d); }
const curve = mk(ssv, 'path', { d: '', fill: 'none', stroke: SI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const link = mk(ssv, 'line', { stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.85 });
const gDot = mk(ssv, 'circle', { r: 10, fill: SI });
const humpT = txt(ssv, GX(PI / 2), 268, 'sin θ > 0', { class: 'pp', 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: SI });
const trT = txt(ssv, GX(3 * PI / 2), 392, 'sin θ < 0', { class: 'pp', 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: C.red });
const QL = [[452, 152, 'start'], [148, 152, 'end'], [148, 516, 'end'], [452, 516, 'start']], QS = [['+', '+'], [MIN, '+'], [MIN, MIN], ['+', MIN]];
const qLab = QL.map(([x, y, an], k) => { const g = mk(ssv, 'g', { class: 'pp' }); txt(g, x, y - 34, ['I', 'II', 'III', 'IV'][k], { 'text-anchor': an, 'font-size': 18, 'font-weight': 600 });
  const t = mk(g, 'text', { x, y, 'text-anchor': an, 'font-family': 'IBM Plex Mono', 'font-size': 30, 'font-weight': 700, fill: C.ink });
  t.innerHTML = `(<tspan fill="${CO}">${QS[k][0]}</tspan>, <tspan fill="${SI}">${QS[k][1]}</tspan>)`; return g; });
const SEG = [['S2', 'right'], ['S3', 'crosses'], ['S4', 'left'], ['S5', 'back']].map(([id, w]) => [T0(id) + 0.15, wt(id, w) + 0.5]);
const sAng = t => SEG.reduce((a, [s, e]) => a + PI / 2 * M.io((t - s) / (e - s)), 0);
const tQs = [wt('S2', 'Cosine'), wt('S3', 'Cosine'), wt('S4', 'Cosine'), wt('S5', 'Cosine')];

/* ---------- D: the other four signs ---------- */
const DS = [[`${TAN} = ${SIN}\\,/\\,${COS}`, 'tangent is sine divided by cosine'], ['(+)/(+) = +,\\ \\ (-)/(-) = +,\\ \\ (+)/(-) = -', 'same signs give plus, opposite signs give minus'],
  [`${TAN} > 0 \\text{ in I and III}`, 'only there do sin θ and cos θ agree'], [`\\operatorname{cosec}\\theta = 1/${SIN},\\ \\ \\sec\\theta = 1/${COS}`, 'each copies its partner; cot θ copies tan θ']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 104}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${i === 1 ? 32 : 36}px">${K(f)}</div><div class="why" style="top:56px">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Tangent'), wt('D3', 'same'), wt('D4', 'Sine'), wt('D5', 'Cosecant')];
const TB = [[SIN, [1, 1, 0, 0]], [COS, [1, 0, 0, 1]], [TAN, [1, 0, 1, 0]], ['\\operatorname{cosec}\\theta', [1, 1, 0, 0]], ['\\sec\\theta', [1, 0, 0, 1]], ['\\cot\\theta', [1, 0, 1, 0]]];
$('#tb').innerHTML = ['I', 'II', 'III', 'IV'].map((s, j) => `<div class="tbH" style="left:${236 + j * 130}px">${s}</div>`).join('') +
  TB.map(([f, sg], i) => `<div class="tbN" id="tn${i}" style="top:${124 + i * 70}px">${K(f)}</div>` + sg.map((p, j) => `<div class="tbC ${p ? 'p' : 'm'}" id="tc${i}_${j}" style="left:${236 + j * 130}px;top:${127 + i * 70}px">${p ? '+' : MIN}</div>`).join('')).join('');
const tRow = [T0('D1') + 0.4, T0('D1') + 0.7, -1, wt('D5', 'Cosecant'), wt('D5', 'Secant'), wt('D5', 'Cotangent')];
const tTan = j => [1, 0, 1, 0][j] ? wt('D4', 'plus') + (j === 2 ? 0.15 : 0) : wt('D4', 'minus') + (j === 3 ? 0.15 : 0);
const avD = PUC.avatar($('#sD'), { x: 160 + 36, y: 270 + 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'On an axis, sin θ or cos θ is 0: no sign at all.' });

/* ---------- K: 60 vs 120 degrees ---------- */
const ka = UC($('#kaS'), { cx: 220, cy: 300, R: 150, ax: 40, fs: 22, r0: 36 }), kb = UC($('#kbS'), { cx: 220, cy: 300, R: 150, ax: 40, fs: 22, r0: 36 });
ka.set(60 * D2R); kb.set(120 * D2R); ka.lit(0, 1); kb.lit(1, 1);
const kRows = (deg, cv) => `<div class="kv lb" style="top:116px">sin ${deg}°</div><div class="kv big si" style="top:142px">≈ +0.87</div><div class="kv lb" style="top:246px">cos ${deg}°</div><div class="kv big co" style="top:272px">= ${cv}</div>`;
$('#kaR').innerHTML = kRows(60, '+0.50'); $('#kbR').innerHTML = kRows(120, MIN + '0.50');
$('#kbX').style.top = '264px';
const th1 = PUC.think($('#th1'), { q: 'Is cos 200° positive or negative?', opts: ['Positive', 'Negative'], right: 1, why: '200° lies between 180° and 270°: quadrant III. P is left of O, so cos 200° < 0.' });

/* ---------- M: All Sine Tangent Cosine ---------- */
const ms = $('#mS'), MX = 392, MY = 300;
mk(ms, 'line', { x1: MX - 262, y1: MY, x2: MX + 262, y2: MY, stroke: C.ink, 'stroke-width': 2 });
mk(ms, 'line', { x1: MX, y1: MY - 236, x2: MX, y2: MY + 236, stroke: C.ink, 'stroke-width': 2 });
const MB = [[MX + 14, MY - 214, 'A', 'ALL SIX', C.ink], [MX - 14 - 230, MY - 214, 'S', 'SIN θ', SI], [MX - 14 - 230, MY + 14, 'T', 'TAN θ', TA], [MX + 14, MY + 14, 'C', 'COS θ', CO]];
const mBox = MB.map(([x, y, L, w, col], k) => { const g = mk(ms, 'g', {}); const r = mk(g, 'rect', { x, y, width: 230, height: 200, rx: 16, fill: C.soft });
  txt(g, x + 18, y + 34, ['I', 'II', 'III', 'IV'][k], { 'font-size': 20, 'font-weight': 600 });
  const lg = mk(mk(g, 'g', { transform: `translate(${x + 115},${y + 118})` }), 'g', {}); txt(lg, 0, 0, L, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 92, fill: col });
  txt(lg, 0, 50, w, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: col }); return { g, r, lg, col }; });
const mArc = mk(ms, 'path', { d: `M${MX + 40},${MY - 6} A40,40 0 1 0 ${MX + 6},${MY + 40}`, fill: 'none', stroke: TH, 'stroke-width': 4, 'stroke-linecap': 'round' });
const mHead = mk(ms, 'path', { d: `M${MX + 40},${MY - 6} l-12,10 M${MX + 40},${MY - 6} l10,12`, fill: 'none', stroke: TH, 'stroke-width': 4, 'stroke-linecap': 'round' });
const MR = [['I', 'all six are plus'], ['II', K(`${si('\\sin\\theta')},\\ ${si('\\operatorname{cosec}\\theta')}`) + '&nbsp; plus'], ['III', K(`${ta('\\tan\\theta')},\\ ${ta('\\cot\\theta')}`) + '&nbsp; plus'], ['IV', K(`${co('\\cos\\theta')},\\ ${co('\\sec\\theta')}`) + '&nbsp; plus']];
$('#mR').innerHTML = MR.map(([n, q], i) => `<div class="qr" id="mr${i}" style="top:${84 + i * 102}px"><div class="rn">${n}</div><div class="qt">${q}</div></div>`).join('');
const tMr = [wt('M2', 'First'), wt('M2', 'Second'), wt('M2', 'Third'), wt('M2', 'Fourth')], tML = [wt('M3', 'All'), wt('M3', 'Sine'), wt('M3', 'Tangent'), wt('M3', 'Cosine')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{I: all}\\qquad \\text{II: } ${si('\\sin')}\\qquad \\text{III: } ${ta('\\tan')}\\qquad \\text{IV: } ${co('\\cos')}`);

/* ---------- Z: pause and think 2 ---------- */
const th2 = PUC.think($('#th2'), { q: `${K(`${SIN} < 0`)} but ${K(`${TAN} > 0`)}. Which quadrant is P in?`, opts: ['Quadrant II', 'Quadrant III', 'Quadrant IV'], right: 1, why: 'sin θ < 0 only in III and IV. tan θ > 0 only in I and III. Only III has both.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${TQ}\\ \\text{in quadrant II},\\ \\ ${SIN} = \\tfrac{3}{5}`)}<br>Find cos θ and tan θ.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${co('\\cos^2\\theta')} + ${si('\\sin^2\\theta')} = 1`)],
  [K(`${co('\\cos^2\\theta')} = \\tfrac{16}{25} \\;\\Rightarrow\\; ${COS} = \\pm\\tfrac{4}{5}`)],
  [K(`\\text{II: P left of O} \\;\\Rightarrow\\; ${COS} = -\\tfrac{4}{5}`)],
  [K(`${TAN} = \\tfrac{3}{5} \\div \\left(-\\tfrac{4}{5}\\right) = -\\tfrac{3}{4}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'cosine'), wt('W4', 'So'), wt('W5', 'So'), wt('W6', 'Tangent')];
const wsv = $('#wS'), WA = PI - Math.asin(0.6);
const wu = UC(wsv, { cx: 392, cy: 320, R: 186, ax: 40, r0: 40 }); wu.lit(1, 1); wu.set(WA);
attr(wu.cosT, 'fill-opacity', 1); M.setT(wu.cosT, 'cos θ = ' + MIN + '4/5'); M.setT(wu.sinT, 'sin θ = 3/5');
const wLine = mk(wsv, 'line', { x1: 392 - 230, y1: 320 - 0.6 * 186, x2: 392 + 230, y2: 320 - 0.6 * 186, stroke: SI, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wLT = txt(wsv, 392 + 236, 320 - 0.6 * 186 + 6, 'y = 3/5', { 'font-size': 20, 'font-weight': 600, fill: SI });
const wCand = mk(mk(wsv, 'g', { transform: `translate(${392 + 0.8 * 186},${320 - 0.6 * 186})` }), 'g', {});
const wcC = mk(wCand, 'circle', { r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '5 4' });
const wcX = mk(wCand, 'path', { d: 'M-10,-10 L10,10 M10,-10 L-10,10', stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wcT = txt(wCand, 0, -26, 'cos θ = +4/5 ?', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: C.ink2 });
const wPl = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The quadrant chose the sign, not the arithmetic.' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{Quadrant III: everything negative} \\;\\Rightarrow\\; ${TAN} < 0`), right: K(`${TAN} = (-)\\,/\\,(-) > 0`) + '&nbsp; in quadrant III' });
const ts = $('#tS'), tu = UC(ts, { cx: 170, cy: 140, R: 92, ax: 24, lw: 5, fs: 18, r0: 24 }); tu.set(225 * D2R); tu.lit(2, 1); [tu.cosT, tu.sinT, tu.thT].forEach(e => { e.style.display = 'none'; });
const tR = [['sin 225° < 0', SI, 96], ['cos 225° < 0', CO, 136], ['tan 225° = +1', TA, 186]].map(([s, col, y]) => txt(ts, 330, y, s, { 'font-size': 24, 'font-weight': 600, fill: col }));
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'One ratio and the quadrant are given: find the other ratios.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`${TAN} = -\\tfrac{5}{12}\\ \\text{and}\\ ${COS} > 0`)}<br>Find the value of ${K(`13\\,${SIN} + 26\\,${COS}`)}`,
  opts: [K('-29'), K('19'), K('-19'), K('29')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\tan\\theta < 0,\\ \\cos\\theta > 0 \\Rightarrow \\text{IV}`)], [K(`\\text{IV}: \\sin\\theta < 0`)], [K(`5,\\ 12,\\ 13\\ \\text{triangle}`)], [K(`\\sin\\theta = -\\tfrac{5}{13},\\ \\cos\\theta = \\tfrac{12}{13}`)], [K(`-5 + 24 = 19`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Tangent'), wt('A2', 'sine'), wt('A3', 'five'), wt('A4', 'sine'), wt('A5', 'nineteen')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · signs in the four quadrants', y0: 104, dy: 78, txt: [0, 0, 0, 1, 1],
  lines: [K(`P = (${COS},\\ ${SIN}):\\ \\ ${co('\\cos')}\\ \\text{left/right},\\ \\ ${si('\\sin')}\\ \\text{up/down}`),
    K(`\\text{I: all}\\quad \\text{II: } ${si('\\sin,\\ \\operatorname{cosec}')}\\quad \\text{III: } ${ta('\\tan,\\ \\cot')}\\quad \\text{IV: } ${co('\\cos,\\ \\sec')}`),
    K(`${TAN} = ${SIN}\\,/\\,${COS}`),
    'Divide: same signs give <b>plus</b>, opposite signs give <b>minus</b>',
    'The quadrant gives the sign; the triangle gives the size'] });
const YQ = ['In which quadrant are sin θ and cos θ both negative?', 'Is tan 300° positive or negative?', 'Why does cosec θ always have the same sign as sin θ?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 29', topic: 'How big can sin θ ever get? Domain and Range', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const pv = (els, t, t0, gap = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * gap, 1e9, { dy: 0, fade: 0.2 }));

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs(i), tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: the valve */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hw'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = hAng(t), c = Math.cos(a), s = Math.sin(a), vx = HX + (HR - 2) * c, vy = HY - (HR - 2) * s;
    spk.forEach((l, k) => { const b = a + k * PI / 8, cb = Math.cos(b), sb = Math.sin(b); attr(l, 'x1', (HX + 16 * cb).toFixed(1)); attr(l, 'y1', (HY - 16 * sb).toFixed(1)); attr(l, 'x2', (HX + (HR - 16) * cb).toFixed(1)); attr(l, 'y2', (HY - (HR - 16) * sb).toFixed(1)); });
    attr(hVal, 'cx', vx.toFixed(1)); attr(hVal, 'cy', vy.toFixed(1));
    attr(hCos, 'x1', HX); attr(hCos, 'y1', HY); attr(hCos, 'x2', vx.toFixed(1)); attr(hCos, 'y2', HY);
    attr(hSin, 'x1', vx.toFixed(1)); attr(hSin, 'y1', HY); attr(hSin, 'x2', vx.toFixed(1)); attr(hSin, 'y2', vy.toFixed(1));
    const lg = wt('H2', 'above') - 0.1; M.vis(hSin, t, lg, 1e9, { dy: 0, fade: 0.3 }); M.vis(hCos, t, wt('H2', 'right') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    const v1 = $('#hV1'), v2 = $('#hV2');
    M.setT(v1, c >= 0 ? 'RIGHT  +' : 'LEFT  ' + MIN); v1.style.background = CO;
    M.setT(v2, s >= 0 ? 'ABOVE  +' : 'BELOW  ' + MIN); v2.style.background = SI;
    M.vis($('#hL2'), t, lg, 1e9, { dy: 10 }); M.vis(v2, t, lg + 0.1, 1e9, POP);
    M.vis($('#hL1'), t, wt('H2', 'right') - 0.1, 1e9, { dy: 10 }); M.vis(v1, t, wt('H2', 'right'), 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'below') - 0.1, 1e9, POP);
  }

  /* P: recall */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pc'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(pu.xa, t, tP1 + 0.2, 0.6); M.draw(pu.ya, t, tP1 + 0.4, 0.6);
    M.draw(pu.circ, t, wt('P1', 'circle') - 0.1, 0.9); M.vis(p1, t, wt('P1', 'radius'), 1e9, { dy: 0 }); M.vis(pO, t, wt('P1', 'origin') - 0.1, 1e9, { dy: 0 });
    const a = 40 * D2R * M.io((t - tPa) / 1.2); pu.set(a);
    attr(p1, 'x', (392 + 93 * Math.cos(a) - 14).toFixed(1)); attr(p1, 'y', (306 - 93 * Math.sin(a) - 12).toFixed(1));
    pv([pu.rad, pu.arc, pu.thT, pu.P], t, tPa - 0.1, 0.05); M.vis(pu.pT, t, wt('P3', 'point'), 1e9, { dy: 0 });
    M.vis(pu.cosL, t, wt('P4', 'cosine') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(pu.cosT, t, wt('P4', 'cosine'), 1e9, { dy: 0 });
    M.vis(pu.sinL, t, wt('P4', 'sine') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(pu.sinT, t, wt('P4', 'sine'), 1e9, { dy: 0 });
    const tSg = [wt('P5', 'Right', 1), wt('P5', 'Left', 1), wt('P5', 'up', 1), wt('P5', 'down', 1)];
    pSg.forEach((e, i) => M.vis(e, t, tSg[i] - 0.05, 1e9, { ...POP, sc: 0.4 }));
    M.vis($('#pp'), t, wt('P1', 'radius') - 0.4, out, { dx: 60, dy: 0, ...o });
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.8); M.vis(el.querySelector('.why'), t, tPs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tPs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
  }

  /* S: P goes round + live sine graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sc'), t, tS1 + 0.05, out, { dy: 36, ...o });
    const a = sAng(t), r = su.set(a);
    pv([su.xa, su.ya, su.circ, su.rad, su.P, su.pT, su.cosL, su.sinL, su.cosT, su.sinT, su.arc, su.thT], t, tS1 + 0.2, 0.02);
    M.vis(gAx, t, tS1 + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(ghost, t, tS1 + 0.6, 1e9, { dy: 0, fade: 0.4 });
    bandL.forEach((e, k) => M.vis(e, t, tS1 + 0.5 + k * 0.06, 1e9, { dy: 0 }));
    let d = ''; const n = Math.max(2, Math.ceil(a / (2 * PI) * 120)); if (a > 0.005) for (let i = 0; i <= n; i++) { const x = a * i / n; d += (i ? 'L' : 'M') + GX(x).toFixed(1) + ',' + GY(Math.sin(x)).toFixed(1); }
    attr(curve, 'd', d);
    attr(gDot, 'cx', GX(a).toFixed(1)); attr(gDot, 'cy', GY(r.s).toFixed(1));
    attr(link, 'x1', r.px.toFixed(1)); attr(link, 'y1', r.py.toFixed(1)); attr(link, 'x2', GX(a).toFixed(1)); attr(link, 'y2', GY(r.s).toFixed(1));
    M.vis(gDot, t, wt('S1', 'travel'), 1e9, { dy: 0, fade: 0.2 }); M.vis(link, t, wt('S1', 'travel'), 1e9, { dy: 0, fade: 0.2 });
    for (let k = 0; k < 4; k++) { const u = M.io((t - SEG[k][0]) / 0.3) * (k < 3 ? 1 - M.io((t - SEG[k + 1][0]) / 0.3) : 1 - M.io((t - T0('S6')) / 0.3)); su.lit(k, u); attr(bands[k], 'fill-opacity', (0.7 * u).toFixed(3)); bandL[k].setAttribute('fill', mix(C.mute, SI, u)); }
    qLab.forEach((g, k) => M.vis(g, t, tQs[k] - 0.1, 1e9, { ...POP, sc: 0.6 }));
    M.vis($('#sRo'), t, wt('S1', 'travel'), 1e9, { dy: 10 });
    M.setT($('#rT'), Math.round(a / D2R) + '°'); M.setT($('#rC'), sg(r.c)); M.setT($('#rS'), sg(r.s));
    const tUp = wt('S6', 'above'), tDn = wt('S6', 'below');
    attr(hump, 'fill-opacity', (0.9 * M.io((t - tUp + 0.1) / 0.4)).toFixed(3)); attr(trough, 'fill-opacity', (0.9 * M.io((t - tDn + 0.1) / 0.4)).toFixed(3));
    M.vis(humpT, t, tUp, 1e9, POP); M.vis(trT, t, tDn, 1e9, POP);
  }

  /* D: derive the other signs */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, wt('D2', 'Step') - 0.4, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 104]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, T1('D5') + 0.1, { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 12).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.05, out, { dx: 60, dy: 0, ...o });
    TB.forEach((_, i) => { const t0 = i === 2 ? tDs[0] : tRow[i]; M.vis($('#tn' + i), t, t0 - 0.1, 1e9, { dx: -12, dy: 0 });
      for (let j = 0; j < 4; j++) M.vis($(`#tc${i}_${j}`), t, i === 2 ? tTan(j) : t0 + j * 0.08, 1e9, { ...POP, sc: 0.5 }); });
    const rowY = M.track(124 + 2 * 70, [[tRow[3] - 0.1, 124 + 3 * 70], [tRow[4] - 0.1, 124 + 4 * 70], [tRow[5] - 0.1, 124 + 5 * 70]], M.SOFT)(t);
    const tb = $('#tHi'); M.vis(tb, t, tDs[0] - 0.1, T1('D5') + 0.1, { dy: 0, fade: 0.2, ody: 0 }); tb.style.top = (rowY - 3).toFixed(1) + 'px';
    avD(t, T1('D5') + 0.2, out);
  }

  /* K: 60 vs 120, then pause and think */
  const kOn = t >= tK1 - 0.1 && t < tM1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ra = $('#kaR').children, rb = $('#kbR').children;
    M.vis(ra[0], t, wt('K1', 'Sine') - 0.1, 1e9, { dy: 10 }); M.vis(ra[1], t, wt('K1', 'Sine'), 1e9, POP);
    M.vis(ra[2], t, wt('K1', 'cosine') - 0.1, 1e9, { dy: 10 }); M.vis(ra[3], t, wt('K1', 'cosine'), 1e9, POP);
    M.vis($('#kaP'), t, wt('K1', 'half') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(rb[0], t, wt('K2', 'sine') - 0.1, 1e9, { dy: 10 }); M.vis(rb[1], t, wt('K2', 'sine'), 1e9, POP);
    M.vis(rb[2], t, wt('K2', 'cosine') - 0.1, 1e9, { dy: 10 }); M.vis(rb[3], t, wt('K2', 'cosine'), 1e9, POP);
    M.vis($('#kbX'), t, wt('K2', 'flips') - 0.05, 1e9, { dy: 0, fade: 0.25 });
    M.vis($('#kbP'), t, T0('K3'), 1e9, POP);
    M.vis($('#th1'), t, tK4 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'positive') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Two') });
  }

  /* M: All Sine Tangent Cosine */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#ml'), t, tM1 + 0.05, 1e9, { dx: -60, dy: 0 });
    M.draw(mArc, t, wt('M1', 'anticlockwise') - 0.1, 0.7); M.vis(mHead, t, wt('M1', 'anticlockwise') + 0.5, 1e9, { dy: 0 });
    mBox.forEach((b, k) => { M.vis(b.g, t, tM1 + 0.3 + k * 0.08, 1e9, { dy: 0, fade: 0.2 }); const u = M.io((t - tMr[k] + 0.05) / 0.3); attr(b.r, 'fill', mix(C.soft, k === 0 ? '#E3E6EE' : mix(b.col, '#FFFFFF', 0.86), u)); M.vis(b.lg, t, tML[k] - 0.05, 1e9, { ...POP, sc: 0.4 }); });
    M.vis($('#mr'), t, tMr[0] - 0.5, 1e9, { dx: 60, dy: 0 });
    MR.forEach((_, i) => M.vis($('#mr' + i), t, tMr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#mP'), t, wt('M3', 'Students') - 0.1, 1e9, POP);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'All') - 0.05, { st: 0.12, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Cosine') + 0.2, 0.8);
  }

  /* Z: pause and think 2 */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'Which') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'Sine') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    pv([wu.xa, wu.ya, wu.circ], t, T0('W2') + 0.5, 0.06); wu.lit(1, M.io((t - wt('W2', 'second')) / 0.4));
    M.vis(wLine, t, wt('W2', 'three') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(wLT, t, wt('W2', 'three'), 1e9, { dy: 0 });
    const tC = wt('W4', 'plus'), tL = wt('W5', 'left');
    M.vis(wCand, t, tC - 0.1, 1e9, { ...POP, sc: 0.4 });
    const bad = M.io((t - tL) / 0.3); attr(wcC, 'stroke', mix(C.ink, C.red, bad)); attr(wcT, 'fill', mix(C.ink2, C.red, bad)); M.vis(wcX, t, tL, 1e9, { ...POP, sc: 0.3 });
    pv([wu.rad, wu.P, wu.pT, wu.arc, wu.thT], t, tC, 0.05);
    M.vis(wu.cosL, t, tL - 0.05, 1e9, { dy: 0, fade: 0.3 }); M.vis(wu.cosT, t, tL + 0.2, 1e9, { dy: 0 });
    M.vis(wu.sinL, t, tC, 1e9, { dy: 0, fade: 0.3 }); M.vis(wu.sinT, t, tC + 0.2, 1e9, { dy: 0 });
    wPl(t, T0('W7') - 0.1, out);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'sine') - 0.1, tRight: wt('X3', 'plus') - 0.1 });
    M.vis(tu.g, t, wt('X2', 'third'), 1e9, { dy: 0, fade: 0.3 });
    M.vis(tR[0], t, wt('X3', 'minus') - 0.1, 1e9, { dx: -10, dy: 0 }); M.vis(tR[1], t, wt('X3', 'minus', 1) - 0.1, 1e9, { dx: -10, dy: 0 }); M.vis(tR[2], t, wt('X3', 'plus', 1) - 0.1, 1e9, { dx: -10, dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'one') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
