// PUC Maths Ep 26: Unit circle and angle measurement (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Chapter 3): angle theta violet, radius / terminal side ink, unit circle grey, wrong red
const TH = C.violet, CIR = '#8C93A3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const th = s => `\\textcolor{${TH}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const f2 = v => v.toFixed(2), TAU = 2 * Math.PI, D2R = Math.PI / 180;
const P = (cx, cy, R, a) => [cx + R * Math.cos(a), cy - R * Math.sin(a)];
const arcD = (cx, cy, R, a0, a1) => {
  if (a1 < a0) [a0, a1] = [a1, a0];
  if (a1 - a0 < 1e-4) return '';
  if (a1 - a0 >= TAU - 1e-4) { const [x, y] = P(cx, cy, R, a0), [x2, y2] = P(cx, cy, R, a0 + Math.PI); return `M${f2(x)},${f2(y)} A${R},${R} 0 1 0 ${f2(x2)},${f2(y2)} A${R},${R} 0 1 0 ${f2(x)},${f2(y)}`; }
  const [x0, y0] = P(cx, cy, R, a0), [x1, y1] = P(cx, cy, R, a1);
  return `M${f2(x0)},${f2(y0)} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 0 ${f2(x1)},${f2(y1)}`;
};
// spiral trail for angles beyond one turn: radius grows k px per full turn
const spiralD = (cx, cy, r0, k, a0, a) => { const n = Math.max(2, Math.ceil(Math.abs(a - a0) / 0.06)); let d = ''; for (let i = 0; i <= n; i++) { const s = a0 + (a - a0) * i / n, r = r0 + k * Math.abs(s - a0) / TAU; const [x, y] = P(cx, cy, r, s); d += (i ? 'L' : 'M') + f2(x) + ',' + f2(y); } return d; };
// arrow head at the end of an arc (direction dir = +1 anticlockwise, -1 clockwise)
const headD = (cx, cy, r, a, dir, s = 13) => { const [x, y] = P(cx, cy, r, a), tx = -Math.sin(a) * dir, ty = -Math.cos(a) * dir, nx = Math.cos(a), ny = -Math.sin(a);
  return `M${f2(x + tx * s * 0.9)},${f2(y + ty * s * 0.9)} L${f2(x + nx * s * 0.55)},${f2(y + ny * s * 0.55)} L${f2(x - nx * s * 0.55)},${f2(y - ny * s * 0.55)} Z`; };
