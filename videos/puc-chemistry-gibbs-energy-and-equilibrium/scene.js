// PUC Chemistry Ep 57: Gibbs energy and equilibrium (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: ΔG teal-ink (navy), ΔH orange (enthalpy team), ΔS / TΔS gold (entropy team), spontaneous green, not red, T blue, O violet
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tH = s => `\\textcolor{${XC}}{${s}}`, tS = s => `\\textcolor{${GC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`, tB = s => `\\textcolor{${BC}}{${s}}`;
const dG = '\\Delta G', dH = tH('\\Delta H'), dS = tS('\\Delta S'), TdS = `${tB('T')}${dS}`;
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const harrow = (p, x1, x2, y, col, w = 14) => { const d = x2 > x1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x1} ${y} H${x2 - d * 16}`, stroke: col, 'stroke-width': w, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x2 - d * 26} ${y - 20} L${x2} ${y} L${x2 - d * 26} ${y + 20} Z`, fill: col }); return { l, h, set(xa, xb) { const dd = xb > xa ? 1 : -1; attr(l, 'd', `M${xa} ${y} H${(xb - dd * 16).toFixed(1)}`); attr(h, 'd', `M${(xb - dd * 26).toFixed(1)} ${y - 20} L${xb.toFixed(1)} ${y} L${(xb - dd * 26).toFixed(1)} ${y + 20} Z`); } }; };
const varrow = (p, x, y1, y2, col) => { const d = y2 > y1 ? 1 : -1; const l = mk(p, 'path', { d: `M${x} ${y1} V${y2 - d * 14}`, stroke: col, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }); const h = mk(p, 'path', { d: `M${x - 13} ${y2 - d * 20} L${x} ${y2} L${x + 13} ${y2 - d * 20} Z`, fill: col }); return [l, h]; };
const fmt = v => (v > 0.005 ? '+' : v < -0.005 ? '-' : '') + Math.abs(v).toFixed(2);

