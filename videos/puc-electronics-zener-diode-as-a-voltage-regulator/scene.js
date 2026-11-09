// PUC Electronics Ep 43 - Full-wave and bridge rectifiers ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, t and R ink; scope CH1 (input) #8FA3C8, CH2 (output) amber
const AM = C.ac, VI = C.violet, TE = C.teal, GO = C.gold, INK = C.ink, MU = C.mute, RED = C.red, CH1 = '#8FA3C8', CH1D = '#5F7399', OFFG = '#E7E9F0';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
// italic symbol with an upright subscript, e.g. R with L
const vsub = (p, x, y, s, sb, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: TE, 'font-style': 'italic', ...a });
  const t1 = mk(e, 'tspan', {}); t1.textContent = s; if (sb) { const t2 = mk(e, 'tspan', { 'font-size': (a['font-size'] || 26) * 0.62, dy: 6, 'font-style': 'normal' }); t2.textContent = sb; } return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const TAU = 2 * Math.PI, HW = a => Math.max(0, Math.sin(a));
const wave = (x0, w, y0, a, cyc, f = Math.sin, n = 200) => { let d = ''; for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + w * u, y = y0 - a * f(TAU * cyc * u); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const area = (x0, w, y0, a, cyc, f) => wave(x0, w, y0, a, cyc, f) + `L${x0 + w},${y0}L${x0},${y0}Z`;
// diode symbol pointing right, centred at (cx, cy): triangle (anode side) + bar (cathode)
const diode = (p, cx, cy, s = 30) => ({ tri: W(p, `M${cx - s},${cy - s} L${cx + s},${cy} L${cx - s},${cy + s} Z`, { fill: '#fff' }), bar: W(p, `M${cx + s},${cy - s} V${cy + s}`, { 'stroke-width': 5 }) });
const zig = (x, y1, y2, n = 6) => { const h = (y2 - y1) / n; let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -16 : 16)},${y1 + h * (i + 0.5)}`; return d + ` L${x},${y2}`; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 180) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
const steps = (host, rows, o = {}) => { host.innerHTML = rows.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx" style="${o.fs ? 'font-size:' + o.fs + 'px' : ''}">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runSteps = (rows, t, ts) => rows.forEach((r, i) => { M.hide(r, t < ts[i] - 0.15); M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
const lit = (el, u, on, onTxt) => { el.style.background = M.mix(C.soft, on, u * 0.18 + 0); el.style.borderColor = M.mix(C.soft, on, u); const v = el.querySelector('.v'); if (v) v.style.color = M.mix('#B8BCC6', onTxt, u); };
// colour-coded symbols
const Vm = `\\textcolor{${TE}}{V_m}`, Vdc = `\\textcolor{${TE}}{V_{dc}}`, Vo = `\\textcolor{${TE}}{v_{out}}`, Idc = `\\textcolor{${VI}}{I_{dc}}`, Im = `\\textcolor{${VI}}{I_m}`;

const zigH = (x1, x2, y, n = 6) => { const w = (x2 - x1) / n; let d = `M${x1},${y}`; for (let i = 0; i < n; i++) d += ` L${x1 + w * (i + 0.5)},${y + (i % 2 ? -16 : 16)}`; return d + ` L${x2},${y}`; };
// Zener symbol pointing from (x1,y1) [anode] to (x2,y2) [cathode], centred at the midpoint; bar bent like a Z
const zener = (p, x1, y1, x2, y2, s = 28) => { const g = mk(p, 'g', { transform: `translate(${(x1 + x2) / 2},${(y1 + y2) / 2}) rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI).toFixed(2)})` });
  return { tri: W(g, `M${-s},${-s} L${s},0 L${-s},${s} Z`, { fill: '#fff' }), bar: W(g, `M${s - 12},${-s - 10} L${s},${-s} V${s} L${s + 12},${s + 10}`, { 'stroke-width': 5 }) }; };
const VZc = '#B7791F';
const Iq = s => `\\textcolor{${VI}}{I${s ? '_{' + s + '}' : ''}}`, Vq = s => `\\textcolor{${TE}}{V_{${s}}}`;
// regulator schematic in local 928 x 600 coordinates
const buildReg = (p, o = {}) => {
  const e = {};
  e.wires = [W(p, 'M110,284 V150 H220'), W(p, zigH(220, 380, 150)), W(p, 'M380,150 H760 V236'), W(p, zig(760, 236, 364)), W(p, 'M760,364 V450 H110 V316'), W(p, 'M480,150 V264'), W(p, 'M480,336 V450')];
  e.bat = [W(p, 'M74,284 H146', { 'stroke-width': 5 }), W(p, 'M92,316 H128', { 'stroke-width': 8 })];
  e.varA = PUC.arrow(p, INK, 3, 10);
  e.z = zener(p, 480, 336, 480, 264, 30);
  e.nodes = [[480, 150], [480, 450]].map(([x, y]) => mk(p, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
  e.lab = [tx(p, 300, 112, o.r ?? 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), tx(p, 526, 296, o.z ?? 'Zener', { 'font-size': 24 }), mono(p, 526, 326, o.vz ?? 'Vz = 9 V', { fill: VZc, 'font-weight': 600, 'font-size': 20 }),
    vsub(p, 796, 296, 'R', 'L', { fill: INK, 'font-size': 28 }), mono(p, 796, 326, o.rl ?? 'load', { 'font-size': 20 }), tx(p, 60, 238, o.vin ?? 'Vin', { 'text-anchor': 'middle', fill: CH1D, 'font-size': 24 }),
    tx(p, 156, 274, '+', { 'font-size': 26, fill: CH1D }), tx(p, 156, 344, '-', { 'font-size': 30, fill: CH1D })];
  return e; };
const drawReg = (e, t, t0) => { drawSeq(e.wires, t, t0, 0.35, 0.1); drawSeq(e.bat, t, t0 + 0.2, 0.2, 0.1); M.draw(e.z.tri, t, t0 + 0.6, 0.3); M.draw(e.z.bar, t, t0 + 0.8, 0.25);
  fadeAt(e.nodes, t, t0 + 0.8, 0.05); fadeAt(e.lab, t, t0 + 0.9, 0.08); e.varA.set(70, 344, 150, 256); M.hide(e.varA.g, t < t0 + 0.4); };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'bicycle') - 0.2;
const tP = T0('P1'), tG = T0('G1'), tB = T0('B1'), tT = T0('T1'), tR = T0('R1'), tK = T0('K1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q0'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tR], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook (dynamo lamp) ================= */
const chS = $('#chS');
const dyn = t => 0.55 + 0.33 * Math.sin(0.9 * t) + 0.1 * Math.sin(2.3 * t + 1);
const wheel = [mk(chS, 'circle', { cx: 110, cy: 290, r: 90, fill: 'none', stroke: INK, 'stroke-width': 6 }), mk(chS, 'circle', { cx: 110, cy: 290, r: 10, fill: INK })];
const spokes = mk(chS, 'g'); for (let i = 0; i < 6; i++) W(spokes, `M110,290 L${110 + 84 * Math.cos(i * Math.PI / 3)},${290 + 84 * Math.sin(i * Math.PI / 3)}`, { 'stroke-width': 2.5, stroke: MU });
const dynB = [mk(chS, 'rect', { x: 186, y: 196, width: 36, height: 60, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mono(chS, 204, 276, 'DYNAMO', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 14, fill: INK })];
const lampW = W(chS, 'M204,196 V120 H240', { 'stroke-width': 3 });
const lamp = mk(chS, 'circle', { cx: 262, cy: 120, r: 24, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const lampL = mono(chS, 262, 76, 'LAMP', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 14, fill: INK });
const hS1 = scope($('#hs1'), 720, 196), hS2 = scope($('#hs2'), 720, 196);
const hT1 = hS1.tr(CH1), hT2 = hS2.tr(AM);
const hL1 = [hS1.lab(14, 26, 'CH1 · DYNAMO VOLTAGE', CH1), hS1.lab(706, 26, 'CHANGES WITH SPEED', CH1, { 'text-anchor': 'end' })];
const hL2 = [hS2.lab(14, 26, 'CH2 · WHAT A PHONE WANTS', AM), hS2.lab(706, 26, 'STEADY', AM, { 'text-anchor': 'end' })];
const tDy = wt('H2', 'Pedal') - 0.2, tPh = wt('H4', 'phone') - 0.2;

/* ================= P: overflow pipe + Zener ================= */
const pS = $('#pS'), LV = 170;
const ptank = W(pS, 'M200,90 V340 H520 V90', { 'stroke-width': 5 });
const pwater = mk(pS, 'rect', { x: 203, y: LV, width: 314, height: 337 - LV, fill: '#BFD9F2' });
const pover = W(pS, `M520,${LV - 10} H600 V330`, { 'stroke-width': 12, stroke: '#8FA3C8' });
const pspill = mk(pS, 'rect', { x: 594, y: 330, width: 12, height: 0, rx: 4, fill: '#3F7CC0' });
const ppour = mk(pS, 'rect', { x: 300, y: 64, width: 12, height: LV - 64, rx: 4, fill: '#3F7CC0' });
const plev = [mk(pS, 'line', { x1: 140, y1: LV, x2: 200, y2: LV, stroke: VZc, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), mono(pS, 130, LV + 6, 'LEVEL', { 'text-anchor': 'end', fill: VZc, 'font-weight': 600, 'font-size': 18 })];
const pLab = [mono(pS, 326, 84, 'POUR IN', { fill: CH1D, 'font-weight': 600, 'font-size': 16 }), mono(pS, 612, 150, 'OVERFLOW', { fill: CH1D, 'font-weight': 600, 'font-size': 16 })];
const ph = [$('#ph0'), $('#ph1')];
ph[0].querySelector('.v').innerHTML = `more spills<span style="color:${MU};font-weight:500">·</span>level same`;
ph[1].querySelector('.v').innerHTML = `less spills<span style="color:${MU};font-weight:500">·</span>level same`;
const tMore = wt('P2', 'Pour'), tLess = wt('P3', 'Pour');
const pour = t => t < tMore ? 0.5 : (t < tLess ? 0.5 + 0.5 * M.io((t - tMore) / 0.6) : 1 - 0.75 * M.io((t - tLess) / 0.6));
const pRS = $('#pRS');
const zLead = [W(pRS, 'M120,140 H332'), W(pRS, 'M452,140 H664')];
const zS = zener(pRS, 334, 140, 450, 140, 58); zS.tri.setAttribute('stroke-width', 5);
const zLab = [mono(pRS, 226, 118, 'ANODE', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18, 'letter-spacing': '.08em' }), mono(pRS, 558, 118, 'CATHODE', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18, 'letter-spacing': '.08em' })];
const zBend = mono(pRS, 392, 236, 'bent bar, like a Z', { 'text-anchor': 'middle', fill: VZc, 'font-weight': 600, 'font-size': 20 });
const pb = [$('#pb0'), $('#pb1')];
pb[0].querySelector('.v').textContent = 'backwards, on purpose'; pb[1].querySelector('.v').textContent = 'built for breakdown';

/* ================= G: characteristic ================= */
const gS = $('#gS'), OX = 470, OY = 230, GXs = 36, GYs = 1.0;   // origin; 36 px per volt
const gAx = [W(gS, 'M60,230 H740', { 'stroke-width': 2.5 }), W(gS, 'M470,70 V560', { 'stroke-width': 2.5 })];
const gAxL = [tx(gS, 736, 216, 'V', { 'text-anchor': 'end', 'font-style': 'italic', fill: TE }), tx(gS, 486, 86, 'I', { 'font-style': 'italic', fill: VI }), mono(gS, 700, 260, 'forward', { 'text-anchor': 'end', 'font-size': 16 }), mono(gS, 70, 214, 'reverse', { 'font-size': 16 })];
// V in volts (negative = reverse). Forward knee ~0.7 V, reverse breakdown at -9 V
const ivc = V => V >= 0 ? (V < 0.6 ? 2 * V : 2 * 0.6 + Math.pow((V - 0.6) / 0.25, 2) * 60) : (V > -9 ? 0.6 * V / 9 : -0.6 - Math.pow((-9 - V) / 0.12, 2) * 18);
const gX = V => OX + GXs * V, gY = I => OY - I * GYs;
const gPathF = (() => { let d = ''; for (let i = 0; i <= 80; i++) { const V = 0.95 * i / 80, I = Math.min(150, ivc(V)); d += (i ? 'L' : 'M') + gX(V).toFixed(1) + ',' + gY(I).toFixed(1); } return d; })();
const gPathR = (() => { let d = ''; for (let i = 0; i <= 200; i++) { const V = -9.5 * i / 200, I = Math.max(-320, ivc(V)); d += (i ? 'L' : 'M') + gX(V).toFixed(1) + ',' + gY(I).toFixed(1); } return d; })();
const gF = W(gS, gPathF, { stroke: AM, 'stroke-width': 5 }), gR = W(gS, gPathR, { stroke: AM, 'stroke-width': 5 });
const gVz = [mk(gS, 'line', { x1: gX(-9), y1: 240, x2: gX(-9), y2: 560, stroke: VZc, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), tx(gS, gX(-9) - 10, 268, 'Vz', { 'text-anchor': 'end', fill: VZc, 'font-style': 'italic', 'font-size': 26 })];
const gK = mono(gS, gX(0.7) + 12, 140, 'acts like a normal diode', { fill: MU, 'font-size': 16 });
const gBig = mono(gS, gX(-9) + 18, 470, 'current shoots up', { fill: VI, 'font-weight': 600, 'font-size': 18 }), gBig2 = mono(gS, gX(-9) + 18, 494, 'voltage stuck at Vz', { fill: VZc, 'font-weight': 600, 'font-size': 18 });
const gDot = mk(gS, 'circle', { cx: OX, cy: OY, r: 11, fill: AM, stroke: INK, 'stroke-width': 3 });
$('#roG').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="gRV" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="gRI" style="color:${VI}">0.0</span><span class="u">mA</span>`;
const GT = [['FORWARD', 'like a normal diode'], ['REVERSE, BELOW Vz', 'almost no current'], ['AT Vz · BREAKDOWN', 'current big, voltage stuck']];
$('#gTiles').innerHTML = GT.map(([k, v], i) => `<div class="ph" style="top:${220 + i * 100}px"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('');
const gT = [...$('#gTiles').children];
const tG2 = wt('G2', 'Backwards'), tG3 = wt('G3', 'Zener'), tG4 = wt('G4', 'Past');
const gV = t => t < tG + 0.6 ? 0 : t < tG2 ? 0.85 * M.io((t - tG - 0.6) / 1.6) : t < tG3 ? 0.85 - (0.85 + 8.6) * M.io((t - tG2) / 3) : t < tG4 ? -8.6 - 0.4 * M.io((t - tG3) / 1.2) : -9 - 0.4 * M.io((t - tG4) / 2.2);

/* ================= B: breadboard ================= */
const bS = $('#bS'), bE = buildReg(bS, { rl: '1 kΩ', r: 'R = 200 Ω' });
const bIL = [mono(bS, 300, 196, '', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 20 }), mono(bS, 380, 400, '', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 20 }), mono(bS, 860, 400, '', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 20 })];
const tRise = wt('B4', 'rise') - 0.2, tFall = wt('B6', 'fall') - 0.2, tWob = T0('B7');
const vin = t => t < tRise ? 15 : t < tFall ? 15 + 3 * M.io((t - tRise) / 1.6) : t < tWob ? 18 - 6 * M.io((t - tFall) / 2) : 15 - 3 * Math.cos(1.6 * (t - tWob));
const cur = t => { const V = vin(t), I = (V - 9) / 200 * 1000, IL = 9, IZ = Math.max(0, I - IL); return { V, I, IL, IZ }; };
const DTb = 1 / 30, tb0 = tB, nb = Math.ceil((tT + 1 - tb0) / DTb) + 2, cI = new Float32Array(nb), cZ = new Float32Array(nb), cL = new Float32Array(nb);
for (let i = 1; i < nb; i++) { const c = cur(tb0 + i * DTb); cI[i] = cI[i - 1] + c.I * DTb; cZ[i] = cZ[i - 1] + c.IZ * DTb; cL[i] = cL[i - 1] + c.IL * DTb; }
const ib = t => Math.max(0, Math.min(nb - 1, Math.round((t - tb0) / DTb)));
const bskip = (x, y) => (x > 210 && x < 390 && Math.abs(y - 150) < 22) || (x > 736 && x < 784 && y > 232 && y < 368) || (Math.abs(x - 480) < 34 && y > 262 && y < 338);
const fC1 = flow(bS, [[110, 330], [110, 450], [480, 450]], 12, { skip: bskip }), fC2 = flow(bS, [[480, 150], [110, 150], [110, 270]], 12, { skip: bskip });
const fZ = flow(bS, [[480, 450], [480, 150]], 7, { skip: bskip }), fL = flow(bS, [[480, 450], [760, 450], [760, 150], [480, 150]], 18, { skip: bskip });
const SB = scope($('#scBS'), 592, 200), yV = V => 190 - 8.4 * V;
mk($('#scBS'), 'line', { x1: 0, y1: yV(9), x2: 592, y2: yV(9), stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const sIn = SB.tr(CH1), sOut = SB.tr(AM);
const sLab = [SB.lab(14, 20, 'CH1 · V IN · CHANGING', CH1), SB.lab(14, 190, 'CH2 · V LOAD · STEADY 9 V', AM)];
$('#roB').innerHTML = `<span class="k" style="color:${CH1D}">V<sub>in</sub></span><span class="v" id="bRV" style="color:${CH1D}">15.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>z</sub></span><span class="v" id="bRZ" style="color:${VI}">21.0</span><span class="u">mA</span>
  <span class="k" style="color:${VZc}">V<sub>L</sub></span><span class="v" id="bRL" style="color:${VZc}">9.0</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 770, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'The Zener is the overflow pipe for current!' });

