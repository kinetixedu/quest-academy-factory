// PUC Chemistry Ep 14: Discovery of electrons, protons and neutrons (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, table, recap): electron e- orange, proton p+ teal, neutron n ink, alpha particles violet, oil drops gold
const PC = C.ac, EC = '#C8461B', NC = C.ink, AC = C.violet, GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const E_ = s => `\\textcolor{${EC}}{${s}}`, P_ = s => `\\textcolor{${PC}}{${s}}`, N_ = s => `\\textcolor{${NC}}{${s}}`;
const eS = E_('e'), me = `m_{${E_('e')}}`;

Object.assign(M.IC, {
  comb: ['M3 7h18v4H3z', 'M5 11v7', 'M8 11v7', 'M11 11v7', 'M14 11v7', 'M17 11v7', 'M20 11v5'],
  sign: ['M3 5h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'M7 13V9l3 4V9', 'M14 9v4h3', 'M8 17v3', 'M16 17v3'],
  atom: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M20.2 20.2c2-2-.2-7.6-4.9-12.3C10.6 3.2 5 1 3 3s.2 7.6 4.9 12.3c4.7 4.7 10.3 6.9 12.3 4.9Z', 'M15.7 15.7c4.7-4.7 6.9-10.3 4.9-12.3S13 3.6 8.3 8.3c-4.7 4.7-6.9 10.3-4.9 12.3s7.6-.2 12.3-4.9Z'],
  paper: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M8 13h8', 'M8 17h5'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tR1 = T0('R1'), tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tC1 = T0('C1');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three surprises ---------- */
const JOBS = [['sign', 'Neon sign', 'GLOWING GAS', 'neon', 'ELECTRONS HIT GAS'], ['comb', 'Comb', 'LIFTS PAPER', 'comb', 'ELECTRONS MOVE'], ['zap', 'Door handle', 'A TINY SPARK', 'spark', 'ELECTRONS JUMP']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${el}</span><div class="pe">e⁻</div></div></div>`).join('');
const KIT = [['comb', 'Comb', 'combs'], ['paper', 'Torn paper', 'paper'], ['zap', 'Charge moved', 'moved']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'combs'), wt('H3', 'paper'), wt('H4', 'moved')];

/* ---------- P: three particles + how they were caught ---------- */
$('#mdefI').innerHTML = M.icon('atom', 28, '#fff', 2);
const QR = [['e⁻', 'Electron', 'CHARGE · NEGATIVE', '−1', EC, wt('P3', 'electron')], ['p⁺', 'Proton', 'CHARGE · POSITIVE', '+1', PC, wt('P3', 'proton')], ['n', 'Neutron', 'CHARGE · NONE, NEUTRAL', '0', NC, wt('P4', 'neutron')]];
$('#qrs').innerHTML = QR.map(([s, n, c, v, col], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 126}px"><div class="pb" style="background:${col}">${s}</div><div class="qt">${n}</div><div class="qs">${c}</div><div class="qk" style="color:${col}">${v}</div></div>`).join('');
const TL = [['1886 · CANAL RAYS', 'Eugen Goldstein', 'POSITIVE RAYS', PC, 'scientists'], ['1897 · CATHODE RAYS', 'J. J. Thomson', 'ELECTRON, e/m', EC, 'caught'], ['1906-14 · OIL DROPS', 'R. A. Millikan', 'CHARGE e', GC, 'clever'], ['1932 · BERYLLIUM', 'James Chadwick', 'NEUTRON', NC, 'watched']];
{ const host = $('#pw'); TL.forEach(([y, n, w, col], i) => host.insertAdjacentHTML('beforeend', `<div class="sci" id="tl${i}" style="top:${84 + i * 116}px;height:100px"><div class="sy" style="top:16px;color:${col}">${y}</div><div class="sn" style="top:42px;font-size:32px">${n}</div><div class="sw" style="top:50px">${w}</div></div>`)); }
const tTl = TL.map(r => wt('P5', r[4]));

/* ---------- S: the discharge tube ---------- */
const b = $('#bS'), CY = 230;
const tube = mk(b, 'rect', { x: 40, y: 120, width: 704, height: 220, rx: 40, fill: '#F3F7F8', stroke: C.ink, 'stroke-width': 3 });
const coat = mk(b, 'path', { d: 'M736 150 V310', stroke: '#BFE3C9', 'stroke-width': 10, 'stroke-linecap': 'round', fill: 'none' });
const coatL = mk(b, 'path', { d: 'M48 150 V310', stroke: '#BFE3C9', 'stroke-width': 10, 'stroke-linecap': 'round', fill: 'none' });
// wires + high voltage box
const wire = mk(b, 'path', { d: 'M190 160 V87 H165 M325 87 H300 V160', stroke: C.ink2, 'stroke-width': 3, fill: 'none' });
const hv = mk(b, 'g', {}); mk(hv, 'rect', { x: 165, y: 70, width: 160, height: 34, rx: 8, fill: C.ink }); txt(hv, 245, 93, 'HIGH VOLTAGE', { 'text-anchor': 'middle', 'font-size': 15, fill: '#fff', 'font-weight': 600 });
// electrodes
const cath = mk(b, 'rect', { x: 184, y: 160, width: 12, height: 140, rx: 3, fill: C.ink });
const holes = [200, 230, 260].map(y => mk(b, 'rect', { x: 182, y: y - 6, width: 16, height: 12, fill: '#F3F7F8' }));
const anode = [mk(b, 'rect', { x: 294, y: 160, width: 12, height: 58, rx: 3, fill: C.ink2 }), mk(b, 'rect', { x: 294, y: 242, width: 12, height: 58, rx: 3, fill: C.ink2 })];
const sgn = (p, x, y, s) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 2 }); txt(g, x, y + 6, s, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 700 }); return g; };
const elLab = [txt(b, 190, 366, 'CATHODE −', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 }), txt(b, 300, 366, 'ANODE +', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 }), txt(b, 690, 366, 'ZnS COATING', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 })];
// deflection plates (right: for cathode rays, left: for canal rays). top plate +, bottom plate -
const plates = (x1, x2) => { const g = mk(b, 'g', {}); mk(g, 'rect', { x: x1, y: 172, width: x2 - x1, height: 8, rx: 3, fill: C.ink2 }); mk(g, 'rect', { x: x1, y: 280, width: x2 - x1, height: 8, rx: 3, fill: C.ink2 }); sgn(g, x1 - 22, 176, '+'); sgn(g, x1 - 22, 284, '−'); return g; };
const plR = plates(420, 570), plL = plates(96, 160);
// electrons (cathode rays) and canal rays as moving dots
const EK = 7.94e-4, defE = x => x < 420 ? 0 : x < 570 ? EK * (x - 420) ** 2 : EK * (150 * 150 + 300 * (x - 570));
const PK = 0.0049, defP = x => x > 160 ? 0 : x > 96 ? PK * (160 - x) ** 2 : PK * (64 * 64 + 128 * (96 - x));
const NE = 16, LE = 536, VE = 300, ed = Array.from({ length: NE }, () => mk(b, 'circle', { r: 6, fill: EC }));
const NP = 9, LP = 250, VP = 150, pd = Array.from({ length: NP }, () => mk(b, 'circle', { r: 7, fill: PC }));
const glow = mk(b, 'circle', { cx: 736, cy: CY, r: 15, fill: '#9BD7AE' }), glowL = mk(b, 'circle', { cx: 48, cy: CY, r: 13, fill: '#9BD7AE' });
// readout chips under the tube
{ const host = $('#bn'); [['ch0', 'PRESSURE · VERY LOW'], ['ch1', 'VOLTAGE · VERY HIGH'], ['ch2', 'GAS · ANY']].forEach(([id, s], i) => host.insertAdjacentHTML('beforeend', `<div class="btag" id="${id}" style="left:${36 + i * 248}px;top:396px;background:var(--soft);color:var(--ink)">${s}</div>`)); }
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const avD = PUC.avatar($('#bnIn'), { x: 36, y: 462, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my comb pulled electrons off my hair!' });
const tOnE = wt('S3', 'ray') - 0.1, tGlow = wt('S4', 'glows') - 0.3, tFld = wt('S5', 'bends') - 0.2, tHole = wt('R1', 'holes'), tOnP = wt('R2', 'streams') - 0.2, tFldP = wt('R2', 'bend') - 0.2;
// link-by-link card: cathode rays, then canal rays
const LK = [
  [['Ray leaves the cathode (−)', 'STARTS AT −', wt('S3', 'leaves')], ['Travels in a straight line', 'STRAIGHT', wt('S3', 'straight')], ['Bends towards the + plate', 'NEGATIVE', wt('S5', 'bends')], ['Same for any metal or gas', 'IN ALL ATOMS', wt('S6', 'same')]],
  [['Streams the other way, through holes', 'OPPOSITE WAY', wt('R2', 'streams')], ['Bends towards the − plate', 'POSITIVE', wt('R2', 'bend')], ['Changes when the gas changes', 'DEPENDS ON GAS', wt('R3', 'Change')], ['Lightest one comes from hydrogen', 'PROTON', wt('R3', 'lightest')]]];
$('#lks').innerHTML = LK.map((set, s) => `<div id="lset${s}" class="abs" style="left:0;top:0;width:784px;height:580px">${set.map(([l, r], i) => `<div class="lk" id="lk${s}_${i}" style="top:${78 + i * 98}px;height:88px"><div class="tg">LINK ${i + 1}</div><div class="lt">${l}</div><div class="lr" id="lr${s}_${i}">${r}</div></div>`).join('')}
  <div class="lkC" id="lkC${s}" style="background:${s ? PC : EC}">${s ? 'Canal rays carry protons, p⁺' : 'Cathode rays are electrons, e⁻'}</div></div>`).join('');
const tLkC = [wt('S6', 'electrons'), wt('R3', 'proton')];
// side by side
const CMP = [['Cathode rays', EC, [['CHARGE', 'Negative, −'], ['STARTS AT', 'The cathode'], ['ANOTHER GAS?', 'No change'], ['THE PARTICLE', 'Electron, e⁻']]], ['Canal rays', PC, [['CHARGE', 'Positive, +'], ['MOVES TOWARDS', 'The cathode'], ['ANOTHER GAS?', 'They change'], ['LIGHTEST ONE', 'Proton, p⁺ (hydrogen)']]]];
$('#cmps').innerHTML = CMP.map(([h, col, rows], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ch" style="color:${col}">${h}</div>${rows.map(([k, v], j) => `<div class="cr2" id="cr${i}_${j}" style="top:${108 + j * 86}px"><b>${k}</b><span>${v}</span></div>`).join('')}</div>`).join('');
const tCm = [wt('B1', 'Cathode'), wt('B1', 'Canal')];
const th1 = PUC.think($('#th1'), { q: 'Why do canal rays change with the gas, but cathode rays do not?', opts: ['Canal rays are leftover gas atoms', 'Canal rays move faster'], right: 0, why: 'Canal rays are gas atoms that lost electrons. Electrons are the same in every atom.' });

/* ---------- D: mass of the electron ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`\\frac{${eS}}{${me}} = 1.758820 \\times 10^{11}\\,\\text{C kg}^{-1}`)],
  [K(`${eS} = 1.602176 \\times 10^{-19}\\,\\text{C}`)],
  [K(`${me} = ${eS} \\div \\frac{${eS}}{${me}}`)],
  [K(`${me} = \\frac{1.602176 \\times 10^{-19}}{1.758820 \\times 10^{11}} = 9.109 \\times 10^{-31}\\,\\text{kg}`)]], { label: 'MASS OF THE ELECTRON', y0: 110, dy: 112 });
const tDs = [wt('D2', 'gave'), wt('D3', 'is'), wt('D4', 'So'), wt('D5', 'm')];
const SCI = [['1897 · CATHODE RAYS BENT', 'J. J. Thomson', 'MEASURED e/m', EC], ['1906-14 · OIL DROP EXPERIMENT', 'R. A. Millikan', 'MEASURED e', GC]];
$('#scis').innerHTML = SCI.map(([y, n, w, col], i) => `<div class="sci" id="sc${i}" style="top:${84 + i * 140}px"><div class="sy" style="color:${col}">${y}</div><div class="sn">${n}</div><div class="sw">${w}</div></div>`).join('');
$('#mresV').innerHTML = K(`m_{\\textcolor{#F2B39B}{e}} = 9.109 \\times 10^{-31}\\,\\text{kg}`);
const tSc = [T0('D2'), wt('D3', 'Millikan')];

/* ---------- C: neutron + table ---------- */
const cs = $('#cS');
const src = mk(cs, 'g', {}); mk(src, 'rect', { x: 36, y: 180, width: 110, height: 100, rx: 12, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 }); txt(src, 91, 236, 'α SOURCE', { 'text-anchor': 'middle', 'font-size': 16, fill: AC, 'font-weight': 600 });
const be = mk(cs, 'g', {}); mk(be, 'rect', { x: 300, y: 140, width: 18, height: 180, rx: 4, fill: '#8C93A3' }); txt(be, 309, 350, 'BERYLLIUM', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 });
const cpl = mk(cs, 'g', {}); mk(cpl, 'rect', { x: 460, y: 176, width: 170, height: 8, rx: 3, fill: C.ink2 }); mk(cpl, 'rect', { x: 460, y: 276, width: 170, height: 8, rx: 3, fill: C.ink2 }); sgn(cpl, 438, 180, '+'); sgn(cpl, 438, 280, '−');
const NA = 6, LA = 154, VA = 170, ad = Array.from({ length: NA }, () => { const g = mk(cs, 'g', {}); mk(g, 'circle', { r: 11, fill: AC }); txt(g, 0, 5, 'α', { 'text-anchor': 'middle', 'font-size': 15, fill: '#fff', 'font-weight': 700 }); return g; });
const NN = 7, LN = 420, VN = 220, nd = Array.from({ length: NN }, () => { const g = mk(cs, 'g', {}); mk(g, 'circle', { r: 11, fill: NC }); txt(g, 0, 5, 'n', { 'text-anchor': 'middle', 'font-size': 15, fill: '#fff', 'font-weight': 700 }); return g; });
const noB = txt(cs, 545, 240, 'NO BEND', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 700 });
{ const host = $('#cl'); [['cc0', 'CHARGE · 0'], ['cc1', 'MASS · SLIGHTLY MORE THAN p⁺']].forEach(([id, s], i) => host.insertAdjacentHTML('beforeend', `<div class="btag" id="${id}" style="left:${36 + i * 200}px;top:420px;background:var(--soft);color:var(--ink)">${s}</div>`)); }
const avA = PUC.avatar($('#cl'), { x: 36, y: 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A particle that ignores the field!' });
const TB = [['e⁻', 'Electron', 'CHARGE −1', '9.109 × 10⁻³¹', '0.00054', EC], ['p⁺', 'Proton', 'CHARGE +1', '1.673 × 10⁻²⁷', '1.00727', PC], ['n', 'Neutron', 'CHARGE 0', '1.675 × 10⁻²⁷', '1.00867', NC]];
$('#tbs').innerHTML = TB.map(([s, n, c, k, u, col], i) => `<div class="tb" id="tb${i}" style="top:${132 + i * 108}px"><div class="pb" style="background:${col}">${s}</div><div class="tn">${n}</div><div class="tc">${c}</div><div class="tk">${k}</div><div class="tu" style="color:${col}">${u}</div></div>`).join('') + `<div class="pillp ac" id="tbP" style="left:36px;top:470px">Proton ≈ 1836 × electron mass</div>`;
const tAl = wt('C1', 'fired'), tNo = wt('C2', 'Out'), tTb = [wt('C3', 'electron'), wt('C3', 'proton'), wt('C3', 'neutron')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${E_('e^-')} \\quad ${P_('p^+')} \\quad ${N_('n^0')}`);

/* ---------- W: oil drops ---------- */
$('#wq').innerHTML = `Charges on three oil drops, in 10<sup>−19</sup> C: <span class="mono">−3.204, −4.806, −8.010</span>. How many electrons on each?`;
const wsol = PUC.solution($('#wl'), [
  [K(`3.204 \\div 1.602 = ${E_('2')}`)], [K(`4.806 \\div 1.602 = ${E_('3')}`)], [K(`8.010 \\div 1.602 = ${E_('5')}`)],
  [K(`q = n\\,${eS}, \\quad n = 1, 2, 3, \\ldots`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 78 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W4', 'Divide'), wt('W5', 'two'), wt('W5', 'five'), wt('W6', 'packets')];
const s2 = $('#wS2');
mk(s2, 'rect', { x: 110, y: 110, width: 564, height: 10, rx: 4, fill: C.ink2 }); mk(s2, 'rect', { x: 110, y: 420, width: 564, height: 10, rx: 4, fill: C.ink2 });
sgn(s2, 86, 115, '+'); sgn(s2, 86, 425, '−');
const DR = [[220, '−3.204', 2], [392, '−4.806', 3], [564, '−8.010', 5]];
const drops = DR.map(([x, q, n], i) => { const g = mk(s2, 'g', {}); mk(g, 'circle', { r: 40, fill: '#F6EBD3', stroke: GC, 'stroke-width': 3 });
  const el = Array.from({ length: n }, (_, k) => mk(g, 'circle', { cx: (20 * Math.cos(k * 2 * Math.PI / n - Math.PI / 2)).toFixed(1), cy: (20 * Math.sin(k * 2 * Math.PI / n - Math.PI / 2)).toFixed(1), r: 6, fill: EC }));
  const ql = txt(g, 0, -60, q, { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
  const nl = txt(g, 0, 82, `n = ${n}`, { 'text-anchor': 'middle', 'font-size': 26, fill: EC, 'font-weight': 700 }); return { g, el, ql, nl, x }; });
const tDrop = [wt('W3', 'three'), wt('W3', 'four', 1), wt('W3', 'eight', 1)], tN5 = [wt('W5', 'two'), wt('W5', 'three'), wt('W5', 'five')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Equal charge, so ${K(P_('p^+'))} and ${K(E_('e^-'))} have equal mass`, right: `Equal size of charge, but ${K(`m_{${P_('p')}} \\approx 1836\\, m_{${E_('e')}}`)}` });
const tsv = $('#tS');
const sees = mk(tsv, 'g', {});
mk(sees, 'path', { d: 'M280 200 L256 236 H304 Z', fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 });
const beamT = mk(sees, 'g', { transform: 'translate(280 200) rotate(-14)' }); mk(beamT, 'rect', { x: -200, y: -6, width: 400, height: 12, rx: 6, fill: C.ink });
mk(beamT, 'circle', { cx: -150, cy: -46, r: 40, fill: PC }); txt(beamT, -150, -38, 'p⁺', { 'text-anchor': 'middle', 'font-size': 24, fill: '#fff', 'font-weight': 700, 'font-family': 'Poppins' });
mk(beamT, 'circle', { cx: 170, cy: -14, r: 7, fill: EC }); txt(beamT, 170, -32, 'e⁻', { 'text-anchor': 'middle', 'font-size': 18, fill: EC, 'font-weight': 700, 'font-family': 'Poppins' });
txt(sees, 280, 262, '≈ 1836 TIMES HEAVIER', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'One mark: who found which particle · short numericals on e, mₑ and e/m' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `What is the total mass of the electrons that carry a charge of −1 C?<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: e = 1.602 × 10⁻¹⁹ C, mₑ = 9.109 × 10⁻³¹ kg</span>`, qW: 780,
  opts: [K('1.76 \\times 10^{11}\\,\\text{kg}'), K('5.69 \\times 10^{-12}\\,\\text{kg}'), K('1.46 \\times 10^{-49}\\,\\text{kg}'), K('6.24 \\times 10^{18}\\,\\text{kg}')], right: 1, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`n = \\frac{1\\,\\text{C}}{1.602 \\times 10^{-19}\\,\\text{C}} = 6.24 \\times 10^{18}`)], [K(`m = n \\times ${me}`)], [K(`= 6.24 \\times 10^{18} \\times 9.109 \\times 10^{-31}`)], [K(`= \\textcolor{${C.ok}}{5.69 \\times 10^{-12}\\,\\text{kg}}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'Multiply'), wt('A3', 'nine'), wt('A4', 'That')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · electrons, protons and neutrons', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${me} = ${eS} \\div \\frac{${eS}}{${me}} = 9.109 \\times 10^{-31}\\,\\text{kg}`), `<b class="e">Electron e⁻</b>: cathode rays, bend to the + plate · Thomson, 1897`, `<b class="n">Proton p⁺</b>: canal rays, lightest from hydrogen · about 1836 × mₑ`, '<b>Neutron n</b>: no charge, mass slightly more than p⁺ · Chadwick, 1932', `<b class="g">Charge</b> comes in whole packets of e = 1.602 × 10⁻¹⁹ C · Millikan`] });
