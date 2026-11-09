// PUC Electronics Ep 66 - Voltage divider bias and stability ("Breadboard" style, Lab Notebook world)
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
const RED = C.red, OK = C.ok, VB_ = c(TE, 'V_B'), VE_ = c(TE, 'V_E'), VBE_ = c(TE, 'V_{BE}'), VCE_ = c(TE, 'V_{CE}');

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'cool') - 0.2;
const tP = T0('P1'), tB = T0('B1'), tM = T0('M1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const sun = mk(h1S, 'circle', { cx: 80, cy: 150, r: 28, fill: '#F2C14E' });
const sunR = W(h1S, 'M80,104 V112 M80,188 V196 M34,150 H42 M118,150 H126 M48,118 L54,124 M106,176 L112,182 M112,118 L106,124 M54,176 L48,182', { stroke: '#F2C14E', 'stroke-width': 4 });
const spk1 = W(h1S, 'M164,128 H184 L214,102 V198 L184,172 H164 Z', { fill: '#fff' });
const wv1 = mk(h1S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const thO = W(h2S, 'M70,96 V176 a18,18 0 1 0 20,0 V96 a10,10 0 0 0 -20,0 Z', { 'stroke-width': 3.5, fill: '#fff' });
const thF = mk(h2S, 'rect', { x: 74, y: 170, width: 12, height: 20, fill: RED });
const thB = mk(h2S, 'circle', { cx: 80, cy: 192, r: 13, fill: RED });
const spk2 = W(h2S, 'M164,128 H184 L214,102 V198 L184,172 H164 Z', { fill: '#fff' });
const wv2 = mk(h2S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const clipL = mk(h2S, 'line', { x1: 250, y1: 182, x2: 740, y2: 182, stroke: RED, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
const clipT = mono(h2S, 740, 222, 'bottoms chopped flat', { fill: RED, 'font-weight': 600, 'text-anchor': 'end' });

/* ================= P: tap idea + tank float ================= */
const pS = $('#pS');
const ceilY = 120, floorY = 450;
const ceil = W(pS, `M180,${ceilY} H740`, { stroke: MU, 'stroke-width': 2.5, 'stroke-dasharray': '10 8' }), flr = W(pS, `M180,${floorY} H740`, { stroke: MU, 'stroke-width': 2.5 });
const ceilT = mono(pS, 740, ceilY - 14, 'TAP FULLY OPEN', { 'text-anchor': 'end', 'font-weight': 600 }), flrT = mono(pS, 740, floorY + 30, 'TAP CLOSED', { 'text-anchor': 'end', 'font-weight': 600 });
const restL = mk(pS, 'line', { x1: 180, y1: 285, x2: 740, y2: 285, stroke: AM, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const pW = mk(pS, 'path', { fill: 'none', stroke: '#5F7399', 'stroke-width': 5, 'stroke-linecap': 'round' });
const pWc = mk(pS, 'path', { fill: 'none', stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' });
const restT = mono(pS, 186, 274, 'resting point', { fill: '#B7791F', 'font-weight': 600 });
// small tap glyph at the left; its handle turns as the resting point creeps up
const tapB = W(pS, 'M40,300 H130 M40,330 H112 Q130,330 130,348 V372 M112,330 V372', { 'stroke-width': 4 });
const tapV = mk(pS, 'rect', { x: 68, y: 286, width: 34, height: 58, rx: 6, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const tapO = mk(pS, 'g', { transform: 'translate(85,286)' }), tapW = mk(tapO, 'g'), tapH = mk(tapW, 'g'); W(tapH, 'M0,0 V-30', { 'stroke-width': 4 }); W(tapH, 'M-28,-30 H28', { 'stroke-width': 7 });
const heatC = mk(pS, 'g'); mk(heatC, 'rect', { x: 36, y: 150, width: 116, height: 40, rx: 10, fill: C.redBg }); const heatT = mono(heatC, 94, 177, 'HEAT', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600 });
// tank + float
const fS = $('#fS');
const tank = W(fS, 'M200,150 V450 H600 V150', { 'stroke-width': 4 });
const water = mk(fS, 'rect', { x: 202, y: 400, width: 396, height: 48, fill: CH1, opacity: 0.55 });
const inlet = W(fS, 'M40,110 H240 V146', { 'stroke-width': 4 }), inlet2 = W(fS, 'M40,92 H258 V146', { 'stroke-width': 4 });
const stream = mk(fS, 'rect', { x: 242, y: 150, width: 14, height: 250, fill: CH1 });
const valveG = mk(fS, 'rect', { x: 236, y: 92, width: 26, height: 18, fill: INK });
const pivot = mk(fS, 'circle', { cx: 300, cy: 128, r: 7, fill: INK });
const arm = W(fS, 'M300,128 L470,300', { 'stroke-width': 4 });
const ball = mk(fS, 'circle', { cx: 470, cy: 300, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const link = W(fS, 'M262,101 H300', { 'stroke-width': 3 });
const fLb = [mono(fS, 40, 80, 'inlet', { fill: INK, 'font-weight': 600 }), mono(fS, 520, 250, 'float', { fill: INK, 'font-weight': 600 })];
const fClose = mono(fS, 280, 80, 'inlet closes', { fill: OK, 'font-weight': 600 });
$('#pZ').innerHTML = M.icon('check', 30, AM, 3);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cRail = W(ck, 'M400,110 H840 V280'), cLow = W(ck, 'M840,300 V500 H180');
const bat = [W(ck, 'M812,280 H868', { 'stroke-width': 5 }), W(ck, 'M826,300 H854', { 'stroke-width': 9 })];
const cRC = zigV(ck, 541, 110, 250), cCw = W(ck, 'M541,250 V285');
const tr = mk(ck, 'g'); const trP = npn(tr, 520, 330, 50, 0.9);
const cBase = W(ck, 'M400,330 H499'), cRB = zigV(ck, 400, 110, 330), cR2 = zigV(ck, 400, 330, 500);
const cEfix = W(ck, 'M541,375 V500'), cRE = zigV(ck, 541, 375, 500);
const cIn = [W(ck, 'M180,330 H272'), W(ck, 'M272,306 V354', { 'stroke-width': 5 }), W(ck, 'M288,306 V354', { 'stroke-width': 5 }), W(ck, 'M288,330 H400')];
const cOut = [W(ck, 'M541,262 H652'), mk(ck, 'circle', { cx: 541, cy: 262, r: 7, fill: INK }), mk(ck, 'circle', { cx: 660, cy: 262, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const nodeB = mk(ck, 'circle', { cx: 400, cy: 330, r: 7, fill: INK });
const term = [mk(ck, 'circle', { cx: 180, cy: 330, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 180, cy: 500, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const lRB = sub(tx(ck, 424, 214, 'R', { 'font-style': 'italic' }), 'B'), lR1 = sub(tx(ck, 424, 214, 'R', { 'font-style': 'italic' }), '1');
const vRB = mono(ck, 424, 242, '820 kΩ', { 'font-weight': 600, fill: INK }), vR1 = mono(ck, 424, 242, '10 kΩ', { 'font-weight': 600, fill: INK });
const lR2 = [sub(tx(ck, 424, 418, 'R', { 'font-style': 'italic' }), '2'), mono(ck, 424, 446, '2.2 kΩ', { 'font-weight': 600, fill: INK })];
const lRE = [sub(tx(ck, 566, 432, 'R', { 'font-style': 'italic' }), 'E'), mono(ck, 566, 460, '1 kΩ', { 'font-weight': 600, fill: INK })];
const cLb = [tx(ck, 180, 382, 'v in', { 'text-anchor': 'middle', fill: TE }), tx(ck, 660, 302, 'v out', { 'text-anchor': 'middle', fill: TE }),
  sub(tx(ck, 566, 168, 'R', { 'font-style': 'italic' }), 'C'), mono(ck, 566, 196, '3.6 kΩ', { 'font-weight': 600, fill: INK }),
  tx(ck, 800, 296, '10 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 876, 272, '+', { 'font-size': 26 }), mono(ck, 586, 356, 'npn', { 'font-weight': 600, fill: INK })];
const aIC = PUC.arrow(ck, VI, 6, 16), lIC = sub(tx(ck, 752, 178, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), 'C');
const eC = flow(ck, [[840, 300], [840, 500], [541, 500], [541, 110], [840, 110], [840, 280]], 24, {
  skip: (x, y) => Math.hypot(x - 520, y - 330) < 54 || (Math.abs(x - 541) < 2 && ((y > 145 && y < 215) || (y > 405 && y < 470))) || (Math.abs(x - 840) < 2 && y > 270 && y < 310) });
// EXAMPLE FIGURES: V_CC 10 V, R_C 3.6 kOhm; fixed bias R_B 820 kOhm; divider R1 10 k, R2 2.2 k, R_E 1 k; beta 100 at 25 C rising to 200 at 75 C
const tFix = wt('B2', 'simplest'), tIn = wt('B3', 'small'), tH1 = wt('B6', 'heat'), tH1e = T0('B8'), tVdb = T0('B10'), tH2 = wt('B13', 'Heat'), tH2e = T0('B14') + 0.6;
const isV = t => t >= tVdb - 0.3;
const temp = t => isV(t) ? 25 + 50 * M.io((t - tH2) / (tH2e - tH2)) : 25 + 50 * M.io((t - tH1) / (tH1e - tH1));
const beta = t => 100 + 2 * (temp(t) - 25);
const icOf = t => isV(t) ? 1.1033 / (1 + 1.803 / (beta(t) + 1)) : beta(t) * 9.3 / 820;
const vceOf = t => Math.max(0.2, 10 - icOf(t) * (isV(t) ? 4.6 : 3.6));
const vin = t => t < tIn ? 0 : Math.sin(Math.PI * (t - tIn));
const vout = t => Math.max(0.2, Math.min(9.8, vceOf(t) - 2.5 * vin(t)));
const offC = t => { let s = 0; const dt = 0.05; for (let x = tFix; x < t; x += dt) s += 60 * icOf(x) * Math.min(dt, t - x); return s; };
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 IN · 20 mV/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 OUT · 5 V/div', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k n">TEMP</span><span class="v" id="rT">25</span><span class="u">°C</span>
  <span class="k">β</span><span class="v" id="rB">100</span><span class="u"></span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="rIc" style="color:${VI}">1.13</span><span class="u">mA</span>
  <span class="k" style="color:${TE}">V<sub>CE</sub></span><span class="v" id="rVce" style="color:${TE}">5.9</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Same heat. Still a clean wave!' });

/* ================= M: correcting loop + runaway ================= */
const mS = $('#mS'); mS.setAttribute('viewBox', '-40 0 784 600');
const mEl = [W(mS, 'M200,110 H560'), W(mS, 'M200,490 H560'), zigV(mS, 240, 110, 300), zigV(mS, 240, 300, 490), W(mS, 'M240,300 H359'), zigV(mS, 401, 110, 230), W(mS, 'M401,230 V255'), zigV(mS, 401, 345, 490)];
const mT = mk(mS, 'g'); npn(mT, 380, 300, 50, 0.9);
const mNode = mk(mS, 'circle', { cx: 240, cy: 300, r: 7, fill: INK });
const mVcc = tx(mS, 570, 118, 'V CC', { fill: TE, 'font-family': 'IBM Plex Mono' });
const mLk = [sub(tx(mS, 36, 262, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 28 }), 'B'), mono(mS, 36, 296, '', { fill: TE, 'font-weight': 600, 'font-size': 26 }), mono(mS, 36, 326, 'held by divider', { 'font-size': 18 })];
const mVe = [sub(tx(mS, 440, 418, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 28 }), 'E'), mono(mS, 440, 452, '', { fill: TE, 'font-weight': 600, 'font-size': 26 })];
const mVbe = [sub(tx(mS, 460, 286, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 28 }), 'BE'), mono(mS, 460, 320, '', { fill: TE, 'font-weight': 600, 'font-size': 26 })];
const mIc = [sub(tx(mS, 450, 164, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), 'C'), mono(mS, 450, 198, '', { fill: VI, 'font-weight': 600, 'font-size': 26 })];
const mA = PUC.arrow(mS, VI, 6, 16);
const mLbl = [sub(tx(mS, 266, 210, 'R', { 'font-style': 'italic' }), '1'), sub(tx(mS, 266, 410, 'R', { 'font-style': 'italic' }), '2'), sub(tx(mS, 330, 180, 'R', { 'font-style': 'italic' }), 'C'), sub(tx(mS, 330, 430, 'R', { 'font-style': 'italic' }), 'E')];
const lS = $('#lS');
const lA = [PUC.arrow(lS, INK, 4, 14), PUC.arrow(lS, INK, 4, 14), PUC.arrow(lS, INK, 4, 14), PUC.arrow(lS, INK, 4, 14)];
const lpEl = [0, 1, 2, 3].map(i => $('#lp' + i));
const lpTx = [K(`${IC}\\ \\text{goes up}`), K(`${VE_}\\ \\text{goes up}`), K(`${VBE_}\\ \\text{shrinks}`), K(`${IB},\\ ${IC}\\ \\text{fall back}`)];
lpEl.forEach((e, i) => e.querySelector('.tn').innerHTML = lpTx[i]);
$('#mZ').innerHTML = M.icon('check', 30, AM, 3); $('#rZ').innerHTML = M.icon('zap', 30, '#fff', 2.4);
// runaway graph
const rS = $('#rS');
const rg = PUC.graph(rS, { x: 110, y: 90, w: 600, h: 400, xmax: 10, ymax: 10, xt: [], yt: [], xl: 'time →', yl: 'I C' });
rg.ylab.setAttribute('fill', VI);
const rOk = rg.curve(VI, 5), rBad = rg.curve(RED, 5);
const rOkT = mono(rS, 620, rg.Y(2.2) - 14, 'with R E: steady', { fill: VI, 'font-weight': 600, 'text-anchor': 'end' });
const rBadT = mono(rS, 470, rg.Y(8.6), 'no feedback', { fill: RED, 'font-weight': 600, 'text-anchor': 'end' });
const burn = mk(rS, 'g'); mk(burn, 'circle', { cx: rg.X(8.2), cy: rg.Y(9.6), r: 22, fill: RED }); W(burn, `M${rg.X(8.2) - 9},${rg.Y(9.6) - 9} l18,18 m0,-18 l-18,18`, { stroke: '#fff', 'stroke-width': 4 });
const burnT = mono(rS, rg.X(8.2) + 32, rg.Y(9.6) + 7, 'burns', { fill: RED, 'font-weight': 600 });
const runF = u => 2.2 * Math.exp(0.18 * u);
$('#lkB').innerHTML = [['25 °C', 1], ['35 °C', 2], ['45 °C', 4], ['55 °C', 8]].map(([k, m], i) => `<div class="lb2" style="left:36px;top:${140 + i * 84}px"><div class="k">${k}</div><div class="bx" style="width:${60 * m}px"></div><div class="x">×${m}</div></div>`).join('');
const lkRows = [...$('#lkB').children];

/* ================= D: derivation ================= */
const dS = $('#dS'); dS.setAttribute('viewBox', '-70 0 784 600');
const dEl = [W(dS, 'M200,110 H560'), W(dS, 'M200,490 H560'), zigV(dS, 240, 110, 300), zigV(dS, 240, 300, 490), W(dS, 'M240,300 H359'), zigV(dS, 401, 110, 230), W(dS, 'M401,230 V255'), zigV(dS, 401, 345, 490)];
const dT = mk(dS, 'g'); npn(dT, 380, 300, 50, 0.9); const dNode = mk(dS, 'circle', { cx: 240, cy: 300, r: 7, fill: INK });
const dLb = [tx(dS, 570, 118, 'V CC', { fill: TE, 'font-family': 'IBM Plex Mono' }), sub(tx(dS, 266, 210, 'R', { 'font-style': 'italic' }), '1'), sub(tx(dS, 266, 410, 'R', { 'font-style': 'italic' }), '2'), sub(tx(dS, 330, 180, 'R', { 'font-style': 'italic' }), 'C'), sub(tx(dS, 330, 430, 'R', { 'font-style': 'italic' }), 'E')];
const dVB = sub(tx(dS, 120, 306, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 30 }), 'B'), dVBa = W(dS, 'M160,300 H226', { stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const dVE = sub(tx(dS, 440, 380, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 30 }), 'E'), dVEd = mk(dS, 'circle', { cx: 401, cy: 362, r: 7, fill: TE });
const dIA = PUC.arrow(dS, VI, 6, 16), dIL = sub(tx(dS, 446, 470, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), 'E');
const dVce = [W(dS, 'M640,252 V350', { stroke: TE, 'stroke-width': 3 }), W(dS, 'M630,252 H650 M630,350 H650', { stroke: TE, 'stroke-width': 3 }), sub(tx(dS, 662, 310, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 28 }), 'CE')];
const dRows = rows($('#dSteps'), [
  [K(`${VB_} = ${VCC}\\,\\dfrac{R_2}{R_1 + R_2}`), 'the divider', 92],
  [K(`${VE_} = ${VB_} - ${VBE_}`), 'V<sub>BE</sub> ≈ 0.7 V', 200],
  [K(`${IE} = \\dfrac{${VE_}}{R_E}`), 'no β here!', 282],
  [K(`${IC} \\approx ${IE}`), 'nearly equal', 376],
  [K(`${VCE_} = ${VCC} - ${IC}\\,(R_C + R_E)`), '', 470]]);
const tDR = [wt('D3', 'equals'), wt('D4', 'equals'), wt('D5', 'equals'), wt('D7', 'collector'), wt('D8', 'equals')];
const dRows2 = rows($('#dSteps2'), [
  [K(`S = \\dfrac{\\Delta ${IC}}{\\Delta I_{CO}}`), 'change in leakage', 92],
  [K('S_{\\text{fixed}} = \\beta + 1'), 'fixed bias', 212],
  [K('S_{\\text{divider}} \\to 1'), 'smaller = more stable', 316]]);
const tDR2 = [wt('D10', 'S'), wt('D11', 'Fixed'), wt('D12', 'Voltage')];
$('#sBars').innerHTML = `<div class="sm" style="left:36px;top:96px">FIXED BIAS · β = 100</div>
  <div class="bar2" id="sb1" style="left:36px;top:136px;width:600px"><i style="background:${RED}"></i></div><div class="big" id="sv1" style="left:652px;top:124px;font-size:32px;color:${RED}">101</div>
  <div class="sm" style="left:36px;top:226px">VOLTAGE DIVIDER · R<sub>TH</sub> = 1.8 kΩ, R<sub>E</sub> = 1 kΩ</div>
  <div class="bar2" id="sb2" style="left:36px;top:266px;width:600px"><i style="background:${OK}"></i></div><div class="big" id="sv2" style="left:80px;top:254px;font-size:32px;color:${OK}">≈ 2.8</div>
  <div class="sm" style="left:36px;top:356px">IDEAL</div><div class="bar2" id="sb3" style="left:36px;top:396px;width:600px"><i style="background:${INK}"></i></div><div class="big" id="sv3" style="left:64px;top:384px;font-size:32px;color:${INK}">1</div>
  <div class="pillp good" id="sP" style="left:36px;top:470px">Divider bias: about 36 times more stable</div>`;

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VCC} = 10\\,\\text{V}`), K(`R_1 = 10\\,${KO}`), K(`R_2 = 2.2\\,${KO}`), K(`R_C = 3.6\\,${KO}`), K(`R_E = 1\\,${KO}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS');
const wg = PUC.graph(wS, { x: 110, y: 236, w: 600, h: 260, xmax: 10, ymax: 2.5, xt: [2, 4, 6, 8], yt: [1, 2], xl: 'V CE (V)', yl: 'I C (mA)' });
wg.xlab.setAttribute('fill', TE); wg.ylab.setAttribute('fill', VI); wg.ylab.setAttribute('x', 124);
const wLine = wg.curve(INK, 4), wQ = wg.dot(AM, 12);
const wGd = [wg.mk('line', { x1: wg.X(0), y1: wg.Y(1.103), x2: wg.X(4.925), y2: wg.Y(1.103), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), wg.mk('line', { x1: wg.X(4.925), y1: wg.Y(0), x2: wg.X(4.925), y2: wg.Y(1.103), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
const wQT = mono(wS, wg.X(4.925) + 20, wg.Y(1.103) - 18, 'Q  (4.9 V, 1.1 mA)', { fill: INK, 'font-weight': 600 });
const wLT = mono(wS, wg.X(7.2), wg.Y(0.85), 'DC load line', { fill: MU, 'font-weight': 600 });
const wRows = rows($('#wSteps'), [
  [K(`${VB_} = 10 \\times \\dfrac{2.2}{12.2}`), 'divider', 92],
  [K(`${VB_} = 1.8\\,\\text{V}`), '', 196],
  [K(`${VE_} = 1.8 - 0.7 = 1.1\\,\\text{V}`), '', 280],
  [K(`${IE} = \\dfrac{1.1\\,\\text{V}}{1\\,${KO}} = 1.1\\,\\text{mA}`), '', 372],
  [K(`${VCE_} = 10 - 1.1 \\times 4.6 \\approx 4.9\\,\\text{V}`), '', 490]]);
const tWR = [wt('W5', 'equals'), wt('W6', 'That'), wt('W7', 'Take'), wt('W8', 'One'), wt('W9', 'V')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${IE} = ${VB_} / R_E = 1.8\\,\\text{mA}`)}`, right: `${K(`${IE} = (${VB_} - 0.7) / R_E = 1.1\\,\\text{mA}`)}`, y0: 96, y1: 184 });
const tcS = $('#tcS'), yV = v => 262 - 92 * v;
const tcL = W(tcS, `M260,${yV(0)} V${yV(1.9)}`, { 'stroke-width': 3 });
const tcM = [[0, '0 V'], [1.103, 'V E = 1.1 V'], [1.8, 'V B = 1.8 V']].map(([v, s]) => [W(tcS, `M248,${yV(v)} H272`, { 'stroke-width': 3 }), mono(tcS, 236, yV(v) + 7, s, { 'text-anchor': 'end', fill: v ? TE : MU, 'font-weight': 600 })]);
const tcB1 = mk(tcS, 'rect', { x: 290, y: yV(1.8), width: 30, height: yV(1.103) - yV(1.8), rx: 6, fill: C.soft });
const tcB2 = mk(tcS, 'rect', { x: 290, y: yV(1.103), width: 30, height: yV(0) - yV(1.103), rx: 6, fill: AM });
const tcT1 = mono(tcS, 336, (yV(1.8) + yV(1.103)) / 2 + 7, 'V BE ≈ 0.7 V drop', { fill: MU, 'font-weight': 600 });
const tcT2 = mono(tcS, 336, (yV(1.103) + yV(0)) / 2 + 7, 'only this sits across R E', { fill: '#B7791F', 'font-weight': 600 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Advantages of voltage divider bias, find the operating point, derive the stability factor S' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'Voltage divider bias, silicon transistor: V<sub>CC</sub>&nbsp;=&nbsp;12&nbsp;V, R<sub>1</sub>&nbsp;=&nbsp;40&nbsp;kΩ, R<sub>2</sub>&nbsp;=&nbsp;10&nbsp;kΩ, R<sub>C</sub>&nbsp;=&nbsp;4&nbsp;kΩ, R<sub>E</sub>&nbsp;=&nbsp;1&nbsp;kΩ. Find V<sub>CE</sub>.', qW: 780,
  opts: ['5.2 V', '3.5 V', '0 V', '6.8 V'], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${VB_} = 12 \\times \\dfrac{10}{50} = 2.4\\,\\text{V}`)], [K(`${VE_} = 2.4 - 0.7 = 1.7\\,\\text{V}`)], [K(`${IC} \\approx ${IE} = 1.7\\,\\text{mA}`)], [K(`${VCE_} = 12 - 1.7 \\times 5 = 3.5\\,\\text{V}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'V'), wt('A3', 'Take'), wt('A4', 'So'), wt('A5', 'V')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'Voltage divider bias · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K(`${VB_} = ${VCC}\\,R_2 / (R_1 + R_2) \\qquad ${VE_} = ${VB_} - 0.7\\,\\text{V}`), K(`${IC} \\approx ${IE} = ${VE_} / R_E`), K(`${VCE_} = ${VCC} - ${IC}\\,(R_C + R_E)`), K('S = \\Delta I_C / \\Delta I_{CO}: \\ \\text{fixed } \\beta + 1,\\ \\text{divider} \\approx 1'),
    'R<sub>E</sub> gives negative feedback · it stops thermal runaway'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 67', topic: 'CE amplifier and frequency response', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B9', 'Look'), 1.1, 1100, 500], [T1('B9'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tFix - 0.2, tM - 0.4], [wt('M2', 'Heat'), tM + (T0('M9') - tM) - 0.4], [T0('D11') - 0.2, tW - 0.4], [tW + 0.2, tX - 0.32]];

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
    const t1 = wt('H1', 'Aarav') - 0.3, t2 = wt('H2', 'hot') - 0.3, ph = -5 * (t - t1);
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); M.vis($('#h1T'), t, wt('H1', 'clearly') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(sun, t, t1 + 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.draw(sunR, t, t1 + 0.4, 0.5); M.draw(spk1, t, t1 + 0.3, 0.5);
    M.vis(wv1, t, t1 + 0.6, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wv1, 'd', wav(250, 740, 150, 52 * M.o3((t - t1 - 0.6) / 0.6), ph));
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2T'), t, wt('H2', 'harsh') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(thO, t, t2 + 0.2, 0.5); M.vis(thB, t, t2 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const hu = M.io((t - t2 - 0.4) / 1.6); PUC.attr(thF, 'y', (170 - 70 * hu).toFixed(1)); PUC.attr(thF, 'height', (20 + 70 * hu).toFixed(1)); M.vis(thF, t, t2 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.draw(spk2, t, t2 + 0.3, 0.5);
    const cl = M.io((t - wt('H2', 'harsh')) / 0.5);
    M.vis(wv2, t, t2 + 0.6, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wv2, 'd', wav(250, 740, 150, 52 * M.o3((t - t2 - 0.6) / 0.6), ph, 22, -52 + 20 * cl));
    M.vis(clipL, t, wt('H2', 'broken'), 1e9, { dy: 0, fade: 0.2 }); M.vis(clipT, t, wt('H2', 'broken') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(clipL, 'y1', 150 + 32); PUC.attr(clipL, 'y2', 150 + 32);
    M.vis($('#aPill'), t, wt('H3', 'Only') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: tap idea + float */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P7', 'float') - 0.4, out, { dx: 60, dy: 0, ...o });
    drawSeq([flr, ceil], t, tP + 0.3, 0.5, 0.15); fadeAt([ceilT, flrT], t, tP + 0.6, 0.15);
    M.draw(tapB, t, tP + 0.3, 0.5); M.vis(tapV, t, tP + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(tapW, t, tP + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const tw = wt('P2', 'Half'), tc = wt('P4', 'heat'), tcut = wt('P6', 'tops');
    const lvl = 285 - 130 * M.io((t - tc) / 3.6), amp = 110 * M.o3((t - tw) / 0.6);
    const ph = -4 * (t - tw);
    tapH.style.transform = `rotate(${(45 + 45 * M.io((t - tc) / 3.6)).toFixed(1)}deg)`;
    M.vis(pW, t, tw, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(pW, 'd', wav(340, 740, lvl, amp, ph, 24, -1e9, lvl - ceilY));
    // red highlight on the cut tops
    const cutOn = t >= tcut - 0.2; M.hide(pWc, !cutOn);
    if (cutOn) { let d = ''; for (let x = 340; x <= 740; x += 4) { const v = amp * Math.sin((x - 340) / 24 + ph); if (v >= lvl - ceilY) d += (d && (x - 4 >= 340 && amp * Math.sin((x - 344) / 24 + ph) >= lvl - ceilY) ? 'L' : 'M') + x + ',' + ceilY; } PUC.attr(pWc, 'd', d); }
    PUC.attr(restL, 'y1', lvl.toFixed(1)); PUC.attr(restL, 'y2', lvl.toFixed(1)); PUC.attr(restT, 'y', (lvl - 12).toFixed(1));
    M.vis(restL, t, wt('P3', 'resting') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(restT, t, wt('P3', 'resting'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pQ'), t, wt('P3', 'bias') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(heatC, t, tc - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#pCut'), t, tcut - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    // tank float
    const tf0 = wt('P7', 'float') - 0.2, trise = wt('P8', 'rises'), tclose = wt('P8', 'closes');
    M.draw(tank, t, tf0, 0.5); drawSeq([inlet2, inlet], t, tf0 + 0.2, 0.4, 0.1); M.vis(valveG, t, tf0 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const lev = 0.18 + 0.6 * M.io((t - trise + 0.3) / (tclose - trise + 0.3));
    const wTop = 448 - 296 * lev; PUC.attr(water, 'y', wTop.toFixed(1)); PUC.attr(water, 'height', (448 - wTop).toFixed(1)); M.vis(water, t, tf0 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const open = M.clamp((0.78 - lev) / 0.25);
    PUC.attr(stream, 'width', (14 * open).toFixed(1)); PUC.attr(stream, 'y', 148); PUC.attr(stream, 'height', Math.max(0, wTop - 148).toFixed(1)); M.vis(stream, t, tf0 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(valveG, 'y', (110 - 18 * (1 - open)).toFixed(1));
    const by = wTop - 14; PUC.attr(ball, 'cy', by.toFixed(1)); PUC.attr(arm, 'd', `M300,128 L470,${by.toFixed(1)}`);
    fadeAt([pivot, link], t, tf0 + 0.5, 0.05); M.vis(arm, t, tf0 + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(ball, t, tf0 + 0.6, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    PUC.attr(fLb[1], 'y', (by - 40).toFixed(1)); fadeAt(fLb, t, tf0 + 0.7, 0.1);
    M.vis(fClose, t, tclose, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip'), t, wt('P9', 'corrects') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tM + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32, V = isV(t), sw = M.io((t - tVdb + 0.3) / 0.5);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckL1'), t, tB + 0.2, tVdb - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, tVdb, 1e9, { dy: 10 });
    const tb = tFix - 0.3;
    drawSeq([cRail, ...bat, cLow, cRC, cCw], t, tb, 0.4, 0.1); M.vis(tr, t, tb + 0.4, 1e9, { dy: 0, fade: 0.2 });
    // fixed bias: R_B + direct emitter wire ; divider: R1, R2, R_E
    M.draw(cRB, t, wt('B2', 'resistor') - 0.2, 0.5); M.draw(cBase, t, wt('B2', 'resistor'), 0.3);
    M.vis(lRB, t, wt('B2', 'resistor'), tVdb - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(vRB, t, wt('B2', 'resistor') + 0.2, tVdb - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis(lR1, t, wt('B11', 'R'), 1e9, { dy: 0, fade: 0.2 }); M.vis(vR1, t, wt('B11', 'R') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(cEfix, t, tb + 0.6, 0.3); M.hide(cEfix, t > wt('B12', 'new'));
    M.draw(cR2, t, wt('B11', 'two') - 0.2, 0.5); fadeAt([nodeB, ...lR2], t, wt('B11', 'two'), 0.1);
    M.draw(cRE, t, wt('B12', 'new'), 0.5); fadeAt(lRE, t, wt('B12', 'R'), 0.1);
    drawSeq(cIn, t, wt('B3', 'wave') - 0.3, 0.25, 0.08); fadeAt(term, t, wt('B3', 'wave') - 0.2, 0.1); drawSeq([cOut[0]], t, wt('B3', 'wave'), 0.3); fadeAt(cOut.slice(1), t, wt('B3', 'wave') + 0.2);
    fadeAt(cLb.slice(2), t, tb + 0.5, 0.1); fadeAt(cLb.slice(0, 2), t, wt('B3', 'wave'), 0.2);
    // temperature tile
    M.vis($('#tg'), t, tFix, 1e9, { dy: 10 });
    const T = temp(t), ic = icOf(t), vce = vceOf(t);
    M.setT($('#tgV'), Math.round(T) + ' °C'); $('#thI').style.height = (8 + 32 * (T - 25) / 50).toFixed(1) + 'px';
    trP[0].setAttribute('fill', M.mix('#FFFFFF', '#F6C9C9', (T - 25) / 50));
    eC.set(offC(t), t >= tFix + 0.4); M.vis($('#ckE'), t, tFix + 0.4, 1e9, { dy: 0, fade: 0.2 });
    aIC.set(800, 142, 800 - 40 * ic, 142); M.vis(lIC, t, tFix + 0.4, 1e9, { dy: 0, fade: 0.2 });
    // readout
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rT'), String(Math.round(T))); M.setT($('#rB'), String(Math.round(beta(t)))); M.setT($('#rIc'), ic.toFixed(2)); M.setT($('#rVce'), vce.toFixed(1));
    const clip = vce - 2.5 < 0.2 && t >= tIn;
    M.vis($('#rgT'), t, tIn, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), clip ? 'CLIPPED' : 'CLEAN'); $('#rgT').style.background = clip ? RED : INK;
    // scope
    M.vis($('#slowT'), t, tIn, 1e9, { dy: 0, fade: 0.2 });
    tr1(u => 18 * vin(u), t, tIn, 4, 46, t >= tIn); tr2(u => 9.2 * (u < tIn ? vceOf(u) : vout(u)), t, tFix, 4, 178, t >= tFix);
    fadeAt(scL, t, tIn, 0.1);
    avB(t, wt('B15', 'stays'), tM - 0.2);
  }

  /* M: correcting loop, then runaway */
  const mOn = t >= tM - 0.05 && t < tT + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tT - 0.3, tR = T0('M9'), runOn = t >= tR - 0.3;
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#mL1'), t, tM + 0.2, tR - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#mL2'), t, tR, 1e9, { dy: 10 });
    M.vis($('#mR1'), t, tM + 0.3, tR - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#mR2'), t, tR, 1e9, { dy: 10 });
    M.vis(mS, t, tM + 0.2, tR - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(rS, t, tR, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(mEl, t, tM + 0.3, 0.3, 0.06); M.vis(mT, t, tM + 0.6, 1e9, { dy: 0, fade: 0.2 }); fadeAt([mNode, mVcc, ...mLbl], t, tM + 0.8, 0.05);
    const k2 = wt('M2', 'up'), k3 = wt('M3', 'raises'), k4 = wt('M4', 'held'), k5 = wt('M5', 'shrinks'), k6 = wt('M6', 'falls');
    const rise = M.io((t - k2) / 0.6) * (1 - M.io((t - k6) / 0.8));
    const icv = 1.10 + 0.08 * rise, vev = t < k3 ? 1.10 : icv, vbe = 1.80 - vev;
    M.setT(mLk[1], '1.80 V'); M.setT(mVe[1], vev.toFixed(2) + ' V'); M.setT(mVbe[1], vbe.toFixed(2) + ' V'); M.setT(mIc[1], icv.toFixed(2) + ' mA');
    fadeAt(mIc, t, tM + 0.9, 0.1); fadeAt(mVe, t, k3 - 0.2, 0.1); fadeAt(mLk, t, k4 - 0.2, 0.1); fadeAt(mVbe, t, k5 - 0.3, 0.1);
    mA.set(430, 140, 430, 140 + 60 * (0.7 + 0.6 * rise)); M.hide(mA.g, t < tM + 0.9 || runOn);
    const kk = [k2 - 0.2, k3 - 0.2, k5 - 0.4, k6 - 0.2];
    lpEl.forEach((e, i) => { M.vis(e, t, kk[i], tR - 0.3, { dy: 16, outDur: 0.25 }); const act = t >= kk[i] && (i === 3 || t < kk[i + 1]); e.style.borderColor = act ? AM : C.soft; e.style.background = act ? C.ac2 : C.soft; });
    const arr = [[344, 140, 440, 140], [598, 204, 598, 292], [440, 356, 344, 356], [186, 292, 186, 204]];
    lA.forEach((a, i) => { const ta = i < 3 ? kk[i + 1] - 0.3 : wt('M7', 'float'); const u = M.io((t - ta) / 0.4); const [x1, y1, x2, y2] = arr[i]; a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); if (t >= tR - 0.3) M.hide(a.g, true); });
    M.vis($('#mStrip'), t, wt('M7', 'float') - 0.2, tR - 0.3, { dy: 24, outDur: 0.25 });
    M.vis($('#mTag'), t, wt('M8', 'negative') - 0.1, tR - 0.3, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.25 });
    // runaway
    if (runOn) {
      const g1 = M.clamp((t - tR) / 3), g2 = M.clamp((t - wt('M10', 'More')) / (wt('M12', 'burns') - wt('M10', 'More')));
      rOk(u => [u, 2.2], 0, 10 * g1, 40); rBad(u => [u, Math.min(9.6, runF(u))], 0, 8.2 * g2, 80);
      M.vis(rOkT, t, tR + 1, 1e9, { dy: 0, fade: 0.2 }); M.vis(rBadT, t, T0('M12') - 0.2, 1e9, { dy: 0, fade: 0.2 });
      M.vis(burn, t, wt('M12', 'burns'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis(burnT, t, wt('M12', 'burns') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    }
    M.vis($('#lkH'), t, tR + 0.2, 1e9, { dy: 10 });
    lkRows.forEach((r, i) => { const ti = i ? wt('M11', 'doubles') - 0.3 + (i - 1) * 0.5 : tR + 0.4; M.vis(r, t, ti, 1e9, { dx: -20, dy: 0 }); const b = r.querySelector('.bx'); b.style.transformOrigin = '0 50%'; b.style.transform = `scaleX(${M.io((t - ti - 0.1) / 0.4).toFixed(3)})`; });
    M.vis($('#rStrip'), t, wt('M10', 'More') - 0.2, 1e9, { dy: 24 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'emitter') - 0.15, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32, tSb = T0('D11') - 0.2, tSr = T0('D9');
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dL1'), t, tD + 0.2, tSb - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dL2'), t, tSb, 1e9, { dy: 10 });
    M.vis(dS, t, tD, tSb - 0.3, { dy: 0, fade: 0.1, outDur: 0.25, ody: 0 });
    drawSeq(dEl, t, tD + 0.3, 0.3, 0.06); M.vis(dT, t, tD + 0.6, 1e9, { dy: 0, fade: 0.2 }); fadeAt([dNode, ...dLb], t, tD + 0.8, 0.06);
    fadeAt([dVB], t, tDR[0] - 0.3); M.draw(dVBa, t, tDR[0] - 0.2, 0.3);
    fadeAt([dVEd, dVE], t, tDR[1] - 0.2, 0.1);
    const ua = M.io((t - tDR[2]) / 0.5); dIA.set(430, 400, 430, 400 + 64 * ua); M.vis(dIL, t, tDR[2] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(dVce.slice(0, 2), t, tDR[4] - 0.2, 0.3, 0.1); M.vis(dVce[2], t, tDR[4], 1e9, { dy: 0, fade: 0.2 });
    runRows(dRows, t, tDR, tSr - 0.1);
    M.vis($('#dBox'), t, tDR[4] + 0.5, tSr - 0.1, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    runRows(dRows2, t, tDR2);
    // S bars
    M.vis($('#sBars'), t, tSb, 1e9, { dy: 0, fade: 0.2 });
    const b1 = M.io((t - wt('D11', 'beta')) / 0.6), b2 = M.io((t - wt('D12', 'close')) / 0.5), b3 = M.io((t - wt('D13', 'One')) / 0.4);
    $('#sb1 i').style.width = (600 * b1).toFixed(1) + 'px'; $('#sb2 i').style.width = (600 * 2.75 / 101 * b2 + (b2 > 0 ? 8 : 0)).toFixed(1) + 'px'; $('#sb3 i').style.width = (600 / 101 * b3 + (b3 > 0 ? 6 : 0)).toFixed(1) + 'px';
    M.vis($('#sv1'), t, wt('D11', 'beta') + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#sv2'), t, wt('D12', 'close') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#sv3'), t, wt('D13', 'One') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#sP'), t, wt('D13', 'best'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'V'), wt('W2', 'R'), wt('W3', 'R'), wt('W4', 'R'), wt('W4', 'E')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    runRows(wRows, t, tWR);
    M.vis(wS, t, tW + 0.6, 1e9, { dy: 0, fade: 0.2 });
    wLine(u => [u, 2.174 * (1 - u / 10)], 0, 10 * M.io((t - tWR[4] + 0.6) / 1.0), 30); M.vis(wLT, t, tWR[4] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const tq = wt('W10', 'operating'); wQ(4.925, 1.103, t >= tq - 0.2); fadeAt(wGd, t, tq - 0.2, 0.1); M.vis(wQT, t, tq, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wBox'), t, tWR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X4', 'Only') - 0.2 });
    M.draw(tcL, t, tX + 0.5, 0.4); tcM.forEach((m, i) => fadeAt(m, t, tX + 0.6 + i * 0.12));
    M.vis(tcB1, t, wt('X3', 'First'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tcT1, t, wt('X3', 'First') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(tcB2, t, wt('X4', 'Only'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tcT2, t, wt('X4', 'Only') + 0.2, 1e9, { dy: 0, fade: 0.2 });
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
