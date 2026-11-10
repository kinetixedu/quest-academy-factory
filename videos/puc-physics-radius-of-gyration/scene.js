// PUC Physics Ep 105: Radius of gyration and moments of inertia of common bodies (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, RC = C.violet, EC = C.teal, MC = C.ink, IC = C.ink, FC = C.orange;   // omega blue; r, k violet; K teal; M and I ink
const DISC = '#C9D3E6', RING = '#5B6B8C';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const D2R = Math.PI / 180;
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f3 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(3);
const axisM = (p, x, y, r = 9) => { const o = mk(p, 'g', {}); mk(o, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: MC, 'stroke-width': 3 }); mk(o, 'circle', { cx: x, cy: y, r: 3, fill: MC }); return o; };
// a spinning disc (filled, with dot rings) and a spinning ring (beads); set(phi[, radius])
const discB = (p, cx, cy, R) => { const o = mk(p, 'g', {}); mk(o, 'circle', { cx, cy, r: R, fill: DISC, stroke: MC, 'stroke-width': 3 }); const g = mk(o, 'g', {});
  [0.3, 0.55, 0.8].forEach((f, j) => { const n = [6, 10, 14][j]; for (let i = 0; i < n; i++) { const a = (i / n) * 2 * Math.PI; mk(g, 'circle', { cx: cx + f * R * Math.cos(a), cy: cy + f * R * Math.sin(a), r: 4, fill: MC, opacity: 0.55 }); } });
  mk(g, 'line', { x1: cx, y1: cy, x2: cx + R, y2: cy, stroke: MC, 'stroke-width': 3 }); axisM(o, cx, cy);
  return { o, set(phi) { attr(g, 'transform', `rotate(${(phi / D2R).toFixed(2)} ${cx} ${cy})`); } }; };
const ringB = (p, cx, cy, R, n = 14) => { const o = mk(p, 'g', {}), c = mk(o, 'circle', { cx, cy, r: R, fill: 'none', stroke: RING, 'stroke-width': 9 }); const bs = []; for (let i = 0; i < n; i++) bs.push(mk(o, 'circle', { r: 5, fill: '#fff' })); const sp = mk(o, 'line', { x1: cx, y1: cy, stroke: RING, 'stroke-width': 2, 'stroke-dasharray': '4 5' }); axisM(o, cx, cy);
  return { o, c, set(phi, r = R) { attr(c, 'r', r.toFixed(1)); bs.forEach((b, i) => { const a = phi + (i / n) * 2 * Math.PI; attr(b, 'cx', (cx + r * Math.cos(a)).toFixed(1)); attr(b, 'cy', (cy + r * Math.sin(a)).toFixed(1)); }); attr(sp, 'x2', (cx + r * Math.cos(phi)).toFixed(1)); attr(sp, 'y2', (cy + r * Math.sin(phi)).toFixed(1)); } }; };

