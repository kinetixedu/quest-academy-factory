// PUC Chemistry Ep 70: Solubility product (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: Ba2+ / cation A teal, SO4 2- / anion B violet, Ksp gold, solubility s orange, ionic product Q blue, Na+ grey, dissolves green, solid falls out red
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', QC = '#2B6CB0', NA = '#9AA3B5', OK = C.ok, RD = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const col = (c, s) => `\\textcolor{${c}}{${s}}`;
const KS = col(GC, 'K_{sp}'), sX = col(XC, 's'), QQ = col(QC, 'Q'), tO = s => col(OK, s), tR = s => col(RD, s);
const BA = col(NC, '\\mathrm{Ba^{2+}}'), SO = col(OC, '\\mathrm{SO_4^{2-}}'), AP = col(NC, '\\mathrm{A^{+}}'), BM = col(OC, '\\mathrm{B^{-}}');
const EQ = `\\mathrm{BaSO_4(s)} \\rightleftharpoons ${BA}\\mathrm{(aq)} + ${SO}\\mathrm{(aq)}`;
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const ion = (p, c, r = 12) => mk(p, 'circle', { cx: 0, cy: 0, r, fill: c });
const mv = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };

Object.assign(M.IC, {
  drop: ['M12 2.7 6.3 9a7 7 0 1 0 11.4 0z'],
  chalk: ['M4 15 15 4l5 5L9 20H4z', 'M9 10l5 5'],
  kettle: ['M5 10h12v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z', 'M17 12h2a2 2 0 0 1 0 4h-2', 'M8 6h6l1 4H7z'],
  beaker: ['M7 3h10', 'M9 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L15 9V3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tR1 = T0('R1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['drop', 'Salt in water', 'DISSOLVES FAST', 'Salt', 'LOTS', OK], ['chalk', 'Chalk in water', 'JUST SINKS', 'Chalk', 'LITTLE', RD], ['kettle', 'Old kettle', 'WHITE CRUST', 'kettle', 'SOLID', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Stirred and stirred: still settles', 'stirs', 'H4'], ['Most of it stays at the bottom', 'bottom', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('beaker', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: three kinds ---------- */
const QR = [['Highly soluble', '> 0.1 M', 'P1', 'Highly', OK], ['Slightly soluble', '0.01 - 0.1 M', 'P2', 'Slightly', GC], ['Sparingly soluble', '< 0.01 M', 'P3', 'Sparingly', RD], ['Today: sparingly soluble salts', 'TODAY', 'P3', 'Today', NC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c};font-size:22px;top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const beakerS = (p, x, y, w, h, wy) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: x + 4, y: wy, width: w - 8, height: y + h - wy - 4, fill: '#E3F2F2', rx: 14 }); mk(g, 'path', { d: `M${x} ${y} V${y + h - 20} a20 20 0 0 0 20 20 H${x + w - 20} a20 20 0 0 0 20 -20 V${y}`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); return g; };
const PB = [[OK, 'HIGHLY', 14, 0], [GC, 'SLIGHTLY', 7, 5], [RD, 'SPARINGLY', 2, 14]].map(([c, lab, nIon, nSol], k) => {
  const x = 52 + k * 236, g = beakerS(ps, x, 120, 208, 300, 160);
  for (let i = 0; i < nIon; i++) mk(g, 'circle', { cx: x + 30 + (i * 53) % 150, cy: 190 + ((i * 37) % 160), r: 8, fill: i % 2 ? OC : NC });
  for (let i = 0; i < nSol; i++) { const r = Math.floor(i / 6), c2 = i % 6; mk(g, 'circle', { cx: x + 44 + c2 * 24 + (r % 2) * 12, cy: 398 - r * 22, r: 10, fill: (r + c2) % 2 ? OC : NC }); }
  txt(g, x + 104, 470, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: c, 'font-weight': 600 });
  return g;
});

/* ---------- bench (S and G) ---------- */
const BX = 392, PY = 482, PS = 28;
const cellXY = (r, c) => [BX + (c - 4.5) * PS, PY - r * PS];
const ctype = (r, c) => (r + c) % 2 ? OC : NC;
function bench(svg, skip) {
  beakerS(svg, 152, 110, 480, 390, 160);
  mk(svg, 'line', { x1: 160, y1: 160, x2: 624, y2: 160, stroke: '#9FD3D3', 'stroke-width': 3 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) { if (skip && skip(r, c)) continue; const [x, y] = cellXY(r, c); mk(svg, 'circle', { cx: x, cy: y, r: 12, fill: ctype(r, c) }); }
  const lg = mk(svg, 'g', {}); mk(lg, 'circle', { cx: 262, cy: 546, r: 10, fill: NC }); txt(lg, 280, 553, 'Ba²⁺', { 'font-size': 20, fill: HC, 'font-weight': 600 });
  mk(lg, 'circle', { cx: 412, cy: 546, r: 10, fill: OC }); txt(lg, 430, 553, 'SO₄²⁻', { 'font-size': 20, fill: HC, 'font-weight': 600 });
  return lg;
}
const b = $('#bS');
let bLg;
const ION_C = [1, 2, 3, 4, 5, 6, 7, 8];
bLg = bench(b, (r, c) => r === 2 && ION_C.includes(c));
const WAND = [[230, 220], [330, 300], [440, 210], [540, 290], [260, 360], [480, 370], [380, 250], [580, 205]];
const ions = ION_C.map(c => ion(b, ctype(2, c)));
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const tLv = ION_C.map((_, i) => i < 6 ? wt('S2', 'break') + i * 0.3 : 1e9), tCyc = wt('S3', 'stick') - 0.2, PER = 5;
const PH = [0.25, 0.62, 0.35, 0.55, 0.3, 0.45, 0.88, 0.95];
const outU = (i, t) => { if (t < tCyc) return M.io((t - tLv[i]) / 1.0); const ph = (((t - tCyc) / PER + PH[i]) % 1 + 1) % 1; return ph < 0.15 ? M.io(ph / 0.15) : ph < 0.7 ? 1 : ph < 0.85 ? 1 - M.io((ph - 0.7) / 0.15) : 0; };
const wand = (i, t) => [WAND[i][0] + 26 * Math.sin(0.9 * t + i), WAND[i][1] + 20 * Math.cos(0.7 * t + 2 * i)];
const es = $('#eS'), GX0 = 110, GX1 = 720, GY0 = 180, GY1 = 400, gTa = () => T0('S2'), gTb = () => T1('S5');
mk(es, 'path', { d: `M${GX0} ${GY0 - 10} V${GY1} H${GX1}`, stroke: HC, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' });
txt(es, GX1, GY1 + 26, 'TIME →', { 'text-anchor': 'end', 'font-size': 16 }); txt(es, GX0 + 12, GY0 - 2, 'IONS IN WATER', { 'font-size': 16 });
const satL = mk(es, 'line', { x1: GX0, x2: GX1, y1: GY1 - 5.6 * 30, y2: GY1 - 5.6 * 30, stroke: GC, 'stroke-width': 2.5, 'stroke-dasharray': '10 8' });
const satT = txt(es, GX1, GY0 - 2, 'SATURATED · COUNT STEADY', { 'text-anchor': 'end', 'font-size': 18, fill: GC, 'font-weight': 600 });
const gLine = mk(es, 'polyline', { points: '', fill: 'none', stroke: NC, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const rateRow = (y, lab, c) => { const g = mk(es, 'g', {}); txt(g, 40, y + 22, lab, { 'font-size': 18, fill: c, 'font-weight': 600 }); mk(g, 'rect', { x: 250, y, width: 420, height: 30, rx: 8, fill: C.soft }); const r = mk(g, 'rect', { x: 250, y, width: 0, height: 30, rx: 8, fill: c }); return { g, r }; };
const rLeave = rateRow(452, 'LEAVING', NC), rBack = rateRow(504, 'RETURNING', OC);
$('#bEq').innerHTML = K(EQ);

/* ---------- L ---------- */
$('#hcI').innerHTML = M.icon('beaker', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`${KS} = [${BA}]\\,[${SO}]`);
const LT = [[`<b>BaSO₄(s)</b><span>pure solid: left out of Ksp</span>`, () => wt('L2', 'Leave')], [`<b style="color:${GC}">1.1 × 10⁻¹⁰</b><span>Ksp of BaSO₄ at 298 K</span>`, () => wt('L3', 'one')], [`<b style="color:${GC}">0.000 000 000 11</b><span>a tiny number</span>`, () => wt('L3', 'Tiny')]];
$('#lts').innerHTML = LT.map(([h], i) => `<div class="tile" id="lt${i}" style="top:${90 + i * 112}px">${h}</div>`).join('');

/* ---------- D: AB and AB2 ---------- */
const MS = [[K(`[${AP}] = ${sX},\\quad [${BM}] = ${sX}`), 'D2'], [K(`${KS} = ${sX}\\times${sX} = ${sX}^2`), 'D3'], [K(`${sX} = \\sqrt{1.1\\times10^{-10}} = 1.05\\times10^{-5}`), 'D4']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${100 + i * 120}px"><div class="sn">${i + 1}</div><div class="stx" style="font-size:40px">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
$('#dP').innerHTML = `BaSO₄: s ≈ 1.05 × 10⁻⁵ mol L⁻¹`;
const A2 = col(NC, '\\mathrm{A^{2+}}');
const RL = [['One unit: one A, two B', K(`\\mathrm{AB_2(s)} \\rightleftharpoons ${A2} + 2${BM}`), () => T0('R2')], ['So [A] = s and [B] = 2s', K(`[${A2}] = ${sX},\\ \\ [${BM}] = 2${sX}`), () => wt('R2', 'So')], ['Ksp = s × (2s)²', K(`${KS} = ${sX}\\,(2${sX})^2 = 4${sX}^3`), () => T0('R3')], ['Any salt AxBy', K(`${KS} = x^x\\, y^y\\, ${sX}^{\\,x+y}`), () => T0('R4')]];
$('#rls').innerHTML = RL.map(([a, k], i) => `<div class="rule" id="rl${i}" style="top:${84 + i * 114}px"><div class="nn">${i + 1}</div><div class="rt">${a}</div><div class="rk">${k}</div></div>`).join('');
const tRl = RL.map(r => r[2]());

/* ---------- G: common ion ---------- */
const gs = $('#gS');
bench(gs);
const GW = [[0, NC, 250, 230], [1, OC, 360, 300], [2, NC, 470, 220], [3, OC, 560, 320]].map(([i, c, x, y]) => ({ e: ion(gs, c), x, y, i }));
const ADD = [0, 1, 2, 3].map(i => ({ s: ion(gs, OC), n1: ion(gs, NA, 8), n2: ion(gs, NA, 8), x: 220 + i * 110, y: 250 + (i % 2) * 90 }));
const NEWC = [3, 4, 5, 6];
const gtag = document.createElement('div'); gtag.className = 'btag'; gtag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#gb').appendChild(gtag);
$('#gEq').innerHTML = K(EQ);
const GR = [['Add Na₂SO₄: extra SO₄²⁻', 'SAME ION', OC, () => wt('G2', 'extra')], ['Ions now above Ksp', 'TOO HIGH', RD, () => wt('G3', 'above')], ['The balance shifts back', 'SHIFT ←', HC, () => wt('G4', 'shifts')], ['More BaSO₄ falls out', 'SOLID', OK, () => wt('G4', 'falls')]];
$('#grs').innerHTML = GR.map(([s, tg, c], i) => `<div class="eqr" id="gr${i}" style="top:${150 + i * 82}px;height:70px;font:600 25px Poppins">${s}<span class="tg" style="color:${c}">${tg}</span></div>`).join('');
const tGr = GR.map(g => g[3]());

/* ---------- C: Q vs Ksp ---------- */
const eqrow = (id, top, tex, tag, c) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${c}">${tag}</span></div>`;
$('#car').innerHTML = eqrow('ca0', 96, `${KS} = [${AP}][${BM}]`, 'AT SATURATION', GC) + eqrow('ca1', 190, `${QQ} = [${AP}][${BM}]`, 'RIGHT NOW', QC) +
  `<div class="ebk" id="caK" style="top:300px">SAME FORMULA · DIFFERENT MOMENT</div><div class="ebar" id="caB" style="top:332px"><i style="background:${QC}"></i><div class="mk2" style="left:60%"></div></div>` +
  `<div class="vt" id="caV" style="top:430px"><span style="color:${QC}">Q</span><span>vs</span><span style="color:${GC}">Ksp</span><span>decides</span></div>`;
$('#cfr').innerHTML = eqrow('cf0', 96, `${QQ} < ${KS}`, 'MORE DISSOLVES', OK) + eqrow('cf1', 190, `${QQ} = ${KS}`, 'SATURATED', GC) + eqrow('cf2', 284, `${QQ} > ${KS}`, '?', RD) +
  `<div class="ebk" style="top:400px">Q BAR VS THE Ksp LINE</div><div class="ebar" id="cfB" style="top:432px"><i style="background:${QC}"></i><div class="mk2" style="left:60%"></div></div>`;
const th1 = PUC.think($('#th1'), { q: 'Q is bigger than Ksp. What do you see in the beaker?', opts: ['More solid dissolves', 'A solid appears'], right: 1, why: 'A solid appears. Extra ions fall out as a precipitate until Q comes down to Ksp.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${QQ} > ${KS} \\Rightarrow ${tR('\\text{precipitate}')} \\qquad ${QQ} < ${KS} \\Rightarrow ${tO('\\text{dissolves}')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${KS} = 4${sX}^3 \\Rightarrow ${sX}^3 = 1.0\\times10^{-12}`)],
  [K(`${sX} = ${tO('1.0\\times10^{-4}')}\\ \\text{mol L}^{-1}`)],
  [K(`${KS} = ${sX}\\,(0.1)^2 \\quad (2${sX} \\ll 0.1)`)],
  [K(`${sX} = 4.0\\times10^{-12} \\div 0.01 = ${tR('4.0\\times10^{-10}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W6'), T0('W7')];
const WT = [[`<b style="color:${OK}">1.0 × 10⁻⁴</b><span>in pure water</span>`, () => wt('W4', 'one')], [`<b style="color:${RD}">4.0 × 10⁻¹⁰</b><span>in 0.1 M B⁻ (common ion)</span>`, () => wt('W7', 'Four')], [`<b>÷ = 250,000</b><span>times less</span>`, () => wt('W7', 'Two')]];
$('#wrs').innerHTML = WT.map(([h], i) => `<div class="tile" id="wt${i}" style="top:${90 + i * 112}px">${h}</div>`).join('');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `AB₂: ${K('K_{sp} = s \\times 2s = 2s^2')}`, right: `Square the 2s: ${K(`${KS} = ${sX}(2${sX})^2 = 4${sX}^3`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'AB₂ → A²⁺ + 2B⁻', { 'font-size': 28, fill: HC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 180, '[B⁻] = 2s → (2s)²', { 'font-size': 28, fill: RD, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Write a Ksp expression, find s from Ksp, or predict a precipitate with Q vs Ksp' });
const OPT = ['5.7\\times10^{-6}', '4.0\\times10^{-6}', '2.0\\times10^{-4}', '3.2\\times10^{-4}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'A salt MX₂ has Ksp = 3.2 × 10⁻¹¹ at 298 K. What is its solubility in mol L⁻¹?', qW: 940,
  opts: OPT.map(s => K(s)), right: 2, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${KS} = 4${sX}^3`)], [K(`${sX}^3 = 3.2\\times10^{-11} \\div 4`)], [K(`= 8\\times10^{-12},\\ ${sX} = ${tO('2.0\\times10^{-4}')}`)], ['A: square root · D: no ÷ 4']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'So'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Solubility product', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\mathrm{AB(s)} \\rightleftharpoons ${AP} + ${BM} \\qquad ${KS} = [${AP}][${BM}]`), '<b>Solid left out</b> · <b>AB</b>: Ksp = s² · <b>AB₂</b>: Ksp = 4s³', '<b>BaSO₄</b>: Ksp = 1.1 × 10⁻¹⁰ (298 K), s = 1.05 × 10⁻⁵ mol L⁻¹', '<b>Q > Ksp</b>: solid falls out · <b>Q < Ksp</b>: more dissolves', '<b>Common ion</b>: a shared ion makes the salt dissolve less'] });
const YQ = ['Why is the solid left out of Ksp?', 'Write Ksp for an AB₂ salt in terms of s.', 'When does a precipitate form?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 71', topic: 'Why does an iron gate turn brown? Oxidation and Reduction', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 512, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Leaving and coming back. Like my chalk glass!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L3') - 0.2, 1.05, 960, 560], [T1('L3') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ms .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc, .beq').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.rule .rk, .rule .rt').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 620 / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const hl = (els, ts, tEnd) => els.forEach((el, i) => { const nx2 = i < els.length - 1 ? ts[i + 1] : tEnd; const on = M.io((M.T - ts[i]) / 0.25) * (1 - M.io((M.T - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  M.T = t;
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
    const tB = [wt('H2', 'lot'), wt('H2', 'hardly'), wt('H2', 'number')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'puts') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'number') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => M.vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, { dy: 16 }));
    hl(QR.map((_, i) => $('#qr' + i)), tQr, T1('P3') + 0.4);
    M.vis($('#pw'), t, tQr[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    PB.forEach((g, i) => fade(g, t, tQr[Math.min(i, 2)]));
  }

  /* S: bench */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    ions.forEach((e, i) => { const u = outU(i, t), [cx, cy] = cellXY(2, ION_C[i]), [wx, wy] = wand(i, t); mv(e, M.lerp(cx, wx, u), M.lerp(cy, wy, u)); });
    const TAG = [[tS1 + 0.3, 'SOLID BaSO₄ IN WATER'], [T0('S2'), 'IONS LEAVE'], [wt('S3', 'stick'), 'SOME RETURN'], [wt('S4', 'same'), 'SAME SPEED: SATURATED'], [T0('S5'), 'EQUILIBRIUM']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    PUC.write($('#bEq'), t, T0('S2') + 0.1, 0.9);
    const ta = gTa(), tb = gTb(), te = Math.min(t, tb); let pts = '';
    if (te > ta) for (let k = 0; k <= 80; k++) { const tt = ta + (te - ta) * k / 80; let n = 0; for (let j = -4; j <= 4; j++) for (let i = 0; i < 8; i++) n += outU(i, tt + j * 0.25) / 9; pts += `${(GX0 + (GX1 - GX0) * (tt - ta) / (tb - ta)).toFixed(1)},${(GY1 - n * 30).toFixed(1)} `; }
    attr(gLine, 'points', pts);
    fade(satL, t, wt('S4', 'saturated')); fade(satT, t, wt('S4', 'saturated'));
    fade(rLeave.g, t, T0('S2')); fade(rBack.g, t, wt('S3', 'stick') - 0.2);
    attr(rLeave.r, 'width', (300 * M.io((t - T0('S2')) / 0.6)).toFixed(1));
    attr(rBack.r, 'width', (300 * M.clamp((t - wt('S3', 'stick')) / Math.max(0.5, wt('S4', 'same') - wt('S3', 'stick')))).toFixed(1));
    avA(t, T1('S5') - 0.4, z); fade(bLg, t, tS1, T1('S5') - 0.4);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1'), tSh = wt('L2', 'Leave') - 0.3;
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tSh, M.HEAVY); snap($('#lw'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#hcd'), t, wt('L1', 'constant') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, T0('L2'), 1.4); PUC.write($('#lEq'), t, wt('L1', 'product'), 0.9);
    M.vis($('#lh'), t, tSh, z, { dx: 60, dy: 0, ...o });
    LT.forEach(([, f], i) => M.vis($('#lt' + i), t, f() - 0.1, 1e9, { dy: 16 }));
    M.vis($('#hP'), t, wt('L3', 'solubility') - 0.3, 1e9, POP);
  }

  /* D + AB2 */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tR1 + 0.2, M.HEAVY); snap($('#mt'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.8); });
    M.vis($('#dP'), t, wt('D4', 'About') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, tR1 + 0.1, z, { dx: 60, dy: 0, ...o });
    RL.forEach((_, i) => M.vis($('#rl' + i), t, tRl[i] - 0.1, 1e9, { dy: 16 }));
    hl(RL.map((_, i) => $('#rl' + i)), tRl, T1('R4') + 0.4);
  }

  /* G: common ion */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1'), tAdd = wt('G2', 'sodium'), tJoin = wt('G4', 'join');
    M.vis($('#gb'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gr'), t, T0('G2') - 0.2, z, { dx: 60, dy: 0, ...o });
    GW.forEach((w, k) => { let x = w.x + 22 * Math.sin(0.9 * t + k), y = w.y + 16 * Math.cos(0.7 * t + k); if (k % 2 === 0) { const u = M.io((t - tJoin - k * 0.15) / 0.9), tgt = cellXY(3, NEWC[k]); x = M.lerp(x, tgt[0], u); y = M.lerp(y, tgt[1], u); } mv(w.e, x, y); });
    ADD.forEach((a, k) => { const u = M.io((t - tAdd - k * 0.25) / 0.8), y0 = 60; let x = a.x + 18 * Math.sin(0.8 * t + k), y = M.lerp(y0, a.y, u) + 14 * Math.cos(0.6 * t + k) * u;
      if (k === 1 || k === 3) { const v = M.io((t - tJoin - k * 0.15) / 0.9), tgt = cellXY(3, NEWC[k]); x = M.lerp(x, tgt[0], v); y = M.lerp(y, tgt[1], v); }
      mv(a.s, x, y); mv(a.n1, a.x + 40 + 18 * Math.sin(0.8 * t + k + 1), M.lerp(y0, a.y - 30, u)); mv(a.n2, a.x - 36 + 18 * Math.sin(0.8 * t + k + 2), M.lerp(y0, a.y + 34, u));
      [a.s, a.n1, a.n2].forEach(e => fade(e, t, tAdd + k * 0.25, 1e9, 0.2)); });
    const TAG = [[tG1 + 0.3, 'SATURATED BaSO₄'], [tAdd, 'ADD Na₂SO₄'], [wt('G3', 'too'), 'TOO MANY SO₄²⁻'], [tJoin, 'IONS JOIN THE SOLID'], [wt('G4', 'falls'), 'SOLID GROWS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(gtag, tg); M.vis(gtag, t, tG1 + 0.2, 1e9, POP);
    PUC.write($('#gEq'), t, T0('G2'), 0.9);
    GR.forEach((_, i) => M.vis($('#gr' + i), t, tGr[i] - 0.1, 1e9, { dy: 16 }));
    hl(GR.map((_, i) => $('#gr' + i)), tGr, T0('G5') + 0.2);
    M.vis($('#gP'), t, T0('G5') + 0.1, 1e9, POP);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#ca0'), t, wt('C1', 'most') - 0.2, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'ionic') - 0.1, 1e9, { dy: 16 });
    M.vis($('#caK'), t, wt('C1', 'now') - 0.3, 1e9, { dy: 10 }); M.vis($('#caB'), t, wt('C1', 'now') - 0.3, 1e9, { dy: 10 }); M.vis($('#caV'), t, wt('C1', 'now'), 1e9, { dy: 16 });
    $('#caB i').style.width = (60 * (0.5 + 0.5 * Math.sin(1.6 * (t - tC1))) + 15) + '%';
    M.vis($('#cf'), t, T0('C2') - 0.3, zc, { dx: 60, dy: 0, ...o });
    const tc = [wt('C2', 'less'), wt('C2', 'equals'), T1('C2') - 0.4];
    tc.forEach((tt, i) => M.vis($('#cf' + i), t, tt - 0.1, 1e9, { dy: 16 }));
    M.vis($('#cfB').previousElementSibling, t, tc[0], 1e9, { dy: 10 }); M.vis($('#cfB'), t, tc[0], 1e9, { dy: 10 });
    const lv = t < tc[1] ? 35 : t < tc[2] ? 60 : 80; const prev = t < tc[1] ? 0 : t < tc[2] ? 35 : 60, tt0 = t < tc[1] ? tc[0] : t < tc[2] ? tc[1] : tc[2];
    $('#cfB i').style.width = M.lerp(prev, lv, M.io((t - tt0) / 0.5)).toFixed(1) + '%';
    hl([0, 1, 2].map(i => $('#cf' + i)), tc, tK1);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'what') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Extra') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Q') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'below') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'dissolves') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    const tWr = wt('W4', 'one') - 0.4; { const sh = M.spring(t - tWr, M.HEAVY); snap($('#wl'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#wr'), t, tWr, out, { dx: 60, dy: 0, ...o });
    WT.forEach(([, f], i) => M.vis($('#wt' + i), t, f() - 0.1, 1e9, { dy: 16 }));
    M.vis($('#wG'), t, wt('W7', 'less') - 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'students') - 0.1, tStrike: wt('X2', 'forget') - 0.1, tRight: T0('X3') - 0.1 });
    fade(tq1, t, wt('X2', 'two')); fade(tq2, t, wt('X3', 'squared'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
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
