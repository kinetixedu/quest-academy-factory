// PUC Electronics Ep 72 - Effects of negative feedback ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, power P gold, R ink; scope CH1 #8FA3C8, CH2 amber
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, GO = C.gold, RED = C.red, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const sub = (e, s, fs = 16) => { const q = mk(e, 'tspan', { 'font-size': fs, dy: 6, 'font-style': 'normal' }); q.textContent = s; return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const pop = (e, t, t0) => M.vis(e, t, t0, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const VP = c(TE, 'V_p'), IP = c(VI, 'I_p'), VCC = c(TE, 'V_{CC}'), PO = c(GO, 'P_{out}'), PD = c(GO, 'P_{dc}'), IDC = c(VI, 'I_{dc}');

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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 160) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
/* npn transistor symbol: circle, base bar, collector and emitter leads (emitter arrow points out) */
const npn = (p, cx, cy, r, s = 1) => {
  const bx = cx - r * 0.42, out = [];
  out.push(mk(p, 'circle', { cx, cy, r, fill: '#fff', stroke: INK, 'stroke-width': 4 }));
  out.push(W(p, `M${bx},${cy - r * 0.56} V${cy + r * 0.56}`, { 'stroke-width': 6 }));
  out.push(W(p, `M${bx},${cy - r * 0.28} L${cx + r * 0.42},${cy - r * 0.9}`));
  out.push(W(p, `M${bx},${cy + r * 0.28} L${cx + r * 0.42},${cy + r * 0.9}`));
  const ex = cx + r * 0.42, ey = cy + r * 0.9, ux = (ex - bx) / Math.hypot(ex - bx, ey - cy - r * 0.28), uy = (ey - cy - r * 0.28) / Math.hypot(ex - bx, ey - cy - r * 0.28), hx = ex - ux * 4, hy = ey - uy * 4, hl = 18 * s;
  out.push(mk(p, 'path', { d: `M${hx},${hy} L${hx - ux * hl - uy * hl * 0.5},${hy - uy * hl + ux * hl * 0.5} L${hx - ux * hl + uy * hl * 0.5},${hy - uy * hl - ux * hl * 0.5} Z`, fill: INK }));
  return out;
};
/* npn mirrored top-to-bottom (collector down, emitter up): outer g for vis, inner g carries the flip */
const npnFlip = (p, cx, cy, r, s = 1) => { const o = mk(p, 'g'), i = mk(o, 'g', { transform: `translate(0,${2 * cy}) scale(1,-1)` }); return { g: o, parts: npn(i, cx, cy, r, s) }; };
/* transformer winding: vertical coil from y0 to y1 at x, n bumps, dir 1 = bulge right, -1 = bulge left */
const coil = (p, x, y0, y1, n, dir) => { const h = (y1 - y0) / n; let d = `M${x},${y0}`; for (let i = 0; i < n; i++) d += ` a${h / 2},${h / 2} 0 0 ${dir > 0 ? 1 : 0} 0,${h}`; return W(p, d); };
const sine = (x0, x1, y, a, ph, k = 22) => { let d = ''; for (let x = x0; x <= x1; x += 4) d += (x === x0 ? 'M' : 'L') + x + ',' + (y - a * Math.sin((x - x0) / k + ph)).toFixed(1); return d; };
/* plot fn(s) for s in [s0, s1] on graph g into path p */
const plot = (g, p, fn, s0, s1, n = 120) => { if (s1 <= s0) { PUC.attr(p, 'd', ''); return; } let d = ''; for (let i = 0; i <= n; i++) { const s = s0 + (s1 - s0) * i / n; d += (i ? 'L' : 'M') + g.X(s).toFixed(1) + ',' + g.Y(fn(s)).toFixed(1); } PUC.attr(p, 'd', d); };
const pth = (p, col, sw = 4, a = {}) => mk(p, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const hump = s => Math.max(0, Math.sin(2 * Math.PI * s)), trough = s => Math.min(0, Math.sin(2 * Math.PI * s));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'builds') - 0.2;
const tP = T0('P1'), tS = T0('S1'), tD = T0('D1'), tG = T0('G1'), tE = T0('E1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const VS = c(TE, 'V_s'), VO = c(TE, 'V_o');
const HZ = 'IBM Plex Mono';

/* ================= A: hook ================= */
const h1S = $('#h1S'), tpS = $('#tpS');
const zones = [[0, 0.42, C.soft, 'too quiet'], [0.42, 0.68, C.okBg, 'just right'], [0.68, 1, C.redBg, 'too loud']].map(([a, b, f, s]) => [mk(h1S, 'rect', { x: 60 + 660 * a, y: 96, width: 660 * (b - a), height: 44, fill: f }), mono(h1S, 60 + 660 * (a + b) / 2, 166, s, { 'text-anchor': 'middle', 'font-size': 18 })]);
const zBox = W(h1S, 'M60,96 H720 V140 H60 Z', { 'stroke-width': 3 });
const markG = mk(h1S, 'g'), mark = mk(markG, 'path', { d: 'M0,86 L-12,70 H12 Z', fill: INK }), markL = mk(h1S, 'line', { x1: 0, y1: 90, x2: 0, y2: 146, stroke: INK, 'stroke-width': 4 });
const music = pth(h1S, AM, 4);
const vol = t => { let v = 0.55; const a = wt('H2', 'quieter'), b = wt('H3', 'new'); if (t >= a - 1.0) v = M.lerp(0.55, 0.26, M.io((t - a + 1.0) / 1.6)); if (t >= b) v = M.lerp(0.26, 0.9, M.io((t - b) / 0.8)); return v; };
const gArc = W(tpS, 'M50,200 A100,100 0 0 1 250,200', { 'stroke-width': 10, stroke: C.line });
const gArcG = W(tpS, 'M95,127 A100,100 0 0 1 200,113', { 'stroke-width': 10, stroke: C.ok, 'stroke-linecap': 'butt' });
const needle = W(tpS, '', { 'stroke-width': 6 }), hub = mk(tpS, 'circle', { cx: 150, cy: 200, r: 12, fill: INK });
const gLb = tx(tpS, 150, 250, 'GAIN', { 'text-anchor': 'middle', 'font-family': HZ, 'font-size': 26 });
const gQ = tx(tpS, 150, 330, '?', { 'text-anchor': 'middle', 'font-size': 72, fill: AM });

/* ================= P: the trade ================= */
const pS = $('#pS');
const coins = [...Array(10)].map((_, i) => { const g = mk(pS, 'g'); mk(g, 'circle', { cx: 74 + i * 70, cy: 170, r: 28, fill: '#F2C14E', stroke: '#B7791F', 'stroke-width': 4 }); tx(g, 74 + i * 70, 180, '×', { 'text-anchor': 'middle', fill: '#B7791F', 'font-size': 26 }); return g; });
const pLb = mono(pS, 36, 110, '', { fill: INK, 'font-weight': 600 });
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);
[...document.querySelectorAll('#pR .ic')].forEach(e => e.innerHTML = M.icon('check', 32, C.ok, 3));

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const inT = mk(ck, 'circle', { cx: 70, cy: 250, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const mix = mk(ck, 'circle', { cx: 200, cy: 250, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const mixX = W(ck, 'M180,250 H220 M200,230 V270', { 'stroke-width': 3 });
const w1 = W(ck, 'M78,250 H166'), w2 = W(ck, 'M234,250 H330');
const amp = W(ck, 'M330,166 L330,334 L494,250 Z', { fill: '#fff' }), ampA = tx(ck, 388, 264, 'A', { 'font-size': 40, 'font-style': 'italic' });
const w3 = W(ck, 'M494,250 H772'), outT = mk(ck, 'circle', { cx: 780, cy: 250, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), nO = mk(ck, 'circle', { cx: 640, cy: 250, r: 7, fill: INK });
const r1 = W(ck, 'M640,250 V290 L626,298 L654,312 L626,326 L654,340 L626,354 L640,362 V384'), r2 = W(ck, 'M640,384 V408 L626,416 L654,430 L626,444 L654,458 L626,472 L640,480 V500');
const gnd = W(ck, 'M616,500 H664 M626,512 H654 M636,524 H644', { 'stroke-width': 3 }), nT = mk(ck, 'circle', { cx: 640, cy: 384, r: 7, fill: INK });
const fbG = mk(ck, 'g'), fb = W(fbG, 'M640,384 H200 V284'), fbF = W(fbG, 'M640,384 H200 V290', { stroke: TE, 'stroke-width': 5, 'stroke-dasharray': '4 22' }), fbH = mk(fbG, 'path', { d: 'M200,286 L191,302 L209,302 Z', fill: INK });
const sgnFb = tx(fbG, 232, 312, '−', { 'font-size': 30, 'text-anchor': 'middle', fill: C.ok });
const fbX = W(ck, 'M410,370 L430,398 M430,370 L410,398', { stroke: RED, 'stroke-width': 4 }), fbXL = mono(ck, 420, 430, 'feedback cut', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600 });
const cLb = [sub(tx(ck, 70, 296, 'V', { fill: TE, 'font-style': 'italic', 'text-anchor': 'middle' }), 's'), sub(tx(ck, 780, 296, 'V', { fill: TE, 'font-style': 'italic', 'text-anchor': 'middle' }), 'o'),
  mono(ck, 200, 198, 'mixer', { 'text-anchor': 'middle' }), mono(ck, 412, 360, 'amplifier', { 'text-anchor': 'middle' }),
  sub(tx(ck, 610, 334, 'R', { 'font-style': 'italic', 'text-anchor': 'end' }), '1'), sub(tx(ck, 610, 452, 'R', { 'font-style': 'italic', 'text-anchor': 'end' }), '2'),
  mono(ck, 676, 440, 'β = R2 / (R1 + R2)', { fill: INK, 'font-weight': 600, 'font-size': 18 })];
// heat shimmer over the amplifier
const shim = [0, 1, 2].map(() => W(ck, '', { stroke: RED, 'stroke-width': 3 }));
// EXAMPLE FIGURES: A 1000 -> 500 when hot; beta 0.1; input 10 mV
const tIn = wt('S3', 'no'), tH1 = wt('S4', 'heats'), tH1e = wt('S5', 'shrinks'), tOn = wt('S7', 'switch'), tH2 = wt('S9', 'Heat'), tH2e = wt('S10', 'hardly');
const heat = t => { let h = M.io((t - tH1) / (tH1e - tH1)); if (t >= tOn - 0.5) h = 1 - M.io((t - tOn + 0.5) / 0.6); if (t >= tH2) h = M.io((t - tH2) / (tH2e - tH2)); return h; };
const Aof = t => 1000 - 500 * heat(t), fbOn = t => t >= tOn, Afof = t => fbOn(t) ? Aof(t) / (1 + 0.1 * Aof(t)) : Aof(t);
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 IN · 20 mV/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, '', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k">A</span><span class="v" id="rA">1000</span><span class="u"></span>
  <span class="k">β</span><span class="v" id="rB">0</span><span class="u"></span>
  <span class="k">A<sub>f</sub></span><span class="v" id="rAf" style="color:#B7791F">1000</span><span class="u"></span>
  <span class="k n">TEMP</span><span class="v" id="rT" style="color:${RED}">25</span><span class="u">°C</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Two resistors keep the gain steady!' });

/* ================= D: derivation ================= */
const dS = $('#dS');
const gD = PUC.graph(dS, { x: 110, y: 90, w: 600, h: 330, xmax: 2000, ymax: 14, xt: [500, 1000, 1500, 2000], yt: [5, 10], yl: 'A f' });
mono(dS, 710, 478, 'open loop gain A', { 'text-anchor': 'end', 'font-size': 18 });
gD.ylab.setAttribute('font-style', 'italic');
const dCv = pth(dS, AM, 5), dOne = mk(dS, 'line', { x1: gD.X(0), y1: gD.Y(10), x2: gD.X(2000), y2: gD.Y(10), stroke: INK, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
const dOneL = mono(dS, gD.X(2000), gD.Y(10) - 14, '1/β = 10', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 });
const dDot = gD.dot(VI, 11), dDot2 = gD.dot(C.dim, 9);
const dRd = mono(dS, gD.X(1000), gD.Y(3), '', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600 });
const dRows = rows($('#dSteps'), [
  [K('A_f = \\dfrac{A}{1 + A\\beta}'), '', 92],
  [K('A\\beta \\gg 1 \\Rightarrow 1 + A\\beta \\approx A\\beta'), '', 196],
  [K('A_f \\approx \\dfrac{A}{A\\beta} = \\dfrac{1}{\\beta}'), 'A cancels', 270],
  [K('\\dfrac{dA_f}{A_f} = \\dfrac{1}{1 + A\\beta}\\cdot\\dfrac{dA}{A}'), '', 378],
  [K('D = 1 + A\\beta'), 'desensitivity factor', 484]]);
const tDR = [wt('D2', 'equals'), wt('D3', 'much'), wt('D4', 'almost'), wt('D7', 'fractional'), wt('D8', 'desensitivity')];

/* ================= G: bandwidth ================= */
const gS = $('#gS');
const gG = PUC.graph(gS, { x: 110, y: 90, w: 600, h: 360, xmax: 6, ymin: 0, ymax: 70, yt: [20, 40, 60], xl: '', yl: 'gain (dB)' });
const fl = v => Math.log10(v) - 1; // x = log10(f) - 1  (0 = 10 Hz, 6 = 10 MHz)
[['100 Hz', 1], ['1 kHz', 2], ['10 kHz', 3], ['100 kHz', 4], ['1 MHz', 5]].forEach(([s, x]) => { gG.mk('line', { x1: gG.X(x), y1: gG.Y(0), x2: gG.X(x), y2: gG.Y(0) + 8, stroke: INK, 'stroke-width': 2 }); mono(gS, gG.X(x), gG.Y(0) + 32, s, { 'text-anchor': 'middle', 'font-size': 16 }); });
mono(gS, gG.X(6), gG.Y(0) + 58, 'frequency (log scale)', { 'text-anchor': 'end', 'font-size': 16 });
const dB = (f, A0, fL, fH) => 20 * Math.log10(A0 / Math.sqrt((1 + (fL / f) ** 2) * (1 + (f / fH) ** 2)));
const gc1 = pth(gS, INK, 5), gc2 = pth(gS, AM, 5);
const gL1 = mono(gS, gG.X(2.5), gG.Y(60) - 12, 'no feedback · gain 1000', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 17 });
const gL2 = mono(gS, gG.X(2.5), gG.Y(40) + 30, 'with feedback · gain 100', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 17 });
const mkV = (x, y, col) => [gG.mk('line', { x1: gG.X(x), y1: gG.Y(y), x2: gG.X(x), y2: gG.Y(0), stroke: col, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), gG.mk('circle', { cx: gG.X(x), cy: gG.Y(y), r: 8, fill: col })];
const vH = [...mkV(fl(20e3), 57, INK), ...mkV(fl(200e3), 37, AM)], vL = [...mkV(fl(200), 57, INK), ...mkV(fl(20), 37, AM)];
const aH = PUC.arrow(gS, C.ok, 4, 14), aL = PUC.arrow(gS, C.ok, 4, 14);
const tilesG = ['#gt0', '#gt1', '#gt2'].map(s => $(s)); $('#gZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= E: distortion, noise, impedance ================= */
const eS = $('#eS');
mk(eS, 'line', { x1: 40, y1: 260, x2: 744, y2: 260, stroke: C.line, 'stroke-width': 2 });
const eRef = pth(eS, CH1, 3, { 'stroke-dasharray': '8 7' }), eOut = pth(eS, AM, 5);
const eLb = [mono(eS, 40, 112, 'ideal shape', { fill: '#5F7399', 'font-weight': 600 }), mono(eS, 40, 430, 'amplifier output', { fill: '#B7791F', 'font-weight': 600 })];
const dirty = x => { const s = Math.sin(x); return Math.sign(s) * Math.min(Math.abs(s), 0.62) / 0.62 * 0.9 + 0.13 * Math.sin(7.3 * x) + 0.08 * Math.sin(17.1 * x + 1); };

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K('A = 1000'), K('\\beta = 0.019'), K('f_H = 25\\,\\text{kHz}')].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wRows = rows($('#wSteps'), [
  [K('1 + A\\beta = 1 + 19 = 20'), '', 92],
  [K('A_f = 1000/20 = 50'), '', 176],
  [K('\\dfrac{dA_f}{A_f} = \\dfrac{10\\%}{20} = 0.5\\%'), 'steady', 248],
  [K("f_H' = 25\\,\\text{kHz} \\times 20"), '', 350],
  [K("f_H' = 500\\,\\text{kHz}"), '20 times wider', 432]]);
const tWR = [wt('W3', 'First'), wt('W4', 'gain'), wt('W6', 'changes'), wt('W7', 'new'), wt('W8', 'That')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Negative feedback shrinks the bandwidth', right: 'Gain falls, bandwidth widens by (1 + Aβ)', y0: 96, y1: 184 });
const tcS = $('#tcS');
mk(tcS, 'line', { x1: 10, y1: 180, x2: 370, y2: 180, stroke: INK, 'stroke-width': 2.5 });
const xB1 = mk(tcS, 'rect', { x: 140, y: 30, width: 100, height: 150, fill: 'none', stroke: INK, 'stroke-width': 4 }), xB2 = mk(tcS, 'rect', { x: 20, y: 120, width: 340, height: 60, fill: C.okBg, stroke: C.ok, 'stroke-width': 4 });
const xLb = [mono(tcS, 190, 20, 'without', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(tcS, 300, 158, 'with feedback', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 18 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'List the effects of negative feedback, derive gain stability, solve gain and bandwidth problems' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An amplifier has gain 500 and upper cut-off 40&nbsp;kHz. Negative feedback with β&nbsp;=&nbsp;0.018 is added. Find the new gain and upper cut-off.', qW: 780,
  opts: ['50 and 4 kHz', '50 and 400 kHz', '5000 and 400 kHz', '55.6 and 360 kHz'], right: 1, optW: 474, optY: 330, optFs: 28 });
const sol = PUC.solution($('#so'), [[K('A\\beta = 500 \\times 0.018 = 9')], [K('A_f = \\dfrac{500}{1 + 9} = 50')], [K("f_H' = 40\\,\\text{kHz} \\times 10")], [K("f_H' = 400\\,\\text{kHz}")]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'beta'), wt('A3', 'gain'), wt('A4', 'rises'), wt('A4', 'becomes')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'Effects of negative feedback · formula card (Z: voltage series)', txt: [0, 0, 0, 0, 1],
  lines: [K('A_f = A/(1 + A\\beta) \\approx 1/\\beta'), K('dA_f/A_f = (dA/A)\\,/\\,(1 + A\\beta)'), K("f_H' = f_H\\,(1 + A\\beta) \\qquad f_L' = f_L / (1 + A\\beta)"),
    K("Z_{in}' = Z_{in}(1 + A\\beta) \\qquad Z_{out}' = Z_{out}/(1 + A\\beta)"), 'Distortion and noise ÷ (1 + Aβ) · the price: gain ÷ (1 + Aβ)'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 73', topic: 'The emitter follower', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('D5', 'cancelled'), 1.08, 620, 560], [T1('D5'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[wt('S2', 'amplifier') - 0.2, tD - 0.4], [tD + 0.2, tE - 0.4]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    const t1 = wt('H1', 'amplifier') - 0.2;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); pop($('#h1T'), t, t1 + 0.3);
    zones.forEach(([r, l], i) => { M.vis(r, t, t1 + 0.2 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(l, t, t1 + 0.4 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); }); M.draw(zBox, t, t1 + 0.2, 0.5);
    const v = vol(t), mx = 60 + 660 * v; mark.setAttribute('transform', `translate(${mx.toFixed(1)},0)`); PUC.attr(markL, 'x1', mx.toFixed(1)); PUC.attr(markL, 'x2', mx.toFixed(1));
    M.vis(markG, t, t1 + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(markL, t, t1 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(music, 'd', sine(60, 720, 226, 40 * v, -6 * t, 14)); M.vis(music, t, t1 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#h1T'), t >= wt('H3', 'new') - 0.2 ? 'NEW TRANSISTOR' : t >= wt('H2', 'evening') - 0.1 ? 'EVENING · HOT' : 'MORNING');
    $('#h1T').style.background = t >= wt('H2', 'evening') - 0.1 ? RED : INK;
    const t2 = wt('H4', 'How') - 0.3;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o });
    pop($('#h2a'), t, wt('H4', 'amplifier')); pop($('#h2b'), t, wt('H4', 'parts')); pop($('#h2c'), t, wt('H4', 'Negative') - 0.2);
    fadeAt([gArc, gArcG, needle, hub, gLb], t, wt('H1', 'perfect') - 0.4, 0.08);
    const ang = Math.PI * (1 - v); PUC.attr(needle, 'd', `M150,200 L${(150 + 86 * Math.cos(ang)).toFixed(1)},${(200 - 86 * Math.sin(ang)).toFixed(1)}`);
    M.vis(gQ, t, wt('H4', 'How'), wt('H4', 'Negative') - 0.2, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, outDur: 0.2, ody: 0 });
    pop($('#aPill'), t, wt('H4', 'Negative') - 0.1);
  }

  /* P: the trade */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P3', 'return') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pStrip'), t, wt('P1', 'trade') - 0.3, 1e9, { dy: 24 }); pop($('#pLess'), t, wt('P2', 'boost') - 0.1);
    const tg = wt('P2', 'give') - 0.1, u = M.io((t - tg) / 1.2);
    coins.forEach((g, i) => { M.vis(g, t, tP + 0.3 + i * 0.04, i ? tg + 0.1 * (9 - i) : 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, outDur: 0.25, ody: -20 }); });
    M.vis(pLb, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.setT(pLb, t >= tg + 0.6 ? 'GAIN AFTER FEEDBACK' : 'GAIN BEFORE');
    M.vis($('#pG1'), t, tP + 0.4, 1e9, { dy: 10 }); M.vis($('#pG'), t, tP + 0.4, 1e9, { dy: 0, fade: 0.2 }); $('#pG i').style.width = (712 * M.lerp(1, 0.1, u) * M.io((t - tP - 0.4) / 0.6)).toFixed(1) + 'px';
    const tt = [wt('P4', 'steady'), wt('P4', 'wider'), wt('P5', 'Less'), wt('P6', 'input')];
    ['#pt0', '#pt1', '#pt2', '#pt3'].forEach((s, i) => { const e = $(s); M.vis(e, t, tt[i] - 0.2, 1e9, { dy: 20 }); M.vis(e.querySelector('.ic'), t, tt[i] + 0.2, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      const on = t >= tt[i] - 0.2 && (i === 3 || t < tt[i + 1] - 0.2); e.style.borderColor = on ? C.ok : C.soft; e.style.background = on ? C.okBg : C.soft; });
  }

  /* B: breadboard */
  const bOn = t >= tS - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tS + 0.45, out, { dy: 36, ...o });
    const t2 = wt('S2', 'amplifier') - 0.2;
    fadeAt([inT, cLb[0], mix, mixX, cLb[2]], t, t2, 0.08); drawSeq([w1, w2], t, t2 + 0.2, 0.3, 0.1); M.draw(amp, t, t2 + 0.3, 0.5); fadeAt([ampA, cLb[3]], t, t2 + 0.6, 0.1);
    drawSeq([w3], t, t2 + 0.7, 0.4); fadeAt([outT, cLb[1], nO], t, t2 + 1.0, 0.1);
    drawSeq([r1, r2, gnd], t, t2 + 1.1, 0.35, 0.12); fadeAt([nT, cLb[4], cLb[5], cLb[6]], t, t2 + 1.5, 0.08);
    const on = fbOn(t);
    M.vis(fbG, t, tOn - 0.1, 1e9, { dy: 0, fade: 0.3 }); PUC.attr(fbF, 'stroke-dashoffset', (-60 * (t - tOn)).toFixed(1));
    M.vis(fbX, t, tIn - 0.1, tOn - 0.1, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); M.vis(fbXL, t, tIn, tOn - 0.1, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 });
    M.vis($('#tg'), t, tIn - 0.2, 1e9, { dy: 10 });
    $('#tg .tr i').style.transform = `translateX(${on ? 30 : 0}px)`; $('#tg .tr').style.background = on ? C.ok : '#CBD0DA'; M.setT($('#tgV'), on ? 'ON · β = 0.1' : 'OFF');
    const h = heat(t);
    shim.forEach((s, i) => { const show = h > 0.05 && t >= tH1; M.hide(s, !show); if (!show) return; const x = 380 + i * 34, ph = (t * 1.3 + i * 0.3) % 1, y = 150 - 36 * ph;
      PUC.attr(s, 'd', `M${x},${(y + 24).toFixed(1)} q7,-6 0,-12 q-7,-6 0,-12`); PUC.attr(s, 'opacity', (h * (1 - ph)).toFixed(2)); });
    PUC.attr(amp, 'fill', M.mix('#FFFFFF', C.redBg, h));
    const A = Aof(t), Af = Afof(t);
    M.vis($('#ro1'), t, tS + 0.6, 1e9, { dy: 12 });
    M.setT($('#rA'), String(Math.round(A))); M.setT($('#rB'), on ? '0.1' : '0'); M.setT($('#rAf'), on ? Af.toFixed(2) : String(Math.round(Af))); M.setT($('#rT'), String(Math.round(25 + 35 * h)));
    M.vis($('#rgT'), t, tIn - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), on ? 'NEGATIVE FEEDBACK' : 'NO FEEDBACK'); $('#rgT').style.background = on ? C.ok : INK;
    M.vis($('#slowT'), t, tIn, 1e9, { dy: 0, fade: 0.2 });
    tr1(u => 23 * Math.sin(Math.PI * (u - tIn)), t, tIn - 0.2, 5, 46, t >= tIn - 0.2);
    tr2(u => (fbOn(u) ? 46 * Afof(u) / 10.1 : 46 * Aof(u) / 1000) * Math.sin(Math.PI * (u - tIn)), t, tIn - 0.2, 5, 125, t >= tIn - 0.2);
    M.setT(scL[1], on ? 'CH2 OUT · 100 mV/div' : 'CH2 OUT · 10 V/div'); fadeAt(scL, t, tIn - 0.2, 0.1);
    avB(t, wt('S11', 'resistors') - 0.4, T1('S11') + 0.4);
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tG + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tG - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    plot(gD, dCv, a => a / (1 + 0.1 * a), 0, 2000 * M.clamp((t - tDR[0]) / 1.6), 160);
    M.draw(dOne, t, tDR[2] + 0.3, 0.6); M.vis(dOneL, t, tDR[2] + 0.7, 1e9, { dy: 0, fade: 0.2 });
    const t5 = wt('D5', 'cancelled') - 0.4; let a = 1000; if (t >= t5) a = 1000 - 500 * (0.5 - 0.5 * Math.cos(2.2 * (t - t5)));
    dDot(a, a / (1 + 0.1 * a), t >= t5 - 0.3); dDot2(a, 0.4, t >= t5 - 0.3);
    M.vis(dRd, t, t5, 1e9, { dy: 0, fade: 0.2 }); M.setT(dRd, `A = ${Math.round(a)}  →  A f = ${(a / (1 + 0.1 * a)).toFixed(2)}`);
    M.vis($('#dP'), t, wt('D5', 'cancelled') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* G: bandwidth */
  const gOn = t >= tG - 0.05 && t < tE + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tE - 0.32;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, wt('G4', 'With') - 0.3, out, { dx: 60, dy: 0, ...o });
    const g3 = wt('G3', 'Without') - 0.2, g4 = wt('G4', 'With') - 0.1;
    plot(gG, gc1, x => Math.max(0, dB(10 ** (x + 1), 1000, 200, 20e3)), 0, 6 * M.clamp((t - g3) / 1.6), 200);
    plot(gG, gc2, x => Math.max(0, dB(10 ** (x + 1), 100, 20, 200e3)), 0, 6 * M.clamp((t - g4) / 1.6), 200);
    M.vis(gL1, t, g3 + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(gL2, t, g4 + 0.8, 1e9, { dy: 0, fade: 0.2 });
    const g5 = wt('G5', 'upper') - 0.2, g6 = wt('G6', 'lower') - 0.2;
    fadeAt(vH, t, g5, 0.15); fadeAt(vL, t, g6, 0.15);
    const uh = M.io((t - g5 - 0.5) / 0.6), ul = M.io((t - g6 - 0.5) / 0.6);
    aH.set(gG.X(fl(20e3)), gG.Y(18), gG.X(fl(20e3)) + (gG.X(fl(200e3)) - gG.X(fl(20e3))) * uh, gG.Y(18)); aL.set(gG.X(fl(200)), gG.Y(18), gG.X(fl(200)) - (gG.X(fl(200)) - gG.X(fl(20))) * ul, gG.Y(18));
    const act = t < g5 ? 0 : t < g6 ? 1 : 2;
    tilesG.forEach((e, i) => { const ti = [wt('G4', 'drops') - 0.2, g5, g6][i]; M.vis(e, t, ti, 1e9, { dy: 20 }); const on = act === i && t >= ti; e.style.borderColor = on ? AM : C.soft; e.style.background = on ? C.ac2 : C.soft; });
    M.vis($('#gStrip'), t, wt('G7', 'Gain') - 0.2, 1e9, { dy: 24 });
  }

  /* E: distortion, noise, impedance */
  const eOn = t >= tE - 0.05 && t < tT + 0.05; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = tT - 0.32;
    M.vis($('#eL'), t, tE + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#eR'), t, wt('E3', 'voltage') - 0.3, out, { dx: 60, dy: 0, ...o });
    const k = M.io((t - wt('E2', 'shrink') + 0.2) / 1.0), ph = -2.5 * (t - tE);
    let d1 = '', d2 = ''; for (let x = 40; x <= 744; x += 4) { const s = (x - 40) / 56 + ph; d1 += (x > 40 ? 'L' : 'M') + x + ',' + (260 - 130 * Math.sin(s)).toFixed(1); d2 += (x > 40 ? 'L' : 'M') + x + ',' + (260 - 130 * M.lerp(dirty(s), 0.96 * Math.sin(s) + 0.012 * Math.sin(7.3 * s), k)).toFixed(1); }
    PUC.attr(eRef, 'd', d1); PUC.attr(eOut, 'd', d2); M.vis(eRef, t, tE + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(eOut, t, tE + 0.6, 1e9, { dy: 0, fade: 0.3 }); fadeAt(eLb, t, tE + 0.6, 0.2);
    pop($('#eT'), t, tE + 0.4); M.setT($('#eT'), k > 0.5 ? 'WITH FEEDBACK' : 'NO FEEDBACK'); $('#eT').style.background = k > 0.5 ? C.ok : INK;
    M.vis($('#eP'), t, wt('E2', 'shrink'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const ta = wt('E3', 'input') - 0.2, tb = wt('E4', 'output') - 0.2;
    M.vis($('#eA1'), t, ta, 1e9, { dy: 10 }); M.vis($('#eA'), t, ta, 1e9, { dy: 0, fade: 0.2 }); $('#eA i').style.width = (540 * M.lerp(0.1, 1, M.io((t - wt('E3', 'rises')) / 0.8))).toFixed(1) + 'px'; M.vis($('#eAv'), t, wt('E3', 'rises') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#eB1'), t, tb, 1e9, { dy: 10 }); M.vis($('#eB'), t, tb, 1e9, { dy: 0, fade: 0.2 }); $('#eB i').style.width = (540 * M.lerp(1, 0.1, M.io((t - wt('E4', 'falls')) / 0.8))).toFixed(1) + 'px'; M.vis($('#eBv'), t, wt('E4', 'falls') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    pop($('#eQ1'), t, wt('E5', 'high') - 0.1); pop($('#eQ2'), t, wt('E5', 'low') - 0.1);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Get') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W1', 'thousand'), wt('W2', 'Beta'), wt('W2', 'upper')];
    wGiv.forEach((e, i) => pop(e, t, tg[i] - 0.1));
    runRows(wRows, t, tWR);
    const ta = wt('W5', 'ten') - 0.2, tb = tWR[2] + 0.4;
    M.vis($('#wA1'), t, ta, 1e9, { dy: 10 }); M.vis($('#wA'), t, ta, 1e9, { dy: 0, fade: 0.2 }); $('#wA i').style.width = (520 * M.io((t - ta) / 0.6)).toFixed(1) + 'px'; M.vis($('#wAv'), t, ta + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wB1'), t, tb, 1e9, { dy: 10 }); M.vis($('#wB'), t, tb, 1e9, { dy: 0, fade: 0.2 }); $('#wB i').style.width = (26 * M.io((t - tb) / 0.4)).toFixed(1) + 'px'; M.vis($('#wBv'), t, tb + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const tc = tg[2], tw = tWR[4];
    M.vis($('#wC1'), t, tc, 1e9, { dy: 10 }); M.vis($('#wC'), t, tc, 1e9, { dy: 0, fade: 0.2 }); $('#wC i').style.width = (M.lerp(26, 520, M.io((t - tw) / 0.8)) * M.io((t - tc) / 0.4)).toFixed(1) + 'px';
    M.vis($('#wCv'), t, tc + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.setT($('#wCv'), t >= tw + 0.4 ? '500 kHz' : '25 kHz');
    M.vis($('#wBox'), t, tw + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'gain') - 0.2 });
    M.vis(xB1, t, tX + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(xLb[0], t, tX + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis(xB2, t, wt('X3', 'widens') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(xLb[1], t, wt('X3', 'widens'), 1e9, { dy: 0, fade: 0.2 });
    pop($('#tcP'), t, wt('X3', 'widens')); pop($('#tcQ'), t, wt('X4', 'up') - 0.2);
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'List') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
