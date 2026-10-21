// PUC Electronics Ep 16 - Impedance and resonance ("Breadboard" style, Lab Notebook world)
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
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const tMorph = wt('H1', 'turns') - 0.1;
const tI = T0('I1'), tB = T0('B1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tRd = T0('R1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const kl = (host, x, y, tex, o = {}) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${o.fs || 28}px;white-space:nowrap;${o.css || ''}`; d.innerHTML = K(tex); host.appendChild(d); return d; };
const zig = (x1, x2, y) => { const n = 6, w = (x2 - x1 - 20) / n; let d = `M${x1},${y} H${x1 + 10}`; for (let i = 0; i < n; i++) d += ` L${x1 + 10 + w * (i + 0.5)},${y + (i % 2 ? 16 : -16)}`; return d + ` L${x2 - 10},${y} H${x2}`; };
const bumps = (x1, n, r, y) => { let d = `M${x1},${y}`; for (let i = 0; i < n; i++) d += ` a${r},${r} 0 0 1 ${2 * r},0`; return d; };
const R0 = 10, LH = 0.1, CF = 1e-5, VS = 10, F0 = 1 / (TAU * Math.sqrt(LH * CF));
const XLf = f => TAU * f * LH, XCf = f => 1 / (TAU * f * CF), Zf = f => Math.hypot(R0, XLf(f) - XCf(f)), If = f => VS / Zf(f), Pf = f => Math.atan((XLf(f) - XCf(f)) / R0);
const Vt = `\\textcolor{${TE}}`, It = `\\textcolor{${VI}}{I}`;

/* ================= A: hook ================= */
const rdS = $('#rdS');
const rd = [W(rdS, 'M30,120 H290 A16,16 0 0 1 306,136 V384 A16,16 0 0 1 290,400 H30 A16,16 0 0 1 14,384 V136 A16,16 0 0 1 30,120 Z', { 'stroke-width': 5, fill: '#fff' }), W(rdS, 'M70,120 L150,40', { 'stroke-width': 4 })];
const grill = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) grill.push(mk(rdS, 'circle', { cx: 62 + c * 30, cy: 230 + r * 30, r: 8, fill: '#E3E6EC' }));
const dialStrip = mk(rdS, 'rect', { x: 40, y: 148, width: 240, height: 44, rx: 8, fill: '#F3F1EA', stroke: INK, 'stroke-width': 2.5 });
const dialTk = []; for (let i = 0; i < 11; i++) dialTk.push(mk(rdS, 'line', { x1: 56 + i * 21, y1: 176, x2: 56 + i * 21, y2: i % 5 ? 184 : 188, stroke: MU, 'stroke-width': 2 }));
const dialP = mk(rdS, 'line', { x1: 80, y1: 152, x2: 80, y2: 188, stroke: AM, 'stroke-width': 4 });
const knob = mk(rdS, 'circle', { cx: 236, cy: 290, r: 42, fill: '#fff', stroke: INK, 'stroke-width': 4 }), knobM = mk(rdS, 'line', { x1: 236, y1: 290, x2: 236, y2: 256, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hS = $('#hS'), ST = [3, 4.5, 6, 8, 10.5];
const hW = ST.map((c, i) => W(hS, wave(40, 704, 100 + i * 80, 20, c), { stroke: '#B8BCC6', 'stroke-width': 3 }));
const hBr = mk(hS, 'rect', { x: 28, y: 0, width: 728, height: 64, rx: 12, fill: 'none', stroke: AM, 'stroke-width': 3 });
const tTune = wt('H2', 'small'), tLock = wt('H2', 'one') + 0.2;

/* ================= I: series RLC ================= */
const iS = $('#iS');
const iW = [W(iS, 'M120,256 V150 H190'), W(iS, `M330,150 H410`), W(iS, 'M554,150 H624 V256'), W(iS, 'M624,344 V470 H120 V344')];
const iR = W(iS, zig(190, 330, 150)), iL = W(iS, bumps(410, 4, 18, 150)), iC = [W(iS, 'M624,256 V290'), W(iS, 'M584,290 H664', { 'stroke-width': 6 }), W(iS, 'M584,310 H664', { 'stroke-width': 6 }), W(iS, 'M624,310 V344')];
const iSrc = [mk(iS, 'circle', { cx: 120, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(iS, 'M93,300 C103,277 111,277 120,300 S137,323 147,300')];
const iLb = [tx(iS, 260, 214, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 30 }), tx(iS, 482, 214, 'L', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 30 }), tx(iS, 690, 310, 'C', { 'font-style': 'italic', 'font-size': 30 })];
const iZ = mk(iS, 'g'); { mk(iZ, 'rect', { x: 210, y: 380, width: 340, height: 60, rx: 12, fill: C.ac2 }); tx(iZ, 380, 420, 'Total opposition: Z', { 'text-anchor': 'middle', 'font-size': 26 }); }
const IT = [['RESISTOR', 'Opposes current', 'R'], ['COIL', 'Reactance', 'X_L'], ['CAPACITOR', 'Reactance', 'X_C'], ['TOTAL, IN OHMS', 'Impedance', 'Z']];
$('#iTiles').innerHTML = IT.map(([l, n, v], i) => `<div class="tile" style="top:${76 + i * 100}px"><div class="tl">${l}</div><div class="tn">${n}</div><div class="tv">${K(v)}</div></div>`).join('');
const iTl = [...$('#iTiles').children];
$('#iNoT').innerHTML = K(`Z \\neq R + X_L + X_C`);
const tIt = [wt('I1', 'resistor'), wt('I1', 'coil'), wt('I1', 'capacitor'), wt('I2', 'impedance')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M110,135 V100 H250'), W(ck, 'M370,100 H440'), W(ck, 'M584,100 H640'), W(ck, 'M656,100 H820 V250 H110 V215')];
const bR = W(ck, zig(250, 370, 100)), bL = W(ck, bumps(440, 4, 18, 100)), bC = [W(ck, 'M640,72 V128', { 'stroke-width': 6 }), W(ck, 'M656,72 V128', { 'stroke-width': 6 })];
const bSrc = [mk(ck, 'circle', { cx: 110, cy: 175, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M86,175 C95,155 102,155 110,175 S125,195 134,175')];
const bLb = [mono(ck, 310, 150, 'R = 10 Ω', { 'text-anchor': 'middle' }), mono(ck, 512, 150, 'L = 0.1 H', { 'text-anchor': 'middle' }), mono(ck, 648, 160, 'C = 10 µF', { 'text-anchor': 'middle' })];
const bSL = [mono(ck, 170, 190, 'V = 10 V', { fill: TE, 'font-weight': 600 })], bF = mono(ck, 170, 222, 'f = 50 Hz', { fill: INK, 'font-weight': 600, 'font-size': 24 });
const skipE = (x, y) => Math.hypot(x - 110, y - 175) < 42 || (x > 250 && x < 370 && y < 120) || (x > 440 && x < 584 && y < 120) || (x > 636 && x < 660 && y < 120);
const eB = flow(ck, [[110, 215], [110, 250], [820, 250], [820, 100], [110, 100], [110, 135]], 30, { r: 6, skip: skipE });
const tB1 = T0('B1');
const FK = [[wt('B3', 'Turn'), 50], [wt('B4', 'equal') + 0.2, F0], [wt('B6', 'Keep'), F0], [wt('B6', 'falls') + 0.4, 300], [wt('B8', 'Watch'), 300], [wt('B8', 'peak') + 0.3, F0]];
const fNow = t => { if (t <= FK[0][0]) return 50; for (let i = 0; i < FK.length - 1; i++) { const [a, va] = FK[i], [b, vb] = FK[i + 1]; if (t < b) return va + (vb - va) * M.io((t - a) / (b - a)); } return FK[FK.length - 1][1]; };
const th = t => OMG * (t - tB1);
// resonance graph
const rcS = $('#rcS'), RX = 90, RWd = 760, RB = 220, RH = 140, FMX = 320;
const rfx = f => RX + RWd * f / FMX, riy = i => RB - RH * i;
const rAx = [W(rcS, `M${RX},${RB - RH - 20} V${RB} H${RX + RWd + 16}`, { 'stroke-width': 2.5 })];
const rTk = [50, 100, 159, 200, 250, 300].map(f => mono(rcS, rfx(f), RB + 28, f === 159 ? 'f0 = 159' : String(f), { 'text-anchor': 'middle', 'font-size': 16, fill: f === 159 ? '#B7791F' : MU, 'font-weight': f === 159 ? 600 : 500 }));
const rYl = [mono(rcS, RX + 10, RB - RH - 4, 'I (A)', { 'font-size': 16 }), mono(rcS, RX - 10, riy(1) + 5, '1.0', { 'text-anchor': 'end', 'font-size': 16 }), mono(rcS, RX + RWd + 16, RB - 10, 'f (Hz)', { 'text-anchor': 'end', 'font-size': 16 })];
const rF0 = mk(rcS, 'line', { x1: rfx(F0), y1: RB, x2: rfx(F0), y2: riy(1), stroke: '#B7791F', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rCur = mk(rcS, 'path', { d: '', fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const rDot = mk(rcS, 'circle', { r: 10, fill: VI, stroke: '#fff', 'stroke-width': 3 });
const SC = scope($('#scS'), 592, 200);
const trV = SC.tr(CH1), trI = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · V (SUPPLY)', CH1), SC.lab(14, 190, 'CH2 · I (CURRENT)', AM)];
$('#ro').innerHTML = `<span class="k">f</span><span class="v" id="rf">50</span><span class="u">Hz</span>
  <span class="k">X<sub>L</sub></span><span class="v" id="rXL">31.4</span><span class="u">Ω</span>
  <span class="k">X<sub>C</sub></span><span class="v" id="rXC">318.3</span><span class="u">Ω</span>
  <span class="k">Z</span><span class="v" id="rZ">287.1</span><span class="u">Ω</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.035</span><span class="u">A</span>`;

/* ================= D: phasors and the impedance triangle ================= */
const dS = $('#dS'), dL = $('#dL'), OX = 130, OY = 400, VR = 240, VLh = 260, VCh = 110, NET = VLh - VCh;
const aI = PUC.arrow(dS, VI, 4, 16), aR = PUC.arrow(dS, TE, 6, 18), aL = PUC.arrow(dS, TE, 6, 18), aC = PUC.arrow(dS, TE, 6, 18), aN = PUC.arrow(dS, TE, 6, 18), aV = PUC.arrow(dS, INK, 6, 18);
const lI = kl(dL, 560, 352, `${It}`), lR = kl(dL, 210, 412, `${Vt}{V_R} = ${It}R`), lL = kl(dL, 24, 250, `${Vt}{V_L}`), lC = kl(dL, 24, 454, `${Vt}{V_C}`);
const lN = kl(dL, 392, 300, `${It}(X_L - X_C)`), lV = kl(dL, 170, 248, `${Vt}{V}`, { fs: 32 });
const tR = kl(dL, 230, 412, 'R', { fs: 34 }), tXv = kl(dL, 392, 300, 'X_L - X_C', { fs: 30 }), tZ = kl(dL, 200, 252, 'Z', { fs: 34 }), tZR = kl(dL, 420, 372, 'Z = R', { fs: 36, css: `color:${C.ok}` });
const phArc = mk(dS, 'path', { d: '', fill: 'none', stroke: '#B7791F', 'stroke-width': 3 }), phL = kl(dL, OX + 84, OY - 52, '\\varphi', { fs: 30, css: 'color:#B7791F' });
const dRows = steps($('#dSteps'), [
  [K(`${Vt}{V_R} = ${It}R, \\quad ${Vt}{V_L} = ${It}X_L`), 'V<sub>L</sub> leads by 90°', 76],
  [K(`${Vt}{V_C} = ${It}X_C`), 'lags by 90°', 138],
  [K(`\\text{net} = ${It}\\,(X_L - X_C)`), 'they subtract', 198],
  [K(`${Vt}{V}^2 = (${It}R)^2 + [${It}(X_L - X_C)]^2`), '', 258],
  [K(`Z = \\dfrac{${Vt}{V}}{${It}} = \\sqrt{R^2 + (X_L - X_C)^2}`), '', 326],
  [K(`\\tan\\varphi = \\dfrac{X_L - X_C}{R}`), '', 408],
  [K(`X_L = X_C \\;\\Rightarrow\\; f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}`), 'resonance', 492]], { fs: 27 });
const dB1 = $('#dBox1'), dB2 = $('#dBox2'); dB1.style.top = '316px'; dB1.style.height = '76px'; dB2.style.top = '480px'; dB2.style.height = '96px';
const tDs = [wt('D2', 'In'), wt('D3', 'In'), wt('D4', 'They'), wt('D5', 'This'), wt('D6', 'Z'), wt('D7', 'The'), wt('D8', 'Two')];
const tCol = wt('D8', 'set'), tTri = wt('D6', 'Z');

/* ================= W: worked example ================= */
const wS = $('#wS'), wL = $('#wL'), S5 = 5, WO = [110, 500];
const wTri = [W(wS, `M${WO[0]},${WO[1]} H${WO[0] + 30 * S5}`, { 'stroke-width': 6 }), W(wS, `M${WO[0] + 30 * S5},${WO[1]} V${WO[1] - 40 * S5}`, { 'stroke-width': 6 }), W(wS, `M${WO[0]},${WO[1]} L${WO[0] + 30 * S5},${WO[1] - 40 * S5}`, { stroke: AM, 'stroke-width': 6 })];
const wRA = W(wS, `M${WO[0] + 30 * S5 - 18},${WO[1]} V${WO[1] - 18} H${WO[0] + 30 * S5}`, { 'stroke-width': 2.5 });
const wArc = W(wS, `M${WO[0] + 60},${WO[1]} A60,60 0 0 0 ${(WO[0] + 60 * 0.6).toFixed(1)},${(WO[1] - 60 * 0.8).toFixed(1)}`, { stroke: '#B7791F', 'stroke-width': 3 });
const wXL = PUC.arrow(wS, INK, 5, 16), wXC = PUC.arrow(wS, '#5F7399', 5, 16), XB = 520;
const wDash = mk(wS, 'line', { x1: XB, y1: WO[1] - 40 * S5, x2: WO[0] + 30 * S5 + 6, y2: WO[1] - 40 * S5, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wLb = [kl(wL, 150, 512, 'R = 30\\,\\Omega', { fs: 26 }), kl(wL, 276, 368, 'X_L - X_C = 40\\,\\Omega', { fs: 24 }), kl(wL, 92, 312, `\\textcolor{#B7791F}{Z = 50\\,\\Omega}`, { fs: 28 }),
  kl(wL, XB + 20, 150, 'X_L = 80\\,\\Omega', { fs: 24 }), kl(wL, XB + 20, 230, `\\textcolor{#5F7399}{X_C = 40\\,\\Omega}`, { fs: 24 }), kl(wL, 182, 440, `\\textcolor{#B7791F}{\\varphi \\approx 53^\\circ}`, { fs: 24 })];
