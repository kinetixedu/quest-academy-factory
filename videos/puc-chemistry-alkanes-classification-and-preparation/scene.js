// PUC Chemistry Ep 89: Alkanes - classification and preparation (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: carbon ink, hydrogen light, the new / moving H teal, bromine brown, sodium grey, COO part gold, electron e- orange
const CK = C.ink, HL = '#E9EEF5', NH = C.ac, BR = '#A0522D', NA = '#6B7280', GC = '#B7791F', EC = '#C8461B', HC = C.ink, OK = C.ok, RD = C.red, OO = '#7A4FE0';
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
const atom = (p, x, y, r, fill, s, fs = 22, tcol = '#fff') => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill, stroke: fill === HL ? C.dim : 'none', 'stroke-width': 2 }); const tx = txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: tcol, 'text-anchor': 'middle' }); g._t = tx; place(g, x, y); g._x = x; g._y = y; return g; };
const Hat = (p, x, y, col = HL) => atom(p, x, y, 16, col, 'H', 16, col === HL ? HC : '#fff');
const Cat = (p, x, y, s = 'C', col = CK) => atom(p, x, y, 26, col, s, s.length > 1 ? 15 : 22);
const bond = (p, x1, y1, x2, y2, w = 5) => mk(p, 'line', { x1, y1, x2, y2, stroke: C.ink2, 'stroke-width': w, 'stroke-linecap': 'round' });
const tile = (p, x, y, w, s, col, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w / 2, y: -28, width: w, height: 56, rx: 12, fill: '#fff', stroke: col, 'stroke-width': 3 }); const tx = txt(g, 0, 8, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: col, 'text-anchor': 'middle' }); g._t = tx; place(g, x, y); return g; };
const ball = (p, x, y, col = NH, r = 22) => mk(p, 'circle', { cx: x, cy: y, r, fill: col });

