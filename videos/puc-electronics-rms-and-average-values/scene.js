// PUC Electronics Ep 14 - RMS and average values ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, charge orange, t and R ink; power / heat P gold
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, GO = C.gold, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', TEL = '#5CC8C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
// italic symbol with an upright subscript, e.g. V with m
const vsub = (p, x, y, s, sb, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: TE, 'font-style': 'italic', ...a });
  const t1 = mk(e, 'tspan', {}); t1.textContent = s; if (sb) { const t2 = mk(e, 'tspan', { 'font-size': (a['font-size'] || 26) * 0.62, dy: 6, 'font-style': 'normal' }); t2.textContent = sb; } return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const TAU = 2 * Math.PI;
// sine path: x0..x0+w covers `cyc` cycles; y = y0 - a * f(phase)
const wave = (x0, w, y0, a, cyc, f = Math.sin, n = 160, ph0 = 0) => { let d = ''; for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + w * u, y = y0 - a * f(TAU * (ph0 + cyc * u)); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
// closed area between a half-cycle hump and the axis
const hump = (x0, w, y0, a, neg, n = 60) => { let d = `M${x0},${y0}`; for (let i = 0; i <= n; i++) { const u = i / n; d += `L${(x0 + w * u).toFixed(1)},${(y0 - (neg ? -1 : 1) * a * Math.sin(Math.PI * u)).toFixed(1)}`; } return d + `L${x0 + w},${y0}Z`; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions, roll-mode traces (newest at the right) */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
const steps = (host, rows, o = {}) => { host.innerHTML = rows.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n">${'•'}</div><div class="sx" style="${o.fs ? 'font-size:' + o.fs + 'px' : ''}">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runSteps = (rows, t, ts, tout = 1e9) => rows.forEach((r, i) => { M.hide(r, t < ts[i] - 0.15); M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Two') - 0.25;
const tP = T0('P1'), tB = T0('B1'), tT = T0('T1'), tR = T0('R1'), tG = T0('G1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tR], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const fq = 0.5, OMG = TAU * fq;   // slow-motion view of the 50 Hz wave

/* ================= A: hook ================= */
const htS = $('#htS');
const htB = [W(htS, 'M60,20 H240 A20,20 0 0 1 260,40 V280 A20,20 0 0 1 240,300 H60 A20,20 0 0 1 40,280 V40 A20,20 0 0 1 60,20 Z', { 'stroke-width': 5 })];
const htG = mk(htS, 'rect', { x: 66, y: 46, width: 168, height: 228, rx: 10, fill: '#FFFFFF' });
const htC = [0, 1, 2, 3, 4].map(i => W(htS, `M82,${74 + i * 44} q19,-16 38,0 t38,0 t38,0 t38,0`, { 'stroke-width': 4 }));
const htF = [W(htS, 'M90,300 V318'), W(htS, 'M210,300 V318')];
const htPl = mk(htS, 'rect', { x: 50, y: 334, width: 200, height: 86, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const htT = [mono(htS, 150, 362, 'RATING', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': '.1em' }), mono(htS, 150, 400, '230 V  50 Hz', { 'text-anchor': 'middle', 'font-size': 24, fill: TE, 'font-weight': 600 })];
// scope: the mains wave, +-325 V marked
const hs = $('#hScope'), HW = 720, HH = 420, HM = 210, HA = 150;
const HSC = scope(hs, HW, HH), hTr = HSC.tr(CH1);
const hPk = [mk(hs, 'line', { x1: 0, y1: HM - HA, x2: HW, y2: HM - HA, stroke: AM, 'stroke-width': 2, 'stroke-dasharray': '8 8' }), mk(hs, 'line', { x1: 0, y1: HM + HA, x2: HW, y2: HM + HA, stroke: AM, 'stroke-width': 2, 'stroke-dasharray': '8 8' })];
const hPkL = [HSC.lab(HW - 14, HM - HA - 10, '+325 V  PEAK', AM, { 'text-anchor': 'end', 'font-size': 20 }), HSC.lab(HW - 14, HM + HA + 28, '-325 V', AM, { 'text-anchor': 'end', 'font-size': 20 })];
const hRm = mk(hs, 'line', { x1: 0, y1: HM - HA * 230 / 325, x2: HW, y2: HM - HA * 230 / 325, stroke: TEL, 'stroke-width': 3 });
const hRmB = mk(hs, 'rect', { x: HW - 282, y: HM - HA * 230 / 325 + 8, width: 270, height: 34, rx: 6, fill: '#16213E', stroke: TEL, 'stroke-width': 1.5 });
const hRmL = HSC.lab(HW - 147, HM - HA * 230 / 325 + 32, '230 V ON THE LABEL ?', TEL, { 'font-size': 18, 'text-anchor': 'middle' });
const hCh = HSC.lab(14, 28, 'CH1 · MAINS VOLTAGE', CH1);
const tWave = wt('H2', 'scope') - 0.2;

/* ================= P: the problem ================= */
const pS = $('#pS'), PX = 80, PWd = 900, PY = 290, PA = 170;
const pAx = [W(pS, `M${PX - 10},${PY} H${PX + PWd + 10}`, { 'stroke-width': 2.5 }), W(pS, `M${PX},${PY - PA - 30} V${PY + PA + 30}`, { 'stroke-width': 2.5 })];
const pLab = [vsub(pS, PX + 14, PY - PA - 14, 'v', ''), tx(pS, PX + PWd + 4, PY + 34, 't', { 'font-style': 'italic', 'font-size': 26 })];
const pFill = [0, 1, 2, 3].map(i => mk(pS, 'path', { d: hump(PX + i * PWd / 4, PWd / 4, PY, PA, i % 2 === 1), fill: i % 2 ? '#E7E9F0' : C.ac2 }));
const pSign = [0, 1, 2, 3].map(i => tx(pS, PX + (i + 0.5) * PWd / 4 + (i === 0 ? 46 : 0), PY + (i % 2 ? 70 : -50), i % 2 ? '-' : '+', { 'text-anchor': 'middle', 'font-size': 52, fill: i % 2 ? MU : '#B7791F', 'font-weight': 700 }));
const pWave = W(pS, wave(PX, PWd, PY, PA, 2), { stroke: TE, 'stroke-width': 5 });
const pVm = PUC.arrow(pS, TE, 4, 14), pVmL = vsub(pS, PX + PWd / 8 - 12, PY - 70, 'V', 'm', { 'text-anchor': 'end' });
const ppX = PX + PWd + 0;
const pPP = [mk(pS, 'line', { x1: PX + PWd * 5 / 8, y1: PY - PA, x2: PX + PWd + 20, y2: PY - PA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), mk(pS, 'line', { x1: PX + PWd * 7 / 8, y1: PY + PA, x2: PX + PWd + 20, y2: PY + PA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
const pPPa = PUC.arrow(pS, TE, 4, 14), pPPb = PUC.arrow(pS, TE, 4, 14), pPPL = vsub(pS, PX + PWd - 4, PY - 46, '2V', 'm', { 'text-anchor': 'end' });
$('#pZ').innerHTML = M.icon('x', 30, AM, 2.6);
const PROWS = [['PEAK', K(`\\textcolor{${TE}}{V_m}`)], ['PEAK TO PEAK', K(`2\\textcolor{${TE}}{V_m}`)], ['FULL-CYCLE AVERAGE', K('0')], ['RMS VALUE', '?'], ['HALF-CYCLE AVERAGE', '?']];
$('#pRows').innerHTML = PROWS.map(([l, v], i) => `<div class="vr" style="top:${84 + i * 96}px"><div class="vl">${l}</div><div class="vv${v === '?' ? ' q' : ''}">${v}</div></div>`).join('');
const pR = [...$('#pRows').children];
const tPr = [wt('P2', 'peak'), wt('P3', 'peak'), wt('P5', 'average'), wt('P5', 'better'), wt('P5', 'better') + 0.15];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
// top loop: alternating source, heater coil
const zig = (x, y1, y2) => { const n = 6, h = (y2 - y1) / n; let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -16 : 16)},${y1 + h * (i + 0.5)}`; return d + ` L${x},${y2}`; };
const heat1 = mk(ck, 'rect', { x: 722, y: 118, width: 76, height: 124, rx: 14, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 2.5 });
const heat2 = mk(ck, 'rect', { x: 722, y: 368, width: 76, height: 124, rx: 14, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 2.5 });
const tw = [W(ck, 'M150,136 V90 H760 V130'), W(ck, 'M760,230 V270 H150 V224'), W(ck, zig(760, 130, 230))];
const src = [mk(ck, 'circle', { cx: 150, cy: 180, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M122,180 C132,156 140,156 150,180 S168,204 178,180')];
const bw = [W(ck, 'M150,410 V340 H760 V380'), W(ck, 'M760,480 V520 H150 V446'), W(ck, zig(760, 380, 480))];
const bat = [W(ck, 'M115,410 H185', { 'stroke-width': 5 }), W(ck, 'M132,446 H168', { 'stroke-width': 9 })];
const lbT = [tx(ck, 214, 172, 'Alternating supply'), mono(ck, 214, 202, '10 V peak', { fill: TE, 'font-weight': 600 }), tx(ck, 820, 172, 'Heater'), mono(ck, 820, 200, '10 Ω')];
const lbB = [tx(ck, 64, 406, '+', { 'font-size': 28 }), tx(ck, 68, 462, '-', { 'font-size': 30 }), tx(ck, 214, 420, 'Battery (DC)'), tx(ck, 820, 422, 'Heater'), mono(ck, 820, 450, '10 Ω')];
const bV = mono(ck, 214, 452, '0.00 V', { fill: TE, 'font-weight': 600, 'font-size': 24 });
const skipT = (x, y) => (Math.hypot(x - 150, y - 180) < 46) || (x > 740 && x < 780 && y > 126 && y < 234);
const skipB = (x, y) => (x > 110 && x < 190 && y > 404 && y < 452) || (x > 740 && x < 780 && y > 376 && y < 484);
const eT = flow(ck, [[150, 136], [150, 90], [760, 90], [760, 270], [150, 270], [150, 224]], 24, { skip: skipT });
const eB = flow(ck, [[150, 446], [150, 520], [760, 520], [760, 340], [150, 340], [150, 410]], 24, { skip: skipB });
const tB2 = T0('B2'), tAC = wt('B3', 'Watch'), tBat = T0('B4');
// battery voltage: turned up in steps, then settles at 7.07 V
const VK = [[wt('B4', 'turn'), 0], [wt('B5', 'five') + 0.2, 5], [T0('B6') + 0.2, 5], [wt('B6', 'peak') + 0.2, 10], [T0('B7') + 0.1, 10], [wt('B7', 'zero') + 0.3, 7.0711]];
const Vb = t => { if (t <= VK[0][0]) return 0; for (let i = 0; i < VK.length - 1; i++) { const [a, va] = VK[i], [b, vb] = VK[i + 1]; if (t < b) return va + (vb - va) * M.io((t - a) / (b - a)); } return VK[VK.length - 1][1]; };
const bOff = t => { let s = 0; const a = VK[0][0]; for (let u = a; u < t; u += 0.04) s += Vb(u) * 0.04; return 14 * s; };
const SC = scope($('#scS'), 592, 200);
const trA = SC.tr(CH1), trD = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · ALTERNATING, 10 V PEAK', CH1), SC.lab(14, 190, 'CH2 · BATTERY DC', AM)];
$('#rbRows').innerHTML = `<div class="hr" style="top:72px"><div class="k2">V<sub>DC</sub></div><div class="v" id="rV" style="color:${TE}">0.00</div><div class="u">V</div></div>
  <div class="hr" style="top:132px"><div class="k">TOP COIL</div><div class="bar"><i id="b1"></i></div><div class="v" id="r1">0.00</div><div class="u">W</div></div>
  <div class="hr" style="top:188px"><div class="k">BOTTOM COIL</div><div class="bar"><i id="b2"></i></div><div class="v" id="r2">0.00</div><div class="u">W</div></div>`;
const hr = [...$('#rbRows').children];

/* ================= R: rms derivation ================= */
const rS = $('#rS'), RX = 70, RWd = 540, RY = 300, RA = 150;
const rAx = [W(rS, `M${RX - 10},${RY} H${RX + RWd + 10}`, { 'stroke-width': 2.5 }), W(rS, `M${RX},${RY - RA - 20} V${RY + RA + 20}`, { 'stroke-width': 2.5 })];
const rV = W(rS, wave(RX, RWd, RY, RA, 2), { stroke: TE, 'stroke-width': 4 });
const rV2f = mk(rS, 'path', { d: (() => { let d = `M${RX},${RY}`; for (let i = 0; i <= 160; i++) { const u = i / 160; d += `L${(RX + RWd * u).toFixed(1)},${(RY - RA * Math.sin(TAU * 2 * u) ** 2).toFixed(1)}`; } return d + `L${RX + RWd},${RY}Z`; })(), fill: '#F6EAD3' });
const rV2 = W(rS, wave(RX, RWd, RY, RA, 2, a => Math.sin(a) ** 2), { stroke: GO, 'stroke-width': 5 });
const rMean = mk(rS, 'line', { x1: RX, y1: RY - RA / 2, x2: RX + RWd + 10, y2: RY - RA / 2, stroke: GO, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const rMeanL = [mono(rS, RX + RWd + 22, RY - RA / 2 - 6, 'mean', { fill: GO, 'font-weight': 600, 'font-size': 22 }), mono(rS, RX + RWd + 22, RY - RA / 2 + 22, '= half', { fill: GO, 'font-weight': 600, 'font-size': 22 })];
const rPk = mono(rS, RX + RWd + 22, RY - RA + 8, 'peak', { 'font-size': 20 });
const rLeg = [vsub(rS, 520, 92, 'v', ''), tx(rS, 548, 92, 'wave', { 'font-size': 20, fill: MU, 'font-weight': 500 }), vsub(rS, 620, 92, 'v²', '', { fill: GO }), tx(rS, 662, 92, 'squared', { 'font-size': 20, fill: MU, 'font-weight': 500 })];
$('#rChips').innerHTML = ['SQUARE', 'MEAN', 'ROOT'].map((s, i) => `${i ? `<span class="ar">${M.icon('arrowR', 28, MU, 2.4)}</span>` : ''}<span class="pillp">${s}</span>`).join('');
const rCh = [...$('#rChips').querySelectorAll('.pillp')], rAr = [...$('#rChips').querySelectorAll('.ar')];
const Vt = `\\textcolor{${TE}}{v}`, Vm = `\\textcolor{${TE}}{V_m}`, Pg = `\\textcolor{${GO}}{P}`;
const rRows = steps($('#rSteps'), [
  [K(`${Pg} = \\dfrac{${Vt}^2}{R}`), 'heat every second', 76],
  [K(`${Vt} = ${Vm}\\sin\\omega t \\;\\Rightarrow\\; ${Pg} = \\dfrac{${Vm}^2\\sin^2\\omega t}{R}`), '', 166],
  [K(`\\text{mean of }\\sin^2\\omega t = \\tfrac{1}{2}`), 'over a full cycle', 262],
  [K(`\\textcolor{${GO}}{\\bar{P}} = \\dfrac{${Vm}^2}{2R}`), 'average power', 340],
  [K(`\\dfrac{\\textcolor{${TE}}{V}^2}{R} = \\dfrac{${Vm}^2}{2R}`), 'battery, same heat', 426],
  [K(`\\textcolor{${TE}}{V_{\\text{rms}}} = \\dfrac{${Vm}}{\\sqrt{2}} = 0.707\\,${Vm}`), '', 516]]);
const rBox = $('#rBox'); rBox.style.top = '502px'; rBox.style.height = '88px';
const tRs = [wt('R2', 'For'), wt('R3', 'Here'), wt('R4', 'And'), wt('R5', 'So'), wt('R6', 'A'), wt('R7', 'V')];

/* ================= G: average value + factors ================= */
const gS = $('#gS'), GX = 70, GWd = 540, GY = 320, GA = 180, AVG = 2 / Math.PI;
const gAx = [W(gS, `M${GX - 10},${GY} H${GX + GWd + 10}`, { 'stroke-width': 2.5 }), W(gS, `M${GX},${GY - GA - 30} V${GY + GA + 20}`, { 'stroke-width': 2.5 })];
const gNeg = mk(gS, 'path', { d: hump(GX + GWd / 2, GWd / 2, GY, GA, true), fill: '#E7E9F0' });
const gNegS = tx(gS, GX + GWd * 3 / 4, GY + 80, '-', { 'text-anchor': 'middle', 'font-size': 52, fill: MU, 'font-weight': 700 });
const gArea = mk(gS, 'path', { d: hump(GX, GWd / 2, GY, GA, false), fill: C.ac2, stroke: AM, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const gWave = W(gS, wave(GX, GWd, GY, GA, 1), { stroke: TE, 'stroke-width': 4 });
const gPk = mk(gS, 'line', { x1: GX, y1: GY - GA, x2: GX + GWd + 10, y2: GY - GA, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gPkL = vsub(gS, GX + GWd + 22, GY - GA + 8, 'V', 'm', { 'font-size': 24 });
const gAvL = [mono(gS, GX + GWd + 22, GY - GA * AVG + 8, '0.637', { fill: '#B7791F', 'font-weight': 600, 'font-size': 22 }), vsub(gS, GX + GWd + 92, GY - GA * AVG + 8, 'V', 'm', { 'font-size': 22 })];
const gSame = mk(gS, 'g'); { const b = mk(gSame, 'rect', { x: GX, y: GY + GA + 34, width: 310, height: 44, rx: 10, fill: C.soft }); tx(gSame, GX + 155, GY + GA + 64, 'same area, same width', { 'text-anchor': 'middle', 'font-size': 20, fill: INK, 'font-weight': 600 }); }
const gHalf = mono(gS, GX + GWd / 4, GY + 50, 'HALF CYCLE', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const gRows = steps($('#gSteps'), [
  [K(`\\text{full cycle: } \\bar{${Vt}} = 0`), 'plus and minus cancel', 84],
  [K(`\\textcolor{${TE}}{V_{\\text{avg}}} = \\dfrac{2${Vm}}{\\pi} = 0.637\\,${Vm}`), 'half cycle', 176],
  [K(`\\text{Form factor} = \\dfrac{\\textcolor{${TE}}{V_{\\text{rms}}}}{\\textcolor{${TE}}{V_{\\text{avg}}}} = 1.11`), '', 300],
  [K(`\\text{Peak factor} = \\dfrac{${Vm}}{\\textcolor{${TE}}{V_{\\text{rms}}}} = \\sqrt{2} \\approx 1.414`), '', 430]]);
const gBox = $('#gBox'); gBox.style.top = '162px'; gBox.style.height = '100px';
const tGs = [wt('G1', 'Over'), wt('G3', 'It'), wt('G4', 'The'), wt('G5', 'The')];
const tFlat = wt('G2', 'Flatten');

/* ================= W: worked example ================= */
const wS = $('#wS'), BY = 500, BS = 380 / 650;
const BARS = [['RMS', 230, 'given'], ['PEAK', 325, ''], ['AVERAGE', 207, 'half cycle'], ['PEAK TO PEAK', 650, '']];
const wBar = BARS.map(([l, v], i) => { const x = 64 + i * 172; const g = mk(wS, 'g');
  const r = mk(g, 'rect', { x, y: BY, width: 128, height: 0, rx: 10, fill: i === 0 ? TE : M.mix(TE, '#FFFFFF', 0.55) });
  const vt = mono(g, x + 64, BY, v + ' V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 26 });
  const lt = mono(g, x + 64, BY + 34, l, { 'text-anchor': 'middle', 'font-size': 17, 'letter-spacing': '.06em', 'font-weight': 600 });
  return { g, r, vt, lt, h: v * BS }; });
const wBase = W(wS, `M40,${BY} H744`, { 'stroke-width': 2.5 });
const wRows = steps($('#wSteps'), [
  [K(`\\textcolor{${TE}}{V_{\\text{rms}}} = 230\\,\\text{V}`), 'on the label', 84],
  [K(`${Vm} = 230 \\times \\sqrt{2} \\approx 325\\,\\text{V}`), '', 176],
  [K(`\\textcolor{${TE}}{V_{\\text{avg}}} = 0.637 \\times 325 \\approx 207\\,\\text{V}`), '', 268],
  [K(`\\textcolor{${TE}}{V_{pp}} = 2${Vm} \\approx 650\\,\\text{V}`), '', 360]]);
const wBox = $('#wBox'); wBox.style.top = '162px'; wBox.style.height = '84px';
const tWs = [wt('W1', 'Two'), wt('W2', 'The'), wt('W3', 'The'), wt('W4', 'peak')];
const avW = PUC.avatar($('#sW'), { x: 1008, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The label shows RMS. The scope shows the peak!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Full-cycle average = 0.637 V<sub>m</sub>', right: 'Full cycle: 0 · half cycle: 0.637 V<sub>m</sub>', y0: 96, y1: 184 });
const tcS = $('#tcS'), TY = 160, TA = 80;
const tcA = [W(tcS, `M36,${TY} H364`, { 'stroke-width': 2.5 }), W(tcS, `M416,${TY} H744`, { 'stroke-width': 2.5 })];
const tcF = [mk(tcS, 'path', { d: hump(40, 160, TY, TA, false), fill: C.ac2 }), mk(tcS, 'path', { d: hump(200, 160, TY, TA, true), fill: '#E7E9F0' })];
const tcW = W(tcS, wave(40, 320, TY, TA, 1), { stroke: TE, 'stroke-width': 4 });
const tcH = W(tcS, wave(420, 320, TY, TA, 0.5), { stroke: TE, 'stroke-width': 4 });
const tcR = mk(tcS, 'rect', { x: 420, y: TY - TA * AVG, width: 320, height: TA * AVG, fill: C.ac2, stroke: AM, 'stroke-width': 3 });
const tcL = [mono(tcS, 200, 282, 'FULL CYCLE: 0', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(tcS, 580, 282, 'HALF CYCLE: 0.637 Vm', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Convert peak, RMS and average values, form and peak factor, heat in a resistor' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '27px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A sine wave voltage of peak 200&nbsp;V is applied across a 50&nbsp;Ω resistor. How much heat is produced in 1&nbsp;minute?', qW: 800,
  opts: [K('48\\,\\text{kJ}'), K('24\\,\\text{kJ}'), K('19.5\\,\\text{kJ}'), K('12\\,\\text{kJ}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`\\textcolor{${TE}}{V_{\\text{rms}}^2} = \\dfrac{${Vm}^2}{2} = 20\\,000`)], [K(`${Pg} = \\dfrac{20\\,000}{50} = 400\\,\\text{W}`)],
  [K(`H = ${Pg}\\,t = 400 \\times 60`)], [K(`H = 24\\,000\\,\\text{J} = 24\\,\\text{kJ}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'First'), wt('A3', 'Power'), wt('A4', 'Heat'), wt('A4', 'twenty')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 504, y0: 84, dy: 116, title: 'RMS and average values · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${TE}}{V_{\\text{rms}}} = \\dfrac{${Vm}}{\\sqrt{2}} = 0.707\\,${Vm}`),
    K(`\\textcolor{${TE}}{V_{\\text{avg}}} = \\dfrac{2${Vm}}{\\pi} = 0.637\\,${Vm} \\quad (\\text{half cycle})`),
    'Form factor = 1.11 · Peak factor = 1.414 · Full-cycle average = 0',
    'Mains: 230 V RMS = about 325 V peak, 650 V peak to peak'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 15', topic: 'Inductive and capacitive reactance', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tB7 = wt('B7', 'both'), tB8 = wt('B8', 'That'), tG2 = T0('G2'), tG4 = T0('G4');
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tB7, 1.06, 1020, 580], [tB8, 1, 960, 540], [tFlat, 1.06, 960, 560], [tG4 - 0.2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB2, tT - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!(t >= tB2 - 0.1 && t < tT)) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(htB, t, tMorph + 0.6, 0.5); M.vis(htG, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 }); drawSeq(htC, t, tMorph + 0.9, 0.3, 0.08); drawSeq(htF, t, tMorph + 1.0, 0.2, 0.05);
    M.vis(htPl, t, wt('H1', 'Two') - 0.1, 1e9, { dy: 0, sc: 0.9, sp: M.POP, fade: 0.1 }); fadeAt(htT, t, wt('H1', 'Two'));
    const glow = M.io((t - wt('H1', 'heater')) / 0.4); PUC.attr(htG, 'fill', M.mix('#FFFFFF', '#F7D58C', glow)); htC.forEach(c => PUC.attr(c, 'stroke', M.mix(INK, '#C2410C', glow)));
    M.vis($('#aPill'), t, wt('H1', 'thirty') + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hS'), t, tWave - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(hCh, t, tWave, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#hSlow'), t, tWave + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    hTr(τ => HA * Math.sin(OMG * (τ - tWave)), t, tWave, 4, HM, t >= tWave);
    const tPkU = wt('H2', 'three'); hPk.forEach((e, i) => M.vis(e, t, tPkU - 0.1 + (i ? wt('H2', 'minus') - tPkU : 0), 1e9, { dy: 0, fade: 0.2 }));
    M.vis(hPkL[0], t, tPkU, 1e9, { dy: 0, fade: 0.2 }); M.vis(hPkL[1], t, wt('H2', 'minus'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(hRm, t, T0('H3') + 0.1, 0.5); M.vis(hRmB, t, T0('H3') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(hRmL, t, T0('H3') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#hQ'), t, wt('H3', 'real') - 0.4, 1e9, { dy: 20 });
  }

  /* P: the problem */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(pAx, t, tP + 0.4, 0.4, 0.1); fadeAt(pLab, t, tP + 0.7);
    M.draw(pWave, t, wt('P1', 'alternating'), 1.6, M.o3);
    const a1 = M.io((t - tPr[0] + 0.1) / 0.4); pVm.set(PX + PWd / 8, PY, PX + PWd / 8, PY - (PA - 4) * a1); M.hide(pVm.g, a1 <= 0.02); M.vis(pVmL, t, tPr[0] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const a2 = M.io((t - tPr[1]) / 0.45); pPP.forEach(e => M.vis(e, t, tPr[1] - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    const xm = PX + PWd + 6; pPPa.set(xm, PY, xm, PY - (PA - 2) * a2); pPPb.set(xm, PY, xm, PY + (PA - 2) * a2); M.vis(pPPL, t, tPr[1] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const tPos = wt('P4', 'positive'), tNeg = wt('P4', 'negative');
    pFill.forEach((f, i) => M.vis(f, t, (i % 2 ? tNeg : tPos) - 0.1 + (i > 1 ? 0.15 : 0), 1e9, { dy: 0, fade: 0.3 }));
    pSign.forEach((f, i) => M.vis(f, t, (i % 2 ? tNeg : tPos) + (i > 1 ? 0.15 : 0), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    M.vis($('#pStrip'), t, wt('P5', 'cancel') - 0.1, 1e9, { dy: 24 });
    pR.forEach((r, i) => { M.vis(r, t, tPr[i] - 0.1, 1e9, { dy: 16 });
      if (i === 2) { const u = M.io((t - tPr[2]) / 0.3); r.style.background = M.mix(C.soft, C.redBg, u); r.style.borderColor = M.mix(C.soft, C.red, u); }
      if (i > 2) { const u = M.io((t - tPr[i]) / 0.3); r.style.background = M.mix(C.soft, '#FFFFFF', u); r.style.borderColor = M.mix(C.soft, AM, u); } });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tAC - 0.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(tw, t, tB2 - 0.1, 0.45, 0.18); drawSeq(src, t, tB2 + 0.1, 0.35, 0.15); M.vis(heat1, t, tB2 + 0.3, 1e9, { dy: 0, fade: 0.2 }); fadeAt(lbT, t, wt('B2', 'alternating') - 0.2, 0.08);
    drawSeq(bw, t, tBat - 0.1, 0.45, 0.18); drawSeq(bat, t, tBat + 0.2, 0.25, 0.1); M.vis(heat2, t, tBat + 0.3, 1e9, { dy: 0, fade: 0.2 }); fadeAt(lbB, t, wt('B4', 'same') - 0.1, 0.06); M.vis(bV, t, wt('B4', 'battery'), 1e9, { dy: 0, fade: 0.2 });
    const s = t < tAC ? 0 : Math.sin(OMG * (t - tAC)), V = Vb(t), P2 = V * V / 10;
    eT.set(t < tAC ? 0 : 23 * (1 - Math.cos(OMG * (t - tAC))), t >= tB2 + 0.6);
    eB.set(-bOff(t), t >= tBat + 0.5);
    const l1 = t < tAC ? 0 : M.io((t - tAC) / 0.6) * (0.15 + 0.7 * s * s), l2 = P2 > 0.001 ? 0.15 + 0.7 * M.clamp(P2 / 10) : 0;
    PUC.attr(heat1, 'fill', M.mix('#FFFFFF', '#F4B860', l1)); PUC.attr(heat2, 'fill', M.mix('#FFFFFF', '#F4B860', l2));
    trA(τ => 70 * Math.sin(OMG * (τ - tAC)), t, tAC, 4, 100, t >= tAC);
    trD(τ => 7 * Vb(τ), t, tBat + 0.5, 4, 100, t >= tBat + 0.5);
    M.vis(sLab[0], t, tAC, 1e9, { dy: 0, fade: 0.2 }); M.vis(sLab[1], t, tBat + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#slowT'), t, tAC + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(hr[0], t, tBat + 0.4, 1e9, { dy: 12 }); M.vis(hr[1], t, wt('B3', 'hot') - 0.2, 1e9, { dy: 12 }); M.vis(hr[2], t, tBat + 0.6, 1e9, { dy: 12 });
    M.setT($('#rV'), V.toFixed(2)); M.setT(bV, V.toFixed(2) + ' V');
    const P1 = t < wt('B3', 'hot') ? 0 : 5 * M.io((t - wt('B3', 'hot')) / 0.5);
    M.setT($('#r1'), P1.toFixed(2)); $('#b1').style.width = (25 * P1).toFixed(1) + 'px';
    M.setT($('#r2'), P2.toFixed(2)); $('#b2').style.width = (25 * P2).toFixed(1) + 'px';
    M.vis($('#same'), t, wt('B7', 'same') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tR; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tR - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'that') - 0.05, { out: tR - 0.35, outDur: 0.25 }); }

  /* R: rms derivation */
  const rOn = t >= tR - 0.05 && t < tG + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tG - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(rAx, t, tR + 0.4, 0.4, 0.1);
    M.draw(rV, t, tRs[1] - 0.1, 1.2, M.o3); fadeAt(rLeg.slice(0, 2), t, tRs[1]);
    M.vis(rV2f, t, tRs[2] + 0.6, 1e9, { dy: 0, fade: 0.3 }); M.draw(rV2, t, tRs[2] - 0.2, 1.2, M.o3); fadeAt(rLeg.slice(2), t, tRs[2]); M.vis(rPk, t, tRs[2] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.draw(rMean, t, wt('R4', 'half') - 0.3, 0.6); fadeAt(rMeanL, t, wt('R4', 'half'));
    runSteps(rRows, t, tRs);
    M.vis(rBox, t, tRs[5] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    const tc = [wt('R8', 'Square'), wt('R8', 'mean'), wt('R8', 'root')];
    rCh.forEach((c, i) => { M.vis(c, t, tc[0] - 0.3 + i * 0.1, 1e9, { dy: 12 }); const u = M.io((t - tc[i]) / 0.25); c.style.background = M.mix(C.soft, AM, u); c.style.color = M.mix(INK, '#FFFFFF', u); });
    rAr.forEach((a, i) => M.vis(a, t, tc[0] - 0.2 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }));
  }

  /* G: average value + factors */
  const gOn = t >= tG - 0.05 && t < tW + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tW - 0.32;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(gAx, t, tG + 0.4, 0.4, 0.1); M.draw(gWave, t, tG + 0.6, 1.0, M.o3);
    M.vis(gPk, t, tG + 1.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(gPkL, t, tG + 1.3, 1e9, { dy: 0, fade: 0.2 });
    const tHalf = wt('G1', 'half');
    const fadeN = 1 - 0.75 * M.io((t - tHalf) / 0.4);
    M.vis(gNeg, t, wt('G1', 'full') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(gNegS, t, wt('G1', 'full'), 1e9, { dy: 0, fade: 0.2 });
    if (t > tHalf) { gNeg.style.opacity = fadeN.toFixed(3); gNegS.style.opacity = fadeN.toFixed(3); }
    M.vis(gArea, t, tHalf - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(gHalf, t, tHalf + 0.1, 1e9, { dy: 0, fade: 0.2 });
    // flatten the hump into a rectangle of the same area and width
    const u = M.io((t - tFlat - 0.2) / 1.4);
    let d = `M${GX},${GY}`; for (let i = 0; i <= 60; i++) { const q = i / 60, y = (1 - u) * Math.sin(Math.PI * q) + u * AVG; d += `L${(GX + GWd / 2 * q).toFixed(1)},${(GY - GA * y).toFixed(1)}`; }
    PUC.attr(gArea, 'd', d + `L${GX + GWd / 2},${GY}Z`);
    M.vis(gSame, t, wt('G2', 'same') - 0.1, 1e9, { dy: 12 });
    fadeAt(gAvL, t, wt('G3', 'height'));
    runSteps(gRows, t, tGs);
    M.vis(gBox, t, tGs[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(wBase, t, tW + 0.4, 0.5);
    wBar.forEach((b, i) => { const ti = tWs[i] + 0.1, u = M.o3((t - ti) / 0.8), h = b.h * Math.max(0, u);
      PUC.attr(b.r, 'y', (BY - h).toFixed(1)); PUC.attr(b.r, 'height', h.toFixed(1)); PUC.attr(b.vt, 'y', (BY - h - 12).toFixed(1));
      M.vis(b.vt, t, ti + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(b.lt, t, ti - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.hide(b.r, u <= 0); });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, wt('W4', 'So') - 0.1, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'wrong') - 0.1, tRight: wt('X3', 'Over') - 0.1 });
    drawSeq(tcA, t, tX + 0.5, 0.3, 0.1); M.draw(tcW, t, tX + 0.7, 0.6); M.draw(tcH, t, tX + 0.9, 0.5);
    tcF.forEach((f, i) => M.vis(f, t, wt('X3', 'Over') + i * 0.15, 1e9, { dy: 0, fade: 0.3 })); M.vis(tcL[0], t, wt('X3', 'zero'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(tcR, t, wt('X3', 'half') - 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis(tcL[1], t, wt('X3', 'half'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'Convert') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
