// PUC Maths Ep 55: Permutations with repeated objects (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: n (all objects) blue, p (how many are the same) coral accent, count teal; painted P's orange (P1) and violet (P2)
const NC = '#2F6FEB', PC = '#0E8F8F', OC = C.orange, VC = C.violet, RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const nc = s => `\\textcolor{${NC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const place = (el, x, y) => { el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; };
// tile html: k = 'A' | 'P1' | 'P2' | letter
const tile = (id, k, x, y, sm) => `<div class="lt${sm ? ' sm' : ''}" id="${id}" style="left:${x}px;top:${y}px">${k[0]}${k.length > 1 ? `<sub>${k[1]}</sub>` : ''}</div>`;
// paint: u = 0 ink, 1 painted
const paint = (el, k, u) => { const col = k === 'P1' ? OC : k === 'P2' ? VC : C.ink; const c = mix(C.ink, col, u); el.style.borderColor = c; el.style.color = c; const s = el.querySelector('sub'); if (s) s.style.opacity = u.toFixed(3); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tK1 = T0('K1'), tK3 = T0('K3'), tD1 = T0('D1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE WORD', 'APPLE'], ['SHUFFLE', 'PLAPE'], ['SHUFFLE', 'EPLAP']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'APPLE') - 0.1, wt('H1', 'PLAPE') - 0.1, wt('H1', 'EPLAP') - 0.1];

/* ---------- H ---------- */
const HW = ['A', 'P', 'P', 'L', 'E'];
$('#hT').innerHTML = HW.map((k, i) => tile('ht' + i, k, 36 + i * 104, 300)).join('');
const tHs = wt('H5', 'Swap') + 0.2;

/* ---------- P: the paint test ---------- */
const PK = ['A', 'P1', 'P2'];
$('#pT').innerHTML = PK.map((k, i) => tile('pt' + i, k, 36 + i * 104, 100)).join('');
$('#pF1').innerHTML = K(`3! = 3 \\times 2 \\times 1 = 6`);
$('#pF2').innerHTML = K(`6 \\div 2 = ${pc('3')} \\text{ words}`);
const PR = [[['A', 'P1', 'P2'], ['A', 'P2', 'P1'], 'APP'], [['P1', 'A', 'P2'], ['P2', 'A', 'P1'], 'PAP'], [['P1', 'P2', 'A'], ['P2', 'P1', 'A'], 'PPA']];
$('#pR').innerHTML = PR.map(([a, b, w], i) => `<div class="pr" id="pr${i}" style="top:${84 + i * 152}px">` +
  a.map((k, j) => tile(`pa${i}${j}`, k, 24 + j * 72, 28, 1)).join('') + `<div id="pb${i}" style="position:absolute;left:0;top:0">` + b.map((k, j) => tile(`pb${i}${j}`, k, 300 + j * 72, 28, 1)).join('') + `</div><div class="wl" id="pw${i}">WORD ${i + 1}: ${w}</div></div>`).join('');
const tPaint = [wt('P2', 'orange'), wt('P2', 'purple')], tWash = wt('P5', 'wash');
const tMelt = i => wt('P6', 'Each') + i * 0.45;
const paintU = (k, t) => (k === 'P1' ? M.io((t - tPaint[0]) / 0.3) : k === 'P2' ? M.io((t - tPaint[1]) / 0.3) : 0) * (1 - M.io((t - tWash) / 0.5));

/* ---------- K: side by side ---------- */
const kw = (id, a, b) => a.map((k, j) => tile(`${id}a${j}`, k, 250 + j * 100, 110)).join('') + b.map((k, j) => tile(`${id}b${j}`, k, 250 + j * 100, 330)).join('');
$('#kwT').innerHTML = kw('kw', ['A', 'P1', 'P2'], ['A', 'P2', 'P1']); $('#knT').innerHTML = kw('kn', ['A', 'P', 'P'], ['A', 'P', 'P']);
['a', 'b'].forEach(r => [0, 1, 2].forEach(j => { const k = (r === 'a' ? ['A', 'P1', 'P2'] : ['A', 'P2', 'P1'])[j]; paint($(`#kw${r}${j}`), k, 1); }));
const th1 = PUC.think($('#th1'), { q: 'In APPLE, swap the two P\'s. A new word, or the same word?', opts: ['A new word', 'The same word'], right: 1, why: 'Nobody can tell which P went where: the same word, so count it once.' });