Object.assign(M.IC, {
  cylinder: ['M8 6h8v14H8z', 'M10 3h4v3h-4z', 'M8 10h8'],
  fuel: ['M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'],
  candle: ['M9 9h6v12H9z', 'M12 3c1.5 2 1.5 3.5 0 5c-1.5-1.5-1.5-3 0-5z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tG1 = T0('G1'), tS1 = T0('S1'), tR1 = T0('R1'), tD1 = T0('D1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['cylinder', 'Cooking gas', 'IN THE CYLINDER', 'C + H'], ['fuel', 'Petrol', 'IN THE SCOOTER', 'C + H'], ['candle', 'Candle wax', 'A SOLID', 'C + H']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'gas'), wt('H1', 'petrol'), wt('H1', 'wax')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, bd], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${NH}">${bd}</div></div>`).join('');
const KIT = [['Chain oil: same family', 'oil', 'H3'], ['Chapter 9 · Hydrocarbons', 'Hydrocarbons', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon(i ? 'candle' : 'fuel', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: classification tree ---------- */
const ps = $('#pS');
const NX = [200, 520, 840, 1120, 1400], NY = 250;
const PN = [['Alkanes', 'ALL SINGLE', 'P2', 'alkanes', NH], ['Alkenes', 'C=C DOUBLE', 'P3', 'alkene', GC], ['Alkynes', 'C≡C TRIPLE', 'P3', 'alkyne', GC], ['Cycloalkanes', 'RING', 'P4', 'cycloalkane', OO], ['Aromatic', 'BENZENE RING', 'P4', 'aromatic', OO]];
$('#pns').innerHTML = `<div class="tn" id="pr" style="left:800px;top:84px;background:var(--ink);color:#fff">Hydrocarbons</div>` + PN.map(([n, s, , , c], i) => `<div class="tn" id="pn${i}" style="left:${NX[i]}px;top:${NY - 30}px;color:${c}">${n}</div><div class="tg2" id="pg${i}" style="left:${NX[i]}px;top:${NY + 44}px;color:${C.mute}">${s}</div>`).join('')
  + `<div class="tg2" id="pb0" style="left:200px;top:500px;color:${NH}">SATURATED</div><div class="tg2" id="pb1" style="left:680px;top:500px;color:${GC}">UNSATURATED</div><div class="tg2" id="pb2" style="left:1260px;top:500px;color:${OO}">RINGS</div>`;
const tPn = PN.map(r => wt(r[2], r[3]));
const pLines = NX.map(x => mk(ps, 'path', { d: `M800 144 V180 H${x} V${NY - 30}`, stroke: C.dim, 'stroke-width': 3, fill: 'none' }));
const pBr = [mk(ps, 'path', { d: 'M120 480 H280', stroke: NH, 'stroke-width': 3 }), mk(ps, 'path', { d: 'M440 480 H920', stroke: GC, 'stroke-width': 3 }), mk(ps, 'path', { d: 'M1040 480 H1480', stroke: OO, 'stroke-width': 3 })];
// mini structures
const mini = []; const MY = 400;
{ const g = mk(ps, 'g', {}); bond(g, 170, MY, 230, MY); Cat(g, 170, MY, 'C'); Cat(g, 230, MY, 'C'); mini.push(g); }
{ const g = mk(ps, 'g', {}); bond(g, 490, MY - 6, 550, MY - 6); bond(g, 490, MY + 6, 550, MY + 6); Cat(g, 490, MY, 'C'); Cat(g, 550, MY, 'C'); mini.push(g); }
{ const g = mk(ps, 'g', {}); [-9, 0, 9].forEach(d => bond(g, 810, MY + d, 870, MY + d, 4)); Cat(g, 810, MY, 'C'); Cat(g, 870, MY, 'C'); mini.push(g); }
{ const g = mk(ps, 'g', {}); const P3 = [[1120, MY - 34], [1084, MY + 26], [1156, MY + 26]]; [[0, 1], [1, 2], [2, 0]].forEach(([a, c]) => bond(g, P3[a][0], P3[a][1], P3[c][0], P3[c][1])); P3.forEach(([x, y]) => Cat(g, x, y, 'C')); mini.push(g); }
{ const g = mk(ps, 'g', {}); const R = 46, P6 = Array.from({ length: 6 }, (_, i) => [1400 + R * Math.cos(Math.PI / 6 + i * Math.PI / 3), MY + R * Math.sin(Math.PI / 6 + i * Math.PI / 3)]); P6.forEach((p, i) => { const q = P6[(i + 1) % 6]; bond(g, p[0], p[1], q[0], q[1], 4); }); mk(g, 'circle', { cx: 1400, cy: MY, r: 24, fill: 'none', stroke: C.ink2, 'stroke-width': 3 }); mini.push(g); }

/* ---------- G: general formula ---------- */
const gs = $('#gS');
const chain = (n, y) => { const g = mk(gs, 'g', {}); const x0 = 392 - (n - 1) * 60; for (let i = 0; i < n - 1; i++) bond(g, x0 + i * 120, y, x0 + (i + 1) * 120, y); for (let i = 0; i < n; i++) { const x = x0 + i * 120; bond(g, x, y, x, y - 46, 4); bond(g, x, y, x, y + 46, 4); Hat(g, x, y - 50); Hat(g, x, y + 50); if (i === 0) { bond(g, x, y, x - 50, y, 4); Hat(g, x - 54, y); } if (i === n - 1) { bond(g, x, y, x + 50, y, 4); Hat(g, x + 54, y); } } for (let i = 0; i < n; i++) Cat(g, x0 + i * 120, y); return g; };
const gM = [chain(1, 130), chain(2, 290), chain(3, 450)];
const gN = [lab(gs, 60, 136, 'CH₄', HC, { 'font-size': 22, 'font-weight': 700 }), lab(gs, 60, 296, 'C₂H₆', HC, { 'font-size': 22, 'font-weight': 700 }), lab(gs, 60, 456, 'C₃H₈', HC, { 'font-size': 22, 'font-weight': 700 })];
$('#gE').innerHTML = K(`\\mathrm{C}_{${tc(NH, 'n')}}\\mathrm{H}_{2${tc(NH, 'n')}+2}`);
const GN = [['1', 'CH₄', 'Methane'], ['2', 'C₂H₆', 'Ethane'], ['3', 'C₃H₈', 'Propane']];
$('#gns').innerHTML = GN.map(([n, f, nm], i) => `<div class="rd" id="gn${i}" style="top:${210 + i * 88}px"><span class="ck">n = ${n}</span><span style="margin-left:40px;font:600 30px 'IBM Plex Mono'">${f}</span><span class="cv" style="color:${NH};font-size:28px">${nm}</span></div>`).join('');
const tGn = [wt('G2', 'Methane'), wt('G2', 'Ethane'), wt('G2', 'Propane')];

/* ---------- S: hydrogenation bench ---------- */
const b = $('#bS');
const C1x = 300, C2x = 480, CY = 230;
const sCC = bond(b, C1x, CY, C2x, CY), sCC2 = bond(b, C1x, CY + 14, C2x, CY + 14);
const sOldB = [bond(b, C1x, CY, C1x, 150, 4), bond(b, C1x, CY, 210, CY, 4), bond(b, C2x, CY, C2x, 150, 4), bond(b, C2x, CY, 570, CY, 4)];
const sNewB = [bond(b, C1x, CY, C1x, 312, 4), bond(b, C2x, CY, C2x, 312, 4)];
const sOldH = [Hat(b, C1x, 140), Hat(b, 200, CY), Hat(b, C2x, 140), Hat(b, 580, CY)];
const sC = [Cat(b, C1x, CY), Cat(b, C2x, CY)];
const sSurf = Array.from({ length: 13 }, (_, i) => mk(b, 'circle', { cx: 128 + i * 44, cy: 492, r: 20, fill: '#B9C0CA' }));
const sSl = lab(b, 392, 546, 'METAL CATALYST · Pt, Pd OR Ni', NA, { 'text-anchor': 'middle', 'font-size': 17 });
const sHb = bond(b, 0, 0, 0, 0, 4); const sH = [Hat(b, 0, 0, NH), Hat(b, 0, 0, NH)];
const RDS = [['C-C BOND', 'rd0', 96], ['HYDROGEN ATOMS', 'rd1', 180], ['MOLECULE', 'rd2', 264]];
$('#rds').innerHTML = RDS.map(([k, id, top]) => `<div class="rd" id="${id}" style="top:${top}px"><span class="ck">${k}</span><span class="cv"></span></div>`).join('');
$('#ebs').innerHTML = eqrow('eb0', 352, `\\mathrm{CH_2{=}CH_2} + ${tc(NH, '\\mathrm{H_2}')} \\xrightarrow{\\mathrm{Pt/Pd/Ni}} \\mathrm{CH_3{-}CH_3}`, 'ALKANE', NH)
  + `<div class="rowl" id="eb1" style="top:440px"><span>Pt, Pd</span><span class="tg" style="color:${OK}">ROOM TEMPERATURE</span></div><div class="rowl" id="eb2" style="top:512px;height:56px"><span>Ni</span><span class="tg" style="color:${GC}">MORE HEAT AND PRESSURE</span></div>`;
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- R: alkyl halides + Wurtz ---------- */
const rs = $('#rS');
const RY = 190;
const rM = [Cat(rs, 170, RY, 'CH₃'), Cat(rs, 614, RY, 'CH₃')], rB = [atom(rs, 280, RY, 28, BR, 'Br', 18), atom(rs, 504, RY, 28, BR, 'Br', 18)];
const rMB = [bond(rs, 170, RY, 280, RY), bond(rs, 504, RY, 614, RY)];
const rNa = [atom(rs, 280, 420, 26, NA, 'Na', 17), atom(rs, 504, 420, 26, NA, 'Na', 17)];
const rCC = bond(rs, 330, RY, 454, RY);
const rL = [lab(rs, 392, 110, '2 CH₃-Br + 2 Na · DRY ETHER', HC, { 'text-anchor': 'middle', 'font-size': 18 }), lab(rs, 392, 270, '', OK, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700 })];
const rZ = mk(rs, 'g', {}); bond(rZ, 300, 300, 450, 300); Cat(rZ, 300, 300, 'CH₃'); const rZx = atom(rZ, 450, 300, 30, BR, 'Cl', 18); const rZl = lab(rZ, 392, 400, 'CHLOROMETHANE', BR, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700 });
const rNb = [lab(rs, 280, 456, 'NaBr', BR, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700 }), lab(rs, 504, 456, 'NaBr', BR, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700 })];
$('#rrs').innerHTML = `<div class="rowl" id="rr0" style="top:84px"><span>Alkyl halide: one H swapped for X</span><span class="tg" style="color:${BR}">R-X</span></div>`
  + eqrow('rr1', 172, `\\mathrm{CH_3}${tc(BR, '\\mathrm{Cl}')} + \\mathrm{H_2} \\xrightarrow{\\mathrm{Zn,\\ H^+}} \\mathrm{CH_4} + \\mathrm{H}${tc(BR, '\\mathrm{Cl}')}`, 'NOT FOR F', RD)
  + eqrow('rr2', 268, `2\\mathrm{CH_3}${tc(BR, '\\mathrm{Br}')} + 2\\mathrm{Na} \\xrightarrow{\\text{dry ether}} \\mathrm{CH_3{-}CH_3} + 2\\mathrm{Na}${tc(BR, '\\mathrm{Br}')}`, 'WURTZ', NH)
  + `<div class="vt" id="rV" style="top:380px"><span>Carbons:</span><span style="color:${NH}">1 + 1 = 2</span></div><div class="pillp" id="rP" style="left:36px;top:490px">Wurtz doubles the carbon count</div>`;

