// PUC Physics Ep 41: Projectile motion (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VX = C.ac, VY = C.violet, GC = C.red, RC = C.ink, FC = C.orange;    // v_x blue, v_y violet, g red, resultant ink, push F orange
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const TH = C.gold;                                                // angle theta = gold (canon)
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);   // svg: no scale (origin 0 0)
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const vx = tc(VX, 'v_x'), vy = tc(VY, 'v_y'), gg = tc(GC, 'g'), ucos = tc(VX, 'u\\cos')+'\\,'+tc(C.gold, '\\theta'), usin = tc(VY, 'u\\sin')+'\\,'+tc(C.gold, '\\theta');
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2);
const G = 9.8, D2R = Math.PI / 180;

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  jump: ['M14 4a2 2 0 1 0 0-.01', 'M4 17l4-3 3 2 3-5 4 2', 'M11 16l-2 5', 'M14 11l3 5h3'],
  rocket: ['M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z', 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'],
  stone: ['M4 15l3-8 8-3 5 6-2 8-9 2z'],
  coin: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 7v10'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS8 = T0('S8'), tA1 = T0('A1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('B1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['ball', 'Ball', 'TOSSED TO A FRIEND', 'ball', 'M10,80 Q130,-40 250,80'], ['drop', 'Hose water', 'ARCS FROM A HOSE', 'hose', 'M10,40 Q120,-10 250,86'], ['jump', 'Long jumper', 'IN THE AIR', 'jumper', 'M10,84 Q130,-10 250,84']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , d], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg width="270" height="92"><path d="M10,86 H260" stroke="${C.dim}" stroke-width="2.5" fill="none"/><path id="jp${i}" d="${d}" stroke="${C.ac}" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div>`).join('');
const TILES = [[VX, 'Flicked coin', 'arrowR'], [C.ink, 'Dropped coin', 'arrowD'], [C.ink, 'Which lands first?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'flicked'), wt('H4', 'other'), wt('H4', 'Which')];

/* ---------- P: what is a projectile ---------- */
const MT = [['ball', 'Thrown ball', 'only gravity after release', 1], ['jump', 'Long jumper', 'only gravity in the air', 1], ['stone', 'Catapult stone', 'only gravity after launch', 1], ['rocket', 'Rocket, engine on', 'engine still pushes', 0]];
$('#mts').innerHTML = MT.map(([ic, n, i, ok], k) => `<div class="mt" id="mt${k}" style="left:36px;top:${84 + k * 96 + (k === 3 ? 40 : 0)}px;width:712px"><i>${M.icon(ic, 26, ok ? C.ac : C.red, 2.2)}</i><div class="mn">${n}</div><div class="mi">${i}</div><div class="mk" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 18, '#fff', 3)}</div></div>`).join('') +
  `<div class="lbl" id="mtL" style="left:36px;top:386px;color:var(--red)">NOT A PROJECTILE</div>`;
const tMt = [wt('P3', 'thrown'), wt('P3', 'jumper'), wt('P3', 'stone'), wt('P4', 'rocket')];
const pm = $('#pmS'); mk(pm, 'line', { x1: 40, y1: 430, x2: 744, y2: 430, stroke: C.ink, 'stroke-width': 3 });
const pmArc = mk(pm, 'path', { d: 'M90,430 Q392,30 694,430', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '3 9', 'stroke-linecap': 'round', fill: 'none' });
const PMs = [0.2, 0.5, 0.8].map(u => { const x = (1 - u) * (1 - u) * 90 + 2 * u * (1 - u) * 392 + u * u * 694, y = (1 - u) * (1 - u) * 430 + 2 * u * (1 - u) * 30 + u * u * 430; return [x, y]; });
const pmB = PMs.map(([x, y]) => mk(pm, 'circle', { cx: x, cy: y, r: 15, fill: C.ink }));
const pmG = PMs.map(() => PUC.arrow(pm, GC, 6, 18)), pmL = PMs.map(([x, y]) => it(pm, x + 14, y + 86, 'g', GC));
const pmF = PUC.arrow(pm, FC, 6, 18); const pmFx = mk(pm, 'path', { d: 'M110,118 L150,158 M110,158 L150,118', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' });
const pmFl = txt(pm, 60, 200, 'NO PUSH AFTER RELEASE', { fill: C.red, 'font-size': 17, 'font-weight': 600 });

/* ---------- S: drop vs push sim (h = 4.9 m, push 5 m/s, lands at t = 1 s) ---------- */
const s = $('#simS'), GY0 = 470, SC = 70, XR = 150, XB = 210, VS = 22;     // 70 px per metre, 22 px per m/s
mk(s, 'line', { x1: 40, y1: GY0, x2: 744, y2: GY0, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(s, 'line', { x1: x, y1: GY0 + 4, x2: x - 14, y2: GY0 + 18, stroke: C.dim, 'stroke-width': 2 });
mk(s, 'rect', { x: 40, y: GY0 - 4.9 * SC, width: 196, height: 18, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
mk(s, 'rect', { x: 60, y: GY0 - 4.9 * SC + 18, width: 14, height: 4.9 * SC - 18, fill: '#B88E66', stroke: C.ink, 'stroke-width': 2 });
txt(s, 252, GY0 - 4.9 * SC / 2 + 6, '4.9 m', { fill: C.ink, 'font-weight': 600 });
mk(s, 'path', { d: `M244,${GY0 - 4.9 * SC} v${4.9 * SC}`, stroke: C.mute, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' });
const hY = h => GY0 - 15 - h * SC;       // ball centre for height h above the floor (ball radius 15)
const strobe = [0.25, 0.5, 0.75].map(k => ({ k, ln: mk(s, 'line', { x1: XR, x2: XB + 5 * k * SC, y1: hY(4.9 - 4.9 * k * k), y2: hY(4.9 - 4.9 * k * k), stroke: C.ac, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), r: mk(s, 'circle', { cx: XR, cy: hY(4.9 - 4.9 * k * k), r: 15, fill: C.ink, opacity: 0.25 }), b: mk(s, 'circle', { cx: XB + 5 * k * SC, cy: hY(4.9 - 4.9 * k * k), r: 15, fill: VX, opacity: 0.25 }) }));
const bPath = mk(s, 'path', { d: '', stroke: VX, 'stroke-width': 3, 'stroke-dasharray': '3 9', 'stroke-linecap': 'round', fill: 'none' });
const ghR = [0, 1, 2].map(() => mk(s, 'circle', { r: 15, fill: C.ink, opacity: 0 })), ghB = [0, 1, 2].map(() => mk(s, 'circle', { r: 15, fill: VX, opacity: 0 }));
const red = mk(s, 'circle', { r: 15, fill: C.ink }), blue = mk(s, 'circle', { r: 15, fill: VX });
const sVx = PUC.arrow(s, VX, 6, 18), sVyB = PUC.arrow(s, VY, 6, 18), sVyR = PUC.arrow(s, VY, 6, 18);
const lVx = it(s, 0, 0, 'vₓ = 5', VX, { 'font-size': 26 }), lVy = it(s, 0, 0, 'vᵧ', VY, { 'font-size': 26 });
const tRun = wt('S3', 'Watch'), tFz = wt('S5', 'Freeze') + 0.2, tRes = wt('S7', 'Exactly');
const tauS = t => {
  if (t < tS5) return M.clamp(t - tRun, 0, 1);
  if (t < tRes) return Math.min(0.25 * (t - tS5), 0.25 * (tFz - tS5));
  return Math.min(1, 0.25 * (tFz - tS5) + 0.25 * (t - tRes));
};
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${C.ink}">h<sub style="font-style:normal">1</sub></span><span class="v" id="r_hr" style="color:${C.ink}">4.90</span><span class="u">m</span>
  <span class="k" style="color:${VX}">h<sub style="font-style:normal">2</sub></span><span class="v" id="r_hb" style="color:${VX}">4.90</span><span class="u">m</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VX}">v<sub>x</sub></span><span class="v" style="color:${VX}">5.0</span><span class="u">m/s</span>
  <span class="k" style="color:${VY}">v<sub>y</sub></span><span class="v" id="r_vy" style="color:${VY}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${GC}">g</span><span class="v" style="color:${GC}">9.8</span><span class="u">m/s²</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 560, h: 156, xmax: 1, ymax: 4.9, xt: [0, 0.5, 1], yt: [0, 4.9], xl: 't (s)', yl: 'h (m)' });
const gc = g.curve(C.violet), gdR = g.dot(C.ink, 12);
const gB = mk($('#grS'), 'circle', { r: 18, fill: 'none', stroke: VX, 'stroke-width': 4 });
const gTag = txt($('#grS'), 700, 0, 'same curve', { fill: C.ink, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'end' });
const th1 = PUC.think($('#th1'), { q: 'Push the blue ball three times faster. Does it land sooner, later, or at the same time?', opts: ['Sooner', 'Later', 'Same time'], right: 2, why: 'Farther, not faster down: fall time depends only on height.' });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Both coins hit the floor together!' });

/* ---------- A: angled throw u = 20 m/s at 30 degrees ---------- */
const A_ux = 20 * Math.cos(30 * D2R), A_uy = 20 * Math.sin(30 * D2R), A_T = 2 * A_uy / G;
const a = $('#aS'), AO = [80, 430], AS = 18, AV = 6;                 // 18 px per metre, 6 px per m/s
mk(a, 'line', { x1: 40, y1: AO[1], x2: 744, y2: AO[1], stroke: C.ink, 'stroke-width': 3 });
[0, 10, 20, 30].forEach(k => { mk(a, 'line', { x1: AO[0] + k * AS, y1: AO[1], x2: AO[0] + k * AS, y2: AO[1] + 8, stroke: C.ink, 'stroke-width': 2 }); txt(a, AO[0] + k * AS, AO[1] + 32, k, { 'text-anchor': 'middle' }); });
txt(a, 744, AO[1] + 32, 'x (m)', { 'text-anchor': 'end' });
const apos = tau => [AO[0] + A_ux * tau * AS, AO[1] - (A_uy * tau - 0.5 * G * tau * tau) * AS];
const aFull = mk(a, 'path', { d: '', stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '3 8', fill: 'none', opacity: 0.4 });
{ let dd = ''; for (let i = 0; i <= 60; i++) { const q = apos(A_T * i / 60); dd += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } attr(aFull, 'd', dd); }
const aPath = mk(a, 'path', { d: '', stroke: RC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const aGh = [0, 1, 2].map(() => mk(a, 'circle', { r: 14, fill: C.ink, opacity: 0 }));
const aBall = mk(a, 'circle', { r: 14, fill: C.ink });
const aU = PUC.arrow(a, RC, 6, 18), aUx = PUC.arrow(a, VX, 6, 18), aUy = PUC.arrow(a, VY, 6, 18), aVx = PUC.arrow(a, VX, 5, 16), aVy = PUC.arrow(a, VY, 5, 16), aG = PUC.arrow(a, GC, 6, 18);
const aLux = it(a, 0, 0, 'u cos θ', VX, { 'font-size': 24 }), aLuy = it(a, 0, 0, 'u sin θ', VY, { 'font-size': 24 }), aLu = it(a, 0, 0, 'u', RC, { 'font-size': 28 }), aLg = it(a, 0, 0, 'g', GC, { 'font-size': 28 });
const aArc = mk(a, 'path', { d: `M${AO[0] + 70},${AO[1]} A70,70 0 0 0 ${(AO[0] + 70 * Math.cos(30 * D2R)).toFixed(1)},${(AO[1] - 70 * Math.sin(30 * D2R)).toFixed(1)}`, stroke: TH, 'stroke-width': 2.5, fill: 'none' });
const aTh = it(a, AO[0] + 80, AO[1] - 12, 'θ', TH, { 'font-size': 26 });
const gPts = [0, A_T / 2, A_T].map(tt => { const q = apos(tt); return { q, ar: PUC.arrow(a, GC, 5, 16), lb: txt(a, q[0], q[1] - 26, ['START', 'TOP', 'END'][[0, A_T / 2, A_T].indexOf(tt)], { 'text-anchor': 'middle', fill: GC, 'font-size': 16, 'font-weight': 600 }) }; });
const tFly = wt('A5', 'fly'), tRep = tFly + A_T + 0.4;          // 1x throw, then a 0.25x slow-mo replay
const tauA = t => t < tRep ? M.clamp(t - tFly, 0, A_T) : M.clamp(0.25 * (t - tRep), 0, A_T);
const tFin = 1e9, tauA2 = tauA;
$('#aA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="a_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VX}">x</span><span class="v" id="a_x" style="color:${VX}">0.0</span><span class="u">m</span>
  <span class="k" style="color:${VY}">y</span><span class="v" id="a_y" style="color:${VY}">0.0</span><span class="u">m</span>`;
$('#aB').innerHTML = `<span class="k" style="color:${VX}">v<sub>x</sub></span><span class="v" id="a_vx" style="color:${VX}">17.3</span><span class="u">m/s</span>
  <span class="k" style="color:${VY}">v<sub>y</sub></span><span class="v" id="a_vy" style="color:${VY}">10.0</span><span class="u">m/s</span>
  <span class="k" style="color:${GC}">g</span><span class="v" style="color:${GC}">9.8</span><span class="u">m/s²</span>`;
const ag = PUC.graph($('#agS'), { x: 110, y: 64, w: 560, h: 156, xmax: 2.1, ymin: -12, ymax: 20, xt: [0, 1, 2], yt: [-10, 0, 10, 20], xl: 't (s)', yl: 'm/s' });
const acx = ag.curve(VX), acy = ag.curve(VY), adx = ag.dot(VX, 10), ady = ag.dot(VY, 10);
const aTx = txt($('#agS'), 682, ag.Y(17.3) + 6, 'vₓ', { fill: VX, 'font-weight': 600, 'font-size': 22 }), aTy = txt($('#agS'), 682, ag.Y(-10) + 6, 'vᵧ', { fill: VY, 'font-weight': 600, 'font-size': 22 });
const aTop = txt($('#agS'), ag.X(A_T / 2) + 10, ag.Y(0) - 12, 'vᵧ = 0 at the top', { fill: VY, 'font-size': 17, 'font-weight': 600 });

/* ---------- D: the rules ---------- */
const STEPS = [[`${tc(VX, 'u_x')} = ${ucos},\\quad ${tc(VY, 'u_y')} = ${usin}`, 'split the start velocity'],
  [`${tc(VX, 'x')} = (${ucos})\\,t`, 'across: no acceleration'],
  [`${tc(VY, 'y')} = (${usin})\\,t - \\tfrac{1}{2}${gg}\\,t^{2}`, 'up and down: acceleration g, downwards'],
  [`${vx} = ${ucos},\\quad ${vy} = ${usin} - ${gg}\\,t`, 'the two velocity parts at time t']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Split'), wt('D3', 'Across'), wt('D4', 'Up'), wt('D5', 'velocity')];
const d = $('#drS'), DO = [130, 430], DU = 22;     // 22 px per m/s
const dU = PUC.arrow(d, RC, 7, 22), dUx = PUC.arrow(d, VX, 6, 20), dUy = PUC.arrow(d, VY, 6, 20);
const DX = DO[0] + A_ux * DU, DY = DO[1] - A_uy * DU;
const ddx = mk(d, 'path', { d: `M${DX},${DY} V${DO[1]}`, stroke: VY, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' }), ddy = mk(d, 'path', { d: `M${DX},${DY} H${DO[0]}`, stroke: VX, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' });
const dArc = mk(d, 'path', { d: `M${DO[0] + 90},${DO[1]} A90,90 0 0 0 ${(DO[0] + 90 * Math.cos(30 * D2R)).toFixed(1)},${(DO[1] - 90 * Math.sin(30 * D2R)).toFixed(1)}`, stroke: TH, 'stroke-width': 3, fill: 'none' });
const dTh = it(d, DO[0] + 102, DO[1] - 14, 'θ = 30°', TH, { 'font-size': 26 });
const dLu = it(d, (DO[0] + DX) / 2 - 30, (DO[1] + DY) / 2 - 24, 'u = 20 m/s', RC, { 'text-anchor': 'end', 'font-size': 28 });
const dLx = it(d, (DO[0] + DX) / 2, DO[1] + 48, 'u cos θ ≈ 17.3', VX, { 'text-anchor': 'middle', 'font-size': 28 });
const dLy = it(d, DX + 18, (DO[1] + DY) / 2 + 10, 'u sin θ = 10', VY, { 'font-size': 28 });
const dGa = PUC.arrow(d, GC, 6, 18), dGl = it(d, 0, 0, 'g', GC, { 'font-size': 30 });
$('#stF').innerHTML = K(`${tc(VX, 'x')} = (${ucos})\\,t \\qquad ${tc(VY, 'y')} = (${usin})\\,t - \\tfrac{1}{2}${gg}\\,t^{2}`);

/* ---------- K: side by side ---------- */
const kx = $('#kxS'), ky = $('#kyS');
mk(kx, 'line', { x1: 60, y1: 260, x2: 724, y2: 260, stroke: C.ink, 'stroke-width': 3 });
const KXd = [0, 1, 2, 3, 4].map(k => { const x = 92 + k * 150; mk(kx, 'line', { x1: x, y1: 252, x2: x, y2: 268, stroke: C.ink, 'stroke-width': 2 }); return mk(kx, 'circle', { cx: x, cy: 220, r: 16, fill: C.ink }); });
const KXv = [0, 1, 2, 3].map(k => PUC.arrow(kx, VX, 5, 16));
const KXg = [0, 1, 2, 3].map(k => { const x = 92 + k * 150; return [mk(kx, 'path', { d: `M${x + 6},330 v10 H${x + 144} v-10`, stroke: VX, 'stroke-width': 3, fill: 'none' }), txt(kx, x + 75, 374, '8.7 m', { 'text-anchor': 'middle', fill: VX, 'font-size': 22, 'font-weight': 600 })]; });
txt(kx, 92, 420, 'EVERY TICK = 0.5 S', { 'font-size': 16 });
// up-and-down column: y = 10 t - 4.9 t^2 at 0.25 s ticks (0 to 2 s)
mk(ky, 'line', { x1: 120, y1: 450, x2: 680, y2: 450, stroke: C.ink, 'stroke-width': 3 });
const KYS = 64, kyY = y => 440 - y * KYS;
const KY = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => { const tt = k * 0.25, y = 10 * tt - 4.9 * tt * tt, x = 160 + k * 60; return { tt, y, c: mk(ky, 'circle', { cx: x, cy: kyY(y), r: 14, fill: C.ink }), a: PUC.arrow(ky, VY, 5, 14), x, vyv: 10 - 9.8 * tt }; });
const kyTop = txt(ky, 160 + 4 * 60 + 26, kyY(10 * 1 - 4.9) + 6, 'vᵧ = 0', { 'text-anchor': 'start', fill: VY, 'font-size': 20, 'font-weight': 600 });
txt(ky, 160, 480, 'TICK = 0.25 S, SPREAD SIDEWAYS TO SEE', { 'font-size': 15 });
const tKx = wt('K1', 'Same'), tKy = [wt('K2', 'slows'), wt('K2', 'stops'), wt('K2', 'falls')];
const th2 = PUC.think($('#th2'), { q: 'At the very top of the path, is the speed of the ball zero?', opts: ['Yes, zero', 'No'], right: 1, why: 'Only vᵧ is zero. vₓ stays, so the top speed is u cos θ.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `Thrown at ${K('20\\ \\text{m/s}')} at ${K('30^{\\circ}')}. Find its position and velocity at ${K('t = 1.5\\ \\text{s}')}. Take ${K(`${gg} = 9.8\\ \\text{m/s}^2`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(VX, 'x')} = 17.3 \\times 1.5 \\approx ${tc(VX, '26\\ \\text{m}')}`)],
  [K(`${tc(VY, 'y')} = 10(1.5) - \\tfrac{1}{2}(9.8)(1.5)^{2} \\approx ${tc(VY, '4.0\\ \\text{m}')}`)],
  [K(`${vx} = 17.3,\\quad ${vy} = 10 - 9.8(1.5) = ${tc(VY, '-4.7')}\\ \\text{m/s}`)],
  [K(`v = \\sqrt{17.3^{2} + 4.7^{2}} \\approx ${tc(RC, '18\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [70, 440], WS = 18;
mk(w, 'line', { x1: 40, y1: WO[1], x2: 744, y2: WO[1], stroke: C.ink, 'stroke-width': 3 });
[0, 10, 20, 30].forEach(k => { mk(w, 'line', { x1: WO[0] + k * WS, y1: WO[1], x2: WO[0] + k * WS, y2: WO[1] + 8, stroke: C.ink, 'stroke-width': 2 }); txt(w, WO[0] + k * WS, WO[1] + 32, k, { 'text-anchor': 'middle' }); });
txt(w, 744, WO[1] + 32, 'x (m)', { 'text-anchor': 'end' });
const wp = tau => [WO[0] + A_ux * tau * WS, WO[1] - (A_uy * tau - 0.5 * G * tau * tau) * WS];
const wPath = mk(w, 'path', { d: '', stroke: RC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const wFull = mk(w, 'path', { d: '', stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '3 8', fill: 'none', opacity: 0.35 });
{ let dd = ''; for (let i = 0; i <= 60; i++) { const q = wp(A_T * i / 60); dd += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } attr(wFull, 'd', dd); }
const WP = wp(1.5), WV = 9;
const wDot = mk(w, 'circle', { r: 13, fill: C.ink });
const wdx = mk(w, 'path', { d: `M${WP[0]},${WP[1]} V${WO[1]}`, stroke: VX, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' });
const wlx = it(w, 36, 120, 'x ≈ 26 m', VX, { 'font-size': 28 }), wly = it(w, 36, 160, 'y ≈ 4.0 m', VY, { 'font-size': 28 });
const wVx = PUC.arrow(w, VX, 5, 16), wVy = PUC.arrow(w, VY, 5, 16), wV = PUC.arrow(w, RC, 6, 18);
const wlv = it(w, 36, 200, 'v ≈ 18 m/s', RC, { 'font-size': 28 });
const wld = txt(w, WP[0] - 10, WP[1] - 30, 'COMING DOWN', { 'text-anchor': 'middle', fill: VY, 'font-size': 16, 'font-weight': 600 });
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'At the highest point, acceleration = 0', right: 'Acceleration = g, downwards, at every point' });
const tp = $('#tpS'), TA = q => [80 + 440 * q, 236 - 4 * 150 * q * (1 - q)];
{ let dd = ''; for (let i = 0; i <= 40; i++) { const p = TA(i / 40); dd += (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); } mk(tp, 'path', { d: dd, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '3 8', fill: 'none' }); }
const TP = [0.12, 0.5, 0.88].map(q => { const p = TA(q); return { p, c: mk(tp, 'circle', { cx: p[0], cy: p[1], r: 12, fill: C.ink }), ar: PUC.arrow(tp, GC, 5, 16) }; });
const tLg = it(tp, TA(0.5)[0] + 14, TA(0.5)[1] + 56, 'g', GC, { 'font-size': 28 }), tLt = txt(tp, TA(0.5)[0], TA(0.5)[1] - 24, 'vᵧ = 0, a = g', { 'text-anchor': 'middle', fill: C.ink, 'font-size': 18, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Projectile at time t: its position, speed, or the direction of its velocity' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A ball is thrown at ${K('30\\ \\text{m/s}')} at ${K('53^{\\circ}')} to the horizontal (${K('\\sin 53^{\\circ} = 0.8')}, ${K('g = 10\\ \\text{m/s}^2')}). After what time is its velocity perpendicular to its initial velocity?`,
  opts: ['2.4 s', '3.75 s', '4.8 s', '3.0 s'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${tc(VX, 'u_x')} = 18,\\quad ${tc(VY, 'u_y')} = 24`)], [K(`\\vec{u}\\cdot\\vec{v} = 0`)], [K(`18(18) + 24(24 - 10t) = 0`)], [K(`240\\,t = 900 \\Rightarrow ${tc(C.ok, 't = 3.75\\ \\text{s}')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('B2'), wt('B3', 'dot'), wt('B3', 'Eighteen'), T0('B4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · projectile motion', y0: 100, dy: 90, txt: [0, 0, 0, 1],
  lines: [K(`${tc(VX, 'u_x')} = ${ucos} \\qquad ${tc(VY, 'u_y')} = ${usin}`),
    K(`${tc(VX, 'x')} = (${ucos})\\,t \\qquad ${tc(VY, 'y')} = (${usin})\\,t - \\tfrac{1}{2}${gg}t^{2}`),
    K(`${vx} = ${ucos}\\quad\\text{(constant)} \\qquad ${vy} = ${usin} - ${gg}t`),
    `At the top: <span style="color:${VY}">v<sub>y</sub> = 0</span>, speed = u cos θ, <span style="color:${GC}">a = g</span> downwards`] });
const YQ = ['A coin is flicked off a table, another dropped. Which lands first, and why?', 'What is the speed of a projectile at its highest point?', 'What is the acceleration of a projectile at its highest point?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 42', topic: 'Why the same curve every time? Trajectory of a Projectile', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const FZ = 0.25 * (tFz - tS5), FBx = 160 + XB + 5 * FZ * SC, FBy = 270 + hY(4.9 - 4.9 * FZ * FZ);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S6', 'blue') - 0.2, 1.06, 960, 540], [tS8 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw($('#jp' + i), t, tMorph + 0.5 + i * 0.35, 0.9); });
    vis($('#hjP'), t, wt('H2', 'same') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    MT.forEach((mm, k) => { const el = $('#mt' + k); vis(el, t, tMt[k] - 0.1, 1e9, POP); el.style.background = mm[3] ? C.soft : C.redBg; vis(el.querySelector('.mk'), t, k < 3 ? tMt[k] + 0.25 : wt('P4', 'pushes'), 1e9, { ...POP, sc: 0.3 }); });
    vis($('#mtL'), t, tMt[3] - 0.1, 1e9, { dy: 10 });
    vis($('#pm'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(pmArc, t, wt('P2', 'thrown'), 0.9);
    pmB.forEach((b, k) => vis(b, t, wt('P2', 'thrown') + 0.2 + k * 0.25, 1e9, { ...POP, sc: 0.3 }));
    const ug = M.o3((t - wt('P2', 'gravity') + 0.1) / 0.5); PMs.forEach(([x, y], k) => { pmG[k].set(x, y + 18, x, y + 18 + 70 * ug); pmL[k].style.opacity = ug.toFixed(3); });
    const uf = M.o3((t - wt('P3', 'released') + 0.1) / 0.4); pmF.set(60, 138, 60 + 160 * uf, 138); M.draw(pmFx, t, wt('P3', 'only') - 0.1, 0.4); vis(pmFl, t, wt('P3', 'only'), 1e9, { dy: 6 });
    vis($('#pmP'), t, wt('P4', 'ignore') - 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tA1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('A1');
    vis($('#sim'), t, tS1 + 0.05, OUT('S8'), { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, OUT('S8'), { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, OUT('S8'), { dy: 36, ...o });
    const tau = tauS(t), h = 4.9 - 0.5 * G * tau * tau, bx = XB + 5 * tau * SC;
    attr(red, 'cx', XR); attr(red, 'cy', hY(h).toFixed(1)); attr(blue, 'cx', bx.toFixed(1)); attr(blue, 'cy', hY(h).toFixed(1));
    vis(red, t, wt('S2', 'dark') - 0.1, 1e9, { ...POP, sc: 0.3 }); vis(blue, t, wt('S2', 'blue') - 0.1, 1e9, { ...POP, sc: 0.3 });
    const mv = (t > tRun && t < tRun + 1) || (t > tS5 && t < tFz) || (t > tRes && tau < 1);
    [ghR, ghB].forEach((arr, c) => arr.forEach((gh, k) => { const dt = (t < tS5 ? 0.06 : 0.3) * (k + 1), q = tauS(t - dt), hh = 4.9 - 0.5 * G * q * q; attr(gh, 'cx', c ? (XB + 5 * q * SC).toFixed(1) : XR); attr(gh, 'cy', hY(hh).toFixed(1)); gh.style.opacity = mv && q < tau - 0.01 ? [0.3, 0.2, 0.12][k] : 0; }));
    const pm2 = t > tRun + 1 ? 1 : tau; let dd = ''; if (pm2 > 0.01) for (let i = 0; i <= 30; i++) { const q = pm2 * i / 30; dd += (i ? 'L' : 'M') + (XB + 5 * q * SC).toFixed(1) + ',' + hY(4.9 - 4.9 * q * q).toFixed(1); } attr(bPath, 'd', dd);
    // strobe flashes stamp as the first run passes each 0.25 s
    vis($('#fl'), t, tRun - 0.3, tS5 - 0.1, { ...POP, sc: 0.8 });
    strobe.forEach(st => { const on = t > tRun + st.k ? 1 : 0, lnOn = M.io((t - wt('S3', 'same') + 0.1) / 0.3); st.r.style.opacity = on * 0.3; st.b.style.opacity = on * 0.3; M.hide(st.ln, lnOn * on < 0.01); st.ln.style.opacity = (lnOn * on).toFixed(3); });
    // slow-mo replay
    vis($('#smo'), t, tS5 + 0.05, tS8 - 0.4, { ...POP, sc: 0.8 });
    const vOn = t > tS5 && t < tS8 - 0.3, uxv = M.o3((t - wt('S6', 'blue') + 0.1) / 0.5) * (vOn ? 1 : 0), uyv = M.o3((t - wt('S7', 'violet') + 0.1) / 0.5) * (vOn ? 1 : 0), vyv = G * tau, Y = hY(h);
    sVx.set(bx, Y, bx + 5 * VS * uxv, Y); sVyB.set(bx, Y, bx, Y + vyv * VS * uyv); sVyR.set(XR, Y, XR, Y + vyv * VS * uyv);
    attr(lVx, 'x', bx + 10); attr(lVx, 'y', Y - 18); lVx.style.opacity = uxv.toFixed(3); attr(lVy, 'x', bx + 12); attr(lVy, 'y', Y + vyv * VS * 0.6); lVy.style.opacity = uyv.toFixed(3);
    // readout + graph
    M.setT($('#r_t'), f2(tau)); M.setT($('#r_hr'), f2(h)); M.setT($('#r_hb'), f2(h)); M.setT($('#r_vy'), f1(G * tau));
    const gm = t > tRun + 1 ? 1 : tau; gc(q => [q, 4.9 - 4.9 * q * q], 0, gm); gdR(tau, h, t > tRun - 0.2);
    attr(gB, 'cx', g.X(tau).toFixed(1)); attr(gB, 'cy', g.Y(h).toFixed(1)); M.hide(gB, t < tRun - 0.2);
    attr(gTag, 'y', g.Y(4.4)); vis(gTag, t, wt('S4', 'same') - 0.1, 1e9, { dy: 6 });
    avA(t, wt('S4', 'together') + 0.2, OUT('S5'));
    vis($('#th1'), t, tS8 + 0.05, out, { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'Does') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: T0('S9') - 0.02, tWhy: wt('S9', 'faster') });
  }

  /* A: angled throw */
  const aOn = t >= tA1 - 0.1 && t < tD1 + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = OUT('D1');
    vis($('#asim'), t, tA1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#aro'), t, tA1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#exA'), t, tA1 + 0.6, 1e9, { dy: 8 });
    vis($('#agr'), t, tA1 + 0.4, out, { dy: 36, ...o });
    const tau = tauA2(t), [X, Y] = apos(tau), vxv = A_ux, vyv = A_uy - G * tau;
    attr(aBall, 'cx', X.toFixed(1)); attr(aBall, 'cy', Y.toFixed(1)); vis(aBall, t, tA1 + 0.5, 1e9, { ...POP, sc: 0.3 });
    const pre = 1 - M.io((t - tFly) / 0.3);
    const uu = M.o3((t - wt('A2', 'thirty') + 0.1) / 0.5) * pre; aU.set(AO[0], AO[1], AO[0] + 20 * Math.cos(30 * D2R) * 9 * uu, AO[1] - 20 * Math.sin(30 * D2R) * 9 * uu);
    attr(aLu, 'x', AO[0] + 80); attr(aLu, 'y', AO[1] - 72); aLu.style.opacity = uu.toFixed(3);
    M.draw(aArc, t, wt('A2', 'degrees') - 0.2, 0.4); aArc.style.opacity = pre; aTh.style.opacity = (pre * M.io((t - wt('A2', 'degrees')) / 0.3)).toFixed(3);
    const ux1 = M.o3((t - wt('A3', 'Across') + 0.1) / 0.5) * pre, uy1 = M.o3((t - wt('A3', 'Up') + 0.1) / 0.5) * pre;
    aUx.set(AO[0], AO[1], AO[0] + A_ux * 9 * ux1, AO[1]); aUy.set(AO[0], AO[1], AO[0], AO[1] - A_uy * 9 * uy1);
    attr(aLux, 'x', AO[0] + 40); attr(aLux, 'y', AO[1] + 66); aLux.style.opacity = ux1.toFixed(3); attr(aLuy, 'x', AO[0] - 60); attr(aLuy, 'y', AO[1] - A_uy * 9 - 12); aLuy.style.opacity = uy1.toFixed(3);
    const pM = t > tFly + A_T && t < tRep ? A_T : tau; let dd = ''; if (pM > 0.01) for (let i = 0; i <= 40; i++) { const q = apos(pM * i / 40); dd += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } attr(aPath, 'd', dd);
    aFull.style.opacity = t > tFly + A_T ? 0.4 : 0;
    const mv = (t > tFly && t < tFly + A_T) || (t > tRep && tau < A_T);
    aGh.forEach((gh, k) => { const dt = (t < tRep ? 0.12 : 0.5) * (k + 1), q = tauA2(t - dt), p = apos(q); attr(gh, 'cx', p[0].toFixed(1)); attr(gh, 'cy', p[1].toFixed(1)); gh.style.opacity = mv && q < tau - 0.01 ? [0.3, 0.2, 0.12][k] : 0; });
    // live velocity parts while flying, plus g
    const fly = t > tFly ? 1 : 0;
    aVx.set(X, Y, X + vxv * AV * fly, Y); aVy.set(X, Y, X, Y - vyv * AV * fly);
    const gOn = M.io((t - wt('A6', 'gravity') + 0.1) / 0.4); aG.set(X, Y + 16, X, Y + 16 + 60 * gOn); attr(aLg, 'x', X + 12); attr(aLg, 'y', Y + 70); aLg.style.opacity = gOn.toFixed(3);
    vis($('#smo2'), t, tRep + 0.05, tRep + 4 * A_T + 0.3, { ...POP, sc: 0.8 });
    gPts.forEach((gp, k) => { const tt = wt('A6', ['start', 'top', 'end'][k]); const u = M.o3((t - tt + 0.1) / 0.4); gp.ar.set(gp.q[0], gp.q[1] + 16, gp.q[0], gp.q[1] + 16 + 56 * u); gp.lb.style.opacity = u.toFixed(3); });
    M.setT($('#a_t'), f2(tau)); M.setT($('#a_x'), f1(A_ux * tau)); M.setT($('#a_y'), f1(Math.max(0, A_uy * tau - 0.5 * G * tau * tau))); M.setT($('#a_vy'), f1(vyv).replace('-0.0', '0.0'));
    const gm = t > tFly + A_T && t < tRep ? A_T : tau;
    acx(q => [q, A_ux], 0, gm); acy(q => [q, A_uy - G * q], 0, gm); adx(tau, A_ux, t > tFly - 0.2); ady(tau, vyv, t > tFly - 0.2);
    vis(aTx, t, tFly + 0.3, 1e9, { dy: 6 }); vis(aTy, t, tFly + 0.5, 1e9, { dy: 6 }); vis(aTop, t, wt('A5', 'zero') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 200], [tStep[2] - 0.1, 316], [tStep[3] - 0.1, 432]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const u0 = M.o3((t - tD1 - 0.6) / 0.6); dU.set(DO[0], DO[1], DO[0] + (DX - DO[0]) * u0, DO[1] + (DY - DO[1]) * u0); vis(dLu, t, tD1 + 1.0, 1e9, { dy: 8 });
    M.draw(dArc, t, tD1 + 1.1, 0.4); vis(dTh, t, tD1 + 1.3, 1e9, POP);
    const ux1 = M.o3((t - wt('D2', 'x') + 0.1) / 0.5), uy1 = M.o3((t - wt('D2', 'y') + 0.1) / 0.5);
    dUx.set(DO[0], DO[1], DO[0] + (DX - DO[0]) * ux1, DO[1]); dUy.set(DO[0], DO[1], DO[0], DO[1] + (DY - DO[1]) * uy1);
    M.draw(ddx, t, wt('D2', 'x'), 0.4); M.draw(ddy, t, wt('D2', 'y'), 0.4);
    vis(dLx, t, wt('D2', 'x') + 0.3, 1e9, { dy: 8 }); vis(dLy, t, wt('D2', 'y') + 0.3, 1e9, { dy: 8 });
    const ug = M.o3((t - wt('D4', 'downwards') + 0.1) / 0.5); dGa.set(730, 150, 730, 150 + 120 * ug); attr(dGl, 'x', 712); attr(dGl, 'y', 316); attr(dGl, 'text-anchor', 'start'); dGl.style.opacity = ug.toFixed(3);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Steady'), 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kx'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o });
    KXd.forEach((c, k) => vis(c, t, wt('K1', 'cruise') - 0.2 + k * 0.3, 1e9, { ...POP, sc: 0.3 }));
    KXv.forEach((ar, k) => { const u = M.o3((t - wt('K1', 'cruise') + k * 0.3) / 0.4), x = 92 + k * 150; ar.set(x, 190, x + 87 * u, 190); });
    KXg.forEach(([p, l], k) => { M.draw(p, t, tKx - 0.1 + k * 0.2, 0.3); vis(l, t, tKx + k * 0.2, 1e9, { dy: 6 }); });
    vis($('#kxP'), t, tKx + 0.6, 1e9, POP);
    vis($('#ky'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    KY.forEach((p, k) => { const tt = T0('K2') + 0.4 + k * 0.38; vis(p.c, t, tt, 1e9, { ...POP, sc: 0.3 }); const u = M.o3((t - tt - 0.1) / 0.3); p.a.set(p.x, kyY(p.y), p.x, kyY(p.y) - p.vyv * 5.6 * u); });
    vis(kyTop, t, tKy[1] - 0.1, 1e9, POP); vis($('#kyP'), t, tKy[2] + 0.3, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'speed') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Only') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tau = 1.5 * M.clamp((t - wt('W2', 'Find')) / 1.5), P = wp(tau);
    let dd = ''; if (tau > 0.01) for (let i = 0; i <= 40; i++) { const q = wp(tau * i / 40); dd += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } attr(wPath, 'd', dd);
    attr(wDot, 'cx', P[0].toFixed(1)); attr(wDot, 'cy', P[1].toFixed(1)); vis(wDot, t, T0('W2') + 0.5, 1e9, { ...POP, sc: 0.3 });
    M.draw(wdx, t, T0('W3') + 0.3, 0.4); vis(wlx, t, wt('W3', 'About'), 1e9, { dy: 8 }); vis(wly, t, wt('W4', 'About'), 1e9, { dy: 8 });
    const u1 = M.o3((t - wt('W5', 'stays') + 0.1) / 0.5), u2 = M.o3((t - wt('W5', 'minus', 1) + 0.1) / 0.5), u3 = M.o3((t - T0('W6') + 0.1) / 0.5);
    wVx.set(WP[0], WP[1], WP[0] + 17.3 * WV * u1, WP[1]); wVy.set(WP[0], WP[1], WP[0], WP[1] + 4.7 * WV * u2); wV.set(WP[0], WP[1], WP[0] + 17.3 * WV * u3, WP[1] + 4.7 * WV * u3);
    vis(wld, t, wt('W5', 'coming') - 0.1, 1e9, POP); vis(wlv, t, wt('W6', 'About'), 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'highest') - 0.2, tStrike: wt('X3', 'never') - 0.1, tRight: wt('X3', 'acceleration') });
    TP.forEach((p, k) => { const u = M.o3((t - wt('X3', 'every') - k * 0.25) / 0.4); p.ar.set(p.p[0], p.p[1] + 14, p.p[0], p.p[1] + 14 + 56 * u); });
    tLg.style.opacity = M.io((t - wt('X3', 'every')) / 0.3).toFixed(3); vis(tLt, t, wt('X3', 'top') - 0.1, 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'When'), tCount, tAns });
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
