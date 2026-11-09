// PUC Physics Ep 72: Work done by a constant force (Motion notebook, Diya drags a box of books: the work rectangle)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const WC = C.teal, FC = C.orange, DC = C.violet, TH = C.gold, GC = C.red;     // W teal, F orange, d violet, theta gold, g red
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const W_ = tc(WC, 'W'), F_ = tc(FC, 'F'), d_ = tc(DC, 'd'), th = tc(TH, '\\theta'), vF = tc(FC, '\\vec{F}'), vd = tc(DC, '\\vec{d}');
const ih = '\\hat{i}', jh = '\\hat{j}';
const D2R = Math.PI / 180, cosd = a => Math.cos(a * D2R), sind = a => Math.sin(a * D2R);
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => v.toFixed(2);
const seg = (ln, x1, y1, x2, y2) => { attr(ln, 'x1', x1.toFixed(1)); attr(ln, 'y1', y1.toFixed(1)); attr(ln, 'x2', x2.toFixed(1)); attr(ln, 'y2', y2.toFixed(1)); };
const arcD = (cx, cy, r, a0, a1) => `M${(cx + r * cosd(a0)).toFixed(1)},${(cy - r * sind(a0)).toFixed(1)} A${r},${r} 0 0 0 ${(cx + r * cosd(a1)).toFixed(1)},${(cy - r * sind(a1)).toFixed(1)}`;
const hatch = (s, x0, x1, y) => { mk(s, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(s, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };

Object.assign(M.IC, {
  bucket: ['M5 8h14l-2 12H7z', 'M5 8a7 5 0 0 1 14 0'],
  cupboard: ['M5 3h14v18H5z', 'M12 3v18', 'M10 11v2', 'M14 11v2'],
  cart: ['M3 6h3l2 9h10l2-7H7', 'M9 20a1 1 0 1 0 0-.01', 'M17 20a1 1 0 1 0 0-.01'],
  arrowU: ['M12 19V5', 'm5 12 7-7 7 7'],
  wall: ['M3 4h18v16H3z', 'M3 9h18', 'M3 15h18', 'M9 4v5', 'M15 9v6', 'M9 15v5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook ---------- */
const JOBS = [['bucket', 'Bucket of water', 'LIFTED UP', 'bucket'], ['cupboard', 'Cupboard', 'PUSHED ACROSS A ROOM', 'cupboard'], ['cart', 'Cart of books', 'PULLED ALONG', 'cart']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="js${i}" width="300" height="120"></svg></div>`).join('');
const JR = [0, 1, 2].map(i => {
  const s = $('#js' + i); mk(s, 'line', { x1: 6, y1: 100, x2: 294, y2: 100, stroke: C.dim, 'stroke-width': 2.5 });
  if (i === 0) { mk(s, 'path', { d: 'M118,56 h44 l-6,40 h-32 z', fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2 }); mk(s, 'path', { d: 'M118,56 a22,14 0 0 1 44,0', fill: 'none', stroke: C.ink, 'stroke-width': 2 }); }
  if (i === 1) mk(s, 'rect', { x: 130, y: 30, width: 54, height: 70, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 });
  if (i === 2) { mk(s, 'rect', { x: 90, y: 66, width: 70, height: 24, rx: 4, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 }); [104, 146].forEach(x => mk(s, 'circle', { cx: x, cy: 94, r: 6, fill: C.ink })); }
  return { f: PUC.arrow(s, FC, 5, 14), m: PUC.arrow(s, DC, 5, 14) };
});
const JRF = [[140, 40, 140, 4], [70, 65, 126, 65], [160, 72, 230, 36]], JRM = [[220, 92, 220, 42], [150, 112, 260, 112], [90, 112, 200, 112]];
const TILES = [['arrowU', 'Lifting?'], ['arrowR', 'Carrying?'], ['help', 'Which time?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, i < 2 ? DC : C.ink, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'both'), wt('H4', 'only'), wt('H4', 'Which')];
// hook sketch: shelf lift (left), corridor carry (right)
const hs = $('#hkS'), HF = 300;
hatch(hs, 14, 396, HF);
mk(hs, 'rect', { x: 24, y: 146, width: 150, height: 12, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 });
txt(hs, 30, 136, 'SHELF', { 'font-size': 15, 'font-weight': 600, 'letter-spacing': 2 });
const bagA = mk(hs, 'g', {}), bagB = mk(hs, 'g', {});
[bagA, bagB].forEach(b => { mk(b, 'rect', { x: -26, y: -40, width: 52, height: 40, rx: 8, fill: C.ac, stroke: C.ink, 'stroke-width': 2 }); mk(b, 'path', { d: 'M-12,-40 v-8 h24 v8', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }); });
const hUp = PUC.arrow(hs, DC, 5, 14), hSide = PUC.arrow(hs, DC, 5, 14), hFa = PUC.arrow(hs, FC, 5, 14), hFb = PUC.arrow(hs, FC, 5, 14);
const hUl = txt(hs, 136, 236, '1 m', { fill: DC, 'font-weight': 600, 'font-size': 20 }), hSl = txt(hs, 300, 236, '10 m', { fill: DC, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'middle' });
const hQa = txt(hs, 100, 92, 'WORK?', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }), hQb = txt(hs, 300, 92, 'WORK?', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 });
const tLift = wt('H3', 'lifts'), tCarry = wt('H3', 'carries');

/* ---------- P: what is work ---------- */
const pl = $('#plS'), PF = 440;
hatch(pl, 40, 744, PF);
const wallG = mk(pl, 'g', {});
mk(wallG, 'rect', { x: 520, y: 206, width: 90, height: PF - 206, fill: '#D9A38A', stroke: C.ink, 'stroke-width': 2.5 });
for (let y = 206 + 26; y < PF; y += 26) mk(wallG, 'line', { x1: 520, y1: y, x2: 610, y2: y, stroke: C.ink, 'stroke-width': 1.2, opacity: 0.5 });
for (let r = 0; r * 26 + 206 < PF; r++) { const off = r % 2 ? 22 : 45; mk(wallG, 'line', { x1: 520 + off, y1: 206 + r * 26, x2: 520 + off, y2: Math.min(PF, 206 + r * 26 + 26), stroke: C.ink, 'stroke-width': 1.2, opacity: 0.5 }); }
const pFw = PUC.arrow(pl, FC, 7, 20), pFwl = it(pl, 420, 300, 'F', FC);
const pD0 = txt(pl, 360, 400, 'd = 0', { fill: DC, 'font-weight': 600, 'font-size': 30 });
const pW0 = txt(pl, 140, 400, 'W = 0', { fill: WC, 'font-weight': 600, 'font-size': 30 });
const tCd = [wt('P2', 'force', 1), wt('P2', 'move')];
['F', 'd'].forEach((k, i) => { $('#cd' + i).querySelector('i').innerHTML = M.icon(i ? 'arrowR' : 'arrowR', 26, i ? DC : FC, 2.6); });
const ckP = [mk(pl, 'g', {}), mk(pl, 'g', {})];
// right: only the forward part counts
const pr = $('#prS'), RF = 330, RP = [270, 254], RA = 40;
hatch(pr, 40, 744, RF);
mk(pr, 'rect', { x: 130, y: 236, width: 140, height: 94, rx: 8, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
const rRope = mk(pr, 'line', { x1: RP[0], y1: RP[1], x2: RP[0] + 260 * cosd(RA), y2: RP[1] - 260 * sind(RA), stroke: C.ink2, 'stroke-width': 3 });
const rF = PUC.arrow(pr, FC, 7, 20), rFp = PUC.arrow(pr, FC, 7, 20), rD = PUC.arrow(pr, DC, 6, 18);
const rDrop = mk(pr, 'line', { x1: RP[0] + 200 * cosd(RA), y1: RP[1] - 200 * sind(RA), x2: RP[0] + 200 * cosd(RA), y2: RP[1], stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const rArc = mk(pr, 'path', { d: arcD(RP[0], RP[1], 54, 0, RA), stroke: TH, 'stroke-width': 2.5, fill: 'none' }), rThl = it(pr, RP[0] + 62, RP[1] - 12, 'θ', TH, { 'font-size': 26 });
const rFl = it(pr, RP[0] + 100, RP[1] - 120, 'F', FC), rFpl = it(pr, RP[0] + 40, RP[1] + 40, 'F cos θ', FC, { 'font-size': 26 }), rDl = it(pr, 420, RF + 56, 'd', DC);
$('#prF').innerHTML = K(`${W_} = ${F_}\\,${d_}\\cos${th}`);

/* ---------- S: Diya's box of books (sim) ---------- */
const s = $('#simS'), FY = 380, BW = 110, BH = 90, PXM = 110, X0 = 60, FS = 2.6, RL = 150;   // 110 px per metre, 2.6 px per newton
hatch(s, 30, 754, FY);
for (let k = 0; k <= 4; k++) { mk(s, 'line', { x1: X0 + k * PXM, y1: FY + 20, x2: X0 + k * PXM, y2: FY + 30, stroke: C.ink, 'stroke-width': 2 }); txt(s, X0 + k * PXM, FY + 50, k + ' m', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
const rect1 = mk(s, 'rect', { x: X0, y: FY + 64, height: 50 * 1.4, fill: 'none', stroke: WC, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rect = mk(s, 'rect', { x: X0, y: FY + 64, fill: M.mix(WC, '#FFFFFF', 0.78), stroke: WC, 'stroke-width': 2.5 });
const rectL = txt(s, 0, 0, '', { 'text-anchor': 'middle', fill: WC, 'font-weight': 600, 'font-size': 22 });
const rect1L = txt(s, 0, 0, '200 J at 0°', { fill: WC, 'font-weight': 600, 'font-size': 20 });
const ghosts = [0, 1, 2].map(() => { const g0 = mk(s, 'g', {}), gg = mk(g0, 'g', { opacity: 0 }); mk(gg, 'rect', { x: 0, y: FY - BH, width: BW, height: BH, rx: 6, fill: C.ink }); return gg; });
const box = mk(s, 'g', {});
mk(box, 'rect', { x: 0, y: FY - BH, width: BW, height: BH, rx: 6, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 3 });
mk(box, 'line', { x1: 0, y1: FY - BH + 22, x2: BW, y2: FY - BH + 22, stroke: '#A8825C', 'stroke-width': 8 });
txt(box, BW / 2, FY - 26, 'BOOKS', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 16, 'letter-spacing': 1.5 });
const rope = mk(s, 'line', { stroke: C.ink2, 'stroke-width': 3.5, 'stroke-linecap': 'round' }), grip = mk(s, 'circle', { r: 8, fill: C.ink2 });
const sRef = mk(s, 'line', { stroke: C.mute, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' }), sDrop = mk(s, 'line', { stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const sArc = mk(s, 'path', { stroke: TH, 'stroke-width': 3, fill: 'none' }), sThl = it(s, 0, 0, 'θ', TH, { 'font-size': 26 });
const sF = PUC.arrow(s, FC, 7, 20), sFp = PUC.arrow(s, FC, 7, 20), sD = PUC.arrow(s, DC, 5, 16);
const sFl = it(s, 0, 0, 'F', FC), sFpl = it(s, 0, 0, 'F cos θ', FC, { 'font-size': 24 }), sDl = it(s, 0, 0, 'd', DC, { 'font-size': 26 });
const PY = FY - 62;                                           // rope tied at this height on the front face
const tA = wt('S2', 'Watch') - 0.3, v1 = 0.57, tR2 = T0('S4'), tB = wt('S4', 'same') + 0.1, v2 = 0.75, tSix = wt('S4', 'sixty');
const tRep = tS6 + 0.05, tRes = wt('S7', 'moves') - 0.1, dRep = 2.0, vRep = 0.25 * v2;
const thS = t => t < tR2 ? 0 : 60 * M.io((t - tSix + 0.3) / 1.0);
const dS = t => t < tR2 ? M.clamp(v1 * (t - tA), 0, 4) : t < tRep ? M.clamp(v2 * (t - tB), 0, 4) : dRep + vRep * M.clamp(t - tRes, 0, tS8 - tRes);
$('#roG').innerHTML = `<span class="k" style="color:${FC}">F</span><span class="v" style="color:${FC}">50.0</span><span class="u">N</span>
  <span class="k" style="color:${TH}">θ</span><span class="v" id="r_th" style="color:${TH}">0</span><span class="u">°</span>
  <span class="k" style="color:${DC}">d</span><span class="v" id="r_d" style="color:${DC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${WC}">W</span><span class="v" id="r_w" style="color:${WC}">0.0</span><span class="u">J</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 70, w: 560, h: 150, xmax: 4, ymax: 200, xt: [0, 1, 2, 3, 4], yt: [0, 100, 200], xl: '', yl: '' });
txt($('#grS'), 690, 226, 'd (m)', { fill: DC, 'font-weight': 600 }); txt($('#grS'), 58, 64, 'J', { fill: WC, 'font-weight': 600 });
const gc1 = g.curve(WC), gc2 = g.curve(WC), gd = g.dot(WC, 11);
const gl1 = txt($('#grS'), g.X(2.9) - 10, g.Y(145) - 8, 'θ = 0°', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600, 'font-size': 18 });
const gl2 = txt($('#grS'), g.X(4) + 10, g.Y(100) + 6, 'θ = 60°', { fill: C.ink, 'font-weight': 600, 'font-size': 18 });

/* ---------- D: the formula ---------- */
const STEPS = [[`${W_} = (${F_}\\cos${th})\\,${d_}`, 'forward part of the force, times displacement'],
  [`${W_} = ${vF}\\cdot${vd}`, 'exactly a dot product'],
  [`${vF}\\cdot${vd} = \\text{a number}`, 'so work is a scalar: a size, no direction'],
  [`1\\,\\text{J} = 1\\,\\text{N} \\times 1\\,\\text{m}`, 'the joule · dimensions [M L² T⁻²]']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'W'), wt('D3', 'W'), wt('D4', 'So'), wt('D5', 'One')];
const ds = $('#drS'), DO = [110, 270], DTH = 35;
const dDl = mk(ds, 'line', { x1: DO[0], y1: DO[1], x2: 740, y2: DO[1], stroke: DC, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0.45 });
const dShF = mk(ds, 'line', { x1: DO[0], y1: DO[1], x2: DO[0] + 220 * cosd(DTH), y2: DO[1], stroke: FC, 'stroke-width': 14, opacity: 0.3 });
const dDr = mk(ds, 'line', { x1: DO[0] + 220 * cosd(DTH), y1: DO[1] - 220 * sind(DTH), x2: DO[0] + 220 * cosd(DTH), y2: DO[1], stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const dD = PUC.arrow(ds, DC, 6, 18), dF = PUC.arrow(ds, FC, 6, 18);
const dArc = mk(ds, 'path', { d: arcD(DO[0], DO[1], 60, 0, DTH), stroke: TH, 'stroke-width': 2.5, fill: 'none' }), dThl = it(ds, DO[0] + 68, DO[1] - 12, 'θ', TH, { 'font-size': 26 });
const dFl = it(ds, DO[0] + 220 * cosd(DTH) - 10, DO[1] - 220 * sind(DTH) - 16, 'F', FC), dDlb = it(ds, DO[0] + 380, DO[1] + 44, 'd', DC);
const dShl = txt(ds, DO[0] + 110 * cosd(DTH), DO[1] + 40, 'F cos θ', { 'text-anchor': 'middle', fill: FC, 'font-weight': 600, 'font-size': 20 });
const chipH = [`<span style="color:#F2A65A">W</span> = (<span style="color:#F2A65A">F</span> cos <span style="color:#F0C674">θ</span>) × <span style="color:#C9B6F5">d</span>`,
  `<span style="color:#F2A65A">F</span> · <span style="color:#C9B6F5">d</span> = one number: a scalar`, `1 J = 1 N × 1 m &nbsp;·&nbsp; [M L² T⁻²]`];
['dc0', 'dc1', 'dc2'].forEach((id, i) => { $('#' + id).innerHTML = chipH[i]; });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${W_} = ${F_}\\,${d_}\\cos${th} = ${vF}\\cdot${vd}`);

/* ---------- C: lifting vs carrying ---------- */
const bagG = sv => { const b = mk(sv, 'g', {}); mk(b, 'rect', { x: -40, y: -60, width: 80, height: 60, rx: 10, fill: C.ac, stroke: C.ink, 'stroke-width': 2.5 }); mk(b, 'path', { d: 'M-18,-60 v-12 h36 v12', fill: 'none', stroke: C.ink, 'stroke-width': 3 }); return b; };
const c0 = $('#c0S'), c1 = $('#c1S');
hatch(c0, 20, 692, 300); mk(c0, 'rect', { x: 344, y: 168, width: 240, height: 12, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 });
txt(c0, 354, 200, 'SHELF', { 'font-size': 15, 'font-weight': 600, 'letter-spacing': 2 });
const cBag0 = bagG(c0), cF0 = PUC.arrow(c0, FC, 6, 18), cD0 = PUC.arrow(c0, DC, 6, 18);
const cF0l = it(c0, 0, 0, 'F', FC, { 'font-size': 26 }), cD0l = txt(c0, 0, 0, 'h = 1 m', { fill: DC, 'font-weight': 600, 'font-size': 20 });
hatch(c1, 20, 692, 300);
const cBag1 = bagG(c1), cF1 = PUC.arrow(c1, FC, 6, 18), cD1 = PUC.arrow(c1, DC, 6, 18);
const cF1l = it(c1, 0, 0, 'F', FC, { 'font-size': 26 }), cD1l = txt(c1, 0, 0, 'd = 10 m', { fill: DC, 'font-weight': 600, 'font-size': 20 });
const cRa = mk(c1, 'path', { stroke: TH, 'stroke-width': 2.5, fill: 'none' }), cRal = txt(c1, 0, 0, '90°', { fill: TH, 'font-weight': 600, 'font-size': 20 });
$('#c0a').innerHTML = K(`${W_} = m\\,${tc(GC, 'g')}\\,${tc(DC, 'h')} = 8 \\times ${tc(GC, '9.8')} \\times ${tc(DC, '1')} \\approx ${tc(WC, '78\\,\\text{J}')}`);
$('#c1a').innerHTML = K(`${W_} = ${F_}\\,${d_}\\cos ${tc(TH, '90^\\circ')} = ${tc(WC, '0')}`);
const th1 = PUC.think($('#th1'), { q: 'Diya holds the bag still for five minutes. How much work does she do on it?', opts: ['Some work', 'Zero work'], right: 1, why: 'The bag does not move: d = 0, so W = 0.' });

/* ---------- R: three links ---------- */
const LKS = ['Is there a force?', 'Did the object move?', 'Is some force along the motion?'];
$('#lks').innerHTML = LKS.map((l, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>`).join('') +
  `<div class="pillp good" id="lkP" style="left:36px;top:420px">All three yes: work is done</div>`;
const tLk = [wt('R2', 'Is'), wt('R2', 'Did'), wt('R2', 'Is', 1)];
const RCX = [372, 482, 592], RT = [['Pushing a wall', [1, 0, -1], 0], ['Carrying sideways', [1, 1, 0], 0], ['Dragging the box', [1, 1, 1], 1]];
$('#rtab').innerHTML = ['FORCE?', 'MOVED?', 'ALONG?'].map((h, c) => `<div class="rh3" style="left:${RCX[c] - 55}px">${h}</div>`).join('') +
  RT.map(([n, cks, ok], r) => `<div class="rt3" id="rt${r}" style="top:${112 + r * 112}px"><div class="nm">${n}</div>` +
    cks.map((c, k) => c < 0 ? '' : `<div class="ck" id="ck${r}${k}" style="left:${RCX[k] - 24 - 22}px;background:${c ? C.ok : C.red}">${M.icon(c ? 'check' : 'x', 22, '#fff', 3)}</div>`).join('') +
    `<div class="res" id="rs${r}" style="background:${ok ? C.okBg : C.redBg};color:${ok ? '#1F6B3F' : C.red}">${ok ? 'WORK' : 'NO WORK'}</div></div>`).join('');
const tCk = [[wt('R3', 'yes'), wt('R3', 'no')], [wt('R4', 'yes'), wt('R4', 'yes', 1), wt('R4', 'no')], [wt('R5', 'Yes'), wt('R5', 'yes', 1), wt('R5', 'yes', 2)]];
const tRs = [wt('R3', 'No', 1), wt('R4', 'No', 1), wt('R5', 'Work')];
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So aching arms are not proof of work!' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${vF} = (6${ih} + 2${jh})\\,\\text{N}`)} moves a box from ${K('(1, 2)')} to ${K('(5, 5)')}, in metres. Find the work done.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${vd} = (5-1)${ih} + (5-2)${jh} = (4${ih} + 3${jh})\\,\\text{m}`)],
  [K(`${W_} = ${vF}\\cdot${vd} = (6)(4) + (2)(3)`)],
  [K(`${W_} = 24 + 6 = ${tc(WC, '30\\,\\text{J}')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 110 });
const tW = [wt('W3', 'First'), wt('W4', 'Now'), wt('W5', 'Add')];
const ws = $('#wrS'), GO = [100, 500], GU = 66;
for (let k = 0; k <= 6; k++) { mk(ws, 'line', { x1: GO[0] + k * GU, y1: GO[1], x2: GO[0] + k * GU, y2: GO[1] - 6 * GU, stroke: C.line, 'stroke-width': 1.5 }); mk(ws, 'line', { x1: GO[0], y1: GO[1] - k * GU, x2: GO[0] + 6 * GU, y2: GO[1] - k * GU, stroke: C.line, 'stroke-width': 1.5 });
  txt(ws, GO[0] + k * GU, GO[1] + 28, k, { 'text-anchor': 'middle' }); if (k) txt(ws, GO[0] - 14, GO[1] - k * GU + 6, k, { 'text-anchor': 'end' }); }
mk(ws, 'path', { d: `M${GO[0]},${GO[1] - 6 * GU - 10} V${GO[1]} H${GO[0] + 6 * GU + 10}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' });
const gP = (x, y) => [GO[0] + x * GU, GO[1] - y * GU];
const wPA = mk(ws, 'circle', { cx: gP(1, 2)[0], cy: gP(1, 2)[1], r: 9, fill: C.ink }), wPB = mk(ws, 'circle', { cx: gP(5, 5)[0], cy: gP(5, 5)[1], r: 9, fill: C.ink });
const wPAl = txt(ws, gP(1, 2)[0] - 12, gP(1, 2)[1] + 30, '(1, 2)', { fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }), wPBl = txt(ws, gP(5, 5)[0] + 12, gP(5, 5)[1] - 16, '(5, 5)', { fill: C.ink, 'font-weight': 600 });
const wDx = mk(ws, 'line', { x1: gP(1, 2)[0], y1: gP(1, 2)[1], x2: gP(5, 2)[0], y2: gP(5, 2)[1], stroke: DC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const wDy = mk(ws, 'line', { x1: gP(5, 2)[0], y1: gP(5, 2)[1], x2: gP(5, 5)[0], y2: gP(5, 5)[1], stroke: DC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const wDxl = txt(ws, gP(3, 2)[0], gP(3, 2)[1] + 26, '4', { fill: DC, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'middle' }), wDyl = txt(ws, gP(5, 3.5)[0] + 14, gP(5, 3.5)[1] + 6, '3', { fill: DC, 'font-weight': 600, 'font-size': 22 });
const wD = PUC.arrow(ws, DC, 6, 18), wF = PUC.arrow(ws, FC, 6, 18);
const wDl = it(ws, gP(3, 3.5)[0] - 34, gP(3, 3.5)[1] - 4, 'd', DC, { 'font-size': 28 }), wFl = it(ws, gP(1, 2)[0] + 120, gP(1, 2)[1] - 50, 'F', FC, { 'font-size': 28 });
$('#wc2').innerHTML = 'W = 30 J';

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${W_} = ${F_}${d_}\\cos 30^\\circ`)} &nbsp;(angle with the vertical)`, right: `${K(`${W_} = ${F_}${d_}\\cos ${tc(TH, '60^\\circ')}`)} &nbsp;(angle with the motion)` });
const tg = $('#tg'), TP = [150, 150];
hatch(tg, 30, 390, 200);
mk(tg, 'rect', { x: 60, y: 136, width: 90, height: 64, rx: 6, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
const tRope = mk(tg, 'line', { x1: TP[0], y1: TP[1], x2: TP[0] + 140 * cosd(60), y2: TP[1] - 140 * sind(60), stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const tVert = mk(tg, 'line', { x1: TP[0], y1: TP[1], x2: TP[0], y2: 18, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const tHor = mk(tg, 'line', { x1: TP[0], y1: TP[1], x2: TP[0] + 150, y2: TP[1], stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const tA30 = mk(tg, 'path', { d: arcD(TP[0], TP[1], 56, 60, 90), stroke: C.red, 'stroke-width': 3, fill: 'none' }), tA30l = txt(tg, TP[0] + 4, TP[1] - 70, '30°', { fill: C.red, 'font-weight': 600, 'font-size': 18 });
const tA60 = mk(tg, 'path', { d: arcD(TP[0], TP[1], 80, 0, 60), stroke: TH, 'stroke-width': 3, fill: 'none' }), tA60l = txt(tg, TP[0] + 88, TP[1] - 30, '60°', { fill: TH, 'font-weight': 600, 'font-size': 20 });
const tD = PUC.arrow(tg, DC, 5, 16); const tDl = it(tg, 236, 246, 'd', DC, { 'font-size': 24 });
const where = PUC.where($('#wa'), { on: [], type: 'Work as F · d with vectors, a pull at an angle, and the unit and dimensions of work' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780, optY: 330,
  q: `A 10 kg box is pulled 5 m at steady speed on a rough floor by a rope at 37° above the floor. ${K('\\mu = 0.75')}, ${K('g = 10\\,\\text{m/s}^2')}, cos 37° = 0.8, sin 37° = 0.6. Work done by the rope?`,
  opts: ['300 J', '240 J', '375 J', '180 J'], right: 1 });
const so = PUC.solution($('#so'), [[K(`${F_}\\cos${th} = \\mu N`)], [K(`N = m${tc(GC, 'g')} - ${F_}\\sin${th}`)], [K(`0.8${F_} = 75 - 0.45${F_} \\Rightarrow ${F_} = 60\\,\\text{N}`)], [K(`${W_} = 48 \\times 5 = ${tc(WC, '240\\,\\text{J}')}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Steady'), wt('A3', 'Friction'), wt('A4', 'So'), wt('A5', 'forward')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 450, title: 'Recap · work done by a constant force', y0: 104, dy: 88, txt: [0, 0, 1, 1],
  lines: [K(`${W_} = ${F_}\\,${d_}\\cos${th} = ${vF}\\cdot${vd}`), K(`1\\,\\text{J} = 1\\,\\text{N}\\,\\text{m} \\qquad [${W_}] = [\\text{M}\\,\\text{L}^2\\,\\text{T}^{-2}]`),
    'Work is a <b>scalar</b>: a size, no direction', `No work if <span class="ff">F</span> = 0, <span class="cd">d</span> = 0, or <span class="th">θ</span> = 90°`] });
const YQ = ['Why does pushing a wall all day do no work on it?', 'Why is work a scalar, though force and displacement are vectors?', 'What is one joule, in your own words?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 73', topic: 'Brakes, fans, corridors: Positive, Negative and Zero Work', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.06, 960, 540], [tS8 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px';
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JR.forEach((r, i) => {
      vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const uf = M.o3((t - tMorph - 0.8 - i * 0.25) / 0.5), um = M.o3((t - tMorph - 1.3 - i * 0.25) / 0.5), [a, b, c, d] = JRF[i], [e, f, gg, h] = JRM[i];
      r.f.set(a, b, a + (c - a) * uf, b + (d - b) * uf); r.m.set(e, f, e + (gg - e) * um, f + (h - f) * um);
    });
    vis($('#hjP'), t, wt('H2', 'hard') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    vis($('#hkSk'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const ul = M.io((t - tLift) / 1.4);
    attr(bagA, 'transform', `translate(100,${(HF - (HF - 146) * ul).toFixed(1)})`);
    hUp.set(160, HF - 6, 160, HF - 6 - (HF - 152) * M.o3((t - tLift) / 0.8)); vis(hUl, t, tLift + 0.6, 1e9, { dy: 6 });
    const ua = M.o3((t - tLift + 0.1) / 0.4); hFa.set(100, HF - 40 - (HF - 146) * ul - 10, 100, HF - 40 - (HF - 146) * ul - 10 - 50 * ua);
    const uc = M.io((t - tCarry) / 1.6), bx = 240 + 120 * uc;
    attr(bagB, 'transform', `translate(${bx.toFixed(1)},210)`); bagB.style.opacity = M.clamp((t - tCarry + 0.3) / 0.2).toFixed(3);
    const uS = M.o3((t - tCarry) / 0.8); hSide.set(220, 258, 220 + 160 * uS, 258); vis(hSl, t, tCarry + 0.6, 1e9, { dy: 6 });
    const ub = M.o3((t - tCarry - 0.2) / 0.4); hFb.set(bx, 160, bx, 160 - 50 * ub);
    vis(hQa, t, wt('H4', 'once') - 0.1, 1e9, POP); vis(hQb, t, wt('H4', 'once'), 1e9, POP);
    TILES.forEach((_, i) => { const el = $('#wq' + i); vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (1 - M.io((t - (i < 2 ? tTile[i + 1] : T0('H5'))) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1].forEach(i => { const el = $('#cd' + i); vis(el, t, tCd[i] - 0.1, 1e9, POP);
      const k = i ? wt('P3', 'not') : wt('P3', 'wall'), on = M.io((t - k) / 0.3); el.style.background = mix(C.soft, i ? C.redBg : C.okBg, on);
      const ic = el.querySelector('i'); const key = on > 0.5 ? (i ? 'x' : 'check') : 'arrow'; if (ic._k !== key) { ic._k = key; ic.innerHTML = key === 'arrow' ? M.icon('arrowR', 26, i ? DC : FC, 2.6) : M.icon(key, 24, i ? C.red : C.ok, 3); } });
    vis(wallG, t, T0('P3') - 0.1, 1e9, { dy: 20 });
    const push = M.o3((t - wt('P3', 'Push') - 0.1) / 0.5), pulse = 1 + 0.05 * Math.sin(Math.max(0, t - T0('P3')) * 5);
    pFw.set(380, 320, 380 + 132 * push * pulse, 320); pFwl.style.opacity = push.toFixed(3);
    vis(pD0, t, wt('P3', 'move') - 0.1, 1e9, POP); vis(pW0, t, wt('P3', 'no') - 0.1, 1e9, POP);
    vis($('#plP'), t, wt('P3', 'tired') - 0.1, 1e9, POP);
    vis($('#pr'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    const uf = M.o3((t - wt('P4', 'force') + 0.1) / 0.5); rF.set(RP[0], RP[1], RP[0] + 200 * cosd(RA) * uf, RP[1] - 200 * sind(RA) * uf); rFl.style.opacity = uf.toFixed(3);
    M.draw(rRope, t, tP4, 0.4); M.draw(rArc, t, wt('P4', 'force') + 0.3, 0.4); vis(rThl, t, wt('P4', 'force') + 0.5, 1e9, { dy: 6 });
    const ud = M.o3((t - wt('P4', 'motion') + 0.1) / 0.5); rD.set(130, RF + 40, 130 + 280 * ud, RF + 40); rDl.style.opacity = ud.toFixed(3);
    M.draw(rDrop, t, wt('P4', 'counts') - 0.2, 0.4);
    const up = M.o3((t - wt('P4', 'shadow') + 0.1) / 0.5); rFp.set(RP[0], RP[1], RP[0] + 200 * cosd(RA) * up, RP[1]); rFpl.style.opacity = up.toFixed(3);
    PUC.write($('#prF'), t, wt('P5', 'force') - 0.1, 1.2);
  }

  /* S: the box sim */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const thv = thS(t), thR = Math.round(thv), dv = dS(t), dR = Math.round(dv * 100) / 100, x = X0 + dv * PXM, px = x + BW;
    attr(box, 'transform', `translate(${x.toFixed(1)},0)`);
    const moving = (t > tA && t < tA + 4 / v1) || (t > tB && t < tRep && t < tB + 4 / v2) || (t > tRes && t < tS8);
    ghosts.forEach((gg, k) => { const dt = (t > tRes && t < tS8 ? 1.4 : 0.32) * (k + 1), gx = X0 + dS(t - dt) * PXM, okG = !(t > tR2 && t - dt < tR2) && !(t > tRep && t - dt < tRes);
      attr(gg, 'transform', `translate(${gx.toFixed(1)},0)`); gg.style.opacity = moving && okG && Math.abs(gx - x) > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    const hx = px + RL * cosd(thv), hy = PY - RL * sind(thv); seg(rope, px, PY, hx, hy); attr(grip, 'cx', hx.toFixed(1)); attr(grip, 'cy', hy.toFixed(1));
    // vectors (regrow in the replay)
    const rep = t >= tRep && t < tS8 + 0.6;
    const uF = rep ? M.o3((t - wt('S7', 'rope') + 0.3) / 0.5) : M.o3((t - wt('S1', 'pulls') + 0.1) / 0.5);
    const uP = rep ? M.o3((t - wt('S7', 'forward') + 0.1) / 0.5) : 0;
    const fL = 50 * FS * uF, fx = px + fL * cosd(thv), fy = PY - fL * sind(thv);
    sF.set(px, PY, fx, fy); attr(sFl, 'x', (px + fL * 0.55 * cosd(thv) - 28 * sind(thv) - 10).toFixed(1)); attr(sFl, 'y', (PY - fL * 0.55 * sind(thv) - 26 * cosd(thv) + 6).toFixed(1)); sFl.style.opacity = uF.toFixed(3);
    sFp.set(px, PY, px + 50 * FS * cosd(thv) * uP, PY); attr(sFpl, 'x', (px + 50 * FS * cosd(thv) + 12).toFixed(1)); attr(sFpl, 'y', PY + 8); sFpl.style.opacity = uP.toFixed(3);
    seg(sDrop, fx, fy, fx, PY); sDrop.style.opacity = (uP * uF).toFixed(3);
    seg(sRef, px, PY, px + 110, PY); sRef.style.opacity = (thv > 2 ? uF : 0).toFixed(3);
    const ua = M.clamp((thv - 2) / 4) * uF; attr(sArc, 'd', arcD(px, PY, 50, 0, Math.max(thv, 0.01))); sArc.style.opacity = ua.toFixed(3);
    attr(sThl, 'x', (px + 60 * cosd(thv / 2) + 2).toFixed(1)); attr(sThl, 'y', (PY - 60 * sind(thv / 2) + 10).toFixed(1)); sThl.style.opacity = ua.toFixed(3);
    // displacement d along the ruler, and the work rectangle: height = forward force, width = d
    const dOn = M.io((t - tA + 0.2) / 0.3) * (rep ? M.io((t - tRes + 0.2) / 0.3) : 1);
    sD.set(X0, FY - BH - 22, X0 + dv * PXM * dOn, FY - BH - 22); attr(sDl, 'x', (X0 + dv * PXM / 2 - 6).toFixed(1)); attr(sDl, 'y', FY - BH - 34); sDl.style.opacity = (dv > 0.3 ? dOn : 0).toFixed(3);
    const fc = 50 * cosd(thR), hgt = fc * 1.4, wv = dR * PXM;
    attr(rect, 'width', Math.max(0, wv).toFixed(1)); attr(rect, 'height', hgt.toFixed(1)); M.hide(rect, wv < 1);
    attr(rectL, 'x', (X0 + wv / 2).toFixed(1)); attr(rectL, 'y', (FY + 64 + hgt / 2 + 8).toFixed(1)); M.setT(rectL, `W = ${f1(fc * dR)} J`); rectL.style.opacity = (wv > 150 ? 1 : 0);
    attr(rect1, 'width', 4 * PXM); M.hide(rect1, t < tR2); attr(rect1L, 'x', X0 + 4 * PXM + 10); attr(rect1L, 'y', FY + 64 + 24); M.hide(rect1L, t < tR2);
    vis($('#slo'), t, tRep, tS8 - 0.3, { ...POP, sc: 0.8 });
    M.setT($('#r_th'), String(thR)); M.setT($('#r_d'), f2(dR)); M.setT($('#r_w'), f1(fc * dR));
    // graph: W against d, one line per run, dot linked to the box
    const d1 = t < tR2 ? dv : 4; gc1(q => [q, 50 * q], 0, d1); gd(dv, fc * dv, t > tA - 0.3);
    const d2 = t < tR2 ? 0 : t < tRep ? dv : 4; gc2(q => [q, 25 * q], 0, d2);
    gl1.style.opacity = t > tA + 4 / v1 ? 1 : 0; gl2.style.opacity = t > tB + 4 / v2 && t > tR2 ? 1 : 0;
    vis($('#grP'), t, wt('S8', 'straight') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const ud = M.o3((t - wt('D2', 'displacement') + 0.1) / 0.5), uf = M.o3((t - wt('D2', 'force') + 0.1) / 0.5);
    dD.set(DO[0], DO[1], DO[0] + 400 * ud, DO[1]); dF.set(DO[0], DO[1], DO[0] + 220 * cosd(DTH) * uf, DO[1] - 220 * sind(DTH) * uf);
    dFl.style.opacity = uf.toFixed(3); dDlb.style.opacity = ud.toFixed(3); dDl.style.opacity = (0.45 * ud).toFixed(3);
    M.draw(dArc, t, wt('D2', 'forward') - 0.1, 0.4); vis(dThl, t, wt('D2', 'forward') + 0.1, 1e9, { dy: 6 });
    M.draw(dDr, t, wt('D2', 'forward') + 0.1, 0.4); const us = M.io((t - wt('D2', 'part') + 0.1) / 0.5); attr(dShF, 'x2', (DO[0] + 220 * cosd(DTH) * us).toFixed(1)); M.hide(dShF, us < 0.01); vis(dShl, t, wt('D2', 'part') + 0.2, 1e9, { dy: 6 });
    vis($('#dc0'), t, wt('D2', 'W') + 0.4, 1e9, POP); vis($('#dc1'), t, wt('D4', 'number') - 0.1, 1e9, POP); vis($('#dc2'), t, wt('D5', 'joule') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Only') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'counts') - 0.1, 0.8);
  }

  /* C: lift vs carry */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#c0'), t, T0('C2') - 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#c1'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ul = M.io((t - wt('C2', 'moves') + 0.1) / 1.4), by = 300 - 132 * ul;
    attr(cBag0, 'transform', `translate(300,${by.toFixed(1)})`);
    const f0 = M.o3((t - wt('C2', 'force') + 0.1) / 0.5); cF0.set(300, by - 74, 300, by - 74 - 70 * f0); attr(cF0l, 'x', 312); attr(cF0l, 'y', (by - 110).toFixed(1)); cF0l.style.opacity = f0.toFixed(3);
    const d0 = M.o3((t - wt('C2', 'moves') + 0.1) / 0.5); cD0.set(220, 296, 220, 296 - 132 * d0); attr(cD0l, 'x', 90); attr(cD0l, 'y', 236); cD0l.style.opacity = d0.toFixed(3);
    vis($('#sg0'), t, wt('C2', 'Work') - 0.1, 1e9, POP); PUC.write($('#c0a'), t, wt('C2', 'Work') - 0.1, 1.0);
    const uc = M.io((t - wt('C3', 'moves') + 0.1) / 1.6), cx = 150 + 300 * uc;
    attr(cBag1, 'transform', `translate(${cx.toFixed(1)},210)`); cBag1.style.opacity = M.clamp((t - T0('C3')) / 0.2).toFixed(3);
    const f1v = M.o3((t - wt('C3', 'pushes') + 0.1) / 0.5); cF1.set(cx, 136, cx, 136 - 70 * f1v); attr(cF1l, 'x', (cx + 12).toFixed(1)); attr(cF1l, 'y', 100); cF1l.style.opacity = f1v.toFixed(3);
    const d1 = M.o3((t - wt('C3', 'sideways') + 0.1) / 0.5); cD1.set(cx + 50, 186, cx + 50 + 120 * d1, 186); attr(cD1l, 'x', (cx + 60).toFixed(1)); attr(cD1l, 'y', 176); cD1l.style.opacity = d1.toFixed(3);
    attr(cRa, 'd', `M${(cx + 50).toFixed(1)},${170} h16 v16`); const ra = M.io((t - wt('C3', 'ninety') + 0.1) / 0.3); cRa.style.opacity = ra.toFixed(3);
    attr(cRal, 'x', (cx + 70).toFixed(1)); attr(cRal, 'y', 160); cRal.style.opacity = 0;
    vis($('#sg1'), t, wt('C3', 'zero', 1) - 0.1, 1e9, POP); PUC.write($('#c1a'), t, wt('C3', 'cos') - 0.1, 1.0);
    vis($('#th1'), t, T0('C4') + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: T0('C4'), tOpts: wt('C4', 'How') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'The') });
  }

  /* R: three links */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#rr'), t, T0('R3') - 0.3, out, { dx: 60, dy: 0, ...o });
    tLk.forEach((tt, i) => { const el = $('#lk' + i); vis(el, t, tt - 0.1, 1e9, { dx: -24, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tt) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('R3'))) / 0.3))); });
    vis($('#lkP'), t, wt('R5', 'Work') - 0.1, 1e9, POP);
    $('#rr').querySelectorAll('.rh3').forEach(el => vis(el, t, T0('R3') - 0.1, 1e9, { dy: 8 }));
    RT.forEach(([, cks], r) => { vis($('#rt' + r), t, T0('R' + (3 + r)) - 0.1, 1e9, { dx: -20, dy: 0 }); let j = 0;
      cks.forEach((c, k) => { if (c < 0) return; vis($('#ck' + r + k), t, tCk[r][j] - 0.05, 1e9, { ...POP, sc: 0.3 }); j++; });
      vis($('#rs' + r), t, tRs[r] - 0.1, 1e9, POP); });
    avA(t, wt('R5', 'done') + 0.2, out);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    vis(wPA, t, wt('W2', 'one') - 0.1, 1e9, { dy: 0, fade: 0.1 }); vis(wPAl, t, wt('W2', 'one'), 1e9, { dy: 6 });
    vis(wPB, t, wt('W2', 'five') - 0.1, 1e9, { dy: 0, fade: 0.1 }); vis(wPBl, t, wt('W2', 'five'), 1e9, { dy: 6 });
    const uf = M.o3((t - wt('W2', 'force') + 0.1) / 0.5), A = gP(1, 2); wF.set(A[0], A[1], A[0] + 6 * 22 * uf, A[1] - 2 * 22 * uf); wFl.style.opacity = uf.toFixed(3);
    const ud = M.o3((t - wt('W3', 'displacement') + 0.1) / 0.6), B = gP(5, 5); wD.set(A[0], A[1], A[0] + (B[0] - A[0]) * ud, A[1] + (B[1] - A[1]) * ud); wDl.style.opacity = ud.toFixed(3);
    M.draw(wDx, t, wt('W3', 'four') - 0.3, 0.4); vis(wDxl, t, wt('W3', 'four'), 1e9, { dy: 6 }); M.draw(wDy, t, wt('W3', 'three') - 0.3, 0.4); vis(wDyl, t, wt('W3', 'three'), 1e9, { dy: 6 });
    vis($('#wc2'), t, wt('W5', 'thirty') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'motion') - 0.1, tRight: wt('X3', 'W') });
    M.draw(tRope, t, wt('X2', 'rope') - 0.1, 0.4); M.draw(tVert, t, wt('X2', 'vertical') - 0.3, 0.4);
    M.draw(tA30, t, wt('X2', 'thirty') - 0.1, 0.4); vis(tA30l, t, wt('X2', 'thirty'), 1e9, { dy: 6 });
    const ud = M.o3((t - wt('X3', 'box') + 0.1) / 0.5); tD.set(60, 236, 60 + 160 * ud, 236); tDl.style.opacity = ud.toFixed(3);
    M.draw(tHor, t, wt('X3', 'floor') - 0.2, 0.4); M.draw(tA60, t, wt('X3', 'sixty') - 0.2, 0.4); vis(tA60l, t, wt('X3', 'sixty'), 1e9, { dy: 6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Work') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