/* ---------- D: decarboxylation + Kolbe ---------- */
const ds = $('#dS');
const dMe = tile(ds, 230, 180, 120, 'CH₃', NH), dCo = tile(ds, 380, 180, 150, 'COONa', GC), dOh = tile(ds, 600, 180, 130, 'NaOH', HC);
const dLink = bond(ds, 290, 180, 305, 180, 4);
const dCao = lab(ds, 600, 240, 'CaO, HEAT', NA, { 'text-anchor': 'middle', 'font-size': 16 });
const dP1 = tile(ds, 230, 330, 120, 'CH₄', NH), dP2 = tile(ds, 520, 290, 170, 'Na₂CO₃', GC);
const dCnt = lab(ds, 392, 390, '2 C IN → 1 C OUT', NH, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700 });
$('#des').innerHTML = eqrow('de0', 478, `${tc(NH, '\\mathrm{CH_3}')}${tc(GC, '\\mathrm{COONa}')} + \\mathrm{NaOH} \\xrightarrow{\\mathrm{CaO},\\ \\Delta} ${tc(NH, '\\mathrm{CH_4}')} + \\mathrm{Na_2CO_3}`, 'ONE C LESS', NH);
const ks = $('#kS');
const kLiq = mk(ks, 'rect', { x: 164, y: 200, width: 456, height: 216, fill: '#EAF2F8' });
mk(ks, 'path', { d: 'M160 150 V420 H624 V150', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
mk(ks, 'rect', { x: 250, y: 96, width: 20, height: 290, fill: '#9AA3AF' }); mk(ks, 'rect', { x: 514, y: 96, width: 20, height: 290, fill: '#9AA3AF' });
mk(ks, 'path', { d: 'M260 96 V70 H524 V96', stroke: C.ink2, 'stroke-width': 3, fill: 'none' });
const kBat = mk(ks, 'rect', { x: 370, y: 56, width: 44, height: 28, rx: 4, fill: '#fff', stroke: C.ink2, 'stroke-width': 3 });
const kLb = [lab(ks, 196, 130, '+ ANODE', EC, { 'font-size': 17, 'font-weight': 700 }), lab(ks, 546, 130, '− CATHODE', HC, { 'font-size': 17, 'font-weight': 700 })];
const kIon = Array.from({ length: 5 }, () => mk(ks, 'circle', { r: 8, fill: GC }));
const kE = Array.from({ length: 3 }, () => mk(ks, 'circle', { r: 7, fill: EC }));
const kBub = Array.from({ length: 4 }, () => mk(ks, 'circle', { r: 6, fill: 'none', stroke: C.ink2, 'stroke-width': 2 })), kBubH = Array.from({ length: 4 }, () => mk(ks, 'circle', { r: 5, fill: 'none', stroke: '#2F6FEB', 'stroke-width': 2 }));
const kT = [lab(ks, 300, 250, 'CO₂', C.mute, { 'font-size': 17 }), lab(ks, 300, 300, 'CH₃ + CH₃ → C₂H₆', NH, { 'font-size': 18, 'font-weight': 700 }), lab(ks, 546, 250, 'H₂', '#2F6FEB', { 'font-size': 17, 'font-weight': 700 }), lab(ks, 392, 456, 'NO METHANE THIS WAY', RD, { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700 })];
$('#kes').innerHTML = eqrow('ke0', 478, `2\\mathrm{CH_3}${tc(GC, '\\mathrm{COO^-}')} \\rightarrow \\mathrm{CH_3{-}CH_3} + 2\\mathrm{CO_2} + 2${tc(EC, '\\mathrm{e^-}')}`, 'AT THE ANODE', EC);

/* ---------- C: compare ---------- */
const ca = $('#caS'), cf = $('#cfS');
const cA = [ball(ca, 200, 250, NH, 30), ball(ca, 200, 250, NH, 30)], cA2 = [ball(ca, 520, 250, NH, 30), ball(ca, 600, 250, NH, 30)], cAb = bond(ca, 520, 250, 600, 250, 8);
const cAar = lab(ca, 360, 262, '→', C.mute, { 'text-anchor': 'middle', 'font-size': 44 }); const cAl = [lab(ca, 200, 320, 'CH₃Br', HC, { 'text-anchor': 'middle' }), lab(ca, 560, 320, 'C₂H₆', HC, { 'text-anchor': 'middle' })];
const cB = [ball(cf, 170, 250, NH, 30), ball(cf, 250, 250, GC, 30)], cBb = bond(cf, 170, 250, 250, 250, 8), cB2 = ball(cf, 560, 250, NH, 30);
const cBar = lab(cf, 392, 262, '→', C.mute, { 'text-anchor': 'middle', 'font-size': 44 }); const cBl = [lab(cf, 210, 320, 'CH₃COONa', HC, { 'text-anchor': 'middle' }), lab(cf, 560, 320, 'CH₄', HC, { 'text-anchor': 'middle' })];
$('#caV').innerHTML = `<span>1 C →</span><span style="color:${NH}">2 C · doubled</span>`;
$('#cfV').innerHTML = `<span>2 C →</span><span style="color:${GC}">1 C · one less</span>`;
const th1 = PUC.think($('#th1'), { q: 'You need methane. Wurtz, or decarboxylation?', opts: ['Wurtz', 'Decarboxylation'], right: 1, why: 'Sodium acetate loses one carbon. Wurtz and Kolbe join two pieces, so the smallest is ethane.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{add H: } n \\rightarrow n \\qquad \\text{Wurtz, Kolbe: } n + n \\qquad \\text{soda lime: } n - 1`);

/* ---------- W ---------- */
const WR = [['Propene + H₂', 'PROPANE'], ['Bromoethane, Wurtz', 'BUTANE'], ['Sodium propanoate + soda lime', 'ETHANE']];
$('#wrs2').innerHTML = WR.map(([s, tg], i) => `<div class="rowl" id="wq${i + 2}" style="top:${96 + i * 100}px;height:80px"><span>${s}</span><span class="tg" id="wt${i}" style="color:${NH};font-size:22px">${tg}</span></div>`).join('') + `<div class="pillp good" id="wP" style="left:36px;top:478px">Count carbons in, know carbons out</div>`;
const ws = $('#wS');
const WY = [150, 290, 430];
const wIn = [[0, 1, 2].map(i => ball(ws, 90 + i * 50, WY[0], NH, 18)), [0, 1].map(i => ball(ws, 90 + i * 50, WY[1] - 22, NH, 16)).concat([0, 1].map(i => ball(ws, 90 + i * 50, WY[1] + 22, NH, 16))), [0, 1, 2].map(i => ball(ws, 90 + i * 50, WY[2], i === 2 ? GC : NH, 18))];
const wAr = WY.map(y => lab(ws, 330, y + 12, '→', C.mute, { 'text-anchor': 'middle', 'font-size': 36 }));
const wOut = [[0, 1, 2].map(i => ball(ws, 420 + i * 50, WY[0], NH, 18)), [0, 1, 2, 3].map(i => ball(ws, 420 + i * 50, WY[1], NH, 18)), [0, 1].map(i => ball(ws, 420 + i * 50, WY[2], NH, 18))];
const wSum = [lab(ws, 680, WY[0] + 8, '3 → 3', HC, { 'font-size': 20, 'font-weight': 700 }), lab(ws, 680, WY[1] + 8, '2 + 2', HC, { 'font-size': 20, 'font-weight': 700 }), lab(ws, 680, WY[2] + 8, '3 − 1', HC, { 'font-size': 20, 'font-weight': 700 })];
const wCo = lab(ws, 190, WY[2] + 52, 'COO LEAVES', GC, { 'font-size': 15, 'font-weight': 700 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K('\\mathrm{CH_3Br} + \\mathrm{C_2H_5Br}')} by Wurtz gives only propane`, right: 'It gives ethane, propane and butane, mixed' });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 100, 'CH₃ + CH₃ → ethane', { 'font-size': 24, fill: HC, 'font-weight': 700 }), tq2 = txt(tsv, 40, 150, 'CH₃ + C₂H₅ → propane', { 'font-size': 24, fill: NH, 'font-weight': 700 }), tq3 = txt(tsv, 40, 200, 'C₂H₅ + C₂H₅ → butane', { 'font-size': 24, fill: HC, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Name the reaction and its product, or the alkane a method cannot make' });
const OPT = ['\\text{Butane}', '\\text{Propane}', '\\text{Ethane}', '\\text{Hexane}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'An aqueous solution of sodium propanoate (CH₃CH₂COONa) is electrolysed by Kolbe\'s method. The hydrocarbon formed at the anode is:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{CH_3CH_2}${tc(GC, '\\mathrm{COO^-}')} - ${tc(EC, '\\mathrm{e^-}')} - \\mathrm{CO_2}`)], [K(`\\rightarrow \\mathrm{C_2H_5}\\ (2\\ \\text{C})`)], [K(`\\mathrm{C_2H_5} + \\mathrm{C_2H_5} = ${tc(OK, '\\mathrm{C_4H_{10}}')}`)], ['C: soda lime · D: kept CO₂']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'ethyl'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Alkanes', y0: 96, dy: 74, txt: [1, 0, 1, 1, 1],
  lines: ['<b>Hydrocarbons</b>: saturated (alkanes) · unsaturated (alkenes, alkynes) · aromatic', K(`\\text{Alkanes: } \\mathrm{C}_n\\mathrm{H}_{2n+2} \\qquad \\mathrm{CH_4},\\ \\mathrm{C_2H_6},\\ \\mathrm{C_3H_8}`), '<b>Add H₂</b> (Pt, Pd, Ni) to alkenes and alkynes · <b>R-X</b> + Zn, HCl → R-H', '<b>Wurtz</b>: 2 R-X + 2 Na → R-R, carbons double (not methane)', '<b>Soda lime</b>: RCOONa → R-H, one C less · <b>Kolbe</b>: R-R, never methane'] });
const YQ = ['What is the general formula of alkanes?', 'Which method gives one carbon less than the acid?', "Why can Kolbe's method never make methane?"];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 90', topic: 'Chlorine meets methane in sunlight? Properties of alkanes', y: 764 });
const avA = PUC.avatar($('#sR'), { x: 160 + 350, y: 270 + 506, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Two pieces snap together!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T1('S5') + 0.2, 1, 960, 540]]);
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
    const tB = [wt('H2', 'carbon'), wt('H2', 'carbon') + 0.25, wt('H2', 'hydrogen')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', NH, u)); jb.style.color = mix(NH, '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'two') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'build') - 0.15, 1e9, POP);
  }

  /* P: tree */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('G1');
    M.vis($('#pt'), t, tP1 + 0.05, out, { dy: 36, ...o });
    M.vis($('#pr'), t, tP1 + 0.3, 1e9, POP);
    PN.forEach((_, i) => { M.vis($('#pn' + i), t, tPn[i] - 0.1, 1e9, POP); M.vis($('#pg' + i), t, tPn[i] + 0.2, 1e9, { dy: 10 }); fade(pLines[i], t, tPn[i] - 0.3); fade(mini[i], t, tPn[i] + 0.3); const on = M.io((t - tPn[i]) / 0.25) * (1 - M.io((t - (i < 4 ? tPn[i + 1] : T1('P4') + 0.3)) / 0.25)); setBg($('#pn' + i), mix(C.soft, C.ac2, on)); });
    const tBk = [wt('P2', 'saturated'), wt('P3', 'unsaturated'), wt('P4', 'ring')];
    [0, 1, 2].forEach(i => { fade(pBr[i], t, tBk[i]); M.vis($('#pb' + i), t, tBk[i], 1e9, POP); });
  }

  /* G: formula */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('S1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dy: 36, ...o });
    gM.forEach((g, i) => { fade(g, t, tGn[i] - 0.3); fade(gN[i], t, tGn[i]); });
    M.vis($('#gb'), t, tG1 + 0.2, z, { dx: 60, dy: 0, ...o });
    PUC.write($('#gE'), t, wt('G1', 'C'), 1.2);
    GN.forEach((_, i) => M.vis($('#gn' + i), t, tGn[i] - 0.1, 1e9, { dy: 16 }));
    M.vis($('#gP'), t, wt('G3', 'paraffins') - 0.1, 1e9, POP);
  }

  /* S: hydrogenation */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('R1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tIn = wt('S2', 'Hydrogen'), tCat = wt('S2', 'catalyst'), tSplit = wt('S3', 'splits'), tUp = wt('S4', 'opens'), tJoin = wt('S4', 'joins');
    [sCC, ...sOldB, ...sOldH, ...sC].forEach(e => fade(e, t, tS1 + 0.4));
    const dbl = 1 - M.io((t - tUp) / 0.6); sCC2.style.opacity = dbl; M.hide(sCC2, t < tS1 + 0.4 || dbl <= 0.01); fade(sCC2, t, tS1 + 0.4, tUp + 0.3);
    attr(sCC, 'y1', CY + 7 * dbl); attr(sCC, 'y2', CY + 7 * dbl); attr(sCC2, 'y1', CY + 14); attr(sCC2, 'y2', CY + 14);
    attr(sCC, 'y1', (CY - 7 * dbl).toFixed(1)); attr(sCC, 'y2', (CY - 7 * dbl).toFixed(1)); attr(sCC2, 'y1', (CY + 7).toFixed(1)); attr(sCC2, 'y2', (CY + 7).toFixed(1));
    sSurf.forEach((e, i) => fade(e, t, wt('S2', 'metal') - 0.2 + i * 0.03)); fade(sSl, t, wt('S2', 'metal'));
    const dn = M.io((t - tIn) / 1.4), sp = M.io((t - tSplit) / 0.8), up = M.io((t - tJoin + 0.4) / 1.0);
    const yH = M.lerp(60, 448, dn), xs = [M.lerp(372, C1x, sp), M.lerp(412, C2x, sp)];
    const pos = [[xs[0], M.lerp(yH, 324, up)], [xs[1], M.lerp(yH, 324, up)]];
    sH.forEach((g, i) => { place(g, pos[i][0], pos[i][1]); fade(g, t, tIn - 0.3); });
    attr(sHb, 'x1', pos[0][0]); attr(sHb, 'y1', pos[0][1]); attr(sHb, 'x2', pos[1][0]); attr(sHb, 'y2', pos[1][1]); fade(sHb, t, tIn - 0.3, tSplit + 0.1);
    sNewB.forEach(e => fade(e, t, tJoin + 0.5));
    const TAG = [[tS1 + 0.3, 'ETHENE · C=C'], [tCat, 'H₂ MEETS THE METAL'], [tSplit, 'H-H SPLITS'], [tUp, 'C=C OPENS'], [T0('S5'), 'ETHANE · ALL SINGLE']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, T0('S2') - 0.3, z, { dx: 60, dy: 0, ...o });
    const done = t > tJoin + 0.5;
    const RV = [t > tUp + 0.3 ? 'SINGLE' : 'DOUBLE', done ? '6' : '4', t > T0('S5') ? 'ETHANE' : 'ETHENE'];
    RV.forEach((s, i) => { const el = $('#rd' + i); M.vis(el, t, T0('S2') + i * 0.15, 1e9, { dy: 16 }); const cv = el.querySelector('.cv'); M.setT(cv, s); cv.style.color = (i === 0 ? t > tUp + 0.3 : i === 1 ? done : t > T0('S5')) ? NH : HC; });
    M.vis($('#eb0'), t, T0('S5') - 0.1, 1e9, { dy: 16 }); M.vis($('#eb1'), t, wt('S5', 'Platinum') - 0.1, 1e9, { dy: 16 }); M.vis($('#eb2'), t, wt('S5', 'Nickel') - 0.1, 1e9, { dy: 16 });
  }

  /* R: Wurtz */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('D1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dy: 36, ...o });
    { const tSw = wt('R2', 'replaced'); fade(rZ, t, tR1 + 0.4, T0('R3') - 0.3); const u2 = M.io((t - tSw) / 0.6); fillC(rZx.firstChild, mix(BR, NH, u2)); M.setT(rZx._t, u2 > 0.5 ? 'H' : 'Cl'); M.setT(rZl, u2 > 0.5 ? 'METHANE' : 'CHLOROMETHANE'); attr(rZl, 'fill', u2 > 0.5 ? NH : BR); }
    const tW = wt('R3', 'Wurtz'), tPull = wt('R4', 'pulls'), tJ = wt('R4', 'join');
    fade(rL[0], t, wt('R3', 'bromomethane'));
    [...rM, ...rB, ...rMB].forEach(e => fade(e, t, tW));
    const u = M.io((t - tPull) / 1.0), v = M.io((t - tJ + 0.3) / 0.8);
    rNa.forEach((g, i) => { fade(g, t, wt('R3', 'sodium') - 0.1); place(g, [280, 504][i], M.lerp(420, RY + 70, u) + v * 0); });
    rB.forEach((g, i) => place(g, [280, 504][i], M.lerp(RY, RY, u) + (t > tPull + 0.8 ? M.io((t - tPull - 0.8) / 0.8) * 140 : 0)));
    rNa.forEach((g, i) => { if (t > tPull + 0.8) place(g, [280, 504][i], RY + 70 + M.io((t - tPull - 0.8) / 0.8) * 140); });
    rMB.forEach(e => fade(e, t, tW, tPull + 0.6));
    place(rM[0], M.lerp(170, 330, v), RY); place(rM[1], M.lerp(614, 454, v), RY); fade(rCC, t, tJ + 0.4);
    rNb.forEach(e => fade(e, t, tPull + 1.6));
    M.setT(rL[1], 'ETHANE · CH₃-CH₃'); fade(rL[1], t, wt('R4', 'Ethane'));
    M.vis($('#rb'), t, tR1 + 0.05, z, { dx: 60, dy: 0, ...o });
    rowsOn(['#rr0', '#rr1', '#rr2'], [tR1 + 0.3, wt('R2', 'zinc'), tW], T1('R4') + 0.3, t);
    M.vis($('#rV'), t, wt('R4', 'count') - 0.1, 1e9, { dy: 16 }); M.vis($('#rP'), t, wt('R4', 'doubles') - 0.1, 1e9, POP);
    avA(t, wt('R4', 'join') + 0.6, z);
  }

  /* D: decarboxylation + Kolbe */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('C1');
    M.vis($('#da'), t, tD1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - T0('D3') + 0.3, M.HEAVY), w = sh >= 1 ? 784 : M.lerp(1600, 784, sh); snap($('#da'), 'width', w.toFixed(1) + 'px'); snap(ds, 'transform', `translateX(${((w - 784) / 2).toFixed(1)}px) scale(${(1 + 0.2 * (w - 784) / 816).toFixed(3)})`); snap($('#de0'), 'width', (w - 72).toFixed(1) + 'px'); }
    const tLv = wt('D2', 'leaves');
    fade(dMe, t, wt('D1', 'acetate')); fade(dCo, t, wt('D1', 'acetate')); fade(dLink, t, wt('D1', 'acetate'), tLv);
    fade(dOh, t, wt('D1', 'soda')); fade(dCao, t, wt('D1', 'calcium'), wt('D2', 'leaves'));
    const u = M.io((t - tLv) / 1.0);
    place(dCo, M.lerp(380, 520, u), M.lerp(180, 290, u)); place(dOh, M.lerp(600, 520, u), M.lerp(180, 290, u)); place(dMe, 230, M.lerp(180, 290, u));
    dCo.style.opacity = 1 - u; dOh.style.opacity = 1 - u; if (u >= 1) { M.hide(dCo, true); M.hide(dOh, true); }
    fade(dP2, t, tLv + 0.8); M.setT(dMe._t, t > wt('D2', 'Methane') ? 'CH₄' : 'CH₃'); fade(dP1, t, 1e9);
    fade(dCnt, t, wt('D2', 'less') - 0.2);
    M.vis($('#de0'), t, wt('D2', 'decarboxylation') - 0.2, 1e9, { dy: 16 });
    M.vis($('#db'), t, T0('D3') - 0.2, z, { dx: 60, dy: 0, ...o });
    const tEl = wt('D3', 'electricity'), tLose = wt('D4', 'loses'), tBrk = wt('D4', 'breaks'), tJn = wt('D5', 'join');
    kIon.forEach((e, i) => { const ph = ((t - tEl) / 2.4 + i / 5) % 1; attr(e, 'cx', (560 - ph * 280).toFixed(1)); attr(e, 'cy', (240 + i * 34).toFixed(1)); M.hide(e, t < tEl); });
    kE.forEach((e, i) => { const ph = ((t - tLose) / 1.5 + i / 3) % 1; attr(e, 'cx', 260); attr(e, 'cy', (360 - ph * 280).toFixed(1)); M.hide(e, t < tLose); });
    kBub.forEach((e, i) => { const ph = ((t - tBrk) / 1.3 + i / 4) % 1; attr(e, 'cx', 282 + (i % 2) * 8); attr(e, 'cy', (380 - ph * 170).toFixed(1)); M.hide(e, t < tBrk); });
    kBubH.forEach((e, i) => { const ph = ((t - tJn) / 1.1 + i / 4) % 1; attr(e, 'cx', 504 - (i % 2) * 8); attr(e, 'cy', (380 - ph * 170).toFixed(1)); M.hide(e, t < wt('D5', 'Hydrogen')); });
    fade(kT[0], t, tBrk); fade(kT[1], t, tJn); fade(kT[2], t, wt('D5', 'Hydrogen')); fade(kT[3], t, wt('D5', 'never') - 0.2);
    kLb.forEach(e => fade(e, t, T0('D4') - 0.2));
    M.vis($('#ke0'), t, tJn + 0.4, 1e9, { dy: 16 });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    fade(cA[0], t, wt('C1', 'bromomethane')); M.hide(cA[1], true); fade(cAl[0], t, wt('C1', 'bromomethane'));
    [cAar].forEach(e => fade(e, t, wt('C1', 'One'))); [...cA2, cAb, cAl[1]].forEach(e => fade(e, t, wt('C1', 'two')));
    M.vis($('#caV'), t, wt('C1', 'Doubled') - 0.1, 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    [...cB, cBb, cBl[0]].forEach(e => fade(e, t, T0('C2'))); [cBar, cB2, cBl[1]].forEach(e => fade(e, t, wt('C2', 'one')));
    M.vis($('#cfV'), t, wt('C2', 'less') - 0.1, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Wurtz') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Wurtz') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Count') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'out') - 0.4, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const tq = [T0('W2') + 0.1, T0('W2') + 0.4, T0('W2') + 0.7], ti = [T0('W3'), T0('W4'), T0('W5')];
    [0, 1, 2].forEach(i => { M.vis($('#wq' + (i + 2)), t, tq[i] - 0.1, 1e9, { dy: 16 }); M.vis($('#wt' + i), t, T1('W' + (i + 3)) - 0.8, 1e9, POP); const on = M.io((t - ti[i]) / 0.25) * (1 - M.io((t - (i < 2 ? ti[i + 1] : T1('W5') + 0.3)) / 0.25)); setBg($('#wq' + (i + 2)), mix(C.soft, C.ac2, on)); });
    M.vis($('#wP'), t, T1('W5'), 1e9, POP);
    M.vis($('#wr'), t, T0('W3') - 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(i => { wIn[i].forEach(e => fade(e, t, ti[i] + 0.1)); fade(wAr[i], t, ti[i] + 0.6); wOut[i].forEach((e, j) => fade(e, t, ti[i] + 0.9 + j * 0.12)); fade(wSum[i], t, ti[i] + 1.3); });
    fade(wCo, t, ti[2] + 0.9); fillC(wIn[2][2], mix(GC, '#D7DCE3', M.io((t - ti[2] - 0.9) / 0.5)));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'bromomethane') - 0.2, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'ethane') - 0.3 });
    fade(tq1, t, wt('X3', 'Methyl')); fade(tq2, t, wt('X3', 'Methyl', 1) + 0.2); fade(tq3, t, wt('X3', 'ethyl', 1));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Butane') - 0.1, tCount, tAns });
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
