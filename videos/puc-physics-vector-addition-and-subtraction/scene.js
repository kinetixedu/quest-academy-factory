// PUC Physics Ep 34: Vector addition and subtraction (Motion notebook, bicycle map + angle sim)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ac, BC = C.violet, RC = C.ink, DC = C.red;          // colour-coding: A blue, B violet, resultant ink, change in velocity red
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vA = `\\textcolor{${AC}}{\\vec{A}}`, vB = `\\textcolor{${BC}}{\\vec{B}}`, vR = `\\textcolor{${RC}}{\\vec{R}}`;
const sA = `\\textcolor{${AC}}{A}`, sB = `\\textcolor{${BC}}{B}`, sR = `\\textcolor{${RC}}{R}`;

Object.assign(M.IC, {
  wave: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
  wind: ['M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2', 'M9.6 4.6A2 2 0 1 1 11 8H2', 'M12.6 19.4A2 2 0 1 0 14 16H2'],
});

/* small helpers: fade an svg node, grow an arrow, a vector label (letter + little arrow on top) */
const op = (el, t, tin, tout = 1e9, d = 0.25) => { const v = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)); M.hide(el, v <= 0.001); snap(el, 'opacity', v >= 0.999 ? '' : v.toFixed(3)); return v; };
const grow = (ar, p, t, t0, dur = 0.6) => { const u = M.o3((t - t0) / dur); ar.set(p[0], p[1], p[0] + (p[2] - p[0]) * u, p[1] + (p[3] - p[1]) * u); return u; };
const vlab = (svg, s, col, x, y, o = {}) => { const g = mk(svg, 'g', { transform: `translate(${x},${y})` });
  const tx = mk(g, 'text', { x: 0, y: 0, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': o.fs || 34, fill: col }); tx.textContent = s;
  if (!o.noArrow) { const w = (o.fs || 34) * 0.32 * (s.length > 1 ? 1.6 : 1); mk(g, 'path', { d: `M${-w},${-(o.fs || 34) * 0.92} H${w} M${w - 5},${-(o.fs || 34) * 0.92 - 4} L${w},${-(o.fs || 34) * 0.92} L${w - 5},${-(o.fs || 34) * 0.92 + 4}`, stroke: col, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); }
  if (o.sub) { const sb = mk(g, 'text', { x: (o.fs || 34) * 0.42, y: 8, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': (o.fs || 34) * 0.6, fill: col }); sb.textContent = o.sub; }
  return g; };
const moveG = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const dashL = (svg, col, a = {}) => mk(svg, 'line', Object.assign({ stroke: col, 'stroke-width': 3, 'stroke-dasharray': '8 8', 'stroke-linecap': 'round' }, a));
const arc = (svg, cx, cy, r, a0, a1, col, sw = 3) => { const p = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)]; const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return mk(svg, 'path', { d: `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${x1.toFixed(1)},${y1.toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }); };
const pol = (deg, L) => [L * Math.cos(deg * Math.PI / 180), -L * Math.sin(deg * Math.PI / 180)];

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7');
const tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tR1 = T0('R1');
const tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV5 = T0('V5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three cases ---------- */
const JOBS = [['users', 'Cart', 'TWO FRIENDS PULL', 'friends', 20], ['wave', 'River', 'SWIMMER + CURRENT', 'swimmer', 90], ['wind', 'Kite', 'WIND + STRING', 'wind', 60]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: three cases (two pulls -> one pull) + Aarav's ride ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jrS${i}" width="220" height="100"></svg></div>`).join('');
const JR = JOBS.map(([, , , , ang], i) => { const s = $('#jrS' + i), ox = 30, oy = 78, a = PUC.arrow(s, AC, 5, 13), b = PUC.arrow(s, BC, 5, 13), r = PUC.arrow(s, RC, 5, 14);
  const pa = [ox, oy, ox + 120, oy], pb0 = pol(ang, 60), pb = [ox, oy, ox + pb0[0], oy + pb0[1]], pr = [ox, oy, ox + 120 + pb0[0], oy + pb0[1]]; mk(s, 'circle', { cx: ox, cy: oy, r: 6, fill: RC }); return { a, b, r, pa, pb, pr }; });
const TILES = ['Ridden: <b>7 km</b>', 'Straight line: <b>5 km</b>', '<b>3 + 4 = 5 ?</b>'];
$('#wqs').innerHTML = TILES.map((w, i) => `<div class="wq" id="wq${i}"><span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'seven'), wt('H4', 'five'), wt('H4', 'home')];

/* ---------- P: numbers in a line, arrows head to tail ---------- */
const pq = $('#pqS'), NX = i => 70 + i * 80;
const blk = [[0, 3, '3 kg', C.ink2], [3, 4, '4 kg', C.ink2]].map(([a, n, s, col]) => { const g = mk(pq, 'g', {}); mk(g, 'rect', { x: NX(a) + 3, y: 110, width: n * 80 - 6, height: 70, rx: 10, fill: C.soft, stroke: col, 'stroke-width': 2.5 }); txt(g, NX(a) + n * 40, 155, s, { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 }); return g; });
const brace = mk(pq, 'path', { d: `M${NX(0)},196 v14 H${NX(7)} v-14`, fill: 'none', stroke: AC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const bTx = txt(pq, NX(3.5), 252, '7 kg, always', { 'text-anchor': 'middle', 'font-size': 30, fill: AC, 'font-weight': 600 });
mk(pq, 'line', { x1: NX(0) - 10, y1: 380, x2: NX(8) + 10, y2: 380, stroke: C.ink, 'stroke-width': 2.5 });
for (let i = 0; i <= 8; i++) { mk(pq, 'line', { x1: NX(i), y1: 380, x2: NX(i), y2: 392, stroke: C.ink, 'stroke-width': 2 }); txt(pq, NX(i), 420, i, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink }); }
const hop = [mk(pq, 'path', { d: `M${NX(0)},372 Q${NX(1.5)},300 ${NX(3)},372`, fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 7' }), mk(pq, 'path', { d: `M${NX(3)},372 Q${NX(5)},290 ${NX(7)},372`, fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '6 7' })];
const hdot = mk(pq, 'circle', { r: 11, fill: AC, cx: NX(0), cy: 380 });
const tNum = [wt('P2', 'Three'), wt('P2', 'four'), wt('P2', 'seven')];
const pm = $('#pmS'), PO = [110, 380], PA = [390, 380], PBv = pol(55, 230), PB = [PA[0] + PBv[0], PA[1] + PBv[1]];
const pmA = PUC.arrow(pm, AC, 7, 20), pmB = PUC.arrow(pm, BC, 7, 20), pmR = PUC.arrow(pm, RC, 7, 20);
const pmLA = vlab(pm, 'A', AC, 250, 430), pmLB = vlab(pm, 'B', BC, 540, 300), pmLR = vlab(pm, 'R', RC, 270, 250);
const pmRing = mk(pm, 'circle', { cx: PA[0], cy: PA[1], r: 18, fill: 'none', stroke: C.red, 'stroke-width': 3 });
const pmT1 = txt(pm, PA[0] + 28, PA[1] + 46, 'head to tail', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
const pmT0 = txt(pm, PO[0], PO[1] + 46, 'tail', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const pmT2 = txt(pm, PB[0] + 4, PB[1] - 20, 'head', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
$('#pmF').innerHTML = K(`${vR} = ${vA} + ${vB}`);

/* ---------- S: the ride (map) then the angle sim ---------- */
const s = $('#simS'), KM = 80, HX = 200, HY = 470;               // 80 px per km, home at (200, 470)
const ride = mk(s, 'g', {}), angG = mk(s, 'g', {});
for (let x = 40; x <= 744; x += KM) mk(ride, 'line', { x1: x, y1: 90, x2: x, y2: 540, stroke: C.soft, 'stroke-width': 2 });
for (let y = 110; y <= 540; y += KM) mk(ride, 'line', { x1: 40, y1: y, x2: 744, y2: y, stroke: C.soft, 'stroke-width': 2 });
mk(ride, 'path', { d: `M${HX},${HY} H${HX + 3 * KM} V${HY - 4 * KM}`, fill: 'none', stroke: '#E3E6EC', 'stroke-width': 26, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const home = mk(ride, 'g', { transform: `translate(${HX},${HY})` }); mk(home, 'path', { d: 'M-18,4 L0,-14 L18,4 V22 H-18 Z', fill: '#fff', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
txt(ride, HX, HY + 54, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const CX = HX + 3 * KM, CY = HY - 4 * KM;
mk(ride, 'line', { x1: CX + 30, y1: CY + 10, x2: CX + 30, y2: CY - 40, stroke: C.ink, 'stroke-width': 3 }); mk(ride, 'path', { d: `M${CX + 30},${CY - 40} L${CX + 62},${CY - 30} L${CX + 30},${CY - 20} Z`, fill: C.ac });
txt(ride, CX + 46, CY + 34, 'COLLEGE', { 'font-size': 16, 'letter-spacing': 2 });
const cmp = mk(ride, 'g', { transform: 'translate(700,470)' }); mk(cmp, 'path', { d: 'M0,26 V-26 M-8,-16 L0,-26 L8,-16', stroke: C.mute, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); txt(cmp, 0, -36, 'N', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
txt(ride, 744, 530, '1 square = 1 km', { 'text-anchor': 'end', 'font-size': 16 });
const rA = PUC.arrow(ride, AC, 7, 20), rB = PUC.arrow(ride, BC, 7, 20), rR = PUC.arrow(ride, RC, 7, 20);
const rLA = vlab(ride, 'A', AC, HX + 120, HY + 52), rLB = vlab(ride, 'B', BC, CX + 46, HY - 150), rLR = vlab(ride, 'R', RC, HX + 86, HY - 190);
const rRtx = txt(ride, HX + 150, HY - 120, '5 km', { 'font-size': 26, fill: RC, 'font-weight': 600 });
const bike = () => { const g = mk(ride, 'g', {}); mk(g, 'circle', { cx: -11, cy: 0, r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: 11, cy: 0, r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'path', { d: 'M-11,0 L-2,-12 L11,0 M-2,-12 H8', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }); return g; };
const ghostK = [0, 1, 2].map(() => bike()), bk = bike();
// live ride: east leg during S2, north leg during S3; the slow-mo replay re-runs the north leg at 0.25x during S4
const tE0 = wt('S2', 'Three'), tE1 = tE0 + 1.5, tN0 = wt('S3', 'four'), tN1 = tN0 + 1.2, tRp = wt('S4', 'Watch'), tRp1 = tRp + 4.8;
const dLive = t => t < tN0 ? 3 * M.clamp((t - tE0) / (tE1 - tE0)) : 3 + 4 * M.clamp((t - tN0) / (tN1 - tN0));
const dRide = t => (t >= tRp - 0.4 && t < tS5) ? (t < tRp ? 7 : 3 + 4 * M.clamp((t - tRp) / (tRp1 - tRp))) : dLive(t);
const posAt = d => d <= 3 ? [HX + d * KM, HY] : [CX, HY - (d - 3) * KM];
// angle mode: A fixed along x, B (4) at angle theta from A's head
const AO = [150, 430], AU = 80, AH = [AO[0] + 3 * AU, AO[1]];
const aA = PUC.arrow(angG, AC, 7, 20), aG = [0, 1, 2].map(() => PUC.arrow(angG, BC, 5, 16)), aB = PUC.arrow(angG, BC, 7, 20), aR = PUC.arrow(angG, RC, 7, 20);
mk(angG, 'circle', { cx: AO[0], cy: AO[1], r: 7, fill: RC });
const aLA = vlab(angG, 'A', AC, AO[0] + 120, AO[1] + 52), aLB = vlab(angG, 'B', BC, 0, 0), aLR = vlab(angG, 'R', RC, 0, 0);
const aArc = mk(angG, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }), aTh = txt(angG, 0, 0, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: C.ink2, 'font-weight': 600 });
dashL(angG, C.dim, { x1: AH[0], y1: AH[1], x2: AH[0] + 330, y2: AH[1], 'stroke-width': 2 });
const tSame = wt('S6', 'Same'), tRight = wt('S6', 'right'), tOpp = wt('S6', 'Opposite'), tNev = wt('S7', 'between');
const thF = M.keys([[0, 90], [tSame - 0.3, 0], [tRight - 0.3, 90], [tOpp - 0.3, 180], [tNev, 60]], 1.1, M.io);
const Rof = th => Math.sqrt(25 + 24 * Math.cos(th * Math.PI / 180));
// readout
$('#roA').innerHTML = `<span class="k" style="color:${AC}">A</span><span class="v" id="rvA" style="color:${AC}">0.0</span><span class="u">km</span>
  <span class="k" style="color:${BC}">B</span><span class="v" id="rvB" style="color:${BC}">0.0</span><span class="u">km</span>`;
$('#roB').innerHTML = `<span class="k" id="rk0" style="color:${C.ink2}">d</span><span class="v" id="rv0">0.0</span><span class="u" id="ru0">km</span>
  <span class="k" style="color:${RC}">R</span><span class="v" id="rvR">0.0</span><span class="u">km</span>`;
const roNote = document.createElement('div'); roNote.className = 'pillp'; roNote.style.cssText = 'left:36px;top:196px;height:44px;font-size:22px'; $('#ro').appendChild(roNote);
// graph 1: R against distance ridden ; graph 2: R against theta
const g1 = PUC.graph($('#g1S'), { x: 110, y: 74, w: 600, h: 146, xmax: 7, ymax: 7, xt: [0, 3, 7], yt: [0, 5, 7] });
const g1ref = mk($('#g1S'), 'line', { x1: g1.X(0), y1: g1.Y(0), x2: g1.X(7), y2: g1.Y(7), stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const g1rt = txt($('#g1S'), g1.X(6.2), g1.Y(6.9), 'if it were a straight line', { 'text-anchor': 'end', 'font-size': 16, fill: C.mute });
const g1c = g1.curve(RC), g1d = g1.dot(RC);
const Rd = d => d <= 3 ? d : Math.hypot(3, d - 3);
const g2 = PUC.graph($('#g2S'), { x: 110, y: 74, w: 600, h: 146, xmax: 180, ymax: 7, xt: [0, 90, 180], yt: [1, 5, 7] });
const band = mk($('#g2S'), 'rect', { x: g2.X(0), y: g2.Y(7), width: 600, height: g2.Y(1) - g2.Y(7), fill: C.ac3 });
$('#g2S').insertBefore(band, $('#g2S').firstChild);
const g2c = g2.curve(RC), g2d = g2.dot(RC);
const bandT = txt($('#g2S'), g2.X(180), g2.Y(7) - 10, 'always between 1 and 7', { 'text-anchor': 'end', 'font-size': 18, fill: AC, 'font-weight': 600 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Rode 7 km, but only 5 km from home!' });

/* ---------- D: derivation ---------- */
const STEPS = [[`${sB}_{\\parallel} = ${sB}\\cos\\theta`, 'the part of B along A'],
  [`${sB}_{\\perp} = ${sB}\\sin\\theta`, 'the part of B straight across'],
  [`${sR}^2 = (${sA} + ${sB}\\cos\\theta)^2 + (${sB}\\sin\\theta)^2`, 'right triangle: long side squared'],
  [`${sR}^2 = ${sA}^2 + ${sB}^2 + 2${sA}${sB}\\cos\\theta`, 'because sin² + cos² = 1']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Part'), wt('D3', 'rest'), wt('D4', 'three'), wt('D5', 'four')];
const d = $('#drS'), DO = [80, 420], DA = [DO[0] + 300, DO[1]], DBv = pol(60, 250), DB = [DA[0] + DBv[0], DA[1] + DBv[1]];
const tri = mk(d, 'path', { d: `M${DO[0]},${DO[1]} L${DB[0]},${DO[1]} L${DB[0]},${DB[1]} Z`, fill: C.ac3, stroke: 'none' });
const dPar = dashL(d, BC, { x1: DA[0], y1: DA[1] + 2, x2: DB[0], y2: DA[1] + 2 }), dPer = dashL(d, BC, { x1: DB[0], y1: DA[1], x2: DB[0], y2: DB[1] });
const dA = PUC.arrow(d, AC, 7, 20), dB = PUC.arrow(d, BC, 7, 20), dR = PUC.arrow(d, RC, 7, 20);
const dArc = arc(d, DA[0], DA[1], 50, 0, 60, C.ink2, 2.5), dTh = txt(d, DA[0] + 58, DA[1] - 22, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: C.ink2, 'font-weight': 600 });
const dLA = vlab(d, 'A', AC, DO[0] + 150, DO[1] + 52), dLB = vlab(d, 'B', BC, DA[0] + 14, DA[1] - 96), dLR = vlab(d, 'R', RC, DO[0] + 170, DO[1] - 110);
const dTpar = txt(d, (DA[0] + DB[0]) / 2, DA[1] + 40, 'B cos θ', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: BC, 'font-weight': 600 });
const dTper = txt(d, DB[0] + 16, (DA[1] + DB[1]) / 2 + 8, 'B sin θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: BC, 'font-weight': 600 });
const dRa = mk(d, 'path', { d: `M${DB[0] - 18},${DO[1]} v-18 h18`, fill: 'none', stroke: C.ink2, 'stroke-width': 2 });
const CHK = [['θ = 0°', '7'], ['θ = 90°', '5'], ['θ = 180°', '1']];
$('#chks').innerHTML = CHK.map(([a, b], i) => `<div class="chk" id="ck${i}">${a}<span style="color:var(--mute)">:</span><b style="color:${RC}">R = ${b}</b></div>`).join('');
const tChk = [wt('D6', 'zero'), wt('D6', 'Ninety'), wt('D6', 'eighty')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${sR}^2 = ${sA}^2 + ${sB}^2 + 2${sA}${sB}\\cos\\theta`);

/* ---------- C: parallelogram law ---------- */
const cp = $('#cpS'), CO = [110, 440], CAe = [430, 440], CBv = pol(55, 250), CBe = [CO[0] + CBv[0], CO[1] + CBv[1]], CC = [CAe[0] + CBv[0], CAe[1] + CBv[1]];
const cHi1 = mk(cp, 'path', { d: `M${CO[0]},${CO[1]} L${CAe[0]},${CAe[1]} L${CC[0]},${CC[1]}`, fill: 'none', stroke: C.ac2, 'stroke-width': 22, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const cHi2 = mk(cp, 'path', { d: `M${CO[0]},${CO[1]} L${CBe[0]},${CBe[1]} L${CC[0]},${CC[1]}`, fill: 'none', stroke: '#E6DDFA', 'stroke-width': 22, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const cA2 = PUC.arrow(cp, AC, 5, 16), cB2 = PUC.arrow(cp, BC, 5, 16);
[cA2, cB2].forEach(a => a.g.setAttribute('stroke-dasharray', '9 9'));
cA2.g.querySelector('path').setAttribute('stroke-dasharray', '9 9'); cB2.g.querySelector('path').setAttribute('stroke-dasharray', '9 9');
const cA = PUC.arrow(cp, AC, 7, 20), cB = PUC.arrow(cp, BC, 7, 20), cR = PUC.arrow(cp, RC, 7, 20);
mk(cp, 'circle', { cx: CO[0], cy: CO[1], r: 7, fill: RC });
const cLA = vlab(cp, 'A', AC, (CO[0] + CAe[0]) / 2, CO[1] + 52), cLB = vlab(cp, 'B', BC, CO[0] + CBv[0] / 2 - 30, CO[1] + CBv[1] / 2 + 6), cLR = vlab(cp, 'R', RC, (CO[0] + CC[0]) / 2 + 6, (CO[1] + CC[1]) / 2 - 18);
const cDot = mk(cp, 'circle', { cx: CC[0], cy: CC[1], r: 13, fill: 'none', stroke: C.red, 'stroke-width': 3 });
const cTx = txt(cp, CC[0] + 20, CC[1] - 22, 'same corner', { 'font-size': 20, fill: C.red, 'font-weight': 600 });
$('#cqF').innerHTML = K(`${vA} + ${vB} = ${vB} + ${vA}`);
const cq = $('#cqS'), NQ = [80, 320];
const nA = PUC.arrow(cq, AC, 7, 20), nNA = PUC.arrow(cq, AC, 7, 20);
nNA.g.querySelector('path').setAttribute('stroke-dasharray', '10 8');
const nDot = mk(cq, 'circle', { cx: NQ[0], cy: NQ[1] + 14, r: 9, fill: RC });
const nL1 = vlab(cq, 'A', AC, 240, 296), nL2 = vlab(cq, '-A', AC, 240, 384, { fs: 30 });
$('#cqN').innerHTML = K(`${vA} + (-${vA}) = \\vec{0}`);
$('#cqN').style.left = '400px'; $('#cqN').style.top = '286px';

/* ---------- R: subtraction ---------- */
const rs = $('#rsS'), SO = [200, 290], SAe = [500, 290];
const sBg = PUC.arrow(rs, C.dim, 5, 16);
const sA_ = PUC.arrow(rs, AC, 7, 20), sB_ = PUC.arrow(rs, BC, 7, 20), sD = PUC.arrow(rs, RC, 7, 20);
mk(rs, 'circle', { cx: SO[0], cy: SO[1], r: 7, fill: RC });
const sLA = vlab(rs, 'A', AC, 350, 342), sLB = vlab(rs, 'B', BC, 0, 0), sLD = vlab(rs, 'A - B', RC, 0, 0, { fs: 28 });
const tFlip = wt('R2', 'opposite'), tMove = wt('R3', 'Flip') + 0.1, tAdd = wt('R3', 'add') + 0.1;
$('#rr0').innerHTML = K(`-${vB}:\\;\\; \\text{same length,}\\; |{-${vB}}| = |${vB}|`);
$('#rr1').innerHTML = K(`${vA} - ${vB} = ${vA} + (-${vB})`);

/* ---------- K: side by side ---------- */
const KU = 78;                                                     // 60 px per km on both panels
const kSide = (svg, south) => { const o = [180, south ? 140 : 430], e = [o[0] + 3 * KU, o[1]], n = [e[0], o[1] + (south ? 4 : -4) * KU];
  const a = PUC.arrow(svg, AC, 7, 20), b = PUC.arrow(svg, BC, 7, 20), r = PUC.arrow(svg, RC, 7, 20);
  mk(svg, 'circle', { cx: o[0], cy: o[1], r: 7, fill: RC });
  const la = txt(svg, (o[0] + e[0]) / 2, o[1] + (south ? -18 : 40), '3 km east', { 'text-anchor': 'middle', 'font-size': 22, fill: AC, 'font-weight': 600 });
  const lb = txt(svg, e[0] + 18, (e[1] + n[1]) / 2 + 8, south ? '4 km south' : '4 km north', { 'font-size': 22, fill: BC, 'font-weight': 600 });
  const lr = txt(svg, (o[0] + n[0]) / 2 - 18, (o[1] + n[1]) / 2 + 8, '5 km', { 'text-anchor': 'end', 'font-size': 26, fill: RC, 'font-weight': 600 });
  return { o, e, n, a, b, r, la, lb, lr }; };
const KA = kSide($('#kaS'), false), KS = kSide($('#ksS'), true);
// reference B (4 km north) in the corner of the subtract panel; it flips to -B
const KR = [640, 300], ksRef = PUC.arrow($('#ksS'), BC, 6, 18), ksRefL = txt($('#ksS'), KR[0] + 22, KR[1] + 8, 'B', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 30, fill: BC, 'font-weight': 700 });
const th1 = PUC.think($('#th1'), { q: 'Forces of 3 N and 4 N act on a box. Can their resultant be 8 N?', opts: ['Yes', 'No'], right: 1, why: 'Max 3 + 4 = 7 N (same way), min 4 - 3 = 1 N (opposite way).' });

/* ---------- V: change in velocity ---------- */
const v = $('#vsS'), VX0 = 70, VY = 460, VCX = 330, VTOP = 210;
mk(v, 'path', { d: `M${VX0 - 30},${VY} H${VCX} V${VTOP - 30}`, fill: 'none', stroke: '#E3E6EC', 'stroke-width': 40, 'stroke-linejoin': 'round' });
mk(v, 'path', { d: `M${VX0 - 30},${VY} H${VCX} V${VTOP - 30}`, fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-dasharray': '14 14' });
const vGh = [0, 1, 2].map(() => { const g = mk(v, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r: 16, fill: C.ink }); return g; });
const vBk = mk(v, 'g', {}); mk(vBk, 'circle', { cx: 0, cy: 0, r: 16, fill: C.ink }); mk(vBk, 'circle', { cx: 0, cy: 0, r: 6, fill: '#fff' });
const vVel = PUC.arrow(v, AC, 7, 20), vLab = vlab(v, 'v', AC, 0, 0, { sub: '1' });
const vL1 = (() => { const g = mk(v, 'g', {}); const a = PUC.arrow(g, AC, 6, 18); a.set(VX0 + 10, VY - 60, VX0 + 150, VY - 60); vlab(g, 'v', AC, VX0 + 80, VY - 76, { sub: '1', fs: 30 }); return g; })();
const tV0 = wt('V2', 'cruises'), tVc = wt('V2', 'turns'), tV9 = T1('V2');
const LE = VCX - VX0, LN = VY - VTOP;
const sV = t => M.clamp((t - tV0) / (tV9 - tV0)) * (LE + LN);
const vPos = q => q <= LE ? [VX0 + q, VY] : [VCX, VY - (q - LE)];
$('#vro').innerHTML = `<span class="k" style="color:${C.ink2};font-style:normal;font-size:22px">speed</span><span class="v" id="vS">6.0</span><span class="u">m/s</span><span class="k" style="color:${C.ink2};font-style:normal;font-size:22px">heading</span><span class="v" id="vH" style="font-size:30px;color:${AC}">east</span><span class="u"></span>`;
const vr = $('#vrS'), VO = [440, 340], VU = 27;
const w1 = PUC.arrow(vr, AC, 7, 20), w2 = PUC.arrow(vr, AC, 7, 20), wD = PUC.arrow(vr, DC, 7, 20);
mk(vr, 'circle', { cx: VO[0], cy: VO[1], r: 7, fill: RC });
const wL1 = vlab(vr, 'v', AC, 0, 0, { sub: '1' }), wL2 = vlab(vr, 'v', AC, VO[0] + 34, VO[1] - 70, { sub: '2' }), wLD = vlab(vr, 'Δv', DC, VO[0] - 120, VO[1] - 58, { noArrow: true });
const wFlipT = txt(vr, 0, 0, 'flipped', { 'font-size': 18, fill: AC, 'font-weight': 600 });
const tVF = wt('V4', 'Flip'), tVA = wt('V4', 'add');
$('#vrF').innerHTML = K(`\\textcolor{${DC}}{\\Delta\\vec{v}} = \\textcolor{${AC}}{\\vec{v}_2} - \\textcolor{${AC}}{\\vec{v}_1}`);
$('#vrG').innerHTML = K(`|\\textcolor{${DC}}{\\Delta\\vec{v}}| = 6\\sqrt{2} \\approx \\textcolor{${DC}}{8.5\\,\\text{m/s}}\\;\\;\\text{north west}`);
const th2 = PUC.think($('#th2'), { q: 'Is A - B the same as B - A?', opts: ['Same', 'Not the same'], right: 1, why: 'Same length, opposite directions: B - A is the negative of A - B.' });
const avV = PUC.avatar($('#sV'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same speed, new velocity!' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${sR}^2 = ${sA}^2 + ${sB}^2 + 2${sA}${sB}\\cos\\theta`)],
  [K(`${sA} = 5,\\;\\; ${sB} = 3,\\;\\; \\cos 60^\\circ = \\tfrac{1}{2}`)],
  [K(`${sR}^2 = 25 + 9 + 15 = 49`)],
  [K(`${sR} = \\textcolor{${RC}}{7\\,\\text{N}}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Use'), wt('W4', 'Here'), wt('W5', 'So'), wt('W6', 'So')];
const w = $('#wrS'), WO = [90, 400], WU = 60, WAe = [WO[0] + 5 * WU, WO[1]], WBv = pol(60, 3 * WU), WBe = [WO[0] + WBv[0], WO[1] + WBv[1]], WC = [WAe[0] + WBv[0], WAe[1] + WBv[1]];
const wA2 = dashL(w, AC, { x1: WBe[0], y1: WBe[1], x2: WC[0], y2: WC[1], 'stroke-width': 2.5 }), wB2 = dashL(w, BC, { x1: WAe[0], y1: WAe[1], x2: WC[0], y2: WC[1], 'stroke-width': 2.5 });
const wkA = PUC.arrow(w, AC, 7, 20), wkB = PUC.arrow(w, BC, 7, 20), wkR = PUC.arrow(w, RC, 7, 20);
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: 7, fill: RC });
const wArc = arc(w, WO[0], WO[1], 56, 0, 60, C.ink2, 2.5), wTh = txt(w, WO[0] + 64, WO[1] - 18, '60°', { 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const wtA = txt(w, (WO[0] + WAe[0]) / 2, WO[1] + 40, '5 N', { 'text-anchor': 'middle', 'font-size': 26, fill: AC, 'font-weight': 600 });
const wtB = txt(w, WBe[0] - 88, WBe[1] + 40, '3 N', { 'font-size': 26, fill: BC, 'font-weight': 600 });
const wtR = txt(w, WC[0] + 18, WC[1] - 8, 'R = 7 N', { 'font-size': 28, fill: RC, 'font-weight': 600 });
const NLx = n => 90 + n * 70, NLy = 500;
const nl = mk(w, 'g', {}); mk(nl, 'line', { x1: NLx(0), y1: NLy, x2: NLx(8.6), y2: NLy, stroke: C.ink, 'stroke-width': 2.5 });
const nlBand = mk(nl, 'rect', { x: NLx(2), y: NLy - 12, width: NLx(8) - NLx(2), height: 24, rx: 6, fill: C.ac2 });
for (let i = 0; i <= 8; i++) { mk(nl, 'line', { x1: NLx(i), y1: NLy - 6, x2: NLx(i), y2: NLy + 6, stroke: C.ink, 'stroke-width': 2 }); txt(nl, NLx(i), NLy + 34, i, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink }); }
const nlDot = mk(nl, 'circle', { cx: NLx(7), cy: NLy, r: 11, fill: RC });
const nlT = txt(nl, NLx(2), NLy - 24, 'between 5 - 3 = 2 and 5 + 3 = 8', { 'font-size': 18, fill: AC, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'θ is the angle inside the triangle', right: 'θ is the angle tail to tail; inside, it is 180° - θ' });
const tp = $('#tpS'), TO = [40, 220], TAe = [240, 220], TBv = pol(60, 150), TBe = [TAe[0] + TBv[0], TAe[1] + TBv[1]];
const tpA = PUC.arrow(tp, AC, 6, 18), tpB = PUC.arrow(tp, BC, 6, 18);
const tpX = dashL(tp, C.dim, { x1: TAe[0], y1: TAe[1], x2: TAe[0] + 190, y2: TAe[1], 'stroke-width': 2.5 });
const tpArc1 = arc(tp, TAe[0], TAe[1], 44, 0, 60, C.ok, 3.5), tpArc2 = arc(tp, TAe[0], TAe[1], 34, 60, 180, C.red, 3.5);
const tpT1 = txt(tp, TAe[0] + 58, TAe[1] - 14, 'θ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: C.ok, 'font-weight': 700 });
const tpT2 = txt(tp, TAe[0] - 110, TAe[1] - 40, '180° - θ', { 'font-size': 22, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short numericals: the resultant, the angle between two vectors, or the size of A - B' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Two vectors of sizes 6 and 4 units have a resultant of size 8 units. What is the size of their difference?', qW: 780,
  opts: [K('2\\sqrt{13}\\ \\text{units}'), K('2\\sqrt{10}\\ \\text{units}'), K('2\\ \\text{units}'), K('10\\ \\text{units}')], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K('64 = 36 + 16 + 2AB\\cos\\theta')], [K('2AB\\cos\\theta = 12')], [K('|\\vec{A}-\\vec{B}|^2 = 52 - 12 = 40')], [K('|\\vec{A}-\\vec{B}| = 2\\sqrt{10} \\approx 6.3')]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Sixty'), wt('A2', 'So'), wt('A3', 'Fifty'), wt('A3', 'Root')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · adding and subtracting vectors', y0: 100, dy: 88, txt: [0, 0, 1, 1],
  lines: [K(`${vR} = ${vA} + ${vB} \\qquad ${sR}^2 = ${sA}^2 + ${sB}^2 + 2${sA}${sB}\\cos\\theta`),
    K(`${vA} - ${vB} = ${vA} + (-${vB}) \\qquad |${vA} - ${vB}|^2 = ${sA}^2 + ${sB}^2 - 2${sA}${sB}\\cos\\theta`),
    '<b>Range</b>: &nbsp;<span class="mono">|A - B| ≤ R ≤ A + B</span>', '<b>Head to tail</b> &nbsp;·&nbsp; θ measured <b>tail to tail</b> &nbsp;·&nbsp; A + B = B + A'] });
const YQ = ['How can 3 km plus 4 km give a displacement of 5 km?', 'What is the smallest resultant of 6 N and 8 N?', 'Turning a corner at a steady speed: does your velocity change?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 35', topic: 'Double an arrow, or flip it? Multiplication of Vectors by Scalars', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRp - 0.2, 1.06, 960, 560], [tS5 - 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  x = 36; [0, 1, 2].forEach(i => { const e = $('#ck' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
}

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
    const tTwo = wt('H2', 'two') - 0.1, tOne = wt('H2', 'not') - 0.1;
    JR.forEach((r, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      grow(r.a, r.pa, t, tTwo + i * 0.1, 0.4); grow(r.b, r.pb, t, tTwo + 0.2 + i * 0.1, 0.4); grow(r.r, r.pr, t, tOne + i * 0.12, 0.5); });
    M.vis($('#hjP'), t, tOne + 0.4, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#exH'), t, tH3 + 0.4, 1e9, { dy: 8 });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, wt('H4', 'trip') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25); el.style.background = i === 2 ? mix(C.soft, C.redBg, on) : mix(C.soft, C.ac2, on); el.style.color = i === 2 ? mix(C.ink, C.red, on) : C.ink; });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    op(blk[0], t, tNum[0] - 0.1); op(blk[1], t, tNum[1] - 0.1);
    M.draw(brace, t, tNum[2] - 0.1, 0.4); op(bTx, t, tNum[2]);
    M.draw(hop[0], t, tNum[0], 0.5); M.draw(hop[1], t, tNum[1], 0.5);
    const hx = M.keys([[0, 0], [tNum[0], 3], [tNum[1], 7]], 0.5, M.io)(t), arcY = (u => -4 * u * (1 - u))((hx <= 3 ? hx / 3 : (hx - 3) / 4) % 1);
    attr(hdot, 'cx', NX(hx).toFixed(1)); attr(hdot, 'cy', (380 + 70 * arcY).toFixed(1)); op(hdot, t, tNum[0] - 0.3);
    M.vis($('#pqP'), t, wt('P3', 'arrows') - 0.1, 1e9, POP);
    M.vis($('#pm'), t, T0('P3') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tFirst = wt('P4', 'first'), tSec = wt('P4', 'second'), tHd = wt('P4', 'Head'), tRes = wt('P5', 'resultant');
    grow(pmA, [...PO, ...PA], t, tFirst - 0.1); op(pmLA, t, tFirst + 0.3);
    grow(pmB, [...PA, ...PB], t, tSec - 0.1); op(pmLB, t, tSec + 0.3);
    const ri = op(pmRing, t, tHd - 0.1); attr(pmRing, 'r', (18 + 6 * Math.sin(Math.max(0, t - tHd) * 6) * Math.exp(-Math.max(0, t - tHd) * 1.5)).toFixed(1)); op(pmT1, t, tHd);
    grow(pmR, [...PO, ...PB], t, tRes - 0.1, 0.8); op(pmLR, t, tRes + 0.4); op(pmT0, t, wt('P5', 'tail') - 0.1); op(pmT2, t, wt('P5', 'head') - 0.1);
    PUC.write($('#pmF'), t, wt('P5', 'One') - 0.1, 0.8);
  }

  /* S: ride sim then angle sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const mA = 1 - M.io((t - tS5) / 0.4), mB = M.io((t - tS5 - 0.3) / 0.4);
    ride.style.opacity = mA.toFixed(3); M.hide(ride, mA < 0.01); angG.style.opacity = mB.toFixed(3); M.hide(angG, mB < 0.01);
    op($('#simL'), t, tS1, tS5); op($('#simL2'), t, tS5 + 0.2);
    $('#g1S').style.opacity = mA.toFixed(3); M.hide($('#g1S'), mA < 0.01); $('#g2S').style.opacity = mB.toFixed(3); M.hide($('#g2S'), mB < 0.01);
    op($('#g1L'), t, tS1, tS5); op($('#g2L'), t, tS5 + 0.2);
    // ride
    const dd = dRide(t), [bx, by] = posAt(dd);
    moveG(bk, bx, by - 22); op(bk, t, tS1 + 0.5);
    ghostK.forEach((g, k) => { const dg = dRide(t - 0.12 * (k + 1)), [gx, gy] = posAt(dg), mv = Math.abs(dd - dg) > 0.03; moveG(g, gx, gy - 22); g.style.opacity = mv ? [0.3, 0.2, 0.12][k] : 0; });
    const dA = Math.min(dd, 3), dB = Math.max(0, dd - 3);
    rA.set(HX, HY, HX + dA * KM, HY); rB.set(CX, HY, CX, HY - dB * KM);
    op(rLA, t, tE1 - 0.3); op(rLB, t, tN1 - 0.3);
    const rep = t >= tRp - 0.4 && t < tS5;
    if (rep && t >= tRp) rR.set(HX, HY, bx, by); else if (t >= tRp1) rR.set(HX, HY, CX, CY); else rR.set(0, 0, 0, 0);
    op(rLR, t, tRp1 - 0.2); op(rRtx, t, wt('S4', 'five') - 0.1);
    op($('#slo'), t, wt('S4', 'Slow') - 0.1, tRp1);
    // angle sim
    const th = thF(t), Bv = pol(th, 4 * AU), Bh = [AH[0] + Bv[0], AH[1] + Bv[1]], R = Rof(th);
    aA.set(...AO, ...AH); aB.set(...AH, ...Bh); aR.set(...AO, ...Bh);
    aG.forEach((g, k) => { const tg = thF(t - 0.15 * (k + 1)), v2 = pol(tg, 4 * AU); g.set(...AH, AH[0] + v2[0], AH[1] + v2[1]); g.g.style.opacity = Math.abs(tg - th) > 1 ? [0.3, 0.2, 0.12][k] : 0; });
    const lb = pol(th + (th > 90 ? -18 : 18), 2 * AU); moveG(aLB, AH[0] + lb[0], AH[1] + lb[1] + 12);
    const mid = [(AO[0] + Bh[0]) / 2, (AO[1] + Bh[1]) / 2], nrm = th < 150 ? [-0.5, -1] : [0, 1]; moveG(aLR, mid[0] + nrm[0] * 30, mid[1] + nrm[1] * (th < 150 ? 22 : 44));
    if (th > 2) { const a1 = arc, rr = 46, p0 = [AH[0] + rr, AH[1]], pp = pol(th, rr); attr(aArc, 'd', `M${p0[0]},${p0[1]} A${rr},${rr} 0 ${th > 180 ? 1 : 0} 0 ${(AH[0] + pp[0]).toFixed(1)},${(AH[1] + pp[1]).toFixed(1)}`); const pt = pol(th / 2, rr + 22); attr(aTh, 'x', (AH[0] + pt[0] - 8).toFixed(1)); attr(aTh, 'y', (AH[1] + pt[1] + 10).toFixed(1)); aTh.style.opacity = M.clamp((th - 8) / 10); } else { attr(aArc, 'd', ''); aTh.style.opacity = 0; }
    // readout
    const angM = t >= tS5;
    M.setT($('#rvA'), angM ? '3.0' : dA.toFixed(1)); M.setT($('#rvB'), angM ? '4.0' : dB.toFixed(1));
    M.setT($('#rk0'), angM ? 'θ' : 'd'); M.setT($('#rv0'), angM ? Math.round(th) + '' : dd.toFixed(1)); M.setT($('#ru0'), angM ? 'deg' : 'km');
    M.setT($('#rvR'), (angM ? R : Rd(dd)).toFixed(1));
    roNote.innerHTML = angM ? `<span style="color:var(--mute)">same lengths, new angle</span>` : `<span style="color:var(--mute)">ridden</span>&nbsp;<b class="mono">${dd.toFixed(1)} km</b>&nbsp;<span style="color:var(--mute)">· from home</span>&nbsp;<b class="mono">${Rd(dd).toFixed(1)} km</b>`;
    M.vis(roNote, t, tE0, 1e9, { dy: 8 });
    // graph 1: R vs d (curve drawn up to the furthest point ridden)
    const dMax = dLive(t); g1c(s0 => [s0, Rd(s0)], 0, dMax); g1d(dd, Rd(dd), t > tE0 - 0.2 && !angM);
    M.draw(g1ref, t, tN1, 0.6); op(g1rt, t, tN1 + 0.3);
    // graph 2: R vs theta over the angles visited so far
    let lo = 90, hi = 90; for (let i = 0; i <= 40; i++) { const tt = tS5 + (t - tS5) * i / 40, x = thF(tt); lo = Math.min(lo, x); hi = Math.max(hi, x); }
    g2c(x => [x, Rof(x)], angM ? lo : 90, angM ? hi : 90); g2d(th, R, angM);
    op(band, t, tS7 + 0.2); op(bandT, t, wt('S7', 'between'));
    avA(t, wt('S4', 'college') + 0.6, tS5 - 0.2);
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 200], [tStep[2] - 0.1, 316], [tStep[3] - 0.1, 432]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    const tPut = wt('D2', 'Put');
    grow(dA, [...DO, ...DA], t, tD1 + 0.6); op(dLA, t, tD1 + 1.0);
    grow(dB, [...DA, ...DB], t, tPut); op(dLB, t, tPut + 0.4); M.draw(dArc, t, wt('D2', 'angle'), 0.4); op(dTh, t, wt('D2', 'theta'));
    M.draw(dPar, t, tStep[0] - 0.2, 0.5); op(dTpar, t, tStep[0] + 0.3);
    M.draw(dPer, t, tStep[1] - 0.2, 0.5); op(dTper, t, tStep[1] + 0.3); op(dRa, t, tStep[1] + 0.5);
    op(tri, t, tStep[2] - 0.2, 1e9, 0.4); grow(dR, [...DO, ...DB], t, wt('D4', 'R'), 0.7); op(dLR, t, wt('D4', 'R') + 0.5);
    tChk.forEach((tt, i) => { const el = $('#ck' + i); M.vis(el, t, tt - 0.15, 1e9, POP); el.style.background = mix(C.soft, C.okBg, M.io((t - tt - 0.3) / 0.3)); });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Vectors') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'angle') - 0.2, 0.8);
  }

  /* C: parallelogram law, order, null vector */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('R1');
    M.vis($('#cp'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const tTail = wt('C2', 'tail'), tComp = wt('C2', 'complete'), tDiag = wt('C2', 'diagonal');
    grow(cA, [...CO, ...CAe], t, tTail - 0.3); grow(cB, [...CO, ...CBe], t, tTail); op(cLA, t, tTail); op(cLB, t, tTail + 0.3);
    grow(cA2, [...CBe, ...CC], t, tComp); grow(cB2, [...CAe, ...CC], t, tComp + 0.3);
    grow(cR, [...CO, ...CC], t, tDiag - 0.1, 0.8); op(cLR, t, tDiag + 0.5);
    const tAB = T0('C3'), tBA = wt('C3', 'or');
    op(cHi1, t, tAB, wt('C3', 'So'), 0.3); op(cHi2, t, tBA, wt('C3', 'So'), 0.3);
    op(cDot, t, wt('C3', 'same')); op(cTx, t, wt('C3', 'corner'));
    M.vis($('#cq'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#cqF'), t, wt('C3', 'So'), 0.8);
    const tOpp2 = wt('C4', 'opposite'), tBack = wt('C4', 'back');
    M.vis($('#cqL'), t, T0('C4') - 0.1, 1e9, { dy: 8 });
    grow(nA, [NQ[0], NQ[1], NQ[0] + 280, NQ[1]], t, wt('C4', 'add')); op(nL1, t, wt('C4', 'add') + 0.3);
    grow(nNA, [NQ[0] + 280, NQ[1] + 28, NQ[0], NQ[1] + 28], t, tOpp2); op(nL2, t, tOpp2 + 0.4);
    op(nDot, t, tBack); PUC.write($('#cqN'), t, wt('C4', 'zero') - 0.2, 0.7);
    M.vis($('#cqP'), t, wt('C4', 'null') - 0.1, 1e9, POP);
  }

  /* R: subtraction */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rs'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    grow(sA_, [...SO, ...SAe], t, tR1 + 0.5); op(sLA, t, tR1 + 0.9);
    const phi = 60 + 180 * M.io((t - tFlip) / 0.7), mv = M.io((t - tMove) / 0.7), tl = [SO[0] + (SAe[0] - SO[0]) * mv, SO[1]];
    const bv = pol(phi, 200), gu = M.o3((t - tR1 - 0.9) / 0.6);
    if (t < tFlip) sB_.set(SO[0], SO[1], SO[0] + bv[0] * gu, SO[1] + bv[1] * gu); else sB_.set(tl[0], tl[1], tl[0] + bv[0], tl[1] + bv[1]);
    const g0 = pol(60, 200); if (t > tFlip) sBg.set(SO[0], SO[1], SO[0] + g0[0], SO[1] + g0[1]); else sBg.set(0, 0, 0, 0);
    M.setT(sLB.querySelector('text'), t < tFlip + 0.35 ? 'B' : '-B');
    const lp = pol(phi + 20, 120); moveG(sLB, tl[0] + lp[0], tl[1] + lp[1] + 14); op(sLB, t, tR1 + 1.3);
    const end = pol(240, 200); grow(sD, [...SO, SAe[0] + end[0], SAe[1] + end[1]], t, tAdd, 0.8);
    moveG(sLD, (SO[0] + SAe[0] + end[0]) / 2 - 70, (SO[1] + SAe[1] + end[1]) / 2 + 30); op(sLD, t, tAdd + 0.5);
    M.vis($('#rr'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#rr0L'), t, T0('R2'), 1e9, { dy: 8 }); PUC.write($('#rr0'), t, wt('R2', 'same'), 0.8);
    M.vis($('#rr1L'), t, T0('R3'), 1e9, { dy: 8 }); PUC.write($('#rr1'), t, wt('R3', 'plus') - 0.3, 0.8);
    M.vis($('#rrP'), t, tMove, 1e9, POP); M.vis($('#rrQ'), t, wt('R4', 'Same') - 0.1, 1e9, POP);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const k1 = wt('K1', 'three'), k2 = wt('K1', 'four'), k3 = wt('K1', 'five');
    grow(KA.a, [...KA.o, ...KA.e], t, k1 - 0.1, 0.5); op(KA.la, t, k1 + 0.2); grow(KA.b, [...KA.e, ...KA.n], t, k2 - 0.1, 0.5); op(KA.lb, t, k2 + 0.2);
    grow(KA.r, [...KA.o, ...KA.n], t, k3 - 0.2, 0.6); op(KA.lr, t, k3 + 0.2); M.vis($('#kaC'), t, wt('K1', 'north', 1) - 0.1, 1e9, POP);
    M.vis($('#ks'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const s1 = wt('K2', 'flip'), s2 = wt('K2', 'add'), s3 = wt('K2', 'Still');
    grow(KS.a, [...KS.o, ...KS.e], t, T0('K2') + 0.2, 0.5); op(KS.la, t, T0('K2') + 0.5);
    const fl = M.io((t - s1) / 0.6), ru = M.o3((t - T0('K2') - 0.3) / 0.4), dirB = 1 - 2 * fl;
    if (ru > 0) ksRef.set(KR[0], KR[1] + 50 * dirB * ru, KR[0], KR[1] - 50 * dirB * ru); else ksRef.set(0, 0, 0, 0);
    M.setT(ksRefL, fl > 0.5 ? '-B' : 'B'); op(ksRefL, t, T0('K2') + 0.5);
    grow(KS.b, [...KS.e, ...KS.n], t, s1 + 0.6, 0.6);
    op(KS.lb, t, s1 + 0.5); grow(KS.r, [...KS.o, ...KS.n], t, s2 + 0.2, 0.6); op(KS.lr, t, s3); M.vis($('#ksC'), t, wt('K2', 'south', 1) - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'eight') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'most') });
  }

  /* V: change in velocity */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V5');
    M.vis($('#vs'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const q = sV(t), [px, py] = vPos(q), north = q > LE;
    moveG(vBk, px, py); op(vBk, t, tV1 + 0.3);
    vGh.forEach((g, k) => { const qg = sV(t - 0.14 * (k + 1)), [gx, gy] = vPos(qg); moveG(g, gx, gy); g.style.opacity = Math.abs(q - qg) > 2 ? [0.3, 0.2, 0.12][k] : 0; });
    const vu = M.o3((t - tV0 + 0.1) / 0.4);
    if (north) vVel.set(px, py - 20, px, py - 20 - 90 * vu); else vVel.set(px + 20, py, px + 20 + 90 * vu, py);
    moveG(vLab, north ? px + 34 : px + 64, north ? py - 60 : py - 24); M.setT(vLab.querySelector('text:last-child'), north ? '2' : '1'); op(vLab, t, tV0 + 0.2);
    op(vL1, t, tVc + 0.3, tV5);
    M.vis($('#vro'), t, tV0 - 0.1, 1e9, { dy: 10 }); M.setT($('#vH'), north ? 'north' : 'east');
    M.vis($('#vr'), t, T0('V3') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#exV'), t, T0('V3') + 0.3, 1e9, { dy: 8 });
    const tw = wt('V3', 'final'), tw2 = wt('V3', 'initial');
    grow(w2, [VO[0], VO[1], VO[0], VO[1] - 6 * VU], t, tw - 0.1, 0.5); op(wL2, t, tw + 0.2);
    const fl = M.io((t - tVF) / 0.6), mv2 = M.io((t - tVF - 0.6) / 0.6), w1t = [VO[0], VO[1] - 6 * VU * mv2], dir = 1 - 2 * fl;
    const w1u = M.o3((t - tw2 + 0.1) / 0.5); if (w1u > 0) w1.set(w1t[0], w1t[1], w1t[0] + 6 * VU * dir * w1u, w1t[1]); else w1.set(0, 0, 0, 0);
    moveG(wL1, w1t[0] + 2 * VU * dir, w1t[1] + (mv2 > 0.5 ? -18 : 44)); op(wL1, t, tw2 + 0.2);
    M.setT(wL1.querySelector('text'), fl > 0.5 ? '−v' : 'v'); M.hide(wFlipT, true);
    grow(wD, [VO[0], VO[1], VO[0] - 6 * VU, VO[1] - 6 * VU], t, tVA + 0.1, 0.7); op(wLD, t, tVA + 0.6);
    PUC.write($('#vrF'), t, wt('V3', 'change') - 0.1, 0.8); PUC.write($('#vrG'), t, wt('V4', 'about') - 0.1, 0.9);
    avV(t, wt('V4', 'west') + 0.3, out);
    M.vis($('#th2'), t, tV5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV5, tOpts: wt('V5', 'same') - 0.1, tCount: T1('V5') + 0.05, dur: 3, tAns: T0('V6') - 0.02, tWhy: wt('V6', 'same') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    grow(wkA, [...WO, ...WAe], t, wt('W2', 'five')); op(wtA, t, wt('W2', 'five') + 0.3);
    grow(wkB, [...WO, ...WBe], t, wt('W2', 'three')); op(wtB, t, wt('W2', 'three') + 0.3);
    M.draw(wArc, t, wt('W2', 'sixty'), 0.4); op(wTh, t, wt('W2', 'sixty') + 0.2);
    M.draw(wA2, t, tW[0] + 0.3, 0.5); M.draw(wB2, t, tW[0] + 0.5, 0.5);
    grow(wkR, [...WO, ...WC], t, tW[3] - 0.1, 0.8); op(wtR, t, tW[3] + 0.5);
    op(nl, t, wt('W6', 'between') - 0.2); attr(nlDot, 'cx', NLx(7)); op(nlDot, t, wt('W6', 'between') + 0.3);
  }

  /* X: trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'theta') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'between') });
    grow(tpA, [...TO, ...TAe], t, T0('X2') + 0.2, 0.5); grow(tpB, [...TAe, ...TBe], t, T0('X2') + 0.5, 0.5);
    M.draw(tpArc2, t, wt('X2', 'inside'), 0.4); op(tpT2, t, wt('X2', 'inside') + 0.2);
    M.draw(tpX, t, wt('X3', 'tail') - 0.3, 0.4); M.draw(tpArc1, t, wt('X3', 'tail'), 0.4); op(tpT1, t, wt('X3', 'tail') + 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'short') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