// the unit circle stage: axes, circle, O, A
const UC = (svg, cx, cy, R, o = {}) => {
  const e = o.ext ?? 56, g = mk(svg, 'g', {});
  const ax = mk(g, 'line', { x1: cx - R - e, y1: cy, x2: cx + R + e, y2: cy, stroke: C.ink, 'stroke-width': 2 });
  const ay = mk(g, 'line', { x1: cx, y1: cy + R + e, x2: cx, y2: cy - R - e, stroke: C.ink, 'stroke-width': 2 });
  const hx = mk(g, 'path', { d: `M${cx + R + e + 2},${cy} l-12,-6 v12 z`, fill: C.ink }), hy = mk(g, 'path', { d: `M${cx},${cy - R - e - 2} l-6,12 h12 z`, fill: C.ink });
  const lx = txt(g, cx + R + e - 4, cy + 30, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink2, 'text-anchor': 'end' });
  const ly = txt(g, cx + 14, cy - R - e + 16, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink2 });
  const cir = mk(g, 'circle', { cx, cy, r: R, fill: 'none', stroke: CIR, 'stroke-width': 2.5 });
  const lo = txt(g, cx - 12, cy + 28, 'O', { 'font-family': 'Poppins', 'font-size': 22, fill: C.ink2, 'font-weight': 600, 'text-anchor': 'end' });
  const ad = mk(g, 'circle', { cx: cx + R, cy, r: 6, fill: C.ink });
  const la = txt(g, cx + R + 10, cy + 28, o.aLabel ?? 'A', { 'font-family': 'Poppins', 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
  return { g, ax, ay, hx, hy, lx, ly, cir, lo, ad, la };
};
// an angle on a unit circle: ray to P, violet arc with a head, P dot
const ANG = (svg, cx, cy, R, ra = 46) => {
  const arc = mk(svg, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 5, 'stroke-linecap': 'round' });
  const hd = mk(svg, 'path', { d: '', fill: TH });
  const ray = mk(svg, 'line', { x1: cx, y1: cy, x2: cx + R, y2: cy, stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
  const p = mk(svg, 'circle', { cx: cx + R, cy, r: 9, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
  return { arc, hd, ray, p, set(a, spiral) {
    const [x, y] = P(cx, cy, R, a); attr(ray, 'x2', f2(x)); attr(ray, 'y2', f2(y)); attr(p, 'cx', f2(x)); attr(p, 'cy', f2(y));
    if (Math.abs(a) < 0.03) { attr(arc, 'd', ''); attr(hd, 'd', ''); return; }
    if (spiral) { attr(arc, 'd', spiralD(cx, cy, ra, spiral, 0, a)); const r = ra + spiral * Math.abs(a) / TAU; attr(hd, 'd', headD(cx, cy, r, a, Math.sign(a))); }
    else { attr(arc, 'd', arcD(cx, cy, ra, 0, a)); attr(hd, 'd', headD(cx, cy, ra, a, Math.sign(a))); }
  } };
};
const wheel = (svg, r) => {
  const o = mk(svg, 'g', {}), g = mk(o, 'g', {});
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; mk(g, 'line', { x1: 0, y1: 0, x2: f2((r - 10) * Math.cos(a)), y2: f2((r - 10) * Math.sin(a)), stroke: '#A3A9B6', 'stroke-width': 2 }); }
  mk(g, 'circle', { r: r - 9, fill: 'none', stroke: C.ink2, 'stroke-width': 3 });
  mk(g, 'circle', { r: r - 3, fill: 'none', stroke: C.ink, 'stroke-width': 9 });
  mk(g, 'circle', { r: 10, fill: C.ink });
  mk(g, 'circle', { cx: 0, cy: -(r - 14), r: 9, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
  return { o, g, set(x, y, phi) { attr(o, 'transform', `translate(${f2(x)},${f2(y)})`); attr(g, 'transform', `rotate(${(-phi / D2R).toFixed(3)})`); } };
};
const sgn = d => (d > 0.5 ? '+' : d < -0.5 ? '-' : '') + Math.abs(Math.round(d)) + '°';

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tU2 = T0('U2'), tS1 = T0('S1'), tK1 = T0('K1'), tG1 = T0('G1'), tR1 = T0('R1'), tD1 = T0('D1'), tT = T0('T1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tZ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ANTICLOCKWISE', '+90°'], ['CLOCKWISE', '-90°'], ['MORE THAN A TURN', '420°']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${TH}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'round') - 0.05, wt('H1', 'other') - 0.1, wt('H1', 'other') + 0.5];

/* ---------- H: the valve turns both ways ---------- */
const hs = $('#hS'), HX = 392, HY = 300, HR = 150;
const hArc = mk(hs, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 6, 'stroke-linecap': 'round' }), hHd = mk(hs, 'path', { d: '', fill: TH });
const hW = wheel(hs, HR); hW.set(HX, HY, 0);
const hPhi = M.track(0, [[tMorph + 0.4, 150 * D2R], [tH3 + 1.2, -150 * D2R], [wt('H5', 'positive') - 0.2, 120 * D2R], [wt('H5', 'negative') - 0.2, -120 * D2R]], M.HEAVY);

/* ---------- U: the unit circle ---------- */
const UR = [['CENTRE', 'O, the origin (0, 0)'], ['RADIUS', '1 unit'], ['START POINT', 'A = (1, 0)'], ['INITIAL SIDE', 'the ray OA'], ['TERMINAL SIDE', 'where the ray stops: OP']];
$('#uRows').innerHTML = UR.map(([a, b], i) => `<div class="an" id="ur${i}" style="top:${84 + i * 84}px"><b>${a}</b>${b}</div>`).join('');
const tUr = [wt('U2', 'origin'), wt('U2', 'radius'), wt('U3', 'A'), wt('U3', 'initial'), wt('U4', 'terminal')];
const us = $('#uS'), UX = 392, UY = 296, URd = 180;
const uC = UC(us, UX, UY, URd); const uRad = txt(us, UX + URd / 2, UY + 30, '1', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const uA = ANG(us, UX, UY, URd); const uPL = txt(us, 0, 0, 'P', { 'font-family': 'Poppins', 'font-size': 24, fill: C.ink, 'font-weight': 700, 'text-anchor': 'middle' });
const uIL = txt(us, UX + URd - 70, UY - 14, 'initial side', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const uTL = txt(us, 0, 0, 'terminal side', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const uAng = t => 50 * D2R * M.io((t - wt('U4', 'Turn')) / 1.2);

/* ---------- S: positive vs negative ---------- */
const mkSide = (id, dir) => { const s = $(id), cx = 392, cy = 270, R = 150; UC(s, cx, cy, R, { ext: 44 }); const a = ANG(s, cx, cy, R, 50); return a; };
const sP = mkSide('#spS', 1), sN = mkSide('#snS', -1);
const tSp = wt('S1', 'anticlockwise'), tSn = wt('S2', 'clockwise');
const th1 = PUC.think($('#th1'), { q: 'Where does -270° end: at the top or at the bottom?', opts: ['At the top', 'At the bottom'], right: 0, why: 'Three quarter turns clockwise: down, left, then up. It ends where +90° ends.' });

/* ---------- G: quadrants + 420 ---------- */
const gq = $('#gqS'), GX = 392, GY = 296, GR = 170;
const gQ = [[GX, GY - 230, 300, 230], [GX - 300, GY - 230, 300, 230], [GX - 300, GY, 300, 240], [GX, GY, 300, 240]].map(([x, y, w, h]) => mk(gq, 'rect', { x, y, width: w, height: h, fill: mix(TH, '#FFFFFF', 0.9), opacity: 0 }));
UC(gq, GX, GY, GR, { ext: 50 });
const gQL = ['I', 'II', 'III', 'IV'].map((s, i) => txt(gq, GX + [1, -1, -1, 1][i] * 116, GY + [-1, -1, 1, 1][i] * 100 + 14, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 40, fill: '#B8BCC6', 'font-weight': 700 }));
const gA = ANG(gq, GX, GY, GR, 46);
const gAngL = txt(gq, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 22, fill: TH, 'font-weight': 600 });
const gAng = M.track(0, [[wt('G2', 'Sixty') - 0.2, 60 * D2R], [wt('G2', 'hundred') - 0.2, 150 * D2R]], M.HEAVY);
const gm = $('#gmS'), MX = 392, MY = 270, MR = 170;
UC(gm, MX, MY, MR, { ext: 40 });
const gG = mk(mk(gm, 'g', {}), 'g', {}); const [g6x, g6y] = P(MX, MY, MR + 30, 60 * D2R);
mk(gG, 'line', { x1: MX, y1: MY, x2: f2(g6x), y2: f2(g6y), stroke: TH, 'stroke-width': 3, 'stroke-dasharray': '8 6' }); txt(gG, f2(g6x + 6), f2(g6y - 8), '60°', { 'font-size': 22, fill: TH, 'font-weight': 600 });
const gM = ANG(gm, MX, MY, MR, 40);
const gm0 = wt('G3', 'keep'), gm1 = wt('G3', 'sixty') - 0.1;
const gmAng = t => 420 * D2R * M.io((t - gm0) / Math.max(1, gm1 - gm0));

/* ---------- R: wrap the number line ---------- */
const RRW = [['ZERO', 'sits on the point A'], ['POSITIVE', 'wrap anticlockwise'], ['NEGATIVE', 'wrap clockwise'], ['RESULT', 'number x ↔ angle of x radians']];
$('#rRows').innerHTML = RRW.map(([a, b], i) => `<div class="an" id="rw${i}" style="top:${84 + i * 84}px"><b>${a}</b>${b}</div>`).join('') + `<div class="pillp ac" id="rP" style="left:36px;top:440px">2π lands back on A after one lap</div>`;
const tRw = [wt('R2', 'Zero'), wt('R3', 'positive'), wt('R3', 'negative'), wt('R6', 'radian')];
const rs = $('#rS'), RX = 320, RY = 268, RR = 112;
const clip = mk(mk(rs, 'defs', {}), 'clipPath', { id: 'rClip' }); mk(clip, 'rect', { x: 20, y: 66, width: 744, height: 392 });
const rG = mk(rs, 'g', { 'clip-path': 'url(#rClip)' });
mk(rG, 'circle', { cx: RX, cy: RY, r: RR, fill: 'none', stroke: CIR, 'stroke-width': 2 });
mk(rG, 'line', { x1: RX - RR - 40, y1: RY, x2: RX + RR + 40, y2: RY, stroke: C.line, 'stroke-width': 2 });
mk(rG, 'circle', { cx: RX, cy: RY, r: 5, fill: C.ink });
const r1Arc = mk(rG, 'path', { d: arcD(RX, RY, 36, 0, 1), fill: 'none', stroke: TH, 'stroke-width': 4 });
const r1L = txt(rG, f2(P(RX, RY, 64, 0.5)[0]), f2(P(RX, RY, 64, 0.5)[1] + 7), '1 rad', { 'text-anchor': 'middle', 'font-size': 18, fill: TH, 'font-weight': 600 });
const rLine = mk(rG, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
const RT = []; for (let v = -4; v <= 7; v++) { const tk = mk(rG, 'line', { stroke: C.ink, 'stroke-width': 2.5 }); const lb = txt(rG, 0, 0, String(v), { 'text-anchor': 'middle', 'font-size': 18, fill: v < 0 ? C.mute : C.ink, 'font-weight': 600 }); RT.push({ v, tk, lb }); }
const r2pi = mk(rG, 'circle', { r: 9, fill: 'none', stroke: TH, 'stroke-width': 3 }), r2piL = txt(rG, 0, 0, '2π', { 'text-anchor': 'middle', 'font-size': 22, fill: TH, 'font-weight': 600 });
const r1D = mk(rG, 'circle', { r: 8, fill: TH });
const Lp = M.track(0, [[wt('R3', 'Wrap'), 0.5], [wt('R4', 'one') - 0.1, 1], [wt('R5', 'Two') - 0.2, TAU]], M.HEAVY);
const Ln = M.track(0, [[wt('R3', 'negative'), 0.5], [wt('R5', 'Minus') - 0.1, 1]], M.HEAVY);
const rPos = (s, lp, ln) => {
  if (s >= 0) { if (s <= lp) { const [x, y] = P(RX, RY, RR, s); return [x, y, Math.cos(s), -Math.sin(s)]; } const [x, y] = P(RX, RY, RR, lp), d = (s - lp) * RR; return [x - Math.sin(lp) * d, y - Math.cos(lp) * d, Math.cos(lp), -Math.sin(lp)]; }
  const a = -s; if (a <= ln) { const [x, y] = P(RX, RY, RR, s); return [x, y, Math.cos(s), -Math.sin(s)]; } const [x, y] = P(RX, RY, RR, -ln), d = (a - ln) * RR; return [x - Math.sin(ln) * d, y + Math.cos(ln) * d, Math.cos(-ln), -Math.sin(-ln)];
};

/* ---------- D: same end point proof ---------- */
const DS = [[`${th('\\theta')} + 2\\pi`, 'once round anticlockwise: back to the start'], [`${th('\\theta')} - 2\\pi`, 'once round clockwise: back to the start'],
  [`${th('\\theta')} + 2n\\pi, \\quad n \\in \\mathbb{Z}`, 'any whole number of turns (n an integer)'], [`2n\\pi + ${th('\\theta')}\\ \\text{ and }\\ ${th('\\theta')} \\text{: same point}`, 'the full-turn rule']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="pf" id="ds${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), T0('D5')];
const dsv = $('#dS'), DX = 392, DY = 270, DR = 170, TH0 = Math.PI / 3;
UC(dsv, DX, DY, DR, { ext: 40 });
const dTr = mk(dsv, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 4, 'stroke-linecap': 'round' });
const dRay = mk(dsv, 'line', { x1: DX, y1: DY, x2: DX, y2: DY, stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const dP = mk(dsv, 'circle', { r: 9, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
const [dpx, dpy] = P(DX, DY, DR + 26, TH0); const dPL = txt(dsv, f2(dpx), f2(dpy), 'P', { 'font-family': 'Poppins', 'font-size': 24, fill: C.ink, 'font-weight': 700, 'text-anchor': 'middle' });
const dAk = [[tDs[0] + 0.2, TH0 + TAU], [tDs[1] + 0.2, TH0 - TAU], [tDs[2] + 0.4, TH0 + 2 * TAU], [tDs[3] + 0.2, TH0]];
const dAl = M.track(TH0, dAk, M.HEAVY);
const dFrom = t => { let f = TH0; for (const [k] of dAk) if (t >= k) f = null; return f; };

/* ---------- W: -1000 degrees ---------- */
$('#wq').innerHTML = `Where does ${K(th('-1000^\\circ'))} end? Find its quadrant, and the angle from ${K('0^\\circ')} to ${K('360^\\circ')} with the same end point.`;
const wsol = PUC.solution($('#wl'), [['Negative: the ray turns clockwise'], ['Full turns keep the end point: add 360°'], [K(`${th('-1000^\\circ')} + 3 \\times 360^\\circ = ${th('80^\\circ')}`)], [K(`0^\\circ < ${th('80^\\circ')} < 90^\\circ \\;\\Rightarrow\\; \\text{Quadrant I}`)], ['2 full turns back, then 280° more']], { label: 'WORKED EXAMPLE', y0: 200, dy: 74 });
$('#wl .lbl').style.top = '30px';
const ws = $('#wS'), WX = 392, WY = 270, WR = 170;
UC(ws, WX, WY, WR, { ext: 40 });
['I', 'II', 'III', 'IV'].forEach((s, i) => txt(ws, WX + [1, -1, -1, 1][i] * 112, WY + [-1, -1, 1, 1][i] * 96 + 12, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 34, fill: '#D0D3DA', 'font-weight': 700 }));
const wG = mk(mk(ws, 'g', {}), 'g', {}); const [w8x, w8y] = P(WX, WY, WR + 30, 80 * D2R);
txt(wG, f2(w8x + 4), f2(w8y + 4), '80°', { 'font-size': 22, fill: TH, 'font-weight': 600 });
const wA = ANG(ws, WX, WY, WR, 34);
const w0 = wt('W3', 'clockwise'), w1 = Math.max(w0 + 4, T1('W5'));
const wAng = t => -1000 * D2R * M.io((t - w0) / (w1 - w0));
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'Step'), wt('W7', 'Two')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\tfrac{5\\pi}{4}\\ \\text{and}\\ \\tfrac{\\pi}{4}\\ \\text{end at the same point}`), right: K(`\\tfrac{5\\pi}{4} - \\tfrac{\\pi}{4} = \\pi`) + '&nbsp; half a turn: opposite points' });
const ts = $('#tS'), TCX = 150, TCY = 140, TR = 92;
const tG = mk(mk(ts, 'g', {}), 'g', {});
mk(tG, 'line', { x1: TCX - TR - 20, y1: TCY, x2: TCX + TR + 20, y2: TCY, stroke: C.line, 'stroke-width': 2 }); mk(tG, 'line', { x1: TCX, y1: TCY - TR - 20, x2: TCX, y2: TCY + TR + 20, stroke: C.line, 'stroke-width': 2 });
mk(tG, 'circle', { cx: TCX, cy: TCY, r: TR, fill: 'none', stroke: CIR, 'stroke-width': 2.5 });
const [q1x, q1y] = P(TCX, TCY, TR, Math.PI / 4), [q5x, q5y] = P(TCX, TCY, TR, 5 * Math.PI / 4);
mk(tG, 'line', { x1: f2(q1x), y1: f2(q1y), x2: f2(q5x), y2: f2(q5y), stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
mk(tG, 'circle', { cx: f2(q1x), cy: f2(q1y), r: 9, fill: C.ink }); mk(tG, 'circle', { cx: f2(q5x), cy: f2(q5y), r: 9, fill: C.red });
txt(tG, f2(q1x + 14), f2(q1y - 8), 'π/4', { 'font-size': 20, fill: C.ink, 'font-weight': 600 }); txt(tG, f2(q5x - 14), f2(q5y + 30), '5π/4', { 'text-anchor': 'end', 'font-size': 20, fill: C.red, 'font-weight': 600 });
txt(tG, 290, 132, 'differ by π:', { 'font-size': 22, fill: C.ink2, 'font-weight': 600 }); txt(tG, 290, 166, 'opposite sides', { 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Find the quadrant of an angle, or the angle in [0, 2π) with the same end point.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `How many of these angles end at the same point as ${K(th('\\tfrac{\\pi}{3}'))} on the unit circle?<br>${K('\\tfrac{7\\pi}{3},\\quad -\\tfrac{5\\pi}{3},\\quad \\tfrac{4\\pi}{3},\\quad \\tfrac{13\\pi}{3},\\quad -\\tfrac{\\pi}{3}')}`,
  opts: ['1', '2', '3', '4'], right: 2, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K('\\text{same point} \\iff \\text{difference} = 2n\\pi')], [K('\\tfrac{7\\pi}{3}: 2\\pi \\;\\checkmark \\quad -\\tfrac{5\\pi}{3}: -2\\pi \\;\\checkmark')], [K('\\tfrac{13\\pi}{3}: 4\\pi \\;\\checkmark')], [K(`\\tfrac{4\\pi}{3}: \\pi \\;${red('\\times')} \\quad -\\tfrac{\\pi}{3}: -\\tfrac{2\\pi}{3} \\;${red('\\times')}`)], ['3 angles match']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Subtract'), wt('A3', 'Seven'), wt('A3', 'Thirteen'), wt('A4', 'Four'), wt('A4', 'only')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · the unit circle', y0: 98, dy: 76, txt: [1, 1, 1, 0, 1],
  lines: ['<b>Unit circle</b>: centre O at the origin, radius 1, angles start at A(1, 0)',
    '<b>Anticlockwise</b> = positive · <b>clockwise</b> = negative',
    '<b>Quadrant</b>: where the terminal side lands (I to IV, anticlockwise)',
    K(`${th('\\theta')}\\ \\text{and}\\ 2n\\pi + ${th('\\theta')}\\ (n \\in \\mathbb{Z})\\ \\text{end at the same point}`),
    'Every real number x is an angle of x radians'] });
const YQ = ['Is an angle measured clockwise positive or negative?', 'In which quadrant does 700° end?', 'Which real number lands back on A after one full lap?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 27', topic: 'How high is the valve? That height is called sine.', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tR4 = T0('R4');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR4 - 0.1, 1.08, 1330, 540], [T0('R5') + 0.4, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tU2 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('U2');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const ph = hPhi(t); hW.set(HX, HY, ph);
    const a0 = Math.PI / 2, rr = HR + 22; attr(hArc, 'd', Math.abs(ph) > 0.03 ? arcD(HX, HY, rr, a0, a0 + ph) : ''); attr(hHd, 'd', Math.abs(ph) > 0.05 ? headD(HX, HY, rr, a0 + ph, Math.sign(ph)) : '');
    const showS = t >= wt('H5', 'sign') - 0.1; M.setT($('#hRd span'), showS ? sgn(ph / D2R) : '?');
    M.vis($('#hRd'), t, wt('H4', 'number') - 0.1, 1e9, { dy: 10 });
    M.vis($('#hP'), t, wt('H4', 'which') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'wheeling') - 0.1, 1e9, POP);
  }

  /* U */
  const uOn = t >= tU2 - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('S1');
    M.vis($('#ul'), t, tU2 + 0.1, out, { dx: -60, dy: 0, ...o });
    UR.forEach((_, i) => M.vis($('#ur' + i), t, tUr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#ur'), t, tU2 + 0.2, out, { dx: 60, dy: 0, ...o });
    const ta = wt('U2', 'axes') - 0.1; [uC.ax, uC.ay].forEach(e => M.draw(e, t, ta, 0.6)); [uC.hx, uC.hy, uC.lx, uC.ly].forEach(e => M.vis(e, t, ta + 0.5, 1e9, { dy: 0 }));
    M.draw(uC.cir, t, wt('U2', 'circle') - 0.1, 0.9); M.vis(uC.lo, t, wt('U2', 'origin'), 1e9, { dy: 0 }); M.vis(uRad, t, wt('U2', 'radius'), 1e9, { dy: 0 });
    M.vis(uC.ad, t, tUr[2] - 0.05, 1e9, POP); M.vis(uC.la, t, tUr[2], 1e9, { dy: 0 });
    const a = uAng(t); uA.set(a); [uA.ray, uA.p].forEach(e => M.vis(e, t, tUr[3] - 0.1, 1e9, { dy: 0, fade: 0.15 })); M.vis(uIL, t, tUr[3], wt('U4', 'Turn'), { dy: 0 });
    const [px, py] = P(UX, UY, URd + 28, a); attr(uPL, 'x', f2(px)); attr(uPL, 'y', f2(py + 6)); M.vis(uPL, t, wt('U4', 'ends'), 1e9, { dy: 0 });
    const [tx, ty] = P(UX, UY, URd * 0.55, a + 0.16); attr(uTL, 'x', f2(tx)); attr(uTL, 'y', f2(ty)); M.vis(uTL, t, tUr[4], 1e9, { dy: 0 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tG1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#sp'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ap = 90 * D2R * M.io((t - tSp) / 1.1); sP.set(ap); M.setT($('#spB'), sgn(ap / D2R)); M.vis($('#spB'), t, tSp, 1e9, { dy: 10 });
    M.vis($('#sn'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const an = -90 * D2R * M.io((t - tSn) / 1.1); sN.set(an); M.setT($('#snB'), sgn(an / D2R)); M.vis($('#snB'), t, tSn, 1e9, { dy: 10 });
    const p1 = M.io((t - wt('S3', 'plus')) / 0.2) * (1 - M.io((t - wt('S3', 'plus') - 0.5) / 0.3)), p2 = M.io((t - wt('S3', 'minus')) / 0.2) * (1 - M.io((t - wt('S3', 'minus') - 0.5) / 0.3));
    $('#spB').style.transform = `scale(${(1 + 0.12 * p1).toFixed(3)})`; $('#snB').style.transform = `scale(${(1 + 0.12 * p2).toFixed(3)})`; $('#spB').style.transformOrigin = $('#snB').style.transformOrigin = '0 50%';
    M.vis($('#th1'), t, tK1 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'top') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Three') });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tR1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('R1');
    M.vis($('#gq'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    gQL.forEach((e, i) => M.vis(e, t, wt('G1', 'one') + i * 0.25, 1e9, POP));
    const a = gAng(t); gA.set(a); [gA.ray, gA.p].forEach(e => M.vis(e, t, wt('G2', 'Sixty') - 0.3, 1e9, { dy: 0, fade: 0.15 }));
    const q = a < 0.01 ? -1 : Math.floor(a / (Math.PI / 2)); gQ.forEach((r, i) => attr(r, 'opacity', i === q && t > wt('G2', 'Sixty') ? '1' : '0'));
    M.setT(gAngL, Math.round(a / D2R) + '°'); const [lx, ly] = P(GX, GY, 86, a / 2); attr(gAngL, 'x', f2(lx)); attr(gAngL, 'y', f2(ly + 8)); M.hide(gAngL, t < wt('G2', 'Sixty'));
    M.vis($('#gm'), t, T0('G3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const m = gmAng(t); gM.set(m, 40); M.setT($('#gRd span'), Math.round(m / D2R) + '°' + (m > TAU ? ' = 360° + ' + Math.round(m / D2R - 360) + '°' : ''));
    M.vis($('#gRd'), t, gm0, 1e9, { dy: 10 }); M.vis(gG, t, wt('G3', 'exactly') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#gP'), t, wt('G3', 'lands', 0) - 0.1, 1e9, POP);
  }

  /* R: wrap */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    RRW.forEach((_, i) => M.vis($('#rw' + i), t, tRw[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#rP'), t, wt('R5', 'lap') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const lp = Lp(t), ln = Ln(t), on = t >= wt('R2', 'Stand') - 0.1;
    let d = ''; for (let i = 0; i <= 260; i++) { const s = -5 + 13 * i / 260; const [x, y] = rPos(s, lp, ln); d += (i ? 'L' : 'M') + f2(x) + ',' + f2(y); }
    attr(rLine, 'd', d); M.vis(rLine, t, wt('R2', 'Stand') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    RT.forEach(k => { const [x, y, nx, ny] = rPos(k.v, lp, ln); attr(k.tk, 'x1', f2(x - nx * 8)); attr(k.tk, 'y1', f2(y - ny * 8)); attr(k.tk, 'x2', f2(x + nx * 8)); attr(k.tk, 'y2', f2(y + ny * 8));
      const side = k.v < 0 ? -1 : 1, off = k.v === 0 ? 0 : 26; let lx = x + nx * off * side, ly = y + ny * off * side + 6; if (k.v === 0) { lx = x + 20; ly = y + 26; }
      attr(k.lb, 'x', f2(lx)); attr(k.lb, 'y', f2(ly)); M.hide(k.tk, !on); M.vis(k.lb, t, wt('R2', 'Zero') - 0.1 + Math.abs(k.v) * 0.04, 1e9, { dy: 0, fade: 0.2 }); });
    const [zx, zy] = rPos(TAU, lp, ln); attr(r2pi, 'cx', f2(zx)); attr(r2pi, 'cy', f2(zy)); attr(r2piL, 'x', f2(zx + 30)); attr(r2piL, 'y', f2(zy - 16));
    M.hide(r2pi, !on); M.hide(r2piL, !on);
    const [ox, oy] = rPos(1, lp, ln); attr(r1D, 'cx', f2(ox)); attr(r1D, 'cy', f2(oy)); M.vis(r1D, t, wt('R4', 'one'), 1e9, { dy: 0, sc: 0.4, sp: M.POP });
    M.draw(r1Arc, t, wt('R4', 'arc'), 0.5); M.vis(r1L, t, wt('R4', 'radian'), 1e9, { dy: 0 });
    M.setT($('#rRd span'), `+${lp.toFixed(2)} / -${ln.toFixed(2)}`); M.vis($('#rRd'), t, wt('R3', 'Wrap'), 1e9, { dy: 10 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.7); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const a = dAl(t); attr(dTr, 'd', Math.abs(a - TH0) > 0.03 ? spiralD(DX, DY, 46, 34, TH0, a) : '');
    const [x, y] = P(DX, DY, DR, a); attr(dRay, 'x2', f2(x)); attr(dRay, 'y2', f2(y)); attr(dP, 'cx', f2(x)); attr(dP, 'cy', f2(y));
    const n = (a - TH0) / TAU; M.setT($('#dRd span'), `${Math.round(a / D2R)}°` + (Math.abs(n - Math.round(n)) < 0.01 ? `  (n = ${Math.round(n)})` : ''));
    M.vis($('#dRd'), t, tDs[0], 1e9, { dy: 10 }); M.vis(dPL, t, tD1 + 0.6, 1e9, { dy: 0 });
  }

  /* statement */
  const stOn = t >= tT && t < tZ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tZ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Anticlockwise') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'full') - 0.1, 0.8);
  }

  /* Z think */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) { M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o }); th2(t, { tin: tZ1, tOpts: wt('Z1', 'sixty') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'difference') }); }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const a = wAng(t); wA.set(a, 26); const dg = a / D2R;
    M.setT($('#wRd span'), sgn(dg)); M.setT($('#wLap span'), String(Math.floor(Math.abs(dg) / 360 + 1e-6)));
    M.vis($('#wRd'), t, T0('W2') + 0.6, 1e9, { dy: 10 }); M.vis($('#wLap'), t, T0('W2') + 0.7, 1e9, { dy: 10 });
    M.vis(wG, t, wt('W6', 'Eighty') - 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'half') - 0.1, tRight: wt('X3', 'opposite') - 0.1 });
    M.vis(tG, t, wt('X3', 'half'), 1e9, { dy: 0, fade: 0.25 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'PUC')], tType: wt('J1', 'find') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'same'), tCount, tAns });
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

const th2 = PUC.think($('#th2'), { q: 'Does -300° end at the same point as 60°?', opts: ['Yes', 'No'], right: 0, why: '60° - (-300°) = 360°: exactly one full turn.' });
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
