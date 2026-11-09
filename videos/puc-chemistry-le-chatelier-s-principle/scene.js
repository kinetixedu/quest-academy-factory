// PUC Chemistry Ep 64: Le Chatelier's principle (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: H2 teal, I2 violet, HI orange (H teal + I violet), K gold, Q blue, forward green, backward red, NO2 brown, heat orange-red
const NC = C.ac, HC = C.ink, GC = '#B7791F', XC = '#C8461B', BC = '#2F6FEB', VC = '#7A4FE0', BR = '#8B4A1C', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3', GDT = '#F4E7CF', AR = '#9AA3B5';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tK = s => `\\textcolor{${GC}}{${s}}`, tQ = s => `\\textcolor{${BC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`, tBr = s => `\\textcolor{${BR}}{${s}}`;
const Kc = tK('K_c'), Qc = tQ('Q_c'), Kk = tK('K'), Qq = tQ('Q');
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const bnc = (u, lo, hi) => { const w = hi - lo, m = ((u % (2 * w)) + 2 * w) % (2 * w); return lo + (m < w ? m : 2 * w - m); };
const harrow = (p, x1, x2, y, col, w = 10) => { const l = mk(p, 'path', { d: '', stroke: col, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: '', fill: col }); const o = { l, h, set(xa, xb) { const dd = xb > xa ? 1 : -1; attr(l, 'd', `M${xa.toFixed(1)} ${y} H${(xb - dd * 14).toFixed(1)}`); attr(h, 'd', `M${(xb - dd * 24).toFixed(1)} ${y - 18} L${xb.toFixed(1)} ${y} L${(xb - dd * 24).toFixed(1)} ${y + 18} Z`); } }; o.set(x1, x2); return o; };
const lab = (p, x, y, s, col, size = 18, anc = 'middle') => txt(p, x, y, s, { 'text-anchor': anc, 'font-size': size, fill: col, 'font-weight': 600 });
const box = (p, x0, y0, x1, y1) => mk(p, 'rect', { x: x0, y: y0, width: x1 - x0, height: y1 - y0, rx: 16, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });

