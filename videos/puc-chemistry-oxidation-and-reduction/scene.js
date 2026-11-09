// PUC Chemistry Ep 71: Oxidation and reduction (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: electron e- orange (canon), the element oxidised (Zn, Na, Mg) teal, Cu2+ blue, Cu metal copper-brown, Cl green, oxygen violet, oxidised/loss teal tag, reduced/gain blue tag
const NC = C.ac, HC = C.ink, EC = '#C8461B', CU2 = '#2B6CB0', CUM = '#A0522D', CL = '#3C9A5F', OC = '#7A4FE0', OK = C.ok, RD = C.red, GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const col = (c, s) => `\\textcolor{${c}}{${s}}`;
const E2 = col(EC, '2e^-'), E1 = col(EC, 'e^-');
const ZN = col(NC, '\\mathrm{Zn}'), ZN2 = col(NC, '\\mathrm{Zn^{2+}}'), CUI = col(CU2, '\\mathrm{Cu^{2+}}'), CUA = col(CUM, '\\mathrm{Cu}');
const NA = col(NC, '\\mathrm{Na}'), NAP = col(NC, '\\mathrm{Na^+}'), CL2 = col(CL, '\\mathrm{Cl_2}'), CLM = col(CL, '\\mathrm{Cl^-}');
const at = (p, r, fill, s, fs = 16, tc = '#fff') => { const g = mk(p, 'g', {}); const c = mk(g, 'circle', { cx: 0, cy: 0, r, fill }); const tx = s ? txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: tc, 'text-anchor': 'middle' }) : null; g._c = c; g._t = tx; return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const mv = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };

