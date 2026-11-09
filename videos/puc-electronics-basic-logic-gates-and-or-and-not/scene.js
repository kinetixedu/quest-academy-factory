// PUC Electronics Ep 52 - Basic logic gates: AND, OR and NOT ("Breadboard" style, Lab Notebook world)
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
  let bub = null; if (type === 'NOT' || o.bubble) { bub = mk(g, 'circle', { cx: ox - 8, cy: y, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 4 }); }
  const out = W(g, `M${ox},${y} H${ox + lo}`);
  return { g, body, ins, out, ox, ys, bub, x0: x - li, x1: ox + lo };
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'presses') - 0.2;
const tI = T0('I1'), tAn = T0('D1'), tOr = T0('O1'), tNo = T0('N1'), tS = T0('S1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h2S = $('#h2S');
const hg = gate(h2S, 'AND', 210, 150, 100, { lead: 70, leadOut: 90 });
const hgL = [mono(h2S, 130, 122, 'door shut', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), mono(h2S, 130, 198, 'start', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), mono(h2S, hg.x1 + 10, 157, 'run', { fill: INK, 'font-weight': 600 })];

/* ================= I: levels + truth table ================= */
const iS = $('#iS');
mk(iS, 'line', { x1: 140, y1: 120, x2: 720, y2: 120, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); mk(iS, 'line', { x1: 140, y1: 240, x2: 720, y2: 240, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const iLv = [tx(iS, 40, 128, '1', { 'font-family': 'IBM Plex Mono', 'font-size': 34, fill: AM }), mono(iS, 70, 126, 'HIGH', { 'font-weight': 600 }), tx(iS, 40, 248, '0', { 'font-family': 'IBM Plex Mono', 'font-size': 34 }), mono(iS, 70, 246, 'LOW', { 'font-weight': 600 })];
const iWave = mk(iS, 'path', { fill: 'none', stroke: TE, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const iBox = mk(iS, 'g'); mk(iBox, 'rect', { x: 290, y: 310, width: 200, height: 130, rx: 16, fill: '#fff', stroke: INK, 'stroke-width': 4 }); tx(iBox, 390, 384, 'GATE', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30 });
const iIn = [PUC.arrow(iS, INK, 4, 14), PUC.arrow(iS, INK, 4, 14), PUC.arrow(iS, AM, 5, 16)];
const iInL = [mono(iS, 150, 350, 'input A', { fill: INK }), mono(iS, 150, 420, 'input B', { fill: INK }), mono(iS, 600, 365, 'output', { fill: GD, 'font-weight': 600 })];
const iT = ttable($('#iT'), ['A', 'B', 'Y'], [[0, 0, '?'], [0, 1, '?'], [1, 0, '?'], [1, 1, '?']]);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const com = [W(ck, 'M140,290 V150'), W(ck, 'M140,310 V450 H760 V334'), W(ck, 'M760,266 V150')];
const bat = [W(ck, 'M112,290 H168', { 'stroke-width': 5 }), W(ck, 'M126,310 H154', { 'stroke-width': 9 })];
const batL = [tx(ck, 96, 306, '5 V', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 174, 284, '+', { 'font-size': 26 })];
const lampC = mk(ck, 'circle', { cx: 760, cy: 300, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), lampX = W(ck, 'M736,276 L784,324 M784,276 L736,324', { 'stroke-width': 3 });
const lampL = tx(ck, 808, 308, 'Y', { 'font-style': 'italic', 'font-size': 30, fill: INK });
const MG = { AND: mk(ck, 'g'), OR: mk(ck, 'g'), NOT: mk(ck, 'g') };
W(MG.AND, 'M140,150 H300 M380,150 H460 M540,150 H760'); const sA1 = sw(MG.AND, 300, 150, 380, 150), sB1 = sw(MG.AND, 460, 150, 540, 150);
tx(MG.AND, 340, 196, 'A', { 'text-anchor': 'middle', 'font-size': 26 }); tx(MG.AND, 500, 196, 'B', { 'text-anchor': 'middle', 'font-size': 26 });
W(MG.OR, 'M140,150 H340 M420,150 H760 M220,150 V240 H340 M420,240 H540 V150'); const sA2 = sw(MG.OR, 340, 150, 420, 150), sB2 = sw(MG.OR, 340, 240, 420, 240);
[[220, 150], [540, 150]].forEach(([x, y]) => mk(MG.OR, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
tx(MG.OR, 380, 196, 'A', { 'text-anchor': 'middle', 'font-size': 26 }); tx(MG.OR, 380, 286, 'B', { 'text-anchor': 'middle', 'font-size': 26 });
W(MG.NOT, 'M140,150 H300 M420,150 H760 M760,200 H620 V262 M620,338 V400 H760'); W(MG.NOT, 'M300,150 L310,136 L326,164 L342,136 L358,164 L374,136 L390,164 L406,136 L420,150');
const sA3 = sw(MG.NOT, 620, 262, 620, 338); [[760, 200], [760, 400]].forEach(([x, y]) => mk(MG.NOT, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
tx(MG.NOT, 360, 196, 'R', { 'text-anchor': 'middle', 'font-size': 26, 'font-style': 'italic' }); tx(MG.NOT, 640, 308, 'A', { 'font-size': 26 });
const lampSk = (x, y) => Math.hypot(x - 760, y - 300) < 38 || (Math.abs(x - 140) < 2 && y > 280 && y < 320);
const FP = {
  top: flow(ck, [[140, 310], [140, 450], [760, 450], [760, 150], [140, 150], [140, 290]], 24, { skip: lampSk }),
  orB: flow(ck, [[140, 310], [140, 450], [760, 450], [760, 150], [540, 150], [540, 240], [220, 240], [220, 150], [140, 150], [140, 290]], 26, { skip: lampSk }),
  notS: flow(ck, [[140, 310], [140, 450], [760, 450], [760, 400], [620, 400], [620, 200], [760, 200], [760, 150], [140, 150], [140, 290]], 26, { skip: lampSk })
};
// symbol inset
const SY = { AND: gate(ck, 'AND', 690, 535, 70, { lead: 60, leadOut: 60 }), OR: gate(ck, 'OR', 690, 535, 70, { lead: 60, leadOut: 54 }), NOT: gate(ck, 'NOT', 700, 535, 70, { lead: 70, leadOut: 54 }) };
const syL = mk(ck, 'g'); const syA = tx(syL, 618, 0, 'A', { 'text-anchor': 'end', 'font-size': 22 }), syB = tx(syL, 618, 0, 'B', { 'text-anchor': 'end', 'font-size': 22 }), syY = tx(syL, 880, 543, 'Y', { 'font-size': 22, 'font-style': 'italic' });
const symLab = mono(ck, 600, 482, 'SYMBOL', { 'font-weight': 600, 'font-size': 16 });
// timing of inputs per mode
const ev = {
  AND: [[wt('D3', 'Both'), 0, 0], [wt('D4', 'A'), 1, 0], [wt('D5', 'A'), 0, 1], [wt('D6', 'Both'), 1, 1]],
  OR: [[wt('O3', 'Both'), 0, 0], [wt('O3', 3), 1, 0], [wt('O3', 6), 0, 1], [wt('O3', 9), 1, 1]],
  NOT: [[wt('N2', 'Open'), 0, 0], [wt('N3', 'Close'), 1, 0]]
};
const modeAt = t => t < tOr ? 'AND' : t < tNo ? 'OR' : 'NOT';
const RP = { AND: [T0('D9'), tOr], OR: [T0('O6'), tNo], NOT: [T0('N6'), tS] };
const RO = { AND: [[0, 0], [0, 1], [1, 0], [1, 1]], OR: [[0, 0], [0, 1], [1, 0], [1, 1]], NOT: [[0, 0], [1, 0]] };
const inAt = (m, t) => { let a = 0, b = 0, k = -1; ev[m].forEach(([tt, x, y], i) => { if (t >= tt) { a = x; b = y; k = i; } });
  const [r0, r1] = RP[m]; if (t >= r0 + 0.3 && t < r1 - 0.3) { const q = RO[m][Math.floor((t - r0 - 0.3) / 1.1) % RO[m].length]; a = q[0]; b = q[1]; } return { a, b, k }; };
const fn = { AND: (a, b) => a & b, OR: (a, b) => a | b, NOT: a => 1 - a };
const TT = {
  AND: { cols: ['A', 'B', 'Y'], rows: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]], x: K('Y = A \\cdot B'), w: '1 only when all inputs are 1', tx: wt('D8', 'We'), tw: wt('D7', 'So') },
  OR: { cols: ['A', 'B', 'Y'], rows: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]], x: K('Y = A + B'), w: '1 when at least one input is 1', tx: wt('O5', 'We'), tw: wt('O4', 'So') },
  NOT: { cols: ['A', 'Y'], rows: [[0, 1], [1, 0]], x: K('Y = \\overline{A}'), w: 'flips the input · an inverter', tx: wt('N5', 'We'), tw: wt('N4', 'flips') } };
let ttM = '', ttO = null;
const rowOf = (m, a, b) => m === 'NOT' ? a : a * 2 + b;

/* ================= S: scope ================= */
const gS = $('#gS');
const SG = { AND: gate(gS, 'AND', 280, 250, 170, { lead: 140, leadOut: 120 }), OR: gate(gS, 'OR', 280, 250, 170, { lead: 140, leadOut: 104 }) };
const sLamp = mk(gS, 'circle', { cx: 640, cy: 250, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(gS, 'M616,226 L664,274 M664,226 L616,274', { 'stroke-width': 3 });
const sChip = ['A', 'B'].map((s, i) => { const g = mk(gS, 'g'); const r = mk(g, 'rect', { x: 40, y: (i ? 284 : 182) - 26, width: 64, height: 52, rx: 10, fill: SOFT }); const v = tx(g, 72, (i ? 284 : 182) + 11, '0', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30 }); tx(g, 72, (i ? 284 : 182) - 36, s, { 'text-anchor': 'middle', 'font-size': 22, 'font-style': 'italic' }); return [g, r, v]; });
const sYL = tx(gS, 640, 320, 'Y', { 'text-anchor': 'middle', 'font-size': 24, 'font-style': 'italic' });
const sEx = mk(gS, 'foreignObject', { x: 36, y: 420, width: 712, height: 80 });
const scS = $('#scS');
mk(scS, 'rect', { x: 0, y: 0, width: 720, height: 330, rx: 8, fill: '#16213E' });
for (let i = 1; i < 8; i++) mk(scS, 'line', { x1: 720 * i / 8, y1: 0, x2: 720 * i / 8, y2: 330, stroke: '#2A3758', 'stroke-width': 1.5 });
[110, 220].forEach(y => mk(scS, 'line', { x1: 0, y1: y, x2: 720, y2: y, stroke: '#2A3758', 'stroke-width': 1.5 }));
const sTr = [mk(scS, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(scS, 'path', { fill: 'none', stroke: '#C9D2E3', 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(scS, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linejoin': 'round' })];
const sTL = [mono(scS, 12, 26, 'A', { fill: CH1, 'font-weight': 600 }), mono(scS, 12, 136, 'B', { fill: '#C9D2E3', 'font-weight': 600 }), mono(scS, 12, 246, 'Y', { fill: AM, 'font-weight': 600 })];
const tS0 = wt('S2', 'Input'), tSwap = wt('S4', 'Swap');
const sA = tau => tau < tS0 ? 0 : Math.floor((tau - tS0) / 2) % 2 ? 0 : 1, sB = tau => tau < tS0 ? 0 : Math.floor((tau - tS0) / 1) % 2 ? 0 : 1;
const sY = tau => tau < tSwap ? (sA(tau) & sB(tau)) : (sA(tau) | sB(tau));
const lane = (p, f, t, base) => { let d = '', first = true; for (let i = 0; i <= 240; i++) { const tau = t - 8 + 8 * i / 240; if (tau < tS0 - 1) continue; const x = 40 + 670 * i / 240, y = base - 62 * f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; } PUC.attr(p, 'd', d); };

/* ================= W: worked example ================= */
const wS = $('#wS');
const wg = { OR: gate(wS, 'OR', 220, 170, 100, { lead: 110, leadOut: 60 }), NOT: gate(wS, 'NOT', 250, 390, 90, { lead: 140, leadOut: 70 }), AND: gate(wS, 'AND', 520, 280, 100, { lead: 70, leadOut: 90 }) };
const wLinks = [W(wS, `M${wg.OR.x1},170 V${280 - 20} H450`), W(wS, `M${wg.NOT.x1},390 V${280 + 20} H450`)];
const wLab = [['A', 100, 156], ['B', 100, 196], ['C', 100, 398]].map(([s, x, y]) => tx(wS, x, y, s, { 'text-anchor': 'end', 'font-size': 26, 'font-style': 'italic' }));
const chip = (x, y, s) => { const g = mk(wS, 'g'); mk(g, 'rect', { x: x - 22, y: y - 22, width: 44, height: 40, rx: 8, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); tx(g, x, y + 9, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: GD }); return g; };
const wIn = [chip(150, 150, '1'), chip(150, 190, '0'), chip(150, 380, '0')];
const wOr = chip(400, 240, '1'), wNot = chip(400, 330, '1'), wY = chip(730, 254, '1');
const wYL = tx(wS, 730, 318, 'Y', { 'text-anchor': 'middle', 'font-size': 26, 'font-style': 'italic' });
const wEx = mk(wS, 'foreignObject', { x: 36, y: 470, width: 712, height: 90 });
wEx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:44px;text-align:center">${K('Y = (A + B)\\cdot\\overline{C}')}</div>`;
const wRows = rows($('#wSteps'), [
  [K('Y = (A + B)\\cdot\\overline{C}'), 'the circuit', 92],
  [K('A = 1,\\ B = 0,\\ C = 0'), 'inputs', 186],
  [K('A + B = 1 + 0 = 1'), 'OR', 280],
  [K('\\overline{C} = \\overline{0} = 1'), 'NOT', 374],
  [K('Y = 1 \\cdot 1 = 1'), 'AND', 484]]);
const tWR = [wt('W2', 'So'), wt('W3', 'Take'), wt('W4', 'A'), wt('W5', 'C'), wt('W6', 'One')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'OR gate: 1 + 1 = 2', right: 'OR gate: 1 + 1 = 1 (only 0 and 1 exist)', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xg = gate(tcS, 'OR', 200, 100, 100, { lead: 90, leadOut: 70 });
xg.ins.forEach(p => PUC.attr(p, 'stroke', AM)); PUC.attr(xg.out, 'stroke', AM);
const xc = [mono(tcS, 96, 82, '1', { 'font-size': 28, fill: GD, 'font-weight': 600, 'text-anchor': 'end' }), mono(tcS, 96, 132, '1', { 'font-size': 28, fill: GD, 'font-weight': 600, 'text-anchor': 'end' })];
const x2 = tx(tcS, 470, 118, '2', { 'font-family': 'IBM Plex Mono', 'font-size': 60, fill: C.red }), x2s = W(tcS, 'M455,70 L505,120', { stroke: C.red, 'stroke-width': 5 });
const x1 = tx(tcS, 560, 118, '1', { 'font-family': 'IBM Plex Mono', 'font-size': 60, fill: C.ok });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET', 'PUC BOARDS', 'ISC BOARDS'], type: 'Truth tables and outputs of gate circuits (JEE Main 29 Jan 2024 Shift 2 · NEET 2024)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `${K('Y = A\\cdot\\overline{B} + C')}. In how many of the 8 input rows (A, B, C) is Y = 1?`, qW: 780,
  opts: ['3', '4', '5', '6'], right: 2, optW: 474, optY: 330, optFs: 38 });
const sol = PUC.solution($('#so'), [[K('C = 1 \\Rightarrow Y = 1'), '4 rows'], [K('C = 0 \\Rightarrow Y = A\\cdot\\overline{B}')], [K('A = 1,\\ B = 0'), '1 row'], [K('4 + 1 = 5')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'When'), wt('A3', 'When'), wt('A4', 'That'), wt('A5', 'Four')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Basic logic gates · fact card', txt: [1, 1, 1, 1, 1],
  lines: ['AND: ' + K('Y = A\\cdot B') + ' · 1 only if all inputs are 1', 'OR: ' + K('Y = A + B') + ' · 1 if any input is 1', 'NOT: ' + K('Y = \\overline{A}') + ' · flips the input (inverter)',
    'In logic, 1 + 1 = 1 for OR · there is no 2', 'n inputs → 2<sup>n</sup> rows in the truth table'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 53', topic: 'Universal gates: NAND and NOR', y: 774 });

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
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, wt('H1', 'start') - 0.3, out, { dx: 60, dy: 0, ...o });
    const st = t >= wt('H1', 'start'), dr = t >= wt('H2', 'shuts'), st2 = t < wt('H2', 'door') || t >= wt('H2', 'presses');
    const sNow = st && st2, run = dr && t >= wt('H2', 'presses');
    [[$('#c1'), dr], [$('#c2'), sNow]].forEach(([e, v], i) => { M.vis(e, t, wt('H1', 'start') - 0.1 + i * 0.12, 1e9, { dy: 12 }); const k = e.querySelector('.ck'); k.style.background = v ? C.ok : '#CBD0DA'; PUC.setIco(k, v ? 'check' : 'x', '#fff', 20, 3); });
    M.vis($('#hRes'), t, wt('H1', 'Nothing'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#hRes'), run ? 'Runs' : 'Waits'); $('#hRes').className = 'pillp ' + (run ? 'good' : 'bad');
    const t3 = wt('H3', 'Two') - 0.2;
    M.vis($('#h2C'), t, t3, out, { dx: 60, dy: 0, ...o });
    drawSeq([...hg.ins, hg.out], t, t3 + 0.2, 0.3, 0.1); M.vis(hg.body, t, t3 + 0.3, 1e9, { dy: 0, fade: 0.2 }); fadeAt(hgL, t, t3 + 0.4, 0.12);
    [...hg.ins, hg.out].forEach(p => wireC(p, 1));
    M.vis($('#h2P'), t, wt('H3', 'logic') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* I: levels + truth table */
  const iOn = t >= tI - 0.05 && t < tAn + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tAn - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, T0('I3') - 0.2, out, { dx: 60, dy: 0, ...o });
    fadeAt(iLv, t, wt('I1', 'One') - 0.1, 0.15);
    let d = '', first = true; for (let i = 0; i <= 160; i++) { const tau = t - 4 + 4 * i / 160; if (tau < tI + 0.4) continue; const y = Math.floor(tau / 0.8) % 2 ? 120 : 240; d += (first ? 'M' : 'L') + (150 + 560 * i / 160).toFixed(1) + ',' + y; first = false; } PUC.attr(iWave, 'd', d);
    const t2 = wt('I2', 'gate') - 0.1;
    M.vis(iBox, t, t2, 1e9, { dy: 10 });
    const u = M.io((t - wt('I2', 'inputs')) / 0.4), u2 = M.io((t - wt('I2', 'output')) / 0.4);
    iIn[0].set(150, 360, 150 + 130 * u, 360); iIn[1].set(150, 400, 150 + 130 * u, 400); iIn[2].set(500, 375, 500 + 90 * u2, 375);
    PUC.attr(iInL[0], 'y', 348); PUC.attr(iInL[1], 'y', 428); fadeAt(iInL, t, wt('I2', 'inputs') + 0.2, 0.15);
    M.vis($('#iStrip'), t, wt('I2', 'output') + 0.2, 1e9, { dy: 24 });
    M.vis(iT.head, t, T0('I3'), 1e9, { dy: 10 });
    const tr = [wt('I4', 'zero', 0), wt('I4', 'zero', 2), wt('I4', 'one', 1), wt('I4', 'one', 2)];
    iT.rows.forEach((r, k) => M.vis(r, t, tr[k] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#iTag'), t, wt('I4', 'four') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#iTag'), t < wt('I5', 'general') ? '2 INPUTS → 4 ROWS · 3 INPUTS → 8 ROWS' : 'n INPUTS → 2ⁿ ROWS');
  }

  /* B: breadboard */
  const bOn = t >= tAn - 0.05 && t < tS + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tS - 0.32, m = modeAt(t), { a, b, k } = inAt(m, t), y = k < 0 ? (m === 'NOT' ? 1 : 0) : fn[m](a, b), live = k >= 0;
    M.vis($('#ck'), t, tAn + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tAn + 0.3, out, { dx: 60, dy: 0, ...o });
    M.setT($('#ckL'), `CIRCUIT · ${m} GATE`); M.setT($('#ttL'), `${m} · TRUTH TABLE`);
    drawSeq([...com, ...bat], t, tAn + 0.4, 0.4, 0.1); fadeAt([lampC, lampX, lampL, ...batL], t, tAn + 0.8, 0.08);
    const mt = { AND: tAn, OR: tOr, NOT: tNo }[m];
    Object.entries(MG).forEach(([kk, g]) => M.hide(g, kk !== m)); M.vis(MG[m], t, mt + 0.5, 1e9, { dy: 0, fade: 0.25 });
    sA1.set(a); sB1.set(b); sA2.set(a); sB2.set(b); sA3.set(a);
    const lit = live && y; PUC.attr(lampC, 'fill', lit ? AM : '#fff');
    const cond = live && (m === 'NOT' ? 1 : y), fp = m === 'OR' ? (a ? 'top' : 'orB') : m === 'NOT' ? (a ? 'notS' : 'top') : 'top';
    Object.entries(FP).forEach(([kk, f]) => f.set(60 * (t - tAn), cond && kk === fp)); M.vis($('#ckE'), t, ev.AND[0][0], 1e9, { dy: 0, fade: 0.2 });
    // tiles
    M.vis($('#tgA'), t, tAn + 0.8, 1e9, { dy: 10 }); M.vis($('#tgB'), t, tAn + 0.9, tNo - 0.2, { dy: 10, outDur: 0.25 });
    [[$('#tgA'), a], [$('#tgB'), b]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateX(${v ? 30 : 0}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), String(v)); });
    // symbol inset
    Object.entries(SY).forEach(([kk, G]) => { M.hide(G.g, kk !== m); if (kk === m) { M.vis(G.g, t, mt + 0.6, 1e9, { dy: 0, fade: 0.2 }); G.ins.forEach((p, i) => wireC(p, live ? (i ? b : a) : 0)); wireC(G.out, live ? y : 0); } });
    M.vis(syL, t, tAn + 0.7, 1e9, { dy: 0, fade: 0.2 }); M.vis(symLab, t, tAn + 0.7, 1e9, { dy: 0, fade: 0.2 });
    const G = SY[m]; PUC.attr(syA, 'y', G.ys[0] + 8); PUC.attr(syB, 'y', (G.ys[1] ?? -99) + 8); M.hide(syB, m === 'NOT');
    // truth table
    if (ttM !== m) { ttM = m; ttO = ttable($('#ttB'), TT[m].cols, TT[m].rows); $('#ttX').innerHTML = TT[m].x; M.setT($('#ttW'), TT[m].w); }
    M.vis(ttO.head, t, mt + 0.4, 1e9, { dy: 10 });
    ttO.rows.forEach((r, i) => { const e = ev[m].find(([tt, x, z]) => rowOf(m, x, z) === i); const ti = e ? e[0] : 1e9;
      M.vis(r, t, ti - 0.1, 1e9, { dy: 14 }); const yc = r.lastChild; M.vis(yc, t, ti + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const cur = live && rowOf(m, a, b) === i; r.style.background = cur ? C.ac2 : SOFT; r.style.outline = cur ? `2.5px solid ${AM}` : 'none'; });
    M.vis($('#ttBox'), t, TT[m].tw - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#ttW'), t, TT[m].tw, 1e9, { dy: 8 }); PUC.write($('#ttX'), t, TT[m].tx + 0.1, 0.6);
  }

  /* S: scope */
  const sOn2 = t >= tS - 0.05 && t < tT + 0.05; M.hide($('#sS'), !sOn2);
  if (sOn2) {
    const out = tT - 0.3, isOr = t >= tSwap, m = isOr ? 'OR' : 'AND', a = sA(t), b = sB(t), y = sY(t);
    M.vis($('#sL'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, tS + 0.25, out, { dx: 60, dy: 0, ...o });
    M.setT($('#sLL'), `THE GATE · ${m}`);
    Object.entries(SG).forEach(([kk, G]) => { M.hide(G.g, kk !== m); if (kk === m) { M.vis(G.g, t, kk === 'OR' ? tSwap : tS + 0.4, 1e9, { dy: 0, fade: 0.2 }); G.ins.forEach((p, i) => wireC(p, i ? b : a)); wireC(G.out, y); } });
    sChip.forEach(([g, r, v], i) => { M.vis(g, t, tS + 0.5, 1e9, { dy: 0, fade: 0.2 }); const val = i ? b : a; M.setT(v, String(val)); PUC.attr(r, 'fill', val ? C.ac2 : SOFT); PUC.attr(v, 'fill', val ? GD : INK); });
    M.vis(sLamp, t, tS + 0.5, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(sLamp, 'fill', y ? AM : '#fff'); M.vis(sYL, t, tS + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const ex = isOr ? K('Y = A + B') : K('Y = A \\cdot B'); if (sEx._h !== ex) { sEx._h = ex; sEx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:48px;text-align:center">${ex}</div>`; }
    M.vis(sEx, t, tS + 0.6, 1e9, { dy: 0, fade: 0.2 });
    lane(sTr[0], sA, t, 90); lane(sTr[1], sB, t, 200); lane(sTr[2], sY, t, 310);
    M.vis($('#slowT'), t, tS0, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#sP'), t, wt('S3', 'AND'), 1e9, { dy: 10 }); M.setT($('#sP'), isOr ? 'OR: high wherever either is high' : 'AND: high only where both are high');
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'NOT') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W1', 'OR'), wt('W1', 'NOT'), wt('W2', 'AND')];
    ['OR', 'NOT', 'AND'].forEach((kk, i) => { const G = wg[kk]; drawSeq([...G.ins, G.out], t, tg[i] - 0.2, 0.3, 0.08); M.vis(G.body, t, tg[i] - 0.1, 1e9, { dy: 0, fade: 0.2 }); if (G.bub) M.vis(G.bub, t, tg[i], 1e9, { dy: 0, fade: 0.2 }); });
    drawSeq(wLinks, t, tg[2], 0.4, 0.1); fadeAt(wLab, t, tg[0] - 0.2, 0.15); M.vis(wYL, t, tg[2] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wEx, t, wt('W2', 'So'), 1e9, { dy: 10 });
    wIn.forEach((g, i) => M.vis(g, t, tWR[1] + i * 0.4, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    const k3 = t >= tWR[1]; wireC(wg.OR.ins[0], k3 ? 1 : 0); wireC(wg.OR.ins[1], 0); wireC(wg.NOT.ins[0], 0);
    const k4 = t >= tWR[2] + 0.5, k5 = t >= tWR[3] + 0.5, k6 = t >= tWR[4] + 0.3;
    wireC(wg.OR.out, k4 ? 1 : 0); wireC(wLinks[0], k4 ? 1 : 0); wireC(wg.AND.ins[0], k4 ? 1 : 0);
    wireC(wg.NOT.out, k5 ? 1 : 0); wireC(wLinks[1], k5 ? 1 : 0); wireC(wg.AND.ins[1], k5 ? 1 : 0); wireC(wg.AND.out, k6 ? 1 : 0);
    M.vis(wOr, t, tWR[2] + 0.5, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); M.vis(wNot, t, tWR[3] + 0.5, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); M.vis(wY, t, tWR[4] + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'In') - 0.05, tRight: wt('X3', 'For') - 0.2 });
    drawSeq([...xg.ins, xg.out], t, tX + 0.5, 0.3, 0.1); M.vis(xg.body, t, tX + 0.6, 1e9, { dy: 0, fade: 0.2 }); fadeAt(xc, t, tX + 0.8, 0.1);
    M.vis(x2, t, wt('X2', 'two'), 1e9, { dy: 0, fade: 0.2 }); M.draw(x2s, t, wt('X3', 'no'), 0.3); M.vis(x1, t, wt('X3', 'one', 1), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X5', 'J'), wt('X5', 'NEET'), wt('X4', 'P'), wt('X4', 'I')], tType: wt('X6', 'Expect') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'how') - 0.4, tCount, tAns });
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
