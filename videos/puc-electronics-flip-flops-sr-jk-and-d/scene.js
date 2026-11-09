// PUC Electronics Ep 57 - Flip-flops: SR, JK and D ("Breadboard" style, Lab Notebook world)
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
const vchip = (p, x, y, s) => { const g = mk(p, 'g'); const r = mk(g, 'rect', { x: x - 22, y: y - 22, width: 44, height: 40, rx: 8, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); const v = tx(g, x, y + 9, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: GD }); return { g, r, v }; };
const setChip = (ch, v) => { M.setT(ch.v, String(v)); PUC.attr(ch.r, 'fill', v === 1 ? C.ac2 : SOFT); PUC.attr(ch.r, 'stroke', v === 1 ? AM : '#CBD0DA'); PUC.attr(ch.v, 'fill', v === 1 ? GD : INK); };
const box = (p, x, y, w, h, label, fs = 22) => { const g = mk(p, 'g'); const r = mk(g, 'rect', { x, y, width: w, height: h, rx: 12, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const l = mono(g, x + w / 2, y + h / 2 + 8, label, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': fs }); return { g, r, l }; };
const lampAt = (p, x, y, r = 26) => { const c = mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const k = r * 0.7; W(p, `M${x - k},${y - k} L${x + k},${y + k} M${x + k},${y - k} L${x - k},${y + k}`, { 'stroke-width': 3 }); return c; };
/* dark logic scope: lanes [{lab, col, base, amp}], draw(i, fn, tNow, Wn, tStart) */
const dscope = (p, x, y, w, h, lanes, tag = 'SCOPE · SLOW-MOTION VIEW') => {
  const g = mk(p, 'g'); mk(g, 'rect', { x, y, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 8; i++) mk(g, 'line', { x1: x + w * i / 8, y1: y, x2: x + w * i / 8, y2: y + h, stroke: '#2A3758', 'stroke-width': 1.5 });
  const tr = lanes.map(l => mk(g, 'path', { fill: 'none', stroke: l.col, 'stroke-width': 4, 'stroke-linejoin': 'round' }));
  lanes.forEach(l => mono(g, x + 12, l.base - (l.amp || 36) / 2 + 6, l.lab, { fill: l.col, 'font-weight': 600, 'font-size': 18 }));
  if (tag) mono(g, x + w - 12, y + 22, tag, { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' });
  const x0 = x + 70, x1 = x + w - 14;
  return { g, draw(i, fn, tNow, Wn, tStart) { let d = '', first = true; const L = lanes[i], A = L.amp || 36;
    for (let k = 0; k <= 240; k++) { const tau = tNow - Wn + Wn * k / 240; if (tau < tStart) { first = true; continue; } const v = fn(tau); const xx = x0 + (x1 - x0) * k / 240, yy = L.base - A * v; d += (first ? 'M' : 'L') + xx.toFixed(1) + ',' + yy.toFixed(1); first = false; }
    PUC.attr(tr[i], 'd', d); } };
};
const clk = (c0, P = 1) => tau => tau < c0 ? 0 : ((tau - c0) % P) < P / 2 ? 1 : 0;
const edgesTo = (c0, t, P = 1) => { const n = t < c0 ? 0 : Math.floor((t - c0) / P) + 1; return [...Array(n)].map((_, k) => c0 + k * P); };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'taps') - 0.2;
const tM = T0('M1'), tS = T0('S1'), tC = T0('C1'), tJ = T0('J1'), tD = T0('D1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hS = $('#hS');
const hW = [W(hS, 'M80,120 V150'), W(hS, 'M80,180 V240 H640 V148'), W(hS, 'M80,120 H250'), W(hS, 'M330,120 H420'), W(hS, 'M520,120 H612')];
W(hS, 'M56,158 H104', { 'stroke-width': 5 }); W(hS, 'M68,172 H92', { 'stroke-width': 5 });
[[250, 120], [330, 120]].forEach(([x, y]) => mk(hS, 'circle', { cx: x, cy: y, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }));
const hBtn = mk(hS, 'g'); W(hBtn, 'M236,0 H344', { 'stroke-width': 5 }); W(hBtn, 'M290,0 V-22', { 'stroke-width': 5 });
const hBox = box(hS, 420, 90, 100, 60, '?', 30); const hLamp = lampAt(hS, 640, 120, 28);
const hLab = [mono(hS, 290, 200, 'BUTTON', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(hS, 640, 200, 'LAMP', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 })];
const press = [wt('H1', 'taps'), wt('H2', 'Another')];
const btnAt = tau => press.some(p => tau >= p && tau < p + 0.5) ? 1 : 0;
const lampH = tau => (tau >= press[0] && tau < press[1]) ? 1 : 0;
const h2 = dscope($('#h2S'), 32, 70, 720, 190, [{ lab: 'BUTTON', col: CH1, base: 140, amp: 40 }, { lab: 'LAMP', col: AM, base: 232, amp: 40 }], '');

/* ================= M: memory ================= */
const mS = $('#mS');
const mG = gate(mS, 'NOT', 320, 180, 110, { lead: 120, leadOut: 120 });
const mC = [vchip(mS, 250, 136, '0'), vchip(mS, mG.x1 - 40, 136, '1')];
const mLab = [mono(mS, 190, 188, 'IN', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), mono(mS, mG.x1 + 10, 188, 'OUT', { fill: INK, 'font-weight': 600 })];
const mT = mono(mS, 392, 290, 'input changes → output changes at once', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 });
const mInF = tau => Math.floor(Math.max(0, tau - tM - 0.4) / 1.2) % 2;
const mSc = dscope(mS, 32, 330, 720, 220, [{ lab: 'IN', col: CH1, base: 410, amp: 44 }, { lab: 'OUT', col: AM, base: 510, amp: 44 }]);
const m2 = $('#m2S');
const mBox = box(m2, 260, 100, 260, 220, 'FLIP-FLOP', 26);
const mW = [W(m2, 'M120,150 H260'), W(m2, 'M120,270 H260'), W(m2, 'M520,150 H660'), W(m2, 'M520,270 H660')];
const mL2 = [tx(m2, 106, 158, 'S', { 'text-anchor': 'end', 'font-style': 'italic' }), tx(m2, 106, 278, 'R', { 'text-anchor': 'end', 'font-style': 'italic' }), tx(m2, 674, 158, 'Q', { 'font-style': 'italic' }), tx(m2, 674, 278, 'Q̄', { 'font-style': 'italic' })];
const mC2 = [vchip(m2, 180, 120, '0'), vchip(m2, 180, 240, '0'), vchip(m2, 600, 120, '0'), vchip(m2, 600, 240, '1')];
const mTag = mono(m2, 390, 380, '', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 22 });
const tSet = wt('M3', 'stores');

/* ================= S: SR latch ================= */
const ck = $('#ckS');
const n1 = fixOut(ngate(ck, 'NOR', 430, 120, 110, { lead: 50, leadOut: 60 })), n2 = fixOut(ngate(ck, 'NOR', 430, 260, 110, { lead: 50, leadOut: 60 }));
const wRr = W(ck, 'M232,98 H380'), wSs = W(ck, 'M232,282 H380');
const fb1 = W(ck, 'M650,120 V180 H395 V238'), fb2 = W(ck, 'M650,260 V200 H350 V142 H380');
const wQ = W(ck, `M${n1.x1},120 H764`), wQb = W(ck, `M${n2.x1},260 H764`);
const jd = [mk(ck, 'circle', { cx: 650, cy: 120, r: 6, fill: INK }), mk(ck, 'circle', { cx: 650, cy: 260, r: 6, fill: INK }), mk(ck, 'circle', { cx: 395, cy: 238, r: 6, fill: INK })];
const LQ = lampAt(ck, 790, 120), LQb = lampAt(ck, 790, 260);
const sLab = [tx(ck, 830, 128, 'Q', { 'font-style': 'italic' }), tx(ck, 830, 268, 'Q̄', { 'font-style': 'italic' }), mono(ck, 520, 168, 'NOR 1', { 'text-anchor': 'middle', 'font-size': 16 }), mono(ck, 520, 316, 'NOR 2', { 'text-anchor': 'middle', 'font-size': 16 })];
const sSc = dscope(ck, 32, 340, 864, 232, [{ lab: 'S', col: CH1, base: 400, amp: 40 }, { lab: 'R', col: '#C9D2E3', base: 476, amp: 40 }, { lab: 'Q', col: AM, base: 552, amp: 40 }]);
const sEv = [[wt('S4', 'Press'), 1, 0], [wt('S5', 'Let'), 0, 0], [wt('S6', 'Press'), 0, 1], [wt('S7', 'Let'), 0, 0], [wt('S9', 'both'), 1, 1]];
const srAt = tau => { let s = 0, r = 0, q = 0; for (const [tt, a, b] of sEv) { if (tau < tt) break; s = a; r = b; if (a && !b) q = 1; if (b && !a) q = 0; } const inv = s && r; return { s, r, q: inv ? 0 : q, qb: inv ? 0 : 1 - q, inv }; };
const TL4 = [24, 124, 224, 330];
const srRows = [[0, 0, 'same', 'no change'], [1, 0, '1', 'set'], [0, 1, '0', 'reset'], [1, 1, '-', 'not allowed']];
$('#ttB').innerHTML = `<div class="tth" style="top:84px">${['S', 'R', 'Q', 'ACTION'].map((c, i) => `<span class="${i === 3 ? 'ac' : ''}" style="left:${TL4[i]}px">${c}</span>`).join('')}</div>` +
  srRows.map((r, k) => `<div class="ttr" style="top:${136 + k * 72}px">${r.map((v, i) => `<span class="${i === 3 ? 'ac' : ''}" style="left:${TL4[i]}px${i === 2 ? ';color:' + (v === '1' ? AM : INK) : ''}${k === 3 && i === 3 ? ';color:' + C.red : ''}">${v}</span>`).join('')}</div>`).join('');
const ttHead = $('#ttB .tth'), ttRows = [...$('#ttB').querySelectorAll('.ttr')];
$('#ttX').innerHTML = K('S = R = 1') + '<span style="font:600 26px Poppins;margin-left:16px">not allowed</span>';
const rowT = [wt('S8', 'So'), wt('S4', 'Press'), wt('S6', 'Press'), wt('S9', 'both')];

/* ================= C: clock ================= */
const cS = $('#cS');
const cClk = clk(tC + 0.3), cIn = tau => [0, 1, 1, 0, 1, 0, 0, 1][Math.floor(Math.max(0, tau - tC) / 0.83) % 8];
const cQ = tau => { const e = edgesTo(tC + 0.3, tau); return e.length ? cIn(e[e.length - 1]) : 0; };
const cSc = dscope(cS, 32, 84, 720, 400, [{ lab: 'CLK', col: CH1, base: 180, amp: 60 }, { lab: 'INPUT', col: '#C9D2E3', base: 310, amp: 60 }, { lab: 'Q', col: AM, base: 440, amp: 60 }]);
const cT = mono(cS, 392, 540, 'Q changes only when a clock pulse rises', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });

/* ================= J: JK ================= */
const jS = $('#jS');
const jBox = box(jS, 260, 84, 260, 200, 'JK', 30);
const jW = [W(jS, 'M120,124 H260'), W(jS, 'M120,184 H260'), W(jS, 'M120,244 H260'), W(jS, 'M520,134 H674'), W(jS, 'M520,234 H660')];
W(jS, 'M260,170 L280,184 L260,198', { 'stroke-width': 3 });
const jL = [tx(jS, 106, 132, 'J', { 'text-anchor': 'end', 'font-style': 'italic' }), mono(jS, 106, 190, 'CLK', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 18 }), tx(jS, 106, 252, 'K', { 'text-anchor': 'end', 'font-style': 'italic' }), tx(jS, 674, 252, 'Q̄', { 'font-style': 'italic' }), tx(jS, 560, 122, 'Q', { 'font-style': 'italic' })];
const jLamp = lampAt(jS, 700, 134, 24);
const jC = [vchip(jS, 190, 96, '0'), vchip(jS, 190, 272, '0'), vchip(jS, 610, 108, '0')];
const jEv = [[wt('J3', 'J'), 0, 0], [wt('J4', 'J'), 1, 0], [wt('J4', 'J', 1), 0, 1], [wt('J5', 'J'), 1, 1]];
const jkAt = tau => { let j = 0, k = 0; for (const [tt, a, b] of jEv) { if (tau < tt) break; j = a; k = b; } return [j, k]; };
const jC0 = tJ + 0.5, jClk = clk(jC0);
const jQ = tau => { let q = 0; for (const e of edgesTo(jC0, tau)) { const [j, k] = jkAt(e); q = j && k ? 1 - q : j ? 1 : k ? 0 : q; } return q; };
const jSc = dscope(jS, 32, 320, 720, 250, [{ lab: 'CLK', col: CH1, base: 370, amp: 30 }, { lab: 'J', col: '#C9D2E3', base: 428, amp: 30 }, { lab: 'K', col: '#C9D2E3', base: 486, amp: 30 }, { lab: 'Q', col: AM, base: 552, amp: 34 }]);
const jRowsD = [[0, 0, 'same', 'no change'], [1, 0, '1', 'set'], [0, 1, '0', 'reset'], [1, 1, 'Q̄', 'toggle']];
$('#jT').innerHTML = `<div class="tth" style="top:84px">${['J', 'K', 'Q', 'ACTION'].map((c, i) => `<span class="${i === 3 ? 'ac' : ''}" style="left:${TL4[i]}px">${c}</span>`).join('')}</div>` +
  jRowsD.map((r, k) => `<div class="ttr" style="top:${136 + k * 72}px">${r.map((v, i) => `<span class="${i === 3 ? 'ac' : ''}" style="left:${TL4[i]}px${i === 2 ? ';color:' + (v === '1' ? AM : INK) : ''}">${v}</span>`).join('')}</div>`).join('');
const jHead = $('#jT .tth'), jRows = [...$('#jT').querySelectorAll('.ttr')];

/* ================= D: D flip-flop ================= */
const dS = $('#dS');
const dBox = box(dS, 420, 100, 220, 200, 'SR', 28);
const dNot = gate(dS, 'NOT', 290, 250, 70, { lead: 30, leadOut: 420 - (290 + 70 * 0.75 + 16) });
const dW = [W(dS, 'M90,150 H420'), W(dS, 'M200,150 V250 H260'), W(dS, 'M530,400 V300'), W(dS, 'M640,150 H730'), W(dS, 'M640,250 H730')];
W(dS, 'M516,300 L530,280 L544,300', { 'stroke-width': 3 });
const dJ = mk(dS, 'circle', { cx: 200, cy: 150, r: 6, fill: INK });
const dL = [tx(dS, 76, 158, 'D', { 'text-anchor': 'end', 'font-style': 'italic' }), mono(dS, 436, 156, 'S', { 'font-size': 18, fill: MU, 'font-weight': 600 }), mono(dS, 436, 256, 'R', { 'font-size': 18, fill: MU, 'font-weight': 600 }),
  mono(dS, 530, 430, 'CLK', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }), tx(dS, 742, 158, 'Q', { 'font-style': 'italic' }), tx(dS, 742, 258, 'Q̄', { 'font-style': 'italic' })];
const dC = [vchip(dS, 140, 116, '0'), vchip(dS, 380, 216, '1'), vchip(dS, 690, 116, '0')];
const dTag = mono(dS, 230, 360, 'S and R never both 1', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 20 });
const dC0 = tD + 0.4, dClk = clk(dC0), dIn = tau => [1, 0, 0, 1, 1, 0, 1, 0, 0, 1][Math.floor(Math.max(0, tau - tD - 0.1) / 1.3) % 10];
const dQ = tau => { const e = edgesTo(dC0, tau); return e.length ? dIn(e[e.length - 1]) : 0; };
const dSc = dscope($('#d2S'), 32, 84, 720, 400, [{ lab: 'CLK', col: CH1, base: 180, amp: 60 }, { lab: 'D', col: '#C9D2E3', base: 310, amp: 60 }, { lab: 'Q', col: AM, base: 440, amp: 60 }]);
const dT = mono($('#d2S'), 392, 540, 'on each rising pulse, Q takes the value of D', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });

