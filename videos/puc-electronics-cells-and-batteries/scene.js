// PUC Electronics Ep 59 - Cells and batteries ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, R ink, power gold; scope CH1 #8FA3C8, CH2 amber
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', GD = '#B7791F', SOFT = C.soft;
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const Iv = c(VI, 'I'), Vv = c(TE, 'V'), Rv = c(INK, 'R'), Pv = c(GD, 'P'), OM = '\\,\\Omega';
Object.assign(M.IC, {
  bell: ['M10.268 21a2 2 0 0 0 3.464 0', 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  door: ['M13 4h3a2 2 0 0 1 2 2v14', 'M2 20h3', 'M13 20h9', 'M10 12v.01', 'M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z'] });

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
/* battery symbol (vertical): long plate (+) at y, short plate (-) at y + 16 */
const cell = (p, x, y, w = 40) => [W(p, `M${x - w / 2},${y} H${x + w / 2}`, { 'stroke-width': 5 }), W(p, `M${x - w / 4},${y + 16} H${x + w / 4}`, { 'stroke-width': 9 })];
/* lamp symbol: circle with a cross; returns the circle */
const lamp = (p, x, y, r = 30) => { const cc = mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const k = r * 0.68; W(p, `M${x - k},${y - k} L${x + k},${y + k} M${x + k},${y - k} L${x - k},${y + k}`, { 'stroke-width': 3 }); return cc; };
const term = (p, x, y, r = 7) => mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: INK, 'stroke-width': 3.5 });
/* switch-symbol lever from (x1,y1) to a point near (x2,y2) */
const lev = (p, sw = 5) => W(p, '', { 'stroke-width': sw });
const setLev = (L, x1, y1, x2, y2) => PUC.attr(L, 'd', `M${x1},${y1} L${x2},${y2}`);

