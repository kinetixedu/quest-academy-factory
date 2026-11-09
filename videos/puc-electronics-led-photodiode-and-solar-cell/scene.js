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
/* wavelength (nm) to an sRGB colour, darkened a little to read on white */
const wl2c = l => { let r = 0, g = 0, b = 0;
  if (l < 440) { r = (440 - l) / 60; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; } else if (l < 510) { g = 1; b = (510 - l) / 20; } else if (l < 580) { r = (l - 510) / 70; g = 1; } else if (l < 645) { r = 1; g = (645 - l) / 65; } else { r = 1; }
  const k = 0.86, h = v => Math.round(255 * Math.max(0, Math.min(1, v)) * k).toString(16).padStart(2, '0'); return '#' + h(r) + h(g) + h(b); };

/* ---------------- beats ---------------- */
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const tMorph = wt('H1', 'spots') - 0.2;
const tI = T0('I1'), tL = T0('L1'), tD = T0('D1'), tP = T0('P1'), tS = T0('S1'), tT = T0('T1'), tG = T0('G1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tG], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const RED = wl2c(620);

/* ================= A: hook - the solar lamp ================= */
const lmS = $('#lmS');
const sky = mk(lmS, 'rect', { x: 32, y: 76, width: 720, height: 376, rx: 14, fill: '#DCEBFA' });
const stars = [[120, 130], [210, 200], [560, 120], [650, 230], [300, 110], [480, 190]].map(([x, y]) => mk(lmS, 'circle', { cx: x, cy: y, r: 3, fill: '#fff' }));
const sun = mk(lmS, 'g'); mk(sun, 'circle', { cx: 150, cy: 170, r: 40, fill: '#F2B53A' });
[...Array(8)].forEach((_, k) => { const a = k * Math.PI / 4; mk(sun, 'path', { d: `M${150 + 52 * Math.cos(a)},${170 + 52 * Math.sin(a)} L${150 + 68 * Math.cos(a)},${170 + 68 * Math.sin(a)}`, stroke: '#F2B53A', 'stroke-width': 5, 'stroke-linecap': 'round' }); });
const moon = mk(lmS, 'path', { d: 'M640,130 A40,40 0 1 0 660,206 A32,32 0 1 1 640,130 Z', fill: '#F3EBD3' });
const ground = mk(lmS, 'rect', { x: 32, y: 412, width: 720, height: 40, fill: '#C9D3B8' });
const cone = mk(lmS, 'path', { d: 'M360,252 L424,252 L500,412 L284,412 Z', fill: '#FFE7A0' });
const post = mk(lmS, 'rect', { x: 382, y: 236, width: 20, height: 176, fill: INK });
const lHead = mk(lmS, 'rect', { x: 344, y: 200, width: 96, height: 40, rx: 6, fill: INK });
const lens = mk(lmS, 'rect', { x: 356, y: 238, width: 72, height: 16, rx: 4, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const panel = mk(lmS, 'path', { d: 'M332,196 L452,196 L438,166 L346,166 Z', fill: '#2A3758', stroke: INK, 'stroke-width': 3 });
const pGrid = W(lmS, 'M370,166 L366,196 M392,166 V196 M414,166 L418,196 M340,181 H446', { stroke: '#8FA3C8', 'stroke-width': 2 });
const sunRays = [photon(lmS, 210, 214, 328, 176, GD), photon(lmS, 236, 120, 350, 160, GD)];
const hDay = tx(lmS, 40, 512, 'DAY', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), hDayT = tx(lmS, 120, 512, 'sits in the sun', { 'font-size': 28 });
const hNt = tx(lmS, 40, 562, 'NIGHT', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: MU }), hNtT = tx(lmS, 120, 562, 'lights up by itself', { 'font-size': 28 });
const tDay = wt('H2', 'day'), tNight = wt('H3', 'night');

/* ================= I: diode + three light diodes ================= */
const iS = $('#iS');
const pBlk = mk(iS, 'rect', { x: 80, y: 90, width: 312, height: 170, fill: '#FBEFE3', stroke: INK, 'stroke-width': 3 });
const nBlk = mk(iS, 'rect', { x: 392, y: 90, width: 312, height: 170, fill: '#FDF3DC', stroke: INK, 'stroke-width': 3 });
const pL = tx(iS, 236, 290, 'p side', { 'text-anchor': 'middle', fill: OR }), nL = tx(iS, 548, 290, 'n side', { 'text-anchor': 'middle', fill: AM });
const holes = [...Array(8)].map((_, k) => mk(iS, 'circle', { cx: 120 + (k % 4) * 72, cy: 132 + Math.floor(k / 4) * 84, r: 11, fill: 'none', stroke: OR, 'stroke-width': 3.5 }));
const elecs = [...Array(8)].map((_, k) => mk(iS, 'circle', { cx: 448 + (k % 4) * 72, cy: 132 + Math.floor(k / 4) * 84, r: 10, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const iD = diode(iS, 392, 390, 0, 34, '', GD, 130);
const iA = mk(iS, 'g'); const iAr = PUC.arrow(iA, VI);
const iDL = [mono(iS, 230, 448, 'anode (p)', { 'text-anchor': 'middle' }), mono(iS, 556, 448, 'cathode (n)', { 'text-anchor': 'middle' })];
const iIL = tx(iS, 236, 350, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
$('#iZ').innerHTML = M.icon('arrowR', 32, AM, 2.6);
const tiles = ['#it0', '#it1', '#it2'].map(s => $(s));
const tS0 = tiles[0].querySelector('svg'), tS1 = tiles[1].querySelector('svg'), tS2 = tiles[2].querySelector('svg');
const tdA = diode(tS0, 74, 70, 0, 24, 'out', RED, 34); PUC.attr(tdA.tri, 'fill', RED);
const tdB = diode(tS1, 74, 70, 0, 24, 'in', GD, 34);
const scSym = (p, x, y, r = 34) => { const g = mk(p, 'g'); mk(g, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: INK, 'stroke-width': 4 });
  W(g, `M${x - 6},${y - 18} V${y + 18}`, { 'stroke-width': 4 }); W(g, `M${x + 6},${y - 10} V${y + 10}`, { 'stroke-width': 8 }); W(g, `M${x - 6 - r - 12},${y} H${x - r}`); W(g, `M${x + r},${y} H${x + r + 22}`);
  arr(g, x - 34, y - 58, x - 16, y - 36, GD); arr(g, x - 10, y - 64, x + 6, y - 40, GD); return g; };
scSym(tS2, 84, 74);

/* ================= L: slide + LED breadboard ================= */
const lS = $('#lS');
const bandT = mk(lS, 'rect', { x: 60, y: 110, width: 300, height: 40, rx: 8, fill: '#FDF3DC', stroke: AM, 'stroke-width': 3 });
const bandB = mk(lS, 'rect', { x: 424, y: 362, width: 300, height: 40, rx: 8, fill: '#FBEFE3', stroke: OR, 'stroke-width': 3 });
const bTL = mono(lS, 60, 96, 'HIGH ENERGY · ELECTRONS', { 'font-weight': 600 }), bBL = mono(lS, 724, 438, 'LOW ENERGY · HOLES', { 'font-weight': 600, 'text-anchor': 'end' });
const slide = W(lS, 'M360,130 C430,130 400,382 424,382', { 'stroke-width': 6, stroke: '#B8BCC6' });
const sE = [...Array(4)].map((_, k) => mk(lS, 'circle', { cx: 100 + k * 70, cy: 130, r: 11, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const sH = [...Array(4)].map((_, k) => mk(lS, 'circle', { cx: 470 + k * 70, cy: 382, r: 12, fill: '#fff', stroke: OR, 'stroke-width': 3.5 }));
const sMove = mk(lS, 'circle', { cx: 0, cy: 0, r: 11, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const sPh = photon(lS, 474, 350, 640, 210, RED, 9, 22, 4);
const sPhL = tx(lS, 652, 206, 'light', { fill: RED });
const slideP = slide; const slideLen = () => slideP.getTotalLength();
$('#lZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const lc = $('#lcS');
// loop: left x 120, right x 600, top y 110, bottom y 340; cell on the left, resistor on top, LED on the right
const lcW = [W(lc, 'M120,212 V110 H290'), W(lc, 'M450,110 H600 V196'), W(lc, 'M600,264 V340 H120 V248')];
const lcR = W(lc, 'M290,110 L302,94 L326,126 L350,94 L374,126 L398,94 L422,126 L438,110 H450');
const lcCell = cellV(lc, 120, 230);
const lcD = diode(lc, 600, 230, 90, 30, 'out', RED);
const lcLb = [tx(lc, 370, 162, 'R', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'middle' }), mono(lc, 670, 236, 'diode'), mono(lc, 52, 300, 'cell')];
const lcPlus = tx(lc, 66, 214, '+', { 'font-size': 30 }), lcPlus2 = tx(lc, 66, 272, '+', { 'font-size': 30 });
const lcRay = mk(lc, 'g'); [[640, 196, 700, 160], [646, 230, 716, 230], [640, 264, 700, 300]].forEach(([a, b, c2, d]) => photon(lcRay, a, b, c2, d, RED, 5, 14, 3).set(1));
const eL = flow(lc, [[120, 248], [120, 340], [600, 340], [600, 110], [120, 110], [120, 212]], 20, { skip: (x, y) => (Math.abs(x - 600) < 2 && y > 196 && y < 264) || (Math.abs(y - 110) < 2 && x > 286 && x < 454) });
$('#lRo').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="lI" style="color:${VI}">0.0</span><span class="u">mA</span>
  <span class="k n">LIGHT</span><span class="v" id="lLi">OFF</span><span class="u"></span>`;
const tFwd = wt('L6', 'Current'), tFlip = wt('L7', 'flip');
const avL = PUC.avatar($('#sL'), { x: 1008, y: 744, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Flip the cell and it goes dark!' });

/* ================= D: wavelength from the gap ================= */
const dS = $('#dS');
const dBB = mk(dS, 'rect', { x: 70, y: 280, width: 330, height: 36, rx: 8, fill: '#FBEFE3', stroke: OR, 'stroke-width': 3 });
const dBT = mk(dS, 'rect', { x: 70, y: 100, width: 330, height: 36, rx: 8, fill: '#FDF3DC', stroke: AM, 'stroke-width': 3 });
const dBr = W(dS, '', { stroke: GD, 'stroke-width': 3 }), dBrL = tx(dS, 0, 0, 'Eg', { fill: GD, 'font-style': 'italic', 'font-size': 30 });
const dPh = photon(dS, 520, 200, 730, 200, RED, 10, 30, 5);
const dLed = diode(dS, 600, 120, 0, 0.001); M.hide(dLed.o, true);
const spec = mk(dS, 'defs'), lg = mk(spec, 'linearGradient', { id: 'spg', x1: 0, x2: 1, y1: 0, y2: 0 });
for (let i = 0; i <= 10; i++) { const l = 380 + 37 * i; mk(lg, 'stop', { offset: (i / 10).toFixed(2), 'stop-color': wl2c(l) }); }
const sx = l => 70 + 640 * (l - 380) / 370;
const specR = mk(dS, 'rect', { x: 70, y: 336, width: 640, height: 28, rx: 6, fill: 'url(#spg)' });
const specL = [mono(dS, sx(400), 390, '400 nm', { 'text-anchor': 'middle' }), mono(dS, sx(700), 390, '700 nm', { 'text-anchor': 'middle' })];
const specMg = mk(dS, 'g'), specM = mk(specMg, 'path', { d: 'M0,0 L-10,-16 L10,-16 Z', fill: INK });
$('#dRo').innerHTML = `<span class="k" style="color:${GD}">E<sub>g</sub></span><span class="v" id="dE" style="color:${GD}">2.00</span><span class="u">eV</span>
  <span class="k">λ</span><span class="v" id="dLm">620</span><span class="u">nm</span>`;
const dRows = rows($('#dSteps'), [
  [K(`E = ${Eg}`), 'photon energy = the gap', 92],
  [K(`E = \\dfrac{h\\,c}{\\lambda}`), 'λ is the wavelength', 180],
  [K(`\\lambda = \\dfrac{h\\,c}{${Eg}}`), 'bigger gap, shorter λ', 296],
  [K(`\\lambda\\,(\\text{nm}) = \\dfrac{1240}{${Eg}\\,(\\text{eV})}`), 'shortcut', 412],
  [K(`${Eg} \\geq 1.8\\,\\text{eV}`), 'for visible light', 520]]);
const tDR = [wt('D2', 'energy'), wt('D3', 'h'), wt('D4', 'lambda'), wt('D5', 'twelve'), wt('D8b', 'least')];
const tG18 = wt('D6', 'One'), tG23 = wt('D7', 'Two'), tG30 = wt('D7', 'Three');
const EgNow = t => { let e = 2.0; e = M.lerp(e, 1.8, M.io((t - tG18) / 0.8)); e = M.lerp(e, 2.3, M.io((t - tG23) / 0.8)); e = M.lerp(e, 3.0, M.io((t - tG30) / 0.8)); return e; };
const tag9 = [wt('D9', 'heavily'), wt('D9', 'little'), wt('D9', 'fast'), wt('D9', 'long')];
const dTags = ['HEAVILY DOPED', 'LITTLE POWER', 'SWITCH FAST', 'LAST LONG'].map((s, i) => { const e = document.createElement('div'); e.className = 'tag'; e.textContent = s; e.style.top = '540px'; $('#dL').appendChild(e); return e; });

/* ================= P: photodiode breadboard + scope ================= */
const ck = $('#ckS');
// loop: x 200..700, y 130..420. cell on the left (+ at top), ammeter on top, photodiode on the right (cathode at the top = reverse bias), resistor at the bottom
const pw = [W(ck, 'M200,257 V130 H386'), W(ck, 'M454,130 H700 V241'), W(ck, 'M700,309 V420 H540'), W(ck, 'M400,420 H200 V293')];
const pR = W(ck, 'M540,420 L528,404 L516,436 L504,404 L492,436 L480,404 L468,436 L456,404 L444,436 L432,404 L420,436 L408,404 L400,420');
const pCell = cellV(ck, 200, 275);
const am = mk(ck, 'circle', { cx: 420, cy: 130, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), amT = tx(ck, 420, 140, 'A', { 'text-anchor': 'middle', fill: VI, 'font-size': 30, 'font-weight': 700 });
const pd = diode(ck, 700, 275, -90, 30, '', GD);
const lampC = mk(ck, 'circle', { cx: 846, cy: 262, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const lampLb = mono(ck, 846, 324, 'light', { 'text-anchor': 'middle' });
const pRays = [photon(ck, 812, 236, 748, 210, GD, 5, 14, 3), photon(ck, 810, 262, 742, 262, GD, 5, 14, 3), photon(ck, 812, 288, 748, 314, GD, 5, 14, 3)];
const pLb = [tx(ck, 146, 266, '+', { 'font-size': 30 }), mono(ck, 132, 316, 'cell'), tx(ck, 470, 476, 'R', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'middle' }), mono(ck, 680, 360, 'photodiode', { 'text-anchor': 'end' }), mono(ck, 420, 196, 'ammeter', { 'text-anchor': 'middle' })];
// junction inset (inside the loop)
const inset = mk(ck, 'g');
mk(inset, 'rect', { x: 286, y: 200, width: 320, height: 150, rx: 12, fill: '#F7F5EF', stroke: '#CBD0DA', 'stroke-width': 2 });
mk(inset, 'rect', { x: 306, y: 236, width: 140, height: 96, fill: '#FBEFE3' }); mk(inset, 'rect', { x: 446, y: 236, width: 140, height: 96, fill: '#FDF3DC' });
W(inset, 'M446,236 V332', { stroke: MU, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
mono(inset, 306, 226, 'AT THE JUNCTION', { 'font-size': 16, 'font-weight': 600 }); tx(inset, 330, 322, 'p', { fill: OR, 'font-size': 22 }); tx(inset, 562, 322, 'n', { fill: AM, 'font-size': 22 });
const jE = mk(inset, 'circle', { r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 }), jH = mk(inset, 'circle', { r: 10, fill: 'none', stroke: OR, 'stroke-width': 3.5 });
const jPh = photon(inset, 400, 210, 444, 272, GD, 4, 12, 2.5);
const tLv = [wt('P4', 'shine'), wt('P6', 'More'), wt('P6', 'current')];
const lvl = t => tLv.reduce((a, tt) => a + M.io((t - tt) / 0.4), 0);
const Iua = t => 0.01 + 20 * lvl(t);
const tPS = wt('P3', 'reverse');
const offP = t => { let s = 0; const dt = 0.05; for (let x = tPS; x < t; x += dt) s += (2 + 3.2 * Iua(x)) * Math.min(dt, t - x); return s; };
const eP = flow(ck, [[200, 293], [200, 420], [700, 420], [700, 130], [200, 130], [200, 257]], 26, {
  skip: (x, y) => (Math.abs(x - 700) < 2 && y > 241 && y < 309) || (Math.abs(y - 130) < 2 && x > 384 && x < 456) || (Math.abs(y - 420) < 2 && x > 398 && x < 542) });
const scS = $('#scS'), scG = mk(scS, 'g', { transform: 'translate(32,68)' });
const scp = scope(scG, 576, 208), trL = scp.tr(CH1), trI = scp.tr(VI);
scp.lab(12, 22, 'CH1 · LIGHT', CH1); scp.lab(12, 126, 'CH2 · CURRENT I', '#B9A2F2');
$('#ro1').innerHTML = `<span class="k n">LIGHT</span><span class="v" id="pLv">0</span><span class="u">of 3</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="pI" style="color:${VI}">0.01</span><span class="u">μA</span>
  <span class="k n">BIAS</span><span class="v" id="pB" style="font-size:30px">REVERSE</span><span class="u"></span>`;
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const pTx = [[T0('P2'), 'Light <span class="acc">knocks the door open.</span>'], [wt('P3', 'dark'), 'Reverse bias: <span class="acc">almost no dark current.</span>'], [wt('P4', 'frees'), 'Each photon <span class="acc">frees an electron and a hole.</span>'],
  [wt('P6', 'More'), 'More light, <span class="acc">more current.</span>'], [T0('P7b'), 'Tiny dark current, <span class="acc">easy to see the change.</span>'], [T0('P8'), 'Photon energy must be <span class="acc">at least E<sub>g</sub>.</span>'], [T0('P9'), 'Inside <span class="acc">remote receivers and light sensors.</span>']];

/* ================= S: solar cell ================= */
const s2 = $('#sS2');
const sRays = [[170, 60, 190, 148], [300, 54, 310, 148], [430, 60, 420, 148]].map(([a, b, c2, d]) => photon(s2, a, b, c2, d, GD, 6, 16, 3.5));
const sN = mk(s2, 'rect', { x: 110, y: 160, width: 420, height: 44, fill: '#FDF3DC', stroke: INK, 'stroke-width': 3 });
const sP = mk(s2, 'rect', { x: 110, y: 204, width: 420, height: 170, fill: '#FBEFE3', stroke: INK, 'stroke-width': 3 });
const sJ = W(s2, 'M110,204 H530', { stroke: MU, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
const sFing = [150, 270, 390, 500].map(x => mk(s2, 'rect', { x, y: 150, width: 18, height: 10, fill: INK }));
const sBack = mk(s2, 'rect', { x: 110, y: 374, width: 420, height: 14, fill: INK });
const sLbl = [tx(s2, 124, 192, 'n', { fill: AM, 'font-size': 24 }), tx(s2, 124, 360, 'p', { fill: OR, 'font-size': 24 }), mono(s2, 524, 226, 'junction', { 'text-anchor': 'end', 'font-size': 18 })];
const sWire = [W(s2, 'M509,155 V128 H660 V220'), W(s2, 'M660,340 V381 H530')];
const sLoad = W(s2, 'M660,220 L644,232 L676,248 L644,264 L676,280 L644,296 L676,312 L644,328 L660,340');
const sLoadL = mono(s2, 690, 286, 'load', {});
const sPairs = [[190, 280], [300, 300], [410, 276], [250, 330], [470, 320]].map(([x, y]) => ({ x, y, e: mk(s2, 'circle', { r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 }), h: mk(s2, 'circle', { r: 10, fill: 'none', stroke: OR, 'stroke-width': 3.5 }) }));
const eS = flow(s2, [[518, 128], [660, 128], [660, 381], [540, 381]], 9, { skip: (x, y) => Math.abs(x - 660) < 2 && y > 216 && y < 344 });
const tGen = wt('S4', 'Generation'), tSep = wt('S5', 'Separation'), tCol = wt('S6', 'Collection');
const sNB = document.createElement('div'); sNB.className = 'tag'; sNB.textContent = 'NO BATTERY'; sNB.style.cssText = 'right:32px;top:22px'; $('#sL2').appendChild(sNB);
const sg = $('#sG2');
const qd = mk(sg, 'rect', { x: 150, y: 130, width: 520, height: 240, fill: C.ac3 });
const qdL = mono(sg, 640, 166, 'FOURTH QUADRANT', { 'text-anchor': 'end', 'font-weight': 600, 'font-size': 18 });
const ax = [W(sg, 'M150,80 V380', { 'stroke-width': 2.5 }), W(sg, 'M90,130 H700', { 'stroke-width': 2.5 })];
const axL = [tx(sg, 706, 138, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 28 }), tx(sg, 164, 92, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 })];
const Ivc = v => -(1 - (Math.exp(v / 0.07) - 1) / (Math.exp(1 / 0.07) - 1));
const sCurve = W(sg, (() => { let d = ''; for (let i = 0; i <= 80; i++) { const v = i / 80; d += (i ? 'L' : 'M') + (150 + 460 * v).toFixed(1) + ',' + (130 - 220 * Ivc(v)).toFixed(1); } return d; })(), { stroke: VI, 'stroke-width': 5 });
const pVoc = mk(sg, 'circle', { cx: 610, cy: 130, r: 9, fill: TE }), pIsc = mk(sg, 'circle', { cx: 150, cy: 350, r: 9, fill: VI });
const lVoc = tx(sg, 610, 110, 'Voc', { fill: TE, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono' }), lIsc = tx(sg, 136, 358, 'Isc', { fill: VI, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono' });
const lVocT = mono(sg, 610, 92, 'open circuit', { 'text-anchor': 'middle', 'font-size': 16 }), lIscT = mono(sg, 136, 382, 'short circuit', { 'text-anchor': 'end', 'font-size': 16 });
$('#sf2t').innerHTML = `${K(`${Eg}`)} near 1.5 eV · silicon about 1.1 eV`;
const pills = [...$('#sPills').children];

/* ================= G: lamp payoff + worked example ================= */
const gS = $('#gS'), gG = mk(gS, 'g'), wG = mk(gS, 'g');
const box = (x, lab) => { const r = mk(gG, 'rect', { x, y: 150, width: 200, height: 150, rx: 14, fill: '#fff', stroke: INK, 'stroke-width': 3 }); const l = mono(gG, x + 100, 334, lab, { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 }); return [r, l]; };
const bx1 = box(44, 'SOLAR CELL'), bx2 = box(292, 'BATTERY'), bx3 = box(540, 'DIODE LAMP');
scSym(gG, 144, 240, 34);
const batO = mk(gG, 'rect', { x: 352, y: 186, width: 80, height: 90, rx: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }); mk(gG, 'rect', { x: 378, y: 176, width: 28, height: 10, fill: INK });
const batF = mk(gG, 'rect', { x: 358, y: 270, width: 68, height: 0, rx: 4, fill: '#7FC79A' });
const gD = diode(gG, 640, 236, 0, 26, 'out', GD, 30);
const gA = [arr(gG, 248, 225, 288, 225, INK, 4, 14), arr(gG, 496, 225, 536, 225, INK, 4, 14)];
const skyG = mk(gG, 'rect', { x: 44, y: 76, width: 696, height: 50, rx: 10, fill: '#DCEBFA' });
const skyT = mono(gG, 64, 108, 'DAY', { 'font-weight': 600, fill: INK });
const cvL = mono(gG, 44, 392, 'CELL VOLTAGE', { 'font-weight': 600, 'font-size': 18 });
const cvB0 = mk(gG, 'rect', { x: 220, y: 376, width: 520, height: 22, rx: 11, fill: C.soft }), cvB = mk(gG, 'rect', { x: 220, y: 376, width: 0, height: 22, rx: 11, fill: TE });
const tDusk = wt('G2', 'dusk'), tLit = wt('G2', 'lights');
// worked example visual
const wD = diode(wG, 260, 200, 0, 50, 'out', RED, 80); PUC.attr(wD.tri, 'fill', RED);
const wPh = [photon(wG, 330, 150, 460, 90, RED, 7, 20, 4), photon(wG, 340, 196, 480, 196, RED, 7, 20, 4), photon(wG, 330, 246, 460, 306, RED, 7, 20, 4)];
const wLm = tx(wG, 500, 204, 'λ = 620 nm', { 'font-family': 'IBM Plex Mono', 'font-size': 28 });
$('#wRo').innerHTML = `<span class="k">λ</span><span class="v">620</span><span class="u">nm</span>
  <span class="k" style="color:${GD}">E<sub>g</sub></span><span class="v" id="wE" style="color:${GD}">?</span><span class="u">eV</span>
  <span class="k" style="color:${GD}">E</span><span class="v" id="wJ" style="color:${GD}">?</span><span class="u">J</span>`;
const gRows = rows($('#gSteps'), [
  ['<span class="tt">By day, the cell charges a battery</span>', '', 92], ['<span class="tt">At dusk, the cell voltage falls</span>', '', 196],
  ['<span class="tt">The circuit senses dark</span>', '', 300], ['<span class="tt">The diode lamp switches on</span>', '', 404]]);
const tGR = [wt('G1', 'solar'), wt('G2', 'voltage'), wt('G2', 'senses'), wt('G2', 'lights')];
const wRows = rows($('#wSteps'), [
  [K('\\lambda = 620\\,\\text{nm}'), 'given', 92],
  [K(`${Eg} = \\dfrac{1240}{\\lambda} = \\dfrac{1240}{620}`), '', 184],
  [K(`${Eg} = 2.0\\,\\text{eV}`), 'the gap', 304],
  [K(`E = 2.0 \\times 1.6\\times10^{-19}\\,\\text{J}`), '', 412],
  [K(`E = 3.2\\times10^{-19}\\,\\text{J}`), 'in joules', 500]]);
const tWR = [wt('W1', 'six'), wt('W3', 'twelve'), wt('W4', 'two'), wt('W4', 'joules'), wt('W4', 'three')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Every diode works in forward bias', right: 'Photodiode: reverse. Solar cell: no bias.', y0: 96, y1: 184 });
const BT = [['Light emitting diode', 'FORWARD', AM], ['Photodiode', 'REVERSE', VI], ['Solar cell', 'NO BIAS', INK], ['Solar cell junction', 'LARGE AREA', TE]];
$('#btab').innerHTML = BT.map(([a, b, col]) => `<div>${a}</div><div class="bb" style="background:${col}">${b}</div>`).join('');
const btEls = [...$('#btab').children];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS', 'ISC BOARDS'], type: 'JEE Main: statement questions on all three (24 Jan 2025, Shift 1) · Boards: explain each device with a diagram' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Light of wavelength 600&nbsp;nm falls on three photodiodes with band gaps 1.8&nbsp;eV, 2.2&nbsp;eV and 2.6&nbsp;eV. Which of them give a photocurrent?', qW: 780,
  opts: ['Only the 1.8 eV one', '1.8 eV and 2.2 eV', '2.2 eV and 2.6 eV', 'All three'], right: 0, optW: 474, optY: 330, optFs: 28 });
const sol = PUC.solution($('#so'), [[K('E = \\dfrac{1240}{600}\\,\\text{eV}')], [K('E \\approx 2.07\\,\\text{eV}')], [K(`\\text{needs}\\ E > ${Eg}`)], [K(`1.8 < 2.07 < 2.2`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'twelve'), wt('A2', 'About'), wt('A3', 'only'), wt('A4', 'Only')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 400, y: 236, w: 1120, h: 500, y0: 104, dy: 74, title: 'Light emitting diode, photodiode, solar cell · formula card', txt: [0, 1, 1, 1, 1],
  lines: [K(`${Eg} = h\\,c/\\lambda \\qquad \\lambda\\,(\\text{nm}) = 1240 / ${Eg}\\,(\\text{eV})`),
    `Light emitting diode: forward bias · visible needs ${K(`${Eg} \\geq 1.8\\,\\text{eV}`)}`, 'Photodiode: reverse bias, current grows with light', 'Solar cell: no bias, large area, I-V in 4th quadrant',
    'Best solar gap near 1.5 eV · silicon about 1.1 eV'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 47', topic: 'Clippers and clampers', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[T0('L4'), tD - 0.32], [tPS, tS - 0.32], [tW + 0.2, tX - 0.32]];

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
    const n = M.io((t - tNight + 0.3) / 0.7);
    PUC.attr(sky, 'fill', M.mix('#DCEBFA', '#1F2B4D', n)); PUC.attr(ground, 'fill', M.mix('#C9D3B8', '#3A4560', n));
    M.vis(sun, t, tMorph + 0.6, tNight - 0.3, { dy: 20, outDur: 0.5, ody: 40 }); M.vis(moon, t, tNight, 1e9, { dy: 20 });
    stars.forEach((s, i) => M.vis(s, t, tNight + 0.2 + i * 0.08, 1e9, { dy: 0, fade: 0.2 }));
    sunRays.forEach((r, i) => { const on = t >= tDay - 0.2 && t < tNight - 0.2; M.hide(r.g, !on); if (on) r.set(M.clamp((t - tDay + 0.2 - i * 0.25) / 0.6)); });
    const lit = M.io((t - tNight - 0.4) / 0.25); PUC.attr(lens, 'fill', M.mix('#FFFFFF', '#FFD34D', lit)); M.hide(cone, lit <= 0); cone.style.opacity = lit.toFixed(2);
    M.vis(hDay, t, tDay - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(hDayT, t, tDay, 1e9, { dy: 10 }); M.vis(hNt, t, tNight - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(hNtT, t, tNight + 0.1, 1e9, { dy: 10 });
    M.vis($('#hQ'), t, wt('H3', 'How') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I: three diodes */
  const iOn = t >= tI - 0.05 && t < tL + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tL - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    const t2 = wt('I2', 'diode');
    [pBlk, nBlk].forEach((e, i) => M.vis(e, t, t2 + i * 0.15, 1e9, { dy: 0, fade: 0.2 })); fadeAt([pL, nL], t, wt('I2', 'p'), 0.2);
    holes.forEach((e, i) => M.vis(e, t, wt('I2', 'p') + i * 0.04, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 })); elecs.forEach((e, i) => M.vis(e, t, wt('I2', 'n') + i * 0.04, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(iD.g, t, wt('I2', 'gate') - 0.2, 1e9, { dy: 0, fade: 0.2 }); fadeAt(iDL, t, wt('I2', 'gate'), 0.15);
    const ia = M.io((t - wt('I2', 'current')) / 0.5); iAr.set(180, 340, 180 + 420 * ia, 340); M.vis(iIL, t, wt('I2', 'current') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#iStrip'), t, wt('I2', 'current') + 0.3, 1e9, { dy: 24 });
    [T0('I3'), T0('I4'), T0('I5')].forEach((tt, i) => M.vis(tiles[i], t, tt, 1e9, { dy: 20 }));
    M.hide(tdA.ar, false); tdA.ar.style.opacity = (0.5 + 0.5 * Math.sin(6 * t)).toFixed(2);
  }

  /* L: slide + LED breadboard */
  const lOn = t >= tL - 0.05 && t < tD + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tD - 0.32;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, T0('L4') - 0.3, out, { dx: 60, dy: 0, ...o });
    $('#lL').style.left = (160 + 408 * (1 - M.io((t - T0('L4') + 0.6) / 0.5))).toFixed(1) + 'px';
    const tb = wt('L1', 'slide');
    [bandT, bTL].forEach(e => M.vis(e, t, tb - 0.4, 1e9, { dy: 0, fade: 0.2 })); [bandB, bBL].forEach(e => M.vis(e, t, tb + 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.draw(slide, t, tb, 0.6); M.vis($('#lE'), t, wt('L2', 'Holes'), 1e9, { dy: 0, fade: 0.2 });
    sE.forEach((e, i) => M.vis(e, t, wt('L2', 'Electrons') + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    // looping slide: one electron slides into the first hole, the hole fills, a photon leaves
    const tLoop = wt('L3', 'slides') - 0.4, P = 2.4, k = Math.floor((t - tLoop) / P), u = ((t - tLoop) % P) / P, lp = t >= tLoop;
    sH.forEach((e, i) => { M.vis(e, t, wt('L2', 'Holes') + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
    if (lp) { const L0 = slideLen(), uu = M.io(Math.min(1, u / 0.45)); const pt = slideP.getPointAtLength(L0 * uu);
      const fall = u < 0.45, at = fall ? pt : { x: 470, y: 382 };
      PUC.attr(sMove, 'cx', (u < 0.02 ? 310 : at.x).toFixed(1)); PUC.attr(sMove, 'cy', (u < 0.02 ? 130 : at.y).toFixed(1)); M.hide(sMove, u > 0.55);
      M.hide(sE[3], true); PUC.attr(sH[0], 'stroke', u > 0.45 && u < 0.6 ? AM : OR);
      const pu = M.clamp((u - 0.45) / 0.35); M.hide(sPh.g, u < 0.45); sPh.set(pu); M.vis(sPhL, t, tLoop + 0.45 * P + 0.4, 1e9, { dy: 0, fade: 0.2 });
    } else { M.hide(sMove, true); M.hide(sPh.g, true); M.hide(sPhL, true); }
    M.vis($('#lStrip'), t, wt('L3', 'light') - 0.1, 1e9, { dy: 24 });
    // breadboard
    const tc = wt('L4', 'breadboard') - 0.2, flip = t >= tFlip;
    drawSeq(lcW, t, tc, 0.4, 0.15); const cp = lcCell(flip); cp.forEach(e => M.vis(e, t, wt('L4', 'cell') - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.draw(lcR, t, wt('L4', 'resistor') - 0.2, 0.4); M.vis(lcD.g, t, wt('L4', 'diode') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(lcLb, t, wt('L4', 'diode'), 0.1); M.vis(lcPlus, t, wt('L5', 'plus') - 0.1, flip ? tFlip : 1e9, { dy: 0, fade: 0.2, outDur: 0.15, ody: 0 }); M.vis(lcPlus2, t, tFlip, 1e9, { dy: 0, fade: 0.2 });
    const on = t >= tFwd && !flip, lit = on ? M.io((t - wt('L6', 'glows')) / 0.25) : 0;
    PUC.attr(lcD.tri, 'fill', M.mix('#FFFFFF', RED, lit)); M.hide(lcD.ar, lit <= 0); M.hide(lcRay, lit <= 0); lcRay.style.opacity = lit.toFixed(2);
    eL.set(on ? 70 * (t - tFwd) : 0, t >= tFwd && t < tFlip + 0.6);
    M.vis($('#lBias'), t, wt('L5', 'Forward') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#lBias'), flip ? 'REVERSE BIAS' : 'FORWARD BIAS');
    $('#lBias').style.background = flip ? VI : INK;
    M.vis($('#lRo'), t, wt('L4', 'diode') + 0.2, 1e9, { dy: 12 }); M.setT($('#lI'), on ? '10.0' : '0.0'); M.setT($('#lLi'), lit > 0.5 ? 'ON' : 'OFF'); $('#lLi').style.color = lit > 0.5 ? RED : INK;
    avL(t, wt('L8', 'glows') - 0.4, out);
  }

  /* D: derivation + colour slider */
  const dOn = t >= tD - 0.05 && t < tP + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tP - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    const e = EgNow(t), lam = 1240 / e, col = wl2c(lam), gpx = 55 * e, yT = 280 - gpx;
    M.vis(dBB, t, tD + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(dBT, t, tD + 0.45, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(dBT, 'y', (yT - 36).toFixed(1));
    PUC.attr(dBr, 'd', `M420,${yT.toFixed(1)} H440 V280 H420`); M.draw(dBr, t, wt('D1', 'gap') - 0.2, 0.5); PUC.attr(dBrL, 'x', 452); PUC.attr(dBrL, 'y', (yT + gpx / 2 + 10).toFixed(1));
    M.vis(dBrL, t, wt('D1', 'gap'), 1e9, { dy: 0, fade: 0.2 });
    M.hide(dPh.g, t < tDR[0] - 0.2); dPh.set(M.clamp((t - tDR[0] + 0.2) / 0.6), col);
    M.vis(specR, t, wt('D3', 'wavelength') - 0.2, 1e9, { dy: 0, fade: 0.25 }); fadeAt(specL, t, wt('D3', 'wavelength'), 0.1);
    M.vis(specM, t, wt('D3', 'wavelength') + 0.2, 1e9, { dy: 0, fade: 0.2 }); specMg.setAttribute('transform', `translate(${sx(Math.min(750, Math.max(380, lam))).toFixed(1)},334)`);
    M.vis($('#dRo'), t, tD + 0.6, 1e9, { dy: 12 }); M.setT($('#dE'), e.toFixed(2)); M.setT($('#dLm'), Math.round(lam).toString()); $('#dLm').style.color = col;
    runRows(dRows, t, tDR); M.vis($('#dBox'), t, tDR[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    dTags.forEach((g, i) => { if (!g._x) { let x = 32; dTags.forEach(h => { h._x = x; h.style.left = x + 'px'; x += h.offsetWidth + 12; }); } M.vis(g, t, tag9[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); });
  }

  /* P: photodiode */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#ck'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc2'), t, tP + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tP + 0.45, out, { dy: 36, ...o });
    const tb = tP + 0.4;
    drawSeq(pw, t, tb, 0.4, 0.12); pCell(false).forEach(e => M.vis(e, t, tb + 0.2, 1e9, { dy: 0, fade: 0.2 })); M.draw(pR, t, tb + 0.5, 0.4);
    [am, amT].forEach(e => M.vis(e, t, tb + 0.4, 1e9, { dy: 0, fade: 0.2 })); M.vis(pd.g, t, wt('P1', 'photodiode') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(pLb, t, wt('P1', 'photodiode'), 0.08); [lampC, lampLb].forEach(e => M.vis(e, t, wt('P2', 'light') - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    const L = lvl(t); PUC.attr(lampC, 'fill', M.mix('#FFFFFF', '#FFD34D', L / 3));
    pRays.forEach((r, i) => { const on = L > i + 0.05; M.hide(r.g, !on); if (on) r.set(M.clamp(L - i)); });
    M.vis(inset, t, wt('P4', 'shine') - 0.1, 1e9, { dy: 0, fade: 0.25 });
    // a pair is made at the junction then pulled apart (loop)
    const tj = wt('P4', 'photon'), Pj = 1.6, uj = ((t - tj) % Pj) / Pj, jOn = t >= tj;
    M.hide(jPh.g, !jOn); M.hide(jE, !jOn); M.hide(jH, !jOn);
    if (jOn) { jPh.set(M.clamp(uj / 0.3)); jPh.g.style.opacity = uj < 0.8 ? '1' : ((1 - uj) / 0.2).toFixed(2); const sp = M.io((uj - 0.3) / 0.6), vis = uj > 0.28;
      M.hide(jE, !vis); M.hide(jH, !vis); PUC.attr(jE, 'cx', (452 + 110 * sp).toFixed(1)); PUC.attr(jE, 'cy', 286); PUC.attr(jH, 'cx', (440 - 110 * sp).toFixed(1)); PUC.attr(jH, 'cy', 286); }
    eP.set(offP(t), t >= tPS); M.vis($('#ckE'), t, tPS, 1e9, { dy: 0, fade: 0.2 });
    const pt = pTx.filter(([a]) => t >= a - 0.1).pop(); if (pt) setH($('#pTx'), pt[1]); M.vis($('#pStrip'), t, pTx[0][0] - 0.1, 1e9, { dy: 24 });
    M.vis(scS, t, tP + 0.4, 1e9, { dy: 0, fade: 0.2 });
    trL(x => 22 * lvl(x), t, tP + 0.6, 6, 92, t >= tP + 0.6); trI(x => 22 * lvl(x) + 0.6, t, tP + 0.6, 6, 196, t >= tP + 0.6);
    M.vis($('#ro1'), t, tP + 0.7, 1e9, { dy: 12 }); M.setT($('#pLv'), Math.round(L).toString()); M.setT($('#pI'), Iua(t) < 0.5 ? '0.01' : Iua(t).toFixed(1));
  }

  /* S: solar cell */
  const sOn = t >= tS - 0.05 && t < tT + 0.05; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = tT - 0.3;
    M.vis($('#sL2'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, T0('S7') - 0.3, out, { dx: 60, dy: 0, ...o });
    $('#sL2').style.left = (160 + 408 * (1 - M.io((t - T0('S7') + 0.6) / 0.5))).toFixed(1) + 'px';
    [sN, sP, sJ, ...sFing, sBack].forEach(e => M.vis(e, t, wt('S1', 'solar'), 1e9, { dy: 0, fade: 0.25 })); fadeAt(sLbl, t, wt('S1', 'cell'), 0.1);
    sRays.forEach((r, i) => { const t0 = wt('S2', 'sunlight') - 0.3 + i * 0.15; M.hide(r.g, t < t0); r.set(M.clamp((t - t0) / 0.5)); });
    drawSeq(sWire, t, wt('S3', 'source') - 0.3, 0.4, 0.15); M.draw(sLoad, t, wt('S3', 'source'), 0.4); M.vis(sLoadL, t, wt('S3', 'source') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(sNB, t, wt('S3', 'battery') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const sp = M.io((t - tSep - 0.2) / 0.8);
    sPairs.forEach((q, i) => { const on = t >= tGen + 0.2 + i * 0.15; M.hide(q.e, !on); M.hide(q.h, !on); if (!on) return;
      const ey = M.lerp(q.y, 182, sp), hy = M.lerp(q.y, 352, sp), cOn = t >= tCol + 0.2;
      PUC.attr(q.e, 'cx', q.x + 7); PUC.attr(q.e, 'cy', ey.toFixed(1)); PUC.attr(q.h, 'cx', q.x - 7); PUC.attr(q.h, 'cy', hy.toFixed(1)); q.e.style.opacity = cOn ? '0.35' : ''; });
    eS.set(55 * (t - tCol), t >= tCol + 0.2);
    pills.forEach((p, i) => { const ta = [tGen, tSep, tCol][i]; M.vis(p, t, ta - 0.15, 1e9, { dy: 12 }); const a = M.io((t - ta) / 0.25) * (1 - M.io((t - ([tSep, tCol, 1e9][i])) / 0.25) * 0.65);
      p.style.borderColor = M.mix(C.line, AM, a); p.querySelector('b').style.background = M.mix(C.soft, AM, a); p.querySelector('b').style.color = a > 0.5 ? '#fff' : INK; });
    // graph
    const tg = T0('S7');
    [...ax].forEach(e => M.draw(e, t, tg - 0.1, 0.4)); fadeAt(axL, t, tg + 0.2, 0.1);
    M.vis(qd, t, wt('S7', 'fourth') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(qdL, t, wt('S7', 'quadrant'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(sCurve, t, wt('S7', 'fourth') + 0.1, 1.0);
    [pVoc, lVoc, lVocT].forEach(e => M.vis(e, t, wt('S8', 'open') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 })); [pIsc, lIsc, lIscT].forEach(e => M.vis(e, t, wt('S9', 'short') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    M.vis($('#sf1'), t, T0('S10') + 0.1, 1e9, { dy: 16 }); M.vis($('#sf2'), t, T0('S11') + 0.1, 1e9, { dy: 16 });
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tG; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tG - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Power') - 0.05, { out: tG - 0.35, outDur: 0.25 }); }

  /* G: lamp payoff + worked example */
  const gOn = t >= tG - 0.05 && t < tX + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tX - 0.32, wOn = t >= tW;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gLL1'), t, tG + 0.3, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gLL2'), t, tW + 0.1, 1e9, { dy: 10 });
    M.vis($('#gRL1'), t, tG + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    M.vis(gG, t, tG + 0.4, tW - 0.3, { dy: 16, outDur: 0.25 });
    const dusk = M.io((t - tDusk) / 0.8); PUC.attr(skyG, 'fill', M.mix('#DCEBFA', '#1F2B4D', dusk)); PUC.attr(skyT, 'fill', dusk > 0.5 ? '#fff' : INK); M.setT(skyT, dusk > 0.5 ? 'DUSK' : 'DAY');
    PUC.attr(batF, 'height', (78 * M.io((t - tGR[0]) / 2.5)).toFixed(1)); PUC.attr(batF, 'y', (270 - 78 * M.io((t - tGR[0]) / 2.5)).toFixed(1));
    PUC.attr(cvB, 'width', (520 * M.lerp(0.85, 0.12, dusk) * M.io((t - tG - 0.5) / 0.6)).toFixed(1));
    const lit = M.io((t - tLit) / 0.25); PUC.attr(gD.tri, 'fill', M.mix('#FFFFFF', '#FFC233', lit)); M.hide(gD.ar, lit <= 0);
    gRows.forEach(r => M.hide(r, wOn)); if (!wOn) runRows(gRows, t, tGR, tW - 0.3);
    M.vis(wG, t, tW + 0.1, 1e9, { dy: 16 });
    wPh.forEach((p, i) => p.set(M.clamp((t - tW - 0.4 - i * 0.15) / 0.5))); M.vis(wLm, t, wt('W1', 'six'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wRo'), t, tW + 0.5, 1e9, { dy: 12 }); M.setT($('#wE'), t >= tWR[2] ? '2.0' : '?'); M.setT($('#wJ'), t >= tWR[4] ? '3.2 × 10⁻¹⁹' : '?');
    wRows.forEach(r => M.hide(r, !wOn)); if (wOn) runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[2] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Not') - 0.05, tRight: wt('X3', 'photodiode') - 0.2 });
    const tb = [wt('X3', 'Not'), wt('X3', 'photodiode'), wt('X3', 'solar'), wt('X4', 'wide')];
    btEls.forEach((e, i) => M.vis(e, t, tb[Math.floor(i / 2)] + (i % 2) * 0.15, 1e9, { dy: 0, sc: i % 2 ? 0.7 : 1, dx: i % 2 ? 0 : -12, sp: i % 2 ? M.POP : M.SOFT, fade: 0.12 }));
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'JEE'), wt('X6', 'PUC'), wt('X6', 'board')], tType: wt('X5b', 'example') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0, tF + 2.4], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
