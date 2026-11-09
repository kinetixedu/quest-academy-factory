// PUC Electronics Ep 58 - Switches, relays and connectors ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'switches') - 0.2;
const tR = T0('R1'), tR4 = T0('R4'), tB = T0('B1'), tU = T0('U1'), tC = T0('C1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook - the stair light ================= */
const hS = $('#hS');
const ceil = W(hS, 'M40,70 H744', { 'stroke-width': 3, stroke: '#B8BCC6' });
let sp = 'M40,560'; for (let k = 0; k < 7; k++) sp += ` H${100 + k * 60} V${510 - k * 50}`; sp += ' H744';
const stairs = W(hS, sp, { 'stroke-width': 5 });
const hid = W(hS, 'M112,384 V100 H682 V196', { 'stroke-width': 3, stroke: '#B8BCC6', 'stroke-dasharray': '10 8' });
const drop = W(hS, 'M392,100 V128', { 'stroke-width': 4 });
const hBulb = mk(hS, 'circle', { cx: 392, cy: 162, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const hBase = mk(hS, 'rect', { x: 376, y: 120, width: 32, height: 12, rx: 3, fill: INK });
const box = (x, y) => { const g = mk(hS, 'g'); mk(g, 'rect', { x: x - 26, y: y - 38, width: 52, height: 76, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 4 }); const k = mk(g, 'rect', { x: x - 9, y: y - 26, width: 18, height: 26, rx: 5, fill: INK }); return { g, k, y }; };
const hb1 = box(112, 420), hb2 = box(682, 232);
const hL = [mono(hS, 112, 486, 'BOTTOM', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(hS, 682, 298, 'TOP', { 'text-anchor': 'middle', 'font-weight': 600 })];
const hQ = tx(hS, 250, 196, '?', { 'font-size': 96, 'font-weight': 700, fill: AM, 'text-anchor': 'middle' });
const hQL = mono(hS, 250, 240, '2 switches · 1 light', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });

/* ================= R: switch = tap; poles and throws ================= */
const rS = $('#rS');
const rTap = mk(rS, 'g');
mk(rTap, 'rect', { x: 48, y: 140, width: 688, height: 52, rx: 10, fill: '#F2F4F8', stroke: INK, 'stroke-width': 4 });
const water = flow(rTap, [[60, 166], [724, 166]], 16, { fill: CH1, stroke: '#5F7399', r: 8 });
const valve = mk(rTap, 'rect', { x: 382, y: 140, width: 20, height: 52, fill: INK });
mk(rTap, 'rect', { x: 368, y: 104, width: 48, height: 26, rx: 6, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const tapH = W(rTap, '', { 'stroke-width': 6 });
const rTapL = mono(rTap, 60, 232, 'WATER PIPE + TAP', { 'font-weight': 600 });
const rTapS = mono(rTap, 724, 232, 'flowing', { 'text-anchor': 'end', fill: '#5F7399', 'font-weight': 600 });
const rCk = mk(rS, 'g');
W(rCk, 'M120,420 V340 H340'); W(rCk, 'M440,340 H660 V420'); W(rCk, 'M660,480 V540 H120 V436');
cell(rCk, 120, 420); const rLamp = lamp(rCk, 660, 450);
term(rCk, 340, 340); term(rCk, 440, 340); const rLev = lev(rCk);
tx(rCk, 88, 426, '+', { 'font-size': 26, 'text-anchor': 'end' });
mono(rCk, 390, 392, 'switch', { 'text-anchor': 'middle', 'font-weight': 600 }); mono(rCk, 610, 456, 'lamp', { 'text-anchor': 'end', 'font-weight': 600 });
const rCkS = mono(rCk, 724, 300, '', { 'text-anchor': 'end', 'font-weight': 600 });
const eR = flow(rCk, [[120, 436], [120, 540], [660, 540], [660, 340], [120, 340], [120, 420]], 18, { skip: (x, y) => (Math.hypot(x - 660, y - 450) < 34) || (x > 344 && x < 436 && y < 346) });
/* big SPDT: one pole, two throws, two lamps */
const rSp = mk(rS, 'g');
W(rSp, 'M70,320 H200'); term(rSp, 200, 320, 9); const t1 = term(rSp, 480, 200, 9), t2 = term(rSp, 480, 440, 9);
W(rSp, 'M489,200 H600'); W(rSp, 'M489,440 H600'); const lpA = lamp(rSp, 630, 200, 28), lpB = lamp(rSp, 630, 440, 28); W(rSp, 'M658,200 H720 V560 H70 V320', { 'stroke-width': 3, stroke: '#B8BCC6' }); W(rSp, 'M658,440 H720', { 'stroke-width': 3, stroke: '#B8BCC6' });
const spLev = lev(rSp, 7);
const spPole = mk(rSp, 'g'); mk(spPole, 'rect', { x: 120, y: 236, width: 150, height: 40, rx: 10, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); tx(spPole, 195, 264, 'POLE', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 22, fill: GD });
const spT = [mk(rSp, 'g'), mk(rSp, 'g')];
[[spT[0], 200], [spT[1], 440]].forEach(([g, y]) => { mk(g, 'rect', { x: 400, y: y - 72, width: 160, height: 40, rx: 10, fill: C.ac2, stroke: AM, 'stroke-width': 2 }); tx(g, 480, y - 44, y < 300 ? 'THROW 1' : 'THROW 2', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 22, fill: GD }); });
const syms = ['#y0', '#y1', '#y2', '#y3'].map(s => $(s));
const symSvg = syms.map(e => e.querySelector('svg'));
const symDraw = (g, kind) => {
  const sp1 = (y, open = true) => { W(g, `M30,${y} H100`, { 'stroke-width': 3.5 }); term(g, 106, y, 6); W(g, `M246,${y} H314`, { 'stroke-width': 3.5 }); term(g, 240, y, 6); W(g, `M106,${y} L232,${y - 26}`, { 'stroke-width': 4.5 }); };
  const dp1 = (y, d = 16) => { W(g, `M30,${y} H100`, { 'stroke-width': 3.5 }); term(g, 106, y, 6); [y - d, y + d].forEach(yy => { term(g, 240, yy, 6); W(g, `M246,${yy} H314`, { 'stroke-width': 3.5 }); }); W(g, `M106,${y} L232,${y - d}`, { 'stroke-width': 4.5 }); };
  if (kind === 0) sp1(92);
  if (kind === 1) dp1(90, 24);
  if (kind === 2) { sp1(74); sp1(116); W(g, 'M170,62 V104', { 'stroke-width': 2.5, 'stroke-dasharray': '6 5', stroke: MU }); }
  if (kind === 3) { dp1(70, 14); dp1(112, 14); W(g, 'M170,63 V105', { 'stroke-width': 2.5, 'stroke-dasharray': '6 5', stroke: MU }); }
};
symSvg.forEach((g, i) => symDraw(g, i));

/* ================= B: breadboard - stair light ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M300,176 V150 H400'), W(ck, 'M300,192 V250 H880 V150 H850'), W(ck, 'M790,150 H710'), W(ck, 'M470,110 H640'), W(ck, 'M470,190 H640')];
const bCell = cell(ck, 300, 176);
const bT = [term(ck, 400, 150), term(ck, 470, 110), term(ck, 470, 190), term(ck, 640, 110), term(ck, 640, 190), term(ck, 710, 150)];
const L1 = lev(ck), L2 = lev(ck);
const bLamp = lamp(ck, 820, 150);
const bLb = [tx(ck, 278, 172, '+', { 'font-size': 24, 'text-anchor': 'end' }), mono(ck, 278, 210, '5 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 22 }),
  mono(ck, 435, 84, 'S1', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(ck, 675, 84, 'S2', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }),
  mono(ck, 555, 100, 'upper wire', { 'text-anchor': 'middle', 'font-size': 16 }), mono(ck, 555, 180, 'lower wire', { 'text-anchor': 'middle', 'font-size': 16 }), mono(ck, 820, 106, 'lamp', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600 })];
const scR = mk(ck, 'rect', { x: 32, y: 300, width: 864, height: 268, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 300, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const scT = [mk(ck, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: '#C9D2E3', 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(ck, 'path', { fill: 'none', stroke: TE, 'stroke-width': 5, 'stroke-linejoin': 'round' })];
const scL = [mono(ck, 44, 352, 'S1 UP?', { fill: CH1, 'font-weight': 600, 'font-size': 16 }), mono(ck, 44, 438, 'S2 UP?', { fill: '#C9D2E3', 'font-weight': 600, 'font-size': 16 }), mono(ck, 44, 524, 'V LAMP', { fill: '#3FC1C1', 'font-weight': 600, 'font-size': 16 }), mono(ck, 884, 326, 'SCOPE · LAMP VOLTAGE 0 OR 5 V', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const evB = [[wt('B4', 'Both'), 1, 1], [wt('B5', 'Flip'), 1, 0], [wt('B6', 'Flip'), 0, 0], [wt('B7', 'Now'), 0, 1]];
const RO = [[1, 1], [1, 0], [0, 0], [0, 1]], tCyc0 = T0('B9') + 0.3, tCyc1 = tU - 0.4;
const swAt = t => { let a = 1, b = 1, k = -1; evB.forEach(([tt, x, y], i) => { if (t >= tt) { a = x; b = y; k = i; } }); if (t >= tCyc0 && t < tCyc1) { const q = RO[Math.floor((t - tCyc0) / 1.2) % 4]; a = q[0]; b = q[1]; } return { a, b, k }; };
const sigB = (tau, ch) => { if (tau < evB[0][0]) return -1; const { a, b } = swAt(tau); return ch === 0 ? a : ch === 1 ? b : (a === b ? 1 : 0); };
const lane = (p, f, ch, t, base, x0 = 110, x1 = 886, o48 = 40) => { let d = '', first = true; for (let i = 0; i <= 200; i++) { const tau = t - 8 + 8 * i / 200, v = f(tau, ch); if (v < 0) { first = true; continue; } const x = x0 + (x1 - x0) * i / 200, y = base - (o48 || 48) * v; d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y; first = false; } PUC.attr(p, 'd', d); };
const bPath = (a, b) => { const yb = b ? 110 : 190, ya = a ? 110 : 190; return [[300, 192], [300, 250], [880, 250], [880, 150], [710, 150], [640, yb], [470, ya], [400, 150], [300, 150], [300, 176]]; };
const bFlows = {}; [[1, 1], [0, 0]].forEach(([a, b]) => { bFlows[a + '' + b] = flow(ck, bPath(a, b), 26, { skip: (x, y) => Math.hypot(x - 820, y - 150) < 34 }); });
const ttB = $('#ttB'), TL = [40, 213, 386];
ttB.innerHTML = `<div class="tth" style="top:84px">${['S1', 'S2', 'LAMP'].map((s, i) => `<span style="left:${TL[i]}px">${s}</span>`).join('')}</div>` +
  RO.map((r, k) => `<div class="ttr" style="top:${136 + k * 74}px">${[r[0] ? 'UP' : 'DOWN', r[1] ? 'UP' : 'DOWN', r[0] === r[1] ? 'ON' : 'OFF'].map((v, i) => `<span style="left:${TL[i]}px${i === 2 ? ';color:' + (v === 'ON' ? AM : INK) : ''}">${v}</span>`).join('')}</div>`).join('');
const ttHead = ttB.querySelector('.tth'), ttRows = [...ttB.querySelectorAll('.ttr')];

/* ================= U: relay ================= */
const rl = $('#rlS');
const uCtl = [W(rl, 'M90,196 V140 H180'), W(rl, 'M220,140 H302'), W(rl, 'M302,262 H90 V212')];
const uCell = cell(rl, 90, 196);
const uBtn = [term(rl, 180, 140, 6), term(rl, 220, 140, 6)], uBar = W(rl, '', { 'stroke-width': 5 });
const core = mk(rl, 'rect', { x: 306, y: 124, width: 48, height: 140, rx: 4, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 });
const wind = []; for (let y = 140; y <= 250; y += 12) wind.push(W(rl, `M300,${y} L360,${y + 7}`, { 'stroke-width': 3.5, stroke: GD }));
const pivot = mk(rl, 'path', { d: 'M248,124 L260,104 L272,124 Z', fill: INK });
const arm = W(rl, '', { 'stroke-width': 7 }), tip = mk(rl, 'circle', { r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3.5 });
const spring = W(rl, '', { 'stroke-width': 3, stroke: MU }), sAnch = W(rl, 'M450,52 H490', { 'stroke-width': 4 });
const ncBar = W(rl, 'M548,76 H600', { 'stroke-width': 6 }), noBar = W(rl, 'M548,136 H600', { 'stroke-width': 6 });
const uLoad = [W(rl, 'M260,112 V40 H880 V160'), W(rl, 'M880,176 V280 H700 V232'), W(rl, 'M700,168 V136 H600')];
const uSup = cell(rl, 880, 160, 52);
const pump = mk(rl, 'circle', { cx: 700, cy: 200, r: 32, fill: '#fff', stroke: INK, 'stroke-width': 4 }), pumpM = tx(rl, 700, 210, 'M', { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 700 });
const uLb = { coil: mono(rl, 366, 210, 'coil', { 'font-weight': 600 }), arm: mono(rl, 380, 76, 'armature', { 'font-weight': 600, 'text-anchor': 'middle' }), spr: mono(rl, 500, 60, 'spring', { 'font-size': 16 }),
  com: mono(rl, 250, 80, 'COM', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), nc: mono(rl, 610, 82, 'NC', { fill: INK, 'font-weight': 600 }), no: mono(rl, 574, 166, 'NO', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), _x: mono(rl, 0, 0, '', { fill: INK, 'font-weight': 600 }),
  btn: mono(rl, 200, 170, 'button', { 'text-anchor': 'middle', 'font-size': 16 }), v1: mono(rl, 64, 210, '5 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 }), v2: mono(rl, 846, 178, '12 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 }), pmp: mono(rl, 680, 262, 'pump', { 'text-anchor': 'end', 'font-weight': 600 }) };
const uScR = mk(rl, 'rect', { x: 32, y: 320, width: 864, height: 248, rx: 8, fill: '#16213E' });
const uScG = [...Array(7)].map((_, i) => mk(rl, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 320, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const uScT = [mk(rl, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' }), mk(rl, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linejoin': 'round' })];
const uScL = [mono(rl, 44, 346, 'CH1 COIL V', { fill: CH1, 'font-weight': 600, 'font-size': 16 }), mono(rl, 44, 466, 'CH2 PUMP V', { fill: AM, 'font-weight': 600, 'font-size': 16 }), mono(rl, 884, 346, 'SLOW-MOTION VIEW', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' })];
const tOn1 = wt('U5', 'Current'), tOff = T0('U8'), tOn2 = wt('U9', 'on'), DLY = 0.45;
const coilAt = t => (t >= tOn1 && t < tOff) || t >= tOn2 ? 1 : 0;
const armAt = t => coilAt(t - DLY) && coilAt(t) ? 1 : 0;
const sigU = (tau, ch) => tau < tOff - 6 ? -1 : (ch === 0 ? coilAt(tau) : armAt(tau));
const eCtl = flow(rl, [[90, 212], [90, 262], [302, 262], [302, 140], [90, 140], [90, 196]], 8, { skip: (x, y) => x > 296 && y > 132 && y < 266 });
const eLoad = flow(rl, [[880, 176], [880, 280], [700, 280], [700, 136], [548, 136], [540, 126], [260, 112], [260, 40], [880, 40], [880, 160]], 34, { skip: (x, y) => Math.hypot(x - 700, y - 200) < 36 });
const tiles = ['#t0', '#t1', '#t2'].map(s => $(s));
[['bell', 0], ['shield', 1], ['door', 2]].forEach(([ic, i]) => tiles[i].querySelector('.ic').innerHTML = M.icon(ic, 34, INK, 2.2));

/* ================= C: connectors + ratings ================= */
const cS = $('#cS');
const board = mk(cS, 'rect', { x: 60, y: 262, width: 664, height: 36, rx: 6, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 });
const boardL = mono(cS, 72, 286, 'BOARD', { 'font-size': 16, 'font-weight': 600 });
const pins = [...Array(6)].map((_, i) => W(cS, `M${232 + i * 64},150 V308`, { stroke: GD, 'stroke-width': 7, 'stroke-linecap': 'butt' }));
const pBase = mk(cS, 'rect', { x: 200, y: 232, width: 384, height: 30, rx: 4, fill: INK });
const hous = mk(cS, 'g'); mk(hous, 'rect', { x: 196, y: 124, width: 392, height: 84, rx: 8, fill: '#3A4560' });
[...Array(6)].forEach((_, i) => { mk(hous, 'rect', { x: 222 + i * 64, y: 188, width: 20, height: 20, fill: '#16213E' }); W(hous, `M${232 + i * 64},124 V64`, { 'stroke-width': 4, stroke: [AM, INK, TE, VI, AM, INK][i] }); });
const housL = mono(cS, 604, 160, 'socket', { 'font-weight': 600 }), pinsL = mono(cS, 604, 252, 'pins', { 'font-weight': 600 });
const dim = [W(cS, 'M232,312 V334', { 'stroke-width': 2, stroke: GD }), W(cS, 'M296,312 V334', { 'stroke-width': 2, stroke: GD }), W(cS, 'M232,326 H296', { 'stroke-width': 2.5, stroke: GD })];
const dimL = mono(cS, 312, 334, '2.54 mm between pins', { fill: GD, 'font-weight': 600, 'font-size': 20 });
const ctl = ['#c0', '#c1', '#c2'].map(s => $(s)), cg = ctl.map(e => e.querySelector('svg'));
mk(cg[0], 'rect', { x: 40, y: 92, width: 144, height: 22, rx: 3, fill: INK }); for (let i = 0; i < 5; i++) W(cg[0], `M${56 + i * 28},40 V146`, { stroke: GD, 'stroke-width': 6, 'stroke-linecap': 'butt' });
mk(cg[1], 'rect', { x: 46, y: 46, width: 132, height: 92, rx: 8, fill: '#C9D2E3', stroke: INK, 'stroke-width': 3 });
[80, 144].forEach(x => { mk(cg[1], 'circle', { cx: x, cy: 78, r: 17, fill: '#fff', stroke: INK, 'stroke-width': 3 }); W(cg[1], `M${x - 10},${88} L${x + 10},${68}`, { 'stroke-width': 3 }); mk(cg[1], 'rect', { x: x - 12, y: 108, width: 24, height: 20, rx: 3, fill: INK }); W(cg[1], `M${x},128 V156`, { stroke: GD, 'stroke-width': 6 }); });
mk(cg[2], 'rect', { x: 26, y: 50, width: 76, height: 92, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }); [80, 112].forEach(y => mk(cg[2], 'rect', { x: 40, y: y - 6, width: 26, height: 12, rx: 3, fill: INK }));
const plug = mk(cg[2], 'g'); mk(plug, 'rect', { x: 128, y: 64, width: 60, height: 64, rx: 10, fill: '#3A4560' }); [80, 112].forEach(y => W(plug, `M128,${y} H104`, { stroke: GD, 'stroke-width': 7, 'stroke-linecap': 'butt' })); W(plug, 'M188,96 H214', { 'stroke-width': 8 });

/* ================= W: worked example ================= */
const wS = $('#wS');
const wCoil = [W(wS, 'M90,160 V100 H360 V120'), W(wS, 'M360,220 V240 H90 V176')];
const wCell = cell(wS, 90, 160);
const wBox = [mk(wS, 'rect', { x: 336, y: 120, width: 48, height: 100, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(wS, 'M336,220 L384,120', { 'stroke-width': 3 })];
const wLink = W(wS, 'M384,170 H572', { 'stroke-width': 2.5, stroke: MU, 'stroke-dasharray': '8 6' });
const wLoad = [W(wS, 'M560,200 V240 H740 V214'), W(wS, 'M740,130 V100 H712'), W(wS, 'M668,100 H560 V140')];
const wSw = [term(wS, 560, 140, 6), term(wS, 560, 200, 6), W(wS, 'M560,200 L586,148', { 'stroke-width': 5 })];
const wSrc = [mk(wS, 'circle', { cx: 690, cy: 100, r: 22, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(wS, 'M676,100 C682,86 688,86 690,100 S698,114 704,100', { 'stroke-width': 3 })];
const wHt = W(wS, 'M740,130 L726,140 L754,152 L726,164 L754,176 L726,188 L754,200 L740,214');
const wLb = [mono(wS, 74, 174, '12 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 }), mono(wS, 326, 176, '400 Ω', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), mono(wS, 360, 266, 'coil', { 'text-anchor': 'middle', 'font-size': 18 }),
  mono(wS, 540, 84, 'contacts', { 'font-size': 18 }), mono(wS, 690, 64, '230 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 18 }), mono(wS, 740, 272, 'heater', { 'text-anchor': 'end', 'font-size': 18 })];
const wIa = PUC.arrow(wS, VI, 4, 14), wIaL = mono(wS, 210, 84, 'I = 30 mA', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600 });
const wGl = mono(wS, 36, 318, 'HEATER CURRENT AGAINST THE CONTACT RATING', { 'font-size': 16, 'font-weight': 600 });
const wGb = mk(wS, 'rect', { x: 36, y: 332, width: 640, height: 30, rx: 15, fill: SOFT }), wGf = mk(wS, 'rect', { x: 36, y: 332, width: 0, height: 30, rx: 15, fill: VI });
const wGm = W(wS, 'M676,322 V372', { 'stroke-width': 3, stroke: C.red }), wGmL = mono(wS, 690, 354, '10 A', { fill: C.red, 'font-weight': 600 });
const wGv = mono(wS, 36, 400, '6.5 A', { fill: VI, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'middle' });
const wRows = rows($('#wSteps'), [
  [K(`${Iv} = \\dfrac{${Vv}}{${Rv}} = \\dfrac{12}{400}`), 'coil', 84],
  [K(`${Iv} = 0.03\\,\\text{A} = 30\\,\\text{mA}`), '', 190],
  [K(`${Pv} = ${Vv}${Iv} = 12 \\times 0.03 = 0.36\\,\\text{W}`), '', 284],
  [K(`${c(VI, 'I_h')} = \\dfrac{${Pv}}{${Vv}} = \\dfrac{1500}{230} \\approx 6.5\\,\\text{A}`), 'heater', 370],
  [K(`6.5\\,\\text{A} < 10\\,\\text{A}`), 'safe to switch', 484]]);
const tWR = [wt('W2', 'Coil'), T0('W3'), T0('W4'), T0('W6'), T0('W7')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'NO = open while the relay is ON', right: 'NO = open while the coil has no current', y0: 96, y1: 184 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Symbols of switch types; how a relay works, with a labelled diagram' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A 6 V relay coil has a resistance of 120 Ω. It runs from a 9 V supply through a series resistor. What resistor is needed?', qW: 780,
  opts: ['60 Ω', '180 Ω', '120 Ω', '40 Ω'], right: 0, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K(`${Iv} = \\dfrac{6}{120} = 0.05\\,\\text{A}`)], [K(`${c(TE, 'V_R')} = 9 - 6 = 3\\,\\text{V}`)], [K(`${Rv} = \\dfrac{3}{0.05} = 60${OM}`)]], { dy: 130, y0: 100 });
const tSol = [wt('A2', 'Coil'), wt('A3', 'resistor'), wt('A4', 'Three')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Switches, relays, connectors · fact card', txt: [1, 1, 1, 1, 1],
  lines: ['Pole = a separate circuit · Throw = a path per pole', 'Types: SPST · SPDT · DPST · DPDT', 'Relay: coil (electromagnet), armature, COM, NC, NO', 'NO closes only when the coil is energised', 'Ratings: maximum current and maximum voltage'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 59', topic: 'Cells and Batteries', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[wt('C5', 'Every') - 0.2, tT - 0.3], [tW + 0.2, tX - 0.3]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GW.find(([a, b]) => t >= a - 0.3 && t < b + 0.4); if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32, f1 = wt('H1', 'switches'), f2 = wt('H2', 'flips');
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#hC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    drawSeq([ceil, stairs, hid, drop], t, tMorph + 0.5, 0.5, 0.12); fadeAt([hBulb, hBase, hb1.g, hb2.g, ...hL], t, tMorph + 0.7, 0.06);
    const s1 = t >= f1 ? 1 : 0, s2 = t >= f2 ? 1 : 0, on = s1 !== s2;
    PUC.attr(hb1.k, 'y', s1 ? hb1.y - 26 : hb1.y); PUC.attr(hb2.k, 'y', s2 ? hb2.y : hb2.y - 26);
    PUC.attr(hBulb, 'fill', on ? AM : '#fff');
    M.vis(hQ, t, wt('H3', 'Two') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis(hQL, t, wt('H3', 'one') - 0.1, 1e9, { dy: 8 });
  }

  /* R: switch basics */
  const rOn = t >= tR - 0.05 && t < tB + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tB - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.setT($('#rLL'), t < tR4 - 0.1 ? 'A SWITCH IS A TAP FOR CURRENT' : 'ONE POLE, TWO THROWS');
    const basic = t < tR4 - 0.1;
    M.vis(rTap, t, tR + 0.2, tR4 - 0.3, { dy: 0, fade: 0.25, outDur: 0.25, ody: 0 }); M.vis(rCk, t, wt('R2', 'Open') - 0.3, tR4 - 0.3, { dy: 0, fade: 0.25, outDur: 0.25, ody: 0 });
    const tapOpen = t < wt('R2', 'Close') || (t >= wt('R3', 'makes') && t < wt('R3', 'breaks'));
    const swC = t < wt('R2', 'switch') + 0.2 || (t >= wt('R3', 'makes') && t < wt('R3', 'breaks'));
    PUC.attr(valve, 'height', tapOpen ? 10 : 52); PUC.attr(tapH, 'd', tapOpen ? 'M392,104 L392,80 L432,72' : 'M392,104 L392,80 L352,72');
    water.set(t * 90, tapOpen); M.setT(rTapS, tapOpen ? 'flowing' : 'stopped');
    setLev(rLev, 340, 340, swC ? 434 : 428, swC ? 340 : 300); eR.set(t * 80, swC && t >= wt('R2', 'Open') - 0.3); PUC.attr(rLamp, 'fill', swC ? AM : '#fff');
    M.setT(rCkS, swC ? 'closed · current flows' : 'open · no current'); PUC.attr(rCkS, 'fill', swC ? GD : MU);
    M.vis(rSp, t, tR4, 1e9, { dy: 0, fade: 0.25 });
    if (!basic) {
      const tg = T0('R6') + 0.6, up = t < tg ? true : Math.floor((t - tg) / 1.6) % 2 === 0;
      setLev(spLev, 200, 320, up ? 470 : 470, up ? 206 : 434); PUC.attr(lpA, 'fill', up ? AM : '#fff'); PUC.attr(lpB, 'fill', up ? '#fff' : AM);
      M.vis(spPole, t, wt('R5', 'pole') - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }); spT.forEach((g, i) => M.vis(g, t, wt('R6', 'throw') + i * 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }));
    }
    M.vis($('#dP'), t, wt('R5', 'pole') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#dT'), t, wt('R6', 'throw') - 0.1, 1e9, { dx: -16, dy: 0 });
    const ty = [T0('R7'), T0('R8'), T0('R9'), T0('R10')];
    syms.forEach((e, i) => { M.vis(e, t, ty[i] - 0.1, 1e9, { dy: 16 }); const hl = t >= ty[i] && t < (ty[i + 1] ?? tB - 0.4); e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT; });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tU + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tU - 0.32, { a, b, k } = swAt(t), live = k >= 0, on = live && a === b;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#tt'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    fadeAt([$('#tgA'), $('#tgB')], t, tB + 0.4, 0.1);
    [[$('#tgA'), a], [$('#tgB'), b]].forEach(([e, v]) => { e.querySelector('.tr i').style.transform = `translateY(${v ? 0 : 18}px)`; e.querySelector('.tr').style.background = v ? AM : '#CBD0DA'; M.setT(e.querySelector('.tv'), v ? 'UP' : 'DOWN'); });
    drawSeq(bw, t, tB + 0.4, 0.4, 0.1); fadeAt([...bCell, ...bT, bLamp, ...bLb], t, T0('B2'), 0.05);
    M.vis(L1, t, T0('B2') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(L2, t, T0('B2') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    setLev(L1, 400, 150, 464, a ? 114 : 186); setLev(L2, 710, 150, 646, b ? 114 : 186);
    PUC.attr(bLamp, 'fill', on ? AM : '#fff');
    Object.entries(bFlows).forEach(([key, F]) => F.set(t * 110, on && key === a + '' + b));
    [scR, ...scG].forEach(e => M.vis(e, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL, t, tB + 1.0, 0.08);
    lane(scT[0], sigB, 0, t, 384); lane(scT[1], sigB, 1, t, 470); lane(scT[2], sigB, 2, t, 556);
    M.vis(ttHead, t, tB + 0.6, 1e9, { dy: 10 });
    ttRows.forEach((r, i) => { const ti = evB[i][0]; M.vis(r, t, ti - 0.1, 1e9, { dy: 14 }); M.vis(r.lastChild, t, ti + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const cur = live && RO[i][0] === a && RO[i][1] === b; r.style.background = cur ? C.ac2 : SOFT; r.style.outline = cur ? `2.5px solid ${AM}` : 'none'; });
    M.vis($('#ttBox'), t, wt('B8', 'glows') - 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#ttW'), t, wt('B8', 'glows'), 1e9, { dy: 8 }); M.vis($('#ttW2'), t, wt('B8', 'same'), 1e9, { dy: 8 });
  }

  /* U: relay */
  const uOn = t >= tU - 0.05 && t < tC + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = tC - 0.32, coil = coilAt(t), ar = armAt(t), tU4 = tU + 0.5, tU6 = tU + 1.6, tU7 = tU + 2.2;
    M.vis($('#rl'), t, tU + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rr'), t, tU + 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq([...uCtl], t, tU4, 0.4, 0.1); fadeAt([...uCell, ...uBtn, uBar, core, ...wind, uLb.v1], t, tU4 + 0.3, 0.03); [[uLb.coil, wt('U4', 'coil')], [uLb.btn, wt('U2', 'pressing')], [uLb.arm, wt('U6', 'armature')], [uLb.spr, wt('U6', 'arm') + 0.3], [uLb.com, wt('U7', 'common')], [uLb.nc, wt('U8', 'closed')], [uLb.no, wt('U9', 'open')]].forEach(([e, a]) => M.vis(e, t, a - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    PUC.attr(uBar, 'd', coil ? 'M176,134 H224 M200,134 V112' : 'M176,118 H224 M200,118 V96');
    PUC.attr(core, 'fill', coil ? C.ac2 : '#E3E6EC'); PUC.attr(core, 'stroke', coil ? AM : INK);
    eCtl.set(t * 40, coil);
    fadeAt([pivot, arm, tip, spring, sAnch], t, tU6 - 0.1, 0.06);
    let av = 0; for (let q = 0; q < 6; q++) av += armAt(t - q * 0.03); const ty = M.lerp(84, 126, M.io(av / 6));
    const yAt = x => 112 + (ty - 112) * (x - 260) / 280;
    PUC.attr(arm, 'd', `M260,112 L540,${ty.toFixed(1)}`); PUC.attr(tip, 'cx', 540); PUC.attr(tip, 'cy', ty.toFixed(1));
    PUC.attr(spring, 'd', `M470,${yAt(470).toFixed(1)} ` + [...Array(8)].map((_, i) => `L${i % 2 ? 460 : 480},${(yAt(470) + (52 - yAt(470)) * (i + 1) / 9).toFixed(1)}`).join(' ') + ' L470,52');
    fadeAt([ncBar, noBar], t, tU7 + 0.1, 0.1);
    PUC.attr(ncBar, 'stroke', !ar && t >= T0('U8') ? AM : INK); PUC.attr(noBar, 'stroke', ar && t >= tOn2 ? AM : INK);
    drawSeq(uLoad, t, tU7 + 0.6, 0.4, 0.12); fadeAt([...uSup, pump, pumpM, uLb.v2, uLb.pmp], t, tU7 + 0.9, 0.05);
    const run = ar === 1; PUC.attr(pump, 'fill', run ? AM : '#fff'); eLoad.set(t * 170, run);
    [uScR, ...uScG].forEach(e => M.vis(e, t, T0('U8'), 1e9, { dy: 0, fade: 0.2 })); fadeAt(uScL, t, T0('U8') + 0.1, 0.08);
    lane(uScT[0], sigU, 0, t, 420, 120, 886); lane(uScT[1], sigU, 1, t, 540, 120, 886);
    const tt = [wt('U2', 'child'), wt('U3', 'guard'), wt('U3', 'opens')], tm = [tOn1, wt('U6', 'pulls'), wt('U11', 'pump')];
    tiles.forEach((e, i) => { M.vis(e, t, tt[i] - 0.2, 1e9, { dy: 16 }); M.vis(e.querySelector('.tn'), t, tm[i], 1e9, { dx: -12, dy: 0 }); const hl = t >= tm[i] && t < tm[i] + 3.2; e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT; });
    M.vis($('#uStrip'), t, wt('U12', 'never') - 0.2, 1e9, { dy: 24 });
  }

  /* C: connectors + ratings */
  const cOn = t >= tC - 0.05 && t < tT + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tT - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, wt('C2', 'So') - 0.2, out, { dx: 60, dy: 0, ...o }); M.setT($('#cRL'), t < wt('C5', 'Every') - 0.3 ? 'WHY PLUG IN?' : 'RATINGS PRINTED ON THE PART');
    const tw5 = wt('C5', 'Every') - 0.3; [[$('#wy0'), wt('C2', 'unplugged')], [$('#wy1'), wt('C2', 'replaced')], [$('#wy2'), wt('C2', 'seconds')]].forEach(([e, a]) => M.vis(e, t, a - 0.1, tw5, { dy: 16, outDur: 0.25 }));
    fadeAt([board, boardL, ...pins, pBase, pinsL], t, tC + 0.3, 0.05);
    const tu = wt('C2', 'unplugged'), tr = wt('C2', 'replaced');
    const lift = t < tu ? 1 - M.io((t - wt('C1', 'join')) / 0.6) : t < tr ? M.io((t - tu) / 0.5) : 1 - M.io((t - tr) / 0.5);
    M.vis(hous, t, tC + 0.5, 1e9, { dy: 0, fade: 0.2 }); hous.setAttribute('transform', `translate(0,${(-60 * M.clamp(lift)).toFixed(1)})`);
    M.vis(housL, t, tC + 0.6, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(housL, 'y', (160 - 60 * M.clamp(lift)).toFixed(1));
    const tc = [wt('C3', 'Pin'), wt('C3', 'screw'), wt('C3', 'plugs')];
    ctl.forEach((e, i) => M.vis(e, t, tc[i] - 0.15, 1e9, { dy: 16 }));
    plug.setAttribute('transform', `translate(${(24 * (1 - M.io((t - tc[2] - 0.4) / 0.5))).toFixed(1)},0)`);
    drawSeq(dim, t, wt('C4', 'two') - 0.2, 0.3, 0.08); M.vis(dimL, t, wt('C4', 'two'), 1e9, { dx: -10, dy: 0 });
    M.vis($('#plate'), t, wt('C5', 'Every'), 1e9, { dy: 16 });
    const r0 = wt('C6', 'current'), r1 = wt('C6', 'voltage');
    M.vis($('#rt0'), t, r0 - 0.2, 1e9, { dy: 16 }); M.vis($('#rt1'), t, r1 - 0.2, 1e9, { dy: 16 });
    [[$('#rt0'), r0], [$('#rt1'), r1]].forEach(([e, a], i) => { const hl = t >= a && t < (i ? tT - 0.3 : r1); e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT; });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'controls') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(wCoil, t, tW + 0.4, 0.4, 0.12); fadeAt([...wCell, ...wBox, wLb[0], wLb[1], wLb[2]], t, wt('W1', 'twelve') - 0.2, 0.06);
    const u = M.io((t - tWR[1]) / 0.4); wIa.set(150, 100, 150 + 120 * u, 100); M.vis(wIaL, t, tWR[1] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    drawSeq([wLink, ...wLoad, wHt], t, T0('W5') - 0.1, 0.35, 0.08); fadeAt([...wSw, ...wSrc, wLb[3], wLb[4], wLb[5]], t, T0('W5') + 0.2, 0.05);
    M.vis($('#wGiven'), t, wt('W5', 'ten') - 0.1, 1e9, { dy: 12 });
    fadeAt([wGl, wGb, wGm, wGmL], t, tWR[3] - 0.2, 0.06);
    const g = M.io((t - tWR[3] - 0.4) / 0.9) * 6.52 / 10; PUC.attr(wGf, 'width', (640 * g).toFixed(1)); M.hide(wGf, g <= 0.001);
    M.vis(wGv, t, tWR[3] + 1.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wGv, 'x', (36 + 640 * 0.652).toFixed(1));
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'Then') - 0.2 });
    M.vis($('#cs0'), t, wt('X3', 'Normal') - 0.1, 1e9, { dx: -14, dy: 0 }); M.vis($('#cs1'), t, wt('X4', 'energised') - 0.2, 1e9, { dx: -14, dy: 0 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
