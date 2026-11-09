// PUC Chemistry Ep 76: Redox titrations (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: oxidised / gives e- teal, reduced / takes e- blue, electron e- orange, n factor gold; liquids in their real colours
const OX = C.ac, RE = '#2F6FEB', HC = C.ink, GC = '#B7791F', XC = '#C8461B', OK = C.ok, RD = C.red;
const PURP = '#7B2D8E', PINK = '#F4B8D6', PALE = '#EEF3DC', ORNG = '#E8892B', GRN = '#3E9A5C', BLUE = '#1F3A93', CLR = '#F7FAFC';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`, tO = s => tc(OX, s), tR = s => tc(RE, s), tG = s => tc(GC, s), tK = s => tc(OK, s), tE = s => tc(XC, s);
const E = n => tE(`${n}\\mathrm{e^-}`);
const atom = (p, x, y, r, fill, s, fs = 22) => { const g = mk(p, 'g', {}); mk(g, 'circle', { cx: 0, cy: 0, r, fill }); if (s) txt(g, 0, fs * 0.36, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); place(g, x, y); return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const eqrow = (id, top, tex, tag, col) => `<div class="eqr" id="${id}" style="top:${top}px">${K(tex)}<span class="tg" style="color:${col}">${tag}</span></div>`;
// conical flask at (x, y = base), scale s; returns {g, liq}
const flask = (p, x, y, s = 1) => { const g = mk(p, 'g', {}); const w = 100 * s, n = 20 * s, h = 112 * s, nk = 36 * s;
  const liq = mk(g, 'path', { d: `M${x - w * 0.62} ${y - h * 0.38} L${x - w} ${y} H${x + w} L${x + w * 0.62} ${y - h * 0.38} Z`, fill: PALE });
  mk(g, 'path', { d: `M${x - n} ${y - h - nk} V${y - h * 0.68} L${x - w} ${y} H${x + w} L${x + n} ${y - h * 0.68} V${y - h - nk}`, stroke: C.ink2, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  return { g, liq }; };

Object.assign(M.IC, {
  cooker: ['M4 11h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z', 'M2 11h20', 'M12 11V7', 'M10 4h4', 'M12 4v3'],
  kettle: ['M5 9h12l-1 11H6z', 'M17 11h2a2 2 0 0 1 0 4h-2.5', 'M8 9V6h6v3', 'M9 3c0 1 1 1 1 2'],
  drop: ['M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tI1 = T0('I1'), tV1 = T0('V1'), tC1 = T0('C1'), tK1 = T0('K1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['cooker', 'Cooker whistles', 'RICE IS DONE', 'cooker', 'STOP', OX], ['kettle', 'Kettle sings', 'WATER BOILS', 'kettle', 'STOP', OX], ['drop', 'Pink fades', 'COLOUR USED UP', 'pink', 'SIGNAL', OX]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'cooker'), wt('H1', 'kettle'), wt('H2', 'signal') - 0.2];
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['Light pink water for vegetables', 'pink', 'H3'], ['The pink got used up', 'used', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('drop', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]));

/* ---------- P: the job ---------- */
const QR = [['Unknown strength in the flask', 'UNKNOWN', 'P1', 'know', RD], ['Known solution from a burette', 'KNOWN', 'P2', 'burette', OX], ['Stop when exactly reacted', 'END POINT', 'P3', 'exactly', GC], ['Redox titration: a redox reaction', 'REDOX', 'P3', 'redox', RE]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const burette = (p, x, top, bot) => { const g = mk(p, 'g', {}); const liq = mk(g, 'rect', { x: x - 14, y: top, width: 28, height: bot - top, fill: PURP });
  mk(g, 'rect', { x: x - 18, y: top - 20, width: 36, height: bot - top + 20, rx: 6, fill: 'none', stroke: C.ink2, 'stroke-width': 4 });
  for (let i = 1; i < 10; i++) mk(g, 'line', { x1: x + 4, y1: top + i * (bot - top) / 10, x2: x + 18, y2: top + i * (bot - top) / 10, stroke: C.ink2, 'stroke-width': 2 });
  mk(g, 'path', { d: `M${x - 6} ${bot} V${bot + 34} L${x} ${bot + 48} L${x + 6} ${bot + 34} V${bot}`, stroke: C.ink2, 'stroke-width': 3, fill: '#fff' });
  mk(g, 'rect', { x: x - 26, y: bot + 12, width: 52, height: 12, rx: 4, fill: HC });
  return { g, liq }; };
const pB = burette(ps, 300, 110, 330), pF = flask(ps, 300, 540, 1);
const pL = [txt(ps, 340, 160, '← BURETTE: KNOWN', { 'font-size': 20, fill: OX, 'font-weight': 600 }), txt(ps, 340, 356, '← TAP: DROP BY DROP', { 'font-size': 20, fill: HC, 'font-weight': 600 }), txt(ps, 420, 500, '← FLASK: UNKNOWN', { 'font-size': 20, fill: RD, 'font-weight': 600 })];

/* ---------- S: live titration ---------- */
const b = $('#bS');
const sB = burette(b, 220, 90, 340), sF = flask(b, 220, 548, 0.95);
const drop = mk(b, 'path', { d: 'M0 -9 C5 -2 7 2 7 5 A7 7 0 0 1 -7 5 C-7 2 -5 -2 0 -9 Z', fill: PURP });
const splash = mk(b, 'ellipse', { cx: 220, cy: 506, rx: 18, ry: 6, fill: PURP });
const zr = mk(b, 'circle', { cx: 568, cy: 270, r: 150, fill: '#fff', stroke: C.dim, 'stroke-width': 3 });
const zl = mk(b, 'line', { x1: 290, y1: 470, x2: 440, y2: 360, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const zMn = atom(b, 568, 270, 36, PURP, 'Mn', 22);
const zFe = [0, 1, 2, 3, 4].map(i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return atom(b, 568 + 108 * Math.cos(a), 270 + 108 * Math.sin(a), 22, OX, 'Fe', 15); });
const zE = zFe.map(() => mk(b, 'circle', { r: 9, fill: XC }));
const zT = txt(b, 568, 456, '5 Fe²⁺ GIVE 5 e⁻ TO 1 MnO₄⁻', { 'text-anchor': 'middle', 'font-size': 19, fill: HC, 'font-weight': 700 });
const RDS = [['VOLUME ADDED · mL', 'rd0', 96], ['Fe²⁺ LEFT IN FLASK', 'rd1', 188], ['FLASK COLOUR', 'rd2', 280]];
$('#rds').innerHTML = RDS.map(([k, id, top]) => `<div class="rd" id="${id}" style="top:${top}px"><span class="ck">${k}</span><span class="cv"></span></div>`).join('');
$('#ebs').innerHTML = eqrow('eb0', 382, `\\mathrm{${tR('MnO_4^-')}} + 8\\mathrm{H^+} + ${E(5)} \\rightarrow \\mathrm{${tR('Mn^{2+}')}} + 4\\mathrm{H_2O}`, 'TAKES 5', RE) + eqrow('eb1', 472, `\\mathrm{${tO('Fe^{2+}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}} + ${E('')}`, 'GIVES 1 · × 5', OX);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);

/* ---------- I: indicators ---------- */
const IND = [['KMnO₄ · purple', 'SELF INDICATOR · FAINT PINK AT END', PURP, PINK, 'I1', 'self'], ['K₂Cr₂O₇ · orange to green', 'ADD DIPHENYLAMINE · INTENSE BLUE', ORNG, GRN, 'I2', 'Orange'], ['I₂ with starch · blue', 'BLUE DISAPPEARS AT END', BLUE, CLR, 'I5', 'Starch']];
$('#ins').innerHTML = IND.map(([n, w, a, c], i) => `<div class="ind" id="in${i}" style="top:${96 + i * 140}px"><div class="in">${n}</div><div class="iw" style="color:${i === 1 ? BLUE : C.mute}">${w}</div><div class="sw" id="sa${i}" style="right:150px;background:${a}"></div><div class="ar">→</div><div class="sw" id="sb${i}" style="right:36px;background:${c}"></div></div>`).join('');
const tInd = IND.map((r, i) => i === 0 ? T0('I1') + 0.3 : wt(r[4], r[5]));
$('#ios').innerHTML = eqrow('io0', 96, '2\\mathrm{Cu^{2+}} + 4\\mathrm{I^-} \\rightarrow \\mathrm{Cu_2I_2} + \\mathrm{I_2}', 'MAKES I₂', HC) + eqrow('io1', 190, '\\mathrm{I_2} + 2\\mathrm{S_2O_3^{2-}} \\rightarrow 2\\mathrm{I^-} + \\mathrm{S_4O_6^{2-}}', 'USES I₂', HC);
const iF = flask($('#iS'), 220, 540, 1.25);
const iTx = txt($('#iS'), 370, 480, '', { 'font-size': 20, fill: HC, 'font-weight': 700 });

/* ---------- V: n factor ---------- */
const VN = [[`\\mathrm{${tR('MnO_4^-')}}\\ (\\text{acid}):\\ +7 \\rightarrow +2`, '5', 'V3', 'Permanganate'], [`\\mathrm{${tR('Cr_2O_7^{2-}')}}\\ (\\text{acid}):\\ 2 \\times 3`, '6', 'V3', 'Dichromate'], [`\\mathrm{${tO('Fe^{2+}')}} \\rightarrow \\mathrm{${tO('Fe^{3+}')}}`, '1', 'V3', 'Iron'], [`\\mathrm{${tO('S_2O_3^{2-}')}} \\rightarrow \\tfrac{1}{2}\\mathrm{S_4O_6^{2-}}`, '1', 'V3', 'Thiosulphate']];
$('#vns').innerHTML = VN.map(([e, n], i) => `<div class="nf" id="vn${i}" style="top:${96 + i * 94}px">${K(e)}<span class="tg">n = ${n}</span></div>`).join('') + `<div class="pillp" id="vnP" style="left:36px;top:478px">n = electrons given or taken by one formula unit</div>`;
const tVn = VN.map(v => wt(v[2], v[3]));
$('#vE1').innerHTML = K(`M_1\\,${tG('n_1')}\\,V_1 = M_2\\,${tG('n_2')}\\,V_2`);
$('#vE2').innerHTML = K(`N = M \\times ${tG('n')} \\quad (\\text{normality})`);
$('#vE3').innerHTML = K('N_1 V_1 = N_2 V_2');

/* ---------- C: compare signals ---------- */
const cA1 = flask($('#caS'), 220, 380, 0.9), cA2 = flask($('#caS'), 560, 380, 0.9), cB1 = flask($('#cfS'), 220, 380, 0.9), cB2 = flask($('#cfS'), 560, 380, 0.9);
const cl = (p, x, s) => txt(p, x, 106, s, { 'text-anchor': 'middle', 'font-size': 18, fill: HC, 'font-weight': 600 });
const cLA = [cl($('#caS'), 220, 'BEFORE END'), cl($('#caS'), 560, 'AT END')], cLB = [cl($('#cfS'), 220, 'BEFORE END'), cl($('#cfS'), 560, 'AT END')];
const cArA = txt($('#caS'), 392, 330, '→', { 'text-anchor': 'middle', 'font-size': 40, fill: C.mute }), cArB = txt($('#cfS'), 392, 330, '→', { 'text-anchor': 'middle', 'font-size': 40, fill: C.mute });
$('#caV').innerHTML = `<span>Signal:</span><span style="color:${PURP}">pink appears</span>`;
$('#cfV').innerHTML = `<span>Signal:</span><span style="color:${BLUE}">blue disappears</span>`;
const th1 = PUC.think($('#th1'), { q: 'Why does a permanganate titration need no extra indicator?', opts: ['It is colourless', 'Its own colour shows'], right: 1, why: 'Purple permanganate turns almost colourless. One extra drop shows pink.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`M_1\\,${tG('n_1')}\\,V_1 = M_2\\,${tG('n_2')}\\,V_2`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${tG('n')}:\\ \\mathrm{MnO_4^-} = ${tG('5')},\\ \\mathrm{Fe^{2+}} = ${tG('1')}`)],
  [K(`0.02 \\times ${tG('5')} \\times 20.0 = 2.0`)],
  [K(`M \\times ${tG('1')} \\times 25.0 = 2.0`)],
  [K(`M = ${tK('0.08\\ \\text{M}')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3') - 0.3, wt('W3', 'Point'), T0('W4'), wt('W5', 'molarity', 1)];
$('#wrs').innerHTML = eqrow('wr0', 96, `\\mathrm{MnO_4^-} + 5\\mathrm{Fe^{2+}} + 8\\mathrm{H^+} \\rightarrow \\mathrm{Mn^{2+}} + 5\\mathrm{Fe^{3+}} + 4\\mathrm{H_2O}`, '', HC)
  + eqrow('wr1', 196, '\\text{mmol } \\mathrm{MnO_4^-} = 0.02 \\times 20.0 = 0.40', 'STEP 1', HC) + eqrow('wr2', 296, '\\text{mmol } \\mathrm{Fe^{2+}} = 5 \\times 0.40 = 2.0', 'STEP 2', HC);
$('#wV').innerHTML = `<span>2.0 ÷ 25.0 =</span><span style="color:${OK}">0.08 M</span>`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `Write ${K('M_1V_1 = M_2V_2')} for a redox titration`, right: `Use ${K(`M_1\\,${tG('n_1')}\\,V_1 = M_2\\,${tG('n_2')}\\,V_2`)}` });
const tsv = $('#tS');
const tq1 = txt(tsv, 40, 100, 'MnO₄⁻ n = 5', { 'font-size': 26, fill: GC, 'font-weight': 700 }), tq2 = txt(tsv, 40, 150, 'Fe²⁺ n = 1', { 'font-size': 26, fill: GC, 'font-weight': 700 }), tq3 = txt(tsv, 40, 200, 'n NOT EQUAL → USE n', { 'font-size': 24, fill: RD, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Indicators and the end point, or find a molarity or volume from titration data' });
const OPT = ['10\\ \\text{mL}', '60\\ \\text{mL}', '20\\ \\text{mL}', '5\\ \\text{mL}'];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: '0.1 M K₂Cr₂O₇ (acidic) oxidises 30 mL of 0.2 M Fe²⁺ to Fe³⁺. The volume of K₂Cr₂O₇ needed is:', qW: 820,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{Fe^{2+}}: 0.2 \\times ${tG('1')} \\times 30 = 6`)], [K(`\\mathrm{Cr_2O_7^{2-}}: 0.1 \\times ${tG('6')} \\times V`)], [K(`0.6\\,V = 6 \\Rightarrow ${tK('V = 10\\ \\text{mL}')}`)], ['B forgot n = 6']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'forgot') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Redox titrations', y0: 96, dy: 74, txt: [0, 1, 1, 1, 0],
  lines: [K(`M_1\\,${tG('n_1')}\\,V_1 = M_2\\,${tG('n_2')}\\,V_2 \\qquad N_1V_1 = N_2V_2`), '<b>KMnO₄</b>: self indicator, a faint pink stays at the end point', '<b>K₂Cr₂O₇</b>: diphenylamine, intense blue · <b>I₂</b>: starch, the blue disappears', '<b>n factor</b>: MnO₄⁻ (acid) 5 · Cr₂O₇²⁻ (acid) 6 · Fe²⁺ 1 · S₂O₃²⁻ 1', K('\\mathrm{I_2} + 2\\mathrm{S_2O_3^{2-}} \\rightarrow 2\\mathrm{I^-} + \\mathrm{S_4O_6^{2-}}')] });
const YQ = ['Why is permanganate called a self indicator?', 'In an iodine titration with starch, what shows the end point?', 'What is the n factor of dichromate in acid?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 77', topic: 'A redox reaction that lights a bulb? Electrode processes', y: 764 });
const avA = PUC.avatar($('#sS'), { x: 160 + 350, y: 270 + 506, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Like the pink vegetable water!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S5') - 0.2, 1.05, 960, 560], [T1('S5') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const fit = (q, w) => { const k = q.firstElementChild; if (k && k.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / k.offsetWidth) + 'px'; };
  document.querySelectorAll('.fxc,.eqtop').forEach(q => fit(q, 712));
  document.querySelectorAll('.eqr,.nf').forEach(q => { const k = q.firstElementChild, tg = q.querySelector('.tg'); const room = 668 - (tg && tg.textContent ? tg.offsetWidth + 14 : 0); if (k && k.offsetWidth > room) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * room / k.offsetWidth) + 'px'; });
  document.querySelectorAll('.sol .sx').forEach(q => { const w = q.closest('#so') ? 440 : 660; if (q.offsetWidth > w) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * w / q.offsetWidth) + 'px'; });
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}
const rowsOn = (ids, ts, tEnd, t) => ids.forEach((id, i) => { const el = $(id); M.vis(el, t, ts[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < ids.length - 1 ? ts[i + 1] : tEnd; const on = M.io((t - ts[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
const fillC = (el, c) => { if (el._f !== c) { el._f = c; attr(el, 'fill', c); } };

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
    const tB = [wt('H2', 'stop'), wt('H2', 'finished') - 0.3, wt('H2', 'finished')];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'now') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'drop') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    rowsOn(['#qr0', '#qr1', '#qr2', '#qr3'], tQr, T1('P3') + 0.4, t);
    M.vis($('#pw'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    fade(pF.g, t, wt('P1', 'solution')); fade(pB.g, t, wt('P2', 'burette') - 0.3);
    fade(pL[2], t, wt('P1', 'strong')); fade(pL[0], t, wt('P2', 'burette')); fade(pL[1], t, wt('P2', 'tap'));
  }

  /* S: live titration */
  const sOn = t >= tS1 - 0.1 && t < tI1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('I1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    const tGo = wt('S1', 'Iron') , tEnd = wt('S5', 'stays') - 0.2, tPink = wt('S5', 'pink');
    fade(sB.g, t, wt('S1', 'Purple') - 0.2); fade(sF.g, t, tGo - 0.2);
    const v = 20 * M.clamp((t - tGo) / (tEnd - tGo));
    attr(sB.liq, 'y', (90 + v * 3).toFixed(1)); attr(sB.liq, 'height', (250 - v * 3).toFixed(1));
    const running = t >= tGo && t < tEnd + 0.8, ph = ((t - tGo) % 0.9) / 0.9;
    if (running) { const yy = ph < 0.6 ? 390 + (ph / 0.6) ** 2 * 112 : 502; place(drop, 220, yy); drop.style.opacity = ph < 0.6 ? 1 : 0; const su = ph >= 0.6 ? (ph - 0.6) / 0.4 : 0; splash.style.opacity = t > tEnd ? 0 : (ph >= 0.6 ? (1 - su).toFixed(2) : 0); attr(splash, 'rx', (8 + su * 40).toFixed(1)); M.hide(drop, false); M.hide(splash, false); }
    else { M.hide(drop, true); M.hide(splash, true); }
    fillC(sF.liq, mix(PALE, PINK, M.io((t - tPink + 0.3) / 0.5)));
    // zoom: electrons hop Fe -> Mn
    [zr, zl, zMn].forEach(e => fade(e, t, wt('S3', 'Manganese') - 0.2)); zFe.forEach((e, i) => fade(e, t, wt('S3', 'Manganese') + i * 0.08));
    const te = wt('S3', 'five');
    zE.forEach((e, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5, u = M.io((t - te - i * 0.25) / 0.7), r = M.lerp(108, 44, u); attr(e, 'cx', (568 + r * Math.cos(a + 0.35 * (1 - u))).toFixed(1)); attr(e, 'cy', (270 + r * Math.sin(a + 0.35 * (1 - u))).toFixed(1)); fade(e, t, te - 0.3); });
    fade(zT, t, wt('S3', 'Each'));
    const TAG = [[tS1 + 0.3, 'READY'], [tGo, 'DROPS LOSE COLOUR'], [T0('S4'), 'LAST Fe²⁺ USED UP'], [tPink - 0.2, 'END POINT · PINK STAYS']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, T0('S2') - 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#gh1'), t, T0('S2'), 1e9, POP);
    const RV = [v.toFixed(1), `${Math.round(100 - v * 5)} %`, t < tPink - 0.2 ? 'NO PINK YET' : 'LIGHT PINK'];
    RV.forEach((s, i) => { const el = $('#rd' + i); M.vis(el, t, T0('S2') + i * 0.15, 1e9, { dy: 16 }); const cv = el.querySelector('.cv'); M.setT(cv, s); cv.style.color = i === 2 ? (t < tPink - 0.2 ? C.mute : '#C2338A') : i === 1 ? OX : HC; });
    M.vis($('#eb0'), t, wt('S3', 'five') - 0.1, 1e9, { dy: 16 }); M.vis($('#eb1'), t, wt('S3', 'Each') - 0.1, 1e9, { dy: 16 });
    avA(t, T1('S5') - 0.3, z);
  }

  /* I: indicators */
  const iOn = t >= tI1 - 0.1 && t < tV1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const z = OUT('V1');
    M.vis($('#ia'), t, tI1 + 0.05, z, { dy: 36, ...o });
    rowsOn(['#in0', '#in1', '#in2'], tInd, T1('I5') + 0.3, t);
    [0, 1, 2].forEach(i => { M.vis($('#sa' + i), t, tInd[i] + 0.2, 1e9, POP); M.vis($('#sb' + i), t, tInd[i] + [0.6, 1.2, 1.4][i], 1e9, POP); });
    M.vis($('#ib'), t, tI1 + 0.3, z, { dx: 60, dy: 0, ...o });
    M.vis($('#io0'), t, wt('I4', 'Copper') - 0.1, 1e9, { dy: 16 }); M.vis($('#io1'), t, wt('I4', 'thiosulphate') - 0.1, 1e9, { dy: 16 });
    fade(iF.g, t, tI1 + 0.5);
    const PH = [[tI1, PALE, PINK, wt('I1', 'self'), 'KMnO₄: PINK AT THE END', '#C2338A'], [T0('I2'), ORNG, GRN, wt('I2', 'green'), 'Cr₂O₇²⁻ ORANGE → Cr³⁺ GREEN', GRN], [T0('I3'), GRN, BLUE, wt('I3', 'intense'), 'DIPHENYLAMINE: INTENSE BLUE', BLUE], [T0('I4'), PALE, '#A0522D', wt('I4', 'iodine', 1), 'IODINE MADE: BROWN', '#A0522D'], [T0('I5'), '#A0522D', BLUE, wt('I5', 'Starch', 1), 'STARCH + I₂: DEEP BLUE', BLUE], [wt('I5', 'disappears') - 0.2, BLUE, CLR, wt('I5', 'disappears'), 'LAST I₂ USED: BLUE GONE', OK]];
    let ph = PH[0]; for (const q of PH) if (t >= q[0]) ph = q;
    fillC(iF.liq, mix(ph[1], ph[2], M.io((t - ph[3]) / 0.5))); M.setT(iTx, ph[4]); attr(iTx, 'fill', ph[5]); fade(iTx, t, tI1 + 0.8);
  }

  /* V: n factor */
  const vOn = t >= tV1 - 0.1 && t < tC1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const z = OUT('C1');
    M.vis($('#va'), t, tV1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#vnP'), t, wt('V2', 'number') - 0.1, 1e9, POP);
    rowsOn(['#vn0', '#vn1', '#vn2', '#vn3'], tVn, T1('V3') + 0.3, t);
    M.vis($('#vb'), t, T0('V4') - 0.1, z, { dx: 60, dy: 0, ...o });
    PUC.write($('#vE1'), t, wt('V4', 'molarity'), 1.0); PUC.write($('#vE2'), t, wt('V5', 'normality'), 0.8); PUC.write($('#vE3'), t, wt('V5', 'So') - 0.1, 0.8);
    M.vis($('#vP'), t, wt('V5', 'equivalents') - 0.2, 1e9, POP);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o });
    [cA1.g, cLA[0]].forEach(e => fade(e, t, wt('C1', 'permanganate'))); [cA2.g, cLA[1], cArA].forEach(e => fade(e, t, wt('C1', 'pink') - 0.4));
    fillC(cA1.liq, mix(PURP, PALE, M.io((t - wt('C1', 'fades')) / 0.5))); fillC(cA2.liq, PINK);
    M.vis($('#caV'), t, wt('C1', 'stays'), 1e9, { dy: 16 });
    M.vis($('#cf'), t, T0('C2') - 0.2, zc, { dx: 60, dy: 0, ...o });
    [cB1.g, cLB[0]].forEach(e => fade(e, t, wt('C2', 'starch'))); [cB2.g, cLB[1], cArB].forEach(e => fade(e, t, wt('C2', 'blue', 1) - 0.4));
    fillC(cB1.liq, BLUE); fillC(cB2.liq, CLR);
    M.vis($('#cfV'), t, wt('C2', 'disappears'), 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'need') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'permanganate') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'end') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'electrons') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'taken') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    { const sh = M.spring(t - T0('W6') + 0.3, M.HEAVY); snap($('#wl'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh).toFixed(1)) + 'px'); }
    M.vis($('#wr'), t, T0('W6') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tw = [T0('W6') + 0.2, wt('W6', 'Point'), wt('W6', 'two', 1)];
    rowsOn(['#wr0', '#wr1', '#wr2'], tw, T1('W6') + 0.3, t);
    M.vis($('#wV'), t, wt('W6', 'Same') - 0.1, 1e9, { dy: 16 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'molarity') - 0.1, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'Multiply') - 0.3 });
    fade(tq1, t, wt('X3', 'works')); fade(tq2, t, wt('X3', 'works') + 0.3); fade(tq3, t, wt('X3', 'match'));
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
