// PUC Electronics Ep 38 - Energy bands: conductors, insulators and semiconductors ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, holes hollow orange, I violet, V teal, energy / band gap E_g gold, temperature red, R ink
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'charger') - 0.3;
const tL = T0('L1'), tK = T0('K1'), tT = T0('T1'), tB = T0('B1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tB], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const cbS = $('#cbS');
const plast = mk(cbS, 'rect', { x: 16, y: 22, width: 540, height: 106, rx: 53, fill: '#DCE1EA', stroke: INK, 'stroke-width': 3 });
const core = mk(cbS, 'rect', { x: 40, y: 58, width: 660, height: 34, rx: 17, fill: '#F6DEC2', stroke: INK, 'stroke-width': 3 });
const cutL = W(cbS, 'M556,30 C548,60 548,90 556,120', { 'stroke-width': 3, stroke: '#9AA0AC' });
const PL = []; for (let i = 0; i < 12; i++) for (const y of [38, 112]) PL.push(dot(cbS, 70 + i * 40 + (y > 50 ? 20 : 0), y, 5.5));
const eCore = flow(cbS, [[44, 75], [696, 75]], 16, { r: 6 });
const chipS = $('#chipS'), chipP = [W(chipS, 'M50,45 H150 V145 H50 Z', { 'stroke-width': 5, fill: '#fff' }), W(chipS, 'M78,73 H122 V117 H78 Z', { stroke: AM, 'stroke-width': 4 })];
for (let i = 0; i < 5; i++) { const p = 60 + i * 20; chipP.push(W(chipS, `M${p},45 V31`, { 'stroke-width': 3 }), W(chipS, `M${p},145 V159`, { 'stroke-width': 3 }), W(chipS, `M50,${p} H36`, { 'stroke-width': 3 }), W(chipS, `M150,${p} H164`, { 'stroke-width': 3 })); }
const tCu = wt('H2', 'copper'), tPl = wt('H2', 'plastic'), tCarry = wt('H3', 'carry');

/* ================= L: building analogy + energy bands ================= */
const lLS = $('#lLS');
// building: upper floor (empty), a gap, ground floor (packed)
const bUp = mk(lLS, 'rect', { x: 70, y: 120, width: 440, height: 110, rx: 8, fill: CB_F, stroke: INK, 'stroke-width': 3 });
const bDn = mk(lLS, 'rect', { x: 70, y: 400, width: 440, height: 110, rx: 8, fill: VB_F, stroke: INK, 'stroke-width': 3 });
const bWalls = [W(lLS, 'M70,230 V400', { 'stroke-width': 3, 'stroke-dasharray': '8 10', stroke: '#B8BCC6' }), W(lLS, 'M510,230 V400', { 'stroke-width': 3, 'stroke-dasharray': '8 10', stroke: '#B8BCC6' }),
  W(lLS, 'M50,120 L290,70 L530,120', { 'stroke-width': 3 }), W(lLS, 'M40,510 H540', { 'stroke-width': 4 })];
const bLab = [mono(lLS, 90, 150, 'UPPER FLOOR · EMPTY', { 'font-size': 17, fill: '#B7791F', 'font-weight': 600 }), mono(lLS, 90, 430, 'GROUND FLOOR · PACKED', { 'font-size': 17, 'font-weight': 600 })];
const PPL = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 13; c++) PPL.push(dot(lLS, 100 + c * 32 + (r % 2) * 14, 452 + r * 22, 8));
const jumper = dot(lLS, 290, 452, 9);
const bJump = dArrow(lLS, 528, 236, 394); const bJL = mono(lLS, 300, 322, 'the jump', { 'text-anchor': 'middle', 'font-size': 22, fill: GO, 'font-weight': 600 });
const MP = [0, 1, 2].map(i => $('#mp' + i));
// right: energy bands
const lRS = $('#lRS');
const eAx = PUC.arrow(lRS, INK, 3.5, 14); const eAxL = mono(lRS, 52, 74, 'ENERGY', { 'font-size': 17, 'font-weight': 600 });
const atomLv = [W(lRS, 'M120,160 H230', { 'stroke-width': 4, stroke: '#9AA0AC' }), W(lRS, 'M120,370 H230', { 'stroke-width': 4 })];
const atomE = [dot(lRS, 160, 370, 8), dot(lRS, 190, 370, 8)];
const atomL = mono(lRS, 175, 452, 'ONE ATOM', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 });
const xtalL = mono(lRS, 450, 452, 'A CRYSTAL', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 });
const spr = W(lRS, 'M250,265 H300', { 'stroke-width': 3, stroke: '#B8BCC6' }), sprH = mk(lRS, 'path', { d: 'M310,265 l-14,-8 v16 Z', fill: '#B8BCC6' });
const cbR = mk(lRS, 'rect', { x: 330, y: 120, width: 240, height: 80, rx: 6, fill: CB_F, stroke: CB_S, 'stroke-width': 2.5 });
const vbR = mk(lRS, 'rect', { x: 330, y: 330, width: 240, height: 80, rx: 6, fill: VB_F, stroke: VB_S, 'stroke-width': 2.5 });
const UPL = [...Array(8)].map(() => mk(lRS, 'line', { x1: 340, x2: 560, y1: 160, y2: 160, stroke: '#C9A55A', 'stroke-width': 2 }));
const DNL = [...Array(8)].map(() => mk(lRS, 'line', { x1: 340, x2: 560, y1: 370, y2: 370, stroke: '#8E95A3', 'stroke-width': 2 }));
const VBE = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 10; c++) VBE.push(dot(lRS, 350 + c * 22 + (r % 2) * 10, 354 + r * 32, 7));
const cbT = tx(lRS, 330, 106, 'Conduction band', { 'font-size': 22 }), cbT2 = mono(lRS, 330, 228, 'free to move', { 'font-size': 18, fill: '#B7791F' });
const vbT = tx(lRS, 330, 316, 'Valence band', { 'font-size': 22 }), vbT2 = mono(lRS, 330, 436 - 0, '', { 'font-size': 18 });
const egA = dArrow(lRS, 620, 204, 326); const egL = tx(lRS, 640, 274, 'E', { 'font-size': 30, fill: GO, 'font-style': 'italic' }), egL2 = tx(lRS, 659, 282, 'g', { 'font-size': 18, fill: GO, 'font-style': 'italic' });
const egF = mono(lRS, 640, 306, 'forbidden', { 'font-size': 16, fill: GO });
const freeE = dot(lRS, 380, 160, 7);
$('#eV1').innerHTML = K(`1\\,\\text{eV} = 1.6\\times10^{-19}\\,\\text{J}`);
const tFl = [wt('L1', 'building'), wt('L2', 'ground'), wt('L3', 'upper'), wt('L4', 'jump')];
const tAtom = wt('L6', 'single'), tSpread = wt('L7', 'spreads'), tBand = wt('L8', 'band'), tVB = wt('L9', 'valence'), tCB = wt('L10', 'conduction'), tEg = wt('L11', 'forbidden'), tEv = T0('L12');

