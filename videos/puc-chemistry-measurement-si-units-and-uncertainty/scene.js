// PUC Chemistry Ep 05: Measurement, SI units and uncertainty (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: the hopping point teal, the power n orange (bench, KaTeX, counter); litres gold, cm³ teal, m³ violet
const PC = C.ac, NC = '#C8461B', LC = '#B7791F', CMC = C.ac, M3C = '#7A4FE0';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const N_ = s => `\\textcolor{${NC}}{${s}}`, L_ = `\\textcolor{${LC}}{\\text{L}}`, CM = `\\textcolor{${CMC}}{\\text{cm}^3}`, M3 = `\\textcolor{${M3C}}{\\text{m}^3}`;

Object.assign(M.IC, {
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tU = T0('U1'), tS1 = T0('S1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['ruler', 'Tailor', 'MEASURES IN INCHES', 'tailor'], ['user', 'Doctor', 'HEIGHT IN CENTIMETRES', 'doctor'], ['flask', 'Lab', 'MEDICINE IN MILLIGRAMS', 'lab']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="qm" id="qm${i}">HOW SURE? <b>?</b></div></div>`).join('');
const KIT = [['Tape 1:', '66 cm', 'One'], ['Finer tape:', '66.0 cm', 'finer']];
$('#wqs').innerHTML = KIT.map(([w, v], i) => `<div class="wq" id="wq${i}">${M.icon('ruler', 24, C.ac, 2.2)}<span>${w}</span><b>${v}</b></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: number + unit, SI ---------- */
$('#mdefI').innerHTML = M.icon('scale', 28, '#fff', 2.2);
const UR = [['Length', 'metre', 'm', 'P4', 'metre'], ['Mass', 'kilogram', 'kg', 'P4', 'kilogram'], ['Time', 'second', 's', 'P4', 'second'], ['Electric current', 'ampere', 'A', 'P5', 'ampere'], ['Temperature', 'kelvin', 'K', 'P5', 'kelvin'], ['Amount of substance', 'mole', 'mol', 'P6', 'mole'], ['Luminous intensity', 'candela', 'cd', 'P6', 'candela']];
$('#urs').innerHTML = UR.map(([q, u, s], i) => `<div class="ur" id="ur${i}" style="top:${80 + i * 64}px"><div class="uq">${q}</div><div class="uu">${u}</div><div class="us">${s}</div></div>`).join('');
const tUr = UR.map(u => wt(u[3], u[4]));

/* ---------- U: prefixes ---------- */
const PX = [['nano', 'n', '10^{-9}', '1 nm', 'nano'], ['micro', 'µ', '10^{-6}', '1 µm', 'micro'], ['milli', 'm', '10^{-3}', '1 mg', 'milli'], ['centi', 'c', '10^{-2}', '1 cm', 'Centi'], ['base unit', '', '10^{0}', 'e.g. METRE', ''], ['kilo', 'k', '10^{3}', '1 km', 'Kilo']];
$('#pxs').innerHTML = PX.map(([n, s, p, e], i) => `<div class="px" id="px${i}" style="left:${57 + i * 252}px;${i === 4 ? 'background:var(--ink);color:#fff' : ''}"><div class="pn2">${n}</div><div class="ps2"${i === 4 ? ' style="color:var(--ac2)"' : ''}>${s || '·'}</div><div class="pp">${K(i === 4 ? `\\textcolor{#FFFFFF}{${p}}` : p)}</div><div class="pe"${i === 4 ? ' style="color:var(--ac2)"' : ''}>${e}</div></div>`).join('');
const tPx = PX.map(p => p[4] ? wt('U2', p[4]) : wt('U1', 'Prefixes'));

/* ---------- S: the bench: the hopping point ---------- */
$('#rule2').innerHTML = K(`N \\times 10^{\\,${N_('n')}}, \\qquad 1 \\le N < 10`);
const ROWS = [{ d: [0, 0, 0, 0, 1, 6], p0: 1, top: 216, lab: 'TINY: 0.00016' }, { d: [2, 3, 2, 5, 0, 8], p0: 3, top: 396, lab: 'BIG: 232.508' }];
const CW = 68, GAP = 26, X0 = (784 - (5 * (CW + GAP) + CW)) / 2;
const gx = p => X0 + p * (CW + GAP) - GAP / 2;
$('#rws').innerHTML = ROWS.map((r, j) => `<div class="rw" id="rw${j}" style="top:${r.top}px"><div class="rl">${r.lab}</div>${r.d.map((v, i) => `<div class="dg" id="d${j}_${i}" style="left:${X0 + i * (CW + GAP)}px">${v}</div>`).join('')}<div class="dp" id="dp${j}"></div><svg width="784" height="140" style="position:absolute;left:0;top:0;overflow:visible" id="ha${j}"></svg></div>`).join('');
const HA = [[wt('S4', 'Hop'), wt('S4', 'two'), wt('S4', 'three'), wt('S4', 'four')], [wt('S6', 'is') + 0.1, wt('S6', 'is') + 0.9]];
const arcs = HA.map((hs, j) => hs.map((_, k) => { const s = $('#ha' + j), p = ROWS[j].p0 + (j ? -k : k), q = p + (j ? -1 : 1);
  const a = mk(s, 'path', { d: `M${gx(p)} 108 Q${(gx(p) + gx(q)) / 2} 140 ${gx(q)} 108`, stroke: PC, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); return a; }));
const SA = ['0.00016 \\times 10^{0}', '0.0016 \\times 10^{-1}', '0.016 \\times 10^{-2}', '0.16 \\times 10^{-3}', '1.6 \\times 10^{-4}'];
const SB = ['232.508 \\times 10^{0}', '23.2508 \\times 10^{1}', '2.32508 \\times 10^{2}'];
const snK = s => K(s.replace(/10\^\{([^}]*)\}/, (m, e) => `10^{${N_(e)}}`));
const SAK = SA.map(snK), SBK = SB.map(snK);
const tS6 = T0('S6');
$('#crs').innerHTML = [['Hops of the point', 'hops'], ['Power of ten, n', 'pow']].map(([n, id], i) => `<div class="cr" id="cr${i}" style="top:${84 + i * 86}px"><div class="cn">${n}</div><div class="cv" id="${id}"></div></div>`).join('');
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const th1 = PUC.think($('#th1'), { q: 'Is the power of ten for 0.005 positive or negative?', opts: ['Positive', 'Negative'], right: 1, why: '0.005 = 5 × 10⁻³. Small numbers get negative powers.' });

/* ---------- D: significant figures ---------- */
const KR = [['Non-zero digits count', '285 → 3', 'D2'], ['Zeros between them count', '2.005 → 4', 'D3'], ['Leading zeros never count', '0.03 → 1', 'D4'], ['End zeros count after a point', '0.200 → 3', 'D5']];
$('#krs').innerHTML = KR.map(([q, a], i) => `<div class="kr" id="kr${i}" style="top:${80 + i * 98}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" id="kq${i}">${a}</div></div>`).join('');
const tKr = KR.map(k => wt(k[2], 'Rule')), tKq = [wt('D2', 'Two'), wt('D3', 'point'), wt('D4', 'point'), wt('D5', 'point', 1)];
// states: [time, digits (c count, p placeholder, e estimated, . point), caption]
const SF = [[wt('D1', 'digits'), [['6', 'c'], ['6', 'c'], ['.', '.'], ['0', 'e']], 'Sure, sure, then one estimated digit'], [tKr[0], [['2', 'c'], ['8', 'c'], ['5', 'c']], '3 significant figures'],
  [tKr[1], [['2', 'c'], ['.', '.'], ['0', 'c'], ['0', 'c'], ['5', 'c']], '4 significant figures'], [tKr[2], [['0', 'p'], ['.', '.'], ['0', 'p'], ['3', 'c']], '1 significant figure'],
  [tKr[3], [['0', 'p'], ['.', '.'], ['2', 'c'], ['0', 'c'], ['0', 'c']], '3 significant figures'], [T0('D6'), [['6', 'c'], ['6', 'c'], ['.', '.'], ['0', 'e']], '66.0 → 3 figures · 66 → only 2']];
const SFC = { c: [C.ac2, C.ink], p: [C.soft, C.dim], e: ['#FBEDE6', NC] };
const avD = PUC.avatar($('#dt'), { x: 36, y: 478, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So 66.0 promises more than 66!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K('66.0\\,\\text{cm} \\;\\rightarrow\\; 3\\ \\text{significant figures}');

/* ---------- W: dimensional analysis ---------- */
const wsol = PUC.solution($('#wl'), [[K(`1\\,${L_} = 1000\\,${CM} \\;\\Rightarrow\\; \\dfrac{1000\\,${CM}}{1\\,${L_}} = 1`)], [K(`2\\,\\cancel{${L_}} \\times \\dfrac{1000\\,${CM}}{1\\,\\cancel{${L_}}} = 2000\\,${CM}`)],
  [K(`2000\\,\\cancel{${CM}} \\times \\dfrac{1\\,${M3}}{10^{6}\\,\\cancel{${CM}}}`)], [K(`= \\textcolor{${C.ok}}{2 \\times 10^{-3}}\\,${M3}`)]], { label: 'WORKED EXAMPLE', y0: 168, dy: 104 });
const tWs = [T0('W3'), T0('W4'), T0('W5'), wt('W6', 'answer')];
const CHN = [[K(`2\\,${L_}`), 84, wt('W2', 'two')], [K(`2000\\,${CM}`), 254, wt('W4', 'cancel')], [K(`2 \\times 10^{-3}\\,${M3}`), 424, wt('W6', 'answer')]];
$('#chs').innerHTML = CHN.map(([k, y], i) => `<div class="ch" id="ch${i}" style="top:${y}px">${k}</div>`).join('') + [`× 1000 cm³ per 1 L`, `× 1 m³ per 10⁶ cm³`].map((s, i) => `<div class="chl" id="cl${i}" style="top:${208 + i * 170}px">↓ ${s}</div>`).join('');
const tCl = [T0('W3'), T0('W5')];

/* ---------- C: precision vs accuracy ---------- */
$('#dfs').innerHTML = [['<b>Precision</b>', 'readings agree with each other'], ['<b>Accuracy</b>', 'readings agree with the true value']].map(([a, b2], i) => `<div class="df" id="df${i}" style="top:${76 + i * 72}px">${a}<span>${b2}</span></div>`).join('');
const TR = [['A', '1.95 g, 1.93 g', 'PRECISE · NOT ACCURATE', '#FDF1E2', '#B05A12', [1.95, 1.93], 'C2', 'Student', 'Precise'], ['B', '1.94 g, 2.05 g', 'NEITHER', C.redBg, C.red, [1.94, 2.05], 'C3', 'Student', 'Neither'], ['C', '2.01 g, 1.99 g', 'PRECISE AND ACCURATE', C.okBg, '#1F6B3F', [2.01, 1.99], 'C4', 'Student', 'Precise']];
$('#trs').innerHTML = TR.map(([n, v, j, bg, c], i) => `<div class="tr2" id="tr${i}" style="top:${236 + i * 90}px"><div class="tn">${n}</div><div class="tv">${v}</div><div class="tj" id="tj${i}" style="background:${bg};color:${c}">${j}</div></div>`).join('');
const tTr = TR.map(r => wt(r[6], r[7])), tTj = TR.map(r => wt(r[6], r[8]));
const nl = $('#nlS'), NX = v => 110 + (v - 1.9) / 0.2 * 600, NY = [170, 300, 430];
const nlG = NY.map((y, i) => { const g = mk(nl, 'g', {}); mk(g, 'line', { x1: 100, y1: y, x2: 720, y2: y, stroke: C.ink2, 'stroke-width': 3, 'stroke-linecap': 'round' });
  [1.9, 1.95, 2.0, 2.05, 2.1].forEach(v => { mk(g, 'line', { x1: NX(v), y1: y - 8, x2: NX(v), y2: y + 8, stroke: C.ink2, 'stroke-width': 2 }); txt(g, NX(v), y + 34, v.toFixed(2), { 'text-anchor': 'middle', 'font-size': 15 }); });
  txt(g, 56, y + 9, 'ABC'[i], { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: C.ink, 'text-anchor': 'middle' }); return g; });
const tl = mk(nl, 'line', { x1: NX(2), y1: 108, x2: NX(2), y2: 470, stroke: C.ok, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const tlL = txt(nl, NX(2), 96, 'TRUE VALUE 2.00 g', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const nd = TR.map((r, i) => r[5].map(v => mk(nl, 'circle', { cx: NX(v), cy: NY[i], r: 12, fill: r[4] })));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Count every zero: 0.0050 has 5 significant figures', right: 'Leading zeros only hold the place: 0.0050 has 2' });
const tsv = $('#tS'), TD = ['0', '.', '0', '0', '5', '0'];
const tdc = TD.map((v, i) => { const g = mk(tsv, 'g', { transform: `translate(${70 + i * 80 - (i > 1 ? 40 : 0)} 70)` }); const r = v === '.' ? null : mk(g, 'rect', { x: 0, y: 0, width: 64, height: 88, rx: 10, fill: C.soft }); const tx = txt(g, v === '.' ? 16 : 32, 64, v, { 'text-anchor': 'middle', 'font-size': 50, fill: C.ink, 'font-weight': 600 }); return { g, r, tx, v, i }; });
const tLab = txt(tsv, 270, 214, '5 SIGNIFICANT FIGURES?', { 'text-anchor': 'middle', 'font-size': 17, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Count significant figures, write scientific notation, convert units' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A length is measured as <span style="font-family:'IBM Plex Mono'">0.02050 m</span>. How many significant figures does it have, and how is it written in scientific notation?`, qW: 780,
  opts: [K('4;\\ 2.050 \\times 10^{-2}\\,\\text{m}'), K('3;\\ 2.05 \\times 10^{-2}\\,\\text{m}'), K('5;\\ 20.50 \\times 10^{-3}\\,\\text{m}'), K('4;\\ 2.050 \\times 10^{2}\\,\\text{m}')], right: 0, optW: 474, optY: 330, optH: 100, optFs: 30 });
const so = PUC.solution($('#so'), [['Leading zeros: not counted'], ['2, 0, 5, 0 → 4 figures'], [K(`0.02050 = 2.050 \\times 10^{${N_('-2')}}`)], ['B drops a zero · D flips the sign']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'drops')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · measurement and uncertainty', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`N \\times 10^{${N_('n')}}, \\quad 1 \\le N < 10`), '<b>SI base units</b>: m, kg, s, A, K, mol, cd · agreed in 1960', '<b>Significant figures</b>: non-zero digits, zeros between, end zeros after a point', '<b>Precision</b>: readings agree · <b>Accuracy</b>: close to the true value', '<b>Dimensional analysis</b>: multiply by unit factors that equal 1'] });
const YQ = ['Write 0.00042 in scientific notation.', 'Can a set of readings be precise, but not accurate?', 'Convert 3 inches to cm, if 1 inch = 2.54 cm.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 06', topic: 'Where does a burning candle\'s mass go? Laws of Chemical Combination', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [HA[0][0] - 0.3, 1.1, 552, 540], [T0('S5'), 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(30 * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.kr').forEach(r => { const q = r.querySelector('.qt'), k = r.querySelector('.qk'); const room = 712 - 20 - k.offsetWidth - 106; if (q.offsetWidth > room) q.style.fontSize = Math.floor(27 * room / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#wl .sol .sx').forEach(s => { if (s.offsetWidth > 640) s.style.fontSize = Math.floor(28 * 640 / s.offsetWidth) + 'px'; });
}
let sfCur = -1;
const sfRender = i => { if (sfCur === i) return; sfCur = i; const st = SF[i][1]; let w = 0; st.forEach(([v]) => w += (v === '.' ? 30 : 84) + 10); w -= 10; let x = (784 - w) / 2;
  $('#sfN').innerHTML = st.map(([v, k]) => { const s = v === '.' ? `<div class="sdp" style="left:${x}px">.</div>` : `<div class="sd" style="left:${x}px;background:${SFC[k][0]};color:${SFC[k][1]}">${v}</div>`; x += (v === '.' ? 30 : 84) + 10; return s; }).join('');
  $('#sfC').textContent = SF[i][2]; };

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#qm' + i), t, wt('H2', 'doubt') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'hides') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'read') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('U1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P1', 'number') - 0.1, 1e9, POP);
    M.vis($('#nu0'), t, wt('P2', 'metres') - 0.1, 1e9, POP); M.vis($('#nu1'), t, wt('P2', 'millimetres') - 0.1, 1e9, POP);
    M.vis($('#si'), t, wt('P3', 'International') - 0.2, 1e9, { dy: 16 });
    M.vis($('#pw'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    UR.forEach((_, i) => { const el = $('#ur' + i); M.vis(el, t, tUr[i] - 0.1, 1e9, { dx: -14, dy: 0 }); const on = M.io((t - tUr[i] + 0.1) / 0.25) * (1 - M.io((t - (tUr[i + 1] ?? 1e9) + 0.1) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* U: prefixes */
  const uOn = t >= tU - 0.1 && t < tS1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.vis($('#pf'), t, tU + 0.05, OUT('S1'), { dy: 36, ...o });
    PX.forEach((_, i) => M.vis($('#px' + i), t, tPx[i] - 0.1, 1e9, { ...POP, sc: 0.85 }));
    M.vis($('#pfP'), t, wt('U2', 'nano') + 0.5, 1e9, POP);
  }

  /* S + B: the hopping point */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tShr = wt('S3', 'Watch');
    { const sh = M.spring(t - tShr + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    PUC.write($('#rule2'), t, wt('S2', 'scientific') - 0.1, 0.9);
    M.vis($('#rx'), t, tShr - 0.1, z, { dx: 60, dy: 0, ...o }); M.vis($('#ct'), t, tShr + 0.2, z, { dy: 36, ...o });
    M.vis($('#snR'), t, tShr + 0.4, 1e9, POP);
    ROWS.forEach((r, j) => {
      const tin = j ? tS6 : wt('S3', 'Take') - 0.1; M.vis($('#rw' + j), t, tin, 1e9, { dy: 16 });
      const hs = HA[j], dir = j ? -1 : 1; let p = r.p0, lift = 0;
      hs.forEach((h, k) => { const u = M.io((t - h) / 0.45); p += dir * u; lift = Math.max(lift, Math.sin(Math.PI * u) * 46); M.draw(arcs[j][k], t, h, 0.45); });
      const dp = $('#dp' + j); snap(dp, 'left', (gx(p) - 11).toFixed(1) + 'px'); snap(dp, 'transform', `translateY(${(-lift).toFixed(1)}px)`);
      if (!j) { const done = M.io((t - wt('S5', 'Now')) / 0.4); [0, 1, 2, 3].forEach(i => { const c = $('#d0_' + i); c.style.opacity = (1 - 0.75 * done).toFixed(3); }); [4, 5].forEach(i => setBg($('#d0_' + i), mix(C.soft, C.ac2, done))); }
      else { const done = M.io((t - HA[1][1] - 0.5) / 0.4); r.d.forEach((_, i) => setBg($('#d1_' + i), mix(C.soft, C.ac2, done))); }
    });
    // readouts
    const inB = t >= tS6;
    const hops = inB ? HA[1].filter(h => t >= h + 0.3).length : HA[0].filter(h => t >= h + 0.3).length;
    const key = (inB ? 'B' : 'A') + hops; const sn = $('#sn'); if (sn._k !== key) { sn._k = key; sn.innerHTML = inB ? SBK[hops] : SAK[hops]; }
    M.vis(sn, t, tShr + 0.2, 1e9, { dy: 10 });
    M.setT($('#hops'), inB ? `${hops} left` : `${hops} right`); M.setT($('#pow'), inB ? `+${hops}` : (hops ? `-${hops}` : '0')); $('#pow').style.color = NC; $('#hops').style.color = PC;
    [0, 1].forEach(i => { const el = $('#cr' + i); M.vis(el, t, tShr + 0.5 + i * 0.12, 1e9, { dx: -16, dy: 0 }); const fl = M.io((t - wt('B1', i ? 'takes' : 'hop') + 0.1) / 0.25) * (1 - M.io((t - T0('B2')) / 0.3)); setBg(el, mix(C.soft, C.ac2, fl)); });
    const TAG = [[tS1 + 0.3, 'HUGE AND TINY'], [wt('S3', 'Take'), '0.00016'], [HA[0][0], 'HOP RIGHT: n GOES DOWN'], [wt('S5', 'Now'), '1.6 × 10⁻⁴'], [tS6, 'HOP LEFT: n GOES UP'], [HA[1][1] + 0.5, '2.32508 × 10²']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s;
    if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'positive') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'It') });
  }

  /* D: significant figures */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dk'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dt'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    const si = tKr.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    KR.forEach((_, i) => { const el = $('#kr' + i); M.vis(el, t, tKr[i] - 0.1, 1e9, { dy: 16 }); M.vis($('#kq' + i), t, tKq[i] - 0.1, 1e9, POP);
      setBg(el, mix(C.soft, C.ac2, i === si && t < T0('D6') ? M.io((t - tKr[i] + 0.1) / 0.25) : 0)); });
    const fi = SF.reduce((a, s, i) => t >= s[0] - 0.1 ? i : a, 0); sfRender(fi);
    [...$('#sfN').children].forEach((c, k) => M.vis(c, t, SF[fi][0] - 0.1 + k * 0.07, 1e9, { ...POP, sc: 0.8 }));
    M.vis($('#sfC'), t, SF[fi][0] + 0.3, 1e9, { dy: 10 });
    M.vis($('#sfL'), t, SF[0][0] + 0.4, 1e9, { dy: 10 });
    M.setT($('#dtL'), fi === 5 ? "AARAV'S READING" : 'WHICH DIGITS COUNT');
    avD(t, wt('D6', 'three') + 0.2, out);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Every') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'promise') - 0.4, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'measured') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    CHN.forEach(([, , tt], i) => { const el = $('#ch' + i); M.vis(el, t, tt - 0.1, 1e9, { dy: 16 }); setBg(el, i === 2 ? mix(C.soft, C.okBg, M.io((t - tt - 0.3) / 0.3)) : C.soft); });
    tCl.forEach((tt, i) => M.vis($('#cl' + i), t, tt, 1e9, { dy: -10 }));
  }

  /* C: precision vs accuracy */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    [wt('C1', 'Precision'), wt('C1', 'Accuracy')].forEach((tt, i) => M.vis($('#df' + i), t, tt - 0.1, 1e9, { dy: 12 }));
    M.vis($('#cpn'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    nlG.forEach((g, i) => fade(g, t, T0('C2') + 0.2 + i * 0.12)); M.draw(tl, t, wt('C2', 'true') - 0.1, 0.5); tlL.style.opacity = M.clamp((t - wt('C2', 'true')) / 0.3);
    TR.forEach((r, i) => { M.vis($('#tr' + i), t, tTr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#tj' + i), t, tTj[i] - 0.1, 1e9, POP);
      nd[i].forEach((d, k) => { const u = M.o3((t - tTr[i] - 0.6 - k * 0.5) / 0.3); attr(d, 'r', (12 * u).toFixed(2)); M.hide(d, u <= 0); }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'count') - 0.1, tStrike: wt('X3', 'leading') - 0.1, tRight: wt('X3', 'Only') - 0.1 });
    const fx = M.io((t - wt('X3', 'Only') + 0.1) / 0.4);
    tdc.forEach(d => { const inn = M.clamp((t - wt('X2', 'zero') + 0.1 - d.i * 0.06) / 0.2); d.g.style.opacity = inn; M.hide(d.g, inn <= 0); if (d.r) { const c = d.i < 4 ? [C.soft, C.ink, C.soft, C.dim] : [C.soft, C.ink, C.ac2, C.ink]; attr(d.r, 'fill', mix(c[0], c[2], fx)); attr(d.tx, 'fill', mix(c[1], c[3], fx)); } });
    M.setT(tLab, fx > 0.5 ? '2 SIGNIFICANT FIGURES' : '5 SIGNIFICANT FIGURES?'); attr(tLab, 'fill', fx > 0.5 ? C.ok : C.red); tLab.style.opacity = M.clamp((t - wt('X2', 'five')) / 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
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
