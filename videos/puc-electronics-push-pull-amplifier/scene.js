// PUC Electronics Ep 70 - Push-pull amplifier ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'speaker') - 0.2;
const tP = T0('P1'), tS = T0('S1'), tG = T0('G1'), tT = T0('T1'), tC = T0('C1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tC], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S'), tpS = $('#tpS');
const spkB = [W(h1S, 'M60,84 H170 V244 H60 Z', { fill: '#fff' }), mk(h1S, 'circle', { cx: 115, cy: 136, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(h1S, 'circle', { cx: 115, cy: 206, r: 15, fill: '#fff', stroke: INK, 'stroke-width': 4 })];
const arcs = [0, 1, 2].map(i => W(h1S, `M${196 + i * 22},${110 - i * 10} Q${214 + i * 30},150 ${196 + i * 22},${190 + i * 10}`, { stroke: AM, 'stroke-width': 4 }));
const bat = [W(h1S, 'M330,118 H490 V188 H330 Z', { fill: '#fff', 'stroke-width': 4 }), mk(h1S, 'rect', { x: 492, y: 138, width: 10, height: 30, rx: 3, fill: INK })];
const batF = mk(h1S, 'rect', { x: 338, y: 126, width: 144, height: 54, rx: 4, fill: C.ok });
const batL = mono(h1S, 410, 226, 'one small battery', { 'text-anchor': 'middle' });
const clk = mono(h1S, 650, 166, '7 PM', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 600, fill: INK }), clkL = mono(h1S, 650, 210, 'all evening', { 'text-anchor': 'middle' });
const ampB = [W(h2S, 'M50,104 H300 V236 H50 Z', { fill: '#fff' }), mk(h2S, 'circle', { cx: 110, cy: 170, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(h2S, 'M110,170 L126,150', { 'stroke-width': 4 }),
  mk(h2S, 'circle', { cx: 200, cy: 198, r: 12, fill: INK }), mk(h2S, 'circle', { cx: 250, cy: 198, r: 12, fill: INK })];
const silent = mono(h2S, 225, 150, 'SILENT', { 'text-anchor': 'middle', 'font-weight': 600, fill: INK, 'font-size': 22 });
const heat = [0, 1, 2].map(i => W(h2S, '', { stroke: RED, 'stroke-width': 3.5 }));
const thT = mk(h2S, 'rect', { x: 352, y: 76, width: 26, height: 140, rx: 13, fill: '#fff', stroke: INK, 'stroke-width': 3 }), thF = mk(h2S, 'rect', { x: 359, y: 200, width: 12, height: 10, rx: 6, fill: RED }), thB = mk(h2S, 'circle', { cx: 365, cy: 226, r: 18, fill: RED, stroke: INK, 'stroke-width': 3 });
const tq1 = mk(tpS, 'g'), tq1p = npn(tq1, 150, 110, 64, 1.2), tq2 = npnFlip(tpS, 150, 300, 64, 1.2);
const tpL = [mono(tpS, 236, 76, 'Q1', { 'font-size': 26, fill: INK, 'font-weight': 600 }), mono(tpS, 236, 352, 'Q2', { 'font-size': 26, fill: INK, 'font-weight': 600 })];
const tpA = [PUC.arrow(tpS, VI, 5, 14), PUC.arrow(tpS, AM, 5, 14)];
const tpAL = [mono(tpS, 20, 130, 'push', { fill: VI, 'font-weight': 600 }), mono(tpS, 20, 300, 'pull', { fill: '#B7791F', 'font-weight': 600 })];

/* ================= P: two-person saw + class A vs B ================= */
const pS = $('#pS');
const log = [mk(pS, 'rect', { x: 230, y: 210, width: 320, height: 130, rx: 14, fill: '#EADBC0', stroke: INK, 'stroke-width': 4 }), mk(pS, 'rect', { x: 376, y: 210, width: 28, height: 52, fill: '#C9B48E' })];
const sawG = mk(pS, 'g'), saw = mk(sawG, 'g');
const blade = [W(saw, 'M100,168 H680 V200 H100 Z', { fill: '#fff' }), W(saw, 'M104,200 ' + [...Array(36)].map((_, i) => `L${112 + i * 16},${i % 2 ? 200 : 214}`).join(' ') + ' L676,200', { 'stroke-width': 2.5 }),
  mk(saw, 'rect', { x: 56, y: 156, width: 44, height: 58, rx: 12, fill: VI }), mk(saw, 'rect', { x: 680, y: 156, width: 44, height: 58, rx: 12, fill: AM })];
const pLb = [tx(pS, 78, 120, 'PERSON 1', { 'text-anchor': 'middle', 'font-size': 20, fill: VI }), tx(pS, 702, 120, 'PERSON 2', { 'text-anchor': 'middle', 'font-size': 20, fill: '#B7791F' })];
const pA1 = PUC.arrow(pS, VI, 6, 18), pA2 = PUC.arrow(pS, AM, 6, 18);
const pRest = [mono(pS, 78, 270, '', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(pS, 702, 270, '', { 'text-anchor': 'middle', 'font-weight': 600 })];
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);
// saw position: + = towards person 2
const tp2 = wt('P2', 'pulls'), tp3 = wt('P3', 'other'), tp4 = wt('P4', 'Each');
const sawX = t => { let s = 0; if (t >= tp2 - 0.2) s = -50 * M.io((t - tp2 + 0.2) / 0.7); if (t >= tp3 - 0.1) s = M.lerp(-50, 50, M.io((t - tp3 + 0.1) / 0.8)); if (t >= tp4) s = 50 * Math.cos(2.2 * (t - tp4)); return s; };

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const inT = [mk(ck, 'circle', { cx: 70, cy: 220, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 70, cy: 380, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const inW = [W(ck, 'M78,220 H150'), W(ck, 'M78,380 H150')];
const t1p = coil(ck, 150, 220, 380, 4, 1), t1s = coil(ck, 222, 160, 440, 6, -1);
const t1c = [W(ck, 'M182,196 V404', { 'stroke-width': 3 }), W(ck, 'M190,196 V404', { 'stroke-width': 3 })];
const Q1 = mk(ck, 'g'), q1p = npn(Q1, 400, 160, 46, 0.9), Q2 = npnFlip(ck, 400, 440, 46, 0.9), q2p = Q2.parts;
const bW = [W(ck, 'M222,160 H381'), W(ck, 'M222,440 H381'), W(ck, 'M222,300 H419'), W(ck, 'M419,201 V300'), W(ck, 'M419,399 V300')];
const gnd = W(ck, 'M300,300 V332 M276,332 H324 M286,344 H314 M296,356 H304', { 'stroke-width': 3 });
const nodes = [mk(ck, 'circle', { cx: 419, cy: 300, r: 7, fill: INK }), mk(ck, 'circle', { cx: 300, cy: 300, r: 7, fill: INK })];
const cW1 = W(ck, 'M419,119 V100 H640'), cW2 = W(ck, 'M419,481 V500 H640');
const t2p = coil(ck, 640, 100, 500, 8, 1), t2s = coil(ck, 712, 200, 400, 4, -1);
const t2c = [W(ck, 'M672,150 V450', { 'stroke-width': 3 }), W(ck, 'M680,150 V450', { 'stroke-width': 3 })];
const vcc = [W(ck, 'M640,300 H588'), mk(ck, 'circle', { cx: 580, cy: 300, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const spW = [W(ck, 'M712,200 H820 V268'), W(ck, 'M712,400 H820 V332')];
const spk = [mk(ck, 'rect', { x: 808, y: 268, width: 24, height: 64, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M832,268 L866,236 V364 L832,332', { fill: '#fff' })];
const cLb = [sub(tx(ck, 52, 312, 'v', { fill: TE, 'font-style': 'italic' }), 'in'), tx(ck, 580, 274, '+V CC', { 'text-anchor': 'middle', fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }),
  mono(ck, 454, 152, 'Q1', { 'font-weight': 600, fill: INK, 'font-size': 22 }), mono(ck, 454, 462, 'Q2', { 'font-weight': 600, fill: INK, 'font-size': 22 }),
  mono(ck, 186, 474, 'input', { 'text-anchor': 'middle' }), mono(ck, 186, 496, 'transformer', { 'text-anchor': 'middle' }),
  mono(ck, 690, 546, 'output transformer', { 'text-anchor': 'start' }), mono(ck, 846, 440, 'speaker', { 'text-anchor': 'middle' }), mono(ck, 252, 290, 'centre tap', { 'font-size': 16 })];
// signal phase: driven by the narration (slow-motion view), then a steady wave
const tA = wt('S6', 'positive') - 0.2, tB = wt('S8', 'negative') - 0.1, tCc = T1('S9');
const phi = t => t < tA ? 0 : t < tB ? Math.PI * (t - tA) / (tB - tA) : t < tCc ? Math.PI + Math.PI * (t - tB) / (tCc - tB) : 2 * Math.PI + Math.PI * (t - tCc);
const vin = t => t < tA ? 0 : Math.sin(phi(t));
const integ = (f, t) => { let s = 0; const dt = 0.05; for (let x = tA; x < t; x += dt) s += f(x) * Math.min(dt, t - x); return s; };
const e1 = flow(ck, [[419, 300], [419, 201], [419, 119], [419, 100], [640, 100], [640, 300], [588, 300]], 16, { skip: (x, y) => Math.hypot(x - 400, y - 160) < 48 || (Math.abs(x - 640) < 1 && y > 104 && y < 296) });
const e2 = flow(ck, [[419, 300], [419, 399], [419, 481], [419, 500], [640, 500], [640, 300], [588, 300]], 16, { skip: (x, y) => Math.hypot(x - 400, y - 440) < 48 || (Math.abs(x - 640) < 1 && y > 304 && y < 496) });
const e3 = flow(ck, [[712, 200], [820, 200], [820, 400], [712, 400]], 10, { r: 6, skip: (x, y) => Math.abs(x - 820) < 1 && y > 262 && y < 338 });
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 IN', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 OUT · SPEAKER', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k n">Q1</span><span class="v" id="rQ1" style="font-size:30px">OFF</span><span class="u"></span>
  <span class="k" style="color:${VI}">i<sub>C1</sub></span><span class="v" id="rI1" style="color:${VI}">0</span><span class="u">mA</span>
  <span class="k n">Q2</span><span class="v" id="rQ2" style="font-size:30px">OFF</span><span class="u"></span>
  <span class="k" style="color:${VI}">i<sub>C2</sub></span><span class="v" id="rI2" style="color:${VI}">0</span><span class="u">mA</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Two halves make one full wave!' });

/* ================= G: two halves ================= */
const gS = $('#gS');
const gA = PUC.graph(gS, { x: 96, y: 84, w: 620, h: 190, xmax: 2, ymin: -1.25, ymax: 1.25, yl: '' });
const gB = PUC.graph(gS, { x: 96, y: 336, w: 620, h: 190, xmax: 2, ymin: -1.25, ymax: 1.25, xl: 'time' });
const gLb = [mono(gS, 716, 92, 'Q1 solid · Q2 dashed', { 'text-anchor': 'end', fill: VI, 'font-weight': 600, 'font-size': 18 }), mono(gS, 716, 352, 'output · full wave', { 'text-anchor': 'end', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 })];
const gQ = [mono(gS, gA.X(0.25), gA.Y(0.3), 'Q1', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600 }), mono(gS, gA.X(0.75), gA.Y(-0.3) + 16, 'Q2', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600 })];
const gp1 = pth(gS, VI, 5), gp2 = pth(gS, VI, 5, { 'stroke-dasharray': '10 8' }), gpo = pth(gS, AM, 5);
const g180 = [mk(gS, 'line', { x1: gA.X(0), y1: gA.Y(1.2), x2: gA.X(0.5), y2: gA.Y(1.2), stroke: INK, 'stroke-width': 2 }), mono(gS, gA.X(0.5) + 10, gA.Y(1.2) + 6, '180°', { fill: INK, 'font-weight': 600, 'font-size': 18 })];
const tilesG = ['#gt0', '#gt1', '#gt2'].map(s => $(s)); $('#gZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= C: crossover distortion ================= */
const cS = $('#cS');
const gC = PUC.graph(cS, { x: 96, y: 90, w: 620, h: 400, xmax: 2, ymin: -3.4, ymax: 3.4, xl: 'time', yl: 'V' });
gC.ylab.setAttribute('fill', TE);
const band = gC.mk('rect', { x: gC.X(0), y: gC.Y(0.7), width: gC.X(2) - gC.X(0), height: gC.Y(-0.7) - gC.Y(0.7), fill: C.redBg }); cS.insertBefore(band, gC.axes);
const bandL = mono(cS, 96, 556, 'pink band: below 0.7 V, both transistors off', { fill: RED, 'font-weight': 600, 'font-size': 17 });
const cIn = pth(cS, CH1, 3.5, { 'stroke-dasharray': '8 7' }), cOut = pth(cS, AM, 5);
const cInL = mono(cS, gC.X(0.25) + 8, gC.Y(3.0) - 4, 'input', { fill: '#5F7399', 'font-weight': 600 }), cOutL = mono(cS, gC.X(0.75) + 10, gC.Y(-2.6) + 30, 'output', { fill: '#B7791F', 'font-weight': 600 });
const kink = mk(cS, 'circle', { cx: gC.X(0.5), cy: gC.Y(0), r: 40, fill: 'none', stroke: RED, 'stroke-width': 4 });
const kinkL = mono(cS, gC.X(0.5), gC.Y(0) + 74, 'kink', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600 });
const vB = v => Math.sign(v) * Math.max(0, Math.abs(v) - 0.7);
const cS2 = $('#cS2');
const dio = (y) => [mk(cS2, 'path', { d: `M360,${y} H400 L380,${y + 30} Z`, fill: '#fff', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }), W(cS2, `M358,${y + 32} H402`)];
const cD = [W(cS2, 'M380,96 V120'), ...dio(120), W(cS2, 'M380,152 V178'), ...dio(178), W(cS2, 'M380,210 V240'), W(cS2, 'M380,96 H560'), W(cS2, 'M380,240 H560')];
const cDL = [mono(cS2, 572, 102, 'to Q1 base', { fill: INK, 'font-weight': 600 }), mono(cS2, 572, 246, 'to Q2 base', { fill: INK, 'font-weight': 600 }),
  tx(cS2, 300, 142, '0.7 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }), tx(cS2, 300, 200, '0.7 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }),
  mono(cS2, 60, 270, 'two diodes', { 'font-weight': 600 })];
const tilesC = ['#ct0', '#ct1'].map(s => $(s));

/* ================= D: derivation ================= */
const dS = $('#dS');
const gD = PUC.graph(dS, { x: 96, y: 84, w: 620, h: 220, xmax: 2, ymin: 0, ymax: 1.6, xl: 'time' });
const dHump = pth(dS, VI, 5), dAvg = mk(dS, 'line', { x1: gD.X(0), y1: gD.Y(2 / Math.PI), x2: gD.X(2), y2: gD.Y(2 / Math.PI), stroke: VI, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
const dLb = [mono(dS, 716, 100, 'dashed: average = 2 Ip / π', { 'text-anchor': 'end', fill: VI, 'font-weight': 600, 'font-size': 19 }), sub(tx(dS, gD.X(0.25), gD.Y(1) - 12, 'I', { fill: VI, 'font-style': 'italic', 'text-anchor': 'middle', 'font-size': 22 }), 'p'),
  mono(dS, 110, 100, 'supply current', { fill: VI, 'font-weight': 600, 'font-size': 18 })];
const dRows = rows($('#dSteps'), [
  [K(`\\eta = ${PO} \\,/\\, ${PD}`), 'useful ÷ taken', 92],
  [K(`${PO} = \\tfrac{1}{2}\\,${VP}\\,${IP}`), 'output power', 176],
  [K(`${IDC} = 2\\,${IP} \\,/\\, \\pi`), 'average of humps', 260],
  [K(`${PD} = ${VCC} \\cdot 2\\,${IP} \\,/\\, \\pi`), 'supply power', 344],
  [K(`\\eta = \\tfrac{\\pi}{4}\\cdot ${VP} \\,/\\, ${VCC}`), 'divide the two', 428],
  [K(`\\eta_{max} = \\pi/4 = 78.5\\%`), 'when V<sub>p</sub> ≈ V<sub>CC</sub>', 516]]);
const tDR = [wt('D2', 'Efficiency'), wt('D3', 'output'), wt('D4', 'average'), wt('D5', 'supply'), wt('D6', 'Divide'), wt('D8', 'efficiency')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VP} = 1.4\\,\\text{V}`), 'each needs ' + K(`${c(TE, 'V_{BE}')} \\approx 0.7\\,\\text{V}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS');
const gW = PUC.graph(wS, { x: 96, y: 156, w: 620, h: 236, xmax: 360, ymin: -1.6, ymax: 1.6, xt: [90, 180, 270, 360], xl: '' });
const dead = [[0, 30], [150, 210], [330, 360]].map(([a, b]) => { const r = gW.mk('rect', { x: gW.X(a), y: gW.Y(1.55), width: gW.X(b) - gW.X(a), height: gW.Y(-1.55) - gW.Y(1.55), fill: C.redBg }); wS.insertBefore(r, gW.axes); return r; });
const wLv = [0.7, -0.7].map(v => gW.mk('line', { x1: gW.X(0), y1: gW.Y(v), x2: gW.X(360), y2: gW.Y(v), stroke: TE, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const wIn = pth(wS, TE, 3.5), wOut = pth(wS, AM, 5);
const wLb = [mono(wS, gW.X(30) + 4, gW.Y(-1.55) - 8, '30°', { fill: RED, 'font-weight': 600, 'font-size': 18 }), mono(wS, gW.X(360) + 6, gW.Y(0.7) + 6, '0.7', { fill: TE, 'font-weight': 600, 'font-size': 17 }), mono(wS, gW.X(360) + 6, gW.Y(1.4) + 6, '1.4', { fill: TE, 'font-weight': 600, 'font-size': 17 })];
const wRows = rows($('#wSteps'), [
  [K(`v = ${VP}\\,\\sin\\theta`), 'input wave', 92],
  [K('\\sin\\theta = 0.7/1.4 = 0.5'), 'when it reaches 0.7 V', 172],
  [K('\\theta = 30^\\circ'), 'after each zero', 252],
  [K('-30^\\circ \\to +30^\\circ = 60^\\circ'), 'flat part', 332],
  [K('2 \\times 60^\\circ = 120^\\circ'), 'two crossings', 412],
  [K('120^\\circ / 360^\\circ = 1/3'), 'one third lost', 508]]);
const tWR = [wt('W3', 'input'), wt('W4', 'reaches'), wt('W4', 'thirty'), wt('W5', 'flat'), wt('W6', 'sixty'), wt('W7', 'third') - 0.6];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Each transistor conducts for the full 360°', right: 'Class B: each conducts for 180° only', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xg = { X: s => 10 + 360 * s / 2, Y: v => v };
const xQ1 = pth(tcS, VI, 4.5), xQ2 = pth(tcS, VI, 4.5, { 'stroke-dasharray': '9 7' });
mk(tcS, 'line', { x1: 10, y1: 70, x2: 370, y2: 70, stroke: C.line, 'stroke-width': 2 }); mk(tcS, 'line', { x1: 10, y1: 120, x2: 370, y2: 120, stroke: C.line, 'stroke-width': 2 });
const xLb = [mono(tcS, 14, 20, 'Q1', { fill: VI, 'font-weight': 600 }), mono(tcS, 14, 196, 'Q2', { fill: VI, 'font-weight': 600 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the class B push-pull circuit, explain its working and crossover distortion' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A class B push-pull amplifier takes 25&nbsp;W from the supply at its best efficiency. How much power turns into heat in the transistors?', qW: 780,
  opts: ['19.6 W', '5.4 W', '2.7 W', '12.5 W'], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K('\\eta_{max} = \\pi/4 = 78.5\\%')], [K(`${PO} = 0.785 \\times 25`)], [K(`${PO} \\approx 19.6\\,\\text{W}`)], [K(`${c(GO, 'P_{heat}')} = 25 - 19.6 \\approx 5.4\\,\\text{W}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'efficiency'), wt('A3', 'Useful'), wt('A3', 'About'), wt('A4', 'rest')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'Class B push-pull amplifier · formula card', txt: [0, 0, 1, 1, 1],
  lines: [K(`\\eta = ${PO}/${PD} = \\tfrac{\\pi}{4}\\,${VP}/${VCC}`), K('\\eta_{max} = 78.5\\% \\quad (\\text{class A, transformer: } 50\\%)'),
    'Each transistor conducts for 180° · together, one full wave', 'Crossover distortion: both off near zero (below about 0.7 V)', 'Fix: class AB · a small forward bias, often two diodes'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 71', topic: 'Positive and negative feedback', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('C4', 'neither'), 1.1, 520, 560], [T1('C5'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[wt('S2', 'input') - 0.2, tG - 0.4]];

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
    const t1 = wt('H1', 'speaker') - 0.1;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); pop($('#h1T'), t, wt('H1', 'evening'));
    fadeAt(spkB, t, t1 + 0.2, 0.1);
    arcs.forEach((a, i) => { const on = t >= t1 + 0.5; M.hide(a, !on); if (on) PUC.attr(a, 'opacity', (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(6 * (t - t1) - i * 1.2))).toFixed(2)); });
    fadeAt([...bat, batF, batL], t, wt('H1', 'battery') - 0.3, 0.08);
    const hr = Math.min(11, 7 + Math.floor(M.clamp((t - wt('H1', 'all')) / 2.4) * 4.99));
    fadeAt([clk, clkL], t, wt('H1', 'all') - 0.1, 0.1); M.setT(clk, hr + ' PM');
    PUC.attr(batF, 'width', (144 * (0.95 - 0.12 * M.clamp((t - wt('H1', 'all')) / 2.4))).toFixed(1));
    const t2 = wt('H2', 'old') - 0.2;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); pop($('#h2T'), t, wt('H2', 'hot'));
    fadeAt([...ampB, silent], t, t2 + 0.2, 0.06);
    const hu = M.clamp((t - wt('H2', 'hot') + 0.3) / 2);
    heat.forEach((h, i) => { const on = t >= wt('H2', 'hot') - 0.3; M.hide(h, !on); if (!on) return; const x = 110 + i * 70, ph = (t * 1.2 + i * 0.33) % 1, y = 94 - 40 * ph;
      PUC.attr(h, 'd', `M${x},${(y + 30).toFixed(1)} q8,-8 0,-15 q-8,-7 0,-15`); PUC.attr(h, 'opacity', (1 - ph).toFixed(2)); });
    fadeAt([thT, thF, thB], t, wt('H2', 'hot') - 0.3, 0.06);
    PUC.attr(thF, 'height', (14 + 110 * hu).toFixed(1)); PUC.attr(thF, 'y', (210 - 110 * hu).toFixed(1));
    M.rise($('#h2X'), t, wt('H2', 'even'));
    const t4 = wt('H4', 'two') - 0.2;
    drawSeq(tq1p.slice(0, 4), t, t4, 0.3, 0.06); M.vis(tq1p[4], t, t4 + 0.4, 1e9, { dy: 0, fade: 0.15 });
    M.vis(tq2.g, t, t4 + 0.3, 1e9, { dy: 0, fade: 0.25 }); fadeAt(tpL, t, t4 + 0.3, 0.15);
    const ta = wt('H4', 'turns'); const sw = Math.sin(3 * (t - ta));
    tpA[0].set(70, 150, 70, t >= ta ? 150 - 40 * Math.max(0, sw) - 2 : 150); tpA[1].set(70, 250, 70, t >= ta ? 250 + 40 * Math.max(0, -sw) + 2 : 250);
    fadeAt(tpAL, t, ta, 0.1);
    PUC.attr(tq1p[0], 'fill', M.mix('#FFFFFF', C.ac2, t >= ta ? Math.max(0, sw) : 0)); PUC.attr(tq2.parts[0], 'fill', M.mix('#FFFFFF', C.ac2, t >= ta ? Math.max(0, -sw) : 0));
    pop($('#aPill'), t, t4);
    $('#aPill').textContent = t >= wt('H4', 'push') - 0.1 ? 'A push-pull amplifier' : 'Two transistors';
  }

  /* P: saw + class A vs B */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P5', 'ordinary') - 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt(log, t, tP + 0.3, 0.1); M.vis(sawG, t, tP + 0.5, 1e9, { dy: -16 }); fadeAt(pLb, t, wt('P1', 'two'), 0.15);
    const s = sawX(t), v = (sawX(t + 0.05) - s) / 0.05; saw.style.transform = `translateX(${s.toFixed(1)}px)`;
    const w1 = t >= tp2 - 0.2 && v < -3, w2 = t >= tp2 - 0.2 && v > 3;
    pA1.set(110, 380, w1 ? 40 : 110, 380); pA2.set(670, 380, w2 ? 740 : 670, 380);
    M.setT(pRest[0], w1 ? '' : 'rests'); M.setT(pRest[1], w2 ? '' : 'rests'); fadeAt(pRest, t, tp4, 0.1);
    M.vis($('#pH1'), t, tp2 - 0.3, 1e9, { dy: 10 }); M.vis($('#pH'), t, tp2 - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#pF1'), t, tp2 - 0.2, 1e9, { dy: 10 }); M.vis($('#pF'), t, tp2 - 0.2, 1e9, { dy: 0, fade: 0.2 });
    $('#pH i').style.width = (w1 ? 460 : 0) + 'px'; $('#pF i').style.width = (w2 ? 460 : 0) + 'px';
    const tA0 = wt('P5', 'one'), tB0 = wt('P8', 'class');
    M.vis($('#pt0'), t, tA0 - 0.2, 1e9, { dy: 20 }); M.vis($('#pt1'), t, tB0 - 0.2, 1e9, { dy: 20 });
    $('#pb0 i').style.width = (230 * 0.5 * M.io((t - wt('P6', 'half')) / 0.5)).toFixed(1) + 'px'; $('#pb1 i').style.width = (230 * 0.03 * M.io((t - wt('P9', 'both')) / 0.4)).toFixed(1) + 'px';
    M.vis($('#pq0'), t, wt('P7', 'current'), 1e9, { dy: 8 }); M.vis($('#pq1'), t, wt('P9', 'Almost'), 1e9, { dy: 8 });
    const a0 = t >= wt('P6', 'half') && t < tB0 - 0.2, a1 = t >= wt('P9', 'both');
    [[$('#pt0'), a0, RED, C.redBg], [$('#pt1'), a1, C.ok, C.okBg]].forEach(([e, on, b, f]) => { e.style.borderColor = on ? b : C.soft; e.style.background = on ? f : C.soft; });
    M.vis($('#pStrip'), t, wt('P9', 'Nothing') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tS - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32;
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tS + 0.45, out, { dy: 36, ...o });
    const t2 = wt('S2', 'input') - 0.2;
    fadeAt(inT, t, t2, 0.1); drawSeq([...inW, t1p, ...t1c, t1s], t, t2 + 0.1, 0.4, 0.1); fadeAt([cLb[0], cLb[4], cLb[5]], t, t2 + 0.6, 0.1);
    const t3 = wt('S3', 'middle') - 0.1; M.draw(bW[2], t, t3, 0.4); M.draw(gnd, t, t3 + 0.3, 0.3); fadeAt([nodes[1], cLb[8]], t, wt('S3', 'centre'), 0.1);
    const t4 = wt('S4', 'Two') - 0.1;
    drawSeq([bW[0], ...q1p.slice(0, 4)], t, t4, 0.3, 0.06); M.vis(q1p[4], t, t4 + 0.4, 1e9, { dy: 0, fade: 0.15 }); fadeAt([cLb[2]], t, wt('S4', 'top'));
    M.draw(bW[1], t, wt('S4', 'below') - 0.3, 0.3); M.vis(Q2.g, t, wt('S4', 'below') - 0.1, 1e9, { dy: 0, fade: 0.25 }); fadeAt([cLb[3]], t, wt('S4', 'below'));
    drawSeq([bW[3], bW[4]], t, wt('S4', 'below') + 0.3, 0.3, 0.1); fadeAt([nodes[0]], t, wt('S4', 'below') + 0.6);
    const t5 = wt('S5', 'output') - 0.2;
    drawSeq([cW1, cW2, t2p, ...t2c, t2s, ...spW], t, t5, 0.35, 0.08); fadeAt([...spk, ...vcc, cLb[1], cLb[6], cLb[7]], t, t5 + 0.6, 0.08);
    // signal
    const v = vin(t), on1 = v > 0.02, on2 = v < -0.02, wave = t >= tA;
    PUC.attr(q1p[0], 'fill', M.mix('#FFFFFF', C.ac2, Math.max(0, v))); PUC.attr(q2p[0], 'fill', M.mix('#FFFFFF', C.ac2, Math.max(0, -v)));
    e1.set(integ(u => 34 * Math.max(0, vin(u)), t), wave && on1); e2.set(integ(u => 34 * Math.max(0, -vin(u)), t), wave && on2);
    e3.set(26 * (1 - Math.cos(phi(t))) * (t >= tCc ? 1 : 1), wave && Math.abs(v) > 0.02);
    M.vis($('#ckE'), t, tA, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#rgT'), t, tS + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.setT($('#rgT'), on1 ? 'Q1 PUSHES' : on2 ? 'Q2 PULLS' : 'BOTH OFF');
    M.vis($('#ro1'), t, tS + 0.6, 1e9, { dy: 12 });
    M.setT($('#rQ1'), on1 ? 'ON' : 'OFF'); M.setT($('#rQ2'), on2 ? 'ON' : 'OFF');
    $('#rQ1').style.color = on1 ? '#B7791F' : C.dim; $('#rQ2').style.color = on2 ? '#B7791F' : C.dim;
    M.setT($('#rI1'), String(Math.round(500 * Math.max(0, v)))); M.setT($('#rI2'), String(Math.round(500 * Math.max(0, -v))));
    M.vis($('#slowT'), t, tA, 1e9, { dy: 0, fade: 0.2 });
    tr1(u => 30 * vin(u), t, tA, 5, 50, wave); tr2(u => 36 * vin(u), t, tA, 5, 138, wave);
    fadeAt(scL, t, tA, 0.1);
    avB(t, wt('S11', 'smooth'), T1('S11') + 0.3);
  }

  /* G: two halves */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    const g2 = wt('G2', 'positive') - 0.3, g3 = wt('G3', 'negative') - 0.3, g5 = wt('G5', 'adds') - 0.2;
    plot(gA, gp1, hump, 0, 2 * M.clamp((t - g2) / 1.6), 160); plot(gA, gp2, trough, 0, 2 * M.clamp((t - g3) / 1.6), 160);
    plot(gB, gpo, s => Math.sin(2 * Math.PI * s), 0, 2 * M.clamp((t - g5) / 1.8), 160);
    fadeAt(gLb.slice(0, 1), t, tG + 0.4); fadeAt([gQ[0]], t, g2 + 0.4); fadeAt([gQ[1]], t, g3 + 0.4); fadeAt(gLb.slice(1), t, g5);
    fadeAt(g180, t, wt('G4', 'hundred') - 0.2, 0.1);
    const act = t < g3 ? 0 : t < g5 ? 1 : 2;
    tilesG.forEach((e, i) => { const ti = [g2, g3, g5][i]; M.vis(e, t, ti, 1e9, { dy: 20 }); const on = act === i ? 1 : 0; e.style.borderColor = on ? AM : C.soft; e.style.background = on ? C.ac2 : C.soft; });
    M.vis($('#gStrip'), t, wt('G4', 'Each') - 0.2, 1e9, { dy: 24 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tC; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tC - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Each') - 0.05, { out: tC - 0.35, outDur: 0.25 }); }

  /* C: crossover distortion */
  const cOn = t >= tC - 0.05 && t < tD + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tD - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, wt('C6', 'fix') - 0.3, out, { dx: 60, dy: 0, ...o });
    const c2 = wt('C2', 'silicon'), c3 = wt('C3', 'near'), c6 = wt('C7', 'Now'), fix = M.io((t - c6) / 0.8);
    plot(gC, cIn, s => 3 * Math.sin(2 * Math.PI * s), 0, 2 * M.clamp((t - tC - 0.3) / 1.6), 200);
    plot(gC, cOut, s => { const v = 3 * Math.sin(2 * Math.PI * s); return M.lerp(vB(v), v * 0.94, fix); }, 0, 2 * M.clamp((t - wt('C1', 'problem')) / 1.6), 240);
    fadeAt([cInL], t, tC + 0.6); fadeAt([cOutL], t, wt('C1', 'problem') + 0.6);
    M.vis(band, t, c2, 1e9, { dy: 0, fade: 0.3 }); M.vis(bandL, t, c3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(kink, t, wt('C5', 'kink') - 0.1, c6, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, outDur: 0.3, ody: 0 }); M.vis(kinkL, t, wt('C5', 'kink'), c6, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    pop($('#cT'), t, tC + 0.4); M.setT($('#cT'), t >= wt('C8', 'class') - 0.1 ? 'CLASS AB' : 'CLASS B');
    const c6b = wt('C6', 'tiny');
    drawSeq(cD, t, c6b - 0.1, 0.3, 0.07); fadeAt(cDL, t, wt('C7', 'diodes') - 0.2, 0.1);
    tilesC.forEach((e, i) => { const ti = [wt('C6', 'fix') - 0.2, wt('C7', 'diodes')][i]; M.vis(e, t, ti, 1e9, { dy: 20 }); const on = (i === 0 && t < c6) || (i === 1 && t >= c6);
      e.style.borderColor = on ? (i ? C.ok : RED) : C.soft; e.style.background = on ? (i ? C.okBg : C.redBg) : C.soft; });
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    plot(gD, dHump, s => Math.abs(Math.sin(2 * Math.PI * s)), 0, 2 * M.clamp((t - tD - 0.4) / 1.8), 200);
    fadeAt([dLb[2], dLb[1]], t, tD + 0.6, 0.3);
    M.draw(dAvg, t, tDR[2] - 0.1, 0.6); M.vis(dLb[0], t, tDR[2] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[5] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    const ta = wt('D9', 'transformer') - 0.3, tb = tDR[5];
    M.vis($('#dA1'), t, ta, 1e9, { dy: 10 }); M.vis($('#dA'), t, ta, 1e9, { dy: 0, fade: 0.2 }); $('#dA i').style.width = (560 * 0.5 * M.io((t - ta) / 0.6)).toFixed(1) + 'px'; M.vis($('#dAv'), t, ta + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dB1'), t, tb, 1e9, { dy: 10 }); M.vis($('#dB'), t, tb, 1e9, { dy: 0, fade: 0.2 }); $('#dB i').style.width = (560 * 0.785 * M.io((t - tb) / 0.8)).toFixed(1) + 'px'; M.vis($('#dBv'), t, tb + 0.6, 1e9, { dy: 0, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'input'), wt('W2', 'Each')];
    wGiv.forEach((e, i) => pop(e, t, tg[i] - 0.1));
    plot(gW, wIn, s => 1.4 * Math.sin(s * Math.PI / 180), 0, 360 * M.clamp((t - tWR[0]) / 1.4), 180);
    plot(gW, wOut, s => vB(1.4 * Math.sin(s * Math.PI / 180)), 0, 360 * M.clamp((t - tWR[3] + 0.3) / 1.4), 220);
    fadeAt(wLv, t, tWR[1] - 0.2, 0.1); fadeAt(wLb.slice(1), t, tWR[1], 0.1);
    dead.forEach((r, i) => M.vis(r, t, i === 1 ? tWR[3] + 0.4 : i === 0 ? tWR[2] : tWR[4], 1e9, { dy: 0, fade: 0.3 })); M.vis(wLb[0], t, tWR[2] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    runRows(wRows, t, tWR);
    const tf = tWR[5];
    M.vis($('#wF1'), t, tf - 0.2, 1e9, { dy: 10 }); M.vis($('#wF'), t, tf - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#wF i').style.width = (560 / 3 * M.io((t - tf) / 0.6)).toFixed(1) + 'px'; M.vis($('#wFv'), t, tf + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wBox'), t, tf + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'class') - 0.2 });
    const u1 = M.clamp((t - tX - 0.5) / 1.2), u2 = M.clamp((t - tX - 1.0) / 1.2);
    let d1 = '', d2 = ''; for (let i = 0; i <= 120; i++) { const s = 2 * i / 120; if (s <= 2 * u1) d1 += (d1 ? 'L' : 'M') + xg.X(s).toFixed(1) + ',' + (70 - 46 * hump(s)).toFixed(1); if (s <= 2 * u2) d2 += (d2 ? 'L' : 'M') + xg.X(s).toFixed(1) + ',' + (120 - 46 * trough(s)).toFixed(1); }
    PUC.attr(xQ1, 'd', d1); PUC.attr(xQ2, 'd', d2); fadeAt(xLb, t, tX + 0.5, 0.4);
    pop($('#tcP'), t, wt('X3', 'hundred') - 0.1); pop($('#tcQ'), t, wt('X4', 'best') - 0.2);
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Draw') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
