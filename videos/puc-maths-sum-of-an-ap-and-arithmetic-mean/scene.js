// PUC Maths Ep 64: Sum of an AP and arithmetic mean (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: first term a blue, common difference d coral (accent), number of terms n violet, last term l teal, mean A gold
const AC = '#2F6FEB', ACB = '#E7EEFD', DC = C.ac, NC = C.violet, LC = '#0E8F8F', LCB = '#DDF1F1', GC = '#B7791F', GCB = '#F6ECDB';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const A = s => `\\textcolor{${AC}}{${s}}`, D = s => `\\textcolor{${DC}}{${s}}`, N = s => `\\textcolor{${NC}}{${s}}`, L = s => `\\textcolor{${LC}}{${s}}`, G = s => `\\textcolor{${GC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const SN = 'S_{' + N('n') + '}';

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tG1 = T0('G1'), tL1 = T0('L1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tM1 = T0('M1'), tM6 = T0('M6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tM1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the slow way ---------- */
const LS = [['ONE BY ONE · STEP 1', '1 + 2 = 3'], ['STEP 2', '3 + 3 = 6'], ['STEP 3', '6 + 4 = 10']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'every') - 0.05, wt('H1', 'every') + 0.35, wt('H1', 'every') + 0.7];

/* ---------- H: running total ---------- */
$('#hSum').innerHTML = K(`1 + 2 + 3 + 4 + \\cdots + 100`);
const tHk0 = wt('H2', 'One'), tHk1 = T1('H3');
const hk = t => t < tHk0 ? 0 : Math.min(100, 1 + Math.floor((t - tHk0) * 1.6));

/* ---------- P: savings bars = a + (n-1) d ---------- */
const ps = $('#pS'), PB = 520, PU = 80, PX = i => 92 + i * 160;
const pBars = [0, 1, 2, 3].map(i => {
  const g = mk(ps, 'g', {}); const blocks = [];
  blocks.push(mk(g, 'rect', { x: PX(i), y: PB - PU, width: 112, height: PU, rx: 6, fill: ACB, stroke: AC, 'stroke-width': 3 }));
  for (let j = 1; j <= i; j++) blocks.push(mk(g, 'rect', { x: PX(i), y: PB - PU * (j + 1), width: 112, height: PU, rx: 6, fill: C.ac2, stroke: DC, 'stroke-width': 3 }));
  const v = txt(g, PX(i) + 56, PB - PU * (i + 1) - 16, '₹' + (20 * (i + 1)), { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
  const w = txt(g, PX(i) + 56, PB + 34, 'WEEK ' + (i + 1), { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'letter-spacing': 1.5 });
  return { g, blocks, v, w };
});
const pA = txt(ps, PX(0) + 56, PB - 30, 'a', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 34, fill: AC });
const pD = [1, 2, 3].map(j => txt(ps, PX(3) + 56, PB - PU * j - 30, 'd', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 34, fill: DC }));
const pBr = mk(ps, 'path', { d: `M${PX(3) + 128},${PB - PU} q14,0 14,14 v${PU * 3 - 28} q0,14 -14,14`, fill: 'none', stroke: NC, 'stroke-width': 3 });
pBr.setAttribute('d', `M${PX(3) + 124},${PB - PU * 4} q14,0 14,14 v${PU * 3 - 28} q0,14 -14,14`);
const pBrT = txt(ps, PX(3) + 70, PB - PU * 4 - 52, 'n - 1 = 3 jumps of d', { 'text-anchor': 'middle', 'font-size': 18, fill: NC, 'font-weight': 600 });
const PN = [[`${A('a')} = 20`, 'the first term'], [`${D('d')} = 20`, 'the common difference: what we add'], [`a_{${N('n')}} = ${A('a')} + (${N('n')} - 1)\\,${D('d')}`, 'term number n']];
$('#pN').innerHTML = `<div class="hiBox" id="pHi" style="left:20px;width:744px;height:122px"></div>` + PN.map(([f, w], i) => `<div class="nm" id="pn${i}" style="top:${84 + i * 136}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tPn = [wt('P3', 'first'), wt('P3', 'adding'), wt('P4', 'So')];