/* ================= K: three kinds of solids ================= */
const kC = [0, 1, 2].map(i => $('#k' + i)), kS = kC.map(c => c.querySelector('svg'));
const KB = [ // [cbY, cbH, vbY, vbH]
  [24, 100, 96, 110], [14, 60, 186, 60], [34, 70, 150, 70]];
const kEls = KB.map(([cy, ch, vy, vh], i) => {
  const s = kS[i], o = {};
  o.cb = mk(s, 'rect', { x: 20, y: cy, width: 300, height: ch, rx: 6, fill: CB_F, stroke: CB_S, 'stroke-width': 2.5 });
  o.vb = mk(s, 'rect', { x: 20, y: vy, width: 300, height: vh, rx: 6, fill: i === 0 ? 'rgba(227,230,236,.85)' : VB_F, stroke: VB_S, 'stroke-width': 2.5 });
  o.lc = mono(s, 30, cy + 24, 'CB', { 'font-size': 16, 'font-weight': 600, fill: '#B7791F' });
  o.lv = mono(s, 30, vy + vh - 10, 'VB', { 'font-size': 16, 'font-weight': 600 });
  o.e = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 9; c++) o.e.push(dot(s, 70 + c * 27 + (r % 2) * 12, vy + vh * (r ? 0.66 : 0.34), 6.5));
  if (i === 0) { o.ov = mk(s, 'rect', { x: 20, y: vy, width: 300, height: cy + ch - vy, fill: 'rgba(232,163,23,.18)' }); o.ovL = mono(s, 330, (vy + cy + ch) / 2 + 6, 'overlap', { 'font-size': 17, fill: '#B7791F', 'font-weight': 600 });
    o.f = flow(s, [[40, 110], [300, 110]], 7, { r: 6.5 }); }
  else { o.a = dArrow(s, 362, cy + ch + 4, vy - 4); o.al = tx(s, 380, (cy + ch + vy) / 2 + 10, i === 1 ? 'huge' : 'small', { 'font-size': 20, fill: GO }); }
  if (i === 2) { o.j = [dot(s, 120, cy + 36, 6.5), dot(s, 230, cy + 46, 6.5)]; o.h = [hole(s, 124, vy + 24, 6.5), hole(s, 232, vy + 46, 6.5)]; }
  return o; });
