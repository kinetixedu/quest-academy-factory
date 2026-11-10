// PUC Physics Ep 99: Torque (Motion notebook, a door seen from above)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, RC = C.violet, TC = C.gold, VC = C.ac, IC = C.ink, WOOD = '#D9B98C', WOODD = '#B08A5A';   // tau and F orange, r violet, theta gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const tau_ = tc(FC, '\\tau'), F_ = tc(FC, 'F'), r_ = tc(RC, 'r'), th_ = tc(TC, '\\theta'), rp_ = tc(RC, 'r_\\perp'), Fp_ = tc(FC, 'F_\\perp');
const SYM = (p, x, y, s, col, fs = 26, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': fs, fill: col }, a));
// visual angle a (deg, anticlockwise on screen) -> screen unit vector
const U = a => [Math.cos(a * D2R), -Math.sin(a * D2R)];
// axis marker: dashed ink ring + dot
const axisMk = (p, x, y, r = 13) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '4 4' }); mk(g, 'circle', { cx: x, cy: y, r: 4.5, fill: IC }); return g; };
// curved turning arrow about (cx, cy): from angle a0 sweeping span degrees anticlockwise (visual)
const turnArc = (p, col, sw = 4) => { const g = mk(p, 'g', {}), pa = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), hd = mk(g, 'path', { fill: col });
  return { g, set(cx, cy, R, a0, span) { if (span < 4) { M.hide(g, true); return; } M.hide(g, false); const a1 = a0 + span, p0 = [cx + R * Math.cos(a0 * D2R), cy - R * Math.sin(a0 * D2R)], p1 = [cx + R * Math.cos(a1 * D2R), cy - R * Math.sin(a1 * D2R)];
    attr(pa, 'd', `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${R},${R} 0 ${span > 180 ? 1 : 0} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`);
    const tg = [-Math.sin(a1 * D2R), -Math.cos(a1 * D2R)], nn = [Math.cos(a1 * D2R), -Math.sin(a1 * D2R)], h = 13;
    attr(hd, 'd', `M${(p1[0] + tg[0] * h).toFixed(1)},${(p1[1] + tg[1] * h).toFixed(1)} L${(p1[0] + nn[0] * h * 0.6).toFixed(1)},${(p1[1] + nn[1] * h * 0.6).toFixed(1)} L${(p1[0] - nn[0] * h * 0.6).toFixed(1)},${(p1[1] - nn[1] * h * 0.6).toFixed(1)} Z`); } }; };
