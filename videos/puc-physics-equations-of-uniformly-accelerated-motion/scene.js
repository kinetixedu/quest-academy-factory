// PUC Physics Ep 25: Equations of Uniformly Accelerated Motion (Motion notebook, bicycle down a slope)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, XC = C.ink, V2 = C.violet;          // v blue, a red, x ink, second area part violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const kv = s => `\\textcolor{${VC}}{${s}}`, ka = s => `\\textcolor{${AC}}{${s}}`;
const V0 = kv('v_0'), VV = kv('v'), AA = ka('a');

Object.assign(M.IC, {
  ball: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20', 'M5 5c3 3 3 11 0 14', 'M19 5c-3 3-3 11 0 14'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 6H7.3a2 2 0 0 0-1.6.9L3 10.5 2.5 11C1.7 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2', 'M5 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M9 17h6', 'M15 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0', 'M12 17.5V14l-3-3 4-3 2 3h2', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6');
const tD1 = T0('D1'), tE2 = T0('E2'), tE7 = T0('E7'), tT = T0('T1'), tK1 = T0('K1'), tK4 = T0('K4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['ball', 'Ball', 'THROWN UP', 'cricket'], ['car', 'Car', 'BRAKING', 'car'], ['bike', 'Bicycle', 'DOWN A SLOPE', 'bicycle']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jq" id="jq${i}">${['a = g, down', 'a against v', 'a along slope'][i]}</div></div>`).join('');

/* ---------- P: five quantities ---------- */
const QV = [[V0, 'initial velocity', 'v nought'], [VV, 'final velocity', 'Final'], [AA, 'acceleration', 'Acceleration'], ['t', 'time', 'Time'], ['x', 'displacement', 'displacement']];
$('#qvs').innerHTML = QV.map(([s, n], i) => `<div class="qv" id="qv${i}" style="left:${36 + i * 306}px;top:96px;width:290px"><span class="s">${K(s)}</span><span>${n}</span></div>`).join('');
const tQv = [wt('P2', 'Initial'), wt('P2', 'Final'), wt('P2', 'Acceleration'), wt('P2', 'Time'), wt('P2', 'displacement')];
const pv = mk($('#pv'), 'svg', { width: 1600, height: 260, style: 'position:absolute;left:0;top:170px' });
const PR0 = 140, PR1 = 1460, PY = 150;
mk(pv, 'line', { x1: 80, y1: PY + 20, x2: 1520, y2: PY + 20, stroke: C.ink, 'stroke-width': 3 });
const pd0 = mk(pv, 'circle', { cx: PR0, cy: PY, r: 14, fill: C.ink }), pd1 = mk(pv, 'circle', { cx: PR1, cy: PY, r: 14, fill: C.ink });
const pa0 = PUC.arrow(pv, VC, 6, 16), pa1 = PUC.arrow(pv, VC, 6, 16), paa = PUC.arrow(pv, AC, 5, 14);
const pl = [txt(pv, PR0 + 20, PY - 44, '', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC }), txt(pv, PR1 - 40, PY - 44, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC }), txt(pv, 780, 46, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: AC })];
pl[0].innerHTML = 'v<tspan font-size="20" dy="6">0</tspan>';
const pbr = mk(pv, 'path', { d: `M${PR0},${PY + 44} v12 H${PR1} v-12`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const pxl = txt(pv, (PR0 + PR1) / 2, PY + 92, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: C.ink, 'text-anchor': 'middle' });
const ptl = [txt(pv, PR0, PY + 92, 't = 0', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }), txt(pv, PR1, PY + 92, 't', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 })];

