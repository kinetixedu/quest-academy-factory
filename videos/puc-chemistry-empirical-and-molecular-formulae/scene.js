// PUC Chemistry Ep 11: Empirical and molecular formulae (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (same in bench, formulas, counters, table and recap): C teal (element in play), H ink, O violet, Cl blue, n gold, electrons orange
const CC = C.ac, HC = C.ink, OC = '#7A4FE0', LC = '#2F6FEB', EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
// LaTeX helpers with colour-coding
const col = (c, s) => `\\textcolor{${c}}{\\mathrm{${s}}}`;
const Ck = col(CC, 'C'), Hk = col(HC, 'H'), Ok = col(OC, 'O'), Lk = col(LC, 'Cl'), G_ = s => `\\textcolor{${GC}}{${s}}`;
const GLU = `${Ck}_6${Hk}_{12}${Ok}_6`, CH2O = `${Ck}${Hk}_2${Ok}`, C6H6 = `${Ck}_6${Hk}_6`, C2H2 = `${Ck}_2${Hk}_2`, CH = `${Ck}${Hk}`;
const AC = `${Ck}_2${Hk}_4${Ok}_2`, CH2Cl = `${Ck}${Hk}_2${Lk}`, C2H4Cl2 = `${Ck}_2${Hk}_4${Lk}_2`;
const Nk = col(CC, 'N');

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  note: ['M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z', 'M15 3v6h6', 'M8 13h8', 'M8 17h5'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three substances ---------- */
const JOBS = [['droplet', 'Vinegar', 'TASTES SOUR', 'Vinegar', AC], ['box', 'Glucose', 'TASTES SWEET', 'Glucose', GLU], ['flask', 'Formalin', 'PRESERVES SPECIMENS', 'Formalin', CH2O]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , f], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jf" id="jf${i}">${K(f)}</div><div class="jq" id="jq${i}">1 : 2 : 1</div></div>`).join('');
const KIT = [['box', `Packet: ${K(GLU)}`, 'packet'], ['note', `Notes: ${K(CH2O)}`, 'notes']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: two kinds of formula + glucose ---------- */
const DR = [['Empirical formula', 'Simplest whole-number ratio of atoms', 'FOUND BY EXPERIMENT'], ['Molecular formula', 'Exact number of each atom in one molecule', 'ONE MOLECULE']];
$('#drs').innerHTML = DR.map(([n, d, k], i) => `<div class="dr" id="dr${i}" style="top:${80 + i * 170}px"><div class="dn">${n}</div><div class="dd">${d}</div><div class="dk" id="dk${i}">${k}</div></div>`).join('');
$('#nrel').innerHTML = K(`\\text{Molecular} = ${G_('n')} \\times \\text{Empirical}`);
{ const card = $('#pq'), d = document.createElement('div'); d.id = 'pqIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
$('#gM').innerHTML = K(GLU);
const gMl = document.createElement('div'); gMl.className = 'lbl'; gMl.id = 'gMl'; gMl.textContent = 'MOLECULAR'; $('#pw').appendChild(gMl);
$('#gEk').innerHTML = K(`\\color{white}{\\mathrm{CH_2O}}`);
const GCR = [['C', CC, '6', '6 ÷ 6 = 1'], ['H', HC, '12', '12 ÷ 6 = 2'], ['O', OC, '6', '6 ÷ 6 = 1']];
$('#gcs').innerHTML = GCR.map(([e, c], i) => `<div class="gc" id="gc${i}" style="top:${170 + i * 92}px"><div class="ce" style="color:${c}">${e}</div><div class="cv" id="gv${i}"></div></div>`).join('');
const gs = $('#gS');
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const gBox = [], gAt = [];
for (let r = 0; r < 6; r++) {
  gBox.push(mk(gs, 'rect', { x: 52, width: 360, height: 46, rx: 12, fill: C.soft, stroke: C.ac, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
  gAt.push([[CC, 'C', 18, 18, 96], [HC, 'H', 14, 15, 170], [HC, 'H', 14, 15, 226], [OC, 'O', 18, 18, 300]].map(([f, l, rr, fs, x]) => ({ g: atomG(gs, rr, f, l, fs), x, k: l })));
}
const gUnit = txt(gs, 352, 0, '', { 'font-size': 18, fill: C.ac, 'font-weight': 600 });

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const boxL = mk(bW, 'g', {}), bondL = mk(bW, 'g', {}), ringL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const A = {};
const atom = (k, r, fill, lab, fs) => { A[k] = { g: atomG(atomL, r, fill, lab, fs), r, ring: mk(ringL, 'circle', { r: r + 9, fill: 'none', stroke: GC, 'stroke-width': 3 }) }; };
for (let i = 0; i < 6; i++) { atom('C' + i, 30, CC, 'C', 26); atom('H' + i, 21, HC, 'H', 20); }
const bond = (a, c, n) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })), dt: Array.from({ length: n * 2 }, () => mk(dotL, 'circle', { r: 6, fill: EC })) });
const RB = [0, 1, 2, 3, 4, 5].map(i => bond('C' + i, 'C' + ((i + 1) % 6), i % 2 ? 1 : 2)), HB = [0, 1, 2, 3, 4, 5].map(i => bond('C' + i, 'H' + i, 1));
const AB = [bond('H0', 'C0', 1), bond('C0', 'C1', 3), bond('C1', 'H1', 1)];
const drawBond = (bd, P, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = A[bd.a].r - 6, r2 = A[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2, sp = bd.n > 2 ? 15 : 17;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * sp, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k;
    const sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * sp; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
// beats on the bench
const tBz = wt('S1', 'benzene'), tCarb = wt('S2', 'carbon'), tHyd = wt('S2', 'hydrogen'), tPair = wt('S2', 'shared');
const tCnt = wt('S3', 'Count'), tCntC = wt('S3', 'Six'), tCntH = wt('S3', 'six', 1), tC6 = wt('S3', 'C');
const tOpen = wt('S4', 'bonds'), tSort = wt('S4', 'sort'), tPcs = wt('S5', 'Six'), tEF = wt('S6', 'empirical'), tN6 = wt('S6', 'n');
const tKeep = wt('S7', 'keep'), tJoin = wt('S7', 'join'), tPair2 = wt('S7', 'electrons'), tThree = wt('S7', 'three'), tAcet = wt('S8', 'acetylene'), tC2 = wt('S8', 'C'), tN2 = wt('S8', 'Here');
const BZ = i => { const a = (-90 + 60 * i) * Math.PI / 180; return [[392 + 92 * Math.cos(a), 258 + 92 * Math.sin(a)], [392 + 162 * Math.cos(a), 258 + 162 * Math.sin(a)]]; };
const PX = i => 392 + (i - 2.5) * 116;
const KP = {};
for (let i = 0; i < 6; i++) {
  const [cp, hp] = BZ(i), d = i * 0.07;
  KP['C' + i] = [[0, ...cp], [tSort + d, PX(i), 200]];
  KP['H' + i] = [[0, ...hp], [tSort + d + 0.05, PX(i), 316]];
}
KP.C0.push([tJoin, 300, 258]); KP.H0.push([tJoin, 160, 258]); KP.C1.push([tJoin + 0.1, 484, 258]); KP.H1.push([tJoin + 0.1, 624, 258]);
const PF = {}; for (const k in KP) { const ks = KP[k]; PF[k] = [M.keys(ks.map(([t, x]) => [t, x]), 0.9), M.keys(ks.map(([t, , y]) => [t, y]), 0.9)]; }
const pBox = [0, 1, 2, 3, 4, 5].map(i => mk(boxL, 'rect', { x: PX(i) - 48, y: 150, width: 96, height: 216, rx: 16, fill: C.soft, stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' }));
const pLab = [0, 1, 2, 3, 4, 5].map(i => txt(boxL, PX(i), 400, 'CH', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ac, 'font-weight': 600 }));
// bench tag + periodic strip
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same recipe, two very different molecules!' });
// formula rows: molecular -> divide -> empirical
const FR = [['BENZENE', C6H6, '÷ 6', 'n = 6'], ['ACETYLENE', C2H2, '÷ 2', 'n = 2']];
$('#frs').innerHTML = FR.map(([n, f, d, z], i) => `<div class="fr" id="fr${i}" style="top:${78 + i * 88}px"><div class="fn">${n}</div><div class="ff" id="ff${i}">${K(f)}</div><div class="fd" id="fd${i}">${d}</div><div class="fe" id="fe${i}">${K(CH)}</div><div class="fz" id="fz${i}">${z}</div></div>`).join('');
const tFr = [[tC6, tPcs, tEF, tN6], [tC2, tN2, tN2 + 0.3, tN2 + 0.6]];
// counter
$('#crs').innerHTML = [['C', 'carbon atoms', CC], ['H', 'hydrogen atoms', HC]].map(([e, n, c], i) => `<div class="cr" id="cr${i}" style="top:${78 + i * 88}px"><div class="ce" style="color:${c}">${e}</div><div class="cn">${n}</div><div class="cv" id="cv${i}">0</div></div>`).join('');
const th1 = PUC.think($('#th1'), { q: `Benzene ${K(C6H6)} and acetylene ${K(C2H2)}: same empirical formula?`, opts: ['Yes', 'No'], right: 0, why: `Both reduce to ${K(CH)}. Same simplest ratio, different molecules: n = 6 and n = 2.` });

/* ---------- D: derivation table ---------- */
const DCX = [72, 330, 590, 850, 1110, 1350], DHD = ['ELEMENT', 'MASS %', 'IN 100 g', '÷ ATOMIC MASS', 'MOLES', '÷ SMALLEST'];
const DRW = [['C', CC, 'carbon', '40.0', '40.0 g', '÷ 12', '3.33', '1'], ['H', HC, 'hydrogen', '6.7', '6.7 g', '÷ 1', '6.7', '2'], ['O', OC, 'oxygen', '53.3', '53.3 g', '÷ 16', '3.33', '1']];
$('#dtb').innerHTML = DRW.map((_, r) => `<div class="trw" id="tr${r}" style="top:${130 + r * 92}px"></div>`).join('') +
  `<div class="tcol" id="tcol" style="width:236px;background:none;border:3px solid var(--ac)"></div>` +
  DHD.map((h, c) => `<div class="th" id="th${c}" style="left:${DCX[c]}px">${h}</div>`).join('') +
  DRW.map(([e, cc, nm, ...v], r) => `<div class="tc el" id="tc${r}_0" style="left:${DCX[0]}px;top:${143 + r * 92}px;color:${cc}">${e} <span style="font:500 18px 'IBM Plex Mono';color:var(--mute)">${nm}</span></div>` +
    v.map((x, c) => `<div class="tc" id="tc${r}_${c + 1}" style="left:${DCX[c + 1]}px;top:${147 + r * 92}px;${c === 4 ? `color:${cc === HC ? C.ink : cc}` : ''}">${x}</div>`).join('')).join('') +
  `<div class="dp" id="dp0" style="background:var(--ink);color:#fff">Empirical ${K(`\\color{white}{\\mathrm{CH_2O}}`)}</div>` +
  `<div class="dp" id="dp1" style="background:var(--g);color:#fff;font-family:'IBM Plex Mono'">n = 180 ÷ 30 = 6</div>` +
  `<div class="dp" id="dp2" style="background:var(--ac);color:#fff">Molecular ${K(`\\color{white}{\\mathrm{C_6H_{12}O_6}}`)}</div>`;
const tCol = [T0('D1'), T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const tCell = [[wt('D1', 'forty'), wt('D1', 'six'), wt('D1', 'fifty')], [wt('D2', 'grams') + 0.3, wt('D2', 'grams') + 0.6, wt('D2', 'grams') + 0.9], [wt('D3', 'Carbon'), wt('D3', 'hydrogen'), wt('D3', 'oxygen')],
  [wt('D4', 'three'), wt('D4', 'six'), wt('D4', 'three', 3)], [wt('D5', 'one'), wt('D5', 'two'), wt('D5', 'one', 1)]];
const tDp = [wt('D5', 'empirical'), wt('D6', 'So'), wt('D7', 'gives')];
const DST = [[T0('D1'), 'GIVEN · MASS PERCENT'], [T0('D2'), 'STEP 1 · TAKE 100 g'], [T0('D3'), 'STEP 2 · GRAMS TO MOLES'], [T0('D5'), 'STEP 3 · DIVIDE BY SMALLEST'], [T0('D6'), 'STEP 4 · FIND n']];
const avD = PUC.avatar($('#sD'), { x: 160 + 1040, y: 270 + 476, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my packet and notes agree!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${GLU} = ${G_(6)} \\times ${CH2O}`);

/* ---------- W: NCERT worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${Hk}\\;4.04,\\;\\; ${Ck}\\;2.021,\\;\\; ${Lk}\\;2.021\\;\\text{mol}`)],
  [K(`\\div 2.021:\\;\\; ${Hk}\\,2 : ${Ck}\\,1 : ${Lk}\\,1 \\;\\rightarrow\\; ${CH2Cl}`)],
  [K(`\\text{EF mass} = 49.48\\,\\text{g}`)],
  [K(`${G_('n')} = 98.96 \\div 49.48 = ${G_(2)}`)],
  [K(`\\text{Molecular: } ${C2H4Cl2}`)]], { label: 'NCERT WORKED EXAMPLE', y0: 220, dy: 64 });
const tWs = [wt('W3', 'Hydrogen'), wt('W4', 'Divide'), wt('W5', 'forty'), wt('W6', 'ninety'), wt('W7', 'molecular')];
const s2 = $('#wS2'), BASE = 390, SC = 62, BX = [200, 392, 584];
const BARS = [['H', HC, 4.04, '4.04', '÷ 1.008', '2'], ['C', CC, 2.021, '2.021', '÷ 12.01', '1'], ['Cl', LC, 2.021, '2.021', '÷ 35.453', '1']];
mk(s2, 'line', { x1: 80, y1: BASE, x2: 704, y2: BASE, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const bars = BARS.map(([e, c, v, lv, dv, rv], i) => {
  const r = mk(s2, 'rect', { x: BX[i] - 56, width: 112, rx: 10, fill: c });
  const val = txt(s2, BX[i], 0, lv, { 'text-anchor': 'middle', 'font-size': 26, fill: c === HC ? C.ink : c, 'font-weight': 600 });
  const el = txt(s2, BX[i], BASE + 38, e, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 28, fill: c === HC ? C.ink : c, 'font-weight': 700 });
  const dvt = txt(s2, BX[i], BASE + 66, dv, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
  return { r, val, el, dvt, v, lv, rv };
});
const unitLn = mk(s2, 'line', { x1: 130, x2: 684, stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const unitT = txt(s2, 40, 0, '1 UNIT', { 'text-anchor': 'start', 'font-size': 18, fill: GC, 'font-weight': 600 });
const hSplit = mk(s2, 'line', { x1: BX[0] - 56, x2: BX[0] + 56, stroke: '#fff', 'stroke-width': 4 });
const tBar = [wt('W3', 'Hydrogen'), wt('W3', 'Carbon'), wt('W3', 'chlorine')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Ratio ${K('1 : 1.5')}, so round it up to ${K('1 : 2')}`, right: `Multiply every number by 2: ${K('1 : 1.5 \\rightarrow 2 : 3')}` });
const tsv = $('#tS');
const dot = (p, x, y, c, l, half) => { const g = mk(p, 'g', {}); if (half) { mk(g, 'defs', {}).innerHTML = `<clipPath id="hc${x}"><rect x="${x - 20}" y="${y - 20}" width="20" height="40"/></clipPath>`; mk(g, 'circle', { cx: x, cy: y, r: 19, fill: 'none', stroke: c, 'stroke-width': 2, 'stroke-dasharray': '4 4' }); mk(g, 'circle', { cx: x, cy: y, r: 19, fill: c, 'clip-path': `url(#hc${x})` }); } else { mk(g, 'circle', { cx: x, cy: y, r: 19, fill: c }); txt(g, x, y + 7, l, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: '#fff', 'text-anchor': 'middle' }); } return g; };
const gHalf = mk(tsv, 'g', {}); dot(gHalf, 40, 96, CC, 'N'); dot(gHalf, 110, 96, OC, 'O'); dot(gHalf, 160, 96, OC, 'O', true);
txt(gHalf, 210, 103, 'HALF AN ATOM? NO', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const gTwo = mk(tsv, 'g', {}); [40, 90].forEach(x => dot(gTwo, x, 186, CC, 'N')); [160, 210, 260].forEach(x => dot(gTwo, x, 186, OC, 'O'));
txt(gTwo, 310, 193, '× 2 · WHOLE ATOMS 2 : 3', { 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Numerical: mass percentages and a molar mass are given; find both formulas' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `An oxide of nitrogen has 36.8% N and 63.2% O. Its molar mass is 76 g mol⁻¹. Its molecular formula is<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: N = 14 u, O = 16 u</span>`, qW: 780,
  opts: [K(`${Nk}${Ok}_2`), K(`${Nk}_2${Ok}_3`), K(`${Nk}_2${Ok}_4`), K(`${Nk}_2${Ok}_5`)], right: 1, optW: 474, optY: 344, optH: 104, optFs: 38 });
const so = PUC.solution($('#so'), [[K(`${Nk}:\\; 36.8 \\div 14 = 2.63`)], [K(`${Ok}:\\; 63.2 \\div 16 = 3.95`)], [K(`1 : 1.5 \\;\\xrightarrow{\\times 2}\\; 2 : 3`)], [K(`${Nk}_2${Ok}_3 = 28 + 48 = 76`)], [K(`${G_('n')} = 1 \\;\\rightarrow\\; \\textcolor{${C.ok}}{\\mathrm{N_2O_3}}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Nitrogen'), wt('A2', 'Oxygen'), wt('A3', 'Multiply'), wt('A4', 'Its'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · empirical and molecular formulae', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${GLU} = ${G_('n')} \\times ${CH2O}, \\quad ${G_('n')} = 6`), '<b>Empirical</b>: simplest whole-number ratio of atoms', '<b>Molecular</b>: exact atoms in one molecule; n = molar mass ÷ EF mass', '<b>Method</b>: % → grams in 100 g → moles → ÷ smallest → whole numbers', '<b>Trap</b>: never round 1 : 1.5; multiply by 2 to get 2 : 3'] });
const YQ = ['What is the empirical formula of hydrogen peroxide, H₂O₂?', 'Why must a ratio of 1 : 1.5 be multiplied, not rounded?', 'Empirical formula CH₂, molar mass 56 g. What is n?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 12', topic: 'How much O₂ does a flame use? Chemical Equations and Stoichiometry', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPair - 0.2, 1.1, 960, 560], [tCnt + 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  gMl.style.left = (36 + $('#gM').offsetWidth + 20) + 'px'; gMl.style.top = '100px';
  let dx = 36; [0, 1, 2].forEach(i => { const e = $('#dp' + i); e.style.left = dx + 'px'; dx += e.offsetWidth + 24; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
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

  /* H: three substances, Diya's kitchen */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jf' + i), t, tMorph + 0.6 + i * 0.15, 1e9, POP); M.vis($('#jq' + i), t, wt('H2', 'atoms') + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'ratio') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'Both') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'formula') - 0.15, 1e9, POP);
  }

  /* P: two kinds of formula + glucose */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dy: 36, ...o }); shrink($('#pq'), $('#pqIn'), t, tP4 - 0.3);
    DR.forEach((_, i) => { const el = $('#dr' + i), ti = i ? T0('P3') : wt('P2', 'empirical'); M.vis(el, t, ti - 0.1, 1e9, { dy: 16 }); M.vis($('#dk' + i), t, i ? wt('P3', 'one') : wt('P2', 'Empirical', 1), 1e9, POP);
      const on = M.io((t - (i ? T0('P4') : T0('P5')) - 0.2) / 0.3) * (i ? 1 - M.io((t - T0('P5') - 0.2) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#nrel'), t, T0('P6') + 0.2, 1e9, POP);
    M.vis($('#pw'), t, tP4 - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#gM'), t, tP4 + 0.2, 0.6); M.vis(gMl, t, wt('P4', 'molecular') - 0.1, 1e9, { dy: 8 });
    // glucose units: atoms arrive by kind, then the six units separate into groups
    const tAt = [wt('P4', 'six'), wt('P4', 'twelve'), wt('P4', 'twelve'), wt('P4', 'six', 1)], sep = M.io((t - wt('P5', 'Divide') + 0.1) / 0.6), hi = M.io((t - wt('P5', 'one') + 0.1) / 0.3);
    for (let r = 0; r < 6; r++) {
      const y = 186 + r * M.lerp(40, 50, sep);
      attr(gBox[r], 'y', (y - 23).toFixed(1)); gBox[r].style.opacity = (sep * (r === 0 ? 1 : 1 - 0.5 * hi)).toFixed(3); attr(gBox[r], 'fill', r === 0 ? mix(C.soft, C.ac2, hi) : C.soft);
      gAt[r].forEach((a, k) => { const u = M.clamp((t - tAt[k] - r * 0.06 + 0.1) / 0.25); attr(a.g, 'transform', `translate(${a.x} ${y.toFixed(1)}) scale(${(0.6 + 0.4 * M.io(u)).toFixed(3)})`); a.g.style.opacity = (u * (r === 0 ? 1 : 1 - 0.6 * hi)).toFixed(3); M.hide(a.g, u <= 0.002); });
    }
    M.setT(gUnit, 'CH₂O'); attr(gUnit, 'y', 192); gUnit.style.opacity = hi.toFixed(3);
    GCR.forEach(([, , a, d], i) => { M.vis($('#gc' + i), t, tAt[i === 0 ? 0 : i === 1 ? 1 : 3] - 0.1, 1e9, { dx: 16, dy: 0 }); M.setT($('#gv' + i), t >= wt('P5', 'Divide') + 0.2 ? d : a); });
    M.vis($('#gE'), t, wt('P5', 'C') - 0.1, 1e9, POP); M.vis($('#gN'), t, wt('P6', 'n') - 0.1, 1e9, POP);
  }

  /* S + B: the bench, formulas, counter, think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o }); shrink($('#bn'), $('#bnIn'), t, tCnt - 0.4);
    M.vis($('#rx'), t, tC6 - 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tCnt - 0.1, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB1 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB1, tOpts: wt('B1', 'same') - 0.1, tCount: T1('B1') + 0.05, dur: 3, tAns: T0('B2') - 0.02, tWhy: wt('B2', 'Both') });
    const P = {}; for (const k in PF) P[k] = [PF[k][0](t), PF[k][1](t)];
    const keepOut = M.io((t - tKeep) / 0.4), dimO = M.io((t - tEF) / 0.3) * (1 - keepOut);
    for (let i = 0; i < 6; i++) ['C', 'H'].forEach(e => {
      const k = e + i, a = A[k];
      attr(a.g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`); attr(a.ring, 'cx', P[k][0].toFixed(1)); attr(a.ring, 'cy', P[k][1].toFixed(1));
      let op = e === 'C' ? M.clamp((t - tBz + 0.1 - i * 0.1) / 0.3) : M.clamp((t - tHyd - i * 0.08) / 0.3);
      if (i > 0) op *= 1 - 0.6 * dimO; if (i > 1) op *= 1 - keepOut;
      a.g.style.opacity = op.toFixed(3); M.hide(a.g, op <= 0.002);
      const tc = (e === 'C' ? tCntC - 0.6 : tCntH - 0.6) + i * 0.16, ru = M.io((t - tc) / 0.2) * (1 - M.io((t - tOpen) / 0.3));
      a.ring.style.opacity = ru.toFixed(3); M.hide(a.ring, ru <= 0.002);
    });
    const brk = M.io((t - tOpen) / 0.4), eu = M.io((t - tPair + 0.1) / 0.5);
    RB.forEach((bd, i) => { const u = M.io((t - tBz - 0.3 - i * 0.12) / 0.35) * (1 - brk); drawBond(bd, P, u, eu * (1 - brk)); });
    HB.forEach((bd, i) => { const u = M.io((t - tHyd - 0.1 - i * 0.08) / 0.35) * (1 - brk); drawBond(bd, P, u, eu * (1 - brk)); });
    const ju = M.io((t - tJoin - 0.9) / 0.4), je = M.io((t - tThree + 0.2) / 0.5);
    AB.forEach((bd, i) => drawBond(bd, P, ju, i === 1 ? je : M.io((t - tPair2) / 0.4) * ju));
    pBox.forEach((r, i) => { const u = M.io((t - tPcs + 0.1 - i * 0.08) / 0.3) * (1 - keepOut); r.style.opacity = (u * (i ? 1 - 0.6 * dimO : 1)).toFixed(3); M.hide(r, u <= 0.002); attr(r, 'fill', i === 0 ? mix(C.soft, C.ac2, dimO) : C.soft);
      pLab[i].style.opacity = (u * (i ? 1 - 0.6 * dimO : 1)).toFixed(3); M.hide(pLab[i], u <= 0.002); });
    // bench tag
    const TAG = [[tBz, 'BENZENE'], [tPair, 'SHARED PAIR = BOND'], [tCnt, 'COUNT THE ATOMS'], [tOpen, 'BONDS OPEN'], [tSort, 'SORT INTO PIECES'], [tPcs, '6 IDENTICAL PIECES'], [tEF, 'EACH PIECE: CH'], [tKeep, 'KEEP TWO PIECES'], [tJoin + 0.6, 'NEW BONDS FORM'], [tThree, 'C≡C · 3 SHARED PAIRS'], [tAcet, 'C₂H₂ · ACETYLENE']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tBz - 0.1, 1e9, POP);
    M.setT($('#bnL'), t < tKeep ? 'MOLECULE BENCH · BENZENE' : 'MOLECULE BENCH · ACETYLENE');
    // periodic strip: C, then H; leaves for the avatar
    const stOff = tAcet - 0.2;
    M.vis($('#ptL'), t, tS1 + 0.4, stOff, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, stOff, { dy: 8, outDur: 0.25, ody: 0 });
    [['C', tCarb, CC], ['H', tHyd, HC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avA(t, tAcet + 0.1, z);
    // formula rows
    FR.forEach((_, i) => { const [a, bb, c, d] = tFr[i]; M.vis($('#fr' + i), t, a - 0.2, 1e9, { dx: -16, dy: 0 }); PUC.write($('#ff' + i), t, a, 0.4); M.vis($('#fd' + i), t, bb, 1e9, POP); PUC.write($('#fe' + i), t, c, 0.4); M.vis($('#fz' + i), t, d, 1e9, POP);
      setBg($('#fr' + i), mix(C.soft, C.ac2, M.io((t - T0('B1')) / 0.3))); });
    // counter: counts up with the rings, then 2 and 2 for acetylene
    const nC = Math.max(0, Math.min(6, Math.floor((t - (tCntC - 0.6)) / 0.16) + 1)), nH = Math.max(0, Math.min(6, Math.floor((t - (tCntH - 0.6)) / 0.16) + 1));
    const ac = t >= tJoin;
    M.setT($('#cv0'), ac ? '2' : String(nC)); M.setT($('#cv1'), ac ? '2' : String(nH));
    [0, 1].forEach(i => { M.vis($('#cr' + i), t, tCnt + i * 0.15, 1e9, { dx: -16, dy: 0 }); const fl = M.io((t - tJoin) / 0.2) * (1 - M.io((t - tJoin - 0.6) / 0.4)); setBg($('#cr' + i), mix(C.soft, C.ac2, fl)); });
  }

  /* D: derivation table */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dt'), t, tD1 + 0.05, OUT('T1'), { dy: 36, ...o });
    DHD.forEach((_, c) => M.vis($('#th' + c), t, tD1 + 0.2 + c * 0.06, 1e9, { dy: 8 }));
    DRW.forEach((_, r) => { M.vis($('#tr' + r), t, tD1 + 0.3 + r * 0.1, 1e9, { dy: 14 }); M.vis($(`#tc${r}_0`), t, tD1 + 0.4 + r * 0.1, 1e9, { dy: 10 }); for (let c = 1; c <= 5; c++) PUC.write($(`#tc${r}_${c}`), t, tCell[c - 1][r] - 0.05, 0.35); });
    const ci = tCol.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1), tc = $('#tcol');
    M.vis(tc, t, tCol[0] - 0.1, tDp[1] - 0.2, { dy: 0, outDur: 0.25, ody: 0 });
    const cx = M.keys(tCol.map((tt, i) => [tt - 0.1, DCX[i + 1] - 24]), 0.45)(t); snap(tc, 'left', cx.toFixed(1) + 'px'); snap(tc, 'top', '116px'); snap(tc, 'height', '290px');
    DHD.forEach((_, c) => { $('#th' + c).style.color = c === ci + 1 ? C.ac : C.mute; });
    let st = ''; for (const [tt, s] of DST) if (t >= tt) st = s; M.setT($('#dStep'), st); M.vis($('#dStep'), t, tD1 + 0.3, 1e9, POP);
    [0, 1, 2].forEach(i => M.vis($('#dp' + i), t, tDp[i] - 0.1, 1e9, POP));
    avD(t, wt('D7', 'real') + 0.1, OUT('T1'));
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Empirical') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Molecular') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'count') + 0.2, 0.8);
  }

  /* W: NCERT worked example + mole bars */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const rat = M.io((t - wt('W4', 'Divide') - 0.2) / 0.4);
    bars.forEach((B, i) => {
      const u = M.io((t - tBar[i] + 0.1) / 0.6), h = B.v * SC * u * 1.0;
      attr(B.r, 'y', (BASE - h).toFixed(1)); attr(B.r, 'height', Math.max(0, h).toFixed(1)); B.r.style.opacity = M.clamp(u * 4).toFixed(3);
      attr(B.val, 'y', (BASE - h - 14).toFixed(1)); M.setT(B.val, rat > 0.5 ? B.rv : B.lv); B.val.style.opacity = u.toFixed(3);
      B.el.style.opacity = M.clamp((t - tBar[i] + 0.2) / 0.3).toFixed(3); B.dvt.style.opacity = M.clamp((t - tBar[i]) / 0.3).toFixed(3);
    });
    const uy = BASE - 2.021 * SC; attr(unitLn, 'y1', uy); attr(unitLn, 'y2', uy); M.drawU(unitLn, rat); unitT.style.opacity = rat.toFixed(3); attr(unitT, 'y', uy - 12);
    attr(hSplit, 'y1', uy); attr(hSplit, 'y2', uy); hSplit.style.opacity = rat.toFixed(3);
    M.setT($('#wrL'), t < wt('W4', 'Divide') + 0.2 ? 'MOLES IN 100 g' : 'DIVIDE BY THE SMALLEST');
    const wg = $('#wGp'), ws = t < T0('W5') ? 0 : t < T0('W6') ? 1 : t < T0('W7') ? 2 : 3; if (wg._s !== ws) { wg._s = ws; wg.innerHTML = [`Empirical ${K(`\\color{white}{\\mathrm{CH_2Cl}}`)}`, `${K(`\\color{white}{\\mathrm{CH_2Cl}}`)} = 49.48 g`, `n = 98.96 ÷ 49.48 = 2`, `Molecular ${K(`\\color{white}{\\mathrm{C_2H_4Cl_2}}`)}`][ws]; }
    M.vis(wg, t, wt('W4', 'empirical') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'round') - 0.1, tStrike: wt('X3', 'wrong') - 0.1, tRight: wt('X3', 'Multiply') - 0.1 });
    fade(gHalf, t, wt('X2', 'Say') + 0.4); fade(gTwo, t, wt('X3', 'becomes') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