/* ================= R: derivation ================= */
const rS = $('#rS'), rG = mk(rS, 'g', { transform: 'translate(20,100) scale(0.8)' }), rE = buildReg(rG, { vz: 'Vz' });
const rIa = PUC.arrow(rG, VI, 5, 14), rIaL = tx(rG, 300, 206, 'I', { 'text-anchor': 'middle', fill: VI, 'font-style': 'italic', 'font-size': 30 });
const rZa = PUC.arrow(rG, VI, 5, 14), rZaL = vsub(rG, 410, 236, 'I', 'z', { fill: VI, 'font-size': 30 });
const rLa = PUC.arrow(rG, VI, 5, 14), rLaL = vsub(rG, 830, 236, 'I', 'L', { fill: VI, 'font-size': 30 });
const rVR = mono(rG, 300, 76, 'Vin - Vz', { 'text-anchor': 'middle', fill: TE, 'font-weight': 700, 'font-size': 26 });
const rVZ = [mk(rG, 'line', { x1: 640, y1: 160, x2: 640, y2: 440, stroke: VZc, 'stroke-width': 3 }), mono(rG, 652, 520, 'load sees Vz', { fill: VZc, 'font-weight': 600, 'font-size': 22 })];
const rRows = steps($('#rSteps'), [
  [K(`V_R = ${Vq('in')} - ${Vq('z')}`), 'leftover voltage', 80],
  [K(`${Iq('')} = \\dfrac{${Vq('in')} - ${Vq('z')}}{R}`), '', 170],
  [K(`${Iq('L')} = \\dfrac{${Vq('z')}}{R_L}`), '', 270],
  [K(`${Iq('z')} = ${Iq('')} - ${Iq('L')}`), 'the rest', 384],
  [K(`P_z = ${Vq('z')}\\,${Iq('z')} \\le P_{max}`), 'safe rating', 478]]);