/* ---------- S: down the slope ---------- */
const s = $('#simS'), SX0 = 70, SY0 = 160, SX1 = 720, SY1 = 420, AY = 2, XMAX = 25, TM = 5;
const SL = Math.hypot(SX1 - SX0, SY1 - SY0), ux = (SX1 - SX0) / SL, uy = (SY1 - SY0) / SL, PXM = SL / XMAX;
const at = m => [SX0 + ux * m * PXM, SY0 + uy * m * PXM];
mk(s, 'path', { d: `M${SX0 - 30},${SY0 - 12} L${SX1 + 20},${SY1 + 8} L${SX1 + 20},${SY1 + 60} L${SX0 - 30},${SY1 + 60} Z`, fill: C.soft });
mk(s, 'line', { x1: SX0 - 30, y1: SY0 - 12, x2: SX1 + 20, y2: SY1 + 8, stroke: C.ink, 'stroke-width': 3 });
const ang = Math.atan2(SY1 - SY0, SX1 - SX0) * 180 / Math.PI;
const bikeG = (p, col, op) => { const g = mk(p, 'g', { opacity: op }), h = mk(g, 'g', { transform: `rotate(${ang.toFixed(2)})` });
  mk(h, 'circle', { cx: -20, cy: -16, r: 15, fill: 'none', stroke: col, 'stroke-width': 4 }); mk(h, 'circle', { cx: 20, cy: -16, r: 15, fill: 'none', stroke: col, 'stroke-width': 4 });
  mk(h, 'path', { d: 'M-20,-16 L-6,-40 L14,-40 L20,-16 M-6,-40 L2,-16 L-20,-16 M14,-40 L10,-50 M-10,-44 L-2,-44', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return g; };
const gapL = [];
const pm = [];
for (let k = 0; k <= TM; k++) { const [mx, my] = at(AY / 2 * k * k); pm.push(mk(s, 'circle', { cx: mx + 10 * Math.sin(ang * Math.PI / 180), cy: my + 10, r: 7, fill: V2 })); }
for (let k = 0; k < TM; k++) { const m = AY / 2 * (k + 0.5) * (k + 0.5) + 0.0, [mx, my] = at(AY / 2 * (k * k + (k + 1) * (k + 1)) / 2); gapL.push(txt(s, mx + 8, my + 46, (AY * (k + 0.5)) + ' m', { 'text-anchor': 'middle', 'font-size': 18, fill: V2, 'font-weight': 600 })); }
const ghosts = [0.3, 0.2, 0.12].map(o => bikeG(s, C.ink, o)), bike = bikeG(s, C.ink, 1);
const va = PUC.arrow(s, VC, 6, 16), aa = PUC.arrow(s, AC, 5, 14);
const vl = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: VC });
const al = txt(s, 0, 0, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: AC });
const gapT = txt(s, 36, 520, 'GAPS EACH SECOND: 1, 3, 5, 7, 9 m', { 'font-weight': 600, fill: V2, 'letter-spacing': 1 });
$('#roG').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}"></span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="ra" style="color:${AC}">2.0</span><span class="u">m/s²</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="rx"></span><span class="u">m</span>`;
const gs = $('#grS'), G = PUC.graph(gs, { x: 110, y: 64, w: 540, h: 150, xmax: 5, ymax: 10, xt: [0, 1, 2, 3, 4, 5], yt: [0, 5, 10] });
txt(gs, 664, 222, 't (s)', {}); txt(gs, 52, 56, 'v (m/s)', {});
const gc = G.curve(VC), gd = G.dot(VC);
const gTri = mk(gs, 'path', { d: `M${G.X(3)},${G.Y(6)} H${G.X(4)} V${G.Y(8)}`, fill: 'none', stroke: AC, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const gTl = txt(gs, G.X(4) + 12, G.Y(7) + 6, 'slope = a = 2 m/s²', { 'font-weight': 600, fill: AC, 'font-size': 18 });
const ex = document.createElement('div'); ex.className = 'ghost'; ex.style.cssText = 'right:36px;top:18px'; ex.textContent = 'EXAMPLE FIGURES'; $('#ro').appendChild(ex);
const tA = T0('S2') + 0.3, tB = T1('S4') - 0.2;
const tR0 = wt('S5', 'slow') + 0.3, tR1 = tR0 + 8;            // replay the first 2 s at 0.25x
const simT = t => t < tR0 - 0.05 ? TM * M.clamp((t - tA) / (tB - tA)) : t < tR1 ? 2 * M.clamp((t - tR0) / (tR1 - tR0)) : 2 + 3 * M.io((t - tR1) / 0.8);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same +2 every second. That I can predict!' });

/* ---------- D: three derivations on the left, the v-t graph on the right ---------- */
const GR = [
  ['EQUATION 1 · FROM THE MEANING OF a', [[`${AA} = \\dfrac{${VV} - ${V0}}{t}`, 'change in velocity ÷ time'], [`${AA}\\,t = ${VV} - ${V0}`, 'multiply both sides by t'], [`${VV} = ${V0} + ${AA}\\,t`, 'move v₀ across: equation 1']],
    [wt('D2', 'So'), wt('D3', 'Multiply'), wt('D3', 'equals')]],
  ['EQUATION 2 · FROM THE AREA UNDER v-t', [['x = \\text{area under } v\\text{-}t', 'area = displacement'], [`\\text{rectangle} = ${V0}\\,t`, 'no acceleration part'], [`\\text{triangle} = \\tfrac12\\, t\\,(${AA} t) = \\tfrac12 ${AA} t^2`, 'extra from speeding up'], [`x = ${V0}\\,t + \\tfrac12 ${AA}\\,t^2`, 'add them: equation 2']],
    [wt('E3', 'area'), wt('E4', 'rectangle'), wt('E5', 'triangle'), wt('E6', 'Add')]],
  ['EQUATION 3 · WHEN TIME IS NOT GIVEN', [[`t = \\dfrac{${VV} - ${V0}}{${AA}}`, 'from equation 1'], [`x = ${V0}\\dfrac{${VV} - ${V0}}{${AA}} + \\dfrac{(${VV} - ${V0})^2}{2${AA}}`, 'put t into equation 2'], [`2${AA}x = ${VV}^2 - ${V0}^2`, 'multiply by 2a, simplify'], [`${VV}^2 = ${V0}^2 + 2${AA}x`, 'time disappears: equation 3']],
    [wt('E8', 'From'), wt('E8', 'Put'), wt('E8', 'simplify'), wt('E9', 'squared')]]];
const DY = [[96, 236, 376], [86, 206, 316, 426], [80, 214, 324, 434]];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px"></div>` + GR.map(([, rows], gi) => rows.map(([f, w], i) => `<div class="st g${gi}" id="d${gi}${i}" style="top:${DY[gi][i]}px;height:${gi === 1 ? 104 : 120}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${gi === 2 && i === 1 ? 30 : 34}px">${K(f)}</div><div class="why" style="top:${gi === 1 ? 54 : 70}px">${w}</div></div>`).join('')).join('');
const gWin = [[tD1, tE2], [tE2, tE7], [tE7, tT]];
// right: v-t graph with v0 = 4, a = 2, t up to 5 s
const ds = $('#drS'), DG = PUC.graph(ds, { x: 120, y: 100, w: 560, h: 380, xmax: 6, ymax: 16, xt: [0, 1, 2, 3, 4, 5, 6], yt: [0, 4, 8, 12, 16] });
txt(ds, 694, 490, 't (s)', {}); txt(ds, 60, 90, 'v (m/s)', {});
const T5 = 5, DV0 = 4, DA = 2, DV = DV0 + DA * T5;
const rectA = mk(ds, 'rect', { x: DG.X(0), y: DG.Y(DV0), width: DG.X(T5) - DG.X(0), height: DG.Y(0) - DG.Y(DV0), fill: C.ac2 });
const triA = mk(ds, 'path', { d: `M${DG.X(0)},${DG.Y(DV0)} L${DG.X(T5)},${DG.Y(DV)} L${DG.X(T5)},${DG.Y(DV0)} Z`, fill: M.mix(V2, '#FFFFFF', 0.8) });
const dline = DG.curve(VC);
const dl0 = mk(ds, 'line', { x1: DG.X(T5), y1: DG.Y(0), x2: DG.X(T5), y2: DG.Y(DV), stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const rise = mk(ds, 'path', { d: `M${DG.X(T5) + 18},${DG.Y(DV0)} h8 V${DG.Y(DV)} h-8`, fill: 'none', stroke: AC, 'stroke-width': 3 });
const riseL = txt(ds, DG.X(T5) + 34, DG.Y((DV0 + DV) / 2) + 8, 'a t', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: AC });
const v0L = txt(ds, DG.X(0) + 12, DG.Y(DV0) - 12, '', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: VC }); v0L.innerHTML = 'v<tspan font-size="18" dy="6">0</tspan>';
const vL = txt(ds, DG.X(T5) - 30, DG.Y(DV) - 14, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: VC });
const rectL = txt(ds, DG.X(T5 / 2), DG.Y(DV0 / 2) + 10, '', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: VC }); rectL.innerHTML = 'v<tspan font-size="16" dy="6">0</tspan><tspan dy="-6"> × t</tspan>';
const triL = txt(ds, DG.X(T5 * 0.66), DG.Y(DV0 + 2.2) + 8, '½ × t × at', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: V2 });
const tBr = mk(ds, 'path', { d: `M${DG.X(0)},${DG.Y(0) + 46} v10 H${DG.X(T5)} v-10`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const tBl = txt(ds, DG.X(T5 / 2), DG.Y(0) + 84, 't', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: C.ink });
const noT = document.createElement('div'); noT.className = 'pillp ink'; noT.style.cssText = 'left:400px;top:30px'; noT.innerHTML = 'Equation 3: no <i>t</i> needed'; $('#dr').appendChild(noT);
const tStrike = mk(ds, 'line', { x1: DG.X(T5 / 2) - 26, y1: DG.Y(0) + 84, x2: DG.X(T5 / 2) + 26, y2: DG.Y(0) + 64, stroke: AC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const avD = PUC.avatar($('#sD'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Start speed plus what you gain. Simple!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${VV} = ${V0} + ${AA}t \\qquad x = ${V0}t + \\tfrac12 ${AA}t^2 \\qquad ${VV}^2 = ${V0}^2 + 2${AA}x`);

/* ---------- K: pick the equation ---------- */
const EQ = [[`${VV} = ${V0} + ${AA}t`, 'NO x'], [`x = ${V0}t + \\tfrac12 ${AA}t^2`, `NO v`], [`${VV}^2 = ${V0}^2 + 2${AA}x`, 'NO t']];
$('#eqs').innerHTML = EQ.map(([f, m], i) => `<div class="eqc" id="eq${i}" style="top:${92 + i * 116}px;width:780px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="ms">${m}</div></div>`).join('') +
  `<div class="pillp ac" id="kP" style="left:36px;top:470px">Missing from the question = missing from the equation</div>`;
const tEq = [wt('K2', 'one', 1), wt('K2', 'two'), wt('K2', 'three')];
const kc = $('#kcS');
const FL = [['Given + asked', 'v₀ = 20 · v = 0 · x = 40 · a = ?'], ['Missing one', 't  (neither given nor asked)'], ['Pick the one without it', 'Equation 3']];
const fb = FL.map(([h, b], i) => { const g = mk(kc, 'g', {}); mk(g, 'rect', { x: 20, y: 10 + i * 148, width: 660, height: 108, rx: 14, fill: i === 2 ? C.ac2 : C.soft });
  txt(g, 44, 52 + i * 148, h, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: C.ink }); txt(g, 44, 92 + i * 148, b, { 'font-weight': 600, 'font-size': 22, fill: i === 1 ? AC : C.ink2 });
  if (i < 2) { mk(g, 'path', { d: `M350,${122 + i * 148} v22`, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'path', { d: `M340,${138 + i * 148} l10,10 l10,-10`, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); }
  return g; });
const tFl = [wt('K3', 'look'), wt('K3', 'neither'), wt('K3', 'Pick')];
const th1 = PUC.think($('#th1'), { q: 'A car at 20 m/s brakes and stops in 40 m. To find its deceleration, which equation?', opts: ['Equation 1', 'Equation 2', 'Equation 3'], right: 2, why: 'No t given or asked. 0 = 400 − 80a, so a = 5 m/s², against the motion.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${V0} = 0,\\;\\; ${AA} = 2\\,\\text{m/s}^2,\\;\\; t = 5\\,\\text{s}`)],
  [K(`${VV} = 0 + 2 \\times 5 = ${kv('10\\,\\text{m/s}')}`)],
  [K(`x = 0 + \\tfrac12 \\times 2 \\times 25 = 25\\,\\text{m}`)],
  [K(`\\text{check: } 10^2 = 100 = 2 \\times 2 \\times 25`) + ' <b style="color:var(--ok)">✓</b>']], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WG = PUC.graph(w, { x: 120, y: 110, w: 560, h: 330, xmax: 5, ymax: 10, xt: [0, 1, 2, 3, 4, 5], yt: [0, 5, 10] });
txt(w, 694, 450, 't (s)', {}); txt(w, 60, 100, 'v (m/s)', {});
const wTri = mk(w, 'path', { d: `M${WG.X(0)},${WG.Y(0)} L${WG.X(5)},${WG.Y(10)} L${WG.X(5)},${WG.Y(0)} Z`, fill: C.ac2 });
const wc = WG.curve(VC), wd = WG.dot(VC);
const wvT = txt(w, WG.X(5) - 14, WG.Y(10) - 16, '10 m/s', { 'text-anchor': 'end', 'font-weight': 600, fill: VC, 'font-size': 22 });
const wA = txt(w, WG.X(3.4), WG.Y(2.2), 'area = ½ × 5 × 10 = 25 m', { 'text-anchor': 'middle', 'font-weight': 600, fill: C.ink, 'font-size': 22 });
const wE = document.createElement('div'); wE.className = 'ghost'; wE.style.cssText = 'right:36px;top:18px'; wE.textContent = 'EXAMPLE FIGURES'; $('#wr').appendChild(wE);
const tW = [T0('W2'), wt('W3', 'v'), wt('W4', 'x'), wt('W5', 'Check')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Use v = v₀ + at for any motion', right: 'Only if a is constant. Deceleration = negative a' });
const tg = $('#tg'), TG1 = PUC.graph(tg, { x: 40, y: 70, w: 150, h: 120, xmax: 4, ymax: 4 }), TG2 = PUC.graph(tg, { x: 240, y: 70, w: 150, h: 120, xmax: 4, ymax: 4 });
txt(tg, 40, 56, 'a-t: changing', { 'font-weight': 600, fill: C.ink, 'font-size': 16 }); txt(tg, 240, 56, 'a-t: constant', { 'font-weight': 600, fill: C.ink, 'font-size': 16 });
const tc1 = TG1.curve(AC, 4), tc2 = TG2.curve(AC, 4);
const tx1 = txt(tg, 115, 236, '✗ no', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: AC }), tx2 = txt(tg, 315, 236, '✓ yes', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: C.ok });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: stopping distance, braking, and time, speed or distance at constant a' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 780,
  q: 'A body starts from rest with constant acceleration and covers 12 m in the 3rd second. Its acceleration is',
  opts: ['2.4 m/s²', '4.0 m/s²', '4.8 m/s²', '6.0 m/s²'], right: 2, optY: 300 });
const so = PUC.solution($('#so'), [[K('s_{3\\text{rd}} = x(3) - x(2)')], [K(`\\tfrac12 ${AA}(9) - \\tfrac12 ${AA}(4)`)], [K(`\\tfrac12 ${AA} \\times 5 = 12`)], [K(`${AA} = \\tfrac{24}{5} = 4.8\\,\\text{m/s}^2`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Distance'), wt('A3', 'That'), wt('A3', 'Half', 2), wt('A3', 'twenty')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · equations of motion (constant a)', y0: 100, dy: 92, txt: [0, 0, 1, 1],
  lines: [K(`${VV} = ${V0} + ${AA}t \\qquad x = ${V0}t + \\tfrac12 ${AA}t^2`), K(`${VV}^2 = ${V0}^2 + 2${AA}x`),
    '<b>Each leaves one out</b>: eq 1 no x · eq 2 no v · eq 3 no t', '<b>Only for constant a</b> · deceleration: put a negative'] });
const YQ = ['Which quantity is missing from v² = v₀² + 2ax?', 'Where does the ½at² term come from on the v-t graph?', 'When can you NOT use these three equations?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 26', topic: 'Stone or feather in no air: which lands first? Motion under Gravity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.2, 1.1, 1368, 713], [tD1 - 0.5, 1, 960, 540]]);
const f1 = v => v.toFixed(1);
let geo = null;
function measure() { geo = 1; const h0 = $('#hq0'), h1 = $('#hq1'); h1.style.left = (h0.offsetLeft + h0.offsetWidth + 16) + 'px'; }

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const q = $('#jq' + i); M.vis(q, t, wt('H2', 'equations') - 0.1 + i * 0.12, 1e9, POP); q.style.color = AC; });
    M.vis($('#hjP'), t, wt('H5', 'constant') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hq0'), t, wt('H4', 'speed') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H4', 'far') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pv'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...o });
    QV.forEach((_, i) => { const el = $('#qv' + i), tt = tQv[i]; M.vis(el, t, tt - 0.15, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - (tQv[i + 1] ?? T0('P3'))) / 0.25))); });
    M.vis(pd0, t, tQv[0] - 0.3, 1e9, POP); M.vis(pd1, t, tQv[1] - 0.2, 1e9, POP);
    const u0 = M.io((t - tQv[0]) / 0.4), u1 = M.io((t - tQv[1]) / 0.4), ua = M.io((t - tQv[2]) / 0.4);
    pa0.set(PR0, PY - 30, PR0 + 90 * u0, PY - 30); pl[0].style.opacity = u0; pa1.set(PR1 - 30, PY - 30, PR1 - 30 + 200 * u1 * 0.6, PY - 30); pl[1].style.opacity = u1;
    paa.set(720, 60, 720 + 120 * ua, 60); pl[2].style.opacity = ua;
    [ptl[0], ptl[1]].forEach(e => e.style.opacity = M.io((t - tQv[3]) / 0.3));
    M.draw(pbr, t, tQv[4] - 0.1, 0.5); pxl.style.opacity = M.io((t - tQv[4]) / 0.3);
    M.vis($('#pvC'), t, wt('P3', 'condition') - 0.1, 1e9, POP);
  }

  /* S: down the slope */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis(ex, t, tS1 + 0.8, 1e9, { dy: 8 });
    const st = simT(t), xm = AY / 2 * st * st, v = AY * st, [bx, by] = at(xm), rp = t >= tR0 - 0.05 && t < tR1;
    bike.setAttribute('transform', `translate(${bx.toFixed(1)},${by.toFixed(1)})`); bike.style.opacity = M.clamp((t - tS1 - 0.2) / 0.3);
    const moving = (t > tA && t < tB) || (t > tR0 && t < tR1 + 0.8);
    ghosts.forEach((gh, k) => { const gt = Math.max(0, st - (rp ? 0.12 : 0.3) * (k + 1)), [gx, gy] = at(AY / 2 * gt * gt); gh.setAttribute('transform', `translate(${gx.toFixed(1)},${gy.toFixed(1)})`); M.hide(gh, !moving || Math.hypot(gx - bx, gy - by) < 6); });
    pm.forEach((m, k) => M.hide(m, k > st + 1e-6 || t < tA - 0.05));
    const tg0 = wt('S4', 'One');
    gapL.forEach((g, k) => { g.style.opacity = (M.io((t - tg0 - k * 0.45) / 0.3) * (k + 1 <= st + 1e-6 ? 1 : 0)).toFixed(3); });
    M.vis(gapT, t, wt('S4', 'seven') + 0.3, 1e9, { dy: 8 });
    const vOn = M.io((t - wt('S3', 'velocity') + 0.1) / 0.4), len = 14 * v * vOn, ox = bx - uy * 70, oy = by + ux * -70;
    va.set(ox, oy, ox + ux * len, oy + uy * len); attr(vl, 'x', (ox + ux * len / 2 - 6).toFixed(1)); attr(vl, 'y', (oy + uy * len / 2 - 14).toFixed(1)); vl.style.opacity = (vOn * M.clamp(len / 20)).toFixed(3);
    const aOn = M.io((t - wt('S2', 'acceleration') + 0.1) / 0.4), ax0 = bx - uy * 104, ay0 = by - ux * 104;
    aa.set(ax0, ay0, ax0 + ux * 56 * aOn, ay0 + uy * 56 * aOn); attr(al, 'x', (ax0 - 24).toFixed(1)); attr(al, 'y', (ay0 + 4).toFixed(1)); al.style.opacity = aOn;
    M.vis($('#slo'), t, tR0 - 0.3, tR1, { ...POP, sc: 0.6 });
    M.setT($('#rv'), f1(v)); M.setT($('#rx'), f1(xm)); M.setT($('#tR'), 't = ' + f1(st) + ' s');
    gc(tt => [tt, AY * tt], 0, rp ? TM : Math.max(st, t > tR1 ? TM : 0)); gd(st, v, t > tA - 0.1);
    M.draw(gTri, t, wt('S6', 'slope') - 0.1, 0.5); gTl.style.opacity = M.io((t - wt('S6', 'acceleration') + 0.1) / 0.3);
    avA(t, wt('S3', 'same') + 0.2, tR0 - 0.4);
  }

  /* D: derivations */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    const gi = t < tE2 - 0.2 ? 0 : t < tE7 - 0.2 ? 1 : 2;
    M.setT($('#dlL'), GR[gi][0]);
    GR.forEach(([, rows, ts], g) => rows.forEach((_, i) => { const el = $('#d' + g + i), [a, b] = gWin[g];
      const on = M.vis(el, t, a - 0.1, b - 0.3, { dy: 0, fade: 0.01, outDur: 0.3, ody: -12 });
      if (on) { M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.7); M.vis(el.querySelector('.why'), t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); } }));
    const [, , ts] = GR[gi], hb = $('#hiB'), last = ts.length - 1;
    const hiY = DY[gi][last], hOn = M.io((t - ts[last] - 0.6) / 0.3) * (1 - M.io((t - gWin[gi][1] + 0.3) / 0.3));
    hb.style.top = (hiY - 10) + 'px'; hb.style.height = (gi === 1 ? 108 : 112) + 'px'; hb.style.opacity = hOn.toFixed(3); M.hide(hb, hOn < 0.01);
    M.vis($('#dr'), t, T0('D2') - 0.1, 1e9, { dx: 60, dy: 0 });
    // eq 1: the line, v0, v and the rise a t
    dline((tt) => [tt, DV0 + DA * tt], 0, T5 * M.io((t - wt('D2', 'change') + 0.1) / 1.0));
    v0L.style.opacity = M.io((t - wt('D2', 'v') + 0.1) / 0.3); vL.style.opacity = M.io((t - wt('D2', 'minus') + 0.1) / 0.3);
    M.draw(dl0, t, wt('D2', 'minus'), 0.4);
    M.draw(rise, t, wt('D4', 'gain') - 0.3, 0.4); riseL.style.opacity = M.io((t - wt('D4', 'gain') + 0.1) / 0.3);
    avD(t, wt('D4', 'gain') + 0.4, tE2 - 0.3);
    // eq 2: areas
    rectA.style.opacity = M.io((t - wt('E4', 'rectangle') + 0.1) / 0.4); rectL.style.opacity = M.io((t - wt('E4', 'times') + 0.1) / 0.3);
    triA.style.opacity = M.io((t - wt('E5', 'triangle') + 0.1) / 0.4); triL.style.opacity = M.io((t - wt('E5', 'half') + 0.1) / 0.3);
    M.draw(tBr, t, wt('E4', 't') - 0.1, 0.4); tBl.style.opacity = M.io((t - wt('E4', 't')) / 0.3);
    // eq 3: time disappears
    M.draw(tStrike, t, wt('E9', 'Time') - 0.05, 0.3); M.vis(noT, t, wt('E9', 'disappears') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Three') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'acceleration') - 0.2, 1.0);
  }

  /* K: pick + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kc'), t, tK1 + 0.1, OUT('K4'), { dy: 36, ...o });
    EQ.forEach((_, i) => { const el = $('#eq' + i); M.vis(el, t, tK1 + 0.3 + i * 0.12, 1e9, { dy: 16 }); const ms = el.querySelector('.ms'), on = M.io((t - tEq[i]) / 0.3); M.vis(ms, t, tEq[i] - 0.1, 1e9, POP); ms.style.background = mix('#FFFFFF', C.red, on); ms.style.color = mix(C.mute, '#FFFFFF', on); });
    $('#eq2').style.background = mix(C.soft, C.ac2, M.io((t - tFl[2]) / 0.3));
    fb.forEach((g, i) => M.vis(g, t, tFl[i] - 0.1, 1e9, { dy: 16 }));
    M.vis($('#kP'), t, T1('K3') - 0.6, 1e9, POP);
    M.vis($('#th1'), t, tK4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'which') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Zero') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, tW1 + 0.2, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis(wE, t, tW1 + 0.6, 1e9, { dy: 8 });
    const u = M.io((t - tW[1]) / 1.4); wc(tt => [tt, 2 * tt], 0, 5 * u); wd(5 * u, 10 * u, t > tW[1] - 0.1);
    wvT.style.opacity = M.io((t - wt('W3', 'ten') + 0.1) / 0.3);
    wTri.style.opacity = M.io((t - tW[2]) / 0.5); wA.style.opacity = M.io((t - wt('W4', 'twenty', 1) + 0.1) / 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'constant') + 0.1 });
    tc1(tt => [tt, 0.5 + 0.18 * tt * tt], 0, 4 * M.io((t - wt('X2', 'changes') + 0.1) / 0.6)); tc2(tt => [tt, 2.4], 0, 4 * M.io((t - wt('X3', 'constant') + 0.1) / 0.6));
    tx1.style.opacity = M.io((t - wt('X3', 'only')) / 0.3); tx2.style.opacity = M.io((t - wt('X3', 'constant') - 0.2) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
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
