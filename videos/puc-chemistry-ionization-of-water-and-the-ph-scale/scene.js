// PUC Chemistry Ep 66: Ionization of water and the pH scale (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: H3O+ teal, OH- violet, moving proton H+ orange, water ink, pH blue, Kw gold, acidic red, basic blue
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tB = s => `\\textcolor{${BC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`;
const hyd = `\\textcolor{${NC}}{[\\mathrm{H_3O^+}]}`, oh = `\\textcolor{${OC}}{[\\mathrm{OH^-}]}`, pH = tB('\\text{pH}'), pOH = `\\textcolor{${OC}}{\\text{pOH}}`, Kw = tG('K_w');
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const harrow = (p, x1, x2, y, col, w = 6) => { const l = mk(p, 'path', { d: `M${x1} ${y} H${x2 - 14}`, stroke: col, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x2 - 22} ${y - 13} L${x2} ${y} L${x2 - 22} ${y + 13} Z`, fill: col }); return [l, h]; };
// water molecule: O + 2 H, can be tinted (H3O+ teal, OH- violet)
const wmol = (p, R) => { const g = mk(p, 'g', {}); const h1 = mk(g, 'circle', { cx: -R * 0.95, cy: R * 0.75, r: R * 0.5, fill: '#fff', stroke: HC, 'stroke-width': 2.5 }); const h2 = mk(g, 'circle', { cx: R * 0.95, cy: R * 0.75, r: R * 0.5, fill: '#fff', stroke: HC, 'stroke-width': 2.5 }); const o = mk(g, 'circle', { r: R, fill: C.ink2 }); return { g, o, h1, h2 }; };
const tint = (m, c) => { attr(m.o, 'fill', c); };

Object.assign(M.IC, {
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  milk: ['M8 2h8', 'M9 2v2.8a4 4 0 0 1-.7 2.2L7.7 8A4 4 0 0 0 7 10.2V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.8a4 4 0 0 0-.7-2.2l-.6-1A4 4 0 0 1 15 4.8V2'],
  pill: ['m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z', 'm8.5 8.5 7 7'],
  therm: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['drop', 'Lemon juice', 'TASTES SOUR', 'Lemon', 'pH 2.2', RD], ['milk', 'Milk', 'TASTES MILD', 'Milk', 'pH 6.8', HC], ['pill', 'An antacid', 'CHALKY, BITTER', 'antacid', 'pH ≈ 10', BC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Mostly water, yet so different', 'wonders', 'H3'], ['Pure water is never just water', 'never', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('drop', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: passing a ball ---------- */
const QR = [['Water 1 gives away H⁺', 'BECOMES OH⁻', 'P2', 'hands', OC], ['Water 2 takes the H⁺', 'BECOMES H₃O⁺', 'P3', 'taker', NC], ['The ball goes back too', '⇌ BOTH WAYS', 'P4', 'back', GC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pA = wmol(ps, 46), pB = wmol(ps, 46); attr(pA.g, 'transform', 'translate(230,230)'); attr(pB.g, 'transform', 'translate(554,230)');
const pPr = mk(ps, 'circle', { r: 15, fill: XC }); const pPrT = txt(ps, 0, 0, 'H⁺', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });
const pLa = txt(ps, 230, 360, 'OH⁻ · HYDROXIDE', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 }), pLb = txt(ps, 554, 360, 'H₃O⁺ · HYDRONIUM', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });
const pW = [txt(ps, 230, 150, 'H₂O', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 }), txt(ps, 554, 150, 'H₂O', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 })];
$('#pEq').innerHTML = K(`\\mathrm{H_2O + H_2O} \\rightleftharpoons \\textcolor{${NC}}{\\mathrm{H_3O^+}} + \\textcolor{${OC}}{\\mathrm{OH^-}}`);

/* ---------- S: water bench ---------- */
const b = $('#bS');
const glass = mk(b, 'path', { d: 'M110 110 V420 a20 20 0 0 0 20 20 H654 a20 20 0 0 0 20 -20 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const water = mk(b, 'rect', { x: 112, y: 150, width: 560, height: 288, fill: '#E6F3FA' });
const WM = Array.from({ length: 24 }, (_, i) => { const m = wmol(b, 15); return { m, x: 170 + (i % 6) * 88 + rnd(i, 1) * 20, y: 200 + Math.floor(i / 6) * 62 + rnd(i, 2) * 14, ph: rnd(i, 3) * 6.283 }; });
const bPr = mk(b, 'circle', { r: 8, fill: XC });
const bLa = txt(b, 0, 0, 'OH⁻', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 700 }), bLb = txt(b, 0, 0, 'H₃O⁺', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 700 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const bCnt = txt(b, 392, 500, '', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 });
const TL = [['T = 298 K', 'twenty five degrees Celsius', 'S2', 'two', HC], ['≈ 2 in 10⁹', 'water molecules split at any moment', 'S4', 'two', XC], ['[H₃O⁺] = 1.0 × 10⁻⁷ M', 'hydronium', 'S5', 'Both', NC], ['[OH⁻] = 1.0 × 10⁻⁷ M', 'hydroxide', 'S5', 'ten', OC]];
$('#tls').innerHTML = TL.map(([v, s, , , c], i) => `<div class="tile" id="tl${i}" style="top:${84 + i * 96}px"><b style="color:${c}">${v}</b><span>${s}</span></div>`).join('');
const tTl = TL.map(r => wt(r[2], r[3]) - 0.2);
$('#eG').innerHTML = K(`${hyd} = ${oh}`);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So even pure water has a few ions!' });

/* ---------- L: Kw ---------- */
$('#hcI').innerHTML = M.icon('therm', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`${Kw} = ${hyd}${oh} = 1.0 \\times 10^{-14}\\ \\text{at 298 K}`);
const GT = [[`${hyd} > ${oh}`, 'ACIDIC', 'MORE HYDRONIUM', RD, wt('L4', 'more')], [`${hyd} = ${oh}`, 'NEUTRAL', 'EQUAL', HC, wt('L4', 'equal')], [`${hyd} < ${oh}`, 'BASIC', 'LESS HYDRONIUM', BC, wt('L4', 'less')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px"><div class="gk">${K(k)}</div><div class="gv" style="color:${c}">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: pH steps ---------- */
const MS = [[K(`${pH} = -\\log ${hyd}`), 'D2'], [K(`\\log 10^{-7} = -7`), 'D3'], [K(`${pH} = -(-7) = ${tB('7')}`), 'D4'], [K(`${pOH} = -\\log ${oh}`), 'D5'], [K(`${pH} + ${pOH} = p${Kw} = 14`), 'D6']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${92 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const BX = [[K(`\\textcolor{${NC}}{10^{-7}}`), 'H₃O⁺ IN M'], [K('-7'), 'TAKE LOG'], [K(tB('7')), 'FLIP SIGN: pH']];
$('#bxs').innerHTML = BX.map(([v, s], i) => `<div class="bx" id="bx${i}" style="left:${36 + i * 261}px"><b>${v}</b><span>${s}</span></div>`).join('');
const ds = $('#dS');
const dAr = [harrow(ds, 232, 291, 165, C.ink2), harrow(ds, 493, 552, 165, C.ink2)];
const DY = 330, DX0 = 36, DX1 = 748, DU = (DX1 - DX0) / 14;
mk(ds, 'rect', { x: DX0, y: DY, width: DX1 - DX0, height: 70, rx: 12, fill: C.soft });
const dPH = mk(ds, 'rect', { x: DX0, y: DY, width: 0, height: 70, rx: 12, fill: '#DCE7FC', stroke: BC, 'stroke-width': 3 });
const dPOH = mk(ds, 'rect', { x: DX0 + 7 * DU, y: DY, width: 0, height: 70, rx: 12, fill: '#ECE4FB', stroke: OC, 'stroke-width': 3 });
const dT1 = txt(ds, DX0 + 3.5 * DU, DY + 45, 'pH 7', { 'text-anchor': 'middle', 'font-size': 26, fill: BC, 'font-weight': 600 }), dT2 = txt(ds, DX0 + 10.5 * DU, DY + 45, 'pOH 7', { 'text-anchor': 'middle', 'font-size': 26, fill: OC, 'font-weight': 600 });
const dT3 = txt(ds, 392, DY + 130, 'TOGETHER: 14 · AT 298 K', { 'text-anchor': 'middle', 'font-size': 24, fill: GC, 'font-weight': 600 });
const dK = txt(ds, 392, DY - 26, 'PURE WATER', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });

/* ---------- G: pH scale ---------- */
const gs = $('#gS'), GX0 = 150, GX1 = 1450, GU = (GX1 - GX0) / 14, GY = 300, gx = v => GX0 + v * GU;
const gSeg = mk(gs, 'g', {});
for (let i = 0; i < 14; i++) { const c = i + 0.5; mk(gSeg, 'rect', { x: gx(i), y: GY, width: GU + 0.5, height: 40, fill: c < 7 ? mix('#F2B8B8', '#FBEDED', c / 7) : mix('#EAF0FC', '#B9CDF5', (c - 7) / 7) }); txt(gSeg, gx(i), GY + 70, String(i), { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }); }
txt(gSeg, gx(14), GY + 70, '14', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });
mk(gSeg, 'rect', { x: GX0, y: GY, width: GX1 - GX0, height: 40, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5, rx: 4 });
const PM = [['LEMON JUICE 2.2', 2.2, 250, RD, wt('G2', 'Lemon')], ['TOMATO JUICE 4.2', 4.2, 190, RD, wt('G2', 'Tomato')], ['BLACK COFFEE 5.0', 5.0, 250, RD, wt('G2', 'Black')], ['MILK 6.8', 6.8, 130, RD, wt('G3', 'Milk')],
  ['PURE WATER 7.0', 7.0, 420, HC, wt('G3', 'Pure')], ['HUMAN BLOOD 7.4', 7.4, 475, BC, wt('G3', 'Human')], ['EGG WHITE 7.8', 7.8, 530, BC, wt('G4', 'Egg')], ['MILK OF MAGNESIA ≈ 10', 10, 420, BC, wt('G4', 'magnesia')]];
const gM = PM.map(([s, v, y, c]) => { const g = mk(gs, 'g', {}); const up = y < GY; mk(g, 'line', { x1: gx(v), y1: up ? GY : GY + 40, x2: gx(v), y2: up ? y + 8 : y - 26, stroke: c, 'stroke-width': 2.5 }); mk(g, 'path', { d: up ? `M${gx(v) - 9} ${GY - 12} L${gx(v) + 9} ${GY - 12} L${gx(v)} ${GY} Z` : `M${gx(v) - 9} ${GY + 52} L${gx(v) + 9} ${GY + 52} L${gx(v)} ${GY + 40} Z`, fill: c }); txt(g, gx(v), y, s, { 'text-anchor': 'middle', 'font-size': 22, fill: c, 'font-weight': 600 }); return g; });
const gZa = txt(gs, GX0, 100, '← ACIDIC · BELOW 7', { 'font-size': 20, fill: RD, 'font-weight': 600 }), gZb = txt(gs, GX1, 100, 'ABOVE 7 · BASIC →', { 'text-anchor': 'end', 'font-size': 20, fill: BC, 'font-weight': 600 });
const gTen = mk(gs, 'g', {}); mk(gTen, 'path', { d: `M${gx(12)} ${GY - 8} V${GY - 22} H${gx(13)} V${GY - 8}`, stroke: GC, 'stroke-width': 3, fill: 'none' }); txt(gTen, gx(12.5), GY - 32, '× 10', { 'text-anchor': 'middle', 'font-size': 20, fill: GC, 'font-weight': 700 });

/* ---------- C: pH 3 vs pH 5 ---------- */
const beaker = (p, n) => { mk(p, 'path', { d: 'M232 90 V350 a20 20 0 0 0 20 20 H532 a20 20 0 0 0 20 -20 V90', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(p, 'rect', { x: 234, y: 120, width: 316, height: 248, fill: '#E6F3FA' }); return Array.from({ length: n }, (_, i) => mk(p, 'circle', { cx: n > 1 ? 284 + (i % 10) * 24 : 392, cy: n > 1 ? 140 + Math.floor(i / 10) * 24 : 250, r: n > 1 ? 8 : 10, fill: NC })); };
const cA = beaker($('#caS'), 100), cB = beaker($('#cfS'), 1);
const cBt = txt($('#cfS'), 392, 290, 'ONLY 1', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });
$('#caV').innerHTML = K(`${hyd} = 10^{-3}\\ \\text{M}`); $('#cfV').innerHTML = K(`${hyd} = 10^{-5}\\ \\text{M}`);
const th1 = PUC.think($('#th1'), { q: 'pH 3 or pH 5: which has more H₃O⁺, and how many times more?', opts: ['pH 5', 'pH 3'], right: 1, why: 'pH 3. Two steps down: 10 × 10 = 100 times more H₃O⁺.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${pH} = -\\log ${hyd} \\qquad ${hyd}${oh} = 1.0 \\times 10^{-14}`);

/* ---------- W: cola ---------- */
const wsol = PUC.solution($('#wl'), [
  [K('\\text{pH} = -\\log(3.8 \\times 10^{-3})')],
  [K('\\log 3.8 = 0.58,\\ \\text{so}\\ \\log(3.8 \\times 10^{-3}) = -2.42')],
  [K(`${pH} = ${tB('2.42')}`)],
  [K(`${pOH} = 14 - 2.42 = \\textcolor{${OC}}{11.58}`)]], { label: 'WORKED EXAMPLE · NCERT', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const wJar = mk(ws, 'path', { d: 'M90 150 V370 a20 20 0 0 0 20 20 H330 a20 20 0 0 0 20 -20 V150', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const wLiq = mk(ws, 'rect', { x: 92, y: 200, width: 256, height: 188, fill: '#E9D9C6' });
const wMet = mk(ws, 'g', {}); mk(wMet, 'rect', { x: 430, y: 90, width: 290, height: 190, rx: 16, fill: C.ink }); mk(wMet, 'rect', { x: 454, y: 114, width: 242, height: 100, rx: 8, fill: '#E8F5F5' }); txt(wMet, 575, 252, 'pH METER', { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 600 });
mk(wMet, 'path', { d: 'M470 280 C470 330 260 300 260 340 V360', stroke: C.ink2, 'stroke-width': 5, fill: 'none' }); mk(wMet, 'rect', { x: 252, y: 300, width: 16, height: 70, rx: 6, fill: C.ink2 });
const wRd = txt(ws, 575, 186, '', { 'text-anchor': 'middle', 'font-size': 52, fill: BC, 'font-weight': 600 });
const wSc = mk(ws, 'g', {}); for (let i = 0; i < 14; i++) { const c = i + 0.5; mk(wSc, 'rect', { x: 90 + i * 45, y: 420, width: 45.5, height: 22, fill: c < 7 ? mix('#F2B8B8', '#FBEDED', c / 7) : mix('#EAF0FC', '#B9CDF5', (c - 7) / 7) }); }
[0, 7, 14].forEach(v => txt(wSc, 90 + v * 45, 470, String(v), { 'text-anchor': 'middle', 'font-size': 16, fill: HC, 'font-weight': 600 }));
const wMk = mk(ws, 'path', { d: 'M-9 -12 L9 -12 L0 0 Z', fill: BC });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K('10^{-8}\\ \\text{M HCl} \\Rightarrow \\text{pH} = 8')}, basic acid?`, right: `${K(`${hyd} \\approx 1.05 \\times 10^{-7}\\ \\text{M} \\Rightarrow \\text{pH} \\approx ${tO('6.98')}`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'ACID: pH < 7 ALWAYS', { 'font-size': 28, fill: RD, 'font-weight': 600 }), tq2 = txt(tsv, 40, 170, 'water adds 10⁻⁷ M too', { 'font-size': 26, fill: NC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'pH from [H₃O⁺] and back; mixed pH, pOH and Kw numericals' });
const OPT = ['2.5 \\times 10^{-11}\\ \\text{M}', '4.0 \\times 10^{-4}\\ \\text{M}', '2.5 \\times 10^{-4}\\ \\text{M}', '1.0 \\times 10^{-7}\\ \\text{M}'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'At 298 K, a solution has pOH = 10.6. What is its [H₃O⁺]?', qW: 900, opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${pH} = 14 - 10.6 = 3.4`)], [K(`${hyd} = 10^{-3.4}`)], [K(`${hyd} \\approx ${tO('4.0 \\times 10^{-4}')}\\ \\text{M}`)], ['A used pOH as pH']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'used') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · ionization of water and pH', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${Kw} = ${hyd}${oh} = 1.0 \\times 10^{-14}\\ (298\\ \\text{K})`), K(`${pH} = -\\log ${hyd} \\qquad ${pH} + ${pOH} = 14`),
    '<b>pH &lt; 7</b> acidic · <b>7</b> neutral · <b>pH &gt; 7</b> basic · one step = 10 times', '<b>Lemon juice</b> 2.2 · <b>milk</b> 6.8 · <b>blood</b> 7.4 · <b>milk of magnesia</b> ≈ 10', '<b>10⁻⁸ M HCl</b>: pH ≈ 6.98, never 8 · <b>cola</b>: pH 2.42'] });
const YQ = ['Why does pure water have a pH of 7?', 'pH 4 or pH 6: which has more H₃O⁺, and how many times?', 'If the pH is 9, what is the pOH?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 67', topic: 'Why is vinegar safe on a salad? Ionization of Weak Acids and Bases', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(34 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 190; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.tile b').forEach(q => { if (q.offsetWidth > 400) q.style.fontSize = Math.floor(34 * 400 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const le = $('#lEq'); if (le.firstElementChild && le.firstElementChild.offsetWidth > 1500) le.style.fontSize = Math.floor(60 * 1500 / le.firstElementChild.offsetWidth) + 'px';
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
// proton passing cycle for the P card: 0 = on water 1, 1 = on water 2
const passAt = t => { const t0 = wt('P2', 'hands'), tb = wt('P4', 'back'); if (t < t0) return 0; if (t < tb) return M.io((t - t0) / 0.7); const k = (t - tb) / 2.4, f = k - Math.floor(k), dir = Math.floor(k) % 2 === 0; const u = M.io(f / 0.35); return dir ? 1 - u : u; };

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
    const tBd = [wt('H2', 'All'), wt('H2', 'mostly'), wt('H2', 'water')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'different') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'pH') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'friends') - 0.1, out, { dx: 60, dy: 0, ...o });
    [pA.g, pB.g, ...pW].forEach(e => fade(e, t, wt('P1', 'passing') - 0.2));
    const u = passAt(t), x0 = 230 + 44, y0 = 230 + 34, x1 = 554 - 52, y1 = 230 - 30;
    const px = M.lerp(x0, x1, u), py = M.lerp(y0, y1, u) - 60 * Math.sin(Math.PI * u);
    attr(pPr, 'cx', px.toFixed(1)); attr(pPr, 'cy', py.toFixed(1)); attr(pPrT, 'x', px.toFixed(1)); attr(pPrT, 'y', (py - 24).toFixed(1));
    fade(pPr, t, wt('P2', 'proton') - 0.2); fade(pPrT, t, wt('P2', 'proton') - 0.2);
    pA.h2.style.opacity = '0';
    const sp = M.clamp((u - 0.5) * 3 + 0.5); tint(pA, mix(C.ink2, OC, sp)); tint(pB, mix(C.ink2, NC, sp));
    fade(pLa, t, wt('P3', 'giver'), 1e9, 0.25, sp); fade(pLb, t, wt('P3', 'taker'), 1e9, 0.25, sp);
    pW.forEach(e => e.style.opacity = (1 - sp).toFixed(2));
    M.vis($('#pEq'), t, wt('P2', 'neighbour'), 1e9, { dy: 14 });
  }

  /* S: water bench */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(glass, t, tS1 + 0.3); fade(water, t, tS1 + 0.4);
    // splitting events: pair (8,9) at S3, then short events on other pairs
    const ev = [[8, 9, wt('S3', 'jumps') - 0.2, wt('S3', 'meet')]]; const pairs = [[14, 15], [2, 3], [19, 20], [10, 11]];
    for (let k = 0; k < 6; k++) { const s0 = T0('S4') + 0.4 + k * 2.4; const p = pairs[k % 4]; ev.push([p[0], p[1], s0, s0 + 1.3]); }
    let act = null; for (const e of ev) if (t >= e[2] && t < e[3] + 0.7) act = e;
    WM.forEach((w, i) => { const x = w.x + 5 * Math.sin(t * 2.2 + w.ph), y = w.y + 5 * Math.cos(t * 1.9 + w.ph); w.cx = x; w.cy = y; attr(w.m.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); fade(w.m.g, t, T0('S2') - 0.2 + i * 0.03, 1e9, 0.2); tint(w.m, C.ink2); w.m.h2.style.opacity = '1'; });
    [bPr, bLa, bLb].forEach(e => M.hide(e, true));
    if (act) {
      const [ia, ib, s0, s1] = act, A = WM[ia], B = WM[ib];
      const u = t < s1 ? M.io((t - s0) / 0.6) : 1 - M.io((t - s1) / 0.6);
      const sp = M.clamp((u - 0.5) * 3 + 0.5);
      tint(A.m, mix(C.ink2, OC, sp)); tint(B.m, mix(C.ink2, NC, sp)); A.m.h2.style.opacity = '0';
      const xa = A.cx + 14, ya = A.cy + 11, xb = B.cx - 16, yb = B.cy - 10; M.hide(bPr, false); attr(bPr, 'cx', M.lerp(xa, xb, u).toFixed(1)); attr(bPr, 'cy', (M.lerp(ya, yb, u) - 26 * Math.sin(Math.PI * u)).toFixed(1));
      if (sp > 0.05) { M.hide(bLa, false); M.hide(bLb, false); attr(bLa, 'x', A.cx.toFixed(1)); attr(bLa, 'y', (A.cy + 46).toFixed(1)); attr(bLb, 'x', B.cx.toFixed(1)); attr(bLb, 'y', (B.cy - 30).toFixed(1)); bLa.style.opacity = bLb.style.opacity = sp.toFixed(2); }
    }
    const TAG = [[tS1 + 0.3, 'PURE WATER · 298 K'], [T0('S3'), 'A PROTON JUMPS'], [wt('S3', 'meet'), 'THEY MEET: WATER AGAIN'], [T0('S4'), 'VERY FEW SPLIT'], [T0('S5'), 'ONE OF EACH, EVERY TIME']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.hide(bCnt, true);
    TL.forEach((r, i) => { const el = $('#tl' + i); M.vis(el, t, tTl[i], 1e9, { dy: 16 }); const nx2 = i < 3 ? tTl[i + 1] : T1('S5') + 0.3; setBg(el, mix(C.soft, C.ac2, M.io((t - tTl[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    fade($('#eG'), t, wt('S5', 'equals'));
    avD(t, T1('S5') - 1.6, z);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    PUC.write($('#lEq'), t, wt('L1', 'ionic') - 0.2, 1.6);
    M.vis($('#hcd'), t, wt('L3', 'changes') - 0.2, 1e9, POP);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.4, 1e9, { dy: 24 }); const on = M.io((t - g[4] + 0.3) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4] + 0.3) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const tb = [T0('D2') + 0.5, T0('D3') + 0.6, T0('D4') + 0.6]; BX.forEach((_, i) => M.vis($('#bx' + i), t, tb[i], 1e9, POP));
    dAr.forEach((a, i) => { M.draw(a[0], t, tb[i + 1] - 0.4, 0.3); fade(a[1], t, tb[i + 1] - 0.1); });
    fade(dK, t, T0('D4') + 1);
    const u1 = M.io((t - T0('D4') - 1) / 0.8), u2 = M.io((t - wt('D5', 'pOH')) / 0.8);
    attr(dPH, 'width', (7 * DU * u1).toFixed(1)); fade(dPH, t, T0('D4') + 1, 1e9, 0.1); fade(dT1, t, T0('D4') + 1.6);
    attr(dPOH, 'width', (7 * DU * u2).toFixed(1)); fade(dPOH, t, wt('D5', 'pOH'), 1e9, 0.1); fade(dT2, t, wt('D5', 'pOH') + 0.6);
    fade(dT3, t, wt('D6', 'fourteen'));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dy: 36, ...o });
    fade(gSeg, t, tG1 + 0.4);
    PM.forEach((m, i) => fade(gM[i], t, m[4] - 0.15));
    fade(gZa, t, wt('G5', 'Below') - 0.1); fade(gZb, t, wt('G5', 'Above') - 0.1); fade(gTen, t, wt('G5', 'each') - 0.1);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'Another') - 0.3, zc, { dx: 60, dy: 0, ...o });
    cA.forEach((d, i) => fade(d, t, wt('C1', 'three') + i * 0.012, 1e9, 0.15)); cB.forEach(d => fade(d, t, wt('C1', 'five'))); fade(cBt, t, wt('C1', 'five') + 0.2);
    M.vis($('#caV'), t, wt('C1', 'three') + 0.4, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C1', 'five') + 0.3, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Two') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Lower') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'plus') - 0.4, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'fourteen') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    [wJar, wLiq, wMet, wSc].forEach(e => fade(e, t, wt('W2', 'cola')));
    const u = M.io((t - wt('W5', 'flips')) / 1.2), v = M.lerp(7, 2.42, u);
    M.setT(wRd, t < T0('W3') ? '- - -' : v.toFixed(2)); attr(wMk, 'transform', `translate(${(90 + v * 45).toFixed(1)},418)`); fade(wMk, t, T0('W3'));
    M.vis($('#wG'), t, wt('W5', 'acidic') - 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'eight') - 0.3, tStrike: wt('X2', 'never') - 0.1, tRight: wt('X3', 'pH') - 0.2 });
    fade(tq1, t, wt('X2', 'never')); fade(tq2, t, wt('X3', 'Water'));
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
