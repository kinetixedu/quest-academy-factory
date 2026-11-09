// PUC Maths Ep 60: General term of a binomial expansion (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 7): a blue, b gold, nCr violet, r and the term pointer coral (accent)
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
const GT = `T_{${rc('r+1')}} = ${nC('n', rc('r'))}\\, ${a(`a^{n-${rc('r')}}`)}\\, ${b(`b^{${rc('r')}}`)}`;
document.head.insertAdjacentHTML('beforeend', '<style>#sl .lbl,#sr .lbl,#kr .lbl,#kl .lbl{text-transform:none}</style>');

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tE1 = T0('E1'), tL1 = T0('L1'), tG1 = T0('G1'), tS1 = T0('S1'), tS4 = T0('S4'), tT = T0('T1');
const tK1 = T0('K1'), tK6 = T0('K6'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE EXPANSION', K('(x + 2)^{9}')], ['HOW MANY TERMS', '10'], ['WANTED', 'only the 7th']];
$('#lists').innerHTML = LS.map(([n, val], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${val}</div></div>`).join('');
const tLs = [wt('H1', 'Expand'), wt('H1', 'ten') - 0.1, T1('H1') - 0.3];

/* ---------- H ---------- */
$('#hb').innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="tb" id="tb${i}" style="left:${36 + (i % 5) * 144}px;top:${110 + Math.floor(i / 5) * 132}px">T${i + 1}</div>`).join('');

/* ---------- D: lockers ---------- */
const ds = $('#dS'), LX = i => 52 + i * 100, LY = 110;
const lockers = Array.from({ length: 7 }, (_, i) => {
  const g = mk(mk(ds, 'g', { transform: `translate(${LX(i)},${LY})` }), 'g', {});
  const body = mk(g, 'rect', { x: 0, y: 0, width: 84, height: 250, rx: 10, fill: C.soft, stroke: C.ink2, 'stroke-width': 2.5 });
  txt(g, 42, 40, String(i + 1), { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 });
  const coins = []; for (let k = 0; k < i; k++) coins.push(mk(g, 'circle', { cx: 24 + (k % 2) * 36, cy: 214 - Math.floor(k / 2) * 40, r: 15, fill: BC, stroke: '#8A5A12', 'stroke-width': 2 }));
  const cnt = txt(g, 42, 300, `${i} coin${i === 1 ? '' : 's'}`, { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 });
  return { g, body, coins, cnt };
});
const dNote = txt(ds, 392, 470, 'each locker: one coin less than its number', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
$('#dR2').innerHTML = K(`\\text{locker } 7 \\;\\Rightarrow\\; 7 - 1 = ${b('6')} \\text{ coins}`);
const tLk = i => i === 0 ? wt('D1', 'one') : i === 1 ? wt('D1', 'two') : i === 2 ? wt('D1', 'three') : i < 6 ? wt('D2', 'See') + (i - 3) * 0.25 : wt('D3', 'seven');

/* ---------- E: terms ---------- */
const ER = [['T1', `${a('a^{n}')}\\,${b('b^{0}')}`, 'b TO THE 0'], ['T2', `${a('a^{n-1}')}\\,${b('b^{1}')}`, 'b TO THE 1'], ['T3', `${a('a^{n-2}')}\\,${b('b^{2}')}`, 'b TO THE 2'], ['...', '\\dots', ''], [`T<sub>r+1</sub>`, `${a(`a^{n-${rc('r')}}`)}\\,${b(`b^{${rc('r')}}`)}`, 'b TO THE r']];
$('#eR').innerHTML = ER.map(([k, f, w], i) => `<div class="trw" id="er${i}" style="top:${84 + i * 92}px"><div class="k">${k}</div><div class="v">${K(f)}</div><div class="w" style="text-transform:none">${w}</div></div>`).join('');
$('#er3').style.background = 'transparent';
$('#eF').innerHTML = K(`T_{${rc('r+1')}} \\;\\longleftrightarrow\\; ${b(`b^{${rc('r')}}`)}`);
const tEr = [wt('E2', 'Term'), wt('E2', 'Term', 1), wt('E2', 'Term', 2), wt('E3', 'place') - 0.4, wt('E3', 'place')];

/* ---------- L: live walk over (a+b)^10 ---------- */
$('#lts').innerHTML = Array.from({ length: 11 }, (_, r) => `<div class="lt" id="lt${r}" style="left:${36 + r * 139}px"><div class="tn">T${r + 1}</div><div class="f">${K(`${a(`a^{${10 - r}}`)}${b(`b^{${r}}`)}`)}</div><div class="rn">r=${r}</div></div>`).join('');
const tW0 = wt('L2', 'walks'), tW1e = wt('L3', 'seven');
const walk = t => M.clamp((t - tW0) / (tW1e - tW0)) * 6;
let lLast = -1;

/* ---------- G: build ---------- */
const GS = [[`T_{${rc('r+1')}}:\\ ${b(`b^{${rc('r')}}`)}`, 'the locker rule'], [`${a(`a^{n-${rc('r')}}`)}`, 'the powers add up to n'], [`${nC('n', rc('r'))}`, 'ways to choose the r brackets for b'], [GT, 'put the three pieces together']];
$('#gSt').innerHTML = GS.map(([f, w], i) => `<div class="st" id="gs${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#gs3 .n').style.background = 'var(--ac)'; $('#gs3 .n').style.color = '#fff'; $('#gs3 .n').innerHTML = M.icon('check', 22, '#fff', 3);
$('#gF').innerHTML = K(GT);
const GA = [[rc('r+1'), 'the place of the term', 36, 280], [nC('n', 'r'), 'the ways to choose', 400, 280], [a('a^{n-r}'), 'the rest are a', 36, 352], [b('b^{r}'), 'r of them are b', 400, 352]];
$('#gAn').innerHTML = GA.map(([f, w, x, y], i) => `<div class="an" id="ga${i}" style="left:${x}px;top:${y}px">${K(f)}<span style="color:var(--ink2)">${w}</span></div>`).join('');
const tGs = [wt('G2', 'Step'), wt('G3', 'Step'), wt('G4', 'Step'), wt('G5', 'Put')];

/* ---------- S: side by side ---------- */
const miniRow = (id, wrong) => Array.from({ length: 7 }, (_, i) => `<div class="mt" id="${id}${i}" style="left:${36 + i * 100}px">${K(b(`b^{${i}}`))}</div><div class="mtl" style="left:${36 + i * 100}px">T${i + 1}</div>`).join('');
$('#slM').innerHTML = miniRow('slm'); $('#srM').innerHTML = miniRow('srm');
$('#slF').innerHTML = K(`T_{7}:\\ ${rc('r')} = 7 \\Rightarrow ${b('b^{7}')}`); $('#srF').innerHTML = K(`T_{7} = T_{${rc('6')}+1}:\\ ${rc('r')} = 6 \\Rightarrow ${b('b^{6}')}`);
const th1 = PUC.think($('#th1'), { q: `In ${K('(a + b)^{10}')}, the 7th term has b to the power...`, opts: ['6', '7'], right: 0, why: 'Six: the first term has b to the 0, so the 7th term has b to the 6.' });

/* ---------- K: hunt the power ---------- */
const ksol = PUC.solution($('#kl'), [
  [K(`T_{${rc('r+1')}} = ${nC(6, rc('r'))}\\, x^{6-${rc('r')}} \\left(\\tfrac{1}{x}\\right)^{${rc('r')}}`)],
  [K(`= ${nC(6, rc('r'))}\\, x^{6-2${rc('r')}}`)],
  [K(`6 - 2${rc('r')} = 0 \\Rightarrow ${rc('r')} = 3`)],
  [K(`T_{4} = ${nC(6, 3)} = 20`)]], { label: 'CONSTANT TERM OF (x + 1/x)⁶', y0: 100, dy: 104 });
const ks = $('#kS'), KX = p => 392 + p * 50, KY = 330;
mk(ks, 'line', { x1: 60, y1: KY, x2: 724, y2: KY, stroke: C.ink, 'stroke-width': 3 });
for (let p = -6; p <= 6; p++) { mk(ks, 'line', { x1: KX(p), y1: KY - (p % 2 ? 6 : 12), x2: KX(p), y2: KY + (p % 2 ? 6 : 12), stroke: C.ink, 'stroke-width': 2 }); if (p % 2 === 0) txt(ks, KX(p), KY + 42, p, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const kAx = txt(ks, 392, KY + 84, 'power of x in the term', { 'text-anchor': 'middle', 'font-size': 18 });
const kZero = mk(ks, 'rect', { x: KX(0) - 34, y: KY - 50, width: 68, height: 100, rx: 12, fill: 'none', stroke: C.ok, 'stroke-width': 3, 'stroke-dasharray': '7 5' });
const kZL = txt(ks, KX(0), KY - 64, 'no x', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const kTrail = [0, 1, 2, 3, 4, 5, 6].map(r => mk(ks, 'circle', { cx: KX(6 - 2 * r), cy: KY, r: 9, fill: VBG, stroke: VC, 'stroke-width': 2 }));
const kDotP = mk(ks, 'g', {}), kDot = mk(kDotP, 'g', {}); mk(kDot, 'circle', { cx: 0, cy: KY, r: 16, fill: RC });
const kOdd = txt(ks, 392, 500, 'every power is even: 6, 4, 2, 0, -2, -4, -6', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const tK0 = wt('K3', 'gives'), tK0e = T1('K3'), tK3 = wt('K4', 'zero');
const kTr = t => { const u = M.clamp((t - tK0) / (tK0e - tK0)) * 6; const back = M.io((t - tK3) / 0.8); return u + (3 - u) * back; };
const th2 = PUC.think($('#th2'), { q: `Does ${K('\\left(x + \\tfrac{1}{x}\\right)^{6}')} have a term in ${K('x^{1}')}?`, opts: ['Yes', 'No'], right: 1, why: 'No: the power of x is 6 - 2r. It is always even, so it can never be 1.' });
let kLast = -1;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(GT);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the 7th term of ${K(`(${a('x')} + ${b('2')})^{9}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`T_{7} = T_{${rc('6')}+1} \\Rightarrow ${rc('r')} = 6`)],
  [K(`T_{7} = ${nC(9, 6)}\\, ${a('x^{3}')}\\, ${b('2^{6}')}`)],
  [K(`${nC(9, 6)} = 84,\\quad ${b('2^{6}')} = 64`)],
  [K(`T_{7} = 84 \\times 64\\, ${a('x^{3}')} = 5376\\, ${a('x^{3}')}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
const PC = [[nC(9, 6) + ' = 84', 'WAYS', VBG, 36, 220], [a('x^{3}'), 'x PART', ABG, 290, 160], [b('2^{6}') + ' = 64', 'NUMBER PART', BBG, 484, 264]];
$('#wPc').innerHTML = PC.map(([f, k, bg, x, w], i) => `<div class="pc" id="pc${i}" style="left:${x}px;width:${w}px;background:${bg}"><div class="k" style="text-transform:none">${k}</div><div class="v">${K(f)}</div></div>`).join('') + `<div class="ml" id="ml0" style="left:262px">×</div><div class="ml" id="ml1" style="left:456px">×</div>`;
$('#wRes').innerHTML = K(`T_{7} = 5376\\, ${a('x^{3}')}`);
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'Eighty')];
const tPc = [wt('W5', 'Nine'), wt('W4', 'x'), wt('W5', 'sixty')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`T_{4} = {}^{6}C_{3}\\, x^{3}\\, (2)^{3} = +160\\,x^{3}`), right: K(`T_{4} = {}^{6}C_{3}\\, x^{3}\\, (-2)^{3} = -160\\,x^{3}`) });
const ts = $('#tS');
const tB = mk(mk(ts, 'g', { transform: 'translate(230,140)' }), 'g', {}); mk(tB, 'rect', { x: -170, y: -50, width: 340, height: 100, rx: 16, fill: BBG, stroke: BC, 'stroke-width': 3 }); txt(tB, 0, 14, 'b = -2', { 'text-anchor': 'middle', 'font-size': 40, fill: BC, 'font-weight': 600 });
const tBl = txt(ts, 230, 230, 'the minus sign belongs to b', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find the constant term (the term with no x) using the general term' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Find the term independent of x in<br>${K('\\left(2x^{2} - \\dfrac{1}{x}\\right)^{6}')}`,
  opts: ['60', '-60', '240', '15'], right: 0, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`T_{r+1} = {}^{6}C_{r}(2x^2)^{6-r}\\left(-\\tfrac{1}{x}\\right)^{r}`)], [K(`x^{12-2r-r} = x^{12-3r}`)], [K(`12 - 3r = 0 \\Rightarrow r = 4`)], [K(`15 \\times 4 \\times (+1) = 60`)]], { y0: 100, dy: 100 });
