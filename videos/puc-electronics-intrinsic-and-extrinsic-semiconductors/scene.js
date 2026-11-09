// PUC Electronics Ep 39 - Intrinsic and extrinsic semiconductors ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons and n_e amber, holes and n_h hollow orange, I violet, n_i ink, energy gold
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
const sci = (p, x, y, m, e, a = {}) => { const t = tx(p, x, y, '', { 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'font-size': 22, ...a }); t.textContent = m + ' × 10';
  const s = mk(t, 'tspan', { dy: -9, 'font-size': 15 }); s.textContent = e; return t; };
const sub = (p, x, y, b, s, a = {}) => { const t = tx(p, x, y, b, { 'font-style': 'italic', ...a }); const q = mk(t, 'tspan', { dy: 6, 'font-size': (a['font-size'] || 24) * 0.62 }); q.textContent = s; return t; };
const fmtS = (v, d = 1) => { const e = Math.floor(Math.log10(v) + 1e-9), m = v / Math.pow(10, e); return `${m.toFixed(d)}×10<sup>${e}</sup>`; };
/* a 2D silicon lattice: atoms, bonds with two shared electrons each, outward stubs */
const lattice = (svg, x0, y0, cols, rows, sp, r, o = {}) => {
  const g = mk(svg, 'g'), gb = mk(g, 'g'), ga = mk(g, 'g'), atoms = [], bonds = [], stubs = [], X = c => x0 + c * sp, Y = q => y0 + q * sp;
  const st = (x1, y1, x2, y2) => stubs.push(W(gb, `M${x1},${y1} L${x2},${y2}`, { stroke: '#C9CDD6', 'stroke-width': 4, 'stroke-dasharray': '6 6' }));
  for (let q = 0; q < rows; q++) for (let c = 0; c < cols; c++) {
    if (c < cols - 1) { const l = W(gb, `M${X(c) + r},${Y(q)} H${X(c + 1) - r}`, { stroke: '#C9CDD6', 'stroke-width': 4 }), m = (X(c) + X(c + 1)) / 2; bonds.push({ k: `h${c}${q}`, l, e: [dot(svg, m - 10, Y(q), o.er || 7), dot(svg, m + 10, Y(q), o.er || 7)], p: [[m - 10, Y(q)], [m + 10, Y(q)]] }); }
    if (q < rows - 1) { const l = W(gb, `M${X(c)},${Y(q) + r} V${Y(q + 1) - r}`, { stroke: '#C9CDD6', 'stroke-width': 4 }), m = (Y(q) + Y(q + 1)) / 2; bonds.push({ k: `v${c}${q}`, l, e: [dot(svg, X(c), m - 10, o.er || 7), dot(svg, X(c), m + 10, o.er || 7)], p: [[X(c), m - 10], [X(c), m + 10]] }); }
    if (c === 0) st(X(c) - r, Y(q), X(c) - r - o.stub, Y(q)); if (c === cols - 1) st(X(c) + r, Y(q), X(c) + r + o.stub, Y(q));
    if (q === 0) st(X(c), Y(q) - r, X(c), Y(q) - r - o.stub); if (q === rows - 1) st(X(c), Y(q) + r, X(c), Y(q) + r + o.stub);
    const ag = mk(ga, 'g'), ci = mk(ag, 'circle', { cx: X(c), cy: Y(q), r, fill: '#EEF0F4', stroke: INK, 'stroke-width': 3 }), lb = tx(ag, X(c), Y(q) + r * 0.3, 'Si', { 'text-anchor': 'middle', 'font-size': r * 0.8 });
    atoms.push({ g: ag, ci, lb, x: X(c), y: Y(q), c, q });
  }
  const B = k => bonds.find(b => b.k === k), A = (c, q) => atoms.find(a => a.c === c && a.q === q);
  return { g, atoms, bonds, stubs, B, A, eAll: bonds.flatMap(b => b.e) };
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'reads') - 0.3;
const tL = T0('L1'), tP = T0('P1'), tD = T0('D1'), tT = T0('T1'), tB = T0('B1'), tM = T0('M1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tB], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const wafer = (s) => { const a = [mk(s, 'circle', { cx: 125, cy: 100, r: 82, fill: '#DDE1E8', stroke: INK, 'stroke-width': 4 }), W(s, 'M70,70 A64,64 0 0 1 120,42', { stroke: '#fff', 'stroke-width': 6 }), W(s, 'M95,178 H155', { 'stroke-width': 4 })]; return a; };
const h1 = wafer($('#h1S')), h2 = wafer($('#h2S'));
const spark = [[96, 56], [158, 70], [176, 116]].map(([x, y]) => W($('#h1S'), `M${x - 9},${y} H${x + 9} M${x},${y - 9} V${y + 9}`, { stroke: AM, 'stroke-width': 3 }));
const IMP = [[90, 80], [140, 64], [166, 118], [110, 130], [70, 112]].map(([x, y]) => mk($('#h2S'), 'circle', { cx: x, cy: y, r: 7, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 }));
const tPure = wt('H2', 'purer'), tAdds = wt('H3', 'adds'), tPurp = wt('H3', 'purpose');

/* ================= L: holding hands + crystal ================= */
const lLS = $('#lLS');
const HX = [132, 262, 392, 522, 652];
const heads = HX.map(x => mk(lLS, 'circle', { cx: x, cy: 120, r: 28, fill: '#F6DEC2', stroke: INK, 'stroke-width': 3 }));
const bodies = HX.map(x => W(lLS, `M${x},148 V236 M${x},236 l-18,36 M${x},236 l18,36`, { 'stroke-width': 4 }));
const arms = HX.slice(0, -1).map(x => W(lLS, `M${x},176 H${x + 130}`, { stroke: AM, 'stroke-width': 5 }));
const armsO = [W(lLS, 'M132,176 H74', { stroke: AM, 'stroke-width': 5 }), W(lLS, 'M652,176 H710', { stroke: AM, 'stroke-width': 5 })];
const handL = mono(lLS, 392, 300, 'NOBODY IS FREE TO WALK AROUND', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: INK });
const SEAT = [...Array(7)].map((_, i) => mk(lLS, 'rect', { x: 52 + i * 98, y: 400, width: 84, height: 80, rx: 12, fill: '#EEF0F4', stroke: '#B8BCC6', 'stroke-width': 3 }));
const PEO = [...Array(6)].map((_, i) => mk(lLS, 'circle', { cx: 94 + i * 98, cy: 432, r: 24, fill: '#F6DEC2', stroke: INK, 'stroke-width': 3 }));
const cinL = [mono(lLS, 40, 536, 'people shift right →', { 'font-size': 18, 'font-weight': 600, fill: INK }), mono(lLS, 744, 536, '← the empty seat moves left', { 'text-anchor': 'end', 'font-size': 18, 'font-weight': 600, fill: OR })];
const lRS = $('#lRS');
const LT = lattice(lRS, 167, 140, 4, 3, 150, 30, { stub: 46 });
const bBrk = LT.B('h11'), bHop = LT.B('v10');
const freeE = dot(lRS, 0, 0, 8), lHole = hole(lRS, 0, 0, 9), lPlus = tx(lRS, 0, 0, '+', { 'text-anchor': 'middle', 'font-size': 18, fill: OR, 'font-weight': 700 });
const aE = PUC.arrow(lRS, AM, 3.5, 12), aH = PUC.arrow(lRS, OR, 3.5, 12);
const tempL = mono(lRS, 40, 572, 'ROOM TEMPERATURE', { 'font-size': 17, 'font-weight': 600, fill: RED });
const hopL = mono(lRS, 744, 572, 'electron one way, hole the other', { 'text-anchor': 'end', 'font-size': 17, 'font-weight': 600, fill: INK });
const tHold = wt('L1', 'holds'), tNob = wt('L2', 'Nobody'), tSi = wt('L3', 'silicon'), tShare = wt('L4', 'shares'), tWarm = wt('L5', 'warm');
const tLoose = wt('L6', 'loose'), tFree = wt('L6', 'breaks'), tHoleL = wt('L7', 'hole'), tPos = wt('L8', 'positive'), tHop = wt('L9', 'hops'), tMoved = wt('L10', 'moved'), tCin = wt('L11', 'cinema');

