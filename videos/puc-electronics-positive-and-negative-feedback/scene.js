// PUC Electronics Ep 71 - Positive and negative feedback ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'college') - 0.2;
const tP = T0('P1'), tS = T0('S1'), tD = T0('D1'), tT = T0('T1'), tU = T0('U1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tU], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const VS = c(TE, 'V_s'), VO = c(TE, 'V_o'), VI_ = c(TE, 'V_i');

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S'), tpS = $('#tpS');
mk(h1S, 'line', { x1: 24, y1: 236, x2: 760, y2: 236, stroke: C.line, 'stroke-width': 3 });
const spk = [W(h1S, 'M600,120 H640 V210 H600 Z', { fill: '#fff' }), W(h1S, 'M640,120 L690,84 V236 L640,210', { fill: '#fff' })];
const micG = mk(h1S, 'g'), micI = mk(micG, 'g');
W(micI, 'M-14,96 a14,14 0 0 1 28,0 v34 a14,14 0 0 1 -28,0 Z', { fill: '#fff' }); W(micI, 'M0,144 V234', { 'stroke-width': 3 });
const scr = W(h1S, '', { stroke: RED, 'stroke-width': 4 });
const calm = [0, 1].map(i => W(h1S, `M${580 - i * 20},${140 - i * 12} Q${560 - i * 30},165 ${580 - i * 20},${190 + i * 12}`, { stroke: AM, 'stroke-width': 4 }));
const micX = t => { const a = wt('H1', 'walks'), b = wt('H2', 'steps'), d = wt('H3', 'back'); let x = 120 + 120 * M.io((t - a) / 1.6); if (t >= b - 0.3) x = M.lerp(240, 470, M.io((t - b + 0.3) / 0.9)); if (t >= d - 0.3) x = M.lerp(470, 160, M.io((t - d + 0.3) / 0.9)); return x; };
const dist = mono(h1S, 0, 266, '', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 });
// loop card
const nd = [['microphone', 130], ['amplifier', 392], ['speaker', 654]].map(([s, x]) => { const g = mk(h2S, 'g'); mk(g, 'rect', { x: x - 100, y: 104, width: 200, height: 56, rx: 12, fill: C.soft }); tx(g, x, 140, s, { 'text-anchor': 'middle', 'font-size': 22 }); return g; });
const la = [PUC.arrow(h2S, INK, 4, 14), PUC.arrow(h2S, INK, 4, 14)];
const back = W(h2S, 'M654,160 V214 Q654,236 632,236 H152 Q130,236 130,214 V170', { stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const backH = mk(h2S, 'path', { d: 'M130,162 L121,178 L139,178 Z', fill: RED });
const backL = mono(h2S, 392, 228, 'sound goes back in', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600 });
// tpS: amplifier box with a loop
const tB = W(tpS, 'M90,150 H210 V250 H90 Z', { fill: '#fff' }), tA = tx(tpS, 150, 212, 'A', { 'text-anchor': 'middle', 'font-size': 40, 'font-style': 'italic' });
const tpW = [W(tpS, 'M20,200 H90'), W(tpS, 'M210,200 H280'), W(tpS, 'M250,200 V320 H50 V200', { stroke: TE, 'stroke-dasharray': '10 8' })];
const tL = [mono(tpS, 20, 186, 'in', { fill: TE, 'font-weight': 600 }), mono(tpS, 280, 186, 'out', { fill: TE, 'font-weight': 600, 'text-anchor': 'end' }), mono(tpS, 150, 350, 'part of output, back', { fill: TE, 'font-weight': 600, 'text-anchor': 'middle', 'font-size': 18 })];

/* ================= P: bicycle + crowd ================= */
const pS = $('#pS');
const road = [W(pS, 'M40,120 H744', { stroke: C.dim }), W(pS, 'M40,320 H744', { stroke: C.dim }), W(pS, 'M40,220 H744', { stroke: C.line, 'stroke-dasharray': '18 16', 'stroke-width': 3 })];
const trail = pth(pS, VI, 3, { 'stroke-dasharray': '6 6' });
const bikeG = mk(pS, 'g'), bike = mk(bikeG, 'g');
mk(bike, 'rect', { x: -30, y: -10, width: 60, height: 20, rx: 10, fill: INK }); mk(bike, 'circle', { cx: -26, cy: 0, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 }); mk(bike, 'circle', { cx: 26, cy: 0, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const drift = mono(pS, 0, 0, 'drifts left', { fill: RED, 'font-weight': 600, 'text-anchor': 'middle' }), steer = mono(pS, 0, 0, 'steer right', { fill: C.ok, 'font-weight': 600, 'text-anchor': 'middle' });
const stA = PUC.arrow(pS, C.ok, 5, 16);
const tb0 = wt('P2', 'bicycle') - 0.3, tb1 = wt('P3', 'drifts'), tb2 = wt('P3', 'steer');
const bikeAt = t => { const x = 80 + 600 * M.clamp((t - tb0) / (T1('P4') - tb0)); let y = 220; if (t >= tb1 - 0.2) y = 220 - 56 * M.io((t - tb1 + 0.2) / 0.8); if (t >= tb2) y = M.lerp(164, 220, M.io((t - tb2) / 1.2)); return [x, y]; };
const pS2 = $('#pS2');
const ppl = [...Array(21)].map((_, i) => mk(pS2, 'circle', { cx: 80 + (i % 7) * 104, cy: 110 + Math.floor(i / 7) * 74, r: 26, fill: C.soft, stroke: INK, 'stroke-width': 3 }));
const order = [10, 3, 17, 9, 11, 2, 4, 16, 18, 8, 12, 1, 5, 15, 19, 0, 6, 7, 13, 14, 20];
const crowdN = t => { const a = wt('P6', 'few'), b = wt('P6', 'louder'); if (t < a) return 0; if (t < b) return 2 + Math.floor(2 * M.clamp((t - a) / (b - a))); return Math.min(21, Math.floor(4 * Math.exp(1.1 * (t - b)))); };
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4); $('#pZ2').innerHTML = M.icon('zap', 32, AM, 2.4);

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
const fb = W(ck, 'M640,384 H200 V284'), fbF = W(ck, 'M640,384 H200 V290', { stroke: TE, 'stroke-width': 5, 'stroke-dasharray': '4 22' }), fbH = mk(ck, 'path', { d: 'M200,286 L191,302 L209,302 Z', fill: INK });
const sgnIn = tx(ck, 150, 230, '+', { 'font-size': 26, 'text-anchor': 'middle' }), sgnFb = tx(ck, 232, 312, '−', { 'font-size': 30, 'text-anchor': 'middle' });
const cLb = [sub(tx(ck, 70, 296, 'V', { fill: TE, 'font-style': 'italic', 'text-anchor': 'middle' }), 's'), sub(tx(ck, 780, 296, 'V', { fill: TE, 'font-style': 'italic', 'text-anchor': 'middle' }), 'o'),
  mono(ck, 200, 198, 'mixer', { 'text-anchor': 'middle' }), mono(ck, 412, 360, 'amplifier', { 'text-anchor': 'middle' }),
  sub(tx(ck, 610, 334, 'R', { 'font-style': 'italic', 'text-anchor': 'end' }), '1'), sub(tx(ck, 610, 452, 'R', { 'font-style': 'italic', 'text-anchor': 'end' }), '2'),
  mono(ck, 420, 414, 'feedback  β V o', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600 }), mono(ck, 676, 440, 'β = R2 / (R1 + R2)', { fill: INK, 'font-weight': 600, 'font-size': 18 })];
// EXAMPLE FIGURES: A = 100; negative beta 0.01 (Af 50); positive beta 0.005 (Af 200) then 0.01 (A beta = 1: oscillates)
const tNeg = wt('S6', 'negative'), tPos = wt('S8', 'flip'), tRaise = wt('S9', 'raise'), tRun = wt('S10', 'feeds'), tOff = wt('S11', 'no');
const beta = t => t < tPos ? 0.01 : t < tRaise ? 0.005 : 0.01;
const posFb = t => t >= tPos;
const vsA = t => t < tNeg - 0.3 ? 0 : t < tOff ? 1 : Math.max(0, 1 - (t - tOff) / 0.4);
const outA = t => { if (t < tNeg - 0.3) return 0; if (t < tPos) return M.lerp(100, 50, M.io((t - tNeg) / 0.8)); if (t < tRaise) return M.lerp(50, 200, M.io((t - tPos) / 0.8)); return 200 + 400 * M.io((t - tRaise) / 1.6); };
const sigIn = u => vsA(u) * Math.sin(Math.PI * (u - tNeg));
const sigOut = u => { const a = outA(u); if (u < tRaise) return a / 200 * Math.sin(Math.PI * (u - tNeg)); const k = M.clamp((u - tRaise) / 1.6), s = Math.sin(Math.PI * (u - tNeg) * (1 + 0.6 * k)); return Math.max(-1, Math.min(1, a / 200 * s)); };
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
mk($('#scS'), 'line', { x1: 0, y1: 125 - 52, x2: 592, y2: 125 - 52, stroke: RED, 'stroke-width': 1.5, 'stroke-dasharray': '6 6', opacity: 0.8 }); mk($('#scS'), 'line', { x1: 0, y1: 125 + 52, x2: 592, y2: 125 + 52, stroke: RED, 'stroke-width': 1.5, 'stroke-dasharray': '6 6', opacity: 0.8 });
const scL = [mono($('#scS'), 4, 212, 'CH1 INPUT V s', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 OUTPUT V o', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k">A</span><span class="v" id="rA">100</span><span class="u"></span>
  <span class="k">β</span><span class="v" id="rB">0.01</span><span class="u"></span>
  <span class="k">Aβ</span><span class="v" id="rAB">1.0</span><span class="u"></span>
  <span class="k">A<sub>f</sub></span><span class="v" id="rAf" style="color:${AM === '#E8A317' ? '#B7791F' : AM}">50</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So that is why the mic screamed!' });

/* ================= D: derivation ================= */
const dS = $('#dS');
const dMix = [mk(dS, 'circle', { cx: 170, cy: 200, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(dS, 'M152,200 H188 M170,182 V218', { 'stroke-width': 3 })];
const dAmp = [W(dS, 'M300,130 L300,270 L440,200 Z', { fill: '#fff' }), tx(dS, 348, 214, 'A', { 'font-size': 36, 'font-style': 'italic' })];
const dBeta = [W(dS, 'M380,330 H500 V400 H380 Z', { fill: '#fff' }), tx(dS, 440, 376, 'β', { 'font-size': 34, 'font-style': 'italic', 'text-anchor': 'middle' })];
const dW = [W(dS, 'M50,200 H140'), W(dS, 'M200,200 H300'), W(dS, 'M440,200 H720'), W(dS, 'M620,200 V365 H500'), W(dS, 'M380,365 H170 V236')];
const dH = [mk(dS, 'path', { d: 'M170,232 L161,248 L179,248 Z', fill: INK }), mk(dS, 'circle', { cx: 620, cy: 200, r: 6, fill: INK })];
const dLb = [sub(tx(dS, 50, 180, 'V', { fill: TE, 'font-style': 'italic' }), 's'), sub(tx(dS, 720, 180, 'V', { fill: TE, 'font-style': 'italic', 'text-anchor': 'end' }), 'o'), sub(tx(dS, 210, 180, 'V', { fill: TE, 'font-style': 'italic' }), 'i'),
  tx(dS, 278, 400, 'β V', { fill: TE, 'font-style': 'italic', 'text-anchor': 'middle' }), tx(dS, 136, 256, '−', { 'font-size': 30 })];
sub(dLb[3], 'o');
const dNote = [mono(dS, 440, 300, 'open loop gain', { 'text-anchor': 'middle' }), mono(dS, 440, 436, 'feedback ratio', { 'text-anchor': 'middle' })];
const dRows = rows($('#dSteps'), [
  [K(`${VI_} = ${VS} - \\beta ${VO}`), 'what A sees', 92],
  [K(`${VO} = A\\,${VI_}`), '', 170],
  [K(`${VO} = A\\,(${VS} - \\beta ${VO})`), '', 248],
  [K(`${VO}\\,(1 + A\\beta) = A\\,${VS}`), 'collect V<sub>o</sub>', 326],
  [K('A_f = \\dfrac{A}{1 + A\\beta}'), 'negative feedback', 404],
  [K('A_f = \\dfrac{A}{1 - A\\beta}'), 'positive feedback', 504]]);
const tDR = [wt('D2', 'minus'), wt('D3', 'output'), wt('D4', 'equals'), wt('D5', 'together'), wt('D6', 'equals'), wt('D8', 'equals')];

/* ================= U: uses ================= */
const uS1 = $('#uS1'), uS2 = $('#uS2');
const uw1 = pth(uS1, C.ok, 4), uw2 = pth(uS2, RED, 4);
$('#uZ1').innerHTML = M.icon('zap', 32, AM, 2.4); $('#uZ2').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K('A = 1000'), 'negative ' + K('\\beta = 0.01'), 'positive ' + K('\\beta = 0.0005')].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wRows = rows($('#wSteps'), [
  [K('A\\beta = 1000 \\times 0.01 = 10'), '', 92],
  [K('A_f = \\dfrac{1000}{1 + 10}'), '', 168],
  [K('A_f \\approx 91'), 'negative: gain falls', 268],
  [K('A\\beta = 1000 \\times 0.0005 = 0.5'), '', 348],
  [K('A_f = \\dfrac{1000}{1 - 0.5} = 2000'), 'positive', 432]]);
const tWR = [wt('W3', 'First'), wt('W4', 'equals'), wt('W5', 'About'), wt('W7', 'beta'), wt('W7', 'equals')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Negative feedback: ' + K('A_f = A/(1 - A\\beta)'), right: 'Negative feedback: ' + K('A_f = A/(1 + A\\beta)'), y0: 96, y1: 184 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Define feedback, draw the block diagram, derive the gain with feedback, solve small problems' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An amplifier has an open loop gain of 200. Negative feedback with β&nbsp;=&nbsp;0.045 is added. What is the new gain?', qW: 780,
  opts: ['22.2', '2000', '20', '−25'], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K('A\\beta = 200 \\times 0.045 = 9')], [K('A_f = \\dfrac{200}{1 + 9}')], [K('A_f = 20')]], { dy: 130, y0: 100 });
const tSol = [wt('A2', 'beta'), wt('A3', 'equals'), wt('A4', 'twenty')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'Positive and negative feedback · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K('\\text{Negative: } A_f = A/(1 + A\\beta)'), K('\\text{Positive: } A_f = A/(1 - A\\beta)'), K(`\\beta = V_f / ${VO} \\quad (\\text{feedback ratio, } 0 \\text{ to } 1)`),
    'Positive feedback with Aβ = 1 → the circuit oscillates', 'Negative: steady gain, less noise · Positive: oscillators'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 72', topic: 'Effects of negative feedback', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('D6', 'gain'), 1.08, 1340, 560], [T1('D7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tNeg - 0.3, tD - 0.4]];

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
    const t1 = wt('H1', 'walks') - 0.3;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); pop($('#h1T'), t, t1 + 0.3);
    fadeAt(spk, t, t1 + 0.2, 0.1); M.vis(micG, t, t1 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const mx = micX(t); micI.setAttribute('transform', `translate(${mx.toFixed(1)},0)`);
    const near = M.clamp((mx - 300) / 170), ts = wt('H2', 'Suddenly'), screaming = t >= ts - 0.1 && t < wt('H3', 'back') + 0.2;
    const sa = screaming ? Math.min(1, (t - ts + 0.1) / 0.5) : 0;
    let d = ''; for (let x = mx + 22; x <= 594; x += 6) d += (d ? 'L' : 'M') + x + ',' + (150 + 34 * sa * Math.sin(x / 7 + 30 * t) * Math.sin(x / 41)).toFixed(1);
    PUC.attr(scr, 'd', d); M.hide(scr, sa <= 0.01);
    calm.forEach((a, i) => { M.hide(a, screaming || t < t1 + 0.5); PUC.attr(a, 'opacity', (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(5 * t - i))).toFixed(2)); });
    M.setT($('#h1T'), screaming ? 'SCREAM!' : 'QUIET'); $('#h1T').style.background = screaming ? RED : INK;
    PUC.attr(dist, 'x', ((mx + 600) / 2).toFixed(1)); M.setT(dist, near > 0.6 ? 'too close' : 'far away'); dist.setAttribute('fill', near > 0.6 ? RED : MU); M.vis(dist, t, t1 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const t4 = wt('H4', 'sound') - 0.3;
    M.vis($('#h2C'), t, t4, out, { dx: 60, dy: 0, ...o }); pop($('#h2T'), t, wt('H4', 'loop', 1) - 0.1);
    nd.forEach((g, i) => M.vis(g, t, t4 + 0.2 + i * 0.15, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }));
    const ua = M.io((t - t4 - 0.6) / 0.4), ub = M.io((t - t4 - 0.8) / 0.4);
    la[0].set(232, 132, 232 + 58 * ua, 132); la[1].set(494, 132, 494 + 58 * ub, 132);
    M.draw(back, t, wt('H4', 'looped') - 0.1, 0.9); M.vis(backH, t, wt('H4', 'looped') + 0.7, 1e9, { dy: 0, fade: 0.1 }); M.vis(backL, t, wt('H4', 'microphone'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq([tB, ...tpW], t, wt('H4', 'loop', 1) - 0.4, 0.4, 0.12); fadeAt([tA, ...tL], t, wt('H4', 'loop', 1) - 0.1, 0.1);
    M.vis($('#aPill'), t, wt('H4', 'loop', 1) - 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    $('#aPill').textContent = t >= wt('H4', 'feedback') - 0.1 ? 'Feedback' : 'A loop';
  }

  /* P: bicycle + crowd */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, T0('P5') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pDef'), t, wt('P1', 'part') - 0.2, 1e9, { dy: 24 });
    fadeAt(road, t, tb0 - 0.2, 0.1); M.vis(bikeG, t, tb0, 1e9, { dy: 0, fade: 0.2 });
    const [bx, by] = bikeAt(t), [bx2, by2] = bikeAt(t + 0.05); bike.setAttribute('transform', `translate(${bx.toFixed(1)},${by.toFixed(1)}) rotate(${(Math.atan2(by2 - by, Math.max(0.5, bx2 - bx)) * 180 / Math.PI).toFixed(1)})`);
    let d = ''; for (let i = 0; i <= 80; i++) { const tt = tb0 + (t - tb0) * i / 80, [x, y] = bikeAt(tt); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } PUC.attr(trail, 'd', t > tb0 ? d : '');
    PUC.attr(drift, 'x', 300); PUC.attr(drift, 'y', 150); M.vis(drift, t, tb1, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(steer, 'x', 520); PUC.attr(steer, 'y', 290); M.vis(steer, t, tb2, 1e9, { dy: 0, fade: 0.2 });
    const us = M.io((t - tb2) / 0.4); stA.set(470, 160, 470, 160 + 50 * us);
    M.vis($('#pOk'), t, wt('P4', 'steady') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const n = crowdN(t); ppl.forEach((p, i) => { const k = order.indexOf(i); PUC.attr(p, 'fill', k < n ? C.ac2 : C.soft); PUC.attr(p, 'stroke', k < n ? AM : INK); });
    fadeAt(ppl, t, T0('P5') + 0.1, 0.02);
    M.vis($('#pL1'), t, wt('P6', 'few'), 1e9, { dy: 10 }); M.vis($('#pLb'), t, wt('P6', 'few'), 1e9, { dy: 0, fade: 0.2 }); $('#pLb i').style.width = (540 * n / 21).toFixed(1) + 'px';
    M.vis($('#pGrow'), t, wt('P7', 'growing') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#pStrip'), t, wt('P7', 'feeds') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tS - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tS + 0.45, out, { dy: 36, ...o });
    const t2 = wt('S2', 'amplifier') - 0.2;
    fadeAt([inT, cLb[0]], t, t2, 0.1); M.draw(amp, t, t2 + 0.1, 0.5); M.vis(ampA, t, wt('S2', 'gain'), 1e9, { dy: 0, fade: 0.2 }); fadeAt([cLb[3]], t, t2 + 0.3);
    drawSeq([w3], t, wt('S2', 'times') - 0.3, 0.4); fadeAt([outT, cLb[1]], t, wt('S2', 'bigger'), 0.1);
    const t3 = wt('S3', 'resistors') - 0.2;
    fadeAt([nO], t, t3); drawSeq([r1, r2, gnd], t, t3, 0.4, 0.15); fadeAt([nT, cLb[4], cLb[5]], t, t3 + 0.5, 0.1);
    M.draw(fb, t, wt('S3', 'back') - 0.2, 0.6); M.vis(fbH, t, wt('S3', 'back') + 0.4, 1e9, { dy: 0, fade: 0.1 });
    M.vis(cLb[7], t, wt('S4', 'beta'), 1e9, { dy: 0, fade: 0.2 }); M.vis(cLb[6], t, wt('S4', 'fraction'), 1e9, { dy: 0, fade: 0.2 });
    const t5 = wt('S5', 'circle') - 0.2;
    M.vis(mix, t, t5, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(mixX, t, t5 + 0.1, 1e9, { dy: 0, fade: 0.1 }); drawSeq([w1, w2], t, t5 + 0.2, 0.3, 0.1); fadeAt([cLb[2], sgnIn], t, t5 + 0.3, 0.1);
    const pos = posFb(t);
    M.vis(sgnFb, t, tNeg - 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.setT(sgnFb, pos ? '+' : '−'); sgnFb.setAttribute('fill', pos ? RED : C.ok);
    M.vis(fbF, t, tNeg, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(fbF, 'stroke-dashoffset', (-60 * (t - tNeg)).toFixed(1)); PUC.attr(fbF, 'stroke', pos ? RED : TE);
    M.vis($('#tg'), t, tNeg - 0.3, 1e9, { dy: 10 });
    $('#tg .tr i').style.transform = `translateX(${pos ? 30 : 0}px)`; $('#tg .tr').style.background = pos ? RED : C.ok; M.setT($('#tgV'), pos ? 'POSITIVE' : 'NEGATIVE');
    // readouts
    const b = beta(t), ab = 100 * b, osc = pos && ab >= 0.999;
    M.vis($('#ro1'), t, tS + 0.6, 1e9, { dy: 12 });
    M.setT($('#rB'), b === 0.01 ? '0.01' : '0.005'); M.setT($('#rAB'), ab.toFixed(1));
    M.setT($('#rAf'), t < tNeg - 0.3 ? '-' : osc ? '∞' : String(Math.round(pos ? 100 / (1 - ab) : 100 / (1 + ab))));
    M.vis($('#rgT'), t, tNeg - 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.setT($('#rgT'), osc ? 'OSCILLATING' : pos ? 'POSITIVE' : 'NEGATIVE'); $('#rgT').style.background = osc || pos ? RED : INK;
    M.vis($('#slowT'), t, tNeg, 1e9, { dy: 0, fade: 0.2 });
    tr1(u => 26 * sigIn(u), t, tNeg - 0.3, 5, 46, t >= tNeg - 0.3); tr2(u => 52 * sigOut(u), t, tNeg - 0.3, 5, 125, t >= tNeg - 0.3);
    fadeAt(scL, t, tNeg - 0.3, 0.1);
    avB(t, wt('S11', 'screaming') - 0.3, T1('S11') + 0.4);
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([...dMix, ...dAmp], t, tD + 0.3, 0.06); drawSeq(dW, t, tD + 0.5, 0.35, 0.1); fadeAt([...dBeta, ...dH, ...dLb, ...dNote], t, tD + 1.0, 0.06);
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dOsc'), t, wt('D9', 'oscillates') - 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tU; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tU - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Positive') - 0.05, { out: tU - 0.35, outDur: 0.25 }); }

  /* U: uses */
  const uOn = t >= tU - 0.05 && t < tW + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = tW - 0.32;
    M.vis($('#uL'), t, tU + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#uR'), t, tU + 0.25, out, { dx: 60, dy: 0, ...o });
    [['#u10', wt('U2', 'lowers')], ['#u11', wt('U2', 'steady')], ['#u12', wt('U3', 'less')], ['#u20', wt('U4', 'raises')], ['#u21', wt('U4', 'unstable')], ['#u22', wt('U5', 'oscillator')]].forEach(([s, ti]) => M.vis($(s), t, ti - 0.2, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#uS1t'), t, wt('U3', 'good') - 0.1, 1e9, { dy: 24 }); M.vis($('#uS2t'), t, wt('U5', 'perfect') - 0.1, 1e9, { dy: 24 });
    let d1 = '', d2 = ''; for (let x = 0; x <= 300; x += 4) { d1 += (x ? 'L' : 'M') + x + ',' + (40 - 22 * Math.sin(x / 18 - 4 * t)).toFixed(1); const a = Math.min(36, 4 * Math.exp(x / 140)); d2 += (x ? 'L' : 'M') + x + ',' + (40 - a * Math.sin(x / 14 - 4 * t)).toFixed(1); }
    PUC.attr(uw1, 'd', d1); PUC.attr(uw2, 'd', d2); M.vis(uw1, t, tU + 0.5, 1e9, { dy: 0, fade: 0.3 }); M.vis(uw2, t, tU + 0.6, 1e9, { dy: 0, fade: 0.3 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W1', 'thousand'), wt('W2', 'beta'), wt('W6', 'beta')];
    wGiv.forEach((e, i) => pop(e, t, tg[i] - 0.1));
    runRows(wRows, t, tWR);
    const bars = [['A', tg[0], 1000, 1000], ['B', tWR[2], 91, 1000 / 11], ['C', tWR[4] + 0.3, 2000, 2000]];
    bars.forEach(([k, ti, , v]) => { M.vis($('#w' + k + '1'), t, ti - 0.2, 1e9, { dy: 10 }); M.vis($('#w' + k), t, ti - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#w' + k + ' i').style.width = (520 * v / 2000 * M.io((t - ti) / 0.7)).toFixed(1) + 'px'; M.vis($('#w' + k + 'v'), t, ti + 0.5, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis($('#wNote'), t, tg[0] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'Negative') - 0.1 });
    pop($('#tcP'), t, wt('X4', 'ratio') - 0.2); pop($('#tcQ'), t, wt('X4', 'not') - 0.1);
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Define') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns });
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
