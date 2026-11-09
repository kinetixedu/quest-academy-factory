// PUC Chemistry Ep 84: Inductive and electromeric effects (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: moving electrons e- orange (dots, arrows), Cl blue, O violet, C / CH3 ink, H grey, delta charges teal, the negative charge cloud violet, F gold
const NC = C.ac, HC = C.ink, EC = '#C8461B', CL = '#2F6FEB', OC = '#7A4FE0', HG = '#8A93A6', GD = '#B7791F', RD = C.red, OK = C.ok;
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
const line = (p, c = C.ink2, w = 6) => mk(p, 'line', { stroke: c, 'stroke-width': w, 'stroke-linecap': 'round' });
// curved electron arrow, draws on from the electrons to where they go
const carrow = (p, x1, y1, x2, y2, bend, col = EC) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dl = Math.hypot(x2 - x1, y2 - y1), qx = mx + (-(y2 - y1) / dl) * bend, qy = my + ((x2 - x1) / dl) * bend;
  const g = mk(p, 'g', {}), pa = mk(g, 'path', { d: `M${x1} ${y1} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x2} ${y2}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const a = Math.atan2(y2 - qy, x2 - qx), hl = 16, b1 = [x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45)], b2 = [x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45)];
  const hd = mk(g, 'path', { d: `M${b1[0].toFixed(1)} ${b1[1].toFixed(1)} L${x2} ${y2} L${b2[0].toFixed(1)} ${b2[1].toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return { g, run(u, out = 0) { M.drawU(pa, u); op(hd, M.clamp((u - 0.9) / 0.1)); op(g, u > 0 ? 1 - out : 0); } };
};
// inductive arrowhead in the middle of a bond (points to the atom that pulls)
const ihead = (p, x, y, dir = 1, col = EC) => mk(p, 'path', { d: `M${x - 9 * dir} ${y - 11} L${x + 7 * dir} ${y} L${x - 9 * dir} ${y + 11}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
Object.assign(M.IC, {
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
  paperclip: ['m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48'],
  ear: ['M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0', 'M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tL1 = T0('L1'), tL4 = T0('L4'), tB2 = T0('B2'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['magnet', 'Magnet and clips', 'FIRST CLIP HELD TIGHT', 'magnet', 'STRONG'], ['paperclip', 'The last clip', 'BARELY HELD', 'barely', 'WEAK'], ['ear', 'Whisper game', 'WEAKER DOWN THE LINE', 'whisper', 'FADES']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , tg], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}">${tg}</div></div>`).join('');
const KIT = [['Vinegar: weak acid', wt('H3', 'weak'), C.ac2], ['Swap H for Cl', wt('H4', 'chlorine'), C.redBg], ['80x stronger!', wt('H4', 'stronger'), C.okBg]];
$('#wqs').innerHTML = KIT.map(([s], i) => `<div class="wq" id="wq${i}">${s}</div>`).join('');

/* ---------- P: magnet and clips ---------- */
$('#mdefI').innerHTML = M.icon('link', 28, '#fff', 2.2);
const QR = [['Shared pair', 'TWO KIDS, ONE ROPE', wt('P1', 'pair')], ['δ− and δ+', 'SMALL CHARGES', wt('P2', 'delta')], ['Inductive effect', 'PULL ALONG σ BONDS', wt('P4', 'inductive')], ['Permanent', 'ALWAYS ON', wt('P5', 'permanent')]];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const ps = $('#nS');
const mag = mk(ps, 'g', { transform: 'translate(160 130)' });
mk(mag, 'path', { d: 'M-60 -40 V20 A60 60 0 0 0 60 20 V-40', fill: 'none', stroke: RD, 'stroke-width': 30 });
mk(mag, 'rect', { x: -75, y: -60, width: 30, height: 26, fill: C.dim }); mk(mag, 'rect', { x: 45, y: -60, width: 30, height: 26, fill: C.dim });
const clips = [0, 1, 2, 3].map(i => { const g = mk(ps, 'g', {}); mk(g, 'rect', { x: -16, y: -34, width: 32, height: 68, rx: 16, fill: 'none', stroke: HC, 'stroke-width': 5 }); return g; });
const bars = [0, 1, 2, 3].map(i => { const g = mk(ps, 'g', {}); const r = mk(g, 'rect', { x: 0, y: 0, height: 26, rx: 6, fill: NC }); const tx = txt(g, 0, 20, '', { 'font-size': 18, 'font-weight': 600, fill: NC }); return { g, r, tx }; });
const PULL = [1, 0.55, 0.28, 0.1], PLAB = ['δ−  STRONG', 'δ+', 'δδ+', 'δδδ+  ≈ 0'];

/* ---------- S: bench ---------- */
const b = $('#bS');
const ph1 = mk(b, 'g', {});
const SX = [120, 292, 464, 640], SL = ['CH₃', 'CH₂', 'CH₂', 'Cl'], SY = 290;
const sBd = [0, 1, 2].map(() => line(ph1)), sAt = SX.map((x, i) => { const g = ball(ph1, i === 3 ? 48 : 42, i === 3 ? CL : HC, SL[i], i === 3 ? 28 : 22); tr(g, x, SY); return g; });
sBd.forEach((l, i) => L2(l, SX[i], SY, SX[i + 1], SY));
const SH = [6, 14, 30]; // pair shift towards Cl per bond
const sPr = [0, 1, 2].map(() => [dot(ph1), dot(ph1)]), sHd = [0, 1, 2].map(i => ihead(ph1, (SX[i] + SX[i + 1]) / 2 + 10, SY + 26));
const sDl = ['δδδ+', 'δδ+', 'δ+', 'δ−'].map((s, i) => txt(ph1, SX[i], SY - 66, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': [20, 24, 28, 30][i], 'font-weight': 700, fill: NC }));
const sBar = [0, 1, 2].map(i => mk(ph1, 'rect', { x: (SX[i] + SX[i + 1]) / 2 - 40, y: 400, height: 14, rx: 7, fill: EC }));
const sBl = txt(ph1, 392, 448, 'PULL ON EACH BOND · FADES FAST', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600, fill: EC });
const sZero = txt(ph1, SX[0], SY + 84, '≈ 0', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: C.mute });
// phase D: acid anions
const phD = mk(b, 'g', {});
const acid = (y, cl) => {
  const g = mk(phD, 'g', {}), xs = cl ? [150, 300, 470] : [300, 470], labs = cl ? ['Cl', 'CH₂', 'COO'] : ['CH₃', 'COO'];
  const cloud = mk(g, 'ellipse', { cx: 470, cy: y, rx: 70, ry: 54, fill: OC });
  xs.slice(0, -1).forEach((x, i) => { const l = line(g); L2(l, x, y, xs[i + 1], y); });
  const hb = line(g); L2(hb, 470, y, 600, y);
  const H = ball(g, 26, HG, 'H', 20); tr(H, 600, y);
  xs.forEach((x, i) => tr(ball(g, labs[i] === 'COO' ? 46 : 40, labs[i] === 'Cl' ? CL : labs[i] === 'COO' ? OC : HC, labs[i], labs[i] === 'COO' ? 22 : 22), x, y));
  const hd = cl ? [ihead(g, 225, y + 24, -1), ihead(g, 385, y + 24, -1)] : [ihead(g, 385, y + 24, 1)];
  const mi = sign(g, '−', OC, 34); at(mi, 520, y - 38);
  const nm = txt(g, 36, y - 66, cl ? 'CHLOROACETATE ION' : 'ACETATE ION', { 'font-size': 18, 'font-weight': 600, fill: cl ? CL : HC });
  return { g, cloud, hb, H, hd, mi, y };
};
const A1 = acid(180, false), A2 = acid(380, true);
// phase L: electromeric
const phL = mk(b, 'g', { transform: 'translate(-98 -75) scale(1.25)' });
const eth = mk(phL, 'g', {});
const eS = line(eth), eP = line(eth); L2(eS, 300, 300, 484, 300); L2(eP, 300, 280, 484, 280);
const eA = ball(eth, 44, HC, 'CH₂', 22), eB = ball(eth, 44, HC, 'CH₂', 22); tr(eA, 300, 300); tr(eB, 484, 300);
const eD = [dot(eth), dot(eth)], eHp = mk(eth, 'g', {}); ball(eHp, 28, HG, 'H⁺', 18);
const eArr = carrow(eth, 392, 268, 470, 248, -26);
const ePl = sign(eth, '+', NC, 38); at(ePl, 300, 236); const eMi = sign(eth, '', EC, 38);
const eLb = txt(eth, 392, 440, '+E · PAIR MOVES TO THE ATOM H⁺ JOINS', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: NC });
const cob = mk(phL, 'g', {});
const kS = line(cob), kP = line(cob); L2(kS, 300, 300, 484, 300); L2(kP, 300, 280, 484, 280);
const kA = ball(cob, 44, HC, 'C', 30), kB = ball(cob, 46, OC, 'O', 30); tr(kA, 300, 300); tr(kB, 484, 300);
const kD = [dot(cob), dot(cob)], kNu = mk(cob, 'g', {}); ball(kNu, 34, HC, 'NC⁻', 18);
const kArr = carrow(cob, 392, 268, 476, 246, -26);
const kPl = sign(cob, '+', NC, 38); at(kPl, 300, 236); const kMi = sign(cob, '−', OC, 38); at(kMi, 540, 260);
const kLb = txt(cob, 392, 440, '−E · PAIR MOVES AWAY FROM THE ATTACKED C', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: OC });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* right cards */
const rxA = PUC.solution($('#rxA'), [[K(`${tc(CL, '\\mathrm{Cl}')} \\text{ pulls the C-Cl pair} \\Rightarrow ${tc(NC, '\\delta^-,\\ \\delta^+')}`)], [K(`${tc(NC, '\\delta^+ > \\delta\\delta^+ > \\delta\\delta\\delta^+')}: \\text{ it fades}`)], [K(`\\approx 0 \\text{ after about 3 bonds}`)]], { label: 'INDUCTIVE EFFECT · ON THE BENCH', y0: 80, dy: 62 });
const tRA = [T0('S2'), wt('S4', 'fades'), T0('S5')];
const rxD = PUC.solution($('#rxD'), [[K(`\\text{acid gives } \\mathrm{H^+} \\Rightarrow \\text{negative ion}`)], [K(`${tc(CL, '\\mathrm{Cl}')} \\text{ pulls electrons away}`)], [K(`${tc(OC, '\\text{charge spread}')} \\Rightarrow \\text{ion more stable}`)], [K(`\\Rightarrow \\text{stronger acid}`)]], { label: 'ACID STRENGTH · STEP BY STEP', y0: 70, dy: 50 });
const tRD = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const rxG = PUC.solution($('#rxG'), [[K(`\\pi \\text{ pair shifts fully, only near a reagent}`)], [K(`{+E}: \\text{ to the atom the reagent joins}`)], [K(`{-E}: \\text{ away from the attacked atom}`)], [K(`\\text{temporary} \\cdot \\text{beats inductive}`)]], { label: 'ELECTROMERIC EFFECT', y0: 70, dy: 50 });
const tRG = [T0('L2'), wt('L3', 'plus'), wt('L4', 'minus'), wt('L5', 'temporary')];
const CRA = [['−I · pull', 'halogens, -NO₂, -CN, -COOH, -COOR, -OAr', NC, T0('S6')], ['+I · push', 'alkyl: -CH₃, -CH₂CH₃', EC, T0('S7')]];
$('#crA').innerHTML = CRA.map(([n, c, vc], i) => `<div class="cr" id="ca${i}" style="top:${74 + i * 72}px;height:60px"><div class="ce" style="font:700 24px Poppins;top:14px;color:${vc}">${n}</div><div class="cn" style="left:180px;top:18px;font:600 19px Poppins;color:var(--ink)">${c}</div></div>`).join('');
const PRD = [['Cl₃CCOOH > Cl₂CHCOOH > ClCH₂COOH', 'MORE Cl', CL, wt('D6', 'trichloroacetic')], ['HCOOH > CH₃COOH', '+I WEAKENS', EC, wt('D6', 'methyl')]];
$('#prD').innerHTML = PRD.map(([s, k, c], i) => `<div class="pr" id="pd${i}" style="top:${80 + i * 72}px;height:56px"><div class="pa" style="top:14px;font-size:22px">${s}</div><div class="pt" style="color:${c};top:18px">${k}</div></div>`).join('');
const LNG = [['Inductive: σ bonds, partial shift, permanent', NC, T0('L1')], ['Electromeric: π pair, complete shift, temporary', OC, wt('L2', 'electromeric')]];
$('#lnG').innerHTML = LNG.map(([s, c], i) => `<div class="ln" id="lg${i}" style="top:${80 + i * 80}px"><span style="width:14px;height:14px;border-radius:50%;background:${c}"></span>${s}</div>`).join('');
const th1 = PUC.think($('#th1'), { q: 'You remove the attacking reagent. Which effect is still there?', opts: ['Electromeric effect', 'Inductive effect'], right: 1, why: 'Inductive is permanent. The electromeric shift vanishes once the reagent leaves.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${tc(NC, '\\text{inductive: } \\sigma,\\ \\text{always}')} \\quad\\big|\\quad ${tc(OC, '\\text{electromeric: } \\pi,\\ \\text{reagent only}')}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\mathrm{ClCH_2COOH}: ${tc(CL, '-I')} \\Rightarrow \\text{strongest}`)],
  [K(`\\mathrm{HCOOH}: \\text{H, no push, no pull}`)],
  [K(`\\mathrm{CH_3COOH}: ${tc(EC, '+I')} \\Rightarrow \\text{weakest}`)],
  [K(`\\mathrm{p}K_\\mathrm{a}: 2.9 < 3.8 < 4.8`)]], { label: 'WORKED EXAMPLE', y0: 216, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Strongest'), T0('W4'), wt('W5', 'Weakest'), wt('W6', 'values')];
const WP = [['Chloroacetic acid', 'ClCH₂COOH · pKa ≈ 2.9', 'STRONGEST', CL, wt('W3', 'Strongest')], ['Formic acid', 'HCOOH · pKa ≈ 3.8', 'MIDDLE', HC, wt('W4', 'pull')], ['Acetic acid', 'CH₃COOH · pKa ≈ 4.8', 'WEAKEST', EC, wt('W5', 'Weakest')]];
$('#wps').innerHTML = WP.map(([s, f, k, c], i) => `<div class="wp" id="wp${i}" style="top:${84 + i * 124}px"><div class="pa">${s}</div><div class="pf">${f}</div><div class="pt" id="wt${i}" style="color:${c}">${k}</div></div>`).join('');
const tWp = [T0('W3'), T0('W4'), T0('W5')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The inductive pull is the same all along the chain', right: 'It fades fast: almost nothing after three bonds' });
const tsv = $('#tS');
const tRow = (y, hs, col, lab) => { const g = mk(tsv, 'g', {}); hs.forEach((h, i) => mk(g, 'rect', { x: 60 + i * 80, y: y - h, width: 52, height: h, rx: 6, fill: col })); txt(g, 400, y - 6, lab, { 'font-size': 18, 'font-weight': 600, fill: col }); return g; };
const tW = tRow(110, [60, 60, 60, 60], RD, 'WRONG'), tR = tRow(236, [80, 40, 16, 4], OK, 'RIGHT');
const where = PUC.where($('#wa'), { on: [], type: 'Arrange acids by strength, sort +I and −I groups, compare inductive and electromeric effects' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN / NEET PATTERN · ORIGINAL QUESTION', q: `Which of these is the strongest acid?`, qW: 760,
  opts: [K('\\mathrm{CH_3COOH}'), K('\\mathrm{FCH_2COOH}'), K('\\mathrm{ClCH_2COOH}'), K('\\mathrm{BrCH_2COOH}')], right: 1, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`-I: \\mathrm{F > Cl > Br}`)], [K(`\\text{bigger pull} \\Rightarrow \\text{charge spread}`)], [K(`\\mathrm{FCH_2COOH} \\text{ strongest}`)], [K(`\\mathrm{CH_3COOH}\\ (+I) \\text{ weakest}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'Acetic')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 500, title: 'Recap · inductive and electromeric effects', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Inductive</b>: pull passed along σ bonds · permanent · fades, ≈ 0 after 3 bonds', '<b>−I</b>: halogens, -NO₂, -CN, -COOH, -COOR, -OAr · <b>+I</b>: alkyl groups (-CH₃, -C₂H₅)', '<b>Acids</b>: −I spreads the negative charge ⇒ stronger · ClCH₂COOH > HCOOH > CH₃COOH', '<b>Electromeric</b>: π pair shifts fully, only near a reagent · temporary · beats inductive', '<b>+E</b>: pair to the atom the reagent joins · <b>−E</b>: pair away from the attacked atom'] });
const YQ = ['Why does the inductive effect fade along a carbon chain?', 'Why is chloroacetic acid stronger than acetic acid?', 'What is the difference between the +E and −E effects?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 85', topic: 'Electrons around a whole ring? Resonance and Hyperconjugation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S3') - 0.3, 1.08, 620, 560], [T0('S5') + 0.5, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ln').forEach(q => { if (q.scrollWidth > 712) q.style.fontSize = Math.floor(24 * 690 / q.scrollWidth) + 'px'; });
  document.querySelectorAll('.fcard .fl').forEach(q => { if (q.offsetWidth > 1230) q.style.fontSize = Math.floor(26 * 1230 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#crA .cn').forEach(q => { if (q.offsetWidth > 500) q.style.fontSize = Math.floor(19 * 500 / q.offsetWidth) + 'px'; });
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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', ['pull', 'fades', 'travels'][i]) - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Molecules') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach(([, tt, bg], i) => { const el = $('#wq' + i); M.vis(el, t, tt - 0.1, 1e9, POP); setBg(el, mix(C.soft, bg, M.io((t - tt) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P4', 'chain') - 0.1, 1e9, POP);
    QR.forEach(([, , tt], i) => { const el = $('#qr' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? QR[i + 1][2] : 1e9; setBg(el, mix(C.soft, C.ac2, M.io((t - tt) / 0.25) * (1 - M.io((t - nx2) / 0.25)))); });
    M.vis($('#pw'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o });
    op(mag, M.io((t - tP1 - 0.4) / 0.3));
    clips.forEach((g, i) => { const tt = T0('P2') + i * 0.5, u = M.io((t - tt) / 0.4); tr(g, 160 + i * 7 * (i > 0 ? 1 : 0), 220 + i * 76 - 30 * (1 - u)); attr(g, 'transform', `translate(${160 + i * 6} ${(220 + i * 76 - 30 * (1 - u)).toFixed(1)}) rotate(${i * 7})`); op(g, u); });
    bars.forEach(({ g, r, tx }, i) => { const tt = (i < 2 ? wt('P2', 'minus') : wt('P3', 'neighbour')) + i * 0.4, u = M.io((t - tt) / 0.6); attr(g, 'transform', `translate(260 ${207 + i * 76})`); attr(r, 'width', (300 * PULL[i] * u + 0.1).toFixed(1)); at(tx, 300 * PULL[i] * u + 14, 20); M.setT(tx, PLAB[i]); op(g, u > 0 ? 1 : 0); });
  }

  /* S + D + L: the bench */
  const sOn = t >= tS1 - 0.1 && t < tB2 + 0.4;
  if (sOn) {
    const ph = t < tD1 - 0.45 ? 1 : t < tL1 - 0.45 ? 2 : 3, z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, tS1 + 0.4, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, T0('S6') - 0.3, z, { dy: 36, ...o });
    let lab = 'MOLECULE BENCH', tags = [];
    op(ph1, ph === 1 ? M.io((t - tS1 - 0.2) / 0.3) : 0); op(phD, ph === 2 ? M.io((t - tD1 + 0.3) / 0.3) : 0); op(phL, ph === 3 ? M.io((t - tL1 + 0.3) / 0.3) : 0);
    if (ph === 1) {
      const tk = [wt('S4', 'Carbon'), T0('S3'), T0('S2') + 0.4];
      [0, 1, 2].forEach(i => {
        const u = uu(t, tk[i], 1.0), mx = (SX[i] + SX[i + 1]) / 2 + SH[i] * u;
        sPr[i].forEach((d, j) => pos(d, mx + (j ? 9 : -9), SY - 18)); op(sPr[i][0], M.io((t - tS1 - 0.4) / 0.3)); op(sPr[i][1], M.io((t - tS1 - 0.4) / 0.3));
        op(sHd[i], u); attr(sBar[i], 'width', (Math.max(0.1, [12, 34, 80][i] * u)).toFixed(1)); op(sBar[i], u > 0 ? 1 : 0);
      });
      op(sDl[3], M.io((t - wt('S2', 'minus')) / 0.3)); op(sDl[2], M.io((t - wt('S2', 'plus')) / 0.3)); op(sDl[1], M.io((t - wt('S3', 'double')) / 0.3)); op(sDl[0], M.io((t - wt('S4', 'Triple')) / 0.3));
      op(sBl, M.io((t - wt('S4', 'fades')) / 0.3)); op(sZero, M.io((t - T0('S5')) / 0.3));
      lab = 'MOLECULE BENCH · 1-CHLOROPROPANE';
      tags = [[T0('S1'), 'CH₃CH₂CH₂Cl'], [T0('S2'), 'Cl PULLS'], [T0('S4'), 'THE PULL FADES'], [T0('S5'), '≈ 0 AFTER 3 BONDS'], [T0('S6'), '−I GROUPS'], [T0('S7'), '+I GROUPS']];
    } else if (ph === 2) {
      const hu = uu(t, wt('D2', 'gives') - 0.1, 1.0), sp = uu(t, wt('D4', 'spread') - 0.2, 1.2);
      [A1, A2].forEach((A, k) => {
        op(A.g, M.io((t - T0('D2') + 0.3 - k * 0.3) / 0.3));
        tr(A.H, M.lerp(600, 700, hu), A.y - 50 * hu); op(A.H, 1 - M.clamp((hu - 0.6) * 2.5)); op(A.hb, 1 - M.clamp(hu * 3)); op(A.mi, M.clamp((hu - 0.6) * 3));
        const spr = k ? sp : 0; attr(A.cloud, 'rx', (70 + 160 * spr).toFixed(1)); attr(A.cloud, 'cx', (470 - 140 * spr).toFixed(1)); op(A.cloud, M.clamp((hu - 0.5) * 2) * (0.32 - 0.16 * spr));
        A.hd.forEach(h => op(h, k ? M.io((t - wt('D3', 'pulls')) / 0.4) : M.io((t - wt('D6', 'methyl')) / 0.4)));
      });
      lab = 'MOLECULE BENCH · ACID ANIONS';
      tags = [[T0('D2'), 'H⁺ LEAVES'], [T0('D3'), 'Cl PULLS'], [T0('D4'), 'CHARGE SPREADS'], [T0('D5'), 'STRONGER ACID'], [wt('D6', 'methyl'), '+I CH₃ · WEAKER']];
    } else {
      const ek = t < tL4 - 0.3, appr = uu(t, wt(ek ? 'L3' : 'L4', ek ? 'near' : 'near') - 0.6, 1.0), back = uu(t, wt('L5', 'away') - 0.1, 1.0);
      op(eth, (ek ? 1 : 0) * M.io((t - tL1 + 0.2) / 0.3)); op(cob, ek ? 0 : M.io((t - tL4 + 0.3) / 0.3));
      const ar = ek ? eArr : kArr, sh = uu(t, wt(ek ? 'L3' : 'L4', ek ? 'ends' : 'moves') - 0.1, 1.0) * (ek ? 1 : 1 - back);
      if (ek) {
        tr(eHp, M.lerp(700, 540, appr), M.lerp(140, 220, appr)); op(eHp, M.io((t - T0('L3') + 0.1) / 0.3));
        eD.forEach((d, j) => pos(d, M.lerp(383 + j * 18, 466 + j * 18, sh), M.lerp(280, 248, sh) - 20 * Math.sin(Math.PI * sh))); op(eP, 1 - sh);
        ar.run(uu(t, wt('L3', 'curved') - 0.1, 0.9), M.clamp((sh - 0.3) * 3)); op(ePl, M.clamp((sh - 0.7) * 4)); op(eLb, M.io((t - wt('L3', 'plus')) / 0.3));
      } else {
        tr(kNu, M.lerp(80, 180, appr * (1 - back)), M.lerp(160, 210, appr * (1 - back))); op(kNu, M.io((t - tL4) / 0.3) * (1 - M.clamp((back - 0.6) * 2.5)));
        kD.forEach((d, j) => pos(d, M.lerp(383 + j * 18, 500 + j * 14, sh), M.lerp(280, 238, sh) - 20 * Math.sin(Math.PI * sh))); op(kP, 1 - sh);
        ar.run(uu(t, wt('L4', 'moves') - 0.1, 0.9), M.clamp((sh - 0.3) * 3) + M.clamp(back * 3)); op(kPl, M.clamp((sh - 0.7) * 4)); op(kMi, M.clamp((sh - 0.7) * 4));
        op(kLb, M.io((t - wt('L4', 'minus')) / 0.3) * (1 - back));
      }
      lab = ek ? 'MOLECULE BENCH · ETHENE + H⁺' : 'MOLECULE BENCH · C=O + NC⁻';
      tags = [[T0('L1'), 'σ PAIR + π PAIR'], [T0('L2'), 'π PAIR SHIFTS'], [wt('L3', 'plus'), '+E EFFECT'], [wt('L4', 'minus'), '−E EFFECT'], [wt('L5', 'away'), 'REAGENT GONE · BACK'], [wt('L5', 'wins'), 'BEATS INDUCTIVE']];
    }
    M.setT($('#bnL'), lab);
    let tg = null; for (const [tt, s] of tags) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tags[0][0] - 0.1, 1e9, POP);
    M.vis($('#ctr'), t, 1e9, 1e9, { dy: 0 });
    M.vis($('#rxA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#rxD'), t, tD1 - 0.4, tL1 - 0.45, { dy: 0 }); M.vis($('#rxG'), t, tL1 - 0.4, 1e9, { dy: 0 });
    rxA(t, tS1 + 0.2, tRA); rxD(t, tD1 + 0.2, tRD); rxG(t, tL1 + 0.2, tRG);
    M.vis($('#ctA'), t, tS1, tD1 - 0.45, { dy: 0 }); M.vis($('#ctD'), t, tD1 - 0.4, tL1 - 0.45, { dy: 0 }); M.vis($('#ctG'), t, tL1 - 0.4, 1e9, { dy: 0 });
    CRA.forEach(([, , , tt], i) => M.vis($('#ca' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    PRD.forEach(([, , , tt], i) => M.vis($('#pd' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    LNG.forEach(([, , tt], i) => M.vis($('#lg' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
  }
  const thOn = t >= tB2 - 0.1 && t < tT + 0.1;
  M.hide($('#sS'), !(sOn || thOn));
  if (thOn || sOn) { M.vis($('#th1'), t, tB2 + 0.05, OUT('T1'), { dy: 36, ...o }); th1(t, { tin: tB2, tOpts: wt('B2', 'Which') - 0.3, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'permanent') }); }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Inductive') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Electromeric') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'reagent') + 0.3, 0.8);
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
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'fades') - 0.1 });
    op(tW, M.io((t - wt('X2', 'equally')) / 0.3)); op(tR, M.io((t - wt('X3', 'fades')) / 0.3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'strongest'), tCount, tAns });
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