const rBox = $('#rBox'); rBox.style.top = '366px'; rBox.style.height = '84px';
const tRs = [wt('R2', 'resistor'), wt('R3', 'So'), wt('R4', 'load'), wt('R5', 'Zener'), wt('R6', 'Zener')];

/* ================= K: rules ================= */
const kS = $('#kS'), PX0 = 90, PY0 = 270, PXs = 26, PYs = 16;   // transfer plot: Vin 0..24 V, VL 0..12 V
const kAx = [W(kS, `M${PX0},${PY0} H${PX0 + 24 * PXs + 10}`, { 'stroke-width': 2.5 }), W(kS, `M${PX0},${PY0 + 6} V${PY0 - 12 * PYs - 10}`, { 'stroke-width': 2.5 })];
const kAxL = [mono(kS, PX0 + 24 * PXs, PY0 + 30, 'Vin (V)', { 'text-anchor': 'end', fill: CH1D, 'font-weight': 600, 'font-size': 16 }), mono(kS, PX0 + 10, PY0 - 12 * PYs - 4, 'VL (V)', { fill: VZc, 'font-weight': 600, 'font-size': 16 })];
const vlOf = V => Math.min(9, V * 1000 / 1200);
const kCurve = W(kS, (() => { let d = ''; for (let i = 0; i <= 96; i++) { const V = 24 * i / 96; d += (i ? 'L' : 'M') + (PX0 + V * PXs).toFixed(1) + ',' + (PY0 - vlOf(V) * PYs).toFixed(1); } return d; })(), { stroke: VZc, 'stroke-width': 5 });
const kKnee = [mk(kS, 'line', { x1: PX0 + 10.8 * PXs, y1: PY0 - 9 * PYs, x2: PX0 + 10.8 * PXs, y2: PY0, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '5 5' }), mono(kS, PX0 + 10.8 * PXs, PY0 + 22, '10.8', { 'text-anchor': 'middle', fill: MU, 'font-size': 15 }),
  mono(kS, PX0 + 4 * PXs, PY0 - 7.6 * PYs, 'ZENER OFF', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 16 }), mono(kS, PX0 + 18 * PXs, PY0 - 9 * PYs - 14, 'REGULATING · 9 V', { 'text-anchor': 'middle', fill: VZc, 'font-weight': 600, 'font-size': 16 })];
