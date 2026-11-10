// PUC Physics Ep 91: Rigid body - translation and rotation (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, SC = C.violet, TC = C.gold, FC = C.orange, IC = C.ink;          // v blue, distance / r violet, theta gold
const DOTC = ['#B49CF0', '#9473E6', '#5B32C2'];                                   // dots A, B, C: three violet shades (graph lines match)
const WOOD = '#F3E3C3', WOODL = '#E6CFA3', BOOK = '#9B5B45', DOOR = '#C79A68';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const D2R = Math.PI / 180;
const arcP = (cx, cy, r, a0, a1) => { const p0 = [cx + r * Math.cos(a0 * D2R), cy - r * Math.sin(a0 * D2R)], p1 = [cx + r * Math.cos(a1 * D2R), cy - r * Math.sin(a1 * D2R)]; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 0 ${a1 > a0 ? 0 : 1} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const pol = (cx, cy, r, a) => [cx + r * Math.cos(a * D2R), cy - r * Math.sin(a * D2R)];
const dotL = (p, col, lab, r = 13) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill: col, stroke: '#fff', 'stroke-width': 2.5 }); txt(g, 0, 6, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 16, 'font-family': 'Poppins' }); return { g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const hingeM = (p, x, y) => { mk(p, 'circle', { cx: x, cy: y, r: 13, fill: '#fff', stroke: IC, 'stroke-width': 4 }); mk(p, 'circle', { cx: x, cy: y, r: 4, fill: IC }); };
// door seen from above: outer g (for vis) > inner g rotated about the hinge
const doorM = (p, hx, hy, L, col = DOOR) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: hx, y: hy - 11, width: L + 10, height: 22, rx: 5, fill: col, stroke: IC, 'stroke-width': 2.5 }); return { o, g, set(th) { attr(g, 'transform', `rotate(${(-th).toFixed(2)} ${hx} ${hy})`); } }; };

