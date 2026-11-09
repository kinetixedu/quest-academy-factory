// PUC Chemistry Ep 54: Enthalpy changes of reactions (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: ΔH symbol gold, heat out (negative) green, heat in (positive) red, C teal, H ink, O violet, Cl blue, N teal
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', CLC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tG = s => `\\textcolor{${GC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`;
const dH = (sub) => tG(`\\Delta_{${sub}} H^{\\ominus}`);
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); g._x = x; g._y = y; place(g, x, y); return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const level = (p, x1, x2, y, lab, col = HC) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1, y1: y, x2, y2: y, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }); const l = txt(g, x1, y - 12, lab, { 'font-size': 20, fill: col, 'font-weight': 600 }); return g; };
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'],
  blocks: ['M3 14h8v7H3z', 'M13 14h8v7h-8z', 'M8 5h8v7H8z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['flame', 'Gas flame', 'HEATS THE MILK', 'flame', 'HEAT OUT', OK], ['snow', 'Cold pack', 'TURNS ICY', 'cold', 'HEAT IN', RD], ['blocks', 'Lego tower', 'PULL IT APART', 'Lego', 'ENERGY IN', RD]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Cooking gas: mostly butane, C₄H₁₀', 'butane', 'H3'], ['1 mol burns: 2658 kJ out', 'mole', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('flame', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: standard state ---------- */
$('#mdefI').innerHTML = M.icon('equal', 28, '#fff', 2.6);
const QR = [['Each substance pure', 'PURE', 'P2', 'pure'], ['At a pressure of 1 bar', '1 BAR', 'P2', 'bar'], ['Usually at 298 K (25 °C)', '298 K', 'P2', 'ninety'], ['Per mole, as written', 'mol', 'P3', 'enthalpy']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
$('#eqB').style.top = '86px';
$('#eqB').innerHTML = K(`${dH('r')} = H_{\\text{products}} - H_{\\text{reactants}}`);
const ps = $('#pS');
const pLr = level(ps, 120, 420, 250, 'REACTANTS'), pLp = level(ps, 360, 664, 430, 'PRODUCTS');
const [pA, pAh] = varrow(ps, 400, 256, 424, OK); const pAt = txt(ps, 430, 350, 'HEAT OUT: Δ < 0', { 'font-size': 20, fill: OK, 'font-weight': 600 });
$('#pPl').innerHTML = `The small circle <b style="color:${GC};margin:0 6px">⊖</b> means standard state`;

/* ---------- S: bench, formation of water ---------- */
const b = $('#bS');
const hb = mk(b, 'line', { x1: 150, y1: 190, x2: 240, y2: 190, stroke: HC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const ob = mk(b, 'g', {}); [-6, 6].forEach(d => mk(ob, 'line', { x1: 530, y1: 190 + d, x2: 630, y2: 190 + d, stroke: OC, 'stroke-width': 5 }));
const wb = mk(b, 'g', {}); const OX = 392, OY = 300, HX = 82, HY = 64;
mk(wb, 'line', { x1: OX, y1: OY, x2: OX - HX, y2: OY + HY, stroke: HC, 'stroke-width': 7, 'stroke-linecap': 'round' }); mk(wb, 'line', { x1: OX, y1: OY, x2: OX + HX, y2: OY + HY, stroke: HC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const H1a = atom(b, 150, 190, 26, HC, 'H'), H1b = atom(b, 240, 190, 26, HC, 'H');
const O1 = atom(b, 530, 190, 32, OC, 'O'), O2g = atom(b, 630, 190, 32, OC, 'O');
const half = txt(b, 470, 150, '½', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 40, fill: HC });
const bL1 = txt(b, 195, 270, 'H₂(g)', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 }), bL2 = txt(b, 580, 270, '½ O₂(g)', { 'text-anchor': 'middle', 'font-size': 22, fill: OC, 'font-weight': 600 });
const bL3 = txt(b, OX, 420, 'H₂O(l) · 1 mol', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#bEq').innerHTML = K(`\\mathrm{H_2(g)} + \\tfrac{1}{2}\\textcolor{${OC}}{\\mathrm{O_2(g)}} \\rightarrow \\mathrm{H_2O(l)}`);
const es = $('#eS'), EY0 = 150, EY1 = 150 + 285.8 * 0.95;
const eTop = level(es, 100, 560, EY0, 'H₂(g) + ½O₂(g) · ELEMENTS · 0'), eBot = level(es, 100, 560, EY1, 'H₂O(l)');
const [eA, eAh] = varrow(es, 330, EY0 + 6, EY1 - 4, OK); const eV = txt(es, 360, (EY0 + EY1) / 2 + 12, '', { 'font-size': 34, fill: OK, 'font-weight': 600 });
const eT = txt(es, 600, EY1 + 8, 'HEAT OUT', { 'font-size': 20, fill: OK, 'font-weight': 600 });
const ZC = [['O₂(g)', OC], ['H₂(g)', HC], ['C(graphite)', NC]];
$('#zc').innerHTML = ZC.map(([s, c], i) => `<div class="chip2" id="zc${i}"><span style="color:${c}">${s}</span><span style="color:var(--mute)">ΔfH° = 0</span></div>`).join('');
const tZc = [wt('S6', 'oxygen'), wt('S6', 'oxygen') + 0.35, wt('S6', 'graphite')];

/* ---------- B: atomization of methane ---------- */
const a = $('#aS'), CX = 392, CY = 270, BR = 100, FR = 165;
const ANG = [-90, 0, 90, 180].map(d => d * Math.PI / 180);
const aBonds = ANG.map(g => mk(a, 'line', { x1: CX, y1: CY, x2: CX + BR * Math.cos(g), y2: CY + BR * Math.sin(g), stroke: HC, 'stroke-width': 7, 'stroke-linecap': 'round' }));
const aC = atom(a, CX, CY, 36, NC, 'C', 26);
const aH = ANG.map(g => atom(a, CX + BR * Math.cos(g), CY + BR * Math.sin(g), 24, HC, 'H'));
const aSn = ANG.map(g => txt(a, CX + 150 * Math.cos(g) + (g === 0 || Math.abs(g - Math.PI) < .1 ? 0 : 50), CY + 150 * Math.sin(g) + (g === 0 || Math.abs(g - Math.PI) < .1 ? -26 : 8), 'SNAP', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 }));
const atag = document.createElement('div'); atag.className = 'btag'; atag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#an').appendChild(atag);
$('#aEq').innerHTML = K(`\\textcolor{${NC}}{\\mathrm{C}}\\mathrm{H_4(g)} \\rightarrow \\textcolor{${NC}}{\\mathrm{C}}\\mathrm{(g)} + 4\\mathrm{H(g)} \\quad ${dH('a')} = ${tR('+1665')}`);
const STEPS = [427, 439, 452, 347], LK = 0.2, LY0 = 470;
const ls = $('#lS'); const lBase = level(ls, 80, 300, LY0, 'CH₄(g)');
let acc = 0; const lSt = STEPS.map((v, i) => { const y0 = LY0 - acc * LK; acc += v; const y1 = LY0 - acc * LK, x = 150 + i * 120; const g = mk(ls, 'g', {}); const [l, h] = varrow(g, x, y0 - 4, y1 + 4, RD); mk(g, 'line', { x1: x - 30, y1, x2: x + 90, y2: y1, stroke: HC, 'stroke-width': 3 }); txt(g, x + 10, (y0 + y1) / 2 + 7, '+' + v, { 'font-size': 18, fill: RD, 'font-weight': 600 }); return { g, l, h }; });
const lTot = txt(ls, 640, LY0 - 1665 * LK + 8, '1665', { 'font-size': 34, fill: RD, 'font-weight': 600, 'text-anchor': 'middle' });
const lMean = mk(ls, 'line', { x1: 80, y1: LY0 - 416 * LK, x2: 704, y2: LY0 - 416 * LK, stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const lMeanT = txt(ls, 704, LY0 - 416 * LK + 30, 'MEAN C-H: 1665 ÷ 4 ≈ 416', { 'font-size': 20, fill: GC, 'font-weight': 600, 'text-anchor': 'end' });
const BE = [['H-H', '435'], ['Cl-Cl', '242'], ['O=O', '428']];
$('#bes').innerHTML = BE.map(([s, v], i) => `<div class="chip2" id="be${i}"><span>${s}</span><span style="color:${RD}">${v}</span></div>`).join('');
const tBe = [wt('B6', 'Bond'), wt('B6', 'Bond') + 0.3, wt('B6', 'Bond') + 0.6];

/* ---------- G: combustion + solution ---------- */
const cs = $('#cS'), CB = [['C₄H₁₀ · butane', 2658, 'G2', 'Butane'], ['C₆H₁₂O₆ · glucose', 2802, 'G2', 'Glucose']];
const cBars = CB.map(([s, v], i) => { const y = 120 + i * 170, g = mk(cs, 'g', {}); txt(g, 36, y, s, { 'font-size': 24, fill: HC, 'font-weight': 600 }); const r = mk(g, 'rect', { x: 36, y: y + 22, width: 0, height: 64, rx: 10, fill: OK }); const vt = txt(g, 0, y + 66, '', { 'font-size': 30, fill: '#fff', 'font-weight': 600, 'text-anchor': 'end' }); return { g, r, vt, v }; });
const tCB = CB.map(c => wt(c[2], c[3]));
$('#cP1').innerHTML = `Products: ${K('\\mathrm{CO_2(g)} + \\mathrm{H_2O(l)}')} · ${K(`${dH('c')} < 0`)}`;
$('#cP2').innerHTML = `<b style="color:${NC}">ISC</b> · neutralisation: about ${K(tO('-57'))} kJ per mol of water`;
const os = $('#oS'), OS = 0.36, OY0 = 420, OY1 = OY0 - 788 * OS, OY2 = OY1 + 784 * OS;
const oL0 = level(os, 70, 330, OY0, 'NaCl(s)'), oL1 = level(os, 70, 714, OY1, 'Na⁺(g) + Cl⁻(g)'), oL2 = level(os, 360, 714, OY2, 'Na⁺(aq) + Cl⁻(aq)');
const [oA1, oA1h] = varrow(os, 200, OY0 - 6, OY1 + 6, RD), [oA2, oA2h] = varrow(os, 660, OY1 + 6, OY2 - 6, OK);
const oT1 = txt(os, 222, (OY0 + OY1) / 2, '+788', { 'font-size': 30, fill: RD, 'font-weight': 600 }), oT1b = txt(os, 222, (OY0 + OY1) / 2 + 28, 'BREAK THE CRYSTAL', { 'font-size': 16, fill: RD, 'font-weight': 600 });
const oT2 = txt(os, 638, (OY1 + OY2) / 2, '-784', { 'font-size': 30, fill: OK, 'font-weight': 600, 'text-anchor': 'end' }), oT2b = txt(os, 638, (OY1 + OY2) / 2 + 28, 'HYDRATION', { 'font-size': 16, fill: OK, 'font-weight': 600, 'text-anchor': 'end' });
$('#oP').innerHTML = `${K(`${dH('sol')} = 788 - 784 = ${tR('+4')}`)}&nbsp;kJ mol⁻¹`;
$('#oP').classList.remove('good');

/* ---------- C: ammonia, as written vs formation ---------- */
$('#caE').innerHTML = K(`\\textcolor{${NC}}{\\mathrm{N_2}} + 3\\mathrm{H_2} \\rightarrow 2\\textcolor{${NC}}{\\mathrm{N}}\\mathrm{H_3}`);
$('#cfE').innerHTML = K(`\\tfrac{1}{2}\\textcolor{${NC}}{\\mathrm{N_2}} + \\tfrac{3}{2}\\mathrm{H_2} \\rightarrow \\textcolor{${NC}}{\\mathrm{N}}\\mathrm{H_3}`);
const nh3 = (p, x, y) => { const g = mk(p, 'g', {}); [[-62, 44], [62, 44], [0, 74]].forEach(([dx, dy]) => mk(g, 'line', { x1: x, y1: y, x2: x + dx, y2: y + dy, stroke: HC, 'stroke-width': 6, 'stroke-linecap': 'round' })); atom(g, x, y, 30, NC, 'N'); [[-62, 44], [62, 44], [0, 74]].forEach(([dx, dy]) => atom(g, x + dx, y + dy, 20, HC, 'H', 18)); return g; };
const caM = [nh3($('#caS'), 250, 230), nh3($('#caS'), 534, 230)], cfM = nh3($('#cfS'), 392, 230);
$('#caV').innerHTML = `<span>${K(`${dH('r')} =`)}</span><span style="color:${OK}">-92.4 kJ</span>`;
$('#cfV').innerHTML = `<span>${K(`${dH('f')} =`)}</span><span id="cfN" style="color:${OK}">?</span>`;
const th1 = PUC.think($('#th1'), { q: 'N₂ + 3H₂ → 2NH₃ has ΔrH° = -92.4 kJ. Is -92.4 the enthalpy of formation of NH₃?', opts: ['Yes', 'No'], right: 1, why: 'No. That makes 2 mol. Formation is per 1 mol: -92.4 ÷ 2 = -46.2 kJ/mol.' });

/* ---------- D: products minus reactants + limestone road ---------- */
const MS = [['Pull reactants into elements: flip their ΔfH°', 'D2'], ['Build products from elements: add their ΔfH°', 'D3'], ['Products minus reactants, times coefficients', 'D4']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${96 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.25);
$('#dF').innerHTML = K(`${dH('r')} = \\sum ${tO('\\Delta_f H^{\\ominus}_{\\text{prod}}')} - \\sum ${tR('\\Delta_f H^{\\ominus}_{\\text{react}}')}`);
const ys = $('#yS');
const box = (x, y, w, s, col) => { const g = mk(ys, 'g', {}); mk(g, 'rect', { x: x - w / 2, y: y - 30, width: w, height: 60, rx: 12, fill: '#fff', stroke: col, 'stroke-width': 3 }); txt(g, x, y + 8, s, { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 }); return g; };
const yR = box(170, 120, 220, 'CaCO₃(s)', RD), yP = box(590, 120, 270, 'CaO(s) + CO₂(g)', OK), yE = box(392, 380, 520, 'Ca(s) + C(graphite) + 3/2 O₂(g)', HC);
const yA1 = mk(ys, 'path', { d: 'M190 152 L300 346', stroke: RD, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'marker-end': '' }), yA1h = mk(ys, 'path', { d: 'M286 340 L304 352 L302 330 Z', fill: RD });
const yA2 = mk(ys, 'path', { d: 'M484 346 L572 152', stroke: OK, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }), yA2h = mk(ys, 'path', { d: 'M560 160 L576 144 L580 166 Z', fill: OK });
const yA3 = mk(ys, 'path', { d: 'M286 120 H446', stroke: GC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '10 8' }), yA3h = mk(ys, 'path', { d: 'M442 108 L462 120 L442 132 Z', fill: GC });
const yT1 = txt(ys, 110, 270, '+1206.9', { 'font-size': 26, fill: RD, 'font-weight': 600 }), yT2 = txt(ys, 548, 270, '-635.1 - 393.5', { 'font-size': 24, fill: OK, 'font-weight': 600 });
const yT3 = txt(ys, 366, 96, '?', { 'font-size': 30, fill: GC, 'font-weight': 600, 'text-anchor': 'middle' });
$('#yEq').innerHTML = K(`(-635.1) + (-393.5) - (-1206.9) = ${tR('+178.3')}\\ \\text{kJ}`);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${dH('r')} = \\sum ${tO('\\Delta_f H^{\\ominus}')}_{\\text{prod}} - \\sum ${tO('\\Delta_f H^{\\ominus}')}_{\\text{react}} \\qquad ${dH('r')} = \\sum \\text{bonds}_{\\text{broken}} - \\sum \\text{bonds}_{\\text{made}}`);

/* ---------- W: bonds broken vs made ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{Broken: } 435 + 242 = ${tR('677')}\\,\\text{kJ in}`)],
  [K(`\\text{Made: } 2 \\times 431 = ${tO('862')}\\,\\text{kJ out}`)],
  [K(`\\Delta_r H = 677 - 862 = ${tO('-185')}\\,\\text{kJ}`)],
  ['More out than in: exothermic']], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WK = 0.36, WY = 440;
const wbar = (x, parts, col, colT, lab) => { const g = mk(ws, 'g', {}); let y = WY; const rs = parts.map(([v, s]) => { const h = v * WK; const r = mk(g, 'rect', { x: x - 80, y: y - h, width: 160, height: h, fill: colT, stroke: col, 'stroke-width': 3, rx: 6 }); const tx = txt(g, x, y - h / 2 + 8, s + ' ' + v, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }); y -= h; return { r, tx }; }); txt(g, x, WY + 34, lab, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); const tot = txt(g, x, y - 14, '', { 'text-anchor': 'middle', 'font-size': 30, fill: col, 'font-weight': 600 }); return { g, rs, tot }; };
const wB = wbar(230, [[435, 'H-H'], [242, 'Cl-Cl']], RD, RDT, 'BROKEN · IN'), wM = wbar(554, [[431, 'H-Cl'], [431, 'H-Cl']], OK, OKT, 'MADE · OUT');
mk(ws, 'line', { x1: 80, y1: WY, x2: 704, y2: WY, stroke: C.ink2, 'stroke-width': 3 });
const wGap = mk(ws, 'line', { x1: 330, y1: WY - 677 * WK, x2: 704, y2: WY - 677 * WK, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const wGapT = txt(ws, 704, WY - 677 * WK - (862 - 677) * WK / 2 + 4, '185', { 'text-anchor': 'end', 'font-size': 22, fill: OK, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Products minus reactants: ${K('862 - 677 = +185')}`, right: `Bonds: reactants minus products, ${K(`677 - 862 = ${tO('-185')}`)}` });
const tsv = $('#tS'); const tA1 = varrow(tsv, 170, 210, 70, RD), tA2 = varrow(tsv, 370, 70, 230, OK);
const tT1 = txt(tsv, 190, 150, 'BREAK: IN', { 'font-size': 18, fill: RD, 'font-weight': 600 }), tT2 = txt(tsv, 390, 150, 'MAKE: OUT', { 'font-size': 18, fill: OK, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Define each enthalpy, or find ΔrH° from a table of formation or bond values' });
const OPT = ['-604.5', '-890.3', '-1039.9', '+890.3'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'ΔfH° (kJ/mol): CO₂(g) -393.5, H₂O(l) -285.8, CH₄(g) -74.8. Find ΔcH° of methane.', qW: 780,
  opts: OPT.map(s => K(`${s}\\ \\text{kJ mol}^{-1}`)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K('\\mathrm{CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O}')], [K('-393.5 + 2(-285.8) = -965.1')], [K(`-965.1 - (-74.8) = ${tO('-890.3')}`)], ['A forgot the 2']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.3];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · enthalpy changes of reactions', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${dH('r')} = \\sum ${tO('\\Delta_f H^{\\ominus}')}_{\\text{prod}} - \\sum ${tO('\\Delta_f H^{\\ominus}')}_{\\text{react}}`), K(`${dH('r')} = \\sum \\text{bonds broken} - \\sum \\text{bonds made} \\quad (\\text{gases})`),
    '<b>Formation</b>: 1 mol from elements · H₂O(l) -285.8 · elements 0', '<b>Combustion</b>: butane -2658 · <b>atomization</b>: CH₄ +1665', '<b>Mean C-H</b> 416 · <b>solution</b>: NaCl 788 - 784 = +4 kJ mol⁻¹'] });
const YQ = ['Why is the enthalpy of formation of oxygen gas zero?', 'Why does dissolving salt take so little heat?', 'With bond enthalpies, why is it reactants minus products?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 55', topic: 'Find a reaction\'s heat without doing it? Hess\'s law', y: 764 });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 70, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Built from bricks, and heat comes out!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tOpen = wt('S3', 'open'), tJoin = wt('S3', 'join');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S3') - 0.2, 1.08, 960, 580], [T0('S4') - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#mss .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(27 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}

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
    const tB = [wt('H2', 'heat') - 0.2, wt('H2', 'heat') + 0.15, wt('H2', 'story')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, T1('H2') - 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'five') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'track') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P3') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#eqB'), t, wt('P3', 'standard') - 0.1, 0.8);
    fade(pLr, t, wt('P3', 'enthalpy')); fade(pLp, t, wt('P3', 'enthalpy') + 0.3); M.draw(pA, t, wt('P3', 'reaction'), 0.5); fade(pAh, t, wt('P3', 'reaction') + 0.4); fade(pAt, t, wt('P3', 'reaction') + 0.4);
    M.vis($('#pPl'), t, wt('P3', 'circle') - 0.1, 1e9, POP);
  }

  /* S: formation of water */
  const sOn = t >= tS1 - 0.1 && t < tB1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('S4') + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); const ofs = sh >= 1 ? 0 : (wv - 784) / 2; b.style.transform = `translateX(${ofs.toFixed(1)}px)`; $('#bEq').style.transform = `translateX(${ofs.toFixed(1)}px)`; }
    M.vis($('#eb'), t, T0('S4') - 0.2, z, { dx: 60, dy: 0, ...o });
    const tIn = wt('S3', 'Hydrogen'), tOx = wt('S3', 'oxygen');
    [H1a, H1b, hb, bL1].forEach(e => fade(e, t, tIn - 0.1, 1e9, 0.3)); [O1, ob, bL2, half].forEach(e => fade(e, t, tOx - 0.2, 1e9, 0.3));
    fade(O2g, t, tOx - 0.2, tOpen, 0.3, 0.3);
    fade(hb, t, tIn - 0.1, tOpen, 0.25); fade(ob, t, tOx - 0.2, tOpen, 0.25); fade(bL1, t, tIn, tOpen); fade(bL2, t, tOx, tOpen); fade(half, t, tOx, tOpen);
    const u = M.io((t - tJoin + 0.1) / 0.9);
    place(H1a, M.lerp(150, OX - HX, u), M.lerp(190, OY + HY, u)); place(H1b, M.lerp(240, OX + HX, u), M.lerp(190, OY + HY, u)); place(O1, M.lerp(530, OX, u), M.lerp(190, OY, u));
    fade(wb, t, tJoin + 0.7, 1e9, 0.3); fade(bL3, t, T0('S4'));
    const TAG = [[tS1 + 0.3, 'FORMATION'], [tIn, 'ELEMENTS: H₂ + ½O₂'], [tOpen, 'BONDS OPEN'], [tJoin, 'ATOMS JOIN'], [T0('S4'), '1 MOL H₂O(l)'], [T0('S6'), 'ELEMENTS = 0']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    PUC.write($('#bEq'), t, wt('S3', 'join') + 0.3, 0.8);
    fade(eTop, t, T0('S4')); const tDn = wt('S4', 'heat'); M.draw(eA, t, tDn, 0.9); fade(eAh, t, tDn + 0.8); fade(eBot, t, tDn + 0.6);
    const ev = 285.8 * M.io((t - tDn) / 0.9); M.setT(eV, '-' + ev.toFixed(1)); fade(eV, t, tDn); fade(eT, t, tDn + 0.8);
    ZC.forEach((_, i) => M.vis($('#zc' + i), t, tZc[i] - 0.1, 1e9, POP));
    avD(t, T1('S5') - 0.2, T0('S6') + 1.6);
  }

  /* B: atomization */
  const bOn = t >= tB1 - 0.1 && t < tG1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const z = OUT('G1');
    M.vis($('#an'), t, tB1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#al'), t, T0('B3') - 0.3, z, { dx: 60, dy: 0, ...o });
    fade(aC, t, T0('B2')); const tSn = [0, 1, 2, 3].map(i => wt('B3', 'snap', i));
    ANG.forEach((g, i) => { const u = M.io((t - tSn[i]) / 0.6), r = M.lerp(BR, FR, u); place(aH[i], CX + r * Math.cos(g), CY + r * Math.sin(g)); fade(aH[i], t, wt('B2', 'four') + i * 0.12, 1e9, 0.2); fade(aBonds[i], t, wt('B2', 'four') + i * 0.12, tSn[i], 0.2); fade(aSn[i], t, tSn[i], tSn[i] + 0.8, 0.15); });
    const TAG = [[tB1 + 0.3, 'ATOMIZATION'], [T0('B2'), 'CH₄ · 4 C-H BONDS'], [tSn[0], '1 BROKEN'], [tSn[1], '2 BROKEN'], [tSn[2], '3 BROKEN'], [tSn[3], 'C(g) + 4H(g)']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(atag, tg); M.vis(atag, t, tB1 + 0.2, 1e9, POP);
    PUC.write($('#aEq'), t, wt('B4', 'atomization') - 0.4, 0.8);
    fade(lBase, t, T0('B3') - 0.1);
    lSt.forEach((s, i) => { fade(s.g, t, tSn[i], 1e9, 0.15); M.draw(s.l, t, tSn[i], 0.4); });
    fade(lTot, t, T0('B4') + 0.2); M.draw(lMean, t, wt('B5', 'four') - 0.1, 0.6); fade(lMeanT, t, wt('B5', 'four') + 0.3);
    BE.forEach((_, i) => M.vis($('#be' + i), t, tBe[i], 1e9, POP));
  }

  /* G: combustion + solution */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#cb'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    cBars.forEach((c, i) => { const u = M.io((t - tCB[i]) / 0.8), w = c.v * 0.235 * u; attr(c.r, 'width', w.toFixed(1)); attr(c.vt, 'x', (36 + w - 16).toFixed(1)); M.setT(c.vt, '-' + Math.round(c.v * u)); fade(c.g, t, tCB[i] - 0.4); c.vt.style.opacity = M.clamp((t - tCB[i] - 0.3) / 0.3).toFixed(3); });
    M.vis($('#cP1'), t, T1('G2') - 0.2, wt('G5', 'neutralisation') - 0.3, { ...POP, outDur: 0.2, ody: 0 });
    M.vis($('#cP2'), t, wt('G5', 'neutralisation') - 0.1, 1e9, POP);
    M.vis($('#sl'), t, T0('G3') - 0.1, z, { dx: 60, dy: 0, ...o });
    fade(oL0, t, wt('G3', 'salt')); const t1 = wt('G3', 'Breaking'), t2 = wt('G4', 'hug');
    M.draw(oA1, t, t1, 0.8); fade(oA1h, t, t1 + 0.7); fade(oL1, t, t1 + 0.6); fade(oT1, t, t1 + 0.8); fade(oT1b, t, t1 + 0.8);
    M.draw(oA2, t, t2, 0.8); fade(oA2h, t, t2 + 0.7); fade(oL2, t, t2 + 0.6); fade(oT2, t, wt('G4', 'hydration')); fade(oT2b, t, wt('G4', 'hydration'));
    M.vis($('#oP'), t, wt('G5', 'plus') - 0.1, 1e9, POP);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tD1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    PUC.write($('#caE'), t, wt('C1', 'Nitrogen') - 0.1, 0.9);
    caM.forEach((m, i) => fade(m, t, wt('C1', 'two') + i * 0.25));
    M.vis($('#caV'), t, wt('C1', 'minus') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.1, zc, { dx: 60, dy: 0, ...o });
    PUC.write($('#cfE'), t, wt('C2', 'formation'), 0.9); fade(cfM, t, wt('C2', 'one'));
    M.vis($('#cfV'), t, wt('C2', 'product') - 0.1, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'enthalpy') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Halve') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('T1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.6); });
    PUC.write($('#dF'), t, wt('D4', 'products'), 0.9);
    M.vis($('#cy'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    fade(yR, t, T0('D2')); fade(yE, t, wt('D2', 'elements') - 0.1); M.draw(yA1, t, wt('D2', 'flips') - 0.3, 0.6); fade(yA1h, t, wt('D2', 'flips') + 0.2);
    fade(yP, t, wt('D3', 'products')); M.draw(yA2, t, wt('D3', 'adds') - 0.3, 0.6); fade(yA2h, t, wt('D3', 'adds') + 0.2);
    M.draw(yA3, t, wt('D4', 'So'), 0.6); fade(yA3h, t, wt('D4', 'So') + 0.5); fade(yT3, t, wt('D4', 'So') + 0.5);
    M.setT(yR.lastChild, t >= wt('D5', 'Limestone') ? 'CaCO₃(s)' : 'REACTANTS'); M.setT(yP.lastChild, t >= wt('D5', 'lime') ? 'CaO(s) + CO₂(g)' : 'PRODUCTS'); M.setT(yE.lastChild, t >= wt('D5', 'Limestone') ? 'Ca(s) + C(graphite) + 3/2 O₂(g)' : 'ELEMENTS');
    fade(yT1, t, wt('D6', 'plus')); fade(yT2, t, wt('D6', 'Minus'));
    M.setT(yT3, t >= wt('D6', 'seventy') ? '+178.3' : '?');
    PUC.write($('#yEq'), t, wt('D6', 'Minus') - 0.1, 1.6);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Formation') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Bond') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'reactants', 1) + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    [[wB, T0('W3')], [wM, T0('W4')]].forEach(([w, t0]) => { w.rs.forEach((r, i) => { fade(r.r, t, t0 + i * 0.5); fade(r.tx, t, t0 + i * 0.5 + 0.2); }); fade(w.g, t, t0 - 0.2, 1e9, 0.2); });
    M.setT(wB.tot, '677 IN'); M.setT(wM.tot, '862 OUT'); fade(wB.tot, t, wt('W3', 'Six')); fade(wM.tot, t, wt('W4', 'Eight'));
    fade(wGap, t, T0('W5')); fade(wGapT, t, T0('W5') + 0.3);
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'products') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Reactants') - 0.1 });
    const tb = wt('X3', 'breaking'), tm = wt('X3', 'making');
    M.draw(tA1[0], t, tb, 0.4); fade(tA1[1], t, tb + 0.3); fade(tT1, t, tb + 0.3); M.draw(tA2[0], t, tm, 0.4); fade(tA2[1], t, tm + 0.3); fade(tT2, t, tm + 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