/* ---------- G: pairing rows (live) ---------- */
const GF = [1, 2, 3, 4, '...', 97, 98, 99, 100], GXs = i => 260 + i * 146;
let gh = `<div class="rl" style="top:110px">FORWARDS</div><div class="rl" style="top:206px">BACKWARDS</div><div class="rl" style="top:316px">COLUMN SUM</div>`;
GF.forEach((v, i) => {
  const dots = v === '...', b = dots ? '...' : 101 - v;
  gh += `<div class="gt${dots ? ' dots' : ''}" id="gf${i}" style="left:${GXs(i)}px;top:84px">${v}</div><div class="gt${dots ? ' dots' : ''}" id="gb${i}" style="left:${GXs(i)}px;top:180px">${b}</div><div class="gt${dots ? ' dots' : ''}" id="gs${i}" style="left:${GXs(i)}px;top:290px">${dots ? '...' : 101}</div>`;
});
$('#gRows').innerHTML = gh;
$('#gE1').innerHTML = K(`2S = ${N('100')} \\times ${D('101')} = 10100`);
$('#gE2').innerHTML = K(`S = 10100 \\div 2 = \\mathbf{5050}`);
const tGf = wt('G1', 'forwards'), tGb = wt('G2', 'backwards'), tGs0 = wt('G3', 'One'), tGs1 = wt('G3', 'Two'), tG4 = T0('G4'), tG4e = T1('G4');
const tGs = i => i === 0 ? tGs0 : i === 1 ? tGs1 : tG4 + (i - 2) * 0.22;
const gk = t => Math.round(100 * M.io((t - wt('G4', 'there')) / Math.max(0.5, tG4e - wt('G4', 'there'))));

/* ---------- L: staircase (live n) ---------- */
const lsv = $("#lSv"), CS = 48, LB = 500;
const lRects = [];
for (let i = 0; i < 8; i++) for (let j = 0; j < 9; j++) { const r = mk(lsv, 'rect', { width: CS - 4, height: CS - 4, rx: 5, 'stroke-width': 2.5 }); lRects.push({ i, j, r }); }
const lWl = txt(lsv, 392, LB + 36, '', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });
const lHl = txt(lsv, 0, 0, '', { 'text-anchor': 'end', 'font-size': 20, fill: NC, 'font-weight': 600 });
$('#lF').innerHTML = K(`1 + 2 + \\cdots + ${N('n')} = \\dfrac{${N('n')}(${N('n')} + 1)}{2}`);
const tL1a = [wt('L1', 'one'), wt('L1', 'two'), wt('L1', 'three')], tL2 = wt('L2', 'copy'), tL3 = wt('L3', 'grow'), tL3e = T1('L3') + 0.2;
const ln = t => t < tL3 ? 3 : Math.round(3 + 5 * M.io((t - tL3) / Math.max(1, tL3e - tL3)));
let lLast = -1;

/* ---------- D: derivation ---------- */
const DS = [
  `${SN} = ${A('a')} + (${A('a')} + ${D('d')}) + \\cdots + ${L('l')}`,
  `${SN} = ${L('l')} + (${L('l')} - ${D('d')}) + \\cdots + ${A('a')}`,
  `2${SN} = (${A('a')} + ${L('l')}) + \\cdots + (${A('a')} + ${L('l')})`,
  `2${SN} = ${N('n')}\\,(${A('a')} + ${L('l')})`,
  `${SN} = \\dfrac{${N('n')}}{2}\\,(${A('a')} + ${L('l')})`];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="st" id="ds${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5'), T0('D6')];
