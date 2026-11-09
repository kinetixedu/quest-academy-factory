// PUC Electronics Ep 61 - Printed circuit boards ("Breadboard" style, Lab Notebook world)
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
const RED = C.red, CU = GD, SUB = '#E9DCC0', MASK = '#3E8E5E', rho = c(INK, '\\rho'), Lv = c(INK, 'L'), Av = c(INK, 'A');
Object.assign(M.IC, {
  shrink: ['m15 15 6 6', 'm15 9 6-6', 'M21 16v5h-5', 'M21 8V3h-5', 'M3 16v5h5', 'm3 21 6-6', 'M3 8V3h5', 'M9 9 3 3'],
  copy: ['M8 8h12v12H8z', 'M4 16V4h12'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'] });
const tMorph = wt('H1', 'opens') - 0.2;
const tP = T0('P1'), tY = T0('Y1'), tM = T0('M1'), tB = T0('B1'), tV = T0('V1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hS = $('#hS');
const nest = mk(hS, 'g'), nCol = [RED, TE, VI, AM, INK, '#5F7399'];
for (let i = 0; i < 9; i++) { const y0 = 140 + (i * 19) % 110; W(nest, `M60,${y0} C${180 + i * 30},${y0 - 40} ${300 - i * 10},${y0 + 70} ${460 + i * 12},${y0 + 10} S${640 - i * 8},${y0 - 30} 724,${y0 + 20}`, { stroke: nCol[i % 6], 'stroke-width': 4 }); }
const nestL = mono(hS, 60, 92, 'WHAT HE EXPECTED', { 'font-weight': 600, 'font-size': 18 }), nestX = W(hS, 'M120,110 L664,280 M664,110 L120,280', { stroke: RED, 'stroke-width': 6 });
const found = mk(hS, 'g');
mk(found, 'rect', { x: 60, y: 330, width: 664, height: 230, rx: 14, fill: MASK });
[['M100,380 H300 V470 H420', 1], ['M100,520 H220 V470', 1], ['M480,380 H640 V520 H560', 1], ['M300,380 V350 H560 V380', 1]].forEach(([d]) => W(found, d, { stroke: '#D9B45A', 'stroke-width': 7 }));
[[100, 380], [420, 470], [100, 520], [480, 380], [560, 520], [300, 380], [560, 380]].forEach(([x, y]) => mk(found, 'circle', { cx: x, cy: y, r: 11, fill: '#D9B45A' }));
const foundL = mono(hS, 60, 316, 'WHAT HE FOUND', { 'font-weight': 600, 'font-size': 18, fill: '#2E7D4F' });

/* ================= P: anatomy ================= */
const pS = $('#pS');
const brd = mk(pS, 'rect', { x: 60, y: 90, width: 664, height: 450, rx: 14, fill: SUB, stroke: INK, 'stroke-width': 3 });
const TR = ['M160,180 H300 V320', 'M520,320 V200 H640', 'M520,320 V440 H300', 'M640,440 V380'].map(d => W(pS, d, { stroke: CU, 'stroke-width': 12 }));
const PADS = [[160, 180], [300, 320], [520, 320], [640, 200], [640, 440], [300, 440], [640, 380]];
let md = 'M60,90 H724 V540 H60 Z'; PADS.forEach(([x, y]) => { md += ` M${x + 22},${y} a22,22 0 1,0 -44,0 a22,22 0 1,0 44,0 Z`; });
const mask = mk(pS, 'path', { d: md, fill: MASK, 'fill-rule': 'evenodd', opacity: 0.82 });
const pads = PADS.map(([x, y]) => { const g = mk(pS, 'g'); mk(g, 'circle', { cx: x, cy: y, r: 16, fill: CU, stroke: '#8A6015', 'stroke-width': 2 }); mk(g, 'circle', { cx: x, cy: y, r: 5, fill: '#fff' }); return g; });
const part = mk(pS, 'g'); W(part, 'M300,320 H350 M470,320 H520', { stroke: '#9AA0AC', 'stroke-width': 5 }); mk(part, 'rect', { x: 350, y: 300, width: 120, height: 40, rx: 14, fill: '#E7D3A8', stroke: INK, 'stroke-width': 3 }); [372, 396, 420].forEach((x, i) => mk(part, 'rect', { x, y: 300, width: 8, height: 40, fill: [RED, VI, AM][i] }));
const silk = mk(pS, 'g'); mk(silk, 'rect', { x: 340, y: 288, width: 140, height: 64, rx: 8, fill: 'none', stroke: '#fff', 'stroke-width': 2.5 });
[[410, 280, 'R1'], [690, 416, 'C1'], [160, 150, 'J1'], [520, 476, 'GND']].forEach(([x, y, s]) => tx(silk, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: '#fff', 'text-anchor': 'middle' }));
const eP = flow(pS, [[160, 180], [300, 180], [300, 320]], 6, { r: 6 });
const pTag = mono(pS, 76, 520, 'insulating board', { fill: INK, 'font-weight': 600, 'font-size': 18 });

/* ================= Y: types ================= */
const yC = ['#y0', '#y1', '#y2'].map(s => $(s)), yg = yC.map(e => e.querySelector('svg'));
const slab = (g, y, h) => mk(g, 'rect', { x: 66, y, width: 380, height: h, fill: SUB, stroke: INK, 'stroke-width': 3 });
const cuL = (g, y, segs = [[80, 200], [240, 430]]) => segs.forEach(([a, b]) => mk(g, 'rect', { x: a, y: y - 6, width: b - a, height: 12, fill: CU }));
slab(yg[0], 260, 70); cuL(yg[0], 254); mono(yg[0], 256, 226, 'copper', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 18 }); mono(yg[0], 256, 300, 'board', { 'text-anchor': 'middle', fill: INK, 'font-size': 18 });
slab(yg[1], 260, 70); cuL(yg[1], 254); cuL(yg[1], 336, [[80, 250], [262, 430]]); mk(yg[1], 'rect', { x: 248, y: 248, width: 16, height: 94, fill: CU, stroke: '#8A6015', 'stroke-width': 2 }); mono(yg[1], 276, 226, 'via', { fill: GD, 'font-weight': 600, 'font-size': 20 });
slab(yg[2], 220, 150); [214, 264, 324, 376].forEach((y, i) => cuL(yg[2], y, i % 3 ? [[80, 430]] : [[80, 200], [240, 430]])); mk(yg[2], 'rect', { x: 248, y: 208, width: 16, height: 174, fill: CU, stroke: '#8A6015', 'stroke-width': 2 }); mono(yg[2], 256, 196, '4 copper layers', { 'text-anchor': 'middle', fill: GD, 'font-weight': 600, 'font-size': 18 });

/* ================= M: making ================= */
const mS = $('#mS');
mk(mS, 'rect', { x: 80, y: 110, width: 624, height: 360, rx: 12, fill: SUB, stroke: INK, 'stroke-width': 3 });
const MT = ['M160,190 H400 V290 H620', 'M160,390 H300 V290', 'M460,400 H620 V190'], MP = [[160, 190], [620, 290], [160, 390], [300, 290], [460, 400], [620, 190]];
const mCu = mk(mS, 'g'); MT.forEach(d => W(mCu, d, { stroke: CU, 'stroke-width': 16 })); MP.forEach(([x, y]) => mk(mCu, 'circle', { cx: x, cy: y, r: 18, fill: CU }));
const mFull = mk(mS, 'rect', { x: 84, y: 114, width: 616, height: 352, rx: 10, fill: CU });
const mInk = mk(mS, 'g'); const inkP = MT.map(d => W(mInk, d, { stroke: '#2A3758', 'stroke-width': 20 })); const inkC = MP.map(([x, y]) => mk(mInk, 'circle', { cx: x, cy: y, r: 21, fill: '#2A3758' }));
const bath = mk(mS, 'rect', { x: 80, y: 110, width: 624, height: 360, rx: 12, fill: '#8A5A2B', opacity: 0.32 }), bathL = mono(mS, 392, 506, 'FERRIC CHLORIDE BATH', { 'text-anchor': 'middle', fill: '#8A5A2B', 'font-weight': 600 });
const holes = MP.map(([x, y]) => mk(mS, 'circle', { cx: x, cy: y, r: 6, fill: '#fff' }));
const mPart = [mk(mS, 'rect', { x: 140, y: 230, width: 40, height: 120, rx: 10, fill: '#E7D3A8', stroke: INK, 'stroke-width': 3 }), mk(mS, 'rect', { x: 500, y: 210, width: 90, height: 140, rx: 8, fill: INK })];
const mSold = MP.map(([x, y]) => mk(mS, 'circle', { cx: x, cy: y, r: 11, fill: '#B8BCC6', stroke: INK, 'stroke-width': 2 }));
const mRows = rows($('#mSteps'), [['Start: copper clad board', '', 84], ['Print the layout in ink', '', 178], ['Etch in ferric chloride', '', 272], ['Clean off the ink', '', 366], ['Drill, place parts, solder', '', 460]]);
mRows.forEach(r => r.querySelector('.sx').style.fontSize = '30px');
const tMR = [T0('M2'), T0('M3'), T0('M4'), T0('M5'), T0('M6')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bBoard = mk(ck, 'rect', { x: 28, y: 76, width: 872, height: 180, rx: 12, fill: MASK });
const sup = mk(ck, 'g'); mk(sup, 'rect', { x: 44, y: 110, width: 110, height: 100, rx: 10, fill: INK }); tx(sup, 99, 170, '5 V', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30, fill: '#3FC1C1' });
const loadB = mk(ck, 'g'); mk(loadB, 'rect', { x: 724, y: 110, width: 160, height: 100, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 }); tx(loadB, 804, 154, 'PART', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 24 }); tx(loadB, 804, 186, '2 A', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 24, fill: VI });
const track = W(ck, 'M154,160 H724', { stroke: CU, 'stroke-width': 6, 'stroke-linecap': 'butt' });
const eT = flow(ck, [[724, 160], [154, 160]], 18, { r: 6 });
const dimL = [W(ck, 'M154,104 H724', { stroke: '#fff', 'stroke-width': 2 }), W(ck, 'M154,96 V112 M724,96 V112', { stroke: '#fff', 'stroke-width': 2 })], dimT = mono(ck, 439, 96, 'L = 10 cm', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const wLab = mono(ck, 439, 226, '', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
const vChip = [mono(ck, 99, 290, 'V = 5.00 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 20 }), mono(ck, 804, 290, '', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 20 })];
const scR = mk(ck, 'rect', { x: 32, y: 312, width: 864, height: 256, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 312, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const scT = [mk(ck, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4 }), mk(ck, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linejoin': 'round' })];
const scL = [mono(ck, 44, 526, 'CH1 SUPPLY', { fill: CH1, 'font-weight': 600, 'font-size': 16 }), mono(ck, 44, 550, 'CH2 AT THE PART', { fill: AM, 'font-weight': 600, 'font-size': 16 }), mono(ck, 884, 340, 'ZOOMED: 4.0 TO 5.2 V', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const tOn = wt('B5', 'push'), tWide = wt('B8', 'one');
const Wd = t => t < tWide ? 0.25 : 1, Rt = t => 1.7e-8 * 0.1 / (Wd(t) * 1e-3 * 35e-6), Ib = t => t >= tOn ? 2 : 0, Vp = t => 5 - Ib(t) * Rt(t);
const yV = v => 548 - (v - 4) / 1.2 * 208;
const laneV = (p, f, t) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200; if (tau < tB + 1) { first = true; continue; } d += (first ? 'M' : 'L') + (110 + 776 * i / 200).toFixed(1) + ',' + yV(f(tau)).toFixed(1); first = false; } PUC.attr(p, 'd', d); };
$('#rFx').innerHTML = K(`${Rv} = \\dfrac{${rho}${Lv}}{w\\,t}`);
$('#ro').innerHTML = [['L', INK, 'cm'], ['w', INK, 'mm'], ['t', INK, 'µm'], ['R', INK, 'Ω'], ['I', VI, 'A'], ['V', TE, 'V at part']].map(([k, col, u]) => `<span class="k" style="color:${col}">${k}</span><span class="v" style="color:${col}">-</span><span class="u">${u}</span>`).join('');
const roV = [...$('#ro').querySelectorAll('.v')], roK = [...$('#ro').children];
const rbS = $('#rbS'), xs = mk(rbS, 'g');
mono(xs, 32, 486, 'TRACK CROSS SECTION · A = w × t', { 'font-weight': 600, 'font-size': 16 });
mk(xs, 'rect', { x: 32, y: 500, width: 576, height: 70, rx: 10, fill: SOFT }); mk(xs, 'rect', { x: 200, y: 520, width: 240, height: 22, fill: CU, stroke: INK, 'stroke-width': 2 });
mono(xs, 320, 562, 'w', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-style': 'italic' }); mono(xs, 452, 538, 't', { fill: INK, 'font-weight': 600, 'font-style': 'italic' }); mono(xs, 590, 538, 'current: into the page', { 'text-anchor': 'end', 'font-size': 14 });

/* ================= V: advantages ================= */
const vT = ['#v0', '#v1', '#v2', '#v3', '#v4'].map(s => $(s));
['shrink', 'check', 'copy', 'lock', 'wrench'].forEach((ic, i) => vT[i].querySelector('.ic').innerHTML = M.icon(ic, 48, INK, 2));

/* ================= W: worked example ================= */
const wS = $('#wS');
const blk = [mk(wS, 'path', { d: 'M120,170 L560,170 L660,110 L220,110 Z', fill: CU, stroke: INK, 'stroke-width': 3 }), mk(wS, 'path', { d: 'M120,170 L560,170 L560,200 L120,200 Z', fill: '#C48A2A', stroke: INK, 'stroke-width': 3 }), mk(wS, 'path', { d: 'M560,170 L660,110 L660,140 L560,200 Z', fill: '#9E6E1F', stroke: INK, 'stroke-width': 3 })];
const wDim = [mono(wS, 340, 230, 'L = 10 cm', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(wS, 640, 96, 'w = 1 mm', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(wS, 676, 186, 't = 35 µm', { fill: INK, 'font-weight': 600 })];
const wNote = mono(wS, 392, 262, '(thickness drawn much bigger than real)', { 'text-anchor': 'middle', 'font-size': 16 });
const wHi = mk(wS, 'path', { d: 'M560,170 L660,110 L660,140 L560,200 Z', fill: 'none', stroke: AM, 'stroke-width': 5 });
const wIa = PUC.arrow(wS, VI, 5, 16);
const wR = [['A', '3.5 × 10⁻⁸ m²', INK], ['R', '0.049 Ω', INK], ['IR', '0.097 V ≈ 0.1 V', TE]].map(([k, v, col], i) => { const g = mk(wS, 'g'); mk(g, 'rect', { x: 36, y: 310 + i * 84, width: 712, height: 68, rx: 14, fill: SOFT }); tx(g, 64, 354 + i * 84, k, { 'font-style': 'italic', 'font-size': 30, fill: col }); tx(g, 720, 354 + i * 84, v, { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 30, fill: col }); return g; });
const wRows = rows($('#wSteps'), [
  [K(`${Av} = w\\,t = 10^{-3} \\times 35 \\times 10^{-6}`), '', 84],
  [K(`${Av} = 3.5 \\times 10^{-8}\\,\\text{m}^2`), '', 178],
  [K(`${rho} = 1.7 \\times 10^{-8}\\,\\Omega\\,\\text{m}`), 'copper', 272],
  [K(`${Rv} = \\dfrac{${rho}${Lv}}{${Av}} = \\dfrac{1.7 \\times 10^{-8} \\times 0.1}{3.5 \\times 10^{-8}}`), '', 370],
  [K(`${Rv} \\approx 0.049${OM},\\ \\ ${Iv}${Rv} \\approx 0.1\\,\\text{V}`), '', 484]]);
const tWR = [wt('W2', 'Area'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A = width × length (the top area)', right: 'A = width × thickness (cross section)', y0: 96, y1: 184 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Advantages of PCBs (KSEAB model paper); types; steps of making a PCB' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A copper track has a resistance of 0.08 Ω. A second track of the same copper is twice as wide and half as long. What is its resistance?', qW: 780,
  opts: ['0.02 Ω', '0.08 Ω', '0.32 Ω', '0.04 Ω'], right: 0, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K(`${Rv} = \\dfrac{${rho}${Lv}}{w\\,t}`)], [K(`${Lv} \\to \\tfrac{1}{2}${Lv}:\\ ${Rv} \\to \\tfrac{1}{2}${Rv}`)], [K(`w \\to 2w:\\ ${Rv} \\to \\tfrac{1}{4}${Rv}`)], [K(`${Rv} = \\dfrac{0.08}{4} = 0.02${OM}`)]], { dy: 116, y0: 100 });
const tSol = [T0('A2'), wt('A2', 'Halving'), T0('A3'), T0('A4')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Printed circuit boards · fact card', txt: [1, 1, 1, 1, 1],
  lines: ['PCB = insulating board + copper tracks, pads, mask, silkscreen', 'Types: single sided · double sided (vias) · multilayer', 'Making: layout in ink, etch (ferric chloride), drill, solder', 'Track resistance R = ρL / (w t) · big currents need wide tracks', 'Advantages: compact, fewer errors, cheap copies, reliable, easy repair'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 62', topic: 'JFET Construction and Working', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[T0('B5') - 0.2, tV - 0.3], [tW + 0.2, tX - 0.3]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GW.find(([a, b]) => t >= a - 0.3 && t < b + 0.4); if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#hC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    M.vis(nest, t, wt('H1', 'nest') - 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis(nestL, t, wt('H1', 'expects') - 0.2, 1e9, { dy: 8 });
    M.draw(nestX, t, wt('H2', 'Instead') - 0.1, 0.5);
    M.vis(found, t, wt('H2', 'flat') - 0.2, 1e9, { dy: 20 }); M.vis(foundL, t, wt('H2', 'flat') - 0.2, 1e9, { dy: 8 });
  }

  /* P: anatomy */
  const pOn = t >= tP - 0.05 && t < tY + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tY - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(brd, t, tP + 0.4, 1e9, { dy: 0, fade: 0.3 }); M.vis(pTag, t, wt('P2', 'insulator') - 0.1, 1e9, { dy: 8 });
    drawSeq(TR, t, wt('P4', 'copper') - 0.1, 0.5, 0.2); eP.set(t * 60, t >= wt('P4', 'job'));
    pads.forEach((g, i) => M.vis(g, t, wt('P5', 'pad') - 0.1 + i * 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 })); M.vis(part, t, wt('P5', 'leg') - 0.2, 1e9, { dy: -20 });
    M.vis(mask, t, wt('P6', 'green') - 0.1, 1e9, { dy: 0, fade: 0.5 }); M.vis(silk, t, wt('P7', 'white') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    const tr = [wt('P2', 'board'), wt('P4', 'tracks'), wt('P5', 'pad'), wt('P6', 'solder'), wt('P7', 'silkscreen')];
    ['#pr0', '#pr1', '#pr2', '#pr3', '#pr4'].forEach((s, i) => { const e = $(s); M.vis(e, t, tr[i] - 0.15, 1e9, { dy: 16 }); const hl = t >= tr[i] && t < (tr[i + 1] ?? tY - 0.4); e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT; });
    M.setT($('#pr0e'), t >= T0('P3') ? 'insulator: glass fibre + epoxy, or paper' : 'an insulator');
  }

  /* Y: types */
  const yOn = t >= tY - 0.05 && t < tM + 0.05; M.hide($('#sY'), !yOn);
  if (yOn) { const out = tM - 0.32, ty = [T0('Y2'), T0('Y3'), T0('Y4')]; yC.forEach((e, i) => M.vis(e, t, (i ? ty[i] : tY + 0.1) - 0.15, out, { dy: 36, ...o })); }

  /* M: making */
  const mOn = t >= tM - 0.05 && t < tB + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tB - 0.32;
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    const etch = M.clamp((t - wt('M4', 'eats')) / 1.8); M.vis(mFull, t, tMR[0] - 0.1, 1e9, { dy: 0, fade: 0.3 }); if (etch > 0) { mFull.style.opacity = (1 - etch).toFixed(3); if (etch >= 1) M.hide(mFull, true); }
    M.vis(mCu, t, tMR[0], 1e9, { dy: 0, fade: 0.2 });
    drawSeq(inkP, t, wt('M3', 'print') - 0.1, 0.6, 0.25); inkC.forEach((e, i) => M.vis(e, t, wt('M3', 'print') + 0.4 + i * 0.06, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }));
    const cl = M.io((t - wt('M5', 'Clean')) / 0.6); mInk.style.opacity = (1 - cl).toFixed(3); M.hide(mInk, cl >= 1);
    M.vis(bath, t, wt('M4', 'Dip') - 0.1, T0('M5'), { dy: 0, fade: 0.3, outDur: 0.4, ody: 0 }); M.vis(bathL, t, wt('M4', 'ferric') - 0.1, T0('M5'), { dy: 8, outDur: 0.4 });
    holes.forEach((e, i) => M.vis(e, t, wt('M6', 'Drill') + i * 0.12, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }));
    mPart.forEach((e, i) => M.vis(e, t, wt('M6', 'place') + i * 0.2, 1e9, { dy: -40 })); mSold.forEach((e, i) => M.vis(e, t, wt('M6', 'solder') + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.setT($('#mLL'), t < tMR[1] ? 'MAKING A PCB · COPPER CLAD' : t < tMR[2] ? 'MAKING A PCB · INK LAYOUT' : t < tMR[3] ? 'MAKING A PCB · ETCHING' : t < tMR[4] ? 'MAKING A PCB · TRACKS' : 'MAKING A PCB · PARTS ON');
    mRows.forEach((r, i) => { M.vis(r, t, tMR[i] - 0.12, 1e9, { dy: 0, fade: 0.12 }); M.vis(r.querySelector('.n'), t, tMR[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tMR[i], 0.6); r.style.color = t >= tMR[i] && t < (tMR[i + 1] ?? tB) ? INK : MU; });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tV + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tV - 0.32, w = Wd(t), I = Ib(t), R = Rt(t), V = Vp(t), live = t >= tOn;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([bBoard, sup, loadB], t, tB + 0.4, 0.08); M.draw(track, t, tB + 0.7, 0.6);
    const sw = M.lerp(6, 24, M.io((t - tWide) / 0.5)); PUC.attr(track, 'stroke-width', sw.toFixed(1)); eT.set(t * 120, live);
    fadeAt([...dimL, dimT], t, wt('B5', 'ten') - 0.1, 0.06); M.setT(wLab, `w = ${w === 1 ? '1 mm' : '0.25 mm'}`); M.vis(wLab, t, T0('B6'), 1e9, { dy: 8 });
    M.vis(vChip[0], t, tOn, 1e9, { dy: 8 }); M.vis(vChip[1], t, wt('B7', 'receives') - 0.1, 1e9, { dy: 8 }); M.setT(vChip[1], `V = ${V.toFixed(2)} V`);
    [scR, ...scG].forEach(e => M.vis(e, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, tB + 1.0, 0.08);
    laneV(scT[0], () => 5, t); laneV(scT[1], Vp, t);
    M.vis($('#rFx'), t, T0('B2'), 1e9, { dy: 10 }); M.vis(xs, t, wt('B3', 'width') - 0.1, 1e9, { dy: 12 });
    const vals = [live || t >= wt('B5', 'ten') ? '10' : '-', t >= T0('B6') ? w.toFixed(2) : '-', t >= wt('B4', 'thirty') ? '35' : '-', t >= T0('B6') ? R.toFixed(3) : '-', live ? I.toFixed(1) : '-', t >= wt('B7', 'receives') ? V.toFixed(2) : '-'];
    roV.forEach((e, i) => M.setT(e, vals[i])); roK.forEach((e, i) => M.vis(e, t, T0('B3') + Math.floor(i / 3) * 0.08, 1e9, { dy: 0, fade: 0.2 }));
  }

  /* V: advantages */
  const vOn = t >= tV - 0.05 && t < tT + 0.05; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = tT - 0.32, tv = [T0('V2'), T0('V3'), T0('V4'), T0('V5'), T0('V6')];
    M.vis($('#vf'), t, tV + 0.1, out, { dy: 36, ...o });
    vT.forEach((e, i) => { M.vis(e, t, tv[i] - 0.15, 1e9, { dy: 16 }); const hl = t >= tv[i] && t < (tv[i + 1] ?? tT); e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT; });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'printed') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([...blk, wNote], t, tW + 0.4, 0.08); fadeAt(wDim, t, wt('W1', 'one') - 0.1, 0.5);
    M.vis(wHi, t, tWR[0], tWR[2], { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    const u = M.io((t - tWR[3]) / 0.6); wIa.set(140, 250, 140 + 400 * u, 250);
    [tWR[1] + 0.4, tWR[3] + 0.8, tWR[4] + 0.6].forEach((a, i) => M.vis(wR[i], t, a, 1e9, { dy: 16 }));
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: T0('X4') - 0.1 });
    M.vis($('#cs0'), t, wt('X3', 'along') - 0.1, 1e9, { dx: -14, dy: 0 }); M.vis($('#cs1'), t, wt('X3', 'cross') - 0.1, 1e9, { dx: -14, dy: 0 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'model') - 0.2 });
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
