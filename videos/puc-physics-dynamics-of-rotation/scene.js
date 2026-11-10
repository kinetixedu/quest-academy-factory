// PUC Physics Ep 107: Dynamics of rotation - torque, work and rotational kinetic energy (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, VC = C.ac, AC = C.red, RC = C.violet, TC = C.gold, EC = C.teal, IC = C.ink, PC = C.violet;   // tau/F orange, omega blue, alpha red, r violet, theta gold, W/K teal, I ink, P violet
const WOOD = '#EADBC4', WOOD2 = '#C9A27A', STONE = '#9AA3B2';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);
const tau_ = tc(FC, '\\tau'), om = tc(VC, '\\omega'), al = tc(AC, '\\alpha'), th_ = tc(TC, '\\theta'), rr_ = tc(RC, 'r'), FF = tc(FC, 'F'), II = tc(IC, 'I'), WW = tc(EC, 'W'), KK = tc(EC, 'K'), PP = tc(PC, 'P');
// a curved arrow (arc + head) around (cx, cy), radius r, from angle a0 sweeping s radians (screen angles, + = clockwise)
const curl = (p, col, sw = 5) => { const g = mk(p, 'g', {}), a = mk(g, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' }), h = mk(g, 'path', { fill: col });
  return { g, set(cx, cy, r, a0, s) { if (Math.abs(s) < 0.05) { M.hide(g, true); return; } M.hide(g, false); const a1 = a0 + s, P = q => [cx + r * Math.cos(q), cy + r * Math.sin(q)], [x0, y0] = P(a0), hs = 14 / r * Math.sign(s), [x1, y1] = P(a1 - hs * 0.6);
    attr(a, 'd', `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(s - hs * 0.6) > Math.PI ? 1 : 0} ${s > 0 ? 1 : 0} ${x1.toFixed(1)},${y1.toFixed(1)}`);
    const [tx, ty] = P(a1), d = [-Math.sin(a1) * Math.sign(s), Math.cos(a1) * Math.sign(s)], n = [Math.cos(a1), Math.sin(a1)];
    attr(h, 'd', `M${(tx + d[0] * 8).toFixed(1)},${(ty + d[1] * 8).toFixed(1)} L${(tx - d[0] * 10 + n[0] * 8).toFixed(1)},${(ty - d[1] * 10 + n[1] * 8).toFixed(1)} L${(tx - d[0] * 10 - n[0] * 8).toFixed(1)},${(ty - d[1] * 10 - n[1] * 8).toFixed(1)} Z`); } }; };
// a wheel drawn around (cx, cy): rim, spokes, a marked spoke; rotate with set(theta) (radians, clockwise)
const wheel = (p, cx, cy, R, o = {}) => { const outer = mk(p, 'g', {}), g = mk(outer, 'g', {});
  mk(g, 'circle', { cx, cy, r: R, fill: o.fill ?? WOOD, stroke: IC, 'stroke-width': o.rim ?? 8 });
  if (o.inner !== false) mk(g, 'circle', { cx, cy, r: R * 0.82, fill: 'none', stroke: o.spk ?? WOOD2, 'stroke-width': 2 });
  for (let i = 0; i < (o.n ?? 8); i++) { const a = i * 2 * Math.PI / (o.n ?? 8); mk(g, 'line', { x1: cx, y1: cy, x2: cx + R * 0.82 * Math.cos(a), y2: cy + R * 0.82 * Math.sin(a), stroke: o.spk ?? WOOD2, 'stroke-width': o.sw ?? 3 }); }
  mk(g, 'line', { x1: cx, y1: cy, x2: cx + R - 4, y2: cy, stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: cx + R - 4, cy, r: 9, fill: IC });
  const ax = mk(outer, 'circle', { cx, cy, r: 13, fill: '#fff', stroke: IC, 'stroke-width': 4 }); mk(outer, 'circle', { cx, cy, r: 4, fill: IC });
  return { o: outer, g, set(th) { attr(g, 'transform', `rotate(${(th * 180 / Math.PI).toFixed(2)} ${cx} ${cy})`); } };
};
const ghostSpokes = (p, cx, cy, R) => [0.3, 0.2, 0.12].map(op => { const l = mk(p, 'line', { x1: cx, y1: cy, x2: cx + R - 4, y2: cy, stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0 }); l._op = op; return l; });
const setGhosts = (gs, cx, cy, th, w, on) => gs.forEach((l, j) => { attr(l, 'transform', `rotate(${((th - w * 0.045 * (j + 1)) * 180 / Math.PI).toFixed(2)} ${cx} ${cy})`); l.style.opacity = on && w > 0.6 ? l._op : 0; });

Object.assign(M.IC, {
  knife: ['M14 4 4 14l2 2 10-10z', 'M16 2l6 6-4 4-6-6z'],
  top: ['M12 3v3', 'M5 9h14l-7 12z', 'M8 9a4 3 0 0 1 8 0'],
  pot: ['M7 4h10', 'M8 4c-3 3-4 7-2 11 1 3 3 5 6 5s5-2 6-5c2-4 1-8-2-11', 'M3 22h18'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10'), tS11 = T0('S11');
const tR1 = T0('R1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['knife', 'Knife sharpener', 'PEDALS TO SPIN THE STONE'], ['top', 'Spinning top', 'ONE PULL OF A STRING'], ['pot', "Potter's wheel", 'KICKED AT THE RIM']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'knife'), wt('H1', 'child'), wt('H1', 'top') + 0.5];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="120"></svg></div>`).join('');
const JW = JOBS.map((_, i) => { const s = $('#jsv' + i), w = wheel(s, 222, 60, 40, { rim: 5, sw: 2, n: 6 }), f = PUC.arrow(s, FC, 4, 12), c = curl(s, VC, 3); return { w, f, c }; });
const hs = $('#hkS');
// potter's wheel, side view: wheel head on a shaft, heavy kick wheel below
mk(hs, 'line', { x1: 40, y1: 470, x2: 560, y2: 470, stroke: IC, 'stroke-width': 3 });
for (let x = 52; x < 560; x += 28) mk(hs, 'line', { x1: x, y1: 474, x2: x - 14, y2: 488, stroke: C.dim, 'stroke-width': 2 });
mk(hs, 'rect', { x: 262, y: 236, width: 16, height: 196, fill: '#8D99AE', stroke: IC, 'stroke-width': 2.5 });
mk(hs, 'path', { d: 'M100,470 L130,250 M440,470 L410,250', stroke: '#8A6A4A', 'stroke-width': 10, 'stroke-linecap': 'round' });
mk(hs, 'path', { d: 'M110,330 H430', stroke: '#8A6A4A', 'stroke-width': 8, 'stroke-linecap': 'round' });
mk(hs, 'ellipse', { cx: 270, cy: 420, rx: 180, ry: 38, fill: '#B8865A', stroke: IC, 'stroke-width': 3 });
mk(hs, 'path', { d: 'M90,420 v14 a180,38 0 0 0 360,0 v-14', fill: '#9C6E45', stroke: IC, 'stroke-width': 3 });
mk(hs, 'ellipse', { cx: 270, cy: 236, rx: 130, ry: 26, fill: '#D9C3A0', stroke: IC, 'stroke-width': 3 });
mk(hs, 'path', { d: 'M226,232 C214,196 236,170 250,150 L290,150 C304,170 326,196 314,232 Z', fill: '#C98B5E', stroke: IC, 'stroke-width': 3 });
const hMk = [0, 1, 2, 3].map(i => mk(hs, 'circle', { r: 7, fill: IC })), hMk2 = [0, 1, 2].map(i => mk(hs, 'rect', { width: 10, height: 10, rx: 2, fill: '#5C3B1E' }));
const hF = PUC.arrow(hs, FC, 7, 20), hFl = txt(hs, 0, 0, 'kick', { fill: FC, 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins' });
const hW = curl(hs, VC, 5), hWl = txt(hs, 470, 214, 'ω', { fill: VC, 'font-weight': 700, 'font-size': 30, 'font-family': 'Poppins', 'font-style': 'italic' });
const tKick = [wt('H3', 'kicks'), wt('H3', 'few') + 0.2, wt('H3', 'times') + 0.4], tHk = wt('H4', 'kick');
// spin rate of the potter's wheel: steps up with each kick (rad/s, then very slow loss)
const hRate = M.track(0, tKick.map((t, i) => [t + 0.1, 1.2 * (i + 1), M.HEAVY]), M.HEAVY);
const hPhase = t => { let p = 0; const dt = 1 / 30; for (let s = tKick[0]; s < t; s += dt) p += hRate(s) * dt; return p; };

/* ---------- P ---------- */
const QR = [['F', FC, '\\tau', FC, 'Torque', 'does the job of force'], ['m', IC, 'I', IC, 'Moment of inertia', 'does the job of mass: how hard to spin'], ['a', AC, '\\alpha', AC, 'Angular acceleration', 'does the job of acceleration']];
$('#qrs').innerHTML = QR.map(([a, ca, b, cb, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 136}px"><div class="qa" style="color:${ca}">${a}</div><div class="qar">${M.icon('arrowR', 36, C.mute, 2.4)}</div><div class="qb">${K(tc(cb, b))}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
$('#qrs').insertAdjacentHTML('beforeend', `<div class="pillp ink" id="pP" style="left:36px;top:494px">Same rules, new names</div>`);
document.querySelectorAll('.qr .qb .katex').forEach(e => e.style.fontSize = '60px');
const tQa = [wt('P1', 'force'), wt('P1', 'mass'), wt('P1', 'acceleration')], tQr = [wt('P2', 'Torque'), wt('P3', 'Moment'), wt('P4', 'Angular')];
const pm = $('#pmS');
mk(pm, 'line', { x1: 40, y1: 236, x2: 744, y2: 236, stroke: IC, 'stroke-width': 3 });
const cart = mk(pm, 'g', {}); mk(cart, 'rect', { x: 0, y: 150, width: 150, height: 64, rx: 8, fill: '#8D99AE', stroke: IC, 'stroke-width': 3 }); [36, 114].forEach(x => mk(cart, 'circle', { cx: x, cy: 222, r: 13, fill: '#fff', stroke: IC, 'stroke-width': 3 })); txt(cart, 75, 190, 'm', { 'text-anchor': 'middle', fill: '#fff', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28 });
const pF = PUC.arrow(pm, FC, 7, 20), pA = PUC.arrow(pm, AC, 5, 16), pFl = txt(pm, 0, 0, 'F', { fill: FC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30 }), pAl = txt(pm, 0, 0, 'a', { fill: AC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28 });
const PW = [250, 420, 92], pWh = wheel(pm, PW[0], PW[1], PW[2], { rim: 6, sw: 2, n: 6 });
const pF2 = PUC.arrow(pm, FC, 7, 20), pT = curl(pm, FC, 5), pAc = curl(pm, AC, 4), pR = mk(pm, 'line', { x1: PW[0], y1: PW[1], x2: PW[0], y2: PW[1] - PW[2], stroke: RC, 'stroke-width': 4, 'stroke-dasharray': '6 5' });
const pF2l = txt(pm, PW[0] + 70, PW[1] - PW[2] - 22, 'F', { fill: FC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28 }), pTl = txt(pm, PW[0] - 74, PW[1] + 8, 'τ', { fill: FC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30, 'text-anchor': 'middle' }), pAcl = txt(pm, PW[0] + PW[2] + 40, PW[1] + 70, 'α', { fill: AC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30 });
const pRl = txt(pm, PW[0] + 10, PW[1] - 40, 'r', { fill: RC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26 }), pIl = txt(pm, PW[0] + 22, PW[1] + 44, 'I', { fill: IC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28 });
$('#pm').insertAdjacentHTML('beforeend', `<div class="fx" id="pf1" style="left:500px;top:140px;font-size:50px">${K(`${FF} = m\\,${tc(AC, 'a')}`)}</div><div class="fx" id="pf2" style="left:500px;top:390px;font-size:50px">${K(`${tau_} = ${II}\\,${al}`)}</div>`);

/* ---------- S: the wheel sim ---------- */
const s = $('#simS'), WC = [330, 270], R = 170, PXM = 340;    // 340 px per metre: R = 0.5 m
const Ig = 4, Fp = 20, rp = 0.5, TQ = Fp * rp, ALP = TQ / Ig, TP = 2, WMAX = ALP * TP;   // 10 N m, 2.5 rad/s^2, push 2 s, 5 rad/s
const kin = tau => tau <= TP ? { th: 0.5 * ALP * tau * tau, w: ALP * tau, push: tau > 0 && tau < TP } : { th: 0.5 * ALP * TP * TP + WMAX * (tau - TP), w: WMAX, push: false };
const wS = wheel(s, WC[0], WC[1], R), gsS = ghostSpokes(s, WC[0], WC[1], R);   // ghosts drawn over the disc
const Pp = [WC[0], WC[1] - R];
const sR = mk(s, 'line', { x1: WC[0], y1: WC[1], x2: Pp[0], y2: Pp[1], stroke: RC, 'stroke-width': 5, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round' }), sRl = txt(s, WC[0] - 12, WC[1] - 92, 'r = 0.5 m', { fill: RC, 'font-weight': 700, 'font-size': 21, 'text-anchor': 'end' });
const sF = PUC.arrow(s, FC, 8, 22), sFl = txt(s, 0, 0, 'F = 20 N', { fill: FC, 'font-weight': 700, 'font-size': 22 });
const sT = curl(s, FC, 6), sTl = txt(s, WC[0] - 66, WC[1] + 70, 'τ', { fill: FC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30, 'text-anchor': 'middle' });
const sAc = curl(s, AC, 4), sAl = txt(s, 0, 0, 'α', { fill: AC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28 });
const sW = curl(s, VC, 6), sWl = txt(s, 0, 0, 'ω', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 32 });
// slow-mo extras: the tiny turn d theta and its arc r d theta
const DTH = 0.42;
const sArc = mk(s, 'path', { d: `M${Pp[0]},${Pp[1]} A${R},${R} 0 0 1 ${(WC[0] + R * Math.sin(DTH)).toFixed(1)},${(WC[1] - R * Math.cos(DTH)).toFixed(1)}`, fill: 'none', stroke: RC, 'stroke-width': 9, 'stroke-linecap': 'round' });
const sR2 = mk(s, 'line', { x1: WC[0], y1: WC[1], x2: (WC[0] + R * Math.sin(DTH)).toFixed(1), y2: (WC[1] - R * Math.cos(DTH)).toFixed(1), stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const sDth = mk(s, 'path', { d: `M${WC[0]},${WC[1] - 64} A64,64 0 0 1 ${(WC[0] + 64 * Math.sin(DTH)).toFixed(1)},${(WC[1] - 64 * Math.cos(DTH)).toFixed(1)}`, fill: 'none', stroke: TC, 'stroke-width': 5 });
const sDthl = txt(s, WC[0] + 34, WC[1] - 78, 'dθ', { fill: TC, 'font-weight': 700, 'font-size': 22 }), sArcl = txt(s, WC[0] + 140, Pp[1] + 46, 'arc = r dθ', { fill: RC, 'font-weight': 700, 'font-size': 22 });
const sWk = txt(s, 430, 530, 'work = F · r dθ = τ dθ', { fill: EC, 'font-weight': 700, 'font-size': 24, 'text-anchor': 'middle' });
// sim timeline
const tL1 = wt('S3', 'Watch'), tCo = wt('S6', 'keeps') + 0.1, tFz = wt('S7', 'Freeze') + 0.05, TFZ = 1.0, tRA = TFZ - 0.25 * (tFz - tS7), tRes = tS10 + 0.1;
function state(t) {
  if (t >= tRes) { const tau = t < tRes + 0.8 ? TFZ + 0.25 * (t - tRes) : TFZ + 0.2 + (t - tRes - 0.8); return { tau, replay: t < tRes + 0.8 }; }
  if (t >= tS7) { const tau = t < tFz ? tRA + 0.25 * (t - tS7) : TFZ; return { tau, replay: t < tFz, frozen: t >= tFz }; }
  if (t >= tCo) return { tau: TP + (t - tCo) };
  if (t >= tL1) { const tau = Math.min(TP, t - tL1); return { tau, paused: tau >= TP }; }
  return { tau: 0, ready: true };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${IC}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${FC}">τ</span><span class="v" id="r_tq" style="color:${FC}">0.0</span><span class="u">N m</span>
  <span class="k" style="color:${AC}">α</span><span class="v" id="r_al" style="color:${AC}">0.00</span><span class="u">rad/s²</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">ω</span><span class="v" id="r_w" style="color:${VC}">0.00</span><span class="u">rad/s</span>
  <span class="k" style="color:${TC}">θ</span><span class="v" id="r_th" style="color:${TC}">0.00</span><span class="u">rad</span>
  <span class="k" style="color:${EC}">K</span><span class="v" id="r_k" style="color:${EC}">0.0</span><span class="u">J</span>`;
const gs = $('#grS'), GX = 8, g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: GX, ymin: 0, ymax: 60, xt: [0, 2, 4, 6], yt: [0, 25, 50], xl: 'θ (rad)' });
txt(gs, 122, 78, 'E (J)', { 'font-size': 18 });
const gWb = mk(gs, 'path', { d: '', fill: 'none', stroke: EC, 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.22 }), gK = mk(gs, 'path', { d: '', fill: 'none', stroke: EC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gDot = g.dot(EC, 10), gSl = txt(gs, 0, 0, 'slope = τ = 10 J/rad', { fill: FC, 'font-weight': 700, 'font-size': 19 }), gEnd = txt(gs, 668, 126, 'K stays 50 J →', { fill: EC, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'end' });
$('#leg').innerHTML = `<span><svg width="34" height="16"><line x1="4" y1="8" x2="30" y2="8" stroke="${EC}" stroke-width="12" opacity=".22" stroke-linecap="round"/></svg>work W = τθ</span><span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${EC}" stroke-width="5" stroke-linecap="round"/></svg>K = ½Iω²</span>`;
const plotE = (path, th1, wfn) => { if (th1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 60, x1 = Math.min(th1, GX); for (let i = 0; i <= n; i++) { const x = x1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(wfn(x)).toFixed(1); } attr(path, 'd', d); };
const Eth = x => x <= 5 ? TQ * x : 50;
$('#eq1').innerHTML = K(`${tau_} = ${FF}\\,${rr_} = 20 \\times 0.5 = ${tc(FC, '10\\,\\text{N m}')}`);
$('#eq2').innerHTML = K(`${tc('#7FD6D6', 'W')} = \\tau\\theta = 10 \\times 5 = 50\\,\\text{J} = ${tc('#7FD6D6', 'K')}`);
const th1 = PUC.think($('#th1'), { q: 'The push stops. Will the wheel slow down, or keep its spin? (No friction)', opts: ['It slows down', 'It keeps its spin'], right: 1, why: 'No torque, no angular acceleration: ω stays at 5 rad/s.' });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'So the potter kicks only to beat friction!' });

/* ---------- R: why 1/2 I omega^2 ---------- */
const LK = [`A bit at distance ${K(rr_)} moves at ${K(`${tc(VC, 'v')} = ${rr_}\\,${om}`)}`, `Its energy: ${K(`\\tfrac12 m${tc(VC, 'v')}^2 = \\tfrac12 m${rr_}^2${om}^2`)}`, `Add all bits: ${K(`\\textstyle\\sum m${rr_}^2 = ${II}`)}`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('') + `<div class="eqc ink" id="rP" style="top:430px;height:76px;font-size:38px">${K(`\\text{spin energy}\\;\\; ${tc('#7FD6D6', 'K')} = \\tfrac12\\,\\text{I}\\,${tc('#8FB4F7', '\\omega')}^2`)}</div>`;
const tLk = [wt('R2', 'bit'), wt('R3', 'energy'), wt('R4', 'Add')];
const rs = $('#rrS'), RW = [330, 300], RR = 210, rW = wheel(rs, RW[0], RW[1], RR, { fill: '#F4ECDF', rim: 6, spk: '#E2D2B8', n: 8 });
const BITS = [[0.15, -0.6], [0.30, 1.4], [0.45, 3.5]].map(([rm, a0]) => { const d = mk(rs, 'circle', { r: 13, fill: IC, stroke: '#fff', 'stroke-width': 3 }), ar = PUC.arrow(rs, VC, 5, 15), lb = txt(rs, 0, 0, (rm * 5).toFixed(2) + ' m/s', { fill: VC, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'middle' }), rl = mk(rs, 'line', { stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '5 5' }); return { rm, a0, d, ar, lb, rl }; });
txt(rs, 392, 552, 'same ω = 5 rad/s for every bit · v = rω', { fill: C.ink2, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'middle' });

/* ---------- D ---------- */
const STEPS = [[`d${WW} = ${FF}\\,${rr_}\\,d${th_} = ${tau_}\\,d${th_}`, 'work in a tiny turn: force times the arc'],
  [`${WW} = ${tau_}\\,${th_}`, 'a steady torque: add up the tiny turns'],
  [`${PP} = d${WW}/dt = ${tau_}\\,${om}`, 'work per second is power'],
  [`${tau_}\\,${om} = \\tfrac{d}{dt}\\big(\\tfrac12 ${II}${om}^2\\big) = ${II}\\,${om}\\,${al}`, 'power feeds the spin energy'],
  [`${tau_} = ${II}\\,${al}`, "cancel ω: Newton's second law for turning"]];
const SY = [84, 172, 260, 348, 436];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Work'), wt('D3', 'steady'), wt('D4', 'Work'), wt('D5', 'power'), wt('D6', 'Cancel')];
const TR = [[`${WW} = ${FF}\\,s`, `${WW} = ${tau_}\\,${th_}`], [`${PP} = ${FF}\\,${tc(VC, 'v')}`, `${PP} = ${tau_}\\,${om}`], [`${KK} = \\tfrac12 m${tc(VC, 'v')}^2`, `${KK} = \\tfrac12 ${II}${om}^2`], [`${FF} = m\\,${tc(AC, 'a')}`, `${tau_} = ${II}\\,${al}`]];
$('#trs').innerHTML = TR.map(([a, b], i) => `<div class="tr" id="tr${i}" style="top:${70 + i * 92}px"><div class="a">${K(a)}</div><div class="ar">${M.icon('arrowR', 32, C.mute, 2.4)}</div><div class="b">${K(b)}</div></div>`).join('');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tau_} = ${II}\\,${al} \\qquad ${WW} = ${tau_}\\,${th_} \\qquad ${KK} = \\tfrac12\\,${II}\\,${om}^2`);

/* ---------- K: light vs heavy wheel, same torque, same angle ---------- */
const KC = [290, 280], KR = 160;
const KV = [['#khS', 1, { fill: 'none', rim: 5, sw: 2, spk: '#C9CED8', n: 6, inner: false }], ['#klS', 4, { fill: '#B8865A', rim: 14, sw: 4, spk: '#8A6A4A', n: 6 }]].map(([id, I, opt]) => {
  const sv = $(id), w = wheel(sv, KC[0], KC[1], KR, opt), gh = ghostSpokes(sv, KC[0], KC[1], KR), f = PUC.arrow(sv, FC, 7, 20), fl = txt(sv, KC[0] + 30, KC[1] - KR - 28, 'τ = 10 N m', { fill: FC, 'font-weight': 700, 'font-size': 21 });
  const wc = curl(sv, VC, 5), rd = txt(sv, 530, 210, '', { fill: VC, 'font-weight': 700, 'font-size': 30 }), rt = txt(sv, 530, 260, '', { fill: TC, 'font-weight': 700, 'font-size': 24 });
  txt(sv, 530, 180, 'ω', { fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 24 }); txt(sv, 530, 300, 'turned while pushed', { 'font-size': 17 });
  const a = 10 / I, tp = Math.sqrt(2 * 5 / a);
  return { sv, gh, w, f, fl, wc, rd, rt, I, a, tp, wm: a * tp };
});
document.head.insertAdjacentHTML('beforeend','<style>#sK .kp .katex{font-size:1.15em}</style>'); $('#khP').innerHTML = `Pushed 5 rad → ${K(`${om} = 10\\,\\text{rad/s}`)}`; $('#klP').innerHTML = `Pushed 5 rad → ${K(`${om} = 5\\,\\text{rad/s}`)}`;
const tKs = [wt('K2', 'light') + 0.2, wt('K2', 'heavy') + 0.2];
const kAt = (q, tau) => tau <= q.tp ? { th: 0.5 * q.a * tau * tau, w: q.a * tau, push: tau > 0 && tau < q.tp } : { th: 5 + q.wm * (tau - q.tp), w: q.wm, push: false };
const th2 = PUC.think($('#th2'), { q: 'Same torque, same 5 rad of turning. Which wheel ends up with more spin energy?', opts: ['The light wheel', 'The heavy wheel', 'The same'], right: 2, why: 'Same work τθ = 50 J each. The light wheel just spins faster.' });

/* ---------- W: grinding wheel ---------- */
$('#wkq').innerHTML = 'A motor spins a grinding wheel (I = 0.5 kg m²) from rest to 20 rad/s in 4 s. Find the torque, the work and the average power.';
const wsol = PUC.solution($('#wl'), [
  [K(`${al} = \\dfrac{20}{4} = ${tc(AC, '5\\,\\text{rad/s}^2')}`)],
  [K(`${tau_} = ${II}\\,${al} = 0.5 \\times 5 = ${tc(FC, '2.5\\,\\text{N m}')}`)],
  [K(`${WW} = \\tfrac12 ${II}${om}^2 = \\tfrac12 \\times 0.5 \\times 20^2 = ${tc(EC, '100\\,\\text{J}')}`)],
  [K(`${PP}_{\\text{avg}} = \\dfrac{${WW}}{t} = \\dfrac{100}{4} = ${tc(PC, '25\\,\\text{W}')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 92 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), GWc = [240, 300], GR = 140;
mk(w, 'rect', { x: 40, y: GWc[1] - 18, width: 400, height: 36, rx: 6, fill: '#8D99AE', stroke: IC, 'stroke-width': 2.5 });
mk(w, 'rect', { x: 40, y: GWc[1] - 70, width: 70, height: 140, rx: 10, fill: '#5B6B8C', stroke: IC, 'stroke-width': 3 }); txt(w, 75, GWc[1] + 100, 'MOTOR', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 });
const gwG = mk(w, 'g', {}), gwW = mk(gwG, 'g', {});
mk(gwW, 'circle', { cx: GWc[0], cy: GWc[1], r: GR, fill: STONE, stroke: IC, 'stroke-width': 6 });
const grit = M.rng(107); for (let i = 0; i < 70; i++) { const a = grit() * 6.283, r = 30 + grit() * (GR - 40); mk(gwW, 'circle', { cx: GWc[0] + r * Math.cos(a), cy: GWc[1] + r * Math.sin(a), r: 2 + grit() * 2, fill: '#7C8596' }); }
mk(gwW, 'line', { x1: GWc[0], y1: GWc[1], x2: GWc[0] + GR - 8, y2: GWc[1], stroke: IC, 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(gwG, 'circle', { cx: GWc[0], cy: GWc[1], r: 22, fill: '#fff', stroke: IC, 'stroke-width': 4 });
const gwC = curl(w, VC, 6);
$('#wro').innerHTML = `<span class="k" style="font-style:normal;color:${IC}">t</span><span class="v" id="w_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">ω</span><span class="v" id="w_w" style="color:${VC}">0.0</span><span class="u">rad/s</span>
  <span class="k" style="color:${EC}">K</span><span class="v" id="w_k" style="color:${EC}">0.0</span><span class="u">J</span>`;
$('#wr').insertAdjacentHTML('beforeend', `<div class="eqc" id="wchk" style="font-size:24px">${K(`\\text{check: } ${th_} = \\tfrac12 ${al} t^2 = 40\\,\\text{rad},\\;\\; ${tau_}${th_} = 2.5 \\times 40 = 100\\,\\text{J}`)}</div>`);
const tWs = wt('W2', 'from'), tW = [wt('W3', 'Angular'), wt('W4', 'Torque'), wt('W5', 'Work'), wt('W6', 'Average')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Put 120 rpm straight in: ${K('\\omega = 120')}`, right: `Convert first: 120 rpm = ${K(`${om} = 4\\pi\\,\\text{rad/s}`)}` });
$('#cvs').innerHTML = `<div class="lbl" style="left:960px;top:30px">ω MUST BE IN rad/s</div>` + [`1\\ \\text{rev} = 2\\pi\\ \\text{rad}`, `1\\ \\text{min} = 60\\ \\text{s}`, `120 \\times \\dfrac{2\\pi}{60} = ${tc(VC, '4\\pi\\ \\text{rad/s}')}`].map((f, i) => `<div class="cvc" id="cv${i}" style="left:${960 + (i === 1 ? 260 : 0)}px;top:${[80, 80, 156][i]}px;${i === 2 ? 'height:76px;' : ''}">${K(f)}</div>`).join('');
const where = PUC.where($('#wa'), { on: [], type: 'Torque and work, power P = τω, and the energy of a spinning flywheel' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A flywheel (I = 2 kg m²) spins at 600 rpm. A steady brake stops it in 10 revolutions. Find the braking torque.', qW: 760,
  opts: ['10π N m', '20π N m', '40π² N m', '2π N m'], right: 1, optY: 300, optH: 90 });
const so = PUC.solution($('#so'), [
  [K(`${om} = 600 \\times \\tfrac{2\\pi}{60} = 20\\pi\\ \\text{rad/s}`)], [K(`${KK} = \\tfrac12 \\times 2 \\times (20\\pi)^2 = 400\\pi^2\\ \\text{J}`)],
  [K(`${th_} = 10 \\times 2\\pi = 20\\pi\\ \\text{rad}`)], [K(`${tau_} = \\dfrac{400\\pi^2}{20\\pi} = 20\\pi \\approx 62.8\\ \\text{N m}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '23px');
const tSo = [wt('A2', 'Omega'), wt('A3', 'Spin'), wt('A4', 'Ten'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · dynamics of rotation', y0: 100, dy: 96, txt: [0, 0, 1, 1],
  lines: [K(`${tau_} = ${II}\\,${al} \\qquad ${WW} = ${tau_}\\,${th_} \\qquad ${PP} = ${tau_}\\,${om}`), K(`${KK} = \\tfrac12\\,${II}\\,${om}^2 \\;\\; = \\;\\text{work done by the torque}`),
    '<b>No torque</b>: ω stays the same (no α)', '<b>ω in rad/s</b>: 1 rev = 2π rad, so 1 rpm = 2π/60 rad/s'] });
const YQ = ['Why does the wheel keep spinning after the push stops?', 'Why do a light and a heavy wheel get the same spin energy from the same push?', 'Why must ω be in rad/s in ½Iω²?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 108', topic: 'Arms in, spin faster: Conservation of Angular Momentum', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 + 0.1, 1.06, 960, 540], [tS10 - 0.4, 1, 960, 540]]);
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
    JW.forEach((q, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const t0 = tMorph + 0.8 + i * 0.5, uf = M.o3((t - t0) / 0.35) * (1 - M.io((t - t0 - 0.8) / 0.3));
      q.f.set(112, 20, 112 + 96 * uf, 20); const sp = 3 * M.clamp((t - t0 - 0.2) / 0.8), ph = Math.max(0, t - t0 - 0.2) * 3 - (t - t0 - 0.2 < 0.8 ? 0 : 0);
      q.w.set(ph); q.c.set(222, 60, 52, -1.2, 1.6 * M.clamp(sp / 3)); });
    vis($('#hjP'), t, wt('H2', 'push', 1) - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const ph = hPhase(t), rt = hRate(t);
    hMk.forEach((c, i) => { const a = ph + i * Math.PI / 2, on = Math.sin(a) > -0.1; attr(c, 'cx', (270 + 180 * Math.cos(a)).toFixed(1)); attr(c, 'cy', (420 + 38 * Math.sin(a) + 8).toFixed(1)); c.style.opacity = on ? 1 : 0; });
    hMk2.forEach((c, i) => { const a = ph + i * 2.09, on = Math.sin(a) > 0; attr(c, 'x', (265 + 118 * Math.cos(a)).toFixed(1)); attr(c, 'y', (231 + 22 * Math.sin(a)).toFixed(1)); c.style.opacity = on ? 1 : 0; });
    const kk = Math.max(...tKick.map(tk => M.o3((t - tk + 0.25) / 0.25) * (1 - M.io((t - tk - 0.15) / 0.25))), M.o3((t - tHk + 0.1) / 0.3) * (1 - M.io((t - tHk - 1.6) / 0.3)));
    hF.set(118, 452, 118 + 100 * kk, 452); attr(hFl, 'x', 124); attr(hFl, 'y', 438); hFl.style.opacity = kk.toFixed(3);
    hW.set(270, 420, 200, 0.5, 0.9 * M.clamp(rt / 3.6)); hWl.style.opacity = M.clamp(rt / 1.2).toFixed(3); attr(hWl, 'x', 470); attr(hWl, 'y', 540 - 40);
    vis($('#hkQ'), t, wt('H4', 'Where') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const r = $('#qr' + i); vis(r, t, tQa[i] - 0.1, 1e9, POP); ['.qar', '.qb', '.qn', '.qd'].forEach((c, j) => vis(r.querySelector(c), t, tQr[i] - 0.1 + j * 0.08, 1e9, { dx: -12, dy: 0 })); });
    vis($('#pP'), t, T1('P4') - 0.4, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const tc0 = wt('P1', 'force'), ua = M.clamp(t - tc0 - 0.3, 0, 2.6), cx = 150 + 0.5 * 40 * ua * ua;
    attr(cart, 'transform', `translate(${cx.toFixed(1)},0)`);
    const uF = M.o3((t - tc0 + 0.1) / 0.4); pF.set(cx - 10 - 100 * uF, 182, cx - 10, 182); attr(pFl, 'x', cx - 70); attr(pFl, 'y', 160); pFl.style.opacity = uF;
    const uA = M.o3((t - wt('P1', 'acceleration') + 0.1) / 0.4); pA.set(cx + 40, 128, cx + 40 + 80 * uA, 128); attr(pAl, 'x', cx + 128); attr(pAl, 'y', 136); pAl.style.opacity = uA;
    vis($('#pf1'), t, wt('P1', 'acceleration') + 0.3, 1e9, { dy: 10 });
    const tw0 = wt('P2', 'Torque'), uT = M.o3((t - tw0 + 0.1) / 0.4), wa = M.clamp(t - tw0 - 0.2, 0, 99);
    pWh.set(0.5 * 0.8 * wa * wa); vis(pWh.o, t, wt('P2', 'wheel') - 0.1, 1e9, { dy: 0 });
    pF2.set(PW[0] - 10, PW[1] - PW[2], PW[0] - 10 + 110 * uT, PW[1] - PW[2]); pF2l.style.opacity = uT;
    pT.set(PW[0], PW[1], 50, -2.6, 1.6 * uT); pTl.style.opacity = uT; pR.style.opacity = uT; pRl.style.opacity = uT;
    pIl.style.opacity = M.io((t - wt('P3', 'Moment')) / 0.3);
    const uAc = M.o3((t - wt('P4', 'Angular') + 0.1) / 0.4); pAc.set(PW[0], PW[1], PW[2] + 24, 0.1, 1.2 * uAc); pAcl.style.opacity = uAc;
    vis($('#pf2'), t, wt('P4', 'grows') - 0.2, 1e9, { dy: 10 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('R1'), simOut = OUT('S5'), simIn2 = OUT('S6') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const S = state(t), k = kin(S.tau);
    wS.set(k.th); vis(wS.o, t, tS1 + 0.4, 1e9, { dy: 0 });
    const moving = !S.paused && !S.frozen && !S.ready && k.w > 0.1;
    setGhosts(gsS, WC[0], WC[1], k.th, S.replay ? k.w * 0.4 : k.w, moving);
    // r and F: shown from S2 while pushing (and during the replay)
    const uR = M.o3((t - wt('S2', 'half') + 0.1) / 0.4), uFi = M.o3((t - wt('S2', 'pushes') + 0.1) / 0.4);
    const pushOn = S.ready ? uFi : (k.push || S.frozen) ? 1 : S.paused ? M.clamp(1 - (t - (tL1 + TP)) / 0.3) : 0;
    sF.set(Pp[0] + 6, Pp[1], Pp[0] + 6 + 130 * pushOn, Pp[1]); attr(sFl, 'x', Pp[0] + 30); attr(sFl, 'y', Pp[1] - 22); sFl.style.opacity = pushOn.toFixed(3);
    const showR = (S.ready || k.push || S.frozen || S.paused) ? uR : 0; sR.style.opacity = showR; sRl.style.opacity = showR;
    const uT = (S.ready ? M.o3((t - wt('S2', 'Torque') + 0.1) / 0.4) : 1) * pushOn; sT.set(WC[0], WC[1], 48, Math.PI * 0.6, 1.5 * uT); sTl.style.opacity = uT.toFixed(3);
    const uAl = k.push || S.frozen ? 1 : 0; sAc.set(WC[0], WC[1], R + 26, -0.2, 0.9 * uAl); attr(sAl, 'x', WC[0] + (R + 44) * Math.cos(0.5)); attr(sAl, 'y', WC[1] + (R + 44) * Math.sin(0.5) + 10); sAl.style.opacity = uAl;
    const wl = M.clamp(k.w / WMAX); sW.set(WC[0], WC[1], R + 26, -Math.PI * 0.75, 1.3 * wl); attr(sWl, 'x', WC[0] - (R + 64) * Math.cos(0.25 * Math.PI) - 10); attr(sWl, 'y', WC[1] - (R + 40) * Math.sin(0.25 * Math.PI)); sWl.style.opacity = wl > 0.05 ? 1 : 0;
    // slow-mo: tiny turn, arc, work
    const fz = S.frozen || (S.replay && t >= tRes) ? 1 : 0, uArc = fz * M.io((t - wt('S8', 'small') + 0.1) / 0.4), uDth = fz * M.io((t - wt('S8', 'tiny') + 0.1) / 0.4), uWk = fz * M.io((t - wt('S9', 'work') + 0.1) / 0.4);
    M.drawU(sArc, uArc); sR2.style.opacity = uDth; sDth.style.opacity = uDth; sDthl.style.opacity = uDth; sArcl.style.opacity = uArc; sWk.style.opacity = uWk;
    vis($('#big'), t, wt('S8', 'small'), tRes + 0.6, { ...POP, sc: 0.8, outDur: 0.2 });
    vis($('#rdy'), t, tS1 + 0.6, tL1 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#pz'), t, tL1 + TP, tCo - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS7 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tRes + 0.8, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    vis($('#eq1'), t, wt('S2', 'Torque') + 0.2, tS5 - 0.4, POP); vis($('#eq2'), t, wt('S11', 'holds') - 0.2, 1e9, POP);
    // readout: round t first, then compute
    const tr = Math.round(S.tau * 100) / 100, kr = kin(tr), pushR = tr > 0 && tr < TP;
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_tq'), f1(pushR || (S.frozen) ? TQ : 0)); M.setT($('#r_al'), f2(pushR || S.frozen ? ALP : 0));
    M.setT($('#r_w'), f2(kr.w)); M.setT($('#r_th'), f2(kr.th)); M.setT($('#r_k'), f1(0.5 * Ig * kr.w * kr.w));
    $('#r_w').style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('S6', 'stays')) / 0.3) * (1 - M.io((t - tS7) / 0.3)));
    $('#r_k').style.background = mix('#FFFFFF', '#D6EFEF', M.io((t - wt('S11', 'holds')) / 0.3));
    // graph: K vs theta (and the work band W = tau theta)
    plotE(gWb, kr.th, Eth); plotE(gK, kr.th, x => Eth(x)); gDot(Math.min(kr.th, GX), Eth(Math.min(kr.th, GX)), t >= tL1 - 0.05);
    const uS = M.io((t - wt('S10', 'slope') + 0.1) / 0.4); attr(gSl, 'x', g.X(0.4)); attr(gSl, 'y', g.Y(30)); gSl.style.opacity = uS;
    gEnd.style.opacity = kr.th > GX ? 1 : 0;
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    vis($('#th1'), t, tS5 + 0.05, OUT('S6'), { dy: 36, ...o });
    th1(t, { tin: tS5, tOpts: wt('S5', 'Will') - 0.1, tCount: T1('S5') + 0.05, dur: 3, tAns: tS6 - 0.02, tWhy: wt('S6', 'No') });
    avA(t, wt('S6', 'stays') + 0.2, tS7 - 0.1);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP)); vis($('#rP'), t, wt('R4', 'spin') - 0.1, 1e9, POP);
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const ph = Math.max(0, t - tR1 - 0.6) * 0.6;
    rW.set(ph);
    const uV = M.o3((t - wt('R2', 'moves') + 0.1) / 0.5);
    BITS.forEach((b, i) => { const a = b.a0 + ph, rp2 = b.rm * 400 * (RR / 200), x = RW[0] + rp2 * Math.cos(a), y = RW[1] + rp2 * Math.sin(a);
      attr(b.d, 'cx', x.toFixed(1)); attr(b.d, 'cy', y.toFixed(1)); vis(b.d, t, wt('R2', 'bit') + i * 0.15, 1e9, { dy: 0 });
      attr(b.rl, 'x1', RW[0]); attr(b.rl, 'y1', RW[1]); attr(b.rl, 'x2', x.toFixed(1)); attr(b.rl, 'y2', y.toFixed(1)); b.rl.style.opacity = M.io((t - wt('R2', 'distance')) / 0.3) * 0.8;
      const L = 50 * b.rm * 5 * uV, d = [-Math.sin(a), Math.cos(a)]; b.ar.set(x + d[0] * 16, y + d[1] * 16, x + d[0] * (16 + L), y + d[1] * (16 + L));
      attr(b.lb, 'x', (x + d[0] * (40 + L) + Math.cos(a) * 24).toFixed(1)); attr(b.lb, 'y', (y + d[1] * (40 + L) + Math.sin(a) * 24 + 6).toFixed(1)); b.lb.style.opacity = uV; });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; 
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    TR.forEach((_, i) => { const r = $('#tr' + i), tl = tStep[i + 1] + 0.5; vis(r, t, tD1 + 0.6 + i * 0.1, 1e9, { dy: 10 }); const on = M.io((t - tl) / 0.3); r.style.background = mix('#FFFFFF', C.ac2, on);
      r.querySelector('.b').style.opacity = (0.15 + 0.85 * on).toFixed(3); });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'that') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'spin') + 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK1 + 0.3, out, { dx: 60, dy: 0, ...o }); vis($('#exK'), t, tK1 + 0.7, 1e9, { dy: 8 });
    KV.forEach((q, i) => { const tau = Math.max(0, t - tKs[i]), k = kAt(q, tau), mv = tau > 0 && k.w > 0.1;
      q.w.set(k.th); setGhosts(q.gh, KC[0], KC[1], k.th, k.w, mv);
      const fOn = M.o3((t - wt('K1', 'torque') + 0.1) / 0.4) * (tau < q.tp ? 1 : M.clamp(1 - (tau - q.tp) / 0.3)); q.f.set(KC[0] + 4, KC[1] - KR, KC[0] + 4 + 110 * fOn, KC[1] - KR); q.fl.style.opacity = fOn.toFixed(3);
      q.wc.set(KC[0], KC[1], KR + 22, -Math.PI * 0.8, 1.4 * M.clamp(k.w / 10)); M.setT(q.rd, f1(k.w) + ' rad/s'); M.setT(q.rt, 'θ = ' + f2(Math.min(5, k.th)) + ' rad');
      vis($(i ? '#klP' : '#khP'), t, tKs[i] + q.tp, 1e9, POP); });
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const tau = M.clamp(t - tWs, 0, 99), tr = Math.round(Math.min(tau, 4) * 100) / 100, ww = 5 * tr, th = tau < 4 ? 2.5 * tau * tau : 40 + 20 * (tau - 4);
    attr(gwW, 'transform', `rotate(${(th * 180 / Math.PI).toFixed(2)} ${GWc[0]} ${GWc[1]})`);
    gwC.set(GWc[0], GWc[1], GR + 24, -Math.PI * 0.7, 1.4 * M.clamp(ww / 20));
    vis($('#wro'), t, T0('W2') + 0.6, 1e9, { dy: 10 });
    M.setT($('#w_t'), f2(tr)); M.setT($('#w_w'), f1(ww)); M.setT($('#w_k'), f1(0.5 * 0.5 * ww * ww));
    vis($('#wchk'), t, wt('W5', 'joules') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'omega') - 0.1, tStrike: wt('X3', 'must') - 0.1, tRight: wt('X3', 'radians') });
    vis($('#cvs .lbl'), t, wt('X3', 'must'), 1e9, { dy: 8 });
    [wt('X3', 'times') - 0.1, wt('X3', 'sixty') - 0.2, wt('X3', 'four') - 0.1].forEach((tt, i) => vis($('#cv' + i), t, tt, 1e9, POP));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'torque') });
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
