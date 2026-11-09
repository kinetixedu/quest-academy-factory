// PUC Maths Ep 59: Binomial theorem for positive integral index (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (this chapter): a (tea) blue, b (coffee) gold, nCr coefficient violet
const AC = '#2F6FEB', ABG = '#E7EEFD', BC = '#B7791F', BBG = '#F6EAD3', VC = C.violet, VBG = '#EDE6FC';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const a = s => `\\textcolor{${AC}}{${s}}`, b = s => `\\textcolor{${BC}}{${s}}`, v = s => `\\textcolor{${VC}}{${s}}`;
const nC = (n, r) => v(`{}^{${n}}C_{${r}}`);
const comb = (n, r) => { let x = 1; for (let i = 1; i <= r; i++) x = x * (n - r + i) / i; return Math.round(x); };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tD3 = T0('D3'), tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4');
const tC1 = T0('C1'), tL1 = T0('L1'), tG1 = T0('G1'), tS1 = T0('S1'), tS4 = T0('S4'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['TWO BRACKETS', '(a+b)^2', '3 terms'], ['THREE BRACKETS', '(a+b)^3', '4 terms'], ['TEN BRACKETS', '(a+b)^{10}', '?']];
$('#lists').innerHTML = LS.map(([n, f, c], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n} · ${c.toUpperCase()}</div><div class="lv">${K(f)}</div></div>`).join('');
const tLs = [wt('H1', 'Multiply') + 0.3, wt('H1', 'three') - 0.1, wt('H1', 'terms') + 0.3];

/* ---------- H ---------- */
const HR = [[`(a+b)^2 = a^2 + 2ab + b^2`, '3 TERMS'], [`(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`, '4 TERMS'], [`(a+b)^{10} = \\;?`, '11 TERMS?']];
$('#hrs').innerHTML = HR.map(([f, tg], i) => `<div class="hr" id="hr${i}" style="top:${96 + i * 112}px"><div class="fx">${K(f)}</div><div class="tag">${tg}</div></div>`).join('');
$('#hr2 .tag').textContent = 'HOW MANY?';
$('#hkP').innerHTML = `${K('(a+b)^{10}')}&nbsp;without ten multiplications?`;

/* ---------- D: canteen ---------- */
$('#dfr').innerHTML = [0, 1, 2].map(i => `<div class="fr" id="fr${i}" style="left:${36 + i * 244}px"><div class="fh">FRIEND ${i + 1}</div>
  <div class="dk" id="dt${i}" style="top:40px;background:${ABG};color:${AC}">Tea <i id="dta${i}">a</i></div>
  <div class="dk" id="dc${i}" style="top:140px;background:${BBG};color:${BC}">Coffee <i id="dcb${i}">b</i></div></div>`).join('');
const DM = [['Tea', a('a')], ['Coffee', b('b')], ['One friend', `(${a('a')} + ${b('b')})`]];
$('#dmp').innerHTML = DM.map(([k, f], i) => `<div class="mp" id="mp${i}" style="top:${88 + i * 88}px"><div class="k">${k}</div><div class="v">${K(f)}</div></div>`).join('');
$('#dF').innerHTML = K(`(${a('a')}+${b('b')})(${a('a')}+${b('b')})(${a('a')}+${b('b')}) = (${a('a')}+${b('b')})^{3}`);
$('#dFl').innerHTML = [0, 1, 2].map(i => `<div class="fl3" id="dfl${i}" style="left:${36 + i * 132}px">FRIEND ${i + 1}</div>`).join('');

/* ---------- P: 8 orders sorted ---------- */
const ORD = ['aaa', 'aab', 'aba', 'baa', 'abb', 'bab', 'bba', 'bbb'];
const term = s => { const na = [...s].filter(c => c === 'a').length, nb = 3 - na; return (na ? a(na > 1 ? `a^{${na}}` : 'a') : '') + (nb ? b(nb > 1 ? `b^{${nb}}` : 'b') : ''); };
const nbOf = s => [...s].filter(c => c === 'b').length;
$('#pos').innerHTML = ORD.map((s, i) => `<div class="ord" id="or${i}" style="top:${80 + i * 60}px">${[...s].map((c, j) => `<span class="dt ${c}" style="left:${16 + j * 48}px">${c}</span>`).join('')}<span class="ar">=</span><div class="pr">${K(term(s))}</div></div>`).join('');
const BT = [a('a^3'), `${a('a^2')}${b('b')}`, `${a('a')}${b('b^2')}`, b('b^3')], BH = ['0 COFFEE', '1 COFFEE', '2 COFFEES', '3 COFFEES'];
$('#pbs').innerHTML = BT.map((f, k) => `<div class="bin" id="bn${k}" style="left:${36 + k * 184}px"><div class="bh">${BH[k]}</div><div class="bc" id="bc${k}">0</div><div class="bt">${K(f)}</div>
  ${ORD.map((s, i) => [s, i]).filter(([s]) => nbOf(s) === k).map(([s, i], j) => `<div class="mc" id="mc${i}" style="top:${118 + j * 38}px">${[...s].map((c, q) => `<b style="left:${q * 38}px;background:${c === 'a' ? AC : BC}"></b>`).join('')}</div>`).join('')}</div>`).join('');
$('#pF').innerHTML = K(`(${a('a')}+${b('b')})^{3} = ${a('a^3')} + ${v('3')}${a('a^2')}${b('b')} + ${v('3')}${a('a')}${b('b^2')} + ${b('b^3')}`);
const tOrd = i => i === 0 ? wt('P1', 'Tea') : i === 1 ? wt('P1', 'coffee') - 0.1 : wt('P1', 'squared') + 0.4 + (i - 2) * 0.32;
const tBin = [wt('P3', 'No'), wt('P3', 'One', 1), wt('P3', 'Two'), wt('P3', 'Three', 2)];
const ordBin = ORD.map(nbOf), ordJ = ORD.map((s, i) => ORD.slice(0, i).filter(x => nbOf(x) === nbOf(s)).length);
const tSort = i => tBin[ordBin[i]] + ordJ[i] * 0.22;

/* ---------- C: who gets the coffee ---------- */
const cs = $('#cS'), SX = [150, 392, 634], SY = 200;
const seats = SX.map((x, i) => { const g = mk(mk(cs, 'g', { transform: `translate(${x},${SY})` }), 'g', {}); const c = mk(g, 'circle', { r: 66, fill: ABG, stroke: AC, 'stroke-width': 4 }); const l = txt(g, 0, 16, 'a', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Math', 'font-style': 'italic', 'font-size': 48, fill: AC }); txt(g, 0, 102, `FRIEND ${i + 1}`, { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 }); return { g, c, l }; });
const cWays = ['baa', 'aba', 'aab'].map((s, i) => { const g = mk(mk(cs, 'g', { transform: `translate(${80 + i * 236},380)` }), 'g', {}); mk(g, 'rect', { x: 0, y: 0, width: 200, height: 64, rx: 12, fill: C.soft }); [...s].forEach((ch, q) => { mk(g, 'circle', { cx: 44 + q * 56, cy: 32, r: 18, fill: ch === 'a' ? AC : BC }); }); return g; });
$('#cP').innerHTML = `3 ways = ${K('{}^{3}C_{1}')}`;
const CS = [[`${nC(3, 1)} = 3`, 'choose 1 friend out of 3 for the coffee'], [`${nC(3, 0)},\\ ${nC(3, 1)},\\ ${nC(3, 2)},\\ ${nC(3, 3)} = ${v('1,\\ 3,\\ 3,\\ 1')}`, 'the numbers in front of each term'], [`${nC('n', 'r')}`, 'ways to choose the r brackets that give b']];
$('#cSt').innerHTML = CS.map(([f, w], i) => `<div class="st" id="cs${i}" style="top:${84 + i * 150}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tCw = [wt('C2', 'first'), wt('C2', 'second'), wt('C2', 'third')];
const tCs = [wt('C3', 'Here'), wt('C4', 'every'), wt('C4', 'counts')];

/* ---------- L: live n with the hill ---------- */
const lb = $('#lB'), BY0 = 470, BX0 = 64, BW = 656;
mk(lb, 'line', { x1: 48, y1: BY0, x2: 736, y2: BY0, stroke: C.ink, 'stroke-width': 3 });
const bars = [], bLab = [], rLab = [];
for (let r = 0; r <= 11; r++) { bars.push(mk(lb, 'rect', { x: 0, y: BY0, width: 0, height: 0, rx: 5, fill: VC })); bLab.push(txt(lb, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 16, fill: VC, 'font-weight': 600 })); rLab.push(txt(lb, 0, BY0 + 30, '', { 'text-anchor': 'middle', 'font-size': 16 })); }
const hillNote = txt(lb, 392, 530, 'rises and falls evenly: the same from both ends', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const tN0 = wt('L1', 'count'), tN1 = T1('L2') - 0.2;
const nTr = t => 1 + 9 * M.clamp((t - tN0) / (tN1 - tN0));
const rowLay = (n) => { const w = Math.min(52, BW / (n + 1) - 8), gap = (BW - w * (n + 1)) / (n + 2); return r => BX0 + gap + r * (w + gap); };
const avD = PUC.avatar($('#sL'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Ten friends, two choices each: 1024 orders.' });
$('#lP').className = 'pillp ac'; $('#lP').innerHTML = K(`(1+1)^{10} = 2^{10} = 1024`);
let nLast = -1;

/* ---------- G: theorem ---------- */
const GS = [[`${nC('n', 0)}\\, ${a('a^{n}')}`, 'first term: nobody picks b'], [`${a('a^{n-1}')}${b('b')},\\ \\ ${a('a^{n-2}')}${b('b^{2}')},\\ \\dots`, 'a loses one power, b gains one'], [`${nC('n', 'r')}\\, ${a('a^{n-r}')}\\, ${b('b^{r}')}`, 'r brackets give b, in nCr ways'], [`${nC('n', 'n')}\\, ${b('b^{n}')}`, 'last term: everyone picks b']];
$('#gSt').innerHTML = GS.map(([f, w], i) => `<div class="st" id="gs${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#gL0').innerHTML = K(`(${a('a')}+${b('b')})^{n} =`);
$('#gL1').innerHTML = K(`${nC('n', 0)}${a('a^{n}')} + ${nC('n', 1)}${a('a^{n-1}')}${b('b')} + ${nC('n', 2)}${a('a^{n-2}')}${b('b^{2}')}`);
$('#gL2').innerHTML = K(`+ \\dots + ${nC('n', 'r')}${a('a^{n-r}')}${b('b^{r}')} + \\dots + ${nC('n', 'n')}${b('b^{n}')}`);
const tGs = [wt('G2', 'first'), wt('G3', 'next'), wt('G4', 'front'), wt('G5', 'last')];

/* ---------- S: the square ---------- */
const SQA = 210, SQB = 120, SQX = 60, SQY = 96;
const sqPieces = (svg, full) => {
  const P = {};
  P.aa = mk(svg, 'rect', { x: SQX, y: SQY, width: SQA, height: SQA, fill: ABG, stroke: AC, 'stroke-width': 3 });
  P.ab1 = mk(svg, 'rect', { x: SQX + SQA, y: SQY, width: SQB, height: SQA, fill: full ? VBG : '#fff', stroke: full ? VC : C.red, 'stroke-width': 3, 'stroke-dasharray': full ? '' : '8 6' });
  P.ab2 = mk(svg, 'rect', { x: SQX, y: SQY + SQA, width: SQA, height: SQB, fill: full ? VBG : '#fff', stroke: full ? VC : C.red, 'stroke-width': 3, 'stroke-dasharray': full ? '' : '8 6' });
  P.bb = mk(svg, 'rect', { x: SQX + SQA, y: SQY + SQA, width: SQB, height: SQB, fill: BBG, stroke: BC, 'stroke-width': 3 });
  const lab = (x, y, s, col) => txt(svg, x, y, s, { 'text-anchor': 'middle', 'font-family': 'KaTeX_Math', 'font-style': 'italic', 'font-size': 34, fill: col });
  P.l = [lab(SQX + SQA / 2, SQY + SQA / 2 + 12, 'a²', AC), lab(SQX + SQA + SQB / 2, SQY + SQA + SQB / 2 + 12, 'b²', BC),
    lab(SQX + SQA + SQB / 2, SQY + SQA / 2 + 12, full ? 'ab' : '?', full ? VC : C.red), lab(SQX + SQA / 2, SQY + SQA + SQB / 2 + 12, full ? 'ab' : '?', full ? VC : C.red)];
  return P;
};
const SL = sqPieces($('#slS'), false), SR = sqPieces($('#srS'), true);
const srs = $('#srS'); const sideA = txt(srs, SQX + SQA / 2, SQY - 14, 'a', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Math', 'font-style': 'italic', 'font-size': 28, fill: AC }), sideB = txt(srs, SQX + SQA + SQB / 2, SQY - 14, 'b', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Math', 'font-style': 'italic', 'font-size': 28, fill: BC });
$('#slF').innerHTML = K(`${a('a^2')} + ${b('b^2')}`); $('#srF').innerHTML = K(`${a('a^2')} + ${v('2ab')} + ${b('b^2')}`);
const th1 = PUC.think($('#th1'), { q: `Is ${K('(a + b)^3')} equal to ${K('a^3 + b^3')}?`, opts: ['Yes', 'No'], right: 1, why: `No: the middle terms ${K(`${v('3')}a^2b`)} and ${K(`${v('3')}ab^2`)} are missing. Only the first and last terms match.` });
$('#th1 .tw').style.fontSize = '30px';

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`(${a('a')}+${b('b')})^{n} = \\sum_{r=0}^{n} ${nC('n', 'r')}\\, ${a('a^{n-r}')}\\, ${b('b^{r}')}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Expand ${K(`(${a('x')} + ${b('2')})^{4}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${nC(4, 'r')}:\\ ${v('1,\\ 4,\\ 6,\\ 4,\\ 1')}`)],
  [K(`${a('x^4')} \\to ${a('x^0')} \\qquad ${b('2^0')} \\to ${b('2^4')}`)],
  [K(`${a('x^4')} + 8${a('x^3')} + 24${a('x^2')} + 32${a('x')} + 16`)],
  [K(`x = 1:\\ 3^4 = 81 = 1 + 8 + 24 + 32 + 16`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const WR = [['NCR', r => v(comb(4, r))], ['POWER OF X', r => a(`x^{${4 - r}}`)], ['POWER OF 2', r => b(`${2 ** r}`)], ['TERM', r => { const c = comb(4, r) * 2 ** r, p = 4 - r; return `${c === 1 ? '' : c}${p ? (p === 1 ? a('x') : a(`x^{${p}}`)) : ''}`; }]];
$('#wcs').innerHTML = WR.map(([lab, f], k) => `<div class="wrl" style="top:${110 + k * 92}px">${lab}</div>` + [0, 1, 2, 3, 4].map(r => `<div class="wc" id="wc${k}${r}" style="left:${170 + r * 116}px;top:${86 + k * 92}px;${k === 3 ? 'background:#fff;border:2.5px solid var(--line);box-sizing:border-box' : ''}">${K(f(r))}</div>`).join('')).join('');
document.querySelector('#wcs .wrl').textContent = 'nCr';
const tWr = [wt('W3', 'One', 1), wt('W4', 'x'), wt('W4', 'two')];
const tWt = [wt('W5', 'four'), wt('W5', 'Eight'), wt('W5', 'Twenty'), wt('W5', 'Thirty'), wt('W5', 'Sixteen')];
const tW = [wt('W3', 'numbers'), wt('W4', 'powers'), wt('W5', 'Multiply'), wt('W6', 'Check')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(x-2)^4 = x^4 - 8x^3 - 24x^2 - 32x - 16`), right: K(`(x-2)^4 = x^4 - 8x^3 + 24x^2 - 32x + 16`) });
const ts = $('#tS');
const tSg = [1, -2, 4, -8, 16].map((s, i) => { const g = mk(mk(ts, 'g', { transform: `translate(${60 + i * 104},150)` }), 'g', {}); mk(g, 'rect', { x: -44, y: -32, width: 88, height: 64, rx: 12, fill: s > 0 ? C.okBg : C.redBg, stroke: s > 0 ? C.ok : C.red, 'stroke-width': 2.5 }); txt(g, 0, 10, (s > 0 ? '+' : '') + s, { 'text-anchor': 'middle', 'font-size': 26, fill: s > 0 ? C.ok : C.red, 'font-weight': 600 }); txt(g, 0, 66, `(-2)^${i}`, { 'text-anchor': 'middle', 'font-size': 16 }); return g; });
const tsL = txt(ts, 268, 76, 'POWERS OF -2', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Sum of all the coefficients of an expansion: put x = 1' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `All the coefficients of ${K('(1 + 2x)^{n}')}<br>add up to 6561.<br>How many terms does the expansion have?`,
  opts: ['8', '9', '10', '7'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`x = 1:\\ (1+2)^{n} = 3^{n}`)], [K(`3^{n} = 6561`)], [K(`3^{8} = 6561 \\Rightarrow n = 8`)], [K(`\\text{terms} = n + 1 = 9`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Put'), wt('A2', 'three'), wt('A3', 'so'), wt('A4', 'more')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · binomial theorem', y0: 100, dy: 76, txt: [0, 1, 1, 0, 1],
  lines: [K(`(${a('a')}+${b('b')})^{n} = \\sum_{r=0}^{n} ${nC('n', 'r')}\\, ${a('a^{n-r}')}\\, ${b('b^{r}')}`),
    `${K(nC('n', 'r'))} = ways to choose the r brackets that give b`,
    '<b>n + 1</b> terms · the two powers always add up to <b>n</b>',
    K(`(${a('a')}+${b('b')})^{2} = ${a('a^2')} + ${v('2ab')} + ${b('b^2')}`),
    `Put x = 1: the coefficients of ${K('(1+x)^n')} add up to ${K('2^n')}`] });
const YQ = ['Why is (a + b)² not just a² + b²?', 'How many terms does (a + b)⁷ have?', 'What do the coefficients of (1 + x)⁵ add up to?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 60', topic: 'Jump straight to the 7th term: the General Term', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tP3 - 0.2, 1.05, 960, 560], [tP4 + 0.4, 1, 960, 540]]);

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
    M.vis($('#hr0'), t, tMorph + 0.3, 1e9, { dy: 14 }); M.vis($('#hr1'), t, wt('H2', 'four') - 0.3, 1e9, { dy: 14 });
    M.vis($('#hr2'), t, wt('H3', 'power') - 0.1, 1e9, { dy: 14 });
    M.vis($('#hlP'), t, wt('H4', 'page') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'shortcut') - 0.1, 1e9, POP);
  }

  /* D: canteen */
  const dOn = t >= tD1 - 0.1 && t < tP1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('P1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2].forEach(i => { M.vis($('#fr' + i), t, wt('D1', 'Three') + i * 0.15, 1e9, { dy: 16 });
      M.vis($('#dt' + i), t, wt('D1', 'tea') + i * 0.06, 1e9, POP); M.vis($('#dc' + i), t, wt('D1', 'coffee') + i * 0.06, 1e9, POP);
      const sh = M.io((t - wt('D3', 'tea') + 0.1) / 0.3); M.hide($('#dta' + i), sh < 0.01); $('#dta' + i).style.opacity = sh; M.hide($('#dcb' + i), sh < 0.01); $('#dcb' + i).style.opacity = M.io((t - wt('D3', 'coffee') + 0.1) / 0.3); });
    const c = M.clamp((t - wt('D2', 'two')) / 1.6), k = c < 0.34 ? 2 : c < 0.67 ? 4 : 8;
    M.setT($('#dCnt'), c < 0.2 ? '2' : c < 0.55 ? '2 × 2 = 4' : '2 × 2 × 2 = 8'); M.vis($('#dCnt'), t, wt('D2', 'two') - 0.1, 1e9, { dy: 12 });
    M.vis($('#dP'), t, wt('D2', 'eight') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, tD3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#mp0'), t, wt('D3', 'tea') - 0.1, 1e9, { dy: 12 }); M.vis($('#mp1'), t, wt('D3', 'coffee') - 0.1, 1e9, { dy: 12 }); M.vis($('#mp2'), t, wt('D3', 'friend') - 0.1, 1e9, { dy: 12 });
    PUC.write($('#dF'), t, wt('D3', 'plus') - 0.1, 1.0);
    [0, 1, 2].forEach(i => { const el = $('#dfl' + i); const sp = $('#dF').querySelectorAll('.mopen')[i], sc = $('#dF').querySelectorAll('.mclose')[i]; if (sp && sc && !el._p && t > wt('D3', 'plus') + 1.1) { const r0 = $('#dr').getBoundingClientRect(); const z = r0.width / 784; const r1 = sp.getBoundingClientRect(), r2 = sc.getBoundingClientRect(); el._p = 1; el.style.left = (((r1.left + r2.right) / 2 - r0.left) / z - 60) + 'px'; } M.vis(el, t, wt('D3', 'cubed') + i * 0.12, 1e9, { dy: 8 }); });
  }

  /* P: 8 orders, sorted */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pl'), t, tP1 + 0.05, out, { dx: -60, dy: 0, ...o });
    ORD.forEach((s, i) => { const el = $('#or' + i); M.vis(el, t, tOrd(i), 1e9, { dx: -20, dy: 0 });
      const lit = M.io((t - tSort(i)) / 0.25) * (1 - M.io((t - tSort(i) - 0.7) / 0.4)); el.style.borderColor = mix(C.soft, VC, lit); el.style.background = mix(C.soft, VBG, lit); });
    M.vis($('#pr'), t, tP2 - 0.1, out, { dx: 60, dy: 0, ...o });
    BT.forEach((_, k) => { const bn = $('#bn' + k); M.vis(bn, t, tP2 + 0.2 + k * 0.1, 1e9, { dy: 16 });
      const n = ORD.filter((s, i) => ordBin[i] === k && t >= tSort(i) + 0.1).length; M.setT($('#bc' + k), String(n));
      const lit = M.io((t - tBin[k] + 0.1) / 0.25) * (1 - M.io((t - tBin[k] - 1.0) / 0.4)); bn.style.borderColor = mix(C.soft, VC, lit); });
    ORD.forEach((s, i) => M.vis($('#mc' + i), t, tSort(i), 1e9, { dx: -14, dy: 0 }));
    PUC.write($('#pF'), t, wt('P4', 'cubed') - 0.1, 1.4);
  }

  /* C: who gets the coffee */
  const cOn = t >= tC1 - 0.1 && t < tL1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('L1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const who = t < tCw[0] - 0.1 ? -1 : t < tCw[1] - 0.1 ? 0 : t < tCw[2] - 0.1 ? 1 : t < T0('C3') ? 2 : -1;
    seats.forEach((s, i) => { M.vis(s.g, t, tC1 + 0.3 + i * 0.12, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); const on = who === i;
      attr(s.c, 'fill', on ? BBG : ABG); attr(s.c, 'stroke', on ? BC : AC); attr(s.l, 'fill', on ? BC : AC); M.setT(s.l, on ? 'b' : 'a'); });
    cWays.forEach((g, i) => M.vis(g, t, tCw[i] + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#cP'), t, wt('C3', 'Here'), 1e9, POP);
    M.vis($('#cr'), t, wt('C2', 'decide') - 0.1, out, { dx: 60, dy: 0, ...o });
    CS.forEach((_, i) => { const el = $('#cs' + i); M.vis(el.querySelector('.n'), t, tCs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tCs[i], 0.8); M.vis(el.querySelector('.why'), t, tCs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tCs[1] - 0.1, 234], [tCs[2] - 0.1, 384]], M.SOFT)(t);
    const hb = $('#cHi'); M.vis(hb, t, tCs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
  }

  /* L: live n */
  const lOn = t >= tL1 - 0.1 && t < tG1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('G1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#nRd'), t, tL1 + 0.3, 1e9, { dy: 14 });
    [0, 1, 2].forEach(i => M.vis($('#lr' + i), t, tL1 + 0.5 + i * 0.12, 1e9, { dy: 14 }));
    const kv = nTr(t), n = Math.floor(kv + 1e-6);
    if (n !== nLast) { nLast = n; M.setT($('#nV'), String(n)); M.setT($('#lT'), String(n + 1));
      const row = []; for (let r = 0; r <= n; r++) row.push(comb(n, r)); M.setT($('#lC'), row.join('  ')); $('#lS').innerHTML = `${2 ** n} = 2<sup style="font-size:.6em">${n}</sup>`; }
    const sh = M.io((t - wt('L3', 'thousand') + 0.1) / 0.3); $('#lr2').style.background = mix(C.soft, C.ac2, sh);
    M.vis($('#lP'), t, wt('L3', 'because') - 0.1, 1e9, POP);
    avD(t, wt('L3', 'friends') + 0.3, out);
    M.vis($('#lrc'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    // morph: row n blends into row n+1 in the last 40% of each step
    const f = M.io((kv - n - 0.6) / 0.4), N1 = Math.min(n + 1, 10), fr = n >= 10 ? 0 : f;
    const lA = rowLay(n), lB2 = rowLay(N1), wA = Math.min(52, BW / (n + 1) - 8), wB = Math.min(52, BW / (N1 + 1) - 8);
    const mA = comb(n, n >> 1), mB = comb(N1, N1 >> 1), mx = mA + (mB - mA) * fr;
    const show = M.clamp((t - tL1 - 0.5) / 0.4);
    for (let r = 0; r <= 11; r++) {
      const vA = r <= n ? comb(n, r) : 0, vB = r <= N1 ? comb(N1, r) : 0, val = vA + (vB - vA) * fr;
      const x = (r <= n ? lA(r) : lA(n) + wA) + ((r <= N1 ? lB2(r) : lB2(N1) + wB) - (r <= n ? lA(r) : lA(n) + wA)) * fr, w = (r <= n ? wA : 0) + ((r <= N1 ? wB : 0) - (r <= n ? wA : 0)) * fr;
      const h = 330 * val / mx * show;
      attr(bars[r], 'x', x.toFixed(1)); attr(bars[r], 'width', Math.max(0, w).toFixed(1)); attr(bars[r], 'y', (BY0 - h).toFixed(1)); attr(bars[r], 'height', Math.max(0, h).toFixed(1));
      const vis = r <= n && fr < 0.5 || r <= N1 && fr >= 0.5;
      M.setT(bLab[r], vis ? String(fr < 0.5 ? vA : vB) : ''); attr(bLab[r], 'x', (x + w / 2).toFixed(1)); attr(bLab[r], 'y', (BY0 - h - 10).toFixed(1));
      M.setT(rLab[r], vis ? String(r) : ''); attr(rLab[r], 'x', (x + w / 2).toFixed(1));
      bLab[r].style.opacity = show; rLab[r].style.opacity = show;
    }
    M.vis(hillNote, t, wt('L2', 'hill') - 0.2, 1e9, { dy: 0 });
  }

  /* G: theorem */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('S1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i], 0.8); M.vis(el.querySelector('.why'), t, tGs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 120]), M.SOFT)(t);
    const hb = $('#gHi'); M.vis(hb, t, tGs[0] - 0.1, T0('G6'), { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#gr'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#gL0'), t, tG1 + 0.6, 0.6); PUC.write($('#gL1'), t, tGs[1] + 0.3, 1.2); PUC.write($('#gL2'), t, tGs[2] + 0.4, 1.2);
    M.vis($('#gA'), t, wt('G3', 'down') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#gB'), t, wt('G3', 'up') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#gP0'), t, wt('G6', 'plus') - 0.2, 1e9, POP); M.vis($('#gP1'), t, wt('G6', 'every') - 0.1, 1e9, POP);
  }

  /* S: shortcut vs truth + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S4');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [SL.aa, SL.bb, SL.l[0], SL.l[1]].forEach((e, i) => M.vis(e, t, wt('S1', 'squared') + 0.2 + i * 0.1, 1e9, { dy: 0, fade: 0.15 }));
    [SL.ab1, SL.ab2, SL.l[2], SL.l[3]].forEach((e, i) => M.vis(e, t, wt('S2', 'rectangles') + i * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    PUC.write($('#slF'), t, wt('S1', 'just') , 0.6);
    M.vis($('#slP'), t, wt('S3', 'forgets') - 0.2, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(sideA, t, wt('S2', 'side'), 1e9, { dy: 0 }); M.vis(sideB, t, wt('S2', 'side') + 0.15, 1e9, { dy: 0 });
    const sq = [[SR.aa, SR.l[0]], [SR.bb, SR.l[1]], [SR.ab1, SR.l[2]], [SR.ab2, SR.l[3]]], tq = [wt('S2', 'squared'), wt('S2', 'squared', 1), wt('S2', 'rectangles'), wt('S2', 'rectangles') + 0.3];
    sq.forEach(([r, l], i) => { M.vis(r, t, tq[i] - 0.1, 1e9, { dy: 0, fade: 0.15 }); M.vis(l, t, tq[i], 1e9, { dy: 0 }); });
    PUC.write($('#srF'), t, T0('S3') + 0.3, 0.9);
    M.vis($('#srP'), t, wt('S3', 'middle') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tS4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tS4, tOpts: wt('S4', 'equal') - 0.1, tCount: T1('S4') + 0.05, dur: 3, tAns: T0('S5') - 0.02, tWhy: wt('S5', 'middle') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Pick') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'counts') - 0.3, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2, 3].forEach(k => { M.vis(document.querySelectorAll('#wcs .wrl')[k], t, k < 3 ? tWr[k] - 0.2 : tWt[0] - 0.2, 1e9, { dy: 8 });
      [0, 1, 2, 3, 4].forEach(r => M.vis($(`#wc${k}${r}`), t, k < 3 ? tWr[k] + r * 0.12 : tWt[r] - 0.05, 1e9, k < 3 ? { dy: 10 } : POP)); });
    M.vis($('#wP'), t, wt('W6', 'Three') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'alternate') - 0.1 });
    M.vis(tsL, t, wt('X3', 'odd') - 0.2, 1e9, { dy: 0 });
    tSg.forEach((g, i) => M.vis(g, t, wt('X3', 'odd') + i * 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
SW.forEach(([t0]) => M.sfx(t0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
