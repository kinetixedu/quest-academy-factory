// PUC Physics Ep 39: Vector Components in Two Dimensions (Motion notebook, adding two legs by components)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ink, XC = C.ac, YC = C.violet, RC = C.gold, DC = C.ac;   // colour-coding: vector A ink, x part blue, y part violet, generic resultant gold, displacement blue (canon)
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, s, col, fs = 30) => txt(p, 0, 0, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col });
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const IH = '\\hat{i}', JH = '\\hat{j}';
const vA = `\\textcolor{${AC}}{\\vec A}`, Ax = `\\textcolor{${XC}}{A_x}`, Ay = `\\textcolor{${YC}}{A_y}`, Am = `\\textcolor{${AC}}{A}`;
const R = Math.PI / 180, cs = d => Math.cos(d * R), sn = d => Math.sin(d * R);
const grow = (a, x1, y1, x2, y2, u) => a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u);
const op = (el, v) => { el.style.opacity = M.clamp(v).toFixed(3); };

Object.assign(M.IC, {
  ladder: ['M8 3 5 21', 'M16 3l3 18', 'M7.2 8h9.6', 'M6.5 13h11', 'M5.8 18h12.4'],
  kite: ['M12 2 19 9 12 16 5 9Z', 'M12 16v6', 'M5 9h14', 'M12 2v14'],
  ramp: ['M3 20h18', 'M3 20 21 8v12'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tG1 = T0('G1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* axes helper: origin o, half-lengths, ticks every step px */
const axes = (s, o, L, opt = {}) => {
  const g = mk(s, 'g', {});
  const [l, r, u, d] = L;
  mk(g, 'line', { x1: o[0] - l, y1: o[1], x2: o[0] + r, y2: o[1], stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'line', { x1: o[0], y1: o[1] + d, x2: o[0], y2: o[1] - u, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${o[0] + r - 10},${o[1] - 7} L${o[0] + r + 2},${o[1]} L${o[0] + r - 10},${o[1] + 7}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: `M${o[0] - 7},${o[1] - u + 10} L${o[0]},${o[1] - u - 2} L${o[0] + 7},${o[1] - u + 10}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
  txt(g, o[0] + r - 4, o[1] + 30, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink });
  txt(g, o[0] + 14, o[1] - u + 14, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink });
  return g;
};
const dotL0 = (sv, x, y, lab) => { mk(sv, 'circle', { cx: x, cy: y, r: 7, fill: C.ink }); txt(sv, x - 30, y + 28, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: C.ink }); };
const arcP = (o, rad, a0, a1) => { const p = a => [o[0] + rad * cs(a), o[1] - rad * sn(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${rad},${rad} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 0 ${x1.toFixed(1)},${y1.toFixed(1)}`; };

/* ---------- title card + hook ---------- */
const JOBS = [['ladder', 'Ladder', 'ACROSS THE FLOOR + UP THE WALL', 'ladder'], ['kite', 'Kite string', 'PULLS FORWARD + PULLS DOWN', 'kite'], ['ramp', 'Ramp', 'MOVES YOU IN + LIFTS YOU UP', 'ramp']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w.split(' + ')[0]}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
// each row: a mini slanted arrow with its two parts, name and the two jobs
const MINI = [62, 35, 25];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => { const a = MINI[i], L = 86, ex = 6 + L * cs(a), ey = 86 - L * sn(a); return `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><svg width="100" height="92"><line class="mx" x1="6" y1="86" x2="${ex.toFixed(1)}" y2="86" stroke="${XC}" stroke-width="5" stroke-linecap="round"/><line class="my" x1="${ex.toFixed(1)}" y1="86" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${YC}" stroke-width="5" stroke-linecap="round"/><line x1="6" y1="86" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${AC}" stroke-width="6" stroke-linecap="round"/></svg><div class="jn">${n}</div><div class="jw">${w}</div></div>`; }).join('');
const TILES = [['ruler', 'How far?', RC], ['arrowR', 'Which way?', RC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'far'), wt('H4', 'direction')];

/* ---------- P: quick reminder, two shadows ---------- */
const pS = $('#pgS'), PO = [140, 470], PL = 380, PA = 37;
const pAx = axes(pS, PO, [40, 560, 360, 40]);
const tip = [PO[0] + PL * cs(PA), PO[1] - PL * sn(PA)];
const pArr = PUC.arrow(pS, AC, 7, 20), pAL = sym(pS, 'A', AC, 34);
attr(pAL, 'x', (PO[0] + tip[0]) / 2 - 30); attr(pAL, 'y', (PO[1] + tip[1]) / 2 - 16);
const pLx = mk(pS, 'path', { d: `M${tip[0]},${tip[1]} V${PO[1]}`, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6', fill: 'none' });
const pLy = mk(pS, 'path', { d: `M${tip[0]},${tip[1]} H${PO[0]}`, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6', fill: 'none' });
const pBx = PUC.arrow(pS, XC, 9, 20), pBy = PUC.arrow(pS, YC, 9, 20);
const pBxL = sym(pS, 'Aₓ', XC, 30), pByL = sym(pS, 'Aᵧ', YC, 30);
attr(pBxL, 'x', (PO[0] + tip[0]) / 2 - 18); attr(pBxL, 'y', PO[1] + 44); attr(pByL, 'x', PO[0] - 68); attr(pByL, 'y', (PO[1] + tip[1]) / 2 + 10);
$('#pf0').innerHTML = K(`${vA} \\;\\to\\; ${Ax}\\; \\text{and}\\; ${Ay}`);
$('#pc0').innerHTML = `${M.icon('arrowR', 24, XC, 2.6)}<span><b style="color:${XC}">x component</b>: shadow on the x axis</span>`;
$('#pc1').innerHTML = `${M.icon('arrowU', 24, YC, 2.6)}<span><b style="color:${YC}">y component</b>: shadow on the y axis</span>`;
$('#pf1').innerHTML = K(`${vA} = ${Ax}\\,${IH} + ${Ay}\\,${JH}`);

/* ---------- shared: two legs A and B, parts stacked along each axis, resultant R ---------- */
const XB = M.mix(C.ac, '#FFFFFF', 0.45), YB = M.mix(C.violet, '#FFFFFF', 0.45);     // B's parts: lighter blue / violet
const LA = [20, 30], LB = 15;                                                        // leg A 20 m at 30 deg, leg B 15 m at phi
const legs = phi => { const ax = LA[0] * cs(LA[1]), ay = LA[0] * sn(LA[1]), bx = LB * cs(phi), by = LB * sn(phi); return { ax, ay, bx, by, rx: ax + bx, ry: ay + by }; };
const pairFig = (sv, o, U, withR) => {
  const P = (x, y) => [o[0] + x * U, o[1] - y * U];
  const g = mk(sv, 'g', {});
  for (let m = 10; m <= 30; m += 10) { mk(g, 'line', { x1: P(m, 0)[0], y1: o[1], x2: P(m, 0)[0], y2: P(0, 26)[1], stroke: '#E9E5DA', 'stroke-width': 1.5 }); txt(g, P(m, 0)[0], o[1] + 84, m, { 'text-anchor': 'middle', 'font-size': 16 }); }
  for (let m = 10; m <= 20; m += 10) { mk(g, 'line', { x1: o[0], y1: P(0, m)[1], x2: P(34, 0)[0], y2: P(0, m)[1], stroke: '#E9E5DA', 'stroke-width': 1.5 }); txt(g, o[0] - 70, P(0, m)[1] + 6, m, { 'text-anchor': 'end', 'font-size': 16 }); }
  axes(sv, o, [10, 34 * U + 10, 26 * U + 6, 10]);
  dotL0(sv, o[0], o[1], 'O');
  const f = { P, o, U,
    gx: [mk(sv, 'line', { stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), mk(sv, 'line', { stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' })],
    ax: PUC.arrow(sv, XC, 7, 16), bx: PUC.arrow(sv, XB, 7, 16), ay: PUC.arrow(sv, YC, 7, 16), by: PUC.arrow(sv, YB, 7, 16),
    rxB: PUC.arrow(sv, XC, 10, 18), ryB: PUC.arrow(sv, YC, 10, 18),
    A: PUC.arrow(sv, AC, 6, 18), B: PUC.arrow(sv, C.ink2, 6, 18), R: PUC.arrow(sv, RC, 8, 22),
    AL: sym(sv, 'A', AC, 28), BL: sym(sv, 'B', C.ink2, 28), RL: sym(sv, 'R', RC, 30),
    rxL: txt(sv, 0, 0, 'Rₓ', { fill: XC, 'font-weight': 700, 'font-size': 20 }), ryL: txt(sv, 0, 0, 'Rᵧ', { fill: YC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }) };
  // k: {a, ap, b, bp, r, rp} grow fractions 0..1
  f.set = (phi, k) => {
    const L = legs(phi), O = o, [axp] = P(L.ax, 0), [, ayp] = P(0, L.ay), [bxp] = P(L.rx, 0), [, byp] = P(0, L.ry), at = P(L.ax, L.ay), rt = P(L.rx, L.ry);
    grow(f.A, O[0], O[1], at[0], at[1], k.a); grow(f.B, at[0], at[1], rt[0], rt[1], k.b);
    grow(f.ax, O[0], O[1] + 16, axp, O[1] + 16, k.ap); grow(f.ay, O[0] - 16, O[1], O[0] - 16, ayp, k.ap);
    grow(f.bx, axp, O[1] + 34, bxp, O[1] + 34, k.bp); grow(f.by, O[0] - 34, ayp, O[0] - 34, byp, k.bp);
    grow(f.rxB, O[0], O[1] + 54, bxp, O[1] + 54, k.rp); grow(f.ryB, O[0] - 54, O[1], O[0] - 54, byp, k.rp);
    grow(f.R, O[0], O[1], rt[0], rt[1], k.r);
    const lab = (el, x, y, v) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); op(el, v); };
    lab(f.AL, (O[0] + at[0]) / 2 + 6, (O[1] + at[1]) / 2 + 30, k.a); lab(f.BL, (at[0] + rt[0]) / 2 + 12, (at[1] + rt[1]) / 2 + 6, k.b); lab(f.RL, (O[0] + rt[0]) / 2 - 34, (O[1] + rt[1]) / 2 - 6, k.r);
    lab(f.rxL, bxp + 10, O[1] + 61, k.rp); lab(f.ryL, O[0] - 60, byp - 6, k.rp);
    [[rt[0], rt[1], rt[0], O[1]], [rt[0], rt[1], O[0], rt[1]]].forEach(([a, b, c, d], i) => { attr(f.gx[i], 'x1', a.toFixed(1)); attr(f.gx[i], 'y1', b.toFixed(1)); attr(f.gx[i], 'x2', c.toFixed(1)); attr(f.gx[i], 'y2', d.toFixed(1)); op(f.gx[i], k.r * 0.9); });
    return { L, at, rt };
  };
  return f;
};

/* ---------- S: the live two-leg sim ---------- */
const s = $('#simS'), SO = [150, 470], SU = 13.5;
const sGh = [0, 1, 2].map(() => ({ b: mk(s, 'line', { stroke: C.ink2, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }), r: mk(s, 'line', { stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0 }) }));
const SF = pairFig(s, SO, SU, true);
const sArc = mk(s, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }), sPh = sym(s, 'φ', C.ink2, 24);
const RO = [['Aₓ', XC, 'r0'], ['Bₓ', XB, 'r1'], ['Rₓ', XC, 'r2'], ['Aᵧ', YC, 'r3'], ['Bᵧ', YB, 'r4'], ['Rᵧ', YC, 'r5'], ['|R|', RC, 'r6'], ['θ', RC, 'r7'], ['φ', C.ink2, 'r8']];
$('#roG').innerHTML = RO.map(([k, c, id], i) => `<span class="k" style="color:${c}">${k}</span><span class="v" id="${id}" style="color:${c};font-size:32px">0.0</span><span class="u">${i < 7 ? 'm' : '°'}</span>`).join('');
const G = PUC.graph($('#grS'), { x: 90, y: 66, w: 600, h: 150, xmax: 180, ymin: 0, ymax: 40, xt: [0, 30, 60, 90, 120, 150, 180], yt: [0, 20, 40], yl: '|R| (m)' });
txt($('#grS'), 704, 222, 'φ (°)');
const gR = G.curve(RC), gRd = G.dot(RC, 11);
const tA = wt('S1', 'twenty') - 0.2, tAp = wt('S2', 'seventeen') - 0.3, tB = wt('S3', 'fifteen') - 0.2, tTurn = wt('S3', 'turn');
const tSlow = T0('S5') + 0.05, tRes = T1('S5') + 0.1, tEnd = T1('S6') - 0.3;
const SLOW = tRes - tSlow;
const phiAt = t => t < tTurn ? 0 : t < tSlow ? 120 * M.io((t - tTurn) / (tSlow - tTurn)) : t < tRes ? 120 : 120 + 60 * M.io((t - tRes) / (tEnd - tRes));

/* ---------- D: derivation + static figure ---------- */
const Bv = `\\textcolor{${C.ink2}}{\\vec B}`, Bx = `\\textcolor{${XC}}{B_x}`, By = `\\textcolor{${YC}}{B_y}`, Rx = `\\textcolor{${XC}}{R_x}`, Ry = `\\textcolor{${YC}}{R_y}`, Rm = `\\textcolor{${RC}}{R}`;
const STEPS = [[`${vA} = ${Ax}${IH} + ${Ay}${JH},\\;\\; ${Bv} = ${Bx}${IH} + ${By}${JH}`, 'split each vector into parts'],
  [`${vA} + ${Bv} = (${Ax} + ${Bx})${IH} + (${Ay} + ${By})${JH}`, 'î with î, ĵ with ĵ'],
  [`${Rx} = ${Ax} + ${Bx},\\;\\; ${Ry} = ${Ay} + ${By}`, 'the parts of R are sums'],
  [`${Rm} = \\sqrt{${Rx}^2 + ${Ry}^2}`, 'Pythagoras gives the size'],
  [`\\tan\\theta = ${Ry} / ${Rx}`, 'signs of Rₓ, Rᵧ pick the quadrant']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Split'), wt('D3', 'Add'), wt('D4', 'So'), wt('D5', 'size'), wt('D6', 'tan')];
const DF = pairFig($('#drS'), [150, 470], 13.5, true);
const dArc = mk($('#drS'), 'path', { d: '', fill: 'none', stroke: RC, 'stroke-width': 3 }), dTh = sym($('#drS'), 'θ', RC, 26);
$('#stF').innerHTML = K(`${Rx} = ${Ax} + ${Bx} \\qquad ${Ry} = ${Ay} + ${By}`);

/* ---------- C: A + B vs A - B ---------- */
const CPAN = [[$('#caS'), [2, -1], '#caP', 'Rₓ = 3 + 2 = 5 · Rᵧ = 4 - 1 = 3'], [$('#cbS'), [-2, 1], '#cbP', 'Rₓ = 3 - 2 = 1 · Rᵧ = 4 + 1 = 5']].map(([sv, b, pid, ptx], k) => {
  const o = [150, 430], U = 60, P = (x, y) => [o[0] + x * U, o[1] - y * U];
  for (let i = 1; i <= 8; i++) mk(sv, 'line', { x1: P(i, 0)[0], y1: P(0, -1)[1], x2: P(i, 0)[0], y2: P(0, 5.6)[1], stroke: '#E9E5DA', 'stroke-width': 1.5 });
  for (let j = -1; j <= 5; j++) if (j) mk(sv, 'line', { x1: o[0], y1: P(0, j)[1], x2: P(8.6, 0)[0], y2: P(0, j)[1], stroke: '#E9E5DA', 'stroke-width': 1.5 });
  axes(sv, o, [10, 8.6 * U, 5.6 * U, 1.2 * U]);
  for (let i = 1; i <= 7; i++) txt(sv, P(i, 0)[0], o[1] + 26, i, { 'text-anchor': 'middle', 'font-size': 16 });
  for (let j = 1; j <= 5; j++) txt(sv, o[0] - 12, P(0, j)[1] + 6, j, { 'text-anchor': 'end', 'font-size': 16 });
  const at = P(3, 4), rt = P(3 + b[0], 4 + b[1]);
  const A = PUC.arrow(sv, AC, 6, 18), B = PUC.arrow(sv, C.ink2, 6, 18), R = PUC.arrow(sv, RC, 8, 22);
  const AL = sym(sv, 'A', AC, 28), BL = sym(sv, k ? '-B' : 'B', C.ink2, 28), RL = sym(sv, k ? 'A - B' : 'A + B', RC, 26);
  attr(AL, 'x', P(1.2, 2.6)[0] - 28); attr(AL, 'y', P(1.2, 2.6)[1]); attr(BL, 'x', (at[0] + rt[0]) / 2 + (k ? -46 : 14)); attr(BL, 'y', (at[1] + rt[1]) / 2 + (k ? -10 : 0));
  const rm = [(o[0] + rt[0]) / 2, (o[1] + rt[1]) / 2]; attr(RL, 'x', rm[0] + (k ? -96 : 16)); attr(RL, 'y', rm[1] + (k ? 0 : 34));
  $(pid).innerHTML = ptx.replace('Rₓ', `<span style="color:${XC}">Rₓ</span>`).replace('Rᵧ', `<span style="color:${YC}">Rᵧ</span>`);
  return { o, at, rt, A, B, R, AL, BL, RL, pill: $(pid) };
});
const th1 = PUC.think($('#th1'), { q: 'Two vectors add up to give Rₓ = 0. Must they be equal and opposite?', opts: ['Yes', 'No'], right: 1, why: 'Only the x parts must cancel: (3î + 4ĵ) + (-3î + 2ĵ) = 6ĵ.' });

/* ---------- G: four quadrants for R ---------- */
const gq = $('#gqS'), QO = [800, 300];
axes(gq, QO, [300, 300, 220, 220]);
const QA = [40, 140, 220, 320], QL = 190;
const QD = QA.map(a => { const e = [QO[0] + QL * cs(a), QO[1] - QL * sn(a)]; return { a, e, x: PUC.arrow(gq, XC, 7, 18), y: PUC.arrow(gq, YC, 7, 18), A: PUC.arrow(gq, RC, 6, 18) }; });
const QN = ['I', 'II', 'III', 'IV'], QP = [[1000, 140], [430, 140], [430, 440], [1000, 440]];
$('#gqc').innerHTML = QD.map((q, i) => `<div class="qn" id="qn${i}" style="left:${QP[i][0]}px;top:${QP[i][1] - 48}px">${QN[i]}</div><div class="qc" id="qc${i}" style="left:${QP[i][0]}px;top:${QP[i][1]}px"><b>Rₓ</b><span style="color:${XC}">${cs(q.a) > 0 ? '+' : '-'}</span><b>Rᵧ</b><span style="color:${YC}">${sn(q.a) > 0 ? '+' : '-'}</span></div>`).join('');
const tQd = [wt('G2', 'one'), wt('G2', 'two'), wt('G3', 'three'), wt('G3', 'four')];
const th2 = PUC.think($('#th2'), { q: 'Rₓ is -4 and Rᵧ is +3. Which quadrant does R point into?', opts: ['Second', 'Fourth'], right: 0, why: 'Negative x is left, positive y is up: up and left is quadrant II.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${XC}}{A_x} = 20\\cos 30^\\circ \\approx \\textcolor{${XC}}{17.3},\\; \\textcolor{${YC}}{A_y} = 20\\sin 30^\\circ = \\textcolor{${YC}}{10}`)],
  [K(`\\textcolor{${XC}}{B_x} = \\textcolor{${XC}}{0},\\;\\; \\textcolor{${YC}}{B_y} = \\textcolor{${YC}}{5}`)],
  [K(`\\textcolor{${XC}}{R_x} = 17.3,\\;\\; \\textcolor{${YC}}{R_y} = 15`)],
  [K(`\\textcolor{${DC}}{R} = \\sqrt{17.3^2 + 15^2} \\approx \\textcolor{${DC}}{22.9}\\,\\text{m}`)],
  [K(`\\tan\\theta = \\tfrac{15}{17.3} \\Rightarrow \\theta \\approx 41^\\circ \\text{ N of E}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 80 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [110, 500], WU = 22;                     // 22 px per metre
const wp = (x, y) => [WO[0] + x * WU, WO[1] - y * WU];
axes(w, WO, [40, 560, 400, 40]);
for (let m = 5; m <= 20; m += 5) { const [px] = wp(m, 0), [, py] = wp(0, m); mk(w, 'line', { x1: px, y1: WO[1], x2: px, y2: WO[1] + 8, stroke: C.ink, 'stroke-width': 2 }); txt(w, px, WO[1] + 30, m, { 'text-anchor': 'middle' }); if (m < 20) { mk(w, 'line', { x1: WO[0] - 8, y1: py, x2: WO[0], y2: py, stroke: C.ink, 'stroke-width': 2 }); txt(w, WO[0] - 14, py + 6, m, { 'text-anchor': 'end' }); } }
const Ax1 = 20 * cs(30), Ay1 = 10;
const wA = PUC.arrow(w, AC, 6, 18), wB = PUC.arrow(w, C.ink2, 6, 18), wR = PUC.arrow(w, DC, 8, 22);
const wRx = PUC.arrow(w, XC, 5, 14), wRy = PUC.arrow(w, YC, 5, 14);
const wAL = txt(w, wp(11, 4.6)[0], wp(11, 4.6)[1] + 8, '20 m', { fill: AC, 'font-weight': 700, 'font-size': 24 });
const wBL = txt(w, wp(Ax1, 12.5)[0] + 16, wp(Ax1, 12.5)[1], '5 m', { fill: C.ink2, 'font-weight': 700, 'font-size': 24 });
const wRL = txt(w, wp(7, 9)[0], wp(7, 9)[1], '22.9 m', { fill: DC, 'font-weight': 700, 'font-size': 26, 'text-anchor': 'end' });
const wXl = txt(w, wp(Ax1, 0)[0], WO[1] + 56, 'Rₓ = 17.3', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 22 });
const wYl = txt(w, wp(Ax1, 0)[0] + 14, wp(0, 6)[1], 'Rᵧ = 15', { fill: YC, 'font-weight': 700, 'font-size': 22 });
const wArc = mk(w, 'path', { d: arcP(WO, 70, 0, 41), fill: 'none', stroke: DC, 'stroke-width': 3 }), wArcL = txt(w, WO[0] + 80, WO[1] - 18, '41°', { fill: DC, 'font-weight': 600, 'font-size': 22 });
const wSt = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two rides, one arrow from start to finish.' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`-3${IH} + 3${JH}:\\; \\tan\\theta = -1 \\Rightarrow \\theta = -45^\\circ`), right: K(`${Ax} < 0,\\; ${Ay} > 0 \\Rightarrow \\text{quadrant II} \\Rightarrow \\theta = 135^\\circ`) });
const tp = $('#tpS'), TO = [300, 140], TU = 26;
axes(tp, TO, [190, 190, 100, 110]);
const tpW = PUC.arrow(tp, C.red, 6, 18), tpA = PUC.arrow(tp, AC, 7, 20), tpX = PUC.arrow(tp, XC, 7, 18), tpY = PUC.arrow(tp, YC, 7, 18);
const tpWL = txt(tp, TO[0] + 3 * TU + 14, TO[1] + 3 * TU + 6, '-45°?', { fill: C.red, 'font-weight': 700, 'font-size': 22 });
const tpArc = mk(tp, 'path', { d: arcP(TO, 40, 0, 135), fill: 'none', stroke: AC, 'stroke-width': 3 });
const tpAL = txt(tp, TO[0] + 20, TO[1] - 52, '135°', { fill: AC, 'font-weight': 700, 'font-size': 22 });
const where = PUC.where($('#wa'), { on: [], type: 'A step inside bigger problems: resolve a force or velocity, or find a resultant from parts' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K('\\vec A')}: 6 units along +x<br>${K('\\vec B')}: ${K('6\\sqrt2')} units at 135° to +x<br>${K('\\vec C')}: 4 units along -y. Their resultant is`,
  opts: ['2 units, along +y', '10 units, along +y', '12.2 units, 9.5° above +x', '2 units, along -y'], right: 0, cols: 1, optW: 968, optH: 64, optFs: 28, optY: 300 });
const so = PUC.solution($('#so'), [
  [K(`\\textcolor{${XC}}{R_x} = 6 + 6\\sqrt2\\cos 135^\\circ`)],
  [K(`\\textcolor{${XC}}{R_x} = 6 - 6 = \\textcolor{${XC}}{0}`)],
  [K(`\\textcolor{${YC}}{R_y} = 6\\sqrt2\\sin 135^\\circ - 4`)],
  [K(`\\textcolor{${YC}}{R_y} = 6 - 4 = \\textcolor{${YC}}{2}`)],
  ['<b style="color:var(--red)">12.2, 10</b>: sign traps']], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'R'), wt('A2', 'That'), wt('A3', 'R'), wt('A3', 'That'), wt('A4', 'Taking')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · adding by components', y0: 100, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`${Rx} = ${Ax} + ${Bx} \\qquad ${Ry} = ${Ay} + ${By}`),
    K(`${Rm} = \\sqrt{${Rx}^2 + ${Ry}^2} \\qquad \\tan\\theta = ${Ry}/${Rx}`),
    '<b>Subtract</b>: flip the signs of B, then add', '<b>Signs</b> of Rₓ, Rᵧ give the quadrant: check before finding θ'] });
const YQ = ['To add two vectors, which parts do you add together?', 'A = 3î + 4ĵ, B = 2î - ĵ. What is A - B?', 'Why must you check the signs before finding the angle of R?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 40', topic: 'Velocity has parts too: Motion in Two Dimensions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.1, 1.06, 960, 540], [tRes + 0.1, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const labNear = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const on = M.io((t - wt('H2', 'two') + 0.1) / 0.3); el.style.background = mix(C.soft, C.ac2, on); el.querySelectorAll('.mx,.my').forEach(l => op(l, on)); });
    M.vis($('#hjP'), t, wt('H2', 'jobs') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#exH'), t, wt('H3', 'Twenty') - 0.1, 1e9, { dy: 8 });
    M.vis($('#hbub'), t, wt('H3', 'fifteen') - 0.1, 1e9, { dx: -16, dy: 0, sp: M.SOFT });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - wt('H5', 'Components')) / 0.3)); });
  }

  /* P: quick reminder */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pg'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pAx, t, tP1 + 0.2, 1e9, { dy: 0, fade: 0.3 });
    grow(pArr, PO[0], PO[1], tip[0], tip[1], M.io((t - tP1 - 0.4) / 0.7)); op(pAL, (t - tP1 - 0.9) / 0.25);
    const tx = wt('P2', 'x'), ty = wt('P2', 'y');
    M.draw(pLx, t, tx - 0.4, 0.4); grow(pBx, PO[0], PO[1], tip[0], PO[1], M.io((t - tx + 0.1) / 0.6)); op(pBxL, (t - tx + 0.1) / 0.25);
    M.draw(pLy, t, ty - 0.4, 0.4); grow(pBy, PO[0], PO[1], PO[0], tip[1], M.io((t - ty + 0.1) / 0.6)); op(pByL, (t - ty + 0.1) / 0.25);
    M.vis($('#pr'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pf0'), t, T0('P2') + 0.2, 0.8);
    M.vis($('#pc0'), t, tx + 0.2, 1e9, POP); M.vis($('#pc1'), t, ty + 0.2, 1e9, POP);
    PUC.write($('#pf1'), t, wt('P3', 'equals'), 0.9);
  }

  /* S: two legs, parts stack live */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const phi = phiAt(t), slowOn = t >= tSlow && t < tRes, re = slowOn ? M.io((t - tSlow - 0.3) / 0.8) : 1;
    const kb = M.io((t - tB) / 0.6), kbp = M.io((t - tB - 0.5) / 0.6) * re, kr = M.io((t - tB - 1.0) / 0.6);
    const st = SF.set(phi, { a: M.io((t - tA) / 0.6), ap: M.io((t - tAp) / 0.6), b: kb, bp: kbp, r: kr, rp: kr * re });
    // B's angle arc at the tip of A
    attr(sArc, 'd', kb > 0.9 && phi > 3 ? arcP(st.at, 34, 0, phi) : ''); attr(sPh, 'x', (st.at[0] + 44 * cs(phi / 2) - 6).toFixed(1)); attr(sPh, 'y', (st.at[1] - 44 * sn(phi / 2) + 8).toFixed(1)); op(sPh, phi > 12 ? 1 : 0);
    // ghosts of B and R at 30, 60, 90 degrees while B turns
    [30, 60, 90].forEach((g, k) => { const L = legs(g), at = SF.P(L.ax, L.ay), rt = SF.P(L.rx, L.ry), on = phi > g + 6 && t < T0('S7') ? [0.12, 0.2, 0.3][k] : 0;
      [[sGh[k].b, at], [sGh[k].r, SO]].forEach(([el, a]) => { attr(el, 'x1', a[0].toFixed(1)); attr(el, 'y1', a[1].toFixed(1)); attr(el, 'x2', rt[0].toFixed(1)); attr(el, 'y2', rt[1].toFixed(1)); el.style.opacity = on; }); });
    M.vis($('#slow'), t, tSlow, tRes, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    M.vis($('#sTag'), t, T0('S7'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08 });
    // readout + graph follow the sim every frame
    const L = st.L, shown = [t > tAp ? L.ax : 0, t > tB ? L.bx : 0, 0, t > tAp ? L.ay : 0, t > tB ? L.by : 0, 0];
    shown[2] = shown[0] + shown[1]; shown[5] = shown[3] + shown[4];
    const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);
    shown.forEach((v, i) => M.setT($('#r' + i), f1(v)));
    M.setT($('#r6'), Math.hypot(shown[2], shown[5]).toFixed(1)); M.setT($('#r7'), (Math.atan2(shown[5], shown[2]) * 180 / Math.PI).toFixed(1)); M.setT($('#r8'), phi.toFixed(0));
    const gOn = t > tB + 0.5;
    gR(p => [p, Math.hypot(legs(p).rx, legs(p).ry)], 0, gOn ? phi : 0); gRd(phi, Math.hypot(L.rx, L.ry), gOn);
  }

  /* D: rule + static figure at phi = 120 */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const ka = M.io((t - tD1 - 0.6) / 0.6), kp = M.io((t - wt('D2', 'A', 1)) / 0.6), kb = M.io((t - wt('D2', 'B', 0) + 0.2) / 0.6), kbp = M.io((t - wt('D2', 'B', 1)) / 0.6);
    const krp = M.io((t - wt('D4', 'R')) / 0.6), kr = M.io((t - wt('D5', 'size')) / 0.6);
    const st = DF.set(120, { a: ka, ap: kp, b: kb, bp: kbp, r: kr, rp: krp });
    const th = Math.atan2(st.L.ry, st.L.rx) * 180 / Math.PI;
    attr(dArc, 'd', t > wt('D6', 'tan') ? arcP(DF.o, 70, 0, th) : ''); attr(dTh, 'x', DF.o[0] + 82 * cs(th / 2)); attr(dTh, 'y', DF.o[1] - 82 * sn(th / 2) + 8); op(dTh, (t - wt('D6', 'tan')) / 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Add') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'x', 1), 0.9);
  }

  /* C: A + B vs A - B + think */
  const cOn = t >= tC1 - 0.1 && t < tG1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    CPAN.forEach((p, k) => {
      const tin = k ? T0('C3') - 0.1 : tC1 + 0.2;
      M.vis($(k ? '#cb' : '#ca'), t, tin, out, { dx: k ? 60 : -60, dy: 0, ...o });
      const ta = k ? T0('C3') + 0.4 : wt('C2', 'A', 1) - 0.1, tb = k ? wt('C3', 'Subtract') : wt('C2', 'B', 1) - 0.1, tr = k ? wt('C3', 'One') - 0.2 : wt('C2', 'Five') - 0.2;
      grow(p.A, p.o[0], p.o[1], p.at[0], p.at[1], M.io((t - ta) / 0.6)); op(p.AL, (t - ta - 0.3) / 0.25);
      grow(p.B, p.at[0], p.at[1], p.rt[0], p.rt[1], M.io((t - tb) / 0.6)); op(p.BL, (t - tb - 0.3) / 0.25);
      grow(p.R, p.o[0], p.o[1], p.rt[0], p.rt[1], M.io((t - tr) / 0.6)); op(p.RL, (t - tr - 0.3) / 0.25);
      M.vis(p.pill, t, tr + 0.3, 1e9, POP);
      if (k) p.pill.style.background = mix(C.soft, C.ac2, M.io((t - wt('C3', 'flip')) / 0.3));
    });
    M.vis($('#th1'), t, T0('C4') + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: T0('C4'), tOpts: wt('C4', 'Must') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Only') });
  }

  /* G: quadrants + think */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gq'), t, tG1 + 0.05, OUT('G4'), { dy: 36, ...o });
    QD.forEach((q, i) => {
      const ta = tQd[i], u = M.io((t - ta + 0.1) / 0.5), c = M.io((t - ta - 0.3) / 0.5);
      grow(q.A, QO[0], QO[1], q.e[0], q.e[1], u); q.x.set(QO[0], QO[1], QO[0] + (q.e[0] - QO[0]) * c, QO[1]); q.y.set(q.e[0], QO[1], q.e[0], QO[1] + (q.e[1] - QO[1]) * c);
      M.vis($('#qc' + i), t, ta + 0.2, 1e9, POP); const qn = $('#qn' + i); M.vis(qn, t, wt('G1', 'quadrant') - 0.2 + i * 0.15, 1e9, { dy: 8 }); qn.style.color = mix(C.dim, C.ink, M.io((t - ta) / 0.3));
    });
    M.vis($('#th2'), t, T0('G4') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('G4'), tOpts: wt('G4', 'Which') - 0.1, tCount: T1('G4') + 0.05, dur: 3, tAns: T0('G5') - 0.02, tWhy: wt('G5', 'Negative') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')]);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const [ax, ay] = wp(Ax1, Ay1), [rx, ry] = wp(Ax1, Ay1 + 5);
    grow(wA, WO[0], WO[1], ax, ay, M.io((t - wt('W2', 'twenty')) / 0.7)); op(wAL, (t - wt('W2', 'thirty')) / 0.25);
    grow(wB, ax, ay, rx, ry, M.io((t - wt('W2', 'five')) / 0.6)); op(wBL, (t - wt('W2', 'north', 1)) / 0.25);
    grow(wRx, WO[0], WO[1], rx, WO[1], M.io((t - wt('W5', 'R')) / 0.6)); op(wXl, (t - wt('W5', 'seventeen')) / 0.25);
    grow(wRy, rx, WO[1], rx, ry, M.io((t - wt('W5', 'fifteen') + 0.2) / 0.6)); op(wYl, (t - wt('W5', 'fifteen')) / 0.25);
    grow(wR, WO[0], WO[1], rx, ry, M.io((t - T0('W6')) / 0.7)); op(wRL, (t - wt('W6', 'twenty')) / 0.25);
    M.draw(wArc, t, T0('W7') + 0.2, 0.5); op(wArcL, (t - wt('W7', 'forty')) / 0.25);
    wSt(t, T1('W7') - 0.6, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'down') - 0.1, tRight: wt('X3', 'second') - 0.1 });
    const tw = wt('X2', 'write'), tr = wt('X3', 'Here');
    grow(tpW, TO[0], TO[1], TO[0] + 3 * TU, TO[1] + 3 * TU, M.io((t - tw) / 0.5)); op(tpWL, (t - tw - 0.3) / 0.25); tpW.g.style.opacity = (1 - 0.65 * M.io((t - tr) / 0.3)).toFixed(3);
    grow(tpX, TO[0], TO[1], TO[0] - 3 * TU, TO[1], M.io((t - wt('X3', 'x') + 0.1) / 0.5)); grow(tpY, TO[0] - 3 * TU, TO[1], TO[0] - 3 * TU, TO[1] - 3 * TU, M.io((t - wt('X3', 'y') + 0.1) / 0.5));
    grow(tpA, TO[0], TO[1], TO[0] - 3 * TU, TO[1] - 3 * TU, M.io((t - wt('X3', 'second')) / 0.5)); M.draw(tpArc, t, wt('X3', 'angle'), 0.5); op(tpAL, (t - wt('X3', 'angle') - 0.3) / 0.25);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'step') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.3, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
