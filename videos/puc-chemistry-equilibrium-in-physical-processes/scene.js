// PUC Chemistry Ep 58: Equilibrium in physical processes (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: forward change (melting, evaporating, dissolving, escaping) orange; backward change (freezing, condensing, returning) blue; balance green;
// water molecules teal, sugar gold, iodine violet, CO2 slate, pressure blue
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', SL = '#5A6478', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3', WB = '#DCEFF8';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tF = s => `\\textcolor{${XC}}{${s}}`, tBk = s => `\\textcolor{${BC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`;
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const varrow = (p, x, y1, y2, col, w = 6) => { const d = y2 > y1 ? 1 : -1; const g = mk(p, 'g', {}); mk(g, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return g; };
const fillC = (e, c) => { if (e._f !== c) { e._f = c; e.setAttribute('fill', c); } };

Object.assign(M.IC, {
  bottle: ['M10 2h4', 'M10 2v3l-2 3v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-3V2'],
  glass: ['M5 3h14l-2 18H7Z', 'M6 9h12'],
  fizz: ['M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M8 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M15 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'],
  ice: ['M3 7l9-4 9 4v10l-9 4-9-4Z', 'M3 7l9 4 9-4', 'M12 11v10'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tFc = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tFc, tFc + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['bottle', 'Closed bottle', 'NEVER DRIES UP', 'closed', 'LEVEL STAYS', BC], ['glass', 'Open glass', 'DRIES IN DAYS', 'open', 'DRIES UP', XC], ['fizz', 'Soda bottle', 'CALM, THEN FIZZ', 'soda', 'FIZZES', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'closed') - 0.3, wt('H1', 'open') - 0.3, wt('H1', 'days') - 0.1];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Ice and water: nothing changes?', 'Nothing', 'H3'], ['At equilibrium, does it all stop?', 'stop', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('ice', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]) - 0.2);

/* ---------- P: shop ---------- */
const QR = [['5 people walk in each minute', 'IN 5', 'P2', 'walk', XC], ['5 people walk out each minute', 'OUT 5', 'P2', 'out', BC], ['The crowd inside stays the same', 'SAME', 'P3', 'crowd', OK]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = [wt('P2', 'walk'), wt('P2', 'out'), wt('P3', 'crowd')];
const ps = $('#pS');
const shop = mk(ps, 'g', {});
mk(shop, 'path', { d: 'M300 110 H700 V420 H300 V320 M300 210 V110', stroke: C.ink2, 'stroke-width': 5, fill: '#FBFCFE', 'stroke-linejoin': 'round' });
mk(shop, 'rect', { x: 296, y: 210, width: 8, height: 110, fill: C.soft });
txt(shop, 500, 450, 'SHOP', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });
txt(shop, 300, 450, 'DOOR', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const person = (p, col) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: -14, r: 8, fill: col }); mk(g, 'path', { d: 'M-10 10 Q-10 -4 0 -4 Q10 -4 10 10 Z', fill: col }); return g; };
const crowd = Array.from({ length: 12 }, (_, i) => ({ g: person(ps, HC), x: 360 + (i % 4) * 90 + rnd(i, 1) * 30, y: 160 + Math.floor(i / 4) * 85 + rnd(i, 2) * 20, ph: rnd(i, 3) * 6.28 }));
const lanes = Array.from({ length: 6 }, (_, i) => ({ g: person(ps, i < 3 ? XC : BC), inn: i < 3, k: i % 3 }));
const pIn = txt(ps, 150, 238, 'IN →', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 }), pOut = txt(ps, 150, 316, '← OUT', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const pCnt = txt(ps, 500, 90, 'INSIDE: 12', { 'text-anchor': 'middle', 'font-size': 24, fill: OK, 'font-weight': 600 });

/* ---------- S: ice bench ---------- */
const b = $('#bS');
const flask = mk(b, 'path', { d: 'M130 110 V430 a20 20 0 0 0 20 20 H450 a20 20 0 0 0 20 -20 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const lid = mk(b, 'rect', { x: 118, y: 96, width: 364, height: 16, rx: 6, fill: HC });
const water = mk(b, 'rect', { x: 132, y: 270, width: 336, height: 178, fill: WB });
const SITES = Array.from({ length: 12 }, (_, i) => [205 + (i % 4) * 38, 222 + Math.floor(i / 4) * 38]);
const SLOTS = Array.from({ length: 12 }, (_, j) => [170 + (j % 6) * 52 + rnd(j, 8) * 18, 340 + Math.floor(j / 6) * 52 + rnd(j, 9) * 18]);
const iceBox = mk(b, 'rect', { x: 186, y: 203, width: 152, height: 114, rx: 10, fill: 'none', stroke: '#7FB8DA', 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const parts = Array.from({ length: 24 }, (_, i) => ({ e: dot(b, 13, NC), ph: rnd(i, 3) * 6.283 }));
const SITE_ORD = [0, 3, 8, 11, 1, 4, 7, 9, 2, 10, 5, 6], PER = 1.15;
const thS = mk(b, 'g', {}); mk(thS, 'rect', { x: 600, y: 160, width: 22, height: 150, rx: 11, fill: '#fff', stroke: HC, 'stroke-width': 3 }); mk(thS, 'circle', { cx: 611, cy: 318, r: 18, fill: BC }); mk(thS, 'rect', { x: 606, y: 250, width: 10, height: 68, fill: BC });
const thT = txt(b, 611, 380, '0 °C', { 'text-anchor': 'middle', 'font-size': 30, fill: BC, 'font-weight': 600 }), thK = txt(b, 611, 414, '273 K', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const mL = txt(b, 300, 500, 'MELTING: ICE → WATER', { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 }), fL = txt(b, 300, 530, 'FREEZING: WATER → ICE', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#eG').innerHTML = K(`\\mathrm{${tN('H_2O(s)')}\\ \\rightleftharpoons\\ ${tN('H_2O(l)')}}`);
const es = $('#eS');
const rateRow = (y, lab, col) => { const g = mk(es, 'g', {}); txt(g, 36, y, lab, { 'font-size': 20, fill: col, 'font-weight': 600 }); mk(g, 'rect', { x: 36, y: y + 16, width: 520, height: 52, rx: 12, fill: C.soft }); const r = mk(g, 'rect', { x: 36, y: y + 16, width: 0, height: 52, rx: 12, fill: col }); const v = txt(g, 748, y + 54, '5 / s', { 'text-anchor': 'end', 'font-size': 32, fill: col, 'font-weight': 600 }); return { g, r, v }; };
const rM = rateRow(190, 'MELTING SPEED', XC), rF = rateRow(300, 'FREEZING SPEED', BC);
const eqS = txt(es, 652, 300, '=', { 'text-anchor': 'middle', 'font-size': 56, fill: OK, 'font-weight': 700 });
const tile = (x, lab) => { const g = mk(es, 'g', {}); mk(g, 'rect', { x, y: 410, width: 340, height: 64, rx: 12, fill: OKT }); const v = txt(g, x + 170, 452, lab, { 'text-anchor': 'middle', 'font-size': 22, fill: OK, 'font-weight': 600 }); return g; };
const tlIce = tile(36, 'ICE: 12 · STAYS'), tlWat = tile(408, 'WATER: 12 · STAYS');
const sPill = document.createElement('div'); sPill.className = 'pillp ink'; sPill.style.cssText = 'left:36px;top:494px'; sPill.textContent = '273 K at 1 atm: the normal melting point'; $('#eb').appendChild(sPill);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'My glass is busy, not still!' });

/* ---------- L: liquid and vapour ---------- */
const ls = $('#lS');
mk(ls, 'path', { d: 'M150 120 V430 a20 20 0 0 0 20 20 H430 a20 20 0 0 0 20 -20 V120', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const lLid = mk(ls, 'rect', { x: 138, y: 106, width: 324, height: 16, rx: 6, fill: HC });
const lWat = mk(ls, 'rect', { x: 152, y: 330, width: 296, height: 118, fill: WB });
const lSurf = mk(ls, 'line', { x1: 152, y1: 330, x2: 448, y2: 330, stroke: '#7FB8DA', 'stroke-width': 3 });
const vap = Array.from({ length: 14 }, (_, i) => ({ e: dot(ls, 11, NC), x: 185 + (i % 5) * 58 + rnd(i, 1) * 16, y: 152 + Math.floor(i / 5) * 56 + rnd(i, 2) * 14, ph: rnd(i, 3) * 6.283 }));
const lTag = document.createElement('div'); lTag.className = 'btag'; lTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#lb').appendChild(lTag);
const lE = txt(ls, 610, 230, '↑ EVAPORATION', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 }), lC = txt(ls, 610, 280, '↓ CONDENSATION', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const lVP = txt(ls, 610, 360, 'VAPOUR PRESSURE', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }), lVP2 = txt(ls, 610, 392, 'FIXED', { 'text-anchor': 'middle', 'font-size': 26, fill: OK, 'font-weight': 600 });
const g2 = $('#gS2'), GX0 = 100, GX1 = 720, GYb = 420, GYt = 190;
mk(g2, 'line', { x1: GX0, y1: 100, x2: GX0, y2: GYb, stroke: C.ink2, 'stroke-width': 3 }); mk(g2, 'line', { x1: GX0, y1: GYb, x2: GX1, y2: GYb, stroke: C.ink2, 'stroke-width': 3 });
txt(g2, GX0 + 12, 112, 'SPEED', { 'font-size': 18, fill: HC, 'font-weight': 600 }); txt(g2, GX1, GYb + 32, 'TIME →', { 'text-anchor': 'end', 'font-size': 18, fill: HC, 'font-weight': 600 });
const evL = mk(g2, 'path', { d: `M${GX0} ${GYt} H${GX1 - 10}`, stroke: XC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
let cd = `M${GX0} ${GYb}`; for (let x = GX0; x <= GX1 - 10; x += 10) cd += ` L${x} ${(GYb - (GYb - GYt) * (1 - Math.exp(-(x - GX0) / 110))).toFixed(1)}`;
const cnL = mk(g2, 'path', { d: cd, stroke: BC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const evT = txt(g2, GX0 + 20, GYt - 18, 'EVAPORATION', { 'font-size': 18, fill: XC, 'font-weight': 600 }), cnT = txt(g2, 300, 360, 'CONDENSATION', { 'font-size': 18, fill: BC, 'font-weight': 600 });
const eqV = mk(g2, 'line', { x1: 560, y1: 140, x2: 560, y2: GYb, stroke: OK, 'stroke-width': 3, 'stroke-dasharray': '8 6' }), eqT = txt(g2, 570, 150, 'EQUAL SPEEDS', { 'font-size': 18, fill: OK, 'font-weight': 600 });

/* ---------- D: subliming and dissolving ---------- */
const MS = [[K(`\\mathrm{${tN('I_2')}(s) \\rightleftharpoons ${tN('I_2')}(vapour)}`).replace(/#0FA3A3/gi, OC), 'D1', 'sublimation', 1], ['Camphor, ammonium chloride too', 'D2', 'camphor', 0], [K(`\\text{sugar(s)} \\rightleftharpoons \\text{sugar(solution)}`), 'D3', 'sugar', 1], ['Saturated: no more dissolves', 'D3', 'saturated', 0], ['Radioactive tag: a marker we track', 'D4', 'radioactive', 0], ['Tag found in solution and solid', 'D5', 'tag', 0]];
$('#mss').innerHTML = MS.map(([s, , , k], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 76}px"><div class="sn">${i + 1}</div><div class="stx" style="${k ? '' : "font:600 27px Poppins"}">${s}</div></div>`).join('');
const tMs = MS.map(m => wt(m[1], m[2]) - 0.15);
const ds = $('#dS');
const jarG = mk(ds, 'g', {});
mk(jarG, 'path', { d: 'M220 120 V420 a20 20 0 0 0 20 20 H540 a20 20 0 0 0 20 -20 V120', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(jarG, 'rect', { x: 208, y: 106, width: 364, height: 16, rx: 6, fill: HC });
const crys = Array.from({ length: 9 }, (_, i) => mk(jarG, 'path', { d: `M${255 + i * 33} 432 l14 -24 l14 24 Z`, fill: OC }));
const iv = Array.from({ length: 10 }, (_, i) => ({ e: dot(jarG, 10, OC), x: 260 + (i % 5) * 62 + rnd(i, 4) * 16, y: 160 + Math.floor(i / 5) * 90 + rnd(i, 5) * 30, ph: rnd(i, 6) * 6.283 }));
const jUp = varrow(jarG, 640, 400, 250, XC), jDn = varrow(jarG, 690, 250, 400, BC);
txt(jarG, 665, 440, 'BOTH WAYS', { 'text-anchor': 'middle', 'font-size': 16, fill: HC, 'font-weight': 600 });
const sugG = mk(ds, 'g', {});
mk(sugG, 'path', { d: 'M220 120 V420 a20 20 0 0 0 20 20 H540 a20 20 0 0 0 20 -20 V120', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
mk(sugG, 'rect', { x: 222, y: 170, width: 336, height: 268, fill: '#FBF3E2' });
const PILE = Array.from({ length: 10 }, (_, i) => [262 + (i % 6) * 40 + (i >= 6 ? 20 : 0), i < 6 ? 410 : 374]);
const SOL = Array.from({ length: 10 }, (_, j) => [255 + (j % 5) * 60 + rnd(j, 7) * 20, 200 + Math.floor(j / 5) * 70 + rnd(j, 8) * 20]);
const sq = Array.from({ length: 20 }, (_, i) => ({ e: mk(sugG, 'rect', { x: -14, y: -14, width: 28, height: 28, rx: 5, fill: GC }), ph: rnd(i, 9) * 6.283 }));
const TAGGED = [6, 7, 8, 9]; // pile slots that receive tagged sugar
const sKey = txt(sugG, 650, 220, '■ SUGAR', { 'text-anchor': 'middle', 'font-size': 18, fill: GC, 'font-weight': 600 }), tKey = txt(sugG, 650, 260, '■ TAGGED', { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 });
const sat = txt(sugG, 650, 330, 'SATURATED', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });

/* ---------- G: Henry's law ---------- */
const GR = [['Sealed: CO₂ at high pressure', 'HIGH p', BC, wt('G2', 'sealed')], ['Henry: mass dissolved ∝ pressure', 'HENRY', NC, wt('G3', 'Henry')], ['Cap off: pressure falls', 'FIZZ', XC, wt('G4', 'Open')], ['Warm drink: even less gas', 'WARM', RD, wt('G5', 'Warm')]];
$('#grs').innerHTML = GR.map(([k, v, c], i) => `<div class="qr" id="gr${i}" style="top:${96 + i * 92}px"><div class="nn" style="border-color:${c};color:${c}">${i + 1}</div><div class="qt">${k}</div><div class="qk" style="color:${c}">${v}</div></div>`).join('');
$('#gEq').innerHTML = K(`${tN('m')} \\propto ${tBk('p')}`);
const gs = $('#gS');
const bottle = mk(gs, 'path', { d: 'M350 140 V180 Q260 200 260 250 V450 a20 20 0 0 0 20 20 H500 a20 20 0 0 0 20 -20 V250 Q520 200 430 180 V140', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
const drink = mk(gs, 'path', { d: 'M262 260 H518 V450 a18 18 0 0 1 -18 18 H280 a18 18 0 0 1 -18 -18 Z', fill: '#F3E6D2' });
const cap = mk(gs, 'rect', { x: 338, y: 118, width: 104, height: 26, rx: 6, fill: HC });
const HEAD = Array.from({ length: 9 }, (_, i) => [300 + (i % 5) * 45 + rnd(i, 1) * 10, 222 + Math.floor(i / 5) * 22 + rnd(i, 2) * 6]);
const DSL = Array.from({ length: 14 }, (_, j) => [285 + (j % 5) * 52 + rnd(j, 3) * 16, 290 + Math.floor(j / 5) * 58 + rnd(j, 4) * 14]);
const hg = HEAD.map((p, i) => ({ e: dot(gs, 8, SL), p, ph: rnd(i, 5) * 6.283 }));
const dg = DSL.map((p, j) => ({ e: mk(gs, 'circle', { r: 8, fill: SL, stroke: SL, 'stroke-width': 3 }), p, ph: rnd(j, 6) * 6.283 }));
const gauge = mk(gs, 'g', {}); mk(gauge, 'circle', { cx: 650, cy: 230, r: 62, fill: C.soft, stroke: C.ink2, 'stroke-width': 4 });
txt(gauge, 596, 316, 'LOW', { 'text-anchor': 'middle', 'font-size': 14, fill: C.mute, 'font-weight': 600 }); txt(gauge, 704, 316, 'HIGH', { 'text-anchor': 'middle', 'font-size': 14, fill: C.mute, 'font-weight': 600 });
const gN = mk(gauge, 'line', { x1: 650, y1: 230, x2: 650, y2: 180, stroke: BC, 'stroke-width': 7, 'stroke-linecap': 'round' }); mk(gauge, 'circle', { cx: 650, cy: 230, r: 10, fill: BC });
txt(gauge, 650, 344, 'GAS PRESSURE', { 'text-anchor': 'middle', 'font-size': 16, fill: BC, 'font-weight': 600 });
const gCnt = txt(gs, 650, 420, '', { 'text-anchor': 'middle', 'font-size': 34, fill: NC, 'font-weight': 600 }), gCk = txt(gs, 650, 450, 'CO₂ DISSOLVED', { 'text-anchor': 'middle', 'font-size': 16, fill: NC, 'font-weight': 600 });
const warm = mk(gs, 'g', {}); mk(warm, 'rect', { x: 120, y: 260, width: 22, height: 150, rx: 11, fill: '#fff', stroke: HC, 'stroke-width': 3 }); mk(warm, 'circle', { cx: 131, cy: 416, r: 18, fill: RD }); mk(warm, 'rect', { x: 126, y: 290, width: 10, height: 126, fill: RD }); txt(warm, 131, 470, 'WARM', { 'text-anchor': 'middle', 'font-size': 16, fill: RD, 'font-weight': 600 });

/* ---------- C: closed vs open ---------- */
const eqr = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${tex}<span class="tg" style="color:${col}">${tag}</span></div>`;
$('#car').innerHTML = eqr('ca0', 84, K(`${tF('\\text{escape}')} = ${tBk('\\text{return}')}`), 'EQUAL SPEEDS', OK) + eqr('ca1', 172, '<span style="font:500 26px Poppins">Vapour stays inside</span>', 'CLOSED', OK);
$('#cfr').innerHTML = eqr('cf0', 84, K(`${tBk('\\text{return}')} = 0`), 'NO RETURN', RD) + eqr('cf1', 172, '<span style="font:500 26px Poppins">Vapour drifts away</span>', 'OPEN', RD);
const mini = (p, closed) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M300 280 V370 a10 10 0 0 0 10 10 H474 a10 10 0 0 0 10 -10 V280', stroke: C.ink2, 'stroke-width': 4, fill: 'none' }); mk(g, 'rect', { x: 302, y: 330, width: 180, height: 48, fill: WB }); if (closed) mk(g, 'rect', { x: 292, y: 270, width: 200, height: 12, rx: 5, fill: HC }); g.appendChild(varrow(g, closed ? 370 : 392, 320, closed ? 290 : 250, XC, 5)); if (closed) g.appendChild(varrow(g, 414, 290, 320, BC, 5)); return g; };
const mA = mini($('#caS'), true), mB = mini($('#cfS'), false);
$('#caV').innerHTML = `<span style="color:${OK}">EQUILIBRIUM</span>`; $('#cfV').innerHTML = `<span style="color:${RD}">NO EQUILIBRIUM: DRIES UP</span>`;
$('#caV').style.top = $('#cfV').style.top = '410px';
const th1 = PUC.think($('#th1'), { q: 'Can an open glass of water ever reach equilibrium?', opts: ['Yes', 'No'], right: 1, why: 'No. Equilibrium needs a closed system, so the vapour cannot escape.' });

/* ---------- R: five rules + table ---------- */
const RL = ['Closed system, fixed temperature', 'Both changes at the same speed', 'Measurable things stay constant', 'One fixed value at a given T', 'Its size: how far the change went'];
$('#rrs').innerHTML = RL.map((s, i) => `<div class="rl" id="rl${i}" style="top:${84 + i * 92}px"><div class="nn">${i + 1}</div><div class="rt2">${s}</div></div>`).join('');
const tRl = ['R2', 'R3', 'R4', 'R5', 'R6'].map(id => T0(id) + 0.05);
const TB = [[K(`\\mathrm{${tN('H_2O(l)')} \\rightleftharpoons ${tN('H_2O(g)')}}`), 'Vapour pressure fixed at a given T'], [K(`\\mathrm{${tN('H_2O(s)')} \\rightleftharpoons ${tN('H_2O(l)')}}`), 'Melting point fixed at a fixed pressure'], [K(`\\text{sugar(s)} \\rightleftharpoons \\text{sugar(aq)}`), 'Concentration fixed at a given T'], [K(`\\mathrm{CO_2(g) \\rightleftharpoons CO_2(aq)}`), '[CO₂(aq)] / [CO₂(g)] fixed at a given T']];
$('#tbs').innerHTML = TB.map(([p, c], i) => `<div class="tbl" id="tb${i}" style="top:${84 + i * 112}px"><div class="tp">${p}</div><div class="tc" id="tc${i}" style="color:${OK}">${c}</div></div>`).join('');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tF('\\text{forward speed}')} = ${tBk('\\text{backward speed}')}`);

/* ---------- W: Henry numbers ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${tN('m')} \\propto ${tBk('p')}\\quad \\text{(Henry's law)}`)],
  [K(`${tBk('4\\ \\text{bar}')} \\div ${tBk('1\\ \\text{bar}')} = 4`)],
  [K(`${tN('m')} = 4 \\times 1.5 = ${tO('6.0')}\\ \\text{g L}^{-1}`)],
  [K(`\\text{Cap off: } 6.0 - 1.5 = ${tF('4.5')}\\ \\text{g L}^{-1}\\ \\text{out}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WB0 = 430, WH = 300;
mk(ws, 'line', { x1: 100, y1: WB0, x2: 560, y2: WB0, stroke: C.ink2, 'stroke-width': 3 });
const wbar = (x, col, lab) => { const r = mk(ws, 'rect', { x: x - 60, y: WB0, width: 120, height: 0, rx: 8, fill: col }); txt(ws, x, WB0 + 34, lab, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); const v = txt(ws, x, WB0 - 14, '', { 'text-anchor': 'middle', 'font-size': 26, fill: col, 'font-weight': 600 }); return { r, v }; };
const wP = wbar(210, BC, 'PRESSURE'), wM = wbar(450, NC, 'CO₂ DISSOLVED');
const wOut = mk(ws, 'rect', { x: 390, y: WB0 - WH, width: 120, height: WH * 0.75, rx: 8, fill: 'none', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const wOutT = txt(ws, 640, WB0 - WH * 0.6, '4.5 g OUT', { 'text-anchor': 'middle', 'font-size': 24, fill: XC, 'font-weight': 600 });
const wX4 = txt(ws, 330, 200, '× 4', { 'text-anchor': 'middle', 'font-size': 34, fill: OK, 'font-weight': 700 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'At equilibrium, melting and freezing stop', right: 'Both go on at equal speeds: net change zero' });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'melting speed', { 'font-size': 28, fill: XC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 160, '= freezing speed', { 'font-size': 28, fill: BC, 'font-weight': 600 }), tq3 = txt(tsv, 40, 216, 'net change = 0', { 'font-size': 24, fill: OK, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'General characteristics, Henry\'s law, and which statement about a physical equilibrium is true' });
const OPT = ['Evaporation stops at equilibrium', 'Vapour pressure is constant at a given temperature', 'Vapour pressure depends on the amount of water', 'It can also be reached in an open vessel'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Water and its vapour are at equilibrium in a closed vessel. Which statement is correct?', qW: 780,
  opts: OPT, right: 1, cols: 1, optW: 968, optY: 240, optH: 72, optFs: 28 });
const so = PUC.solution($('#so'), [['B: fixed at a given T'], ['A: both still go on'], ['C: depends on T only'], ['D: vapour escapes']], { y0: 100, dy: 112 });
const tSo = [T0('A1') + 0.4, T0('A2'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Equilibrium in physical processes', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\text{Equilibrium: } ${tF('\\text{forward speed}')} = ${tBk('\\text{backward speed}')}`),
    '<b>Ice ⇌ water</b> at 273 K, 1 atm · <b>vapour pressure</b> fixed at a given T',
    '<b>Sublimation</b>: iodine, camphor, NH₄Cl · <b>saturated</b>: never stops',
    '<b>Henry\'s law</b>: mass of gas dissolved ∝ pressure · less gas when warm',
    '<b>Rules</b>: closed system · equal speeds · constant properties'] });
const YQ = ['What does dynamic equilibrium mean?', 'Why can an open glass of water never reach equilibrium?', 'Why does soda fizz when you open the bottle?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 59', topic: 'Does a reaction run both ways? Equilibrium in Chemical Processes', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T0('S5') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 130; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rl .rt2').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(27 * 600 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.tbl .tc').forEach(q => { if (q.offsetWidth > 660) q.style.fontSize = Math.floor(22 * 660 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
// ice bench state: particle i starts at site i (i < 12) or water slot i - 12; each cycle swaps one site occupant with one slot occupant
const tSw = T0('S2') + 0.2;
const benchState = t => {
  const occS = [...Array(12).keys()], occW = Array.from({ length: 12 }, (_, j) => 12 + j);
  const n = t < tSw ? -1 : Math.floor((t - tSw) / PER);
  for (let c = 0; c < n; c++) { const s = SITE_ORD[c % 12], w = (c * 5) % 12, a = occS[s]; occS[s] = occW[w]; occW[w] = a; }
  let mv = null; if (n >= 0) { const s = SITE_ORD[n % 12], w = (n * 5) % 12; mv = { s, w, a: occS[s], b: occW[w], u: M.io(M.clamp(((t - tSw) - n * PER) / (PER * 0.8))) }; }
  return { occS, occW, mv };
};
const tTagIn = wt('D4', 'radioactive'), tSx = T0('D5') + 0.2, SPER = 1.1;
const sugarState = t => {
  // slots 0..9 pile, 10..19 solution; particle k starts at slot k; tagged particles are 6..9 (dropped in at D4)
  const occ = [...Array(20).keys()];
  const n = t < tSx ? -1 : Math.floor((t - tSx) / SPER);
  const P_ORD = [9, 7, 8, 6, 2, 4, 9, 1], S_ORD = [3, 7, 1, 9, 5, 0, 8, 2];
  for (let c = 0; c < Math.min(n, 8); c++) { const p = P_ORD[c], s = 10 + S_ORD[c], a = occ[p]; occ[p] = occ[s]; occ[s] = a; }
  let mv = null; if (n >= 0 && n < 8) { const p = P_ORD[n], s = 10 + S_ORD[n]; mv = { p, s, a: occ[p], b: occ[s], u: M.io(M.clamp(((t - tSx) - n * SPER) / (SPER * 0.8))) }; }
  return { occ, mv };
};

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
    const tBd = [wt('H2', 'soda') - 0.6, wt('H2', 'calm'), wt('H2', 'fizzes')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'fizzes') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'nothing') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T0('P4'); const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pD'), t, wt('P4', 'Dynamic', 1) - 0.1, 1e9, POP);
    M.vis($('#pw'), t, wt('P1', 'shop') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(shop, t, wt('P1', 'shop'));
    crowd.forEach((c, i) => { attr(c.g, 'transform', `translate(${(c.x + 8 * Math.sin(t * 1.3 + c.ph)).toFixed(1)},${(c.y + 5 * Math.cos(t * 1.1 + c.ph)).toFixed(1)})`); fade(c.g, t, wt('P1', 'door') + i * 0.03, 1e9, 0.2); });
    const tLane = tQr[0] - 0.2, LP = 2.4;
    lanes.forEach(l => {
      const st = l.inn ? tLane : tQr[1] - 0.2; const ph = (t - st) / LP + l.k / 3; const u = ph - Math.floor(ph);
      const x = l.inn ? M.lerp(60, 330, u) : M.lerp(330, 60, u), y = l.inn ? 262 : 340;
      attr(l.g, 'transform', `translate(${x.toFixed(1)},${y})`);
      const e = Math.min(1, u / 0.12, (1 - u) / 0.12); l.g.style.opacity = (t < st ? 0 : e * M.io((t - st) / 0.3)).toFixed(3); M.hide(l.g, t < st);
    });
    fade(pIn, t, tLane); fade(pOut, t, tQr[1] - 0.2); fade(pCnt, t, tQr[2] - 0.2);
    M.vis($('#pP'), t, wt('P4', 'balanced') - 0.2, 1e9, POP);
  }

  /* S: ice bench */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    const tIce = wt('S1', 'ice');
    [flask, lid, water].forEach(e => fade(e, t, tIce - 0.2)); fade(iceBox, t, tIce + 0.2);
    fade(thS, t, wt('S1', 'zero') - 0.2); fade(thT, t, wt('S1', 'zero')); fade(thK, t, wt('S1', 'zero'));
    const st = benchState(t), tFr = wt('S3', 'stick');
    parts.forEach((p, i) => {
      let x, y, col = NC, si = st.occS.indexOf(i);
      if (si >= 0) { [x, y] = SITES[si]; x += 2 * Math.sin(t * 9 + p.ph); y += 2 * Math.cos(t * 8 + p.ph); }
      else { const w = st.occW.indexOf(i); [x, y] = SLOTS[w]; x += 9 * Math.sin(t * 2.4 + p.ph); y += 7 * Math.cos(t * 2.1 + p.ph); }
      const mv = st.mv;
      if (mv && mv.u < 1 && (i === mv.a || i === mv.b)) {
        const A = SITES[mv.s], B = SLOTS[mv.w], k = mv.u;
        if (i === mv.a) { x = M.lerp(A[0], B[0], k); y = M.lerp(A[1], B[1], k) - 30 * Math.sin(k * Math.PI); col = XC; }
        else { x = M.lerp(B[0], A[0], k); y = M.lerp(B[1], A[1], k) - 30 * Math.sin(k * Math.PI); col = t >= tFr ? BC : NC; }
      }
      pos(p.e, x, y); fillC(p.e, col); fade(p.e, t, tIce + (i % 12) * 0.03, 1e9, 0.2);
    });
    fade(mL, t, wt('S2', 'melting')); fade(fL, t, wt('S3', 'freezing'));
    const TAG = [[tS1 + 0.3, 'CLOSED FLASK · 0 °C'], [T0('S2'), 'MELTING'], [T0('S3'), 'MELTING AND FREEZING'], [T0('S4'), 'EQUAL SPEEDS'], [T0('S5'), 'AMOUNTS STAY THE SAME'], [T0('S6'), '273 K · 1 atm']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    fade($('#eG'), t, T0('S2') + 0.2);
    fade(rM.g, t, wt('S2', 'melting') - 0.2); fade(rF.g, t, wt('S3', 'freezing') - 0.2);
    const tFive = wt('S4', 'Melting'), tFive2 = wt('S4', 'Freezing');
    attr(rM.r, 'width', (520 * M.io((t - tFive) / 0.6)).toFixed(1)); attr(rF.r, 'width', (520 * M.io((t - tFive2) / 0.6)).toFixed(1));
    fade(rM.v, t, tFive + 0.4); fade(rF.v, t, tFive2 + 0.4); fade(eqS, t, wt('S4', 'Equal') - 0.1);
    M.vis($('#sGh'), t, tFive - 0.2, 1e9, POP);
    fade(tlIce, t, wt('S5', 'ice')); fade(tlWat, t, wt('S5', 'water'));
    M.vis(sPill, t, wt('S6', 'normal') - 0.2, 1e9, POP);
    avD(t, T1('S6') - 0.4, z);
  }

  /* L: liquid and vapour */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lb'), t, tL1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#lg'), t, T0('L2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const tEv = wt('L2', 'escape'), tCo = wt('L3', 'come'), tEq = wt('L4', 'equal'), tOp = T0('L5');
    const lev = 330 + 14 * M.io((t - tEv) / 6) + 34 * M.io((t - tOp - 0.4) / 5);
    attr(lWat, 'y', lev.toFixed(1)); attr(lWat, 'height', (448 - lev).toFixed(1)); attr(lSurf, 'y1', lev.toFixed(1)); attr(lSurf, 'y2', lev.toFixed(1));
    const op = M.io((t - tOp) / 0.6); attr(lLid, 'transform', `translate(0,${(-40 * op).toFixed(1)})`); lLid.style.opacity = (1 - op).toFixed(3);
    vap.forEach((v, i) => {
      const ts = tEv + i * 0.42; const r = M.io((t - ts) / 0.9);
      let x = v.x + 10 * Math.sin(t * 2 + v.ph), y = M.lerp(lev, v.y, r) + 8 * Math.cos(t * 1.8 + v.ph), col = r < 1 ? XC : NC;
      // dip cycle after condensation starts: one molecule at a time falls to the surface (blue) and rises again (orange)
      if (t > tCo) { const c = (t - tCo) / 0.9, k = Math.floor(c) % 14, u = c - Math.floor(c); if (k === i && t < tOp) { const d = u < 0.5 ? M.io(u * 2) : 1 - M.io((u - 0.5) * 2); y = M.lerp(y, lev - 6, d); col = u < 0.5 ? BC : XC; } }
      if (t > tOp) y -= 260 * M.io((t - tOp - 0.2 - (i % 5) * 0.15) / 2.2);
      pos(v.e, x, y); fillC(v.e, col); v.e.style.opacity = (M.io((t - ts) / 0.2) * M.clamp((y - 40) / 60)).toFixed(3); M.hide(v.e, t < ts);
    });
    fade(lE, t, tEv); fade(lC, t, tCo); fade(lVP, t, wt('L4', 'vapour'), tOp); fade(lVP2, t, wt('L4', 'fixed'), tOp);
    const TAG = [[tL1 + 0.3, 'CLOSED BOX'], [tEv, 'EVAPORATION'], [tCo, 'AND CONDENSATION'], [tEq, 'EQUAL SPEEDS'], [tOp, 'OPEN · VAPOUR ESCAPES'], [T0('L6'), '100 °C · 1.013 bar']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(lTag, tg); M.vis(lTag, t, tL1 + 0.2, 1e9, POP);
    fade(evT, t, tEv); M.draw(evL, t, tEv, 3.2, x => x); fade(cnT, t, tCo + 0.4); M.draw(cnL, t, tCo, 3.0, x => x);
    fade(eqV, t, tEq); fade(eqT, t, tEq + 0.1);
    M.vis($('#lP1'), t, wt('L5', 'drifts') - 0.2, T0('L6') - 0.1, { ...POP, outDur: 0.2, ody: 0 });
    M.vis($('#lP2'), t, wt('L6', 'hundred') - 0.2, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((m, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); if (m[3]) PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); else M.vis(r.querySelector('.stx'), t, tMs[i], 1e9, { dx: -16, dy: 0 }); });
    M.vis($('#rr'), t, T0('D1') + 0.3, z, { dx: 60, dy: 0, ...o });
    const tSug = T0('D3');
    M.setT($('#rrL'), t < tSug ? 'CLOSED JAR · IODINE' : 'SATURATED SUGAR SOLUTION');
    fade(jarG, t, T0('D1') + 0.3, tSug - 0.1);
    iv.forEach((v, i) => { const c = (t - T0('D2')) / 0.8, k = Math.floor(c) % 10, u = c - Math.floor(c); let y = v.y + 8 * Math.cos(t * 2 + v.ph), x = v.x + 10 * Math.sin(t * 2.3 + v.ph); if (t > T0('D2') && k === i) { const d = u < 0.5 ? M.io(u * 2) : 1 - M.io((u - 0.5) * 2); y = M.lerp(y, 410, d); fillC(v.e, u < 0.5 ? BC : XC); } else fillC(v.e, OC); pos(v.e, x, y); fade(v.e, t, wt('D1', 'vapour') + i * 0.08, 1e9, 0.2); });
    [jUp, jDn].forEach(e => fade(e, t, wt('D2', 'both')));
    fade(sugG, t, tSug, 1e9, 0.3);
    if (t >= tSug - 0.1) {
      const st = sugarState(t);
      sq.forEach((q, k) => {
        const slot = st.occ.indexOf(k); let [x, y] = slot < 10 ? PILE[slot] : SOL[slot - 10];
        if (slot >= 10) { x += 8 * Math.sin(t * 2 + q.ph); y += 7 * Math.cos(t * 1.7 + q.ph); }
        const tg = TAGGED.includes(k); let a = 1;
        if (tg) { const u = M.io((t - tTagIn - (k - 6) * 0.2) / 0.6); if (st.occ[k] === k) y = M.lerp(120, y, u); a = M.clamp((t - tTagIn - (k - 6) * 0.2) / 0.15); }
        const mv = st.mv; if (mv && mv.u < 1 && (k === mv.a || k === mv.b)) { const A = PILE[mv.p], B = SOL[mv.s - 10]; [x, y] = k === mv.a ? [M.lerp(A[0], B[0], mv.u), M.lerp(A[1], B[1], mv.u)] : [M.lerp(B[0], A[0], mv.u), M.lerp(B[1], A[1], mv.u)]; }
        attr(q.e, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); fillC(q.e, tg ? XC : GC);
        q.e.style.opacity = (a * M.io((t - tSug - k * 0.03) / 0.2)).toFixed(3);
      });
    }
    fade(sKey, t, tSug + 0.3); fade(tKey, t, tTagIn); fade(sat, t, wt('D3', 'saturated'));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    GR.forEach((g, i) => { const el = $('#gr' + i); M.vis(el, t, g[3] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? GR[i + 1][3] : T1('G5') + 0.4; const on = M.io((t - g[3]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    PUC.write($('#gEq'), t, wt('G3', 'proportional') - 0.2, 0.8);
    const tCap = wt('G4', 'cap'), tDbl = wt('G3', 'Double'), tWarm = wt('G5', 'Warm');
    [bottle, drink].forEach(e => fade(e, t, tG1 + 0.6)); fade(gauge, t, T0('G2'));
    const cu = M.io((t - tCap) / 0.5); attr(cap, 'transform', `translate(${(90 * cu).toFixed(1)},${(-30 * cu).toFixed(1)}) rotate(${(25 * cu).toFixed(1)} 390 131)`); fade(cap, t, tG1 + 0.6);
    const p = 2 + 2 * M.io((t - tDbl) / 0.8) - 3 * M.io((t - tCap - 0.2) / 1.0);
    const ang = (-150 + 120 * (p - 1) / 3) * Math.PI / 180; attr(gN, 'x2', (650 + 48 * Math.cos(ang)).toFixed(1)); attr(gN, 'y2', (230 + 48 * Math.sin(ang)).toFixed(1));
    hg.forEach((h, i) => { let [x, y] = h.p; x += 6 * Math.sin(t * 3 + h.ph); y += 4 * Math.cos(t * 2.6 + h.ph); const lv = M.io((t - tCap - 0.1 - i * 0.06) / 1.2); y -= 240 * lv; x = M.lerp(x, 390 + (i - 4) * 12, Math.min(1, lv * 2)); pos(h.e, x, y); h.e.style.opacity = (M.io((t - T0('G2') - i * 0.04) / 0.2) * M.clamp((y - 40) / 60)).toFixed(3); M.hide(h.e, t < T0('G2')); });
    let nIn = 0;
    dg.forEach((d, j) => {
      const tJoin = j < 7 ? T0('G2') + j * 0.05 : tDbl + (j - 7) * 0.18, tLeave = j >= 4 ? tCap + 0.3 + (j - 4) * 0.22 : j >= 2 ? tWarm + 0.4 + (j - 2) * 0.5 : 1e9;
      let [x, y] = d.p; x += 6 * Math.sin(t * 2.2 + d.ph); y += 5 * Math.cos(t * 1.9 + d.ph);
      const jn = M.io((t - tJoin) / 0.7); if (j >= 7) y = M.lerp(225, y, jn);
      const lv = M.io((t - tLeave) / 1.4); const bub = t > tLeave;
      if (bub) { y = M.lerp(y, 60, lv); x = M.lerp(x, 390, Math.min(1, lv * 1.6)); }
      attr(d.e, 'fill', bub ? '#fff' : SL); attr(d.e, 'r', bub ? 10 : 8);
      pos(d.e, x, y); d.e.style.opacity = (M.clamp((t - tJoin) / 0.2) * (bub ? 1 - M.clamp((lv - 0.8) / 0.2) : 1)).toFixed(3); M.hide(d.e, t < tJoin);
      if (t >= tJoin && !bub) nIn++;
    });
    M.setT(gCnt, `${nIn}`); fade(gCnt, t, T0('G2') + 0.2); fade(gCk, t, T0('G2') + 0.2);
    fade(warm, t, tWarm - 0.1);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#ca0'), t, wt('C1', 'escape') - 0.1, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'equal'), 1e9, { dy: 16 });
    M.vis($('#cf'), t, wt('C1', 'open') - 0.3, zc, { dx: 60, dy: 0, ...o });
    M.vis($('#cf0'), t, wt('C1', 'never') - 0.1, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C1', 'never') + 0.3, 1e9, { dy: 16 });
    fade(mA, t, wt('C1', 'closed') + 0.2); fade(mB, t, wt('C1', 'open'));
    M.vis($('#caV'), t, wt('C1', 'speeds') + 0.2, 1e9, { dy: 16 }); M.vis($('#cfV'), t, T1('C1') - 0.3, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Can') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Equilibrium') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RL.forEach((_, i) => { const el = $('#rl' + i); M.vis(el, t, tRl[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 4 ? tRl[i + 1] : T1('R6') + 0.3; const on = M.io((t - tRl[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rb'), t, tR1 + 0.4, z, { dx: 60, dy: 0, ...o });
    const tFix = wt('R5', 'fixed');
    TB.forEach((_, i) => { const el = $('#tb' + i); M.vis(el, t, tR1 + 0.7 + i * 0.25, 1e9, { dy: 16 }); M.vis($('#tc' + i), t, tFix + i * 0.35, 1e9, { dx: 20, dy: 0 }); const on = M.io((t - tFix - i * 0.35) / 0.3) * (1 - M.io((t - T0('R6')) / 0.3)); setBg(el, mix(C.soft, OKT, on)); });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Equilibrium') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'means') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'balanced') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const t4 = wt('W4', 'four'), t6 = wt('W5', 'Six'), tBack = wt('W6', 'back');
    const pv = 1 + 3 * M.io((t - t4) / 0.8) - 3 * M.io((t - tBack) / 0.8), mv = 1.5 + 4.5 * M.io((t - t6 + 0.6) / 0.8) - 4.5 * M.io((t - tBack - 0.2) / 0.8);
    const hp = WH * pv / 4, hm = WH * mv / 6;
    attr(wP.r, 'y', (WB0 - hp).toFixed(1)); attr(wP.r, 'height', hp.toFixed(1)); attr(wM.r, 'y', (WB0 - hm).toFixed(1)); attr(wM.r, 'height', hm.toFixed(1));
    attr(wP.v, 'y', (WB0 - hp - 14).toFixed(1)); attr(wM.v, 'y', (WB0 - hm - 14).toFixed(1));
    M.setT(wP.v, `${pv.toFixed(1)} bar`); M.setT(wM.v, `${mv.toFixed(1)} g/L`);
    [wP.r, wP.v, wM.r, wM.v].forEach(e => fade(e, t, wt('W2', 'one') - 0.1));
    fade(wX4, t, t4 + 0.4, tBack);
    fade(wOut, t, tBack + 0.6); fade(wOutT, t, wt('W6', 'fizz') - 0.2);
    M.vis($('#wG'), t, t6, tBack, { ...POP, outDur: 0.2, ody: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'melting') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Both') - 0.2 });
    fade(tq1, t, wt('X3', 'equal') - 0.2); fade(tq2, t, wt('X3', 'speeds')); fade(tq3, t, wt('X3', 'zero') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tFc; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tFc; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tFc + 0.1, tout: tY - 0.3, tLines: [tFc + 0.4, tFc + 0.8, tFc + 1.2, tFc + 1.6, tFc + 2.0], tShot: wt('F1', 'Screenshot') });
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