Object.assign(M.IC, {
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 2v2', 'M12 20v2', 'm4.9 4.9 1.4 1.4', 'm17.7 17.7 1.4 1.4', 'M2 12h2', 'M20 12h2', 'm6.3 17.7-1.4 1.4', 'm19.1 4.9-1.4 1.4'],
  snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'],
  therm: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  bottle: ['M10 2h4', 'M10 2v3l-2 3v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-3V2'],
  scroll: ['M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4', 'M19 17V5a2 2 0 0 0-2-2H4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['sun', 'Warm afternoon', 'ICE MELTS', 'afternoon', 'MELTS', XC], ['snow', 'Freezer', 'WATER FREEZES', 'freezer', 'FREEZES', BC], ['therm', 'Same water', 'TWO DIRECTIONS', 'directions', 'T DECIDES', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Ice in a bottle: melts in minutes', 'minutes', 'H3'], ['Counting the surroundings is hard', 'surroundings', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('bottle', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: tug of war ---------- */
const QR = [['Team 1: enthalpy, ΔH', 'HEAT OUT', 'P2', 'enthalpy', XC], ['Team 2: entropy, ΔS', 'DISORDER', 'P3', 'entropy', GC], ['Temperature boosts team 2', 'T × ΔS', 'P4', 'booster', BC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pC = mk(ps, 'line', { x1: 220, y1: 90, x2: 220, y2: 440, stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const pB = txt(ps, 200, 112, '← BACK', { 'text-anchor': 'end', 'font-size': 18, fill: RD, 'font-weight': 600 }), pF = txt(ps, 240, 112, 'FORWARD →', { 'font-size': 18, fill: OK, 'font-weight': 600 });
const pHl = txt(ps, 240, 176, 'ENTHALPY · HEAT OUT', { 'font-size': 20, fill: XC, 'font-weight': 600 }), pHa = harrow(ps, 220, 480, 220, XC);
const pSl = txt(ps, 240, 306, 'ENTROPY × T · MORE DISORDER', { 'font-size': 20, fill: GC, 'font-weight': 600 }), pSa = harrow(ps, 220, 400, 350, GC);
const thP = mk(ps, 'g', {}); mk(thP, 'rect', { x: 80, y: 280, width: 22, height: 140, rx: 11, fill: '#fff', stroke: HC, 'stroke-width': 3 }); mk(thP, 'circle', { cx: 91, cy: 424, r: 18, fill: BC }); const thPm = mk(thP, 'rect', { x: 86, y: 380, width: 10, height: 44, fill: BC }); txt(thP, 91, 270, 'T', { 'text-anchor': 'middle', 'font-size': 22, fill: BC, 'font-weight': 600 });

/* ---------- S: ice bench + tug ---------- */
const b = $('#bS'), HF = 6.01, SF = 22.0;
const glass = mk(b, 'path', { d: 'M150 120 V400 a20 20 0 0 0 20 20 H420 a20 20 0 0 0 20 -20 V120', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const water = mk(b, 'rect', { x: 152, y: 400, width: 286, height: 18, fill: '#DCEFF8' });
const iceM = Array.from({ length: 16 }, (_, i) => ({ e: dot(b, 13, NC), g: [235 + (i % 4) * 40, 230 + Math.floor(i / 4) * 40], s: [175 + rnd(i, 1) * 240, 330 + rnd(i, 2) * 80], ph: rnd(i, 3) * 6.283, k: rnd(i, 4) }));
const iceBox = mk(b, 'rect', { x: 212, y: 207, width: 166, height: 166, rx: 10, fill: 'none', stroke: '#7FB8DA', 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const kn = mk(b, 'g', {}); mk(kn, 'circle', { cx: 600, cy: 230, r: 80, fill: C.soft, stroke: C.ink2, 'stroke-width': 4 });
[-130, -90, -50].forEach((a, i) => { const r = a * Math.PI / 180; mk(kn, 'line', { x1: 600 + 86 * Math.cos(r), y1: 230 + 86 * Math.sin(r), x2: 600 + 100 * Math.cos(r), y2: 230 + 100 * Math.sin(r), stroke: C.ink2, 'stroke-width': 4 }); });
const knP = mk(kn, 'line', { x1: 600, y1: 230, x2: 600, y2: 170, stroke: BC, 'stroke-width': 8, 'stroke-linecap': 'round' }); mk(kn, 'circle', { cx: 600, cy: 230, r: 12, fill: BC });
const knT = txt(b, 600, 360, '', { 'text-anchor': 'middle', 'font-size': 30, fill: BC, 'font-weight': 600 }), knK = txt(b, 600, 396, '', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const es = $('#eS'), EX = 392, EK = 220;
mk(es, 'line', { x1: EX, y1: 90, x2: EX, y2: 330, stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const eB = txt(es, EX - 20, 112, '← BACK: ICE STAYS', { 'text-anchor': 'end', 'font-size': 17, fill: RD, 'font-weight': 600 }), eF = txt(es, EX + 20, 112, 'FORWARD: ICE MELTS →', { 'font-size': 17, fill: OK, 'font-weight': 600 });
const rope = mk(es, 'line', { x1: 60, y1: 210, x2: 724, y2: 210, stroke: '#B08B5A', 'stroke-width': 8, 'stroke-linecap': 'round' });
const knot = mk(es, 'rect', { x: EX - 10, y: 190, width: 20, height: 40, rx: 6, fill: HC });
const eHa = harrow(es, EX, 120, 290, XC, 12), eHt = txt(es, 70, 330, 'ΔH = +6.01', { 'font-size': 24, fill: XC, 'font-weight': 600 });
const eSa = harrow(es, EX, 600, 290, GC, 12), eSt = txt(es, 714, 330, '', { 'text-anchor': 'end', 'font-size': 24, fill: GC, 'font-weight': 600 });
const eHs = txt(es, 70, 360, 'HEAT IN: PULLS BACK', { 'font-size': 16, fill: XC, 'font-weight': 600 }), eSs = txt(es, 714, 360, 'MESSIER: PULLS FORWARD', { 'text-anchor': 'end', 'font-size': 16, fill: GC, 'font-weight': 600 });
const eSv = txt(es, 714, 392, 'ΔS = +22.0 J K⁻¹ mol⁻¹', { 'text-anchor': 'end', 'font-size': 16, fill: GC, 'font-weight': 600 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Warm corridor: entropy wins. My ice melts!' });

/* ---------- L: Gibbs ---------- */
$('#hcI').innerHTML = M.icon('scroll', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`${dG} = ${dH} - ${TdS}`);
const GT = [[`${dG} < 0`, 'SPONTANEOUS', 'GOES ON ITS OWN', OK, wt('L3', 'negative')], [`${dG} > 0`, 'NOT SPONTANEOUS', 'NEEDS A PUSH', RD, wt('L3', 'positive')], [`${dG} = 0`, 'EQUILIBRIUM', 'BALANCED', GC, wt('L3', 'zero')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px"><div class="gk">${K(k)}</div><div class="gv" style="color:${c}">${v}</div><div class="gs">${s}</div></div>`).join('');

/* ---------- D: derivation ---------- */
const MS = [[K(`\\Delta S_{\\text{total}} = ${dS}_{\\text{sys}} + \\Delta S_{\\text{surr}}`), 'D2'], [K(`\\Delta S_{\\text{surr}} = -\\,${dH} / ${tB('T')}`), 'D3'], [K(`-${tB('T')}\\Delta S_{\\text{total}} = ${dH} - ${TdS} = ${dG}`), 'D4'], [K(`\\Delta S_{\\text{total}} ${tO('\\uparrow')} \\iff ${dG} ${tO('\\downarrow')}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${100 + i * 112}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS');
const dSur = mk(ds, 'rect', { x: 40, y: 70, width: 704, height: 230, rx: 16, fill: '#F3EEFD', stroke: OC, 'stroke-width': 3 }); const dSurT = txt(ds, 64, 100, 'SURROUNDINGS', { 'font-size': 18, fill: OC, 'font-weight': 600 });
const dSys = mk(ds, 'circle', { cx: 300, cy: 190, r: 70, fill: '#EAF1FE', stroke: BC, 'stroke-width': 3 }); const dSysT = txt(ds, 300, 196, 'SYSTEM', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 });
const dHa = harrow(ds, 380, 560, 190, XC, 8); const dHt = txt(ds, 470, 160, 'HEAT  -ΔH', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });
const dSt = txt(ds, 620, 250, '-ΔH / T', { 'text-anchor': 'middle', 'font-size': 24, fill: OC, 'font-weight': 600 });
const DB = 400, bar = (x, col, colT, lab) => { const g = mk(ds, 'g', {}); const r = mk(g, 'rect', { x: x - 60, y: DB, width: 120, height: 0, rx: 6, fill: colT, stroke: col, 'stroke-width': 3 }); txt(g, x, 556, lab, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }); return { g, r }; };
mk(ds, 'line', { x1: 120, y1: DB, x2: 664, y2: DB, stroke: C.ink2, 'stroke-width': 3 });
const dB1 = bar(250, OK, OKT, 'ΔS TOTAL GOES UP'), dB2 = bar(534, HC, '#DCE1EA', 'ΔG GOES DOWN');
const dX = txt(ds, 392, DB - 40, '× (-T)', { 'text-anchor': 'middle', 'font-size': 24, fill: BC, 'font-weight': 600 });

/* ---------- G: four cases ---------- */
const GR = [[`${dH} < 0,\\ ${dS} > 0`, 'ALWAYS', OK, 'G2'], [`${dH} > 0,\\ ${dS} < 0`, 'NEVER', RD, 'G3'], [`${dH} < 0,\\ ${dS} < 0`, 'WHEN COLD', BC, 'G4'], [`${dH} > 0,\\ ${dS} > 0`, 'WHEN HOT', XC, 'G5']];
$('#grs').innerHTML = GR.map(([k, v, c], i) => `<div class="qr" id="gr${i}" style="top:${96 + i * 104}px"><div class="nn" style="border-color:${c};color:${c}">${i + 1}</div><div class="qt">${K(k)}</div><div class="qk" style="color:${c}">${v}</div></div>`).join('');
const tGr = GR.map(g => T0(g[3]) + 0.1);
const gs = $('#gS'), GX0 = 90, GX1 = 720, GY = 290;
const gZone = mk(gs, 'rect', { x: GX0, y: GY, width: GX1 - GX0, height: 190, fill: '#E6F4EC' });
const gZt = txt(gs, GX0 + 14, 470, 'SPONTANEOUS: ΔG < 0', { 'font-size': 18, fill: OK, 'font-weight': 600 });
mk(gs, 'line', { x1: GX0, y1: 90, x2: GX0, y2: 490, stroke: C.ink2, 'stroke-width': 3 }); mk(gs, 'line', { x1: GX0, y1: GY, x2: GX1, y2: GY, stroke: C.ink2, 'stroke-width': 3 });
txt(gs, GX0 - 12, 104, 'ΔG', { 'text-anchor': 'end', 'font-size': 22, fill: HC, 'font-weight': 600 }); txt(gs, GX1, GY - 12, 'T →', { 'text-anchor': 'end', 'font-size': 22, fill: BC, 'font-weight': 600 }); txt(gs, GX0 - 12, GY + 6, '0', { 'text-anchor': 'end', 'font-size': 20, fill: HC, 'font-weight': 600 });
const GL = [[350, 460, OK], [230, 110, RD], [380, 150, BC], [200, 440, XC]].map(([y0, y1, c]) => mk(gs, 'path', { d: `M${GX0} ${y0} L${GX1 - 20} ${y1}`, stroke: c, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }));

/* ---------- C: freeze vs melt ---------- */
const eqr = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
$('#car').innerHTML = eqr('ca0', 84, `\\text{Heat out: } ${dH} < 0`, 'PULLS FORWARD', OK) + eqr('ca1', 172, `\\text{Less disorder: } ${dS} < 0`, 'PULLS BACK', RD);
$('#cfr').innerHTML = eqr('cf0', 84, `\\text{Heat in: } ${dH} > 0`, 'PULLS BACK', RD) + eqr('cf1', 172, `\\text{More disorder: } ${dS} > 0`, 'PULLS FORWARD', OK);
const strip = (p, left) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: 36, y: 290, width: 712, height: 50, rx: 10, fill: C.soft }); const z = mk(g, 'rect', { x: left ? 36 : 392, y: 290, width: 356, height: 50, rx: 10, fill: OKT }); mk(g, 'line', { x1: 392, y1: 280, x2: 392, y2: 350, stroke: HC, 'stroke-width': 4 }); txt(g, 392, 378, '273 K · 0 °C', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }); txt(g, left ? 214 : 570, 322, left ? 'SPONTANEOUS' : 'SPONTANEOUS', { 'text-anchor': 'middle', 'font-size': 18, fill: OK, 'font-weight': 600 }); txt(g, 56, 378, 'COLD', { 'font-size': 16, fill: BC, 'font-weight': 600 }); txt(g, 728, 378, 'HOT', { 'text-anchor': 'end', 'font-size': 16, fill: XC, 'font-weight': 600 }); return g; };
const sA = strip($('#caS'), true), sB = strip($('#cfS'), false);
$('#caV').innerHTML = `<span style="color:${OK}">GOES</span><span>only</span><span style="color:${BC}">BELOW 273 K</span>`; $('#cfV').innerHTML = `<span style="color:${OK}">GOES</span><span>only</span><span style="color:${XC}">ABOVE 273 K</span>`;
const th1 = PUC.think($('#th1'), { q: 'Ice melting at 50 °C (323 K). Is ΔG positive or negative?', opts: ['Positive', 'Negative'], right: 1, why: 'Negative. 323 K is above 273 K, so the entropy team wins.' });

/* ---------- R: equilibrium ---------- */
const RR = [[K(`${dG}^{\\ominus} = -R${tB('T')} \\ln K`), 'R3', 'naught'], [K(`${dG}^{\\ominus} = -2.303\\,R${tB('T')} \\log K`), 'R3', 'two'], [K(`${dG}^{\\ominus} \\ll 0:\\ K \\gg 1`), 'R5', 'big'], [K(`${dG}^{\\ominus} \\gg 0:\\ K \\ll 1`), 'R5', 'positive']];
$('#rrs').innerHTML = RR.map(([s], i) => `<div class="dr" id="rr${i}" style="top:${96 + i * 96}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tRr = RR.map(r => wt(r[1], r[2]) - 0.1);
$('#rP').innerHTML = `R = 8.314 J K⁻¹ mol⁻¹ · gas constant`;
const ks = $('#kS'), KX0 = 92, KX1 = 692, KY = 150;
mk(ks, 'line', { x1: KX0, y1: KY, x2: KX1, y2: KY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' });
[-10, -5, 0, 5, 10].forEach(v => { const x = KX0 + (v + 10) / 20 * (KX1 - KX0); mk(ks, 'line', { x1: x, y1: KY - 10, x2: x, y2: KY + 10, stroke: C.ink2, 'stroke-width': 3 }); txt(ks, x, KY + 38, (v > 0 ? '+' : '') + v, { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }); });
txt(ks, 392, 100, 'ΔG° (kJ mol⁻¹)', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const kM = mk(ks, 'path', { d: 'M0 0 L-14 -24 L14 -24 Z', fill: HC });
const kV = txt(ks, 392, 250, '', { 'text-anchor': 'middle', 'font-size': 34, fill: HC, 'font-weight': 600 });
mk(ks, 'rect', { x: 92, y: 290, width: 600, height: 64, rx: 12, fill: RDT });
const kBar = mk(ks, 'rect', { x: 92, y: 290, width: 300, height: 64, rx: 12, fill: OK });
const kA = txt(ks, 104, 390, '', { 'font-size': 20, fill: OK, 'font-weight': 600 }), kB = txt(ks, 680, 390, '', { 'text-anchor': 'end', 'font-size': 20, fill: RD, 'font-weight': 600 });
const kLab = txt(ks, 392, 440, '', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${dG} = ${dH} - ${TdS} \\qquad ${dG}^{\\ominus} = -R${tB('T')} \\ln K`);

/* ---------- W: ozone ---------- */
const wsol = PUC.solution($('#wl'), [
  [K('\\log K = \\log(2.47 \\times 10^{-29}) = -28.607')],
  [K(`2.303 \\times 8.314 \\times 298 \\approx 5706\\ \\text{J mol}^{-1}`)],
  [K(`${dG}^{\\ominus} = -5706 \\times (-28.607)`)],
  [K(`${dG}^{\\ominus} \\approx ${tR('+163')}\\ \\text{kJ mol}^{-1}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), wt('W5', 'Plus')];
const ws = $('#wS');
const jar = mk(ws, 'path', { d: 'M90 90 V400 a20 20 0 0 0 20 20 H440 a20 20 0 0 0 20 -20 V90', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const o2 = Array.from({ length: 14 }, (_, i) => { const g = mk(ws, 'g', {}); dot(g, 13, OC); const d2 = dot(g, 13, OC); attr(d2, 'cx', 24); return { g, x: 130 + (i % 4) * 80 + rnd(i, 5) * 20, y: 140 + Math.floor(i / 4) * 70 + rnd(i, 6) * 20, ph: rnd(i, 7) * 6.283 }; });
const wL = [txt(ws, 275, 460, 'O₂ · ALMOST ALL', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 })];
const wK = txt(ws, 600, 200, 'K = 2.47 × 10⁻²⁹', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 });
const wKs = txt(ws, 600, 240, 'TINY K', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 });
const wGv = txt(ws, 600, 330, 'ΔG° = +163 kJ', { 'text-anchor': 'middle', 'font-size': 26, fill: RD, 'font-weight': 600 });
const wO3 = txt(ws, 600, 380, 'O₃: ALMOST NONE', { 'text-anchor': 'middle', 'font-size': 18, fill: OC, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K('6 - 273 \\times 22 = -6000')}, mixed units`, right: `${K(`6000 - 273 \\times 22 = 6000 - 6006 \\approx ${tO('0')}`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 60, 110, 'kJ → J: × 1000', { 'font-size': 30, fill: XC, 'font-weight': 600 }), tq2 = txt(tsv, 60, 170, '6 kJ = 6000 J', { 'font-size': 26, fill: HC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Meaning of the sign of ΔG, the temperature where it turns spontaneous, or K from ΔG°' });
const OPT = ['1.11 K', '1112.5 K', '898.9 K', '\\text{All temperatures}'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'ΔH = +178 kJ mol⁻¹, ΔS = +160 J K⁻¹ mol⁻¹. Above what temperature is it spontaneous?', qW: 780,
  opts: OPT.map(s => K(s.startsWith('\\') ? s : s.replace(' K', '\\ \\text{K}'))), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${dG} < 0 \\text{ when } ${tB('T')} > ${dH} / ${dS}`)], [K('178\\ \\text{kJ} = 178000\\ \\text{J}')], [K(`${tB('T')} = 178000 \\div 160 = ${tO('1112.5')}\\ \\text{K}`)], ['A forgot to convert']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Gibbs energy and equilibrium', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${dG} = ${dH} - ${TdS}`), K(`${dG}^{\\ominus} = -R${tB('T')} \\ln K = -2.303\\,R${tB('T')} \\log K`),
    '<b>ΔG &lt; 0</b> spontaneous · <b>ΔG = 0</b> equilibrium · <b>ΔG &gt; 0</b> not spontaneous', '<b>R</b> = 8.314 J K⁻¹ mol⁻¹ · convert kJ to J before subtracting', '<b>Ice</b>: 6010 ÷ 22.0 ≈ 273 K · <b>ozone</b>: K = 2.47 × 10⁻²⁹, ΔG° = +163 kJ'] });
const YQ = ['What does a negative ΔG tell you?', 'Why does melting ice need a high enough temperature?', 'If ΔG° is large and negative, is K big or small?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CHAPTER 6', topic: 'Does a reaction at equilibrium really stop? Equilibrium', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S5') - 0.2, 1.05, 960, 560], [T0('S6') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.dr .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(34 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 170; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
// temperature path for the ice bench
const tKnob = [wt('S4', 'minus') - 0.3, wt('S5', 'Turn'), wt('S5', 'zero'), wt('S6', 'twenty')];
const tempAt = t => { if (t < tKnob[1]) return 263; if (t < tKnob[3] - 0.2) return 263 + 10 * M.io((t - tKnob[1]) / (tKnob[2] - tKnob[1] + 0.3)); return 273 + 25 * M.io((t - tKnob[3] + 0.2) / 1.4); };

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
    const tBd = [wt('H2', 'Only'), wt('H2', 'temperature'), wt('H2', 'vote')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'vote') - 0.1, 1e9, POP);
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
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'tug') - 0.1, out, { dx: 60, dy: 0, ...o });
    [pC, pB, pF].forEach(e => fade(e, t, wt('P1', 'teams') - 0.2));
    const th = wt('P2', 'Giving'); fade(pHl, t, tQr[0]); M.draw(pHa.l, t, th, 0.6); fade(pHa.h, t, th + 0.5);
    const ts = wt('P3', 'More'); fade(pSl, t, tQr[1]); fade(pSa.l, t, ts, 1e9, 0.4); fade(pSa.h, t, ts + 0.5);
    fade(thP, t, tQr[2] - 0.2); const boost = M.io((t - wt('P4', 'hotter')) / 1.4); pSa.set(220, 400 + 300 * boost); attr(thPm, 'y', (380 - 90 * boost).toFixed(1)); attr(thPm, 'height', (44 + 90 * boost).toFixed(1));
    M.vis($('#pP'), t, wt('P4', 'harder') - 0.2, 1e9, POP);
  }

  /* S: ice bench */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    const T = tempAt(t), C2 = T - 273, f = T < 272.5 ? 0 : T < 274 ? 0.5 : M.clamp(0.5 + (T - 274) / 20);
    fade(glass, t, wt('S1', 'ice') - 0.2); fade(water, t, wt('S1', 'ice')); attr(water, 'height', (18 + 60 * f).toFixed(1)); attr(water, 'y', (400 - 60 * f).toFixed(1));
    fade(iceBox, t, wt('S1', 'ice'), 1e9, 0.25, 1 - f);
    iceM.forEach((p, i) => { const m = M.clamp((f - p.k * 0.9) / 0.1); const w = 2 + 8 * m; pos(p.e, M.lerp(p.g[0], p.s[0], m) + w * Math.sin(t * 6 + p.ph), M.lerp(p.g[1], p.s[1], m) + w * Math.cos(t * 5 + p.ph)); fade(p.e, t, wt('S1', 'ice') + i * 0.02, 1e9, 0.2); });
    fade(kn, t, wt('S1', 'knob') - 0.2); const ang = M.lerp(-130, -50, (T - 263) / 35) * Math.PI / 180; attr(knP, 'x2', (600 + 60 * Math.cos(ang)).toFixed(1)); attr(knP, 'y2', (230 + 60 * Math.sin(ang)).toFixed(1));
    M.setT(knT, `${C2 > 0.5 ? '+' : ''}${Math.round(C2)} °C`); M.setT(knK, `${Math.round(T)} K`); fade(knT, t, wt('S1', 'knob')); fade(knK, t, wt('S1', 'knob'));
    const TAG = [[tS1 + 0.3, 'ICE · TEMPERATURE KNOB'], [T0('S2'), 'HEAT IN: ΔH = +6.01'], [T0('S3'), 'MESSIER: ΔS = +22.0'], [T0('S4'), '-10 °C · ICE STAYS'], [wt('S5', 'zero'), '0 °C · ICE AND WATER'], [wt('S6', 'twenty'), '25 °C · ICE MELTS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    // tug
    const th = wt('S2', 'Team'), ts2 = wt('S3', 'Team'); [rope, knot].forEach(e => fade(e, t, T0('S2'))); [eB, eF].forEach(e => fade(e, t, T0('S2') + 0.2));
    const TS = T * SF / 1000, net = M.io((t - T0('S4')) / 0.6) * (TS - HF);
    const kx = EX + EK * net; attr(knot, 'x', (kx - 10).toFixed(1));
    const hL = M.io((t - th) / 0.5) * 2 * 120, sL2 = M.io((t - ts2) / 0.5) * TS / HF * 2 * 120;
    eHa.set(kx, kx - Math.max(30, hL)); eSa.set(kx, kx + Math.max(30, sL2)); [eHa.l, eHa.h, eHt, eHs].forEach(e => fade(e, t, th - 0.1)); [eSa.l, eSa.h, eSt, eSs, eSv].forEach(e => fade(e, t, ts2 - 0.1));
    M.setT(eSt, `TΔS = +${TS.toFixed(2)}`);
    $('#eG').innerHTML = t >= T0('S4') ? K(`${dG} = ${dH} - ${TdS} = ${(TS - HF) > 0.03 ? tO(fmt(HF - TS)) : (HF - TS) > 0.03 ? tR(fmt(HF - TS)) : `\\textcolor{${GC}}{0}`}`) : '';
    fade($('#eG'), t, T0('S4'));
    avA(t, wt('S6', 'melts') + 0.2, z);
  }

  /* L: Gibbs */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#hcd'), t, wt('L1', 'Josiah') - 0.1, 1e9, POP);
    PUC.write($('#lEq'), t, T0('L2'), 1.4);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.4, 1e9, { dy: 24 }); const on = M.io((t - g[4] + 0.3) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4] + 0.3) / 0.3) : 1); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    [dSys, dSysT].forEach(e => fade(e, t, wt('D2', 'system'))); [dSur, dSurT].forEach(e => fade(e, t, wt('D2', 'surroundings') - 0.2));
    const th = wt('D3', 'heat'); M.draw(dHa.l, t, th, 0.6); fade(dHa.h, t, th + 0.5); fade(dHt, t, th + 0.3); fade(dSt, t, wt('D3', 'minus'));
    const u = M.io((t - wt('D5', 'total')) / 1.2); [dB1.g, dB2.g].forEach(g => fade(g, t, T0('D4') + 0.5)); fade(dX, t, wt('D4', 'Multiply'));
    const h1 = 30 + 60 * u, h2 = 30 + 60 * u; attr(dB1.r, 'y', (DB - h1).toFixed(1)); attr(dB1.r, 'height', h1.toFixed(1)); attr(dB2.r, 'y', DB); attr(dB2.r, 'height', h2.toFixed(1));
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    fade(gZone, t, tG1 + 0.6); fade(gZt, t, tG1 + 0.8);
    GR.forEach((_, i) => { const el = $('#gr' + i); M.vis(el, t, tGr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tGr[i + 1] : T1('G5') + 0.4; const on = M.io((t - tGr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); M.draw(GL[i], t, tGr[i] + 0.3, 1.0); GL[i].style.opacity = (t > nx2 ? 0.35 : 1).toFixed(2); });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#ca0'), t, wt('C1', 'Freezing') + 0.3, 1e9, { dy: 16 }); M.vis($('#ca1'), t, wt('C1', 'less') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, wt('C1', 'Melting') - 0.3, zc, { dx: 60, dy: 0, ...o });
    M.vis($('#cf0'), t, wt('C1', 'Melting') + 0.3, 1e9, { dy: 16 }); M.vis($('#cf1'), t, wt('C1', 'more') - 0.1, 1e9, { dy: 16 });
    fade(sA, t, wt('C1', 'less') + 0.5); fade(sB, t, wt('C1', 'more') + 0.5);
    M.vis($('#caV'), t, wt('C1', 'less') + 0.8, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C1', 'more') + 0.8, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Is') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Fifty') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RR.forEach((_, i) => { const r = $('#rr' + i); M.vis(r.querySelector('.sn'), t, tRr[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tRr[i], 0.9); });
    M.vis($('#rP'), t, wt('R4', 'gas') - 0.2, 1e9, POP);
    M.vis($('#rb'), t, T0('R2') - 0.1, z, { dx: 60, dy: 0, ...o });
    const t5 = T0('R5'), tb = wt('R5', 'positive');
    const g = t < t5 ? 0 : t < tb - 0.2 ? -10 * M.io((t - t5) / 1.2) : M.lerp(-10, 10, M.io((t - tb + 0.2) / 1.4));
    const Kv = Math.exp(-g * 1000 / (8.314 * 298)), fr = Kv / (1 + Kv);
    const x = KX0 + (g + 10) / 20 * (KX1 - KX0); attr(kM, 'transform', `translate(${x.toFixed(1)},${KY - 6})`);
    M.setT(kV, `K = ${Kv >= 10 ? Kv.toFixed(0) : Kv >= 0.1 ? Kv.toFixed(2) : Kv.toFixed(3)}`);
    attr(kBar, 'width', Math.max(12, 600 * fr).toFixed(1));
    M.setT(kA, `B (PRODUCT) ${Math.round(fr * 100)}%`); M.setT(kB, `A ${Math.round((1 - fr) * 100)}%`);
    M.setT(kLab, g < -3 ? 'MOSTLY PRODUCTS' : g > 3 ? 'MOSTLY REACTANTS' : 'HALF AND HALF: K = 1'); kLab.setAttribute('fill', g < -3 ? OK : g > 3 ? RD : GC);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Negative') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Zero') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'equilibrium') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    fade(jar, t, wt('W2', 'Oxygen')); o2.forEach((m, i) => { attr(m.g, 'transform', `translate(${(m.x + 6 * Math.sin(t * 3 + m.ph)).toFixed(1)},${(m.y + 6 * Math.cos(t * 2.6 + m.ph)).toFixed(1)}) rotate(${(30 * Math.sin(t + m.ph)).toFixed(0)})`); fade(m.g, t, wt('W2', 'Oxygen') + i * 0.04, 1e9, 0.2); });
    fade(wL[0], t, wt('W2', 'Oxygen') + 0.4); fade(wK, t, wt('W2', 'two')); fade(wKs, t, T0('W6')); fade(wGv, t, wt('W5', 'Plus')); fade(wO3, t, wt('W6', 'hardly'));
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'kilojoules') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Then') - 0.2 });
    fade(tq1, t, wt('X3', 'Convert')); fade(tq2, t, wt('X3', 'Six'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Above') - 0.1, tCount, tAns });
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