Object.assign(M.IC, {
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18h8', 'M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z', 'M19 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'],
  bottle: ['M10 2h4', 'M10 2v3l-2 3v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-3V2'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  pot: ['M2 12h20', 'M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8', 'M4 8h16', 'M12 4v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQq = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQq, tQq + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['bus', 'Crowded bus', 'SQUEEZE IN', 'bus', 'SHUFFLE', BC], ['bottle', 'Fizzy drink', 'OPEN THE CAP', 'fizzy', 'GAS RUSHES', XC], ['scale', 'Any balance', 'PUSH ON IT', 'space', 'PUSHES BACK', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Lid off: the pressure drops', 'hiss', 'H3'], ['More water turns to steam', 'steam', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('pot', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: the rule + see-saw ---------- */
const QR = [['Henri Le Chatelier, 1884', 'THE RULE', 'P1', 'Henri', NC], ['Change it: it shifts to undo', 'UNDO', 'P2', 'undo', XC], ['Concentration, pressure, heat', 'PUSHES', 'P3', 'concentration', BC], ['Plus: inert gas, catalyst', 'TESTS', 'P3', 'inert', GC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 100}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS'), PX = 392, PY = 330;
mk(ps, 'path', { d: `M${PX - 34} ${PY + 48} L${PX} ${PY} L${PX + 34} ${PY + 48} Z`, fill: HC });
const pBeam = mk(ps, 'g', {}); mk(pBeam, 'rect', { x: -280, y: -8, width: 560, height: 16, rx: 8, fill: '#B08B5A' });
const pL = [0, 1, 2].map(i => mk(pBeam, 'rect', { x: -260 + i * 56, y: -58, width: 48, height: 48, rx: 8, fill: NC }));
const pR = [0, 1, 2].map(i => mk(pBeam, 'rect', { x: 100 + i * 56, y: -58, width: 48, height: 48, rx: 8, fill: XC }));
const pW = mk(pBeam, 'rect', { x: -260 + 3 * 56, y: -58, width: 48, height: 48, rx: 8, fill: NC });
const pMv = mk(pBeam, 'rect', { x: -260 + 3 * 56, y: -58, width: 48, height: 48, rx: 8, fill: NC });
lab(ps, 180, 150, 'REACTANTS', NC, 18); lab(ps, 604, 150, 'PRODUCTS', XC, 18);
const pSt = lab(ps, PX, 450, '', HC, 20);

/* ---------- S: H2 + I2 bench ---------- */
const b = $('#bS'), BX = [176, 130, 600, 400];
const bBox = box(b, 150, 100, 630, 430);
const MOL = []; const addM = (type, born = 0) => { const g = mk(b, 'g', {}); const a = dot(g, 11, NC), c = dot(g, 11, NC); attr(c, 'cx', 20); const i = MOL.length; MOL.push({ g, a, c, type, born, x: rnd(i, 1), y: rnd(i, 2), vx: 30 + 40 * rnd(i, 3), vy: 26 + 36 * rnd(i, 4) }); };
for (let i = 0; i < 4; i++) addM('H'); for (let i = 0; i < 4; i++) addM('I'); for (let i = 0; i < 10; i++) addM('HI'); for (let i = 0; i < 4; i++) addM('H', 1);
const typeAt = (m, i, t, ev) => { let ty = m.type; if (t >= ev.react && [18, 19, 4, 5].includes(i)) ty = 'HI'; if (t >= ev.refill && [0, 6].includes(i)) ty = 'HI'; return ty; };
const COL = { H: [NC, NC, 9, 9], I: [VC, VC, 13, 13], HI: [NC, VC, 8, 13] };
const bLeg = [['H₂', NC, NC, 9, 9, 200], ['I₂', VC, VC, 13, 13, 350], ['HI', NC, VC, 8, 13, 500]].map(([s, c1, c2, r1, r2, x]) => { const g = mk(b, 'g', {}); mk(g, 'circle', { cx: x - 50, cy: 464, r: r1, fill: c1 }); mk(g, 'circle', { cx: x - 30, cy: 464, r: r2, fill: c2 }); lab(g, x, 472, s, HC, 22, 'start'); return g; });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), QX0 = 80, QX1 = 704, QY = 230;
mk(es, 'line', { x1: QX0, y1: QY, x2: QX1, y2: QY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
lab(es, QX0, QY + 44, 'SMALL', HC, 16, 'start'); lab(es, QX1, QY + 44, 'BIG', HC, 16, 'end');
const eK = mk(es, 'g', {}); mk(eK, 'line', { x1: 392, y1: QY - 70, x2: 392, y2: QY + 70, stroke: GC, 'stroke-width': 5 }); lab(eK, 392, QY - 84, 'K = 57.0', GC, 22);
const eQ = mk(es, 'g', {}); mk(eQ, 'circle', { r: 18, fill: BC }); lab(eQ, 0, -32, 'Q', BC, 22);
const eA = harrow(es, 200, 370, 360, OK, 10), eAl = lab(es, 392, 410, 'FORWARD: MORE HI FORMS', OK, 18);
const eSt = lab(es, 392, 330, '', HC, 20);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Add something, and it gets used up. Cool!' });

/* ---------- L: pressure ---------- */
const ls = $('#lS');
const cyl = mk(ls, 'rect', { x: 60, y: 90, width: 660, height: 180, rx: 14, fill: '#fff', stroke: C.ink2, 'stroke-width': 4 });
const pist = mk(ls, 'g', {}); mk(pist, 'rect', { x: 0, y: 84, width: 22, height: 192, rx: 6, fill: HC }); mk(pist, 'rect', { x: 22, y: 166, width: 120, height: 28, rx: 6, fill: HC });
const LM = Array.from({ length: 8 }, (_, i) => { const g = mk(ls, 'g', {}); const a = dot(g, 12, NC), c = dot(g, 12, NC); return { g, a, c, x: rnd(i, 7), y: rnd(i, 8), vx: 30 + 40 * rnd(i, 9), vy: 24 + 30 * rnd(i, 10) }; });
const lCnt = lab(ls, 390, 296, '', HC, 20);
$('#lEq').innerHTML = K(`\\text{Squeeze} \\Rightarrow ${tO('\\text{fewer gas molecules}')}`);
const GT = [['P\\uparrow', 'FEWER MOLECULES', 'SQUEEZE: SHIFTS TO THE SMALLER SIDE', OK, wt('L2', 'Squeeze')], ['P\\downarrow', 'MORE MOLECULES', 'LOWER: SHIFTS TO THE BIGGER SIDE', BC, wt('L3', 'Lower')], ['\\mathrm{H_2 + I_2 \\rightleftharpoons 2HI}', 'NO CHANGE', '2 MOLECULES ON EACH SIDE', GC, wt('L3', 'Same')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px"><div class="gk">${K(k)}</div><div class="gv" style="color:${c}">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: halve the volume ---------- */
const MS = [[K(`\\mathrm{CO + 3H_2 \\rightleftharpoons CH_4 + H_2O}`), 'D2'], [K(`V \\div 2 \\Rightarrow \\text{every } [\\ ] \\times 2`), 'D3'], [K(`${Qc} = \\dfrac{2 \\times 2}{2 \\times 2^3}\\,${Kc} = \\dfrac{${Kc}}{4}`), 'D4'], [K(`${Qc} < ${Kc} \\Rightarrow ${tO('\\text{forward}')}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 118}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS');
const dL = mk(ds, 'g', {}); mk(dL, 'rect', { x: 50, y: 80, width: 320, height: 150, rx: 14, fill: C.soft }); lab(dL, 210, 150, '4', NC, 56); lab(dL, 210, 200, 'GAS MOLECULES · LEFT', C.mute, 16);
const dR = mk(ds, 'g', {}); mk(dR, 'rect', { x: 414, y: 80, width: 320, height: 150, rx: 14, fill: C.soft }); lab(dR, 574, 150, '2', XC, 56); lab(dR, 574, 200, 'GAS MOLECULES · RIGHT', C.mute, 16);
const DY = 370; mk(ds, 'line', { x1: 80, y1: DY, x2: 704, y2: DY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
const dK = mk(ds, 'g', {}); mk(dK, 'line', { x1: 560, y1: DY - 60, x2: 560, y2: DY + 60, stroke: GC, 'stroke-width': 5 }); lab(dK, 560, DY + 90, 'K', GC, 22);
const dQ = mk(ds, 'g', {}); mk(dQ, 'circle', { r: 18, fill: BC }); lab(dQ, 0, -30, 'Q', BC, 22);
const dQl = lab(ds, 240, DY + 90, 'Q = K / 4', BC, 20), dA = harrow(ds, 260, 520, DY + 140, OK, 10);

/* ---------- G: three more pushes ---------- */
const GR = [['Inert gas, fixed volume', 'NO SHIFT', 'G2', 'inert', AR], ['Temperature changes K', 'K CHANGES', 'G3', 'Temperature', XC], ['Gives out heat: heat it', 'BACKWARD', 'G4', 'heating', RD], ['Catalyst: both ways faster', 'NO SHIFT', 'G5', 'catalyst', GC]];
$('#grs').innerHTML = GR.map(([k, v, , , c], i) => `<div class="qr" id="gr${i}" style="top:${96 + i * 100}px"><div class="nn">${i + 1}</div><div class="qt">${k}</div><div class="qk" style="color:${c}">${v}</div></div>`).join('');
const tGr = GR.map(g => wt(g[2], g[3]) - 0.1);
const gs = $('#gS');
const gA = mk(gs, 'g', {}); box(gA, 120, 80, 664, 380); const gAm = Array.from({ length: 10 }, (_, i) => { const g = mk(gA, 'g', {}); dot(g, 11, i < 5 ? NC : XC); const c = dot(g, 11, i < 5 ? NC : XC); attr(c, 'cx', 20); return { g, x: rnd(i, 3), y: rnd(i, 4), vx: 30 + 30 * rnd(i, 5), vy: 26 + 30 * rnd(i, 6) }; });
const gAr = Array.from({ length: 6 }, (_, i) => ({ e: dot(gA, 10, AR), x: rnd(i, 13), y: rnd(i, 14), vx: 40 + 30 * rnd(i, 15), vy: 30 + 30 * rnd(i, 16) }));
lab(gA, 392, 430, 'ARGON ADDED · PARTIAL PRESSURES SAME', AR, 18);
const gB = mk(gs, 'g', {}); const th = mk(gB, 'g', {}); mk(th, 'rect', { x: 110, y: 110, width: 28, height: 260, rx: 14, fill: '#fff', stroke: HC, 'stroke-width': 3 }); mk(th, 'circle', { cx: 124, cy: 384, r: 24, fill: XC }); const thM = mk(th, 'rect', { x: 117, y: 300, width: 14, height: 80, fill: XC });
mk(gB, 'line', { x1: 240, y1: 380, x2: 680, y2: 380, stroke: C.ink2, 'stroke-width': 3 }); const gKb = mk(gB, 'rect', { x: 300, y: 160, width: 140, height: 220, rx: 8, fill: GC }); const gKt = lab(gB, 370, 420, 'K NOW', GC, 18);
const gKo = mk(gB, 'rect', { x: 500, y: 160, width: 140, height: 220, rx: 8, fill: GDT, stroke: GC, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); lab(gB, 570, 420, 'K BEFORE', GC, 18);
const gBl = lab(gB, 392, 470, 'HEAT IS A PRODUCT: HEATING SHIFTS BACKWARD', RD, 17);
const gC = mk(gs, 'g', {}); const gF = harrow(gC, 160, 620, 200, OK, 8), gBk = harrow(gC, 620, 160, 300, RD, 8); lab(gC, 392, 170, 'FORWARD', OK, 18); lab(gC, 392, 350, 'BACKWARD', RD, 18); lab(gC, 392, 430, 'BOTH FASTER · SAME K · SOONER', GC, 20);

/* ---------- C: NO2 hot vs cold ---------- */
const flask = (p, bath, col) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: 120, y: 250, width: 544, height: 200, rx: 18, fill: bath }); const f = mk(g, 'circle', { cx: 392, cy: 270, r: 110, fill: col, stroke: C.ink2, 'stroke-width': 4 }); mk(g, 'rect', { x: 368, y: 134, width: 48, height: 44, fill: col, stroke: C.ink2, 'stroke-width': 4 }); return { g, f }; };
const caE = document.createElement('div'); caE.className = 'fx fxc'; caE.style.cssText = 'top:78px;font-size:30px'; caE.innerHTML = K(`2${tBr('\\mathrm{NO_2}')} \\rightleftharpoons \\mathrm{N_2O_4},\\ \\Delta H = -57.2\\ \\text{kJ mol}^{-1}`); $('#ca').appendChild(caE);
const cA = flask($('#caS'), '#E3F1FA', '#fff'), cB = flask($('#cfS'), '#FBE3D6', '#fff');
const cAl = lab($('#caS'), 392, 500, 'PALE · MORE N₂O₄', HC, 20), cBl = lab($('#cfS'), 392, 500, 'DARK BROWN · MORE NO₂', BR, 20);
const cBt = lab($('#cfS'), 392, 540, 'HEAT SHIFTS IT BACKWARD', RD, 18);
const th1 = PUC.think($('#th1'), { q: 'Making ammonia gives out heat. Heat the mixture: does ammonia go up or down?', opts: ['Up', 'Down'], right: 1, why: 'Down. Heat acts like a product, so the reaction shifts backward and some ammonia breaks up.' });

/* ---------- R: Haber ---------- */
const RR = [[K(`\\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3},\\ \\Delta H = -92.38\\ \\text{kJ mol}^{-1}`), 'R2', 'Nitrogen'], ['<span class="stx tx">4 molecules to 2: high pressure helps</span>', 'R3', 'Four', 1], ['<span class="stx tx">Gives out heat, but cold is too slow</span>', 'R4', 'gives', 1], ['<span class="stx tx">Iron catalyst: faster, same K</span>', 'R5', 'iron', 1]];
$('#rrs').innerHTML = RR.map(([s, , , tx], i) => `<div class="dr" id="rr${i}" style="top:${96 + i * 96}px"><div class="sn">${i + 1}</div>${tx ? s : `<div class="stx">${s}</div>`}</div>`).join('');
const tRr = RR.map(r => wt(r[1], r[2]) - 0.1);
$('#rP').innerHTML = `NCERT: about 500 °C and 200 atm, iron catalyst`;
const ks = $('#kS');
const tile = (p, y, v, k, col) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: 60, y, width: 664, height: 120, rx: 16, fill: C.soft }); lab(g, 200, y + 76, v, col, 44); lab(g, 380, y + 70, k, C.mute, 20, 'start'); return g; };
const kT = [tile(ks, 90, '200 atm', 'HIGH PRESSURE', BC), tile(ks, 236, '500 °C', 'MIDDLE TEMPERATURE', XC), tile(ks, 382, 'Fe', 'IRON CATALYST', GC)];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{add} \\to \\text{shifts away} \\qquad P\\uparrow \\to \\text{fewer molecules} \\qquad \\text{heat} \\to \\text{endothermic way}`);

/* ---------- W: add H2 ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`[\\mathrm{HI}]^2 = 57.0 \\times 0.01 = 0.57,\\ [\\mathrm{HI}] \\approx 0.755`)],
  [K(`${Qc} = \\dfrac{0.57}{0.20 \\times 0.10}`)],
  [K(`${Qc} = ${tQ('28.5')} = ${Kc} / 2`)],
  [K(`${Qc} < ${Kc} \\Rightarrow ${tO('\\text{forward}')}`)]], { label: 'WORKED EXAMPLE', y0: 216, dy: 94 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WX0 = 80, WX1 = 704, WY = 220, wx = v => WX0 + v / 70 * (WX1 - WX0);
mk(ws, 'line', { x1: WX0, y1: WY, x2: WX1, y2: WY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
[0, 20, 40, 60].forEach(v => { mk(ws, 'line', { x1: wx(v), y1: WY - 10, x2: wx(v), y2: WY + 10, stroke: C.ink2, 'stroke-width': 3 }); lab(ws, wx(v), WY + 40, String(v), HC, 16); });
const wK = mk(ws, 'g', {}); mk(wK, 'line', { x1: wx(57), y1: WY - 60, x2: wx(57), y2: WY + 60, stroke: GC, 'stroke-width': 5 }); lab(wK, wx(57), WY - 74, 'K = 57', GC, 20);
const wQ = mk(ws, 'g', {}); mk(wQ, 'circle', { r: 16, fill: BC }); const wQv = lab(wQ, 0, -28, '', BC, 20);
const wA = harrow(ws, wx(30), wx(54), WY + 100, OK, 10), wAl = lab(ws, wx(42), WY + 150, 'MORE HI FORMS', OK, 18);
const wTl = [['[H₂]', '0.10 → 0.20', NC], ['[I₂]', '0.10', VC], ['[HI]', '0.755', XC]].map(([a, v, c], i) => { const g = mk(ws, 'g', {}); mk(g, 'rect', { x: 60 + i * 226, y: 400, width: 210, height: 64, rx: 12, fill: C.soft }); lab(g, 76 + i * 226, 440, a, c, 20, 'start'); lab(g, 254 + i * 226, 440, v, HC, 18, 'end'); return g; });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K('\\text{Catalyst} \\Rightarrow \\text{more product}'), right: K(`\\text{Catalyst: same } ${Kk}\\text{, reached sooner}`) });
const tsv = $('#tS');
const tq1 = txt(tsv, 60, 110, 'INERT GAS · FIXED V', { 'font-size': 28, fill: AR, 'font-weight': 600 }), tq2 = txt(tsv, 60, 170, 'NO SHIFT', { 'font-size': 28, fill: HC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Effect of concentration, pressure, temperature, inert gas and catalyst; Haber process conditions' });
const OPT = ['Adding a catalyst', 'Higher pressure', 'Higher temperature', 'Adding Cl₂'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), ΔH > 0. Which change gives more PCl₃ at equilibrium?', qW: 780,
  opts: OPT, right: 2, optW: 474, optY: 330, optH: 110, optFs: 28 });
const so = PUC.solution($('#so'), [['Takes in heat: heating goes forward'], ['Pressure up: fewer molecules, backward'], ['Adding Cl₂: backward'], ['A catalyst only speeds it up']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'chlorine'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Le Chatelier\'s principle', y0: 96, dy: 74, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Rule</b>: change the conditions, the equilibrium shifts to undo the change', '<b>Add</b> a substance: shifts away · <b>remove</b>: shifts toward', '<b>Pressure up</b>: side with fewer gas molecules · equal numbers: no change',
    '<b>Heat</b>: changes K, favours the heat-taking way · <b>catalyst, inert gas (fixed V)</b>: no shift', '<b>Haber</b>: N₂ + 3H₂ ⇌ 2NH₃, ΔH = -92.38 kJ mol⁻¹ · ~500 °C, 200 atm, iron'] });
const YQ = ['You add more reactant. Which way does the equilibrium move?', 'Why does high pressure help the Haber process?', 'Does a catalyst change K?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 65', topic: 'Why is lemon sour and soap slippery? Acids, Bases and Salts', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQq - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S3') - 0.2, 1.05, 960, 560], [T0('S5') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 150; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.gt .gk').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 440) q.style.fontSize = Math.floor(40 * 440 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const EV = { add: wt('S2', 'add'), react: wt('S3', 'makes'), rem: wt('S5', 'away'), refill: wt('S5', 'More') };
const qAt = t => { let q = 0; if (t > EV.add) q = -1.4 * M.io((t - EV.add - 0.3) / 0.6); if (t > EV.react) q = M.lerp(-1.4, 0, M.io((t - EV.react) / (T1('S4') - EV.react))); if (t > EV.rem) q = -1.2 * M.io((t - EV.rem - 0.2) / 0.6); if (t > EV.refill) q = M.lerp(-1.2, 0, M.io((t - EV.refill) / 1.6)); return q; };

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
    const tBd = [wt('H2', 'Push'), wt('H2', 'pushes'), wt('H2', 'equilibrium')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'back') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'push') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tQr[1] - 0.2, out, { dx: 60, dy: 0, ...o });
    const tw = wt('P4', 'weight'), tf = wt('P4', 'fight');
    const add = M.io((t - tw) / 0.4), mv = M.io((t - tf) / 0.8);
    fade(pW, t, tw - 0.1); attr(pW, 'y', (-58 - 120 * (1 - add)).toFixed(1));
    fade(pMv, t, tf, 1e9, 0.1); attr(pMv, 'x', M.lerp(-260 + 3 * 56, 100 + 3 * 56, mv).toFixed(1)); attr(pMv, 'y', (-58 - 90 * Math.sin(Math.PI * mv)).toFixed(1)); pMv.setAttribute('fill', mix(NC, XC, mv));
    const nl = 3 + add - mv * 1, nr = 3 + mv * 1; const ang = M.clamp((nl - nr) * 7, -14, 14); attr(pBeam, 'transform', `translate(${PX},${PY - 8}) rotate(${(-ang).toFixed(2)})`);
    M.setT(pSt, t >= tf + 0.6 ? 'SHIFTED · BALANCED AGAIN' : t >= tw ? 'PUSHED · OUT OF BALANCE' : 'AT BALANCE'); pSt.setAttribute('fill', t >= tf + 0.6 ? OK : t >= tw ? RD : HC); fade(pSt, t, tQr[1]);
    M.vis($('#pP'), t, tf + 0.6, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    fade(bBox, t, tS1 + 0.2); bLeg.forEach(e => fade(e, t, tS1 + 0.6));
    MOL.forEach((m, i) => {
      const ty = typeAt(m, i, t, EV), c = COL[ty]; attr(m.a, 'fill', c[0]); attr(m.c, 'fill', c[1]); attr(m.a, 'r', c[2]); attr(m.c, 'r', c[3]); attr(m.c, 'cx', ty === 'HI' ? 19 : 20);
      const born = m.born ? EV.add + (i - 18) * 0.12 : tS1 + 0.4 + i * 0.02, gone = (i >= 8 && i <= 11) ? EV.rem + (i - 8) * 0.1 : 1e9;
      fade(m.g, t, born, gone, 0.3);
      const drop = m.born ? 140 * (1 - M.io((t - born) / 0.6)) : 0;
      attr(m.g, 'transform', `translate(${bnc(BX[0] + m.x * (BX[2] - BX[0]) + m.vx * t, BX[0], BX[2]).toFixed(1)},${(bnc(BX[1] + m.y * (BX[3] - BX[1]) + m.vy * t, BX[1], BX[3]) - drop).toFixed(1)})`);
    });
    const TAG = [[tS1 + 0.3, 'AT EQUILIBRIUM'], [EV.add, 'ADD H₂'], [EV.react, 'H₂ + I₂ → 2HI'], [T0('S4'), 'BACK TO Q = K'], [EV.rem, 'REMOVE HI'], [EV.refill, 'MORE HI FORMS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    fade(eK, t, tS1 + 0.6); const q = qAt(t); attr(eQ, 'transform', `translate(${(392 + 200 * q).toFixed(1)},${QY})`); fade(eQ, t, tS1 + 0.8);
    const fw = (t > EV.react && t < T1('S4')) || (t > EV.refill && t < EV.refill + 2.2); [eA.l, eA.h, eAl].forEach(e => fade(e, t, fw ? t - 1 : 1e9, 1e9, 0.2));
    M.setT(eSt, q < -0.15 ? 'Q < K' : 'Q = K'); eSt.setAttribute('fill', q < -0.15 ? BC : GC); fade(eSt, t, tS1 + 0.8);
    $('#eG').innerHTML = t >= T0('S6') ? K(`\\text{add} \\to ${tO('\\text{away}')} \\qquad \\text{remove} \\to ${tO('\\text{toward}')}`) : ''; fade($('#eG'), t, T0('S6'));
    avD(t, wt('S6', 'Remove') - 0.2, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    const tq = wt('L2', 'Squeeze'), tl = wt('L3', 'Lower'), sq = M.io((t - tq) / 0.8) * (1 - M.io((t - tl) / 0.8));
    const px = M.lerp(690, 420, sq); attr(pist, 'transform', `translate(${px.toFixed(1)},0)`); fade(cyl, t, tL1 + 0.3); fade(pist, t, tL1 + 0.3);
    const pr = M.io((t - wt('L1', 'pairs')) / 0.5), pq = M.io((t - tq - 0.6) / 0.6) * (1 - M.io((t - tl - 0.4) / 0.6)), pairOn = Math.max(pr * 0, pq);
    LM.forEach((m, i) => { const paired = i < 4 ? pairOn : 0; const x = bnc(80 + m.x * (px - 120) + m.vx * t, 80, px - 30), y = bnc(110 + m.y * 140 + m.vy * t, 110, 250); attr(m.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); const ox = i < 4 ? 22 * paired : 0; attr(m.c, 'cx', ox.toFixed(1)); m.c.style.opacity = i < 4 ? '1' : '0'; attr(m.a, 'fill', paired > 0.5 ? XC : NC); attr(m.c, 'fill', paired > 0.5 ? XC : NC); fade(m.g, t, tL1 + 0.5 + i * 0.05, 1e9, 0.2); });
    M.setT(lCnt, pairOn > 0.5 ? 'SQUEEZED: PAIRS FORM · FEWER MOLECULES' : t > tl ? 'MORE ROOM: PAIRS SPLIT · MORE MOLECULES' : 'GAS MOLECULES IN A CYLINDER'); fade(lCnt, t, tL1 + 0.6);
    PUC.write($('#lEq'), t, tq + 0.2, 1.0);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.3, 1e9, { dy: 24 }); const on = M.io((t - g[4]) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4]) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, tD1 + 0.3, z, { dx: 60, dy: 0, ...o });
    fade(dL, t, wt('D2', 'Four')); fade(dR, t, wt('D2', 'two'));
    fade(dK, t, T0('D3')); const t4 = wt('D4', 'quarter'), t5 = wt('D5', 'forward');
    const qx = t < t4 ? 560 : t < t5 ? M.lerp(560, 260, M.io((t - t4) / 0.6)) : M.lerp(260, 540, M.io((t - t5) / 1.6));
    attr(dQ, 'transform', `translate(${qx.toFixed(1)},${DY})`); fade(dQ, t, T0('D3') + 0.2); fade(dQl, t, t4 + 0.3); [dA.l, dA.h].forEach(e => fade(e, t, t5));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    GR.forEach((_, i) => { const el = $('#gr' + i); M.vis(el, t, tGr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tGr[i + 1] : T1('G5') + 0.4; const on = M.io((t - tGr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    fade(gA, t, tG1 + 0.5, tGr[1] - 0.1); gAm.forEach(m => attr(m.g, 'transform', `translate(${bnc(140 + m.x * 480 + m.vx * t, 140, 620).toFixed(1)},${bnc(100 + m.y * 260 + m.vy * t, 100, 360).toFixed(1)})`));
    gAr.forEach((m, i) => { fade(m.e, t, tGr[0] + 0.4 + i * 0.1, 1e9, 0.2); pos(m.e, bnc(140 + m.x * 500 + m.vx * t, 140, 640), bnc(100 + m.y * 260 + m.vy * t, 100, 360)); });
    fade(gB, t, tGr[1], tGr[3] - 0.1); const ht = M.io((t - wt('G4', 'heating')) / 1.0); attr(thM, 'y', (300 - 150 * ht).toFixed(1)); attr(thM, 'height', (80 + 150 * ht).toFixed(1));
    const kh = 220 - 130 * ht; attr(gKb, 'y', (380 - kh).toFixed(1)); attr(gKb, 'height', kh.toFixed(1)); fade(gBl, t, wt('G4', 'product'));
    fade(gC, t, tGr[3]); const sp = M.io((t - tGr[3] - 0.4) / 0.8); [gF.l, gBk.l].forEach(l => attr(l, 'stroke-width', (8 + 10 * sp).toFixed(1)));
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'hot') - 0.3, zc, { dx: 60, dy: 0, ...o });
    M.vis(caE, t, wt('C1', 'Brown'), 1e9, { dy: 10 });
    fade(cA.g, t, wt('C1', 'ice') - 0.2); fade(cB.g, t, wt('C1', 'hot') - 0.2);
    const ui = M.io((t - wt('C1', 'pale')) / 0.8), uh = M.io((t - wt('C1', 'dark')) / 0.8);
    [cA.f, cA.g.children[2]].forEach(e => attr(e, 'fill', mix('#C8956A', '#F3E9DF', ui))); [cB.f, cB.g.children[2]].forEach(e => attr(e, 'fill', mix('#C8956A', BR, uh)));
    fade(cAl, t, wt('C1', 'pale')); fade(cBl, t, wt('C1', 'dark')); fade(cBt, t, wt('C1', 'brown', 1) + 0.3);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'does') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Heat') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RR.forEach((_, i) => { const r = $('#rr' + i); M.vis(r.querySelector('.sn'), t, tRr[i] - 0.1, 1e9, POP); const s = r.querySelector('.stx'); if (i > 0) M.vis(s, t, tRr[i], 1e9, { dy: 10 }); else PUC.write(s, t, tRr[i], 0.9); });
    M.vis($('#rP'), t, wt('R4', 'five') - 0.2, 1e9, POP);
    M.vis($('#rb'), t, tR1 + 0.3, z, { dx: 60, dy: 0, ...o });
    kT.forEach((g, i) => fade(g, t, [wt('R3', 'two'), wt('R4', 'five'), wt('R5', 'iron')][i]));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Push') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'pushes') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'back') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    fade(wK, t, wt('W2', 'fifty')); const t5 = T0('W5'), t6 = wt('W6', 'forward');
    const qv = t < t5 ? 57 : t < t6 ? M.lerp(57, 28.5, M.io((t - t5) / 0.8)) : M.lerp(28.5, 52, M.io((t - t6) / 1.8));
    attr(wQ, 'transform', `translate(${wx(qv).toFixed(1)},${WY})`); M.setT(wQv, t < t5 ? 'Q = K' : t < t6 + 0.1 ? 'Q = 28.5' : 'Q → K'); fade(wQ, t, T0('W3'));
    [wA.l, wA.h, wAl].forEach(e => fade(e, t, t6));
    wTl.forEach((g, i) => fade(g, t, [wt('W2', 'add'), wt('W2', 'iodine'), T0('W3') + 1][i]));
    M.vis($('#wG'), t, T0('W6') + 0.6, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQq + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'catalyst') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'speed') - 0.2 });
    fade(tq1, t, wt('X3', 'inert')); fade(tq2, t, wt('X3', 'nothing'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQq && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQq + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQq, tOpts: wt('Q1', 'Which') - 0.1, tCount, tAns });
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
