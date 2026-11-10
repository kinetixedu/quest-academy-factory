// PUC Physics Ep 94: Motion of the centre of mass (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, XC = C.violet, MC = C.ink, TC = C.gold, IC = C.ink;   // v blue, a red, F orange, position violet
const PA = '#2E3A5C', PB = '#7A8AAE', SKY = '#1B2440', FEST = '#F2C14E';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const cmM = (p, r = 15, ring = IC, fill = '#fff') => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill, stroke: ring, 'stroke-width': r > 10 ? 4 : 3 }); mk(g, 'path', { d: `M${-r + 3.5},0 H${r - 3.5} M0,${-r + 3.5} V${r - 3.5}`, stroke: TC, 'stroke-width': r > 10 ? 4 : 3, 'stroke-linecap': 'round' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
// the rocket and its two halves: launch 10 m/s across, 19.6 m/s up, g = 9.8; bursts at the top (t = 2 s)
const G = 9.8, UX = 10, UY = 19.6;
const rk = tau => { const tb = Math.min(tau, 2), y0 = UY * tb - 0.5 * G * tb * tb; if (tau <= 2) return { c: [UX * tau, y0], a: [UX * tau, y0], b: [UX * tau, y0], v: [UX, UY - G * tau], burst: false };
  const s = tau - 2, y = 19.6 - 0.5 * G * s * s; return { c: [UX * tau, UY * tau - 0.5 * G * tau * tau], a: [20, y], b: [20 + 20 * s, y], va: [0, -G * s], vb: [20, -G * s], burst: true }; };
const rocketG = (p, col, s = 1) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'rect', { x: -16 * s, y: -6 * s, width: 22 * s, height: 12 * s, rx: 3 * s, fill: col, stroke: IC, 'stroke-width': 2 }); mk(g, 'path', { d: `M${6 * s},${-6 * s} L${18 * s},0 L${6 * s},${6 * s} Z`, fill: col, stroke: IC, 'stroke-width': 2 }); return { o, g }; };
const halfG = (p, col, front, s = 1) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); if (front) { mk(g, 'rect', { x: -6 * s, y: -6 * s, width: 10 * s, height: 12 * s, rx: 2, fill: col, stroke: IC, 'stroke-width': 2 }); mk(g, 'path', { d: `M${4 * s},${-6 * s} L${16 * s},0 L${4 * s},${6 * s} Z`, fill: col, stroke: IC, 'stroke-width': 2 }); } else mk(g, 'rect', { x: -10 * s, y: -6 * s, width: 20 * s, height: 12 * s, rx: 3 * s, fill: col, stroke: IC, 'stroke-width': 2 }); return { o, g }; };
const place = (q, x, y, ang = 0) => attr(q.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)})`);

Object.assign(M.IC, {
  diver: ['M12 4a2 2 0 1 0 0 .1', 'M5 12c3-3 11-3 14 0', 'M12 8v8', 'M8 21l4-5 4 5'],
  hammer: ['M14 4l6 6-3 3-6-6z', 'M11 7l-8 8 3 3 8-8'],
  rocket: ['M12 2c3 3 4 7 3 12h-6C8 9 9 5 12 2Z', 'M9 14l-3 4h12l-3-4', 'M12 18v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS2 = T0('S2'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10'), tS11 = T0('S11');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['diver', 'A diver', 'FLIPS OFF A BOARD'], ['hammer', 'A thrown hammer', 'SPINS IN THE AIR'], ['rocket', 'A festival rocket', 'BURSTS INTO PIECES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'diver'), wt('H1', 'hammer'), wt('H1', 'rocket')];
$('#jrs').innerHTML = JOBS.map(([, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="330" height="120"></svg></div>`).join('');
const JP = u => [30 + 270 * u, 104 - 320 * u * (1 - u)];
const jm = [0, 1, 2].map(i => { const sv = $('#jsv' + i); let d = ''; for (let k = 0; k <= 30; k++) { const p = JP(k / 30); d += (k ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); } mk(sv, 'path', { d, fill: 'none', stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
  const o = mk(sv, 'g', {}); let a = null, b = null;
  if (i === 0) { mk(o, 'rect', { x: -20, y: -6, width: 40, height: 12, rx: 6, fill: PB, stroke: IC, 'stroke-width': 2 }); mk(o, 'circle', { cx: 24, cy: 0, r: 6, fill: PB, stroke: IC, 'stroke-width': 2 }); }
  if (i === 1) { mk(o, 'line', { x1: -28, y1: 0, x2: 12, y2: 0, stroke: '#9B5B45', 'stroke-width': 5, 'stroke-linecap': 'round' }); mk(o, 'rect', { x: 8, y: -12, width: 14, height: 24, rx: 3, fill: PA, stroke: IC, 'stroke-width': 2 }); }
  if (i === 2) { a = halfG(sv, PA, false, 0.8); b = halfG(sv, PB, true, 0.8); }
  const c = cmM(sv, 7); return { sv, o, a, b, c }; });
const hs = $('#hkS'), HO = [250, 452], HPX = 7.5, hp = (x, y) => [HO[0] + HPX * x, HO[1] - HPX * y];
mk(hs, 'rect', { x: 36, y: 76, width: 712, height: 398, rx: 12, fill: SKY });
for (let k = 0; k < 26; k++) { const r = M.rng(k + 7); mk(hs, 'circle', { cx: (50 + r() * 690).toFixed(0), cy: (90 + r() * 250).toFixed(0), r: (1 + r() * 1.6).toFixed(1), fill: '#fff', opacity: 0.6 }); }
mk(hs, 'line', { x1: 36, y1: HO[1] + 4, x2: 748, y2: HO[1] + 4, stroke: '#5B6B8C', 'stroke-width': 4 });
const hTr = mk(hs, 'path', { fill: 'none', stroke: FEST, 'stroke-width': 2.5, 'stroke-dasharray': '4 5', opacity: 0.8 }), hTa = mk(hs, 'path', { fill: 'none', stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '3 5', opacity: 0.6 }), hTb = mk(hs, 'path', { fill: 'none', stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '3 5', opacity: 0.6 });
const hTc = mk(hs, 'path', { fill: 'none', stroke: FEST, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const hR = rocketG(hs, FEST, 0.9), hA = halfG(hs, '#fff', false, 0.9), hB = halfG(hs, FEST, true, 0.9), hC = cmM(hs, 11, '#fff', SKY);
const hFl = mk(hs, 'g', {}); for (let k = 0; k < 8; k++) mk(hFl, 'line', { x1: 0, y1: 0, x2: 26 * Math.cos(k * Math.PI / 4), y2: 26 * Math.sin(k * Math.PI / 4), stroke: FEST, 'stroke-width': 3, 'stroke-linecap': 'round' });
const tHb = wt('H3', 'bursts'), tHl = tHb - 2;
const pathD = (f, a, b, P, n = 40) => { if (b - a < 0.01) return ''; let d = ''; for (let k = 0; k <= n; k++) { const s = a + (b - a) * k / n, q = P(...f(s)); d += (k ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } return d; };

/* ---------- P ---------- */
const ps = $('#pqS'); $('#pq').insertAdjacentHTML('beforeend', '<div class="ghost" id="exP" style="right:36px;top:18px">EXAMPLE FIGURES</div>');
const PP1 = [150, 180], PP2 = [520, 230], PCM = [(PP1[0] + 3 * PP2[0]) / 4, (PP1[1] + 3 * PP2[1]) / 4], PV = 34;
const pb1 = mk(ps, 'circle', { cx: PP1[0], cy: PP1[1], r: 20, fill: PB, stroke: IC, 'stroke-width': 2.5 }), pb2 = mk(ps, 'circle', { cx: PP2[0], cy: PP2[1], r: 29, fill: PA, stroke: IC, 'stroke-width': 2.5 });
const pv1 = PUC.arrow(ps, VC, 5, 16), pv2 = PUC.arrow(ps, VC, 5, 16), pvC = PUC.arrow(ps, VC, 6, 18);
const pl = [txt(ps, PP1[0], PP1[1] + 54, '1 kg · 4 m/s →', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700 }), txt(ps, PP2[0], PP2[1] + 62, '3 kg · 2 m/s ↑', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700 })];
const pC = cmM(ps, 13); pC.set(...PCM); const pVl = txt(ps, PCM[0] - 200, PCM[1] - 64, 'V = (1, 1.5) m/s', { fill: VC, 'font-weight': 700, 'font-size': 20 });
$('#pqF1').innerHTML = K(`${tc(VC, '\\vec V')} = \\dfrac{\\sum m_i ${tc(VC, '\\vec v_i')}}{M}`); $('#pqF2').innerHTML = K(`${tc(AC, '\\vec A')} = \\dfrac{\\sum m_i ${tc(AC, '\\vec a_i')}}{M}`);
$('#pqF2').style.left = '400px'; $('#pqF2').style.top = '330px';
$('#pmF').innerHTML = K(`${tc(MC, 'M')}\\,${tc(AC, '\\vec A')} = ${tc(FC, '\\vec F_{\\text{ext}}')}`, true);

/* ---------- S: the sim ---------- */
const s = $('#simS'), SO = [64, 450], SPX = 11, sp = (x, y) => [SO[0] + SPX * x, SO[1] - SPX * y];
mk(s, 'line', { x1: 36, y1: SO[1] + 4, x2: 748, y2: SO[1] + 4, stroke: IC, 'stroke-width': 3 }); for (let x = 48; x < 748; x += 28) mk(s, 'line', { x1: x, y1: SO[1] + 8, x2: x - 14, y2: SO[1] + 22, stroke: C.dim, 'stroke-width': 2 });
[0, 20, 40, 60].forEach(x => { const q = sp(x, 0); mk(s, 'line', { x1: q[0], y1: q[1] + 4, x2: q[0], y2: q[1] + 30, stroke: IC, 'stroke-width': 2 }); txt(s, q[0], q[1] + 54, x + ' m', { 'text-anchor': 'middle', fill: IC, 'font-weight': 600 }); });
const sPred = mk(s, 'path', { d: pathD(t => rk(t).c, 0, 4, sp), fill: 'none', stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '3 7', opacity: 0 });
const sTr = mk(s, 'path', { fill: 'none', stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.5 }), sTa = mk(s, 'path', { fill: 'none', stroke: PA, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.55 }), sTb = mk(s, 'path', { fill: 'none', stroke: PB, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.8 });
const sTc = mk(s, 'path', { fill: 'none', stroke: XC, 'stroke-width': 4 });
const sGh = [0, 1, 2].map(() => [mk(s, 'circle', { r: 9, fill: PA, opacity: 0 }), mk(s, 'circle', { r: 9, fill: PB, opacity: 0 })]);
const sR = rocketG(s, PB, 1.3), sA = halfG(s, PA, false, 1.3), sB = halfG(s, PB, true, 1.3), sC = cmM(s, 14);
const sVr = PUC.arrow(s, VC, 5, 16), sVa = PUC.arrow(s, VC, 5, 16), sVb = PUC.arrow(s, VC, 5, 16), SVS = 3.2;
const sVx = PUC.arrow(s, VC, 4, 13), sVy = PUC.arrow(s, VC, 4, 13), sVxl = txt(s, 0, 0, '10 m/s', { fill: VC, 'font-weight': 700, 'font-size': 18 }), sVyl = txt(s, 0, 0, '19.6 m/s', { fill: VC, 'font-weight': 700, 'font-size': 18 });
const sFa = PUC.arrow(s, FC, 6, 18), sFb = PUC.arrow(s, FC, 6, 18), sFal = txt(s, 0, 0, '−F', { fill: FC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' }), sFbl = txt(s, 0, 0, 'F', { fill: FC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
const sMg = PUC.arrow(s, FC, 6, 18), sMgl = txt(s, 0, 0, 'Mg', { fill: FC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
const sLand = [20, 40, 60].map((x, i) => txt(s, sp(x, 0)[0], SO[1] - 14 - (i === 1 ? 26 : 0), ['A', 'centre', 'B'][i], { 'text-anchor': 'middle', fill: i === 1 ? XC : IC, 'font-weight': 700, 'font-size': 18 }));
const tL = wt('S3', 'bursts') - 2, tS4a = wt('S4', 'One'), tFz = wt('S6', 'Freeze') + 0.05;
function state(t) {
  if (t < tL) return { tau: 0, pad: true };
  if (t < tS4a) return { tau: Math.min(t - tL, 2) };
  if (t < tS5) return { tau: 2 + M.clamp(t - tS4a, 0, 2) };
  if (t < tS6) return { tau: 2 + M.clamp(t - tS5 - 0.4, 0, 2), replay5: true };
  if (t < tFz) return { tau: 2 - 0.25 * (tFz - t), slow: true };
  if (t < tS9) return { tau: 2, frozen: true };
  return { tau: 2 + M.clamp(t - tS9 - 0.2, 0, 2) };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${XC}">X</span><span class="v" id="r_X" style="color:${XC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${XC}">Y</span><span class="v" id="r_Y" style="color:${XC}">0.00</span><span class="u">m</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${AC}">A<sub>x</sub></span><span class="v" id="r_ax" style="color:${AC}">0.00</span><span class="u">m/s²</span>
  <span class="k" style="color:${AC}">A<sub>y</sub></span><span class="v" id="r_ay" style="color:${AC}">-9.80</span><span class="u">m/s²</span>
  <span class="k" style="font-style:normal;font-size:22px;color:${C.mute}">pieces</span><span class="v" id="r_n">1</span><span class="u"></span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 60, ymin: 0, ymax: 20, xt: [0, 20, 40, 60], yt: [0, 10, 20], xl: 'x (m)' });
txt(gs, 122, 78, 'y (m)', { 'font-size': 18 });
const gGP = (x, y) => [g.X(x), g.Y(y)];
const gPa = mk(gs, 'path', { fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '5 5' }), gPb = mk(gs, 'path', { fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '5 5' });
const gC = mk(gs, 'path', { fill: 'none', stroke: XC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gDt = g.dot(XC, 10);
$('#leg').innerHTML = [[XC, '', 'centre of mass'], [C.dim, '5 5', 'pieces']].map(([c, d, n]) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="4" stroke-dasharray="${d}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 496, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'The centre did not even notice the burst!' });
const th1 = PUC.think($('#th1'), { q: 'One piece hits the ground before the other. Does the centre of mass still follow the parabola after that?', opts: ['Yes, it does', 'No, it leaves it'], right: 1, why: 'The ground pushes that piece: a new outside force.' });

/* ---------- D ---------- */
const Xs = tc(XC, 'X'), Vv = tc(VC, '\\vec V'), Av = tc(AC, '\\vec A'), Fe = tc(FC, '\\vec F_{\\text{ext}}');
const ST = [[`M${Xs} = \\sum m_i ${tc(XC, 'x_i')}`, 'definition, for every particle'],
  [`M${Vv} = \\sum m_i ${tc(VC, '\\vec v_i')} \\;\\Rightarrow\\; M${Av} = \\sum m_i ${tc(AC, '\\vec a_i')}`, 'how fast each side changes'],
  [`m_i ${tc(AC, '\\vec a_i')} = ${tc(FC, '\\vec F_{i,\\text{ext}}')} + ${tc(FC, '\\vec F_{i,\\text{int}}')}`, 'outside + inside forces'],
  [`\\sum ${tc(FC, '\\vec F_{\\text{int}}')} = 0 \\;\\Rightarrow\\; M${Av} = ${Fe}`, 'pairs cancel · kg m/s² = N']];
const SY = [84, 192, 300, 408];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + ST.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'definition'), wt('D3', 'fast'), wt('D4', 'particle'), wt('D5', 'Inside')];
const dp = $('#dpS'), DA = [150, 210], DB = [374, 210];
const dBa = mk(dp, 'circle', { cx: DA[0], cy: DA[1], r: 24, fill: PA, stroke: IC, 'stroke-width': 2.5 }), dBb = mk(dp, 'circle', { cx: DB[0], cy: DB[1], r: 24, fill: PB, stroke: IC, 'stroke-width': 2.5 });
const dFa = PUC.arrow(dp, FC, 6, 18), dFb = PUC.arrow(dp, FC, 6, 18); dFa.set(DA[0] - 26, DA[1], DA[0] - 126, DA[1]); dFb.set(DB[0] + 26, DB[1], DB[0] + 126, DB[1]);
const dFl = [txt(dp, DA[0] - 80, DA[1] - 20, '−F', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 }), txt(dp, DB[0] + 80, DB[1] - 20, 'F', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 22 })];
const dSum = txt(dp, 262, 290, 'F + (−F) = 0', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 22 });
const dX = mk(dp, 'path', { d: 'M40,180 L140,240 M384,180 L484,240', stroke: C.red, 'stroke-width': 0, opacity: 0 });
const dC = cmM(dp, 13); dC.set(262, DA[1]); const dE = PUC.arrow(dp, FC, 7, 20); dE.set(262, DA[1] + 20, 262, DA[1] + 150); const dEl = txt(dp, 280, DA[1] + 110, 'F ext only', { fill: FC, 'font-weight': 700, 'font-size': 20 });
const dEg = mk(dp, 'g', {}); [dE.g, dEl].forEach(e => dEg.appendChild(e));

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`M${Av} = ${Fe}`);

/* ---------- R ---------- */
const LK = [['The burst: pieces push on each other', 'INTERNAL'], ['Each push has an opposite partner', 'THIRD LAW'], ['They add to zero: only Mg is left', 'SAME PARABOLA']];
$('#lks').innerHTML = LK.map(([h, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="lt">${h}</div><div class="tg" style="background:${i === 2 ? C.ink : '#FBEBDD'};color:${i === 2 ? '#fff' : FC}">${tg}</div></div>`).join('') +
  `<div class="pillp" id="rP" style="left:36px;top:420px">Inside forces cannot move the centre of mass</div>`;
const tLk = [wt('R2', 'burst'), wt('R3', 'Every'), wt('R4', 'zero')];
const rr = $('#rrS'), RA = [300, 240], RB = [484, 240];
const rHa = halfG(rr, PA, false, 3), rHb = halfG(rr, PB, true, 3); place(rHa, RA[0], RA[1]); place(rHb, RB[0], RB[1]);
const rFa = PUC.arrow(rr, FC, 7, 20), rFb = PUC.arrow(rr, FC, 7, 20); rFa.set(RA[0] - 36, RA[1], RA[0] - 176, RA[1]); rFb.set(RB[0] + 52, RB[1], RB[0] + 192, RB[1]);
const rFl = [txt(rr, RA[0] - 106, RA[1] - 24, 'push on A', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 19 }), txt(rr, RB[0] + 122, RB[1] - 24, 'push on B', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 19 })];
const rEq = txt(rr, 392, 150, 'equal size, opposite way', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 21 });
const rW = [PUC.arrow(rr, FC, 5, 16), PUC.arrow(rr, FC, 5, 16)]; rW[0].set(RA[0], RA[1] + 26, RA[0], RA[1] + 116); rW[1].set(RB[0], RB[1] + 26, RB[0], RB[1] + 116);
const rWl = [txt(rr, RA[0] + 12, RA[1] + 100, 'Mg/2', { fill: FC, 'font-weight': 700, 'font-size': 19 }), txt(rr, RB[0] + 12, RB[1] + 100, 'Mg/2', { fill: FC, 'font-weight': 700, 'font-size': 19 })];
const rSum = txt(rr, 392, 420, 'sum of forces = Mg, as before', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 21 });
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'So the pieces scatter, but the centre stays calm.' });

/* ---------- K ---------- */
const KO = [70, 420], KPX = 10, kp = (x, y) => [KO[0] + KPX * x, KO[1] - KPX * y];
const KV = ['#ktS', '#krS'].map((id, i) => { const sv = $(id); mk(sv, 'line', { x1: 36, y1: KO[1] + 4, x2: 748, y2: KO[1] + 4, stroke: IC, 'stroke-width': 3 });
  [0, 20, 40, 60].forEach(x => txt(sv, kp(x, 0)[0], KO[1] + 34, x + ' m', { 'text-anchor': 'middle', fill: IC, 'font-weight': 600 }));
  const tr = mk(sv, 'path', { fill: 'none', stroke: i ? XC : IC, 'stroke-width': i ? 4 : 2.5, 'stroke-dasharray': i ? '' : '5 6', opacity: i ? 1 : 0.6 }), ta = mk(sv, 'path', { fill: 'none', stroke: PA, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.6 }), tb = mk(sv, 'path', { fill: 'none', stroke: PB, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0.8 });
  const R = rocketG(sv, PB, 1.2), A = halfG(sv, PA, false, 1.2), B = halfG(sv, PB, true, 1.2), c = cmM(sv, 12); const fl = mk(sv, 'circle', { cx: kp(40, 0)[0], cy: KO[1], r: 10, fill: C.ok }); return { sv, tr, ta, tb, R, A, B, c, fl, i }; });
$('#ktP').innerHTML = `${M.icon('check', 26, C.ok, 3)}The rocket lands at 40 m`;
$('#krP').innerHTML = `${M.icon('check', 26, C.ok, 3)}The centre still lands at 40 m`;
const th2 = PUC.think($('#th2'), { q: 'Aarav walks along a boat on still water, with no water drag. Does the centre of mass of Aarav and the boat move?', opts: ['Yes, forward', 'No, it stays'], right: 1, why: 'Feet and boat push each other: internal. The boat slides back.' });
$('#th2 .tq').style.width = '1140px';

/* ---------- W ---------- */
$('#wkq').innerHTML = 'Blocks of 2 kg and 3 kg sit on smooth ice with a squeezed spring between them. A 10 N push acts on the 2 kg block. Find the acceleration of the centre of mass.';
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{spring: internal} \\Rightarrow ${tc(FC, 'F_{\\text{ext}}')} = 10\\,\\text{N}`)],
  [K(`${tc(AC, 'A')} = \\tfrac{${tc(FC, 'F_{\\text{ext}}')}}{M} = \\tfrac{10}{5} = ${tc(AC, '2\\,\\text{m/s}^2')}`)],
  [K(`M${tc(AC, 'A')} = m_1${tc(AC, 'a_1')} + m_2${tc(AC, 'a_2')}`)],
  [K(`10 = 2(3.5) + 3${tc(AC, 'a_2')} \\Rightarrow ${tc(AC, 'a_2')} = ${tc(AC, '1\\,\\text{m/s}^2')}`)]], { label: 'WORKED EXAMPLE', y0: 230, dy: 88 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY = 380;
mk(w, 'rect', { x: 36, y: WY, width: 712, height: 40, fill: '#E3EEF9' }); mk(w, 'line', { x1: 36, y1: WY, x2: 748, y2: WY, stroke: IC, 'stroke-width': 3 });
const W1 = [190, 90, 70], W2 = [430, 110, 84];
mk(w, 'rect', { x: W1[0], y: WY - W1[2], width: W1[1], height: W1[2], rx: 6, fill: PB, stroke: IC, 'stroke-width': 2.5 }); txt(w, W1[0] + W1[1] / 2, WY - W1[2] / 2 + 7, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 });
mk(w, 'rect', { x: W2[0], y: WY - W2[2], width: W2[1], height: W2[2], rx: 6, fill: PA, stroke: IC, 'stroke-width': 2.5 }); txt(w, W2[0] + W2[1] / 2, WY - W2[2] / 2 + 7, '3 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 });
{ let d = `M${W1[0] + W1[1]},${WY - 35}`; const n = 8, x0 = W1[0] + W1[1], L = W2[0] - x0; for (let k = 1; k <= n; k++) d += ` L${(x0 + L * (k - 0.5) / n).toFixed(1)},${WY - 35 + (k % 2 ? -14 : 14)}`; d += ` L${W2[0]},${WY - 35}`; mk(w, 'path', { d, fill: 'none', stroke: IC, 'stroke-width': 2.5 }); }
const wPush = PUC.arrow(w, FC, 7, 20); wPush.set(60, WY - 35, W1[0] - 6, WY - 35); const wPl = txt(w, 70, WY - 54, '10 N push', { fill: FC, 'font-weight': 700, 'font-size': 20 });
const wIn = mk(w, 'g', {}); { const a = PUC.arrow(wIn, FC, 4, 13), b = PUC.arrow(wIn, FC, 4, 13); a.set(W1[0] + W1[1] - 8, WY - 92, W1[0] + W1[1] - 58, WY - 92); b.set(W2[0] + 8, WY - 104, W2[0] + 58, WY - 104); txt(wIn, (W1[0] + W1[1] + W2[0]) / 2, WY - 128, 'spring: internal, cancels', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 17 }); }
const WXc = (2 * (W1[0] + W1[1] / 2) + 3 * (W2[0] + W2[1] / 2)) / 5, wC = cmM(w, 13); wC.set(WXc, WY + 70);
const wA = PUC.arrow(w, AC, 6, 18), wAl = txt(w, WXc + 10, WY + 112, 'A = 2 m/s²', { fill: AC, 'font-weight': 700, 'font-size': 20 });
const wa1 = PUC.arrow(w, AC, 5, 16), wa2 = PUC.arrow(w, AC, 5, 16), wa1l = txt(w, W1[0], WY - W1[2] - 40, 'a₁ = 3.5', { fill: AC, 'font-weight': 700, 'font-size': 19 }), wa2l = txt(w, W2[0], WY - W2[2] - 40, 'a₂ = 1', { fill: AC, 'font-weight': 700, 'font-size': 19 });
const tW = [wt('W3', 'Only'), wt('W4', 'over'), wt('W6', 'M'), wt('W6', 'equals', 1)];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A burst knocks the centre of mass off its curve', right: 'Internal forces cancel: it keeps its parabola' });
const tp = $('#tpS'), TO = [40, 230], TPX = 8, tq = (x, y) => [TO[0] + TPX * x, TO[1] - TPX * y];
mk(tp, 'line', { x1: 20, y1: TO[1] + 2, x2: 620, y2: TO[1] + 2, stroke: IC, 'stroke-width': 2.5 });
mk(tp, 'path', { d: pathD(t => rk(t).c, 0, 2, tq), fill: 'none', stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' });
const tWr = mk(tp, 'path', { d: pathD(t => [20 + 14 * (t - 2), 19.6 + 6 * (t - 2) - 4.9 * (t - 2) * (t - 2)], 2, 4.2, tq), fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const tRt = mk(tp, 'path', { d: pathD(t => rk(t).c, 2, 4, tq), fill: 'none', stroke: C.ok, 'stroke-width': 4 });
const tFl = mk(tp, 'g', {}); for (let k = 0; k < 8; k++) { const q = tq(20, 19.6); mk(tFl, 'line', { x1: q[0], y1: q[1], x2: q[0] + 18 * Math.cos(k * Math.PI / 4), y2: q[1] + 18 * Math.sin(k * Math.PI / 4), stroke: FEST, 'stroke-width': 3, 'stroke-linecap': 'round' }); }
const tWl = txt(tp, tq(42, 14)[0], tq(42, 14)[1], 'off the curve?', { fill: C.red, 'font-weight': 700, 'font-size': 18 }), tRl = txt(tp, tq(36, 8)[0] - 10, tq(36, 8)[1], 'same parabola', { 'text-anchor': 'end', fill: C.ok, 'font-weight': 700, 'font-size': 18 });
const where = PUC.where($('#wa'), { on: [], type: 'Shells that burst in flight, and people walking on boats or planks' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 3 kg shell has a range of 60 m. At the top it splits into 2 kg and 1 kg. The 2 kg piece falls straight down. Where does the 1 kg piece land?', qW: 780,
  opts: ['90 m', '120 m', '150 m', '180 m'], right: 1, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`\\text{land together} \\Rightarrow ${Xs} = 60\\,\\text{m}`)], [K(`2\\,\\text{kg lands at } ${tc(XC, '30\\,\\text{m}')}`)],
  [K(`60 = \\tfrac{2(30) + 1\\cdot ${tc(XC, 'x')}}{3}`)], [K(`${tc(XC, 'x')} = ${tc(XC, '120\\,\\text{m}')}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '25px');
const tSo = [wt('A2', 'Both'), wt('A3', 'two'), wt('A4', 'Sixty'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 550, title: 'Recap · motion of the centre of mass', y0: 96, dy: 94, txt: [0, 0, 1, 1, 1],
  lines: [K(`${Vv} = \\tfrac{\\sum m_i ${tc(VC, '\\vec v_i')}}{M}`), K(`M${Av} = ${Fe}`), '<b>Internal forces</b> cancel in pairs (third law)', '<b>Burst in flight</b>: the centre keeps the same parabola', '<b>Until</b> a piece hits the ground: a new outside force'] });
const YQ = ['Why can inside forces not change how the centre of mass moves?', 'A shell bursts at its top. What path does its centre of mass follow?', 'When does the centre of mass leave the parabola?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 95', topic: 'Two skaters push apart: why does total momentum stay zero?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.05, 1.06, 960, 540], [tS9 + 0.2, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const angOf = v => -Math.atan2(v[1], v[0]) * 180 / Math.PI;
// draw the rocket / halves at time tau on a view (P = projection), returns the state
function drawRk(tau, P, R, A, B, c, tr, ta, tb, tcm) {
  const k = rk(tau), burst = k.burst;
  M.hide(R.o, burst); M.hide(A.o, !burst); M.hide(B.o, !burst);
  if (!burst) { const q = P(...k.c); place(R, q[0], q[1], angOf([k.v[0], k.v[1]])); }
  else { const qa = P(...k.a), qb = P(...k.b); place(A, qa[0] - 8, qa[1], 0); place(B, qb[0] + 8, qb[1], 0); }
  const qc = P(...k.c); c.set(qc[0], qc[1]);
  if (tr) attr(tr, 'd', pathD(x => rk(x).c, 0, Math.min(tau, 2), P));
  if (ta) attr(ta, 'd', burst ? pathD(x => rk(x).a, 2, tau, P, 20) : '');
  if (tb) attr(tb, 'd', burst ? pathD(x => rk(x).b, 2, tau, P, 20) : '');
  if (tcm) attr(tcm, 'd', burst ? pathD(x => rk(x).c, 2, tau, P, 20) : '');
  return k;
}

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
    jm.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const u = (((t - tMorph) / 2.6 + i * 0.33) % 1 + 1) % 1, p = JP(u);
      q.c.set(p[0], p[1]); vis(q.c.o, t, wt('H2', 'single') - 0.1, 1e9, { dy: 0 });
      if (i < 2) attr(q.o, 'transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${(u * 540).toFixed(1)})`);
      else { const sp2 = u < 0.5 ? 0 : 70 * (u - 0.5); place(q.a, p[0] - 7 - sp2, p[1]); place(q.b, p[0] + 7 + sp2, p[1]); } });
    vis($('#hjP'), t, wt('H2', 'smooth') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const tau = M.clamp(t - tHl, 0, 4); drawRk(tau, hp, hR, hA, hB, hC, hTr, hTa, hTb, hTc);
    vis(hR.o, t, tHl - 0.3, 1e9, { dy: 0 }); vis(hC.o, t, wt('H4', 'point') - 0.1, 1e9, { dy: 0 });
    const fb = M.io((t - tHb) / 0.15) * (1 - M.io((t - tHb - 0.6) / 0.4)), qb = hp(20, 19.6); attr(hFl, 'transform', `translate(${qb[0]},${qb[1]}) scale(${(0.4 + 0.8 * fb).toFixed(3)})`); hFl.style.opacity = fb.toFixed(3);
    vis($('#hkQ'), t, wt('H4', 'Which') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#exP'), t, tP1 + 0.5, 1e9, { dy: 8 });
    vis(pb1, t, tP1 + 0.4, 1e9, { dy: 0 }); vis(pb2, t, tP1 + 0.5, 1e9, { dy: 0 }); pl.forEach((e, i) => vis(e, t, tP1 + 0.6 + i * 0.1, 1e9, { dy: 0 }));
    const u = M.o3((t - wt('P1', 'velocity') + 0.1) / 0.5); pv1.set(PP1[0] + 22, PP1[1], PP1[0] + 22 + 4 * PV * u, PP1[1]); pv2.set(PP2[0], PP2[1] - 31, PP2[0], PP2[1] - 31 - 2 * PV * u);
    const uc = M.o3((t - wt('P1', 'Weight') + 0.1) / 0.6); vis(pC.o, t, wt('P1', 'Weight') - 0.2, 1e9, { dy: 0 }); pvC.set(PCM[0], PCM[1], PCM[0] + 1 * PV * uc, PCM[1] - 1.5 * PV * uc); pVl.style.opacity = uc;
    PUC.write($('#pqF1'), t, wt('P2', 'equals') - 0.3, 0.8); PUC.write($('#pqF2'), t, wt('P2', 'Acceleration') - 0.1, 0.8);
    vis($('#pm'), t, tP3 - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#pmF'), t, wt('P3', 'Total') - 0.1, 0.9);
    vis($('#pm0'), t, wt('P3', 'outside') - 0.1, 1e9, POP); vis($('#pm1'), t, wt('P3', 'Inside') - 0.1, 1e9, POP); vis($('#pmP'), t, wt('P3', 'count') + 0.2, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S10'), simIn2 = OUT('S11') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), k = drawRk(S.tau, sp, sR, sA, sB, sC, sTr, sTa, sTb, sTc);
    vis(sR.o, t, tS1 + 0.4, 1e9, { dy: 0 }); vis(sC.o, t, tS1 + 0.6, 1e9, { dy: 0 });
    sPred.style.opacity = (M.io((t - tS2) / 0.6) * 0.8).toFixed(3); M.draw(sPred, t, tS2, 1.2);
    // launch components on the pad
    const uL = S.pad ? M.o3((t - wt('S1', 'ten') + 0.1) / 0.4) : 0, uU = S.pad ? M.o3((t - wt('S1', 'nineteen') + 0.1) / 0.4) : 0, q0 = sp(0, 0);
    sVx.set(q0[0], q0[1] - 4, q0[0] + 10 * SVS * uL, q0[1] - 4); sVy.set(q0[0], q0[1] - 4, q0[0], q0[1] - 4 - 19.6 * SVS * uU);
    attr(sVxl, 'x', q0[0] + 8); attr(sVxl, 'y', q0[1] - 14); sVxl.style.opacity = uL; attr(sVyl, 'x', q0[0] + 12); attr(sVyl, 'y', q0[1] - 50); sVyl.style.opacity = uU;
    const fly = !S.pad && !S.frozen && S.tau < 4 - 1e-6;
    if (!k.burst) { const q = sp(...k.c); sVr.set(q[0], q[1], q[0] + k.v[0] * SVS * (fly ? 1 : 0), q[1] - k.v[1] * SVS * (fly ? 1 : 0)); sVa.set(0, 0, 0, 0); sVb.set(0, 0, 0, 0); }
    else { sVr.set(0, 0, 0, 0); const qa = sp(...k.a), qb = sp(...k.b), m = S.tau < 4 - 1e-6 ? 1 : 0; sVa.set(qa[0], qa[1] + 10, qa[0] + k.va[0] * SVS * m, qa[1] + 10 - k.va[1] * SVS * m); sVb.set(qb[0], qb[1], qb[0] + k.vb[0] * SVS * m, qb[1] - k.vb[1] * SVS * m); }
    sGh.forEach((pair, j) => { const kg = rk(Math.max(0, S.tau - (S.slow ? 0.03 : 0.1) * (j + 1))), qa = sp(...kg.a), qb = sp(...kg.b), qa0 = sp(...k.a), qb0 = sp(...k.b);
      attr(pair[0], 'cx', qa[0].toFixed(1)); attr(pair[0], 'cy', qa[1].toFixed(1)); attr(pair[1], 'cx', qb[0].toFixed(1)); attr(pair[1], 'cy', qb[1].toFixed(1));
      const op = fly && !S.pad ? [0.3, 0.2, 0.12][j] : 0; pair[0].style.opacity = Math.hypot(qa[0] - qa0[0], qa[1] - qa0[1]) > 4 ? op : 0; pair[1].style.opacity = kg.burst && Math.hypot(qb[0] - qb0[0], qb[1] - qb0[1]) > 4 ? op : 0; });
    // freeze: internal pair, then the weight
    const ui = S.frozen ? M.o3((t - wt('S7', 'push') + 0.1) / 0.4) : 0, qt = sp(20, 19.6);
    sFa.set(qt[0] - 18, qt[1] - 30, qt[0] - 18 - 80 * ui, qt[1] - 30); sFb.set(qt[0] + 18, qt[1] - 30, qt[0] + 18 + 80 * ui, qt[1] - 30);
    attr(sFal, 'x', qt[0] - 70); attr(sFal, 'y', qt[1] - 44); sFal.style.opacity = ui; attr(sFbl, 'x', qt[0] + 56); attr(sFbl, 'y', qt[1] - 44); sFbl.style.opacity = ui;
    const um = S.frozen ? M.o3((t - wt('S8', 'outside') + 0.1) / 0.4) : 0; sMg.set(qt[0], qt[1] + 16, qt[0], qt[1] + 16 + 90 * um); attr(sMgl, 'x', qt[0] + 12); attr(sMgl, 'y', qt[1] + 90); sMgl.style.opacity = um;
    sLand.forEach((e, i) => e.style.opacity = (S.tau >= 3.999 && t > tS9 ? M.io((t - wt('S9', ['twenty', 'forty', 'sixty'][i])) / 0.3) : 0).toFixed(3));
    vis($('#smo'), t, tS6 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz, tS9 - 0.1, { ...POP, sc: 0.8 });
    // readout (round t first)
    const tr = Math.round(S.tau * 100) / 100, kr = rk(tr), onG = !S.pad && tr < 4;
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_X'), f2(kr.c[0])); M.setT($('#r_Y'), f2(Math.max(0, kr.c[1]))); M.setT($('#r_ay'), onG ? '-9.80' : '0.00'); M.setT($('#r_n'), kr.burst ? '2' : '1');
    M.setT($('#roT'), k.burst ? 'AFTER THE BURST' : 'ONE ROCKET'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    $('#r_ay').style.background = mix('#FFFFFF', '#FBE6E6', M.io((t - wt('S8', 'outside')) / 0.3) * (1 - M.io((t - tS9) / 0.3)));
    // graph: path of the centre
    const reachedTau = t >= tS5 ? 4 : S.tau;
    attr(gC, 'd', pathD(x => rk(x).c, 0, Math.max(0.01, t >= tS5 && t < tS9 ? 4 : S.tau), gGP, 60));
    attr(gPa, 'd', reachedTau > 2 ? pathD(x => rk(x).a, 2, Math.min(4, reachedTau), gGP, 20) : ''); attr(gPb, 'd', reachedTau > 2 ? pathD(x => rk(x).b, 2, Math.min(4, reachedTau), gGP, 20) : '');
    gDt(k.c[0], Math.max(0, k.c[1]), t > tS1 + 0.6);
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    avA(t, wt('S5', 'curve') + 0.2, tS6 - 0.2);
    vis($('#th1'), t, tS10 + 0.05, OUT('S11'), { dy: 36, ...o });
    th1(t, { tin: tS10, tOpts: wt('S10', 'Does') - 0.1, tCount: T1('S10') + 0.05, dur: 3, tAns: tS11 - 0.02, tWhy: wt('S11', 'ground') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    ST.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 12).toFixed(1) + 'px';
    vis($('#dpan'), t, tStep[2] - 0.3, 1e9, { dx: 40, dy: 0 });
    vis(dBa, t, tStep[2], 1e9, { dy: 0 }); vis(dBb, t, tStep[2] + 0.1, 1e9, { dy: 0 });
    const uf = M.io((t - wt('D4', 'inside') + 0.1) / 0.4), uc = M.io((t - wt('D5', 'cancel') + 0.1) / 0.4);
    [dFa.g, dFb.g, ...dFl].forEach(e => e.style.opacity = (uf * (1 - 0.7 * uc)).toFixed(3)); dSum.style.opacity = uc;
    vis(dC.o, t, wt('D5', 'cancel') + 0.2, 1e9, { dy: 0 }); dEg.style.opacity = M.io((t - wt('D5', 'outside') + 0.1) / 0.4);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxw = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sxw ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'centre') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'outside') - 0.2, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.2, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'parabola') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const sep = 20 * M.io((t - tLk[0]) / 0.6); place(rHa, RA[0] - sep, RA[1]); place(rHb, RB[0] + sep, RB[1]);
    vis(rHa.o, t, tR1 + 0.6, 1e9, { dy: 0 }); vis(rHb.o, t, tR1 + 0.6, 1e9, { dy: 0 });
    const uf = M.io((t - tLk[0] - 0.2) / 0.4); [rFa.g, rFb.g, ...rFl].forEach(e => e.style.opacity = uf); rEq.style.opacity = M.io((t - tLk[1]) / 0.4);
    const uw = M.io((t - tLk[2]) / 0.4); [...rW.map(a => a.g), ...rWl, rSum].forEach(e => e.style.opacity = uw);
    avR(t, wt('R4', 'parabola') + 0.4, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kt'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    KV.forEach(q => { const tau = M.clamp(t - (q.i ? tK2 + 0.2 : tK1 + 0.3), 0, 4);
      if (!q.i) { const k = rk(tau), p = kp(...k.c); M.hide(q.A.o, true); M.hide(q.B.o, true); M.hide(q.R.o, false); place(q.R, p[0], p[1], tau < 4 ? angOf([UX, UY - G * tau]) : 0); q.c.set(p[0], p[1]); attr(q.tr, 'd', pathD(x => rk(x).c, 0, Math.max(tau, 0.01), kp)); }
      else drawRk(tau, kp, q.R, q.A, q.B, q.c, null, q.ta, q.tb, null), attr(q.tr, 'd', pathD(x => rk(x).c, 0, Math.max(tau, 0.01), kp));
      q.fl.style.opacity = tau >= 3.99 ? 1 : 0; });
    vis($('#ktP'), t, wt('K1', 'forty') - 0.1, 1e9, POP); vis($('#krP'), t, wt('K2', 'forty') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'His') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const up = M.o3((t - wt('W2', 'newton') + 0.1) / 0.4); [wPush.g, wPl].forEach(e => e.style.opacity = up);
    wIn.style.opacity = (M.io((t - wt('W2', 'spring') + 0.1) / 0.4) * (1 - M.io((t - wt('W3', 'drops')) / 0.5))).toFixed(3);
    vis(wC.o, t, tW[1] - 0.2, 1e9, { dy: 0 }); const ua = M.o3((t - tW[1] - 0.6) / 0.5); wA.set(WXc, WY + 70, WXc + 40 * ua, WY + 70); wAl.style.opacity = ua;
    const u1 = M.o3((t - wt('W5', 'three') + 0.1) / 0.5), u2 = M.o3((t - tW[3] - 0.4) / 0.5);
    wa1.set(W1[0] + 10, WY - W1[2] - 16, W1[0] + 10 + 70 * u1, WY - W1[2] - 16); wa1l.style.opacity = u1; wa2.set(W2[0] + 10, WY - W2[2] - 16, W2[0] + 10 + 20 * u2, WY - W2[2] - 16); wa2l.style.opacity = u2;
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'burst') - 0.1, tStrike: wt('X3', 'internal') - 0.1, tRight: wt('X3', 'Its') });
    vis(tFl, t, wt('X2', 'burst'), 1e9, { dy: 0 }); M.draw(tWr, t, wt('X2', 'knocks'), 0.6); vis(tWl, t, wt('X2', 'curve'), 1e9, { dy: 0 });
    M.draw(tRt, t, wt('X3', 'parabola') - 0.2, 0.6); vis(tRl, t, wt('X3', 'parabola'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'shells') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Where') - 0.2, tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
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
