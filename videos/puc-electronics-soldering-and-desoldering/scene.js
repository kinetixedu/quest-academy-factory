// PUC Electronics Ep 60 - Soldering and desoldering ("Breadboard" style, Lab Notebook world)
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
const RED = C.red, SIL = '#B8BCC6', CU = GD, Uv = c(GD, 'U'), tv = c(INK, 't');
Object.assign(M.IC, {
  stand: ['M3 21h18', 'M7 21l3-7', 'M17 21l-3-7', 'M4 11l13-5', 'M17 6l4-1.5', 'M8 14h8'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  glasses: ['M2 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M14 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M10 14h4', 'M2.5 12 5 5', 'M21.5 12 19 5'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'] });
const tMorph = wt('H1', 'toy') - 0.2;
const tR = T0('R1'), tR7 = T0('R7'), tK = T0('K1'), tB = T0('B1'), tG = T0('G1'), tD = T0('D1'), tS = T0('S1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
/* shared joint drawing: board slab, pad, lead, cone (cone(g) sets size 0..1) */
const joint = (p, cx, y, w = 90, o = {}) => {
  const g = mk(p, 'g');
  const slab = mk(g, 'rect', { x: cx - (o.sw || 240), y, width: 2 * (o.sw || 240), height: 44, rx: 6, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 });
  const pad = mk(g, 'rect', { x: cx - w, y: y - 10, width: 2 * w, height: 10, fill: CU });
  const lead = W(g, `M${cx},${y - (o.lh || 200)} V${y + 64}`, { stroke: '#9AA0AC', 'stroke-width': 8, 'stroke-linecap': 'butt' });
  const cone = mk(g, 'path', { d: '', fill: SIL, stroke: INK, 'stroke-width': 3 });
  const hi = W(g, '', { stroke: '#fff', 'stroke-width': 4 });
  return { g, slab, pad, lead, cone, hi, set(s, shiny = true) { if (s <= 0.01) { PUC.attr(cone, 'd', ''); PUC.attr(hi, 'd', ''); return; } const ww = w * (0.5 + 0.5 * s), h = 72 * s; PUC.attr(cone, 'd', `M${cx - ww},${y - 10} Q${cx - ww * 0.25},${y - 10 - h * 0.35} ${cx},${y - 10 - h} Q${cx + ww * 0.25},${y - 10 - h * 0.35} ${cx + ww},${y - 10} Z`); PUC.attr(hi, 'd', shiny && s > 0.5 ? `M${cx - ww * 0.55},${y - 18} Q${cx - ww * 0.3},${y - 10 - h * 0.45} ${cx - 12},${y - 10 - h * 0.8}` : ''); } };
};

/* ================= A: hook ================= */
const hS = $('#hS');
const floor = W(hS, 'M36,252 H700', { 'stroke-width': 3, stroke: '#9AA0AC' }), wall = mk(hS, 'rect', { x: 700, y: 84, width: 30, height: 170, fill: '#D9DCE3', stroke: INK, 'stroke-width': 3 });
const carO = mk(hS, 'g'), car = mk(carO, 'g');
mk(car, 'rect', { x: 0, y: 176, width: 150, height: 48, rx: 12, fill: AM, stroke: INK, 'stroke-width': 3 }); mk(car, 'path', { d: 'M28,176 L46,140 H108 L126,176 Z', fill: '#fff', stroke: INK, 'stroke-width': 3 });
[36, 116].forEach(x => mk(car, 'circle', { cx: x, cy: 228, r: 20, fill: INK }));
const bump = mono(hS, 640, 120, 'bump!', { 'text-anchor': 'end', fill: RED, 'font-weight': 600, 'font-size': 22 });
const hBoard = mk(hS, 'g');
mk(hBoard, 'rect', { x: 36, y: 300, width: 520, height: 180, rx: 12, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 });
[[120, 360], [200, 360], [280, 360], [120, 420], [200, 420], [430, 390]].forEach(([x, y]) => mk(hBoard, 'circle', { cx: x, cy: y, r: 12, fill: CU }));
W(hBoard, 'M120,360 H280 M120,420 H200 V360', { stroke: CU, 'stroke-width': 6 });
const loose = W(hS, '', { stroke: RED, 'stroke-width': 6 });
const hL = [mono(hS, 430, 352, 'pad', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(hS, 740, 340, 'loose wire', { 'text-anchor': 'end', fill: RED, 'font-weight': 600 })];

/* ================= R: solder + flux ================= */
const rS = $('#rS');
const reel = [mk(rS, 'circle', { cx: 110, cy: 150, r: 56, fill: SIL, stroke: INK, 'stroke-width': 3 }), mk(rS, 'circle', { cx: 110, cy: 150, r: 18, fill: '#fff', stroke: INK, 'stroke-width': 3 }), W(rS, 'M166,150 C230,150 250,210 330,206', { stroke: '#9AA0AC', 'stroke-width': 6 })];
const rT1 = mono(rS, 200, 112, 'SOLDER WIRE', { fill: INK, 'font-weight': 600 }), rT2 = tx(rS, 360, 214, 'an alloy: a mix of metals', { 'font-weight': 500, 'font-size': 26 });
const barT = mk(rS, 'rect', { x: 36, y: 260, width: 0, height: 64, rx: 0, fill: '#C9D2E3' }), barL = mk(rS, 'rect', { x: 463, y: 260, width: 0, height: 64, fill: '#6B7280' });
const barTL = tx(rS, 60, 302, 'TIN 60%', { 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: INK }), barLL = tx(rS, 487, 302, 'LEAD 40%', { 'font-family': 'IBM Plex Mono', 'font-size': 26, fill: '#fff' });
const TX = v => 60 + (v - 150) / 100 * 664;
const ax = W(rS, `M60,480 H724`, { 'stroke-width': 3 }), axTk = [], axT = [150, 175, 200, 225, 250].map(v => { axTk.push(W(rS, `M${TX(v)},480 V490`, { 'stroke-width': 2.5 })); return mono(rS, TX(v), 516, v + ' °C', { 'text-anchor': 'middle', 'font-size': 18 }); });
const bandA = mk(rS, 'rect', { x: TX(183), y: 420, width: TX(190) - TX(183), height: 60, fill: AM }), bandAL = mono(rS, TX(190), 408, 'TIN LEAD 183 to 190 °C', { 'text-anchor': 'end', fill: GD, 'font-weight': 600, 'font-size': 18 });
const bandB = mk(rS, 'rect', { x: TX(217), y: 420, width: TX(220) - TX(217), height: 60, fill: '#5F7399' }), bandBL = mono(rS, TX(217), 386, 'LEAD FREE 217 to 220 °C', { fill: '#5F7399', 'font-weight': 600, 'font-size': 18 });
const axL = mono(rS, 60, 560, 'MELTING POINT', { 'font-size': 16, 'font-weight': 600 });
const r2 = $('#r2S');
const P1 = mk(r2, 'g'), JR = joint(P1, 392, 360, 92, { lh: 200 });
const body1 = mk(P1, 'rect', { x: 352, y: 96, width: 80, height: 70, rx: 12, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const trace1 = W(P1, 'M484,355 H700', { stroke: CU, 'stroke-width': 8 });
const eJ = flow(P1, [[392, 170], [392, 340], [480, 352], [700, 352]], 10, { fill: AM });
const p1L = [mono(P1, 300, 420, 'copper pad', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(P1, 470, 250, 'solder', { fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(P1, 450, 130, 'part', { fill: INK, 'font-weight': 600, 'font-size': 18 })];
const P2 = mk(r2, 'g');
const cuBar = mk(P2, 'rect', { x: 80, y: 340, width: 624, height: 60, rx: 6, fill: CU }), oxide = mk(P2, 'g');
mk(oxide, 'rect', { x: 80, y: 322, width: 624, height: 18, fill: '#5F4B2A' }); for (let i = 0; i < 26; i++) mk(oxide, 'circle', { cx: 92 + i * 24, cy: 331, r: 3, fill: '#8A7350' });
const drop = mk(P2, 'ellipse', { cx: 392, cy: 280, rx: 42, ry: 42, fill: SIL, stroke: INK, 'stroke-width': 3 });
const p2L = [mono(P2, 80, 440, 'COPPER', { 'font-weight': 600, 'font-size': 18, fill: GD }), mono(P2, 704, 312, 'oxide layer', { 'text-anchor': 'end', 'font-weight': 600, 'font-size': 18, fill: '#5F4B2A' })];
const dropL = mono(P2, 392, 200, 'solder beads up', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 20 });

/* ================= K: tools ================= */
const kS = $('#kS');
const coil = []; for (let i = 0; i < 7; i++) coil.push(mk(kS, 'ellipse', { cx: 220 + i * 30, cy: 300, rx: 14, ry: 56, fill: 'none', stroke: '#6B7280', 'stroke-width': 4 }));
const base = mk(kS, 'rect', { x: 120, y: 420, width: 380, height: 36, rx: 10, fill: INK }), legs = W(kS, 'M200,356 L170,420 M420,356 L450,420', { 'stroke-width': 5 });
const shaft = mk(kS, 'rect', { x: 150, y: 290, width: 230, height: 20, rx: 4, fill: '#9AA0AC', stroke: INK, 'stroke-width': 2.5 }), tipK = mk(kS, 'path', { d: 'M150,290 L92,300 L150,310 Z', fill: '#6B7280', stroke: INK, 'stroke-width': 2.5 });
const handle = mk(kS, 'rect', { x: 380, y: 276, width: 260, height: 48, rx: 22, fill: '#3A4560', stroke: INK, 'stroke-width': 3 }), cord = W(kS, 'M640,300 C700,300 700,380 740,380', { 'stroke-width': 5, stroke: '#3A4560' });
const tray = mk(kS, 'rect', { x: 540, y: 470, width: 196, height: 56, rx: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), sponge = mk(kS, 'rect', { x: 556, y: 456, width: 164, height: 40, rx: 8, fill: '#E9D8A6', stroke: INK, 'stroke-width': 2.5 });
const kL = { tip: mono(kS, 92, 270, 'hot tip', { fill: RED, 'font-weight': 600 }), stand: mono(kS, 120, 490, 'stand', { fill: INK, 'font-weight': 600 }), sp: mono(kS, 638, 560, 'damp sponge', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }) };
const kW = mk(kS, 'g'); mk(kW, 'rect', { x: 430, y: 120, width: 300, height: 92, rx: 14, fill: '#2A3758' }); tx(kW, 456, 154, 'IRON · 230 V', { 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: '#8FA3C8' }); tx(kW, 456, 194, '25 W', { 'font-family': 'IBM Plex Mono', 'font-size': 32, fill: '#fff' });
const kT = ['#k0', '#k1'].map(s => $(s)), kg = kT.map(e => mk(e.querySelector('svg'), 'g', { transform: 'translate(0,-26)' }));
mk(kg[0], 'rect', { x: 60, y: 82, width: 170, height: 40, rx: 10, fill: '#C9D2E3', stroke: INK, 'stroke-width': 3 }); mk(kg[0], 'path', { d: 'M60,92 L28,98 V106 L60,112 Z', fill: '#fff', stroke: INK, 'stroke-width': 3 }); W(kg[0], 'M230,102 H270 M270,86 V118', { 'stroke-width': 5 }); mk(kg[0], 'rect', { x: 120, y: 70, width: 24, height: 12, rx: 3, fill: AM });
mk(kg[1], 'circle', { cx: 90, cy: 100, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 3 }); mk(kg[1], 'circle', { cx: 90, cy: 100, r: 16, fill: SOFT, stroke: INK, 'stroke-width': 2 });
mk(kg[1], 'rect', { x: 130, y: 88, width: 140, height: 24, fill: CU }); for (let i = 0; i < 12; i++) W(kg[1], `M${134 + i * 11},88 l8,24`, { stroke: '#8A6015', 'stroke-width': 2 });

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const JB = joint(ck, 300, 232, 100, { lh: 160, sw: 240 });
const iron = mk(ck, 'g'); const ironS = W(iron, '', { stroke: '#6B7280', 'stroke-width': 18 }), ironT = mk(iron, 'path', { d: '', fill: '#6B7280', stroke: INK, 'stroke-width': 2.5 }), ironH = W(iron, '', { stroke: '#3A4560', 'stroke-width': 26 });
const wire = W(ck, '', { stroke: '#9AA0AC', 'stroke-width': 8 });
const bL = [mono(ck, 70, 176, 'iron', { fill: INK, 'font-weight': 600 }), mono(ck, 484, 80, 'solder wire', { fill: INK, 'font-weight': 600 }), mono(ck, 412, 306, 'pad + wire', { 'font-size': 18 })];
const tc0 = wt('B3', 'touch'), tFeed = wt('B5', 'feed'), tSOff = T0('B7'), tIOff = wt('B7', 'Then'), tTest = T0('B8');
const Tj = t => { const up = tt => 30 + 300 * (1 - Math.exp(-Math.max(0, tt - tc0) / 5)); if (t < tIOff + 0.2) return t < tc0 ? 30 : up(t); const T1v = up(tIOff + 0.2); return 30 + (T1v - 30) * Math.exp(-(t - tIOff - 0.2) / 3); };
const ironPos = t => { const a = M.io((t - tc0 + 0.6) / 0.6), b = M.io((t - tIOff) / 0.5); return a * (1 - b); };
const wirePos = t => { const a = M.io((t - tFeed + 0.4) / 0.4), b = M.io((t - tSOff) / 0.4); return a * (1 - b); };
const coneAt = t => M.clamp((t - tFeed) / 2.4);
const tst = mk(ck, 'g');
W(tst, 'M640,150 V100 H726 M754,100 H840 V152 M840,208 V262 H640 V166', { 'stroke-width': 3.5 });
cell(tst, 640, 150, 36); const tLamp = lamp(tst, 840, 180, 28), tJ = mk(tst, 'circle', { cx: 740, cy: 100, r: 14, fill: SIL, stroke: INK, 'stroke-width': 3 });
mono(tst, 740, 76, 'joint', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18, fill: INK }); mono(tst, 620, 162, '5 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 18 });
const scR = mk(ck, 'rect', { x: 32, y: 320, width: 864, height: 248, rx: 8, fill: '#16213E' });
const scG = [...Array(7)].map((_, i) => mk(ck, 'line', { x1: 32 + 864 * (i + 1) / 8, y1: 320, x2: 32 + 864 * (i + 1) / 8, y2: 568, stroke: '#2A3758', 'stroke-width': 1.5 }));
const scT = mk(ck, 'path', { fill: 'none', stroke: '#3FC1C1', 'stroke-width': 5, 'stroke-linejoin': 'round' });
const scL = [mono(ck, 44, 348, 'V LAMP', { fill: '#3FC1C1', 'font-weight': 600, 'font-size': 16 }), mono(ck, 884, 348, 'SCOPE · CONTINUITY TEST', { fill: '#8FA3C8', 'font-size': 15, 'text-anchor': 'end' }), mono(ck, 300, 548, 'BAD JOINT', { fill: '#D98C8C', 'font-weight': 600, 'font-size': 16, 'text-anchor': 'middle' }), mono(ck, 700, 548, 'GOOD JOINT', { fill: '#7FD1A0', 'font-weight': 600, 'font-size': 16, 'text-anchor': 'middle' })];
const tBad = T0('B9'), tGood = T0('B10');
const lampV = tau => tau < tBad - 0.3 ? -1 : tau < tGood ? ((Math.sin(tau * 9.1) + Math.sin(tau * 3.7 + 1)) > -0.2 ? 1 : 0) : 1;
$('#bSteps').innerHTML = ['Wipe and tin the tip', 'Touch pad and wire together', 'Wait for the melting point', 'Feed solder into the joint', 'Solder off, iron off, keep still'].map((s, i) => `<div class="st3" style="top:${334 + i * 46}px"><div class="n">${i + 1}</div><div>${s}</div></div>`).join('');
const bRows = [...$('#bSteps').children], tBR = [wt('B2', 'wipe'), tc0, T0('B4'), tFeed, tSOff];
const gS = $('#gS');
const gp = PUC.graph(gS, { x: 90, y: 180, w: 500, h: 300, xmax: 22, ymax: 350, yt: [100, 200, 300], xl: 'time', yl: 'T (°C)' });
const band = mk(gS, 'rect', { x: 90, y: gp.Y(190), width: 500, height: gp.Y(183) - gp.Y(190), fill: AM, opacity: 0.55 }); gS.insertBefore(band, gS.firstChild);
const bandL = mono(gS, 590, gp.Y(190) - 10, 'solder melts', { 'text-anchor': 'end', fill: GD, 'font-weight': 600, 'font-size': 18 });
const tCurve = gp.curve(RED, 5), tDot = gp.dot(RED, 9), tg0 = tc0 - 1.5;

/* ================= G: good / bad joints ================= */
const jS = ['#j0', '#j1', '#j2'].map(s => $(s)), jg = jS.map(e => e.querySelector('svg'));
const J0 = joint(jg[0], 256, 340, 90, { lh: 220, sw: 200 }); J0.set(1);
const J1 = joint(jg[1], 256, 340, 90, { lh: 220, sw: 200 }); mk(jg[1], 'circle', { cx: 256, cy: 262, r: 50, fill: '#9AA0AC', stroke: INK, 'stroke-width': 3 }); for (let i = 0; i < 9; i++) mk(jg[1], 'circle', { cx: 230 + (i % 3) * 24, cy: 240 + Math.floor(i / 3) * 22, r: 3.5, fill: '#6B7280' });
mono(jg[1], 256, 196, 'gap: no grip', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 });
const gB = mk(jg[2], 'g'); mk(gB, 'rect', { x: 56, y: 340, width: 400, height: 44, rx: 6, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 });
[156, 356].forEach(x => { mk(gB, 'rect', { x: x - 60, y: 330, width: 120, height: 10, fill: CU }); W(gB, `M${x},140 V404`, { stroke: '#9AA0AC', 'stroke-width': 8, 'stroke-linecap': 'butt' }); });
mk(gB, 'path', { d: 'M100,330 Q140,262 256,270 Q372,262 412,330 Z', fill: SIL, stroke: INK, 'stroke-width': 3 }); mono(gB, 256, 236, 'short circuit', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 });
jS.forEach((e, i) => e.querySelector('.mk').innerHTML = M.icon(i ? 'x' : 'check', 30, '#fff', 3));

/* ================= D: desoldering ================= */
const dS = $('#dS'), JD = joint(dS, 392, 470, 90, { lh: 170, sw: 260 });
const pump = mk(dS, 'g'); mk(pump, 'rect', { x: 352, y: 110, width: 80, height: 220, rx: 14, fill: '#C9D2E3', stroke: INK, 'stroke-width': 3 }); mk(pump, 'path', { d: 'M376,330 L384,400 H400 L408,330 Z', fill: '#fff', stroke: INK, 'stroke-width': 3 });
const pSpring = W(pump, '', { stroke: '#6B7280', 'stroke-width': 3 }), pRod = W(pump, '', { 'stroke-width': 6 }), pKnob = mk(pump, 'rect', { x: 366, y: 0, width: 52, height: 18, rx: 6, fill: INK });
const pBlob = mk(dS, 'circle', { cx: 392, cy: 0, r: 9, fill: SIL, stroke: INK, 'stroke-width': 2 });
const dIron = mk(dS, 'g'); W(dIron, 'M120,300 L330,452', { stroke: '#6B7280', 'stroke-width': 16 }); W(dIron, 'M60,256 L150,322', { stroke: '#3A4560', 'stroke-width': 26 });
const dL1 = [mono(dS, 450, 220, 'plunger + spring', { fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(dS, 420, 386, 'nozzle', { fill: INK, 'font-weight': 600, 'font-size': 18 })];
const tPress = wt('D2', 'Press'), tRel = wt('D2', 'release');
const d2 = $('#d2S'), JW = joint(d2, 392, 470, 90, { lh: 140, sw: 260 }); JW.set(1);
const braid = mk(d2, 'g'); const brR = mk(braid, 'rect', { x: 180, y: 420, width: 424, height: 26, fill: CU }); for (let i = 0; i < 38; i++) W(braid, `M${184 + i * 11},420 l8,26`, { stroke: '#8A6015', 'stroke-width': 2 });
const brS = mk(d2, 'rect', { x: 392, y: 420, width: 0, height: 26, fill: SIL, opacity: 0.92 });
const wIron = mk(d2, 'g'); W(wIron, 'M392,150 V408', { stroke: '#6B7280', 'stroke-width': 16 }); W(wIron, 'M392,70 V160', { stroke: '#3A4560', 'stroke-width': 26 });
const d2L = [mono(d2, 180, 404, 'copper braid', { fill: GD, 'font-weight': 600, 'font-size': 18 }), mono(d2, 604, 404, 'soaks up solder', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 18 })];

/* ================= S: safety ================= */
const sT = ['#s0', '#s1', '#s2', '#s3'].map(s => $(s));
['stand', 'wind', 'glasses', 'drop'].forEach((ic, i) => sT[i].querySelector('.ic').innerHTML = M.icon(ic, 56, INK, 2));

/* ================= W: worked example ================= */
const wS = $('#wS');
const wIr = [mk(wS, 'rect', { x: 210, y: 110, width: 420, height: 90, rx: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(wS, 'path', { d: 'M210,140 L120,155 L210,170 Z', fill: '#6B7280', stroke: INK, 'stroke-width': 3 })];
const wEl = W(wS, 'M270,155 L284,135 L304,175 L324,135 L344,175 L364,135 L384,175 L404,135 L424,175 L444,135 L464,175 L484,135 L498,155', { stroke: RED, 'stroke-width': 4 });
const wCord = W(wS, 'M630,155 H700 V240', { 'stroke-width': 4 }), wSrc = [mk(wS, 'circle', { cx: 700, cy: 260, r: 22, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(wS, 'M686,260 C692,246 698,246 700,260 S708,274 714,260', { 'stroke-width': 3 })];
const wLb = [mono(wS, 384, 230, 'heating element R', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 18 }), mono(wS, 670, 266, '230 V', { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 18 })];
$('#wro').innerHTML = [['P', GD, '25', 'W'], ['V', TE, '230', 'V'], ['I', VI, '0.11', 'A'], ['R', INK, '2116', 'Ω'], ['U', GD, '1500', 'J in 1 min']].map(([k, col, v, u]) => `<span class="k" style="color:${col}">${k}</span><span class="v" style="color:${col}">${v}</span><span class="u">${u}</span>`).join('');
const wro = [...$('#wro').children];
const wRows = rows($('#wSteps'), [
  [K(`${Iv} = \\dfrac{${Pv}}{${Vv}} = \\dfrac{25}{230} \\approx 0.11\\,\\text{A}`), '', 84],
  [K(`${Rv} = \\dfrac{${Vv}^2}{${Pv}}`), '', 190],
  [K(`${Rv} = \\dfrac{230^2}{25} = \\dfrac{52\\,900}{25}`), '', 290],
  [K(`${Rv} \\approx 2116${OM}`), '', 388],
  [K(`${Uv} = ${Pv}${tv} = 25 \\times 60 = 1500\\,\\text{J}`), 'in one minute', 484]]);
const tWR = [wt('W2', 'Current'), T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Melt solder on the tip, drip it on the joint', right: 'Heat pad and lead, feed solder to the joint', y0: 96, y1: 184 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Steps of soldering; role of flux; desoldering tools; good and bad joints' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 230 V soldering iron has a heating element of resistance 1058 Ω. What is its power rating?', qW: 780,
  opts: ['25 W', '50 W', '100 W', '0.22 W'], right: 1, optW: 474, optY: 330, optFs: 34 });
const sol = PUC.solution($('#so'), [[K(`${Pv} = \\dfrac{${Vv}^2}{${Rv}}`)], [K(`230^2 = 52\\,900`)], [K(`${Pv} = \\dfrac{52\\,900}{1058} = 50\\,\\text{W}`)]], { dy: 130, y0: 100 });
const tSol = [T0('A2'), T0('A3'), T0('A4')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 100, dy: 78, title: 'Soldering and desoldering · fact card', txt: [1, 1, 1, 1, 1],
  lines: ['Tin lead solder (60/40) melts at about 183 to 190 °C', 'Lead free (tin, silver, copper): about 217 to 220 °C', 'Flux removes the oxide, so solder flows and grips', 'Heat the joint, feed the solder · good joint = shiny cone', 'Desolder with a pump or wick · iron power P = V² / R'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 61', topic: 'Printed Circuit Boards (PCB)', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[wt('K2', 'Twenty') - 0.2, tB - 0.3], [tW + 0.2, tX - 0.3]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GW.find(([a, b]) => t >= a - 0.3 && t < b + 0.4); if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32, tb = wt('H1', 'bumps') + 0.2;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#hC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    fadeAt([floor, wall, carO], t, tMorph + 0.5, 0.06);
    const x = 40 + 510 * M.clamp((t - tMorph - 0.6) / (tb - tMorph - 0.6)) - (t > tb ? 14 * Math.exp(-(t - tb) * 4) * Math.abs(Math.sin((t - tb) * 12)) : 0);
    car.setAttribute('transform', `translate(${x.toFixed(1)},0)`);
    M.vis(bump, t, tb, tb + 1.4, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, outDur: 0.3, ody: 0 });
    M.vis(hBoard, t, T0('H2') - 0.1, 1e9, { dy: 16 }); fadeAt(hL, t, wt('H2', 'loose'), 0.15);
    const k = Math.sin(t * 3) * 14; PUC.attr(loose, 'd', `M740,420 C640,${420 + k} 540,${380 - k} ${470 + k * 0.4},${370 + k}`);
    M.vis(loose, t, wt('H2', 'wire') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#no1'), t, wt('H3', 'Tape') - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }); M.vis($('#no2'), t, wt('H3', 'Glue') - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
  }

  /* R: solder + flux */
  const rOn = t >= tR - 0.05 && t < tK + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tK - 0.32, part2 = t >= tR7 - 0.2;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    M.setT($('#rRL'), part2 ? 'FLUX CLEANS THE OXIDE' : 'A GLUE MADE OF METAL');
    fadeAt([...reel, rT1], t, wt('R1', 'solder') - 0.1, 0.08); M.vis(rT2, t, wt('R3', 'alloy') - 0.1, 1e9, { dx: -10, dy: 0 });
    const u = M.io((t - wt('R4', 'sixty') + 0.1) / 0.8), v = M.io((t - wt('R4', 'forty') + 0.1) / 0.6);
    PUC.attr(barT, 'width', (427 * u).toFixed(1)); M.hide(barT, u <= 0); PUC.attr(barL, 'width', (285 * v).toFixed(1)); M.hide(barL, v <= 0); M.vis(barTL, t, wt('R4', 'tin'), 1e9, { dy: 0, fade: 0.2 }); M.vis(barLL, t, wt('R4', 'lead'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt([ax, axL, ...axT, ...axTk], t, T0('R5') - 0.2, 0.04); M.vis(bandA, t, wt('R5', 'melts'), 1e9, { dy: 0, sc: 0.6, fade: 0.1 }); M.vis(bandAL, t, wt('R5', 'hundred') , 1e9, { dy: 8 });
    M.vis(bandB, t, wt('R6', 'higher'), 1e9, { dy: 0, sc: 0.6, fade: 0.1 }); M.vis(bandBL, t, wt('R6', 'About'), 1e9, { dy: 8 });
    M.vis(P1, t, tR + 0.3, tR7 - 0.3, { dy: 0, fade: 0.25, outDur: 0.25, ody: 0 });
    JR.set(M.io((t - wt('R1', 'melted')) / 0.9)); eJ.set(t * 60, t >= wt('R2', 'carries') - 0.2); fadeAt(p1L, t, wt('R1', 'solder', 1), 0.1);
    M.vis(P2, t, tR7, 1e9, { dy: 0, fade: 0.25 });
    const cl = M.io((t - wt('R9', 'cleans')) / 0.8), sp = M.io((t - wt('R9', 'flows')) / 0.8);
    oxide.style.opacity = (1 - cl).toFixed(3); M.hide(oxide, cl >= 1); M.setT(p2L[1], cl > 0.5 ? 'clean copper' : 'oxide layer');
    PUC.attr(drop, 'rx', (42 + 130 * sp).toFixed(1)); PUC.attr(drop, 'ry', (42 - 24 * sp).toFixed(1)); PUC.attr(drop, 'cy', (280 + 24 * sp).toFixed(1));
    M.vis(dropL, t, wt('R8', 'stick') - 0.2, 1e9, { dy: 8 }); M.setT(dropL, sp > 0.3 ? 'solder spreads and grips' : 'solder beads up'); PUC.attr(dropL, 'fill', sp > 0.3 ? C.ok : RED);
    M.vis($('#rStrip'), t, wt('R9', 'cleans') - 0.2, 1e9, { dy: 24 });
  }

  /* K: tools */
  const kOn = t >= tK - 0.05 && t < tB + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tB - 0.32;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([shaft, tipK, handle, cord], t, T0('K2') - 0.1, 0.08); PUC.attr(tipK, 'fill', t >= wt('K2', 'hot') ? RED : '#6B7280'); M.vis(kL.tip, t, wt('K2', 'tip'), 1e9, { dy: 8 });
    M.vis(kW, t, wt('K2', 'Twenty') - 0.1, 1e9, { dy: 12 }); M.vis($('#kTip'), t, wt('K2', 'hot') - 0.1, 1e9, { dy: 16 });
    fadeAt([...coil, base, legs, kL.stand], t, wt('K3', 'stand') - 0.2, 0.04); fadeAt([tray, sponge, kL.sp], t, wt('K3', 'sponge') - 0.2, 0.08);
    M.vis(kT[0], t, wt('K4', 'pump') - 0.2, 1e9, { dy: 16 }); M.vis(kT[1], t, wt('K4', 'wick') - 0.2, 1e9, { dy: 16 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32, T = Tj(t), test = t >= tTest - 0.2;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    M.setT($('#ckL'), test ? 'TEST THE JOINT' : 'ONE JOINT, STEP BY STEP');
    M.vis(JB.g, t, tB + 0.4, 1e9, { dy: 0, fade: 0.25 }); fadeAt(bL.slice(1), t, tB + 0.6, 0.08);
    PUC.attr(JB.pad, 'fill', M.mix(CU, RED, M.clamp((T - 30) / 300)));
    const ip = ironPos(t), tx0 = 286 - 70 * (1 - ip), ty0 = 214 - 60 * (1 - ip);
    PUC.attr(ironS, 'd', `M${tx0 - 26},${ty0 - 22} L${tx0 - 110},${ty0 - 92}`); PUC.attr(ironH, 'd', `M${tx0 - 110},${ty0 - 92} L${tx0 - 170},${ty0 - 142}`);
    PUC.attr(ironT, 'd', `M${tx0},${ty0} L${tx0 - 34},${ty0 - 16} L${tx0 - 18},${ty0 - 34} Z`); PUC.attr(ironT, 'fill', t >= wt('B2', 'add') ? SIL : '#6B7280');
    M.vis(iron, t, tc0 - 0.7, tIOff + 0.3, { dy: 0, fade: 0.25, outDur: 0.3, ody: 0 }); M.vis(bL[0], t, tc0 - 0.5, tIOff + 0.3, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    const wp = wirePos(t), melt = M.clamp((t - tFeed) / 2.4) * 40, fx = 318 + 70 * (1 - wp) + melt * 0.7, fy = 212 - 60 * (1 - wp) - melt * 0.6;
    PUC.attr(wire, 'd', `M${fx},${fy} L${fx + 150},${fy - 120}`); M.vis(wire, t, tB + 0.6, 1e9, { dy: 0, fade: 0.25 });
    JB.set(coneAt(t), t >= tSOff);
    bRows.forEach((r, i) => { M.vis(r, t, tBR[i] - 0.15, tTest - 0.3, { dx: -14, dy: 0, outDur: 0.25 }); r.style.color = t >= tBR[i] && t < (tBR[i + 1] ?? tTest) ? INK : MU; r.querySelector('.n').style.background = t >= tBR[i] && t < (tBR[i + 1] ?? tTest) ? C.ac2 : '#fff'; });
    M.vis(tst, t, tTest, 1e9, { dy: 0, fade: 0.25 });
    [scR, ...scG].forEach(e => M.vis(e, t, tTest + 0.2, 1e9, { dy: 0, fade: 0.2 })); fadeAt(scL.slice(0, 2), t, tTest + 0.3, 0.08); M.vis(scL[2], t, tBad + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(scL[3], t, tGood + 0.4, 1e9, { dy: 0, fade: 0.2 });
    let d = '', first = true; for (let i = 0; i <= 260; i++) { const tau = t - 8 + 8 * i / 260, v = lampV(tau); if (v < 0) { first = true; continue; } d += (first ? 'M' : 'L') + (110 + 776 * i / 260).toFixed(1) + ',' + (500 - 110 * v); first = false; } PUC.attr(scT, 'd', d);
    PUC.attr(scL[2], 'x', Math.max(150, 110 + 776 * (tBad - t + 8) / 8 + 120)); PUC.attr(scL[3], 'x', Math.min(820, 110 + 776 * (tGood - t + 8) / 8 + 120));
    const lv = lampV(t); PUC.attr(tLamp, 'fill', lv === 1 ? AM : '#fff'); PUC.attr(tJ, 'fill', t >= tGood ? SIL : '#9AA0AC');
    M.setT($('#tBig'), Math.round(T) + ' °C'); $('#tBig').style.color = M.mix(INK, RED, M.clamp((T - 30) / 250)); M.vis($('#tBig'), t, tB + 0.5, 1e9, { dy: 10 });
    const st = t < tc0 ? ['IRON AWAY', SOFT, MU] : t < tIOff ? (T < 190 ? ['HEATING', C.redBg, RED] : t < tFeed ? ['ABOVE MELTING POINT', C.ac2, GD] : ['SOLDER FLOWING', C.ac2, GD]) : ['COOLING · KEEP STILL', SOFT, INK];
    const sE = $('#tSt'); M.setT(sE, st[0]); sE.style.background = st[1]; sE.style.color = st[2]; M.vis(sE, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    tCurve(s => [s, Tj(tg0 + s)], 0, M.clamp(t - tg0, 0, 22)); tDot(M.clamp(t - tg0, 0, 22), Tj(t), t >= tg0);
    [gp.axes, ...gp.ticks].forEach(e => M.vis(e, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(band, t, T0('B4'), 1e9, { dy: 0, fade: 0.3 }); M.vis(bandL, t, T0('B4') + 0.2, 1e9, { dy: 0, fade: 0.2 });
  }

  /* G: joints */
  const gOn = t >= tG - 0.05 && t < tD + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tD - 0.32, tj = [T0('G2'), T0('G3'), T0('G4')];
    jS.forEach((e, i) => { M.vis(e, t, (i ? tj[i] : tG + 0.1) - 0.15, out, { dy: 36, ...o }); M.vis(e.querySelector('.mk'), t, tj[i] + 0.8, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
  }

  /* D: desoldering */
  const dOn = t >= tD - 0.05 && t < tS + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tS - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.3, out, { dx: 60, dy: 0, ...o });
    const press = M.io((t - tPress) / 0.4) * (1 - M.io((t - tRel) / 0.12)), ry = 110 - 60 * (1 - press);
    PUC.attr(pRod, 'd', `M392,${ry - 40} V${ry + 60}`); PUC.attr(pKnob, 'y', (ry - 58).toFixed(1));
    const sTop = ry + 60, n = 8; PUC.attr(pSpring, 'd', `M392,${sTop} ` + [...Array(n)].map((_, i) => `L${i % 2 ? 372 : 412},${(sTop + (320 - sTop) * (i + 1) / (n + 1)).toFixed(1)}`).join(' ') + ' L392,320');
    const suck = M.io((t - tRel) / 0.5); JD.set(1 - suck); PUC.attr(pBlob, 'cy', (440 - 200 * suck).toFixed(1)); M.hide(pBlob, suck <= 0.02 || suck >= 0.98);
    M.vis(dIron, t, wt('D2', 'Melt') - 0.2, wt('D3', 'straw'), { dy: 0, dx: -30, fade: 0.2, outDur: 0.3, odx: -30, ody: 0 }); fadeAt(dL1, t, tPress - 0.2, 0.1);
    M.vis(braid, t, wt('D4', 'copper') - 0.1, 1e9, { dy: -20 }); M.vis(wIron, t, wt('D4', 'joint') - 0.1, 1e9, { dy: -30 });
    const so = M.io((t - wt('D4', 'braid')) / 1.6); PUC.attr(brS, 'x', (392 - 150 * so).toFixed(1)); PUC.attr(brS, 'width', (300 * so).toFixed(1)); M.hide(brS, so <= 0); JW.set(1 - so);
    fadeAt(d2L, t, wt('D4', 'braid'), 0.2);
  }

  /* S: safety */
  const sOn = t >= tS - 0.05 && t < tT + 0.05; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = tT - 0.32, ts = [T0('S2'), T0('S3'), T0('S4'), T0('S5')];
    M.vis($('#sf'), t, tS + 0.1, out, { dy: 36, ...o });
    sT.forEach((e, i) => { M.vis(e, t, ts[i] - 0.15, 1e9, { dy: 16 }); const hl = t >= ts[i] && t < (ts[i + 1] ?? tT); e.style.borderColor = hl ? AM : SOFT; e.style.background = hl ? C.ac2 : SOFT; });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'not') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt([...wIr, wCord, ...wSrc, wLb[1]], t, tW + 0.4, 0.06); M.draw(wEl, t, wt('W1', 'rated'), 0.7); M.vis(wLb[0], t, wt('W1', 'rated') + 0.4, 1e9, { dy: 8 });
    const tr = [wt('W1', 'twenty'), wt('W1', 'two'), tWR[0] + 0.8, tWR[3] + 0.6, tWR[4] + 0.8];
    wro.forEach((e, i) => M.vis(e, t, tr[Math.floor(i / 3)], 1e9, { dy: 0, fade: 0.2 }));
    PUC.attr(wEl, 'stroke', t >= tWR[4] ? RED : INK);
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X4', 'Right') - 0.1 });
    M.vis($('#cs0'), t, wt('X3', 'joint') - 0.1, 1e9, { dx: -14, dy: 0 }); M.vis($('#cs1'), t, wt('X4', 'feed') - 0.1, 1e9, { dx: -14, dy: 0 });
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
