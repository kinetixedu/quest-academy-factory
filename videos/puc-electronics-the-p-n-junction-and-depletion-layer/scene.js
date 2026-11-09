// PUC Electronics Ep 40 - The p-n junction and depletion layer ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, holes hollow orange, donor + ions amber ring, acceptor - ions orange ring, V0 teal, field E slate, energy gold, I violet
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, GO = '#B7791F', RED = '#D64545';
const CB_F = '#FFF4D6', VB_F = '#E3E6EC', CB_S = '#E8C77A', VB_S = '#B8BCC6';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const steps = (host, rows) => { host.innerHTML = rows.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => { e.querySelector('.n').textContent = i + 1; }); return r; };
const runSteps = (rows, t, ts, tout = 1e9) => rows.forEach((r, i) => { M.vis(r, t, ts[i] - 0.1, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6);
  const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
const dot = (p, x, y, r = 7) => mk(p, 'circle', { cx: x, cy: y, r, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const hole = (p, x, y, r = 7) => mk(p, 'circle', { cx: x, cy: y, r, fill: '#fff', stroke: OR, 'stroke-width': 3 });
const mv = (e, x, y) => { PUC.attr(e, 'cx', x.toFixed(1)); PUC.attr(e, 'cy', y.toFixed(1)); };
/* double-headed energy arrow (gold) */
const dArrow = (p, x, y1, y2, col = GO) => { const g = mk(p, 'g'); W(g, `M${x},${y1 + 4} V${y2 - 4}`, { stroke: col, 'stroke-width': 3.5 });
  mk(g, 'path', { d: `M${x},${y1} l-8,14 h16 Z`, fill: col }); mk(g, 'path', { d: `M${x},${y2} l-8,-14 h16 Z`, fill: col }); return g; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col }); e.textContent = s; return e; }
  };
};
const sub = (p, x, y, b, s, a = {}) => { const t = tx(p, x, y, b, { 'font-style': 'italic', ...a }); const q = mk(t, 'tspan', { dy: 6, 'font-size': (a['font-size'] || 24) * 0.62 }); q.textContent = s; return t; };
const FL = '#5F7399';
const ionP = (p, x, y, r = 13) => { const g = mk(p, 'g'); mk(g, 'circle', { cx: x, cy: y, r, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 }); W(g, `M${x - 6},${y} H${x + 6} M${x},${y - 6} V${y + 6}`, { stroke: '#8A5A00', 'stroke-width': 3 }); return g; };
const ionN = (p, x, y, r = 13) => { const g = mk(p, 'g'); mk(g, 'circle', { cx: x, cy: y, r, fill: '#FBE3CF', stroke: OR, 'stroke-width': 3 }); W(g, `M${x - 6},${y} H${x + 6}`, { stroke: '#9A4A0E', 'stroke-width': 3 }); return g; };
const fArrow = (p, x1, x2, y) => { const g = mk(p, 'g'); W(g, `M${x1},${y} H${x2 + 14}`, { stroke: FL, 'stroke-width': 3.5, 'stroke-dasharray': '10 7' }); mk(g, 'path', { d: `M${x2},${y} l16,-9 v18 Z`, fill: FL }); return g; };
const jig = (e, x, y, t, k, a = 3) => mv(e, x + a * Math.sin(t * 5.3 + k * 2.1), y + a * Math.cos(t * 4.7 + k * 1.3));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'opens') - 0.3;
const tR = T0('R1'), tJ = T0('J1'), tE = T0('E1'), tT = T0('T1'), tB = T0('B1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tB], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S');
const dio = (x, y, s) => [W(h1S, `M${x - 150 * s},${y} H${x + 150 * s}`, { 'stroke-width': 4, stroke: '#9AA0AC' }), mk(h1S, 'rect', { x: x - 70 * s, y: y - 26 * s, width: 140 * s, height: 52 * s, rx: 12 * s, fill: '#22283A' }), mk(h1S, 'rect', { x: x + 34 * s, y: y - 26 * s, width: 16 * s, height: 52 * s, fill: '#C9CDD6' })];
const D1 = dio(220, 70, 1), D2 = dio(220, 150, 0.7), D3 = dio(500, 110, 0.85);
const strL = mono(h1S, 560, 40, 'stripe at one end', { 'font-size': 18, 'font-weight': 600, fill: INK }), strA = W(h1S, 'M556,46 L538,82', { 'stroke-width': 2.5 });
const h2S = $('#h2S');
const hp = mk(h2S, 'rect', { x: 30, y: 40, width: 240, height: 120, rx: 10, fill: '#FBE3CF', stroke: OR, 'stroke-width': 3 }), hn = mk(h2S, 'rect', { x: 270, y: 40, width: 240, height: 120, rx: 10, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 });
const hpl = tx(h2S, 150, 196, 'p-type', { 'text-anchor': 'middle', fill: '#9A4A0E', 'font-size': 22 }), hnl = tx(h2S, 390, 196, 'n-type', { 'text-anchor': 'middle', fill: '#8A5A00', 'font-size': 22 });
const hH = [], hEl = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { hH.push(hole(h2S, 70 + i * 50, 76 + j * 48, 8)); hEl.push(dot(h2S, 310 + i * 50, 76 + j * 48, 8)); }
const gOk = PUC.arrow(h2S, C.ok, 5, 16), gNo = PUC.arrow(h2S, RED, 5, 16);
const gOkT = tx(h2S, 690, 82, '✓', { fill: C.ok, 'font-size': 30 }), gNoT = tx(h2S, 690, 152, '✗', { fill: RED, 'font-size': 30 });
const gL = mono(h2S, 625, 196, 'ONE-WAY GATE', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: INK });
const tH2 = wt('H2', 'tiny'), tStripe = wt('H2', 'stripe'), tH3 = wt('H3', 'Inside'), tGate = wt('I1', 'gate');