// the semiconductor's two jumped electrons sit where the band electrons were
kEls[2].e.forEach((d, k) => { if (k === 3 || k === 13) M.hide(d, true); });
kC[0].querySelector('.eg').innerHTML = K(`\\textcolor{${GO}}{E_g} = 0`);
kC[1].querySelector('.eg').innerHTML = K(`\\textcolor{${GO}}{E_g} = 5.4\\,\\text{eV}`);
kC[2].querySelector('.eg').innerHTML = K(`\\text{Si } 1.1\\,\\text{eV}\\quad \\text{Ge } 0.7\\,\\text{eV}`);
const RHO = [['10<sup>-8</sup> to 10<sup>-2</sup>'], ['10<sup>11</sup> to 10<sup>19</sup>'], ['10<sup>-5</sup> to 10<sup>6</sup>']];
kC.forEach((c, i) => c.querySelector('.rho').innerHTML = `<b style="font-style:italic;font-family:Poppins">ρ</b> ≈ ${RHO[i][0]} Ω m`);
const tKc = [wt('K2', 'conductor'), wt('K4', 'insulator'), wt('K7', 'semiconductor')];
const tKg = [wt('K3', 'There'), wt('K5', 'five'), wt('K8', 'one')], tKr = [wt('K3', 'Electrons'), wt('K6', 'Any'), wt('K7', 'less')];
const tRho = [wt('K9', 'tiny'), wt('K9', 'enormous'), wt('K9', 'middling')];

