// PUC Electronics Ep 13 - AC waveform: frequency, period, phase and amplitude ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V and E teal, charge Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const kI = s => tc(VI, s), kE = s => tc(TE, s);
// resistor zigzags (IEC-style as the style frame): vertical at x from y1 to y2, horizontal at y from x1 to x2
const zigV = (x, y1, y2, w = 18, n = 6) => { let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -w : w)},${(y1 + (y2 - y1) * (i + 0.5) / n).toFixed(1)}`; return d + ` L${x},${y2}`; };
const zigH = (y, x1, x2, w = 18, n = 6) => { let d = `M${x1},${y}`; for (let i = 0; i < n; i++) d += ` L${(x1 + (x2 - x1) * (i + 0.5) / n).toFixed(1)},${y + (i % 2 ? -w : w)}`; return d + ` L${x2},${y}`; };
const node = (p, x, y) => mk(p, 'circle', { cx: x, cy: y, r: 8, fill: INK });

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  if (!n) n = Math.max(2, Math.round(L / 44));
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
    tr(col, sw = 4) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    path(col, sw = 4) { return mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
/* piecewise eased keyframes [[t, v], ...] */
const keys = (K) => t => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const [a, va] = K[i - 1], [b, vb] = K[i]; return va + (vb - va) * M.io((t - a) / (b - a)); } return K[K.length - 1][1]; };
/* integral of f from a to t (for electron offsets when the current changes) */
const integ = (f, a, t, n = 80) => { if (t <= a) return 0; const h = (t - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h; };


/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'fan') - 0.2;
const tI = T0('I1'), tB = T0('G1'), tD = T0('D1'), tPh = T0('PH1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const TAU = 2 * Math.PI;
const lab = (p, x, y, s, a = {}) => mono(p, x, y, s, { fill: INK, 'font-weight': 600, ...a });
const html = (host, x, y, s, fs = 32) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${fs}px;white-space:nowrap`; d.innerHTML = s; host.appendChild(d); return d; };
const bracketH = (p, col) => { const e = W(p, '', { stroke: col, 'stroke-width': 3 }); return (x1, x2, y, on = true) => { M.hide(e, !on); if (on) PUC.attr(e, 'd', `M${x1.toFixed(1)},${y - 10} V${y + 10} M${x1.toFixed(1)},${y} H${x2.toFixed(1)} M${x2.toFixed(1)},${y - 10} V${y + 10}`); }; };

