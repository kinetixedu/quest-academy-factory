(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange (holes: hollow orange), t and R ink, energy gold
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', GD = '#B7791F';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const Iv = c(VI, 'I'), Vv = c(TE, 'V'), Eg = c(GD, 'E_g');

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': o.sw ?? 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, at, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions, roll-mode traces (newest at the right) */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });

/* small arrow (line + head) from (x1,y1) to (x2,y2) */
const arr = (p, x1, y1, x2, y2, col, sw = 3, hd = 10) => { const a = Math.atan2(y2 - y1, x2 - x1), g = mk(p, 'g');
  mk(g, 'path', { d: `M${x1},${y1} L${(x2 - Math.cos(a) * hd * 0.6).toFixed(1)},${(y2 - Math.sin(a) * hd * 0.6).toFixed(1)}`, stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', fill: 'none' });
  mk(g, 'path', { d: `M${x2},${y2} L${(x2 - Math.cos(a - 0.45) * hd).toFixed(1)},${(y2 - Math.sin(a - 0.45) * hd).toFixed(1)} L${(x2 - Math.cos(a + 0.45) * hd).toFixed(1)},${(y2 - Math.sin(a + 0.45) * hd).toFixed(1)} Z`, fill: col });
  return g; };
/* diode symbol centred at (x,y), rotated rot deg (0 = anode left, cathode right). kind: '', 'out' (light emitting), 'in' (photodiode). returns { g (inner, safe for M.vis), tri, bar, ar } */
const diode = (p, x, y, rot, s = 26, kind = '', acol = GD, lead = 0) => {
  const o = mk(p, 'g', { transform: `translate(${x},${y}) rotate(${rot})` }), g = mk(o, 'g');
  const parts = [];
  if (lead) parts.push(W(g, `M${-s - lead},0 H${-s}`), W(g, `M${s},0 H${s + lead}`));
  const tri = mk(g, 'path', { d: `M${-s},${-s} L${s},0 L${-s},${s} Z`, fill: '#fff', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const bar = W(g, `M${s},${-s - 2} V${s + 2}`);
  let ar = null;
  if (kind === 'out') { ar = mk(g, 'g'); arr(ar, -2, -s - 8, 14, -s - 30, acol); arr(ar, 14, -s - 4, 30, -s - 26, acol); }
  if (kind === 'in') { ar = mk(g, 'g'); arr(ar, 16, -s - 34, 0, -s - 10, acol); arr(ar, 32, -s - 30, 16, -s - 6, acol); }
  return { o, g, tri, bar, ar, parts };
};
/* cell symbol (long plate +, short plate -) on a vertical wire at x, plates centred at y; flip puts + at the bottom */
const cellV = (p, x, y, gap = 36) => { const a = W(p, '', { 'stroke-width': 5 }), b = W(p, '', { 'stroke-width': 9 });
  return f => { const yp = f ? y + gap / 2 : y - gap / 2, yn = f ? y - gap / 2 : y + gap / 2; PUC.attr(a, 'd', `M${x - 34},${yp} H${x + 34}`); PUC.attr(b, 'd', `M${x - 18},${yn} H${x + 18}`); return [a, b]; }; };
/* wavy photon arrow from (x1,y1) to (x2,y2): path + head; set(u) draws it on */
const photon = (p, x1, y1, x2, y2, col = GD, amp = 7, wl = 18, sw = 3) => {
  const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1), ux = Math.cos(a), uy = Math.sin(a);
  let d = ''; const n = Math.floor((L - 12) / 3);
  for (let i = 0; i <= n; i++) { const s = i * 3, w = amp * Math.sin(2 * Math.PI * s / wl) * Math.min(1, s / 10, (L - 12 - s) / 10); d += (i ? 'L' : 'M') + (x1 + ux * s - uy * w).toFixed(1) + ',' + (y1 + uy * s + ux * w).toFixed(1); }
  const g = mk(p, 'g'), pa = mk(g, 'path', { d, fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round' });
  const hd = mk(g, 'path', { d: `M${x2},${y2} L${(x2 - ux * 14 - uy * 7).toFixed(1)},${(y2 - uy * 14 + ux * 7).toFixed(1)} L${(x2 - ux * 14 + uy * 7).toFixed(1)},${(y2 - uy * 14 - ux * 7).toFixed(1)} Z`, fill: col });
  return { g, pa, hd, set(u, colr) { if (colr) { PUC.attr(pa, 'stroke', colr); PUC.attr(hd, 'fill', colr); } M.drawU(pa, u); M.hide(hd, u < 0.97); } };
};

/* transistor symbol: base bar at bx, centre by, size s. returns parts and terminal points */
const bjt = (p, bx, by, s, pnp = false, sw = 4) => {
  const o = mk(p, 'g'), g = mk(o, 'g');
  const lead = W(g, `M${bx - s},${by} H${bx}`, { 'stroke-width': sw }), bar = W(g, `M${bx},${by - 0.5 * s} V${by + 0.5 * s}`, { 'stroke-width': sw + 3 });
  const col = W(g, `M${bx},${by - 0.25 * s} L${bx + 0.7 * s},${by - 0.7 * s} V${by - 1.4 * s}`, { 'stroke-width': sw });
  const emi = W(g, `M${bx},${by + 0.25 * s} L${bx + 0.7 * s},${by + 0.7 * s} V${by + 1.4 * s}`, { 'stroke-width': sw });
  const x1 = bx, y1 = by + 0.25 * s, x2 = bx + 0.7 * s, y2 = by + 0.7 * s, a = Math.atan2(y2 - y1, x2 - x1) + (pnp ? Math.PI : 0);
  const cx = x1 + (x2 - x1) * (pnp ? 0.42 : 0.78), cy = y1 + (y2 - y1) * (pnp ? 0.42 : 0.78), h = 0.2 * s;
  const ah = mk(g, 'path', { d: `M${cx},${cy} L${(cx - Math.cos(a - 0.45) * h).toFixed(1)},${(cy - Math.sin(a - 0.45) * h).toFixed(1)} L${(cx - Math.cos(a + 0.45) * h).toFixed(1)},${(cy - Math.sin(a + 0.45) * h).toFixed(1)} Z`, fill: INK });
  return { o, g, lead, bar, col, emi, ah, B: [bx - s, by], C: [bx + 0.7 * s, by - 1.4 * s], E: [bx + 0.7 * s, by + 1.4 * s] };
};
/* horizontal cell on a wire at y, centred at x; plusRight puts the long (+) plate on the right */
const cellH = (p, x, y, plusRight) => { const g = mk(p, 'g'), d = 9;
  W(g, `M${plusRight ? x + d : x - d},${y - 34} V${y + 34}`, { 'stroke-width': 5 }); W(g, `M${plusRight ? x - d : x + d},${y - 18} V${y + 18}`, { 'stroke-width': 9 }); return g; };
const blocks = (p, x0, y0, h, ws, types) => { let x = x0; return ws.map((w, i) => { const r = mk(p, 'rect', { x, y: y0, width: w, height: h, fill: types[i] === 'n' ? '#FDF3DC' : '#FBEFE3', stroke: INK, 'stroke-width': 3 }); const o = { r, x, w }; x += w; return o; }); };
const eDot = (p, x, y, r = 8) => mk(p, 'circle', { cx: x, cy: y, r, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const hDot = (p, x, y, r = 9) => mk(p, 'circle', { cx: x, cy: y, r, fill: 'none', stroke: OR, 'stroke-width': 3 });
const Ib = c(VI, 'I_B'), Ic = c(VI, 'I_C'), Ie = c(VI, 'I_E');

/* ---------------- beats ---------------- */
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const tMorph = wt('H1', 'Aarav') - 0.2;
const tI = T0('I1'), tC = T0('C1'), tN = T0('N1'), tB = T0('B1'), tM = T0('M7'), tD = T0('D1'), tT = T0('T1'), tG = T0('G1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tG], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const lone = (el, t, tSib) => { el.style.left = (160 + 408 * (1 - M.io((t - tSib + 0.6) / 0.5))).toFixed(1) + 'px'; };

/* ================= A: hook ================= */
const hS = $('#hS');
const mic = mk(hS, 'g'); mk(mic, 'rect', { x: 92, y: 150, width: 44, height: 70, rx: 22, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(mic, 'M114,220 V270 M90,270 H138');
const spk = mk(hS, 'g'); mk(spk, 'rect', { x: 600, y: 110, width: 130, height: 200, rx: 14, fill: '#fff', stroke: INK, 'stroke-width': 4 });
mk(spk, 'circle', { cx: 665, cy: 170, r: 26, fill: C.soft, stroke: INK, 'stroke-width': 3 }); mk(spk, 'circle', { cx: 665, cy: 255, r: 40, fill: C.soft, stroke: INK, 'stroke-width': 3 });
const hW1 = W(hS, '', { stroke: AM, 'stroke-width': 4 }), hW2 = W(hS, '', { stroke: AM, 'stroke-width': 5 });
const hArr = arr(hS, 300, 210, 380, 210, INK, 4, 14);
const hBox = mk(hS, 'rect', { x: 392, y: 170, width: 80, height: 80, rx: 12, fill: C.soft, stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '8 6' }), hBoxT = tx(hS, 432, 222, '?', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: MU });
const hArr2 = arr(hS, 484, 210, 584, 210, INK, 4, 14);
const hr = [tx(hS, 40, 482, 'MIC', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), tx(hS, 160, 482, 'a tiny signal', { 'font-size': 28 }), tx(hS, 40, 532, 'SPEAKERS', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), tx(hS, 160, 532, 'a big current', { 'font-size': 28 })];
const wv = (x0, x1, yc, A, ph) => { let d = ''; for (let i = 0; i <= 60; i++) { const u = i / 60; d += (i ? 'L' : 'M') + (x0 + (x1 - x0) * u).toFixed(1) + ',' + (yc - A * Math.sin(6 * Math.PI * u - ph)).toFixed(1); } return d; };

/* ================= I: pipe and tap ================= */
const iS1 = $('#iS1'), iS2 = $('#iS2');
const pipe = [W(iS1, 'M40,260 H744', { 'stroke-width': 6 }), W(iS1, 'M40,360 H744', { 'stroke-width': 6 })];
const tapStem = W(iS1, 'M392,260 V200', { 'stroke-width': 8 }), tapG = mk(iS1, 'g'), tapH = mk(tapG, 'rect', { x: 352, y: 186, width: 80, height: 16, rx: 8, fill: AM, stroke: INK, 'stroke-width': 3 });
const tapL = mono(iS1, 392, 160, 'SMALL TAP', { 'text-anchor': 'middle', 'font-weight': 600 }), flowL = mono(iS1, 60, 410, 'BIG FLOW', { 'font-weight': 600 });
const water = flow(iS1, [[40, 310], [744, 310]], 14, { fill: '#8FA3C8', stroke: '#5F7399', r: 10 });
const tOpen = wt('I3', 'turn');
const openA = t => 0.15 + 0.85 * M.io((t - tOpen) / 0.8);
const offW = t => { let s = 0; const dt = 0.05; for (let x = tI; x < t; x += dt) s += 160 * openA(x) * Math.min(dt, t - x); return s; };
const iT = bjt(iS2, 330, 260, 110);
const iB = arr(iS2, 120, 220, 210, 220, VI, 3, 12), iC = arr(iS2, 470, 60, 470, 120, VI, 9, 26);
const iBL = tx(iS2, 92, 200, 'small IB', { fill: VI, 'font-size': 24 }), iCL = tx(iS2, 500, 100, 'big IC', { fill: VI, 'font-size': 26 });
$('#iZ1').innerHTML = M.icon('arrowR', 32, AM, 2.6); $('#iZ2').innerHTML = M.icon('arrowR', 32, AM, 2.6);

/* ================= C: construction ================= */
const cS = $('#cS');
const cb = blocks(cS, 60, 130, 200, [230, 60, 374], ['n', 'p', 'n']);
const cTop = [['EMITTER', 175, 'n'], ['BASE', 320, 'p'], ['COLLECTOR', 537, 'n']].map(([s, x]) => mono(cS, x, 112, s, { 'text-anchor': 'middle', 'font-weight': 600, fill: INK }));
const cTy = [['n', 175], ['p', 320], ['n', 537]].map(([s, x]) => tx(cS, x, 312, s, { 'text-anchor': 'middle', fill: s === 'n' ? AM : OR, 'font-size': 26 }));
const cE1 = [...Array(15)].map((_, k) => eDot(cS, 92 + (k % 5) * 42, 160 + Math.floor(k / 5) * 46));
const cH1 = [hDot(cS, 320, 176), hDot(cS, 320, 248)];
const cE2 = [...Array(8)].map((_, k) => eDot(cS, 400 + (k % 4) * 84, 176 + Math.floor(k / 4) * 70));
const cJ = [W(cS, 'M290,124 V336', { stroke: MU, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }), W(cS, 'M350,124 V336', { stroke: MU, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' })];
const cJL = [mono(cS, 284, 372, 'EMITTER BASE JUNCTION', { 'text-anchor': 'end', 'font-size': 17, 'font-weight': 600 }), mono(cS, 356, 404, 'COLLECTOR BASE JUNCTION', { 'font-size': 17, 'font-weight': 600 })];
const cJA = [W(cS, 'M290,340 V352', { stroke: MU, 'stroke-width': 2.5 }), W(cS, 'M350,340 V384', { stroke: MU, 'stroke-width': 2.5 })];
const cOut = cb.map(b => mk(cS, 'rect', { x: b.x, y: 130, width: b.w, height: 200, fill: 'none', stroke: AM, 'stroke-width': 6 }));
$('#cZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const cTx = [[T0('C1'), 'Three layers, <span class="acc">like a sandwich.</span>'], [T0('C2'), 'Emitter: <span class="acc">sends carriers.</span>'], [T0('C3'), 'Base: <span class="acc">controls the flow.</span>'],
  [T0('C4'), 'Collector: <span class="acc">collects them.</span>'], [T0('C5'), 'Two layers meet: <span class="acc">a junction.</span>'], [T0('C7'), 'Each layer <span class="acc">has a job.</span>']];
const ctl = ['#ct0', '#ct1', '#ct2'].map(s => $(s));
const tsv = ctl.map(e => e.querySelector('svg'));
blocks(tsv[0], 20, 20, 80, [130], ['n']); [...Array(12)].forEach((_, k) => eDot(tsv[0], 36 + (k % 6) * 20, 38 + Math.floor(k / 6) * 22, 6)); [...Array(6)].forEach((_, k) => eDot(tsv[0], 36 + k * 20, 82, 6));
blocks(tsv[1], 70, 20, 80, [30], ['p']); hDot(tsv[1], 85, 60, 7);
blocks(tsv[2], 10, 10, 100, [150], ['n']); [...Array(4)].forEach((_, k) => eDot(tsv[2], 34 + k * 34, 60, 6));

/* ================= N: npn and pnp ================= */
const nS1 = $('#nS1'), nS2 = $('#nS2');
const strip3 = (p, ty) => { const b = blocks(p, 192, 76, 64, [170, 60, 170], ty); const l = ty.map((s, i) => tx(p, b[i].x + b[i].w / 2, 118, s, { 'text-anchor': 'middle', fill: s === 'n' ? AM : OR, 'font-size': 26 })); return [...b.map(q => q.r), ...l]; };
const nst1 = strip3(nS1, ['n', 'p', 'n']), nst2 = strip3(nS2, ['p', 'n', 'p']);
const nT1 = bjt(nS1, 360, 300, 100), nT2 = bjt(nS2, 360, 300, 100, true);
const tLab = (p, T) => [tx(p, T.B[0] - 14, T.B[1] + 8, 'B', { 'text-anchor': 'end', 'font-size': 26 }), tx(p, T.C[0] + 16, T.C[1] + 22, 'C', { 'font-size': 26 }), tx(p, T.E[0] + 16, T.E[1] - 4, 'E', { 'font-size': 26 })];
const nL1 = tLab(nS1, nT1), nL2 = tLab(nS2, nT2);
const nI1 = arr(nS1, 470, 372, 470, 432, VI, 3.5, 13), nI2 = arr(nS2, 470, 432, 470, 372, VI, 3.5, 13);
const nIL1 = tx(nS1, 486, 412, 'I out', { fill: VI, 'font-size': 22 }), nIL2 = tx(nS2, 486, 412, 'I in', { fill: VI, 'font-size': 22 });
const nRing = [mk(nS1, 'circle', { cx: 417, cy: 362, r: 30, fill: 'none', stroke: AM, 'stroke-width': 4 }), mk(nS2, 'circle', { cx: 389, cy: 343, r: 30, fill: 'none', stroke: AM, 'stroke-width': 4 })];
$('#nZ1').innerHTML = M.icon('zap', 32, AM, 2.4); $('#nZ2').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= B: inside, bias, currents ================= */
const bS = $('#bS');
const bb = blocks(bS, 60, 110, 120, [240, 60, 364], ['n', 'p', 'n']);
const bTop = [['E', 180], ['B', 330], ['C', 542]].map(([s, x]) => tx(bS, x, 96, s, { 'text-anchor': 'middle', 'font-size': 24 }));
const bH = [hDot(bS, 330, 132), hDot(bS, 330, 210)];
const bW = [W(bS, 'M120,230 V400 H216'), W(bS, 'M234,400 H456'), W(bS, 'M330,230 V400'), W(bS, 'M474,400 H600 V230')];
const bC1 = cellH(bS, 225, 400, true), bC2 = cellH(bS, 465, 400, true);
const bCL = [tx(bS, 225, 456, 'VEB', { fill: TE, 'text-anchor': 'middle', 'font-size': 22 }), tx(bS, 465, 456, 'VCB', { fill: TE, 'text-anchor': 'middle', 'font-size': 22 })];
const bNode = mk(bS, 'circle', { cx: 330, cy: 400, r: 7, fill: INK });
const eMain = flow(bS, [[120, 400], [120, 170], [600, 170], [600, 400]], 18, { skip: (x, y) => false });
const eBase = flow(bS, [[330, 170], [330, 400]], 3);
$('#bZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const bTx = [[T0('B2'), 'Two junctions, <span class="acc">two kinds of bias.</span>'], [T0('M1'), 'Electrons rush <span class="acc">into the thin base.</span>'], [T0('M2'), 'Like runners <span class="acc">crossing a thin field.</span>'],
  [T0('M3'), 'A few <span class="acc">pair up with holes.</span>'], [T0('M5'), 'Most <span class="acc">reach the collector.</span>']];
const bRows = rows($('#bRows'), [['<span class="tt">Emitter base: forward</span>', 'gate open', 84], ['<span class="tt">Collector base: reverse</span>', 'pulls across', 168]]);
const bG = $('#bG');
const bars = [['IE', 10, 300], ['IB', 0.2, 390], ['IC', 9.8, 480]].map(([s, v, y]) => { const l = tx(bG, 40, y + 12, s, { fill: VI, 'font-style': 'italic', 'font-size': 28 });
  const b0 = mk(bG, 'rect', { x: 110, y: y - 14, width: 460, height: 28, rx: 8, fill: C.soft }), b = mk(bG, 'rect', { x: 110, y: y - 14, width: 0, height: 28, rx: 8, fill: VI });
  const vt = tx(bG, 744, y + 12, v.toFixed(1) + ' mA', { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', fill: VI, 'font-size': 26 }); return { l, b0, b, vt, v }; });
const tBar = [wt('M1', 'emitter'), wt('M3b', 'base'), wt('M6', 'collector')];

/* ================= M: breadboard ================= */
const ck = $('#ckS');
const mT = bjt(ck, 500, 270, 100);
const mW = [W(ck, 'M400,270 H320'), W(ck, 'M200,270 H120 V342'), W(ck, 'M120,378 V450 H760 V298'), W(ck, 'M570,410 V450'), W(ck, 'M570,130 V100 H620'), W(ck, 'M720,100 H760 V262')];
const mRB = W(ck, 'M320,270 L308,254 L288,286 L268,254 L248,286 L228,254 L212,270 H200'), mRC = W(ck, 'M620,100 L632,84 L652,116 L672,84 L692,116 L708,100 H720');
const mVbb = cellV(ck, 120, 360), mVcc = cellV(ck, 760, 280);
const mLb = [tx(ck, 260, 236, 'RB', { 'font-style': 'italic', 'font-size': 24, 'text-anchor': 'middle' }), tx(ck, 670, 66, 'RC', { 'font-style': 'italic', 'font-size': 24, 'text-anchor': 'middle' }),
  tx(ck, 54, 368, 'VBB', { fill: TE, 'font-size': 22 }), tx(ck, 796, 288, 'VCC', { fill: TE, 'font-size': 22 }), tx(ck, 392, 256, 'B', { 'font-size': 22, 'text-anchor': 'end' }), tx(ck, 586, 150, 'C', { 'font-size': 22 }), tx(ck, 586, 400, 'E', { 'font-size': 22 })];
const mN = [[570, 450]].map(([x, y]) => mk(ck, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const pC = [[760, 298], [760, 450], [570, 450], [570, 410], [570, 340], [500, 295], [500, 245], [570, 200], [570, 100], [760, 100], [760, 262]];
const pB = [[120, 378], [120, 450], [570, 450], [570, 410], [570, 340], [500, 295], [500, 270], [400, 270], [120, 270], [120, 342]];
const eCk = flow(ck, pC, 24, { skip: (x, y) => (Math.abs(y - 100) < 2 && x > 616 && x < 724) });
const eBk = flow(ck, pB, 10, { skip: (x, y) => (Math.abs(y - 270) < 2 && x > 196 && x < 324) || (Math.abs(x - 570) < 2 && y > 330) || (x > 499 && y > 290 && y < 345 && x < 572), r: 6 });
const scS = $('#scS'), scG = mk(scS, 'g', { transform: 'translate(32,68)' });
const scp = scope(scG, 576, 208), trB = scp.tr('#B9A2F2'), trC = scp.tr(VI);
scp.lab(12, 22, 'CH1 · IB (μA)', '#B9A2F2'); scp.lab(564, 22, 'CH2 · IC (mA)', '#B9A2F2', { 'text-anchor': 'end' });
$('#ro1').innerHTML = `<span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="vB" style="color:${VI}">20</span><span class="u">μA</span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="vC" style="color:${VI}">2.00</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>E</sub></span><span class="v" id="vE" style="color:${VI}">2.02</span><span class="u">mA</span>`;
$('#mZ').innerHTML = M.icon('zap', 30, AM, 2.4);
const tRaise = wt('M8', 'Raise'), tWig = wt('M9', 'wiggle');
const IBu = x => (x < tRaise ? 20 : 20 + 10 * M.io((x - tRaise) / 0.6)) + (x < tWig ? 0 : 8 * M.io((x - tWig) / 0.5) * Math.sin(Math.PI * (x - tWig)));
const ICm = x => IBu(x) / 10;
const offCk = t => { let s = 0; const dt = 0.05; for (let x = tM; x < t; x += dt) s += 40 * ICm(x) * Math.min(dt, t - x); return s; };
const offBk = t => { let s = 0; const dt = 0.05; for (let x = tM; x < t; x += dt) s += 1.2 * IBu(x) * Math.min(dt, t - x); return s; };
const mTx = [[T0('M7'), 'Meters and scope <span class="acc">switched on.</span>'], [T0('M8'), 'A little more I<sub>B</sub>, <span class="acc">a lot more I<sub>C</sub>.</span>'], [T0('M9'), 'Small wiggle in, <span class="acc">big wiggle out.</span>']];

/* ================= D: the rule ================= */
const dS = $('#dS');
const dT = bjt(dS, 330, 290, 120);
const dA = [arr(dS, 120, 250, 190, 250, VI, 3.5, 13), arr(dS, 450, 80, 450, 140, VI, 3.5, 13), arr(dS, 450, 440, 450, 500, VI, 3.5, 13)];
const dAL = [tx(dS, 110, 232, 'IB', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), tx(dS, 470, 120, 'IC', { fill: VI, 'font-style': 'italic', 'font-size': 28 }), tx(dS, 470, 480, 'IE', { fill: VI, 'font-style': 'italic', 'font-size': 28 })];
const dEq = tx(dS, 600, 300, 'IE = IB + IC', { 'text-anchor': 'middle', fill: VI, 'font-size': 26, 'font-family': 'IBM Plex Mono' });
const dRows = rows($('#dSteps'), [
  [K(`${Ie}`), 'all carriers enter here', 92], [K(`${Ie} \\rightarrow ${Ib} + ${Ic}`), 'it splits in two', 196],
  [K(`${Ie} = ${Ib} + ${Ic}`), 'current law', 300], [K(`${Ib} \\ll ${Ic} \\quad\\Rightarrow\\quad ${Ic} \\approx ${Ie}`), '', 404],
  ['<span class="tt">Bipolar: electrons and holes</span>', '', 508]]);
const tDR = [wt('D2', 'emitter'), wt('D3', 'splits'), wt('D4', 'equals'), wt('D6', 'tiny'), wt('D7', 'bipolar')];
const avD = PUC.avatar($('#sD'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Tiny base, big control!' });

/* ================= G: fest payoff + worked example ================= */
const gS = $('#gS'), gG = mk(gS, 'g'), wG = mk(gS, 'g');
const gbox = (x, lab) => { mk(gG, 'rect', { x, y: 150, width: 200, height: 150, rx: 14, fill: '#fff', stroke: INK, 'stroke-width': 3 }); mono(gG, x + 100, 334, lab, { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }); };
gbox(44, 'MICROPHONE'); gbox(292, 'TRANSISTOR'); gbox(540, 'SPEAKERS');
const gw1 = W(gG, wv(64, 224, 225, 8, 0), { stroke: '#B9A2F2', 'stroke-width': 4 }), gw3 = W(gG, wv(560, 720, 225, 50, 0), { stroke: VI, 'stroke-width': 5 });
bjt(gG, 360, 225, 34, false, 3);
arr(gG, 248, 225, 288, 225, INK, 4, 14); arr(gG, 496, 225, 536, 225, INK, 4, 14);
const gT = [mono(gG, 144, 120, 'TINY', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(gG, 640, 120, 'BIG COPY', { 'text-anchor': 'middle', 'font-weight': 600 })];
const wT = bjt(wG, 260, 220, 80);
const wA = [arr(wG, 80, 196, 140, 196, VI, 3.5, 13), arr(wG, 360, 100, 360, 146, VI, 3.5, 13), arr(wG, 360, 296, 360, 342, VI, 3.5, 13)];
const wAL = [tx(wG, 70, 182, 'IB', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), tx(wG, 380, 132, 'IC = ?', { fill: VI, 'font-style': 'italic', 'font-size': 26 }), tx(wG, 380, 330, 'IE', { fill: VI, 'font-style': 'italic', 'font-size': 26 })];
$('#wRo').innerHTML = `<span class="k" style="color:${VI}">I<sub>E</sub></span><span class="v" style="color:${VI}">10.0</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="wB" style="color:${VI}">?</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="wC" style="color:${VI}">?</span><span class="u">mA</span>`;
const gRows = rows($('#gSteps'), [['<span class="tt">The mic sends a tiny signal</span>', '', 92], ['<span class="tt">It goes into the base</span>', '', 196], ['<span class="tt">The collector current copies it</span>', '', 300], ['<span class="tt">Much bigger: the speakers boom</span>', '', 404]]);
const tGR = [wt('G1', 'microphone'), wt('G1', 'base'), wt('G2', 'copies'), wt('G2', 'bigger')];
const wRows = rows($('#wSteps'), [
  [K(`${Ie} = 10\\,\\text{mA},\\ ${Ib} = 0.2\\,\\text{mA}`), 'given', 92], [K(`${Ic} = ${Ie} - ${Ib}`), '', 196],
  [K(`${Ic} = 10 - 0.2 = 9.8\\,\\text{mA}`), '', 300], [K(`\\dfrac{9.8}{10} = 98\\%`), 'reaches the collector', 404]]);
const tWR = [wt('W1', 'ten'), wt('W3', 'equals'), wt('W4', 'nine'), wt('W5', 'ninety')];

/* ================= X ================= */
const trap = PUC.trap($('#trap'), { wrong: 'The base is thick and heavily doped', right: 'Base: thinnest, most lightly doped', y0: 96, y1: 184 });
const CM = [['LAYER', 'DOPING', 'SIZE'], ['EMITTER', 'heavy', 'medium'], ['BASE', 'light', 'thinnest'], ['COLLECTOR', 'moderate', 'largest']];
$('#cmp').innerHTML = CM.map((r, i) => r.map((s, j) => `<div class="${i === 0 ? 'hd' : j === 0 ? 'k3' : ''}"${(i === 2 && j > 0) || (i === 3 && j === 2) ? ` style="color:${AM}"` : ''}>${s}</div>`).join('')).join('');
const cmEls = [...$('#cmp').children];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'ISC BOARDS'], type: 'Draw npn and pnp structures and symbols · explain transistor action · use I<sub>E</sub> = I<sub>B</sub> + I<sub>C</sub>' });

/* ================= Q ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'In a transistor, the emitter current is 5&nbsp;mA. 2% of the electrons recombine in the base. What is the collector current?', qW: 760,
  opts: ['4.9 mA', '5.1 mA', '0.1 mA', '4.8 mA'], right: 0, optW: 474, optY: 330, optFs: 28 });
const sol = PUC.solution($('#so'), [[K(`${Ib} = 2\\% \\times 5 = 0.1\\,\\text{mA}`)], [K(`${Ic} = ${Ie} - ${Ib}`)], [K(`${Ic} = 5 - 0.1 = 4.9\\,\\text{mA}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'two'), wt('A4', 'equals'), wt('A4', 'four')];

/* ================= F ================= */
const fc = PUC.fcard($('#sF'), { x: 400, y: 236, w: 1120, h: 500, y0: 104, dy: 74, title: 'Bipolar junction transistor · formula card', txt: [0, 1, 1, 1, 1],
  lines: [K(`${Ie} = ${Ib} + ${Ic} \\qquad ${Ib} \\ll ${Ic}`), 'Emitter heavily doped · base very thin, lightly doped · collector largest',
    'Working: emitter base forward biased, collector base reverse biased', 'Symbol arrow on the emitter: npn points out, pnp points in', 'Bipolar: both electrons and holes carry the current'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 49', topic: 'CE configuration, alpha and beta', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[T0('M3b'), tD - 0.32], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o }); M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#lmC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    M.vis(mic, t, wt('H1', 'taps') - 0.2, 1e9, { dy: 16 }); M.vis(spk, t, wt('H2', 'speakers') - 0.2, 1e9, { dy: 16 });
    PUC.attr(hW1, 'd', wv(160, 290, 210, 10, 8 * t)); M.vis(hW1, t, wt('H1', 'tiny'), 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(hW2, 'd', wv(500, 590, 380, 0, 0)); M.hide(hW2, true);
    [hArr, hBox, hBoxT, hArr2].forEach((e, i) => M.vis(e, t, wt('H3', 'How') + i * 0.12, 1e9, { dy: 0, fade: 0.2 }));
    fadeAt(hr.slice(0, 2), t, wt('H1', 'tiny'), 0.1); fadeAt(hr.slice(2), t, wt('H2', 'boom'), 0.1);
    spk.style.transform = t > wt('H2', 'boom') ? `translate(${(3 * Math.sin(40 * t)).toFixed(1)}px,0)` : '';
    M.vis($('#hQ'), t, wt('H3', 'control') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I */
  const iOn = t >= tI - 0.05 && t < tC + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tC - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, T0('I4') - 0.3, out, { dx: 60, dy: 0, ...o }); lone($('#iL'), t, T0('I4'));
    drawSeq(pipe, t, tI + 0.4, 0.5, 0.1); M.vis(tapStem, t, wt('I2', 'tap') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(tapG, t, wt('I2', 'tap') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([tapL, flowL], t, wt('I2', 'tap'), 0.2);
    tapG.setAttribute('transform', `rotate(${(-50 * M.io((t - tOpen) / 0.8)).toFixed(1)} 392 194)`);
    water.set(offW(t), t >= tI + 0.8);
    M.vis($('#iSt1'), t, wt('I3', 'controls'), 1e9, { dy: 24 });
    M.vis(iT.g, t, T0('I4'), 1e9, { dy: 0, fade: 0.25 }); M.vis(iB, t, wt('I4', 'small'), 1e9, { dx: -20, dy: 0 }); M.vis(iBL, t, wt('I4', 'small'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(iC, t, wt('I4', 'big'), 1e9, { dy: -20 }); M.vis(iCL, t, wt('I4', 'big'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#iSt2'), t, wt('I4', 'big') + 0.3, 1e9, { dy: 24 });
  }

  /* C */
  const cOn = t >= tC - 0.05 && t < tN + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tN - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, T0('C7') - 0.3, out, { dx: 60, dy: 0, ...o }); lone($('#cL'), t, T0('C7'));
    const tl = [wt('C2', 'emitter'), wt('C3', 'base'), wt('C4', 'collector')];
    cb.forEach((b, i) => { M.vis(b.r, t, tl[i] - 0.3, 1e9, { dy: 20 }); M.vis(cTop[i], t, tl[i], 1e9, { dy: 0, fade: 0.2 }); M.vis(cTy[i], t, tl[i] + 0.2, 1e9, { dy: 0, fade: 0.2 }); });
    cE1.forEach((e, i) => M.vis(e, t, tl[0] + 0.3 + i * 0.03, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 })); cH1.forEach((e, i) => M.vis(e, t, tl[1] + 0.3 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    cE2.forEach((e, i) => M.vis(e, t, tl[2] + 0.3 + i * 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    cJ.forEach((e, i) => M.draw(e, t, (i ? wt('C6', 'collector') : wt('C6', 'emitter')) - 0.2, 0.4)); cJL.forEach((e, i) => M.vis(e, t, i ? wt('C6', 'collector') : wt('C6', 'emitter'), 1e9, { dy: 0, fade: 0.2 }));
    cJA.forEach((e, i) => M.vis(e, t, i ? wt('C6', 'collector') : wt('C6', 'emitter'), 1e9, { dy: 0, fade: 0.2 }));
    const hl = [[T0('C8'), T0('C9')], [T0('C9'), T0('C11')], [T0('C11'), tN]];
    cOut.forEach((e, i) => M.vis(e, t, hl[i][0], hl[i][1] - 0.1, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }));
    ctl.forEach((e, i) => M.vis(e, t, hl[i][0] + 0.1, 1e9, { dy: 20 }));
    const ct = cTx.filter(([a]) => t >= a - 0.1).pop(); if (ct) setH($('#cTx'), ct[1]); M.vis($('#cSt'), t, tC + 0.5, 1e9, { dy: 24 });
  }

  /* N */
  const nOn = t >= tN - 0.05 && t < tB + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tB - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, T0('N3') - 0.3, out, { dx: 60, dy: 0, ...o }); lone($('#nL'), t, T0('N3'));
    fadeAt(nst1, t, T0('N2'), 0.06); fadeAt(nst2, t, T0('N3') + 0.2, 0.06);
    [[nT1, nL1, T0('N2') + 1.2], [nT2, nL2, T0('N3') + 1.4]].forEach(([T, L, t0]) => { drawSeq([T.lead, T.bar, T.col, T.emi], t, t0, 0.35, 0.12); fadeAt(L, t, t0 + 0.6, 0.08); M.vis(T.ah, t, wt('N4', 'arrow'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
    nRing.forEach(e => M.vis(e, t, wt('N4', 'emitter'), T0('N6'), { dy: 0, sc: 0.6, fade: 0.15, outDur: 0.2, ody: 0 }));
    M.vis(nI1, t, wt('N6', 'out'), 1e9, { dy: -16 }); M.vis(nIL1, t, wt('N6', 'out'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(nI2, t, wt('N6', 'in'), 1e9, { dy: 16 }); M.vis(nIL2, t, wt('N6', 'in'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#nSt1'), t, wt('N7', 'trick'), 1e9, { dy: 24 }); M.vis($('#nSt2'), t, wt('N7', 'trick') + 0.3, 1e9, { dy: 24 });
  }

  /* B */
  const bOn = t >= tB - 0.05 && t < tM + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32;
    M.vis($('#bL'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#bR'), t, tB + 0.25, out, { dx: 60, dy: 0, ...o });
    bb.forEach((b, i) => M.vis(b.r, t, tB + 0.3 + i * 0.12, 1e9, { dy: 16 })); fadeAt(bTop, t, tB + 0.5, 0.1); fadeAt(bH, t, tB + 0.7, 0.1);
    drawSeq(bW, t, T0('B2'), 0.35, 0.12); [bC1, bC2, bNode].forEach((e, i) => M.vis(e, t, T0('B2') + 0.4 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(bCL[0], t, wt('B3', 'forward'), 1e9, { dy: 0, fade: 0.2 }); M.vis(bCL[1], t, wt('B4', 'reverse'), 1e9, { dy: 0, fade: 0.2 });
    runRows(bRows, t, [wt('B3', 'forward'), wt('B4', 'reverse')]);
    const tm = T0('M1'), fl = t >= tm;
    eMain.set(140 * (t - tm), fl); eBase.set(22 * Math.max(0, t - wt('M3', 'few')), t >= wt('M3', 'few')); M.vis($('#bE'), t, tm, 1e9, { dy: 0, fade: 0.2 });
    bH.forEach(h => PUC.attr(h, 'stroke', t > wt('M3', 'pair') && Math.sin(8 * t) > 0.3 ? AM : OR));
    const bt = bTx.filter(([a]) => t >= a - 0.1).pop(); if (bt) setH($('#bTx'), bt[1]); M.vis($('#bSt'), t, T0('B2'), 1e9, { dy: 24 });
    bars.forEach((q, i) => { [q.l, q.b0, q.vt].forEach(e => M.vis(e, t, tBar[i], 1e9, { dy: 0, fade: 0.2 })); PUC.attr(q.b, 'width', (Math.max(4, 46 * q.v) * M.io((t - tBar[i]) / 0.6)).toFixed(1)); M.hide(q.b, t < tBar[i]); });
  }

  /* M */
  const mOn = t >= tM - 0.05 && t < tD + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc2'), t, tM + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tM + 0.45, out, { dy: 36, ...o });
    M.vis(mT.g, t, tM + 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq([...mW, mRB, mRC], t, tM + 0.3, 0.3, 0.06);
    [...mVbb(false), ...mVcc(false), ...mN].forEach(e => M.vis(e, t, tM + 0.6, 1e9, { dy: 0, fade: 0.2 })); fadeAt(mLb, t, tM + 0.8, 0.05);
    const fo = t >= tM + 0.9; eCk.set(offCk(t), fo); eBk.set(offBk(t), fo); M.vis($('#ckE'), t, tM + 0.9, 1e9, { dy: 0, fade: 0.2 });
    const mt = mTx.filter(([a]) => t >= a - 0.1).pop(); if (mt) setH($('#mTx'), mt[1]); M.vis($('#mSt'), t, tM + 0.4, 1e9, { dy: 24 });
    M.vis(scS, t, tM + 0.4, 1e9, { dy: 0, fade: 0.2 });
    trB(x => 0.9 * IBu(x), t, tM + 0.6, 6, 196, t >= tM + 0.6); trC(x => 36 * ICm(x), t, tM + 0.6, 6, 196, t >= tM + 0.6);
    M.vis($('#ro1'), t, tM + 0.7, 1e9, { dy: 12 }); const ib = IBu(t); M.setT($('#vB'), ib.toFixed(0)); M.setT($('#vC'), (ib / 10).toFixed(2)); M.setT($('#vE'), (ib / 10 + ib / 1000).toFixed(2));
  }

  /* D */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.3;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(dT.g, t, tD + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const ta = [wt('D3', 'base'), wt('D3', 'collector'), wt('D2', 'emitter')];
    dA.forEach((a, i) => M.vis(a, t, ta[i], 1e9, { dy: 0, fade: 0.2 })); dAL.forEach((a, i) => M.vis(a, t, ta[i] + 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(dEq, t, wt('D4', 'equals'), T0('D6') - 0.1, { dy: 10, outDur: 0.2 });
    runRows(dRows, t, tDR); M.vis($('#dBox'), t, tDR[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dTag'), t, wt('D7', 'electrons'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avD(t, wt('D6', 'tiny') + 0.3, out);
  }

  /* T */
  const stOn = t >= tT - 0.1 && t < tG; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tG - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'control') - 0.05, { out: tG - 0.35, outDur: 0.25 }); }

  /* G + W */
  const gOn = t >= tG - 0.05 && t < tX + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tX - 0.32, wOn = t >= tW;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gLL1'), t, tG + 0.3, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gLL2'), t, tW + 0.1, 1e9, { dy: 10 });
    M.vis($('#gRL1'), t, tG + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    M.vis(gG, t, tG + 0.4, tW - 0.3, { dy: 16, outDur: 0.25 });
    PUC.attr(gw1, 'd', wv(64, 224, 225, 8, 6 * t)); PUC.attr(gw3, 'd', wv(560, 720, 225, 50, 6 * t)); M.hide(gw3, t < tGR[2]); fadeAt(gT, t, tG + 0.6, 0.3);
    gRows.forEach(r => M.hide(r, wOn)); if (!wOn) runRows(gRows, t, tGR, tW - 0.3);
    M.vis(wG, t, tW + 0.1, 1e9, { dy: 16 }); M.vis($('#wRo'), t, tW + 0.5, 1e9, { dy: 12 });
    M.setT($('#wB'), t >= wt('W2', 'zero') ? '0.2' : '?'); M.setT($('#wC'), t >= tWR[2] + 0.4 ? '9.8' : '?'); M.setT(wAL[1], t >= tWR[2] + 0.4 ? 'IC = 9.8 mA' : 'IC = ?');
    wRows.forEach(r => M.hide(r, !wOn)); if (wOn) runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[2] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'opposite') - 0.05, tRight: wt('X3', 'thinnest') - 0.4 });
    const tr = [tX + 0.5, T0('X4'), wt('X3', 'thinnest'), wt('X4', 'largest')];
    cmEls.forEach((e, i) => M.vis(e, t, tr[Math.floor(i / 3)] + (i % 3) * 0.1, 1e9, { dy: 0, dx: -12, fade: 0.12 }));
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'PUC'), wt('X5', 'board')], tType: T0('X6') });
  }

  /* Q */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) { M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 }); mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns }); M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 }); sol(t, tAns + 0.1, tSol); }

  /* F */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