const kDot = mk(kS, 'circle', { cx: PX0, cy: PY0, r: 10, fill: AM, stroke: INK, 'stroke-width': 3 });
const GX0 = 60, GW = 660, GY = 470, GMAX = 70, gx = I => GX0 + GW * I / GMAX;
const kZone = [mk(kS, 'rect', { x: gx(0), y: GY, width: gx(2) - gx(0), height: 40, fill: '#F6D6D6' }), mk(kS, 'rect', { x: gx(2), y: GY, width: gx(55.6) - gx(2), height: 40, fill: '#D8EEDD' }), mk(kS, 'rect', { x: gx(55.6), y: GY, width: gx(70) - gx(55.6), height: 40, fill: '#F6D6D6' })];
const kZL = [mono(kS, gx(28), GY + 66, 'HOLDS STEADY', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 16 }), mono(kS, gx(1), GY + 66, 'too little', { fill: RED, 'font-weight': 600, 'font-size': 15 }), mono(kS, gx(70), GY + 66, 'overheats', { 'text-anchor': 'end', fill: RED, 'font-weight': 600, 'font-size': 15 }),
  mono(kS, GX0, GY - 16, 'ZENER CURRENT WINDOW', { fill: MU, 'font-weight': 600, 'font-size': 16, 'letter-spacing': '.06em' })];
