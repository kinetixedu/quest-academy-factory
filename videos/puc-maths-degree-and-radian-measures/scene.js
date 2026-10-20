// PUC Maths Ep 24: Degree and radian measures (Proof board, Chapter 3 opens)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Chapter 3 canon): angle theta violet, arc length l teal, radius ink, cos blue / sin coral (later episodes)
const TH = C.violet, LC = '#0E8F8F', LC2 = '#7CC7C7';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const th = s => `\\textcolor{${TH}}{${s}}`, lc = s => `\\textcolor{${LC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const f2 = v => v.toFixed(2);
// circle helpers (maths angles: counterclockwise, screen y down)
const P = (cx, cy, R, a) => [cx + R * Math.cos(a), cy - R * Math.sin(a)];
const arcD = (cx, cy, R, a0, a1) => {
  if (a1 - a0 < 1e-4) return '';
  if (a1 - a0 >= 2 * Math.PI - 1e-4) { const [x, y] = P(cx, cy, R, a0), [x2, y2] = P(cx, cy, R, a0 + Math.PI); return `M${f2(x)},${f2(y)} A${R},${R} 0 1 0 ${f2(x2)},${f2(y2)} A${R},${R} 0 1 0 ${f2(x)},${f2(y)}`; }
  const [x0, y0] = P(cx, cy, R, a0), [x1, y1] = P(cx, cy, R, a1);
  return `M${f2(x0)},${f2(y0)} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 0 ${f2(x1)},${f2(y1)}`;
};
// a bicycle wheel: outer g (position), inner g (rotation)
const wheel = (svg, r) => {
  const o = mk(svg, 'g', {}), g = mk(o, 'g', {});
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; mk(g, 'line', { x1: 0, y1: 0, x2: f2((r - 10) * Math.cos(a)), y2: f2((r - 10) * Math.sin(a)), stroke: '#A3A9B6', 'stroke-width': 2 }); }
  mk(g, 'circle', { r: r - 9, fill: 'none', stroke: C.ink2, 'stroke-width': 3 });
  mk(g, 'circle', { r: r - 3, fill: 'none', stroke: C.ink, 'stroke-width': 9 });
  const tr = mk(g, 'path', { d: '', fill: 'none', stroke: LC, 'stroke-width': 9, 'stroke-linecap': 'round' });
  mk(g, 'circle', { r: 10, fill: C.ink });
  const v = mk(g, 'circle', { cx: 0, cy: -(r - 14), r: 7, fill: C.ink, stroke: '#fff', 'stroke-width': 2 });
  return { o, g, tr, v, set(x, y, phi) { attr(o, 'transform', `translate(${f2(x)},${f2(y)})`); attr(g, 'transform', `rotate(${(phi * 180 / Math.PI).toFixed(3)})`); } };
};

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tG1 = T0('G1'), tD1 = T0('D1'), tK1 = T0('K1'), tR1 = T0('R1'), tV1 = T0('V1'), tT = T0('T1'), tS1 = T0('S1'), tS4 = T0('S4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tS1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['QUARTER TURN', '90°'], ['FULL TURN', '360°'], ['ROAD ROLLED', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv"${i === 2 ? ' style="color:#0E8F8F"' : ''}>${v}</div></div>`).join('');
const tLs = [wt('H1', 'quarter') - 0.05, wt('H1', 'full') - 0.05, wt('H1', 'full') + 0.7];