const wRows = steps($('#wSteps'), [
  [K(`X_L - X_C = 80 - 40 = 40\\,\\Omega`), '', 84],
  [K(`Z = \\sqrt{30^2 + 40^2} = 50\\,\\Omega`), '', 172],
  [K(`${It} = \\dfrac{${Vt}{V}}{Z} = \\dfrac{100}{50} = 2\\,\\text{A}`), '', 256],
  [K(`\\tan\\varphi = \\dfrac{40}{30} \\;\\Rightarrow\\; \\varphi \\approx 53^\\circ`), 'V leads I', 372]]);
const wBox = $('#wBox'); wBox.style.top = '158px'; wBox.style.height = '74px';
const tWs = [wt('W2', 'X'), wt('W2', 'Z'), wt('W3', 'The'), wt('W4', 'And')];

/* ================= R: radio tuning ================= */
const tS = $('#tS'), TB = 470, STX = [260, 520, 780, 1040, 1300];
const tAx = W(tS, `M100,${TB} H1500`, { 'stroke-width': 2.5 }), tAxL = mono(tS, 1500, TB + 34, 'frequency', { 'text-anchor': 'end' });
const tBars = STX.map((x, i) => { const g = mk(tS, 'g'); const r = mk(g, 'rect', { x: x - 22, y: TB, width: 44, height: 0, rx: 6, fill: '#CBD0DA' }); const l = mono(g, x, TB + 34, 'STATION ' + (i + 1), { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 }); return { g, r, l }; });
const tCurve = mk(tS, 'path', { d: '', fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linejoin': 'round' });
const tCL = mono(tS, 0, 0, 'current in the tuning circuit', { fill: VI, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'middle' });
const tRead = mk(tS, 'g'); { mk(tRead, 'rect', { x: 1150, y: 64, width: 400, height: 56, rx: 12, fill: C.soft }); }
const tReadT = mono(tRead, 1350, 100, '', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });
const bell = (x, xc) => { const r = x / xc; return 1 / Math.sqrt(1 + 14 * 14 * (r - 1 / r) ** 2); };
const tXc = t => { const a = wt('R2', 'Turning'), b = wt('R2', 'Only') - 0.2; return 260 + 520 * M.io((t - a) / (b - a)); };
const avT = PUC.avatar($('#sT'), { x: 200, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So tuning just slides the peak onto one station!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'At resonance, Z = 0 and I is infinite', right: 'At resonance, Z = R (smallest), I = V/R', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcA = W(tcS, 'M60,60 V250 H730', { 'stroke-width': 2.5 });
const tcC = W(tcS, (() => { let d = ''; for (let i = 0; i <= 160; i++) { const x = 70 + 650 * i / 160, f = 40 + 280 * i / 160; d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (250 - 150 * If(f)).toFixed(1); } return d; })(), { stroke: VI, 'stroke-width': 5 });
const xPk = 70 + 650 * (F0 - 40) / 280;
const tcM = mk(tcS, 'line', { x1: 60, y1: 100, x2: 730, y2: 100, stroke: C.ok, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const tcL = [mono(tcS, xPk + 24, 90, 'I max = V / R  (finite)', { fill: C.ok, 'font-weight': 600 }), mono(tcS, 730, 282, 'f', { 'text-anchor': 'end', 'font-style': 'italic' })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find Z, the current, the phase angle or the resonant frequency f<sub>0</sub>' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A series circuit has L = 40&nbsp;mH, C = 25&nbsp;µF and R = 20&nbsp;Ω on a 100&nbsp;V supply. At resonance, what are the frequency and the current?', qW: 800,
  opts: [K('1000\\,\\text{Hz},\\; 5\\,\\text{A}'), K('159\\,\\text{kHz},\\; 5\\,\\text{A}'), K('159\\,\\text{Hz},\\; 5\\,\\text{A}'), K('159\\,\\text{Hz},\\; \\text{infinite}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`LC = 0.04 \\times 25\\times10^{-6} = 10^{-6}`)], [K(`\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = 1000\\,\\text{rad/s}`)],
  [K(`f_0 = \\dfrac{1000}{2\\pi} \\approx 159\\,\\text{Hz}`)], [K(`${It} = \\dfrac{${Vt}{V}}{R} = \\dfrac{100}{20} = 5\\,\\text{A}`)]], { dy: 116, y0: 96 });
const tSol = [wt('A2', 'L'), wt('A3', 'So'), wt('A3', 'Divide'), wt('A4', 'At')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 504, y0: 80, dy: 114, title: 'Impedance and resonance · formula card', txt: [0, 0, 0, 1],
  lines: [K(`Z = \\sqrt{R^2 + (X_L - X_C)^2} \\qquad ${It} = \\dfrac{${Vt}{V}}{Z}`),
    K(`\\tan\\varphi = \\dfrac{X_L - X_C}{R}`),
    K(`f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}`),
    'At resonance: X<sub>L</sub> = X<sub>C</sub>, Z = R (smallest), I biggest, V and I in phase'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 17', topic: 'Transformers and their applications', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B7', 'graph'), 1.06, 940, 600], [T0('B8') - 0.2, 1, 960, 540], [tCol, 1.06, 940, 560], [tW - 0.6, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.3, tT - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!(t >= tB && t < tT)) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(rd, t, tMorph + 0.6, 0.5, 0.2); fadeAt([dialStrip, ...dialTk, dialP, knob, knobM], t, tMorph + 0.9, 0.02); fadeAt(grill, t, tMorph + 1.0, 0.02);
    const tu = M.io((t - tTune) / (tLock - tTune)), ang = -40 + 130 * tu - 30 * Math.max(0, Math.sin(Math.PI * M.clamp((t - tMorph - 1.4) / 1.2)));
    PUC.attr(knobM, 'transform', `rotate(${ang.toFixed(1)} 236 290)`); PUC.attr(dialP, 'transform', `translate(${(110 * tu).toFixed(1)},0)`);
    M.vis($('#hR'), t, wt('H1', 'air') - 0.2, out, { dx: 60, dy: 0, ...o });
    hW.forEach((w, i) => M.draw(w, t, wt('H1', 'full') - 0.2 + i * 0.12, 0.6));
    const sel = M.io((t - tLock) / 0.3), br = 100 + 2 * 80 - 32, by = M.lerp(20 + 36, br, tu);
    PUC.attr(hBr, 'y', by.toFixed(1)); M.vis(hBr, t, tTune - 0.1, 1e9, { dy: 0, fade: 0.2 });
    hW.forEach((w, i) => { const on = i === 2 ? sel : 0; PUC.attr(w, 'stroke', i === 2 ? M.mix('#B8BCC6', AM, on) : M.mix('#B8BCC6', '#E3E6EC', sel)); PUC.attr(w, 'stroke-width', i === 2 ? 3 + 2 * on : 3); });
    M.vis($('#hQ'), t, T0('H3') + 0.1, 1e9, { dy: 20 });
  }

  /* I: series RLC */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(iW, t, tI + 0.4, 0.4, 0.12); fadeAt(iSrc, t, tI + 0.5); M.draw(iR, t, tIt[0] - 0.1, 0.4); M.draw(iL, t, tIt[1] - 0.1, 0.4); drawSeq(iC, t, tIt[2] - 0.1, 0.2, 0.08);
    iLb.forEach((e, i) => M.vis(e, t, tIt[i] + 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(iZ, t, tIt[3], 1e9, { dy: 12 });
    iTl.forEach((e, i) => { M.vis(e, t, (i < 3 ? tIt[i] : tIt[3]) + 0.1, 1e9, { dy: 16 }); const u = M.io((t - tIt[Math.min(i, 3)] - 0.1) / 0.3); if (i === 3) { e.style.background = M.mix(C.soft, C.ac2, u); } });
    M.vis($('#iNo'), t, wt('I3', 'cannot') - 0.1, 1e9, { dy: 16 });
    const s = M.io((t - wt('I3', 'add')) / 0.35); $('#iNo .sk').style.width = s <= 0 ? '0' : (440 * s).toFixed(0) + 'px';
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#rc'), t, tB + 0.25, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    drawSeq(bw, t, tB + 0.4, 0.4, 0.12); M.draw(bR, t, tB + 0.7, 0.3); M.draw(bL, t, tB + 0.85, 0.3); drawSeq(bC, t, tB + 1.0, 0.2, 0.08); fadeAt(bSrc, t, tB + 0.5); fadeAt(bLb, t, tB + 1.1); fadeAt(bSL, t, wt('B1', 'ten')); M.vis(bF, t, wt('B1', 'frequency'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ckE'), t, tB + 1.2, 1e9, { dy: 0, fade: 0.2 });
    const f = fNow(t), I = If(f), ph = Pf(f), on = t >= T0('B2') - 0.2;
    eB.set(60 * I * Math.sin(th(t) - ph), t >= tB + 1.2);
    M.setT(bF, 'f = ' + f.toFixed(0) + ' Hz'); M.setT($('#rf'), f.toFixed(0)); M.setT($('#rXL'), XLf(f).toFixed(1)); M.setT($('#rXC'), XCf(f).toFixed(1)); M.setT($('#rZ'), Zf(f).toFixed(1)); M.setT($('#rI'), I.toFixed(3));
    M.vis($('#ro'), t, tB + 0.8, 1e9, { dy: 12 });
    trV(τ => 60 * Math.sin(th(τ)), t, tB + 0.9, 4, 100, t >= tB + 0.9);
    trI(τ => 70 * If(fNow(τ)) * Math.sin(th(τ) - Pf(fNow(τ))), t, tB + 0.9, 4, 100, t >= tB + 0.9);
    M.vis(sLab[0], t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 }); M.vis(sLab[1], t, tB + 1.0, 1e9, { dy: 0, fade: 0.2 });
    // graph: drawn up to the highest frequency reached so far
    drawSeq(rAx, t, tB + 0.6, 0.4); fadeAt([...rTk.filter((_, i) => i !== 2), ...rYl], t, tB + 0.8, 0.03); M.vis(rTk[2], t, wt('B4', 'one') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const fmx = t < FK[4][0] ? f : 300;
    let d = ''; if (on) for (let i = 0; i <= 140; i++) { const ff = 50 + (fmx - 50) * i / 140; d += (i ? 'L' : 'M') + rfx(ff).toFixed(1) + ',' + riy(If(ff)).toFixed(1); }
    PUC.attr(rCur, 'd', d); PUC.attr(rDot, 'cx', rfx(f).toFixed(1)); PUC.attr(rDot, 'cy', riy(I).toFixed(1)); M.hide(rDot, !on);
    M.vis(rF0, t, wt('B4', 'one'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#resT'), t, wt('B7', 'resonance') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#phT'), t, wt('B8', 'phase') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: phasors -> impedance triangle -> resonance */
  const dOn = t >= tD - 0.05 && t < tW + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dLL1'), t, tD + 0.3, tTri - 0.2, { dy: 10, outDur: 0.25 }); M.vis($('#dLL2'), t, tTri + 0.1, 1e9, { dy: 10 });
    const g = (a, d = 0.5) => M.io((t - a) / d);
    const a1 = g(tDs[0]), a2 = g(wt('D2', 'coil')), a3 = g(tDs[1]), m4 = g(tDs[2], 0.8), m5 = g(tDs[3] + 0.2, 0.7), hyp = g(wt('D5', 'Pythagoras') - 0.2, 0.6), tri = g(tTri, 0.4);
    const col = M.io((t - tCol) / 1.6), net = NET * (1 - col);
    aI.set(OX, OY, OX + 470 * a1, OY); M.hide(aI.g, a1 <= 0.01 || tri >= 1);
    aR.set(OX, OY, OX + VR * a1, OY); M.hide(aR.g, a1 <= 0.01);
    aL.set(OX, OY, OX, OY - VLh * a2); M.hide(aL.g, a2 <= 0.01 || m4 >= 1);
    const cy0 = OY + (OY - VLh - OY) * m4; aC.set(OX, cy0, OX, cy0 + VCh * a3); M.hide(aC.g, a3 <= 0.01 || m4 >= 1);
    [aL.g, aC.g].forEach(e => e.style.opacity = (1 - 0.7 * M.io((t - tDs[2] - 0.8) / 0.3)).toFixed(3));
    const nx2 = OX + VR * m5; aN.set(nx2, OY, nx2, OY - net); M.hide(aN.g, m4 < 0.95 || net < 3);
    aV.set(OX, OY, OX + (nx2 - OX) * hyp, OY - net * hyp); M.hide(aV.g, hyp <= 0.01);
    [aR.g, aN.g].forEach(e => e.style.opacity = '1');
    M.vis(lI, t, tDs[0] + 0.3, tTri, { dy: 0, fade: 0.2, outDur: 0.2 }); M.vis(lR, t, tDs[0] + 0.3, tTri, { dy: 0, fade: 0.2, outDur: 0.2 });
    M.vis(lL, t, wt('D2', 'coil') + 0.3, tDs[2] + 0.8, { dy: 0, fade: 0.2, outDur: 0.2 }); M.vis(lC, t, tDs[1] + 0.3, tDs[2] + 0.8, { dy: 0, fade: 0.2, outDur: 0.2 });
    lN.style.left = (nx2 + 18).toFixed(0) + 'px'; lN.style.top = (OY - net / 2 - 22).toFixed(0) + 'px'; M.vis(lN, t, tDs[2] + 0.9, tTri, { dy: 0, fade: 0.2, outDur: 0.2 });
    M.vis(lV, t, wt('D5', 'Pythagoras') + 0.4, tTri, { dy: 0, fade: 0.2, outDur: 0.2 });
    tXv.style.top = (OY - net / 2 - 22).toFixed(0) + 'px'; tXv.style.left = (OX + VR + 18) + 'px';
    M.vis(tR, t, tTri + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(tXv, t, tTri + 0.2, tCol + 1.2, { dy: 0, fade: 0.2, outDur: 0.3 }); M.vis(tZ, t, tTri + 0.3, tCol + 1.0, { dy: 0, fade: 0.2, outDur: 0.3 });
    M.vis(tZR, t, wt('D9', 'There'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const pa = Math.atan2(net, VR), pr = 70, pu = g(wt('D7', 'phase'), 0.5);
    PUC.attr(phArc, 'd', net < 3 ? '' : `M${OX + pr},${OY} A${pr},${pr} 0 0 0 ${(OX + pr * Math.cos(pa * pu)).toFixed(1)},${(OY - pr * Math.sin(pa * pu)).toFixed(1)}`); M.hide(phArc, pu <= 0);
    M.vis(phL, t, wt('D7', 'phi') + 0.1, tCol + 0.8, { dy: 0, fade: 0.2, outDur: 0.3 });
    runSteps(dRows, t, tDs);
    M.vis(dB1, t, tDs[4] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis(dB2, t, wt('D9', 'So'), 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tRd + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tRd - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const u1 = M.io((t - wt('W1', 'eighty')) / 0.5), u2 = M.io((t - wt('W1', 'forty')) / 0.5);
    wXL.set(XB, WO[1], XB, WO[1] - 80 * S5 * u1); M.hide(wXL.g, u1 <= 0.01); wXC.set(XB + 6, WO[1] - 80 * S5, XB + 6, WO[1] - 80 * S5 + 40 * S5 * u2); M.hide(wXC.g, u2 <= 0.01);
    M.vis(wLb[3], t, wt('W1', 'eighty') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(wLb[4], t, wt('W1', 'forty') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.draw(wTri[0], t, wt('W1', 'thirty') - 0.1, 0.4); M.vis(wLb[0], t, wt('W1', 'thirty') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(wDash, t, tWs[0] + 0.2, 0.4); M.draw(wTri[1], t, tWs[0] + 0.4, 0.4); M.vis(wRA, t, tWs[0] + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(wLb[1], t, tWs[0] + 0.7, 1e9, { dy: 0, fade: 0.2 });
    M.draw(wTri[2], t, tWs[1], 0.5); M.vis(wLb[2], t, wt('W2', 'fifty'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(wArc, t, tWs[3] + 0.2, 0.4); M.vis(wLb[5], t, wt('W4', 'fifty'), 1e9, { dy: 0, fade: 0.2 });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* R: radio tuning */
  const rOn = t >= tRd - 0.05 && t < tX + 0.02; M.hide($('#sT'), !rOn);
  if (rOn) {
    const out = tX - 0.32;
    M.vis($('#tC'), t, tRd + 0.1, out, { dy: 36, ...o });
    M.draw(tAx, t, tRd + 0.4, 0.6); M.vis(tAxL, t, tRd + 0.8, 1e9, { dy: 0, fade: 0.2 });
    const xc = tXc(t), cu = M.io((t - wt('R1', 'coil') + 0.2) / 0.5);
    let d = ''; for (let i = 0; i <= 200; i++) { const x = 110 + 1380 * i / 200; d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (TB - 300 * cu * bell(x, xc)).toFixed(1); }
    PUC.attr(tCurve, 'd', d); M.hide(tCurve, cu <= 0);
    PUC.attr(tCL, 'x', xc.toFixed(1)); PUC.attr(tCL, 'y', (TB - 300 * cu - 16).toFixed(1)); M.vis(tCL, t, wt('R1', 'coil') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    tBars.forEach((b, i) => { M.vis(b.g, t, tRd + 0.5 + i * 0.08, 1e9, { dy: 0, fade: 0.2 }); const v = cu * bell(STX[i], xc), h = 30 + 230 * v * v;
      PUC.attr(b.r, 'y', (TB - h).toFixed(1)); PUC.attr(b.r, 'height', h.toFixed(1)); PUC.attr(b.r, 'fill', M.mix('#CBD0DA', AM, v > 0.7 ? (v - 0.7) / 0.3 : 0)); });
    const k = STX.findIndex(x => Math.abs(x - xc) < 30);
    M.vis(tRead, t, wt('R2', 'Turning'), 1e9, { dy: 0, fade: 0.2 }); M.setT(tReadT, k >= 0 ? `TUNED TO STATION ${k + 1}` : 'C DECREASING · f0 RISING');
    avT(t, T1('R2') - 0.6, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'No') - 0.1, tRight: wt('X3', 'Only') - 0.1 });
    M.draw(tcA, t, tX + 0.5, 0.4); M.draw(tcC, t, tX + 0.7, 0.8); M.vis(tcL[1], t, tX + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.draw(tcM, t, wt('X3', 'Z') - 0.2, 0.5); M.vis(tcL[0], t, wt('X3', 'current'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'Find') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'At') - 0.4, tCount, tAns });
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
