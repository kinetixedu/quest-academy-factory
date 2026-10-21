// PUC Physics Ep 40: Motion in two dimensions (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VX = C.ac, VY = C.violet, AC = C.red, RC = C.ink;          // colour-coding: x / v_x blue, y / v_y violet, a red, r and resultant v ink
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
const vx = tc(VX, 'v_x'), vy = tc(VY, 'v_y'), ih = tc(VX, '\\hat{i}'), jh = tc(VY, '\\hat{j}');
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2);

Object.assign(M.IC, {
  kite: ['M12 2 19 9 12 16 5 9Z', 'M5 9h14', 'M12 2v14', 'M12 16c-1 2 1 3 0 6'],
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M5.5 17.5 9 10h6l3.5 7.5', 'M12 17.5 9 10', 'M8 7h3', 'M15 10l-1-3h2'],
  road: ['M4 20 9 4', 'M20 20 15 4', 'M12 6v2', 'M12 11v2', 'M12 16v2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tR1 = T0('R1');
const tK1 = T0('K1'), tK3 = T0('K3'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook rows: three paths that bend ---------- */
const JOBS = [['kite', 'Kite', 'DRIFTS ACROSS THE SKY', 'kite', 'M10,60 C60,10 100,70 150,30 S220,40 250,14'], ['ball', 'Ball', 'CURVES TO A FRIEND', 'ball', 'M10,80 Q130,-30 250,80'], ['bike', 'Bicycle', 'SWINGS AROUND A BEND', 'bicycle', 'M10,84 L110,84 Q200,84 210,10']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , d], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg width="270" height="92"><path d="M10,46 H260" stroke="${C.dim}" stroke-width="2.5" stroke-dasharray="4 8" fill="none"/><path id="jp${i}" d="${d}" stroke="${C.ac}" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div>`).join('');
const TILES = [[VX, '4 m east', 'arrowR'], [VY, '3 m north', 'arrowU'], [C.red, '7 m/s ?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}" style="color:${c}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('') + `<div class="lbl" id="wqL" style="left:36px;top:452px">EVERY SECOND</div>`;
const tTile = [wt('H3', 'four'), wt('H3', 'three'), wt('H4', 'seven')];

/* ---------- P: position in a plane ---------- */
const pq = $('#pqS'), PO = [110, 470], PS = 46;               // 46 px per metre
for (let k = 1; k <= 13; k++) mk(pq, 'line', { x1: PO[0] + k * PS, y1: PO[1], x2: PO[0] + k * PS, y2: PO[1] - 8 * PS, stroke: C.line, 'stroke-width': 1.2 });
for (let k = 1; k <= 8; k++) mk(pq, 'line', { x1: PO[0], y1: PO[1] - k * PS, x2: PO[0] + 13 * PS, y2: PO[1] - k * PS, stroke: C.line, 'stroke-width': 1.2 });
const pAx = PUC.arrow(pq, C.ink, 3, 14), pAy = PUC.arrow(pq, C.ink, 3, 14);
pAx.set(PO[0], PO[1], PO[0] + 13.6 * PS, PO[1]); pAy.set(PO[0], PO[1], PO[0], PO[1] - 8.6 * PS);
txt(pq, PO[0] + 13.6 * PS, PO[1] + 34, 'x (m) EAST', { 'text-anchor': 'end' }); txt(pq, PO[0] + 14, PO[1] - 8.6 * PS + 4, 'y (m) NORTH');
[0, 4, 8, 12].forEach(k => txt(pq, PO[0] + k * PS, PO[1] + 34, k, { 'text-anchor': 'middle' })); [2, 4, 6].forEach(k => txt(pq, PO[0] - 14, PO[1] - k * PS + 6, k, { 'text-anchor': 'end' }));
txt(pq, PO[0] - 14, PO[1] + 6, 'O', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 });
const PP = [PO[0] + 8 * PS, PO[1] - 6 * PS];
const pdx = mk(pq, 'path', { d: `M${PP[0]},${PP[1]} V${PO[1]}`, stroke: VX, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' });
const pdy = mk(pq, 'path', { d: `M${PP[0]},${PP[1]} H${PO[0]}`, stroke: VY, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' });
const pbx = mk(pq, 'path', { d: `M${PO[0]},${PO[1]} H${PP[0]}`, stroke: VX, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
const pby = mk(pq, 'path', { d: `M${PO[0]},${PO[1]} V${PP[1]}`, stroke: VY, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' });
const plx = it(pq, (PO[0] + PP[0]) / 2, PO[1] - 16, 'x = 8 m', VX, { 'text-anchor': 'middle', 'font-size': 26 });
const ply = it(pq, PO[0] + 16, (PO[1] + PP[1]) / 2, 'y = 6 m', VY, { 'font-size': 26 });
const pR = PUC.arrow(pq, RC, 6, 22), plr = it(pq, PO[0] + 4 * PS - 40, PO[1] - 3 * PS - 22, 'r', RC, { 'font-size': 36 });
const pDot = mk(pq, 'circle', { cx: PP[0], cy: PP[1], r: 14, fill: C.ink });
const pDl = txt(pq, PP[0] + 22, PP[1] - 18, 'AARAV', { fill: C.ink, 'font-weight': 600 });
// right: one number vs two
const pm = $('#pmS');
mk(pm, 'line', { x1: 36, y1: 70, x2: 748, y2: 70, stroke: C.ink, 'stroke-width': 3 });
for (let k = 0; k <= 12; k++) mk(pm, 'line', { x1: 60 + k * 54, y1: 62, x2: 60 + k * 54, y2: 78, stroke: C.ink, 'stroke-width': 2 });
const pmd = mk(pm, 'circle', { cx: 60 + 8 * 54, cy: 70, r: 12, fill: C.ink }), pmb = mk(pm, 'path', { d: `M60,70 H${60 + 8 * 54}`, stroke: VX, 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
const pmt = it(pm, 60 + 4 * 54, 50, 'x = 8 m', VX, { 'text-anchor': 'middle', 'font-size': 26 });
$('#pF').innerHTML = K(`${tc(RC, '\\vec{r}')} = ${tc(VX, 'x')}\\,${ih} + ${tc(VY, 'y')}\\,${jh}`);
$('#pi').innerHTML = `${K(ih)}&nbsp; points along <i style="color:${VX}">x</i>`; $('#pj').innerHTML = `${K(jh)}&nbsp; points along <i style="color:${VY}">y</i>`;

/* ---------- S: constant velocity sim (4 m/s east + 3 m/s north) ---------- */
const s = $('#simS'), O = [110, 440], SC = 26, VS = 30;       // 26 px per metre, 30 px per m/s
for (let k = 2; k <= 18; k += 2) mk(s, 'line', { x1: O[0] + k * SC, y1: O[1], x2: O[0] + k * SC, y2: O[1] - 13 * SC, stroke: C.line, 'stroke-width': 1.2 });
for (let k = 2; k <= 12; k += 2) mk(s, 'line', { x1: O[0], y1: O[1] - k * SC, x2: O[0] + 18 * SC, y2: O[1] - k * SC, stroke: C.line, 'stroke-width': 1.2 });
const sAx = PUC.arrow(s, C.ink, 3, 14), sAy = PUC.arrow(s, C.ink, 3, 14); sAx.set(O[0], O[1], O[0] + 19 * SC, O[1]); sAy.set(O[0], O[1], O[0], O[1] - 13.6 * SC);
[0, 4, 8, 12, 16].forEach(k => txt(s, O[0] + k * SC, O[1] + 30, k, { 'text-anchor': 'middle' })); [4, 8, 12].forEach(k => txt(s, O[0] - 14, O[1] - k * SC + 6, k, { 'text-anchor': 'end' }));
txt(s, O[0] + 19 * SC, O[1] + 30, 'x (m)', { 'text-anchor': 'end' }); txt(s, O[0] + 14, O[1] - 13.6 * SC + 6, 'y (m)');
const sPath = mk(s, 'path', { d: '', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '3 9', 'stroke-linecap': 'round', fill: 'none', opacity: 0.5 });
const shx = mk(s, 'line', { stroke: VX, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), shy = mk(s, 'line', { stroke: VY, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const shX = mk(s, 'circle', { r: 10, fill: VX }), shY = mk(s, 'circle', { r: 10, fill: VY });
const ghosts = [0, 1, 2].map(() => mk(s, 'circle', { r: 16, fill: C.ink, opacity: 0 }));
const sDot = mk(s, 'circle', { r: 16, fill: C.ink });
const avx = PUC.arrow(s, VX, 6, 18), avy = PUC.arrow(s, VY, 6, 18), av = PUC.arrow(s, RC, 6, 20);
const lvx = it(s, 0, 0, 'vₓ', VX), lvy = it(s, 0, 0, 'vᵧ', VY), lv = it(s, 0, 0, 'v = 5 m/s', RC, { 'font-size': 28 });
const rAng = mk(s, 'path', { d: '', stroke: C.ink, 'stroke-width': 2, fill: 'none' });
const sim = t => ({ x: 4 * t, y: 3 * t });
const tRun = wt('S2', 'shadows') - 0.1, tFrz = wt('S5', 'Freeze') + 0.1, tRes = wt('S7', 'not') + 0.4;
const tauS = t => {      // real run 1x for 4 s; slow-mo replay from tau 1 at 0.25x until the freeze; resume 1x
  if (t < tS5) return M.clamp(t - tRun, 0, 4);
  if (t < tRes) return Math.min(1 + 0.25 * (t - tS5), 1 + 0.25 * (tFrz - tS5));
  return Math.min(4, 1 + 0.25 * (tFrz - tS5) + (t - tRes));
};
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VX}">x</span><span class="v" id="r_x" style="color:${VX}">0.0</span><span class="u">m</span>
  <span class="k" style="color:${VY}">y</span><span class="v" id="r_y" style="color:${VY}">0.0</span><span class="u">m</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VX}">v<sub>x</sub></span><span class="v" style="color:${VX}">4.0</span><span class="u">m/s</span>
  <span class="k" style="color:${VY}">v<sub>y</sub></span><span class="v" style="color:${VY}">3.0</span><span class="u">m/s</span>
  <span class="k" style="color:${RC}">|v|</span><span class="v" id="r_v">?</span><span class="u">m/s</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 560, h: 156, xmax: 4, ymax: 16, xt: [0, 1, 2, 3, 4], yt: [0, 8, 16], xl: 't (s)' });
const gcx = g.curve(VX), gcy = g.curve(VY), gdx = g.dot(VX, 10), gdy = g.dot(VY, 10);
const gTx = txt($('#grS'), 690, 0, 'x = 4t', { fill: VX, 'font-weight': 600, 'font-size': 20 }), gTy = txt($('#grS'), 690, 0, 'y = 3t', { fill: VY, 'font-weight': 600, 'font-size': 20 });
const th1 = PUC.think($('#th1'), { q: '6 m/s east and 8 m/s north. What is the real speed?', opts: ['14 m/s', '10 m/s'], right: 1, why: '√(6² + 8²) = √100 = 10 m/s. Never just add them.' });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So I was doing 5, not 7!' });

/* ---------- D: the rules ---------- */
const STEPS = [[`\\Delta ${tc(RC, '\\vec{r}')} = ${tc(VX, '\\Delta x')}\\,${ih} + ${tc(VY, '\\Delta y')}\\,${jh}`, 'the change in position in a short time Δt'],
  [`${tc(RC, '\\vec{v}')} = ${vx}\\,${ih} + ${vy}\\,${jh}`, 'vₓ = Δx / Δt,   vᵧ = Δy / Δt'],
  [`${tc(RC, 'v')} = \\sqrt{${vx}^{2} + ${vy}^{2}}`, 'speed = the length of the arrow'],
  [`\\tan\\textcolor{${TH}}{\\theta} = ${vy} \\,/\\, ${vx}`, 'direction = the angle with the x axis']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'delta'), wt('D3', 'Divide'), wt('D4', 'speed'), wt('D5', 'direction')];
const d = $('#drS'), DA = [150, 430], DB = [150 + 4 * 100, 430 - 3 * 100];
const dlx = mk(d, 'path', { d: `M${DA[0]},${DA[1]} H${DB[0]}`, stroke: VX, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const dly = mk(d, 'path', { d: `M${DB[0]},${DA[1]} V${DB[1]}`, stroke: VY, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const dR = PUC.arrow(d, RC, 6, 22);
mk(d, 'circle', { cx: DA[0], cy: DA[1], r: 10, fill: C.ink }); const dBd = mk(d, 'circle', { cx: DB[0], cy: DB[1], r: 10, fill: C.ink });
const dTx = it(d, (DA[0] + DB[0]) / 2, DA[1] + 42, 'Δx', VX, { 'text-anchor': 'middle' }), dTy = it(d, DB[0] + 18, (DA[1] + DB[1]) / 2 + 10, 'Δy', VY);
const dTr = it(d, (DA[0] + DB[0]) / 2 - 50, (DA[1] + DB[1]) / 2 - 18, 'Δr', RC, { 'text-anchor': 'end' });
const dArc = mk(d, 'path', { d: `M${DA[0] + 90},${DA[1]} A90,90 0 0 0 ${(DA[0] + 90 * 0.8).toFixed(1)},${(DA[1] - 90 * 0.6).toFixed(1)}`, stroke: TH, 'stroke-width': 3, fill: 'none' });
const dTh = it(d, DA[0] + 104, DA[1] - 16, 'θ', TH);
mk(d, 'path', { d: `M${DB[0] - 22},${DA[1]} V${DA[1] - 22} H${DB[0]}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
const dN1 = txt(d, 36, 506, '', { 'font-size': 24, fill: C.ink, 'font-weight': 600 }), dN2 = txt(d, 36, 546, '', { 'font-size': 24, fill: C.ink, 'font-weight': 600 });
dN1.innerHTML = `<tspan fill="${VX}">vₓ = 4</tspan>, <tspan fill="${VY}">vᵧ = 3</tspan>  →  v = √(16 + 9) = 5 m/s`;
dN2.innerHTML = `tan <tspan fill="${TH}">θ</tspan> = <tspan fill="${VY}">3</tspan>/<tspan fill="${VX}">4</tspan>  →  <tspan fill="${TH}">θ ≈ 37°</tspan> above east`;
$('#stF').innerHTML = K(`${tc(RC, '\\vec{v}')} = ${vx}\\,${ih} + ${vy}\\,${jh}`);

/* ---------- C: marble on a tilted board (u_x = 3 m/s, a_y = 2 m/s^2 down the slope) ---------- */
const m = $('#mS'), BO = [130, 104], BS = 40;               // 40 px per metre, y measured down the slope
mk(m, 'rect', { x: BO[0] - 30, y: BO[1] - 30, width: 470, height: 430, rx: 10, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
for (let k = 1; k <= 10; k++) mk(m, 'line', { x1: BO[0] + k * BS, y1: BO[1] - 30, x2: BO[0] + k * BS, y2: BO[1] + 400, stroke: '#EFE3C4', 'stroke-width': 1.2 });
for (let k = 1; k <= 9; k++) mk(m, 'line', { x1: BO[0] - 30, y1: BO[1] + k * BS, x2: BO[0] + 440, y2: BO[1] + k * BS, stroke: '#EFE3C4', 'stroke-width': 1.2 });
const mAx = PUC.arrow(m, C.ink, 3, 14), mAy = PUC.arrow(m, C.ink, 3, 14); mAx.set(BO[0], BO[1], BO[0] + 410, BO[1]); mAy.set(BO[0], BO[1], BO[0], BO[1] + 380);
txt(m, BO[0] + 410, BO[1] - 10, 'x', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600 }); txt(m, BO[0] + 10, BO[1] + 380, 'y', { fill: C.ink, 'font-weight': 600 });
const slp = mk(m, 'g', {}); { const a = PUC.arrow(slp, C.mute, 4, 16); a.set(660, 130, 660, 420); }
txt(slp, 660, 112, 'DOWN', { 'text-anchor': 'middle', 'font-size': 16 }); txt(slp, 660, 448, 'THE SLOPE', { 'text-anchor': 'middle', 'font-size': 16 });
const mPath = mk(m, 'path', { d: '', stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '2 10', 'stroke-linecap': 'round', fill: 'none' });
const mg = [0, 1, 2].map(() => mk(m, 'circle', { r: 15, fill: '#4C5A7A', opacity: 0 }));
const mDot = mk(m, 'circle', { r: 15, fill: C.ink });
const mUx = PUC.arrow(m, VX, 6, 18), mA = PUC.arrow(m, AC, 6, 18), mVx = PUC.arrow(m, VX, 5, 16), mVy = PUC.arrow(m, VY, 5, 16), mV = PUC.arrow(m, RC, 6, 18);
const mLu = it(m, 0, 0, 'uₓ', VX, { 'font-size': 28 }), mLa = it(m, 0, 0, 'a', AC, { 'font-size': 30 }), mLv = it(m, 0, 0, 'v', RC, { 'font-size': 30 });
const mp = tau => [BO[0] + BS * 3 * tau, BO[1] + BS * tau * tau];
const tRunC = wt('C3', 'Watch') - 0.1, tRep = T0('C7') - 0.1;
const tauC = t => t < tRep ? M.clamp(t - tRunC, 0, 3) : M.clamp(0.25 * (t - tRep - 0.3), 0, 3);
$('#mA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="m_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VX}">x</span><span class="v" id="m_x" style="color:${VX}">0.0</span><span class="u">m</span>
  <span class="k" style="color:${VY}">y</span><span class="v" id="m_y" style="color:${VY}">0.0</span><span class="u">m</span>`;
$('#mB').innerHTML = `<span class="k" style="color:${VX}">v<sub>x</sub></span><span class="v" id="m_vx" style="color:${VX}">3.0</span><span class="u">m/s</span>
  <span class="k" style="color:${VY}">v<sub>y</sub></span><span class="v" id="m_vy" style="color:${VY}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a<sub>y</sub></span><span class="v" style="color:${AC}">2.0</span><span class="u">m/s²</span>`;
const mgG = PUC.graph($('#mgS'), { x: 110, y: 64, w: 560, h: 156, xmax: 3, ymax: 6, xt: [0, 1, 2, 3], yt: [0, 3, 6], xl: 't (s)', yl: 'm/s' });
const mcx = mgG.curve(VX), mcy = mgG.curve(VY), mdx = mgG.dot(VX, 10), mdy = mgG.dot(VY, 10);
const mTx = txt($('#mgS'), 682, mgG.Y(3) + 6, 'vₓ flat', { fill: VX, 'font-weight': 600, 'font-size': 20 }), mTy = txt($('#mgS'), 682, mgG.Y(6) + 10, 'vᵧ climbs', { fill: VY, 'font-weight': 600, 'font-size': 20 });

/* ---------- R: the equations, twice ---------- */
const EQ = [[`${vx} = ${tc(VX, 'u_x')} + ${tc(VX, 'a_x')}\\,t`, `${tc(VX, 'x')} = ${tc(VX, 'u_x')}\\,t + \\tfrac{1}{2}${tc(VX, 'a_x')}\\,t^{2}`],
  [`${vy} = ${tc(VY, 'u_y')} + ${tc(VY, 'a_y')}\\,t`, `${tc(VY, 'y')} = ${tc(VY, 'u_y')}\\,t + \\tfrac{1}{2}${tc(VY, 'a_y')}\\,t^{2}`]];
$('#eqs').innerHTML = `<div class="eqh" id="eh0" style="left:48px;background:${VX}">ALONG x</div><div class="eqh" id="eh1" style="left:824px;background:${VY}">ALONG y</div>` +
  EQ.map((r, c) => r.map((e, k) => `<div class="eq" id="eq${c}${k}" style="left:${48 + c * 776}px;top:${120 + k * 84}px">${K(e)}</div>`).join('')).join('') +
  `<div class="vrow" id="vrw" style="top:304px;height:150px"><div class="lbl" style="left:28px;top:22px">VECTOR FORM · BOTH AT ONCE</div>
   <div class="eq" id="vf0" style="left:28px;top:62px">${K(`${tc(RC, '\\vec{v}')} = \\vec{u} + ${tc(AC, '\\vec{a}')}\\,t`)}</div><div class="eq" id="vf1" style="left:600px;top:62px">${K(`${tc(RC, '\\vec{r}')} = \\vec{u}\\,t + \\tfrac{1}{2}${tc(AC, '\\vec{a}')}\\,t^{2}`)}</div></div>`;
const tEq = [[wt('R2', 'equals'), wt('R2', 'And')], [wt('R3', 'equals'), wt('R3', 'And')]], tVf = [wt('R4', 'equals'), wt('R4', 'And')];
const avR = PUC.avatar($('#sR'), { x: 160 + 48, y: 270 + 478, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The same equations as before, just used twice.' });

/* ---------- K: side by side strobes + think ---------- */
const kx = $('#kxS'), ky = $('#kyS');
mk(kx, 'line', { x1: 60, y1: 260, x2: 724, y2: 260, stroke: C.ink, 'stroke-width': 3 });
const KXd = [0, 1, 2, 3].map(k => { const x = 100 + k * 180; mk(kx, 'line', { x1: x, y1: 252, x2: x, y2: 268, stroke: C.ink, 'stroke-width': 2 }); return [mk(kx, 'circle', { cx: x, cy: 220, r: 18, fill: C.ink }), txt(kx, x, 300, `t = ${k} s`, { 'text-anchor': 'middle' })]; });
const KXg = [0, 1, 2].map(k => { const x = 100 + k * 180; const p = mk(kx, 'path', { d: `M${x + 6},360 v10 H${x + 174} v-10`, stroke: VX, 'stroke-width': 3, fill: 'none' }); return [p, txt(kx, x + 90, 404, '3 m', { 'text-anchor': 'middle', fill: VX, 'font-size': 24, 'font-weight': 600 })]; });
mk(ky, 'line', { x1: 220, y1: 70, x2: 220, y2: 470, stroke: C.ink, 'stroke-width': 3 });
const KYv = [0, 1, 4, 9];
const KYd = KYv.map((v, k) => { const y = 84 + v * 40; mk(ky, 'line', { x1: 212, y1: y, x2: 228, y2: y, stroke: C.ink, 'stroke-width': 2 }); return [mk(ky, 'circle', { cx: 270, cy: y, r: 18, fill: C.ink }), txt(ky, 196, y + 6, `t = ${k} s`, { 'text-anchor': 'end' })]; });
const KYg = [0, 1, 2].map(k => { const y0 = 84 + KYv[k] * 40, y1 = 84 + KYv[k + 1] * 40; const p = mk(ky, 'path', { d: `M330,${y0 + 4} h10 V${y1 - 4} h-10`, stroke: VY, 'stroke-width': 3, fill: 'none' }); return [p, txt(ky, 360, (y0 + y1) / 2 + 8, `${[1, 3, 5][k]} m`, { fill: VY, 'font-size': 24, 'font-weight': 600 })]; });
const tKx = wt('K1', 'equal'), tKy = [wt('K2', 'grow'), wt('K2', 'one'), wt('K2', 'three'), wt('K2', 'five')];
const th2 = PUC.think($('#th2'), { q: 'Flick the marble sideways twice as fast. Does it take longer to reach the bottom?', opts: ['Yes, longer', 'No, same time'], right: 1, why: 'The flick changes only x. Time down the slope depends on y.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `Starts at the origin with ${K(`\\vec{u} = ${tc(VX, '4')}\\,${ih}\\ \\text{m/s}`)} and ${K(`${tc(AC, '\\vec{a}')} = ${tc(VY, '2')}\\,${jh}\\ \\text{m/s}^2`)}. Find its position and speed at ${K('t = 3\\ \\text{s}')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(VX, 'x')} = ${tc(VX, 'u_x')}\\,t = 4 \\times 3 = ${tc(VX, '12\\ \\text{m}')}`)],
  [K(`${tc(VY, 'y')} = \\tfrac{1}{2}${tc(VY, 'a_y')}\\,t^{2} = \\tfrac{1}{2}\\times 2 \\times 3^{2} = ${tc(VY, '9\\ \\text{m}')}`)],
  [K(`${vx} = 4,\\quad ${vy} = 2 \\times 3 = 6\\ \\text{m/s}`)],
  [K(`${tc(RC, 'v')} = \\sqrt{4^{2} + 6^{2}} = \\sqrt{52} \\approx ${tc(RC, '7.2\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [110, 480], WS = 33.33, WV = 18;
for (let k = 2; k <= 16; k += 2) mk(w, 'line', { x1: WO[0] + k * WS, y1: WO[1], x2: WO[0] + k * WS, y2: WO[1] - 11 * WS, stroke: C.line, 'stroke-width': 1.2 });
for (let k = 2; k <= 10; k += 2) mk(w, 'line', { x1: WO[0], y1: WO[1] - k * WS, x2: WO[0] + 17 * WS, y2: WO[1] - k * WS, stroke: C.line, 'stroke-width': 1.2 });
{ const a1 = PUC.arrow(w, C.ink, 3, 14), a2 = PUC.arrow(w, C.ink, 3, 14); a1.set(WO[0], WO[1], WO[0] + 18 * WS, WO[1]); a2.set(WO[0], WO[1], WO[0], WO[1] - 11.5 * WS); }
[0, 4, 8, 12, 16].forEach(k => txt(w, WO[0] + k * WS, WO[1] + 30, k, { 'text-anchor': 'middle' })); [3, 6, 9].forEach(k => txt(w, WO[0] - 14, WO[1] - k * WS + 6, k, { 'text-anchor': 'end' }));
txt(w, WO[0] + 18 * WS, WO[1] + 30, 'x (m)', { 'text-anchor': 'end' }); txt(w, WO[0] + 14, WO[1] - 11.5 * WS + 6, 'y (m)');
const wPath = mk(w, 'path', { d: '', stroke: RC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const WP = [WO[0] + 12 * WS, WO[1] - 9 * WS];
const wdx = mk(w, 'path', { d: `M${WP[0]},${WP[1]} V${WO[1]}`, stroke: VX, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' }), wdy = mk(w, 'path', { d: `M${WP[0]},${WP[1]} H${WO[0]}`, stroke: VY, 'stroke-width': 2.5, 'stroke-dasharray': '7 7', fill: 'none' });
const wlx = it(w, WP[0] - 10, WO[1] - 14, 'x = 12 m', VX, { 'text-anchor': 'end', 'font-size': 24 }), wly = it(w, WO[0] + 14, WP[1] - 12, 'y = 9 m', VY, { 'font-size': 24 });
const wDot = mk(w, 'circle', { r: 13, fill: C.ink });
const wVx = PUC.arrow(w, VX, 5, 16), wVy = PUC.arrow(w, VY, 5, 16), wV = PUC.arrow(w, RC, 6, 18);
const wlv = it(w, WP[0] + 4 * WV + 12, WP[1] - 6 * WV - 6, '7.2 m/s', RC, { 'font-size': 26 });
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'v = u + at = 4 + 2 × 3 = 10 m/s', right: 'Split: vₓ = 4, vᵧ = 6, so v = √52 ≈ 7.2 m/s' });
const tp = $('#tpS'), TO = [200, 246], TS = 34;
const tU = PUC.arrow(tp, VX, 6, 18), tA = PUC.arrow(tp, VY, 6, 18), tV = PUC.arrow(tp, RC, 6, 18);
const tLu = it(tp, TO[0] + 2 * TS, TO[1] + 32, 'u = 4', VX, { 'text-anchor': 'middle', 'font-size': 24 }), tLa = it(tp, TO[0] + 4 * TS + 14, TO[1] - 3 * TS, 'at = 6', VY, { 'font-size': 24 }), tLv = it(tp, TO[0] + 2 * TS - 18, TO[1] - 3 * TS - 20, '7.2', RC, { 'text-anchor': 'end', 'font-size': 24 });
const tRa = mk(tp, 'path', { d: `M${TO[0] + 4 * TS - 18},${TO[1]} V${TO[1] - 18} H${TO[0] + 4 * TS}`, stroke: C.ink, 'stroke-width': 2, fill: 'none' });
const where = PUC.where($('#wa'), { on: [], type: 'Vector questions: given u and a as vectors, find the position or speed at time t' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 84, optFs: 30, optY: 330,
  q: `A particle starts at the origin with ${K(`\\vec{u} = 6\\,\\hat{i}\\ \\text{m/s}`)} and ${K(`\\vec{a} = 4\\,\\hat{j}\\ \\text{m/s}^2`)}. When its <i>y</i> coordinate is 8 m, its <i>x</i> coordinate and speed are:`,
  opts: ['12 m, 14 m/s', '12 m, 10 m/s', '24 m, 10 m/s', '12 m, 8 m/s'], right: 1 });
const so = PUC.solution($('#so'), [[K(`8 = \\tfrac{1}{2}(4)\\,t^{2} \\Rightarrow t = 2\\ \\text{s}`)], [K(`${tc(VX, 'x')} = 6 \\times 2 = 12\\ \\text{m}`)], [K(`${vy} = 4 \\times 2 = 8\\ \\text{m/s}`)], [K(`v = \\sqrt{6^{2} + 8^{2}} = ${tc(C.ok, '10\\ \\text{m/s}')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Along'), wt('A3', 'x'), wt('A3', 'And'), wt('A4', 'Speed')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · motion in a plane', y0: 100, dy: 90, txt: [0, 0, 0, 1],
  lines: [K(`${tc(RC, '\\vec{r}')} = ${tc(VX, 'x')}\\,${ih} + ${tc(VY, 'y')}\\,${jh} \\qquad ${tc(RC, '\\vec{v}')} = ${vx}\\,${ih} + ${vy}\\,${jh}`),
    K(`${tc(RC, 'v')} = \\sqrt{${vx}^{2} + ${vy}^{2}} \\qquad \\tan\\textcolor{${TH}}{\\theta} = ${vy}/${vx}`),
    K(`${vx} = ${tc(VX, 'u_x')} + ${tc(VX, 'a_x')}t \\qquad ${tc(VX, 'x')} = ${tc(VX, 'u_x')}t + \\tfrac{1}{2}${tc(VX, 'a_x')}t^{2} \\quad (\\text{same for } ${tc(VY, 'y')})`),
    '<b>x and y are independent</b>: solve each, then combine'] });
const YQ = ['Why is 4 m/s east plus 3 m/s north not 7 m/s?', 'How do you find the speed from vₓ and vᵧ?', 'Does a faster flick change the time down a slope? Why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 41', topic: 'Throw one, drop one: which lands first? Projectile Motion', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const FZ = sim(1 + 0.25 * (tFrz - tS5)), FX = 160 + O[0] + FZ.x * SC, FY = 270 + O[1] - FZ.y * SC;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S6', 'blue') - 0.2, 1.06, 960, 540], [tS8 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  $('#pj').style.left = (36 + $('#pi').offsetWidth + 16) + 'px';
  $('#px1').style.left = (36 + $('#px0').offsetWidth + 16) + 'px';
}

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
    vis($('#hjP'), t, wt('H2', 'bends') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    vis($('#wqL'), t, tTile[0] - 0.3, 1e9, { dy: 8 });
    TILES.forEach((_, i) => { const el = $('#wq' + i); vis(el, t, tTile[i] - 0.1, 1e9, POP); });
    const bad = M.io((t - wt('H4', 'wrong')) / 0.3); $('#wq2').style.background = mix(C.soft, C.redBg, bad);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pm'), t, tP1 + 0.05, out, { dx: 60, dy: 0, ...o });
    vis($('#pm0'), t, tP1 + 0.2, 1e9, { dy: 8 });
    vis(pmd, t, wt('P1', 'straight'), 1e9, { ...POP, sc: 0.3 }); M.draw(pmb, t, wt('P1', 'one') - 0.1, 0.5); vis(pmt, t, wt('P1', 'one'), 1e9, { dy: 8 });
    vis($('#pq'), t, T0('P2') - 0.1, out, { dx: -60, dy: 0, ...o });
    vis(pDot, t, T0('P2') + 0.2, 1e9, { ...POP, sc: 0.3 }); vis(pDl, t, T0('P2') + 0.3, 1e9, { dy: 6 });
    vis($('#pm1'), t, wt('P2', 'two') - 0.1, 1e9, { dy: 8 });
    const tE = wt('P2', 'east'), tNo = wt('P2', 'north');
    M.draw(pdx, t, tE - 0.2, 0.4); M.draw(pbx, t, tE, 0.5); vis(plx, t, tE + 0.3, 1e9, { dy: 8 }); vis($('#px0'), t, tE, 1e9, POP);
    M.draw(pdy, t, tNo - 0.2, 0.4); M.draw(pby, t, tNo, 0.5); vis(ply, t, tNo + 0.3, 1e9, { dy: 8 }); vis($('#px1'), t, tNo, 1e9, POP);
    const u = M.o3((t - wt('P3', 'arrow') + 0.1) / 0.7); pR.set(PO[0], PO[1], PO[0] + (PP[0] - 14 * 0.8 - PO[0]) * u, PO[1] + (PP[1] + 14 * 0.6 - PO[1]) * u); vis(plr, t, wt('P3', 'position'), 1e9, POP);
    PUC.write($('#pF'), t, wt('P4', 'equals') - 0.1, 0.8);
    vis($('#pi'), t, wt('P4', 'hat', 2) - 0.2, 1e9, POP); vis($('#pj'), t, wt('P4', 'hat', 3) - 0.2, 1e9, POP);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, OUT('S8'), { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, OUT('S8'), { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, OUT('S8'), { dy: 36, ...o });
    const tau = tauS(t), P = sim(tau), X = O[0] + P.x * SC, Y = O[1] - P.y * SC;
    attr(sDot, 'cx', X.toFixed(1)); attr(sDot, 'cy', Y.toFixed(1)); vis(sDot, t, tS1 + 0.5, 1e9, { ...POP, sc: 0.3 });
    const moving = (t > tRun && t < tRun + 4) || (t > tS5 && t < tFrz) || (t > tRes && tau < 4);
    ghosts.forEach((gh, k) => { const dt = (t < tS5 ? 0.22 : t < tRes ? 0.9 : 0.22) * (k + 1), q = sim(Math.max(0, tauS(t - dt))); attr(gh, 'cx', (O[0] + q.x * SC).toFixed(1)); attr(gh, 'cy', (O[1] - q.y * SC).toFixed(1)); gh.style.opacity = moving && t - dt > tRun ? [0.3, 0.2, 0.12][k] : 0; });
    const pathMax = Math.max(tau, t > tRun + 4 ? 4 : 0); attr(sPath, 'd', pathMax > 0.02 ? `M${O[0]},${O[1]} L${(O[0] + 4 * pathMax * SC).toFixed(1)},${(O[1] - 3 * pathMax * SC).toFixed(1)}` : '');
    const shOn = t > wt('S2', 'shadows') - 0.2; [shx, shy, shX, shY].forEach(e => M.hide(e, !shOn));
    attr(shX, 'cx', X.toFixed(1)); attr(shX, 'cy', O[1]); attr(shY, 'cx', O[0]); attr(shY, 'cy', Y.toFixed(1));
    attr(shx, 'x1', X.toFixed(1)); attr(shx, 'y1', Y.toFixed(1)); attr(shx, 'x2', X.toFixed(1)); attr(shx, 'y2', O[1]);
    attr(shy, 'x1', X.toFixed(1)); attr(shy, 'y1', Y.toFixed(1)); attr(shy, 'x2', O[0]); attr(shy, 'y2', Y.toFixed(1));
    // slow-mo replay vectors
    vis($('#smo'), t, tS5 + 0.05, tRes, { ...POP, sc: 0.8 });
    const ux = M.o3((t - wt('S6', 'blue') + 0.1) / 0.6), uy = M.o3((t - wt('S6', 'violet') + 0.1) / 0.6), uv = M.o3((t - wt('S7', 'diagonal') + 0.1) / 0.6), vOff = 1 - M.io((t - tRes) / 0.3);
    avx.set(X, Y, X + 4 * VS * ux * vOff, Y); avy.set(X + 4 * VS, Y, X + 4 * VS, Y - 3 * VS * uy * vOff); av.set(X, Y, X + 4 * VS * uv * vOff, Y - 3 * VS * uv * vOff);
    if (t < tS5 + 0.5) { avy.set(0, 0, 0, 0); }
    attr(lvx, 'x', X + 2 * VS - 12); attr(lvx, 'y', Y + 38); lvx.style.opacity = (ux * vOff).toFixed(3);
    attr(lvy, 'x', X + 4 * VS + 14); attr(lvy, 'y', Y - 1.5 * VS + 10); lvy.style.opacity = (uy * vOff).toFixed(3);
    attr(lv, 'x', X - 26); attr(lv, 'y', Y - 3 * VS - 4); attr(lv, 'text-anchor', 'start'); lv.style.opacity = (M.io((t - wt('S7', 'Five')) / 0.3) * vOff).toFixed(3);
    attr(rAng, 'd', `M${X + 4 * VS - 14},${Y} V${Y - 14} H${X + 4 * VS}`); rAng.style.opacity = (uy * vOff).toFixed(3); M.hide(rAng, uy * vOff < 0.01);
    // readout
    M.setT($('#r_t'), f2(tau)); M.setT($('#r_x'), f1(P.x)); M.setT($('#r_y'), f1(P.y));
    M.setT($('#r_v'), t > wt('S7', 'Five') - 0.05 ? '5.0' : '?');
    $('#r_v').style.color = mix(C.dim, RC, M.io((t - wt('S7', 'Five')) / 0.3));
    // graph linked to the sim
    const gMax = Math.max(tau, t > tRun + 4 ? 4 : 0);
    gcx(s2 => [s2, 4 * s2], 0, gMax); gcy(s2 => [s2, 3 * s2], 0, gMax); gdx(tau, 4 * tau, t > tRun); gdy(tau, 3 * tau, t > tRun);
    attr(gTx, 'y', g.Y(16) + 6); attr(gTy, 'y', g.Y(12) + 6); attr(gTx, 'x', g.X(4) + 14); attr(gTy, 'x', g.X(4) + 14);
    vis(gTx, t, wt('S4', 'graph'), 1e9, { dy: 6 }); vis(gTy, t, wt('S4', 'graph') + 0.2, 1e9, { dy: 6 });
    avA(t, wt('S7', 'not') + 0.2, OUT('S8'));
    vis($('#th1'), t, tS8 + 0.05, out, { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'What') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: T0('S9') - 0.02, tWhy: wt('S9', 'Root') });
  }

  /* D: the rules */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 200], [tStep[2] - 0.1, 316], [tStep[3] - 0.1, 432]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.draw(dlx, t, wt('D2', 'delta', 2) - 0.1, 0.5); vis(dTx, t, wt('D2', 'delta', 2) + 0.2, 1e9, { dy: 8 });
    M.draw(dly, t, wt('D2', 'delta', 3) - 0.1, 0.5); vis(dTy, t, wt('D2', 'delta', 3) + 0.2, 1e9, { dy: 8 });
    const ur = M.o3((t - wt('D2', 'changes') + 0.1) / 0.6); dR.set(DA[0], DA[1], DA[0] + (DB[0] - DA[0]) * ur, DA[1] + (DB[1] - DA[1]) * ur); vis(dTr, t, wt('D2', 'changes') + 0.4, 1e9, { dy: 8 });
    vis(dBd, t, wt('D2', 'changes') + 0.4, 1e9, { ...POP, sc: 0.3 });
    vis(dN1, t, tStep[2] + 0.6, 1e9, { dy: 10 }); M.draw(dArc, t, tStep[3] - 0.1, 0.5); vis(dTh, t, tStep[3] + 0.2, 1e9, POP); vis(dN2, t, tStep[3] + 0.6, 1e9, { dy: 10 });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Motion') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'happening'), 0.8);
  }

  /* C: marble */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('R1');
    vis($('#msim'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    vis($('#mro'), t, tC1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exC'), t, tC1 + 0.8, 1e9, { dy: 8 });
    vis($('#mgr'), t, tC1 + 0.65, out, { dy: 36, ...o });
    vis(slp, t, wt('C3', 'slope') - 0.1, 1e9, { dy: -12 });
    const tau = tauC(t), [X, Y] = mp(tau);
    attr(mDot, 'cx', X.toFixed(1)); attr(mDot, 'cy', Y.toFixed(1)); vis(mDot, t, T0('C2') - 0.1, 1e9, { ...POP, sc: 0.3 });
    const mv = (t > tRunC && t < tRunC + 3) || (t > tRep + 0.3 && tau < 3);
    mg.forEach((gh, k) => { const dt = (t < tRep ? 0.2 : 0.8) * (k + 1), q = mp(Math.max(0, tauC(t - dt))); attr(gh, 'cx', q[0].toFixed(1)); attr(gh, 'cy', q[1].toFixed(1)); gh.style.opacity = mv && (t < tRep ? t - dt > tRunC : t - dt > tRep + 0.3) ? [0.3, 0.2, 0.12][k] : 0; });
    const pm2 = t >= tRunC + 3 ? 3 : tau; let dd = ''; if (pm2 > 0.01) for (let i = 0; i <= 40; i++) { const q = mp(pm2 * i / 40); dd += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } attr(mPath, 'd', dd);
    // flick and slope arrows before the run
    const pre = 1 - M.io((t - tRunC) / 0.3);
    const uu = M.o3((t - wt('C2', 'flicks') + 0.1) / 0.5) * pre; mUx.set(X + 20, Y, X + 20 + 110 * uu, Y); attr(mLu, 'x', X + 50); attr(mLu, 'y', Y + 46); mLu.style.opacity = (uu).toFixed(3);
    const ua = M.o3((t - wt('C3', 'acceleration') + 0.1) / 0.5) * pre; mA.set(X, Y + 20, X, Y + 20 + 90 * ua); attr(mLa, 'x', X + 16); attr(mLa, 'y', Y + 90); mLa.style.opacity = ua.toFixed(3);
    // slow-mo replay: velocity components + tangent velocity, a stays down
    vis($('#smo2'), t, tRep + 0.1, 1e9, { ...POP, sc: 0.8 });
    const rv = M.o3((t - wt('C7', 'velocity') + 0.1) / 0.5) * (t > tRep ? 1 : 0), vxv = 3, vyv = 2 * tau, k2 = 26;
    mVx.set(X, Y, X + vxv * k2 * rv, Y); mVy.set(X, Y, X, Y + vyv * k2 * rv); mV.set(X, Y, X + vxv * k2 * rv, Y + vyv * k2 * rv);
    attr(mLv, 'x', X + vxv * k2 + 10); attr(mLv, 'y', Y + vyv * k2 + 10); mLv.style.opacity = rv.toFixed(3);
    // readout + graph
    M.setT($('#m_t'), f2(tau)); M.setT($('#m_x'), f1(3 * tau)); M.setT($('#m_y'), f1(tau * tau)); M.setT($('#m_vy'), f1(2 * tau));
    const gm = Math.max(tau, t > tRunC + 3 ? 3 : 0);
    mcx(s2 => [s2, 3], 0, gm); mcy(s2 => [s2, 2 * s2], 0, gm); mdx(tau, 3, t > tRunC - 0.2); mdy(tau, 2 * tau, t > tRunC - 0.2);
    vis(mTx, t, wt('C5', 'blue') - 0.1, 1e9, POP); vis(mTy, t, wt('C6', 'violet') - 0.1, 1e9, POP);
  }

  /* R: equations twice */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    vis($('#req'), t, tR1 + 0.05, OUT('K1'), { dy: 36, ...o });
    vis($('#eh0'), t, wt('R1', 'once') - 0.1, 1e9, POP); vis($('#eh1'), t, wt('R1', 'once', 1) - 0.1, 1e9, POP);
    [0, 1].forEach(c => [0, 1].forEach(k => PUC.write($(`#eq${c}${k}`), t, tEq[c][k], 0.8)));
    vis($('#vrw'), t, T0('R4') - 0.05, 1e9, { dy: 20 }); PUC.write($('#vf0'), t, tVf[0], 0.8); PUC.write($('#vf1'), t, tVf[1], 0.8);
    avR(t, T1('R4') - 0.4, OUT('K1'));
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kx'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    KXd.forEach(([c, l], k) => { vis(c, t, tKx - 0.3 + k * 0.45, 1e9, { ...POP, sc: 0.3 }); vis(l, t, tKx - 0.2 + k * 0.45, 1e9, { dy: 6 }); });
    KXg.forEach(([p, l], k) => { M.draw(p, t, tKx + 0.2 + k * 0.45, 0.3); vis(l, t, tKx + 0.3 + k * 0.45, 1e9, { dy: 6 }); });
    vis($('#kxP'), t, T1('K1') - 0.6, 1e9, POP);
    vis($('#ky'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    KYd.forEach(([c, l], k) => { vis(c, t, tKy[0] - 0.4 + k * 0.3, 1e9, { ...POP, sc: 0.3 }); vis(l, t, tKy[0] - 0.3 + k * 0.3, 1e9, { dy: 6 }); });
    KYg.forEach(([p, l], k) => { M.draw(p, t, tKy[k + 1] - 0.15, 0.3); vis(l, t, tKy[k + 1], 1e9, POP); });
    vis($('#kyP'), t, tKy[3] + 0.4, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'flick') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tau = 3 * M.clamp((t - wt('W2', 'Find')) / 2.4), PX = WO[0] + 4 * tau * WS, PY = WO[1] - tau * tau * WS;
    let dd = ''; if (tau > 0.01) for (let i = 0; i <= 40; i++) { const q = tau * i / 40; dd += (i ? 'L' : 'M') + (WO[0] + 4 * q * WS).toFixed(1) + ',' + (WO[1] - q * q * WS).toFixed(1); } attr(wPath, 'd', dd);
    attr(wDot, 'cx', PX.toFixed(1)); attr(wDot, 'cy', PY.toFixed(1)); vis(wDot, t, T0('W2') + 0.5, 1e9, { ...POP, sc: 0.3 });
    M.draw(wdx, t, wt('W3', 'Twelve') - 0.3, 0.4); vis(wlx, t, wt('W3', 'Twelve'), 1e9, { dy: 8 });
    M.draw(wdy, t, wt('W4', 'Nine') - 0.3, 0.4); vis(wly, t, wt('W4', 'Nine'), 1e9, { dy: 8 });
    const u1 = M.o3((t - wt('W5', 'stays') + 0.1) / 0.5), u2 = M.o3((t - wt('W5', 'six') + 0.1) / 0.5), u3 = M.o3((t - T0('W6') + 0.1) / 0.5);
    wVx.set(WP[0], WP[1], WP[0] + 4 * WV * u1, WP[1]); wVy.set(WP[0], WP[1], WP[0], WP[1] - 6 * WV * u2); wV.set(WP[0], WP[1], WP[0] + 4 * WV * u3, WP[1] - 6 * WV * u3);
    vis(wlv, t, wt('W6', 'About'), 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Four') - 0.3, tStrike: wt('X3', 'different') - 0.1, tRight: wt('X3', 'separately') });
    const a1 = M.o3((t - wt('X3', 'u') + 0.1) / 0.5), a2 = M.o3((t - wt('X3', 'different') + 0.1) / 0.5), a3 = M.o3((t - wt('X3', 'combine') + 0.1) / 0.5);
    tU.set(TO[0], TO[1], TO[0] + 4 * TS * a1, TO[1]); tA.set(TO[0] + 4 * TS, TO[1], TO[0] + 4 * TS, TO[1] - 6 * TS * a2); tV.set(TO[0], TO[1], TO[0] + 4 * TS * a3, TO[1] - 6 * TS * a3);
    tLu.style.opacity = a1.toFixed(3); tLa.style.opacity = a2.toFixed(3); tLv.style.opacity = a3.toFixed(3); tRa.style.opacity = a2.toFixed(3);
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