/* ================= R: two rooms + diffusion ================= */
const rLS = $('#rLS');
const rooms = [W(rLS, 'M50,90 H734 V440 H50 Z', { 'stroke-width': 4 }), W(rLS, 'M392,90 V225 M392,305 V440', { 'stroke-width': 6 })];
const rmL = [mono(rLS, 70, 122, 'PACKED', { 'font-size': 17, 'font-weight': 600, fill: INK }), mono(rLS, 714, 122, 'NEARLY EMPTY', { 'text-anchor': 'end', 'font-size': 17, 'font-weight': 600, fill: INK })];
const PP = []; for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) PP.push({ x: 90 + i * 50 + (j % 2) * 18, y: 160 + j * 60, e: mk(rLS, 'circle', { cx: 90 + i * 50, cy: 160 + j * 60, r: 11, fill: '#F6DEC2', stroke: INK, 'stroke-width': 2.5 }) });
const MOVE = [29, 24, 28, 19, 23, 27, 14, 18, 22, 26, 9, 13]; // movers (nearest the door first)
const TGT = MOVE.map((_, k) => ({ x: 450 + (k % 4) * 70, y: 170 + Math.floor(k / 4) * 90 }));
const cnt = [tx(rLS, 220, 488, '30', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30 }), tx(rLS, 564, 488, '0', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30 })];
const avR = PUC.avatar($('#sR'), { x: 192, y: 776, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Like people leaving a packed bus!' });
const rRS = $('#rRS');
const bottle = [W(rRS, 'M96,330 V250 Q96,226 116,220 V196 H140 V220 Q160,226 160,250 V330 Z', { 'stroke-width': 4, fill: '#EEF0F4' }), mk(rRS, 'rect', { x: 112, y: 182, width: 32, height: 16, rx: 4, fill: INK })];
const SM = [...Array(14)].map((_, k) => ({ a: -1.25 + 1.3 * (k / 13), r0: 10 + (k % 3) * 8, e: mk(rRS, 'circle', { cx: 128, cy: 190, r: 7, fill: '#C9B6F2' }) }));
const smL = mono(rRS, 392, 368, 'a smell spreads the same way', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: INK });
const tR2 = wt('R2', 'packed'), tR3 = wt('R3', 'drift'), tR4 = wt('R4', 'diffusion'), tSmell = wt('R4', 'Smells');

/* ================= J: the junction forms ================= */
const jS = $('#jS');
const pReg = mk(jS, 'rect', { x: 80, y: 90, width: 720, height: 330, fill: '#FDF3EA', stroke: OR, 'stroke-width': 3 }), nReg = mk(jS, 'rect', { x: 800, y: 90, width: 720, height: 330, fill: '#FFFAEC', stroke: AM, 'stroke-width': 3 });
const jLine = W(jS, 'M800,90 V420', { 'stroke-width': 3, stroke: INK, 'stroke-dasharray': '8 8' });
const jLab = [tx(jS, 110, 132, 'p-type', { fill: '#9A4A0E', 'font-size': 26 }), tx(jS, 1490, 132, 'n-type', { 'text-anchor': 'end', fill: '#8A5A00', 'font-size': 26 })];
const jJL = mono(jS, 800, 76, 'p-n JUNCTION', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: INK });
const HS = [], ES = []; for (let i = 0; i < 12; i++) for (let j = 0; j < 5; j++) {
  HS.push({ x: 120 + i * 54 + (j % 2) * 14, y: 170 + j * 52, i, e: hole(jS, 0, 0, 9) }); ES.push({ x: 1480 - i * 54 - (j % 2) * 14, y: 170 + j * 52, i, e: dot(jS, 0, 0, 9) }); }
