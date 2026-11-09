// PUC Maths Ep 53: Factorial notation (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: n violet, the choices left in each spot teal, the total / factorial result coral (accent)
const NC = C.violet, SC = C.teal, TC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const nc = s => `\\textcolor{${NC}}{${s}}`, sc = s => `\\textcolor{${SC}}{${s}}`, tc = s => `\\textcolor{${TC}}{${s}}`;
const why = s => `<span class="why2">&nbsp; ${s}</span>`;
const FR = ['#7A4FE0', '#2F6FEB', '#0E8F8F', '#B7791F', '#D9731A'];
const person = (p, x, y, s, col) => { const pg = mk(p, 'g', { transform: `translate(${x},${y}) scale(${s})` }), g = mk(pg, 'g', {}); mk(g, 'circle', { cx: 0, cy: -46, r: 15, fill: col }); mk(g, 'path', { d: 'M-24,0 Q-24,-28 0,-28 Q24,-28 24,0 Z', fill: col }); return { pg, g }; };
const fmtN = v => v.toLocaleString('en-US');

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02, tH3 = T0('H3');
const tC1 = T0('C1'), tL1 = T0('L1'), tD1 = T0('D1'), tZ1 = T0('Z1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['FRIENDS', '5'], ['ONE ROW', '5 spots'], ['PHOTOS', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Five'), wt('H1', 'row'), wt('H2', 'new')];

