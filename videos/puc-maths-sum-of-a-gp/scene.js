// PUC Maths Ep 66: Sum of a GP (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 8): first term a blue, common ratio r orange, number of terms n violet, survivors: -a red, a r^n green
const AC = '#2F6FEB', ACB = '#E7EEFD', RC = C.orange, RCB = '#FBEBDD', NC = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const A = s => `\\textcolor{${AC}}{${s}}`, R = s => `\\textcolor{${RC}}{${s}}`, N = s => `\\textcolor{${NC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`, grn = s => `\\textcolor{${C.ok}}{${s}}`;
const SN = 'S_{' + N('n') + '}';
const big = n => (2n ** BigInt(n) - 1n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02;
const tP1 = T0('P1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['SQUARE 1', '1 grain'], ['SQUARE 2', '2 grains'], ['SQUARE 3', '4 grains']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'first'), wt('H1', 'Two'), wt('H1', 'four')];

/* ---------- chessboard builder ---------- */
const board = (svg, x0, y0, cs) => { const cells = []; for (let k = 0; k < 64; k++) { const r = Math.floor(k / 8), c = r % 2 ? 7 - (k % 8) : k % 8; cells.push(mk(svg, 'rect', { x: x0 + c * cs, y: y0 + r * cs, width: cs, height: cs, fill: (r + c) % 2 ? '#E6E1D6' : '#FBFAF6', stroke: '#D9D3C6', 'stroke-width': 1 })); } return cells; };
const paint = (cells, n, base) => cells.forEach((c, k) => { const r = Math.floor(k / 8), cc = r % 2 ? 7 - (k % 8) : k % 8; attr(c, 'fill', k < n ? mix(C.ac2, C.ac, 0.15 + 0.85 * k / 63) : ((r + cc) % 2 ? '#E6E1D6' : '#FBFAF6')); });

/* ---------- H ---------- */
const hCells = board($('#hB'), 334, 96, 52);
const hTxt = [0, 1, 2, 3].map(k => txt($('#hB'), 334 + k * 52 + 26, 96 + 33, String(2 ** k), { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 600 }));
const tHw = [wt('H1', 'one'), wt('H1', 'Two'), wt('H1', 'four'), wt('H1', 'eight')];
const hn = t => t < tHw[1] ? 1 : t < tHw[2] ? 2 : t < tHw[3] ? 3 : 4;
let hLast = -1;

/* ---------- P: pattern rows + live board ---------- */
const PR = [`1 = ${R('2')} - 1`, `1 + 2 = 3 = ${R('4')} - 1`, `1 + 2 + 4 = 7 = ${R('8')} - 1`, `1 + 2 + 4 + 8 = 15 = ${R('16')} - 1`];
$('#pRows').innerHTML = PR.map((f, i) => `<div class="pr" id="pr${i}" style="top:${84 + i * 70}px">${K(f)}</div>`).join('');
$('#pF').innerHTML = K(`S_{${N('64')}} = 2^{${N('64')}} - 1`);
const pCells = board($('#pS'), 176, 100, 54);
const tPr = [wt('P2', 'one', 1), wt('P2', 'three'), wt('P2', 'seven'), wt('P2', 'fifteen')];
const tPl0 = wt('P3', 'next'), tPl1 = wt('P4', 'minus');
const pn = t => t < tPr[1] - 0.1 ? 1 : t < tPr[2] - 0.1 ? 2 : t < tPr[3] - 0.1 ? 3 : t < tPl0 ? 4 : Math.round(4 + 60 * M.io((t - tPl0) / Math.max(1, tPl1 - tPl0)));
let pLast = -1;
const pLab = txt($('#pS'), 392, 560, '', { 'text-anchor': 'middle', 'font-size': 20, fill: NC, 'font-weight': 600 });

/* ---------- D: steps + shift-and-cancel rows ---------- */
const DS = [
  `${SN} = ${A('a')} + ${A('a')}${R('r')} + \\cdots + ${A('a')}${R('r')}^{${N('n')}-1}`,
  `${R('r')}${SN} = ${A('a')}${R('r')} + ${A('a')}${R('r')}^2 + \\cdots + ${A('a')}${R('r')}^{${N('n')}}`,
  `${R('r')}${SN} - ${SN} = ${grn(`${A('a')}${R('r')}^{${N('n')}}`)} - ${red('a')}`,
  `${SN}\\,(${R('r')} - 1) = ${A('a')}\\,(${R('r')}^{${N('n')}} - 1)`,
  `${SN} = \\dfrac{${A('a')}\\,(${R('r')}^{${N('n')}} - 1)}{${R('r')} - 1}`];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="st" id="ds${i}" style="top:${84 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D5'), T0('D6'), T0('D7')];
const DX = i => 40 + i * 102, Y1 = 140, Y2 = 270;
const R1 = ['a', 'ar', 'ar^2', 'ar^3', '\\cdots', 'ar^{n-1}'], R2 = ['ar', 'ar^2', 'ar^3', '\\cdots', 'ar^{n-1}', 'ar^{n}'];
const tex = s => s === '\\cdots' ? '\\cdots' : s.replace(/^a/, A('a')).replace(/r/, R('r')).replace(/n/, N('n'));
$('#dRows').innerHTML = `<div class="rlb" id="dL1" style="top:${Y1 - 44}px">${K(SN)}</div><div class="rlb" id="dL2" style="top:${Y2 - 44}px">${K(R('r') + SN)}</div>` +
  R1.map((s, i) => `<div class="tt ${s === '\\cdots' ? 'gh' : 'r1'}" id="dt1${i}" style="left:${DX(i)}px;top:${Y1}px">${K(tex(s))}</div>`).join('') +
  R2.map((s, i) => `<div class="tt ${s === '\\cdots' ? 'gh' : 'r2'}" id="dt2${i}" style="left:${DX(i + 1)}px;top:${Y2}px">${K(tex(s))}</div>`).join('') +
  [1, 2, 3, 5].map(i => `<div class="sk" id="dk${i}" style="left:${DX(i) + 44}px;top:${Y1 - 8}px;height:0"></div>`).join('');
$('#dRes').innerHTML = K(`${R('r')}${SN} - ${SN} = ${grn(`${A('a')}${R('r')}^{${N('n')}}`)} - ${red('a')}`);
$('#dChk').innerHTML = `Chessboard: ${K(`${A('a')} = 1,\\ ${R('r')} = 2 \\Rightarrow S_{64} = 2^{64} - 1`)}`;
const tShift = wt('D3', 'Multiply'), tCan = wt('D4', 'cancel'), tSurv = wt('D5', 'survive');

/* ---------- C ---------- */
$('#c1F').innerHTML = K(`${SN} = \\dfrac{${A('a')}\\,(${R('r')}^{${N('n')}} - 1)}{${R('r')} - 1}`);
$('#c2F').innerHTML = K(`${SN} = \\dfrac{${A('a')}\\,(1 - ${R('r')}^{${N('n')}})}{1 - ${R('r')}}`);
$('#c1E').innerHTML = K(`1 + 2 + 4 + 8 = \\tfrac{2^4 - 1}{2 - 1} = 15`);
$('#c2E').innerHTML = K(`1 + \\tfrac12 + \\tfrac14 = \\tfrac{1 - (1/2)^3}{1 - 1/2} = \\tfrac74`);
const avA = PUC.avatar($('#sC'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Flip top and bottom: same answer.' });
const th1 = PUC.think($('#th1'), { q: '5 + 5 + 5 + ... for 10 terms. Here r = 1. Can we use the formula?', opts: ['Yes', 'No: r - 1 = 0'], right: 1, why: 'We cannot divide by zero. Every term is a, so the sum is n × a = 10 × 5 = 50.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${SN} = \\dfrac{${A('a')}\\,(${R('r')}^{${N('n')}} - 1)}{${R('r')} - 1},\\quad ${R('r')} \\ne 1`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find the sum of the first 6 terms of<br>${K(`${A('2')} + 6 + 18 + \\cdots`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${A('a')} = 2,\\ \\ ${R('r')} = 6 \\div 2 = 3,\\ \\ ${N('n')} = 6`)],
  [K(`S_6 = \\dfrac{${A('2')}\\,(${R('3')}^{${N('6')}} - 1)}{${R('3')} - 1}`)],
  [K(`= \\tfrac{2 \\times (729 - 1)}{2} = \\tfrac{2 \\times 728}{2}`)],
  [K(`S_6 = \\mathbf{728}`)],
  [K(`\\text{check: } 2 + 6 + 18 + 54 + 162 + 486 = 728`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const WV = [2, 6, 18, 54, 162, 486], ws = $('#wS'), WB = 520, WXb = i => 60 + i * 116;
mk(ws, 'line', { x1: 40, y1: WB, x2: 744, y2: WB, stroke: C.ink, 'stroke-width': 3 });
const wBars = WV.map((v, i) => { const g = mk(mk(ws, 'g', {}), 'g', {}); const h = Math.max(4, 300 * v / 486); mk(g, 'rect', { x: WXb(i), y: WB - h, width: 84, height: h, rx: 6, fill: i ? RCB : ACB, stroke: i ? RC : AC, 'stroke-width': 3 }); txt(g, WXb(i) + 42, WB - h - 12, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); return g; });
const tWb = [wt('W7', 'two'), wt('W7', 'six'), wt('W7', 'eighteen'), wt('W7', 'fifty'), wt('W7', 'sixty'), wt('W7', 'eighty')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`S_6 = \\tfrac{2\\,(3^{${red('5')}} - 1)}{3 - 1} = 242`), right: K(`S_6 = \\tfrac{2\\,(3^{${N('6')}} - 1)}{3 - 1} = 728`) });
$('#tR').innerHTML = `<div class="lbl" style="position:static">KEEP THEM APART</div><div class="k" id="tR1">${K(`\\text{one term: } a_{${N('n')}} = ${A('a')}${R('r')}^{${N('n')} - 1}`)}</div><div class="k" id="tR2">${K(`\\text{the sum: } ${R('r')}^{${N('n')}} \\text{ on top}`)}</div>`;
$('#tR').style.top = '40px';
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Sums of a G P: find a sum of many terms, or how many terms.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `How many terms of ${K(`3 + 6 + 12 + \\cdots`)}<br>add up to 765?`,
  opts: ['7', '8', '9', '255'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`a = 3,\\ r = 2`)], [K(`S_n = 3\\,(2^n - 1)`)], [K(`2^n - 1 = 765 \\div 3 = 255`)], [K(`2^n = 256 = 2^8`)], [K(`n = 8`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Here'), wt('A2', 'So'), wt('A3', 'Two'), wt('A4', 'So'), wt('A4', 'eight', 1)];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 520, title: 'Recap · sum of a G P', y0: 96, dy: 86, txt: [0, 0, 0, 0, 1],
  lines: [K(`${SN} = \\tfrac{${A('a')}(${R('r')}^{${N('n')}} - 1)}{${R('r')} - 1} \\quad (${R('r')} > 1)`),
    K(`${SN} = \\tfrac{${A('a')}(1 - ${R('r')}^{${N('n')}})}{1 - ${R('r')}} \\quad (${R('r')} < 1)`),
    K(`${R('r')} = 1:\\ \\ ${SN} = ${N('n')}${A('a')}`),
    K(`1 + 2 + 4 + \\cdots + 2^{${N('n')}-1} = 2^{${N('n')}} - 1`),
    '<b>Trick</b>: multiply by r, subtract, almost all terms cancel'] });
const YQ = ['Why do almost all the terms cancel when we subtract?', 'Find the sum of 1 + 3 + 9 + ... up to 6 terms.', 'What is the sum of a G P when r = 1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 67', topic: 'Two averages: which is never smaller? Geometric Mean and AM-GM', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tCan - 0.3, 1.04, 960, 560], [T1('D5'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    $('#sH').querySelectorAll('.hv').forEach((e, i) => M.vis(e, t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 12 }));
    M.vis($('#hB'), t, tMorph + 0.3, 1e9, { dy: 0, fade: 0.3 });
    const n = Math.max(4, t >= T0('H3') ? 4 : 4); // the first four squares (the story so far)
    if (hLast < 0) { hLast = 1; paint(hCells, 4); }
    M.setT($('#hS'), t < wt('H3', 'sixty') ? '4' : '64'); M.setT($('#hO'), t < wt('H3', 'sixty') ? '8' : '2⁶³'); M.setT($('#hT'), t < wt('H3', 'sixty') ? '15' : '?');
    hTxt.forEach(e => M.vis(e, t, tMorph + 0.4, 1e9, { dy: 0 }));
    M.vis($('#hBig'), t, wt('H4', 'twenty') - 0.1, 1e9, { dy: 10 });
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'How') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PR.forEach((_, i) => { PUC.write($('#pr' + i), t, tPr[i] - 0.05, 0.6); });
    // the "= 2^k - 1" part glows when the pattern is named
    M.vis($('#pb'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const n = t < tPr[0] - 0.1 ? 0 : pn(t);
    if (n !== pLast) { pLast = n; paint(pCells, n); M.setT($('#pKn'), String(Math.max(n, 1))); M.setT($('#pKv'), big(Math.max(n, 1))); M.setT(pLab, n ? `${n} of 64 squares filled` : ''); }
    M.vis($('#pK'), t, tPl0 - 0.2, 1e9, { dy: 10 });
    PUC.write($('#pF'), t, wt('P4', 'power') - 0.3, 0.9);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 2).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dL1'), t, tDs[0] + 0.2, 1e9, { dy: 8 }); M.vis($('#dL2'), t, tShift, 1e9, { dy: 8 });
    R1.forEach((_, i) => M.vis($('#dt1' + i), t, tDs[0] + 0.3 + i * 0.12, 1e9, POP));
    const sh = M.io((t - tShift - 0.3) / 0.6);
    R2.forEach((_, i) => { const el = $('#dt2' + i); M.vis(el, t, tShift + i * 0.1, 1e9, { dy: 0, fade: 0.15 }); el.style.left = (DX(i) + 102 * sh) + 'px'; });
    const c = M.io((t - tCan) / 0.5);
    [1, 2, 3, 5].forEach((i, j) => { const k = $('#dk' + i), cj = M.io((t - tCan - j * 0.12) / 0.4); k.style.height = (cj * (Y2 - Y1 + 88)).toFixed(1) + 'px'; M.hide(k, cj <= 0); });
    [1, 2, 3, 5].forEach(i => { const f = 1 - 0.65 * M.io((t - tCan - 0.3) / 0.4); $('#dt1' + i).style.opacity = f.toFixed(3); $('#dt2' + (i - 1)).style.opacity = f.toFixed(3); });
    const sv = M.io((t - tSurv) / 0.3);
    $('#dt10').style.borderColor = mix(AC, C.red, sv); $('#dt10').style.background = mix(ACB, C.redBg, sv);
    $('#dt25').style.borderColor = mix(RC, C.ok, sv); $('#dt25').style.background = mix(RCB, C.okBg, sv);
    PUC.write($('#dRes'), t, wt('D5', 'minus') - 0.4, 0.9);
    M.vis($('#dChk'), t, wt('D8', 'chessboard') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, wt('C1', 'use') - 0.2, 0.9); M.vis($('#c1E'), t, wt('C1', 'Top') - 0.6, 1e9, { dy: 10 }); M.vis($('#c1P'), t, wt('C1', 'positive') - 0.2, 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, wt('C2', 'use') - 0.2, 0.9); M.vis($('#c2E'), t, wt('C2', 'Same') - 0.4, 1e9, { dy: 10 }); M.vis($('#c2P'), t, wt('C2', 'tidier') - 0.2, 1e9, POP);
    avA(t, T1('C2') - 0.3, out);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'Can') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'cannot') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Multiply') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'subtract') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    wBars.forEach((g, i) => M.vis(g, t, T0('W2') + 0.7 + i * 0.12, 1e9, { dy: 20, fade: 0.12 }));
    let tot = 0; WV.forEach((v, i) => { if (t >= tWb[i]) tot += v; }); M.setT($('#wTv'), String(tot));
    M.vis($('#wTot'), t, tWb[0] - 0.2, 1e9, { dy: 10 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'uses') - 0.1, tRight: wt('X3', 'right') - 0.1 });
    M.vis($('#tR'), t, wt('X2', 'like') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'uses'), 1e9, { dy: 8 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'sums') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'add'), tCount, tAns });
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
