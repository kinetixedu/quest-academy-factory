// PUC Maths Ep 57: Permutations vs combinations problems (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: n blue, r coral; ARRANGE side (nPr counts) coral accent, CHOOSE side (nCr counts) teal; friends violet
const XC = C.violet, RC = C.ac, NC = '#2F6FEB', PC = '#0E8F8F', PCB = '#DDF1F1';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const nc = s => `\\textcolor{${NC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, ac = s => `\\textcolor{${RC}}{${s}}`;
const P_ = (n = 'n', r = 'r') => `{}^{${nc(n)}}P_{${rc(r)}}`, C_ = (n = 'n', r = 'r') => `{}^{${nc(n)}}C_{${rc(r)}}`;
const place = (el, x, y) => { el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tK1 = T0('K1'), tK3 = T0('K3'), tD1 = T0('D1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['PHOTO ROW', '3 of 5 friends'], ['PICNIC', '3 of 5 friends'], ['THE COUNTS', 'not the same']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'photo') - 0.1, wt('H1', 'picnic') - 0.1, T1('H1') - 0.2];

/* ---------- H ---------- */
const TR = ['Meera', 'Sana', 'Ravi'];
$('#hV').innerHTML = TR.map((f, i) => `<div class="ps" id="hs${i}" style="left:${36 + i * 112}px;top:290px;width:100px;height:100px;border-style:solid;border-color:var(--ac)"></div><div class="tk" id="hk${i}" style="left:${44 + i * 112}px;top:298px">${f}</div>`).join('') +
  `<div class="tbag" id="hbag" style="left:408px;top:280px;width:340px;height:120px"></div>` + TR.map((f, i) => `<div class="tk" id="hb${i}" style="left:${426 + i * 104}px;top:298px">${f}</div>`).join('');

/* ---------- P: flowchart ---------- */
const pS = $('#pS'); const arY = PUC.arrow(pS, RC, 5, 18), arN = PUC.arrow(pS, PC, 5, 18);
$('#fyx').innerHTML = K(`\\text{use } ${P_()}`); $('#fnx').innerHTML = K(`\\text{use } ${C_()}`);

/* ---------- L: the sorting machine ---------- */
const PB = [
  ['A 4-digit lock code', '4', '7', 'A', 'Swap two digits: the lock stays shut', T0('L2'), wt('L2', 'Swap'), wt('L2', 'Arrange'), 'Lock code'],
  ['3 toppings on a pizza', 'corn', 'olive', 'C', 'Swap two: the same pizza', T0('L3'), wt('L3', 'Swap'), wt('L3', 'Choose'), 'Pizza toppings'],
  ['3 friends in a row for a photo', 'Ravi', 'Sana', 'A', 'Swap two: a new photo', T0('L4'), wt('L4', 'Swap'), wt('L4', 'Arrange'), 'Photo row'],
  ['A handshake', 'Ravi', 'Sana', 'C', 'Swap: the same handshake', T0('L5'), wt('L5', 'or'), wt('L5', 'Choose'), 'Handshake'],
  ['A president and a secretary', 'Kiran', 'Joel', 'A', 'Swap: the jobs change', T0('L6'), wt('L6', 'Swap'), wt('L6', 'Arrange'), 'President + secretary'],
  ['A committee of three', 'Meera', 'Joel', 'C', 'Swap two: the same committee', wt('L6', 'committee') - 0.25, wt('L6', 'Swap', 1), wt('L6', 'Choose'), 'Committee of 3']];
$('#lpc').innerHTML = PB.map(([t, a, b, v, s], i) => `<div class="pc" id="pc${i}"><div class="pn">PROBLEM ${i + 1} OF 6</div><div class="pt">${t}</div>
  <div class="ps" style="left:140px;top:130px;border-style:solid;border-color:#CBD0DA"></div><div class="ps" style="left:340px;top:130px;border-style:solid;border-color:#CBD0DA"></div>
  <div class="tk" id="pa${i}" style="left:158px;top:143px">${a}</div><div class="tk" id="pb${i}" style="left:358px;top:143px">${b}</div>
  <div class="stamp" id="st${i}" style="background:${v === 'A' ? 'var(--ac)' : 'var(--res)'}">${v === 'A' ? 'NEW: ARRANGE' : 'SAME: CHOOSE'}</div>
  <div class="ps2" id="pss${i}">${s}</div></div>`).join('');
const idx = { A: 0, C: 0 };
const BI = PB.map(p => { const k = idx[p[3]]++; return { k, v: p[3] }; });
$('#bis').innerHTML = PB.map((p, i) => `<div class="bi" id="bi${i}" style="left:${(p[3] === 'A' ? 36 : 408) + 20}px;top:${84 + 76 + BI[i].k * 64}px;color:${p[3] === 'A' ? 'var(--ac)' : 'var(--res)'}">${p[8]}</div>`).join('');

/* ---------- K ---------- */
$('#kwS').innerHTML = TR.map((f, i) => `<div class="ps" style="left:${90 + i * 220}px;top:130px;border-style:solid;border-color:var(--ac)"></div><div class="tk" id="kt${i}" style="left:${108 + i * 220}px;top:143px">${f}</div><div class="psl" style="left:${90 + i * 220}px;top:256px">${['1st', '2nd', '3rd'][i]}</div>`).join('');
$('#knS').innerHTML = `<div class="tbag" id="kbag" style="left:150px;top:120px;width:484px;height:140px"></div>` + TR.map((f, i) => `<div class="tk" id="kc${i}" style="left:${196 + i * 140}px;top:148px">${f}</div>`).join('');
$('#kwF').innerHTML = K(`${P_('5', '3')} = ${ac('60')}`); $('#knF').innerHTML = K(`${C_('5', '3')} = ${pc('10')}`);
const th1 = PUC.think($('#th1'), { q: '5 people, each pair shakes hands once: arrange, or choose?', opts: ['Arrange', 'Choose'], right: 1, why: 'A handshake has no first person: 5C2 = 10 handshakes.' });

/* ---------- D ---------- */
$('#dT').innerHTML = `<div class="tbag" style="left:36px;top:76px;width:468px;height:120px"></div>` + TR.map((f, i) => `<div class="tk" id="dk${i}" style="left:${60 + i * 150}px;top:94px">${f}</div>`).join('') +
  `<div class="cnt" id="dTm" style="left:540px;top:110px;background:var(--res);color:#fff">1 of 10 groups</div>`;
const ORD = ['M S R', 'M R S', 'S M R', 'S R M', 'R M S', 'R S M'];
$('#dO').innerHTML = ORD.map((s, i) => `<div class="om" id="do${i}" style="left:${36 + (i % 3) * 170}px;top:${246 + Math.floor(i / 3) * 56}px;color:var(--ac)">${s}</div>`).join('') +
  `<div class="cnt" id="dOc" style="left:540px;top:262px;background:var(--ac);color:#fff">3! = 6 rows</div>`;
const DS = [[`\\text{choose: } ${C_('5', '3')} = ${pc('10')}`, 'pick the three friends'], [`\\text{arrange: } 3! = 6`, 'line up the three you picked'], [`${pc('10')} \\times 6 = ${ac('60')} = ${P_('5', '3')}`, 'the photo count'],
  [`${P_()} = ${C_()} \\times ${rc('r')}!`, 'choose first, then arrange'], [`\\text{mixed: } C \\text{, then } \\times ${rc('r')}!`, 'the tool for mixed problems']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:96px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'choose'), wt('D3', 'arrange'), wt('D4', 'ten'), wt('D5', 'general'), wt('D6', 'tool')];

/* ---------- V ---------- */
const CV = [5, 10, 10], PV = [5, 20, 60], FA = [1, 2, 6];
const tR = [wt('V2', 'one'), wt('V2', 'two'), wt('V3', 'three')];
const vb = $('#vB'), GX = g => 110 + g * 220, BY0 = 470, BH = v => v / 60 * 300;
mk(vb, 'line', { x1: 60, y1: BY0, x2: 730, y2: BY0, stroke: C.ink, 'stroke-width': 3 });
mk(vb, 'rect', { x: 400, y: 70, width: 18, height: 18, rx: 4, fill: PC }); txt(vb, 426, 86, 'groups · 5Cr', { 'font-size': 18, fill: PC, 'font-weight': 600 });
mk(vb, 'rect', { x: 400, y: 100, width: 18, height: 18, rx: 4, fill: RC }); txt(vb, 426, 116, 'rows · 5Pr', { 'font-size': 18, fill: RC, 'font-weight': 600 });
const bars = [0, 1, 2].map(g => { const c = mk(vb, 'rect', { x: GX(g), y: BY0, width: 80, height: 0, rx: 8, fill: PC }), p = mk(vb, 'rect', { x: GX(g) + 92, y: BY0, width: 80, height: 0, rx: 8, fill: RC });
  const lc = txt(vb, GX(g) + 40, BY0 - BH(CV[g]) - 14, CV[g], { 'text-anchor': 'middle', 'font-size': 24, fill: PC, 'font-weight': 600 }), lp = txt(vb, GX(g) + 132, BY0 - BH(PV[g]) - 14, PV[g], { 'text-anchor': 'middle', 'font-size': 24, fill: RC, 'font-weight': 600 });
  const lr = txt(vb, GX(g) + 86, BY0 + 38, `r = ${g + 1}`, { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 }); return { c, p, lc, lp, lr }; });
$('#vR').style.cssText = 'position:absolute;left:36px;top:76px;font:600 60px/1 IBM Plex Mono;color:var(--ac)';
$('#vL').innerHTML = ['vl0', 'vl1', 'vl2'].map((id, i) => `<div class="rd" id="${id}" style="position:absolute;left:36px;top:${180 + i * 90}px;font-size:46px;white-space:nowrap"></div>`).join('');
const avD = PUC.avatar($('#sV'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Every group gets lined up r! ways.' });
let vLast = -1;
const th2 = PUC.think($('#th2'), { q: 'Is 5C3 × 3! equal to 5P3?', opts: ['Yes', 'No'], right: 0, why: '10 × 6 = 60, and 5P3 = 60 too: choose, then arrange.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${P_()} = ${C_()} \\times ${rc('r')}!`);

