// PUC Chemistry Ep 35: Valency and Oxidation States (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: the element in play teal, its partners ink, moving / shared electrons orange,
// electronegativity values gold, positive oxidation states violet, negative oxidation states red
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', PC = C.violet, MC = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`, P_ = s => `\\textcolor{${PC}}{${s}}`, M_ = s => `\\textcolor{${MC}}{${s}}`;
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const oxChip = (host, x, y, s, col) => { const d = document.createElement('div'); d.className = 'ox'; d.style.cssText = `left:${x}px;top:${y}px;background:${col}`; d.textContent = s; host.appendChild(d); return d; };
const stick = (p) => mk(p, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const setL = (l, x1, y1, x2, y2, u = 1) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; attr(l, 'x1', (mx + (x1 - mx) * u).toFixed(1)); attr(l, 'y1', (my + (y1 - my) * u).toFixed(1)); attr(l, 'x2', (mx + (x2 - mx) * u).toFixed(1)); attr(l, 'y2', (my + (y2 - my) * u).toFixed(1)); M.hide(l, u <= 0.01); };

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP5 = T0('P5'), tS1 = T0('S1');
const tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tB4 = T0('B4'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['droplet', 'Water', 'H₂O', 'Water', 'O', 'O HOLDS 2 H'], ['flame', 'Natural gas', 'MOSTLY CH₄', 'gas', 'C', 'C HOLDS 4 H'], ['box', 'Common salt', 'NaCl', 'salt', 'Na', 'Na HOLDS 1 Cl']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el, ew], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${ew}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [`${H_('H')}_2${N_('O')}`, `${N_('C')}${H_('H')}_4`, `${N_('Na')}${H_('Cl')}`];
$('#wqs').innerHTML = KIT.map((s, i) => `<div class="wq" id="wq${i}" style="font-size:30px">${K(s)}</div>`).join('');
const tKit = [wt('H3', 'Every'), wt('H3', 'formula'), wt('H3', 'notebook')];