const YQ = ['Which ray bends towards the positive plate, and why?', 'Who discovered the neutron, and how?', 'Why does finding the mass of an electron need two experiments?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 15', topic: 'Solid ball or empty space? Thomson, Rutherford and Bohr Models', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tGlow + 0.1, 1.12, 820, 500], [tFld - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  let cx = 36; ['ch0', 'ch1', 'ch2'].forEach(id => { const e = $('#' + id); e.style.left = cx + 'px'; cx += e.offsetWidth + 12; });
  let dx = 36; ['cc0', 'cc1'].forEach(id => { const e = $('#' + id); e.style.left = dx + 'px'; dx += e.offsetWidth + 12; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.lk .lt').forEach(l => { const r = l.parentNode.querySelector('.lr'); const room = 712 - 20 - 24 - r.offsetWidth - 20; if (l.offsetWidth > room) l.style.fontSize = Math.floor(27 * room / l.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
// a stream of dots moving at constant speed: s along the path, the front grows from 0
const stream = (dots, t, t0, L, v, n, place, tOff = 1e9) => dots.forEach((d, i) => {
  const run = t - t0; if (run < 0 || t > tOff) { M.hide(d, true); return; }
  const s = (run * v + i * L / n) % L; const front = run * v;
  const on = s <= front + 1; M.hide(d, !on); if (on) place(d, s);
});

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'particle') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'behind') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'smaller') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'three') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P2', 'Three') - 0.1, 1e9, POP);
    QR.forEach((q, i) => { const el = $('#qr' + i); M.vis(el, t, q[5] - 0.15, 1e9, { dy: 16 }); const nx2 = i < 2 ? QR[i + 1][5] : wt('P4', 'neutral') + 0.6; const on = M.io((t - q[5]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P5') - 0.1, out, { dx: 60, dy: 0, ...o });
    TL.forEach((_, i) => M.vis($('#tl' + i), t, tTl[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
  }

  /* S + R + B: the tube, links, side by side, think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const zB = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, zB, { dy: 36, ...o });
    { const sh = M.spring(t - wt('S3', 'Switch') + 0.3, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#lk'), t, wt('S3', 'Switch') + 0.1, zB, { dx: 60, dy: 0, ...o });
    // tube parts
    const tIn = tS1 + 0.3;
    fade(tube, t, tIn); fade(coat, t, wt('S4', 'zinc') - 0.2); fade(coatL, t, tHole + 0.4);
    fade(cath, t, wt('S2', 'cathode') - 0.15); anode.forEach(a => fade(a, t, wt('S2', 'anode') - 0.15)); fade(elLab[0], t, wt('S2', 'cathode')); fade(elLab[1], t, wt('S2', 'anode')); fade(elLab[2], t, wt('S4', 'zinc'));
    M.draw(wire, t, wt('S3', 'Switch') - 0.2, 0.5); fade(hv, t, wt('S3', 'voltage') - 0.2);
    holes.forEach((h, i) => fade(h, t, tHole + i * 0.12, 1e9, 0.2));
    fade(plR, t, wt('S5', 'add') - 0.1); fade(plL, t, wt('R2', 'bend') - 0.4);
    const fE = M.io((t - tFld) / 0.6), fP = M.io((t - tFldP) / 0.6);
    stream(ed, t, tOnE, LE, VE, NE, (d, s) => { const x = 196 + s; attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', (CY - fE * defE(x)).toFixed(1)); d.style.opacity = (x > 728 ? 0 : t > tHole && t < tB1 ? 0.45 : 1); });
    stream(pd, t, tOnP, LP, VP, NP, (d, s) => { const x = 300 - s; attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', (CY + fP * defP(x)).toFixed(1)); d.style.opacity = x < 54 ? 0 : 1; });
    const gy = CY - fE * defE(736); attr(glow, 'cy', gy.toFixed(1)); fade(glow, t, tGlow, 1e9, 0.2);
    attr(glowL, 'cy', (CY + fP * defP(48)).toFixed(1)); fade(glowL, t, tOnP + 250 / VP - 0.1, 1e9, 0.2);
    // chips
    M.vis($('#ch0'), t, wt('S1', 'pumped') - 0.1, 1e9, POP); M.vis($('#ch1'), t, wt('S3', 'voltage') - 0.1, 1e9, POP); M.vis($('#ch2'), t, wt('S6', 'gas') - 0.1, 1e9, POP);
    M.setT($('#ch2'), t < wt('R3', 'gas') ? 'GAS · ANY' : 'GAS · HYDROGEN'); setBg($('#ch2'), mix(C.soft, C.ac2, M.io((t - wt('R3', 'hydrogen') + 0.1) / 0.3)));
    const dOn = t >= wt('S6', 'electrons') + 0.3 && t < tR1 - 0.2;
    ['ch0', 'ch1', 'ch2'].forEach(id => { $('#' + id).style.visibility = dOn ? 'hidden' : $('#' + id).style.visibility; });
    avD(t, wt('S6', 'electrons') + 0.3, tR1 - 0.2);
    // bench tag
    const TAG = [[wt('S1', 'glass'), 'GLASS TUBE · LOW PRESSURE'], [wt('S3', 'ray'), 'RAY: CATHODE → ANODE'], [wt('S4', 'glows'), 'ZnS GLOWS WHERE HIT'], [wt('S5', 'bends'), 'BENDS TO +'], [wt('S6', 'electrons'), 'e⁻ · ELECTRONS'], [tHole, 'HOLES IN THE CATHODE'], [wt('R2', 'bend'), 'BENDS TO −'], [wt('R3', 'hydrogen'), 'p⁺ · PROTON']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    // link card
    M.setT($('#lkL'), t < tR1 ? 'CATHODE RAYS · LINK BY LINK' : 'CANAL RAYS · LINK BY LINK');
    LK.forEach((set, s) => {
      const sv = M.vis($('#lset' + s), t, s ? tR1 : 0, s ? 1e9 : tR1 - 0.1, { dy: s ? 20 : 0, outDur: 0.25, ody: -12 });
      set.forEach(([, , tt], i) => { const el = $(`#lk${s}_${i}`); M.vis(el, t, tt - 0.1, 1e9, { dx: -16, dy: 0 }); const on = M.io((t - tt) / 0.25) * (1 - M.io((t - (i < 3 ? set[i + 1][2] : tLkC[s]) + 0.1) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
      M.vis($('#lkC' + s), t, tLkC[s] - 0.1, 1e9, POP);
    });
    // side by side + think
    M.vis($('#cmpC'), t, tB1 + 0.05, OUT('B2'), { dy: 36, ...o });
    CMP.forEach((c, i) => { M.vis($('#cm' + i), t, tCm[i] - 0.15, 1e9, { dy: 16 }); c[2].forEach((_, j) => M.vis($(`#cr${i}_${j}`), t, tCm[i] + 0.15 + j * 0.3, 1e9, { dx: -12, dy: 0 })); });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'cathode') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Each') });
  }

  /* D: mass of the electron */
  const dOnS = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOnS);
  if (dOnS) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, T0('D2') - 0.1, out, { dx: 60, dy: 0, ...o });
    SCI.forEach((_, i) => { const el = $('#sc' + i); M.vis(el, t, tSc[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const on = M.io((t - tSc[i]) / 0.25) * (i ? 1 - M.io((t - T0('D4')) / 0.3) : 1 - M.io((t - tSc[1]) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#mres'), t, tDs[3] + 0.3, 1e9, { dy: 20 });
    PUC.write($('#mresV'), t, tDs[3] + 0.5, 0.7);
  }

  /* C: neutron + table */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dy: 36, ...o });
    { const sh = M.spring(t - tTb[0] + 0.6, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#cl'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); attr(cs, 'style', `position:absolute;top:0;left:${sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)}px`); }
    fade(src, t, wt('C1', 'alpha') - 0.2); fade(be, t, wt('C1', 'beryllium') - 0.2); fade(cpl, t, wt('C2', 'field') - 0.2);
    stream(ad, t, tAl, LA, VA, NA, (g, s) => { const x = 146 + s; attr(g, 'transform', `translate(${x.toFixed(1)} 230)`); g.style.opacity = x > 290 ? 0 : 1; });
    stream(nd, t, tNo - 0.2, LN, VN, NN, (g, s) => { const x = 318 + s; attr(g, 'transform', `translate(${x.toFixed(1)} 230)`); g.style.opacity = x > 730 ? 0 : 1; });
    fade(noB, t, wt('C2', 'bend') - 0.1);
    attr(noB, 'y', 214);
    M.vis($('#cc0'), t, wt('C2', 'charge') - 0.1, 1e9, POP); M.vis($('#cc1'), t, wt('C2', 'heavier') - 0.1, 1e9, POP);
    avA(t, wt('C2', 'Neutrons') + 0.2, tTb[0] - 0.6);
    M.vis($('#cr'), t, tTb[0] - 0.3, out, { dx: 60, dy: 0, ...o });
    TB.forEach((_, i) => M.vis($('#tb' + i), t, tTb[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#tbP'), t, wt('C3', 'one') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Every') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'built') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'three') + 0.2, 0.8);
  }

  /* W: oil drops */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wGh'), t, T0('W2') + 0.5, 1e9, POP);
    drops.forEach((d, i) => {
      const y = 270 + 6 * Math.sin((t - tW1) * 1.3 + i * 2.1);
      attr(d.g, 'transform', `translate(${d.x} ${y.toFixed(1)})`); fade(d.g, t, wt('W2', 'drops') - 0.1 + i * 0.15);
      fade(d.ql, t, tDrop[i] - 0.1); d.el.forEach((e, k) => fade(e, t, tN5[i] + k * 0.08, 1e9, 0.15)); fade(d.nl, t, tN5[i]);
    });
    M.vis($('#wGp'), t, wt('W6', 'packets') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'proton') - 0.1, tStrike: wt('X3', 'Equal', 1) - 0.1, tRight: wt('X3', 'proton') - 0.1 });
    fade(sees, t, wt('X3', 'proton') - 0.05);
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
