// PUC Physics Ep 97: Angular velocity and linear velocity (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const WC = C.ac, VC = C.ac, RC = C.violet, TC = C.gold;      // omega blue, v blue, r and r-perp violet, theta gold
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180, W = 0.5;
const wv = tc(WC, '\\vec\\omega'), rv = tc(RC, '\\vec r'), vv = tc(VC, '\\vec v'), w_ = tc(WC, '\\omega'), v_ = tc(VC, 'v'), rp = tc(RC, 'r_\\perp'), th_ = tc(TC, '\\theta');
const B = (x, y, s = 1) => `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})`;

/* merry-go-round in a flat oblique view (seen from the side and a little above). P(rho, phi): point on the disc top.
   phi grows anticlockwise seen from above, so omega points up the pole. */
const mgr = (p, o) => {
  const { cx, cy, S, k = 0.32, R } = o, P = (rho, ph) => [cx + rho * S * Math.cos(ph), cy - k * rho * S * Math.sin(ph)];
  mk(p, 'ellipse', { cx, cy: cy + o.th + 12, rx: R * S + 10, ry: k * R * S + 6, fill: '#000', opacity: 0.06 });
  mk(p, 'line', { x1: cx, y1: cy, x2: cx, y2: o.base, stroke: C.ink, 'stroke-width': 6 });
  mk(p, 'path', { d: `M${cx - R * S},${cy} V${cy + o.th} A${R * S},${k * R * S} 0 0 0 ${cx + R * S},${cy + o.th} V${cy} Z`, fill: '#D9B98C', stroke: C.ink, 'stroke-width': 2.5 });
  mk(p, 'ellipse', { cx, cy, rx: R * S, ry: k * R * S, fill: '#F2E2C2', stroke: C.ink, 'stroke-width': 2.5 });
  const spokes = [0, 1, 2, 3, 4, 5].map(() => mk(p, 'line', { stroke: '#D9B98C', 'stroke-width': 2.5 }));
  mk(p, 'line', { x1: cx, y1: cy, x2: cx, y2: o.top, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(p, 'path', { d: `M${cx - 60},${o.top + 14} L${cx},${o.top - 18} L${cx + 60},${o.top + 14} Z`, fill: '#E7A4A4', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
  return { P, k, S, cx, cy, spin(ph) { spokes.forEach((l, i) => { const a = ph + i * Math.PI / 3, q = P(R, a); attr(l, 'x1', cx); attr(l, 'y1', cy); attr(l, 'x2', q[0].toFixed(1)); attr(l, 'y2', q[1].toFixed(1)); }); } };
};
const horse = (p, col, lab, s = 1) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {});
  mk(g, 'line', { x1: 0, y1: 0, x2: 0, y2: -58, stroke: C.ink2, 'stroke-width': 3 });
  mk(g, 'ellipse', { cx: 0, cy: -30, rx: 20, ry: 10, fill: col }); mk(g, 'path', { d: 'M14,-34 L24,-50 L30,-46 L22,-30 Z', fill: col }); mk(g, 'path', { d: 'M-12,-24 L-16,-10 M10,-24 L14,-10', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' });
  if (lab) txt(g, 0, -66, lab, { 'text-anchor': 'middle', fill: col, 'font-weight': 700, 'font-size': 17 });
  return { o, g, set(x, y) { attr(g, 'transform', B(x, y, s)); } }; };
const tang = (m, ph) => { const dx = -Math.sin(ph), dy = -m.k * Math.cos(ph), L = Math.hypot(dx, dy); return [dx, dy, L]; };   // projected direction of motion

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10'), tS11 = T0('S11');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
Object.assign(M.IC, { ring: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 12h9'], bat: ['M4 20l3-3', 'M7 17l10-12 2 2-12 10z'], carousel: ['M12 3v18', 'M4 9h16', 'M12 3 4 9', 'M12 3l8 6', 'M6 9v8', 'M18 9v8'] });
const JOBS = [['ring', 'Ring game', 'THE END KID RUNS'], ['bat', 'Cricket bat swing', 'THE TIP IS FASTEST'], ['carousel', 'Merry-go-round', 'OUTER HORSE RUSHES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'ring'), wt('H2', 'cricket'), wt('H2', 'tip')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="330" height="100"></svg></div>`).join('');
const JA = JOBS.map((_, i) => { const s = $('#jsv' + i); mk(s, 'circle', { cx: 30, cy: 50, r: 6, fill: C.ink });
  const rod = mk(s, 'line', { x1: 30, y1: 50, stroke: i === 1 ? '#C9A27A' : C.dim, 'stroke-width': i === 1 ? 9 : 3, 'stroke-linecap': 'round' });
  const ds = (i === 1 ? [270] : [70, 140, 210, 270]).map(d => ({ d, c: mk(s, 'circle', { r: i === 1 ? 7 : 9, fill: i === 2 && d < 200 ? C.ink2 : C.ink }), a: PUC.arrow(s, VC, 3.5, 11) }));
  return { rod, ds }; });
const hs = $('#hkS'), HM = mgr(hs, { cx: 290, cy: 330, S: 66, R: 3.4, th: 18, top: 150, base: 372 });
const hIn = horse(hs, C.ink2, 'Diya', 1.15), hOut = horse(hs, C.ink, 'friend', 1.15);
const hTrIn = mk(hs, 'path', { fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.5 }), hTrOut = mk(hs, 'path', { fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.5 });
const arcAlong = (m, rho, a0, a1, n = 30) => { let d = ''; for (let i = 0; i <= n; i++) { const q = m.P(rho, a0 + (a1 - a0) * i / n); d += (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } return d; };

/* ---------- P ---------- */
const QR = [['ω', WC, 'Angular velocity', 'angle turned each second, in rad/s'], ['=', C.ink, 'Same ω for every point', 'a rigid body turns as one piece'], ['↑', WC, 'ω is a vector along the axis', 'right fingers curl with the turn: thumb = ω'], ['v', VC, 'Linear velocity', 'how fast one point moves, in m/s']];
$('#qrs').innerHTML = QR.map(([s, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 118}px"><div class="qs" style="color:${c};${i === 1 || i === 2 ? 'font-style:normal' : ''}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
const tQr = [wt('P1', 'Angular'), wt('P2', 'rigid'), wt('P3', 'vector'), wt('P4', 'Linear')];
const pm = $('#pmS'), PM = mgr(pm, { cx: 380, cy: 370, S: 72, R: 3.3, th: 18, top: 200, base: 420 });
const pWedge = mk(pm, 'path', { fill: TC, opacity: 0.18, stroke: TC, 'stroke-width': 2 });
const pDots = [1, 2, 3].map(r => ({ r, c: mk(pm, 'circle', { r: 9, fill: C.ink }), a: PUC.arrow(pm, VC, 5, 15) }));
const pW = PUC.arrow(pm, WC, 7, 20), pWl = txt(pm, 404, 110, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 34, 'font-family': 'Poppins', 'font-style': 'italic' });
const pCurl = mk(pm, 'path', { d: `M${380 + 46},${232} A46,14 0 1 1 ${380 - 30},${242}`, fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const pCurlH = mk(pm, 'path', { d: `M${380 - 30},${242} l12,-10 l2,13 z`, fill: C.ink });
const pWedL = txt(pm, 380, 510, 'same angle for every point', { 'text-anchor': 'middle', fill: TC, 'font-weight': 700, 'font-size': 20 });
const pVL = txt(pm, 380, 540, 'v grows with distance from the axis', { 'text-anchor': 'middle', fill: VC, 'font-weight': 700, 'font-size': 20 });
const pPh = t => 0.5 * (t - tP1) - 1.2;

/* ---------- S: the sim ---------- */
const s = $('#simS'), SM = mgr(s, { cx: 392, cy: 330, S: 100, R: 3.4, th: 16, top: 150, base: 480 });
const OP = [392, 466]; mk(s, 'circle', { cx: OP[0], cy: OP[1], r: 7, fill: C.ink }); const oL = txt(s, OP[0] - 16, OP[1] + 6, 'O', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
const ghO = [0, 1, 2].map(() => mk(s, 'ellipse', { rx: 20, ry: 10, fill: C.ink, opacity: 0 }));
const sIn = horse(s, C.ink2, 'inner · 1 m'), sOut = horse(s, C.ink, 'outer · 3 m');
const mark = mk(s, 'circle', { r: 11, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const poleDot = mk(s, 'circle', { cx: 392, cy: 330, r: 10, fill: '#fff', stroke: VC, 'stroke-width': 4 }), poleL = txt(s, 408, 318, 'v = 0', { fill: VC, 'font-weight': 700, 'font-size': 22 });
const aIn = PUC.arrow(s, VC, 5, 15), aOut = PUC.arrow(s, VC, 6, 18), aMk = PUC.arrow(s, VC, 5, 15);
const lOut = txt(s, 0, 0, '1.5 m/s', { fill: VC, 'font-weight': 700, 'font-size': 19 }), lIn = txt(s, 0, 0, '0.5 m/s', { fill: VC, 'font-weight': 700, 'font-size': 19 });
const sW = PUC.arrow(s, WC, 7, 20), sWl = txt(s, 410, 92, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 34, 'font-family': 'Poppins', 'font-style': 'italic' });
const sCurl = mk(s, 'path', { d: `M${392 + 50},${182} A50,15 0 1 1 ${392 - 32},${193}`, fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
const sR = PUC.arrow(s, RC, 6, 18), sRl = txt(s, 0, 0, 'r = 5 m', { fill: RC, 'font-weight': 700, 'font-size': 20 });
const sRp = mk(s, 'line', { stroke: RC, 'stroke-width': 3.5, 'stroke-dasharray': '8 6' }), sRpl = txt(s, 0, 0, 'r⊥ = r sin θ = 3 m', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' });
const sTh = mk(s, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 }), sThl = txt(s, 0, 0, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 24, 'font-family': 'Poppins', 'font-style': 'italic' });
const sVl = txt(s, 0, 0, 'v = ω × r', { fill: VC, 'font-weight': 700, 'font-size': 21 });
const PH_IN = 140 * D2R, PH_MK = 250 * D2R, PH_T = -62 * D2R;
const tFz = wt('S6', 'outer') + 0.3, tRes = OUT('S11') + 0.25;
const effT = t => t < tS6 ? (t - tS6) + 0.25 * (tS6 - tFz) : t < tFz ? 0.25 * (t - tFz) : t < tRes ? 0 : t - tRes;
const phO = t => PH_T + W * effT(t);
const tMk0 = wt('S4', 'walks'), tMk1 = T1('S5') - 1.0, rhoMk = t => 3.3 * M.clamp((t - tMk0) / (tMk1 - tMk0));
$('#roA').innerHTML = `<span class="k" style="color:${WC}">ω</span><span class="v" style="color:${WC}">0.50</span><span class="u">rad/s</span>
  <span class="k" style="color:${C.ink}">T</span><span class="v">12.57</span><span class="u">s/turn</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${RC}">r<sub>⊥</sub></span><span class="v" id="r_r" style="color:${RC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 64, w: 560, h: 160, xmax: 3.5, ymin: 0, ymax: 1.75, xt: [0, 1, 2, 3], yt: [0, 0.5, 1, 1.5], xl: 'r⊥ (m)' });
attr(g.xlab, 'x', 696); attr(g.xlab, 'text-anchor', 'start'); txt(gs, 122, 70, 'v (m/s)', { 'font-size': 18 });
const gL = g.curve(VC, 5), gD = g.dot(VC, 11);
const gIn = mk(gs, 'circle', { cx: g.X(1), cy: g.Y(0.5), r: 9, fill: C.ink2 }), gOut = mk(gs, 'circle', { cx: g.X(3), cy: g.Y(1.5), r: 9, fill: C.ink });
const gSl = txt(gs, g.X(0.4), g.Y(1.45), 'slope = ω = 0.5', { fill: VC, 'font-weight': 700, 'font-size': 18 });
const th1 = PUC.think($('#th1'), { q: 'A point sits right on the pole. How fast does it move?', opts: ['Same as the horses', 'Zero'], right: 1, why: 'On the axis r⊥ = 0, so v = ω r⊥ = 0. It only turns.' });

/* ---------- D ---------- */
const STEPS = [[`s = ${rp}\\,\\varphi`, 'arc = radius × angle turned (φ in radians)'],
  [`\\varphi\\ \\text{per second} = ${w_} \\;\\Rightarrow\\; ${v_} = ${w_}\\,${rp}`, 'each second the body turns ω radians'],
  [`${rp} = ${tc(RC, 'r')}\\sin${th_} \\;\\Rightarrow\\; ${v_} = ${w_}\\,${tc(RC, 'r')}\\sin${th_}`, 'r drawn from any point O on the axis'],
  [`${vv} = ${wv}\\times${rv}`, 'size ω r sin θ, direction along the circle']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), DC = [230, 196], DRx = 190, DK = 0.32, DO = [230, 400], DPh = -40 * D2R, DP = [DC[0] + DRx * Math.cos(DPh), DC[1] - DK * DRx * Math.sin(DPh)];
mk(dp, 'line', { x1: DC[0], y1: 430, x2: DC[0], y2: 96, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const dPath = mk(dp, 'ellipse', { cx: DC[0], cy: DC[1], rx: DRx, ry: DK * DRx, fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
mk(dp, 'circle', { cx: DO[0], cy: DO[1], r: 7, fill: C.ink }); txt(dp, DO[0] - 14, DO[1] + 6, 'O', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' });
const dW = PUC.arrow(dp, WC, 7, 20), dR = PUC.arrow(dp, RC, 6, 18), dV = PUC.arrow(dp, VC, 6, 18);
const dRp = mk(dp, 'line', { x1: DC[0], y1: DC[1], x2: DP[0], y2: DP[1], stroke: RC, 'stroke-width': 3.5, 'stroke-dasharray': '8 6' });
const dTh = mk(dp, 'path', { fill: 'none', stroke: TC, 'stroke-width': 3.5 });
mk(dp, 'circle', { cx: DP[0], cy: DP[1], r: 9, fill: C.ink });
const dL = [txt(dp, DC[0] + 18, 70, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(dp, (DO[0] + DP[0]) / 2 + 16, (DO[1] + DP[1]) / 2 + 14, 'r', { fill: RC, 'font-weight': 700, 'font-size': 28, 'font-family': 'Poppins', 'font-style': 'italic' }),
  txt(dp, (DC[0] + DP[0]) / 2, (DC[1] + DP[1]) / 2 - 12, 'r⊥', { fill: RC, 'font-weight': 700, 'font-size': 24, 'text-anchor': 'middle' }), txt(dp, DO[0] + 14, DO[1] - 46, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 26, 'font-family': 'Poppins', 'font-style': 'italic' }), txt(dp, DP[0] + 24, DP[1] - 40, 'v', { fill: VC, 'font-weight': 700, 'font-size': 28, 'font-family': 'Poppins', 'font-style': 'italic' })];
{ const ang = Math.atan2(DP[0] - DO[0], DO[1] - DP[1]); attr(dTh, 'd', `M${DO[0]},${DO[1] - 40} A40,40 0 0 1 ${(DO[0] + 40 * Math.sin(ang)).toFixed(1)},${(DO[1] - 40 * Math.cos(ang)).toFixed(1)}`); }

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${v_} = ${w_}\\,${rp}, \\qquad ${vv} = ${wv}\\times${rv}`);

/* ---------- R ---------- */
const LK = [`Same ω: both finish a turn in 12.6 s`, `Each goes once round its own circle`, `Outer circle 18.8 m, inner 6.3 m: 3x longer`, `3 times the path, same time: 3 times the speed`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px;height:84px"><div class="n" style="top:19px">${i + 1}</div><div class="lt" style="height:84px">${h}</div></div>`).join('');
const tLk = [wt('R2', 'Both'), wt('R3', 'each'), wt('R3', 'outer'), wt('R4', 'Three')];
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Diya', face: '../../assets/illustrations/puc/diya-face.jpg', text: 'Same turns, longer path. That is why my friend flew!' });
const rr = $('#rrS'), RCn = [392, 316], RU = 72;
mk(rr, 'circle', { cx: RCn[0], cy: RCn[1], r: 3 * RU, fill: 'none', stroke: C.line, 'stroke-width': 2.5 }); mk(rr, 'circle', { cx: RCn[0], cy: RCn[1], r: RU, fill: 'none', stroke: C.line, 'stroke-width': 2.5 }); mk(rr, 'circle', { cx: RCn[0], cy: RCn[1], r: 8, fill: C.ink });
const rTr = [mk(rr, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }), mk(rr, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' })];
const rDot = [mk(rr, 'circle', { r: 12, fill: C.ink2 }), mk(rr, 'circle', { r: 14, fill: C.ink })], rV = [PUC.arrow(rr, VC, 5, 15), PUC.arrow(rr, VC, 6, 18)];
const rLen = [txt(rr, RCn[0], RCn[1] + RU + 30, '6.3 m', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 700, 'font-size': 20 }), txt(rr, RCn[0], RCn[1] + 3 * RU + 34, '18.8 m', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 22 })];
const rVl = [txt(rr, 0, 0, '0.5 m/s', { fill: VC, 'font-weight': 700, 'font-size': 19 }), txt(rr, 0, 0, '1.5 m/s', { fill: VC, 'font-weight': 700, 'font-size': 21 })];
const tR0 = wt('R2', 'Both'), rPh = t => Math.min(2 * Math.PI, W * Math.max(0, t - tR0));
const circArc = (r, a1) => { if (a1 < 0.01) return ''; let d = ''; for (let i = 0; i <= 60; i++) { const a = a1 * i / 60; d += (i ? 'L' : 'M') + (RCn[0] + r * Math.cos(a)).toFixed(1) + ',' + (RCn[1] - r * Math.sin(a)).toFixed(1); } return d; };

/* ---------- K ---------- */
const KS = ['#khS', '#klS'].map((id, i) => { const sv = $(id), cc = [392, 290], R1 = 60, R3 = 180;
  mk(sv, 'circle', { cx: cc[0], cy: cc[1], r: R3, fill: 'none', stroke: i ? C.ink : C.line, 'stroke-width': i ? 3 : 2, 'stroke-dasharray': i ? '' : '6 6' });
  mk(sv, 'circle', { cx: cc[0], cy: cc[1], r: R1, fill: 'none', stroke: i ? C.line : C.ink2, 'stroke-width': i ? 2 : 3, 'stroke-dasharray': i ? '6 6' : '' }); mk(sv, 'circle', { cx: cc[0], cy: cc[1], r: 7, fill: C.ink });
  const r = i ? R3 : R1, wedge = mk(sv, 'path', { fill: TC, opacity: 0.16, stroke: TC, 'stroke-width': 2 }), dot = mk(sv, 'circle', { r: 13, fill: i ? C.ink : C.ink2 }), a = PUC.arrow(sv, VC, 6, 18);
  const wl = txt(sv, cc[0] - 20, cc[1] + 26, '', { fill: TC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'end' });
  return { cc, r, wedge, dot, a, wl, v: i ? 1.5 : 0.5 }; });
$('#khP').innerHTML = `${K(`${w_} = 0.5`)}&nbsp; · &nbsp;${K(`${rp} = 1\\,\\text{m}`)}&nbsp; · &nbsp;${K(`${v_} = 0.5\\,\\text{m/s}`)}`;
$('#klP').innerHTML = `${K(`${w_} = 0.5`)}&nbsp; · &nbsp;${K(`${rp} = 3\\,\\text{m}`)}&nbsp; · &nbsp;${K(`${v_} = 1.5\\,\\text{m/s}`)}`;
const th2 = PUC.think($('#th2'), { q: 'The Earth turns once a day. Who moves faster: someone in Bengaluru, or in London?', opts: ['Bengaluru', 'London'], right: 0, why: 'Same ω, but Bengaluru is farther from the Earth\'s axis.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `The Earth: ${K('R = 6.37\\times10^6\\,\\text{m}')}, one turn a day. Find the speed of a point on the equator, and in Bengaluru (about 13° N).`;
const wsol = PUC.solution($('#wl'), [
  [K(`${w_} = \\dfrac{2\\pi}{86400} \\approx 7.27\\times10^{-5}\\,\\text{rad/s}`)],
  [K(`\\text{equator: } ${v_} = ${w_}R \\approx ${tc(VC, '463\\,\\text{m/s}')}`)],
  [K(`\\text{Bengaluru: } ${rp} = R\\cos13^\\circ \\approx 6.21\\times10^6\\,\\text{m}`)],
  [K(`${v_} = ${w_}\\,${rp} \\approx ${tc(VC, '451\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), EC = [250, 310], ER = 190, EK = 0.2;
mk(w, 'circle', { cx: EC[0], cy: EC[1], r: ER, fill: '#DCEBFA', stroke: '#7FA6D6', 'stroke-width': 3 });
mk(w, 'line', { x1: EC[0], y1: EC[1] - ER - 40, x2: EC[0], y2: EC[1] + ER + 30, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
const wW = PUC.arrow(w, WC, 7, 20), wWl = txt(w, EC[0] + 16, EC[1] - ER - 50, 'ω', { fill: WC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' });
const LAT = [[0, 'Equator: 463 m/s', 24], [13, 'Bengaluru, 13° N: 451 m/s', -14], [51.5, 'London, 51.5° N: 288 m/s', -6]].map(([la, lab, dy], i) => { const y = EC[1] - ER * Math.sin(la * D2R), rx = ER * Math.cos(la * D2R);
  const ring = mk(w, 'ellipse', { cx: EC[0], cy: y, rx, ry: EK * rx, fill: 'none', stroke: i === 2 ? C.dim : '#7FA6D6', 'stroke-width': 2.5, 'stroke-dasharray': i ? '6 5' : '' });
  const rp2 = mk(w, 'line', { x1: EC[0], y1: y, x2: EC[0] + rx, y2: y, stroke: RC, 'stroke-width': 3.5, 'stroke-dasharray': '8 6', opacity: 0 });
  const dot = mk(w, 'circle', { cx: EC[0] + rx, cy: y, r: 8, fill: i === 2 ? C.ink2 : C.ink, opacity: 0 });
  const l = txt(w, EC[0] + rx + 16, y + dy + 6, lab, { fill: i === 2 ? C.mute : VC, 'font-weight': 700, 'font-size': 19 });
  return { ring, rp2, dot, l }; });
const tW = [wt('W3', 'One'), wt('W4', 'On'), wt('W5', 'In'), wt('W6', 'So')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${v_} = ${w_}\\,${tc(RC, 'r')} = 0.5\\times5 = 2.5\\,\\text{m/s}`), right: K(`${v_} = ${w_}\\,${tc(RC, 'r')}\\sin${th_} = 0.5\\times5\\times0.6 = 1.5\\,\\text{m/s}`) });
const tp = $('#tpS'), tO = [470, 236], tPp = [590, 86];
mk(tp, 'line', { x1: tO[0], y1: 254, x2: tO[0], y2: 40, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const tR = PUC.arrow(tp, RC, 5, 16), tRp = mk(tp, 'line', { x1: tO[0], y1: tPp[1], x2: tPp[0], y2: tPp[1], stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '7 5' });
mk(tp, 'circle', { cx: tPp[0], cy: tPp[1], r: 8, fill: C.ink });
const tL = [txt(tp, 548, 186, 'r = 5', { fill: RC, 'font-weight': 700, 'font-size': 20 }), txt(tp, 530, 74, 'r⊥ = 3', { fill: RC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' }), txt(tp, tO[0] + 12, tO[1] - 52, 'θ', { fill: TC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins', 'font-style': 'italic' })];
const tTh = mk(tp, 'path', { d: `M${tO[0]},${tO[1] - 44} A44,44 0 0 1 ${(tO[0] + 44 * 0.6).toFixed(1)},${(tO[1] - 44 * 0.8).toFixed(1)}`, fill: 'none', stroke: TC, 'stroke-width': 3 });
const where = PUC.where($('#wa'), { on: [], type: 'v = ω × r with vectors, points on wheels and on the Earth, rolling' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A body turns with ${K(`${wv} = 4\\hat k`)} rad/s about an axis through the origin. Find the speed of the point ${K(`${rv} = 3\\hat i + 4\\hat j + 12\\hat k`)} m.`, qW: 760,
  opts: ['52 m/s', '20 m/s', '48 m/s', '28 m/s'], right: 1, optY: 340, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`${vv} = 4\\hat k\\times(3\\hat i + 4\\hat j + 12\\hat k)`)], [K(`= 12\\hat j - 16\\hat i \\quad (\\hat k\\times\\hat k = 0)`)],
  [K(`|${vv}| = \\sqrt{256 + 144} = ${tc(VC, '20\\,\\text{m/s}')}`)], [K(`\\text{check: } ${rp} = 5,\\ 4\\times5 = 20`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '24px');
const tSo = [wt('A2', 'v'), wt('A2', 'minus'), wt('A3', 'size'), wt('A4', 'Check')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · angular and linear velocity', y0: 100, dy: 100, txt: [0, 1, 1, 1],
  lines: [K(`${vv} = ${wv}\\times${rv}, \\qquad ${v_} = ${w_}\\,${tc(RC, 'r')}\\sin${th_} = ${w_}\\,${rp}`), '<b>Same ω</b> for every point of a rigid body', '<b>ω</b> lies along the axis: right fingers curl with the turn', '<b>On the axis</b>: r⊥ = 0, so v = 0'] });
const YQ = ['Why do all points of a turning body share the same ω?', 'Why does a point on the axis not move?', 'Why use r sin θ, not r, in v = ω r?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 98', topic: 'A fan speeding up: how many turns? Angular Acceleration', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.1, 1.06, 960, 540], [tS10 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px'; }
const vArrow = (a, m, P, ph, v, sc) => { const [dx, dy, L] = tang(m, ph); a.set(P[0], P[1] - 30, P[0] + dx * v * sc, P[1] - 30 + dy * v * sc); return [P[0] + dx * v * sc, P[1] - 30 + dy * v * sc]; };

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
    JA.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const ph = 1.7 * (t - tMorph - i * 0.4), a = 10 * D2R * Math.sin(ph), wd = 10 * D2R * 1.7 * Math.cos(ph);
      attr(q.rod, 'x2', (30 + 280 * Math.cos(a)).toFixed(1)); attr(q.rod, 'y2', (50 - 280 * Math.sin(a)).toFixed(1));
      q.ds.forEach(dd => { const x = 30 + dd.d * Math.cos(a), y = 50 - dd.d * Math.sin(a), L = dd.d * wd * 0.55; attr(dd.c, 'cx', x.toFixed(1)); attr(dd.c, 'cy', y.toFixed(1)); dd.a.set(x, y, x - L * Math.sin(a), y - L * Math.cos(a)); }); });
    vis($('#hjP'), t, wt('H2', 'tip') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const ph = 0.8 * (t - tH3) - 0.6; HM.spin(ph);
    const pi = HM.P(1, ph + PH_IN), po = HM.P(3, ph); hIn.set(pi[0], pi[1]); hOut.set(po[0], po[1]); vis(hIn.o, t, tH3 + 0.3, 1e9, { dy: 0 }); vis(hOut.o, t, wt('H3', 'friend') - 0.1, 1e9, { dy: 0 });
    const ut = M.io((t - tH4) / 0.4); attr(hTrIn, 'd', arcAlong(HM, 1, ph + PH_IN - 1.1, ph + PH_IN)); attr(hTrOut, 'd', arcAlong(HM, 3, ph - 1.1, ph)); hTrIn.style.opacity = 0.5 * ut; hTrOut.style.opacity = 0.5 * ut;
    vis($('#hkQ'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP));
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const ph = pPh(t); PM.spin(ph);
    const tw = wt('P2', 'same'), wo = M.io((t - tw + 0.1) / 0.3) * (1 - M.io((t - T0('P3')) / 0.3)), a0 = pPh(tw), q0 = PM.P(3.3, a0);
    let d = `M${PM.cx},${PM.cy} L${q0[0].toFixed(1)},${q0[1].toFixed(1)}`; for (let i = 1; i <= 24; i++) { const q = PM.P(3.3, a0 + (ph - a0) * i / 24); d += ` L${q[0].toFixed(1)},${q[1].toFixed(1)}`; } attr(pWedge, 'd', t > tw ? d + ' Z' : ''); pWedge.style.opacity = 0.18 * wo; pWedL.style.opacity = wo;
    const uv = M.o3((t - wt('P4', 'Linear') + 0.1) / 0.5);
    pDots.forEach(q => { const P = PM.P(q.r, ph + 0.4); attr(q.c, 'cx', P[0].toFixed(1)); attr(q.c, 'cy', P[1].toFixed(1)); const [dx, dy] = tang(PM, ph + 0.4); q.a.set(P[0], P[1], P[0] + dx * q.r * 36 * uv, P[1] + dy * q.r * 36 * uv); });
    vis(pVL, t, wt('P4', 'moves') - 0.1, 1e9, { dy: 0 });
    const uw = M.o3((t - wt('P3', 'vector') + 0.1) / 0.5); pW.set(380, 196, 380, 196 - 90 * uw); pWl.style.opacity = uw;
    vis(pCurl, t, wt('P3', 'Curl') - 0.1, 1e9, { dy: 0 }); vis(pCurlH, t, wt('P3', 'Curl') + 0.1, 1e9, { dy: 0 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S10'), simIn2 = OUT('S11') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const ph = phO(t), frozen = t >= tFz && t < tRes, replay = t >= tS6 && t < tFz; SM.spin(ph);
    const pOut = SM.P(3, ph), pIn = SM.P(1, ph + PH_IN), pMk = SM.P(rhoMk(t), ph + PH_MK);
    sOut.set(pOut[0], pOut[1]); sIn.set(pIn[0], pIn[1]); vis(sIn.o, t, tS2 - 0.1, 1e9, { dy: 0 }); vis(sOut.o, t, tS3 - 0.1, 1e9, { dy: 0 });
    attr(mark, 'cx', pMk[0].toFixed(1)); attr(mark, 'cy', pMk[1].toFixed(1)); vis(mark, t, tMk0 - 0.2, tS6, { dy: 0, outDur: 0.3 });
    ghO.forEach((e, j) => { const q = SM.P(3, phO(t - 0.35 * (j + 1))); attr(e, 'cx', q[0].toFixed(1)); attr(e, 'cy', (q[1] - 30).toFixed(1)); e.style.opacity = !frozen && t > tS3 ? [0.22, 0.14, 0.08][j] : 0; });
    const uw = M.o3((t - wt('S1', 'Omega') + 0.1) / 0.5); sW.set(392, 140, 392, 140 - 70 * uw); sWl.style.opacity = uw; vis(sCurl, t, wt('S1', 'Omega'), 1e9, { dy: 0 });
    const ui = M.o3((t - wt('S2', 'moves') + 0.1) / 0.4), uo = M.o3((t - wt('S3', 'moves') + 0.1) / 0.4);
    const eIn = vArrow(aIn, SM, pIn, ph + PH_IN, 0.5 * ui, 90); const eOut = vArrow(aOut, SM, pOut, ph, 1.5 * uo * (frozen ? 1 : 1), 90);
    attr(lIn, 'x', eIn[0] + 8); attr(lIn, 'y', eIn[1] - 8); lIn.style.opacity = ui * (frozen || t > tRes ? 0 : 1); attr(lOut, 'x', eOut[0] + 8); attr(lOut, 'y', eOut[1] - 10); lOut.style.opacity = uo * (frozen || t > tRes ? 0 : 1);
    const um = M.o3((t - tMk0) / 0.4) * (t < tS6 ? 1 : 0); vArrow(aMk, SM, [pMk[0], pMk[1] + 30], ph + PH_MK, 0.5 * rhoMk(t) * um, 90);
    // frozen outer horse: r from O, theta, r-perp, v = omega x r
    const fz = frozen ? 1 : 0, ur = fz * M.o3((t - wt('S7', 'Draw') + 0.1) / 0.6), up = fz * M.io((t - wt('S8', 'distance') + 0.1) / 0.5), uv = fz * M.io((t - wt('S9', 'right') + 0.1) / 0.4);
    sR.set(OP[0], OP[1], OP[0] + (pOut[0] - OP[0]) * ur, OP[1] + (pOut[1] - OP[1]) * ur); attr(sRl, 'x', (OP[0] + pOut[0]) / 2 + 30); attr(sRl, 'y', (OP[1] + pOut[1]) / 2 + 30); sRl.style.opacity = ur;
    const angR = Math.atan2(pOut[0] - OP[0], OP[1] - pOut[1]); attr(sTh, 'd', `M${OP[0]},${OP[1] - 50} A50,50 0 0 1 ${(OP[0] + 50 * Math.sin(angR)).toFixed(1)},${(OP[1] - 50 * Math.cos(angR)).toFixed(1)}`); sTh.style.opacity = fz * M.io((t - wt('S7', 'theta') + 0.1) / 0.3);
    attr(sThl, 'x', OP[0] + 18); attr(sThl, 'y', OP[1] - 58); sThl.style.opacity = sTh.style.opacity;
    attr(sRp, 'x1', 392); attr(sRp, 'y1', 330); attr(sRp, 'x2', pOut[0].toFixed(1)); attr(sRp, 'y2', pOut[1].toFixed(1)); sRp.style.opacity = up; attr(sRpl, 'x', (392 + pOut[0]) / 2 - 14); attr(sRpl, 'y', (330 + pOut[1]) / 2 - 14); attr(sRpl, 'text-anchor', 'end'); sRpl.style.opacity = up;
    if (frozen) { const e2 = vArrow(aOut, SM, pOut, ph, 1.5 * (1 + 0.6 * uv), 90); attr(sVl, 'x', e2[0] - 110); attr(sVl, 'y', e2[1] - 22); } sVl.style.opacity = uv;
    vis(poleDot, t, simIn2 + 0.3, 1e9, { dy: 0 }); vis(poleL, t, wt('S11', 'zero') - 0.1, 1e9, { dy: 0 });
    vis($('#smo'), t, tS6 + 0.05, tFz - 0.2, { ...POP, sc: 0.8, outDur: 0.15 }); vis($('#frz'), t, tFz, simOut, { ...POP, sc: 0.8 });
    const sp1 = t >= tS11 - 0.3; $('#simP').innerHTML = sp1 ? `On the axis: ${K(`${rp} = 0`)}, so ${K(`${v_} = 0`)}` : `${K(`${vv} = ${wv}\\times${rv}`)}&nbsp; size ${K(`${w_}\\,${tc(RC, 'r')}\\sin${th_}`)}`;
    if (sp1) vis($('#simP'), t, wt('S11', 'axis') - 0.1, 1e9, POP); else vis($('#simP'), t, wt('S9', 'cross') - 0.1, simOut, POP);
    // readout + graph: the selected point
    const sel = t >= tS11 - 0.3 ? 0 : t >= tS6 ? 3 : t >= tMk0 - 0.1 ? rhoMk(t) : t >= tS3 - 0.1 ? 3 : t >= tS2 - 0.1 ? 1 : null;
    const rr0 = sel === null ? 0 : Math.round(sel * 100) / 100; M.setT($('#r_r'), rr0.toFixed(2)); M.setT($('#r_v'), (W * rr0).toFixed(2));
    M.setT($('#roT'), sel === null ? 'PICK A POINT' : t >= tS11 - 0.3 ? 'ON THE POLE' : t >= tS6 ? 'OUTER HORSE' : t >= tMk0 - 0.1 ? 'MARKER WALKS OUT' : t >= tS3 - 0.1 ? 'OUTER HORSE' : 'INNER HORSE'); vis($('#roT'), t, tS1 + 0.6, 1e9, POP);
    const lineTo = Math.max(t >= tMk0 ? rhoMk(t) : 0, t >= tS6 ? 3.3 : 0); gL(x => [x, W * x], 0, lineTo, 30);
    gD(sel ?? 0, W * (sel ?? 0), sel !== null); vis(gIn, t, wt('S2', 'moves'), 1e9, { dy: 0 }); vis(gOut, t, wt('S3', 'moves'), 1e9, { dy: 0 }); vis(gSl, t, wt('S5', 'straight') - 0.1, 1e9, { dy: 0 });
    vis($('#th1'), t, tS10 + 0.05, OUT('S11'), { dy: 36, ...o });
    th1(t, { tin: tS10, tOpts: wt('S10', 'How') - 0.1, tCount: T1('S10') + 0.05, dur: 3, tAns: tS11 - 0.02, tWhy: wt('S11', 'It') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    const uw = M.o3((t - tD1 - 0.8) / 0.5), ur = M.o3((t - tStep[2] - 0.3) / 0.5), uv = M.o3((t - tStep[3] - 0.3) / 0.5);
    dW.set(DC[0], 110, DC[0], 110 - 60 * uw); dL[0].style.opacity = uw;
    dR.set(DO[0], DO[1], DO[0] + (DP[0] - DO[0]) * ur, DO[1] + (DP[1] - DO[1]) * ur); dL[1].style.opacity = ur; dTh.style.opacity = ur; dL[3].style.opacity = ur;
    dRp.style.opacity = M.io((t - tStep[1]) / 0.4); dL[2].style.opacity = dRp.style.opacity;
    const [tx, ty] = (() => { const dx = -Math.sin(DPh), dy = -DK * Math.cos(DPh), L = Math.hypot(dx, dy); return [dx / L, dy / L]; })();
    dV.set(DP[0], DP[1], DP[0] + tx * 100 * uv, DP[1] + ty * 100 * uv); dL[4].style.opacity = uv;
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'speed') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'distance') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const ph = rPh(t), done = ph >= 2 * Math.PI - 1e-6;
    [1, 3].forEach((rad, i) => { const R0 = rad * RU, x = RCn[0] + R0 * Math.cos(ph), y = RCn[1] - R0 * Math.sin(ph); attr(rTr[i], 'd', circArc(R0, ph)); attr(rDot[i], 'cx', x.toFixed(1)); attr(rDot[i], 'cy', y.toFixed(1));
      const uvv = M.o3((t - wt('R4', 'speed') + 0.1) / 0.4), L = rad * 0.5 * 80 * uvv; rV[i].set(x, y, x - L * Math.sin(ph), y - L * Math.cos(ph)); attr(rVl[i], 'x', x - L * Math.sin(ph) + 10); attr(rVl[i], 'y', y - L * Math.cos(ph) - 8); rVl[i].style.opacity = uvv;
      vis(rLen[i], t, tLk[2] - 0.1 + i * 0.3, 1e9, { dy: 0 }); });
    const tr = Math.round(Math.min(12.57, Math.max(0, t - tR0)) * 10) / 10; $('#rClk').textContent = done ? '1 turn · 12.6 s' : `t = ${tr.toFixed(1)} s`; vis($('#rClk'), t, tR0 - 0.2, 1e9, POP);
    avD(t, wt('R4', 'speed') + 0.5, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    const ph = W * Math.max(0, t - tK1 - 0.4), phw = ph % (2 * Math.PI);
    KS.forEach((q, i) => { const x = q.cc[0] + q.r * Math.cos(ph), y = q.cc[1] - q.r * Math.sin(ph); attr(q.dot, 'cx', x.toFixed(1)); attr(q.dot, 'cy', y.toFixed(1));
      const L = q.v * 80; q.a.set(x, y, x - L * Math.sin(ph), y - L * Math.cos(ph));
      let d = `M${q.cc[0]},${q.cc[1]}`; for (let k = 0; k <= 30; k++) { const a = phw * k / 30; d += ` L${(q.cc[0] + 46 * Math.cos(a)).toFixed(1)},${(q.cc[1] - 46 * Math.sin(a)).toFixed(1)}`; } attr(q.wedge, 'd', d + ' Z');
      M.setT(q.wl, `${Math.round(phw / D2R)}°`); });
    vis($('#khP'), t, wt('K1', 'omega') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'omega') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Who') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Same') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const uw = M.o3((t - tW[0] + 0.1) / 0.5); wW.set(EC[0], EC[1] - ER - 4, EC[0], EC[1] - ER - 4 - 60 * uw); wWl.style.opacity = uw;
    const tl = [[wt('W2', 'equator'), tW[1], wt('W4', 'four')], [wt('W2', 'Bengaluru'), tW[2], wt('W6', 'four')], [wt('W6', 'feel'), wt('W6', 'feel'), wt('W6', 'feel') + 0.3]];
    LAT.forEach((q, i) => { vis(q.ring, t, tl[i][0] - 0.1, 1e9, { dy: 0 }); const ur = M.io((t - tl[i][1]) / 0.4); q.rp2.style.opacity = ur; q.dot.style.opacity = M.io((t - tl[i][0]) / 0.3); vis(q.l, t, tl[i][2] - 0.1, 1e9, { dy: 0 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'full') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'truth') - 0.1 });
    const ur = M.o3((t - wt('X2', 'distance') + 0.1) / 0.5); tR.set(tO[0], tO[1], tO[0] + (tPp[0] - tO[0]) * ur, tO[1] + (tPp[1] - tO[1]) * ur); tL[0].style.opacity = ur; tL[2].style.opacity = ur; tTh.style.opacity = ur;
    const up = M.io((t - wt('X3', 'axis') + 0.1) / 0.4); tRp.style.opacity = up; tL[1].style.opacity = up;
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'v') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
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
