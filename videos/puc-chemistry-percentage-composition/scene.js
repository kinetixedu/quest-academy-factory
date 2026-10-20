// PUC Chemistry Ep 10: Percentage composition (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, mass rows, bars, pie, KaTeX): C teal, H ink, O violet, shared electrons orange
const CC = C.ac, HC = C.ink, OC = '#7A4FE0', EC = '#C8461B';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, C_ = s => tc(CC, `\\mathrm{${s}}`), H_ = s => tc(HC, `\\mathrm{${s}}`), O_ = s => tc(OC, `\\mathrm{${s}}`);
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const ETH = `${C_('C')}_2${H_('H')}_5${O_('O')}${H_('H')}`;
const RULE = `\\text{mass \\% of an element} = \\dfrac{\\text{mass of element in 1 mol}}{\\text{molar mass}} \\times 100`;

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  cube: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  bottle: ['M10 2h4', 'M10 2v4l-3 3v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9l-3-3V2', 'M7 13h10'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const PCT = { C: 52.14, H: 13.13, O: 34.73 };

/* ---------- title + H ---------- */
const JOBS = [['droplet', 'Water', 'HYDROGEN, OXYGEN', 'water'], ['cube', 'Sugar', 'CARBON, HYDROGEN, OXYGEN', 'sugar'], ['bottle', 'Sanitiser', 'WHICH ELEMENTS?', 'sanitiser']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const RW = [['droplet', 'Water · H₂O', 'HOW MUCH OF ITS MASS IS OXYGEN?'], ['cube', 'Sugar', 'HOW MUCH IS CARBON?'], ['bottle', 'Ethanol in sanitiser', 'C, H AND O · IN WHAT SHARE?']];
$('#jrs').innerHTML = RW.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');

/* ---------- P ---------- */
const QR = [['check', 'Check purity', 'A pure sample always gives the same percentages', 'pure'], ['search', 'Find a formula', 'Percentages lead to the formula of a new compound', 'formula']];
$('#qrs').innerHTML = QR.map(([ic, n, k], i) => `<div class="qr" id="qr${i}" style="top:${84 + i * 172}px"><i>${M.icon(ic, 32, C.ac, 2.4)}</i><div class="qt">${n}</div><div class="qk">${k}</div></div>`).join('');
const tQr = QR.map(q => wt('P3', q[3]));

/* ---------- S: build ethanol, weigh the parts ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="384"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const bondL = mk(bW, 'g', {}), atomL = mk(bW, 'g', {}), dotL = mk(bW, 'g', {});
const POS = { C1: [210, 258], C2: [370, 258], O: [520, 258], Ha: [210, 136], Hb: [92, 258], Hc: [210, 380], Hd: [370, 136], He: [370, 380], Hf: [640, 258] };
const START = { C1: [210, 258], C2: [370, 258], O: [700, 120], Ha: [120, 100], Hb: [40, 330], Hc: [120, 420], Hd: [470, 90], He: [470, 430], Hf: [760, 360] };
const A = {}; for (const k in POS) { const isC = k[0] === 'C', isO = k === 'O'; A[k] = { g: atomG(atomL, isC ? 40 : isO ? 40 : 26, isC ? CC : isO ? OC : HC, isC ? 'C' : isO ? 'O' : 'H', isC || isO ? 32 : 24), r: isC || isO ? 40 : 26 }; }
const bond = (a, c) => ({ a, c, n: 1, ln: [mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })], dt: [mk(dotL, 'circle', { r: 6, fill: EC }), mk(dotL, 'circle', { r: 6, fill: EC })] });
const drawBond = (bd, P, AA, u, eu) => {
  const [x1, y1] = P[bd.a], [x2, y2] = P[bd.c], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const r1 = AA[bd.a].r - 6, r2 = AA[bd.c].r - 6, mxp = (x1 + ux * r1 + x2 - ux * r2) / 2, myp = (y1 + uy * r1 + y2 - uy * r2) / 2;
  bd.ln.forEach((l, i) => { const k = (i - (bd.n - 1) / 2) * 17, ex = x1 + ux * r1 + px * k, ey = y1 + uy * r1 + py * k, fx = x2 - ux * r2 + px * k, fy = y2 - uy * r2 + py * k, sx = mxp + px * k, sy = myp + py * k;
    attr(l, 'x1', (sx + (ex - sx) * u).toFixed(1)); attr(l, 'y1', (sy + (ey - sy) * u).toFixed(1)); attr(l, 'x2', (sx + (fx - sx) * u).toFixed(1)); attr(l, 'y2', (sy + (fy - sy) * u).toFixed(1)); M.hide(l, u <= 0.01); });
  bd.dt.forEach((d, j) => { const i = j >> 1, s = j & 1 ? 1 : -1, k = (i - (bd.n - 1) / 2) * 17; attr(d, 'cx', (mxp + px * k + ux * s * 9).toFixed(1)); attr(d, 'cy', (myp + py * k + uy * s * 9).toFixed(1)); d.style.opacity = eu.toFixed(3); M.hide(d, eu <= 0.01); });
};
const BD = [bond('C1', 'C2'), bond('C2', 'O'), bond('C1', 'Ha'), bond('C1', 'Hb'), bond('C1', 'Hc'), bond('C2', 'Hd'), bond('C2', 'He'), bond('O', 'Hf')];
const tCC = wt('S1', 'carbon'), tOx = wt('S2', 'Oxygen'), tSix = wt('S2', 'six'), tPair = wt('S2', 'pair');
const HK = ['Ha', 'Hb', 'Hc', 'Hd', 'He', 'Hf'];
const tAt = { C1: tCC - 0.1, C2: tCC + 0.05, O: tOx - 0.1 }; HK.forEach((k, i) => { tAt[k] = tSix + i * 0.18; });
const tMove = { C1: tCC, C2: tCC, O: tOx, ...Object.fromEntries(HK.map((k, i) => [k, tSix + i * 0.18])) };
const tBd = [tCC + 0.6, tOx + 0.6, ...HK.map((k, i) => tSix + 0.6 + i * 0.18)];
const PT = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
$('#ptS').innerHTML = PT.map(e => `<span id="pt${e}">${e}</span>`).join('');
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Carbon owns more than half!' });
// mass rows + bar
const MR = [['C', CC, '2 × 12.01', '24.02 g'], ['H', HC, '6 × 1.008', '6.048 g'], ['O', OC, '1 × 16.00', '16.00 g']];
$('#mrs').innerHTML = MR.map(([e, c, a, v], i) => `<div class="mr" id="mr${i}" style="top:${76 + i * 84}px"><div class="el" style="background:${c}">${e}</div><div class="mt">${a}</div><div class="mv" style="color:${c}">${v}</div></div>`).join('') +
  `<div class="mr" id="mrT" style="top:328px;background:var(--ink)"><div class="mt" style="left:24px;color:#fff;font-family:Poppins">Molar mass, C₂H₅OH</div><div class="mv" style="color:#fff">46.068 g</div></div>`;
const SEG = [['C', CC], ['H', HC], ['O', OC]];
$('#bar0').innerHTML = SEG.map(([e, c]) => `<b id="sg${e}" style="background:${c}"></b>`).join('');
$('#bls').innerHTML = SEG.map(([e, c]) => `<div class="bl" id="bl${e}" style="top:490px;color:${c}"></div>`).join('');
const tMr = [wt('S3', 'Two'), wt('S4', 'Six'), wt('S4', 'One')], tTot = T0('S5'), tSplit = wt('S5', 'split');

/* ---------- B: atoms vs mass ---------- */
const AT = { C: 2 / 9 * 100, H: 6 / 9 * 100, O: 1 / 9 * 100 };
$('#cb0').innerHTML = SEG.map(([e, c]) => `<b id="ca${e}" style="background:${c}">${e} ${e === 'H' ? '6 of 9' : e === 'C' ? '2 of 9' : '1'}</b>`).join('');
$('#cb1').innerHTML = SEG.map(([e, c]) => `<b id="cm${e}" style="background:${c}">${e} ${PCT[e]}%</b>`).join('');
const th1 = PUC.think($('#th1'), { q: `Hydrogen is 6 of ethanol's 9 atoms. Is it most of ethanol's mass?`, opts: ['Yes', 'No'], right: 1, why: 'H atoms are the lightest. Six of them (6.048 g) weigh less than one O atom (16.00 g).' });

/* ---------- D: the rule, on water ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`M(${H_('H')}_2${O_('O')}) = 18.02\\,\\text{g mol}^{-1}`)],
  [K(`\\text{mass of } ${O_('O')} = 16.00\\,\\text{g}`)],
  [K(`16.00 \\div 18.02 = 0.8879`)],
  [K(`0.8879 \\times 100 = ${tc(OC, '88.79\\,\\%')}`)]], { label: 'STEP BY STEP · WATER', y0: 110, dy: 104 });
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
$('#gF').innerHTML = K(RULE);
$('#bar1').innerHTML = `<b id="wbO" style="background:${OC};left:0"></b><b id="wbH" style="background:${HC}"></b>`;
$('#wbl').innerHTML = `<div class="bl" id="wlO" style="top:400px;left:36px;color:${OC}">O 88.79%</div><div class="bl" id="wlH" style="top:400px;right:36px;color:${HC}">H</div>`;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(RULE);

/* ---------- W: ethanol, full numbers + pie ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`M = 2(12.01) + 6(1.008) + 16.00 = 46.068\\,\\text{g}`)],
  [K(`${C_('C')}: \\tfrac{24.02}{46.068} \\times 100 = ${tc(CC, '52.14\\,\\%')}`)],
  [K(`${H_('H')}: \\tfrac{6.048}{46.068} \\times 100 = ${tc(HC, '13.13\\,\\%')}`)],
  [K(`${O_('O')}: \\tfrac{16.00}{46.068} \\times 100 = ${tc(OC, '34.73\\,\\%')}`)],
  [K(`52.14 + 13.13 + 34.73 = 100 \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 80 });
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const ps = $('#pS'), PX = 392, PY = 270, PR = 170, PRi = 88;
const arc = (a0, a1) => { const p = (a, r) => [PX + r * Math.cos(a), PY + r * Math.sin(a)], L = a1 - a0 > Math.PI ? 1 : 0, [x0, y0] = p(a0, PR), [x1, y1] = p(a1, PR), [x2, y2] = p(a1, PRi), [x3, y3] = p(a0, PRi);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${PR} ${PR} 0 ${L} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} A${PRi} ${PRi} 0 ${L} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z`; };
mk(ps, 'circle', { cx: PX, cy: PY, r: (PR + PRi) / 2, fill: 'none', stroke: C.soft, 'stroke-width': PR - PRi });
const pie = SEG.map(([e, c]) => ({ e, p: mk(ps, 'path', { d: '', fill: c, stroke: '#fff', 'stroke-width': 3 }), l: txt(ps, 0, 0, `${e} ${PCT[e]}%`, { 'text-anchor': 'middle', 'font-size': 24, fill: c, 'font-weight': 600 }) }));
txt(ps, PX, PY - 4, '46.068 g', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 }); txt(ps, PX, PY + 24, '1 mol', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${C_('C')}: \\tfrac{12.01}{46.068} \\times 100 = 26.07\\,\\%`), right: K(`${C_('C')}: \\tfrac{2 \\times 12.01}{46.068} \\times 100 = 52.14\\,\\% \\quad (\\text{two C atoms})`) });
const tsv = $('#tS');
const t1 = mk(tsv, 'g', {}); { const g = atomG(t1, 32, CC, 'C', 26); attr(g, 'transform', 'translate(150 116)'); txt(t1, 150, 190, 'ONE C', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 }); }
const xT1 = mk(tsv, 'path', { d: 'M90 60 L210 170 M210 60 L90 170', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const t2 = mk(tsv, 'g', {}); mk(t2, 'line', { x1: 380, y1: 116, x2: 460, y2: 116, stroke: C.ink2, 'stroke-width': 6 }); [380, 460].forEach(x => { const g = atomG(t2, 32, CC, 'C', 26); attr(g, 'transform', `translate(${x} 116)`); }); txt(t2, 420, 190, 'C₂ · TWO C ATOMS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Direct mass percent numericals, and step one of finding a formula' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `Mass percent of nitrogen in urea, CO(NH₂)₂?<br><span style="font:500 26px 'IBM Plex Mono';color:var(--mute)">Given: C = 12, N = 14, O = 16, H = 1</span>`, qW: 780,
  opts: ['23.3%', '25.0%', '46.7%', '53.3%'], right: 2, optW: 474, optY: 330, optH: 110, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`M = 12 + 16 + 2 \\times 16 = 60`)], [K(`m(\\mathrm{N}) = 2 \\times 14 = 28`)], [K(`\\tfrac{28}{60} \\times 100 = \\textcolor{${C.ok}}{46.7\\,\\%}`)], ['A: one N ✗ · B: atom count ✗']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A3', 'Nitrogen'), wt('A3', 'Twenty', 1), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · percentage composition', y0: 92, dy: 76, txt: [0, 1, 1, 1, 1],
  lines: [K(RULE), '<b>A share of mass, not of atoms</b>: H is 6 of 9 atoms but 13.13% of the mass', '<b>Ethanol</b>: C 52.14% · H 13.13% · O 34.73% · total 100%', '<b>Water</b>: O is 88.79% of the mass', '<b>Multiply by the subscript first</b>: C₂ means 2 × 12.01'] });
const YQ = ['What does percentage composition tell you?', 'Why is hydrogen only 13% of ethanol\'s mass?', 'Find the mass percent of hydrogen in water.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 11', topic: 'Only the percentages: can you find the formula? Empirical and Molecular Formulae', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSplit - 0.3, 1.06, 1300, 640], [tB1 - 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const g = $('#gF .katex'); if (g && g.offsetWidth > 680) $('#gF').style.fontSize = Math.floor(30 * 680 / g.offsetWidth) + 'px';
  const sf = $('#stF .katex'); if (sf && sf.offsetWidth > 1500) $('#stF').style.fontSize = Math.floor(56 * 1500 / sf.offsetWidth) + 'px';
  document.querySelectorAll('#wl .sol .sx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(30 * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#trap .trapL .tx').forEach(q => { if (q.offsetWidth > 960) q.style.fontSize = Math.floor(30 * 960 / q.offsetWidth) + 'px'; });
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
    RW.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.15, 1e9, { dy: 16 }); setBg(el, mix(C.soft, C.ac2, i === 2 ? M.io((t - wt('H3', 'ethanol') + 0.1) / 0.3) : 0)); });
    M.vis($('#hjP'), t, wt('H4', 'Which') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hTz'), t, wt('H3', 'carbon') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pT'), t, wt('P1', 'percentage') - 0.1, { st: 0.06 }); M.rise($('#pD'), t, T0('P2') + 0.1, { st: 0.04 }); M.vis($('#pP'), t, wt('P2', 'each') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, T0('P3') - 0.3, out, { dx: 60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.2, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tQr[i]) / 0.3) * (i < 1 ? 1 - M.io((t - tQr[1]) / 0.3) : 1))); });
  }

  /* S: build ethanol */
  const sOn = t >= tS1 - 0.1 && t < tB1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#mb'), t, T0('S3') - 0.3, z, { dx: 60, dy: 0, ...o });
    const P = {};
    for (const k in POS) { const u = M.io((t - tMove[k]) / 0.7); P[k] = [M.lerp(START[k][0], POS[k][0], u), M.lerp(START[k][1], POS[k][1], u)]; attr(A[k].g, 'transform', `translate(${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)})`); fade(A[k].g, t, tAt[k], 1e9, 0.25); }
    BD.forEach((bd, i) => { const u = M.io((t - tBd[i]) / 0.4); drawBond(bd, P, A, u, u * M.io((t - Math.min(tBd[i], tPair - 0.2)) / 0.3)); });
    const TAG = [[tCC, 'C-C BOND'], [tOx, 'C-O BOND'], [tSix, '6 H ATOMS'], [tPair, 'SHARED ELECTRON PAIRS'], [T0('S3'), 'C₂H₅OH · ETHANOL'], [tSplit, 'MASS: C > O > H']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tCC, 1e9, POP);
    M.vis($('#ptL'), t, tS1 + 0.4, tSplit + 1.5, { dy: 8, outDur: 0.25, ody: 0 }); M.vis($('#ptS'), t, tS1 + 0.5, tSplit + 1.5, { dy: 8, outDur: 0.25, ody: 0 });
    [['C', tCC, CC], ['O', tOx, OC], ['H', tSix, HC]].forEach(([e, tt, c]) => { const el = $('#pt' + e), u = M.io((t - tt) / 0.3); setBg(el, mix('#FFFFFF', c, u)); el.style.color = mix(C.dim, '#FFFFFF', u); el.style.borderColor = mix(C.line, c, u); });
    avD(t, tSplit + 1.8, z);
    MR.forEach((_, i) => { const el = $('#mr' + i); M.vis(el, t, tMr[i] - 0.15, 1e9, { dx: -16, dy: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - tMr[i]) / 0.3) * (1 - M.io((t - tMr[i] - 1.4) / 0.4)))); });
    M.vis($('#mrT'), t, tTot - 0.1, 1e9, { dy: 12 });
    M.vis($('#bar0'), t, tSplit - 0.3, 1e9, { dy: 10 });
    let x = 0; SEG.forEach(([e], i) => { const u = M.io((t - tSplit - i * 0.35) / 0.6), w = 712 * PCT[e] / 100 * u, s = $('#sg' + e); snap(s, 'left', x.toFixed(1) + 'px'); snap(s, 'width', w.toFixed(1) + 'px');
      const l = $('#bl' + e); M.setT(l, `${e} ${(PCT[e] * u).toFixed(2)}%`); l.style.left = (36 + Math.min(x, 712 - 170) + (e === 'H' ? -20 : 0)) + 'px'; fade(l, t, tSplit + i * 0.35 + 0.1, 1e9, 0.2); x += 712 * PCT[e] / 100; });
  }

  /* B: atoms vs mass + think */
  const bOn = t >= tB1 - 0.1 && t < tD1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#cmp'), t, tB1 + 0.05, OUT('B3'), { dy: 36, ...o });
    [['ca', AT, wt('B1', 'six') - 0.1, 0], ['cm', PCT, wt('B2', 'mass') - 0.1, 1]].forEach(([pre, S, tt, r]) => {
      M.vis($('#cl' + r), t, tt - 0.2, 1e9, { dy: 8 }); M.vis($('#cs' + r), t, tt - 0.1, 1e9, { dy: 8 });
      let x = 0; SEG.forEach(([e], i) => { const u = M.io((t - tt - i * 0.25) / 0.5), w = 1320 * S[e] / 100; const el = $('#' + pre + e); snap(el, 'left', x.toFixed(1) + 'px'); snap(el, 'width', (w * u).toFixed(1) + 'px'); x += w; }); });
    const hiH = M.io((t - wt('B2', 'small') + 0.1) / 0.3); $('#cmH').style.boxShadow = `inset 0 0 0 ${(5 * hiH).toFixed(1)}px ${C.red}`; $('#caH').style.boxShadow = `inset 0 0 0 ${(5 * M.io((t - wt('B1', 'thirds')) / 0.3)).toFixed(1)}px ${C.red}`;
    M.vis($('#cP'), t, wt('B2', 'small') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, T0('B3') + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: T0('B3'), tOpts: wt('B3', 'most') - 0.1, tCount: T1('B3') + 0.05, dur: 3, tAns: T0('B4') - 0.02, tWhy: wt('B4', 'Hydrogen') });
  }

  /* D: rule on water */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#gF'), t, wt('D1', 'rule') - 0.1, 1.0);
    M.vis($('#wbL'), t, T0('D2') + 0.2, 1e9, { dy: 8 }); M.vis($('#bar1'), t, T0('D2') + 0.3, 1e9, { dy: 8 });
    const u = M.io((t - wt('D5', 'Oxygen') + 0.1) / 0.6), w = 712 * 0.8879 * u; snap($('#wbO'), 'width', w.toFixed(1) + 'px'); snap($('#wbH'), 'left', w.toFixed(1) + 'px'); snap($('#wbH'), 'width', (712 - w).toFixed(1) + 'px');
    $('#wbH').style.opacity = M.io((t - T0('D2') - 0.3) / 0.3).toFixed(3); fade($('#wlO'), t, wt('D5', 'eighty') - 0.1); fade($('#wlH'), t, wt('D5', 'eighty') - 0.1);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Percentage') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'share') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'atoms') + 0.2, 0.8);
  }

  /* W: ethanol numbers + pie */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 }); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    let a = -Math.PI / 2; const tp = [T0('W4'), T0('W5'), T0('W6')];
    pie.forEach(({ e, p, l }, i) => { const span = 2 * Math.PI * PCT[e] / 100, u = M.io((t - tp[i] - 0.3) / 0.8), a1 = a + span * Math.max(u, 0.0001); attr(p, 'd', u > 0 ? arc(a, a1) : ''); M.hide(p, u <= 0);
      const am = a + span / 2, lr = PR + 44; attr(l, 'x', (PX + lr * Math.cos(am)).toFixed(1)); attr(l, 'y', (PY + lr * Math.sin(am) + 8).toFixed(1)); fade(l, t, tp[i] + 0.9); a += span; });
    M.vis($('#wGp'), t, wt('W7', 'add') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X3', 'two') - 0.1, tRight: wt('X3', 'Always') - 0.1 });
    fade(t1, t, wt('X2', 'one') - 0.1); M.draw(xT1, t, wt('X3', 'two') - 0.1, 0.4); fade(t2, t, wt('X3', 'carbon') - 0.05);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Use'), tCount, tAns });
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
