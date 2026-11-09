// PUC Maths Ep 65: Geometric progression (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 8): first term a blue, common ratio r orange, term number n violet, common difference d coral (accent)
const AC = '#2F6FEB', ACB = '#E7EEFD', RC = C.orange, RCB = '#FBEBDD', NC = C.violet, DC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const A = s => `\\textcolor{${AC}}{${s}}`, R = s => `\\textcolor{${RC}}{${s}}`, N = s => `\\textcolor{${NC}}{${s}}`, D = s => `\\textcolor{${DC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const fmt = v => { const r = Math.round(v * 100) / 100; return (Object.is(r, -0) ? 0 : r).toString(); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02;
const tP1 = T0('P1'), tR1 = T0('R1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['9 AM · KNOW IT', '1'], ['10 AM', '2'], ['11 AM', '4']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'student') - 0.1, wt('H1', 'hour') - 0.1, wt('H1', 'tells') - 0.1];

/* ---------- H: 1024 dots, Morton order so 2^h fills a block ---------- */
const hs = $('#hS'), HD = [];
const mort = k => { let x = 0, y = 0; for (let b = 0; b < 5; b++) { x |= ((k >> (2 * b)) & 1) << b; y |= ((k >> (2 * b + 1)) & 1) << b; } return [x, y]; };
for (let k = 0; k < 1024; k++) { const [x, y] = mort(k); HD.push(mk(hs, 'circle', { cx: 344 + x * 13, cy: 96 + y * 13, r: 4.6, fill: '#E3E5EA' })); }
const tHw = [wt('H2', 'One'), wt('H2', 'two'), wt('H2', 'four'), wt('H2', 'eight')], tH3a = wt('H3', 'seven'), tH3b = wt('H3', 'thousand');
const hh = t => { if (t < tHw[1]) return 0; if (t < tHw[2]) return 1; if (t < tHw[3]) return 2; if (t < tH3a) return 3; return Math.min(10, 3 + Math.floor(7 * M.clamp((t - tH3a) / Math.max(0.5, tH3b - tH3a)) + 0.001)); };
let hLast = -1;

/* ---------- P: AP vs GP rows + ratio test ---------- */
const AP = [2, 4, 6, 8], GP = [2, 4, 8, 16], PX = i => 36 + i * 186;
$('#pRows').innerHTML = `<div class="rl" id="pL0" style="top:84px;color:${DC}">A P · ADD THE SAME NUMBER</div><div class="rl" id="pL1" style="top:290px;color:${RC}">G P · MULTIPLY BY THE SAME NUMBER</div>` +
  AP.map((v, i) => `<div class="tl" id="pa${i}" style="left:${PX(i)}px;top:120px">${v}</div>`).join('') +
  GP.map((v, i) => `<div class="tl" id="pg${i}" style="left:${PX(i)}px;top:326px">${v}</div>`).join('') +
  [0, 1, 2].map(i => `<div class="ar" id="paa${i}" style="left:${PX(i) + 93}px;top:212px;color:${DC}">+2</div><div class="ar" id="pga${i}" style="left:${PX(i) + 93}px;top:418px;color:${RC}">× 2</div>`).join('');
const PT = [`4 \\div 2 = ${R('2')}`, `8 \\div 4 = ${R('2')}`, `16 \\div 8 = ${R('2')}`];
$('#pN').innerHTML = PT.map((f, i) => `<div class="nm" id="pn${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
$('#pR').innerHTML = `Common ratio ${K(`${R('r')} = 2`)} · first term ${K(`${A('a')} = 2`)}`;
const tPn = [wt('P4', 'Four'), wt('P4', 'Eight'), wt('P4', 'Sixteen')];
const avD = PUC.avatar($('#sP'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'The A P adds. The G P multiplies.' });

