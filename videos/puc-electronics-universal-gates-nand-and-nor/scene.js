// PUC Electronics Ep 53 - Universal gates: NAND and NOR ("Breadboard" style, Lab Notebook world)
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
const GD = '#B7791F', SOFT = C.soft;
const vc = v => v ? AM : INK; // wire colour by logic value: 1 amber, 0 ink
/* logic gate symbols (distinctive shapes). Returns {g, body, ins:[paths], out:path, ox} */
const gate = (p, type, x, y, s = 90, o = {}) => {
  const g = mk(p, 'g'), h = s * 0.8, ins = [], li = o.lead ?? 50, lo = o.leadOut ?? 50;
  let d, ox, inX = x;
  if (type === 'AND') { d = `M${x},${y - h / 2} H${x + s - h / 2} A${h / 2},${h / 2} 0 0 1 ${x + s - h / 2},${y + h / 2} H${x} Z`; ox = x + s; }
  else if (type === 'OR') { d = `M${x},${y - h / 2} Q${x + s * 0.7},${y - h / 2} ${x + s * 1.1},${y} Q${x + s * 0.7},${y + h / 2} ${x},${y + h / 2} Q${x + s * 0.28},${y} ${x},${y - h / 2} Z`; ox = x + s * 1.1; inX = x + s * 0.2; }
  else { d = `M${x},${y - h / 2} L${x + s * 0.75},${y} L${x},${y + h / 2} Z`; ox = x + s * 0.75 + 16; }
  const ys = type === 'NOT' ? [y] : [y - h / 4, y + h / 4];
  ys.forEach(yy => ins.push(W(g, `M${x - li},${yy} H${type === 'OR' ? x + s * 0.12 : x}`)));
  const body = mk(g, 'path', { d, fill: '#fff', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  let bub = null; const br = type === 'NOT' ? 8 : Math.max(8, s * 0.07); if (type === 'NOT' || o.bubble) { bub = mk(g, 'circle', { cx: ox - br, cy: y, r: br, fill: '#fff', stroke: INK, 'stroke-width': 4 }); }
  const out = W(g, `M${ox},${y} H${ox + lo}`);
  return { g, body, ins, out, ox, ys, bub, br, x0: x - li, x1: ox + lo };
};
/* two-terminal switch: horizontal (or vertical) between a and b; set(closed) */
const sw = (p, x1, y1, x2, y2) => {
  const g = mk(p, 'g'); mk(g, 'circle', { cx: x1, cy: y1, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: x2, cy: y2, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3.5 });
  const lev = W(g, '', { 'stroke-width': 5 }); const vert = x1 === x2;
  return { g, set(c) { PUC.attr(lev, 'd', c ? `M${x1},${y1} L${x2},${y2}` : vert ? `M${x1},${y1} L${x1 - 44},${y2 - 14}` : `M${x1},${y1} L${x2 - 10},${y2 - 40}`); } };
};
/* truth table rows */
const ttable = (host, cols, rows, top = 84, rh = 60, gap = 12) => {
  const L = cols.length === 3 ? [40, 216, 416] : [80, 380];
  host.innerHTML = `<div class="tth" style="top:${top}px">${cols.map((c, i) => `<span style="left:${L[i]}px">${c}</span>`).join('')}</div>` +
    rows.map((r, k) => `<div class="ttr" style="top:${top + 52 + k * (rh + gap)}px">${r.map((v, i) => `<span style="left:${L[i]}px${i === r.length - 1 ? ';color:' + (v ? AM : INK) : ''}">${v}</span>`).join('')}</div>`).join('');
  return { head: host.querySelector('.tth'), rows: [...host.querySelectorAll('.ttr')] };
};

/* NAND / NOR symbol = AND / OR shape with a bubble */
const ngate = (p, type, x, y, s, o = {}) => gate(p, type === 'NAND' ? 'AND' : 'OR', x, y, s, { ...o, bubble: true });
const fixOut = G => { const d2 = 2 * G.br, ox = G.ox + d2; PUC.attr(G.bub, 'cx', ox - G.br); PUC.attr(G.out, 'd', `M${ox},${G.ys.length > 1 ? (G.ys[0] + G.ys[1]) / 2 : G.ys[0]} H${G.x1 + d2}`); G.x1 += d2; return G; };
/* tie both inputs of a 2-input gate to one input line starting at xs */
const tie = (p, G, xs) => { const xj = G.x0, ym = (G.ys[0] + G.ys[1]) / 2; return [W(p, `M${xj},${G.ys[0]} V${G.ys[1]}`), W(p, `M${xs},${ym} H${xj}`), mk(p, 'circle', { cx: xj, cy: ym, r: 6, fill: INK })]; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'opens') - 0.2;
const tR = T0('R1'), tB = T0('B1'), tR5 = T0('R5'), tU = T0('U1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
$('#chips').innerHTML = [...Array(8)].map((_, i) => `<div class="chipI" style="left:${36 + (i % 4) * 174}px;top:${76 + Math.floor(i / 4) * 100}px">NAND</div>`).join('');
const chipsE = [...$('#chips').children];
['#n1', '#n2', '#n3'].forEach(s => $(s).insertAdjacentHTML('beforeend', '<span style="color:var(--ac)">?</span>'));

/* ================= R: NAND = NOT AND ================= */
const rS = $('#rS');
const rA = gate(rS, 'AND', 170, 250, 110, { lead: 80, leadOut: 70 }), rN = gate(rS, 'NOT', rA.x1 + 70, 250, 90, { lead: 70, leadOut: 70 });
const rL = [mono(rS, 225, 196, 'AND', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(rS, rN.x0 + 100, 196, 'NOT', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }),
  tx(rS, 78, 236, 'A', { 'text-anchor': 'end', 'font-style': 'italic' }), tx(rS, 78, 280, 'B', { 'text-anchor': 'end', 'font-style': 'italic' }), tx(rS, rN.x1 + 12, 258, 'Y', { 'font-style': 'italic' })];
const rBox = mk(rS, 'rect', { x: 36, y: 150, width: rN.x1 - 16, height: 200, rx: 16, fill: 'none', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const rBoxL = mono(rS, 92, 386, 'TOGETHER: A NAND GATE', { fill: GD, 'font-weight': 600 });
const rEx = mk(rS, 'foreignObject', { x: 36, y: 440, width: 712, height: 90 }); rEx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:46px;text-align:center">${K('Y = \\overline{A \\cdot B}')}</div>`;
const r2S = $('#r2S');
const rG = fixOut(ngate(r2S, 'NAND', 240, 240, 180, { lead: 120, leadOut: 110 }));
const rGL = [tx(r2S, 108, 212, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 30 }), tx(r2S, 108, 284, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 30 }), tx(r2S, rG.x1 + 14, 250, 'Y', { 'font-style': 'italic', 'font-size': 30 })];
const rPt = PUC.arrow(r2S, AM, 4, 14), rPtL = mono(r2S, 330, 400, 'bubble = NOT', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 24 });

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const conn = [W(ck, 'M232,116 H262 V138 H290'), W(ck, 'M232,204 H262 V182 H290')];
const G1 = { NAND: gate(ck, 'AND', 330, 160, 110, { lead: 40, leadOut: 54 }), NOR: gate(ck, 'OR', 330, 160, 110, { lead: 40, leadOut: 40 }) };
const xm = G1.NAND.x1;
const NOTg = gate(ck, 'NOT', xm + 70, 160, 90, { lead: 70, leadOut: 40 });
const lampX0 = NOTg.x1 + 34, lampC = mk(ck, 'circle', { cx: lampX0, cy: 160, r: 32, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(ck, `M${lampX0 - 22},138 L${lampX0 + 22},182 M${lampX0 + 22},138 L${lampX0 - 22},182`, { 'stroke-width': 3 });
const lampYL = tx(ck, lampX0, 226, 'Y', { 'text-anchor': 'middle', 'font-style': 'italic' });
const midC = mk(ck, 'g'); const midR = mk(midC, 'rect', { x: xm + 8, y: 94, width: 44, height: 40, rx: 8, fill: SOFT }); const midV = tx(midC, xm + 30, 123, '0', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 24 });
const midL = mono(ck, xm + 30, 84, 'AND out', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 });
const nBox = mk(ck, 'rect', { x: 278, y: 70, width: NOTg.x1 - 270, height: 182, rx: 14, fill: 'none', stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const nBoxL = mono(ck, 296, 274, '= NAND', { fill: GD, 'font-weight': 600 });
const scR = mk(ck, 'rect', { x: 32, y: 300, width: 864, height: 268, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 300, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const scT = [mk(ck, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: '#C9D2E3', 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linejoin': 'round' })];
const scL = [mono(ck, 44, 326, 'A', { fill: CH1, 'font-weight': 600 }), mono(ck, 44, 414, 'B', { fill: '#C9D2E3', 'font-weight': 600 }), mono(ck, 44, 502, 'Y', { fill: AM, 'font-weight': 600 }), mono(ck, 884, 326, 'SCOPE · SLOW-MOTION VIEW', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const ev = {
  NAND: [[wt('B2', 'Both'), 0, 0], [wt('B3', 'Zero'), 0, 1], [wt('B3', 'One'), 1, 0], [wt('B4', 'Both'), 1, 1]],
  NOR: [[wt('B7', 'Both'), 0, 0], [wt('B8', 'any'), 0, 1], [wt('B8', 'OR'), 1, 0], [wt('B8', 'Flip'), 1, 1]] };
const RP = { NAND: [T0('B5'), tR5], NOR: [T0('B9'), tU] }, RO = [[0, 0], [0, 1], [1, 0], [1, 1]];
const modeAt = t => t < tR5 ? 'NAND' : 'NOR';
const inAt = (m, t) => { let a = 0, b = 0, k = -1; ev[m].forEach(([tt, x, y], i) => { if (t >= tt) { a = x; b = y; k = i; } });
  const [r0, r1] = RP[m]; if (t >= r0 + 0.3 && t < r1 - 0.3) { const q = RO[Math.floor((t - r0 - 0.3) / 1.1) % 4]; a = q[0]; b = q[1]; } return { a, b, k }; };
const inner = { NAND: (a, b) => a & b, NOR: (a, b) => a | b };
const TT = {
  NAND: { rows: [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 0]], x: K('Y = \\overline{A \\cdot B}'), w: '0 only when all inputs are 1', tx: wt('B6', 'We'), tw: wt('B5', 'So') },
  NOR: { rows: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 0]], x: K('Y = \\overline{A + B}'), w: '1 only when all inputs are 0', tx: wt('B10', 'We'), tw: wt('B9', 'So') } };
let ttM = '', ttO = null;
const sigAt = (tau, ch) => { if (tau < ev.NAND[0][0]) return -1; const m = modeAt(tau), { a, b } = inAt(m, tau); return ch === 0 ? a : ch === 1 ? b : 1 - inner[m](a, b); };
const lane = (p, ch, t, base) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200, v = sigAt(tau, ch); if (v < 0) { first = true; continue; } const x = 70 + 816 * i / 200, y = base - 48 * v; d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; } PUC.attr(p, 'd', d); };

/* ================= U: universal ================= */
const uS = $('#uS');
const UG = { NOT: mk(uS, 'g'), AND: mk(uS, 'g'), OR: mk(uS, 'g') };
const u1 = fixOut(ngate(UG.NOT, 'NAND', 330, 260, 130, { lead: 80, leadOut: 110 })); tie(UG.NOT, u1, 120);
const uNotA = tx(UG.NOT, 100, 270, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 28 }), uNotY = tx(UG.NOT, u1.x1 + 12, 270, 'Y', { 'font-style': 'italic', 'font-size': 28 });
const uChipA = mk(UG.NOT, 'g'), uChipAR = mk(uChipA, 'rect', { x: 140, y: 200, width: 44, height: 40, rx: 8, fill: C.ac2 }), uChipAV = tx(uChipA, 162, 229, '0', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 24, fill: GD });
const uChipY = mk(UG.NOT, 'g'), uChipYR = mk(uChipY, 'rect', { x: u1.x1 - 56, y: 200, width: 44, height: 40, rx: 8, fill: C.ac2 }), uChipYV = tx(uChipY, u1.x1 - 34, 229, '1', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 24, fill: GD });
const uNotX = mk(UG.NOT, 'foreignObject', { x: 36, y: 420, width: 712, height: 80 }); uNotX.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:44px;text-align:center">${K('\\overline{A\\cdot A} = \\overline{A}')}</div>`;
const a1 = fixOut(ngate(UG.AND, 'NAND', 200, 260, 110, { lead: 100, leadOut: 70 })), a2 = fixOut(ngate(UG.AND, 'NAND', a1.x1 + 60, 260, 110, { lead: 60, leadOut: 70 }));
tie(UG.AND, a2, a1.x1);
[tx(UG.AND, 90, 246, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(UG.AND, 90, 290, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(UG.AND, a2.x1 + 10, 270, 'Y', { 'font-style': 'italic', 'font-size': 26 })];
const uAndX = mk(UG.AND, 'foreignObject', { x: 36, y: 420, width: 712, height: 80 }); uAndX.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:44px;text-align:center">${K('\\overline{\\overline{A\\cdot B}} = A\\cdot B')}</div>`;
const o1 = fixOut(ngate(UG.OR, 'NAND', 190, 160, 90, { lead: 60, leadOut: 40 })), o2 = fixOut(ngate(UG.OR, 'NAND', 190, 340, 90, { lead: 60, leadOut: 40 })), o3 = fixOut(ngate(UG.OR, 'NAND', 470, 250, 110, { lead: 80, leadOut: 70 }));
tie(UG.OR, o1, 90); tie(UG.OR, o2, 90);
W(UG.OR, `M${o1.x1},160 H${o3.x0 - 30} V${o3.ys[0]} H${o3.x0}`); W(UG.OR, `M${o2.x1},340 H${o3.x0 - 30} V${o3.ys[1]} H${o3.x0}`);
[tx(UG.OR, 76, 170, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(UG.OR, 76, 350, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(UG.OR, o3.x1 + 10, 260, 'Y', { 'font-style': 'italic', 'font-size': 26 }),
  mono(UG.OR, o1.x1 - 4, 136, 'Ā', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(UG.OR, o2.x1 - 4, 316, 'B̄', { fill: INK, 'font-weight': 600, 'font-size': 22 })];
const uOrX = mk(UG.OR, 'foreignObject', { x: 36, y: 420, width: 712, height: 80 }); uOrX.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:44px;text-align:center">${K('\\overline{\\overline{A}\\cdot\\overline{B}} = A + B')}</div>`;
const rcs = ['#rc0', '#rc1', '#rc2'].map(s => $(s));
const UI = mk(uS, 'g');
const ui1 = fixOut(ngate(UI, 'NAND', 250, 190, 130, { lead: 70, leadOut: 70 })), ui2 = fixOut(ngate(UI, 'NOR', 250, 370, 130, { lead: 70, leadOut: 56 }));
const uiL = [tx(UI, 600, 198, 'NAND', { 'font-family': 'IBM Plex Mono', 'font-size': 30 }), tx(UI, 600, 378, 'NOR', { 'font-family': 'IBM Plex Mono', 'font-size': 30 })];
const uiT = mono(UI, 392, 500, 'each one alone can build AND, OR and NOT', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });

/* ================= W: worked example ================= */
const wS = $('#wS');
const n1 = fixOut(ngate(wS, 'NOR', 220, 170, 100, { lead: 60, leadOut: 50 })), n2 = fixOut(ngate(wS, 'NOR', 220, 390, 100, { lead: 60, leadOut: 50 })), n3 = fixOut(ngate(wS, 'NOR', 500, 280, 100, { lead: 70, leadOut: 80 }));
const wT = [...tie(wS, n1, 100), ...tie(wS, n2, 100)];
const wLinks = [W(wS, `M${n1.x1},170 V${n3.ys[0]} H${n3.x0}`), W(wS, `M${n2.x1},390 V${n3.ys[1]} H${n3.x0}`)];
const wLab = [tx(wS, 86, 180, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(wS, 86, 400, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(wS, n3.x1 + 10, 290, 'Y', { 'font-style': 'italic', 'font-size': 26 })];
const chip = (x, y, s) => { const g = mk(wS, 'g'); mk(g, 'rect', { x: x - 22, y: y - 22, width: 44, height: 40, rx: 8, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); tx(g, x, y + 9, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: GD }); return g; };
const wInC = [chip(140, 140, '1'), chip(140, 360, '1')], wMid = [chip(n1.x1 + 26, 140, '0'), chip(n2.x1 + 26, 420, '0')], wYc = chip(n3.x1 - 30, 250, '1');
const wEx = mk(wS, 'foreignObject', { x: 36, y: 474, width: 712, height: 90 });
wEx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:44px;text-align:center">${K('Y = \\overline{\\overline{A} + \\overline{B}} = A \\cdot B')}</div>`;
const wRows = rows($('#wSteps'), [
  [K('\\overline{A + A} = \\overline{A}'), 'NOR 1, inputs joined', 92],
  [K('\\overline{B + B} = \\overline{B}'), 'NOR 2', 186],
  [K('Y = \\overline{\\overline{A} + \\overline{B}}'), 'NOR 3', 280],
  [K('A = B = 1:\\ \\overline{A} = \\overline{B} = 0'), 'check', 374],
  [K('Y = \\overline{0 + 0} = 1'), 'same as AND', 484]]);
const tWR = [wt('W2', 'Out'), wt('W3', 'Out'), wt('W4', 'Now'), wt('W5', 'A', 1), wt('W6', 'NOR')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'NAND = ' + K('\\overline{A}\\cdot\\overline{B}') + ' (a bar on each input)', right: 'NAND = ' + K('\\overline{A\\cdot B}') + ' (one bar over the whole)', y0: 96, y1: 184 });
$('#tcA').innerHTML = K('\\overline{A}\\cdot\\overline{B} = 0 \\cdot 1 = 0') + `<span style="font:600 26px Poppins;color:${C.red};margin-left:24px">wrong</span>`;
$('#tcB').innerHTML = K('\\overline{A\\cdot B} = \\overline{1\\cdot 0} = 1') + `<span style="font:600 26px Poppins;color:${C.ok};margin-left:24px">NAND</span>`;
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS', 'ISC BOARDS'], type: 'Truth tables; NOT, AND, OR from NAND or NOR (JEE Main: 13 Apr 2023 Shift 2)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A and B go into a NOR gate. Its output goes to both inputs of a NAND gate. Which single gate is the whole circuit?', qW: 780,
  opts: ['AND', 'NAND', 'OR', 'NOR'], right: 2, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K('\\text{NOR: } \\overline{A + B}')], [K('\\text{NAND, inputs joined} = \\text{NOT}')], [K('Y = \\overline{\\overline{A + B}}')], [K('Y = A + B'), 'an OR gate']], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'NOR'), wt('A3', 'NAND'), wt('A3', 'removes'), wt('A4', 'What')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Universal gates · fact card', txt: [1, 1, 1, 1, 1],
  lines: ['NAND: ' + K('Y = \\overline{A \\cdot B}') + ' · 0 only if all inputs are 1', 'NOR: ' + K('Y = \\overline{A + B}') + ' · 1 only if all inputs are 0', 'A bubble on a symbol means NOT',
    'From NAND: NOT = 1 gate · AND = 2 · OR = 3', 'From NOR: NOT = 1 gate · OR = 2 · AND = 3'] });
const nx = PUC.next($('#sF'), { label: 'COMING UP', topic: 'More PUC Electronics soon - follow the playlist', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
M.hide($('#ghost'), true);
const wireC = (p, v) => PUC.attr(p, 'stroke', vc(v));

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, wt('H1', 'robot') - 0.3, out, { dx: 60, dy: 0, ...o });
    chipsE.forEach((e, i) => { M.vis(e, t, wt('H1', 'one') + i * 0.07, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }); e.style.background = t >= wt('H2', 'NAND') && t < wt('H2', 'But') ? AM : INK; });
    M.vis($('#h2C'), t, wt('H2', 'plan') - 0.3, out, { dx: 60, dy: 0, ...o });
    ['#n1', '#n2', '#n3'].forEach((s, i) => M.vis($(s), t, wt('H2', ['AND', 'OR', 'NOT'][i]) - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }));
  }

  /* R: NAND = NOT AND */
  const rOn = t >= tR - 0.05 && t < tB + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tB - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, T0('R3') - 0.2, out, { dx: 60, dy: 0, ...o });
    drawSeq([...rA.ins, rA.out], t, wt('R2', 'AND') - 0.2, 0.3, 0.08); M.vis(rA.body, t, wt('R2', 'AND') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...rN.ins, rN.out], t, wt('R2', 'NOT') - 0.2, 0.3, 0.08); M.vis(rN.body, t, wt('R2', 'NOT') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(rN.bub, t, wt('R2', 'NOT'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt(rL, t, wt('R2', 'AND'), 0.12); M.draw(rBox, t, wt('R2', 'after') - 0.1, 0.6); M.vis(rBoxL, t, wt('R2', 'after') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...rG.ins, rG.out], t, T0('R3') + 0.1, 0.3, 0.08); M.vis(rG.body, t, T0('R3') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(rG.bub, t, wt('R3', 'circle') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); fadeAt(rGL, t, T0('R3') + 0.4, 0.1);
    PUC.attr(rG.bub, 'fill', t >= wt('R4', 'bubble') ? C.ac2 : '#fff'); PUC.attr(rG.bub, 'stroke', t >= wt('R4', 'bubble') ? AM : INK);
    const u = M.io((t - wt('R4', 'bubble')) / 0.4); rPt.set(rG.ox + 8, 370, rG.ox + 8, 370 - 100 * u); M.vis(rPtL, t, wt('R4', 'bubble') + 0.2, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(rPtL, 'x', rG.ox + 8);
    M.vis($('#rStrip'), t, wt('R4', 'means') - 0.2, 1e9, { dy: 24 }); M.vis(rEx, t, wt('R3', 'symbol') - 0.1, 1e9, { dy: 10 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tU + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tU - 0.32, m = modeAt(t), { a, b, k } = inAt(m, t), mid = inner[m](a, b), y = 1 - mid, live = k >= 0;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    M.setT($('#ckL'), `INSIDE A ${m} GATE`); M.setT($('#ttL'), `${m} · TRUTH TABLE`); M.setT(midL, m === 'NAND' ? 'AND out' : 'OR out'); M.setT(nBoxL, '= ' + m);
    const mt = m === 'NAND' ? tB : tR5;
    fadeAt([$('#tgA'), $('#tgB')], t, tB + 0.4, 0.1);
    [[$('#tgA'), a], [$('#tgB'), b]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateX(${v ? 30 : 0}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), String(v)); });
    conn.forEach((p, i) => { M.draw(p, t, tB + 0.5, 0.3); wireC(p, live ? (i ? b : a) : 0); });
    Object.entries(G1).forEach(([kk, G]) => { M.hide(G.g, kk !== m); if (kk === m) { M.vis(G.g, t, mt + 0.5, 1e9, { dy: 0, fade: 0.25 }); G.ins.forEach((p, i) => wireC(p, live ? (i ? b : a) : 0)); wireC(G.out, live ? mid : 0); } });
    M.vis(NOTg.g, t, tB + 0.7, 1e9, { dy: 0, fade: 0.2 }); wireC(NOTg.ins[0], live ? mid : 0); wireC(NOTg.out, live ? y : 0);
    M.vis(lampC, t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(lampYL, t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(lampC, 'fill', live && y ? AM : '#fff');
    M.vis(midC, t, ev.NAND[0][0], 1e9, { dy: 0, fade: 0.2 }); M.vis(midL, t, ev.NAND[0][0], 1e9, { dy: 0, fade: 0.2 }); M.setT(midV, String(mid)); PUC.attr(midR, 'fill', mid ? C.ac2 : SOFT);
    M.draw(nBox, t, wt('B1', 'truth') - 0.2, 0.6); M.vis(nBoxL, t, wt('B1', 'truth'), 1e9, { dy: 0, fade: 0.2 });
    [scR, ...scG].forEach(e => M.vis(e, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, tB + 1.0, 0.08);
    lane(scT[0], 0, t, 360); lane(scT[1], 1, t, 448); lane(scT[2], 2, t, 536);
    if (ttM !== m) { ttM = m; ttO = ttable($('#ttB'), ['A', 'B', 'Y'], TT[m].rows); $('#ttX').innerHTML = TT[m].x; M.setT($('#ttW'), TT[m].w); }
    M.vis(ttO.head, t, mt + 0.4, 1e9, { dy: 10 });
    ttO.rows.forEach((r, i) => { const e = ev[m].find(([tt, x, z]) => x * 2 + z === i); const ti = e ? e[0] : 1e9;
      M.vis(r, t, ti - 0.1, 1e9, { dy: 14 }); M.vis(r.lastChild, t, ti + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const cur = live && a * 2 + b === i; r.style.background = cur ? C.ac2 : SOFT; r.style.outline = cur ? `2.5px solid ${AM}` : 'none'; });
    M.vis($('#ttBox'), t, TT[m].tw - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#ttW'), t, TT[m].tw, 1e9, { dy: 8 }); PUC.write($('#ttX'), t, TT[m].tx + 0.1, 0.6);
  }

  /* U: universal */
  const uOn = t >= tU - 0.05 && t < tT + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = tT - 0.3, t3 = T0('U3'), t6 = T0('U6'), t7 = T0('U7'), cur = t < t6 ? 'NOT' : t < t7 ? 'AND' : 'OR';
    M.vis($('#uL'), t, tU + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#uR'), t, tU + 0.25, out, { dx: 60, dy: 0, ...o });
    M.setT($('#uLL'), t < t3 ? 'THE UNIVERSAL GATES' : `${cur} FROM NAND`); M.vis($('#uLL'), t, tU + 0.2, 1e9, { dy: 10 });
    M.vis(UI, t, tU + 0.3, t3 - 0.3, { dy: 0, fade: 0.25, outDur: 0.25, ody: 0 }); M.vis(uiT, t, wt('U2', 'alone'), 1e9, { dy: 0, fade: 0.2 });
    Object.entries(UG).forEach(([kk, g]) => { M.hide(g, kk !== cur || t < t3 - 0.1); if (kk === cur) M.vis(g, t, { NOT: t3, AND: t6, OR: t7 }[kk] + 0.1, 1e9, { dy: 0, fade: 0.25 }); });
    const A = t >= wt('U5', 'one') - 0.2 ? 1 : 0; M.vis(uChipA, t, wt('U4', 'zero') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(uChipY, t, wt('U4', 'one') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.setT(uChipAV, String(A)); M.setT(uChipYV, String(1 - A)); [...u1.ins, u1.out].forEach((p, i) => wireC(p, i < 2 ? A : 1 - A));
    M.vis(uNotX, t, wt('U5', 'NOT') - 0.2, 1e9, { dy: 10 }); M.vis(uAndX, t, wt('U6', 'cancel') - 0.2, 1e9, { dy: 10 }); M.vis(uOrX, t, T0('U8') + 0.1, 1e9, { dy: 10 });
    const tr = [wt('U5', 'NOT') + 0.2, wt('U6', 'cancel'), wt('U8', 'Out')];
    rcs.forEach((e, i) => { M.vis(e, t, wt('U2', 'NAND') + i * 0.15, 1e9, { dy: 16 }); [e.querySelector('.b'), e.querySelector('.c')].forEach(q => M.vis(q, t, tr[i] - 0.1, 1e9, { dy: 0, fade: 0.2 })); const hl = (i === 0 && t < t6) || (i === 1 && t >= t6 && t < t7) || (i === 2 && t >= t7 && t < T0('U9')); e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT;
      [e.querySelector('.d'), e.querySelector('.e')].forEach(q => M.vis(q, t, i === 0 ? T0('U9') + 0.3 : wt('U9b', ['OR', 'AND', 'OR'][i]) - 0.1, 1e9, { dy: 0, fade: 0.2 })); });
    // the hidden rc rows before U8b keep only their first two cells visible when they first appear
    M.vis($('#uStrip'), t, T0('U9') - 0.1, 1e9, { dy: 24 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'can') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    [[n1, T0('W2')], [n2, T0('W3')], [n3, T0('W4')]].forEach(([G, tg]) => { drawSeq([...G.ins, G.out], t, tg + 0.1, 0.3, 0.08); M.vis(G.body, t, tg + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(G.bub, t, tg + 0.3, 1e9, { dy: 0, fade: 0.2 }); });
    fadeAt(wT.slice(0, 3), t, T0('W2') + 0.3, 0.05); fadeAt(wT.slice(3), t, T0('W3') + 0.3, 0.05); drawSeq(wLinks, t, T0('W4') + 0.2, 0.4, 0.1);
    M.vis(wLab[0], t, T0('W2') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(wLab[1], t, T0('W3') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(wLab[2], t, T0('W4') + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const k5 = t >= tWR[3], k6 = t >= tWR[4];
    wInC.forEach(g => M.vis(g, t, tWR[3], 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 })); wMid.forEach(g => M.vis(g, t, wt('W5', 'zero') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 })); M.vis(wYc, t, wt('W6', 'one') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    [...n1.ins, ...n2.ins, ...wT.filter(e => e.tagName === 'path')].forEach(p => wireC(p, k5 ? 1 : 0)); [n1.out, n2.out, ...wLinks, ...n3.ins].forEach(p => wireC(p, 0)); wireC(n3.out, k6 ? 1 : 0);
    M.vis(wEx, t, wt('W6', 'Just') - 0.1, 1e9, { dy: 10 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X4', 'But') - 0.05, tRight: wt('X4', 'bar') - 0.2 });
    M.vis($('#tcA'), t, wt('X3', 'bar') - 0.1, 1e9, { dy: 10 }); M.vis($('#tcB'), t, wt('X4', 'NAND') - 0.1, 1e9, { dy: 10 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X6', 'J'), wt('X5', 'P'), wt('X5', 'I')], tType: wt('X7', 'Expect') - 0.2 });
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
