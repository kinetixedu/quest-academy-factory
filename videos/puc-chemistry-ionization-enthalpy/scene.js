// PUC Chemistry Ep 32: Ionization enthalpy (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, bars, recap): energy put in (ionization enthalpy) gold, the moving electron orange, element in play teal, nucleus pull teal
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', GT = '#F3E5C8';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tN = s => `\\textcolor{${NC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tE = s => `\\textcolor{${EC}}{${s}}`;
const dH = tG('\\Delta_i H');

Object.assign(M.IC, {
  button: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9 9h.01', 'M15 9h.01', 'M9 15h.01', 'M15 15h.01'],
  shirt: ['M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z'],
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
  flask: ['M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2', 'M8.5 2h7', 'M7 16h10'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tG1 = T0('G1'), tD1 = T0('D1'), tC1 = T0('C1'), tC2 = T0('C2'), tB2 = T0('B2'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['button', 'Loose button', 'ONE TUG', 'loose', 'EASY', NC], ['shirt', 'Stitched one', 'A HARD PULL', 'stitched', 'HARD', GC], ['magnet', 'Strong magnet', 'WILL NOT SLIDE', 'strong', 'HARD', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Na: stored under kerosene', 'stored'], ['Ne: hardly reacts at all', 'Neon']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('flask', 24, i ? C.mute : C.red, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'stored'), wt('H4', 'Neon')];

/* ---------- P: definition ---------- */
$('#mdefI').innerHTML = M.icon('zap', 28, '#fff', 2.2);
const QR = [['One isolated gas atom', 'ALONE', 'P3', 'isolated'], ['In its ground state', 'LOWEST ENERGY', 'P3', 'ground'], ['Measured in kJ per mole', 'UNIT', 'P4', 'kilojoules'], ['Always positive', 'ENERGY IN', 'P4', 'positive']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 96}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
$('#eqB').innerHTML = K(`\\mathrm{X(g)} \\rightarrow \\mathrm{X^{+}(g)} + ${tE('e^-')}`);
const ps = $('#pS'), PX = 392, PY = 330;
const pAt = mk(ps, 'g', {}); mk(pAt, 'circle', { cx: PX - 120, cy: PY, r: 70, fill: 'none', stroke: C.dim, 'stroke-width': 2 }); mk(pAt, 'circle', { cx: PX - 120, cy: PY, r: 30, fill: NC }); txt(pAt, PX - 120, PY + 9, 'X', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: '#fff' });
const pE = mk(ps, 'circle', { r: 11, fill: EC });
const pArr = mk(ps, 'path', { d: `M${PX + 60} ${PY + 90} V${PY - 70}`, stroke: GC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
const pArrH = mk(ps, 'path', { d: `M${PX + 46} ${PY - 56} L${PX + 60} ${PY - 78} L${PX + 74} ${PY - 56} Z`, fill: GC });
const pArrT = txt(ps, PX + 90, PY + 16, 'ENERGY IN', { 'font-size': 20, fill: GC, 'font-weight': 600 });
$('#pwP').innerHTML = K(`${dH} > 0`) + '<span>always: we put energy in</span>';

/* ---------- S: the bench (Na loses its 3s electron) ---------- */
const b = $('#bS'), AX = 330, AY = 270, RR = [56, 104, 156];
const rings = RR.map(r => mk(b, 'circle', { cx: AX, cy: AY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const nuc = mk(b, 'circle', { cx: AX, cy: AY, r: 36, fill: NC });
const nucT = txt(b, AX, AY + 10, 'Na', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 28, fill: '#fff', 'text-anchor': 'middle' });
const slot = (k, j, n) => { const a = -Math.PI / 2 + j * 2 * Math.PI / n; return [AX + RR[k] * Math.cos(a), AY + RR[k] * Math.sin(a)]; };
const inner = [...[0, 1].map(j => slot(0, j, 2)), ...Array.from({ length: 8 }, (_, j) => slot(1, j, 8))].map(([x, y]) => mk(b, 'circle', { cx: x, cy: y, r: 9, fill: HC }));
const E0 = [AX + RR[2] * Math.cos(-Math.PI / 4), AY + RR[2] * Math.sin(-Math.PI / 4)], E1 = [720, 76];
const teth = mk(b, 'line', { x1: AX, y1: AY, stroke: NC, 'stroke-width': 3, 'stroke-dasharray': '6 8' });
const outE = mk(b, 'circle', { r: 12, fill: EC });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
$('#bEq').innerHTML = K(`\\mathrm{Na(g)} \\rightarrow \\mathrm{Na^{+}(g)} + ${tE('e^-')} \\quad ${dH} = ${tG('496')}\\,\\text{kJ mol}^{-1}`);
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 576 + 170, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The second one is locked in tight!' });

/* ---------- G: period 2 chart ---------- */
const IE = [['Li', 520, 'G2', 'Lithium'], ['Be', 899, 'G2', 'Beryllium'], ['B', 801, 'G2', 'Boron'], ['C', 1086, 'G3', 'Carbon'], ['N', 1402, 'G3', 'Nitrogen'], ['O', 1314, 'G3', 'Oxygen'], ['F', 1681, 'G4', 'Fluorine'], ['Ne', 2080, 'G4', 'Neon']];
const tIE = IE.map(e => wt(e[2], e[3]));
const gs = $('#gS'), GY = 480, GK = 0.165;
mk(gs, 'line', { x1: 60, y1: GY, x2: 730, y2: GY, stroke: C.ink2, 'stroke-width': 2 });
const bars = IE.map(([s, v], i) => { const x = 104 + i * 82, g = mk(gs, 'g', {}); const r = mk(g, 'rect', { x: x - 28, y: GY, width: 56, height: 0, rx: 6, fill: GT }); const l = txt(g, x, GY + 32, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: HC }); const vt = txt(g, x, GY - 10, String(v), { 'text-anchor': 'middle', 'font-size': 19, fill: GC, 'font-weight': 600 }); return { x, g, r, vt, v }; });
const trend = mk(gs, 'path', { d: `M${bars[0].x} ${GY - 520 * GK - 44} L${bars[7].x} ${GY - 2080 * GK - 44}`, stroke: NC, 'stroke-width': 4, 'stroke-dasharray': '10 10', fill: 'none', 'stroke-linecap': 'round' });
const dip = (i) => { const g = mk(gs, 'g', {}); const x = bars[i].x, y = GY - bars[i].v * GK - 52; mk(g, 'circle', { cx: x, cy: y - 18, r: 20, fill: C.red }); g.insertAdjacentHTML('beforeend', `<g transform="translate(${x - 12} ${y - 30})">${M.icon('arrowD', 24, '#fff', 3)}</g>`); return g; };
const dipB = dip(2), dipO = dip(5);
const gTag = document.createElement('div'); gTag.className = 'btag'; gTag.style.cssText = 'left:36px;top:70px;background:var(--ac2);color:var(--ac)'; $('#gIn').appendChild(gTag);
const MS = [['Same outer shell across the period', 'D2'], [`One more proton each step: a stronger ${K(tN('\\text{pull}'))}`, 'D3'], ['Outer electrons held harder and closer', 'D4'], [`More energy to remove one: ${K(`${dH}\\uparrow`)}`, 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${96 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.25);
const dGrp = document.createElement('div'); dGrp.className = 'pillp'; dGrp.style.cssText = 'left:36px;top:470px'; dGrp.innerHTML = `Down group 1: Li <b class="g" style="font-family:'IBM Plex Mono'">520</b> → Na <b class="g" style="font-family:'IBM Plex Mono'">496</b>`; $('#mt').appendChild(dGrp);
// exceptions: orbital boxes
const box = (arr) => arr.map(s => `<i>${s}</i>`).join('');
const U = '<b class="u"></b>', D_ = '<b class="d"></b>', UO = '<b class="u" style="color:#C8461B"></b>', DO = '<b class="d" style="color:#C8461B"></b>';
$('#exs').innerHTML = `<div class="exh" id="exh0" style="top:80px;color:${C.ink2}">BE 2s² VERSUS B 2s² 2p¹</div>
  <div class="orow" id="eo0" style="left:36px;top:118px"><div class="ol">Be</div><div class="ob">${box([U + D_])}</div><div class="ob" style="margin-left:14px">${box(['', '', ''])}</div><div class="ov">899</div></div>
  <div class="orow" id="eo1" style="left:36px;top:184px"><div class="ol">B</div><div class="ob">${box([U + D_])}</div><div class="ob" style="margin-left:14px">${box([UO, '', ''])}</div><div class="ov">801</div></div>
  <div class="pillp" id="en0" style="left:36px;top:250px">2p is shielded more than 2s: easier to remove</div>
  <div class="exh" id="exh1" style="top:330px;color:${C.ink2}">N 2p³ VERSUS O 2p⁴</div>
  <div class="orow" id="eo2" style="left:36px;top:366px"><div class="ol">N 2p</div><div class="ob">${box([U, U, U])}</div><div class="ov">1402</div></div>
  <div class="orow" id="eo3" style="left:36px;top:432px"><div class="ol">O 2p</div><div class="ob">${box([U + DO, U, U])}</div><div class="ov">1314</div></div>
  <div class="pillp bad" id="en1" style="left:36px;top:500px">The paired electrons repel</div>`;
$('#exs').querySelectorAll('.ob i').forEach(x => { x.style.color = HC; });
const th1 = PUC.think($('#th1'), { q: 'Which loses an electron more easily: nitrogen or oxygen?', opts: ['Nitrogen', 'Oxygen'], right: 1, why: "Oxygen's paired 2p electron is pushed by its partner: 1314 < 1402 kJ/mol." });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\mathrm{N}\\; ${tG('1402')} > \\mathrm{O}\\; ${tG('1314')} \\qquad \\mathrm{Be}\\; ${tG('899')} > \\mathrm{B}\\; ${tG('801')}\\;\\; \\text{kJ mol}^{-1}`);

/* ---------- W: hydrogen from its energy ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{per atom: } ${tG('2.18 \\times 10^{-18}')}\\,\\text{J}`)],
  [K(`\\times N_A = 6.022 \\times 10^{23}\\,\\text{mol}^{-1}`)],
  [K(`= ${tG('1.31 \\times 10^{6}')}\\,\\text{J mol}^{-1}`)],
  [K(`\\approx ${tG('1313')}\\,\\text{kJ mol}^{-1}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), LX0 = 120, LX1 = 520, Y0 = 110, Y1 = 400;
const l0 = mk(ws, 'line', { x1: LX0, y1: Y0, x2: LX1, y2: Y0, stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '10 8' }), l1 = mk(ws, 'line', { x1: LX0, y1: Y1, x2: LX1, y2: Y1, stroke: HC, 'stroke-width': 5 });
const l0t = txt(ws, LX1 + 16, Y0 + 6, 'E = 0 · FREE', { 'font-size': 18, fill: C.ink2, 'font-weight': 600 }), l1t = txt(ws, LX1 + 16, Y1 + 6, 'n = 1 · H', { 'font-size': 18, fill: HC, 'font-weight': 600 });
const l1v = txt(ws, LX0, Y1 + 36, '-2.18 × 10⁻¹⁸ J', { 'font-size': 22, fill: HC, 'font-weight': 600 });
const wE = mk(ws, 'circle', { cx: 320, cy: Y1, r: 12, fill: EC });
const wArr = mk(ws, 'path', { d: `M220 ${Y1 - 14} V${Y0 + 22}`, stroke: GC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }), wArrH = mk(ws, 'path', { d: `M206 ${Y0 + 30} L220 ${Y0 + 8} L234 ${Y0 + 30} Z`, fill: GC });
const wArrT = txt(ws, 120, (Y0 + Y1) / 2 + 8, '+2.18 × 10⁻¹⁸ J', { 'font-size': 22, fill: GC, 'font-weight': 600, 'text-anchor': 'end', transform: '' });
attr(wArrT, 'x', 200);
const wMol = document.createElement('div'); wMol.className = 'btag'; wMol.style.cssText = 'left:36px;top:440px;background:var(--ink);color:#fff'; wMol.textContent = '× 6.022 × 10²³ ATOMS PER MOLE'; $('#wr').appendChild(wMol);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'O has more protons, so O beats N', right: `${K(`\\mathrm{N}\\;${tG('1402')} > \\mathrm{O}\\;${tG('1314')}`)}: O's paired 2p electrons repel` });
const tsv = $('#tS');
const pairB = (x0, hN, hO, col) => { const g = mk(tsv, 'g', {}); [[x0, hN, 'N'], [x0 + 70, hO, 'O']].forEach(([x, h, s]) => { mk(g, 'rect', { x, y: 190 - h, width: 52, height: h, rx: 6, fill: col }); txt(g, x + 26, 216, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: HC }); }); return g; };
const gW = pairB(70, 100, 130, C.redBg), gR = pairB(330, 130, 118, GT);
const xW = mk(tsv, 'path', { d: 'M50 60 L220 200 M220 60 L50 200', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const ckR = mk(tsv, 'g', {}); mk(ckR, 'circle', { cx: 490, cy: 70, r: 20, fill: C.ok }); ckR.insertAdjacentHTML('beforeend', `<g transform="translate(478 58)">${M.icon('check', 24, '#fff', 3)}</g>`);
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Order the first ionization enthalpies, with the B and O dips' });
const OPT = ['B < Be < C < O < N', 'Be < B < C < N < O', 'B < Be < C < N < O', 'Be < B < C < O < N'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Which is the correct order of first ionization enthalpy?', qW: 780,
  opts: OPT.map(s => K(`\\mathrm{${s}}`)), right: 0, optW: 474, optY: 300, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{C}\\,${tG('1086')} > \\mathrm{Be}, \\mathrm{B}`)], [K(`\\mathrm{B}\\,${tG('801')} < \\mathrm{Be}\\,${tG('899')}`)], [K(`\\mathrm{O}\\,${tG('1314')} < \\mathrm{N}\\,${tG('1402')}`)], ['C missed the O dip']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'C')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · ionization enthalpy', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\mathrm{X(g)} \\rightarrow \\mathrm{X^{+}(g)} + ${tE('e^-')} \\qquad ${dH} > 0\\;\\;(\\text{kJ mol}^{-1})`), '<b>Across a period</b>: rises (Li 520 → Ne 2080) · <b>down a group</b>: falls (Li 520 → Na 496)', '<b>Dips</b>: B 801 < Be 899 (2p shielded) · O 1314 < N 1402 (paired 2p repel)', '<b>Second</b> ionization enthalpy is higher: the ion is positive', '<b>Hydrogen</b>: 2.18 × 10⁻¹⁸ J × 6.022 × 10²³ ≈ 1313 kJ mol⁻¹'] });
const YQ = ['Why does ionization enthalpy rise across a period?', "Why is boron's value lower than beryllium's?", 'Why is the second ionization enthalpy of sodium so much higher than the first?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 33', topic: 'Why does chlorine release more than fluorine? Electron Gain Enthalpy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPull = wt('S3', 'pull'), tLeave = wt('S3', 'leaves');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPull - 0.3, 1.1, 640, 560], [T0('S4') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#mss .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(27 * 640 / q.offsetWidth) + 'px'; });
  const be = $('#bEq'); if (be.scrollWidth > 740) be.style.fontSize = Math.floor(40 * 740 / be.scrollWidth) + 'px';
}

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
    const tB = [wt('H2', 'easily'), wt('H2', 'tight'), wt('H2', 'tight') + 0.25];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'Some', 1) - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'tightly') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P3', 'Ionization') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : T1('P4') + 0.4; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'pull') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#eqB'), t, wt('P2', 'electron') - 0.1, 0.8);
    fade(pAt, t, wt('P2', 'pull'));
    const uE = M.io((t - wt('P2', 'off') + 0.1) / 0.8); attr(pE, 'cx', M.lerp(PX - 120 + 70 * Math.cos(-0.6), PX + 230, uE).toFixed(1)); attr(pE, 'cy', M.lerp(PY + 70 * Math.sin(-0.6), PY - 150, uE).toFixed(1)); fade(pE, t, wt('P2', 'pull'));
    const ea = wt('P2', 'energy'); M.draw(pArr, t, ea, 0.5); fade(pArrH, t, ea + 0.4); fade(pArrT, t, ea + 0.4);
    M.vis($('#pwP'), t, wt('P4', 'positive') - 0.1, 1e9, POP);
  }

  /* S: bench */
  const sOn = t >= tS1 - 0.1 && t < tG1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('G1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tPull + 0.6, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); const ofs = sh >= 1 ? 0 : (wv - 784) / 2; b.style.transform = `translateX(${ofs.toFixed(1)}px)`; $('#bEq').style.transform = `translateX(${ofs.toFixed(1)}px)`; }
    M.vis($('#eb1'), t, tPull - 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#eb2'), t, T0('S5') - 0.1, z, { dy: 36, ...o });
    rings.forEach((r, k) => { M.draw(r, t, tS1 + 0.3 + k * 0.15, 0.5); });
    fade(nuc, t, tS1 + 0.2); fade(nucT, t, tS1 + 0.3);
    inner.forEach((d, i) => fade(d, t, wt('S1', 'Two') + (i < 2 ? 0 : 0.4 + i * 0.04), 1e9, 0.15));
    // the pull: electron leaves along the tether, the bar fills
    const up = M.io((t - tPull) / 1.6), [ex, ey] = [M.lerp(E0[0], E1[0], up), M.lerp(E0[1], E1[1], up)];
    attr(outE, 'cx', ex.toFixed(1)); attr(outE, 'cy', ey.toFixed(1)); fade(outE, t, wt('S1', 'one') - 0.1, 1e9, 0.15);
    attr(teth, 'x2', ex.toFixed(1)); attr(teth, 'y2', ey.toFixed(1)); fade(teth, t, tPull - 0.1, T0('S4') + 0.2);
    const r3 = 1 - M.io((t - T0('S4') + 0.1) / 0.5); rings[2].style.opacity = (0.15 + 0.85 * r3).toFixed(3);
    M.setT(nucT, t >= T0('S4') ? 'Na⁺' : 'Na');
    const f1 = up * 496 / 1600; $('#bar1 i').style.width = (712 * f1).toFixed(1) + 'px';
    M.setT($('#ev1'), `${Math.round(496 * up)} kJ/mol`); fade($('#ev1'), t, tPull);
    // second electron: an inner one strains and snaps back while the second bar runs off the scale
    const t5 = wt('S5', 'second'), sv = Math.sin(M.clamp((t - t5) / 1.4) * Math.PI) * 18; const [ix, iy] = slot(1, 1, 8);
    attr(inner[3], 'cx', (ix + sv * 0.7).toFixed(1)); attr(inner[3], 'cy', (iy - sv * 0.7).toFixed(1)); attr(inner[3], 'fill', t > t5 && t < t5 + 1.4 ? EC : HC);
    $('#bar2 i').style.width = (712 * M.io((t - t5) / 1.4)).toFixed(1) + 'px'; fade($('#ev2'), t, wt('S5', 'harder'));
    const TAG = [[tS1 + 0.3, 'Na · 2, 8, 1'], [T0('S2'), 'OUTER e⁻ · SHELL 3'], [tPull, 'ENERGY IN'], [T0('S4'), 'Na⁺ · 2, 8'], [t5, 'NEXT ONE: SHELL 2']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    PUC.write($('#bEq'), t, wt('S4', 'Four') - 0.1, 0.8);
    avA(t, wt('S5', 'inner') + 0.2, z);
  }

  /* G + D + C: chart, why it rises, the two dips, think */
  const gOn = t >= tG1 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('T1');
    M.vis($('#gc'), t, tG1 + 0.05, z, { dy: 36, ...o });
    const sh = M.spring(t - tD1, M.HEAVY), gw = M.lerp(1600, 784, sh), gl = M.lerp(160, 976, sh);
    snap($('#gc'), 'width', (sh >= 1 ? 784 : gw.toFixed(1)) + 'px'); snap($('#gc'), 'left', (sh >= 1 ? 976 : gl.toFixed(1)) + 'px'); snap($('#gIn'), 'left', (sh >= 1 ? 0 : ((gw - 784) / 2).toFixed(1)) + 'px');
    let cur = -1; tIE.forEach((tt, i) => { if (t >= tt - 0.1) cur = i; });
    const hl = t < tD1 ? [cur] : t >= tC2 ? [4, 5] : t >= tC1 ? [1, 2] : [];
    bars.forEach((bb, i) => { const u = M.io((t - tIE[i] + 0.05) / 0.5), h = bb.v * GK * u; attr(bb.r, 'height', h.toFixed(1)); attr(bb.r, 'y', (GY - h).toFixed(1)); attr(bb.vt, 'y', (GY - h - 10).toFixed(1)); M.setT(bb.vt, String(Math.round(bb.v * u)));
      attr(bb.r, 'fill', hl.includes(i) ? GC : GT); bb.g.style.opacity = M.clamp((t - tIE[i] + 0.2) / 0.2).toFixed(3); M.hide(bb.g, t < tIE[i] - 0.2); });
    M.draw(trend, t, wt('G4', 'stronger') - 0.2, 0.8);
    fade(dipB, t, wt('C1', 'Boron'), T0('C2')); fade(dipO, t, wt('C2', 'oxygen'));
    M.setT(gTag, t < tD1 ? 'RISES ACROSS THE PERIOD' : t < tC1 ? 'MORE PROTONS, SAME SHELL' : 'TWO DIPS: B AND O'); M.vis(gTag, t, wt('G4', 'stronger') - 0.1, 1e9, POP);
    M.vis($('#mt'), t, tD1 + 0.15, tC1 - 0.3, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.6); });
    M.vis(dGrp, t, wt('D5', 'group') - 0.1, 1e9, POP);
    M.vis($('#ex'), t, tC1 + 0.05, OUT('B2'), { dx: -60, dy: 0, ...o });
    M.setT($('#exL'), t < tC2 ? 'DIP ONE · BORON' : 'DIP TWO · OXYGEN');
    [['#exh0', tC1 + 0.2], ['#eo0', wt('C1', 'beryllium') - 0.1], ['#eo1', wt('C1', 'Boron') + 0.3], ['#en0', wt('C1', 'shielded') - 0.1], ['#exh1', tC2 + 0.1], ['#eo2', wt('C2', 'Nitrogen', 1) - 0.1], ['#eo3', T0('C3')], ['#en1', wt('C3', 'push') - 0.1]].forEach(([s, tt]) => M.vis($(s), t, tt, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th1'), t, tB2 + 0.05, z, { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'nitrogen') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Its') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'stronger') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'bigger') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'enthalpy') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tl = T0('W2') + 0.5; M.draw(l1, t, tl, 0.4); fade(l1t, t, tl + 0.2); fade(l1v, t, wt('W2', 'minus') - 0.1); fade(wE, t, tl + 0.3);
    M.draw(l0, t, T0('W3') - 0.1, 0.4); fade(l0t, t, T0('W3') + 0.2);
    const ur = M.io((t - wt('W3', 'raise')) / 1.0); attr(wE, 'cy', M.lerp(Y1, Y0, ur).toFixed(1));
    M.draw(wArr, t, wt('W3', 'raise'), 0.9); fade(wArrH, t, wt('W3', 'raise') + 0.8); fade(wArrT, t, wt('W3', 'each'));
    M.vis(wMol, t, wt('W4', 'mole') - 0.1, 1e9, POP);
    const wp = $('#wP'), s6 = t >= T0('W6'); const k = s6 ? 'b' : 'a'; if (wp._k !== k) { wp._k = k; wp.innerHTML = s6 ? `${K(`${dH} \\approx ${tG('1313')}\\,\\text{kJ mol}^{-1}`)}` : `${K(`${dH} = 1.31 \\times 10^{6}\\,\\text{J mol}^{-1}`)}`; }
    M.vis(wp, t, T0('W5') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'oxygen') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Nitrogen') - 0.1 });
    fade(gW, t, wt('X2', 'higher') - 0.2); M.draw(xW, t, wt('X3', 'But'), 0.4); fade(gR, t, wt('X3', 'Nitrogen') - 0.05); fade(ckR, t, wt('X3', 'higher') - 0.05);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'order') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'boron') - 0.2, tCount, tAns });
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