const kPtr = W(kS, '', { stroke: INK, 'stroke-width': 4, fill: INK });
const kVal = mono(kS, GX0 + GW, GY - 16, '', { 'text-anchor': 'end', fill: VI, 'font-weight': 700, 'font-size': 20 });
const KT = [['1 · INPUT ABOVE Vz', K(`V_{in} > V_z`), 'or the Zener switches off'], ['2 · CURRENT WINDOW', K(`I_{z,min} < I_z < I_{z,max}`), ''], ['3 · POWER RATING', K(`P_z = V_z I_z \\le P_{max}`), 'too much heat damages it']];
$('#kTiles').innerHTML = KT.map(([k, f, w], i) => `<div class="kt" style="top:${76 + i * 170}px"><div class="k">${k}</div><div class="f">${f}</div><div class="w">${w}</div></div>`).join('');
const kT = [...$('#kTiles').children];
const tKt = [wt('K2', 'One'), wt('K3', 'Two'), wt('K4', 'much')];
const tSw = T0('K2'), tHot = wt('K4', 'much') - 0.2;
const kVin = t => t < tSw ? 4 : t < tHot ? 4 + 14 * M.io((t - tSw) / 5) : 18 + 4.5 * M.io((t - tHot) / 1.2);

/* ================= W: worked example ================= */
const wS = $('#wS'), wG = mk(wS, 'g', { transform: 'translate(96,48) scale(0.62)' }), wE = buildReg(wG, { r: '200 Ω', rl: '1 kΩ', vin: '', vz: 'Vz = 9 V' });
const wVin = mono(wG, 60, 238, '15 V', { 'text-anchor': 'middle', fill: CH1D, 'font-weight': 700, 'font-size': 26 });
const tW8 = wt('W8', 'eighteen') - 0.2;
const WT = [['I', VI, 30, 45, 'mA'], ['IL', VI, 9, 9, 'mA'], ['IZ', VI, 21, 36, 'mA'], ['V LOAD', VZc, 9, 9, 'V']];
$('#wTiles').innerHTML = WT.map(([k, c], i) => `<div class="wt" style="left:${32 + (i % 2) * 372}px;top:${366 + Math.floor(i / 2) * 112}px"><div class="k">${k}</div><div class="v" style="color:${c}"><span>0</span><small>${WT[i][4]}</small></div></div>`).join('');
const wT = [...$('#wTiles').children];
const wRows = steps($('#wSteps'), [
  [K(`${Iq('')} = \\dfrac{15 - 9}{200} = 30\\,\\text{mA}`), '', 80],
  [K(`${Iq('L')} = \\dfrac{9}{1000} = 9\\,\\text{mA}`), '', 184],
  [K(`${Iq('z')} = 30 - 9 = 21\\,\\text{mA}`), '', 290],
  [K(`P_z = 9 \\times 0.021 \\approx 0.19\\,\\text{W}`), '', 380],
  [K(`V_{in} = 18\\,\\text{V}:\\ ${Iq('z')} = 36\\,\\text{mA},\\ V_L = 9\\,\\text{V}`), '', 470]], { fs: 29 });
