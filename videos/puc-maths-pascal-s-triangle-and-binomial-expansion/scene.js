// PUC Maths Ep 58: Pascal's triangle and binomial expansion (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: a blue, b coral accent, the numbers in front (coefficients, triangle entries) violet, final terms teal
const AC = '#2F6FEB', ACB = '#E7EEFD', BC = C.ac, XC = C.violet, PC = '#0E8F8F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const av = s => `\\textcolor{${AC}}{${s}}`, bv = s => `\\textcolor{${BC}}{${s}}`, cv = s => `\\textcolor{${XC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const pw = (v, e, col) => e === 0 ? '' : e === 1 ? col(v) : col(`${v}^{${e}}`);
// (a+b)^n expansion, colour-coded
const expand = (n, sgn) => { if (n === 0) return '1'; const t = []; for (let k = 0; k <= n; k++) { const c = comb(n, k); const body = (c > 1 ? cv(c) : '') + pw('a', n - k, av) + pw('b', k, bv); t.push((k ? (sgn && k % 2 ? ' - ' : ' + ') : '') + body); } return t.join(''); };
const lhs = n => `(${av('a')} + ${bv('b')})^{${n}}`;
const place = (el, x, y) => { el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tK1 = T0('K1'), tK3 = T0('K3'), tD1 = T0('D1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE LONG WAY', '(a + b)⁵ by hand'], ['THE SHORT WAY', 'one triangle'], ['ROW 5', '1 5 10 10 5 1']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Multiply') - 0.05, wt('H1', 'page') - 0.3, T1('H1') - 0.2];

/* ---------- H ---------- */
const HL = [`${lhs(2)} = ${av('a')}^2 + ${cv(2)}${av('a')}${bv('b')} + ${bv('b')}^2`, `${lhs(3)} = (${av('a')} + ${bv('b')})(${av('a')}^2 + ${cv(2)}${av('a')}${bv('b')} + ${bv('b')}^2) = \\dots`, `${lhs(5)} = \\;?\\quad \\text{a page of working}`];
$('#hLong').innerHTML = HL.map((l, i) => `<div class="ex" id="hl${i}" style="top:${84 + i * 72}px;font-size:28px">${K(l)}</div>`).join('');
const R5 = [1, 5, 10, 10, 5, 1];
$('#hRow').innerHTML = R5.map((v, i) => `<div class="chp" id="hr${i}" style="left:${36 + i * 88}px;top:370px">${v}</div>`).join('');
const tHr = [wt('H2', 'One'), wt('H2', 'five'), wt('H2', 'ten'), wt('H2', 'ten', 1), wt('H2', 'five', 1), wt('H2', 'one', 1)];

/* ---------- P: the square + small powers ---------- */
const ps = $('#pS'), SQX = 140, SQY = 110, SA = 240, SB = 140;
const sqO = mk(ps, 'rect', { x: SQX, y: SQY, width: SA + SB, height: SA + SB, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const PIE = [[SQX, SQY, SA, SA, ACB, AC, 'a²'], [SQX + SA, SQY, SB, SA, C.ac3, XC, 'ab'], [SQX, SQY + SA, SA, SB, C.ac3, XC, 'ab'], [SQX + SA, SQY + SA, SB, SB, C.ac2, BC, 'b²']];
const pie = PIE.map(([x, y, w, h, f, col, l]) => { const g = mk(mk(ps, 'g', {}), 'g', {}); mk(g, 'rect', { x, y, width: w, height: h, fill: f, stroke: col, 'stroke-width': 2.5 }); txt(g, x + w / 2, y + h / 2 + 14, l, { 'text-anchor': 'middle', 'font-size': 40, fill: col, 'font-weight': 600, 'font-family': 'Poppins', 'font-style': 'italic' }); return g; });
const sideL = [[SQX + SA / 2, SQY - 16, 'a', AC], [SQX + SA + SB / 2, SQY - 16, 'b', BC], [SQX - 24, SQY + SA / 2 + 10, 'a', AC], [SQX - 24, SQY + SA + SB / 2 + 10, 'b', BC]].map(([x, y, s, col]) => txt(ps, x, y, s, { 'text-anchor': 'middle', 'font-size': 30, fill: col, 'font-weight': 600, 'font-family': 'Poppins', 'font-style': 'italic' }));
const PSq = txt(ps, SQX + (SA + SB) / 2, SQY + SA + SB + 50, '1 square + 2 strips + 1 square', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
const PST = [[`${lhs(0)} = ${cv(1)}`, ''], [`${lhs(1)} = ${av('a')} + ${bv('b')}`, ''], [`${lhs(2)} = ${expand(2)}`, 'numbers in front: 1, 2, 1'], [`${lhs(3)} = ${expand(3)}`, 'numbers in front: 1, 3, 3, 1']];
$('#pSt').innerHTML = `<div class="hiBox" id="pHi" style="left:20px;width:744px;height:96px"></div>` + PST.map(([f, w], i) => `<div class="st" id="ps${i}" style="top:${80 + i * 104}px"><div class="n">${i}</div><div class="sx" style="font-size:34px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tPs = [wt('P2', 'zero'), wt('P2', 'one', 1), wt('P4', 'So'), wt('P5', 'Cube')];

/* ---------- L: build the triangle ---------- */
const TX = (r, k) => 392 - r * 52 + k * 104 - 42, TY = r => 84 + r * 76;
const ls = $('#lS');
let th = '';
for (let r = 0; r <= 5; r++) { th += `<div class="lbl" id="lrl${r}" style="left:24px;top:${TY(r) + 20}px">ROW ${r}</div>`; for (let k = 0; k <= r; k++) th += `<div class="pt${k === 0 || k === r ? ' e' : ''}" id="pt${r}${k}" style="left:${TX(r, k)}px;top:${TY(r)}px">${comb(r, k)}</div>`; }
$('#lT').innerHTML = th;
const tEdge = r => r === 0 ? wt('L1', 'one') : wt('L1', 'edges') + r * 0.12;
const IT = { '21': wt('L3', 'two'), '31': wt('L3', 'three'), '32': wt('L3', 'three', 1), '41': wt('L4', 'four'), '42': wt('L4', 'six'), '43': wt('L4', 'four', 1), '51': wt('L4', 'five'), '52': wt('L4', 'ten'), '53': wt('L4', 'ten', 1), '54': wt('L4', 'five', 1) };
const tCell = (r, k) => (k === 0 || k === r) ? tEdge(r) : IT['' + r + k];
const lines = {}; for (const key in IT) { const r = +key[0], k = +key[1]; lines[key] = [k - 1, k].map(j => mk(ls, 'line', { x1: TX(r - 1, j) + 42, y1: TY(r - 1) + 60, x2: TX(r, k) + 42, y2: TY(r), stroke: BC, 'stroke-width': 2.5 })); }
const tRow = [tEdge(0), tEdge(1), IT['21'] + 0.3, IT['32'] + 0.3, IT['43'] + 0.3, IT['54'] + 0.3];
let lLast = -1;
const avA = PUC.avatar($('#sL'), { x: 976 + 36, y: 270 + 316, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Row 5 is the team counts from Ep 56!' });

/* ---------- K ---------- */
const KL = [`${lhs(4)} = ${lhs(2)}\\,${lhs(2)}`, `= (${expand(2)})(${expand(2)})`, `= ${av('a')}^4 + ${cv(2)}${av('a')}^3${bv('b')} + ${av('a')}^2${bv('b')}^2 + ${cv(2)}${av('a')}^3${bv('b')} + \\dots`, `= ${expand(4)}`];
$('#kwL').innerHTML = KL.map((l, i) => `<div class="ex" id="kl${i}" style="top:${90 + i * 84}px;font-size:28px">${K(l)}</div>`).join('');
$('#knR').innerHTML = [1, 4, 6, 4, 1].map((v, i) => `<div class="chp" id="kr${i}" style="left:${36 + i * 88}px;top:100px">${v}</div>`).join('');
$('#knE').innerHTML = K(`${lhs(4)} = ${expand(4)}`);
const th1 = PUC.think($('#th1'), { q: 'How many terms are in (a + b)⁶?', opts: ['6 terms', '7 terms'], right: 1, why: 'Always one more than the power: powers of b run 0, 1, 2, 3, 4, 5, 6.' });

/* ---------- D ---------- */
$('#dB').innerHTML = [0, 1, 2].map(i => `<div class="bk" id="db${i}" style="left:${36 + i * 254}px">${K(`(${av('a')} + ${bv('b')})`)}</div>`).join('');
const PK = [['a', 'b', 'b'], ['b', 'a', 'b'], ['b', 'b', 'a']];
$('#dP').innerHTML = PK.map((p, r) => p.map((s, i) => `<div class="pk" id="dk${r}${i}" style="left:${36 + i * 254 + 80}px;top:${214 + r * 56}px;color:${s === 'a' ? AC : BC};font-family:Poppins;font-style:italic">${s}</div>`).join('')).join('') +
  `<div class="cnt" id="dC" style="left:36px;top:396px;background:var(--x);color:#fff">b from 2 of 3 brackets: 3C2 = 3 ways</div>`;
const DS = [[`${lhs(3)} = (${av('a')} + ${bv('b')})(${av('a')} + ${bv('b')})(${av('a')} + ${bv('b')})`, 'pick a or b from each bracket'], [`${av('a')}${bv('b')}^2: \\ ${bv('b')} \\text{ from 2 of 3 brackets}`, 'which two brackets give b?'], [`{}^3C_2 = ${cv(3)} \\;\\Rightarrow\\; ${cv(3)}${av('a')}${bv('b')}^2`, 'the number in front is a count'],
  [`\\text{row } n: \\ {}^nC_0,\\ {}^nC_1,\\ \\dots,\\ {}^nC_n`, 'every entry is a choose count'], [`\\text{row 5: } ${cv('1, 5, 10, 10, 5, 1')} = {}^5C_r`, 'the team counts from Ep 56']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:96px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${i ? 34 : 28}px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'brackets'), wt('D3', 'pick'), wt('D3', 'done'), wt('D4', 'general'), wt('D6', 'row')];

/* ---------- V ---------- */
const tNv = [0, 1, 2, 3].map(i => wt('V2', 'Power', i));
let vt = ['TERM', 'POWER OF a', 'POWER OF b', 'ADD THEM'].map((l, i) => `<div class="tb" id="vtl${i}" style="top:${108 + i * 92}px;color:${[C.mute, AC, BC, C.ink][i]}">${l}</div>`).join('');
for (let k = 0; k <= 5; k++) for (let i = 0; i < 4; i++) vt += `<div class="tc" id="vc${i}${k}" style="left:${210 + k * 90}px;top:${100 + i * 92}px;color:${[XC, AC, BC, C.ink][i]}"></div>`;
$('#vT').innerHTML = vt;
let vLast = -1;
const avD = PUC.avatar($('#sV'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'a counts down, b counts up.' });
const th2 = PUC.think($('#th2'), { q: 'Add up row 4: 1 + 4 + 6 + 4 + 1 = ?', opts: ['16', '10'], right: 0, why: 'Put a = b = 1: (1 + 1)⁴ = 2⁴ = 16. Every row adds up to a power of 2.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${lhs(4)} = ${expand(4)}`);

/* ---------- W ---------- */
const xv = s => `\\textcolor{${AC}}{${s}}`, tv = s => `\\textcolor{${BC}}{${s}}`;
$('#wq').innerHTML = `Expand ${K(`(${xv('x')} + ${tv('2')})^4`)}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{row 4: } ${cv('1,\\ 4,\\ 6,\\ 4,\\ 1')}`)],
  [K(`${xv('x')}\\text{: } 4 \\to 0, \\quad ${tv('2')}\\text{: } 0 \\to 4`)],
  [K(`${cv(4)} \\cdot ${xv('x^3')} \\cdot ${tv('2')} = ${pc('8x^3')},\\ \\ ${cv(6)} \\cdot ${xv('x^2')} \\cdot ${tv('4')} = ${pc('24x^2')}`)],
  [K(`${cv(4)} \\cdot ${xv('x')} \\cdot ${tv('8')} = ${pc('32x')},\\ \\ ${tv('2^4')} = ${pc('16')}`)],
  [K(`${pc('x^4 + 8x^3 + 24x^2 + 32x + 16')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 80 });
$('#wl .lbl').style.top = '30px';
const WR = [['ROW 4', [1, 4, 6, 4, 1].map(v => cv(v)), XC], ['x PART', ['x^4', 'x^3', 'x^2', 'x', '1'].map(xv), AC], ['2 PART', ['1', '2', '4', '8', '16'].map(tv), BC], ['TERM', ['x^4', '8x^3', '24x^2', '32x', '16'].map(pc), PC]];
$('#wT').innerHTML = WR.map(([l, cs, col], i) => `<div class="tb" id="wtl${i}" style="top:${110 + i * 96}px;color:${col}">${l}</div>` + cs.map((c, k) => `<div class="tc" id="wc${i}${k}" style="left:${190 + k * 110}px;top:${100 + i * 96};width:110px">${K(c)}</div>`).join('')).join('');
document.querySelectorAll('#wT .tc').forEach((e, j) => e.style.top = (100 + Math.floor(j / 5) * 96) + 'px');
const tWr = [wt('W3', 'Row'), wt('W4', 'powers'), wt('W4', 'two')], tWt = [T0('W5'), wt('W5', 'eight'), wt('W5', 'twenty'), wt('W6', 'thirty'), wt('W6', 'sixteen')];
const tW = [wt('W3', 'Row'), wt('W4', 'powers'), wt('W5', 'eight'), wt('W6', 'thirty'), wt('W7', 'answer')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(a - b)^3 = a^3 - 3a^2b - 3ab^2 - b^3`), right: K(`(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3`) });
const ts = $('#tS');
const sg = ['a³', 'a²b', 'ab²', 'b³'].map((l, i) => { const x = 70 + i * 120; const c = mk(ts, 'circle', { cx: x, cy: 110, r: 36, fill: '#fff', stroke: C.red, 'stroke-width': 3 });
  const w = txt(ts, x, 126, i ? '−' : '+', { 'text-anchor': 'middle', 'font-size': 44, fill: C.red, 'font-weight': 600 }), r = txt(ts, x, 126, i % 2 ? '−' : '+', { 'text-anchor': 'middle', 'font-size': 44, fill: C.ok, 'font-weight': 600 });
  txt(ts, x, 184, l, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2, 'font-weight': 600 }); return { c, w, r }; });