Object.assign(M.IC, {
  wheel: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 3v18', 'M3 12h18', 'M5.6 5.6l12.8 12.8', 'M18.4 5.6 5.6 18.4'],
  flywheel: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z', 'M12 12h.01'],
  stone: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'],
  ringI: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'],
  target: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v10', 'M7 12h10'],
  sq: ['M4 4h16v16H4z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4');
const tS1 = T0('S1'), tS2 = T0('S2'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7');
const tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tK4 = T0('K4'), tK5 = T0('K5'), tK6 = T0('K6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const KD = 0.5 / Math.SQRT2;   // disc k for R = 0.5 m

/* ---------- title tiles + hook ---------- */
const JOBS = [['wheel', 'A bicycle wheel', 'WEIGHT AT THE RIM'], ['flywheel', 'A machine flywheel', 'HEAVY AT ITS EDGE'], ['stone', 'A grinding stone', 'SOLID ALL THROUGH']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'bicycle'), wt('H1', 'flywheel'), wt('H1', 'grinding')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="200" height="120"></svg></div>`).join('');
const MW = [0, 1, 2].map(i => { const sv = $('#jsv' + i), cx = 120, cy = 60, R = 46, g = mk(sv, 'g', {});
  if (i === 0) { mk(sv, 'circle', { cx, cy, r: R, fill: 'none', stroke: MC, 'stroke-width': 7 }); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; mk(g, 'line', { x1: cx, y1: cy, x2: cx + R * Math.cos(a), y2: cy + R * Math.sin(a), stroke: C.ink2, 'stroke-width': 1.5 }); } }
  if (i === 1) { mk(sv, 'circle', { cx, cy, r: R - 7, fill: 'none', stroke: RING, 'stroke-width': 14 }); mk(sv, 'circle', { cx, cy, r: 14, fill: RING }); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; mk(g, 'line', { x1: cx, y1: cy, x2: cx + (R - 12) * Math.cos(a), y2: cy + (R - 12) * Math.sin(a), stroke: RING, 'stroke-width': 6 }); } }
  if (i === 2) { mk(sv, 'circle', { cx, cy, r: R, fill: '#B8BCC6', stroke: MC, 'stroke-width': 2.5 }); mk(g, 'line', { x1: cx, y1: cy, x2: cx + R, y2: cy, stroke: MC, 'stroke-width': 2.5 }); mk(sv, 'circle', { cx, cy, r: 5, fill: MC }); }
  return { g, cx, cy }; });
const hs = $('#hkS'), HR = 90, hRing = ringB(hs, 160, 250, HR, 12), hDisc = discB(hs, 420, 250, HR);
const hLR = txt(hs, 160, 380, 'ring', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 22 }), hLD = txt(hs, 420, 380, 'disc', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 22 });
const hWR = txt(hs, 160, 412, 'slower', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 20 }), hWD = txt(hs, 420, 412, 'faster', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 700, 'font-size': 20 });
const hSame = txt(hs, 290, 120, 'same mass · same size', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 19 });
const tPush = wt('H3', 'push') + 0.2;

/* ---------- P ---------- */
const QR = [['target', RC, 'Squeeze all the mass into a ring', 'a thin ring around the same axis'], ['ringI', RC, 'Pick the radius that keeps I the same', 'the ring spins just like the body'], ['sq', MC, 'That radius is k', 'I = M k², so k = √(I/M)']];
$('#qrs').innerHTML = QR.map(([ic, c, n, d], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 128}px"><div class="qs">${M.icon(ic, 30, c, 2.4)}</div><div class="qn">${n}</div><div class="qd">${d}</div></div>`).join('');
$('#lawP').innerHTML = `${K(`I = M\\,${tc('#C9B6F5', 'k')}^2`)}<span style="font:500 22px Poppins;color:#B8BCC6;margin-left:14px">k: radius of gyration</span>`;
const tQr = [wt('P1', 'Squeeze'), wt('P2', 'Choose'), wt('P3', 'radius')];
const pm = $('#pmS'), PC0 = [392, 290], PR = 170, PK = PR / Math.SQRT2;
mk(pm, 'circle', { cx: PC0[0], cy: PC0[1], r: PR, fill: '#EEF0F4', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const pKc = mk(pm, 'circle', { cx: PC0[0], cy: PC0[1], r: PK, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const pDots = []; [0.3, 0.55, 0.8, 0.97].forEach((f, j) => { const n = [5, 9, 13, 17][j]; for (let i = 0; i < n; i++) pDots.push([f, (i / n + j * 0.07) * 2 * Math.PI]); });
const pEl = pDots.map(() => mk(pm, 'circle', { r: 6, fill: MC }));
axisM(pm, PC0[0], PC0[1], 10);
const pKl = txt(pm, PC0[0] + PK * 0.71 + 12, PC0[1] - PK * 0.71 - 6, 'k', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 30, fill: RC });
const pKa = PUC.arrow(pm, RC, 4, 12);
const pNote = txt(pm, 392, 530, 'same mass, same axis, same I', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 21 });

/* ---------- S: disc vs shrinking ring ---------- */
const s = $('#simS'), PX = 300, MASS = 2, RR = 0.5, DC = [210, 300], RCn = [570, 300], OMV = 1.0;
const sDisc = discB(s, DC[0], DC[1], RR * PX);
const sKd = mk(s, 'circle', { cx: DC[0], cy: DC[1], r: KD * PX, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const ghR = [0, 1, 2].map(() => mk(s, 'circle', { cx: RCn[0], cy: RCn[1], fill: 'none', stroke: RING, 'stroke-width': 9, opacity: 0 }));
const sRingO = mk(s, 'circle', { cx: RCn[0], cy: RCn[1], r: RR * PX, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '5 7' });
const sRing = ringB(s, RCn[0], RCn[1], RR * PX, 14);
const sRa = PUC.arrow(s, RC, 4, 12), sRl = txt(s, 0, 0, '', { fill: RC, 'font-weight': 700, 'font-size': 20 });
const sDl = txt(s, DC[0], 498, 'disc · I = ½MR²', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 }), sRL = txt(s, RCn[0], 498, 'ring · I = Mr²', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 });
const tShr = wt('S3', 'Shrink'), RATE = 0.04, RSTART = 0.38, tFz = tS4 + 0.3 + (RSTART - KD) / (0.25 * RATE);
const rAt = t => { if (t < tShr) return RR; if (t < tS4) return Math.max(0.24, RR - RATE * (t - tShr)); if (t < tS4 + 0.3) return RSTART; if (t < tFz) return RSTART - 0.25 * RATE * (t - tS4 - 0.3); return KD; };
const rMoving = t => t >= tShr && ((t < tS4 && RR - RATE * (t - tShr) > 0.24) || (t >= tS4 + 0.3 && t < tFz));
$('#roA').innerHTML = `<span class="k" style="color:${RC}">r</span><span class="v" id="r_r" style="color:${RC}">0.500</span><span class="u">m</span>
  <span class="k" style="color:${IC}">I<sub>ring</sub></span><span class="v" id="r_Ir">0.500</span><span class="u">kg m²</span>
  <span class="k" style="color:${IC};font-style:normal;font-size:22px">ratio</span><span class="v" id="r_q">2.00</span><span class="u">ring ÷ disc</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${IC}">I<sub>disc</sub></span><span class="v" id="r_Id">0.250</span><span class="u">kg m²</span>
  <span class="k" style="color:${RC}">k</span><span class="v" id="r_k" style="color:${RC}">-</span><span class="u">m</span>`;
const gs = $('#grS'), g = PUC.graph(gs, { x: 120, y: 66, w: 560, h: 156, xmax: 0.5, ymin: 0, ymax: 0.6, xt: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yt: [0, 0.25, 0.5], xl: '' });
txt(gs, 132, 72, 'I (kg m²)', { 'font-size': 18 }); txt(gs, 748, 46, 'r of the ring (m)', { 'text-anchor': 'end', 'font-size': 17 });
const IR = r => MASS * r * r;
const gGhost = mk(gs, 'path', { fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '4 6' }), gC = mk(gs, 'path', { fill: 'none', stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gDisc = mk(gs, 'line', { x1: g.X(0), y1: g.Y(0.25), x2: g.X(0.5), y2: g.Y(0.25), stroke: RING, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' }), gDl = txt(gs, g.X(0.02), g.Y(0.25) - 8, 'disc: 0.25', { fill: RING, 'font-weight': 700, 'font-size': 17 });
const gK = mk(gs, 'line', { x1: g.X(KD), y1: g.Y(0), x2: g.X(KD), y2: g.Y(0.25), stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }), gKl = txt(gs, g.X(KD), g.Y(0) - 8, 'k', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic' });
const plotR = (path, r0, r1) => { let d = ''; for (let i = 0; i <= 40; i++) { const r = r0 + (r1 - r0) * i / 40; d += (i ? 'L' : 'M') + g.X(r).toFixed(1) + ',' + g.Y(IR(r)).toFixed(1); } attr(path, 'd', d); };
plotR(gGhost, 0, 0.5); const gDot = g.dot(IC, 10);

/* ---------- D ---------- */
const k_ = tc(RC, 'k'), R_ = 'R';
const STEPS = [[`I = M${k_}^2`, 'what k means: all the mass at k'], [`${k_} = \\sqrt{I/M}`, 'so k comes from I and M'],
  [`M${k_}^2 = \\tfrac12 MR^2`, 'disc about its centre: I = ½MR²'], [`${k_}^2 = \\dfrac{R^2}{2} \\;\\Rightarrow\\; ${k_} = \\dfrac{R}{\\sqrt2} \\approx 0.707R`, 'cancel M']];
const SY = [88, 196, 304, 412];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:940px;height:84px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${SY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('') +
  `<div class="dres" id="dres">R = 0.5 m &nbsp;⇒&nbsp; k = 0.5 × 0.707 = 0.354 m, as in the sim</div>`;
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step')];
const dp = $('#dpS'), DD = [282, 260], DPR = 170;
const dDisc = discB(dp, DD[0], DD[1], DPR), dK = mk(dp, 'circle', { cx: DD[0], cy: DD[1], r: DPR / Math.SQRT2, fill: 'none', stroke: RC, 'stroke-width': 7, opacity: 0.85 });
const dRa = PUC.arrow(dp, MC, 3, 11), dKa = PUC.arrow(dp, RC, 4, 12);
dRa.set(DD[0], DD[1], DD[0] - DPR * 0.94, DD[1] + DPR * 0.34); dKa.set(DD[0], DD[1], DD[0] + DPR / Math.SQRT2 * 0.6, DD[1] - DPR / Math.SQRT2 * 0.8);
const dRl = txt(dp, DD[0] - 100, DD[1] + 66, 'R', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 26, fill: MC }), dKl = txt(dp, DD[0] + 44, DD[1] - 66, 'k', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 28, fill: RC });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`I = M${k_}^2 \\qquad ${k_} = \\sqrt{I/M}`);

/* ---------- R ---------- */
const LK = ['Ring: every bit sits at the full radius', 'Disc: many bits sit close to the centre', 'Bits near the axis add little: r is squared', 'So the disc has smaller I: k sits inside'];
$('#lks').innerHTML = LK.map((h, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${h}</div></div>`).join('');
const tLk = [wt('R2', 'ring'), wt('R3', 'disc'), wt('R4', 'Bits'), wt('R5', 'So')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 494, who: 'Aarav', face: '../../assets/illustrations/puc/aarav-face.jpg', text: 'So my ring is lazy because its mass is all far out!' });
const rr = $('#rrS'), RA = [200, 290], RB = [560, 290], RPx = 140;
const rRing = mk(rr, 'g', {}); mk(rRing, 'circle', { cx: RA[0], cy: RA[1], r: RPx, fill: 'none', stroke: RING, 'stroke-width': 3 }); for (let i = 0; i < 18; i++) { const a = i / 18 * 2 * Math.PI; mk(rRing, 'circle', { cx: RA[0] + RPx * Math.cos(a), cy: RA[1] + RPx * Math.sin(a), r: 9, fill: MC }); } axisM(rRing, RA[0], RA[1]);
const rDisc = mk(rr, 'g', {}); mk(rDisc, 'circle', { cx: RB[0], cy: RB[1], r: RPx, fill: '#EEF0F4', stroke: RING, 'stroke-width': 3 });
const rDots = []; [0.2, 0.45, 0.7, 0.95].forEach((f, j) => { const n = [3, 5, 7, 9][j]; for (let i = 0; i < n; i++) { const a = (i / n + j * 0.1) * 2 * Math.PI; rDots.push([mk(rDisc, 'circle', { cx: RB[0] + f * RPx * Math.cos(a), cy: RB[1] + f * RPx * Math.sin(a), r: 9, fill: MC }), f]); } }); axisM(rDisc, RB[0], RB[1]);
txt(rr, RA[0], 470, 'all bits at R', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 21 }); txt(rr, RB[0], 470, 'many bits near the centre', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 21 });
const rNote = txt(rr, RB[0], 504, 'faded = adds little to I', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 19 });

/* ---------- C: table ---------- */
const TB = [['ring', 'Ring', 'AXIS: THROUGH CENTRE, ⟂ PLANE', 'MR^2', 'R', 1, 'k = R'], ['disc', 'Disc', 'AXIS: THROUGH CENTRE, ⟂ PLANE', '\\tfrac12 MR^2', 'R/\\sqrt2', 0.707, 'k = 0.707 R'],
  ['rod', 'Thin rod', 'AXIS: THROUGH MIDDLE, ⟂ ROD', '\\tfrac{1}{12} ML^2', 'L/(2\\sqrt3)', 0.289, 'k = 0.289 L'], ['sph', 'Solid sphere', 'AXIS: A DIAMETER', '\\tfrac25 MR^2', '\\sqrt{\\tfrac25}\\,R', 0.632, 'k = 0.632 R']];
$('#tbs').innerHTML = TB.map(([id, n, ax, f, k, b, bl], i) => `<div class="tb" id="tb${i}" style="top:${92 + i * 112}px"><svg id="ti${i}" width="96" height="80"></svg><div class="tn">${n}</div><div class="ta">${ax}</div><div class="tf">${K(`I = ${f}`)}</div><div class="tk">${K(`${k_} = ${tc(RC, k)}`)}</div><div class="bar"><i style="width:${(b * 300).toFixed(0)}px"></i></div><div class="bv">${bl}</div></div>`).join('');
{ const a = $('#ti0'); mk(a, 'circle', { cx: 48, cy: 40, r: 30, fill: 'none', stroke: RING, 'stroke-width': 6 }); axisM(a, 48, 40, 5);
  const b = $('#ti1'); mk(b, 'circle', { cx: 48, cy: 40, r: 30, fill: DISC, stroke: MC, 'stroke-width': 2.5 }); axisM(b, 48, 40, 5);
  const c = $('#ti2'); mk(c, 'rect', { x: 8, y: 34, width: 80, height: 12, rx: 3, fill: '#8D99AE', stroke: MC, 'stroke-width': 2 }); mk(c, 'line', { x1: 48, y1: 10, x2: 48, y2: 70, stroke: MC, 'stroke-width': 2, 'stroke-dasharray': '4 4' });
  const d = $('#ti3'); mk(d, 'circle', { cx: 48, cy: 40, r: 30, fill: '#B8C4DC', stroke: MC, 'stroke-width': 2.5 }); mk(d, 'ellipse', { cx: 48, cy: 40, rx: 30, ry: 9, fill: 'none', stroke: MC, 'stroke-width': 1.5, opacity: 0.5 }); mk(d, 'line', { x1: 48, y1: 2, x2: 48, y2: 78, stroke: MC, 'stroke-width': 2, 'stroke-dasharray': '4 4' }); }
const tTb = [wt('C2', 'ring'), wt('C2', 'disc'), wt('C3', 'rod'), wt('C4', 'sphere')];

/* ---------- K ---------- */
const KS = [['#khS', 0, 0.5, 2.0], ['#klS', 1, 0.25, Math.sqrt(8)]].map(([id, d, I, om]) => { const sv = $(id), A = [392, 280], Rp = 160;
  const ghosts = [0, 1, 2].map(() => mk(sv, 'line', { x1: A[0], y1: A[1], stroke: d ? MC : RING, 'stroke-width': 4, opacity: 0 }));
  const b = d ? discB(sv, A[0], A[1], Rp) : ringB(sv, A[0], A[1], Rp, 14);
  return { sv, A, Rp, b, om, ghosts, I }; });
$('#khP').innerHTML = `1 J &nbsp;⇒&nbsp; ${K(`${tc(VC, '\\omega')} = \\sqrt{2K/I} = ${tc(VC, '2.00')}\\ \\text{rad/s}`)}`;
$('#klP').innerHTML = `1 J &nbsp;⇒&nbsp; ${K(`${tc(VC, '\\omega')} = \\sqrt{2K/I} = ${tc(VC, '2.83')}\\ \\text{rad/s}`)}`;
const th1 = PUC.think($('#th1'), { q: 'A solid sphere and a disc, same M and R. Which has the smaller I?', opts: ['Solid sphere', 'Disc'], right: 0, why: '2/5 is less than 1/2: more of the sphere sits near the axis.' });
const th2 = PUC.think($('#th2'), { q: 'A hollow cylinder and a ring, same M and R. Which has the bigger I?', opts: ['Hollow cylinder', 'Ring', 'Neither: equal'], right: 2, why: 'Both are MR²: every bit is at the full radius.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = 'A uniform rod is 1.2 m long with a mass of 2 kg. Find its moment of inertia and radius of gyration about its middle.';
const wsol = PUC.solution($('#wl'), [
  [K(`I = \\tfrac{1}{12}ML^2 = \\tfrac{2 \\times 1.44}{12} = 0.24\\ \\text{kg m}^2`)],
  [K(`${k_} = \\sqrt{I/M} = \\sqrt{0.24/2}`)],
  [K(`${k_} = \\sqrt{0.12}`)],
  [K(`${k_} \\approx ${tc(RC, '0.346\\ \\text{m}')}\\ \\ \\big(= \\tfrac{L}{2\\sqrt3}\\big)`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 84 });
$('#wl .lbl').style.top = '30px';
const wv = $('#wrS'), WA = [392, 290], WP = 450;
const wKc = mk(wv, 'circle', { cx: WA[0], cy: WA[1], r: 0.3464 * WP, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
mk(wv, 'rect', { x: WA[0] - 0.6 * WP, y: WA[1] - 10, width: 1.2 * WP, height: 20, rx: 4, fill: '#8D99AE', stroke: MC, 'stroke-width': 2.5 }); axisM(wv, WA[0], WA[1], 10);
mk(wv, 'path', { d: `M${WA[0] - 0.6 * WP},${WA[1] + 40} v10 H${WA[0] + 0.6 * WP} v-10`, fill: 'none', stroke: MC, 'stroke-width': 2.5 }); txt(wv, WA[0], WA[1] + 80, 'L = 1.2 m, M = 2 kg', { 'text-anchor': 'middle', fill: MC, 'font-weight': 700, 'font-size': 20 });
const wKa = PUC.arrow(wv, RC, 4, 12); wKa.set(WA[0], WA[1], WA[0] + 0.3464 * WP * 0.6, WA[1] - 0.3464 * WP * 0.8);
const wKl = txt(wv, WA[0] + 70, WA[1] - 110, 'k = 0.346 m', { fill: RC, 'font-weight': 700, 'font-size': 22 });
const wNote = txt(wv, WA[0], 500, 'all 2 kg on this circle: same I', { 'text-anchor': 'middle', fill: RC, 'font-weight': 700, 'font-size': 20 });
const tW = [wt('W3', 'I'), wt('W4', 'k'), wt('W4', 'Root', 1), wt('W5', 'So')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'For a disc, k = R/2, always', right: 'Central axis: k = R/√2. R/2 is for a diameter' });
const tp = $('#tpS'), TA = [190, 140];
mk(tp, 'circle', { cx: TA[0], cy: TA[1], r: 90, fill: DISC, stroke: MC, 'stroke-width': 3 }); const tpC = axisM(tp, TA[0], TA[1], 9);
const tpD = mk(tp, 'line', { x1: TA[0] - 120, y1: TA[1], x2: TA[0] + 120, y2: TA[1], stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const tpL1 = txt(tp, 330, 104, 'centre axis: k = R/√2', { fill: RC, 'font-weight': 700, 'font-size': 20 }), tpL2 = txt(tp, 330, 150, 'diameter axis: k = R/2', { fill: C.red, 'font-weight': 700, 'font-size': 20 });
const where = PUC.where($('#wa'), { on: [], type: 'Ratios of I or k between common bodies, and finding k from I' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A solid sphere (about a diameter) and a ring (about its central axis) have equal radius of gyration. Find R<sub>sphere</sub> : R<sub>ring</sub>.', qW: 780,
  opts: [K('\\sqrt{2/5}'), K('\\sqrt{5/2}'), K('5/2'), K('2/5')], right: 1, optY: 336, optH: 90 });
const so = PUC.solution($('#so'), [[K(`\\text{ring}: ${k_} = R_r`)], [K(`\\text{sphere}: ${k_}^2 = \\tfrac25 R_s^2`)], [K(`R_r^2 = \\tfrac25 R_s^2`)], [K(`\\dfrac{R_s}{R_r} = \\sqrt{\\tfrac52} \\approx 1.58\\ \\text{(B)}`)]], { y0: 100, dy: 120 });
$('#so').querySelectorAll('.sol .sx').forEach(e => e.style.fontSize = '26px');
const tSo = [wt('A2', 'ring'), wt('A3', 'sphere'), wt('A4', 'Set'), wt('A4', 'radius')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 262, w: 1260, h: 500, title: 'Recap · radius of gyration', y0: 100, dy: 98, txt: [0, 0, 0, 1],
  lines: [K(`I = M${k_}^2 \\qquad ${k_} = \\sqrt{I/M}`), K(`\\text{ring } MR^2\\ (${k_} = R) \\qquad \\text{disc } \\tfrac12MR^2\\ (${k_} = \\tfrac{R}{\\sqrt2})`),
    K(`\\text{rod } \\tfrac1{12}ML^2\\ (${k_} = \\tfrac{L}{2\\sqrt3}) \\qquad \\text{sphere } \\tfrac25MR^2\\ (${k_} = \\sqrt{\\tfrac25}R)`), '<b>k depends on the axis</b>: a disc about a diameter has k = R/2'] });
const YQ = ['What does the radius of gyration of a body mean?', 'Why is a disc\'s radius of gyration less than its radius?', 'Why do a ring and a hollow cylinder (same M, R) have the same I?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 106', topic: 'One coin, three spins: Perpendicular and Parallel Axes', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS4 + 0.1, 1.06, 960, 540], [tS7 - 0.3, 1, 960, 540]]);
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
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    MW.forEach((w, i) => attr(w.g, 'transform', `rotate(${((t - tMorph) * [60, 40, 25][i]).toFixed(2)} ${w.cx} ${w.cy})`));
    vis($('#hjP'), t, wt('H2', 'where') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); vis($('#hkA'), t, tH3 + 0.2, 1e9, { dy: 20 });
    vis(hRing.o, t, wt('H3', 'ring') - 0.1, 1e9, { dy: 0 }); vis(hDisc.o, t, wt('H3', 'disc') - 0.1, 1e9, { dy: 0 });
    vis(hLR, t, wt('H3', 'ring'), 1e9, { dy: 0 }); vis(hLD, t, wt('H3', 'disc'), 1e9, { dy: 0 }); vis(hSame, t, wt('H3', 'Same') - 0.1, 1e9, { dy: 0 });
    const sp = Math.max(0, t - tPush); hRing.set(2.0 * sp, HR); hDisc.set(2.83 * sp);
    vis(hWR, t, wt('H4', 'ring') - 0.1, 1e9, { dy: 0 }); vis(hWD, t, wt('H4', 'disc') - 0.1, 1e9, { dy: 0 });
    vis($('#hkQ'), t, wt('H4', 'Same') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, POP)); vis($('#lawP'), t, wt('P3', 'equals') - 0.1, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const u = M.io((t - wt('P1', 'thin') + 0.1) / 1.6), ph = 0.5 * Math.max(0, t - tP1);
    pEl.forEach((e, i) => { const [f, a] = pDots[i], a2 = (i / pDots.length) * 2 * Math.PI, r = M.lerp(f * PR, PK, u), aa = M.lerp(a, a2, u) + ph;
      attr(e, 'cx', (PC0[0] + r * Math.cos(aa)).toFixed(1)); attr(e, 'cy', (PC0[1] + r * Math.sin(aa)).toFixed(1)); vis(e, t, tP1 + 0.6 + i * 0.015, 1e9, { dy: 0 }); });
    vis(pKc, t, wt('P2', 'radius') - 0.1, 1e9, { dy: 0 });
    const uk = M.o3((t - wt('P3', 'k') + 0.1) / 0.4); pKa.set(PC0[0], PC0[1], PC0[0] + PK * 0.71 * uk, PC0[1] - PK * 0.71 * uk); vis(pKl, t, wt('P3', 'k'), 1e9, { dy: 0 });
    vis(pNote, t, wt('P2', 'matches') - 0.1, 1e9, { dy: 0 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const frozen = t >= tFz && t < tS6 - 0.2, sp = OMV * (t - tS1);
    sDisc.set(frozen ? OMV * (tFz - tS1) : sp); vis(sDisc.o, t, tS1 + 0.4, 1e9, { dy: 0 }); vis(sDl, t, tS1 + 0.6, 1e9, { dy: 0 });
    const r = rAt(t); sRing.set(frozen ? OMV * (tFz - tS1) : sp, r * PX); vis(sRing.o, t, tS2 - 0.1, 1e9, { dy: 0 }); vis(sRL, t, tS2 + 0.2, 1e9, { dy: 0 }); vis(sRingO, t, tS3, 1e9, { dy: 0 });
    const mv = rMoving(t), slow = t >= tS4;
    ghR.forEach((e, j) => { const rg = rAt(t - (slow ? 0.4 : 0.15) * (j + 1)); attr(e, 'r', (rg * PX).toFixed(1)); e.style.opacity = mv && Math.abs(rg - r) > 0.004 ? [0.3, 0.2, 0.12][j] * 0.6 : 0; });
    const ua = M.io((t - wt('S2', 'full') + 0.1) / 0.4); sRa.set(RCn[0], RCn[1], RCn[0] + r * PX * 0.94 * ua, RCn[1] - r * PX * 0.34 * ua); attr(sRl, 'x', RCn[0] + r * PX * 0.5 - 10); attr(sRl, 'y', RCn[1] - r * PX * 0.17 - 14); M.setT(sRl, 'r'); sRl.style.opacity = ua;
    vis(sKd, t, wt('S6', 'radius', 1) - 0.1, 1e9, { dy: 0 });
    vis($('#simP'), t, wt('S6', 'gyration') - 0.1, 1e9, POP);
    vis($('#smo'), t, tS4 + 0.05, tFz, { ...POP, sc: 0.8 }); vis($('#frz'), t, tFz, tS6 - 0.2, { ...POP, sc: 0.8 });
    // readout: r rounded first, then I from it
    const rr3 = Math.round(r * 1000) / 1000, Ir = IR(rr3), match = t >= tFz;
    M.setT($('#r_r'), f3(rr3)); M.setT($('#r_Ir'), f3(match ? 0.25 : Ir)); M.setT($('#r_q'), f2((match ? 0.25 : Ir) / 0.25)); M.setT($('#r_k'), match ? f3(KD) : '-');
    vis($('#roA'), t, tS2, 1e9, { dy: 8 }); $('#r_Ir').style.background = mix('#FFFFFF', C.okBg, match ? M.io((t - tFz) / 0.3) : 0); $('#r_k').style.background = mix('#FFFFFF', '#EFE9FB', match ? M.io((t - tFz) / 0.3) : 0);
    plotR(gC, r, 0.5); gDot(r, IR(r), t >= tS2); vis(gC, t, tS2, 1e9, { dy: 0 }); vis(gGhost, t, tS2, 1e9, { dy: 0 });
    vis(gDisc, t, tS1 + 1.0, 1e9, { dy: 0 }); vis(gDl, t, tS1 + 1.2, 1e9, { dy: 0 }); M.draw(gK, t, tFz + 0.2, 0.5); vis(gKl, t, tFz + 0.5, 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dy: 36 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(SY[0], SY.slice(1).map((y, i) => [tStep[i + 1] - 0.1, y]), M.SOFT)(t), hb = $('#hiB');
    vis(hb, t, tStep[0] - 0.1, T0('D6') - 0.1, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dpan'), t, tD1 + 0.4, 1e9, { dx: 40, dy: 0 }); dDisc.set(0.6 * (t - tD1));
    vis(dK, t, tStep[0] + 0.6, 1e9, { dy: 0 }); vis(dKl, t, tStep[0] + 0.8, 1e9, { dy: 0 }); vis(dKa.g, t, tStep[0] + 0.7, 1e9, { dy: 0 }); vis(dRl, t, tStep[2], 1e9, { dy: 0 }); vis(dRa.g, t, tStep[2], 1e9, { dy: 0 });
    vis($('#dres'), t, T0('D6') + 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'give') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'inertia') - 0.1, 0.8);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, POP));
    vis($('#rr'), t, tR1 + 0.5, out, { dx: 60, dy: 0, ...o }); vis(rRing, t, tLk[0] - 0.1, 1e9, { dy: 0 }); vis(rDisc, t, tLk[1] - 0.1, 1e9, { dy: 0 });
    const uf = M.io((t - wt('R4', 'squared') + 0.2) / 0.6); rDots.forEach(([e, f]) => e.style.opacity = (1 - uf * (1 - f * f)).toFixed(3)); vis(rNote, t, wt('R4', 'squared'), 1e9, { dy: 0 });
    avA(t, wt('R5', 'inside') + 0.2, out);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    vis($('#ct'), t, tC1 + 0.05, OUT('K1'), { dy: 36, ...o });
    TB.forEach((_, i) => { const el = $('#tb' + i); vis(el, t, tTb[i] - 0.15, 1e9, { dx: -24, dy: 0 }); const b = el.querySelector('.bar i'), u = M.o3((t - tTb[i] - 0.3) / 0.6); b.style.width = (TB[i][5] * 300 * u).toFixed(1) + 'px'; });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const in2 = t >= tK4 ? tK4 + 0.15 : null, outK = t < tK4 ? OUT('K3') : OUT('K5');
    vis($('#kh'), t, in2 ?? tK1 + 0.1, outK, { dx: -60, dy: 0, ...o }); vis($('#kl'), t, in2 ? in2 + 0.1 : tK2 - 0.1, outK, { dx: 60, dy: 0, ...o });
    const tg = wt('K1', 'joule');
    KS.forEach((q, i) => { const sp = q.om * Math.max(0, t - tg); q.b.set(sp, q.Rp); q.ghosts.forEach((gq, j) => { const a = q.om * Math.max(0, t - tg - 0.05 * (j + 1)); attr(gq, 'x2', (q.A[0] + q.Rp * Math.cos(a)).toFixed(1)); attr(gq, 'y2', (q.A[1] + q.Rp * Math.sin(a)).toFixed(1)); gq.style.opacity = t > tg + 0.2 ? [0.3, 0.2, 0.12][j] : 0; }); });
    vis($('#khP'), t, wt('K2', 'ring') - 0.1, 1e9, POP); vis($('#klP'), t, wt('K2', 'disc') - 0.1, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('K4'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: tK4 - 0.02, tWhy: wt('K4', 'Two') });
    vis($('#th2'), t, tK5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK5, tOpts: wt('K5', 'Which') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: tK6 - 0.02, tWhy: wt('K6', 'Both') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wKc, t, tW[3] - 0.1, 0.8); vis(wKa.g, t, tW[3], 1e9, { dy: 0 }); vis(wKl, t, tW[3] + 0.2, 1e9, { dy: 0 }); vis(wNote, t, tW[3] + 0.8, 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'About') - 0.1, tRight: wt('X3', 'root') - 0.2 });
    vis(tpL1, t, wt('X3', 'central'), 1e9, { dy: 0 }); M.draw(tpD, t, wt('X3', 'diameter') - 0.1, 0.5); vis(tpL2, t, wt('X3', 'diameter'), 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'ratio') });
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
