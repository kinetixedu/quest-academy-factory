// PUC Maths Ep 56: Combinations (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (as Ep 54): n blue, r coral accent, friends violet, the count (nPr / nCr) teal, crossed out red
const XC = C.violet, RC = C.ac, NC = '#2F6FEB', PC = '#0E8F8F', PCB = '#DDF1F1';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const nc = s => `\\textcolor{${NC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, xc = s => `\\textcolor{${XC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`;
const nCr = (n = 'n', r = 'r') => pc(`{}^{${nc(n)}}C_{${rc(r)}}`), nPr = (n = 'n', r = 'r') => pc(`{}^{${nc(n)}}P_{${rc(r)}}`);
const place = (el, x, y) => { el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px'; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tK1 = T0('K1'), tK3 = T0('K3'), tD1 = T0('D1'), tV1 = T0('V1'), tV4 = T0('V4'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['FRIENDS', '5'], ['TEAM', '2 places'], ['BADGES', 'none']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Five') - 0.05, wt('H1', 'two') - 0.1, wt('H1', 'team') - 0.1];

/* ---------- H ---------- */
const SWR = [['Meera', 'Sana'], ['Sana', 'Meera']];
$('#sws').innerHTML = SWR.map(([a, b], i) => `<div class="sw" id="sw${i}" style="top:${272 + i * 100}px;width:470px"><div class="wn">PICK ${i + 1}</div>
  <div class="bd" style="left:120px;background:var(--x)">${a}</div><div class="bd" style="left:260px;background:var(--x)">${b}</div></div>`).join('') +
  `<div class="cnt" id="hSame" style="left:540px;top:338px;background:var(--res);color:#fff">SAME TEAM</div>`;

/* ---------- P ---------- */
const GL = [['SELECTION', 'we only ask who is in'], ['NOT ASKED', 'who is first'], ['ARRANGEMENT', 'asks who goes where']];
$('#gls').innerHTML = GL.map(([k, v], i) => `<div class="gls" id="gl${i}" style="top:${330 + i * 78}px"><div class="gk">${k}</div><div class="gt">${v}</div></div>`).join('');
$('#pS').innerHTML = `<div class="sel" id="ps0" style="top:84px"><div class="kl" style="color:var(--res)">SELECTION · WHO IS IN</div>
    <div class="tbag" style="left:200px;top:56px;width:312px;height:140px"></div><div class="tk" style="left:240px;top:84px">Meera</div><div class="tk" style="left:388px;top:84px">Sana</div></div>
  <div class="sel" id="ps1" style="top:330px"><div class="kl" style="color:var(--ac)">ARRANGEMENT · WHO GOES WHERE</div>
    <div class="ps" style="left:150px;top:60px;border-style:solid;border-color:var(--ac)"></div><div class="tk" style="left:168px;top:73px">Meera</div><div class="psl" style="left:150px;top:180px">1st</div>
    <div class="ps" style="left:330px;top:60px;border-style:solid;border-color:var(--ac)"></div><div class="tk" style="left:348px;top:73px">Sana</div><div class="psl" style="left:330px;top:180px">2nd</div></div>`;

/* ---------- L: the fold ---------- */
const FR = ['Meera', 'Sana', 'Ravi', 'Kiran', 'Joel'], IN = ['M', 'S', 'R', 'K', 'J'];
const GX = j => 160 + j * 112, GY = i => 150 + i * 72;
let gh = FR.map((f, j) => `<div class="gn" id="gcn${j}" style="left:${GX(j)}px;top:112px;width:104px;text-align:center">${f}</div>`).join('') +
  FR.map((f, i) => `<div class="gn" id="grn${i}" style="left:36px;top:${GY(i) + 18}px">${f}</div>`).join('');
const GOOD = []; let kk = 0;
for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { gh += `<div class="gc" id="gc${i}${j}" style="left:${GX(j)}px;top:${GY(i)}px">${i === j ? '' : ++kk}</div>`; if (i !== j) GOOD.push([i, j]); }
$('#lgG').innerHTML = gh;
const lgS = $('#lgS'); const dLn = mk(lgS, 'line', { x1: GX(0) - 10, y1: GY(0) - 8, x2: GX(4) + 114, y2: GY(4) + 72, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
const LOW = GOOD.filter(([i, j]) => i > j).sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[0] - b[0]);
const tFold = k => wt('L3', 'Fold') + 0.1 + k * 0.32;
$('#lcF').innerHTML = K(`${pc('20')} \\div 2 = ${pc('10')} \\text{ teams}`);
$('#lcX').style.color = RC;
const avA = PUC.avatar($('#sL'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Fold the grid, and the count halves.' });

/* ---------- K ---------- */
$('#kwS').innerHTML = SWR.map(([a, b], i) => `<div class="sw" id="kr${i}" style="top:${100 + i * 110}px"><div class="wn">${i + 1}</div><div class="bd" style="left:80px;background:var(--ac)"><i>1ST</i>${a}</div><div class="bd" style="left:300px;background:var(--ink)"><i>2ND</i>${b}</div></div>`).join('') +
  `<div class="pillp" id="kwP" style="left:36px;top:330px;background:var(--ac2);color:var(--ac)">Meera then Sana ≠ Sana then Meera</div>`;
$('#knS').innerHTML = `<div class="tbag" id="kbag" style="left:200px;top:110px;width:384px;height:170px"></div><div class="tk big" id="knA" style="left:236px;top:130px">Meera</div><div class="tk big" id="knB" style="left:418px;top:130px">Sana</div>
  <div class="pillp good" id="knP" style="left:36px;top:330px">One team, whichever way you say it</div>`;
const th1 = PUC.think($('#th1'), { q: 'Choosing 3 toppings for a pizza: arrangement, or selection?', opts: ['Arrangement', 'Selection'], right: 1, why: 'The pizza tastes the same, whichever topping goes on first.' });

/* ---------- D ---------- */
const TM = ['Meera', 'Sana', 'Ravi'];
$('#dT').innerHTML = `<div class="tbag" style="left:36px;top:76px;width:468px;height:120px"></div>` + TM.map((f, i) => `<div class="tk" id="dk${i}" style="left:${60 + i * 150}px;top:94px">${f}</div>`).join('') +
  `<div class="cnt" id="dTm" style="left:540px;top:110px;background:var(--res);color:#fff">1 team</div>`;
const ORD = ['M S R', 'M R S', 'S M R', 'S R M', 'R M S', 'R S M'];
$('#dO').innerHTML = ORD.map((s, i) => `<div class="om" id="do${i}" style="left:${36 + (i % 3) * 170}px;top:${236 + Math.floor(i / 3) * 52}px">${s}</div>`).join('') +
  `<div class="cnt" id="dOc" style="left:540px;top:248px;background:var(--ink);color:#fff">3! = 6 orders</div><div class="om" id="dOn" style="left:36px;top:360px;color:var(--ac)">6 orders, but only 1 team</div>`;
$('#dN').innerHTML = `${K(nc('n'))}&nbsp;= things`; $('#dR').innerHTML = `${K(rc('r'))}&nbsp;= chosen`;
const DS = [[`\\text{arrangements: } ${nPr()}`, 'first count with order'], [`\\text{each group: } ${rc('r')}! \\text{ orders}`, 'the same group, shuffled'], [`${nCr()} = ${nPr()} \\div ${rc('r')}!`, 'divide out the repeats'],
  [`${nCr()} = ${nc('n')}! \\div \\big(${rc('r')}!\\,(${nc('n')}-${rc('r')})!\\big)`, 'the factorial form'], [`${nCr('5', '2')} = 20 \\div 2 = ${pc('10')}`, 'ten teams, as the fold showed']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:96px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'arrangements'), wt('D3', 'factorial'), wt('D4', 'divide'), wt('D6', 'That'), wt('D7', 'Check')];

/* ---------- V ---------- */
const VAL = [1, 5, 10, 10, 5, 1];
const SX = i => 36 + i * 148;
$('#vS').innerHTML = FR.map((f, i) => `<div class="tk" id="vt${i}" style="left:${SX(i) + 18}px;top:200px">${f}</div>`).join('') +
  `<div class="pillp" id="vSO" style="left:36px;top:330px;background:var(--ac2);color:var(--ac)">Pick 2 to play = pick 3 to sit out</div>`;
$('#vV').innerHTML = `${K(nCr('5', 'r'))} = <b id="vVn">1</b>`;
const tR = [wt('V2', 'zero'), wt('V2', 'one', 1), wt('V2', 'two'), wt('V3', 'three'), wt('V3', 'Four'), wt('V3', 'All')];
const vb = $('#vB'), BX = i => 80 + i * 112, BY0 = 470, BH = v => v / 10 * 300;
mk(vb, 'line', { x1: 60, y1: BY0, x2: 730, y2: BY0, stroke: C.ink, 'stroke-width': 3 });
const bars = VAL.map((v, i) => { const r = mk(vb, 'rect', { x: BX(i), y: BY0, width: 76, height: 0, rx: 8, fill: PC });
  const lv = txt(vb, BX(i) + 38, BY0 - BH(v) - 16, v, { 'text-anchor': 'middle', 'font-size': 26, fill: PC, 'font-weight': 600 });
  const lr = txt(vb, BX(i) + 38, BY0 + 38, `r = ${i}`, { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 }); return { r, lv, lr, v }; });
const mir = mk(vb, 'path', { d: `M${BX(2) + 38},${BY0 - BH(10) - 50} Q${(BX(2) + BX(3)) / 2 + 38},${BY0 - BH(10) - 100} ${BX(3) + 38},${BY0 - BH(10) - 50}`, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const mirT = txt(vb, (BX(2) + BX(3)) / 2 + 38, BY0 - BH(10) - 108, 'mirror twins', { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600 });
let vLast = -1;
const avD = PUC.avatar($('#sV'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The bars go up, then come back down.' });
const th2 = PUC.think($('#th2'), { q: 'Why is 5C2 equal to 5C3?', opts: ['2 play = 3 sit out', 'Just a coincidence'], right: 0, why: 'Picking 2 to play is the same as picking 3 to sit out: nCr = nC(n - r).' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${nCr()} = \\dfrac{${nc('n')}!}{${rc('r')}!\\,(${nc('n')}-${rc('r')})!}`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Eight friends. Only three can go on a trip. In how many ways can the three be chosen?`;
const wsol = PUC.solution($('#wl'), [
  ['No first or second: a combination'],
  [K(`${nc('n')} = ${nc('8')} \\text{ friends},\\ \\ ${rc('r')} = ${rc('3')} \\text{ places}`)],
  [K(`${nCr('8', '3')} = 8! \\div (3!\\; 5!)`)],
  [K(`= (8 \\times 7 \\times 6) \\div (3 \\times 2 \\times 1)`)],
  [K(`= 336 \\div 6 = ${pc('56')} \\text{ ways}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 74 });
