// PUC Physics Ep 24: Uniform and Non-Uniform Motion (Motion notebook, two bicycles + paint marks)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, B1 = C.ac, B2 = C.violet, XC = C.ink;   // colour-coding: v blue, a red, bike A blue, bike B violet, x ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const kv = s => `\\textcolor{${VC}}{${s}}`, ka = s => `\\textcolor{${AC}}{${s}}`;

Object.assign(M.IC, {
  fan: ['M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z', 'M12 12v.01'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0', 'M12 17.5V14l-3-3 4-3 2 3h2', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2'],
  up: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
  down: ['M22 17 13.5 8.5 8.5 13.5 2 7', 'M16 17h6v-6'],
  turn: ['M4 20v-7a4 4 0 0 1 4-4h12', 'm16 5 4 4-4 4'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS6 = T0('S6'), tS9 = T0('S9');
const tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK4 = T0('K4'), tG1 = T0('G1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three moving things ---------- */
const JOBS = [['fan', 'Fan', 'FULL SPEED', 'fan'], ['train', 'Train', 'PULLING OUT', 'train'], ['bike', 'Bicycle', 'FLAT ROAD', 'bicycle']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jq" id="jq${i}">MOVING</div></div>`).join('');
$('#hq0I').innerHTML = M.icon('bike', 26, B1, 2.2); $('#hq1I').innerHTML = M.icon('down', 26, B2, 2.4);

/* ---------- P: uniform = equal displacements in every interval ---------- */
const tl = $('#tlS'), TX0 = 60, TPX = 32;                     // 32 px per metre, 5 m/s
const ROWS = [[1, '1 s', '5 m', 40], [0.5, '0.5 s', '2.5 m', 150], [0.1, '0.1 s', '0.5 m', 260]];
const tRow = [wt('P2', 'equal'), wt('P3', 'half'), wt('P3', 'tiny')];
const rowEls = ROWS.map(([dt, a, b, y]) => {
  const g = mk(tl, 'g', {});
  mk(g, 'line', { x1: TX0, y1: y + 30, x2: 724, y2: y + 30, stroke: C.line, 'stroke-width': 3, 'stroke-linecap': 'round' });
  txt(g, 36, y, 'EVERY ' + a.toUpperCase(), { 'font-weight': 600, 'letter-spacing': 1.5 });
  const lab = txt(g, 724, y, a + ' → ' + b, { 'text-anchor': 'end', 'font-size': 20, fill: B1, 'font-weight': 600 });
  const n = Math.round(20 / dt), marks = [];
  for (let k = 0; k <= n; k++) marks.push(mk(g, 'rect', { x: TX0 + k * 5 * dt * TPX - 2, y: y + 20, width: 4, height: 20, rx: 2, fill: B1 }));
  const dot = mk(g, 'circle', { cx: TX0, cy: y + 30, r: 10, fill: C.ink });
  return { g, lab, marks, dot, dt };
});
const NU = [['up', 'Speeding up', 'GAPS GROW', [0, 8, 24, 48, 80, 120]], ['down', 'Slowing down', 'GAPS SHRINK', [0, 40, 72, 96, 112, 120]], ['turn', 'Turning a corner', 'DIRECTION CHANGES', null]];
$('#nus').innerHTML = NU.map(([ic, n, w], i) => `<div class="nu" id="nu${i}" style="top:${150 + i * 104}px"><i>${M.icon(ic, 28, C.red, 2.4)}</i><div class="nn">${n}</div><div class="nw">${w}</div><svg class="nd" width="150" height="88" style="position:absolute;left:400px;top:0"></svg><div class="nk">${'a ≠ 0'}</div></div>`).join('');
NU.forEach(([, , , xs], i) => { const s = $('#nu' + i).querySelector('.nd');
  if (xs) xs.forEach(x => mk(s, 'circle', { cx: 15 + x, cy: 44, r: 6, fill: B2 }));
  else for (let k = 0; k <= 5; k++) { const th = Math.PI / 2 * k / 5; mk(s, 'circle', { cx: 15 + 100 * Math.sin(th), cy: 74 - 60 * (1 - Math.cos(th)), r: 6, fill: B2 }); } });
const tNu = [wt('P5', 'Speeding'), wt('P5', 'slowing'), wt('P5', 'turning')];

/* ---------- S: motion bench, two bicycles ---------- */
const s = $('#simS'), RX0 = 80, RPX = 13, AY = 1.25;          // 16 px per metre, road 0 - 40 m; B: a = 1.25 m/s^2 from rest
const LANE = [{ y: 210, col: B1, x: tt => 5 * tt, v: () => 5 }, { y: 404, col: B2, x: tt => 0.5 * AY * tt * tt, v: tt => AY * tt }];
txt(s, 40, 98, 'A · STEADY 5 m/s', { 'font-weight': 600, fill: B1, 'letter-spacing': 1 });
txt(s, 40, 290, 'B · FROM REST, SPEEDING UP', { 'font-weight': 600, fill: B2, 'letter-spacing': 1 });
const bikeG = (p, col, op) => { const g = mk(p, 'g', { opacity: op });
  mk(g, 'circle', { cx: -20, cy: -16, r: 15, fill: 'none', stroke: col, 'stroke-width': 4 }); mk(g, 'circle', { cx: 20, cy: -16, r: 15, fill: 'none', stroke: col, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M-20,-16 L-6,-40 L14,-40 L20,-16 M-6,-40 L2,-16 L-20,-16 M14,-40 L10,-50 M-10,-44 L-2,-44', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return g; };
const lanes = LANE.map(L => {
  mk(s, 'rect', { x: 40, y: L.y, width: 704, height: 30, rx: 6, fill: C.soft });
  mk(s, 'line', { x1: 40, y1: L.y, x2: 744, y2: L.y, stroke: C.ink, 'stroke-width': 3 });
  const marks = [], gl = [];
  for (let k = 0; k <= 8; k++) marks.push(mk(s, 'rect', { x: RX0 + L.x(k) * RPX - 3, y: L.y + 5, width: 6, height: 20, rx: 2, fill: L.col }));
  for (let k = 0; k < 8; k++) { const d = L.x(k + 1) - L.x(k), x = RX0 + (L.x(k) + d / 2) * RPX; gl.push(txt(s, x, L.y + 52, (Math.round(d * 10) / 10).toString(), { 'text-anchor': 'middle', 'font-size': 16, fill: L.col, 'font-weight': 600 })); }
  const ghosts = [0.3, 0.2, 0.12].map(o => bikeG(s, L.col, o)), bike = bikeG(s, L.col, 1);
  const va = PUC.arrow(s, VC, 5, 14);
  const vl = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: VC });
  return Object.assign({ marks, gl, ghosts, bike, va, vl }, L);
});
const aA = PUC.arrow(s, AC, 4, 12), aL = txt(s, 0, 0, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 24, fill: AC });
// position ruler 0 - 40 m
mk(s, 'line', { x1: RX0, y1: 500, x2: RX0 + 40 * RPX, y2: 500, stroke: C.ink, 'stroke-width': 2 });
for (let m = 0; m <= 40; m += 5) { mk(s, 'line', { x1: RX0 + m * RPX, y1: 500, x2: RX0 + m * RPX, y2: 510, stroke: C.ink, 'stroke-width': 2 }); txt(s, RX0 + m * RPX, 530, m, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
txt(s, 744, 530, 'm', { 'text-anchor': 'end', fill: C.mute });
const gapT = [txt(s, 744, 98, 'GAPS: EQUAL', { 'text-anchor': 'end', 'font-weight': 600, fill: B1 }), txt(s, 744, 290, 'GAPS: GROWING', { 'text-anchor': 'end', 'font-weight': 600, fill: B2 })];
// readout (two columns, one per bicycle)
$('#roG').innerHTML = `<span></span><span class="u" style="color:${B1};font-weight:600">BIKE A</span><span class="u" style="color:${B2};font-weight:600">BIKE B</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="rx1" style="font-size:30px"></span><span class="v" id="rx2" style="font-size:30px"></span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv1" style="color:${VC};font-size:30px"></span><span class="v" id="rv2" style="color:${VC};font-size:30px"></span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="ra1" style="color:${AC};font-size:30px"></span><span class="v" id="ra2" style="color:${AC};font-size:30px"></span>`;
$('#roG').style.gridTemplateColumns = '60px 1fr 1fr';
// live x-t graph
const gs = $('#grS'), G = PUC.graph(gs, { x: 110, y: 80, w: 540, h: 136, xmax: 8, ymax: 40, xt: [0, 2, 4, 6, 8], yt: [0, 20, 40] });
txt(gs, 664, 222, 't (s)', {}); txt(gs, 36, 86, 'm', {});
const gc = [G.curve(B1), G.curve(B2)], gd = [G.dot(B1), G.dot(B2)];
const gT = [txt(gs, 0, 0, 'straight line', { 'font-weight': 600, fill: B1, 'font-size': 20 }), txt(gs, 0, 0, 'curves up', { 'font-weight': 600, fill: B2, 'font-size': 20 })];
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same 40 m, same 8 s. So the same motion?' });
// sim clock: first run (both start together), hold, slow-mo replay at 0.5x
const tA = T0('S3') + 0.15, tB = wt('S5', 'eight') + 0.1, R1 = tB - tA;
const tR0 = wt('S6', 'slow') + 0.25, tR1 = tR0 + 2 * R1;
const simT = t => t < tR0 - 0.05 ? 8 * M.clamp((t - tA) / R1) : 8 * M.clamp((t - tR0) / (tR1 - tR0));
const replay = t => t >= tR0 - 0.05;

/* ---------- D: the reasoning, link by link ---------- */
const STEPS = [[`${K(kv('v'))} never changes`, 'equal gaps in equal times'],
  [K(`${ka('a')} = \\Delta ${kv('v')} / \\Delta t = 0`), 'velocity never changes'],
  [K(`x = x_0 + ${kv('v')}\\,t`), 'the same step is added every second'],
  [K(`\\text{slope} = \\Delta x / \\Delta t = ${kv('v')}`), 'a straight line on the x-t graph'],
  [K(`${ka('a')} \\neq 0 \\;\\Rightarrow\\; \\text{curved } x\\text{-}t`), 'non-uniform: the velocity changes']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n"${i === 4 ? ' style="border-color:var(--red);color:var(--red)"' : ''}>${i === 4 ? '!' : i + 1}</div><div class="sx">${f}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Equal'), wt('D3', 'Velocity'), wt('D4', 'x'), wt('D5', 'straight'), wt('D6', 'velocity')];
const ds = $('#drS'), DG = PUC.graph(ds, { x: 120, y: 96, w: 540, h: 360, xmax: 8, ymax: 40, xt: [0, 2, 4, 6, 8], yt: [0, 10, 20, 30, 40] });
txt(ds, 674, 464, 't (s)', {}); txt(ds, 70, 86, 'x (m)', {});
const dc = [DG.curve(B1), DG.curve(B2)];
const stair = [[], []];
for (let k = 0; k < 8; k++) {
  stair[0].push(mk(ds, 'path', { d: `M${DG.X(k)},${DG.Y(5 * k)} H${DG.X(k + 1)} V${DG.Y(5 * k + 5)}`, fill: 'none', stroke: B1, 'stroke-width': 2, 'stroke-dasharray': '5 5', opacity: 0.7 }));
  const x0 = 0.625 * k * k, x1 = 0.625 * (k + 1) * (k + 1);
  stair[1].push(mk(ds, 'path', { d: `M${DG.X(k)},${DG.Y(x0)} H${DG.X(k + 1)} V${DG.Y(x1)}`, fill: 'none', stroke: B2, 'stroke-width': 2, 'stroke-dasharray': '5 5', opacity: 0.7 }));
}
const sl = document.createElement('div'); sl.className = 'fx'; sl.style.cssText = 'left:420px;top:372px;font-size:28px'; sl.innerHTML = K(`\\dfrac{\\Delta x}{\\Delta t} = \\dfrac{5\\,\\text{m}}{1\\,\\text{s}} = ${kv('5\\,\\text{m/s}')}`); $('#dr').appendChild(sl);
const sl2 = document.createElement('div'); sl2.className = 'pillp'; sl2.style.cssText = 'left:430px;top:290px;color:#7A4FE0'; sl2.innerHTML = 'steps grow: curve'; $('#dr').appendChild(sl2);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${kv('v')} = \\text{constant} \\qquad ${ka('a')} = 0`);

/* ---------- K: side by side ---------- */
const side = (svg, col, xs, vt, lab) => {
  mk(svg, 'rect', { x: 36, y: 200, width: 712, height: 30, rx: 6, fill: C.soft });
  const marks = xs.map(x => mk(svg, 'rect', { x: 60 + x * 16 - 3, y: 205, width: 6, height: 20, rx: 2, fill: col }));
  txt(svg, 36, 186, 'PAINT MARKS · EVERY 1 s', { 'font-weight': 600, 'letter-spacing': 1 });
  const g1 = PUC.graph(svg, { x: 80, y: 310, w: 260, h: 170, xmax: 8, ymax: 40 }), g2 = PUC.graph(svg, { x: 456, y: 310, w: 260, h: 170, xmax: 8, ymax: 10 });
  txt(svg, 80, 296, 'x-t', { 'font-weight': 600, fill: C.ink }); txt(svg, 456, 296, 'v-t', { 'font-weight': 600, fill: C.ink });
  const c1 = g1.curve(col), c2 = g2.curve(VC);
  const l1 = txt(svg, 80, 530, lab[0], { 'font-weight': 600, fill: col, 'font-size': 20 }), l2 = txt(svg, 456, 530, lab[1], { 'font-weight': 600, fill: VC, 'font-size': 20 });
  return { marks, c1, c2, l1, l2, xs, vt };
};
const SA = side($('#kaS'), B1, [0, 5, 10, 15, 20, 25, 30, 35, 40], tt => 5, ['straight line', 'flat line: v same']);
const SB = side($('#knS'), B2, [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => 0.625 * k * k), tt => 1.25 * tt, ['curve, bending up', 'sloping line: v grows']);
const tSA = [wt('K2', 'Equal'), wt('K2', 'Straight'), wt('K2', 'Flat')], tSB = [wt('K3', 'Growing'), wt('K3', 'curve'), wt('K3', 'sloping')];
const th1 = PUC.think($('#th1'), { q: 'A train covers 10 km in every 10 minutes for one hour. Is its motion surely uniform?', opts: ['Surely uniform', 'Not surely'], right: 1, why: 'Uniform needs equal displacements in EVERY interval, however small.' });
const th2 = PUC.think($('#th2'), { q: 'Which x-t graph shows uniform motion?', opts: ['Graph A', 'Graph B'], right: 0, why: 'A straight line has one slope everywhere: constant velocity.' });
const tg = mk($('#th2'), 'svg', { width: 720, height: 250, style: 'position:absolute;left:820px;top:200px' });
const TA = PUC.graph(tg, { x: 40, y: 30, w: 260, h: 170, xmax: 8, ymax: 40 }), TB = PUC.graph(tg, { x: 420, y: 30, w: 260, h: 170, xmax: 8, ymax: 40 });
txt(tg, 40, 236, 'A', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: C.ink }); txt(tg, 420, 236, 'B', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: C.ink });
const tcA = TA.curve(C.ink), tcB = TB.curve(C.ink);

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`t_1 = \\dfrac{600\\,\\text{m}}{${kv('5\\,\\text{m/s}')}} = 120\\,\\text{s}`)],
  [K(`t_2 = \\dfrac{600\\,\\text{m}}{${kv('3\\,\\text{m/s}')}} = 200\\,\\text{s}`)],
  [K(`v_{\\text{avg}} = \\dfrac{1200\\,\\text{m}}{320\\,\\text{s}}`)],
  [K(`v_{\\text{avg}} = ${kv('3.75\\,\\text{m/s}')} \\;\\;(\\text{not } 4)`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WX0 = 60, WPX = 664 / 1200;
mk(w, 'rect', { x: WX0, y: 150, width: 664, height: 30, rx: 6, fill: C.soft }); mk(w, 'line', { x1: WX0, y1: 150, x2: WX0 + 664, y2: 150, stroke: C.ink, 'stroke-width': 3 });
mk(w, 'line', { x1: WX0 + 332, y1: 140, x2: WX0 + 332, y2: 190, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 4' });
const wL = [txt(w, WX0 + 166, 214, '600 m at 5 m/s', { 'text-anchor': 'middle', 'font-weight': 600, fill: B1, 'font-size': 20 }), txt(w, WX0 + 498, 214, '600 m at 3 m/s', { 'text-anchor': 'middle', 'font-weight': 600, fill: B2, 'font-size': 20 })];
const wBike = bikeG(w, C.ink, 1);
txt(w, WX0, 268, 'TIME SPENT', { 'font-weight': 600, 'letter-spacing': 1 });
const tb = [mk(w, 'rect', { x: WX0, y: 280, height: 56, rx: 8, fill: B1, width: 0 }), mk(w, 'rect', { x: WX0, y: 280, height: 56, rx: 8, fill: B2, width: 0 })];
const tbT = [txt(w, WX0 + 249 / 2, 318, '120 s', { 'text-anchor': 'middle', 'font-weight': 600, fill: '#fff', 'font-size': 24 }), txt(w, WX0 + 249 + 415 / 2, 318, '200 s', { 'text-anchor': 'middle', 'font-weight': 600, fill: '#fff', 'font-size': 24 })];
const tot = mk(w, 'path', { d: `M${WX0},352 v10 h664 v-10`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const totT = txt(w, WX0 + 332, 392, '1200 m in 320 s', { 'text-anchor': 'middle', 'font-weight': 600, fill: C.ink, 'font-size': 22 });
const wClock = txt(w, 724, 268, 't = 0 s', { 'text-anchor': 'end', 'font-weight': 600, fill: C.ink, 'font-size': 22 });
const avD = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The slow half takes more of the time!' });
const tW = [wt('W3', 'first'), wt('W4', 'second'), wt('W5', 'Average'), wt('W6', 'three')];
const tWa = T0('W3'), tWb = wt('W5', 'Twelve');          // ride clock: 0 - 320 s over these voice lines
const wPos = ts => ts <= 120 ? 5 * ts : 600 + 3 * (ts - 120);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Circle at constant speed = uniform motion', right: 'Direction changes, so velocity changes: non-uniform' });
const cs = $('#cir'), CX = 200, CY = 146, CR = 82;
mk(cs, 'circle', { cx: CX, cy: CY, r: CR, fill: 'none', stroke: C.line, 'stroke-width': 3, 'stroke-dasharray': '6 8' });
const cg = [0.3, 0.2, 0.12].map(o => mk(cs, 'circle', { r: 11, fill: C.ink, opacity: o })), cd = mk(cs, 'circle', { r: 12, fill: C.ink });
const cva = PUC.arrow(cs, VC, 5, 14);
const cT = txt(cs, CX, 262, 'same speed, new direction', { 'text-anchor': 'middle', 'font-weight': 600, fill: VC, 'font-size': 17 });
const where = PUC.where($('#wa'), { on: [], type: 'Concept MCQs: reading x-t and v-t graphs, and average speed for a journey in parts' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A particle moves along a line with<br>${K('x = 2t^2 - 8t + 5')} &nbsp;(x in m, t in s).<br>Which statement is correct?`,
  opts: ['The motion is uniform, with velocity −8 m/s', 'Non-uniform; it is momentarily at rest at t = 2 s', 'Its acceleration is zero at t = 2 s', 'Its displacement in the first 4 s is 16 m'],
  right: 1, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 290 });
const so = PUC.solution($('#so'), [[K(`${kv('v')} = \\dfrac{dx}{dt} = 4t - 8`)], [K(`${kv('v')} = 0 \\text{ at } t = 2\\,\\text{s}`) + ' <b style="color:var(--ok)">B</b>'], [K(`${ka('a')} = 4\\,\\text{m/s}^2`) + ' &nbsp;<b style="color:var(--red)">A, C</b> wrong'], [K('x(4) = 5 = x(0)') + ' &nbsp;<b style="color:var(--red)">D</b> wrong']], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Velocity'), wt('A2', 'zero'), wt('A3', 'C'), wt('A3', 'D')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · uniform and non-uniform motion', y0: 100, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`\\text{Uniform: } ${kv('v')} = \\text{const},\\;\\; ${ka('a')} = 0,\\;\\; x = x_0 + ${kv('v')}t`),
    '<b>Equal displacements</b> in equal intervals, <b>however small</b>', '<b>x-t graph</b>: straight line = uniform · curve = non-uniform', '<b>Constant speed ≠ constant velocity</b> (a circle is non-uniform)'] });
const YQ = ['Why is "equal distance every minute" not enough to call a motion uniform?', 'What does a straight x-t graph tell you about the velocity?', 'Why is a fan blade turning at constant speed not in uniform motion?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 25', topic: 'Predict where Aarav will be: Equations of Uniformly Accelerated Motion', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS9 + 0.1, 1.06, 960, 560], [tD1 - 0.5, 1, 960, 540]]);
const f1 = v => v.toFixed(1);
let geo = null;
function measure() {
  geo = 1;
  const h0 = $('#hq0'), h1 = $('#hq1'); h1.style.left = (h0.offsetLeft + h0.offsetWidth + 16) + 'px';
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
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    const tm = wt('H2', 'moving'); [0, 1, 2].forEach(i => M.vis($('#jq' + i), t, tm - 0.1 + i * 0.1, 1e9, POP));
    const ts = wt('H2', 'simplest'), on = M.io((t - ts) / 0.3), q = $('#jq2');
    M.setT(q, t < ts ? 'MOVING' : 'SIMPLEST?'); q.style.background = mix('#FFFFFF', C.ac, on); q.style.color = mix(C.mute, '#FFFFFF', on);
    $('#jr2').style.background = mix(C.soft, C.ac2, on);
    M.vis($('#hjP'), t, ts + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hq0'), t, wt('H3', 'five') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H4', 'slopes') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pu'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfx'), t, T0('P2') + 0.2, { st: 0.05 });
    rowEls.forEach((r, i) => {
      const t0 = tRow[i]; M.vis(r.g, t, t0 - 0.3, 1e9, { dy: 12 });
      const u = M.clamp((t - t0) / 1.3), xm = 20 * u;
      attr(r.dot, 'cx', (TX0 + xm * TPX).toFixed(1)); M.hide(r.dot, u <= 0 || u >= 1);
      r.marks.forEach((m, k) => M.hide(m, k * 5 * r.dt > xm + 1e-6 || u <= 0));
      r.lab.style.opacity = M.io((t - t0 - 1.3) / 0.3).toFixed(3);
    });
    M.vis($('#puP'), t, wt('P3', 'however') - 0.1, 1e9, POP);
    M.vis($('#pn'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pnQ'), t, wt('P5', 'non') - 0.1, 1e9, POP);
    M.vis($('#pnP'), t, wt('P4', 'not') - 0.1, 1e9, POP);
    NU.forEach((_, i) => { const el = $('#nu' + i); M.vis(el, t, tNu[i] - 0.1, 1e9, POP); M.vis(el.querySelector('.nk'), t, tNu[i] + 0.4, 1e9, { ...POP, sc: 0.4 }); });
  }

  /* S: two bicycles + readout + x-t graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exS'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const st = simT(t), rp = replay(t), fade = rp ? M.clamp((t - tR0 + 0.05) / 0.25) : 1;
    // slow-mo tag
    M.vis($('#slo'), t, tR0 - 0.3, T0('S9') - 0.1, { ...POP, sc: 0.6 });
    M.setT($('#slo'), 'SLOW-MO REPLAY · 0.5x');
    lanes.forEach((L, li) => {
      const xm = L.x(st), bx = RX0 + xm * RPX;
      L.bike.setAttribute('transform', `translate(${bx.toFixed(1)},${L.y})`); L.bike.style.opacity = (t < tS1 + 0.5 ? M.clamp((t - tS1 - 0.2) / 0.3) : fade).toFixed(3);
      const moving = (t > tA && t < tB) || (t > tR0 && t < tR1);
      L.ghosts.forEach((gh, k) => { const gt = Math.max(0, st - (rp ? 0.35 : 0.7) * (k + 1) / 2), gx = RX0 + L.x(gt) * RPX; gh.setAttribute('transform', `translate(${gx.toFixed(1)},${L.y})`); M.hide(gh, !moving || Math.abs(gx - bx) < 6); });
      // paint marks drop once every simulated second
      L.marks.forEach((m, k) => M.hide(m, k > st + 1e-6 || t < tA - 0.05 || (rp && t < tR0)));
      // gap labels during the replay, when the voice reads them
      const tg = li ? wt('S8', 'gaps') : wt('S7', 'equal');
      L.gl.forEach((g, k) => { g.style.opacity = (rp && (li === 0 || k >= 3) ? M.io((t - Math.max(tg, tR0 + (k + 1) / 8 * (tR1 - tR0))) / 0.3) : 0).toFixed(3); });
      M.vis(gapT[li], t, tg - 0.1, 1e9, { dy: 0, dx: 16 });
      // velocity arrows grow in the replay (blue = v for both bikes)
      const vOn = rp ? M.io((t - tR0 - 0.1) / 0.4) : 0, vv = L.v(st), len = 12 * vv * vOn;
      L.va.set(bx, L.y - 70, bx + len, L.y - 70); attr(L.vl, 'x', (bx + len + 8).toFixed(1)); attr(L.vl, 'y', L.y - 62); L.vl.style.opacity = (vOn * M.clamp(len / 20)).toFixed(3);
      if (li === 1) { const al = 22 * AY * vOn; aA.set(bx, L.y - 100, bx + al, L.y - 100); attr(aL, 'x', (bx + al + 8).toFixed(1)); attr(aL, 'y', L.y - 92); aL.style.opacity = vOn.toFixed(3); }
      // readout
      M.setT($('#rx' + (li + 1)), f1(xm) + ' m'); M.setT($('#rv' + (li + 1)), f1(vv) + ' m/s'); M.setT($('#ra' + (li + 1)), li ? '1.25 m/s²' : '0 m/s²');
      // graph: curve draws on the first run, dot follows the bike
      const sc = rp ? 8 : st; gc[li](tt => [tt, L.x(tt)], 0, sc); gd[li](st, xm, t > tA - 0.1);
    });
    M.setT($('#tR'), 't = ' + f1(st) + ' s');
    M.vis($('#tR'), t, tA - 0.2, 1e9, { dy: 0 });
    attr(gT[0], 'x', G.X(1.0)); attr(gT[0], 'y', G.Y(24)); attr(gT[1], 'x', G.X(6.2)); attr(gT[1], 'y', G.Y(10));
    M.vis(gT[0], t, wt('S9', 'straight') - 0.1, 1e9, { dy: 0 }); M.vis(gT[1], t, wt('S9', 'curve') - 0.1, 1e9, { dy: 0 });
    avA(t, wt('S5', 'Same') + 0.2, tR0 - 0.4);
  }

  /* D: link by link */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.7); M.vis(el.querySelector('.why'), t, tStep[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    hb.style.background = mix(C.ac2, C.redBg, M.io((t - tStep[4] + 0.1) / 0.3));
    M.vis($('#dr'), t, T0('D2') - 0.1, 1e9, { dx: 60, dy: 0 });
    const u0 = M.io((t - wt('D4', 'grows')) / 1.2); dc[0](tt => [tt, 5 * tt], 0, 8 * u0);
    const tsl = wt('D5', 'slope'); stair[0].forEach((p, k) => M.draw(p, t, wt('D5', 'straight') + k * 0.12, 0.3));
    PUC.write(sl, t, tsl, 0.7);
    const u1 = M.io((t - wt('D6', 'curves')) / 1.0); dc[1](tt => [tt, 0.625 * tt * tt], 0, 8 * u1);
    stair[1].forEach((p, k) => M.draw(p, t, wt('D6', 'acceleration') + k * 0.1, 0.3));
    M.vis(sl2, t, wt('D6', 'curves') + 0.5, 1e9, POP);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Uniform') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'zero') - 0.3, 0.8);
  }

  /* K: side by side + two pause-and-think checks */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kn'), t, T0('K3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [[SA, tSA], [SB, tSB]].forEach(([S, ts]) => {
      S.marks.forEach((m, k) => M.vis(m, t, ts[0] - 0.1 + k * 0.08, 1e9, { dy: -10, fade: 0.1 }));
      const u1 = M.io((t - ts[1] + 0.1) / 0.6), u2 = M.io((t - ts[2] + 0.1) / 0.6);
      S.c1(tt => [tt, S === SA ? 5 * tt : 0.625 * tt * tt], 0, 8 * u1); S.c2(tt => [tt, S.vt(tt)], 0, 8 * u2);
      S.l1.style.opacity = u1.toFixed(3); S.l2.style.opacity = u2.toFixed(3);
    });
    M.vis($('#th1'), t, tK4 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'surely') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Uniform') });
    M.vis($('#th2'), t, tG1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG1, tOpts: wt('G2', 'Which') - 0.1, tCount: T1('G2') + 0.05, dur: 3, tAns: T0('G3') - 0.02, tWhy: wt('G3', 'straight') });
    tcA(tt => [tt, 4.5 * tt], 0, 8 * M.io((t - wt('G2', 'straight') + 0.1) / 0.6));
    tcB(tt => [tt, 0.56 * tt * tt], 0, 8 * M.io((t - wt('G2', 'bends') + 0.1) / 0.6));
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wL[0], t, wt('W2', 'five') - 0.1, 1e9, { dy: 8 }); M.vis(wL[1], t, wt('W2', 'three') - 0.1, 1e9, { dy: 8 });
    const ts = 320 * M.clamp((t - tWa) / (tWb - tWa)), wx = wPos(ts);
    wBike.setAttribute('transform', `translate(${(WX0 + wx * WPX).toFixed(1)},150)`); wBike.style.opacity = M.clamp((t - T0('W2') - 0.4) / 0.3).toFixed(3);
    M.setT(wClock, 't = ' + Math.round(ts) + ' s'); M.vis(wClock, t, tWa - 0.2, 1e9, { dy: 0 });
    attr(tb[0], 'width', (249 * Math.min(ts, 120) / 120).toFixed(1)); attr(tb[1], 'x', WX0 + 249); attr(tb[1], 'width', (415 * M.clamp((ts - 120) / 200)).toFixed(1));
    tbT[0].style.opacity = M.clamp((ts - 100) / 20).toFixed(3); tbT[1].style.opacity = M.clamp((ts - 300) / 20).toFixed(3);
    M.draw(tot, t, wt('W5', 'total') - 0.1, 0.5); M.vis(totT, t, wt('W5', 'Twelve') - 0.1, 1e9, { dy: 8 });
    avD(t, wt('W6', 'spends') - 0.1, out);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'body') - 0.1, tStrike: wt('X3', 'direction') - 0.1, tRight: wt('X3', 'velocity') + 0.1 });
    const c0 = wt('X2', 'circle') - 0.2, on = M.clamp((t - c0) / 0.3), th = (t - c0) * Math.PI / 2;
    [cd, ...cg].forEach((c, k) => { const a = th - 0.22 * k; attr(c, 'cx', (CX + CR * Math.cos(a)).toFixed(1)); attr(c, 'cy', (CY + CR * Math.sin(a)).toFixed(1)); c.style.opacity = (on * (k ? [0.3, 0.2, 0.12][k - 1] : 1)).toFixed(3); });
    const px = CX + CR * Math.cos(th), py = CY + CR * Math.sin(th), va = M.io((t - wt('X3', 'direction') + 0.2) / 0.4) * on;
    cva.set(px, py, px - 70 * va * Math.sin(th), py + 70 * va * Math.cos(th)); cT.style.opacity = va.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'concept') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