const wBox = $('#wBox'); wBox.style.top = '274px'; wBox.style.height = '76px';
const tWs = [wt('W3', 'I'), wt('W4', 'I'), wt('W5', 'So'), wt('W6', 'Zener'), tW8];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'The Zener is always at Vz', right: 'Remove it first: is VL above Vz?', y0: 96, y1: 184 });
$('#tcK').innerHTML = `<div class="sx" id="tc1" style="position:absolute;left:32px;top:74px;font-size:30px;white-space:nowrap">${K(`V_{in} = 7\\,\\text{V},\\ R = 100\\,\\Omega,\\ R_L = 200\\,\\Omega,\\ V_z = 6\\,\\text{V}`)}</div>
  <div class="sx" id="tc2" style="position:absolute;left:32px;top:134px;font-size:32px;white-space:nowrap">${K(`V_L = 7 \\times \\dfrac{200}{300} \\approx 4.7\\,\\text{V} < 6\\,\\text{V}`)}</div>
  <div id="tc3" style="position:absolute;left:32px;top:226px;height:48px;padding:0 18px;border-radius:10px;background:#FBE3E3;color:${RED};display:flex;align-items:center;font:700 22px Poppins;white-space:nowrap">Zener stays OFF · load gets 4.7 V</div>`;
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find the Zener current, the series resistor or the Zener power' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `A 6&nbsp;V Zener diode regulates a 300&nbsp;Ω load. It is fed from a 10&nbsp;V supply through a 100&nbsp;Ω series resistor. The current through the Zener is`,
  opts: [K('40\\,\\text{mA}'), K('20\\,\\text{mA}'), K('13.3\\,\\text{mA}'), K('33.3\\,\\text{mA}')], right: 1, optW: 474, optY: 344 });
const sol = PUC.solution($('#so'), [[K(`\\text{no Zener: } 10 \\times 300/400 = 7.5\\,\\text{V}`)], [K(`${Iq('')} = \\dfrac{10 - 6}{100} = 40\\,\\text{mA}`)],
  [K(`${Iq('L')} = \\dfrac{6}{300} = 20\\,\\text{mA}`)], [K(`${Iq('z')} = 40 - 20 = 20\\,\\text{mA}`)]], { dy: 116, y0: 100 });
