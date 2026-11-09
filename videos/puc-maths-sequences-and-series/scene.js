// PUC Maths Ep 62: Sequences and series (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 8): place n coral (accent), term a_n violet, sum teal
const VC = C.violet, VBG = '#EDE6FC', RC = C.ac, TC = '#0E8F8F', TBG = '#DDF1F1';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const v = s => `\\textcolor{${VC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, tc = s => `\\textcolor{${TC}}{${s}}`;
const an = n => v(`a_{${rc(n)}}`);
document.head.insertAdjacentHTML('beforeend', '<style>#ll .lbl{text-transform:none}</style>');

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tN1 = T0('N1'), tL1 = T0('L1'), tR1 = T0('R1'), tR4 = T0('R4'), tF0 = T0('F0'), tS1 = T0('S1'), tS5 = T0('S5'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F2'), tY = T0('Y1'), tN = T0('N0');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['FIRST', '2'], ['SECOND', '5'], ['THIRD, FOURTH', '10, 17']];
$('#lists').innerHTML = LS.map(([n, val], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${val}</div></div>`).join('');
const tLs = [wt('H1', 'Two'), wt('H1', 'five'), wt('H1', 'ten')];

/* ---------- H ---------- */
const HV = ['2', '5', '10', '17', '?'];
$('#hCh').innerHTML = HV.map((x, i) => `<div class="ch" id="hc${i}" style="left:${36 + i * 144}px;top:140px;width:128px;${i === 4 ? 'background:#fff;border-color:var(--ac);color:var(--ac)' : ''}">${x}</div><div class="chL" style="left:${36 + i * 144}px;top:110px;width:128px">PLACE ${i + 1}</div>`).join('');

/* ---------- D: queue ---------- */
const ds = $('#dS'), TOK = [7, 3, 9, 4, 6], QX = i => 100 + i * 146, QY = 230;
const ppl = TOK.map((tk, i) => { const pg = mk(ds, 'g', {}), g = mk(pg, 'g', {});
  mk(g, 'circle', { cx: 0, cy: -70, r: 26, fill: C.soft, stroke: C.ink2, 'stroke-width': 2.5 });
  mk(g, 'path', { d: 'M-40,10 Q-40,-36 0,-36 Q40,-36 40,10 Z', fill: C.soft, stroke: C.ink2, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: -32, y: 20, width: 64, height: 56, rx: 10, fill: VBG, stroke: VC, 'stroke-width': 2.5 });
  txt(g, 0, 58, String(tk), { 'text-anchor': 'middle', 'font-size': 28, fill: VC, 'font-weight': 600 });
  return { pg, g }; });
