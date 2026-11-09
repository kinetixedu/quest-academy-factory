// PUC Electronics Ep 56 - Half adder and full adder ("Breadboard" style, Lab Notebook world)
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
const xgate = (p, x, y, s, o = {}) => { const G = gate(p, 'OR', x, y, s, o); const h = s * 0.8;
  G.ex = mk(G.g, 'path', { d: `M${x - s * 0.13},${y - h / 2} Q${x - s * 0.13 + s * 0.28},${y} ${x - s * 0.13},${y + h / 2}`, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }); return G; };
const box = (p, x, y, w, h, label) => { const g = mk(p, 'g'); const r = mk(g, 'rect', { x, y, width: w, height: h, rx: 12, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const l = mono(g, x + w / 2, y + h / 2 + 7, label, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }); return { g, r, l }; };
/* full adder from two half adders: block diagram */
const faDiag = svg => {
  const h1 = box(svg, 150, 100, 150, 140, 'HALF ADDER 1'), h2 = box(svg, 400, 260, 150, 140, 'HALF ADDER 2');
  const port = (g, x, y, s, a) => mono(g, x, y, s, { 'text-anchor': a, 'font-size': 16, fill: MU, 'font-weight': 600 });
  [port(h1.g, 160, 135, 'A', 'start'), port(h1.g, 160, 215, 'B', 'start'), port(h1.g, 290, 135, 'S', 'end'), port(h1.g, 290, 215, 'C', 'end'),
    port(h2.g, 410, 295, 'A', 'start'), port(h2.g, 410, 375, 'B', 'start'), port(h2.g, 540, 295, 'S', 'end'), port(h2.g, 540, 375, 'C', 'end')];
  const wA = W(svg, 'M70,130 H150'), wB = W(svg, 'M70,210 H150'), wCin = W(svg, 'M70,370 H400');
  const wS1 = W(svg, 'M300,130 H370 V290 H400'), wC1 = W(svg, 'M300,210 H340 V468 H580'), wC2 = W(svg, 'M550,370 H560 V432 H580');
  const wS = W(svg, 'M550,290 H716');
  const og = gate(svg, 'OR', 620, 450, 80, { lead: 40, leadOut: 26 });
  const lab = [tx(svg, 58, 138, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(svg, 58, 218, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }),
    tx(svg, 58, 378, 'Cᵢₙ', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(svg, 726, 298, 'S', { 'font-style': 'italic', 'font-size': 26 }), tx(svg, og.x1 - 30, 520, 'Cₒᵤₜ', { 'font-style': 'italic', 'font-size': 26, 'text-anchor': 'middle' })];
  const gl = [mono(svg, 372, 120, 'S₁', { 'font-size': 18, fill: INK, 'font-weight': 600 }), mono(svg, 312, 200, 'C₁', { 'font-size': 18, fill: INK, 'font-weight': 600 }), mono(svg, 568, 360, 'C₂', { 'font-size': 18, fill: INK, 'font-weight': 600 })];
  return { h1, h2, wA, wB, wCin, wS1, wC1, wC2, wS, og, lab, gl };
};
const runFA = (d, t, ts, wireC, v) => { // ts = [tHA1, tHA2, tOR]
  M.vis(d.h1.g, t, ts[0], 1e9, { dy: 0, fade: 0.25 }); drawSeq([d.wA, d.wB], t, ts[0] - 0.1, 0.3, 0.08); fadeAt(d.lab.slice(0, 2), t, ts[0], 0.1);
  M.vis(d.h2.g, t, ts[1], 1e9, { dy: 0, fade: 0.25 }); drawSeq([d.wS1, d.wCin, d.wS], t, ts[1] - 0.1, 0.35, 0.1); fadeAt([d.lab[2], d.lab[3], d.gl[0]], t, ts[1] + 0.2, 0.1);
  drawSeq([d.wC1, d.wC2, ...d.og.ins, d.og.out], t, ts[2] - 0.1, 0.3, 0.06); M.vis(d.og.body, t, ts[2], 1e9, { dy: 0, fade: 0.2 }); fadeAt([d.lab[4], d.gl[1], d.gl[2]], t, ts[2] + 0.2, 0.1);
  if (v) { const [A, B, Ci] = v, s1 = A ^ B, c1 = A & B, s = s1 ^ Ci, c2 = s1 & Ci; wireC(d.wA, A); wireC(d.wB, B); wireC(d.wCin, Ci); wireC(d.wS1, s1); wireC(d.wC1, c1); wireC(d.og.ins[1], c1); wireC(d.wC2, c2); wireC(d.og.ins[0], c2); wireC(d.wS, s); wireC(d.og.out, c1 | c2); }
  else [d.wA, d.wB, d.wCin, d.wS1, d.wC1, d.wC2, d.wS, ...d.og.ins, d.og.out].forEach(p => wireC(p, 0));
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'adds') - 0.2;
const tR = T0('R1'), tB = T0('B1'), tG = T0('G1'), tJ = T0('J1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= R: one column ================= */
const rS = $('#rS');
const rT = [tx(rS, 350, 150, '1', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 36, fill: AM }), tx(rS, 420, 240, '1', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 72 }),
  tx(rS, 300, 330, '+', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 72 }), tx(rS, 420, 330, '1', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 72 })];