/* wave panel: a turning arm (left) whose height is drawn on a scope (right), newest point at the left edge of the screen */
const wavePanel = (card, n = 1) => {
  const sv = mk(card, 'svg', { width: 968, height: 600, class: 'full' });
  const WX = 170, WY = 296, X0 = 330, SWD = 606, SY = 96, SH = 400, PX = 150;
  const g = {};
  g.ring = mk(sv, 'circle', { cx: WX, cy: WY, r: 110, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 3 });
  g.axis = W(sv, `M${WX - 140},${WY} H${WX + 140}`, { stroke: '#D9DCE3', 'stroke-width': 2 });
  mk(sv, 'rect', { x: X0, y: SY, width: SWD, height: SH, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(sv, 'line', { x1: X0 + SWD * i / 6, y1: SY, x2: X0 + SWD * i / 6, y2: SY + SH, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(sv, 'line', { x1: X0, y1: SY + SH * j / 4, x2: X0 + SWD, y2: SY + SH * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  g.cols = [CH1, AM].slice(0, n);
  g.proj = g.cols.map(c => W(sv, '', { stroke: c, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
  g.tr = g.cols.map(c => W(sv, '', { stroke: c, 'stroke-width': 4 }));
  g.arm = g.cols.map(c => W(sv, '', { stroke: c, 'stroke-width': 6 }));
  g.tip = g.cols.map(c => mk(sv, 'circle', { r: 9, fill: c, stroke: INK, 'stroke-width': 2 }));
  g.hub = mk(sv, 'circle', { cx: WX, cy: WY, r: 7, fill: INK });
  g.sv = sv; g.X0 = X0; g.SY = SY; g.SH = SH; g.WY = WY; g.WX = WX; g.PX = PX; g.SWD = SWD;
  g.xOf = (t, tau) => X0 + 6 + (t - tau) * PX;
  g.lab = (x, y, s, col, a = {}) => { const e = mk(sv, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; };
  // waves: [{A: tau => px, th: tau => angle}], tStart: trace start time
  g.set = (t, waves, tStart, armOn = true) => {
    waves.forEach((w, k) => {
      const A = w.A(t), th = w.th(t), tx2 = WX + A * Math.cos(th), ty = WY - A * Math.sin(th);
      M.hide(g.arm[k], !armOn); M.hide(g.tip[k], !armOn);
      PUC.attr(g.arm[k], 'd', `M${WX},${WY} L${tx2.toFixed(1)},${ty.toFixed(1)}`); PUC.attr(g.tip[k], 'cx', tx2.toFixed(1)); PUC.attr(g.tip[k], 'cy', ty.toFixed(1));
      const on = t >= tStart; M.hide(g.proj[k], !on || !armOn); M.hide(g.tr[k], !on);
      if (on) { PUC.attr(g.proj[k], 'd', `M${tx2.toFixed(1)},${ty.toFixed(1)} H${X0 + 6}`);
        let d = '', first = true; const N = 200, span = (SWD - 12) / PX;
        for (let i = 0; i <= N; i++) { const tau = t - span * i / N; if (tau < tStart) break; const x = X0 + 6 + (SWD - 12) * i / N, y = WY - w.A(tau) * Math.sin(w.th(tau)); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(g.tr[k], 'd', d); }
    });
    PUC.attr(g.ring, 'r', waves[0].A(t).toFixed(1));
  };
  return g;
};

/* ================= A: hook ================= */
const sockS = $('#sockS');
const sock = [W(sockS, 'M40,40 H260 A20,20 0 0 1 280,60 V240 A20,20 0 0 1 260,260 H40 A20,20 0 0 1 20,240 V60 A20,20 0 0 1 40,40 Z', { fill: '#fff' })];
const holes = [[150, 100, 16], [105, 180, 12], [195, 180, 12]].map(([x, y, r]) => mk(sockS, 'circle', { cx: x, cy: y, r, fill: INK }));
const cord = W(sockS, 'M150,260 C150,330 110,350 60,380', { 'stroke-width': 5 });
const sockL = mono(sockS, 150, 300 + 110, 'wall socket', { 'text-anchor': 'middle' });
const hS = $('#hS');
mk(hS, 'rect', { x: 0, y: 0, width: 720, height: 360, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(hS, 'line', { x1: 120 * i, y1: 0, x2: 120 * i, y2: 360, stroke: '#2A3758', 'stroke-width': 1.5 });
for (let j = 1; j < 4; j++) mk(hS, 'line', { x1: 0, y1: 90 * j, x2: 720, y2: 90 * j, stroke: '#2A3758', 'stroke-width': 1.5 });
const hTr = W(hS, '', { stroke: CH1, 'stroke-width': 4 });
const hL = [mono(hS, 14, 28, 'CH1 · SOCKET VOLTAGE', { fill: CH1, 'font-size': 17 }), mono(hS, 14, 64, '+', { fill: '#7FD1D1', 'font-size': 24 }), mono(hS, 14, 336, '-', { fill: '#7FD1D1', 'font-size': 26 })];
const tHk = wt('H1', 'voltage') - 0.3;

/* ================= I: four ideas ================= */
const IDS = [['Amplitude', 'how big: the peak value'], ['Period', 'how long one cycle takes'], ['Frequency', 'how many cycles each second'], ['Phase', 'where in the cycle, and when']];
$('#iTiles').innerHTML = IDS.map(([n, e], i) => `<div class="card sT" style="left:${160 + i * 408}px"><svg width="376" height="200"></svg><div class="nm">${n}</div><div class="ex">${e}</div></div>`).join('');
const iT = [...$('#iTiles').children], iSv = iT.map(e => e.querySelector('svg'));
const sinP = (x0, w, yc, a, cyc = 1, ph = 0) => { let d = ''; for (let i = 0; i <= 60; i++) { const u = i / 60; d += (i ? 'L' : 'M') + (x0 + w * u).toFixed(1) + ',' + (yc - a * Math.sin(TAU * cyc * u + ph)).toFixed(1); } return d; };
const iG = [
  [W(iSv[0], sinP(48, 280, 110, 60), { stroke: '#AEB4C2' }), W(iSv[0], 'M118,110 V50', { stroke: TE, 'stroke-width': 4 }), W(iSv[0], 'M40,110 H336', { stroke: '#D9DCE3', 'stroke-width': 2 })],
  [W(iSv[1], sinP(48, 280, 120, 50), { stroke: '#AEB4C2' }), W(iSv[1], 'M118,48 V58 M118,53 H258 M258,48 V58', { stroke: INK, 'stroke-width': 3 })],
  [W(iSv[2], sinP(48, 280, 110, 50, 3), { stroke: '#AEB4C2' })],
  [W(iSv[3], sinP(48, 280, 110, 50, 1), { stroke: CH1 }), W(iSv[3], sinP(48, 280, 110, 50, 1, Math.PI / 2), { stroke: AM })]];
const tId = [wt('I1', 'Amplitude'), wt('I1', 'period'), wt('I1', 'frequency'), wt('I1', 'phase')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const ckW = [W(ck, 'M120,150 V80 H470 V140'), W(ck, zigV(470, 140, 260)), W(ck, 'M470,260 V320 H120 V250')];
const src = [mk(ck, 'circle', { cx: 120, cy: 200, r: 50, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M92,200 C102,176 112,176 120,200 S138,224 148,200')];
const ckL = [tx(ck, 186, 206, 'AC source'), tx(ck, 498, 206, 'R', { 'font-style': 'italic' })];
const skB = (x, y) => Math.abs(x - 470) < 3 && y > 134 && y < 266 || (Math.abs(x - 120) < 3 && y > 146 && y < 254);
const eB = flow(ck, [[120, 250], [120, 320], [470, 320], [470, 80], [120, 80], [120, 150]], 0, { skip: skB });
const iArr = PUC.arrow(ck, VI); const iLab = tx(ck, 288, 52, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'middle' });
const P1 = wavePanel($('#wv'));
const tRot = wt('G1', 'Watch') - 0.2, tTr = wt('G3', 'scope') - 0.2;
const tA0 = wt('AM2', 'Turn'), tA1 = tA0 + 1.4, tF0 = wt('P3', 'Turn'), tF1 = tF0 + 1.6;
const Apx = keys([[tA0, 110], [tA1, 154]]); // 11 px per volt: 10 V -> 14 V
const f0 = 0.5, f1 = 1.0;
const thB = t => { // angle of the arm, integral of 2 pi f (slow-motion view)
  if (t <= tRot) return 0; const w0 = TAU * f0, w1 = TAU * f1;
  if (t <= tF0) return w0 * (t - tRot);
  const th0 = w0 * (tF0 - tRot), D = tF1 - tF0;
  if (t <= tF1) { const s = t - tF0; return th0 + w0 * s + (w1 - w0) * s * s / (2 * D); }
  return th0 + (w0 + w1) * D / 2 + w1 * (t - tF1); };
const fB = t => t <= tF0 ? f0 : t >= tF1 ? f1 : f0 + (f1 - f0) * (t - tF0) / (tF1 - tF0);
const wB = [{ A: Apx, th: thB }];
const pLab = [P1.lab(342, 122, 'CH1 · V ACROSS R', CH1)];
const ampL = [W(P1.sv, '', { stroke: '#7FD1D1', 'stroke-width': 2, 'stroke-dasharray': '8 8' }), W(P1.sv, '', { stroke: '#7FD1D1', 'stroke-width': 2, 'stroke-dasharray': '8 8' })];
const ampT = [P1.lab(924, 0, '+Vm', '#7FD1D1', { 'text-anchor': 'end', 'font-size': 20, 'font-weight': 600 }), P1.lab(924, 0, '-Vm', '#7FD1D1', { 'text-anchor': 'end', 'font-size': 20, 'font-weight': 600 })];
const perB = bracketH(P1.sv, '#FFFFFF'), perT = P1.lab(0, 0, 'T', '#FFFFFF', { 'font-size': 22, 'font-weight': 600, 'text-anchor': 'middle' });
const armL = P1.lab(170, 560, 'arm length = Vm', TE, { 'text-anchor': 'middle', 'font-size': 18 });
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>m</sub></span><span class="v" id="rA" style="color:${TE}">10.0</span><span class="u">V</span>
  <span class="k">f</span><span class="v" id="rF">50</span><span class="u">Hz</span>
  <span class="k">T</span><span class="v" id="rT">20.0</span><span class="u">ms</span>`;
const roR = [...$('#ro1').children];
const avB = PUC.avatar($('#sB'), { x: 824, y: 772, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the wave is just a turning arm, drawn over time!' });

/* ================= D: derivation ================= */
const dS = $('#dS');
const DX = 300, DY = 310, DR = 170;
mk(dS, 'circle', { cx: DX, cy: DY, r: DR, fill: 'none', stroke: '#D9DCE3', 'stroke-width': 3 });
const dAx = W(dS, `M${DX - 200},${DY} H${DX + 200}`, { stroke: '#C9CDD6', 'stroke-width': 2 });
const dArc = W(dS, '', { stroke: AM, 'stroke-width': 4 });
const dArm = W(dS, '', { stroke: CH1, 'stroke-width': 6 }), dTip = mk(dS, 'circle', { r: 10, fill: CH1, stroke: INK, 'stroke-width': 2 });
const dH = W(dS, '', { stroke: TE, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
mk(dS, 'circle', { cx: DX, cy: DY, r: 7, fill: INK });
const dThL = tx(dS, 0, 0, 'θ = ωt', { fill: '#B7791F', 'font-size': 24 });
const dHL = tx(dS, 0, 0, 'Vm sin ωt', { fill: TE, 'font-size': 22 });
const dVmL = tx(dS, 0, 0, 'Vm', { fill: '#5F7399', 'font-size': 22 });
const dTurn = [lab(dS, 560, 120, '1 turn', { 'font-size': 24 }), lab(dS, 560, 156, '= 360°', { 'font-size': 24, fill: MU }), lab(dS, 560, 192, '= 2π rad', { 'font-size': 24, fill: '#B7791F' })];
const dSt = [
  [K(`1 \\text{ turn} = 360^\\circ = 2\\pi\\,\\text{rad}`), '', 84],
  [K(`\\omega = 2\\pi f`), 'in rad/s', 186],
  [K(`\\theta = \\omega t`), 'angle after time t', 288],
  [K(`${kE('v')} = ${kE('V_m')} \\sin \\omega t`), 'value at any instant', 398]];
$('#dSteps').innerHTML = dSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const dRw = [...$('#dSteps').children];
const tDs = [wt('D2', 'One'), wt('D3', 'So'), wt('D4', 'After'), wt('D5', 'So')];
const dUnit = html($('#dR'), 36, 520, `<span style="font:500 22px 'IBM Plex Mono';color:${C.ink2}">v in V · f in Hz · t in s · ω in rad/s</span>`, 22);

/* ================= PH: phase ================= */
const P2 = wavePanel($('#wv2'), 2);
const tPh2 = wt('PH2', 'second') - 0.2;
const thP = t => TAU * 0.5 * (t - tPh);
const wP = [{ A: () => 130, th: thP }, { A: () => 130, th: t => thP(t) + Math.PI / 2 }];
const phLab = [P2.lab(342, 122, 'CH1 · WAVE 1', CH1), P2.lab(924, 122, 'CH2 · WAVE 2, AHEAD', AM, { 'text-anchor': 'end' })];
const gapB = bracketH(P2.sv, '#FFFFFF'), gapT = P2.lab(0, 0, '90° = T/4', '#FFFFFF', { 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const phE = [html($('#phL'), 36, 250, K(`${tc('#5F7399', 'v_1')} = ${kE('V_m')} \\sin \\omega t`), 34), html($('#phL'), 36, 318, K(`${tc('#B7791F', 'v_2')} = ${kE('V_m')} \\sin(\\omega t + 90^\\circ)`), 34)];
const phBox = document.createElement('div'); phBox.className = 'hbox'; phBox.style.cssText = 'left:24px;top:420px;width:552px;height:96px'; $('#phL').appendChild(phBox);
const phG = html($('#phL'), 48, 444, K(`${kE('v')} = ${kE('V_m')} \\sin(\\omega t + \\phi)`), 38);
const phN = html($('#phL'), 36, 532, `<span style="font:500 22px Poppins;color:${MU}">φ is the phase angle</span>`, 22);

/* ================= W: worked example ================= */
const wS = $('#wS');
const wBig = [lab(wS, 36, 120, '230 V', { fill: TE, 'font-size': 64 }), lab(wS, 300, 120, '·', { 'font-size': 64, fill: MU }), lab(wS, 360, 120, '50 Hz', { 'font-size': 64 })];
mk(wS, 'rect', { x: 36, y: 160, width: 712, height: 380, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(wS, 'line', { x1: 36 + 712 * i / 6, y1: 160, x2: 36 + 712 * i / 6, y2: 540, stroke: '#2A3758', 'stroke-width': 1.5 });
const WYc = 350, WA = 150, wXs = 60, wW2 = 660; // 2 cycles across the screen = 40 ms
const wWave = W(wS, sinP(wXs, wW2, WYc, WA, 2), { stroke: CH1, 'stroke-width': 4 });
const wPk = [W(wS, `M48,${WYc - WA} H736`, { stroke: '#7FD1D1', 'stroke-width': 2, 'stroke-dasharray': '8 8' }), mono(wS, 730, WYc - WA - 10, 'peak ≈ 325 V', { fill: '#7FD1D1', 'text-anchor': 'end', 'font-weight': 600 })];
const wRm = [W(wS, `M48,${(WYc - WA * 230 / 325).toFixed(1)} H736`, { stroke: '#46557A', 'stroke-width': 2, 'stroke-dasharray': '4 8' }), mono(wS, 730, WYc - WA * 230 / 325 + 26, '230 V (not the peak)', { fill: '#9AA6C2', 'text-anchor': 'end' })];
const wTb = bracketH(wS, '#FFFFFF'); const wTt = mono(wS, wXs + wW2 / 4 + wW2 / 4, 528, 'T = 20 ms', { fill: '#FFFFFF', 'text-anchor': 'middle', 'font-weight': 600 });
const wSt = [
  [K(`T = \\dfrac{1}{f} = \\dfrac{1}{50} = 0.02\\,\\text{s}`), '20 ms', 84],
  [K(`\\omega = 2\\pi f = 2\\pi \\times 50`), '', 208],
  [K(`\\omega \\approx 314\\,\\text{rad/s}`), '', 292],
  [K(`${kE('V_m')} \\approx 325\\,\\text{V}`), 'why: next episode', 398]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRw = [...$('#wSteps').children];
$('#wBox').style.top = '384px';
const tWs = [wt('W2', 'period'), wt('W3', 'Omega'), wt('W3', 'About'), wt('W4', 'peak')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'In 100 sin(100πt), f = 100π Hz', right: '100π is ω.  f = ω/2π = 50 Hz', y0: 96, y1: 184 });
const tcF = $('#tcF');
const tcR = [html(tcF, 48, 84, K(`${kE('v')} = ${kE('V_m')} \\sin(\\,\\boxed{\\omega}\\, t)`), 40), html(tcF, 48, 160, K(`${kE('v')} = 100 \\sin(\\,\\boxed{100\\pi}\\, t)`), 40)];
const tcRes = html(tcF, 470, 124, K(`f = \\dfrac{100\\pi}{2\\pi} = 50\\,\\text{Hz}`), 34);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Define frequency, period, amplitude, phase · read Vm, ω, f and T from v = Vm sin(ωt + φ)' });
$('#wa').querySelector('.wat').style.fontSize = '26px';
$('#wa').querySelector('.wat').innerHTML = 'Define frequency, period, amplitude, phase · read V<sub>m</sub>, ω, f and T from v = V<sub>m</sub> sin(ωt + φ)';

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `An alternating voltage is ${K('v = 120 \\sin(200\\pi t)')}&nbsp;volt. Find its peak value, frequency and period.`, qW: 780,
  opts: [K('120\\,\\text{V},\\ 200\\,\\text{Hz},\\ 5\\,\\text{ms}'), K('60\\,\\text{V},\\ 100\\,\\text{Hz},\\ 10\\,\\text{ms}'), K('120\\,\\text{V},\\ 100\\,\\text{Hz},\\ 10\\,\\text{ms}'), K('84.9\\,\\text{V},\\ 100\\,\\text{Hz},\\ 10\\,\\text{ms}')], right: 2, optW: 474, optY: 330 });
const qS = $('#qS');
mk(qS, 'rect', { x: 32, y: 96, width: 464, height: 320, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(qS, 'line', { x1: 32 + 464 * i / 6, y1: 96, x2: 32 + 464 * i / 6, y2: 416, stroke: '#2A3758', 'stroke-width': 1.5 });
for (let j = 1; j < 4; j++) mk(qS, 'line', { x1: 32, y1: 96 + 80 * j, x2: 496, y2: 96 + 80 * j, stroke: '#2A3758', 'stroke-width': 1.5 });
const qWave = W(qS, sinP(44, 440, 256, 110, 2), { stroke: CH1, 'stroke-width': 4 });
const qL = [mono(qS, 44 + 440 / 8, 132, '? V', { fill: '#7FD1D1', 'text-anchor': 'middle', 'font-weight': 600 }), mono(qS, 44 + 440 * 3 / 8 + 0, 404, 'T = ?', { fill: '#FFFFFF', 'text-anchor': 'middle', 'font-weight': 600 })];
const qTb = W(qS, `M${44 + 440 / 8},382 V398 M${44 + 440 / 8},390 H${44 + 440 * 5 / 8} M${44 + 440 * 5 / 8},382 V398`, { stroke: '#FFFFFF', 'stroke-width': 3 });
const qEq = html($('#qc'), 32, 450, K(`${kE('v')} = 120 \\sin(200\\pi t)`), 36);
const sol = PUC.solution($('#so'), [[K(`${kE('V_m')} = 120\\,\\text{V}`)], [K(`\\omega = 200\\pi\\,\\text{rad/s}`)], [K(`f = \\dfrac{\\omega}{2\\pi} = 100\\,\\text{Hz}`)],
  [K(`T = \\dfrac{1}{f} = 10\\,\\text{ms}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'So'), wt('A3', 'Omega'), wt('A3', 'so'), wt('A4', 'T')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 104, title: 'AC waveform · formula card', txt: [0, 0, 1, 1],
  lines: [K(`${kE('v')} = ${kE('V_m')} \\sin(\\omega t + \\phi)`),
    K(`\\omega = 2\\pi f \\qquad f = \\dfrac{1}{T}`),
    'Amplitude <b>V<sub>m</sub></b>: the peak · Period <b>T</b>: one cycle · <b>f</b>: cycles per second (Hz)',
    'Mains in India: 230 V, 50 Hz, so T = 20 ms'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 14', topic: 'RMS and average values', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('G2', 'picture') - 0.2, 1.1, 700, 540], [T0('AM1') - 0.3, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const tGh = [[tB + 0.3, tD - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gi = tGh.findIndex(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gi < 0) M.hide(ghost, true); else M.vis(ghost, t, tGh[gi][0], tGh[gi][1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(sock, t, tMorph + 0.6, 0.5); fadeAt(holes, t, tMorph + 0.9, 0.08); M.draw(cord, t, wt('H1', 'socket') - 0.2, 0.5); M.vis(sockL, t, wt('H1', 'socket'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#hC'), t, tHk - 0.2, out, { dx: 60, dy: 0, ...o });
    fadeAt(hL, t, tHk + 0.1, 0.1);
    let d = '', first = true; for (let i = 0; i <= 160; i++) { const tau = t - 4.8 * i / 160; if (tau < tHk) break; const x = 6 + 708 * i / 160, y = 180 - 140 * Math.sin(TAU * 0.6 * (tau - tHk)); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
    PUC.attr(hTr, 'd', d); M.hide(hTr, t < tHk);
    M.vis($('#hSlow'), t, wt('H2', 'swings'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hP'), t, wt('H2', 'fifty') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hQ'), t, wt('H3', 'describe') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* I: four ideas */
  const iOn = t >= tI - 0.05 && t < tB + 0.05; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    iT.forEach((el, i) => {
      M.vis(el, t, tI + 0.15 + i * 0.1, out, { dy: 36, ...o });
      const u = M.io((t - tId[i]) / 0.3);
      drawSeq(iG[i], t, tId[i] - 0.1, 0.45, 0.15);
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); el.querySelector('.ex').style.color = M.mix('#B8BCC6', MU, u);
      el.style.borderTopColor = M.mix('#D9DCE3', AM, u);
    });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wv'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq(ckW, t, tB + 0.4, 0.35, 0.15); M.vis(src[0], t, wt('G1', 'source') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(src[1], t, wt('G1', 'source'), 0.4);
    fadeAt(ckL, t, wt('G1', 'source'), 0.3);
    const th = thB(t), A = Apx(t), v = A * Math.sin(th);
    eB.set(-(A / 3) * Math.cos(th) + (A / 3), t >= tRot);
    const L = 1.1 * v; iArr.set(288 - L / 2, 52 + 0, 288 + L / 2, 52); iLab.style.opacity = M.clamp((t - tRot) / 0.3) * M.clamp(Math.abs(L) / 20);
    PUC.attr(iLab, 'y', 36);
    M.vis($('#ro1'), t, wt('G1', 'drives'), 1e9, { dy: 12 });
    const Vm = A / 11, f = 100 * fB(t);
    M.setT($('#rA'), Vm.toFixed(1)); M.setT($('#rF'), f.toFixed(0)); M.setT($('#rT'), (1000 / f).toFixed(1));
    const hl = [M.io((t - wt('AM1', 'amplitude')) / 0.3) * (1 - M.io((t - T0('P1')) / 0.3)), M.io((t - wt('P2', 'frequency')) / 0.3) * (1 - M.io((t - tD) / 0.3)), M.io((t - wt('P1', 'period')) / 0.3) * (1 - M.io((t - T0('P2')) / 0.3))];
    [[0, 1, 2], [3, 4, 5], [6, 7, 8]].forEach((r, i) => r.forEach(j => { roR[j].style.background = j % 3 === 1 ? M.mix('#FFFFFF', C.ac2, hl[i]) : ''; }));
    // wheel + scope
    const wOn = t >= wt('G2', 'picture') - 0.2;
    [P1.ring, P1.axis, P1.hub].forEach(e => M.vis(e, t, wt('G2', 'picture') - 0.2, 1e9, { dy: 0, fade: 0.25 }));
    P1.set(t, wB, tTr, wOn);
    M.vis(pLab[0], t, tTr, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#wvSlow'), t, tTr + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(armL, t, wt('AM2', 'arm') - 0.1, T0('P1'), { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    // amplitude lines
    const aOn2 = t >= wt('AM1', 'peak') - 0.2 && t < T0('P1') + 0.3;
    ampL.forEach((e, i) => { const y = P1.WY + (i ? 1 : -1) * A; PUC.attr(e, 'd', `M${P1.X0},${y.toFixed(1)} H${P1.X0 + P1.SWD}`); M.vis(e, t, wt('AM1', 'peak') - 0.2, T0('P1'), { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); });
    ampT.forEach((e, i) => { PUC.attr(e, 'y', (P1.WY + (i ? 1 : -1) * A + (i ? 26 : -10)).toFixed(1)); M.vis(e, t, wt('AM1', 'write') - 0.1, T0('P1'), { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); });
    // period bracket follows a peak as the wave scrolls
    const pOn = t >= wt('P1', 'time') - 0.2 && t < tF0 - 0.2;
    if (pOn) { const w0 = TAU * f0, T = 1 / f0; let k = Math.floor((thB(t - 0.4) - Math.PI / 2) / TAU); let tp = tRot + (Math.PI / 2 + TAU * k) / w0; const x1 = P1.xOf(t, tp), x2 = P1.xOf(t, tp - T);
      perB(x1, x2, P1.WY - A - 26, x2 < P1.X0 + P1.SWD - 4); PUC.attr(perT, 'x', ((x1 + x2) / 2).toFixed(1)); PUC.attr(perT, 'y', (P1.WY - A - 38).toFixed(1)); M.hide(perT, !(x2 < P1.X0 + P1.SWD - 4));
      perT.style.opacity = M.clamp((t - wt('P1', 'time') + 0.2) / 0.3); }
    else { perB(0, 0, 0, false); M.hide(perT, true); }
    avB(t, wt('P3', 'electrons') + 0.2, out);
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tPh + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tPh - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    const th = (TAU * 0.25 * Math.max(0, t - tD - 0.6)) % TAU, ax = DX + DR * Math.cos(th), ay = DY - DR * Math.sin(th);
    PUC.attr(dArm, 'd', `M${DX},${DY} L${ax.toFixed(1)},${ay.toFixed(1)}`); PUC.attr(dTip, 'cx', ax.toFixed(1)); PUC.attr(dTip, 'cy', ay.toFixed(1));
    const ra = 60, big = th > Math.PI ? 1 : 0;
    PUC.attr(dArc, 'd', th < 0.02 ? '' : `M${DX + ra},${DY} A${ra},${ra} 0 ${big} 0 ${(DX + ra * Math.cos(th)).toFixed(1)},${(DY - ra * Math.sin(th)).toFixed(1)}`);
    PUC.attr(dH, 'd', `M${ax.toFixed(1)},${DY} V${ay.toFixed(1)}`);
    PUC.attr(dThL, 'x', (DX + 74 * Math.cos(th / 2) - 20).toFixed(1)); PUC.attr(dThL, 'y', (DY - 74 * Math.sin(th / 2) + 8).toFixed(1));
    PUC.attr(dHL, 'x', (ax + (Math.cos(th) >= 0 ? 14 : -130)).toFixed(1)); PUC.attr(dHL, 'y', ((ay + DY) / 2 + 8).toFixed(1));
    PUC.attr(dVmL, 'x', (DX + 100 * Math.cos(th) - 14 - 30 * Math.sin(th)).toFixed(1)); PUC.attr(dVmL, 'y', (DY - 100 * Math.sin(th) - 14 * Math.cos(th) + 6).toFixed(1));
    M.vis(dArm, t, tD + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(dTip, t, tD + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis(dThL, t, tDs[2] + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(dArc, t, tDs[2], 1e9, { dy: 0, fade: 0.2 });
    M.vis(dH, t, tDs[3] - 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(dHL, t, tDs[3] - 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(dVmL, t, wt('D4', 'Its'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt(dTurn, t, tDs[0] + 0.2, 0.4);
    dRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tDs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tDs[i] - 0.15); });
    M.vis($('#dBox'), t, tDs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis(dUnit, t, wt('D5', 'instant'), 1e9, { dy: 10 });
  }

  /* PH: phase */
  const phOn = t >= tPh - 0.05 && t < tT + 0.05; M.hide($('#sPh'), !phOn);
  if (phOn) {
    M.vis($('#phL'), t, tPh + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#wv2'), t, tPh + 0.25, 1e9, { dx: 60, dy: 0 });
    M.rise($('#phD'), t, wt('PH1', 'Phase', 1) - 0.1, { st: 0.04 });
    // wave 1 from the start; wave 2 joins at PH2
    P2.set(t, [wP[0]], tPh + 0.2, true);
    const on2 = t >= tPh2;
    if (on2) { const g = P2; const w = wP[1], A = 130, th = w.th(t), x2 = g.WX + A * Math.cos(th), y2 = g.WY - A * Math.sin(th);
      M.hide(g.arm[1], false); M.hide(g.tip[1], false); PUC.attr(g.arm[1], 'd', `M${g.WX},${g.WY} L${x2.toFixed(1)},${y2.toFixed(1)}`); PUC.attr(g.tip[1], 'cx', x2.toFixed(1)); PUC.attr(g.tip[1], 'cy', y2.toFixed(1));
      M.hide(g.proj[1], false); PUC.attr(g.proj[1], 'd', `M${x2.toFixed(1)},${y2.toFixed(1)} H${g.X0 + 6}`);
      let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - (g.SWD - 12) / g.PX * i / 200; if (tau < tPh2) break; const x = g.X0 + 6 + (g.SWD - 12) * i / 200, y = g.WY - A * Math.sin(w.th(tau)); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
      M.hide(g.tr[1], false); PUC.attr(g.tr[1], 'd', d);
      [g.arm[1], g.tip[1], g.proj[1], g.tr[1]].forEach(e => { e.style.opacity = M.clamp((t - tPh2) / 0.3).toFixed(3); });
    } else [P2.arm[1], P2.tip[1], P2.proj[1], P2.tr[1]].forEach(e => M.hide(e, true));
    [P2.ring, P2.axis, P2.hub].forEach(e => M.vis(e, t, tPh + 0.3, 1e9, { dy: 0, fade: 0.25 }));
    M.vis(phLab[0], t, tPh + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(phLab[1], t, tPh2, 1e9, { dy: 0, fade: 0.2 });
    // gap bracket between a wave-2 peak and the next wave-1 peak (a quarter period later)
    const gOn = t >= wt('PH3', 'gap') - 0.3;
    if (gOn) { const w0 = TAU * 0.5, T = 2; let k = Math.floor((thP(t - 0.6) - Math.PI / 2) / TAU); const tp1 = tPh + (Math.PI / 2 + TAU * k) / w0, tp2 = tp1 - T / 4;
      const x1 = P2.xOf(t, tp1), x2 = P2.xOf(t, tp2), y = P2.WY - 130 - 24; gapB(x1, x2, y, x2 < P2.X0 + P2.SWD); PUC.attr(gapT, 'x', ((x1 + x2) / 2).toFixed(1)); PUC.attr(gapT, 'y', (y - 14).toFixed(1)); M.hide(gapT, !(x2 < P2.X0 + P2.SWD)); }
    else { gapB(0, 0, 0, false); M.hide(gapT, true); }
    M.vis($('#phT'), t, wt('PH3', 'leads') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    PUC.write(phE[0], t, tPh2 - 0.1, 0.6); PUC.write(phE[1], t, wt('PH2', 'quarter'), 0.7);
    M.vis(phBox, t, wt('PH4', 'write') - 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write(phG, t, wt('PH4', 'write'), 0.7); M.vis(phN, t, wt('PH4', 'Phi'), 1e9, { dy: 8 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Phase') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(wBig[0], t, wt('W1', 'two') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis(wBig[1], t, wt('W1', 'fifty') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(wBig[2], t, wt('W1', 'fifty') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.draw(wWave, t, tW + 0.6, 1.4, M.o3);
    const x1 = wXs + wW2 / 8, x2 = wXs + wW2 * 5 / 8; wTb(x1, x2, 500, t >= tWs[0]); M.vis(wTt, t, wt('W2', 'twenty'), 1e9, { dy: 0, fade: 0.2 }); wTt.setAttribute('y', 486); wTt.setAttribute('x', (x1 + x2) / 2);
    wPk.forEach(e => M.vis(e, t, tWs[3] - 0.1, 1e9, { dy: 0, fade: 0.2 })); wRm.forEach(e => M.vis(e, t, wt('W4', 'not') - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    wRw.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wBox'), t, tWs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'In') - 0.05, tStrike: wt('X3', 'One'), tRight: wt('X3', 'Divide') - 0.1 });
    PUC.write(tcR[0], t, wt('X2', 'In'), 0.6); PUC.write(tcR[1], t, wt('X3', 'One'), 0.6); PUC.write(tcRes, t, wt('X3', 'Divide'), 0.7);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'definitions') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.4, tCount, tAns });
    M.vis($('#qc'), t, tQ + 0.3, tAns - 0.2, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.draw(qWave, t, tQ + 0.7, 1.2, M.o3); fadeAt([qTb, ...qL], t, wt('Q1', 'Find'), 0.15); PUC.write(qEq, t, wt('Q1', 'is'), 0.7);
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
