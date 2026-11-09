// PUC Chemistry Ep 69: Buffer solutions (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: added acid H+ orange; added base OH- blue ring; salt part (A-, HCO3-) violet; acid part (HA, H2CO3) ink; pH blue; pKa, pKb gold
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tO = s => `\\textcolor{${OK}}{${s}}`, tB = s => `\\textcolor{${BC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tV = s => `\\textcolor{${OC}}{${s}}`;
const pKa = tG('\\mathrm{p}K_a'), pKb = tG('\\mathrm{p}K_b'), pH = tB('\\text{pH}'), salt = tV('[\\text{salt}]'), acd = '[\\text{acid}]';
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const ball = (p, r, fill, lab, fs = 16, stroke) => { const g = mk(p, 'g', {}); const c = mk(g, 'circle', { r, fill, stroke: stroke || 'none', 'stroke-width': stroke ? 3 : 0 }); const tx = txt(g, 0, fs * 0.35, lab, { 'text-anchor': 'middle', 'font-size': fs, fill: stroke ? stroke : '#fff', 'font-weight': 700 }); return { g, c, tx }; };
const at = (e, x, y) => attr(e, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const scaleBar = (p, x0, y, w) => { const g = mk(p, 'g', {}); for (let i = 0; i < 14; i++) { const c = i + 0.5; mk(g, 'rect', { x: x0 + i * w / 14, y, width: w / 14 + 0.5, height: 22, fill: c < 7 ? mix('#F2B8B8', '#FBEDED', c / 7) : mix('#EAF0FC', '#B9CDF5', (c - 7) / 7) }); } [0, 7, 14].forEach(v => txt(g, x0 + v * w / 14, y + 48, String(v), { 'text-anchor': 'middle', 'font-size': 16, fill: HC, 'font-weight': 600 })); return g; };

Object.assign(M.IC, {
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  heart: ['M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z'],
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['drop', 'Water + a drop', 'ONE DROP OF ACID', 'water', 'CRASHES', RD], ['heart', 'Blood + a drop', 'SAME DROP', 'blood', 'HOLDS', OK], ['shield', 'A buffer', 'FIGHTS BACK', 'barely', 'RESISTS', NC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.3);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Hard ride: muscles make acid', 'acid', 'H3'], ['Blood stays at about pH 7.4', 'seven', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('bike', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: two keepers ---------- */
const QR = [['Keeper 1 catches acid shots', 'BASE PART', 'P2', 'acid', OC], ['Keeper 2 catches base shots', 'ACID PART', 'P2', 'base', HC], ['Both keepers in one solution', 'A BUFFER', 'P4', 'buffer', NC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const pGoal = mk(ps, 'path', { d: 'M150 90 H90 V450 H150', stroke: C.ink2, 'stroke-width': 6, fill: 'none', 'stroke-linejoin': 'round' });
const pK1 = ball(ps, 34, OC, 'A⁻', 20), pK2 = ball(ps, 34, C.ink2, 'HA', 20); at(pK1.g, 200, 190); at(pK2.g, 200, 350);
const pS1 = ball(ps, 18, XC, 'H⁺', 15), pS2 = ball(ps, 22, '#fff', 'OH⁻', 14, BC);
const pL1 = txt(ps, 260, 150, '', { 'font-size': 18, fill: OC, 'font-weight': 600 }), pL2 = txt(ps, 260, 310, '', { 'font-size': 18, fill: HC, 'font-weight': 600 });

/* ---------- S: water vs buffer ---------- */
const bench = (p, buf) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: 'M90 150 V400 a20 20 0 0 0 20 20 H390 a20 20 0 0 0 20 -20 V150', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }); mk(g, 'rect', { x: 92, y: 180, width: 316, height: 238, fill: '#E6F3FA' });
  const met = mk(g, 'g', {}); mk(met, 'rect', { x: 460, y: 110, width: 270, height: 170, rx: 16, fill: C.ink }); mk(met, 'rect', { x: 482, y: 132, width: 226, height: 92, rx: 8, fill: '#E8F5F5' }); txt(met, 595, 258, 'pH METER', { 'text-anchor': 'middle', 'font-size': 16, fill: '#fff', 'font-weight': 600 });
  const rd = txt(p, 595, 198, '', { 'text-anchor': 'middle', 'font-size': 50, fill: BC, 'font-weight': 600 });
  const ms = buf ? Array.from({ length: 16 }, (_, i) => { const isA = i % 2 === 0; const m = ball(p, 14, isA ? OC : C.ink2, isA ? '−' : '', 18); return { m, isA, x: 130 + (i % 4) * 75 + rnd(i, 1) * 20, y: 220 + Math.floor(i / 4) * 48 + rnd(i, 2) * 10, ph: rnd(i, 3) * 6.28 }; }) : [];
  const drops = Array.from({ length: 6 }, (_, i) => mk(p, 'circle', { r: 9, fill: XC }));
  const sc = scaleBar(p, 90, 470, 640); const mkr = mk(p, 'path', { d: 'M-9 -12 L9 -12 L0 0 Z', fill: BC });
  return { g, met, rd, ms, drops, sc, mkr }; };
const BW = bench($('#bS'), false), BB = bench($('#eS'), true);
const bTx = txt($('#bS'), 250, 140, '', { 'text-anchor': 'middle', 'font-size': 18, fill: RD, 'font-weight': 600 }), eTx = txt($('#eS'), 250, 140, '', { 'text-anchor': 'middle', 'font-size': 18, fill: OC, 'font-weight': 600 });
const eCt = txt($('#eS'), 595, 330, '', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 }), eCt2 = txt($('#eS'), 595, 362, '', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 });
const avA = PUC.avatar($('#sL'), { x: 160 + 36, y: 270 + 500, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my blood carries its own keepers!' });

/* ---------- L ---------- */
const FT = [['ACIDIC BUFFER · WEAK ACID + ITS SALT', '\\mathrm{CH_3COOH} + ' + tV('\\mathrm{CH_3COONa}'), 'pH ≈ 4.75', RD, 'AROUND', 'L2'], ['BASIC BUFFER · WEAK BASE + ITS SALT', '\\mathrm{NH_4OH} + ' + tV('\\mathrm{NH_4Cl}'), 'pH ≈ 9.25', BC, 'AROUND', 'L3']];
$('#fts').innerHTML = FT.map(([k, e, v, c, s], i) => `<div class="ft" id="ft${i}" style="left:${36 + i * 780}px;top:216px"><div class="fk">${k}</div><div class="fe">${K(e)}</div><div class="fv" style="color:${c}">${v}</div><div class="fs">${s}</div></div>`).join('');

/* ---------- D: Henderson ---------- */
const MS = [[K(`K_a = \\dfrac{[\\mathrm{H_3O^+}]\\,${tV('[\\mathrm{A^-}]')}}{[\\mathrm{HA}]}`), 'D2'], [K(`[\\mathrm{H_3O^+}] = K_a \\dfrac{[\\mathrm{HA}]}{${tV('[\\mathrm{A^-}]')}}`), 'D3'], [K('-\\log \\text{ of both sides}'), 'D4'], [K(`${pH} = ${pKa} + \\log \\dfrac{${salt}}{${acd}}`), 'D5'], [K(`${salt} = ${acd}:\\ ${pH} = ${pKa}`), 'D6']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="dr" id="ms${i}" style="top:${88 + i * 96}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const ds = $('#dS'), DB = 360;
mk(ds, 'line', { x1: 120, y1: DB, x2: 664, y2: DB, stroke: C.ink2, 'stroke-width': 3 });
const dSalt = mk(ds, 'rect', { x: 200, y: DB, width: 140, height: 0, rx: 8, fill: '#ECE4FB', stroke: OC, 'stroke-width': 3 }), dAcid = mk(ds, 'rect', { x: 444, y: DB, width: 140, height: 0, rx: 8, fill: '#DCE1EA', stroke: HC, 'stroke-width': 3 });
const dSt = txt(ds, 270, DB + 34, 'SALT · A⁻', { 'text-anchor': 'middle', 'font-size': 20, fill: OC, 'font-weight': 600 }), dAt = txt(ds, 514, DB + 34, 'ACID · HA', { 'text-anchor': 'middle', 'font-size': 20, fill: HC, 'font-weight': 600 });
const dR = txt(ds, 392, 110, '', { 'text-anchor': 'middle', 'font-size': 26, fill: HC, 'font-weight': 600 });

/* ---------- G: basic buffer + blood ---------- */
const GR = [[K(`\\text{pOH} = ${pKb} + \\log \\dfrac{${salt}}{[\\text{base}]}`), 'G2', 'pOH'], [K(`${pH} = 14 - \\text{pOH}`), 'G2', 'fourteen']];
$('#grs').innerHTML = GR.map(([s], i) => `<div class="dr" id="gr${i}" style="top:${110 + i * 140}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tGr = GR.map(g => wt(g[1], g[2]) - 0.1);
const gs = $('#gS');
const gA = ball(gs, 56, OC, 'HCO₃⁻', 22), gB = ball(gs, 56, C.ink2, 'H₂CO₃', 22); at(gA.g, 220, 200); at(gB.g, 220, 380);
const gH = ball(gs, 18, XC, 'H⁺', 15), gO = ball(gs, 22, '#fff', 'OH⁻', 14, BC);
const gT1 = txt(gs, 300, 130, 'ACID IN: HCO₃⁻ CATCHES H⁺', { 'font-size': 18, fill: OC, 'font-weight': 600 }), gT2 = txt(gs, 300, 310, 'BASE IN: H₂CO₃ CATCHES OH⁻', { 'font-size': 18, fill: HC, 'font-weight': 600 });
const gV = txt(gs, 392, 520, 'BLOOD pH STAYS ≈ 7.4', { 'text-anchor': 'middle', 'font-size': 24, fill: BC, 'font-weight': 600 });