/* ---------- R: live r ---------- */
const rs = $('#rS'), RY = 320, RX = i => 102 + i * 106;
mk(rs, 'line', { x1: 60, y1: RY, x2: 724, y2: RY, stroke: C.ink, 'stroke-width': 3 });
const rBars = [0, 1, 2, 3, 4, 5].map(i => ({ r: mk(rs, 'rect', { x: RX(i), width: 72, rx: 6, fill: ACB, stroke: AC, 'stroke-width': 3 }), v: txt(rs, RX(i) + 36, 0, '', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }), l: txt(rs, RX(i) + 36, 0, 'term ' + (i + 1), { 'text-anchor': 'middle', 'font-size': 15, fill: NC }) }));
const tRk = [wt('R3', 'When'), wt('R4', 'When'), wt('R5', 'when')];
const rOf = t => { let r = 2; const tg = [1, 0.5, -2]; tRk.forEach((tt, i) => { const u = M.io((t - tt) / 0.9); r = r + (tg[i] - r) * u; }); return r; };
const phase = r => r > 1.001 ? ['r > 1: it grows', ''] : Math.abs(r - 1) < 0.001 ? ['r = 1: it stays the same', ''] : r > 0 ? ['0 < r < 1: it shrinks', ''] : ['r < 0: the sign flips', 'bad'];
let rLast = '';
$('#rG').innerHTML = K(`${A('a')},\\ ${A('a')}${R('r')},\\ ${A('a')}${R('r')}^2,\\ ${A('a')}${R('r')}^3,\\ \\dots`);

/* ---------- D: general term ---------- */
const DS = [`a_1 = ${A('a')}`, `a_2 = ${A('a')}\\,${R('r')}`, `a_3 = ${A('a')}\\,${R('r')}\\,${R('r')} = ${A('a')}\\,${R('r')}^2`, `a_{${N('n')}} = ${A('a')}\\,${R('r')}^{\\,${N('n')} - 1}`, `a_{11} = 1 \\times ${R('2')}^{10} = 1024`];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="st" id="ds${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), wt('D5', 'So'), T0('D6')];
const DB = [A('a'), `${A('a')}${R('r')}`, `${A('a')}${R('r')}^2`, `${A('a')}${R('r')}^3`], DX = i => 36 + i * 182;
$('#dCh').innerHTML = DB.map((f, i) => `<div class="bx" id="db${i}" style="left:${DX(i)}px;top:150px;width:130px">${K(f)}</div>`).join('') + [0, 1, 2].map(i => `<div class="ax" id="dax${i}" style="left:${DX(i) + 136}px;top:96px;color:${RC}">${K(`\\times ${R('r')}`)}</div>`).join('');
const ds = $('#dS');
const dArr = [0, 1, 2].map(i => { const g = mk(ds, 'g', {}); mk(g, 'line', { x1: DX(i) + 134, y1: 192, x2: DX(i) + 176, y2: 192, stroke: RC, 'stroke-width': 3 }); mk(g, 'path', { d: `M${DX(i) + 178},192 l-10,-6 v12 z`, fill: RC }); return g; });
const dLab = [0, 1, 2, 3].map(i => [txt(ds, DX(i) + 65, 276, `term ${i + 1}`, { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 }), txt(ds, DX(i) + 65, 306, `${i} × r`, { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600 })]);
$('#dNote').innerHTML = K(`\\text{term } ${N('n')}:\\ ${N('n')} - 1 \\text{ jumps of } \\times ${R('r')}`);