/* ---------- P: valency + NaCl ---------- */
const QR = [['How many bonds an atom usually forms', 'P2', 'bonds'], ['Comes from the valence electrons (outermost shell)', 'P3', 'valence'], ['Valency = valence electrons, or 8 minus them', 'P4', 'eight']];
$('#qrs').innerHTML = QR.map(([q], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 92}px;height:76px;right:36px;width:auto"><div class="nn">${i + 1}</div><div class="qt">${q}</div></div>`).join('');
const tQr = QR.map(q => wt(q[1], q[2]));
{ const card = $('#pq'), d = document.createElement('div'); d.id = 'pqIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;right:0;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
$('#mdef').style.width = 'auto'; $('#mdef').style.right = '36px';
const ps = $('#pS'), NAX = 200, CLX = 580, PY = 250;
[50, 80, 112].forEach(r => mk(ps, 'circle', { cx: NAX, cy: PY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const naOut = mk(ps, 'circle', { cx: NAX, cy: PY, r: 112, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
[46, 74, 104].forEach(r => mk(ps, 'circle', { cx: CLX, cy: PY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const naG = atomG(ps, 34, NC, 'Na', 26); attr(naG, 'transform', `translate(${NAX} ${PY})`);
const clG = atomG(ps, 34, HC, 'Cl', 26); attr(clG, 'transform', `translate(${CLX} ${PY})`);
const clE = Array.from({ length: 7 }, (_, k) => { const a = (k + 1) * Math.PI * 2 / 8; return mk(ps, 'circle', { cx: CLX - 104 * Math.cos(a), cy: PY + 104 * Math.sin(a), r: 7, fill: HC }); });
const naE = mk(ps, 'circle', { r: 8, fill: EC });
const naL = txt(ps, NAX, PY + 154, 'Na  2, 8, 1', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600, 'font-size': 20 });
const clL = txt(ps, CLX, PY + 154, 'Cl  2, 8, 7', { 'text-anchor': 'middle', fill: HC, 'font-weight': 600, 'font-size': 20 });
const naV = txt(ps, NAX, PY + 186, 'VALENCY 1', { 'text-anchor': 'middle', fill: NC, 'font-weight': 600, 'font-size': 20 });
const clV = txt(ps, CLX, PY + 186, '8 − 7 = VALENCY 1', { 'text-anchor': 'middle', fill: HC, 'font-weight': 600, 'font-size': 20 });
$('#hclF').innerHTML = K(`${N_('Na')}${H_('Cl')}`); $('#hclF').style.cssText = 'left:0;width:784px;top:470px;text-align:center;font-size:50px';
const pTag = document.createElement('div'); pTag.className = 'btag'; pTag.style.cssText = 'right:36px;top:18px;background:#FBEDE6;color:#C8461B'; pTag.textContent = '1 ELECTRON MOVES'; $('#pw').appendChild(pTag);

/* ---------- S: hydrides on the bench ---------- */
const HYD = [['C', 4, 4, `${N_('C')}${H_('H')}_4`, 'METHANE'], ['N', 5, 3, `${N_('N')}${H_('H')}_3`, 'AMMONIA'], ['O', 6, 2, `${H_('H')}_2${N_('O')}`, 'WATER'], ['F', 7, 1, `${H_('H')}${N_('F')}`, 'HYDROGEN FLUORIDE']];
const tHy = [tS1 + 0.1, T0('S3'), T0('S4'), T0('S5')];
const tHb = [[wt('S2', 'Each'), wt('S2', 'Four'), wt('S2', 'hydrogens'), wt('S2', 'four', 1)], [wt('S3', 'takes'), wt('S3', 'three', 1), wt('S3', 'hydrogens')], [wt('S4', 'Two'), wt('S4', 'hydrogens')], [wt('S5', 'One', 0)]];
const b = $('#bS'), BX = 392, BY = 250, BR = 92, HL = 178;
const bRing = [mk(b, 'circle', { cx: BX, cy: BY, r: 46, fill: 'none', stroke: C.dim, 'stroke-width': 2 }), mk(b, 'circle', { cx: BX, cy: BY, r: BR, fill: 'none', stroke: C.dim, 'stroke-width': 2 })];
const bSt = [0, 1, 2, 3].map(() => stick(b));
const bNuc = atomG(b, 36, NC, 'C', 30); attr(bNuc, 'transform', `translate(${BX} ${BY})`);
const bNT = bNuc.querySelector('text');
const DIRS = [-90, 0, 90, 180].map(a => a * Math.PI / 180);
const bH = [0, 1, 2, 3].map(() => atomG(b, 28, HC, 'H', 24));
const bE = Array.from({ length: 8 }, () => mk(b, 'circle', { r: 7, fill: HC }));   // central atom's valence electrons
const bHe = [0, 1, 2, 3].map(() => mk(b, 'circle', { r: 7, fill: EC }));            // each H brings one
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const VG = [['1', 1, '1'], ['2', 2, '2'], ['13', 3, '3'], ['14', 4, '4'], ['15', 5, '3, 5'], ['16', 6, '2, 6'], ['17', 7, '1, 7'], ['18', 8, '0, 8']];
$('#vt').innerHTML = `<tr><td class="h">GROUP</td>${VG.map((g, i) => `<td id="vg${i}">${g[0]}</td>`).join('')}</tr><tr><td class="h">VALENCE e⁻</td>${VG.map((g, i) => `<td id="ve${i}">${g[1]}</td>`).join('')}</tr><tr><td class="h">VALENCY</td>${VG.map((g, i) => `<td id="vv${i}"><span>${g[2].split(', ')[0]}</span><span class="v2">${g[2].includes(',') ? ', ' + g[2].split(', ')[1] : ''}</span></td>`).join('')}</tr>`;
const tVg = [tP5, wt('S6', 'Up'), wt('S6', 'Up') + 0.15, tHy[0], tHy[1], tHy[2], tHy[3], wt('S6', 'usually')];
const RL = [['Groups 1, 2, 13, 14: valency = valence e⁻', 'C: 4', wt('S6', 'equals')], ['Groups 15 to 18: usually 8 − valence e⁻', 'O: 8 − 6', wt('S6', 'eight')], [`Phosphorus: 3 in ${K('\\mathrm{P_4O_6}')}, 5 in ${K('\\mathrm{P_4O_{10}}')}`, 'BOTH', wt('B1', 'Phosphorus')]];
$('#rls').innerHTML = RL.map(([a, e], i) => `<div class="rl" id="rl${i}" style="top:${74 + i * 62}px">${a}<em>${e}</em></div>`).join('');
const th1 = PUC.think($('#th1'), { q: `Silicon (group 14) and bromine (group 17): which formula?`, opts: [K(`${N_('Si')}${H_('Br')}_4`), K(`${N_('Si')}_4${H_('Br')}`)], right: 0, why: 'Si has valency 4, Br has valency 1: one Si holds four Br.' });
const avD = PUC.avatar($('#bn'), { x: 36, y: 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Four, three, two, one. So neat!' });

/* ---------- D: oxidation state ---------- */
const dsol = PUC.solution($('#dl'), [
  ['Shared electrons go to the stronger puller'],
  [K(`\\mathrm{OF_2}:\\; ${H_('F')}\\;${G_('4.0')} > ${N_('O')}\\;${G_('3.5')}`)],
  [K(`2 \\times (${M_('-1')}) = -2 \\;\\Rightarrow\\; ${N_('O')} = ${P_('+2')}`)],
  [K(`\\mathrm{Na_2O}:\\; ${N_('O')} = ${M_('-2')},\\; ${H_('Na')} = ${P_('+1')}`)],
  [K(`${P_('+2')} + 2(${M_('-1')}) = 0 \\;\\checkmark`)]], { label: 'OXIDATION STATE · STEP BY STEP', y0: 96, dy: 92 });
$('#dl').querySelector('.sol .sx').style.cssText += ';font:600 27px Poppins';
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5'), T0('D6')];
const ds = $('#dS');
txt(ds, 36, 92, 'OF₂', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: C.ink });
txt(ds, 36, 352, 'Na₂O', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: C.ink });
mk(ds, 'line', { x1: 36, y1: 300, x2: 748, y2: 300, stroke: C.line, 'stroke-width': 2 });
// OF2
const OA = [392, 150], FA = [[232, 214], [552, 214]];
const ofSt = FA.map(f => { const l = stick(ds); setL(l, OA[0], OA[1], f[0], f[1]); return l; });
const oG1 = atomG(ds, 36, NC, 'O', 30); attr(oG1, 'transform', `translate(${OA[0]} ${OA[1]})`);
const fG = FA.map(f => { const g = atomG(ds, 32, HC, 'F', 28); attr(g, 'transform', `translate(${f[0]} ${f[1]})`); return g; });
const ofE = FA.map(() => [0, 1].map(() => mk(ds, 'circle', { r: 8, fill: EC })));
const enO = txt(ds, OA[0], OA[1] - 50, '3.5', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 20 });
const enF = FA.map(f => txt(ds, f[0], f[1] + 58, '4.0', { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 20 }));
const oxO1 = oxChip($('#dr'), OA[0] + 44, OA[1] - 20, '+2', PC), oxF = FA.map((f, i) => oxChip($('#dr'), f[0] + (i ? 40 : -96), f[1] - 20, '−1', MC));
// Na2O
const OB = [392, 430], NB = [[222, 470], [562, 470]];
const noSt = NB.map(n => { const l = stick(ds); attr(l, 'stroke-dasharray', '2 12'); setL(l, OB[0], OB[1], n[0], n[1]); return l; });
const oG2 = atomG(ds, 36, NC, 'O', 30); attr(oG2, 'transform', `translate(${OB[0]} ${OB[1]})`);
const nG = NB.map(n => { const g = atomG(ds, 32, HC, 'Na', 24); attr(g, 'transform', `translate(${n[0]} ${n[1]})`); return g; });
const naEl = NB.map(() => mk(ds, 'circle', { r: 8, fill: EC }));
const oxO2 = oxChip($('#dr'), OB[0] + 44, OB[1] - 82, '−2', MC), oxN = NB.map((n, i) => oxChip($('#dr'), n[0] + (i ? 40 : -96), n[1] - 20, '+1', PC));
const sumTag = [oxChip($('#dr'), 600, 70, '+2 − 2 = 0', C.ok), oxChip($('#dr'), 600, 330, '2(+1) − 2 = 0', C.ok)];
const th2 = PUC.think($('#th2'), { q: `Is oxygen's valency different in ${K('\\mathrm{OF_2}')} and ${K('\\mathrm{Na_2O}')}?`, opts: ['Same', 'Different'], right: 0, why: `Valency 2 in both. Only the oxidation state flips: ${K(P_('+2'))} and ${K(M_('-2'))}.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{OF_2}:\\ ${N_('O')} = ${P_('+2')} \\qquad \\mathrm{Na_2O}:\\ ${N_('O')} = ${M_('-2')}`);

/* ---------- W: Al2S3 ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${N_('Al')}:\\ \\text{group 13} \\Rightarrow \\text{valency } 3`)],
  [K(`${H_('S')}:\\ \\text{group 16} \\Rightarrow 8 - 6 = 2`)],
  [K(`2 \\times 3 = 3 \\times 2 = 6 \\;\\Rightarrow\\; ${N_('Al')}_2${H_('S')}_3`)],
  [K(`2(${P_('+3')}) + 3(${M_('-2')}) = 0 \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 92 });
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WY = 250, WX = [112, 252, 392, 532, 672], WK = ['S', 'Al', 'S', 'Al', 'S'];
// S=Al-S-Al=S : bonds [from, to, order]
const WBd = [[0, 1, 2], [1, 2, 1], [2, 3, 1], [3, 4, 2]];
const wStk = WBd.map(([a, c, n]) => Array.from({ length: n }, () => stick(ws)));
const wA = WK.map((k, i) => { const g = atomG(ws, k === 'Al' ? 38 : 34, k === 'Al' ? NC : HC, k, k === 'Al' ? 26 : 28); attr(g, 'transform', `translate(${WX[i]} ${WY})`); return g; });
const wOx = WK.map((k, i) => oxChip($('#wr'), WX[i] - 28, WY - 100, k === 'Al' ? '+3' : '−2', k === 'Al' ? PC : MC));
const wBc = WK.map((k, i) => txt(ws, WX[i], WY + 72, k === 'Al' ? '3 BONDS' : '2 BONDS', { 'text-anchor': 'middle', fill: k === 'Al' ? NC : HC, 'font-weight': 600, 'font-size': 17 }));
const wCnt = txt(ws, 392, 400, '', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 28 });
const tWb = [wt('W5', 'Balance'), wt('W5', 'Two') + 0.2, wt('W5', 'Three'), wt('W5', 'formula')];

/* ---------- C: variable valency + covalency ---------- */
const FR = [[`Phosphorus: 3 and 5`, 'P₄O₆ · P₄O₁₀', wt('C1', 'Some')], ['Most common in transition elements', 'LATER CHAPTERS', wt('C1', 'transition')], ['And in actinoids', 'LATER CHAPTERS', wt('C1', 'actinoids')]];
$('#frs').innerHTML = FR.map(([a, e], i) => `<div class="fr" id="fr${i}" style="top:${170 + i * 92}px">${a}<em style="margin-left:auto">${e}</em></div>`).join('');
const avA = PUC.avatar($('#cl'), { x: 36, y: 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So bonds and charge are two different counts?' });
const cs = $('#cS'), CX0 = 392, CY0 = 240, LR = 150;
const LG = [[-90, 'Cl'], [-30, 'w'], [30, 'w'], [90, 'w'], [150, 'w'], [210, 'w']];
const cSt = LG.map(() => stick(cs));
const cAl = atomG(cs, 40, NC, 'Al', 28); attr(cAl, 'transform', `translate(${CX0} ${CY0})`);
const cL = LG.map(([a, k]) => { const r = a * Math.PI / 180, x = CX0 + LR * Math.cos(r), y = CY0 + LR * Math.sin(r); const g = mk(cs, 'g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` });
  if (k === 'Cl') { mk(g, 'circle', { r: 34, fill: '#fff', stroke: HC, 'stroke-width': 3 }); txt(g, 0, 9, 'Cl⁻', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: HC, 'text-anchor': 'middle' }); }
  else { mk(g, 'rect', { x: -40, y: -24, width: 80, height: 48, rx: 24, fill: '#fff', stroke: C.dim, 'stroke-width': 3 }); txt(g, 0, 8, 'H₂O', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: C.ink2, 'text-anchor': 'middle' }); }
  return { g, x, y }; });
const cTag = document.createElement('div'); cTag.className = 'btag'; cTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#cp').appendChild(cTag);
$('#cF').innerHTML = K(`${N_('x')} + (${M_('-1')}) + 5(0) = +2 \\;\\Rightarrow\\; ${N_('x')} = ${P_('+3')}`);
const cIon = document.createElement('div'); cIon.className = 'fx'; cIon.style.cssText = 'left:36px;top:66px;font-size:30px'; cIon.innerHTML = K(`[${N_('Al')}\\mathrm{Cl(H_2O)_5}]^{2+}`); $('#cp').appendChild(cIon);
const tCb = LG.map((_, i) => wt('C3', 'six') + i * 0.12);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Oxygen is always ${K(M_('-2'))}`, right: `In ${K('\\mathrm{OF_2}')}, fluorine pulls harder, so oxygen is ${K(P_('+2'))}` });
$('#trap').insertAdjacentHTML('beforeend', `<div style="position:absolute;right:36px;top:84px;width:380px;display:flex;flex-direction:column;gap:14px">
  <div id="tm0" style="height:72px;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 24px Poppins">${K('\\mathrm{Na_2O}')}<b style="font:600 24px 'IBM Plex Mono';color:${MC}">O −2</b></div>
  <div id="tm1" style="height:72px;border-radius:12px;background:var(--okBg);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 24px Poppins">${K('\\mathrm{OF_2}')}<b style="font:600 24px 'IBM Plex Mono';color:${PC}">O +2</b></div></div>`);
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: `Two statement questions on ${K('\\mathrm{OF_2}')} and ${K('\\mathrm{Na_2O}')}, and formulas from group numbers` });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `Element X is in group 2 and element Y is in group 15. The most likely formula of their compound is:`, qW: 780,
  opts: [K('\\mathrm{XY}'), K('\\mathrm{X_2Y_3}'), K('\\mathrm{X_3Y_2}'), K('\\mathrm{XY_2}')], right: 2, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{X}: \\text{group 2} \\Rightarrow 2`)], [K(`\\mathrm{Y}: 8 - 5 = 3`)], [K(`3 \\times 2 = 2 \\times 3 = 6`)], [K(`\\textcolor{${C.ok}}{\\mathrm{X_3Y_2}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'B')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · valency and oxidation states', y0: 96, dy: 74, txt: [1, 0, 1, 0, 1],
  lines: ['<b>Valency</b> = valence electrons, or 8 minus them', K(`${N_('C')}${H_('H')}_4,\\ ${N_('N')}${H_('H')}_3,\\ ${H_('H')}_2${N_('O')},\\ ${H_('H')}${N_('F')}:\\ 4, 3, 2, 1`), '<b>Oxidation state</b>: charge when shared electrons go to the more electronegative atom', K(`\\mathrm{OF_2}:\\ ${N_('O')} = ${P_('+2')} \\qquad \\mathrm{Na_2O}:\\ ${N_('O')} = ${M_('-2')}`), '<b>Neutral compound</b>: oxidation states add to zero (Al₂S₃)'] });
const YQ = ['What formula does magnesium form with chlorine?', 'Why is oxygen +2 in OF₂, but -2 in Na₂O?', 'What is the difference between valency and oxidation state?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 36', topic: 'Why one map? Periodic Trends Across Periods and Down Groups', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('D3', 'fluorine') - 0.2, 1.1, 1360, 420], [T0('D5') - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(27 * 620 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rl').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(23 * 690 / q.scrollWidth) + 'px'; });
}
const hydIdx = t => tHy.reduce((a, tt, i) => t >= tt - 0.2 ? i : a, 0);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', ['oxygen', 'carbon', 'sodium'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'why') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('H4', 'combining')) / 0.3))); });
    M.vis($('#hTz'), t, wt('H5', 'plus') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    { const sh = M.spring(t - tP5 + 0.25, M.HEAVY); snap($('#pq'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    M.vis($('#mdef'), t, wt('P2', 'Valency') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : tP5; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP5 - 0.05, out, { dx: 60, dy: 0, ...o });
    const mv = M.io((t - wt('P5', 'gives') + 0.1) / 0.9), a0 = 0, ex = M.lerp(NAX + 112, CLX - 104, mv), ey = PY - 70 * Math.sin(Math.PI * mv);
    attr(naE, 'cx', ex.toFixed(1)); attr(naE, 'cy', ey.toFixed(1));
    naOut.style.opacity = (1 - 0.8 * mv).toFixed(3);
    fade(naL, t, tP5 + 0.3); fade(clL, t, T0('P6') - 0.1); fade(naV, t, wt('P5', 'valency') - 0.1); fade(clV, t, wt('P6', 'valency') - 0.1);
    M.vis(pTag, t, wt('P5', 'gives') - 0.1, 1e9, POP);
    PUC.write($('#hclF'), t, wt('P6', 'One') - 0.1, 0.6);
  }

  /* S: hydrides */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, tS1 + 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, T0('S6') - 0.2, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Is') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Silicon') });
    const k = hydIdx(t), [sym, ve, nh, fx, nm] = HYD[k], sw = M.io((t - tHy[k] + 0.2) / 0.3), sw0 = k ? 1 - M.io((t - tHy[k] + 0.45) / 0.25) : 0;
    M.setT(bNT, sym);
    bRing.forEach(r => { r.style.opacity = '1'; });
    // positions: electrons on the outer ring; first nh electrons point at the H directions (they pair), rest as lone pairs
    const pos = []; for (let i = 0; i < 4; i++) pos.push(DIRS[i]);
    const ePos = []; // [x,y] per electron
    for (let i = 0; i < ve; i++) { const sl = i % 4, second = i >= 4, a = DIRS[sl] + (second ? 0.22 : (ve > 4 && sl < ve - 4 ? -0.22 : 0)); ePos.push([BX + BR * Math.cos(a), BY + BR * Math.sin(a)]); }
    // which slots bond: for C all four; N: slots 1,2,3 bond (slot 0 lone pair); O: slots 2,3; F: slot 3
    const bondSlots = [[0, 1, 2, 3], [1, 2, 3], [2, 3], [3]][k];
    bE.forEach((d, i) => { const on = i < ve; M.hide(d, !on); if (on) { attr(d, 'cx', ePos[i][0].toFixed(1)); attr(d, 'cy', ePos[i][1].toFixed(1)); d.style.opacity = sw.toFixed(3); } });
    bH.forEach((g, j) => {
      const slot = bondSlots[j], on = slot != null;
      if (!on) { M.hide(g, true); M.hide(bSt[j], true); M.hide(bHe[j], true); return; }
      const tb = tHb[k][j] ?? tHb[k][tHb[k].length - 1], u = M.io((t - tb + 0.1) / 0.6), a = DIRS[slot];
      const fx0 = BX + 330 * Math.cos(a), fy0 = BY + 330 * Math.sin(a), fx1 = BX + HL * Math.cos(a), fy1 = BY + HL * Math.sin(a);
      const x = M.lerp(fx0, fx1, u), y = M.lerp(fy0, fy1, u);
      attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); g.style.opacity = M.clamp((t - tb + 0.2) / 0.2).toFixed(3); M.hide(g, t < tb - 0.2);
      const bu = M.io((t - tb - 0.45) / 0.35);
      setL(bSt[j], BX + 40 * Math.cos(a), BY + 40 * Math.sin(a), BX + (HL - 30) * Math.cos(a), BY + (HL - 30) * Math.sin(a), bu);
      // the H electron joins the central atom's electron: a shared pair on the stick
      const he = bHe[j], px = -Math.sin(a), py = Math.cos(a), mx = BX + (BR + 4) * Math.cos(a), my = BY + (BR + 4) * Math.sin(a);
      attr(he, 'cx', (M.lerp(x - 34 * Math.cos(a), mx + px * 9, bu)).toFixed(1)); attr(he, 'cy', (M.lerp(y - 34 * Math.sin(a), my + py * 9, bu)).toFixed(1)); M.hide(he, t < tb - 0.2); he.style.opacity = M.clamp((t - tb + 0.2) / 0.2).toFixed(3);
      const ce = bE[slot]; if (ce && bu > 0) { attr(ce, 'cx', (mx - px * 9).toFixed(1)); attr(ce, 'cy', (my - py * 9).toFixed(1)); attr(ce, 'fill', mix(HC, EC, bu)); } else if (ce) attr(ce, 'fill', HC);
    });
    bE.forEach((d, i) => { if (!bondSlots.includes(i)) attr(d, 'fill', HC); });
    $('#bF').innerHTML !== (geo['bf' + k] || '') && ($('#bF').innerHTML = geo['bf' + k] = K(fx));
    PUC.write($('#bF'), t, tHb[k][tHb[k].length - 1] + 0.5, 0.5, k < 3 ? tHy[k + 1] - 0.3 : 1e9, 0.2);
    M.setT(btag, `${sym} · ${ve} VALENCE e⁻ · ${nh} H · ${nm}`); M.vis(btag, t, tS1 + 0.4, 1e9, POP);
    // valence table: columns light as they are met; second values at B1
    VG.forEach((g, i) => { const u = M.io((t - tVg[i] + 0.1) / 0.3), curC = i >= 3 && i <= 6 && i - 3 === k && t < T0('S6');
      ['vg', 've', 'vv'].forEach((p, r) => { const el = $('#' + p + i); setBg(el, mix(C.soft, curC ? NC : r === 2 ? C.ac2 : '#E3E6EC', u)); el.style.color = mix(C.dim, curC ? '#fff' : C.ink, u); });
      const v2 = $('#vv' + i).querySelector('.v2'); v2.style.opacity = M.clamp((t - wt('B1', 'all') + 0.1) / 0.3).toFixed(3); });
    RL.forEach((r, i) => M.vis($('#rl' + i), t, r[2] - 0.1, 1e9, { dx: -16, dy: 0 }));
    avD(t, wt('S6', 'one') + 0.2, z);
  }

  /* D: oxidation state */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('B4');
    M.vis($('#dl'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.2, z, { dx: 60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#th2'), t, tB4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tB4, tOpts: wt('B4', 'Is') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'In') });
    // OF2: pairs on each O-F bond slide to F at "wins"
    const sl = M.io((t - wt('D3', 'wins') + 0.1) / 0.8);
    FA.forEach((f, i) => { const s0 = 0.5, s = M.lerp(s0, 0.78, sl), x = M.lerp(OA[0], f[0], s), y = M.lerp(OA[1], f[1], s), dx = f[0] - OA[0], dy = f[1] - OA[1], L = Math.hypot(dx, dy), px = -dy / L, py = dx / L;
      ofE[i].forEach((d, k) => { attr(d, 'cx', (x + px * (k ? 9 : -9)).toFixed(1)); attr(d, 'cy', (y + py * (k ? 9 : -9)).toFixed(1)); }); });
    fade(enO, t, wt('D3', 'oxygen') - 0.1); enF.forEach(e => fade(e, t, wt('D3', 'fluorine') - 0.1));
    oxF.forEach((c, i) => M.vis(c, t, wt('D4', 'minus') - 0.1 + i * 0.12, 1e9, POP)); M.vis(oxO1, t, wt('D4', 'plus') - 0.1, 1e9, POP);
    // Na2O: each Na's electron moves to O
    NB.forEach((n, i) => { const u = M.io((t - wt('D5', 'takes') - i * 0.2) / 0.8), x = M.lerp(n[0] + (i ? -36 : 36), OB[0] + (i ? 44 : -44), u), y = M.lerp(n[1] - 20, OB[1] - 10 + i * 20, u) - 30 * Math.sin(Math.PI * u); attr(naEl[i], 'cx', x.toFixed(1)); attr(naEl[i], 'cy', y.toFixed(1)); });
    M.vis(oxO2, t, wt('D5', 'minus') - 0.1, 1e9, POP); oxN.forEach((c, i) => M.vis(c, t, wt('D5', 'plus') - 0.1 + i * 0.12, 1e9, POP));
    sumTag.forEach((c, i) => M.vis(c, t, wt('D6', 'zero') - 0.1 + i * 0.2, 1e9, POP));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Valency') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Oxidation') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'decided') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wA.forEach((g, i) => { const u = M.clamp((t - (WK[i] === 'Al' ? T0('W3') : T0('W4')) - 0.1 * i) / 0.3); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0); fade(wBc[i], t, (WK[i] === 'Al' ? wt('W3', 'valency') : wt('W4', 'valency'))); });
    WBd.forEach(([a, c, n], j) => { const u = M.io((t - tWb[j] - 0.1) / 0.4); wStk[j].forEach((l, k) => { const off = (k - (n - 1) / 2) * 16; setL(l, WX[a] + 34, WY + off, WX[c] - 34, WY + off, u); }); });
    wOx.forEach((c, i) => M.vis(c, t, wt('W6', WK[i] === 'Al' ? 'Aluminium' : 'Sulphur') - 0.1 + i * 0.06, 1e9, POP));
    M.setT(wCnt, t >= wt('W6', 'total') ? '2(+3) + 3(−2) = 0' : 'Al: 2 × 3 = 6   ·   S: 3 × 2 = 6'); fade(wCnt, t, wt('W5', 'six') - 0.1);
    attr(wCnt, 'fill', t >= wt('W6', 'total') ? C.ok : C.ink);
    M.setT($('#wGp'), 'Al₂S₃'); M.vis($('#wGp'), t, wt('W5', 'formula') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    FR.forEach((f, i) => M.vis($('#fr' + i), t, f[2] - 0.1, 1e9, { dy: 14 }));
    M.vis($('#cp'), t, T0('C2') - 0.05, out, { dx: 60, dy: 0, ...o });
    M.vis(cIon, t, wt('C2', 'aluminium') - 0.1, 1e9, { dy: 10 });
    const lin = M.clamp((t - wt('C2', 'chloride') + 0.1) / 0.3), win = M.clamp((t - wt('C2', 'water') + 0.1) / 0.3);
    cAl.style.opacity = M.clamp((t - wt('C2', 'aluminium')) / 0.3).toFixed(3);
    cL.forEach((l, i) => { const u = i ? win : lin; l.g.style.opacity = u.toFixed(3); M.hide(l.g, u <= 0);
      const bu = M.io((t - tCb[i]) / 0.3), a = LG[i][0] * Math.PI / 180; setL(cSt[i], CX0 + 44 * Math.cos(a), CY0 + 44 * Math.sin(a), l.x - 38 * Math.cos(a), l.y - 38 * Math.sin(a), bu); });
    const nb = tCb.filter(tt => t >= tt).length;
    M.setT(cTag, t >= T0('C4') ? 'OXIDATION STATE +3' : `COVALENCY ${nb}`); M.vis(cTag, t, tCb[0] - 0.1, 1e9, POP);
    setBg(cTag, t >= T0('C4') ? PC : C.ink);
    PUC.write($('#cF'), t, wt('C4', 'Water') - 0.1, 1.2);
    avA(t, wt('C4', 'gives') + 0.3, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'always') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'fluorine') - 0.1 });
    M.vis($('#tm0'), t, wt('X2', 'minus') - 0.1, 1e9, { dx: 20, dy: 0 }); M.vis($('#tm1'), t, wt('X3', 'plus') - 0.1, 1e9, { dx: 20, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE')], tType: wt('E1', 'oxygen') });
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