/* ---------- C ---------- */
const bars = (p, s) => { const g = mk(p, 'g', {}); mk(g, 'line', { x1: 160, y1: 360, x2: 624, y2: 360, stroke: C.ink2, 'stroke-width': 3 }); const a = mk(g, 'rect', { x: 230, y: 360, width: 120, height: 0, rx: 8, fill: '#ECE4FB', stroke: OC, 'stroke-width': 3 }); const b = mk(g, 'rect', { x: 434, y: 360, width: 120, height: 0, rx: 8, fill: '#DCE1EA', stroke: HC, 'stroke-width': 3 }); txt(g, 290, 392, `SALT ${s}`, { 'text-anchor': 'middle', 'font-size': 18, fill: OC, 'font-weight': 600 }); txt(g, 494, 392, 'ACID 0.1 M', { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 }); return { g, a, b }; };
const cA = bars($('#caS'), '0.1 M'), cB = bars($('#cfS'), '0.2 M');
$('#caV').innerHTML = K(`${salt} / ${acd} = 1`); $('#cfV').innerHTML = K(`${salt} / ${acd} = 2`);
const th1 = PUC.think($('#th1'), { q: 'Which buffer has the higher pH?', opts: ['Buffer 1', 'Buffer 2'], right: 1, why: 'Buffer 2. More salt makes the log term positive, so pH is above pKa.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${pH} = ${pKa} + \\log \\dfrac{${salt}}{${acd}}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${pH} = ${pKa} + \\log (${salt}/${acd})`)],
  [K(`${salt}/${acd} = 0.2 / 0.1 = 2`)],
  [K('\\log 2 = 0.301')],
  [K(`${pH} = 4.76 + 0.30 = ${tB('5.06')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), wt('W5', 'So')];
const ws = $('#wS');
const wMet = mk(ws, 'g', {}); mk(wMet, 'rect', { x: 160, y: 90, width: 464, height: 220, rx: 16, fill: C.ink }); mk(wMet, 'rect', { x: 190, y: 116, width: 404, height: 130, rx: 8, fill: '#E8F5F5' }); txt(wMet, 392, 284, 'pH METER', { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 600 });
const wRd = txt(ws, 392, 206, '', { 'text-anchor': 'middle', 'font-size': 64, fill: BC, 'font-weight': 600 });
const wSc = scaleBar(ws, 72, 400, 640), wMk = mk(ws, 'path', { d: 'M-9 -12 L9 -12 L0 0 Z', fill: BC });
const wPk = mk(ws, 'g', {}); mk(wPk, 'line', { x1: 72 + 4.76 * 640 / 14, y1: 360, x2: 72 + 4.76 * 640 / 14, y2: 398, stroke: GC, 'stroke-width': 3 }); txt(wPk, 72 + 4.76 * 640 / 14 - 8, 352, 'pKa 4.76', { 'text-anchor': 'end', 'font-size': 16, fill: GC, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${pH} = ${pKa} + \\log (${acd} / ${salt}) = 4.46`)}`, right: `${K(`${pH} = ${pKa} + \\log (${salt} / ${acd}) = ${tO('5.06')}`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'SALT ON TOP', { 'font-size': 30, fill: OC, 'font-weight': 600 }), tq2 = txt(tsv, 40, 170, 'acid at the bottom', { 'font-size': 26, fill: HC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Define a buffer with examples; pH or ratio from Henderson-Hasselbalch' });
const OPT = ['3.16', '0.316', '0.50', '1.00'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'NH₃ / NH₄Cl buffer, pH 9.75 at 298 K, pKb = 4.75. Ratio [NH₄⁺]/[NH₃]?', qW: 900, opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 32 });
const so = PUC.solution($('#so'), [[K('\\text{pOH} = 14 - 9.75 = 4.25')], [K('4.25 = 4.75 + \\log r')], [K(`\\log r = -0.5,\\ r = ${tO('0.316')}`)], ['A flipped the ratio']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'So'), wt('A4', 'flipped') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · buffer solutions', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${pH} = ${pKa} + \\log (${salt} / ${acd})`), K(`\\text{pOH} = ${pKb} + \\log (${salt} / [\\text{base}]) \\qquad ${pH} = 14 - \\text{pOH}`),
    '<b>Acidic</b>: CH₃COOH + CH₃COONa (≈ 4.75) · <b>basic</b>: NH₄OH + NH₄Cl (≈ 9.25)', '<b>Salt = acid</b>: pH = pKa · adding water keeps the ratio', '<b>Blood</b>: H₂CO₃ / HCO₃⁻, pH ≈ 7.4'] });
const YQ = ['What two things make an acidic buffer?', 'Why does a buffer\'s pH barely change when you add water?', 'If salt and acid are equal, what is the pH of the buffer?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 70', topic: 'Why does chalk hardly dissolve? Solubility Product', y: 764 });

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
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 170; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
// a shot flying from (x0,y0) to (x1,y1) with an arc
const shot = (b, u, x0, y0, x1, y1) => at(b.g, M.lerp(x0, x1, u), M.lerp(y0, y1, u) - 60 * Math.sin(Math.PI * u));

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
    const tBd = [wt('H2', 'water'), wt('H2', 'blood'), wt('H2', 'fight')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'gives') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'trick') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P1', 'goal') - 0.1, out, { dx: 60, dy: 0, ...o });
    fade(pGoal, t, wt('P1', 'goal')); fade(pK1.g, t, tQr[0] - 0.3); fade(pK2.g, t, tQr[1] - 0.3);
    const ta = tQr[0], tb = tQr[1];
    const cyc = (t0, per) => { if (t < t0) return 0; const k = ((t - t0) % per) / per; return M.clamp(k / 0.45); };
    const u1 = cyc(ta, 2.6), u2 = cyc(tb, 2.6);
    shot(pS1, M.io(u1), 720, 120, 240, 175); fade(pS1.g, t, ta, 1e9, 0.2);
    shot(pS2, M.io(u2), 720, 470, 240, 340); fade(pS2.g, t, tb, 1e9, 0.2);
    M.setT(pL1, 'CATCHES H⁺ → HA'); M.setT(pL2, 'CATCHES OH⁻ → A⁻ + H₂O'); fade(pL1, t, ta + 0.8); fade(pL2, t, tb + 0.8);
    M.vis($('#pP'), t, wt('P4', 'resists') - 0.2, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#eb'), t, wt('S2', 'right') - 0.2, z, { dx: 60, dy: 0, ...o });
    const tAdd = wt('S3', 'add'), tW = T0('S4'), tB2 = T0('S5');
    [BW, BB].forEach((B, k) => { fade(B.g, t, k ? wt('S2', 'right') : wt('S2', 'left')); fade(B.met, t, k ? wt('S2', 'right') + 0.2 : wt('S2', 'left') + 0.2); fade(B.sc, t, k ? wt('S2', 'right') + 0.3 : T0('S2') + 0.3);
      B.drops.forEach((d, i) => { const u = M.io((t - tAdd - i * 0.15) / 0.7); attr(d, 'cx', (150 + i * 40).toFixed(1)); attr(d, 'cy', M.lerp(80, 250 + (i % 3) * 40, u).toFixed(1)); fade(d, t, tAdd + i * 0.15, k ? tB2 + 0.6 + i * 0.2 : 1e9, 0.2); }); });
    // water: pH 7 -> 2
    const vw = M.lerp(7, 2, M.io((t - wt('S4', 'crashes')) / 1.2)); M.setT(BW.rd, vw.toFixed(2)); fade(BW.rd, t, wt('S2', 'left') + 0.3);
    attr(BW.mkr, 'transform', `translate(${(90 + vw * 640 / 14).toFixed(1)},468)`); fade(BW.mkr, t, T0('S2') + 0.5);
    M.setT(bTx, 'NOTHING CATCHES H⁺'); fade(bTx, t, wt('S4', 'nothing'));
    // buffer: 4.76 -> 4.67, acetate catches protons
    const cu = M.io((t - wt('S5', 'catch')) / 1.0);
    BB.ms.forEach((m, i) => { const x = m.x + 4 * Math.sin(t * 2 + m.ph), y = m.y + 4 * Math.cos(t * 1.7 + m.ph); at(m.m.g, x, y); fade(m.m.g, t, wt('S2', 'right') + 0.3 + i * 0.04, 1e9, 0.2); if (m.isA && i < 12) { const v = M.clamp(cu * 1.6 - i * 0.05); attr(m.m.c, 'fill', mix(OC, C.ink2, v)); M.setT(m.m.tx, v > 0.5 ? '' : '−'); } });
    const vb = M.lerp(4.76, 4.67, M.io((t - wt('S5', 'moves')) / 1.0)); M.setT(BB.rd, vb.toFixed(2)); fade(BB.rd, t, wt('S2', 'right') + 0.5);
    attr(BB.mkr, 'transform', `translate(${(90 + vb * 640 / 14).toFixed(1)},468)`); fade(BB.mkr, t, wt('S2', 'right') + 0.5);
    M.setT(eTx, 'ACETATE CATCHES H⁺'); fade(eTx, t, wt('S5', 'catch'));
    M.setT(eCt, 'A⁻  0.10 → 0.09 mol'); M.setT(eCt2, 'HA  0.10 → 0.11 mol'); fade(eCt, t, wt('S5', 'become')); fade(eCt2, t, wt('S5', 'become') + 0.3);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#lDef'), t, tL1 + 0.3, 1e9, { dy: 16 }); avA(t, T1('L3') - 1.6, z);
    FT.forEach((f, i) => { const el = $('#ft' + i); const t0 = T0(f[5]); M.vis(el, t, t0 - 0.1, 1e9, { dy: 16 }); setBg(el, mix(C.soft, C.ac2, M.io((t - t0) / 0.3) * (i === 0 ? 1 - M.io((t - T0('L3')) / 0.3) : 1))); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.9); });
    M.vis($('#rr'), t, T0('D2') - 0.1, z, { dx: 60, dy: 0, ...o });
    // salt bar grows to 2x then settles back to equal at D6
    const t2 = T0('D5'), t6 = T0('D6'); const hs = 100 * (1 + M.io((t - t2 - 0.6) / 1.0) - M.io((t - t6 - 0.2) / 1.0)), ha = 100;
    attr(dSalt, 'y', (DB - hs).toFixed(1)); attr(dSalt, 'height', hs.toFixed(1)); attr(dAcid, 'y', DB - ha); attr(dAcid, 'height', ha);
    [dSalt, dAcid, dSt, dAt].forEach(e => fade(e, t, T0('D2') + 0.6));
    const r = hs / ha, ph = 4.76 + Math.log10(r);
    M.setT(dR, `SALT / ACID = ${r.toFixed(2)} → pH = ${ph.toFixed(2)}`); fade(dR, t, t2 + 0.4);
    $('#dEq').innerHTML = K(`\\log ${r.toFixed(2)} = ${Math.log10(r).toFixed(2)}`); fade($('#dEq'), t, t2 + 0.6);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    GR.forEach((_, i) => { const r = $('#gr' + i); M.vis(r.querySelector('.sn'), t, tGr[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tGr[i], 0.9); });
    M.vis($('#gP'), t, wt('G5', 'adding') - 0.2, 1e9, POP);
    M.vis($('#gb'), t, T0('G3') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade(gA.g, t, wt('G3', 'hydrogen')); fade(gB.g, t, wt('G3', 'carbonic')); fade(gV, t, T0('G3') + 0.5);
    const ta = wt('G4', 'acid'), tb = wt('G4', 'base');
    const u1 = M.io((t - ta) / 0.7), u2 = M.io((t - tb) / 0.7);
    shot(gH, u1, 720, 110, 276, 170); fade(gH.g, t, ta - 0.2, ta + 1.4, 0.2); fade(gT1, t, ta + 0.5);
    shot(gO, u2, 720, 470, 276, 350); fade(gO.g, t, tb - 0.2, tb + 1.4, 0.2); fade(gT2, t, tb + 0.5);
    const p1 = M.io((t - ta - 0.7) / 0.4) * (1 - M.io((t - ta - 1.6) / 0.4)), p2 = M.io((t - tb - 0.7) / 0.4) * (1 - M.io((t - tb - 1.6) / 0.4));
    attr(gA.g, 'transform', `translate(220,200) scale(${(1 + 0.1 * p1).toFixed(3)})`); attr(gB.g, 'transform', `translate(220,380) scale(${(1 + 0.1 * p2).toFixed(3)})`);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'two') - 0.3, zc, { dx: 60, dy: 0, ...o });
    [[cA, wt('C1', 'equal'), 100], [cB, wt('C1', 'twice'), 200]].forEach(([c, t0, h]) => { fade(c.g, t, t0 - 0.3); const u = M.io((t - t0) / 0.8); attr(c.a, 'y', (360 - h * u).toFixed(1)); attr(c.a, 'height', (h * u).toFixed(1)); attr(c.b, 'y', (360 - 100 * u).toFixed(1)); attr(c.b, 'height', (100 * u).toFixed(1)); });
    M.vis($('#caV'), t, wt('C1', 'equal') + 0.6, 1e9, { dy: 16 }); M.vis($('#cfV'), t, wt('C1', 'twice') + 0.8, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'More') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'pH') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'log') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'salt') + 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    [wMet, wSc].forEach(e => fade(e, t, T0('W2') + 0.4)); fade(wPk, t, wt('W2', 'four') - 0.2);
    const v = M.lerp(4.76, 5.06, M.io((t - tWs[3]) / 1.0));
    M.setT(wRd, t < tWs[3] - 0.2 ? '- - -' : v.toFixed(2)); attr(wMk, 'transform', `translate(${(72 + v * 640 / 14).toFixed(1)},398)`); fade(wMk, t, tWs[3]);
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'flip') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'salt') - 0.1 });
    fade(tq1, t, wt('X3', 'salt')); fade(tq2, t, wt('X3', 'Flip'));
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