Object.assign(M.IC, {
  drawer: ['M4 4h16v16H4z', 'M4 12h16', 'M10 8h4', 'M10 16h4'],
  fan: ['M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', 'M12 10c0-4 1-7 3-7s2 3 0 6', 'M13.7 13c3.5 2 5.6 4.3 4.6 6s-3.6.4-5-2.4', 'M10.3 13c-3.5 2-6.5 2.6-7.5.9s1.6-3.2 4.7-3'],
  wheel: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M3 12h18'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP4 = T0('P4'), tP5 = T0('P5'), tS1 = T0('S1'), tS5 = T0('S5');
const tV1 = T0('V1'), tV4 = T0('V4'), tV5 = T0('V5'), tV6 = T0('V6'), tV7 = T0('V7'), tV8 = T0('V8'), tV9 = T0('V9'), tV10 = T0('V10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['drawer', 'A drawer', 'SLIDES OUT'], ['fan', 'A ceiling fan', 'SPINS'], ['wheel', 'A wheel', 'ROLLS']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'drawer'), wt('H1', 'fan'), wt('H1', 'wheel')];
$('#jrs').innerHTML = JOBS.map(([, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="120"></svg></div>`).join('');
// mini motions: drawer slides, fan spins, wheel rolls (physically consistent loops)
const j0 = $('#jsv0'); mk(j0, 'rect', { x: 40, y: 22, width: 110, height: 76, rx: 6, fill: '#fff', stroke: IC, 'stroke-width': 2.5 });
const drw = mk(j0, 'g', {}); mk(drw, 'rect', { x: 46, y: 44, width: 100, height: 34, rx: 4, fill: DOOR, stroke: IC, 'stroke-width': 2.5 }); mk(drw, 'line', { x1: 90, y1: 61, x2: 104, y2: 61, stroke: IC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const j1 = $('#jsv1'), fanG = mk(j1, 'g', {}); for (let k = 0; k < 3; k++) mk(fanG, 'path', { d: 'M0,0 C10,-8 52,-10 58,0 C52,10 10,8 0,0 Z', fill: '#8D99AE', stroke: IC, 'stroke-width': 2, transform: `rotate(${k * 120})` }); mk(fanG, 'circle', { r: 10, fill: IC });
const j2 = $('#jsv2'); mk(j2, 'line', { x1: 20, y1: 104, x2: 300, y2: 104, stroke: IC, 'stroke-width': 2.5 });
const whG = mk(j2, 'g', {}); mk(whG, 'circle', { r: 40, fill: 'none', stroke: IC, 'stroke-width': 5 }); for (let k = 0; k < 4; k++) mk(whG, 'line', { x1: 0, y1: 0, x2: 40 * Math.cos(k * Math.PI / 2), y2: 40 * Math.sin(k * Math.PI / 2), stroke: IC, 'stroke-width': 2 }); mk(whG, 'circle', { r: 6, fill: IC }); mk(whG, 'circle', { cx: 0, cy: 40, r: 6, fill: SC });
// door in the hook (top view)
const hs = $('#hkS'), HH = [478, 446], HL = 262;
mk(hs, 'line', { x1: 420, y1: HH[1], x2: HH[0] - 14, y2: HH[1], stroke: '#8D99AE', 'stroke-width': 12, 'stroke-linecap': 'round' }); mk(hs, 'line', { x1: HH[0] + HL + 26, y1: HH[1], x2: 760, y2: HH[1], stroke: '#8D99AE', 'stroke-width': 12, 'stroke-linecap': 'round' });
const hTrN = mk(hs, 'path', { fill: 'none', stroke: SC, 'stroke-width': 4, 'stroke-dasharray': '6 6' }), hTrF = mk(hs, 'path', { fill: 'none', stroke: SC, 'stroke-width': 4, 'stroke-dasharray': '6 6' });
const hDoor = doorM(hs, HH[0], HH[1], HL); hingeM(hs, HH[0], HH[1]);
const hdN = dotL(hs, DOTC[0], ''), hdF = dotL(hs, DOTC[2], '');
const hLN = txt(hs, 0, 0, 'near hinge', { fill: SC, 'font-weight': 700, 'font-size': 18 }), hLF = txt(hs, 0, 0, 'handle edge', { fill: SC, 'font-weight': 700, 'font-size': 18 });
const tHd = wt('H4', 'door') - 0.1;

/* ---------- P: rigid body + two motions ---------- */
const ps = $('#pqS'), plO = mk(ps, 'g', {}), pl = mk(plO, 'g', {});
mk(pl, 'rect', { x: -150, y: -100, width: 300, height: 200, rx: 10, fill: BOOK, stroke: IC, 'stroke-width': 3 }); mk(pl, 'rect', { x: -150, y: -100, width: 26, height: 200, rx: 6, fill: '#7A4434', stroke: IC, 'stroke-width': 3 });
const PQ = [[-90, -50], [110, 60]];
const pLn = mk(pl, 'line', { x1: PQ[0][0], y1: PQ[0][1], x2: PQ[1][0], y2: PQ[1][1], stroke: '#fff', 'stroke-width': 3, 'stroke-dasharray': '7 6' });
PQ.forEach(([x, y], i) => { mk(pl, 'circle', { cx: x, cy: y, r: 12, fill: '#fff', stroke: IC, 'stroke-width': 3 }); txt(pl, x + (i ? 18 : -18), y + (i ? 28 : -18), i ? 'Q' : 'P', { fill: '#fff', 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'text-anchor': 'middle' }); });
const pDl = txt(ps, 392, 440, 'distance PQ = 22.8 cm, always', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 24 });
const tPl = tP1 + 0.4;
// two motions: translation (box shifts, 3 ghosts) and rotation (bar turns about an axis)
const m0 = $('#mbS0'), m0g = [0, 1, 2].map(() => mk(m0, 'rect', { y: 90, width: 120, height: 80, rx: 8, fill: 'none', stroke: IC, 'stroke-width': 2, opacity: 0 }));
const m0b = mk(m0, 'rect', { y: 90, width: 120, height: 80, rx: 8, fill: BOOK, stroke: IC, 'stroke-width': 2.5 });
const m0a = [PUC.arrow(m0, VC, 5, 14), PUC.arrow(m0, VC, 5, 14)];
const m1 = $('#mbS1'), m1o = mk(m1, 'g', {}), m1g = mk(m1o, 'g', {}); mk(m1g, 'rect', { x: 170, y: 120, width: 130, height: 20, rx: 6, fill: DOOR, stroke: IC, 'stroke-width': 2.5 });
mk(m1, 'circle', { cx: 170, cy: 130, r: 11, fill: '#fff', stroke: IC, 'stroke-width': 3.5 }); mk(m1, 'circle', { cx: 170, cy: 130, r: 3.5, fill: IC });
mk(m1, 'path', { d: arcP(170, 130, 52, 200, 320), fill: 'none', stroke: IC, 'stroke-width': 3 }); const m1h = pol(170, 130, 52, 320); mk(m1, 'path', { d: `M${(m1h[0] - 2).toFixed(1)},${(m1h[1] - 12).toFixed(1)} L${(m1h[0] + 10).toFixed(1)},${(m1h[1] + 3).toFixed(1)} L${(m1h[0] - 9).toFixed(1)},${(m1h[1] + 6).toFixed(1)} Z`, fill: IC });
txt(m1, 170, 226, 'axis', { 'text-anchor': 'middle', fill: IC, 'font-weight': 600, 'font-size': 18 });

/* ---------- S: the sim (book, then door) ---------- */
const s = $('#simS');
const bookW = mk(s, 'g', {}), doorW = mk(s, 'g', {});
// book mode: top view of the table
mk(bookW, 'rect', { x: 36, y: 84, width: 712, height: 376, rx: 10, fill: WOOD, stroke: '#C9A27A', 'stroke-width': 4 });
for (let y = 114; y < 460; y += 36) mk(bookW, 'line', { x1: 38, y1: y, x2: 746, y2: y, stroke: WOODL, 'stroke-width': 1.5 });
const BX0 = 70, BY = 196, BWd = 230, BHt = 150, PXB = 600, PVB = 300, BD = [[42, 36], [115, 75], [188, 114]];
const bGh = [0, 1, 2].map(() => mk(bookW, 'rect', { y: BY, width: BWd, height: BHt, rx: 8, fill: 'none', stroke: BOOK, 'stroke-width': 2.5, opacity: 0 }));
const bTr = BD.map((_, i) => mk(bookW, 'line', { stroke: DOTC[i], 'stroke-width': 3, 'stroke-dasharray': '6 6' }));
const bkO = mk(bookW, 'g', {}), bk = mk(bkO, 'g', {});
mk(bk, 'rect', { x: 0, y: BY, width: BWd, height: BHt, rx: 8, fill: BOOK, stroke: IC, 'stroke-width': 3 }); mk(bk, 'rect', { x: 0, y: BY, width: 22, height: BHt, rx: 5, fill: '#7A4434', stroke: IC, 'stroke-width': 3 });
const bLine = mk(bk, 'line', { x1: BD[0][0], y1: BY + BD[0][1], x2: BD[2][0], y2: BY + BD[2][1], stroke: TC, 'stroke-width': 3 });
const bDots = BD.map((_, i) => dotL(bk, DOTC[i], 'ABC'[i]));
BD.forEach(([x, y], i) => bDots[i].set(x, BY + y));
const bPar = [0, 1, 2].map(() => mk(bookW, 'line', { stroke: TC, 'stroke-width': 3, 'stroke-dasharray': '5 6', opacity: 0 }));
const bParL = txt(bookW, 392, 434, 'the line AC stays parallel to itself', { 'text-anchor': 'middle', fill: TC, 'font-weight': 700, 'font-size': 20 });
const bArr = BD.map(() => PUC.arrow(bookW, VC, 6, 18));
const bArrL = txt(bookW, 0, 0, '0.30 m/s each', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const tB0 = T0('S3') - 0.2;
// door mode: top view, hinge = axis
const HX = 150, HY = 470, RD = [120, 240, 360], RM = [0.3, 0.6, 0.9], PVD = 160;
mk(doorW, 'line', { x1: 40, y1: HY, x2: HX - 16, y2: HY, stroke: '#8D99AE', 'stroke-width': 14, 'stroke-linecap': 'round' }); mk(doorW, 'line', { x1: HX + 400, y1: HY, x2: 748, y2: HY, stroke: '#8D99AE', 'stroke-width': 14, 'stroke-linecap': 'round' });
const dCirc = RD.map(r => mk(doorW, 'path', { d: arcP(HX, HY, r, 0, 180), fill: 'none', stroke: SC, 'stroke-width': 2, 'stroke-dasharray': '3 8', opacity: 0 }));
const dTr = RD.map((_, i) => mk(doorW, 'path', { fill: 'none', stroke: DOTC[i], 'stroke-width': 4 }));
const dGh = [0, 1, 2].map(() => { const o = mk(doorW, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: HX, y: HY - 11, width: 370, height: 22, rx: 5, fill: 'none', stroke: DOOR, 'stroke-width': 2.5 }); return { o, g }; });
const dR = RD.map(() => mk(doorW, 'line', { stroke: SC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5', opacity: 0 }));
const door = doorM(doorW, HX, HY, 360);
const dTh = mk(doorW, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), dThL = txt(doorW, 0, 0, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' });
hingeM(doorW, HX, HY);
const dAxL = txt(doorW, HX - 10, HY + 44, 'hinge = axis', { 'text-anchor': 'start', fill: IC, 'font-weight': 600, 'font-size': 18 });
const dDots = RD.map((_, i) => dotL(doorW, DOTC[i], 'ABC'[i]));
const dArr = RD.map(() => PUC.arrow(doorW, VC, 6, 18));
const dRl = RD.map((r, i) => txt(doorW, 0, 0, `r = ${[30, 60, 90][i]} cm`, { fill: SC, 'font-weight': 700, 'font-size': 18 }));
const tD0 = wt('V3', 'swings'), tFz = wt('V6', 'Freeze') + 0.05, TAU_FZ = 1.0, tR2 = tV10 + 0.35;
function state(t) {
  if (t < tV1) return { m: 0, tau: M.clamp(t - tB0, 0, 2) };
  if (t >= tR2 - 0.4) return { m: 2, tau: M.clamp(t - tR2, 0, 1), run2: true };
  if (t >= tV6) return { m: 1, tau: t < tFz ? TAU_FZ - 0.25 * (tFz - t) : TAU_FZ, replay: t < tFz, frozen: t >= tFz };
  return { m: 1, tau: M.clamp(t - tD0, 0, 2) };
}
const thOf = S => S.m === 2 ? 90 * S.tau : S.m === 1 ? 45 * S.tau : 0;
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">0</span><span class="u">deg</span>
  <span class="k" style="color:${SC}">s<sub>C</sub>/s<sub>A</sub></span><span class="v" id="r_q" style="color:${SC}">-</span><span class="u"></span>`;
$('#roB').innerHTML = ['A', 'B', 'C'].map(n => `<span class="k" style="color:${VC}">v<sub>${n}</sub></span><span class="v" id="r_v${n}" style="color:${VC}">0.00</span><span class="u">m/s</span>`).join('');
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 2, ymin: 0, ymax: 1.5, xt: [0, 0.5, 1, 1.5, 2], yt: [0, 0.5, 1, 1.5], xl: 't (s)' });
txt(gs, 122, 78, 's (m)', { 'font-size': 18 });
const DASH = ['3 7', '9 6', ''];
const gF = [0, 1, 2].map(i => mk(gs, 'path', { d: '', fill: 'none', stroke: DOTC[i], 'stroke-width': 3, 'stroke-dasharray': DASH[i], opacity: 0.3 }));
const gP = [2, 1, 0].map(i => mk(gs, 'path', { d: '', fill: 'none', stroke: DOTC[i], 'stroke-width': i === 2 ? 5 : 4, 'stroke-dasharray': DASH[i], 'stroke-linecap': 'round' })).reverse();
const gD = [0, 1, 2].map(i => g.dot(DOTC[i], 8));
const gLab = txt(gs, 196, 100, '', { fill: SC, 'font-weight': 700, 'font-size': 20 });
$('#leg').innerHTML = [0, 1, 2].map(i => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${DOTC[i]}" stroke-width="4" stroke-dasharray="${DASH[i]}" stroke-linecap="round"/></svg>${'ABC'[i]}</span>`).join('');
const plot = (path, f, s1) => { if (s1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 40; for (let i = 0; i <= n; i++) { const x = s1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'The whole book just shifts. No turning at all!' });
const th1 = PUC.think($('#th1'), { q: 'Swing the door twice as fast. Will C still cover three times the distance of A?', opts: ['Yes, still 3 times', 'No, it changes'], right: 0, why: 'They always turn together, and C is always 3 times farther out.' });

/* ---------- D ---------- */
const ST = [[`${tc(VC, '\\vec v_A')} = ${tc(VC, '\\vec v_B')} = ${tc(VC, '\\vec v_C')}`, 'translation: same displacement in the same time', 'TRANSLATION', IC],
  [`${tc(TC, '\\theta_A')} = ${tc(TC, '\\theta_B')} = ${tc(TC, '\\theta_C')} = ${tc(TC, '\\theta')}`, 'rotation about a fixed axis: same angle, same time', 'ROTATION', TC],
  [`${tc(SC, 's')} = ${tc(SC, 'r')}\\,${tc(TC, '\\theta')}`, 'arc length, with θ in radians'],
  [`${tc(VC, 'v')} = \\dfrac{${tc(SC, 's')}}{t} = \\dfrac{${tc(SC, 'r')}\\,${tc(TC, '\\theta')}}{t} \\;\\propto\\; ${tc(SC, 'r')}`, 'double r, and the speed doubles']];
const SY = [84, 192, 300, 408];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + ST.map(([f, w, tg, col], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${col}">${tg}</div>` : ''}</div>`).join('');
$('#dst3 .sx').style.top = '-18px'; $('#dst3 .why').style.top = '64px';
const tStep = [wt('D2', 'translation'), wt('D3', 'rotation'), wt('D4', 'distance'), wt('D5', 'speed')];
const dp = $('#dpS'), DO = [80, 400], DA = 40;
mk(dp, 'line', { x1: DO[0], y1: DO[1], x2: DO[0] + 400, y2: DO[1], stroke: IC, 'stroke-width': 2, opacity: 0.3 });
const dpR = [160, 320].map(r => { const e = pol(DO[0], DO[1], r, DA); return mk(dp, 'line', { x1: DO[0], y1: DO[1], x2: e[0].toFixed(1), y2: e[1].toFixed(1), stroke: SC, 'stroke-width': 3, 'stroke-dasharray': '7 5' }); });
const dpA = [160, 320].map(r => mk(dp, 'path', { d: arcP(DO[0], DO[1], r, 0, DA), fill: 'none', stroke: SC, 'stroke-width': 5, 'stroke-linecap': 'round' }));
const dpD = [160, 320].map(r => { const e = pol(DO[0], DO[1], r, DA); return mk(dp, 'circle', { cx: e[0].toFixed(1), cy: e[1].toFixed(1), r: 10, fill: SC }); });
const dpT = mk(dp, 'path', { d: arcP(DO[0], DO[1], 56, 0, DA), fill: 'none', stroke: TC, 'stroke-width': 4 }), dpTl = txt(dp, DO[0] + 66, DO[1] - 16, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
const dpL = [txt(dp, DO[0] + 40, DO[1] - 66, 'r', { fill: SC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(dp, DO[0] + 150, DO[1] - 150, '2r', { fill: SC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' }),
  txt(dp, DO[0] + 168, DO[1] - 40, 's', { fill: SC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(dp, DO[0] + 330, DO[1] - 84, '2s', { fill: SC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' })];
hingeM(dp, DO[0], DO[1]);
const dpAx = txt(dp, DO[0] - 20, DO[1] + 40, 'on the axis: r = 0, so v = 0', { fill: IC, 'font-weight': 700, 'font-size': 19 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(SC, 's')} = ${tc(SC, 'r')}\\,${tc(TC, '\\theta')}`);

/* ---------- R: rolling wheel ---------- */
const LK = [['The axle moves in a straight line', 'TRANSLATION', C.ac2, VC], ['Every rim point goes round the axle', 'ROTATION', '#F4E7CF', TC], ['Rolling = translation + rotation', 'BOTH', IC, '#fff']];
$('#lks').innerHTML = LK.map(([h, tg, bg, fg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="lt">${h}</div><div class="tg" style="background:${bg};color:${fg}">${tg}</div></div>`).join('') +
  `<div class="pillp" id="rP" style="left:36px;top:420px">Axle: a line. Rim dot: arches.</div>`;
const tLk = [wt('R2', 'axle'), wt('R3', 'rim'), wt('R4', 'both')];
const rr = $('#rrS'), RW = 62, RYc = 400 - RW, RX0 = 100, RDIST = 2 * Math.PI * RW * 1.4;
mk(rr, 'line', { x1: 36, y1: 400, x2: 748, y2: 400, stroke: IC, 'stroke-width': 3 }); for (let x = 48; x < 748; x += 28) mk(rr, 'line', { x1: x, y1: 404, x2: x - 14, y2: 418, stroke: C.dim, 'stroke-width': 2 });
const rAx = mk(rr, 'path', { fill: 'none', stroke: IC, 'stroke-width': 3, 'stroke-dasharray': '6 6' }), rRim = mk(rr, 'path', { fill: 'none', stroke: SC, 'stroke-width': 4 });
const rwO = mk(rr, 'g', {}), rw = mk(rwO, 'g', {}); mk(rw, 'circle', { r: RW, fill: 'none', stroke: IC, 'stroke-width': 7 }); for (let k = 0; k < 6; k++) mk(rw, 'line', { x1: 0, y1: 0, x2: RW * Math.cos(k * Math.PI / 3), y2: RW * Math.sin(k * Math.PI / 3), stroke: IC, 'stroke-width': 2 });
mk(rw, 'circle', { r: 8, fill: IC }); mk(rw, 'circle', { cx: 0, cy: RW, r: 9, fill: SC });
const rV = PUC.arrow(rr, VC, 6, 18), rVl = txt(rr, 0, 0, 'axle moves', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const rTurn = mk(rr, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), rTurnH = mk(rr, 'path', { fill: TC });
const rLa = txt(rr, 0, 460, 'axle: straight line', { fill: IC, 'font-weight': 700, 'font-size': 19 }), rLr = txt(rr, 0, 200, 'rim dot: arches', { fill: SC, 'font-weight': 700, 'font-size': 19 });
const tRg = wt('R2', 'axle') - 0.3, RDUR = 9;
const rollAt = t => { const u = M.clamp((t - tRg) / RDUR), x = RX0 + RDIST * u, ph = (x - RX0) / RW; return { x, ph, u }; };
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'So my cycle wheel does both at once!' });

/* ---------- K: side by side ---------- */
const kt = $('#ktS'); mk(kt, 'rect', { x: 36, y: 84, width: 712, height: 376, rx: 10, fill: WOOD, stroke: '#C9A27A', 'stroke-width': 4 });
const kTr = BD.map((_, i) => mk(kt, 'line', { stroke: DOTC[i], 'stroke-width': 3, 'stroke-dasharray': '6 6' }));
const kbO = mk(kt, 'g', {}), kb = mk(kbO, 'g', {}); mk(kb, 'rect', { x: 0, y: BY, width: BWd, height: BHt, rx: 8, fill: BOOK, stroke: IC, 'stroke-width': 3 }); mk(kb, 'rect', { x: 0, y: BY, width: 22, height: BHt, rx: 5, fill: '#7A4434', stroke: IC, 'stroke-width': 3 });
BD.forEach(([x, y], i) => dotL(kb, DOTC[i], 'ABC'[i]).set(x, BY + y));
const kbA = BD.map(() => PUC.arrow(kt, VC, 6, 18));
$('#ktP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Every point: the same velocity`;
const kr = $('#krS'); mk(kr, 'line', { x1: 40, y1: HY, x2: HX - 16, y2: HY, stroke: '#8D99AE', 'stroke-width': 14, 'stroke-linecap': 'round' }); mk(kr, 'line', { x1: HX + 400, y1: HY, x2: 748, y2: HY, stroke: '#8D99AE', 'stroke-width': 14, 'stroke-linecap': 'round' });
const kTrD = RD.map((_, i) => mk(kr, 'path', { fill: 'none', stroke: DOTC[i], 'stroke-width': 4 }));
const kDoor = doorM(kr, HX, HY, 360); hingeM(kr, HX, HY);
const kDots = RD.map((_, i) => dotL(kr, DOTC[i], 'ABC'[i]));
const kTh = mk(kr, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 });
$('#krP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Same angle θ · speed grows with r`;
const th2 = PUC.think($('#th2'), { q: 'A giant wheel turns, and each cabin hangs upright. Is a cabin in translation or rotation?', opts: ['Translation', 'Rotation'], right: 0, why: 'It stays upright: every point of it moves the same way.' });
$('#th2 .tq').style.width = '1140px';
const gw = $('#gwS'), GC = [160, 150], GR = 112;
mk(gw, 'path', { d: `M${GC[0]},${GC[1]} L${GC[0] - 70},330 M${GC[0]},${GC[1]} L${GC[0] + 70},330`, stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' });
const gwG = mk(gw, 'g', {}); mk(gwG, 'circle', { cx: 0, cy: 0, r: GR, fill: 'none', stroke: IC, 'stroke-width': 4 }); for (let k = 0; k < 6; k++) mk(gwG, 'line', { x1: 0, y1: 0, x2: GR * Math.cos(k * Math.PI / 3), y2: GR * Math.sin(k * Math.PI / 3), stroke: IC, 'stroke-width': 2 });
mk(gw, 'circle', { cx: GC[0], cy: GC[1], r: 9, fill: IC });
const gwC = [0, 1, 2, 3, 4, 5].map(k => { const o = mk(gw, 'g', {}); mk(o, 'line', { x1: 0, y1: 0, x2: 0, y2: 14, stroke: IC, 'stroke-width': 2.5 }); mk(o, 'rect', { x: -20, y: 14, width: 40, height: 30, rx: 6, fill: k === 0 ? VC : '#8D99AE', stroke: IC, 'stroke-width': 2.5 }); return o; });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A door 80 cm wide swings shut through 90° in 2 s, at a steady rate. How far, and how fast, does its edge move?';
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(TC, '\\theta')} = 90^\\circ = \\tfrac{\\pi}{2} \\approx 1.57\\,\\text{rad}`)],
  [K(`${tc(SC, 's')} = ${tc(SC, 'r')}${tc(TC, '\\theta')} = 0.8 \\times 1.57 \\approx ${tc(SC, '1.26\\,\\text{m}')}`)],
  [K(`${tc(VC, 'v')} = \\tfrac{${tc(SC, 's')}}{t} = \\tfrac{1.26}{2} \\approx ${tc(VC, '0.63\\,\\text{m/s}')}`)],
  [K(`${tc(SC, 'r')} = 0.2\\,\\text{m}:\\ \\tfrac14\\ \\text{as fast} \\approx ${tc(VC, '0.16\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 216, dy: 88 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WH = [140, 490], WL = 380, WRi = 95;
mk(w, 'line', { x1: 40, y1: WH[1], x2: WH[0] - 16, y2: WH[1], stroke: '#8D99AE', 'stroke-width': 14, 'stroke-linecap': 'round' }); mk(w, 'line', { x1: WH[0] + WL + 30, y1: WH[1], x2: 748, y2: WH[1], stroke: '#8D99AE', 'stroke-width': 14, 'stroke-linecap': 'round' });
const wTrE = mk(w, 'path', { fill: 'none', stroke: SC, 'stroke-width': 5 }), wTrI = mk(w, 'path', { fill: 'none', stroke: SC, 'stroke-width': 5 });
const wDoor = doorM(w, WH[0], WH[1], WL); hingeM(w, WH[0], WH[1]);
const wdE = dotL(w, DOTC[2], ''), wdI = dotL(w, DOTC[0], '');
const wTh = mk(w, 'path', { d: arcP(WH[0], WH[1], 50, 0, 90), fill: 'none', stroke: TC, 'stroke-width': 4 }), wThl = txt(w, WH[0] - 70, WH[1] - 50, 'π/2', { fill: TC, 'font-weight': 700, 'font-size': 20 });
const wLe = txt(w, 470, 196, 's = 1.26 m', { fill: SC, 'font-weight': 700, 'font-size': 22 }), wLi = txt(w, 252, 372, '0.31 m', { fill: SC, 'font-weight': 700, 'font-size': 20 });
const wVe = txt(w, 470, 226, 'v ≈ 0.63 m/s', { fill: VC, 'font-weight': 700, 'font-size': 22 }), wVi = txt(w, 252, 398, 'v ≈ 0.16 m/s', { fill: VC, 'font-weight': 700, 'font-size': 20 });
const wRl = [txt(w, WH[0] + 200, WH[1] + 40, 'r = 0.8 m (edge)', { fill: SC, 'font-weight': 600, 'font-size': 18 }), txt(w, WH[0] + 12, WH[1] + 40, '0.2 m', { fill: SC, 'font-weight': 600, 'font-size': 18 })];
const tWs = T0('W2') + 1.2, tW = [wt('W3', 'Ninety'), wt('W4', 'Distance'), wt('W5', 'Speed'), wt('W6', 'point')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A rolling wheel is in pure rotation', right: 'Rolling = translation + rotation: the axle moves' });
const tp = $('#tpS');
const tpF = [txt(tp, 110, 46, 'PURE ROTATION', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1 }), txt(tp, 440, 46, 'ROLLING', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1 })];
const tpW = [[110, 140], [380, 140]].map(([x, y]) => { const o = mk(tp, 'g', {}), g2 = mk(o, 'g', {}); mk(g2, 'circle', { r: 56, fill: 'none', stroke: IC, 'stroke-width': 6 }); for (let k = 0; k < 6; k++) mk(g2, 'line', { x1: 0, y1: 0, x2: 56 * Math.cos(k * Math.PI / 3), y2: 56 * Math.sin(k * Math.PI / 3), stroke: IC, 'stroke-width': 2 }); mk(g2, 'circle', { r: 7, fill: IC }); return { o, g2, x, y }; });
mk(tp, 'line', { x1: 300, y1: 197, x2: 620, y2: 197, stroke: IC, 'stroke-width': 3 });
const tpPin = mk(tp, 'path', { d: 'M110,140 L92,226 L128,226 Z', fill: '#8D99AE', stroke: IC, 'stroke-width': 2.5 });
const tpL = [txt(tp, 110, 256, 'axle fixed', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 19 }), txt(tp, 470, 256, 'axle moves: + translation', { 'text-anchor': 'middle', fill: VC, 'font-weight': 700, 'font-size': 19 })];
const tpV = PUC.arrow(tp, VC, 6, 18);
const where = PUC.where($('#wa'), { on: [], type: 'Concept questions: translation, rotation or both, and the speed of points at different r' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A door 1.2 m wide turns on its hinge. In 0.5 s, a point 30 cm from the hinge moves 15 cm along its arc. How far does the edge move, and through what angle?', qW: 780,
  opts: ['60 cm, 0.5 rad', '60 cm, 2 rad', '15 cm, 0.5 rad', '60 cm, 0.125 rad'], right: 0, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`${tc(TC, '\\theta')} = \\tfrac{${tc(SC, 's')}}{${tc(SC, 'r')}} = \\tfrac{0.15}{0.3} = 0.5\\,\\text{rad}`)], [K(`\\text{same } ${tc(TC, '\\theta')} \\text{ for every point}`)],
  [K(`\\text{edge: } ${tc(SC, 'r')} = 1.2\\,\\text{m} = 4 \\times 0.3\\,\\text{m}`)], [K(`${tc(SC, 's')} = 1.2 \\times 0.5 = ${tc(SC, '0.6\\,\\text{m}')}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const tSo = [wt('A2', 'Theta'), wt('A2', 'Half'), wt('A3', 'edge'), wt('A3', 'sixty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · rigid body motion', y0: 104, dy: 76, txt: [0, 1, 1, 1, 1],
  lines: [K(`${tc(SC, 's')} = ${tc(SC, 'r')}\\,${tc(TC, '\\theta')} \\qquad ${tc(VC, 'v')} = \\tfrac{${tc(SC, 'r')}${tc(TC, '\\theta')}}{t} \\propto ${tc(SC, 'r')}`),
    '<b>Rigid body</b>: the distance between any two points never changes', '<b>Translation</b>: every point has the same velocity (path may curve)',
    '<b>Rotation</b> (fixed axis): circles round the axis, same angle θ', '<b>Rolling</b> = translation + rotation'] });
const YQ = ['Why is a giant wheel cabin in translation?', 'Why does a door\'s edge move faster than a point near the hinge?', 'Why is a rolling wheel not in pure rotation?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 92', topic: 'Coins on one end: where does the ruler balance? Centre of Mass', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tV6 + 0.05, 1.06, 960, 540], [tV9 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const drawDoorAt = (th, hx, hy, rs, dots, tr, dr) => { rs.forEach((r, i) => { const p = pol(hx, hy, r, th); dots[i].set(p[0], p[1]); if (tr) attr(tr[i], 'd', th > 0.3 ? arcP(hx, hy, r, 0, th) : ''); }); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    const tt = Math.max(0, t - tMorph);
    attr(drw, 'transform', `translate(${(34 * (1 - Math.cos(tt * 2.6))).toFixed(1)},0)`);
    attr(fanG, 'transform', `translate(230,60) rotate(${(tt * 240).toFixed(1)})`);
    { const ph = 1.3 * Math.sin(tt * 1.6); attr(whG, 'transform', `translate(${(160 + 40 * ph).toFixed(1)},64) rotate(${(ph / D2R).toFixed(1)})`); }
    vis($('#hjP'), t, wt('H2', 'two') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkI'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 20 });
    const u = M.io((t - tHd) / 2.2), th = 90 * u;
    hDoor.set(th); vis(hDoor.o, t, wt('H3', 'door') - 0.2, 1e9, { dy: 0 });
    const pn = pol(HH[0], HH[1], 70, th), pf = pol(HH[0], HH[1], 252, th); hdN.set(pn[0], pn[1]); hdF.set(pf[0], pf[1]);
    vis(hdN.g, t, tHd - 0.3, 1e9, { dy: 0 }); vis(hdF.g, t, tHd - 0.3, 1e9, { dy: 0 });
    attr(hTrN, 'd', th > 0.5 ? arcP(HH[0], HH[1], 70, 0, th) : ''); attr(hTrF, 'd', th > 0.5 ? arcP(HH[0], HH[1], 252, 0, th) : '');
    attr(hLN, 'x', pn[0] + 18); attr(hLN, 'y', pn[1] - 10); attr(hLF, 'x', pf[0] + 20); attr(hLF, 'y', pf[1] + 6);
    vis(hLN, t, tHd - 0.2, 1e9, { dy: 0 }); vis(hLF, t, tHd - 0.2, 1e9, { dy: 0 });
    vis($('#hkQ'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tau = Math.max(0, t - tPl), cx = 392 + 110 * Math.sin(0.8 * tau), cy = 250 + 26 * Math.sin(1.3 * tau), an = 28 * Math.sin(0.6 * tau);
    attr(pl, 'transform', `translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${an.toFixed(2)})`); vis(plO, t, tP1 + 0.3, 1e9, { dy: 0 });
    vis(pDl, t, wt('P1', 'distance') - 0.1, 1e9, { dy: 8 });
    vis($('#pqP'), t, tP2 + 0.1, 1e9, POP);
    vis($('#pm'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#mb0'), t, wt('P4', 'Translation') - 0.1, 1e9, { dy: 24 }); vis($('#mb1'), t, wt('P4', 'rotation') - 0.1, 1e9, { dy: 24 });
    const t0 = Math.max(0, t - wt('P4', 'Translation')), bxm = 40 + 80 * (1 - Math.cos(t0 * 1.7)) / 2;
    attr(m0b, 'x', bxm.toFixed(1)); m0g.forEach((e, j) => { const gx = 40 + 80 * (1 - Math.cos((t0 - 0.12 * (j + 1)) * 1.7)) / 2; attr(e, 'x', gx.toFixed(1)); e.style.opacity = Math.abs(gx - bxm) > 3 ? [0.3, 0.2, 0.12][j] : 0; });
    const vv = Math.sin(t0 * 1.7); m0a.forEach((a, j) => { const y = 112 + j * 36, x = bxm + 30; a.set(x, y, x + 54 * vv, y); });
    const t1 = Math.max(0, t - wt('P4', 'rotation')); attr(m1g, 'transform', `rotate(${(-50 * (1 - Math.cos(t1 * 1.5)) / 2).toFixed(2)} 170 130)`);
    vis($('#pmP'), t, wt('P5', 'axis') - 0.1, 1e9, POP);
  }

  /* S: book, then door */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('V9'), simIn2 = OUT('V10') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), th = thOf(S), dm = S.m > 0;
    M.setT($('#simL'), dm ? 'TOP VIEW · THE DOOR AND ITS HINGE' : 'TOP VIEW · AARAV\'S BOOK ON THE TABLE');
    vis(bookW, t, tS1 + 0.3, tV1 - 0.1, { dy: 0, outDur: 0.3, ody: 0 }); vis(doorW, t, tV1 + 0.1, 1e9, { dy: 0 });
    if (!dm) {
      const bx = BX0 + PXB * 0.3 * S.tau, mv = S.tau > 0.01 && S.tau < 2;
      attr(bk, 'transform', `translate(${bx.toFixed(1)},0)`);
      bGh.forEach((e, j) => { const gx = BX0 + PXB * 0.3 * Math.max(0, S.tau - 0.14 * (j + 1)); attr(e, 'x', gx.toFixed(1)); e.style.opacity = mv && bx - gx > 4 ? [0.35, 0.22, 0.12][j] : 0; });
      BD.forEach(([x, y], i) => { attr(bTr[i], 'x1', BX0 + x); attr(bTr[i], 'y1', BY + y); attr(bTr[i], 'x2', (bx + x).toFixed(1)); attr(bTr[i], 'y2', BY + y); bTr[i].style.opacity = S.tau > 0.02 ? 1 : 0;
        const ua = M.o3((t - tB0 + 0.2) / 0.4) * (S.tau < 2 ? 1 : 1 - M.io((S.tau - 2) / 0.3)), L = PVB * 0.3 * ua * (S.tau >= 2 ? 0 : 1); bArr[i].set(bx + x + 14, BY + y, bx + x + 14 + L, BY + y); });
      attr(bArrL, 'x', (bx + BD[2][0] + 20).toFixed(1)); attr(bArrL, 'y', BY + BD[2][1] + 40); bArrL.style.opacity = (S.tau > 0.05 && S.tau < 2 && t > T0('S3') - 0.2) ? 1 : 0;
      const up = M.io((t - wt('S5', 'parallel') + 0.1) / 0.4);
      [0, 1, 2].forEach(k => { const xo = BX0 + PXB * 0.3 * k; attr(bPar[k], 'x1', xo + BD[0][0]); attr(bPar[k], 'y1', BY + BD[0][1]); attr(bPar[k], 'x2', xo + BD[2][0]); attr(bPar[k], 'y2', BY + BD[2][1]); bPar[k].style.opacity = (up * 0.8).toFixed(3); });
      bParL.style.opacity = up.toFixed(3); bLine.style.opacity = M.io((t - wt('S5', 'line') + 0.1) / 0.4).toFixed(3);
    }
    if (dm) {
      door.set(th); vis(door.o, t, tV1 + 0.3, 1e9, { dy: 0 });
      RD.forEach((r, i) => { const p = pol(HX, HY, r, th); dDots[i].set(p[0], p[1]); vis(dDots[i].g, t, wt('V2', ['A', 'sixty', 'ninety'][i]) - 0.1, 1e9, { dy: 0 });
        attr(dTr[i], 'd', th > 0.3 ? arcP(HX, HY, r, 0, S.m === 1 && S.replay ? 90 : th) : '');
        const v = RM[i] * (S.m === 2 ? Math.PI / 2 : Math.PI / 4), moving = (S.m === 1 && (S.replay || (S.tau > 0 && S.tau < 2))) || (S.m === 2 && S.tau > 0 && S.tau < 1) || S.frozen;
        const L = moving ? v * PVD : 0; dArr[i].set(p[0], p[1], p[0] - L * Math.sin(th * D2R), p[1] - L * Math.cos(th * D2R));
        dCirc[i].style.opacity = (M.io((t - tV4 - 0.2) / 0.4) * 0.8 * (S.m === 2 ? 0 : 1)).toFixed(3);
        const ur = S.frozen ? M.io((t - wt('V8', 'farther') + 0.1) / 0.3) : 0; attr(dR[i], 'x1', HX); attr(dR[i], 'y1', HY); attr(dR[i], 'x2', p[0].toFixed(1)); attr(dR[i], 'y2', p[1].toFixed(1)); dR[i].style.opacity = ur;
        attr(dRl[i], 'x', (p[0] + 18).toFixed(1)); attr(dRl[i], 'y', (p[1] + (i === 2 ? -14 : 26)).toFixed(1)); dRl[i].style.opacity = (dm && t < tV5 ? M.io((t - wt('V2', ['thirty', 'sixty', 'ninety'][i])) / 0.3) : ur).toFixed(3); });
      const mv = (S.m === 1 && !S.frozen && (S.replay || (S.tau > 0.02 && S.tau < 2))) || (S.m === 2 && S.tau > 0.02 && S.tau < 1), gstep = S.replay ? 0.04 : 0.1;
      dGh.forEach((q, j) => { const tg = Math.max(0, S.tau - gstep * (j + 1)), thg = S.m === 2 ? 90 * tg : 45 * tg; attr(q.g, 'transform', `rotate(${(-thg).toFixed(2)} ${HX} ${HY})`); q.o.style.opacity = mv && th - thg > 1 ? [0.45, 0.3, 0.16][j] : 0; });
      const uth = S.frozen ? M.io((t - wt('V7', 'same') + 0.1) / 0.4) : 0;
      attr(dTh, 'd', uth > 0.01 ? arcP(HX, HY, 70, 0, th * uth) : ''); const pl2 = pol(HX, HY, 92, th / 2); attr(dThL, 'x', pl2[0].toFixed(1)); attr(dThL, 'y', (pl2[1] + 8).toFixed(1)); dThL.style.opacity = uth;
      vis(dAxL, t, wt('V1', 'axis') - 0.1, 1e9, { dy: 0 });
    }
    vis($('#rdy'), t, tS1 + 0.6, tB0 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 }); if (t > tV1) vis($('#rdy'), t, tV1 + 0.6, tD0 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tV6 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz, tV9 - 0.4, { ...POP, sc: 0.8 });
    // readout: round t first, then compute
    const tr = Math.round(S.tau * 100) / 100, thr = S.m === 2 ? 90 * tr : S.m === 1 ? 45 * tr : 0, w0 = S.m === 2 ? Math.PI / 2 : Math.PI / 4;
    M.setT($('#roT'), ['BOOK · 0.30 m/s', 'DOOR · 90° IN 2 s', 'DOOR · TWICE AS FAST'][S.m]); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_th'), thr.toFixed(1));
    const vs = dm ? RM.map(r => r * w0) : [0.3, 0.3, 0.3], movingR = dm ? (S.m === 1 ? (S.replay || S.frozen || (tr > 0 && tr < 2)) : tr > 0 && tr < 1) : tr > 0 && tr < 2;
    ['A', 'B', 'C'].forEach((n, i) => M.setT($('#r_v' + n), f2(movingR ? vs[i] : 0)));
    M.setT($('#r_q'), tr > 0 ? (dm ? '3.00' : '1.00') : '-');
    $('#r_q').style.background = mix('#FFFFFF', '#EFE9FB', M.io((t - tV5) / 0.3) * (1 - M.io((t - tV6) / 0.3)) + (S.m === 2 ? M.io((t - wt('V10', 'three')) / 0.3) : 0));
    // graph: s = 0.3 t (book) or s = r w t (door)
    const sf = i => x => dm ? RM[i] * w0 * x : 0.3 * x, gEnd = S.m === 1 && (S.replay || S.frozen) ? 2 : S.tau;
    gP.forEach((p, i) => plot(p, sf(i), gEnd));
    gF.forEach((p, i) => plot(p, x => RM[i] * Math.PI / 4 * x, S.m === 2 ? 2 : 0));
    gD.forEach((d, i) => d(S.tau, sf(i)(S.tau), t >= (dm ? tD0 - 0.1 : tB0 - 0.1)));
    M.setT(gLab, dm ? 'C covers 3 × A' : 'A = B = C : one line'); gLab.style.opacity = dm ? M.io((t - wt('V5', 'three')) / 0.3) : M.io((t - wt('S4', 'top')) / 0.3) * (1 - M.io((t - tV1 + 0.4) / 0.3));
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    avA(t, wt('S5', 'translation') + 0.2, tV1 - 0.3);
    vis($('#th1'), t, tV9 + 0.05, OUT('V10'), { dy: 36, ...o });
    th1(t, { tin: tV9, tOpts: wt('V9', 'Will') - 0.1, tCount: T1('V9') + 0.05, dur: 3, tAns: tV10 - 0.02, tWhy: wt('V10', 'dots') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    ST.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 12).toFixed(1) + 'px';
    vis($('#dpan'), t, tStep[1] - 0.2, 1e9, { dx: 40, dy: 0 });
    dpR.forEach((e, i) => M.draw(e, t, wt('D3', 'every') + i * 0.2, 0.5)); dpD.forEach((e, i) => vis(e, t, wt('D3', 'every') + 0.4 + i * 0.2, 1e9, { dy: 0 }));
    M.draw(dpT, t, wt('D3', 'angle') - 0.1, 0.5); vis(dpTl, t, wt('D3', 'angle'), 1e9, { dy: 0 });
    vis(dpL[0], t, wt('D4', 'distance'), 1e9, { dy: 0 }); vis(dpL[1], t, wt('D5', 'Double'), 1e9, { dy: 0 });
    M.draw(dpA[0], t, wt('D4', 'arc') - 0.1, 0.6); vis(dpL[2], t, wt('D4', 'arc') + 0.4, 1e9, { dy: 0 });
    M.draw(dpA[1], t, wt('D5', 'Double') + 0.2, 0.6); vis(dpL[3], t, wt('D5', 'doubles') - 0.1, 1e9, { dy: 0 });
    vis(dpAx, t, wt('D6', 'axis') - 0.1, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'translation') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'angle') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.2, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'axle') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const k = rollAt(t); attr(rw, 'transform', `translate(${k.x.toFixed(1)},${RYc}) rotate(${(k.ph / D2R).toFixed(2)})`); vis(rwO, t, tR1 + 0.6, 1e9, { dy: 0 });
    attr(rAx, 'd', k.u > 0 ? `M${RX0},${RYc} L${k.x.toFixed(1)},${RYc}` : '');
    { let d = ''; const n = 120; for (let i = 0; i <= n; i++) { const ph = k.ph * i / n, x = RX0 + RW * ph; d += (i ? 'L' : 'M') + (x - RW * Math.sin(ph)).toFixed(1) + ',' + (RYc + RW * Math.cos(ph)).toFixed(1); } attr(rRim, 'd', k.u > 0 ? d : ''); }
    rRim.style.opacity = M.io((t - wt('R3', 'rim')) / 0.4).toFixed(3);
    const uv = M.o3((t - wt('R2', 'axle') + 0.1) / 0.4) * (k.u < 1 ? 1 : 0); rV.set(k.x, RYc, k.x + 90 * uv, RYc); attr(rVl, 'x', (k.x + 10).toFixed(1)); attr(rVl, 'y', RYc - 22); rVl.style.opacity = uv;
    const ut = M.io((t - wt('R3', 'round') + 0.1) / 0.4) * (k.u < 1 ? 1 : 0), a0 = 120, a1 = 40;
    attr(rTurn, 'd', ut > 0.01 ? arcP(k.x, RYc, RW + 22, a0, a0 - (a0 - a1) * ut) : ''); const hp = pol(k.x, RYc, RW + 22, a0 - (a0 - a1) * ut), hd = (a0 - (a0 - a1) * ut - 90) * D2R;
    attr(rTurnH, 'd', ut > 0.01 ? `M${(hp[0] + 12 * Math.cos(hd)).toFixed(1)},${(hp[1] - 12 * Math.sin(hd)).toFixed(1)} L${(hp[0] - 8 * Math.sin(hd)).toFixed(1)},${(hp[1] - 8 * Math.cos(hd)).toFixed(1)} L${(hp[0] + 8 * Math.sin(hd)).toFixed(1)},${(hp[1] + 8 * Math.cos(hd)).toFixed(1)} Z` : '');
    attr(rLa, 'x', 60); rLa.style.opacity = M.io((t - wt('R4', 'line') + 0.1) / 0.3); attr(rLr, 'x', 300); rLr.style.opacity = M.io((t - wt('R4', 'arches') + 0.1) / 0.3);
    avR(t, wt('R4', 'arches') + 0.5, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kt'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    const ta = M.clamp(t - tK1 - 0.6, 0, 2), bx = BX0 + PXB * 0.3 * ta; attr(kb, 'transform', `translate(${bx.toFixed(1)},0)`);
    BD.forEach(([x, y], i) => { attr(kTr[i], 'x1', BX0 + x); attr(kTr[i], 'y1', BY + y); attr(kTr[i], 'x2', (bx + x).toFixed(1)); attr(kTr[i], 'y2', BY + y); const L = ta > 0 && ta < 2 ? 90 : 0; kbA[i].set(bx + x + 14, BY + y, bx + x + 14 + L, BY + y); });
    const tb = M.clamp(t - tK2 - 0.3, 0, 2), thk = 45 * tb; kDoor.set(thk);
    RD.forEach((r, i) => { const p = pol(HX, HY, r, thk); kDots[i].set(p[0], p[1]); attr(kTrD[i], 'd', thk > 0.3 ? arcP(HX, HY, r, 0, thk) : ''); });
    attr(kTh, 'd', thk > 0.3 ? arcP(HX, HY, 70, 0, thk) : '');
    vis($('#ktP'), t, wt('K1', 'same') - 0.1, 1e9, POP); vis($('#krP'), t, wt('K2', 'angle') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'cabin') });
    const ga = Math.max(0, t - tK3) * 22; attr(gwG, 'transform', `translate(${GC[0]},${GC[1]}) rotate(${(-ga).toFixed(2)})`);
    gwC.forEach((c, k2) => { const p = pol(GC[0], GC[1], GR, ga + k2 * 60); attr(c, 'transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)})`); });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const u = M.clamp((t - tWs) / 2), th = 90 * (1 - u); wDoor.set(th);
    const pe = pol(WH[0], WH[1], WL, th), pi = pol(WH[0], WH[1], WRi, th); wdE.set(pe[0], pe[1]); wdI.set(pi[0], pi[1]);
    attr(wTrE, 'd', u > 0.003 ? arcP(WH[0], WH[1], WL, 90, th) : ''); attr(wTrI, 'd', u > 0.003 ? arcP(WH[0], WH[1], WRi, 90, th) : '');
    vis(wTh, t, tW[0], 1e9, { dy: 0 }); vis(wThl, t, tW[0] + 0.2, 1e9, { dy: 0 });
    vis(wLe, t, tW[1] + 0.6, 1e9, { dy: 0 }); vis(wVe, t, tW[2] + 0.6, 1e9, { dy: 0 }); vis(wLi, t, tW[3] + 0.2, 1e9, { dy: 0 }); vis(wVi, t, tW[3] + 0.5, 1e9, { dy: 0 });
    wRl.forEach((e, i) => vis(e, t, T0('W2') + 0.8 + i * 0.2, 1e9, { dy: 0 }));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'rolling') - 0.1, tStrike: wt('X3', 'axle') - 0.1, tRight: wt('X3', 'Rolling') });
    const ta = Math.max(0, t - tX1), tm = Math.max(0, t - wt('X3', 'axle'));
    tpF.forEach((e, i) => vis(e, t, tX1 + 0.4 + i * 0.2, 1e9, { dy: 0 }));
    const xr = tpW[1].x + Math.min(tm, 3.2) * 50;
    attr(tpW[0].g2, 'transform', `translate(${tpW[0].x},${tpW[0].y}) rotate(${(ta * 120).toFixed(1)})`);
    attr(tpW[1].g2, 'transform', `translate(${xr.toFixed(1)},${tpW[1].y}) rotate(${(Math.min(tm, 3.2) * 50 / 56 / D2R).toFixed(1)})`);
    tpW.forEach((q, i) => vis(q.o, t, tX1 + 0.5 + i * 0.2, 1e9, { dy: 0 })); vis(tpPin, t, tX1 + 0.5, 1e9, { dy: 0 });
    tpL.forEach((e, i) => vis(e, t, i ? wt('X3', 'axle') : tX1 + 0.7, 1e9, { dy: 0 }));
    const uv = M.o3((t - wt('X3', 'axle')) / 0.4) * (tm < 3.2 ? 1 : 0); tpV.set(xr, tpW[1].y, xr + 80 * uv, tpW[1].y);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'concept') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.2, tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
