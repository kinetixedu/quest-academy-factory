// PUC Physics Ep 103: Centre of gravity (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, VI = C.violet, TC = C.gold, GC = C.red, MC = C.ink;   // force/torque orange, distance violet, theta gold, g red, mass ink
const CARD = '#E9C98F', CARDS = '#B98A4E';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f3 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(3), f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);

/* the cut-out: one irregular polygon (body coordinates, origin at its centroid G) */
const RAW = [[0, 40], [70, 0], [170, 14], [262, -22], [304, 40], [268, 112], [300, 182], [204, 212], [124, 170], [40, 204], [8, 132]];
const cen = (() => { let A = 0, cx = 0, cy = 0; for (let i = 0; i < RAW.length; i++) { const [x0, y0] = RAW[i], [x1, y1] = RAW[(i + 1) % RAW.length], c = x0 * y1 - x1 * y0; A += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c; } A /= 2; return [cx / (6 * A), cy / (6 * A)]; })();
const PLATE = RAW.map(([x, y]) => [x - cen[0], y - cen[1]]);
const HOLE = { A: [70 - cen[0], 42 - cen[1]], B: [262 - cen[0], 20 - cen[1]] };
const polyD = (s = 1) => 'M' + PLATE.map(([x, y]) => `${(x * s).toFixed(1)},${(y * s).toFixed(1)}`).join(' L') + ' Z';
let cpN = 0;
// draws the plate into an outer group; returns {o, g (body frame), set(px, py, rotDeg)}
const plate = (p, s = 1, o2 = {}) => {
  const o = mk(p, 'g', {}), g = mk(o, 'g', {}), id = 'cp' + (cpN++);
  const cp = mk(mk(g, 'defs', {}), 'clipPath', { id }); mk(cp, 'path', { d: polyD(s) });
  mk(g, 'path', { d: polyD(s), fill: o2.fill || CARD, stroke: CARDS, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const clip = mk(g, 'g', { 'clip-path': `url(#${id})` });
  return { o, g, clip, set(x, y, r = 0) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${r.toFixed(2)})`); } };
};
const gMark = (p, r = 13) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill: '#fff', stroke: MC, 'stroke-width': 3 }); mk(g, 'path', { d: `M${-r + 4},0 H${r - 4} M0,${-r + 4} V${r - 4}`, stroke: TC, 'stroke-width': 3, 'stroke-linecap': 'round' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const hole = (p, x, y, r = 7) => mk(p, 'circle', { cx: x, cy: y, r, fill: C.paper, stroke: MC, 'stroke-width': 2.5 });
const arcP = (cx, cy, r, a0, a1) => { const p0 = [cx + r * Math.sin(a0 * D2R), cy + r * Math.cos(a0 * D2R)], p1 = [cx + r * Math.sin(a1 * D2R), cy + r * Math.cos(a1 * D2R)]; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 0 ${a1 > a0 ? 0 : 1} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };   // angles from straight down, + toward +x
const curvA = (p, col) => { const o = mk(p, 'g', {}), pa = mk(o, 'path', { fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }), hd = mk(o, 'path', { fill: col });
  return { o, set(cx, cy, r, a0, a1) { if (Math.abs(a1 - a0) < 2) { M.hide(o, true); return; } M.hide(o, false); attr(pa, 'd', arcP(cx, cy, r, a0, a1)); const s = Math.sign(a1 - a0), e = [cx + r * Math.sin(a1 * D2R), cy + r * Math.cos(a1 * D2R)], tg = [Math.cos(a1 * D2R) * s, -Math.sin(a1 * D2R) * s], nm = [-tg[1], tg[0]];
    attr(hd, 'd', `M${(e[0] + tg[0] * 14).toFixed(1)},${(e[1] + tg[1] * 14).toFixed(1)} L${(e[0] + nm[0] * 8).toFixed(1)},${(e[1] + nm[1] * 8).toFixed(1)} L${(e[0] - nm[0] * 8).toFixed(1)},${(e[1] - nm[1] * 8).toFixed(1)} Z`); } }; };

Object.assign(M.IC, {
  walker: ['M2 8h20', 'M12 4.5a1.5 1.5 0 1 0 0.01 0', 'M12 6v7', 'M12 13l-3 7', 'M12 13l3 7', 'M12 8'],
  truck: ['M2 6h11v10H2z', 'M13 9h4l4 4v3h-8z', 'M4 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0'],
  bird: ['M5 12c2-3 5-5 9-4 3 1 5 3 6 5l-4 1c-1 3-4 5-7 4-3-1-4-3-4-6Z', 'M12 19v3'],
  down: ['M12 4v14', 'm6 12 6 6 6-6'],
  turn: ['M20 12a8 8 0 1 1-3-6.2', 'M20 4v4h-4'],
  target: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v10', 'M7 12h10'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4');
const tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tK4 = T0('K4');
const tB1 = T0('B1'), tB2 = T0('B2'), tB3 = T0('B3'), tB4 = T0('B4'), tB5 = T0('B5');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['walker', 'Tightrope walker', 'CARRIES A LONG POLE'], ['truck', 'Hay truck', 'TIPS OVER ON A TURN'], ['bird', 'Toy bird', 'BALANCES ON ITS BEAK']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'tightrope'), wt('H1', 'truck'), wt('H1', 'bird')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="120"></svg></div>`).join('');
// mini drawings (outer g per drawing: inner g rocks)
const MINI = [0, 1, 2].map(i => { const s = $('#jsv' + i), o = mk(s, 'g', {}), g = mk(o, 'g', {}); return { s, o, g }; });
{ const g = MINI[0].g; mk(MINI[0].s, 'line', { x1: 0, y1: 92, x2: 300, y2: 92, stroke: C.ink2, 'stroke-width': 2.5 });
  mk(g, 'line', { x1: 40, y1: 46, x2: 260, y2: 46, stroke: '#8D6B45', 'stroke-width': 5, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: 150, cy: 24, r: 9, fill: MC }); mk(g, 'path', { d: 'M150 33 V66 M150 66 L140 92 M150 66 L160 92 M120 46 L150 40 L180 46', stroke: MC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); }
{ const g = MINI[1].g; mk(MINI[1].s, 'line', { x1: 20, y1: 104, x2: 290, y2: 104, stroke: C.ink2, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: 100, y: 16, width: 110, height: 58, rx: 6, fill: '#E8C766', stroke: MC, 'stroke-width': 2.5 }); mk(g, 'rect', { x: 110, y: 62, width: 120, height: 26, rx: 4, fill: '#5B6B8C', stroke: MC, 'stroke-width': 2.5 });
  mk(g, 'circle', { cx: 130, cy: 94, r: 10, fill: MC }); mk(g, 'circle', { cx: 212, cy: 94, r: 10, fill: MC }); }
{ const s = MINI[2].s, g = MINI[2].g; mk(s, 'path', { d: 'M150 120 V70 a10 10 0 0 1 20 0 V120', fill: '#F2C7A5', stroke: MC, 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M160 60 C120 50 96 30 80 8 M160 60 C200 50 224 30 240 8', fill: 'none', stroke: C.ac, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M160 60 l-7-16 h14 Z', fill: C.ac }); mk(g, 'circle', { cx: 80, cy: 8, r: 7, fill: C.ac }); mk(g, 'circle', { cx: 240, cy: 8, r: 7, fill: C.ac }); }
const MG = [[150, 74, 0], [158, 52, 1], [160, 92, 2]].map(([x, y, i]) => { const m = gMark(MINI[i].g, 9); m.set(x, y); return m; });
const tSpecial = wt('H2', 'special');
// Aarav's card: the cut-out on a pencil
const hs = $('#hkS'), HP = [280, 330];
const pencil = mk(hs, 'g', {}), pin2 = mk(pencil, 'g', {});
const hPl = plate(hs, 0.95);
mk(pin2, 'path', { d: 'M0,0 L-9,26 H9 Z', fill: '#EBD3AE', stroke: MC, 'stroke-width': 2 }); mk(pin2, 'path', { d: 'M0,0 L-3,9 H3 Z', fill: MC }); mk(pin2, 'rect', { x: -9, y: 26, width: 18, height: 140, fill: '#E8B33A', stroke: MC, 'stroke-width': 2 });
const TRY = [[-70, 'here'], [80, 'there']].map(([dx, w]) => ({ dx, t: wt('H4', w) - 0.15 }));
const xMarks = TRY.map(() => { const o = mk(hs, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r: 15, fill: C.red }); mk(g, 'path', { d: 'M-6,-6 L6,6 M6,-6 L-6,6', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round' }); return { o, g }; });

/* ---------- P: what it is ---------- */
const QR = [['down', FC, 'Every bit has weight', 'gravity pulls each tiny bit down'], ['turn', FC, 'Left bits vs right bits', 'they try to turn the card opposite ways'], ['target', TC, 'One point where they cancel', 'that point is the centre of gravity, G']];
$('#qrs').innerHTML = QR.map(([ic, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 128}px"><div class="qs">${M.icon(ic, 30, c, 2.6)}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
$('#lawP').innerHTML = `${M.icon('check', 26, '#8FE0B0', 3)}Pencil right under G: the card balances`;
const tQr = [wt('P1', 'Every'), wt('P2', 'Bits'), wt('P3', 'one')];
const pm = $('#pmS'), PC0 = [392, 300];
const pPl = plate(pm, 1.15);
const bitA = []; for (let gx = -150; gx <= 170; gx += 54) for (let gy = -110; gy <= 130; gy += 54) { bitA.push([gx, gy]); }
const inPoly = (x, y, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const BITS = bitA.filter(([x, y]) => inPoly(x / 1.15, y / 1.15, PLATE) && inPoly(x / 1.15, (y + 26) / 1.15, PLATE));
const bitG = mk(pPl.g, 'g', {});
const bitEls = BITS.map(([x, y]) => { const o = mk(bitG, 'g', {}); mk(o, 'circle', { cx: x, cy: y, r: 4, fill: MC }); const a = PUC.arrow(o, FC, 3, 9); a.set(x, y, x, y + 26); return o; });
const pTL = curvA(pm, FC), pTR = curvA(pm, FC);
const pG = gMark(pm, 14), pGl = txt(pm, 0, 0, 'G', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: TC });
const pPen = mk(pm, 'g', {}), pPen2 = mk(pPen, 'g', {});
mk(pPen2, 'path', { d: 'M0,0 L-9,26 H9 Z', fill: '#EBD3AE', stroke: MC, 'stroke-width': 2 }); mk(pPen2, 'path', { d: 'M0,0 L-3,9 H3 Z', fill: MC }); mk(pPen2, 'rect', { x: -9, y: 26, width: 18, height: 160, fill: '#E8B33A', stroke: MC, 'stroke-width': 2 });

/* ---------- S: hanging plate sim ---------- */
const s = $('#simS'), SS = 1.3, PIN = [330, 150], MASS = 0.20, DPHYS = 0.15, G9 = 9.8, W = MASS * G9;
const OM = 6.7, GAM = 0.55;                       // swing: theta(tau) = theta0 e^(-gamma tau) cos(omega tau)  (EXAMPLE FIGURES)
const RUN = { A: { h: HOLE.A, th0: 35 }, B: { h: HOLE.B, th0: 15 } };
for (const k in RUN) { const r = RUN[k], v = [-r.h[0], -r.h[1]]; r.D = Math.hypot(...v); r.rest = 90 - Math.atan2(v[1], v[0]) / D2R; }
const thAt = (r, tau) => r.th0 * Math.exp(-GAM * tau) * Math.cos(OM * tau);
mk(s, 'line', { x1: PIN[0] - 60, y1: PIN[1] - 40, x2: PIN[0] + 60, y2: PIN[1] - 40, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
for (let x = PIN[0] - 56; x <= PIN[0] + 56; x += 14) mk(s, 'line', { x1: x, y1: PIN[1] - 42, x2: x - 8, y2: PIN[1] - 52, stroke: C.dim, 'stroke-width': 2 });
mk(s, 'line', { x1: PIN[0], y1: PIN[1] - 40, x2: PIN[0], y2: PIN[1], stroke: C.ink2, 'stroke-width': 3 });
const vert = mk(s, 'line', { x1: PIN[0], y1: PIN[1], x2: PIN[0], y2: 540, stroke: MC, 'stroke-width': 2, 'stroke-dasharray': '6 7', opacity: 0.35 });
const ghosts = [0, 1, 2].map(() => mk(s, 'path', { d: polyD(), fill: 'none', stroke: CARDS, 'stroke-width': 2 }));
const sPl = plate(s, 1);
const lineA = mk(sPl.clip, 'line', { stroke: MC, 'stroke-width': 3.5, 'stroke-linecap': 'round' }), lineB = mk(sPl.clip, 'line', { stroke: MC, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const lineEnds = h => { const d = [-h[0], -h[1]]; return [h[0] - d[0] * 0.6, h[1] - d[1] * 0.6, h[0] + d[0] * 3, h[1] + d[1] * 3]; };
[[lineA, HOLE.A], [lineB, HOLE.B]].forEach(([l, h]) => { const e = lineEnds(h); attr(l, 'x1', e[0]); attr(l, 'y1', e[1]); attr(l, 'x2', e[2]); attr(l, 'y2', e[3]); });
const hA = hole(sPl.g, ...HOLE.A), hB = hole(sPl.g, ...HOLE.B);
const hAl = txt(sPl.g, HOLE.A[0] - 30, HOLE.A[1] + 6, 'A', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: MC }), hBl = txt(sPl.g, HOLE.B[0] + 14, HOLE.B[1] + 26, 'B', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: MC });
const sG = gMark(sPl.g, 11);  sG.set(0, 0);
const pinDot = mk(s, 'circle', { cx: PIN[0], cy: PIN[1], r: 6, fill: MC });
const arm = mk(s, 'line', { stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round' }), armUp = mk(s, 'line', { stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const armL = txt(s, 0, 0, 'd', { fill: VI, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' });
const wA = PUC.arrow(s, FC, 6, 18), wL = txt(s, 0, 0, 'Mg', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: FC });
const pgL = mk(s, 'line', { x1: PIN[0], y1: PIN[1], stroke: TC, 'stroke-width': 2.5 }); const thArc = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), thL = txt(s, 0, 0, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24, fill: TC });
const turnA = curvA(s, FC);
const plumb = mk(s, 'g', {}), plumbI = mk(plumb, 'g', {});
mk(plumbI, 'line', { x1: PIN[0], y1: PIN[1], x2: PIN[0], y2: 500, stroke: C.ink2, 'stroke-width': 2 }); mk(plumbI, 'path', { d: `M${PIN[0] - 10},500 H${PIN[0] + 10} L${PIN[0]},524 Z`, fill: C.ink2 });
const tRelA = wt('S2', 'turns') - 0.3, tFz = wt('S4', 'Freeze') + 0.1, TAUF = 0.12, tRA = TAUF - 0.25 * (tFz - tS4), tRes = wt('S6', 'swings');
const tSwapB = tS9 + 0.15, tRelB = wt('S9', 'hole') + 0.2;
function state(t) {
  if (t >= tSwapB) return { r: RUN.B, k: 'B', tau: Math.max(0, t - tRelB), held: t < tRelB };
  if (t >= tS4) { const tau = t < tFz ? tRA + 0.25 * (t - tS4) : t < tRes ? TAUF : t < tRes + 0.8 ? TAUF + 0.25 * (t - tRes) : TAUF + 0.2 + (t - tRes - 0.8); return { r: RUN.A, k: 'A', tau, replay: t < tRes + 0.8, frozen: t >= tFz && t < tRes }; }
  return { r: RUN.A, k: 'A', tau: Math.max(0, t - tRelA), held: t < tRelA };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">0.0</span><span class="u">deg</span>
  <span class="k" style="color:${VI}">d</span><span class="v" id="r_d" style="color:${VI}">0.0</span><span class="u">cm</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">Mg</span><span class="v" id="r_w" style="color:${FC}">${W.toFixed(2)}</span><span class="u">N</span>
  <span class="k" style="color:${FC}">τ</span><span class="v" id="r_tau" style="color:${FC}">0.000</span><span class="u">N m</span>
`;
$('#ro').insertAdjacentHTML('beforeend', `<div class="lbl" style="left:392px;top:212px;text-transform:none">τ = Mg × d</div>`);
const gs = $('#grS'), TMAX = 6, g = PUC.graph(gs, { x: 120, y: 72, w: 560, h: 150, xmax: TMAX, ymin: -0.2, ymax: 0.2, xt: [0, 1, 2, 3, 4, 5, 6], yt: [-0.1, 0, 0.1], xl: 't (s)' });
txt(gs, 132, 78, 'τ (N m)', { 'font-size': 18, fill: FC });
const gC = mk(gs, 'path', { d: '', fill: 'none', stroke: FC, 'stroke-width': 4, 'stroke-linejoin': 'round' }), gDot = g.dot(FC, 10);
const tauAt = (r, x) => W * DPHYS * Math.sin(thAt(r, x) * D2R);
const plot = (path, f, s1) => { if (s1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = Math.max(20, Math.ceil(s1 * 40)); for (let i = 0; i <= n; i++) { const x = s1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };

/* ---------- D ---------- */
const tau_ = tc(FC, '\\tau'), m_ = tc(MC, 'm_i'), g_ = tc(GC, 'g'), x_ = tc(VI, 'x_i');
const STEPS = [[`${tc(FC, '\\tau_i')} = ${m_}\\,${g_}\\;${x_}`, 'weight of one bit, times its sideways distance'],
  [`${tau_} = \\textstyle\\sum ${m_}\\,${g_}\\,${x_}`, 'add up every bit'],
  [`${tau_} = ${g_}\\textstyle\\sum ${m_}\\,${x_}`, 'same g for every bit: take it outside'],
  [`\\textstyle\\sum ${m_}\\,${x_} = 0 \\;\\Rightarrow\\; ${tau_} = 0`, 'measured from the centre of mass']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:940px;height:84px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('') +
  `<div class="dres" id="dres">g the same everywhere &nbsp;⇒&nbsp; G = centre of mass</div>`;
$('#dres').style.top = '494px';
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), DX0 = 250, DPX = 100, DY = 220;
mk(dp, 'line', { x1: 60, y1: DY, x2: 504, y2: DY, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const dCM = gMark(dp, 12); dCM.set(DX0, DY);
mk(dp, 'path', { d: `M${DX0},${DY + 14} L${DX0 - 20},${DY + 50} H${DX0 + 20} Z`, fill: C.ink2 });
const dB = [[2, -1], [1, 2]].map(([m, x], i) => { const X = DX0 + x * DPX, o = mk(dp, 'g', {});
  mk(o, 'rect', { x: X - 22 - m * 4, y: DY - 44 - m * 8, width: 44 + m * 8, height: 44 + m * 8, rx: 6, fill: MC });
  txt(o, X, DY - 16 - m * 2, m + ' kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 19 });
  const a = PUC.arrow(o, FC, 5, 14); a.set(X, DY + 8, X, DY + 8 + m * 44); txt(o, X + 10, DY + 40 + m * 22, m === 2 ? '2g' : 'g', { fill: FC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
  const dl = mk(o, 'path', { d: `M${DX0},${DY - 80} V${DY - 92} H${X} V${DY - 80}`, fill: 'none', stroke: VI, 'stroke-width': 3 }); txt(o, (DX0 + X) / 2, DY - 104, `x = ${x > 0 ? '+' : ''}${x} m`, { fill: VI, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
  return o; });
const dSum = txt(dp, 282, 360, 'Σ m x = 2 × (−1) + 1 × (+2) = 0', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 22 });
const dSum2 = txt(dp, 282, 406, 'turning effect = g × 0 = 0', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 });
dSum.textContent = 'Σ m x = 2 × (-1) + 1 × (+2) = 0';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\textstyle\\sum ${tc(FC, '\\tau_{\\text{gravity}}')} = 0\\ \\text{about}\\ ${tc(TC, 'G')}`);

/* ---------- R ---------- */
const LK = ['It hangs still: nothing is turning it', 'The pin pushes at the pin: no lever arm', 'Weight: no turning only if G is below the pin', 'So the vertical through the pin passes G'];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'card'), wt('R3', 'pin'), wt('R4', 'weight'), wt('R5', 'vertical')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'Two holes, two lines. No guessing!' });
const rr = $('#rrS'), RPIN = [392, 140], rPl = plate(rr, 1);
{ const v = [-HOLE.A[0], -HOLE.A[1]], rot = 90 - Math.atan2(v[1], v[0]) / D2R; rPl.set(RPIN[0], RPIN[1], rot); attr(rPl.g, 'transform', `translate(${RPIN[0]},${RPIN[1]}) rotate(${rot.toFixed(2)}) translate(${(-HOLE.A[0]).toFixed(1)},${(-HOLE.A[1]).toFixed(1)})`); hole(rPl.g, ...HOLE.A); }
const rDA = RUN.A.D, rG = [RPIN[0], RPIN[1] + rDA];
const rV = mk(rr, 'line', { x1: RPIN[0], y1: RPIN[1] - 50, x2: RPIN[0], y2: 520, stroke: MC, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' });
const rGm = gMark(rr, 12); rGm.set(rG[0], rG[1]); mk(rr, 'circle', { cx: RPIN[0], cy: RPIN[1], r: 6, fill: MC });
const rFp = PUC.arrow(rr, FC, 6, 18), rFw = PUC.arrow(rr, FC, 6, 18);
const rFpL = txt(rr, RPIN[0] + 16, RPIN[1] - 50, 'pin push', { fill: FC, 'font-weight': 700, 'font-size': 20 }), rFwL = txt(rr, rG[0] + 16, rG[1] + 80, 'Mg', { fill: FC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
const rArm = txt(rr, RPIN[0] - 24, 470, 'lever arm of Mg = 0', { fill: VI, 'font-weight': 700, 'font-size': 21, 'text-anchor': 'end' });

/* ---------- K ---------- */
const kh = $('#khS'), kPl = plate(kh, 1.05), KC = [392, 280]; kPl.set(KC[0], KC[1], 0);
const kArr = BITS.filter((_, i) => i % 2 === 0).map(([x, y]) => { const a = PUC.arrow(kPl.g, GC, 3, 10); a.set(x * 0.92, y * 0.92 - 12, x * 0.92, y * 0.92 + 18); return a; });
const kG = gMark(kh, 13); kG.set(KC[0], KC[1]);
$('#khP').innerHTML = `${M.icon('check', 24, C.ok, 3)}Same g everywhere: G is at the centre of mass`;
const kl = $('#klS'), TW = [330, 80, 124, 400];
mk(kl, 'line', { x1: 60, y1: TW[1] + TW[3], x2: 724, y2: TW[1] + TW[3], stroke: C.ink2, 'stroke-width': 3 });
mk(kl, 'rect', { x: TW[0], y: TW[1], width: TW[2], height: TW[3], fill: '#C9CFDB', stroke: MC, 'stroke-width': 2.5 });
for (let y = TW[1] + 30; y < TW[1] + TW[3]; y += 44) for (let x = TW[0] + 20; x < TW[0] + TW[2] - 20; x += 44) mk(kl, 'rect', { x, y, width: 20, height: 20, fill: '#fff', stroke: MC, 'stroke-width': 1.5 });
const kTA = [0, 1, 2, 3, 4].map(i => { const y = TW[1] + 20 + i * 76, L = 30 + i * 8, a = PUC.arrow(kl, GC, 5, 14); a.set(TW[0] + TW[2] + 50, y, TW[0] + TW[2] + 50, y + L); return a; });
const kTl = txt(kl, TW[0] + TW[2] + 70, TW[1] + 60, 'g weaker', { fill: GC, 'font-weight': 700, 'font-size': 20 }), kTl2 = txt(kl, TW[0] + TW[2] + 70, TW[1] + 380, 'g stronger', { fill: GC, 'font-weight': 700, 'font-size': 20 });
const kCM = mk(kl, 'g', {}), kCMi = mk(kCM, 'g', {}); mk(kCMi, 'circle', { cx: TW[0] + TW[2] / 2, cy: TW[1] + TW[3] / 2, r: 12, fill: '#fff', stroke: MC, 'stroke-width': 3 }); mk(kCMi, 'circle', { cx: TW[0] + TW[2] / 2, cy: TW[1] + TW[3] / 2, r: 4, fill: MC });
const kCMl = txt(kl, TW[0] - 18, TW[1] + TW[3] / 2 + 6, 'centre of mass', { fill: MC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' });
const kTG = gMark(kl, 12); kTG.set(TW[0] + TW[2] / 2, TW[1] + TW[3] / 2 + 40);
const kTGl = txt(kl, TW[0] - 18, TW[1] + TW[3] / 2 + 46, 'G, slightly below', { fill: TC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'end' });
$('#klP').innerHTML = `G sits slightly below the centre of mass`;
const th1 = PUC.think($('#th1'), { q: 'In a very tall tower, is G slightly above or slightly below the centre of mass?', opts: ['Slightly above', 'Slightly below'], right: 1, why: 'Lower parts are pulled harder, so the balance point moves down.' });

/* ---------- B: tipping ---------- */
const bl = $('#blS'), FLY = 470, BXW = 150, BXH = 260, BC = [470, FLY];   // pivot corner at BC (right bottom)
mk(bl, 'line', { x1: 40, y1: FLY, x2: 744, y2: FLY, stroke: MC, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(bl, 'line', { x1: x, y1: FLY + 4, x2: x - 14, y2: FLY + 18, stroke: C.dim, 'stroke-width': 2 });
const bBase = mk(bl, 'line', { stroke: C.ok, 'stroke-width': 8, 'stroke-linecap': 'round' });
const bBox = mk(bl, 'g', {}), bBoxI = mk(bBox, 'g', {});
mk(bBoxI, 'rect', { x: -BXW, y: -BXH, width: BXW, height: BXH, rx: 4, fill: '#D7B98C', stroke: MC, 'stroke-width': 3 });
mk(bBoxI, 'path', { d: `M${-BXW},${-BXH + 40} H0 M${-BXW / 2},${-BXH} V${-BXH + 40}`, stroke: '#A57E4E', 'stroke-width': 3 });
const bG = gMark(bBoxI, 11); bG.set(-BXW / 2, -BXH / 2);
const bLine = mk(bl, 'line', { stroke: MC, 'stroke-width': 3, 'stroke-dasharray': '7 6' }), bW = PUC.arrow(bl, FC, 5, 14), bTurn = curvA(bl, FC);
const BCRIT = Math.atan((BXW / 2) / (BXH / 2)) / D2R;
const tTilt1 = wt('B2', 'Tilt'), tBack = wt('B2', 'turns'), tTilt2 = tB3 - 0.2, tTip = wt('B3', 'tips') - 0.6;
const bTh = t => { if (t < tTilt2) { const up = M.io((t - tTilt1) / 1.2), dn = M.io((t - tBack - 0.6) / 0.9); return 20 * up * (1 - dn); }
  const u = M.io((t - tTilt2) / 1.6) * (BCRIT + 2); if (t < tTip) return u; const s2 = t - tTip; return Math.min(90, BCRIT + 2 + 70 * s2 * s2); };
$('#bro').innerHTML = `<span class="k" style="color:${TC}">θ</span><span class="v" id="b_th" style="color:${TC}">0.0</span><span class="u">deg</span>`;
$('#bro').style.left = '36px'; $('#bro').style.top = '76px';
const bTag = $('#blP');
const br = $('#brS'), BUS = [[150, 'LUGGAGE LOW', 1.2], [520, 'LUGGAGE ON THE ROOF', 1.6]], BPX = 90, BHW = 1.0;   // 90 px per metre; wheels 2 m apart (EXAMPLE FIGURES)
mk(br, 'line', { x1: 40, y1: 450, x2: 744, y2: 450, stroke: MC, 'stroke-width': 3 });
const buses = BUS.map(([cx, lab, h], i) => { const o = mk(br, 'g', {}), gI = mk(o, 'g', {}), W2 = BHW * BPX, H = 2.9 * BPX;
  mk(gI, 'rect', { x: -W2 - 14, y: -H, width: 2 * W2 + 28, height: H - 22, rx: 16, fill: '#F2F4F8', stroke: MC, 'stroke-width': 3 });
  mk(gI, 'rect', { x: -W2, y: -H + 22, width: 2 * W2, height: 70, rx: 8, fill: '#BFD2F5', stroke: MC, 'stroke-width': 2 });
  mk(gI, 'rect', { x: -W2 - 10, y: -22, width: 30, height: 22, rx: 4, fill: MC }); mk(gI, 'rect', { x: W2 - 20, y: -22, width: 30, height: 22, rx: 4, fill: MC });
  if (i) { mk(gI, 'rect', { x: -60, y: -H - 50, width: 120, height: 50, rx: 6, fill: '#B98A4E', stroke: MC, 'stroke-width': 2.5 }); }
  else { mk(gI, 'rect', { x: -70, y: -76, width: 140, height: 46, rx: 6, fill: '#B98A4E', stroke: MC, 'stroke-width': 2.5 }); }
  const gm = gMark(gI, 11); gm.set(0, -h * BPX);
  const ln = mk(br, 'line', { stroke: MC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
  txt(br, cx, 500, lab, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: C.ink2 });
  const res = txt(br, cx, 534, '', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700, fill: TC });
  return { o, gI, cx, h, ln, res, crit: Math.atan(BHW / h) / D2R }; });
const th2 = PUC.think($('#th2'), { q: 'A bus with luggage on its roof, or packed low. Which tips over at a smaller tilt?', opts: ['Luggage on the roof', 'Luggage packed low'], right: 0, why: 'Roof luggage raises G: its line passes the wheels sooner.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A box is 40 cm wide. Its centre of gravity is in the middle, 60 cm above the floor. At what tilt does it start to tip?';
const wsol = PUC.solution($('#wl'), [
  ['Tips when the line from G reaches the corner'],
  [K(`\\tan${tc(TC, '\\theta')} = \\dfrac{w/2}{h} = \\dfrac{20}{60}`)],
  [K(`\\tan${tc(TC, '\\theta')} = \\tfrac{1}{3}`)],
  [K(`${tc(TC, '\\theta')} = \\tan^{-1}\\tfrac13 \\approx ${tc(TC, '18.4^\\circ')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 86 });
$('#wl .lbl').style.top = '30px'; $('#wl').querySelector('.sol .sx').style.font = '600 26px Poppins';
const wv = $('#wrS'), WS = 3, WC = [470, 500], WW = 40 * WS, WH = 120 * WS, WCR = Math.atan(20 / 60) / D2R;
mk(wv, 'line', { x1: 40, y1: WC[1], x2: 744, y2: WC[1], stroke: MC, 'stroke-width': 3 });
const wBox = mk(wv, 'g', {}), wBI = mk(wBox, 'g', {});
mk(wBI, 'rect', { x: -WW, y: -WH, width: WW, height: WH, rx: 4, fill: '#D7B98C', stroke: MC, 'stroke-width': 3 });
const wGm = gMark(wBI, 11); wGm.set(-WW / 2, -WH / 2);
const wTri = mk(wBI, 'path', { d: `M0,0 L${-WW / 2},${-WH / 2} M${-WW / 2},${-WH / 2} V0 H0`, fill: 'none', stroke: VI, 'stroke-width': 3 });
const wL1 = txt(wBI, -WW / 4, -12, '20', { 'text-anchor': 'middle', fill: VI, 'font-weight': 700, 'font-size': 22 }), wL2 = txt(wBI, -WW / 2 - 10, -WH / 4, '60', { 'text-anchor': 'end', fill: VI, 'font-weight': 700, 'font-size': 22 });
const wVert = mk(wv, 'line', { x1: WC[0], y1: WC[1], x2: WC[0], y2: WC[1] - 250, stroke: MC, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
const wArc = mk(wv, 'path', { fill: 'none', stroke: TC, 'stroke-width': 4 }), wThL = txt(wv, 0, 0, 'θ = 18.4°', { fill: TC, 'font-weight': 700, 'font-size': 22 });
const tW = [wt('W3', 'tips'), wt('W4', 'tan'), wt('W4', 'one'), wt('W5', 'theta')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'G always lies inside the material of the body', right: 'G can lie in empty space: a boomerang, a bent wire' });
const tp = $('#tpS');
const boom = mk(tp, 'g', {}); mk(boom, 'path', { d: 'M130,220 L220,60 L310,220', fill: 'none', stroke: '#8D6B45', 'stroke-width': 18, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const tpG = gMark(tp, 12); tpG.set(220, 140); const tpLn = mk(tp, 'line', { x1: 236, y1: 140, x2: 336, y2: 140, stroke: TC, 'stroke-width': 2 });
const tpL = txt(tp, 344, 147, 'G: no material here', { 'text-anchor': 'start', fill: TC, 'font-weight': 700, 'font-size': 19 });
const where = PUC.where($('#wa'), { on: [], type: 'Statements on G vs the centre of mass, the plumb line method, toppling' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A uniform 40 cm × 30 cm plate hangs at rest from a pin through one corner. What angle does its 40 cm side make with the vertical?', qW: 780,
  opts: ['53°', '45°', '37°', '30°'], right: 2, optW: 300, optY: 336, optH: 90 });
const mqs = $('#mqS'); mk(mqs, 'rect', { x: 30, y: 60, width: 200, height: 150, fill: CARD, stroke: CARDS, 'stroke-width': 3 }); mk(mqs, 'circle', { cx: 46, cy: 76, r: 7, fill: MC });
txt(mqs, 130, 46, '40 cm', { 'text-anchor': 'middle', fill: VI, 'font-weight': 700, 'font-size': 20 }); txt(mqs, 244, 142, '30 cm', { fill: VI, 'font-weight': 700, 'font-size': 20 });
txt(mqs, 46, 240, 'pin at a corner', { fill: C.ink2, 'font-weight': 600, 'font-size': 18 });
const so = PUC.solution($('#so'), [['At rest: G straight below the pin'], ['G = centre ⇒ diagonal vertical'], [K(`\\tan${tc(TC, '\\theta')} = \\dfrac{30}{40}`)], [K(`${tc(TC, '\\theta')} \\approx 37^\\circ\\ \\text{(C)}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach((e, i) => { e.style.font = i < 2 ? '500 22px Poppins' : ''; if (i >= 2) e.style.fontSize = '26px'; });
const tSo = [wt('A2', 'At'), wt('A3', 'So'), wt('A4', 'Tan'), wt('A4', 'about')];
const fc = PUC.fcard($('#sF'), { x: 340, y: 262, w: 1240, h: 500, title: 'Recap · centre of gravity', y0: 100, dy: 98, txt: [1, 0, 1, 1],
  lines: ['<b>Centre of gravity G</b>: where the total turning effect of gravity is zero',
    K(`${tau_} = ${g_}\\textstyle\\sum ${m_}\\,${x_} = 0 \\;\\Rightarrow\\; \\text{uniform } ${g_}: G = \\text{centre of mass}`),
    '<b>Plumb line</b>: hang from two points; the two verticals cross at G',
    `<b>Tipping</b>: when the vertical from G passes the base edge, ${K(`\\tan${tc(TC, '\\theta')} = \\tfrac{w/2}{h}`)}`] });
const YQ = ['Why must the plumb line from the pin pass through G?', 'When are the centre of gravity and the centre of mass not the same?', 'Why does roof luggage make a bus tip over more easily?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 104', topic: 'Why is a ruler harder to spin by its end? Moment of Inertia', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS4 + 0.1, 1.06, 960, 540], [tS7 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const place = (pl, r, th) => { const rot = r.rest - th; attr(pl.g, 'transform', `translate(${PIN[0]},${PIN[1]}) rotate(${rot.toFixed(3)}) scale(${SS}) translate(${(-r.h[0]).toFixed(2)},${(-r.h[1]).toFixed(2)})`); };
const gPos = (r, th) => [PIN[0] + SS * r.D * Math.sin(th * D2R), PIN[1] + SS * r.D * Math.cos(th * D2R)];

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
    const sw = Math.sin((t - tMorph) * 2.2);
    attr(MINI[0].g, 'transform', `rotate(${(4 * sw).toFixed(2)} 150 92)`);
    attr(MINI[1].g, 'transform', `rotate(${(-9 * M.io((t - tMorph - 0.8) / 1.2)).toFixed(2)} 230 104)`);
    attr(MINI[2].g, 'transform', `rotate(${(7 * Math.sin((t - tMorph) * 1.8)).toFixed(2)} 160 60)`);
    MG.forEach((m, i) => vis(m.o, t, tSpecial - 0.1 + i * 0.12, 1e9, { dy: 0 }));
    vis($('#hjP'), t, tSpecial + 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    // pencil tries: the card tips off each time
    let pdx = TRY[0].dx, tilt = 0; const tryI = t < TRY[1].t ? 0 : 1, tr0 = TRY[tryI].t;
    pdx = TRY[tryI].dx; const fall = M.i3((t - tr0 - 0.45) / 0.5) * (t >= tr0 ? 1 : 0); tilt = (pdx < 0 ? 1 : -1) * 28 * fall;
    vis(hPl.o, t, wt('H3', 'cuts') - 0.1, 1e9, { dy: 0 });
    hPl.set(HP[0], HP[1] - 0, tilt); attr(hPl.g, 'transform', `translate(${(HP[0] + pdx).toFixed(1)},${HP[1]}) rotate(${tilt.toFixed(2)}) translate(${(-pdx).toFixed(1)},0)`);
    attr(pin2, 'transform', `translate(${(HP[0] + pdx).toFixed(1)},${HP[1] + 0})`);
    vis(pencil, t, wt('H3', 'pencil') - 0.1, 1e9, { dy: 0 });
    xMarks.forEach((x, i) => { attr(x.g, 'transform', `translate(${HP[0] + TRY[i].dx},${HP[1]})`); vis(x.o, t, TRY[i].t + 0.9, 1e9, { dy: 0 }); });
    vis($('#hkQ'), t, wt('H4', 'where') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#lawP'), t, tP4 + 0.2, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    pPl.set(PC0[0], PC0[1], 0);
    bitEls.forEach((e, i) => vis(e, t, tP1 + 0.9 + i * 0.03, 1e9, { dy: 0 }));
    const ut = M.o3((t - wt('P2', 'left') + 0.1) / 0.6), ur = M.o3((t - wt('P2', 'right') + 0.1) / 0.6), fade = 1 - M.io((t - tP3 - 0.4) / 0.4);
    pTL.set(PC0[0] - 120, PC0[1], 70, 200, 200 - 80 * ut * fade); pTR.set(PC0[0] + 120, PC0[1], 70, 160, 160 + 80 * ur * fade);
    pG.set(PC0[0], PC0[1]); vis(pG.o, t, wt('P3', 'centre') - 0.1, 1e9, { dy: 0 }); attr(pGl, 'x', PC0[0] + 20); attr(pGl, 'y', PC0[1] - 16); vis(pGl, t, wt('P3', 'G') - 0.05, 1e9, { dy: 0 });
    const pu = M.o3((t - tP4 - 0.1) / 0.7); attr(pPen2, 'transform', `translate(${PC0[0]},${(PC0[1] + 14 + 240 * (1 - pu)).toFixed(1)})`); vis(pPen, t, tP4, 1e9, { dy: 0 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const S = state(t), r = S.r, th = thAt(r, S.tau), swap = M.io((t - tSwapB) / 0.35);
    place(sPl, r, th);
    sPl.o.style.opacity = t < tSwapB ? (1 - M.io((t - tSwapB + 0.35) / 0.35)).toFixed(3) : swap.toFixed(3);
    vis(sPl.o, t, tS1 + 0.4, 1e9, { dy: 0 });
    if (t >= tSwapB - 0.35 && t < tSwapB) sPl.o.style.opacity = (1 - M.io((t - tSwapB + 0.35) / 0.35)).toFixed(3); else if (t >= tSwapB) sPl.o.style.opacity = swap.toFixed(3);
    const moving = !S.held && !S.frozen && Math.abs(th) > 0.6;
    ghosts.forEach((e, j) => { const thg = thAt(r, Math.max(0, S.tau - (S.replay ? 0.012 : 0.035) * (j + 1))), rot = r.rest - thg;
      attr(e, 'transform', `translate(${PIN[0]},${PIN[1]}) rotate(${rot.toFixed(3)}) scale(${SS}) translate(${(-r.h[0]).toFixed(2)},${(-r.h[1]).toFixed(2)})`); e.style.opacity = moving && Math.abs(thg - th) > 0.8 ? [0.3, 0.2, 0.12][j] : 0; });
    const G = gPos(r, th);
    const wOn = M.o3((t - wt('S2', 'weight') + 0.1) / 0.5) * (t >= tSwapB ? M.o3((t - tRelB) / 0.4) : 1);
    wA.set(G[0], G[1] + 8, G[0], G[1] + 8 + 96 * wOn); attr(wL, 'x', G[0] + 12); attr(wL, 'y', G[1] + 80); wL.style.opacity = wOn;
    // lever arm + theta (freeze and replay; and through S5-S6)
    const showArm = t >= tFz - 0.1 && t < tS7 - 0.2 ? M.io((t - wt('S5', 'lever') + 0.1) / 0.4) * (1 - M.io((t - tS7 + 0.5) / 0.3)) : 0;
    attr(arm, 'x1', PIN[0]); attr(arm, 'y1', G[1].toFixed(1)); attr(arm, 'x2', G[0].toFixed(1)); attr(arm, 'y2', G[1].toFixed(1)); arm.style.opacity = showArm;
    attr(armUp, 'x1', G[0].toFixed(1)); attr(armUp, 'y1', PIN[1]); attr(armUp, 'x2', G[0].toFixed(1)); attr(armUp, 'y2', G[1].toFixed(1)); armUp.style.opacity = 0;
    attr(armL, 'x', ((PIN[0] + G[0]) / 2).toFixed(1)); attr(armL, 'y', (G[1] - 14).toFixed(1)); armL.style.opacity = showArm * (Math.abs(G[0] - PIN[0]) > 24 ? 1 : 0);
    const showTh = (S.held || S.frozen || (t >= tS4 && t < tS7)) && Math.abs(th) > 1 ? 1 : 0, thO = showTh * M.io((t - tS1 - 0.8) / 0.4);
    attr(thArc, 'd', Math.abs(th) > 1 ? arcP(PIN[0], PIN[1], 96, 0, th) : ''); attr(pgL, 'x2', G[0].toFixed(1)); attr(pgL, 'y2', G[1].toFixed(1)); pgL.style.opacity = thO; thArc.style.opacity = thO;
    attr(thL, 'x', (PIN[0] + 118 * Math.sin(th / 2 * D2R) - 7).toFixed(1)); attr(thL, 'y', (PIN[1] + 118 * Math.cos(th / 2 * D2R) + 8).toFixed(1)); thL.style.opacity = thO;
    const tq = tauAt(r, S.tau), tOn = (S.frozen || S.held) && Math.abs(th) > 3 ? 1 : 0;
    if (tOn) turnA.set(PIN[0], PIN[1], SS * r.D + 44, th + Math.sign(th) * 4, th - Math.sign(th) * 24); else M.hide(turnA.o, true);
    vis(vert, t, tS2 + 0.3, 1e9, { dy: 0 });
    // plumb line + drawn lines
    vis(plumb, t, wt('S8', 'plumb') - 0.1, tSwapB - 0.2, { dy: 0, outDur: 0.3, ody: 0 }); if (t >= tSwapB) vis(plumb, t, wt('S10', 'Draw') - 0.3, 1e9, { dy: 0 });
    M.draw(lineA, t, wt('S8', 'draw') - 0.05, 0.8); M.draw(lineB, t, wt('S10', 'line') - 0.1, 0.8);
    vis(hB, t, tS9 - 0.4, 1e9, { dy: 0 }); vis(hBl, t, tS9 - 0.4, 1e9, { dy: 0 });
    const gx = M.io((t - wt('S10', 'cross') + 0.1) / 0.3); sG.g.style.opacity = t < wt('S10', 'cross') - 0.1 ? 0.55 : 0.55 + 0.45 * gx;
    attr(sG.g, 'transform', `translate(0,0) scale(${(1 + 0.35 * gx * (1 - M.io((t - wt('S10', 'cross') - 0.5) / 0.4))).toFixed(3)})`);
    vis($('#simP'), t, wt('S10', 'point') - 0.1, 1e9, POP);
    vis($('#rdy'), t, tS1 + 0.6, tRelA - 0.05, { ...POP, sc: 0.8, outDur: 0.15 }); if (t >= tSwapB) vis($('#rdy'), t, tSwapB + 0.2, tRelB - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS4 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // readout: round t first, then compute
    const tr = Math.round(S.tau * 100) / 100, thr = thAt(r, tr), dcm = DPHYS * 100 * Math.sin(thr * D2R), tqr = W * DPHYS * Math.sin(thr * D2R);
    M.setT($('#roT'), 'HANGING FROM HOLE ' + S.k); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_th'), f1(thr)); M.setT($('#r_d'), f1(dcm)); M.setT($('#r_tau'), f3(tqr));
    $('#r_d').style.background = mix('#FFFFFF', '#EFE9FB', showArm); $('#r_tau').style.background = mix('#FFFFFF', '#FBEBDD', showArm);
    plot(gC, x => tauAt(r, x), Math.min(TMAX, S.tau)); gDot(Math.min(TMAX, S.tau), tq, t >= tS1 + 0.8 && S.tau <= TMAX);
    if (t >= tSwapB && t < tSwapB + 0.4) gC.style.opacity = swap.toFixed(3); else gC.style.opacity = '';
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, T0('D6') - 0.1, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 }); vis($('#exD'), t, tD1 + 0.8, 1e9, { dy: 8 });
    dB.forEach((b, i) => vis(b, t, wt('D2', 'bit') - 0.1 + i * 0.4, 1e9, { dy: 0 })); vis(dCM.o, t, wt('D5', 'centre') - 0.2, 1e9, { dy: 0 });
    vis(dSum, t, wt('D5', 'sum') - 0.1, 1e9, { dy: 0 }); vis(dSum2, t, wt('D5', 'turning') - 0.1, 1e9, { dy: 0 });
    vis($('#dres'), t, T0('D6') + 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'total') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'zero') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const u1 = M.o3((t - wt('R3', 'pushes') + 0.1) / 0.5), u2 = M.o3((t - wt('R4', 'weight') + 0.1) / 0.5);
    rFp.set(RPIN[0], RPIN[1], RPIN[0], RPIN[1] - 90 * u1); rFpL.style.opacity = u1; rFw.set(rG[0], rG[1] + 8, rG[0], rG[1] + 8 + 90 * u2); rFwL.style.opacity = u2;
    M.draw(rV, t, wt('R5', 'vertical') - 0.1, 0.6); vis(rArm, t, wt('R4', 'straight') - 0.1, 1e9, { dy: 0 });
    avA(t, wt('R5', 'Two') + 0.2, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tB1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exK'), t, tK2 + 0.3, 1e9, { dy: 8 });
    kArr.forEach((a, i) => vis(a.g, t, wt('K1', 'same') - 0.1 + i * 0.03, 1e9, { dy: 0 })); vis(kG.o, t, wt('K1', 'centre') - 0.1, 1e9, { dy: 0 }); vis($('#khP'), t, wt('K1', 'sits') - 0.1, 1e9, POP);
    kTA.forEach((a, i) => vis(a.g, t, wt('K2', 'weaker') - 0.2 + (4 - i) * 0.1, 1e9, { dy: 0 })); vis(kTl, t, wt('K2', 'weaker'), 1e9, { dy: 0 }); vis(kTl2, t, wt('K2', 'weaker') + 0.2, 1e9, { dy: 0 });
    vis(kCM, t, tK2 + 0.3, 1e9, { dy: 0 }); vis(kCMl, t, tK2 + 0.4, 1e9, { dy: 0 });
    vis(kTG.o, t, 1e9, 1e9); vis(kTGl, t, 1e9, 1e9); M.hide($('#klP'), true);
    vis($('#th1'), t, tK3 + 0.05, OUT('K4'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'above') - 0.2, tCount: T1('K3') + 0.05, dur: 3, tAns: tK4 - 0.02, tWhy: wt('K4', 'lower') });
    if (t >= tK4) { vis($('#kh'), t, tK4 + 0.15, OUT('B1'), { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK4 + 0.25, OUT('B1'), { dx: 60, dy: 0, ...o });
      vis(kTG.o, t, wt('K4', 'harder'), 1e9, { dy: 0 }); vis(kTGl, t, wt('K4', 'harder') + 0.1, 1e9, { dy: 0 }); vis($('#klP'), t, wt('K4', 'everyday') - 0.2, 1e9, POP); }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B4');
    vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#br'), t, tB1 + 0.4, out, { dx: 60, dy: 0, ...o }); vis($('#exB'), t, tB1 + 0.8, 1e9, { dy: 8 });
    const th = bTh(t), cs = Math.cos(th * D2R), sn = Math.sin(th * D2R);
    attr(bBoxI, 'transform', `translate(${BC[0]},${BC[1]}) rotate(${th.toFixed(2)})`);
    const lg = [-BXW / 2, -BXH / 2], Gx = BC[0] + lg[0] * cs - lg[1] * sn, Gy = BC[1] + lg[0] * sn + lg[1] * cs;
    const left = [BC[0] - BXW * cs, BC[1] - BXW * sn];
    attr(bBase, 'x1', left[0].toFixed(1)); attr(bBase, 'y1', FLY); attr(bBase, 'x2', BC[0]); attr(bBase, 'y2', FLY); bBase.style.opacity = th < 0.5 ? 0.9 : 0;
    const inside = th < BCRIT, lnO = M.io((t - tB2 - 0.6) / 0.4) * (th < 85 ? 1 : 0);
    attr(bLine, 'x1', Gx.toFixed(1)); attr(bLine, 'y1', Gy.toFixed(1)); attr(bLine, 'x2', Gx.toFixed(1)); attr(bLine, 'y2', FLY); attr(bLine, 'stroke', inside ? C.ok : C.red); bLine.style.opacity = lnO;
    bW.set(Gx, Gy + 6, Gx, Gy + 6 + 70 * lnO);
    const aG = Math.atan2(Gx - BC[0], Gy - BC[1]) / D2R, aGp = aG < 0 ? aG + 360 : aG;
    if (th > 3 && th < 80 && lnO > 0.5) bTurn.set(BC[0], BC[1], 210, inside ? aGp - 6 : aGp + 6, inside ? aGp + 22 : aGp - 22); else M.hide(bTurn.o, true);
    vis($('#bro'), t, tTilt1 - 0.1, 1e9, { dy: 8 }); M.setT($('#b_th'), f1(Math.min(th, 90)));
    vis(bTag, t, tTilt1 + 0.4, 1e9, POP); bTag.innerHTML = inside ? `${M.icon('check', 24, C.ok, 3)}Line from G inside the base: turns back` : `${M.icon('x', 24, C.red, 3)}Line from G outside the base: it tips`;
    bTag.style.background = inside ? C.okBg : C.redBg;
    // buses: tilt together at the reveal
    const bt = t < tB5 ? 0 : M.io((t - wt('B5', 'raises')) / 2.2) * buses[1].crit;
    buses.forEach((b, i) => { vis(b.o, t, tB1 + 0.7 + i * 0.25, 1e9, { dy: 0 }); const pv = [b.cx + BHW * BPX, 450];
      attr(b.gI, 'transform', `translate(${pv[0]},${pv[1]}) rotate(${bt.toFixed(2)}) translate(${-BHW * BPX},0)`);
      const c2 = Math.cos(bt * D2R), s2 = Math.sin(bt * D2R), lx = -BHW * BPX, ly = -b.h * BPX, gx = pv[0] + lx * c2 - ly * s2, gy = pv[1] + lx * s2 + ly * c2;
      attr(b.ln, 'x1', gx.toFixed(1)); attr(b.ln, 'y1', gy.toFixed(1)); attr(b.ln, 'x2', gx.toFixed(1)); attr(b.ln, 'y2', 450); b.ln.style.opacity = t >= tB5 ? 1 : 0; attr(b.ln, 'stroke', i && bt > b.crit - 0.3 ? C.red : C.ink);
      M.setT(b.res, i ? `tips at ${Math.round(b.crit)}°` : `safe up to ${Math.round(b.crit)}°`); b.res.style.opacity = M.io((t - wt('B5', 'wheels')) / 0.4); });
    vis($('#th2'), t, tB4 + 0.05, OUT('B5'), { dy: 36, ...o });
    th2(t, { tin: tB4, tOpts: wt('B4', 'Which') - 0.2, tCount: T1('B4') + 0.05, dur: 3, tAns: tB5 - 0.02, tWhy: wt('B5', 'raises') });
    if (t >= tB5) { vis($('#bl'), t, tB5 + 0.15, OUT('W1'), { dx: -60, dy: 0, ...o }); vis($('#br'), t, tB5 + 0.25, OUT('W1'), { dx: 60, dy: 0, ...o }); }
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const th = WCR * M.io((t - tW[0] - 0.2) / 1.4);
    attr(wBI, 'transform', `translate(${WC[0]},${WC[1]}) rotate(${th.toFixed(3)})`);
    vis(wTri, t, tW[1] - 0.2, 1e9, { dy: 0 }); vis(wL1, t, wt('W4', 'Twenty') - 0.1, 1e9, { dy: 0 }); vis(wL2, t, wt('W4', 'sixty') - 0.1, 1e9, { dy: 0 });
    M.draw(wVert, t, tW[0] + 1.4, 0.5);
    const ua = M.io((t - tW[3] + 0.1) / 0.4);
    attr(wArc, 'd', `M${WC[0]},${WC[1] - 110} A110,110 0 0 1 ${(WC[0] + 110 * Math.sin(WCR * D2R)).toFixed(1)},${(WC[1] - 110 * Math.cos(WCR * D2R)).toFixed(1)}`); wArc.style.opacity = ua;
    attr(wThL, 'x', WC[0] + 46); attr(wThL, 'y', WC[1] - 60); wThL.style.opacity = ua;
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'boomerang') - 0.2 });
    vis(boom, t, wt('X3', 'boomerang') - 0.1, 1e9, { dy: 0 }); vis(tpG.o, t, wt('X3', 'empty') - 0.1, 1e9, { dy: 0 }); vis(tpL, t, wt('X3', 'empty'), 1e9, { dy: 0 }); vis(tpLn, t, wt('X3', 'empty'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statement') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.2, tCount, tAns });
    vis($('#mqS'), t, wt('Q1', 'plate') - 0.1, 1e9, { dy: 16 });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
