// PUC Maths Ep 61: Middle term and applications of the binomial theorem (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 7): a blue (here 1), b gold (here 0.01), nCr violet, middle term coral (accent)
const AC = '#2F6FEB', ABG = '#E7EEFD', BC = '#B7791F', BBG = '#F6EAD3', VC = C.violet, VBG = '#EDE6FC', RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const a = s => `\\textcolor{${AC}}{${s}}`, b = s => `\\textcolor{${BC}}{${s}}`, v = s => `\\textcolor{${VC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`;
const nC = (n, r) => v(`{}^{${n}}C_{${r}}`);
const comb = (n, r) => { let x = 1; for (let i = 1; i <= r; i++) x = x * (n - r + i) / i; return Math.round(x); };
document.head.insertAdjacentHTML('beforeend', '<style>#gr .lbl,#sl .lbl,#sr .lbl{text-transform:none}</style>');

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tB1 = T0('B1'), tR1 = T0('R1'), tE1 = T0('E1'), tE5 = T0('E5'), tM1 = T0('M1'), tG1 = T0('G1'), tS1 = T0('S1'), tS3 = T0('S3'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE NUMBER', '1.01'], ['JUST ABOVE', '1'], ['THE TINY STEP', '0.01']];
$('#lists').innerHTML = LS.map(([n, val], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${val}</div></div>`).join('');
const tLs = [wt('H1', 'One'), wt('H1', 'tiny'), wt('H1', 'more')];

/* ---------- H ---------- */
$('#hQ').innerHTML = K(`${a('1')}.${b('01')}^{1000} \\;\\;?\\;\\; 10000`).replace('', '');
$('#hQ').innerHTML = K(`1.01^{1000} \\;\\;\\textcolor{${RC}}{?}\\;\\; 10000`);

/* ---------- B ---------- */
const BS = [[`1.01 = ${a('1')} + ${b('0.01')}`, 'a tiny bit more than one'], [`1.01^{1000} = (${a('1')} + ${b('0.01')})^{1000}`, 'now it is a binomial: two parts'], [`${nC(1000, 'r')}\\, ${a('1')}^{1000-r}\\, ${b('0.01')}^{r} > 0`, 'every term is positive']];
$('#bSt').innerHTML = BS.map(([f, w], i) => `<div class="st" id="bs${i}" style="top:${90 + i * 140}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#bF').innerHTML = K(`1 + 10 + 50 + 166 + \\dots`); $('#bF2').innerHTML = 'each new term adds a positive amount';
const tBs = [wt('B1', 'Write'), T0('B2') + 0.3, wt('B3', 'Every')];

/* ---------- R: live running total ---------- */
const TV = [1, 10, 50, 166, 414, 825, 1368, 1943, 2412, 2658, 2634], SV = TV.reduce((acc, x, i) => (acc.push((acc[i - 1] || 0) + [1, 10, 49.95, 166.17, 414.16, 824.99, 1368.2, 1942.8, 2411.5, 2658.0, 2634.1][i]), acc), []).map(Math.round);
const rc0 = $('#rC'), CX0 = 540, CW = 1000, CB = 520, CH = 400, YM = 14000, CY = val => CB - val / YM * CH;
mk(rc0, 'line', { x1: CX0 - 10, y1: CB, x2: CX0 + CW + 10, y2: CB, stroke: C.ink, 'stroke-width': 3 });
const lim = mk(rc0, 'line', { x1: CX0 - 10, y1: CY(10000), x2: CX0 + CW + 10, y2: CY(10000), stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '10 7' });
const limT = txt(rc0, CX0 + CW + 10, CY(10000) - 12, '10000', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const STP = CW / 11, BW = 64;
const cols = TV.map((_, i) => { const x = CX0 + i * STP + (STP - BW) / 2; const base = mk(rc0, 'rect', { x, y: CB, width: BW, height: 0, rx: 4, fill: C.ac2, stroke: RC, 'stroke-width': 1.5 }); const top = mk(rc0, 'rect', { x, y: CB, width: BW, height: 0, rx: 4, fill: BC }); const lab = txt(rc0, x + BW / 2, CB, String(SV[i]), { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink2, 'font-weight': 600 }); const tn = txt(rc0, x + BW / 2, CB + 28, String(i + 1), { 'text-anchor': 'middle', 'font-size': 16 }); return { base, top, lab, tn }; });
const axL = txt(rc0, CX0 + CW / 2, CB + 52, 'term number', { 'text-anchor': 'middle', 'font-size': 16 });
const tCol = i => i === 0 ? wt('R2', 'first') : i === 1 ? wt('R2', 'second') : i === 2 ? wt('R3', 'third') : i === 3 ? wt('R3', 'hundred') : wt('R3', 'growing') + (i - 4) / 6 * (wt('R4', 'passes') - wt('R3', 'growing'));

/* ---------- E: NCERT example ---------- */
$('#eq').innerHTML = `<span style="font:600 18px 'IBM Plex Mono';letter-spacing:.08em;color:var(--mute)">EXAMPLE · NCERT</span><br>Which is larger: ${K('(1.01)^{1000000}')} or 10000?`;
$('#eq .katex').style.fontSize = '1.2em';
const esol = PUC.solution($('#el'), [
  [K(`(1.01)^{1000000} = (${a('1')} + ${b('0.01')})^{1000000}`)],
  [K(`\\text{2nd term} = 1000000 \\times ${b('0.01')} = 10000`)],
  [K(`= 1 + 10000 + (\\text{positive terms}) > 10000`)]], { label: '', y0: 220, dy: 100 });
const es = $('#er');
const eSv = mk(es, 'svg', { width: 784, height: 580, style: 'position:absolute;left:0;top:0' });
const EY0 = 170, EY1 = 330;
txt(eSv, 36, EY0 - 24, '10000', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const eBar0 = mk(eSv, 'rect', { x: 36, y: EY0, width: 480, height: 64, rx: 10, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 });
const eL1 = txt(eSv, 36, EY1 - 24, '(1.01) to the 1000000', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const eOne = mk(eSv, 'rect', { x: 36, y: EY1, width: 14, height: 64, rx: 4, fill: AC });
const eTen = mk(eSv, 'rect', { x: 52, y: EY1, width: 480, height: 64, rx: 10, fill: BBG, stroke: BC, 'stroke-width': 2.5 });
const eTenT = txt(eSv, 292, EY1 + 40, '1000000 × 0.01 = 10000', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 });
const eMore = mk(eSv, 'rect', { x: 536, y: EY1, width: 200, height: 64, rx: 10, fill: '#fff', stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const eMoreT = txt(eSv, 636, EY1 + 40, 'more ...', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const th1 = PUC.think($('#th1'), { q: `Is ${K('(1.1)^{10000}')} bigger than 1000?`, opts: ['Yes', 'No'], right: 0, why: `Yes: the 2nd term is 10000 × 0.1 = 1000. Add the 1, and it is already bigger.` });

/* ---------- M: seats ---------- */
const ms = $('#mS');
const seatRow = (n, y, mids) => { const w = 72, g = 14, x0 = (784 - (n * w + (n - 1) * g)) / 2; return Array.from({ length: n }, (_, i) => { const gg = mk(mk(ms, 'g', { transform: `translate(${x0 + i * (w + g)},${y})` }), 'g', {}); const r = mk(gg, 'rect', { x: 0, y: 0, width: w, height: 64, rx: 12, fill: C.soft, stroke: C.ink2, 'stroke-width': 2 }); mk(gg, 'rect', { x: 6, y: 64, width: w - 12, height: 12, rx: 4, fill: C.line }); const tt = txt(gg, w / 2, 42, String(i + 1), { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink2, 'font-weight': 600 }); return { gg, r, tt, mid: mids.includes(i + 1) }; }); };
const row7 = seatRow(7, 120, [4]), row8 = seatRow(8, 320, [4, 5]);
const m7L = txt(ms, 392, 238, '7 seats: one middle seat', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const m8L = txt(ms, 392, 438, '8 seats: two middle seats', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
$('#mF').innerHTML = K(`(${a('a')} + ${b('b')})^{n} \\;\\to\\; n + 1 \\text{ terms}`);

/* ---------- G: rule + hill ---------- */
const GS = [[`n \\text{ even}:\\ ${rc('T_{\\frac{n}{2}+1}')}`, 'n + 1 is odd: one middle term'], [`n \\text{ odd}:\\ ${rc('T_{\\frac{n+1}{2}}')},\\ ${rc('T_{\\frac{n+3}{2}}')}`, 'n + 1 is even: two middle terms'], [`\\text{middle} = \\text{biggest } ${nC('n', 'r')}`, 'the top of the hill']];
$('#gSt').innerHTML = GS.map(([f, w], i) => `<div class="st" id="gs${i}" style="top:${90 + i * 140}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const gs = $('#gS'), GB = 470, GX0 = 70, GW = 644;
mk(gs, 'line', { x1: 50, y1: GB, x2: 734, y2: GB, stroke: C.ink, 'stroke-width': 3 });
const gBars = [], gLab = [], gT = [];
for (let r = 0; r <= 7; r++) { gBars.push(mk(gs, 'rect', { x: 0, y: GB, width: 0, height: 0, rx: 5, fill: VC })); gLab.push(txt(gs, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 18, fill: VC, 'font-weight': 600 })); gT.push(txt(gs, 0, GB + 30, '', { 'text-anchor': 'middle', 'font-size': 16 })); }
const gCap = txt(gs, 392, 116, '', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const tGs = [wt('G2', 'If'), wt('G3', 'If'), wt('G4', 'And')];

/* ---------- S ---------- */
const boxes = (host, n, mids, w, g, y = 96) => { host.innerHTML = Array.from({ length: n }, (_, i) => `<div class="tb" data-m="${mids.includes(i + 1) ? 1 : 0}" style="left:${36 + i * (w + g)}px;top:${y}px;width:${w}px">T${i + 1}</div>`).join(''); return [...host.querySelectorAll('.tb')]; };
const sL = boxes($('#slB'), 7, [4], 92, 8), sR = boxes($('#srB'), 8, [4, 5], 80, 8);
$('#slF').innerHTML = K(`T_{\\frac{6}{2}+1} = ${rc('T_4')}`); $('#srF').innerHTML = K(`T_{\\frac{7+1}{2}} = ${rc('T_4')},\\ \\ T_{\\frac{7+3}{2}} = ${rc('T_5')}`);
const th2 = PUC.think($('#th2'), { q: `How many middle terms does ${K('(a + b)^{9}')} have?`, opts: ['One', 'Two'], right: 1, why: 'Two: n = 9 is odd, so there are 10 terms. T5 and T6 are the middle terms.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`n\\ \\text{even}:\\ ${rc('T_{\\frac{n}{2}+1}')} \\qquad n\\ \\text{odd}:\\ ${rc('T_{\\frac{n+1}{2}}')},\\ ${rc('T_{\\frac{n+3}{2}}')}`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find the middle term of ${K(`(${a('x')} + ${b('2')})^{8}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`n = 8 \\text{ even} \\Rightarrow ${rc('T_{5}')},\\ r = 4`)],
  [K(`${rc('T_5')} = ${nC(8, 4)}\\, ${a('x^{4}')}\\, ${b('2^{4}')}`)],
  [K(`= 70 \\times 16\\, ${a('x^{4}')} = 1120\\, ${a('x^{4}')}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const wB = boxes($('#wB'), 9, [5], 70, 8, 90);
const PC = [[nC(8, 4) + ' = 70', 'WAYS', VBG, 36, 220], [a('x^{4}'), 'X PART', ABG, 300, 150], [b('2^{4}') + ' = 16', 'NUMBER PART', BBG, 494, 254]];
$('#wPc').innerHTML = PC.map(([f, k, bg, x, w], i) => `<div class="pc" id="pc${i}" style="left:${x}px;top:230px;width:${w}px;background:${bg}"><div class="k">${k}</div><div class="v">${K(f)}</div></div>`).join('') + `<div class="ml" id="ml0" style="left:268px;top:270px">×</div><div class="ml" id="ml1" style="left:462px;top:270px">×</div>`;
$('#wRes').innerHTML = K(`${rc('T_5')} = 1120\\, ${a('x^{4}')}`);
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step')], tPc = [wt('W5', 'Eight'), wt('W4', 'x'), wt('W5', 'sixteen')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(x+1)^7:\\ \\text{middle term} = T_4 = 35x^4 \\text{ only}`), right: K(`T_4 = 35x^4 \\ \\text{and}\\ \\ T_5 = 35x^3`) });
const ts = $('#tS');
const tBx = Array.from({ length: 8 }, (_, i) => { const g = mk(mk(ts, 'g', { transform: `translate(${40 + i * 62},110)` }), 'g', {}); const r = mk(g, 'rect', { x: 0, y: 0, width: 52, height: 56, rx: 10, fill: C.soft, stroke: C.line, 'stroke-width': 2 }); txt(g, 26, 35, `T${i + 1}`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 }); return { g, r }; });
const tL = txt(ts, 288, 92, '8 TERMS', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Compare the middle terms of two expansions, or decide which number is larger' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find the middle term of<br>${K('\\left(2x - \\dfrac{1}{x}\\right)^{8}')}`,
  opts: ['1120', '-1120', '70', '560'], right: 0, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`n = 8:\\ T_5,\\ r = 4`)], [K(`{}^{8}C_4 (2x)^4 \\left(-\\tfrac{1}{x}\\right)^4`)], [K(`x^4 \\cdot x^{-4} = 1`)], [K(`70 \\times 16 \\times (+1) = 1120`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'n'), wt('A3', 'term'), wt('A3', 'cancel'), wt('A4', 'Seventy')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · middle term and big numbers', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: [`${K('(1.01)^{1000000} = 1 + 10000 + \\dots')}: two terms were enough`,
    `${K('(1 + x)^{n}')} with ${K('x > 0')}: every term adds, so the total only grows`,
    `${K('(a+b)^n')} has <b>n + 1</b> terms`,
    `Even n: one middle term ${K(rc('T_{\\frac{n}{2}+1}'))}`,
    `Odd n: two middle terms ${K(rc('T_{\\frac{n+1}{2}}'))} and ${K(rc('T_{\\frac{n+3}{2}}'))}`] });
const YQ = ['Why does every extra term make (1 + x)ⁿ bigger, when x > 0?', 'How many middle terms does (a + b)¹² have?', 'Which terms are the middle terms of (a + b)¹¹?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 62', topic: 'A number pattern with a rule: what comes next? Sequences and Series', y: 764 });
document.querySelector('#sF .next .nt').style.fontSize = '30px';

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('R4', 'passes') - 0.3, 1.05, 960, 560], [T1('R4') + 0.2, 1, 960, 540]]);
const fmt = n => String(n);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#hQ'), t, tMorph + 0.3, 1.0);
    M.vis($('#hg0'), t, wt('H3', 'no') - 0.1, 1e9, POP); M.vis($('#hg1'), t, wt('H4', 'calculator') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'smarter') - 0.1, 1e9, POP);
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tR1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('R1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    BS.forEach((_, i) => { const el = $('#bs' + i); M.vis(el.querySelector('.n'), t, tBs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tBs[i], 0.9); M.vis(el.querySelector('.why'), t, tBs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#br'), t, wt('B3', 'Every') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#bF'), t, wt('B3', 'positive'), 1.0); M.vis($('#bF2'), t, wt('B3', 'positive') + 0.8, 1e9, { dy: 10 });
    M.vis($('#bP'), t, wt('B3', 'grow') - 0.2, 1e9, POP);
  }

  /* R: live total */
  const rOn = t >= tR1 - 0.1 && t < tE1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('E1');
    M.vis($('#rw'), t, tR1 + 0.1, out, { dy: 36, ...o });
    M.vis(lim, t, tR1 + 0.4, 1e9, { dy: 0 }); M.vis(limT, t, tR1 + 0.5, 1e9, { dy: 0 }); M.vis(axL, t, tR1 + 0.5, 1e9, { dy: 0 });
    let last = -1;
    cols.forEach((c, i) => { const u = M.io((t - tCol(i)) / 0.45), prev = i ? SV[i - 1] : 0;
      const hb = (CB - CY(prev)) * M.clamp((t - tCol(i) + 0.3) / 0.2), ht = (CB - CY(TV[i])) * u;
      attr(c.base, 'y', (CB - hb).toFixed(1)); attr(c.base, 'height', hb.toFixed(1)); attr(c.top, 'y', (CB - hb - ht).toFixed(1)); attr(c.top, 'height', ht.toFixed(1));
      attr(c.lab, 'y', (CB - hb - ht - 10).toFixed(1)); c.lab.style.opacity = u; c.tn.style.opacity = M.clamp((t - tCol(i) + 0.3) / 0.2);
      if (t >= tCol(i)) last = i; });
    const pass = M.io((t - tCol(10) - 0.3) / 0.3); attr(lim, 'stroke', mix(C.ink, C.ok, pass)); attr(limT, 'fill', mix(C.ink, C.ok, pass));
    [0, 1, 2].forEach(i => M.vis($('#rd' + i), t, wt('R2', 'first') - 0.2 + i * 0.1, 1e9, { dy: 12 }));
    if (last >= 0) { M.setT($('#rN'), String(last + 1)); M.setT($('#rT'), fmt(TV[last])); M.setT($('#rS'), fmt(SV[last])); }
    $('#rd2').style.background = mix(C.soft, C.okBg, pass);
    M.vis($('#rP'), t, wt('R5', 'twenty') - 0.1, 1e9, POP);
  }

  /* E: NCERT example + think */
  const eOn = t >= tE1 - 0.1 && t < tM1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('E5');
    M.vis($('#el'), t, tE1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#eq'), t, tE1 + 0.3, 1e9, { dy: 14 });
    esol(t, tE1, [wt('E2', 'Step'), wt('E3', 'Step'), wt('E4', 'Step')]);
    M.vis($('#er'), t, wt('E3', 'Step') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(eBar0, t, wt('E3', 'Step') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(eL1, t, wt('E3', 'Step') + 0.4, 1e9, { dy: 0 });
    M.vis(eOne, t, wt('E3', 'second'), 1e9, { dy: 0 }); M.vis(eTen, t, wt('E3', 'times'), 1e9, { dx: -20, dy: 0 }); M.vis(eTenT, t, wt('E3', 'exactly'), 1e9, { dy: 0 });
    M.vis(eMore, t, wt('E4', 'more') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis(eMoreT, t, wt('E4', 'more'), 1e9, { dy: 0 });
    M.vis($('#eP'), t, wt('E4', 'bigger') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tE5 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tE5, tOpts: wt('E5', 'bigger') - 0.1, tCount: T1('E5') + 0.05, dur: 3, tAns: T0('E6') - 0.02, tWhy: wt('E6', 'second') });
  }

  /* M: seats */
  const mOn = t >= tM1 - 0.1 && t < tG1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('G1');
    M.vis($('#ml'), t, tM1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const lit = (row, t0, t1) => row.forEach((s, i) => { M.vis(s.gg, t, t0 + i * 0.06, 1e9, { dy: 10 }); const on = s.mid ? M.io((t - t1) / 0.3) : 0; attr(s.r, 'fill', mix(C.soft, C.ac2, on)); attr(s.r, 'stroke', mix(C.ink2, RC, on)); attr(s.tt, 'fill', mix(C.ink2, RC, on)); });
    lit(row7, wt('M2', 'Seven') - 0.2, wt('M2', 'fourth')); lit(row8, wt('M2', 'Eight') - 0.2, wt('M2', 'fourth', 1));
    M.vis(m7L, t, wt('M2', 'one'), 1e9, { dy: 0 }); M.vis(m8L, t, wt('M2', 'two'), 1e9, { dy: 0 });
    M.vis($('#mr'), t, T0('M3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#mF'), t, wt('M3', 'plus') - 0.1, 1.0); M.vis($('#mP'), t, wt('M3', 'terms') - 0.1, 1e9, POP);
  }

  /* G: rule + hill */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('S1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i] + 0.1, 0.9); M.vis(el.querySelector('.why'), t, tGs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(90, tGs.slice(1).map((tt, i) => [tt - 0.1, 90 + (i + 1) * 140]), M.SOFT)(t);
    const hb = $('#gHi'); M.vis(hb, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#gr'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#gr .ghost'), t, tG1 + 0.8, 1e9, POP);
    const n = t < tGs[1] ? 6 : 7, show = M.clamp((t - tG1 - 0.6) / 0.4), mids = n === 6 ? [3] : [3, 4];
    const w = 56, g = (GW - w * (n + 1)) / (n + 2), mx = comb(n, n >> 1);
    M.setT(gCap, n === 6 ? 'n = 6: 7 terms, one top' : 'n = 7: 8 terms, two tops'); gCap.style.opacity = show;
    for (let r = 0; r <= 7; r++) { const on = r <= n, x = GX0 + g + r * (w + g), h = on ? 300 * comb(n, r) / mx * show : 0, m = mids.includes(r);
      attr(gBars[r], 'x', x.toFixed(1)); attr(gBars[r], 'width', on ? w : 0); attr(gBars[r], 'y', (GB - h).toFixed(1)); attr(gBars[r], 'height', h.toFixed(1)); attr(gBars[r], 'fill', m ? RC : VC);
      M.setT(gLab[r], on ? String(comb(n, r)) : ''); attr(gLab[r], 'x', (x + w / 2).toFixed(1)); attr(gLab[r], 'y', (GB - h - 10).toFixed(1)); attr(gLab[r], 'fill', m ? RC : VC); gLab[r].style.opacity = show;
      M.setT(gT[r], on ? `T${r + 1}` : ''); attr(gT[r], 'x', (x + w / 2).toFixed(1)); gT[r].style.opacity = show; }
  }

  /* S + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const lt = (arr, t0, t1) => arr.forEach((el, i) => { M.vis(el, t, t0 + i * 0.06, 1e9, { dy: 10 }); const on = el.dataset.m === '1' ? M.io((t - t1) / 0.3) : 0; el.style.background = mix(C.soft, C.ac2, on); el.style.borderColor = mix(C.soft, RC, on); el.style.color = mix(C.ink2, RC, on); });
    lt(sL, wt('S1', 'seven') - 0.2, wt('S1', 'fourth')); PUC.write($('#slF'), t, wt('S1', 'fourth') + 0.2, 0.8); M.vis($('#slP'), t, wt('S1', 'only') - 0.1, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    lt(sR, wt('S2', 'eight') - 0.2, wt('S2', 'fourth')); PUC.write($('#srF'), t, wt('S2', 'fifth') - 0.2, 0.9); M.vis($('#srP'), t, wt('S2', 'both') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tS3, tOpts: wt('S3', 'nine') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Nine') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Even') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Odd'), 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    wB.forEach((el, i) => { M.vis(el, t, T0('W2') + 0.5 + i * 0.05, 1e9, { dy: 10 }); const on = el.dataset.m === '1' ? M.io((t - wt('W3', 'five') + 0.1) / 0.3) : 0; el.style.background = mix(C.soft, C.ac2, on); el.style.borderColor = mix(C.soft, RC, on); el.style.color = mix(C.ink2, RC, on); });
    PC.forEach((_, i) => M.vis($('#pc' + i), t, tPc[i] - 0.1, 1e9, POP));
    M.vis($('#ml0'), t, tPc[0], 1e9, { dy: 0 }); M.vis($('#ml1'), t, tPc[2], 1e9, { dy: 0 });
    PUC.write($('#wRes'), t, wt('W5', 'So') - 0.1, 0.9);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'seven') - 0.1, tRight: wt('X3', 'thirty') - 0.1 });
    M.vis(tL, t, wt('X3', 'eight') - 0.2, 1e9, { dy: 0 });
    tBx.forEach((bx, i) => { M.vis(bx.g, t, wt('X2', 'Many') + i * 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const w4 = i === 3 ? M.io((t - wt('X2', 'fourth')) / 0.3) : 0, ok = (i === 3 || i === 4) ? M.io((t - wt('X3', 'fourth') + 0.1) / 0.3) : 0;
      attr(bx.r, 'fill', ok > 0 ? mix(C.redBg, C.okBg, ok) : mix(C.soft, C.redBg, w4)); attr(bx.r, 'stroke', ok > 0 ? mix(C.red, C.ok, ok) : mix(C.line, C.red, w4)); });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'comparing', 1) });
    M.vis($('#wa .ghost'), t, wt('J1', 'middle') - 0.1, 1e9, POP);
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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

SW.forEach(([t0]) => M.sfx(t0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