/* ---------- W ---------- */
$('#wq').innerHTML = `From 5 boys and 4 girls, choose 2 boys and 1 girl, and seat them on 3 chairs in a row. How many ways?`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{boys: } ${C_('5', '2')} = ${pc('10')}`)], [K(`\\text{girl: } ${C_('4', '1')} = ${pc('4')}`)], [K(`\\text{seats: } 3! = ${ac('6')}`)],
  [K(`${pc('10')} \\times ${pc('4')} \\times ${ac('6')}`)], [K(`= 240 \\text{ ways}`)]], { label: 'WORKED EXAMPLE', y0: 226, dy: 72 });
$('#wl .lbl').style.top = '30px';
const WB = [['CHOOSE 2 BOYS · ORDER DOES NOT MATTER', `${C_('5', '2')} = ${pc('10')}`, 'res'], ['CHOOSE 1 GIRL', `${C_('4', '1')} = ${pc('4')}`, 'res'], ['SEAT ALL 3 IN A ROW · ORDER MATTERS', `3! = ${ac('6')}`, 'ac']];
$('#wB').innerHTML = WB.map(([l, f, c], i) => `<div class="wb" id="wb${i}" style="top:${84 + i * 126}px;border-color:var(--${c});background:${c === 'ac' ? 'var(--ac3)' : '#EEF8F8'}"><div class="kl" style="color:var(--${c})">${l}</div><div class="fx">${K(f)}</div></div>`).join('');
$('#wTot').innerHTML = K(`${pc('10')} \\times ${pc('4')} \\times ${ac('6')} = 240`);
const tW = [wt('W3', 'boys'), wt('W4', 'girl'), wt('W5', 'seat'), wt('W6', 'Multiply'), wt('W7', 'two')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${C_('5', '2')} \\times ${C_('4', '1')} = 40`), right: K(`${C_('5', '2')} \\times ${C_('4', '1')} \\times 3! = 240`) + '&nbsp; chairs have an order' });
const ts = $('#tS');
const chs = ['B', 'B', 'G'].map((s, i) => { const g = mk(mk(ts, 'g', {}), 'g', {}); mk(g, 'rect', { x: 40 + i * 140, y: 60, width: 110, height: 90, rx: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); txt(g, 95 + i * 140, 118, s, { 'text-anchor': 'middle', 'font-size': 36, fill: s === 'G' ? XC : C.ink, 'font-weight': 600, 'font-family': 'Poppins' }); return g; });
const tSeat = txt(ts, 235, 210, '× 3! = 6 seatings', { 'text-anchor': 'middle', 'font-size': 28, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Word problems that mix choosing and arranging, like words from chosen letters' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `1st, 2nd and 3rd prizes among 7 students.<br>Meera must win one. How many ways?`, opts: ['15', '120', '90', '210'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{prizes differ: order matters}`)], [K(`\\text{no rule: } {}^7P_3 = 210`)], [K(`\\text{Meera wins none: } {}^6P_3 = 120`)], [K(`210 - 120 = 90`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'prizes'), wt('A2', 'seven'), wt('A3', 'remove'), wt('A4', 'minus')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · arrange or choose', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['Swap two. Something new: <b>arrange</b>. Nothing new: <b>choose</b>',
    K(`${P_()} = ${nc('n')}! \\div (${nc('n')}-${rc('r')})!`),
    K(`${C_()} = ${nc('n')}! \\div \\big(${rc('r')}!\\,(${nc('n')}-${rc('r')})!\\big)`),
    K(`${P_()} = ${C_()} \\times ${rc('r')}!`),
    'Mixed problems: choose with C, then arrange with r!'] });
const YQ = ['What is the swap test?', 'Eight people each shake hands once. How many handshakes?', `Why is ${K('{}^{n}P_{r}')} equal to ${K('{}^{n}C_{r} \\times r!')}?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 58', topic: 'A triangle of numbers that expands (a + b) to any power', y: 764 });

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
    M.vis($('#gb0'), t, tMorph + 0.3, 1e9, { dy: 16 }); M.vis($('#gb1'), t, tMorph + 0.5, 1e9, { dy: 16 }); M.vis($('#hX6'), t, wt('H2', 'six') - 0.1, 1e9, POP);
    TR.forEach((_, i) => { M.vis($('#hs' + i), t, tMorph + 0.5 + i * 0.08, 1e9, { dy: 10 }); M.vis($('#hk' + i), t, tMorph + 0.6 + i * 0.1, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hb' + i), t, tMorph + 0.9 + i * 0.1, 1e9, { ...POP, sc: 0.5 }); });
    M.vis($('#hbag'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.9, fade: 0.2 });
    M.vis($('#hP'), t, wt('H5', 'decides') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'formula') - 0.2, 1e9, POP);
  }

  /* P: flowchart */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pf'), t, tP1 + 0.1, out, { dy: 36, ...o });
    M.vis($('#fq'), t, wt('P2', 'Pick') - 0.1, 1e9, { dx: -20, dy: 0 });
    const uy = M.io((t - wt('P3', 'yes')) / 0.5), un = M.io((t - wt('P4', 'no')) / 0.5);
    arY.set(652, 280, 652 + (812 - 652) * uy, 280 + (180 - 280) * uy); arN.set(652, 300, 652 + (812 - 652) * un, 300 + (415 - 300) * un);
    M.vis($('#fy'), t, wt('P3', 'yes') + 0.3, 1e9, { dx: 20, dy: 0 }); PUC.write($('#fyx'), t, wt('P3', 'Use') - 0.1, 0.6);
    M.vis($('#fn'), t, wt('P4', 'no') + 0.3, 1e9, { dx: 20, dy: 0 }); PUC.write($('#fnx'), t, wt('P4', 'Use') - 0.1, 0.6);
  }

  /* L: sorting machine */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#lp'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lb'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#bA'), t, tL1 + 0.5, 1e9, { dy: 14 }); M.vis($('#bC'), t, tL1 + 0.6, 1e9, { dy: 14 });
    let nA = 0, nC = 0;
    PB.forEach((p, i) => {
      const [, , , v, , t0, tS, tV] = p, tNext = i < 5 ? PB[i + 1][5] : out;
      M.vis($('#pc' + i), t, t0, tNext - 0.05, { dy: 24, outDur: 0.25, ody: -24 });
      const u = M.io((t - tS) / 0.6), a = $('#pa' + i), b = $('#pb' + i);
      place(a, 158 + 200 * u, 143 - 60 * Math.sin(Math.PI * u)); place(b, 358 - 200 * u, 143 + 40 * Math.sin(Math.PI * u));
      M.vis($('#pss' + i), t, tS + 0.3, 1e9, { dx: -12, dy: 0 }); M.vis($('#st' + i), t, tV - 0.1, 1e9, { ...POP, sc: 0.5 });
      M.vis($('#bi' + i), t, tV + 0.15, 1e9, { dx: v === 'A' ? -30 : 30, dy: 0 });
      if (t >= tV + 0.15) { if (v === 'A') nA++; else nC++; }
    });
    M.setT($('#bAc'), String(nA)); M.setT($('#bCc'), String(nC));
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tD1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kw'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    TR.forEach((_, i) => { M.vis($('#kt' + i), t, wt('K1', 'three') + i * 0.12, 1e9, { ...POP, sc: 0.5 }); M.vis($('#kc' + i), t, wt('K2', 'three') + i * 0.12, 1e9, { ...POP, sc: 0.5 }); });
    PUC.write($('#kwF'), t, wt('K1', 'Five') - 0.1, 0.7);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kbag'), t, wt('K2', 'group') - 0.1, 1e9, { dy: 0, sc: 0.9, fade: 0.2 }); PUC.write($('#knF'), t, wt('K2', 'Five') - 0.1, 0.7);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Arrange') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'handshake') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#ds'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dT'), t, wt('D2', 'choose') - 0.1, 1e9, { dy: 14 }); TR.forEach((_, i) => M.vis($('#dk' + i), t, wt('D2', 'choose') + i * 0.12, 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#dTm'), t, wt('D2', 'ten') - 0.1, 1e9, POP);
    ORD.forEach((_, i) => M.vis($('#do' + i), t, wt('D3', 'arrange') + i * 0.15, 1e9, { dx: -10, dy: 0 }));
    M.vis($('#dOc'), t, wt('D3', 'factorial'), 1e9, POP); M.vis($('#dRes'), t, wt('D4', 'Sixty') - 0.1, 1e9, POP);
    M.vis($('#dp'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const r = tR.reduce((a, tt, i) => t >= tt - 0.05 ? i + 1 : a, 1);
    if (r !== vLast) { vLast = r; M.setT($('#vR'), `r = ${r}`);
      $('#vl0').innerHTML = K(`\\text{groups: } ${C_('5', r)} = ${pc(CV[r - 1])}`); $('#vl1').innerHTML = K(`\\text{orders: } ${r}! = ${FA[r - 1]}`); $('#vl2').innerHTML = K(`\\text{rows: } ${pc(CV[r - 1])} \\times ${FA[r - 1]} = ${ac(PV[r - 1])}`); }
    M.vis($('#vR'), t, tR[0] - 0.1, 1e9, { dy: 10 }); ['vl0', 'vl1', 'vl2'].forEach((id, i) => M.vis($('#' + id), t, tR[0] + i * 0.2, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    bars.forEach((b, g) => { const s = Math.max(0, M.spring(t - tR[g], M.SOFT)), s2 = Math.max(0, M.spring(t - tR[g] - 0.5, M.SOFT));
      attr(b.c, 'y', (BY0 - BH(CV[g]) * s).toFixed(1)); attr(b.c, 'height', (BH(CV[g]) * s).toFixed(1)); attr(b.p, 'y', (BY0 - BH(PV[g]) * s2).toFixed(1)); attr(b.p, 'height', (BH(PV[g]) * s2).toFixed(1));
      M.vis(b.lc, t, tR[g] + 0.25, 1e9, { dy: 0 }); M.vis(b.lp, t, tR[g] + 0.75, 1e9, { dy: 0 }); M.vis(b.lr, t, tV1 + 0.6 + g * 0.08, 1e9, { dy: 0 }); });
    avD(t, wt('V3', 'faster') + 0.2, out);
    M.vis($('#th2'), t, tV4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'equal') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Ten') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Swap') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Nothing') - 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    [wt('W3', 'boys'), wt('W4', 'girl'), wt('W5', 'seat')].forEach((tt, i) => M.vis($('#wb' + i), t, tt - 0.1, 1e9, { dx: 20, dy: 0 }));
    PUC.write($('#wTot'), t, wt('W6', 'Multiply') - 0.1, 0.8);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tRt = wt('X3', 'Multiply');
    trap(t, { tin: tX1, tWrong: wt('X2', 'stop') - 0.1, tStrike: wt('X3', 'seat') - 0.1, tRight: tRt });
    chs.forEach((g, i) => M.vis(g, t, wt('X3', 'chairs') + i * 0.15, 1e9, { ...POP, sc: 0.6 })); M.vis(tSeat, t, tRt + 0.2, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'word') });
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
