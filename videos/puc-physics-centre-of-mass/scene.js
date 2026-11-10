// PUC Physics Ep 92: Centre of mass (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const XC = C.violet, MC = C.ink, TC = C.gold, FC = C.orange, IC = C.ink;            // position / distance violet, mass ink, cm cross gold, force orange
const BALL = '#5B6B8C', BALL2 = '#2E3A5C', RULER = '#E8C25A', SKIN = '#E8B896', COIN = '#C9A227';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
// centre of mass marker: ink ring with a gold cross (series canon). outer g for vis, inner g positioned
const cmM = (p, r = 15) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}); mk(g, 'circle', { r, fill: '#fff', stroke: IC, 'stroke-width': 4 }); mk(g, 'path', { d: `M${-r + 4},0 H${r - 4} M0,${-r + 4} V${r - 4}`, stroke: TC, 'stroke-width': 4, 'stroke-linecap': 'round' }); return { o, g, set(x, y) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); } }; };
const ballM = (p, col, lab) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {}), c = mk(g, 'circle', { r: 20, fill: col, stroke: IC, 'stroke-width': 2.5 }), tx = txt(g, 0, 7, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 18, 'font-family': 'Poppins' }); return { o, g, c, tx, set(x, y, r) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); attr(c, 'r', r.toFixed(1)); } }; };
const fulc = (p, col = '#8D99AE') => { const o = mk(p, 'g', {}), e = mk(o, 'path', { fill: col, stroke: IC, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); return { o, set(x, y, h = 40) { attr(e, 'd', `M${x.toFixed(1)},${y} L${(x - 22).toFixed(1)},${y + h} L${(x + 22).toFixed(1)},${y + h} Z`); } }; };
const brk = (p, col) => { const e = mk(p, 'path', { fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linecap': 'round' }); return (x1, x2, y) => attr(e, 'd', `M${x1.toFixed(1)},${y - 9} V${y} H${x2.toFixed(1)} V${y - 9}`); };
const rB = m => 20 * Math.cbrt(m);

Object.assign(M.IC, {
  tray: ['M3 14h18', 'M6 14a6 6 0 0 1 12 0', 'M12 8V6', 'M12 14v7'],
  pole: ['M2 9h20', 'M12 9v4', 'M12 13l-3 8', 'M12 13l3 8', 'M12 5a1.5 1.5 0 1 0 0 .1'],
  crane: ['M5 21V4h13', 'M5 8l4-4', 'M16 4v6', 'M14 10h4v4h-4z', 'M3 21h6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS10 = T0('S10'), tS11 = T0('S11');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['tray', 'A waiter', 'TRAY ON ONE HAND'], ['pole', 'A tightrope walker', 'GRIPS A LONG POLE'], ['crane', 'A crane', 'LIFTS FROM ONE HOOK']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'waiter'), wt('H1', 'tightrope'), wt('H1', 'crane')];
$('#jrs').innerHTML = JOBS.map(([, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="320" height="120"></svg></div>`).join('');
// mini pictures, each with its special point
const jm = [];
{ const s0 = $('#jsv0'), g0 = mk(s0, 'g', {}); mk(g0, 'line', { x1: 60, y1: 52, x2: 260, y2: 52, stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' }); [[90, 16], [140, 22], [200, 14], [236, 18]].forEach(([x, h]) => mk(g0, 'rect', { x: x - 14, y: 49 - h, width: 28, height: h, rx: 5, fill: '#8D99AE', stroke: IC, 'stroke-width': 2 })); mk(s0, 'path', { d: 'M150,56 L150,112', stroke: SKIN, 'stroke-width': 14, 'stroke-linecap': 'round' }); const c0 = cmM(s0, 9); c0.set(150, 52); jm.push({ g: g0, c: c0, cx: 150, cy: 52 }); }
{ const s1 = $('#jsv1'), g1 = mk(s1, 'g', {}); mk(g1, 'line', { x1: 20, y1: 50, x2: 300, y2: 50, stroke: '#9B5B45', 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(s1, 'line', { x1: 0, y1: 110, x2: 320, y2: 110, stroke: IC, 'stroke-width': 2, 'stroke-dasharray': '4 4' }); mk(s1, 'path', { d: 'M160,54 L160,96 M160,96 L150,110 M160,96 L170,110', stroke: IC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(s1, 'circle', { cx: 160, cy: 34, r: 0.1 }); const c1 = cmM(s1, 9); c1.set(160, 50); jm.push({ g: g1, c: c1, cx: 160, cy: 50 }); }
{ const s2 = $('#jsv2'), g2 = mk(s2, 'g', {}); mk(s2, 'line', { x1: 40, y1: 8, x2: 300, y2: 8, stroke: IC, 'stroke-width': 6 }); mk(g2, 'line', { x1: 170, y1: 8, x2: 170, y2: 50, stroke: IC, 'stroke-width': 2.5 }); mk(g2, 'rect', { x: 120, y: 50, width: 100, height: 56, rx: 6, fill: '#8D99AE', stroke: IC, 'stroke-width': 2.5 }); const c2 = cmM(g2, 9); c2.set(170, 78); jm.push({ g: g2, c: c2, cx: 170, cy: 78 }); }
// Diya's ruler on one finger
const hs = $('#hkS'), HP = [290, 330], HR = 14;      // 14 px per cm, 30 cm ruler centred on the fingertip
mk(hs, 'path', { d: `M${HP[0] - 18},470 L${HP[0] - 16},${HP[1] + 20} Q${HP[0]},${HP[1] - 4} ${HP[0] + 16},${HP[1] + 20} L${HP[0] + 18},470 Z`, fill: SKIN, stroke: IC, 'stroke-width': 2.5 });
const hO = mk(hs, 'g', {}), hR = mk(hO, 'g', {});
mk(hR, 'rect', { x: HP[0] - 15 * HR, y: HP[1] - 30, width: 30 * HR, height: 30, rx: 4, fill: RULER, stroke: IC, 'stroke-width': 2.5 });
for (let c = 0; c <= 30; c++) mk(hR, 'line', { x1: HP[0] + (c - 15) * HR, y1: HP[1] - 30, x2: HP[0] + (c - 15) * HR, y2: HP[1] - 30 + (c % 5 ? 8 : 14), stroke: IC, 'stroke-width': 1.5 });
[0, 15, 30].forEach(c => txt(hR, HP[0] + (c - 15) * HR, HP[1] - 6, c, { 'text-anchor': 'middle', fill: IC, 'font-size': 14, 'font-weight': 600 }));
const hCoins = [0, 1, 2, 3].map(k => mk(hR, 'rect', { x: HP[0] - 14 * HR - 16, y: HP[1] - 30 - 8 * (k + 1), width: 32, height: 7, rx: 3, fill: COIN, stroke: IC, 'stroke-width': 1.5 }));
const hCm = cmM(hR, 10); hCm.set(HP[0], HP[1] - 15);
const hQ = txt(hs, 0, 0, '?', { fill: C.red, 'font-weight': 700, 'font-size': 40, 'font-family': 'Poppins', 'text-anchor': 'middle' });
const tCoin = wt('H4', 'coins') - 0.3, tTilt = wt('H4', 'fails') - 0.1;

/* ---------- P ---------- */
const ps = $('#pqS'), PY = 250, PX1 = 150, PX2 = 630;
mk(ps, 'line', { x1: 80, y1: PY, x2: 704, y2: PY, stroke: IC, 'stroke-width': 3 });
const pB1 = ballM(ps, BALL, '1'), pB2 = ballM(ps, BALL2, '3'); pB1.set(PX1, PY, rB(1)); pB2.set(PX2, PY, rB(3));
const pL = [txt(ps, PX1, PY + 70, '1 kg', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 22 }), txt(ps, PX2, PY + 70, '3 kg', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 22 })];
const pAvg = mk(ps, 'g', {}); mk(pAvg, 'circle', { cx: (PX1 + PX2) / 2, cy: PY, r: 13, fill: '#fff', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '4 4' });
const pAvgL = txt(ps, (PX1 + PX2) / 2, PY - 40, 'plain average', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 });
const pAvgX = mk(ps, 'line', { x1: (PX1 + PX2) / 2 - 70, y1: PY - 46, x2: (PX1 + PX2) / 2 + 70, y2: PY - 46, stroke: C.red, 'stroke-width': 3 });
const pCm = cmM(ps, 15), pCmL = txt(ps, 0, PY + 120, 'mass average', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 20 });
const pArr = PUC.arrow(ps, XC, 4, 14);
const pm = $('#pmS'), RX = 112, RPX = 560 / 30;
mk(pm, 'rect', { x: RX, y: 210, width: 560, height: 40, rx: 4, fill: RULER, stroke: IC, 'stroke-width': 2.5 });
for (let c = 0; c <= 30; c++) mk(pm, 'line', { x1: RX + c * RPX, y1: 210, x2: RX + c * RPX, y2: 210 + (c % 5 ? 10 : 18), stroke: IC, 'stroke-width': 1.5 });
[0, 5, 10, 15, 20, 25, 30].forEach(c => txt(pm, RX + c * RPX, 280, c, { 'text-anchor': 'middle', fill: IC, 'font-size': 18, 'font-weight': 600 })); txt(pm, RX + 560, 306, 'cm', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 });
const pBl = [...Array(10)].map((_, k) => mk(pm, 'rect', { x: RX + 6 + k * 56, y: 150, width: 44, height: 44, rx: 6, fill: C.ac2, stroke: C.ac, 'stroke-width': 2 }));
const pBlL = txt(pm, 392, 132, '10 equal bits of mass', { 'text-anchor': 'middle', fill: C.ac, 'font-weight': 600 });
const pmCm = cmM(pm, 15), pmF = fulc(pm); pmF.set(RX + 280, 252, 60);
const pmL = txt(pm, RX + 280, 360, 'balanced', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 20 });

/* ---------- S: rod + two balls ---------- */
const s = $('#simS'), RY = 250, X0p = 92, PXM = 500, L12 = 1.2;
const sx = x => X0p + PXM * x;
mk(s, 'line', { x1: sx(0), y1: RY, x2: sx(L12), y2: RY, stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' });
for (let k = 0; k <= 6; k++) { const x = sx(0.2 * k); mk(s, 'line', { x1: x, y1: 340, x2: x, y2: 352, stroke: IC, 'stroke-width': 2 }); txt(s, x, 378, (0.2 * k).toFixed(1).replace('.0', ''), { 'text-anchor': 'middle', fill: IC, 'font-weight': 600 }); }
mk(s, 'line', { x1: sx(0), y1: 340, x2: sx(L12), y2: 340, stroke: IC, 'stroke-width': 2 }); txt(s, sx(L12) + 24, 345, 'm', { fill: XC, 'font-weight': 600 });
const sGh = [0, 1, 2].map(() => mk(s, 'circle', { r: 15, fill: 'none', stroke: IC, 'stroke-width': 3, opacity: 0 }));
const sF = fulc(s), sCm = cmM(s, 15), sB1 = ballM(s, BALL, ''), sB2 = ballM(s, BALL2, '');
const sXl = txt(s, 0, 300 + 0, '', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 22 });
const sXg = mk(s, 'line', { stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const sB1l = txt(s, sx(0), RY - 56, '', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 }), sB2l = txt(s, sx(L12), RY - 64, '', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 });
const sBr1 = brk(s, XC), sBr2 = brk(s, XC), sBrL1 = txt(s, 0, 446, 'r₁ = 0.9 m', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 21 }), sBrL2 = txt(s, 0, 446, 'r₂ = 0.3 m', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 21 });
const brkG = mk(s, 'g', {}); [sBrL1, sBrL2].forEach(e => brkG.appendChild(e));
const tM2 = wt('S4', 'Two'), tM3 = wt('S5', 'Three'), tUp = wt('S6', 'climbs'), tDn = wt('S6', 'never') + 0.4, tDbl = tS11 + 0.3;
const mass = t => {
  let m2 = 1 + M.io((t - tM2) / 0.8) + M.io((t - tM3) / 0.8) + 5 * M.io((t - tUp) / 2.2) - 5 * M.io((t - tDn) / 1.4), k = 1 + M.io((t - tDbl) / 0.9);
  if (t >= tDbl - 0.5) return { m1: k, m2: 3 * k, run2: true };
  return { m1: 1, m2 };
};
const Xof = (m1, m2) => L12 * m2 / (m1 + m2);
$('#roA').innerHTML = `<span class="k" style="color:${MC}">m<sub>1</sub></span><span class="v" id="r_m1">1.00</span><span class="u">kg</span>
  <span class="k" style="color:${MC}">m<sub>2</sub></span><span class="v" id="r_m2">1.00</span><span class="u">kg</span>
  <span class="k" style="color:${MC}">m<sub>2</sub>/m<sub>1</sub></span><span class="v" id="r_q">1.00</span><span class="u"></span>`;
$('#roB').innerHTML = `<span class="k" style="color:${XC}">X</span><span class="v" id="r_X" style="color:${XC}">0.60</span><span class="u">m</span>
  <span class="k" style="color:${XC}">r<sub>1</sub></span><span class="v" id="r_r1" style="color:${XC}">0.60</span><span class="u">m</span>
  <span class="k" style="color:${XC}">r<sub>2</sub></span><span class="v" id="r_r2" style="color:${XC}">0.60</span><span class="u">m</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: 8, ymin: 0, ymax: 1.2, xt: [0, 2, 4, 6, 8], yt: [0, 0.3, 0.6, 0.9, 1.2], xl: 'm₂ (kg)' });
txt(gs, 122, 78, 'X (m)', { 'font-size': 18 });
const gAs = mk(gs, 'line', { x1: g.X(0), y1: g.Y(1.2), x2: g.X(8), y2: g.Y(1.2), stroke: C.red, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gAsL = txt(gs, g.X(8) - 4, g.Y(1.2) - 10, 'ball 2 at 1.2 m: never passed', { 'text-anchor': 'end', fill: C.red, 'font-weight': 600, 'font-size': 16 });
const gGh = mk(gs, 'path', { d: '', fill: 'none', stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '3 6', opacity: 0.45 });
const gC1 = mk(gs, 'path', { d: '', fill: 'none', stroke: XC, 'stroke-width': 5, 'stroke-linecap': 'round' }), gC2 = mk(gs, 'path', { d: '', fill: 'none', stroke: '#B49CF0', 'stroke-width': 4, 'stroke-dasharray': '9 6', 'stroke-linecap': 'round' });
const gDt = g.dot(XC, 10);
$('#leg').innerHTML = [[XC, '', 'm₁ = 1 kg'], ['#B49CF0', '9 6', 'm₁ = 2 kg']].map(([c, d, n], i) => `<span id="lg${i}"><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="4" stroke-dasharray="${d}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const plot = (path, f, a, b) => { if (b - a <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 60; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
$('#simEq').innerHTML = `<span style="color:${MC}">1 kg</span> × <span style="color:${XC}">0.9 m</span> = <span style="color:${MC}">3 kg</span> × <span style="color:${XC}">0.3 m</span>`;
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'The heavy ball drags the centre toward it!' });
const th1 = PUC.think($('#th1'), { q: 'Double both balls, to 2 kg and 6 kg. Does the centre of mass move?', opts: ['Yes, it moves', 'No, it stays'], right: 1, why: 'The ratio is still 1 : 3. Only the ratio decides where it sits.' });

/* ---------- D ---------- */
const m1 = tc(MC, 'm_1'), m2 = tc(MC, 'm_2'), x1 = tc(XC, 'x_1'), x2 = tc(XC, 'x_2'), Xs = tc(XC, 'X'), r1 = tc(XC, 'r_1'), r2 = tc(XC, 'r_2');
const ST = [[`${Xs} = \\dfrac{${m1}${x1} + ${m2}${x2}}{${m1} + ${m2}}`, 'count each position by its mass'],
  [`[${Xs}] = \\dfrac{\\text{kg}\\cdot\\text{m}}{\\text{kg}} = \\text{m}`, 'units: X is a position'],
  [`${m1} = ${m2} \\;\\Rightarrow\\; ${Xs} = \\dfrac{${x1} + ${x2}}{2}`, 'equal masses: the midpoint'],
  [`${m1}${r1} = ${m2}${r2} \\;\\Rightarrow\\; \\dfrac{${r1}}{${r2}} = \\dfrac{${m2}}{${m1}}`, 'closer to the heavier mass']];
const SY = [80, 194, 300, 410];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:104px"></div>` + ST.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx" style="top:${i === 1 ? -6 : -18}px">${K(f)}</div><div class="why" style="left:${i === 1 ? 470 : 560}px;top:12px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Count'), wt('D3', 'Check'), wt('D4', 'Equal'), wt('D5', 'general')];
const dp = $('#dpS'), DY = 190, DX1 = 60, DX2 = 460, DXc = DX1 + 0.75 * (DX2 - DX1);
mk(dp, 'line', { x1: DX1, y1: DY, x2: DX2, y2: DY, stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dB1 = ballM(dp, BALL, '1'), dB2 = ballM(dp, BALL2, '3'); dB1.set(DX1, DY, rB(1)); dB2.set(DX2, DY, rB(3));
const dCm = cmM(dp, 13); dCm.set(DXc, DY);
const dBr1 = brk(dp, XC), dBr2 = brk(dp, XC); const dBrG = mk(dp, 'g', {});
const dBl = [txt(dBrG, (DX1 + DXc) / 2, 296, 'r₁', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(dBrG, (DXc + DX2) / 2, 296, 'r₂', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' })];
const dRat = txt(dp, 262, 350, '3 times the mass, 1/3 the distance', { 'text-anchor': 'middle', fill: IC, 'font-weight': 700, 'font-size': 19 });
$('#sgm').innerHTML = K(`${Xs} = \\dfrac{\\sum m_i ${tc(XC, 'x_i')}}{M},\\;\\; ${tc(XC, 'Y')} = \\dfrac{\\sum m_i ${tc(XC, 'y_i')}}{M}`);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Xs} = \\dfrac{${m1}${x1} + ${m2}${x2}}{${m1} + ${m2}}`);

/* ---------- R ---------- */
const LK = [['Gravity pulls every coin and every bit', 'PULLS'], ['Each pull is in proportion to its mass', 'SAME g'], ['Balance at the mass average', 'CENTRE OF MASS']];
$('#lks').innerHTML = LK.map(([h, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="lt">${h}</div><div class="tg" style="background:${i === 2 ? C.ink : C.ac2};color:${i === 2 ? '#fff' : C.ac}">${tg}</div></div>`).join('') +
  `<div class="pillp" id="rP" style="left:36px;top:420px">Uniform gravity: balance point = centre of mass</div>`;
const tLk = [wt('R2', 'Gravity'), wt('R3', 'proportion'), wt('R4', 'balance')];
const rr = $('#rrS'), QX = 92, QP = 20, QY = 250;
mk(rr, 'rect', { x: QX, y: QY - 30, width: 600, height: 30, rx: 4, fill: RULER, stroke: IC, 'stroke-width': 2.5 });
for (let c = 0; c <= 30; c++) mk(rr, 'line', { x1: QX + c * QP, y1: QY - 30, x2: QX + c * QP, y2: QY - 30 + (c % 5 ? 8 : 14), stroke: IC, 'stroke-width': 1.5 });
[0, 5, 10, 15, 20, 25, 30].forEach(c => txt(rr, QX + c * QP, QY + 26, c, { 'text-anchor': 'middle', fill: IC, 'font-size': 17, 'font-weight': 600 }));
const rCoins = [0, 1, 2, 3].map(k => mk(rr, 'rect', { x: QX + QP - 18, y: QY - 30 - 8 * (k + 1), width: 36, height: 7, rx: 3, fill: COIN, stroke: IC, 'stroke-width': 1.5 }));
const rWc = PUC.arrow(rr, FC, 6, 18), rWr = PUC.arrow(rr, FC, 6, 18);
const rWl = [txt(rr, QX + QP, QY + 150, 'coins 20 g', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 19 }), txt(rr, QX + 15 * QP, QY + 150, 'ruler 20 g', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 19 })];
const rF = fulc(rr), rCm = cmM(rr, 13);
const rBr1 = brk(rr, XC), rBr2 = brk(rr, XC), rBrG = mk(rr, 'g', {}); const rBl = [txt(rBrG, QX + 4.5 * QP, QY - 92, '7 cm', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 19 }), txt(rBrG, QX + 11.5 * QP, QY - 92, '7 cm', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 19 })];
$('#rrEq').innerHTML = K(`${Xs} = \\dfrac{20 \\times 15 + 20 \\times 1}{20 + 20} = ${tc(XC, '8\\,\\text{cm}')}`);
$('#rrEq').style.height = '72px'; $('#rrEq').style.top = '478px';
const avR = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'So my finger finds the centre of mass!' });

/* ---------- K ---------- */
const KS = [[1, 1], [1, 3]].map(([a, b], i) => { const sv = $(i ? '#krS' : '#ktS'), y = 250, xa = 112, xb = 672;
  mk(sv, 'line', { x1: xa, y1: y, x2: xb, y2: y, stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' });
  const A = ballM(sv, BALL, a + ''), B = ballM(sv, BALL2, b + ''); A.set(xa, y, rB(a)); B.set(xb, y, rB(b));
  const f = fulc(sv), c = cmM(sv, 15), xc = xa + (xb - xa) * b / (a + b), b1 = brk(sv, XC), b2 = brk(sv, XC), bg = mk(sv, 'g', {});
  const l1 = txt(bg, (xa + xc) / 2, 380, i ? '3 parts' : 'half', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 21 }), l2 = txt(bg, (xc + xb) / 2, 380, i ? '1 part' : 'half', { 'text-anchor': 'middle', fill: XC, 'font-weight': 700, 'font-size': 21 });
  return { sv, A, B, f, c, xa, xb, xc, y, b1, b2, bg }; });
$('#ktP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Centre in the middle`;
$('#krP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Centre ¾ of the way, near 3 kg`;
const th2 = PUC.think($('#th2'), { q: 'Put the zero of the scale at the other end instead. Does the centre of mass move?', opts: ['Yes, it moves', 'No, it stays'], right: 1, why: 'Every number changes, but the point stays at the same place.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = '1 kg at the origin, 2 kg at (3 m, 0), 3 kg at (0, 4 m). Find the centre of mass.';
const wsol = PUC.solution($('#wl'), [
  [K(`M = 1 + 2 + 3 = 6\\,\\text{kg}`)],
  [K(`${Xs} = \\dfrac{1(0) + 2(3) + 3(0)}{6} = ${tc(XC, '1\\,\\text{m}')}`)],
  [K(`${tc(XC, 'Y')} = \\dfrac{1(0) + 2(0) + 3(4)}{6} = ${tc(XC, '2\\,\\text{m}')}`)],
  [K(`\\text{CM} = (${tc(XC, '1\\,\\text{m}')}, ${tc(XC, '2\\,\\text{m}')})\\ \\text{inside the triangle}`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [150, 470], WU = 92, wp = (x, y) => [WO[0] + WU * x, WO[1] - WU * y];
for (let k = 0; k <= 5; k++) { mk(w, 'line', { x1: wp(k, 0)[0], y1: wp(0, 0)[1], x2: wp(k, 4.4)[0], y2: wp(k, 4.4)[1], stroke: C.line, 'stroke-width': 1.5 }); }
for (let k = 0; k <= 4; k++) mk(w, 'line', { x1: wp(0, k)[0], y1: wp(0, k)[1], x2: wp(5.6, k)[0], y2: wp(5.6, k)[1], stroke: C.line, 'stroke-width': 1.5 });
mk(w, 'path', { d: `M${wp(0, 4.4)[0]},${wp(0, 4.4)[1]} V${WO[1]} H${wp(5.6, 0)[0]}`, fill: 'none', stroke: IC, 'stroke-width': 2.5 });
[1, 2, 3, 4, 5].forEach(k => txt(w, wp(k, 0)[0], WO[1] + 28, k, { 'text-anchor': 'middle', fill: IC, 'font-weight': 600 })); [1, 2, 3, 4].forEach(k => txt(w, WO[0] - 14, wp(0, k)[1] + 6, k, { 'text-anchor': 'end', fill: IC, 'font-weight': 600 }));
txt(w, wp(5.6, 0)[0], WO[1] + 28, 'x (m)', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 }); txt(w, WO[0] + 10, wp(0, 4.4)[1] + 4, 'y (m)', { fill: XC, 'font-weight': 600 });
const wTri = mk(w, 'path', { d: `M${wp(0, 0)} L${wp(3, 0)} L${wp(0, 4)} Z`.replace(/,/g, ' ').replace(/(\d) (\d)/g, '$1,$2'), fill: C.ac3 || '#EEF3FD', stroke: C.ac, 'stroke-width': 2, 'stroke-dasharray': '6 5' });
const WB = [[1, 0, 0], [2, 3, 0], [3, 0, 4]].map(([m, x, y]) => { const b = ballM(w, m === 3 ? BALL2 : BALL, m + ''); const p = wp(x, y); b.set(p[0], p[1], rB(m) * 0.85); return b; });
const wGx = mk(w, 'line', { x1: wp(1, 0)[0], y1: WO[1], x2: wp(1, 4.4)[0], y2: wp(1, 4.4)[1], stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }), wGy = mk(w, 'line', { x1: WO[0], y1: wp(0, 2)[1], x2: wp(5.6, 2)[0], y2: wp(0, 2)[1], stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const wCm = cmM(w, 14); wCm.set(...wp(1, 2)); const wCmL = txt(w, wp(1, 2)[0] + 24, wp(1, 2)[1] - 18, '(1, 2) m', { fill: XC, 'font-weight': 700, 'font-size': 22 });
const tW = [wt('W3', 'Total'), wt('W4', 'X'), wt('W5', 'Y'), wt('W6', 'So')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The centre of mass is always halfway', right: 'Halfway only for equal masses: m₁r₁ = m₂r₂' });
const tp = $('#tpS'), TY = 120, TA = 60, TB = 560, TCc = TA + 0.75 * (TB - TA);
mk(tp, 'line', { x1: TA, y1: TY, x2: TB, y2: TY, stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const tB1 = ballM(tp, BALL, '1'), tB2 = ballM(tp, BALL2, '3'); tB1.set(TA, TY, rB(1)); tB2.set(TB, TY, rB(3));
const tWr = mk(tp, 'g', {}); mk(tWr, 'circle', { cx: (TA + TB) / 2, cy: TY, r: 13, fill: '#fff', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '4 4' }); txt(tWr, (TA + TB) / 2, TY + 54, 'halfway?', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 19 });
const tCm = cmM(tp, 13); tCm.set(TCc, TY); const tCmL = txt(tp, TCc, TY + 54, '¾ of the way', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 700, 'font-size': 19 });
const where = PUC.where($('#wa'), { on: [], type: 'Two and three particle problems, and how far the centre of mass shifts' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Particles of 2 kg and 6 kg are 40 cm apart. The 2 kg one moves 12 cm toward the centre of mass. How must the 6 kg one move to keep the centre fixed?', qW: 780,
  opts: ['4 cm toward it', '4 cm away from it', '12 cm toward it', '36 cm away from it'], right: 0, optY: 336, optH: 90, optFs: 28 });
const so = PUC.solution($('#so'), [
  [K(`\\Delta ${Xs} = 0 \\Rightarrow ${m1}\\Delta ${x1} + ${m2}\\Delta ${x2} = 0`)], [K(`2(+12) + 6\\,\\Delta ${x2} = 0`)],
  [K(`\\Delta ${x2} = -4\\,\\text{cm}`)], [K(`\\text{opposite way: toward the centre}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '23px');
const tSo = [wt('A2', 'must'), wt('A3', 'Two'), wt('A3', 'shift', 1), wt('A4', 'opposite')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 540, title: 'Recap · centre of mass', y0: 96, dy: 94, txt: [0, 1, 1, 0, 1],
  lines: [K(`${Xs} = \\tfrac{${m1}${x1} + ${m2}${x2}}{${m1} + ${m2}}`), '<b>Equal masses</b>: the centre of mass is at the midpoint', `<b>Unequal</b>: ${K(`${m1}${r1} = ${m2}${r2}`)}, closer to the heavier mass`,
    K(`${Xs} = \\tfrac{\\sum m_i ${tc(XC, 'x_i')}}{M},\\;\\; ${tc(XC, 'Y')} = \\tfrac{\\sum m_i ${tc(XC, 'y_i')}}{M}`), '<b>Uniform gravity</b>: the balance point is the centre of mass'] });
const YQ = ['Why do coins on one end move the balance point toward them?', 'Where is the centre of mass of two equal masses?', 'Does choosing a different origin move the centre of mass?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 93', topic: 'A ring balances where there is no metal. Centre of Mass of Common Bodies', y: 764 });
$('#sF .next .nt').style.fontSize = '31px';

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.05, 1.06, 960, 540], [tS10 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const q = jm[i], sw = 4 * Math.sin((t - tMorph) * 1.8 + i); if (i < 2) attr(q.g, 'transform', `rotate(${sw.toFixed(2)} ${q.cx} ${q.cy})`); else attr(q.g, 'transform', `rotate(${(sw * 0.6).toFixed(2)} 170 8)`);
      vis(q.c.o, t, wt('H2', 'special') + i * 0.15, 1e9, { dy: 0 }); });
    vis($('#hjP'), t, wt('H2', 'mass') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    vis(hO, t, tH3 + 0.3, 1e9, { dy: 0 });
    hCoins.forEach((c, k) => vis(c, t, tCoin + k * 0.22, 1e9, { dy: -40, sp: M.SOFT, fade: 0.08 }));
    const tl = -12 * M.io((t - tTilt) / 0.7); attr(hR, 'transform', `rotate(${tl.toFixed(2)} ${HP[0]} ${HP[1]})`);
    vis(hCm.o, t, wt('H3', 'middle') - 0.1, tCoin + 0.3, { dy: 0, outDur: 0.2 });
    attr(hQ, 'x', HP[0] - 7 * HR); attr(hQ, 'y', HP[1] + 80); vis(hQ, t, wt('H4', 'Where') - 0.1, 1e9, POP);
    vis($('#hkQ'), t, wt('H4', 'Where') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis(pB1.o, t, tP1 + 0.4, 1e9, { dy: 0 }); vis(pB2.o, t, tP1 + 0.5, 1e9, { dy: 0 }); pL.forEach((e, i) => vis(e, t, tP1 + 0.5 + i * 0.1, 1e9, { dy: 0 }));
    vis(pAvg, t, wt('P1', 'average') - 0.1, 1e9, { dy: 0 }); vis(pAvgL, t, wt('P1', 'average'), 1e9, { dy: 0 });
    M.draw(pAvgX, t, wt('P2', 'plain') - 0.1, 0.4);
    const u = M.io((t - wt('P2', 'heavy') + 0.2) / 0.9), xc = (PX1 + PX2) / 2 + u * (PX1 + 0.75 * (PX2 - PX1) - (PX1 + PX2) / 2);
    pCm.set(xc, PY); vis(pCm.o, t, wt('P2', 'counts') - 0.1, 1e9, { dy: 0 }); attr(pCmL, 'x', xc); vis(pCmL, t, wt('P2', 'counts'), 1e9, { dy: 0 });
    pArr.set((PX1 + PX2) / 2, PY + 40, (PX1 + PX2) / 2 + (xc - (PX1 + PX2) / 2) * 0.98, PY + 40);
    vis($('#pqP'), t, wt('P2', 'heavy') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP3 - 0.1, out, { dx: 60, dy: 0, ...o });
    pBl.forEach((b, k) => vis(b, t, wt('P3', 'evenly') - 0.4 + k * 0.06, 1e9, { dy: -20, sp: M.SOFT, fade: 0.08 })); vis(pBlL, t, wt('P3', 'evenly'), 1e9, { dy: 0 });
    pmCm.set(RX + 280, 230); vis(pmCm.o, t, wt('P3', 'middle') - 0.1, 1e9, { dy: 0 }); vis(pmF.o, t, wt('P3', 'middle'), 1e9, { dy: 0 }); vis(pmL, t, wt('P3', 'fifteen'), 1e9, { dy: 0 });
    vis($('#pmP'), t, wt('P3', 'fifteen') - 0.1, 1e9, POP);
  }

  /* S: rod + balls */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S10'), simIn2 = OUT('S11') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const m = mass(t), X = Xof(m.m1, m.m2), xc = sx(X);
    sB1.set(sx(0), RY, rB(m.m1)); sB2.set(sx(L12), RY, rB(m.m2)); vis(sB1.o, t, wt('S1', 'ball') - 0.1, 1e9, { dy: 0 }); vis(sB2.o, t, wt('S1', 'ball') + 0.1, 1e9, { dy: 0 });
    M.setT(sB1l, m.m1.toFixed(Math.abs(m.m1 - Math.round(m.m1)) < 0.01 ? 0 : 1) + ' kg'); M.setT(sB2l, m.m2.toFixed(Math.abs(m.m2 - Math.round(m.m2)) < 0.01 ? 0 : 1) + ' kg');
    attr(sB1l, 'y', RY - rB(m.m1) - 16); attr(sB2l, 'y', RY - rB(m.m2) - 16); vis(sB1l, t, wt('S2', 'one') - 0.1, 1e9, { dy: 0 }); vis(sB2l, t, wt('S2', 'two', 1) - 0.1, 1e9, { dy: 0 });
    sCm.set(xc, RY); sF.set(xc, RY + 8, 44); vis(sCm.o, t, wt('S3', 'centre') - 0.1, 1e9, { dy: 0 }); vis(sF.o, t, wt('S3', 'centre') - 0.1, 1e9, { dy: 0 });
    const moving = t > tS1 && Math.abs(Xof(mass(t - 0.08).m1, mass(t - 0.08).m2) - X) > 0.002;
    sGh.forEach((e, j) => { const mg = mass(t - 0.12 * (j + 1)), xg = sx(Xof(mg.m1, mg.m2)); attr(e, 'cx', xg.toFixed(1)); attr(e, 'cy', RY); e.style.opacity = moving && Math.abs(xg - xc) > 3 ? [0.35, 0.22, 0.12][j] : 0; });
    attr(sXl, 'x', xc.toFixed(1)); attr(sXl, 'y', 322); M.setT(sXl, 'X = ' + f2(X) + ' m'); vis(sXl, t, wt('S3', 'middle') - 0.1, 1e9, { dy: 0 });
    attr(sXg, 'x1', xc.toFixed(1)); attr(sXg, 'y1', 300); attr(sXg, 'x2', xc.toFixed(1)); attr(sXg, 'y2', 340); sXg.style.opacity = t > wt('S3', 'middle') ? 1 : 0;
    const fz = t >= tS7 && t < tS10 + 0.5, ub = M.io((t - tS8 + 0.1) / 0.4) * (fz ? 1 : 0);
    sBr1(sx(0), xc, 420); sBr2(xc, sx(L12), 420); attr(sBrL1, 'x', ((sx(0) + xc) / 2).toFixed(1)); attr(sBrL2, 'x', ((xc + sx(L12)) / 2).toFixed(1));
    brkG.style.opacity = ub; s.querySelectorAll('path').forEach(() => 0);
    [...s.children].filter(e => e.tagName === 'path' && e.getAttribute('stroke') === XC).forEach(e => e.style.opacity = ub);
    vis($('#frz'), t, tS7 + 0.05, tS10 - 0.4, { ...POP, sc: 0.8 }); vis($('#simEq'), t, wt('S9', 'One') - 0.1, tS10 - 0.4, POP);
    // readout from rounded masses
    const m1r = Math.round(m.m1 * 100) / 100, m2r = Math.round(m.m2 * 100) / 100, Xr = Xof(m1r, m2r);
    M.setT($('#r_m1'), f2(m1r)); M.setT($('#r_m2'), f2(m2r)); M.setT($('#r_q'), f2(m2r / m1r)); M.setT($('#r_X'), f2(Xr)); M.setT($('#r_r1'), f2(Xr)); M.setT($('#r_r2'), f2(L12 - Xr));
    M.setT($('#roT'), m.run2 ? 'BOTH DOUBLED' : 'BALL 1 = 1 kg AT x = 0'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    $('#r_q').style.background = mix('#FFFFFF', '#EEF0F4', m.run2 ? M.io((t - tDbl) / 0.3) : 0);
    // graph
    plot(gGh, x => Xof(1, x), 0, t > tS1 + 0.8 ? 8 : 0);
    const maxM = t < tUp ? m.m2 : Math.max(m.m2, 1 + 2 + 5 * M.io((t - tUp) / 2.2));
    plot(gC1, x => Xof(1, x), 0, t > wt('S3', 'centre') - 0.2 ? Math.max(1, maxM) : 0);
    plot(gC2, x => Xof(2, x), 0, m.run2 ? 8 * M.io((t - tDbl) / 1.0) : 0);
    gDt(m.m2, X, t > wt('S3', 'centre') - 0.2);
    vis(gAs, t, wt('S6', 'never') - 0.1, 1e9, { dy: 0 }); vis(gAsL, t, wt('S6', 'never'), 1e9, { dy: 0 });
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 }); vis($('#lg1'), t, tDbl, 1e9, { dy: 0 });
    avD(t, wt('S5', 'Always') + 0.2, tS7 - 0.2);
    vis($('#th1'), t, tS10 + 0.05, OUT('S11'), { dy: 36, ...o });
    th1(t, { tin: tS10, tOpts: wt('S10', 'Does') - 0.1, tCount: T1('S10') + 0.05, dur: 3, tAns: tS11 - 0.02, tWhy: wt('S11', 'ratio') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    ST.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 26).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    dBr1(DX1, DXc, 262); dBr2(DXc, DX2, 262);
    const ub = M.io((t - tStep[3] + 0.1) / 0.4); [...dp.children].filter(e => e.tagName === 'path' && e.getAttribute('stroke') === XC).forEach(e => e.style.opacity = ub); dBrG.style.opacity = ub; dRat.style.opacity = M.io((t - wt('D5', 'closer')) / 0.4);
    vis($('#sgm'), t, wt('D6', 'many') - 0.1, 1e9, { dy: 10 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sxw = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sxw ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'centre') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'heavier') - 0.3, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.2, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'balance', 1) - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.4, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, T0('R5'), 1e9, { dy: 8 });
    rCoins.forEach((c, k) => vis(c, t, tR1 + 0.7 + k * 0.1, 1e9, { dy: -20 }));
    const uw = M.o3((t - tLk[0]) / 0.5), up = M.io((t - tLk[1]) / 0.4);
    rWc.set(QX + QP, QY + 4, QX + QP, QY + 4 + 90 * uw); rWr.set(QX + 15 * QP, QY + 4, QX + 15 * QP, QY + 4 + 90 * uw); rWl.forEach(e => e.style.opacity = up);
    const cx = QX + 8 * QP; rF.set(cx, QY + 2, 44); rCm.set(cx, QY - 15); vis(rF.o, t, tLk[2] - 0.1, 1e9, { dy: 0 }); vis(rCm.o, t, tLk[2], 1e9, { dy: 0 });
    rBr1(QX + QP, cx, QY - 70); rBr2(cx, QX + 15 * QP, QY - 70); const ub = M.io((t - wt('R5', 'eight') + 0.1) / 0.4);
    [...rr.children].filter(e => e.tagName === 'path' && e.getAttribute('stroke') === XC).forEach(e => e.style.opacity = ub); rBrG.style.opacity = ub;
    vis($('#rrEq'), t, wt('R5', 'balances') - 0.1, 1e9, POP);
    avR(t, wt('R4', 'centre') + 0.3, T0('R5') - 0.2);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kt'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kr'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    KS.forEach((q, i) => { const t0 = i ? tK2 : tK1, u = M.io((t - t0 - 0.6) / 0.8), xc = (q.xa + q.xb) / 2 + (q.xc - (q.xa + q.xb) / 2) * u;
      q.c.set(xc, q.y); q.f.set(xc, q.y + 8, 44); vis(q.c.o, t, t0 + 0.4, 1e9, { dy: 0 }); vis(q.f.o, t, t0 + 0.4, 1e9, { dy: 0 });
      q.b1(q.xa, q.xc, 350); q.b2(q.xc, q.xb, 350); const ub = M.io((t - t0 - 1.5) / 0.4); [...q.sv.children].filter(e => e.tagName === 'path' && e.getAttribute('stroke') === XC).forEach(e => e.style.opacity = ub); q.bg.style.opacity = ub; });
    vis($('#ktP'), t, wt('K1', 'middle') - 0.1, 1e9, POP); vis($('#krP'), t, wt('K2', 'quarters') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Every') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    WB.forEach((b, i) => vis(b.o, t, [wt('W2', 'One'), wt('W2', 'Two'), wt('W2', 'Three')][i], 1e9, { dy: -20 }));
    vis(wTri, t, tW[0], 1e9, { dy: 0 }); M.draw(wGx, t, tW[1] + 0.5, 0.5); M.draw(wGy, t, tW[2] + 0.5, 0.5);
    vis(wCm.o, t, tW[3] - 0.1, 1e9, { dy: 0 }); vis(wCmL, t, tW[3], 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'halfway') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'Otherwise') });
    [tB1.o, tB2.o].forEach((e, i) => vis(e, t, tX1 + 0.5 + i * 0.1, 1e9, { dy: 0 })); vis(tWr, t, wt('X2', 'halfway'), 1e9, { dy: 0 });
    vis(tCm.o, t, wt('X3', 'closer') - 0.1, 1e9, { dy: 0 }); vis(tCmL, t, wt('X3', 'closer'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'two') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.2, tCount, tAns });
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
