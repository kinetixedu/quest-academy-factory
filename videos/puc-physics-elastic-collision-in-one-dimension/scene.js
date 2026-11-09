// PUC Physics Ep 87: Elastic collision in one dimension (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', EC = C.teal, ED = '#0A6464', EL = '#66BFBF';   // momentum p plum; kinetic energy K teal (ball A darker, ball B lighter)
const FC = C.orange, VC = C.ac, MC = C.ink, CB = '#5B6B8C';          // force orange, v blue, mass ink, ball B slate
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const sub = (p, x, y, s, b, col, fs = 28, a = {}) => { const e = it(p, x, y, s, col, Object.assign({ 'font-size': fs }, a)); const ts = document.createElementNS(nsv, 'tspan'); ts.setAttribute('font-size', Math.round(fs * 0.62)); ts.setAttribute('dy', Math.round(fs * 0.22)); ts.textContent = b; e.appendChild(ts); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const u1 = tc(VC, 'u_1'), v1 = tc(VC, 'v_1'), v2 = tc(VC, 'v_2');
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const sg = v => (v < 0 ? '' : '') + (Math.abs(v - Math.round(v)) < 1e-9 ? String(v) : v.toFixed(1));

/* elastic contact model: a stiff spring between the balls for a time D (sim seconds).
   r = {mA, mB, uA, uB, xA, xB (centre px), RA, RB}, PX = px per metre. Returns centres, velocities, squash (px). */
const mkRun = (r, PX, D) => {
  const Mt = r.mA + r.mB, V = (r.mA * r.uA + r.mB * r.uB) / Mt, w0 = r.uA - r.uB, om = Math.PI / D, mu = r.mA * r.mB / Mt;
  const th = ((r.xB - r.RB) - (r.xA + r.RA)) / (PX * w0), xc0 = (r.mA * r.xA + r.mB * r.xB) / Mt;
  const fA = V - r.mB / Mt * w0, fB = V + r.mA / Mt * w0;
  const at = tau => {
    if (tau <= th) return { xA: r.xA + PX * r.uA * tau, xB: r.xB + PX * r.uB * tau, vA: r.uA, vB: r.uB, c: 0, U: 0 };
    const s = Math.min(tau - th, D), urel = w0 * Math.cos(om * s), c = PX * w0 / om * Math.sin(om * s);
    const xc = xc0 + PX * V * (th + s), sep = r.RA + r.RB - c;
    let xA = xc - r.mB / Mt * sep, xB = xc + r.mA / Mt * sep, vA = V + r.mB / Mt * urel, vB = V - r.mA / Mt * urel;
    const U = 0.5 * mu * (w0 * w0 - urel * urel);
    if (tau > th + D) { const e = tau - th - D; xA += PX * fA * e; xB += PX * fB * e; vA = fA; vB = fB; return { xA, xB, vA, vB, c: 0, U: 0 }; }
    return { xA, xB, vA, vB, c, U };
  };
  return Object.assign({ at, th, D, V, fA, fB, K0: 0.5 * r.mA * r.uA ** 2 + 0.5 * r.mB * r.uB ** 2, p0: r.mA * r.uA + r.mB * r.uB }, r);
};
// a ball drawn as an ellipse (it flattens on the contact side while squashed)
const ballG = (p, col, lab) => { const o = mk(p, 'g', {}), e = mk(o, 'ellipse', { fill: col }), hl = mk(o, 'ellipse', { fill: '#fff', opacity: 0.18 }), tx = txt(o, 0, 0, lab, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 22, 'font-family': 'Poppins' });
  return { o, set(cx, cy, R, cl, cr) { const L = cx - R + cl, Rr = cx + R - cr, rx = (Rr - L) / 2, mx = (L + Rr) / 2, ry = R + (cl + cr) / 5; attr(e, 'cx', mx.toFixed(1)); attr(e, 'cy', cy); attr(e, 'rx', rx.toFixed(1)); attr(e, 'ry', ry.toFixed(1));
    attr(hl, 'cx', (mx - rx * 0.35).toFixed(1)); attr(hl, 'cy', (cy - ry * 0.4).toFixed(1)); attr(hl, 'rx', (rx * 0.3).toFixed(1)); attr(hl, 'ry', (ry * 0.22).toFixed(1)); attr(tx, 'x', mx.toFixed(1)); attr(tx, 'y', cy + 8); } };
};
// desk toy: hanging steel balls. set(angles[5] in degrees, ghost angle or null)
const cradle = (p, cx, py, L, R, n = 5) => {
  const o = mk(p, 'g', {}), xs = [...Array(n)].map((_, i) => cx + (i - (n - 1) / 2) * 2 * R), base = py + L + R + 34;
  mk(o, 'path', { d: `M${cx - n * R - 50},${base} V${py} H${cx + n * R + 50} V${base}`, fill: 'none', stroke: C.ink2, 'stroke-width': 6, 'stroke-linejoin': 'round' });
  mk(o, 'rect', { x: cx - n * R - 80, y: base, width: 2 * n * R + 160, height: 14, rx: 7, fill: C.ink2 });
  const gh = mk(o, 'g', {}), ghS = mk(gh, 'line', { stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }), ghB = mk(gh, 'circle', { r: R, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '7 5' });
  const ghT = txt(gh, 0, 0, '', { fill: C.red, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
  const S = xs.map(x => mk(o, 'line', { x1: x, y1: py, x2: x, y2: py + L, stroke: C.ink, 'stroke-width': 2.5 }));
  const B = xs.map(x => mk(o, 'circle', { cx: x, cy: py + L, r: R, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 3 }));
  const H = xs.map(x => mk(o, 'circle', { cx: x - R * 0.35, cy: py + L - R * 0.4, r: R * 0.25, fill: '#fff', opacity: 0.55 }));
  return { o, gh, ghT, set(ang, gA, gl = '') {
    xs.forEach((x, i) => { const a = ang[i] * Math.PI / 180, bx = x + L * Math.sin(a), by = py + L * Math.cos(a); attr(S[i], 'x2', bx.toFixed(1)); attr(S[i], 'y2', by.toFixed(1)); attr(B[i], 'cx', bx.toFixed(1)); attr(B[i], 'cy', by.toFixed(1)); attr(H[i], 'cx', (bx - R * 0.35).toFixed(1)); attr(H[i], 'cy', (by - R * 0.4).toFixed(1)); });
    M.hide(gh, gA == null); if (gA != null) { const x = xs[n - 1], a = gA * Math.PI / 180, bx = x + L * Math.sin(a), by = py + L * Math.cos(a); attr(ghS, 'x1', x); attr(ghS, 'y1', py); attr(ghS, 'x2', bx.toFixed(1)); attr(ghS, 'y2', by.toFixed(1)); attr(ghB, 'cx', bx.toFixed(1)); attr(ghB, 'cy', by.toFixed(1)); attr(ghT, 'x', 760); attr(ghT, 'y', py - 16); M.setT(ghT, gl); }
  } };
};
// pendulum angle: released from -A at t0, period Tp (small-swing model). Left balls take min(0, th), right balls max(0, th)
const swing = (t, t0, A, Tp = 1.6) => t < t0 ? -A * M.io((t - t0 + 0.5) / 0.5) : -A * Math.cos(2 * Math.PI * (t - t0) / Tp);

Object.assign(M.IC, {
  ball: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'],
  wall: ['M4 3v18', 'M4 6h5', 'M4 11h5', 'M4 16h5', 'M15 12h5', 'm17 9-3 3 3 3'],
  balls: ['M7 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M17 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['ball', 'Marble hits marble', 'ONE STOPS DEAD'], ['wall', 'Ball hits a wall', 'BOUNCES STRAIGHT BACK'], ['balls', 'Heavy hits light', 'LIGHT ONE LEAVES FASTER']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'marble'), wt('H1', 'wall'), wt('H2', 'heavy')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="100"></svg></div>`).join('');
// mini before/after pictures: [ball radius, x], arrows [x, len] (blue v), drawn after the hit
const JP = [{ b: [[16, 70, MC], [16, 104, CB]], vb: [[70, 40]], va: [[104, 46]] }, { b: [[16, 150, MC]], wall: 1, vb: [[150, 50]], va: [[150, -50]] }, { b: [[26, 60, MC], [12, 104, CB]], vb: [[60, 40]], va: [[60, 24], [104, 70]] }];
const JA = JOBS.map((_, i) => { const s = $('#jsv' + i), d = JP[i]; mk(s, 'line', { x1: 10, y1: 86, x2: 290, y2: 86, stroke: C.ink, 'stroke-width': 2.5 }); if (d.wall) mk(s, 'rect', { x: 190, y: 20, width: 14, height: 66, fill: C.ink2 });
  const balls = d.b.map(([r, x, col]) => mk(s, 'circle', { cx: x, cy: 86 - r, r, fill: col }));
  const aw = [...d.vb, ...d.va].map(() => PUC.arrow(s, VC, 5, 14)); return { d, balls, aw }; });
const TILES = [[C.ink, '1 in, 1 out'], [C.ink, '2 in, 2 out'], [C.red, 'Why not 1 out at 2v?']];
$('#wqs').innerHTML = TILES.map(([c, w], i) => `<div class="wq" id="wq${i}" style="color:${c}"><span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'exactly'), wt('H4', 'two', 1), wt('H4', 'Why')];
const hk = cradle($('#hkS'), 470, 110, 150, 18);
const tSw1 = wt('H3', 'Swing') + 0.3, tSw2 = wt('H4', 'Swing') + 0.35;

/* ---------- P: two things kept + the squash ---------- */
const QR = [['p', PC, 'Total momentum', 'kept in every collision', 'INTERNAL PUSHES'], ['K', EC, 'Total kinetic energy', 'kept only in an elastic collision', 'ELASTIC ONLY']];
$('#qrs').innerHTML = QR.map(([s, c, n, d, u], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 176}px"><div class="qs" style="color:${c}">${s}</div><div class="qn">${n}</div><div class="qd">${d}</div><div class="qu" style="color:${c}">${u}</div></div>`).join('');
$('#lawP').innerHTML = `Elastic: <span style="color:#E7A6C9">p kept</span> + <span style="color:#7FD1D1">K kept</span>`;
const tQr = [tP1, wt('P2', 'elastic')];
const pm = $('#pmS'); ground(pm, 40, 744, 330);
const PB = [ballG(pm, MC, 'A'), ballG(pm, CB, 'B')];
const tSq = wt('P3', 'squash'), tBk = wt('P3', 'back');
// real-time model for the P card: approach at 150 px/s, contact from tSq - 0.3 to tBk + 0.2
const PD = tBk + 0.2 - (tSq - 0.3), PU = 40;
const pRun = mkRun({ mA: 1, mB: 1, uA: PU, uB: 0, xA: 392 - 70 - PU * 1.4, xB: 392 + 70, RA: 70, RB: 70 }, 1, PD);
const XC = [['heat'], ['sound'], ['a dent']];
$('#xcs').innerHTML = XC.map(([w], i) => `<div class="xc" id="xc${i}"><i>${M.icon('x', 18, '#fff', 3)}</i><span>${w}</span></div>`).join('') + `<div class="lbl" id="xcL" style="left:36px;top:440px;color:var(--red)">NOTHING LOST AS</div>`;
const tXc = [wt('P3', 'heat'), wt('P3', 'sound'), wt('P3', 'dent')];

/* ---------- S: the sim ---------- */
const s = $('#simS'), TY = 400, PXM = 60, DC = 0.4, RD = 2.2, PV = 28;
ground(s, 36, 748, TY);
for (let k = 0; k <= 11; k++) { const x = 46 + PXM * k; mk(s, 'line', { x1: x, y1: TY, x2: x, y2: TY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(s, x, TY + 36, k, { 'text-anchor': 'middle', 'font-size': 15 }); }
txt(s, 748, TY + 36, 'm', { 'text-anchor': 'end', 'font-size': 15 });
const RCFG = [[2, 2], [4, 2], [2, 4]], RAD = m => (m === 4 ? 48 : 40);
const RUNS = RCFG.map(([mA, mB]) => { const RA = RAD(mA), RB = RAD(mB), xA = 46 + RA, xB = xA + RA + PXM * 3 * 0.6 + RB; return mkRun({ mA, mB, uA: 3, uB: 0, xA, xB, RA, RB }, PXM, DC); });
const ghA = [0, 1, 2].map(() => mk(s, 'circle', { fill: MC, opacity: 0 })), ghB = [0, 1, 2].map(() => mk(s, 'circle', { fill: CB, opacity: 0 }));
const bwrap = mk(s, 'g', {}), bA = ballG(bwrap, MC, 'A'), bB = ballG(bwrap, CB, 'B');
const mA_t = txt(bwrap, 0, TY + 62, '', { 'text-anchor': 'middle', fill: MC, 'font-weight': 600, 'font-size': 18 }), mB_t = txt(bwrap, 0, TY + 62, '', { 'text-anchor': 'middle', fill: CB, 'font-weight': 600, 'font-size': 18 });
const aVA = PUC.arrow(s, VC, 6, 18), aVB = PUC.arrow(s, VC, 6, 18);
const lVA = sub(s, 0, 0, 'v', 'A', VC, 26), lVB = sub(s, 0, 0, 'v', 'B', VC, 26);
const aFA = PUC.arrow(s, FC, 7, 20), aFB = PUC.arrow(s, FC, 7, 20), lF = txt(s, 0, 0, 'squash pushes both', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 19 });
const lU = txt(s, 0, 0, 'stored in the squash: 4.5 J', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 20 });
const lCm = txt(s, 0, 0, 'both at 1.5 m/s', { 'text-anchor': 'middle', fill: VC, 'font-weight': 700, 'font-size': 20 });
// timeline in sim time
const tL1 = tS3 + 0.1, tFz = wt('S5', 'squash') + 0.1, TAU_FZ = RUNS[0].th + DC / 2, tRA = TAU_FZ - 0.25 * (tFz - tS5), tRes = tS7 + 0.1;
const tL2 = wt('S8', 'keeps') - 0.75, tL3 = wt('S9', 'bounces') - 0.75;
function state(t) {
  if (t >= tS9) return { r: 2, tau: M.clamp(t - tL3, 0, RD), pause: t < tL3 };
  if (t >= tS8) return { r: 1, tau: M.clamp(t - tL2, 0, RD), pause: t < tL2 };
  if (t >= tS5) {
    const r0 = RUNS[0], te = r0.th + DC, sl = (te - TAU_FZ) / 0.25;
    const tau = t < tFz ? tRA + 0.25 * (t - tS5) : t < tRes ? TAU_FZ : t < tRes + sl ? TAU_FZ + 0.25 * (t - tRes) : Math.min(RD, te + (t - tRes - sl));
    return { r: 0, tau, replay: t < tRes + sl, frozen: t >= tFz && t < tRes };
  }
  return { r: 0, tau: M.clamp(t - tL1, 0, RD), pause: t < tL1 };
}
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v<sub>A</sub></span><span class="v" id="r_vA" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub>B</sub></span><span class="v" id="r_vB" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${PC}">p<sub>total</sub></span><span class="v" id="r_p" style="color:${PC}">0.0</span><span class="u">kg m/s</span>
  <span class="k" style="color:${EC}">K<sub>total</sub></span><span class="v" id="r_K" style="color:${EC}">0.00</span><span class="u">J</span>
  <span class="k" style="color:${EL}">U<sub>squash</sub></span><span class="v" id="r_U" style="color:${EL}">0.00</span><span class="u">J</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: RD, ymin: 0, ymax: 20, xt: [0, 0.5, 1, 1.5, 2], yt: [0, 4.5, 9, 18], xl: 't (s)', yl: 'K (J)' });
const gRef = mk(gs, 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.45 });
const gT = mk(gs, 'path', { d: '', fill: 'none', stroke: EC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.9 });
const gA = mk(gs, 'path', { d: '', fill: 'none', stroke: ED, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gB = mk(gs, 'path', { d: '', fill: 'none', stroke: EL, 'stroke-width': 4, 'stroke-dasharray': '7 5' });
const dT = g.dot(EC, 10), dA = g.dot(ED, 8), dB = g.dot(EL, 8);
$('#leg').innerHTML = [[ED, '', 'K<sub>A</sub>'], [EL, '7 5', 'K<sub>B</sub>'], [EC, '', 'K<sub>total</sub>']].map(([c, da, n], i) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="${i === 2 ? 6 : 4}" stroke-dasharray="${da}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const plot = (path, f, s1) => { if (s1 <= 0.001) { attr(path, 'd', ''); return; } let d = ''; const n = 110; for (let i = 0; i <= n; i++) { const x = s1 * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } attr(path, 'd', d); };
const th1 = PUC.think($('#th1'), { q: 'After the hit, does ball A stop dead, or bounce back?', opts: ['Stops dead', 'Bounces back'], right: 0, why: 'Equal masses swap velocities: A gets 0, B gets 3 m/s.' });
const RUNL = ['RUN 1 · A 2 kg · B 2 kg', 'RUN 2 · A 4 kg · B 2 kg', 'RUN 3 · A 2 kg · B 4 kg'];

/* ---------- D: formulas ---------- */
const m1 = 'm_1', m2 = 'm_2';
const STEPS = [[`${m1}${u1} = ${m1}${v1} + ${m2}${v2}`, 'momentum: before = after', 'p', PC],
  [`\\tfrac12 ${m1}${u1}^2 = \\tfrac12 ${m1}${v1}^2 + \\tfrac12 ${m2}${v2}^2`, 'kinetic energy: before = after', 'K', EC],
  [`${m1}(${u1} - ${v1}) = ${m2}${v2} \\qquad ${m1}(${u1}^2 - ${v1}^2) = ${m2}${v2}^2`, "ball 1's terms on the left, in both lines"],
  [`${u1} + ${v1} = ${v2}`, 'divide, using a² - b² = (a - b)(a + b)'],
  [`${v1} = \\dfrac{${m1} - ${m2}}{${m1} + ${m2}}\\,${u1} \\qquad ${v2} = \\dfrac{2${m1}}{${m1} + ${m2}}\\,${u1}`, 'put step 4 back into step 1']];
const SY = [76, 166, 260, 350, 438];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:84px"></div>` + STEPS.map(([f, w, tg, tcol], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" ${i === 4 ? 'style="left:700px;top:32px"' : ''}>${w}</div>${tg ? `<div class="tag" id="dtg${i}" style="left:auto;right:0;top:6px;background:${tcol}">${tg === 'p' ? 'MOMENTUM' : 'ENERGY'}</div>` : ''}</div>`).join('');
const tStep = [wt('D2', 'Momentum'), wt('D3', 'Kinetic'), wt('D4', 'Group'), wt('D5', 'Divide'), wt('D6', 'Put')];
const CT = [['m₁, m₂', 'v₁', 'v₂', 1], ['2, 2', '0', '3'], ['4, 2', '1', '4'], ['2, 4', '-1', '2']];
$('#ctab').innerHTML = CT.map(([a, b, c, h], i) => `<div class="ctab" id="ct${i}" style="top:${70 + i * 56}px;${h ? 'font:600 18px IBM Plex Mono;letter-spacing:.06em;color:var(--mute)' : ''}"><span>${a}${h ? ' (kg)' : ''}</span><span style="color:${h ? C.mute : VC}">${b}</span><span style="color:${h ? C.mute : VC}">${c}</span></div>`).join('') + `<div class="lbl" id="ctU" style="left:24px;top:300px;text-transform:none">all with u₁ = 3 m/s · v in m/s</div>`;
const tCt = [wt('D7', 'zero'), wt('D7', 'one'), wt('D7', 'minus')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${v2} - ${v1} = ${u1} - ${tc(VC, 'u_2')}`) + `<span style="font:500 30px Poppins;color:var(--mute);margin-left:28px">speed apart = speed of approach</span>`;

/* ---------- R: link by link ---------- */
const LK = [[`2 balls in at ${K('v')}: &nbsp;${K(tc(PC, 'p = 2mv'))}, &nbsp;${K(tc(EC, 'K = mv^2'))}`, 0],
  [`1 ball out at ${K('2v')}: &nbsp;${K(tc(PC, 'p = m(2v) = 2mv'))}`, 1],
  [`its ${K(tc(EC, 'K = \\tfrac12 m(2v)^2 = 2mv^2'))} &nbsp;double!`, -1],
  [`so 2 balls out at ${K('v')}: &nbsp;${K(tc(PC, 'p'))} and ${K(tc(EC, 'K'))} both kept`, 1]];
$('#lks').innerHTML = LK.map(([h, ok], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 104}px"><div class="n">${i + 1}</div><div class="lt">${h}</div>${ok ? `<div class="mk" style="background:${ok > 0 ? C.ok : C.red}">${M.icon(ok > 0 ? 'check' : 'x', 22, '#fff', 3)}</div>` : ''}</div>`).join('');
const tLk = [wt('R2', 'Two'), wt('R3', 'Suppose'), wt('R4', 'But'), wt('R5', 'So')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Energy picks the answer: two balls!' });
const rr = $('#rrS'), rc = cradle(rr, 392, 92, 150, 20);
// bars: IN, 1 OUT AT 2v, 2 OUT AT v ; p and K in units of mv and mv^2 (60 px per unit)
const BG = [['IN: 2 AT v', 2, 1, 0], ['OUT: 1 AT 2v', 2, 2, 1], ['OUT: 2 AT v', 2, 1, 2]], BX = [120, 360, 600], BY = 540, BU = 44;
const bars = BG.map(([lab, p, k, i]) => { const gq = mk(rr, 'g', {}), go = mk(gq, 'g', {});
  const rp = mk(go, 'rect', { x: BX[i] - 56, y: BY - p * BU, width: 48, height: p * BU, rx: 6, fill: PC });
  const rk = mk(go, 'rect', { x: BX[i] + 8, y: BY - k * BU, width: 48, height: k * BU, rx: 6, fill: i === 1 ? C.red : EC });
  txt(go, BX[i] - 32, BY - p * BU - 10, p === 2 ? '2mv' : 'mv', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 17 });
  txt(go, BX[i] + 32, BY - k * BU - 10, k === 2 ? '2mv²' : 'mv²', { 'text-anchor': 'middle', fill: i === 1 ? C.red : EC, 'font-weight': 700, 'font-size': 17 });
  txt(go, BX[i], BY + 28, lab, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 17 });
  return gq; });
mk(rr, 'line', { x1: 40, y1: BY, x2: 744, y2: BY, stroke: C.ink, 'stroke-width': 2.5 });
const rLeg = txt(rr, 40, 336, '', { 'font-size': 20, 'font-weight': 700, 'font-family': 'Poppins' }); rLeg.innerHTML = `<tspan fill="${PC}">■ momentum p</tspan><tspan dx="24" fill="${EC}">■ kinetic energy K</tspan>`;
const tRin = wt('R2', 'come'), tRout = wt('R5', 'two') + 0.2;

/* ---------- K: side by side ---------- */
const sideRun = (svg, mA, mB, RA, RB, U) => { ground(svg, 36, 748, 300); const xA = 46 + RA + 30, xB = xA + RA + U * 1.4 + RB; const r = mkRun({ mA, mB, uA: U, uB: 0, xA, xB, RA, RB }, 1, 0.3);
  const wrap = mk(svg, 'g', {}), gA2 = [0, 1, 2].map(() => mk(wrap, 'circle', { fill: MC, opacity: 0 })), gB2 = [0, 1, 2].map(() => mk(wrap, 'circle', { fill: CB, opacity: 0 }));
  const a = ballG(wrap, MC, mA > mB ? '10m' : 'm'), b = ballG(wrap, CB, mB > mA ? '10m' : 'm');
  const va = PUC.arrow(wrap, VC, 6, 18), vb = PUC.arrow(wrap, VC, 6, 18);
  return { r, wrap, gA2, gB2, a, b, va, vb, RA, RB }; };
const SR = [sideRun($('#khS'), 10, 1, 48, 22, 40), sideRun($('#klS'), 1, 10, 22, 48, 40)];
// mass labels: heavy ball shows "10m" inside; light shows "m" (font shrinks for the light one)
SR.forEach(q => { [q.a, q.b].forEach((bb, i) => { const R = i ? q.RB : q.RA; if (R < 30) bb.o.querySelector('text').setAttribute('font-size', 16); }); });
$('#khV').innerHTML = `<span id="kh0">${K(tc(VC, 'v_1') + ' = 0.82\\,' + tc(VC, 'u'))}</span><span id="kh1">${K(tc(VC, 'v_2') + ' = 1.82\\,' + tc(VC, 'u'))}</span>`;
$('#klV').innerHTML = `<span id="kl0">${K(tc(VC, 'v_1') + ' = -0.82\\,' + tc(VC, 'u'))}</span><span id="kl1">${K(tc(VC, 'v_2') + ' = 0.18\\,' + tc(VC, 'u'))}</span>`;
$('#khP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Heavy barely slows · light leaves at nearly 2<i>u</i>`;
$('#klP').innerHTML = `${M.icon('check', 26, C.ok, 3)}Light bounces back at nearly <i>u</i>, like off a wall`;
const tKh = [wt('K1', 'barely'), wt('K1', 'twice')], tKl = [wt('K2', 'bounces'), wt('K2', 'wall')];
const tRunH = tK1 + 0.6, tRunL = tK2 + 0.2;
const th2 = PUC.think($('#th2'), { q: 'A bus at 10 m/s hits a still rubber ball, head on, elastically. The ball leaves at about...', opts: ['About 10 m/s', 'About 20 m/s'], right: 1, why: 'The bus keeps nearly 10; they must part at 10 m/s: ball ~20.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = 'A 3 kg block slides at 5 m/s on smooth ice into a 2 kg block at rest. The hit is elastic. Find both velocities.';
const wsol = PUC.solution($('#wl'), [
  [K(`${v1} = \\dfrac{3 - 2}{3 + 2}\\times 5 = ${tc(VC, '1\\,\\text{m/s}')}`)],
  [K(`${v2} = \\dfrac{2\\times 3}{3 + 2}\\times 5 = ${tc(VC, '6\\,\\text{m/s}')}`)],
  [K(`${tc(PC, 'p')}: 15 = 3 + 12 \\quad ${tc(EC, 'K')}: 37.5 = 1.5 + 36`)],
  [K(`${v2} - ${v1} = 6 - 1 = 5 = ${u1}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY = 300, WPX = 40; ground(w, 36, 748, WY);
txt(w, 392, WY + 40, 'smooth ice: no friction', { 'text-anchor': 'middle', 'font-size': 17 });
const wRun = mkRun({ mA: 3, mB: 2, uA: 5, uB: 0, xA: 50 + 60, xB: 50 + 120 + WPX * 5 * 0.7 + 40, RA: 60, RB: 40 }, WPX, 0.12);
const wA = mk(w, 'g', {}), wB = mk(w, 'g', {});
const wAr = mk(wA, 'rect', { y: WY - 84, width: 120, height: 84, rx: 8, fill: MC }); const wAt = txt(wA, 0, WY - 34, '3 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 22 });
const wBr = mk(wB, 'rect', { y: WY - 64, width: 80, height: 64, rx: 8, fill: CB }); const wBt = txt(wB, 0, WY - 24, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 20 });
const wvA = PUC.arrow(w, VC, 6, 18), wvB = PUC.arrow(w, VC, 6, 18), wlA = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' }), wlB = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' });
const wTag = txt(w, 748, 110, '', { 'text-anchor': 'end', fill: C.ink2, 'font-weight': 700, 'font-size': 18 });
$('#wtb').innerHTML = `<span class="h" style="text-align:left"></span><span class="h">BEFORE</span><span class="h">AFTER</span>
  <span style="text-align:left;color:${PC};font-style:italic;font-family:Poppins">p</span><span id="wp0" style="color:${PC}">15</span><span id="wp1" style="color:${PC}">3 + 12</span>
  <span style="text-align:left;color:${EC};font-style:italic;font-family:Poppins">K</span><span id="wk0" style="color:${EC}">37.5</span><span id="wk1" style="color:${EC}">1.5 + 36</span>`;
const tW = [wt('W3', 'v'), wt('W4', 'v'), wt('W5', 'Check'), wt('W6', 'six')];
const tWgo = wt('W2', 'hit') - 0.4;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Elastic bodies always swap velocities', right: 'They swap only when the masses are equal' });
const tp = $('#tpS'), tpH = txt(tp, 20, 52, 'v (m/s) BEFORE → AFTER', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1 });
[[0, '2 kg + 2 kg', '3, 0', '0, 3', 'SWAP', C.ok], [1, '4 kg + 2 kg', '3, 0', '1, 4', 'NO SWAP', C.red]].forEach(([i, m, b, a, tg, col]) => { const y = 108 + i * 84, gq = mk(tp, 'g', { id: 'tpr' + i });
  txt(gq, 20, y, m, { fill: C.ink, 'font-weight': 600, 'font-size': 24 }); txt(gq, 210, y, b, { fill: VC, 'font-weight': 600, 'font-size': 26 }); txt(gq, 300, y, '→', { fill: C.mute, 'font-size': 26 }); txt(gq, 350, y, a, { fill: VC, 'font-weight': 600, 'font-size': 26 });
  const r = mk(gq, 'rect', { x: 456, y: y - 28, width: tg.length * 13 + 28, height: 38, rx: 8, fill: col }); txt(gq, 470, y - 3, tg, { fill: '#fff', 'font-weight': 700, 'font-size': 18 }); });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals on final velocities, energy passed on, and the heavy and light limits' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Ball A (mass <i>m</i>) hits ball B, at rest, head on and elastically. A keeps moving forward at one third of its speed. What is the mass of B?', qW: 780,
  opts: [K('m/2'), K('2m'), K('m/3'), K('3m')], right: 0, optY: 330, optH: 96 });
const so = PUC.solution($('#so'), [
  [K(`${v1} = \\dfrac{m - M}{m + M}\\,${tc(VC, 'u')}`)],
  [K(`\\dfrac{m - M}{m + M} = \\dfrac13`)],
  [K(`3m - 3M = m + M`)],
  [K(`2m = 4M \\;\\Rightarrow\\; M = \\dfrac{m}{2}`)]], { y0: 100, dy: 120 });
const tSo = [wt('A2', 'v'), wt('A3', 'Set'), wt('A3', 'Three'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · elastic collision in 1D', y0: 100, dy: 104, txt: [0, 0, 1, 1],
  lines: [K(`${tc(PC, `${m1}${u1} = ${m1}${v1} + ${m2}${v2}`)} \\qquad ${tc(EC, 'K_{\\text{before}} = K_{\\text{after}}')}`),
    K(`${v1} = \\dfrac{${m1} - ${m2}}{${m1} + ${m2}}\\,${u1} \\qquad ${v2} = \\dfrac{2${m1}}{${m1} + ${m2}}\\,${u1}`),
    '<b>Equal masses</b>: they swap velocities', `<b>Speed apart = speed of approach</b>: &nbsp;${K(`${v2} - ${v1} = ${u1}`)}`] });
const YQ = ['Why does only one steel ball fly out when one swings in?', 'When do two bodies swap velocities?', 'A ball hits a wall elastically at 5 m/s. How fast does it come back?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 88', topic: 'Two trolleys stick together. Where does the energy go?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.06, 960, 540], [tS8 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  x = 36; [0, 1, 2].forEach(i => { const e = $('#xc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 12 - bp.offsetWidth) + 'px';
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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const q = JA[i], t0 = tMorph + 0.7 + i * 0.5, ub = M.o3((t - t0) / 0.4), ua = M.o3((t - t0 - 0.8) / 0.4), hit = t >= t0 + 0.65;
      const nb = q.d.vb.length; q.d.vb.forEach(([x, L], k) => q.aw[k].set(x, 30, x + L * ub * (hit ? 0 : 1), 30));
      q.d.va.forEach(([x, L], k) => { const y = q.d.va.length > 1 ? 30 + (k ? -14 : 14) : 30; q.aw[nb + k].set(x, y, x + L * ua, y); });
      if (i === 0) { attr(q.balls[0], 'cx', hit ? 70 : M.lerp(30, 70, M.clamp((t - t0) / 0.65))); attr(q.balls[1], 'cx', hit ? 104 + 90 * M.o3((t - t0 - 0.65) / 0.8) : 104); }
      if (i === 1) attr(q.balls[0], 'cx', t < t0 + 0.65 ? M.lerp(90, 174, M.clamp((t - t0) / 0.65)) : 174 - 80 * M.o3((t - t0 - 0.65) / 0.8));
      if (i === 2) { attr(q.balls[0], 'cx', hit ? 78 + 30 * M.o3((t - t0 - 0.65) / 0.8) : M.lerp(30, 78, M.clamp((t - t0) / 0.65))); attr(q.balls[1], 'cx', hit ? 104 + 150 * M.o3((t - t0 - 0.65) / 0.8) : 104); }
    });
    vis($('#hjP'), t, wt('H5', 'collision') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    vis(hk.o, t, wt('H3', 'row') - 0.1, 1e9, { dy: 0 });
    // one ball, then two balls; physics-true pendulum swing
    const two = t >= tSw2 - 0.6, th = two ? swing(t, tSw2, 28) : swing(t, tSw1, 28), L = Math.min(0, th), R = Math.max(0, th);
    hk.set(two ? [L, L, 0, R, R] : [L, 0, 0, 0, R], t > tTile[2] - 0.1 ? Math.max(0, swing(t, tSw2, 50)) : null, '1 ball at 2v?');
    hk.gh.style.opacity = M.io((t - tTile[2] + 0.1) / 0.3).toFixed(3);
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.redBg, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.1, 1e9, POP); vis(el.querySelector('.qu'), t, i ? wt('P2', 'saved') : wt('P1', 'internal') - 0.1, 1e9, POP); });
    vis($('#lawP'), t, wt('P2', 'kinetic') + 0.4, 1e9, POP);
    vis($('#pm'), t, tP3 - 0.6, out, { dx: 60, dy: 0, ...o });
    const tau = t - (tSq - 0.3 - 1.4), k = pRun.at(Math.max(0, tau));
    PB[0].set(k.xA, 330 - 70, 70, 0, k.c / 2); PB[1].set(k.xB, 330 - 70, 70, k.c / 2, 0);
    vis($('#sq0'), t, tSq - 0.1, 1e9, POP); vis($('#sq1'), t, tBk - 0.1, 1e9, POP);
    XC.forEach((_, i) => vis($('#xc' + i), t, tXc[i] - 0.1, 1e9, POP)); vis($('#xcL'), t, wt('P3', 'Nothing') - 0.1, 1e9, { dy: 8 });
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S2'), simIn2 = OUT('S3') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), r = RUNS[S.r], k = r.at(S.tau);
    // a quick fade when a new pair of balls is set up
    const sw = Math.min(1, ...[tS8, tS9].map(ts => Math.abs(t - ts) / 0.18));
    bwrap.style.opacity = sw.toFixed(3);
    const cyA = TY - r.RA, cyB = TY - r.RB;
    bA.set(k.xA, cyA, r.RA, 0, k.c / 2); bB.set(k.xB, cyB, r.RB, k.c / 2, 0);
    vis(bA.o, t, tS1 + 0.5, 1e9, { dx: -30, dy: 0 }); vis(bB.o, t, wt('S1', 'B') - 0.1, 1e9, { dx: 30, dy: 0 });
    attr(mA_t, 'x', k.xA.toFixed(1)); attr(mB_t, 'x', k.xB.toFixed(1)); M.setT(mA_t, r.mA + ' kg'); M.setT(mB_t, r.mB + ' kg');
    vis(mA_t, t, wt('S1', 'two') - 0.1, 1e9, { dy: 6 }); vis(mB_t, t, wt('S1', 'also') - 0.1, 1e9, { dy: 6 });
    // ghosts (in sim time)
    const moving = !S.pause && !S.frozen && S.tau > 0.02 && S.tau < RD, gstep = S.replay ? 0.03 : 0.07;
    [[ghA, 'xA', r.RA, cyA], [ghB, 'xB', r.RB, cyB]].forEach(([gh, key, R, cy]) => gh.forEach((e, j) => { const q = r.at(Math.max(0, S.tau - gstep * (j + 1))); attr(e, 'cx', q[key].toFixed(1)); attr(e, 'cy', cy); attr(e, 'r', R); e.style.opacity = (moving && Math.abs(q[key] - k[key]) > 4 ? [0.3, 0.2, 0.12][j] : 0) * sw; }));
    // velocity arrows grow from the balls
    const vOn = M.o3((t - wt('S1', 'rolls') + 0.1) / 0.5) * sw, ayA = TY - 2 * r.RA - 34, ayB = TY - 2 * r.RB - 74;
    aVA.set(k.xA, ayA, k.xA + PV * k.vA * vOn, ayA); aVB.set(k.xB, ayB, k.xB + PV * k.vB * vOn, ayB);
    attr(lVA, 'x', (k.xA + PV * k.vA * vOn + (k.vA >= 0 ? 8 : -44)).toFixed(1)); attr(lVA, 'y', ayA + 9); lVA.style.opacity = (Math.abs(k.vA) > 0.3 ? vOn : 0).toFixed(3);
    attr(lVB, 'x', (k.xB + PV * k.vB + 8).toFixed(1)); attr(lVB, 'y', ayB + 9); lVB.style.opacity = (Math.abs(k.vB) > 0.3 ? sw : 0).toFixed(3);
    // frozen squash: forces from the contact, common velocity, stored energy
    const fz = S.r === 0 && S.replay ? M.o3((t - wt('S6', 'Both') + 0.1) / 0.5) * (1 - M.io((t - tRes - 0.6) / 0.3)) : 0, xc = k.xA + r.RA - k.c / 2, fy = TY - r.RA;
    aFA.set(xc - 4, fy, xc - 4 - 90 * fz * (k.c > 0.5 ? 1 : 0), fy); aFB.set(xc + 4, fy, xc + 4 + 90 * fz * (k.c > 0.5 ? 1 : 0), fy);
    attr(lF, 'x', xc); attr(lF, 'y', 214); lF.style.opacity = (fz * (k.c > 0.5 ? 1 : 0)).toFixed(3);
    attr(lCm, 'x', xc); attr(lCm, 'y', 168); vis(lCm, t, wt('S6', 'together') - 0.1, tRes, { dy: 6 });
    attr(lU, 'x', xc); attr(lU, 'y', 140); vis(lU, t, wt('S6', 'stored') - 0.1, tRes + 0.4, { dy: 6 });
    // tags
    vis($('#rdy'), t, tS1 + 0.6, tL1 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    if (t >= tS8) vis($('#rdy'), t, tS8 + 0.1, tL2 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    if (t >= tS9) vis($('#rdy'), t, tS9 + 0.1, tL3 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS5 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tS8 - 0.2, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    const rcEl = $('#runc'); M.setT(rcEl, RUNL[S.r]); vis(rcEl, t, tS1 + 0.7, 1e9, { dy: 8 }); rcEl.style.background = mix(C.soft, C.ac2, Math.max(...[tS8, tS9].map(ts => M.io((t - ts) / 0.2) * (1 - M.io((t - ts - 1.2) / 0.4)))));
    { const e = $('#simEq'), aft = S.tau >= r.th + r.D, kk = S.r + '|' + aft;
      if (e._k !== kk) { e._k = kk; e.innerHTML = `<span class="pm"><i style="font-family:Poppins">p</i> ${r.p0}</span>${aft ? `<span class="sm">→</span><span class="pm">${r.p0}</span>` : ''}<span class="sm">kg m/s</span><span class="sm" style="margin-left:12px">·</span><span class="te"><i style="font-family:Poppins">K</i> ${r.K0}</span>${aft ? `<span class="sm">→</span><span class="te">${r.K0}</span>` : ''}<span class="sm">J</span><span class="sm" style="margin-left:6px">${aft ? 'before → after' : 'before'}</span>`; }
      vis(e, t, wt('S1', 'rolls') + 0.3, tS10 - 0.1, POP); vis($('#allP'), t, tS10 + 0.1, 1e9, POP);
      e.style.background = mix(C.soft, C.ac2, M.io((t - tS4) / 0.3) * (1 - M.io((t - tS5) / 0.3))); }
    // readout: round t first, then compute every value from it
    const tr = Math.round(S.tau * 100) / 100, kr = r.at(tr), KA = 0.5 * r.mA * kr.vA ** 2, KB = 0.5 * r.mB * kr.vB ** 2;
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_vA'), f2(kr.vA)); M.setT($('#r_vB'), f2(kr.vB));
    M.setT($('#r_p'), f1(r.mA * kr.vA + r.mB * kr.vB)); M.setT($('#r_K'), f2(KA + KB)); M.setT($('#r_U'), f2(kr.U));
    // graph: K of each ball and the total, dots linked to the sim time
    const KAf = x => { const q = r.at(x); return 0.5 * r.mA * q.vA ** 2; }, KBf = x => { const q = r.at(x); return 0.5 * r.mB * q.vB ** 2; };
    plot(gA, KAf, S.tau); plot(gB, KBf, S.tau); plot(gT, x => KAf(x) + KBf(x), S.tau);
    attr(gRef, 'x1', g.X(0)); attr(gRef, 'x2', g.X(RD)); attr(gRef, 'y1', g.Y(r.K0).toFixed(1)); attr(gRef, 'y2', g.Y(r.K0).toFixed(1));
    const KAn = 0.5 * r.mA * k.vA ** 2, KBn = 0.5 * r.mB * k.vB ** 2, dOn = t >= wt('S1', 'rolls');
    dA(S.tau, KAn, dOn); dB(S.tau, KBn, dOn); dT(S.tau, KAn + KBn, dOn);
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    vis($('#th1'), t, tS2 + 0.05, OUT('S3'), { dy: 36, ...o });
    th1(t, { tin: tS2, tOpts: wt('S2', 'does') - 0.1, tCount: T1('S2') + 0.05, dur: 3, tAns: tS3 - 0.02, tWhy: wt('S3', 'B') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; hb.style.height = (t > tStep[4] - 0.1 ? M.lerp(84, 104, M.io((t - tStep[4] + 0.1) / 0.3)) : 84).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    vis($('#ct0'), t, tD1 + 0.7, 1e9, { dy: 8 }); vis($('#ctU'), t, tD1 + 0.9, 1e9, { dy: 8 });
    tCt.forEach((tt, i) => vis($('#ct' + (i + 1)), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    vis($('#dpP'), t, wt('D7', 'Just') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'bodies') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'came') + 0.2, 0.8);
  }

  /* R: link by link */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.1, 1e9, POP); const mkk = el.querySelector('.mk'); if (mkk) vis(mkk, t, tLk[i] + (i === 2 ? wt('R4', 'Double') - tLk[2] : 1.0), 1e9, { ...POP, sc: 0.3 }); });
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o });
    // two balls swing in; at R3 a ghost shows one ball out at 2v; from R5 the real swing continues
    const thr = t < tRout ? swing(t, tRin, 26) : swing(t, tRout - 0.4, 26), L = Math.min(0, thr), Rg = Math.max(0, thr);
    const inOnly = t < tRout ? Math.min(0, swing(Math.min(t, tRin + 0.4), tRin, 26)) : L;
    rc.set(t < tRout ? [inOnly, inOnly, 0, 0, 0] : [L, L, 0, Rg, Rg], t > tLk[1] - 0.1 && t < tRout ? 56 * M.io((t - tLk[1]) / 0.6) : null, '1 ball at 2v');
    rc.gh.style.opacity = (M.io((t - tLk[1] + 0.1) / 0.3) * (1 - M.io((t - tRout + 0.3) / 0.3))).toFixed(3);
    bars.forEach((b, i) => vis(b, t, [tLk[0] + 0.3, tLk[1] + 0.6, tLk[3] + 0.3][i], 1e9, { dy: 0 }));
    vis(rLeg, t, tLk[0] + 0.3, 1e9, { dy: 0 });
    avA(t, wt('R5', 'fly') + 0.2, out);
  }

  /* K: side by side */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK2 - 0.1, out, { dx: 60, dy: 0, ...o });
    [[SR[0], tRunH], [SR[1], tRunL]].forEach(([q, t0]) => { const tau = M.clamp(t - t0, 0, q.r.th + 0.3 + 4.5), k = q.r.at(tau), cyA = 300 - q.RA, cyB = 300 - q.RB;
      q.a.set(k.xA, cyA, q.RA, 0, k.c / 2); q.b.set(k.xB, cyB, q.RB, k.c / 2, 0);
      const mv = tau > 0.02 && tau < q.r.th + 4.79; [[q.gA2, 'xA', q.RA, cyA], [q.gB2, 'xB', q.RB, cyB]].forEach(([gh, key, R, cy]) => gh.forEach((e, j) => { const p = q.r.at(Math.max(0, tau - 0.12 * (j + 1))); attr(e, 'cx', p[key].toFixed(1)); attr(e, 'cy', cy); attr(e, 'r', R); e.style.opacity = mv && Math.abs(p[key] - k[key]) > 4 ? [0.3, 0.2, 0.12][j] : 0; }));
      const PVk = 2; q.va.set(k.xA, 150, k.xA + PVk * k.vA, 150); q.vb.set(k.xB, 200, k.xB + PVk * k.vB, 200); });
    vis($('#kh0'), t, tKh[0] - 0.1, 1e9, POP); vis($('#kh1'), t, tKh[1] - 0.1, 1e9, POP); vis($('#khP'), t, tKh[1] + 0.6, 1e9, POP);
    vis($('#kl0'), t, tKl[0] - 0.1, 1e9, POP); vis($('#kl1'), t, tKl[0] + 0.5, 1e9, POP); vis($('#klP'), t, tKl[1] - 0.1, 1e9, POP);
    vis($('#th2'), t, tK3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK3, tOpts: wt('K3', 'Does') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'bus') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tau = M.clamp(t - tWgo, 0, wRun.th + wRun.D + 1.1), k = wRun.at(tau);
    attr(wAr, 'x', (k.xA - 60).toFixed(1)); attr(wAt, 'x', k.xA.toFixed(1)); attr(wBr, 'x', (k.xB - 40).toFixed(1)); attr(wBt, 'x', k.xB.toFixed(1));
    vis(wA, t, T0('W2') + 0.5, 1e9, { dx: -30, dy: 0 }); vis(wB, t, wt('W2', 'two') - 0.1, 1e9, { dx: 30, dy: 0 });
    const vOn = M.o3((t - wt('W2', 'five') + 0.1) / 0.5), aft = tau > wRun.th + wRun.D;
    wvA.set(k.xA, 150, k.xA + 24 * k.vA * vOn, 150); wvB.set(k.xB, 190, k.xB + 24 * k.vB, 190);
    attr(wlA, 'x', (k.xA + 12 * k.vA).toFixed(1)); attr(wlA, 'y', 134); M.setT(wlA, f1(k.vA) + ' m/s'); wlA.style.opacity = (Math.abs(k.vA) > 0.3 ? vOn : 0).toFixed(3);
    attr(wlB, 'x', (k.xB + 12 * k.vB).toFixed(1)); attr(wlB, 'y', 228); M.setT(wlB, f1(k.vB) + ' m/s'); wlB.style.opacity = Math.abs(k.vB) > 0.3 ? 1 : 0;
    M.setT(wTag, aft ? 'AFTER THE HIT' : 'BEFORE THE HIT'); vis(wTag, t, T0('W2') + 0.6, 1e9, { dy: 6 });
    vis($('#wtb'), t, tW[2] - 0.1, 1e9, { dy: 16 });
    ['#wp0', '#wp1', '#wk0', '#wk1'].forEach((id, i) => vis($(id), t, [wt('W5', 'fifteen'), wt('W5', 'three'), wt('W5', 'thirty'), wt('W5', 'both')][i] - 0.1, 1e9, POP));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'elastic') - 0.1, tStrike: wt('X3', 'only') - 0.2, tRight: wt('X3', 'only') + 0.2 });
    vis(tpH, t, wt('X3', 'equal') - 0.4, 1e9, { dy: 0 });
    vis($('#tpr0'), t, wt('X3', 'equal') - 0.1, 1e9, { dy: 0 }); vis($('#tpr1'), t, wt('X3', 'With') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.2, tCount, tAns });
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

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
