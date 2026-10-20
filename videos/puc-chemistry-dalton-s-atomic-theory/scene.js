// PUC Chemistry Ep 07: Dalton's atomic theory (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, equations, counters, recap): O teal (element in play), H ink, shared electrons orange, ratios gold
const OC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const O_ = s => `\\textcolor{${OC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const H2 = `${H_('H')}_2`, O2 = `${O_('O')}_2`, H2O = `${H_('H')}_2${O_('O')}`, H2O2 = `${H_('H')}_2${O_('O')}_2`;
const EQ = `${G_(2)}${H2} + ${O2} \\rightarrow ${G_(2)}${H2O}`;

Object.assign(M.IC, {
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  dots: ['M5 8h.01', 'M11 5h.01', 'M17 8h.01', 'M8 13h.01', 'M14 12h.01', 'M19 15h.01', 'M6 18h.01', 'M12 19h.01'],
  orb: ['M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: crushing sugar ---------- */
const JOBS = [['box', 'Sugar crystal', 'ONE PIECE', 'sugar'], ['dots', 'Powder', 'FINER AND FINER', 'finer'], ['help', 'Forever?', 'OR IS THERE A LIMIT?', 'forever']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H: three puzzles ---------- */
const PZ = [['dots', 'Crushed sugar', 'CAN IT GO ON FOREVER?'], ['droplet', 'Well water, rain water', 'WHY THE SAME RECIPE?'], ['flame', 'A burning candle', 'WHERE DOES THE WAX GO?']];
$('#jrs').innerHTML = PZ.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tPz = [tMorph + 0.3, wt('H2', 'Water') - 0.05, wt('H2', 'candle') - 0.1];

/* ---------- P: Dalton + cutting ---------- */
$('#dBk i').innerHTML = M.icon('book', 30, C.ac, 2.2);
$('#dAtI').innerHTML = M.icon('orb', 30, '#fff', 2.2);
const cs = $('#cS'), CX0 = 192, CY0 = 120, CW = 100, CH = 70, CG = 16;
const cells = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) cells.push({ c, r, el: mk(cs, 'rect', { width: CW + 0.6, height: CH + 0.6, fill: '#E7EEF0', stroke: 'none' }) });
const outl = [];   // piece outlines are drawn per cell edge: thin ink border around each piece shows via cell strokes at cuts
const tCut = [wt('P3', 'Two'), wt('P3', 'four'), wt('P3', 'eight'), wt('P3', 'sixteen')];
// cuts: [axis, boundary, stage]
const CUTS = [['v', 2, 0], ['h', 2, 1], ['v', 1, 2], ['v', 3, 2], ['h', 1, 3], ['h', 3, 3]];
const knives = CUTS.map(() => mk(cs, 'line', { stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '8 8', 'stroke-linecap': 'round' }));
const lat = mk(cs, 'g', {}); mk(lat, 'defs', {}).innerHTML = '<clipPath id="zclip"><circle cx="392" cy="300" r="190"/></clipPath>';
const latIn = mk(lat, 'g', { 'clip-path': 'url(#zclip)' });
mk(latIn, 'circle', { cx: 392, cy: 300, r: 190, fill: '#F4FBFB' });
const LB = [];
for (let r = -4; r <= 4; r++) for (let c = -5; c <= 5; c++) { const x = 392 + c * 68 + (r & 1 ? 34 : 0), y = 300 + r * 59; if (Math.hypot(x - 392, y - 300) < 230) LB.push(mk(latIn, 'circle', { cx: x, cy: y, r: 28, fill: OC, opacity: 0.85 })); }
mk(lat, 'circle', { cx: 392, cy: 300, r: 190, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
const one = mk(cs, 'circle', { cx: 392, cy: 300, r: 36, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
const oneCut = mk(cs, 'path', { d: 'M330 240 L454 360', stroke: C.red, 'stroke-width': 5, 'stroke-dasharray': '10 10', 'stroke-linecap': 'round', fill: 'none' });
const oneX = mk(cs, 'g', {}); mk(oneX, 'circle', { cx: 470, cy: 230, r: 22, fill: C.red }); oneX.insertAdjacentHTML('beforeend', `<g transform="translate(458 218)">${M.icon('x', 24, '#fff', 3)}</g>`);
const zTag = document.createElement('div'); zTag.className = 'btag'; zTag.style.cssText = 'left:36px;top:510px;background:var(--ink);color:#fff'; $('#pc').appendChild(zTag);

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
// phase 1: a lump of atoms, one cut fails
const lump = mk(bW, 'g', {}); const LU = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) LU.push(mk(lump, 'circle', { cx: 200 + c * 64 + (r & 1 ? 32 : 0), cy: 150 + r * 56, r: 28, fill: OC, opacity: 0.9 }));
const lCut = mk(bW, 'path', { d: 'M360 120 L460 340', stroke: C.red, 'stroke-width': 5, 'stroke-dasharray': '10 10', 'stroke-linecap': 'round', fill: 'none' });
const lX = mk(bW, 'g', {}); mk(lX, 'circle', { cx: 482, cy: 352, r: 22, fill: C.red }); lX.insertAdjacentHTML('beforeend', `<g transform="translate(470 340)">${M.icon('x', 24, '#fff', 3)}</g>`);
// phase 2: rows of identical atoms
const rowH = mk(bW, 'g', {}), rowO = mk(bW, 'g', {});
for (let i = 0; i < 6; i++) { const g = atomG(rowH, 24, HC, 'H', 22); attr(g, 'transform', `translate(${150 + i * 74} 150)`); }
txt(rowH, 150 - 24, 214, 'ALL H ATOMS ALIKE · LIGHT', { 'font-size': 18, fill: HC, 'font-weight': 600 });
for (let i = 0; i < 4; i++) { const g = atomG(rowO, 40, OC, 'O', 32); attr(g, 'transform', `translate(${166 + i * 112} 300)`); }
txt(rowO, 126, 378, 'ALL O ATOMS ALIKE · HEAVIER', { 'font-size': 18, fill: OC, 'font-weight': 600 });
// phase 3: balance, 1 O against 16 H
const bal = mk(bW, 'g', {}), PVX = 392, PVY = 170, BL = 220;
mk(bal, 'path', { d: `M${PVX} ${PVY} L${PVX - 44} 430 H${PVX + 44} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const beam = mk(bal, 'g', {}); mk(beam, 'rect', { x: -BL, y: -7, width: BL * 2, height: 14, rx: 7, fill: C.ink });
const pans = [0, 1].map(() => { const g = mk(bal, 'g', {}); mk(g, 'line', { x1: -80, y1: 120, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'line', { x1: 80, y1: 120, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-100 120 H100 C100 144 64 154 0 154 C-64 154 -100 144 -100 120Z', fill: '#E9E5DA', stroke: C.ink, 'stroke-width': 2.5 }); return g; });
mk(bal, 'circle', { cx: PVX, cy: PVY, r: 10, fill: C.ac });
const balO = atomG(pans[0], 36, OC, 'O', 30); attr(balO, 'transform', 'translate(0 82)');
const SLOT = []; [[6, 107], [5, 85], [4, 63], [1, 41]].forEach(([n, y]) => { for (let i = 0; i < n; i++) SLOT.push([(i - (n - 1) / 2) * 23, y]); });
const balH = SLOT.map(() => mk(pans[1], 'circle', { r: 11, fill: HC }));
const nTxt = txt(bal, PVX + BL, 112, '', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 }), oTxt = txt(bal, PVX - BL, 112, 'O ATOMS 1', { 'text-anchor': 'middle', 'font-size': 24, fill: OC, 'font-weight': 600 });
// phase 4-5: the water molecules and the reaction (atoms reused)
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r }; };
atom('Oa', 40, OC, 'O', 32); atom('Ob', 40, OC, 'O', 32);
for (let i = 1; i <= 4; i++) atom('H' + i, 26, HC, 'H', 24);
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const drawBond = (bd, P, u, eu, AA = A) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = AA[bd.a].r - 6, r2 = AA[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
const BND = { a1: bond('Oa', 'H1', 1), a2: bond('Oa', 'H2', 1), b1: bond('Ob', 'H3', 1), b2: bond('Ob', 'H4', 1), HHa: bond('H1', 'H3', 1), HHb: bond('H2', 'H4', 1), OO: bond('Oa', 'Ob', 2) };
const WAT = { Oa: [230, 236], H1: [143, 303], H2: [317, 303], Ob: [560, 236], H3: [473, 303], H4: [647, 303] };
const SCAT = { Oa: [210, 170], Ob: [580, 180], H1: [100, 330], H2: [340, 360], H3: [450, 330], H4: [690, 350] };
const REAC = { H1: [110, 150], H3: [180, 150], H2: [110, 320], H4: [180, 320], Oa: [470, 236], Ob: [580, 236] };
// beats on the bench
const tIdx = [T0('S2'), T0('S3'), T0('S5'), T0('S7')];
const tInd = wt('S2', 'Indivisible'), tIdent = wt('S3', 'identical'), tDiff = wt('S3', 'different');
const tWatch = T0('S4'), tHon = wt('S4', 'hydrogen'), tBalOk = wt('S4', 'balance');
const tS5 = T0('S5'), tShare = wt('S6', 'shares') - 0.2, tPair = wt('S6', 'pair'), tAlw = wt('S6', 'Always');
const tS7 = T0('S7'), tSw = tS7 + 0.35, tBrk = wt('S8', 'break'), tMov = wt('S8', 'change'), tForm = wt('S8', 'form');
const tB1 = T0('B1'), tBef = wt('B1', 'before'), tAft = wt('B1', 'after');
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#bEq').innerHTML = K(EQ);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So burning wax just rearranges atoms?' });
// postulate list
const POS = [['Matter is made of indivisible atoms', 'INDIVISIBLE = CANNOT BE SPLIT'], ['Atoms of one element are identical', 'SAME MASS · ELEMENTS DIFFER IN MASS'], ['Atoms join in a fixed ratio', 'THIS MAKES A COMPOUND'], ['Reactions only rearrange atoms', 'NONE MADE · NONE DESTROYED']];
$('#pos').innerHTML = POS.map(([a, s], i) => `<div class="po" id="po${i}" style="top:${80 + i * 118}px"><div class="nn">${i + 1}</div><div class="pt1">${a}</div><div class="pt2">${s}</div><div class="pm" id="pm${i}">${M.icon('check', 24, '#fff', 3)}</div></div>`).join('');

/* ---------- B: compare + think ---------- */
const ms = $('#mS'), MA = {}, mb = [];
const mAtom = (k, x, y, r, fill, lab, fs) => { const g = atomG(ms, r, fill, lab, fs); attr(g, 'transform', `translate(${x} ${y})`); MA[k] = { g, r, p: [x, y] }; return g; };
const mBondL = mk(ms, 'g', {}); ms.insertBefore(mBondL, ms.firstChild);
const mBond = (a, c, n) => { const bd = { a, c, n, ln: Array.from({ length: n }, () => mk(mBondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(ms, 'circle', { r: 6, fill: EC })) }; mb.push(bd); return bd; };
mAtom('wO', 400, 260, 48, OC, 'O', 38); mAtom('wH1', 400 - 0.791 * 130, 260 + 0.612 * 130, 32, HC, 'H', 28); mAtom('wH2', 400 + 0.791 * 130, 260 + 0.612 * 130, 32, HC, 'H', 28);
mAtom('pO1', 1130, 270, 48, OC, 'O', 38); mAtom('pO2', 1272, 270, 48, OC, 'O', 38); mAtom('pH1', 1040, 362, 32, HC, 'H', 28); mAtom('pH2', 1362, 178, 32, HC, 'H', 28);
const MB = [mBond('wO', 'wH1', 1), mBond('wO', 'wH2', 1), mBond('pH1', 'pO1', 1), mBond('pO1', 'pO2', 1), mBond('pO2', 'pH2', 1)];
const MP = {}; for (const k in MA) MP[k] = MA[k].p;
$('#cT0').innerHTML = `${K(H2O)} <span style="font-weight:600">Water</span>`; $('#cT1').innerHTML = `${K(H2O2)} <span style="font-weight:600">Hydrogen peroxide</span>`;
const th1 = PUC.think($('#th1'), { q: `${K(H2O)} and ${K(H2O2)}: same two elements. Are they the same compound?`, opts: ['Same', 'Different'], right: 1, why: 'H : O is 2 : 1 in water but 1 : 1 in hydrogen peroxide. A new ratio makes a new compound.' });

/* ---------- D: link by link ---------- */
const LK = [['LINK 1', 'Atoms are never made or destroyed', 'Total mass stays the same', 'Conservation of mass', 'D2', 'So', 'law'],
  ['LINK 2', 'Fixed mass per atom + fixed ratio of atoms', 'Mass ratio is fixed', 'Definite proportions', 'D3', 'So', 'law'],
  ['LINK 3', `2 g H with 16 g O (water), with 32 g O (peroxide)`, `${K(`${O_('16')} : ${O_('32')} = ${G_('1 : 2')}`)}`, 'Multiple proportions', 'D4', 'Sixteen', 'law']];
$('#lkr').innerHTML = LK.map(([tg, a, bb, law], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 152}px"><div class="lt">${tg}</div><div class="a">${a}</div><div class="ar" style="left:650px">${M.icon('arrowR', 40, C.ac, 2.6)}</div><div class="b">${bb}</div><div class="law">Law of ${law.toLowerCase()}</div></div>`).join('');
const tLk = LK.map(([, , , , id, w, lw], i) => i < 2 ? [T0(id), wt(id, w), wt(id, lw)] : [T0('D4'), T0('D5'), wt('D5', lw)]);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`72 \\div 18 = ${G_(4)} \\quad \\text{(four times the water)}`)],
  [K(`${H_('H')}: ${G_(4)} \\times 2 = 8\\,\\text{g}`)],
  [K(`${O_('O')}: ${G_(4)} \\times 16 = 64\\,\\text{g}`)],
  [K(`8\\,\\text{g} + 64\\,\\text{g} = 72\\,\\text{g} \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 88 });
const tWs = [T0('W4'), wt('W5', 'Hydrogen'), wt('W5', 'Oxygen'), T0('W6')];
const s2 = $('#wS2'), UG = 13, BASE = 400, BX = [172, 318, 464, 610];
mk(s2, 'line', { x1: 96, y1: BASE + 2, x2: 688, y2: BASE + 2, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const bars = BX.map((x, i) => { const g = mk(s2, 'g', {});
  const o = mk(g, 'rect', { x: x - 50, y: BASE - 16 * UG, width: 100, height: 16 * UG, rx: 6, fill: OC });
  const h = mk(g, 'rect', { x: x - 50, y: BASE - 18 * UG, width: 100, height: 2 * UG - 3, rx: 6, fill: HC });
  txt(g, x, BASE - 8 * UG + 8, '16 g O', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 600 });
  txt(g, x, BASE - 17 * UG + 5, '2 g H', { 'text-anchor': 'middle', 'font-size': 15, fill: '#fff', 'font-weight': 600 });
  txt(g, x, BASE - 18 * UG - 14, '18 g', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
  return { g, o, h }; });
const sumH = txt(s2, 96, BASE + 50, 'H  4 × 2 = 8 g', { 'font-size': 26, fill: HC, 'font-weight': 600 }), sumO = txt(s2, 688, BASE + 50, 'O  4 × 16 = 64 g', { 'font-size': 26, fill: OC, 'font-weight': 600, 'text-anchor': 'end' });
const tBar = [wt('W2', 'Eighteen'), wt('W4', 'four'), wt('W4', 'four') + 0.15, wt('W4', 'four') + 0.3];

/* ---------- C: what survived ---------- */
const SV = [['Atoms cannot be divided', 0], ['Same element, same mass', 0], ['Atoms join in a fixed ratio', 1], ['Reactions only rearrange atoms', 1]];
$('#srs').innerHTML = SV.map(([n, ok], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 112}px"><div class="nn">${i + 1}</div><div class="sn2">${n}</div><div class="st" id="sst${i}" style="background:${ok ? 'var(--okBg)' : 'var(--redBg)'};color:${ok ? '#1F6B3F' : 'var(--red)'}">${ok ? 'STILL HOLDS' : 'BROKEN'}</div></div>`).join('');
const tSv = [wt('C2', 'broke'), wt('C3', 'broke'), wt('C4', 'three'), wt('C4', 'four')];
const PANE = [['IDEA 1 · BROKEN', 'Atoms have parts'], ['IDEA 2 · BROKEN', 'Isotopes'], ['IDEAS 3 AND 4 · HOLD', 'Still true today'], ['GAPS IN THE THEORY', 'What it could not explain']];
$('#pns').innerHTML = PANE.map(([s, t], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="ptt">${t}</div><svg width="784" height="580" id="pv${i}"></svg></div>`).join('');
// pane 0: nucleus + orbiting electron
const p0 = $('#pv0'), NX = 300, NY = 330;
mk(p0, 'circle', { cx: NX, cy: NY, r: 130, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const nuc = mk(p0, 'g', {}); [[-14, -12, OC], [12, -14, C.ink2], [-12, 12, C.ink2], [14, 10, OC], [0, 0, OC]].forEach(([dx, dy, f]) => mk(nuc, 'circle', { cx: NX + dx, cy: NY + dy, r: 16, fill: f, stroke: '#fff', 'stroke-width': 2 }));
const eDot = mk(p0, 'circle', { r: 11, fill: EC });
txt(p0, 470, 290, 'ELECTRON', { 'font-size': 20, fill: EC, 'font-weight': 600 });
txt(p0, 470, 334, 'NUCLEUS', { 'font-size': 20, fill: OC, 'font-weight': 600 });
txt(p0, 470, 364, 'PROTONS + NEUTRONS', { 'font-size': 16, fill: C.mute, 'font-weight': 600 });
// pane 1: isotopes
const p1 = $('#pv1');
[[230, '35'], [554, '37']].forEach(([x, m], i) => { const g = atomG(p1, 70 + i * 4, OC, 'Cl', 46); attr(g, 'transform', `translate(${x} 300)`); const tg = mk(p1, 'g', {}); mk(tg, 'rect', { x: x - 70, y: 400, width: 140, height: 48, rx: 10, fill: C.soft }); txt(tg, x, 433, `MASS ${m}`, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); });
txt(p1, 392, 494, 'SAME ELEMENT · DIFFERENT MASS', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
// pane 2: still true
$('#pn2').insertAdjacentHTML('beforeend', `<div class="fx" style="left:36px;top:190px;font-size:52px">${K(EQ)}</div>
  <div class="bc" style="left:36px;top:300px"><b>H</b><span>4 | 4</span><span class="cm">${M.icon('check', 18, '#fff', 3)}</span></div><div class="bc" style="left:260px;top:300px"><b class="n">O</b><span>2 | 2</span><span class="cm">${M.icon('check', 18, '#fff', 3)}</span></div>
  <div class="pillp good" style="left:36px;top:400px">Mass before = mass after</div>`);
// pane 3: gaps
$('#pn3').insertAdjacentHTML('beforeend', [['Law of gaseous volumes', 'COULD NOT EXPLAIN IT'], ['Why do atoms join at all?', 'ANSWERED IN CHAPTER 4 · BONDING']].map(([a, s], i) => `<div class="gp" id="gp${i}" style="top:${190 + i * 120}px"><i>${M.icon('x', 26, '#fff', 3)}</i><div class="g1">${a}</div><div class="g2">${s}</div></div>`).join(''));
const tPn = [T0('C2'), T0('C3'), T0('C4'), T0('C5')];
const avD = PUC.avatar($('#cp'), { x: 36, y: 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the uncuttable atom has insides!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'All atoms of an element have the same mass', right: `Isotopes: ${K(`^{35}${O_('Cl')}`)} and ${K(`^{37}${O_('Cl')}`)}, same element, different mass` });
const tsv = $('#tS');
const gSame = mk(tsv, 'g', {}); [[120, 'Cl'], [210, 'Cl']].forEach(([x]) => { const g = atomG(gSame, 34, OC, 'Cl', 24); attr(g, 'transform', `translate(${x} 118)`); });
txt(gSame, 165, 200, '"ALWAYS SAME MASS"', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xSame = mk(tsv, 'path', { d: 'M90 70 L240 170 M240 70 L90 170', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const gIso = mk(tsv, 'g', {}); [[370, 34, '35'], [470, 38, '37']].forEach(([x, r, m]) => { const g = atomG(gIso, r, OC, 'Cl', 24); attr(g, 'transform', `translate(${x} 118)`); txt(gIso, x, 184, m, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); });
txt(gIso, 420, 222, 'ISOTOPES', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Statement questions: which postulate still holds, and which law it explains' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Which statement of Dalton\'s atomic theory is still accepted without change?', qW: 780,
  opts: ['Atoms cannot be divided', 'All atoms of an element have identical mass', 'Atoms are neither created nor destroyed in a chemical reaction', 'It explains the law of gaseous volumes'], right: 2, cols: 1, optW: 968, optY: 236, optH: 76, optFs: 28 });
const so = PUC.solution($('#so'), [['<b>A</b> ✗ atoms have e⁻, p, n'], ['<b>B</b> ✗ isotopes ³⁵Cl, ³⁷Cl'], ['<b>D</b> ✗ gaseous volumes'], [`<b>C</b> ✓ <span style="color:${C.ok}">atoms only rearrange</span>`]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Only')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · Dalton\'s atomic theory (1808)', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>1</b> Matter is made of indivisible atoms <span style="color:var(--red)">· now: atoms have parts</span>', '<b>2</b> Atoms of one element are identical <span style="color:var(--red)">· now: isotopes</span>', '<b>3</b> Atoms join in a fixed ratio · <b>4</b> reactions only rearrange atoms', '<b>Explains</b>: conservation of mass, definite and multiple proportions'] });
const YQ = ['State Dalton\'s four ideas in your own words.', 'How does idea four explain the law of conservation of mass?', 'Which of Dalton\'s ideas do isotopes break?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 08', topic: 'How do we weigh one atom? Atomic Mass and Molecular Mass', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tHon - 0.2, 1.05, 960, 560], [tS5 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.po .pt1').forEach(q => { if (q.offsetWidth > 560) q.style.fontSize = Math.floor(26 * 560 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.opt .ot').forEach(q => { if (q.scrollWidth > 840) q.style.fontSize = Math.floor(28 * 840 / q.scrollWidth) + 'px'; });
  $('#bc0').style.left = (784 - 36 - $('#bc0').offsetWidth) + 'px'; $('#bc1').style.left = (784 - 36 - $('#bc0').offsetWidth - 16 - $('#bc1').offsetWidth) + 'px';
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const lerp2 = (a, c, u) => [M.lerp(a[0], c[0], u), M.lerp(a[1], c[1], u)];

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    PZ.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tPz[i], 1e9, { dy: 16 }); const on = M.io((t - wt('H4', 'all') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hjP'), t, wt('H4', 'one', 1) - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hTz'), t, wt('H3', 'grinding') - 0.1, 1e9, POP);
  }

  /* P: Dalton + cutting */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dN'), t, wt('P2', 'John') - 0.1, 1e9, { dy: 12 }); M.vis($('#dB'), t, wt('P2', 'Dalton') + 0.1, 1e9, { dy: 8 });
    M.vis($('#dBk'), t, wt('P2', 'published') - 0.1, 1e9, { dy: 14 });
    M.vis($('#dAt'), t, wt('P2', 'Atom') - 0.1, 1e9, POP);
    M.vis($('#dDef'), t, wt('P5', 'smallest') - 0.2, 1e9, { dy: 12 });
    M.vis($('#pc'), t, T0('P3') - 0.2, out, { dx: 60, dy: 0, ...o });
    // the block, cut into 2, 4, 8, 16
    const cu = tCut.map(tc => M.io((t - tc) / 0.35));
    const vc = CUTS.filter(c => c[0] === 'v'), hc = CUTS.filter(c => c[0] === 'h');
    const gx = c => vc.reduce((a, [, bd, st]) => a + (c >= bd ? cu[st] * CG : 0), 0), gy = r => hc.reduce((a, [, bd, st]) => a + (r >= bd ? cu[st] * CG : 0), 0);
    const tw = gx(4), th = gy(4), bOut = M.io((t - wt('P4', 'end') + 0.1) / 0.35), bIn = M.io((t - T0('P3') - 0.1) / 0.3);
    cells.forEach(({ c, r, el }) => { attr(el, 'x', (CX0 + c * CW + gx(c) - tw / 2).toFixed(1)); attr(el, 'y', (CY0 + r * CH + gy(r) - th / 2).toFixed(1)); el.style.opacity = (bIn * (1 - bOut)).toFixed(3); attr(el, 'stroke', C.ink2); attr(el, 'stroke-width', 0); });
    CUTS.forEach(([ax, bd, st], i) => { const k = knives[i], u = M.io((t - tCut[st] + 0.3) / 0.2) * (1 - M.io((t - tCut[st] - 0.1) / 0.25));
      if (ax === 'v') { const x = CX0 + bd * CW + gx(bd) - tw / 2 - cu[st] * CG / 2; attr(k, 'x1', x.toFixed(1)); attr(k, 'x2', x.toFixed(1)); attr(k, 'y1', CY0 - 30 - th / 2); attr(k, 'y2', CY0 + 4 * CH + th / 2 + 30); }
      else { const y = CY0 + bd * CH + gy(bd) - th / 2 - cu[st] * CG / 2; attr(k, 'y1', y.toFixed(1)); attr(k, 'y2', y.toFixed(1)); attr(k, 'x1', CX0 - 30 - tw / 2); attr(k, 'x2', CX0 + 4 * CW + tw / 2 + 30); }
      k.style.opacity = u.toFixed(3); M.hide(k, u <= 0.01); });
    const nP = [1, 2, 4, 8, 16][tCut.reduce((a, tc, i) => t >= tc ? i + 1 : a, 0)];
    M.setT($('#cutN'), t >= wt('P4', 'end') ? 'ZOOM IN' : `PIECES · ${nP}`); M.vis($('#cutN'), t, T0('P3') + 0.1, 1e9, { dy: 8 });
    // the zoom: a lattice of atoms, one atom ringed, the cut fails
    const zu = M.io((t - wt('P4', 'end')) / 0.5); lat.style.opacity = zu.toFixed(3); M.hide(lat, zu <= 0.002); attr(lat, 'transform', `translate(392 300) scale(${(0.6 + 0.4 * zu).toFixed(3)}) translate(-392 -300)`);
    fade(one, t, wt('P4', 'piece') - 0.1); M.draw(oneCut, t, wt('P4', 'cannot') - 0.05, 0.4); fade(oneX, t, wt('P4', 'cannot') + 0.35, 1e9, 0.2);
    M.setT(zTag, t < wt('P4', 'atom') - 0.1 ? 'CANNOT BE CUT AGAIN' : 'DALTON: THE ATOM'); M.vis(zTag, t, wt('P4', 'cannot') + 0.3, 1e9, POP);
  }

  /* S: the bench, four postulates */
  const sOn = t >= tS1 - 0.1 && t < tB2 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#pl'), t, tS1 + 0.2, z, { dx: 60, dy: 0, ...o });
    const cur = tIdx.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    POS.forEach((_, i) => { const el = $('#po' + i); M.vis(el, t, tIdx[i] - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, cur === i ? M.io((t - tIdx[i] + 0.1) / 0.3) : 0));
      M.vis($('#pm' + i), t, (i < 3 ? tIdx[i + 1] : tAft) - 0.3, 1e9, { ...POP, sc: 0.3 }); });
    // phase 1: lump
    fade(lump, t, tS1 + 0.4, tIdx[1] - 0.2, 0.3); LU.forEach((c, i) => { c.style.opacity = (0.9 * M.io((t - tS1 - 0.4 - i * 0.04) / 0.25)).toFixed(3); });
    if (t < tIdx[1]) { M.draw(lCut, t, tInd - 0.1, 0.4); fade(lX, t, tInd + 0.3, tIdx[1] - 0.2, 0.2); } else { M.hide(lCut, true); M.hide(lX, true); }
    // phase 2: identical rows
    fade(rowH, t, tIdent - 0.2, tWatch - 0.1, 0.3); fade(rowO, t, tDiff - 0.2, tWatch - 0.1, 0.3);
    // phase 3: balance
    const balIn = fade(bal, t, tWatch + 0.1, tS5 - 0.2, 0.3);
    if (balIn > 0) {
      const NH = SLOT.length, tDrop = i => M.lerp(tHon, tBalOk - 0.2, i / (NH - 1));
      let landed = 0;
      balH.forEach((c, i) => { const td = tDrop(i), u = M.clamp((t - td) / 0.35), [sx, sy] = SLOT[i]; attr(c, 'cx', sx.toFixed(1)); attr(c, 'cy', (sy - 160 * (1 - M.i3(u))).toFixed(1)); c.style.opacity = M.clamp((t - td) / 0.1).toFixed(3); M.hide(c, t < td); landed += M.i3(u); });
      const an = -11 * (1 - landed / NH), r = an * Math.PI / 180;
      attr(beam, 'transform', `translate(${PVX} ${PVY}) rotate(${an.toFixed(2)})`);
      pans.forEach((p, i) => { const s = i ? 1 : -1, x = PVX + s * BL * Math.cos(r), y = PVY + s * BL * Math.sin(r); attr(p, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); });
      const n = balH.reduce((a, _, i) => a + (t >= tDrop(i) + 0.35 ? 1 : 0), 0);
      M.setT(nTxt, `H ATOMS ${n}`); attr(nTxt, 'fill', n >= NH ? C.ok : HC); attr(oTxt, 'fill', n >= NH ? C.ok : OC);
    }
    // phase 4-5: water, then the reaction
    const P = {}, swp = t >= tSw;
    const ks = ['Oa', 'Ob', 'H1', 'H2', 'H3', 'H4'];
    ks.forEach((k, i) => {
      if (!swp) P[k] = lerp2(SCAT[k], WAT[k], M.io((t - tShare - (k[0] === 'H' ? 0.1 + i * 0.08 : 0)) / 0.9));
      else { const br = M.io((t - tBrk) / 0.35), sep = REAC[k].slice(); if (k[0] === 'H') sep[0] += (k === 'H3' || k === 'H4' ? 14 : -14) * br; else sep[0] += (k === 'Ob' ? 16 : -16) * br; P[k] = lerp2(sep, WAT[k], M.io((t - tMov - i * 0.1) / 0.9)); }
      attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`);
      const op = swp ? M.io((t - tSw - 0.05) / 0.3) : M.io((t - tS5 - 0.2 - i * 0.06) / 0.3) * (1 - M.io((t - tS7 + 0.05) / 0.3));
      A[k].g.style.opacity = op.toFixed(3); M.hide(A[k].g, op <= 0.002);
    });
    const wOut = swp ? 0 : 1 - M.io((t - tS7 + 0.05) / 0.3);
    ['a1', 'a2', 'b1', 'b2'].forEach((k, i) => { const u = swp ? M.io((t - tForm - i * 0.15) / 0.4) : M.io((t - tPair - i * 0.15) / 0.4) * wOut; drawBond(BND[k], P, u, u); });
    const rIn = swp ? M.io((t - tSw - 0.1) / 0.35) * (1 - M.io((t - tBrk) / 0.35)) : 0;
    ['HHa', 'HHb', 'OO'].forEach(k => drawBond(BND[k], P, rIn, rIn));
    // bench tag
    const TAG = [[tS1 + 0.5, 'MATTER = ATOMS'], [tInd, 'CANNOT BE SPLIT'], [tIdent, 'ALL H ATOMS ALIKE'], [tDiff, 'O ATOMS ARE HEAVIER'], [tHon, '1 O VS H ATOMS'], [tBalOk + 0.2, '1 O ≈ 16 H'], [tS5 + 0.2, 'H AND O ATOMS'], [tPair, 'SHARED ELECTRON PAIRS'], [tAlw, 'H : O = 2 : 1'], [tS7 + 0.2, '2H₂ + O₂'], [tBrk, 'OLD BONDS BREAK'], [tMov, 'ATOMS CHANGE PARTNERS'], [tForm, 'NEW BONDS FORM'], [tB1, 'SAME ATOMS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.5, 1e9, POP);
    setBg(btag, tg === 'H : O = 2 : 1' ? GC : tg === '1 O ≈ 16 H' ? C.ok : C.ink);
    // equation + counters (reaction)
    M.vis($('#bEq'), t, tS7 + 0.3, 1e9, { dy: 10 });
    [['#bc0', '#bv0', '#bm0', '2 | 2', 2], ['#bc1', '#bv1', '#bm1', '4 | 4', 4]].forEach(([c, v, m, s, n], i) => {
      M.vis($(c), t, tBef - 0.2 + i * 0.12, 1e9, { dx: -16, dy: 0 }); M.setT($(v), t >= tAft - 0.1 ? s : `${n} | ?`);
      M.vis($(m), t, tAft + 0.2 + i * 0.1, 1e9, { ...POP, sc: 0.3 }); PUC.setIco($(m), 'check', '#fff', 18, 3); });
    // periodic strip: O and H light; it leaves for the avatar
    const stOff = tB1 + 1.2;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['H', tIdent, HC], ['O', tDiff, OC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avA(t, stOff + 0.3, z);
  }

  /* B: compare + think */
  const bOn = t >= tB2 - 0.1 && t < tD1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#cmp'), t, tB2 + 0.05, OUT('B4'), { dy: 36, ...o });
    const tw0 = wt('B2', 'water') - 0.1, tw1 = wt('B2', 'peroxide') - 0.1;
    ['wO', 'wH1', 'wH2'].forEach((k, i) => fade(MA[k].g, t, tw0 + i * 0.1, 1e9, 0.3));
    ['pH1', 'pO1', 'pO2', 'pH2'].forEach((k, i) => fade(MA[k].g, t, tw1 + i * 0.1, 1e9, 0.3));
    MB.forEach((bd, i) => { const u = M.io((t - (i < 2 ? tw0 + 0.4 : tw1 + 0.5) - (i % 3) * 0.12) / 0.4); drawBond(bd, MP, u, u, MA); });
    M.vis($('#cT0'), t, tw0, 1e9, { dy: 12 }); M.vis($('#cT1'), t, tw1, 1e9, { dy: 12 });
    M.vis($('#cR0'), t, wt('B3', 'two') - 0.1, 1e9, POP); M.vis($('#cR1'), t, wt('B3', 'one') - 0.1, 1e9, POP);
    M.vis($('#cmpV'), t, tw1 - 0.2, 1e9, { dy: 0 });
    M.vis($('#th1'), t, T0('B4') + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: T0('B4'), tOpts: wt('B4', 'same', 1) - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'ratio') });
  }

  /* D: link by link */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#lks'), t, tD1 + 0.05, OUT('T1'), { dy: 36, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i), [a, bb, lw] = tLk[i];
      M.vis(el, t, a - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis(el.querySelector('.lt'), t, a, 1e9, POP); M.rise(el.querySelector('.a'), t, a + 0.15, { st: 0.04 });
      M.vis(el.querySelector('.ar'), t, bb - 0.2, 1e9, { dx: -12, dy: 0 }); M.vis(el.querySelector('.b'), t, bb - 0.1, 1e9, { dx: -12, dy: 0 });
      M.vis(el.querySelector('.law'), t, lw - 0.1, 1e9, POP);
      const nxt = i < 2 ? tLk[i + 1][0] : tT; setBg(el, mix(C.soft, C.ac2, M.io((t - a) / 0.3) * (1 - M.io((t - nxt) / 0.3)))); });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'In') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'atoms') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'partners') + 0.2, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const hiH = M.io((t - tWs[1]) / 0.3) * (1 - M.io((t - tWs[2]) / 0.3)), hiO = M.io((t - tWs[2]) / 0.3) * (1 - M.io((t - tWs[3]) / 0.3));
    bars.forEach((br, i) => { M.vis(br.g, t, tBar[i] - 0.1, 1e9, { dy: 30 }); br.h.style.opacity = (1 - 0.6 * hiO).toFixed(3); br.o.style.opacity = (1 - 0.6 * hiH).toFixed(3); });
    fade(sumH, t, tWs[1] + 0.2); fade(sumO, t, tWs[2] + 0.2);
    M.vis($('#wGp'), t, wt('W6', 'Eight') - 0.1, 1e9, POP);
  }

  /* C: what survived */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tPn[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    SV.forEach((_, i) => { const el = $('#sr' + i); M.vis(el, t, tC1 + 0.3 + i * 0.1, 1e9, { dy: 14 }); M.vis($('#sst' + i), t, tSv[i] - 0.1, 1e9, POP);
      const on = M.io((t - tSv[i] + 0.15) / 0.3) * (1 - M.io((t - (i < 3 ? tSv[i + 1] : T0('C5')) + 0.15) / 0.3)); setBg(el, mix(C.soft, C.ac2, on)); });
    PANE.forEach((_, i) => { const tin = tPn[i] - 0.15, tout = i < 3 ? tPn[i + 1] - 0.15 : 1e9; M.vis($('#pn' + i), t, tin, tout, { dy: 20, outDur: 0.2, ody: -10 }); });
    const ea = (t - tPn[0]) * 2.4; attr(eDot, 'cx', (NX + 130 * Math.cos(ea)).toFixed(1)); attr(eDot, 'cy', (NY + 130 * Math.sin(ea)).toFixed(1));
    [0, 1].forEach(i => M.vis($('#gp' + i), t, i ? wt('C5', 'say') - 0.1 : wt('C5', 'gaseous') - 0.2, 1e9, { dx: -16, dy: 0 }));
    avD(t, wt('C2', 'neutrons') + 0.2, tPn[1] - 0.2);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'all') - 0.1, tStrike: wt('X3', 'break') - 0.1, tRight: wt('X3', 'Chlorine') - 0.1 });
    fade(gSame, t, wt('X2', 'same') - 0.1); M.draw(xSame, t, wt('X3', 'break') - 0.1, 0.4); fade(gIso, t, wt('X3', 'Chlorine') - 0.05);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statement') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'still'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