const rLine = W(rS, 'M270,360 H460', { 'stroke-width': 5 });
const rRes = [tx(rS, 350, 450, '1', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 72, fill: AM }), tx(rS, 420, 450, '0', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 72 })];
const rAn = [mono(rS, 300, 430, 'carry bit →', { 'text-anchor': 'end', fill: GD, 'font-weight': 600, 'font-size': 22 }), mono(rS, 470, 430, '← sum bit', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(rS, 380, 540, 'one plus one = two = 10 in binary', { 'text-anchor': 'middle', 'font-size': 20 })];

/* ================= B: half adder breadboard ================= */
const ck = $('#ckS');
const busA = [W(ck, 'M232,116 H300'), W(ck, 'M300,88 V210'), W(ck, 'M300,88 H370'), W(ck, 'M300,210 H430')];
const busB = [W(ck, 'M232,204 H340'), W(ck, 'M340,132 V250'), W(ck, 'M340,132 H370'), W(ck, 'M340,250 H430')];
const jn = [mk(ck, 'circle', { cx: 300, cy: 116, r: 6, fill: INK }), mk(ck, 'circle', { cx: 340, cy: 204, r: 6, fill: INK })];
const gX = xgate(ck, 430, 110, 110, { lead: 0, leadOut: 0 }), gA = gate(ck, 'AND', 430, 230, 100, { lead: 0, leadOut: 0 });
const wSo = W(ck, `M${gX.ox},110 H762`), wCo = W(ck, `M${gA.ox},230 H762`);
const xIn = [W(ck, 'M370,88 H444'), W(ck, 'M370,132 H444')]; // leads through the extra curve to the OR body
const lampAt = (y, lab) => { const c = mk(ck, 'circle', { cx: 790, cy: y, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const x = W(ck, `M771,${y - 19} L809,${y + 19} M809,${y - 19} L771,${y + 19}`, { 'stroke-width': 3 }); const l = mono(ck, 830, y + 7, lab, { fill: INK, 'font-weight': 600 }); return [c, x, l]; };
const LS = lampAt(110, 'SUM'), LC = lampAt(230, 'CARRY');
const gLab = [mono(ck, 490, 58, 'XOR', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(ck, 480, 290, 'AND', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 })];
const scR = mk(ck, 'rect', { x: 32, y: 312, width: 864, height: 260, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 312, x2: 32 + 864 * (i + 1) / 8, y2: 572, stroke: '#2A3758', 'stroke-width': 1.5 }));
const BASE = [370, 428, 494, 556];
const scT = [CH1, '#C9D2E3', AM, AM].map((col, i) => mk(ck, 'path', { fill: 'none', stroke: col, 'stroke-width': i > 1 ? 5 : 4, 'stroke-linejoin': 'round' }));
const scL = [mono(ck, 44, 358, 'A', { fill: CH1, 'font-weight': 600 }), mono(ck, 44, 416, 'B', { fill: '#C9D2E3', 'font-weight': 600 }), mono(ck, 44, 482, 'S', { fill: AM, 'font-weight': 600 }), mono(ck, 44, 544, 'C', { fill: AM, 'font-weight': 600 }),
  mono(ck, 884, 330, 'SCOPE · SLOW-MOTION VIEW', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const ev = [[wt('B4', 'Zero'), 0, 0], [wt('B5', 'Zero'), 0, 1], [wt('B5', 'one', 1), 1, 0], [wt('B6', 'One'), 1, 1]];
const RP = [T0('B7'), tG], RO = [[0, 0], [0, 1], [1, 0], [1, 1]];
const inAt = t => { let a = 0, b = 0, k = -1; ev.forEach(([tt, x, y], i) => { if (t >= tt) { a = x; b = y; k = i; } });
  if (t >= RP[0] + 0.3 && t < RP[1] - 0.3) { const q = RO[Math.floor((t - RP[0] - 0.3) / 1.1) % 4]; a = q[0]; b = q[1]; } return { a, b, k }; };
const sigAt = (tau, ch) => { if (tau < ev[0][0]) return -1; const { a, b } = inAt(tau); return [a, b, a ^ b, a & b][ch]; };
const lane = (p, ch, t, base) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200, v = sigAt(tau, ch); if (v < 0) { first = true; continue; } const x = 80 + 806 * i / 200, y = base - 34 * v; d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; } PUC.attr(p, 'd', d); };
const TL = [24, 150, 296, 446];
$('#ttB').innerHTML = `<div class="tth" style="top:84px">${['A', 'B', 'SUM', 'CARRY'].map((c, i) => `<span style="left:${TL[i]}px">${c}</span>`).join('')}</div>` +
  RO.map(([a, b], k) => `<div class="ttr" style="top:${136 + k * 72}px">${[a, b, a ^ b, a & b].map((v, i) => `<span style="left:${TL[i]}px${i > 1 ? ';color:' + (v ? AM : INK) : ''}">${v}</span>`).join('')}</div>`).join('');
const ttHead = $('#ttB .tth'), ttRows = [...$('#ttB').querySelectorAll('.ttr')];
$('#ttX').innerHTML = K('S = A \\oplus B,\\quad C = A \\cdot B');
const colBox = document.createElement('div'); colBox.className = 'hbox'; colBox.style.cssText = 'top:128px;height:286px;width:132px;background:none;border:3px dashed ' + AM; $('#tt').appendChild(colBox);

/* ================= G: full adder ================= */
const gS = $('#gS');
const fBox = box(gS, 260, 100, 260, 200, '');
const fL = tx(gS, 390, 210, 'HALF ADDER', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26, 'font-weight': 600 });
const fIn = [W(gS, 'M110,140 H260'), W(gS, 'M110,200 H260')], fCin = W(gS, 'M110,260 H260'), fOut = [W(gS, 'M520,160 H670'), W(gS, 'M520,240 H670')];
const fLab = [tx(gS, 96, 148, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(gS, 96, 208, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(gS, 684, 168, 'S', { 'font-style': 'italic', 'font-size': 26 }), tx(gS, 684, 248, 'Cₒᵤₜ', { 'font-style': 'italic', 'font-size': 26 })];
const fCinL = tx(gS, 96, 268, 'Cᵢₙ', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), fQ = mono(gS, 185, 248, 'carry in?', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 18 });
$('#gF1').innerHTML = K('S = A \\oplus B \\oplus C_{in}'); $('#gF2').innerHTML = K('C_{out} = AB + C_{in}(A \\oplus B)');
const RO3 = [...Array(8)].map((_, k) => [k >> 2 & 1, k >> 1 & 1, k & 1]);
const TL5 = [10, 120, 230, 350, 470];
$('#gT').innerHTML = `<div class="tth" style="top:84px">${['A', 'B', 'Cᵢₙ', 'S', 'Cₒᵤₜ'].map((c, i) => `<span style="left:${TL5[i]}px">${c}</span>`).join('')}</div>` +
  RO3.map(([a, b, c], k) => { const s = a ^ b ^ c, co = (a & b) | (c & (a ^ b)); return `<div class="ttr" style="top:${138 + k * 56}px">${[a, b, c, s, co].map((v, i) => `<span style="left:${TL5[i]}px${i > 2 ? ';color:' + (v ? AM : INK) : ''}">${v}</span>`).join('')}</div>`; }).join('');
const gHead = $('#gT .tth'), gRows = [...$('#gT').querySelectorAll('.ttr')];

/* ================= J: two half adders ================= */
const jD = faDiag($('#jS'));
const jRows = rows($('#jSteps'), [
  [K('S_1 = A \\oplus B,\\ C_1 = AB'), 'half adder 1', 92], [K('S = S_1 \\oplus C_{in}'), 'half adder 2', 186], [K('C_2 = S_1 \\cdot C_{in}'), '', 280],
  [K('C_{out} = C_1 + C_2'), 'OR gate', 374], ['4 full adders = 4-bit adder', '', 484]]);
const tJR = [T0('J2'), wt('J3', 'sum', 1), wt('J3', 'gives') , T0('J4'), wt('J6', 'Chain')];

/* ================= W: worked example ================= */
const wD = faDiag($('#wS'));
const wC = [vchip($('#wS'), 100, 106, '1'), vchip($('#wS'), 100, 186, '1'), vchip($('#wS'), 100, 346, '1'), vchip($('#wS'), 400, 140, '0'), vchip($('#wS'), 300, 268, '1'), vchip($('#wS'), 660, 266, '1'), vchip($('#wS'), 600, 360, '0'), vchip($('#wS'), 740, 420, '1')];
const wRows = rows($('#wSteps'), [
  [K('A = B = C_{in} = 1'), 'inputs', 92],
  [K('1 + 1:\\ S_1 = 0,\\ C_1 = 1'), 'half adder 1', 186],
  [K('0 + 1:\\ S = 1,\\ C_2 = 0'), 'half adder 2', 280],
  [K('C_{out} = 1 + 0 = 1'), 'OR gate', 374],
  [K('C_{out}\\,S = 11_2 = 3'), '1 + 1 + 1 = 3', 484]]);
const tWR = [T0('W2'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Half adder sum = ' + K('A + B') + ' (an OR gate)', right: 'Half adder sum = ' + K('A \\oplus B') + ' (an XOR gate)', y0: 96, y1: 184 });
$('#tcA').innerHTML = 'OR: ' + K('1 + 1 = 1') + `<span style="font:600 24px Poppins;color:${C.red};margin-left:20px">wrong sum</span>`;
$('#tcB').innerHTML = 'XOR: ' + K('1 \\oplus 1 = 0') + `<span style="font:600 24px Poppins;color:${C.ok};margin-left:20px">sum 0, carry 1</span>`;
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'ISC BOARDS'], type: 'Truth tables; sum and carry formulas; full adder from two half adders' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'Add binary 11 and 01. A half adder adds the right bits and a full adder adds the left bits. What is the answer?', qW: 780,
  opts: ['010', '100', '110', '011'], right: 1, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K('1 + 1:\\ S_0 = 0,\\ C = 1'), 'half adder'], [K('1 + 0 + 1'), 'full adder'], [K('S_1 = 0,\\ C_{out} = 1')], [K('100_2 = 4'), '3 + 1 = 4']], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Right'), wt('A3', 'Left'), wt('A4', 'gives'), wt('A5', 'answer')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 66, title: 'Adders · fact card', txt: [1, 1, 1, 1, 1, 1],
  lines: ['Half adder: ' + K('S = A \\oplus B,\\ C = A \\cdot B') + ' · 1 XOR + 1 AND', 'Full adder: ' + K('S = A \\oplus B \\oplus C_{in}'), K('C_{out} = AB + C_{in}(A \\oplus B)'),
    'Full adder = 2 half adders + 1 OR gate', 'Binary: 1 + 1 = 10 (sum 0, carry 1)', 'Chain n full adders to add two n-bit numbers'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 57', topic: 'Flip-Flops: SR, JK and D', y: 774 });

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
    M.vis($('#h1C'), t, wt('H1', 'seven') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hN1'), t, wt('H1', 'seven'), 1e9, { dy: 14 }); M.vis($('#hRs'), t, wt('H1', 'writes'), 1e9, { dy: 14 }); M.vis($('#hCy'), t, wt('H1', 'carries'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#hAn'), t, wt('H1', 'carries') + 0.2, 1e9, { dy: 10 });
    M.vis($('#h2C'), t, wt('H2', 'calculator') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.count($('#hDp'), t, wt('H2', 'twelve') - 0.1, 0.4, 0, 12);
    ['#g0', '#g1', '#g2', '#g3'].forEach((s, i) => M.vis($(s), t, wt('H2', 'Inside') + i * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 })); M.vis($('#hG'), t, wt('H2', 'logic'), 1e9, { dy: 10 });
  }

  /* R: binary addition */
  const rOn = t >= tR - 0.05 && t < tB + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tB - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, T0('R3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#b0'), t, T0('R2'), 1e9, { dy: 14 }); M.vis($('#b1'), t, wt('R2', 'Zero', 2), 1e9, { dy: 14 }); M.vis($('#b2'), t, T0('R3'), 1e9, { dy: 14 });
    M.vis($('#b2').querySelector('.nt'), t, wt('R3', 'binary'), 1e9, { dx: -10, dy: 0 }); $('#b2').style.background = t >= wt('R3', 'binary') ? C.ac2 : SOFT;
    fadeAt(rT.slice(1), t, T0('R3') + 0.1, 0.12); M.draw(rLine, t, T0('R3') + 0.5, 0.4);
    M.vis(rRes[1], t, wt('R4', 'zero'), 1e9, { dy: 10 }); M.vis(rT[0], t, wt('R4', 'carry'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis(rRes[0], t, wt('R4', 'carry') + 0.3, 1e9, { dy: 10 });
    M.vis(rAn[1], t, wt('R5', 'sum'), 1e9, { dx: -10, dy: 0 }); M.vis(rAn[0], t, wt('R5', 'carry'), 1e9, { dx: 10, dy: 0 }); M.vis(rAn[2], t, wt('R3', 'two', 1), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#rStrip'), t, T0('R5') - 0.1, 1e9, { dy: 24 });
  }

  /* B: half adder breadboard */
  const bOn = t >= tB - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32, { a, b, k } = inAt(t), live = k >= 0, s = a ^ b, c = a & b;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([$('#tgA'), $('#tgB')], t, wt('B2', 'inputs'), 0.1);
    [[$('#tgA'), a], [$('#tgB'), b]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateX(${v ? 30 : 0}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), String(v)); });
    const tg = tB + 0.5; drawSeq([...busA, ...busB], t, tg, 0.25, 0.05); fadeAt(jn, t, tg + 0.5, 0.05);
    drawSeq([...xIn, wSo], t, tg + 0.4, 0.3, 0.06); M.vis(gX.body, t, tg + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(gX.ex, t, tg + 0.5, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([busA[3], busB[3], wCo], t, tg + 0.6, 0.3, 0.06); M.vis(gA.body, t, tg + 0.7, 1e9, { dy: 0, fade: 0.2 });
    [...LS, ...LC].forEach((e, i) => M.vis(e, t, wt('B2', 'outputs') + (i > 2 ? 0.2 : 0), 1e9, { dy: 0, fade: 0.2 }));
    M.vis(gLab[0], t, wt('B8', 'That') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(gLab[1], t, wt('B9', 'AND') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(LS[0], 'fill', live && s ? AM : '#fff'); PUC.attr(LC[0], 'fill', live && c ? AM : '#fff');
    busA.forEach(p => wireC(p, live && a)); busB.forEach(p => wireC(p, live && b)); wireC(xIn[0], live && a); wireC(xIn[1], live && b); wireC(wSo, live && s); wireC(wCo, live && c);
    [scR, ...scG].forEach(e => M.vis(e, t, tB + 1.0, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, tB + 1.1, 0.08);
    scT.forEach((p, i) => lane(p, i, t, BASE[i]));
    M.vis(ttHead, t, T0('B3'), 1e9, { dy: 10 });
    ttRows.forEach((r, i) => { const e = ev[i]; M.vis(r, t, e[0] - 0.1, 1e9, { dy: 14 }); M.vis(r.children[2], t, e[0] + 0.7, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis(r.children[3], t, e[0] + 1.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const cur = live && a * 2 + b === i; r.style.background = cur ? C.ac2 : SOFT; r.style.outline = cur ? `2.5px solid ${AM}` : 'none'; });
    const onS = t >= T0('B7') && t < T0('B9'), onC = t >= T0('B9') && t < T0('B10'); M.hide(colBox, !(onS || onC)); colBox.style.left = (onS ? 296 : 446) + 'px';
    M.vis($('#ttBox'), t, T0('B10') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#ttX'), t, T0('B10'), 0.6); M.setT($('#ttW'), '1 XOR gate + 1 AND gate'); M.vis($('#ttW'), t, wt('B10', 'one'), 1e9, { dy: 8 });
  }

  /* G: full adder */
  const gOn = t >= tG - 0.05 && t < tJ + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tJ - 0.3, full = t >= T0('G4');
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, T0('G4') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.setT($('#gLL'), full ? 'THE FULL ADDER' : 'ONE INPUT MISSING'); M.setT(fL, full ? 'FULL ADDER' : 'HALF ADDER');
    M.vis(fBox.g, t, tG + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(fL, t, tG + 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq([...fIn, ...fOut], t, tG + 0.3, 0.3, 0.08); fadeAt(fLab, t, tG + 0.5, 0.08);
    PUC.attr(fCin, 'stroke-dasharray', full ? 'none' : '10 10'); PUC.attr(fCin, 'stroke', full ? INK : AM); M.vis(fCin, t, wt('G1', 'no') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(fQ, t, wt('G1', 'carry'), T0('G4'), { dy: 0, fade: 0.2 }); M.vis(fCinL, t, wt('G3', 'carry'), 1e9, { dy: 0, fade: 0.2 });
    PUC.write($('#gF1'), t, wt('G6', 'equals') - 0.1, 0.6); PUC.write($('#gF2'), t, wt('G8', 'equals') - 0.1, 0.7);
    M.vis(gHead, t, T0('G4') + 0.2, 1e9, { dy: 10 });
    const hlS = t >= T0('G5') && t < T0('G7'), hlC = t >= T0('G7') && t < tJ;
    gRows.forEach((r, k) => { M.vis(r, t, wt('G4', 'Three') + k * 0.18, 1e9, { dy: 12 }); const [a, b, c] = RO3[k], n = a + b + c;
      const on = (hlS && n % 2 === 1) || (hlC && n >= 2); r.style.background = on ? C.ac2 : SOFT; r.style.outline = on ? `2.5px solid ${AM}` : 'none'; });
  }

  /* J: two half adders */
  const jOn = t >= tJ - 0.05 && t < tT + 0.05; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const out = tT - 0.3;
    M.vis($('#jL'), t, tJ + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#jR'), t, tJ + 0.25, out, { dx: 60, dy: 0, ...o });
    runFA(jD, t, [T0('J2'), T0('J3'), T0('J4')], wireC, null);
    [jD.h1.r, jD.h2.r].forEach((r, i) => { const on = i === 0 ? t >= T0('J2') && t < T0('J3') : t >= T0('J3') && t < T0('J4'); PUC.attr(r, 'fill', on ? C.ac2 : '#fff'); PUC.attr(r, 'stroke', on ? AM : INK); });
    runRows(jRows, t, tJR);
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Carry') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const lv = t >= T0('W2');
    runFA(wD, t, [tW + 0.3, tW + 0.6, tW + 0.9], (p, v) => { const st = t >= T0('W5') ? 3 : t >= T0('W4') ? 2 : t >= T0('W3') ? 1 : lv ? 0 : -1;
      const lvl = { [wD.wA]: 0, [wD.wB]: 0, [wD.wCin]: 0 }; wireC(p, v); }, lv ? [1, 1, 1] : null);
    // reveal values stage by stage
    const tc = [T0('W2'), T0('W2') + 0.15, T0('W2') + 0.3, wt('W3', 'zero'), wt('W3', 'carry'), wt('W4', 'one'), wt('W4', 'carry'), wt('W5', 'out')];
    wC.forEach((c, i) => M.vis(c.g, t, tc[i] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    [[wD.wS1, tc[3]], [wD.wC1, tc[4]], [wD.og.ins[1], tc[4]], [wD.wS, tc[5]], [wD.og.out, tc[7]]].forEach(([p, tt]) => { if (t < tt) wireC(p, 0); });
    [wD.h1.r, wD.h2.r].forEach((r, i) => { const on = i === 0 ? t >= T0('W3') && t < T0('W4') : t >= T0('W4') && t < T0('W5'); PUC.attr(r, 'fill', on ? C.ac2 : '#fff'); PUC.attr(r, 'stroke', on ? AM : INK); });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X4', 'But') - 0.05, tRight: wt('X4', 'needs') - 0.3 });
    M.vis($('#tcA'), t, wt('X3', 'OR') - 0.1, 1e9, { dy: 10 }); M.vis($('#tcB'), t, wt('X4', 'right') - 0.1, 1e9, { dy: 10 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P'), wt('X5', 'I')], tType: wt('X6', 'Expect') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.75, tF + 1.1, tF + 1.45, tF + 1.8, tF + 2.15], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