const pairH = HS.filter(h => h.i >= 9), pairE = ES.filter(e => e.i >= 9);
// sort so pair k joins the same row
pairH.sort((a, b) => a.y - b.y || b.x - a.x); pairE.sort((a, b) => a.y - b.y || a.x - b.x);
const IONN = pairH.map(h => ionN(jS, h.x, h.y)), IONP = pairE.map(e => ionP(jS, e.x, e.y));
const dep = mk(jS, 'rect', { x: 580, y: 92, width: 440, height: 326, fill: 'rgba(22,33,62,0.06)' }), depB = [W(jS, 'M580,90 V420', { 'stroke-width': 3, stroke: '#9AA0AC', 'stroke-dasharray': '6 6' }), W(jS, 'M1020,90 V420', { 'stroke-width': 3, stroke: '#9AA0AC', 'stroke-dasharray': '6 6' })];
const dimJ = [W(jS, 'M584,446 H1016', { 'stroke-width': 2.5 }), W(jS, 'M584,436 V456 M1016,436 V456', { 'stroke-width': 2.5 })], dimJL = mono(jS, 800, 478, 'often < 0.001 mm (drawn much wider)', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: INK });
const tJ2 = wt('J2', 'left'), tJ3 = wt('J3', 'right'), tJ4 = wt('J4', 'junction'), tJ5 = wt('J5', 'diffuse'), tJ6 = wt('J6', 'Holes'), tJ7 = wt('J7', 'fill');
const tJ9 = wt('J9', 'positive'), tJ10 = wt('J10', 'negative'), tJ11 = wt('J11', 'thin'), tJ12 = wt('J12', 'depletion'), tJ13 = wt('J13', 'thousandth');