$('#so').querySelector('.sol .sx').style.fontSize = '24px';
const tSo = [wt('A2', 'general'), wt('A3', 'power'), wt('A3', 'zero'), wt('A4', 'Six')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · the general term', y0: 100, dy: 76, txt: [0, 1, 1, 1, 0],
  lines: [K(GT),
    'Term number = <b>r + 1</b>: subtract one to get r',
    'b keeps its sign: in (x - 2), b = -2',
    'Constant term: set the power of x to 0',
    K(`(x + 2)^{9}:\\ T_{7} = 5376\\, x^{3}`)] });
const YQ = ['For the tenth term, what is r?', 'Write the general term of (a + b)ⁿ.', 'Find the constant term of (x + 1/x)⁴.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 61', topic: '1.01¹⁰⁰⁰ or 10000: which is bigger? Middle Term and Applications', y: 764 });
document.querySelector('#sF .next .nt').style.fontSize = '30px';

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L3', 'seven') - 0.2, 1.05, 960, 560], [T1('L3') + 0.2, 1, 960, 540]]);

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
    for (let i = 0; i < 10; i++) { const el = $('#tb' + i); M.vis(el, t, tMorph + 0.3 + i * 0.07, 1e9, { dy: 12 });
      const on = i === 6 ? M.io((t - wt('H2', 'seventh') + 0.1) / 0.3) : 0, dim = i !== 6 ? M.io((t - wt('H2', 'seventh')) / 0.3) : 0;
      el.style.background = mix(C.soft, C.ac2, on); el.style.borderColor = mix(C.soft, RC, on); el.style.color = i === 6 ? mix(C.ink2, RC, on) : mix(C.ink2, C.dim, dim); }
    M.vis($('#hlP'), t, wt('H3', 'ten') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'jump') - 0.1, 1e9, POP);
  }

  /* D: lockers */
  const dOn = t >= tD1 - 0.1 && t < tE1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('E1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    lockers.forEach((L, i) => { M.vis(L.g, t, wt('D1', 'lockers') - 0.1 + i * 0.08, 1e9, { dy: 16 });
      const op = M.io((t - tLk(i)) / 0.3), skip = i >= 3 && i < 6;
      attr(L.body, 'fill', skip ? C.soft : mix(C.soft, '#FFFFFF', op)); attr(L.body, 'stroke', i === 6 ? mix(C.ink2, RC, op) : C.ink2); attr(L.body, 'stroke-width', i === 6 && op > 0.5 ? 4 : 2.5);
      L.coins.forEach((c, k) => M.vis(c, t, skip ? 1e9 : tLk(i) + 0.1 + k * 0.06, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
      M.vis(L.cnt, t, skip ? 1e9 : tLk(i) + 0.2, 1e9, { dy: 0 });
      L.g.style.opacity = skip ? (1 - 0.55 * M.io((t - wt('D3', 'first')) / 0.3)).toFixed(3) : ''; });
    M.vis(dNote, t, wt('D2', 'less') - 0.1, 1e9, { dy: 0 });
    M.vis($('#dr'), t, wt('D2', 'pattern') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.rise($('#dR'), t, wt('D2', 'Each'), { st: 0.05, sp: M.HEAVY });
    PUC.write($('#dR2'), t, wt('D3', 'seven') - 0.1, 0.9);
    M.vis($('#dP'), t, wt('D3', 'need') - 0.1, 1e9, POP);
  }

  /* E: terms */
  const eOn = t >= tE1 - 0.1 && t < tL1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('L1');
    M.vis($('#el'), t, tE1 + 0.1, out, { dx: -60, dy: 0, ...o });
    ER.forEach((_, i) => M.vis($('#er' + i), t, tEr[i] - 0.1, 1e9, { dy: 14 }));
    const hl = M.io((t - wt('E3', 'place') + 0.1) / 0.3); $('#er4').style.background = mix(C.soft, C.ac2, hl);
    M.vis($('#er'), t, wt('E3', 'So') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.rise($('#eB'), t, wt('E3', 'Term'), { st: 0.05, sp: M.HEAVY });
    PUC.write($('#eF'), t, wt('E3', 'place'), 0.8);
    M.vis($('#eP'), t, wt('E3', 'always') + 0.3, 1e9, POP);
  }

  /* L: live walk */
  const lOn = t >= tL1 - 0.1 && t < tG1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('G1');
    M.vis($('#lw'), t, tL1 + 0.1, out, { dy: 36, ...o });
    for (let r = 0; r <= 10; r++) M.vis($('#lt' + r), t, wt('L1', 'eleven') + r * 0.07, 1e9, { dy: 12 });
    const wv = walk(t), ri = Math.round(wv), x = 36 + wv * 139 + 64 - 16;
    const pt = $('#lPt'); pt.style.left = x.toFixed(1) + 'px'; M.vis(pt, t, wt('L2', 'pointer') - 0.1, 1e9, { dy: -10 });
    for (let r = 0; r <= 10; r++) { const el = $('#lt' + r), on = Math.max(0, 1 - Math.abs(wv - r) * 1.6) * M.clamp((t - wt('L2', 'pointer') + 0.1) / 0.3), seen = r < wv ? 0.35 : 0;
      el.style.background = mix(mix(C.soft, '#FFFFFF', seen), C.ac2, on); el.style.borderColor = mix(C.soft, RC, on); }
    if (ri !== lLast) { lLast = ri; M.setT($('#lN'), String(ri + 1)); M.setT($('#lR'), String(ri)); $('#lF').innerHTML = K(`T_{${ri + 1}} = ${nC(10, rc(ri))}\\, ${a(`a^{${10 - ri}}`)}\\, ${b(`b^{${rc(ri)}}`)}`); }
    [0, 1, 2].forEach(i => M.vis($('#lr' + i), t, wt('L2', 'pointer') + 0.2 + i * 0.12, 1e9, { dy: 14 }));
    const hl = M.io((t - wt('L3', 'seven') + 0.1) / 0.3); [0, 1].forEach(i => $('#lr' + i).style.background = mix(C.soft, C.ac2, hl));
  }

  /* G: build */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('S1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i] + 0.2, 0.8); M.vis(el.querySelector('.why'), t, tGs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 118]), M.SOFT)(t);
    const hb = $('#gHi'); M.vis(hb, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#gr'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr .ghost'), t, tG1 + 0.8, 1e9, POP);
    PUC.write($('#gF'), t, wt('G5', 'equals') - 0.1, 1.4);
    const tA = [wt('G5', 'plus'), wt('G5', 'C'), wt('G5', 'minus'), wt('G5', 'b')];
    GA.forEach((_, i) => M.vis($('#ga' + i), t, tA[i], 1e9, POP));
  }

  /* S: side by side + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S4');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#sr'), t, tS1 + 0.3, out, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 7; i++) { M.vis($('#slm' + i), t, tS1 + 0.5 + i * 0.06, 1e9, { dy: 10 }); M.vis($('#srm' + i), t, tS1 + 0.7 + i * 0.06, 1e9, { dy: 10 });
      const w7 = i === 6 ? M.io((t - wt('S2', 'seven') + 0.1) / 0.3) : 0; $('#slm' + i).style.background = mix(C.soft, C.redBg, w7); $('#slm' + i).style.boxShadow = w7 > 0.01 ? `inset 0 0 0 3px ${C.red}` : '';
      $('#srm' + i).style.background = mix(C.soft, C.ac2, w7); $('#srm' + i).style.boxShadow = w7 > 0.01 ? `inset 0 0 0 3px ${RC}` : ''; }
    PUC.write($('#slF'), t, wt('S2', 'seventh') - 0.1, 0.8); PUC.write($('#srF'), t, wt('S2', 'six') - 0.3, 0.9);
    M.vis($('#slP'), t, wt('S2', 'not') - 0.1, 1e9, POP); M.vis($('#srP'), t, wt('S3', 'subtract') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tS4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tS4, tOpts: wt('S4', 'six') - 0.1, tCount: T1('S4') + 0.05, dur: 3, tAns: T0('S5') - 0.02, tWhy: wt('S5', 'first') });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'term') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'is') , 1.2);
  }

  /* K: hunt + think */
  const kOn = t >= tK1 - 0.1 && t < tW1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K6');
    M.vis($('#kl'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o });
    ksol(t, tK1 + 0.3, [wt('K2', 'Take'), wt('K3', 'gives'), wt('K4', 'Six'), wt('K5', 'fourth')]);
    M.vis($('#kr'), t, wt('K3', 'In') - 0.1, out, { dx: 60, dy: 0, ...o });
    const kv = kTr(t), r = Math.round(kv);
    if (r !== kLast) { kLast = r; M.setT($('#kV'), String(r)); M.setT($('#kPw'), `power of x: ${6 - 2 * r}`); }
    M.vis($('#kRd'), t, wt('K3', 'In') + 0.2, 1e9, { dy: 12 }); M.vis($('#kPw'), t, wt('K3', 'In') + 0.4, 1e9, POP);
    attr(kDotP, 'transform', `translate(${KX(6 - 2 * kv).toFixed(1)},0)`); M.vis(kDot, t, wt('K3', 'In') + 0.5, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    kTrail.forEach((c, i) => M.vis(c, t, i === 0 ? wt('K3', 'In') + 0.5 : tK0 + i / 6 * (tK0e - tK0), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(kAx, t, wt('K3', 'In') + 0.3, 1e9, { dy: 0 });
    M.vis(kZero, t, tK3 - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(kZL, t, tK3, 1e9, { dy: 0 });
    M.vis(kOdd, t, wt('K5', 'twenty') + 0.4, 1e9, { dy: 0 });
    M.vis($('#th2'), t, tK6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK6, tOpts: wt('K6', 'term') - 0.1, tCount: T1('K6') + 0.05, dur: 3, tAns: T0('K7') - 0.02, tWhy: wt('K7', 'power') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W3'), out, { dx: 60, dy: 0, ...o });
    PC.forEach((_, i) => M.vis($('#pc' + i), t, tPc[i] - 0.1, 1e9, POP));
    M.vis($('#ml0'), t, tPc[0], 1e9, { dy: 0 }); M.vis($('#ml1'), t, tPc[2], 1e9, { dy: 0 });
    PUC.write($('#wRes'), t, wt('W6', 'So') - 0.1, 0.9);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'sign') - 0.1, tRight: wt('X3', 'fourth') - 0.1 });
    M.vis(tB, t, wt('X3', 'minus') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(tBl, t, wt('X3', 'sign'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'asks')], tType: wt('J1', 'constant') });
    M.vis($('#wa .ghost'), t, wt('J1', 'current') - 0.1, 1e9, POP);
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
