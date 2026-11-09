// PUC Electronics Ep 67 - CE amplifier and frequency response ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, R and beta ink; scope CH1 #8FA3C8, CH2 amber
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const IB = c(VI, 'I_B'), IC = c(VI, 'I_C'), IE = c(VI, 'I_E'), VCC = c(TE, 'V_{CC}'), VO = c(TE, 'V_{out}'), VIN = c(TE, 'V_{in}');
const KO = '\\text{k}\\Omega';

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
/* resistor zigzags (vertical / horizontal), ground, sine path */
const zigV = (p, x, ya, yb, a = {}) => { const L = yb - ya, z0 = ya + L * 0.28, z1 = yb - L * 0.28, n = 6, h = (z1 - z0) / n; let d = `M${x},${ya} V${z0.toFixed(1)}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -14 : 14)},${(z0 + h * (i + 0.5)).toFixed(1)}`; d += ` L${x},${z1.toFixed(1)} V${yb}`; return W(p, d, a); };
const zigH = (p, xa, xb, y, a = {}) => { const L = xb - xa, z0 = xa + L * 0.28, z1 = xb - L * 0.28, n = 6, h = (z1 - z0) / n; let d = `M${xa},${y} H${z0.toFixed(1)}`; for (let i = 0; i < n; i++) d += ` L${(z0 + h * (i + 0.5)).toFixed(1)},${y + (i % 2 ? 14 : -14)}`; d += ` L${z1.toFixed(1)},${y} H${xb}`; return W(p, d, a); };
const gnd = (p, x, y) => W(p, `M${x - 22},${y} H${x + 22} M${x - 14},${y + 10} H${x + 14} M${x - 6},${y + 20} H${x + 6}`, { 'stroke-width': 3 });
const wav = (x0, x1, y, a, ph, k = 22, clipLo = -1e9, clipHi = 1e9) => { let d = ''; for (let x = x0; x <= x1; x += 4) { const v = Math.max(clipLo, Math.min(clipHi, a * Math.sin((x - x0) / k + ph))); d += (x === x0 ? 'M' : 'L') + x + ',' + (y - v).toFixed(1); } return d; };
const sub = (e, s, fs = 16) => { const q = mk(e, 'tspan', { 'font-size': fs, dy: 6, 'font-style': 'normal' }); q.textContent = s; return e; };
const RED = C.red, OK = C.ok, GOLD = '#B7791F';
const RE_ = "r'_e", rc_ = 'r_c', AV = 'A_v';
const fmtF = f => f >= 1e6 ? (f / 1e6).toFixed(f < 9.95e6 ? 1 : 0).replace('.0', '') + ' MHz' : f >= 1e3 ? (f / 1e3).toFixed(f < 9950 ? 1 : 0).replace('.0', '') + ' kHz' : Math.round(f) + ' Hz';
// EXAMPLE FIGURES: mid-band gain 150, f1 = 50 Hz, f2 = 200 kHz (single-pole roll-off each side)
const gainF = (f, Am = 150, f1 = 50, f2 = 2e5) => Am / Math.sqrt((1 + (f1 / f) ** 2) * (1 + (f / f2) ** 2));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Aarav') - 0.2;
const tP = T0('P1'), tS = T0('S1'), tG = T0('G1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const spk = s => W(s, 'M60,128 H80 L110,102 V198 L80,172 H60 Z', { fill: '#fff' });
const spk1 = spk(h1S), spk2 = spk(h2S);
const wv1 = mk(h1S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wvB = mk(h2S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' }), wvH = mk(h2S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const hLb = [mono(h1S, 740, 252, 'voice · middle notes', { 'text-anchor': 'end', fill: GOLD, 'font-weight': 600 }), mono(h2S, 150, 252, 'deep drum', { fill: MU, 'font-weight': 600 }), mono(h2S, 740, 252, 'high whistle', { 'text-anchor': 'end', fill: MU, 'font-weight': 600 })];

/* ================= P: rubber wall + leaky pipe ================= */
const pS = $('#pS');
const pipeP = [W(pS, 'M40,170 H744'), W(pS, 'M40,330 H744')];
const memb = W(pS, 'M392,170 Q392,250 392,330', { stroke: AM, 'stroke-width': 6 });
const pInW = mk(pS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), pOutW = mk(pS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pLb = [mono(pS, 40, 150, 'push in', { fill: '#5F7399', 'font-weight': 600 }), mono(pS, 744, 150, 'what gets through', { fill: GOLD, 'font-weight': 600, 'text-anchor': 'end' }), mono(pS, 392, 372, 'rubber wall', { fill: INK, 'font-weight': 600, 'text-anchor': 'middle' })];
const pCap = mk(pS, 'g'); W(pCap, 'M300,430 H376 M408,430 H484', { 'stroke-width': 4 }); W(pCap, 'M380,404 V456 M404,404 V456', { 'stroke-width': 6 });
const pCapT = mono(pS, 500, 437, '= capacitor', { fill: INK, 'font-weight': 600 });
const lS = $('#lS');
const pipeL = [W(lS, 'M40,170 H744'), W(lS, 'M40,330 H744')];
const holes = [250, 360, 470, 580].map(x => mk(lS, 'rect', { x: x - 8, y: 324, width: 16, height: 12, fill: '#F7F5EF', stroke: INK, 'stroke-width': 2 }));
const drops = [250, 360, 470, 580].map(x => mk(lS, 'path', { d: `M${x},346 q-8,14 0,20 q8,-6 0,-20 Z`, fill: CH1 }));
const lW = mk(lS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const lLb = [mono(lS, 40, 150, 'very fast wave in', { fill: '#5F7399', 'font-weight': 600 }), mono(lS, 744, 150, 'less at the end', { fill: GOLD, 'font-weight': 600, 'text-anchor': 'end' }), mono(lS, 415, 412, 'tiny leaks = hidden capacitance', { fill: INK, 'font-weight': 600, 'text-anchor': 'middle' })];
$('#pZ').innerHTML = M.icon('zap', 30, AM, 2.4); $('#pZ2').innerHTML = M.icon('zap', 30, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cRail = W(ck, 'M400,110 H870 V280'), cLow = W(ck, 'M870,300 V500 H180');
const bat = [W(ck, 'M842,280 H898', { 'stroke-width': 5 }), W(ck, 'M856,300 H884', { 'stroke-width': 9 })];
const cR1 = zigV(ck, 400, 110, 330), cR2 = zigV(ck, 400, 330, 500), cBase = W(ck, 'M400,330 H499'), nodeB = mk(ck, 'circle', { cx: 400, cy: 330, r: 7, fill: INK });
const tr = mk(ck, 'g'); npn(tr, 520, 330, 50, 0.9);
const cRC = zigV(ck, 541, 110, 250), cCw = W(ck, 'M541,250 V285'), cRE = zigV(ck, 541, 375, 500);
const cIn = [W(ck, 'M180,330 H272'), W(ck, 'M272,306 V354', { 'stroke-width': 5 }), W(ck, 'M288,306 V354', { 'stroke-width': 5 }), W(ck, 'M288,330 H400')];
const cOut = [W(ck, 'M541,262 H644'), W(ck, 'M644,238 V286', { 'stroke-width': 5 }), W(ck, 'M660,238 V286', { 'stroke-width': 5 }), W(ck, 'M660,262 H740'), zigV(ck, 740, 262, 500)];
const cOutD = [mk(ck, 'circle', { cx: 541, cy: 262, r: 7, fill: INK }), mk(ck, 'circle', { cx: 740, cy: 262, r: 7, fill: INK })];
const cBy = [W(ck, 'M541,392 H630 V428'), W(ck, 'M606,428 H654', { 'stroke-width': 5 }), W(ck, 'M606,442 H654', { 'stroke-width': 5 }), W(ck, 'M630,442 V500')];
const cByD = mk(ck, 'circle', { cx: 541, cy: 392, r: 7, fill: INK });
const term = [mk(ck, 'circle', { cx: 180, cy: 330, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 180, cy: 500, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const lBias = [sub(tx(ck, 424, 214, 'R', { 'font-style': 'italic' }), '1'), sub(tx(ck, 424, 418, 'R', { 'font-style': 'italic' }), '2'), sub(tx(ck, 566, 168, 'R', { 'font-style': 'italic' }), 'C'), mono(ck, 566, 196, '3.9 kΩ', { 'font-weight': 600, fill: INK }), sub(tx(ck, 470, 476, 'R', { 'font-style': 'italic' }), 'E'),
  tx(ck, 830, 296, '12 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 906, 272, '+', { 'font-size': 26 })];
const lCin = [tx(ck, 280, 290, 'C in', { 'text-anchor': 'middle' }), mono(ck, 280, 384, 'coupling', { 'text-anchor': 'middle', 'font-size': 17 })];
const lCout = [tx(ck, 652, 222, 'C out', { 'text-anchor': 'middle' }), sub(tx(ck, 756, 376, 'R', { 'font-style': 'italic' }), 'L'), mono(ck, 756, 404, '3.9 kΩ', { 'font-weight': 600, fill: INK })];
const lCE = [tx(ck, 664, 446, 'C E', {}), mono(ck, 664, 472, 'bypass', { 'font-size': 17 })];
const lIO = [tx(ck, 180, 300, 'v in', { 'text-anchor': 'middle', fill: TE }), tx(ck, 726, 322, 'v out', { 'text-anchor': 'end', fill: TE })];
const eC = flow(ck, [[870, 300], [870, 500], [541, 500], [541, 110], [870, 110], [870, 280]], 24, {
  skip: (x, y) => Math.hypot(x - 520, y - 330) < 54 || (Math.abs(x - 541) < 2 && ((y > 145 && y < 215) || (y > 408 && y < 467))) || (Math.abs(x - 870) < 2 && y > 270 && y < 310) });
const tIn = wt('S8', 'ten'), tDn = wt('S11', 'down'), tDn1 = T0('S12') + 0.2, tUp = wt('S13', 'up'), tUp1 = T0('S14') + 0.2;
const lf = t => t < tDn ? 3 : t < tUp ? M.lerp(3, Math.log10(20), M.io((t - tDn) / (tDn1 - tDn))) : M.lerp(Math.log10(20), 6, M.io((t - tUp) / (tUp1 - tUp)));
const vin = t => t < tIn ? 0 : Math.sin(Math.PI * (t - tIn));
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 IN · 20 mV/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 OUT · 2 V/div', { fill: GOLD, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k n">f</span><span class="v" id="rF" style="font-size:30px">1 kHz</span><span class="u"></span>
  <span class="k">|A<sub>v</sub>|</span><span class="v" id="rA">150</span><span class="u"></span>
  <span class="k" style="color:${TE}">v<sub>in</sub></span><span class="v" id="rVi" style="color:${TE}">10</span><span class="u">mV</span>
  <span class="k" style="color:${TE}">v<sub>out</sub></span><span class="v" id="rVo" style="color:${TE}">1.50</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So that is why the drums sound weak!' });

/* ================= G: frequency response ================= */
const gS = $('#gS');
const gp = PUC.graph(gS, { x: 110, y: 96, w: 600, h: 360, xmax: 6, ymax: 175, xt: [], yt: [50, 100, 150], xl: 'f', yl: '|A v|' });
['10', '100', '1k', '10k', '100k', '1M', '10M'].forEach((s, i) => { gp.mk('line', { x1: gp.X(i), y1: 456, x2: gp.X(i), y2: 464, stroke: INK, 'stroke-width': 2 }); const e = mono(gS, gp.X(i), 488, s, { 'text-anchor': 'middle', 'font-size': 18 }); });
gp.xlab.setAttribute('x', 710); gp.xlab.setAttribute('y', 520); gp.xlab.textContent = 'frequency (Hz)';
const gX = f => Math.log10(f) - 1;
const gcv = gp.curve(INK, 5), gdot = gp.dot(AM, 12);
const g707 = gp.mk('line', { x1: gp.X(0), y1: gp.Y(106), x2: gp.X(6), y2: gp.Y(106), stroke: RED, 'stroke-width': 2, 'stroke-dasharray': '7 6' });
const g707T = mono(gS, gp.X(2.5), gp.Y(106) - 12, '0.707 × 150 = 106', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 });
const gF = [gX(50), gX(2e5)].map(x => gp.mk('line', { x1: gp.X(x), y1: gp.Y(0), x2: gp.X(x), y2: gp.Y(106), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const gFT = [mono(gS, gp.X(gX(50)), 540, 'f1', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(gS, gp.X(gX(2e5)), 540, 'f2', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 })];
const gBW = PUC.arrow(gS, AM, 4, 14), gBW2 = PUC.arrow(gS, AM, 4, 14), gBWT = mono(gS, (gp.X(gX(50)) + gp.X(gX(2e5))) / 2, gp.Y(106) + 46, 'BANDWIDTH', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 });
const gRg = [mono(gS, (gp.X(gX(50)) + gp.X(gX(2e5))) / 2, gp.Y(150) - 18, 'MID BAND · flat', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }),
  mono(gS, gp.X(0) + 12, gp.Y(28), 'low', { fill: MU, 'font-weight': 600 }), mono(gS, gp.X(6) - 12, gp.Y(28), 'high', { fill: MU, 'font-weight': 600, 'text-anchor': 'end' })];
const tiles = [0, 1, 2].map(i => $('#gt' + i));
$('#gF0').innerHTML = K('X_C = \\dfrac{1}{2\\pi f C}'); $('#gF2').innerHTML = K('BW = f_2 - f_1');

/* ================= D: derivation ================= */
const dS = $('#dS');
const dT = mk(dS, 'g'); const dP = npn(dT, 330, 200, 46, 0.85);
const dEl = [W(dS, 'M349,159 V110 H620'), zigV(dS, 520, 110, 320), zigV(dS, 620, 110, 320), W(dS, 'M520,320 H620 M570,320 V334'), gnd(dS, 570, 334), zigV(dS, 349, 241, 330), gnd(dS, 349, 330), W(dS, 'M160,200 H311'), W(dS, 'M130,230 V330'), gnd(dS, 130, 330)];
const dSrc = mk(dS, 'circle', { cx: 130, cy: 200, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), dSrcW = W(dS, 'M112,200 q9,-16 18,0 t18,0', { stroke: CH1, 'stroke-width': 3 });
const dLb = [tx(dS, 130, 156, 'v in', { 'text-anchor': 'middle', fill: TE }), sub(tx(dS, 540, 222, 'R', { 'font-style': 'italic' }), 'C'), sub(tx(dS, 640, 222, 'R', { 'font-style': 'italic' }), 'L')];
const dRe = tx(dS, 372, 300, "r′", { 'font-style': 'italic', 'font-size': 26 }); sub(dRe, 'e');
const dRc = mono(dS, 570, 88, 'r c = R C ∥ R L', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const dHl = [mk(dS, 'rect', { x: 359, y: 262, width: 70, height: 52, rx: 10, fill: 'none', stroke: AM, 'stroke-width': 3 }), mk(dS, 'rect', { x: 490, y: 64, width: 162, height: 270, rx: 12, fill: 'none', stroke: AM, 'stroke-width': 3 })];
$('#dbt').innerHTML = [['× 10', '20 dB'], ['× 100', '40 dB'], ['× 150', '43.5 dB'], ['× 0.707', '−3 dB']].map(([a, d]) => `<span class="a">${a}</span><span class="r">→</span><span class="d">${d}</span>`).join('');
const dbC = [...$('#dbt').children];
const gBars = mk(dS, 'g');
mono(gBars, 36, 420, 'r c · kilo-ohms', { fill: INK, 'font-weight': 600 }); mk(gBars, 'rect', { x: 260, y: 400, width: 470, height: 30, rx: 10, fill: INK });
mono(gBars, 36, 476, "r′e · a few ohms", { fill: INK, 'font-weight': 600 }); mk(gBars, 'rect', { x: 260, y: 456, width: 10, height: 30, rx: 5, fill: INK });
const gBarT = mono(dS, 36, 540, 'big ÷ tiny = big gain', { fill: GOLD, 'font-weight': 600, 'font-size': 24 });
const dRows = rows($('#dSteps'), [
  [K(`${RE_} = \\dfrac{26\\,\\text{mV}}{${IE}}`), 'emitter resistance', 92],
  [K(`${rc_} = \\dfrac{R_C\\,R_L}{R_C + R_L}`), 'in parallel', 186],
  [K(`${AV} = -\\,\\dfrac{${rc_}}{${RE_}}`), 'minus: upside down', 290],
  [K(`${AV}(\\text{dB}) = 20\\log_{10} ${AV}`), 'decibels', 384],
  [K(`A = 0.707\\,A_{mid}\\ \\ (-3\\,\\text{dB})`), 'at f₁ and f₂', 478]]);
const tDR = [wt('D3', 'equals'), wt('D5', 'equals'), wt('D6', 'equals'), wt('D8', 'equals'), wt('D9', 'zero')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${IE} = 2\\,\\text{mA}`), K(`R_C = 3.9\\,${KO}`), K(`R_L = 3.9\\,${KO}`), K('f_1 = 50\\,\\text{Hz}'), K('f_2 = 200\\,\\text{kHz}')].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS');
const wg = PUC.graph(wS, { x: 110, y: 236, w: 600, h: 250, xmax: 6, ymax: 175, xt: [], yt: [50, 100, 150], yl: '|A v|' });
['10', '100', '1k', '10k', '100k', '1M', '10M'].forEach((s, i) => { wg.mk('line', { x1: wg.X(i), y1: 486, x2: wg.X(i), y2: 494, stroke: INK, 'stroke-width': 2 }); mono(wS, wg.X(i), 518, s, { 'text-anchor': 'middle', 'font-size': 18 }); });
const wcv = wg.curve(INK, 4);
const wMid = mono(wS, wg.X(2.5), wg.Y(150) - 16, '150 = 43.5 dB', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 });
const wF = [gX(50), gX(2e5)].map(x => wg.mk('line', { x1: wg.X(x), y1: wg.Y(0), x2: wg.X(x), y2: wg.Y(106), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const wBW = PUC.arrow(wS, AM, 4, 14), wBW2 = PUC.arrow(wS, AM, 4, 14), wBWT = mono(wS, (wg.X(gX(50)) + wg.X(gX(2e5))) / 2, wg.Y(106) + 36, 'BW ≈ 200 kHz', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 });
const wRows = rows($('#wSteps'), [
  [K(`${RE_} = \\dfrac{26}{2} = 13\\,\\Omega`), '', 92],
  [K(`${rc_} = \\dfrac{3.9 \\times 3.9}{7.8} = 1.95\\,${KO}`), '', 196],
  [K(`|${AV}| = \\dfrac{1950}{13} = 150`), '', 300],
  [K('20\\log_{10} 150 \\approx 43.5\\,\\text{dB}'), '', 396],
  [K('BW = 200\\,\\text{kHz} - 50\\,\\text{Hz} \\approx 200\\,\\text{kHz}'), '', 490]]);
const tWR = [wt('W4', 'r'), wt('W5', 'r'), wt('W6', 'A'), wt('W7', 'In'), wt('W9', 'So')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'At the cut-off, the voltage gain halves', right: 'Voltage gain × 0.707 · power halves', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcRow = (y, s, col) => { const l = mono(tcS, 36, y + 26, s, { fill: INK, 'font-weight': 600 }); mk(tcS, 'rect', { x: 250, y, width: 400, height: 36, rx: 10, fill: C.soft }); const b = mk(tcS, 'rect', { x: 250, y, width: 400, height: 36, rx: 10, fill: col }); const v = mono(tcS, 666, y + 27, '100%', { fill: col, 'font-weight': 600, 'font-size': 24 }); return [l, b, v]; };
const tcV = tcRow(96, 'VOLTAGE GAIN', AM), tcP = tcRow(176, 'POWER', GOLD);
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the CE amplifier and its frequency response, define bandwidth, find the voltage gain' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An amplifier has a mid-band gain of 40&nbsp;dB, f<sub>1</sub>&nbsp;=&nbsp;40&nbsp;Hz and f<sub>2</sub>&nbsp;=&nbsp;40&nbsp;kHz. Find the voltage gain at f<sub>2</sub> and the bandwidth.', qW: 780,
  opts: ['50 and 40 kHz', '70.7 and 39.96 kHz', '70.7 and 40.04 kHz', '100 and 39.96 kHz'], right: 1, optW: 474, optY: 330, optFs: 28 });
const sol = PUC.solution($('#so'), [[K('20\\log_{10} A = 40 \\Rightarrow A = 100')], [K('A(f_2) = 0.707 \\times 100 = 70.7')], [K('BW = 40\\,\\text{kHz} - 40\\,\\text{Hz}')], [K('BW = 39.96\\,\\text{kHz}')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Forty'), wt('A3', 'At'), wt('A4', 'The'), wt('A4', 'Thirty') - 0.2];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'CE amplifier and frequency response · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K(`${RE_} = 26\\,\\text{mV} / ${IE} \\qquad ${rc_} = R_C \\parallel R_L`), K(`${AV} = -\\,${rc_} / ${RE_} \\quad (180^\\circ \\text{ phase shift})`), K(`${AV}(\\text{dB}) = 20\\log_{10} ${AV}`), K('BW = f_2 - f_1 \\quad \\text{at } 0.707\\,A_{mid}\\ (-3\\,\\text{dB})'),
    'Low end: coupling and bypass capacitors · High end: hidden capacitance'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 68', topic: 'RC coupled multistage amplifier', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('S9', 'output'), 1.1, 1100, 480], [T1('S10'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[wt('S5', 'load'), tT - 0.4], [tW + 0.2, tX - 0.32]];

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
    const t1 = wt('H1', 'song') - 0.3, t2 = wt('H3', 'deep') - 0.3, ph = -5 * (t - t1);
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); M.vis($('#h1T'), t, wt('H2', 'loud') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(spk1, t, t1 + 0.2, 0.5); M.vis(wv1, t, t1 + 0.4, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wv1, 'd', wav(150, 740, 140, 62 * M.o3((t - wt('H2', 'loud')) / 0.5) + 8, ph, 22));
    M.vis(hLb[0], t, wt('H2', 'singer'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2T'), t, wt('H3', 'weak') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(spk2, t, t2 + 0.2, 0.5);
    M.vis(wvB, t, t2 + 0.4, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wvB, 'd', wav(150, 420, 140, 16, -2 * (t - t1), 60));
    M.vis(wvH, t, wt('H3', 'whistles') - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wvH, 'd', wav(470, 740, 140, 14, -9 * (t - t1), 5));
    M.vis(hLb[1], t, t2 + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(hLb[2], t, wt('H3', 'whistles'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#aPill'), t, wt('H4', 'one') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: rubber wall + leaky pipe */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P6', 'tiny') - 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq(pipeP, t, tP + 0.3, 0.5, 0.12); M.draw(memb, t, wt('P1', 'rubber'), 0.4); M.vis(pLb[2], t, wt('P1', 'rubber') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const tf = wt('P2', 'Push'), tsl = wt('P3', 'Push');
    const slow = t >= tsl - 0.2, k = slow ? 70 : 14, sp = slow ? 1.2 : 6, ph = -sp * (t - tf);
    const ai = 40 * M.o3((t - tf) / 0.5), ao = slow ? 40 * (1 - 0.88 * M.io((t - tsl) / 0.8)) * M.o3((t - tf) / 0.5) : ai;
    M.vis(pInW, t, tf, 1e9, { dy: 0, fade: 0.2 }); M.vis(pOutW, t, tf + 0.2, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(pInW, 'd', wav(56, 372, 250, ai, ph, k)); PUC.attr(pOutW, 'd', wav(412, 728, 250, ao, ph - 340 / k, k));
    const bulge = ai * Math.sin(ph + 316 / k) * (slow ? 0.9 : 0.5);
    PUC.attr(memb, 'd', `M392,170 Q${(392 + bulge).toFixed(1)},250 392,330`);
    fadeAt(pLb.slice(0, 2), t, tf + 0.3, 0.2);
    M.vis($('#pSp'), t, tf, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#pSp'), slow ? 'SLOW PUSH' : 'FAST PUSH'); $('#pSp').style.background = slow ? RED : INK;
    M.vis(pCap, t, wt('P4', 'capacitor') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(pCapT, t, wt('P4', 'capacitor'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip'), t, wt('P5', 'blocks') - 0.2, 1e9, { dy: 24 });
    // leaky pipe
    const t6 = wt('P6', 'tiny'), t7 = wt('P7', 'fast');
    drawSeq(pipeL, t, t6 - 0.1, 0.5, 0.1); holes.forEach((h, i) => M.vis(h, t, wt('P6', 'holes') - 0.1 + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    const lk = M.io((t - t7) / 0.8), lph = -8 * (t - t6);
    M.vis(lW, t, t6 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    let d = ''; for (let x = 56; x <= 728; x += 3) { const a = 40 * (1 - lk * 0.75 * (x - 56) / 672); d += (x === 56 ? 'M' : 'L') + x + ',' + (250 - a * Math.sin((x - 56) / 6 + lph)).toFixed(1); } PUC.attr(lW, 'd', d);
    drops.forEach((e, i) => { M.vis(e, t, t7 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(e, 'transform', `translate(0,${(((t - t7) * 30 + i * 9) % 24).toFixed(1)})`); });
    fadeAt(lLb, t, t6 + 0.4, 0.3); M.vis($('#pSp2'), t, t7 - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#pStrip2'), t, wt('P7', 'Less') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tS - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32;
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tS + 0.45, out, { dy: 36, ...o });
    const tb = wt('S2', 'voltage') - 0.3;
    drawSeq([cRail, ...bat, cLow, cR1, cR2, cBase, cRC, cCw, cRE], t, tb, 0.35, 0.08); M.vis(tr, t, tb + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(nodeB, t, tb + 0.6, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(lBias, t, tb + 0.6, 0.08);
    const ti = wt('S3', 'capacitor') - 0.3; drawSeq(cIn, t, ti, 0.25, 0.08); fadeAt([...term, ...lCin, lIO[0]], t, ti + 0.3, 0.08);
    const to = wt('S5', 'C') - 0.2; drawSeq(cOut, t, to, 0.3, 0.1); fadeAt([...cOutD, ...lCout, lIO[1]], t, to + 0.4, 0.08);
    const te = wt('S6', 'C') - 0.2; drawSeq(cBy, t, te, 0.25, 0.08); fadeAt([cByD, ...lCE], t, te + 0.4, 0.1);
    eC.set(40 * (t - tb), t >= tb + 1.2); M.vis($('#ckE'), t, tb + 1.2, 1e9, { dy: 0, fade: 0.2 });
    // frequency
    const L = lf(t), f = 10 ** L, A = gainF(f);
    M.vis($('#ft'), t, tIn - 0.3, 1e9, { dy: 10 }); M.setT($('#ftV'), fmtF(f)); $('#ftK').style.left = (110 * (L - 1) / 5).toFixed(1) + 'px';
    M.vis($('#ro1'), t, tIn - 0.2, 1e9, { dy: 12 });
    M.setT($('#rF'), fmtF(f)); M.setT($('#rA'), A.toFixed(0)); M.setT($('#rVo'), (A * 0.01).toFixed(2));
    M.vis($('#rgT'), t, tIn, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), f < 300 ? 'LOW END' : f > 3e4 ? 'HIGH END' : 'MID BAND'); $('#rgT').style.background = A < 106 ? RED : INK;
    M.vis($('#slowT'), t, tIn, 1e9, { dy: 0, fade: 0.2 });
    // the scope plots the amplitude set by the frequency at each past instant
    tr1(u => 18 * vin(u), t, tIn, 4, 40, t >= tIn - 0.3); tr2(u => -23 * gainF(10 ** lf(u)) * 0.01 * vin(u), t, tIn, 4, 130, t >= tIn - 0.3);
    fadeAt(scL, t, tIn - 0.3, 0.1);
    avB(t, wt('S14', 'shrinks') + 0.2, tG - 0.2);
  }

  /* G: frequency response */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    const tc0 = wt('G1', 'Plot'), dr = M.clamp((t - tc0) / 3);
    gcv(u => [u, gainF(10 ** (u + 1))], 0, 6 * dr, 120); gdot(6 * dr, gainF(10 ** (6 * dr + 1)), dr > 0 && dr < 1);
    M.vis(gRg[0], t, wt('G2', 'mid'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gRg[1], t, wt('G3', 'low'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gRg[2], t, wt('G6', 'high'), 1e9, { dy: 0, fade: 0.2 });
    const t8 = wt('G8', 'gain'); M.draw(g707, t, t8, 0.5); M.vis(g707T, t, t8 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(gF, t, wt('G9', 'lower') - 0.2, 0.4, 0.8); M.vis(gFT[0], t, wt('G9', 'f'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gFT[1], t, wt('G9', 'f', 1), 1e9, { dy: 0, fade: 0.2 });
    const tb = wt('G10', 'band'), ub = M.io((t - tb) / 0.6), xm = (gp.X(gX(50)) + gp.X(gX(2e5))) / 2, yb = gp.Y(106) + 18;
    gBW.set(xm, yb, xm + (gp.X(gX(2e5)) - xm) * ub, yb); gBW2.set(xm, yb, xm - (xm - gp.X(gX(50))) * ub, yb); M.vis(gBWT, t, tb + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const ts = [wt('G3', 'low') - 0.2, wt('G6', 'high') - 0.2, wt('G10', 'bandwidth') - 0.3];
    tiles.forEach((e, i) => { M.vis(e, t, ts[i], 1e9, { dy: 20 }); const act = t >= ts[i] && (i === 2 || t < ts[i + 1]); e.style.borderColor = act ? AM : C.soft; e.style.background = act ? C.ac2 : C.soft; });
    M.vis($('#gF0'), t, wt('G4', 'reactance'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#gF2'), t, wt('G10', 'B'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Weak') - 0.1, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dEl, t, tD + 0.3, 0.3, 0.06); M.vis(dT, t, tD + 0.6, 1e9, { dy: 0, fade: 0.2 }); fadeAt([dSrc, dSrcW, ...dLb], t, tD + 0.8, 0.06);
    M.vis(dRe, t, wt('D2', 'tiny'), 1e9, { dy: 0, fade: 0.2 }); M.vis(dHl[0], t, wt('D2', 'tiny'), wt('D4', 'At'), { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis(dHl[1], t, wt('D4', 'share'), wt('D6', 'The'), { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(dRc, t, tDR[1], 1e9, { dy: 0, fade: 0.2 });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis(gBars, t, tDR[2] - 0.2, tDR[3] - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(gBarT, t, tDR[2] + 0.6, tDR[3] - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    const tdb = [tDR[3], tDR[3] + 0.4, tDR[3] + 0.8, wt('D10', 'three')];
    dbC.forEach((e, i) => M.vis(e, t, tdb[Math.floor(i / 3)], 1e9, { dy: 0, fade: 0.2 }));
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'I'), wt('W3', 'R'), wt('W3', 'L'), wt('W8', 'fifty'), wt('W8', 'two')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    runRows(wRows, t, tWR);
    M.vis(wS, t, tW + 0.6, 1e9, { dy: 0, fade: 0.2 });
    wcv(u => [u, gainF(10 ** (u + 1))], 0, 6 * M.clamp((t - tWR[2]) / 1.4), 120); M.vis(wMid, t, tWR[3] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(wF, t, wt('W8', 'fifty') - 0.1, 0.6);
    const ub = M.io((t - tWR[4]) / 0.6), xm = (wg.X(gX(50)) + wg.X(gX(2e5))) / 2, yb = wg.Y(106) + 10;
    wBW.set(xm, yb, xm + (wg.X(gX(2e5)) - xm) * ub, yb); wBW2.set(xm, yb, xm - (xm - wg.X(gX(50))) * ub, yb); M.vis(wBWT, t, tWR[4] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wBox'), t, tWR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'does') - 0.05, tRight: wt('X3', 'voltage') - 0.2 });
    const uv = M.io((t - wt('X3', 'zero')) / 0.6), up = M.io((t - wt('X4', 'power')) / 0.6);
    fadeAt(tcV, t, tX + 0.6, 0.05); fadeAt(tcP, t, tX + 0.8, 0.05);
    PUC.attr(tcV[1], 'width', (400 * (1 - 0.293 * uv)).toFixed(1)); M.setT(tcV[2], (100 - 29.3 * uv).toFixed(1).replace('.0', '') + '%');
    PUC.attr(tcP[1], 'width', (400 * (1 - 0.5 * up)).toFixed(1)); M.setT(tcP[2], (100 - 50 * up).toFixed(0) + '%');
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Draw') - 0.2 });
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
