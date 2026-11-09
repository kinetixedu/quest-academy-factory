// PUC Physics Ep 88: Perfectly inelastic collision (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', EC = C.teal, ED = '#0A6464', EL = '#66BFBF', LC = '#8A93A6';   // momentum plum; K teal (A darker, B lighter); K lost grey
const FC = C.orange, VC = C.ac, MC = C.ink, CB = '#5B6B8C', PAD = '#E8B33A';         // force orange, v blue, cart A ink, cart B slate, sticky pad
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const sub = (p, x, y, s, b, col, fs = 28, a = {}) => { const e = it(p, x, y, s, col, Object.assign({ 'font-size': fs }, a)); const ts = document.createElementNS(nsv, 'tspan'); ts.setAttribute('font-size', Math.round(fs * 0.62)); ts.setAttribute('dy', Math.round(fs * 0.22)); ts.textContent = b; e.appendChild(ts); return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };

/* perfectly inelastic contact: a soft pad on A's front is crushed by a constant force for D (sim s), then the pair moves as one.
   r = {mA, mB, uA, uB, xA, xB (left edges, px), wA, wB, pad}. Returns left edges, velocities, crush c (px), energy gone into the pad. */
const mkRun = (r, PX, D) => {
  const Mt = r.mA + r.mB, V = (r.mA * r.uA + r.mB * r.uB) / Mt, w0 = r.uA - r.uB, mu = r.mA * r.mB / Mt;
  const th = (r.xB - (r.xA + r.wA + r.pad)) / (PX * w0);
  const at = tau => {
    const t1 = Math.min(tau, th), s = M.clamp(tau - th, 0, D), e = Math.max(0, tau - th - D);
    const I = w0 * (s - s * s / (2 * D)), urel = tau <= th ? w0 : w0 * (1 - s / D);
    const xA = r.xA + PX * (r.uA * t1 + V * s + r.mB / Mt * I + V * e), xB = r.xB + PX * (r.uB * t1 + V * s - r.mA / Mt * I + V * e);
    const vA = tau <= th ? r.uA : V + r.mB / Mt * urel, vB = tau <= th ? r.uB : V - r.mA / Mt * urel;
    return { xA, xB, vA, vB, c: PX * I, L: 0.5 * mu * (w0 * w0 - urel * urel) };
  };
  return Object.assign({ at, th, D, V, K0: 0.5 * r.mA * r.uA ** 2 + 0.5 * r.mB * r.uB ** 2, p0: r.mA * r.uA + r.mB * r.uB, Lmax: 0.5 * mu * w0 * w0 }, r);
};
// a cart with an optional sticky pad on its front. set(x, crush)
const cartG = (p, w, col, label, ty, pad = 0, h = 48) => { const o = mk(p, 'g', {}), g = mk(o, 'g', {});
  const body = mk(g, 'rect', { x: 0, y: ty - h - 20, width: w, height: h, rx: 8, fill: col });
  const tx = txt(g, w / 2, ty - 20 - h / 2 + 7, label, { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
  [w * 0.22, w * 0.78].forEach(x => mk(g, 'circle', { cx: x, cy: ty - 13, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }));
  const pd = pad ? mk(g, 'rect', { x: w, y: ty - h - 12, width: pad, height: h - 16, rx: 4, fill: PAD, stroke: C.ink, 'stroke-width': 2 }) : null;
  return { o, g, set(x, c = 0) { attr(g, 'transform', `translate(${x.toFixed(1)},0)`); if (pd) { attr(pd, 'width', Math.max(2, pad - c).toFixed(1)); attr(pd, 'height', (h - 16 + Math.min(10, c * 0.5)).toFixed(1)); attr(pd, 'y', (ty - h - 12 - Math.min(10, c * 0.5) / 2).toFixed(1)); } } };
};

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  sound: ['M11 5 6 9H2v6h4l5 4V5z', 'M15.54 8.46a5 5 0 0 1 0 7.07', 'M19.07 4.93a10 10 0 0 1 0 14.14'],
  dent: ['M3 7h18', 'M3 17h6l3-4 3 4h6'],
  blob: ['M12 4c4 0 7 2.5 7 6.5S16 20 12 20s-7-5.5-7-9.5S8 4 12 4Z'],
  train: ['M4 15V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z', 'M4 11h16', 'm8 19-2 3', 'm16 19 2 3'],
  energy: ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tS2 = T0('S2'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tS8 = T0('S8'), tS9 = T0('S9'), tS10 = T0('S10');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tK4 = T0('K4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['blob', 'Clay hits a wall', 'IT STICKS'], ['train', 'Coaches couple up', 'ROLL AWAY AS ONE'], ['energy', 'Every such crash', 'SOMETHING VANISHES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'clay'), wt('H1', 'coaches'), wt('H2', 'vanish')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="300" height="100"></svg></div>`).join('');
const J0 = $('#jsv0'), J1 = $('#jsv1'), J2 = $('#jsv2');
mk(J0, 'line', { x1: 10, y1: 86, x2: 250, y2: 86, stroke: C.ink, 'stroke-width': 2.5 }); mk(J0, 'rect', { x: 250, y: 14, width: 16, height: 74, fill: C.ink2 });
const clay = mk(J0, 'ellipse', { cy: 52, fill: '#B07A4F' }), clayV = PUC.arrow(J0, VC, 5, 14);
mk(J1, 'line', { x1: 10, y1: 86, x2: 290, y2: 86, stroke: C.ink, 'stroke-width': 2.5 });
const co1 = mk(J1, 'rect', { y: 46, width: 80, height: 32, rx: 6, fill: MC }), co2 = mk(J1, 'rect', { y: 46, width: 80, height: 32, rx: 6, fill: CB }), coV = PUC.arrow(J1, VC, 5, 14);
const kb0 = mk(J2, 'rect', { x: 20, y: 30, height: 34, rx: 6, fill: EC }), kbL = txt(J2, 20, 92, 'kinetic energy', { 'font-size': 15, fill: EC, 'font-weight': 600 });
const kbG = mk(J2, 'rect', { y: 30, height: 34, rx: 6, fill: 'none', stroke: LC, 'stroke-width': 2, 'stroke-dasharray': '6 5' });
const TILES = [[VC, 'Half the speed'], [PC, 'Momentum: kept'], [C.red, 'Half the K: gone where?']];
$('#wqs').innerHTML = TILES.map(([c, w], i) => `<div class="wq" id="wq${i}" style="top:${300 + i * 70}px;left:36px;color:${c}"><span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'half'), wt('H4', 'Momentum'), wt('H4', 'gone')];
const hs = $('#hkS'), HTY = 210; ground(hs, 36, 748, HTY);
const hA = cartG(hs, 90, MC, 'A', HTY, 20), hB = cartG(hs, 90, CB, 'B', HTY);
const hRun = mkRun({ mA: 1, mB: 1, uA: 50, uB: 0, xA: 60, xB: 60 + 90 + 20 + 80, wA: 90, wB: 90, pad: 20 }, 1, 0.3);
const hGo = wt('H3', 'lock') - hRun.th, hvA = PUC.arrow(hs, VC, 6, 18), hvB = PUC.arrow(hs, VC, 6, 18);

/* ---------- P ---------- */
const QR = [['v', VC, 'One common velocity', 'they stick, and move as one', 'STICK'], ['p', PC, 'Momentum: kept', 'the pushes between them are internal', 'KEPT'], ['K', EC, 'Kinetic energy: not kept', 'some turns into heat, sound, bent pads', 'NOT KEPT']];
$('#qrs').innerHTML = QR.map(([s, c, n, d, u], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 128};height:116px;top:${84 + i * 128}px"><div class="qs" style="color:${c};top:22px">${s}</div><div class="qn" style="top:20px">${n}</div><div class="qd" style="top:66px">${d}</div><div class="qu" style="color:${c}">${u}</div></div>`).join('');
$('#lawP').innerHTML = `Perfectly inelastic: <span style="color:#E7A6C9">p kept</span> · <span style="color:#7FD1D1">K lost</span>`;
const tQr = [wt('P1', 'stick'), T0('P2'), T0('P3')];
const pm = $('#pmS'), PTY = 330; ground(pm, 36, 748, PTY);
const pA = cartG(pm, 200, MC, 'A', PTY, 40, 90), pB = cartG(pm, 200, CB, 'B', PTY, 0, 90);
const pRun = mkRun({ mA: 1, mB: 1, uA: 90, uB: 0, xA: 10, xB: 10 + 200 + 40 + 90 * 1.2, wA: 200, wB: 200, pad: 40 }, 1, 0.6);
const tPgo = wt('P3', 'kept') - pRun.th - 0.2;
const XC = [['flame', 'heat'], ['sound', 'sound'], ['dent', 'bent pads']];
$('#xcs').innerHTML = XC.map(([ic, w], i) => `<div class="xc" id="xc${i}" style="top:440px"><i style="background:${EC}">${M.icon(ic, 18, '#fff', 2.4)}</i><span>${w}</span></div>`).join('') + `<div class="lbl" id="xcL" style="left:36px;top:400px;color:${EC}">LOST KINETIC ENERGY BECOMES</div>`;
const tXc = [wt('P3', 'heat'), wt('P3', 'sound'), wt('P3', 'bent')];

/* ---------- S: the sim ---------- */
const s = $('#simS'), TY = 400, PXM = 40, DC = 0.15, RD = 2.2, PV = 22, PADW = 24;
ground(s, 36, 748, TY);
for (let k = 0; k <= 17; k++) { const x = 46 + PXM * k; mk(s, 'line', { x1: x, y1: TY, x2: x, y2: TY + 10, stroke: C.ink, 'stroke-width': 2 }); if (k % 2 === 0) txt(s, x, TY + 36, k, { 'text-anchor': 'middle', 'font-size': 15 }); }
txt(s, 748, TY + 36, 'm', { 'text-anchor': 'end', 'font-size': 15 });
const W_ = m => (m === 2 ? 130 : 90);
const RUNS = [[1, 2], [2, 1]].map(([mA, mB]) => { const wA = W_(mA), wB = W_(mB), xA = 46, xB = xA + wA + PADW + PXM * 6 * 0.5; return mkRun({ mA, mB, uA: 6, uB: 0, xA, xB, wA, wB, pad: PADW }, PXM, DC); });
const ghA = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - 68, height: 48, rx: 8, fill: MC, opacity: 0 })), ghB = [0, 1, 2].map(() => mk(s, 'rect', { y: TY - 68, height: 48, rx: 8, fill: CB, opacity: 0 }));
const cw = mk(s, 'g', {});
const CA = [cartG(cw, 90, MC, 'A · 1 kg', TY, PADW), cartG(cw, 130, MC, 'A · 2 kg', TY, PADW)], CBs = [cartG(cw, 130, CB, 'B · 2 kg', TY), cartG(cw, 90, CB, 'B · 1 kg', TY)];
const aVA = PUC.arrow(s, VC, 6, 18), aVB = PUC.arrow(s, VC, 6, 18);
const lVA = sub(s, 0, 0, 'v', 'A', VC, 26), lVB = sub(s, 0, 0, 'v', 'B', VC, 26);
const aFA = PUC.arrow(s, FC, 7, 20), aFB = PUC.arrow(s, FC, 7, 20), lF = txt(s, 0, 214, 'equal and opposite pushes', { 'text-anchor': 'middle', fill: FC, 'font-weight': 700, 'font-size': 19 });
const lPd = txt(s, 0, 176, 'pad stays squashed', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 700, 'font-size': 20 });
const lHt = txt(s, 0, 146, 'lost energy: heat + sound', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 20 });
const tL1 = wt('S2', 'hit') - RUNS[0].th - 0.1, tFz = wt('S5', 'crunch') + 0.1, TAU_FZ = RUNS[0].th + DC / 2, tRA = TAU_FZ - 0.25 * (tFz - tS5), tRes = tS7 + 0.1;
const tL2 = wt('S9', 'roll') - RUNS[1].th - 0.3;
function state(t) {
  if (t >= tS9 - 0.3) return { r: 1, tau: M.clamp(t - tL2, 0, RD), pause: t < tL2 };
  if (t >= tS8 - 0.3) return { r: 1, tau: 0, pause: true };
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
  <span class="k" style="color:${LC}">K<sub>lost</sub></span><span class="v" id="r_L" style="color:${LC}">0.00</span><span class="u">J</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 110, y: 72, w: 560, h: 150, xmax: RD, ymin: 0, ymax: 40, xt: [0, 0.5, 1, 1.5, 2], yt: [0, 6, 18, 24, 36], xl: 't (s)', yl: 'K (J)' });