/* ================= P: intrinsic counts ================= */
const pLS = $('#pLS');
const pLab = [mono(pLS, 36, 112, 'FREE ELECTRONS', { 'font-size': 18, 'font-weight': 600, fill: '#B7791F' }), mono(pLS, 36, 212, 'HOLES', { 'font-size': 18, 'font-weight': 600, fill: OR })];
const PE = [...Array(8)].map((_, k) => dot(pLS, 248 + k * 46, 106, 10)), PH = [...Array(8)].map((_, k) => hole(pLS, 248 + k * 46, 206, 10));
const pN = [tx(pLS, 748, 116, '0', { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 34, fill: '#B7791F' }), tx(pLS, 748, 216, '0', { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 34, fill: OR })];
const pDiv = W(pLS, 'M36,260 H748', { stroke: '#E3E6EC', 'stroke-width': 2 });
const NE = `\\textcolor{${AM}}{n_e}`, NH = `\\textcolor{${OR}}{n_h}`, NI = `n_i`;
$('#pF').innerHTML = K(`${NE} = ${NH} = ${NI}`);
$('#pt0v').innerHTML = K(`\\approx 1.5\\times10^{16}\\,\\text{m}^{-3}`); $('#pt1v').innerHTML = K(`5\\times10^{28}\\,\\text{m}^{-3}`);
$('#pt0v').style.fontSize = $('#pt1v').style.fontSize = '36px';
const tPairs = T0('P1') + 0.3, tP3 = T0('P3'), tP4 = wt('P4', 'Intrinsic'), tP5 = T0('P5'), tP5b = T0('P5b'), tP6 = T0('P6'), tP6b = T0('P6b'), tP7 = T0('P7'), tP7b = wt('P7b', 'poor');

