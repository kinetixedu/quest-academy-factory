// PUC Maths Ep 67: Geometric mean and the AM-GM inequality (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 8): a blue, b teal, arithmetic mean A gold, geometric mean G magenta, ratio r orange
const AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1', GD = '#B7791F', MG = '#C2378A', MGB = '#F7E1EE', RC = C.orange;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const A = s => `\\textcolor{${AC}}{${s}}`, B = s => `\\textcolor{${BC}}{${s}}`, AM = s => `\\textcolor{${GD}}{${s}}`, GM = s => `\\textcolor{${MG}}{${s}}`, R = s => `\\textcolor{${RC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02;
const tG1 = T0('G1'), tG8 = T0('G8'), tL1 = T0('L1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['TWO NUMBERS', '4 and 9'], ['ADD AND HALVE', '6.5'], ['MULTIPLY, THEN ROOT', '6']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'four'), wt('H1', 'two', 1) + 0.2, wt('H1', 'middle')];

/* ---------- H: table ---------- */
const HP = [['4, 9', '6.5', '6'], ['2, 8', '5', '4'], ['1, 100', '50.5', '10']], HX = [36, 222, 408, 594], HW = [170, 170, 170, 154];
$('#hT').innerHTML = ['PAIR', 'ADD, HALVE', 'MULTIPLY, ROOT', 'BIGGER'].map((h, i) => `<div class="hh" style="left:${HX[i] + 8}px">${h}</div>`).join('') +
  HP.map((r, j) => r.map((v, i) => `<div class="hc" id="hc${j}${i}" style="left:${HX[i]}px;top:${120 + j * 100}px;width:${HW[i]}px;${i === 1 ? `color:${GD}` : i === 2 ? `color:${MG}` : ''}">${v}</div>`).join('') +
    `<div class="hc" id="hc${j}3" style="left:${HX[3]}px;top:${120 + j * 100}px;width:${HW[3]}px;background:${C.okBg};color:#1F6B3F;font:600 22px Poppins">add, halve</div>`).join('') +
  `<div class="pillp" id="hRule" style="left:36px;top:450px;background:${C.okBg};color:#1F6B3F">${M.icon('check', 22, C.ok, 3)} The first way wins, or ties</div>`;
const tHr = [T0('H2'), wt('H3', 'Two'), wt('H3', 'One')];

/* ---------- G: rectangle and square ---------- */
const gs = $('#gS'), GU = 38, GB = 490;
const gRect = mk(mk(gs, 'g', {}), 'g', {}); mk(gRect, 'rect', { x: 80, y: GB - 9 * GU, width: 4 * GU, height: 9 * GU, rx: 4, fill: ACB, stroke: AC, 'stroke-width': 3 });
mk(gRect, 'line', { x1: 80, y1: GB - 9 * GU, x2: 80, y2: GB, stroke: BC, 'stroke-width': 7 });
txt(gRect, 80 + 2 * GU, GB + 32, 'a = 4', { 'text-anchor': 'middle', 'font-size': 22, fill: AC, 'font-weight': 600 });
txt(gRect, 64, GB - 4.5 * GU, 'b = 9', { 'text-anchor': 'end', 'font-size': 22, fill: BC, 'font-weight': 600 });
txt(gRect, 80 + 2 * GU, GB - 4.5 * GU + 10, '36', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 });
const gSq = mk(mk(gs, 'g', {}), 'g', {}); mk(gSq, 'rect', { x: 400, y: GB - 6 * GU, width: 6 * GU, height: 6 * GU, rx: 4, fill: MGB, stroke: MG, 'stroke-width': 3 });
txt(gSq, 400 + 3 * GU, GB + 32, 'G = 6', { 'text-anchor': 'middle', 'font-size': 22, fill: MG, 'font-weight': 600 });
txt(gSq, 400 + 3 * GU, GB - 3 * GU + 10, '36', { 'text-anchor': 'middle', 'font-size': 30, fill: C.ink, 'font-weight': 600 });
const gEq = txt(gs, 392, 100, '4 × 9 = 36 = 6 × 6', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink2, 'font-weight': 600 });
$('#gD').innerHTML = K(`${GM('G')} = \\sqrt{${A('a')}\\,${B('b')}}\\quad (${A('a')}, ${B('b')} > 0)`);
$('#gP').innerHTML = K(`${A('4')},\\ ${GM('6')},\\ ${B('9')}:\\quad \\tfrac{6}{4} = \\tfrac{9}{6} = 1.5`);
const GCH = [1, 4, 16, 64, 256];
$('#gCh').innerHTML = GCH.map((v, i) => `<div class="ct" id="gc${i}" style="left:${36 + i * 150}px;top:334px;${i && i < 4 ? `color:${MG}` : ''}">${v}</div>`).join('') + [0, 1, 2, 3].map(i => `<div class="cj" id="gj${i}" style="left:${36 + i * 150 + 120}px;top:420px">×4</div>`).join('');
$('#gR').innerHTML = K(`${R('r')}^{\\,n+1} = \\tfrac{b}{a}:\\ \\ ${R('r')}^{4} = 256,\\ ${R('r')} = 4`);
const th1 = PUC.think($('#th1'), { q: 'What is the geometric mean of 2 and 18?', opts: ['6', '10'], right: 0, why: '2 × 18 = 36, and √36 = 6. (10 is the arithmetic mean.)' });