const arcD = (cx, cy, R, a0, a1) => { const p0 = [cx + R * Math.cos(a0 * D2R), cy - R * Math.sin(a0 * D2R)], p1 = [cx + R * Math.cos(a1 * D2R), cy - R * Math.sin(a1 * D2R)]; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${R},${R} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const angOf = (dx, dy) => Math.atan2(-dy, dx) / D2R;
const rAng = (x, y, a, b, q = 16) => { const ua = U(a), ub = U(b); return `M${(x + q * ua[0]).toFixed(1)},${(y + q * ua[1]).toFixed(1)} L${(x + q * ua[0] + q * ub[0]).toFixed(1)},${(y + q * ua[1] + q * ub[1]).toFixed(1)} L${(x + q * ub[0]).toFixed(1)},${(y + q * ub[1]).toFixed(1)}`; };

Object.assign(M.IC, {
  spanner: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  door: ['M13 4h3a2 2 0 0 1 2 2v14', 'M2 20h3', 'M13 20h9', 'M10 12v.01', 'M13 4.56v16.88a.5.5 0 0 1-.63.48L5 20V5.25a1 1 0 0 1 .76-.97l6.62-1.24A.5.5 0 0 1 13 3.56z'],
  pedal: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M14 10l5-5', 'M17 3h4v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tR5 = T0('R5'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook rows ---------- */
const JOBS = [['spanner', 'Long spanner', 'LOOSENS A STUCK NUT', 'nut'], ['pedal', 'Bicycle pedal', 'TURNS ON A LONG CRANK', 'pedal'], ['door', 'Door handle', 'OPENS THE DOOR', 'door']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'spanner'), wt('H1', 'pedal'), wt('H1', 'door')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="110"></svg></div>`).join('');
// a lever that turns about its axis: kind nut / pedal / door; axis at (60, 50), length 210
const lever = (sv, kind) => {
  const o = mk(sv, 'g', {}), g = mk(o, 'g', {}), AX = 60, AY = 78;
  if (kind === 'nut') { mk(g, 'rect', { x: AX, y: AY - 7, width: 214, height: 14, rx: 7, fill: '#8D99AE', stroke: IC, 'stroke-width': 2 }); mk(g, 'circle', { cx: AX, cy: AY, r: 20, fill: '#8D99AE', stroke: IC, 'stroke-width': 2 }); mk(o, 'path', { d: `M${AX - 11},${AY - 6.4} L${AX},${AY - 12.7} L${AX + 11},${AY - 6.4} L${AX + 11},${AY + 6.4} L${AX},${AY + 12.7} L${AX - 11},${AY + 6.4} Z`, fill: '#C8CED9', stroke: IC, 'stroke-width': 2 }); }
  if (kind === 'pedal') { mk(o, 'circle', { cx: AX, cy: AY, r: 30, fill: 'none', stroke: IC, 'stroke-width': 3, 'stroke-dasharray': '3 4' }); mk(g, 'rect', { x: AX, y: AY - 6, width: 200, height: 12, rx: 6, fill: IC }); mk(g, 'rect', { x: AX + 190, y: AY - 14, width: 30, height: 28, rx: 5, fill: '#5B6B8C' }); }
  if (kind === 'door') { mk(g, 'rect', { x: AX, y: AY - 7, width: 220, height: 14, rx: 3, fill: WOOD, stroke: WOODD, 'stroke-width': 2 }); mk(g, 'circle', { cx: AX + 200, cy: AY - 12, r: 6, fill: IC }); }
  const ax = axisMk(o, AX, AY, 9), f = PUC.arrow(sv, FC, 4, 12);
  return { AX, AY, set(a, fo) { attr(g, 'transform', `rotate(${(-a).toFixed(2)} ${AX} ${AY})`); const e = [AX + 205 * Math.cos(a * D2R), AY - 205 * Math.sin(a * D2R)], n = U(a + 90); f.set(e[0] + n[0] * 10, e[1] + n[1] * 10, e[0] + n[0] * (10 + 34 * fo), e[1] + n[1] * (10 + 34 * fo)); } };
};
const LV = JOBS.map((j, i) => lever($('#jsv' + i), j[3]));

/* ---------- P: what torque is + where is the axis ---------- */
const IG = [['F', FC, 'How hard you push', 'the force'], ['r', RC, 'How far from the axis', 'the distance from the axis to the push'], ['θ', TC, 'At what angle', 'between r and the push']];
$('#igs').innerHTML = IG.map(([s, c, n, d], i) => `<div class="ig" id="ig${i}" style="top:${226 + i * 108}px"><div class="s" style="color:${c}">${s}</div><div class="n">${n}</div><div class="d">${d}</div></div>`).join('');
const tIg = [wt('P4', 'hard'), wt('P4', 'far'), wt('P4', 'angle')];
const AXR = [['Door', 'AXIS: THE HINGE', 'door'], ['Nut', 'AXIS: THE BOLT', 'nut'], ['Pedal', 'AXIS: THE AXLE', 'pedal']];
$('#axs').innerHTML = AXR.map(([n, d], i) => `<div class="ax" id="ax${i}" style="top:${84 + i * 160}px"><svg id="axv${i}" width="280" height="140"></svg><div class="n">${n}</div><div class="d">${d}</div></div>`).join('');
const AXT = AXR.map((a, i) => { const sv = $('#axv' + i), L = lever(sv, a[2]), ta = turnArc(sv, FC, 3.5); return { L, ta, sv }; });
AXT.forEach(a => a.sv.setAttribute('viewBox', '0 0 320 140'));
const tAx = [wt('P3', 'door'), wt('P3', 'nut'), wt('P3', 'pedal')];

/* ---------- S: the door, seen from above ---------- */
const s = $('#simS'), HX = 110, HY = 470, PXM = 466.67, DL = 0.95 * PXM, FN = 20, FPX = 5.5;   // 466.67 px per metre; door 0.95 m; 5.5 px per newton
const I_DOOR = 5.4, TP = 0.5, BETA = 4;     // door 20 kg, 0.9 m wide (I = ML^2/3 = 5.4 kg m^2), push held 0.5 s, hinge friction slows it at 4 rad/s^2
const phiAt = (tq, sv) => { if (sv <= 0 || tq <= 0) return 0; const a = tq / I_DOOR; if (sv < TP) return 0.5 * a * sv * sv; const w0 = a * TP, p0 = 0.5 * a * TP * TP, s2 = sv - TP, ts = w0 / BETA; return s2 < ts ? p0 + w0 * s2 - 0.5 * BETA * s2 * s2 : p0 + w0 * w0 / (2 * BETA); };
const movingAt = (tq, sv) => sv > 0 && sv < TP + tq / I_DOOR * TP / BETA;
// floor, walls, door frame
mk(s, 'rect', { x: 36, y: HY + 10, width: 712, height: 16, fill: '#EDE7DA' });
mk(s, 'rect', { x: 36, y: HY - 10, width: HX - 22 - 36, height: 20, fill: '#C8CED9', stroke: IC, 'stroke-width': 2 });
mk(s, 'rect', { x: HX + DL + 12, y: HY - 10, width: 748 - (HX + DL + 12), height: 20, fill: '#C8CED9', stroke: IC, 'stroke-width': 2 });
txt(s, 740, HY + 48, 'WALL', { 'font-size': 15, 'letter-spacing': 2, 'text-anchor': 'end' });
const swing = mk(s, 'path', { d: arcD(HX, HY, DL, 0, 90), fill: 'none', stroke: C.dim, 'stroke-width': 1.5, 'stroke-dasharray': '4 7' });
const ghosts = [0, 1, 2].map(() => { const o = mk(s, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: HX, y: HY - 8, width: DL, height: 16, rx: 3, fill: WOOD }); return { o, g }; });
const doorO = mk(s, 'g', {}), door = mk(doorO, 'g', {});
mk(door, 'rect', { x: HX, y: HY - 8, width: DL, height: 16, rx: 3, fill: WOOD, stroke: WOODD, 'stroke-width': 2.5 });
mk(door, 'rect', { x: HX + 0.9 * PXM - 14, y: HY - 16, width: 28, height: 8, rx: 3, fill: IC }); mk(door, 'rect', { x: HX + 0.9 * PXM - 14, y: HY + 8, width: 28, height: 8, rx: 3, fill: IC });
const hinge = axisMk(s, HX, HY, 14);
const hingeL = txt(s, 40, HY + 48, 'HINGE = AXIS', { 'font-size': 15, 'letter-spacing': 2, fill: C.ink, 'font-weight': 600 });
const pushDot = mk(s, 'circle', { r: 9, fill: '#fff', stroke: FC, 'stroke-width': 3.5 });
const rArr = PUC.arrow(s, RC, 4.5, 14), rLab = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const rExt = mk(s, 'line', { stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const thArc = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), thLab = txt(s, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 21 });
const rA90 = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3 });
const fPar = PUC.arrow(s, C.dim, 4, 12), fPerp = PUC.arrow(s, FC, 4.5, 14), fPl = txt(s, 0, 0, 'F sin θ = 10 N', { fill: FC, 'font-weight': 700, 'font-size': 19, 'text-anchor': 'middle' });
const fArr = PUC.arrow(s, FC, 7, 20), fLab = SYM(s, 0, 0, 'F', FC, 28);
const tq = turnArc(s, FC, 4.5), tqL = SYM(s, HX + 4, HY - 74, 'τ', FC, 28);

// trials: same 20 N push at r, angle theta (deg, between r and F)
const tSl = wt('S9', 'slant'), tFz = wt('S7', 'Freeze') + 0.1, tRes = wt('S8', 'right') + 0.25, tR0 = tFz - 0.6;
const TR = [{ r: 0.3, tR: wt('S3', 'Push') - 0.5, tp: wt('S3', 'torque') }, { r: 0.6, tR: wt('S4', 'Push') - 0.5, tp: wt('S4', 'Twice') }, { r: 0.9, tR: wt('S5', 'Push') - 0.5, tp: wt('S5', 'Eighteen') },
  { r: 0.9, tR: tS7 - 0.05, replay: true }, { r: 0.9, tR: tSl - 0.75, tp: wt('S10', 'drops') }];
const rTr = M.track(0.3, [[wt('S4', 'Push'), 0.6, M.HEAVY], [wt('S5', 'Push'), 0.9, M.HEAVY]], M.HEAVY);
const thAt = t => 90 + 60 * M.io((t - tSl - 0.1) / 1.2);
const sOf = (k, t) => { const q = TR[k]; if (!q.replay) return t - q.tp;
  if (t < tFz) return 0.25 * (t - tR0); if (t < tRes) return 0.25 * (tFz - tR0); if (t < tRes + 0.8) return 0.25 * (tFz - tR0) + 0.25 * (t - tRes); return 0.25 * (tFz - tR0) + 0.2 + (t - tRes - 0.8); };
const tqOf = (r, th) => r * FN * Math.sin(th * D2R);
function simState(t) {
  let k = 0; for (let i = 0; i < TR.length; i++) if (t >= TR[i].tR) k = i;
  const q = TR[k], r = k < 3 ? (t < wt('S3', 'Push') - 0.1 ? 0.3 : rTr(t)) : 0.9, th = k === 4 ? thAt(t) : 90, tqv = tqOf(r, th);
  const sv = sOf(k, t), prev = k ? phiAt(tqOf(TR[k - 1].r, k === 4 ? 90 : 90), 99) : 0, re = M.io((t - q.tR) / 0.45);
  let phi = t < q.tR + 0.45 && k ? prev * (1 - re) : phiAt(tqv, sv);
  if (k === 0 && t < q.tR + 0.45) phi = 0;
  return { k, r, th, tq: tqv, sv, phi, moving: movingAt(tqv, sv) && !(q.replay && t >= tFz && t < tRes), replay: !!q.replay, frozen: q.replay && t >= tFz && t < tRes };
}
$('#roA').innerHTML = `<span class="k" style="color:${RC}">r</span><span class="v" id="r_r" style="color:${RC}">0.30</span><span class="u">m</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_F" style="color:${FC}">20</span><span class="u">N</span>
  <span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">90</span><span class="u">deg</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${FC}">F<sub>⊥</sub></span><span class="v" id="r_Fp" style="color:${FC}">20.0</span><span class="u">N</span>
  <span class="k" style="color:${FC}">τ</span><span class="v" id="r_tq" style="color:${FC}">6.0</span><span class="u">N m</span>
  <span class="k" style="font-style:normal;font-size:22px;color:${C.ink2}">turned</span><span class="v" id="r_ph">0</span><span class="u">deg</span>`;
// graph 1: torque vs r ; graph 2: torque vs theta
const g1s = $('#grS1'), g1 = PUC.graph(g1s, { x: 110, y: 74, w: 560, h: 146, xmax: 1.1, ymax: 20, xt: [0, 0.3, 0.6, 0.9], yt: [0, 6, 12, 18], xl: 'r (m)' });
txt(g1s, 122, 80, 'τ (N m)', { 'font-size': 18 });
const g1l = g1.curve(FC, 5), g1d = g1.dot(FC, 10), g1p = [0.3, 0.6].map(x => mk(g1s, 'circle', { cx: g1.X(x), cy: g1.Y(20 * x), r: 7, fill: '#fff', stroke: FC, 'stroke-width': 3 }));
const g2s = $('#grS2'), g2 = PUC.graph(g2s, { x: 110, y: 74, w: 560, h: 146, xmax: 210, ymax: 20, xt: [0, 30, 60, 90, 120, 150, 180], yt: [0, 9, 18], xl: 'θ (°)' });
txt(g2s, 122, 80, 'τ (N m)', { 'font-size': 18 });
const g2l = g2.curve(FC, 5), g2d = g2.dot(FC, 10);
const g2g = mk(g2s, 'line', { stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 6' });

/* ---------- D: the formula ---------- */
const STEPS = [[`\\vec{${tau_}} = \\vec{${r_}} \\times \\vec{${F_}}`, 'torque is a vector: position vector cross force', 'VECTOR'],
  [`${tau_} = ${r_}\\,${F_}\\sin${th_}`, 'θ = the angle between r and F, tail to tail'],
  [`${tau_} = (${r_}\\sin${th_})\\,${F_} = ${rp_}\\,${F_}`, 'moment arm r⊥: shortest distance, axis to the line of F'],
  [`[${tau_}] = \\text{N m} = [\\text{M}\\,\\text{L}^2\\,\\text{T}^{-2}]`, 'unit newton metre']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:84px"></div>` + STEPS.map(([f, w, tg], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${FC}">${tg}</div>` : ''}</div>`).join('');
const tStep = [wt('D2', 'Torque'), wt('D3', 'size'), wt('D4', 'moment'), wt('D5', 'unit')];
const dp = $('#dpS'), DH = [70, 330], DP = [370, 330], DTH = 120, DFL = 112, du = U(DTH), DQ = [DP[0] + du[0] * 150, DP[1] + du[1] * 150];
mk(dp, 'line', { x1: 40, y1: DH[1], x2: 480, y2: DH[1], stroke: C.dim, 'stroke-width': 1.5 });
const dLoa = mk(dp, 'line', { x1: DP[0] - du[0] * 60, y1: DP[1] - du[1] * 60, x2: DP[0] + du[0] * 230, y2: DP[1] + du[1] * 230, stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const dRp = mk(dp, 'line', { x1: DH[0], y1: DH[1], x2: DQ[0], y2: DQ[1], stroke: RC, 'stroke-width': 3.5, 'stroke-dasharray': '7 5' });
const dRa = mk(dp, 'path', { d: rAng(DQ[0], DQ[1], angOf(DH[0] - DQ[0], DH[1] - DQ[1]), DTH, 14), fill: 'none', stroke: TC, 'stroke-width': 3 });
const dRpL = SYM(dp, (DH[0] + DQ[0]) / 2 - 16, (DH[1] + DQ[1]) / 2 - 16, 'r⊥ = r sin θ', RC, 22, { 'text-anchor': 'end' });
const dAx = axisMk(dp, DH[0], DH[1], 12), dR = PUC.arrow(dp, RC, 5, 16), dF = PUC.arrow(dp, FC, 6, 18);
const dRL = SYM(dp, 220, DH[1] + 34, 'r', RC, 28), dFL = SYM(dp, DP[0] + du[0] * DFL + 14, DP[1] + du[1] * DFL - 6, 'F', FC, 28);
const dExt = mk(dp, 'line', { x1: DP[0], y1: DP[1], x2: DP[0] + 90, y2: DP[1], stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const dTh = mk(dp, 'path', { d: arcD(DP[0], DP[1], 34, 0, DTH), fill: 'none', stroke: TC, 'stroke-width': 3.5 }), dThL = SYM(dp, DP[0] + 30, DP[1] - 40, 'θ', TC, 24);
const dTq = turnArc(dp, FC, 4), dOut = mk(dp, 'g', {});
mk(dOut, 'circle', { cx: 60, cy: 414, r: 15, fill: '#fff', stroke: FC, 'stroke-width': 3 }); mk(dOut, 'circle', { cx: 60, cy: 414, r: 4.5, fill: FC });
txt(dOut, 86, 421, 'τ points out of the screen', { fill: FC, 'font-weight': 700, 'font-size': 20 });
txt(dOut, 86, 448, 'curl r → F, thumb = τ', { fill: C.ink2, 'font-weight': 600, 'font-size': 17 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tau_} = ${F_} \\times ${rp_} \\qquad \\small{${rp_}\\text{: axis to the line of } ${F_}}`);

/* ---------- R: link by link + flip it around ---------- */
const LK = [`Your push <b class="fo">F</b> is about the same each time`, `The handle is far: the moment arm is big`, `Big arm &rarr; big torque: ${K(`${tau_} = ${rp_}${F_}`)}`, `So the door turns easily`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'push'), wt('R2', 'handle'), wt('R3', 'big'), wt('R3', 'door')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the handle goes at the far edge!' });
const BARS = [[0.9, 10, 'at the handle'], [0.45, 20, 'halfway'], [0.15, 60, 'near the hinge']];
$('#bars').innerHTML = BARS.map(([r, f, n], i) => `<div class="blab" id="bl${i}" style="left:36px;top:${104 + i * 110}px;color:${RC}">r = ${r.toFixed(2)} m</div><div class="blab" id="bn${i}" style="left:36px;top:${136 + i * 110}px;font:500 18px Poppins;color:var(--mute)">${n}</div><div class="bar" id="bb${i}" style="left:236px;top:${104 + i * 110}px;background:${FC}"></div><div class="blab" id="bv${i}" style="top:${113 + i * 110}px;color:${FC}">${f} N</div>`).join('');
$('#rrF').innerHTML = K(`${F_} = \\dfrac{${tau_}}{${rp_}} = \\dfrac{9\\,\\text{N m}}{${rp_}}`);
const tBar = [wt('R4', 'handle'), wt('R4', 'Halfway'), wt('R4', 'Near')];
const th2 = PUC.think($('#th2'), { q: 'Which turns a stuck bolt more?', opts: ['40 N at 0.2 m', '20 N at 0.5 m'], right: 1, why: '20 × 0.5 = 10 N m beats 40 × 0.2 = 8 N m. The arm wins.' });

/* ---------- K: side by side ---------- */
const KH = [110, 380], KPx = KH[0] + 0.6 * PXM;
const KV = ['#klS', '#krS'].map((id, i) => { const sv = $(id), th = i ? 150 : 90, u = U(th), P = [KPx, KH[1]];
  mk(sv, 'rect', { x: KH[0], y: KH[1] - 8, width: DL, height: 16, rx: 3, fill: WOOD, stroke: WOODD, 'stroke-width': 2.5 });
  axisMk(sv, KH[0], KH[1], 13); txt(sv, KH[0], KH[1] + 50, 'HINGE', { 'font-size': 15, 'letter-spacing': 2, 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
  const g = mk(sv, 'g', {}), Q = [P[0] + u[0] * ((KH[0] - P[0]) * u[0]), P[1] + u[1] * ((KH[0] - P[0]) * u[0])];
  const loa = mk(g, 'line', { x1: P[0] - u[0] * 90, y1: P[1] - u[1] * 90, x2: P[0] + u[0] * 300, y2: P[1] + u[1] * 300, stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  const f = PUC.arrow(sv, FC, 7, 20), fl = SYM(sv, P[0] + u[0] * 130 + (i ? -10 : 14), P[1] + u[1] * 130 - 8, 'F', FC, 28);
  mk(sv, 'circle', { cx: P[0], cy: P[1], r: 8, fill: '#fff', stroke: FC, 'stroke-width': 3.5 });
  const ra = PUC.arrow(sv, RC, 4.5, 14), rl = txt(sv, (KH[0] + P[0]) / 2, KH[1] + 50, 'r = 0.6 m', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
  const arm = mk(sv, 'line', { x1: KH[0], y1: KH[1], x2: Q[0], y2: Q[1], stroke: RC, 'stroke-width': 4, 'stroke-dasharray': i ? '8 5' : '0', opacity: i ? 1 : 0 });
  const armL = txt(sv, i ? Q[0] - 14 : (KH[0] + P[0]) / 2, i ? Q[1] - 20 : KH[1] + 84, i ? 'r⊥ = 0.3 m' : 'r⊥ = r = 0.6 m', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': i ? 'end' : 'middle' });
  const ra2 = mk(sv, 'path', { d: i ? rAng(Q[0], Q[1], angOf(KH[0] - Q[0], KH[1] - Q[1]), th + 180, 14) : rAng(P[0], P[1], 180, 90, 16), fill: 'none', stroke: TC, 'stroke-width': 3 });
  const ar = i ? mk(sv, 'path', { d: arcD(P[0], P[1], 40, 0, 150), fill: 'none', stroke: TC, 'stroke-width': 3.5 }) : null, arl = i ? SYM(sv, P[0] + 30, P[1] - 46, '150°', TC, 20, { 'font-style': 'normal' }) : null;
  const ext = mk(sv, 'line', { x1: P[0], y1: P[1], x2: P[0] + 80, y2: P[1], stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5', opacity: i ? 1 : 0 });
  return { sv, P, Q, u, f, fl, ra, rl, arm, armL, ra2, ar, arl, ext, loa, g }; });
$('#klF').innerHTML = K(`${tau_} = ${r_}${F_} = 0.6 \\times 20 = 12\\,\\text{N m}`); $('#krF').innerHTML = K(`${tau_} = ${r_}${F_}\\sin 150^\\circ = 6\\,\\text{N m}`);
$('#klP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Moment arm = <i class="vi">r</i>`;
$('#krP').innerHTML = `Moment arm = <i class="vi">r</i> sin <i class="go">θ</i>, shorter than <i class="vi">r</i>`;
const th1 = PUC.think($('#th1'), { q: 'A very hard push, straight along the door, toward the hinge. Does it turn?', opts: ['Yes, it turns', 'No, it does not'], right: 1, why: 'Its line passes through the hinge: arm 0, so τ = 0.' });

/* ---------- W: the pedal ---------- */
$('#wkq').innerHTML = 'A pedal crank is 0.17 m long. Aarav pushes straight down with 200 N. Find the torque with the crank level, then at 30° from the vertical.';
const wsol = PUC.solution($('#wl'), [
  [K(`${tau_} = ${r_}\\,${F_}\\sin${th_}`)],
  [K(`\\text{level: } ${tau_} = 0.17 \\times 200 \\times \\sin 90^\\circ = 34\\,\\text{N m}`)],
  [K(`\\text{lower: } ${th_} = 30^\\circ,\\ \\sin 30^\\circ = \\tfrac12`)],
  [K(`${tau_} = 0.17 \\times 200 \\times \\tfrac12 = ${tc(FC, '17\\,\\text{N m}')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 74 });
$('#wl .lbl').style.top = '30px';
$('#wl').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '27px');
const avD = PUC.avatar($('#sW'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same push, half the torque!' });
const w = $('#wrS'), WA = [290, 236], WL = 238;     // 1400 px per metre
mk(w, 'circle', { cx: WA[0], cy: WA[1], r: 92, fill: 'none', stroke: IC, 'stroke-width': 4 });
for (let k = 0; k < 36; k++) { const a = k * 10 * D2R; mk(w, 'line', { x1: WA[0] + 92 * Math.cos(a), y1: WA[1] + 92 * Math.sin(a), x2: WA[0] + 103 * Math.cos(a), y2: WA[1] + 103 * Math.sin(a), stroke: IC, 'stroke-width': 3 }); }
const wCrO = mk(w, 'g', {}), wCr = mk(wCrO, 'g', {});
mk(wCr, 'rect', { x: WA[0], y: WA[1] - 9, width: WL, height: 18, rx: 9, fill: '#5B6B8C', stroke: IC, 'stroke-width': 2 });
mk(wCr, 'rect', { x: WA[0] + WL - 22, y: WA[1] - 26, width: 44, height: 52, rx: 8, fill: IC });
axisMk(w, WA[0], WA[1], 14); txt(w, WA[0] - 110, WA[1] + 140, 'AXLE = AXIS', { 'font-size': 15, 'letter-spacing': 2, 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const wF = PUC.arrow(w, FC, 7, 20), wFL = txt(w, 0, 0, 'F = 200 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' });
const wR = PUC.arrow(w, RC, 4.5, 14), wRL = txt(w, 0, 0, 'r = 0.17 m', { fill: RC, 'font-weight': 700, 'font-size': 20 });
const wExt = mk(w, 'line', { stroke: TC, 'stroke-width': 2, 'stroke-dasharray': '4 5' }), wTh = mk(w, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), wThL = txt(w, 0, 0, '', { fill: TC, 'font-weight': 700, 'font-size': 21 });
const wVert = mk(w, 'line', { x1: WA[0], y1: WA[1], x2: WA[0], y2: WA[1] + 300, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const tW = [T0('W2') + 0.6, wt('W3', 'Torque'), wt('W4', 'theta'), wt('W5', 'seventeen')], tWrot = wt('W4', 'Lower');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'τ = F × r, the distance to the push point', right: 'τ = F × r⊥, the distance to the line of F' });
const tp = $('#tpS'), TH = [70, 210], TPt = [370, 210], tu = U(150), TQ = [TPt[0] + tu[0] * 259.8, TPt[1] + tu[1] * 259.8];
mk(tp, 'rect', { x: TH[0], y: TH[1] - 7, width: 340, height: 14, rx: 3, fill: WOOD, stroke: WOODD, 'stroke-width': 2 });
axisMk(tp, TH[0], TH[1], 11);
const tLoa = mk(tp, 'line', { x1: TPt[0] - tu[0] * 40, y1: TPt[1] - tu[1] * 40, x2: TPt[0] + tu[0] * 300, y2: TPt[1] + tu[1] * 300, stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const tFa = PUC.arrow(tp, FC, 6, 18); SYM(tp, TPt[0] + tu[0] * 100 + 6, TPt[1] + tu[1] * 100 - 14, 'F', FC, 24);
const tRw = mk(tp, 'line', { x1: TH[0], y1: TH[1] + 26, x2: TPt[0], y2: TPt[1] + 26, stroke: C.red, 'stroke-width': 4 }), tRwL = txt(tp, (TH[0] + TPt[0]) / 2, TH[1] + 56, 'r  (wrong)', { fill: C.red, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const tRr = mk(tp, 'line', { x1: TH[0], y1: TH[1], x2: TQ[0], y2: TQ[1], stroke: C.ok, 'stroke-width': 4 }), tRrL = txt(tp, TQ[0] - 30, TQ[1] + 70, 'r⊥ (right)', { fill: C.ok, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
const tRa = mk(tp, 'path', { d: rAng(TQ[0], TQ[1], angOf(TH[0] - TQ[0], TH[1] - TQ[1]), 150, 12), fill: 'none', stroke: C.ok, 'stroke-width': 3 });
const where = PUC.where($('#wa'), { on: [], type: 'Torque as r × F, moment arm questions, and the direction of torque' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 10 N force acts along the line y = x + 2 (distances in metres). What is the size of its torque about the origin?', qW: 760,
  opts: ['10 N m', K('10\\sqrt{2}\\ \\text{N m}'), '20 N m', K('20\\sqrt{2}\\ \\text{N m}')], right: 1, optY: 330, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`\\text{line at } 45^\\circ,\\ \\text{cuts the } y \\text{ axis at } 2`)], [K(`${rp_} = 2\\sin 45^\\circ = \\sqrt2\\ \\text{m}`)],
  [K(`${tau_} = ${F_}\\,${rp_} = 10\\sqrt2\\ \\text{N m}`)], [K(`${tau_} \\approx 14.1\\ \\text{N m}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '24px');
const tSo = [wt('A2', 'line'), wt('A3', 'moment'), wt('A4', 'Torque'), wt('A4', 'About')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · torque', y0: 100, dy: 96, txt: [0, 0, 1, 1],
  lines: [K(`\\vec{${tau_}} = \\vec{${r_}} \\times \\vec{${F_}} \\qquad ${tau_} = ${r_}${F_}\\sin${th_}`), K(`${tau_} = ${rp_}\\,${F_} = ${r_}\\,${Fp_} \\qquad ${rp_} = ${r_}\\sin${th_}`),
    '<b>Unit</b>: N m · <span class="mono">[M L² T⁻²]</span> · <b>direction</b>: right-hand rule, along the axis', '<b>Force through the axis</b>: moment arm 0, so torque 0'] });
const YQ = ['Why do door handles sit far from the hinge?', 'Why does a push straight toward the hinge not turn a door?', 'How is the moment arm different from the distance r?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 100', topic: 'Turning momentum in a straight line? Angular Momentum', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tS9 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px';
  BARS.forEach(([, f], i) => { const W = 440 * f / 60; $('#bb' + i).style.width = '0px'; $('#bv' + i).style.left = (236 + W + 14) + 'px'; $('#bb' + i)._W = W; }); }

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const t0 = tMorph + 0.8 + i * 0.45, fo = M.io((t - t0) / 0.3) * (1 - M.io((t - t0 - 1.2) / 0.3)); LV[i].set(-12 + 20 * M.io((t - t0 - 0.2) / 1.0), fo); });
    vis($('#hjP'), t, wt('H2', 'same') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkI'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hkA'), t, tH3 + 0.3, 1e9, { dy: 30 });
    vis($('#hp0'), t, wt('H3', 'barely') - 0.1, 1e9, POP); vis($('#hp1'), t, wt('H4', 'swings') - 0.1, 1e9, POP);
    vis($('#hkQ'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#mv0'), t, wt('P1', 'move') - 0.15, 1e9, POP); vis($('#mv1'), t, wt('P1', 'turn') - 0.15, 1e9, POP);
    vis($('#igL'), t, tP4 + 0.1, 1e9, { dy: 10 }); IG.forEach((_, i) => vis($('#ig' + i), t, tIg[i] - 0.15, 1e9, POP));
    vis($('#pm'), t, T0('P2') + 0.2, out, { dx: 60, dy: 0, ...o });
    AXT.forEach((a, i) => { vis($('#ax' + i), t, tAx[i] - 0.15, 1e9, POP); const u = M.io((t - tAx[i] - 0.2) / 1.0); a.L.set(-12 + 20 * u, M.io((t - tAx[i]) / 0.3) * (1 - M.io((t - tAx[i] - 1.4) / 0.3))); a.ta.set(a.L.AX, a.L.AY, 36, 100, 120 * u); });
  }

  /* S: door sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#exS'), t, T0('S2') + 0.2, 1e9, { dy: 8 });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const S = simState(t), ph = S.phi / D2R;
    attr(door, 'transform', `rotate(${(-ph).toFixed(2)} ${HX} ${HY})`);
    const gstep = S.replay ? 0.03 : 0.07, q = TR[S.k];
    ghosts.forEach((gh, j) => { const sp = S.sv - gstep * (j + 1), pg = phiAt(S.tq, sp) / D2R; attr(gh.g, 'transform', `rotate(${(-pg).toFixed(2)} ${HX} ${HY})`); gh.g.style.opacity = S.moving && sp > 0 && ph - pg > 0.8 ? [0.3, 0.2, 0.12][j] : 0; });
    vis(swing, t, tS1 + 0.6, 1e9, { dy: 0 });
    const d = U(ph), n = U(ph + 90), P = [HX + S.r * PXM * d[0], HY + S.r * PXM * d[1]];
    const shown = t >= wt('S3', 'Push') - 0.15;
    attr(pushDot, 'cx', P[0].toFixed(1)); attr(pushDot, 'cy', P[1].toFixed(1)); M.hide(pushDot, !shown);
    // r: violet arrow along the door, offset to the room side
    const off = 30, ro = [-n[0] * off, -n[1] * off];
    rArr.set(HX + ro[0], HY + ro[1], P[0] + ro[0], P[1] + ro[1]); rArr.g.style.opacity = shown ? 1 : 0;
    attr(rLab, 'x', Math.max(250, (HX + P[0]) / 2 + ro[0] * 1.8).toFixed(1)); attr(rLab, 'y', ((HY + P[1]) / 2 + ro[1] * 1.8 + 7).toFixed(1)); M.setT(rLab, 'r = ' + S.r.toFixed(2) + ' m'); rLab.style.opacity = shown ? 1 : 0;
    // F: grows from the push point while the push lasts (aim faintly before)
    let fo = 0, aim = 0;
    if (q.replay) fo = M.io(S.sv / 0.1) * (1 - M.io((S.sv - TP) / 0.15)); else if (S.k < 4 || t >= wt('S10', 'drops')) fo = M.io(S.sv / 0.12) * (1 - M.io((S.sv - TP) / 0.15));
    if (S.k < 3 && shown && S.sv < 0) aim = 0.35; if (S.k === 4 && t < wt('S10', 'drops')) aim = M.io((t - tSl + 0.3) / 0.3);
    const fShow = Math.max(fo, aim), fu = U(ph + S.th), FL = FN * FPX * Math.max(fo, aim > 0 ? 1 : 0);
    fArr.set(P[0], P[1], P[0] + fu[0] * FL, P[1] + fu[1] * FL); fArr.g.style.opacity = fo > 0.01 ? Math.max(fo, aim) : aim;
    attr(fLab, 'x', (P[0] + fu[0] * (FL + 22) - 8).toFixed(1)); attr(fLab, 'y', (P[1] + fu[1] * (FL + 22) + 10).toFixed(1)); fLab.style.opacity = fShow;
    // turning arrow about the hinge, sized by the torque, while a push acts
    tq.set(HX, HY, 52, ph + 10, 9 * S.tq * fo); tqL.style.opacity = fo; attr(tqL, 'x', HX - 8); attr(tqL, 'y', HY - 64);
    // slow-mo extras: right angle at the push point, theta arc and extension, F components
    const fz = S.frozen ? 1 : 0, ang = S.k === 4 ? 1 : 0, u90 = M.io((t - wt('S8', 'right') + 0.1) / 0.3) * (S.k === 3 ? 1 : 0);
    attr(rA90, 'd', rAng(P[0], P[1], ph + 180, ph + 90, 16)); rA90.style.opacity = u90 * (1 - M.io((t - tRes - 0.3) / 0.3));
    attr(rExt, 'x1', P[0]); attr(rExt, 'y1', P[1]); attr(rExt, 'x2', P[0] + d[0] * 80); attr(rExt, 'y2', P[1] + d[1] * 80); rExt.style.opacity = ang * M.io((t - tSl) / 0.3);
    attr(thArc, 'd', arcD(P[0], P[1], 40, ph, ph + S.th)); thArc.style.opacity = ang * M.io((t - tSl) / 0.3);
    attr(thLab, 'x', (P[0] + 50).toFixed(1)); attr(thLab, 'y', (P[1] - 18).toFixed(1)); M.setT(thLab, Math.round(S.th) + '°'); thLab.style.opacity = thArc.style.opacity;
    const cu = ang * M.io((t - wt('S10', 'part') + 0.1) / 0.4), sn = Math.sin(S.th * D2R), cs = Math.cos(S.th * D2R), L0 = FN * FPX;
    fPerp.set(P[0], P[1], P[0] + n[0] * L0 * sn * cu, P[1] + n[1] * L0 * sn * cu); fPar.set(P[0], P[1], P[0] + d[0] * L0 * cs * cu, P[1] + d[1] * L0 * cs * cu);
    attr(fPl, 'x', (P[0] + n[0] * L0 * sn).toFixed(1)); attr(fPl, 'y', (P[1] + n[1] * L0 * sn - 18).toFixed(1)); fPl.style.opacity = cu;
    vis(hingeL, t, T0('S1') + 1.0, 1e9, { dy: 0 });
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    // readout: round the shown inputs first, then compute from them
    const rr = Math.round(S.r * 100) / 100, thr = Math.round(S.th), tqr = rr * FN * Math.sin(thr * D2R);
    M.setT($('#r_r'), rr.toFixed(2)); M.setT($('#r_th'), String(thr)); M.setT($('#r_Fp'), (FN * Math.sin(thr * D2R)).toFixed(1)); M.setT($('#r_tq'), tqr.toFixed(1)); M.setT($('#r_ph'), String(Math.round(ph)));
    M.setT($('#roT'), ['PUSH 1 OF 3', 'PUSH 2 OF 3', 'PUSH 3 OF 3', 'REPLAY · PUSH 3', 'SLANTED PUSH'][S.k]); vis($('#roT'), t, wt('S3', 'Push'), 1e9, POP);
    $('#r_tq').style.background = mix('#FFFFFF', '#FBEBDD', M.io((t - wt('S10', 'drops')) / 0.3) * (1 - M.io((t - tS10 - 3.5) / 0.4)));
    // graphs
    const two = t >= tSl - 0.3, tw = M.io((t - tSl + 0.3) / 0.35);
    vis($('#grL1'), t, tS1 + 0.5, tSl - 0.3, { dy: 0, outDur: 0.2 }); vis($('#grL2'), t, tSl - 0.1, 1e9, { dy: 0 });
    g1s.style.opacity = (1 - tw).toFixed(3); g2s.style.opacity = tw.toFixed(3); M.hide(g1s, tw > 0.99); M.hide(g2s, tw < 0.01);
    const rDone = S.k === 0 ? (S.sv > 0 ? 0.3 : 0) : S.k === 1 ? (S.sv > 0 ? S.r : 0.3) : 0.9;
    g1l(x => [x, 20 * x], 0, Math.max(rDone, 0));
    g1d(S.r, 20 * S.r, shown); g1p.forEach((c, i) => { c.style.opacity = (S.k > i + 0 && !(S.k === i + 1 && S.sv <= 0 && false)) ? 1 : 0; });
    vis($('#grT'), t, wt('S6', 'straight') - 0.1, tSl - 0.4, { ...POP, outDur: 0.2 });
    g2l(x => [x, 18 * Math.sin(x * D2R)], 90, S.th); g2d(S.th, 18 * Math.sin(S.th * D2R), two);
    attr(g2g, 'x1', g2.X(90)); attr(g2g, 'y1', g2.Y(0)); attr(g2g, 'x2', g2.X(90)); attr(g2g, 'y2', g2.Y(18)); g2g.style.opacity = tw * 0.8;
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const u0 = M.o3((t - wt('D2', 'r') + 0.1) / 0.5), u1 = M.o3((t - wt('D2', 'F') + 0.1) / 0.5);
    vis(dAx, t, tD1 + 0.6, 1e9, { dy: 0 });
    dR.set(DH[0], DH[1], DH[0] + (DP[0] - DH[0]) * u0, DH[1]); dRL.style.opacity = u0;
    dF.set(DP[0], DP[1], DP[0] + du[0] * DFL * u1, DP[1] + du[1] * DFL * u1); dFL.style.opacity = u1;
    const ut = M.io((t - wt('D3', 'theta') + 0.1) / 0.4); dExt.style.opacity = ut; M.drawU(dTh, ut); dThL.style.opacity = ut;
    const um = M.io((t - wt('D4', 'shortest') + 0.1) / 0.5); M.drawU(dLoa, um); M.drawU(dRp, M.io((t - wt('D4', 'axis') + 0.1) / 0.5));
    const ua = M.io((t - wt('D4', 'line') + 0.1) / 0.3); dRa.style.opacity = ua; dRpL.style.opacity = ua;
    const ur = M.io((t - wt('D6', 'Curl') + 0.1) / 0.8); dTq.set(DH[0], DH[1], 46, 10, 150 * ur); vis(dOut, t, wt('D6', 'out') - 0.2, 1e9, { dy: 8 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Torque') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'axis') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R5');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    avA(t, wt('R3', 'easily') + 0.3, out);
    vis($('#rr'), t, T0('R4') - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, T0('R4') + 0.3, 1e9, { dy: 8 });
    BARS.forEach((_, i) => { const u = M.o3((t - tBar[i] + 0.1) / 0.6); vis($('#bl' + i), t, tBar[i] - 0.3, 1e9, { dy: 8 }); vis($('#bn' + i), t, tBar[i] - 0.25, 1e9, { dy: 8 }); $('#bb' + i).style.width = ($('#bb' + i)._W * u).toFixed(1) + 'px'; M.hide($('#bb' + i), u <= 0); vis($('#bv' + i), t, tBar[i] + 0.4, 1e9, POP); });
    PUC.write($('#rrF'), t, wt('R4', 'Flip') + 0.2, 0.8);
    vis($('#th2'), t, tR5 + 0.05, OUT('K1'), { dy: 36, ...o });
    th2(t, { tin: tR5, tOpts: wt('R5', 'forty') - 0.1, tCount: T1('R5') + 0.05, dur: 3, tAns: T0('R6') - 0.02, tWhy: wt('R6', 'That') });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    KV.forEach((k, i) => { const t0 = i ? T0('K2') + 0.2 : tK1 + 0.3, uf = M.o3((t - t0) / 0.5), P = k.P;
      k.f.set(P[0], P[1], P[0] + k.u[0] * 120 * uf, P[1] + k.u[1] * 120 * uf); k.fl.style.opacity = uf;
      k.ra.set(KH[0], KH[1] + 26, KH[0] + (P[0] - KH[0]) * uf, KH[1] + 26); k.ra.g.style.opacity = i ? 0.5 : 1; k.rl.style.opacity = uf; if (!i) k.rl.style.opacity = 0;
      const tm = i ? wt('K2', 'closer') : wt('K1', 'arm'), um = M.io((t - tm + 0.1) / 0.5);
      M.drawU(k.loa, i ? M.io((t - wt('K2', 'line') + 0.1) / 0.5) : 0);
      if (i) { M.drawU(k.arm, um); k.ext.style.opacity = uf; k.ar.style.opacity = uf; k.arl.style.opacity = uf; } else { k.arm.style.opacity = 0; }
      k.armL.style.opacity = um; k.ra2.style.opacity = um; });
    PUC.write($('#klF'), t, wt('K1', 'full') + 0.3, 0.8); PUC.write($('#krF'), t, wt('K2', 'shorter') + 0.3, 0.8);
    vis($('#klP'), t, wt('K1', 'full') - 0.1, 1e9, POP); vis($('#krP'), t, wt('K2', 'shorter') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Will') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'line') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW); avD(t, wt('W5', 'Half') - 0.1, out);
    vis($('#wr'), t, tW1 + 0.3, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, tW1 + 0.7, 1e9, { dy: 8 });
    const a = -60 * M.io((t - tWrot) / 1.4), d = U(a), E = [WA[0] + WL * d[0], WA[1] + WL * d[1]];
    attr(wCr, 'transform', `rotate(${(-a).toFixed(2)} ${WA[0]} ${WA[1]})`);
    const uf = M.o3((t - wt('W2', 'pushes') + 0.1) / 0.5); wF.set(E[0], E[1], E[0], E[1] + 100 * uf); attr(wFL, 'x', (E[0] - 16).toFixed(1)); attr(wFL, 'y', (E[1] + 86).toFixed(1)); wFL.style.opacity = uf;
    const n = U(a + 90), ur = M.o3((t - wt('W2', 'crank') + 0.1) / 0.5); wR.set(WA[0] + n[0] * 40, WA[1] + n[1] * 40, WA[0] + n[0] * 40 + (E[0] - WA[0]) * ur, WA[1] + n[1] * 40 + (E[1] - WA[1]) * ur);
    attr(wRL, 'x', (WA[0] + n[0] * 64 + (E[0] - WA[0]) * 0.5).toFixed(1)); attr(wRL, 'y', (WA[1] + n[1] * 64 + (E[1] - WA[1]) * 0.5 + 6).toFixed(1)); wRL.style.opacity = ur;
    const th = 90 + a, ua = M.io((t - wt('W3', 'right') + 0.1) / 0.3);
    attr(wExt, 'x1', E[0]); attr(wExt, 'y1', E[1]); attr(wExt, 'x2', E[0] + d[0] * 70); attr(wExt, 'y2', E[1] + d[1] * 70); wExt.style.opacity = ua;
    attr(wTh, 'd', arcD(E[0], E[1], 44, -90, a)); wTh.style.opacity = ua; attr(wThL, 'x', (E[0] + 50).toFixed(1)); attr(wThL, 'y', (E[1] + 30).toFixed(1)); M.setT(wThL, 'θ = ' + Math.round(th) + '°'); wThL.style.opacity = ua;
    vis(wVert, t, tWrot + 0.6, 1e9, { dy: 0 });
    const tc2 = $('#tqC'); vis(tc2, t, wt('W3', 'Thirty') - 0.1, 1e9, POP); M.setT($('#tqN'), t >= wt('W5', 'seventeen') - 0.05 ? '17' : '34');
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'torque') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'perpendicular') - 0.3 });
    const uf = M.o3((t - tX1 - 0.4) / 0.5); tFa.set(TPt[0], TPt[1], TPt[0] + tu[0] * 100 * uf, TPt[1] + tu[1] * 100 * uf); vis(tLoa, t, tX1 + 0.6, 1e9, { dy: 0 });
    const uw = M.io((t - wt('X2', 'distance') + 0.1) / 0.4); tRw.style.opacity = uw; tRwL.style.opacity = uw;
    const ur = M.io((t - wt('X3', 'perpendicular') + 0.1) / 0.5); M.drawU(tRr, ur); tRrL.style.opacity = ur; tRa.style.opacity = ur;
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'torque') });
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

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