const sgT = txt(ts, 250, 236, 'signs take turns', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Expand a sum and a difference to the same power and add: half the terms cancel' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find the value of<br>${K('(\\sqrt{2} + 1)^4 + (\\sqrt{2} - 1)^4')}`, opts: ['17', '34', '24', '40'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{row 4: } ${cv('1, 4, 6, 4, 1')}`)], [K(`\\text{odd terms cancel}`)], [K(`2\\big[(\\sqrt2)^4 + 6(\\sqrt2)^2 + 1\\big]`)], [K(`= 2(4 + 12 + 1) = ${pc('34')}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'row'), wt('A2', 'cancel'), wt('A3', 'left'), wt('A4', 'seventeen')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · Pascal\'s triangle', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['Each number is the <b>sum of the two above</b> it',
    K(`${lhs(2)} = ${expand(2)}`),
    K(`${lhs(3)} = ${expand(3)}`),
    K(`\\text{row } n: \\ {}^nC_0,\\ {}^nC_1,\\ \\dots,\\ {}^nC_n`),
    'n + 1 terms · powers add up to n · (a − b): signs take turns'] });
const YQ = ['What is the next row after 1, 4, 6, 4, 1?', `How many terms are in ${K('(a + b)^{10}')}?`, `Expand ${K('(a - b)^2')}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 59', topic: '(a + b) to the power 10 without multiplying ten times', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

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
    HL.forEach((_, i) => PUC.write($('#hl' + i), t, tMorph + 0.3 + i * 0.5, 0.6));
    M.vis($('#hTl'), t, tHr[0] - 0.3, 1e9, { dy: 8 });
    R5.forEach((_, i) => M.vis($('#hr' + i), t, tHr[i] - 0.05, 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#hP'), t, wt('H5', 'Pascal') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'triangle') - 0.2, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pp'), t, tP1 + 0.1, out, { dx: 60, dy: 0, ...o });
    PST.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.8); M.vis(el.querySelector('.why'), t, tPs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tPs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 104]), M.SOFT)(t); const hb = $('#pHi'); M.vis(hb, t, tPs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
    M.vis($('#pq'), t, T0('P3') - 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(sqO, t, wt('P3', 'Picture'), 0.8);
    sideL.forEach((e, i) => M.vis(e, t, wt('P3', 'side') + i * 0.12, 1e9, { dy: 0 }));
    [wt('P3', 'splits') + 0.3, wt('P3', 'two'), wt('P3', 'two') + 0.3, wt('P3', 'and')].forEach((tt, i) => M.vis(pie[i], t, tt, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.15 }));
    M.vis(PSq, t, wt('P4', 'numbers') - 0.1, 1e9, { dy: 0 });
  }

  /* L: triangle */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#lt'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    for (let r = 0; r <= 5; r++) { M.vis($('#lrl' + r), t, tEdge(r) - 0.1, 1e9, { dy: 0 });
      for (let k = 0; k <= r; k++) { const el = $(`#pt${r}${k}`), tc = tCell(r, k); M.vis(el, t, tc - 0.05, 1e9, { ...POP, sc: 0.5 });
        // parents glow while the child is made
        let g = 0; for (const key in IT) { const rr = +key[0], kk = +key[1]; if (rr === r + 1 && (kk === k || kk === k + 1)) { const tt = IT[key]; g = Math.max(g, M.io((t - tt + 0.55) / 0.2) * (1 - M.io((t - tt - 0.35) / 0.25))); } }
        el.style.borderColor = mix(C.soft, BC, g); el.style.background = mix(C.soft, C.ac2, g); } }
    for (const key in IT) lines[key].forEach(l => M.draw(l, t, IT[key] - 0.45, 0.35));
    M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const r = tRow.reduce((a, tt, i) => t >= tt ? i : a, 0);
    if (r !== lLast) { lLast = r; $('#lRd').innerHTML = `<div class="ex" style="top:84px;font-size:44px">${K(`\\text{row } ${r} \\;\\to\\; ${lhs(r)}`)}</div>`; $('#lEx').innerHTML = K(`= ${expand(r)}`); $('#lEx').style.fontSize = r >= 5 ? '27px' : '34px'; }
    M.vis($('#lRd'), t, tEdge(0) + 0.2, 1e9, { dy: 10 }); M.vis($('#lEx'), t, tEdge(0) + 0.4, 1e9, { dy: 10 });
    avA(t, wt('L5', 'Each'), out);
    M.vis($('#lN1'), t, wt('L2', 'Every') + 0.2, 1e9, { dx: -16, dy: 0 }); M.vis($('#lN2'), t, wt('L2', 'sum'), 1e9, { dx: -16, dy: 0 });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tD1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kw'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    KL.forEach((_, i) => PUC.write($('#kl' + i), t, wt('K1', 'Multiplying') + i * 0.9, 0.8));
    M.vis($('#kwP'), t, wt('K1', 'slip') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('K2', 'one'), wt('K2', 'four'), wt('K2', 'six'), wt('K2', 'four', 1), wt('K2', 'one', 1)].forEach((tt, i) => M.vis($('#kr' + i), t, tt - 0.05, 1e9, { ...POP, sc: 0.5 }));
    PUC.write($('#knE'), t, wt('K2', 'fill') - 0.1, 1.0); M.vis($('#knP'), t, wt('K2', 'powers'), 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Six') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'number') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2].forEach(i => M.vis($('#db' + i), t, wt('D2', 'three') + i * 0.15, 1e9, { ...POP, sc: 0.7 }));
    PK.forEach((p, r) => p.forEach((_, i) => M.vis($(`#dk${r}${i}`), t, wt('D3', 'two') + r * 0.4 + i * 0.08, 1e9, { ...POP, sc: 0.5 })));
    M.vis($('#dC'), t, wt('D3', 'done'), 1e9, POP); M.vis($('#dS'), t, wt('D5', 'next') - 0.1, 1e9, POP);
    M.vis($('#dp'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const n = 2 + tNv.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, 0);
    if (n !== vLast) { vLast = n;
      $('#vR').innerHTML = `<div class="ex" style="top:84px;font-size:52px">${K(`n = ${n}`)}</div>`; $('#vC').innerHTML = `<div class="cnt" style="left:500px;top:90px;background:var(--x);color:#fff">${n + 1} terms</div>`;
      $('#vE').innerHTML = K(`${lhs(n)} = ${expand(n)}`); $('#vE').style.fontSize = n >= 5 ? '24px' : n === 4 ? '28px' : '32px';
      for (let k = 0; k <= 5; k++) { const on = k <= n; M.setT($('#vc0' + k), on ? String(k + 1) : ''); M.setT($('#vc1' + k), on ? String(n - k) : ''); M.setT($('#vc2' + k), on ? String(k) : ''); M.setT($('#vc3' + k), on ? String(n) : ''); } }
    M.vis($('#vR'), t, tV1 + 0.4, 1e9, { dy: 10 }); M.vis($('#vC'), t, tNv[0] - 0.05, 1e9, POP); M.vis($('#vE'), t, tNv[0], 1e9, { dy: 10 });
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 4; i++) { M.vis($('#vtl' + i), t, tV1 + 0.5 + i * 0.1, 1e9, { dy: 0 }); for (let k = 0; k <= 5; k++) M.vis($(`#vc${i}${k}`), t, tNv[0] + k * 0.05, 1e9, { dy: 0 }); }
    const hs = [wt('V3', 'down'), wt('V3', 'up'), wt('V3', 'add')], hb = $('#vHi'); const hy = M.track(184, [[hs[1] - 0.1, 276], [hs[2] - 0.1, 368]], M.SOFT)(t);
    M.vis(hb, t, hs[0] - 0.1, out, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 2).toFixed(1) + 'px';
    avD(t, wt('V3', 'always') + 0.2, out);
    M.vis($('#th2'), t, tV4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'What') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Put') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Each') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Row') - 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 4; i++) { M.vis($('#wtl' + i), t, i < 3 ? tWr[i] - 0.2 : tWt[0] - 0.2, 1e9, { dy: 0 }); for (let k = 0; k < 5; k++) M.vis($(`#wc${i}${k}`), t, i < 3 ? tWr[i] + k * 0.12 : tWt[k] - 0.05, 1e9, i < 3 ? { dy: 8 } : { ...POP, sc: 0.6 }); }
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tRt = wt('X3', 'turns');
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'plus') - 0.1, tRight: tRt });
    sg.forEach((s, i) => { M.vis(s.c, t, wt('X2', 'sign') + i * 0.1, 1e9, POP); const f = M.io((t - tRt - i * 0.12) / 0.3); s.w.style.opacity = (M.clamp((t - wt('X2', 'sign') - i * 0.1) / 0.15) * (1 - f)).toFixed(3); s.r.style.opacity = f.toFixed(3); attr(s.c, 'stroke', mix(C.red, C.ok, f)); });
    M.vis(sgT, t, tRt + 0.4, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'questions') });
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