const dsv = $('#dSv'), DB = 470, DU = 54, DXc = i => 112 + i * 120;
const dF = [], dR = [];
const DFl = ['a', 'a+d', 'a+2d', 'a+3d', 'l'];
for (let i = 0; i < 5; i++) {
  const g1 = mk(mk(dsv, 'g', {}), 'g', {}); mk(g1, 'rect', { x: DXc(i), y: DB - DU * (i + 1), width: 96, height: DU * (i + 1), rx: 6, fill: ACB, stroke: AC, 'stroke-width': 3 });
  txt(g1, DXc(i) + 48, DB + 32, DFl[i], { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22, fill: i === 4 ? LC : AC, 'font-weight': 600 });
  dF.push(g1);
  const pg = mk(dsv, 'g', {}), g2 = mk(pg, 'g', {}); mk(g2, 'rect', { x: DXc(i), y: DB - DU * 6, width: 96, height: DU * (5 - i), rx: 6, fill: LCB, stroke: LC, 'stroke-width': 3 });
  dR.push({ pg, g2 });
}
const dTop = mk(dsv, 'line', { x1: DXc(0), y1: DB - DU * 6 - 18, x2: DXc(4) + 96, y2: DB - DU * 6 - 18, stroke: DC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const dTopT = txt(dsv, 392, DB - DU * 6 - 32, 'every column: a + l', { 'text-anchor': 'middle', 'font-size': 20, fill: DC, 'font-weight': 600 });
const dNT = txt(dsv, 392, DB + 70, 'n = 5 columns', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });
$('#dL1').innerHTML = K(`${L('l')} = ${A('a')} + (${N('n')} - 1)\\,${D('d')}`);
$('#dL2').innerHTML = K(`${SN} = \\dfrac{${N('n')}}{2}\\,\\big[\\,2${A('a')} + (${N('n')} - 1)\\,${D('d')}\\,\\big]`);
$('#dP').className = 'pillp ac'; $('#dP').textContent = 'Same sum, written with d instead of l';

/* ---------- C: two forms ---------- */
$('#c1F').innerHTML = K(`${SN} = \\dfrac{${N('n')}}{2}\\,(${A('a')} + ${L('l')})`);
$('#c2F').innerHTML = K(`${SN} = \\dfrac{${N('n')}}{2}\\,\\big[2${A('a')} + (${N('n')} - 1)${D('d')}\\big]`);
$('#c1E').innerHTML = K(`1 + \\cdots + 100 = \\tfrac{100}{2}(1 + 100) = 5050`);
$('#c2E').innerHTML = K(`\\text{first term, step, count: done}`);
const th1 = PUC.think($('#th1'), { q: '3, 7, 11, ... for 20 terms: which form is quicker?', opts: ['Form 1: uses the last term', 'Form 2: uses d'], right: 1, why: 'We know a = 3, d = 4 and n = 20, but not the last term yet.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${SN} = ${N('n')} \\times \\dfrac{${A('a')} + ${L('l')}}{2}`);

/* ---------- M: arithmetic mean ---------- */
const AB = s => `\\textcolor{${LC}}{${s}}`;
$('#mD').innerHTML = K(`\\text{A.M.} = ${G('A')} = \\dfrac{${A('a')} + ${AB('b')}}{2}`);
const msv = $('#mSv'), MX = v => 72 + v * 32, MY = 330;
mk(msv, 'line', { x1: 56, y1: MY, x2: 728, y2: MY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 20; v++) { mk(msv, 'line', { x1: MX(v), y1: MY - (v % 2 ? 6 : 10), x2: MX(v), y2: MY + (v % 2 ? 6 : 10), stroke: C.ink, 'stroke-width': 2 }); if (v % 4 === 0) txt(msv, MX(v), MY + 40, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const mY = mk(mk(msv, 'g', {}), 'g', {}); const mYc = mk(mY, 'circle', { cx: MX(4), cy: MY, r: 14, fill: AC });
const mYt = txt(msv, MX(4), MY - 30, 'you · 4', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600 });
const mF = mk(mk(msv, 'g', {}), 'g', {}); const mFc = mk(mF, 'circle', { cx: MX(16), cy: MY, r: 14, fill: LC });
const mFt = txt(msv, MX(16), MY - 30, 'friend · 16', { 'text-anchor': 'middle', 'font-size': 20, fill: LC, 'font-weight': 600 });
const mM = mk(mk(msv, 'g', {}), 'g', {}); mk(mM, 'circle', { cx: MX(10), cy: MY, r: 16, fill: '#fff', stroke: GC, 'stroke-width': 4 });
const mMt = txt(msv, MX(10), MY - 64, 'meet at 10', { 'text-anchor': 'middle', 'font-size': 20, fill: GC, 'font-weight': 600 });
const mAp = txt(msv, 392, MY + 84, '4, 10, 16: each step is 6', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const ksv = $('#kSv'), KX = v => 92 + (v - 4) * 50, KY = 300;
mk(ksv, 'line', { x1: 72, y1: KY, x2: 712, y2: KY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 4; v <= 16; v++) { mk(ksv, 'line', { x1: KX(v), y1: KY - 7, x2: KX(v), y2: KY + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ksv, KX(v), KY + 40, v, { 'text-anchor': 'middle', 'font-size': 17, fill: C.mute, 'font-weight': 600 }); }
mk(ksv, 'circle', { cx: KX(4), cy: KY, r: 14, fill: AC }); mk(ksv, 'circle', { cx: KX(16), cy: KY, r: 14, fill: LC });
const kArc = mk(ksv, 'path', { d: '', fill: 'none', stroke: DC, 'stroke-width': 3 });
const kDots = [0, 1, 2].map(() => mk(ksv, 'circle', { cx: -99, cy: KY, r: 13, fill: GC }));
const kNote = txt(ksv, 392, KY - 92, '', { 'text-anchor': 'middle', 'font-size': 20, fill: DC, 'font-weight': 600 });
const MEANS = { 1: [10], 2: [8, 12], 3: [7, 10, 13] };
const tKs = [wt('M5', 'One'), wt('M5', 'Two'), wt('M5', 'Three')];
const mk_ = t => t < tKs[1] - 0.1 ? 1 : t < tKs[2] - 0.1 ? 2 : 3;
let kLast = -1;
const avA = PUC.avatar($('#sM'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The mean is just the middle of a tiny A P.' });
const th2 = PUC.think($('#th2'), { q: 'What is the arithmetic mean of 6 and 20?', opts: ['13', '14'], right: 0, why: '(6 + 20) ÷ 2 = 26 ÷ 2 = 13. It sits 7 steps from each end.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the sum of the first 20 terms of<br>${K(`${A('3')},\\ 7,\\ 11,\\ \\dots`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${A('a')} = 3,\\ \\ ${D('d')} = 4,\\ \\ ${N('n')} = 20`)],
  [K(`S_{20} = \\tfrac{${N('20')}}{2}\\,[\\,2(${A('3')}) + 19(${D('4')})\\,]`)],
  [K(`= 10 \\times (6 + 76) = 10 \\times 82`)],
  [K(`S_{20} = \\mathbf{820}`)],
  [K(`\\text{check: } 20 \\times \\tfrac{${A('3')} + ${L('79')}}{2} = 20 \\times 41 = 820`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
$('#wStrip').innerHTML = K(`${A('3')},\\ 7,\\ 11,\\ 15,\\ \\dots,\\ ${L('79')}`);
const WT = [['FIRST', '3', AC], ['LAST', '79', LC], ['AVERAGE', '41', GC]];
$('#wTs').innerHTML = WT.map(([a, b, c], i) => `<div class="wt" id="wt${i}" style="left:${36 + i * 256}px;top:200px"><div class="lb">${a}</div><div class="vv" style="color:${c}">${b}</div></div>`).join('') + `<div class="lbl" id="wNl" style="left:36px;top:350px;color:${NC}">20 TERMS IN ALL</div>`;
$('#wRes').innerHTML = K(`${N('20')} \\times ${G('41')} = \\mathbf{820}`);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`1 + 3 + \\cdots + 99:\\ \\ ${N('n')} = 99`), right: K(`99 = 1 + (${N('n')} - 1)\\,2 \\Rightarrow ${N('n')} = 50,\\ \\ S = 2500`) });
const ts = $('#tS');
const tOdd = [1, 3, 5, 7, '...', 97, 99].map((v, i) => txt(ts, 40 + i * 74, 120, v, { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 }));
const tNote = txt(ts, 260, 176, 'one odd number in every two', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
const tNote2 = txt(ts, 260, 212, '50 odd numbers from 1 to 99', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Sums of an A P linked together: find a term, or the sum.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `The sum of the first n terms of an A P is<br>${K(`S_n = 3n^2 + 2n`)}. Find the 10th term.`,
  opts: ['57', '59', '63', '320'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`a_{10} = S_{10} - S_{9}`)], [K(`S_{10} = 300 + 20 = 320`)], [K(`S_{9} = 243 + 18 = 261`)], [K(`a_{10} = 320 - 261 = 59`)], ['D is the sum, not the term']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'tenth'), wt('A3', 'ten'), wt('A3', 'nine'), wt('A4', 'Subtract'), wt('A4', 'trap')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 520, title: 'Recap · sum of an A P and A.M.', y0: 96, dy: 84, txt: [0, 0, 0, 0, 1],
  lines: [K(`${SN} = \\tfrac{${N('n')}}{2}\\,(${A('a')} + ${L('l')})`),
    K(`${SN} = \\tfrac{${N('n')}}{2}\\,[\\,2${A('a')} + (${N('n')} - 1)${D('d')}\\,]`),
    K(`1 + 2 + \\cdots + ${N('n')} = \\tfrac{${N('n')}(${N('n')} + 1)}{2}`),
    K(`\\text{A.M. of } a, b = \\tfrac{a + b}{2}`),
    '<b>k means</b> between a and b: step = (b - a) ÷ (k + 1)'] });
const YQ = ['Why does every column add up to the same total?', 'Find the sum of the first 50 natural numbers.', 'Insert two arithmetic means between 3 and 18.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 65', topic: 'A rumour that doubles every hour: Geometric Progression', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tG4 - 0.2, 1.05, 960, 560], [T0('G6') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#hSum'), t, tMorph + 0.3, 0.8);
    $('#sH').querySelectorAll('.hv').forEach((e, i) => M.vis(e, t, tMorph + 0.6 + i * 0.1, 1e9, { dy: 12 }));
    const k = hk(t); M.setT($('#hK'), String(k)); M.setT($('#hT'), String(k * (k + 1) / 2));
    $('#hBar i').style.width = (712 * k / 100).toFixed(1) + 'px'; M.vis($('#hBar'), t, tMorph + 0.7, 1e9, { dy: 0 });
    M.setT($('#hGo'), `${100 - k} numbers to go`); M.vis($('#hGo'), t, tHk0 + 0.5, 1e9, { dy: 0 });
    M.vis($('#gC'), t, wt('H3', 'Gauss') - 0.1, 1e9, { dy: 16 });
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'pairs') - 0.1, 1e9, POP);
  }

  /* P: what an AP is */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('G1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tb = [wt('P2', 'Twenty', 1), wt('P2', 'forty'), wt('P2', 'sixty'), wt('P2', 'eighty')];
    pBars.forEach((b, i) => { M.vis(b.g, t, tb[i] - 0.1, 1e9, { dy: 20, fade: 0.15 }); });
    M.vis(pA, t, wt('P3', 'first'), 1e9, { dy: 0 });
    pD.forEach((e, j) => M.vis(e, t, wt('P3', 'adding') + j * 0.12, 1e9, { dy: 0 }));
    M.vis(pBr, t, wt('P4', 'only'), 1e9, { dy: 0 }); M.vis(pBrT, t, wt('P4', 'only') + 0.1, 1e9, { dy: 0 });
    M.vis($('#pb'), t, wt('P3', 'first') - 0.3, out, { dx: 60, dy: 0, ...o });
    PN.forEach((_, i) => { const el = $('#pn' + i); M.vis(el.querySelector('.n'), t, tPn[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPn[i], 0.8); M.vis(el.querySelector('.why'), t, tPn[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tPn[1] - 0.1, 220], [tPn[2] - 0.1, 356]], M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPn[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#pG'), t, wt('P5', 'Class') - 0.1, 1e9, POP);
  }

  /* G: pairing trick */
  const gOn = t >= tG1 - 0.1 && t < tL1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('L1');
    M.vis($('#ga'), t, tG1 + 0.05, out, { dy: 36, ...o });
    $('#sG').querySelectorAll('.rl').forEach((e, i) => M.vis(e, t, [tGf, tGb, tGs0][i] - 0.2, 1e9, { dy: 8 }));
    GF.forEach((v, i) => {
      M.vis($('#gf' + i), t, tGf + i * 0.09, 1e9, { dx: -14, dy: 0, fade: 0.12 });
      M.vis($('#gb' + i), t, tGb + i * 0.09, 1e9, { dx: 14, dy: 0, fade: 0.12 });
      M.vis($('#gs' + i), t, tGs(i), 1e9, { ...POP, sc: 0.6 });
      if (v !== '...') {
        const s = M.io((t - tGs(i)) / 0.25), hi = M.io((t - tGs(i) + 0.3) / 0.15) * (1 - M.io((t - tGs(i) - 0.5) / 0.3));
        $('#gs' + i).style.background = mix(C.soft, C.ac2, s); $('#gs' + i).style.color = mix(C.ink, DC, s); $('#gs' + i).style.borderColor = mix(C.soft, DC, s);
        $('#gf' + i).style.borderColor = mix('#FFFFFF', AC, hi); $('#gb' + i).style.borderColor = mix('#FFFFFF', LC, hi);
        $('#gf' + i).style.borderColor = hi > 0.01 ? mix(C.soft, AC, hi) : 'transparent'; $('#gb' + i).style.borderColor = hi > 0.01 ? mix(C.soft, LC, hi) : 'transparent';
      }
    });
    M.vis($('#gK'), t, tG4 - 0.1, 1e9, { dy: 12 }); M.setT($('#gKv'), String(gk(t)));
    PUC.write($('#gE1'), t, wt('G5', 'times') - 0.3, 0.9);
    PUC.write($('#gE2'), t, wt('G6', 'half') - 0.2, 0.9);
  }

  /* L: staircase */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#lf'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lp'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const n = ln(t), x0 = 392 - n * CS / 2;
    lRects.forEach(({ i, j, r }) => {
      const blue = j <= i, show = i < n && j <= n;
      if (!show) { M.hide(r, true); return; }
      const tin = blue ? (i < 3 ? tL1a[i] + j * 0.06 : tL3 + 0.1) : (i < 3 && n === 3 ? tL2 + (2 - i) * 0.1 : tL3 + 0.1);
      const u = M.io((t - tin) / 0.35);
      if (u <= 0 && t < tL3) { M.hide(r, true); return; }
      M.hide(r, false);
      const dy = blue ? 0 : -120 * (1 - u);
      attr(r, 'x', (x0 + i * CS + 2).toFixed(1)); attr(r, 'y', (LB - (j + 1) * CS + 2 + dy).toFixed(1));
      attr(r, 'fill', blue ? ACB : C.ac2); attr(r, 'stroke', blue ? AC : DC);
      r.style.opacity = (t >= tL3 ? 1 : u).toFixed(3);
    });
    if (n !== lLast) { lLast = n;
      const terms = Array.from({ length: n }, (_, i) => i + 1).join(' + ');
      $('#lN').innerHTML = `<i style="font-family:Poppins;color:${NC}">n</i> = ${n}`;
      $('#lS').innerHTML = K(`${terms} = ${n * (n + 1) / 2}`);
      $('#lR').innerHTML = K(`\\text{rectangle } ${N(n)} \\times ${N(n + 1)} = ${n * (n + 1)},\\ \\ \\text{half} = ${n * (n + 1) / 2}`);
      M.setT(lWl, `n = ${n} wide`); M.setT(lHl, `${n + 1} tall`); attr(lHl, 'x', (x0 - 12).toFixed(1)); attr(lHl, 'y', (LB - (n + 1) * CS / 2 + 6).toFixed(1)); }
    M.vis(lWl, t, tL2 + 0.4, 1e9, { dy: 0 }); M.vis(lHl, t, tL2 + 0.5, 1e9, { dy: 0 });
    PUC.write($('#lF'), t, wt('L4', 'So') - 0.1, 0.9);
    M.vis($('#lN'), t, tL1 + 0.5, 1e9, { dy: 12 }); M.vis($('#lS'), t, tL1a[2] + 0.2, 1e9, { dy: 12 }); M.vis($('#lR'), t, tL2 + 0.6, 1e9, { dy: 12 });
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, T0('D7') - 0.1, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 2).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const picOut = T0('D7') - 0.1;
    dF.forEach((g, i) => M.vis(g, t, wt('D2', 'forwards') + i * 0.12, picOut, { dy: 14, fade: 0.12, outDur: 0.25 }));
    dR.forEach(({ pg, g2 }, i) => { const u = M.io((t - wt('D3', 'backwards') - i * 0.12) / 0.5); attr(pg, 'transform', `translate(0,${(-60 * (1 - u)).toFixed(1)})`); M.vis(g2, t, wt('D3', 'backwards') + i * 0.12, picOut, { dy: 0, fade: 0.2, outDur: 0.25 }); });
    M.vis($('#dLb'), t, tD1 + 0.4, picOut, { dy: 8 });
    M.vis(dTop, t, wt('D4', 'every'), picOut, { dy: 0 }); M.vis(dTopT, t, wt('D4', 'every'), picOut, { dy: 0 });
    M.vis(dNT, t, wt('D5', 'columns') - 0.2, picOut, { dy: 0 });
    PUC.write($('#dL1'), t, wt('D7', 'And') + 0.1, 0.8);
    PUC.write($('#dL2'), t, wt('D7', 'equals') - 0.2, 1.1);
    M.vis($('#dP'), t, T1('D7') - 0.3, 1e9, POP);
  }

  /* C: two forms + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, tC1 + 0.4, 0.8); M.vis($('#c1E'), t, wt('C1', 'last') - 0.1, 1e9, { dy: 10 }); M.vis($('#c1P'), t, wt('C1', 'last') + 0.2, 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, T0('C2') + 0.1, 0.9); M.vis($('#c2E'), t, wt('C2', 'common') - 0.1, 1e9, { dy: 10 }); M.vis($('#c2P'), t, wt('C2', 'difference'), 1e9, POP);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'Which') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'know') });
  }

  /* statement */
  const stOn = t >= tT && t < tM1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tM1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'number') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'average') - 0.2, 0.8);
  }

  /* M: arithmetic mean + k means */
  const mOn = t >= tM1 - 0.1 && t < tW1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('M6');
    M.vis($('#ml'), t, tM1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#mD'), t, wt('M2', 'mean') - 0.1, 1.0);
    const tm3 = wt('M3', 'four'), tmF = wt('M3', 'sixteen'), tmMeet = wt('M3', 'meet', 1);
    M.vis(mY, t, tm3 - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(mYt, t, tm3, 1e9, { dy: 0 });
    M.vis(mF, t, tmF - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(mFt, t, tmF, 1e9, { dy: 0 });
    const u = M.io((t - tmMeet + 0.3) / 0.9);
    attr(mYc, 'cx', MX(4 + 6 * u).toFixed(1)); attr(mFc, 'cx', MX(16 - 6 * u).toFixed(1));
    M.vis(mM, t, tmMeet + 0.4, 1e9, { ...POP, sc: 0.4 }); M.vis(mMt, t, tmMeet + 0.5, 1e9, { dy: 0 });
    M.vis(mAp, t, wt('M3', 'And') - 0.1, 1e9, { dy: 0 });
    avA(t, T1('M5') - 0.2, out);
    M.vis($('#mr'), t, T0('M4') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kRd'), t, T0('M4') + 0.2, 1e9, { dy: 12 });
    const k = mk_(t);
    if (k !== kLast) { kLast = k; M.setT($('#kV'), String(k)); $('#mSt').innerHTML = K(`\\text{step} = \\dfrac{16 - 4}{${N(k)} + 1} = ${12 / (k + 1)}`);
      $('#mL').innerHTML = K(`${A('4')},\\ ${MEANS[k].map(G).join(',\\ ')},\\ ${AB('16')}`);
      const pts = [4, ...MEANS[k], 16]; let d = ''; for (let i = 0; i < pts.length - 1; i++) { const a = KX(pts[i]), b = KX(pts[i + 1]); d += `M${a},${KY - 18} Q${(a + b) / 2},${KY - 70} ${b},${KY - 18} `; } attr(kArc, 'd', d);
      M.setT(kNote, `${k + 1} equal steps of ${12 / (k + 1)}`); }
    M.vis($('#mSt'), t, wt('M4', 'cut') - 0.1, 1e9, { dy: 10 });
    const kOnT = tKs[0] - 0.1;
    kDots.forEach((c, i) => { const on = i < k; attr(c, 'cx', on ? KX(MEANS[k][i]) : -99); M.vis(c, t, on ? Math.max(kOnT, tKs[k - 1] - 0.1) + i * 0.1 : null, on ? 1e9 : -1, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
    M.vis(kArc, t, kOnT, 1e9, { dy: 0 }); M.vis(kNote, t, kOnT, 1e9, { dy: 0 });
    M.vis($('#mL'), t, kOnT + 0.2, 1e9, { dy: 10 });
    M.vis($('#th2'), t, tM6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tM6, tOpts: wt('M6', 'mean') - 0.1, tCount: T1('M6') + 0.05, dur: 3, tAns: T0('M7') - 0.02, tWhy: wt('M7', 'twenty') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#wStrip'), t, T0('W2') + 0.8, 0.9);
    WT.forEach((_, i) => M.vis($('#wt' + i), t, [wt('W3', 'three'), wt('W7', 'seventy'), wt('W7', 'forty')][i] - 0.1, 1e9, POP));
    M.vis($('#wNl'), t, wt('W3', 'twenty') - 0.1, 1e9, { dy: 8 });
    PUC.write($('#wRes'), t, wt('W7', 'gives') - 0.1, 0.8);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'every') - 0.1, tRight: wt('X3', 'fifty') - 0.3 });
    tOdd.forEach((e, i) => M.vis(e, t, T0('X2') + 0.4 + i * 0.1, 1e9, { dy: 0 }));
    M.vis(tNote, t, wt('X3', 'second') - 0.1, 1e9, { dy: 0 }); M.vis(tNote2, t, wt('X3', 'fifty') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'linked') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