/* ================= E: field and drift ================= */
const eS = $('#eS');
const eP = mk(eS, 'rect', { x: 40, y: 80, width: 352, height: 320, fill: '#FDF3EA', stroke: OR, 'stroke-width': 3 }), eN = mk(eS, 'rect', { x: 392, y: 80, width: 352, height: 320, fill: '#FFFAEC', stroke: AM, 'stroke-width': 3 });
const eDep = mk(eS, 'rect', { x: 262, y: 82, width: 260, height: 316, fill: 'rgba(22,33,62,0.06)' });
const eLab = [tx(eS, 60, 118, 'p', { fill: '#9A4A0E', 'font-size': 30, 'font-style': 'italic' }), tx(eS, 724, 118, 'n', { 'text-anchor': 'end', fill: '#8A5A00', 'font-size': 30, 'font-style': 'italic' })];
const eIons = [], eIonsP = []; [150, 230, 310].forEach(y => { [296, 346].forEach(x => eIons.push(ionN(eS, x, y))); [438, 488].forEach(x => eIonsP.push(ionP(eS, x, y))); });
const eFree = []; [150, 230, 310].forEach((y, j) => { [80, 140, 200].forEach((x, i) => eFree.push({ e: hole(eS, 0, 0, 9), x: x + (j % 2) * 10, y })); [584, 644, 704].forEach((x, i) => eFree.push({ e: dot(eS, 0, 0, 9), x: x - (j % 2) * 10, y })); });
const eF = [190, 270].map(y => fArrow(eS, 500, 290, y)), eFL = tx(eS, 392, 380, 'E', { 'text-anchor': 'middle', fill: FL, 'font-size': 30, 'font-style': 'italic' }), eFL2 = mono(eS, 412, 380, 'from n to p', { 'font-size': 15, fill: FL, 'font-weight': 600 });
const stray = dot(eS, 0, 0, 9);
const legD = [mono(eS, 40, 468, 'ELECTRON DIFFUSION', { 'font-size': 17, 'font-weight': 600, fill: '#8FA3C8' })], legR = [mono(eS, 40, 528, 'ELECTRON DRIFT', { 'font-size': 17, 'font-weight': 600, fill: '#B7791F' })];
const aDif = PUC.arrow(eS, '#8FA3C8', 5, 16), aDri = PUC.arrow(eS, AM, 5, 16);
const eRows = (() => { const host = $('#eSteps'); const rows = [['Ions make a field E, from n to p', 80], ['A field moves carriers: drift current', 152], ['Drift flows opposite to diffusion', 224], ['At first diffusion wins: the layer grows', 296], ['Wider layer, stronger field, more drift', 368]];
  host.innerHTML = rows.map(([s, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx" style="font:600 27px Poppins">${s}</div></div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; })();
const tE2 = wt('E2', 'Plus'), tE3 = wt('E3', 'field'), tE4 = wt('E4', 'pushes'), tE5 = wt('E5', 'drift'), tE6 = wt('E6', 'opposite'), tE7 = wt('E7', 'first'), tE8 = wt('E8', 'stronger'), tE9 = wt('E9', 'cancel');

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bP = mk(ck, 'rect', { x: 300, y: 104, width: 160, height: 92, rx: 6, fill: '#FBE3CF', stroke: OR, 'stroke-width': 3 }), bN = mk(ck, 'rect', { x: 460, y: 104, width: 160, height: 92, rx: 6, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 });
const bDep = mk(ck, 'rect', { x: 460, y: 106, width: 0, height: 88, fill: 'rgba(22,33,62,0.12)' });
const bLab = [tx(ck, 318, 92, 'p', { 'font-style': 'italic', fill: '#9A4A0E', 'font-size': 26 }), tx(ck, 602, 92, 'n', { 'text-anchor': 'end', 'font-style': 'italic', fill: '#8A5A00', 'font-size': 26 })];
const bCar = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) { bCar.push({ e: hole(ck, 0, 0, 7), x: 318 + i * 30, y: 132 + j * 36, s: -1 }); bCar.push({ e: dot(ck, 0, 0, 7), x: 602 - i * 30, y: 132 + j * 36, s: 1 }); }
const bW = [W(ck, 'M300,150 H140 V300 H426'), W(ck, 'M494,300 H780 V150 H620')];
const amm = mk(ck, 'circle', { cx: 460, cy: 300, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), ammT = tx(ck, 460, 309, 'A', { 'text-anchor': 'middle', 'font-size': 26 });
const ammL = mono(ck, 460, 360, 'CURRENT METER', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 });
const hillT = mono(ck, 40, 404, 'ENERGY HILL FOR AN ELECTRON', { 'font-size': 16, 'font-weight': 600, fill: INK });
const hill = W(ck, '', { 'stroke-width': 5, stroke: GO }), hillLab = [mono(ck, 150, 572, 'p side', { 'font-size': 16 }), mono(ck, 690, 572, 'n side', { 'font-size': 16 })];
const ball = dot(ck, 0, 0, 12), hA = dArrow(ck, 830, 440, 536, TE), hAL = sub(ck, 848, 496, 'eV', '0', { fill: TE, 'font-size': 24, 'font-style': 'normal' });
const SC = scope($('#scS'), 592, 200), trD = SC.tr('#8FA3C8'), trR = SC.tr(AM), sL1 = SC.lab(14, 26, 'CH1 · DIFFUSION', '#8FA3C8'), sL2 = SC.lab(220, 26, 'CH2 · DRIFT', AM);
$('#ro1').innerHTML = `<span class="k" style="color:${INK}">W</span><span class="v" id="rW" style="color:${INK}">0.00</span><span class="u">µm</span>
  <span class="k" style="color:${TE}">V<sub>0</sub></span><span class="v" id="rV" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">µA</span>`;
const tJoin = wt('B4', 'instant'), tB3 = wt('B3', 'scope'), tB6 = wt('B6', 'equal'), tB8 = wt('B8', 'barrier'), tB10 = wt('B10', 'climb');
const settle = τ => τ < tJoin ? 0 : 1 - Math.exp(-(τ - tJoin) / 1.6);
const Idif = τ => τ < tJoin ? 0 : 150 - 90 * settle(τ), Idri = τ => τ < tJoin ? 0 : 6 + 54 * settle(τ);

/* ================= W: worked example ================= */
const wS = $('#wS');
const wP = mk(wS, 'rect', { x: 50, y: 90, width: 130, height: 290, fill: '#FDF3EA', stroke: OR, 'stroke-width': 3 }), wN = mk(wS, 'rect', { x: 604, y: 90, width: 130, height: 290, fill: '#FFFAEC', stroke: AM, 'stroke-width': 3 });
const wD = mk(wS, 'rect', { x: 180, y: 90, width: 424, height: 290, fill: '#F1F2F5', stroke: '#9AA0AC', 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const wIons = []; [140, 235, 330].forEach(y => { [214, 270].forEach(x => wIons.push(ionN(wS, x, y))); [514, 570].forEach(x => wIons.push(ionP(wS, x, y))); });
const wF = [188, 282].map(y => fArrow(wS, 540, 244, y)), wFL = tx(wS, 392, 244, 'E', { 'text-anchor': 'middle', fill: FL, 'font-size': 30, 'font-style': 'italic' });
const wDim = [W(wS, 'M184,420 H600', { 'stroke-width': 2.5 }), W(wS, 'M184,410 V430 M600,410 V430', { 'stroke-width': 2.5 })], wDL = tx(wS, 392, 460, 'd = 0.5 µm', { 'text-anchor': 'middle', 'font-size': 26 });
const wVL = tx(wS, 392, 516, 'V₀ = 0.7 V across the layer', { 'text-anchor': 'middle', 'font-size': 24, fill: TE });
const wEl = dot(wS, 0, 0, 10), wElL = mono(wS, 392, 566, 'to cross: at least 0.7 eV', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: GO });
const V0c = `\\textcolor{${TE}}{V_0}`;
const wRows = steps($('#wSteps'), [
  [K(`${V0c} = 0.7\\,\\text{V}`), 'barrier', 76],
  [K(`d = 0.5\\,\\mu\\text{m} = 0.5\\times10^{-6}\\,\\text{m}`), '', 140],
  [K(`E = \\dfrac{${V0c}}{d}`), 'nearly uniform field', 200],
  [K(`E = \\dfrac{0.7}{0.5\\times10^{-6}}`), '', 290],
  [K(`E = 1.4\\times10^{6}\\,\\text{V/m}`), '', 384],
  [K(`\\textcolor{${GO}}{KE_{min}} = e${V0c} = 0.7\\,\\text{eV}`), '', 456],
  [K(`= 0.7\\times1.6\\times10^{-19} = 1.12\\times10^{-19}\\,\\text{J}`), '', 524]]);
const wBox = $('#wBox'); wBox.style.top = '372px'; wBox.style.height = '72px';
const tWs = [wt('W2', 'Take'), wt('W3', 'depletion'), wt('W4', 'E'), wt('W5', 'Point'), wt('W6', 'E'), wt('W7', 'To'), wt('W8', 'That')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A voltmeter reads the barrier, 0.7 V', right: 'It reads 0: contact voltages cancel it', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xP = mk(tcS, 'rect', { x: 230, y: 76, width: 140, height: 64, rx: 6, fill: '#FBE3CF', stroke: OR, 'stroke-width': 3 }), xN = mk(tcS, 'rect', { x: 370, y: 76, width: 140, height: 64, rx: 6, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 });
const xLab = [tx(tcS, 300, 117, 'p', { 'text-anchor': 'middle', 'font-style': 'italic', fill: '#9A4A0E' }), tx(tcS, 440, 117, 'n', { 'text-anchor': 'middle', 'font-style': 'italic', fill: '#8A5A00' })];
const xW = [W(tcS, 'M230,108 H160 V236 H340'), W(tcS, 'M400,236 H580 V108 H510')];
const vm = mk(tcS, 'circle', { cx: 370, cy: 236, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }), vmT = tx(tcS, 370, 245, 'V', { 'text-anchor': 'middle', 'font-size': 26, fill: TE });
const vmR = tx(tcS, 620, 200, '0.00 V', { 'font-family': 'IBM Plex Mono', 'font-size': 36, fill: TE }), vmS = mono(tcS, 620, 236, 'not 0.7 V', { 'font-size': 18, fill: RED, 'font-weight': 600 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS', 'JEE MAIN'], type: 'How the junction and depletion layer form · field in the layer (JEE Main, 29 Jul 2022, Shift 1)' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '25px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A p-n junction has a depletion layer 2&nbsp;µm wide with a uniform field of 3.5 × 10<sup>5</sup>&nbsp;V/m. The barrier potential and the least energy an electron needs to cross are:', qW: 780,
  opts: [K(`0.7\\,\\text{V}\\quad 1.12\\times10^{-19}\\,\\text{J}`), K(`0.7\\,\\text{V}\\quad 0.7\\,\\text{J}`), K(`0.35\\,\\text{V}\\quad 5.6\\times10^{-20}\\,\\text{J}`), K(`7\\,\\text{V}\\quad 1.12\\times10^{-18}\\,\\text{J}`)], right: 0, cols: 1, optW: 760, optH: 70, optY: 300, optFs: 28 });
const sol = PUC.solution($('#so'), [[K(`${V0c} = E\\,d`)], [K(`= 3.5\\times10^{5}\\times2\\times10^{-6} = 0.7\\,\\text{V}`)],
  [K(`\\textcolor{${GO}}{KE_{min}} = e${V0c} = 0.7\\,\\text{eV}`)], [K(`= 1.12\\times10^{-19}\\,\\text{J}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Barrier'), wt('A3', 'Three'), wt('A4', 'energy'), wt('A4', 'or')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 214, w: 1100, h: 552, y0: 90, dy: 88, title: 'p-n junction · fact card', txt: [1, 1, 1, 0, 1],
  lines: ['Diffusion builds the depletion layer: + ions on n side, - ions on p side',
    'Its field E points from n to p and drives a drift current',
    'Equilibrium: drift = diffusion, so net current is zero',
    K(`${V0c} \\approx 0.7\\,\\text{V (Si)} \\qquad E \\approx ${V0c}/d \\qquad \\textcolor{${GO}}{KE_{min}} = e${V0c}`),
    'A voltmeter cannot measure the barrier potential'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 41', topic: 'Diode V-I characteristics', y: 796 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tJ12 - 0.3, 1.1, 960, 560], [T0('J13') + 1.0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const nc = $('#nchip'), nc2 = $('#nchip2');

M.on(t => {
  cam(t); head(t); sweep(t);
  { const cw = nc.offsetWidth, c2 = nc2.offsetWidth, tot = cw + 16 + c2, m = M.spring(t - tMorph, M.HEAVY);
    const x = M.lerp(960 - tot / 2, 160, m); nc.style.left = x.toFixed(2) + 'px'; nc2.style.left = (x + cw + 16).toFixed(2) + 'px'; nc2.style.top = nc.style.top;
    M.vis(nc2, t, 0.25, 1e9, { dy: 18 }); }
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.5, tW - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (t < tB || t >= tW) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#h1C'), t, tH2 - 0.3, out, { dx: 60, dy: 0, ...o });
    [D1, D2, D3].forEach((d, i) => fadeAt(d, t, tH2 + i * 0.25, 0.06));
    M.vis(strL, t, tStripe, 1e9, { dy: 0, fade: 0.2 }); M.draw(strA, t, tStripe, 0.3);
    M.vis($('#h2C'), t, tH3 - 0.2, out, { dy: 36, ...o });
    fadeAt([hp, hpl], t, wt('H3', 'p-type'), 0.1); fadeAt(hH, t, wt('H3', 'p-type') + 0.2, 0.04);
    fadeAt([hn, hnl], t, wt('H3', 'n-type'), 0.1); fadeAt(hEl, t, wt('H3', 'n-type') + 0.2, 0.04);
    const g = M.io((t - tGate) / 0.4); gOk.set(560, 70, 560 + 110 * g, 70); gNo.set(670, 140, 670 - 110 * g, 140);
    fadeAt([gOkT, gNoT, gL], t, tGate + 0.3, 0.15);
  }

  /* R: two rooms */
  const rOn = t >= tR - 0.05 && t < tJ + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tJ - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR4 - 0.6, out, { dx: 60, dy: 0, ...o });
    drawSeq(rooms, t, tR + 0.3, 0.5, 0.3); fadeAt(rmL, t, tR2, 0.4);
    let moved = 0;
    PP.forEach((p, k) => { M.vis(p.e, t, tR2 - 0.2 + k * 0.012, 1e9, { dy: 0, fade: 0.15 });
      const m = MOVE.indexOf(k); let x = p.x, y = p.y;
      if (m >= 0) { const t0 = tR3 - 0.3 + m * 0.32, u = M.clamp((t - t0) / 1.4), tg = TGT[m];
        if (u > 0) { if (u < 0.5) { const v = M.io(u / 0.5); x = p.x + (392 - p.x) * v; y = p.y + (265 - p.y) * v; } else { const v = M.io((u - 0.5) / 0.5); x = 392 + (tg.x - 392) * v; y = 265 + (tg.y - 265) * v; } }
        if (u >= 0.5) moved++; }
      jig(p.e, x, y, t, k, 1.2); });
    M.setT(cnt[0], String(30 - moved)); M.setT(cnt[1], String(moved)); fadeAt(cnt, t, tR2 + 0.3, 0.1);
    fadeAt(bottle, t, tR4 - 0.3, 0.1);
    SM.forEach((s, k) => { const r = s.r0 + 300 * M.clamp((t - tSmell + 0.4 - (k % 4) * 0.2) / 3.2); mv(s.e, 128 + r * Math.cos(s.a) * 1.6, 190 + r * Math.sin(s.a) * 0.45); M.vis(s.e, t, tSmell - 0.4, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis(smL, t, tSmell, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#rBox'), t, tR4 - 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.rise($('#rDef'), t, tR4);
    avR(t, tR4 + 0.6, out);
  }

  /* J: the junction forms */
  const jOn = t >= tJ - 0.05 && t < tE + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const out = tE - 0.32;
    M.vis($('#jC'), t, tJ + 0.1, out, { dy: 36, ...o }); M.vis($('#jTag'), t, tJ2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(pReg, t, tJ2 - 0.2, 1e9, { dy: 0, fade: 0.25 }); M.vis(nReg, t, tJ3 - 0.2, 1e9, { dy: 0, fade: 0.25 }); M.vis(jLab[0], t, tJ2, 1e9, { dy: 8 }); M.vis(jLab[1], t, tJ3, 1e9, { dy: 8 });
    M.draw(jLine, t, tJ4 - 0.2, 0.5); M.vis(jJL, t, tJ4, 1e9, { dy: 8 });
    HS.forEach((h, k) => { M.vis(h.e, t, tJ2 + 0.1 + k * 0.008, 1e9, { dy: 0, fade: 0.12 }); jig(h.e, h.x, h.y, t, k, 1.5); });
    ES.forEach((e, k) => { M.vis(e.e, t, tJ3 + 0.1 + k * 0.008, 1e9, { dy: 0, fade: 0.12 }); jig(e.e, e.x, e.y, t, k + 99, 1.5); });
    // pairs: even k electron crosses into p, odd k hole crosses into n; they meet, then vanish together
    pairE.forEach((e, k) => { const h = pairH[k], eu = M.io((t - tJ5 - (k % 5) * 0.08) / 1.6), hu = M.io((t - tJ6 - (k % 5) * 0.08) / 1.6), gone = M.io((t - tJ7 - k * 0.04) / 0.3);
      if (k % 2 === 0) { mv(e.e, e.x + (h.x - e.x) * eu, e.y + (h.y - e.y) * eu); if (eu >= 1) mv(h.e, h.x, h.y); }
      else { mv(h.e, h.x + (e.x - h.x) * hu, h.y + (e.y - h.y) * hu); if (hu >= 1) mv(e.e, e.x, e.y); }
      e.e.style.opacity = h.e.style.opacity = (1 - gone).toFixed(3); if (gone >= 1) { M.hide(e.e, true); M.hide(h.e, true); } });
    IONP.forEach((g, k) => M.vis(g, t, tJ9 - 0.5 + k * 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }));
    IONN.forEach((g, k) => M.vis(g, t, tJ10 - 0.3 + k * 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }));
    M.vis($('#jP1'), t, tJ9, 1e9, { dy: 10 }); M.vis($('#jP0'), t, tJ10 + 0.3, 1e9, { dy: 10 });
    M.vis(dep, t, tJ11 - 0.1, 1e9, { dy: 0, fade: 0.3 }); drawSeq(depB, t, tJ11, 0.4, 0.1);
    M.vis($('#jP2'), t, tJ12 - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    drawSeq(dimJ, t, tJ13 - 0.3, 0.4, 0.1); M.vis(dimJL, t, tJ13, 1e9, { dy: 0, fade: 0.2 });
  }

  /* E: field and drift */
  const eOn = t >= tE - 0.05 && t < tT + 0.02; M.hide($('#sE'), !eOn);
  if (eOn) {
    M.vis($('#eL'), t, tE + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#eR'), t, tE3 - 0.4, 1e9, { dx: 60, dy: 0 });
    fadeAt([eP, eN, eDep, ...eLab], t, tE + 0.3, 0.06);
    eFree.forEach((f, k) => { M.vis(f.e, t, tE + 0.5, 1e9, { dy: 0, fade: 0.2 }); jig(f.e, f.x, f.y, t, k, 1.5); });
    eIons.forEach((g, k) => M.vis(g, t, tE2 + 1.0 + k * 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    eIonsP.forEach((g, k) => M.vis(g, t, tE2 + k * 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    eF.forEach((a, i) => M.vis(a, t, tE3 + i * 0.2, 1e9, { dx: 20, dy: 0, fade: 0.2 })); M.vis(eFL, t, tE3 + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(eFL2, t, tE3 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    // stray electron enters from the left, gets pushed back to n
    const su = M.clamp((t - tE4 + 0.6) / 2.4), sx = su < 0.35 ? 420 - 140 * M.io(su / 0.35) : 280 + 360 * M.io((su - 0.35) / 0.65);
    M.hide(stray, t < tE4 - 0.6); mv(stray, sx, 352);
    fadeAt(legD, t, tE6 - 0.3); fadeAt(legR, t, tE5);
    const d1 = M.io((t - tE6 + 0.2) / 0.4), d2 = M.io((t - tE5 + 0.1) / 0.4); aDif.set(420, 488, 420 - 120 * d1, 488); aDri.set(300, 548, 300 + 120 * d2, 548);
    const w = M.io((t - tE7) / 1.0) * (1 - 0.0); aDif.set(420, 488, 420 - (120 - 50 * M.io((t - tE8) / 1.2)) * d1, 488); aDri.set(300, 548, 300 + (40 + 30 * M.io((t - tE8) / 1.2)) * d2 / 1, 548);
    eRows.forEach((r, i) => { const ti = [tE3, tE5, tE6, tE7, tE8][i]; M.vis(r, t, ti - 0.1, 1e9, { dy: 0, fade: 0.12 }); M.vis(r.querySelector('.n'), t, ti - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ti, 0.6); });
    M.vis($('#eBox'), t, tE9 - 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.rise($('#eEq'), t, tE9 - 0.3);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tB; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tB - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'then') - 0.05, { out: tB - 0.35, outDur: 0.25 }); }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tW + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tW - 0.32, s = settle(t);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    // blocks slide together at the join
    const jn = M.io((t - tJoin + 0.6) / 0.6), gap = 40 * (1 - jn);
    PUC.attr(bP, 'transform', `translate(${(-gap).toFixed(1)},0)`); PUC.attr(bN, 'transform', `translate(${gap.toFixed(1)},0)`);
    M.vis(bP, t, wt('B2', 'join') - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(bN, t, wt('B2', 'join') - 0.2, 1e9, { dy: 0, fade: 0.2 }); fadeAt(bLab, t, wt('B2', 'join'), 0.1);
    const dw = 120 * s; PUC.attr(bDep, 'x', (460 - dw / 2).toFixed(1)); PUC.attr(bDep, 'width', dw.toFixed(1));
    bCar.forEach((c, k) => { const x = c.x + c.s * gap; M.vis(c.e, t, wt('B2', 'join'), 1e9, { dy: 0, fade: 0.2 }); jig(c.e, x, c.y, t, k, 1.5); M.hide(c.e, Math.abs(x - 460) < dw / 2 + 4 || t < wt('B2', 'join')); });
    drawSeq(bW, t, wt('B2', 'meter') - 0.4, 0.4, 0.2); fadeAt([amm, ammT, ammL], t, wt('B2', 'current') - 0.1, 0.08);
    M.vis(sL1, t, tB3, 1e9, { dy: 0, fade: 0.2 }); M.vis(sL2, t, tB3 + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#rngT'), t, tB3, 1e9, { dy: 0, fade: 0.2 });
    const on = t >= tB3 - 0.3; trD(Idif, t, tB3 - 1, 8, 186, on); trR(Idri, t, tB3 - 1, 8, 186, on);
    M.vis($('#ro1'), t, tB3, 1e9, { dy: 12 });
    M.setT($('#rW'), (0.5 * s).toFixed(2)); M.setT($('#rV'), (0.7 * s).toFixed(2)); M.setT($('#rI'), Math.max(0, (Idif(t) - Idri(t)) / 144 * 3).toFixed(2));
    $('#rI').style.background = t > tB6 - 0.2 && t < tB6 + 1.6 ? '#E2F3E9' : 'transparent';
    // energy hill: p side rises with V0
    M.vis(hillT, t, tB8 - 0.4, 1e9, { dy: 8 }); fadeAt(hillLab, t, tB8 - 0.2, 0.1);
    const hy = 536 - 96 * s; PUC.attr(hill, 'd', `M110,${hy.toFixed(1)} H400 C440,${hy.toFixed(1)} 480,536 520,536 H800`); M.vis(hill, t, tB8 - 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis(hA, t, tB8 + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(hAL, t, tB8 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const bu = Math.max(0, t - tB10 + 0.2), ph = Math.sin(bu * 1.9) ** 2, bx = 700 - 230 * ph, by = bx > 520 ? 524 : 524 - 96 * Math.min(1, (520 - bx) / 120);
    M.hide(ball, t < tB10 - 0.3); mv(ball, bx, by);
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wL'), t, tW + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#wR'), t, tW + 0.25, 1e9, { dx: 60, dy: 0 });
    fadeAt([wP, wN, wD], t, tW + 0.4, 0.08); fadeAt(wIons, t, tW + 0.7, 0.03); fadeAt([...wF, wFL], t, tW + 1.2, 0.15);
    M.vis(wVL, t, tWs[0], 1e9, { dy: 10 }); drawSeq(wDim, t, tWs[1] - 0.2, 0.4, 0.1); M.vis(wDL, t, tWs[1], 1e9, { dy: 8 });
    const eu = M.io((t - tWs[5]) / 2.0); M.hide(wEl, t < tWs[5] - 0.2); mv(wEl, 670 - 560 * eu, 140 + 0 * eu); M.vis(wElL, t, tWs[5] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Can') - 0.05, tStrike: wt('X3', 'reads'), tRight: wt('X3', 'Contact') - 0.1 });
    fadeAt([xP, xN, ...xLab], t, tX + 0.6, 0.08); drawSeq(xW, t, tX + 0.9, 0.4, 0.2); fadeAt([vm, vmT], t, tX + 1.3, 0.1);
    M.vis(vmR, t, wt('X3', 'zero') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis(vmS, t, wt('X3', 'zero') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC'), wt('X4', 'CBSE'), wt('X4', 'ISC'), wt('X5', 'JEE')], tType: wt('X4', 'junction') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
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