/* ---------------- beats ---------------- */
const OR = C.orange, RED = C.red, Qv = c(OR, 'Q'), Ev = c(TE, 'E'), rv = c(INK, 'r'), Uv = c(GD, 'U'), tv = c(INK, 't');
const tMorph = wt('H1', 'reads') - 0.2;
const tC = T0('C1'), tP = T0('P1'), tB = T0('B1'), tD = T0('D1'), tS = T0('S1'), tS5 = T0('S5'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1 = $('#h1S');
const hb = mk(h1, 'rect', { x: 36, y: 70, width: 660, height: 236, rx: 22, fill: '#2A3758' });
const hTerm = [mk(h1, 'rect', { x: 696, y: 128, width: 24, height: 40, rx: 4, fill: GD }), mk(h1, 'rect', { x: 696, y: 208, width: 24, height: 40, rx: 4, fill: GD })];
const hT1 = mono(h1, 68, 114, 'LITHIUM ION BATTERY · RECHARGEABLE', { fill: '#8FA3C8', 'font-weight': 600, 'font-size': 18 });
const hV = tx(h1, 68, 218, '3.7 V', { 'font-family': 'IBM Plex Mono', 'font-size': 72, fill: '#3FC1C1' });
const hC = tx(h1, 330, 218, '5000 mAh', { 'font-family': 'IBM Plex Mono', 'font-size': 72, fill: AM });
const hVl = mono(h1, 68, 272, 'volts', { fill: '#8FA3C8' }), hCl = mono(h1, 330, 272, 'milliampere hours', { fill: '#8FA3C8' });
const h2 = $('#h2S');
const barO = mk(h2, 'rect', { x: 36, y: 84, width: 480, height: 90, rx: 14, fill: '#fff', stroke: INK, 'stroke-width': 4 }), barN = mk(h2, 'rect', { x: 516, y: 110, width: 16, height: 38, rx: 4, fill: INK });
const barF = mk(h2, 'rect', { x: 46, y: 94, width: 0, height: 70, rx: 8, fill: C.ok });
const barP = tx(h2, 276, 144, '80%', { 'font-family': 'IBM Plex Mono', 'font-size': 34, 'text-anchor': 'middle' });
const hGame = mono(h2, 556, 124, 'heavy game', { fill: INK, 'font-weight': 600, 'font-size': 22 }), hGame2 = mono(h2, 556, 156, 'big current', { fill: VI, 'font-weight': 600, 'font-size': 22 });
const hQ = tx(h2, 734, 150, '?', { 'font-size': 80, 'font-weight': 700, fill: AM, 'text-anchor': 'middle' });

/* ================= C: inside a cell ================= */
const cS = $('#cS');
const jar = mk(cS, 'rect', { x: 170, y: 240, width: 440, height: 300, rx: 18, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const lyte = mk(cS, 'rect', { x: 174, y: 300, width: 432, height: 236, rx: 14, fill: '#DCE7F0' });
const rodN = mk(cS, 'rect', { x: 260, y: 200, width: 40, height: 300, rx: 6, fill: '#9AA0AC', stroke: INK, 'stroke-width': 3 }), rodP = mk(cS, 'rect', { x: 480, y: 200, width: 40, height: 300, rx: 6, fill: '#3A4560', stroke: INK, 'stroke-width': 3 });
const cWire = [W(cS, 'M280,200 V110 H364'), W(cS, 'M420,110 H500 V200')];
const cLamp = lamp(cS, 392, 110, 28);
const cSign = [tx(cS, 240, 236, '−', { 'font-size': 40, 'text-anchor': 'middle' }), tx(cS, 548, 236, '+', { 'font-size': 40, 'text-anchor': 'middle' })];
const cLab = [mono(cS, 280, 576, 'electrode (−)', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(cS, 500, 576, 'electrode (+)', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(cS, 390, 430, 'electrolyte', { 'text-anchor': 'middle', fill: '#3A4560', 'font-weight': 600 })];
const eC = flow(cS, [[280, 200], [280, 110], [500, 110], [500, 200]], 10, { skip: (x, y) => Math.hypot(x - 392, y - 110) < 32 });
const ions = [...Array(6)].map((_, i) => mk(cS, 'circle', { cx: 0, cy: 0, r: 6, fill: '#fff', stroke: OR, 'stroke-width': 2.5 }));
const cR = $('#cRS');
const cSym1 = [...cell(cR, 150, 404, 44), W(cR, 'M70,412 H128 M172,412 H230', { 'stroke-width': 3.5 })], cSymL1 = mono(cR, 150, 470, 'CELL', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const cSym2 = []; [400, 480, 560].forEach(x => cSym2.push(...cell(cR, x, 404, 44).map(e => { e.setAttribute('transform', `rotate(-90 ${x} 412)`); return e; })));
cSym2.push(W(cR, 'M330,412 H384 M424,412 H464 M504,412 H544 M584,412 H650', { 'stroke-width': 3.5 }));
const cSymL2 = mono(cR, 490, 470, 'BATTERY = CELLS JOINED', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
cSym1.slice(0, 2).forEach(e => e.setAttribute('transform', 'rotate(-90 150 412)'));

/* ================= P: families ================= */
const pL = $('#pLS');
const dry = [mk(pL, 'rect', { x: 292, y: 110, width: 200, height: 300, rx: 20, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(pL, 'rect', { x: 362, y: 88, width: 60, height: 22, rx: 5, fill: INK }), mk(pL, 'rect', { x: 296, y: 220, width: 192, height: 90, fill: C.ac2 })];
const dryV = tx(pL, 392, 280, '1.5 V', { 'font-family': 'IBM Plex Mono', 'font-size': 48, fill: TE, 'text-anchor': 'middle' });
const dryS = [tx(pL, 392, 160, '+', { 'font-size': 36, 'text-anchor': 'middle' }), tx(pL, 392, 392, '−', { 'font-size': 36, 'text-anchor': 'middle' })];
const dryL = mono(pL, 392, 452, 'TORCH DRY CELL', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const pF = ['#f0', '#f1'].map(s => $(s)), pFs = pF.map(e => e.querySelector('svg'));
mk(pFs[0], 'rect', { x: 28, y: 32, width: 92, height: 62, rx: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }); [48, 86].forEach(x => mk(pFs[0], 'rect', { x, y: 22, width: 16, height: 12, rx: 2, fill: INK }));
mk(pFs[1], 'rect', { x: 50, y: 18, width: 48, height: 86, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 }); W(pFs[1], 'M66,28 H82', { 'stroke-width': 3 });
const pR = $('#pRS');
const six = [...Array(6)].map((_, i) => { const g = mk(pR, 'g'); const r = mk(g, 'rect', { x: 36 + i * 76, y: 232, width: 64, height: 60, rx: 8, fill: SOFT, stroke: INK, 'stroke-width': 3 }); tx(g, 68 + i * 76, 270, '2 V', { 'font-family': 'IBM Plex Mono', 'font-size': 20, 'text-anchor': 'middle' }); return { g, r }; });
const sixT = tx(pR, 504, 274, '= 12 V', { 'font-family': 'IBM Plex Mono', 'font-size': 34, fill: TE });
const pLoop = mono(pR, 392, 520, 'charge, use, charge again', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 22 });
const pArr = PUC.arrow(pR, AM, 4, 14), pArr2 = PUC.arrow(pR, AM, 4, 14);

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const box = mk(ck, 'rect', { x: 60, y: 84, width: 244, height: 196, rx: 14, fill: 'none', stroke: '#9AA0AC', 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const boxL = mono(ck, 72, 76, 'REAL CELL', { 'font-size': 16, 'font-weight': 600 });
const bW = [W(ck, 'M120,160 V112 H180'), W(ck, 'M276,112 H382'), W(ck, 'M458,112 H600'), W(ck, 'M664,112 H760 V130'), W(ck, 'M760,232 V250 H120 V176')];
const bCell = cell(ck, 120, 160);
const rZ = W(ck, 'M180,112 L188,98 L204,126 L220,98 L236,126 L252,98 L268,126 L276,112');
const bR = W(ck, 'M760,130 L744,140 L776,154 L744,168 L776,182 L744,196 L776,210 L744,222 L760,232');
const amC = mk(ck, 'circle', { cx: 420, cy: 112, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), amT = tx(ck, 420, 122, 'A', { 'text-anchor': 'middle', fill: VI, 'font-size': 30, 'font-weight': 700 });
const vmW = [W(ck, 'M330,112 V146'), W(ck, 'M330,214 V250')], vmC = mk(ck, 'circle', { cx: 330, cy: 180, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), vmT = tx(ck, 330, 190, 'V', { 'text-anchor': 'middle', fill: TE, 'font-size': 30, 'font-weight': 700 });
const jn = [mk(ck, 'circle', { cx: 330, cy: 112, r: 7, fill: INK }), mk(ck, 'circle', { cx: 330, cy: 250, r: 7, fill: INK })];
const swT = [term(ck, 600, 112, 6), term(ck, 664, 112, 6)], swL = lev(ck);
const bLb = [mono(ck, 150, 186, 'E', { fill: TE, 'font-weight': 600, 'font-size': 24, 'font-style': 'italic' }), mono(ck, 228, 152, 'r', { fill: INK, 'font-weight': 600, 'font-size': 24, 'text-anchor': 'middle', 'font-style': 'italic' }),
  mono(ck, 794, 176, 'R', { fill: INK, 'font-weight': 600, 'font-size': 24, 'font-style': 'italic' }), mono(ck, 632, 84, 'switch', { 'text-anchor': 'middle', 'font-size': 16 }), mono(ck, 420, 64, 'ammeter', { 'text-anchor': 'middle', 'font-size': 16 }), mono(ck, 378, 186, 'voltmeter', { 'font-size': 16 })];
const bRv = mono(ck, 794, 206, 'open', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const scR = mk(ck, 'rect', { x: 32, y: 312, width: 864, height: 256, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 312, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const scT = [mk(ck, 'path', { fill: 'none', stroke: '#3FC1C1', 'stroke-width': 5, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: '#A98BF0', 'stroke-width': 4, 'stroke-linejoin': 'round' })];
const scL = [mono(ck, 44, 340, 'V TERMINAL', { fill: '#3FC1C1', 'font-weight': 600, 'font-size': 16 }), mono(ck, 44, 470, 'I', { fill: '#A98BF0', 'font-weight': 600, 'font-size': 16 }), mono(ck, 884, 340, 'SCOPE', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const E0 = 1.5, r0 = 0.5;
const evR = [[wt('B7', 'connect'), 2.5], [wt('B9', 'one'), 1], [wt('B10', 'half'), 0.5]];
const Rnow = t => { let R = Infinity; evR.forEach(([a, v]) => { if (t >= a) R = v; }); return R; };
const Inow = t => { const R = Rnow(t); return R === Infinity ? 0 : E0 / (R + r0); };
const tLive = wt('B5', 'With');
const laneB = (p, f, t, base, amp) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200; if (tau < tLive) { first = true; continue; } const x = 110 + 776 * i / 200, y = base - amp * f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; } PUC.attr(p, 'd', d); };
const eB = flow(ck, [[120, 176], [120, 250], [760, 250], [760, 112], [120, 112], [120, 160]], 26, { skip: (x, y) => Math.hypot(x - 420, y - 112) < 38 });
const offB = t => { let s = 0; const dt = 0.05; for (let x = tLive; x < t; x += dt) s += 90 * Inow(x) * Math.min(dt, t - x); return s; };
$('#ro').innerHTML = [['E', TE, 'V', 'E M F'], ['R', INK, 'Ω', 'load'], ['I', VI, 'A', 'current'], ['V', TE, 'V', 'terminal voltage'], ['Ir', RED, 'V', 'lost inside']].map(([k, col, u]) =>
  `<span class="k" style="color:${col}">${k === 'Ir' ? 'I r' : k}</span><span class="v" style="color:${col}">-</span><span class="u">${u}</span>`).join('');
const roV = [...$('#ro').querySelectorAll('.v')], roK = [...$('#ro').children];

/* ================= D: derivation + V-I line ================= */
const dRows = rows($('#dSteps'), [
  [K(`${Ev} = ${Iv}(${Rv} + ${rv})`), 'both resistances', 84],
  [K(`${Iv} = \\dfrac{${Ev}}{${Rv} + ${rv}}`), '', 166],
  [K(`${Vv} = ${Iv}${Rv}`), 'across the load', 278],
  [K(`${Vv} = ${Ev} - ${Iv}${rv}`), 'terminal voltage', 386],
  [K(`${Iv}${rv}`), 'volts lost inside the cell', 488]]);
const tDR = [wt('D2', 'equals'), T0('D3'), T0('D4'), wt('D5', 'Put'), T0('D6')];
const dS = $('#dS');
const gp = PUC.graph(dS, { x: 120, y: 90, w: 560, h: 380, xmax: 1.8, ymax: 1.8, xt: [0.5, 1, 1.5], yt: [0.5, 1, 1.5], xl: 'I (A)', yl: 'V (V)' });
const dLine = gp.curve(TE, 5), dPts = [[0, 1.5], [0.5, 1.25], [1, 1], [1.5, 0.75]].map(([a, b]) => { const p = mk(dS, 'circle', { cx: gp.X(a), cy: gp.Y(b), r: 10, fill: '#fff', stroke: TE, 'stroke-width': 4 }); return p; });
const dE = W(dS, `M${gp.X(0)},${gp.Y(1.5)} H${gp.X(1.8)}`, { 'stroke-width': 2.5, stroke: '#9AA0AC', 'stroke-dasharray': '8 6' }), dEL = mono(dS, gp.X(1.8), gp.Y(1.5) - 12, 'E = 1.5 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 });
const dBr = W(dS, `M${gp.X(1) + 14},${gp.Y(1.5)} H${gp.X(1) + 24} V${gp.Y(1)} H${gp.X(1) + 14}`, { 'stroke-width': 3, stroke: RED }), dBrL = mono(dS, gp.X(1) + 34, (gp.Y(1.5) + gp.Y(1)) / 2 + 7, 'I r lost', { fill: RED, 'font-weight': 600 });
const dFx = mk(dS, 'foreignObject', { x: 120, y: 510, width: 600, height: 70 }); dFx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:36px;text-align:center">${K(`${Vv} = 1.5 - 0.5\\,${Iv}`)}</div>`;

/* ================= S: capacity, then combinations ================= */
const sRows = rows($('#sSteps'), [
  [K(`\\text{capacity} = \\text{charge stored}`), '', 84],
  [K(`${Qv} = ${Iv} \\times ${tv}`), 'current × time', 178],
  [K(`\\text{mAh} = \\text{mA} \\times \\text{h}`), '', 272],
  [K(`1\\,\\text{mAh} = 10^{-3}\\,\\text{A} \\times 3600\\,\\text{s}`), '', 366],
  [K(`1\\,\\text{mAh} = 3.6\\,\\text{C}`), '', 470]]);
const tSR = [wt('S2', 'charge'), wt('S3', 'Current'), wt('S3', 'Milliamperes'), wt('S4', 'One'), wt('S4', 'three')];
const sBox = mk($('#sLS'), 'rect', { x: 24, y: 452, width: 736, height: 96, rx: 14, fill: C.ac2 }); $('#sLS').insertBefore(sBox, $('#sLS').firstChild);
const s2 = $('#sS2'), DR = [];
[[0, '5000 mA × 1 h', 1], [1, '500 mA × 10 h', 10]].forEach(([i, lab, hrs]) => {
  const y = 110 + i * 190, g = mk(s2, 'g');
  mono(g, 36, y - 14, lab, { fill: INK, 'font-weight': 600, 'font-size': 22 });
  mk(g, 'rect', { x: 36, y, width: 520, height: 84, rx: 14, fill: '#fff', stroke: INK, 'stroke-width': 4 }); mk(g, 'rect', { x: 556, y: y + 24, width: 14, height: 36, rx: 4, fill: INK });
  const f = mk(g, 'rect', { x: 46, y: y + 10, width: 500, height: 64, rx: 8, fill: AM });
  const h = tx(g, 600, y + 56, '0.0 h', { 'font-family': 'IBM Plex Mono', 'font-size': 30 });
  DR.push({ g, f, h, hrs });
});
const sSum = mk(s2, 'foreignObject', { x: 36, y: 470, width: 712, height: 80 }); sSum.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font:600 28px Poppins;text-align:center;color:${INK}">Both = 5000 mAh = 18 000 C</div>`;
const sec = 1.1; // seconds on screen per hour of drain
/* combinations */
const gS0 = mk($('#sLS'), 'g', { transform: 'translate(0,60)' }), gS = mk(gS0, 'g'), gP = mk(s2, 'g');
W(gS, 'M60,200 H124 M164,200 H264 M304,200 H404 M444,200 H544 M584,200 H724', { 'stroke-width': 3.5 });
[144, 284, 424, 564].slice(0, 3).forEach(() => 0);
const serX = [144, 284, 424], serC = serX.map(x => { const e = cell(gS, x, 192, 50); e.forEach(p => p.setAttribute('transform', `rotate(-90 ${x} 200)`)); return e; });
[564].forEach(x => { mk(gS, 'rect', { x: x - 20, y: 186, width: 40, height: 28, fill: '#fff', stroke: INK, 'stroke-width': 3 }); });
W(gS, 'M544,200 H584', { 'stroke-width': 3.5 }); mono(gS, 564, 250, 'load R', { 'text-anchor': 'middle', 'font-size': 18, fill: INK, 'font-weight': 600 });
serX.forEach(x => mono(gS, x, 150, '1.5 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600 }));
const serE = mono(gS, 300, 300, '1.5 + 1.5 + 1.5 = 4.5 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 26 });
const serFx = mk(gS, 'foreignObject', { x: 36, y: 330, width: 712, height: 200 }); serFx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px;text-align:center;line-height:1.9">${K(`${c(TE, 'E_{total}')} = n${Ev}`)}<br>${K(`${c(INK, 'r_{total}')} = n${rv}`)}</div>`;
const serFx2 = serFx.firstChild;
W(gP, 'M200,130 V350 M560,130 V350', { 'stroke-width': 3.5 }); W(gP, 'M100,240 H200 M560,240 H660', { 'stroke-width': 3.5 });
const parY = [150, 240, 330]; parY.forEach(y => { W(gP, `M200,${y} H356 M396,${y} H560`, { 'stroke-width': 3.5 }); const e = cell(gP, 376, y - 8, 50); e.forEach(p => p.setAttribute('transform', `rotate(-90 376 ${y})`)); });
const parE = mono(gP, 690, 248, '1.5 V', { fill: TE, 'font-weight': 600, 'font-size': 24 });
const parFx = mk(gP, 'foreignObject', { x: 36, y: 380, width: 712, height: 200 }); parFx.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px;text-align:center;line-height:1.9">${K(`${c(TE, 'E_{total}')} = ${Ev}`)}<br>${K(`${c(INK, 'r_{total}')} = \\dfrac{${rv}}{n}`)}</div>`;
const parTag = mk(gP, 'g'); mk(parTag, 'rect', { x: 560, y: 90, width: 190, height: 40, rx: 10, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); tx(parTag, 655, 117, 'lasts longer', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: GD });

/* ================= W: worked example ================= */
const wS = $('#wS');
const wB = [mk(wS, 'rect', { x: 36, y: 80, width: 560, height: 170, rx: 20, fill: '#2A3758' }), mk(wS, 'rect', { x: 596, y: 120, width: 20, height: 34, rx: 4, fill: GD }), mk(wS, 'rect', { x: 596, y: 176, width: 20, height: 34, rx: 4, fill: GD })];
const wBt = [tx(wS, 66, 190, '3.7 V', { 'font-family': 'IBM Plex Mono', 'font-size': 56, fill: '#3FC1C1' }), tx(wS, 280, 190, '5000 mAh', { 'font-family': 'IBM Plex Mono', 'font-size': 56, fill: AM })];
const wQ = tx(wS, 36, 330, '', { 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: OR }), wQl = mono(wS, 36, 290, 'CHARGE STORED', { 'font-size': 16, 'font-weight': 600 });
const wU = tx(wS, 420, 330, '', { 'font-family': 'IBM Plex Mono', 'font-size': 40, fill: GD }), wUl = mono(wS, 420, 290, 'ENERGY STORED', { 'font-size': 16, 'font-weight': 600 });
const wTl = mono(wS, 36, 400, 'AT 250 mA THE PHONE RUNS FOR', { 'font-size': 16, 'font-weight': 600 });
const wTb = mk(wS, 'rect', { x: 36, y: 420, width: 600, height: 30, rx: 15, fill: SOFT }), wTf = mk(wS, 'rect', { x: 36, y: 420, width: 0, height: 30, rx: 15, fill: VI });
const wTk = [0, 5, 10, 15, 20].map(h => mono(wS, 36 + h * 30, 486, h + ' h', { 'text-anchor': 'middle', 'font-size': 18 }));
const wTv = tx(wS, 660, 446, '', { 'font-family': 'IBM Plex Mono', 'font-size': 30 });
const wRows = rows($('#wSteps'), [
  [K(`5000\\,\\text{mAh} = 5\\,\\text{Ah}`), '', 84],
  [K(`${Qv} = ${Iv}${tv} = 5 \\times 3600 = 18\\,000\\,\\text{C}`), '', 182],
  [K(`${Uv} = ${Vv}${Qv} = 3.7 \\times 18\\,000`), '', 276],
  [K(`${Uv} = 66\\,600\\,\\text{J} = 18.5\\,\\text{Wh}`), '', 370],
  [K(`${tv} = \\dfrac{5000}{250} = 20\\,\\text{h}`), 'battery life', 476]]);
const tWR = [T0('W2'), wt('W3', 'Charge'), T0('W4'), T0('W5'), T0('W6')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'emf E = terminal voltage V, always', right: K(`${Vv} = ${Ev} - ${Iv}${rv}`) + ' · equal only when I = 0', y0: 96, y1: 184 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'], type: 'Terminal voltage, internal resistance, cells in series and parallel (JEE Main: 3 Apr 2025 Shift 2)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Four identical cells, each of emf 1.5 V and internal resistance 0.25 Ω, are in series with a 5 Ω resistor. What is the terminal voltage of the battery?', qW: 780,
  opts: ['6.0 V', '5.0 V', '5.75 V', '1.25 V'], right: 1, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K(`${Ev} = 4 \\times 1.5 = 6\\,\\text{V}`)], [K(`${rv} = 4 \\times 0.25 = 1${OM}`)], [K(`${Iv} = \\dfrac{6}{5 + 1} = 1\\,\\text{A}`)], [K(`${Vv} = 6 - 1 \\times 1 = 5\\,\\text{V}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'In'), wt('A2', 'And'), T0('A3'), T0('A4')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Cells and batteries · fact card', txt: [0, 1, 1, 1, 1],
  lines: [K(`${Vv} = ${Ev} - ${Iv}${rv} \\qquad ${Iv} = ${Ev} / (${Rv} + ${rv})`), 'Series: n E and n r · Parallel (identical): E and r / n', 'Capacity: 1 mAh = 3.6 C · Energy in Wh = V × Ah', 'Primary: use once (dry cell, about 1.5 V)', 'Secondary: rechargeable (lead acid 2 V, lithium ion 3.7 V)'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 60', topic: 'Soldering and Desoldering', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[wt('H2', 'Three') - 0.2, tC - 0.3], [T0('B4'), tD - 0.3], [wt('S3', 'Current'), tS5 - 0.3], [tW + 0.2, tX - 0.3]];
const f2 = v => v.toFixed(2);

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GW.find(([a, b]) => t >= a - 0.3 && t < b + 0.4); if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tC + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tC - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2C'), t, T0('H3') - 0.2, out, { dx: 60, dy: 0, ...o });
    fadeAt([hb, ...hTerm, hT1], t, tMorph + 0.5, 0.06);
    M.vis(hV, t, wt('H2', 'Three') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); M.vis(hVl, t, wt('H2', 'volts'), 1e9, { dy: 8 });
    M.vis(hC, t, wt('H2', 'Five') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); M.vis(hCl, t, wt('H2', 'hours') - 0.3, 1e9, { dy: 8 });
    fadeAt([barO, barN, barF, barP], t, T0('H3'), 0.05);
    const u = M.io((t - wt('H3', 'heavy')) / 2.6), pct = 80 - 46 * u;
    PUC.attr(barF, 'width', (460 * pct / 100).toFixed(1)); PUC.attr(barF, 'fill', pct < 45 ? C.red : C.ok); M.setT(barP, Math.round(pct) + '%');
    M.vis(hGame, t, wt('H3', 'heavy') - 0.1, 1e9, { dx: -10, dy: 0 }); M.vis(hGame2, t, wt('H3', 'drops') - 0.1, 1e9, { dx: -10, dy: 0 });
    M.vis(hQ, t, T0('H4') + 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
  }

  /* C: inside a cell */
  const cOn = t >= tC - 0.05 && t < tP + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tP - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([jar], t, tC + 0.4); M.vis(rodN, t, wt('C2', 'metal') - 0.1, 1e9, { dy: -20 }); M.vis(rodP, t, wt('C2', 'plates') - 0.1, 1e9, { dy: -20 });
    M.vis(lyte, t, wt('C3', 'chemical') - 0.1, 1e9, { dy: 0, fade: 0.4 }); fadeAt(cSign, t, wt('C2', 'electrodes'), 0.1); fadeAt(cLab.slice(0, 2), t, wt('C2', 'electrodes'), 0.15); M.vis(cLab[2], t, wt('C3', 'electrolyte') - 0.1, 1e9, { dy: 8 });
    drawSeq(cWire, t, T0('C4') - 0.2, 0.4, 0.15); fadeAt([cLamp], t, T0('C4'));
    const go = t >= wt('C4', 'pushes') - 0.1; eC.set(t * 70, go); PUC.attr(cLamp, 'fill', t >= wt('C5', 'travel') ? AM : '#fff');
    ions.forEach((e, i) => { const ph = ((t * 0.35 + i / 6) % 1), x = 300 + 180 * ph, y = 340 + (i % 3) * 56; PUC.attr(e, 'cx', x.toFixed(1)); PUC.attr(e, 'cy', y); M.hide(e, !go || ph < 0.04 || ph > 0.96); });
    [[$('#cr0'), wt('C2', 'electrodes')], [$('#cr1'), wt('C3', 'electrolyte')], [$('#cr2'), wt('C4', 'pushes')]].forEach(([e, a]) => M.vis(e, t, a - 0.1, 1e9, { dy: 16 }));
    M.vis($('#cStrip'), t, wt('C6', 'chemical') - 0.2, 1e9, { dy: 24 });
    fadeAt([...cSym1, cSymL1], t, T0('C7') + 0.2, 0.06); fadeAt([...cSym2, cSymL2], t, wt('C7', 'battery') - 0.2, 0.04);
  }

  /* P: families */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([...dry, ...dryS, dryL], t, T0('P2'), 0.05); M.vis(dryV, t, wt('P3', 'one') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#pLs'), t, wt('P2', 'reaction') - 0.2, 1e9, { dy: 24 });
    M.vis(pF[0], t, wt('P5', 'lead') - 0.2, 1e9, { dy: 16 }); M.vis(pF[1], t, wt('P6', 'lithium') - 0.2, 1e9, { dy: 16 });
    const t6 = wt('P5', 'Six'); six.forEach((s, i) => { M.vis(s.g, t, t6 + i * 0.16, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); PUC.attr(s.r, 'fill', t >= t6 + i * 0.16 + 0.1 ? C.ac2 : SOFT); });
    M.vis(sixT, t, wt('P5', 'twelve') - 0.1, 1e9, { dx: -10, dy: 0 });
    M.vis(pLoop, t, wt('P4', 'recharged'), 1e9, { dy: 8 });
    const ph = M.clamp((t - wt('P4', 'recharged')) / 0.5); pArr.set(250, 560, 250 + 60 * ph, 560); pArr2.set(534, 560, 534 - 60 * ph, 560);
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32, R = Rnow(t), I = Inow(t), V = E0 - I * r0, live = t >= tLive;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([box, boxL, ...bCell], t, tB + 0.4, 0.06); M.draw(rZ, t, wt('B2', 'internal') - 0.2, 0.5); M.vis(bLb[1], t, wt('B2', 'small'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis(bLb[0], t, T0('B4') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(bW, t, T0('B4') + 0.1, 0.35, 0.1); fadeAt([amC, amT, ...vmW, vmC, vmT, ...jn, ...swT, swL, bR, ...bLb.slice(2), bRv], t, T0('B4') + 0.5, 0.03);
    const closed = R !== Infinity; setLev(swL, 600, 112, closed ? 658 : 652, closed ? 112 : 74);
    M.setT(bRv, closed ? `${R} Ω` : 'open');
    eB.set(offB(t), closed);
    [scR, ...scG].forEach(e => M.vis(e, t, T0('B4') + 0.8, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, T0('B4') + 0.9, 0.08);
    laneB(scT[0], tau => E0 - Inow(tau) * r0, t, 450, 84); laneB(scT[1], tau => Inow(tau), t, 556, 52);
    const vals = [live ? f2(E0) : '-', closed ? f2(R) : live ? 'open' : '-', live ? f2(I) : '-', live ? f2(V) : '-', live ? f2(I * r0) : '-'];
    roV.forEach((e, i) => M.setT(e, vals[i]));
    roK.forEach((e, i) => M.vis(e, t, tB + 0.5 + Math.floor(i / 3) * 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#sb'), t, tLive, 1e9, { dy: 10 }); M.vis($('#sbL'), t, tLive + 0.3, 1e9, { dy: 8 });
    const sv = $('#sbV'), si = $('#sbI'); sv.style.left = '0px'; sv.style.width = (576 * V / E0).toFixed(1) + 'px'; sv.style.background = TE; si.style.left = (576 * V / E0).toFixed(1) + 'px'; si.style.width = (576 * I * r0 / E0).toFixed(1) + 'px'; si.style.background = RED;
    $('#sbL').innerHTML = `<span style="color:${TE};font-weight:600">V reaches the load</span> · <span style="color:${RED};font-weight:600">I r lost inside</span>`;
  }

  /* D: derivation + graph */
  const dOn = t >= tD - 0.05 && t < tS + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tS - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    runRows(dRows, t, tDR); M.vis($('#dBox'), t, tDR[3] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.draw(dE, t, tD + 0.6, 0.5); M.vis(dEL, t, tD + 0.9, 1e9, { dy: 0, fade: 0.2 });
    dPts.forEach((p, i) => M.vis(p, t, tD + 0.8 + i * 0.25, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }));
    const u = M.io((t - tDR[3] - 0.2) / 0.8); dLine(s => [s, 1.5 - 0.5 * s], 0, 1.7 * u);
    M.vis(dFx, t, tDR[3] + 0.8, 1e9, { dy: 10 }); M.draw(dBr, t, tDR[4] + 0.2, 0.4); M.vis(dBrL, t, tDR[4] + 0.4, 1e9, { dx: -8, dy: 0 });
  }

  /* S: capacity + combinations */
  const sOn = t >= tS - 0.05 && t < tT + 0.05; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = tT - 0.32, comb = t >= tS5 - 0.3;
    M.vis($('#sL'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, tS + 0.25, out, { dx: 60, dy: 0, ...o });
    M.setT($('#sLL'), comb ? 'CELLS IN SERIES' : 'CAPACITY · MILLIAMPERE HOURS'); M.setT($('#sRL'), comb ? 'CELLS IN PARALLEL' : 'SAME CHARGE, TWO WAYS');
    runRows(sRows, t, tSR, tS5 - 0.3); M.vis(sBox, t, tSR[4] + 0.4, tS5 - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    const t0 = tSR[1];
    DR.forEach((d, i) => { M.vis(d.g, t, tS + 0.5 + i * 0.2, tS5 - 0.3, { dy: 16, outDur: 0.25 }); const h = M.clamp((t - t0) / sec, 0, d.hrs); PUC.attr(d.f, 'width', (500 * (1 - h / d.hrs)).toFixed(1)); M.setT(d.h, h.toFixed(1) + ' h'); });
    M.vis(sSum, t, tSR[4] + 0.3, tS5 - 0.3, { dy: 10, outDur: 0.25 });
    M.vis(gS, t, tS5, 1e9, { dy: 0, fade: 0.25 }); M.vis(gP, t, T0('S7') - 0.1, 1e9, { dy: 0, fade: 0.25 });
    M.vis(serE, t, wt('S5', 'add'), 1e9, { dy: 8 }); M.vis(serFx, t, wt('S6', 'So') - 0.1, 1e9, { dy: 10 });
    M.vis(parE, t, wt('S7', 'same'), 1e9, { dx: -8, dy: 0 }); M.vis(parFx, t, wt('S8', 'internal') - 0.1, 1e9, { dy: 10 }); M.vis(parTag, t, wt('S8', 'longer') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Its') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([...wB, ...wBt], t, tW + 0.4, 0.06);
    fadeAt([wQl, wQ], t, tWR[1], 0.1); M.count(wQ, t, tWR[1] + 0.3, 1.2, 0, 18000, v => Math.round(v).toLocaleString('en-US').replace(',', ' ') + ' C');
    fadeAt([wUl, wU], t, tWR[3], 0.1); M.count(wU, t, tWR[3] + 0.3, 1.2, 0, 18.5, v => v.toFixed(1) + ' Wh');
    fadeAt([wTl, wTb, wTf, ...wTk, wTv], t, tWR[4], 0.04);
    const g = M.io((t - tWR[4] - 0.5) / 1.4); PUC.attr(wTf, 'width', (600 * g).toFixed(1)); M.hide(wTf, g <= 0.001); M.setT(wTv, (20 * g).toFixed(0) + ' h');
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'They') - 0.05, tRight: wt('X3', 'V') - 0.2 });
    M.vis($('#cs0'), t, wt('X4', 'equal') - 0.1, 1e9, { dx: -14, dy: 0 }); M.vis($('#cs1'), t, wt('X4', 'current') - 0.1, 1e9, { dx: -14, dy: 0 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X6', 'J'), wt('X5', 'P'), wt('X5', 'C', 1), wt('X5', 'I', 2)], tType: wt('X7', 'Expect') - 0.2 });
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