/* ---------- L: race (live) ---------- */
const ls = $('#lS'), LU = 34, LB = 470, LX = 70;
const lRect = mk(ls, 'rect', { x: LX, rx: 4, fill: ACB, stroke: AC, 'stroke-width': 3 });
const lLeft = mk(ls, 'line', { x1: LX, x2: LX, stroke: BC, 'stroke-width': 7 });
const lSq = mk(ls, 'rect', { rx: 4, fill: MGB, stroke: MG, 'stroke-width': 3 });
const lAt = txt(ls, 0, LB + 32, 'a', { 'text-anchor': 'middle', 'font-size': 22, fill: AC, 'font-weight': 600, 'font-style': 'italic' });
const lBt = txt(ls, LX - 14, 0, 'b', { 'text-anchor': 'end', 'font-size': 22, fill: BC, 'font-weight': 600, 'font-style': 'italic' });
const lGt = txt(ls, 0, LB + 32, 'G', { 'text-anchor': 'middle', 'font-size': 22, fill: MG, 'font-weight': 600, 'font-style': 'italic' });
const lCap = txt(ls, 392, 150, 'same area', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
const gp = PUC.graph($('#lP'), { x: 100, y: 90, w: 600, h: 380, xmax: 10, ymin: 0, ymax: 6, xt: [0, 2, 4, 6, 8, 10], yt: [0, 2, 4, 6], xl: 'a', yl: 'G' });
const aLine = mk($('#lP'), 'line', { x1: gp.X(0), y1: gp.Y(5), x2: gp.X(10), y2: gp.Y(5), stroke: GD, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const aLab = txt($('#lP'), gp.X(10), gp.Y(5) - 12, 'A = 5', { 'text-anchor': 'end', 'font-size': 22, fill: GD, 'font-weight': 600 });
const gCurve = gp.curve(MG, 5), gDot = gp.dot(MG, 11);
const tLa = [wt('L1', 'Change'), wt('L2', 'two'), wt('L3', 'closer'), wt('L4', 'five')];
const aOf = t => { let a = 1; a += (2 - 1) * M.io((t - tLa[1]) / 0.6); a += (4.5 - 2) * M.io((t - tLa[2]) / Math.max(0.8, T1('L3') - tLa[2])); a += (5 - 4.5) * M.io((t - tLa[3]) / 0.5); return a; };
const meet = txt($('#lP'), gp.X(5), gp.Y(5) - 46, 'G = A', { 'text-anchor': 'middle', 'font-size': 22, fill: MG, 'font-weight': 600 });

/* ---------- D: proof ---------- */
const DS = [
  `${AM('A')} - ${GM('G')} = \\tfrac{${A('a')} + ${B('b')}}{2} - \\sqrt{${A('a')}${B('b')}}`,
  `= \\tfrac{${A('a')} + ${B('b')} - 2\\sqrt{${A('a')}${B('b')}}}{2}`,
  `= \\tfrac{(\\sqrt{${A('a')}} - \\sqrt{${B('b')}})^2}{2}`,
  `\\ge 0 \\;\\Rightarrow\\; ${AM('A')} \\ge ${GM('G')}`];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="st" id="ds${i}" style="top:${84 + i * 104}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const DCK = [`\\sqrt{${A('4')}} = 2,\\ \\ \\sqrt{${B('9')}} = 3`, `(2 - 3)^2 = 1`, `${AM('A')} - ${GM('G')} = \\tfrac{1}{2}`, `${AM('6.5')} - ${GM('6')} = 0.5\\ \\checkmark`];
$('#dCk').innerHTML = DCK.map((f, i) => `<div class="ck" id="dc${i}" style="top:${90 + i * 92}px">${K(f)}</div>`).join('');

/* ---------- C: side by side ---------- */
$('#c1F').innerHTML = K(`${AM('A')} = \\dfrac{${A('a')} + ${B('b')}}{2}`);
$('#c2F').innerHTML = K(`${GM('G')} = \\sqrt{${A('a')}\\,${B('b')}}`);
const nline = (svg, mid, col, lab) => { const X = v => 60 + v * 66, Y = 330; mk(svg, 'line', { x1: 40, y1: Y, x2: 744, y2: Y, stroke: C.ink, 'stroke-width': 3 });
  for (let v = 0; v <= 10; v++) { mk(svg, 'line', { x1: X(v), y1: Y - 8, x2: X(v), y2: Y + 8, stroke: C.ink, 'stroke-width': 2 }); txt(svg, X(v), Y + 36, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute }); }
  mk(svg, 'circle', { cx: X(4), cy: Y, r: 12, fill: AC }); mk(svg, 'circle', { cx: X(9), cy: Y, r: 12, fill: BC });
  const g = mk(mk(svg, 'g', {}), 'g', {}); mk(g, 'circle', { cx: X(mid), cy: Y, r: 15, fill: '#fff', stroke: col, 'stroke-width': 5 }); txt(g, X(mid), Y - 30, lab, { 'text-anchor': 'middle', 'font-size': 22, fill: col, 'font-weight': 600 }); return g; };
const c1m = nline($('#c1S'), 6.5, GD, 'A = 6.5'), c2m = nline($('#c2S'), 6, MG, 'G = 6');
const avD = PUC.avatar($('#sC'), { x: 976 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'G sits a little to the left of A.' });
const th2 = PUC.think($('#th2'), { q: 'Two positive numbers have A M = 10. Can their G M be 12?', opts: ['Yes', 'No'], right: 1, why: 'G is never bigger than A, so their G M is 10 or less.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\dfrac{${A('a')} + ${B('b')}}{2} \\;\\ge\\; \\sqrt{${A('a')}\\,${B('b')}},\\quad \\text{equal only if } ${A('a')} = ${B('b')}`);

/* ---------- W ---------- */
$('#wq').innerHTML = `The A M of two positive numbers is 10<br>and their G M is 8. Find the numbers.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\tfrac{${A('a')} + ${B('b')}}{2} = 10 \\Rightarrow ${A('a')} + ${B('b')} = 20`)],
  [K(`\\sqrt{${A('a')}${B('b')}} = 8 \\Rightarrow ${A('a')}${B('b')} = 64`)],
  [K(`x^2 - 20x + 64 = 0`)],
  [K(`(x - 4)(x - 16) = 0`)],
  [K(`\\text{numbers: } ${A('4')} \\text{ and } ${B('16')}`)]], { label: 'WORKED EXAMPLE · NCERT', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const ws = $('#wS'), WX = v => 60 + v * 33, WY = 320;
mk(ws, 'line', { x1: 44, y1: WY, x2: 740, y2: WY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 20; v++) { mk(ws, 'line', { x1: WX(v), y1: WY - (v % 2 ? 5 : 9), x2: WX(v), y2: WY + (v % 2 ? 5 : 9), stroke: C.ink, 'stroke-width': 2 }); if (v % 4 === 0) txt(ws, WX(v), WY + 38, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute }); }
const wPt = (v, col, lab, up) => { const g = mk(mk(ws, 'g', {}), 'g', {}); mk(g, 'circle', { cx: WX(v), cy: WY, r: 13, fill: col }); txt(g, WX(v), up ? WY - 30 : WY + 74, lab, { 'text-anchor': 'middle', 'font-size': 22, fill: col, 'font-weight': 600 }); return g; };
const wP = [wPt(4, AC, 'a = 4', true), wPt(16, BC, 'b = 16', true), wPt(10, GD, 'A = 10', true), wPt(8, MG, 'G = 8', false)];
const wCap = txt(ws, 392, 470, 'G = 8 sits below A = 10', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink2, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`-2, -8:\\ \\ ${AM('A')} = -5,\\ \\sqrt{ab} = 4 \\Rightarrow A < G\\,?`), right: K(`${AM('A')} \\ge ${GM('G')} \\text{ only when } a > 0,\\ b > 0`) });
const ts = $('#tS'), TXv = v => 300 + v * 30, TY = 150;
mk(ts, 'line', { x1: 30, y1: TY, x2: 570, y2: TY, stroke: C.ink, 'stroke-width': 3 });
for (let v = -8; v <= 8; v += 2) { mk(ts, 'line', { x1: TXv(v), y1: TY - 7, x2: TXv(v), y2: TY + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TY + 34, v, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute }); }
const tP = [[-5, GD, '-5'], [4, MG, '4']].map(([v, col, l]) => { const g = mk(mk(ts, 'g', {}), 'g', {}); mk(g, 'circle', { cx: TXv(v), cy: TY, r: 12, fill: col }); txt(g, TXv(v), TY - 26, l, { 'text-anchor': 'middle', 'font-size': 22, fill: col, 'font-weight': 600 }); return g; });
const tNote = txt(ts, 300, 236, 'negative numbers break the rule', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Means inserted between two numbers, or a smallest value found with A M ≥ G M.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `For ${K('x > 0')}, find the smallest value of<br>${K(`x + \\dfrac{16}{x}`)}`,
  opts: ['4', '8', '16', '17'], right: 1, optW: 474, optY: 320 });