const gLost = mk(gs, 'path', { d: '', fill: M.rgba(LC, 0.22), stroke: 'none' });
const gRef = mk(gs, 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.45 });
const gT = mk(gs, 'path', { d: '', fill: 'none', stroke: EC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.9 });
const gA = mk(gs, 'path', { d: '', fill: 'none', stroke: ED, 'stroke-width': 4, 'stroke-linecap': 'round' });
const gB = mk(gs, 'path', { d: '', fill: 'none', stroke: EL, 'stroke-width': 4, 'stroke-dasharray': '7 5' });
const gLl = txt(gs, 0, 0, '', { fill: C.ink2, 'font-weight': 700, 'font-size': 18, 'text-anchor': 'middle' });
const dT = g.dot(EC, 10), dA = g.dot(ED, 8), dB = g.dot(EL, 8);
$('#leg').innerHTML = [[ED, '', 'K<sub>A</sub>'], [EL, '7 5', 'K<sub>B</sub>'], [EC, '', 'K<sub>total</sub>']].map(([c, da, n], i) => `<span><svg width="34" height="10"><line x1="2" y1="5" x2="32" y2="5" stroke="${c}" stroke-width="${i === 2 ? 6 : 4}" stroke-dasharray="${da}" stroke-linecap="round"/></svg>${n}</span>`).join('');
const pathF = (f, s0, s1, n = 90) => { let d = ''; for (let i = 0; i <= n; i++) { const x = s0 + (s1 - s0) * i / n; d += (i ? 'L' : 'M') + g.X(x).toFixed(1) + ',' + g.Y(f(x)).toFixed(1); } return d; };
const plot = (path, f, s1) => attr(path, 'd', s1 <= 0.001 ? '' : pathF(f, 0, s1, 110));
const th1 = PUC.think($('#th1'), { q: 'Swap them: the 2 kg trolley rolls at 6 m/s into the 1 kg one. More energy lost, or less?', opts: ['More', 'Less'], right: 1, why: 'Less: 36 J before, 24 J after. Only 12 J, one third, is lost.' });
const RUNL = ['RUN 1 · A 1 kg · B 2 kg', 'RUN 2 · A 2 kg · B 1 kg'];

