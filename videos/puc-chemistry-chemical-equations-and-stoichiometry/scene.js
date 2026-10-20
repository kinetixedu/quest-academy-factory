// PUC Chemistry Ep 12: Chemical equations and stoichiometry (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (same in bench, equation, counter, recipe table and recap): C teal (element in play), H ink, O violet, coefficients gold, electrons orange
const CC = C.ac, HC = C.ink, OC = '#7A4FE0', EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
// LaTeX helpers with colour-coding
const col = (c, s) => `\\textcolor{${c}}{\\mathrm{${s}}}`;
const Ck = col(CC, 'C'), Hk = col(HC, 'H'), Ok = col(OC, 'O'), G_ = s => `\\textcolor{${GC}}{${s}}`;
const CH4 = `${Ck}${Hk}_4`, O2 = `${Ok}_2`, CO2 = `${Ck}${Ok}_2`, H2O = `${Hk}_2${Ok}`;
const EQ = `${CH4} + ${G_(2)}${O2} \\rightarrow ${CO2} + ${G_(2)}${H2O}`;
const st = s => `\\text{\\small(${s})}`;

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  rocket: ['M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z', 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z', 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0', 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tR1 = T0('R1'), tB2 = T0('B2'), tB3 = T0('B3'), tM1 = T0('M1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three flames ---------- */
const JOBS = [['flame', 'Candle', 'GOES OUT UNDER A GLASS', 'candle', 'RUNS OUT'], ['rocket', 'Rocket', 'CARRIES ITS OXYGEN', 'rocket', 'ON BOARD'], ['wind', 'Stove flame', 'USES UP THE AIR', 'stove', 'FROM AIR']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'candle'), wt('H1', 'rocket'), wt('H1', 'space') + 0.25];
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${el}</span><div class="el">O₂</div></div></div>`).join('');
const KIT = [['flame', 'Natural gas'], ['flame', `Mostly methane ${K(CH4)}`]];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'natural'), wt('H3', 'methane')];

/* ---------- P: anatomy + states + the word ---------- */
const AN = [['r', `${CH4}${st('g')}`], ['o', '+'], ['r', `${O2}${st('g')}`], ['a', '\\rightarrow'], ['p', `${CO2}${st('g')}`], ['o', '+'], ['p', `${H2O}${st('g')}`]];
$('#an').innerHTML = AN.map(([k, s], i) => `<span id="an${i}">${K(s)}</span>`).join('');
const tAn = [wt('P2', 'Reactants'), wt('P2', 'Reactants') + 0.15, wt('P2', 'Reactants') + 0.3, wt('P3', 'arrow'), wt('P3', 'Products'), wt('P3', 'Products') + 0.15, wt('P3', 'Products') + 0.3];
{ const card = $('#pq'), d = document.createElement('div'); d.id = 'pqIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const QR = [['(g)', 'Gas', 'g'], ['(l)', 'Liquid', 'l'], ['(s)', 'Solid', 's'], ['(aq)', 'Dissolved in water', 'a']];
$('#qrs').innerHTML = QR.map(([s, n], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 84}px"><div class="nn">${s}</div><div class="qt">${n}</div></div>`).join('');
const tQr = [wt('P4', 'g'), wt('P4', 'l'), wt('P4', 's', 1), wt('P4', 'a')];

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r }; };
atom('C', 40, CC, 'C', 32); for (let i = 1; i <= 4; i++) { atom('H' + i, 26, HC, 'H', 24); atom('O' + i, 34, OC, 'O', 28); }
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const BND = { h1: bond('C', 'H1', 1), h2: bond('C', 'H2', 1), h3: bond('C', 'H3', 1), h4: bond('C', 'H4', 1), oa: bond('O1', 'O2', 2), ob: bond('O3', 'O4', 2),
  c1: bond('C', 'O1', 2), c2: bond('C', 'O2', 2), w1: bond('O3', 'H1', 1), w2: bond('O3', 'H2', 1), w3: bond('O4', 'H3', 1), w4: bond('O4', 'H4', 1) };