/* ---------- H: the photo row, orders shuffle ---------- */
const hs = $('#hS'), HX = s => 110 + s * 140;
mk(hs, 'line', { x1: 50, y1: 300, x2: 734, y2: 300, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const hP = FR.map((c, i) => person(hs, HX(i), 290, 1.5, c));
const ORD = [[0, 1, 2, 3, 4], [1, 0, 2, 3, 4], [1, 0, 4, 3, 2], [1, 3, 4, 0, 2], [3, 1, 4, 2, 0]];
const tOrd = [0, wt('H2', 'first'), wt('H2', 'second'), wt('H2', 'new'), wt('H3', 'every')];
const tCnt0 = wt('H4', 'takes'), tCnt1 = wt('H4', 'photos');

/* ---------- C: five spots ---------- */
const BX = i => 36 + i * 146;
$('#cB').innerHTML = [0, 1, 2, 3, 4].map(i => `<div class="box" id="cb${i}" style="left:${BX(i)}px;top:96px;width:110px;height:130px"></div><div class="bn" id="cn${i}" style="left:${BX(i) - 5}px;top:250px;color:${SC}">${5 - i}</div>`).join('');
const cs = $('#cS'); const cP = FR.map((c, i) => person(cs, BX(i) + 55, 206, 1.15, c));
const tSpot = [wt('C2', 'any'), wt('C3', 'four'), wt('C3', 'three'), wt('C3', 'two'), wt('C3', 'one')];
const CF = [1, 2, 3, 4, 5].map(k => K([5, 4, 3, 2, 1].slice(0, k).map(v => sc(v)).join(' \\times ')));
$('#cF2').innerHTML = K(`= ${tc('120')}`);
const cs2 = txt(cs, 36, 360, 'Spot 1 has 5 choices. Each next spot has one fewer.', { fill: C.ink2, 'font-weight': 600, 'font-size': 20 });

/* ---------- L: live growth ---------- */
const ls = $('#lS'), LXn = n => 160 + (n - 1) * 100, LB = 500, LYv = v => LB - Math.log10(v) * 62;
for (let k = 0; k <= 6; k++) { mk(ls, 'line', { x1: 120, y1: LB - k * 62, x2: 1110, y2: LB - k * 62, stroke: k ? '#ECEEF2' : C.ink, 'stroke-width': k ? 1.5 : 2.5 }); txt(ls, 112, LB - k * 62 + 6, fmtN(10 ** k), { 'text-anchor': 'end', 'font-size': 15, fill: C.mute, 'font-weight': 600 }); }
txt(ls, 120, 562, 'friends in the row', { 'text-anchor': 'start', fill: C.mute, 'font-size': 16, 'font-weight': 600 });
const FACT = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
const bars = []; for (let n = 1; n <= 10; n++) { const r = mk(ls, 'rect', { x: LXn(n) - 32, y: LB, width: 64, height: 0, rx: 6, fill: n === 5 ? TC : NC }); const l = txt(ls, LXn(n), LB + 26, n, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 18 }); const v = txt(ls, LXn(n), LYv(Math.max(FACT[n], 1)) - 10, fmtN(FACT[n]), { 'text-anchor': 'middle', fill: n === 5 ? TC : C.ink2, 'font-weight': 600, 'font-size': 15 }); bars.push({ n, r, v }); }
const tFive = wt('L4', 'Five'), tTen = wt('L4', 'Ten');
const tBar = n => n === 1 ? wt('L2', 'One') : n === 2 ? wt('L2', 'Two') : n === 3 ? wt('L3', 'Three') : n === 4 ? wt('L3', 'Four') : n === 5 ? tFive : n === 10 ? tTen : tFive + 0.7 + (n - 6) * (tTen - tFive - 1) / 4;
$('#lV').style.fontSize = '44px';

/* ---------- D: definition + boxes inside boxes ---------- */
$('#dT').innerHTML = `<span style="color:${NC}">n</span>! (n factorial) means the product of the first <span style="color:${NC}">n</span> natural numbers.`;
$('#d0').innerHTML = K(`${nc('n')}! = 1 \\times 2 \\times 3 \\times \\cdots \\times ${nc('n')}`);
$('#d1').innerHTML = K(`5! = 1 \\times 2 \\times 3 \\times 4 \\times 5 = ${tc('120')}`);
$('#dN').innerHTML = [5, 4, 3, 2, 1].map((k, i) => `<div class="nb" id="dn${k}" style="left:${36 + i * 46}px;top:${84 + i * 46}px;width:${712 - i * 92}px;height:${360 - i * 70}px;border-color:${mix(TC, NC, i / 4)}"><b style="color:${mix(TC, NC, i / 4)}">${k}!${k > 1 ? ` = ${k} × ${k - 1}!` : ' = 1'}</b></div>`).join('');
const tNest = k => wt('D4', 'Five') + (5 - k) * 0.35;
const D2a = K(`5! = 5 \\times 4!`), D2b = K(`${nc('n')}! = ${nc('n')} \\times (${nc('n')} - 1)!`);

/* ---------- Z: zero factorial ---------- */
const ZF0 = K(`0! = \\; ?`), ZF1 = K(`0! = ${tc('1')}`);
const ZL = [K(`3! = 3 \\times 2!`), K(`2! = 2 \\times 1!`), K(`1! = 1 \\times ${tc('0!')}`), K(`\\Rightarrow\\; ${tc('0!')} = 1`)];
$('#zL').innerHTML = ZL.map((f, i) => `<div class="mid" id="zl${i}" style="left:36px;top:${96 + i * 96}px">${f}</div>`).join('');
const tZl = [T0('Z3') + 0.3, T0('Z3') + 0.9, wt('Z3', 'One') - 0.1, wt('Z3', 'only')];

/* ---------- K: (5-3)! vs 5! - 3! ---------- */
$('#kaF').innerHTML = K(`(5 - 3)! = 2! = ${tc('2')}`); $('#kbF').innerHTML = K(`5! - 3!`); $('#kbF2').innerHTML = K(`= 120 - 6 = ${tc('114')}`);
const th1 = PUC.think($('#th1'), { q: `Is ${K('6! \\div 3!')} the same as ${K('2!')} ?`, opts: ['Yes', 'No'], right: 1, why: '6! ÷ 3! = 6 × 5 × 4 = 120, but 2! = 2. Never divide the numbers inside.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${nc('n')}! = ${nc('n')} \\times (${nc('n')} - 1)! \\qquad 0! = 1`);

/* ---------- W: NCERT Example 8 ---------- */
$('#wq').innerHTML = K(`\\dfrac{1}{8!} + \\dfrac{1}{9!} = \\dfrac{x}{10!}`);
const wsol = PUC.solution($('#wl'), [[K(`9! = 9 \\times 8!`) + '&nbsp;&nbsp; ' + K(`10! = 10 \\times 9 \\times 8!`)], ['Multiply every term by ' + K('10!')], [K(`90 + 10 = x`)], [K(`x = ${tc('100')}`)]], { label: 'WORKED EXAMPLE · NCERT EXAMPLE 8', y0: 210, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Write'), wt('W4', 'Multiply'), wt('W5', 'ninety'), wt('W6', 'hundred')];
$('#w0').innerHTML = K(`\\dfrac{10!}{8!} = 10 \\times 9 = ${tc('90')}`); $('#w1').innerHTML = K(`\\dfrac{10!}{9!} = ${tc('10')}`); $('#w2').innerHTML = K(`90 + 10 = ${tc('100')}`);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`0! = 0 \\;\\Rightarrow\\; 5! \\div 0!\\ \\text{breaks?}`), right: K(`0! = 1 \\;\\Rightarrow\\; 5! \\div 0! = 120`) });
$('#tZ').innerHTML = K(`0! = ${tc('1')}`);
const where = PUC.where($('#wa'), { on: [], type: 'Simplify a ratio of factorials, or find n from a factorial equation.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`\\dfrac{(${nc('n')} + 2)!}{${nc('n')}!} = 72`)} &nbsp; Find n.`, opts: ['5', '6', '7', '8'], right: 2, optW: 474, optY: 300 });
const sol = PUC.solution($('#so'), [[K(`(n + 2)! = (n + 2)(n + 1)\\,n!`)], [K(`(n + 2)(n + 1) = 72`)], [K(`72 = 9 \\times 8`)], [K(`n + 2 = 9 \\Rightarrow n = ${tc('7')}`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'Expand'), wt('A3', 'Cancel'), wt('A4', 'Seventy'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · factorial notation', y0: 96, dy: 76, txt: [1, 0, 0, 1, 1],
  lines: ['<b>n!</b> (n factorial) = 1 × 2 × 3 × ... × n',
    K(`5! = ${tc('120')} \\qquad 4! = 24 \\qquad 3! = 6`),
    K(`${nc('n')}! = ${nc('n')} \\times (${nc('n')} - 1)!`),
    '<b>0! = 1</b>: one way to line up nobody',
    '<b>Cancel smartly</b>: 7! ÷ 5! = 7 × 6 = 42, never 2!'] });
const YQ = ['What does 5! mean?', 'Why is 0! equal to 1?', 'Simplify 7! ÷ 5!'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 54', topic: 'Captain and vice captain? Permutations of Distinct Objects', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFive - 0.3, 1.05, 960, 560], [T0('L5') + 0.3, 1, 960, 540]]);
let cLast = -1, lLast = -1, dLast = '', zLast = '';

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tC1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('C1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const k = tOrd.reduce((a, tt, i) => t >= tt ? i : a, 0), u = k ? M.io((t - tOrd[k]) / 0.55) : 1;
    hP.forEach((p, i) => { const s0 = ORD[Math.max(0, k - 1)].indexOf(i), s1 = ORD[k].indexOf(i), x = HX(s0) + (HX(s1) - HX(s0)) * u, hop = s0 !== s1 ? -50 * Math.sin(Math.PI * u) : 0;
      attr(p.pg, 'transform', `translate(${x.toFixed(1)},${(290 + hop).toFixed(1)}) scale(1.5)`); M.vis(p.g, t, tMorph + 0.3 + i * 0.1, 1e9, { dy: -20 }); });
    M.count($('#hN'), t, tCnt0, Math.max(0.5, tCnt1 - tCnt0), 1, 120); $('#hN').style.color = t >= tCnt1 ? TC : C.ink;
    M.vis($('#hk'), t, tH3 + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.4, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Why') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tL1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('L1');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    [0, 1, 2, 3, 4].forEach(i => { M.vis($('#cb' + i), t, wt('C1', 'five') + i * 0.1, 1e9, { dy: 14 }); M.vis($('#cn' + i), t, tSpot[i] - 0.1, 1e9, POP); M.vis(cP[i].g, t, tSpot[i] + 0.1, 1e9, { dy: -40 }); });
    M.vis(cs2, t, tSpot[1] + 0.3, 1e9, { dy: 0 });
    M.vis($('#cr'), t, tSpot[0] - 0.2, out, { dx: 60, dy: 0, ...o });
    const k = tSpot.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, -1); if (k !== cLast) { cLast = k; if (k >= 0) $('#cF').innerHTML = CF[k]; }
    M.vis($('#cF'), t, tSpot[0], 1e9, { dy: 10 });
    PUC.write($('#cF2'), t, wt('C4', 'hundred') - 0.4, 0.5); M.vis($('#cP'), t, wt('C4', 'photos') - 0.1, 1e9, POP);
  }

  /* L: live growth */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#lc'), t, tL1 + 0.05, out, { dy: 30, ...o });
    let cur = 0;
    bars.forEach(b => { const tb = tBar(b.n), u = M.spring(t - tb, M.SOFT), h = Math.max(4, LB - LYv(Math.max(FACT[b.n], 1))) * Math.max(0, u); attr(b.r, 'y', (LB - h).toFixed(1)); attr(b.r, 'height', h.toFixed(1)); M.hide(b.r, t < tb); M.vis(b.v, t, tb + 0.25, 1e9, { dy: 0 }); if (t >= tb) cur = b.n; });
    if (cur !== lLast) { lLast = cur; if (cur) { $('#lN').innerHTML = `<i style="font-family:Poppins;color:${NC}">n</i> = ${cur}`; M.setT($('#lV'), `n! = ${fmtN(FACT[cur])}`); } }
    M.vis($('#lN'), t, tBar(1) - 0.1, 1e9, { dy: 10 }); M.vis($('#lV'), t, tBar(1), 1e9, { dy: 10 });
    M.vis($('#lP'), t, tBar(4), 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('Z1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#dT'), t, tD1 + 0.3, { st: 0.04, sp: M.HEAVY });
    PUC.write($('#d0'), t, wt('D2', 'One') - 0.1, 1.2); PUC.write($('#d1'), t, wt('D3', 'one') - 0.1, 1.6);
    M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o });
    [5, 4, 3, 2, 1].forEach(k => M.vis($('#dn' + k), t, tNest(k), 1e9, { dy: 0, sc: 0.92, sp: M.SOFT, fade: 0.2 }));
    const f = t >= wt('D5', 'general') - 0.1 ? D2b : D2a; if (f !== dLast) { dLast = f; $('#d2').innerHTML = f; }
    M.vis($('#d2'), t, wt('D4', 'times') - 0.1, 1e9, { dy: 10 });
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tK1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('K1');
    M.vis($('#zl'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const f = t >= wt('Z2', 'one') - 0.1 ? ZF1 : ZF0; if (f !== zLast) { zLast = f; $('#zF').innerHTML = f; }
    M.vis($('#zF'), t, wt('Z1', 'zero'), 1e9, POP);
    M.vis($('#zB'), t, wt('Z2', 'nobody') - 0.2, 1e9, { dy: 14 }); M.vis($('#zP'), t, wt('Z2', 'nothing') - 0.1, 1e9, POP);
    M.vis($('#zr'), t, T0('Z3') - 0.1, out, { dx: 60, dy: 0, ...o });
    ZL.forEach((_, i) => PUC.write($('#zl' + i), t, tZl[i], 0.6));
  }

  /* K + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#kaF'), t, wt('K1', 'Five') - 0.1, 1.4); M.vis($('#kaP'), t, wt('K1', 'Just') - 0.1, 1e9, POP);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#kbF'), t, T0('K2') + 0.2, 0.6); PUC.write($('#kbF2'), t, wt('K2', 'hundred') - 0.4, 1.4);
    M.vis($('#kbP'), t, wt('K2', 'brackets') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'equal') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Six') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'factorial') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'zero') - 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#wq'), t, T0('W2') + 0.2, 1.2); wsol(t, tW1, tWs);
    M.vis($('#wr'), t, wt('W4', 'Ten') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#w0'), t, wt('W4', 'eight') - 0.3, 0.8); PUC.write($('#w1'), t, wt('W4', 'nine') - 0.3, 0.6); PUC.write($('#w2'), t, tWs[2], 0.7);
    M.vis($('#wP'), t, tWs[3] - 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'So') - 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'one') - 0.2, tRight: tR });
    M.vis($('#tZ'), t, wt('X3', 'one') - 0.1, 1e9, POP);
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'type') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSo);
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
