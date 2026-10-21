// PUC Physics Ep 38: Position and Displacement Vectors (Motion notebook, college ground)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const RC = C.ink, DC = C.ac, XC = C.ac, YC = C.violet;       // colour-coding (canon): position r ink, displacement Δr blue, x part blue, y part violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, s, col, fs = 30) => txt(p, 0, 0, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col });
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vr = (s, c = RC) => `\\textcolor{${c}}{\\vec{${s}}}`;           // coloured vector symbol
const R1 = `\\textcolor{${RC}}{\\vec r_1}`, R2 = `\\textcolor{${RC}}{\\vec r_2}`, DR = `\\textcolor{${DC}}{\\Delta\\vec r}`;
const IH = '\\hat{i}', JH = '\\hat{j}', KH = '\\hat{k}';

Object.assign(M.IC, {
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  seat: ['M7 18v-6a5 5 0 0 1 10 0v6', 'M5 21v-3h14v3', 'M5 18v-4', 'M19 18v-4'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- ground geometry (metres -> px), shared by P, S, D ---------- */
const GO = [100, 510], GS = 7;                               // origin (gate) and 8 px per metre
const gx = x => GO[0] + x * GS, gy = y => GO[1] - y * GS;
const PP = [20, 10], QQ = [50, 50];
const grid = (s, o, sc, nx, ny, step, lab = true, xl = 'x (east)', yl = 'y (north)') => {
  const g = mk(s, 'g', {});
  for (let i = 0; i <= nx; i += step) mk(g, 'line', { x1: o[0] + i * sc, y1: o[1], x2: o[0] + i * sc, y2: o[1] - ny * sc, stroke: C.grid || '#E9E5DA', 'stroke-width': 1.5 });
  for (let j = 0; j <= ny; j += step) mk(g, 'line', { x1: o[0], y1: o[1] - j * sc, x2: o[0] + nx * sc, y2: o[1] - j * sc, stroke: '#E9E5DA', 'stroke-width': 1.5 });
  const ax = mk(g, 'path', { d: `M${o[0]},${o[1] - ny * sc - 10} V${o[1]} H${o[0] + nx * sc + 10}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
  if (lab) { txt(g, o[0] + nx * sc + 10, o[1] + 30, xl, { 'text-anchor': 'end' }); txt(g, o[0] + 12, o[1] - ny * sc - 2, yl); }
  return { g, ax };
};
const bike = (s, col = C.ink) => {
  const og = mk(s, 'g', {}), g = mk(og, 'g', {});
  mk(g, 'circle', { cx: -14, cy: 0, r: 10, fill: '#fff', stroke: col, 'stroke-width': 3 });
  mk(g, 'circle', { cx: 14, cy: 0, r: 10, fill: '#fff', stroke: col, 'stroke-width': 3 });
  mk(g, 'path', { d: 'M-14,0 L-4,-14 L10,-14 L14,0 M-4,-14 L0,0 L10,-14 M-7,-19 L-1,-19 M10,-14 L8,-21 L13,-21', fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  og.at = (x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${(y - 4).toFixed(1)})`);
  return og;
};
const dotL = (s, x, y, lab, col = C.ink, dx = 14, dy = -14) => { const g = mk(s, 'g', { class: 'pv' }); mk(g, 'circle', { cx: x, cy: y, r: 8, fill: col }); txt(g, x + dx, y + dy, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: col }); return g; };

/* ---------- title card: three ways to say "where" ---------- */
const JOBS = [['pin', 'Map pin', 'WHERE IS THE SHOP?', '2 km NE', 'pin'], ['seat', 'Exam seat', 'WHERE DO I SIT?', 'Row 4, Seat 7', 'seat'], ['map', 'Treasure map', 'WHERE IS IT BURIED?', '10 E, 5 N', 'treasure']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[4]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv">${v}</div></div>`).join('');
const TILES = [['ruler', 'How far?'], ['compass', 'Which way?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, RC, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'far'), wt('H4', 'which')];

/* ---------- P: the position vector on the ground ---------- */
const pS = $('#pgS');
const pG = grid(pS, GO, GS, 80, 55, 10);
const pO = dotL(pS, GO[0], GO[1], 'O', C.ink, -34, 30);
const pGate = txt(pS, GO[0] + 14, GO[1] + 30, 'GATE', { 'font-size': 16, 'letter-spacing': 2 });
const pB = bike(pS); pB.at(gx(PP[0]), gy(PP[1]));
const pA = PUC.arrow(pS, RC, 6, 18), pAL = sym(pS, 'r', RC, 34);
const pXd = mk(pS, 'path', { d: `M${gx(0)},${gy(PP[1])} H${gx(PP[0])} V${gy(0)}`, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const pXl = txt(pS, gx(PP[0]), gy(0) + 30, '20', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600 }), pYl = txt(pS, gx(0) - 10, gy(PP[1]) + 6, '10', { 'text-anchor': 'end', fill: YC, 'font-weight': 600 });
const pArc = mk(pS, 'path', { d: (() => { const R = 70, a = Math.atan2(PP[1], PP[0]); return `M${GO[0] + R},${GO[1]} A${R},${R} 0 0 0 ${(GO[0] + R * Math.cos(a)).toFixed(1)},${(GO[1] - R * Math.sin(a)).toFixed(1)}`; })(), fill: 'none', stroke: RC, 'stroke-width': 2.5 });
$('#an0I').innerHTML = M.icon('ruler', 28, RC, 2.2); $('#an1I').innerHTML = M.icon('compass', 28, RC, 2.2);
$('#an0V').innerHTML = `<span style="color:${RC}">22.4</span> <span style="font-size:22px;color:var(--mute)">m</span>`;
$('#an1V').innerHTML = `<span style="color:${RC}">26.6°</span> <span style="font-size:22px;color:var(--mute)">N of E</span>`;
$('#pf0').innerHTML = K(`${vr('r')} = \\textcolor{${XC}}{x}\\,${IH} + \\textcolor{${YC}}{y}\\,${JH}`);
$('#pf1').innerHTML = K(`${vr('r')} = (\\textcolor{${XC}}{20}\\,${IH} + \\textcolor{${YC}}{10}\\,${JH})\\,\\text{m}`);

/* ---------- S: the ride (sim + readout + graph) ---------- */
const s = $('#simS');
grid(s, GO, GS, 80, 55, 10);
dotL(s, GO[0], GO[1], 'O', C.ink, -34, 30); txt(s, GO[0] + 14, GO[1] + 30, 'GATE', { 'font-size': 16, 'letter-spacing': 2 });
const RIDE = 10;                                                     // ride lasts 10 s of sim time
const pos = u => { const k = M.clamp(u / RIDE); return [PP[0] + 30 * k, PP[1] + 40 * (2 * k - k * k)]; };
let pathD = ''; for (let i = 0; i <= 60; i++) { const [x, y] = pos(RIDE * i / 60); pathD += (i ? 'L' : 'M') + gx(x).toFixed(1) + ',' + gy(y).toFixed(1); }
const sPath = mk(s, 'path', { d: '', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' });
const ghR = [7.5, 5, 2.5].map(() => mk(s, 'line', { stroke: RC, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 }));
const ghB = [0, 1, 2].map(() => bike(s, C.ink));
const sR1 = PUC.arrow(s, RC, 4, 14); const sR1L = sym(s, 'r₁', RC, 26);
const sD = PUC.arrow(s, DC, 7, 20), sDL = sym(s, 'Δr', DC, 32);
const sA = PUC.arrow(s, RC, 6, 18), sAL = sym(s, 'r', RC, 32);
const sP = dotL(s, gx(PP[0]), gy(PP[1]), 'P', C.ink, 18, 30), sQ = dotL(s, gx(QQ[0]), gy(QQ[1]), 'Q', C.ink, 16, -12);
const sB = bike(s);
const RO = [['x', XC, 'rx', 'm'], ['y', YC, 'ry', 'm'], ['|r|', RC, 'rr', 'm'], ['θ', RC, 'rt', '°']];
$('#roG').innerHTML = RO.map(([k, c, id, u]) => `<span class="k" style="color:${c}">${k}</span><span class="v" id="${id}" style="color:${c}">0.0</span><span class="u">${u}</span>`).join('');
const G = PUC.graph($('#grS'), { x: 90, y: 74, w: 600, h: 140, xmax: 10, ymin: 0, ymax: 60, xt: [0, 5, 10], yt: [0, 30, 60], xl: 't (s)', yl: 'metres' });
const gX = G.curve(XC), gY = G.curve(YC), gXd = G.dot(XC, 10), gYd = G.dot(YC, 10);
const gxl = txt($('#grS'), 712, 0, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: XC }), gyl = txt($('#grS'), 712, 0, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: YC });
const gGh = document.createElement('div'); gGh.className = 'ghost'; gGh.style.cssText = 'right:36px;top:18px'; gGh.textContent = 'EXAMPLE FIGURES'; $('#gr').appendChild(gGh);
const tGo = wt('S3', 'As') - 0.1, tEnd = T0('S6') - 0.25, tSlow = T0('S5') + 0.1, SLOW = Math.max(1.5, T1('S5') - T0('S5') - 0.3);
const kU = RIDE / (tEnd - tGo - 0.75 * SLOW);
const simU = t => M.clamp(kU * (t - tGo - 0.75 * M.clamp(t - tSlow, 0, SLOW)), 0, RIDE);
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 184, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The road curved. The arrow did not!' });

/* ---------- D: derivation + vector triangle ---------- */
const STEPS = [[`${R1} = \\overrightarrow{OP},\\;\\; ${R2} = \\overrightarrow{OQ}`, 'start position, end position'],
  [`${R1} + ${DR} = ${R2}`, 'O to P, then P to Q: you reach Q'],
  [`${DR} = ${R2} - ${R1}`, 'final position minus initial position'],
  [`${DR} = \\textcolor{${XC}}{\\Delta x}\\,${IH} + \\textcolor{${YC}}{\\Delta y}\\,${JH}`, 'Δx = x<sub>2</sub> - x<sub>1</sub>, &nbsp;Δy = y<sub>2</sub> - y<sub>1</sub>']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'position'), wt('D3', 'So'), wt('D4', 'Delta'), wt('D5', 'In')];
const dS = $('#drS');
grid(dS, GO, GS, 80, 55, 10, false);
dotL(dS, GO[0], GO[1], 'O', C.ink, -34, 30);
const dR1 = PUC.arrow(dS, RC, 5, 16), dR2 = PUC.arrow(dS, RC, 5, 16), dDr = PUC.arrow(dS, DC, 7, 20);
const dR1L = sym(dS, 'r₁', RC, 28), dR2L = sym(dS, 'r₂', RC, 28), dDL = sym(dS, 'Δr', DC, 32);

const labAt0 = (el, x1, y1, x2, y2, off, f = 0.5) => { const mx = x1 + (x2 - x1) * f, my = y1 + (y2 - y1) * f, L = Math.hypot(x2 - x1, y2 - y1) || 1; attr(el, 'x', (mx - (y2 - y1) / L * off - 12).toFixed(1)); attr(el, 'y', (my + (x2 - x1) / L * off + 10).toFixed(1)); };
labAt0(dR1L, GO[0], GO[1], gx(PP[0]), gy(PP[1]), 28, 0.6); labAt0(dR2L, GO[0], GO[1], gx(QQ[0]), gy(QQ[1]), -30, 0.55); labAt0(dDL, gx(PP[0]), gy(PP[1]), gx(QQ[0]), gy(QQ[1]), -30, 0.5);
const dP = dotL(dS, gx(PP[0]), gy(PP[1]), 'P', C.ink, 10, 32), dQ = dotL(dS, gx(QQ[0]), gy(QQ[1]), 'Q', C.ink, 16, -12);
const dDx = PUC.arrow(dS, XC, 4, 14), dDy = PUC.arrow(dS, YC, 4, 14);
const dDxL = txt(dS, (gx(PP[0]) + gx(QQ[0])) / 2, gy(PP[1]) + 34, 'Δx = 30 m', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 22 });
const dDyL = txt(dS, gx(QQ[0]) + 16, (gy(PP[1]) + gy(QQ[1])) / 2 + 8, 'Δy = 40 m', { fill: YC, 'font-weight': 600, 'font-size': 22 });
const dTrav = mk(dS, 'circle', { r: 10, fill: C.ink, cx: -50, cy: -50 });
const dEx = document.createElement('div'); dEx.className = 'ghost'; dEx.style.cssText = 'right:36px;top:18px'; dEx.textContent = 'EXAMPLE FIGURES'; $('#dr').appendChild(dEx);
$('#stF').innerHTML = K(`${DR} = ${R2} - ${R1}`);

/* ---------- R: move the origin ---------- */
const RO2 = [100, 470], RS = 6.6, CAN = [60, 5];
const rx = x => RO2[0] + x * RS, ry = y => RO2[1] - y * RS;
const RPAN = [$('#raS'), $('#rbS')].map((sv, k) => {
  const o = k ? [rx(CAN[0]), ry(CAN[1])] : RO2;
  const g = grid(sv, RO2, RS, 80, 55, 10, false);
  const oG = mk(sv, 'g', {});                                       // the chosen origin: axes through it
  if (k) { mk(oG, 'line', { x1: 40, y1: o[1], x2: 744, y2: o[1], stroke: C.ink, 'stroke-width': 2.5 }); mk(oG, 'line', { x1: o[0], y1: 80, x2: o[0], y2: 520, stroke: C.ink, 'stroke-width': 2.5 }); g.ax.setAttribute('stroke', C.dim); g.ax.setAttribute('stroke-width', 1.5); }
  const gate = dotL(sv, RO2[0], RO2[1], k ? '' : 'O', k ? C.dim : C.ink, -34, 30); txt(sv, RO2[0] + 14, RO2[1] + 30, 'GATE', { 'font-size': 16, 'letter-spacing': 2, fill: k ? C.dim : C.mute });
  let can = null, canT = null, ex = null;
  if (k) { can = dotL(sv, o[0], o[1], 'O', C.ink, 14, 34); canT = txt(sv, o[0] + 44, o[1] + 34, 'CANTEEN', { 'font-size': 16, 'letter-spacing': 2 }); ex = mk(sv, 'path', { d: `M${o[0]},${o[1]} L${RO2[0] + 14},${RO2[1] - 1}`, stroke: C.mute, 'stroke-width': 3, 'stroke-dasharray': '8 7', fill: 'none' }); }
  const a1 = PUC.arrow(sv, RC, 5, 16), a2 = PUC.arrow(sv, RC, 5, 16), ad = PUC.arrow(sv, DC, 7, 20);
  const l1 = sym(sv, 'r₁', RC, 26), l2 = sym(sv, 'r₂', RC, 26), ld = sym(sv, 'Δr', DC, 30);
  dotL(sv, rx(PP[0]), ry(PP[1]), 'P', C.ink, -10, 34); dotL(sv, rx(QQ[0]), ry(QQ[1]), 'Q', C.ink, 16, -12);
  return { o, a1, a2, ad, l1, l2, ld, can, canT, ex, oG };
});
$('#raP').innerHTML = `<span id="raP0">${K(`${R1} = 20${IH} + 10${JH},\\;\\; ${R2} = 50${IH} + 50${JH}`)}</span>`;
$('#rbP').innerHTML = `<span id="rbP0">${K(`${R1} = \\text{-}40${IH} + 5${JH},\\;\\; ${R2} = \\text{-}10${IH} + 45${JH}`)}</span>`;
const DRP = K(`${DR} = (30${IH} + 40${JH})\\,\\text{m}`);
const th1 = PUC.think($('#th1'), { q: 'The origin moves to the canteen. Does the displacement Δr change?', opts: ['It changes', 'It stays the same'], right: 1, why: 'Both arrows gain the same extra piece, so it cancels in r₂ - r₁.' });

/* ---------- K: side by side + think ---------- */
const kS = $('#kpS');
const kO = dotL(kS, 110, 360, 'O', C.ink, -34, 30), kO2 = dotL(kS, 440, 380, 'O′', C.mute, 14, 34);
const kObj = bike(kS); kObj.at(560, 140);
const kA = PUC.arrow(kS, RC, 6, 18), kA2 = PUC.arrow(kS, RC, 4, 14);
const kAL = sym(kS, 'r', RC, 32), kA2L = sym(kS, 'r′', RC, 28);
attr(kAL, 'x', 290); attr(kAL, 'y', 230); attr(kA2L, 'x', 520); attr(kA2L, 'y', 290);
kA2.g.setAttribute('stroke-dasharray', '9 7'); kA2.g.querySelector('path').setAttribute('stroke-dasharray', '9 7');
const dk = $('#kdS');
const kPath = mk(dk, 'path', { d: 'M110,330 C160,110 300,90 330,220 S470,380 560,260 S640,100 660,150', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' });
dotL(dk, 110, 330, 'start', C.ink, -30, 36); dotL(dk, 660, 150, 'end', C.ink, -10, -18);
const kD = PUC.arrow(dk, DC, 7, 20), kDL = sym(dk, 'Δr', DC, 32); attr(kDL, 'x', 390); attr(kDL, 'y', 290);
const kPl = txt(dk, 214, 112, 'path: ignored', { 'font-size': 18, fill: C.mute });
const th2 = PUC.think($('#th2'), { q: 'Aarav rides a full loop and parks exactly where he started. His displacement?', opts: ['Zero', 'The length of the loop'], right: 0, why: 'Same start and end, so Δr = r₂ - r₁ = 0. The loop is distance.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${XC}}{\\Delta x} = 6 - 1 = \\textcolor{${XC}}{5}\\,\\text{m}`)],
  [K(`\\textcolor{${YC}}{\\Delta y} = 14 - 2 = \\textcolor{${YC}}{12}\\,\\text{m}`)],
  [K(`${DR} = (\\textcolor{${XC}}{5}\\,${IH} + \\textcolor{${YC}}{12}\\,${JH})\\,\\text{m}`)],
  [K(`|${DR}| = \\sqrt{5^2 + 12^2} = \\sqrt{169} = \\textcolor{${DC}}{13}\\,\\text{m}`)],
  [K(`\\tan\\theta = \\tfrac{12}{5} \\;\\Rightarrow\\; \\theta \\approx 67^\\circ`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 80 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [150, 520], WS = 30, WA = [1, 2], WB = [6, 14];
const wx = x => WO[0] + x * WS, wy = y => WO[1] - y * WS;
grid(w, WO, WS, 14, 14, 2, false);
for (let i = 2; i <= 14; i += 2) { txt(w, WO[0] - 12, wy(i) + 6, i, { 'text-anchor': 'end' }); if (i <= 12) txt(w, wx(i), WO[1] + 28, i, { 'text-anchor': 'middle' }); }
txt(w, wx(14.6), WO[1] + 28, 'x (m)'); txt(w, WO[0] + 14, wy(14) + 6, 'y (m)');
const wDx = PUC.arrow(w, XC, 5, 16), wDy = PUC.arrow(w, YC, 5, 16), wDr = PUC.arrow(w, DC, 7, 20);
const wDxL = txt(w, (wx(1) + wx(6)) / 2, wy(2) + 34, '5 m', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 24 });
const wDyL = txt(w, wx(6) + 16, (wy(2) + wy(14)) / 2 + 8, '12 m', { fill: YC, 'font-weight': 600, 'font-size': 24 });
const wDrL = txt(w, wx(3.1), wy(8.6), '13 m', { 'text-anchor': 'end', fill: DC, 'font-weight': 700, 'font-size': 26 });
const wArc = mk(w, 'path', { d: (() => { const R = 64, a = Math.atan2(12, 5); return `M${wx(1) + R},${wy(2)} A${R},${R} 0 0 0 ${(wx(1) + R * Math.cos(a)).toFixed(1)},${(wy(2) - R * Math.sin(a)).toFixed(1)}`; })(), fill: 'none', stroke: DC, 'stroke-width': 3 });
const wArcL = txt(w, wx(1) + 66, wy(2) - 30, '67°', { fill: DC, 'font-weight': 600, 'font-size': 22 });
const wA = dotL(w, wx(1), wy(2), 'A', C.ink, -34, 8), wB = dotL(w, wx(6), wy(14), 'B', C.ink, 16, -10);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${DR} = ${R1} - ${R2}`) + '&nbsp; (points backwards)', right: K(`${DR} = ${R2} - ${R1}`) + '&nbsp; (final minus initial)' });
const tp = $('#tpS');
dotL(tp, 90, 210, 'start', C.ink, -30, 40); dotL(tp, 420, 70, 'end', C.ink, 14, -12);
const tpW = PUC.arrow(tp, C.red, 6, 18), tpR = PUC.arrow(tp, DC, 7, 20);
const tpX = mk(tp, 'path', { d: 'M226,108 l34,34 M260,108 l-34,34', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const where = PUC.where($('#wa'), { on: [], type: 'Quick calculation: two position vectors in î, ĵ, k̂ form; find Δr and its size' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `A particle moves from ${K(`\\vec r_1 = (${IH} + 2${JH} - 2${KH})\\,\\text{m}`)} to ${K(`\\vec r_2 = (3${IH} - 4${JH} + ${KH})\\,\\text{m}`)} along a curved path 10 m long. The magnitude of its displacement is`,
  opts: ['10 m', '11 m', '7 m', '2.1 m'], right: 2, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [
  [K(`${DR} = ${R2} - ${R1}`)],
  [K(`= 2${IH} - 6${JH} + 3${KH}`)],
  [K(`|${DR}| = \\sqrt{4 + 36 + 9}`)],
  [K(`= \\sqrt{49} = 7\\,\\text{m}`)],
  ['<b style="color:var(--red)">10, 11, 2.1</b>: traps']], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Delta'), wt('A2', 'two', 1), wt('A3', 'Its'), wt('A3', 'Seven') - 0.3, T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · position and displacement', y0: 100, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`${vr('r')} = \\textcolor{${XC}}{x}\\,${IH} + \\textcolor{${YC}}{y}\\,${JH} \\quad \\text{(from origin O)}`),
    K(`${DR} = ${R2} - ${R1} = \\textcolor{${XC}}{\\Delta x}\\,${IH} + \\textcolor{${YC}}{\\Delta y}\\,${JH}`),
    '<b>Position</b> depends on the origin. <b>Displacement</b> does not.', '<b>Displacement</b>: straight from start to end, not the path'] });
const YQ = ['Why do we need an origin before we write a position vector?', 'Why does moving the origin not change the displacement?', 'Can displacement be zero when distance is not? Example?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 39', topic: 'One arrow hides two: Vector Components in Two Dimensions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.1, 1.06, 560, 520], [tSlow + SLOW + 0.2, 1, 960, 540]]);
const labAt = (el, x1, y1, x2, y2, off = 26, f = 0.5) => { const mx = x1 + (x2 - x1) * f, my = y1 + (y2 - y1) * f, L = Math.hypot(x2 - x1, y2 - y1) || 1; attr(el, 'x', (mx - (y2 - y1) / L * off - 12).toFixed(1)); attr(el, 'y', (my + (x2 - x1) / L * off + 10).toFixed(1)); };
const grow = (a, x1, y1, x2, y2, u) => a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }

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
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const on = M.io((t - wt('H2', 'one') + 0.1) / 0.3); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#hjP'), t, wt('H2', 'Where') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hbub'), t, wt('H4', 'over') - 0.15, 1e9, { dx: -16, dy: 0, sp: M.SOFT });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - wt('H5', 'one')) / 0.3)); });
  }

  /* P: position vector */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pg'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exP'), t, T0('P6') - 0.1, 1e9, { dy: 8 });
    M.vis(pO, t, wt('P2', 'origin') - 0.1, 1e9, POP); M.vis(pGate, t, wt('P2', 'gate') - 0.1, 1e9, { dy: 8 });
    M.draw(pG.ax, t, wt('P3', 'axes') - 0.1, 0.8); M.vis(pG.g, t, wt('P3', 'axes') - 0.2, 1e9, { dy: 0, fade: 0.4 });
    M.vis(pB, t, wt('P4', 'bicycle') - 0.3, 1e9, { dy: -20 });
    const u = M.io((t - wt('P4', 'arrow')) / 0.7); grow(pA, GO[0], GO[1], gx(PP[0]), gy(PP[1]), u);
    labAt(pAL, GO[0], GO[1], gx(PP[0]), gy(PP[1]), 28); pAL.style.opacity = M.clamp((t - wt('P4', 'vector')) / 0.25);
    M.draw(pArc, t, wt('P5', 'direction'), 0.5);
    M.draw(pXd, t, T0('P6') + 0.2, 0.7); pXl.style.opacity = M.clamp((t - wt('P6', 'twenty')) / 0.25); pYl.style.opacity = M.clamp((t - wt('P6', 'ten')) / 0.25);
    M.vis($('#pr'), t, wt('P4', 'position') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#an0'), t, wt('P5', 'length') - 0.1, 1e9, { dy: 16 }); M.vis($('#an1'), t, wt('P5', 'direction') - 0.1, 1e9, { dy: 16 });
    M.vis($('#an0V'), t, wt('P5', 'far'), 1e9, POP); M.vis($('#an1V'), t, wt('P5', 'way'), 1e9, POP);
    M.vis($('#prL'), t, T0('P6'), 1e9, { dy: 8 });
    PUC.write($('#pf0'), t, wt('P6', 'r'), 0.8); PUC.write($('#pf1'), t, wt('P6', 'Here'), 0.8);
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const u = simU(t), [x, y] = pos(u), bx = gx(x), by = gy(y);
    sB.at(bx, by); M.vis(sB, t, tS1 + 0.5, 1e9, { dy: -16 });
    M.vis(sP, t, wt('S2', 'P') - 0.1, 1e9, POP);
    // r1 stays as a thin arrow once the ride starts
    const r1u = M.io((t - wt('S2', 'twenty')) / 0.6); sR1.set(GO[0], GO[1], GO[0] + (gx(PP[0]) - GO[0]) * r1u, GO[1] + (gy(PP[1]) - GO[1]) * r1u);
    labAt(sR1L, GO[0], GO[1], gx(PP[0]), gy(PP[1]), 26, 0.55); sR1L.style.opacity = (r1u * M.clamp((t - tGo) / 0.3)).toFixed(3);
    // live position arrow (re-grows during the slow-mo)
    const slowOn = t >= tSlow && t < tSlow + SLOW, re = slowOn ? M.io((t - tSlow - 0.2) / 0.8) : 1;
    const live = M.clamp((t - tGo) / 0.3);
    if (live > 0) { sA.set(GO[0], GO[1], GO[0] + (bx - GO[0]) * re, GO[1] + (by - GO[1]) * re); labAt(sAL, GO[0], GO[1], bx, by, -28, 0.6); sAL.style.opacity = (live * re).toFixed(3); } else { sA.set(0, 0, 0, 0); sAL.style.opacity = 0; }
    { const k = M.clamp(u / RIDE); M.hide(sPath, u <= 0.01); attr(sPath, 'd', (() => { let d = ''; const n = Math.max(1, Math.round(60 * k)); for (let i = 0; i <= n; i++) { const [px, py] = pos(RIDE * k * i / n); d += (i ? 'L' : 'M') + gx(px).toFixed(1) + ',' + gy(py).toFixed(1); } return d; })()); }
    // ghost arrows + ghost bikes at fixed moments of the ride
    [7.5, 5, 2.5].forEach((gt, k) => { const [ax, ay] = pos(gt), on = u >= gt + 0.4 && t < T0('S7'); attr(ghR[k], 'x1', GO[0]); attr(ghR[k], 'y1', GO[1]); attr(ghR[k], 'x2', gx(ax).toFixed(1)); attr(ghR[k], 'y2', gy(ay).toFixed(1)); ghR[k].style.opacity = on ? [0.3, 0.2, 0.12][k] : 0; ghB[k].at(gx(ax), gy(ay)); ghB[k].style.opacity = on ? [0.3, 0.2, 0.12][k] : 0; });
    M.vis($('#slow'), t, tSlow, tSlow + SLOW + 0.2, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    M.vis(sQ, t, wt('S6', 'Q') - 0.1, 1e9, POP);
    const du = M.io((t - wt('S7', 'Draw')) / 0.7); grow(sD, gx(PP[0]), gy(PP[1]), gx(QQ[0]), gy(QQ[1]), du);
    labAt(sDL, gx(PP[0]), gy(PP[1]), gx(QQ[0]), gy(QQ[1]), 30, 0.5); sDL.style.opacity = M.clamp((t - wt('S7', 'displacement')) / 0.25);
    // readout + graph follow the bike every frame
    M.setT($('#rx'), x.toFixed(1)); M.setT($('#ry'), y.toFixed(1)); M.setT($('#rr'), Math.hypot(x, y).toFixed(1)); M.setT($('#rt'), (Math.atan2(y, x) * 180 / Math.PI).toFixed(1));
    gX(k2 => [k2, pos(k2)[0]], 0, u); gY(k2 => [k2, pos(k2)[1]], 0, u); gXd(u, x, t > tGo - 0.3); gYd(u, y, t > tGo - 0.3);
    attr(gxl, 'y', (G.Y(x) + 8).toFixed(1)); attr(gyl, 'y', (G.Y(y) + 8).toFixed(1)); attr(gxl, 'x', (G.X(u) + 18).toFixed(1)); attr(gyl, 'x', (G.X(u) + 18).toFixed(1));
    gxl.style.opacity = gyl.style.opacity = t > tGo - 0.3 ? 1 : 0;
    M.vis(gGh, t, tS1 + 0.8, 1e9, { dy: 8 });
    avA(t, wt('S8', 'straight') + 0.2, out);
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.vis(dP, t, tD1 + 0.6, 1e9, POP); M.vis(dQ, t, tD1 + 0.75, 1e9, POP); M.vis(dEx, t, tD1 + 0.8, 1e9, { dy: 8 });
    grow(dR1, GO[0], GO[1], gx(PP[0]), gy(PP[1]), M.io((t - wt('D2', 'start')) / 0.6)); dR1L.style.opacity = M.clamp((t - wt('D2', 'start') - 0.4) / 0.25);
    grow(dR2, GO[0], GO[1], gx(QQ[0]), gy(QQ[1]), M.io((t - wt('D2', 'end')) / 0.6)); dR2L.style.opacity = M.clamp((t - wt('D2', 'end') - 0.4) / 0.25);
    grow(dDr, gx(PP[0]), gy(PP[1]), gx(QQ[0]), gy(QQ[1]), M.io((t - wt('D3', 'P', 1)) / 0.6)); dDL.style.opacity = M.clamp((t - wt('D3', 'P', 1) - 0.4) / 0.25);
    // a dot travels O -> P -> Q while step two is spoken
    const tv = (t - wt('D3', 'O')) / 2.0; M.hide(dTrav, tv <= 0 || tv >= 1.15);
    if (tv > 0 && tv < 1.15) { const k = M.clamp(tv), a = M.io(Math.min(1, k * 2)), b = M.io(Math.max(0, k * 2 - 1)); const px = k < 0.5 ? GO[0] + (gx(PP[0]) - GO[0]) * a : gx(PP[0]) + (gx(QQ[0]) - gx(PP[0])) * b, py = k < 0.5 ? GO[1] + (gy(PP[1]) - GO[1]) * a : gy(PP[1]) + (gy(QQ[1]) - gy(PP[1])) * b; attr(dTrav, 'cx', px.toFixed(1)); attr(dTrav, 'cy', py.toFixed(1)); }
    grow(dDx, gx(PP[0]), gy(PP[1]), gx(QQ[0]), gy(PP[1]), M.io((t - wt('D5', 'Delta', 1)) / 0.6)); dDxL.style.opacity = M.clamp((t - wt('D5', 'Delta', 1) - 0.3) / 0.25);
    grow(dDy, gx(QQ[0]), gy(PP[1]), gx(QQ[0]), gy(QQ[1]), M.io((t - wt('D5', 'Delta', 2)) / 0.6)); dDyL.style.opacity = M.clamp((t - wt('D5', 'Delta', 2) - 0.3) / 0.25);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Displacement') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'minus'), 0.8);
  }

  /* R: move the origin */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1'), tR7 = wt('R7', 'Thirty') - 0.2;
    RPAN.forEach((p, k) => {
      const tin = k ? T0('R2') + 0.1 : tR1 + 0.3;
      M.vis($(k ? '#rb' : '#ra'), t, tin, out, { dx: k ? 60 : -60, dy: 0, ...o });
      if (k) { M.vis(p.can, t, wt('R2', 'canteen') - 0.1, 1e9, POP); M.vis(p.canT, t, wt('R2', 'canteen'), 1e9, { dy: 8 }); M.vis(p.oG, t, wt('R2', 'canteen') + 0.2, 1e9, { dy: 0, fade: 0.4 }); }
      const ta = k ? wt('R3', 'r') : wt('R2', 'left') + 0.2, tb = k ? wt('R3', 'r', 1) : wt('R2', 'left') + 0.8;
      const P1 = [rx(PP[0]), ry(PP[1])], P2 = [rx(QQ[0]), ry(QQ[1])];
      grow(p.a1, p.o[0], p.o[1], P1[0], P1[1], M.io((t - ta) / 0.6)); grow(p.a2, p.o[0], p.o[1], P2[0], P2[1], M.io((t - tb) / 0.6));
      labAt(p.l1, p.o[0], p.o[1], P1[0], P1[1], k ? 26 : -26, 0.5); labAt(p.l2, p.o[0], p.o[1], P2[0], P2[1], k ? 26 : -26, 0.55);
      p.l1.style.opacity = M.clamp((t - ta - 0.4) / 0.25); p.l2.style.opacity = M.clamp((t - tb - 0.4) / 0.25);
      if (k) M.draw(p.ex, t, wt('R4', 'extra') - 0.1, 0.6);
      const td = wt('R5', 'cancels') + 0.2; grow(p.ad, P1[0], P1[1], P2[0], P2[1], M.io((t - td) / 0.6)); labAt(p.ld, P1[0], P1[1], P2[0], P2[1], 30, 0.5); p.ld.style.opacity = M.clamp((t - td - 0.4) / 0.25);
      const pill = $(k ? '#rbP' : '#raP'); M.vis(pill, t, k ? wt('R3', 'r', 1) + 0.5 : wt('R2', 'left') + 1.2, 1e9, POP);
      if (t >= tR7 && pill._d !== 1) { pill._d = 1; pill.innerHTML = DRP; pill.style.background = C.ac2; } else if (t < tR7 && pill._d === 1) { pill._d = 0; pill.innerHTML = k ? `<span>${K(`${R1} = \\text{-}40${IH} + 5${JH},\\;\\; ${R2} = \\text{-}10${IH} + 45${JH}`)}</span>` : `<span>${K(`${R1} = 20${IH} + 10${JH},\\;\\; ${R2} = 50${IH} + 50${JH}`)}</span>`; pill.style.background = ''; }
    });
    M.vis($('#th1'), t, T0('R6') + 0.05, tR7, { dy: 36, ...o });
    th1(t, { tin: T0('R6'), tOpts: wt('R6', 'change') - 0.1, tCount: T1('R6') + 0.05, dur: 3, tAns: T0('R7') - 0.02, tWhy: wt('R7', 'same') });
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kp'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(kO, t, wt('K1', 'origin') - 0.1, 1e9, POP); M.vis(kObj, t, wt('K1', 'object') - 0.2, 1e9, { dy: -16 });
    grow(kA, 110, 360, 548, 150, M.io((t - wt('K1', 'starts')) / 0.7)); kAL.style.opacity = M.clamp((t - wt('K1', 'object')) / 0.25);
    M.vis(kO2, t, wt('K1', 'Move') - 0.1, 1e9, POP); grow(kA2, 440, 380, 556, 158, M.io((t - wt('K1', 'changes') + 0.2) / 0.6)); kA2L.style.opacity = M.clamp((t - wt('K1', 'changes')) / 0.25);
    M.vis($('#kp0'), t, wt('K1', 'starts') + 0.2, 1e9, POP); M.vis($('#kp1'), t, wt('K1', 'changes') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(kPath, t, T0('K2') + 0.2, 1.4);
    grow(kD, 110, 330, 660, 150, M.io((t - wt('K2', 'ends')) / 0.7)); kDL.style.opacity = M.clamp((t - wt('K2', 'ends') - 0.3) / 0.25);
    kPl.style.opacity = M.clamp((t - wt('K2', 'path')) / 0.3);
    M.vis($('#kd0'), t, wt('K2', 'starts') + 0.2, 1e9, POP); M.vis($('#kd1'), t, wt('K2', 'ignores') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, T0('K3') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('K3'), tOpts: wt('K3', 'displacement') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'ended') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')]);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wA, t, wt('W2', 'A', 1) - 0.1, 1e9, POP); M.vis(wB, t, wt('W2', 'B') - 0.1, 1e9, POP);
    grow(wDx, wx(1), wy(2), wx(6), wy(2), M.io((t - T0('W3') - 0.2) / 0.6)); wDxL.style.opacity = M.clamp((t - wt('W3', 'Five')) / 0.25);
    grow(wDy, wx(6), wy(2), wx(6), wy(14), M.io((t - T0('W4') - 0.2) / 0.6)); wDyL.style.opacity = M.clamp((t - wt('W4', 'Twelve')) / 0.25);
    grow(wDr, wx(1), wy(2), wx(6), wy(14), M.io((t - T0('W5') - 0.1) / 0.6)); wDrL.style.opacity = M.clamp((t - wt('W6', 'Thirteen')) / 0.25);
    M.draw(wArc, t, T0('W7') + 0.2, 0.5); wArcL.style.opacity = M.clamp((t - wt('W7', 'sixty')) / 0.25);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'backwards') - 0.1, tRight: wt('X3', 'Always') - 0.1 });
    grow(tpW, 420, 70, 100, 204, M.io((t - wt('X2', 'write')) / 0.6)); M.draw(tpX, t, wt('X3', 'backwards'), 0.3);
    tpW.g.style.opacity = 1 - 0.6 * M.io((t - wt('X3', 'Always')) / 0.3);
    grow(tpR, 90, 210, 410, 76, M.io((t - wt('X3', 'Always')) / 0.6));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'quick') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.3, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + questions + NEXT */
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