const drawBond = (bd, P, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
const tMeth = wt('S1', 'carbon'), tHy = wt('S1', 'hydrogen'), tOx = wt('S2', 'Oxygen'), tOpair = wt('S2', 'sharing'), tAs = T0('S3');
const tBrk = wt('S4', 'old'), tMov = wt('S4', 'move'), tForm = wt('S4', 'new'), tCO2 = wt('S5', 'Carbon'), tWat = wt('S5', 'Hydrogen');
const tD3 = wt('D3', 'put'), tD5 = wt('D5', 'Put'), tD6 = T0('D6');
const KP = {
  C: [[0, 210, 258], [tBrk, 222, 250], [tMov, 380, 150]],
  H1: [[0, 210, 160], [tBrk, 210, 140], [tMov + 0.2, 175, 382]], H2: [[0, 308, 258], [tBrk, 330, 258], [tMov + 0.3, 325, 382]],
  H3: [[0, 210, 356], [tBrk, 210, 376], [tMov + 0.4, 470, 410], [tD3, 525, 382]], H4: [[0, 112, 258], [tBrk, 92, 258], [tMov + 0.5, 706, 250], [tD3 + 0.15, 675, 382]],
  O1: [[0, 860, 170], [tOx, 520, 170], [tBrk, 510, 160], [tMov, 260, 150]], O2: [[0, 946, 170], [tOx, 606, 170], [tBrk, 620, 160], [tMov + 0.1, 500, 150]],
  O3: [[0, 880, 350], [tOx + 0.15, 540, 350], [tBrk, 530, 360], [tMov + 0.2, 250, 330]], O4: [[0, 966, 350], [tOx + 0.15, 626, 350], [tBrk, 640, 360], [tMov + 0.3, 640, 330], [tD3, 600, 330]],
};
const PF = {}; for (const k in KP) { const ks = KP[k]; PF[k] = [M.keys(ks.map(([t, x]) => [t, x]), 0.9), M.keys(ks.map(([t, , y]) => [t, y]), 0.9)]; }
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two O₂ for every CH₄. That is the recipe!' });
const PIECES = [['k', CH4], ['k', '+'], ['c', '2'], ['k', O2], ['k', '\\rightarrow'], ['k', CO2], ['k', '+'], ['c', '2'], ['k', H2O]];
$('#eq').innerHTML = PIECES.map(([kind, s], i) => kind === 'c' ? `<span class="cf" id="cf${i}">${s}</span>` : `<span id="pc${i}">${K(s)}</span>`).join('');
const STX = ['Carbon is 1 | 1, already equal', `Put <b class="g">2</b> in front of ${K(H2O)}: hydrogen 4 | 4`, `Oxygen on the right: 2 + 2 = 4`, `Put <b class="g">2</b> in front of ${K(O2)}: oxygen 4 | 4`, 'Count again: balanced'];
const tStx = [T0('D2'), tD3, T0('D4'), tD5, tD6];
$('#crs').innerHTML = [['C', 'carbon', CC], ['H', 'hydrogen', HC], ['O', 'oxygen', OC]].map(([e, n, c], i) => `<div class="cr" id="cr${i}" style="top:${76 + i * 76}px"><div class="ce" style="color:${c}">${e}</div><div class="cn">${n}</div><div class="cv" id="cv${i}"></div><div class="cm" id="cm${i}"></div></div>`).join('');

/* ---------- R: recipe table ---------- */
const RX = [430, 730, 1030, 1330], ROP = [[580, '+'], [880, '\\rightarrow'], [1180, '+']];
const RSP = [`${CH4}`, `${G_(2)}${O2}`, CO2, `${G_(2)}${H2O}`];
const RMM = ['16 g/mol', '32 g/mol', '44 g/mol', '18 g/mol'];
const RROW = [['MOLES', ['1 mol', '2 mol', '1 mol', '2 mol']], ['GRAMS', ['16 g', '64 g', '44 g', '36 g']], ['LITRES · GAS AT STP', ['22.7 L', '45.4 L', '22.7 L', '45.4 L']]];
$('#rcb').innerHTML = RSP.map((s, i) => `<div class="rh" id="rh${i}" style="left:${RX[i]}px">${K(s)}</div><div class="lbl" id="rm${i}" style="left:${RX[i]}px;top:170px;transform:translateX(-50%)">${RMM[i]}</div>`).join('') +
  ROP.map(([x, s], i) => `<div class="rop" id="ro${i}" style="left:${x}px">${K(s)}</div>`).join('') +
  RROW.map(([l, v], r) => `<div class="rr" id="rr${r}" style="top:${220 + r * 96}px"><div class="rl">${l}</div></div>` + v.map((x, c) => `<div class="rv" id="rv${r}_${c}" style="left:${RX[c]}px;top:${240 + r * 96}px;color:${[CC, OC, CC, OC][c] === CC && c === 0 ? CC : c === 1 || c === 3 ? OC : C.ink}">${x}</div>`).join('')).join('');
const tRh = [T0('R1') + 0.3, T0('R1') + 0.5, T0('R1') + 0.7, T0('R1') + 0.9];
const tRv = [[wt('R2', 'One'), wt('R2', 'two'), wt('R2', 'one', 1), wt('R2', 'two', 1)], [wt('R4', 'sixteen'), wt('R4', 'sixty'), wt('R4', 'forty'), wt('R4', 'thirty')], [wt('R6', 'twenty'), wt('R6', 'Same'), wt('R6', 'Same') + 0.3, wt('R6', 'Same') + 0.6]];
const tRm = [wt('R3', 'sixteen'), wt('R3', 'thirty'), wt('R3', 'forty'), wt('R3', 'eighteen')];

/* ---------- B: moles vs grams ---------- */
const ch4G = (p, x, y, s = 1) => { const g = mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s})` }); [[0, -62], [62, 0], [0, 62], [-62, 0]].forEach(([dx, dy]) => mk(g, 'line', { x1: 0, y1: 0, x2: dx, y2: dy, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })); mk(g, 'circle', { r: 30, fill: CC }); txt(g, 0, 9, 'C', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: '#fff', 'text-anchor': 'middle' });
  [[0, -62], [62, 0], [0, 62], [-62, 0]].forEach(([dx, dy]) => { mk(g, 'circle', { cx: dx, cy: dy, r: 18, fill: HC }); txt(g, dx, dy + 6, 'H', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 16, fill: '#fff', 'text-anchor': 'middle' }); }); return g; };
const o2G = (p, x, y, s = 1) => { const g = mk(p, 'g', { transform: `translate(${x} ${y}) scale(${s})` }); [-8, 8].forEach(k => mk(g, 'line', { x1: -26, y1: k, x2: 26, y2: k, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })); [-40, 40].forEach(cx => { mk(g, 'circle', { cx, r: 28, fill: OC }); txt(g, cx, 8, 'O', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: '#fff', 'text-anchor': 'middle' }); }); return g; };
const bmS = $('#bmS'), bmG = [ch4G(bmS, 170, 240), o2G(bmS, 480, 170), o2G(bmS, 480, 310)];
const bgS = $('#bgS'), BU = 10;
const gBar = [[CC, 16, 'CH₄ · 16 g', 150], [OC, 64, 'O₂ · 64 g', 270]].map(([c, v, l, y]) => { const r = mk(bgS, 'rect', { x: 36, y, height: 80, rx: 12, fill: c }); const tx = txt(bgS, 0, y + 50, l, { 'font-size': 24, fill: c, 'font-weight': 600 }); return { r, tx, v, y }; });
const blk4 = [1, 2, 3].map(k => mk(bgS, 'line', { x1: 36 + 160 * k, x2: 36 + 160 * k, y1: 270, y2: 350, stroke: '#fff', 'stroke-width': 4 }));
const th1 = PUC.think($('#th1'), { q: `1 mol ${K(CH4)} needs 2 mol ${K(O2)}. Does 1 g ${K(CH4)} need 2 g ${K(O2)}?`, opts: ['Yes', 'No'], right: 1, why: `No: it needs 4 g. One ${K(O2)} (32 u) is twice as heavy as one ${K(CH4)} (16 u).` });

/* ---------- M: molarity ---------- */
const MC = ['Mass percent', 'Mole fraction', 'Molarity', 'Molality'];
$('#mcs').innerHTML = MC.map((m, i) => `<div class="mc" id="mc${i}">${m}</div>`).join('');
const tMc = [wt('M2', 'Mass'), wt('M2', 'mole'), wt('M2', 'molarity'), wt('M2', 'molality')];
$('#mF').innerHTML = K(`\\text{Molarity} = \\dfrac{\\text{moles of solute}}{\\text{litres of solution}}`);
const msol = PUC.solution($('#ml'), [[K(`n = 4\\,\\text{g} \\div 40\\,\\text{g mol}^{-1} = 0.1\\,\\text{mol}`)], [K(`V = 250\\,\\text{mL} = 0.25\\,\\text{L}`)], [K(`M = 0.1 \\div 0.25 = \\textcolor{${CC}}{0.4\\,\\text{mol L}^{-1}}`)]], { label: '', y0: 354, dy: 68 });
const tMs = [T0('M5'), wt('M6', 'zero'), wt('M6', 'gives')];
const ms = $('#mS'), BX0 = 90, BX1 = 400, BY0 = 110, BY1 = 470, LIQ = 210;
const liq = mk(ms, 'rect', { x: BX0 + 4, width: BX1 - BX0 - 8, fill: C.ac2 });
mk(ms, 'path', { d: `M${BX0 - 14} ${BY0} H${BX0} V${BY1 - 16} Q${BX0} ${BY1} ${BX0 + 16} ${BY1} H${BX1 - 16} Q${BX1} ${BY1} ${BX1} ${BY1 - 16} V${BY0}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const mark = mk(ms, 'line', { x1: BX1 - 70, x2: BX1, y1: LIQ, y2: LIQ, stroke: C.ink, 'stroke-width': 3 }); const markT = txt(ms, BX1 - 76, LIQ + 6, '250 mL', { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const SD = [[150, 300], [210, 380], [270, 260], [330, 340], [180, 430], [300, 420], [240, 320], [350, 270], [130, 380], [260, 440]];
const sdots = SD.map(() => mk(ms, 'circle', { r: 9, fill: CC }));
const sTag = txt(ms, 245, 90, '4 g NaOH', { 'text-anchor': 'middle', 'font-size': 22, fill: CC, 'font-weight': 600 });
const RO = [['SOLUTE', '4 g NaOH'], ['MOLES', '0.1 mol'], ['VOLUME', '0.25 L'], ['MOLARITY', '0.4 M']];
$('#ros').innerHTML = RO.map(([k, v], i) => `<div class="ro2" id="ro2${i}" style="top:${110 + i * 92}px"><div class="k">${k}</div><div class="v"${i === 3 ? ` style="color:${CC}"` : ''}>${v}</div></div>`).join('');
const tRo = [wt('M4', 'four'), wt('M5', 'zero'), wt('M6', 'zero'), wt('M6', 'gives') + 0.4];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${CH4}:\\; 4 \\div 16 = 0.25\\,\\text{mol}`)],
  [K(`${O2}:\\; ${G_(2)} \\times 0.25 = 0.5\\,\\text{mol} = 16\\,\\text{g}`)],
  [K(`${H2O}:\\; ${G_(2)} \\times 0.25 = 0.5\\,\\text{mol} = 9\\,\\text{g}`)],
  [K(`4\\,\\text{g}\\; ${CH4} \\rightarrow 16\\,\\text{g}\\; ${O2}\\;\\; (4\\times)`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 84 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Four'), wt('W4', 'Twice'), wt('W5', 'Zero'), T0('W6')];
const s2 = $('#wS2'), BASE = 400, SCL = 14, WX = [150, 300, 484, 634];
const WB = [[CH4, CC, 4, '4 g', 'CH₄'], [O2, OC, 16, '16 g', 'O₂'], [CO2, CC, 11, '11 g', 'CO₂'], [H2O, OC, 9, '9 g', 'H₂O']];
mk(s2, 'line', { x1: 70, y1: BASE, x2: 714, y2: BASE, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
mk(s2, 'line', { x1: 392, y1: 120, x2: 392, y2: BASE + 50, stroke: C.line, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const sideT = [txt(s2, 225, 110, 'IN', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 }), txt(s2, 559, 110, 'OUT', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 })];
const wbars = WB.map(([, c, v, lv, nm], i) => ({ r: mk(s2, 'rect', { x: WX[i] - 50, width: 100, rx: 10, fill: c, opacity: i === 2 ? 0.55 : 1 }), val: txt(s2, WX[i], 0, lv, { 'text-anchor': 'middle', 'font-size': 26, fill: c, 'font-weight': 600 }), nm: txt(s2, WX[i], BASE + 36, nm, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, fill: c, 'font-weight': 700 }), v }));
const tWb = [wt('W3', 'Four'), wt('W4', 'sixteen'), T0('W6') + 0.2, wt('W5', 'nine')];
const sumT = txt(s2, 392, BASE + 76, '4 + 16 = 20 g   |   11 + 9 = 20 g', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Calculate from ${K(`${CH4} + ${O2} \\rightarrow ${CO2} + ${H2O}`)} as written`, right: `Balance first, then use the big numbers: ${K(`1\\;${CH4} : ${G_(2)}\\;${O2}`)}` });
const tsv = $('#tS');
const tr1 = mk(tsv, 'g', {}); ch4G(tr1, 70, 88, 0.55); o2G(tr1, 190, 88, 0.55); txt(tr1, 270, 95, '1 : 1 · HALF THE O₂', { 'font-size': 17, fill: C.red, 'font-weight': 600 });
const tr2 = mk(tsv, 'g', {}); ch4G(tr2, 70, 196, 0.55); o2G(tr2, 190, 172, 0.5); o2G(tr2, 190, 218, 0.5); txt(tr2, 270, 203, '1 : 2 · BALANCED', { 'font-size': 17, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Mass to mass numericals from a balanced equation, and molarity calculations' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `Propane, ${K(`${Ck}_3${Hk}_8`)}, burns in ${K(O2)} to give ${K(CO2)} and ${K(H2O)}. What mass of ${K(O2)} is needed to burn 11 g of propane?<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: C = 12 u, H = 1 u, O = 16 u</span>`, qW: 800,
  opts: ['11 g', '20 g', '40 g', '55 g'], right: 2, optW: 474, optY: 360, optH: 100, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`${Ck}_3${Hk}_8 + ${G_(5)}${O2} \\rightarrow ${G_(3)}${CO2} + ${G_(4)}${H2O}`)], [K(`11 \\div 44 = 0.25\\,\\text{mol}`)], [K(`${O2}:\\; ${G_(5)} \\times 0.25 = 1.25\\,\\text{mol}`)], [K(`1.25 \\times 32 = \\textcolor{${C.ok}}{40\\,\\text{g}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'eleven'), wt('A4', 'Five'), wt('A4', 'which')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · chemical equations and stoichiometry', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>Equation</b>: reactants → products; (g) (l) (s) (aq) give the state', '<b>Balance first</b>: the same number of each atom on both sides', '<b>Recipe</b>: 1 : 2 mol = 16 g : 64 g = 22.7 L : 45.4 L at STP', '<b>Molarity</b> = moles of solute ÷ litres of solution'] });
const YQ = ['In the burning of methane, what is the mole ratio of CH₄ to O₂?', 'Why does 1 g of methane not need 2 g of oxygen?', 'What is the molarity of 2 g of NaOH in 500 mL of solution?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 13', topic: 'What if the oxygen runs out first? Limiting Reagent', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tBrk - 0.2, 1.1, 960, 560], [tCO2 + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  let mx = 36; MC.forEach((_, i) => { const e = $('#mc' + i); e.style.left = mx + 'px'; mx += e.offsetWidth + 12; });
  geo.cf = PIECES.map(([k], i) => k === 'c' ? $('#cf' + i).offsetWidth : 0);
  // equation anatomy brackets under reactants and products
  { const a0 = $('#an'); if (a0.offsetWidth > 712) a0.style.fontSize = Math.floor(50 * 712 / a0.offsetWidth) + 'px'; }
  const an = $('#an'), base = an.offsetLeft, gx = i => base + $('#an' + i).offsetLeft, gw = i => $('#an' + i).offsetWidth, by = 130 + an.offsetHeight + 18;
  const rL = gx(0), rR = gx(2) + gw(2), pL = gx(4), pR = gx(6) + gw(6);
  Object.assign($('#brR').style, { left: rL + 'px', width: (rR - rL) + 'px', top: by + 'px' }); Object.assign($('#brRl').style, { left: rL + 'px', top: (by + 14) + 'px' });
  Object.assign($('#brP').style, { left: pL + 'px', width: (pR - pL) + 'px', top: by + 'px' }); Object.assign($('#brPl').style, { left: pL + 'px', top: (by + 14) + 'px' });
  Object.assign($('#anA').style, { left: (gx(3) + gw(3) / 2 - $('#anA').offsetWidth / 2) + 'px', top: '96px' });
  geo.anW = pR - base;
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const mq = document.querySelector('#so .sol .sx'); if (mq && mq.offsetWidth > 420) mq.style.fontSize = Math.floor(27 * 420 / mq.offsetWidth) + 'px';
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const shrink = (card, inner, t, ts) => { const sh = M.spring(t - ts, M.HEAVY), wv = M.lerp(1600, 784, sh); snap(card, 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap(inner, 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three flames, Aarav's kitchen */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'oxygen') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'much') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'gram') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'recipe') - 0.15, 1e9, POP);
  }

  /* P: anatomy, states, the word */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dy: 36, ...o }); shrink($('#pq'), $('#pqIn'), t, tP4 - 0.3);
    AN.forEach((_, i) => PUC.write($('#an' + i), t, tAn[i] - 0.1, 0.4));
    M.vis($('#brR'), t, wt('P2', 'Reactants') + 0.3, 1e9, { dy: 0 }); M.vis($('#brRl'), t, wt('P2', 'starting'), 1e9, { dy: 8 });
    M.vis($('#brP'), t, wt('P3', 'Products') + 0.4, 1e9, { dy: 0 }); M.vis($('#brPl'), t, wt('P3', 'right'), 1e9, { dy: 8 });
    M.vis($('#anA'), t, wt('P3', 'gives') - 0.1, 1e9, POP);
    M.vis($('#pNote'), t, wt('P4', 'brackets') - 0.1, 1e9, POP);
    M.vis($('#pw'), t, tP4 - 0.2, out, { dx: 60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.15, 1e9, { dy: 14 }); const on = M.io((t - tQr[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tQr[i + 1]) / 0.25) : 1 - M.io((t - T0('P5')) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#ety'), t, wt('P5', 'stoichiometry') - 0.1, 1e9, { dy: 16 });
  }

  /* S + D: the bench, the counter, balancing */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('R1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o }); shrink($('#bn'), $('#bnIn'), t, tAs - 0.4);
    M.vis($('#rx'), t, tAs - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tAs + 0.3, z, { dy: 36, ...o });
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const hIn = M.io((t - tHy + 0.2) / 0.3), oIn = M.io((t - tOx + 0.4) / 0.3);
    for (const k in A) {
      attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`);
      let op = k === 'C' ? M.clamp((t - tS1 - 0.2) / 0.3) : k[0] === 'H' ? hIn : oIn;
      if (k === 'O4' || k === 'H3' || k === 'H4') op *= 1 - 0.6 * M.io((t - tForm - 0.4) / 0.4) * (1 - M.io((t - tD3 + 0.2) / 0.4));
      A[k].g.style.opacity = op.toFixed(3); M.hide(A[k].g, op <= 0.002);
    }
    const brk = M.io((t - tBrk) / 0.35);
    ['h1', 'h2', 'h3', 'h4'].forEach((k, i) => { const u = M.io((t - tHy - i * 0.12) / 0.35) * (1 - brk); drawBond(BND[k], P, u, M.io((t - tHy - 0.4) / 0.4) * (1 - brk)); });
    ['oa', 'ob'].forEach((k, i) => drawBond(BND[k], P, oIn * (1 - brk), M.io((t - tOpair + 0.1) / 0.4) * (1 - brk)));
    ['c1', 'c2'].forEach((k, i) => { const u = M.io((t - tForm - i * 0.18) / 0.4); drawBond(BND[k], P, u, u); });
    ['w1', 'w2'].forEach((k, i) => { const u = M.io((t - tForm - 0.4 - i * 0.18) / 0.4); drawBond(BND[k], P, u, u); });
    ['w3', 'w4'].forEach((k, i) => { const u = M.io((t - tD3 - 0.8 - i * 0.18) / 0.4); drawBond(BND[k], P, u, u); });
    const TAG = [[tMeth, 'CH₄ · METHANE'], [tOx, 'O₂ · OXYGEN GAS'], [tOpair, 'O=O · 2 SHARED PAIRS'], [tAs, 'CH₄ + O₂'], [tBrk, 'OLD BONDS BREAK'], [tMov, 'ATOMS MOVE'], [tForm, 'NEW BONDS FORM'], [tCO2, 'CO₂ + H₂O'], [tD3 + 0.6, '2 H₂O'], [tD6 + 0.2, 'SAME ATOMS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tMeth - 0.1, 1e9, POP);
    const stOff = tD6 + 0.1;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['C', tMeth, CC], ['H', tHy, HC], ['O', tOx, OC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avA(t, tD6 + 0.4, z);
    M.setT($('#rxL'), t < tD1 ? 'REACTION · AS WRITTEN' : t < tD6 + 1.2 ? 'REACTION · BALANCING' : 'REACTION · BALANCED');
    PIECES.forEach(([k], i) => {
      if (k === 'c') { const tc = i === 7 ? tD3 + 0.2 : tD5 + 0.2, u = M.io((t - tc) / 0.45); const el = $('#cf' + i); snap(el, 'width', (geo.cf[i] * u).toFixed(1) + 'px'); el.style.opacity = u.toFixed(3); }
      else PUC.write($('#pc' + i), t, tAs + i * 0.12, 0.4);
    });
    const si = tStx.reduce((a, tt, i) => t >= tt ? i : a, -1);
    if (si >= 0) { M.setT($('#eqN'), String(si + 1)); const tx = $('#eqT'); if (tx._s !== si) { tx._s = si; tx.innerHTML = STX[si]; } }
    M.vis($('#eqS'), t, tStx[0] - 0.1, 1e9, { dy: 12 });
    const pulse = si >= 0 ? M.io((t - tStx[si]) / 0.2) * (1 - M.io((t - tStx[si] - 0.6) / 0.4)) : 0;
    $('#eqN').style.background = mix(C.ac, GC, pulse);
    const hOk = t >= tD3 + 0.5, oOk = t >= tD5 + 0.5;
    const CV = [['1 | 1', true, tStx[0]], [hOk ? '4 | 4' : '4 | 2', hOk, tD3 + 0.5], [oOk ? '4 | 4' : hOk ? '2 | 4' : '2 | 3', oOk, oOk ? tD5 + 0.5 : tD3 + 0.5]];
    CV.forEach(([v, ok, ch], i) => {
      M.setT($('#cv' + i), v); const m = $('#cm' + i); PUC.setIco(m, ok ? 'check' : 'x', '#fff', 24, 3); setBg(m, ok ? C.ok : C.red);
      const fl = M.io((t - ch) / 0.2) * (1 - M.io((t - ch - 0.5) / 0.5));
      setBg($('#cr' + i), mix(C.soft, ok ? C.okBg : C.redBg, M.io((t - wt('B1', 'counter') + 0.1) / 0.3) * (0.55 + 0.45 * fl)));
      M.vis($('#cr' + i), t, tAs + 0.5 + i * 0.15, 1e9, { dx: -16, dy: 0 });
    });
  }

  /* R: read it as a recipe */
  const rOn = t >= tR1 - 0.1 && t < tB2 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rc'), t, tR1 + 0.05, OUT('B2'), { dy: 36, ...o });
    RSP.forEach((_, i) => { PUC.write($('#rh' + i), t, tRh[i], 0.4); M.vis($('#rm' + i), t, tRm[i] - 0.1, 1e9, POP); });
    ROP.forEach((_, i) => PUC.write($('#ro' + i), t, tRh[i] + 0.1, 0.3));
    RROW.forEach((_, r) => { M.vis($('#rr' + r), t, tRv[r][0] - 0.4, 1e9, { dy: 14 }); RX.forEach((_, c) => M.vis($(`#rv${r}_${c}`), t, tRv[r][c] - 0.1, 1e9, POP));
      const on = M.io((t - tRv[r][0] + 0.4) / 0.3) * (r < 2 ? 1 - M.io((t - (r === 0 ? T0('R3') : T0('R5'))) / 0.3) : 1); setBg($('#rr' + r), mix(C.soft, C.ac2, on)); });
    M.vis($('#rChk'), t, T0('R5') + 0.2, 1e9, POP);
  }

  /* B: moles vs grams, then think */
  const bOn = t >= tB2 - 0.1 && t < tM1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const z = OUT('B3');
    M.vis($('#bm'), t, tB2 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#bg'), t, wt('B2', 'grams') - 0.2, z, { dx: 60, dy: 0, ...o });
    bmG.forEach((g, i) => fade(g, t, tB2 + 0.3 + i * 0.2));
    M.vis($('#bmV'), t, wt('B2', 'one') - 0.1, 1e9, POP);
    gBar.forEach((B, i) => { const u = M.io((t - wt('B2', 'grams') - i * 0.3) / 0.6), w = B.v * BU * u; attr(B.r, 'width', w.toFixed(1)); B.r.style.opacity = M.clamp(u * 4).toFixed(3); attr(B.tx, 'x', (36 + w + 16).toFixed(1)); B.tx.style.opacity = u.toFixed(3); });
    blk4.forEach((l, k) => { l.style.opacity = M.io((t - wt('B2', 'sixty') - 0.4 - k * 0.1) / 0.3).toFixed(3); });
    M.vis($('#bgV'), t, wt('B2', 'sixteen') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tB3 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tB3, tOpts: wt('B3', 'So') - 0.1, tCount: T1('B3') + 0.05, dur: 3, tAns: T0('B4') - 0.02, tWhy: wt('B4', 'Four') });
  }

  /* M: solutions and molarity */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('T1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    MC.forEach((_, i) => { const el = $('#mc' + i); M.vis(el, t, tMc[i] - 0.1, 1e9, POP); const on = i === 2 ? M.io((t - T0('M3')) / 0.3) : 0; setBg(el, mix(C.soft, C.ac, on)); el.style.color = mix(C.ink, '#FFFFFF', on); });
    PUC.write($('#mF'), t, wt('M3', 'molarity') - 0.1, 0.8);
    msol(t, T0('M5'), tMs);
    M.vis($('#mr'), t, T0('M4') - 0.3, out, { dx: 60, dy: 0, ...o });
    const lv = M.io((t - wt('M4', 'two') + 0.1) / 1.2), ly = BY1 - 4 - (BY1 - 4 - LIQ) * lv;
    attr(liq, 'y', ly.toFixed(1)); attr(liq, 'height', (BY1 - 4 - ly).toFixed(1)); liq.style.opacity = M.clamp(lv * 5).toFixed(3);
    mark.style.opacity = markT.style.opacity = M.clamp((t - T0('M4')) / 0.3).toFixed(3);
    SD.forEach(([x, y], i) => { const u = M.io((t - wt('M4', 'four') - i * 0.07) / 0.6); attr(sdots[i], 'cx', x); attr(sdots[i], 'cy', M.lerp(70, y, u).toFixed(1)); sdots[i].style.opacity = M.clamp(u * 3).toFixed(3); });
    sTag.style.opacity = M.clamp((t - wt('M4', 'four') + 0.1) / 0.3).toFixed(3);
    RO.forEach((_, i) => M.vis($('#ro2' + i), t, tRo[i] - 0.1, 1e9, { dx: 16, dy: 0 }));
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'balanced') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'written') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'moles') + 0.2, 0.8);
  }

  /* W: worked example + grams in / out */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    sideT.forEach(s => { s.style.opacity = M.clamp((t - T0('W2') - 0.5) / 0.3).toFixed(3); });
    wbars.forEach((B, i) => { const u = M.io((t - tWb[i] + 0.1) / 0.6), h = B.v * SCL * u; attr(B.r, 'y', (BASE - h).toFixed(1)); attr(B.r, 'height', h.toFixed(1)); M.hide(B.r, u <= 0.002);
      attr(B.val, 'y', (BASE - h - 14).toFixed(1)); B.val.style.opacity = u.toFixed(3); B.nm.style.opacity = M.clamp((t - tWb[i] + 0.2) / 0.3).toFixed(3); });
    sumT.style.opacity = M.clamp((t - T0('W6') - 0.6) / 0.3).toFixed(3);
    M.vis($('#wGp'), t, wt('W6', 'uses') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'unbalanced') - 0.3, tStrike: wt('X3', 'halves') - 0.1, tRight: wt('X3', 'Balance') - 0.1 });
    fade(tr1, t, wt('X2', 'one') - 0.1); fade(tr2, t, wt('X3', 'Balance'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