$('#wl .lbl').style.top = '30px';
const W8 = [0, 1, 2, 3, 4, 5, 6, 7], PICK = { 1: 0, 4: 1, 6: 2 };
$('#wT').innerHTML = `<div class="tbag" id="wBag" style="left:36px;top:300px;width:470px;height:130px;border-style:dashed;border-color:var(--ac);background:var(--ac3)"></div><div class="lbl" id="wBagL" style="left:530px;top:352px;color:var(--ac)">THE TRIP</div>` +
  W8.map(i => `<div class="tk" id="wt${i}" style="left:${36 + (i % 4) * 120}px;top:${84 + Math.floor(i / 4) * 100}px">${i + 1}</div>`).join('');
$('#wTot').innerHTML = K(`336 \\div 3! = ${pc('56')}`);
const tW = [wt('W3', 'first'), wt('W4', 'eight'), wt('W5', 'Eight'), wt('W6', 'leaves'), wt('W6', 'Three', 1)];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${nPr('8', '3')} = 336`), right: K(`${nCr('8', '3')} = 336 \\div 3! = 56`) + '&nbsp; a group is just a group' });
const ts = $('#tS');
const tOr = ORD.map((s, i) => txt(ts, 40 + (i % 3) * 120, 90 + Math.floor(i / 3) * 44, s, { 'font-size': 24, fill: C.red, 'font-weight': 600 }));
const tBr = mk(ts, 'path', { d: 'M400,64 q20,0 20,20 v40 q0,10 14,12 q-14,2 -14,12 v40 q0,20 -20,20', fill: 'none', stroke: C.ok, 'stroke-width': 3 });
const tOne = txt(ts, 448, 144, '1 group', { 'font-size': 24, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Choose a team or a committee with a condition: how many ways?' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A team of 4 from 6 boys and 4 girls,<br>with at least 2 girls. How many teams?`, opts: ['115', '120', '90', '210'], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{split by the number of girls}`)], [K(`2\\text{G}, 2\\text{B}: {}^4C_2 \\cdot {}^6C_2 = 90`)], [K(`3\\text{G}, 1\\text{B}: {}^4C_3 \\cdot {}^6C_1 = 24`)], [K(`4\\text{G}: {}^4C_4 = 1`)], [K(`90 + 24 + 1 = ${pc('115')}`)]], { y0: 100, dy: 96 });
const tSo = [T0('A2') - 0.1, wt('A2', 'Four'), wt('A3', 'Four'), wt('A4', 'Four'), wt('A5', 'Ninety')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · combinations', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: ['<b>Combination</b>: a selection where order does not matter',
    K(`${nCr()} = ${nPr()} \\div ${rc('r')}!`),
    K(`${nCr()} = ${nc('n')}! \\div \\big(${rc('r')}!\\,(${nc('n')}-${rc('r')})!\\big)`),
    K(`${nCr()} = {}^{${nc('n')}}C_{${nc('n')}-${rc('r')}}`),
    '5 friends, 2 places: 20 arrangements, 10 teams'] });
const YQ = ['Why is Meera and Sana the same team as Sana and Meera?', `Find ${K('{}^{6}C_{2}')}.`, `Why is ${K('{}^{n}C_{r}')} equal to ${K('{}^{n}P_{r} \\div r!')}?`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 57', topic: 'Arrange or choose? The one question that decides', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFold(0) - 0.3, 1.05, 960, 560], [T1('L4') + 0.2, 1, 960, 540]]);

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
    M.vis($('#gb0'), t, wt('H2', 'twenty') - 0.3, 1e9, { dy: 16 }); M.vis($('#gb1'), t, wt('H2', 'badges', 1) - 0.1, 1e9, { dy: 16 });
    M.vis($('#sw0'), t, wt('H4', 'Meera') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#sw1'), t, wt('H4', 'or') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#hSame'), t, wt('H4', 'same') - 0.1, 1e9, POP);
    M.vis($('#hP'), t, wt('H5', 'order') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'twice') - 0.2, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, T0('P2') + 0.05, { st: 0.045, sp: M.HEAVY });
    $('#dfO').style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('P2', 'order')) / 0.3));
    [wt('P3', 'Selection'), wt('P3', 'first'), wt('P4', 'arrangement')].forEach((tt, i) => M.vis($('#gl' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#mt'), t, T0('P3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#ps0'), t, wt('P3', 'only') - 0.1, 1e9, { dy: 16 }); M.vis($('#ps1'), t, wt('P4', 'where') - 0.3, 1e9, { dy: 16 });
  }

  /* L: the fold */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#lg'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lgC'), t, tL1 + 0.4, 1e9, { dy: 8 }); M.vis($('#lgV'), t, tL1 + 0.5, 1e9, { dy: 8 });
    FR.forEach((_, i) => { M.vis($('#grn' + i), t, tL1 + 0.3 + i * 0.08, 1e9, { dx: -12, dy: 0 }); M.vis($('#gcn' + i), t, tL1 + 0.4 + i * 0.08, 1e9, { dy: 10 }); });
    M.draw(dLn, t, wt('L3', 'diagonal') - 0.1, 0.7);
    const tM1 = wt('L2', 'Meera'), tM2 = wt('L2', 'Sana', 1);
    let landed = 0;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const el = $(`#gc${i}${j}`); M.vis(el, t, wt('L1', 'Twenty') - 0.1 + (i + j) * 0.04, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      if (i === j) { el.style.background = C.redBg; el.style.borderColor = C.red; PUC.setIco(el, 'x', C.red, 30, 3); continue; }
      if (i > j) {
        const k = LOW.findIndex(([a, b]) => a === i && b === j), u = M.io((t - tFold(k)) / 0.6); if (u >= 1) landed++;
        place(el, GX(j) + (GX(i) - GX(j)) * u, GY(i) + (GY(j) - GY(i)) * u); el.style.opacity = (1 - M.io((t - tFold(k) - 0.5) / 0.2)).toFixed(3); if (u >= 1 && t > tFold(k) + 0.7) M.hide(el, true);
        const hi = i === 1 && j === 0 ? M.io((t - tM2) / 0.3) : 0; el.style.background = mix(C.ac2, '#FFFFFF', hi); el.style.borderColor = mix(RC, RC, 1); el.style.borderColor = hi > 0.01 ? RC : mix(C.ac2, RC, 0.4);
        continue;
      }
      const k = LOW.findIndex(([a, b]) => a === j && b === i), f = M.io((t - tFold(k) - 0.6) / 0.25), hi = i === 0 && j === 1 ? M.io((t - tM1) / 0.3) : 0;
      el.style.background = mix(hi > 0.01 ? '#FFFFFF' : C.ac2, PCB, f); el.style.borderColor = f > 0.01 ? mix(RC, PC, f) : hi > 0.01 ? RC : mix(C.ac2, RC, 0.4); el.style.color = mix(RC, PC, f);
      M.setT(el, f > 0.5 ? `${IN[i]} · ${IN[j]}` : String(GOOD.findIndex(([a, b]) => a === i && b === j) + 1)); el.style.fontSize = f > 0.5 ? '19px' : '';
    }
    M.vis($('#lc'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.setT($('#lcN'), String(20 - landed)); M.setT($('#lcL'), landed >= 10 ? 'TEAMS' : 'ORDERED PAIRS');
    M.vis($('#lcN'), t, tL1 + 0.5, 1e9, { dy: 10 }); M.vis($('#lcL'), t, tL1 + 0.5, 1e9, { dy: 0 });
    M.vis($('#lcXl'), t, wt('L4', 'counted') - 0.1, 1e9, { dy: 8 }); M.vis($('#lcX'), t, wt('L4', 'two') - 0.1, 1e9, POP);
    PUC.write($('#lcF'), t, wt('L4', 'ten') - 0.1, 0.7);
    avA(t, T1('L4') - 0.4, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tD1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kw'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kr0'), t, wt('K1', 'Meera') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#kr1'), t, wt('K1', 'Sana', 1) - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#kwP'), t, wt('K1', 'not') - 0.1, 1e9, POP); M.vis($('#kwC'), t, wt('K1', 'two') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kbag'), t, wt('K2', 'Meera') - 0.1, 1e9, { dy: 0, sc: 0.9, fade: 0.2 }); M.vis($('#knA'), t, wt('K2', 'Meera'), 1e9, { ...POP, sc: 0.5 }); M.vis($('#knB'), t, wt('K2', 'Sana'), 1e9, { ...POP, sc: 0.5 });
    M.vis($('#knP'), t, wt('K2', 'whichever') - 0.1, 1e9, POP); M.vis($('#knC'), t, wt('K2', 'one', 1) - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Arrangement') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'pizza') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tV1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('V1');
    M.vis($('#ds'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dT'), t, wt('D2', 'Choose') - 0.1, 1e9, { dy: 14 }); TM.forEach((_, i) => M.vis($('#dk' + i), t, wt('D2', 'Choose') + i * 0.12, 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#dTm'), t, wt('D2', 'things') - 0.1, 1e9, POP);
    ORD.forEach((_, i) => M.vis($('#do' + i), t, wt('D3', 'arranged') + i * 0.15, 1e9, { dx: -10, dy: 0 }));
    M.vis($('#dOc'), t, wt('D3', 'factorial'), 1e9, POP); M.vis($('#dOn'), t, wt('D4', 'counted') - 0.1, 1e9, { dy: 8 });
    M.vis($('#dN'), t, wt('D2', 'different') - 0.1, 1e9, POP); M.vis($('#dR'), t, wt('D2', 'Choose') + 0.3, 1e9, POP); M.vis($('#dC'), t, wt('D5', 'stands') - 0.1, 1e9, POP);
    M.vis($('#dp'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 10).toFixed(1) + 'px';
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const r = tR.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, 0);
    M.vis($('#vR'), t, tV1 + 0.4, 1e9, { dy: 10 }); M.vis($('#vV'), t, tV1 + 0.5, 1e9, { dy: 10 });
    if (r !== vLast) { vLast = r; M.setT($('#vR'), `r = ${r}`); M.setT($('#vVn'), String(VAL[r])); }
    FR.forEach((_, i) => { const el = $('#vt' + i); M.vis(el, t, tV1 + 0.4 + i * 0.08, 1e9, { ...POP, sc: 0.6 }); const f = M.io((t - tR[i + 1] + 0.05) / 0.25);
      el.style.background = mix('#FFFFFF', PC, f); el.style.color = mix(XC, '#FFFFFF', f); el.style.borderColor = mix(XC, PC, f); });
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    bars.forEach((b, i) => { const g = M.spring(t - tR[i], M.SOFT), h = Math.max(0, BH(b.v) * g); attr(b.r, 'y', (BY0 - h).toFixed(1)); attr(b.r, 'height', h.toFixed(1));
      M.vis(b.lv, t, tR[i] + 0.25, 1e9, { dy: 0 }); M.vis(b.lr, t, tV1 + 0.6 + i * 0.06, 1e9, { dy: 0 }); });
    M.draw(mir, t, wt('V3', 'again'), 0.6); M.vis(mirT, t, wt('V3', 'again') + 0.3, 1e9, { dy: 0 });
    M.vis($('#vSO'), t, wt('V3', 'again') + 0.4, 1e9, POP); avD(t, wt('V3', 'All') + 0.4, out);
    M.vis($('#th2'), t, tV4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'equal') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'same') });
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
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wBag'), t, wt('W2', 'trip') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#wBagL'), t, wt('W2', 'trip'), 1e9, { dy: 0 });
    const tPk = wt('W2', 'chosen');
    W8.forEach(i => { const el = $('#wt' + i); M.vis(el, t, T0('W2') + 0.4 + i * 0.08, 1e9, { ...POP, sc: 0.6 });
      if (i in PICK) { const u = M.io((t - tPk - PICK[i] * 0.25) / 0.6), x0 = 36 + (i % 4) * 120, y0 = 84 + Math.floor(i / 4) * 100; place(el, x0 + (72 + PICK[i] * 140 - x0) * u, y0 + (323 - y0) * u);
        el.style.background = mix('#FFFFFF', PC, u); el.style.color = mix(XC, '#FFFFFF', u); el.style.borderColor = mix(XC, PC, u); } });
    PUC.write($('#wTot'), t, wt('W6', 'Three', 1) - 0.1, 0.8);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tRt = wt('X3', 'Divide');
    trap(t, { tin: tX1, tWrong: wt('X2', 'use') - 0.1, tStrike: wt('X3', 'counts') - 0.1, tRight: tRt });
    tOr.forEach((e, i) => { M.vis(e, t, wt('X3', 'six') + i * 0.12, 1e9, { dy: 0 }); e.setAttribute('fill', mix(C.red, C.mute, M.io((t - tRt) / 0.3))); });
    M.draw(tBr, t, wt('X3', 'group'), 0.5); M.vis(tOne, t, wt('X3', 'group') + 0.3, 1e9, { dy: 0 });
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
