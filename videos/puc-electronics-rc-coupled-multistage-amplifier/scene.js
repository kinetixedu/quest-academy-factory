// PUC Electronics Ep 68 - RC coupled multistage amplifier ("Breadboard" style, Lab Notebook world)
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
const g1 = f => 1 / Math.sqrt((1 + (50 / f) ** 2) * (1 + (f / 2e5) ** 2));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Aarav') - 0.2;
const tP = T0('P1'), tB = T0('B1'), tG = T0('G1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const aer = W(h1S, 'M90,210 V100 M60,100 L90,130 L120,100 M70,120 L90,140 L110,120', { 'stroke-width': 4 });
const wv1 = mk(h1S, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' });
const spk2 = W(h2S, 'M60,128 H80 L110,102 V198 L80,172 H60 Z', { fill: '#fff' });
const wv2 = mk(h2S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hLb = [mono(h1S, 740, 252, 'barely a ripple', { 'text-anchor': 'end', fill: '#5F7399', 'font-weight': 600 }), mono(h2S, 740, 252, 'a big swing', { 'text-anchor': 'end', fill: GOLD, 'font-weight': 600 })];

/* ================= P: magnifying glasses + joining stages ================= */
const pS = $('#pS');
const obj = tx(pS, 80, 270, 'A', { 'font-size': 22, 'text-anchor': 'middle' });
const glass = (x) => { const g = mk(pS, 'g'); mk(g, 'circle', { cx: x, cy: 240, r: 58, fill: '#EAF0F8', stroke: INK, 'stroke-width': 5 }); W(g, `M${x + 30},${290} L${x + 62},${352}`, { 'stroke-width': 10 }); return g; };
const gl1 = glass(200), gl2 = glass(470);
const img1 = tx(pS, 335, 282, 'A', { 'font-size': 64, 'text-anchor': 'middle' }), img2 = tx(pS, 650, 300, 'A', { 'font-size': 150, 'text-anchor': 'middle', fill: AM });
const pLb = [mono(pS, 80, 410, '× 1', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(pS, 335, 410, '× 10', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(pS, 650, 410, '× 100', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 24 })];
const jS = $('#jS');
const box = (x, s) => { const g = mk(jS, 'g'); mk(g, 'rect', { x, y: 130, width: 230, height: 190, rx: 16, fill: C.soft }); tx(g, x + 115, 180, s, { 'text-anchor': 'middle', 'font-size': 26 }); return g; };
const bx1 = box(60, 'STAGE 1'), bx2 = box(494, 'STAGE 2');
const jV = [mono(jS, 175, 250, 'collector', { 'text-anchor': 'middle', fill: MU, 'font-weight': 600 }), mono(jS, 175, 288, '6 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 30 }),
  mono(jS, 609, 250, 'base', { 'text-anchor': 'middle', fill: MU, 'font-weight': 600 }), mono(jS, 609, 288, '1.8 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 30 })];
const jWire = W(jS, 'M290,225 H494', { stroke: RED, 'stroke-width': 5 });
const jX = mk(jS, 'g'); mk(jX, 'circle', { cx: 392, cy: 225, r: 22, fill: RED }); W(jX, 'M383,216 l18,18 m0,-18 l-18,18', { stroke: '#fff', 'stroke-width': 4 });
const jXT = mono(jS, 392, 380, 'a wire drags 1.8 V up to 6 V', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600 });
const jCap = mk(jS, 'g'); W(jCap, 'M290,225 H382 M402,225 H494', { 'stroke-width': 5 }); W(jCap, 'M382,195 V255 M402,195 V255', { 'stroke-width': 7 });
const jOK = mono(jS, 392, 380, 'each stage keeps its own bias', { 'text-anchor': 'middle', fill: OK, 'font-weight': 600 });
$('#pZ').innerHTML = M.icon('zap', 30, AM, 2.4); $('#pZ2').innerHTML = M.icon('check', 30, AM, 3);

/* ================= B: breadboard ================= */
const ck = $('#ckS'); ck.setAttribute('viewBox', '-36 0 928 600');
const cRail = W(ck, 'M150,110 H820'), cGnd = W(ck, 'M130,500 H820');
const s1 = [zigV(ck, 250, 110, 320), zigV(ck, 250, 320, 500), W(ck, 'M250,320 H339'), zigV(ck, 381, 110, 240), W(ck, 'M381,240 V275'), zigV(ck, 381, 365, 500)];
const s1b = [W(ck, 'M381,380 H430 V420'), W(ck, 'M412,420 H448', { 'stroke-width': 5 }), W(ck, 'M412,432 H448', { 'stroke-width': 5 }), W(ck, 'M430,432 V500')];
const t1 = mk(ck, 'g'); npn(t1, 360, 320, 50, 0.9);
const cIn = [W(ck, 'M130,320 H182'), W(ck, 'M182,296 V344', { 'stroke-width': 5 }), W(ck, 'M196,296 V344', { 'stroke-width': 5 }), W(ck, 'M196,320 H250')];
const cC = [W(ck, 'M381,255 H440'), W(ck, 'M440,231 V279', { 'stroke-width': 5 }), W(ck, 'M454,231 V279', { 'stroke-width': 5 }), W(ck, 'M454,255 H490 V320 H530')];
const s2 = [zigV(ck, 530, 110, 320), zigV(ck, 530, 320, 500), W(ck, 'M530,320 H619'), zigV(ck, 661, 110, 240), W(ck, 'M661,240 V275'), zigV(ck, 661, 365, 500)];
const s2b = [W(ck, 'M661,380 H710 V420'), W(ck, 'M692,420 H728', { 'stroke-width': 5 }), W(ck, 'M692,432 H728', { 'stroke-width': 5 }), W(ck, 'M710,432 V500')];
const t2 = mk(ck, 'g'); npn(t2, 640, 320, 50, 0.9);
const cOut = [W(ck, 'M661,255 H720'), W(ck, 'M720,231 V279', { 'stroke-width': 5 }), W(ck, 'M734,231 V279', { 'stroke-width': 5 }), W(ck, 'M734,255 H790')];
const dots = [[250, 320], [381, 255], [530, 320], [661, 255], [381, 380], [661, 380]].map(([x, y]) => mk(ck, 'circle', { cx: x, cy: y, r: 6, fill: INK }));
const term = [[130, 320], [130, 500], [798, 255]].map(([x, y]) => mk(ck, 'circle', { cx: x, cy: y, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }));
const lSt = [mono(ck, 315, 96, 'STAGE 1', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(ck, 595, 96, 'STAGE 2', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 })];
const lCc = tx(ck, 447, 214, 'C C', { 'text-anchor': 'middle', fill: AM });
const lIO = [tx(ck, 130, 290, 'v in', { 'text-anchor': 'middle', fill: TE }), tx(ck, 798, 296, 'v out', { 'text-anchor': 'middle', fill: TE }), mono(ck, 830, 118, 'V CC', { fill: TE, 'font-weight': 600 })];
const hiRC = [zigV(ck, 381, 110, 240, { stroke: AM, 'stroke-width': 6 }), zigV(ck, 661, 110, 240, { stroke: AM, 'stroke-width': 6 })];
const prb1 = mk(ck, 'circle', { cx: 130, cy: 320, r: 15, fill: 'none', stroke: CH1, 'stroke-width': 4 }), prb2 = mk(ck, 'circle', { cx: 381, cy: 255, r: 15, fill: 'none', stroke: AM, 'stroke-width': 4 });
const prbT = mono(ck, 381, 232, 'CH2', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 17 });
const sk = (x0) => (x, y) => Math.hypot(x - (x0 - 21), y - 320) < 54 || (y > 146 && y < 205) || (y > 400 && y < 466);
const e1 = flow(ck, [[381, 500], [381, 110]], 9, { skip: sk(381) }), e2 = flow(ck, [[661, 500], [661, 110]], 9, { skip: sk(661) });
const tIn = wt('B10', 'one'), tP2 = wt('B12', 'Move');
const vin = t => t < tIn ? 0 : Math.sin(Math.PI * (t - tIn));
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 IN · 1 mV/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, '', { fill: GOLD, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">v<sub>in</sub></span><span class="v" id="rVi" style="color:${TE}">1.0</span><span class="u">mV</span>
  <span class="k" style="color:${TE}">v<sub>1</sub></span><span class="v" id="rV1" style="color:${TE}">-</span><span class="u">mV</span>
  <span class="k" style="color:${TE}">v<sub>out</sub></span><span class="v" id="rVo" style="color:${TE}">-</span><span class="u">V</span>
  <span class="k">|A|</span><span class="v" id="rA">-</span><span class="u"></span>`;

/* ================= G: phase + frequency response ================= */
const phS = $('#phS');
const phW = [0, 1, 2].map(i => mk(phS, 'path', { fill: 'none', stroke: i ? AM : CH1, 'stroke-width': i ? 5 : 4, 'stroke-linecap': 'round' }));
const phL = [mono(phS, 120, 400, 'input', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 }), mono(phS, 392, 400, 'after stage 1', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 }), mono(phS, 664, 400, 'after stage 2', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 })];
const phA = [PUC.arrow(phS, INK, 4, 14), PUC.arrow(phS, INK, 4, 14)];
const phT = [mono(phS, 256, 200, '+180°', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(phS, 528, 200, '+180°', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 })];
const phR = mono(phS, 392, 480, '180° + 180° = 360° · back in phase', { 'text-anchor': 'middle', fill: OK, 'font-weight': 600, 'font-size': 24 });
const gS = $('#gS');
const gp = PUC.graph(gS, { x: 110, y: 96, w: 600, h: 340, xmax: 6, ymax: 1.15, xt: [], yt: [0.5, 1], yl: 'gain (relative)' });
['10', '100', '1k', '10k', '100k', '1M', '10M'].forEach((s, i) => { gp.mk('line', { x1: gp.X(i), y1: 436, x2: gp.X(i), y2: 444, stroke: INK, 'stroke-width': 2 }); mono(gS, gp.X(i), 468, s, { 'text-anchor': 'middle', 'font-size': 18 }); });
mono(gS, 710, 500, 'frequency (Hz)', { 'text-anchor': 'end', 'font-size': 18 });
const gX = f => Math.log10(f) - 1;
const c1 = gp.mk('path', { d: '', fill: 'none', stroke: '#9AA0AC', 'stroke-width': 4, 'stroke-dasharray': '10 8' }), c2 = gp.curve(INK, 5);
const g707 = gp.mk('line', { x1: gp.X(0), y1: gp.Y(0.707), x2: gp.X(6), y2: gp.Y(0.707), stroke: RED, 'stroke-width': 2, 'stroke-dasharray': '7 6' });
const g707T = mono(gS, gp.X(3), gp.Y(0.707) + 28, '0.707', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600 });
const gC1 = mono(gS, gp.X(4.75), gp.Y(0.94), '1 stage', { fill: '#6B7280', 'font-weight': 600 }), gC2 = mono(gS, gp.X(2.0), gp.Y(1.04), '2 stages', { fill: INK, 'font-weight': 600 });
const gN = [PUC.arrow(gS, AM, 4, 12), PUC.arrow(gS, AM, 4, 12)], gNT = mono(gS, gp.X(3), gp.Y(0.25), 'narrower bandwidth', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 });
const gtE = [0, 1, 2].map(i => $('#gt' + i));
$('#gR').insertAdjacentHTML('beforeend', `<div class="gt" id="gq0" style="top:76px"><div class="tl">PHASE · EACH CE STAGE</div><div class="tn">Flips the wave by 180°</div></div><div class="gt" id="gq1" style="top:228px"><div class="tl">PHASE · TWO STAGES</div><div class="tn">360° · back in phase</div></div>`);
const gq = [$('#gq0'), $('#gq1')];

/* ================= D: derivation ================= */
const dS = $('#dS');
const dWin = mk(dS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), dWm = mk(dS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' }), dWo = mk(dS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dAr = [PUC.arrow(dS, INK, 4, 14), PUC.arrow(dS, INK, 4, 14), PUC.arrow(dS, INK, 4, 14)];
const dLb = [mono(dS, 80, 132, 'in', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 }), mono(dS, 680, 132, 'out', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600 })];
const dDb = [mono(dS, 225, 300, 'G1 dB', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 24 }), mono(dS, 360, 300, '+', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 26 }), mono(dS, 495, 300, 'G2 dB', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 24 })];
const dPh = [mono(dS, 225, 350, '180°', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(dS, 360, 350, '+', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 26 }), mono(dS, 495, 350, '180°', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(dS, 640, 350, '= 360°', { 'text-anchor': 'middle', fill: OK, 'font-weight': 600, 'font-size': 24 })];
const dLd = [W(dS, 'M495,140 Q495,100 300,100 L300,140', { stroke: VI, 'stroke-width': 3, 'stroke-dasharray': '6 6' }), mono(dS, 397, 86, 'stage 2 loads stage 1', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 18 })];
const dN = mono(dS, 392, 440, 'n stages: A1 × A2 × … × An', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 });
const dRows = rows($('#dSteps'), [
  [K('A = A_1 \\times A_2'), 'gains multiply', 82],
  [K('A_1\\ \\text{measured with stage 2 connected}'), '', 182],
  [K('A = A_1 A_2 \\cdots A_n'), 'n stages', 266],
  [K('G = 20\\log_{10} A'), 'decibels', 350],
  [K('G = G_1 + G_2'), 'decibels add', 434],
  [K('\\phi = 180^\\circ + 180^\\circ = 360^\\circ'), 'in phase', 518]]);
const tDR = [wt('D2', 'equals'), wt('D3', 'Measure'), wt('D4', 'multiply'), wt('D5', 'equals'), wt('D6', 'So'), wt('D7', 'Phase')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K('A_1 = 50'), K('A_2 = 40'), K(`${c(TE, 'v_{in}')} = 1\\,\\text{mV}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS');
const wWi = mk(wS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), wWo = mk(wS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wAr = [PUC.arrow(wS, INK, 4, 14), PUC.arrow(wS, INK, 4, 14), PUC.arrow(wS, INK, 4, 14)];
const wT = [mono(wS, 100, 350, '1 mV', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 }), mono(wS, 275, 360, '34 dB', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 24 }), mono(wS, 515, 360, '32 dB', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 24 }), mono(wS, 680, 350, '2 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 24 })];
const wTot = [mono(wS, 392, 440, 'overall × 2000', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 28 }), mono(wS, 392, 490, '34 + 32 = 66 dB', { 'text-anchor': 'middle', fill: GOLD, 'font-weight': 600, 'font-size': 28 })];
const wRows = rows($('#wSteps'), [
  [K('A = 50 \\times 40 = 2000'), 'multiply', 92],
  [K(`${c(TE, 'v_{out}')} = 2000 \\times 1\\,\\text{mV} = 2\\,\\text{V}`), '', 186],
  [K('20\\log_{10} 50 \\approx 34\\,\\text{dB}'), 'stage 1', 280],
  [K('20\\log_{10} 40 \\approx 32\\,\\text{dB}'), 'stage 2', 374],
  [K('G = 34 + 32 = 66\\,\\text{dB}'), '= 20 log 2000', 490]]);
const tWR = [wt('W4', 'Overall'), wt('W5', 'The'), wt('W6', 'stage'), wt('W6', 'two'), wt('W7', 'Add')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: `${K('A = A_1 + A_2 = 90')}`, right: `${K('A = A_1 \\times A_2 = 2000')}`, y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcR = [['PLAIN GAINS', '50 × 40 = 2000', INK], ['DECIBELS', '34 + 32 = 66 dB', GOLD], ['TWO CE STAGES', 'output in phase', OK]].map(([k, v, col], i) => [mono(tcS, 36, 104 + i * 64, k, { fill: MU, 'font-weight': 600 }), mono(tcS, 290, 106 + i * 64, v, { fill: col, 'font-weight': 600, 'font-size': 28 })]);
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw and explain a two-stage RC coupled amplifier with its frequency response' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A three-stage RC coupled CE amplifier has stage gains of 20&nbsp;dB, 26&nbsp;dB and 14&nbsp;dB. The input is 0.5&nbsp;mV. Find the output.', qW: 780,
  opts: ['0.5 V, in phase', '0.5 V, 180° out of phase', '30 mV, in phase', '5 V, 180° out of phase'], right: 1, optW: 474, optY: 330, optFs: 26 });
const sol = PUC.solution($('#so'), [[K('G = 20 + 26 + 14 = 60\\,\\text{dB}')], [K('A = 10^{60/20} = 1000')], [K('1000 \\times 0.5\\,\\text{mV} = 0.5\\,\\text{V}')], [K('3 \\times 180^\\circ \\to \\text{out of phase}')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Add'), wt('A3', 'Sixty'), wt('A4', 'One'), wt('A5', 'Three')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'RC coupled multistage amplifier · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K('A = A_1 \\times A_2 \\times \\cdots \\times A_n \\quad (\\text{loaded gains})'), K('G(\\text{dB}) = G_1 + G_2 + \\cdots + G_n'), K('\\text{Two CE stages: } 180^\\circ + 180^\\circ = 360^\\circ \\ (\\text{in phase})'),
    'C<sub>C</sub> passes the wave and blocks DC · each stage keeps its own bias', 'More stages → more gain, but a narrower bandwidth'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 69', topic: 'Power amplifiers: class A, B and C', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B13', 'Two'), 1.1, 1100, 480], [T0('B14') + 0.2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[wt('B6', 'collector'), tG - 0.4], [tW + 0.2, tX - 0.32]];

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
    const ta = wt('H2', 'signal') - 0.3, tb = wt('H3', 'speaker') - 0.3, ph = -5 * (t - ta);
    M.vis($('#h1C'), t, ta, out, { dx: 60, dy: 0, ...o }); M.vis($('#h1T'), t, wt('H2', 'one') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(aer, t, ta + 0.2, 0.5); M.vis(wv1, t, ta + 0.4, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wv1, 'd', wav(150, 740, 150, 4, ph, 22)); M.vis(hLb[0], t, wt('H2', 'tiny'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h2C'), t, tb, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2T'), t, wt('H3', 'thousand') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(spk2, t, tb + 0.2, 0.5); M.vis(wv2, t, tb + 0.4, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wv2, 'd', wav(150, 740, 150, 62 * M.o3((t - tb - 0.4) / 0.6), ph, 22)); M.vis(hLb[1], t, wt('H3', 'two'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#aPill'), t, wt('H4', 'fifty') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: glasses + joining */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P7', 'catch') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(obj, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(pLb[0], t, tP + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis(gl1, t, wt('P1', 'magnifying') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(img1, t, wt('P1', 'ten'), 1e9, { dy: 0, sc: 0.4, sp: M.SOFT, fade: 0.15 }); M.vis(pLb[1], t, wt('P1', 'ten') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(gl2, t, wt('P2', 'second') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(img2, t, wt('P3', 'enlarges'), 1e9, { dy: 0, sc: 0.3, sp: M.SOFT, fade: 0.15 }); M.vis(pLb[2], t, wt('P4', 'One'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip'), t, wt('P4', 'gains') - 0.3, 1e9, { dy: 24 });
    const t7 = wt('P7', 'catch'), t8 = wt('P8', 'wire'), t9 = wt('P9', 'capacitor');
    M.vis(bx1, t, t7, 1e9, { dy: 16 }); M.vis(bx2, t, t7 + 0.15, 1e9, { dy: 16 }); fadeAt(jV, t, wt('P7', 'bias') - 0.2, 0.15);
    M.vis(jWire, t, t8 - 0.1, t9 - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(jX, t, wt('P8', 'upset'), t9 - 0.3, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1, outDur: 0.25 }); M.vis(jXT, t, wt('P8', 'upset') + 0.2, t9 - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis(jCap, t, t9 - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(jOK, t, t9 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip2'), t, t9 + 0.4, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    const ta = wt('B2', 'Stage') - 0.2, tb2 = wt('B3', 'Stage') - 0.2, tc = wt('B4', 'coupling') - 0.3;
    drawSeq([cRail, cGnd], t, ta, 0.5, 0.1); drawSeq([...cIn, ...s1, ...s1b], t, ta + 0.3, 0.25, 0.07); M.vis(t1, t, ta + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(lSt[0], t, ta + 0.4, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...s2, ...s2b, ...cOut], t, tb2, 0.25, 0.07); M.vis(t2, t, tb2 + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(lSt[1], t, tb2 + 0.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(cC, t, tc, 0.3, 0.1); M.vis(lCc, t, tc + 0.4, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([...dots.slice(0, 1), ...dots.slice(4, 5)], t, ta + 0.9, 0.05); fadeAt([dots[2], dots[5], dots[3]], t, tb2 + 0.8, 0.05); M.vis(dots[1], t, tc, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([term[0], term[1], lIO[0], lIO[2]], t, ta + 0.6, 0.06); fadeAt([term[2], lIO[1]], t, tb2 + 1.0, 0.06);
    const hl = t >= wt('B8', 'resistor') - 0.1 && t < T0('B10') - 0.2; hiRC.forEach(e => M.hide(e, !hl));
    M.vis($('#dc1'), t, wt('B6', 'six') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#dc2'), t, wt('B7', 'one') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#dc3'), t, wt('B7', 'capacitor') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    e1.set(40 * (t - ta), t >= ta + 1.0); e2.set(40 * (t - ta), t >= tb2 + 0.8); M.vis($('#ckE'), t, ta + 1.0, 1e9, { dy: 0, fade: 0.2 });
    // probes + scope
    const p2 = t >= tP2; const px = p2 ? M.lerp(381, 798, M.io((t - tP2) / 0.8)) : 381;
    PUC.attr(prb2, 'cx', px.toFixed(1)); PUC.attr(prbT, 'x', px.toFixed(1));
    M.vis(prb1, t, tIn - 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(prb2, t, wt('B11', 'Probe') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(prbT, t, wt('B11', 'Probe'), 1e9, { dy: 0, fade: 0.2 });
    const st2 = t >= tP2 + 0.8;
    M.vis($('#ro1'), t, tIn - 0.2, 1e9, { dy: 12 });
    M.setT($('#rV1'), t >= wt('B11', 'Fifty') ? '50' : '-'); M.setT($('#rVo'), t >= wt('B13', 'Two') ? '2.00' : '-'); M.setT($('#rA'), t >= wt('B13', 'gain') ? '2000' : '-');
    M.vis($('#rgT'), t, wt('B11', 'Probe'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), st2 ? 'PROBE: STAGE 2' : 'PROBE: STAGE 1'); $('#rgT').style.background = st2 ? AM : INK;
    M.vis($('#slowT'), t, tIn, 1e9, { dy: 0, fade: 0.2 });
    const on2 = t >= wt('B11', 'Probe');
    tr1(u => 18 * vin(u), t, tIn, 4, 44, t >= tIn - 0.3);
    tr2(u => (u < tP2 + 0.4 ? -40 : 40) * vin(u), t, tIn, 4, 130, on2);
    M.setT(scL[1], on2 ? (st2 ? 'CH2 STAGE 2 · 2 V/div' : 'CH2 STAGE 1 · 50 mV/div') : ''); fadeAt(scL, t, tIn - 0.3, 0.1);
  }

  /* G: phase, then frequency response */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3, tg3 = T0('G3');
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gL1'), t, tG + 0.2, tg3 - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gL2'), t, tg3, 1e9, { dy: 10 });
    M.vis(phS, t, tG, tg3 - 0.3, { dy: 0, fade: 0.1, outDur: 0.25, ody: 0 }); M.vis(gS, t, tg3, 1e9, { dy: 0, fade: 0.2 });
    const ph = -4 * (t - tG);
    const pw = [[40, 200, 20, 1], [312, 472, 60, -1], [584, 744, 100, 1]];
    phW.forEach((e, i) => { const [a, b, amp, s] = pw[i]; M.vis(e, t, tG + 0.3 + i * 0.8, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(e, 'd', wav(a, b, 280, s * amp * 0.8, ph, 18)); M.vis(phL[i], t, tG + 0.4 + i * 0.8, 1e9, { dy: 0, fade: 0.2 }); });
    phA.forEach((a, i) => { const u = M.io((t - tG - 0.6 - i * 0.8) / 0.4), x0 = 214 + i * 272; a.set(x0, 230, x0 + 84 * u, 230); M.vis(phT[i], t, tG + 0.8 + i * 0.8, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis(phR, t, wt('G2', 'Two'), 1e9, { dy: 10 });
    // frequency response
    const dr = M.clamp((t - wt('G3', 'plot')) / 2.5);
    let d = ''; for (let i = 0; i <= 120; i++) { const u = 6 * dr * i / 120; d += (i ? 'L' : 'M') + gp.X(u).toFixed(1) + ',' + gp.Y(g1(10 ** (u + 1))).toFixed(1); } PUC.attr(c1, 'd', dr > 0 ? d : '');
    const dr2 = M.clamp((t - wt('G7', 'Two')) / 2.0); c2(u => [u, g1(10 ** (u + 1)) ** 2], 0, 6 * dr2, 120);
    M.vis(gC1, t, wt('G4', 'flat'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gC2, t, wt('G7', 'Two') + 1, 1e9, { dy: 0, fade: 0.2 });
    M.draw(g707, t, wt('G8', 'bandwidth') - 0.2, 0.5); M.vis(g707T, t, wt('G8', 'bandwidth'), 1e9, { dy: 0, fade: 0.2 });
    const un = M.io((t - wt('G8', 'less')) / 0.5), y7 = gp.Y(0.707) + 50;
    gN[0].set(gp.X(gX(50)) - 50, y7, gp.X(gX(50)) - 50 + (gp.X(gX(77.7)) - gp.X(gX(50)) + 50) * un, y7); gN[1].set(gp.X(gX(2e5)) + 50, y7, gp.X(gX(2e5)) + 50 - (gp.X(gX(2e5)) - gp.X(gX(128700)) + 50) * un, y7);
    M.vis(gNT, t, wt('G8', 'less') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const ts = [wt('G7', 'Each') - 0.2, wt('G9', 'cheap') - 0.3, wt('G10', 'cannot') - 0.3];
    gq.forEach((e, i) => { M.vis(e, t, i ? wt('G2', 'Two') - 0.2 : tG + 0.5, wt('G7', 'Each') - 0.45, { dy: 20, outDur: 0.25 }); const on = i ? t >= wt('G2', 'Two') - 0.2 : t < wt('G2', 'Two') - 0.2; e.style.borderColor = on ? AM : C.soft; e.style.background = on ? C.ac2 : C.soft; });
    gtE.forEach((e, i) => { M.vis(e, t, ts[i], 1e9, { dy: 20 }); const act = t >= ts[i] && (i === 2 || t < ts[i + 1]); e.style.borderColor = act ? AM : C.soft; e.style.background = act ? C.ac2 : C.soft; });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Decibels') - 0.1, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32, ph = -4 * (t - tD);
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#bk1'), t, tD + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#bk2'), t, tD + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(dWin, t, tD + 0.3, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(dWin, 'd', wav(40, 120, 198, 8, ph, 10));
    M.vis(dWm, t, tD + 0.8, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(dWm, 'd', wav(320, 400, 198, -22, ph, 10));
    M.vis(dWo, t, tD + 1.0, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(dWo, 'd', wav(600, 760, 198, 46, ph, 14));
    [[124, 146], [304, 416], [574, 596]].forEach(([a, b], i) => { const u = M.io((t - tD - 0.5 - i * 0.2) / 0.3); dAr[i].set(a, 198, a + (b - a) * u, 198); });
    fadeAt(dLb, t, tD + 0.9, 0.1);
    M.vis(dLd[0], t, tDR[1] - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(dLd[1], t, tDR[1], 1e9, { dy: 0, fade: 0.2 });
    M.vis(dN, t, tDR[2], 1e9, { dy: 10 }); fadeAt(dDb, t, tDR[4] - 0.2, 0.2); fadeAt(dPh, t, tDR[5] - 0.1, 0.25);
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[0] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32, ph = -4 * (t - tW);
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'fifty'), wt('W2', 'forty'), wt('W3', 'one')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    M.vis($('#wk1'), t, tg[0], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#wk2'), t, tg[1], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(wWi, t, tg[2], 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wWi, 'd', wav(50, 150, 268, 6, ph, 10)); M.vis(wT[0], t, tg[2] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    [[160, 196], [354, 436], [594, 616]].forEach(([a, b], i) => { const u = M.io((t - tg[2] - 0.2 - i * 0.3) / 0.3); wAr[i].set(a, 268, a + (b - a) * u, 268); });
    M.vis(wWo, t, tWR[1], 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wWo, 'd', wav(624, 744, 268, 46, ph, 12)); M.vis(wT[3], t, tWR[1] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wTot[0], t, tWR[0] + 0.4, 1e9, { dy: 10 }); M.vis(wT[1], t, tWR[2] + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(wT[2], t, tWR[3] + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(wTot[1], t, tWR[4] + 0.3, 1e9, { dy: 10 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'multiply') - 0.2 });
    const tr = [wt('X3', 'Fifty'), wt('X4', 'decibels'), wt('X4', 'two')];
    tcR.forEach((r, i) => fadeAt(r, t, tr[i] - 0.1, 0.15));
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
