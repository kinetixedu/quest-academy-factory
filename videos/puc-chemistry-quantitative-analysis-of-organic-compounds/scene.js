// PUC Chemistry Ep 88: Quantitative analysis of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon / CO2 teal, hydrogen / H2O blue, nitrogen gold, oxygen violet, halogen / bromine red-brown, mass numbers ink
const CC = C.ac, HH = '#2F6FEB', NN = '#B7791F', OO = '#7A4FE0', BR = '#A0522D', HC = C.ink, OK = C.ok, RD = C.red, GR = '#9AA3AF';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const eqrow = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
const lab = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-size': 19, fill: col, 'font-weight': 600 }, a));
const fillC = (el, c) => { if (el._f !== c) { el._f = c; attr(el, 'fill', c); } };
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); place(g, x, y); return g; };
const flame = (p, x, y, s = 1) => mk(p, 'path', { d: `M${x} ${y - 34 * s} C${x + 14 * s} ${y - 18 * s} ${x + 14 * s} ${y} ${x} ${y} C${x - 14 * s} ${y} ${x - 14 * s} ${y - 18 * s} ${x} ${y - 34 * s} Z`, fill: '#D9731A' });
const along = (pts, u) => { let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; } let r = M.clamp(u) * L; for (let i = 0; i < seg.length; i++) { if (r <= seg[i] || i === seg.length - 1) { const k = seg[i] ? Math.min(1, r / seg[i]) : 0; return [M.lerp(pts[i][0], pts[i + 1][0], k), M.lerp(pts[i][1], pts[i + 1][1], k)]; } r -= seg[i]; } };
const PC = (x) => `\\%\\,${x}`;