/* ================= B: breadboard heat test ================= */
const ck = $('#ckS');
const ckW = [W(ck, 'M150,282 V140 H360'), W(ck, 'M560,140 H800 V470 H150 V318')];
const bat = [W(ck, 'M115,282 H185', { 'stroke-width': 5 }), W(ck, 'M132,318 H168', { 'stroke-width': 9 })];
const batL = [tx(ck, 64, 278, '+', { 'font-size': 28 }), tx(ck, 68, 336, '-', { 'font-size': 30 }), tx(ck, 202, 296, 'Battery'), mono(ck, 202, 324, '3 V')];
const smp = mk(ck, 'rect', { x: 360, y: 112, width: 200, height: 56, rx: 8, fill: '#F6DEC2', stroke: INK, 'stroke-width': 4 });
const smpL = tx(ck, 460, 92, 'Copper wire', { 'text-anchor': 'middle' }), smpL2 = tx(ck, 460, 92, 'Pure silicon', { 'text-anchor': 'middle' });
const htr = W(ck, 'M370,236 L386,216 L402,236 L418,216 L434,236 L450,216 L466,236 L482,216 L498,236 L514,216 L530,236 L546,216 L552,226', { stroke: RED, 'stroke-width': 4 });
const htrL = mono(ck, 460, 272, 'heater', { 'text-anchor': 'middle', fill: RED });
const waves = [0, 1, 2].map(i => W(ck, `M${410 + i * 50},206 c-8,-8 8,-14 0,-22`, { stroke: RED, 'stroke-width': 3 }));
const eB = flow(ck, [[150, 318], [150, 470], [800, 470], [800, 140], [150, 140], [150, 282]], 24, { skip: (x, y) => (y < 145 && x > 356 && x < 564) });
// scope: current I against time (violet)
const SC = scope($('#scS'), 592, 200), trI = SC.tr(VI), sLab = SC.lab(14, 26, 'I · CURRENT', '#B9A6F2');
// readout + mini band view
$('#ro1').innerHTML = `<span class="k" style="color:${RED}">θ</span><span class="v" id="rT" style="color:${RED}">25</span><span class="u">°C</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u" id="rIu">A</span>`;
const rbS = $('#rbS');
const mCuC = mk(rbS, 'rect', { x: 10, y: 10, width: 220, height: 92, rx: 6, fill: CB_F, stroke: CB_S, 'stroke-width': 2 }), mCuV = mk(rbS, 'rect', { x: 10, y: 80, width: 220, height: 92, rx: 6, fill: 'rgba(227,230,236,.85)', stroke: VB_S, 'stroke-width': 2 });
const mCuF = flow(rbS, [[24, 96], [216, 96]], 6, { r: 6 }), mCuE = []; for (let c = 0; c < 8; c++) mCuE.push(dot(rbS, 30 + c * 26, 140, 6));
const mCu = [mCuC, mCuV, ...mCuE];
const mSiC = mk(rbS, 'rect', { x: 10, y: 10, width: 220, height: 56, rx: 6, fill: CB_F, stroke: CB_S, 'stroke-width': 2 }), mSiV = mk(rbS, 'rect', { x: 10, y: 120, width: 220, height: 56, rx: 6, fill: VB_F, stroke: VB_S, 'stroke-width': 2 });
const mSiA = dArrow(rbS, 252, 70, 116), mSiAL = mono(rbS, 244, 100, '', { 'font-size': 15 });
const SIE = [], SIH = [], NJ = 7; for (let c = 0; c < 8; c++) { SIE.push(dot(rbS, 30 + c * 26, 148, 6)); }
for (let k = 0; k < NJ; k++) SIH.push(hole(rbS, 30 + [1, 4, 6, 2, 7, 0, 5][k] * 26, 148, 6));
const SIJ = [...Array(NJ)].map(() => dot(rbS, 0, 0, 6));
const mSi = [mSiC, mSiV, mSiA];
// temperature and current models (EXAMPLE FIGURES): copper R rises 0.39 % per degree; pure silicon carriers ~ T^1.5 exp(-Eg / 2kT)
const tHeat1 = wt('B4', 'warms') - 0.3, tSwap = wt('B5', 'swap'), tHeat2 = wt('B7', 'heat'), tB11 = T0('B11');
const th = t => t < tSwap ? 25 + 75 * M.io((t - tHeat1) / 3.0) : 25 + 75 * M.io((t - tHeat2) / 6.5);
const cuI = θ => 2 / (1 + 0.0039 * (θ - 25));
const siR = θ => { const T = θ + 273, T0k = 298; return Math.pow(T / T0k, 1.5) * Math.exp(6383 * (1 / T0k - 1 / T)); };
const siI = θ => 0.5 * siR(θ); // microamperes
const Iscope = τ => τ < tSwap ? 150 * cuI(th(τ)) / 2 : 6 + 150 * siI(th(τ)) / 55;
const avB = PUC.avatar($('#sB'), { x: 192, y: 762, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Warm silicon conducts better. Cool!' });

/* ================= W: worked example ================= */
const wS = $('#wS');
const wCB = mk(wS, 'rect', { x: 260, y: 90, width: 320, height: 80, rx: 6, fill: CB_F, stroke: CB_S, 'stroke-width': 2.5 });
const wVB = mk(wS, 'rect', { x: 260, y: 300, width: 320, height: 80, rx: 6, fill: VB_F, stroke: VB_S, 'stroke-width': 2.5 });
const wLab = [mono(wS, 270, 82, 'CONDUCTION BAND', { 'font-size': 16, 'font-weight': 600, fill: '#B7791F' }), mono(wS, 270, 404, 'VALENCE BAND', { 'font-size': 16, 'font-weight': 600 })];
const wE = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 11; c++) wE.push(dot(wS, 280 + c * 27 + (r % 2) * 12, 322 + r * 36, 7));
const wJ = dot(wS, 0, 0, 8), wH = hole(wS, 0, 0, 7);
const wEg = dArrow(wS, 630, 174, 296), wEgL = tx(wS, 648, 236, '1.1 eV', { fill: GO, 'font-size': 24 });
const wPh = W(wS, '', { stroke: GO, 'stroke-width': 4 }), wPhH = mk(wS, 'path', { d: '', fill: GO });
const wPhL = mono(wS, 60, 200, 'light', { 'font-size': 20, fill: GO, 'font-weight': 600 });
// wavelength ruler 400 nm .. 1300 nm
const RX = v => 60 + 640 * (v - 400) / 900;
const ruler = [W(wS, `M${RX(400)},500 H${RX(1300)}`, { 'stroke-width': 3 })];
[400, 700, 1000, 1300].forEach(v => { ruler.push(W(wS, `M${RX(v)},492 V508`, { 'stroke-width': 3 })); });
const rLab = [400, 700, 1000, 1300].map(v => mono(wS, RX(v), 536, String(v), { 'text-anchor': 'middle', 'font-size': 17 }));
const visB = mk(wS, 'rect', { x: RX(400), y: 462, width: RX(700) - RX(400), height: 26, rx: 5, fill: '#EEF0F4' }), visL = mono(wS, (RX(400) + RX(700)) / 2, 481, 'VISIBLE', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600 });
const irB = mk(wS, 'rect', { x: RX(700), y: 462, width: RX(1300) - RX(700), height: 26, rx: 5, fill: '#F3E6E6' }), irL = mono(wS, (RX(700) + RX(1300)) / 2, 481, 'INFRARED', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: '#8A2A2A' });
const nmL = mono(wS, RX(1300), 566, 'λ in nm', { 'text-anchor': 'end', 'font-size': 17 });
const mark = mk(wS, 'path', { d: `M${RX(1130)},460 l-10,-18 h20 Z`, fill: GO }), markL = tx(wS, RX(1130), 432, '1130 nm', { 'text-anchor': 'middle', fill: GO, 'font-size': 22 });
const wRows = steps($('#wSteps'), [
  [K(`\\textcolor{${GO}}{E_g} = 1.1 \\times 1.6\\times10^{-19}\\,\\text{J}`), '', 80],
  [K(`\\textcolor{${GO}}{E_g} = 1.76\\times10^{-19}\\,\\text{J}`), 'in joules', 152],
  [K(`E = \\dfrac{hc}{\\lambda} \\;\\Rightarrow\\; \\lambda = \\dfrac{hc}{\\textcolor{${GO}}{E_g}}`), '', 224],
  [K(`\\lambda = \\dfrac{1.99\\times10^{-25}}{1.76\\times10^{-19}}\\,\\text{m}`), '', 378],
  [K(`\\lambda \\approx 1.13\\times10^{-6}\\,\\text{m} = 1130\\,\\text{nm}`), '', 466],
  [K(`\\lambda\\,(\\text{nm}) \\approx \\dfrac{1240}{\\textcolor{${GO}}{E_g}\\,(\\text{eV})}`), 'shortcut', 530]]);
