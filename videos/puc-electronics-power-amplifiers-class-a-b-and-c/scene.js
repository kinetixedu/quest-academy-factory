// PUC Electronics Ep 69 - Power amplifiers: class A, B and C ("Breadboard" style, Lab Notebook world)
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'college') - 0.2;
const tP = T0('P1'), tB = T0('B1'), tG = T0('G1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const h1A = mk(h1S, 'g', { transform: 'translate(0,24)' });
const ampBox = W(h1A, 'M60,100 H300 V220 H60 Z', { 'stroke-width': 4, fill: '#fff' });
const fins = W(h1A, 'M90,100 V70 M120,100 V70 M150,100 V70 M180,100 V70 M210,100 V70 M240,100 V70 M270,100 V70', { 'stroke-width': 5 });
const knobs = [110, 160, 210].map(x => mk(h1A, 'circle', { cx: x, cy: 170, r: 14, fill: C.soft, stroke: INK, 'stroke-width': 3 }));
const heat = W(h1A, 'M100,58 q8,-10 0,-20 M150,58 q8,-10 0,-20 M200,58 q8,-10 0,-20 M250,58 q8,-10 0,-20', { stroke: RED, 'stroke-width': 3 });
const h1W = mk(h1S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const h1T2 = mono(h1S, 740, 252, 'big speakers · lots of power', { 'text-anchor': 'end', fill: GOLD, 'font-weight': 600 });
const phone = W(h2S, 'M90,80 H170 a10,10 0 0 1 10,10 V210 a10,10 0 0 1 -10,10 H90 a10,10 0 0 1 -10,-10 V90 a10,10 0 0 1 10,-10 Z', { 'stroke-width': 4, fill: '#fff' });
const h2W = mk(h2S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const h2T2 = mono(h2S, 740, 252, 'tiny speaker · little power', { 'text-anchor': 'end', fill: MU, 'font-weight': 600 });

/* ================= P: two kinds + swing ================= */
const swS = $('#swS');
const pvt = mk(swS, 'circle', { cx: 392, cy: 80, r: 8, fill: INK }), beam = W(swS, 'M262,80 H522', { 'stroke-width': 6 });
const rope = W(swS, 'M392,80 L392,380', { 'stroke-width': 3 });
const seatG = mk(swS, 'g'), seat = mk(seatG, 'rect', { x: -30, y: -6, width: 60, height: 12, rx: 6, fill: INK }), kid = mk(swS, 'circle', { r: 18, fill: AM, stroke: INK, 'stroke-width': 3 });
const push = PUC.arrow(swS, GOLD, 6, 18);
const helpers = [[150, 'helper 1'], [634, 'helper 2']].map(([x, s]) => { const g = mk(swS, 'g'); mk(g, 'circle', { cx: x, cy: 420, r: 22, fill: C.soft, stroke: INK, 'stroke-width': 3 }); mono(g, x, 470, s, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }); return g; });
const hDot = helpers.map(g => g.querySelector('circle'));
const tS0 = wt('P3', 'pushing'), tmA = wt('P4', 'One'), tmB = wt('P5', 'Two'), tmC = wt('P6', 'one'), wS_ = 2 * Math.PI / 2.4;
const ang = t => 0.42 * Math.sin(wS_ * (t - tS0)) * M.o3((t - tS0) / 0.6), angV = t => Math.cos(wS_ * (t - tS0));

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cRail = W(ck, 'M541,110 H870 V280'), cLow = W(ck, 'M870,300 V500 H180');
const bat = [W(ck, 'M842,280 H898', { 'stroke-width': 5 }), W(ck, 'M856,300 H884', { 'stroke-width': 9 })];
const cTop = W(ck, 'M541,110 V140'), cBot = W(ck, 'M541,240 V285'), cE = W(ck, 'M541,375 V500');
const spkG = mk(ck, 'g'); W(spkG, 'M541,140 V165 M541,215 V240'); mk(spkG, 'rect', { x: 528, y: 165, width: 26, height: 50, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(spkG, 'M554,170 L584,148 V232 L554,210', { fill: '#fff' });
const spkT = mono(ck, 600, 196, 'speaker', { fill: INK, 'font-weight': 600 });
const tankG = mk(ck, 'g'); W(tankG, 'M541,140 V150 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 V240'); W(tankG, 'M541,140 H620 V180 M620,194 V240 H541'); W(tankG, 'M598,180 H642 M598,194 H642', { 'stroke-width': 5 });
const tankT = [tx(ck, 512, 196, 'L', { 'font-style': 'italic', 'text-anchor': 'end' }), tx(ck, 654, 194, 'C', { 'font-style': 'italic' })];
const tankW = mk(ck, 'path', { fill: 'none', stroke: TE, 'stroke-width': 4, 'stroke-linecap': 'round' }), tankWT = mono(ck, 760, 236, 'smooth wave', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 });
const tr = mk(ck, 'g'); const trP = npn(tr, 520, 330, 50, 0.9);
const cBase = W(ck, 'M400,330 H499'), cRb = zigV(ck, 400, 150, 330), bT = mk(ck, 'circle', { cx: 400, cy: 142, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const bLb = mono(ck, 416, 148, 'V bias', { fill: TE, 'font-weight': 600 });
const cIn = [W(ck, 'M180,330 H272'), W(ck, 'M272,306 V354', { 'stroke-width': 5 }), W(ck, 'M288,306 V354', { 'stroke-width': 5 }), W(ck, 'M288,330 H400')];
const term = [mk(ck, 'circle', { cx: 180, cy: 330, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 180, cy: 500, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 400, cy: 330, r: 7, fill: INK })];
const cLb = [tx(ck, 180, 382, 'v in', { 'text-anchor': 'middle', fill: TE }), tx(ck, 830, 296, '12 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 906, 272, '+', { 'font-size': 26 })];
const tIn = wt('B3', 'Watch') - 0.3, tcB = wt('B7', 'Class'), tcC = wt('B10', 'Class'), tTank = wt('B12', 'tuned');
const cls = t => t < tcB ? 0 : t < tcC ? 1 : 2;
const th = t => Math.PI * (t - tIn);
const iC = (t, k = cls(t)) => { if (t < tIn) return k === 0 ? 1 : 0; const s = Math.sin(th(t)); return k === 0 ? 1 + s : k === 1 ? 2 * Math.max(0, s) : (s > 0.5 ? 4 * (s - 0.5) : 0); };
const offC = t => { let s = 0; const dt = 0.04; for (let x = wt('B2', 'One'); x < t; x += dt) s += 45 * iC(x) * Math.min(dt, t - x); return s; };
const eC = flow(ck, [[870, 300], [870, 500], [541, 500], [541, 110], [870, 110], [870, 280]], 24, {
  skip: (x, y) => Math.hypot(x - 520, y - 330) < 54 || (Math.abs(x - 541) < 2 && y > 138 && y < 242) || (Math.abs(x - 870) < 2 && y > 270 && y < 310) });
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(VI);
const sc0 = mk($('#scS'), 'line', { x1: 6, y1: 176, x2: 586, y2: 176, stroke: '#5F7399', 'stroke-width': 1.5, 'stroke-dasharray': '6 6' });
const scL = [mono($('#scS'), 4, 212, 'CH1 IN · v in', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 · collector current i C', { fill: '#9B7FE8', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
const RO = [['360°', '25%', 'flows'], ['180°', '78.5%', 'none'], ['< 180°', 'highest', 'none']];
$('#ro1').innerHTML = `<span class="k n">CONDUCTS</span><span class="v" id="r0">360°</span><span class="k n">MAX EFFICIENCY</span><span class="v" id="r1" style="color:${GOLD}">25%</span><span class="k n">IDLE CURRENT</span><span class="v" id="r2">flows</span>`;
const kName = ['MIDDLE', 'CUT-OFF', 'BELOW CUT-OFF'], kPos = [55, 20, 0];

/* ================= G: load line + table ================= */
const gS = $('#gS');
const gp = PUC.graph(gS, { x: 100, y: 96, w: 360, h: 300, xmax: 10, ymax: 2.4, xt: [], yt: [], xl: 'V CE', yl: 'I C' });
gp.xlab.setAttribute('fill', TE); gp.ylab.setAttribute('fill', VI); gp.xlab.setAttribute('x', gp.X(5)); gp.xlab.setAttribute('text-anchor', 'middle'); gp.xlab.setAttribute('y', 436);
const gLL = gp.curve(INK, 4);
const gExt = gp.mk('line', { x1: gp.X(10), y1: gp.Y(0), x2: gp.X(10) + 30, y2: gp.Y(0) + 36, stroke: MU, 'stroke-width': 3, 'stroke-dasharray': '5 5' });
const QP = [[gp.X(5), gp.Y(1)], [gp.X(10), gp.Y(0)], [gp.X(10) + 30, gp.Y(0) + 36]];
const qD = QP.map(([x, y], i) => mk(gS, 'circle', { cx: x, cy: y, r: 11, fill: AM, stroke: INK, 'stroke-width': 2 }));
const qT = [mono(gS, QP[0][0] + 18, QP[0][1] - 14, 'A', { fill: INK, 'font-weight': 700, 'font-size': 24 }), mono(gS, QP[1][0] - 30, QP[1][1] - 18, 'B', { fill: INK, 'font-weight': 700, 'font-size': 24 }), mono(gS, QP[2][0] - 34, QP[2][1] + 12, 'C', { fill: INK, 'font-weight': 700, 'font-size': 24 })];
const gW = [0, 1, 2].map(k => mk(gS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
const gWL = ['A · full wave', 'B · half wave', 'C · tips only'].map((s, i) => mono(gS, 512, 108 + i * 132, s, { fill: INK, 'font-weight': 600 }));
const gBase = [0, 1, 2].map(i => gp.mk('line', { x1: 512, y1: 196 + i * 132, x2: 752, y2: 196 + i * 132, stroke: C.line, 'stroke-width': 2 }));
const gWf = (k, x0, x1, yb, ph) => { let d = ''; for (let x = x0; x <= x1; x += 3) { const s = Math.sin((x - x0) / 16 + ph); const v = k === 0 ? 1 + s : k === 1 ? 2 * Math.max(0, s) : (s > 0.5 ? 4 * (s - 0.5) : 0); d += (x === x0 ? 'M' : 'L') + x + ',' + (yb - 30 * v).toFixed(1); } return d; };
const TB = [['A', 'middle', '360°', '25%', 'lowest'], ['B', 'cut-off', '180°', '78.5%', 'half lost'], ['C', 'below cut-off', '< 180°', 'highest', 'highest'], ['AB', 'near cut-off', '180°-360°', 'between', 'low']];
$('#ctab').innerHTML = ['CLASS', 'Q POINT', 'CONDUCTS', 'MAX η', 'DISTORTION'].map(h => `<span class="h">${h}</span>`).join('') +
  TB.map(r => r.map((v, j) => `<span class="${j === 0 ? 'c' : j >= 2 && j <= 3 ? 'm' : ''}"${j === 1 && v.length > 9 ? ' style="font-size:22px"' : ''}>${v}</span>`).join('')).join('');
const cells = [...$('#ctab').children], head5 = cells.slice(0, 5), rowsT = [0, 1, 2, 3].map(i => cells.slice(5 + i * 5, 10 + i * 5));

/* ================= D: derivation ================= */
const dS = $('#dS');
const dg = PUC.graph(dS, { x: 110, y: 84, w: 420, h: 230, xmax: 1, ymax: 2.3, xt: [], yt: [], xl: 'V CE', yl: 'I C' });
dg.xlab.setAttribute('fill', TE); dg.ylab.setAttribute('fill', VI); dg.xlab.setAttribute('y', 372);
const dLL = dg.curve(INK, 4);
const dTk = [[0.5, 'V CC/2'], [1, 'V CC']].map(([v, s]) => mono(dS, dg.X(v), 344, s, { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 18 }));
const dTy = [[1, 'I CQ'], [2, '2 I CQ']].map(([v, s]) => mono(dS, 100, dg.Y(v) + 6, s, { 'text-anchor': 'end', fill: VI, 'font-weight': 600, 'font-size': 18 }));
const dQ = dg.dot(AM, 11);
const dH = [PUC.arrow(dS, TE, 4, 12), PUC.arrow(dS, TE, 4, 12)], dV = [PUC.arrow(dS, VI, 4, 12), PUC.arrow(dS, VI, 4, 12)];
const dHT = mono(dS, dg.X(0.5) + 12, dg.Y(1) - 12, 'swing ± V CC/2', { fill: TE, 'font-weight': 600, 'font-size': 18 }), dVT = mono(dS, dg.X(0.5) + 14, dg.Y(2.05), 'swing ± I CQ', { fill: VI, 'font-weight': 600, 'font-size': 18 });
$('#eBars').innerHTML = [['CLASS A', 25, '25%'], ['A + TRANSFORMER', 50, '50%'], ['CLASS B', 78.5, '78.5%'], ['CLASS C', 92, 'highest']].map(([k, w, v], i) => `<div class="ebar" style="top:${384 + i * 50}px"><div class="k">${k}</div><div class="tr2"><i style="width:0"></i></div><div class="v">${v}</div></div>`).join('');
const eRows = [...$('#eBars').children], eW = [25, 50, 78.5, 92];
const ETA = c(GOLD, '\\eta');
const dRows = rows($('#dSteps'), [
  [K(`${ETA} = \\dfrac{P_{ac}}{P_{dc}} \\times 100\\%`), 'efficiency', 84],
  [K(`P_{dc} = ${VCC}\\,${c(VI, 'I_{CQ}')}`), 'from the supply', 184],
  [K(`${c(TE, 'V_{CEQ}')} = ${VCC}/2`), 'Q in the middle', 262],
  [K(`${c(TE, 'V_p')} = ${VCC}/2,\\ \\ ${c(VI, 'I_p')} = ${c(VI, 'I_{CQ}')}`), 'biggest swing', 340],
  [K(`P_{ac} = \\dfrac{${c(TE, 'V_p')}\\,${c(VI, 'I_p')}}{2} = \\dfrac{${VCC}\\,${c(VI, 'I_{CQ}')}}{4}`), '', 428],
  [K(`${ETA}_{\\max} = \\dfrac{1}{4} = 25\\%`), 'class A', 520]]);
const tDR = [wt('D2', 'equals'), wt('D3', 'V'), wt('D4', 'middle'), wt('D5', 'peak'), wt('D6', 'power'), wt('D8', 'quarter')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VCC} = 12\\,\\text{V}`), K(`${c(VI, 'I')} = 2\\,\\text{A}`), K('P_{out} = 6\\,\\text{W}')].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS');
const wBar = [['FROM THE SUPPLY', 24, INK, '24 W', 200], ['TO THE SPEAKER', 6, AM, '6 W', 320], ['LOST AS HEAT', 18, RED, '18 W', 440]].map(([k, v, col, s, y]) => { const l = mono(wS, 36, y, k, { fill: MU, 'font-weight': 600 }); mk(wS, 'rect', { x: 36, y: y + 16, width: 600, height: 36, rx: 12, fill: C.soft }); const b = mk(wS, 'rect', { x: 36, y: y + 16, width: 0, height: 36, rx: 12, fill: col }); const tt = mono(wS, 652, y + 44, s, { fill: col, 'font-weight': 600, 'font-size': 26 }); return [l, b, tt, v]; });
const wFin = W(wS, 'M560,452 V430 M580,452 V430 M600,452 V430 M620,452 V430', { stroke: RED, 'stroke-width': 4 });
$('#wBox').style.top = '172px';
const wRows = rows($('#wSteps'), [
  [K('P_{dc} = 12 \\times 2 = 24\\,\\text{W}'), 'supply power', 92],
  [K(`${ETA} = \\dfrac{6}{24} \\times 100\\% = 25\\%`), 'class A level', 196],
  [K('P_{heat} = 24 - 6 = 18\\,\\text{W}'), 'wasted', 316],
  [K('\\Rightarrow \\text{metal fins (heat sinks)}'), '', 410]]);
const tWR = [wt('W4', 'D'), wt('W5', 'Efficiency'), wt('W6', 'other'), wt('W6', 'metal') - 0.2];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Class C is best for music: most efficient', right: 'Class C: pulses, tuned circuit, radio only', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xIn = mk(tcS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4 }), xPu = mk(tcS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4, 'stroke-linejoin': 'round' }), xOut = mk(tcS, 'path', { fill: 'none', stroke: TE, 'stroke-width': 4 });
const xA = [PUC.arrow(tcS, INK, 3, 12), PUC.arrow(tcS, INK, 3, 12)];
const xL = [mono(tcS, 110, 250, 'input', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 }), mono(tcS, 392, 250, 'current: pulses', { 'text-anchor': 'middle', fill: '#9B7FE8', 'font-weight': 600 }), mono(tcS, 664, 250, 'tank: one tone', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Classify power amplifiers, compare efficiency and distortion, find the efficiency' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'Collector current flows for the full 360° of the input cycle. The amplifier draws 0.5&nbsp;A from a 20&nbsp;V supply and gives 2&nbsp;W to the load. Which class, and what efficiency?', qW: 780,
  opts: ['Class B, 20%', 'Class A, 20%', 'Class A, 25%', 'Class C, 10%'], right: 1, optW: 474, optY: 350 });
const sol = PUC.solution($('#so'), [[K('360^\\circ \\Rightarrow \\text{class A}')], [K('P_{dc} = 20 \\times 0.5 = 10\\,\\text{W}')], [K(`${ETA} = \\dfrac{2}{10} \\times 100\\% = 20\\%`)], [K('20\\% < 25\\%\\ \\text{limit}\\ \\checkmark')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Current'), wt('A3', 'D'), wt('A4', 'Efficiency'), wt('A4', 'below')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'Power amplifiers · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K(`${ETA} = P_{ac} / P_{dc} \\times 100\\%`), K('\\text{A: } 360^\\circ,\\ \\eta_{\\max} = 25\\%\\ (50\\%\\ \\text{with transformer})'), K('\\text{B: } 180^\\circ,\\ \\eta_{\\max} = 78.5\\%'), K('\\text{C: } < 180^\\circ,\\ \\text{highest } \\eta,\\ \\text{tuned circuit}'),
    'Less time conducting → less heat → more distortion'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 70', topic: 'Push-pull amplifier', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B11', 'pulses'), 1.1, 1100, 480], [T1('B11') + 0.4, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tW + 0.2, tX - 0.32]];

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
    const ta = wt('H1', 'touches') - 0.3, tb = wt('H3', 'phone') - 0.3, ph = -5 * (t - ta);
    M.vis($('#h1C'), t, ta, out, { dx: 60, dy: 0, ...o }); M.vis($('#h1T'), t, wt('H2', 'hot') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(ampBox, t, ta + 0.2, 0.5); fadeAt(knobs, t, ta + 0.5, 0.08); M.draw(fins, t, wt('H2', 'metal') - 0.2, 0.5); M.vis(heat, t, wt('H2', 'hot'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(h1W, t, ta + 0.6, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(h1W, 'd', wav(340, 740, 150, 56, ph, 22)); M.vis(h1T2, t, ta + 0.9, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h2C'), t, tb, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2T'), t, wt('H3', 'cool') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(phone, t, tb + 0.2, 0.5); M.vis(h2W, t, tb + 0.5, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(h2W, 'd', wav(340, 740, 150, 16, ph, 22)); M.vis(h2T2, t, tb + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#aPill'), t, wt('H4', 'heat') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: two kinds + swing */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P3', 'swing') - 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pt0'), t, tP + 0.3, 1e9, { dy: 20 }); M.vis($('#pt1'), t, wt('P2', 'power') - 0.2, 1e9, { dy: 20 });
    const act = t >= wt('P2', 'power') - 0.2 ? 1 : 0; ['#pt0', '#pt1'].forEach((s, i) => { const e = $(s); e.style.borderColor = act === i ? AM : C.soft; e.style.background = act === i ? C.ac2 : C.soft; });
    const tc8 = wt('P8', 'three'); ['#cc0', '#cc1', '#cc2'].forEach((s, i) => M.vis($(s), t, [tmA, tmB, tmC][i] + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    ['#cc0', '#cc1', '#cc2'].forEach((s, i) => { const e = $(s), on = t >= tc8; e.style.borderColor = on ? AM : C.line; });
    // swing
    M.draw(beam, t, wt('P3', 'swing') - 0.2, 0.4); M.vis(pvt, t, wt('P3', 'swing'), 1e9, { dy: 0, fade: 0.2 });
    const a = ang(t), sx = 392 + 300 * Math.sin(a), sy = 80 + 300 * Math.cos(a);
    PUC.attr(rope, 'd', `M392,80 L${sx.toFixed(1)},${sy.toFixed(1)}`); M.vis(rope, t, wt('P3', 'swing'), 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(seatG, 'transform', `translate(${sx.toFixed(1)},${sy.toFixed(1)}) rotate(${(-a * 57.3).toFixed(1)})`); PUC.attr(kid, 'cx', sx.toFixed(1)); PUC.attr(kid, 'cy', (sy - 26).toFixed(1));
    M.vis(seat, t, wt('P3', 'child'), 1e9, { dy: 0, fade: 0.2 }); M.vis(kid, t, wt('P3', 'child'), 1e9, { dy: 0, fade: 0.2 });
    const v = angV(t), mode = t < tmA - 0.2 ? -1 : t < tmB - 0.2 ? 0 : t < tmC - 0.2 ? 1 : 2;
    let pl = 0, side = 0;
    if (mode === 0) pl = 60 * Math.sign(v); else if (mode === 1) { pl = 60 * Math.sign(v); side = v > 0 ? 0 : 1; } else if (mode === 2) { const s = Math.sin(wS_ * (t - tS0)); pl = s < -0.93 && v > 0 ? 70 : 0; }
    if (mode >= 0 && pl !== 0) push.set(sx - Math.sign(pl) * 60, sy + 4, sx - Math.sign(pl) * 60 + pl, sy + 4); else push.set(0, 0, 0, 0);
    helpers.forEach((g, i) => { M.vis(g, t, tmB - 0.2, tmC - 0.3, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); hDot[i].setAttribute('fill', mode === 1 && side === i ? AM : C.soft); });
    M.vis($('#pTag'), t, tmA - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#pTag'), ['ALWAYS PUSHING', 'ALWAYS PUSHING', 'TWO HELPERS · HALF EACH', 'ONE SHORT KICK'][mode + 1]);
    M.vis($('#effL'), t, tmA, 1e9, { dy: 10 }); M.vis($('#eff'), t, tmA, 1e9, { dy: 0, fade: 0.2 });
    const ef = mode <= 0 ? 1 : mode === 1 ? 0.5 : 0.15; $('#eff i').style.width = (580 * ef).toFixed(1) + 'px';
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32, k = cls(t);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    const tb = wt('B2', 'One') - 0.2;
    drawSeq([cRail, ...bat, cLow, cTop, cBot, cE], t, tb, 0.35, 0.08); M.vis(tr, t, tb + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(spkG, t, wt('B2', 'speaker') - 0.1, tTank, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(spkT, t, wt('B2', 'speaker'), tTank, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis(tankG, t, tTank + 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt(tankT, t, tTank + 0.3, 0.1);
    drawSeq(cIn, t, wt('B2', 'bias') - 0.3, 0.25, 0.06); M.draw(cRb, t, wt('B2', 'bias'), 0.4); M.draw(cBase, t, wt('B2', 'bias') + 0.2, 0.3); fadeAt([bT, bLb, ...term], t, wt('B2', 'bias') + 0.3, 0.06); fadeAt(cLb, t, tb + 0.5, 0.1);
    M.vis($('#ft'), t, wt('B2', 'knob') - 0.2, 1e9, { dy: 10 });
    const kp = t < tcB ? kPos[0] : t < tcC ? M.lerp(kPos[0], kPos[1], M.io((t - tcB) / 0.6)) : M.lerp(kPos[1], kPos[2], M.io((t - tcC) / 0.6));
    $('#ftK').style.left = (110 * kp / 100).toFixed(1) + 'px'; M.setT($('#ftV'), kName[k]); $('#ftV').style.fontSize = k === 2 ? '20px' : '26px';
    eC.set(offC(t), t >= tb + 0.6); M.vis($('#ckE'), t, tb + 0.6, 1e9, { dy: 0, fade: 0.2 });
    // tank output
    M.vis(tankW, t, wt('B13', 'smooth') - 0.2, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(tankW, 'd', wav(650, 740, 330, 14, -Math.PI * (t - tIn), 12)); M.vis(tankWT, t, wt('B13', 'smooth'), 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(tankWT, 'y', 374); PUC.attr(tankWT, 'x', 740);
    // readout + scope
    M.vis($('#ro1'), t, wt('B4', 'Class') - 0.2, 1e9, { dy: 12 });
    M.setT($('#r0'), RO[k][0]); M.setT($('#r1'), RO[k][1]); M.setT($('#r2'), RO[k][2]);
    M.vis($('#rgT'), t, wt('B4', 'Class'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), 'CLASS ' + 'ABC'[k]);
    M.vis($('#slowT'), t, tIn, 1e9, { dy: 0, fade: 0.2 }); M.vis(sc0, t, tIn, 1e9, { dy: 0, fade: 0.2 });
    tr1(u => 18 * Math.sin(th(u)), t, tIn, 4, 44, t >= tIn); tr2(u => 46 * iC(u), t, tIn, 4, 176, t >= tIn);
    fadeAt(scL, t, tIn, 0.1);
  }

  /* G: load line + table */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3, ph = -4 * (t - tG);
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    gLL(u => [u, 2 - 0.2 * u], 0, 10 * M.io((t - tG - 0.4) / 0.8), 20); M.draw(gExt, t, wt('G5', 'below') - 0.3, 0.3);
    const tq = [wt('G3', 'middle'), wt('G4', 'cut'), wt('G5', 'below')];
    qD.forEach((e, i) => M.vis(e, t, tq[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 })); qT.forEach((e, i) => M.vis(e, t, tq[i], 1e9, { dy: 0, fade: 0.2 }));
    gW.forEach((e, i) => { M.vis(e, t, tq[i] + 0.2, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(e, 'd', gWf(i, 512, 752, 196 + i * 132, ph)); M.vis(gWL[i], t, tq[i] + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(gBase[i], t, tq[i] + 0.2, 1e9, { dy: 0, fade: 0.2 }); });
    head5.forEach((e, i) => M.vis(e, t, tG + 0.5 + i * 0.05, 1e9, { dy: 0, fade: 0.2 }));
    const tr4 = [...tq, wt('G8', 'class')];
    rowsT.forEach((r, i) => { r.forEach(e => M.vis(e, t, tr4[i] - 0.1, 1e9, { dy: 0, fade: 0.2 })); const on = t >= tr4[i] - 0.1 && (i === 3 ? true : t < (tr4[i + 1] ?? 1e9) - 0.1) && t < wt('G6', 'less') - 0.2; r.forEach(e => e.style.background = on ? C.ac2 : 'transparent'); });
    const e6 = t >= wt('G6', 'less') - 0.2, e7 = t >= wt('G7', 'distortion') - 0.2;
    rowsT.forEach(r => { r[3].style.color = e6 ? GOLD : INK; r[4].style.color = e7 ? RED : INK; r[3].style.background = e6 && !e7 ? C.ac3 : 'transparent'; r[4].style.background = e7 ? C.redBg : 'transparent'; });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'More') - 0.1, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    dLL(u => [u, 2 - 2 * u], 0, M.io((t - tD - 0.4) / 0.8), 20); fadeAt([...dTk, ...dTy], t, tD + 0.8, 0.1);
    dQ(0.5, 1, t >= tDR[2] - 0.1);
    const uh = M.io((t - tDR[3]) / 0.5); dH[0].set(dg.X(0.5), dg.Y(1), dg.X(0.5) + (dg.X(1) - dg.X(0.5)) * uh, dg.Y(1)); dH[1].set(dg.X(0.5), dg.Y(1), dg.X(0.5) - (dg.X(0.5) - dg.X(0)) * uh, dg.Y(1));
    dV[0].set(dg.X(0.5), dg.Y(1), dg.X(0.5), dg.Y(1) - (dg.Y(1) - dg.Y(2)) * uh); dV[1].set(dg.X(0.5), dg.Y(1), dg.X(0.5), dg.Y(1) + (dg.Y(0) - dg.Y(1)) * uh);
    M.vis(dHT, t, tDR[3] + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(dVT, t, tDR[3] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const te = [tDR[5], wt('D9', 'transformer'), wt('D9b', 'Class'), wt('D10', 'Class')];
    eRows.forEach((r, i) => { M.vis(r, t, te[i] - 0.1, 1e9, { dx: -16, dy: 0 }); r.querySelector('i').style.width = (380 * eW[i] / 100 * M.io((t - te[i]) / 0.6)).toFixed(1) + 'px'; });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[5] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'twelve'), wt('W2', 'two'), wt('W3', 'six')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    const tb = [tWR[0], tWR[1], tWR[2]];
    wBar.forEach(([l, b, tt, v], i) => { M.vis(l, t, tb[i] - 0.2, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(b, 'width', (600 * v / 24 * M.io((t - tb[i]) / 0.7)).toFixed(1)); M.vis(tt, t, tb[i] + 0.5, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis(wFin, t, wt('W6', 'metal'), 1e9, { dy: 0, fade: 0.2 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[1] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not') - 0.05, tRight: wt('X4', 'tuned') - 0.3 });
    const ph = -4 * (t - tX);
    M.vis(xIn, t, tX + 0.5, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(xIn, 'd', wav(40, 180, 160, 30, ph, 14));
    M.vis(xPu, t, wt('X3', 'pulses') - 0.2, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(xPu, 'd', gWf(2, 322, 462, 200, ph * 1 + 0.3).replace(/,([\d.]+)/g, (m, y) => ',' + (200 - (200 - +y) * 0.8).toFixed(1)));
    M.vis(xOut, t, wt('X4', 'tuned'), 1e9, { dy: 0, fade: 0.2 }); PUC.attr(xOut, 'd', wav(594, 734, 160, 30, ph, 14));
    xA.forEach((a, i) => { const u = M.io((t - (i ? wt('X4', 'tuned') : wt('X3', 'pulses') - 0.3)) / 0.4), x0 = 196 + i * 272; a.set(x0, 160, x0 + 100 * u, 160); });
    M.vis(xL[0], t, tX + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(xL[1], t, wt('X3', 'pulses'), 1e9, { dy: 0, fade: 0.2 }); M.vis(xL[2], t, wt('X4', 'one'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Classify') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.4, tCount, tAns });
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
