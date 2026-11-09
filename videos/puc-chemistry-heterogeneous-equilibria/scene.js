// PUC Chemistry Ep 62: Heterogeneous equilibria (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: CO2 teal (stays in K), CO orange, water vapour blue, pure solids / liquids grey ink (dropped, red tag), K values gold
const NC = C.ac, HC = C.ink, GC = '#B7791F', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3', SOL = '#E4E7EE', WAT = '#DCEFF8';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tN = s => `\\textcolor{${NC}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`, tB = s => `\\textcolor{${BC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tM = s => `\\textcolor{#5B6478}{${s}}`;
const CO2 = tN('\\mathrm{CO_2}'), pCO2 = `p_{${CO2}}`, CO = tX('\\mathrm{CO}'), pCO = `p_{${CO}}`, Kp = tG('K_p'), Kc = tG('K_c');
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const bnc = (u, lo, hi) => { const w = hi - lo, m = ((u % (2 * w)) + 2 * w) % (2 * w); return lo + (m < w ? m : 2 * w - m); };
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };
const gas = (p, n, box, col, r = 11) => Array.from({ length: n }, (_, i) => { const g = mk(p, 'g', {}); dot(g, r, col); const d2 = dot(g, r, col); attr(d2, 'cx', r * 1.8); return { g, x: rnd(i, 1), y: rnd(i, 2), vx: 40 + 50 * rnd(i, 3), vy: 34 + 46 * rnd(i, 4), box }; });
const moveGas = (arr, t, box) => arr.forEach(m => { const b = box || m.box; attr(m.g, 'transform', `translate(${bnc(b[0] + m.x * (b[2] - b[0]) + m.vx * t, b[0], b[2]).toFixed(1)},${bnc(b[1] + m.y * (b[3] - b[1]) + m.vy * t, b[1], b[3]).toFixed(1)})`); });
const chipS = (p, x, y, s, col, bg) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -70, y: -20, width: 140, height: 40, rx: 9, fill: bg, stroke: col, 'stroke-width': 2 }); txt(g, 0, 6, s, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); attr(g, 'transform', `translate(${x},${y})`); return g; };

