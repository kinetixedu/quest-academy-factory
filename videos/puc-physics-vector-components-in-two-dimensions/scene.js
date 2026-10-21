// PUC Physics Ep 39: Vector Components in Two Dimensions (Motion notebook, turning arrow)
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
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C2'), tG1 = T0('G1'), tV1 = T0('V1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
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
const arcP = (o, rad, a0, a1) => { const p = a => [o[0] + rad * cs(a), o[1] - rad * sn(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${rad},${rad} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 0 ${x1.toFixed(1)},${y1.toFixed(1)}`; };

/* ---------- title card + hook ---------- */
const JOBS = [['ladder', 'Ladder', 'ACROSS THE FLOOR + UP THE WALL', 'ladder'], ['kite', 'Kite string', 'PULLS FORWARD + PULLS DOWN', 'kite'], ['ramp', 'Ramp', 'MOVES YOU IN + LIFTS YOU UP', 'ramp']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w.split(' + ')[0]}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
// each row: a mini slanted arrow with its two parts, name and the two jobs
const MINI = [62, 35, 25];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => { const a = MINI[i], L = 86, ex = 6 + L * cs(a), ey = 86 - L * sn(a); return `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><svg width="100" height="92"><line class="mx" x1="6" y1="86" x2="${ex.toFixed(1)}" y2="86" stroke="${XC}" stroke-width="5" stroke-linecap="round"/><line class="my" x1="${ex.toFixed(1)}" y1="86" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${YC}" stroke-width="5" stroke-linecap="round"/><line x1="6" y1="86" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${AC}" stroke-width="6" stroke-linecap="round"/></svg><div class="jn">${n}</div><div class="jw">${w}</div></div>`; }).join('');
const TILES = [['arrowR', 'East?', XC], ['arrowU', 'North?', YC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'east'), wt('H4', 'north')];

/* ---------- P: two shadows ---------- */
const pS = $('#pgS'), PO = [140, 470], PL = 380, PA = 37;           // A = 10 units at 37 deg (38 px per unit)
const pAx = axes(pS, PO, [40, 560, 360, 40]);
const tip = [PO[0] + PL * cs(PA), PO[1] - PL * sn(PA)];
const pArr = PUC.arrow(pS, AC, 7, 20), pAL = sym(pS, 'A', AC, 34);
attr(pAL, 'x', (PO[0] + tip[0]) / 2 - 30); attr(pAL, 'y', (PO[1] + tip[1]) / 2 - 16);
const pLx = mk(pS, 'path', { d: `M${tip[0]},96 V${PO[1]}`, stroke: C.gold, 'stroke-width': 2, 'stroke-dasharray': '6 6', fill: 'none' });
const pLy = mk(pS, 'path', { d: `M${PO[0]},${tip[1]} H${tip[0]}`, stroke: C.gold, 'stroke-width': 2, 'stroke-dasharray': '6 6', fill: 'none' });
const pSunX = mk(pS, 'g', { class: 'pv' }); mk(pSunX, 'circle', { cx: tip[0], cy: 92, r: 14, fill: '#F2C94C', stroke: C.ink, 'stroke-width': 2 });
const pSunY = mk(pS, 'g', { class: 'pv' }); mk(pSunY, 'circle', { cx: 720, cy: tip[1], r: 14, fill: '#F2C94C', stroke: C.ink, 'stroke-width': 2 });
const pBx = PUC.arrow(pS, XC, 9, 20), pBy = PUC.arrow(pS, YC, 9, 20);
const pBxL = sym(pS, 'Aₓ', XC, 30), pByL = sym(pS, 'Aᵧ', YC, 30);
attr(pBxL, 'x', (PO[0] + tip[0]) / 2 - 18); attr(pBxL, 'y', PO[1] + 44); attr(pByL, 'x', PO[0] - 68); attr(pByL, 'y', (PO[1] + tip[1]) / 2 + 10);
const pWx = PUC.arrow(pS, XC, 5, 14), pWy = PUC.arrow(pS, YC, 5, 14);
const pWalker = mk(pS, 'circle', { r: 10, fill: C.ink, cx: -40, cy: -40 });
$('#pf0').innerHTML = K(`${vA} \\;\\to\\; ${Ax}\\; \\text{and}\\; ${Ay}`);
$('#pc0').innerHTML = `${M.icon('arrowR', 24, XC, 2.6)}<span><b style="color:${XC}">x component</b>: shadow on the x axis</span>`;
$('#pc1').innerHTML = `${M.icon('arrowU', 24, YC, 2.6)}<span><b style="color:${YC}">y component</b>: shadow on the y axis</span>`;
$('#pf1').innerHTML = K(`${vA} = ${Ax}\\,${IH} + ${Ay}\\,${JH}`);

/* ---------- S: turning arrow sim ---------- */
const s = $('#simS'), SO = [392, 330], SL = 220, AU = 10;          // 22 px per unit, |A| = 10
axes(s, SO, [300, 300, 230, 230]);
mk(s, 'circle', { cx: SO[0], cy: SO[1], r: SL, fill: 'none', stroke: C.dim, 'stroke-width': 1.5, 'stroke-dasharray': '4 8' });
const sArc = mk(s, 'path', { d: '', fill: 'none', stroke: AC, 'stroke-width': 2.5 }), sTh = sym(s, 'θ', AC, 26);
const sGh = [0, 1, 2].map(() => mk(s, 'line', { x1: SO[0], y1: SO[1], stroke: AC, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }));
const sDx = mk(s, 'line', { stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), sDy = mk(s, 'line', { stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const sX = PUC.arrow(s, XC, 9, 20), sY = PUC.arrow(s, YC, 9, 20), sA = PUC.arrow(s, AC, 7, 20);
const sXL = sym(s, 'Aₓ', XC, 28), sYL = sym(s, 'Aᵧ', YC, 28), sAL = sym(s, 'A', AC, 30);
$('#roG').innerHTML = [['θ', AC, 'rt', '°'], ['|A|', AC, 'ra', ''], ['Aₓ', XC, 'rx', ''], ['Aᵧ', YC, 'ry', '']].map(([k, c, id, u]) => `<span class="k" style="color:${c}">${k}</span><span class="v" id="${id}" style="color:${c}">0.0</span><span class="u">${u}</span>`).join('');
const G = PUC.graph($('#grS'), { x: 90, y: 66, w: 600, h: 160, xmax: 360, ymin: -10, ymax: 10, xt: [0, 90, 180, 270, 360], yt: [-10, 0, 10], yl: '' });
txt($('#grS'), 704, 232, 'θ (°)');
const gX = G.curve(XC), gY = G.curve(YC), gXd = G.dot(XC, 10), gYd = G.dot(YC, 10);
const gxl = sym($('#grS'), 'Aₓ', XC, 24), gyl = sym($('#grS'), 'Aᵧ', YC, 24);
const tTurn = wt('S2', 'grows'), tSlow = T0('S5') + 0.05, tFull = T0('S7') - 0.1, tLap = T1('S7') - 0.4;
// angle track: 0 until tTurn, rises to 150 at tSlow, holds for the replay, 150 -> 360 during S6/S7
const thAt = t => {
  if (t < tTurn) return 0;
  if (t < tSlow) return 150 * M.io((t - tTurn) / (tSlow - tTurn));
  const tRes = T0('S6') + 0.4; if (t < tRes) return 150;
  return 150 + 210 * M.clamp((t - tRes) / (tLap - tRes));
};
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 186, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same arrow, but the parts keep trading!' });

/* ---------- D: derivation + triangle ---------- */
const STEPS = [[`\\text{right triangle: } ${Am} \\text{ is the longest side}`, 'the arrow and its two parts'],
  [`\\cos\\theta = ${Ax} / ${Am} \\;\\Rightarrow\\; ${Ax} = ${Am}\\cos\\theta`, 'side next to θ over the longest side'],
  [`\\sin\\theta = ${Ay} / ${Am} \\;\\Rightarrow\\; ${Ay} = ${Am}\\sin\\theta`, 'opposite side over the longest side'],
  [`${Am} = \\sqrt{${Ax}^2 + ${Ay}^2}`, 'Pythagoras gives the size'],
  [`\\tan\\theta = ${Ay} / ${Ax}`, 'and the direction']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'arrow'), wt('D3', 'Cos'), wt('D4', 'Sin'), wt('D5', 'Pythagoras'), wt('D6', 'direction')];
const dS = $('#drS'), DO = [120, 460], DL = 520, DA = 37;
const dt = [DO[0] + DL * cs(DA), DO[1] - DL * sn(DA)];
axes(dS, DO, [40, 600, 380, 40]);
const dTri = mk(dS, 'path', { d: `M${DO[0]},${DO[1]} L${dt[0]},${DO[1]} L${dt[0]},${dt[1]} Z`, fill: C.ac2 || '#DCE7FC', opacity: 0.5, stroke: 'none' });
const dSq = mk(dS, 'path', { d: `M${dt[0] - 22},${DO[1]} V${DO[1] - 22} H${dt[0]}`, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
const dX = PUC.arrow(dS, XC, 9, 20), dY = PUC.arrow(dS, YC, 9, 20), dAr = PUC.arrow(dS, AC, 7, 20);
const dArc = mk(dS, 'path', { d: arcP(DO, 80, 0, DA), fill: 'none', stroke: AC, 'stroke-width': 2.5 }), dTh = sym(dS, 'θ', AC, 28); attr(dTh, 'x', DO[0] + 92); attr(dTh, 'y', DO[1] - 20);
const dAL = sym(dS, 'A', AC, 34), dXL = sym(dS, 'Aₓ = A cos θ', XC, 26), dYL = sym(dS, 'Aᵧ = A sin θ', YC, 26);
attr(dAL, 'x', (DO[0] + dt[0]) / 2 - 36); attr(dAL, 'y', (DO[1] + dt[1]) / 2 - 18); attr(dXL, 'x', (DO[0] + dt[0]) / 2 - 80); attr(dXL, 'y', DO[1] + 46); attr(dYL, 'x', dt[0] + 16); attr(dYL, 'y', (DO[1] + dt[1]) / 2 + 10);
const dHx = mk(dS, 'path', { d: `M${DO[0]},${DO[1]} H${dt[0]}`, stroke: XC, 'stroke-width': 16, opacity: 0.25, fill: 'none' });
const dHy = mk(dS, 'path', { d: `M${dt[0]},${DO[1]} V${dt[1]}`, stroke: YC, 'stroke-width': 16, opacity: 0.25, fill: 'none' });
const dHa = mk(dS, 'path', { d: `M${DO[0]},${DO[1]} L${dt[0]},${dt[1]}`, stroke: AC, 'stroke-width': 16, opacity: 0.18, fill: 'none' });
$('#stF').innerHTML = K(`${vA} = ${Am}\\cos\\theta\\,${IH} + ${Am}\\sin\\theta\\,${JH}`);

/* ---------- C: 30 vs 60 side by side ---------- */
const CPAN = [[$('#caS'), 30, '#caV'], [$('#cbS'), 60, '#cbV']].map(([sv, a, vid]) => {
  const o = [150, 450], L = 340;
  axes(sv, o, [40, 560, 360, 40]);
  const e = [o[0] + L * cs(a), o[1] - L * sn(a)];
  const x = PUC.arrow(sv, XC, 9, 20), y = PUC.arrow(sv, YC, 9, 20), A = PUC.arrow(sv, AC, 7, 20);
  const arc = mk(sv, 'path', { d: arcP(o, 70, 0, a), fill: 'none', stroke: AC, 'stroke-width': 2.5 });
  const th = txt(sv, o[0] + 82, o[1] - 14, a + '°', { fill: AC, 'font-weight': 600, 'font-size': 22 });
  $(vid).innerHTML = `<div class="pillp" style="left:36px;top:492px;font-family:'IBM Plex Mono'"><span style="color:${XC}">Aₓ = ${(10 * cs(a)).toFixed(1)}</span><span style="color:var(--dim)">·</span><span style="color:${YC}">Aᵧ = ${(10 * sn(a)).toFixed(1)}</span></div>`;
  return { o, e, x, y, A, arc, th, pill: $(vid).firstChild };
});
const th1 = PUC.think($('#th1'), { q: 'Keep turning A to 90°. What is Aₓ now?', opts: ['Zero', 'Ten'], right: 0, why: 'cos 90° = 0. A points straight up: its shadow on x is just a dot.' });

/* ---------- G: four quadrants ---------- */
const gq = $('#gqS'), QO = [800, 300];
axes(gq, QO, [300, 300, 220, 220]);
const QA = [40, 140, 220, 320], QL = 190;
const QD = QA.map(a => { const e = [QO[0] + QL * cs(a), QO[1] - QL * sn(a)]; return { a, e, x: PUC.arrow(gq, XC, 7, 18), y: PUC.arrow(gq, YC, 7, 18), A: PUC.arrow(gq, AC, 6, 18) }; });
const QN = ['I', 'II', 'III', 'IV'], QP = [[1000, 140], [430, 140], [430, 440], [1000, 440]];
$('#gqc').innerHTML = QD.map((q, i) => `<div class="qn" id="qn${i}" style="left:${QP[i][0]}px;top:${QP[i][1] - 48}px">${QN[i]}</div><div class="qc" id="qc${i}" style="left:${QP[i][0]}px;top:${QP[i][1]}px"><b>x</b><span style="color:${XC}">${cs(q.a) > 0 ? '+' : '-'}</span><b>y</b><span style="color:${YC}">${sn(q.a) > 0 ? '+' : '-'}</span></div>`).join('');
const tQd = [wt('G2', 'First'), wt('G2', 'Second'), wt('G3', 'Third'), wt('G3', 'Fourth')];
const th2 = PUC.think($('#th2'), { q: 'Can a component ever be longer than the vector itself?', opts: ['Yes', 'No'], right: 1, why: 'Aₓ = A cos θ and Aᵧ = A sin θ; cos and sin are never above 1.' });

/* ---------- V: adding by parts ---------- */
const vS = $('#vlS'), VO = [110, 470], VU = 34;
axes(vS, VO, [40, 620, 400, 40]);
const VA = [5, 3], VB = [3, 6];
const vp = (x, y) => [VO[0] + x * VU, VO[1] - y * VU];
const vAa = PUC.arrow(vS, AC, 6, 18), vBa = PUC.arrow(vS, C.ink2, 6, 18), vRa = PUC.arrow(vS, RC, 7, 20);
const vRx = PUC.arrow(vS, XC, 8, 18), vRy = PUC.arrow(vS, YC, 8, 18);
const vAL = sym(vS, 'A', AC, 30), vBL = sym(vS, 'B', C.ink2, 30), vRL = sym(vS, 'R', RC, 32);
attr(vAL, 'x', vp(2.5, 1.5)[0] + 6); attr(vAL, 'y', vp(2.5, 1.5)[1] + 34); attr(vBL, 'x', vp(6.5, 6)[0] + 18); attr(vBL, 'y', vp(6.5, 6)[1]); attr(vRL, 'x', vp(4, 4.5)[0] - 40); attr(vRL, 'y', vp(4, 4.5)[1] - 10);
const vXl = txt(vS, vp(4, 0)[0], VO[1] + 34, 'Rₓ = 5 + 3 = 8', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 22 });
const vYl = txt(vS, vp(8, 0)[0] + 16, vp(0, 4.5)[1] + 6, 'Rᵧ = 3 + 6 = 9', { fill: YC, 'font-weight': 600, 'font-size': 22 });
const vGh = document.createElement('div'); vGh.className = 'ghost'; vGh.style.cssText = 'right:36px;top:18px'; vGh.textContent = 'EXAMPLE FIGURES'; $('#vl').appendChild(vGh);
$('#vf0').innerHTML = K(`\\vec R = ${vA} + \\textcolor{${C.ink2}}{\\vec B}`);
$('#vf1').innerHTML = K(`\\textcolor{${XC}}{R_x} = \\textcolor{${XC}}{A_x} + \\textcolor{${XC}}{B_x}`);
$('#vf2').innerHTML = K(`\\textcolor{${YC}}{R_y} = \\textcolor{${YC}}{A_y} + \\textcolor{${YC}}{B_y}`);

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
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · vector components', y0: 100, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`${Ax} = ${Am}\\cos\\theta \\qquad ${Ay} = ${Am}\\sin\\theta`),
    K(`${Am} = \\sqrt{${Ax}^2 + ${Ay}^2} \\qquad \\tan\\theta = ${Ay}/${Ax}`),
    '<b>Signs</b> come from the quadrant: check them before finding θ', '<b>Add vectors</b>: add x parts, add y parts'] });
const YQ = ['Why is Aₓ negative for an arrow pointing up and to the left?', 'If Aₓ and Aᵧ are both 5, what is the angle of A?', 'Why can a component never be longer than the vector?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 40', topic: 'Velocity has parts too: Motion in Two Dimensions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const SLOW = T0('S6') + 0.4 - tSlow;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.1, 1.06, 560, 540], [tSlow + SLOW + 0.1, 1, 960, 540]]);
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
    M.vis($('#exH'), t, wt('H3', 'five') - 0.1, 1e9, { dy: 8 });
    M.vis($('#hbub'), t, wt('H3', 'five') - 0.1, 1e9, { dx: -16, dy: 0, sp: M.SOFT });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - wt('H5', 'both')) / 0.3)); });
  }

  /* P: shadows */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pg'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pAx, t, T0('P2') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    grow(pArr, PO[0], PO[1], tip[0], tip[1], M.io((t - wt('P2', 'tail')) / 0.7)); op(pAL, (t - wt('P2', 'tail') - 0.4) / 0.25);
    M.vis(pSunX, t, wt('P3', 'light') - 0.1, 1e9, POP); M.draw(pLx, t, wt('P3', 'shadow') - 0.2, 0.5);
    grow(pBx, PO[0], PO[1], tip[0], PO[1], M.io((t - wt('P3', 'x', 1)) / 0.6)); op(pBxL, (t - wt('P3', 'component')) / 0.25);
    M.vis(pSunY, t, wt('P4', 'light') - 0.1, 1e9, POP); M.draw(pLy, t, wt('P4', 'shadow') - 0.2, 0.5);
    grow(pBy, PO[0], PO[1], PO[0], tip[1], M.io((t - wt('P4', 'y', 1)) / 0.6)); op(pByL, (t - wt('P4', 'component')) / 0.25);
    // walk Ax then Ay: a dot and two thin arrows head-to-tail
    const tw = wt('P5', 'Walk'), k1 = M.io((t - tw) / 0.9), k2 = M.io((t - wt('P5', 'then')) / 0.9);
    grow(pWx, PO[0], PO[1] + 0, tip[0], PO[1], k1); pWx.g.style.opacity = 0;
    grow(pWy, tip[0], PO[1], tip[0], tip[1], k2);
    const wx = PO[0] + (tip[0] - PO[0]) * k1, wy = PO[1] + (tip[1] - PO[1]) * k2; attr(pWalker, 'cx', wx.toFixed(1)); attr(pWalker, 'cy', wy.toFixed(1)); M.hide(pWalker, t < tw - 0.05 || t > T0('P6') + 0.5);
    M.vis($('#pr'), t, wt('P3', 'x', 1) - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pf0'), t, wt('P3', 'component'), 0.8);
    M.vis($('#pc0'), t, wt('P3', 'component') + 0.4, 1e9, POP); M.vis($('#pc1'), t, wt('P4', 'component') + 0.2, 1e9, POP);
    PUC.write($('#pf1'), t, wt('P6', 'equals'), 0.9);
  }

  /* S: turning arrow */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const th = thAt(t), aOn = M.io((t - T0('S2') - 0.1) / 0.6);
    const ex = SO[0] + SL * cs(th) * aOn, ey = SO[1] - SL * sn(th) * aOn;
    sA.set(SO[0], SO[1], ex, ey);
    const slowOn = t >= tSlow && t < tSlow + SLOW, re = slowOn ? M.io((t - tSlow - 0.25) / 0.8) : 1;
    const cOn = M.io((t - wt('S3', 'along') + 0.1) / 0.4) * re;
    sX.set(SO[0], SO[1], SO[0] + (ex - SO[0]) * cOn, SO[1]); sY.set(ex, SO[1], ex, SO[1] + (ey - SO[1]) * cOn);
    attr(sDx, 'x1', SO[0]); attr(sDx, 'y1', ey); attr(sDx, 'x2', ex); attr(sDx, 'y2', ey); attr(sDy, 'x1', ex); attr(sDy, 'y1', SO[1]); attr(sDy, 'x2', ex); attr(sDy, 'y2', ey);
    sDx.style.opacity = sDy.style.opacity = aOn * (t > wt('S3', 'along') ? 1 : 0);
    const AxV = AU * cs(th), AyV = AU * sn(th);
    labNear(sAL, SO[0] + (SL * 0.55) * cs(th) * aOn - (sn(th) * 30) - 10, SO[1] - (SL * 0.55) * sn(th) * aOn - cs(th) * 30 + 10); op(sAL, aOn);
    labNear(sXL, SO[0] + (ex - SO[0]) / 2 - 16, SO[1] + (AyV >= 0 ? 40 : -16)); op(sXL, Math.abs(AxV) > 1.2 ? cOn : 0);
    labNear(sYL, ex + (AxV >= 0 ? 14 : -56), SO[1] + (ey - SO[1]) / 2 + 10); op(sYL, Math.abs(AyV) > 1.2 ? cOn : 0);
    attr(sArc, 'd', th > 2 && aOn > 0.9 ? arcP(SO, 46, 0, Math.min(th, 359.5)) : ''); labNear(sTh, SO[0] + 60 * cs(Math.min(th, 359) / 2) - 8, SO[1] - 60 * sn(Math.min(th, 359) / 2) + 10); op(sTh, th > 12 ? 1 : 0);
    // ghost arrows at 30, 60, 90 deg while it turns
    [30, 60, 90].forEach((g, k) => { attr(sGh[k], 'x2', (SO[0] + SL * cs(g)).toFixed(1)); attr(sGh[k], 'y2', (SO[1] - SL * sn(g)).toFixed(1)); sGh[k].style.opacity = th > g + 6 && t < T0('S6') ? [0.12, 0.2, 0.3][k] : 0; });
    M.vis($('#slow'), t, tSlow, tSlow + SLOW, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    M.setT($('#rt'), th.toFixed(0)); M.setT($('#ra'), (AU * aOn).toFixed(1)); M.setT($('#rx'), (Math.abs(AxV) < 0.05 ? 0 : AxV).toFixed(1)); M.setT($('#ry'), (Math.abs(AyV) < 0.05 ? 0 : AyV).toFixed(1));
    const gOn = t > tTurn - 0.3;
    gX(a => [a, AU * cs(a)], 0, th); gY(a => [a, AU * sn(a)], 0, th); gXd(th, AxV, gOn); gYd(th, AyV, gOn);
    labNear(gxl, G.X(th) + 14, G.Y(AxV) + (AxV < AyV ? 26 : -8)); labNear(gyl, G.X(th) + 14, G.Y(AyV) + (AyV <= AxV ? 26 : -8)); op(gxl, gOn ? 1 : 0); op(gyl, gOn ? 1 : 0);
    avA(t, wt('S7', 'waves') + 0.3, out);
  }

  /* D: rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    grow(dAr, DO[0], DO[1], dt[0], dt[1], M.io((t - tD1 - 0.6) / 0.6)); op(dAL, (t - tD1 - 1.0) / 0.25);
    grow(dX, DO[0], DO[1], dt[0], DO[1], M.io((t - wt('D2', 'parts')) / 0.5)); grow(dY, dt[0], DO[1], dt[0], dt[1], M.io((t - wt('D2', 'parts') - 0.3) / 0.5));
    op(dTri, 0.6 * M.clamp((t - wt('D2', 'triangle')) / 0.4)); op(dSq, (t - wt('D2', 'triangle')) / 0.3);
    M.draw(dArc, t, wt('D3', 'theta') - 0.1, 0.4); op(dTh, (t - wt('D3', 'theta')) / 0.25);
    op(dHx, 0.3 * M.clamp((t - wt('D3', 'next')) / 0.2) * (1 - M.clamp((t - T0('D4')) / 0.2)) + 0.3 * M.clamp((t - wt('D5', 'square')) / 0.2) * (1 - M.clamp((t - T0('D6') - 0.6) / 0.3)));
    op(dHa, 0.25 * (M.clamp((t - wt('D3', 'longest')) / 0.2) * (1 - M.clamp((t - T0('D4')) / 0.2)) + M.clamp((t - wt('D4', 'longest')) / 0.2) * (1 - M.clamp((t - T0('D5')) / 0.2))));
    op(dHy, 0.3 * M.clamp((t - wt('D4', 'opposite')) / 0.2) * (1 - M.clamp((t - T0('D5')) / 0.2)) + 0.3 * M.clamp((t - wt('D5', 'y', 0)) / 0.2) * (1 - M.clamp((t - T0('D6') - 0.6) / 0.3)));
    op(dXL, (t - wt('D3', 'So') - 0.3) / 0.25); op(dYL, (t - wt('D4', 'So') - 0.3) / 0.25);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'y') + 0.1, 0.9);
  }

  /* C: 30 vs 60 + think */
  const cOn = t >= tC1 - 0.1 && t < tG1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C5');
    CPAN.forEach((p, k) => {
      const tin = k ? T0('C3') - 0.1 : tC1 + 0.2, ta = k ? wt('C3', 'sixty') : wt('C2', 'thirty');
      M.vis($(k ? '#cb' : '#ca'), t, tin, out, { dx: k ? 60 : -60, dy: 0, ...o });
      grow(p.A, p.o[0], p.o[1], p.e[0], p.e[1], M.io((t - ta + 0.3) / 0.6)); M.draw(p.arc, t, ta, 0.4); op(p.th, (t - ta) / 0.25);
      const tx = k ? wt('C3', 'x') : wt('C2', 'x'), ty = k ? wt('C3', 'y') : wt('C2', 'y');
      grow(p.x, p.o[0], p.o[1], p.e[0], p.o[1], M.io((t - tx + 0.1) / 0.5)); grow(p.y, p.e[0], p.o[1], p.e[0], p.e[1], M.io((t - ty + 0.1) / 0.5));
      M.vis(p.pill, t, tx, 1e9, POP);
      p.pill.style.background = mix(C.soft, C.ac2, M.io((t - wt('C3', 'swap')) / 0.3));
    });
    M.vis($('#th1'), t, T0('C5') + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: T0('C5'), tOpts: wt('C5', 'What') - 0.1, tCount: T1('C5') + 0.05, dur: 3, tAns: T0('C6') - 0.02, tWhy: wt('C6', 'Cos') });
  }

  /* G: quadrants + think */
  const gOn = t >= tG1 - 0.1 && t < tV1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gq'), t, tG1 + 0.05, OUT('G4'), { dy: 36, ...o });
    QD.forEach((q, i) => {
      const ta = tQd[i], u = M.io((t - ta + 0.1) / 0.5), c = M.io((t - ta - 0.3) / 0.5);
      grow(q.A, QO[0], QO[1], q.e[0], q.e[1], u); q.x.set(QO[0], QO[1], QO[0] + (q.e[0] - QO[0]) * c, QO[1]); q.y.set(q.e[0], QO[1], q.e[0], QO[1] + (q.e[1] - QO[1]) * c);
      M.vis($('#qc' + i), t, ta + 0.2, 1e9, POP); const qn = $('#qn' + i); M.vis(qn, t, ta, 1e9, { dy: 8 }); qn.style.color = mix(C.dim, C.ink, M.io((t - ta) / 0.3));
    });
    M.vis($('#th2'), t, T0('G4') + 0.05, OUT('V1'), { dy: 36, ...o });
    th2(t, { tin: T0('G4'), tOpts: wt('G4', 'itself') - 0.1, tCount: T1('G4') + 0.05, dur: 3, tAns: T0('G5') - 0.02, tWhy: wt('G5', 'component') });
  }

  /* V: add by parts */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('W1');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis(vGh, t, tV1 + 0.4, 1e9, { dy: 8 });
    const [ax, ay] = vp(...VA), [rx, ry] = vp(VA[0] + VB[0], VA[1] + VB[1]);
    grow(vAa, VO[0], VO[1], ax, ay, M.io((t - tV1 - 0.4) / 0.6)); op(vAL, (t - tV1 - 0.8) / 0.25);
    grow(vBa, ax, ay, rx, ry, M.io((t - tV1 - 0.9) / 0.6)); op(vBL, (t - tV1 - 1.3) / 0.25);
    grow(vRx, VO[0], VO[1], rx, VO[1], M.io((t - wt('V2', 'x')) / 0.6)); op(vXl, (t - wt('V2', 'x') - 0.4) / 0.25);
    grow(vRy, rx, VO[1], rx, ry, M.io((t - wt('V2', 'y')) / 0.6)); op(vYl, (t - wt('V2', 'y') - 0.4) / 0.25);
    grow(vRa, VO[0], VO[1], rx, ry, M.io((t - T0('V3')) / 0.6)); op(vRL, (t - T0('V3') - 0.4) / 0.25);
    M.vis($('#vr'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#vf0'), t, wt('V2', 'add'), 0.7); PUC.write($('#vf1'), t, wt('V2', 'x'), 0.7); PUC.write($('#vf2'), t, wt('V2', 'y'), 0.7);
    M.vis($('#vP'), t, wt('V3', 'drawing') - 0.1, 1e9, POP);
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
