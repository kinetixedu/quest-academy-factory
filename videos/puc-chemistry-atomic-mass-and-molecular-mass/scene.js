// PUC Chemistry Ep 08: Atomic mass and molecular mass (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: C teal (the standard, element in play), H ink, O violet, the unit u gold, moving electron orange,
// Cl-35 teal and Cl-37 dark teal, Na slate
const CC = C.ac, HC = C.ink, OC = '#7A4FE0', GC = '#B7791F', EC = '#C8461B', C37 = '#0B6B6B', NAC = '#5B6478';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, C_ = s => tc(CC, `\\mathrm{${s}}`), H_ = s => tc(HC, `\\mathrm{${s}}`), O_ = s => tc(OC, `\\mathrm{${s}}`), U = tc(GC, '\\text{u}');
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };

Object.assign(M.IC, {
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  orb: ['M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tI1 = T0('I1'), tB1 = T0('B1'), tI4 = T0('I4'), tT = T0('T1'), tM1 = T0('M1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tM1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['scale', 'Kitchen scale', 'GRAMS', 'kitchen'], ['gem', 'Jeweller', 'MILLIGRAMS', 'jeweller'], ['orb', 'One atom', '? GRAMS', 'atom']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const RW = [['scale', 'Kitchen scale', 'WEIGHS IN GRAMS (g)'], ['gem', 'Jeweller\'s scale', 'WEIGHS IN MILLIGRAMS (mg)'], ['orb', 'One hydrogen atom', '1.67 × 10⁻²⁴ g · FAR TOO SMALL']];
$('#jrs').innerHTML = RW.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tRw = [tMorph + 0.3, tMorph + 0.45, wt('H2', 'mass') - 0.1];

/* ---------- P: why a new unit ---------- */
$('#zN').innerHTML = `<span class="d">0.</span><span class="z">${'0'.repeat(23)}</span><span class="d">16736</span> g`;
const ks = $('#kS');
mk(ks, 'rect', { x: 152, y: 296, width: 480, height: 22, rx: 8, fill: C.dim });
mk(ks, 'rect', { x: 182, y: 318, width: 420, height: 150, rx: 18, fill: C.soft, stroke: C.ink, 'stroke-width': 3 });
mk(ks, 'rect', { x: 282, y: 360, width: 220, height: 66, rx: 10, fill: C.ink });
const kRead = txt(ks, 392, 405, '0.000 g', { 'text-anchor': 'middle', 'font-size': 36, fill: C.ac2, 'font-weight': 600 });
const kAt = mk(ks, 'circle', { r: 5, fill: HC, cx: 392 });
const kCall = mk(ks, 'g', {}); mk(kCall, 'line', { x1: 398, y1: 288, x2: 540, y2: 196, stroke: C.ink2, 'stroke-width': 2, 'stroke-dasharray': '6 6' }); mk(kCall, 'circle', { cx: 580, cy: 160, r: 62, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
{ const g = atomG(kCall, 36, HC, 'H', 32); attr(g, 'transform', 'translate(580 160)'); }
txt(kCall, 580, 254, 'ONE H ATOM', { 'text-anchor': 'middle', 'font-size': 16, fill: HC, 'font-weight': 600 });
const kTag = document.createElement('div'); kTag.className = 'btag'; kTag.style.cssText = 'left:36px;top:500px;background:var(--redBg);color:var(--red)'; kTag.textContent = 'SCALE STILL READS 0.000 g'; $('#ps').appendChild(kTag);

/* ---------- S: the u scale ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const CX = 260, CY = 250, CR = 120;
const cAt = mk(bW, 'g', {}); mk(cAt, 'circle', { cx: CX, cy: CY, r: CR, fill: CC });
const cLab = txt(bW, CX, CY + CR + 44, 'CARBON-12', { 'text-anchor': 'middle', 'font-size': 22, fill: CC, 'font-weight': 600 });
const spokes = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; return mk(cAt, 'line', { x1: CX, y1: CY, x2: CX + CR * Math.cos(a), y2: CY + CR * Math.sin(a), stroke: '#fff', 'stroke-width': 3 }); });
const a0 = -Math.PI / 2, a1 = a0 + Math.PI / 6;
const wedge = mk(bW, 'path', { d: `M0 0 L${(CR * Math.cos(a0)).toFixed(1)} ${(CR * Math.sin(a0)).toFixed(1)} A${CR} ${CR} 0 0 1 ${(CR * Math.cos(a1)).toFixed(1)} ${(CR * Math.sin(a1)).toFixed(1)} Z`, fill: GC, stroke: '#fff', 'stroke-width': 3 });
const wLab = txt(bW, 0, 0, '1 u', { 'text-anchor': 'middle', 'font-size': 30, fill: GC, 'font-weight': 600 });
const wFr = txt(bW, 600, 330, '1/12 OF C-12', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
// balance
const bal = mk(bW, 'g', {}), PVX = 392, PVY = 170, BL = 220;
mk(bal, 'path', { d: `M${PVX} ${PVY} L${PVX - 44} 430 H${PVX + 44} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const beam = mk(bal, 'g', {}); mk(beam, 'rect', { x: -BL, y: -7, width: BL * 2, height: 14, rx: 7, fill: C.ink });
const pans = [0, 1].map(() => { const g = mk(bal, 'g', {}); mk(g, 'line', { x1: -80, y1: 120, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'line', { x1: 80, y1: 120, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'path', { d: 'M-100 120 H100 C100 144 64 154 0 154 C-64 154 -100 144 -100 120Z', fill: '#E9E5DA', stroke: C.ink, 'stroke-width': 2.5 }); return g; });
mk(bal, 'circle', { cx: PVX, cy: PVY, r: 10, fill: C.ac });
const bH = atomG(pans[0], 26, HC, 'H', 24), bO = atomG(pans[0], 38, OC, 'O', 32);
const BLK = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) BLK.push([(c - 1.5) * 36, 118 - r * 26]);
const blocks = BLK.map(() => { const g = mk(pans[1], 'g', {}); mk(g, 'rect', { x: -16, y: -24, width: 32, height: 24, rx: 5, fill: GC }); txt(g, 0, -6, 'u', { 'text-anchor': 'middle', 'font-size': 16, fill: '#fff', 'font-weight': 600 }); return g; });
const bRd = txt(bal, PVX - BL, 112, '', { 'text-anchor': 'middle', 'font-size': 24, fill: HC, 'font-weight': 600 }), bRn = txt(bal, PVX + BL, 112, '', { 'text-anchor': 'middle', 'font-size': 24, fill: GC, 'font-weight': 600 });
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#uDef').innerHTML = K(`1\\,${U} = \\tfrac{1}{12} \\times \\text{mass of one } ^{12}${C_('C')} \\text{ atom}`);
const UR = [['C', CC, 'Carbon-12 · the standard', '12 u'], ['H', HC, 'Hydrogen', '1.008 u'], ['O', OC, 'Oxygen-16', '15.995 u']];
$('#urs').innerHTML = UR.map(([e, c, n, v], i) => `<div class="ur" id="ur${i}" style="top:${212 + i * 104}px"><div class="el" style="background:${c}">${e}</div><div class="un">${n}</div><div class="uv" style="color:${c}">${v}</div></div>`).join('');
const tS2 = T0('S2'), tSplit = wt('S2', 'Split'), tPart = wt('S2', 'One'), tS3 = T0('S3'), tS4 = T0('S4'), tS5 = T0('S5');
const tHbal = wt('S4', 'balances'), tO16 = wt('S5', 'oxygen'), tObal = wt('S5', 'balances'), tOv = wt('S5', 'Fifteen');

/* ---------- D: derivation ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`1\\,${U} = 1.66056 \\times 10^{-24}\\,\\text{g}`)],
  [K(`m_{${H_('H')}} = 1.6736 \\times 10^{-24}\\,\\text{g}`)],
  [K(`\\text{mass in u} = m_{${H_('H')}} \\div 1\\,${U}`)],
  [K(`= 1.0078\\,${U} \\approx 1.008\\,${U}`)]], { label: 'STEP BY STEP', y0: 110, dy: 104 });
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
$('#frc').innerHTML = `<div class="fr" id="fN" style="top:130px;font:600 48px 'IBM Plex Mono';color:${HC}">1.6736 <span class="cx" style="position:relative">× 10⁻²⁴ g<i class="sk2" style="left:-4px;top:48%"></i></span></div>
  <div style="position:absolute;left:96px;top:214px;width:592px;height:5px;border-radius:3px;background:${C.ink}" id="fBar"></div>
  <div class="fr" id="fD" style="top:240px;font:600 48px 'IBM Plex Mono';color:${GC}">1.66056 <span class="cx" style="position:relative">× 10⁻²⁴ g<i class="sk2" style="left:-4px;top:48%"></i></span></div>
  <div class="fr" id="fR" style="top:360px;font:600 60px 'IBM Plex Mono';color:${C.ac}">= 1.0078 u</div>
  <div class="fr" id="fRn" style="top:450px;font:500 24px Poppins;color:var(--mute)">a small number we can use</div>`;
const skF = [...document.querySelectorAll('#frc .sk2')];

/* ---------- I: isotopes ---------- */
const is = $('#iS');
const iso = [[200, 160, 64, CC, 'Cl-35 · 34.97 u'], [560, 160, 68, C37, 'Cl-37 · 36.97 u']].map(([x, y, r, f, l]) => { const g = mk(is, 'g', {}); const a = atomG(g, r, f, 'Cl', 44); attr(a, 'transform', `translate(${x} ${y})`); txt(g, x, y + r + 34, l, { 'text-anchor': 'middle', 'font-size': 20, fill: f, 'font-weight': 600 }); return g; });
const rng = M.rng(7), ORD = Array.from({ length: 200 }, (_, i) => i); for (let i = 199; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [ORD[i], ORD[j]] = [ORD[j], ORD[i]]; }
const heavy = new Set(ORD.slice(0, 49).map(k => (k * 37) % 200));
const dots = Array.from({ length: 200 }, (_, i) => mk(is, 'circle', { cx: 80 + (i % 25) * 26, cy: 310 + Math.floor(i / 25) * 26, r: 10, fill: heavy.has(i) ? C37 : CC }));
const hvN = [...heavy].length;
const ns = $('#nS'), NX = v => 100 + (v - 34.97) / 2 * 584;
mk(ns, 'line', { x1: 100, y1: 200, x2: 684, y2: 200, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const nEnds = [[34.97, CC, '34.97'], [36.97, C37, '36.97']].map(([v, c, l]) => { const g = mk(ns, 'g', {}); mk(g, 'circle', { cx: NX(v), cy: 200, r: 12, fill: c }); txt(g, NX(v), 160, l, { 'text-anchor': 'middle', 'font-size': 24, fill: c, 'font-weight': 600 }); return g; });
const nMid = mk(ns, 'g', {}); mk(nMid, 'line', { x1: NX(35.97), y1: 186, x2: NX(35.97), y2: 214, stroke: C.dim, 'stroke-width': 3 }); txt(nMid, NX(35.97), 160, '35.97 MIDDLE', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 });
const mark = mk(ns, 'g', {}); mk(mark, 'path', { d: 'M0 214 L-14 240 H14 Z', fill: GC }); const mkT = txt(mark, 0, 270, '', { 'text-anchor': 'middle', 'font-size': 24, fill: GC, 'font-weight': 600 });
const tug = mk(ns, 'path', { d: '', stroke: CC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
$('#ir').insertAdjacentHTML('beforeend', `<div class="pillp" id="sh0" style="left:36px;top:300px;color:${CC}">Cl-35 · 75.5%</div><div class="pillp" id="sh1" style="right:36px;top:300px;color:${C37}">Cl-37 · 24.5%</div>`);
$('#avC').innerHTML = K(`34.97 \\times ${tc(CC, '0.755')} + 36.97 \\times ${tc(C37, '0.245')} = ${tc(GC, '35.46\\,\\text{u}')}`);
const th1 = PUC.think($('#th1'), { q: `Is chlorine's average atomic mass closer to 35 or to 37?`, opts: ['Closer to 35', 'Closer to 37'], right: 0, why: '75.5% of chlorine atoms are Cl-35, so they pull the average toward 35.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`1\\,${U} = \\tfrac{1}{12} \\times \\text{mass of } ^{12}${C_('C')} = 1.66056 \\times 10^{-24}\\,\\text{g}`);

/* ---------- M: methane ---------- */
const msv = $('#mS'), MX = 392, MY = 230;
const mBL = mk(msv, 'g', {}), mAL = mk(msv, 'g', {}), mDL = mk(msv, 'g', {});
const MA = { C: { g: atomG(mAL, 44, CC, 'C', 36), r: 44 } };
const HP = [[MX, MY - 120], [MX - 130, MY], [MX + 130, MY], [MX, MY + 120]], HS0 = [[MX, 70], [90, MY], [694, MY], [MX, 420]];
HP.forEach((_, i) => { MA['H' + i] = { g: atomG(mAL, 28, HC, 'H', 24), r: 28 }; });
attr(MA.C.g, 'transform', `translate(${MX} ${MY})`);
const mBonds = HP.map((_, i) => ({ a: 'C', c: 'H' + i, n: 1, ln: [mk(mBL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })], dt: [mk(mDL, 'circle', { r: 6, fill: EC }), mk(mDL, 'circle', { r: 6, fill: EC })] }));
const drawBond = (bd, P, AA, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = AA[bd.a].r - 6, r2 = AA[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k, sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
$('#mSum').innerHTML = K(`${C_('C')}${H_('H')}_4 = 12.011 + 4 \\times 1.008 = 16.043\\,${U}`);
const AR = (el, c, n, sub) => `<div class="ar2" id="${el}"><div class="el" style="background:${c}">${el.split('_')[1]}</div><div class="cnt">${n} ATOM${n > 1 ? 'S' : ''}</div><div class="dts">${('<b style="background:' + c + '"></b>').repeat(n)}</div><div class="sv" style="color:${c}">${sub}</div></div>`;
$('#mrows').innerHTML = [AR('m_C', CC, 1, '12.011 u'), AR('m_H', HC, 4, '4.032 u')].join('');
$('#m_C').style.top = '230px'; $('#m_H').style.top = '370px';
const tM2 = T0('M2'), tMH = wt('M2', 'four');

/* ---------- W: glucose ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`6 \\times ${tc(CC, '12.011')} = 72.066\\,${U}`)],
  [K(`12 \\times ${tc(HC, '1.008')} = 12.096\\,${U}`)],
  [K(`6 \\times ${tc(OC, '16')} = 96\\,${U}`)],
  [K(`72.066 + 12.096 + 96 = ${tc(C.ac, '180.162')}\\,${U}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 88 });
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
$('#wrows').innerHTML = [AR('w_C', CC, 6, '72.066 u'), AR('w_H', HC, 12, '12.096 u'), AR('w_O', OC, 6, '96 u')].join('');
['w_C', 'w_H', 'w_O'].forEach((id, i) => { $('#' + id).style.top = (76 + i * 130) + 'px'; });
const tWr = [wt('W2', 'Carbon'), wt('W2', 'hydrogen', 1), wt('W2', 'oxygen')];

/* ---------- C: NaCl ---------- */
const cs = $('#cS'), NAX = 210, CLX = 574, AY = 250, SH = [38, 62, 86];
const ring = (x, r) => mk(cs, 'circle', { cx: x, cy: AY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
const naR = SH.map(r => ring(NAX, r)), clR = SH.map(r => ring(CLX, r));
const nuc = (x, f, l) => { const g = atomG(cs, 24, f, l, 18); attr(g, 'transform', `translate(${x} ${AY})`); return g; };
nuc(NAX, NAC, 'Na'); nuc(CLX, CC, 'Cl');
const eOn = (x, r, n, off = 0) => Array.from({ length: n }, (_, i) => { const a = off + i / n * Math.PI * 2; return mk(cs, 'circle', { cx: x + r * Math.cos(a), cy: AY + r * Math.sin(a), r: 7, fill: HC }); });
eOn(NAX, 38, 2, Math.PI / 2); eOn(NAX, 62, 8, Math.PI / 8); eOn(CLX, 38, 2, Math.PI / 2); eOn(CLX, 62, 8, Math.PI / 8);
const clO = Array.from({ length: 7 }, (_, i) => { const a = Math.PI + (i + 1) / 8 * Math.PI * 2; return mk(cs, 'circle', { cx: CLX + 86 * Math.cos(a), cy: AY + 86 * Math.sin(a), r: 7, fill: HC }); });
const eMove = mk(cs, 'circle', { r: 9, fill: EC });
const cfg = [txt(cs, NAX, 120, 'Na  2, 8, 1', { 'text-anchor': 'middle', 'font-size': 22, fill: NAC, 'font-weight': 600 }), txt(cs, CLX, 120, 'Cl  2, 8, 7', { 'text-anchor': 'middle', 'font-size': 22, fill: CC, 'font-weight': 600 })];
const ion = [txt(cs, NAX, 400, 'Na⁺  2, 8', { 'text-anchor': 'middle', 'font-size': 26, fill: NAC, 'font-weight': 700 }), txt(cs, CLX, 400, 'Cl⁻  2, 8, 8', { 'text-anchor': 'middle', 'font-size': 26, fill: CC, 'font-weight': 700 })];
const ctag = document.createElement('div'); ctag.className = 'btag'; ctag.style.cssText = 'right:36px;top:18px;background:#FBEDE6;color:#C8461B'; ctag.textContent = 'ONE ELECTRON MOVES'; $('#cl').appendChild(ctag);
const xs = $('#xS'), LX0 = 200, LY0 = 112, LS = 64, latt = [];
for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const na = (r + c) % 2 === 0, g = mk(xs, 'g', {}); mk(g, 'circle', { cx: LX0 + c * LS, cy: LY0 + r * LS, r: na ? 17 : 26, fill: na ? NAC : CC }); txt(g, LX0 + c * LS, LY0 + r * LS + 6, na ? '+' : '−', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: '#fff' }); latt.push({ g, r, c }); }
const hiRing = mk(xs, 'circle', { cx: LX0 + 3 * LS, cy: LY0 + 2 * LS, r: 96, fill: 'none', stroke: EC, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const fuBox = mk(xs, 'rect', { x: LX0 + 1 * LS - 30, y: LY0 + 4 * LS - 34, width: LS + 64, height: 68, rx: 16, fill: 'none', stroke: GC, 'stroke-width': 4 });
const xTag = txt(xs, 392, 446, '6 Cl⁻ AROUND EACH Na⁺ · IN 3D', { 'text-anchor': 'middle', 'font-size': 20, fill: EC, 'font-weight': 600 });
const fuT = txt(xs, 392, 446, '1 FORMULA UNIT', { 'text-anchor': 'middle', 'font-size': 18, fill: GC, 'font-weight': 600 });
$('#fmB').innerHTML = K(`\\mathrm{${tc(NAC, 'Na')}${tc(CC, 'Cl')}} = 23.0 + 35.5 = 58.5\\,${U}`);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${H_('H')}_2${O_('O')} = 1.008 + 16.00 = 17.008\\,\\text{u}`), right: K(`${H_('H')}_2${O_('O')} = 2 \\times 1.008 + 16.00 = 18.02\\,\\text{u}`) });
const tsv = $('#tS');
const w1 = mk(tsv, 'g', {}); { const o = atomG(w1, 32, OC, 'O', 26); attr(o, 'transform', 'translate(150 120)'); const h = atomG(w1, 22, HC, 'H', 18); attr(h, 'transform', 'translate(90 170)'); }
const xW1 = mk(tsv, 'path', { d: 'M70 70 L220 200 M220 70 L70 200', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const w2 = mk(tsv, 'g', {}); { const o = atomG(w2, 32, OC, 'O', 26); attr(o, 'transform', 'translate(420 110)'); [[358, 160], [482, 160]].forEach(([x, y]) => { const h = atomG(w2, 22, HC, 'H', 18); attr(h, 'transform', `translate(${x} ${y})`); }); txt(w2, 420, 228, 'TWO H ATOMS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 }); }
const where = PUC.where($('#wa'), { on: [], type: 'Step one of mole numericals; average atomic mass from isotope shares' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'An element has isotopes of mass 10 u and 11 u, present as 20% and 80%. Its average atomic mass is', qW: 780,
  opts: ['10.2 u', '10.5 u', '10.8 u', '21 u'], right: 2, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`10 \\times 0.2 = 2`)], [K(`11 \\times 0.8 = 8.8`)], [K(`2 + 8.8 = \\textcolor{${C.ok}}{10.8\\,\\text{u}}`)], ['B: plain average ✗']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'B')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · atomic mass and molecular mass', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`1\\,${U} = \\tfrac{1}{12}\\,m(^{12}${C_('C')}) = 1.66056 \\times 10^{-24}\\,\\text{g}`), '<b>Average atomic mass</b>: each isotope mass × its share, added · Cl = 35.5 u', '<b>Molecular mass</b>: add every atom · CH₄ = 16.043 u, glucose = 180.162 u', '<b>Ionic compounds</b>: formula mass · NaCl = 58.5 u', '<b>Count every atom</b>: H₂O = 2 × 1.008 + 16.00 = 18.02 u'] });
const YQ = ['What is one u, in your own words?', 'Why is the atomic mass of chlorine not a whole number?', 'Find the molecular mass of carbon dioxide.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 09', topic: 'How many molecules in one sip of water? Mole Concept and Molar Mass', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
let geo = null;
function measure() {
  geo = {};
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const av = $('#avC'); if (av.offsetWidth > 712) av.style.fontSize = Math.floor(34 * 712 / av.offsetWidth) + 'px';
  const ud = $('#uDef .katex'); if (ud && ud.offsetWidth > 670) $('#uDef').style.fontSize = Math.floor(34 * 670 / ud.offsetWidth) + 'px';
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

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
    RW.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tRw[i], 1e9, { dy: 16 }); setBg(el, mix(C.soft, i === 2 ? C.redBg : C.soft, M.io((t - wt('H2', 'twenty')) / 0.3))); });
    M.vis($('#hjP'), t, wt('H4', 'new') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hTz'), t, wt('H3', 'never') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pz'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#zN'), t, wt('P2', 'decimal') - 0.1, Math.max(0.6, wt('P2', 'one') - wt('P2', 'decimal') + 0.4));
    M.vis($('#zC'), t, wt('P2', 'zeros') - 0.1, 1e9, POP); M.setT($('#zC'), '23 ZEROS AFTER THE POINT');
    M.vis($('#zSc'), t, T0('P3') - 0.05, 1e9, { dy: 14 }); M.vis($('#zSn'), t, T0('P3') + 0.3, 1e9, { dy: 10 });
    M.vis($('#zP'), t, wt('P3', 'compare') - 0.1, 1e9, POP);
    M.vis($('#ps'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const dr = M.clamp((t - wt('P2', 'Write')) / 0.6); attr(kAt, 'cy', (120 + 170 * M.i3(dr)).toFixed(1)); M.hide(kAt, t < wt('P2', 'Write'));
    fade(kCall, t, wt('P2', 'Write') + 0.6); fade(kTag, t, wt('P2', 'grams') - 0.1, 1e9, 0.3);
    const fl = M.io((t - wt('P2', 'Write') - 0.6) / 0.15) * (1 - M.io((t - wt('P2', 'Write') - 0.9) / 0.3)); attr(kRead, 'fill', mix(C.ac2, '#FFFFFF', fl));
  }

  /* S: the u scale */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#ul'), t, tS1 + 0.6, z, { dx: 60, dy: 0, ...o });
    M.vis($('#uDef'), t, tPart + 0.4, 1e9, { dy: 12 });
    [tS1 + 0.9, wt('S4', 'about'), tOv].forEach((tt, i) => { const el = $('#ur' + i); M.vis(el, t, tt - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.3) * (1 - M.io((t - tt - 1.6) / 0.5)))); });
    // the carbon atom, cut into twelve, one part leaves as 1 u
    const cOut = M.io((t - tS4 + 0.1) / 0.3), cIn = M.io((t - tS1 - 0.4) / 0.35);
    cAt.style.opacity = (cIn * (1 - cOut)).toFixed(3); M.hide(cAt, cIn * (1 - cOut) <= 0.002); cLab.style.opacity = cAt.style.opacity; M.hide(cLab, cIn * (1 - cOut) <= 0.002);
    spokes.forEach((s, i) => M.drawU(s, M.io((t - tSplit - i * 0.06) / 0.25)));
    const wu = M.io((t - tPart) / 0.8), wx = M.lerp(CX, 560, wu), wy = M.lerp(CY, 230, wu), wv = M.clamp((t - tPart + 0.1) / 0.1) * (1 - cOut);
    attr(wedge, 'transform', `translate(${wx.toFixed(1)} ${wy.toFixed(1)}) scale(${M.lerp(1, 1.25, wu).toFixed(3)})`); wedge.style.opacity = wv.toFixed(3); M.hide(wedge, wv <= 0.002);
    attr(wLab, 'x', (wx + 40).toFixed(1)); attr(wLab, 'y', (wy + 60).toFixed(1)); fade(wLab, t, tPart + 0.6, tS4 - 0.1, 0.25); fade(wFr, t, tS3 + 0.2, tS4 - 0.1, 0.25);
    // balance: H vs 1 u, then O vs 16 u
    const bIn = fade(bal, t, tS4 + 0.1, 1e9, 0.3);
    if (bIn > 0) {
      const oPh = t >= tO16 - 0.2;
      fade(bH, t, tS4 + 0.1, tO16 - 0.2, 0.2); fade(bO, t, tO16 - 0.1, 1e9, 0.2); attr(bH, 'transform', 'translate(0 94)'); attr(bO, 'transform', 'translate(0 82)');
      const tDrop = i => !oPh ? (i === 0 ? tS4 + 0.3 : 1e9) : M.lerp(tO16 + 0.1, tObal - 0.1, i / 15);
      let landed = 0;
      blocks.forEach((g, i) => { const td = tDrop(i), u = M.clamp((t - td) / 0.3), [sx, sy] = BLK[i]; attr(g, 'transform', `translate(${sx} ${(sy - 150 * (1 - M.i3(u))).toFixed(1)})`); g.style.opacity = M.clamp((t - td) / 0.08).toFixed(3); M.hide(g, t < td); landed += M.i3(u); });
      // H (1.008) vs 1 u: tips a hair to the H side. O (15.995) vs n u
      const an = !oPh ? M.lerp(-8, -1.2, M.io((t - tS4 - 0.4) / 0.6)) : M.lerp(-11, 0.4, landed / 16), r = an * Math.PI / 180;
      attr(beam, 'transform', `translate(${PVX} ${PVY}) rotate(${an.toFixed(2)})`);
      pans.forEach((p, i) => { const s = i ? 1 : -1, x = PVX + s * BL * Math.cos(r), y = PVY + s * BL * Math.sin(r); attr(p, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); });
      const n = blocks.reduce((a, _, i) => a + (t >= tDrop(i) + 0.3 ? 1 : 0), 0);
      M.setT(bRd, oPh ? 'O-16' : 'H'); attr(bRd, 'fill', oPh ? OC : HC); M.setT(bRn, `${n} u`);
    }
    const TAG = [[tS1 + 0.4, 'THE STANDARD · C-12'], [tSplit, '12 EQUAL PARTS'], [tPart, 'ONE PART = 1 u'], [tS4 + 0.2, 'H VS 1 u'], [tHbal, 'H ≈ 1.008 u'], [tO16, 'O-16 VS u BLOCKS'], [tOv, 'O-16 = 15.995 u']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.4, 1e9, POP);
    M.vis($('#ptL'), t, tS1 + 0.4, 1e9, { dy: 8 }); M.vis($('#ptS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    [['C', wt('S1', 'carbon'), CC], ['H', tS4, HC], ['O', tO16, OC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tI1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('I1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#fD'), t, wt('D2', 'One') - 0.1, 0.7); M.vis($('#fBar'), t, wt('D2', 'One') + 0.3, 1e9, { dy: 0 }); PUC.write($('#fN'), t, wt('D3', 'One') - 0.1, 0.7);
    skF.forEach((s, i) => { const u = M.io((t - wt('D4', 'cancel') - i * 0.15) / 0.35); s.style.width = `calc(${(u * 100).toFixed(1)}% + 8px)`; M.hide(s, u <= 0); });
    M.vis($('#fR'), t, wt('D5', 'leaves') - 0.1, 1e9, POP); M.vis($('#fRn'), t, wt('D5', 'u') + 0.2, 1e9, { dy: 8 });
  }

  /* I: isotopes + think */
  const iOn = t >= tI1 - 0.1 && t < tT + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const ph1 = t < tI4 - 0.45, a = ph1 ? tI1 + 0.05 : tI4 + 0.05, z = ph1 ? OUT('B1') : OUT('T1');
    M.vis($('#il'), t, a, z, { dx: -60, dy: 0, ...o }); M.vis($('#ir'), t, ph1 ? T0('I2') - 0.1 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    fade(iso[0], t, wt('I1', 'Chlorine') - 0.1); fade(iso[1], t, wt('I1', 'kinds') - 0.1);
    const tg0 = T0('I3'), tg1 = T1('I3');
    dots.forEach((d, i) => { const k = ORD.indexOf(i), td = M.lerp(tg0, tg1, k / 199); d.style.opacity = M.clamp((t - td) / 0.15).toFixed(3); M.hide(d, t < td); });
    M.setT($('#isoN'), '151 OF 200 ARE Cl-35 · 49 ARE Cl-37'); M.vis($('#isoN'), t, tg1 - 0.2, 1e9, { dy: 8 }); $('#isoN').style.color = C.ink;
    nEnds.forEach((g, i) => fade(g, t, i ? wt('I2', 'seven') : wt('I2', 'five'))); fade(nMid, t, wt('I3', 'lighter'));
    const mu = M.io((t - wt('I4', 'add') - 0.2) / 1.6), mv = M.lerp(35.97, 35.46, mu), mx = NX(mv);
    attr(mark, 'transform', `translate(${mx.toFixed(1)} 0)`); fade(mark, t, tI4 + 0.2); M.setT(mkT, mv.toFixed(2) + ' u');
    attr(tug, 'd', `M${(mx - 20).toFixed(1)} 280 H${Math.max(NX(34.97) + 20, mx - 20 - 120 * mu).toFixed(1)}`); fade(tug, t, wt('I4', 'add'), 1e9, 0.2);
    M.vis($('#sh0'), t, wt('I3', 'seventy') - 0.1, 1e9, POP); M.vis($('#sh1'), t, wt('I3', 'twenty') - 0.1, 1e9, POP);
    PUC.write($('#avC'), t, wt('I4', 'Multiply') - 0.1, 1.2); M.vis($('#avP'), t, wt('I5', 'about') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tB1 + 0.05, OUT('I4'), { dy: 36, ...o });
    th1(t, { tin: tB1, tOpts: wt('B1', 'closer') - 0.1, tCount: T1('B1') + 0.05, dur: 3, tAns: T0('B2') - 0.02, tWhy: wt('B2', 'Most') });
  }

  /* statement */
  const stOn = t >= tT && t < tM1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tM1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Atoms') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'They') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'twelve') + 0.3, 0.8);
  }

  /* M: methane */
  const mOn = t >= tM1 - 0.1 && t < tW1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('W1');
    M.vis($('#ml'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#mr'), t, tM1 + 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#mDef'), t, wt('M1', 'Molecular') - 0.1, 1.0);
    const P = { C: [MX, MY] };
    fade(MA.C.g, t, tM1 + 0.6, 1e9, 0.3);
    HP.forEach((hp, i) => { const u = M.io((t - tMH - i * 0.15) / 0.7); P['H' + i] = [M.lerp(HS0[i][0], hp[0], u), M.lerp(HS0[i][1], hp[1], u)]; attr(MA['H' + i].g, 'transform', `translate(${P['H' + i][0].toFixed(1)} ${P['H' + i][1].toFixed(1)})`); fade(MA['H' + i].g, t, wt('M2', 'hydrogens') - 0.3 + i * 0.05, 1e9, 0.3);
      const bu = M.io((t - tMH - 0.6 - i * 0.15) / 0.4); drawBond(mBonds[i], P, MA, bu, bu); });
    PUC.write($('#mSum'), t, wt('M2', 'Twelve') - 0.1, 1.2);
    M.vis($('#m_C'), t, wt('M2', 'carbon') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#m_H'), t, wt('M2', 'hydrogens') - 0.1, 1e9, { dx: -16, dy: 0 });
  }

  /* W: glucose */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    ['w_C', 'w_H', 'w_O'].forEach((id, i) => { const el = $('#' + id); M.vis(el, t, tWr[i] - 0.15, 1e9, { dx: -16, dy: 0 });
      [...el.querySelectorAll('.dts b')].forEach((d, k) => M.vis(d, t, tWr[i] + k * 0.05, 1e9, { ...POP, sc: 0.3 }));
      M.vis(el.querySelector('.sv'), t, tWs[i] + 0.3, 1e9, { dx: 12, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tWs[i]) / 0.3) * (1 - M.io((t - (tWs[i + 1] ?? 1e9)) / 0.3)))); });
    M.vis($('#wTot'), t, tWs[3] + 0.2, 1e9, { dy: 16 });
  }

  /* C: NaCl */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    cfg.forEach((c, i) => fade(c, t, wt('C1', i ? 'chlorine' : 'sodium') - 0.1, wt('C2', 'ions') - 0.2));
    const gv = wt('C2', 'gives'), u = M.io((t - gv) / 1.1), ang = Math.PI * (1 - u);
    // the electron leaves sodium's outer ring and lands in chlorine's outer ring
    const sx = NAX + 86 * Math.cos(-0.0001), ex = CLX - 86; attr(eMove, 'cx', M.lerp(sx, ex, u).toFixed(1)); attr(eMove, 'cy', (AY - 70 * Math.sin(Math.PI * u)).toFixed(1));
    fade(naR[2], t, tC1, gv + 1.0, 0.35); ion.forEach(e => fade(e, t, wt('C2', 'ions') - 0.1));
    M.vis(ctag, t, gv - 0.1, 1e9, POP);
    M.vis($('#cr'), t, wt('C3', 'pack') - 0.3, out, { dx: 60, dy: 0, ...o });
    latt.forEach(({ g, r, c }) => fade(g, t, wt('C3', 'pack') + (r * 7 + c) * 0.03));
    M.draw(hiRing, t, wt('C3', 'surrounded') - 0.1, 0.6); fade(xTag, t, wt('C3', 'six'), wt('C4', 'formula') - 0.1);
    M.drawU(fuBox, M.io((t - wt('C4', 'formula') + 0.1) / 0.5)); fade(fuT, t, wt('C4', 'formula') + 0.2);
    M.vis($('#fmB'), t, wt('C4', 'mass') - 0.1, 1e9, { dy: 12 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'count') - 0.1, tStrike: wt('X3', 'small') - 0.1, tRight: wt('X3', 'Two') - 0.1 });
    fade(w1, t, wt('X2', 'one') - 0.1); M.draw(xW1, t, wt('X3', 'small') - 0.1, 0.4); fade(w2, t, wt('X3', 'two') - 0.05);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