Object.assign(M.IC, {
  bottle: ['M10 2h4', 'M10 2v3l-2 3v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-3V2'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  flask: ['M10 2v7.31', 'M14 9.3V2', 'M8.5 2h7', 'M14 9.3a6.5 6.5 0 1 1-4 0', 'M5.52 16h12.96'],
  cup: ['M5 8h14l-1.5 13h-11z', 'M4 5h16v3H4z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['bottle', 'Closed bottle', 'FOGS UP INSIDE', 'bottle', 'LIQUID + GAS', BC], ['flame', 'Hot kiln', 'STONE TO LIME', 'kiln', 'SOLID + GAS', XC], ['flask', 'One equilibrium', 'MANY PHASES', 'gas', 'WHO IS IN K?', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Tiny drops under the lid', 'drops', 'H3'], ['Full or empty: same vapour', 'same', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('cup', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: phases ---------- */
const QR = [['Phase: one even part', 'PHASE', 'P2', 'phase', NC], ['Ice in water', '2 PHASES', 'P3', 'Ice', BC], ['Air, many gases', '1 PHASE', 'P3', 'Air', GC], ['More than one phase', 'HETERO', 'P4', 'heterogeneous', XC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 100}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pBk = mk(ps, 'g', {}); mk(pBk, 'rect', { x: 72, y: 250, width: 256, height: 158, fill: WAT }); mk(pBk, 'path', { d: 'M70 130 V390 a20 20 0 0 0 20 20 H310 a20 20 0 0 0 20 -20 V130', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const pIce = mk(ps, 'rect', { x: 150, y: 214, width: 90, height: 70, rx: 8, fill: '#fff', stroke: '#7FB8DA', 'stroke-width': 3 });
const pL1 = txt(ps, 200, 450, '2 PHASES · SOLID + LIQUID', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 });
const pBox = mk(ps, 'rect', { x: 430, y: 130, width: 290, height: 280, rx: 14, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
const pAir = [...gas(ps, 5, [445, 145, 680, 380], NC, 9), ...gas(ps, 4, [445, 145, 680, 380], BC, 9), ...gas(ps, 3, [445, 145, 680, 380], GC, 9)];
const pL2 = txt(ps, 575, 450, '1 PHASE · ALL GAS', { 'text-anchor': 'middle', 'font-size': 18, fill: GC, 'font-weight': 600 });
const pHet = txt(ps, 200, 112, 'HETEROGENEOUS', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 }), pHom = txt(ps, 575, 112, 'HOMOGENEOUS', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 });

/* ---------- S: closed jar ---------- */
const b = $('#bS'), WL0 = 290, WL1 = 355, AIR = [168, 128, 410, 0];
const water = mk(b, 'rect', { x: 152, y: WL0, width: 286, height: 418 - WL0, fill: WAT });
const jar = mk(b, 'path', { d: 'M150 110 V400 a20 20 0 0 0 20 20 H420 a20 20 0 0 0 20 -20 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const lid = mk(b, 'rect', { x: 136, y: 98, width: 318, height: 14, rx: 6, fill: HC });
const liq = Array.from({ length: 21 }, (_, i) => ({ e: dot(b, 9, '#7FB8DA'), x: 180 + (i % 7) * 38, r: Math.floor(i / 7), ph: rnd(i, 5) * 6.283 }));
const vap = gas(b, 12, AIR, BC, 9);
const evA = varrow(b, 230, 300, 230, XC), cdA = varrow(b, 360, 220, 290, BC);
const lbE = txt(b, 480, 150, 'EVAPORATION', { 'font-size': 18, fill: XC, 'font-weight': 600 }), lbC = txt(b, 480, 250, 'CONDENSATION', { 'font-size': 18, fill: BC, 'font-weight': 600 });
mk(b, 'rect', { x: 480, y: 166, width: 260, height: 30, rx: 8, fill: C.soft }); mk(b, 'rect', { x: 480, y: 266, width: 260, height: 30, rx: 8, fill: C.soft });
const rE = mk(b, 'rect', { x: 480, y: 166, width: 0, height: 30, rx: 8, fill: XC }), rC = mk(b, 'rect', { x: 480, y: 266, width: 0, height: 30, rx: 8, fill: BC });
const rEq = txt(b, 610, 350, 'RATES EQUAL', { 'text-anchor': 'middle', 'font-size': 22, fill: OK, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), GX0 = 100, GX1 = 720, GY0 = 400, GY1 = 120;
mk(es, 'line', { x1: GX0, y1: 100, x2: GX0, y2: GY0, stroke: C.ink2, 'stroke-width': 3 }); mk(es, 'line', { x1: GX0, y1: GY0, x2: GX1, y2: GY0, stroke: C.ink2, 'stroke-width': 3 });
txt(es, GX0 - 12, 120, 'p', { 'text-anchor': 'end', 'font-size': 24, fill: BC, 'font-weight': 600 }); txt(es, GX1, GY0 + 34, 'TIME →', { 'text-anchor': 'end', 'font-size': 18, fill: HC, 'font-weight': 600 });
const eCur = mk(es, 'path', { d: '', stroke: BC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const eFlat = mk(es, 'line', { x1: GX0, y1: GY1 + 40, x2: GX1, y2: GY1 + 40, stroke: BC, 'stroke-width': 2, 'stroke-dasharray': '6 8', opacity: 0 });
const eFl = txt(es, GX1, GY1 + 26, 'VAPOUR PRESSURE · STEADY', { 'text-anchor': 'end', 'font-size': 16, fill: BC, 'font-weight': 600 });
const eHalf = mk(es, 'line', { x1: 0, y1: 110, x2: 0, y2: GY0, stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const eHt = txt(es, 0, 300, 'HALF THE WATER OUT', { 'font-size': 16, fill: XC, 'font-weight': 600 });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my tumbler had the same vapour both times!' });

/* ---------- L: chocolate ---------- */
const ls = $('#lS'), choc = [0, 1].map(h => { const g = mk(ls, 'g', {}); for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) mk(g, 'rect', { x: 60 + h * 248 + i * 62, y: 90 + j * 48, width: 56, height: 42, rx: 5, fill: '#7A4A2B' }); return g; });
const lLab = txt(ls, 340, 280, 'SMALLER PIECE · SAME PACKING', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 });
$('#lEq').innerHTML = K(`[\\text{pure solid}] = \\dfrac{\\text{moles}}{\\text{litre}} = ${tM('\\text{fixed}')}`);
const GT = [['\\text{(s)}', 'PURE SOLID', 'LEAVE OUT OF K', RD, wt('L3', 'solid')], ['\\text{(l)}', 'PURE LIQUID', 'LEAVE OUT OF K', RD, wt('L3', 'liquid')], ['\\text{(g)},\\ \\text{(aq)}', 'GAS, DISSOLVED', 'STAY IN K', OK, wt('L3', 'never')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px"><div class="gk">${K(k)}</div><div class="gv" style="color:${c}">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: lime kiln ---------- */
const MS = [[K(`\\mathrm{CaCO_3(s) \\rightleftharpoons CaO(s)} + ${CO2}\\mathrm{(g)}`), 'D2'], [K(`K = \\dfrac{[\\mathrm{CaO}]\\,[${CO2}]}{[\\mathrm{CaCO_3}]}`), 'D3'], [K(`[\\mathrm{CaCO_3}],\\ [\\mathrm{CaO}] = ${tM('\\text{fixed}')}`), 'D4'], [K(`${Kc} = [${CO2}] \\qquad ${Kp} = ${pCO2}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 118}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS');
const box = (p, x0, y0, x1, y1) => mk(p, 'rect', { x: x0, y: y0, width: x1 - x0, height: y1 - y0, rx: 16, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
const dBox = box(ds, 60, 80, 724, 470);
const blk = (p, x, y, w, h, s) => { const g = mk(p, 'g', {}); const r = mk(g, 'rect', { x, y, width: w, height: h, rx: 8, fill: SOL, stroke: HC, 'stroke-width': 3 }); txt(g, x + w / 2, y + h / 2 + 7, s, { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }); return { g, r }; };
const dB1 = blk(ds, 110, 370, 200, 96, 'CaCO₃(s)'), dB2 = blk(ds, 420, 396, 160, 70, 'CaO(s)');
const dGas = gas(ds, 9, [90, 110, 660, 330], NC, 10);
const dF1 = txt(ds, 210, 356, 'FIXED · OUT OF K', { 'text-anchor': 'middle', 'font-size': 16, fill: RD, 'font-weight': 600 }), dF2 = txt(ds, 500, 382, 'FIXED · OUT OF K', { 'text-anchor': 'middle', 'font-size': 16, fill: RD, 'font-weight': 600 });
const dGl = txt(ds, 392, 520, 'ONLY THE CO₂ GAS DECIDES K', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });

/* ---------- G: keep or drop ---------- */
const GR = [[`${Kc} = \\dfrac{[\\mathrm{Ni(CO)_4}]}{[\\mathrm{CO}]^4}`, 'Ni(s) OUT', 'G2'], [`${Kc} = \\dfrac{[\\mathrm{AgNO_3}]^2}{[\\mathrm{HNO_3}]^2}`, 'Ag₂O, H₂O OUT', 'G3'], [`${Kp} = \\dfrac{${pCO}^{\\,2}}{${pCO2}}`, 'C(s) OUT', 'G4'], ['\\text{Keep (g), (aq). Drop (s), (l).}', 'THE RULE', 'G5']];
$('#grs').innerHTML = GR.map(([k, v], i) => `<div class="qr" id="gr${i}" style="top:${92 + i * 104}px;height:88px"><div class="nn" style="top:21px">${i + 1}</div><div class="qt" style="top:16px">${K(k)}</div><div class="qk" style="top:31px;color:${i < 3 ? RD : NC}">${v}</div></div>`).join('');
const tGr = GR.map(g => T0(g[2]) + 0.1);
const gs = $('#gS');
const binK = mk(gs, 'rect', { x: 50, y: 290, width: 330, height: 200, rx: 14, fill: OKT, stroke: OK, 'stroke-width': 3 }), binD = mk(gs, 'rect', { x: 404, y: 290, width: 330, height: 200, rx: 14, fill: RDT, stroke: RD, 'stroke-width': 3 });
txt(gs, 215, 524, 'KEEP IN K · (g) (aq)', { 'text-anchor': 'middle', 'font-size': 18, fill: OK, 'font-weight': 600 }); txt(gs, 569, 524, 'DROP · PURE (s) (l)', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });
const CH = [['Ni(s)', 0, 0], ['CO(g)', 1, 0], ['Ni(CO)₄(g)', 1, 0], ['Ag₂O(s)', 0, 1], ['H₂O(l)', 0, 1], ['HNO₃(aq)', 1, 1], ['AgNO₃(aq)', 1, 1], ['C(s)', 0, 2], ['CO₂(g)', 1, 2], ['CO(g)', 1, 2]];
const gEq = ['Ni(s) + 4CO(g) ⇌ Ni(CO)₄(g)', 'Ag₂O(s) + 2HNO₃(aq) ⇌ 2AgNO₃(aq) + H₂O(l)', 'CO₂(g) + C(s) ⇌ 2CO(g)'].map(s => txt(gs, 392, 100, s, { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 }));
let nk = 0, nd = 0; const exN = [0, 0, 0];
const chips = CH.map(([s, keep, ex]) => { const j = exN[ex]++; const slot = keep ? nk++ : nd++; const bx = keep ? 50 : 404; const c = chipS(gs, 0, 0, s, keep ? OK : RD, '#fff'); return { c, ex, j, sx: 112 + j * 186, sy: 150, ex2: bx + 92 + (slot % 2) * 150, ey: 330 + Math.floor(slot / 2) * 52 }; });

/* ---------- C: big vs small lump ---------- */
const cmp = (p, w, h) => { const g = mk(p, 'g', {}); box(g, 60, 84, 500, 440); const r = mk(g, 'rect', { x: 280 - w / 2, y: 436 - h, width: w, height: h, rx: 8, fill: SOL, stroke: HC, 'stroke-width': 3 }); txt(g, 280, 480, 'SOLID · NOT IN K', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });
  mk(g, 'circle', { cx: 634, cy: 200, r: 76, fill: C.soft, stroke: C.ink2, 'stroke-width': 4 }); const nd2 = mk(g, 'line', { x1: 634, y1: 200, x2: 634, y2: 140, stroke: NC, 'stroke-width': 8, 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: 634, cy: 200, r: 11, fill: NC }); txt(g, 634, 316, 'p(CO₂)', { 'text-anchor': 'middle', 'font-size': 22, fill: NC, 'font-weight': 600 }); const v = txt(g, 634, 356, '', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 });
  return { g, nd2, v, gas: gas(g, 7, [80, 104, 450, 436 - h - 30], NC, 10) }; };
const cA = cmp($('#caS'), 300, 150), cB = cmp($('#cfS'), 110, 60);
const th1 = PUC.think($('#th1'), { q: 'Big lump or small lump, same temperature. Which box has more CO₂ pressure?', opts: ['Big lump', 'Same pressure'], right: 1, why: 'The same. The solid is not in K, so p(CO₂) is fixed at that temperature.' });

/* ---------- R: catch + value ---------- */
const RR = [['<span class="stx tx">Some solid must stay in the box</span>', 'R2', 'Some', 1], [K(`${pCO2} = 2.0 \\times 10^{5}\\ \\text{Pa}`), 'R3', 'eleven'], [K(`${Kp} = 2.0 \\times 10^{5} \\div 10^{5}`), 'R4', 'Divide'], [K(`${Kp} = ${tG('2.00')}\\ \\ (1100\\ \\text{K})`), 'R5', 'two']];
$('#rrs').innerHTML = RR.map(([s, , , tx], i) => `<div class="dr" id="rr${i}" style="top:${96 + i * 96}px"><div class="sn">${i + 1}</div>${tx ? s : `<div class="stx">${s}</div>`}</div>`).join('');
const tRr = RR.map(r => wt(r[1], r[2]) - 0.1);
$('#rP').innerHTML = `1 bar = 10⁵ Pa · the standard pressure`;
const ks = $('#kS');
box(ks, 60, 84, 460, 440); const kBlk = mk(ks, 'rect', { x: 120, y: 340, width: 280, height: 96, rx: 8, fill: SOL, stroke: HC, 'stroke-width': 3 });
const kGas = gas(ks, 7, [80, 104, 410, 300], NC, 10);
const kNo = txt(ks, 260, 490, 'ALL USED UP: NO EQUILIBRIUM', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });
const kT = txt(ks, 610, 160, '1100 K', { 'text-anchor': 'middle', 'font-size': 30, fill: XC, 'font-weight': 600 });
const kP1 = txt(ks, 610, 250, 'p(CO₂)', { 'text-anchor': 'middle', 'font-size': 22, fill: NC, 'font-weight': 600 }), kP2 = txt(ks, 610, 290, '2.0 × 10⁵ Pa', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 });
const kK = txt(ks, 610, 390, 'Kp = 2.00', { 'text-anchor': 'middle', 'font-size': 34, fill: GC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{CaCO_3}:\\ ${Kp} = ${pCO2} \\qquad \\text{water}:\\ ${Kp} = p_{${tB('\\mathrm{H_2O}')}}`);

/* ---------- W: CO2 + C ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${pCO2} = 0.48 - x, \\quad ${pCO} = 2x`)],
  [K(`${Kp} = \\dfrac{(2x)^2}{0.48 - x} = 3.0`)],
  [K(`4x^2 + 3x - 1.44 = 0 \\Rightarrow x \\approx 0.33`)],
  [K(`${pCO} = ${tO('0.66')}\\ \\text{bar}, \\quad ${pCO2} = ${tO('0.15')}\\ \\text{bar}`)]], { label: 'WORKED EXAMPLE', y0: 216, dy: 94 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WB = 420, WS = 340 / 0.8;
mk(ws, 'line', { x1: 90, y1: WB, x2: 500, y2: WB, stroke: C.ink2, 'stroke-width': 3 }); mk(ws, 'line', { x1: 90, y1: 90, x2: 90, y2: WB, stroke: C.ink2, 'stroke-width': 3 });
[0, 0.2, 0.4, 0.6, 0.8].forEach(v => { const y = WB - v * WS; mk(ws, 'line', { x1: 84, y1: y, x2: 96, y2: y, stroke: C.ink2, 'stroke-width': 3 }); txt(ws, 76, y + 6, v.toFixed(1), { 'text-anchor': 'end', 'font-size': 16, fill: HC, 'font-weight': 600 }); });
txt(ws, 90, 70, 'bar', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const wb1 = mk(ws, 'rect', { x: 150, y: WB, width: 120, height: 0, rx: 6, fill: NC }), wb2 = mk(ws, 'rect', { x: 330, y: WB, width: 120, height: 0, rx: 6, fill: XC });
const wv1 = txt(ws, 210, 0, '', { 'text-anchor': 'middle', 'font-size': 22, fill: NC, 'font-weight': 600 }), wv2 = txt(ws, 390, 0, '', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
txt(ws, 210, 452, 'CO₂', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 }); txt(ws, 390, 452, 'CO', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });
const wC = blk(ws, 560, 340, 160, 80, 'C(s)'); const wCt = txt(ws, 640, 452, 'NOT IN K', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${Kp} = \\dfrac{${pCO2}\\,[\\mathrm{CaO}]}{[\\mathrm{CaCO_3}]}`), right: K(`${Kp} = ${pCO2}`) });
const tsv = $('#tS');
const tq1 = txt(tsv, 60, 110, 'H₂O(l): OUT', { 'font-size': 30, fill: RD, 'font-weight': 600 }), tq2 = txt(tsv, 60, 170, 'H₂O(g): STAYS IN', { 'font-size': 30, fill: BC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Write Kc or Kp with solids or liquids; pressures from a total pressure' });
const OPT = ['0.64', '0.16', '0.40', '0.32'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'NH₄HS(s) ⇌ NH₃(g) + H₂S(g). Total pressure at equilibrium = 0.80 bar. Find Kp.', qW: 780,
  opts: OPT.map(s => K(`${s}\\ \\text{bar}^2`)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K('K_p = p_{\\mathrm{NH_3}} \\times p_{\\mathrm{H_2S}}')], [K('p = 0.80 \\div 2 = 0.40\\ \\text{bar}')], [K(`K_p = 0.40 \\times 0.40 = ${tO('0.16')}`)], ['A squared the total']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'squared') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Heterogeneous equilibria', y0: 96, dy: 74, txt: [1, 0, 0, 1, 1],
  lines: ['<b>Heterogeneous</b>: more than one phase (solid, liquid, gas)', K(`\\mathrm{CaCO_3 \\rightleftharpoons CaO + CO_2}: \\ ${Kc} = [${CO2}],\\ ${Kp} = ${pCO2}`), K(`\\mathrm{H_2O(l) \\rightleftharpoons H_2O(g)}: \\ ${Kp} = p_{${tB('\\mathrm{H_2O}')}}`),
    '<b>Keep</b> gases and (aq) · <b>drop</b> pure solids and liquids · some solid must be present', '<b>1100 K</b>: p(CO₂) = 2.0 × 10⁵ Pa, Kp = 2.00 · <b>CO₂ + C</b>: Kp = p(CO)² / p(CO₂)'] });
const YQ = ['Why is a pure solid left out of K?', 'Write Kp for calcium carbonate breaking down.', 'Does adding more liquid water change its vapour pressure?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 63', topic: 'What does the size of K tell us? Applications of Equilibrium Constants', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T0('S6') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 190; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const tS2 = T0('S2'), tS4 = T0('S4'), tHalf = wt('S5', 'take'), tGend = T1('S6');
const gx = tt => GX0 + (GX1 - GX0) * M.clamp((tt - tS2) / (tGend - tS2));
const gy = tt => GY0 - (GY0 - GY1 - 40) * (1 - Math.exp(-3.2 * Math.max(0, tt - tS2) / Math.max(1, tS4 - tS2)));

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
    const tBd = [wt('H2', 'Solids'), wt('H2', 'gases'), wt('H2', 'which')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'K') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'drop') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'phase') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(pBk, t, tQr[1] - 0.2); fade(pIce, t, tQr[1]); attr(pIce, 'y', (214 + 4 * Math.sin(t * 2)).toFixed(1)); fade(pL1, t, tQr[1] + 0.4);
    fade(pBox, t, tQr[2] - 0.2); pAir.forEach((m, i) => fade(m.g, t, tQr[2] + i * 0.03, 1e9, 0.2)); moveGas(pAir, t); fade(pL2, t, tQr[2] + 0.4);
    fade(pHet, t, tQr[3]); fade(pHom, t, tQr[3] + 0.4);
    M.vis($('#pP'), t, wt('P4', 'different') - 0.2, 1e9, POP);
  }

  /* S: jar */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, tS2 - 0.2, z, { dx: 60, dy: 0, ...o });
    const wl = M.lerp(WL0, WL1, M.io((t - tHalf) / 1.0));
    [jar, lid].forEach(e => fade(e, t, tS1 + 0.2)); fade(water, t, tS1 + 0.3); attr(water, 'y', wl.toFixed(1)); attr(water, 'height', (418 - wl).toFixed(1));
    liq.forEach((p, i) => { const y = wl + 22 + p.r * 34; const gone = y > 410; fade(p.e, t, tS1 + 0.4 + i * 0.01, 1e9, 0.2, gone ? 0 : 1); pos(p.e, p.x + 4 * Math.sin(t * 5 + p.ph), y + 3 * Math.cos(t * 4 + p.ph)); });
    const nV = Math.round(12 * (1 - Math.exp(-3.2 * Math.max(0, t - tS2) / Math.max(1, tS4 - tS2))));
    moveGas(vap, t, [168, 126, 400, wl - 30]); vap.forEach((m, i) => fade(m.g, t, tS2 + 0.3, 1e9, 0.3, i < nV ? 1 : 0));
    fade(evA[0], t, tS2 + 0.2); fade(evA[1], t, tS2 + 0.2); fade(cdA[0], t, T0('S3')); fade(cdA[1], t, T0('S3'));
    fade(lbE, t, tS2 + 0.2); fade(lbC, t, T0('S3')); const rr = M.io((t - tS2 - 0.2) / 0.5) * 220; attr(rE, 'width', rr.toFixed(1)); attr(rC, 'width', (220 * (1 - Math.exp(-3.2 * Math.max(0, t - T0('S3') + 0.6) / Math.max(1, tS4 - tS2))) * M.io((t - T0('S3')) / 0.4)).toFixed(1));
    fade(rEq, t, wt('S4', 'equal'));
    const TAG = [[tS1 + 0.3, 'CLOSED JAR · LIQUID + VAPOUR'], [tS2, 'EVAPORATION'], [T0('S3'), 'CONDENSATION'], [tS4, 'RATES EQUAL'], [tHalf, 'HALF THE WATER OUT'], [T0('S6'), 'Kp = p(H₂O)']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    // graph
    const now = Math.min(t, tGend); let d = ''; for (let k = 0; k <= 60; k++) { const tt = tS2 + (now - tS2) * k / 60; d += (k ? 'L' : 'M') + gx(tt).toFixed(1) + ' ' + gy(tt).toFixed(1); } attr(eCur, 'd', t > tS2 ? d : '');
    eFlat.style.opacity = (0.8 * M.io((t - tS4) / 0.4)).toFixed(2); fade(eFl, t, tS4 + 0.2);
    const hx = gx(tHalf); attr(eHalf, 'x1', hx.toFixed(1)); attr(eHalf, 'x2', hx.toFixed(1)); attr(eHt, 'x', (hx - 12).toFixed(1)); eHt.setAttribute('text-anchor', 'end'); fade(eHalf, t, tHalf); fade(eHt, t, tHalf + 0.2);
    $('#eG').innerHTML = t >= T0('S6') ? K(`${Kp} = p_{${tB('\\mathrm{H_2O}')}}`) : ''; fade($('#eG'), t, T0('S6'));
    avD(t, wt('S5', 'same') + 0.2, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    const cut = M.io((t - wt('L2', 'Cut')) / 0.6); choc.forEach((g, h) => { fade(g, t, wt('L1', 'chocolate') - 0.1); attr(g, 'transform', `translate(${(h ? 40 : -10) * cut},0)`); });
    fade(lLab, t, wt('L2', 'packed') - 0.2);
    PUC.write($('#lEq'), t, wt('L3', 'packing'), 1.2);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.3, 1e9, { dy: 24 }); const on = M.io((t - g[4]) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4]) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, tD1 + 0.3, z, { dx: 60, dy: 0, ...o });
    fade(dBox, t, tD1 + 0.5); fade(dB1.g, t, wt('D2', 'calcium')); fade(dB2.g, t, wt('D2', 'oxide'));
    dGas.forEach((m, i) => fade(m.g, t, wt('D2', 'carbon', 1) + i * 0.05, 1e9, 0.2)); moveGas(dGas, t);
    const fx = wt('D4', 'fixed'); [dF1, dF2].forEach(e => fade(e, t, fx)); [dB1.r, dB2.r].forEach(r => { attr(r, 'stroke', mix(HC, RD, M.io((t - fx) / 0.3))); r.style.opacity = (1 - 0.45 * M.io((t - fx - 0.4) / 0.4)).toFixed(2); });
    fade(dGl, t, T0('D5') + 0.2);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    fade(binK, t, tG1 + 0.6); fade(binD, t, tG1 + 0.6);
    GR.forEach((_, i) => { const el = $('#gr' + i); M.vis(el, t, tGr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tGr[i + 1] : T1('G5') + 0.4; const on = M.io((t - tGr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    chips.forEach(c => { const ti = tGr[c.ex] + 0.3 + c.j * 0.25, u = M.io((t - ti - 1.0 - c.j * 0.15) / 0.6); fade(c.c, t, ti, 1e9, 0.2); attr(c.c, 'transform', `translate(${M.lerp(c.sx, c.ex2, u).toFixed(1)},${M.lerp(c.sy, c.ey, u).toFixed(1)})`); });
    gEq.forEach((e, i) => fade(e, t, tGr[i], i < 2 ? tGr[i + 1] - 0.1 : 1e9));
    const g5 = M.io((t - tGr[3]) / 0.3); attr(binK, 'stroke-width', (3 + 3 * g5).toFixed(1)); attr(binD, 'stroke-width', (3 + 3 * g5).toFixed(1));
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'small') - 0.2, zc, { dx: 60, dy: 0, ...o });
    const tt = wt('C1', 'temperature'), u = M.io((t - tt) / 1.0);
    [cA, cB].forEach((c, k) => { fade(c.g, t, k ? wt('C1', 'small') : wt('C1', 'big')); moveGas(c.gas, t); const a = (-90 - 120 + 150 * u) * Math.PI / 180; attr(c.nd2, 'x2', (634 + 60 * Math.cos(a)).toFixed(1)); attr(c.nd2, 'y2', (200 + 60 * Math.sin(a)).toFixed(1)); M.setT(c.v, u > 0.98 ? 'SAME' : ''); });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'solid') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RR.forEach((_, i) => { const r = $('#rr' + i); M.vis(r.querySelector('.sn'), t, tRr[i] - 0.1, 1e9, POP); const s = r.querySelector('.stx'); if (i === 0) M.vis(s, t, tRr[i], 1e9, { dy: 10 }); else PUC.write(s, t, tRr[i], 0.9); });
    M.vis($('#rP'), t, wt('R4', 'bar') - 0.2, 1e9, POP);
    M.vis($('#rb'), t, tR1 + 0.3, z, { dx: 60, dy: 0, ...o });
    const tu = wt('R2', 'used'), t3 = T0('R3'); const shrink = t < t3 - 0.3 ? M.io((t - tu + 0.6) / 0.9) : 1 - M.io((t - t3 + 0.3) / 0.5);
    const w = 280 * (1 - shrink), h = 96 * (1 - shrink); attr(kBlk, 'width', w.toFixed(1)); attr(kBlk, 'x', (260 - w / 2).toFixed(1)); attr(kBlk, 'height', h.toFixed(1)); attr(kBlk, 'y', (436 - h).toFixed(1)); kBlk.style.opacity = h < 1 ? 0 : 1;
    moveGas(kGas, t); kGas.forEach((m, i) => fade(m.g, t, tR1 + 0.6 + i * 0.05, 1e9, 0.2, t > tu + 0.4 && t < t3 - 0.3 ? (i < 2 ? 1 : 0) : 1));
    fade(kNo, t, tu + 0.3, t3 - 0.3); fade(kT, t, wt('R3', 'eleven')); fade(kP1, t, wt('R3', 'carbon')); fade(kP2, t, wt('R3', 'two')); fade(kK, t, wt('R5', 'two'));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Pure') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'stay') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'K') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const x = 0.33 * M.io((t - T0('W3') - 0.5) / 1.6) * (t < T0('W6') ? 0.9 + 0.1 * M.io((t - T0('W5')) / 1) : 1);
    const v1 = 0.48 - x, v2 = 2 * x; const st = wt('W2', 'start');
    const h1 = v1 * WS * M.io((t - st) / 0.5), h2 = v2 * WS;
    attr(wb1, 'y', (WB - h1).toFixed(1)); attr(wb1, 'height', h1.toFixed(1)); attr(wb2, 'y', (WB - h2).toFixed(1)); attr(wb2, 'height', h2.toFixed(1));
    attr(wv1, 'y', (WB - h1 - 12).toFixed(1)); attr(wv2, 'y', (WB - h2 - 12).toFixed(1)); M.setT(wv1, v1.toFixed(2)); M.setT(wv2, v2.toFixed(2)); fade(wv1, t, st); fade(wv2, t, T0('W3') + 0.4);
    fade(wC.g, t, wt('W2', 'plenty')); fade(wCt, t, wt('W4', 'Carbon'));
    M.vis($('#wG'), t, T0('W6') + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'solid') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'just') - 0.2 });
    fade(tq1, t, wt('X3', 'Liquid')); fade(tq2, t, wt('X3', 'vapour'));
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
