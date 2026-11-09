// PUC Electronics Ep 55 - XOR and XNOR gates ("Breadboard" style, Lab Notebook world)
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
/* XOR / XNOR symbol = OR shape + extra curve at the inputs (+ bubble for XNOR) */
const xgate = (p, x, y, s, o = {}) => { const G = gate(p, 'OR', x, y, s, { ...o, bubble: !!o.xnor }); const h = s * 0.8;
  G.ex = mk(G.g, 'path', { d: `M${x - s * 0.13},${y - h / 2} Q${x - s * 0.13 + s * 0.28},${y} ${x - s * 0.13},${y + h / 2}`, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' });
  if (o.xnor) fixOut(G); return G; };
/* two-way (staircase) switch circuit. set(a, b): a = bottom switch flipped, b = top switch flipped. light = a XOR b */
const stair = (p, ox, oy, sc = 1) => {
  const g = mk(p, 'g', { transform: `translate(${ox},${oy}) scale(${sc})` });
  const ws = [W(g, 'M200,110 H70 V160'), W(g, 'M70,192 V250 H660 V138'), W(g, 'M270,80 H470'), W(g, 'M270,140 H470'), W(g, 'M540,110 H632')];
  W(g, 'M46,168 H94', { 'stroke-width': 5 }); W(g, 'M58,184 H82', { 'stroke-width': 5 });
  [[200, 110], [270, 80], [270, 140], [470, 80], [470, 140], [540, 110]].forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }));
  const l1 = W(g, '', { 'stroke-width': 5 }), l2 = W(g, '', { 'stroke-width': 5 });
  const lampC = mk(g, 'circle', { cx: 660, cy: 110, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(g, 'M640,90 L680,130 M680,90 L640,130', { 'stroke-width': 3 });
  const lab = [mono(g, 235, 196, 'BOTTOM', { 'text-anchor': 'middle', 'font-size': 18, fill: INK, 'font-weight': 600 }), mono(g, 505, 196, 'TOP', { 'text-anchor': 'middle', 'font-size': 18, fill: INK, 'font-weight': 600 })];
  return { g, set(a, b) { const u1 = !a, u2 = !!b; // bottom starts up, top starts down
    PUC.attr(l1, 'd', `M200,110 L${264},${u1 ? 84 : 136}`); PUC.attr(l2, 'd', `M540,110 L${476},${u2 ? 84 : 136}`); PUC.attr(lampC, 'fill', (a ^ b) ? AM : '#fff'); } };
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'climbs') - 0.2;
const tI = T0('I1'), tB = T0('B1'), tN = T0('N1'), tE = T0('E1'), tS = T0('S1'), tU = T0('U1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hSt = stair($('#hS'), 30, 20, 0.95);
const hFlip = [wt('H2', 'flips'), wt('H3', 'flips')];

/* ================= I: XOR intro ================= */
$('#x1k').innerHTML = M.icon('check', 28, '#fff', 3); $('#x2k').innerHTML = M.icon('x', 28, '#fff', 3);
const iS = $('#iS');
const iG = xgate(iS, 260, 220, 190, { lead: 130, leadOut: 120 });
const iLab = [tx(iS, 116, 186, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 30 }), tx(iS, 116, 268, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 30 }), tx(iS, iG.x1 + 14, 230, 'Y', { 'font-style': 'italic', 'font-size': 30 })];
const iPt = PUC.arrow(iS, AM, 4, 14), iPtL = mono(iS, 236, 350, 'extra curve', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 24 });
$('#iX').innerHTML = K('Y = A \\oplus B');

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const conn = [W(ck, 'M232,116 H290 V134 H330'), W(ck, 'M232,204 H290 V186 H330')];
const G1 = { XOR: xgate(ck, 400, 160, 130, { lead: 70, leadOut: 150 }), XNOR: xgate(ck, 400, 160, 130, { lead: 70, leadOut: 134, xnor: true }) };
const lampX0 = 740, lampC = mk(ck, 'circle', { cx: lampX0, cy: 160, r: 32, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(ck, `M${lampX0 - 22},138 L${lampX0 + 22},182 M${lampX0 + 22},138 L${lampX0 - 22},182`, { 'stroke-width': 3 });
const lampYL = tx(ck, lampX0, 226, 'Y', { 'text-anchor': 'middle', 'font-style': 'italic' });
const gLab = mono(ck, 470, 84, 'XOR', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const nPt = PUC.arrow(ck, AM, 4, 14), nPtL = mono(ck, 600, 268, 'bubble = NOT', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 20 });
const scR = mk(ck, 'rect', { x: 32, y: 300, width: 864, height: 268, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 300, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const scT = [mk(ck, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: '#C9D2E3', 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linejoin': 'round' })];
const scL = [mono(ck, 44, 326, 'A', { fill: CH1, 'font-weight': 600 }), mono(ck, 44, 414, 'B', { fill: '#C9D2E3', 'font-weight': 600 }), mono(ck, 44, 502, 'Y', { fill: AM, 'font-weight': 600 }), mono(ck, 884, 326, 'SCOPE · SLOW-MOTION VIEW', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const ev = {
  XOR: [[wt('B2', 'Both'), 0, 0], [wt('B3', 'Zero'), 0, 1], [wt('B3', 'One'), 1, 0], [wt('B4', 'Both'), 1, 1]],
  XNOR: [[wt('N4', 'Both'), 0, 0], [wt('N4', 'Different'), 0, 1], [wt('N4', 'inputs'), 1, 0], [wt('N4', 'Both', 1), 1, 1]] };
const RP = { XOR: [T0('B7'), tN], XNOR: [T0('N5'), tE] }, RO = [[0, 0], [0, 1], [1, 0], [1, 1]];
const modeAt = t => t < tN ? 'XOR' : 'XNOR';
const fn = { XOR: (a, b) => a ^ b, XNOR: (a, b) => 1 - (a ^ b) };
const inAt = (m, t) => { let a = 0, b = 0, k = -1; ev[m].forEach(([tt, x, y], i) => { if (t >= tt) { a = x; b = y; k = i; } });
  const [r0, r1] = RP[m]; if (t >= r0 + 0.3 && t < r1 - 0.3) { const q = RO[Math.floor((t - r0 - 0.3) / 1.1) % 4]; a = q[0]; b = q[1]; } return { a, b, k }; };
const sigAt = (tau, ch) => { if (tau < ev.XOR[0][0]) return -1; const m = modeAt(tau), { a, b } = inAt(m, tau); return ch === 0 ? a : ch === 1 ? b : fn[m](a, b); };
const lane = (p, ch, t, base) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200, v = sigAt(tau, ch); if (v < 0) { first = true; continue; } const x = 70 + 816 * i / 200, y = base - 48 * v; d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; } PUC.attr(p, 'd', d); };
const TL = [24, 150, 296, 446];
const mkTT = m => { const cols = m === 'XOR' ? ['A', 'B', 'XOR', 'OR'] : ['A', 'B', 'XNOR'];
  $('#ttB').innerHTML = `<div class="tth" style="top:84px">${cols.map((c, i) => `<span style="left:${TL[i]}px">${c}</span>`).join('')}</div>` +
    RO.map(([a, b], k) => { const vals = m === 'XOR' ? [a, b, a ^ b, a | b] : [a, b, 1 - (a ^ b)]; return `<div class="ttr" style="top:${136 + k * 72}px">${vals.map((v, i) => `<span style="left:${TL[i]}px${i > 1 ? ';color:' + (v ? AM : INK) : ''}">${v}</span>`).join('')}</div>`; }).join('');
  $('#ttX').innerHTML = m === 'XOR' ? K('Y = A \\oplus B') : K('Y = \\overline{A \\oplus B}');
  M.setT($('#ttW'), m === 'XOR' ? '1 only when the inputs differ' : '1 when the inputs are the same');
  return { head: $('#ttB .tth'), rows: [...$('#ttB').querySelectorAll('.ttr')] }; };
let ttM = '', ttO = null;
const orBox = document.createElement('div'); orBox.className = 'hbox'; orBox.style.cssText = 'left:440px;top:124px;width:144px;height:300px;background:none;border:3px dashed ' + AM; $('#tt').appendChild(orBox);

/* ================= E: from basic gates ================= */
const eS = $('#eS');
const eA1 = gate(eS, 'AND', 380, 160, 100, { lead: 60, leadOut: 40 }), eA2 = gate(eS, 'AND', 380, 340, 100, { lead: 60, leadOut: 40 });
const eNB = gate(eS, 'NOT', 220, 180, 60, { lead: 40, leadOut: 39 }), eNA = gate(eS, 'NOT', 220, 320, 60, { lead: 40, leadOut: 39 });
const eO = gate(eS, 'OR', 580, 250, 90, { lead: 40, leadOut: 40 });
const eWa = [W(eS, 'M70,140 H320'), W(eS, 'M120,140 V320 H180')], eWb = [W(eS, 'M70,360 H320'), W(eS, 'M150,360 V180 H180')];
const eJ = [mk(eS, 'circle', { cx: 120, cy: 140, r: 6, fill: INK }), mk(eS, 'circle', { cx: 150, cy: 360, r: 6, fill: INK })];
const eL1 = W(eS, `M${eA1.x1},160 H530 V230 H540`), eL2 = W(eS, `M${eA2.x1},340 H530 V270 H540`);
const eLab = [tx(eS, 58, 148, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(eS, 58, 368, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(eS, eO.x1 + 8, 259, 'Y', { 'font-style': 'italic', 'font-size': 26 })];
const eGl = [mono(eS, 500, 136, 'AB̄', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(eS, 500, 384, 'ĀB', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 })];
const eEx = KF(eS, 36, 450, 712, 90, 'Y = A\\overline{B} + \\overline{A}B', 48);
const eRows = rows($('#eSteps'), [
  [K('A{=}1,\\ B{=}0:\\ A\\overline{B} = 1'), '', 92], [K('A{=}0,\\ B{=}1:\\ \\overline{A}B = 1'), '', 180], [K('Y = A\\overline{B} + \\overline{A}B'), 'XOR', 268],
  ['2 NOT + 2 AND + 1 OR', '', 356], ['or 4 NAND gates', '', 444], [K('\\overline{A \\oplus B} = AB + \\overline{A}\\,\\overline{B}'), 'XNOR', 532]]);
const tER = [wt('E2', 'write'), wt('E3', 'That'), wt('E4', 'Y'), T0('E5'), wt('E6', 'four'), wt('E7', 'gives')];
const eAB = t => t >= tER[1] - 0.1 && t < tER[2] ? [0, 1] : t >= tER[0] - 0.6 && t < tER[1] - 0.1 ? [1, 0] : null;

/* ================= S: back to the stairs ================= */
const sSt = stair($('#s1S'), 30, 90, 1);
const sRd = tx($('#s1S'), 392, 470, '', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30 });
const s2 = $('#s2S'), sG = xgate(s2, 300, 200, 150, { lead: 110, leadOut: 110 });
const sLab = [mono(s2, 176, 172, 'BOTTOM', { 'text-anchor': 'end', 'font-size': 18, fill: INK, 'font-weight': 600 }), mono(s2, 176, 244, 'TOP', { 'text-anchor': 'end', 'font-size': 18, fill: INK, 'font-weight': 600 }), mono(s2, sG.x1 + 10, 206, 'LIGHT', { 'font-size': 18, fill: INK, 'font-weight': 600 })];
const sC = [vchip(s2, 220, 142, '0'), vchip(s2, 220, 284, '0'), vchip(s2, sG.x1 - 30, 166, '0')];
const sCnt = mono(s2, 392, 380, '', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 });
const sSeq = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0], [1, 0], [1, 1]];
const sAt = t => { const t0 = wt('S2', 'Flip'); if (t < t0) return [0, 0]; return sSeq[Math.min(sSeq.length - 1, Math.floor((t - t0) / 1.2) + 1)]; };

/* ================= U: tricks ================= */
const uS = $('#uS');
const uG = xgate(uS, 330, 220, 150, { lead: 120, leadOut: 110 });
const uLab = [tx(uS, 196, 196, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 28 }), mono(uS, 196, 256, 'CONTROL', { 'text-anchor': 'end', 'font-size': 18, fill: INK, 'font-weight': 600 }), tx(uS, uG.x1 + 10, 230, 'Y', { 'font-style': 'italic', 'font-size': 28 })];
const uC = [vchip(uS, 240, 152, '0'), vchip(uS, 240, 300, '0'), vchip(uS, uG.x1 - 30, 176, '0')];
const uTag = mono(uS, 392, 370, '', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 22 });
$('#uF1').innerHTML = K('A \\oplus 0 = A'); $('#uF2').innerHTML = K('A \\oplus 1 = \\overline{A}');
const bitsH = (bs, n, r) => bs.map((b, i) => `<div class="b" style="left:${28 + i * 70}px;${b ? 'background:' + C.ac2 + ';border-color:' + AM + ';color:' + GD : ''}">${b}</div>`).join('') + `<div class="c">${n}</div><div class="r">XOR = ${r}</div>`;
$('#bt0').innerHTML = bitsH([1, 0, 1, 0], 'two 1s · even', 0); $('#bt1').innerHTML = bitsH([1, 1, 0, 1], 'three 1s · odd', 1);

/* ================= W: worked example ================= */
const wS = $('#wS');
const w1 = fixOut(ngate(wS, 'NOR', 220, 170, 100, { lead: 60, leadOut: 50 })), w2 = gate(wS, 'AND', 220, 330, 100, { lead: 60, leadOut: 66 }), w3 = fixOut(ngate(wS, 'NOR', 500, 250, 100, { lead: 70, leadOut: 60 }));
const wIn = [W(wS, 'M84,150 H160'), W(wS, 'M100,150 V310 H160'), W(wS, 'M84,190 H160'), W(wS, 'M130,190 V350 H160')];
const wJ = [mk(wS, 'circle', { cx: 100, cy: 150, r: 6, fill: INK }), mk(wS, 'circle', { cx: 130, cy: 190, r: 6, fill: INK })];
const wLinks = [W(wS, `M${w1.x1},170 H400 V230 H430`), W(wS, `M${w2.x1},330 H400 V270 H430`)];
const wLab = [tx(wS, 72, 158, 'A', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(wS, 72, 198, 'B', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 26 }), tx(wS, w3.x1 + 10, 260, 'Y', { 'font-style': 'italic', 'font-size': 26 })];
const wGl = [mono(wS, 290, 112, 'A + B, barred', { 'text-anchor': 'middle', 'font-size': 17 }), mono(wS, 300, 392, 'AB', { 'text-anchor': 'middle', 'font-size': 20, fill: INK, 'font-weight': 600 })];
const wC = [vchip(wS, 150, 116, '1'), vchip(wS, 56, 236, '1'), vchip(wS, 372, 140, '0'), vchip(wS, 372, 300, '1'), vchip(wS, w3.x1 - 30, 214, '0')];
const wEx = KF(wS, 36, 450, 712, 90, 'Y = \\overline{\\overline{A + B} + A\\,B}', 46), wEx2 = KF(wS, 36, 450, 712, 90, 'Y = \\overline{\\overline{A + B} + A\\,B} = A \\oplus B', 46);
const wRows = rows($('#wSteps'), [
  [K('Y = \\overline{\\overline{A + B} + AB}'), 'last NOR', 92],
  [K('Y = \\overline{\\overline{A + B}} \\cdot \\overline{AB}'), 'break the bar', 186],
  [K('Y = (A + B)(\\overline{A} + \\overline{B})'), 'break again', 280],
  [K('A\\overline{A} = 0,\\ B\\overline{B} = 0'), 'multiply out', 374],
  [K('Y = A\\overline{B} + \\overline{A}B'), 'XOR', 484]]);
const tWR = [wt('W3', 'last'), wt('W4', 'Break'), wt('W5', 'We'), wt('W6', 'Multiply'), wt('W7', 'Y')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'XOR with inputs 1, 1 gives 1 (like OR)', right: K('1 \\oplus 1 = 0') + ' (same inputs give 0)', y0: 96, y1: 184 });
$('#tcA').innerHTML = 'OR: ' + K('1 + 1 = 1');
$('#tcB').innerHTML = 'XOR: ' + K('1 \\oplus 1 = 0') + `<span style="font:600 24px Poppins;color:${C.ok};margin-left:20px">inputs are the same</span>`;
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS', 'ISC BOARDS'], type: 'Truth tables; which gate a circuit makes (JEE Main: 17 Mar 2021 S2, 29 Jan 2023 S2)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A and 1 go into an XOR gate. That output and B go into a second XOR gate. What is Y?', qW: 780,
  opts: [K('A \\oplus B'), K('\\overline{A \\oplus B}'), K('A \\cdot B'), K('1')], right: 1, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K('A \\oplus 1 = \\overline{A}')], [K('Y = \\overline{A} \\oplus B')], [K('A{=}B{=}0:\\ Y = 1 \\oplus 0 = 1')], [K('Y = \\overline{A \\oplus B}'), 'XNOR']], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'flips'), wt('A3', 'So'), wt('A4', 'Test'), wt('A5', 'Same')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 66, title: 'XOR and XNOR · fact card', txt: [1, 1, 1, 1, 1, 1],
  lines: ['XOR: ' + K('Y = A \\oplus B = A\\overline{B} + \\overline{A}B') + ' · 1 if the inputs differ', 'XNOR: ' + K('Y = \\overline{A \\oplus B} = AB + \\overline{A}\\,\\overline{B}') + ' · 1 if they are the same',
    K('A \\oplus 0 = A,\\quad A \\oplus 1 = \\overline{A},\\quad A \\oplus A = 0'), 'Many inputs: XOR = 1 when the number of 1s is odd', 'Symbol: OR shape + extra curve · XNOR adds a bubble', 'From basic gates: 2 NOT + 2 AND + 1 OR, or 4 NAND'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 56', topic: 'Half Adder and Full Adder', y: 774 });

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
    M.vis($('#h1C'), t, wt('H1', 'One') - 0.3, out, { dx: 60, dy: 0, ...o });
    hSt.set(t >= hFlip[0] ? 1 : 0, t >= hFlip[1] ? 1 : 0);
    M.vis($('#h2C'), t, wt('H2', 'flips') - 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hs0'), t, wt('H2', 'flips') - 0.3, 1e9, { dy: 14 }); M.vis($('#hs1'), t, wt('H2', 'light') , 1e9, { dy: 14 }); M.vis($('#hs2'), t, wt('H3', 'light'), 1e9, { dy: 14 });
    M.vis($('#hQl'), t, T0('H4'), 1e9, { dy: 10 });
  }

  /* I: XOR intro */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, T0('I4') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#x1'), t, wt('I2', 'one') - 0.1, 1e9, { dy: 16 }); M.vis($('#x2'), t, wt('I2', 'but') - 0.1, 1e9, { dy: 16 });
    M.vis($('#iStrip'), t, wt('I3', 'output'), 1e9, { dy: 24 });
    const tg = T0('I4'); drawSeq([...iG.ins, iG.out], t, tg, 0.3, 0.08); M.vis(iG.body, t, tg + 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt(iLab, t, tg + 0.3, 0.1);
    M.draw(iG.ex, t, wt('I4', 'extra') - 0.1, 0.5); PUC.attr(iG.ex, 'stroke', t >= wt('I4', 'extra') && t < T0('I5') ? AM : INK);
    const u = M.io((t - wt('I4', 'curved')) / 0.4); iPt.set(236, 320, 236, 320 - 50 * u); M.vis(iPtL, t, wt('I4', 'curved') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    PUC.write($('#iX'), t, wt('I5', 'circle') - 0.3, 0.6);
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tE + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tE - 0.32, m = modeAt(t), { a, b, k } = inAt(m, t), y = fn[m](a, b), live = k >= 0;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    M.setT($('#ckL'), `${m} ON THE BREADBOARD`); M.setT($('#ttL'), `${m} · TRUTH TABLE`); M.setT(gLab, m === 'XOR' ? 'XOR' : t < wt('N2', 'NOT') ? 'XNOR' : 'XNOR = XOR + NOT');
    const mt = m === 'XOR' ? tB : tN;
    fadeAt([$('#tgA'), $('#tgB')], t, tB + 0.4, 0.1);
    [[$('#tgA'), a], [$('#tgB'), b]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateX(${v ? 30 : 0}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), String(v)); });
    conn.forEach((p, i) => { M.draw(p, t, tB + 0.5, 0.3); wireC(p, live ? (i ? b : a) : 0); });
    Object.entries(G1).forEach(([kk, G]) => { M.hide(G.g, kk !== m); if (kk === m) { M.vis(G.g, t, mt + 0.5, 1e9, { dy: 0, fade: 0.25 }); G.ins.forEach((p, i) => wireC(p, live ? (i ? b : a) : 0)); wireC(G.out, live ? y : 0); } });
    if (m === 'XNOR') { M.vis(G1.XNOR.bub, t, wt('N3', 'bubble') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); PUC.attr(G1.XNOR.bub, 'fill', t >= wt('N3', 'bubble') && t < T0('N4') ? C.ac2 : '#fff'); }
    const u = M.io((t - wt('N3', 'bubble')) / 0.4); nPt.set(G1.XNOR.ox + 8, 250, G1.XNOR.ox + 8, 250 - 60 * u); M.hide(nPt.g, t < wt('N3', 'bubble') || t > T0('N4')); M.vis(nPtL, t, wt('N3', 'bubble') + 0.2, T0('N4'), { dy: 0, fade: 0.2 }); PUC.attr(nPtL, 'x', G1.XNOR.ox + 8);
    M.vis(gLab, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis(lampC, t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(lampYL, t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(lampC, 'fill', live && y ? AM : '#fff');
    [scR, ...scG].forEach(e => M.vis(e, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, tB + 1.0, 0.08);
    lane(scT[0], 0, t, 360); lane(scT[1], 1, t, 448); lane(scT[2], 2, t, 536);
    if (ttM !== m) { ttM = m; ttO = mkTT(m); }
    M.vis(ttO.head, t, mt + 0.4, 1e9, { dy: 10 });
    if (m === 'XOR') M.vis(ttO.head.children[3], t, T0('B6'), 1e9, { dy: 0, fade: 0.2 });
    ttO.rows.forEach((r, i) => { const e = ev[m].find(([tt, x, z]) => x * 2 + z === i); const ti = e ? e[0] : 1e9;
      M.vis(r, t, ti - 0.1, 1e9, { dy: 14 }); M.vis(r.children[2], t, ti + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      if (m === 'XOR') M.vis(r.children[3], t, T0('B6') + 0.2 + i * 0.12, 1e9, { dy: 0, fade: 0.15 });
      const cur = live && a * 2 + b === i; r.style.background = cur ? C.ac2 : SOFT; r.style.outline = cur ? `2.5px solid ${AM}` : 'none'; });
    M.hide(orBox, m !== 'XOR'); if (m === 'XOR') { M.vis(orBox, t, wt('B6', 'last') - 0.1, T0('B7'), { dy: 0, fade: 0.2 }); orBox.style.top = '340px'; orBox.style.height = '68px'; orBox.style.left = '296px'; orBox.style.width = '288px'; }
    const tw = m === 'XOR' ? T0('B5') : T0('N5'), tx2 = m === 'XOR' ? wt('I5', 'We') : wt('N6', 'write');
    M.vis($('#ttBox'), t, tw - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#ttW'), t, tw, 1e9, { dy: 8 }); PUC.write($('#ttX'), t, Math.max(tw + 0.3, m === 'XOR' ? 0 : tx2), 0.6);
  }

  /* E: from basic gates */
  const eOn = t >= tE - 0.05 && t < tS + 0.05; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = tS - 0.3, ab = eAB(t), tg = tE + 0.3;
    M.vis($('#eL'), t, tE + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#eR'), t, tE + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...eWa, ...eWb], t, tg, 0.25, 0.05); fadeAt(eJ, t, tg + 0.3, 0.05); fadeAt(eLab, t, tg + 0.2, 0.15);
    [eNB, eNA].forEach((G, i) => { drawSeq([...G.ins, G.out], t, tg + 0.3 + i * 0.1, 0.25, 0.05); M.vis(G.body, t, tg + 0.4 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(G.bub, t, tg + 0.45 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); });
    [eA1, eA2].forEach((G, i) => { drawSeq([...G.ins, G.out], t, tg + 0.6 + i * 0.1, 0.25, 0.05); M.vis(G.body, t, tg + 0.7 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); });
    drawSeq([eL1, eL2, ...eO.ins, eO.out], t, tg + 0.9, 0.25, 0.05); M.vis(eO.body, t, tg + 1.0, 1e9, { dy: 0, fade: 0.2 });
    M.vis(eGl[0], t, tER[0], 1e9, { dy: 0, fade: 0.2 }); M.vis(eGl[1], t, tER[1], 1e9, { dy: 0, fade: 0.2 }); M.vis(eEx, t, tER[2] - 0.1, 1e9, { dy: 10 });
    const [A, B] = ab || [0, 0], on = !!ab;
    eWa.forEach(p => wireC(p, on && A)); eWb.forEach(p => wireC(p, on && B)); wireC(eA1.ins[0], on && A); wireC(eA2.ins[1], on && B);
    wireC(eNB.ins[0], on && B); wireC(eNA.ins[0], on && A); wireC(eNB.out, on && !B); wireC(eNA.out, on && !A); wireC(eA1.ins[1], on && !B); wireC(eA2.ins[0], on && !A);
    const a1 = on && A && !B, a2 = on && !A && B; wireC(eA1.out, a1); wireC(eL1, a1); wireC(eO.ins[0], a1); wireC(eA2.out, a2); wireC(eL2, a2); wireC(eO.ins[1], a2); wireC(eO.out, a1 || a2);
    runRows(eRows, t, tER);
  }

  /* S: back to the stairs */
  const sOn = t >= tS - 0.05 && t < tU + 0.05; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = tU - 0.3, [a, b] = sAt(t), y = a ^ b;
    M.vis($('#sL'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, wt('S1', 'Each') - 0.2, out, { dx: 60, dy: 0, ...o });
    sSt.set(a, b);
    drawSeq([...sG.ins, sG.out], t, wt('S1', 'Each'), 0.3, 0.08); M.vis(sG.body, t, wt('S1', 'Each') + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(sG.ex, t, wt('S1', 'Each') + 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt(sLab, t, wt('S1', 'switch'), 0.1);
    sC.forEach((c, i) => { M.vis(c.g, t, wt('S1', 'input') + i * 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, [a, b, y][i]); });
    sG.ins.forEach((p, i) => wireC(p, i ? b : a)); wireC(sG.out, y);
    M.setT(sRd, `BOTTOM ${a} · TOP ${b} → LIGHT ${y ? 'ON' : 'OFF'}`); PUC.attr(sRd, 'fill', y ? GD : INK); M.vis(sRd, t, wt('S1', 'input'), 1e9, { dy: 0, fade: 0.2 });
    M.setT(sCnt, a === b ? 'same → light off' : 'different → light on'); M.vis(sCnt, t, wt('S2', 'Flip'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#sStrip'), t, wt('S3', 'works') - 0.1, 1e9, { dy: 24 });
  }

  /* U: tricks */
  const uOn = t >= tU - 0.05 && t < tT + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = tT - 0.3, tc1 = wt('U2', 'one'), A = Math.floor(Math.max(0, t - tU - 0.6) / 0.9) % 2, Cc = t >= tc1 - 0.2 ? 1 : 0, y = A ^ Cc;
    M.vis($('#uL'), t, tU + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#uR'), t, T0('U4') - 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq([...uG.ins, uG.out], t, tU + 0.3, 0.3, 0.08); M.vis(uG.body, t, tU + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(uG.ex, t, tU + 0.4, 1e9, { dy: 0, fade: 0.2 }); fadeAt(uLab, t, tU + 0.5, 0.1);
    uC.forEach((c, i) => { M.vis(c.g, t, tU + 0.6 + i * 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, [A, Cc, y][i]); });
    uG.ins.forEach((p, i) => wireC(p, i ? Cc : A)); wireC(uG.out, y);
    M.setT(uTag, Cc ? 'control 1 → Y is the opposite of A' : 'control 0 → Y copies A'); M.vis(uTag, t, wt('U2', 'zero'), 1e9, { dy: 0, fade: 0.2 });
    PUC.write($('#uF1'), t, wt('U2', 'back'), 0.5); PUC.write($('#uF2'), t, wt('U2', 'gives', 1), 0.5);
    M.vis($('#bt0'), t, wt('U4', 'number') - 0.1, 1e9, { dy: 16 }); M.vis($('#bt1'), t, wt('U4', 'odd') - 0.1, 1e9, { dy: 16 });
    M.vis($('#uStrip'), t, wt('U5', 'spot') - 0.2, 1e9, { dy: 24 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Same') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32, tg = tW + 0.3, chk = t >= T0('W8');
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...wIn, ...w1.ins, w1.out], t, tg, 0.25, 0.05); fadeAt(wJ, t, tg + 0.3, 0.05); M.vis(w1.body, t, tg + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(w1.bub, t, tg + 0.25, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...w2.ins, w2.out], t, tg + 0.4, 0.25, 0.05); M.vis(w2.body, t, tg + 0.5, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([...wLinks, ...w3.ins, w3.out], t, tg + 0.7, 0.3, 0.06); M.vis(w3.body, t, tg + 0.9, 1e9, { dy: 0, fade: 0.2 }); M.vis(w3.bub, t, tg + 0.95, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(wLab, t, tg + 0.3, 0.2); M.vis(wGl[0], t, wt('W2', 'NOR'), 1e9, { dy: 0, fade: 0.2 }); M.vis(wGl[1], t, wt('W2', 'AND'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(wEx, t, wt('W3', 'long') - 0.1, wt('W7', 'circuit') - 0.1, { dy: 10, outDur: 0.1, ody: 0 }); M.vis(wEx2, t, wt('W7', 'circuit') - 0.1, 1e9, { dy: 0, fade: 0.1 });
    wC.forEach((c, i) => M.vis(c.g, t, [wt('W8', 'A'), wt('W8', 'B'), wt('W8', 'NOR'), wt('W8', 'AND'), wt('W8', 'Y')][i] - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    [...wIn, ...w1.ins, ...w2.ins].forEach(p => wireC(p, chk ? 1 : 0)); [w1.out, wLinks[0], w3.ins[0]].forEach(p => wireC(p, 0)); [w2.out, wLinks[1], w3.ins[1]].forEach(p => wireC(p, chk && t >= wt('W8', 'AND') ? 1 : 0)); wireC(w3.out, 0);
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X4', 'But') - 0.05, tRight: wt('X4', 'zero') - 0.1 });
    M.vis($('#tcA'), t, wt('X3', 'OR') - 0.1, 1e9, { dy: 10 }); M.vis($('#tcB'), t, wt('X4', 'gives') - 0.1, 1e9, { dy: 10 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X6', 'J'), wt('X5', 'P'), wt('X5', 'I')], tType: wt('X7', 'Expect') - 0.2 });
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
