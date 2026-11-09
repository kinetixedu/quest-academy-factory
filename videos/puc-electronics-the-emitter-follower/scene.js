// PUC Electronics Ep 73 - The emitter follower ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'connects') - 0.2;
const tP = T0('P1'), tS = T0('S1'), tD = T0('D1'), tT = T0('T1'), tZ = T0('Z1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tZ], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const KO = '\\text{k}\\Omega';
const RE = 'R_E', VIN = c(TE, 'v_{in}'), VOUT = c(TE, 'v_{out}'), VBE = c(TE, 'v_{BE}');

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S'), tpS = $('#tpS');
const micAt = (p, x) => [W(p, `M${x - 14},106 a14,14 0 0 1 28,0 v34 a14,14 0 0 1 -28,0 Z`, { fill: '#fff' }), W(p, `M${x},154 V200 M${x - 16},200 H${x + 16}`, { 'stroke-width': 3 })];
const spkAt = (p, x) => [W(p, `M${x},126 H${x + 30} V186 H${x} Z`, { fill: '#fff' }), W(p, `M${x + 30},126 L${x + 70},96 V216 L${x + 30},186`, { fill: '#fff' })];
const h1m = micAt(h1S, 80), h1s = spkAt(h1S, 640), h1w = W(h1S, 'M80,200 V240 H700 V216', { 'stroke-width': 3, stroke: C.dim });
const h1in = pth(h1S, CH1, 4), h1out = pth(h1S, AM, 4);
const h1L = [mono(h1S, 80, 268, 'weak mic', { 'text-anchor': 'middle' }), mono(h1S, 670, 268, 'heavy speaker', { 'text-anchor': 'middle' })];
const h2m = micAt(h2S, 80), h2s = spkAt(h2S, 640);
const h2b = [W(h2S, 'M330,96 L330,216 L450,156 Z', { fill: C.ac2 }), tx(h2S, 352, 166, '×1', { 'font-family': 'IBM Plex Mono', 'font-size': 26 }), W(h2S, 'M80,200 V240 H300 V156 H330', { 'stroke-width': 3, stroke: C.dim }), W(h2S, 'M450,156 H560 V240 H700 V216', { 'stroke-width': 3, stroke: C.dim })];
const h2in = pth(h2S, CH1, 4), h2out = pth(h2S, AM, 4);
const h2L = mono(h2S, 390, 262, 'one stage · gain of one', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const tq = mk(tpS, 'g'), tqp = npn(tq, 140, 180, 62, 1.1);
const tqW = [W(tpS, 'M166,124 V40'), W(tpS, 'M166,236 V300 H250'), W(tpS, 'M20,180 H114')];
const tqL = [mono(tpS, 180, 46, '+V CC', { fill: TE, 'font-weight': 600 }), mono(tpS, 250, 330, 'out', { fill: TE, 'font-weight': 600, 'text-anchor': 'end' }), mono(tpS, 20, 166, 'in', { fill: TE, 'font-weight': 600 }), mono(tpS, 196, 290, 'emitter', { fill: INK, 'font-size': 18 })];

/* ================= P: strong helper ================= */
const pS = $('#pS');
const pTr = [W(pS, 'M160,120 V340', { stroke: C.line, 'stroke-width': 3, 'stroke-dasharray': '6 6' }), W(pS, 'M540,120 V360', { stroke: C.line, 'stroke-width': 3, 'stroke-dasharray': '6 6' })];
const youG = mk(pS, 'g'), you = mk(youG, 'g'); mk(you, 'circle', { cx: 160, cy: 300, r: 20, fill: CH1, stroke: INK, 'stroke-width': 3 });
const boxG = mk(pS, 'g'), box = mk(boxG, 'g'); mk(box, 'rect', { x: 470, y: 240, width: 140, height: 100, rx: 10, fill: '#EADBC0', stroke: INK, 'stroke-width': 4 }); mk(box, 'line', { x1: 470, y1: 268, x2: 610, y2: 268, stroke: INK, 'stroke-width': 3 });
const link = mk(pS, 'line', { x1: 180, y1: 300, x2: 470, y2: 300, stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const pLb = [tx(pS, 160, 380, 'you', { 'text-anchor': 'middle', 'font-size': 22, fill: '#5F7399' }), tx(pS, 540, 390, 'helper + heavy box', { 'text-anchor': 'middle', 'font-size': 22, fill: '#B7791F' }), mono(pS, 320, 290, 'same move', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 })];
const tl = wt('P2', 'lift'), tm = wt('P4', 'movement');
const lift = t => { let y = -70 * M.io((t - tl) / 0.8); if (t >= tm) y = -70 + 30 * Math.sin(3 * (t - tm)); return y; };
const pS2 = $('#pS2');
const pIn = pth(pS2, CH1, 4, { 'stroke-dasharray': '10 8' }), pOut = pth(pS2, AM, 5);
const pL2 = [mono(pS2, 36, 120, 'input (base)', { fill: '#5F7399', 'font-weight': 600 }), mono(pS2, 36, 400, 'output (emitter) copies it', { fill: '#B7791F', 'font-weight': 600 })];
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const tr = mk(ck, 'g'), trp = npn(tr, 520, 250, 50, 0.9);
const cW = W(ck, 'M541,205 V112'), vccT = mk(ck, 'circle', { cx: 541, cy: 104, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const eW = W(ck, 'M541,295 V330'), rE = W(ck, 'M541,330 L527,338 L555,352 L527,366 L555,380 L527,394 L555,408 L527,422 L541,430 V470'), gE = W(ck, 'M517,470 H565 M527,482 H555 M537,494 H545', { 'stroke-width': 3 });
const oW = W(ck, 'M541,320 H720'), oN = mk(ck, 'circle', { cx: 541, cy: 320, r: 7, fill: INK }), oT = mk(ck, 'circle', { cx: 728, cy: 320, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const bW = W(ck, 'M160,300 V250 H499'), src = mk(ck, 'circle', { cx: 160, cy: 330, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), srcS = W(ck, 'M142,330 q9,-16 18,0 q9,16 18,0', { 'stroke-width': 3 });
const sW = W(ck, 'M160,360 V470'), gS0 = W(ck, 'M136,470 H184 M146,482 H174 M156,494 H164', { 'stroke-width': 3 });
const cLb = [tx(ck, 560, 110, '+V CC', { fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }), sub(tx(ck, 120, 338, 'v', { fill: TE, 'font-style': 'italic', 'text-anchor': 'end' }), 'in'),
  sub(tx(ck, 510, 386, 'R', { 'font-style': 'italic', 'text-anchor': 'end' }), 'E'), mono(ck, 574, 384, '1 kΩ', { fill: INK, 'font-weight': 600 }),
  sub(tx(ck, 728, 364, 'v', { fill: TE, 'font-style': 'italic', 'text-anchor': 'middle' }), 'out'), mono(ck, 580, 250, 'npn · β = 100', { fill: INK, 'font-weight': 600 }),
  mono(ck, 620, 300, 'emitter', { fill: MU, 'font-size': 18 }), mono(ck, 562, 160, 'collector', { fill: MU, 'font-size': 18 }), mono(ck, 300, 238, 'base', { fill: MU, 'font-size': 18 })];
// EXAMPLE FIGURES: v_B = 2 V + 1 V wave, R_E = 1 kOhm, beta = 100
const tW0 = wt('S5', 'feed') - 0.1;
const vB = t => t < tW0 ? 0 : 2 * M.io((t - tW0) / 0.5) + Math.sin(Math.PI * (t - tW0 - 0.5)) * M.clamp((t - tW0 - 0.5) / 0.3);
const vE = t => Math.max(0, vB(t) - 0.7), iE = t => vE(t); // mA through 1 kOhm
const integ = (f, t) => { let s = 0; const dt = 0.05; for (let x = tW0; x < t; x += dt) s += f(x) * Math.min(dt, t - x); return s; };
const eBig = flow(ck, [[541, 470], [541, 295], [541, 205], [541, 112]], 12, { skip: (x, y) => Math.hypot(x - 520, y - 250) < 52 || (y > 326 && y < 434) });
const eSm = flow(ck, [[499, 250], [160, 250], [160, 300]], 3, { r: 5, skip: () => false });
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 BASE · 1 V/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 EMITTER · 1 V/div', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
const gap = [PUC.arrow($('#scS'), '#FFFFFF', 3, 10), mono($('#scS'), 586, 18, 'gap = 0.7 V', { fill: '#FFFFFF', 'font-weight': 600, 'font-size': 15, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">v<sub>B</sub></span><span class="v" id="rVb" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">v<sub>E</sub></span><span class="v" id="rVe" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="rIb" style="color:${VI}">0</span><span class="u">µA</span>
  <span class="k" style="color:${VI}">I<sub>E</sub></span><span class="v" id="rIe" style="color:${VI}">0.0</span><span class="u">mA</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Tiny base current, big emitter current!' });

/* ================= D: derivation ================= */
const dS = $('#dS');
const dq = mk(dS, 'g'), dqp = npn(dq, 330, 230, 56, 1);
const dW = [W(dS, 'M120,230 H306'), W(dS, 'M353.5,180 V100'), W(dS, 'M353.5,280 V310'), W(dS, 'M353.5,310 L339,318 L368,332 L339,346 L368,360 L339,374 L368,388 L353.5,396 V440 H120 V246'), W(dS, 'M353.5,310 H560')];
const dT = [mk(dS, 'circle', { cx: 120, cy: 230, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(dS, 'circle', { cx: 560, cy: 310, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(dS, 'circle', { cx: 353.5, cy: 310, r: 6, fill: INK })];
const dLb = [sub(tx(dS, 108, 340, 'v', { fill: TE, 'font-style': 'italic', 'text-anchor': 'end', 'font-size': 26 }), 'in'), sub(tx(dS, 400, 360, 'v', { fill: TE, 'font-style': 'italic', 'font-size': 26 }), 'out'),
  sub(tx(dS, 210, 290, 'v', { fill: TE, 'font-style': 'italic', 'font-size': 24 }), 'BE'), mono(dS, 210, 316, '≈ 0.7 V', { fill: TE, 'font-weight': 600, 'font-size': 18 }), mono(dS, 368, 96, '+V CC', { fill: TE, 'font-weight': 600 }),
  sub(tx(dS, 330, 360, 'R', { 'font-style': 'italic', 'text-anchor': 'end' }), 'E'), mono(dS, 568, 300, 'out', { fill: TE, 'font-weight': 600 })];
const dA = [PUC.arrow(dS, TE, 4, 14), PUC.arrow(dS, TE, 4, 14), PUC.arrow(dS, TE, 4, 14)];
const dFb = W(dS, 'M470,330 C520,380 520,460 400,470 H180', { stroke: AM, 'stroke-width': 4, 'stroke-dasharray': '10 8' }), dFbL = mono(dS, 520, 486, 'whole output fed back', { 'text-anchor': 'end', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const dRows = rows($('#dSteps'), [
  [K(`${VIN} = ${VBE} + ${VOUT}`), 'around the loop', 92],
  [K(`\\beta_{fb} = ${VOUT} / ${VOUT} = 1`), 'feedback ratio', 168],
  [K('A_f = A/(1 + A)'), '', 244],
  [K('A_f \\approx 1'), 'just under one', 320],
  [K(`A_v = \\dfrac{${RE}}{r_e + ${RE}}`), 'more exactly', 396],
  [K(`r_e \\approx 25\\,\\text{mV} / ${c(VI, 'I_E')}`), 'inside the emitter', 498]]);
const tDR = [wt('D2', 'input'), wt('D3', 'Beta'), wt('D5', 'equals'), wt('D6', 'just'), wt('D7', 'exactly'), wt('D8', 'twenty')];

/* ================= Z: impedance ================= */
const zS = $('#zS'); const zA = [PUC.arrow(zS, INK, 4, 14), PUC.arrow(zS, INK, 4, 14)];
const zLb = [mono(zS, 132, 264, 'cannot push much', { 'text-anchor': 'middle', 'font-size': 17 }), mono(zS, 392, 264, 'high Z in · low Z out', { 'text-anchor': 'middle', 'font-size': 17, fill: C.ok, 'font-weight': 600 }), mono(zS, 652, 264, 'needs lots of current', { 'text-anchor': 'middle', 'font-size': 17 })];
const zw = [pth(zS, CH1, 4), pth(zS, AM, 4)];
$('#zZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = ['source ' + K(`1\\,\\text{V}`), 'inside ' + K(`R_s = 10\\,${KO}`), 'load ' + K(`R_L = 1\\,${KO}`), K('\\beta = 100')].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wRows = rows($('#wSteps'), [
  [K(`v_L = 1 \\times \\tfrac{1}{10 + 1} \\approx 0.09\\,\\text{V}`), 'direct', 92],
  [K(`Z_{in} \\approx \\beta R_E = 100\\,${KO}`), '', 176],
  [K(`v_B = 1 \\times \\tfrac{100}{110} \\approx 0.91\\,\\text{V}`), '', 260],
  [K('v_L \\approx 0.91 \\times 1 \\approx 0.9\\,\\text{V}'), 'gain ≈ 1', 344],
  [K('0.9 / 0.09 = 10'), 'ten times more', 432]]);
const tWR = [wt('W3', 'directly'), wt('W5', 'input'), wt('W6', 'keeps'), wt('W7', 'passes'), wt('W8', 'Ten')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'The emitter follower flips the signal, like CE', right: 'Output in phase, gain just under 1', y0: 96, y1: 184 });
const tcS = $('#tcS');
mk(tcS, 'line', { x1: 10, y1: 95, x2: 370, y2: 95, stroke: C.line, 'stroke-width': 2 });
const xIn = mk(tcS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-dasharray': '9 7' }), xOut = mk(tcS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const xLb = [mono(tcS, 14, 26, 'in', { fill: '#5F7399', 'font-weight': 600 }), mono(tcS, 14, 182, 'out', { fill: '#B7791F', 'font-weight': 600 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the emitter follower, explain why its gain is about 1, compare CE, CB and CC' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An emitter follower has β&nbsp;=&nbsp;150 and R<sub>E</sub>&nbsp;=&nbsp;2&nbsp;kΩ. Roughly what are its input impedance and voltage gain?', qW: 780,
  opts: ['About 300 kΩ · gain about 1, in phase', 'About 300 kΩ · gain about 1, 180° out of phase', 'About 13 Ω · gain about 150, in phase', '2 kΩ · gain about 150, 180° out of phase'], right: 0, cols: 1, optW: 968, optH: 62, optY: 262, optFs: 26 });
const sol = PUC.solution($('#so'), [[K('Z_{in} \\approx \\beta R_E')], [K(`150 \\times 2\\,${KO} = 300\\,${KO}`)], [K('A_v \\approx 1,\\ \\text{in phase}')]], { dy: 130, y0: 100 });
const tSol = [wt('A2', 'input'), wt('A3', 'One'), wt('A4', 'gain')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'The emitter follower (common collector) · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K(`A_v = ${RE}/(r_e + ${RE}) \\approx 1 \\quad (\\text{in phase})`), K(`Z_{in} \\approx \\beta R_E \\ (\\text{high}) \\qquad Z_{out}\\ \\text{low}`), K(`A_i \\approx \\beta + 1 \\qquad v_E = v_B - 0.7\\,\\text{V}`),
    'Voltage series negative feedback with β = 1 (100%)', 'Use: a buffer for impedance matching (weak source → heavy load)'] });
const nx = PUC.next($('#sF'), { label: 'COMING UP', topic: 'More PUC Electronics soon - follow the playlist', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[wt('S5', 'feed') - 0.3, tD - 0.4], [tZ + 0.2, tW - 0.4]];

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
    const t1 = wt('H1', 'microphone') - 0.3, ph = -6 * t;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); pop($('#h1T'), t, wt('H2', 'vanishes') - 0.1);
    fadeAt([...h1m, ...h1s], t, t1 + 0.2, 0.08); M.draw(h1w, t, t1 + 0.4, 0.6); fadeAt(h1L, t, t1 + 0.6, 0.15);
    const k1 = M.io((t - wt('H2', 'voice') + 0.2) / 0.6);
    PUC.attr(h1in, 'd', sine(120, 300, 150, 30, ph, 10)); PUC.attr(h1out, 'd', sine(440, 620, 150, M.lerp(18, 3, k1), ph, 10));
    M.vis(h1in, t, t1 + 0.7, 1e9, { dy: 0, fade: 0.2 }); M.vis(h1out, t, t1 + 0.9, 1e9, { dy: 0, fade: 0.2 });
    const t2 = wt('H3', 'adds') - 0.3;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); pop($('#h2T'), t, wt('H4', 'clearly') - 0.1);
    fadeAt([...h2m, ...h2s], t, t2 + 0.2, 0.08); M.draw(h2b[0], t, wt('H3', 'stage') - 0.2, 0.5); fadeAt([h2b[1]], t, wt('H3', 'stage') + 0.2); drawSeq(h2b.slice(2), t, wt('H3', 'between') - 0.2, 0.4, 0.12);
    M.vis(h2L, t, wt('H3', 'gain'), 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(h2in, 'd', sine(120, 290, 120, 26, ph, 10)); PUC.attr(h2out, 'd', sine(470, 620, 110, 26 * M.io((t - wt('H4', 'voice') + 0.2) / 0.6), ph, 10));
    M.vis(h2in, t, t2 + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(h2out, t, wt('H4', 'voice') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const t4 = wt('H4', 'Meet') - 0.3;
    drawSeq([...tqW, ...tqp.slice(0, 4)], t, t4, 0.3, 0.06); M.vis(tqp[4], t, t4 + 0.4, 1e9, { dy: 0, fade: 0.15 }); fadeAt(tqL, t, t4 + 0.4, 0.08);
    pop($('#aPill'), t, wt('H4', 'emitter') - 0.1);
  }

  /* P: strong helper */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, T0('P5') - 0.2, out, { dx: 60, dy: 0, ...o });
    fadeAt(pTr, t, tP + 0.3, 0.1); M.vis(youG, t, tP + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(boxG, t, wt('P1', 'helper') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    fadeAt(pLb.slice(0, 2), t, wt('P1', 'helper'), 0.15);
    const y = lift(t); you.setAttribute('transform', `translate(0,${y.toFixed(1)})`); box.setAttribute('transform', `translate(0,${y.toFixed(1)})`);
    PUC.attr(link, 'y1', (300 + y).toFixed(1)); PUC.attr(link, 'y2', (300 + y).toFixed(1)); PUC.attr(pLb[2], 'y', (290 + y).toFixed(1));
    M.vis(link, t, wt('P2', 'same') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(pLb[2], t, wt('P2', 'same'), 1e9, { dy: 0, fade: 0.2 });
    const te = wt('P3', 'effort') - 0.3;
    M.vis($('#pE1'), t, te, 1e9, { dy: 10 }); M.vis($('#pE'), t, te, 1e9, { dy: 0, fade: 0.2 }); $('#pE i').style.width = (440 * 0.06 * M.io((t - te) / 0.4)).toFixed(1) + 'px';
    const tf = wt('P3', 'strength') - 0.3;
    M.vis($('#pF1'), t, tf, 1e9, { dy: 10 }); M.vis($('#pF'), t, tf, 1e9, { dy: 0, fade: 0.2 }); $('#pF i').style.width = (440 * 0.92 * M.io((t - tf) / 0.7)).toFixed(1) + 'px';
    const t5 = T0('P5'), ph = -3 * (t - t5);
    let d1 = '', d2 = ''; for (let x = 36; x <= 748; x += 4) { const s = (x - 36) / 60 + ph; d1 += (x > 36 ? 'L' : 'M') + x + ',' + (240 - 90 * Math.sin(s)).toFixed(1); d2 += (x > 36 ? 'L' : 'M') + x + ',' + (262 - 86 * Math.sin(s)).toFixed(1); }
    PUC.attr(pIn, 'd', d1); PUC.attr(pOut, 'd', d2); M.vis(pIn, t, t5 + 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(pOut, t, wt('P5', 'copies') - 0.3, 1e9, { dy: 0, fade: 0.3 });
    fadeAt([pL2[0]], t, t5 + 0.2); fadeAt([pL2[1]], t, wt('P5', 'copies'));
    M.vis($('#pStrip'), t, wt('P5', 'copies') + 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tS - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tS + 0.45, out, { dy: 36, ...o });
    const t1 = tS + 0.4;
    M.vis(tr, t, t1, 1e9, { dy: 0, fade: 0.25 }); fadeAt([cLb[5]], t, t1 + 0.3);
    const t2 = wt('S2', 'collector') - 0.2; M.draw(cW, t, t2, 0.4); fadeAt([vccT, cLb[0], cLb[7]], t, t2 + 0.4, 0.1);
    const t3 = wt('S3', 'output') - 0.2; drawSeq([eW, rE, gE], t, t3, 0.35, 0.12); M.draw(oW, t, wt('S3', 'emitter') - 0.1, 0.4); fadeAt([oN, oT, cLb[4], cLb[6]], t, wt('S3', 'emitter') + 0.2, 0.08); fadeAt([cLb[2], cLb[3]], t, wt('S3', 'resistor'), 0.1);
    const t5 = wt('S5', 'feed') - 0.4; M.draw(bW, t, t5, 0.5); fadeAt([src, srcS, cLb[1], cLb[8]], t, t5 + 0.2, 0.08); drawSeq([sW, gS0], t, t5 + 0.3, 0.3, 0.1);
    M.vis($('#tg2'), t, t5 + 0.2, 1e9, { dy: 10 });
    const vb = vB(t), ve = vE(t), ie = iE(t), on = t >= tW0;
    eBig.set(integ(u => 22 * iE(u), t), on && ie > 0.05); eSm.set(-integ(u => 3 * iE(u), t), on && ie > 0.05);
    M.vis($('#ckE'), t, tW0, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(trp[0], 'fill', M.mix('#FFFFFF', C.ac2, M.clamp(ie / 2.3)));
    M.vis($('#ro1'), t, tS + 0.6, 1e9, { dy: 12 });
    M.setT($('#rVb'), vb.toFixed(2)); M.setT($('#rVe'), ve.toFixed(2)); M.setT($('#rIb'), String(Math.round(ie / 101 * 1000))); M.setT($('#rIe'), ie.toFixed(2));
    M.vis($('#rgT'), t, wt('S9', 'gain') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#slowT'), t, tW0, 1e9, { dy: 0, fade: 0.2 });
    tr1(u => 46 * vB(u), t, tW0, 5, 172, on); tr2(u => 46 * vE(u), t, tW0, 5, 172, on); fadeAt(scL, t, tW0, 0.1);
    const ts7 = wt('S7', 'zero') - 0.2, gOn = t >= ts7; gap[0].set(572, 172 - 46 * vb + 4, 572, gOn ? 172 - 46 * ve - 4 : 172 - 46 * vb + 4); M.hide(gap[0].g, !gOn); M.vis(gap[1], t, ts7, 1e9, { dy: 0, fade: 0.2 });
    avB(t, wt('S10', 'tiny') - 0.2, T1('S11') + 0.4);
  }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...dW, ...dqp.slice(0, 4)], t, tD + 0.3, 0.3, 0.06); M.vis(dqp[4], t, tD + 0.9, 1e9, { dy: 0, fade: 0.15 }); fadeAt(dT, t, tD + 0.9, 0.06); fadeAt([dLb[4], dLb[5], dLb[6]], t, tD + 1.0, 0.08);
    const t2 = wt('D2', 'input') - 0.2, u0 = M.io((t - t2) / 0.4), u1 = M.io((t - wt('D2', 'base') + 0.1) / 0.4), u2 = M.io((t - wt('D2', 'output') + 0.1) / 0.4);
    dA[0].set(92, 420, 92, 420 - 160 * u0); dA[1].set(250, 240, 250 + 40 * u1, 240 + 32 * u1); dA[2].set(420, 396, 420, 396 - 80 * u2);
    fadeAt([dLb[0]], t, t2 + 0.3); fadeAt([dLb[2], dLb[3]], t, wt('D2', 'base') + 0.2, 0.1); fadeAt([dLb[1]], t, wt('D2', 'output') + 0.2);
    M.draw(dFb, t, wt('D3', 'whole') - 0.1, 0.8); M.vis(dFbL, t, wt('D3', 'whole') + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dP'), t, wt('D4', 'voltage') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[5] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tZ; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tZ - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'That') - 0.05, { out: tZ - 0.35, outDur: 0.25 }); }

  /* Z: impedance */
  const zOn = t >= tZ - 0.05 && t < tW + 0.05; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = tW - 0.32;
    M.vis($('#zL'), t, tZ + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#zR'), t, wt('Z5', 'sits') - 0.3, out, { dx: 60, dy: 0, ...o });
    const ta = wt('Z1', 'superpower'), tb = wt('Z3', 'About') - 0.2, tc = wt('Z4', 'low') - 0.2;
    M.vis($('#zA1'), t, ta, 1e9, { dy: 10 }); M.vis($('#zA'), t, ta, 1e9, { dy: 0, fade: 0.2 }); $('#zA i').style.width = (5.4 * M.io((t - ta) / 0.4)).toFixed(1) + 'px'; M.vis($('#zAv'), t, ta + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#zB1'), t, tb, 1e9, { dy: 10 }); M.vis($('#zB'), t, tb, 1e9, { dy: 0, fade: 0.2 }); $('#zB i').style.width = (540 * M.io((t - tb) / 0.9)).toFixed(1) + 'px'; M.vis($('#zBv'), t, tb + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#zC1'), t, tc, 1e9, { dy: 10 }); M.vis($('#zC'), t, tc, 1e9, { dy: 0, fade: 0.2 }); $('#zC i').style.width = (16 * M.io((t - tc) / 0.4)).toFixed(1) + 'px'; M.vis($('#zCv'), t, tc + 0.3, 1e9, { dy: 0, fade: 0.2 });
    pop($('#zP1'), t, wt('Z2', 'Input')); pop($('#zP2'), t, wt('Z4', 'drive') - 0.1);
    const t5 = wt('Z5', 'weak') - 0.2;
    ['#zc0', '#zc1', '#zc2'].forEach((s, i) => { const ti = [t5, wt('Z5', 'buffer') - 0.3, wt('Z5', 'heavy') - 0.2][i]; M.vis($(s), t, ti, 1e9, { dy: 20 }); const on = i === 1 && t >= wt('Z5', 'buffer') - 0.3; $(s).style.borderColor = on ? AM : C.soft; $(s).style.background = on ? C.ac2 : C.soft; });
    const ua = M.io((t - wt('Z5', 'buffer')) / 0.4); zA[0].set(234, 170, 234 + 54 * ua, 170); zA[1].set(494, 170, 494 + 54 * ua, 170);
    zLb.forEach((l, i) => M.vis(l, t, wt('Z5', 'buffer') + 0.2 + i * 0.15, 1e9, { dy: 0, fade: 0.2 }));
    const ph = -4 * (t - tZ); PUC.attr(zw[0], 'd', sine(60, 340, 370, 24, ph, 12)); PUC.attr(zw[1], 'd', sine(440, 720, 370, 24, ph, 12));
    M.vis(zw[0], t, wt('Z5', 'buffer') + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(zw[1], t, wt('Z5', 'buffer') + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#zStrip'), t, wt('Z6', 'impedance') - 0.2, 1e9, { dy: 24 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W1', 'one'), wt('W1', 'ten'), wt('W2', 'load'), wt('W4', 'beta')];
    wGiv.forEach((e, i) => pop(e, t, tg[i] - 0.1));
    runRows(wRows, t, tWR);
    const ta = tWR[0] + 0.8, tb = tWR[3] + 0.6;
    M.vis($('#wA1'), t, ta, 1e9, { dy: 10 }); M.vis($('#wA'), t, ta, 1e9, { dy: 0, fade: 0.2 }); $('#wA i').style.width = (520 * 0.09 * M.io((t - ta) / 0.4)).toFixed(1) + 'px'; M.vis($('#wAv'), t, ta + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wB1'), t, tb, 1e9, { dy: 10 }); M.vis($('#wB'), t, tb, 1e9, { dy: 0, fade: 0.2 }); $('#wB i').style.width = (520 * 0.9 * M.io((t - tb) / 0.8)).toFixed(1) + 'px'; M.vis($('#wBv'), t, tb + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wV'), t, tWR[4], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#wBox'), t, tWR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'output') - 0.2 });
    const ph = -4 * (t - tX), ui = M.io((t - tX - 0.6) / 0.5), uo = M.io((t - wt('X3', 'phase') + 0.3) / 0.5);
    PUC.attr(xIn, 'd', sine(60, 370, 92, 40 * ui, ph)); PUC.attr(xOut, 'd', sine(60, 370, 98, 38 * uo, ph)); fadeAt(xLb, t, tX + 0.6, 0.3);
    pop($('#tcP'), t, wt('X3', 'phase') - 0.1); pop($('#tcQ'), t, wt('X4', 'current') - 0.1);
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
