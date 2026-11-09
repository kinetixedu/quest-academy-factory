// PUC Maths Ep 63: Arithmetic progression (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 8): place n coral (accent), term a_n violet, first term a blue, common difference d gold
const VC = C.violet, VBG = '#EDE6FC', RC = C.ac, AC = '#2F6FEB', ABG = '#E7EEFD', DC = '#B7791F', DBG = '#F6EAD3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const v = s => `\\textcolor{${VC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, dc = s => `\\textcolor{${DC}}{${s}}`;
const an = n => v(`a_{${rc(n)}}`);
const NTH = `${an('n')} = ${ac('a')} + (${rc('n')} - 1)\\,${dc('d')}`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tD1 = T0('D1'), tL1 = T0('L1'), tG1 = T0('G1'), tS1 = T0('S1'), tS3 = T0('S3'), tC1 = T0('C1'), tC2 = T0('C2'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['WEEK 1', '50 rupees'], ['EVERY WEEK', '+ 20'], ['AFTER 52 WEEKS', '?']];
$('#lists').innerHTML = LS.map(([n, val], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${[AC, DC, RC][i]}">${val}</div></div>`).join('');
const tLs = [wt('H1', 'week'), wt('H1', 'fifty'), wt('H1', 'jar')];

/* ---------- H ---------- */
const HV = [['W1', '50'], ['W2', '70'], ['W3', '90'], ['...', '...'], ['W52', '?']];
$('#hCh').innerHTML = HV.map(([w, x], i) => `<div class="chL" style="left:${36 + i * 144}px;top:110px;width:128px">${w === '...' ? '' : 'WEEK ' + w.slice(1)}</div><div class="ch" id="hc${i}" style="left:${36 + i * 144}px;top:140px;width:128px;${i === 4 ? 'background:#fff;border-color:var(--ac);color:var(--ac)' : i === 3 ? 'background:transparent' : ''}">${x}</div>`).join('') +
  [0, 1].map(i => `<div class="stp" id="hs${i}" style="left:${120 + i * 144}px;top:256px;width:72px">+20</div>`).join('');

/* ---------- D ---------- */
const DV = [50, 70, 90, 110];
$('#dCh').innerHTML = DV.map((x, i) => `<div class="chL" style="left:${36 + i * 184}px;top:110px;width:160px">WEEK ${i + 1}</div><div class="ch" id="dc${i}" style="left:${36 + i * 184}px;top:140px;width:160px;${i === 0 ? 'background:var(--aBg);color:var(--a)' : ''}">${x}</div>`).join('') +
  [0, 1, 2].map(i => `<div class="stp" id="ds${i}" style="left:${150 + i * 184}px;top:262px;width:88px">+20</div>`).join('');
$('#dk0').innerHTML = K(`${ac('a')} = 50`); $('#dk1').innerHTML = K(`${dc('d')} = 20`);
const tDc = [wt('D1', 'Fifty'), wt('D1', 'seventy'), wt('D1', 'ninety'), wt('D1', 'hundred')];

/* ---------- L: live bars ---------- */
const ls = $('#lS'), LB = 520, LX = n => 70 + (n - 1) * 84, BW2 = 60, SC = 1.5;
mk(ls, 'line', { x1: 50, y1: LB, x2: 734, y2: LB, stroke: C.ink, 'stroke-width': 3 });
const bars = [1, 2, 3, 4, 5, 6, 7, 8].map(n => { const g = mk(mk(ls, 'g', {}), 'g', {}); const base = mk(g, 'rect', { x: LX(n), y: LB - 50 * SC, width: BW2, height: 50 * SC, rx: 6, fill: AC });
  const st = []; for (let k = 0; k < n - 1; k++) st.push(mk(g, 'rect', { x: LX(n), y: LB - 50 * SC - (k + 1) * 20 * SC, width: BW2, height: 20 * SC - 3, rx: 4, fill: DC }));
  const lab = txt(g, LX(n) + BW2 / 2, LB - (50 + (n - 1) * 20) * SC - 10, String(50 + (n - 1) * 20), { 'text-anchor': 'middle', 'font-size': 18, fill: VC, 'font-weight': 600 });
  const wl = txt(ls, LX(n) + BW2 / 2, LB + 28, String(n), { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600 }); return { g, wl }; });
const topLine = mk(ls, 'line', { x1: LX(1) + BW2 / 2, y1: LB - 50 * SC - 34, x2: LX(8) + BW2 / 2, y2: LB - (50 + 140) * SC - 34, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const tNs = [wt('L1', 'Watch'), wt('L2', 'two'), wt('L2', 'three'), wt('L2', 'four')];
for (let k = 5; k <= 8; k++) tNs.push(T1('L2') + (k - 5) * 0.5);
const nAt = t => tNs.reduce((acc, tt, i) => t >= tt ? i + 1 : acc, 0);
const LR = [1, 2, 3, 4].map(n => [`WEEK ${n}`, `${ac(50)} + ${n - 1} \\times ${dc(20)}`, String(50 + (n - 1) * 20)]).concat([['WEEK n', `${ac(50)} + (${rc('n')} - 1) \\times ${dc(20)}`, '']]);
$('#lRows').innerHTML = LR.map(([k, f, x], i) => `<div class="trw" id="lw${i}" style="top:${84 + i * 80}px"><div class="k">${k}</div><div class="f">${K(f)}</div><div class="v">${x}</div></div>`).join('');
let nLast = -1;

/* ---------- G ---------- */
const GS = [[`${an(1)} = ${ac('a')}`, 'the first term: no steps yet'], [`${an(2)} = ${ac('a')} + ${dc('d')},\\ \\ ${an(3)} = ${ac('a')} + 2${dc('d')}`, 'one more d each time'], [`${an('n')}:\\ (${rc('n')} - 1) \\text{ steps of } ${dc('d')}`, 'n terms have n - 1 gaps'], [NTH, 'the general term of an A P']];
$('#gSt').innerHTML = GS.map(([f, w], i) => `<div class="st" id="gs${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#gs3 .n').style.background = 'var(--ac)'; $('#gs3 .n').innerHTML = M.icon('check', 22, '#fff', 3);
const gs = $('#gS'), PX = i => 90 + i * 150, PY = 150;
const posts = [0, 1, 2, 3, 4].map(i => { const g = mk(mk(gs, 'g', {}), 'g', {}); mk(g, 'rect', { x: PX(i) - 14, y: PY, width: 28, height: 120, rx: 6, fill: VBG, stroke: VC, 'stroke-width': 2.5 }); txt(g, PX(i), PY - 16, i === 4 ? 'Tn' : `T${i + 1}`, { 'text-anchor': 'middle', 'font-size': 20, fill: VC, 'font-weight': 600 }); return g; });
const gaps = [0, 1, 2, 3].map(i => { const g = mk(mk(gs, 'g', {}), 'g', {}); mk(g, 'line', { x1: PX(i) + 20, y1: PY + 60, x2: PX(i + 1) - 20, y2: PY + 60, stroke: DC, 'stroke-width': 4 }); mk(g, 'rect', { x: PX(i) + 45, y: PY + 76, width: 60, height: 36, rx: 8, fill: DBG }); txt(g, PX(i) + 75, PY + 101, '+d', { 'text-anchor': 'middle', 'font-size': 20, fill: DC, 'font-weight': 600 }); return g; });
const gCap = txt(gs, 392, 360, 'n posts, n - 1 gaps', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
$('#gF').innerHTML = K(NTH);
const tGs = [wt('G2', 'Step'), wt('G3', 'Step'), wt('G4', 'Step'), wt('G5', 'So')];

/* ---------- S ---------- */
const miniBars = (svg, vals, col) => vals.map((x, i) => { const g = mk(mk(svg, 'g', {}), 'g', {}); const h = x * 2.7; mk(g, 'rect', { x: 120 + i * 200, y: 420 - h, width: 120, height: h, rx: 8, fill: col }); txt(g, 180 + i * 200, 420 - h - 14, String(x), { 'text-anchor': 'middle', 'font-size': 26, fill: VC, 'font-weight': 600 }); return g; });
const sB1 = miniBars($('#slS'), [50, 70, 90], VC), sB2 = miniBars($('#srS'), [100, 90, 80], VC);
[$('#slS'), $('#srS')].forEach(s => mk(s, 'line', { x1: 60, y1: 420, x2: 724, y2: 420, stroke: C.ink, 'stroke-width': 3 }));
$('#slF').innerHTML = K(`${dc('d')} = 70 - 50 = +20`); $('#srF').innerHTML = K(`${dc('d')} = 90 - 100 = -10`);
const th1 = PUC.think($('#th1'), { q: `In 10, 7, 4, 1, is ${K(dc('d'))} equal to 3 or -3?`, opts: ['3', '-3'], right: 1, why: 'Minus three: d is a term minus the term before it. 7 - 10 = -3.' });

/* ---------- C ---------- */
const CV = [10, 7, 4, 1];
$('#cCh').innerHTML = CV.map((x, i) => `<div class="ch" id="cc${i}" style="left:${36 + i * 184}px;top:110px;width:160px">${x}</div>`).join('') + [0, 1, 2].map(i => `<div class="stp" id="cs${i}" style="left:${150 + i * 184}px;top:236px;width:88px">-3</div>`).join('');
$('#cF').innerHTML = K(`${dc('d')} = ${v('a_2')} - ${v('a_1')} = ${v('a_3')} - ${v('a_2')} = \\dots`);
const th2 = PUC.think($('#th2'), { q: 'Is 3, 6, 12, 24 an A P?', opts: ['Yes', 'No'], right: 1, why: 'No: the differences are 3, 6 and 12. They are not the same, so it is not an A P.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(NTH);

/* ---------- W ---------- */
$('#wq').innerHTML = 'After 52 weeks, how much is in the jar?';
const wsol = PUC.solution($('#wl'), [
  [K(`${ac('a')} = 50,\\ ${dc('d')} = 20,\\ ${rc('n')} = 52`)],
  [K(`${an(52)} = ${ac(50)} + 51 \\times ${dc(20)}`)],
  [K(`51 \\times ${dc(20)} = 1020`)],
  [K(`${an(52)} = 50 + 1020 = 1070`)]], { label: "AARAV'S QUESTION", y0: 176, dy: 100 });
$('#wl .lbl').style.top = '30px';
$('#wKv').innerHTML = [['a', '50', ABG, AC], ['d', '20', DBG, DC], ['n', '52', C.ac2, RC]].map(([k, x, bg, col], i) => `<div class="kv" id="wk${i}" style="left:${36 + i * 244}px;width:224px;background:${bg}"><div class="k" style="text-transform:none">${k}</div><div class="v" style="color:${col}">${x}</div></div>`).join('');
$('#wF').innerHTML = K(`${an(52)} = ${ac(50)} + (${rc(52)} - 1) \\times ${dc(20)} = 1070`);
const tW = [wt('W2', 'Step'), wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'So')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`a_{10} = 5 + 10 \\times 3 = 35`), right: K(`a_{10} = 5 + 9 \\times 3 = 32`) + '&nbsp; (9 steps)' });
const ts = $('#tS');
const tPosts = Array.from({ length: 10 }, (_, i) => { const g = mk(mk(ts, 'g', {}), 'g', {}); mk(g, 'rect', { x: 40 + i * 60, y: 100, width: 16, height: 70, rx: 4, fill: VBG, stroke: VC, 'stroke-width': 2 }); txt(g, 48 + i * 60, 90, String(i + 1), { 'text-anchor': 'middle', 'font-size': 16, fill: VC, 'font-weight': 600 }); return g; });
const tGaps = Array.from({ length: 9 }, (_, i) => mk(ts, 'line', { x1: 60 + i * 60, y1: 135, x2: 96 + i * 60, y2: 135, stroke: DC, 'stroke-width': 4 }));
const tCap = txt(ts, 320, 216, '10 TERMS · 9 STEPS OF +3', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, 'font-weight': 600, 'letter-spacing': 1 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Terms and sums of an A P: find a, d, or which term it is' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `In an A P, the 5th term is 23 and the 12th term is 51.<br>Which term of the A P is 99?`,
  opts: ['24th', '23rd', '25th', '22nd'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`7d = 51 - 23 = 28 \\Rightarrow d = 4`)], [K(`a = 23 - 4d = 7`)], [K(`7 + (n - 1)\\,4 = 99`)], [K(`n - 1 = 23 \\Rightarrow n = 24`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'From'), wt('A3', 'fifth'), wt('A4', 'Now'), wt('A4', 'twenty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · arithmetic progression', y0: 100, dy: 76, txt: [1, 0, 0, 1, 1],
  lines: ['<b>A P</b>: each term = the term before it + the same fixed number',
    K(`${dc('d')} = ${v('a_2')} - ${v('a_1')} = ${v('a_3')} - ${v('a_2')} = \\dots`),
    K(NTH),
    'Term n is <b>n - 1</b> steps from the first term',
    'A P test: subtract; every difference must be the same'] });
const YQ = ['What is the common difference of 20, 15, 10?', 'Find the 15th term of 2, 5, 8.', 'Is 1, 4, 9, 16 an A P? Why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 64', topic: 'Add 1 to 100 in seconds, like young Gauss: Sum of an A P', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L3', 'Join') - 0.2, 1.05, 960, 560], [T1('L3') + 0.2, 1, 960, 540]]);

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
    [0, 1].forEach(i => M.vis($('#hs' + i), t, wt('H2', 'twenty') + i * 0.2, 1e9, POP));
    M.vis($('#hlP'), t, wt('H4', 'fifty') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'fifty') - 0.1, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DV.forEach((_, i) => M.vis($('#dc' + i), t, tDc[i] - 0.1, 1e9, { dy: 12 }));
    [0, 1, 2].forEach(i => M.vis($('#ds' + i), t, wt('D2', 'plus') + i * 0.2, 1e9, POP));
    M.vis($('#dP'), t, wt('D2', 'step') - 0.1, 1e9, POP);
    M.vis($('#dr'), t, T0('D3') - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#dr .ghost'), t, T0('D3') + 0.6, 1e9, POP);
    M.rise($('#dR'), t, wt('D3', 'Each'), { st: 0.05, sp: M.HEAVY });
    M.vis($('#dm0'), t, wt('D4', 'first') - 0.1, 1e9, { dy: 12 }); M.vis($('#dm1'), t, wt('D4', 'common') - 0.1, 1e9, { dy: 12 });
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tG1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('G1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const n = nAt(t);
    bars.forEach((b, i) => { M.vis(b.g, t, tNs[i], 1e9, { dy: 30, sp: M.SOFT, fade: 0.15 }); M.vis(b.wl, t, tNs[i], 1e9, { dy: 0 }); });
    if (n !== nLast) { nLast = n; M.setT($('#lN'), String(Math.max(n, 1))); M.setT($('#lSt'), String(Math.max(n - 1, 0))); }
    [0, 1].forEach(i => M.vis($('#lr' + i), t, tL1 + 0.4 + i * 0.12, 1e9, { dy: 12 }));
    M.draw(topLine, t, wt('L3', 'Join'), 0.8);
    M.vis($('#lr'), t, wt('L2', 'two') - 0.3, out, { dx: 60, dy: 0, ...o });
    LR.forEach((_, i) => { const el = $('#lw' + i); M.vis(el, t, i < 4 ? Math.max(tNs[i] + 0.2, wt('L2', 'two') - 0.1) : wt('L3', 'less') - 0.1, 1e9, { dx: -14, dy: 0 }); if (i === 4) { const h = M.io((t - wt('L3', 'less')) / 0.3); el.style.background = mix(C.soft, C.ac2, h); } });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tS1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('S1');
    M.vis($('#gl'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i); M.vis(el.querySelector('.n'), t, tGs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tGs[i] + 0.2, 0.9); M.vis(el.querySelector('.why'), t, tGs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 118]), M.SOFT)(t);
    const hb = $('#gHi'); M.vis(hb, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#gr'), t, tG1 + 0.3, out, { dx: 60, dy: 0, ...o });
    posts.forEach((p, i) => M.vis(p, t, tGs[0] + i * 0.25, 1e9, { dy: 14 }));
    gaps.forEach((g, i) => M.vis(g, t, tGs[1] + i * 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    M.vis(gCap, t, wt('G4', 'minus') - 0.1, 1e9, { dy: 0 });
    PUC.write($('#gF'), t, wt('G5', 'equals') - 0.1, 1.2);
  }

  /* S + think */
  const sOn = t >= tS1 - 0.1 && t < tC1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    sB1.forEach((g, i) => M.vis(g, t, wt('S1', 'Fifty') + i * 0.35, 1e9, { dy: 20, fade: 0.15 })); PUC.write($('#slF'), t, wt('S1', 'climb'), 0.8);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    sB2.forEach((g, i) => M.vis(g, t, wt('S2', 'hundred', 1) + i * 0.35, 1e9, { dy: 20, fade: 0.15 })); PUC.write($('#srF'), t, wt('S2', 'minus') - 0.2, 0.8);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'three') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'always') });
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C2');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    CV.forEach((_, i) => M.vis($('#cc' + i), t, tC1 + 0.4 + i * 0.1, 1e9, { dy: 12 }));
    [0, 1, 2].forEach(i => M.vis($('#cs' + i), t, wt('C1', 'Subtract') + i * 0.3, 1e9, POP));
    M.vis($('#cP'), t, wt('C1', 'same') - 0.1, 1e9, POP);
    M.vis($('#cr'), t, wt('C1', 'If') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.rise($('#cR'), t, wt('C1', 'If'), { st: 0.05, sp: M.HEAVY }); PUC.write($('#cF'), t, wt('C1', 'same') + 0.2, 1.0);
    M.vis($('#th2'), t, tC2 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tC2, tOpts: wt('C2', 'A') - 0.1, tCount: T1('C2') + 0.05, dur: 3, tAns: T0('C3') - 0.02, tWhy: wt('C3', 'differences') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'add') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'nth'), 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, tW1 + 0.3, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2].forEach(i => M.vis($('#wk' + i), t, wt('W2', ['a', 'd', 'n'][i] === 'a' ? 'a' : ['a', 'd', 'n'][i]) + 0.1, 1e9, POP));
    PUC.write($('#wF'), t, wt('W3', 'equals'), 1.2);
    M.vis($('#wP'), t, wt('W5', 'seventy') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    tPosts.forEach((g, i) => M.vis(g, t, wt('X3', 'tenth') + i * 0.06, 1e9, { dy: 10 }));
    tGaps.forEach((g, i) => M.vis(g, t, wt('X3', 'nine') + i * 0.08, 1e9, { dy: 0 })); M.vis(tCap, t, wt('X3', 'nine') + 0.6, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'terms') });
    M.vis($('#wa .ghost'), t, wt('J1', 'current') - 0.1, 1e9, POP);
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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
