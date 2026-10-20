// PUC Chemistry Ep 09: Mole concept and molar mass (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: C teal (element in play), H ink, O violet, the count N / N_A gold, Na slate
const CC = C.ac, HC = C.ink, OC = '#7A4FE0', GC = '#B7791F', NAC = '#5B6478';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, NA = tc(GC, 'N_A');
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); if (lab) txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sci = (v, d = 3) => { if (v <= 0) return '0'; const e = Math.floor(Math.log10(v) + 1e-9), m = v / Math.pow(10, e); return `${m.toFixed(d)} × 10${String(e).split('').map(c => SUP[c]).join('')}`; };

Object.assign(M.IC, {
  egg: ['M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4'],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tB1 = T0('B1'), tM1 = T0('M1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + H ---------- */
const JOBS = [['egg', 'A dozen', '12 EGGS', 'dozen'], ['file', 'A ream', '500 SHEETS', 'ream'], ['hash', 'Counting words', 'BIG NUMBERS MADE EASY', 'Counting']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const RW = [['egg', 'A dozen', '12 EGGS'], ['file', 'A ream', '500 SHEETS OF PAPER'], ['droplet', 'One sip of water', 'HOW MANY MOLECULES?']];
$('#jrs').innerHTML = RW.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tRw = [tMorph + 0.3, tMorph + 0.45, wt('H2', 'sip') - 0.1];

/* ---------- P: the mole + particle kinds ---------- */
const QR = [['Atoms', 'ONE ATOM · e.g. H', 'atoms'], ['Molecules', 'ATOMS JOINED · e.g. H₂O', 'molecules'], ['Ions', 'CHARGED · e.g. Na⁺ AND Cl⁻', 'ions']];
$('#qrs').innerHTML = QR.map(([n, k], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 136}px"><svg width="200" height="100" id="qv${i}"></svg><div class="qt">${n}</div><div class="qk">${k}</div></div>`).join('');
{ const a = atomG($('#qv0'), 30, HC, 'H', 26); attr(a, 'transform', 'translate(100 50)');
  const s1 = $('#qv1'); mk(s1, 'line', { x1: 64, y1: 66, x2: 100, y2: 40, stroke: C.ink2, 'stroke-width': 5 }); mk(s1, 'line', { x1: 136, y1: 66, x2: 100, y2: 40, stroke: C.ink2, 'stroke-width': 5 });
  [[64, 66, 18, HC, 'H'], [136, 66, 18, HC, 'H'], [100, 40, 26, OC, 'O']].forEach(([x, y, r, f, l]) => { const g = atomG(s1, r, f, l, r * 0.85); attr(g, 'transform', `translate(${x} ${y})`); });
  const s2 = $('#qv2'); [[66, 50, 20, NAC, 'Na⁺'], [140, 50, 30, CC, 'Cl⁻']].forEach(([x, y, r, f, l]) => { const g = atomG(s2, r, f, l, 17); attr(g, 'transform', `translate(${x} ${y})`); }); }
const tQr = QR.map(q => wt('P3', q[2]));

/* ---------- S: count by weighing ---------- */
const b = $('#bS');
mk(b, 'path', { d: 'M332 76 H452 L410 140 V156 H374 V140 Z', fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(b, 'rect', { x: 162, y: 300, width: 460, height: 20, rx: 8, fill: C.dim });
mk(b, 'rect', { x: 192, y: 320, width: 400, height: 120, rx: 18, fill: C.soft, stroke: C.ink, 'stroke-width': 3 });
mk(b, 'rect', { x: 252, y: 344, width: 280, height: 70, rx: 10, fill: C.ink });
const disp = txt(b, 392, 392, '0.000 g', { 'text-anchor': 'middle', 'font-size': 32, fill: C.ac2, 'font-weight': 600 });
const heap = mk(b, 'path', { d: '', fill: CC });
const rng = M.rng(11), POUR = Array.from({ length: 26 }, (_, i) => ({ c: mk(b, 'circle', { r: 6, fill: CC }), ph: i / 26, dx: (rng() - 0.5) * 22 }));
const one = mk(b, 'circle', { r: 9, fill: CC, cx: 392 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
const M1 = 1.992648e-23, LM0 = Math.log10(M1), LM1 = Math.log10(12);
const tS2 = T0('S2'), tP0 = wt('S3', 'Keep'), tP1e = wt('S4', 'twenty') + 0.3, tS5 = T0('S5');
const massAt = t => t < tS2 + 0.6 ? 0 : t < tP0 ? M1 : Math.pow(10, M.lerp(LM0, LM1, M.io(M.clamp((t - tP0) / (tP1e - tP0)))));
$('#oneA').innerHTML = `<span class="n">1 ATOM OF C-12</span> = 1.99 × 10⁻²³ g`;

/* ---------- D: derivation ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`m(^{12}\\textcolor{${CC}}{\\mathrm{C}}) = 1.992648 \\times 10^{-23}\\,\\text{g}`)],
  [K(`N = 12\\,\\text{g} \\div 1.992648 \\times 10^{-23}\\,\\text{g}`)],
  [K(`${NA} = 6.022 \\times 10^{23}\\,\\text{mol}^{-1}`)],
  [K(`1\\,\\text{u} \\times ${NA} \\approx 1\\,\\text{g}`)]], { label: 'STEP BY STEP', y0: 110, dy: 104 });
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
$('#frc').innerHTML = `<div class="fr" id="fA" style="top:84px;font:600 32px 'IBM Plex Mono'">12 g ÷ 1.992648 × 10⁻²³ g</div><div class="fr g" id="fB" style="top:140px;font:600 60px 'IBM Plex Mono'">= 6.022 × 10²³</div>`;
const MPR = [['H', '1.008 u', '1.008 g', HC], ['H₂O', '18.02 u', '18.02 g', OC], ['NaCl', '58.5 u', '58.5 g', CC]];
$('#mps').innerHTML = `<div class="lbl" id="mpL" style="left:36px;top:262px">× N_A · u PER PARTICLE BECOMES g PER MOLE</div>` + MPR.map(([n, a, g, c], i) => `<div class="mp" id="mp${i}" style="top:${300 + i * 80}px"><span style="color:${c}">${n} · ${a}</span><span>× N_A →</span><span style="color:${c}">${g}</span></div>`).join('');

/* ---------- B: one mole each on a balance ---------- */
const ms = $('#mS'), PVX = 800, PVY = 150, BL = 440;
mk(ms, 'path', { d: `M${PVX} ${PVY} L${PVX - 50} 520 H${PVX + 50} Z`, fill: C.soft, stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const beam = mk(ms, 'g', {}); mk(beam, 'rect', { x: -BL, y: -8, width: BL * 2, height: 16, rx: 8, fill: C.ink });
const pans = [0, 1].map(i => { const g = mk(ms, 'g', {}); mk(g, 'line', { x1: -120, y1: 140, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 }); mk(g, 'line', { x1: 120, y1: 140, x2: 0, y2: 0, stroke: C.ink2, 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M-150 140 H150 C150 166 100 176 0 176 C-100 176 -150 166 -150 140Z', fill: '#E9E5DA', stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: -90, y: 30, width: 180, height: 110, rx: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
  const r2 = M.rng(3 + i);
  for (let k = 0; k < (i ? 12 : 26); k++) { const x = -70 + r2() * 140, y = 50 + r2() * 76;
    if (!i) mk(g, 'circle', { cx: x, cy: y, r: 6, fill: HC });
    else { mk(g, 'circle', { cx: x, cy: y, r: 9, fill: OC }); mk(g, 'circle', { cx: x - 10, cy: y + 7, r: 5, fill: HC }); mk(g, 'circle', { cx: x + 10, cy: y + 7, r: 5, fill: HC }); } }
  txt(g, 0, 220, i ? '1 mol H₂O MOLECULES' : '1 mol H ATOMS', { 'text-anchor': 'middle', 'font-size': 22, fill: i ? OC : HC, 'font-weight': 600 });
  const cnt = txt(g, 0, -6, '6.022 × 10²³', { 'text-anchor': 'middle', 'font-size': 26, fill: GC, 'font-weight': 600 });
  const ms2 = txt(g, 0, 262, i ? '18.02 g' : '1.008 g', { 'text-anchor': 'middle', 'font-size': 34, fill: C.ink, 'font-weight': 600 });
  return { g, cnt, ms2 }; });
mk(ms, 'circle', { cx: PVX, cy: PVY, r: 12, fill: C.ac });
const th1 = PUC.think($('#th1'), { q: 'One mole of H atoms, one mole of water molecules. Which has more particles?', opts: ['H atoms', 'Water', 'Same number'], right: 2, why: `Both hold 6.022 × 10²³ particles. A water molecule is just heavier.` });

/* ---------- M: molar mass ---------- */
$('#mmU').innerHTML = K(`\\text{unit: } \\text{g mol}^{-1}`);
{ const d0 = $('#dv0'); mk(d0, 'path', { d: 'M110 60 V250 Q110 270 130 270 H230 Q250 270 250 250 V60', fill: 'none', stroke: C.ink, 'stroke-width': 4 }); mk(d0, 'rect', { x: 114, y: 150, width: 132, height: 116, rx: 10, fill: M.mix(OC, '#FFFFFF', 0.75) }); txt(d0, 260, 154, '18 mL', { 'font-size': 16, fill: C.mute, 'font-weight': 600 });
  const d1 = $('#dv1'); mk(d1, 'path', { d: 'M60 250 H300 L280 274 H80 Z', fill: C.dim }); mk(d1, 'path', { d: 'M90 250 Q180 120 270 250 Z', fill: M.mix(CC, '#FFFFFF', 0.55) }); }

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`1\\,\\text{mol} = ${tc(GC, '6.022 \\times 10^{23}')} \\text{ particles}`);

/* ---------- W: a sip of water ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`n = \\dfrac{m}{M} = \\dfrac{9}{18} = 0.5\\,\\text{mol}`)],
  [K(`N = n \\times ${NA}`)],
  [K(`= 0.5 \\times 6.022 \\times 10^{23}`)],
  [K(`= ${tc(GC, '3.011 \\times 10^{23}')}\\ \\text{molecules}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 92 });
const tWs = [T0('W3'), T0('W4'), wt('W4', 'Zero'), T0('W5')];
const FL = [['MASS', '9 g', C.ink], ['MOLES', '0.5 mol', C.ac], ['MOLECULES', '3.011 × 10²³', GC]];
$('#fls').innerHTML = FL.map(([l, v, c], i) => `<div class="fb" id="fb${i}" style="top:${84 + i * 176}px"><div class="fl1">${l}</div><div class="fv" style="color:${c}">${v}</div></div>`).join('') +
  `<div class="fa" id="fa0" style="top:196px">${M.icon('arrowR', 28, C.ac, 2.6)}<span>÷ M = 18 g mol⁻¹</span></div><div class="fa" id="fa1" style="top:372px">${M.icon('arrowR', 28, C.ac, 2.6)}<span>× N_A = 6.022 × 10²³ mol⁻¹</span></div>`;
document.querySelectorAll('.fa svg').forEach(s => { s.style.transform = 'rotate(90deg)'; });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Atoms in 9 g of water = 3.011 × 10²³', right: 'That counts molecules. Atoms = 3 × 3.011 × 10²³ = 9.033 × 10²³' });
const tsv = $('#tS'), wG = mk(tsv, 'g', {});
mk(wG, 'line', { x1: 280, y1: 120, x2: 230, y2: 165, stroke: C.ink2, 'stroke-width': 5 }); mk(wG, 'line', { x1: 280, y1: 120, x2: 330, y2: 165, stroke: C.ink2, 'stroke-width': 5 });
[[280, 120, 34, OC, 'O', 28], [230, 165, 22, HC, 'H', 18], [330, 165, 22, HC, 'H', 18]].forEach(([x, y, r, f, l, fs]) => { const g = atomG(wG, r, f, l, fs); attr(g, 'transform', `translate(${x} ${y})`); });
const w3 = txt(tsv, 280, 228, '1 MOLECULE = 3 ATOMS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Grams to moles to particles, and back, inside nearly every numerical' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `How many formula units are in 117 g of NaCl?<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: Na = 23 u, Cl = 35.5 u</span>`, qW: 780,
  opts: ['6.022 × 10²³', '1.2044 × 10²⁴', '2.4088 × 10²⁴', '7.05 × 10²⁵'], right: 1, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`n = 117 \\div 58.5 = 2\\,\\text{mol}`)], [K(`N = 2 \\times 6.022 \\times 10^{23}`)], [K(`= \\textcolor{${C.ok}}{1.2044 \\times 10^{24}}`)], ['C counts each ion ✗']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'one', 1), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · mole concept and molar mass', y0: 96, dy: 74, txt: [0, 1, 1, 0, 1],
  lines: [K(`${NA} = 6.022 \\times 10^{23}\\,\\text{mol}^{-1}`), '<b>1 mole</b>: as many particles as atoms in exactly 12 g of carbon-12', '<b>Molar mass</b>: mass of 1 mol in g · H₂O 18.02 g mol⁻¹ · NaCl 58.5 g mol⁻¹', K(`n = \\dfrac{m}{M}, \\quad N = n \\times ${NA}`), '<b>Atoms vs molecules</b>: one H₂O molecule holds 3 atoms'] });
const YQ = ['What is one mole, in your own words?', 'Why does a mole of water weigh more than a mole of H atoms?', 'How many moles are in 44 g of carbon dioxide?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 10', topic: 'How much of water\'s mass is oxygen? Percentage Composition', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tP0 - 0.2, 1.06, 700, 560], [tS5 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const ag = $('#age'); if (ag.offsetWidth > 712) ag.style.fontSize = Math.floor(24 * 690 / ag.offsetWidth) + 'px';
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
    RW.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tRw[i], 1e9, { dy: 16 }); setBg(el, mix(C.soft, C.ac2, i === 2 ? M.io((t - wt('H2', 'unthinkable')) / 0.3) : 0)); });
    M.vis($('#hjP'), t, wt('H4', 'same') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hTz'), t, wt('H3', 'weighs') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pm'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mN'), t, wt('P1', 'mole') - 0.1, 1e9, POP); M.rise($('#mD'), t, wt('P2', 'as') - 0.1, { st: 0.04 });
    M.vis($('#mP'), t, wt('P2', 'carbon') + 0.3, 1e9, POP);
    M.vis($('#pp'), t, T0('P3') - 0.3, out, { dx: 60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('P3', 'all') + 0.1) / 0.3))); });
  }

  /* S: count by weighing */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('D1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#ac'), t, tS1 + 0.3, z, { dx: 60, dy: 0, ...o });
    // one atom first
    const od = M.clamp((t - tS2 - 0.1) / 0.5); attr(one, 'cy', (150 + 140 * M.i3(od)).toFixed(1)); M.hide(one, t < tS2 + 0.1 || t > tP0 + 0.6);
    // the pour
    const pour = t >= tP0 && t < tP1e + 0.2;
    POUR.forEach(p => { const ph = ((t - tP0) * 1.7 + p.ph) % 1; attr(p.c, 'cx', (392 + p.dx * ph).toFixed(1)); attr(p.c, 'cy', (158 + 132 * ph * ph).toFixed(1)); M.hide(p.c, !pour); });
    const hu = M.io(M.clamp((t - tP0) / (tP1e - tP0))), hw = 26 + 150 * hu, hh = 6 + 64 * hu;
    attr(heap, 'd', `M${(392 - hw).toFixed(1)} 300 Q392 ${(300 - 2 * hh).toFixed(1)} ${(392 + hw).toFixed(1)} 300 Z`); M.hide(heap, t < tP0 + 0.1);
    const m = massAt(t), N = m / M1, done = t >= tP1e;
    M.setT(disp, m === 0 ? '0.000 g' : m < 0.001 ? sci(m, 2) + ' g' : m.toFixed(3) + ' g'); attr(disp, 'font-size', m > 0 && m < 0.001 ? 26 : 32);
    M.setT($('#cMv'), m === 0 ? '0 g' : m < 0.001 ? sci(m, 2) + ' g' : (done ? '12.000' : m.toFixed(3)) + ' g');
    M.setT($('#cNv'), N < 0.5 ? '0' : N < 1000 ? String(Math.round(N)) : done ? '6.022 × 10²³' : sci(N, 3));
    M.vis($('#cM'), t, tS1 + 0.5, 1e9, { dy: 12 }); M.vis($('#cN'), t, wt('S3', 'counter') - 0.2, 1e9, { dy: 12 });
    setBg($('#cN'), mix(C.soft, C.okBg, M.io((t - tP1e) / 0.3)));
    M.vis($('#oneA'), t, wt('S2', 'mass') - 0.1, 1e9, { dy: 10 }); M.vis($('#age'), t, wt('S5', 'longer') - 0.1, 1e9, POP);
    const TAG = [[tS1 + 0.4, 'CARBON-12 ATOMS'], [tS2 + 0.3, '1 ATOM · 1.99 × 10⁻²³ g'], [tP0, 'POURING'], [tP1e, '12 g OF CARBON-12'], [tS5, '6.022 × 10²³ ATOMS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.4, 1e9, POP);
    M.vis($('#ptL'), t, tS1 + 0.4, 1e9, { dy: 8 }); M.vis($('#ptS'), t, tS1 + 0.5, 1e9, { dy: 8 });
    { const el = $('#ptC'), u = M.io((t - wt('S1', 'carbon')) / 0.3); setBg(el, mix('#FFFFFF', CC, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, CC, u); }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tB1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('B1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#fA'), t, wt('D3', 'Divide') - 0.1, 0.8); M.vis($('#fB'), t, wt('D4', 'six') - 0.1, 1e9, POP);
    M.vis($('#mpL'), t, wt('D5', 'One') - 0.1, 1e9, { dy: 8 });
    MPR.forEach((_, i) => M.vis($('#mp' + i), t, wt('D5', 'So') - 0.2 + i * 0.25, 1e9, { dx: -16, dy: 0 }));
  }

  /* B: compare + think */
  const bOn = t >= tB1 - 0.1 && t < tM1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#cmp'), t, tB1 + 0.05, OUT('B3'), { dy: 36, ...o });
    const tl = M.io((t - wt('B2', 'water') + 0.1) / 0.9), an = M.lerp(0, 7, tl), r = an * Math.PI / 180;
    attr(beam, 'transform', `translate(${PVX} ${PVY}) rotate(${an.toFixed(2)})`);
    pans.forEach((p, i) => { const s = i ? 1 : -1, x = PVX + s * BL * Math.cos(r), y = PVY + s * BL * Math.sin(r); attr(p.g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      fade(p.g, t, tB1 + 0.3 + i * 0.4); fade(p.cnt, t, wt('B1', 'mole', 1) + i * 0.3); fade(p.ms2, t, i ? wt('B2', 'water') : wt('B2', 'hydrogen')); });
    M.vis($('#th1'), t, T0('B3') + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: T0('B3'), tOpts: wt('B3', 'Which') - 0.1, tCount: T1('B3') + 0.05, dur: 3, tAns: T0('B4') - 0.02, tWhy: wt('B4', 'Both') });
  }

  /* M: molar mass */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mm'), t, tM1 + 0.05, OUT('T1'), { dy: 36, ...o });
    M.rise($('#mmD'), t, tM1 + 0.2, { st: 0.05 }); M.vis($('#mmU'), t, wt('M1', 'unit') - 0.1, 1e9, { dy: 10 }); M.vis($('#mmP'), t, wt('M1', 'grams', 1) + 0.2, 1e9, POP);
    M.vis($('#ds0'), t, wt('M2', 'Water') - 0.1, 1e9, { dy: 24 }); M.vis($('#ds1'), t, wt('M2', 'Sodium') - 0.1, 1e9, { dy: 24 });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'A') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'not') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'mass') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tf = [wt('W2', 'nine'), wt('W3', 'Nine'), T0('W5')];
    FL.forEach((_, i) => { const el = $('#fb' + i); M.vis(el, t, tf[i] - 0.15, 1e9, { dy: 14 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tf[i]) / 0.3) * (1 - M.io((t - (tf[i + 1] ?? 1e9)) / 0.3)))); });
    M.vis($('#fa0'), t, wt('W3', 'divided') - 0.1, 1e9, { dy: -10 }); M.vis($('#fa1'), t, wt('W4', 'times') - 0.1, 1e9, { dy: -10 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Asked') - 0.1, tStrike: wt('X3', 'molecules') - 0.1, tRight: wt('X3', 'Each') - 0.1 });
    fade(wG, t, wt('X3', 'Each') - 0.1); fade(w3, t, wt('X3', 'three') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'In') });
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