/* ================= D: doping ================= */
const dopeCard = (svg, name, col, fill) => {
  const L = lattice(svg, 90, 120, 3, 3, 100, 24, { stub: 30, er: 6 }), c = L.A(1, 1);
  PUC.attr(c.ci, 'fill', fill); PUC.attr(c.ci, 'stroke', col); c.lb.textContent = name;
  const CB = mk(svg, 'rect', { x: 470, y: 96, width: 270, height: 60, rx: 6, fill: CB_F, stroke: CB_S, 'stroke-width': 2.5 });
  const VB = mk(svg, 'rect', { x: 470, y: 280, width: 270, height: 60, rx: 6, fill: VB_F, stroke: VB_S, 'stroke-width': 2.5 });
  const lb = [mono(svg, 480, 120, 'CB', { 'font-size': 15, 'font-weight': 600, fill: '#B7791F' }), mono(svg, 480, 334, 'VB', { 'font-size': 15, 'font-weight': 600 })];
  const VE = []; for (let k = 0; k < 10; k++) VE.push(dot(svg, 509 + k * 26, 312, 6));
  return { L, c, CB, VB, lb, VE, band: [CB, VB, ...lb, ...VE] };
};
const dLS = $('#dLS'), dRS = $('#dRS');
const dn = dopeCard(dLS, 'As', AM, '#FFF4D6'), dp = dopeCard(dRS, 'In', OR, '#FBE3CF');
// n-type: 5th electron + donor level just below CB
const e5 = dot(dLS, 0, 0, 7), e5L = mono(dLS, 352, 172, '5th electron', { 'font-size': 17, 'font-weight': 600, fill: '#B7791F' });
const dLev = W(dLS, 'M486,176 H730', { stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' }), dLevL = mono(dLS, 486, 204, 'DONOR LEVEL', { 'font-size': 14, 'font-weight': 600, fill: '#B7791F' });
const DE = [0, 1, 2, 3].map(k => dot(dLS, 512 + k * 60, 176, 6));
const dLevL2 = mono(dLS, 486, 228, 'about 0.05 eV below CB, in Si', { 'font-size': 14, fill: '#B7791F' });
// p-type: missing electron on the In - right bond; acceptor level just above VB
const pB = dp.L.B('h11'); M.hide(pB.e[0], true); const ph = hole(dRS, pB.p[0][0], pB.p[0][1], 6.5);
const pFill = dp.L.B('v20'), pFe = pFill.e[1];
const aLev = W(dRS, 'M486,258 H730', { stroke: OR, 'stroke-width': 3, 'stroke-dasharray': '10 8' }), aLevL = mono(dRS, 486, 240, 'ACCEPTOR LEVEL', { 'font-size': 14, 'font-weight': 600, fill: OR });
const AE = [0, 1, 2, 3].map(k => dot(dRS, 509 + k * 52, 258, 6)), AH = [0, 1, 2, 3].map(k => hole(dRS, 535 + k * 52, 312, 6));
const tDope = wt('D1', 'doping'), tExt = wt('D2', 'extrinsic'), tAs = wt('D3', 'arsenic'), tPent = wt('D4', 'pentavalent'), tFifth = wt('D5', 'fifth'), tPush = wt('D6', 'push'), tDon = wt('D7', 'donor'), tNmaj = wt('D8', 'majority');
const tIn = wt('D9', 'indium'), tTri = wt('D10', 'trivalent'), tMiss = wt('D11', 'missing'), tAcc = wt('D12', 'accepts'), tPmaj = wt('D13', 'majority');

/* ================= B: breadboard doping test ================= */
const ck = $('#ckS');
const ckW = [W(ck, 'M150,282 V140 H360'), W(ck, 'M560,140 H800 V470 H150 V318')];
const bat = [W(ck, 'M115,282 H185', { 'stroke-width': 5 }), W(ck, 'M132,318 H168', { 'stroke-width': 9 })];
const batL = [tx(ck, 64, 278, '+', { 'font-size': 28 }), tx(ck, 68, 336, '-', { 'font-size': 30 }), tx(ck, 202, 296, 'Battery'), mono(ck, 202, 324, '3 V')];
const smp = mk(ck, 'rect', { x: 360, y: 112, width: 200, height: 56, rx: 8, fill: '#DDE1E8', stroke: INK, 'stroke-width': 4 });
const smpL = tx(ck, 460, 92, 'Silicon block', { 'text-anchor': 'middle' });
const ASD = [[384, 128], [420, 152], [456, 126], [494, 150], [530, 130]].map(([x, y]) => mk(ck, 'circle', { cx: x, cy: y, r: 6, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 }));
const knob = mk(ck, 'circle', { cx: 460, cy: 316, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), kPtr = W(ck, '', { 'stroke-width': 5, stroke: AM });
const kT = mono(ck, 460, 248, 'ARSENIC DIAL', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: INK });
const kL = [mono(ck, 398, 392, 'PURE', { 'text-anchor': 'end', 'font-size': 17, 'font-weight': 600 }), mono(ck, 522, 392, '1 : 10 000 000', { 'font-size': 17, 'font-weight': 600, fill: '#B7791F' })];
const eB = flow(ck, [[150, 318], [150, 470], [800, 470], [800, 140], [150, 140], [150, 282]], 24, { skip: (x, y) => (y < 145 && x > 356 && x < 564) });
const SC = scope($('#scS'), 592, 200), trI = SC.tr(VI), sLab = SC.lab(14, 26, 'I · CURRENT', '#B9A6F2');
$('#ro1').innerHTML = `<span class="k" style="color:${AM}">n<sub>e</sub></span><span class="v" id="rE" style="color:${AM}"></span><span class="u"></span>
  <span class="k" style="color:${OR}">n<sub>h</sub></span><span class="v" id="rH" style="color:${OR}"></span><span class="u"></span>
  <span class="k" id="rPk" style="color:${INK}">n<sub>e</sub>n<sub>h</sub></span><span class="v" id="rP" style="color:${INK}"></span><span class="u"></span>`;
const tDial = wt('B4', 'dope') - 0.1, tWatch = wt('B5', 'Watch'), tB7 = wt('B7', 'holes');
const ni = 1.5e16, ND1 = 5e21;
const frac = t => M.io((t - tDial) / 3.0);
const ND = t => t < tDial ? 0 : ND1 * Math.pow(10, -12 * (1 - frac(t)));
const nE = t => { const d = ND(t); return d / 2 + Math.sqrt(d * d / 4 + ni * ni); }, nH = t => ni * ni / nE(t);
const Isc = τ => 5 + 150 * nE(τ) / ND1;
const avB = PUC.avatar($('#sB'), { x: 192, y: 762, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Wait, the holes went down?' });

/* ================= M: mass action law ================= */
const mLS = $('#mLS');
const piv = mk(mLS, 'path', { d: 'M392,282 L340,356 H444 Z', fill: INK });
const ground = W(mLS, 'M90,358 H694', { 'stroke-width': 4, stroke: '#B8BCC6' });
const plank = mk(mLS, 'g'), plankR = mk(plank, 'g'), plk = W(plankR, 'M102,276 H682', { 'stroke-width': 10 });
const sE = [...Array(7)].map((_, k) => dot(plankR, 126 + k * 24, 254 - (k % 2) * 20, 11)), sH = [hole(plankR, 626, 256, 11), hole(plankR, 652, 238, 11)];
const sEL = sub(mLS, 160, 110, 'n', 'e', { fill: AM, 'font-size': 34 }), sHL = sub(mLS, 584, 110, 'n', 'h', { fill: OR, 'font-size': 34 });
const sEA = mk(mLS, 'path', { d: 'M226,82 l-14,22 h28 Z', fill: AM }), sHA = mk(mLS, 'path', { d: 'M650,104 l-14,-22 h28 Z', fill: OR });
const RC = [200, 392, 584].map(x => ({ e: dot(mLS, x, 446, 10), h: hole(mLS, x, 506, 11), f: mk(mLS, 'circle', { cx: x, cy: 506, r: 10, fill: '#C9CDD6' }), x }));
const rcL = mono(mLS, 392, 568, 'electron + hole → both are gone', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: INK });
$('#mF').innerHTML = K(`${NE}\\,${NH} = n_i^{2}`);
const tSee = wt('M1', 'seesaw'), tFall = wt('M2', 'fall'), tRec = wt('M3', 'recombination'), tRule = wt('M4', 'rule'), tMass = wt('M5', 'mass'), tPD = wt('M5', 'pure');

/* ================= W: worked example ================= */
const wS = $('#wS');
const GR = []; for (let j = 0; j < 6; j++) for (let i = 0; i < 14; i++) if (!(i === 9 && j === 2)) GR.push(mk(wS, 'circle', { cx: 60 + i * 28, cy: 96 + j * 28, r: 5, fill: '#C9CDD6' }));
const wAs = mk(wS, 'circle', { cx: 60 + 9 * 28, cy: 96 + 2 * 28, r: 9, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 });
const wGL = [tx(wS, 470, 128, '1 arsenic atom', { fill: '#B7791F', 'font-size': 24 }), mono(wS, 470, 160, 'per 10 000 000 silicon', { 'font-size': 18 }), mono(wS, 470, 190, '(not to scale)', { 'font-size': 16, fill: '#9AA0AC' })];
const LB = [['n', 'e', AM, 5, 21, 21.7], ['n', 'i', INK, 1.5, 16, 16.18], ['n', 'h', OR, 4.5, 10, 10.65]];
const wBars = LB.map(([b, s, col, m, e, lg], i) => { const y = 300 + i * 66;
  return { lab: sub(wS, 40, y + 10, b, s, { fill: col, 'font-size': 28 }), bar: mk(wS, 'rect', { x: 100, y: y - 14, width: 0, height: 28, rx: 6, fill: col === INK ? '#9AA0AC' : col }), w: lg * 20, val: sci(wS, 0, y + 8, String(m), String(e), { fill: col === INK ? INK : col === AM ? '#B7791F' : col }) }; });
const wAx = [W(wS, 'M100,470 H560', { 'stroke-width': 2.5, stroke: '#9AA0AC' }), mono(wS, 100, 494, '1', { 'font-size': 15 }), mono(wS, 300, 494, '10', { 'font-size': 15 }), mono(wS, 500, 494, '10', { 'font-size': 15 }), mono(wS, 100, 522, 'log scale: each step ×10', { 'font-size': 15, fill: '#9AA0AC' })];
[[323, '10'], [523, '20']].forEach(([x, e]) => { const s = mono(wS, x, 486, e, { 'font-size': 11 }); wAx.push(s); });
[300, 500].forEach(x => wAx.push(W(wS, `M${x},464 V476`, { 'stroke-width': 2.5, stroke: '#9AA0AC' })));
const wRows = steps($('#wSteps'), [
  [K(`N_{Si} = 5\\times10^{28}\\,\\text{m}^{-3}`), 'silicon atoms', 76],
  [K(`N_D = \\dfrac{5\\times10^{28}}{10^{7}} = 5\\times10^{21}\\,\\text{m}^{-3}`), '', 138],
  [K(`${NE} \\approx N_D = 5\\times10^{21}\\,\\text{m}^{-3}`), '', 232],
  [K(`${NH} = \\dfrac{n_i^{2}}{${NE}}`), 'mass action law', 296],
  [K(`n_i^{2} = (1.5\\times10^{16})^{2} = 2.25\\times10^{32}`), '', 384],
  [K(`${NH} = \\dfrac{2.25\\times10^{32}}{5\\times10^{21}}`), '', 448],
  [K(`${NH} = 4.5\\times10^{10}\\,\\text{m}^{-3}`), '', 536]]);
const wBox = $('#wBox'); wBox.style.top = '520px'; wBox.style.height = '76px';
const tWs = [wt('W2', 'Silicon'), wt('W3', 'One'), wt('W4', 'Each'), wt('W5', 'Holes:'), wt('W6', 'Square'), wt('W7', 'Divide'), wt('W7b', 'n')];
const tW8 = wt('W8', 'Electrons');

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'n-type silicon is negatively charged', right: 'Neutral: one + ion for each free electron', y0: 96, y1: 184 });
const tcS = $('#tcS');
const ion = mk(tcS, 'circle', { cx: 150, cy: 150, r: 38, fill: '#FFF4D6', stroke: AM, 'stroke-width': 3 }), ionT = tx(tcS, 150, 158, 'As', { 'text-anchor': 'middle', 'font-size': 24 });
const ionP = tx(tcS, 182, 122, '+', { 'font-size': 30, fill: OR, 'font-weight': 700 });
const xE = dot(tcS, 0, 0, 10), xEm = tx(tcS, 0, 0, '-', { 'text-anchor': 'middle', 'font-size': 26, fill: INK, 'font-weight': 700 });
const ionL = [mono(tcS, 150, 228, 'fixed ion  +1', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: OR }), mono(tcS, 330, 228, 'free electron  -1', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: '#B7791F' })];
const sumT = tx(tcS, 480, 140, 'total charge = 0', { 'font-size': 30, fill: '#1F6B3F' }), sumS = mono(tcS, 480, 176, 'the crystal is neutral', { 'font-size': 18 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS', 'JEE MAIN'], type: 'Doping, majority and minority carriers · mass action law (JEE Main, 25 Jul 2021, Shift 2)' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '25px');

/* ================= Q: practice question ================= */
const m3 = 'm<sup>-3</sup>';
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `Germanium has n<sub>i</sub> = 2.4 × 10<sup>19</sup>&nbsp;${m3}. It is doped with indium atoms at 4.8 × 10<sup>21</sup>&nbsp;${m3}. Which statement is correct?`, qW: 780,
  opts: [K(`\\text{p-type, } n_e = 1.2\\times10^{17}\\,\\text{m}^{-3}`), K(`\\text{n-type, } n_e = 1.2\\times10^{17}\\,\\text{m}^{-3}`), K(`\\text{p-type, } n_e = 2.4\\times10^{19}\\,\\text{m}^{-3}`), K(`\\text{n-type, } n_e = 4.8\\times10^{21}\\,\\text{m}^{-3}`)], right: 0, cols: 1, optW: 760, optH: 70, optY: 300, optFs: 28 });
