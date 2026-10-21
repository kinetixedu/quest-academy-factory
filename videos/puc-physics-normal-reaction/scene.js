// PUC Physics Ep 60: Normal reaction (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, GC = C.gold, MC = C.ink;          // every force orange (N, mg, F, friction), theta gold, mass and readings ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const NN = tc(FC, 'N'), MG = tc(FC, 'mg'), FF = tc(FC, 'F'), TH = tc(GC, '\\theta');
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const G = 9.8, M2 = 2, W2 = M2 * G;                     // the sim box: 2 kg, mg = 19.6 N
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2);
const grow = (t, t0, d = 0.5) => M.o3((t - t0 + 0.1) / d);

Object.assign(M.IC, {
  bscale: ['M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z', 'M8.5 10a3.5 3.5 0 0 1 7 0', 'M12 10l1.6-2'],
  bed: ['M2 19V7', 'M2 15h20v4', 'M22 15v-3a3 3 0 0 0-3-3H10v6', 'M6.5 12a1.5 1.5 0 1 0 0-.01'],
  car: ['M3 16h18v-4l-2-1-2-4H8l-3 4-2 1z', 'M7.5 18.5a1.5 1.5 0 1 0 0-.01', 'M16.5 18.5a1.5 1.5 0 1 0 0-.01'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v6', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  up: ['M12 19V5', 'm5 12 7-7 7 7'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS7 = T0('S7'), tS11 = T0('S11'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bscale', 'Bathroom scale', 'IT PUSHES YOU UP', 0], ['bed', 'Soft mattress', 'IT PUSHES BACK', 0], ['car', 'Steep road', 'IT PUSHES AT A TILT', 20]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'bathroom'), wt('H1', 'mattress'), wt('H1', 'car')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="250" height="100"></svg></div>`).join('');
const JA = JOBS.map(([, , , ang], i) => { const s = $('#jsv' + i), a = ang * Math.PI / 180, cx = 125, cy = 80, c = Math.cos(a), sn = Math.sin(a);
  mk(s, 'line', { x1: cx - 90 * c, y1: cy + 90 * sn, x2: cx + 90 * c, y2: cy - 90 * sn, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const ar = PUC.arrow(s, FC, 6, 16); return { ar, cx, cy, nx: -sn, ny: -c }; });
const TILES = [[FC, 'She presses the lid', 'arrowD'], [C.ink, 'The scale jumps', 'up'], [C.ink, 'Not heavier!', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'presses'), wt('H4', 'jumps'), wt('H4', 'heavier')];

/* ---------- P: what it is ---------- */
$('#defQ').innerHTML = 'When a body presses on a surface, the surface <span class="acc">pushes back.</span>';
const LP = [['Its name: the normal reaction, N', 36, 252, 'ac'], ['Normal = perpendicular', 36, 330, ''], ['A contact force', 36, 408, ''], ['Only pushes, never pulls', 290, 408, '']];
$('#lps').innerHTML = LP.map(([s, x, y, c], i) => `<div class="lp${c ? ' pillp ac' : ''}" id="lp${i}" style="left:${x}px;top:${y}px">${s}</div>`).join('');
const tLp = [wt('P2', 'normal'), wt('P3', 'Normal'), wt('P4', 'contact'), wt('P5', 'only')];
const pm = $('#pmS'), PB = 'rgb(141,153,174)';
// three surfaces: floor, ramp, wall. Each: outer g (vis) > inner g
const pmG = [0, 1, 2].map(() => { const o = mk(pm, 'g', {}); return { o, g: mk(o, 'g', {}) }; });
const GY = 470;
// floor (x 36-236)
ground(pmG[0].g, 36, 236, GY);
const pBlk0O = mk(pmG[0].g, 'g', {}), pBlk0 = mk(pBlk0O, 'g', {}); mk(pBlk0, 'rect', { x: 66, y: GY - 90, width: 140, height: 90, rx: 10, fill: PB, stroke: C.ink, 'stroke-width': 2.5 });
txt(pmG[0].g, 136, GY + 48, 'FLOOR', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
// ramp (x 260-500), 30 degrees, rising to the right
const RA = 30 * Math.PI / 180, rc = Math.cos(RA), rs = Math.sin(RA), R0 = [262, GY];
const rp = (x, y) => [R0[0] + x * rc + y * rs, R0[1] - x * rs + y * rc];
mk(pmG[1].g, 'path', { d: `M${R0[0]},${R0[1]} L${rp(270, 0)[0]},${R0[1]} L${rp(270, 0)[0]},${rp(270, 0)[1]} Z`, fill: '#EFE6D6', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(pmG[1].g, 'rect', { x: 0, y: -80, width: 116, height: 80, rx: 10, fill: PB, stroke: C.ink, 'stroke-width': 2.5, transform: `translate(${rp(80, 0)[0]},${rp(80, 0)[1]}) rotate(-30)` });
txt(pmG[1].g, 380, GY + 48, 'RAMP', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
// wall (x 560-748)
mk(pmG[2].g, 'rect', { x: 704, y: 180, width: 24, height: GY - 180, fill: '#EFE6D6', stroke: C.ink, 'stroke-width': 2.5 });
mk(pmG[2].g, 'rect', { x: 614, y: 300, width: 90, height: 110, rx: 10, fill: PB, stroke: C.ink, 'stroke-width': 2.5 });
txt(pmG[2].g, 660, GY + 48, 'WALL', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const pN = [PUC.arrow(pm, FC, 8, 22), PUC.arrow(pm, FC, 8, 22), PUC.arrow(pm, FC, 8, 22)];
const pNl = [it(pm, 0, 0, 'N', FC, { 'font-size': 32 }), it(pm, 0, 0, 'N', FC, { 'font-size': 32 }), it(pm, 0, 0, 'N', FC, { 'font-size': 32, 'text-anchor': 'middle' })];
const sq = (x, y, ux, uy, vx, vy) => `M${x + ux * 18},${y + uy * 18} L${x + ux * 18 + vx * 18},${y + vy * 18} L${x + vx * 18},${y + vy * 18}`;
const rtA = [mk(pm, 'path', { d: sq(100, GY - 90, 1, 0, 0, -1), fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }),
  mk(pm, 'path', { d: sq(...rp(110, -80), rc, -rs, -rs, -rc), fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }),
  mk(pm, 'path', { d: sq(614, 340, 0, 1, -1, 0), fill: 'none', stroke: C.ink, 'stroke-width': 2.5 })];
const p90 = txt(pm, 392, 112, 'N always leaves the surface at 90°', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
// "never pulls": a crossed arrow that would pull the block into the wall
const pPullO = mk(pm, 'g', {}); const pPullA = PUC.arrow(pPullO, C.red, 6, 16); pPullA.set(540, 436, 600, 436);
mk(pPullO, 'path', { d: 'M558,424 L582,448 M582,424 L558,448', stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' });
txt(pPullO, 570, 412, 'no pull', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 18 });

/* ---------- S: a box on a scale (sim) ---------- */
const s = $('#simS'), PX = 250, PY = 470, PL = 280, KS = 1.4, NS = 5;     // rig drawn 1.2x     // pivot, plank length, 4 px per newton
ground(s, 30, 754, PY);
const wedge = mk(s, 'path', { d: '', fill: '#EFE6D6', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
const arc = mk(s, 'path', { d: '', fill: 'none', stroke: GC, 'stroke-width': 4 }), arcL = it(s, 0, 0, 'θ', GC, { 'font-size': 26 });
const ghosts = [0, 1, 2].map(() => { const g = mk(s, 'g', {}); mk(g, 'rect', { x: 60, y: -192, width: 160, height: 130, rx: 8, fill: PB }); mk(g, 'rect', { x: 0, y: -14, width: PL, height: 14, fill: '#C9A27A' }); g.style.opacity = 0; return g; });
const rigO = mk(s, 'g', {}), rig = mk(rigO, 'g', {});
mk(rig, 'rect', { x: 0, y: -14, width: PL, height: 14, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
mk(rig, 'rect', { x: 30, y: -54, width: 220, height: 40, rx: 6, fill: '#E6E8EE', stroke: C.ink, 'stroke-width': 2.5 });
mk(rig, 'rect', { x: 20, y: -62, width: 240, height: 8, rx: 3, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2 });
mk(rig, 'rect', { x: 80, y: -48, width: 120, height: 28, rx: 4, fill: C.ink });
const lcdS = txt(rig, 140, -27, '2.00 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const boxO = mk(rig, 'g', {}); mk(boxO, 'rect', { x: 60, y: -192, width: 160, height: 130, rx: 8, fill: PB, stroke: C.ink, 'stroke-width': 2.5 });
txt(boxO, 182, -164, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 22 });
mk(s, 'circle', { cx: PX, cy: PY, r: 7, fill: C.ink });
const handO = mk(s, 'g', {}), hand = mk(handO, 'g', {});
hand.innerHTML = M.icon('hand', 64, C.ink, 2.2).replace('<svg ', '<svg x="' + (PX + 100) + '" y="0" ');
const sN = PUC.arrow(s, FC, 7, 20), sW = PUC.arrow(s, FC, 7, 20), sF = PUC.arrow(s, FC, 7, 20), sC = PUC.arrow(s, FC, 5, 16), sS = PUC.arrow(s, FC, 5, 16), sFr = PUC.arrow(s, FC, 6, 18);
[sC, sS].forEach(a => a.g.querySelector('path').setAttribute('stroke-dasharray', '8 7'));
const lN = it(s, 0, 0, 'N', FC), lW = it(s, 0, 0, 'mg', FC), lF = it(s, 0, 0, 'F', FC);
const lC = txt(s, 0, 0, 'mg cos θ', { fill: FC, 'font-weight': 700, 'font-size': 20 }), lS = txt(s, 0, 0, 'mg sin θ', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }), lFr = txt(s, 0, 0, 'friction', { fill: FC, 'font-weight': 700, 'font-size': 19 });
[lN, lW, lF, lC, lS, lFr].forEach(e => { e.setAttribute('paint-order', 'stroke'); e.setAttribute('stroke', '#fff'); e.setAttribute('stroke-width', 6); e.setAttribute('stroke-linejoin', 'round'); });
const thL = txt(s, 0, 0, '', { fill: GC, 'font-weight': 700, 'font-size': 22 });
// local -> global for the rig rotated about the pivot by theta (rising to the right)
const Gp = (x, y, c, sn) => [PX + KS * (x * c + y * sn), PY + KS * (-x * sn + y * c)];
// readout
$('#roL').innerHTML = `<span class="k" style="color:${FC}">mg</span><span class="v" id="r_W" style="color:${FC}">19.6</span><span class="u">N</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_F" style="color:${FC}">0.0</span><span class="u" id="r_Fu">N</span>
  <span class="k" style="color:${GC}">θ</span><span class="v" id="r_T" style="color:${GC}">0°</span><span class="u"></span>`;
$('#roR').innerHTML = `<span class="k" style="color:${FC}">N</span><span class="v" id="r_N" style="color:${FC}">19.6</span><span class="u">N</span>
  <span class="k n">scale</span><span class="v" id="r_S">2.00</span><span class="u">kg</span>
  <span class="k" style="color:${MC}">m</span><span class="v">2.00</span><span class="u">kg</span>`;
// graph A: N against the push F (push down +, pull up -), N = mg + F, never below zero
const gA = $('#grA'), AX0 = 130, AW = 540, AY0 = 62, AH = 136, AXm = -20, AXM = 20, AYM = 40;
const aX = v => AX0 + AW * (v - AXm) / (AXM - AXm), aY = v => AY0 + AH - AH * v / AYM;
mk(gA, 'path', { d: `M${AX0},${AY0} V${AY0 + AH} H${AX0 + AW}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
mk(gA, 'line', { x1: aX(0), y1: AY0, x2: aX(0), y2: AY0 + AH, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.35 });
[-20, -10, 0, 10, 20].forEach(v => { mk(gA, 'line', { x1: aX(v), y1: AY0 + AH, x2: aX(v), y2: AY0 + AH + 8, stroke: C.ink, 'stroke-width': 2 }); txt(gA, aX(v), AY0 + AH + 32, v, { 'text-anchor': 'middle' }); });
[0, 20, 40].forEach(v => { mk(gA, 'line', { x1: AX0 - 8, y1: aY(v), x2: AX0, y2: aY(v), stroke: C.ink, 'stroke-width': 2 }); txt(gA, AX0 - 14, aY(v) + 6, v, { 'text-anchor': 'end' }); });
txt(gA, AX0 + 12, AY0 + 6, 'N (N)'); txt(gA, AX0 + AW + 16, AY0 + AH + 6, 'F (N)');
txt(gA, aX(-20), AY0 + AH + 58, '← pull up', { 'font-size': 16, fill: FC, 'font-weight': 600 }); txt(gA, aX(20), AY0 + AH + 58, 'push down →', { 'font-size': 16, fill: FC, 'font-weight': 600, 'text-anchor': 'end' });
const aGhost = mk(gA, 'path', { d: `M${aX(-20)},${aY(0)} L${aX(-W2)},${aY(0)} L${aX(20)},${aY(W2 + 20)}`, fill: 'none', stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '4 8', opacity: 0.5 });
const aMg = mk(gA, 'line', { x1: AX0, y1: aY(W2), x2: aX(0), y2: aY(W2), stroke: C.ink, 'stroke-width': 1.5, 'stroke-dasharray': '5 6', opacity: 0.6 });
const aMgL = txt(gA, AX0 + 10, aY(W2) - 8, 'mg = 19.6', { 'font-size': 16, fill: C.ink, 'font-weight': 600 });
const aLine = mk(gA, 'path', { d: '', fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' }), aDot = mk(gA, 'circle', { r: 11, fill: FC, cx: aX(0), cy: aY(W2) });
const aTag = document.createElement('div'); aTag.className = 'pillp'; aTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px;background:var(--ac2)'; aTag.innerHTML = '+1 N of push &rarr; +1 N on N'; $('#gr').appendChild(aTag);
// graph B: N against the ramp angle, N = mg cos theta
const gB = PUC.graph($('#grB'), { x: 130, y: 64, w: 560, h: 156, xmax: 90, ymin: 0, ymax: 24, xt: [0, 30, 60, 90], yt: [0, 10, 20], yl: 'N (N)' });
txt($('#grB'), 130 + 560 + 16, 64 + 156 + 6, 'θ (°)');
mk($('#grB'), 'path', { d: Array.from({ length: 61 }, (_, i) => { const a = 90 * i / 60; return (i ? 'L' : 'M') + gB.X(a).toFixed(1) + ',' + gB.Y(W2 * Math.cos(a * Math.PI / 180)).toFixed(1); }).join(' '), fill: 'none', stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '4 8', opacity: 0.5 });
const bCurve = gB.curve(FC), bDot = gB.dot(FC, 11);
const bHalf = mk($('#grB'), 'g', {}); mk(bHalf, 'line', { x1: gB.X(60), y1: gB.Y(0), x2: gB.X(60), y2: gB.Y(9.8), stroke: C.ink, 'stroke-width': 1.5, 'stroke-dasharray': '5 6' });
txt(bHalf, gB.X(60) + 14, gB.Y(9.8) - 12, 'half of mg', { fill: C.ink, 'font-weight': 600, 'font-size': 17 });
// timing of the sim
const tPress = wt('S3', 'presses') - 0.1, tLift = wt('S4', 'lifts') - 0.1, tBack = wt('S5', 'every') - 0.2, tHandOut = T0('S6') - 0.2;
const Ft = M.keys([[0, 0], [tPress, 10], [tLift, -10], [tBack, 0]], 1.3, M.io);
const tTilt = wt('S6', 'tilt') - 0.1, tRw = tS7 + 0.1, tSlo = tS7 + 0.6, tRun = wt('S10', 'run') - 0.1, SLO = 25 / 8;   // 12.5 deg/s, replay at 0.25x
const thT = t => {
  if (t < tRw) return 30 * M.io((t - tTilt) / 2.4);
  if (t < tSlo) return 30 - 8 * M.io((t - tRw) / 0.45);
  if (t < tRun) return Math.min(30, 22 + SLO * (t - tSlo));
  return 30 + 30 * M.io((t - tRun) / 2.6);
};
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 490, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my scale shows N, not my cooker\'s mass!' });
const th1 = PUC.think($('#th1'), { q: 'You press a book flat against a wall with 15 N. It stays still. What is N?', opts: ['15 N', 'The book\'s weight, mg'], right: 0, why: 'The wall balances your push. The weight runs along the wall.' });

/* ---------- D: the rule ---------- */
const STEPS = [[`\\text{forces} \\perp \\text{surface}: \\ \\textstyle\\sum = 0`, 'no sinking in, no jumping off'],
  [`${NN} - ${MG} = 0 \\;\\Rightarrow\\; ${NN} = ${MG}`, 'flat surface, nothing else acting'],
  [`${NN} = ${MG} + ${FF}`, 'pushed down: N holds up more'],
  [`${NN} = ${MG} - ${FF}`, 'pulled up: your pull does part of the job'],
  [`${NN} = ${MG}\\cos ${TH}`, 'ramp: only this part presses in']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const PN = [['FLAT', `${NN} = ${MG}`, 36, 84, 0], ['PUSHED DOWN', `${NN} = ${MG} + ${FF}`, 408, 84, 1], ['PULLED UP', `${NN} = ${MG} - ${FF}`, 36, 336, -1], ['RAMP', `${NN} = ${MG}\\cos${TH}`, 408, 336, 2]];
$('#pns').innerHTML = PN.map(([n, f, x, y], i) => `<div class="pn" id="pn${i}" style="left:${x}px;top:${y}px"><svg id="pnS${i}" width="340" height="236"></svg><div class="pt">${n}</div><div class="pf">${K(f)}</div></div>`).join('');
const PA = PN.map(([, , , , kind], i) => {
  const p = kind < 2 ? mk($('#pnS' + i), 'g', { transform: 'translate(-34,-40) scale(1.2)' }) : $('#pnS' + i), o = {};
  if (kind < 2) {
    mk(p, 'line', { x1: 30, y1: 196, x2: 310, y2: 196, stroke: C.ink, 'stroke-width': 3 });
    mk(p, 'rect', { x: 125, y: 132, width: 90, height: 64, rx: 8, fill: PB, stroke: C.ink, 'stroke-width': 2.5 });
    o.perp = mk(p, 'line', { x1: 170, y1: 70, x2: 170, y2: 228, stroke: C.ac, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
    o.N = PUC.arrow(p, FC, 6, 16); o.W = PUC.arrow(p, FC, 6, 16); o.F = PUC.arrow(p, FC, 6, 16);
    o.lN = it(p, 112, 0, 'N', FC, { 'font-size': 24, 'text-anchor': 'end' }); o.lW = it(p, 238, 214, 'mg', FC, { 'font-size': 22 }); o.lF = it(p, 238, 0, 'F', FC, { 'font-size': 24 });
    o.draw = (u1, u2, u3) => {    // u1 mg, u2 N, u3 F
      const fz = kind === 0 ? 0 : 30 * kind, nL = 60 + fz;
      o.W.set(200, 164, 200, 164 + 62 * u1); o.lW.style.opacity = u1;
      o.N.set(140, 196, 140, 196 - nL * u2); attr(o.lN, 'y', 196 - nL * u2 + 10); attr(o.lN, 'x', 130); o.lN.style.opacity = u2;
      if (kind === 1) { o.F.set(200, 132 - 40 * u3, 200, 132); attr(o.lF, 'y', 114); attr(o.lF, 'x', 212); }
      else if (kind === -1) { o.F.set(200, 132, 200, 132 - 40 * u3); attr(o.lF, 'y', 104); attr(o.lF, 'x', 212); }
      else o.F.set(0, 0, 0, 0);
      o.lF.style.opacity = kind ? u3 : 0;
    };
  } else {
    const c = Math.cos(RA), sn = Math.sin(RA), P0 = [40, 210], q = (x, y) => [P0[0] + x * c + y * sn, P0[1] - x * sn + y * c];
    mk(p, 'path', { d: `M${P0[0]},${P0[1]} L${q(300, 0)[0]},${P0[1]} L${q(300, 0)[0]},${q(300, 0)[1]} Z`, fill: '#EFE6D6', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
    mk(p, 'rect', { x: 0, y: -56, width: 84, height: 56, rx: 8, fill: PB, stroke: C.ink, 'stroke-width': 2.5, transform: `translate(${q(120, 0)[0]},${q(120, 0)[1]}) rotate(-30)` });
    const cc = q(162, -28), ct = q(140, 0);
    o.N = PUC.arrow(p, FC, 6, 16); o.W = PUC.arrow(p, FC, 6, 16); o.Cc = PUC.arrow(p, FC, 4, 13); o.Cc.g.querySelector('path').setAttribute('stroke-dasharray', '6 6');
    o.lN = it(p, 0, 0, 'N', FC, { 'font-size': 24, 'text-anchor': 'end' }); o.lW = it(p, cc[0] + 10, cc[1] + 70, 'mg', FC, { 'font-size': 22 });
    mk(p, 'path', { d: `M${P0[0] + 54},${P0[1]} A54,54 0 0 0 ${P0[0] + 54 * c},${P0[1] - 54 * sn}`, fill: 'none', stroke: GC, 'stroke-width': 3 }); it(p, P0[0] + 62, P0[1] - 10, 'θ', GC, { 'font-size': 20 });
    o.draw = (u1, u2) => {
      o.W.set(cc[0], cc[1], cc[0], cc[1] + 62 * u1); o.lW.style.opacity = u1;
      const nl = 62 * c * u2; o.N.set(ct[0], ct[1], ct[0] - sn * nl, ct[1] - c * nl); attr(o.lN, 'x', ct[0] - sn * nl - 8); attr(o.lN, 'y', ct[1] - c * nl + 4); o.lN.style.opacity = u2;
      o.Cc.set(cc[0], cc[1], cc[0] + sn * 62 * c * u1, cc[1] + c * 62 * c * u1);
    };
  }
  return o;
});
$('#stF').innerHTML = K(`${NN} = ${MG} \\qquad ${NN} = ${MG} \\pm ${FF} \\qquad ${NN} = ${MG}\\cos ${TH}`);

/* ---------- K: pushed down vs pulled up ---------- */
const kScene = (svg, dir) => {
  const k = mk($(svg), 'g', { transform: 'translate(-98,-110) scale(1.25)' }), Y = 440; ground(k, 40, 744, Y);
  mk(k, 'rect', { x: 200, y: Y - 40, width: 300, height: 40, rx: 6, fill: '#E6E8EE', stroke: C.ink, 'stroke-width': 2.5 });
  mk(k, 'rect', { x: 190, y: Y - 48, width: 320, height: 8, rx: 3, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2 });
  mk(k, 'rect', { x: 260, y: Y - 188, width: 180, height: 140, rx: 8, fill: PB, stroke: C.ink, 'stroke-width': 2.5 });
  txt(k, 350, Y - 150, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 22 });
  const o = { N: PUC.arrow(k, FC, 7, 20), W: PUC.arrow(k, FC, 7, 20), F: PUC.arrow(k, FC, 7, 20) };
  o.lN = txt(k, 0, 0, 'N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' }); o.lW = txt(k, 418, 0, 'mg 19.6 N', { fill: FC, 'font-weight': 700, 'font-size': 20 }); o.lF = txt(k, 0, 0, 'F 10 N', { fill: FC, 'font-weight': 700, 'font-size': 20 });
  [o.lN, o.lW, o.lF].forEach(e => { e.setAttribute('paint-order', 'stroke'); e.setAttribute('stroke', '#fff'); e.setAttribute('stroke-width', 6); e.setAttribute('stroke-linejoin', 'round'); });
  const nT = W2 + 10 * dir;
  o.run = (t, tF, tNn) => {
    const u1 = grow(t, tF), u2 = grow(t, tNn, 0.7), nl = 4 * M.lerp(W2, nT, u2);
    o.W.set(400, Y - 118, 400, Y - 118 + 4 * W2); attr(o.lW, 'y', Y - 118 + 4 * W2 - 8);
    o.N.set(300, Y - 48, 300, Y - 48 - nl); attr(o.lN, 'x', 288); attr(o.lN, 'y', Y - 48 - nl + 14); M.setT(o.lN, 'N ' + f1(M.lerp(W2, nT, u2)) + ' N');
    const fl = 4 * 10 * 1.5 * u1;
    if (dir > 0) o.F.set(400, Y - 192 - fl, 400, Y - 192); else o.F.set(400, Y - 192, 400, Y - 192 - fl);
    attr(o.lF, 'x', 414); attr(o.lF, 'y', Y - 200 - fl * 0.5 + (dir > 0 ? -10 : 0)); o.lF.style.opacity = u1.toFixed(3);
  };
  return o;
};
const kF = kScene('#kfS', 1), kM = kScene('#kmS', -1);
const th2 = PUC.think($('#th2'), { q: 'Pull the 2 kg box up with 25 N. How hard does the scale push on it?', opts: ['-5.4 N', '0 N'], right: 1, why: 'A surface can only push. N stops at zero; the box lifts off.' });

/* ---------- W: Diya's cooker ---------- */
$('#wkq').innerHTML = `Diya's cooker is ${K('3\\ \\text{kg}')}. She presses the lid down with ${K(tc(FC, '15\\ \\text{N}'))}. Find ${K(NN)} and the scale reading. ${K('g = 9.8\\ \\text{m/s}^2')}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${MG} = 3 \\times 9.8 = ${tc(FC, '29.4\\ \\text{N}')}`)],
  [K(`${NN} = ${MG} + ${FF} = 29.4 + 15 = ${tc(FC, '44.4\\ \\text{N}')}`)],
  [K(`\\text{reading} = ${NN}/g = 44.4/9.8 \\approx 4.53\\ \\text{kg}`)]], { label: 'WORKED EXAMPLE', y0: 250, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY = 470;
ground(w, 40, 744, WY);
mk(w, 'rect', { x: 210, y: WY - 44, width: 300, height: 44, rx: 6, fill: '#E6E8EE', stroke: C.ink, 'stroke-width': 2.5 });
mk(w, 'rect', { x: 200, y: WY - 52, width: 320, height: 8, rx: 3, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2 });
// pressure cooker: body, rim, lid, weight valve and handle
mk(w, 'rect', { x: 260, y: WY - 200, width: 200, height: 148, rx: 18, fill: '#C9CED8', stroke: C.ink, 'stroke-width': 2.5 });
mk(w, 'rect', { x: 250, y: WY - 214, width: 220, height: 18, rx: 8, fill: '#AEB4C0', stroke: C.ink, 'stroke-width': 2.5 });
mk(w, 'rect', { x: 350, y: WY - 238, width: 20, height: 24, rx: 4, fill: C.ink });
mk(w, 'rect', { x: 470, y: WY - 210, width: 120, height: 14, rx: 7, fill: C.ink });
txt(w, 360, WY - 120, '3 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22 });
const wHandO = mk(w, 'g', {}), wHand = mk(wHandO, 'g', {}); wHand.innerHTML = M.icon('hand', 60, C.ink, 2.2).replace('<svg ', '<svg x="268" y="' + (WY - 290) + '" ');
const wW = PUC.arrow(w, FC, 7, 20), wN = PUC.arrow(w, FC, 7, 20), wF = PUC.arrow(w, FC, 7, 20);
const wlW = txt(w, 0, 0, 'mg 29.4 N', { fill: FC, 'font-weight': 700, 'font-size': 20 }), wlN = txt(w, 0, 0, 'N 44.4 N', { fill: FC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }), wlF = txt(w, 0, 0, 'F 15 N', { fill: FC, 'font-weight': 700, 'font-size': 20 });
[wlW, wlN, wlF].forEach(e => { e.setAttribute('paint-order', 'stroke'); e.setAttribute('stroke', '#fff'); e.setAttribute('stroke-width', 6); e.setAttribute('stroke-linejoin', 'round'); });
const tW = [T0('W3'), T0('W4'), T0('W5')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'On a ramp, N = mg sin θ', right: 'N = mg cos θ: on flat ground it must give mg' });
const tp = $('#tpS'), TPv = [60, 200];
mk(tp, 'line', { x1: 20, y1: TPv[1], x2: 540, y2: TPv[1], stroke: C.ink, 'stroke-width': 3 });
const tpO = mk(tp, 'g', {}), tpG = mk(tpO, 'g', {});
mk(tpG, 'rect', { x: 0, y: -12, width: 340, height: 12, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
mk(tpG, 'rect', { x: 170, y: -76, width: 100, height: 64, rx: 8, fill: PB, stroke: C.ink, 'stroke-width': 2.5 });
const tpArc = mk(tp, 'path', { d: '', fill: 'none', stroke: GC, 'stroke-width': 3.5 }), tpL = txt(tp, 0, 0, '', { fill: GC, 'font-weight': 700, 'font-size': 22 });
$('#tc0').innerHTML = M.icon('x', 22, C.red, 3) + K(`${MG}\\sin 0 = 0`); $('#tc1').innerHTML = M.icon('check', 22, C.ok, 3) + K(`${MG}\\cos 0 = ${MG}`);
const where = PUC.where($('#wa'), { on: [], type: 'Free-body numericals: blocks on ramps, pushed or pulled at an angle' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 392,
  q: `A ${K('4\\ \\text{kg}')} block is on a floor. A ${K(tc(FC, '40\\ \\text{N}'))} force at ${K(tc(GC, '30°'))} to the horizontal first pushes down on it, then pulls up. ${K('g = 10\\ \\text{m/s}^2')}. Find ${K(`${NN}_{\\text{push}} : ${NN}_{\\text{pull}}`)}.`,
  opts: ['1 : 1', '2 : 1', '3 : 1', '3 : 2'], right: 2 });
const so = PUC.solution($('#so'), [[K(`${FF}\\sin 30° = 40 \\times 0.5 = 20\\ \\text{N}`)], [K(`\\text{push: } ${NN} = 40 + 20 = 60\\ \\text{N}`)], [K(`\\text{pull: } ${NN} = 40 - 20 = 20\\ \\text{N}`)], [K(`60 : 20 = ${tc(C.ok, '3 : 1')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'vertical'), wt('A3', 'Pushing'), wt('A3', 'Pulling'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · normal reaction', y0: 100, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`\\text{flat: } ${NN} = ${MG} \\qquad \\text{push or pull: } ${NN} = ${MG} \\pm ${FF}`),
    K(`\\text{ramp: } ${NN} = ${MG}\\cos ${TH}`),
    '<b>N</b> is perpendicular to the surface. It only pushes, never pulls.',
    'A scale reads <b>N</b>, not your mass'] });
const YQ = ['Why did the scale jump when Diya pressed the lid?', 'Can a normal reaction ever pull a body?', 'On a ramp, why is N = mg cos θ, and not mg sin θ?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 61', topic: 'Is a rope\'s pull always the bucket\'s weight? Tension', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S7', 'Freeze'), 1.06, 960, 540], [T0('S10') - 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }
const sinD = d => Math.sin(d * Math.PI / 180), cosD = d => Math.cos(d * Math.PI / 180);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = M.o3((t - tMorph - 0.8 - i * 0.4) / 0.5), q = JA[i];
      q.ar.set(q.cx, q.cy - 4, q.cx + q.nx * (4 + 64 * u), q.cy - 4 + q.ny * (64 * u)); });
    vis($('#hjP'), t, wt('H2', 'pushing') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const tJ = wt('H4', 'jumps') - 0.1, u = M.io((t - tJ) / 0.6);
    vis($('#lcd'), t, wt('H3', 'reads') - 0.2, 1e9, POP);
    M.setT($('#lcdN'), f2(3 + 1.53 * u)); $('#lcd').style.background = mix(C.ink, C.red, u * (1 - M.io((t - tJ - 1.6) / 0.5)));
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#defQ'), t, wt('P2', 'When') - 0.05, { st: 0.06 });
    LP.forEach((_, i) => vis($('#lp' + i), t, tLp[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, T0('P2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const t0s = [wt('P2', 'pushes'), wt('P3', 'perpendicular'), wt('P3', 'straight')];
    pmG.forEach((q, i) => vis(q.o, t, t0s[i] - 0.5, 1e9, { dy: 16 }));
    // floor block lifts off at "Lift", lands again for "only push"
    const lift = 60 * M.io((t - wt('P4', 'Lift') + 0.1) / 0.6) * (1 - M.io((t - wt('P5', 'surface')) / 0.6));
    attr(pBlk0, 'transform', `translate(0,${(-lift).toFixed(1)})`);
    const nOn = 1 - M.clamp(lift / 8);
    const u0 = grow(t, t0s[0]) * nOn, u1 = grow(t, t0s[1]), u2 = grow(t, t0s[2]);
    pN[0].set(100, GY - 90, 100, GY - 90 - 120 * u0); attr(pNl[0], 'x', 116); attr(pNl[0], 'y', GY - 90 - 120 * u0 + 24); pNl[0].style.opacity = u0.toFixed(3);
    const b = rp(110, -80); pN[1].set(b[0], b[1], b[0] - rs * 120 * u1, b[1] - rc * 120 * u1); attr(pNl[1], 'x', b[0] - rs * 120 + 12); attr(pNl[1], 'y', b[1] - rc * 120 + 20); pNl[1].style.opacity = u1.toFixed(3);
    pN[2].set(614, 340, 614 - 110 * u2, 340); attr(pNl[2], 'x', 614 - 55); attr(pNl[2], 'y', 318); pNl[2].style.opacity = u2.toFixed(3);
    const t90 = wt('P3', 'ninety') - 0.1; rtA.forEach((r, i) => vis(r, t, t90 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }));
    if (nOn < 0.5) M.hide(rtA[0], true);
    vis(p90, t, t90 + 0.3, 1e9, { dy: 8 });
    vis(pPullO, t, wt('P5', 'never') - 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* S: the sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S11') + 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, dd]) => vis($(id), t, tS1 + dd, simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const th = thT(t), c = cosD(th), sn = sinD(th), F = t < tHandOut + 0.5 ? Ft(t) : 0;
    attr(rig, 'transform', `translate(${PX},${PY}) rotate(${(-th).toFixed(3)}) scale(${KS})`);
    vis(rigO, t, tS1 + 0.3, 1e9, { dy: 16 });
    const E = Gp(PL, 0, c, sn); attr(wedge, 'd', th < 0.2 ? '' : `M${PX},${PY} L${E[0].toFixed(1)},${PY} L${E[0].toFixed(1)},${E[1].toFixed(1)} Z`);
    // ghosts while the ramp moves
    ghosts.forEach((gh, k) => { const tg = thT(t - (t > tS7 && t < tRun ? 0.3 : 0.1) * (k + 1)); attr(gh, 'transform', `translate(${PX},${PY}) rotate(${(-tg).toFixed(3)}) scale(${KS})`); gh.style.opacity = Math.abs(th - tg) > 0.6 ? [0.3, 0.2, 0.12][k] : 0; });
    const ar = 84; attr(arc, 'd', th < 0.5 ? '' : `M${PX + ar},${PY} A${ar},${ar} 0 0 0 ${(PX + ar * c).toFixed(1)},${(PY - ar * sn).toFixed(1)}`);
    attr(arcL, 'x', PX + ar + 10); attr(arcL, 'y', PY - 12); arcL.style.opacity = th > 4 ? 1 : 0;
    // readout values: round theta and F first, then compute N from them
    const thr = Math.round(th), Fr = Math.round(F * 10) / 10, Nr = Math.max(0, W2 * cosD(thr) + Fr);
    M.setT($('#r_T'), thr + '°'); M.setT($('#r_F'), f1(Math.abs(Fr))); M.setT($('#r_Fu'), Fr > 0.04 ? 'N down' : Fr < -0.04 ? 'N up' : 'N');
    M.setT($('#r_N'), f1(Nr)); M.setT($('#r_S'), f2(Nr / G)); M.setT(lcdS, f2(Nr / G) + ' kg');
    // forces: mg from the centre (straight down), N from the contact (along the normal)
    const uC = th > 1 ? grow(t, wt('S8', 'cos')) : 0, uS = th > 1 ? grow(t, wt('S8', 'sine')) : 0, uFr = th > 1 ? grow(t, wt('S8', 'friction')) : 0;
    const uW = grow(t, wt('S2', 'weight')), uN = grow(t, wt('S2', 'pushes'), 0.6), Nn = W2 * c + F;
    const bc = Gp(140, -127, c, sn); sW.set(bc[0], bc[1], bc[0], bc[1] + NS * W2 * uW); attr(lW, 'x', bc[0] + 10); attr(lW, 'y', bc[1] + NS * W2 * uW - 6); lW.style.opacity = (uW * (1 - uC)).toFixed(3); sW.g.style.opacity = (1 - 0.7 * uC).toFixed(3);
    const cp = Gp(92, -62, c, sn), nl = NS * Nn * uN; sN.set(cp[0], cp[1], cp[0] - sn * nl, cp[1] - c * nl); const nlp = Gp(50, -62 - nl / KS + 14, c, sn); attr(lN, 'x', nlp[0]); attr(lN, 'y', nlp[1]); lN.setAttribute('text-anchor', 'end'); lN.style.opacity = uN.toFixed(3);
    // hand + F (flat only)
    const hOn2 = vis(handO, t, tPress - 0.5, tHandOut, { dy: -30 }), top = PY - 192 * KS, fl = NS * Math.abs(F);
    attr(hand, 'transform', `translate(0,${(top - 62 + (F < 0 ? -6 : 0)).toFixed(1)})`);
    if (F > 0.05) sF.set(PX + 262, top - 4 - fl, PX + 262, top - 4); else if (F < -0.05) sF.set(PX + 262, top - 4, PX + 262, top - 4 - fl); else sF.set(0, 0, 0, 0);
    attr(lF, 'x', PX + 276); attr(lF, 'y', top - 10 - fl / 2 + 10); lF.style.opacity = fl > 8 ? 1 : 0;
    // slow-mo: components of mg, and friction
    const lc = NS * W2 * c * uC; sC.set(bc[0], bc[1], bc[0] + sn * lc, bc[1] + c * lc); attr(lC, 'x', bc[0] + sn * lc + 16); attr(lC, 'y', bc[1] + c * lc + 6); lC.style.opacity = uC.toFixed(3);
    const ls = NS * W2 * sn * uS; sS.set(bc[0], bc[1], bc[0] - c * ls, bc[1] + sn * ls); attr(lS, 'x', bc[0] - c * ls - 8); attr(lS, 'y', bc[1] + sn * ls + 22); lS.style.opacity = uS.toFixed(3);
    const fp = Gp(188, -62, c, sn), lfr = NS * W2 * sn * uFr; sFr.set(fp[0], fp[1], fp[0] + c * lfr, fp[1] - sn * lfr); attr(lFr, 'x', fp[0] + c * lfr + 12); attr(lFr, 'y', fp[1] - sn * lfr - 10); lFr.style.opacity = uFr.toFixed(3);
    vis($('#smo'), t, tS7 + 0.05, T0('S10') - 0.1, { ...POP, sc: 0.8 });
    // graph A (push) then graph B (angle)
    const gSw = M.io((t - (wt('S6', 'tilt') - 0.4)) / 0.4);
    $('#grA').style.opacity = (1 - gSw).toFixed(3); $('#grL0').style.opacity = (1 - gSw).toFixed(3); aTag.style.opacity = ((1 - gSw) * M.clamp((t - wt('S5', 'adds') + 0.1) / 0.2)).toFixed(3);
    $('#grB').style.opacity = gSw.toFixed(3); $('#grL1').style.opacity = gSw.toFixed(3);
    const fMin = Math.min(0, t > tLift ? Math.max(-10, Ft(Math.min(t, tBack))) : 0), fMax = t > tPress ? (t > tLift ? 10 : Math.max(0, F)) : 0;
    const lo = t > tLift ? Math.min(fMin, F) : 0, hi = fMax;
    attr(aLine, 'd', hi - lo < 0.05 ? '' : `M${aX(lo).toFixed(1)},${aY(W2 + lo).toFixed(1)} L${aX(hi).toFixed(1)},${aY(W2 + hi).toFixed(1)}`);
    attr(aDot, 'cx', aX(F).toFixed(1)); attr(aDot, 'cy', aY(Math.max(0, W2 + F)).toFixed(1)); M.hide(aDot, t < wt('S2', 'pushes'));
    bCurve(a => [a, W2 * cosD(a)], 0, Math.max(0, th), 60); bDot(th, W2 * cosD(th), gSw > 0.5);
    vis(bHalf, t, wt('S10', 'half') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    avD(t, wt('S5', 'mass') + 0.1, T0('S6') - 0.2);
    vis($('#th1'), t, tS11 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tS11, tOpts: wt('S11', 'What') - 0.1, tCount: T1('S11') + 0.05, dur: 3, tAns: T0('S12') - 0.02, tWhy: wt('S12', 'The') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    PN.forEach((_, i) => {
      const t0 = i === 0 ? tStep[0] + 0.3 : tStep[i + 1] - 0.1, el = $('#pn' + i); vis(el, t, t0, 1e9, { dy: 16 });
      vis(el.querySelector('.pf'), t, (i === 0 ? tStep[1] : tStep[i + 1]) + 1.0, 1e9, POP);
      const q = PA[i], tg = i === 0 ? tStep[1] : tStep[i + 1];
      if (q.perp) { M.draw(q.perp, t, t0 + 0.2, 0.5); q.perp.style.opacity = i === 0 ? 1 - 0.6 * M.io((t - tStep[1]) / 0.4) : 0.4; }
      q.draw(grow(t, tg + 0.2), grow(t, tg + 0.6), grow(t, tg + 0.4));
    });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'N') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'always') - 0.1, 0.9);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kf'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o }); vis($('#km'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    kF.run(t, wt('K1', 'Push'), wt('K1', 'grows')); kM.run(t, wt('K2', 'Pull'), wt('K2', 'shrinks'));
    vis($('#kfL'), t, wt('K1', 'grows') + 0.3, 1e9, POP); vis($('#kmL'), t, wt('K2', 'shrinks') + 0.3, 1e9, POP);
    vis($('#kfP'), t, wt('K1', 'grows') + 0.5, 1e9, POP); vis($('#kmP'), t, wt('K2', 'shrinks') + 0.5, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'How') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'N') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    vis(wHandO, t, wt('W2', 'presses') - 0.2, 1e9, { dy: -24 });
    const uF = grow(t, wt('W2', 'fifteen')), uW = grow(t, T0('W3') + 0.3), uN = grow(t, wt('W4', 'Forty'), 0.6), S = 2.4;
    wW.set(420, WY - 150, 420, WY - 150 + S * 29.4 * uW); attr(wlW, 'x', 432); attr(wlW, 'y', WY - 150 + S * 29.4 * uW - 4); wlW.style.opacity = uW.toFixed(3);
    wF.set(420, WY - 238 - S * 15 * uF, 420, WY - 238); attr(wlF, 'x', 432); attr(wlF, 'y', WY - 238 - S * 15 * uF + 14); wlF.style.opacity = uF.toFixed(3);
    const nl = S * 44.4 * uN; wN.set(300, WY - 52, 300, WY - 52 - nl); attr(wlN, 'x', 250); attr(wlN, 'y', WY - 52 - nl + 16); wlN.style.opacity = uN.toFixed(3);
    vis($('#wLcd'), t, T0('W2') + 0.8, 1e9, POP);
    const uR = M.io((t - wt('W5', 'four') + 0.1) / 0.6); M.setT($('#wLn'), f2(3 + (44.4 / 9.8 - 3) * uR));
    $('#wLcd').style.background = mix(C.ink, C.red, uR * (1 - M.io((t - wt('W5', 'four') - 1.6) / 0.5)));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'N') - 0.2, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'must') - 0.2 });
    const a = 24 * (1 - M.io((t - wt('X3', 'flat') + 0.1) / 1.0)), c = cosD(a), sn = sinD(a);
    attr(tpG, 'transform', `translate(${TPv[0]},${TPv[1]}) rotate(${(-a).toFixed(3)})`); vis(tpO, t, T0('X2'), 1e9, { dy: 16 });
    attr(tpArc, 'd', a < 0.5 ? '' : `M${TPv[0] + 90},${TPv[1]} A90,90 0 0 0 ${(TPv[0] + 90 * c).toFixed(1)},${(TPv[1] - 90 * sn).toFixed(1)}`);
    M.setT(tpL, 'θ = ' + Math.round(a) + '°'); attr(tpL, 'x', TPv[0] + 20); attr(tpL, 'y', TPv[1] - 60); vis(tpL, t, T0('X2') + 0.3, 1e9, { dy: 0 });
    vis($('#tc0'), t, wt('X3', 'Sine') - 0.1, 1e9, POP); vis($('#tc1'), t, wt('X3', 'Cos') - 0.1, 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'free') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