Object.assign(M.IC, {
  label: ['M5 4h14v16H5z', 'M8 8h8', 'M8 12h8', 'M8 16h5'],
  report: ['M6 3h9l3 3v15H6z', 'M9 10h6', 'M9 14h6', 'M9 18h3'],
  scale: ['M12 4v16', 'M6 20h12', 'M4 8h16', 'M4 8l-2 6h4z', 'M20 8l-2 6h4z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tJ1 = T0('J1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['label', 'Food packet', 'PROTEIN PER 100 g', 'PROTEIN'], ['report', 'Blood report', 'HOW MUCH SUGAR', 'SUGAR'], ['scale', 'Every number', 'SOMEONE MEASURED IT', 'HOW MUCH']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'packet'), wt('H1', 'blood'), wt('H2', 'measured')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, bd], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${CC}">${bd}</div></div>`).join('');
const KIT = [['How did they know the protein?', 'protein', 'H3'], ['Protein has nitrogen', 'nitrogen', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('label', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P ---------- */
const QR = [['Last time: what is inside', 'QUALITATIVE', 'P1', 'Last', GR], ['Now: how much of each', 'QUANTITATIVE', 'P1', 'how', CC], ['Turn the element into a product', 'WEIGH IT', 'P2', 'product', NN], ['Or into a gas', 'MEASURE IT', 'P2', 'gas', HH]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
$('#pE').innerHTML = K(`\\%\\ \\text{element} = \\dfrac{\\text{mass of element}}{\\text{mass of compound}} \\times 100`);
const PCH = [['C, H · WEIGH CO₂ AND H₂O', 36, 300], ['N · GAS VOLUME OR NH₃', 36, 370], ['X, S, P · WEIGH A SOLID', 400, 300], ['O · BY DIFFERENCE', 400, 370]];
$('#pcs').innerHTML = PCH.map(([s, x, y], i) => `<div class="chp" id="pc${i}" style="left:${x}px;top:${y}px">${s}</div>`).join('');

/* ---------- S: Liebig bench ---------- */
const b = $('#bS');
txt(b, 30, 206, 'O₂ →', { 'font-size': 22, fill: OO, 'font-weight': 700 });
const bFur = mk(b, 'rect', { x: 110, y: 160, width: 330, height: 80, rx: 12, fill: '#FFF4E8', stroke: C.dim, 'stroke-width': 2 });
mk(b, 'rect', { x: 90, y: 182, width: 360, height: 36, rx: 18, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
const bBoat = mk(b, 'path', { d: 'M130 210 H180 L174 200 H136 Z', fill: CC });
mk(b, 'rect', { x: 230, y: 188, width: 190, height: 24, rx: 6, fill: '#3A3A3A' });
txt(b, 325, 270, 'HOT CuO', { 'font-size': 16, fill: HC, 'font-weight': 700, 'text-anchor': 'middle' }); txt(b, 155, 270, 'SAMPLE', { 'font-size': 16, fill: CC, 'font-weight': 700, 'text-anchor': 'middle' });
const bFl = [150, 210, 270, 330, 390].map(x => flame(b, x, 300, 0.8));
const U = (x1, x2, fill) => { mk(b, 'path', { d: `M${x1} 200 V370 A${(x2 - x1) / 2} ${(x2 - x1) / 2} 0 0 0 ${x2} 370 V200`, stroke: C.ink2, 'stroke-width': 26, fill: 'none' }); return mk(b, 'path', { d: `M${x1} 220 V370 A${(x2 - x1) / 2} ${(x2 - x1) / 2} 0 0 0 ${x2} 370 V220`, stroke: fill, 'stroke-width': 18, fill: 'none' }); };
mk(b, 'line', { x1: 450, y1: 200, x2: 480, y2: 200, stroke: C.ink2, 'stroke-width': 8 }); mk(b, 'line', { x1: 560, y1: 200, x2: 600, y2: 200, stroke: C.ink2, 'stroke-width': 8 }); mk(b, 'line', { x1: 680, y1: 200, x2: 730, y2: 200, stroke: C.ink2, 'stroke-width': 8 });
const bU1 = U(480, 560, '#F1F1F1'), bU2 = U(600, 680, '#EAF2E0');
const bUL = [lab(b, 520, 470, 'CaCl₂', HH, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700 }), lab(b, 520, 494, 'TRAPS H₂O', HH, { 'text-anchor': 'middle', 'font-size': 15 }), lab(b, 640, 470, 'KOH', CC, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700 }), lab(b, 640, 494, 'TRAPS CO₂', CC, { 'text-anchor': 'middle', 'font-size': 15 })];
const PH2 = [[155, 200], [480, 200], [480, 330]], PC2 = [[155, 200], [480, 200], [480, 370], [560, 370], [560, 200], [600, 200], [600, 330]];
const NP = 10, bHp = Array.from({ length: NP }, () => mk(b, 'circle', { r: 7, fill: HH })), bCp = Array.from({ length: NP }, () => mk(b, 'circle', { r: 7, fill: CC }));
const RDS = [['COMPOUND BURNT · g', 'rd0', 96], ['CaCl₂ TUBE GAIN · g', 'rd1', 188], ['KOH TUBE GAIN · g', 'rd2', 280]];
$('#rds').innerHTML = RDS.map(([k, id, top]) => `<div class="rd" id="${id}" style="top:${top}px"><span class="ck">${k}</span><span class="cv"></span></div>`).join('');
$('#ebs').innerHTML = eqrow('eb0', 382, `${tc(CC, '\\mathrm{C}')} \\rightarrow ${tc(CC, '\\mathrm{CO_2}')}`, 'TRAPPED BY KOH', CC) + eqrow('eb1', 472, `${tc(HH, '\\mathrm{H}')} \\rightarrow ${tc(HH, '\\mathrm{H_2O}')}`, 'TRAPPED BY CaCl₂', HH);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- L: derivation ---------- */
$('#lss').innerHTML = eqrow('ls0', 96, `44\\ \\text{g}\\ \\mathrm{CO_2} \\text{ holds } ${tc(CC, '12')}\\ \\text{g C}`, 'STEP 1', HC)
  + eqrow('ls1', 196, `${PC('C')} = \\dfrac{${tc(CC, '12')}}{44} \\times \\dfrac{m_{\\mathrm{CO_2}} \\times 100}{m}`, 'STEP 2', HC)
  + eqrow('ls2', 316, `${PC('H')} = \\dfrac{${tc(HH, '2')}}{18} \\times \\dfrac{m_{\\mathrm{H_2O}} \\times 100}{m}`, 'STEP 3', HC)
  + `<div class="pillp" id="lsP" style="left:36px;top:478px">m = mass of the compound burnt</div>`;
const ls = $('#lS');
const lCO = [atom(ls, 250, 170, 40, OO, 'O'), atom(ls, 392, 170, 44, CC, 'C'), atom(ls, 534, 170, 40, OO, 'O')];
const lB1 = [mk(ls, 'path', { d: 'M290 162 H348 M290 178 H348 M436 162 H494 M436 178 H494', stroke: C.ink2, 'stroke-width': 5 })];
const lM1 = [lab(ls, 250, 246, '16', OO, { 'text-anchor': 'middle', 'font-size': 24 }), lab(ls, 392, 246, '12', CC, { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700 }), lab(ls, 534, 246, '16', OO, { 'text-anchor': 'middle', 'font-size': 24 }), lab(ls, 680, 246, '= 44', HC, { 'text-anchor': 'middle', 'font-size': 24 })];
const lB2 = mk(ls, 'path', { d: 'M305 360 L362 390 M422 390 L479 360', stroke: C.ink2, 'stroke-width': 5 });
const lHO = [atom(ls, 280, 350, 30, HH, 'H'), atom(ls, 392, 396, 44, OO, 'O'), atom(ls, 504, 350, 30, HH, 'H')];
const lM2 = [lab(ls, 280, 474, '1', HH, { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700 }), lab(ls, 392, 474, '16', OO, { 'text-anchor': 'middle', 'font-size': 24 }), lab(ls, 504, 474, '1', HH, { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700 }), lab(ls, 680, 474, '= 18', HC, { 'text-anchor': 'middle', 'font-size': 24 })];
const lH2 = lab(ls, 392, 530, 'TWO H ATOMS: 2 × 1 = 2', HH, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700 });

/* ---------- J: nitrogen ---------- */
const js = $('#jS');
mk(js, 'rect', { x: 60, y: 140, width: 260, height: 40, rx: 20, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
mk(js, 'rect', { x: 100, y: 148, width: 180, height: 24, rx: 6, fill: '#3A3A3A' });
const jFl = [130, 190, 250].map(x => flame(js, x, 222, 0.8));
mk(js, 'path', { d: 'M320 160 H400 V420 H470', stroke: C.ink2, 'stroke-width': 8, fill: 'none', 'stroke-linejoin': 'round' });
mk(js, 'rect', { x: 430, y: 330, width: 280, height: 100, rx: 8, fill: '#EAF2E0', stroke: C.ink2, 'stroke-width': 3 });
mk(js, 'rect', { x: 540, y: 90, width: 60, height: 300, rx: 8, fill: '#EAF2E0', stroke: C.ink2, 'stroke-width': 4 });
const jGas = mk(js, 'rect', { x: 543, y: 93, width: 54, height: 0, fill: '#FBF1DD' });
for (let i = 1; i < 8; i++) mk(js, 'line', { x1: 586, y1: 90 + i * 34, x2: 600, y2: 90 + i * 34, stroke: C.ink2, 'stroke-width': 2 });
const jBub = Array.from({ length: 4 }, () => mk(js, 'circle', { r: 6, fill: NN }));
const jL = [lab(js, 610, 140, 'N₂ GAS · V', NN, { 'font-size': 18, 'font-weight': 700 }), lab(js, 440, 456, 'KOH SOAKS UP CO₂', CC, { 'font-size': 17 }), lab(js, 60, 120, 'COMPOUND + CuO', HC, { 'font-size': 17 }), lab(js, 60, 300, '22400 mL N₂ = 28 g (STP)', NN, { 'font-size': 19, 'font-weight': 700 })];
$('#jes').innerHTML = eqrow('je0', 478, `${PC(tc(NN, '\\mathrm{N}'))} = \\dfrac{${tc(NN, '28')} \\times V \\times 100}{${tc(NN, '22400')} \\times m}`, 'V AT STP, mL', NN);
const JK = [['Heat with strong H₂SO₄', '(NH₄)₂SO₄', 'J4', 'sulphuric'], ['Add alkali', 'NH₃ GAS', 'J5', 'alkali'], ['Catch NH₃ in known acid', 'ACID USED UP', 'J5', 'caught']];
$('#jks').innerHTML = JK.map(([s, tg], i) => `<div class="rowl" id="jk${i}" style="top:${84 + i * 76}px"><span>${s}</span><span class="tg" style="color:${NN}">${tg}</span></div>`).join('')
  + eqrow('jk3', 324, `${PC(tc(NN, '\\mathrm{N}'))} = \\dfrac{1.4 \\times M \\times 2(V - V_1/2)}{m}`, 'M OF H₂SO₄', NN)
  + `<div class="pillp" id="jkP" style="left:36px;top:478px;background:${RD};color:#fff">Not for nitro, azo or ring N (pyridine)</div>`;

/* ---------- G: Carius ---------- */
const gs = $('#gS');
const gFur = mk(gs, 'rect', { x: 100, y: 160, width: 584, height: 180, rx: 16, fill: '#F4F2EC', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
mk(gs, 'rect', { x: 150, y: 220, width: 484, height: 60, rx: 30, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
const gLiq = mk(gs, 'path', { d: 'M180 262 H604 A26 26 0 0 1 590 276 H194 A26 26 0 0 1 180 262 Z', fill: '#F6EBC2' });
const gSol = mk(gs, 'rect', { x: 300, y: 262, width: 0, height: 14, rx: 4, fill: '#F3E6A6', stroke: '#B8A86A', 'stroke-width': 1.5 });
const gL = [lab(gs, 392, 140, 'FURNACE', C.mute, { 'text-anchor': 'middle', 'font-size': 16 }), lab(gs, 392, 380, 'COMPOUND + FUMING HNO₃ + AgNO₃', HC, { 'text-anchor': 'middle', 'font-size': 18 }), lab(gs, 392, 440, '', BR, { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700 }), lab(gs, 392, 476, '', C.mute, { 'text-anchor': 'middle', 'font-size': 17 })];
const gFl = [200, 300, 400, 500, 600].map(x => flame(gs, x, 360, 0.7));
const GN = [[`${PC(tc(BR, '\\mathrm{Br}'))} = \\dfrac{${tc(BR, '80')}}{188} \\times \\dfrac{m_1 \\times 100}{m}`, 'AgBr', 'G2', 'bromide'], [`${PC('\\mathrm{S}')} = \\dfrac{32}{233} \\times \\dfrac{m_1 \\times 100}{m}`, 'BaSO₄', 'G3', 'barium'], [`${PC('\\mathrm{P}')} = \\dfrac{31}{1877} \\times \\dfrac{m_1 \\times 100}{m}`, 'PHOSPHO-MOLYBDATE', 'G4', 'phosphomolybdate'], [`${PC(tc(OO, '\\mathrm{O}'))} = 100 - (\\text{all others})`, 'BY DIFFERENCE', 'G5', 'difference']];
$('#gns').innerHTML = GN.map(([e, tg], i) => `<div class="nf" id="gn${i}" style="top:${84 + i * 98}px;height:84px">${K(e)}<span class="tg" style="font-size:18px">${tg}</span></div>`).join('') + `<div class="pillp" id="gnP" style="left:36px;top:490px">m₁ = mass weighed · m = mass of compound</div>`;
const tGn = GN.map(r => wt(r[2], r[3]));

/* ---------- C: compare ---------- */
const CROWS = ['Amines', 'Nitro groups', 'Azo groups', 'Ring N (pyridine)'];
const rowsC = (pre, ok) => CROWS.map((s, i) => `<div class="rowl" id="${pre}${i}" style="top:${84 + i * 80}px"><span>${s}</span><span class="tg" style="color:${ok[i] ? OK : RD};font-size:26px">${ok[i] ? '✓' : '✗'}</span></div>`).join('');
$('#cas').innerHTML = rowsC('cd', [1, 1, 1, 1]); $('#cfs').innerHTML = rowsC('ck', [1, 0, 0, 0]);
$('#caV').innerHTML = `<span style="color:${OK}">works for every N</span>`;
$('#cfV').innerHTML = `<span style="color:${RD}">quick, but limited</span>`;
const th1 = PUC.think($('#th1'), { q: 'A compound has a nitro group. Which method finds its nitrogen?', opts: ['Kjeldahl', 'Dumas'], right: 1, why: 'Nitro nitrogen does not turn into ammonium sulphate, so Kjeldahl misses it.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\%\\ \\text{element} = \\dfrac{\\text{mass of element}}{\\text{mass of compound}} \\times 100`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${PC(tc(CC, '\\mathrm{C}'))} = \\dfrac{${tc(CC, '12')}}{44} \\times \\dfrac{0.198 \\times 100}{0.246} = ${tc(CC, '21.95')}`)],
  [K(`${PC(tc(HH, '\\mathrm{H}'))} = \\dfrac{${tc(HH, '2')}}{18} \\times \\dfrac{0.1014 \\times 100}{0.246} = ${tc(HH, '4.58')}`)],
  [K(`\\text{rest} = 100 - 21.95 - 4.58 = 73.47`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 110 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5')];
$('#wbs').innerHTML = `<div class="bar3" id="wbar" style="top:96px"><i id="wbC" style="background:${CC}"></i><i id="wbH" style="background:${HH}"></i><i id="wbR" style="background:#D7DCE3"></i></div>`
  + `<div class="rd" id="wt0" style="top:200px"><span class="ck">% CARBON</span><span class="cv" style="color:${CC}">21.95</span></div><div class="rd" id="wt1" style="top:292px"><span class="ck">% HYDROGEN</span><span class="cv" style="color:${HH}">4.58</span></div>`;
$('#wV').innerHTML = `<span>Rest:</span><span>73.47 %</span><span style="font:500 20px Poppins;color:var(--mute)">other elements</span>`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `For hydrogen: ${K('\\dfrac{1}{18}')}`, right: `Water has two H: ${K(`\\dfrac{${tc(HH, '2')}}{18}`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 100, 'H₂O = H + O + H', { 'font-size': 26, fill: HC, 'font-weight': 700 }), tq2 = txt(tsv, 40, 150, '2 × 1 = 2 g H IN 18 g', { 'font-size': 26, fill: HH, 'font-weight': 700 }), tq3 = txt(tsv, 40, 200, 'USE 2 / 18', { 'font-size': 24, fill: OK, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Masses given, find the percentage (Carius, Kjeldahl, Dumas, Liebig)' });
const OPT = ['40.0\\ \\%', '94.0\\ \\%', '42.6\\ \\%', '20.0\\ \\%'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'In a Carius estimation, 0.300 g of an organic compound gives 0.282 g of AgBr (M = 188 g/mol, Br = 80). The percentage of bromine is:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{Br\\ in\\ AgBr} = \\dfrac{${tc(BR, '80')}}{188}`)], [K(`\\dfrac{80 \\times 0.282 \\times 100}{188 \\times 0.300}`)], [K(`= ${tc(OK, '40.0\\ \\%')}`)], ['B forgot 80/188']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Quantitative analysis', y0: 96, dy: 80, txt: [0, 0, 1, 1, 1],
  lines: [K(`${PC('C')} = \\tfrac{12}{44} \\times \\tfrac{m_{\\mathrm{CO_2}} \\times 100}{m} \\qquad ${PC('H')} = \\tfrac{2}{18} \\times \\tfrac{m_{\\mathrm{H_2O}} \\times 100}{m}`), K(`\\text{Dumas: } ${PC('N')} = \\tfrac{28 \\times V \\times 100}{22400 \\times m}\\quad (V \\text{ at STP, mL})`), '<b>Kjeldahl</b>: N → (NH₄)₂SO₄ → NH₃ · fails for nitro, azo and ring N', '<b>Carius</b>: X as AgX · S as BaSO₄ (233) · P as phosphomolybdate (1877)', '<b>Oxygen</b>: 100 minus all the other percentages']] });
const YQ = ["Which tubes trap water and carbon dioxide in Liebig's method?", "Why does Kjeldahl's method fail for a nitro compound?", 'How is oxygen usually found?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 89', topic: 'Cooking gas, petrol and candle wax? Alkanes', y: 764 });
const avA = PUC.avatar($('#sJ'), { x: 976 + 300, y: 270 + 420, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So that is how the protein is found!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T1('S4') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  document.querySelectorAll('.job .jn').forEach(q => { if (q.offsetWidth > 236) q.style.fontSize = Math.floor(28 * 236 / q.offsetWidth) + 'px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const fit = (q, w) => { const k = q.firstElementChild; if (k && k.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / k.offsetWidth) + 'px'; };
  document.querySelectorAll('.fxc,.eqtop').forEach(q => fit(q, 712));
  document.querySelectorAll('.eqr,.nf').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); const room = 668 - (tg && tg.textContent ? tg.offsetWidth + 14 : 0); if (k && k.offsetWidth > room) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * room / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.sol .sx').forEach(q => { const w = q.closest('#so') ? 440 : 660; if (q.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const rowsOn = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < ids.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

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
    const tB = [tMorph + 0.6, tMorph + 0.9, wt('H2', 'much')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', CC, u)); jb.style.color = mix(CC, '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'much') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'percentage') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsOn(['#qr0', '#qr1', '#qr2', '#qr3'], tQr, T1('P3') + 0.4, t);
    M.vis($('#pw'), t, T0('P3') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pE'), t, T0('P3'), 1.4);
    PCH.forEach((_, i) => M.vis($('#pc' + i), t, wt('P3', 'hundred') + i * 0.2, 1e9, POP));
    M.vis($('#pP'), t, T1('P3') - 0.2, 1e9, POP);
  }

  /* S: Liebig */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tBurn = wt('S2', 'Burn'), tFlow = wt('S2', 'Carbon'), tEnd = T1('S4') - 1.5;
    fade(bFur, t, tBurn); bFl.forEach((f, i) => fade(f, t, tBurn + i * 0.08));
    bUL.forEach((e, i) => fade(e, t, i < 2 ? wt('S3', 'calcium') - 0.2 : wt('S3', 'potassium') - 0.2));
    const span = Math.max(0.1, tEnd - tFlow - 3.2);
    let nH = 0, nC = 0;
    [bHp, bCp].forEach((arr, k) => arr.forEach((e, i) => { const t0 = tFlow + (i / NP) * span + k * 0.25, dur = k ? 3.0 : 2.0, u = (t - t0) / dur; if (u < 0) { M.hide(e, true); return; } M.hide(e, false); let [x, y] = along(k ? PC2 : PH2, u); if (u >= 1) { if (k) nC++; else nH++; const j = i; x = (k ? 600 : 480) + ((j % 3) - 1) * 7; y = (k ? 330 : 330) + 36 - Math.floor(j / 3) * 14; } attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); }));
    fillC(bBoat, mix(CC, '#D7DCE3', M.clamp((t - tFlow) / (span + 2))));
    const TAG = [[tS1 + 0.3, 'READY'], [tBurn, 'BURNING'], [tFlow, 'CO₂ AND H₂O FLOW'], [T0('S4'), 'WEIGH THE TUBES']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, T0('S2') - 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#gh1'), t, T0('S2'), 1e9, POP);
    const RV = ['0.246', (0.1014 * nH / NP).toFixed(4), (0.198 * nC / NP).toFixed(3)];
    RV.forEach((s, i) => { const el = $('#rd' + i); M.vis(el, t, T0('S2') + i * 0.15, 1e9, { dy: 16 }); const cv = el.querySelector('.cv'); M.setT(cv, s); cv.style.color = [HC, HH, CC][i]; });
    M.vis($('#eb0'), t, wt('S2', 'Carbon') - 0.1, 1e9, { dy: 16 }); M.vis($('#eb1'), t, wt('S2', 'Hydrogen') - 0.1, 1e9, { dy: 16 });
  }

  /* L: derivation */
  const lOn = t >= tL1 - 0.1 && t < tJ1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('J1');
    M.vis($('#la'), t, tL1 + 0.05, z, { dy: 36, ...o });
    rowsOn(['#ls0', '#ls1', '#ls2'], [T0('L1'), T0('L2'), T0('L3')], T1('L3') + 0.3, t);
    M.vis($('#lsP'), t, wt('L2', 'compound') - 0.1, 1e9, POP);
    M.vis($('#lb'), t, tL1 + 0.3, z, { dx: 60, dy: 0, ...o });
    lCO.forEach((g, i) => fade(g, t, tL1 + 0.5 + i * 0.1)); fade(lB1[0], t, tL1 + 0.6);
    lM1.forEach((e, i) => fade(e, t, wt('L1', 'Forty') + i * 0.25));
    [...lHO, lB2].forEach((g, i) => fade(g, t, T0('L3') + i * 0.1)); lM2.forEach((e, i) => fade(e, t, wt('L3', 'Eighteen') + i * 0.25)); fade(lH2, t, wt('L3', 'two'));
  }

  /* J: nitrogen */
  const jOn = t >= tJ1 - 0.1 && t < tG1 + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const z = OUT('G1');
    M.vis($('#ja'), t, tJ1 + 0.05, z, { dy: 36, ...o });
    const tH = wt('J1', 'heated'), tGas = wt('J1', 'gas'), tGe = T1('J3');
    jFl.forEach((f, i) => fade(f, t, tH + i * 0.1)); fade(jL[2], t, tJ1 + 0.4); fade(jL[1], t, wt('J2', 'potassium')); fade(jL[0], t, wt('J2', 'volume')); fade(jL[3], t, wt('J3', 'twenty'));
    const g = M.clamp((t - tGas) / (tGe - tGas)); attr(jGas, 'height', (g * 150).toFixed(1));
    jBub.forEach((e, i) => { const ph = ((t - tGas) / 1.4 + i / 4) % 1; attr(e, 'cx', 570 + (i % 2 ? 7 : -7)); attr(e, 'cy', (390 - ph * (290 - g * 150)).toFixed(1)); M.hide(e, !(t > tGas && t < tGe)); });
    M.vis($('#je0'), t, wt('J3', 'standard') - 0.1, 1e9, { dy: 16 });
    M.vis($('#jb'), t, T0('J4') - 0.2, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#jk0', '#jk1', '#jk2'], JK.map(r => wt(r[2], r[3])), T1('J5') + 0.3, t);
    M.vis($('#jk3'), t, wt('J5', 'tells') - 0.1, 1e9, { dy: 16 });
    M.vis($('#jkP'), t, wt('J6', 'fails') - 0.1, 1e9, POP);
    avA(t, T1('J6') - 0.1, z);
  }

  /* G: Carius */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dy: 36, ...o });
    const tHeat = wt('G1', 'Heat'), tX = wt('G2', 'silver'), tS = wt('G3', 'barium'), tP = wt('G4', 'phosphomolybdate');
    gFl.forEach((f, i) => fade(f, t, tHeat + i * 0.08)); fade(gL[0], t, tG1 + 0.4); fade(gL[1], t, wt('G1', 'fuming'));
    fillC(gFur, mix('#F4F2EC', '#FFE9D2', M.io((t - tHeat) / 0.6)));
    const ph = t < tS ? 0 : t < tP ? 1 : 2, tst = [tX, tS, tP][ph];
    const u = M.io((t - tst + 0.2) / 0.8); attr(gSol, 'width', (u * 180).toFixed(1)); attr(gSol, 'x', (392 - u * 90).toFixed(1));
    fillC(gSol, ['#F3E6A6', '#FFFFFF', '#E8C547'][ph]);
    M.setT(gL[2], ['AgBr · PALE YELLOW', 'BaSO₄ · WHITE', 'PHOSPHOMOLYBDATE · YELLOW'][ph]); attr(gL[2], 'fill', [BR, HC, '#B7791F'][ph]); fade(gL[2], t, tX - 0.1);
    M.setT(gL[3], 'FILTER, DRY, WEIGH: m₁'); fade(gL[3], t, wt('G2', 'weigh'));
    M.vis($('#gb'), t, T0('G2') - 0.2, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#gn0', '#gn1', '#gn2', '#gn3'], tGn, T1('G5') + 0.3, t);
    M.vis($('#gnP'), t, wt('G2', 'weigh') + 0.2, 1e9, POP);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    CROWS.forEach((_, i) => M.vis($('#cd' + i), t, wt('C1', 'every') - 0.2 + i * 0.15, 1e9, { dy: 16 }));
    M.vis($('#caV'), t, wt('C1', 'compound') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    CROWS.forEach((_, i) => M.vis($('#ck' + i), t, (i ? wt('C2', 'misses') : wt('C2', 'quick')) + i * 0.2, 1e9, { dy: 16 }));
    M.vis($('#cfV'), t, wt('C2', 'ring'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Kjeldahl') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Mass') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'hundred') - 0.6, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wbar'), t, T0('W3'), 1e9, { dy: 16 });
    const uc = M.io((t - wt('W3', 'twenty')) / 0.6), uh = M.io((t - wt('W4', 'four')) / 0.6), ur = M.io((t - T0('W5')) / 0.6), W = 712;
    snap($('#wbC'), 'width', (uc * W * 0.2195).toFixed(1) + 'px'); const h = $('#wbH'); snap(h, 'left', (uc * W * 0.2195).toFixed(1) + 'px'); snap(h, 'width', (uh * W * 0.0458).toFixed(1) + 'px');
    const r = $('#wbR'); snap(r, 'left', (W * (0.2195 * uc + 0.0458 * uh)).toFixed(1) + 'px'); snap(r, 'width', (ur * W * 0.7347).toFixed(1) + 'px');
    M.vis($('#wt0'), t, wt('W3', 'twenty') - 0.1, 1e9, { dy: 16 }); M.vis($('#wt1'), t, wt('W4', 'four') - 0.1, 1e9, { dy: 16 });
    M.vis($('#wV'), t, T0('W5') + 0.2, 1e9, { dy: 16 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'one') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Use') - 0.2 });
    fade(tq1, t, wt('X3', 'water')); fade(tq2, t, wt('X3', 'two')); fade(tq3, t, wt('X3', 'Use'));
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE')], tType: wt('E1', 'masses') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.1, tCount, tAns });
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
