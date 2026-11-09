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

/* ---------------- beats ---------------- */
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const tMorph = wt('H1', 'shouts') - 0.2;
const tI = T0('I1'), tC = T0('C1'), tK = T0('K1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const Vv2 = s => c(TE, s);

/* ================= A: hook - the shouted voice ================= */
const hS = $('#hS'), hG = mk(hS, 'g', { transform: 'translate(32,76)' });
const hsc = scope(hG, 720, 330), hTr = hsc.tr(AM);
const hLim = [W(hG, 'M8,55 H712', { stroke: '#D64545', 'stroke-width': 2.5, 'stroke-dasharray': '8 8' }), W(hG, 'M8,275 H712', { stroke: '#D64545', 'stroke-width': 2.5, 'stroke-dasharray': '8 8' })];
const hLimL = hsc.lab(704, 46, 'CUT FLAT', '#F08A8A', { 'text-anchor': 'end' });
const hq1 = tx(hS, 40, 482, 'QUIET', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), hq1t = tx(hS, 140, 482, 'a smooth wave', { 'font-size': 28 });
const hq2 = tx(hS, 40, 532, 'LOUD', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), hq2t = tx(hS, 140, 532, 'the tops look cut flat', { 'font-size': 28 });
const tLoud = wt('H2', 'tops') - 0.6;
const hAmp = x => M.lerp(60, 200, M.io((x - tLoud) / 1.2));
const hWave = x => Math.max(-110, Math.min(110, hAmp(x) * Math.sin(2 * Math.PI * 0.9 * x)));

/* ================= I: clipper and clamper ideas ================= */
const sinPath = (x0, x1, yc, A, cyc, f = v => v) => { let d = ''; for (let i = 0; i <= 160; i++) { const u = i / 160, y = f(A * Math.sin(2 * Math.PI * cyc * u)); d += (i ? 'L' : 'M') + (x0 + (x1 - x0) * u).toFixed(1) + ',' + (yc - y).toFixed(1); } return d; };
const iS1 = $('#iS1'), iS2 = $('#iS2');
const ceilR = mk(iS1, 'rect', { x: 60, y: 96, width: 664, height: 104, fill: C.soft });
const ceilL = W(iS1, 'M60,200 H724', { 'stroke-width': 5 });
const ceilT = mono(iS1, 80, 132, 'CEILING', { 'font-weight': 600 });
const i1In = W(iS1, sinPath(60, 724, 320, 130, 2), { stroke: CH1, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const i1Out = W(iS1, sinPath(60, 724, 320, 130, 2, y => Math.min(y, 120)), { stroke: AM, 'stroke-width': 5 });
const kid1 = mk(iS1, 'circle', { r: 14, fill: AM, stroke: INK, 'stroke-width': 2 });
const stage = mk(iS2, 'rect', { x: 60, y: 330, width: 664, height: 120, fill: C.soft });
const stageT = mono(iS2, 80, 430, 'STAGE', { 'font-weight': 600 });
const floor0 = W(iS2, 'M60,450 H724', { 'stroke-width': 4 });
const i2In = W(iS2, sinPath(60, 724, 350, 100, 2), { stroke: CH1, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const i2Out = W(iS2, sinPath(60, 724, 230, 100, 2), { stroke: AM, 'stroke-width': 5 });
const lift = arr(iS2, 392, 300, 392, 190, TE, 4, 16);
const kid2 = mk(iS2, 'circle', { r: 14, fill: AM, stroke: INK, 'stroke-width': 2 });
$('#iZ1').innerHTML = M.icon('arrowR', 32, AM, 2.6); $('#iZ2').innerHTML = M.icon('arrowR', 32, AM, 2.6);

/* ================= C: clipper breadboard ================= */
const ck = $('#ckS');
const srcV = (p, x, y, r = 44) => { const g = mk(p, 'g'); mk(g, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: INK, 'stroke-width': 4 });
  W(g, `M${x - 24},${y} C${x - 14},${y - 26} ${x - 6},${y - 26} ${x},${y} S${x + 14},${y + 26} ${x + 24},${y}`, { 'stroke-width': 3.5, stroke: TE }); return g; };
const cSrc = srcV(ck, 150, 280);
const cW = [W(ck, 'M150,236 V120 H300'), W(ck, 'M440,120 H760'), W(ck, 'M150,324 V430 H760'), W(ck, 'M600,120 V200')];
const cR = W(ck, 'M300,120 L312,104 L332,136 L352,104 L372,136 L392,104 L412,136 L428,120 H440');
const cD = diode(ck, 600, 230, 90, 30, '', AM);
const cDn = W(ck, 'M600,260 V430'), cDb = W(ck, 'M600,260 V332 M600,368 V430');
const cBat = cellV(ck, 600, 350);
const cTerm = [mk(ck, 'circle', { cx: 760, cy: 120, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }), mk(ck, 'circle', { cx: 760, cy: 430, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3.5 })];
const cNode = [mk(ck, 'circle', { cx: 600, cy: 120, r: 7, fill: INK }), mk(ck, 'circle', { cx: 600, cy: 430, r: 7, fill: INK })];
const cLb = [tx(ck, 370, 86, 'R', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'middle' }), mono(ck, 520, 236, 'diode', { 'text-anchor': 'end' }),
  tx(ck, 210, 290, 'Vin', { fill: TE, 'font-style': 'italic', 'font-size': 26 }), tx(ck, 790, 290, 'Vout', { fill: TE, 'font-style': 'italic', 'font-size': 26 }),
  tx(ck, 784, 160, '+', { 'font-size': 28 }), tx(ck, 786, 412, '-', { 'font-size': 30 }), mono(ck, 150, 362 + 0, 'AC source', { 'text-anchor': 'middle', 'font-size': 16 })];
PUC.attr(cLb[6], 'y', 470);
const cBatL = tx(ck, 640, 358, 'VB = 3 V', { fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }), cBatP = tx(ck, 548, 344, '+', { 'font-size': 28 });
const eC = flow(ck, [[150, 324], [150, 430], [600, 430], [600, 120], [150, 120], [150, 236]], 22, {
  skip: (x, y) => (Math.abs(x - 600) < 2 && y > 196 && y < 264) || (Math.abs(x - 600) < 2 && y > 326 && y < 374) || (Math.abs(y - 120) < 2 && x > 296 && x < 444) });
const scS = $('#scS'), scG = mk(scS, 'g', { transform: 'translate(32,68)' });
const scp = scope(scG, 576, 208), trIn = scp.tr(CH1), trOut = scp.tr(AM);
scp.lab(12, 22, 'CH1 · VIN', CH1); scp.lab(564, 22, 'CH2 · VOUT', AM, { 'text-anchor': 'end' });
const lvLine = W(scG, '', { stroke: TE, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), lvBg = mk(scG, 'rect', { x: 8, y: 0, width: 82, height: 24, rx: 4, fill: '#16213E', stroke: '#5FD0C8', 'stroke-width': 1.5 }), lvLab = scp.lab(49, 0, '', '#5FD0C8', { 'text-anchor': 'middle' });
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" id="vIn" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="vOut" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k n">DIODE</span><span class="v" id="vD" style="font-size:30px">OFF</span><span class="u"></span>`;
const bRows = rows($('#bSteps'), [[K(`${Vv2('V_{clip}')} = ${Vv2('V_B')} + 0.7\\,\\text{V}`), '', 80], [K(`= 3 + 0.7 = 3.7\\,\\text{V}`), 'example', 164]]);
$('#cZ').innerHTML = M.icon('zap', 30, AM, 2.4);
const tCs = wt('C3', 'scope') - 0.3, tFlip = wt('C10', 'Flip'), tBat = wt('B1', 'battery');
const VM = 5, OM = Math.PI;
const vin = x => x < tCs ? 0 : VM * Math.sin(OM * (x - tCs));
const lev = x => x < tFlip ? 0.7 : x < tBat ? -0.7 : 3.7;
const vout = x => { const v = vin(x), L = lev(x); return L < 0 ? Math.max(v, L) : Math.min(v, L); };
const spd = x => { const v = vin(x), L = lev(x); return L < 0 ? Math.min(0, v - L) : Math.max(0, v - L); };
const offC = t => { let s = 0; const dt = 0.04; for (let x = tCs; x < t; x += dt) s += 30 * spd(x) * Math.min(dt, t - x); return s; };
const cTx = [[T0('C1'), 'Build a <span class="acc">clipper.</span>'], [wt('C2', 'diode'), 'Diode <span class="acc">across the output.</span>'], [T0('C3'), 'Grey in, <span class="acc">amber out.</span>'],
  [T0('C4'), 'Negative half: <span class="acc">diode off.</span>'], [T0('C5'), 'Output <span class="acc">follows the input.</span>'], [T0('C6'), 'Above 0.7 V: <span class="acc">diode on.</span>'],
  [T0('C7'), 'Output <span class="acc">held at 0.7 V.</span>'], [T0('C8'), 'The extra <span class="acc">drops across R.</span>'], [T0('C9'), 'Top cut: <span class="acc">positive clipper.</span>'],
  [T0('C10'), 'Diode flipped: <span class="acc">bottom cut.</span>'], [T0('B1'), 'Add a <span class="acc">battery V<sub>B</sub>.</span>'], [T0('B4'), 'Cut at <span class="acc">3.7 V.</span>'], [T0('B5'), 'Uses: <span class="acc">stop spikes, shape waves.</span>']];
const avC = PUC.avatar($('#sC'), { x: 768, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Like my mic!' });

/* ================= K: clamper breadboard ================= */
const kk = $('#kkS');
const kSrc = srcV(kk, 150, 280);
const kW = [W(kk, 'M150,236 V120 H332'), W(kk, 'M352,120 H760'), W(kk, 'M150,324 V430 H760'), W(kk, 'M560,120 V200'), W(kk, 'M560,260 V430')];
const kCap = [W(kk, 'M332,88 V152', { 'stroke-width': 5 }), W(kk, 'M352,88 V152', { 'stroke-width': 5 })];
const kD = diode(kk, 560, 230, -90, 30, '', AM);
const kRl = [W(kk, 'M680,120 V196'), W(kk, 'M680,196 L664,208 L696,224 L664,240 L696,256 L664,272 L696,288 L680,300'), W(kk, 'M680,300 V430')];
const kTerm = [mk(kk, 'circle', { cx: 760, cy: 120, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }), mk(kk, 'circle', { cx: 760, cy: 430, r: 9, fill: '#fff', stroke: INK, 'stroke-width': 3.5 })];
const kNode = [[560, 120], [680, 120], [560, 430], [680, 430]].map(([x, y]) => mk(kk, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const kLb = [tx(kk, 342, 72, 'C', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'middle' }), mono(kk, 540, 312, 'diode', { 'text-anchor': 'end' }), tx(kk, 712, 256, 'R', { 'font-style': 'italic', 'font-size': 28 }),
  tx(kk, 210, 290, 'Vin', { fill: TE, 'font-style': 'italic', 'font-size': 26 }), tx(kk, 790, 290, 'Vout', { fill: TE, 'font-style': 'italic', 'font-size': 26 }),
  tx(kk, 784, 160, '+', { 'font-size': 28 }), tx(kk, 786, 412, '-', { 'font-size': 30 }), mono(kk, 150, 470, 'AC source', { 'text-anchor': 'middle', 'font-size': 16 })];
const kQ = [tx(kk, 312, 186, '-', { fill: OR, 'font-size': 34, 'text-anchor': 'middle' }), tx(kk, 372, 188, '+', { fill: OR, 'font-size': 30, 'text-anchor': 'middle' })];
const kVc = tx(kk, 342, 230, 'VC = 0.0 V', { fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22, 'text-anchor': 'middle' });
const eK = flow(kk, [[150, 236], [150, 120], [332, 120], [352, 120], [560, 120], [560, 430], [150, 430], [150, 324]], 22, {
  skip: (x, y) => (Math.abs(y - 120) < 2 && x > 326 && x < 358) || (Math.abs(x - 560) < 2 && y > 196 && y < 264) });
const ksS = $('#ksS'), ksG = mk(ksS, 'g', { transform: 'translate(32,68)' });
const ksp = scope(ksG, 576, 208), kIn = ksp.tr(CH1), kOut = ksp.tr(AM);
ksp.lab(12, 22, 'CH1 · VIN', CH1); ksp.lab(564, 22, 'CH2 · VOUT', AM, { 'text-anchor': 'end' });
W(ksG, 'M6,130 H570', { stroke: '#8FA3C8', 'stroke-width': 1.5, 'stroke-dasharray': '4 6' }); ksp.lab(12, 124, '0 V', '#8FA3C8');
$('#ro2').innerHTML = `<span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" id="kvIn" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>C</sub></span><span class="v" id="kvC" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="kvOut" style="color:${TE}">0.0</span><span class="u">V</span>`;
const kRows = rows($('#kSteps'), [[K(`R\\,C \\gg T`), 'C stays charged', 80], ['<span class="tt">Also called a DC restorer</span>', '', 164]]);
$('#kZ').innerHTML = M.icon('zap', 30, AM, 2.4);
const tKs = wt('K3', 'negative') - 0.2;
const kin = x => x < tKs ? 0 : -VM * Math.sin(OM * (x - tKs));
const kvc = x => x < tKs ? 0 : x - tKs < 0.5 ? VM * Math.sin(OM * (x - tKs)) : VM;
const kout = x => kin(x) + kvc(x);
const kTx = [[T0('K1'), 'Parts: <span class="acc">a capacitor, a diode and a resistor.</span>'], [T0('K2'), 'C in series, <span class="acc">diode across the output.</span>'],
  [wt('K3', 'conducts'), 'First negative half: <span class="acc">C charges to V<sub>m</sub>.</span>'], [T0('K4'), 'C now acts like <span class="acc">a battery of V<sub>m</sub>.</span>'],
  [T0('K5'), 'Output = <span class="acc">input + V<sub>m</sub>.</span>'], [wt('K6', 'lowest'), 'Lowest point <span class="acc">now sits at 0 V.</span>'],
  [T0('K7'), 'Peak to peak <span class="acc">stays 10 V.</span> Only the level moves.'], [wt('K8', 'Flip'), 'Flip the diode: <span class="acc">a negative clamper.</span>'],
  [T0('K9'), '<span class="acc">R C much bigger than T</span> keeps C charged.'], [T0('K10'), 'Also called a <span class="acc">DC restorer.</span>']];

/* ================= W: worked example ================= */
const wS = $('#wS');
const wy = v => 340 - 26 * v;
const wAx = [W(wS, 'M100,80 V500', { 'stroke-width': 2.5 }), W(wS, `M100,${wy(0)} H670`, { 'stroke-width': 2.5 })];
const wTk = [10, 5, 0, -5].map(v => [W(wS, `M92,${wy(v)} H108`, { 'stroke-width': 2.5 }), mono(wS, 82, wy(v) + 7, String(v), { 'text-anchor': 'end' })]).flat();
const wUnit = mono(wS, 100, 66, 'volts', { 'text-anchor': 'middle', 'font-size': 16 });
const wIn = W(wS, sinPath(110, 660, wy(0), 26 * 5, 2), { stroke: CH1, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
const wOut = W(wS, sinPath(110, 660, wy(5), 26 * 5, 2), { stroke: AM, 'stroke-width': 5 });
const wLin = mono(wS, 660, wy(0) + 40, 'IN', { 'text-anchor': 'end', fill: '#6F82A8', 'font-weight': 600 }), wLout = mono(wS, 660, wy(10) - 14, 'OUT', { 'text-anchor': 'end', fill: AM, 'font-weight': 600 });
const wLo = mk(wS, 'circle', { cx: 110 + 550 * 0.375, cy: wy(0), r: 9, fill: TE }), wHi = mk(wS, 'circle', { cx: 110 + 550 * 0.125, cy: wy(10), r: 9, fill: TE });
const wLoL = mono(wS, 704, wy(0) + 7, '0 V', { fill: TE, 'font-weight': 600 }), wHiL = mono(wS, 704, wy(10) + 7, '10 V', { fill: TE, 'font-weight': 600 });
const wSw = [W(wS, `M690,${wy(10)} V${wy(0)}`, { stroke: TE, 'stroke-width': 3 }), W(wS, `M682,${wy(10)} H698 M682,${wy(0)} H698`, { stroke: TE, 'stroke-width': 3 })];
const wRows = rows($('#wSteps'), [
  [K(`${Vv2('V_m')} = 5\\,\\text{V}`), 'given', 84], [K(`${Vv2('V_C')} = ${Vv2('V_m')} = 5\\,\\text{V}`), 'C charges to the peak', 168],
  [K(`${Vv2('V_{out}')} = ${Vv2('V_{in}')} + 5`), '', 252], [K(`-5 + 5 = 0\\,\\text{V}`), 'lowest point', 336], [K(`5 + 5 = 10\\,\\text{V}`), 'highest point', 420],
  [K(`${Vv2('V_{out}')}:\\ 0 \\text{ to } 10\\,\\text{V}`), 'the swing', 504]]);
const tWR = [wt('W1', 'five'), wt('W2', 'charges'), wt('W3', 'Output'), wt('W3', 'lowest'), wt('W4', 'highest'), wt('W4', 'swings')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A clamper changes the shape of the wave', right: 'Clamper shifts. Clipper changes shape.', y0: 96, y1: 184 });
const CM = [['', 'CLIPPER', 'CLAMPER'], ['PARTS', 'R + diode', 'C + diode + R'], ['SHAPE', 'changes', 'same'], ['LEVEL', 'same', 'shifts']];
$('#cmp').innerHTML = CM.map((r, i) => r.map((s, j) => `<div class="${i === 0 ? 'hd' : j === 0 ? 'k3' : ''}"${i > 1 && j > 0 && ((i === 2 && j === 1) || (i === 3 && j === 2)) ? ` style="color:${AM}"` : ''}>${s}</div>`).join('')).join('');
const cmEls = [...$('#cmp').children];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'JEE MAIN'], type: 'Boards: draw the circuit and waveforms · JEE Main: pick the clipped output (28 Jun 2022, Shift 2)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 10&nbsp;V peak sine wave feeds a shunt clipper: a silicon diode in series with a 3&nbsp;V battery, across the output. What are the output limits?', qW: 760,
  opts: ['+0.7 V and -10 V', '+3.7 V and -10 V', '+3 V and -10 V', '+3.7 V and -3.7 V'], right: 1, optW: 474, optY: 330, optFs: 28 });
const sol = PUC.solution($('#so'), [[K('V_{on} = 3 + 0.7 = 3.7\\,\\text{V}')], [`top held at ${K('+3.7\\,\\text{V}')}`], ['negative half: diode off'], [K('-10\\,\\text{V} \\le V_{out} \\le 3.7\\,\\text{V}')]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'turns'), wt('A3', 'held'), wt('A4', 'negative'), wt('A4', 'minus')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 400, y: 236, w: 1120, h: 500, y0: 104, dy: 74, title: 'Clippers and clampers · formula card', txt: [0, 1, 1, 1, 1],
  lines: [K(`${Vv2('V_{clip}')} = ${Vv2('V_B')} + 0.7\\,\\text{V} \\quad (\\text{silicon diode})`),
    'Clipper: R in series, diode across the output · cuts the wave', 'Clamper: C in series, diode across the output · shifts the wave',
    `Positive clamper (ideal): output 0 to 2V<sub>m</sub> · peak to peak unchanged`, `Clamper needs ${K('R\\,C \\gg T')} · also called a DC restorer`] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 48', topic: 'BJT construction and working', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[T0('C2'), tT - 0.32], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o }); M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#lmC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    hTr(x => hWave(x), t, tMorph + 0.5, 3, 165, t >= tMorph + 0.5, 220);
    hLim.forEach(e => M.vis(e, t, wt('H2', 'cut'), 1e9, { dy: 0, fade: 0.2 })); M.vis(hLimL, t, wt('H2', 'flat'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(hq1, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(hq1t, t, tMorph + 0.9, 1e9, { dy: 10 }); M.vis(hq2, t, tLoud + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(hq2t, t, tLoud + 0.5, 1e9, { dy: 10 });
    M.vis($('#hQ'), t, wt('H3', 'Who') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I: two ideas */
  const iOn = t >= tI - 0.05 && t < tC + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tC - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, T0('I4') - 0.3, out, { dx: 60, dy: 0, ...o });
    $('#iL').style.left = (160 + 408 * (1 - M.io((t - T0('I4') + 0.6) / 0.5))).toFixed(1) + 'px';
    M.draw(i1In, t, wt('I2', 'clipper'), 0.9); [ceilR, ceilL, ceilT].forEach(e => M.vis(e, t, wt('I3', 'ceiling') - 0.2, 1e9, { dy: -16 })); M.vis($('#iT1'), t, wt('I3', 'ceiling'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(i1Out, t, wt('I3', 'high') - 0.2, 1.0); M.vis($('#iSt1'), t, wt('I2', 'level'), 1e9, { dy: 24 });
    const k1 = t >= wt('I3', 'jumping'); M.hide(kid1, !k1); if (k1) { const u = ((t - wt('I3', 'jumping')) / 4) % 1, y = Math.min(130 * Math.sin(4 * Math.PI * u), 120); PUC.attr(kid1, 'cx', (60 + 664 * u).toFixed(1)); PUC.attr(kid1, 'cy', (320 - y - 16).toFixed(1)); }
    M.draw(i2In, t, wt('I4', 'clamper'), 0.9); M.draw(i2Out, t, wt('I4', 'lifts'), 1.0); M.vis(lift, t, wt('I4', 'lifts') + 0.3, 1e9, { dy: 20 });
    [stage, stageT].forEach(e => M.vis(e, t, wt('I5', 'stage') - 0.2, 1e9, { dy: 30 })); M.vis(floor0, t, wt('I4', 'clamper'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#iT2'), t, wt('I5', 'stage'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#iSt2'), t, wt('I4', 'shape'), 1e9, { dy: 24 });
    const k2 = t >= wt('I5', 'Same'); M.hide(kid2, !k2); if (k2) { const u = ((t - wt('I5', 'Same')) / 4) % 1; PUC.attr(kid2, 'cx', (60 + 664 * u).toFixed(1)); PUC.attr(kid2, 'cy', (230 - 100 * Math.sin(4 * Math.PI * u) - 16).toFixed(1)); }
  }

  /* C: clipper (C1 - B5) */
  const cOn = t >= tC - 0.05 && t < tK + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tK - 0.32, bat = t >= tBat, flip = t >= tFlip && !bat;
    M.vis($('#ck'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc2'), t, wt('C3', 'scope') - 0.4, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, wt('C3', 'scope') - 0.2, out, { dy: 36, ...o });
    const tb = wt('C1', 'breadboard') - 0.2;
    M.vis(cSrc, t, wt('C2', 'source') - 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); drawSeq(cW.slice(0, 3), t, tb, 0.4, 0.15);
    M.draw(cR, t, wt('C2', 'resistor') - 0.2, 0.4); M.draw(cW[3], t, wt('C2', 'diode') - 0.3, 0.2);
    M.vis(cD.g, t, wt('C2', 'diode') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.hide(cDn, bat); M.hide(cDb, !bat); if (!bat) M.draw(cDn, t, wt('C2', 'diode'), 0.3);
    cD.o.setAttribute('transform', `translate(600,230) rotate(${flip ? -90 : 90})`);
    const cb = cBat(false); cb.forEach(e => M.vis(e, t, tBat - 0.1, 1e9, { dy: 0, fade: 0.2 })); [cBatL, cBatP].forEach(e => M.vis(e, t, tBat + 0.1, 1e9, { dy: 0, fade: 0.2 }));
    [...cTerm, ...cNode].forEach(e => M.vis(e, t, wt('C2', 'output'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 })); fadeAt(cLb, t, wt('C2', 'output') + 0.1, 0.08);
    const sp = spd(t), on = Math.abs(sp) > 0.001 && t >= tCs;
    PUC.attr(cD.tri, 'fill', on ? AM : '#fff');
    eC.set(offC(t), on); M.vis($('#ckE'), t, tCs, 1e9, { dy: 0, fade: 0.2 });
    const ct = cTx.filter(([a]) => t >= a - 0.1).pop(); if (ct) setH($('#cTx'), ct[1]); M.vis($('#cStrip'), t, tC + 0.4, 1e9, { dy: 24 });
    trIn(x => 16 * vin(x), t, tCs, 6, 104, t >= tCs); trOut(x => 16 * vout(x), t, tCs, 6, 104, t >= tCs);
    const L = lev(t), ly = (104 - 16 * L).toFixed(1); PUC.attr(lvLine, 'd', `M6,${ly} H570`); PUC.attr(lvBg, 'y', (+ly - 12).toFixed(1)); PUC.attr(lvLab, 'y', (+ly + 6).toFixed(1)); M.setT(lvLab, (L > 0 ? '+' : '') + L.toFixed(1) + ' V');
    M.hide(lvLine, t < T0('C6')); M.hide(lvLab, t < T0('C6')); M.hide(lvBg, t < T0('C6'));
    const roOn = t < T0('B2'); M.vis($('#ro1'), t, wt('C3', 'scope'), roOn ? 1e9 : T0('B2'), { dy: 12, outDur: 0.25, ody: -10 }); M.vis($('#rbL1'), t, wt('C3', 'scope') - 0.1, T0('B2'), { dy: 10, outDur: 0.25 });
    M.vis($('#rbL2'), t, T0('B2') + 0.2, 1e9, { dy: 10 });
    M.setT($('#vIn'), vin(t).toFixed(1)); M.setT($('#vOut'), vout(t).toFixed(1)); M.setT($('#vD'), on ? 'ON' : 'OFF'); $('#vD').style.color = on ? AM : INK;
    runRows(bRows, t, [wt('B3', 'clip'), wt('B4', 'three')]);
    avC(t, wt('C9', 'top'), T0('B1') - 0.2);
  }

  /* K: clamper */
  const kOn = t >= tK - 0.05 && t < tT + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tT - 0.3;
    M.vis($('#kk'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#ks'), t, tK + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#kb'), t, tK + 0.45, out, { dy: 36, ...o });
    M.vis(kSrc, t, tK + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); drawSeq(kW.slice(0, 3), t, tK + 0.4, 0.4, 0.15);
    kCap.forEach(e => M.vis(e, t, wt('K1', 'capacitor') - 0.1, 1e9, { dy: 0, fade: 0.2 })); M.vis(kD.g, t, wt('K1', 'diode') - 0.1, 1e9, { dy: 0, fade: 0.2 }); drawSeq(kW.slice(3), t, wt('K1', 'diode') - 0.2, 0.25, 0.1);
    drawSeq(kRl, t, wt('K1', 'resistor') - 0.1, 0.3, 0.15); [...kTerm, ...kNode].forEach(e => M.vis(e, t, wt('K1', 'resistor') + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    fadeAt(kLb, t, wt('K1', 'resistor') + 0.4, 0.08);
    const vc = kvc(t), chg = t >= tKs && t < tKs + 0.5;
    PUC.attr(kD.tri, 'fill', chg ? AM : '#fff'); eK.set(80 * (t - tKs), chg); M.vis($('#kkE'), t, tKs, 1e9, { dy: 0, fade: 0.2 });
    kQ.forEach(e => { M.hide(e, vc < 0.3); e.style.opacity = M.clamp(vc / VM).toFixed(2); }); M.vis(kVc, t, tKs, 1e9, { dy: 0, fade: 0.2 }); M.setT(kVc, 'VC = ' + vc.toFixed(1) + ' V');
    const kt = kTx.filter(([a]) => t >= a - 0.1).pop(); if (kt) setH($('#kTx'), kt[1]); M.vis($('#kStrip'), t, tK + 0.4, 1e9, { dy: 24 });
    M.vis(ksS, t, tK + 0.4, 1e9, { dy: 0, fade: 0.2 });
    kIn(x => 11 * kin(x), t, tKs, 6, 130, t >= tKs); kOut(x => 11 * kout(x), t, tKs, 6, 130, t >= tKs);
    const roOn = t < T0('K9'); M.vis($('#ro2'), t, tK + 0.7, roOn ? 1e9 : T0('K9'), { dy: 12, outDur: 0.25, ody: -10 }); M.vis($('#kbL1'), t, tK + 0.6, T0('K9'), { dy: 10, outDur: 0.25 });
    M.vis($('#kbL2'), t, T0('K9') + 0.2, 1e9, { dy: 10 });
    M.setT($('#kvIn'), kin(t).toFixed(1)); M.setT($('#kvC'), vc.toFixed(1)); M.setT($('#kvOut'), kout(t).toFixed(1));
    runRows(kRows, t, [wt('K9', 'much'), wt('K10', 'restorers') - 0.3]);
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'clamper') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    wAx.forEach(e => M.draw(e, t, tW + 0.4, 0.4)); fadeAt([...wTk, wUnit], t, tW + 0.6, 0.04);
    M.draw(wIn, t, tWR[0], 1.0); M.vis(wLin, t, tWR[0] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.draw(wOut, t, tWR[2], 1.2); M.vis(wLout, t, tWR[2] + 1.0, 1e9, { dy: 0, fade: 0.2 });
    [wLo, wLoL].forEach(e => M.vis(e, t, wt('W3', 'zero'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 })); [wHi, wHiL].forEach(e => M.vis(e, t, wt('W4', 'ten'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    drawSeq(wSw, t, tWR[5], 0.4, 0.2);
    runRows(wRows, t, tWR); M.vis($('#wBox'), t, tWR[5] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not') - 0.05, tRight: wt('X3', 'shifts') - 0.2 });
    const tr = [tX + 0.5, wt('X3', 'not'), wt('X3', 'shifts'), wt('X3', 'clipper')];
    cmEls.forEach((e, i) => M.vis(e, t, tr[Math.floor(i / 3)] + (i % 3) * 0.1, 1e9, { dy: 0, dx: -12, fade: 0.12 }));
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC'), wt('X5', 'JEE')], tType: wt('X4', 'draw') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
