// PUC Electronics Ep 54 - Boolean algebra and De Morgan's theorems ("Breadboard" style, Lab Notebook world)
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
const KF = (p, x, y, w, h, tex, fs = 44) => { const f = mk(p, 'foreignObject', { x, y, width: w, height: h }); f.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${fs}px;text-align:center">${K(tex)}</div>`; return f; };
const vchip = (p, x, y, s) => { const g = mk(p, 'g'); const r = mk(g, 'rect', { x: x - 22, y: y - 22, width: 44, height: 40, rx: 8, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); const v = tx(g, x, y + 9, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: GD }); return { g, r, v }; };
const setChip = (ch, v) => { M.setT(ch.v, String(v)); PUC.attr(ch.r, 'fill', v ? C.ac2 : SOFT); PUC.attr(ch.r, 'stroke', v ? AM : '#CBD0DA'); PUC.attr(ch.v, 'fill', v ? GD : INK); };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'finds') - 0.2;
const tR = T0('R1'), tL = T0('L1'), tD = T0('D1'), tB = T0('B1'), tK = T0('K1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= R: Boolean algebra ================= */
$('#ops0').innerHTML = K('A \\cdot B'); $('#ops1').innerHTML = K('A + B'); $('#ops2').innerHTML = K('\\overline{A}');

/* ================= L: laws, switch picture ================= */
const lS = $('#lS');
const loop = mk(lS, 'g');
const lw = [W(loop, 'M90,110 V237'), W(loop, 'M90,273 V400 H690 V285'), W(loop, 'M690,225 V110')];
const bat = [W(loop, 'M62,245 H118', { 'stroke-width': 5 }), W(loop, 'M76,265 H104', { 'stroke-width': 5 })];
tx(loop, 40, 238, '+', { 'text-anchor': 'middle', fill: MU, 'font-size': 22 });
const lamp = mk(loop, 'circle', { cx: 690, cy: 255, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(loop, 'M669,234 L711,276 M711,234 L669,276', { 'stroke-width': 3 });
mono(loop, 734, 262, 'lamp', { 'font-size': 18 });
const PG = mk(loop, 'g'), SG = mk(loop, 'g');
W(PG, 'M90,110 H230 M230,110 V210 M230,110 H330 M430,110 H550 M230,210 H330 M430,210 H550 M550,110 V210 M550,110 H690');
mk(PG, 'circle', { cx: 230, cy: 110, r: 6, fill: INK }); mk(PG, 'circle', { cx: 550, cy: 110, r: 6, fill: INK });
const pA = sw(PG, 330, 110, 430, 110), pE = sw(PG, 330, 210, 430, 210);
tx(PG, 380, 152, 'A', { 'text-anchor': 'middle', 'font-style': 'italic' }); const pEL = tx(PG, 380, 252, '', { 'text-anchor': 'middle' });
W(SG, 'M90,110 H200 M300,110 H420 M520,110 H690');
const sA = sw(SG, 200, 110, 300, 110), sE = sw(SG, 420, 110, 520, 110);
tx(SG, 250, 152, 'A', { 'text-anchor': 'middle', 'font-style': 'italic' }); const sEL = tx(SG, 470, 152, '', { 'text-anchor': 'middle' });
const pTag = mono(loop, 390, 330, '', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 20 });
const NN = mk(lS, 'g');
const nn1 = gate(NN, 'NOT', 230, 255, 90, { lead: 80, leadOut: 70 }), nn2 = gate(NN, 'NOT', nn1.x1 + 60, 255, 90, { lead: 60, leadOut: 80 });
tx(NN, 130, 263, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 28 });
const nnC = [vchip(NN, 180, 210, '0'), vchip(NN, nn1.x1 + 30, 210, '1'), vchip(NN, nn2.x1 - 30, 210, '0')];
const LAWS = [
  ['A + 0 = A', 'L2', 'P', 0], ['A + 1 = 1', 'L3', 'P', 1], ['A \\cdot 0 = 0', 'L4', 'S', 0], ['A \\cdot 1 = A', 'L5', 'S', 1],
  ['A + A = A', 'L6', 'P', 'A'], ['A \\cdot A = A', 'L6', 'S', 'A'], ['A + \\overline{A} = 1', 'L7b', 'P', 'nA'], ['A \\cdot \\overline{A} = 0', 'L8', 'S', 'nA'], ['\\overline{\\overline{A}} = A', 'L9', 'N', 0]];
$('#laws').innerHTML = LAWS.map((l, i) => `<div class="lw" style="left:${32 + (i % 3) * 244}px;top:${84 + Math.floor(i / 3) * 152}px">${K(l[0])}</div>`).join('');
const lawE = [...$('#laws').children];
const lawT = [T0('L2'), T0('L3'), T0('L4'), T0('L5'), T0('L6'), wt('L6', 'dot'), T0('L7'), T0('L8'), T0('L9')];
const lawShow = [T0('L2'), T0('L3'), T0('L4'), T0('L5'), T0('L6'), wt('L6', 'dot'), wt('L7b', 'So'), wt('L8', 'So'), T0('L9')];
const lawAt = t => { let k = -1; lawT.forEach((tt, i) => { if (t >= tt - 0.1) k = i; }); return k; };
const ELAB = { 0: '0 · always open', 1: '1 · always closed', A: 'A', nA: 'Ā' };

/* ================= D: De Morgan ================= */
$('#d1a').innerHTML = K('\\overline{A + B}'); $('#d1b').innerHTML = K('\\overline{A + B} = \\overline{A} \\cdot \\overline{B}');
$('#d2a').innerHTML = K('\\overline{A \\cdot B}'); $('#d2b').innerHTML = K('\\overline{A \\cdot B} = \\overline{A} + \\overline{B}');
const eqGates = (svg, type) => {
  const G = fixOut(ngate(svg, type === 'NOR' ? 'NOR' : 'NAND', 110, 360, 100, { lead: 50, leadOut: 40 }));
  const eq = tx(svg, 372, 374, '=', { 'text-anchor': 'middle', 'font-size': 44 });
  const H = gate(svg, type === 'NOR' ? 'AND' : 'OR', 520, 360, 100, { lead: 70, leadOut: 50 });
  const bx = type === 'NOR' ? 520 - 9 : 520 + 20 - 9;
  const bb = H.ys.map(y => mk(svg, 'circle', { cx: bx, cy: y, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }));
  const lab = [mono(svg, 165, 296, type, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(svg, 575, 296, type === 'NOR' ? 'AND + bubbles' : 'OR + bubbles', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 })];
  return { G, eq, H, bb, lab };
};
const dg1 = eqGates($('#d1S'), 'NOR'), dg2 = eqGates($('#d2S'), 'NAND');

/* ================= B: breadboard proof ================= */
const ck = $('#ckS');
const busA = [W(ck, 'M232,124 H300'), W(ck, 'M300,104 V230'), W(ck, 'M300,104 H400'), W(ck, 'M300,230 H400')];
const busB = [W(ck, 'M232,244 H340'), W(ck, 'M340,144 V310'), W(ck, 'M340,144 H400'), W(ck, 'M340,310 H400')];
const jn = [mk(ck, 'circle', { cx: 300, cy: 124, r: 6, fill: INK }), mk(ck, 'circle', { cx: 340, cy: 244, r: 6, fill: INK })];
const gN = fixOut(ngate(ck, 'NAND', 470, 124, 100, { lead: 70, leadOut: 40 }));
const wN = W(ck, `M${gN.x1},124 H788`);
const gNA = gate(ck, 'NOT', 440, 230, 70, { lead: 40, leadOut: 560 - (440 + 70 * 0.75 + 16) }), gNB = gate(ck, 'NOT', 440, 310, 70, { lead: 40, leadOut: 560 - (440 + 70 * 0.75 + 16) });
const gO = gate(ck, 'OR', 600, 270, 100, { lead: 40, leadOut: 40 });
const jA = W(ck, 'M560,230 V250'), jB = W(ck, 'M560,310 V290'), wO = W(ck, `M${gO.x1},270 H788`);
const lampAt = (y, lab) => { const c = mk(ck, 'circle', { cx: 820, cy: y, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const x = W(ck, `M799,${y - 21} L841,${y + 21} M841,${y - 21} L799,${y + 21}`, { 'stroke-width': 3 }); const l = tx(ck, 868, y + 9, lab, { 'font-style': 'italic' }); return [c, x, l]; };
const L1 = lampAt(124, 'Y₁'), L2 = lampAt(270, 'Y₂');
const topL = mono(ck, 520, 70, 'NAND', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), botL = mono(ck, 660, 218, 'Ā + B̄', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const scR = mk(ck, 'rect', { x: 32, y: 356, width: 864, height: 224, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 356, x2: 32 + 864 * (i + 1) / 8, y2: 580, stroke: '#2A3758', 'stroke-width': 1.5 }));
const BASE = [412, 462, 514, 566];
const scT = [CH1, '#C9D2E3', AM, AM].map((col, i) => mk(ck, 'path', { fill: 'none', stroke: col, 'stroke-width': i > 1 ? 5 : 4, 'stroke-linejoin': 'round' }));
const scL = [mono(ck, 44, 400, 'A', { fill: CH1, 'font-weight': 600 }), mono(ck, 44, 450, 'B', { fill: '#C9D2E3', 'font-weight': 600 }), mono(ck, 44, 502, 'Y₁', { fill: AM, 'font-weight': 600 }), mono(ck, 44, 554, 'Y₂', { fill: AM, 'font-weight': 600 }),
  mono(ck, 884, 376, 'SCOPE · SLOW-MOTION VIEW', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const ev = [[wt('B3', 'Both'), 0, 0], [wt('B4', 'Zero'), 0, 1], [wt('B4', 'One'), 1, 0], [wt('B5', 'Both'), 1, 1]];
const RP = [T0('B7'), tK], RO = [[0, 0], [0, 1], [1, 0], [1, 1]];
const inAt = t => { let a = 0, b = 0, k = -1; ev.forEach(([tt, x, y], i) => { if (t >= tt) { a = x; b = y; k = i; } });
  if (t >= RP[0] + 0.3 && t < RP[1] - 0.3) { const q = RO[Math.floor((t - RP[0] - 0.3) / 1.1) % 4]; a = q[0]; b = q[1]; } return { a, b, k }; };
const sigAt = (tau, ch) => { if (tau < ev[0][0]) return -1; const { a, b } = inAt(tau); return ch === 0 ? a : ch === 1 ? b : 1 - (a & b); };
const lane = (p, ch, t, base) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200, v = sigAt(tau, ch); if (v < 0) { first = true; continue; } const x = 80 + 806 * i / 200, y = base - 30 * v; d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; } PUC.attr(p, 'd', d); };
const TL = [24, 150, 296, 446];
$('#ttB').innerHTML = `<div class="tth" style="top:84px">${['A', 'B', 'NAND', 'Ā + B̄'].map((c, i) => `<span style="left:${TL[i]}px">${c}</span>`).join('')}</div>` +
  RO.map(([a, b], k) => { const y = 1 - (a & b); return `<div class="ttr" style="top:${136 + k * 72}px">${[a, b, y, y].map((v, i) => `<span style="left:${TL[i]}px${i > 1 ? ';color:' + (v ? AM : INK) : ''}">${v}</span>`).join('')}</div>`; }).join('');
const ttHead = $('#ttB .tth'), ttRows = [...$('#ttB').querySelectorAll('.ttr')];
$('#ttX').innerHTML = K('\\overline{A \\cdot B} = \\overline{A} + \\overline{B}');

/* ================= K: back to the fridge ================= */
$('#k1x').innerHTML = K('\\overline{H \\cdot C}'); $('#k2x').innerHTML = K('\\overline{H} + \\overline{C}');
$('#kEq').innerHTML = K('\\overline{H \\cdot C} = \\overline{H} + \\overline{C}');
const kav = PUC.avatar($('#kR'), { x: 36, y: 330, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Same rule, written two ways!' });

/* ================= W: worked example ================= */
const wS = $('#wS');
const w1 = fixOut(ngate(wS, 'NOR', 220, 170, 100, { lead: 60, leadOut: 50 }));
const w2 = gate(wS, 'NOT', 220, 330, 80, { lead: 60, leadOut: 50 });
const w3 = fixOut(ngate(wS, 'NOR', 500, 250, 100, { lead: 70, leadOut: 60 }));
const wIn = [W(wS, 'M84,150 H160'), W(wS, 'M110,150 V330 H160'), W(wS, 'M84,190 H160')], wJ = mk(wS, 'circle', { cx: 110, cy: 150, r: 6, fill: INK });
const wLinks = [W(wS, `M${w1.x1},170 H400 V230 H430`), W(wS, `M${w2.x1},330 H410 V270 H430`)];
const wLab = [tx(wS, 72, 158, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(wS, 72, 198, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(wS, w3.x1 + 10, 260, 'Y', { 'font-style': 'italic', 'font-size': 26 })];
const wGl = [mono(wS, 275, 112, 'A + B, barred', { 'text-anchor': 'middle', 'font-size': 17 }), mono(wS, 265, 392, 'Ā', { 'text-anchor': 'middle', 'font-size': 20, fill: INK, 'font-weight': 600 })];
const wC = [vchip(wS, 130, 112, '1'), vchip(wS, 60, 232, '0'), vchip(wS, 372, 140, '0'), vchip(wS, 372, 300, '0'), vchip(wS, w3.x1 - 30, 214, '1')];
const wEx = KF(wS, 36, 450, 712, 90, 'Y = \\overline{\\overline{A + B} + \\overline{A}}', 46);
const wEx2 = KF(wS, 36, 450, 712, 90, 'Y = \\overline{\\overline{A + B} + \\overline{A}} = A', 46);
const wRows = rows($('#wSteps'), [
  [K('Y = \\overline{\\overline{A + B}} \\cdot \\overline{\\overline{A}}'), 'break the bar, + to ·', 92],
  [K('Y = (A + B) \\cdot A'), 'two bars cancel', 186],
  [K('Y = A + A \\cdot B'), 'A · A = A', 280],
  [K('Y = A\\,(1 + B)'), 'take A out', 374],
  [K('Y = A \\cdot 1 = A'), '1 + B = 1', 484]]);
const tWR = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: K('\\overline{A + B} = \\overline{A} + \\overline{B}') + ' (sign not changed)', right: K('\\overline{A + B} = \\overline{A} \\cdot \\overline{B}') + ' (change the sign too)', y0: 96, y1: 184 });
$('#tcA').innerHTML = K('\\overline{A + B} = \\overline{1 + 0} = 0') + `<span style="font:600 24px Poppins;color:${C.mute};margin-left:20px">true value</span>`;
$('#tcB').innerHTML = K('\\overline{A} + \\overline{B} = 0 + 1 = 1') + `<span style="font:600 24px Poppins;color:${C.red};margin-left:20px">wrong</span>`;
$('#tcC').innerHTML = K('\\overline{A} \\cdot \\overline{B} = 0 \\cdot 1 = 0') + `<span style="font:600 24px Poppins;color:${C.ok};margin-left:20px">right</span>`;
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS', 'ISC BOARDS'], type: 'State and prove both theorems; simplify gate circuits (JEE Main: 17 Mar 2021 Shift 2)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Simplify ' + K('Y = \\overline{\\overline{A}\\,B} \\cdot \\overline{A\\,\\overline{B}}') + '. Which option equals Y?', qW: 720,
  opts: [K('A\\overline{B} + \\overline{A}B'), K('AB + \\overline{A}\\,\\overline{B}'), K('\\overline{A} + B'), K('0')], right: 1, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K('\\overline{\\overline{A}B} = A + \\overline{B}')], [K('\\overline{A\\overline{B}} = \\overline{A} + B')], [K('Y = (A + \\overline{B})(\\overline{A} + B)')], [K('A\\overline{A} = 0,\\ B\\overline{B} = 0')], [K('Y = AB + \\overline{A}\\,\\overline{B}')]], { dy: 96, y0: 100 });
const tSol = [wt('A2', 'Break'), wt('A2', 'change'), wt('A3', 'We'), wt('A4', 'Multiply'), wt('A5', 'What')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 66, title: 'Boolean algebra · fact card', txt: [1, 1, 1, 1, 1, 1],
  lines: [K('A + 0 = A,\\quad A + 1 = 1,\\quad A \\cdot 0 = 0,\\quad A \\cdot 1 = A'), K('A + A = A,\\quad A \\cdot A = A,\\quad \\overline{\\overline{A}} = A'), K('A + \\overline{A} = 1,\\quad A \\cdot \\overline{A} = 0'),
    'De Morgan 1: ' + K('\\overline{A + B} = \\overline{A} \\cdot \\overline{B}'), 'De Morgan 2: ' + K('\\overline{A \\cdot B} = \\overline{A} + \\overline{B}'), 'Break the line, change the sign'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 55', topic: 'XOR and XNOR Gates', y: 774 });

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
    M.vis($('#h1C'), t, wt('H2', 'Rule') - 0.3, out, { dx: 60, dy: 0, ...o }); M.rise($('#h1T'), t, wt('H2', 'No') - 0.1, { st: 0.04 });
    M.vis($('#h2C'), t, wt('H3', 'Rule') - 0.3, out, { dx: 60, dy: 0, ...o }); M.rise($('#h2T'), t, wt('H3', 'No') - 0.1, { st: 0.04 });
    M.vis($('#hQ'), t, wt('H4', 'Same') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
  }

  /* R: Boolean algebra */
  const rOn = t >= tR - 0.05 && t < tL + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tL - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, wt('R4', 'three') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#bv1'), t, wt('R1', 'two') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#bv0'), t, wt('R1', 'zero') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    [['#bv1', 'One'], ['#bv0', 'Zero']].forEach(([s, w]) => { const on = t >= wt('R2', w) - 0.05 && t < wt('R2', w) + 1.3; $(s).style.background = on ? C.ac2 : SOFT; });
    M.vis($('#who'), t, wt('R3', 'named') - 0.1, 1e9, { dy: 16 });
    ['AND', 'OR', 'NOT'].forEach((w, i) => { M.vis($('#op' + i), t, wt('R4', w) - 0.1, 1e9, { dy: 16 }); PUC.write($('#ops' + i), t, i < 2 ? wt('R5', i ? 'OR' : 'AND') : wt('R6', 'NOT'), 0.5);
      M.vis($('#op' + i).querySelector('.m'), t, i < 2 ? wt('R5', i ? 'plus' : 'dot') : wt('R6', 'bar'), 1e9, { dx: -10, dy: 0 }); });
    M.vis($('#rStrip'), t, T0('R7') - 0.1, 1e9, { dy: 24 });
  }

  /* L: laws */
  const lOn = t >= tL - 0.05 && t < tD + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tD - 0.32, k = lawAt(t), L = LAWS[Math.max(0, k)], mode = k < 0 ? 'P' : L[2], el = k < 0 ? 0 : L[3];
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, tL + 0.25, out, { dx: 60, dy: 0, ...o });
    const seg = k < 0 ? tL : lawT[k], A = Math.max(0, Math.floor((t - seg - 0.4) / 1.0)) % 2 === 1 ? 1 : 0;
    const ev2 = el === 'A' ? A : el === 'nA' ? 1 - A : el;
    M.vis(loop, t, tL + 0.3, 1e9, { dy: 0, fade: 0.25 }); if (mode === 'N') M.hide(loop, true); M.hide(NN, mode !== 'N');
    M.hide(PG, mode !== 'P'); M.hide(SG, mode !== 'S');
    pA.set(A); pE.set(ev2); sA.set(A); sE.set(ev2); M.setT(pEL, k < 0 ? '' : ELAB[el]); M.setT(sEL, k < 0 ? '' : ELAB[el]);
    PUC.attr(pEL, 'font-style', el === 'A' || el === 'nA' ? 'italic' : 'normal'); PUC.attr(sEL, 'font-style', el === 'A' || el === 'nA' ? 'italic' : 'normal');
    M.hide(pE.g, k < 0); M.hide(pEL, k < 0); if (k < 0) { PUC.attr(pE.g, 'opacity', 1); }
    const Y = mode === 'N' ? A : mode === 'P' ? (A | ev2) : (A & ev2);
    PUC.attr(lamp, 'fill', Y ? AM : '#fff');
    M.setT(pTag, k < 0 ? '' : mode === 'P' ? 'SIDE BY SIDE = OR ( + )' : 'IN A LINE = AND ( · )');
    M.setT($('#lrAv'), String(A)); M.setT($('#lrYv'), mode === 'N' ? '-' : String(Y)); $('#lrYv').style.color = Y && mode !== 'N' ? AM : INK; $('#lrAv').style.color = A ? AM : INK;
    M.vis($('#lrA'), t, wt('L1', 'switches'), 1e9, { dy: 10 }); M.vis($('#lrY'), t, wt('L1', 'lamp'), 1e9, { dy: 10 });
    M.setT($('#lLL'), mode === 'N' ? 'FLIP TWICE' : 'THE SWITCH PICTURE');
    if (mode === 'N') { const v = [A, 1 - A, A]; nnC.forEach((c, i) => setChip(c, v[i])); [nn1.ins[0]].forEach(p => wireC(p, A)); wireC(nn1.out, 1 - A); wireC(nn2.ins[0], 1 - A); wireC(nn2.out, A); }
    if ($('#lX')._k !== k) { $('#lX')._k = k; $('#lX').innerHTML = k < 0 ? '' : K(L[0]); }
    M.vis($('#lX'), t, k < 0 ? 1e9 : lawT[k], 1e9, { dy: 10 });
    lawE.forEach((e, i) => { M.vis(e, t, lawShow[i] - 0.1, 1e9, { dy: 16 }); const cur = i === k || (k === 5 && i === 5); e.style.borderColor = i === k ? AM : SOFT; e.style.background = i === k ? C.ac2 : SOFT; });
  }

  /* D: De Morgan */
  const dOn = t >= tD - 0.05 && t < tB + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tB - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, T0('D3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dWho'), t, wt('D2', 'named') - 0.1, wt('D3', 'plus') - 0.4, { dy: 16, outDur: 0.25, ody: 0 });
    M.vis($('#d1a'), t, wt('D3', 'plus') - 0.1, wt('D3', 'equals') - 0.1, { dy: 10, outDur: 0.15, ody: 0 }); PUC.write($('#d1b'), t, wt('D3', 'equals') - 0.05, 0.7);
    M.vis($('#d2a'), t, wt('D5', 'dot') - 0.1, wt('D5', 'equals') - 0.1, { dy: 10, outDur: 0.15, ody: 0 }); PUC.write($('#d2b'), t, wt('D5', 'equals') - 0.05, 0.7);
    const mn = t >= T0('D7') + 0.3;
    M.setT($('#d1t'), mn ? 'break the line, change the sign' : 'break the bar · + becomes ·'); M.setT($('#d2t'), mn ? 'break the line, change the sign' : 'break the bar · · becomes +');
    ['#d1t', '#d2t'].forEach((s, i) => { M.vis($(s), t, i ? T0('D6') : T0('D4'), 1e9, { dy: 10 }); $(s).style.color = mn ? GD : C.mute; });
    [[dg1, T0('D8'), '#dS1'], [dg2, T0('D9'), '#dS2']].forEach(([g, tg, st]) => {
      drawSeq([...g.G.ins, g.G.out], t, tg + 0.1, 0.3, 0.08); M.vis(g.G.body, t, tg + 0.15, 1e9, { dy: 0, fade: 0.2 }); M.vis(g.G.bub, t, tg + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(g.lab[0], t, tg + 0.1, 1e9, { dy: 0, fade: 0.2 });
      M.vis(g.eq, t, tg + 0.5, 1e9, { dy: 0, fade: 0.2 });
      drawSeq([...g.H.ins, g.H.out], t, tg + 0.7, 0.3, 0.08); M.vis(g.H.body, t, tg + 0.75, 1e9, { dy: 0, fade: 0.2 }); g.bb.forEach((b, i) => M.vis(b, t, wt(tg === T0('D8') ? 'D8' : 'D9', 'bubbled') + i * 0.1, 1e9, { dy: 0, fade: 0.15 })); M.vis(g.lab[1], t, tg + 0.8, 1e9, { dy: 0, fade: 0.2 });
      M.vis($(st), t, wt(tg === T0('D8') ? 'D8' : 'D9', 'bubbled') + 0.2, 1e9, { dy: 24 }); });
  }

  /* B: breadboard proof */
  const bOn = t >= tB - 0.05 && t < tK + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tK - 0.32, { a, b, k } = inAt(t), live = k >= 0, y = 1 - (a & b);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([$('#tgA'), $('#tgB')], t, tB + 0.4, 0.1);
    [[$('#tgA'), a], [$('#tgB'), b]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateX(${v ? 30 : 0}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), String(v)); });
    const tTop = wt('B2', 'NAND') - 0.3, tBot = wt('B2', 'Below') - 0.1;
    drawSeq([...busA, ...busB], t, tB + 0.5, 0.25, 0.05); fadeAt(jn, t, tB + 0.8, 0.05);
    drawSeq([...gN.ins, gN.out, wN], t, tTop, 0.3, 0.06); M.vis(gN.body, t, tTop + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(gN.bub, t, tTop + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(topL, t, tTop + 0.2, 1e9, { dy: 0, fade: 0.2 });
    [gNA, gNB].forEach((G, i) => { drawSeq([...G.ins, G.out], t, tBot + i * 0.15, 0.3, 0.06); M.vis(G.body, t, tBot + i * 0.15 + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(G.bub, t, tBot + i * 0.15 + 0.15, 1e9, { dy: 0, fade: 0.2 }); });
    drawSeq([jA, jB, ...gO.ins, gO.out, wO], t, wt('B2', 'OR') - 0.2, 0.25, 0.05); M.vis(gO.body, t, wt('B2', 'OR') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(botL, t, wt('B2', 'OR'), 1e9, { dy: 0, fade: 0.2 });
    [...L1, ...L2].forEach((e, i) => M.vis(e, t, tB + 0.9 + (i > 2 ? 0.1 : 0), 1e9, { dy: 0, fade: 0.2 }));
    PUC.attr(L1[0], 'fill', live && y ? AM : '#fff'); PUC.attr(L2[0], 'fill', live && y ? AM : '#fff');
    busA.forEach(p => wireC(p, live && a)); busB.forEach(p => wireC(p, live && b));
    wireC(gN.ins[0], live && a); wireC(gN.ins[1], live && b); wireC(gN.out, live && y); wireC(wN, live && y);
    wireC(gNA.ins[0], live && a); wireC(gNB.ins[0], live && b); wireC(gNA.out, live && !a); wireC(gNB.out, live && !b); wireC(jA, live && !a); wireC(jB, live && !b);
    wireC(gO.ins[0], live && !a); wireC(gO.ins[1], live && !b); wireC(gO.out, live && y); wireC(wO, live && y);
    [scR, ...scG].forEach(e => M.vis(e, t, tB + 1.0, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, tB + 1.1, 0.08);
    scT.forEach((p, i) => lane(p, Math.min(i, 2), t, BASE[i]));
    M.vis(ttHead, t, tB + 0.5, 1e9, { dy: 10 });
    ttRows.forEach((r, i) => { const e = ev[i]; M.vis(r, t, e[0] - 0.1, 1e9, { dy: 14 }); M.vis(r.children[2], t, e[0] + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis(r.children[3], t, e[0] + 0.9, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const cur = live && a * 2 + b === i; r.style.background = cur ? C.ac2 : SOFT; r.style.outline = cur ? `2.5px solid ${AM}` : 'none'; });
    M.vis($('#ttBox'), t, T0('B6') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#ttX'), t, wt('B6', 'match'), 0.6);
    M.setT($('#ttW'), t >= T0('B8') ? 'theorem 1: same test with NOR on top' : 'all four rows match'); M.vis($('#ttW'), t, wt('B6', 'So'), 1e9, { dy: 8 });
  }

  /* K: back to the fridge */
  const kOn = t >= tK - 0.05 && t < tT + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tT - 0.3;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, T0('K4') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kH'), t, wt('K1', 'H') - 0.1, 1e9, { dy: 16 }); M.vis($('#k1'), t, T0('K2'), 1e9, { dy: 16 }); M.vis($('#k2'), t, T0('K3'), 1e9, { dy: 16 });
    PUC.write($('#k1x'), t, wt('K2', 'H'), 0.6); PUC.write($('#k2x'), t, wt('K3', 'H'), 0.6);
    PUC.write($('#kEq'), t, wt('K4', 'equal') - 0.2, 0.7); kav(t, wt('K4', 'Both')); M.vis($('#kStrip'), t, wt('K4', 'same') - 0.1, 1e9, { dy: 24 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Change') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32, tg = tW + 0.3, chk = t >= T0('W7');
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...wIn, ...w1.ins, w1.out], t, tg, 0.25, 0.05); M.vis(w1.body, t, tg + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(w1.bub, t, tg + 0.25, 1e9, { dy: 0, fade: 0.2 }); M.vis(wJ, t, tg + 0.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...w2.ins, w2.out], t, tg + 0.4, 0.25, 0.05); M.vis(w2.body, t, tg + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(w2.bub, t, tg + 0.55, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...wLinks, ...w3.ins, w3.out], t, tg + 0.7, 0.3, 0.06); M.vis(w3.body, t, tg + 0.9, 1e9, { dy: 0, fade: 0.2 }); M.vis(w3.bub, t, tg + 0.95, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(wLab, t, tg + 0.3, 0.2); fadeAt(wGl, t, tg + 0.9, 0.15);
    M.vis(wEx, t, wt('W1', 'Simplify') - 0.1, wt('W6', 'just') - 0.1, { dy: 10, outDur: 0.1, ody: 0 }); M.vis(wEx2, t, wt('W6', 'just') - 0.1, 1e9, { dy: 0, fade: 0.1 });
    const vA = chk ? 1 : 0, vB = 0;
    wC.forEach((c, i) => M.vis(c.g, t, [wt('W7', 'A'), wt('W7', 'B'), wt('W7', 'circuit') - 0.4, wt('W7', 'circuit') - 0.2, wt('W7', 'gives')][i], 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    [...wIn.slice(0, 2), w1.ins[0], ...w2.ins].forEach(p => wireC(p, vA)); [wIn[2], w1.ins[1]].forEach(p => wireC(p, vB));
    [w1.out, w2.out, ...wLinks, ...w3.ins].forEach(p => wireC(p, 0)); wireC(w3.out, chk && t >= wt('W7', 'gives') ? 1 : 0);
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X6', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X3', 'They') - 0.05, tStrike: wt('X5', 'wrong') - 0.05, tRight: wt('X5', 'Change') - 0.1 });
    M.vis($('#tcA'), t, wt('X4', 'true') - 0.1, 1e9, { dy: 10 }); M.vis($('#tcB'), t, wt('X5', 'wrong') - 0.1, 1e9, { dy: 10 }); M.vis($('#tcC'), t, wt('X5', 'Change'), 1e9, { dy: 10 });
    where(t, { tin: wt('X6', 'Where') - 0.2, tLight: [wt('X7', 'J'), wt('X6', 'P'), wt('X6', 'I')], tType: wt('X8', 'Expect') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.75, tF + 1.1, tF + 1.45, tF + 1.8, tF + 2.15], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
