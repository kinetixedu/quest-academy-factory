// PUC Chemistry Ep 83: Bond fission, nucleophiles and electrophiles (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: moving electrons e- orange (dots, curved arrows), carbocation carbon teal, C / CH3 ink, Br wine, Cl blue, O violet, H grey
const NC = C.ac, HC = C.ink, EC = '#C8461B', BR = '#8E3B46', CL = '#2F6FEB', OC = '#7A4FE0', HG = '#8A93A6', RD = C.red, OK = C.ok;
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const tr = (el, x, y, s = 1) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`);
const op = (el, u) => { el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); };
const L2 = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
const ball = (p, r, fill, lab, fs = 26) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const dot = (p, c = EC, r = 7) => mk(p, 'circle', { r, fill: c });
const sign = (p, s, c = HC, fs = 34) => txt(p, 0, 0, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: c, 'text-anchor': 'middle' });
const pos = (el, x, y) => { attr(el, 'cx', x.toFixed(1)); attr(el, 'cy', y.toFixed(1)); };
const at = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };
// curved electron arrow: draws on from the electrons (start) to where they go (end); half = fish hook (one barb)
const carrow = (p, x1, y1, x2, y2, bend, half = false, col = EC) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dl = Math.hypot(x2 - x1, y2 - y1), qx = mx + (-(y2 - y1) / dl) * bend, qy = my + ((x2 - x1) / dl) * bend;
  const g = mk(p, 'g', {}), pa = mk(g, 'path', { d: `M${x1} ${y1} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x2} ${y2}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const a = Math.atan2(y2 - qy, x2 - qx), hl = 16, b1 = [x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45)], b2 = [x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45)];
  const hd = mk(g, 'path', { d: half ? `M${x2} ${y2} L${b1[0].toFixed(1)} ${b1[1].toFixed(1)}` : `M${b1[0].toFixed(1)} ${b1[1].toFixed(1)} L${x2} ${y2} L${b2[0].toFixed(1)} ${b2[1].toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return { g, run(u, out = 0) { M.drawU(pa, u); op(hd, M.clamp((u - 0.9) / 0.1)); op(g, u > 0 ? 1 - out : 0); } };
};
Object.assign(M.IC, {
  candy: ['M9.5 7.5l-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z', 'M14 6.5v10', 'M10 7.5v10', 'm16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1', 'm8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1'],
  hand: ['M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2', 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2', 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  cookie: ['M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', 'M8.5 8.5v.01', 'M16 15.5v.01', 'M12 12v.01', 'M11 17v.01', 'M7 14v.01'],
  scissors: ['M6 3a3 3 0 1 0 0 6a3 3 0 1 0 0-6', 'M6 15a3 3 0 1 0 0 6a3 3 0 1 0 0-6', 'M20 4 8.12 15.88', 'M14.47 14.48 20 20', 'M8.12 8.12 12 12'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS7 = T0('S7'), tD1 = T0('D1'), tR1 = T0('R1'), tB2 = T0('B2'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['candy', 'Two sweets', 'ONE EACH', 'sweets', 'FAIR'], ['hand', 'Grab both', 'ONE TAKES ALL', 'grab', 'UNFAIR'], ['cookie', 'Snapped biscuit', 'EQUAL OR NOT', 'biscuit', 'SPLIT']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['Bond = shared pair', wt('H3', 'pair'), C.ac2], ['It breaks...', wt('H4', 'breaks'), C.redBg], ['Who keeps 2 e⁻?', wt('H4', 'keeps'), C.okBg]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: fair and unfair split ---------- */
$('#mdefI').innerHTML = M.icon('scissors', 28, '#fff', 2.2);
const QR = [['Bond fission', 'BREAKING A BOND', wt('P1', 'fission')], ['Homolytic', 'FAIR · 1 EACH', wt('P2', 'homolytic')], ['Free radical', 'ONE LONE e⁻', wt('P3', 'radical')], ['Heterolytic', 'UNFAIR · 2 TO 1', wt('P4', 'heterolytic')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS');
const row = (y, lab, col) => {
  const g = mk(ps, 'g', {}); txt(g, 36, y - 74, lab, { 'font-size': 18, 'font-weight': 600, fill: col });
  const bd = mk(g, 'line', { y1: y, y2: y, stroke: C.ink2, 'stroke-width': 6 }), A = ball(g, 44, HC, 'A', 28), B = ball(g, 44, HC, 'B', 28);
  const d = [dot(g), dot(g)], sA = sign(g, '', HC), sB = sign(g, '', HC);
  return { g, bd, A, B, d, sA, sB, y };
};
const R1 = row(200, 'HOMOLYTIC · ONE ELECTRON EACH', NC), R2 = row(430, 'HETEROLYTIC · ONE ATOM TAKES BOTH', OC);
const setRow = (R, u, fair) => {
  const ax = M.lerp(300, 220, u), bx = M.lerp(484, 564, u), y = R.y; tr(R.A, ax, y); tr(R.B, bx, y); L2(R.bd, ax, y, bx, y); op(R.bd, 1 - M.clamp(u * 3));
  const p0 = [[384, y - 14], [400, y - 14]], p1 = fair ? [[ax, y - 62], [bx, y - 62]] : [[bx - 9, y - 62], [bx + 9, y - 62]];
  R.d.forEach((c, i) => pos(c, M.lerp(p0[i][0], p1[i][0], u), M.lerp(p0[i][1], p1[i][1], u) - 40 * Math.sin(Math.PI * u)));
  M.setT(R.sA, fair ? '' : '+'); M.setT(R.sB, fair ? '' : '−'); at(R.sA, ax + 52, y - 34); at(R.sB, bx + 54, y - 34); op(R.sA, M.clamp((u - 0.8) * 5)); op(R.sB, M.clamp((u - 0.8) * 5));
};

/* ---------- S: bench ---------- */
const b = $('#bS');
// phase 1: (CH3)3C-Br heterolytic
const ph1 = mk(b, 'g', {});
const CX = 330, CY = 290;
const hB = mk(ph1, 'g', {}), hBd = [0, 1, 2].map(() => mk(hB, 'line', { stroke: C.ink2, 'stroke-width': 6 })), hBr = mk(hB, 'line', { stroke: C.ink2, 'stroke-width': 6 });
const hMe = [0, 1, 2].map(() => ball(ph1, 38, HC, 'CH₃', 20)), hC = ball(ph1, 44, HC, 'C', 30), hX = ball(ph1, 46, BR, 'Br', 26);
const hD = [dot(ph1), dot(ph1)], hCp = sign(ph1, '+', NC, 40), hBm = sign(ph1, '−', BR, 40);
const hArr = carrow(ph1, 420, 274, 488, 238, -40);
const hCir = mk(ph1, 'circle', { cx: CX, cy: CY, r: 58, fill: 'none', stroke: NC, 'stroke-width': 4, 'stroke-dasharray': '6 7' });
const hLab = txt(ph1, 392, 488, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: HC });
// phase 2: Cl-Cl homolytic in sunlight
const ph2 = mk(b, 'g', {});
const sun = mk(ph2, 'g', { transform: 'translate(150 150)' }); mk(sun, 'circle', { r: 22, fill: '#E0A800' }); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; mk(sun, 'line', { x1: 32 * Math.cos(a), y1: 32 * Math.sin(a), x2: 44 * Math.cos(a), y2: 44 * Math.sin(a), stroke: '#E0A800', 'stroke-width': 4, 'stroke-linecap': 'round' }); }
const cBd = mk(ph2, 'line', { stroke: C.ink2, 'stroke-width': 6 }), cA = ball(ph2, 46, CL, 'Cl', 28), cB = ball(ph2, 46, CL, 'Cl', 28), cD = [dot(ph2), dot(ph2)];
const cArL = carrow(ph2, 382, 274, 310, 238, 36, true), cArR = carrow(ph2, 402, 274, 474, 238, -36, true);
const cLab = txt(ph2, 392, 488, '', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: CL });
// phase 3: carbanion
const ph3 = mk(b, 'g', {});
const aBd = [[272, 370], [512, 370], [392, 430]].map(([x, y]) => mk(ph3, 'line', { x1: 392, y1: 290, x2: x, y2: y, stroke: C.ink2, 'stroke-width': 6 }));
[[272, 370], [512, 370], [392, 430]].forEach(([x, y]) => tr(ball(ph3, 38, HC, 'CH₃', 20), x, y));
tr(ball(ph3, 44, HC, 'C', 30), 392, 290); const aD = [dot(ph3), dot(ph3)]; pos(aD[0], 383, 226); pos(aD[1], 401, 226); const aM = sign(ph3, '−', EC, 40); at(aM, 446, 250);
const aLab = txt(ph3, 392, 150, 'LONE PAIR ON CARBON · 8 e⁻ · sp³', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: EC });
// phase D: carbocation ladder
const phD = mk(b, 'g', {});
const LX = [130, 270, 450, 640], LN = ['METHYL', 'PRIMARY', 'SECONDARY', 'TERTIARY'], LA = [-90, 150, 30];
const lad = LX.map((x, n) => {
  const g = mk(phD, 'g', {}), ar = [];
  for (let k = 0; k < n; k++) { const a = LA[k] * Math.PI / 180, bx = x + 72 * Math.cos(a), by = 250 + 72 * Math.sin(a); mk(g, 'line', { x1: x, y1: 250, x2: bx, y2: by, stroke: C.ink2, 'stroke-width': 5 }); tr(ball(g, 26, HC, 'CH₃', 15), bx, by); ar.push(carrow(g, bx + (x - bx) * 0.25 + 14 * Math.sin(a), by + (250 - by) * 0.25 - 14 * Math.cos(a), bx + (x - bx) * 0.62 + 14 * Math.sin(a), by + (250 - by) * 0.62 - 14 * Math.cos(a), 0)); }
  tr(ball(g, 28, NC, 'C', 22), x, 250); const sp = sign(g, '+', NC, 30); at(sp, x + 30, 222);
  txt(g, x, 360, LN[n], { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: HC }); txt(g, x, 384, `${n} CH₃`, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute });
  return { g, ar };
});
const stA = mk(phD, 'g', {}); mk(stA, 'line', { x1: 120, y1: 430, x2: 650, y2: 430, stroke: NC, 'stroke-width': 5 }); mk(stA, 'path', { d: 'M640 418 L664 430 L640 442', fill: 'none', stroke: NC, 'stroke-width': 5, 'stroke-linejoin': 'round' });
txt(stA, 392, 462, 'CARBOCATIONS AND RADICALS · MORE STABLE', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: NC });
const stB = mk(phD, 'g', {}); mk(stB, 'line', { x1: 134, y1: 500, x2: 664, y2: 500, stroke: EC, 'stroke-width': 5 }); mk(stB, 'path', { d: 'M144 488 L120 500 L144 512', fill: 'none', stroke: EC, 'stroke-width': 5, 'stroke-linejoin': 'round' });
txt(stB, 392, 532, 'CARBANIONS · ORDER FLIPS', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: EC });
// phase R: nucleophile meets electrophile
const phR = mk(b, 'g', {});
const nG = mk(phR, 'g', {}), nH = ball(nG, 26, HG, 'H', 20), nO = ball(nG, 44, OC, 'O', 30); tr(nH, -96, 0);
mk(nG, 'line', { x1: -70, y1: 0, x2: -44, y2: 0, stroke: C.ink2, 'stroke-width': 6 });
const nLp = [[-9, -60], [9, -60], [-9, 60], [9, 60]].map(([x, y]) => { const d = dot(nG); pos(d, x, y); return d; }); const nAt = [dot(nG), dot(nG)];
const nMi = sign(nG, '−', OC, 36); at(nMi, 40, -44);
const nBd = mk(phR, 'line', { stroke: C.ink2, 'stroke-width': 6 });
const eG = mk(phR, 'g', { transform: 'translate(560 290)' }); ball(eG, 48, NC, 'CH₃', 24); const ePl = sign(eG, '+', NC, 38); at(ePl, 50, -40);
const nLb = txt(phR, 220, 400, 'NUCLEOPHILE · GIVES', { 'text-anchor': 'middle', 'font-size': 19, 'font-weight': 600, fill: OC }), eLb = txt(phR, 560, 400, 'ELECTROPHILE · TAKES', { 'text-anchor': 'middle', 'font-size': 19, 'font-weight': 600, fill: NC });
const rArr = carrow(phR, 284, 290, 508, 264, -70);
const rLab = txt(phR, 392, 488, 'NEW BOND · CH₃OH', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: OK });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* right cards */
const E_ = s => tc(EC, s);
const rxA = PUC.solution($('#rxA'), [[K(`\\text{bond pair: } \\mathrm{C{-}Br}`)], [K(`\\mathrm{(CH_3)_3C{-}Br} \\to \\mathrm{(CH_3)_3}${tc(NC, '\\mathrm{C^+}')} + \\mathrm{Br^-}`)], [K(`\\mathrm{Cl{-}Cl} \\xrightarrow{\\text{light}} 2\\,\\mathrm{Cl}${E_('\\bullet')}`)], [K(`\\text{C keeps the pair} \\Rightarrow \\text{carbanion } \\mathrm{C^-}`)]], { label: 'BOND FISSION · ON THE BENCH', y0: 70, dy: 50 });
const tRA = [wt('S1', 'bromine'), wt('S3', 'bromide'), wt('S6', 'radicals'), wt('S7', 'carbanion')];
const rxD = PUC.solution($('#rxD'), [[K(`\\mathrm{CH_3} \\text{ pushes electrons in}`)], [K(`\\text{more } \\mathrm{CH_3} \\Rightarrow \\text{cation more stable}`)], [K(`3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^+}`)], [K(`\\text{carbanions: order flips}`)]], { label: 'STABILITY · STEP BY STEP', y0: 70, dy: 50 });
const tRD = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const rxG = PUC.solution($('#rxG'), [[K(`${tc(OC, '\\text{Nu}')}: \\mathrm{HO^-,\\ NC^-,\\ R_3C^-,\\ H_2O,\\ R_3N}`)], [K(`${tc(NC, '\\text{E}')}: \\mathrm{R_3C^+},\\ \\mathrm{{>}C{=}O},\\ \\mathrm{R{-}X} \\text{ carbon}`)], [K(`${tc(OC, '\\text{Nu}')} \\text{ gives the pair} \\to ${tc(NC, '\\text{E}')}`)]], { label: 'NUCLEOPHILES AND ELECTROPHILES', y0: 80, dy: 62 });
const tRG = [T0('R2'), T0('R4'), T0('R6')];
const CRA = [['Carbocation', '6 e⁻ · sp² · flat', '+', NC, wt('S4', 'carbocation')], ['Free radical', '7 e⁻ · one lone dot', '•', EC, wt('S6', 'radicals')], ['Carbanion', '8 e⁻ · sp³ · pyramid', '−', EC, wt('S7', 'carbanion')]];
$('#crA').innerHTML = CRA.map(([n, c, v, vc], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 64}px"><div class="ce" style="font:600 24px Poppins;top:13px">${n}</div><div class="cn" style="left:250px">${c}</div><div class="cv" style="color:${vc}">${v}</div></div>`).join('');
const PRD = [['Carbocations: 3° > 2° > 1° > methyl', 'SAME', NC, wt('D4', 'order')], ['Free radicals: 3° > 2° > 1° > methyl', 'SAME', NC, wt('D4', 'Free')], ['Carbanions: methyl > 1° > 2° > 3°', 'FLIPPED', EC, wt('D5', 'flips')]];
$('#prD').innerHTML = PRD.map(([s, k, c], i) => `<div class="pr" id="pd${i}" style="top:${74 + i * 60}px;height:48px"><div class="pa" style="top:11px">${s}</div><div class="pt" style="color:${c};top:13px">${k}</div></div>`).join('');
const LNG = [['Nucleophile: nucleus lover, has a pair to give', OC, T0('R1')], ['Electrophile: electron lover, needs a pair', NC, T0('R3')]];
$('#lnG').innerHTML = LNG.map(([s, c], i) => `<div class="ln" id="lg${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'A carbocation: plus charge, only six electrons. Nucleophile or electrophile?', opts: ['Nucleophile', 'Electrophile'], right: 1, why: 'It is short of a pair, so it looks for electrons. Nucleophiles attack it.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(OC, '\\mathrm{HO^-}')}\\ ${E_('\\curvearrowright')}\\ ${tc(NC, '\\mathrm{CH_3^+}')} \\;\\to\\; \\mathrm{CH_3OH}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{HO^-}: \\text{lone pairs, } - \\Rightarrow ${tc(OC, '\\text{Nu}')}`)],
  [K(`\\mathrm{H_2O}: \\text{2 lone pairs} \\Rightarrow ${tc(OC, '\\text{Nu}')}`)],
  [K(`\\mathrm{CH_3^+}: 6\\ \\text{e}^-, + \\Rightarrow ${tc(NC, '\\text{E}')}`)],
  [K(`\\mathrm{NC^-}: \\text{lone pair, } - \\Rightarrow ${tc(OC, '\\text{Nu}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'gives'), wt('W4', 'lone'), wt('W5', 'wants'), wt('W6', 'lone')];
const WP = [['Hydroxide ion', 'HO⁻ · LONE PAIRS', 'NUCLEOPHILE', OC, wt('W3', 'Nucleophile')], ['Water', 'H₂O · NO CHARGE', 'NUCLEOPHILE', OC, wt('W4', 'Nucleophile')], ['Methyl carbocation', 'CH₃⁺ · 6 ELECTRONS', 'ELECTROPHILE', NC, wt('W5', 'Electrophile')], ['Cyanide ion', 'NC⁻ · LONE PAIR', 'NUCLEOPHILE', OC, wt('W6', 'Nucleophile')]];
$('#wps').innerHTML = WP.map(([s, f, k, c], i) => `<div class="wp" id="wp${i}" style="top:${80 + i * 116}px"><div class="pa">${s}</div><div class="pf">${f}</div><div class="pt" id="wt${i}" style="color:${c}">${k}</div></div>`).join('');
const tWp = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Arrow from the plus carbon to the hydroxide ion', right: 'Arrow starts at electrons: from HO⁻ to the carbon' });
const tsv = $('#tS');
const mini = (y, ok) => { const g = mk(tsv, 'g', {}); tr(ball(g, 26, OC, 'O', 20), 120, y); tr(ball(g, 28, NC, 'C', 20), 400, y); const d = [dot(g, EC, 5), dot(g, EC, 5)]; pos(d[0], 147, y - 6); pos(d[1], 147, y + 6); const a = ok ? carrow(g, 156, y - 10, 372, y - 18, -40, false, OK) : carrow(g, 372, y - 18, 156, y - 10, 40, false, RD); txt(g, 470, y + 7, ok ? 'RIGHT' : 'WRONG', { 'font-size': 18, 'font-weight': 600, fill: ok ? OK : RD }); return { g, a }; };
const tWr = mini(100, false), tRt = mini(206, true);
const where = PUC.where($('#wa'), { on: [], type: 'Types of bond fission, stability order of carbocations, carbanions and free radicals, spot Nu and E' });
const opt = s => K(`\\mathrm{${s}}`);
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `Which order of carbocation stability is correct?`, qW: 760,
  opts: [opt('(CH_3)_2CH^+ < CH_3CH_2^+ < CH_3^+ < (CH_3)_3C^+'), opt('CH_3^+ < CH_3CH_2^+ < (CH_3)_2CH^+ < (CH_3)_3C^+'), opt('CH_3CH_2^+ < CH_3^+ < (CH_3)_2CH^+ < (CH_3)_3C^+'), opt('(CH_3)_3C^+ < (CH_3)_2CH^+ < CH_3CH_2^+ < CH_3^+')], right: 1, cols: 1, optW: 820, optY: 196, optH: 84, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\text{more } \\mathrm{CH_3} \\Rightarrow \\text{more push}`)], [K(`\\text{groups: } 0, 1, 2, 3`)], [K(`\\mathrm{CH_3^+} < 1^\\circ < 2^\\circ < 3^\\circ`)], [K(`\\text{(D) = carbanion order}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Option')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 500, title: 'Recap · bond fission, nucleophiles and electrophiles', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Homolytic</b>: fair split, one e⁻ each · free radicals (fish hook arrows)', '<b>Heterolytic</b>: one atom takes the pair · carbocation (+, 6 e⁻, sp²) or carbanion (−, 8 e⁻, sp³)', '<b>Stability</b>: carbocations and radicals 3° > 2° > 1° > methyl · carbanions flip', '<b>Nucleophile</b> gives a pair: HO⁻, NC⁻, R₃C⁻, H₂O, R₃N', '<b>Electrophile</b> takes a pair: R₃C⁺, C of C=O, C of R-X · arrows start at electrons'] });
const YQ = ['What is the difference between homolytic and heterolytic fission?', 'Why is a tertiary carbocation more stable than a primary one?', 'Is water a nucleophile or an electrophile, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 84', topic: 'One Cl pulling a whole chain? Inductive and Electromeric Effects', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tMv = wt('S3', 'moves');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S2', 'arrow') - 0.3, 1.08, 620, 540], [T0('S4') + 1.0, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
  document.querySelectorAll('.fcard .fl').forEach(q => { if (q.offsetWidth > 1230) q.style.fontSize = Math.floor(26 * 1230 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const uu = (t, a, d = 1.0) => M.io((t - a) / d);

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['split', 'who', 'what'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Bonds') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'two') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    op(R1.g, M.io((t - T0('P2')) / 0.3)); setRow(R1, uu(t, wt('P2', 'Each')), true);
    op(R2.g, M.io((t - T0('P4')) / 0.3)); setRow(R2, uu(t, wt('P4', 'takes')), false);
  }

  /* S + D + R: the bench */
  const sOn = t >= tS1 - 0.1 && t < tB2 + 0.4; M.hide($('#sS'), !sOn);
  if (sOn) {
    const ph = t < tD1 - 0.45 ? 1 : t < tR1 - 0.45 ? 2 : 3, z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, wt('S4', 'carbocation') - 0.3, z, { dy: 36, ...o });
    let lab = 'MOLECULE BENCH', tags = [];
    if (ph === 1) {
      const s1 = t < tS5 - 0.3 ? 1 : 0, s2 = t >= tS5 - 0.3 && t < tS7 - 0.3 ? 1 : 0, s3 = t >= tS7 - 0.3 ? 1 : 0;
      op(ph1, s1 * M.io((t - tS1 - 0.2) / 0.3)); op(ph2, s2 * M.io((t - tS5 + 0.3) / 0.3)); op(ph3, s3 * M.io((t - tS7 + 0.3) / 0.3));
      if (s1) {
        const mv = uu(t, tMv - 0.1, 1.1), fl = uu(t, wt('S4', 'flat') - 0.3, 1.0);
        const ang = [M.lerp(-90, -60, fl), 180, M.lerp(90, 60, fl)];
        ang.forEach((a, i) => { const r = a * Math.PI / 180, x = CX + 120 * Math.cos(r), y = CY + 120 * Math.sin(r); tr(hMe[i], x, y); L2(hBd[i], CX, CY, x, y); });
        tr(hC, CX, CY); const bx = M.lerp(510, 630, mv); tr(hX, bx, CY); L2(hBr, CX, CY, bx, CY); op(hBr, 1 - M.clamp(mv * 2));
        hD.forEach((d, i) => pos(d, M.lerp(412 + i * 16, bx - 9 + i * 18, mv), M.lerp(CY, CY - 64, mv) - 30 * Math.sin(Math.PI * mv)));
        hArr.run(uu(t, wt('S2', 'arrow') - 0.1, 0.9), M.clamp((mv - 0.2) * 3));
        at(hCp, CX + 40, CY - 44); at(hBm, bx + 52, CY - 34); op(hCp, M.clamp((mv - 0.7) * 4)); op(hBm, M.clamp((mv - 0.7) * 4));
        op(hCir, M.io((t - wt('S4', 'six')) / 0.3));
        M.setT(hLab, t < wt('S4', 'six') ? (mv > 0.7 ? 'BROMIDE ION LEAVES · Br⁻' : 'TERTIARY BUTYL BROMIDE') : 'CARBOCATION · 6 e⁻ · sp² · FLAT'); attr(hLab, 'fill', t < wt('S4', 'six') ? HC : NC);
      }
      if (s2) {
        const sp = uu(t, wt('S6', 'keeps') - 0.2, 1.1);
        const ax = M.lerp(300, 220, sp), bx = M.lerp(484, 564, sp); tr(cA, ax, 290); tr(cB, bx, 290); L2(cBd, ax, 290, bx, 290); op(cBd, 1 - M.clamp(sp * 2));
        pos(cD[0], M.lerp(384, ax, sp), M.lerp(290, 226, sp)); pos(cD[1], M.lerp(400, bx, sp), M.lerp(290, 226, sp));
        const fa = uu(t, wt('S5', 'arrows') - 0.3, 0.8); cArL.run(fa, M.clamp((sp - 0.2) * 3)); cArR.run(M.io((t - wt('S5', 'arrows') - 0.1) / 0.8), M.clamp((sp - 0.2) * 3));
        M.setT(cLab, sp > 0.6 ? 'TWO CHLORINE FREE RADICALS · Cl•' : 'CHLORINE IN SUNLIGHT'); op(sun, M.io((t - wt('S5', 'sunlight')) / 0.3));
      }
      lab = s1 ? 'MOLECULE BENCH · HETEROLYTIC' : s2 ? 'MOLECULE BENCH · HOMOLYTIC' : 'MOLECULE BENCH · CARBANION';
      tags = [[T0('S1'), '(CH₃)₃C-Br'], [tMv, 'UNFAIR SPLIT'], [wt('S4', 'carbocation'), 'CARBOCATION'], [tS5, 'Cl-Cl · LIGHT'], [wt('S5', 'fish'), 'FISH HOOKS · 1 e⁻'], [wt('S6', 'radicals'), 'FREE RADICALS'], [tS7, 'CARBANION']];
    } else if (ph === 2) {
      op(ph1, 0); op(ph2, 0); op(ph3, 0); op(phD, M.io((t - tD1 + 0.3) / 0.3)); op(phR, 0);
      lad.forEach((L, n) => { op(L.g, M.io((t - (n === 0 ? T0('D2') - 0.2 : wt('D3', 'Each') + (n - 1) * 0.35)) / 0.3)); L.ar.forEach(a => a.run(uu(t, (n === 0 ? 0 : wt('D3', 'feeds')) + 0.1, 0.5))); });
      op(stA, M.io((t - wt('D4', 'order')) / 0.4)); op(stB, M.io((t - wt('D5', 'flips')) / 0.4));
      lab = 'MOLECULE BENCH · STABILITY';
      tags = [[T0('D2'), 'CH₃ PUSHES e⁻'], [T0('D3'), 'MORE CH₃ · MORE STABLE'], [T0('D4'), 'TERTIARY WINS'], [wt('D5', 'flips'), 'CARBANIONS FLIP']];
    } else {
      op(phD, 0); op(phR, M.io((t - tR1 + 0.3) / 0.3));
      const hit = uu(t, wt('R5', 'bond') - 0.4, 1.0), ox = M.lerp(220, 412, hit);
      tr(nG, ox, 290); op(nG, M.io((t - tR1) / 0.3)); op(eG, M.io((t - T0('R3') + 0.1) / 0.3));
      nAt.forEach((d, i) => pos(d, M.lerp(60, 72, hit), M.lerp(-9 + i * 18, 0, hit)));
      L2(nBd, ox + 44, 290, 512, 290); op(nBd, M.clamp((hit - 0.7) * 4)); op(nAt[0], 1 - M.clamp((hit - 0.7) * 4)); op(nAt[1], 1 - M.clamp((hit - 0.7) * 4));
      op(nMi, 1 - M.clamp((hit - 0.6) * 3)); op(ePl, 1 - M.clamp((hit - 0.6) * 3));
      rArr.run(uu(t, wt('R5', 'curved') - 0.1, 1.2), M.clamp((hit - 0.1) * 3));
      op(nLb, M.io((t - T0('R1') - 0.3) / 0.3) * (1 - hit)); op(eLb, M.io((t - T0('R3')) / 0.3) * (1 - hit)); op(rLab, M.clamp((hit - 0.8) * 5));
      lab = 'MOLECULE BENCH · NU MEETS E';
      tags = [[tR1, 'NUCLEOPHILE · HO⁻'], [T0('R3'), 'ELECTROPHILE · CH₃⁺'], [wt('R5', 'curved'), 'PAIR → CARBON'], [wt('R5', 'bond'), 'NEW BOND']];
    }
    if (ph === 1) { op(phD, 0); op(phR, 0); }
    M.setT($('#bnL'), lab);
    let tg = null; for (const [tt, s] of tags) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tags[0][0] - 0.1, 1e9, POP);
    M.vis($('#ctr'), t, 1e9, 1e9, { dy: 0 });
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1 - 0.4, tR1 - 0.45, { dy: 0 }); M.vis($('#rxG'), t, tR1 - 0.4, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD); rxG(t, tR1 + 0.2, tRG);
    M.vis($('#ctA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1 - 0.4, tR1 - 0.45, { dy: 0 }); M.vis($('#ctG'), t, tR1 - 0.4, 1e9, { dy: 0 });
    CRA.forEach(([, , , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    PRD.forEach(([, , , tt], i) => M.vis($('#pd' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LNG.forEach(([, , tt], i) => M.vis($('#lg' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }
  const thOn = t >= tB2 - 0.1 && t < tT + 0.1;
  if (thOn || sOn) { M.hide($('#sS'), false); M.vis($('#th1'), t, tB2 + 0.05, OUT('T1'), { dy: 36, ...o }); th1(t, { tin: tB2, tOpts: wt('B2', 'Nucleophile') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'short') }); }
  else M.hide($('#sS'), true);

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Arrows') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'nucleophile') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'takes') + 0.3, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    WP.forEach(([, , , , tk], i) => { M.vis($('#wp' + i), t, tWp[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#wt' + i), t, tk - 0.1, 1e9, POP); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'draw') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'starts') - 0.1 });
    op(tWr.g, M.io((t - wt('X2', 'draw')) / 0.3)); tWr.a.run(uu(t, wt('X2', 'carbon'), 0.8));
    op(tRt.g, M.io((t - wt('X3', 'starts')) / 0.3)); tRt.a.run(uu(t, wt('X3', 'starts', 1), 0.8));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'carbocation'), tCount, tAns });
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