/* ---------- H: the wheel rolls one full turn ---------- */
const hs = $('#hS'), HR = 86, HX0 = 124, HY = 366;
mk(hs, 'line', { x1: 30, y1: HY + HR, x2: 754, y2: HY + HR, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const hTr = mk(hs, 'line', { x1: HX0, y1: HY + HR, x2: HX0, y2: HY + HR, stroke: LC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const hW = wheel(hs, HR);
const hRoll0 = tMorph + 0.6, hRoll1 = T0('H4') + 0.4;
const hPhi = t => 2 * Math.PI * M.clamp((t - hRoll0) / (hRoll1 - hRoll0));

/* ---------- G: angle = rotation ---------- */
const gs = $('#gS'), GX = 330, GY = 300, GL = 250;
mk(gs, 'line', { x1: GX, y1: GY, x2: GX + 300, y2: GY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gArc = mk(gs, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gRay = PUC.arrow(gs, TH, 5, 20);
mk(gs, 'circle', { cx: GX, cy: GY, r: 9, fill: C.ink });
const gIL = txt(gs, GX + 300, GY + 36, 'initial side', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const gVL = txt(gs, GX - 72, GY + 40, 'vertex', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const gTL = txt(gs, 0, 0, 'terminal side', { 'text-anchor': 'middle', 'font-size': 20, fill: TH, 'font-weight': 600 });
const gThL = txt(gs, 0, 0, 'θ', { 'text-anchor': 'middle', 'font-size': 30, fill: TH, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 });
const gA1 = wt('G2', 'rotation'), gA2 = wt('G3', 'terminal'), gB1 = wt('G4', 'turn'), gB2 = wt('G4', 'bigger') + 0.4;
const gAng = t => (135 * M.io((t - gA1) / Math.max(0.5, gA2 - gA1)) + 165 * M.io((t - gB1) / Math.max(0.5, gB2 - gB1))) * Math.PI / 180;

/* ---------- D: 360 slices ---------- */
const ds = $('#dS'), DX = 392, DY = 290, DR = 170;
mk(ds, 'circle', { cx: DX, cy: DY, r: DR, fill: 'none', stroke: C.line, 'stroke-width': 2 });
const dTicks = [];
for (let i = 0; i < 360; i++) { const a = i * Math.PI / 180, L = i % 90 === 0 ? 26 : i % 10 === 0 ? 16 : 8; const [x1, y1] = P(DX, DY, DR, a), [x2, y2] = P(DX, DY, DR - L, a); dTicks.push(mk(ds, 'line', { x1: f2(x1), y1: f2(y1), x2: f2(x2), y2: f2(y2), stroke: i % 10 === 0 ? C.ink : '#8C93A3', 'stroke-width': i % 10 === 0 ? 2.2 : 1.2 })); }
const dOne = mk(ds, 'g', {});
mk(dOne, 'line', { x1: DX, y1: DY, x2: DX + DR + 4, y2: DY, stroke: TH, 'stroke-width': 3 });
mk(dOne, 'line', { x1: DX, y1: DY, x2: f2(P(DX, DY, DR + 4, Math.PI / 180)[0]), y2: f2(P(DX, DY, DR + 4, Math.PI / 180)[1]), stroke: TH, 'stroke-width': 3 });
mk(dOne, 'path', { d: `M${DX + DR + 8},${DY - 2} L${DX + DR + 52},${DY - 60}`, stroke: TH, 'stroke-width': 2, fill: 'none' });
txt(dOne, DX + DR + 58, DY - 66, '1 slice = 1°', { 'font-size': 22, fill: TH, 'font-weight': 600 });
const dCnt0 = wt('D2', 'Cut'), dCnt1 = wt('D2', 'slice') - 0.2;
const DV = ['360 ÷ 2 = 180', '÷ 3 = 120', '÷ 4 = 90', '÷ 5 = 72', '÷ 6 = 60'];
$('#dvs').innerHTML = DV.map((s, i) => `<div class="dv" id="dv${i}" style="font-size:20px">${s}</div>`).join('');
const DS = [['1\\ \\text{full turn} = 360^\\circ', 'one turn, 360 equal slices'], ["1^\\circ = 60'", 'one degree = 60 minutes'], ["1' = 60''", 'one minute = 60 seconds']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:132px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Cut'), wt('D3', 'sixty'), wt('D3', 'minute')];
const th1 = PUC.think($('#th1'), { q: 'Can an angle be bigger than 360°?', opts: ['Yes', 'No'], right: 0, why: 'The ray keeps turning: one full turn + 60° = 420°.' });

/* ---------- R: radian + live wrap ---------- */
$('#rF0').innerHTML = K(`${lc('\\text{arc}')} = 1 \\;\\Rightarrow\\; ${th('\\theta')} = 1\\ \\text{radian}`);
$('#rF1').innerHTML = K(`${lc('\\text{arc}')} = r \\;\\Rightarrow\\; ${th('\\theta')} = 1\\ \\text{radian}`);
const rs = $('#rS'), RX = 392, RY = 262, RR = 150;
mk(rs, 'circle', { cx: RX, cy: RY, r: RR, fill: 'none', stroke: C.line, 'stroke-width': 3 });
const rRad0 = mk(rs, 'line', { x1: RX, y1: RY, x2: RX + RR, y2: RY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const rRad1 = mk(rs, 'line', { x1: RX, y1: RY, x2: f2(P(RX, RY, RR, 1)[0]), y2: f2(P(RX, RY, RR, 1)[1]), stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const rThA = mk(rs, 'path', { d: arcD(RX, RY, 46, 0, 1), fill: 'none', stroke: TH, 'stroke-width': 5 });
const rThL = txt(rs, f2(P(RX, RY, 90, 0.5)[0]), f2(P(RX, RY, 90, 0.5)[1] + 8), '1 rad', { 'text-anchor': 'middle', 'font-size': 22, fill: TH, 'font-weight': 600 });
const rRL = txt(rs, RX + RR / 2, RY + 34, '1', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
mk(rs, 'circle', { cx: RX, cy: RY, r: 7, fill: C.ink });
const rP = [];
for (let k = 1; k <= 6; k++) {
  const p = mk(rs, 'path', { d: '', fill: 'none', stroke: k % 2 ? LC : LC2, 'stroke-width': 9, 'stroke-linecap': 'butt' });
  const [lx, ly] = P(RX, RY, RR + 30, k - 0.5);
  const l = txt(rs, f2(lx), f2(ly + 8), String(k), { 'text-anchor': 'middle', 'font-size': 24, fill: LC, 'font-weight': 600 });
  rP.push({ p, l });
}
// a piece of length RR bending from straight (tangent) to the arc: curvature c = u / RR
const bendD = (a0, u) => {
  const [x0, y0] = P(RX, RY, RR, a0), dx = -Math.sin(a0), dy = -Math.cos(a0), nx = -Math.cos(a0), ny = Math.sin(a0);
  let d = ''; for (let i = 0; i <= 28; i++) { const s = RR * i / 28; let a, b; if (u < 1e-3) { a = s; b = 0; } else { const c = u / RR; a = Math.sin(c * s) / c; b = (1 - Math.cos(c * s)) / c; } d += (i ? 'L' : 'M') + f2(x0 + a * dx + b * nx) + ',' + f2(y0 + a * dy + b * ny); }
  return d;
};
const rGap = mk(rs, 'path', { d: arcD(RX, RY, RR, 6, 2 * Math.PI), fill: 'none', stroke: C.red, 'stroke-width': 9 });
const rGapL = txt(rs, f2(P(RX, RY, RR + 40, 6.14)[0] + 26), f2(P(RX, RY, RR + 40, 6.14)[1] + 12), 'gap 0.28', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600 });
const NUMW = ['One', 'two', 'three', 'four', 'five', 'six'];
const tPc = k => k === 1 ? wt('R3', 'arc') : wt('R6', NUMW[k - 1]) - 0.15;

/* ---------- V: proof theta = l / r ---------- */
const VS = [[`${lc('\\text{arc}')} = r \\;\\Rightarrow\\; ${th('\\theta')} = 1`, 'an arc one radius long makes one radian'],
  [`${lc('\\text{arc}')} = 2r \\;\\Rightarrow\\; ${th('\\theta')} = 2`, 'equal arcs make equal angles at the centre'],
  [`${th('\\theta')} = ${lc('l')}\\,/\\,r`, 'the angle = how many radii fit in the arc'],
  [`${lc('l')} = r\\,${th('\\theta')}`, 'multiply both sides by r'],
  [`\\text{full turn: } ${th('\\theta')} = ${lc('2\\pi r')}\\,/\\,r = 2\\pi`, 'the whole rim is 2πr long']];
$('#vSt').innerHTML = VS.map(([f, w], i) => `<div class="pf" id="vs${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tVs = [wt('V2', 'arc'), wt('V3', 'Equal'), wt('V4', 'angle'), wt('V6', 'Multiply'), wt('V7', 'whole')];
const vs = $('#vS'), VX = 392, VY = 258, VR = 165;
mk(vs, 'circle', { cx: VX, cy: VY, r: VR, fill: 'none', stroke: C.line, 'stroke-width': 3 });
const vArc = mk(vs, 'path', { d: '', fill: 'none', stroke: LC, 'stroke-width': 9, 'stroke-linecap': 'round' });
mk(vs, 'line', { x1: VX, y1: VY, x2: VX + VR, y2: VY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const vRad = mk(vs, 'line', { x1: VX, y1: VY, x2: VX, y2: VY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const vThA = mk(vs, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 5 });
const vThL = txt(vs, 0, 0, 'θ', { 'text-anchor': 'middle', 'font-size': 30, fill: TH, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 });
const vLL = txt(vs, 0, 0, 'l', { 'text-anchor': 'middle', 'font-size': 32, fill: LC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 });
txt(vs, VX + VR / 2, VY + 34, 'r', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 });
mk(vs, 'circle', { cx: VX, cy: VY, r: 7, fill: C.ink });
const vTh = M.track(0, [[tV1 + 0.4, 1], [tVs[1] + 0.4, 2], [tVs[2] + 0.4, 2.6], [tVs[3] + 0.4, 1.4], [tVs[4] + 0.4, 2 * Math.PI - 0.001]], M.HEAVY);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${th('\\theta')} = ${lc('l')}\\,/\\,r \\qquad ${lc('l')} = r\\,${th('\\theta')}`);

/* ---------- S: degree vs radian ---------- */
const sds = $('#sdS'), SX = 392, SY = 262, SR = 165;
for (let i = 0; i < 360; i++) { const a = i * Math.PI / 180, L = i % 90 === 0 ? 24 : i % 10 === 0 ? 14 : 7; const [x1, y1] = P(SX, SY, SR, a), [x2, y2] = P(SX, SY, SR - L, a); mk(sds, 'line', { x1: f2(x1), y1: f2(y1), x2: f2(x2), y2: f2(y2), stroke: i % 10 === 0 ? C.ink : '#8C93A3', 'stroke-width': i % 10 === 0 ? 2.2 : 1.2 }); }
const sdN = txt(sds, SX, SY + 16, '360°', { 'text-anchor': 'middle', 'font-size': 48, fill: C.ink, 'font-weight': 600 });
const srs = $('#srS');
const mini = (cx, cy, R, lab) => { const g = mk(mk(srs, 'g', {}), 'g', {}); mk(g, 'circle', { cx, cy, r: R, fill: 'none', stroke: C.line, 'stroke-width': 3 });
  mk(g, 'path', { d: arcD(cx, cy, R, 0, 1), fill: 'none', stroke: LC, 'stroke-width': 8, 'stroke-linecap': 'round' });
  mk(g, 'line', { x1: cx, y1: cy, x2: cx + R, y2: cy, stroke: C.ink, 'stroke-width': 3.5 }); const [ex, ey] = P(cx, cy, R, 1); mk(g, 'line', { x1: cx, y1: cy, x2: f2(ex), y2: f2(ey), stroke: C.ink, 'stroke-width': 3.5 });
  mk(g, 'path', { d: arcD(cx, cy, Math.min(34, R * 0.45), 0, 1), fill: 'none', stroke: TH, 'stroke-width': 4 }); mk(g, 'circle', { cx, cy, r: 5, fill: C.ink });
  const [tx, ty] = P(cx, cy, R < 80 ? R + 30 : Math.min(34, R * 0.45) + 34, 0.5); txt(g, f2(tx), f2(ty + 7), '1 rad', { 'text-anchor': 'middle', 'font-size': 20, fill: TH, 'font-weight': 600 });
  txt(g, cx, cy + R + 36, lab, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1.5 }); return g; };
const srA = mini(180, 220, 62, 'TINY WHEEL'), srB = mini(500, 212, 120, 'GIANT WHEEL');
const avD = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So an angle of 2, with no unit, means 2 radians.' });
const th2 = PUC.think($('#th2'), { q: 'A tiny wheel and a giant wheel each roll an arc equal to their own radius. Which turns more?', opts: ['The giant wheel', 'Neither: 1 radian each'], right: 1, why: 'Arc ÷ radius = 1 for both. The radian does not depend on the size of the circle.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Wheel radius ${K('r = 35\\ \\text{cm}')}. The bicycle rolls ${K('1\\ \\text{m}')}. Through what angle ${K(th('\\theta'))}, in radians, does the wheel turn?`;
const wsol = PUC.solution($('#wl'), [
  [`Rolling: road covered = arc, so ${K(lc('l') + ' = 1\\ \\text{m}')}`],
  [K(`${lc('l')} = 1\\ \\text{m} = 100\\ \\text{cm}`)],
  [K(`${th('\\theta')} = ${lc('l')}\\,/\\,r = 100\\,/\\,35`)],
  [K(`${th('\\theta')} = 20/7 \\approx 2.86\\ \\text{rad}`)],
  [`Less than half of ${K('2\\pi')}: under half a turn`]], { label: 'WORKED EXAMPLE', y0: 210, dy: 74 });
$('#wl .lbl').style.top = '30px';
const ws = $('#wS'), WS = 3.6, WRp = 35 * WS, WX0 = 150, WY = 462;
mk(ws, 'line', { x1: 24, y1: WY, x2: 760, y2: WY, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
[0, 50, 100].forEach(v => { mk(ws, 'line', { x1: WX0 + v * WS, y1: WY, x2: WX0 + v * WS, y2: WY + 12, stroke: C.ink, 'stroke-width': 2 }); txt(ws, WX0 + v * WS, WY + 40, v + ' cm', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 }); });
const wTr = mk(ws, 'line', { x1: WX0, y1: WY, x2: WX0, y2: WY, stroke: LC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wW = wheel(ws, WRp);
const wR0 = wt('W3', 'rolls'), wR1 = Math.max(wR0 + 3, T1('W3'));
const wDist = t => 100 * M.clamp((t - wR0) / (wR1 - wR0));
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'Step'), wt('W7', 'less')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${lc('l')} = 10 \\times 360 = 3600\\ \\text{cm}`), right: K(`${lc('l')} = 10 \\times 2\\pi \\approx 62.8\\ \\text{cm}`) + '&nbsp; (θ in radians)' });
const ts = $('#tS'), TCX = 150, TCY = 150, TR = 92;
const tCir = mk(ts, 'circle', { cx: TCX, cy: TCY, r: TR, fill: 'none', stroke: C.line, 'stroke-width': 3 });
const tRad = mk(ts, 'line', { x1: TCX, y1: TCY, x2: TCX + TR, y2: TCY, stroke: C.ink, 'stroke-width': 3.5 });
const tRim = mk(ts, 'path', { d: arcD(TCX, TCY, TR, 0, 2 * Math.PI), fill: 'none', stroke: LC, 'stroke-width': 8 });
const tL1 = txt(ts, 280, 138, 'l ≈ 62.8 cm', { 'font-size': 24, fill: LC, 'font-weight': 600 });
const tL2 = txt(ts, 280, 178, 'r = 10 cm', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Given an arc and a radius, find the angle in radians (or the arc from the angle).' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `A sector (two radii and their arc) has perimeter ${K('26\\ \\text{cm}')}. Its arc is ${K('2\\ \\text{cm}')} longer than its radius. Find ${K(th('\\theta'))} in radians.`,
  opts: [K('4/5'), K('5/4'), K('1'), K('8/5')], right: 1, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`2r + ${lc('l')} = 26`)], [K(`${lc('l')} = r + 2`)], [K(`3r + 2 = 26 \\Rightarrow r = 8`)], [K(`${lc('l')} = 10`)], [K(`${th('\\theta')} = 10/8 = 5/4`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'perimeter'), wt('A3', 'arc'), wt('A3', 'Then'), wt('A4', 'So'), wt('A4', 'Theta')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · degrees and radians', y0: 98, dy: 78, txt: [1, 0, 1, 0, 0],
  lines: ['<b>Angle</b>: a measure of rotation of a ray about its initial point',
    K(`1\\ \\text{turn} = 360^\\circ \\qquad 1^\\circ = 60' \\qquad 1' = 60''`),
    '<b>1 radian</b>: the angle where the arc equals the radius',
    K(`${th('\\theta')} = ${lc('l')}\\,/\\,r \\qquad ${lc('l')} = r\\,${th('\\theta')} \\quad (${th('\\theta')}\\ \\text{in radians})`),
    K(`\\text{full turn} = 360^\\circ = 2\\pi\\ \\text{radians}`)] });
const YQ = ['How many degrees are there in two full turns?', 'Arc 15 cm, radius 5 cm: what is the angle in radians?', 'Why is one radian the same size in every circle?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 25', topic: 'Half a turn is 180° and also π. How do we switch?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tR4 = T0('R4'), tR5 = T0('R5');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR4 - 0.1, 1.08, 1368, 560], [tR5 + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tG1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('G1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const ph = hPhi(t); hW.set(HX0 + HR * ph, HY, ph); attr(hTr, 'x2', f2(HX0 + HR * ph)); M.hide(hTr, ph < 0.01);
    M.setT($('#hDeg span'), Math.round(ph * 180 / Math.PI) + '°');
    M.vis($('#hDeg'), t, tMorph + 0.4, 1e9, { dy: 10 }); M.vis($('#hRoad'), t, wt('H4', 'road') - 0.1, 1e9, POP);
    M.vis($('#hP'), t, wt('H4', 'Could') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'chapter') - 0.1, 1e9, POP);
  }

  /* G: angle */
  const gOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('D1');
    M.vis($('#gd'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#gT'), t, T0('G2') + 0.05, { st: 0.05, sp: M.HEAVY });
    const rw = $('#gT b'); rw.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('G2', 'rotation')) / 0.3)); rw.style.borderRadius = '8px';
    M.vis($('#ga0'), t, wt('G3', 'initial') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#ga1'), t, wt('G3', 'terminal') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#ga2'), t, wt('G3', 'vertex') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#gr'), t, T0('G2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const a = gAng(t); const [ex, ey] = P(GX, GY, GL, a); gRay.set(GX, GY, ex, ey);
    attr(gArc, 'd', arcD(GX, GY, 58, 0, a)); const [lx, ly] = P(GX, GY, 92, a / 2); attr(gThL, 'x', f2(lx)); attr(gThL, 'y', f2(ly + 10)); M.hide(gThL, a < 0.3);
    const [tx, ty] = P(GX, GY, GL + 46, a); attr(gTL, 'x', f2(tx)); attr(gTL, 'y', f2(ty + 6)); M.vis(gTL, t, wt('G3', 'terminal'), 1e9, { dy: 0 });
    M.vis(gIL, t, wt('G3', 'initial'), 1e9, { dy: 0 }); M.vis(gVL, t, wt('G3', 'vertex'), 1e9, { dy: 0 });
    M.setT($('#gRd span'), (a / (2 * Math.PI)).toFixed(2)); M.vis($('#gRd'), t, gA1, 1e9, { dy: 10 });
  }

  /* D: degree */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const n = Math.round(360 * M.clamp((t - dCnt0) / (dCnt1 - dCnt0)));
    dTicks.forEach((e, i) => M.hide(e, i >= n)); M.setT($('#dRd span'), String(n)); M.vis($('#dRd'), t, dCnt0 - 0.1, 1e9, { dy: 10 });
    M.vis(dOne, t, wt('D2', 'One', 1) - 0.1, 1e9, { dy: 0, fade: 0.2 });
    let x = 36; DV.forEach((_, i) => { const el = $('#dv' + i); el.style.left = x + 'px'; x += el.offsetWidth + 12; M.vis(el, t, wt('D4', 'splits') + i * 0.18, 1e9, POP); });
    M.vis($('#dr'), t, T0('D2') + 0.2, out, { dx: 60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tDs[1] - 0.1, 240], [tDs[2] - 0.1, 396]], M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, wt('D4', 'splits'), { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'bigger') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'ray') });
  }

  /* R: radian + live wrap */
  const rOn = t >= tR1 - 0.1 && t < tV1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('V1');
    M.vis($('#rd'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#rT'), t, T0('R2') + 0.2, { st: 0.04, sp: M.HEAVY });
    M.vis($('#rL0'), t, T0('R2') + 0.1, 1e9, { dy: 10 }); PUC.write($('#rF0'), t, wt('R4', 'one') - 0.2, 0.8);
    M.vis($('#rL1'), t, T0('R5') - 0.05, 1e9, { dy: 10 }); PUC.write($('#rF1'), t, wt('R5', 'radius') - 0.1, 0.8);
    M.vis($('#rw'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(rRad0, t, wt('R2', 'radius') - 0.1, 0.5); M.vis(rRL, t, wt('R2', 'one'), 1e9, { dy: 0 }); M.setT(rRL, t < T0('R5') ? '1' : 'r');
    rRL.setAttribute('font-style', t < T0('R5') ? 'normal' : 'italic'); rRL.setAttribute('font-family', t < T0('R5') ? 'IBM Plex Mono' : 'Poppins');
    let tot = 0;
    rP.forEach((pc, i) => { const k = i + 1, t0 = tPc(k), u = M.io((t - t0 - 0.2) / 0.5);
      const on = M.vis(pc.p, t, t0, 1e9, { dy: 0, fade: 0.15 }); if (on) attr(pc.p, 'd', bendD(k - 1, u));
      M.vis(pc.l, t, k === 1 ? wt('R6', 'One') : t0 + 0.5, 1e9, { dy: 0, sc: 0.5, sp: M.POP });
      if (t >= t0 + 0.2) tot = k - 1 + M.clamp((t - t0 - 0.2) / 0.5); });
    M.draw(rRad1, t, wt('R4', 'angle') - 0.1, 0.4); M.draw(rThA, t, wt('R4', 'angle'), 0.5); M.vis(rThL, t, wt('R4', 'one'), 1e9, POP);
    const g = M.io((t - wt('R7', 'gap') + 0.1) / 0.4); M.drawU(rGap, g); M.vis(rGapL, t, wt('R7', 'gap'), 1e9, { dy: 0 });
    const fin = t >= wt('R7', 'six') - 0.05; if (fin) tot = 2 * Math.PI;
    M.setT($('#rRd span'), `θ = ${tot.toFixed(2)} rad` + (t >= wt('R7', 'pi') - 0.05 ? ' = 2π' : ''));
    M.vis($('#rRd'), t, wt('R4', 'angle'), 1e9, { dy: 10 });
    M.vis($('#rP'), t, wt('R7', 'pi') - 0.1, 1e9, POP);
  }

  /* V: proof */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vl'), t, tV1 + 0.05, 1e9, { dx: -60, dy: 0 });
    VS.forEach((_, i) => { const el = $('#vs' + i); M.vis(el.querySelector('.n'), t, tVs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tVs[i], 0.7); M.vis(el.querySelector('.why'), t, tVs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tVs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#vHi'); M.vis(hb, t, tVs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
    M.vis($('#vr'), t, tV1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const a = vTh(t);
    attr(vArc, 'd', arcD(VX, VY, VR, 0, a)); const [ex, ey] = P(VX, VY, VR, a); attr(vRad, 'x2', f2(ex)); attr(vRad, 'y2', f2(ey));
    attr(vThA, 'd', arcD(VX, VY, 48, 0, a)); const [lx, ly] = P(VX, VY, 82, a / 2); attr(vThL, 'x', f2(lx)); attr(vThL, 'y', f2(ly + 10));
    const [mx, my] = P(VX, VY, VR + 34, a / 2); attr(vLL, 'x', f2(mx)); attr(vLL, 'y', f2(my + 10));
    M.hide(vThL, a < 0.4); M.hide(vLL, a < 0.2);
    M.setT($('#vTh span'), `${a.toFixed(2)} rad`); M.setT($('#vL span'), `${a.toFixed(2)} r`);
    M.vis($('#vTh'), t, tV1 + 0.6, 1e9, { dy: 10 }); M.vis($('#vL'), t, tV1 + 0.7, 1e9, { dy: 10 });
  }

  /* statement */
  const stOn = t >= tT && t < tS1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tS1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'radian') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'arc') - 0.1, 0.8);
  }

  /* S: degree vs radian + think */
  const sOn = t >= tS1 - 0.1 && t < tW1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S4');
    M.vis($('#sd'), t, tS1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis(sdN, t, wt('S1', 'three') - 0.1, 1e9, POP); M.vis($('#sdP'), t, wt('S1', 'chosen') - 0.1, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(srA, t, wt('S2', 'radii') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.12 }); M.vis(srB, t, wt('S2', 'radii') + 0.15, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.12 });
    M.vis($('#srP'), t, wt('S2', 'two') - 0.1, 1e9, POP);
    avD(t, wt('S3', 'When') - 0.1, out);
    M.vis($('#th2'), t, tS4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tS4, tOpts: wt('S4', 'Which') - 0.1, tCount: T1('S4') + 0.05, dur: 3, tAns: T0('S5') - 0.02, tWhy: wt('S5', 'Both') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const d = wDist(t), ph = d / 35; wW.set(WX0 + d * WS, WY - WRp, ph); attr(wTr, 'x2', f2(WX0 + d * WS)); M.hide(wTr, d < 0.2);
    // the part of the tyre that touched the road (wheel frame): screen angle pi/2 - phi .. pi/2
    if (ph > 0.01) { const R = WRp - 3, b0 = Math.PI / 2 - ph, b1 = Math.PI / 2; attr(wW.tr, 'd', `M${f2(R * Math.cos(b0))},${f2(R * Math.sin(b0))} A${R},${R} 0 ${ph > Math.PI ? 1 : 0} 1 ${f2(R * Math.cos(b1))},${f2(R * Math.sin(b1))}`); } else attr(wW.tr, 'd', '');
    M.setT($('#wRo span'), `${d.toFixed(0)} cm`); M.setT($('#wTh span'), `${ph.toFixed(2)} rad`);
    M.vis($('#wRo'), t, T0('W2') + 0.8, 1e9, { dy: 10 }); M.vis($('#wTh'), t, T0('W2') + 0.9, 1e9, { dy: 10 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'radians') - 0.3, tRight: wt('X3', 'ten') - 0.1 });
    M.vis(tCir, t, T0('X2') + 0.2, 1e9, { dy: 0 }); M.vis(tRad, t, T0('X2') + 0.3, 1e9, { dy: 0 }); M.vis(tL2, t, wt('X2', 'radius'), 1e9, { dy: 0 });
    M.draw(tRim, t, wt('X3', 'full'), 0.9); M.vis(tL1, t, wt('X3', 'sixty'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'PUC')], tType: wt('J1', 'given') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + three questions + NEXT */
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
