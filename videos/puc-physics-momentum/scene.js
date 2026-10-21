// PUC Physics Ep 54: Momentum (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink;   // momentum plum, force orange, a red, v blue, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const pv = tc(PC, '\\vec{p}'), pp = tc(PC, 'p'), vv = tc(VC, '\\vec{v}'), v_ = tc(VC, 'v'), mm = tc(MC, 'm'), Fv = tc(FC, '\\vec{F}'), FF = tc(FC, 'F'), aa = tc(AC, 'a');
const f2 = v => v.toFixed(2), f1 = v => v.toFixed(1);
const ind = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');   // below one lakh, Indian = international grouping
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
// simple side-view drawings (no brands)
const truck = (p, s = 1) => { const g = mk(p, 'g', {});
  mk(g, 'rect', { x: 0, y: -122 * s, width: 190 * s, height: 96 * s, rx: 6 * s, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'path', { d: `M${196 * s},${-26 * s} V${-92 * s} H${238 * s} L${266 * s},${-58 * s} V${-26 * s} Z`, fill: C.ink });
  mk(g, 'path', { d: `M${206 * s},${-60 * s} V${-84 * s} H${234 * s} L${252 * s},${-60 * s} Z`, fill: '#DCE7FC' });
  [44, 150, 230].forEach(x => { mk(g, 'circle', { cx: x * s, cy: -18 * s, r: 18 * s, fill: C.ink }); mk(g, 'circle', { cx: x * s, cy: -18 * s, r: 7 * s, fill: '#fff' }); });
  return g; };
const ballD = (p, r) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill: '#B23A3A', stroke: C.ink, 'stroke-width': 2.5 }); mk(g, 'path', { d: `M${-r * 0.35},${-r * 0.92} Q${r * 0.1},0 ${-r * 0.35},${r * 0.92}`, fill: 'none', stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '3 3' }); return g; };
const cartD = (p, w, label, TY) => { const g = mk(p, 'g', {}), BT = TY - 68;
  mk(g, 'rect', { x: 0, y: BT, width: w, height: 48, rx: 8, fill: C.ink });
  txt(g, w / 2, BT + 31, label, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
  [26, w - 26].forEach(x => mk(g, 'circle', { cx: x, cy: TY - 13, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }));
  return g; };

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 17a2 2 0 1 0 0-.01', 'M9 17h6', 'M17 17a2 2 0 1 0 0-.01'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M17 18a2 2 0 1 0 0-.01', 'M7 18a2 2 0 1 0 0-.01'],
  arrowL: ['M19 12H5', 'm12 19-7-7 7-7'],
  football: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 7l4 3-1.5 4.5h-5L8 10z', 'M12 2v5', 'M16 10l5-1.5', 'M14.5 14.5l3 4.5', 'M9.5 14.5l-3 4.5', 'M8 10L3 8.5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tV1 = T0('V1'), tV4 = T0('V4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['football', 'Football', 'ROLLING SLOWLY · EASY STOP', '0.43 kg', '1 m/s'], ['car', 'Car', 'JUST AS SLOW · HARD STOP', '1000 kg', '1 m/s'], ['ball', 'Cricket ball', 'FAST · STINGS YOUR HANDS', '0.16 kg', '40 m/s']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'football'), wt('H1', 'car'), wt('H2', 'cricket')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, m, v], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jc" id="jm${i}" style="color:${MC}">${m}</div><div class="jc" id="jv${i}" style="right:24px;color:${VC}">${v}</div></div>`).join('');
const TILES = [[C.ink, '10,000 kg · 1 m/s', 'truck'], [C.ink, '0.16 kg · 40 m/s', 'ball'], [C.ac, 'Which is harder to stop?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'truck'), wt('H3', 'cricket'), wt('H4', 'Which')];
// hook scene: road, college gate, a creeping truck and a flying ball (40x faster: 12 px/s vs 480 px/s)
const hs = $('#hkS'), HG = 330;
mk(hs, 'rect', { x: 36, y: HG, width: 712, height: 50, fill: '#E6E3DA' });
mk(hs, 'line', { x1: 48, y1: HG + 25, x2: 736, y2: HG + 25, stroke: '#fff', 'stroke-width': 4, 'stroke-dasharray': '22 18' });
mk(hs, 'line', { x1: 36, y1: HG, x2: 748, y2: HG, stroke: C.ink, 'stroke-width': 3 });
[628, 708].forEach(x => mk(hs, 'rect', { x, y: 150, width: 28, height: HG - 150, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 }));
mk(hs, 'path', { d: 'M628,150 Q682,104 736,150', fill: 'none', stroke: C.ink, 'stroke-width': 4 });
txt(hs, 682, 172, 'GATE', { 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, fill: C.ink });
const hTrO = mk(hs, 'g', {}), hTr = mk(hTrO, 'g', {}); truck(hTr, 1); attr(hTr, 'transform', `translate(60,${HG})`);
const hTl = txt(hs, 0, HG - 140, '1 m/s', { fill: VC, 'font-weight': 600, 'font-size': 22 });
const hBg = [0, 1, 2].map(k => { const o = mk(hs, 'g', {}); ballD(o, 16); o.style.opacity = 0; return o; });
const hBo = mk(hs, 'g', {}), hB = mk(hBo, 'g', {}); ballD(hB, 16);
const hBl = txt(hs, 350, 92, '40 m/s', { fill: VC, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'middle' });
const hFl = [wt('H3', 'flies'), wt('H4', 'forty')];
const hBall = t => { let x = null; hFl.forEach(f => { if (t >= f && t < f + 1.6) x = 20 + 480 * (t - f); }); return x; };

/* ---------- P: what momentum is ---------- */
const QR = [['p', PC, 'Momentum', 'mass times velocity', 'kg m/s'], ['m', MC, 'Mass', 'how much matter', 'kg'], ['v', VC, 'Velocity', 'speed with a direction', 'm/s']];
$('#qrs').innerHTML = QR.map(([s, c, n, d, u], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 118}px"><div class="qs" style="color:${c}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div><div class="qu" style="color:${c}">${u}</div></div>`).join('');
const tQr = [wt('P1', 'Momentum'), wt('P3', 'Kilograms'), wt('P3', 'metres')];
$('#pmF').innerHTML = K(`${pv} = ${mm}\\,${vv}`);
$('#pmU').innerHTML = K(`\\text{kg} \\times \\text{m/s} = ${tc(PC, '\\text{kg m/s}')}`);
const ps = $('#pmS'), PG = 470, tP4 = T0('P4'), tPm = wt('P4', 'mass'), tPs = wt('P4', 'speed'), tPgo = wt('P4', 'direction');
ground(ps, 40, 744, PG);
const pcO = mk(ps, 'g', {}), pc = mk(pcO, 'g', {}); cartD(pc, 120, '1 kg', PG);
const pBlk = mk(pc, 'g', {}); mk(pBlk, 'rect', { x: 14, y: PG - 108, width: 92, height: 38, rx: 5, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 }); txt(pBlk, 60, PG - 82, '+1 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const pA_v = PUC.arrow(ps, VC, 6, 18), pA_p = PUC.arrow(ps, PC, 8, 20);
const pL_v = it(ps, 0, 0, 'v', VC, { 'font-size': 28 }), pL_p = it(ps, 0, 0, 'p', PC, { 'font-size': 28 });
const pEq = txt(ps, 36, 286, '', { fill: PC, 'font-weight': 600, 'font-size': 30 });
const pX = t => { const a = Math.max(0, Math.min(t, tPs) - tPgo), b = Math.max(0, t - tPs); return 60 + 30 * a + 45 * b; };

/* ---------- S: ball and cart sim ---------- */
const s = $('#simS'), YA = 250, YB = 430, PX = 34, X0 = 70, RB = 20, CW = 100, BTc = YB - 68;
const PV = 14, PP = 40, PF = 12;                       // px per m/s, per kg m/s, per N
ground(s, 40, 744, YA); ground(s, 40, 744, YB);
for (let k = 0; k <= 18; k += 2) { const x = X0 + PX * k; mk(s, 'line', { x1: x, y1: YB, x2: x, y2: YB + 10, stroke: C.ink, 'stroke-width': 2 }); txt(s, x, YB + 38, k, { 'text-anchor': 'middle', 'font-size': 15 }); }
txt(s, 744, YB + 38, 'm', { 'text-anchor': 'end', 'font-size': 15 });
txt(s, 40, YA + 46, 'BALL · 0.5 kg', { 'font-size': 17, 'font-weight': 600, fill: C.ink });
txt(s, 744, YB - 120, 'CART · 2 kg', { 'text-anchor': 'end', 'font-size': 17, 'font-weight': 600, fill: C.ink });
const gB = [0, 1, 2].map(() => { const o = mk(s, 'g', {}); ballD(o, RB); o.style.opacity = 0; return o; });
const gC = [0, 1, 2].map(() => { const o = mk(s, 'rect', { y: BTc, width: CW, height: 48, rx: 8, fill: C.ink, opacity: 0 }); return o; });
const sbO = mk(s, 'g', {}), sb = mk(sbO, 'g', {}); ballD(sb, RB);
const scO = mk(s, 'g', {}), sc = mk(scO, 'g', {}); cartD(sc, CW, '2 kg', YB);
const aVb = PUC.arrow(s, VC, 6, 16), aPb = PUC.arrow(s, PC, 8, 20), aVc = PUC.arrow(s, VC, 6, 16), aPc = PUC.arrow(s, PC, 8, 20), aFb = PUC.arrow(s, FC, 7, 18), aFc = PUC.arrow(s, FC, 7, 18);
const lVb = it(s, 0, 0, 'v', VC, { 'font-size': 26 }), lPb = it(s, 0, 0, 'p', PC, { 'font-size': 26 }), lVc = it(s, 0, 0, 'v', VC, { 'font-size': 26 }), lPc = it(s, 0, 0, 'p', PC, { 'font-size': 26 });
const lFb = txt(s, 0, 0, '8 N', { fill: FC, 'font-weight': 700, 'font-size': 20 }), lFc = txt(s, 0, 0, '8 N', { fill: FC, 'font-weight': 700, 'font-size': 20 });
// runs: [start, v ball, v cart]; each plays RD seconds of sim time, then holds
const RD = 1.5, R = [[wt('S2', 'Both') - 0.1, 2, 2], [wt('S4', 'eight') - 0.1, 8, 2]];
const tFz = wt('S6', 'Freeze') + 0.15, tRes = wt('S7', 'Times') - 0.1, tGrow = wt('S6', 'draw');
const SLOW = 0.125, CR = 0.6, tStop = wt('S9', 'each') + 0.3 - 0.5 / SLOW, tCr = Math.max(tS8 + 0.3, tStop - CR);  // stop in 0.5 s, shown at 0.125x
function sim(t) {
  if (t >= tCr) {                                     // stop run: cruise CR s, then stop both in 0.5 s (slow-mo)
    if (t < tStop) { const tau = Math.min(t - tCr, CR); return { xb: 8 * tau, xc: 2 * tau, vb: 8, vc: 2, F: 0, tau, mv: true }; }
    const u = Math.min(SLOW * (t - tStop), 0.5), k = 1 - u / 0.5;
    return { xb: 8 * CR + 8 * u - 8 * u * u, xc: 2 * CR + 2 * u - 2 * u * u, vb: 8 * k, vc: 2 * k, F: u < 0.5 ? 8 : 0, tau: CR + u, mv: u < 0.5, slow: true };
  }
  if (t >= tS6) {                                     // slow-mo replay of run 2
    const tau = t < tFz ? 0.25 * (t - tS6) : t < tRes ? 0.25 * (tFz - tS6) : Math.min(RD, 0.25 * (tFz - tS6) + 0.25 * (t - tRes));
    return { xb: 8 * tau, xc: 2 * tau, vb: 8, vc: 2, F: 0, tau, mv: (t < tFz || t > tRes) && tau < RD, rep: true };
  }
  let r = null; for (const q of R) if (t >= q[0]) r = q;
  if (!r) return { xb: 0, xc: 0, vb: 0, vc: 0, F: 0, tau: 0, mv: false, pre: true };
  const tau = Math.min(t - r[0], RD);
  return { xb: r[1] * tau, xc: r[2] * tau, vb: r[1], vc: r[2], F: 0, tau, mv: tau < RD };
}
$('#roT').innerHTML = `<span></span><span class="h">BALL</span><span></span><span class="h">CART</span><span></span>
  <span class="k" style="color:${MC}">m</span><span class="v">0.50</span><span class="u">kg</span><span class="v">2.00</span><span class="u">kg</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_vb" style="color:${VC}">0.00</span><span class="u">m/s</span><span class="v" id="r_vc" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${PC}">p</span><span class="v" id="r_pb" style="color:${PC}">0.00</span><span class="u">kg m/s</span><span class="v" id="r_pc" style="color:${PC}">0.00</span><span class="u">kg m/s</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_Fb" style="color:${FC}">0</span><span class="u">N</span><span class="v" id="r_Fc" style="color:${FC}">0</span><span class="u">N</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 520, h: 156, xmax: 9, ymax: 8, xt: [0, 2, 4, 6, 8], yt: [0, 2, 4, 6, 8], xl: 'v (m/s)', yl: 'p (kg m/s)' });
const gLb = mk($('#grS'), 'path', { d: `M${g.X(0)},${g.Y(0)} L${g.X(9)},${g.Y(4.5)}`, stroke: PC, 'stroke-width': 3, fill: 'none', opacity: 0.55 });
const gLc = mk($('#grS'), 'path', { d: `M${g.X(0)},${g.Y(0)} L${g.X(4)},${g.Y(8)}`, stroke: PC, 'stroke-width': 3, fill: 'none', opacity: 0.55 });
const gTb = txt($('#grS'), g.X(9) + 10, g.Y(4.5) + 6, 'ball', { fill: PC, 'font-weight': 600, 'font-size': 18 });
const gTc = txt($('#grS'), g.X(4) + 12, g.Y(8) + 6, 'cart', { fill: PC, 'font-weight': 600, 'font-size': 18 });
const gSl = txt($('#grS'), 748, 40, 'slope = mass', { fill: C.ink, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
const gEq = mk($('#grS'), 'line', { x1: g.X(0), y1: g.Y(4), x2: g.X(9), y2: g.Y(4), stroke: PC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gEqL = txt($('#grS'), g.X(5.2), g.Y(4) - 10, 'same p = 4', { fill: PC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'middle' });
const dB = mk($('#grS'), 'circle', { r: 10, fill: '#fff', stroke: PC, 'stroke-width': 4, cx: -99, cy: -99 });
const dC = mk($('#grS'), 'circle', { r: 11, fill: PC, cx: -99, cy: -99 });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So a light, fast ball can match a heavy cart!' });

/* ---------- D: from p = mv to F = dp/dt ---------- */
const STEPS = [[`${pv} = ${mm}\\,${vv}`, 'momentum, in kg m/s'],
  [`${FF} = ${mm}\\,${aa}, \\quad ${aa} = d${v_}/dt`, 'Newton\'s second law, from Ep 52'],
  [`${mm}\\,d${v_}/dt = d(${mm}${v_})/dt = d${pp}/dt`, 'true only when m does not change'],
  [`${Fv} = d${pv}/dt`, 'net force = rate of change of momentum'],
  [`${FF} = \\Delta ${pp}/\\Delta t = 4/0.5 = ${tc(FC, '8\\ \\text{N}')}`, 'steady force · 1 N s = 1 kg m/s']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dS = $('#drS'), dg = PUC.graph(dS, { x: 110, y: 96, w: 560, h: 290, xmax: 1, ymax: 5, xt: [0, 0.25, 0.5, 0.75], yt: [0, 1, 2, 3, 4], xl: 't (s)', yl: 'p (kg m/s)' });
const pt = s0 => s0 < 0.5 ? 4 : 4 - 8 * (s0 - 0.5);
const dC1 = dg.curve(PC, 7), dC2 = dg.curve('#FFFFFF', 2.5); dS.lastElementChild.setAttribute('stroke-dasharray', '8 8');
const dLg = txt(dS, dg.X(0.04), dg.Y(4) - 16, 'ball and cart: one line', { fill: PC, 'font-weight': 600, 'font-size': 18 });
const dTh = mk(dS, 'line', { x1: dg.X(0.5), y1: dg.Y(4), x2: dg.X(1), y2: dg.Y(4), stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dTv = mk(dS, 'line', { x1: dg.X(1), y1: dg.Y(4), x2: dg.X(1), y2: dg.Y(0), stroke: PC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dTl1 = txt(dS, dg.X(0.75), dg.Y(4) - 14, 'Δt = 0.5 s', { fill: C.ink, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'middle' });
const dTl2 = txt(dS, dg.X(1) + 12, dg.Y(2) + 6, 'Δp = 4', { fill: PC, 'font-weight': 600, 'font-size': 20 });
const dSl = txt(dS, dg.X(0.62), dg.Y(1.2), 'slope = -8 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'end' });
const dDot = dg.dot(PC, 11);
$('#drF').innerHTML = K(`${FF} = \\dfrac{\\Delta ${pp}}{\\Delta t} = \\dfrac{4}{0.5} = ${tc(FC, '8\\ \\text{N}')}`);
$('#stF').innerHTML = K(`${Fv} = \\dfrac{d${pv}}{dt}`);

/* ---------- K: slow truck vs fast ball ---------- */
const kt = $('#ktS'), KG = 270;
ground(kt, 40, 744, KG);
const kTrO = mk(kt, 'g', {}), kTr = mk(kTrO, 'g', {}); truck(kTr, 0.9);
const kVt = PUC.arrow(kt, VC, 6, 14), kPt = PUC.arrow(kt, PC, 10, 24);
const kVtl = txt(kt, 0, KG + 52, 'v = 1 m/s', { fill: VC, 'font-weight': 600, 'font-size': 20 });
const kPtl = txt(kt, 60, KG + 76, '', { fill: PC, 'font-weight': 700, 'font-size': 20 });
$('#ktF').innerHTML = K(`${pp} = 10{,}000 \\times 1 = ${tc(PC, '10{,}000\\ \\text{kg m/s}')}`);
const kb = $('#kbS');
ground(kb, 40, 744, KG);
const kBg = [0, 1, 2].map(() => { const o = mk(kb, 'g', {}); ballD(o, 18); o.style.opacity = 0; return o; });
const kBo = mk(kb, 'g', {}), kB = mk(kBo, 'g', {}); ballD(kB, 18);
const kVb = PUC.arrow(kb, VC, 6, 16), kVbl = txt(kb, 0, KG + 52, 'v = 40 m/s', { fill: VC, 'font-weight': 600, 'font-size': 20 });
const kPbD = mk(kb, 'circle', { cx: 60, cy: KG + 70, r: 4, fill: PC }), kPbl = txt(kb, 76, KG + 76, 'p = 6.4: too small to draw at this scale', { fill: PC, 'font-weight': 700, 'font-size': 20 });
$('#kbF').innerHTML = K(`${pp} = 0.16 \\times 40 = ${tc(PC, '6.4\\ \\text{kg m/s}')}`);
const kFl = [wt('K2', 'ball'), wt('K2', 'forty') + 0.3, wt('K2', 'Just')];
const kBall = t => { let x = null; kFl.forEach(f => { if (t >= f && t < f + 1.7) x = 40 + 480 * (t - f); }); return x; };
$('#ktP') || $('#kt').insertAdjacentHTML('beforeend', `<div class="kp" id="ktP">Huge mass, small speed: <b class="pm">huge p</b></div>`);
const avA = PUC.avatar($('#sK'), { x: 976 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Forty times faster, and still tiny!' });
const th1 = PUC.think($('#th1'), { q: 'Both must stop in one second. Which needs the bigger force?', opts: ['The truck', 'The ball', 'Both the same'], right: 0, why: 'F = Δp / Δt: same 1 s, but the truck has far more momentum.' });

/* ---------- V: direction ---------- */
const vs = $('#vsS'), VG = 360, VZ = 392;
ground(vs, 40, 744, VG);
mk(vs, 'line', { x1: VZ, y1: VG, x2: VZ, y2: VG + 14, stroke: C.ink, 'stroke-width': 3 });
txt(vs, VZ, VG + 44, '0', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
txt(vs, 48, VG + 44, 'WEST · negative', { 'font-size': 17, 'font-weight': 600 });
txt(vs, 736, VG + 44, 'EAST · positive', { 'font-size': 17, 'font-weight': 600, 'text-anchor': 'end' });
const vcO = mk(vs, 'g', {}), vc = mk(vcO, 'g', {}); cartD(vc, 120, '2 kg', VG);
const vGh = [0, 1, 2].map(() => mk(vs, 'rect', { y: VG - 68, width: 120, height: 48, rx: 8, fill: C.ink, opacity: 0 }));
const vAv = PUC.arrow(vs, VC, 6, 18), vAp = PUC.arrow(vs, PC, 9, 22);
const vLv = it(vs, 0, 0, 'v', VC, { 'font-size': 28 }), vLp = it(vs, 0, 0, 'p', PC, { 'font-size': 28 });
const vEq = document.createElement('div'); vEq.className = 'fx'; vEq.style.cssText = 'left:36px;top:84px;font-size:34px'; $('#vs').appendChild(vEq);
const EQE = K(`${pp} = ${mm}${v_} = 2 \\times (+3) = ${tc(PC, '+6\\ \\text{kg m/s}')}`), EQW = K(`${pp} = ${mm}${v_} = 2 \\times (-3) = ${tc(PC, '-6\\ \\text{kg m/s}')}`);
const tVgo = T0('V2') + 0.2, tRev = wt('V3', 'west') - 0.2, VPX = 40 / 3;     // the 3 m/s cart moves 40 px/s on screen (not to scale)
const vVel = t => t < tVgo ? 0 : t < tRev ? 3 : 3 - 6 * M.io((t - tRev) / 0.6);
const vPos = t => { let x = 150; if (t <= tVgo) return x; x += VPX * 3 * (Math.min(t, tRev) - tVgo); if (t <= tRev) return x;
  const e = Math.min(t, tRev + 0.6), n = 24; for (let i = 0; i < n; i++) { const a = tRev + (e - tRev) * i / n, b = tRev + (e - tRev) * (i + 1) / n; x += VPX * vVel((a + b) / 2) * (b - a); }
  if (t > tRev + 0.6) x -= VPX * 3 * (t - tRev - 0.6); return x; };
$('#sgs').innerHTML = [['East', '+3 m/s', '+6', 'arrowR'], ['West', '-3 m/s', '-6', 'arrowL']].map(([d, v, p, ic], i) => `<div class="sg" id="sg${i}" style="top:${84 + i * 104}px"><div class="a" style="display:flex;align-items:center;gap:12px">${M.icon(ic, 28, VC, 2.6)}${d} &nbsp;<span class="mono" style="font-size:24px;color:${VC}">v = ${v}</span></div><div class="b">${K(`${pp} = ${tc(PC, p + '\\ \\text{kg m/s}')}`)}</div></div>`).join('') +
  `<div class="pillp ink" id="sgP" style="left:36px;top:300px">Same size, opposite direction: different momentum</div><svg id="sgS" width="784" height="580" style="position:absolute;left:0;top:0"></svg>`;
const ns = $('#sgS'), NY = 470, NZ = 392, NU = 46;
mk(ns, 'line', { x1: 80, y1: NY, x2: 704, y2: NY, stroke: C.ink, 'stroke-width': 2.5 });
for (let k = -6; k <= 6; k += 2) { mk(ns, 'line', { x1: NZ + NU * k, y1: NY - 8, x2: NZ + NU * k, y2: NY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ns, NZ + NU * k, NY + 34, (k > 0 ? '+' : '') + k, { 'text-anchor': 'middle', 'font-size': 17 }); }
txt(ns, 36, NY - 60, 'p ON A NUMBER LINE (kg m/s)', { 'font-size': 17, 'font-weight': 600 });
const nAe = PUC.arrow(ns, PC, 8, 20), nAw = PUC.arrow(ns, PC, 8, 20);
const th2 = PUC.think($('#th2'), { q: 'A 2 kg cart goes east at 3 m/s. A 3 kg cart goes west at 2 m/s. Same momentum?', opts: ['Yes', 'No'], right: 1, why: 'Both have size 6 kg m/s, but +6 is not -6: opposite ways.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A loaded van of ${K('1200\\ \\text{kg}')} speeds up from ${K(tc(VC, '10\\ \\text{m/s}'))} to ${K(tc(VC, '25\\ \\text{m/s}'))} in ${K('5\\ \\text{s}')}. Find the change in momentum and the net force.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${pp}_1 = 1200 \\times 10 = ${tc(PC, '12{,}000\\ \\text{kg m/s}')}`)],
  [K(`${pp}_2 = 1200 \\times 25 = ${tc(PC, '30{,}000\\ \\text{kg m/s}')}`)],
  [K(`\\Delta ${pp} = 30{,}000 - 12{,}000 = ${tc(PC, '18{,}000\\ \\text{kg m/s}')}`)],
  [K(`${FF} = \\dfrac{18{,}000}{5} = ${tc(FC, '3600\\ \\text{N}')} = 1200 \\times 3`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 82 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WG = 214, tW0 = T0('W2') + 0.6;
ground(w, 40, 744, WG);
const vanO = mk(w, 'g', {}), van = mk(vanO, 'g', {});
mk(van, 'path', { d: `M0,${WG - 22} V${WG - 82} H118 L150,${WG - 54} H160 V${WG - 22} Z`, fill: '#E8E2D2', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(van, 'path', { d: `M122,${WG - 76} L144,${WG - 54} H122 Z`, fill: '#DCE7FC', stroke: C.ink, 'stroke-width': 2 });
txt(van, 58, WG - 44, '1200 kg', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 });
[34, 128].forEach(x => { mk(van, 'circle', { cx: x, cy: WG - 16, r: 16, fill: C.ink }); mk(van, 'circle', { cx: x, cy: WG - 16, r: 6, fill: '#fff' }); });
const wAv = PUC.arrow(w, VC, 6, 16), wAp = PUC.arrow(w, PC, 8, 20);
const wLv = it(w, 0, 0, 'v', VC, { 'font-size': 26 }), wLp = it(w, 0, 0, 'p', PC, { 'font-size': 26 });
const wg = PUC.graph(w, { x: 160, y: 292, w: 500, h: 180, xmax: 5.4, ymax: 32000, xt: [0, 1, 2, 3, 4, 5], yt: [0, 10000, 20000, 30000], xl: 't (s)', yl: 'p (kg m/s)' });
[...w.querySelectorAll('text')].forEach(e => { if (/^\d{5}$/.test(e.textContent)) e.textContent = ind(+e.textContent); });
const wCv = wg.curve(PC, 6), wDot = wg.dot(PC, 10);
const wP1 = txt(w, wg.X(0) + 14, wg.Y(12000) + 30, 'p₁', { fill: PC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
const wP2 = txt(w, wg.X(5) - 14, wg.Y(30000) - 12, 'p₂', { fill: PC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic', 'text-anchor': 'end' });
const wBr = mk(w, 'path', { d: `M${wg.X(5) + 12},${wg.Y(30000)} h10 V${wg.Y(12000)} h-10`, fill: 'none', stroke: PC, 'stroke-width': 3 });
const wBl = txt(w, wg.X(5) + 28, wg.Y(21000) + 6, 'Δp', { fill: PC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
const wSl = txt(w, wg.X(2.2), wg.Y(27000), 'slope = 3600 N', { fill: FC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' });
const wRo = txt(w, 36, 556, '', { 'font-size': 22, 'font-weight': 600, fill: C.ink });
const wTau = t => M.clamp(t - tW0, 0, 5);
const tW = [wt('W3', 'Starting'), wt('W4', 'Final'), wt('W5', 'So'), wt('W6', 'Force')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'p = 1000 × 72 = 72,000 kg m/s', right: 'p = 1000 × 20 = 20,000 kg m/s' });
const tp = $('#tpS');
const TB = [['72 km/h', C.ink, 40], ['20 m/s', VC, 330]].map(([s0, c, x]) => { const o = mk(tp, 'g', {}); mk(o, 'rect', { x, y: 100, width: 170, height: 72, rx: 14, fill: '#fff', stroke: c, 'stroke-width': 3 }); txt(o, x + 85, 146, s0, { 'text-anchor': 'middle', fill: c, 'font-weight': 700, 'font-size': 28 }); return o; });
const tA = PUC.arrow(tp, C.ink, 4, 14), tAl = txt(tp, 270, 88, '÷ 3.6', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 24 });
const tUl = txt(tp, 280, 216, 'speed in m/s first', { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Find p or its change, then the force as the change in p over the time' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 352,
  q: `A ${K('2\\ \\text{kg}')} body moves along a line. Its momentum is <span style="white-space:nowrap">${K('p = (4t^2 + 6t)\\ \\text{kg m/s}')}</span>, with ${K('t')} in seconds. Find the force on it and its acceleration at ${K('t = 2\\ \\text{s}')}.`,
  opts: ['22 N, 11 m/s²', '28 N, 14 m/s²', '14 N, 7 m/s²', '22 N, 44 m/s²'], right: 0 });
const so = PUC.solution($('#so'), [[K(`${FF} = \\dfrac{d${pp}}{dt} = 8t + 6`)], [K(`t = 2:\\; ${FF} = 16 + 6 = 22\\ \\text{N}`)], [K(`${aa} = \\dfrac{${FF}}{${mm}} = \\dfrac{22}{2} = ${tc(C.ok, '11\\ \\text{m/s}^2')}`)], [K(`28 = ${pp}(2), \\text{ not } ${FF}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Force'), wt('A3', 'At'), wt('A4', 'Then'), wt('A4', 'Twenty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · momentum', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${pv} = ${mm}\\,${vv} \\qquad ${Fv} = d${pv}/dt`),
    `<span class="pm">p</span> points along <span class="vb">v</span> &nbsp;·&nbsp; unit kg m/s = N s`,
    `<span class="fo">F</span> = m<span class="ar">a</span> is the case when the mass is fixed`,
    `Same stopping time: more <span class="pm">p</span> needs more <span class="fo">force</span>`] });
const YQ = ['A slow truck or a fast cricket ball: which has more momentum?', 'Why is momentum a vector?', 'How does F = dp/dt become F = ma?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 55', topic: 'Same egg, same speed: one catch breaks it. Why? Impulse', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS8 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const w0 = $('#wq0'), w1 = $('#wq1'), w2 = $('#wq2'); w0.style.left = '36px'; w1.style.left = (36 + w0.offsetWidth + 16) + 'px'; w2.style.left = '36px'; w2.style.top = '506px'; w0.style.top = w1.style.top = '438px';
  JOBS.forEach((_, i) => { const v = $('#jv' + i), m = $('#jm' + i); m.style.left = (712 - 24 - v.offsetWidth - 12 - m.offsetWidth) + 'px'; });
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
    vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const on = M.io((t - wt('H2', 'decides') + 0.1) / 0.3); [$('#jm' + i), $('#jv' + i)].forEach(c => { c.style.background = mix('#FFFFFF', C.ac2, on); }); });
    vis($('#hjP'), t, wt('H2', 'decides') + 0.3, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const trx = 60 + 12 * Math.max(0, t - wt('H3', 'creeps'));
    attr(hTr, 'transform', `translate(${trx.toFixed(1)},${HG})`); vis(hTrO, t, wt('H3', 'truck') - 0.2, 1e9, { dx: -30, dy: 0 });
    attr(hTl, 'x', (trx + 120).toFixed(1)); vis(hTl, t, wt('H3', 'creeps'), 1e9, { dy: 6 });
    const bx = hBall(t); M.hide(hBo, bx === null); if (bx !== null) attr(hB, 'transform', `translate(${bx.toFixed(1)},110)`);
    hBg.forEach((gh, k) => { const gx = hBall(t - 0.05 * (k + 1)); if (bx !== null && gx !== null) { attr(gh, 'transform', `translate(${gx.toFixed(1)},110)`); gh.style.opacity = [0.3, 0.2, 0.12][k]; } else gh.style.opacity = 0; });
    vis(hBl, t, hFl[0] + 0.3, 1e9, { dy: 6 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.1, 1e9, POP);
      const on = i === 0 ? M.io((t - wt('P2', 'p', 1)) / 0.3) * (1 - M.io((t - tQr[1]) / 0.3)) + M.io((t - tP4) / 0.3) : i === 2 ? M.io((t - wt('P4', 'Velocity')) / 0.3) * (1 - M.io((t - wt('P4', 'momentum')) / 0.3)) : 0;
      el.style.background = mix(C.soft, C.ac2, on); });
    vis($('#nwt'), t, wt('P5', 'Newton') - 0.1, 1e9, { dy: 16 });
    vis($('#pm'), t, wt('P2', 'p') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pmF'), t, wt('P2', 'equals') - 0.1, 0.8);
    PUC.write($('#pmU'), t, wt('P3', 'So') - 0.1, 0.8);
    const X = pX(t), m = t < tPm ? 1 : 2, v = t < tPs ? 2 : 3, ext = M.o3((t - tP4 - 0.3) / 0.5);
    attr(pc, 'transform', `translate(${X.toFixed(1)},0)`); vis(pcO, t, tP4 - 0.1, 1e9, { dx: -30, dy: 0 });
    vis(pBlk, t, tPm - 0.1, 1e9, { dy: -40, sp: M.SOFT });
    const vL = 40 * M.lerp(2, 3, M.io((t - tPs) / 0.4)) * ext, pL = 30 * M.lerp(2, 4, M.io((t - tPm) / 0.4)) * (1 + 0.5 * M.io((t - tPs) / 0.4)) * ext, cx = X + 60;
    pA_v.set(cx, PG - 128, cx + vL, PG - 128); attr(pL_v, 'x', (cx + vL + 8).toFixed(1)); attr(pL_v, 'y', PG - 119); pL_v.style.opacity = ext.toFixed(3);
    pA_p.set(cx, PG - 168, cx + pL, PG - 168); attr(pL_p, 'x', (cx + pL + 8).toFixed(1)); attr(pL_p, 'y', PG - 159); pL_p.style.opacity = ext.toFixed(3);
    M.setT(pEq, `p = ${m} × ${v} = ${m * v} kg m/s`); vis(pEq, t, tP4 + 0.3, 1e9, { dy: 8 });
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = sim(t);
    const bcx = X0 + RB + PX * S.xb, ccl = X0 + PX * S.xc;
    attr(sb, 'transform', `translate(${bcx.toFixed(1)},${YA - RB})`); attr(sc, 'transform', `translate(${ccl.toFixed(1)},0)`);
    vis(sbO, t, tS1 + 0.5, 1e9, { dx: -30, dy: 0 }); vis(scO, t, tS1 + 0.6, 1e9, { dx: -30, dy: 0 });
    const dt0 = S.slow ? 0.6 : S.rep ? 0.4 : 0.07;
    [0, 1, 2].forEach(k => { const q = sim(t - dt0 * (k + 1)), gbx = X0 + RB + PX * q.xb, gcl = X0 + PX * q.xc, sameRun = q.tau <= S.tau && !q.pre && (!!q.slow === !!S.slow || S.slow) && (t - dt0 * (k + 1) >= (S.slow ? tCr : S.rep ? tS6 : 0));
      attr(gB[k], 'transform', `translate(${gbx.toFixed(1)},${YA - RB})`); gB[k].style.opacity = S.mv && sameRun && gbx < bcx - 6 ? [0.3, 0.2, 0.12][k] : 0;
      attr(gC[k], 'x', gcl.toFixed(1)); gC[k].style.opacity = S.mv && sameRun && gcl < ccl - 6 ? [0.3, 0.2, 0.12][k] : 0; });
    // vectors grow from each body: v blue, p plum, stopping force orange (pushes on the front)
    const rep = S.rep, grow = rep ? M.o3((t - tGrow) / 0.5) : 1, on = S.pre ? 0 : grow;
    const vbL = PV * S.vb * on, pbL = PP * 0.5 * S.vb * on, vcL = PV * S.vc * on, pcL = PP * 2 * S.vc * on;
    const by = YA - 2 * RB, cy = BTc;
    aVb.set(bcx, by - 16, bcx + vbL, by - 16); attr(lVb, 'x', (bcx + vbL + 8).toFixed(1)); attr(lVb, 'y', by - 8); lVb.style.opacity = vbL > 8 ? 1 : 0;
    aPb.set(bcx, by - 48, bcx + pbL, by - 48); attr(lPb, 'x', (bcx + pbL + 8).toFixed(1)); attr(lPb, 'y', by - 40); lPb.style.opacity = pbL > 8 ? 1 : 0;
    const ccx = ccl + CW / 2;
    aVc.set(ccx, cy - 16, ccx + vcL, cy - 16); attr(lVc, 'x', (ccx + vcL + 8).toFixed(1)); attr(lVc, 'y', cy - 8); lVc.style.opacity = vcL > 8 ? 1 : 0;
    aPc.set(ccx, cy - 48, ccx + pcL, cy - 48); attr(lPc, 'x', (ccx + pcL + 8).toFixed(1)); attr(lPc, 'y', cy - 40); lPc.style.opacity = pcL > 8 ? 1 : 0;
    const fL = PF * S.F * M.o3((t - tStop) / 0.3);
    aFb.set(bcx + RB + 4 + fL, YA - RB, bcx + RB + 4, YA - RB); attr(lFb, 'x', (bcx + RB + 10).toFixed(1)); attr(lFb, 'y', YA - RB - 16); lFb.style.opacity = fL > 8 ? 1 : 0;
    aFc.set(ccl + CW + 4 + fL, BTc + 24, ccl + CW + 4, BTc + 24); attr(lFc, 'x', (ccl + CW + 10).toFixed(1)); attr(lFc, 'y', BTc + 8); lFc.style.opacity = fL > 8 ? 1 : 0;
    const sm = $('#smo'); M.setT(sm, S.slow ? 'SLOW-MO · 0.125x' : 'SLOW-MO REPLAY · 0.25x');
    vis(sm, t, tS6 + 0.05, tCr - 0.2, { ...POP, sc: 0.8 }); if (t > tStop - 0.3) vis(sm, t, tStop - 0.2, 1e9, { ...POP, sc: 0.8 });
    // readout: round the time first, then compute every value from it
    const tr = Math.round(S.tau * 100) / 100, u = S.slow ? Math.max(0, tr - CR) : 0, kk = S.slow ? Math.max(0, 1 - u / 0.5) : 1;
    const vb = S.vb === 0 ? 0 : (S.slow ? 8 * kk : S.vb), vc0 = S.vc === 0 ? 0 : (S.slow ? 2 * kk : S.vc);
    vis($('#tt'), t, tS1 + 0.8, 1e9, { dy: 8 }); M.setT($('#r_t'), f2(tr));
    M.setT($('#r_vb'), f2(vb)); M.setT($('#r_vc'), f2(vc0)); M.setT($('#r_pb'), f2(0.5 * vb)); M.setT($('#r_pc'), f2(2 * vc0));
    const Fs = S.slow && u < 0.5 ? '8' : '0'; M.setT($('#r_Fb'), Fs); M.setT($('#r_Fc'), Fs);
    // graph: p against v, each body on its own line (slope = mass), dots linked to the bodies
    M.draw(gLb, t, wt('S3', 'own') - 0.2, 0.6); M.draw(gLc, t, wt('S3', 'heavier') - 0.1, 0.6);
    vis(gTb, t, wt('S3', 'own') + 0.3, 1e9, { dy: 6 }); vis(gTc, t, wt('S3', 'heavier') + 0.4, 1e9, { dy: 6 });
    vis(gSl, t, wt('S3', 'slope') - 0.1, 1e9, POP);
    M.draw(gEq, t, wt('S4', 'Exactly') - 0.1, 0.5); vis(gEqL, t, wt('S4', 'Exactly') + 0.2, 1e9, POP);
    const dOn = !S.pre;
    attr(dB, 'cx', g.X(vb).toFixed(1)); attr(dB, 'cy', g.Y(0.5 * vb).toFixed(1)); M.hide(dB, !dOn);
    attr(dC, 'cx', g.X(vc0).toFixed(1)); attr(dC, 'cy', g.Y(2 * vc0).toFixed(1)); M.hide(dC, !dOn);
    avD(t, wt('S5', 'Same') + 0.2, OUT('S6'));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476], [T0('D7') - 0.1, 378]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const u1 = M.io((t - wt('D2', 'Momentum')) / 0.8), u2 = M.io((t - wt('D5', 'rate')) / 0.8), s1 = 0.5 * u1 + 0.5 * u2;
    dC1(s0 => [s0, pt(s0)], 0, s1); dC2(s0 => [s0, pt(s0)], 0, s1);
    vis(dLg, t, wt('D2', 'Momentum') + 0.6, 1e9, { dy: 6 });
    M.draw(dTh, t, wt('D6', 'change') - 0.1, 0.4); vis(dTl1, t, wt('D6', 'time'), 1e9, { dy: 6 });
    M.draw(dTv, t, wt('D6', 'change') + 0.3, 0.4); vis(dTl2, t, wt('D6', 'Four') - 0.1, 1e9, { dy: 6 });
    vis(dSl, t, wt('D6', 'eight') - 0.1, 1e9, POP);
    const dd = M.clamp((t - wt('D6', 'Four')) / 2.0); dDot(0.5 + 0.5 * dd, pt(0.5 + 0.5 * dd), t > wt('D6', 'Four') - 0.1 && t < T0('D7') + 1.5);
    PUC.write($('#drF'), t, wt('D6', 'eight') + 0.3, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Force') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'momentum') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kt'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o }); vis($('#exK'), t, tK1 + 0.6, 1e9, { dy: 8 });
    const tx = 60 + 10 * Math.max(0, t - wt('K1', 'truck'));
    attr(kTr, 'transform', `translate(${tx.toFixed(1)},${KG})`); vis(kTrO, t, wt('K1', 'truck') - 0.2, 1e9, { dx: -30, dy: 0 });
    const uv = M.o3((t - wt('K1', 'metre') + 0.1) / 0.4), up = M.o3((t - wt('K1', 'ten', 1) + 0.1) / 0.9);
    kVt.set(60, KG + 32, 60 + 20 * uv, KG + 32); attr(kVtl, 'x', 96); kVtl.style.opacity = uv.toFixed(3);
    kPt.set(60, KG + 68, 60 + 640 * up, KG + 68); M.setT(kPtl, '');
    PUC.write($('#ktF'), t, wt('K1', 'ten', 1) + 0.4, 0.8);
    vis($('#ktP'), t, T0('K2') - 0.3, 1e9, POP);
    vis($('#kb'), t, T0('K2') - 0.4, out, { dx: 60, dy: 0, ...o });
    const bx = kBall(t); M.hide(kBo, bx === null); if (bx !== null) attr(kB, 'transform', `translate(${bx.toFixed(1)},${KG - 18})`);
    kBg.forEach((gh, k) => { const gx = kBall(t - 0.05 * (k + 1)); if (bx !== null && gx !== null) { attr(gh, 'transform', `translate(${gx.toFixed(1)},${KG - 18})`); gh.style.opacity = [0.3, 0.2, 0.12][k]; } else gh.style.opacity = 0; });
    const ub = M.o3((t - wt('K2', 'forty') + 0.1) / 0.5);
    kVb.set(60, KG + 32, 60 + 480 * ub, KG + 32); attr(kVbl, 'x', 556); attr(kVbl, 'y', KG + 52 + 0); kVbl.style.opacity = ub.toFixed(3);
    vis(kPbD, t, wt('K2', 'Just') - 0.1, 1e9, POP); vis(kPbl, t, wt('K2', 'Just'), 1e9, { dx: -10, dy: 0 });
    PUC.write($('#kbF'), t, wt('K2', 'Just') - 0.2, 0.8);
    avA(t, wt('K2', 'forty') + 0.6, out);
    vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Same') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    vis($('#vs'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const X = vPos(t), vNow = vVel(t);
    attr(vc, 'transform', `translate(${X.toFixed(1)},0)`); vis(vcO, t, tV1 + 0.4, 1e9, { dx: -30, dy: 0 });
    vGh.forEach((gh, k) => { const gx = vPos(t - 0.25 * (k + 1)); attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = Math.abs(vNow) > 0.5 && Math.abs(gx - X) > 6 && t - 0.25 * (k + 1) > tVgo ? [0.3, 0.2, 0.12][k] : 0; });
    const cx = X + 60, vy = VG - 68 - 22, py = VG - 68 - 60;
    vAv.set(cx, vy, cx + 40 * vNow, vy); attr(vLv, 'x', (cx + 40 * vNow + (vNow >= 0 ? 8 : -26)).toFixed(1)); attr(vLv, 'y', vy + 9); vLv.style.opacity = Math.abs(vNow) > 0.3 ? 1 : 0;
    const pN = 2 * vNow * 30;
    vAp.set(cx, py, cx + pN, py); attr(vLp, 'x', (cx + pN + (pN >= 0 ? 8 : -26)).toFixed(1)); attr(vLp, 'y', py + 9); vLp.style.opacity = Math.abs(pN) > 8 ? 1 : 0;
    const west = t >= tRev + 0.6; if (vEq._w !== west) { vEq._w = west; vEq.innerHTML = west ? EQW : EQE; }
    if (!west) PUC.write(vEq, t, wt('V2', 'plus') - 0.3, 0.8); else PUC.write(vEq, t, tRev + 0.6, 0.6);
    vis($('#vr'), t, wt('V2', 'Take') - 0.2, out, { dx: 60, dy: 0, ...o });
    vis($('#sg0'), t, wt('V2', 'plus') - 0.1, 1e9, POP); vis($('#sg1'), t, wt('V3', 'minus') - 0.1, 1e9, POP);
    vis($('#sgP'), t, wt('V3', 'different') - 0.1, 1e9, POP);
    const ue = M.o3((t - wt('V2', 'six') + 0.1) / 0.5), uw = M.o3((t - wt('V3', 'six') + 0.1) / 0.5);
    nAe.set(NZ, NY - 22, NZ + NU * 6 * ue, NY - 22); nAw.set(NZ, NY - 22, NZ - NU * 6 * uw, NY - 22);
    vis($('#sgS'), t, wt('V2', 'plus') - 0.1, 1e9, { dy: 10 });
    vis($('#th2'), t, tV4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'Same') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const tau = wTau(t), sx = 10 * tau + 1.5 * tau * tau, v = 10 + 3 * tau, p = 1200 * v, X = 60 + 4 * sx, cx = X + 80;
    attr(van, 'transform', `translate(${X.toFixed(1)},0)`); vis(vanO, t, T0('W2') + 0.3, 1e9, { dx: -30, dy: 0 });
    const ua = M.o3((t - tW0 + 0.4) / 0.4), vL = 8 * v * ua, pL = p / 150 * ua;
    wAv.set(cx, 106, cx + vL, 106); attr(wLv, 'x', (cx + vL + 8).toFixed(1)); attr(wLv, 'y', 115); wLv.style.opacity = ua.toFixed(3);
    wAp.set(cx, 72, cx + pL, 72); attr(wLp, 'x', (cx + pL + 8).toFixed(1)); attr(wLp, 'y', 81); wLp.style.opacity = ua.toFixed(3);
    wCv(s0 => [s0, 12000 + 3600 * s0], 0, tau); wDot(tau, 12000 + 3600 * tau, t > tW0 - 0.2);
    const tr = Math.round(tau * 10) / 10, vr = 10 + 3 * tr, prr = 1200 * vr;
    if (wRo._k !== tr) { wRo._k = tr; wRo.innerHTML = `<tspan fill="${C.ink}">t ${f1(tr)} s</tspan><tspan fill="${C.mute}">   ·   </tspan><tspan fill="${VC}">v ${f1(vr)} m/s</tspan><tspan fill="${C.mute}">   ·   </tspan><tspan fill="${PC}">p ${ind(prr)} kg m/s</tspan>`; }
    vis(wRo, t, tW0 - 0.2, 1e9, { dy: 6 });
    vis(wP1, t, tW[0] + 0.2, 1e9, POP); vis(wP2, t, tW[1] + 0.2, 1e9, POP);
    M.draw(wBr, t, tW[2], 0.4); vis(wBl, t, tW[2] + 0.3, 1e9, POP);
    vis(wSl, t, wt('W6', 'six') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.2, tStrike: wt('X3', 'metres') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    vis(TB[0], t, wt('X2', 'seventy') - 0.1, 1e9, { dy: 10 });
    const ua = M.o3((t - wt('X3', 'Seventy') + 0.1) / 0.5); tA.set(214, 136, 214 + 108 * ua, 136); tAl.style.opacity = ua.toFixed(3);
    vis(TB[1], t, wt('X3', 'twenty') - 0.1, 1e9, POP); vis(tUl, t, wt('X3', 'twenty') + 0.3, 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
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