Object.assign(M.IC, {
  gate: ['M4 21V5', 'M20 21V5', 'M4 9h16', 'M4 15h16', 'M9 9v6', 'M14 9v6'],
  apple: ['M12 7c-3-2-8-1-8 5 0 4 3 9 6 9 1 0 1.5-.5 2-.5s1 .5 2 .5c3 0 6-5 6-9 0-6-5-7-8-5z', 'M12 7c0-2 1-4 3-4'],
  flame: ['M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3 0-6 1-8z'],
  swap: ['M7 7h13l-4-4', 'M17 17H4l4 4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tR1 = T0('R1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['gate', 'Iron gate', 'TURNS BROWN', 'gate', 'RUST', CUM], ['apple', 'Cut apple', 'BROWNS IN AIR', 'apple', 'BROWN', GC], ['flame', 'Gas flame', 'BURNS BLUE', 'flame', 'FIRE', EC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Rain and air on the iron', 'Rain', 'H4'], ['A slow change, for months', 'months', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('swap', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: classical ---------- */
const QR = [['Oxidation: add oxygen', 'ADD O', 'P1', 'adding', NC], ['Oxidation: remove hydrogen', 'REMOVE H', 'P3', 'removing', NC], ['Reduction: the opposite', 'REMOVE O', 'P4', 'opposite', CU2], ['Both together: redox', 'REDOX', 'P5', 'redox', EC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const eqrow = (id, top, tex, tag, c) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${c}">${tag}</span></div>`;
const MG = col(NC, '\\mathrm{Mg}'), OO = col(OC, '\\mathrm{O_2}');
const PE = [[`2${MG} + ${OO} \\rightarrow 2\\mathrm{MgO}`, 'Mg OXIDISED', NC, () => wt('P2', 'Magnesium')], [`2\\mathrm{H_2S} + ${OO} \\rightarrow 2\\mathrm{S} + 2\\mathrm{H_2O}`, 'H₂S OXIDISED', NC, () => wt('P3', 'sulphide')], [`\\mathrm{CuO} + \\mathrm{H_2} \\rightarrow ${CUA} + \\mathrm{H_2O}`, 'CuO REDUCED', CU2, () => wt('P4', 'copper')], [`\\mathrm{H_2} \\rightarrow \\mathrm{H_2O}\\ \\ (\\text{same reaction})`, 'H₂ OXIDISED', NC, () => wt('P5', 'hydrogen')]];
$('#pes').innerHTML = PE.map(([e, tg, c], i) => eqrow('pe' + i, 84 + i * 92, e, tg, c)).join('');
const tPe = PE.map(p => p[3]());

/* ---------- S: zinc in copper sulphate ---------- */
const b = $('#bS');
const sol = mk(b, 'rect', { x: 156, y: 170, width: 472, height: 326, rx: 14, fill: '#BFD9F2' });
mk(b, 'path', { d: 'M152 110 V480 a20 20 0 0 0 20 20 H612 a20 20 0 0 0 20 -20 V110', stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
mk(b, 'rect', { x: 362, y: 70, width: 60, height: 380, rx: 8, fill: '#C9CED8', stroke: C.ink2, 'stroke-width': 3 });
txt(b, 392, 96, 'Zn', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: HC });
const SITES = [[362, 230], [422, 270], [362, 330], [422, 370], [362, 410], [422, 210]];
const NT = 5;
const zn = SITES.map(() => at(b, 15, NC, 'Zn', 12));
const cu = [0, 1, 2, 3, 4, 5, 6, 7].map(() => at(b, 15, CU2, 'Cu²⁺', 10));
const els = [0, 1, 2, 3, 4].map(() => [mk(b, 'circle', { r: 7, fill: EC }), mk(b, 'circle', { r: 7, fill: EC })]);
const ZW = [[230, 240], [560, 300], [210, 360], [570, 420], [250, 450]], CW = [[250, 300], [540, 240], [220, 420], [560, 380], [270, 200], [520, 450], [470, 200], [300, 470]];
const lg = mk(b, 'g', {}); [[NC, 'Zn / Zn²⁺', 190], [CU2, 'Cu²⁺', 360], [CUM, 'Cu', 480], [EC, 'e⁻', 580]].forEach(([c, s, x]) => { mk(lg, 'circle', { cx: x, cy: 546, r: 9, fill: c }); txt(lg, x + 16, 553, s, { 'font-size': 19, fill: HC, 'font-weight': 600 }); });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
let TE = [];
const trT = () => { const a = wt('S2', 'gives'), s4 = T0('S4'); return [[a, wt('S2', 'leaves'), wt('S3', 'catches'), wt('S3', 'sticks')], ...[0, 1, 2, 3].map(k => { const e = s4 + 0.2 + k * 0.9; return [e, e + 0.3, e + 0.6, e + 1.2]; })]; };
$('#bEq').innerHTML = K(`${ZN}\\mathrm{(s)} + ${CUI}\\mathrm{(aq)} \\rightarrow ${ZN2}\\mathrm{(aq)} + ${CUA}\\mathrm{(s)}`);
const ET = [['ets0', 'ZINC LOST', NC], ['ets1', 'COPPER IONS GAINED', CU2]];
$('#ets').innerHTML = ET.map(([id, s, c], i) => `<div class="tile" id="${id}" style="top:${170 + i * 112}px"><b id="${id}n" style="color:${EC};min-width:150px">0 e⁻</b><span style="color:${c};font-weight:600">${s}</span><span id="${id}k" style="margin-left:auto;color:${OK};font:700 30px Poppins"></span></div>`).join('');

/* ---------- L ---------- */
$('#hcI').innerHTML = M.icon('swap', 26, '#fff', 2.4);
$('#lEq').innerHTML = K(`\\text{loss of } ${E1} = \\text{oxidation}`);
const hs = $('#hS');
const hA = at(hs, 52, NC, 'Zn', 30), hB = at(hs, 52, CU2, 'Cu²⁺', 24); place(hA, 200, 250); place(hB, 584, 250);
const hArc = mk(hs, 'path', { d: 'M250 210 C330 120 454 120 534 210', stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' });
const hE = [mk(hs, 'circle', { r: 9, fill: EC }), mk(hs, 'circle', { r: 9, fill: EC })];
const hT1 = txt(hs, 200, 350, 'LOST 2e⁻', { 'text-anchor': 'middle', 'font-size': 22, fill: EC, 'font-weight': 600 }), hT2 = txt(hs, 584, 350, 'GAINED 2e⁻', { 'text-anchor': 'middle', 'font-size': 22, fill: EC, 'font-weight': 600 });
const hO1 = txt(hs, 200, 400, 'OXIDISED', { 'text-anchor': 'middle', 'font-size': 26, fill: NC, 'font-weight': 700 }), hO2 = txt(hs, 584, 400, 'REDUCED', { 'text-anchor': 'middle', 'font-size': 26, fill: CU2, 'font-weight': 700 });

/* ---------- D: half reactions + OIL RIG ---------- */
const MS = [[K(`${ZN} \\rightarrow ${ZN2} + ${E2}`), 'D2', 'OXIDATION'], [K(`${CUI} + ${E2} \\rightarrow ${CUA}`), 'D3', 'REDUCTION'], [K(`${ZN} + ${CUI} \\rightarrow ${ZN2} + ${CUA}`), 'D4', 'ADD: e⁻ CANCEL']];
$('#mss').innerHTML = MS.map(([s, , tg], i) => `<div class="ms" id="ms${i}" style="top:${100 + i * 120}px"><div class="sn">${i + 1}</div><div class="stx" style="font-size:40px">${s}</div></div><div class="gl" id="mg${i}" style="top:${158 + i * 120}px;left:96px;color:${i ? (i === 1 ? CU2 : EC) : NC}">${tg}</div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const RL = [['OIL: Oxidation Is Loss', K(`\\text{gives away } ${E1}`), () => wt('R2', 'Oxidation')], ['RIG: Reduction Is Gain', K(`\\text{takes } ${E1}`), () => wt('R2', 'Reduction')], ['Half reaction: one side of the swap', K(`${ZN} \\rightarrow ${ZN2} + ${E2}`), () => T0('R3')], ['Electrons never vanish', K(`${E1}\\ \\text{lost} = ${E1}\\ \\text{gained}`), () => T0('R4')]];
$('#rls').innerHTML = RL.map(([a, k], i) => `<div class="rule" id="rl${i}" style="top:${84 + i * 114}px"><div class="nn">${i + 1}</div><div class="rt">${a}</div><div class="rk">${k}</div></div>`).join('');
const tRl = RL.map(r => r[2]());

/* ---------- C: agents ---------- */
const trow = (id, top, s, tag, c) => `<div class="eqr" id="${id}" style="top:${top}px;font:600 26px Poppins">${s}<span class="tg" style="color:${c}">${tag}</span></div>`;
$('#car').innerHTML = trow('ca0', 96, 'Gives electrons away', 'THROWS', EC) + trow('ca1', 190, 'Gets oxidised itself', 'OXIDISED', NC) + trow('ca2', 284, 'Example: zinc', 'Zn', NC) + `<div class="vt" id="caV" style="font-size:34px">${K(`${ZN} \\rightarrow ${ZN2} + ${E2}`)}</div>`;
$('#cfr').innerHTML = trow('cf0', 96, 'Takes electrons', 'CATCHES', EC) + trow('cf1', 190, 'Gets reduced itself', 'REDUCED', CU2) + trow('cf2', 284, 'Example: copper ions', 'Cu²⁺', CU2) + `<div class="vt" id="cfV" style="font-size:34px">${K(`${CUI} + ${E2} \\rightarrow ${CUA}`)}</div>`;
const th1 = PUC.think($('#th1'), { q: "Magnesium burns in oxygen. Oxygen takes magnesium's electrons. Which agent is oxygen?", opts: ['Reducing agent', 'Oxidising agent'], right: 1, why: 'Oxidising agent. Oxygen takes electrons, so oxygen is reduced and magnesium is oxidised.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{Oxidation: lose } ${E1} \\qquad \\text{Reduction: gain } ${E1}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`2${NA} \\rightarrow 2${NAP} + ${E2}`) + '&nbsp; oxidised'],
  [K(`${CL2} + ${E2} \\rightarrow 2${CLM}`) + '&nbsp; reduced'],
  ['Na: reducing agent · Cl₂: oxidising agent'],
  ['No oxygen anywhere, still redox']], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const wP = [mk(ws, 'path', { d: 'M226 180 C380 150 460 170 516 190', stroke: EC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' }), mk(ws, 'path', { d: 'M226 380 C380 410 460 390 516 370', stroke: EC, 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '8 8' })];
const wNa = [at(ws, 42, NC, 'Na', 26), at(ws, 42, NC, 'Na', 26)]; place(wNa[0], 180, 180); place(wNa[1], 180, 380);
const wBal = txt(ws, 370, 296, 'LOST 2 × 1e⁻ | GAINED 2e⁻ ✓', { 'text-anchor': 'middle', 'font-size': 22, fill: EC, 'font-weight': 600 });
const wBond = mk(ws, 'line', { x1: 560, y1: 250, x2: 560, y2: 310, stroke: HC, 'stroke-width': 6 });
const wCl = [at(ws, 44, CL, 'Cl', 26), at(ws, 44, CL, 'Cl', 26)];
const wE = [mk(ws, 'circle', { r: 9, fill: EC }), mk(ws, 'circle', { r: 9, fill: EC })];
const wL = [txt(ws, 180, 260, 'Na⁺', { 'text-anchor': 'middle', 'font-size': 24, fill: NC, 'font-weight': 700 }), txt(ws, 180, 460, 'Na⁺', { 'text-anchor': 'middle', 'font-size': 24, fill: NC, 'font-weight': 700 }), txt(ws, 620, 176, 'Cl⁻', { 'font-size': 24, fill: CL, 'font-weight': 700 }), txt(ws, 620, 396, 'Cl⁻', { 'font-size': 24, fill: CL, 'font-weight': 700 })];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'The oxidising agent is the one that gets oxidised', right: 'The oxidising agent takes electrons, so it gets reduced' });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 110, 'OXIDISING AGENT → REDUCED', { 'font-size': 26, fill: CU2, 'font-weight': 600 }), tq2 = txt(tsv, 40, 180, 'REDUCING AGENT → OXIDISED', { 'font-size': 26, fill: NC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Define oxidation and reduction, write half reactions, or name the two agents' });
const OPT = ['\\mathrm{Fe^{3+}}', '\\mathrm{I^-}', '\\mathrm{Fe^{2+}}', '\\mathrm{I_2}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: '2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂. Which species is the reducing agent?', qW: 940,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 34 });
const so = PUC.solution($('#so'), [[K(`2\\mathrm{I^-} \\rightarrow \\mathrm{I_2} + ${E2}`)], ['I⁻ loses e⁻: oxidised'], ['So I⁻ is the reducing agent'], ['A is the oxidising agent']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'oxidised'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Oxidation and reduction', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\text{Oxidation: loss of } ${E1} \\qquad \\text{Reduction: gain of } ${E1}`), '<b>Old idea</b>: oxidation = add O or remove H · reduction = the opposite', '<b>Zn + Cu²⁺</b>: Zn → Zn²⁺ + 2e⁻ and Cu²⁺ + 2e⁻ → Cu', '<b>Reducing agent</b> gives e⁻ (oxidised) · <b>oxidising agent</b> takes e⁻ (reduced)', '<b>OIL RIG</b>: electrons lost always equal electrons gained'] });
const YQ = ['Define oxidation in terms of electrons.', 'When zinc meets copper sulphate, which one is reduced?', 'Does the oxidising agent gain or lose electrons?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 72', topic: 'Track electrons nobody fully gives away? Oxidation Number', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 512, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'No oxygen at all. Just electrons jumping!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T1('S4') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.ms .stx').forEach(q => { if (q.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 640 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc, .beq').forEach(q => { const k = q.firstElementChild; if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.rule .rk, .rule .rt').forEach(q => { if (q.offsetWidth > 620) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 620 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.eqr').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); if (k && tg && k.offsetWidth + tg.offsetWidth > 640) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * (640 - tg.offsetWidth) / k.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
  TE = trT();
}
const hl = (t, els, ts, tEnd) => els.forEach((el, i) => { const nx2 = i < els.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });

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
    const tB = [wt('H2', 'Three'), wt('H2', 'different'), wt('H2', 'things')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'hidden') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'lose') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => M.vis($('#qr' + i), t, tQr[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, QR.map((_, i) => $('#qr' + i)), tQr, T1('P5') + 0.4);
    M.vis($('#pw'), t, tPe[0] - 0.3, out, { dx: 60, dy: 0, ...o });
    PE.forEach((_, i) => M.vis($('#pe' + i), t, tPe[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, PE.map((_, i) => $('#pe' + i)), tPe, T1('P5') + 0.4);
    M.vis($('#pP'), t, wt('P5', 'handshake') - 0.1, 1e9, POP);
  }

  /* S: zinc rod */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#eb'), t, wt('S1', 'zinc') - 0.2, z, { dx: 60, dy: 0, ...o });
    let lost = 0, gained = 0, done = 0;
    zn.forEach((g, i) => { const [sx, sy] = SITES[i]; if (i >= NT) { place(g, sx, sy); return; } const [tE, tLv] = TE[i], u = M.io((t - tLv) / 1.4), w = ZW[i];
      place(g, M.lerp(sx, w[0], u) + (u > 0.99 ? 14 * Math.sin(0.8 * t + i) : 0), M.lerp(sy, w[1], u)); if (g._t) M.setT(g._t, t >= tLv ? 'Zn²⁺' : 'Zn'); attr(g._t, 'font-size', t >= tLv ? 10 : 12); });
    cu.forEach((g, i) => { const w = CW[i]; let x = w[0] + 22 * Math.sin(0.8 * t + 2 * i), y = w[1] + 16 * Math.cos(0.6 * t + i);
      if (i < NT) { const [, , tC, tSt] = TE[i], u = M.io((t - tC - 0.3) / Math.max(0.5, tSt - tC - 0.3)), [sx, sy] = SITES[i]; x = M.lerp(x, sx, u); y = M.lerp(y, sy, u); const got = t >= tSt; attr(g._c, 'fill', got ? CUM : CU2); M.setT(g._t, got ? 'Cu' : 'Cu²⁺'); attr(g._t, 'font-size', got ? 13 : 10); if (got) done++; }
      place(g, x, y); });
    els.forEach((pr, i) => { const [tE, , tC] = TE[i], [sx, sy] = SITES[i]; const tgt = cu[i]; const tr = tgt.getAttribute('transform').match(/[-\d.]+/g).map(Number);
      const u = M.io((t - tC) / 0.5);
      pr.forEach((e, k) => { const ox = sx + (sx < 392 ? -22 : 22), oy = sy + (k ? 10 : -10); mv(e, M.lerp(ox, tr[0] + (k ? 9 : -9), u), M.lerp(oy, tr[1] - 14, u)); fade(e, t, tE, TE[i][3], 0.15); });
      if (t >= tE) lost += 2; if (t >= tC + 0.5) gained += 2; });
    const TAG = [[tS1 + 0.3, 'Zn ROD IN BLUE Cu²⁺'], [TE[0][0], 'Zn GIVES 2e⁻'], [TE[0][2], 'Cu²⁺ CATCHES 2e⁻'], [T0('S4'), 'AGAIN AND AGAIN'], [T0('S5'), 'ONLY ELECTRONS MOVED']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    const fadeU = done / 5 * 0.85 + 0.0;
    attr(sol, 'fill', mix('#BFD9F2', '#EAF1F4', fadeU)); $('#blB i').style.width = ((1 - fadeU) * 100).toFixed(1) + '%';
    PUC.write($('#bEq'), t, wt('S1', 'zinc'), 0.9);
    ET.forEach(([id], i) => { M.vis($('#' + id), t, i ? TE[0][2] - 0.2 : TE[0][0] - 0.2, 1e9, { dy: 16 }); M.setT($('#' + id + 'n'), (i ? gained : lost) + ' e⁻'); M.setT($('#' + id + 'k'), lost === gained && lost > 0 ? '✓' : ''); });
    M.vis($('#blK'), t, T0('S4'), 1e9, { dy: 10 }); M.vis($('#blB'), t, T0('S4'), 1e9, { dy: 10 });
    avA(t, T1('S5') - 0.4, z); fade(lg, t, tS1, T1('S5') - 0.4);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1'), tSh = T0('L3') - 0.3;
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tSh, M.HEAVY); snap($('#lw'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#hcd'), t, wt('L1', 'electrons') - 0.1, 1e9, POP);
    PUC.write($('#lst'), t, T0('L2'), 1.6); PUC.write($('#lEq'), t, wt('L2', 'Reduction'), 0.9);
    M.vis($('#lh'), t, tSh, z, { dx: 60, dy: 0, ...o });
    const tl = T0('L3'); fade(hA, t, tl); fade(hB, t, tl + 0.2); M.draw(hArc, t, tl + 0.3, 0.6);
    hE.forEach((e, k) => { const u = M.clamp(((t - wt('L3', 'lost')) / 1.6 - k * 0.15)), p = hArc.getPointAtLength(hArc.getTotalLength() * M.io(u)); mv(e, p.x, p.y); fade(e, t, wt('L3', 'Zinc'), 1e9, 0.15); });
    fade(hT1, t, wt('L3', 'lost')); fade(hO1, t, wt('L3', 'oxidised')); fade(hT2, t, wt('L3', 'gained')); fade(hO2, t, wt('L3', 'reduced'));
    M.vis($('#hP'), t, wt('L3', 'fits') - 0.3, 1e9, POP);
  }

  /* D + rules */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('C1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tR1 + 0.2, M.HEAVY); snap($('#mt'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.8); M.vis($('#mg' + i), t, tMs[i] + 0.6, 1e9, { dy: 8 }); });
    M.vis($('#dP'), t, wt('D4', 'cancel') - 0.1, 1e9, POP);
    M.vis($('#rr'), t, tR1 + 0.1, z, { dx: 60, dy: 0, ...o });
    RL.forEach((_, i) => M.vis($('#rl' + i), t, tRl[i] - 0.1, 1e9, { dy: 16 }));
    hl(t, RL.map((_, i) => $('#rl' + i)), tRl, T1('R4') + 0.4);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    M.vis($('#cf'), t, wt('C1', 'side') - 0.2, zc, { dx: 60, dy: 0, ...o });
    const ta = [wt('C2', 'throws'), wt('C2', 'oxidised'), wt('C2', 'Zinc')], tb = [wt('C3', 'catches'), wt('C3', 'reduced'), wt('C3', 'Copper')];
    ta.forEach((tt, i) => M.vis($('#ca' + i), t, tt - 0.1, 1e9, { dy: 16 })); tb.forEach((tt, i) => M.vis($('#cf' + i), t, tt - 0.1, 1e9, { dy: 16 }));
    M.vis($('#caV'), t, ta[2] + 0.3, 1e9, { dy: 16 }); M.vis($('#cfV'), t, tb[2] + 0.3, 1e9, { dy: 16 });
    hl(t, [0, 1, 2].map(i => $('#ca' + i)), ta, T0('C3')); hl(t, [0, 1, 2].map(i => $('#cf' + i)), tb, tK1);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Oxygen') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Oxidation') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'always') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'together') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const t3 = wt('W3', 'loses'), t4 = wt('W4', 'takes'), sp = M.io((t - wt('W4', 'chloride')) / 0.8);
    const clP = [[560 + 0, M.lerp(250, 180, sp)], [560, M.lerp(310, 380, sp)]];
    wCl.forEach((g, k) => place(g, clP[k][0], clP[k][1])); attr(wBond, 'y1', clP[0][1]); attr(wBond, 'y2', clP[1][1]); wBond.style.opacity = (1 - sp).toFixed(2);
    wE.forEach((e, k) => { const u = M.io((t - t4 - k * 0.2) / 0.9), sx2 = 180 + 30, sy2 = k ? 380 : 180; mv(e, M.lerp(sx2 + 12, 560 - 44, u), M.lerp(sy2, clP[k][1], u)); fade(e, t, t3, 1e9, 0.15); });
    fade(wL[0], t, t3 + 0.3); fade(wL[1], t, t3 + 0.5); fade(wL[2], t, wt('W4', 'chloride')); fade(wL[3], t, wt('W4', 'chloride') + 0.2);
    wP.forEach((pp, k) => M.draw(pp, t, t4 - 0.4 + k * 0.2, 0.5)); fade(wBal, t, wt('W4', 'reduced'));
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X2', 'backwards') - 0.1, tRight: T0('X3') - 0.1 });
    fade(tq1, t, wt('X3', 'reduced')); fade(tq2, t, wt('X3', 'reducing'));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.1, tCount, tAns });
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
