// PUC Chemistry Ep 87: Qualitative analysis of organic compounds (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: nitrogen teal, sulphur gold, halogen blue, phosphorus violet, sodium ink, electron e- orange; test colours in their real colours
const NC = C.ac, SC = '#B7791F', XC2 = '#2F6FEB', PC = '#7A4FE0', NA = C.ink, EC = '#C8461B', HC = C.ink, OK = C.ok, RD = C.red, CG = '#6B7280';
const PBL = '#1F3A93', BRED = '#9B111E', BLK = '#2A2A2A', VIO = '#7A2E8E', YEL = '#E8C547', PYEL = '#F3E6A6', WHT = '#FFFFFF', PALE = '#EEF3DC';
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
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); const tx = txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); g._t = tx; place(g, x, y); return g; };
const flame = (p, x, y) => mk(p, 'path', { d: `M${x} ${y - 34} C${x + 14} ${y - 18} ${x + 14} ${y} ${x} ${y} C${x - 14} ${y} ${x - 14} ${y - 18} ${x} ${y - 34} Z`, fill: '#D9731A' });
const tube = (p, x, top, bot, w = 56) => { const g = mk(p, 'g', {}); const liq = mk(g, 'path', { d: '', fill: PALE }); mk(g, 'path', { d: `M${x - w / 2} ${top} V${bot - w / 2} A${w / 2} ${w / 2} 0 0 0 ${x + w / 2} ${bot - w / 2} V${top}`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); g._liq = liq; g._lv = (y0) => attr(liq, 'd', `M${x - w / 2 + 2} ${y0} V${bot - w / 2} A${w / 2 - 2} ${w / 2 - 2} 0 0 0 ${x + w / 2 - 2} ${bot - w / 2} V${y0} Z`); return g; };
const fl = (x, y, s) => { const w = 100 * s, n = 20 * s, h = 112 * s, nk = 36 * s; return { liq: `M${x - w * 0.62} ${y - h * 0.38} L${x - w} ${y} H${x + w} L${x + w * 0.62} ${y - h * 0.38} Z`, glass: `M${x - n} ${y - h - nk} V${y - h * 0.68} L${x - w} ${y} H${x + w} L${x + n} ${y - h * 0.68} V${y - h - nk}` }; };
const flask = (p, x, y, s, col) => { const g = mk(p, 'g', {}); const d = fl(x, y, s); const liq = mk(g, 'path', { d: d.liq, fill: col }); mk(g, 'path', { d: d.glass, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' }); return { g, liq }; };

Object.assign(M.IC, {
  detector: ['M4 20l7-7', 'M14 4a6 6 0 1 1 0 12a6 6 0 0 1 0-12z', 'M14 8v4'],
  cup: ['M6 6h12l-1.5 14h-9z', 'M7 11h10'],
  bubble: ['M9 14a4 4 0 1 0 0.01 0', 'M16 6a2.5 2.5 0 1 0 0.01 0', 'M17 15a1.5 1.5 0 1 0 0.01 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tL1 = T0('L1'), tM1 = T0('M1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['detector', 'Metal detector', 'FINDS A HIDDEN COIN', 'BEEP'], ['cup', 'Lime water', 'TURNS MILKY', 'MILKY'], ['bubble', 'Tube in water', 'BUBBLES SHOW THE HOLE', 'BUBBLES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'detector'), wt('H1', 'lime'), wt('H2', 'signal')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, bd], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${NC}">${bd}</div></div>`).join('');
const KIT = [['Bubbles from one spot', 'Bubbles', 'H3'], ['The hole was too small to see', 'hole', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('bubble', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: C and H ---------- */
const QR = [['Carbon is always there', 'C', 'P1', 'carbon', CG], ['Which others hide inside?', 'N · S · X · P', 'P1', 'hide', NC], ['Carbon and hydrogen first', 'CuO TEST', 'P3', 'carbon', SC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pA = tube(ps, 150, 110, 300, 60); pA._lv(240); fillC(pA._liq, '#3A3A3A');
const pFl = flame(ps, 150, 344);
const pPipe = mk(ps, 'path', { d: 'M150 96 V76 H540 V170', stroke: C.ink2, 'stroke-width': 8, fill: 'none', 'stroke-linejoin': 'round' });
mk(ps, 'path', { d: 'M150 96 V76 H540 V170', stroke: '#fff', 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round' });
const pBulb = mk(ps, 'circle', { cx: 330, cy: 76, r: 26, fill: WHT, stroke: C.ink2, 'stroke-width': 4 });
const pB = tube(ps, 540, 130, 330, 64); pB._lv(200); fillC(pB._liq, '#E3EEF8');
const pBub = Array.from({ length: 5 }, () => mk(ps, 'circle', { r: 5, fill: 'none', stroke: C.ink2, 'stroke-width': 2 }));
const pL = [lab(ps, 190, 250, '← COMPOUND + CuO', HC, { 'font-size': 17 }), lab(ps, 360, 126, 'ANHYDROUS CuSO₄', HC, { 'font-size': 17 }), lab(ps, 600, 250, 'LIME', HC, { 'font-size': 17 }), lab(ps, 600, 274, 'WATER', HC, { 'font-size': 17 })];
const pTag = [lab(ps, 330, 160, '', XC2, { 'font-size': 17, 'text-anchor': 'middle', 'font-weight': 700 }), lab(ps, 540, 364, '', HC, { 'font-size': 17, 'text-anchor': 'middle', 'font-weight': 700 })];
$('#pes').innerHTML = eqrow('pe0', 392, '\\mathrm{C} + 2\\mathrm{CuO} \\rightarrow 2\\mathrm{Cu} + \\mathrm{CO_2}', 'LIME WATER MILKY', HC) + eqrow('pe1', 482, '2\\mathrm{H} + \\mathrm{CuO} \\rightarrow \\mathrm{Cu} + \\mathrm{H_2O}', 'CuSO₄ TURNS BLUE', XC2);

/* ---------- S: sodium fusion bench ---------- */
const b = $('#bS');
const RY = [150, 300, 450];
const bBond = [mk(b, 'line', { x1: 380, y1: RY[0], x2: 470, y2: RY[0], stroke: C.ink2, 'stroke-width': 6 }), mk(b, 'line', { x1: 380, y1: RY[1], x2: 470, y2: RY[1], stroke: C.ink2, 'stroke-width': 6 }), mk(b, 'line', { x1: 380, y1: RY[2], x2: 470, y2: RY[2], stroke: C.ink2, 'stroke-width': 6 })];
const bShare = RY.map(y => [mk(b, 'circle', { cx: 418, cy: y - 14, r: 5, fill: HC }), mk(b, 'circle', { cx: 432, cy: y - 14, r: 5, fill: HC })]);
const bC = RY.map(y => atom(b, 380, y, 30, CG, 'C', 22));
const bX = [atom(b, 470, RY[0], 30, NC, 'N', 22), atom(b, 470, RY[1], 34, SC, 'S', 22), atom(b, 470, RY[2], 30, XC2, 'X', 22)];
const bNa = [atom(b, 130, RY[0], 28, NA, 'Na', 18), atom(b, 130, RY[1] - 36, 28, NA, 'Na', 18), atom(b, 130, RY[1] + 36, 28, NA, 'Na', 18), atom(b, 130, RY[2], 28, NA, 'Na', 18)];
const bE = bNa.map(() => mk(b, 'circle', { r: 9, fill: EC }));
const bEdst = [[425, RY[0] - 40], [470, RY[1] - 46], [470, RY[1] + 46], [470, RY[2] - 42]];
const bIon = [lab(b, 425, RY[0] + 62, 'CN⁻', NC, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700 }), lab(b, 470, RY[1] + 76, 'S²⁻', SC, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700 }), lab(b, 470, RY[2] + 60, 'X⁻', XC2, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700 })];
const bSalt = [lab(b, 600, RY[0] + 8, 'NaCN', NC, { 'font-size': 26, 'font-weight': 700 }), lab(b, 600, RY[1] + 8, 'Na₂S', SC, { 'font-size': 26, 'font-weight': 700 }), lab(b, 600, RY[2] + 8, 'NaX', XC2, { 'font-size': 26, 'font-weight': 700 })];
const bHid = lab(b, 392, 540, 'IN THE COMPOUND: SHARED ELECTRONS, HIDDEN', RD, { 'text-anchor': 'middle', 'font-size': 18 });
const bExt = lab(b, 392, 540, 'IONS DISSOLVE IN WATER → SODIUM FUSION EXTRACT', OK, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700 });
const LQ = [['Held by shared electrons', 'HIDDEN', 'L1', 'shared', RD], ['Melt with sodium metal', 'SODIUM FUSION', 'L2', 'sodium', NA], ['Ions dissolve in water', 'EXTRACT', 'S4', 'dissolve', OK]];
$('#lqs').innerHTML = LQ.map(([q, k, , , c], i) => `<div class="rowl" id="lq${i}" style="top:${84 + i * 76}px"><span>${q}</span><span class="tg" style="color:${c}">${k}</span></div>`).join('');
const tLq = LQ.map(r => wt(r[2], r[3]));
const e1 = tc(EC, '\\mathrm{e^-}');
$('#ebs').innerHTML = eqrow('eb0', 320, `\\mathrm{Na} + \\mathrm{C} + ${tc(NC, '\\mathrm{N}')} \\rightarrow \\mathrm{Na}${tc(NC, '\\mathrm{CN}')}`, 'CYANIDE', NC) + eqrow('eb1', 404, `2\\mathrm{Na} + ${tc(SC, '\\mathrm{S}')} \\rightarrow \\mathrm{Na_2}${tc(SC, '\\mathrm{S}')}`, 'SULPHIDE', SC) + eqrow('eb2', 488, `\\mathrm{Na} + ${tc(XC2, '\\mathrm{X}')} \\rightarrow \\mathrm{Na}${tc(XC2, '\\mathrm{X}')}`, 'HALIDE', XC2);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- N: four tests ---------- */
const ns = $('#nS');
const TX = [130, 300, 470, 640], TT = [['N', NC], ['S', SC], ['X', XC2], ['P', PC]];
const nT = TX.map(x => { const g = tube(ns, x, 110, 380, 70); g._lv(250); return g; });
const nPpt = TX.map(x => mk(ns, 'rect', { x: x - 33, y: 380, width: 66, height: 0, fill: BLK }));
const nLab = TT.map(([s, c], i) => lab(ns, TX[i], 90, s, c, { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 700, 'font-family': 'Poppins' }));
const nRes = TX.map(x => lab(ns, x, 420, '', HC, { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 700 }));
const nRes2 = TX.map(x => lab(ns, x, 444, '', C.mute, { 'text-anchor': 'middle', 'font-size': 15 }));
const NG = [
  ['NITROGEN · PRUSSIAN BLUE', [eqrow('n00', 84, `6${tc(NC, '\\mathrm{CN^-}')} + \\mathrm{Fe^{2+}} \\rightarrow [\\mathrm{Fe(}${tc(NC, '\\mathrm{CN}')}\\mathrm{)_6}]^{4-}`, 'COMPLEX ION', NC), eqrow('n01', 176, '\\mathrm{Fe^{2+}} \\rightarrow \\mathrm{Fe^{3+}}', 'SOME OXIDISED', HC), eqrow('n02', 268, `3[\\mathrm{Fe(CN)_6}]^{4-} + 4\\mathrm{Fe^{3+}} \\rightarrow \\mathrm{Fe_4[Fe(CN)_6]_3}`, 'PRUSSIAN BLUE', PBL)].join('') + `<div class="pillp" id="n0P" style="left:36px;top:478px;background:${PBL};color:#fff">Prussian blue = nitrogen</div>`],
  ['SULPHUR · BLACK OR VIOLET', [eqrow('n10', 84, `${tc(SC, '\\mathrm{S^{2-}}')} + \\mathrm{Pb^{2+}} \\rightarrow \\mathrm{Pb}${tc(SC, '\\mathrm{S}')}`, 'BLACK SOLID', BLK), eqrow('n11', 176, `${tc(SC, '\\mathrm{S^{2-}}')} + [\\mathrm{Fe(CN)_5NO}]^{2-} \\rightarrow [\\mathrm{Fe(CN)_5NO}${tc(SC, '\\mathrm{S}')}]^{4-}`, 'VIOLET', VIO)].join('') + `<div class="pillp" id="n1P" style="left:36px;top:478px">Lead acetate or sodium nitroprusside</div>`],
  ['HALOGENS · SILVER HALIDE', [eqrow('n20', 84, `${tc(XC2, '\\mathrm{X^-}')} + \\mathrm{Ag^+} \\rightarrow \\mathrm{Ag}${tc(XC2, '\\mathrm{X}')}`, 'SOLID', HC), `<div class="rowl" id="n21" style="top:176px"><i class="sw2" style="background:${WHT}"></i><span>AgCl · white</span><span class="tg" style="color:${OK}">DISSOLVES IN NH₃</span></div>`, `<div class="rowl" id="n22" style="top:256px"><i class="sw2" style="background:${PYEL}"></i><span>AgBr · pale yellow</span><span class="tg" style="color:${SC}">A LITTLE</span></div>`, `<div class="rowl" id="n23" style="top:336px"><i class="sw2" style="background:${YEL}"></i><span>AgI · yellow</span><span class="tg" style="color:${RD}">DOES NOT</span></div>`].join('') + `<div class="pillp" id="n2P" style="left:36px;top:478px">Nitric acid first, then silver nitrate</div>`],
  ['PHOSPHORUS · YELLOW', [eqrow('n30', 84, `${tc(PC, '\\mathrm{P}')} \\xrightarrow{\\mathrm{Na_2O_2}} ${tc(PC, '\\mathrm{PO_4^{3-}}')}`, 'PHOSPHATE', PC), eqrow('n31', 176, `${tc(PC, '\\mathrm{PO_4^{3-}}')} + \\text{ammonium molybdate}`, 'BOIL WITH HNO₃', HC), eqrow('n32', 268, `(\\mathrm{NH_4})_3${tc(PC, '\\mathrm{PO_4}')} \\cdot 12\\mathrm{MoO_3}`, 'YELLOW', SC)].join('') + `<div class="pillp" id="n3P" style="left:36px;top:478px">Ammonium phosphomolybdate</div>`]];
$('#ngs').innerHTML = NG.map(([, h], i) => `<div class="grp" id="ng${i}">${h}</div>`).join('');
const avA = PUC.avatar($('#sN'), { x: 160 + 350, y: 270 + 506, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like the bubbles showing the hole!' });

/* ---------- C: compare ---------- */
const cA = flask($('#caS'), 392, 360, 1.1, PBL), cB = flask($('#cfS'), 392, 360, 1.1, BRED);
const cLa = lab($('#caS'), 392, 120, 'CN⁻ ONLY', NC, { 'text-anchor': 'middle' }), cLb = lab($('#cfS'), 392, 120, 'SCN⁻ (THIOCYANATE)', SC, { 'text-anchor': 'middle' });
$('#caV').innerHTML = `<span style="color:${PBL}">Prussian blue</span>`;
$('#cfV').innerHTML = K(`\\mathrm{Fe^{3+}} + \\mathrm{SCN^-} \\rightarrow \\textcolor{${BRED}}{[\\mathrm{Fe(SCN)}]^{2+}}`);
const th1 = PUC.think($('#th1'), { q: 'Why use extra sodium in the fusion?', opts: ['To make it hotter', 'To break up thiocyanate'], right: 1, why: 'Extra sodium splits thiocyanate into cyanide and sulphide, so both tests show.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{covalent (hidden)} \\xrightarrow{\\ \\mathrm{Na}\\ } \\text{ions} \\rightarrow \\text{colours}`);

/* ---------- W ---------- */
const WR = [['No Prussian blue', 'NO N', RD], ['Violet with nitroprusside', 'S PRESENT', SC], ['Yellow solid, no dissolving in NH₃', 'I PRESENT', XC2]];
$('#wrs2').innerHTML = WR.map(([s, tg, c], i) => `<div class="rowl" id="wq${i + 2}" style="top:${96 + i * 96}px;height:76px"><span style="font-size:23px">${s}</span><span class="tg" id="wt${i}" style="color:${c}">${tg}</span></div>`).join('') + `<div class="pillp good" id="wP" style="left:36px;top:478px">Read each colour, name the element</div>`;
const ws = $('#wS');
const wC = atom(ws, 180, 240, 54, CG, 'C', 34), wN = atom(ws, 330, 240, 54, '#D7DCE3', 'N', 34), wS = atom(ws, 480, 240, 54, SC, 'S', 34), wI = atom(ws, 630, 240, 54, XC2, 'I', 34);
const wX = mk(ws, 'path', { d: 'M290 200 L370 280 M370 200 L290 280', stroke: RD, 'stroke-width': 7, 'stroke-linecap': 'round' });
$('#wV').innerHTML = `<span style="color:${SC}">sulphur</span><span>+</span><span style="color:${XC2}">iodine</span>`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Add ${K('\\mathrm{AgNO_3}')} straight to the extract`, right: `Boil with ${K('\\mathrm{HNO_3}')} first, then add ${K('\\mathrm{AgNO_3}')}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 100, 'CN⁻ + Ag⁺ → AgCN (white)', { 'font-size': 23, fill: NC, 'font-weight': 700 }), tq2 = txt(tsv, 40, 150, 'S²⁻ + Ag⁺ → Ag₂S (black)', { 'font-size': 23, fill: SC, 'font-weight': 700 }), tq3 = txt(tsv, 40, 200, 'HNO₃ REMOVES BOTH', { 'font-size': 24, fill: OK, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Which elements the sodium fusion extract detects; the colour and reaction of each test' });
const OPT = ['\\text{Thiourea, }(\\mathrm{NH_2})_2\\mathrm{CS}', '\\text{Urea, }(\\mathrm{NH_2})_2\\mathrm{CO}', '\\mathrm{C_6H_5SO_3H}', '\\mathrm{C_6H_5Cl}'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A sodium fusion extract made with too little sodium gives a blood red colour with Fe³⁺. The compound could be:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 26 });
const so = PUC.solution($('#so'), [['Blood red = SCN⁻: N and S'], ['Thiourea: N ✓ S ✓'], ['Urea: no S · C₆H₅SO₃H: no N'], ['C₆H₅Cl: neither']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Chlorobenzene') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Qualitative analysis', y0: 96, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>C, H</b>: heat with CuO · CO₂ turns lime water milky · H₂O turns CuSO₄ blue', '<b>Lassaigne</b>: fuse with Na → NaCN, Na₂S, NaX (ions dissolve in water)', '<b>N</b>: FeSO₄, then H₂SO₄ → Prussian blue · <b>N + S</b>: Fe³⁺ → blood red', '<b>S</b>: lead acetate → black PbS · sodium nitroprusside → violet', '<b>X</b>: HNO₃, then AgNO₃ · Cl white, Br pale yellow, I yellow · <b>P</b>: yellow'] });
const YQ = ['Why is the compound fused with sodium?', 'What colour shows nitrogen?', 'Which halogen gives a yellow solid that does not dissolve in ammonia?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 88', topic: 'We know what is inside. How much? Quantitative analysis', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S3') - 0.2, 1.05, 960, 560], [T1('S4') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  document.querySelectorAll('.job .jn').forEach(q => { if (q.offsetWidth > 236) q.style.fontSize = Math.floor(28 * 236 / q.offsetWidth) + 'px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
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
    const tB = [wt('H2', 'hidden'), wt('H2', 'signal'), wt('H2', 'see')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', NC, u)); jb.style.color = mix(NC, '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'see') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'colour') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsOn(['#qr0', '#qr1', '#qr2'], tQr, T1('P5') + 0.4, t);
    M.vis($('#pP'), t, wt('P2', 'Qualitative') - 0.1, 1e9, POP);
    M.vis($('#pw'), t, T0('P3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tHeat = wt('P3', 'Heat');
    [pA, pPipe, pBulb, pB, pL[0], pL[1], pL[2], pL[3]].forEach(e => fade(e, t, T0('P3')));
    fade(pFl, t, tHeat);
    const tMilk = wt('P4', 'milky') - 0.3, tBlue = wt('P5', 'blue') - 0.3;
    fillC(pB._liq, mix('#E3EEF8', '#F7F3E6', M.io((t - tMilk) / 0.8))); attr(pB._liq, 'stroke', t > tMilk ? '#C9C2AE' : 'none');
    fillC(pBulb, mix(WHT, '#3B82D6', M.io((t - tBlue) / 0.8)));
    pBub.forEach((e, i) => { const ph = ((t - tHeat) / 1.2 + i / 5) % 1; attr(e, 'cx', 540 + (i % 2 ? 8 : -8)); attr(e, 'cy', (310 - ph * 100).toFixed(1)); M.hide(e, t < tHeat + 0.6); });
    M.setT(pTag[0], t > tBlue ? 'WHITE → BLUE' : ''); M.setT(pTag[1], t > tMilk ? 'MILKY' : '');
    M.vis($('#pe0'), t, wt('P4', 'Carbon') - 0.1, 1e9, { dy: 16 }); M.vis($('#pe1'), t, wt('P5', 'Hydrogen') - 0.1, 1e9, { dy: 16 });
  }

  /* S: sodium fusion */
  const sOn = t >= tL1 - 0.1 && t < tM1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('M1');
    M.vis($('#bn'), t, tL1 + 0.05, z, { dy: 36, ...o });
    const tS1 = T0('S1'), tE = [wt('S2', 'take'), wt('S3', 'two') - 0.2, wt('S3', 'two'), wt('S3', 'halogen')];
    [0, 1, 2].forEach(i => { fade(bC[i], t, tL1 + 0.2 + i * 0.1, i ? tE[i] : 1e9); fade(bX[i], t, tL1 + 0.3 + i * 0.1); fade(bBond[i], t, tL1 + 0.2, i ? tE[i] : 1e9); });
    bShare.forEach((pr, i) => pr.forEach(d => fade(d, t, wt('L1', 'shared') - 0.2, i ? tE[i] : tE[0])));
    fade(bHid, t, wt('L1', 'shared'), tS1);
    bNa.forEach((g, i) => fade(g, t, tS1 + 0.3 + i * 0.1));
    bE.forEach((e, i) => { const [x0, y0] = [130, [RY[0], RY[1] - 36, RY[1] + 36, RY[2]][i]], [x1, y1] = bEdst[i]; const u = M.io((t - tE[i]) / 0.8); attr(e, 'cx', (M.lerp(x0 + 34, x1, u)).toFixed(1)); attr(e, 'cy', (M.lerp(y0 - 26, y1, u) - Math.sin(u * Math.PI) * 30).toFixed(1)); fade(e, t, wt('S1', 'electron') - 0.2 + (i ? 0.3 : 0)); });
    bNa.forEach((g, i) => M.setT(g._t, t > tE[i] + 0.6 ? 'Na⁺' : 'Na'));
    bIon.forEach((e, i) => fade(e, t, tE[i === 0 ? 0 : i === 1 ? 2 : 3] + 0.6)); bSalt.forEach((e, i) => fade(e, t, tE[i === 0 ? 0 : i === 1 ? 2 : 3] + 0.9));
    fade(bExt, t, wt('S4', 'dissolve'));
    const TAG = [[tL1 + 0.3, 'COVALENT · HIDDEN'], [tS1, 'ADD SODIUM'], [tE[0], 'ELECTRONS MOVE'], [T0('S4'), 'NOW IONS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tL1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, tL1 + 0.3, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#lq0', '#lq1', '#lq2'], tLq, T1('S4') + 0.3, t);
    ['#eb0', '#eb1', '#eb2'].forEach((id, i) => M.vis($(id), t, tE[i === 0 ? 0 : i === 1 ? 2 : 3] + 0.4, 1e9, { dy: 16 }));
  }

  /* N: four tests */
  const nOn = t >= tM1 - 0.1 && t < tC1 + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const z = OUT('C1');
    M.vis($('#na'), t, tM1 + 0.05, z, { dy: 36, ...o });
    const PH = [tM1, T0('U1'), T0('Z1'), T0('O1')];
    let cur = 0; PH.forEach((p, i) => { if (t >= p - 0.2) cur = i; });
    nT.forEach((g, i) => { fade(g, t, tM1 + 0.2 + i * 0.1, 1e9, 0.25, i === cur ? 1 : t >= PH[i] ? 0.75 : 0.4); fade(nLab[i], t, tM1 + 0.2 + i * 0.1, 1e9, 0.25, i === cur ? 1 : 0.5); });
    // N tube
    const tPB = wt('M3', 'deep') - 0.2;
    fillC(nT[0]._liq, t < wt('M1', 'iron') ? PALE : mix('#D9EAC0', PBL, M.io((t - tPB) / 0.8)));
    M.setT(nRes[0], t > tPB ? 'PRUSSIAN BLUE' : ''); M.setT(nRes2[0], t > tPB ? 'NITROGEN' : '');
    // S tube
    const tPb = wt('U1', 'black') - 0.2, tVi = wt('U2', 'violet') - 0.2;
    const ph1 = M.io((t - tPb) / 0.8); attr(nPpt[1], 'y', (380 - ph1 * 50 * (t < tVi ? 1 : 0)).toFixed(1)); attr(nPpt[1], 'height', (ph1 * 50 * (t < tVi ? 1 : 0)).toFixed(1));
    fillC(nT[1]._liq, t < tVi ? PALE : mix(PALE, VIO, M.io((t - tVi) / 0.6)));
    M.setT(nRes[1], t > tVi ? 'VIOLET' : t > tPb ? 'BLACK PbS' : ''); M.setT(nRes2[1], t > tPb ? 'SULPHUR' : '');
    // X tube
    const tXs = [wt('Z2', 'white'), wt('Z3', 'Pale'), wt('Z4', 'Yellow')], XCOL = [WHT, PYEL, YEL], XN = ['AgCl · WHITE', 'AgBr · PALE YELLOW', 'AgI · YELLOW'];
    let xi = -1; tXs.forEach((tt, i) => { if (t >= tt - 0.2) xi = i; });
    attr(nPpt[2], 'y', xi < 0 ? 380 : 330); attr(nPpt[2], 'height', xi < 0 ? 0 : 50); fillC(nPpt[2], xi < 0 ? WHT : XCOL[xi]); attr(nPpt[2], 'stroke', '#B8B2A0');
    M.setT(nRes[2], xi < 0 ? '' : XN[xi]); M.setT(nRes2[2], xi < 0 ? '' : ['CHLORINE', 'BROMINE', 'IODINE'][xi]);
    // P tube
    const tY2 = wt('O2', 'yellow') - 0.2; fillC(nT[3]._liq, mix(PALE, YEL, M.io((t - tY2) / 0.6)));
    M.setT(nRes[3], t > tY2 ? 'YELLOW' : ''); M.setT(nRes2[3], t > tY2 ? 'PHOSPHORUS' : '');
    M.vis($('#nb'), t, tM1 + 0.3, z, { dx: 60, dy: 0, ...o });
    M.setT($('#nbL'), NG[cur][0]);
    NG.forEach((_, i) => fade($('#ng' + i), t, PH[i] - 0.1, i < 3 ? PH[i + 1] - 0.25 : 1e9, 0.2));
    const R = [[['#n00', wt('M2', 'Cyanide')], ['#n01', wt('M2', 'Some')], ['#n02', wt('M3', 'Together')], ['#n0P', wt('M3', 'Prussian')]], [['#n10', wt('U1', 'lead')], ['#n11', wt('U2', 'nitroprusside')], ['#n1P', wt('U2', 'violet')]], [['#n20', wt('Z1', 'silver')], ['#n21', tXs[0]], ['#n22', tXs[1]], ['#n23', tXs[2]], ['#n2P', wt('Z4', 'iodine')]], [['#n30', wt('O1', 'peroxide')], ['#n31', wt('O2', 'molybdate')], ['#n32', tY2], ['#n3P', tY2 + 0.5]]];
    R.forEach(g => g.forEach(([id, tt]) => M.vis($(id), t, tt - 0.1, 1e9, id.endsWith('P') ? POP : { dy: 16 })));
    avA(t, T1('M3') - 0.2, T0('U1') + 2.5);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    fade(cA.g, t, wt('C1', 'Nitrogen')); fade(cLa, t, wt('C1', 'cyanide'));
    M.vis($('#caV'), t, wt('C1', 'Prussian') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    fade(cB.g, t, wt('C2', 'blood') - 0.3); fade(cLb, t, wt('C2', 'thiocyanate'));
    M.vis($('#cfV'), t, wt('C2', 'blood'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'extra') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'breaks') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Sodium') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'colours') - 0.4, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const tc3 = [wt('W2', 'Prussian'), wt('W2', 'nitroprusside'), wt('W2', 'silver')], ti = [T0('W3'), T0('W4'), T0('W5')];
    [0, 1, 2].forEach(i => { M.vis($('#wq' + (i + 2)), t, tc3[i] - 0.1, 1e9, { dy: 16 }); M.vis($('#wt' + i), t, ti[i] + 0.2, 1e9, POP); const on = M.io((t - ti[i]) / 0.25) * (1 - M.io((t - (i < 2 ? ti[i + 1] : T1('W6'))) / 0.25)); setBg($('#wq' + (i + 2)), mix(C.soft, C.ac2, on)); });
    M.vis($('#wP'), t, T0('W6'), 1e9, POP);
    M.vis($('#wr'), t, T0('W3') - 0.2, out, { dx: 60, dy: 0, ...o });
    fade(wC, t, T0('W3')); fade(wN, t, T0('W3') + 0.3); fade(wX, t, wt('W3', 'no') ); fade(wS, t, ti[1] + 0.3); fade(wI, t, ti[2] + 0.3);
    M.vis($('#wV'), t, T0('W6') + 0.2, 1e9, { dy: 16 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'silver') - 0.2, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Boil') - 0.2 });
    fade(tq1, t, wt('X3', 'cyanide')); fade(tq2, t, wt('X3', 'sulphide')); fade(tq3, t, wt('X3', 'remove') - 0.2);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE')], tType: wt('E1', 'which') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Thiourea') - 0.1, tCount, tAns });
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