/* ---------- D: derivation ---------- */
const DK = ['A', 'P1', 'P2', 'L', 'E'];
$('#dT').innerHTML = DK.map((k, i) => tile('dt' + i, k, 36 + i * 104, 100)).join('');
$('#dSw').innerHTML = `swap the two P's: ${K('2! = 2')} ways, the same word`;
$('#dF1').innerHTML = K(`5! = 120`);
$('#dF2').innerHTML = K(`120 \\div 2! = 120 \\div 2 = ${pc('60')}`);
$('#dN').innerHTML = `${K(nc('n'))}&nbsp;= all the objects`; $('#dP').innerHTML = `${K(rc('p'))}&nbsp;= how many are the same`;
const DS = [[`\\text{all different: } 5! = 120`, 'pretend the two P\'s are different'], [`\\text{P's swap: } 2! = 2`, 'each real word was counted twice'], [`120 \\div 2! = ${pc('60')}`, 'divide out the double count'],
  [`${nc('n')}! \\div ${rc('p')}!`, `${rc('p')} of the ${nc('n')} objects are the same`.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g, '$1')], [`${nc('n')}! \\div (${rc('p_1')}!\\; ${rc('p_2')}! \\cdots)`, 'one factorial for each repeated group']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:96px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Pretend'), wt('D3', 'swap'), wt('D4', 'divide'), wt('D6', 'general'), wt('D7', 'groups')];
const tDsw = wt('D3', 'swap') + 0.1;

/* ---------- V: live shrink ---------- */
const VAL = [120, 60, 20, 5, 1], VW = ['ABCDE', 'AACDE', 'AAADE', 'AAAAE', 'AAAAA'];
$('#vT').innerHTML = [0, 1, 2, 3, 4].map(i => tile('vt' + i, 'ABCDE'[i], 36 + i * 112, 150)).join('');
const tR = [wt('V1', 'different'), wt('V2', 'two'), wt('V2', 'three'), wt('V3', 'Four'), wt('V3', 'All')];
const vb = $('#vB'), BX = i => 100 + i * 130, BY0 = 470, BH = v => Math.max(3, v / 120 * 300);
mk(vb, 'line', { x1: 70, y1: BY0, x2: 730, y2: BY0, stroke: C.ink, 'stroke-width': 3 });
const bars = VAL.map((v, i) => { const r = mk(vb, 'rect', { x: BX(i), y: BY0, width: 84, height: 0, rx: 6, fill: mix(PC, '#FFFFFF', 0.15 * (4 - i) / 4) });
  const lv = txt(vb, BX(i) + 42, BY0 - BH(v) - 16, v, { 'text-anchor': 'middle', 'font-size': 26, fill: PC, 'font-weight': 600 });
  const lw = txt(vb, BX(i) + 42, BY0 + 38, VW[i], { 'text-anchor': 'middle', 'font-size': 17, fill: C.ink2, 'font-weight': 600 }); return { r, lv, lw, v }; });