/* ---------- D ---------- */
const u1 = tc(VC, 'u_1'), u2 = tc(VC, 'u_2'), vv = tc(VC, 'v'), m1 = 'm_1', m2 = 'm_2';
const STEPS = [[`${m1}${u1} + ${m2}${u2} = (${m1} + ${m2})\\,${vv}`, 'momentum before = momentum after', 'MOMENTUM', PC],
  [`${vv} = \\dfrac{${m1}${u1} + ${m2}${u2}}{${m1} + ${m2}}`, 'total momentum ÷ total mass'],
  [`${tc(LC, '\\Delta K')} = \\tfrac12 ${m1}${u1}^2 + \\tfrac12 ${m2}${u2}^2 - \\tfrac12(${m1} + ${m2})\\,${vv}^2`, 'energy before - energy after', 'ENERGY', EC],
  [`${tc(LC, '\\Delta K')} = \\dfrac12\\,\\dfrac{${m1}${m2}}{${m1} + ${m2}}\\,(${u1} - ${u2})^2`, 'put v in, and simplify']];
const SY = [84, 196, 318, 440];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:992px;height:96px"></div>` + STEPS.map(([f, w, tg, tcol], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="${i % 2 ? 'left:auto;right:0;top:20px' : ''}">${w}</div>${tg ? `<div class="tag" style="left:auto;right:0;top:6px;background:${tcol}">${tg}</div>` : ''}</div>`).join('');
const tStep = [wt('D2', 'Momentum'), wt('D3', 'So'), wt('D4', 'Kinetic'), wt('D5', 'Put')];
const CK = [[`${m1} = 1,\\; ${m2} = 2,\\; ${u1} - ${u2} = 6`], [`${tc(LC, '\\Delta K')} = \\tfrac12 \\times \\tfrac23 \\times 36`], [`${tc(LC, '\\Delta K')} = 12\\,\\text{J}`]];
$('#ctab').innerHTML = CK.map(([f], i) => `<div class="fx" id="ck${i}" style="left:24px;top:${84 + i * 84}px;font-size:30px">${K(f)}</div>`).join('') + `<div class="pillp ac" id="ckP" style="left:24px;top:350px">Same as the sim: 18 J - 6 J</div>`;
const tCk = [wt('D6', 'Check'), wt('D6', 'Half'), wt('D6', 'Twelve')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(LC, '\\Delta K')} = \\dfrac12\\,\\dfrac{${m1}${m2}}{${m1} + ${m2}}\\,(${u1} - ${u2})^2`);

/* ---------- R: link by link ---------- */
const LK = [`${K(`${tc(EC, 'K')} = \\tfrac12 m v^2 = \\dfrac{${tc(PC, 'p')}^2}{2m}`)}`, `In the crash, ${K(tc(PC, 'p'))} stays the same`, `After sticking, that ${K(tc(PC, 'p'))} is carried by a bigger ${K('m')}`, `Same ${K(tc(PC, 'p'))} on top, bigger ${K('m')} below: ${K(tc(EC, 'K'))} gets smaller`];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 104}px;${i === 0 ? 'height:96px' : ''}"><div class="n">${i + 1}</div><div class="lt" style="${i === 0 ? 'height:96px;font-size:30px' : ''}">${h}</div></div>`).join('');
const tLk = [wt('R2', 'Kinetic'), wt('R3', 'In'), wt('R4', 'But'), wt('R5', 'Same')];
$('#rF').innerHTML = K(`${tc(EC, 'K')} = \\dfrac{${tc(PC, 'p')}^2}{2m}`);
const RR = [['p', PC, 'kg m/s', 'kept'], ['m', C.ink, 'kg', 'grows'], ['K', EC, 'J', 'falls']];
$('#rRows').innerHTML = RR.map(([k, c, u, w], i) => `<div class="qr" id="rx${i}" style="top:${250 + i * 100}px;height:84px"><div class="qs" style="color:${c};font-size:48px;top:16px">${k}</div><div class="qn mono" id="rv${i}" style="top:22px;left:120px;font:600 36px 'IBM Plex Mono';color:${c}"></div><div class="qu" style="top:22px;color:${c}">${w.toUpperCase()}</div></div>`).join('');
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'Same push, more mass, less energy!' });