// row 4 sits in the box (y 368..452): nudge rows to fit the 600 px card
wRows[3].style.top = '304px'; wRows[4].style.top = '386px'; wRows[5].style.top = '480px';
$('#wBox').style.top = '372px';
const tWs = [wt('W3', 'One'), wt('W4', 'That'), wt('W5', 'So'), wt('W6', 'h'), wt('W7', 'Lambda'), wt('W8', 'shortcut:')];
const tPh = wt('W1', 'Light'), tLift = wt('W2', 'lift'), tIR = wt('W7', 'infrared');

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Heating always raises resistance', right: 'Semiconductor: hotter means lower R', y0: 96, y1: 184 });
const tcS = $('#tcS'), G = PUC.graph(tcS, { x: 90, y: 70, w: 600, h: 170, xmax: 100, ymin: 0, ymax: 10, xl: 'θ →', yl: 'R' });
G.ylab.setAttribute('fill', INK); G.ylab.setAttribute('font-style', 'italic');
const cMet = G.curve(INK, 4), cSem = G.curve(AM, 5);
const lMet = tx(tcS, 560, 110, 'metal', { fill: INK, 'font-size': 22 }), lSem = tx(tcS, 560, 228, 'semiconductor', { fill: '#B7791F', 'font-size': 22 });
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS', 'JEE MAIN'], type: 'Draw and compare band diagrams · band gap and light (JEE Main, 3 Sep 2020, Shift 2)' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '25px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Light of wavelength 620&nbsp;nm falls on three materials with band gaps 1.1&nbsp;eV, 2.5&nbsp;eV and 5.4&nbsp;eV. It can push electrons across the gap in:', qW: 780,
  opts: ['only the 1.1 eV material', 'the 1.1 eV and 2.5 eV materials', 'only the 5.4 eV material', 'all three materials'], right: 0, cols: 1, optW: 760, optH: 70, optY: 300, optFs: 28 });