const qPl = TOK.map((_, i) => txt(ds, QX(i), QY + 120, ['1ST', '2ND', '3RD', '4TH', '5TH'][i], { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600, 'letter-spacing': 1 }));
const qCnt = mk(ds, 'rect', { x: 40, y: 410, width: 704, height: 10, rx: 5, fill: C.line });
const qCntT = txt(ds, 392, 460, 'COUNTER', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const qList = txt(ds, 392, 520, '', { 'text-anchor': 'middle', 'font-size': 26, fill: VC, 'font-weight': 600 });
const tSwap = wt('D2', 'Swap');

/* ---------- N: terms ---------- */
const NT = [['1', '2'], ['2', '5'], ['3', '10'], ['4', '17'], ['n', 'n^2+1']];
$('#nCh').innerHTML = NT.map(([p, x], i) => `<div class="chL" style="left:${36 + i * 144}px;top:96px;width:128px">${p === 'n' ? '...' : 'PLACE ' + p}</div><div class="ch" id="nc${i}" style="left:${36 + i * 144}px;top:124px;width:128px;font-size:${i === 4 ? 30 : 40}px">${i === 4 ? '...' : x}</div><div class="chL" id="ncl${i}" style="left:${36 + i * 144}px;top:236px;width:128px;font-size:30px">${K(an(p))}</div>`).join('');
$('#nc4').style.background = '#fff'; $('#nc4').style.borderColor = VC; $('#nc4').innerHTML = K(an('n'));
$('#ncl4').innerHTML = '<span style="font:600 16px IBM Plex Mono;color:var(--mute)">GENERAL TERM</span>';
$('#npk0').innerHTML = K(rc('n')); $('#npk1').innerHTML = K(an('n'));
$('#nP').innerHTML = `${K(`a_n`)} = the nth term, or general term`;
const tNc = [wt('N1', 'first'), wt('N1', 'second'), wt('N1', 'second') + 0.5, wt('N1', 'second') + 0.8, wt('N2', 'place')];

/* ---------- L: dot squares ---------- */
const ls = $('#lS'), GX = 90, GY = 120, GS = 64;
const dots = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) dots.push({ i, j, c: mk(ls, 'circle', { cx: GX + j * GS, cy: GY + i * GS, r: 20, fill: VC }) });
const ex = mk(ls, 'circle', { cx: GX, cy: 470, r: 20, fill: RC }); const exT = txt(ls, GX + 40, 478, '+ 1 extra dot', { 'font-size': 22, fill: RC, 'font-weight': 600 });
const sqT = txt(ls, GX - 20, 92, '', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const tNs = [T0('L2'), wt('L3', 'two'), wt('L3', 'three'), wt('L4', 'rule'), wt('L4', 'five')];
const nAt = t => tNs.reduce((acc, tt, i) => t >= tt ? i + 1 : acc, 0);
$('#lRows').innerHTML = [1, 2, 3, 4, 5].map(n => `<div class="trw" id="lw${n}" style="top:${84 + (n - 1) * 64}px"><div class="k">n = ${n}</div><div class="f">${K(`${rc(n)}^2 + 1`)}</div><div class="v">${n * n + 1}</div></div>`).join('');
$('#lF').innerHTML = K(`${an('n')} = ${rc('n')}^{2} + 1`);
const lH = document.createElement('div'); lH.className = 'fx2'; lH.style.cssText = 'top:494px;font-size:34px'; lH.innerHTML = K(`${an(100)} = ${rc(100)}^{2} + 1 = 10001`); $('#lr').appendChild(lH);
let nLast = -1;

/* ---------- R: formula vs step ---------- */
$('#rlF').innerHTML = K(`${an('n')} = ${rc('n')}^{2} + 1`);
$('#rlM').innerHTML = [[1, 2], [2, 5], [10, 101]].map(([n, x], i) => `<div class="trw" id="rm${i}" style="top:${200 + i * 80}px;height:64px"><div class="k" style="top:14px">n = ${n}</div><div class="f" style="left:220px">${K('\\longrightarrow')}</div><div class="v" style="left:320px;right:auto;top:12px">${x}</div></div>`).join('');
$('#rrF').innerHTML = K(`${an('n')} = ${an('n-1')} + ${an('n-2')}`);
const FIB = [1, 1, 2, 3, 5, 8];
$('#rrM').innerHTML = FIB.map((x, i) => `<div class="sm" id="fb${i}" style="left:${36 + i * 120}px;top:240px;width:104px">${x}</div><div class="chL" id="fbl${i}" style="left:${36 + i * 120}px;top:330px;width:104px;color:var(--mute)">${i >= 2 ? FIB[i - 2] + ' + ' + FIB[i - 1] : 'START'}</div>`).join('');
const tFb = i => i < 2 ? wt('R3', 'One') + i * 0.3 : wt('R3', 'One') + 0.3 + (i - 1) * 0.42;
const th1 = PUC.think($('#th1'), { q: `If ${K(`${an('n')} = 2${rc('n')} + 1`)}, what is the 10th term?`, opts: ['21', '20'], right: 0, why: 'Twenty one: put n = 10. Two times ten, plus one.' });

/* ---------- I: finite / infinite ---------- */
$('#ilC').innerHTML = [16, 17, 17, 16, 18].map((x, i) => `<div class="sm" id="ic${i}" style="left:${36 + i * 116}px;top:190px;width:100px;height:96px;font-size:36px">${x}</div>`).join('') + `<div class="sm" id="icE" style="left:620px;top:190px;height:96px;width:128px;background:var(--ink);color:#fff;font-size:20px;letter-spacing:.1em">END</div>`;
$('#irC').innerHTML = [2, 4, 6, 8, 10].map((x, i) => `<div class="sm" id="jc${i}" style="left:${36 + i * 116}px;top:190px;width:100px;height:96px;font-size:36px">${x}</div>`).join('') + `<div class="sm" id="jcE" style="left:620px;top:190px;height:96px;width:128px;background:#fff;border:2.5px dashed var(--v);box-sizing:border-box">...</div>`;

/* ---------- S: series ---------- */
$('#slA').innerHTML = K(v('1,\\ 3,\\ 5,\\ 7'));
$('#slB').innerHTML = K(`${v('1')} + ${v('3')} + ${v('5')} + ${v('7')} = ${tc('16')}`);
$('#slC').innerHTML = K(`\\sum_{k=1}^{n} ${v('a_k')} = ${v('a_1')} + ${v('a_2')} + \\dots + ${v('a_n')}`);
const ss = $('#sS2'), UX = 70, UY = 110, U = 80;
const LC = [VC, '#9B7BEA', VC, '#9B7BEA'], cells = [];
for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const k = Math.max(i, j); cells.push({ k, r: mk(ss, 'rect', { x: UX + j * U + 3, y: UY + i * U + 3, width: U - 6, height: U - 6, rx: 8, fill: LC[k] }) }); }
const sqLab = txt(ss, UX, UY + 4 * U + 44, '', { 'font-size': 22, fill: TC, 'font-weight': 600 });
const tSq = k => wt('S3', 'Watch') + 0.2 + k * (wt('S3', 'total') - wt('S3', 'Watch') - 0.2) / 3.5;
const th2 = PUC.think($('#th2'), { q: `Is ${K('2 + 4 + 6')} a sequence or a series?`, opts: ['Sequence', 'Series'], right: 1, why: 'A series: the plus signs add the terms. Without them, 2, 4, 6 is a sequence.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${v('a_1,\\ a_2,\\ a_3,\\ \\dots')} \\qquad\\qquad ${v('a_1')} + ${v('a_2')} + ${v('a_3')} + \\dots`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Write the first five terms of ${K(`${an('n')} = ${rc('n')}(${rc('n')} + 2)`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${an(1)} = ${rc(1)} \\times 3 = ${v(3)}`)],
  [K(`${an(2)} = ${v(8)},\\quad ${an(3)} = ${v(15)}`)],
  [K(`${an(4)} = ${v(24)},\\quad ${an(5)} = ${v(35)}`)],
  [K(`${v('3 + 8 + 15 + 24 + 35')} = ${tc('85')}`)]], { label: 'WORKED EXAMPLE · NCERT EXERCISE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const ws = $('#wS'), WB = 410, WV = [3, 8, 15, 24, 35];
mk(ws, 'line', { x1: 50, y1: WB, x2: 734, y2: WB, stroke: C.ink, 'stroke-width': 3 });
const wBars = WV.map((x, i) => { const bx = 90 + i * 130; const r = mk(ws, 'rect', { x: bx, y: WB - x * 8.4, width: 90, height: x * 8.4, rx: 8, fill: VC }); const l = txt(ws, bx + 45, WB - x * 8.4 - 12, String(x), { 'text-anchor': 'middle', 'font-size': 24, fill: VC, 'font-weight': 600 }); const p = txt(ws, bx + 45, WB + 32, `n = ${i + 1}`, { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600 }); return { r, l, p }; });
const tWb = [wt('W3', 'three'), wt('W4', 'eight'), wt('W4', 'fifteen'), wt('W5', 'twenty'), wt('W5', 'thirty')];
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'Add')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`a_1 = 0^2 + 1 = 1`) + '&nbsp; (started at n = 0)', right: K(`a_1 = 1^2 + 1 = 2`) + '&nbsp; (places start at 1)' });
const ts = $('#tS');
const tq = [0, 1, 2, 3].map(i => { const g = mk(mk(ts, 'g', { transform: `translate(${60 + i * 120},120)` }), 'g', {}); const r = mk(g, 'rect', { x: -46, y: -36, width: 92, height: 72, rx: 12, fill: i ? C.okBg : C.redBg, stroke: i ? C.ok : C.red, 'stroke-width': 2.5, 'stroke-dasharray': i ? '' : '7 5' }); txt(g, 0, 10, String(i), { 'text-anchor': 'middle', 'font-size': 30, fill: i ? C.ok : C.red, 'font-weight': 600 }); return g; });
const tqL = txt(ts, 240, 206, 'PLACES: 1, 2, 3, ... (never 0)', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A sequence given by a step rule: find a pattern for the nth term' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A sequence has ${K('a_1 = 3')} and ${K('a_{n+1} = 2a_n - 1')}.<br>Find the 10th term ${K('a_{10}')}.`,
  opts: ['1025', '1024', '513', '2049'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`3,\\ 5,\\ 9,\\ 17,\\ \\dots`)], [K(`= 2^1{+}1,\\ 2^2{+}1,\\ 2^3{+}1,\\ 2^4{+}1`)], [K(`a_n = 2^{n} + 1`)], [K(`2(2^n{+}1) - 1 = 2^{n+1} + 1\\ \\checkmark`)], [K(`a_{10} = 1024 + 1 = 1025`)]], { y0: 100, dy: 92 });