/* ================= W: worked example ================= */
const wS = $('#wS');
const WX = k => 150 + 150 * k, WJ = [1, 1, 0, 1], WK = [0, 1, 0, 1], WQ = [0, 1, 0, 0, 1];
const lanePath = (vals, base, amp, shift) => { let d = `M90,${base}`; vals.forEach((v, k) => { d += ` H${WX(k) + shift} V${base - amp * v}`; }); return d + ' H760'; };
const wLane = [
  W(wS, `M90,170 ${[0, 1, 2, 3].map(k => `H${WX(k)} V120 H${WX(k) + 75} V170`).join(' ')} H760`, { stroke: CH1 }),
  W(wS, lanePath(WJ, 270, 50, -40), { stroke: INK }), W(wS, lanePath(WK, 370, 50, -40), { stroke: INK }),
  W(wS, lanePath(WQ.slice(1), 470, 50, 0), { stroke: AM, 'stroke-width': 5 })];
const clipR = mk(mk(wS, 'clipPath', { id: 'wclip' }), 'rect', { x: 0, y: 0, width: 140, height: 600 });
wLane.forEach(p => PUC.attr(p, 'clip-path', 'url(#wclip)'));
const wLL = [mono(wS, 40, 156, 'CLK', { fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(wS, 40, 256, 'J', { fill: INK, 'font-weight': 600 }), mono(wS, 40, 356, 'K', { fill: INK, 'font-weight': 600 }), mono(wS, 40, 456, 'Q', { fill: AM, 'font-weight': 600 })];
const wEdge = [0, 1, 2, 3].map(k => mk(wS, 'line', { x1: WX(k), y1: 96, x2: WX(k), y2: 500, stroke: '#CBD0DA', 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const wNum = [0, 1, 2, 3].map(k => mono(wS, WX(k), 88, String(k + 1), { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 }));
const wQv = [0, 1, 2, 3].map(k => vchip(wS, WX(k) + 75, 540, String(WQ[k + 1])));
const wRows = rows($('#wSteps'), [
  [K('J{=}1,\\ K{=}0 \\to Q = 1'), 'set', 92], [K('J{=}1,\\ K{=}1 \\to Q = 0'), 'toggle', 186], [K('J{=}0,\\ K{=}0 \\to Q = 0'), 'no change', 280],
  [K('J{=}1,\\ K{=}1 \\to Q = 1'), 'toggle', 374], [K('Q:\\ 1,\\ 0,\\ 0,\\ 1'), 'answer', 484]]);
const tWR = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: K('S = R = 1') + ' sets Q to 1', right: 'NOR latch: ' + K('Q = \\overline{Q} = 0') + ' (not allowed)', y0: 96, y1: 184 });
$('#tcA').innerHTML = K('Q = \\overline{R + \\overline{Q}} = \\overline{1 + \\ldots} = 0');
$('#tcB').innerHTML = K('\\overline{Q} = \\overline{S + Q} = \\overline{1 + \\ldots} = 0') + `<span style="font:600 24px Poppins;color:${C.red};margin-left:20px">both 0</span>`;
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Truth tables of SR, JK and D flip-flops; the invalid state' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A JK flip-flop has J = K = 1. Q starts at 0. What is Q after 5 clock pulses?', qW: 760,
  opts: ['0', '1', 'Invalid state', 'Q and Q̄ both 1'], right: 1, optW: 474, optY: 330, optFs: 32 });
const sol = PUC.solution($('#so'), [[K('J = K = 1 \\to \\text{toggle}')], [K('Q:\\ 1,\\ 0,\\ 1,\\ 0,\\ 1')], [K('\\text{5 toggles (odd)} \\to Q = 1')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'With'), wt('A3', 'Q'), wt('A4', 'odd')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 66, title: 'Flip-flops · fact card', txt: [1, 1, 1, 1, 1, 1],
  lines: ['Flip-flop = 1-bit memory · outputs Q and Q̄ are opposite', 'SR (NOR): S = 1 set · R = 1 reset · 00 no change · 11 not allowed', 'JK: 00 no change · 10 set · 01 reset · 11 toggle',
    'D: Q copies D on each clock pulse · no invalid state', 'Clock: a flip-flop changes only on a clock pulse', 'Groups of D flip-flops form registers'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 58', topic: 'Switches, Relays and Connectors', y: 774 });

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
  const aOn = t >= tMorph && t < tM + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tM - 0.32, b = btnAt(t), l = lampH(t);
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, tMorph + 0.2, out, { dx: 60, dy: 0, ...o });
    hBtn.setAttribute('transform', `translate(0,${b ? 112 : 94})`); PUC.attr(hLamp, 'fill', l ? AM : '#fff');
    hW.forEach(p => wireC(p, 0));
    M.vis($('#h2C'), t, wt('H2', 'lets') - 0.3, out, { dx: 60, dy: 0, ...o });
    h2.draw(0, btnAt, Math.min(t, tM), tM - T0('H1') + 0.6, T0('H1')); h2.draw(1, lampH, Math.min(t, tM), tM - T0('H1') + 0.6, T0('H1'));
    PUC.attr(hBox.r, 'fill', t >= T0('H3') ? C.ac2 : '#fff'); PUC.attr(hBox.r, 'stroke', t >= T0('H3') ? AM : INK);
  }

  /* M: memory */
  const mOn = t >= tM - 0.05 && t < tS + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tS - 0.32, a = mInF(t);
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, T0('M3') - 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq([...mG.ins, mG.out], t, tM + 0.3, 0.3, 0.08); M.vis(mG.body, t, tM + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(mG.bub, t, tM + 0.45, 1e9, { dy: 0, fade: 0.2 }); fadeAt(mLab, t, tM + 0.5, 0.1);
    mC.forEach((c, i) => { M.vis(c.g, t, tM + 0.6, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, i ? 1 - a : a); }); wireC(mG.ins[0], a); wireC(mG.out, 1 - a);
    M.vis(mT, t, T0('M2'), 1e9, { dy: 0, fade: 0.2 }); M.vis(mSc.g, t, tM + 0.7, 1e9, { dy: 0, fade: 0.2 });
    mSc.draw(0, mInF, t, 6, tM + 0.4); mSc.draw(1, tau => 1 - mInF(tau), t, 6, tM + 0.4);
    const s = t >= tSet && t < tSet + 0.9 ? 1 : 0, q = t >= tSet ? 1 : 0;
    M.vis(mBox.g, t, T0('M3'), 1e9, { dy: 0, fade: 0.2 }); drawSeq(mW, t, T0('M3') + 0.1, 0.3, 0.08); fadeAt(mL2, t, T0('M3') + 0.3, 0.08);
    mC2.forEach((c, i) => { M.vis(c.g, t, tSet - 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, [s, 0, q, 1 - q][i]); });
    wireC(mW[0], s); wireC(mW[1], 0); wireC(mW[2], q); wireC(mW[3], 1 - q);
    M.setT(mTag, t >= T0('M4') ? 'input gone · Q still 1 · it remembers' : s ? 'S = 1 · store a 1' : ''); M.vis(mTag, t, tSet, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#mStrip'), t, wt('M5', 'always') - 0.2, 1e9, { dy: 24 });
  }

  /* S: SR latch */
  const sOn = t >= tS - 0.05 && t < tC + 0.05; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = tC - 0.32, st = srAt(t);
    M.vis($('#ck'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tS + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([$('#tgR'), $('#tgS')], t, wt('S1', 'set') - 0.2, 0.1);
    [[$('#tgS'), st.s], [$('#tgR'), st.r]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateX(${v ? 30 : 0}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), String(v)); });
    const tg = wt('S2', 'NOR') - 0.2;
    [n1, n2].forEach((G, i) => { drawSeq([...G.ins, G.out], t, tg + i * 0.2, 0.3, 0.06); M.vis(G.body, t, tg + 0.1 + i * 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(G.bub, t, tg + 0.15 + i * 0.2, 1e9, { dy: 0, fade: 0.2 }); });
    drawSeq([wRr, wSs, wQ, wQb], t, tg + 0.5, 0.3, 0.06); fadeAt([...sLab, LQ, LQb], t, tg + 0.6, 0.06);
    drawSeq([fb1, fb2], t, wt('S2', 'Feed') - 0.1, 0.6, 0.3); fadeAt(jd, t, wt('S2', 'Feed') + 0.6, 0.1);
    const loopHL = t >= T0('S3') && t < T0('S4'); [fb1, fb2].forEach(p => PUC.attr(p, 'stroke-width', loopHL ? 6 : 4));
    wireC(wRr, st.r); wireC(n1.ins[0], st.r); wireC(wSs, st.s); wireC(n2.ins[1], st.s);
    [n1.out, wQ, fb1, n2.ins[0]].forEach(p => wireC(p, st.q)); [n2.out, wQb, fb2, n1.ins[1]].forEach(p => wireC(p, st.qb));
    PUC.attr(LQ, 'fill', st.q ? AM : '#fff'); PUC.attr(LQb, 'fill', st.qb ? AM : '#fff');
    M.vis(sSc.g, t, tS + 0.8, 1e9, { dy: 0, fade: 0.2 });
    sSc.draw(0, tau => srAt(tau).s, t, 8, tS + 0.8); sSc.draw(1, tau => srAt(tau).r, t, 8, tS + 0.8); sSc.draw(2, tau => srAt(tau).q, t, 8, tS + 0.8);
    M.vis(ttHead, t, tS + 0.6, 1e9, { dy: 10 });
    const cur = st.inv ? 3 : st.s ? 1 : st.r ? 2 : (t >= rowT[0] ? 0 : -1);
    ttRows.forEach((r, i) => { M.vis(r, t, rowT[i] - 0.1, 1e9, { dy: 14 }); const on = i === cur; r.style.background = on ? (i === 3 ? C.redBg : C.ac2) : SOFT; r.style.outline = on ? `2.5px solid ${i === 3 ? C.red : AM}` : 'none'; });
    M.vis($('#ttBox'), t, T0('S10') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#ttX'), t, T0('S10'), 0.6); M.setT($('#ttW'), 'Q and Q̄ would both be 0'); M.vis($('#ttW'), t, wt('S10', 'opposite'), 1e9, { dy: 8 });
  }

  /* C: clock */
  const cOn = t >= tC - 0.05 && t < tJ + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tJ - 0.3;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    cSc.draw(0, cClk, t, 6, tC + 0.3); cSc.draw(1, cIn, t, 6, wt('C2', 'change')); cSc.draw(2, cQ, t, 6, wt('C2', 'change'));
    M.vis(cT, t, wt('C2', 'only'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#c1'), t, wt('C1', 'steady') - 0.1, 1e9, { dy: 16 }); M.vis($('#c2'), t, wt('C2', 'only') - 0.1, 1e9, { dy: 16 }); M.vis($('#c3'), t, wt('C3', 'step') - 0.3, 1e9, { dy: 16 });
  }

  /* J: JK */
  const jOn = t >= tJ - 0.05 && t < tD + 0.05; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const out = tD - 0.3, [j, k] = jkAt(t), q = jQ(t);
    M.vis($('#jL'), t, tJ + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#jR'), t, tJ + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(jBox.g, t, tJ + 0.3, 1e9, { dy: 0, fade: 0.2 }); drawSeq(jW, t, tJ + 0.4, 0.3, 0.06); fadeAt([...jL, jLamp], t, tJ + 0.6, 0.06);
    jC.forEach((c, i) => { M.vis(c.g, t, T0('J3') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, [j, k, q][i]); });
    wireC(jW[0], j); wireC(jW[2], k); wireC(jW[3], q); wireC(jW[4], 1 - q); wireC(jW[1], jClk(t)); PUC.attr(jLamp, 'fill', q ? AM : '#fff');
    M.vis(jSc.g, t, tJ + 0.5, 1e9, { dy: 0, fade: 0.2 });
    jSc.draw(0, jClk, t, 6, jC0); jSc.draw(1, tau => jkAt(tau)[0], t, 6, jC0); jSc.draw(2, tau => jkAt(tau)[1], t, 6, jC0); jSc.draw(3, jQ, t, 6, jC0);
    M.vis(jHead, t, tJ + 0.5, 1e9, { dy: 10 });
    const cur = t < jEv[0][0] ? -1 : j * 2 + k === 0 ? 0 : j && !k ? 1 : !j && k ? 2 : 3;
    jRows.forEach((r, i) => { M.vis(r, t, jEv[[0, 1, 2, 3][i]][0] - 0.1, 1e9, { dy: 14 }); const on = i === cur; r.style.background = on ? C.ac2 : SOFT; r.style.outline = on ? `2.5px solid ${AM}` : 'none'; });
    M.vis($('#jStrip'), t, wt('J5', 'toggle') - 0.2, 1e9, { dy: 24 });
  }

  /* D: D flip-flop */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.3, d = dIn(t), q = dQ(t);
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(dBox.g, t, tD + 0.3, 1e9, { dy: 0, fade: 0.2 }); drawSeq([dW[0], dW[3], dW[4], dW[2]], t, tD + 0.4, 0.3, 0.06); fadeAt([dL[0], dL[3], dL[4], dL[5]], t, tD + 0.6, 0.06);
    drawSeq([dW[1], ...dNot.ins, dNot.out], t, wt('D2', 'NOT') - 0.2, 0.3, 0.06); M.vis(dNot.body, t, wt('D2', 'NOT') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(dNot.bub, t, wt('D2', 'NOT'), 1e9, { dy: 0, fade: 0.2 }); M.vis(dJ, t, wt('D2', 'NOT'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt([dL[1], dL[2]], t, wt('D2', 'S') - 0.1, 0.4);
    dC.forEach((c, i) => { M.vis(c.g, t, [tD + 0.7, wt('D2', 'bar'), tD + 0.9][i], 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, [d, 1 - d, q][i]); });
    wireC(dW[0], d); wireC(dW[1], d); wireC(dNot.ins[0], d); wireC(dNot.out, 1 - d); wireC(dW[3], q); wireC(dW[4], 1 - q); wireC(dW[2], dClk(t));
    M.vis(dTag, t, wt('D3', 'never') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    dSc.draw(0, dClk, t, 6, dC0); dSc.draw(1, dIn, t, 6, dC0); dSc.draw(2, dQ, t, 6, dC0); M.vis(dT, t, wt('D4', 'copies') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dStrip'), t, wt('D5', 'registers') - 0.2, 1e9, { dy: 24 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'one') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt(wLL, t, tW + 0.3, 0.08); fadeAt(wEdge, t, wt('W2', 'Four'), 0.1); fadeAt(wNum, t, wt('W2', 'Four'), 0.1);
    let X = 140; tWR.slice(0, 4).forEach((tt, k) => { X += 150 * M.io((t - tt - 0.1) / 0.8); }); if (t >= tWR[4]) X = 784 * 1; else if (t >= tWR[3] + 1) X = Math.max(X, 740);
    PUC.attr(clipR, 'width', X.toFixed(1));
    wQv.forEach((c, k) => { M.vis(c.g, t, tWR[k] + 0.9, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); setChip(c, WQ[k + 1]); });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: T0('X3') - 0.05, tRight: wt('X3', 'both') - 0.1 });
    M.vis($('#tcA'), t, wt('X3', 'outputs') - 0.2, 1e9, { dy: 10 }); M.vis($('#tcB'), t, wt('X3', 'zero') - 0.1, 1e9, { dy: 10 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Expect') - 0.2 });
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
