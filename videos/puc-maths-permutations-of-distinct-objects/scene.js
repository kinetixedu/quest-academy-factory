// PUC Maths Ep 54: Permutations of distinct objects (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: n (things to choose from) blue, r (places to fill) coral accent, choices per place violet, the count nPr teal, crossed out red
const XC = C.violet, RC = C.ac, NC = '#2F6FEB', PC = '#0E8F8F', PCB = '#DDF1F1';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const nc = s => `\\textcolor{${NC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, xc = s => `\\textcolor{${XC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const nPr = (n = 'n', r = 'r') => pc(`{}^{${nc(n)}}P_{${rc(r)}}`);

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tK1 = T0('K1'), tK4 = T0('K4'), tL2 = T0('L2'), tD2 = T0('D2'), tD5 = T0('D5'), tV1 = T0('V1'), tV4 = T0('V4'), tG1 = T0('G1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['BADGE 1', 'Captain'], ['BADGE 2', 'Vice captain'], ['FRIENDS', '5 to choose from']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'captain') - 0.1, wt('H1', 'vice') - 0.1, wt('H1', 'other') - 0.3];

/* ---------- H ---------- */
const SWR = [['WAY 1', 'Meera', 'Sana'], ['WAY 2', 'Sana', 'Meera']];
$('#sws').innerHTML = SWR.map(([w, a, b], i) => `<div class="sw" id="sw${i}" style="top:${272 + i * 100}px"><div class="wn">${w}</div>
  <div class="bd" style="left:120px;background:var(--ac)"><i>CAPTAIN</i>${a}</div><div class="bd" style="left:390px;background:var(--ink)"><i>VICE</i>${b}</div></div>`).join('');

/* ---------- P: definition + places ---------- */
const GL = [['ARRANGEMENT', 'putting things into places'], ['DEFINITE ORDER', '1st place and 2nd place differ'], ['SOME OR ALL', 'fill a few places, or every place']];
$('#gls').innerHTML = GL.map(([k, v], i) => `<div class="gls" id="gl${i}" style="top:${330 + i * 78}px"><div class="gk">${k}</div><div class="gt">${v}</div></div>`).join('');
const FR = ['Meera', 'Sana', 'Ravi', 'Kiran', 'Joel'];
const SX = i => 36 + i * 148;
$('#mS').innerHTML = FR.map((_, i) => `<div class="ps" id="ps${i}" style="left:${SX(i)}px"></div><div class="psl" id="psl${i}" style="left:${SX(i)}px">${['1st', '2nd', '3rd', '4th', '5th'][i]}</div>`).join('') +
  FR.map((f, i) => `<div class="tk" id="pt${i}">${f}</div>`).join('') +
  `<div class="tag" id="tg0" style="left:${SX(0) - 4}px">CAPTAIN</div><div class="tag" id="tg1" style="left:${SX(1) + 14}px;background:var(--ink)">VICE</div>`;
const tDrop = i => i < 2 ? wt('P4', 'putting') + i * 0.25 : wt('P5', 'every') + (i - 2) * 0.18;

/* ---------- K: swap ---------- */
const kSlots = id => `<div class="ks" style="left:60px"><div class="kl" style="color:var(--ac)">CAPTAIN</div></div><div class="ks" style="left:424px"><div class="kl">VICE CAPTAIN</div></div>
  <div class="tk big" id="${id}a">Meera</div><div class="tk big" id="${id}b">Sana</div>`;
$('#kwS').innerHTML = kSlots('kwT'); $('#knS').innerHTML = kSlots('knT');
const KX = [60 + 85, 424 + 85], KY = 170;
const place = (el, x, y) => { el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; };
place($('#kwTa'), KX[0], KY); place($('#kwTb'), KX[1], KY);
const tSwap = wt('K1', 'swap') + 0.3;
const th1 = PUC.think($('#th1'), { q: 'Lock code 1-2-3 and lock code 3-2-1: same, or different?', opts: ['Same', 'Different'], right: 1, why: 'The lock opens only in the right order: a lock code is a permutation.' });

/* ---------- L: the 5 x 5 grid ---------- */
const GX = j => 160 + j * 112, GY = i => 150 + i * 72;
let gh = FR.map((f, j) => `<div class="gn" id="gcn${j}" style="left:${GX(j)}px;top:112px;width:104px;text-align:center">${f}</div>`).join('') +
  FR.map((f, i) => `<div class="gn" id="grn${i}" style="left:36px;top:${GY(i) + 18}px">${f}</div>`).join('');
const GOOD = [];
for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { gh += `<div class="gc" id="gc${i}${j}" style="left:${GX(j)}px;top:${GY(i)}px"></div>`; if (i !== j) GOOD.push([i, j]); }
$('#lgG').innerHTML = gh;
const tFill0 = wt('L6', 'Five'), tFill1 = wt('L6', 'Twenty') - 0.15;
const tCell = k => tFill0 + k * (tFill1 - tFill0) / 19;
$('#lcF').innerHTML = K(`${xc('5')} \\times ${xc('4')} = ${pc('20')}`);
const avD = PUC.avatar($('#sL'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Ten counts each pair once. Two badges count it twice.' });

/* ---------- D: derivation ---------- */
const GSL = ['1st', '2nd', '3rd', '', 'r-th'], GSV = [nc('n'), `${nc('n')}-1`, `${nc('n')}-2`, '\\cdots', `${nc('n')}-${rc('r')}+1`];
$('#d2').innerHTML = GSL.map((l, i) => `<div class="gs" id="gs${i}" style="left:${36 + i * 145}px${i === 3 ? ';border-style:dashed;border-color:#CBD0DA' : ''}"><div class="bl">${l}</div><div class="bv">${K(GSV[i])}</div></div>`).join('');
$('#dN').innerHTML = `${K(nc('n'))}&nbsp;= different things to choose from`;
$('#dR').innerHTML = `${K(rc('r'))}&nbsp;= places to fill`;
const DS = [[`\\text{1st place: } ${xc('5')}`, 'any of the five friends'], [`\\text{2nd place: } ${xc('4')}`, 'one friend is used up'], [`${xc('5')} \\times ${xc('4')} = ${pc('20')}`, 'counting principle: multiply the choices'],
  [`${nc('n')},\\ ${nc('n')}-1,\\ ${nc('n')}-2,\\ \\dots,\\ ${nc('n')}-${rc('r')}+1`, 'each place uses up one thing'], [`${nPr()} = ${nc('n')}(${nc('n')}-1)(${nc('n')}-2)\\cdots(${nc('n')}-${rc('r')}+1)`, 'P stands for permutation']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:96px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Five', 1), wt('D3', 'four'), wt('D4', 'multiply'), wt('D6', 'first'), wt('D8', 'written')];
const tGs = [wt('D6', 'first'), wt('D6', 'second'), wt('D6', 'third'), wt('D7', 'Each'), wt('D7', 'last')];

/* ---------- V: one more place at a time ---------- */
const VAL = [5, 20, 60, 120, 120];
$('#vS').innerHTML = [5, 4, 3, 2, 1].map((v, i) => `<div class="vs" id="vs${i}" style="left:${SX(i)}px">${v}</div><div class="psl" id="vsl${i}" style="left:${SX(i)}px;top:336px">${['1st', '2nd', '3rd', '4th', '5th'][i]}</div>`).join('');
$('#vV').innerHTML = `${K(nPr('5'))} = <b id="vVn">0</b>`;
const tR = [wt('V2', 'One'), wt('V2', 'Two'), wt('V2', 'Three'), wt('V3', 'Four'), wt('V3', 'Five')];
const vb = $('#vB'), BX = i => 110 + i * 130, BY0 = 480, BH = v => v / 120 * 300;
mk(vb, 'line', { x1: 70, y1: BY0, x2: 730, y2: BY0, stroke: C.ink, 'stroke-width': 3 });
const bars = VAL.map((v, i) => { const r = mk(vb, 'rect', { x: BX(i), y: BY0, width: 84, height: 0, rx: 8, fill: i === 4 ? PC : mix(PC, '#FFFFFF', 0.25) });
  const lv = txt(vb, BX(i) + 42, BY0 - BH(v) - 16, v, { 'text-anchor': 'middle', 'font-size': 26, fill: PC, 'font-weight': 600 });
  const lr = txt(vb, BX(i) + 42, BY0 + 40, `r = ${i + 1}`, { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 }); return { r, lv, lr, v }; });
const vSame = txt(vb, BX(3) + 107, BY0 - BH(120) - 62, 'no change', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
let vLast = -1;
const th2 = PUC.think($('#th2'), { q: 'Why did the count stop growing at the 5th place?', opts: ['Only 1 friend is left', 'The badges ran out'], right: 0, why: 'After 4 places only one friend is left: 1 choice, and times 1 changes nothing.' });

/* ---------- G: factorial form ---------- */
$('#g5').innerHTML = K(`5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120`);
$('#gT').innerHTML = [5, 4, 3, 2, 1].map((v, i) => `<div class="tl" id="tl${i}" style="left:${36 + i * 140}px">${v}</div>`).join('');
const gs = $('#gS');
const brK = mk(gs, 'path', { d: `M36,280 v14 h250 v-14`, fill: 'none', stroke: RC, 'stroke-width': 3 });
const brKt = txt(gs, 161, 324, 'we need these', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const brM = mk(gs, 'path', { d: `M316,280 v14 h390 v-14`, fill: 'none', stroke: C.red, 'stroke-width': 3 });
const brMt = txt(gs, 511, 324, 'missing part: 3! = 6', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
$('#gFr').innerHTML = K(`\\dfrac{5 \\times 4 \\times ${red('3 \\times 2 \\times 1')}}{${red('3 \\times 2 \\times 1')}} = ${xc('5')} \\times ${xc('4')} = ${pc('20')}`);
const GS = [[`${nc('n')}! = ${nc('n')}(${nc('n')}-1)(${nc('n')}-2)\\cdots 1`, 'multiply all the way down to 1'], ['5! = 120', '5 × 4 × 3 × 2 × 1'],
  [`\\text{missing part} = (${nc('n')}-${rc('r')})!`, 'the product stopped early'], [`${nPr()} = ${nc('n')}! \\div (${nc('n')}-${rc('r')})!`, 'divide the missing part away'],
  [`${nPr('5', '2')} = 120 \\div 3! = 120 \\div 6 = ${pc('20')}`, 'matches the grid']];
$('#gSt').innerHTML = `<div class="hiBox" id="gHi" style="left:20px;width:744px;height:96px"></div>` + GS.map(([f, w], i) => `<div class="st" id="gs${i}x" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tGst = [wt('G2', 'factorial'), wt('G2', 'Five'), wt('G3', 'missing'), wt('G4', 'equals'), wt('G5', 'Check')];
const avA = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So nPr is a factorial with its tail cut off.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${nPr()} = \\dfrac{${nc('n')}!}{(${nc('n')}-${rc('r')})!}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `8 runners race. Gold, silver and bronze go to the first three. How many ways can the medals go?`;
const wsol = PUC.solution($('#wl'), [
  ['Gold is not silver: order matters'],
  [K(`${nc('n')} = ${nc('8')} \\text{ runners},\\ \\ ${rc('r')} = ${rc('3')} \\text{ medals}`)],
  [K(`${nPr('8', '3')} = 8! \\div 5!`)],
  [K(`= ${xc('8')} \\times ${xc('7')} \\times ${xc('6')}`)],
  [K(`= ${pc('336')} \\text{ ways}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 74 });
$('#wl .lbl').style.top = '30px';
const ws = $('#wS');
const POD = [['2nd · SILVER', '#8A94A6', 110, 340, 160, 7], ['1st · GOLD', '#B7791F', 302, 270, 230, 8], ['3rd · BRONZE', '#A0623A', 494, 390, 110, 6]];
const pod = POD.map(([l, col, x, y, h, v]) => { const g = mk(mk(ws, 'g', {}), 'g', {}); mk(g, 'rect', { x, y, width: 180, height: h, rx: 10, fill: mix(col, '#FFFFFF', 0.78), stroke: col, 'stroke-width': 3 });
  txt(g, x + 90, y + 40, l, { 'text-anchor': 'middle', 'font-size': 17, fill: col, 'font-weight': 600, 'letter-spacing': 1 });
  const cg = mk(mk(ws, 'g', { transform: `translate(${x + 90},${y - 56})` }), 'g', {}); mk(cg, 'circle', { r: 40, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(cg, 0, 14, v, { 'text-anchor': 'middle', 'font-size': 40, fill: XC, 'font-weight': 600 });
  return { g, cg }; });
mk(ws, 'line', { x1: 80, y1: 500, x2: 704, y2: 500, stroke: C.ink, 'stroke-width': 3 });
const wTot = txt(ws, 392, 548, '8 × 7 × 6 = 336', { 'text-anchor': 'middle', 'font-size': 30, fill: PC, 'font-weight': 600 });
const tPod = [wt('W2', 'silver'), wt('W2', 'Gold'), wt('W2', 'bronze')], tPv = [wt('W6', 'seven'), wt('W6', 'eight'), wt('W6', 'six')];
const tW = [wt('W3', 'Gold'), wt('W4', 'eight'), wt('W5', 'Eight'), wt('W6', 'leaving'), wt('W7', 'three')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`8 \\times 8 \\times 8 = 512`), right: K(`8 \\times 7 \\times 6 = 336`) + '&nbsp; one runner, one medal' });
const ts = $('#tS');
const tSl = [0, 1, 2].map(i => { const g = mk(mk(ts, 'g', { transform: `translate(${120 + i * 150},130)` }), 'g', {}); const c = mk(g, 'circle', { r: 46, fill: '#fff', stroke: C.red, 'stroke-width': 3 });
  const a = txt(g, 0, 15, '8', { 'text-anchor': 'middle', 'font-size': 42, fill: C.red, 'font-weight': 600 }); const b = txt(g, 0, 15, [8, 7, 6][i], { 'text-anchor': 'middle', 'font-size': 42, fill: C.ok, 'font-weight': 600 });
  txt(ts, 120 + i * 150, 214, ['GOLD', 'SILVER', 'BRONZE'][i], { 'text-anchor': 'middle', 'font-size': 17, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1 }); return { g, c, a, b }; });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Make numbers from given digits, no digit repeated: how many?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Digits ${K('0, 1, 2, 3, 4, 5')}, no digit repeated.<br>How many 4-digit even numbers are there?`,
  opts: ['120', '156', '180', '300'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{last} = 0:\\ 5 \\times 4 \\times 3 = 60`)], [K(`\\text{last} = 2 \\text{ or } 4:\\ 2 \\text{ ways}`)], [K(`\\text{first: not } 0,\\ \\text{not last}: 4`)], [K(`2 \\times 4 \\times 4 \\times 3 = 96`)], [K(`60 + 96 = ${pc('156')}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Zero'), wt('A3', 'two'), wt('A4', 'first'), wt('A4', 'Two'), wt('A5', 'Sixty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · permutations', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Permutation</b>: an arrangement where order matters',
    K(`${nPr()} = ${nc('n')}(${nc('n')}-1)(${nc('n')}-2)\\cdots(${nc('n')}-${rc('r')}+1)`),
    K(`${nPr()} = ${nc('n')}! \\div (${nc('n')}-${rc('r')})!`),
    K(`${nPr('5', '2')} = ${xc('5')} \\times ${xc('4')} = ${pc('20')}`),
    'Repeats allowed: <b>n<sup>r</sup></b> · no repeats: <b>nPr</b>'] });
const YQ = ['Why is swapping the two badges a new way?', `Find ${K('{}^{7}P_{2}')}.`, `Why is ${K('{}^{5}P_{4}')} equal to ${K('{}^{5}P_{5}')}?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 55', topic: 'APPLE has two P\'s: how many words can it really make?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFill0 - 0.3, 1.05, 960, 560], [T1('L6') + 0.2, 1, 960, 540]]);

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
    M.vis($('#gb0'), t, wt('H2', 'guess') - 0.1, 1e9, { dy: 16 }); M.vis($('#gb1'), t, wt('H2', 'real') - 0.1, 1e9, { dy: 16 });
    $('#gk').style.width = (130 * M.io((t - wt('H2', 'twenty')) / 0.35)).toFixed(1) + 'px';
    M.vis($('#sw0'), t, wt('H4', 'Meera') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#sw1'), t, wt('H4', 'Or') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#hP'), t, wt('H5', 'order') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'twice') - 0.2, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tK1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('P3') + 0.05, { st: 0.045, sp: M.HEAVY });
    $('#dfO').style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('P4', 'Definite')) / 0.3));
    [wt('P4', 'Arrangement'), wt('P4', 'Definite'), wt('P5', 'Some')].forEach((tt, i) => M.vis($('#gl' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#mt'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 5; i++) {
      M.vis($('#ps' + i), t, T0('P4') + 0.2 + i * 0.06, 1e9, { dy: 10 }); M.vis($('#psl' + i), t, T0('P4') + 0.3 + i * 0.06, 1e9, { dy: 0 });
      const lit = M.io((t - tDrop(i) - 0.3) / 0.3); $('#ps' + i).style.borderColor = mix('#CBD0DA', RC, lit); $('#ps' + i).style.borderStyle = lit > 0.5 ? 'solid' : 'dashed';
      const tk = $('#pt' + i); M.vis(tk, t, T0('P4') + 0.3 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      const u = M.io((t - tDrop(i)) / 0.5); place(tk, SX(i) + 18, 84 + (225 - 84) * u);
    }
    M.vis($('#tg0'), t, wt('P4', 'first') - 0.1, 1e9, POP); M.vis($('#tg1'), t, wt('P4', 'second') - 0.1, 1e9, POP);
    const rr = t < wt('P5', 'every') ? 2 : 5; M.setT($('#mR'), rr === 2 ? 'r = 2 places filled · some' : 'r = 5 places filled · all');
    M.vis($('#mR'), t, wt('P5', 'few') - 0.1, 1e9, POP); $('#mR').style.color = RC;
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tL2 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#kw'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kwTa'), t, wt('K1', 'Meera') - 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis($('#kwTb'), t, wt('K1', 'Sana') - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#kwP'), t, wt('K1', 'vice') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, wt('K1', 'swap') - 0.2, out, { dx: 60, dy: 0, ...o });
    const u = M.io((t - tSwap) / 0.8), a = $('#knTa'), b = $('#knTb');
    place(a, KX[0] + (KX[1] - KX[0]) * u, KY - 90 * Math.sin(Math.PI * u)); place(b, KX[1] + (KX[0] - KX[1]) * u, KY + 60 * Math.sin(Math.PI * u));
    M.vis(a, t, wt('K1', 'swap') + 0.1, 1e9, { dy: 0, fade: 0.1 }); M.vis(b, t, wt('K1', 'swap') + 0.1, 1e9, { dy: 0, fade: 0.1 });
    M.vis($('#knP'), t, wt('K2', 'different') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK4 + 0.05, OUT('L2'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'Same') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'lock') });
  }

  /* L: grid */
  const lOn = t >= tL2 - 0.1 && t < tD2 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D2');
    M.vis($('#lg'), t, tL2 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lgC'), t, wt('L2', 'captains') - 0.3, 1e9, { dy: 8 }); M.vis($('#lgV'), t, wt('L3', 'vice') - 0.2, 1e9, { dy: 8 });
    FR.forEach((_, i) => { M.vis($('#grn' + i), t, wt('L2', 'Five') + i * 0.12, 1e9, { dx: -12, dy: 0 }); M.vis($('#gcn' + i), t, wt('L3', 'same') + i * 0.12, 1e9, { dy: 10 }); });
    const tX = wt('L5', 'diagonal');
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const el = $(`#gc${i}${j}`); M.vis(el, t, wt('L4', 'Each') - 0.1 + (i + j) * 0.04, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      if (i === j) { const x = M.io((t - tX - i * 0.12) / 0.25); el.style.background = mix(C.soft, C.redBg, x); el.style.borderColor = mix(C.soft, C.red, x); if (x > 0.5) PUC.setIco(el, 'x', C.red, 30, 3); else if (el._k) { el._k = null; el.innerHTML = ''; } continue; }
      const k = GOOD.findIndex(([a, b]) => a === i && b === j), f = M.io((t - tCell(k)) / 0.2);
      const hi = i === 0 && j === 1 ? M.io((t - wt('L4', 'Ravi')) / 0.3) * (1 - f) : 0;
      el.style.background = mix(mix(C.soft, '#FFFFFF', hi), C.ac2, f); el.style.borderColor = hi > 0.01 ? mix('#FFFFFF', RC, hi) : mix(C.soft, RC, f);
      M.setT(el, f > 0.3 ? String(k + 1) : hi > 0.3 ? 'R, M' : '');
      el.style.fontSize = hi > 0.3 && f <= 0.3 ? '19px' : '';
    }
    M.vis($('#lc'), t, tL2 + 0.3, out, { dx: 60, dy: 0, ...o });
    const cnt = GOOD.reduce((a, _, k) => a + (t >= tCell(k) + 0.1 ? 1 : 0), 0); M.setT($('#lcN'), String(cnt));
    M.vis($('#lcXl'), t, tX - 0.1, 1e9, { dy: 8 }); M.vis($('#lcX'), t, tX + 0.4, 1e9, POP);
    PUC.write($('#lcF'), t, wt('L6', 'times') - 0.1, 0.7);
    M.vis($('#lcP'), t, wt('L6', 'not') - 0.1, 1e9, POP);
    avD(t, wt('L6', 'ten') + 0.4, out);
  }

  /* D: derivation */
  const dOn = t >= tD2 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#ds'), t, tD2 + 0.1, out, { dx: -60, dy: 0, ...o });
    const p1o = wt('D5', 'general') - 0.1;
    M.vis($('#d1'), t, null, p1o, { outDur: 0.3, ody: -16 });
    M.vis($('#bs0'), t, wt('D2', 'two') - 0.1, 1e9, { dy: 14 }); M.vis($('#bs1'), t, wt('D2', 'two') + 0.1, 1e9, { dy: 14 });
    M.vis($('#bs0 .bv'), t, tDs[0] - 0.05, 1e9, POP); M.vis($('#bs1 .bv'), t, tDs[1] - 0.05, 1e9, POP);
    M.vis($('#dX'), t, wt('D4', 'multiply'), 1e9, POP); M.vis($('#d1P'), t, wt('D4', 'twenty') - 0.1, 1e9, POP);
    GSL.forEach((_, i) => { const el = $('#gs' + i); M.vis(el, t, p1o + 0.3 + i * 0.08, 1e9, { dy: 14 }); M.vis(el.querySelector('.bv'), t, tGs[i] - 0.05, 1e9, POP); });
    M.vis($('#dN'), t, wt('D5', 'things') - 0.1, 1e9, POP); M.vis($('#dR'), t, wt('D5', 'places') - 0.1, 1e9, POP);
    M.vis($('#dp'), t, tD2 + 0.3, out, { dx: 60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
  }

  /* V: live places */
  const vOn = t >= tV1 - 0.1 && t < tG1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const r = tR.reduce((a, tt, i) => t >= tt - 0.05 ? i + 1 : a, 0);
    M.vis($('#vR'), t, tV1 + 0.4, 1e9, { dy: 10 }); M.vis($('#vV'), t, tV1 + 0.5, 1e9, { dy: 10 });
    if (r !== vLast) { vLast = r; M.setT($('#vR'), `r = ${r}`); M.setT($('#vVn'), String(r ? VAL[r - 1] : 0));
      $('#vP').innerHTML = r ? K([5, 4, 3, 2, 1].slice(0, r).map(v => xc(v)).join(' \\times ') + ` = ${pc(VAL[r - 1])}`) : ''; }
    for (let i = 0; i < 5; i++) { const el = $('#vs' + i); M.vis(el, t, tV1 + 0.4 + i * 0.06, 1e9, { dy: 10 });
      const f = M.io((t - tR[i] + 0.05) / 0.25); el.style.borderColor = mix('#CBD0DA', RC, f); el.style.borderStyle = f > 0.5 ? 'solid' : 'dashed'; el.style.color = f > 0.5 ? XC : 'transparent';
      M.vis($('#vsl' + i), t, tV1 + 0.5 + i * 0.06, 1e9, { dy: 0 }); }
    M.vis($('#vP'), t, tR[0], 1e9, { dy: 0 });
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    bars.forEach((b, i) => { const g = M.spring(t - tR[i], M.SOFT), h = BH(b.v) * g; attr(b.r, 'y', (BY0 - h).toFixed(1)); attr(b.r, 'height', Math.max(0, h).toFixed(1));
      M.vis(b.lv, t, tR[i] + 0.25, 1e9, { dy: 0 }); M.vis(b.lr, t, tV1 + 0.6 + i * 0.06, 1e9, { dy: 0 }); });
    M.vis(vSame, t, wt('V3', 'still'), 1e9, { dy: 0 });
    M.vis($('#th2'), t, tV4 + 0.05, OUT('G1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'last') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'only') });
  }

  /* G: factorial form */
  const gOn = t >= tG1 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('T1');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#g5'), t, tGst[1] - 0.1, 0.9);
    const tStop = wt('G3', 'stops'), tMiss = wt('G3', 'missing');
    for (let i = 0; i < 5; i++) { const el = $('#tl' + i); M.vis(el, t, tG1 + 0.6 + i * 0.12, 1e9, { ...POP, sc: 0.6 });
      const k = M.io((t - tStop) / 0.3), m = M.io((t - tMiss - (i - 2) * 0.1) / 0.3);
      if (i < 2) { el.style.background = mix(C.soft, C.ac2, k); el.style.borderColor = mix(C.soft, RC, k); el.style.color = mix(C.ink, RC, k); }
      else { el.style.background = mix(C.soft, C.redBg, m); el.style.borderColor = mix(C.soft, C.red, m); el.style.color = mix(C.ink, C.red, m); } }
    M.draw(brK, t, tStop, 0.5); M.vis(brKt, t, tStop + 0.3, 1e9, { dy: 0 });
    M.draw(brM, t, tMiss, 0.5); M.vis(brMt, t, tMiss + 0.3, 1e9, { dy: 0 });
    PUC.write($('#gFr'), t, wt('G4', 'divide') - 0.1, 1.0);
    avA(t, wt('G5', 'gives') + 0.2, out);
    M.vis($('#gp'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $(`#gs${i}x`); M.vis(el.querySelector('.n'), t, tGst[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGst[i], 0.8); M.vis(el.querySelector('.why'), t, tGst[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tGst.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#gHi'); M.vis(hb, t, tGst[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'When') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'counts') - 0.2, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    pod.forEach((p, i) => { M.vis(p.g, t, tPod[i] - 0.1, 1e9, { dy: 30 }); M.vis(p.cg, t, tPv[i] - 0.05, 1e9, { ...POP, sc: 0.4 }); });
    M.vis(wTot, t, wt('W7', 'thirty') - 0.3, 1e9, { dy: 0 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tRt = wt('X3', 'Here');
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'cannot') - 0.1, tRight: tRt });
    tSl.forEach((s, i) => { M.vis(s.g, t, wt('X2', 'eight') + i * 0.3, 1e9, { ...POP, sc: 0.5 }); const f = M.io((t - tRt - i * 0.15) / 0.3);
      attr(s.c, 'stroke', mix(C.red, C.ok, f)); s.a.style.opacity = (1 - f).toFixed(3); s.b.style.opacity = f.toFixed(3); });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
