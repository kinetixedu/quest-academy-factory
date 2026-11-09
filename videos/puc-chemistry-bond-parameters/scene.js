// PUC Chemistry Ep 43: Bond parameters (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: O violet, H ink, N teal, shared electrons orange, bond length (ruler) teal, angle gold, energy orange
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', OC = '#7A4FE0';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, m = s => `\\mathrm{${s}}`;
const O_ = tc(OC, m('O')), H_ = tc(HC, m('H')), N_ = tc(NC, m('N')), Lc = s => tc(NC, s), Ec = s => tc(EC, s);
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const tr = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };
Object.assign(M.IC, {
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
  chair: ['M7 18v3', 'M17 18v3', 'M5 11h14v7H5z', 'M7 11V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['magnet', 'Magnets', 'STOP AT ONE GAP', 'magnets', 'LENGTH'], ['chair', 'Folding chair', 'ONE FIXED ANGLE', 'folding', 'ANGLE'], ['link', 'Rope vs thread', 'HARDER TO SNAP', 'rope', 'STRENGTH']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['1 strap: wobbles', wt('H3', 'one'), C.redBg], ['3 straps: tight', wt('H3', 'three'), C.okBg], ['Atoms too?', wt('H4', 'atoms'), C.ac2]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- water helper ---------- */
const HA = 52.25 * Math.PI / 180;
const water = (p, cx, cy, d) => { const g = mk(p, 'g', {}), bl = mk(g, 'g', {}), al = mk(g, 'g', {});
  const hp = [-1, 1].map(s => [cx + s * d * Math.sin(HA), cy + d * Math.cos(HA)]);
  const st = hp.map(([x, y]) => mk(bl, 'line', { x1: cx, y1: cy, x2: x, y2: y, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
  const prs = hp.map(([x, y]) => [0, 1].map(k => mk(bl, 'circle', { r: 6.5, fill: EC })));
  const o = atomG(al, 46, OC, 'O', 32); tr(o, cx, cy);
  const h = hp.map(([x, y]) => { const a = atomG(al, 30, HC, 'H', 24); tr(a, x, y); return a; });
  const W = { g, st, h, hp, cx, cy, prs };
  W.place = (i, dx, dy) => { const [x, y] = hp[i]; tr(h[i], x + dx, y + dy); attr(st[i], 'x2', (x + dx * 0.4).toFixed(1)); attr(st[i], 'y2', (y + dy * 0.4).toFixed(1));
    const mx = (cx + x) / 2 + dx * 0.3, my = (cy + y) / 2 + dy * 0.3, ux = (x - cx) / d, uy = (y - cy) / d; prs[i].forEach((c, k) => { attr(c, 'cx', (mx - uy * (k ? 12 : -12)).toFixed(1)); attr(c, 'cy', (my + ux * (k ? 12 : -12)).toFixed(1)); }); };
  W.place(0, 0, 0); W.place(1, 0, 0); return W; };
const arcP = (cx, cy, r) => `M${cx - r * Math.sin(HA)} ${cy + r * Math.cos(HA)} A${r} ${r} 0 0 0 ${cx + r * Math.sin(HA)} ${cy + r * Math.cos(HA)}`;

/* ---------- P: four parameters on one water molecule ---------- */
$('#mdefI').innerHTML = M.icon('ruler', 28, '#fff', 2.2);
const QR = [['Bond length', 'DISTANCE', T0('P2')], ['Bond angle', 'ANGLE', T0('P3')], ['Bond enthalpy', 'ENERGY TO BREAK', T0('P4')], ['Bond order', 'NUMBER OF BONDS', T0('P5')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS'), pW = water(ps, 392, 170, 200);
const pR = mk(ps, 'g', {}); { const [x, y] = pW.hp[0], ux = (x - 392) / 200, uy = (y - 170) / 200, nx = -uy * 44, ny = ux * 44;
  mk(pR, 'line', { x1: 392 + nx, y1: 170 + ny, x2: x + nx, y2: y + ny, stroke: NC, 'stroke-width': 4 }); [[392, 170], [x, y]].forEach(([a, b2]) => mk(pR, 'line', { x1: a + nx * 0.7, y1: b2 + ny * 0.7, x2: a + nx * 1.3, y2: b2 + ny * 1.3, stroke: NC, 'stroke-width': 4 }));
  txt(pR, (392 + x) / 2 + nx * 1.9, (170 + y) / 2 + ny * 1.9 + 6, 'LENGTH', { 'text-anchor': 'middle', 'font-weight': 600, fill: NC }); }
const pArc = mk(ps, 'path', { d: arcP(392, 170, 90), fill: 'none', stroke: GC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pArcT = txt(ps, 392, 296, 'ANGLE', { 'text-anchor': 'middle', 'font-weight': 600, fill: GC });
const pEn = mk(ps, 'g', {}); mk(pEn, 'path', { d: 'M150 470 h120', stroke: EC, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' }); mk(pEn, 'path', { d: 'M256 458 l16 12 -16 12', stroke: EC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); txt(pEn, 36, 476, 'ENERGY IN', { 'font-weight': 600, fill: EC });
const pOrd = [0, 1].map(i => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = `left:${i ? 520 : 150}px;top:450px;background:var(--ink);color:#fff`; d.textContent = 'ORDER 1'; $('#pw').appendChild(d); return d; });

/* ---------- S: bench ---------- */
const b = $('#bS');
const di = (p, lab, col, r, fs, n) => { const g = mk(p, 'g', {}), bl = mk(g, 'g', {}), al = mk(g, 'g', {}), dl = mk(g, 'g', {});
  const st = Array.from({ length: 3 }, () => mk(bl, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
  const dt = Array.from({ length: 6 }, () => mk(dl, 'circle', { r: 6.5, fill: EC }));
  const a = [atomG(al, r, col, lab, fs), atomG(al, r, col, lab, fs)];
  return { g, st, dt, a, r, set(x1, x2, y, nb, eu = 1) { tr(a[0], x1, y); tr(a[1], x2, y); const mx = (x1 + x2) / 2;
    st.forEach((l, i) => { const on = i < Math.floor(nb) ? 1 : i < nb ? nb - Math.floor(nb) : 0, k = (i - (Math.ceil(nb) - 1) / 2) * 16; attr(l, 'x1', (x1 + r - 4).toFixed(1)); attr(l, 'x2', (x1 + r - 4 + (x2 - x1 - 2 * r + 8) * on).toFixed(1)); attr(l, 'y1', (y + k).toFixed(1)); attr(l, 'y2', (y + k).toFixed(1)); M.hide(l, on <= 0.01); });
    dt.forEach((d, j) => { const i = j >> 1, on = i < Math.ceil(nb) ? Math.min(1, (nb - i) * 2) * eu : 0, k = (i - (Math.ceil(nb) - 1) / 2) * 16; attr(d, 'cx', (mx + (j & 1 ? 9 : -9)).toFixed(1)); attr(d, 'cy', (y + k - 0).toFixed(1)); op(d, on); }); } }; };
// phase 1: O-O then O=O with a live ruler
const ph1 = mk(b, 'g', {});
const oo = di(ph1, 'O', OC, 46, 32);
const rul = mk(ph1, 'g', {}); const rL = mk(rul, 'line', { y1: 310, y2: 310, stroke: NC, 'stroke-width': 4 }); const rT = [0, 1].map(() => mk(rul, 'line', { y1: 296, y2: 324, stroke: NC, 'stroke-width': 4 }));
const rV = txt(rul, 392, 370, '', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 600, fill: NC });
const rG = [0, 1].map(() => mk(rul, 'line', { y1: 214, y2: 300, stroke: NC, 'stroke-width': 2, 'stroke-dasharray': '5 6' }));
const tSep = M.keys([[0, 148], [wt('S3', 'closer') - 0.2, 148], [wt('S3', 'closer') + 0.9, 121]], 0.9);
const tPair2 = wt('S3', 'second');
// phase 2: H2, O2, N2 with energy bars
const ph2 = mk(b, 'g', {});
const DI = [['H', HC, 30, 24, 1, 74, 435.8, wt('S5', 'Hydrogen')], ['O', OC, 40, 28, 2, 121, 498, wt('S6', 'Oxygen')], ['N', NC, 40, 28, 3, 109, 946, wt('S6', 'Nitrogen')]];
const dis = DI.map(([l, c, r, fs], i) => { const d = di(ph2, l, c, r, fs); const y = 140 + i * 120; const bar = mk(ph2, 'rect', { x: 470, y: y - 16, height: 32, rx: 8, fill: EC }); const bt = txt(ph2, 470, y + 6, '', { 'font-size': 20, 'font-weight': 600, fill: HC }); txt(ph2, 36, y + 6, `ORDER ${i + 1}`, { 'font-weight': 600 }); return { d, y, bar, bt }; });
const eLab = txt(ph2, 470, 84, 'ENERGY TO BREAK', { 'font-weight': 600, fill: EC });
const rulePill = document.createElement('div'); rulePill.className = 'pillp ac'; rulePill.style.cssText = 'left:36px;top:494px'; rulePill.innerHTML = 'Order ↑ · enthalpy ↑ · length ↓'; $('#bn').appendChild(rulePill);
// phase D: radii, vdW, angle
const phD = mk(b, 'g', {});
const hh = di(phD, 'H', HC, 30, 24);
const cR = [0, 1].map(() => mk(phD, 'circle', { r: 74, fill: 'none', stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '7 7' }));
const dRul = mk(phD, 'g', {}); mk(dRul, 'line', { x1: 318, x2: 466, y1: 280, y2: 280, stroke: NC, 'stroke-width': 4 }); [318, 392, 466].forEach(x => mk(dRul, 'line', { x1: x, x2: x, y1: 268, y2: 292, stroke: NC, 'stroke-width': 4 }));
const dV = txt(dRul, 392, 322, '74 pm', { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 600, fill: NC });
const dH = [355, 429].map(x => txt(dRul, x, 262, '37', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: NC }));
const vdw = mk(phD, 'g', {}); const vA = di(vdw, 'H', HC, 22, 18), vB = di(vdw, 'H', HC, 22, 18);
mk(vdw, 'line', { x1: 252, x2: 520, y1: 470, y2: 470, stroke: GC, 'stroke-width': 3, 'stroke-dasharray': '6 6' }); txt(vdw, 386, 500, 'TOUCHING, NOT BONDED · HALF = vdW RADIUS', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: GC });
const dW = water(phD, 392, 150, 200);
const dArc = mk(phD, 'path', { d: arcP(392, 150, 96), fill: 'none', stroke: GC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dArcT = txt(phD, 392, 290, '104.5°', { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 600, fill: GC });
const bentT = txt(phD, 392, 440, 'BENT, NOT STRAIGHT', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: HC });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// right cards
const rxA = PUC.solution($('#rxA'), [[K(`${O_}{-}${O_}: ${Lc('148\\ \\text{pm}')}`)], [K(`1\\ \\text{pm} = 10^{-12}\\ \\text{m}`)], [K(`${O_}{=}${O_}: ${Lc('121\\ \\text{pm}')}`)]], { label: 'THE RULER · OXYGEN', y0: 80, dy: 62 });
const tRA = [wt('S2', 'reads'), wt('S2', 'million'), T0('S4')];
const rxD = PUC.solution($('#rxD'), [[K(`r_{${H_}} = 74 / 2 = ${Lc('37\\ \\text{pm}')}`)], [K(`d_{\\mathrm{AB}} \\approx r_{\\mathrm{A}} + r_{\\mathrm{B}}`)], [K(`r_{\\text{vdW}} > r_{\\text{covalent}}`)]], { label: 'WHERE A LENGTH COMES FROM', y0: 80, dy: 62 });
const tRD = [wt('D3', 'Thirty'), T0('D4'), wt('D5', 'bigger')];
$('#crA').innerHTML = DI.map(([l], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 64}px"><div class="ce">${K(i === 0 ? `${H_}_2` : i === 1 ? `${O_}_2` : `${N_}_2`)}</div><div class="cn">bond order ${i + 1}</div><div class="cv" style="color:${EC}">${DI[i][6]}</div></div>`).join('');
const LND = [['Covalent radius: half of a bonded pair', NC, wt('D3', 'covalent')], ['van der Waals radius: half a touching gap', GC, wt('D5', 'van')]];
$('#lnD').innerHTML = LND.map(([s, c], i) => `<div class="ln" id="ld${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const ISO = [`${N_}_2`, `\\mathrm{CO}`, `\\mathrm{NO^+}`];
$('#crE').innerHTML = ISO.map((f, i) => `<div class="cr" id="ce${i}" style="top:${74 + i * 64}px"><div class="ce">${K(f)}</div><div class="cn">${['7 + 7', '6 + 8', '7 + 8 - 1'][i]} = 14 e⁻</div><div class="cv" style="color:var(--ac)">3</div></div>`).join('');
const tIso = [wt('D7', 'N'), wt('D7', 'C', 0), wt('D7', 'plus')];
const th1 = PUC.think($('#th1'), { q: 'Which is harder to break?', opts: ['O-O single bond', 'O=O double bond'], right: 1, why: 'Two shared pairs hold the atoms tighter and closer: 121 pm instead of 148 pm, and more energy to break.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{bond order} \\uparrow \\;\\Rightarrow\\; ${Ec('\\text{enthalpy}\\uparrow')},\\ ${Lc('\\text{length}\\downarrow')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`1^{\\text{st}}\\ ${O_}{-}${H_}: ${Ec('502')}\\ \\text{kJ mol}^{-1}`)],
  [K(`2^{\\text{nd}}\\ ${O_}{-}${H_}: ${Ec('427')}\\ \\text{kJ mol}^{-1}`)],
  [K(`502 + 427 = 929`)],
  [K(`929 \\div 2 = \\textcolor{${C.ok}}{464.5\\ \\text{kJ mol}^{-1}}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W2', 'first'), wt('W2', 'second'), wt('W4', 'nine'), wt('W5', 'Four')];
const s2 = $('#wS2'), wW = water(s2, 392, 130, 150);
const wE = [0, 1].map(i => txt(s2, 0, 0, i ? '427' : '502', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: EC }));
const BY = 520, BS = 0.36;
mk(s2, 'line', { x1: 150, x2: 640, y1: BY, y2: BY, stroke: C.ink, 'stroke-width': 3 });
const wb = [502, 427].map((v, i) => { const g = mk(s2, 'g', {}); const r = mk(g, 'rect', { x: 210 + i * 200, width: 120, rx: 8, fill: EC }); const tt = txt(g, 270 + i * 200, BY + 30, i ? '2nd · 427' : '1st · 502', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: HC }); return { g, r, v }; });
const avL = mk(s2, 'line', { x1: 180, x2: 600, y1: BY - 464.5 * BS, y2: BY - 464.5 * BS, stroke: C.ok, 'stroke-width': 4, 'stroke-dasharray': '10 8' });
const avT = txt(s2, 610, BY - 464.5 * BS + 7, '464.5', { 'font-size': 24, 'font-weight': 600, fill: C.ok });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'More bonds between two atoms make a longer bond', right: `More shared pairs pull closer: ${K(`${O_}{-}${O_}`)} 148 pm, ${K(`${O_}{=}${O_}`)} 121 pm` });
const tsv = $('#tS');
const tRu = [[148, 1, 70], [121, 2, 170]].map(([pm, n, y]) => { const g = mk(tsv, 'g', {}), d = di(g, 'O', OC, 22, 18); const w = pm * 1.3; d.set(270 - w / 2, 270 + w / 2, y, n); txt(g, 270 + w / 2 + 40, y + 7, `${pm} pm`, { 'font-size': 22, 'font-weight': 600, fill: NC }); return g; });
const where = PUC.where($('#wa'), { on: [], type: 'Arrange bonds by length or strength, and short numericals on average bond enthalpy' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `Average O-H bond enthalpy in water = 464.5 kJ mol⁻¹. Energy to break <b>every</b> O-H bond in 2 mol of water?`, qW: 760,
  opts: ['929 kJ', '1858 kJ', '2008 kJ', '464.5 kJ'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`2\\ \\text{mol}\\ \\mathrm{H_2O} \\to 4\\ \\text{mol}\\ \\mathrm{O{-}H}`)], [K(`4 \\times 464.5 = \\textcolor{${C.ok}}{1858\\ \\text{kJ}}`)], [K(`\\text{A: 1 mol only}`)], [K(`\\text{C: } 4 \\times 502 \\text{ (not equal)}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'C')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 500, title: 'Recap · bond parameters', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Length</b>: distance between nuclei · O-O 148 pm, O=O 121 pm', '<b>Radius</b>: H₂ is 74 pm, so r(H) = 37 pm · van der Waals radius is bigger', '<b>Angle</b>: H-O-H in water is 104.5° · average O-H enthalpy 464.5 kJ mol⁻¹', '<b>Enthalpy</b> (kJ mol⁻¹): H₂ 435.8 · O₂ 498 · N₂ 946', '<b>Order</b> ↑: enthalpy ↑, length ↓ · N₂, CO, NO⁺ all order 3'] });
const YQ = ['What is the bond order of N₂, and of CO?', 'Why is the O=O double bond shorter than the O-O single bond?', 'If H₂ is 74 pm long, what is the covalent radius of hydrogen?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 44', topic: 'Why are both bonds in ozone the same length? Resonance Structures', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tCl = wt('S3', 'closer');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tCl - 0.3, 1.08, 760, 560], [T0('S4') + 1.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['Gap', 'angle', 'strength'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Every') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'four') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    op(pW.g, M.clamp((t - tP1 - 0.6) / 0.3));
    fade(pR, t, wt('P2', 'distance') - 0.1); M.drawU(pArc, M.io((t - wt('P3', 'angle') + 0.1) / 0.6)); fade(pArcT, t, wt('P3', 'angle') + 0.3);
    const tE = wt('P4', 'energy'), lv = M.io((t - tE - 0.3) / 0.7) * (1 - M.io((t - T0('P5') + 0.5) / 0.6));
    pW.place(0, -150 * lv, 60 * lv); pW.st[0].style.opacity = (1 - lv).toFixed(3); pW.prs[0].forEach(c => { c.style.opacity = (1 - lv).toFixed(3); });
    fade(pEn, t, tE - 0.1, T0('P5') - 0.4);
    pOrd.forEach((d, i) => M.vis(d, t, wt('P5', 'order') + i * 0.15, 1e9, POP));
  }

  /* S + D: the bench */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const w1 = t < tD1 - 0.45, a = w1 ? tS1 + 0.05 : tD1 + 0.05, z = w1 ? OUT('B2') : OUT('T1');
    M.vis($('#bn'), t, a, z, { dy: 36, ...o });
    M.vis($('#rx'), t, w1 ? tS1 + 0.3 : a + 0.15, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, w1 ? tS5 - 0.2 : a + 0.25, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'single') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Two') });
    const p1 = w1 ? M.clamp((t - tS1 - 0.2) / 0.3) * (1 - M.io((t - tS5 + 0.4) / 0.3)) : 0, p2 = w1 ? M.io((t - tS5 + 0.2) / 0.3) : 0, pD = w1 ? 0 : 1;
    op(ph1, p1); op(ph2, p2); op(phD, pD);
    M.setT($('#bnL'), !w1 ? 'MOLECULE BENCH · RADIUS AND ANGLE' : t < tS5 - 0.2 ? 'MOLECULE BENCH · OXYGEN' : 'MOLECULE BENCH · ENERGY TO BREAK');
    if (p1 > 0) {
      const sep = tSep(t) * 2, x1 = 392 - sep / 2, x2 = 392 + sep / 2, nb = 1 + M.io((t - tPair2) / 0.5);
      oo.set(x1, x2, 200, nb);
      attr(rL, 'x1', x1); attr(rL, 'x2', x2); [x1, x2].forEach((x, i) => { attr(rT[i], 'x1', x); attr(rT[i], 'x2', x); attr(rG[i], 'x1', x); attr(rG[i], 'x2', x); });
      op(rul, M.io((t - wt('S2', 'ruler') + 0.1) / 0.3)); M.setT(rV, `${Math.round(tSep(t))} pm`);
    }
    if (p2 > 0) {
      dis.forEach(({ d, y, bar, bt }, i) => { const [, , , , n, pm, kj, tt] = DI[i], s = pm * 1.6; d.set(266 - s / 2, 266 + s / 2, y, n); op(d.g, M.io((t - tt + 0.3) / 0.3));
        const u = M.io((t - tt - 0.6) / 0.8); attr(bar, 'width', (Math.max(0.1, 0.27 * kj * u)).toFixed(1)); op(bar, u > 0 ? 1 : 0); attr(bt, 'x', (480 + 0.27 * kj * u).toFixed(1)); M.setT(bt, u > 0.95 ? String(kj) : ''); });
      op(eLab, M.io((t - DI[0][7] - 0.4) / 0.3)); M.vis(rulePill, t, T0('S7') - 0.1, 1e9, POP);
    } else M.hide(rulePill, true);
    if (pD > 0) {
      const tD2 = T0('D2'), tD5 = T0('D5'), tD6 = T0('D6');
      const g1 = M.io((t - tD2 + 0.2) / 0.3) * (1 - M.io((t - tD6 + 0.4) / 0.3)); op(hh.g, g1); op(dRul, g1);
      hh.set(318, 466, 180, 1); cR.forEach((c, i) => { attr(c, 'cx', i ? 466 : 318); attr(c, 'cy', 180); op(c, g1 * M.io((t - wt('D3', 'half')) / 0.4)); });
      dH.forEach(e => op(e, M.io((t - wt('D3', 'Thirty')) / 0.3)));
      const gv = M.io((t - tD5) / 0.4) * (1 - M.io((t - tD6 + 0.4) / 0.3)); op(vdw, gv); vA.set(156, 252, 420, 1); vB.set(520, 616, 420, 1);
      const gw = M.io((t - tD6 + 0.1) / 0.4); op(dW.g, gw); M.drawU(dArc, M.io((t - wt('D6', 'meet')) / 0.6)); op(dArcT, M.io((t - wt('D6', 'hundred')) / 0.3)); op(bentT, M.io((t - wt('D6', 'bent')) / 0.3));
    }
    const TAG = w1 ? [[wt('S1', 'one'), 'ORDER 1 · SINGLE'], [tPair2, 'ORDER 2 · DOUBLE'], [T0('S4'), 'SHORTER BY 27 pm'], [tS5, 'ENERGY TO BREAK'], [T0('S7'), 'ORDER ↑ · LENGTH ↓']]
      : [[T0('D2'), 'H₂ · 74 pm'], [wt('D3', 'covalent'), 'COVALENT RADIUS 37 pm'], [T0('D5'), 'vdW RADIUS · BIGGER'], [T0('D6'), 'BOND ANGLE 104.5°'], [T0('D7'), 'ISOELECTRONIC']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, TAG[0][0] - 0.1, 1e9, POP);
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD);
    M.vis($('#ctA'), t, tS5 - 0.2, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1, T0('D7') - 0.2, { dy: 0, outDur: 0.25, ody: 0 }); M.vis($('#ctE'), t, T0('D7') - 0.1, 1e9, { dy: 0 });
    DI.forEach(([, , , , , , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LND.forEach(([, , tt], i) => M.vis($('#ld' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    tIso.forEach((tt, i) => M.vis($('#ce' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Higher') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'shorter') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'bond', 1) + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1].forEach(i => { const u = M.io((t - tWs[i] - 0.2) / 0.8), s = i ? 1 : -1; wW.place(i, s * 170 * u, -40 * u); wW.st[i].style.opacity = (1 - u).toFixed(3); wW.prs[i].forEach(c => { c.style.opacity = (1 - u).toFixed(3); });
      const [x, y] = wW.hp[i]; attr(wE[i], 'x', (x + s * 110).toFixed(1)); attr(wE[i], 'y', (y + 30).toFixed(1)); op(wE[i], M.io((t - tWs[i] - 0.6) / 0.3));
      const bu = M.io((t - tWs[i] - 0.5) / 0.6), h = wb[i].v * BS * bu; attr(wb[i].r, 'y', (BY - h).toFixed(1)); attr(wb[i].r, 'height', Math.max(0.1, h).toFixed(1)); op(wb[i].g, bu > 0 ? 1 : 0); });
    const au = M.io((t - wt('W5', 'Four') + 0.1) / 0.5); op(avL, au); op(avT, au);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'other') - 0.1, tRight: wt('X3', 'More') - 0.1 });
    fade(tRu[0], t, wt('X3', 'single') - 0.2); fade(tRu[1], t, wt('X3', 'double') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Arrange') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