const tSol = [T0('A2'), T0('A4'), T0('A5'), T0('A6')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 360, y: 236, w: 1200, h: 504, y0: 90, dy: 112, title: 'Zener regulator · formula card', txt: [0, 0, 1, 1],
  lines: [K(`${Iq('')} = \\dfrac{${Vq('in')} - ${Vq('z')}}{R} \\qquad ${Iq('L')} = \\dfrac{${Vq('z')}}{R_L}`),
    K(`${Iq('z')} = ${Iq('')} - ${Iq('L')} \\qquad P_z = ${Vq('z')}\\,${Iq('z')} \\le P_{max}`),
    'Check first: without the Zener, VL must be above Vz',
    'Zener: reverse biased, heavily doped, holds Vz in breakdown'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 46', topic: 'LED, photodiode and solar cell', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [T0('B4'), 1.08, 960, 540], [T0('B7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const arrowY = (a, x, y1, y2, u) => { a.set(x, y1, x, y1 + (y2 - y1) * u); M.hide(a.g, u < 0.03); };

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gB = t >= tB + 0.4 && t < tT, gK2 = t >= tK && t < tW, gW = t >= tW && t < tX;
  M.hide(ghost, !(gB || gK2 || gW)); if (gB || gK2 || gW) ghost.style.opacity = 1;
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    fadeAt([...wheel, spokes, ...dynB, lampW, lamp, lampL], t, tMorph + 0.5, 0.06);
    const d = t >= tDy ? dyn(t) : 0.5; PUC.attr(spokes, 'transform', `rotate(${((t * 60 * (0.4 + d)) % 360).toFixed(1)} 110 290)`);
    PUC.attr(lamp, 'fill', M.mix('#FFFFFF', '#F5C542', t >= tDy ? Math.min(1, d) : 0));
    M.vis($('#aPill'), t, wt('H3', 'changing') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hS'), t, tDy - 0.3, out, { dx: 60, dy: 0, ...o });
    hT1(τ => 70 * dyn(τ) + 10, t, tDy, 8, 170, t >= tDy); fadeAt(hL1, t, tDy, 0.3);
    hT2(() => 60, t, tPh, 8, 170, t >= tPh); fadeAt(hL2, t, tPh, 0.3);
    M.vis($('#hQ'), t, wt('H4', 'How') - 0.1, 1e9, { dy: 20 });
  }

  /* P: overflow + Zener */
  const pOn = t >= tP - 0.05 && t < tG + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tG - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P4', 'electronics') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(ptank, t, tP + 0.4, 0.5); M.vis(pwater, t, tP + 0.7, 1e9, { dy: 0, fade: 0.3 }); M.draw(pover, t, wt('P1', 'overflow') - 0.2, 0.4); fadeAt([...plev, ...pLab], t, wt('P1', 'top'), 0.1);
    const pr = pour(t); PUC.attr(ppour, 'width', (4 + 14 * pr).toFixed(1)); PUC.attr(ppour, 'x', (306 - (4 + 14 * pr) / 2).toFixed(1)); M.vis(ppour, t, tP + 1, 1e9, { dy: 0, fade: 0.2 });
    const spl = Math.max(0, pr - 0.2); PUC.attr(pspill, 'height', (spl > 0 ? 50 : 0).toString()); PUC.attr(pspill, 'width', (3 + 16 * spl).toFixed(1)); PUC.attr(pspill, 'x', (600 - (3 + 16 * spl) / 2).toFixed(1)); M.hide(pspill, t < tP + 1.2);
    ph.forEach((e, i) => { const ti = i ? tLess : tMore; M.vis(e, t, ti - 0.2, 1e9, { dy: 16 }); lit(e, M.io((t - ti) / 0.3), VZc, VZc); });
    const tz = wt('P4', 'Zener') - 0.2; drawSeq(zLead, t, tz, 0.35, 0.1); M.draw(zS.tri, t, tz + 0.2, 0.5); M.draw(zS.bar, t, wt('P5', 'bent') - 0.2, 0.4); fadeAt(zLab, t, tz + 0.5, 0.15);
    M.vis(zBend, t, wt('P5', 'bent'), 1e9, { dy: 0, fade: 0.2 });
    pb.forEach((e, i) => { const ti = i ? wt('P8', 'heavily') : wt('P6', 'backwards'); M.vis(e, t, ti - 0.2, 1e9, { dy: 16 }); lit(e, M.io((t - ti) / 0.3), VZc, VZc); });
    M.vis($('#pStrip'), t, wt('P8', 'built') - 0.2, 1e9, { dy: 24 });
  }

  /* G: characteristic */
  const gOn = t >= tG - 0.05 && t < tB + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tB - 0.32;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(gAx, t, tG + 0.3, 0.4, 0.1); fadeAt(gAxL, t, tG + 0.5, 0.08);
    M.draw(gF, t, wt('G1', 'Forward') - 0.2, 0.8, M.clamp); M.vis(gK, t, wt('G1', 'normal'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(gR, t, tG2 - 0.1, 3.4, M.clamp); fadeAt(gVz, t, tG3, 0.2); fadeAt([gBig], t, tG4 + 0.4); fadeAt([gBig2], t, wt('G5', 'voltage'));
    const V = gV(t), I = ivc(V); PUC.attr(gDot, 'cx', gX(V).toFixed(1)); PUC.attr(gDot, 'cy', gY(Math.max(-320, Math.min(150, I))).toFixed(1)); M.vis(gDot, t, tG + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#gRV'), V.toFixed(1)); M.setT($('#gRI'), (I / 10).toFixed(1));
    gT.forEach((e, i) => { const ti = [wt('G1', 'Forward'), tG2, tG3][i]; M.vis(e, t, ti - 0.2, 1e9, { dy: 16 }); const cur = i === 2 ? t >= tG3 : (i === 1 ? t >= tG2 && t < tG3 : t < tG2);
      lit(e, cur ? 1 : 0.35 * M.io((t - ti) / 0.3), i === 2 ? VZc : INK, i === 2 ? VZc : INK); });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ckB'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#scB'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rbB'), t, tB + 0.45, 1e9, { dy: 36 });
    drawReg(bE, t, T0('B2') - 0.1);
    const live = t >= wt('B3', 'load') - 0.2, c = cur(t), k = ib(t);
    M.vis($('#ckBE'), t, wt('B3', 'load') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(bE.z.tri, 'fill', live ? M.mix('#FFFFFF', AM, Math.min(1, c.IZ / 30)) : '#FFFFFF');
    fC1.set(6 * cI[k], live); fC2.set(6 * cI[k], live); fZ.set(6 * cZ[k], live); fL.set(6 * cL[k], live);
    M.setT(bIL[0], live ? `I = ${c.I.toFixed(0)} mA` : ''); M.setT(bIL[1], live ? `Iz = ${c.IZ.toFixed(0)} mA` : ''); M.setT(bIL[2], live ? `IL = ${c.IL.toFixed(0)} mA` : '');
    sIn(τ => 190 - yV(vin(τ)), t, tB + 0.5, 10, 190, t >= tB + 0.5); sOut(() => 190 - yV(9), t, wt('B3', 'load') - 0.2, 10, 190, live); fadeAt(sLab, t, tB + 0.6, 0.4);
    M.setT($('#bRV'), c.V.toFixed(1)); M.setT($('#bRZ'), live ? c.IZ.toFixed(1) : '-'); M.setT($('#bRL'), live ? '9.0' : '-');
    M.vis($('#roB'), t, tB + 0.6, 1e9, { dy: 12 });
    avB(t, wt('B5', 'overflow') - 0.3, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tR; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tR - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Extra') - 0.05, { out: tR - 0.35, outDur: 0.25 }); }

  /* R: derivation */
  const rOn = t >= tR - 0.05 && t < tK + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tK - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    drawReg(rE, t, tR + 0.3);
    M.vis(rVR, t, tRs[0] + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(rVZ[0], t, tRs[0] + 0.6, 0.4); M.vis(rVZ[1], t, tRs[0] + 0.8, 1e9, { dy: 0, fade: 0.2 });
    const ua = M.io((t - tRs[1]) / 0.5); rIa.set(220, 180, 220 + 160 * ua, 180); M.hide(rIa.g, ua < 0.03); M.vis(rIaL, t, tRs[1] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    arrowY(rLa, 812, 180, 300, M.io((t - tRs[2]) / 0.5)); M.vis(rLaL, t, tRs[2] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    arrowY(rZa, 440, 180, 250, M.io((t - tRs[3]) / 0.5)); M.vis(rZaL, t, tRs[3] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    runSteps(rRows, t, tRs);
    M.vis(rBox, t, tRs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* K: rules */
  const kOn = t >= tK - 0.05 && t < tW + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tW - 0.32;
    M.vis($('#kL2'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(kAx, t, tK + 0.3, 0.4, 0.1); fadeAt(kAxL, t, tK + 0.5, 0.1); M.draw(kCurve, t, tK + 0.6, 1.2, M.clamp); fadeAt(kKnee, t, wt('K2', 'above'), 0.2);
    const V = kVin(t), VL = vlOf(V); PUC.attr(kDot, 'cx', (PX0 + Math.min(24, V) * PXs).toFixed(1)); PUC.attr(kDot, 'cy', (PY0 - VL * PYs).toFixed(1)); M.vis(kDot, t, tSw, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([...kZone, ...kZL], t, wt('K3', 'Two'), 0.08);
    const iz = Math.max(0, (V - 9) / 200 * 1000 - 9) * (V > 10.8 ? 1 : 0), px = gx(Math.min(69, iz));
    PUC.attr(kPtr, 'd', `M${px.toFixed(1)},${GY - 2} l-10,-16 h20 Z`); M.vis(kPtr, t, wt('K3', 'Two'), 1e9, { dy: 0, fade: 0.2 });
    M.setT(kVal, `Iz = ${iz.toFixed(0)} mA`); PUC.attr(kVal, 'fill', iz > 55.6 || iz < 2 ? RED : VI); M.vis(kVal, t, wt('K3', 'Two'), 1e9, { dy: 0, fade: 0.2 });
    kT.forEach((e, i) => { M.vis(e, t, tK + 0.5 + i * 0.12, 1e9, { dy: 16 });
      const u = M.io((t - tKt[i]) / 0.3); e.style.background = M.mix(C.soft, '#FFFFFF', u); e.style.borderColor = M.mix(C.soft, AM, u);
      [e.querySelector('.f'), e.querySelector('.w')].forEach(x => x && (x.style.opacity = (0.15 + 0.85 * u).toFixed(3))); });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawReg(wE, t, tW + 0.3); M.vis(wVin, t, wt('W1', 'fifteen'), 1e9, { dy: 0, fade: 0.2 });
    const up = M.io((t - tW8) / 0.8); M.setT(wVin, up > 0.5 ? '18 V' : '15 V');
    wT.forEach((e, i) => { const ti = i === 3 ? tWs[2] + 0.4 : tWs[i]; M.vis(e, t, ti - 0.1, 1e9, { dy: 16 });
      const [, , a, b, , d] = WT[i]; const v = a * M.o3((t - ti) / 0.9) + (b - a) * up; M.setT(e.querySelector('.v span'), v.toFixed(0)); });
    PUC.attr(wE.z.tri, 'fill', M.mix('#FFFFFF', AM, t > tWs[2] ? 0.5 + 0.5 * up : 0));
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'First') - 0.1, tRight: wt('X3', 'Remove') - 0.1 });
    M.vis($('#tc1'), t, wt('X3', 'Remove'), 1e9, { dy: 10 }); M.vis($('#tc2'), t, wt('X3', 'load') - 0.1, 1e9, { dy: 10 }); M.vis($('#tc3'), t, wt('X4', 'Only'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X6', 'JEE'), wt('X5', 'PUC')], tType: T0('X7') - 0.1 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.4, tCount, tAns });
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