/* ---------- C: ramp vs curve ---------- */
$('#c1F').innerHTML = K(`a_{${N('n')}} = ${A('a')} + (${N('n')} - 1)\\,${D('d')}`);
$('#c2F').innerHTML = K(`a_{${N('n')}} = ${A('a')}\\,${R('r')}^{\\,${N('n')} - 1}`);
const cB = 460, cX = i => 70 + i * 112;
const cBars = (svg, vals, col, colB, max) => vals.map((v, i) => mk(mk(svg, 'g', {}), 'rect', { x: cX(i), y: cB - 280 * v / max, width: 76, height: 280 * v / max, rx: 6, fill: colB, stroke: col, 'stroke-width': 3 }));
const c1b = cBars($('#c1S'), [2, 4, 6, 8, 10, 12], DC, C.ac2, 12), c2b = cBars($('#c2S'), [1, 2, 4, 8, 16, 32], RC, RCB, 32);
[$('#c1S'), $('#c2S')].forEach(s => mk(s, 'line', { x1: 50, y1: cB, x2: 740, y2: cB, stroke: C.ink, 'stroke-width': 3 }));
const c1L = mk($('#c1S'), 'path', { d: `M${cX(0) + 38},${cB - 280 * 2 / 12} L${cX(5) + 38},${cB - 280}`, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
let cd = ''; for (let s = 0; s <= 50; s++) { const x = s / 10, v = Math.pow(2, x); cd += (s ? 'L' : 'M') + (cX(0) + 38 + x * 112).toFixed(1) + ',' + (cB - 280 * v / 32).toFixed(1); }
const c2L = mk($('#c2S'), 'path', { d: cd, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const th1 = PUC.think($('#th1'), { q: 'Is 3, 6, 12, 24 an A P or a G P?', opts: ['An A P', 'A G P'], right: 1, why: '6 ÷ 3 = 12 ÷ 6 = 24 ÷ 12 = 2. The gaps 3, 6, 12 are not equal, the ratios are.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\dfrac{a_{k+1}}{a_k} = ${R('r')} \\qquad a_{${N('n')}} = ${A('a')}\\,${R('r')}^{\\,${N('n')} - 1}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Which term of ${K(`${A('3')},\\ 6,\\ 12,\\ \\dots`)}<br>is 768?`;
const wsol = PUC.solution($('#wl'), [
  [K(`${A('a')} = 3,\\ \\ ${R('r')} = 6 \\div 3 = 2`)],
  [K(`3 \\times ${R('2')}^{\\,${N('n')} - 1} = 768`)],
  [K(`${R('2')}^{\\,${N('n')} - 1} = 768 \\div 3 = 256`)],
  [K(`256 = ${R('2')}^{8} \\;\\Rightarrow\\; ${N('n')} - 1 = 8`)],
  [K(`${N('n')} = 9:\\ \\text{the 9th term}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
$('#wcs').innerHTML = Array.from({ length: 9 }, (_, i) => `<div class="wc" id="wc${i}" style="left:${36 + (i % 3) * 244}px;top:${84 + Math.floor(i / 3) * 140}px"><div class="lb">TERM ${i + 1}</div><div class="vv">${3 * 2 ** i}</div></div>`).join('');
const tWc = i => wt('W4', 'Term') + i * 0.28;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`a_6 = 5 \\times ${R('2')}^{6} = 320`), right: K(`a_6 = 5 \\times ${R('2')}^{5} = 160`) + '&nbsp; 6 terms, 5 jumps' });
const ts = $('#tS');
const tTl = [5, 10, 20, 40, 80, 160].map((v, i) => { const g = mk(mk(ts, 'g', {}), 'g', {}); mk(g, 'rect', { x: 20 + i * 100, y: 96, width: 80, height: 60, rx: 10, fill: i === 5 ? C.okBg : C.soft, stroke: i === 5 ? C.ok : 'none', 'stroke-width': 2.5 }); txt(g, 60 + i * 100, 136, v, { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); return g; });
const tJ = [0, 1, 2, 3, 4].map(i => txt(ts, 110 + i * 100, 84, '×2', { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600 }));
const tNote = txt(ts, 310, 200, 'no r on term 1, so term 6 has only 5', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Terms of a G P: find r, a missing term, or which term it is.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `In a G P of positive terms, ${K(`a_2 + a_3 = 12`)}<br>and ${K(`a_4 + a_5 = 48`)}. Find ${K(`a_7`)}.`,
  opts: ['64', '128', '256', '384'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`a_4 + a_5 = r^2(a_2 + a_3)`)], [K(`r^2 = 48 \\div 12 = 4,\\ r = 2`)], [K(`ar + ar^2 = 6a = 12`)], [K(`a = 2`)], [K(`a_7 = 2 \\times 2^6 = 128`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'fourth'), wt('A2', 'So'), wt('A4', 'Then'), wt('A4', 'twelve'), wt('A4', 'seventh')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 520, title: 'Recap · geometric progression', y0: 100, dy: 84, txt: [0, 0, 0, 1, 1],
  lines: [K(`\\tfrac{a_{k+1}}{a_k} = ${R('r')} \\ \\text{ the same every time}`),
    K(`a_{${N('n')}} = ${A('a')}\\,${R('r')}^{\\,${N('n')} - 1}`),
    K(`${A('a')} \\ne 0,\\ \\ ${R('r')} \\ne 0`),
    '<b>r > 1</b> grows · <b>0 < r < 1</b> shrinks · <b>r < 0</b> flips sign',
    '<b>A P</b> adds d each time · <b>G P</b> multiplies by r'] });
const YQ = ['How do you test if a list is a G P?', 'Find the 8th term of 1, 3, 9, ...', 'Why does term n have r to the power n - 1, not n?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 66', topic: 'Grains on a chessboard: the Sum of a GP', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('R2') - 0.2, 1.04, 960, 560], [T1('R5'), 1, 960, 540]]);

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
    $('#sH').querySelectorAll('.hv').forEach((e, i) => M.vis(e, t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 12 }));
    M.vis(hs, t, tMorph + 0.4, 1e9, { dy: 0, fade: 0.3 });
    const h = hh(t);
    if (h !== hLast) { hLast = h; const n = 2 ** h; M.setT($('#hH'), String(h)); M.setT($('#hN'), String(n)); HD.forEach((c, k) => attr(c, 'fill', k < n ? C.ac : '#E3E5EA')); }
    M.vis($('#hX'), t, tHw[1], 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3b, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tR1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('R1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ta = [wt('P1', 'Two'), wt('P1', 'four'), wt('P1', 'six'), wt('P1', 'eight')], tg = [wt('P2', 'Two'), wt('P2', 'four'), wt('P2', 'eight'), wt('P2', 'sixteen')];
    M.vis($('#pL0'), t, wt('P1', 'add') - 0.1, 1e9, { dy: 8 }); M.vis($('#pL1'), t, wt('P2', 'multiply') - 0.1, 1e9, { dy: 8 });
    AP.forEach((_, i) => { M.vis($('#pa' + i), t, ta[i] - 0.1, 1e9, POP); if (i) M.vis($('#paa' + (i - 1)), t, ta[i] - 0.05, 1e9, { dy: 8 }); });
    GP.forEach((_, i) => { M.vis($('#pg' + i), t, tg[i] - 0.1, 1e9, POP); if (i) M.vis($('#pga' + (i - 1)), t, tg[i] - 0.05, 1e9, { dy: 8 }); });
    const r4 = M.io((t - wt('P3', 'Divide')) / 0.3); GP.forEach((_, i) => { const el = $('#pg' + i); el.style.background = mix(C.soft, RCB, r4); });
    M.vis($('#pb'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PT.forEach((_, i) => { const el = $('#pn' + i); M.vis(el.querySelector('.n'), t, tPn[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPn[i], 0.7); });
    const hiY = M.track(84, [[tPn[1] - 0.1, 180], [tPn[2] - 0.1, 276]], M.SOFT)(t);
    const hb = $('#pHi'); M.vis(hb, t, tPn[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#pR'), t, wt('P5', 'ratio') - 0.1, 1e9, POP);
    M.vis($('#pZ'), t, wt('P5', 'Neither') - 0.1, 1e9, POP);
    avD(t, T1('P5') - 0.6, out);
  }

  /* R: live r */
  const rOn = t >= tR1 - 0.1 && t < tD1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('D1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rRd'), t, tR1 + 0.3, 1e9, { dy: 12 }); M.vis($('#rA'), t, wt('R1', 'keep'), 1e9, { dy: 12 });
    M.vis($('#rb'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const r = rOf(t), vals = [0, 1, 2, 3, 4, 5].map(i => Math.pow(r, i)), mx = Math.max(...vals.map(Math.abs)), sc = 200 / mx;
    rBars.forEach((b, i) => {
      M.vis(b.r, t, wt('R1', 'change') + i * 0.08, 1e9, { dy: 0, fade: 0.15 }); M.vis(b.v, t, wt('R1', 'change') + i * 0.08 + 0.1, 1e9, { dy: 0 }); M.vis(b.l, t, wt('R1', 'change') + i * 0.08, 1e9, { dy: 0 });
      const v = vals[i], h = Math.max(2, Math.abs(v) * sc);
      attr(b.r, 'y', (v >= 0 ? RY - h : RY).toFixed(1)); attr(b.r, 'height', h.toFixed(1));
      attr(b.r, 'fill', v >= 0 ? ACB : C.redBg); attr(b.r, 'stroke', v >= 0 ? AC : C.red);
      M.setT(b.v, fmt(v)); attr(b.v, 'y', (v >= 0 ? RY - h - 12 : RY + h + 26).toFixed(1));
      attr(b.l, 'y', (v >= 0 ? RY + 28 : RY - 14).toFixed(1));
    });
    const key = fmt(r);
    if (key !== rLast) { rLast = key; M.setT($('#rV'), key); $('#rL').innerHTML = K(vals.slice(0, 5).map(v => fmt(v)).join(',\\ ') + ',\\ \\dots'); const [ph, cls] = phase(r); M.setT($('#rP'), ph); $('#rP').className = 'pillp' + (cls ? ' bad' : ' ac'); }
    M.vis($('#rL'), t, wt('R1', 'change') + 0.3, 1e9, { dy: 10 }); M.vis($('#rPl'), t, T0('R2') + 0.5, 1e9, { dy: 8 }); PUC.write($('#rG'), t, T0('R2') + 0.7, 0.9); M.vis($('#rP'), t, T0('R2'), 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.8); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 2).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const tb = [tDs[0], tDs[1], tDs[2], wt('D5', 'fewer')];
    DB.forEach((_, i) => { M.vis($('#db' + i), t, tb[i] + 0.1, 1e9, POP); dLab[i].forEach(e => M.vis(e, t, tb[i] + 0.3, 1e9, { dy: 0 })); if (i) { M.vis(dArr[i - 1], t, tb[i], 1e9, { dy: 0 }); M.vis($('#dax' + (i - 1)), t, tb[i], 1e9, { dy: 8 }); } });
    PUC.write($('#dNote'), t, wt('D5', 'power') - 0.3, 0.9);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, tC1 + 0.3, 0.8);
    c1b.forEach((b, i) => M.vis(b.parentNode, t, wt('C1', 'bars') - 0.2 + i * 0.1, 1e9, { dy: 16, fade: 0.12 }));
    M.draw(c1L, t, wt('C1', 'straight'), 0.6); M.vis($('#c1P'), t, wt('C1', 'ramp'), 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, T0('C2') + 0.1, 0.8);
    c2b.forEach((b, i) => M.vis(b.parentNode, t, wt('C2', 'bars') - 0.2 + i * 0.1, 1e9, { dy: 16, fade: 0.12 }));
    M.draw(c2L, t, wt('C2', 'curve'), 0.8); M.vis($('#c2P'), t, wt('C2', 'steeper'), 1e9, POP);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'twenty') + 0.2, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'Six') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'same') - 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 9; i++) { const el = $('#wc' + i); M.vis(el, t, i < 2 ? T0('W2') + 0.7 + i * 0.15 : tWc(i), 1e9, POP);
      const hi = i === 8 ? M.io((t - wt('W7', 'nine') + 0.1) / 0.3) : 0; el.style.background = mix(C.soft, C.ac2, hi); el.style.borderColor = hi > 0.01 ? mix(C.soft, DC, hi) : 'transparent'; el.querySelector('.vv').style.color = mix(C.ink, DC, hi); }
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'first') - 0.1, tRight: wt('X3', 'thirty') - 0.2 });
    tTl.forEach((g, i) => M.vis(g, t, T0("X2") + 0.5 + i * 0.12, 1e9, { ...POP, sc: 0.6 }));
    tJ.forEach((e, i) => M.vis(e, t, wt('X3', 'only') + i * 0.15, 1e9, { dy: 0 }));
    M.vis(tNote, t, wt('X3', 'five', 0) - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'formed') });
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