const so = PUC.solution($('#so'), [[K(`x > 0,\\ \\tfrac{16}{x} > 0`)], [K(`\\tfrac{1}{2}(x + \\tfrac{16}{x}) \\ge \\sqrt{x \\cdot \\tfrac{16}{x}}`)], [K(`\\sqrt{16} = 4`)], [K(`x + \\tfrac{16}{x} \\ge 8`)], [K(`= 8 \\text{ at } x = 4`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'positive'), wt('A3', 'Their'), wt('A3', 'root', 1), wt('A4', 'least'), wt('A4', 'exactly')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 240, w: 1200, h: 520, title: 'Recap · geometric mean and A M ≥ G M', y0: 96, dy: 86, txt: [0, 0, 0, 0, 1],
  lines: [K(`${GM('G')} = \\sqrt{${A('a')}${B('b')}},\\quad ${AM('A')} = \\tfrac{${A('a')} + ${B('b')}}{2}\\quad (${A('a')}, ${B('b')} > 0)`),
    K(`${AM('A')} - ${GM('G')} = \\tfrac{(\\sqrt{${A('a')}} - \\sqrt{${B('b')}})^2}{2} \\ge 0`),
    K(`${AM('A')} \\ge ${GM('G')},\\ \\text{equal only if } ${A('a')} = ${B('b')}`),
    K(`n \\text{ G.M.s between } a, b:\\ ${R('r')}^{\\,n+1} = \\tfrac{b}{a}`),
    '<b>Smallest value</b> of x + k/x (x > 0): use A M ≥ G M'] });
const YQ = ['Find the geometric mean of 3 and 27.', 'Why must both numbers be positive?', 'When is the A M equal to the G M?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 68', topic: 'One formula for 1 + 4 + 9 + ... : Sum of Special Series', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tLa[2] - 0.2, 1.04, 960, 560], [T1('L4'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tG1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('G1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    $('#sH').querySelectorAll('.hh').forEach((e, i) => M.vis(e, t, tMorph + 0.3 + i * 0.08, 1e9, { dy: 8 }));
    HP.forEach((_, j) => { const t0 = j ? tHr[j] : tMorph + 0.4; M.vis($(`#hc${j}0`), t, t0, 1e9, POP);
      M.vis($(`#hc${j}1`), t, j ? t0 + 0.3 : wt('H2', 'six') - 0.1, 1e9, POP); M.vis($(`#hc${j}2`), t, j ? t0 + 0.5 : wt('H2', 'six', 1) - 0.1, 1e9, POP);
      M.vis($(`#hc${j}3`), t, j ? t0 + 0.8 : T1('H2') - 0.2, 1e9, POP); });
    M.vis($('#hRule'), t, wt('H3', 'always') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'luck') - 0.1, 1e9, POP);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tL1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G8');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(gRect, t, wt('G1', 'rectangle') - 0.1, 1e9, { dy: 20, fade: 0.2 });
    M.vis(gSq, t, wt('G2', 'square') - 0.1, 1e9, { dy: 20, fade: 0.2 });
    M.vis(gEq, t, wt('G2', 'because'), 1e9, { dy: 0 });
    M.vis($('#gr'), t, T0('G3') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#gD'), t, wt('G3', 'square') - 0.2, 0.9);
    PUC.write($('#gP'), t, wt('G4', 'Four') - 0.1, 0.9);
    M.vis($('#gIl'), t, T0('G5'), 1e9, { dy: 8 });
    GCH.forEach((_, i) => M.vis($('#gc' + i), t, (i === 0 || i === 4) ? wt('G6', 'one', 0) + i * 0.1 : wt('G7', ['', 'four', 'sixteen', 'sixty'][i]) - 0.1, 1e9, POP));
    [0, 1, 2, 3].forEach(i => M.vis($('#gj' + i), t, wt('G6', 'jumps') + i * 0.15, 1e9, { dy: 6 }));
    PUC.write($('#gR'), t, wt('G6', 'so') - 0.2, 0.9);
    M.vis($('#th1'), t, tG8 + 0.05, OUT('L1'), { dy: 36, ...o });
    th1(t, { tin: tG8, tOpts: wt('G8', 'two') - 0.1, tCount: T1('G8') + 0.05, dur: 3, tAns: T0('G9') - 0.02, tWhy: wt('G9', 'times') });
  }

  /* L: race */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.2, out, { dx: 60, dy: 0, ...o });
    const a = aOf(t), b = 10 - a, G = Math.sqrt(a * b);
    attr(lRect, 'y', (LB - b * LU).toFixed(1)); attr(lRect, 'width', (a * LU).toFixed(1)); attr(lRect, 'height', (b * LU).toFixed(1));
    attr(lLeft, 'y1', (LB - b * LU).toFixed(1)); attr(lLeft, 'y2', LB);
    const sx = 460; attr(lSq, 'x', sx); attr(lSq, 'y', (LB - G * LU).toFixed(1)); attr(lSq, 'width', (G * LU).toFixed(1)); attr(lSq, 'height', (G * LU).toFixed(1));
    attr(lAt, 'x', (LX + a * LU / 2).toFixed(1)); attr(lBt, 'y', (LB - b * LU / 2 + 8).toFixed(1)); attr(lGt, 'x', (sx + G * LU / 2).toFixed(1));
    [lRect, lLeft, lSq, lAt, lBt, lGt, lCap].forEach(e => M.vis(e, t, tL1 + 0.5, 1e9, { dy: 0, fade: 0.2 }));
    M.setT($('#lAB'), `a = ${a.toFixed(1)}, b = ${b.toFixed(1)}`); M.setT($('#lG'), `G = ${G.toFixed(2)}`);
    ['#lAB', '#lA', '#lG'].forEach((s, i) => M.vis($(s), t, tL1 + 0.3 + i * 0.1, 1e9, { dy: 10 }));
    M.vis($('#lP'), t, tL1 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    gCurve(s => [s, Math.sqrt(s * (10 - s))], 1, Math.max(1.0001, a)); gDot(a, G, t > tL1 + 0.5);
    M.draw(aLine, t, wt('L1', 'stays'), 0.7); M.vis(aLab, t, wt('L1', 'stays') + 0.3, 1e9, { dy: 0 });
    M.vis(meet, t, tLa[3] + 0.4, 1e9, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 104]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 2).toFixed(1) + 'px'; hb.style.height = '96px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DCK.forEach((_, i) => PUC.write($('#dc' + i), t, tDs[i] + 1.0, 0.8));
    M.vis($('#dEq'), t, wt('D6', 'only') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, tC1 + 0.4, 0.8); M.vis($('#c1S'), t, wt('C1', 'four') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(c1m, t, wt('C1', 'six') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, T0('C2') + 0.2, 0.8); M.vis($('#c2S'), t, wt('C2', 'four') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(c2m, t, wt('C2', 'six') - 0.1, 1e9, { ...POP, sc: 0.4 });
    avD(t, wt('C2', 'far') - 0.1, out);
    M.vis($('#th2'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th2(t, { tin: tC3, tOpts: wt('C3', 'Can') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'never') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'positive') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'never') - 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wP[2], t, wt('W2', 'ten') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(wP[3], t, wt('W2', 'eight') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.vis(wP[0], t, wt('W7', 'four') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(wP[1], t, wt('W7', 'sixteen') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.vis(wCap, t, wt('W7', 'Check'), 1e9, { dy: 0 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Try') - 0.1, tStrike: wt('X3', 'bigger') - 0.1, tRight: wt('X3', 'only') - 0.2 });
    M.vis(tP[0], t, wt('X3', 'minus') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(tP[1], t, wt('X3', 'four') - 0.1, 1e9, { ...POP, sc: 0.4 });
    M.vis(tNote, t, wt('X3', 'only'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'inserted') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'smallest'), tCount, tAns });
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
