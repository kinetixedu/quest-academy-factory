// PUC Electronics Ep 50 - Transistor as a switch and an amplifier ("Breadboard" style, Lab Notebook world)
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'whispers') - 0.2;
const tP = T0('P1'), tS = T0('S1'), tM = T0('M1'), tG = T0('G1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S'), tpS = $('#tpS');
const mic = [W(h1S, 'M58,100 a18,18 0 0 1 36,0 v40 a18,18 0 0 1 -36,0 Z', { fill: '#fff' }), W(h1S, 'M48,140 a28,28 0 0 0 56,0 M76,168 V196 M58,196 H94', { 'stroke-width': 3 })];
const spk = [W(h1S, 'M392,128 H414 L446,100 V200 L414,172 H392 Z', { fill: '#fff' })];
const mini = mk(h1S, 'g'); npn(mini, 330, 150, 26, 0.6);
const wIn = mk(h1S, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), wOut = mk(h1S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wav = (x0, x1, y, a, ph) => { let d = ''; for (let x = x0; x <= x1; x += 4) d += (x === x0 ? 'M' : 'L') + x + ',' + (y - a * Math.sin((x - x0) / 22 + ph)).toFixed(1); return d; };
const sMic = mono(h1S, 76, 236, 'whisper', { 'text-anchor': 'middle' }), sSpk = mono(h1S, 600, 252, 'boom', { 'text-anchor': 'middle', fill: AM, 'font-weight': 600 });
// dusk card: sun sets, lamp switches on
const sky = mk(h2S, 'rect', { x: 24, y: 72, width: 270, height: 170, rx: 12, fill: '#DCE6F2' });
const sun = mk(h2S, 'circle', { cx: 92, cy: 120, r: 22, fill: '#F2C14E' });
const gnd = mk(h2S, 'rect', { x: 24, y: 206, width: 270, height: 36, fill: '#C9CED8' });
const cone = mk(h2S, 'path', { d: 'M232,118 L270,118 L300,206 L202,206 Z', fill: AM, opacity: 0 });
const pole = W(h2S, 'M200,206 V96 H244', { 'stroke-width': 6 });
const lhead = mk(h2S, 'path', { d: 'M226,96 H266 L258,118 H234 Z', fill: '#fff', stroke: INK, 'stroke-width': 3 });
const tpP = npn(tpS, 150, 190, 92, 1.4);
const tpL = [mono(tpS, 20, 196, 'B', { 'font-size': 26, fill: INK, 'font-weight': 600 }), mono(tpS, 206, 70, 'C', { 'font-size': 26, fill: INK, 'font-weight': 600 }), mono(tpS, 206, 330, 'E', { 'font-size': 26, fill: INK, 'font-weight': 600 })];
const tpW = [W(tpS, 'M30,190 H111'), W(tpS, 'M189,107 V40'), W(tpS, 'M189,273 V346')];

/* ================= P: tap idea ================= */
const pS = $('#pS');
const pipe = [W(pS, 'M40,150 H600 Q640,150 640,190 V250', { 'stroke-width': 4 }), W(pS, 'M40,200 H560 Q590,200 590,230 V250', { 'stroke-width': 4 })];
const water = mk(pS, 'rect', { x: 40, y: 152, width: 0, height: 46, fill: CH1, opacity: 0.55 });
const stream = mk(pS, 'rect', { x: 592, y: 250, width: 46, height: 0, fill: CH1 });
const valve = mk(pS, 'rect', { x: 290, y: 136, width: 60, height: 78, rx: 8, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const gate = mk(pS, 'rect', { x: 306, y: 152, width: 28, height: 46, fill: INK });
const hO = mk(pS, 'g', { transform: 'translate(320,136)' }), hW = mk(hO, 'g'), hG = mk(hW, 'g'); W(hG, 'M0,0 V-46', { 'stroke-width': 5 }); W(hG, 'M-46,-46 H46', { 'stroke-width': 9 });
const bucket = W(pS, 'M560,330 L572,400 H658 L670,330', { 'stroke-width': 4 });
const pLb = [mono(pS, 320, 252, 'small handle', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(pS, 470, 120, 'big flow', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 })];
const tS_ = $('#tS'), tBig = npn(tS_, 392, 250, 110, 1.6);
const tLeads = [W(tS_, 'M120,250 H346'), W(tS_, 'M438,151 V84'), W(tS_, 'M438,349 V452')];
const tLab = [
  [tx(tS_, 120, 226, 'BASE', { 'font-size': 26 }), mono(tS_, 120, 292, 'the handle', { 'font-size': 20 })],
  [tx(tS_, 470, 110, 'COLLECTOR', { 'font-size': 26 }), mono(tS_, 470, 140, 'big current in', { 'font-size': 20 })],
  [tx(tS_, 470, 420, 'EMITTER', { 'font-size': 26 }), mono(tS_, 470, 450, 'both leave here', { 'font-size': 20 })]];
const aB = PUC.arrow(tS_, VI, 4, 12), aC = PUC.arrow(tS_, VI, 9, 22), aE = PUC.arrow(tS_, VI, 10, 24);
const aLb = [tx(tS_, 200, 336, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), tx(tS_, 396, 118, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30, 'text-anchor': 'end' }), tx(tS_, 396, 432, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30, 'text-anchor': 'end' })];
[['B', 0], ['C', 1], ['E', 2]].forEach(([s, i]) => { const e = mk(aLb[i], 'tspan', { 'font-size': i ? 20 : 18, dy: 6, 'font-style': 'normal' }); e.textContent = s; });
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cW = [W(ck, 'M560,170 V130 H840 V280'), W(ck, 'M840,300 V470 H140'), W(ck, 'M560,230 V296'), W(ck, 'M560,384 V470')];
const bat = [W(ck, 'M812,280 H868', { 'stroke-width': 5 }), W(ck, 'M826,300 H854', { 'stroke-width': 9 })];
const lampC = mk(ck, 'circle', { cx: 560, cy: 200, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), lampX = W(ck, 'M539,179 L581,221 M581,179 L539,221', { 'stroke-width': 3 });
const tr = mk(ck, 'g'); npn(tr, 520, 340, 50, 0.9);
const rb = W(ck, 'M140,340 H270 L280,326 L296,354 L312,326 L328,354 L344,326 L360,354 L376,326 L386,340 H499');
const term = [mk(ck, 'circle', { cx: 140, cy: 340, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 140, cy: 470, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const vo = [W(ck, 'M560,262 H672'), mk(ck, 'circle', { cx: 560, cy: 262, r: 7, fill: INK }), mk(ck, 'circle', { cx: 680, cy: 262, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const cLb = [tx(ck, 140, 392, 'V in', { 'text-anchor': 'middle', fill: TE }), tx(ck, 680, 302, 'V out', { 'text-anchor': 'middle', fill: TE }),
  tx(ck, 322, 312, 'R', { 'text-anchor': 'middle', 'font-style': 'italic' }), tx(ck, 606, 190, 'lamp', {}), tx(ck, 800, 296, '5 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }),
  tx(ck, 876, 272, '+', { 'font-size': 26 }), mono(ck, 596, 352, 'npn', { 'font-weight': 600, fill: INK })];
[[cLb[2], 'B']].forEach(([e, s]) => { const q = mk(e, 'tspan', { 'font-size': 16, dy: 6, 'font-style': 'normal' }); q.textContent = s; });
const vRB = mono(ck, 328, 386, '10 kΩ', { 'text-anchor': 'middle', 'font-weight': 600, fill: INK }), vRC = mono(ck, 606, 218, '1 kΩ', { 'font-weight': 600, fill: INK });
const aIB = PUC.arrow(ck, VI, 4, 12), aIC = PUC.arrow(ck, VI, 8, 20);
const lIB = tx(ck, 430, 312, 'I', { fill: VI, 'font-style': 'italic' }), lIC = tx(ck, 604, 290, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 26 });
[[lIB, 'B'], [lIC, 'C']].forEach(([e, s]) => { const q = mk(e, 'tspan', { 'font-size': 16, dy: 6, 'font-style': 'normal' }); q.textContent = s; });
const eC = flow(ck, [[840, 300], [840, 470], [560, 470], [560, 294], [560, 130], [840, 130], [840, 280]], 26, {
  skip: (x, y) => Math.hypot(x - 520, y - 340) < 54 || Math.hypot(x - 560, y - 200) < 34 || (Math.abs(x - 840) < 2 && y > 270 && y < 310) });
const eBs = flow(ck, [[499, 340], [140, 340]], 5, { r: 6, skip: (x) => x > 266 && x < 390 });
// input waveform logic (EXAMPLE FIGURES: V_CC 5 V, R_B 10 kOhm, lamp 1 kOhm, beta 100)
const tIn0 = wt('S4', 'Input'), tFlip = wt('S6', 'flip'), tSq = wt('S9', 'scope'), tBias = wt('M1', 'small'), tWave = wt('M3', 'tiny');
const vinSw = t => t < tFlip ? 0 : t < tSq ? 5 : (((t - tSq) % 2) < 1 ? 0 : 5);
const vinAc = t => t < tWave ? 0 : 10 * Math.sin(Math.PI * (t - tWave)); // mV, 0.5 Hz slow-motion view
const amp = t => t >= tM - 0.3;
const icNow = t => amp(t) ? (t < tBias ? 0 : 2.4 * (1 - 0.4 * vinAc(t) / 10 * (t >= tWave ? -1 : 0))) : (vinSw(t) > 0.7 ? 4.8 : 0); // mA
const offC = t => { let s = 0; const dt = 0.05; for (let x = tIn0; x < t; x += dt) s += 26 * icNow(x) * Math.min(dt, t - x); return s; };
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, '', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, '', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" id="rVi" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="rVo" style="color:${TE}">5.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="rIb" style="color:${VI}">0.00</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="rIc" style="color:${VI}">0.0</span><span class="u">mA</span>`;
$('#ro2').innerHTML = `<span class="k" style="color:${TE}">v<sub>in</sub></span><span class="v" id="rvi" style="color:${TE}">0.0</span><span class="u">mV</span>
  <span class="k" style="color:${TE}">v<sub>out</sub></span><span class="v" id="rvo" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k">A<sub>v</sub></span><span class="v" id="rAv">-100</span><span class="u"></span>
  <span class="k n">PHASE</span><span class="v" id="rPh" style="font-size:30px">180°</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'A tiny wiggle in, a big wave out!' });

/* ================= G: regions ================= */
const gS = $('#gS');
const gp = PUC.graph(gS, { x: 110, y: 90, w: 600, h: 380, xmax: 3, ymax: 5.5, xt: [1, 2, 3], yt: [1, 2, 3, 4, 5], xl: 'V in (V)', yl: 'V out (V)' });
gp.xlab.setAttribute('fill', TE); gp.ylab.setAttribute('fill', TE); gp.ylab.setAttribute('x', 124);
const reg = [[0, 0.7, '#EEF0F4', 'CUT-OFF'], [0.7, 1.18, C.ac2, 'ACTIVE'], [1.18, 3, '#E2F3E9', 'SATURATION']].map(([a, b, f, s]) => {
  const r = gp.mk('rect', { x: gp.X(a), y: 92, width: gp.X(b) - gp.X(a), height: 376, fill: f }); gS.insertBefore(r, gp.axes);
  const l = mono(gS, (gp.X(a) + gp.X(b)) / 2, 552, s, { 'text-anchor': 'middle', 'font-weight': 600, fill: INK, 'font-size': 17 }); return [r, l]; });
const v07 = gp.mk('line', { x1: gp.X(0.7), y1: gp.Y(0), x2: gp.X(0.7), y2: gp.Y(5.4), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const v07L = mono(gS, gp.X(0.7) + 8, gp.Y(5.4) + 4, '0.7 V', { fill: INK, 'font-weight': 600 });
const tf = v => v < 0.7 ? 5 : Math.max(0.2, 5 - 10 * (v - 0.7));
const gcv = gp.curve(INK, 5), gdot = gp.dot(AM, 12);
const tilesG = ['#gt0', '#gt1', '#gt2'].map(s => $(s)); $('#gZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= D: derivation ================= */
const dS = $('#dS');
const dP = npn(dS, 330, 300, 60, 1);
const dW = [W(dS, 'M90,300 H305'), W(dS, 'M355,246 V200'), W(dS, 'M355,354 V470'), W(dS, 'M355,120 V82 H600'), W(dS, 'M355,210 H540')];
const dRC = W(dS, 'M355,200 L340,192 L370,178 L340,164 L370,150 L340,136 L355,128 V120');
const dGnd = W(dS, 'M325,470 H385 M337,482 H373 M349,494 H361', { 'stroke-width': 3 });
const dLb = [tx(dS, 610, 90, 'V CC', { fill: TE, 'font-family': 'IBM Plex Mono' }), tx(dS, 316, 168, 'R', { 'text-anchor': 'end', 'font-style': 'italic' }),
  tx(dS, 556, 218, 'V out', { fill: TE }), mk(dS, 'circle', { cx: 355, cy: 210, r: 6, fill: INK }), mk(dS, 'circle', { cx: 548, cy: 210, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }),
  tx(dS, 90, 284, 'in', { fill: TE }), mk(dS, 'circle', { cx: 90, cy: 300, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
[[dLb[1], 'C']].forEach(([e, s]) => { const q = mk(e, 'tspan', { 'font-size': 16, dy: 6, 'font-style': 'normal' }); q.textContent = s; });
const dA = [PUC.arrow(dS, VI, 4, 12), PUC.arrow(dS, VI, 8, 18), PUC.arrow(dS, VI, 9, 20)];
const dAL = [tx(dS, 196, 340, 'I', { fill: VI, 'font-style': 'italic' }), tx(dS, 404, 300, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), tx(dS, 404, 420, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 26 })];
[['B', 0], ['C', 1], ['E', 2]].forEach(([s, i]) => { const q = mk(dAL[i], 'tspan', { 'font-size': 16, dy: 6, 'font-style': 'normal' }); q.textContent = s; });
const dWin = mk(dS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), dWout = mk(dS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dWL = [mono(dS, 100, 410, 'small in', { fill: '#5F7399', 'font-weight': 600 }), mono(dS, 560, 400, 'big, upside down', { fill: '#B7791F', 'font-weight': 600 })];
const dRows = rows($('#dSteps'), [
  [K(`${IE} = ${IB} + ${IC}`), 'both leave by E', 92],
  [K(`${IC} = \\beta\\,${IB}`), 'β = current gain', 186],
  [K(`${VO} = ${VCC} - ${IC}\\,R_C`), 'supply minus drop', 280],
  [K(`A_v = \\dfrac{\\Delta ${VO}}{\\Delta ${VIN}}`), 'voltage gain', 362],
  [K(`A_v = -\\,\\beta\\,\\dfrac{R_C}{R_{in}}`), 'minus: upside down', 466]]);
const tDR = [wt('D2', 'equals'), wt('D3', 'beta'), wt('D5', 'equals'), wt('D6', 'Divide'), wt('D7', 'equals')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VCC} = 5\\,\\text{V}`), 'lamp ' + K(`R_C = 1\\,${KO}`), K('\\beta = 100'), K(`${VIN} = 5\\,\\text{V}`), K(`R_B = 10\\,${KO}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wLmp = $('#wLmp'), wLc = mk(wLmp, 'circle', { cx: 60, cy: 60, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(wLmp, 'M32,32 L88,88 M88,32 L32,88', { 'stroke-width': 3 });
const wRows = rows($('#wSteps'), [
  [K(`${IB} = \\dfrac{5 - 0.7}{10\\,${KO}}`), 'base loop', 92],
  [K(`${IB} = 0.43\\,\\text{mA}`), '', 200],
  [K(`\\beta\\,${IB} = 43\\,\\text{mA}`), 'what the base asks', 290],
  [K(`${IC}_{,\\max} = \\dfrac{5\\,\\text{V}}{1\\,${KO}} = 5\\,\\text{mA}`), 'what the circuit can give', 384],
  [K(`43\\,\\text{mA} > 5\\,\\text{mA}`), 'saturated · fully ON', 484]]);
const tWR = [wt('W4', 'base'), wt('W5', 'That'), wt('W6', 'forty'), wt('W7', 'five'), wt('W8', 'saturated') - 0.4];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'The output moves in step with the input', right: 'CE output is 180° out of phase', y0: 96, y1: 184 });
const tcS = $('#tcS');
mk(tcS, 'line', { x1: 10, y1: 95, x2: 370, y2: 95, stroke: C.line, 'stroke-width': 2 });
const xIn = mk(tcS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), xOut = mk(tcS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const xLb = [mono(tcS, 14, 30, 'in', { fill: '#5F7399', 'font-weight': 600 }), mono(tcS, 14, 182, 'out', { fill: '#B7791F', 'font-weight': 600 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the CE circuit, explain switch and amplifier action, find the currents and the voltage gain' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A common emitter amplifier has β = 50, input resistance 1&nbsp;kΩ and collector resistance 5&nbsp;kΩ. A 10&nbsp;mV signal goes in. What comes out?', qW: 780,
  opts: ['0.5 V, in phase', '2.5 V, in phase', '2.5 V, 180° out of phase', '0.25 V, 180° out of phase'], right: 2, optW: 474, optY: 330, optFs: 26 });
const sol = PUC.solution($('#so'), [[K(`|A_v| = \\beta\\,\\dfrac{R_C}{R_{in}}`)], [K('|A_v| = 50 \\times \\dfrac{5}{1} = 250')], [K(`${c(TE, 'v_{out}')} = 250 \\times 10\\,\\text{mV}`)], [K(`${c(TE, 'v_{out}')} = 2.5\\,\\text{V},\\ 180^\\circ`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'voltage'), wt('A3', 'Fifty'), wt('A4', 'Two'), wt('A4', 'upside') - 0.3];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 238, w: 1000, h: 504, y0: 96, dy: 80, title: 'Transistor as a switch and an amplifier · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K(`${IE} = ${IB} + ${IC} \\qquad ${IC} = \\beta\\,${IB}`), K(`${VO} = ${VCC} - ${IC}\\,R_C`), K(`A_v = -\\,\\beta\\,R_C / R_{in}`), K('\\text{CE amplifier: output } 180^\\circ \\text{ out of phase}'),
    'Cut-off = switch OFF · Saturation = switch ON · Active = amplifier'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 51', topic: 'Number systems: binary, octal and hexadecimal', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('M5', 'Watch'), 1.1, 1000, 540], [T1('M7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[wt('S2', 'five') - 0.2, tT - 0.4], [tW + 0.2, tX - 0.32]];

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
    const t1 = wt('H1', 'microphone') - 0.4;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); M.vis($('#h1T'), t, wt('H2', 'speakers'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    drawSeq(mic, t, t1 + 0.2, 0.4, 0.15); M.vis(sMic, t, t1 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const ph = -5 * (t - t1);
    M.vis(wIn, t, t1 + 0.6, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wIn, 'd', wav(112, 290, 150, 8, ph));
    M.vis(mini, t, wt('H2', 'speakers') - 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq(spk, t, wt('H2', 'speakers') - 0.1, 0.4);
    const tb = wt('H2', 'boom'); M.vis(wOut, t, tb - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wOut, 'd', wav(468, 740, 150, 60 * M.o3((t - tb + 0.1) / 0.6), ph)); M.vis(sSpk, t, tb, 1e9, { dy: 0, fade: 0.2 });
    const t2 = wt('H3', 'Walking') - 0.2, tOnL = wt('H3', 'switches');
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2T'), t, wt('H3', 'switches'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const dusk = M.io((t - t2 - 0.2) / 1.6);
    PUC.attr(sky, 'fill', M.mix('#DCE6F2', '#5F7399', dusk)); PUC.attr(sun, 'cy', (120 + 104 * dusk).toFixed(1));
    M.draw(pole, t, t2 + 0.2, 0.4); M.vis(lhead, t, t2 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const on = M.io((t - tOnL) / 0.25); PUC.attr(lhead, 'fill', M.mix('#FFFFFF', AM, on)); PUC.attr(cone, 'opacity', (0.35 * on).toFixed(3));
    M.rise($('#h2X'), t, tOnL + 0.2);
    const t4 = wt('H4', 'tiny') - 0.2;
    drawSeq([...tpW, ...tpP.slice(0, 4)], t, t4, 0.35, 0.08); M.vis(tpP[4], t, t4 + 0.6, 1e9, { dy: 0, fade: 0.15 }); fadeAt(tpL, t, t4 + 0.5, 0.1);
    M.vis($('#aPill'), t, wt('H4', 'transistor') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    $('#aPill').textContent = t >= wt('H4', 'transistor') - 0.1 ? 'A transistor' : 'One tiny part';
  }

  /* P: tap idea + the transistor */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P5', 'transistor') - 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq(pipe, t, tP + 0.3, 0.5, 0.12); M.vis(valve, t, tP + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(hW, t, tP + 0.6, 1e9, { dy: -10 }); M.draw(bucket, t, tP + 0.7, 0.4);
    // opening of the tap, 0..1
    const a2 = wt('P2', 'small'), a3c = wt('P3', 'Close'), a3o = wt('P3', 'Open'), a4 = wt('P4', 'Wiggle');
    let op = 0.25 * M.io((t - a2) / 0.5) + 0.35 * M.io((t - wt('P2', 'big')) / 0.4);
    if (t >= a3c - 0.1) op = 0.6 * (1 - M.io((t - a3c + 0.1) / 0.4)) + 1 * M.io((t - a3o) / 0.5);
    if (t >= a4 - 0.3) op = M.lerp(1, 0.5, M.io((t - a4 + 0.3) / 0.4)) + (t >= a4 + 0.1 ? 0.12 * Math.sin(5 * (t - a4 - 0.1)) : 0);
    op = M.clamp(op);
    hG.style.transform = `rotate(${(90 * op).toFixed(2)}deg)`;
    PUC.attr(gate, 'height', (46 * (1 - op)).toFixed(1)); PUC.attr(gate, 'y', 152);
    PUC.attr(water, 'width', op > 0.01 ? 560 : 290); PUC.attr(water, 'opacity', (0.25 + 0.4 * op).toFixed(3));
    PUC.attr(stream, 'height', op > 0.01 ? 76 : 0); PUC.attr(stream, 'width', (46 * op).toFixed(1)); PUC.attr(stream, 'x', (615 - 23 * op).toFixed(1));
    M.vis($('#pH1'), t, a2 - 0.2, 1e9, { dy: 10 }); M.vis($('#pH'), t, a2 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#pF1'), t, a2, 1e9, { dy: 10 }); M.vis($('#pF'), t, a2, 1e9, { dy: 0, fade: 0.2 });
    $('#pH i').style.width = (120 * op).toFixed(1) + 'px'; $('#pF i').style.width = (480 * op).toFixed(1) + 'px';
    fadeAt(pLb, t, wt('P2', 'big'), 0.2);
    // transistor
    const tp5 = wt('P5', 'three');
    drawSeq([...tLeads, ...tBig.slice(0, 4)], t, wt('P5', 'transistor'), 0.35, 0.08); M.vis(tBig[4], t, wt('P5', 'transistor') + 0.6, 1e9, { dy: 0, fade: 0.15 });
    [wt('P6', 'base'), wt('P7', 'collector'), wt('P8', 'emitter')].forEach((tt, i) => { M.vis(tLab[i][0], t, tt - 0.15, 1e9, { dy: 0, fade: 0.15 }); M.vis(tLab[i][1], t, tt + 0.4, 1e9, { dy: 0, fade: 0.2 }); });
    const ab = M.io((t - wt('P6', 'tiny')) / 0.4), ac = M.io((t - wt('P7', 'big')) / 0.5), ae = M.io((t - wt('P8', 'both')) / 0.5);
    aB.set(170, 312, 170 + 70 * ab, 312); aC.set(410, 88, 410, 88 + 56 * ac); aE.set(410, 374, 410, 374 + 70 * ae);
    M.vis(aLb[0], t, wt('P6', 'tiny') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(aLb[1], t, wt('P7', 'big') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(aLb[2], t, wt('P8', 'both') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip'), t, wt('P9', 'small') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard (switch, then amplifier) */
  const bOn = t >= tS - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32, A = amp(t);
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tS + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckL1'), t, tS + 0.2, tM - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, tM, 1e9, { dy: 10 });
    const tb = wt('S2', 'five') - 0.2;
    drawSeq([...cW, ...bat], t, tb, 0.4, 0.1); M.vis(tr, t, wt('S2', 'n') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(lampC, t, wt('S2', 'lamp') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(lampX, t, wt('S2', 'lamp'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(rb, t, wt('S3', 'resistor') - 0.2, 0.5); fadeAt(term, t, wt('S3', 'input'), 0.1); drawSeq([vo[0]], t, wt('S3', 'input'), 0.3); fadeAt(vo.slice(1), t, wt('S3', 'input') + 0.2);
    fadeAt(cLb, t, wt('S2', 'lamp'), 0.12);
    M.vis(vRB, t, wt('S3', 'resistor'), tM - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(vRC, t, wt('S2', 'lamp') + 0.3, tM - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    // input tile / amplifier tile
    M.vis($('#tg'), t, wt('S3', 'input'), tM - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#tg2'), t, tM, 1e9, { dy: 10 });
    const vs = vinSw(t), hi = vs > 0;
    $('#tg .tr i').style.transform = `translateX(${hi ? 30 : 0}px)`; $('#tg .tr').style.background = hi ? AM : '#CBD0DA'; M.setT($('#tgV'), hi ? '5 V' : '0 V');
    // currents and lamp
    const ic = icNow(t), lit = A ? (t < tBias ? 0 : M.io((t - tBias) / 0.4) * (0.5 + 0.2 * vinAc(t) / -10)) : (hi ? 1 : 0);
    PUC.attr(lampC, 'fill', M.mix('#FFFFFF', AM, M.clamp(lit)));
    eC.set(offC(t), t >= tIn0 && ic > 0.01); M.vis($('#ckE'), t, tIn0, 1e9, { dy: 0, fade: 0.2 });
    const ibOn = A ? t >= tBias : hi; eBs.set(-30 * (t - tIn0), t >= tIn0 && ibOn);
    const sOnA = !A && hi;
    aIB.set(400, 322, sOnA || (A && t >= tBias) ? 440 : 400, 322); aIC.set(584, 232, 584, sOnA ? 282 : (A && t >= tBias ? 258 + 8 * Math.sin(Math.PI * (t - tWave)) * (t >= tWave ? 1 : 0) : 232));
    M.hide(lIB, !(sOnA || (A && t >= tBias))); M.hide(lIC, !(sOnA || (A && t >= tBias)));
    // region tag
    M.vis($('#rgT'), t, tIn0, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.setT($('#rgT'), A ? 'ACTIVE' : hi ? 'SATURATION' : 'CUT-OFF');
    // readouts
    M.vis($('#ro1'), t, tS + 0.6, tM - 0.3, { dy: 12, outDur: 0.25 }); M.vis($('#ro2'), t, tM, 1e9, { dy: 12 });
    M.setT($('#rVi'), vs.toFixed(1)); M.setT($('#rVo'), hi ? '0.2' : '5.0'); M.setT($('#rIb'), hi ? '0.43' : '0.00'); M.setT($('#rIc'), hi ? '4.8' : '0.0');
    const va = vinAc(t); M.setT($('#rvi'), (va >= 0 ? '+' : '') + va.toFixed(1)); M.setT($('#rvo'), (-va / 10 >= 0 ? '+' : '') + (-va / 10).toFixed(2));
    M.vis($('#rAv'), t, wt('M5', 'hundred'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#rPh'), t, wt('M7', 'one'), 1e9, { dy: 0, fade: 0.2 });
    // scope
    M.vis($('#slowT'), t, A ? tWave : tSq, 1e9, { dy: 0, fade: 0.2 });
    if (!A) {
      tr1(u => 46 * vinSw(u) / 5, t, tIn0, 4, 72, t >= tIn0); tr2(u => 46 * (vinSw(u) > 0 ? 0.2 : 5) / 5, t, tIn0, 4, 164, t >= tIn0);
      M.setT(scL[0], 'CH1 IN · 5 V/div'); M.setT(scL[1], 'CH2 OUT · 5 V/div');
    } else {
      tr1(u => 23 * vinAc(u) / 10, t, tM, 4, 50, t >= tBias); tr2(u => -46 * vinAc(u) / 10, t, tM, 4, 138, t >= tBias);
      M.setT(scL[0], 'CH1 IN · 20 mV/div'); M.setT(scL[1], 'CH2 OUT · 1 V/div');
    }
    fadeAt(scL, t, tIn0, 0.1);
    avB(t, wt('M5', 'hundred') + 0.5, T0('M6') - 0.2);
  }

  /* G: regions */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    const t2 = wt('G2', 'Plot');
    gcv(u => [u, tf(u)], 0, 3 * M.clamp((t - t2 - 0.2) / 2.6), 120);
    reg.forEach(([r, l], i) => { const ti = [wt('G4', 'flat'), wt('G7', 'between'), wt('G6', 'saturation')][i]; M.vis(r, t, ti - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(l, t, ti, 1e9, { dy: 0, fade: 0.2 }); });
    M.draw(v07, t, wt('G3', 'zero') - 0.1, 0.4); M.vis(v07L, t, wt('G3', 'seven'), 1e9, { dy: 0, fade: 0.2 });
    // dot follows the input being explained
    const tc3 = wt('G3', 'Below'), tc5 = wt('G5', 'high'), tc7 = wt('G7', 'steep');
    let vx = 0.35; if (t >= tc5 - 0.3) vx = M.lerp(0.35, 2.4, M.io((t - tc5 + 0.3) / 0.8)); if (t >= tc7 - 0.4) vx = M.lerp(2.4, 0.94, M.io((t - tc7 + 0.4) / 0.6)) + (t >= tc7 + 0.3 ? 0.12 * Math.sin(4 * (t - tc7 - 0.3)) : 0);
    gdot(vx, tf(vx), t >= tc3);
    const act = t < tc5 - 0.3 ? 0 : t < tc7 - 0.4 ? 1 : 2;
    tilesG.forEach((e, i) => { const ti = [wt('G4', 'cut'), wt('G6', 'saturation'), wt('G7', 'between')][i]; M.vis(e, t, ti - 0.2, 1e9, { dy: 20 });
      const on = t >= tc3 && act === i ? 1 : 0; e.style.borderColor = on ? AM : C.soft; e.style.background = on ? C.ac2 : C.soft; });
    M.vis($('#gStrip'), t, wt('G7', 'small') - 0.2, 1e9, { dy: 24 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'An') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...dW, dRC, ...dP.slice(0, 4)], t, tD + 0.3, 0.3, 0.07); M.vis(dP[4], t, tD + 0.9, 1e9, { dy: 0, fade: 0.15 }); M.draw(dGnd, t, tD + 0.9, 0.3); fadeAt(dLb, t, tD + 1.0, 0.08);
    const t2 = wt('D2', 'Both');
    const u0 = M.io((t - t2) / 0.4), u1 = M.io((t - t2 - 0.3) / 0.4), u2 = M.io((t - t2 - 0.6) / 0.4);
    dA[0].set(150, 318, 150 + 80 * u0, 318); dA[1].set(380, 236, 380, 236 + 64 * u1); dA[2].set(380, 380, 380, 380 + 70 * u2);
    fadeAt(dAL, t, t2 + 0.4, 0.3);
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    const tw = wt('D6', 'Divide'), ph = -4 * (t - tw);
    M.vis(dWin, t, tw, 1e9, { dy: 0, fade: 0.2 }); M.vis(dWout, t, tw + 0.3, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(dWin, 'd', wav(100, 250, 380, 9, ph)); PUC.attr(dWout, 'd', wav(560, 740, 320, -36, ph));
    fadeAt(dWL, t, tw + 0.4, 0.2);
    M.vis($('#dUnit'), t, wt('D8', 'Beta') - 0.1, 1e9, { dy: 12 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'supply'), wt('W2', 'lamp'), wt('W2', 'Beta'), wt('W3', 'input'), wt('W3', 'base')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    runRows(wRows, t, tWR);
    const ua = M.io((t - tWR[2]) / 0.8), ub = M.io((t - tWR[3]) / 0.5);
    M.vis($('#wA1'), t, tWR[2] - 0.2, 1e9, { dy: 10 }); M.vis($('#wA'), t, tWR[2] - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#wA i').style.width = (600 * ua).toFixed(1) + 'px'; M.vis($('#wAv'), t, tWR[2] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wB1'), t, tWR[3] - 0.2, 1e9, { dy: 10 }); M.vis($('#wB'), t, tWR[3] - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#wB i').style.width = (600 * 5 / 43 * ub).toFixed(1) + 'px'; M.vis($('#wBv'), t, tWR[3] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const tv = wt('W8', 'saturated');
    M.vis($('#wV'), t, tv - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(wLmp, t, tW + 0.5, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(wLc, 'fill', M.mix('#FFFFFF', AM, M.io((t - wt('W8', 'lamp')) / 0.3)));
    M.vis($('#wBox'), t, tWR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'does') - 0.05, tRight: wt('X3', 'output') - 0.2 });
    const ph = -4 * (t - tX), ui = M.io((t - tX - 0.6) / 0.5), uo = M.io((t - wt('X3', 'output')) / 0.5);
    PUC.attr(xIn, 'd', wav(60, 370, 50, 14 * ui, ph)); PUC.attr(xOut, 'd', wav(60, 370, 140, -36 * uo, ph)); fadeAt(xLb, t, tX + 0.6, 0.3);
    M.vis($('#tcP'), t, wt('X3', 'one') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#tcQ'), t, wt('X4', 'supply') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Draw') - 0.2 });
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