const sol = PUC.solution($('#so'), [[K(`\\text{In: trivalent} \\Rightarrow \\text{p-type}`)], [K(`${NH} \\approx N_A = 4.8\\times10^{21}`)],
  [K(`${NE} = \\dfrac{n_i^{2}}{${NH}} = \\dfrac{5.76\\times10^{38}}{4.8\\times10^{21}}`)], [K(`${NE} = 1.2\\times10^{17}\\,\\text{m}^{-3}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Indium'), wt('A3', 'n'), wt('A4', 'n'), wt('A4', 'gives')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 214, w: 1100, h: 552, y0: 90, dy: 88, title: 'Intrinsic and extrinsic · fact card', txt: [1, 0, 1, 1, 0],
  lines: ['Intrinsic (pure): each free electron leaves one hole',
    K(`${NE} = ${NH} = n_i \\qquad \\text{Si, room temp: } n_i \\approx 1.5\\times10^{16}\\,\\text{m}^{-3}`),
    'n-type: pentavalent donor (P, As, Sb). Electrons are the majority',
    'p-type: trivalent acceptor (B, Al, In). Holes are the majority',
    K(`${NE}\\,${NH} = n_i^{2} \\qquad \\text{doped crystal stays neutral}`)] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 40', topic: 'The p-n junction and depletion layer', y: 796 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tHop - 0.5, 1.1, 1300, 560], [T0('L11') - 0.2, 1, 960, 540], [tWatch - 0.3, 1.08, 1300, 480], [T0('B6') + 0.3, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const nc = $('#nchip'), nc2 = $('#nchip2');
const pos = (e, x, y) => { mv(e, x, y); };

M.on(t => {
  cam(t); head(t); sweep(t);
  { const cw = nc.offsetWidth, c2 = nc2.offsetWidth, tot = cw + 16 + c2, m = M.spring(t - tMorph, M.HEAVY);
    const x = M.lerp(960 - tot / 2, 160, m); nc.style.left = x.toFixed(2) + 'px'; nc2.style.left = (x + cw + 16).toFixed(2) + 'px'; nc2.style.top = nc.style.top;
    M.vis(nc2, t, 0.25, 1e9, { dy: 18 }); }
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.5, tM - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (t < tB || t >= tM) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tL + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tL - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#h1C'), t, T0('H2') - 0.2, out, { dx: 60, dy: 0, ...o }); fadeAt(h1, t, T0('H2'), 0.1);
    M.vis($('#h1B'), t, tPure - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#h1T'), t, tPure + 0.3, 1e9, { dy: 10 });
    spark.forEach((s, i) => M.vis(s, t, tPure + 0.2 + i * 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }));
    M.vis($('#h2C'), t, T0('H3') - 0.1, out, { dy: 36, ...o }); fadeAt(h2, t, T0('H3') + 0.1, 0.1);
    IMP.forEach((d, i) => { const u = M.io((t - tAdds - i * 0.18) / 0.5); M.hide(d, u <= 0); PUC.attr(d, 'transform', `translate(0,${(-70 * (1 - u)).toFixed(1)})`); });
    M.vis($('#h2B'), t, tPurp - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#h2T'), t, T0('I1'), 1e9, { dy: 10 });
    M.vis($('#h2P'), t, wt('I2', 'useful') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* L: holding hands + crystal */
  const lOn = t >= tL - 0.05 && t < tP + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tP - 0.32;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, T0('L3') - 0.1, out, { dx: 60, dy: 0, ...o });
    fadeAt(heads, t, tL + 0.3, 0.08); drawSeq(bodies, t, tL + 0.4, 0.3, 0.08); drawSeq([...arms, ...armsO], t, tHold - 0.1, 0.25, 0.1);
    M.vis(handL, t, tNob, 1e9, { dy: 8 });
    [[tSi, 'mpA'], [wt('L4', 'covalent'), 'mpB'], [tHoleL, 'mpC']].forEach(([a, id]) => M.vis($('#' + id), t, a, tCin - 0.6, { dx: -14, dy: 0, outDur: 0.25, ody: 0 }));
    // cinema row (L11): the empty seat moves left as people shift right
    M.vis($('#lLb'), t, tCin - 0.4, 1e9, { dy: 8 }); fadeAt(SEAT, t, tCin - 0.3, 0.04); fadeAt(PEO, t, tCin - 0.1, 0.04);
    const sh = Math.max(0, (t - tCin - 0.6) / 0.45); let empty = 6;
    PEO.forEach((p, i) => { const k = 5 - i; const u = M.io(M.clamp(sh - k)); PUC.attr(p, 'cx', (94 + i * 98 + 98 * u).toFixed(1)); });
    empty = 6 - Math.min(6, Math.floor(sh + 0.5));
    SEAT.forEach((s, i) => { PUC.attr(s, 'stroke', i === empty && t > tCin + 0.3 ? OR : '#B8BCC6'); });
    fadeAt(cinL, t, tCin + 0.8, 0.4);
    // crystal
    LT.atoms.forEach((a, i) => { M.vis(a.g, t, tSi - 0.3 + i * 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      const j = t > tWarm ? 1.6 : 0; PUC.attr(a.ci, 'transform', `translate(${(j * Math.sin(t * 13 + i * 1.7)).toFixed(2)},${(j * Math.cos(t * 11 + i)).toFixed(2)})`); });
    drawSeq(LT.bonds.map(b => b.l), t, tShare - 0.2, 0.25, 0.04); drawSeq(LT.stubs, t, tShare, 0.2, 0.02);
    fadeAt(LT.eAll, t, wt('L4', 'covalent') - 0.4, 0.012);
    M.vis(tempL, t, tWarm, 1e9, { dy: 0, fade: 0.2 });
    // break one bond: e[0] of h11 frees itself and wanders in the cell above
    const [bx, by] = bBrk.p[0]; const fu = M.io((t - tFree) / 0.8), wan = Math.max(0, t - tFree - 0.8);
    if (t >= tFree) M.hide(bBrk.e[0], true); M.hide(freeE, t < tFree);
    const cx = 392 + 44 * Math.sin(wan * 1.3), cy = 215 + 22 * Math.sin(wan * 2.1);
    mv(freeE, fu < 1 ? bx + (392 - bx) * fu : cx, fu < 1 ? by + (215 - by) * fu : cy);
    PUC.attr(bBrk.l, 'stroke', t > tLoose - 0.2 && t < tFree ? (Math.sin(t * 30) > 0 ? RED : '#C9CDD6') : '#C9CDD6');
    // hole: at the broken bond until the hop, then where the hopping electron was
    const [hx0, hy0] = bBrk.p[0], [hx1, hy1] = bHop.p[1], hu = M.io((t - tHop) / 0.7);
    M.hide(lHole, t < tHoleL - 0.1); const hx = t < tHop ? hx0 : hx1, hy = t < tHop ? hy0 : hy1;
    mv(lHole, hx, hy); PUC.attr(lPlus, 'x', hx); PUC.attr(lPlus, 'y', hy + 6); M.hide(lPlus, t < tPos - 0.1);
    lHole.style.opacity = lPlus.style.opacity = (t < tHop ? 1 : Math.min(1, (t - tHop - 0.5) / 0.2)).toFixed(3);
    // hopping electron
    const he = bHop.e[1]; mv(he, hx1 + (hx0 - hx1) * hu, hy1 + (hy0 - hy1) * hu);
    const au = M.io((t - tMoved) / 0.4); aE.set(340, 236, 340 + 30 * au, 236 + 30 * au); aH.set(372, 262, 372 - 30 * au, 262 - 30 * au);
    M.vis(hopL, t, tMoved + 0.2, 1e9, { dy: 0, fade: 0.2 });
  }

  /* P: intrinsic counts */
  const pOn = t >= tP - 0.05 && t < tD + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tD - 0.32;
    M.vis($('#pL'), t, tP + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP5 - 0.2, out, { dx: 60, dy: 0, ...o });
    fadeAt(pLab, t, tP + 0.2, 0.1); M.draw(pDiv, t, tP + 0.3, 0.4);
    let n = 0; PE.forEach((d, k) => { const tk = tPairs + k * 0.5; M.vis(d, t, tk, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(PH[k], t, tk + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); if (t >= tk + 0.1) n = k + 1; });
    pN.forEach(e => { M.setT(e, String(n)); M.vis(e, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis($('#pBox'), t, tP3 - 0.2, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#pF'), t, tP3, 0.8);
    M.vis($('#pPill'), t, tP4 - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.vis($('#pt0'), t, tP5, 1e9, { dy: 24 }); PUC.write($('#pt0v'), t, tP5b, 0.7);
    M.vis($('#pt1'), t, tP6 + 0.6, 1e9, { dy: 24 }); PUC.write($('#pt1v'), t, tP6b, 0.7);
    M.vis($('#pt2'), t, tP7, 1e9, { dy: 24 }); M.vis($('#pPoor'), t, tP7b - 0.2, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* D: doping */
  const dOn = t >= tD - 0.05 && t < tT + 0.02; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dL'), t, tDope - 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#dR'), t, tIn - 0.3, 1e9, { dx: 60, dy: 0 });
    M.vis($('#dT0'), t, tExt, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#dT1'), t, tIn, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    [[dn, T0('D2') + 0.2], [dp, tIn - 0.1]].forEach(([c, t0]) => { c.L.atoms.forEach((a, i) => M.vis(a.g, t, t0 + i * 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
      drawSeq([...c.L.bonds.map(b => b.l), ...c.L.stubs], t, t0 + 0.3, 0.2, 0.02); fadeAt(c.L.eAll, t, t0 + 0.6, 0.01); });
    M.hide(pB.e[0], true);
    // dopant atom lights at its name
    [[dn, tAs, AM], [dp, tIn, OR]].forEach(([c, ta, col]) => { const u = M.io((t - ta) / 0.3); c.c.ci.style.strokeWidth = (3 + 2 * u).toFixed(2); });
    M.vis($('#dL0'), t, tPent - 0.1, 1e9, { dy: 10 }); M.vis($('#dL1'), t, tDon - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#dL2'), t, tNmaj - 0.1, 1e9, { dy: 10 });
    // 5th electron: near As, then free in the cell up-right
    M.hide(e5, t < tFifth - 0.2); const fu = M.io((t - tPush - 0.3) / 0.7), wn = Math.max(0, t - tPush - 1.0);
    const fx = 218 + 22 * fu + (fu >= 1 ? 18 * Math.sin(wn * 1.6) : 0), fy = 148 + 22 * (1 - fu) - 10 + (fu >= 1 ? 12 * Math.sin(wn * 2.3) : 0);
    mv(e5, fx, fy); M.vis(e5L, t, tFifth, 1e9, { dy: 0, fade: 0.2 }); e5.style.opacity = t < tFifth - 0.2 ? 0 : 1;
    PUC.attr(e5, 'r', (7 + 2 * Math.max(0, Math.sin((t - tFifth) * 6)) * (t > tFifth && t < tFifth + 1.2 ? 1 : 0)).toFixed(2));
    // n-type band picture
    fadeAt(dn.band, t, tPush - 0.6, 0.02); M.draw(dLev, t, tPush - 0.2, 0.5); M.vis(dLevL, t, tPush + 0.2, 1e9, { dy: 0, fade: 0.2 });
    DE.forEach((d, k) => { const u = M.io((t - tDon + 0.2 - k * 0.15) / 0.5); M.vis(d, t, tPush, 1e9, { dy: 0, fade: 0.2 }); mv(d, 512 + k * 60 + 20 * u, 176 - 50 * u); });
    M.vis(dLevL2, t, tPush + 0.5, 1e9, { dy: 0, fade: 0.2 });
    // p-type
    M.vis($('#dR0'), t, tTri - 0.1, 1e9, { dy: 10 }); M.vis($('#dR1'), t, tAcc - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#dR2'), t, tPmaj - 0.1, 1e9, { dy: 10 });
    const pu = M.io((t - tAcc - 0.2) / 0.6), [hx, hy] = pB.p[0], [ex, ey] = pFill.p[1];
    M.vis(ph, t, tMiss - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); PUC.attr(ph, 'r', (6.5 + 2.5 * Math.max(0, Math.sin((t - tMiss) * 6)) * (t > tMiss && t < tMiss + 1.2 ? 1 : 0)).toFixed(2));
    mv(pFe, ex + (hx - ex) * pu, ey + (hy - ey) * pu); mv(ph, pu < 1 ? hx : ex, pu < 1 ? hy : ey);
    fadeAt(dp.band, t, tAcc - 0.5, 0.02); M.draw(aLev, t, tAcc - 0.2, 0.5); M.vis(aLevL, t, tAcc + 0.1, 1e9, { dy: 0, fade: 0.2 });
    AE.forEach((d, k) => { const u = M.io((t - tAcc - 0.4 - k * 0.15) / 0.5); M.hide(d, u <= 0); mv(d, 509 + k * 52, 312 - 54 * u); if (u > 0) M.hide(dp.VE[1 + k * 2], true); });
    AH.forEach((h, k) => M.hide(h, t < tAcc + 0.5 + k * 0.15));
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tB; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tB - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'brings') - 0.05, { out: tB - 0.35, outDur: 0.25 }); }

  /* B: breadboard doping test */
  const bOn = t >= tB - 0.05 && t < tM + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(ckW, t, tB + 0.4, 0.45, 0.2); drawSeq(bat, t, tB + 0.6, 0.25, 0.1); fadeAt(batL, t, wt('B2', 'battery') - 0.2, 0.06);
    M.vis(smp, t, wt('B2', 'block') - 0.2, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.15 }); M.vis(smpL, t, wt('B2', 'silicon') - 0.1, 1e9, { dy: 8 });
    fadeAt([knob, kT, ...kL], t, T0('B3'), 0.08);
    const f = t < tDial ? 0 : frac(t), ang = (-130 + 260 * f) * Math.PI / 180;
    PUC.attr(kPtr, 'd', `M460,316 L${(460 + 36 * Math.sin(ang)).toFixed(1)},${(316 - 36 * Math.cos(ang)).toFixed(1)}`); M.vis(kPtr, t, T0('B3'), 1e9, { dy: 0, fade: 0.2 });
    ASD.forEach((d, i) => M.vis(d, t, tDial + 0.4 + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }));
    const v = τ => 3 + 140 * nE(τ) / ND1;
    let off = 0; { const a = T0('B3'), n = 40, b = t; if (b > a) { const dt = (b - a) / n; for (let k = 0; k < n; k++) off += v(a + (k + 0.5) * dt) * dt; } }
    eB.set(off, t >= T0('B3') - 0.1);
    M.vis(sLab, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    trI(Isc, t, wt('B3', 'scope') - 1, 8, 186, t >= wt('B3', 'scope') - 0.6);
    M.vis($('#ro1'), t, wt('B6', 'readout') - 0.2, 1e9, { dy: 12 });
    setH($('#rE'), fmtS(nE(t))); setH($('#rH'), fmtS(nH(t))); setH($('#rP'), fmtS(nE(t) * nH(t), 2));
    const pk = [$('#rPk'), $('#rP')]; pk.forEach(e => M.vis(e, t, tB7 + 0.3, 1e9, { dy: 0, fade: 0.2 }));
    $('#rH').style.background = t > tB7 - 0.2 && t < tB7 + 1.4 ? '#FBE6E6' : 'transparent';
    avB(t, tB7 - 0.1, out);
  }

  /* M: mass action law */
  const mOn = t >= tM - 0.05 && t < tW + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tW - 0.32;
    M.vis($('#mL'), t, tM + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tRule - 0.4, out, { dx: 60, dy: 0, ...o });
    fadeAt([ground, piv], t, tM + 0.3, 0.1); M.vis(plank, t, tSee - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const tilt = 12 * M.io((t - tSee - 0.6) / 0.9); PUC.attr(plankR, 'transform', `rotate(${tilt.toFixed(2)} 392 276)`);
    fadeAt([sEL, sEA], t, tSee + 0.6, 0.1); fadeAt([sHL, sHA], t, tSee + 1.0, 0.1);
    M.vis($('#mLb'), t, tFall - 0.4, 1e9, { dy: 8 });
    RC.forEach((r, i) => { const t0 = tFall + i * 0.7, u = M.io((t - t0) / 0.6), gone = M.io((t - t0 - 0.6) / 0.3);
      M.vis(r.h, t, tFall - 0.3 + i * 0.1, 1e9, { dy: 0, fade: 0.15 }); M.vis(r.e, t, tFall - 0.3 + i * 0.1, 1e9, { dy: 0, fade: 0.15 });
      mv(r.e, r.x, 446 + 60 * u); r.e.style.opacity = r.h.style.opacity = (t < tFall - 0.3 ? 0 : 1 - gone).toFixed(3); r.f.style.opacity = gone.toFixed(3); });
    M.vis(rcL, t, tRec, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#mBox'), t, tRule - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#mF'), t, wt('M4', 'n'), 0.9);
    M.vis($('#mt0'), t, T1('M4') - 0.3, 1e9, { dy: 20 });
    M.vis($('#mP0'), t, tPD - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#mP1'), t, wt('M5', 'doped') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.vis($('#mS'), t, T1('M5') - 0.4, 1e9, { dy: 10 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wL'), t, tW + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#wR'), t, tW + 0.25, 1e9, { dx: 60, dy: 0 });
    fadeAt(GR, t, tW + 0.4, 0.006); M.vis(wAs, t, tWs[1], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); fadeAt(wGL, t, tWs[1] + 0.3, 0.2);
    fadeAt(wAx, t, tWs[2] - 0.3, 0.03);
    const tb = [tWs[2], tWs[4] - 0.4, tWs[6]];
    wBars.forEach((b, i) => { M.vis(b.lab, t, tb[i] - 0.2, 1e9, { dy: 0, fade: 0.2 }); const u = M.io((t - tb[i]) / 0.7);
      PUC.attr(b.bar, 'width', (b.w * u).toFixed(1)); PUC.attr(b.val, 'x', (100 + b.w * u + 12).toFixed(1)); M.vis(b.val, t, tb[i] + 0.5, 1e9, { dy: 0, fade: 0.2 }); });
    runSteps(wRows, t, tWs);
    M.vis($('#wBox'), t, tWs[6] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#wRatio'), t, tW8, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Each') - 0.1 });
    fadeAt([ion, ionT], t, tX + 0.6, 0.1); M.vis(ionP, t, wt('X3', 'positive') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 });
    const xu = Math.max(0, t - tX - 0.8), ex = 330 + 26 * Math.sin(xu * 1.4), ey = 150 + 18 * Math.sin(xu * 2.2);
    mv(xE, ex, ey); PUC.attr(xEm, 'x', ex.toFixed(1)); PUC.attr(xEm, 'y', (ey - 16).toFixed(1)); M.vis(xE, t, tX + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(xEm, t, tX + 0.8, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(ionL, t, wt('X3', 'positive') + 0.2, 0.3); M.vis(sumT, t, wt('X3', 'neutral') - 0.2, 1e9, { dy: 10 }); M.vis(sumS, t, wt('X3', 'neutral') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC'), wt('X4', 'CBSE'), wt('X4', 'ISC'), wt('X5', 'JEE')], tType: wt('X4', 'doping') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
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
