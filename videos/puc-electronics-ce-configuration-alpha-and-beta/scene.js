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

const al = c(GD, '\\alpha'), be = c(GD, '\\beta');

/* ---------------- beats ---------------- */
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const tMorph = wt('H1', 'Aarav') - 0.2;
const tI = T0('I1'), tC = T0('C1'), tR = T0('R1'), tD = T0('D1'), tG = T0('G1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const lone = (el, t, tSib) => { el.style.left = (160 + 408 * (1 - M.io((t - tSib + 0.6) / 0.5))).toFixed(1) + 'px'; };

/* ================= A ================= */
const hS = $('#hS');
const lines = [...Array(6)].map((_, k) => W(hS, `M60,${110 + k * 56} H724`, { stroke: '#D9E3F2', 'stroke-width': 2 }));
const hL1 = tx(hS, 70, 150, 'Current gain:', { 'font-size': 34 }), hL1v = tx(hS, 330, 152, '100', { 'font-family': 'IBM Plex Mono', 'font-size': 52, fill: AM });
const hL2 = tx(hS, 70, 262, 'alpha = ?', { 'font-size': 34, fill: GD }), hL3 = tx(hS, 70, 330, 'beta = ?', { 'font-size': 34, fill: GD });
const hr = [tx(hS, 40, 482, 'SMALL', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), tx(hS, 140, 482, 'one tiny part', { 'font-size': 28 }), tx(hS, 40, 532, 'GAIN', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), tx(hS, 140, 532, 'a hundred times?', { 'font-size': 28 })];

/* ================= I ================= */
const iS1 = $('#iS1');
const iT = bjt(iS1, 360, 250, 90);
const iLb = [tx(iS1, iT.B[0] - 12, iT.B[1] + 8, 'B', { 'text-anchor': 'end', 'font-size': 26 }), tx(iS1, iT.C[0] + 14, iT.C[1] + 20, 'C', { 'font-size': 26 }), tx(iS1, iT.E[0] + 14, iT.E[1] - 4, 'E', { 'font-size': 26 })];
const port = (x, lab) => { const g = mk(iS1, 'g'); mk(g, 'rect', { x, y: 170, width: 110, height: 160, rx: 12, fill: C.soft, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); mono(g, x + 55, 156, lab, { 'text-anchor': 'middle', 'font-weight': 600 });
  [210, 290].forEach(y => mk(g, 'circle', { cx: x + 55, cy: y, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3 })); return g; };
const pIn = port(60, 'IN 2 WIRES'), pOut = port(614, 'OUT 2 WIRES');
const iCount = tx(iS1, 392, 440, '2 + 2 = 4 ends, but only 3 legs', { 'text-anchor': 'middle', 'font-size': 24, fill: MU });
const iRing = mk(iS1, 'circle', { cx: iT.E[0], cy: iT.E[1] - 20, r: 28, fill: 'none', stroke: AM, 'stroke-width': 4 });
$('#iZ1').innerHTML = M.icon('arrowR', 32, AM, 2.6);
const itl = ['#it0', '#it1', '#it2'].map(s => $(s));
itl.forEach((e, i) => { const sv = e.querySelector('svg'); const T = bjt(sv, 60, 60, 34, false, 3); const p = i === 0 ? T.B : i === 1 ? T.C : T.E;
  mk(sv, 'circle', { cx: p[0], cy: p[1], r: 9, fill: AM, stroke: INK, 'stroke-width': 2 }); });

/* ================= circuit builder (C and G) ================= */
const ce = sv => {
  const T = bjt(sv, 380, 250, 80);
  const w = [W(sv, 'M300,250 H284'), W(sv, 'M176,250 H100 V312'), W(sv, 'M100,348 V440 H680 V278'), W(sv, 'M436,362 V440'), W(sv, 'M436,138 V90 H496'), W(sv, 'M604,90 H680 V242')];
  const rb = W(sv, 'M284,250 L272,234 L252,266 L232,234 L212,266 L192,234 L180,250 H176'), rc = W(sv, 'M496,90 L508,74 L528,106 L548,74 L568,106 L588,74 L600,90 H604');
  const vbb = cellV(sv, 100, 330), vcc = cellV(sv, 680, 260);
  const gnd = W(sv, 'M100,440 H680 M436,362 V440', { stroke: AM, 'stroke-width': 8 });
  const lb = [tx(sv, 230, 214, 'RB', { 'font-style': 'italic', 'font-size': 22, 'text-anchor': 'middle' }), tx(sv, 550, 56, 'RC', { 'font-style': 'italic', 'font-size': 22, 'text-anchor': 'middle' }),
    tx(sv, 36, 338, 'VBB', { fill: TE, 'font-size': 20 }), tx(sv, 712, 268, 'VCC', { fill: TE, 'font-size': 20 }), tx(sv, 292, 238, 'B', { 'font-size': 22, 'text-anchor': 'end' }), tx(sv, 450, 150, 'C', { 'font-size': 22 }), tx(sv, 450, 352, 'E', { 'font-size': 22 })];
  const pC = [[680, 278], [680, 440], [436, 440], [436, 362], [436, 306], [380, 270], [380, 230], [436, 194], [436, 90], [680, 90], [680, 242]];
  const pB = [[100, 348], [100, 440], [436, 440], [436, 362], [436, 306], [380, 270], [380, 250], [300, 250], [100, 250], [100, 312]];
  const fC = flow(sv, pC, 22, { skip: (x, y) => (Math.abs(y - 90) < 2 && x > 492 && x < 608) });
  const fB = flow(sv, pB, 9, { r: 6, skip: (x, y) => (Math.abs(y - 250) < 2 && x > 172 && x < 288) || (Math.abs(x - 436) < 2 && y > 300) || (x > 379 && y > 268 && y < 310 && x < 438) });
  return { T, w, rb, rc, vbb, vcc, gnd, lb, fC, fB };
};
const cC = ce($('#cS'));
const cIn = [W($('#cS'), 'M70,214 H330 V470 H70 Z', { stroke: TE, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' }), mono($('#cS'), 78, 462, 'INPUT', { fill: TE, 'font-weight': 600 })];
const cOut = [W($('#cS'), 'M420,64 H760 V470 H420 Z', { stroke: VI, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' }), mono($('#cS'), 752, 462, 'OUTPUT', { fill: VI, 'font-weight': 600, 'text-anchor': 'end' })];
$('#cZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const cTx = [[T0('C1'), 'Build a <span class="acc">common emitter</span> circuit.'], [T0('C2'), 'Input: <span class="acc">base and emitter.</span>'], [T0('C3'), 'Output: <span class="acc">collector and emitter.</span>'],
  [T0('C4'), 'The emitter is <span class="acc">shared, so common.</span>'], [T0('C5'), 'Small battery in, <span class="acc">bigger battery out.</span>'], [T0('C6'), 'Small I<sub>B</sub> in, <span class="acc">big I<sub>C</sub> out.</span>']];
const cRows = rows($('#cRows'), [['<span class="tt">Input: base and emitter</span>', '', 92], ['<span class="tt">Output: collector and emitter</span>', '', 196], ['<span class="tt">Emitter shared by both</span>', 'common', 300],
  [K(`\\text{in: } ${Ib} \\qquad \\text{out: } ${Ic}`), '', 404]]);

/* ================= R: runners ================= */
const rS = $('#rS');
const rb3 = blocks(rS, 40, 90, 260, [260, 50, 404], ['n', 'p', 'n']);
const rTop = [['EMITTER', 170], ['BASE', 315], ['COLLECTOR', 552]].map(([s, x]) => mono(rS, x, 76, s, { 'text-anchor': 'middle', 'font-weight': 600, fill: INK }));
const rD = [...Array(100)].map((_, k) => ({ k, x0: 58 + (k % 10) * 24, y0: 106 + Math.floor(k / 10) * 24, x1: 330 + 4 + 34 + (k % 14) * 26, y1: 106 + Math.floor(k / 14) * 32, e: eDot(rS, 0, 0, 7) }));
const stuck = rD[45]; stuck.x1 = 315; stuck.y1 = 220;
const rH = hDot(rS, 315, 220, 10);
const rC1 = tx(rS, 40, 410, 'REACHED COLLECTOR', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), rC1v = tx(rS, 744, 412, '0', { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: AM });
const rC2 = tx(rS, 40, 470, 'STUCK IN BASE', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), rC2v = tx(rS, 744, 472, '0', { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: OR });
const tRun = wt('R2', 'Ninety') - 0.6, RUN = 2.6;
const rp = (d, t) => { const u = M.io(M.clamp((t - tRun - d.k * 0.012) / RUN)); return u; };
$('#raF').innerHTML = K(`${al} = \\dfrac{99}{100} = 0.99`); $('#rbF').innerHTML = K(`${be} = \\dfrac{99}{1} = 99`);
const avR = PUC.avatar($('#sR'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So gain 100 means beta!' });

/* ================= D ================= */
$('#daF').innerHTML = K(`${al} = \\dfrac{${Ic}}{${Ie}}`); $('#dbF').innerHTML = K(`${be} = \\dfrac{${Ic}}{${Ib}}`); $('#dcF').innerHTML = K(`${be}_{ac} = \\dfrac{\\Delta ${Ic}}{\\Delta ${Ib}}`);
const dRows = rows($('#dSteps'), [
  [K(`${Ie} = ${Ib} + ${Ic}`), 'the current rule', 92], [K(`\\dfrac{${Ie}}{${Ic}} = \\dfrac{${Ib}}{${Ic}} + 1`), 'divide by I<sub>C</sub>', 188],
  [K(`\\dfrac{1}{${al}} = \\dfrac{1}{${be}} + 1`), '', 296], [K(`${al} = \\dfrac{${be}}{1 + ${be}}`), '', 400], [K(`${be} = \\dfrac{${al}}{1 - ${al}}`), '', 504]]);
const tDR = [wt('D4', 'equals'), wt('D5', 'Divide'), wt('D6', 'One'), wt('D7', 'Alpha'), wt('D8', 'beta')];

/* ================= G ================= */
const gC = ce($('#gS'));
$('#gRo1').innerHTML = `<span class="k" style="color:${TE}">V<sub>BE</sub></span><span class="v" id="gVbe" style="color:${TE};font-size:32px">0.00</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="gIb" style="color:${VI};font-size:32px">0</span><span class="u">μA</span>`;
$('#gRo2').innerHTML = `<span class="k" style="color:${TE}">V<sub>CE</sub></span><span class="v" id="gVce" style="color:${TE};font-size:32px">5.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="gIc" style="color:${VI};font-size:32px">0.00</span><span class="u">mA</span>`;
const gP = $('#gP'), sG = mk(gP, 'g', { transform: 'translate(32,76)' });
mk(sG, 'rect', { x: 0, y: 0, width: 720, height: 490, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(sG, 'line', { x1: 720 * i / 6, y1: 0, x2: 720 * i / 6, y2: 490, stroke: '#2A3758', 'stroke-width': 1.5 });
for (let j = 1; j < 4; j++) mk(sG, 'line', { x1: 0, y1: 490 * j / 4, x2: 720, y2: 490 * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
const X0 = 70, Y0 = 430, XW = 600, YH = 360;
W(sG, `M${X0},40 V${Y0} H${X0 + XW + 20}`, { stroke: '#8FA3C8', 'stroke-width': 2.5 });
const lab = (x, y, s, col, a = {}) => { const e = mk(sG, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: col, ...a }); e.textContent = s; return e; };
const inG = mk(sG, 'g'), outG = mk(sG, 'g');
[lab(X0 + XW, Y0 + 34, 'VBE (V)', '#5FD0C8', { 'text-anchor': 'end' }), lab(X0 + 10, 34, 'IB (μA)', '#B9A2F2'), lab(X0, Y0 + 30, '0', '#8FA3C8', { 'text-anchor': 'middle' }), lab(X0 + XW * 0.5, Y0 + 30, '0.5', '#8FA3C8', { 'text-anchor': 'middle' }), lab(X0 + XW, Y0 + 30 - 24, '1.0', '#8FA3C8', { 'text-anchor': 'middle' })].forEach(e => inG.appendChild(e));
const kneeL = lab(X0 + XW * 0.7 + 8, Y0 - 12, 'about 0.7 V', '#5FD0C8'); inG.appendChild(kneeL);
const kneeD = W(inG, `M${X0 + XW * 0.7},${Y0} V${Y0 - 30}`, { stroke: '#5FD0C8', 'stroke-width': 2, 'stroke-dasharray': '4 5' });
[lab(X0 + XW, Y0 + 34, 'VCE (V)', '#5FD0C8', { 'text-anchor': 'end' }), lab(X0 + 10, 34, 'IC (mA)', '#B9A2F2')].forEach(e => outG.appendChild(e));
const actR = mk(outG, 'rect', { x: X0 + 60, y: 50, width: XW - 60, height: Y0 - 50, fill: '#E8A317', opacity: 0.12 }); const actL = lab(X0 + XW - 6, 70, 'ACTIVE REGION', AM, { 'text-anchor': 'end', 'font-weight': 600 }); outG.appendChild(actL);
const Ibv = v => v < 0.55 ? 0 : 40 * Math.pow((v - 0.55) / 0.2, 1.8);
const inCurve = mk(inG, 'path', { d: '', fill: 'none', stroke: '#B9A2F2', 'stroke-width': 4, 'stroke-linecap': 'round' }), inDot = mk(inG, 'circle', { r: 9, fill: TE });
const Icv = (v, ib) => (ib / 10) * (1 - Math.exp(-v / 0.35)) * (1 + 0.012 * v);
const oc = [10, 20, 30].map(ib => ({ ib, p: mk(outG, 'path', { d: '', fill: 'none', stroke: ib === 20 ? VI : '#B9A2F2', 'stroke-width': ib === 20 ? 5 : 4, 'stroke-linecap': 'round' }), l: lab(X0 + XW - 6, 0, `IB = ${ib} μA`, '#B9A2F2', { 'text-anchor': 'end' }) }));
oc.forEach(o => { outG.appendChild(o.l); PUC.attr(o.l, 'y', (Y0 - YH * (o.ib / 10) / 3.6 - 12).toFixed(1)); });
const outDot = mk(outG, 'circle', { r: 9, fill: TE });
const tV0 = wt('G2', 'Raise'), tV1 = T0('G4') - 0.4, tO0 = wt('G4', 'raise'), tO1 = T1('G5'), tMore = wt('G7', 'bigger');
const vbe = t => 0.8 * M.clamp((t - tV0) / (tV1 - tV0));
const vce = t => t < tO0 ? 5 : 10 * M.clamp((t - tO0) / (tO1 - tO0));
const curveIn = vmax => { let d = ''; for (let i = 0; i <= 80; i++) { const v = vmax * i / 80; d += (i ? 'L' : 'M') + (X0 + XW * v).toFixed(1) + ',' + (Y0 - YH * Math.min(60, Ibv(v)) / 60).toFixed(1); } return d; };
const curveOut = (ib, vmax) => { let d = ''; for (let i = 0; i <= 100; i++) { const v = vmax * i / 100; d += (i ? 'L' : 'M') + (X0 + XW * v / 10).toFixed(1) + ',' + (Y0 - YH * Icv(v, ib) / 3.6).toFixed(1); } return d; };

/* ================= W ================= */
const wS = $('#wS');
const wDots = [...Array(100)].map((_, k) => { const x = 80 + (k % 20) * 32, y = 110 + Math.floor(k / 20) * 46; return k >= 98 ? hDot(wS, x, y, 9) : eDot(wS, x, y, 9); });
const wK = [tx(wS, 80, 380, '98 reach the collector', { fill: AM, 'font-size': 24 }), tx(wS, 704, 380, '2 stay in the base', { fill: OR, 'font-size': 24, 'text-anchor': 'end' })];
$('#wRo').innerHTML = `<span class="k" style="color:${GD}">α</span><span class="v" style="color:${GD}">0.98</span><span class="u"></span>
  <span class="k" style="color:${GD}">β</span><span class="v" id="wB" style="color:${GD}">?</span><span class="u"></span>`;
const wRows = rows($('#wSteps'), [
  [K(`${al} = 0.98`), 'given', 92], [K(`${be} = \\dfrac{${al}}{1 - ${al}}`), '', 180], [K(`${be} = \\dfrac{0.98}{0.02}`), '', 292], [K(`${be} = 49`), '', 404], [K(`${Ic} = 49\\,${Ib}`), '', 500]]);
const tWR = [wt('W1', 'alpha'), wt('W3', 'Beta'), wt('W4', 'zero'), wt('W5', 'forty'), wt('W5', 'So')];

/* ================= X ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Alpha can be more than 1', right: 'Alpha is always just below 1', y0: 96, y1: 184 });
const CM = [['GAIN', 'FORMULA', 'SIZE'], ['ALPHA', 'IC / IE', 'just below 1'], ['BETA', 'IC / IB', 'large']];
$('#cmp').innerHTML = CM.map((r, i) => r.map((s, j) => `<div class="${i === 0 ? 'hd' : j === 0 ? 'k3' : ''}"${i > 0 && j > 0 ? ` style="color:${j === 1 ? VI : GD}"` : ''}>${s}</div>`).join('')).join('');
const cmEls = [...$('#cmp').children];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Numericals on alpha and beta · prove the relation · draw the input and output curves' });

/* ================= Q ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A transistor in common emitter mode has β&nbsp;=&nbsp;99. The emitter current is 5&nbsp;mA. What is the base current?', qW: 760,
  opts: ['50.5 μA', '50 μA', '4.95 mA', '0.5 mA'], right: 1, optW: 474, optY: 330, optFs: 28 });
const sol = PUC.solution($('#so'), [[K(`${al} = \\tfrac{99}{100} = 0.99`)], [K(`${Ic} = 0.99 \\times 5 = 4.95\\,\\text{mA}`)], [K(`${Ib} = 5 - 4.95 = 0.05\\,\\text{mA}`)], ['= 50 μA']], { dy: 100, y0: 100 });
const tSol = [wt('A2', 'alpha'), wt('A3', 'equals'), wt('A4', 'equals'), wt('A4', 'fifty')];

/* ================= F ================= */
const fc = PUC.fcard($('#sF'), { x: 400, y: 236, w: 1120, h: 500, y0: 104, dy: 74, title: 'CE configuration, alpha and beta · formula card', txt: [0, 0, 1, 1, 1],
  lines: [K(`${al} = ${Ic}/${Ie} \\qquad ${be} = ${Ic}/${Ib} \\qquad ${Ie} = ${Ib} + ${Ic}`), K(`${be} = ${al}/(1 - ${al}) \\qquad ${al} = ${be}/(1 + ${be})`),
    'Common emitter: input base and emitter, output collector and emitter', 'Alpha just below 1 · beta large · ac beta = change in I<sub>C</sub> / change in I<sub>B</sub>', 'Input curve like a diode (about 0.7 V) · output curves flat in the active region'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 50', topic: 'Transistor as a switch and an amplifier', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tR + 0.2, tD - 0.32], [tG + 0.2, tT - 0.32], [tW + 0.2, tX - 0.32]];
const cfl = (P, t, t0, ib, ic, on) => { P.fB.set(1.2 * ib * (t - t0), on); P.fC.set(40 * ic * (t - t0), on); };

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
    fadeAt(lines, t, tMorph + 0.5, 0.05); M.vis(hL1, t, wt('H1', 'Current'), 1e9, { dy: 10 }); M.vis(hL1v, t, wt('H1', 'hundred') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    fadeAt(hr.slice(0, 2), t, wt('H2', 'small'), 0.1); fadeAt(hr.slice(2), t, wt('H2', 'hundred'), 0.1);
    M.vis(hL2, t, wt('H3', 'alpha'), 1e9, { dy: 10 }); M.vis(hL3, t, wt('H3', 'beta'), 1e9, { dy: 10 });
    M.vis($('#hQ'), t, wt('H3', 'mean') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I */
  const iOn = t >= tI - 0.05 && t < tC + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tC - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, T0('I4') - 0.3, out, { dx: 60, dy: 0, ...o }); lone($('#iL'), t, T0('I4'));
    drawSeq([iT.lead, iT.bar, iT.col, iT.emi], t, tI + 0.4, 0.35, 0.12); M.vis(iT.ah, t, tI + 0.9, 1e9, { dy: 0, fade: 0.2 });
    M.vis(iLb[2], t, wt('I1', 'emitter'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iLb[0], t, wt('I1', 'base'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iLb[1], t, wt('I1', 'collector'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(pIn, t, wt('I2', 'in'), 1e9, { dx: -20, dy: 0 }); M.vis(pOut, t, wt('I2', 'out'), 1e9, { dx: 20, dy: 0 }); M.vis(iCount, t, wt('I2', 'out') + 0.4, 1e9, { dy: 10 });
    M.vis(iRing, t, wt('I3', 'shared'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis($('#iSt1'), t, wt('I3', 'shared'), 1e9, { dy: 24 });
    const ti = [wt('I4', 'base'), wt('I4', 'collector'), wt('I5', 'emitter')];
    itl.forEach((e, i) => M.vis(e, t, ti[i] - 0.1, 1e9, { dy: 20 }));
    const hi = M.io((t - wt('I5', 'most')) / 0.3); itl[2].style.background = M.mix('#EEF0F4', '#FDF0D5', hi); itl[2].style.boxShadow = hi > 0.01 ? `inset 0 0 0 ${(3 * hi).toFixed(1)}px ${AM}` : '';
  }

  /* C */
  const cOn = t >= tC - 0.05 && t < tR + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tR - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(cC.T.g, t, tC + 0.3, 1e9, { dy: 0, fade: 0.2 }); drawSeq([...cC.w, cC.rb, cC.rc], t, tC + 0.5, 0.3, 0.08);
    [...cC.vbb(false), ...cC.vcc(false)].forEach(e => M.vis(e, t, wt('C5', 'small'), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 })); fadeAt(cC.lb, t, tC + 1.2, 0.05);
    cIn.forEach(e => M.vis(e, t, wt('C2', 'input'), 1e9, { dy: 0, fade: 0.2 })); cOut.forEach(e => M.vis(e, t, wt('C3', 'output'), 1e9, { dy: 0, fade: 0.2 }));
    M.draw(cC.gnd, t, wt('C4', 'shared'), 0.6);
    const fo = t >= wt('C6', 'input'); cfl(cC, t, wt('C6', 'input'), 20, 2, fo); M.vis($('#cE'), t, wt('C6', 'input'), 1e9, { dy: 0, fade: 0.2 });
    const ct = cTx.filter(([a]) => t >= a - 0.1).pop(); if (ct) setH($('#cTx'), ct[1]); M.vis($('#cSt'), t, tC + 0.4, 1e9, { dy: 24 });
    runRows(cRows, t, [wt('C2', 'input'), wt('C3', 'output'), wt('C4', 'shared'), wt('C6', 'input')]);
  }

  /* R */
  const rOn = t >= tR - 0.05 && t < tD + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tD - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, T0('R4') - 0.3, out, { dx: 60, dy: 0, ...o }); lone($('#rL'), t, T0('R4'));
    rb3.forEach((b, i) => M.vis(b.r, t, tR + 0.3 + i * 0.1, 1e9, { dy: 16 })); fadeAt(rTop, t, tR + 0.5, 0.1); M.vis(rH, t, tR + 0.6, 1e9, { dy: 0, fade: 0.2 });
    let n1 = 0;
    rD.forEach(d => { M.vis(d.e, t, wt('R1', 'hundred') + d.k * 0.008, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); const u = rp(d, t);
      PUC.attr(d.e, 'cx', M.lerp(d.x0, d.x1, u).toFixed(1)); PUC.attr(d.e, 'cy', M.lerp(d.y0, d.y1, u).toFixed(1)); if (u > 0.98 && d !== stuck) n1++; });
    M.vis(rC1, t, T0('R2'), 1e9, { dy: 0, fade: 0.2 }); M.vis(rC1v, t, T0('R2'), 1e9, { dy: 0, fade: 0.2 }); M.setT(rC1v, String(n1));
    M.vis(rC2, t, T0('R3'), 1e9, { dy: 0, fade: 0.2 }); M.vis(rC2v, t, T0('R3'), 1e9, { dy: 0, fade: 0.2 }); M.setT(rC2v, t >= T0('R3') ? '1' : '0');
    M.vis($('#ra'), t, T0('R4') - 0.1, 1e9, { dy: 20 }); M.vis($('#raF'), t, wt('R5', 'Alpha'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#rb2'), t, T0('R6') - 0.1, 1e9, { dy: 20 }); M.vis($('#rbF'), t, wt('R7', 'Beta'), 1e9, { dy: 0, fade: 0.2 });
    [...$('#rP').children].forEach((e, i) => M.vis(e, t, i ? wt('R8', 'Beta') : wt('R8', 'alpha'), 1e9, { dy: 12 }));
    avR(t, wt('R8', 'big') + 0.2, out);
  }

  /* D */
  const dOn = t >= tD - 0.05 && t < tG + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tG - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, T0('D4') - 0.3, out, { dx: 60, dy: 0, ...o }); lone($('#dL'), t, T0('D4'));
    M.vis($('#da'), t, wt('D1', 'Alpha'), 1e9, { dy: 20 }); M.vis($('#db'), t, wt('D3', 'Beta'), 1e9, { dy: 20 }); M.vis($('#dc'), t, wt('D9', 'beta'), 1e9, { dy: 20 });
    runRows(dRows, t, tDR); M.vis($('#dBox'), t, tDR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* G */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3, outPh = t >= T0('G4') - 0.2;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(gC.T.g, t, tG + 0.2, 1e9, { dy: 0, fade: 0.2 }); [...gC.w, gC.rb, gC.rc, ...gC.vbb(false), ...gC.vcc(false), ...gC.lb].forEach(e => M.vis(e, t, tG + 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#gRo1'), t, tG + 0.5, 1e9, { dy: 12 }); M.vis($('#gRo2'), t, tG + 0.6, 1e9, { dy: 12 });
    M.vis($('#gRL1'), t, tG + 0.3, T0('G4') - 0.2, { dy: 10, outDur: 0.25 }); M.vis($('#gRL2'), t, T0('G4'), 1e9, { dy: 10 });
    M.vis(inG, t, tG + 0.4, T0('G4') - 0.2, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); M.vis(outG, t, T0('G4'), 1e9, { dy: 0, fade: 0.2 });
    let vb, ib, vc, ic;
    if (!outPh) { vb = vbe(t); ib = Ibv(vb); vc = 5; ic = Icv(5, ib); PUC.attr(inCurve, 'd', curveIn(Math.max(0.001, vb))); PUC.attr(inDot, 'cx', (X0 + XW * vb).toFixed(1)); PUC.attr(inDot, 'cy', (Y0 - YH * Math.min(60, ib) / 60).toFixed(1));
      M.vis(kneeL, t, wt('G3', 'seven'), 1e9, { dy: 0, fade: 0.2 }); M.vis(kneeD, t, wt('G3', 'seven'), 1e9, { dy: 0, fade: 0.2 }); }
    else { const big = t >= tMore; ib = 20; vb = 0.72; vc = vce(t); ic = Icv(vc, ib);
      oc.forEach(q => { const on = q.ib === 20 ? true : t >= tMore + (q.ib === 30 ? 0 : 0.6); M.hide(q.p, !on); M.hide(q.l, !(q.ib === 20 ? vc > 9.9 : on));
        if (on) PUC.attr(q.p, 'd', curveOut(q.ib, q.ib === 20 ? Math.max(0.01, vc) : 10 * M.clamp((t - tMore - (q.ib === 30 ? 0 : 0.6)) / 0.6) + 0.01)); });
      PUC.attr(outDot, 'cx', (X0 + XW * vc / 10).toFixed(1)); PUC.attr(outDot, 'cy', (Y0 - YH * ic / 3.6).toFixed(1));
      M.vis(actR, t, wt('G6', 'active'), 1e9, { dy: 0, fade: 0.3 }); M.vis(actL, t, wt('G6', 'active'), 1e9, { dy: 0, fade: 0.3 }); }
    M.setT($('#gVbe'), vb.toFixed(2)); M.setT($('#gIb'), ib.toFixed(0)); M.setT($('#gVce'), vc.toFixed(1)); M.setT($('#gIc'), ic.toFixed(2));
    const t0 = tG + 0.4; gC.fB.set(1.2 * ib * (t - t0), ib > 0.5); gC.fC.set(40 * ic * (t - t0), ic > 0.02); M.vis($('#gE'), t, tV0 + 1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* T */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'And') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    wDots.forEach((e, i) => M.vis(e, t, tW + 0.5 + i * 0.015, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 })); fadeAt(wK, t, tW + 2.2, 0.3);
    M.vis($('#wRo'), t, tW + 0.6, 1e9, { dy: 12 }); M.setT($('#wB'), t >= tWR[3] ? '49' : '?');
    runRows(wRows, t, tWR); M.vis($('#wBox'), t, tWR[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'cannot') - 0.05, tRight: wt('X3', 'below') - 0.6 });
    const tr = [tX + 0.5, wt('X4', 'Alpha'), wt('X4', 'Beta')];
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