/* ---------- K: side by side ---------- */
const sideRun = (svg, stick) => { const TYk = 250; ground(svg, 36, 748, TYk); const PX = 30;
  const r = stick ? mkRun({ mA: 2, mB: 2, uA: 6, uB: 0, xA: 60, xB: 60 + 120 + 16 + PX * 6 * 0.6, wA: 120, wB: 120, pad: 16 }, PX, 0.15) : null;
  const a = cartG(svg, 120, MC, 'A · 2 kg', TYk, stick ? 16 : 0), b = cartG(svg, 120, CB, 'B · 2 kg', TYk);
  const va = PUC.arrow(svg, VC, 6, 18), vb = PUC.arrow(svg, VC, 6, 18);
  // K bars: before and after (after split into kept and lost)
  const by = 320, BU = 15;  // 15 px per J
  txt(svg, 40, by + 26, 'BEFORE', { 'font-size': 16, 'font-weight': 600 }); txt(svg, 40, by + 82, 'AFTER', { 'font-size': 16, 'font-weight': 600 });
  const b0 = mk(svg, 'rect', { x: 130, y: by, height: 38, rx: 6, fill: EC }), l0 = txt(svg, 0, by + 26, '36 J', { fill: '#fff', 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
  const kAft = stick ? 18 : 36, b1 = mk(svg, 'rect', { x: 130, y: by + 56, height: 38, rx: 6, fill: EC }), b2 = mk(svg, 'rect', { x: 130 + kAft * BU, y: by + 56, height: 38, rx: 6, fill: M.rgba(LC, 0.25), stroke: LC, 'stroke-width': 2, 'stroke-dasharray': '6 4' });
  const l1 = txt(svg, 0, by + 82, kAft + ' J kept', { fill: '#fff', 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' }), l2 = txt(svg, 130 + 36 * BU - 10, by + 82, '18 J lost', { fill: C.ink2, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
  return { r, a, b, va, vb, b0, b1, b2, l0, l1, l2, BU, kAft, PX, stick };
};
const SR = [sideRun($('#khS'), false), sideRun($('#klS'), true)];
$('#khP').innerHTML = `${M.icon('check', 26, C.ok, 3)}They swap: all 36 J kept`;
$('#klP').innerHTML = `${M.icon('x', 26, C.red, 3)}They stick: 18 J lost, the biggest loss`;
const th2 = PUC.think($('#th2'), { q: 'Two equal trolleys at the same speed hit head on, and stick. What share of K is lost?', opts: ['Half', 'All of it'], right: 1, why: 'Total momentum is zero, so the pair stops: every joule is lost.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = '50 g of putty at 20 m/s hits a 950 g trolley at rest, and sticks. Find the speed and the energy lost.';
const wsol = PUC.solution($('#wl'), [
  [K(`${tc(PC, 'p')} = 0.05 \\times 20 = 1\\,\\text{kg m/s}`)],
  [K(`${vv} = \\dfrac{1}{0.05 + 0.95} = ${tc(VC, '1\\,\\text{m/s}')}`)],
  [K(`${tc(EC, 'K')}: \\tfrac12 (0.05)(20)^2 = 10\\,\\text{J} \\to 0.5\\,\\text{J}`)],
  [K(`${tc(LC, '\\Delta K')} = 9.5\\,\\text{J} = 95\\%`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 90 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY = 300, WPX = 12; ground(w, 36, 748, WY);
txt(w, 392, WY + 40, 'smooth track', { 'text-anchor': 'middle', 'font-size': 17 });
const wRun = mkRun({ mA: 0.05, mB: 0.95, uA: 20, uB: 0, xA: 60, xB: 60 + 28 + WPX * 20 * 0.8, wA: 28, wB: 150, pad: 0 }, WPX, 0.06);
const wP = mk(w, 'circle', { r: 14, cy: WY - 44, fill: '#B07A4F' }), wT = cartG(w, 150, CB, '950 g', WY, 0, 56);
const wvA = PUC.arrow(w, VC, 6, 18), wvB = PUC.arrow(w, VC, 6, 18), wlA = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' }), wlB = txt(w, 0, 0, '', { fill: VC, 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' });
const wTag = txt(w, 748, 110, '', { 'text-anchor': 'end', fill: C.ink2, 'font-weight': 700, 'font-size': 18 });
$('#wtb').innerHTML = `<span class="h" style="text-align:left"></span><span class="h">BEFORE</span><span class="h">AFTER</span>
  <span style="text-align:left;color:${PC};font-style:italic;font-family:Poppins">p</span><span id="wp0" style="color:${PC}">1 kg m/s</span><span id="wp1" style="color:${PC}">1 kg m/s</span>
  <span style="text-align:left;color:${EC};font-style:italic;font-family:Poppins">K</span><span id="wk0" style="color:${EC}">10 J</span><span id="wk1" style="color:${EC}">0.5 J</span>`;
const tW = [wt('W3', 'Momentum'), wt('W4', 'total'), wt('W5', 'Energy'), wt('W6', 'So')];
const tWgo = wt('W2', 'hits') - wRun.th;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Perfectly inelastic means all K is lost', right: 'Only the share needed to move together is lost' });
const tp = $('#tpS'), TB = 16;   // 16 px per joule
txt(tp, 20, 52, 'RUN 1 · KINETIC ENERGY', { 'font-size': 17, 'font-weight': 600, 'letter-spacing': 1 });
const tpr0 = mk(tp, 'g', {}), tpr1 = mk(tp, 'g', {});
txt(tpr0, 20, 108, 'before', { fill: C.ink, 'font-weight': 600, 'font-size': 22 }); mk(tpr0, 'rect', { x: 130, y: 82, width: 18 * TB, height: 38, rx: 6, fill: EC }); txt(tpr0, 130 + 18 * TB - 10, 108, '18 J', { fill: '#fff', 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
txt(tpr1, 20, 172, 'after', { fill: C.ink, 'font-weight': 600, 'font-size': 22 }); mk(tpr1, 'rect', { x: 130, y: 146, width: 6 * TB, height: 38, rx: 6, fill: EC }); txt(tpr1, 130 + 6 * TB - 8, 172, '6 J', { fill: '#fff', 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
mk(tpr1, 'rect', { x: 130 + 6 * TB, y: 146, width: 12 * TB, height: 38, rx: 6, fill: M.rgba(LC, 0.25), stroke: LC, 'stroke-width': 2, 'stroke-dasharray': '6 4' }); txt(tpr1, 130 + 18 * TB - 10, 172, '12 J lost', { fill: C.ink2, 'font-weight': 700, 'font-size': 20, 'text-anchor': 'end' });
txt(tpr1, 130, 222, '6 J stays: the pair still moves', { fill: EC, 'font-weight': 700, 'font-size': 19 });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals on common velocity, energy lost, and bullets stuck in blocks' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 20 g bullet at 500 m/s sticks in a 4.98 kg block hanging from a string. g = 10 m/s². How high does the block swing?', qW: 780,
  opts: ['10 cm', '20 cm', '40 cm', '50 m'], right: 1, optY: 330, optH: 96 });
const so = PUC.solution($('#so'), [
  [K(`0.02 \\times 500 = 5\\,${vv}`)], [K(`${vv} = 2\\,\\text{m/s}`)],
  [K(`h = \\dfrac{${vv}^2}{2g} = \\dfrac{4}{20}`)], [K(`h = 0.2\\,\\text{m} = 20\\,\\text{cm}`)]], { y0: 100, dy: 120 });
const tSo = [wt('A2', 'Zero'), wt('A3', 'starts'), wt('A4', 'h'), wt('A4', 'Zero')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 500, title: 'Recap · perfectly inelastic collision', y0: 100, dy: 104, txt: [0, 0, 1, 1],
  lines: [K(`${tc(PC, `${m1}${u1} + ${m2}${u2} = (${m1} + ${m2})\\,${vv}`)}`),
    K(`${tc(LC, '\\Delta K')} = \\dfrac12\\,\\dfrac{${m1}${m2}}{${m1} + ${m2}}\\,(${u1} - ${u2})^2`),
    '<b>Momentum kept</b> · <b>K lost</b> to heat, sound and dents', '<b>Biggest K loss</b> of any collision, but not always all of it'] });
const YQ = ['Why do two trolleys that stick together roll slower?', 'Where does the lost kinetic energy go?', 'Two equal trolleys hit head on at the same speed, and stick. What happens?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 89', topic: 'Three balls, three bounce heights. Why?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.06, 960, 540], [tS8 - 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#xc' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
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
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    { const t0 = tMorph + 0.6, u = M.clamp((t - t0) / 0.7), hit = t >= t0 + 0.7, sq = M.o3((t - t0 - 0.7) / 0.2);   // clay: flies, hits, flattens, stays
      attr(clay, 'cx', hit ? 250 - 8 * (1 - 0.5 * sq) : M.lerp(30, 236, u)); attr(clay, 'rx', hit ? 14 - 6 * sq : 14); attr(clay, 'ry', hit ? 14 + 6 * sq : 14);
      clayV.set(70, 22, hit ? 70 : 70 + 50, 22); }
    { const t0 = tMorph + 1.0, u = M.clamp((t - t0) / 0.6), hit = t >= t0 + 0.6, e = Math.max(0, t - t0 - 0.6);   // coaches: one rolls in, they couple, roll on at half speed
      const x1 = hit ? 100 + 40 * e : M.lerp(20, 100, u), x2 = hit ? 180 + 40 * e : 180; attr(co1, 'x', Math.min(x1, 130)); attr(co2, 'x', Math.min(x2, 210));
      coV.set(40, 24, 40 + (hit ? 30 : 60), 24); }
    { const u = M.io((t - wt('H2', 'vanish') + 0.1) / 0.6); attr(kb0, 'width', (240 - 120 * u).toFixed(1)); attr(kbG, 'x', (260 - 120 * u).toFixed(1)); attr(kbG, 'width', (120 * u).toFixed(1)); kbG.style.opacity = u > 0.02 ? 1 : 0; }
    vis($('#hjP'), t, wt('H2', 'something') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const k = hRun.at(Math.max(0, t - hGo)); hA.set(k.xA, k.c); hB.set(k.xB);
    vis(hA.o, t, wt('H3', 'trolley') - 0.1, 1e9, { dx: -30, dy: 0 }); vis(hB.o, t, wt('H3', 'still') - 0.1, 1e9, { dx: 30, dy: 0 });
    const vO = M.o3((t - hGo + 0.3) / 0.4); hvA.set(k.xA + 45, 120, k.xA + 45 + 2 * k.vA * vO, 120); hvB.set(k.xB + 45, 92, k.xB + 45 + 2 * k.vB, 92);
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.redBg, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); vis(el, t, tQr[i] - 0.1, 1e9, POP); vis(el.querySelector('.qu'), t, tQr[i] + 0.6, 1e9, POP); });
    vis($('#lawP'), t, wt('P3', 'bent') + 0.4, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const k = pRun.at(Math.max(0, t - tPgo)); pA.set(k.xA, k.c); pB.set(k.xB);
    XC.forEach((_, i) => vis($('#xc' + i), t, tXc[i] - 0.1, 1e9, POP)); vis($('#xcL'), t, tXc[0] - 0.3, 1e9, { dy: 8 });
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1'), simOut = OUT('S8'), simIn2 = OUT('S9') + 0.25, back = t > simIn2 - 0.3;
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, back ? simIn2 + d : tS1 + d, back ? out : simOut, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const S = state(t), r = RUNS[S.r], k = r.at(S.tau);
    CA.forEach((c, i) => { M.hide(c.o, i !== S.r); }); CBs.forEach((c, i) => M.hide(c.o, i !== S.r));
    const ca = CA[S.r], cb = CBs[S.r]; ca.set(k.xA, k.c); cb.set(k.xB);
    vis(cw, t, tS1 + 0.5, 1e9, { dy: 0 });
    const moving = !S.pause && !S.frozen && S.tau > 0.02 && S.tau < RD, gstep = S.replay ? 0.03 : 0.07;
    [[ghA, 'xA', r.wA], [ghB, 'xB', r.wB]].forEach(([gh, key, wd]) => gh.forEach((e, j) => { const q = r.at(Math.max(0, S.tau - gstep * (j + 1))); attr(e, 'x', q[key].toFixed(1)); attr(e, 'width', wd); e.style.opacity = moving && Math.abs(q[key] - k[key]) > 4 ? [0.3, 0.2, 0.12][j] : 0; }));
    const vOn = M.o3((t - wt('S1', 'rolls') + 0.1) / 0.5), cxA = k.xA + r.wA / 2, cxB = k.xB + r.wB / 2, ayA = TY - 100, ayB = TY - 140;
    aVA.set(cxA, ayA, cxA + PV * k.vA * vOn, ayA); aVB.set(cxB, ayB, cxB + PV * k.vB, ayB);
    attr(lVA, 'x', (cxA + PV * k.vA * vOn + 8).toFixed(1)); attr(lVA, 'y', ayA + 9); lVA.style.opacity = (Math.abs(k.vA) > 0.3 ? vOn : 0).toFixed(3);
    attr(lVB, 'x', (cxB + PV * k.vB + 8).toFixed(1)); attr(lVB, 'y', ayB + 9); lVB.style.opacity = Math.abs(k.vB) > 0.3 ? 1 : 0;
    // frozen crunch: equal and opposite pushes at the pad; then the pad stays squashed
    const fz = S.r === 0 && S.replay ? M.o3((t - wt('S6', 'pushes') + 0.1) / 0.5) * (1 - M.io((t - tRes - 0.3) / 0.3)) : 0, xc = k.xB, fy = TY - 80;
    const inC = S.tau > r.th && S.tau < r.th + r.D + 0.001 ? 1 : 0;
    aFA.set(xc - 2, fy, xc - 2 - 90 * fz * inC, fy); aFB.set(xc + 2, fy, xc + 2 + 90 * fz * inC, fy);
    attr(lF, 'x', xc); lF.style.opacity = (fz * inC).toFixed(3);
    attr(lPd, 'x', xc); vis(lPd, t, wt('S7', 'spring') - 0.1, tS8 - 0.5, { dy: 6 });
    attr(lHt, 'x', xc); vis(lHt, t, wt('S7', 'warms') - 0.1, tS8 - 0.5, { dy: 6 });
    vis($('#rdy'), t, tS1 + 0.6, tL1 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    if (t >= tS9 - 0.3) vis($('#rdy'), t, simIn2 + 0.3, tL2 - 0.05, { ...POP, sc: 0.8, outDur: 0.15 });
    vis($('#smo'), t, tS5 + 0.05, tFz, { ...POP, sc: 0.8 }); if (t > tRes - 0.2) vis($('#smo'), t, tRes, tS8 - 0.5, { ...POP, sc: 0.8 });
    vis($('#frz'), t, tFz, tRes - 0.15, { ...POP, sc: 0.8 });
    const rcEl = $('#runc'); M.setT(rcEl, RUNL[S.r]); vis(rcEl, t, tS1 + 0.7, 1e9, { dy: 8 });
    { const e = $('#simEq'), aft = S.tau >= r.th + r.D, kk = S.r + '|' + aft, Ka = 0.5 * (r.mA + r.mB) * r.V ** 2;
      if (e._k !== kk) { e._k = kk; e.innerHTML = `<span class="pm"><i style="font-family:Poppins">p</i> ${r.p0}</span>${aft ? `<span class="sm">→</span><span class="pm">${r.p0}</span>` : ''}<span class="sm">kg m/s</span><span class="sm" style="margin-left:12px">·</span><span class="te"><i style="font-family:Poppins">K</i> ${r.K0}</span>${aft ? `<span class="sm">→</span><span class="te">${Ka}</span>` : ''}<span class="sm">J</span><span class="sm" style="margin-left:6px">${aft ? 'before → after' : 'before'}</span>`; }
      vis(e, t, wt('S1', 'rolls') + 0.3, tS10 - 0.1, POP); e.style.background = mix(C.soft, C.ac2, M.io((t - T0('S3')) / 0.3) * (1 - M.io((t - tS5) / 0.3))); }
    $('#allP').innerHTML = `Run 1: <span style="color:#7FD1D1">2/3</span> of K lost · Run 2: <span style="color:#7FD1D1">1/3</span> lost`;
    vis($('#allP'), t, tS10 + 0.1, 1e9, POP);
    const tr = Math.round(S.tau * 100) / 100, kr = r.at(tr), KA = 0.5 * r.mA * kr.vA ** 2, KB = 0.5 * r.mB * kr.vB ** 2;
    M.setT($('#r_t'), f2(tr)); M.setT($('#r_vA'), f2(kr.vA)); M.setT($('#r_vB'), f2(kr.vB));
    M.setT($('#r_p'), f1(r.mA * kr.vA + r.mB * kr.vB)); M.setT($('#r_K'), f2(KA + KB)); M.setT($('#r_L'), f2(r.K0 - KA - KB));
    const KAf = x => 0.5 * r.mA * r.at(x).vA ** 2, KBf = x => 0.5 * r.mB * r.at(x).vB ** 2, KTf = x => KAf(x) + KBf(x);
    plot(gA, KAf, S.tau); plot(gB, KBf, S.tau); plot(gT, KTf, S.tau);
    attr(gRef, 'x1', g.X(0)); attr(gRef, 'x2', g.X(RD)); attr(gRef, 'y1', g.Y(r.K0).toFixed(1)); attr(gRef, 'y2', g.Y(r.K0).toFixed(1));
    if (S.tau > r.th + 0.005) { const s1 = S.tau; attr(gLost, 'd', `M${g.X(r.th).toFixed(1)},${g.Y(r.K0).toFixed(1)} L${g.X(s1).toFixed(1)},${g.Y(r.K0).toFixed(1)} ` + pathF(KTf, s1, r.th, 40).replace('M', 'L') + 'Z'); } else attr(gLost, 'd', '');
    const lostOn = S.tau > r.th + r.D + 0.3; attr(gLl, 'x', g.X(1.6)); attr(gLl, 'y', g.Y((r.K0 + 0.5 * (r.mA + r.mB) * r.V ** 2) / 2) + 6); M.setT(gLl, 'lost ' + r.Lmax + ' J'); gLl.style.opacity = lostOn ? 1 : 0;
    const dOn = t >= wt('S1', 'rolls'), KAn = 0.5 * r.mA * k.vA ** 2, KBn = 0.5 * r.mB * k.vB ** 2;
    dA(S.tau, KAn, dOn); dB(S.tau, KBn, dOn); dT(S.tau, KAn + KBn, dOn);
    vis($('#leg'), t, tS1 + 1.2, 1e9, { dy: 6 });
    vis($('#th1'), t, tS8 + 0.05, OUT('S9'), { dy: 36, ...o });
    th1(t, { tin: tS8, tOpts: wt('S8', 'Will') - 0.1, tCount: T1('S8') + 0.05, dur: 3, tAns: tS9 - 0.02, tWhy: wt('S9', 'Thirty') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); const tg = el.querySelector('.tag'); if (tg) vis(tg, t, tStep[i] + 0.5, 1e9, POP); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; hb.style.height = (t > tStep[1] - 0.1 && t < tStep[2] - 0.1 ? 106 : t > tStep[3] - 0.1 ? 106 : 70) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 });
    tCk.forEach((tt, i) => PUC.write($('#ck' + i), t, tt, 0.6)); vis($('#ckP'), t, tCk[2] + 0.6, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'momentum') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'lost') + 0.2, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.9, 1e9, { dy: 8 });
    PUC.write($('#rF'), t, tLk[0] + 0.3, 0.8);
    const um = M.io((t - wt('R4', 'bigger') + 0.1) / 1.0), m = 1 + 2 * um, Kv = 36 / (2 * m);
    vis($('#rx0'), t, tLk[1], 1e9, POP); vis($('#rx1'), t, tLk[2], 1e9, POP); vis($('#rx2'), t, tLk[3] - 0.1, 1e9, POP);
    M.setT($('#rv0'), '6 kg m/s'); M.setT($('#rv1'), m.toFixed(2).replace(/\.00$/, '') + ' kg'); M.setT($('#rv2'), (t < tLk[3] ? 18 : 36 / (2 * (1 + 2 * M.io((t - tLk[3]) / 1.0)))).toFixed(1) + ' J');
    $('#rx2').style.background = mix(C.soft, '#DDF0F0', M.io((t - wt('R5', 'smaller')) / 0.3));
    avA(t, wt('R5', 'smaller') + 0.4, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    vis($('#kh'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, tK1 + 0.3, out, { dx: 60, dy: 0, ...o });
    SR.forEach((q, i) => { const t0 = i ? wt('K3', 'stick') - 0.7 : wt('K2', 'swap') - 0.7, tau = M.clamp(t - t0, 0, 2.2);
      let xA, xB, vA, vB, c = 0;
      if (q.stick) { const k = q.r.at(tau); xA = k.xA; xB = k.xB; vA = k.vA; vB = k.vB; c = k.c; }
      else { const th = 0.6; xA = 60 + q.PX * 6 * Math.min(tau, th); xB = 60 + 120 + q.PX * 6 * 0.6 + q.PX * 6 * Math.max(0, tau - th); vA = tau < th ? 6 : 0; vB = tau < th ? 0 : 6; }
      q.a.set(xA, c); q.b.set(xB); const vO = M.o3((t - tK1 - 0.8) / 0.5); q.va.set(xA + 60, 140, xA + 60 + 14 * vA * vO, 140); q.vb.set(xB + 60, 110, xB + 60 + 14 * vB, 110);
      const tb = i ? T0('K3') : T0('K2'), ub = M.o3((t - tK1 - 0.6) / 0.6), ua = M.o3((t - tb - 0.8 - (i ? 1.2 : 0.6)) / 0.6);
      attr(q.b0, 'width', (36 * q.BU * ub).toFixed(1)); attr(q.l0, 'x', (130 + 36 * q.BU * ub - 10).toFixed(1)); q.l0.style.opacity = ub;
      attr(q.b1, 'width', (q.kAft * q.BU * ua).toFixed(1)); attr(q.l1, 'x', (130 + q.kAft * q.BU * ua - 10).toFixed(1)); q.l1.style.opacity = ua;
      M.hide(q.b2, !q.stick || ua < 0.99); M.hide(q.l2, !q.stick || ua < 0.99); });
    vis($('#khP'), t, wt('K2', 'kept') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K3', 'biggest') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK4, tOpts: wt('K4', 'What') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Their') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tau = M.clamp(t - tWgo, 0, wRun.th + wRun.D + 3), k = wRun.at(tau), aft = tau > wRun.th + wRun.D;
    attr(wP, 'cx', (k.xA + 14).toFixed(1)); wT.set(k.xB);
    vis(wP, t, T0('W2') + 0.5, 1e9, { dy: 0 }); vis(wT.o, t, wt('W2', 'trolley') - 0.1, 1e9, { dx: 30, dy: 0 });
    wvA.set(k.xA + 14, 170, k.xA + 14 + (aft ? 0 : 6 * k.vA), 170); wvB.set(k.xB + 75, 200, k.xB + 75 + 6 * k.vB, 200);
    attr(wlA, 'x', (k.xA + 14 + 3 * k.vA).toFixed(1)); attr(wlA, 'y', 152); M.setT(wlA, f1(k.vA) + ' m/s'); wlA.style.opacity = (!aft && Math.abs(k.vA) > 0.3) ? 1 : 0;
    attr(wlB, 'x', (k.xB + 75).toFixed(1)); attr(wlB, 'y', 186); M.setT(wlB, 'together: ' + f1(k.vB) + ' m/s'); wlB.style.opacity = aft ? 1 : 0;
    M.setT(wTag, aft ? 'AFTER THE HIT' : 'BEFORE THE HIT'); vis(wTag, t, T0('W2') + 0.6, 1e9, { dy: 6 });
    vis($('#wtb'), t, tW[0] - 0.1, 1e9, { dy: 16 });
    ['#wp0', '#wp1', '#wk0', '#wk1'].forEach((id, i) => vis($(id), t, [wt('W3', 'One'), wt('W4', 'So'), wt('W5', 'Ten'), wt('W5', 'After')][i] - 0.1, 1e9, POP));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'perfectly') - 0.1, tStrike: wt('X3', 'No') - 0.1, tRight: wt('X3', 'Only') });
    vis(tp.querySelector('text'), t, wt('X3', 'run') - 0.4, 1e9, { dy: 0 });
    vis(tpr0, t, wt('X3', 'eighteen') - 0.4, 1e9, { dy: 0 }); vis(tpr1, t, wt('X3', 'stayed') - 0.2, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
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
