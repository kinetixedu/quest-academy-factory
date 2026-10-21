// PUC Electronics Ep 17 - Transformers and their applications ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'cycles') - 0.1;
const tI = T0('I1'), tB = T0('B1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tL = T0('L1'), tP = T0('P1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const FX = '#5F7399';   // magnetic flux (dashed loop in the core)
const kl = (host, x, y, tex, o = {}) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${o.fs || 28}px;white-space:nowrap;${o.css || ''}`; d.innerHTML = K(tex); host.appendChild(d); return d; };
const Vt = s => `\\textcolor{${TE}}{${s}}`, It = s => `\\textcolor{${VI}}{${s}}`;
// a winding: n turns drawn across a core limb (x1..x2) between y1 and y2
const wind = (p, x1, x2, y1, y2, n, a = {}) => { let d = ''; const h = (y2 - y1) / Math.max(1, n); for (let i = 0; i < n; i++) { const y = y1 + h * (i + 0.5); d += `M${x1},${y - h * 0.25} L${x2},${y + h * 0.25} `; } return W(p, d, { 'stroke-width': 4, stroke: '#B7791F', ...a }); };
const coreFrame = (p, x1, y1, x2, y2, th) => { const g = mk(p, 'g');
  mk(g, 'path', { d: `M${x1},${y1} H${x2} V${y2} H${x1} Z M${x1 + th},${y1 + th} V${y2 - th} H${x2 - th} V${y1 + th} Z`, fill: '#E3E6EC', 'fill-rule': 'evenodd', stroke: INK, 'stroke-width': 3 });
  for (let y = y1 + 10; y < y2; y += 10) { if (y > y1 + th && y < y2 - th) { mk(g, 'line', { x1: x1 + 4, y1: y, x2: x1 + th - 4, y2: y, stroke: '#C9CDD6', 'stroke-width': 1.5 }); mk(g, 'line', { x1: x2 - th + 4, y1: y, x2: x2 - 4, y2: y, stroke: '#C9CDD6', 'stroke-width': 1.5 }); } else mk(g, 'line', { x1: x1 + 4, y1: y, x2: x2 - 4, y2: y, stroke: '#C9CDD6', 'stroke-width': 1.5 }); }
  return g; };

/* ================= A: hook ================= */
const plS = $('#plS');
const pole = [W(plS, 'M250,0 V500', { 'stroke-width': 12, stroke: '#8B93A6' }), W(plS, 'M140,40 H330', { 'stroke-width': 8, stroke: '#8B93A6' })];
const pW = [W(plS, 'M160,40 L120,0', { 'stroke-width': 3 }), W(plS, 'M220,40 L200,0', { 'stroke-width': 3 }), W(plS, 'M300,40 L330,10', { 'stroke-width': 3 })];
const pBox = [mk(plS, 'rect', { x: 120, y: 170, width: 170, height: 150, rx: 12, fill: '#D9DCE3', stroke: INK, 'stroke-width': 4 }), ...[150, 205, 260].map(x => mk(plS, 'rect', { x: x - 8, y: 140, width: 16, height: 30, rx: 4, fill: '#fff', stroke: INK, 'stroke-width': 3 }))];
const pIn = [W(plS, 'M150,140 V40', { 'stroke-width': 3, stroke: TE }), W(plS, 'M205,140 V40', { 'stroke-width': 3, stroke: TE }), W(plS, 'M260,140 V40', { 'stroke-width': 3, stroke: TE })];
const pOut = [W(plS, 'M140,320 V380 H20', { 'stroke-width': 3, stroke: TE }), W(plS, 'M180,320 V410 H20', { 'stroke-width': 3, stroke: TE })];
const hum = [0, 1, 2].map(i => W(plS, `M${300 + i * 12},${215 - i * 8} q${10 + i * 6},${30 + i * 8} 0,${60 + i * 16}`, { 'stroke-width': 3, stroke: AM }));
const hInV = $('#hInV'), hOutV = $('#hOutV');

/* ================= I: inside ================= */
const iS = $('#iS');
const iCore = coreFrame(iS, 180, 110, 600, 470, 100);
const iP = wind(iS, 160, 300, 220, 360, 7), iSe = wind(iS, 480, 620, 240, 340, 4);
const iLd = [W(iS, 'M160,234 H80'), W(iS, 'M160,346 H80'), W(iS, 'M620,248 H704'), W(iS, 'M620,332 H704')];
const iLb = [tx(iS, 230, 520, 'Primary', { 'text-anchor': 'middle' }), tx(iS, 550, 520, 'Secondary', { 'text-anchor': 'middle' }), mono(iS, 390, 96, 'IRON CORE', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 })];
const iFl = mk(iS, 'rect', { x: 230, y: 160, width: 320, height: 260, rx: 18, fill: 'none', stroke: FX, 'stroke-width': 4, 'stroke-dasharray': '14 10' });
const IT = [['PRIMARY COIL', 'Takes in the supply', 'connected to the input'], ['SECONDARY COIL', 'Gives the output', 'connected to the load'], ['MUTUAL INDUCTION', 'Linked only by magnetism', 'the two coils never touch']];
$('#iTiles').innerHTML = IT.map(([l, n, e], i) => `<div class="tile" style="top:${76 + i * 170}px"><div class="tl">${l}</div><div class="tn">${n}</div><div class="te">${e}</div></div>`).join('');
const iTl = [...$('#iTiles').children];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bCore = coreFrame(ck, 330, 130, 610, 450, 70);
const bFl = mk(ck, 'rect', { x: 365, y: 165, width: 210, height: 250, rx: 14, fill: 'none', stroke: FX, 'stroke-width': 4, 'stroke-dasharray': '14 10' });
const bWp = [W(ck, 'M150,244 V170 H300 V220 H316'), W(ck, 'M150,336 V410 H300 V360 H316')];
const bWs = [W(ck, 'M624,220 H700 V170 H800 V250'), W(ck, 'M800,330 V410 H700 V360 H624')];
const bSrc = [mk(ck, 'circle', { cx: 150, cy: 290, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M122,290 C132,266 140,266 150,290 S168,314 178,290')];
const bBat = [mk(ck, 'rect', { x: 100, y: 244, width: 100, height: 92, fill: '#fff' }), W(ck, 'M150,244 V272 M115,272 H185', { 'stroke-width': 5 }), W(ck, 'M132,304 H168 M150,304 V336', { 'stroke-width': 5 })];
const bLamp = mk(ck, 'circle', { cx: 800, cy: 290, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), bLampX = [W(ck, 'M772,262 L828,318'), W(ck, 'M828,262 L772,318')];
const bPL = [tx(ck, 365, 108, 'Primary', { 'text-anchor': 'middle' }), tx(ck, 575, 108, 'Secondary', { 'text-anchor': 'middle' })];
const bNp = mono(ck, 365, 490, 'Np = 500', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 }), bNs = mono(ck, 575, 490, 'Ns = 100', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });
const bVin = mono(ck, 150, 470, '230 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 }), bVinL = mono(ck, 150, 498, 'input', { 'text-anchor': 'middle', 'font-size': 18 });
const bVout = mono(ck, 800, 470, '46 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 }), bVoutL = mono(ck, 800, 498, 'output', { 'text-anchor': 'middle', 'font-size': 18 });
const bWP = wind(ck, 316, 414, 214, 366, 5);
let bWS = wind(ck, 526, 624, 214, 366, 1), bWSn = 1;
const eP = flow(ck, [[150, 336], [150, 410], [300, 410], [300, 360], [316, 360], [316, 220], [300, 220], [300, 170], [150, 170], [150, 244]], 14, { r: 6, skip: (x, y) => Math.hypot(x - 150, y - 290) < 48 || (x > 310 && x < 320) });
const eS = flow(ck, [[624, 220], [700, 220], [700, 170], [800, 170], [800, 410], [700, 410], [700, 360], [624, 360]], 14, { r: 6, skip: (x, y) => Math.hypot(x - 800, y - 290) < 42 });
const tBat = wt('B8', 'battery'), tNs = wt('B6', 'one'), tB2 = T0('B2');
const NsOf = t => 100 + 900 * M.io((t - tNs) / 1.2);
const ratio = t => NsOf(t) / 500;
const th = t => OMG * (t - tB2);
const SC = scope($('#scS'), 592, 200);
const trA = SC.tr(CH1), trB = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · V IN (PRIMARY)', CH1), SC.lab(14, 190, 'CH2 · V OUT (SECONDARY)', AM)];
const vin = τ => τ < tBat ? 40 * Math.sin(th(τ)) : 40 * M.io((τ - tBat) / 0.08);
const vout = τ => τ < tBat ? 40 * ratio(τ) * Math.sin(th(τ)) : 70 * Math.exp(-(τ - tBat) / 0.12) * (τ - tBat < 0.02 ? (τ - tBat) / 0.02 : 1);
$('#ro').innerHTML = `<span class="k" style="color:${TE}">V<sub>p</sub></span><span class="v" id="rVp" style="color:${TE}">230</span><span class="u" id="rVpU">V</span>
  <span class="k">N<sub>p</sub></span><span class="v">500</span><span class="u">turns</span>
  <span class="k">N<sub>s</sub></span><span class="v" id="rNs">100</span><span class="u">turns</span>
  <span class="k" style="color:${TE}">V<sub>s</sub></span><span class="v" id="rVs" style="color:${TE}">46.0</span><span class="u">V</span>`;

/* ================= D: derivation ================= */
const dS = $('#dS'), DB = 500, DSc = 1.3;
const dChip = mk(dS, 'g'); { mk(dChip, 'rect', { x: 32, y: 76, width: 720, height: 64, rx: 12, fill: C.soft }); tx(dChip, 392, 118, 'Each turn: 230 V / 500 turns = 0.46 V', { 'text-anchor': 'middle', 'font-size': 26 }); }
const dBar = [[160, 500, 230, 'PRIMARY · 500 TURNS'], [470, 100, 46, 'SECONDARY · 100 TURNS']].map(([x, n, v, l]) => { const g = mk(dS, 'g');
  const r = mk(g, 'rect', { x, y: DB, width: 160, height: 0, rx: 8, fill: M.mix(TE, '#FFFFFF', 0.3) });
  const segs = [...Array(n / 50)].map((_, k) => mk(g, 'line', { x1: x, y1: DB - (k + 1) * 23 * DSc, x2: x + 160, y2: DB - (k + 1) * 23 * DSc, stroke: '#fff', 'stroke-width': 2 }));
  const val = mono(g, x + 80, DB, '', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 28 });
  const lab = mono(g, x + 80, DB + 34, l, { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 17 }); return { g, r, segs, val, lab, n, v }; });
const dBase = W(dS, `M60,${DB} H724`, { 'stroke-width': 2.5 });
const dSegL = mono(dS, 400, DB - 120, 'each band = 50 turns = 23 V', { 'text-anchor': 'middle', 'font-size': 18 });
const Ph = `\\textcolor{${FX}}{\\Phi}`;
const dRows = steps($('#dSteps'), [
  [K(`\\text{volts per turn} = \\dfrac{d${Ph}}{dt}`), 'same for every turn', 76],
  [K(`${Vt('V')} \\propto N`), 'more turns, more volts', 166],
  [K(`\\dfrac{${Vt('V_s')}}{${Vt('V_p')}} = \\dfrac{N_s}{N_p}`), 'turns ratio', 236],
  [K(`${Vt('V_p')}\\,${It('I_p')} = ${Vt('V_s')}\\,${It('I_s')}`), 'ideal: power in = power out', 336],
  [K(`\\dfrac{${It('I_s')}}{${It('I_p')}} = \\dfrac{N_p}{N_s}`), 'voltage up, current down', 410]]);
const dB1 = $('#dBox1'), dB2 = $('#dBox2'); dB1.style.top = '226px'; dB1.style.height = '88px'; dB2.style.top = '400px'; dB2.style.height = '88px';
const tDs = [wt('D2', 'Every'), wt('D3', 'So'), wt('D4', 'V'), wt('D5', 'In'), wt('D6', 'That')];

/* ================= W: worked example ================= */
const wS = $('#wS'), wL = $('#wL');
const wCore = coreFrame(wS, 290, 150, 500, 410, 56);
const wWp = wind(wS, 274, 362, 190, 370, 9), wWs = wind(wS, 428, 516, 260, 300, 1);
const wLd = [W(wS, 'M274,200 H130'), W(wS, 'M274,360 H130'), W(wS, 'M516,270 H660'), W(wS, 'M516,290 V360 H660')];
const wLb = [kl(wL, 64, 226, `${Vt('230\\,\\text{V}')}`, { fs: 30 }), kl(wL, 52, 290, `${It('I_p = 0.1\\,\\text{A}')}`, { fs: 26 }), kl(wL, 590, 196, `${Vt('11.5\\,\\text{V}')}`, { fs: 30 }), kl(wL, 600, 380, `${It('I_s = 2\\,\\text{A}')}`, { fs: 26 }),
  kl(wL, 250, 440, 'N_p = 2000', { fs: 26 }), kl(wL, 430, 440, 'N_s = 100', { fs: 26 })];
const wRatio = mk(wS, 'g'); { mk(wRatio, 'rect', { x: 292, y: 510, width: 200, height: 52, rx: 12, fill: C.ac2 }); mono(wRatio, 392, 545, 'RATIO 1 : 20', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 }); }
const wRows = steps($('#wSteps'), [
  [K(`\\dfrac{N_s}{N_p} = \\dfrac{100}{2000} = \\dfrac{1}{20}`), '', 84],
  [K(`${Vt('V_s')} = \\dfrac{230}{20} = 11.5\\,\\text{V}`), '', 206],
  [K(`${It('I_p')} = \\dfrac{${It('I_s')}}{20} = \\dfrac{2}{20} = 0.1\\,\\text{A}`), '', 318]]);
const wBox = $('#wBox'); wBox.style.top = '194px'; wBox.style.height = '92px';
const tWs = [wt('W2', 'The'), wt('W2', 'So'), wt('W3', 'If')];
const avW = PUC.avatar($('#sW'), { x: 1008, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Less voltage, more current. Same power!' });

/* ================= L: losses ================= */
const lS = $('#lS');
const lBlk = [[90, 'SOLID CORE'], [450, 'LAMINATED CORE']].map(([x, l]) => { const g = mk(lS, 'g'); mk(g, 'rect', { x, y: 110, width: 250, height: 300, rx: 8, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 }); mono(g, x + 125, 96, l, { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }); return g; });
const lSheets = []; for (let i = 1; i < 10; i++) lSheets.push(mk(lS, 'line', { x1: 450 + i * 25, y1: 112, x2: 450 + i * 25, y2: 408, stroke: '#9AA0AC', 'stroke-width': 3 }));
const lBig = mk(lS, 'ellipse', { cx: 215, cy: 260, rx: 90, ry: 120, fill: 'none', stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '14 10' });
const lSmall = [...Array(10)].map((_, i) => mk(lS, 'ellipse', { cx: 462.5 + i * 25, cy: 260, rx: 6, ry: 110, fill: 'none', stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' }));
const lT = [tx(lS, 215, 460, 'Big eddy currents', { 'text-anchor': 'middle', fill: C.red }), mono(lS, 215, 490, 'lots of heat', { 'text-anchor': 'middle' }), tx(lS, 575, 460, 'Tiny eddy currents', { 'text-anchor': 'middle', fill: '#1F6B3F' }), mono(lS, 575, 490, 'thin insulated sheets', { 'text-anchor': 'middle' })];
const LT = [['Copper loss', 'heat in the coil wires'], ['Eddy current loss', 'small swirling currents in the core'], ['Hysteresis loss', 'magnetising the core back and forth'], ['Flux leakage', 'some flux misses the secondary']];
$('#lTiles').innerHTML = LT.map(([n, e], i) => `<div class="lt" style="top:${76 + i * 104}px"><div class="ln">${n}</div><div class="le">${e}</div></div>`).join('');
const lTl = [...$('#lTiles').children];
const tLs = [wt('L2', 'Copper'), wt('L2', 'Eddy'), wt('L4', 'Hysteresis'), wt('L4', 'flux')];

/* ================= P: transmission ================= */
const pS = $('#pS'), LY = 170;
const pSt = mk(pS, 'g'); { mk(pSt, 'rect', { x: 50, y: 110, width: 150, height: 120, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 }); W(pSt, 'M80,110 V70 M110,110 V80', { 'stroke-width': 8, stroke: '#8B93A6' }); mono(pSt, 125, 262, 'POWER STATION', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 16 }); }
const tfm = (x, l) => { const g = mk(pS, 'g'); mk(g, 'rect', { x: x - 40, y: LY - 40, width: 80, height: 80, rx: 10, fill: '#D9DCE3', stroke: INK, 'stroke-width': 3 }); mono(g, x, LY + 70, l, { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 16 }); return g; };
const pT1 = tfm(290, 'STEP UP'), pT2 = tfm(1250, 'STEP DOWN');
const pHouse = mk(pS, 'g'); { W(pHouse, 'M1380,230 V150 L1440,100 L1500,150 V230 Z', { fill: '#fff', 'stroke-width': 3 }); mono(pHouse, 1440, 262, 'HOMES', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 16 }); }
const pLn = [W(pS, `M200,${LY} H250`), W(pS, `M330,${LY} H1210`, { stroke: TE }), W(pS, `M1290,${LY} H1380`)];
const pTw = [520, 760, 1000].map(x => W(pS, `M${x - 30},${LY + 90} L${x},${LY - 20} L${x + 30},${LY + 90} M${x - 40},${LY} H${x + 40}`, { 'stroke-width': 3, stroke: '#8B93A6' }));
const pHV = mono(pS, 770, LY - 40, 'HIGH VOLTAGE, SMALL CURRENT', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 18 });
const pE = flow(pS, [[330, LY], [1210, LY]], 18, { r: 6 });
const pRows = [['CURRENT IN THE WIRES', 10, 1, VI, '1/10'], ['HEAT LOST, I²R', 100, 1, C.red, '1/100']].map(([l, a, b, col, f], i) => { const y = 340 + i * 110, g = mk(pS, 'g');
  mono(g, 60, y, l, { 'font-weight': 600, 'font-size': 18 }); const r1 = mk(g, 'rect', { x: 60, y: y + 16, width: 0, height: 26, rx: 6, fill: M.mix(col, '#FFFFFF', 0.55) }); const r2 = mk(g, 'rect', { x: 60, y: y + 48, width: 0, height: 26, rx: 6, fill: col });
  const l1 = mono(g, 0, y + 37, '', { 'font-size': 18 }), l2 = mono(g, 0, y + 69, '', { 'font-size': 18, fill: col, 'font-weight': 600 }); return { g, r1, r2, l1, l2, a, b, f }; });
const pNote = mono(pS, 60, 580, '10 times the voltage, same power', { 'font-size': 18, fill: INK, 'font-weight': 600 });
const AP = ['Power supplies', 'Welding machines', 'Doorbells'];
const pApp = AP.map((s, i) => { const g = mk(pS, 'g'); mk(g, 'rect', { x: 1130, y: 330 + i * 76, width: 410, height: 60, rx: 12, fill: C.ac2 }); tx(g, 1335, 369 + i * 76, s, { 'text-anchor': 'middle', 'font-size': 24 }); return g; });
const pAppL = mono(pS, 1130, 316, 'TRANSFORMERS ARE ALSO IN', { 'font-weight': 600, 'font-size': 17 });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A step up transformer steps up the power', right: 'Voltage up, current down: P<sub>out</sub> ≤ P<sub>in</sub>', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcBars = [[90, 40, 200, TE, 'V'], [300, 200, 40, VI, 'I']].map(([x, h0, h1, col, s]) => { const g = mk(tcS, 'g'); const r = mk(g, 'rect', { x, y: 250, width: 120, height: 0, rx: 8, fill: col }); const l = tx(g, x + 60, 280, s, { 'text-anchor': 'middle', 'font-style': 'italic', fill: col, 'font-size': 26 }); return { g, r, h0, h1 }; });
const tcArr = [W(tcS, 'M240,190 L240,90 M228,104 L240,88 L252,104', { stroke: TE, 'stroke-width': 4 }), W(tcS, 'M450,90 L450,190 M438,176 L450,192 L462,176', { stroke: VI, 'stroke-width': 4 })];
const tcP = mk(tcS, 'g'); { mk(tcP, 'rect', { x: 520, y: 120, width: 230, height: 70, rx: 12, fill: C.soft }); tx(tcP, 635, 165, 'P stays the same', { 'text-anchor': 'middle', 'font-size': 22 }); }
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Use the turns ratio, find the currents, find the efficiency' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A transformer has 400 primary and 2000 secondary turns on a 230&nbsp;V supply. It is 90% efficient. If the primary current is 5&nbsp;A, what is the secondary current?', qW: 820,
  opts: [K('0.9\\,\\text{A}'), K('1.0\\,\\text{A}'), K('22.5\\,\\text{A}'), K('25\\,\\text{A}')], right: 0, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${Vt('V_s')} = 230 \\times 5 = 1150\\,\\text{V}`)], [K(`P_{in} = 230 \\times 5 = 1150\\,\\text{W}`)],
  [K(`P_{out} = 0.9 \\times 1150 = 1035\\,\\text{W}`)], [K(`${It('I_s')} = \\dfrac{1035}{1150} = 0.9\\,\\text{A}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A3', 'Input'), wt('A3', 'Ninety'), wt('A4', 'Divide')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 504, y0: 84, dy: 116, title: 'Transformers · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\dfrac{${Vt('V_s')}}{${Vt('V_p')}} = \\dfrac{N_s}{N_p} = \\dfrac{${It('I_p')}}{${It('I_s')}}`),
    K(`\\eta = \\dfrac{P_{out}}{P_{in}} \\times 100\\%`),
    'Works only on alternating current: no change in flux, no output',
    'Losses: copper, eddy current (laminated core), hysteresis, flux leakage'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 18', topic: 'AC and DC voltmeters and ammeters', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B6', 'Now'), 1.06, 960, 560], [T0('B8') - 0.2, 1, 960, 540], [wt('P2', 'heat'), 1.06, 960, 580], [tX - 0.6, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const ghOn = (t >= tB2 && t < tT) || (t >= tW && t < tL);
  M.vis(ghost, t, t < tW ? tB2 : tW + 0.2, t < tW ? tT - 0.4 : tL - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!ghOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(pole, t, tMorph + 0.5, 0.4, 0.15); drawSeq(pW, t, tMorph + 0.8, 0.3, 0.08); fadeAt(pBox, t, wt('H1', 'grey') - 0.1, 0.05);
    hum.forEach((h, i) => { M.vis(h, t, wt('H1', 'hums') + i * 0.1, 1e9, { dy: 0, fade: 0.15 }); if (t > wt('H1', 'hums')) h.style.opacity = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(TAU * 2 * (t - i * 0.12)))).toFixed(3); });
    drawSeq(pIn, t, wt('H2', 'going') - 0.1, 0.4, 0.1); drawSeq(pOut, t, wt('H2', 'out') - 0.1, 0.4, 0.1);
    M.vis($('#hR'), t, T0('H2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const a = wt('H2', 'eleven'), b = wt('H2', 'two');
    M.vis($('#hIn'), t, T0('H2'), 1e9, { dy: 20 }); M.setT(hInV, Math.round(11000 * M.o3((t - a + 0.2) / 1.2)).toLocaleString('en-IN') + ' V');
    M.vis($('#hOut'), t, wt('H2', 'wires', 1) - 0.1, 1e9, { dy: 20 }); M.setT(hOutV, Math.round(230 * M.o3((t - b + 0.2) / 1.0)) + ' V');
    M.vis($('#hQ'), t, T0('H3') + 0.1, 1e9, { dy: 20 });
  }

  /* I: inside */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(iCore, t, wt('I1', 'iron') - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(iLb[2], t, wt('I1', 'iron'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(iP, t, wt('I1', 'two') - 0.1, 0.6); M.draw(iSe, t, wt('I1', 'two') + 0.3, 0.5);
    M.draw(iLd[0], t, wt('I2', 'primary') - 0.2, 0.3); M.draw(iLd[1], t, wt('I2', 'primary') - 0.1, 0.3); M.vis(iLb[0], t, wt('I2', 'primary'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(iLd[2], t, wt('I2', 'secondary') - 0.2, 0.3); M.draw(iLd[3], t, wt('I2', 'secondary') - 0.1, 0.3); M.vis(iLb[1], t, wt('I2', 'secondary'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(iFl, t, wt('I3', 'magnetism') - 0.2, 1e9, { dy: 0, fade: 0.3 }); PUC.attr(iFl, 'stroke-dashoffset', (-60 * Math.sin(OMG * (t - tI))).toFixed(1));
    const ti = [wt('I2', 'primary'), wt('I2', 'secondary'), wt('I3', 'magnetism')];
    iTl.forEach((e, i) => { M.vis(e, t, ti[i] - 0.1, 1e9, { dy: 16 }); const u = M.io((t - ti[i]) / 0.3); e.style.background = M.mix(C.soft, '#FFFFFF', u); e.style.borderColor = M.mix(C.soft, AM, u); });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis(bCore, t, tB + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.draw(bWP, t, tB + 0.6, 0.5); drawSeq(bWp, t, tB + 0.7, 0.4, 0.12); fadeAt(bSrc, t, tB + 0.7); fadeAt([bPL[0], bNp], t, tB + 0.9);
    const ns = NsOf(t), nl = Math.max(1, Math.round(ns / 100));
    if (nl !== bWSn) { bWS.remove(); bWS = wind(ck, 526, 624, 214, 366, nl); bWSn = nl; }
    M.draw(bWS, t, wt('B3', 'secondary') - 0.3, 0.4); drawSeq(bWs, t, wt('B3', 'secondary') - 0.2, 0.4, 0.12); fadeAt([bPL[1], bNs], t, wt('B3', 'secondary')); M.vis(bLamp, t, wt('B3', 'induces') - 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq(bLampX, t, wt('B3', 'induces'), 0.2, 0.06);
    M.vis($('#ckE'), t, wt('B2', 'magnetic') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(bFl, t, wt('B2', 'magnetic') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    const dc = t >= tBat, fl = dc ? 60 * M.io((t - tBat) / 0.12) : 60 * Math.sin(th(t));
    PUC.attr(bFl, 'stroke-dashoffset', (-fl).toFixed(1));
    M.hide(bSrc[0], dc); M.hide(bSrc[1], dc); bBat.forEach(e => M.hide(e, !dc));
    eP.set(dc ? 0 : 30 * Math.sin(th(t)), t >= tB2);
    const vs = dc ? 0 : 230 * ratio(t), on2 = t >= wt('B3', 'induces');
    eS.set(30 * ratio(t) * Math.sin(th(t)) * (dc ? 0 : 1), on2);
    PUC.attr(bLamp, 'fill', M.mix('#FFFFFF', AM, on2 ? Math.min(1, vs / 460) * (0.5 + 0.5 * Math.abs(Math.sin(th(t)))) : 0));
    M.setT(bNs, 'Ns = ' + Math.round(ns)); M.setT($('#rNs'), String(Math.round(ns)));
    M.setT(bVout, (dc ? 0 : Math.round(vs * 10) / 10).toFixed(vs < 100 ? 1 : 0) + ' V'); M.setT($('#rVs'), (dc ? 0 : vs).toFixed(1));
    M.setT(bVin, dc ? 'DC' : '230 V'); M.setT($('#rVp'), dc ? 'DC' : '230'); M.setT($('#rVpU'), dc ? '' : 'V');
    fadeAt([bVin, bVinL], t, tB + 0.9); fadeAt([bVout, bVoutL], t, wt('B5', 'forty') - 0.1);
    trA(vin, t, tB2, 4, 100, t >= tB2); trB(vout, t, wt('B3', 'induces'), 4, 100, on2);
    M.vis(sLab[0], t, tB2, 1e9, { dy: 0, fade: 0.2 }); M.vis(sLab[1], t, wt('B3', 'induces'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#modeT'), t, wt('B4', 'same') - 0.1, tBat - 0.1, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.2 }); M.vis($('#modeT2'), t, wt('B9', 'zero') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro'), t, tB + 0.8, 1e9, { dy: 12 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'no', 1) - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(dChip, t, wt('D2', 'same') - 0.1, 1e9, { dy: 12 }); M.draw(dBase, t, tD + 0.5, 0.5);
    dBar.forEach((b, i) => { const ti = tDs[1] + i * 0.6, u = M.o3((t - ti) / 1.4), h = b.v * DSc * Math.max(0, u);
      M.vis(b.lab, t, tD + 0.6 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(b.r, 'y', (DB - h).toFixed(1)); PUC.attr(b.r, 'height', h.toFixed(1)); M.hide(b.r, u <= 0);
      b.segs.forEach((s, k) => M.hide(s, (k + 1) * 23 * DSc > h - 1)); PUC.attr(b.val, 'y', (DB - h - 14).toFixed(1)); M.setT(b.val, (b.v * Math.max(0, u)).toFixed(0) + ' V'); M.hide(b.val, u <= 0); });
    M.vis(dSegL, t, tDs[1] + 1.6, 1e9, { dy: 0, fade: 0.2 });
    runSteps(dRows, t, tDs);
    M.vis(dB1, t, tDs[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis(dB2, t, tDs[4] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tL + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tL - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(wCore, t, tW + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.draw(wWp, t, wt('W1', 'thousand') - 0.2, 0.5); M.draw(wWs, t, wt('W1', 'hundred') - 0.1, 0.3);
    M.vis(wLb[4], t, wt('W1', 'thousand'), 1e9, { dy: 0, fade: 0.2 }); M.vis(wLb[5], t, wt('W1', 'hundred') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.draw(wLd[0], t, wt('W1', 'input') - 0.2, 0.3); M.draw(wLd[1], t, wt('W1', 'input') - 0.1, 0.3); M.vis(wLb[0], t, wt('W1', 'two', 1), 1e9, { dy: 0, fade: 0.2 });
    M.vis(wRatio, t, wt('W2', 'twentieth') - 0.1, 1e9, { dy: 12 });
    M.draw(wLd[2], t, tWs[1] - 0.2, 0.3); M.draw(wLd[3], t, tWs[1] - 0.1, 0.3); M.vis(wLb[2], t, wt('W2', 'Eleven'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(wLb[3], t, wt('W3', 'two'), 1e9, { dy: 0, fade: 0.2 }); M.vis(wLb[1], t, wt('W3', 'Zero'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[1] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, T1('W3') + 0.1, out);
  }

  /* L: losses */
  const lOn = t >= tL - 0.05 && t < tP + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tP - 0.32;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, tL + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(lBlk[0], t, tL + 0.4, 1e9, { dy: 16 }); M.vis(lBig, t, wt('L2', 'swirling') - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(lBig, 'stroke-dashoffset', (-40 * (t - tL)).toFixed(1));
    fadeAt(lT.slice(0, 2), t, wt('L2', 'swirling'));
    M.vis(lBlk[1], t, wt('L3', 'thin') - 0.2, 1e9, { dy: 16 }); fadeAt(lSheets, t, wt('L3', 'thin'), 0.04); lSmall.forEach((e, i) => { M.vis(e, t, wt('L3', 'laminations') - 0.2 + i * 0.03, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(e, 'stroke-dashoffset', (-20 * (t - tL)).toFixed(1)); });
    fadeAt(lT.slice(2), t, wt('L3', 'laminations'));
    if (t > wt('L2', 'swirling')) PUC.attr(lBlk[0].firstChild, 'fill', M.mix('#E3E6EC', '#F6C9A8', M.io((t - wt('L2', 'swirling')) / 1.0)));
    lTl.forEach((e, i) => { M.vis(e, t, tLs[i] - 0.1, 1e9, { dy: 16 }); const u = M.io((t - tLs[i]) / 0.3); e.style.background = M.mix(C.soft, '#FFFFFF', u); e.style.borderColor = M.mix(C.soft, AM, u); });
    M.vis($('#lEff'), t, wt('L5', 'Efficiency') - 0.1, 1e9, { dy: 20 });
  }

  /* P: transmission */
  const pOn = t >= tP - 0.05 && t < tX + 0.02; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tX - 0.32;
    M.vis($('#pC'), t, tP + 0.1, out, { dy: 36, ...o });
    M.vis(pSt, t, tP + 0.4, 1e9, { dy: 0, fade: 0.2 }); drawSeq(pLn, t, tP + 0.5, 0.5, 0.2); fadeAt([pT1, ...pTw, pT2, pHouse], t, tP + 0.6, 0.1);
    pE.set(-30 * (t - tP), t >= tP + 1.0); M.vis(pHV, t, wt('P1', 'higher') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const ta = [wt('P1', 'smaller'), wt('P2', 'heat')];
    pRows.forEach((r, i) => { M.vis(r.g, t, ta[i] - 0.2, 1e9, { dy: 12 }); const u1 = M.io((t - ta[i]) / 0.6), u2 = M.io((t - (i ? wt('P2', 'hundred') : wt('P1', 'smaller') + 0.8)) / 0.6);
      const W1 = 700 * u1, W2 = Math.max(4, 700 * r.b / r.a) * u2;
      PUC.attr(r.r1, 'width', W1.toFixed(1)); PUC.attr(r.r2, 'width', W2.toFixed(1));
      PUC.attr(r.l1, 'x', (60 + W1 + 14).toFixed(1)); M.setT(r.l1, u1 > 0 ? 'at low voltage' : ''); PUC.attr(r.l2, 'x', (60 + W2 + 14).toFixed(1)); M.setT(r.l2, u2 > 0 ? 'at 10 times the voltage: ' + r.f : ''); });
    M.vis(pNote, t, wt('P1', 'same') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(pAppL, t, wt('P3', 'also') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const tap = [wt('P3', 'power', 1), wt('P3', 'welding'), wt('P3', 'doorbells')]; pApp.forEach((g, i) => M.vis(g, t, tap[i] - 0.1, 1e9, { dy: 12 }));
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'It') - 0.1, tRight: wt('X3', 'voltage') - 0.1 });
    const u = M.io((t - wt('X3', 'voltage')) / 0.8);
    tcBars.forEach((b, i) => { M.vis(b.g, t, tX + 0.5 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); const h = M.lerp(b.h0 * 0.6 + 40, b.h1 * 0.6 + 40, u) * 1; PUC.attr(b.r, 'y', (250 - h * 0.9).toFixed(1)); PUC.attr(b.r, 'height', (h * 0.9).toFixed(1)); });
    drawSeq(tcArr, t, wt('X3', 'voltage'), 0.4, 0.5); M.vis(tcP, t, wt('X3', 'Power'), 1e9, { dy: 12 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'Use') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'If') - 0.4, tCount, tAns });
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