let vLast = -1;
const th2 = PUC.think($('#th2'), { q: 'A A A A A: how many different words?', opts: ['1', '120'], right: 0, why: 'Every swap gives the same word: 5! ÷ 5! = 1.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\dfrac{${nc('n')}!}{${rc('p_1')}!\\; ${rc('p_2')}! \\cdots ${rc('p_k')}!}`);

/* ---------- W ---------- */
$('#wq').innerHTML = `How many different words can be made from all the letters of BANANA?`;
const wsol = PUC.solution($('#wl'), [
  [K(`6 \\text{ letters: A} \\times 3,\\ \\text{N} \\times 2,\\ \\text{B} \\times 1`)],
  [K(`\\text{all different: } 6! = 720`)],
  [K(`\\div\\, 3! \\text{ for the A's},\\ \\div\\, 2! \\text{ for the N's}`)],
  [K(`720 \\div (6 \\times 2) = 720 \\div 12`)],
  [K(`= ${pc('60')} \\text{ words}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const BW = ['B', 'A', 'N', 'A', 'N', 'A'], GX = { 1: 36, 3: 136, 5: 236, 2: 372, 4: 472, 0: 616 };
$('#wT').innerHTML = BW.map((k, i) => tile('wt' + i, k, 36 + i * 100, 96)).join('') +
  `<div class="gp" id="gp0" style="left:36px;top:350px;color:${VC}">3 A's · divide by 3!</div><div class="gp" id="gp1" style="left:372px;top:350px;color:${OC}">2 N's · 2!</div><div class="gp" id="gp2" style="left:616px;top:350px;color:var(--mute)">1 B</div>`;
$('#wTot').innerHTML = K(`720 \\div (3! \\times 2!) = ${pc('60')}`);
const tGrp = i => BW[i] === 'A' ? wt('W3', 'Three') : BW[i] === 'N' ? wt('W3', 'two') : wt('W3', 'one', 1);
const tW = [wt('W3', 'Count'), wt('W4', 'six'), wt('W5', 'Divide'), wt('W6', 'Seven'), wt('W7', 'sixty')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`6! \\div (3 + 2)! = 6`), right: K(`6! \\div (3! \\times 2!) = 60`) + '&nbsp; each group swaps on its own' });
const ts = $('#tS');
const tg = [['A A A', '3!', VC, 40], ['N N', '2!', OC, 330]].map(([s, f, col, x]) => { mk(ts, 'rect', { x, y: 84, width: 190, height: 84, rx: 12, fill: '#fff', stroke: col, 'stroke-width': 3 });
  txt(ts, x + 95, 138, s, { 'text-anchor': 'middle', 'font-size': 34, fill: col, 'font-weight': 600, 'font-family': 'Poppins' }); return txt(ts, x + 95, 214, f, { 'text-anchor': 'middle', 'font-size': 30, fill: col, 'font-weight': 600 }); });
const tOpA = txt(ts, 280, 140, '+', { 'text-anchor': 'middle', 'font-size': 52, fill: C.red, 'font-weight': 600 }), tOpB = txt(ts, 280, 140, '×', { 'text-anchor': 'middle', 'font-size': 52, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Arrange the letters of a word with repeated letters: how many ways?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Arrangements of the letters of SUCCESS:<br>in how many are all three S's together?`, opts: ['60', '120', '360', '420'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{glue SSS into one block}`)], [K(`[\\text{SSS}],\\ \\text{U, C, C, E}`)], [K(`5 \\text{ things, two C's the same}`)], [K(`5! \\div 2! = 120 \\div 2`)], [K(`= ${pc('60')}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Glue'), wt('A3', 'block'), wt('A3', 'two'), wt('A4', 'five'), wt('A4', 'sixty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · repeated objects', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['Swapping two same letters makes <b>no new word</b>',
    K(`${rc('p')} \\text{ the same: } ${nc('n')}! \\div ${rc('p')}!`),
    K(`\\text{groups: } ${nc('n')}! \\div (${rc('p_1')}!\\; ${rc('p_2')}! \\cdots ${rc('p_k')}!)`),
    K(`\\text{APPLE}: 5! \\div 2! = ${pc('60')}`),
    'BANANA: 6! ÷ (3! × 2!) = 60, multiply the repeats'] });
const YQ = ['Why does APPLE give 60 words, not 120?', 'How many words from the letters of TOOT?', 'Why do we divide by 3! for three A\'s?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 56', topic: 'Pick 2 friends for a team: does order still matter?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tMelt(0) - 0.4, 1.05, 960, 560], [T1('P7') + 0.2, 1, 960, 540]]);

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
    M.vis($('#gb0'), t, wt('H2', 'different') - 0.1, 1e9, { dy: 16 }); M.vis($('#gb1'), t, wt('H2', 'APPLE') - 0.1, 1e9, { dy: 16 });
    const u = M.io((t - tHs) / 0.7), hi = M.io((t - wt('H5', 'two')) / 0.3);
    HW.forEach((_, i) => { const el = $('#ht' + i); M.vis(el, t, wt('H4', 'Same') + i * 0.08, 1e9, { ...POP, sc: 0.6 });
      if (i === 1 || i === 2) { const a = i === 1 ? 140 : 244, b = i === 1 ? 244 : 140; place(el, a + (b - a) * u, 300 - (i === 1 ? 70 : -50) * Math.sin(Math.PI * u)); el.style.borderColor = mix(C.ink, RC, hi); el.style.color = mix(C.ink, RC, hi); } });
    M.vis($('#hP'), t, wt('H5', 'same') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'half') - 0.2, 1e9, POP);
  }

  /* P: paint test */
  const pOn = t >= tP1 - 0.1 && t < tK1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('K1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PK.forEach((k, i) => { const el = $('#pt' + i); M.vis(el, t, wt('P2', 'letters') + i * 0.15, 1e9, { ...POP, sc: 0.6 }); paint(el, k, paintU(k, t)); });
    PUC.write($('#pF1'), t, wt('P3', 'factorial') - 0.1, 0.8);
    PUC.write($('#pF2'), t, wt('P7', 'becomes') - 0.1, 0.7);
    const melted = PR.reduce((a, _, i) => a + (t >= tMelt(i) + 0.5 ? 1 : 0), 0);
    M.setT($('#pCnt'), `different words: ${6 - melted}`); M.vis($('#pCnt'), t, wt('P4', 'all') - 0.1, 1e9, POP);
    $('#pCnt').style.background = melted === 3 ? PC : C.ink;
    M.vis($('#pr'), t, T0('P4') - 0.2, out, { dx: 60, dy: 0, ...o });
    PR.forEach(([a, b], i) => {
      M.vis($('#pr' + i), t, T0('P4') + i * 0.12, 1e9, { dy: 14 });
      a.forEach((k, j) => { const el = $(`#pa${i}${j}`); M.vis(el, t, T0('P4') + 0.2 + i * 0.3, 1e9, { ...POP, sc: 0.6 }); paint(el, k, paintU(k, t)); });
      const m = M.io((t - tMelt(i)) / 0.55), g = $('#pb' + i);
      b.forEach((k, j) => { const el = $(`#pb${i}${j}`); M.vis(el, t, T0('P4') + 0.35 + i * 0.3, 1e9, { ...POP, sc: 0.6 }); paint(el, k, paintU(k, t)); });
      g.style.transform = `translateX(${(-276 * m).toFixed(1)}px)`; g.style.opacity = (1 - M.io((t - tMelt(i) - 0.35) / 0.25)).toFixed(3);
      M.vis($('#pw' + i), t, wt('P7', [3, 6, 10][i]) - 0.05, 1e9, { dx: -10, dy: 0 });
    });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tD1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kw'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    ['a', 'b'].forEach((r, ri) => [0, 1, 2].forEach(j => { M.vis($(`#kw${r}${j}`), t, wt('K1', 'paint') + ri * 0.4 + j * 0.08, 1e9, { ...POP, sc: 0.6 }); M.vis($(`#kn${r}${j}`), t, wt('K2', 'paint') + ri * 0.4 + j * 0.08, 1e9, { ...POP, sc: 0.6 }); }));
    M.vis($('#kwS'), t, wt('K1', 'different') - 0.1, 1e9, POP); M.vis($('#kwP'), t, wt('K1', 'Swapping') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#knS'), t, wt('K2', 'same') - 0.1, 1e9, POP); M.vis($('#knP'), t, wt('K2', 'nothing') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'new') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Nobody') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tPr = wt('D2', 'different'), u = M.io((t - tDsw) / 0.7);
    DK.forEach((k, i) => { const el = $('#dt' + i); M.vis(el, t, tD1 + 0.3 + i * 0.08, 1e9, { ...POP, sc: 0.6 }); paint(el, k, M.io((t - tPr) / 0.3));
      if (i === 1 || i === 2) { const a = i === 1 ? 140 : 244, b = i === 1 ? 244 : 140; place(el, a + (b - a) * u, 100 - (i === 1 ? 50 : -40) * Math.sin(Math.PI * u)); } });
    M.vis($('#dSw'), t, tDsw + 0.4, 1e9, { dx: -12, dy: 0 });
    PUC.write($('#dF1'), t, wt('D2', 'factorial') - 0.1, 0.6); PUC.write($('#dF2'), t, T0('D5') - 0.05, 0.8);
    M.vis($('#dN'), t, wt('D6', 'objects') - 0.1, 1e9, POP); M.vis($('#dP'), t, wt('D6', 'same') - 0.1, 1e9, POP);
    M.vis($('#dp'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
  }

  /* V: live shrink */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const k = tR.reduce((a, tt, i) => t >= tt - 0.05 ? i + 1 : a, 1);
    if (k !== vLast) { vLast = k; M.setT($('#vK'), k === 1 ? 'all 5 letters different' : k === 5 ? 'all 5 letters the same' : `${k} letters the same`);
      $('#vP').innerHTML = K(`5! \\div ${rc(k + '!')} = ${pc(VAL[k - 1])}`);
      for (let i = 0; i < 5; i++) { const el = $('#vt' + i); M.setT(el, i < k ? 'A' : 'ABCDE'[i]); } }
    M.vis($('#vK'), t, tV1 + 0.4, 1e9, { dy: 8 }); M.vis($('#vP'), t, tR[0], 1e9, { dy: 10 });
    for (let i = 0; i < 5; i++) { const el = $('#vt' + i); M.vis(el, t, tV1 + 0.4 + i * 0.08, 1e9, { ...POP, sc: 0.6 }); const f = i > 0 ? M.io((t - tR[i]) / 0.25) : 0; el.style.borderColor = mix(C.ink, RC, f); el.style.color = mix(C.ink, RC, f); }
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    bars.forEach((b, i) => { const g = M.spring(t - tR[i], M.SOFT), h = BH(b.v) * Math.max(0, g); attr(b.r, 'y', (BY0 - h).toFixed(1)); attr(b.r, 'height', h.toFixed(1));
      M.vis(b.lv, t, tR[i] + 0.25, 1e9, { dy: 0 }); M.vis(b.lw, t, tR[i] - 0.1, 1e9, { dy: 0 }); });
    M.vis($('#th2'), t, tV4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'How') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Every') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'When') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'divide') - 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    BW.forEach((k, i) => { const el = $('#wt' + i); M.vis(el, t, wt('W2', 'BANANA') + i * 0.1, 1e9, { ...POP, sc: 0.6 });
      const u = M.io((t - tGrp(i)) / 0.6); place(el, 36 + i * 100 + (GX[i] - 36 - i * 100) * u, 96 + (240 - 96) * u);
      const col = k === 'A' ? VC : k === 'N' ? OC : C.ink; el.style.borderColor = mix(C.ink, col, u); el.style.color = mix(C.ink, col, u); });
    [wt('W5', 'three', 1), wt('W5', 'two'), wt('W3', 'one', 1)].forEach((tt, i) => M.vis($('#gp' + i), t, i === 2 ? tt + 0.5 : tt, 1e9, { dy: 8 }));
    PUC.write($('#wTot'), t, wt('W6', 'twelve') - 0.4, 0.8);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tRt = wt('X3', 'multiply');
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'each') - 0.1, tRight: tRt });
    const f = M.io((t - tRt) / 0.3); tOpA.style.opacity = (1 - f).toFixed(3); tOpB.style.opacity = f.toFixed(3);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'how'), tCount, tAns });
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