const sol = PUC.solution($('#so'), [[K(`E = \\dfrac{1240}{620} = 2.0\\,\\text{eV}`)], [K(`\\text{jump if } E \\ge \\textcolor{${GO}}{E_g}`)],
  [K(`2.0 \\ge 1.1 \\;\\checkmark`)], [K(`2.0 < 2.5,\\; 5.4 \\;\\times`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Photon'), wt('A3', 'An'), wt('A4', 'Two'), wt('A4', 'less')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 508, y0: 92, dy: 80, title: 'Energy bands · fact card', txt: [1, 0, 1, 0, 1],
  lines: ['Conductor: bands overlap, no gap. Insulator: gap above 3 eV.',
    K(`\\textcolor{${GO}}{E_g}:\\;\\; \\text{C (diamond) } 5.4 \\quad \\text{Si } 1.1 \\quad \\text{Ge } 0.7\\;\\text{eV}`),
    'Semiconductor: gap below 3 eV, an insulator at 0 K',
    K(`\\lambda_{max} = \\dfrac{hc}{\\textcolor{${GO}}{E_g}} \\approx \\dfrac{1240}{\\textcolor{${GO}}{E_g}(\\text{eV})}\\,\\text{nm} \\qquad 1\\,\\text{eV} = 1.6\\times10^{-19}\\,\\text{J}`),
    'Heat it: metal R goes up, semiconductor R goes down'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 39', topic: 'Intrinsic and extrinsic semiconductors', y: 776 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tEg - 0.2, 1.1, 1380, 560], [tEv + 0.2, 1, 960, 540], [tLift - 0.4, 1.1, 560, 560], [T0('W3'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const nc = $('#nchip'), nc2 = $('#nchip2');

M.on(t => {
  cam(t); const hm = head(t); sweep(t);
  // second chip (NCERT) travels with the Karnataka chip
  { const cw = nc.offsetWidth, c2 = nc2.offsetWidth, tot = cw + 16 + c2, m = M.spring(t - tMorph, M.HEAVY);
    const x = M.lerp(960 - tot / 2, 160, m); nc.style.left = x.toFixed(2) + 'px'; nc2.style.left = (x + cw + 16).toFixed(2) + 'px'; nc2.style.top = nc.style.top;
    M.vis(nc2, t, 0.25, 1e9, { dy: 18 }); }
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.5, tW - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (t < tB || t >= tW) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tL + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tL - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#cbC'), t, tMorph + 0.5, out, { dx: 60, dy: 0, ...o });
    M.vis(plast, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.25 }); M.vis(core, t, tCu - 0.3, 1e9, { dy: 0, fade: 0.25 }); M.draw(cutL, t, tCu - 0.2, 0.3);
    fadeAt(PL, t, wt('H3', 'electrons') - 0.3, 0.02);
    const jig = Math.sin(t * 9); PL.forEach((d, k) => PUC.attr(d, 'transform', `translate(${(1.6 * Math.sin(t * 7 + k)).toFixed(2)},0)`));
    eCore.set(140 * Math.max(0, t - tCarry), t >= tCarry - 0.1);
    M.vis($('#cbE'), t, wt('H3', 'electrons'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#cbP1'), t, tCarry + 0.1, 1e9, { dy: 14 }); M.vis($('#cbP2'), t, tCarry + 0.4, 1e9, { dy: 14 });
    M.vis($('#chC'), t, T0('I1') - 0.1, out, { dy: 36, ...o });
    drawSeq(chipP, t, wt('I1', 'chip') - 0.2, 0.3, 0.025);
    M.rise($('#chT'), t, wt('I1', 'silicon') - 0.2); M.vis($('#chB'), t, wt('I2', 'sometimes') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#chB2'), t, wt('I2', 'sometimes') + 0.2, 1e9, { dy: 10 });
  }

  /* L: building analogy + bands */
  const lOn = t >= tL - 0.05 && t < tK + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tK - 0.32;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, T0('L5') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(bUp, t, tFl[2] - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(bDn, t, tFl[1] - 0.1, 1e9, { dy: 0, fade: 0.25 });
    drawSeq(bWalls, t, tFl[0] - 0.1, 0.4, 0.12); M.vis(bLab[1], t, tFl[1], 1e9, { dy: 0, fade: 0.2 }); M.vis(bLab[0], t, tFl[2], 1e9, { dy: 0, fade: 0.2 });
    fadeAt(PPL, t, tFl[1] + 0.1, 0.015);
    // jumper: leaves the ground floor, crosses the gap, runs on the upper floor
    const u = M.io((t - tFl[3]) / 0.9), run = Math.max(0, t - tFl[3] - 0.9);
    M.hide(jumper, t < tFl[3] - 0.05);
    const jx = 290 + 0 * u, jy = 452 - (452 - 180) * u, rx = 290 + 170 * Math.sin(run * 1.4);
    mv(jumper, u < 1 ? jx : rx, u < 1 ? jy : 180);
    M.vis(bJump, t, tFl[3] - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(bJL, t, tFl[3] + 0.1, 1e9, { dy: 0, fade: 0.2 });
    [tCB, tEg, tVB].forEach((a, i) => M.vis(MP[i], t, a + 0.3, 1e9, { dx: -14, dy: 0 }));
    MP[1].style.background = M.mix(C.soft, '#F7E6C2', M.io((t - tEg) / 0.3));
    // right: one atom -> crystal -> bands
    const ea = M.io((t - T0('L5') - 0.3) / 0.5); eAx.set(60, 420, 60, 420 - 330 * ea); M.vis(eAxL, t, T0('L5') + 0.6, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(atomLv, t, tAtom - 0.2, 0.35, 0.15); fadeAt(atomE, t, tAtom + 0.2, 0.1); M.vis(atomL, t, tAtom, 1e9, { dy: 0, fade: 0.2 });
    M.draw(spr, t, tSpread - 0.8, 0.3); M.vis(sprH, t, tSpread - 0.5, 1e9, { dy: 0, fade: 0.15 }); M.vis(xtalL, t, tSpread - 0.6, 1e9, { dy: 0, fade: 0.2 });
    const sp = M.io((t - tSpread + 0.3) / 0.9);
    UPL.forEach((l, k) => { const y = 160 + (k - 3.5) * 10 * sp; PUC.attr(l, 'y1', y.toFixed(1)); PUC.attr(l, 'y2', y.toFixed(1)); M.vis(l, t, tSpread - 0.6, 1e9, { dy: 0, fade: 0.2 }); });
    DNL.forEach((l, k) => { const y = 370 + (k - 3.5) * 10 * sp; PUC.attr(l, 'y1', y.toFixed(1)); PUC.attr(l, 'y2', y.toFixed(1)); M.vis(l, t, tSpread - 0.6, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis(cbR, t, tBand - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(vbR, t, tBand - 0.1, 1e9, { dy: 0, fade: 0.3 });
    fadeAt(VBE, t, tVB + 0.3, 0.025); M.vis(vbT, t, tVB - 0.1, 1e9, { dy: 8 });
    M.vis(cbT, t, tCB - 0.1, 1e9, { dy: 8 }); M.vis(cbT2, t, wt('L10', 'free') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.hide(freeE, t < wt('L10', 'free') - 0.1); mv(freeE, 450 + 100 * Math.sin(1.6 * Math.max(0, t - wt('L10', 'free'))), 160);
    M.vis(egA, t, tEg - 0.1, 1e9, { dy: 0, fade: 0.2 }); fadeAt([egL, egL2], t, wt('L11', 'E', 1) - 0.1); M.vis(egF, t, tEg + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#eVs'), t, tEv - 0.1, 1e9, { dy: 24 }); PUC.write($('#eV1'), t, T0('L13'), 0.7);
  }

  /* K: three kinds of solids */
  const kOn = t >= tK - 0.05 && t < tT + 0.02; M.hide($('#sK'), !kOn);
  if (kOn) {
    kC.forEach((c, i) => {
      M.vis(c, t, tK + 0.15 + i * 0.12, 1e9, { dy: 36 });
      const lit = M.io((t - tKc[i] + 0.2) / 0.3), e = kEls[i];
      c.querySelector('.nm').style.color = M.mix('#B8BCC6', INK, lit); c.querySelector('.ex').style.color = M.mix('#CBD0DA', MU, lit);
      e.cb.style.opacity = e.vb.style.opacity = (0.25 + 0.75 * lit).toFixed(3);
      [e.lc, e.lv].forEach(l => l.style.opacity = lit.toFixed(3));
      e.e.forEach(d => d.style.opacity = lit.toFixed(3));
      PUC.write(c.querySelector('.eg'), t, tKg[i], 0.6);
      M.vis(c.querySelector('.rule'), t, tKr[i] - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
      const rl = M.io((t - tRho[i] + 0.1) / 0.3); M.vis(c.querySelector('.rho'), t, tRho[i] - 0.1, 1e9, { dy: 10 });
      if (i === 0) { M.vis(e.ov, t, tKg[0] - 0.3, 1e9, { dy: 0, fade: 0.3 }); M.vis(e.ovL, t, tKg[0], 1e9, { dy: 0, fade: 0.2 }); e.f.set(110 * Math.max(0, t - tKr[0]), t >= tKr[0] - 0.1); }
      else { M.vis(e.a, t, tKg[i] - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(e.al, t, tKg[i] - 0.2, 1e9, { dy: 0, fade: 0.2 }); }
      if (i === 2) { e.j.forEach((d, k) => { M.vis(d, t, wt('K8', 'Germanium\'s') + k * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 }); }); e.h.forEach((d, k) => M.vis(d, t, wt('K8', 'Germanium\'s') + 0.15 + k * 0.3, 1e9, { dy: 0, fade: 0.15 })); }
    });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tB; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tB - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'decides') - 0.05, { out: tB - 0.35, outDur: 0.25 }); }

  /* B: breadboard heat test */
  const bOn = t >= tB - 0.05 && t < tW + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tW - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(ckW, t, tB + 0.4, 0.45, 0.2); drawSeq(bat, t, tB + 0.6, 0.25, 0.1); fadeAt(batL, t, wt('B2', 'battery') - 0.2, 0.06);
    const si = t >= tSwap; const θ = th(t);
    M.vis(smp, t, wt('B2', 'sample') - 0.2, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.15 });
    const sw = M.io((t - tSwap) / 0.3);
    PUC.attr(smp, 'fill', M.mix('#F6DEC2', '#DDE1E8', sw));
    M.vis(smpL, t, wt('B3', 'copper') - 0.1, tSwap, { dy: 8, outDur: 0.2 }); M.vis(smpL2, t, tSwap + 0.1, 1e9, { dy: 8 });
    M.draw(htr, t, wt('B2', 'heater') - 0.1, 0.5); M.vis(htrL, t, wt('B2', 'heater'), 1e9, { dy: 0, fade: 0.2 });
    const hot = M.clamp((θ - 25) / 75);
    waves.forEach((w, i) => { w.style.opacity = (hot * (0.55 + 0.45 * Math.sin(t * 4 + i * 2))).toFixed(3); });
    // electrons: speed follows the current (copper fast, cold silicon almost still)
    const v = τ => τ < tSwap ? 120 * cuI(th(τ)) / 2 : 3 + 120 * siI(th(τ)) / 55;
    let off = 0; { const a = wt('B3', 'copper'), n = 40; const b = t; if (b > a) { const dt = (b - a) / n; for (let k = 0; k < n; k++) off += v(a + (k + 0.5) * dt) * dt; } }
    eB.set(off, t >= wt('B3', 'copper') - 0.1);
    // scope + readout
    M.vis(sLab, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    trI(Iscope, t, wt('B3', 'Watch') - 1, 8, 182, t >= wt('B3', 'Watch') - 0.6);
    setH($('#rngT'), si ? 'RANGE · µA' : 'RANGE · A');
    M.vis($('#rngT'), t, wt('B3', 'Watch'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rT'), θ.toFixed(0));
    if (t < wt('B3', 'copper')) { M.setT($('#rI'), '0.00'); M.setT($('#rIu'), 'A'); }
    else if (!si) { M.setT($('#rI'), cuI(θ).toFixed(2)); M.setT($('#rIu'), 'A'); }
    else { const iv = siI(θ); M.setT($('#rI'), iv < 10 ? iv.toFixed(2) : iv.toFixed(1)); M.setT($('#rIu'), 'µA'); }
    // inside the sample: copper overlapping bands, then silicon with jumpers
    M.vis($('#rbL2'), t, wt('B3', 'copper'), 1e9, { dy: 10 });
    const cuOn = t >= wt('B3', 'copper') - 0.1 && t < tSwap;
    mCu.forEach(e => M.hide(e, !cuOn)); mCuF.set(60 * (t - tB), cuOn);
    mSi.forEach(e => M.hide(e, !si)); M.hide(mSiAL, true);
    const nJ = si ? Math.min(NJ, Math.floor(NJ * Math.log10(siR(θ)) / Math.log10(siR(100)) + 1e-6)) : 0;
    SIE.forEach(d => M.hide(d, !si));
    SIJ.forEach((d, k) => { const on = si && k < nJ; M.hide(d, !on); if (on) { const x = 30 + [1, 4, 6, 2, 7, 0, 5][k] * 26; mv(d, 20 + ((x - 20 + 40 * (t - tHeat2)) % 200 + 200) % 200, 38); } });
    SIH.forEach((d, k) => M.hide(d, !(si && k < nJ && t >= wt('B8', 'hole') - 0.2)));
    // hide valence electrons that jumped (the hole marks their place)
    SIE.forEach((d, c) => { const k = [1, 4, 6, 2, 7, 0, 5].indexOf(c); if (k >= 0 && k < nJ) M.hide(d, true); });
    M.vis($('#kPill'), t, wt('B11', 'zero') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    avB(t, wt('B10', 'falls') - 0.1, out);
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wL'), t, tW + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#wR'), t, tW + 0.25, 1e9, { dx: 60, dy: 0 });
    fadeAt([wCB, wVB, ...wLab], t, tW + 0.4, 0.08); fadeAt(wE, t, tW + 0.6, 0.015);
    M.vis(wEg, t, tW + 0.9, 1e9, { dy: 0, fade: 0.2 }); M.vis(wEgL, t, tW + 1.0, 1e9, { dy: 0, fade: 0.2 });
    // photon: a wavy arrow travels in from the left to the electron at (414, 322)
    const pu = M.io((t - tPh) / 1.0), x1 = 40, x2 = 40 + (380 - 40) * pu, yb = 210 + (310 - 210) * pu;
    let d = ''; for (let i = 0; i <= 40; i++) { const s = i / 40, x = x1 + (x2 - x1) * s, y = 210 + (yb - 210) * s + 10 * Math.sin(s * (x2 - x1) / 18); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
    PUC.attr(wPh, 'd', pu > 0.02 ? d : ''); const ang = Math.atan2(yb - 210, x2 - x1);
    PUC.attr(wPhH, 'd', pu > 0.02 ? `M${(x2 + 16 * Math.cos(ang)).toFixed(1)},${(yb + 16 * Math.sin(ang)).toFixed(1)} l${(-16 * Math.cos(ang) + 9 * Math.sin(ang)).toFixed(1)},${(-16 * Math.sin(ang) - 9 * Math.cos(ang)).toFixed(1)} l${(-18 * Math.sin(ang)).toFixed(1)},${(18 * Math.cos(ang)).toFixed(1)} Z` : '');
    const phOut = M.io((t - tLift - 0.4) / 0.3); wPh.style.opacity = wPhH.style.opacity = (1 - phOut).toFixed(3);
    M.vis(wPhL, t, tPh + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const lu = M.io((t - tLift) / 0.7), ex = 280 + 5 * 27;
    M.hide(wE[5], t >= tLift); M.hide(wJ, t < tLift); mv(wJ, ex + 60 * Math.max(0, lu - 1), 322 - (322 - 130) * lu);
    if (t > tLift + 0.7) mv(wJ, ex + 90 * Math.sin(1.3 * (t - tLift - 0.7)), 130);
    M.hide(wH, t < tLift + 0.15); mv(wH, ex, 322);
    drawSeq(ruler, t, wt('W2', 'wavelength') - 0.2, 0.3, 0.06); fadeAt([visB, visL, irB, irL, ...rLab, nmL], t, wt('W2', 'wavelength'), 0.05);
    M.vis(mark, t, tIR - 0.9, 1e9, { dy: -14, sp: M.POP }); M.vis(markL, t, tIR - 0.8, 1e9, { dy: 0, fade: 0.2 });
    irB.style.fill = M.mix('#F3E6E6', '#EBC9C9', M.io((t - tIR) / 0.3));
    runSteps(wRows, t, tWs);
    M.vis($('#wBox'), t, tWs[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'only'), tRight: wt('X3', 'Heat') - 0.1 });
    fadeAt([G.axes, G.ylab, G.xlab], t, tX + 0.5);
    const m1 = M.io((t - wt('X2', 'true')) / 0.8), m2 = M.io((t - wt('X3', 'resistance') + 0.3) / 0.8);
    cMet(s => [s, 3 + 0.04 * s], 0, 100 * m1); cSem(s => [s, 0.6 + 8.4 * Math.exp(-s / 28)], 0, 100 * m2);
    M.vis(lMet, t, wt('X2', 'true') + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(lSem, t, wt('X3', 'resistance'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC'), wt('X4', 'CBSE'), wt('X4', 'ISC'), wt('X5', 'JEE')], tType: wt('X4', 'draw') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Their') - 0.2, tCount, tAns });
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
