// PUC Electronics Ep 15 - Inductive and capacitive reactance ("Breadboard" style, Lab Notebook world)
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
const TAU = 2 * Math.PI, OMG = TAU * 0.5;   // slow-motion view: 0.5 Hz on screen
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
const tMorph = wt('H1', 'opens') - 0.1;
const tI = T0('I1'), tB = T0('B1'), tT = T0('T1'), tD = T0('D1'), tG = T0('G1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const XI = '#16213E';   // reactance X and resistance R: ink
const spk = (p, x, y, s, a = {}) => [W(p, `M${x},${y - 14 * s} h${20 * s} v${28 * s} h${-20 * s} Z`, { fill: '#fff', ...a }), W(p, `M${x + 20 * s},${y - 14 * s} L${x + 48 * s},${y - 34 * s} V${y + 34 * s} L${x + 20 * s},${y + 14 * s}`, { fill: '#fff', ...a })];

/* ================= A: hook ================= */
const spS = $('#spS');
const box = [W(spS, 'M40,10 H280 A16,16 0 0 1 296,26 V404 A16,16 0 0 1 280,420 H40 A16,16 0 0 1 24,404 V26 A16,16 0 0 1 40,10 Z', { 'stroke-width': 5, fill: '#fff' })];
const tw = [mk(spS, 'circle', { cx: 160, cy: 104, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(spS, 'circle', { cx: 160, cy: 104, r: 18, fill: C.ac2, stroke: INK, 'stroke-width': 3 })];
const wf = [mk(spS, 'circle', { cx: 160, cy: 282, r: 104, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(spS, 'circle', { cx: 160, cy: 282, r: 64, fill: '#F3F1EA', stroke: INK, 'stroke-width': 3 }), mk(spS, 'circle', { cx: 160, cy: 282, r: 22, fill: C.ac2, stroke: INK, 'stroke-width': 3 })];
const hS = $('#hS');
const hSrc = [mk(hS, 'rect', { x: 36, y: 236, width: 128, height: 92, rx: 12, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const hSrcL = mono(hS, 100, 352, 'MUSIC IN', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': '.08em' });
const mix = a => Math.sin(a) + 0.45 * Math.sin(7 * a);
const hSrcW = W(hS, wave(52, 96, 282, 20, 1.5, mix), { stroke: TE, 'stroke-width': 3 });
const hWt = [W(hS, 'M164,282 H220 V140 H372'), W(hS, 'M388,140 H600'), W(hS, 'M220,282 V400 H600')];
const hCap = [W(hS, 'M372,112 V168', { 'stroke-width': 6 }), W(hS, 'M388,112 V168', { 'stroke-width': 6 })];
const hCapL = tx(hS, 380, 96, 'Capacitor', { 'text-anchor': 'middle', 'font-size': 22 });
const hTw = spk(hS, 600, 140, 1), hWf = spk(hS, 600, 400, 1.35);
const hTwL = [tx(hS, 640, 214, 'Tiny speaker', { 'text-anchor': 'middle', 'font-size': 22 })], hWfL = [tx(hS, 300, 448, 'Big speaker: all notes', { 'font-size': 22 })];
const hW1 = W(hS, wave(236, 120, 196, 18, 1.5, mix), { stroke: TE, 'stroke-width': 3 }), hW2 = W(hS, wave(412, 150, 196, 14, 6), { stroke: TE, 'stroke-width': 3 }), hW3 = W(hS, wave(300, 220, 350, 18, 2.5, mix), { stroke: TE, 'stroke-width': 3 });
const hW2L = mono(hS, 487, 240, 'HIGH NOTES ONLY', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 17 });

/* ================= I: reactance intro ================= */
const TL = [['RESISTOR · R', 'Same at every frequency'], ['COIL (INDUCTOR) · X L', 'Rises with frequency'], ['CAPACITOR · X C', 'Falls with frequency']];
$('#iTiles').innerHTML = TL.map(([n, e], i) => `<div class="card sT" style="left:${160 + i * 544}px"><svg width="512" height="380"></svg><div class="nm">${n}</div><div class="ex">${e}</div></div>`).join('');
const iT = [...$('#iTiles').children], iS = iT.map(e => e.querySelector('svg'));
const iSym = [[W(iS[0], 'M140,110 H190 L202,88 L222,132 L242,88 L262,132 L282,88 L302,132 L314,110 H372')],
  [W(iS[1], 'M140,110 H190 a18,18 0 0 1 36,0 a18,18 0 0 1 36,0 a18,18 0 0 1 36,0 a18,18 0 0 1 36,0 H372')],
  [W(iS[2], 'M140,110 H246'), W(iS[2], 'M246,80 V140', { 'stroke-width': 6 }), W(iS[2], 'M266,80 V140', { 'stroke-width': 6 }), W(iS[2], 'M266,110 H372')]];
const iAx = iS.map(s => [W(s, 'M60,170 V290 H460', { 'stroke-width': 2.5 }), mono(s, 460, 286 - 8, 'f', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 18 }), mono(s, 70, 178, 'opposition', { 'font-size': 15 })]);
const iCur = [W(iS[0], 'M64,230 H450', { stroke: XI, 'stroke-width': 5 }), W(iS[1], 'M64,288 L450,186', { stroke: XI, 'stroke-width': 5 }),
  W(iS[2], (() => { let d = ''; for (let i = 0; i <= 60; i++) { const f = 0.12 + 0.88 * i / 60, y = 290 - Math.min(110, 13 / f); d += (i ? 'L' : 'M') + (64 + 386 * (f - 0.12) / 0.88).toFixed(1) + ',' + y.toFixed(1); } return d; })(), { stroke: XI, 'stroke-width': 5 })];

/* ================= B: breadboard ================= */
const ck = $('#ckS'), gC = mk(ck, 'g'), gK = mk(ck, 'g');
const bw = [W(ck, 'M150,254 V120 H416'), W(ck, 'M484,120 H760 V220'), W(ck, 'M760,380 V480 H150 V346')];
const bSrc = [mk(ck, 'circle', { cx: 150, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M122,300 C132,276 140,276 150,300 S168,324 178,300')];
const amm = [mk(ck, 'circle', { cx: 450, cy: 120, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), tx(ck, 450, 130, 'A', { 'text-anchor': 'middle', 'font-size': 28, fill: VI })];
const coil = [W(gC, 'M760,220 V236 a16,16 0 0 1 0,32 a16,16 0 0 1 0,32 a16,16 0 0 1 0,32 a16,16 0 0 1 0,32 V380')];
const cap = [W(gK, 'M760,220 V290'), W(gK, 'M716,290 H804', { 'stroke-width': 6 }), W(gK, 'M716,312 H804', { 'stroke-width': 6 }), W(gK, 'M760,312 V380')];
const cL = [tx(gC, 720, 292, 'Coil', { 'text-anchor': 'end' }), mono(gC, 720, 320, 'L = 0.1 H', { 'text-anchor': 'end' })];
const kL = [tx(gK, 700, 296, 'Capacitor', { 'text-anchor': 'end' }), mono(gK, 700, 324, 'C = 10 µF', { 'text-anchor': 'end' })];
const sL = [tx(ck, 214, 292, 'Alternating supply'), mono(ck, 214, 322, 'V = 10 V', { fill: TE, 'font-weight': 600 })];
const fL = mono(ck, 214, 360, 'f = 50 Hz', { fill: INK, 'font-weight': 600, 'font-size': 26 });
const skipE = (x, y) => Math.hypot(x - 150, y - 300) < 48 || Math.hypot(x - 450, y - 120) < 36 || (x > 740 && x < 780 && y > 222 && y < 378);
const eB = flow(ck, [[150, 346], [150, 480], [760, 480], [760, 120], [150, 120], [150, 254]], 26, { skip: skipE });
const tSwap = wt('B7', 'swap'), tB2 = T0('B2');
const LH = 0.1, CF = 1e-5, VS = 10;
const fK1 = [wt('B4', 'turn'), wt('B5', 'five') + 0.3], fK2 = [wt('B8', 'Turn'), wt('B8', 'rises') + 0.5];
const fNow = t => { if (t < tSwap) return 50 * Math.pow(10, M.io((t - fK1[0]) / (fK1[1] - fK1[0]))); return 50 * Math.pow(10, M.io((t - fK2[0]) / (fK2[1] - fK2[0]))); };
const isCap = t => t >= tSwap;
const Xof = t => { const f = fNow(t); return isCap(t) ? 1 / (TAU * f * CF) : TAU * f * LH; };
const Iof = t => VS / Xof(t);
const IMX = VS / (TAU * 50 * LH);
const SC = scope($('#scS'), 592, 200);
const trV = SC.tr(CH1), trI = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · V (SUPPLY)', CH1), SC.lab(14, 190, 'CH2 · I (CURRENT)', AM)];
$('#ro').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" style="color:${TE}">10.0</span><span class="u">V</span>
  <span class="k">f</span><span class="v" id="rf">50</span><span class="u">Hz</span>
  <span class="k" id="rXk">X<sub>L</sub></span><span class="v" id="rX">31.4</span><span class="u">Ω</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">318</span><span class="u">mA</span>`;
const th = t => OMG * (t - tB2);   // slow-motion phase for dots and scope
const phi = t => isCap(t) ? -Math.PI / 2 : Math.PI / 2;   // current lags (+) in a coil, leads (-) in a capacitor

/* ================= D: derivation ================= */
const dS = $('#dS'), DX = 70, DWd = 610, DY = 300, DA = 120, DCY = 1.5;
const dAx = [W(dS, `M${DX - 10},${DY} H${DX + DWd + 14}`, { 'stroke-width': 2.5 }), W(dS, `M${DX},${DY - DA - 40} V${DY + DA + 40}`, { 'stroke-width': 2.5 }), tx(dS, DX + DWd + 6, DY + 34, 't', { 'font-style': 'italic', 'font-size': 26 })];
const xAt = u => DX + DWd * u, yS = (u, ph = 0) => DY - DA * Math.sin(TAU * DCY * u + ph);
const pathU = (f, u1) => { let d = ''; const n = Math.max(2, Math.round(160 * u1)); for (let i = 0; i <= n; i++) { const u = u1 * i / n; d += (i ? 'L' : 'M') + xAt(u).toFixed(1) + ',' + f(u).toFixed(1); } return d; };
const dA = W(dS, pathU(u => yS(u), 1), { stroke: VI, 'stroke-width': 5 });   // given curve (i for the coil, v for the capacitor)
const dBt = mk(dS, 'path', { d: '', fill: 'none', stroke: TE, 'stroke-width': 5, 'stroke-linecap': 'round' });   // traced curve
const dTan = mk(dS, 'line', { stroke: INK, 'stroke-width': 3 }), dDot1 = mk(dS, 'circle', { r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 }), dDot2 = mk(dS, 'circle', { r: 9, fill: TE, stroke: INK, 'stroke-width': 2 });
const dLegA = vsub(dS, 560, 86, 'i', '', { fill: VI }), dLegB = vsub(dS, 640, 86, 'v', '', { fill: TE });
const dQ = mk(dS, 'g'); { const y = DY - DA - 22, x1 = xAt(0), x2 = xAt(0.25 / DCY);
  mk(dQ, 'line', { x1, y1: y, x2, y2: y, stroke: '#B7791F', 'stroke-width': 3 }); mk(dQ, 'line', { x1, y1: y - 10, x2: x1, y2: y + 10, stroke: '#B7791F', 'stroke-width': 3 }); mk(dQ, 'line', { x1: x2, y1: y - 10, x2, y2: y + 10, stroke: '#B7791F', 'stroke-width': 3 });
  mono(dQ, x2 + 12, y + 6, '90°  quarter cycle', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18 }); }
const Iv = `\\textcolor{${VI}}{i}`, Vv = `\\textcolor{${TE}}{v}`, XL = 'X_L', XC = 'X_C';
const dRows = steps($('#dSteps'), [
  [K(`${Vv} = L\\,\\dfrac{d${Iv}}{dt}`), 'back voltage of the coil', 76],
  [K(`\\text{rate of change} \\propto \\omega = 2\\pi f`), '', 166],
  [K(`\\textcolor{${TE}}{V_m} = \\omega L\\,\\textcolor{${VI}}{I_m} \\;\\Rightarrow\\; ${XL} = 2\\pi f L`), '', 230],
  [K(`q = C${Vv} \\;\\Rightarrow\\; ${Iv} = C\\,\\dfrac{d${Vv}}{dt}`), 'capacitor', 300],
  [K(`\\textcolor{${VI}}{I_m} = \\omega C\\,\\textcolor{${TE}}{V_m}`), 'faster change, more current', 388],
  [K(`${XC} = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi f C}`), '', 452]]);
const dB1 = $('#dBox1'), dB2 = $('#dBox2'); dB1.style.top = '216px'; dB1.style.height = '68px'; dB2.style.top = '446px'; dB2.style.height = '84px';
const tDs = [wt('D2', 'v'), wt('D3', 'For'), wt('D4', 'So'), wt('D5', 'q'), wt('D6', 'Faster'), wt('D7', 'The')];
const tP2 = T0('D5');

/* ================= G: reactance vs frequency ================= */
const gS = $('#gS'), GX = 90, GWd = 620, GB = 480, GH = 380;
const gAx = [W(gS, `M${GX},${GB - GH - 10} V${GB} H${GX + GWd + 20}`, { 'stroke-width': 2.5 }), mono(gS, GX + GWd + 20, GB + 34, 'frequency f', { 'text-anchor': 'end' }), mono(gS, GX + 14, GB - GH + 4, 'reactance X (Ω)')];
const fx = f => GX + GWd * f, XLp = f => GB - 330 * f, XCp = f => GB - Math.min(GH, 33 / f);
const gXL = W(gS, pathU2(f => [fx(f), XLp(f)], 0, 1), { stroke: XI, 'stroke-width': 5 });
const gXC = W(gS, pathU2(f => [fx(f), XCp(f)], 0.087, 1), { stroke: '#5F7399', 'stroke-width': 5 });
function pathU2(fn, a, b) { let d = ''; for (let i = 0; i <= 120; i++) { const [x, y] = fn(a + (b - a) * i / 120); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; }
const gLL = [tx(gS, fx(1) + 16, XLp(1) + 8, 'X', { 'font-style': 'italic', 'font-size': 30 }), mono(gS, fx(1) + 36, XLp(1) + 16, 'L', { 'font-size': 18, fill: INK }), mono(gS, fx(1) + 16, XLp(1) + 40, '= 2πfL', { fill: INK, 'font-size': 20 })];
const gCL = [tx(gS, fx(1) + 16, XCp(1) - 4, 'X', { 'font-style': 'italic', 'font-size': 30, fill: '#5F7399' }), mono(gS, fx(1) + 36, XCp(1) + 4, 'C', { 'font-size': 18, fill: '#5F7399' }), mono(gS, fx(1) + 16, XCp(1) + 28, '= 1/2πfC', { fill: '#5F7399', 'font-size': 20 })];
const gMk = (f, yf, col) => { const g = mk(gS, 'g'); mk(g, 'line', { x1: fx(f), y1: GB, x2: fx(f), y2: yf(f), stroke: col, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); mk(g, 'circle', { cx: fx(f), cy: yf(f), r: 9, fill: '#fff', stroke: col, 'stroke-width': 3 }); return g; };
const gD1 = [gMk(0.4, XLp, XI), gMk(0.8, XLp, XI)], gD1L = mono(gS, fx(0.6), XLp(0.8) - 30, '2f → 2 X', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const gD2 = [gMk(0.2, XCp, '#5F7399'), gMk(0.4, XCp, '#5F7399')], gD2L = mono(gS, fx(0.22), 190, '2f → X / 2', { fill: '#5F7399', 'font-weight': 600 });
const gLo = mk(gS, 'g'), gHi = mk(gS, 'g');
[[gLo, 0.12, 'LOW NOTE'], [gHi, 0.9, 'HIGH NOTE']].forEach(([g, f, s]) => { mk(g, 'rect', { x: fx(f) - 46, y: GB - GH, width: 92, height: GH, rx: 8, fill: C.ac2, opacity: 0.6 }); mono(g, fx(f), GB + 34, s, { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 17 }); });
const gLoD = mk(gS, 'circle', { cx: fx(0.12), cy: XCp(0.12), r: 11, fill: '#5F7399' }), gHiD = mk(gS, 'circle', { cx: fx(0.9), cy: XCp(0.9), r: 11, fill: '#5F7399' });
const gLoL = mono(gS, fx(0.12) + 56, XCp(0.12) + 8, 'X C high: blocked', { fill: '#5F7399', 'font-weight': 600, 'font-size': 18 }), gHiL = mono(gS, fx(0.9), XCp(0.9) - 24, 'X C low: passes', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600, 'font-size': 18 });
const GR = [['DOUBLE f · COIL', K(`X_L \\times 2`), 'doubles'], ['DOUBLE f · CAPACITOR', K(`X_C \\div 2`), 'halves'], ['DC (f = 0) · COIL', K(`X_L = 0`), 'a plain wire'], ['DC (f = 0) · CAPACITOR', K(`X_C \\to \\infty`), 'blocks DC']];
$('#gRows').innerHTML = GR.map(([l, v, w], i) => `<div class="vr" style="top:${76 + i * 122}px;height:108px"><div class="vl">${l}</div><div class="vv">${v}</div><div class="vw">${w}</div></div>`).join('');
const gR = [...$('#gRows').children];
const tGr = [wt('G2', 'Double'), wt('G3', 'Double'), wt('G4', 'coil'), wt('G4', 'capacitor')];

/* ================= W: worked example ================= */
const wS = $('#wS');
const ww = [W(wS, 'M170,254 V140 H356'), W(wS, 'M424,140 H600 V250'), W(wS, 'M600,330 V460 H170 V346')];
const wSrc = [mk(wS, 'circle', { cx: 170, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(wS, 'M142,300 C152,276 160,276 170,300 S188,324 198,300')];
const wAm = [mk(wS, 'circle', { cx: 390, cy: 140, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), tx(wS, 390, 150, 'A', { 'text-anchor': 'middle', 'font-size': 28, fill: VI })];
const wCap = [W(wS, 'M556,250 H644', { 'stroke-width': 6 }), W(wS, 'M556,272 H644', { 'stroke-width': 6 }), W(wS, 'M600,272 V330')];
const wLb = [tx(wS, 234, 292, 'Mains'), mono(wS, 234, 320, '230 V · 50 Hz', { fill: TE, 'font-weight': 600 }), tx(wS, 664, 258, 'C'), mono(wS, 664, 286, '10 µF')];
const wEl = flow(wS, [[170, 346], [170, 460], [600, 460], [600, 140], [170, 140], [170, 254]], 20, { skip: (x, y) => Math.hypot(x - 170, y - 300) < 48 || Math.hypot(x - 390, y - 140) < 36 || (x > 590 && x < 610 && y > 248 && y < 274) });
const wRd = mk(wS, 'g'); mk(wRd, 'rect', { x: 40, y: 500, width: 704, height: 76, rx: 14, fill: C.soft });
const wRdT = [tx(wRd, 72, 550, 'I', { 'font-style': 'italic', fill: VI, 'font-size': 34 }), mono(wRd, 110, 550, '= 0.00 A', { fill: VI, 'font-weight': 600, 'font-size': 34 })];
const wRows = steps($('#wSteps'), [
  [K(`X_C = \\dfrac{1}{2\\pi f C}`), '', 84],
  [K(`X_C = \\dfrac{1}{2\\pi \\times 50 \\times 10^{-5}} \\approx 318\\,\\Omega`), '', 194],
  [K(`\\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${TE}}{V}}{X_C} = \\dfrac{230}{318} \\approx 0.72\\,\\text{A}`), '', 322]]);
const wBox = $('#wBox'); wBox.style.top = '308px'; wBox.style.height = '96px';
const tWs = [wt('W2', 'X'), wt('W2', 'That'), wt('W3', 'The')];
const avW = PUC.avatar($('#sW'), { x: 1008, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Current flows, yet nothing crosses the gap!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Every reactance rises with frequency', right: 'X<sub>C</sub> = 1/(2πfC) falls as f rises', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcA = [W(tcS, 'M60,70 V250 H360', { 'stroke-width': 2.5 }), W(tcS, 'M430,70 V250 H730', { 'stroke-width': 2.5 })];
const tcL1 = W(tcS, 'M64,246 L350,96', { stroke: XI, 'stroke-width': 5 }), tcL2 = W(tcS, pathU2(f => [434 + 290 * f, 250 - Math.min(170, 22 / f)], 0.13, 1), { stroke: '#5F7399', 'stroke-width': 5 });
const tcT = [tx(tcS, 120, 110, 'X', { 'font-style': 'italic', 'font-size': 28 }), mono(tcS, 140, 118, 'L  rises', { fill: INK, 'font-weight': 600 }), tx(tcS, 560, 120, 'X', { 'font-style': 'italic', 'font-size': 28, fill: '#5F7399' }), mono(tcS, 580, 128, 'C  falls', { fill: '#5F7399', 'font-weight': 600 }),
  mono(tcS, 360, 282, 'f', { 'text-anchor': 'end', 'font-style': 'italic' }), mono(tcS, 730, 282, 'f', { 'text-anchor': 'end', 'font-style': 'italic' })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find X<sub>L</sub> or X<sub>C</sub>, how the current changes with frequency, the phase of the current' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '27px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'At 50&nbsp;Hz an inductor has a reactance of 40&nbsp;Ω and a capacitor has a reactance of 160&nbsp;Ω. At what frequency will their reactances be equal?', qW: 800,
  opts: [K('200\\,\\text{Hz}'), K('100\\,\\text{Hz}'), K('25\\,\\text{Hz}'), K('400\\,\\text{Hz}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`X_L = 40 \\times \\dfrac{f}{50}`)], [K(`X_C = 160 \\times \\dfrac{50}{f}`)],
  [K(`f^2 = 4 \\times 50^2`)], [K(`f = 100\\,\\text{Hz}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'At'), wt('A3', 'At'), wt('A4', 'f'), wt('A4', 'so')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 504, y0: 84, dy: 116, title: 'Reactance · formula card', txt: [0, 0, 1, 1],
  lines: [K(`X_L = 2\\pi f L \\qquad X_C = \\dfrac{1}{2\\pi f C}`),
    K(`\\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${TE}}{V}}{X} \\qquad X \\text{ in ohms}`),
    'Coil: current lags V by 90° · Capacitor: current leads V by 90°',
    'DC (f = 0): a coil is a plain wire, a capacitor blocks DC'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 16', topic: 'Impedance and resonance', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B6', 'Look'), 1.06, 1020, 560], [T0('B7') - 0.2, 1, 960, 540], [wt('G5', 'Back'), 1.06, 940, 560], [tW - 0.6, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const ghOn = (t >= tB2 && t < tT) || (t >= tW && t < tX);
  M.vis(ghost, t, t < tW ? tB2 : tW + 0.2, t < tW ? tT - 0.4 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!ghOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(box, t, tMorph + 0.6, 0.5); fadeAt(tw, t, wt('H1', 'tiny') - 0.1); fadeAt(wf, t, wt('H1', 'big') - 0.1);
    const pulse = t > wt('H2', 'high') ? 0.5 + 0.5 * Math.sin(TAU * 3 * (t - wt('H2', 'high'))) : 0; PUC.attr(tw[1], 'fill', M.mix(C.ac2, AM, pulse));
    M.vis($('#hR'), t, T0('H2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const t2 = T0('H2');
    drawSeq(hSrc, t, t2, 0.3); M.draw(hSrcW, t, t2 + 0.2, 0.5); M.vis(hSrcL, t, t2 + 0.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(hWt, t, t2 + 0.3, 0.4, 0.15); drawSeq(hTw, t, wt('H2', 'tiny') - 0.1, 0.3, 0.1); drawSeq(hWf, t, t2 + 0.7, 0.3, 0.1); fadeAt(hTwL, t, wt('H2', 'tiny')); fadeAt(hWfL, t, t2 + 0.9);
    M.draw(hW1, t, t2 + 0.8, 0.6); M.draw(hW3, t, t2 + 1.0, 0.7);
    const tc = wt('H2', 'capacitor'); drawSeq(hCap, t, tc - 0.3, 0.25, 0.1); M.vis(hCapL, t, tc - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.draw(hW2, t, wt('H2', 'high') - 0.2, 0.6); M.vis(hW2L, t, wt('H2', 'high'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#hQ'), t, T0('H3') + 0.1, 1e9, { dy: 20 });
  }

  /* I: reactance intro */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32, ta = [tI, wt('I2', 'coils'), wt('I2', 'capacitors')];
    iT.forEach((el, i) => { M.vis(el, t, ta[i] + 0.05, out, { dy: 36, ...o }); drawSeq(iSym[i], t, ta[i] + 0.3, 0.4, 0.1); drawSeq(iAx[i].slice(0, 1), t, ta[i] + 0.4, 0.3); fadeAt(iAx[i].slice(1), t, ta[i] + 0.5);
      const tcv = i === 0 ? wt('I1', 'same') : wt('I2', 'changes'); M.draw(iCur[i], t, tcv - 0.1, 0.8, M.o3); M.vis(el.querySelector('.ex'), t, tcv + 0.3, 1e9, { dy: 12 }); });
    M.vis($('#iStrip'), t, wt('I3', 'reactance') - 0.1, out, { dy: 30, ...o });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB2 + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ckL1'), t, tB + 0.3, tSwap - 0.2, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, tSwap + 0.1, 1e9, { dy: 10 });
    drawSeq(bw, t, tB2, 0.45, 0.18); fadeAt(bSrc, t, tB2 + 0.2); fadeAt(amm, t, tB2 + 0.4); fadeAt(sL, t, wt('B2', 'alternating') - 0.1); M.vis(fL, t, wt('B3', 'fifty') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const c1 = t < tSwap + 0.1; M.hide(gC, !c1);
    if (c1) { gC.style.opacity = (1 - M.io((t - tSwap + 0.3) / 0.3)).toFixed(3); drawSeq(coil, t, wt('B2', 'inductor') - 0.1, 0.5); fadeAt(cL, t, wt('B2', 'coil')); }
    const c2 = t >= tSwap - 0.05; M.hide(gK, !c2);
    if (c2) { drawSeq(cap, t, tSwap, 0.25, 0.1); fadeAt(kL, t, tSwap + 0.2); }
    const f = fNow(t), X = Xof(t), I = Iof(t), on = t >= wt('B3', 'fifty') - 0.3, a = M.io((t - wt('B3', 'fifty') + 0.3) / 0.4) * (t > tSwap - 0.3 && t < tSwap + 0.3 ? 0.2 : 1);
    eB.set(70 * (I / IMX) * a * Math.sin(th(t) - phi(t)), t >= tB2 + 0.8);
    M.setT(fL, 'f = ' + f.toFixed(0) + ' Hz'); M.setT($('#rf'), f.toFixed(0)); M.setT($('#rX'), X.toFixed(1)); M.setT($('#rI'), on ? (1000 * I).toFixed(0) : '0');
    setH($('#rXk'), isCap(t) ? 'X<sub>C</sub>' : 'X<sub>L</sub>');
    trV(τ => 60 * Math.sin(th(τ)), t, tB2 + 0.6, 4, 100, t >= tB2 + 0.6);
    trI(τ => 60 * (τ < wt('B3', 'fifty') - 0.3 ? 0 : Iof(τ) / IMX) * Math.sin(th(τ) - phi(τ)), t, wt('B3', 'fifty') - 0.3, 4, 100, on);
    M.vis(sLab[0], t, tB2 + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(sLab[1], t, wt('B3', 'fifty'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#phT'), t, wt('B6', 'lags') - 0.1, tSwap - 0.2, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.2 }); M.vis($('#phT2'), t, wt('B9', 'leads') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro'), t, tB2 + 0.3, 1e9, { dy: 12 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Capacitors') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tG + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tG - 0.32, cap2 = t >= tP2;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dAx.slice(0, 2), t, tD + 0.4, 0.4, 0.1); M.vis(dAx[2], t, tD + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dLL1'), t, tD + 0.3, tP2 - 0.2, { dy: 10, outDur: 0.25 }); M.vis($('#dLL2'), t, tP2 + 0.1, 1e9, { dy: 10 });
    // given curve: i (violet) for the coil, then v (teal) for the capacitor
    const ta = cap2 ? tP2 : wt('D2', 'v');
    PUC.attr(dA, 'stroke', cap2 ? TE : VI); M.draw(dA, t, ta - 0.2, 0.9, M.o3);
    PUC.attr(dLegA, 'fill', cap2 ? TE : VI); PUC.attr(dLegB, 'fill', cap2 ? VI : TE); dLegA.firstChild.textContent = cap2 ? 'v' : 'i'; dLegB.firstChild.textContent = cap2 ? 'i' : 'v';
    M.vis(dLegA, t, ta, 1e9, { dy: 0, fade: 0.2 }); M.vis(dLegB, t, ta + 0.9, 1e9, { dy: 0, fade: 0.2 });
    // the slope tracer: traced curve = slope of the given curve (a quarter cycle ahead)
    const t1 = cap2 ? wt('D6', 'Faster') - 0.4 : wt('D3', 'For') - 0.3, t2 = cap2 ? wt('D7', 'The') : wt('D4', 'This');
    const u = M.clamp((t - t1) / (t2 - t1)), live = t >= t1 && u < 1;
    PUC.attr(dBt, 'stroke', cap2 ? VI : TE); PUC.attr(dBt, 'd', t < t1 ? '' : pathU(q => DY - DA * Math.cos(TAU * DCY * q), u));
    const x = xAt(u), y = yS(u), sl = Math.cos(TAU * DCY * u), ang = Math.atan2(-DA * TAU * DCY * sl / DWd * 1, 1);
    PUC.attr(dTan, 'x1', (x - 60 * Math.cos(ang)).toFixed(1)); PUC.attr(dTan, 'y1', (y - 60 * Math.sin(ang)).toFixed(1)); PUC.attr(dTan, 'x2', (x + 60 * Math.cos(ang)).toFixed(1)); PUC.attr(dTan, 'y2', (y + 60 * Math.sin(ang)).toFixed(1));
    PUC.attr(dDot1, 'cx', x.toFixed(1)); PUC.attr(dDot1, 'cy', y.toFixed(1)); PUC.attr(dDot2, 'cx', x.toFixed(1)); PUC.attr(dDot2, 'cy', (DY - DA * sl).toFixed(1)); PUC.attr(dDot2, 'fill', cap2 ? VI : TE);
    [dTan, dDot1, dDot2].forEach(e => M.hide(e, !live));
    M.vis(dQ, t, cap2 ? wt('D7', 'one') : wt('D4', 'This') + 0.2, cap2 ? 1e9 : tP2 - 0.2, { dy: 0, fade: 0.2, outDur: 0.2 });
    runSteps(dRows, t, tDs);
    M.vis(dB1, t, tDs[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis(dB2, t, tDs[5] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dUnit'), t, wt('D8', 'L'), 1e9, { dy: 12 });
  }

  /* G: reactance vs frequency */
  const gOn = t >= tG - 0.05 && t < tW + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tW - 0.32;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(gAx.slice(0, 1), t, tG + 0.4, 0.5); fadeAt(gAx.slice(1), t, tG + 0.7);
    M.draw(gXL, t, wt('G2', 'straight') - 0.3, 0.9, M.o3); fadeAt(gLL, t, wt('G2', 'straight') + 0.3);
    M.draw(gXC, t, wt('G3', 'curve') - 0.3, 1.0, M.o3); fadeAt(gCL, t, wt('G3', 'curve') + 0.4);
    fadeAt(gD1, t, tGr[0], 0.4); M.vis(gD1L, t, tGr[0] + 0.5, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(gD2, t, tGr[1], 0.4); M.vis(gD2L, t, tGr[1] + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const tb = wt('G5', 'low'); [gLo, gLoD, gLoL].forEach(e => M.vis(e, t, tb - 0.1, 1e9, { dy: 0, fade: 0.25 })); [gHi, gHiD, gHiL].forEach(e => M.vis(e, t, wt('G5', 'high') - 0.1, 1e9, { dy: 0, fade: 0.25 }));
    if (t > tb - 0.2) [...gD1, ...gD2, gD1L, gD2L].forEach(e => { e.style.opacity = (1 - M.io((t - tb + 0.2) / 0.3)).toFixed(3); });
    gR.forEach((r, i) => { M.vis(r, t, tGr[i] - 0.1, 1e9, { dy: 16 }); const u = M.io((t - tGr[i]) / 0.3); r.style.background = M.mix(C.soft, '#FFFFFF', u); r.style.borderColor = M.mix(C.soft, AM, u); });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(ww, t, tW + 0.4, 0.4, 0.14); fadeAt(wSrc, t, tW + 0.6); fadeAt(wAm, t, tW + 0.8); drawSeq(wCap, t, wt('W1', 'capacitor') - 0.2, 0.25, 0.1); fadeAt(wLb, t, wt('W1', 'ten'), 0.12);
    const tc = tWs[2] + 0.4, a = M.o3((t - tc) / 1.0);
    wEl.set(36 * a * Math.sin(OMG * (t - tc)), t >= tW + 1);
    M.vis(wRd, t, tW + 1.0, 1e9, { dy: 16 }); M.setT(wRdT[1], '= ' + (0.72 * Math.max(0, a)).toFixed(2) + ' A');
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[2] + 0.7, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, T1('W3') + 0.1, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'It') - 0.1 });
    drawSeq(tcA, t, tX + 0.5, 0.3, 0.1); M.draw(tcL1, t, wt('X2', 'like') - 0.2, 0.5); M.draw(tcL2, t, wt('X3', 'falls') - 0.3, 0.6);
    fadeAt(tcT.slice(0, 2), t, wt('X2', 'like')); fadeAt(tcT.slice(2, 4), t, wt('X3', 'falls')); fadeAt(tcT.slice(4), t, tX + 0.7);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'Find') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'At', 1) - 0.4, tCount, tAns });
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
