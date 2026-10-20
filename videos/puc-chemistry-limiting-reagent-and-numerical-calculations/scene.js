// PUC Chemistry Ep 13: Limiting reagent and numerical calculations (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, equations, counter, bars, recap): N teal (element in play), H ink, O violet, C blue (practice only), coefficients gold, electrons orange; limiting = red chip, excess = ink chip
const NC = C.ac, HC = C.ink, OC = '#7A4FE0', CB = '#2F6FEB', EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const col = (c, s) => `\\textcolor{${c}}{\\mathrm{${s}}}`;
const Nk = col(NC, 'N'), Hk = col(HC, 'H'), Ok = col(OC, 'O'), Ck = col(CB, 'C'), G_ = s => `\\textcolor{${GC}}{${s}}`;
const N2 = `${Nk}_2`, H2 = `${Hk}_2`, NH3 = `${Nk}${Hk}_3`, O2 = `${Ok}_2`, H2O = `${Hk}_2${Ok}`, CH4 = `${Ck}${Hk}_4`, CO2 = `${Ck}${Ok}_2`;
const EQ = `${N2} + ${G_(3)}${H2} \\rightarrow ${G_(2)}${NH3}`;

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M14 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  sandwich: ['M3 11h18', 'M4 11 12 4l8 7', 'M4 15h16', 'M5 19h14'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tC1 = T0('C1'), tC4 = T0('C4'), tT = T0('T1'), tW1 = T0('W1'), tP5 = T0('P5');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three shortages ---------- */
const JOBS = [['flame', 'Fire', 'WOOD LEFT, AIR GONE', 'fire', 'AIR'], ['sandwich', 'Sandwich stall', 'BREAD LEFT, NO CHEESE', 'sandwich', 'CHEESE'], ['bike', 'Bicycle shop', 'FRAMES LEFT', 'bicycle', 'WHEELS']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , l], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="lim" id="lm${i}">LIMIT · ${l}</div></div>`).join('');
const KIT = [['bike', '7 frames'], ['bike', '10 wheels'], ['check', '5 bicycles']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'seven'), wt('H3', 'ten'), wt('H4', 'five')];

/* ---------- P: definitions + bicycle model ---------- */
const DR = [['Limiting reagent', 'Used up first, then the reaction stops', 'RUNS OUT', 'var(--red)'], ['Excess reagent', 'Left over at the end', 'LEFT OVER', 'var(--ink)']];
$('#drs').innerHTML = DR.map(([n, d, k, c], i) => `<div class="dr" id="dr${i}" style="top:${80 + i * 170}px"><div class="dn">${n}</div><div class="dd">${d}</div><div class="dk" id="dk${i}" style="background:${c}">${k}</div></div>`).join('');
const ks = $('#kS');
const frameG = (p) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M-30 14 L-6 -18 L22 -18 L30 14 Z M-6 -18 L0 14', fill: 'none', stroke: NC, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); return g; };
const wheelG = (p) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r: 22, fill: 'none', stroke: HC, 'stroke-width': 5 }); mk(g, 'circle', { r: 4, fill: HC }); return g; };
const BKX = k => 108 + k * 142;
const frames = Array.from({ length: 7 }, (_, i) => ({ g: frameG(ks), p: M.keys([[0, 84 + i * 92, 140], [0.1, 84 + i * 92, 140]]) }));
const wheels = Array.from({ length: 10 }, (_, j) => ({ g: wheelG(ks), j }));
const kLab = [txt(ks, 36, 92, 'FRAMES · 7', { 'font-size': 18, fill: NC, 'font-weight': 600 }), txt(ks, 36, 212, 'WHEELS · 10', { 'font-size': 18, fill: HC, 'font-weight': 600 })];
const kOut = [txt(ks, 36, 470, '5 BICYCLES · ALL 10 WHEELS USED: WHEELS LIMIT', { 'font-size': 18, fill: C.red, 'font-weight': 600 }), txt(ks, 36, 506, '2 FRAMES LEFT OVER: EXCESS', { 'font-size': 18, fill: C.ink, 'font-weight': 600 })];
const tAsm = wt('P2', 'used') - 0.2;

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r }; };
['Na', 'Nb', 'Nc', 'Nd'].forEach(k => atom(k, 38, NC, 'N', 30)); for (let i = 1; i <= 6; i++) atom('H' + i, 25, HC, 'H', 22);
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const BND = { NNa: bond('Na', 'Nb', 3), NNb: bond('Nc', 'Nd', 3), HHa: bond('H1', 'H2', 1), HHb: bond('H3', 'H4', 1), HHc: bond('H5', 'H6', 1),
  a1: bond('Na', 'H1', 1), a2: bond('Na', 'H3', 1), a3: bond('Na', 'H5', 1), b1: bond('Nb', 'H2', 1), b2: bond('Nb', 'H4', 1), b3: bond('Nb', 'H6', 1) };
const drawBond = (bd, P, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 16, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 16; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
const tTwoN = wt('S2', 'two'), tLock = wt('S2', 'shared'), tHyd = wt('S2', 'hydrogen'), tNeed = T0('S3');
const tBrk = wt('S4', 'bonds'), tMov = wt('S4', 'move'), tForm = wt('S4', 'new'), tUsed = wt('S5', 'used'), tSec = wt('S6', 'second'), tLim = wt('S6', 'limiting'), tExc = wt('S6', 'excess');
const KP = {
  Na: [[0, 150, 160], [tBrk, 140, 160], [tMov, 230, 205]], Nb: [[0, 290, 160], [tBrk, 300, 160], [tMov + 0.1, 560, 205]],
  Nc: [[0, 150, 340], [tSec, 322, 395]], Nd: [[0, 290, 340], [tSec + 0.05, 462, 395]],
  H1: [[0, 860, 120], [tHyd, 530, 120], [tBrk, 518, 112], [tMov + 0.1, 140, 152]], H2: [[0, 932, 120], [tHyd, 602, 120], [tBrk, 618, 112], [tMov + 0.15, 470, 152]],
  H3: [[0, 880, 240], [tHyd + 0.15, 550, 240], [tBrk, 538, 240], [tMov + 0.2, 320, 152]], H4: [[0, 952, 240], [tHyd + 0.15, 622, 240], [tBrk, 640, 240], [tMov + 0.25, 650, 152]],
  H5: [[0, 860, 360], [tHyd + 0.3, 530, 360], [tBrk, 518, 368], [tMov + 0.3, 230, 302]], H6: [[0, 932, 360], [tHyd + 0.3, 602, 360], [tBrk, 618, 368], [tMov + 0.35, 560, 302]],
};
const PF = {}; for (const k in KP) { const ks2 = KP[k]; PF[k] = [M.keys(ks2.map(([t, x]) => [t, x]), 0.9), M.keys(ks2.map(([t, , y]) => [t, y]), 0.9)]; }
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const xtag = txt(bW, 392, 440, 'EXCESS · NO PARTNER LEFT', { 'text-anchor': 'middle', 'font-size': 17, fill: C.ink, 'font-weight': 600 });
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Hydrogen is like my wheels!' });
$('#eq').innerHTML = K(EQ);
const STX = [`1 ${K(N2)} needs 3 ${K(H2)}`, `3 ${K(H2)} used up: 2 ${K(NH3)} form`, `2 ${K(N2)} would need 6 ${K(H2)}. We have 3`];
const tStx = [tNeed, tUsed, T0('B1')];
const CHX = [380, 490, 600];
$('#chs').innerHTML = ['HAVE', 'USED', 'LEFT'].map((h, i) => `<div class="chdr" style="left:${36 + CHX[i]}px">${h}</div>`).join('');
$('#crs').innerHTML = [[N2, 'EXCESS', 'var(--ink)'], [H2, 'LIMITING', 'var(--red)']].map(([e, k, c], i) => `<div class="cr" id="cr${i}" style="top:${84 + i * 88}px"><div class="ce">${K(e)}</div><div class="ck" id="ck${i}" style="background:${c}">${k}</div>${CHX.map((x, j) => `<div class="cv" id="cv${i}_${j}" style="left:${x}px"></div>`).join('')}</div>`).join('');

/* ---------- D: the method ---------- */
const MR = [['Write the balanced equation', K(EQ)], ['Turn each mass into moles', K(`${N2}\\;2\\,\\text{mol}, \\quad ${H2}\\;3\\,\\text{mol}`)], ['Divide by the number in front · smallest is limiting', K(`${N2}\\; \\tfrac{2}{1} = 2, \\quad ${H2}\\; \\tfrac{3}{3} = \\textcolor{${C.red}}{1}`)], ['Use only the limiting reagent for the product', K(`${NH3} = \\tfrac{2}{3} \\times 3 = 2\\,\\text{mol}`)]];
$('#mrs').innerHTML = MR.map(([s, x], i) => `<div class="mr" id="mr${i}" style="top:${84 + i * 106}px"><div class="nn">${i + 1}</div><div class="mt">${s}</div><div class="mx" id="mx${i}">${x}</div></div>`).join('');
const tMr = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];

/* ---------- C: two cases ---------- */
const CASES = [['ca', 'CASE A · 28 g N₂ + 4 g H₂', `${H2}:\\; 4 \\div 2 = 2\\,\\text{mol}`, 2, `${K(H2)} is limiting`, 'var(--red)', 'C2'], ['cb', 'CASE B · 28 g N₂ + 10 g H₂', `${H2}:\\; 10 \\div 2 = 5\\,\\text{mol}`, 5, `${K(N2)} is limiting`, 'var(--ac)', 'C3']];
const cbar = CASES.map(([id, l, h, v, vd, c]) => {
  const card = $('#' + id);
  card.innerHTML = `<div class="lbl" style="left:36px;top:30px">${l}</div><div class="cs" style="top:82px">${K(`${N2}:\\; 28 \\div 28 = 1\\,\\text{mol}`)}</div><div class="cs cH" style="top:146px">${K(h)}</div><svg width="784" height="580" style="position:absolute;left:0;top:0"></svg><div class="cv2" style="background:${c}">${vd.replace('is limiting', '<span>is limiting</span>')}</div>`;
  const s = card.querySelector('svg'), U = 118;
  const needL = txt(s, 36, 238, 'H₂ NEEDED FOR 1 mol N₂ · 3 mol', { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
  const need = mk(s, 'rect', { x: 36, y: 252, width: 3 * U, height: 52, rx: 10, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  const haveL = txt(s, 36, 352, `H₂ WE HAVE · ${v} mol`, { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
  const have = mk(s, 'rect', { x: 36, y: 366, height: 52, rx: 10, fill: HC });
  const extra = mk(s, 'rect', { x: 36 + 3 * U, y: 366, height: 52, rx: 10, fill: C.dim });
  const exT = txt(s, 36 + 3 * U + 12, 400, v > 3 ? '2 mol LEFT' : 'SHORT 1 mol', { 'font-size': 18, fill: v > 3 ? C.ink : C.red, 'font-weight': 600 });
  return { card, need, needL, have, haveL, extra, exT, v, U };
});
const th1 = PUC.think($('#th1'), { q: `Case B: ${K(H2)} has the smaller mass (10 g vs 28 g). Is ${K(H2)} the limiting reagent?`, opts: ['Yes', 'No'], right: 1, why: `No. 10 g of ${K(H2)} is 5 mol, more than the 3 mol needed. ${K(N2)} runs out first. Compare moles, never grams.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: NCERT worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${N2}:\\; 50\\,000 \\div 28.0 \\approx 1.786 \\times 10^3\\,\\text{mol}`)],
  [K(`${H2}:\\; 10\\,000 \\div 2.016 \\approx 4.96 \\times 10^3\\,\\text{mol}`)],
  [K(`\\text{needed } ${H2} = 3 \\times 1.786 \\times 10^3 \\approx 5.36 \\times 10^3`)],
  [K(`${H2}\\text{ limiting}: \\; ${NH3} = \\tfrac{2}{3} \\times 4.96 \\times 10^3 \\approx 3.3 \\times 10^3\\,\\text{mol}`)],
  [K(`3.3 \\times 10^3 \\times 17\\,\\text{g} \\approx \\textcolor{${NC}}{56\\,\\text{kg}}\\; ${NH3}`)]], { label: 'NCERT WORKED EXAMPLE', y0: 220, dy: 64 });
const tWs = [T0('W3'), wt('W4', 'giving'), T0('W5'), T0('W6'), T0('W7')];
const s2 = $('#wS2'), WU = 104;
const WBR = [['NEEDED · 5.36 × 10³ mol', 5.36, 'need', 120], ['AVAILABLE · 4.96 × 10³ mol', 4.96, HC, 230], ['NH₃ FORMED · ≈ 3.3 × 10³ mol', 3.307, NC, 370]];
const wbars = WBR.map(([l, v, c, y]) => ({ l: txt(s2, 36, y - 14, l, { 'font-size': 19, fill: c === 'need' ? C.ink : c, 'font-weight': 600 }), r: c === 'need' ? mk(s2, 'rect', { x: 36, y, height: 60, rx: 10, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '10 8' }) : mk(s2, 'rect', { x: 36, y, height: 60, rx: 10, fill: c }), v }));
const shortR = mk(s2, 'rect', { x: 36 + 4.96 * WU, y: 230, width: 0.40 * WU, height: 60, rx: 6, fill: C.redBg, stroke: C.red, 'stroke-width': 2 });
const shortT = txt(s2, 36 + 5.36 * WU + 14, 266, 'SHORT', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const kgT = txt(s2, 36 + 3.307 * WU + 16, 408, '≈ 56 kg', { 'font-size': 28, fill: NC, 'font-weight': 600 });
const limP = document.createElement('div'); limP.className = 'pillp bad'; limP.style.cssText = 'left:36px;top:470px'; limP.textContent = 'Hydrogen is the limiting reagent'; $('#wr').appendChild(limP);
const tWb = [T0('W5'), wt('W4', 'giving'), wt('W6', 'Two')];

/* ---------- N: practice numerical ---------- */
const psol = PUC.solution($('#pl'), [
  [K(`${CH4} + ${G_(2)}${O2} \\rightarrow ${CO2} + ${G_(2)}${H2O}`)],
  [K(`${CH4}\\; 8 \\div 16 = 0.5, \\quad ${O2}\\; 16 \\div 32 = 0.5\\,\\text{mol}`)],
  [K(`\\div\\text{ number in front}: \\; 0.5 \\;\\text{vs}\\; \\textcolor{${C.red}}{0.25} \\rightarrow ${O2}\\text{ limiting}`)],
  [K(`${CO2} = 0.25\\,\\text{mol} = 11\\,\\text{g}`)],
  [K(`\\text{left: } 4\\,\\text{g}\\; ${CH4}; \\;\\; 11 + 9 + 4 = 24\\,\\text{g}`)]], { label: 'SOLUTION', y0: 200, dy: 66 });
const tPs = [wt('P6', 'Eight'), wt('P6', 'That'), T0('P7'), T0('P8'), T0('P9')];
const ps = $('#pS'), PU = 27;
mk(ps, 'line', { x1: 36, y1: 0, x2: 36, y2: 0 });
const seg = (y, x0, g, c, lab, dim) => { const r = mk(ps, 'rect', { x: 36 + x0 * PU, y, height: 72, width: g * PU - 4, rx: 10, fill: c, opacity: dim ? 0.45 : 1 }); const tx = txt(ps, 36 + x0 * PU + 14, y + 44, lab, { 'font-size': 20, fill: '#fff', 'font-weight': 600 }); return { r, tx, w: g * PU - 4 }; };
const inL = txt(ps, 36, 130, 'IN · 24 g', { 'font-size': 20, fill: C.ink, 'font-weight': 600 }), outL = txt(ps, 36, 300, 'OUT · 24 g', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const pIn = [seg(146, 0, 8, CB, 'CH₄ 8 g'), seg(146, 8, 16, OC, 'O₂ 16 g')];
const pOut = [seg(316, 0, 11, CB, 'CO₂ 11 g'), seg(316, 11, 9, OC, 'H₂O 9 g'), seg(316, 20, 4, CB, '4 g', true)];
const leftT = txt(ps, 36 + 20 * PU, 416, 'CH₄ LEFT', { 'font-size': 18, fill: CB, 'font-weight': 600 });
const pChk = document.createElement('div'); pChk.className = 'pillp good'; pChk.style.cssText = 'left:36px;top:470px'; pChk.textContent = '24 g in = 24 g out'; $('#pr2').appendChild(pChk);
const tPo = [wt('P8', 'eleven'), wt('P9', 'nine'), wt('P9', 'four')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Fewer moles means limiting: ${K(`1\\,\\text{mol}\\;${N2} < 2\\,\\text{mol}\\;${H2}`)}, so ${K(N2)}`, right: `Divide by the number in front: ${K(`${N2}\\;\\tfrac{1}{1} = 1, \\; ${H2}\\;\\tfrac{2}{3} = 0.67`)}, so ${K(H2)}` });
const tsv = $('#tS');
const n2G = (p, x, y) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); [-9, 0, 9].forEach(k => mk(g, 'line', { x1: -18, y1: k, x2: 18, y2: k, stroke: C.ink2, 'stroke-width': 4 })); [-30, 30].forEach(cx => { mk(g, 'circle', { cx, r: 22, fill: NC }); txt(g, cx, 7, 'N', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: '#fff', 'text-anchor': 'middle' }); }); return g; };
const h2G = (p, x, y, ghost) => { const g = mk(p, 'g', { transform: `translate(${x} ${y})` }); if (!ghost) mk(g, 'line', { x1: -10, y1: 0, x2: 10, y2: 0, stroke: C.ink2, 'stroke-width': 4 }); [-22, 22].forEach(cx => { if (ghost) mk(g, 'circle', { cx, r: 16, fill: 'none', stroke: C.red, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }); else { mk(g, 'circle', { cx, r: 16, fill: HC }); txt(g, cx, 6, 'H', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 15, fill: '#fff', 'text-anchor': 'middle' }); } }); return g; };
const tg1 = mk(tsv, 'g', {}); n2G(tg1, 70, 130); h2G(tg1, 220, 70); h2G(tg1, 220, 130); h2G(tg1, 220, 190, true);
txt(tg1, 300, 120, 'NEEDS 3 H₂', { 'font-size': 18, fill: C.ink, 'font-weight': 600 }); txt(tg1, 300, 150, 'HAS ONLY 2', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Numerical: two masses given; find the limiting reagent, the product and what is left over' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `10 g of ${K(H2)} reacts with 64 g of ${K(O2)} to form water. What mass of water forms?<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: H = 1 u, O = 16 u</span>`, qW: 780,
  opts: ['90 g', '72 g', '74 g', '36 g'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`${G_(2)}${H2} + ${O2} \\rightarrow ${G_(2)}${H2O}`)], [K(`${H2}\\; \\tfrac{5}{2} = 2.5, \\;\\; ${O2}\\; \\tfrac{2}{1} = \\textcolor{${C.red}}{2}`)], [K(`${O2}\\text{ limiting} \\rightarrow 4\\,\\text{mol}\\; ${H2O}`)], [K(`4 \\times 18 = \\textcolor{${C.ok}}{72\\,\\text{g}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A4', 'So'), wt('A4', 'seventy')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · limiting reagent', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>Limiting reagent</b>: used up first; it fixes how much product forms', '<b>Excess reagent</b>: left over when the reaction stops', '<b>Method</b>: grams → moles → ÷ number in front → smallest is limiting', '<b>Trap</b>: compare moles ÷ coefficients, never raw grams or raw moles'] });
const YQ = ['What is a limiting reagent, in one line?', 'Why must you compare moles, not grams, to find it?', '28 g of N₂ meets 8 g of H₂. Which one is left over?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 14', topic: 'Inside an atom? Discovery of Electrons, Protons and Neutrons', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSec - 0.2, 1.1, 560, 600], [tExc + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.mr .mx').forEach(e => { if (e.offsetWidth > 700) e.style.fontSize = Math.floor(34 * 700 / e.offsetWidth) + 'px'; });
  document.querySelectorAll('#wl .sol .sx, #pl .sol .sx').forEach(e => { if (e.offsetWidth > 650) e.style.fontSize = Math.floor(27 * 650 / e.offsetWidth) + 'px'; });
  document.querySelectorAll('#so .sol .sx').forEach(e => { if (e.offsetWidth > 420) e.style.fontSize = Math.floor(27 * 420 / e.offsetWidth) + 'px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.trapL .tx').forEach(q => { if (q.offsetWidth > 960) q.style.fontSize = Math.floor(30 * 960 / q.offsetWidth) + 'px'; });
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

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#lm' + i), t, wt('H2', 'runs') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'decides') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = i === 1 ? M.io((t - wt('H4', 'two') + 0.1) / 0.3) : 0; setBg(el, mix(C.soft, C.redBg, on)); el.style.color = mix(C.ink, C.red, on); });
    M.vis($('#hTz'), t, wt('H5', 'Reactions') - 0.15, 1e9, POP);
  }

  /* P: definitions + bicycle model */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DR.forEach((_, i) => { const ti = i ? T0('P4') : wt('P2', 'limiting'); M.vis($('#dr' + i), t, ti - 0.1, 1e9, { dy: 16 }); M.vis($('#dk' + i), t, ti + 0.4, 1e9, POP); });
    M.vis($('#pNote'), t, wt('P3', 'limits') - 0.1, 1e9, POP);
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const asm = k => M.io((t - tAsm - k * 0.15) / 0.7);
    frames.forEach((f, i) => { const k = i < 5 ? asm(i) : 0, x0 = 84 + i * 92, y0 = 140, x1 = i < 5 ? BKX(i) : 470 + (i - 5) * 120, y1 = i < 5 ? 330 : 140, xx = M.lerp(x0, x1, i < 5 ? k : M.io((t - tAsm - 0.8) / 0.6)), yy = M.lerp(y0, y1, k);
      attr(f.g, 'transform', `translate(${xx.toFixed(1)} ${yy.toFixed(1)})`); const op = M.clamp((t - tP1 - 0.6 - i * 0.05) / 0.25) * (i >= 5 ? 1 - 0.5 * M.io((t - T0('P4')) / 0.3) : 1); f.g.style.opacity = op.toFixed(3); });
    wheels.forEach((w, j) => { const bk = j >> 1, k = asm(bk), x0 = 70 + j * 64, y0 = 250, x1 = BKX(bk) + (j & 1 ? 34 : -34), y1 = 362;
      attr(w.g, 'transform', `translate(${M.lerp(x0, x1, k).toFixed(1)} ${M.lerp(y0, y1, k).toFixed(1)})`); w.g.style.opacity = M.clamp((t - tP1 - 0.9 - j * 0.04) / 0.25).toFixed(3); });
    kLab.forEach((l, i) => { l.style.opacity = (M.clamp((t - tP1 - 0.6 - i * 0.3) / 0.25) * (1 - M.io((t - tAsm) / 0.3))).toFixed(3); });
    kOut.forEach((l, i) => { l.style.opacity = M.clamp((t - (i ? T0('P4') : wt('P3', 'stops'))) / 0.3).toFixed(3); });
  }

  /* S + B: the bench */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o }); shrink($('#bn'), $('#bnIn'), t, tNeed - 0.4);
    M.vis($('#rx'), t, tNeed - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tNeed + 0.25, z, { dy: 36, ...o });
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const hIn = M.io((t - tHyd + 0.2) / 0.3), nIn = M.clamp((t - tTwoN + 0.3) / 0.3);
    for (const k in A) { attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`);
      let op = k[0] === 'N' ? nIn : hIn; if (k === 'Nc' || k === 'Nd') op *= 1 - 0.45 * M.io((t - tExc) / 0.4);
      A[k].g.style.opacity = op.toFixed(3); M.hide(A[k].g, op <= 0.002); }
    const brk = M.io((t - tBrk) / 0.35), eN = M.io((t - tLock + 0.1) / 0.4);
    drawBond(BND.NNa, P, nIn * (1 - brk), eN * (1 - brk));
    drawBond(BND.NNb, P, nIn, eN * (1 - 0.45 * M.io((t - tExc) / 0.4)));
    ['HHa', 'HHb', 'HHc'].forEach(k => drawBond(BND[k], P, hIn * (1 - brk), hIn * (1 - brk)));
    ['a1', 'a2', 'a3', 'b1', 'b2', 'b3'].forEach((k, i) => { const u = M.io((t - tForm - i * 0.12) / 0.4); drawBond(BND[k], P, u, u); });
    xtag.style.opacity = M.clamp((t - tExc) / 0.3).toFixed(3);
    const TAG = [[tTwoN, '2 N₂ · TRIPLE BONDS'], [tHyd, '3 H₂'], [tNeed, '1 N₂ NEEDS 3 H₂'], [tBrk, 'OLD BONDS BREAK'], [tMov, 'ATOMS MOVE'], [tForm, 'NEW BONDS FORM'], [tUsed, '2 NH₃ · H₂ ALL USED'], [tSec, 'ONE N₂ LEFT'], [tLim, 'H₂ LIMITING · N₂ EXCESS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tTwoN - 0.1, 1e9, POP);
    const stOff = T0('B1') - 0.1;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['N', tTwoN, NC], ['H', tHyd, HC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avA(t, T0('B1') + 0.2, z);
    PUC.write($('#eq'), t, tNeed + 0.1, 0.7);
    const si = tStx.reduce((a, tt, i) => t >= tt ? i : a, -1);
    if (si >= 0) { M.setT($('#eqN'), String(si + 1)); const tx = $('#eqT'); if (tx._s !== si) { tx._s = si; tx.innerHTML = STX[si]; } }
    M.vis($('#eqS'), t, tStx[0] + 0.3, 1e9, { dy: 12 });
    const pulse = si >= 0 ? M.io((t - tStx[si]) / 0.2) * (1 - M.io((t - tStx[si] - 0.6) / 0.4)) : 0; $('#eqN').style.background = mix(C.ac, GC, pulse);
    const used = t >= tForm + 0.3, CV = [['2', used ? '1' : '0', used ? '1' : '2'], ['3', used ? '3' : '0', used ? '0' : '3']];
    CV.forEach((vals, i) => { vals.forEach((v, j) => M.setT($(`#cv${i}_${j}`), v)); M.vis($('#cr' + i), t, tNeed + 0.5 + i * 0.15, 1e9, { dx: -16, dy: 0 });
      M.vis($('#ck' + i), t, i ? tLim - 0.1 : tExc - 0.1, 1e9, POP);
      const fl = M.io((t - tForm - 0.3) / 0.2) * (1 - M.io((t - tForm - 0.8) / 0.5)); setBg($('#cr' + i), mix(C.soft, i ? C.redBg : C.ac2, Math.max(fl, i ? M.io((t - tLim) / 0.3) : 0)));
      $(`#cv${i}_2`).style.color = i && used ? C.red : C.ink; });
  }

  /* D: the method */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#md'), t, tD1 + 0.05, OUT('C1'), { dy: 36, ...o }); M.vis($('#mHd'), t, tMr[0] + 0.5, 1e9, { dy: 8 });
    MR.forEach((_, i) => { M.vis($('#mr' + i), t, tMr[i] - 0.1, 1e9, { dx: -20, dy: 0 }); PUC.write($('#mx' + i), t, tMr[i] + 0.7, 0.6);
      const on = M.io((t - tMr[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tMr[i + 1]) / 0.25) : 1); setBg($('#mr' + i), mix(C.soft, C.ac2, on)); });
  }

  /* C: two cases + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const z = OUT('C4');
    cbar.forEach((B, i) => {
      const tin = tC1 + 0.05 + i * 0.3, td = T0(CASES[i][6]);
      M.vis(B.card, t, tin, z, { dx: i ? 60 : -60, dy: 0, ...o });
      M.vis(B.card.querySelector('.lbl'), t, tin + 0.2, 1e9, { dy: 8 }); PUC.write(B.card.querySelector('.cs'), t, wt('C1', 'twenty') + i * 0.2, 0.5);
      PUC.write(B.card.querySelector('.cH'), t, td + 0.6, 0.5);
      const nu = M.io((t - td - 0.9) / 0.4); B.need.style.opacity = B.needL.style.opacity = nu.toFixed(3);
      const hu = M.io((t - td - 1.4) / 0.7), hw = Math.min(B.v, 3) * B.U * hu; attr(B.have, 'width', Math.max(0, hw - (B.v > 3 ? 0 : 0)).toFixed(1)); B.have.style.opacity = M.clamp(hu * 4).toFixed(3); B.haveL.style.opacity = M.clamp(hu * 3).toFixed(3);
      const xu = M.io((t - td - 2.1) / 0.5); attr(B.extra, 'width', B.v > 3 ? ((B.v - 3) * B.U * xu).toFixed(1) : '0'); B.exT.style.opacity = xu.toFixed(3);
      if (B.v < 3) { attr(B.extra, 'x', (36 + B.v * B.U).toFixed(1)); attr(B.extra, 'width', (B.U * xu).toFixed(1)); attr(B.extra, 'fill', C.redBg); attr(B.exT, 'x', 36 + 3 * B.U + 12); }
      M.vis(B.card.querySelector('.cv2'), t, i ? wt('C3', 'left') - 0.1 : wt('C2', 'runs') - 0.1, 1e9, POP);
    });
    M.vis($('#th1'), t, tC4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Is') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Nitrogen') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'reactant') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'decides') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'forms') + 0.2, 0.8);
  }

  /* W: NCERT worked example */
  const wOn = t >= tW1 - 0.1 && t < tP5 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('P5');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    wbars.forEach((B, i) => { const u = M.io((t - tWb[i] + 0.1) / 0.7); attr(B.r, 'width', Math.max(0.1, B.v * WU * u).toFixed(1)); B.r.style.opacity = M.clamp(u * 4).toFixed(3); B.l.style.opacity = M.clamp(u * 3).toFixed(3); });
    const su = M.io((t - wt('W5', 'less') + 0.1) / 0.3); shortR.style.opacity = shortT.style.opacity = su.toFixed(3);
    kgT.style.opacity = M.clamp((t - wt('W7', 'fifty') + 0.1) / 0.3).toFixed(3);
    M.vis(limP, t, wt('W6', 'limiting') - 0.1, 1e9, POP);
  }

  /* N: practice numerical */
  const nOn = t >= tP5 - 0.1 && t < tX1 + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = OUT('X1');
    M.vis($('#pl'), t, tP5 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#pl .pr'), t, wt('P5', 'practice') - 0.1, 1e9, POP);
    M.vis($('#pq2'), t, T0('P6') - 0.1, 1e9, { dy: 14 });
    psol(t, tP5, tPs);
    M.vis($('#pr2'), t, T0('P6') + 0.2, out, { dx: 60, dy: 0, ...o });
    inL.style.opacity = M.clamp((t - T0('P6') - 0.4) / 0.3).toFixed(3); outL.style.opacity = M.clamp((t - tPo[0] + 0.3) / 0.3).toFixed(3);
    const sg = (S, tt) => { const u = M.io((t - tt) / 0.5); attr(S.r, 'width', Math.max(0.1, S.w * u).toFixed(1)); S.r.style.opacity = M.clamp(u * 4) * (+S.r.getAttribute('opacity') || 1); S.tx.style.opacity = M.clamp((u - 0.6) * 3).toFixed(3); };
    sg(pIn[0], wt('P6', 'Eight')); sg(pIn[1], wt('P6', 'sixteen'));
    pOut.forEach((S, i) => sg(S, tPo[i] - 0.1));
    leftT.style.opacity = M.clamp((t - tPo[2]) / 0.3).toFixed(3);
    M.vis(pChk, t, wt('P9', 'Twenty') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'fewer') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Divide') - 0.1 });
    fade(tg1, t, wt('X2', 'One') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