const tSo = [wt('A2', 'Write'), wt('A3', 'power'), wt('A3', 'So'), wt('A4', 'Check'), wt('A4', 'tenth')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · sequences and series', y0: 100, dy: 76, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Sequence</b>: numbers in a definite order, by a rule',
    `${K(an('n'))} = the nth (general) term · places ${K(rc('n'))} = 1, 2, 3, ...`,
    `Formula rule ${K(`${an('n')} = ${rc('n')}^2 + 1`)} · step rule ${K(`${an('n')} = ${an('n-1')} + ${an('n-2')}`)}`,
    K(`\\text{Series: } \\sum_{k=1}^{n} ${v('a_k')} = ${v('a_1')} + ${v('a_2')} + \\dots + ${v('a_n')}`),
    `${K('1 + 3 + 5 + \\dots')} (n odd numbers) ${K(`= ${tc('n^2')}`)}`] });
const YQ = ['What is the difference between a sequence and a series?', 'Find the 5th term of aₙ = 3n - 1.', 'Write the first four terms of aₙ = n² + 1.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 63', topic: 'Saving the same amount every week: Arithmetic Progression', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L4', 'rule') - 0.2, 1.05, 960, 560], [T1('L4') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HV.forEach((_, i) => M.vis($('#hc' + i), t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 12 }));
    M.vis($('#hg0'), t, wt('H2', 'twenty') - 0.1, 1e9, POP); M.vis($('#hg1'), t, wt('H2', 'six') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'hundredth') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tN1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('N1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const sw = M.io((t - tSwap - 0.1) / 0.8);
    ppl.forEach((p, i) => { let x = QX(i), y = QY; if (i === 1 || i === 3) { const to = QX(i === 1 ? 3 : 1); x = QX(i) + (to - QX(i)) * sw; y = QY - 60 * Math.sin(Math.PI * sw) * (i === 1 ? 1 : -0.4); }
      attr(p.pg, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); M.vis(p.g, t, wt('D1', 'queue') + i * 0.1, 1e9, { dy: 14 }); });
    qPl.forEach((q, i) => M.vis(q, t, wt('D1', 'First') + i * 0.15, 1e9, { dy: 0 }));
    M.vis(qCnt, t, wt('D1', 'queue'), 1e9, { dy: 0 }); M.vis(qCntT, t, wt('D1', 'queue') + 0.1, 1e9, { dy: 0 });
    M.setT(qList, sw < 0.5 ? '7, 3, 9, 4, 6' : '7, 4, 9, 3, 6'); M.vis(qList, t, wt('D2', 'token'), 1e9, { dy: 0 });
    attr(qList, 'fill', sw > 0.5 ? RC : VC);
    M.vis($('#dr'), t, T0('D3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.rise($('#dR'), t, wt('D3', 'Numbers'), { st: 0.05, sp: M.HEAVY });
    M.vis($('#dP'), t, wt('D3', 'rule') + 0.2, 1e9, POP);
  }

  /* N */
  const nOn = t >= tN1 - 0.1 && t < tL1 + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = OUT('L1');
    M.vis($('#nl'), t, tN1 + 0.1, out, { dx: -60, dy: 0, ...o });
    NT.forEach((_, i) => { M.vis($('#nc' + i), t, i < 2 ? tNc[i] - 0.1 : tN1 + 0.4 + i * 0.1, 1e9, { dy: 12 }); M.vis($('#ncl' + i), t, tNc[i], 1e9, { dy: 8 }); });
    const hl = M.io((t - wt('N2', 'place') + 0.1) / 0.3); $('#nc4').style.background = mix('#FFFFFF', VBG, hl);
    M.vis($('#nr'), t, T0('N2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#np0'), t, wt('N3', 'place') - 0.1, 1e9, { dy: 12 }); M.vis($('#np1'), t, wt('N3', 'number') - 0.1, 1e9, { dy: 12 });
    M.vis($('#nP'), t, wt('N2', 'general') - 0.1, 1e9, POP);
  }

  /* L: live dot squares */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('R1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const n = nAt(t);
    dots.forEach(d => M.vis(d.c, t, d.i < n && d.j < n ? tNs[Math.max(d.i, d.j)] + 0.05 * (d.i + d.j) : 1e9, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(ex, t, tNs[0] + 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(exT, t, wt('L2', 'extra'), 1e9, { dy: 0 });
    if (n !== nLast) { nLast = n; M.setT($('#lN'), String(Math.max(n, 1))); M.setT($('#lA'), String(Math.max(n, 1) ** 2 + 1)); M.setT(sqT, n ? `${n} × ${n} = ${n * n} dots` : ''); }
    [0, 1].forEach(i => M.vis($('#lr' + i), t, tL1 + 0.5 + i * 0.12, 1e9, { dy: 12 }));
    M.vis(sqT, t, tNs[0] + 0.3, 1e9, { dy: 0 });
    M.vis($('#lr'), t, tL1 + 0.4, out, { dx: 60, dy: 0, ...o });
    [1, 2, 3, 4, 5].forEach(k => { const el = $('#lw' + k); M.vis(el, t, tNs[k - 1] + 0.3, 1e9, { dx: -14, dy: 0 }); const hl = k === 5 ? M.io((t - wt('L4', 'six') + 0.1) / 0.3) : 0; el.style.borderColor = mix(C.soft, VC, hl); el.style.background = mix(C.soft, VBG, hl); });
    PUC.write($('#lF'), t, wt('L4', 'rule'), 0.9);
    PUC.write(lH, t, wt('L5', 'hundredth'), 1.0);
  }

  /* R + think */
  const rOn = t >= tR1 - 0.1 && t < tF0 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R4');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#rlF'), t, wt('R2', 'squared') - 0.6, 0.8);
    [0, 1, 2].forEach(i => M.vis($('#rm' + i), t, wt('R2', 'formula') + 0.3 + i * 0.3, 1e9, { dx: -14, dy: 0 }));
    M.vis($('#rlP'), t, wt('R2', 'place'), 1e9, POP);
    M.vis($('#rr'), t, T0('R3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#rrF'), t, wt('R3', 'builds'), 0.9);
    FIB.forEach((_, i) => { M.vis($('#fb' + i), t, tFb(i), 1e9, POP); M.vis($('#fbl' + i), t, tFb(i) + 0.1, 1e9, { dy: 6 }); });
    M.vis($('#rrP'), t, wt('R3', 'eight') + 0.2, 1e9, POP);
    M.vis($('#th1'), t, tR4 + 0.05, OUT('F0'), { dy: 36, ...o });
    th1(t, { tin: tR4, tOpts: wt('R4', 'tenth') - 0.1, tCount: T1('R4') + 0.05, dur: 3, tAns: T0('R5') - 0.02, tWhy: wt('R5', 'Put') });
  }

  /* I: finite / infinite */
  const iOn = t >= tF0 - 0.1 && t < tS1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('S1');
    M.vis($('#il'), t, tF0 + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2, 3, 4].forEach(i => M.vis($('#ic' + i), t, wt('F1', 'finite') + i * 0.1, 1e9, POP)); M.vis($('#icE'), t, wt('F1', 'stops'), 1e9, POP); M.vis($('#ilT'), t, wt('F1', 'ages'), 1e9, { dy: 8 });
    M.vis($('#ir'), t, wt('F1', 'infinite') - 0.2, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2, 3, 4].forEach(i => M.vis($('#jc' + i), t, wt('F1', 'infinite') + i * 0.1, 1e9, POP)); M.vis($('#jcE'), t, wt('F1', 'even'), 1e9, POP); M.vis($('#irT'), t, wt('F1', 'even') + 0.2, 1e9, { dy: 8 });
  }

  /* S: series + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S5');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#slA'), t, wt('S2', 'One') , 0.8); PUC.write($('#slB'), t, wt('S2', 'series') - 1.4, 1.2);
    M.vis($('#sHi'), t, wt('S4', 'sigma') - 0.2, 1e9, { dy: 0, fade: 0.2 }); PUC.write($('#slC'), t, wt('S4', 'sigma'), 1.0); M.vis($('#slD'), t, wt('S4', 'Greek'), 1e9, { dy: 8 });
    M.vis($('#sr'), t, wt('S3', 'Watch') - 0.2, out, { dx: 60, dy: 0, ...o });
    let kk = 0; cells.forEach(c => { const tk = tSq(c.k); if (t >= tk) kk = Math.max(kk, c.k + 1); M.vis(c.r, t, tk + 0.03 * c.k, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); });
    M.setT($('#sAd'), kk ? String(2 * kk - 1) : '-'); M.setT($('#sTo'), kk ? `${kk * kk} = ${kk}²` : '-'); M.setT(sqLab, kk ? `${kk} × ${kk} square` : '');
    [0, 1].forEach(i => M.vis($('#sr' + i), t, wt('S3', 'Watch') + 0.1 + i * 0.1, 1e9, { dy: 12 })); M.vis(sqLab, t, tSq(0), 1e9, { dy: 0 });
    M.vis($('#sP'), t, wt('S3', 'total') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tS5 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tS5, tOpts: wt('S5', 'sequence') - 0.1, tCount: T1('S5') + 0.05, dur: 3, tAns: T0('S6') - 0.02, tWhy: wt('S6', 'plus') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'sequence') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'series'), 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    wBars.forEach((b, i) => { M.vis(b.r, t, tWb[i] - 0.1, 1e9, { dy: 20, fade: 0.15 }); M.vis(b.l, t, tWb[i], 1e9, { dy: 0 }); M.vis(b.p, t, T0('W2') + 0.5 + i * 0.08, 1e9, { dy: 0 }); });
    M.vis($('#wP'), t, wt('W6', 'Add') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'places') - 0.1, tRight: wt('X3', 'first') - 0.1 });
    tq.forEach((g, i) => M.vis(g, t, i ? wt('X3', 'places') + i * 0.15 : wt('X2', 'zero'), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 })); M.vis(tqL, t, wt('X3', 'queue'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'sequence') });
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
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F2', 'Screenshot') });
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
