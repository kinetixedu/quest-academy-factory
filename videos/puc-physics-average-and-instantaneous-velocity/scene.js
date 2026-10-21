// PUC Physics Ep 22: Average and Instantaneous Velocity (Motion notebook, a bicycle on a straight road)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, BC = C.violet, XC = C.ink;            // colour-coding: instantaneous v blue, average v-bar violet, x and t ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, fs = 30, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const VB = `\\textcolor{${BC}}{\\bar{v}}`, V = `\\textcolor{${VC}}{v}`;
// piecewise-linear clock: pts [[tReal, value], ...]
const lin = pts => t => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; if (t <= b) return b === a ? vb : va + (vb - va) * (t - a) / (b - a); } return pts[pts.length - 1][1]; };

Object.assign(M.IC, {
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M11 18h2'],
  route: ['M6 19a3 3 0 1 0 0-.01', 'M18 5a3 3 0 1 0 0-.01', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  school: ['M14 22v-4a2 2 0 1 0-4 0v4', 'M18 10l4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2', 'M18 5v17', 'm4 6 8-4 8 4', 'M6 5v17', 'M12 7v.01'],
});

/* bicycle glyph: g with two wheels (rotating spokes) and a frame; set(x, y, s, dir, x_m) */
const bike = (p, col = C.ink) => {
  const g = mk(p, 'g', {}), w = [];
  [-30, 30].forEach(cx => { mk(g, 'circle', { cx, cy: 0, r: 22, fill: '#fff', stroke: col, 'stroke-width': 4 }); w.push(mk(g, 'path', { d: '', stroke: col, 'stroke-width': 2, fill: 'none' })); });
  mk(g, 'path', { d: 'M-30,0 L-8,-30 L22,-30 L30,0 M-8,-30 L0,0 L-30,0 M22,-30 L18,-44 L28,-46 M-8,-30 L-12,-40 M-20,-40 L-4,-40', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(g, 'circle', { cx: 0, cy: 0, r: 4, fill: col });
  return { g, set(x, y, s = 1, dir = 1, rot = 0) {
    attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * dir).toFixed(3)},${s.toFixed(3)})`);
    [-30, 30].forEach((cx, i) => { const a = rot, c = Math.cos(a) * 20, d = Math.sin(a) * 20; attr(w[i], 'd', `M${(cx - c).toFixed(1)},${(-d).toFixed(1)} L${(cx + c).toFixed(1)},${d.toFixed(1)} M${(cx + d).toFixed(1)},${(-c).toFixed(1)} L${(cx - d).toFixed(1)},${c.toFixed(1)}`); });
  } };
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tA1 = T0('B1'), tS1 = T0('S1'), tZ1 = T0('Z1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tG1 = T0('G1'), tG4 = T0('G4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three readings ---------- */
const JOBS = [['phone', 'Trip app', 'AVERAGE, WHOLE RIDE', '12', 'averaged'], ['gauge', 'Speedometer', 'ON THE SLOPE', '25', 'slope'], ['gauge', 'Speedometer', 'AT THE SIGNAL', '0', 'signal']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w, v], i) => `<div class="job" id="jb${i}" style="left:${240 + i * 500}px"><i>${M.icon(ic, 32, i ? VC : BC, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" style="color:${i ? VC : BC}">${v} <small>km/h</small></div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[4]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, i ? VC : BC, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" style="color:${i ? VC : BC}">${v} <small>km/h</small></div></div>`).join('');
const TILES = [['route', 'A whole trip?', BC], ['clock', 'One instant?', VC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'whole'), wt('H4', 'single')];

/* ---------- A: the whole trip ---------- */
const am = $('#amS'), RX0 = 110, RX1 = 674, RY = 330;
mk(am, 'line', { x1: 60, y1: RY + 26, x2: 724, y2: RY + 26, stroke: C.ink, 'stroke-width': 3 });
for (let x = 72; x < 724; x += 28) mk(am, 'line', { x1: x, y1: RY + 30, x2: x - 14, y2: RY + 44, stroke: C.dim, 'stroke-width': 2 });
const hm = document.createElement('div'); hm.style.cssText = `position:absolute;left:${RX0 - 30}px;top:${RY - 190}px;text-align:center;width:60px`; hm.innerHTML = M.icon('home', 52, C.ink, 2.2) + '<div class="lbl" style="position:static;margin-top:6px;margin-left:-6px">HOME</div>'; $('#am').appendChild(hm);
const cl = document.createElement('div'); cl.style.cssText = `position:absolute;left:${RX1 - 40}px;top:${RY - 190}px;width:80px;text-align:center`; cl.innerHTML = `<div style="display:inline-block">${M.icon('school', 52, C.ink, 2.2)}</div><div class="lbl" style="position:static;margin-top:6px">COLLEGE</div>`; $('#am').appendChild(cl);
const SIG = 0.36, SLP = [0.5, 0.7];
const sigL = mk(am, 'g', {}); mk(sigL, 'rect', { x: RX0 + SIG * (RX1 - RX0) - 9, y: RY - 120, width: 18, height: 40, rx: 5, fill: C.ink }); mk(sigL, 'circle', { cx: RX0 + SIG * (RX1 - RX0), cy: RY - 108, r: 6, fill: C.red }); mk(sigL, 'line', { x1: RX0 + SIG * (RX1 - RX0), y1: RY - 80, x2: RX0 + SIG * (RX1 - RX0), y2: RY + 26, stroke: C.ink, 'stroke-width': 3 });
const slpM = mk(am, 'path', { d: `M${RX0 + SLP[0] * (RX1 - RX0)},${RY + 26} L${RX0 + SLP[1] * (RX1 - RX0)},${RY - 6} L${RX0 + SLP[1] * (RX1 - RX0) + 20},${RY + 26} Z`, fill: C.soft, stroke: C.dim, 'stroke-width': 2 });
const ghA = [0, 1, 2].map(() => bike(am, C.ink)); ghA.forEach(b => b.g.style.opacity = 0);
const bA = bike(am, C.ink);
const dA = PUC.arrow(am, BC, 6, 18);
const dAl = txt(am, (RX0 + RX1) / 2, RY + 104, 'Δx = 3 km east', { 'text-anchor': 'middle', 'font-size': 26, fill: BC, 'font-weight': 600 });
const tAl = txt(am, (RX0 + RX1) / 2, RY + 150, 'Δt = 15 min', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const aChip = [['0 km/h', SIG, C.red], ['25 km/h', 0.62, VC]].map(([s, u, c]) => { const d = document.createElement('div'); d.className = 'gchip'; d.style.cssText = `top:${RY - 250}px;color:${c};border-color:${c}`; d.textContent = s; d._u = u; $('#am').appendChild(d); return d; });
const uA = lin([[T0('B3') + 0.2, 0], [T0('B3') + 1.6, SIG], [T0('B3') + 2.3, SIG], [T0('B3') + 3.8, SLP[1]], [T1('B3') + 0.3, 1]]);
$('#af0').innerHTML = K(`${VB} = \\dfrac{\\text{displacement}}{\\text{time taken}} = \\dfrac{\\Delta x}{\\Delta t}`);
$('#af1').innerHTML = K(`${VB} = \\dfrac{3\\,\\text{km}}{0.25\\,\\text{h}}`);
$('#af2').innerHTML = K(`${VB} = \\textcolor{${BC}}{12\\,\\text{km/h}}\\ \\text{east}`);

/* ---------- S: the sim, x = t^2 from rest ---------- */
const s = $('#simS'), SX0 = 104, PXM = 22, SY = 360;    // 22 px per metre, 0 to 25 m
mk(s, 'line', { x1: 50, y1: SY + 26, x2: 734, y2: SY + 26, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 25; m++) { const x = SX0 + m * PXM; mk(s, 'line', { x1: x, y1: SY + 26, x2: x, y2: SY + 26 + (m % 5 ? 8 : 16), stroke: C.ink, 'stroke-width': m % 5 ? 1.5 : 2.5 }); if (m % 5 === 0) txt(s, x, SY + 64, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(s, SX0 + 25 * PXM + 30, SY + 64, 'm', { fill: C.mute });
mk(s, 'rect', { x: SX0 - 34, y: SY - 130, width: 12, height: 156, fill: C.ink, rx: 4 }); mk(s, 'circle', { cx: SX0 - 28, cy: SY - 112, r: 7, fill: C.ok });
const ghS = [0, 1, 2].map(() => bike(s, C.ink)); ghS.forEach(b => b.g.style.opacity = 0);
const bS = bike(s, C.ink);
const vS = PUC.arrow(s, VC, 7, 20), vSl = it(s, 0, 0, 'v = ?', VC, 30);
// extra metres each second: +1, +3, +5, +7, +9
const GAPS = [0, 1, 2, 3, 4].map(k => { const a = SX0 + k * k * PXM, b = SX0 + (k + 1) * (k + 1) * PXM, g = mk(s, 'g', {});
  mk(g, 'path', { d: `M${a + 2},${SY + 84} v10 H${b - 2} v-10`, fill: 'none', stroke: C.ac, 'stroke-width': 2.5 }); txt(g, (a + b) / 2, SY + 124, '+' + (2 * k + 1), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ac, 'font-weight': 600 }); return g; });
const gapL = txt(s, 36, SY + 170, 'EXTRA METRES IN EACH NEW SECOND', { 'font-size': 18, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 });
$('#simF').innerHTML = K(`x = t^2 \\quad (x \\text{ in m},\\ t \\text{ in s})`);
$('#roG').innerHTML = `<span class="k">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k">x</span><span class="v" id="rx">0.00</span><span class="u">m</span>
  <span class="k" style="color:${BC}">v&#772;</span><span class="v" id="rvb" style="color:${BC}">0.00</span><span class="u">m/s since start</span>`;
const G = PUC.graph($('#grS'), { x: 110, y: 70, w: 600, h: 150, xmax: 5, ymax: 25, xt: [0, 1, 2, 3, 4, 5], yt: [0, 25], xl: 't (s)', yl: 'x (m)' });
const gC = G.curve(C.ink, 4), gD = G.dot(VC, 10);
const tGo = wt('S2', 'starts') - 0.1, tRep = T0('S4') + 0.1, tFrz = wt('S4', 'Freeze');
const simT = t => t < tRep ? M.clamp(t - tGo, 0, 5) : (t < tRep + 0.35 ? 5 - 3.4 * M.io((t - tRep) / 0.35) : M.clamp(1.6 + 0.25 * (t - tRep - 0.35), 1.6, 2));
const tGap = [wt('S3', 'Every'), wt('S3', 'second'), wt('S3', 'more'), wt('S3', 'ground'), wt('S3', 'before')];
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Right now, not over the whole ride.' });

/* ---------- Z: shrink the gap ---------- */
const ZR = [['2', '12', '6.00'], ['1', '5', '5.00'], ['0.5', '2.25', '4.50'], ['0.1', '0.41', '4.10'], ['0.01', '0.0401', '4.01']];
const ZC = [36, 242, 498];
$('#zrs').innerHTML = ['Δt (s)', 'Δx (m)', 'Δx/Δt (m/s)'].map((h, i) => `<div class="zh" style="left:${ZC[i]}px;width:${[170, 220, 220][i]}px">${h}</div>`).join('') +
  ZR.map((r, i) => `<div class="zr" id="zr${i}" style="top:${122 + i * 64}px">${r.map((v, j) => `<span class="c${j}" style="${j === 2 ? 'color:' + BC : ''}">${v}</span>`).join('')}</div>`).join('') +
  `<div class="zr" id="zr5" style="top:${122 + 5 * 64 + 8}px;background:var(--ac2)"><span class="c0">→ 0</span><span class="c1">→ 0</span><span class="c2" style="color:${VC}">→ 4</span></div>`;
const tZr = [wt('Z1', 'From'), T0('Z2'), T0('Z3'), T0('Z4'), T0('Z5')];
const zg = PUC.graph($('#zgS'), { x: 110, y: 90, w: 600, h: 400, xmax: 4.5, ymax: 20, xt: [0, 1, 2, 3, 4], yt: [0, 4, 10, 20], xl: 't (s)', yl: 'x (m)' });
const zC = zg.curve(C.ink, 4), zCh = mk($('#zgS'), 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), zTg = mk($('#zgS'), 'line', { stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const zP = zg.dot(C.ink, 9), zQ = zg.dot(BC, 9);
const zLg = M.keys([[0, Math.log10(2)], [T0('Z2'), 0], [T0('Z3'), Math.log10(0.5)], [T0('Z4'), -1], [T0('Z5'), -2]], 0.9);
const tTan = wt('Z6', 'tangent');
const avZ = PUC.avatar($('#sZ'), { x: 976 + 36, y: 270 + 600, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'It settles on 4!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`${VB} = \\dfrac{\\Delta x}{\\Delta t}`, 'change in position ÷ time'],
  [`${V} = \\lim\\limits_{\\Delta t \\to 0} \\dfrac{\\Delta x}{\\Delta t}`, 'shrink the gap to zero'],
  [`${V} = \\dfrac{dx}{dt}`, 'how fast x changes now'],
  [`${V} = 2t = \\textcolor{${VC}}{4\\,\\text{m/s}}`, 'for x = t², at t = 2 s']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:116px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Average'), wt('D3', 'shrink'), wt('D4', 'written'), wt('D5', 'For')];
const dg = PUC.graph($('#drS'), { x: 110, y: 90, w: 600, h: 400, xmax: 4.5, ymax: 20, xt: [0, 1, 2, 3, 4], yt: [0, 4, 10, 20], xl: 't (s)', yl: 'x (m)' });
const dC = dg.curve(C.ink, 4), dS = $('#drS');
const dTx = mk(dS, 'line', { stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' }), dTy = mk(dS, 'line', { stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const dCh = mk(dS, 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), dTg = mk(dS, 'line', { stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dLt = it(dS, 0, 0, 'Δt', C.ink, 26), dLx = it(dS, 0, 0, 'Δx', C.ink, 26), dLs = txt(dS, 0, 0, 'slope = 4 m/s', { 'font-size': 24, fill: VC, 'font-weight': 600 });
const dP = dg.dot(C.ink, 9);
const dLg = M.keys([[0, Math.log10(1.5)], [tStep[1] + 0.4, Math.log10(0.04)]], 1.6);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${VB} = \\text{slope of the chord} \\qquad ${V} = \\text{slope of the tangent}`);

/* ---------- K: side by side ---------- */
const kg = PUC.graph($('#kbS'), { x: 110, y: 84, w: 560, h: 170, xmax: 5, ymax: 25, xt: [], yt: [], xl: 't', yl: 'x' });
const kC = kg.curve(C.ink, 4), kCh = mk($('#kbS'), 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), kP1 = kg.dot(BC, 8), kP2 = kg.dot(BC, 8);
const kT1 = txt($('#kbS'), kg.X(1), kg.Y(1) + 34, 't₁', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 }), kT2 = txt($('#kbS'), kg.X(4) + 22, kg.Y(16) + 6, 't₂', { 'font-size': 20, fill: BC, 'font-weight': 600 });
$('#kbF').innerHTML = K(`${VB} = \\dfrac{x_2 - x_1}{t_2 - t_1}`);
const kd = $('#kdS'), GX0 = 392, GY0 = 240, GR = 130;
mk(kd, 'path', { d: `M${GX0 - GR},${GY0} A${GR},${GR} 0 0 1 ${GX0 + GR},${GY0}`, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
for (let k = 0; k <= 8; k++) { const a = Math.PI * (1 - k / 8), c = Math.cos(a), sn = Math.sin(a); mk(kd, 'line', { x1: GX0 + c * GR, y1: GY0 - sn * GR, x2: GX0 + c * (GR - (k % 2 ? 12 : 22)), y2: GY0 - sn * (GR - (k % 2 ? 12 : 22)), stroke: C.ink, 'stroke-width': 3 }); if (k % 2 === 0) txt(kd, GX0 + c * (GR - 46), GY0 - sn * (GR - 46) + 7, k * 5, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const kN = PUC.arrow(kd, VC, 6, 18); mk(kd, 'circle', { cx: GX0, cy: GY0, r: 9, fill: C.ink });
const kNv = txt(kd, GX0, GY0 + 44, '18 km/h', { 'text-anchor': 'middle', 'font-size': 26, fill: VC, 'font-weight': 600 });
$('#kdF').innerHTML = K(`${V} = \\dfrac{dx}{dt} \\;\\text{at one instant}`);
const th1 = PUC.think($('#th1'), { q: 'Aarav rides 300 m to a shop and straight back home in 10 minutes. His average velocity?', opts: ['1 m/s', 'Zero'], right: 1, why: 'Displacement is zero, so average velocity is zero. Average speed = 600 m ÷ 600 s = 1 m/s.' });

/* ---------- G: reading velocity off an x-t graph (x = 8t - t^2) ---------- */
const xg = t => 8 * t - t * t, vg = t => 8 - 2 * t;
const gg = PUC.graph($('#ggS'), { x: 110, y: 100, w: 600, h: 380, xmax: 8, ymax: 16, xt: [0, 2, 4, 6, 8], yt: [0, 8, 16], xl: 't (s)', yl: 'x (m)' });
const ggC = gg.curve(C.ink, 4), ggT = mk($('#ggS'), 'line', { stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round' }), ggD = gg.dot(VC, 10);
const gr = $('#grdS'), GRX0 = 140, GPX = 30, GRY = 200;     // 30 px per metre, 0 to 16 m
mk(gr, 'line', { x1: 60, y1: GRY + 26, x2: 724, y2: GRY + 26, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 16; m++) { const x = GRX0 + m * GPX; mk(gr, 'line', { x1: x, y1: GRY + 26, x2: x, y2: GRY + 26 + (m % 4 ? 8 : 16), stroke: C.ink, 'stroke-width': m % 4 ? 1.5 : 2.5 }); if (m % 4 === 0) txt(gr, x, GRY + 64, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const ghG = [0, 1, 2].map(() => bike(gr, C.ink)); ghG.forEach(b => b.g.style.opacity = 0);
const bG = bike(gr, C.ink), vG = PUC.arrow(gr, VC, 7, 20);
$('#groG').innerHTML = `<span class="k">t</span><span class="v" id="gt">0.00</span><span class="u">s</span>
  <span class="k">x</span><span class="v" id="gx">0.00</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="gv" style="color:${VC}">8.00</span><span class="u">m/s</span>`;
const tGs = T0('G2') - 0.2;
const gT = lin([[tGs, 0], [T1('G2') + 0.2, 2.2], [T0('G3'), 2.2], [T1('G3') + 0.3, 7]]);
const th2 = PUC.think($('#th2'), { q: 'At the very top of the hump, the x-t graph is flat for an instant. What is the velocity there?', opts: ['Zero', 'Its maximum'], right: 0, why: 'The tangent at the top is flat, so its slope is zero. For that instant he is turning around.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K('x = 4t^2 + 2t')} (x in m, t in s). Find the average velocity in the first 2 s, and the velocity at t = 2 s.`;
const wsol = PUC.solution($('#wl'), [
  [K(`x(0) = 0,\\;\\; x(2) = 16 + 4 = 20\\,\\text{m}`)],
  [K(`${VB} = \\dfrac{20 - 0}{2 - 0} = \\textcolor{${BC}}{10\\,\\text{m/s}}`)],
  [K(`${V} = \\dfrac{dx}{dt} = 8t + 2`)],
  [K(`${V}(2) = 16 + 2 = \\textcolor{${VC}}{18\\,\\text{m/s}}`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 92 });
$('#wl .lbl').style.top = '30px';
const xw = t => 4 * t * t + 2 * t;
const wg = PUC.graph($('#wrS'), { x: 110, y: 100, w: 600, h: 390, xmax: 2.5, ymax: 30, xt: [0, 1, 2], yt: [0, 10, 20, 30], xl: 't (s)', yl: 'x (m)' });
const wC = wg.curve(C.ink, 4), wCh = mk($('#wrS'), 'line', { stroke: BC, 'stroke-width': 4, 'stroke-linecap': 'round' }), wTg = mk($('#wrS'), 'line', { stroke: VC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wP0 = wg.dot(BC, 9), wP2 = wg.dot(C.ink, 9);
const wL1 = txt($('#wrS'), wg.X(0.6), wg.Y(20), 'v̄ = 10 m/s', { 'font-size': 26, fill: BC, 'font-weight': 600 }), wL2 = txt($('#wrS'), wg.X(0.6), wg.Y(25), 'v = 18 m/s', { 'font-size': 26, fill: VC, 'font-weight': 600 });
const tW = [wt('W3', 'At'), wt('W4', 'Average'), wt('W5', 'For'), wt('W6', 'At')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Mean of the speeds: (10 + 15) ÷ 2 = 12.5 km/h', right: 'Total distance ÷ total time = 12 km ÷ 1 h = 12 km/h' });
const tb = $('#tb'), TBX = 40, TBW = 480;
const tbr = [[0, 36, C.ink2, '10 km/h', '36 min'], [36, 24, C.ac, '15 km/h', '24 min']].map(([a, d, c, sp, mn]) => { const g = mk(tb, 'g', {}); const x = TBX + TBW * a / 60, w = TBW * d / 60;
  mk(g, 'rect', { x, y: 110, width: w - 4, height: 56, rx: 8, fill: c }); txt(g, x + (w - 4) / 2, 146, mn, { 'text-anchor': 'middle', 'font-size': 22, fill: '#fff', 'font-weight': 600 }); txt(g, x + (w - 4) / 2, 96, '6 km at ' + sp, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); return g; });
const tbT = mk(tb, 'g', {}); mk(tbT, 'path', { d: `M${TBX},186 v10 H${TBX + TBW - 4} v-10`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }); txt(tbT, TBX + TBW / 2, 228, '12 km in 60 min', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
txt(tb, TBX, 52, 'TIME SPENT', { 'font-size': 18, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Given x as a function of t: average velocity over an interval, velocity at an instant' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A particle moves with ${K('x = t^3 - 3t^2 + 4')} (x in m, t in s). Its average velocity from t = 0 to 3 s, and its velocity at t = 3 s, are:`, qW: 790,
  opts: ['0 and 9 m/s', '4/3 m/s and 9 m/s', '0 and 0', '3 m/s and 27 m/s'], right: 0, cols: 1, optW: 968, optH: 60, optFs: 28, optY: 300 });
const so = PUC.solution($('#so'), [[K('x(0) = 4,\\;\\; x(3) = 4')], [K(`\\Delta x = 0 \\Rightarrow ${VB} = 0`)], [K(`${V} = 3t^2 - 6t`)], [K(`${V}(3) = 27 - 18 = \\textcolor{${VC}}{9\\,\\text{m/s}}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'x'), wt('A2', 'So'), wt('A3', 'differentiate'), wt('A3', 'twenty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · average and instantaneous velocity', y0: 92, dy: 104, txt: [0, 0, 1, 1],
  lines: [K(`${VB} = \\dfrac{\\Delta x}{\\Delta t}`) + '<span class="flc">slope of the chord</span>',
    K(`${V} = \\lim_{\\Delta t \\to 0}\\dfrac{\\Delta x}{\\Delta t} = \\dfrac{dx}{dt}`) + '<span class="flc">slope of the tangent</span>',
    '<b>Round trip</b>: displacement 0, so average velocity 0', '<b>Speedometer</b>: the size of the instantaneous velocity'] });
[...document.querySelectorAll('#sF .fcard .fl')].forEach((e, i) => { e.style.top = [86, 196, 322, 392][i] + 'px'; });
const YQ = ['Why can a round trip have zero average velocity?', 'Does a speedometer show an average or an instantaneous value?', 'How do you read the velocity at one instant from an x-t graph?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 23', topic: 'What changes velocity? Average and Instantaneous Acceleration', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFrz - 0.2, 1.1, 600, 560], [T0('S5') + 2.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  aChip.forEach(d => { d.style.left = (RX0 + d._u * (RX1 - RX0) - d.offsetWidth / 2).toFixed(0) + 'px'; });
}
const line = (el, g, t0, y0, t1, y1) => { attr(el, 'x1', g.X(t0).toFixed(1)); attr(el, 'y1', g.Y(y0).toFixed(1)); attr(el, 'x2', g.X(t1).toFixed(1)); attr(el, 'y2', g.Y(y1).toFixed(1)); };
// tangent of slope m through (a, ya), clipped to [a - w, a + w]
const tangent = (el, g, a, ya, m, w) => line(el, g, a - w, ya - m * w, a + w, ya + m * w);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.15, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tA1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); el.style.background = mix(C.soft, C.ac2, M.io((t - wt('H2', 'true') + 0.1) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'true') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, wt('H3', 'Which') - 0.3, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-3deg)';
    TILES.forEach((tl, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.ac2 : '#EDE6FB', M.io((t - tTile[i]) / 0.25)); });
  }

  /* A: whole trip */
  const aOn = t >= tA1 - 0.1 && t < tS1 + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = OUT('S1');
    M.vis($('#am'), t, tA1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exA'), t, T0('B3') + 0.2, 1e9, { dy: 8 });
    const u = uA(t), bx = RX0 + u * (RX1 - RX0), lift = u > SLP[0] && u < SLP[1] + 0.04 ? -28 * M.clamp((Math.min(u, SLP[1]) - SLP[0]) / (SLP[1] - SLP[0])) * (u > SLP[1] ? 1 - (u - SLP[1]) / 0.04 : 1) : 0;
    bA.set(bx, RY + lift, 0.8, 1, u * 30);
    ghA.forEach((b, k) => { const uu = uA(t - 0.14 * (k + 1)); b.set(RX0 + uu * (RX1 - RX0), RY, 0.8, 1, uu * 30); b.g.style.opacity = Math.abs(uu - u) > 0.006 ? [0.3, 0.2, 0.12][k] : 0; });
    const d1 = M.io((t - wt('B3', 'three') + 0.1) / 0.6); dA.set(RX0, RY + 70, RX0 + (RX1 - RX0) * d1, RY + 70); dAl.style.opacity = M.clamp((t - wt('B3', 'three')) / 0.3);
    tAl.style.opacity = M.clamp((t - wt('B3', 'fifteen')) / 0.3);
    M.vis($('#af'), t, T0('B2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#af0'), t, wt('B2', 'displacement') - 0.1, 0.8);
    PUC.write($('#af1'), t, wt('B4', 'Three') - 0.05, 0.8);
    PUC.write($('#af2'), t, wt('B4', 'Twelve') - 0.05, 0.7);
    M.vis($('#afP'), t, wt('B5', 'one') - 0.1, 1e9, POP);
    aChip.forEach((d, i) => M.vis(d, t, wt('B5', i ? 'fast' : 'stops') - 0.1, 1e9, POP));
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('Z1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    PUC.write($('#simF'), t, wt('S2', 'position') - 0.05, 0.8);
    const u = simT(t), x = u * u, bx = SX0 + x * PXM;
    bS.set(bx, SY, 1, 1, x / 1.0);
    const moving = t > tGo && (t < tGo + 5 || (t > tRep + 0.35 && t < tFrz));
    ghS.forEach((b, k) => { const uu = Math.max(0, u - 0.25 * (k + 1)); b.set(SX0 + uu * uu * PXM, SY, 1, 1, uu * uu); b.g.style.opacity = moving && u - uu > 0.05 ? [0.3, 0.2, 0.12][k] : 0; });
    GAPS.forEach((g, k) => { g.style.opacity = M.clamp((t - tGap[k]) / 0.25) * (1 - M.clamp((t - tRep + 0.3) / 0.3)); });
    gapL.style.opacity = M.clamp((t - tGap[0]) / 0.25) * (1 - M.clamp((t - tRep + 0.3) / 0.3));
    M.setT($('#rt'), u.toFixed(2)); M.setT($('#rx'), x.toFixed(2)); M.setT($('#rvb'), u > 0.005 ? (x / u).toFixed(2) : '0.00');
    gC(k => [k, k * k], 0, u); gD(u, x, t > tGo - 0.3);
    const fr = t >= tFrz;
    M.vis($('#slow'), t, tRep, T0('Z1') - 0.4, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    const va = M.io((t - tFrz - 0.15) / 0.6); vS.set(bx + 50, SY - 70, bx + 50 + 4 * 24 * va, SY - 70);
    attr(vSl, 'x', (bx + 40).toFixed(1)); attr(vSl, 'y', SY - 92); vSl.style.opacity = fr ? M.clamp((t - wt('S5', 'fast')) / 0.3) : 0;
    avA(t, wt('S5', 'instant') - 0.1, out);
  }

  /* Z: shrink the gap */
  const zOn = t >= tZ1 - 0.1 && t < tD1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('D1');
    M.vis($('#zt'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#zg'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    ZR.forEach((_, i) => { const el = $('#zr' + i); M.vis(el, t, tZr[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, '#EDE6FB', M.io((t - tZr[i]) / 0.3) * (i < 4 ? 1 - M.io((t - tZr[i + 1]) / 0.3) : 1)); });
    M.vis($('#zr5'), t, wt('Z5', 'Four', 1) - 0.1, 1e9, POP);
    zC(k => [k, k * k], 0, 4.47);
    const dt = Math.pow(10, zLg(t)), b = 2 + dt, sl = (b * b - 4) / dt, tg = M.io((t - tTan + 0.1) / 0.6);
    const ext = 0.6;
    line(zCh, zg, 2 - ext, 4 - sl * ext, Math.min(4.5, b + ext * 0.5), Math.min(20, 4 + sl * (Math.min(4.5, b + ext * 0.5) - 2)));
    zCh.style.opacity = (1 - tg * 0.85).toFixed(3);
    zP(2, 4, true); zQ(b, b * b, tg < 0.5);
    M.drawU(zTg, tg); tangent(zTg, zg, 2, 4, 4, 1.2);
    M.vis($('#zch'), t, tZ1 + 0.6, 1e9, POP);
    M.setT($('#zchK'), tg > 0.5 ? 'tangent' : 'chord'); M.setT($('#zchV'), (tg > 0.5 ? 4 : sl).toFixed(2));
    $('#zch').style.color = tg > 0.5 ? VC : BC; $('#zch').style.borderColor = tg > 0.5 ? VC : BC;
    avZ(t, wt('Z5', 'close') - 0.1, out);
  }

  /* D: the rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    dC(k => [k, k * k], 0, 4.47);
    const dt = Math.pow(10, dLg(t)), b = 2 + dt, on = M.clamp((t - tStep[0]) / 0.3);
    line(dTx, dg, 2, 4, b, 4); line(dTy, dg, b, 4, b, b * b); line(dCh, dg, 2, 4, b, b * b);
    [dTx, dTy, dCh].forEach(e => e.style.opacity = (on * (1 - M.clamp((t - tStep[2]) / 0.4) * 0.9)).toFixed(3));
    attr(dLt, 'x', ((dg.X(2) + dg.X(b)) / 2 - 14).toFixed(1)); attr(dLt, 'y', (dg.Y(4) + 32).toFixed(1));
    attr(dLx, 'x', (dg.X(b) + 10).toFixed(1)); attr(dLx, 'y', ((dg.Y(4) + dg.Y(b * b)) / 2 + 8).toFixed(1));
    const lo = on * (1 - M.clamp((t - tStep[1] - 0.6) / 0.4)); dLt.style.opacity = lo; dLx.style.opacity = lo;
    const tg = M.io((t - tStep[2]) / 0.6); M.drawU(dTg, tg); tangent(dTg, dg, 2, 4, 4, 1.4);
    attr(dLs, 'x', dg.X(2.5).toFixed(1)); attr(dLs, 'y', dg.Y(4) + 6); dLs.style.opacity = M.clamp((t - wt('D5', 'four') + 0.1) / 0.3);
    dP(2, 4, t > tStep[0] - 0.2);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'chord') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'tangent') - 0.2, 0.9);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kC(k => [k, k * k], 0, 5);
    const c1 = M.io((t - wt('K1', 'interval') + 0.1) / 0.5); line(kCh, kg, 1, 1, 1 + 3 * c1, 1 + 15 * c1); kCh.style.opacity = c1 > 0 ? 1 : 0;
    kP1(1, 1, c1 > 0); kP2(4, 16, c1 > 0.95); kT1.style.opacity = c1; kT2.style.opacity = M.clamp((c1 - 0.9) * 10);
    PUC.write($('#kbF'), t, wt('K1', 'Total') - 0.1, 0.8); M.vis($('#kbC'), t, wt('K1', 'time') + 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const sp = 18 + 6 * Math.sin((t - T0('K2')) * 1.3), a = Math.PI * (1 - sp / 40);
    kN.set(GX0, GY0, GX0 + Math.cos(a) * (GR - 30), GY0 - Math.sin(a) * (GR - 30)); M.setT(kNv, sp.toFixed(0) + ' km/h');
    PUC.write($('#kdF'), t, wt('K2', 'instant') - 0.1, 0.8); M.vis($('#kdC'), t, wt('K2', 'speedometer') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'What') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'ends') });
  }

  /* G: reading the x-t graph */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G4');
    M.vis($('#gg'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#gr2'), t, tG1 + 0.25, out, { dx: 60, dy: 0, ...o });
    const u = gT(t), x = xg(u), v = vg(u);
    ggC(k => [k, xg(k)], 0, 8); tangent(ggT, gg, u, x, v, 0.9); ggD(u, x, true);
    M.setT($('#gchV'), v.toFixed(1));
    const bx = GRX0 + x * GPX; bG.set(bx, GRY, 1, v >= 0 ? 1 : -1, x);
    const mv = t > tGs && t < T1('G3') + 0.3 && !(t > T1('G2') + 0.2 && t < T0('G3'));
    ghG.forEach((b, k) => { const uu = Math.max(0, gT(t - 0.15 * (k + 1))), xx = xg(uu); b.set(GRX0 + xx * GPX, GRY, 1, vg(uu) >= 0 ? 1 : -1, xx); b.g.style.opacity = mv && Math.abs(xx - x) > 0.1 ? [0.3, 0.2, 0.12][k] : 0; });
    vG.set(bx, GRY - 76, bx + v * 18, GRY - 76);
    M.setT($('#gt'), u.toFixed(2)); M.setT($('#gx'), x.toFixed(2)); M.setT($('#gv'), v.toFixed(2));
    M.vis($('#th2'), t, tG4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG4, tOpts: wt('G4', 'What') - 0.1, tCount: T1('G4') + 0.05, dur: 3, tAns: T0('G5') - 0.02, tWhy: wt('G5', 'tangent') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wC(k => [k, xw(k)], 0, 2.4 * M.o3((t - T0('W2') - 0.4) / 1.2));
    const c = M.io((t - tW[1] + 0.1) / 0.5); line(wCh, wg, 0, 0, 2 * c, 20 * c); wCh.style.opacity = c > 0 ? 1 : 0;
    wP0(0, 0, c > 0); wP2(2, 20, t > tW[0]); wL1.style.opacity = M.clamp((t - wt('W4', 'Ten')) / 0.3);
    const tg = M.io((t - wt('W6', 'eighteen') + 0.2) / 0.6); M.drawU(wTg, tg); tangent(wTg, wg, 2, 20, 18, 0.45);
    wL2.style.opacity = M.clamp((t - wt('W6', 'eighteen') - 0.2) / 0.3);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'mean') - 0.1, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'Twelve') - 0.1 });
    tbr.forEach((g, i) => { g.style.opacity = M.clamp((t - wt('X3', i ? 'slow' : 'spends') + 0.1) / 0.3); });
    tbT.style.opacity = M.clamp((t - wt('X3', 'Twelve') + 0.1) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Given') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
