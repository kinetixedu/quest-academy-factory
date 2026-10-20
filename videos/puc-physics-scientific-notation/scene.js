// PUC Physics Ep 12: Scientific notation (Motion notebook, notation bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ink, BC = C.ac, HC = C.violet;      // colour-coding: front number a ink, power b blue, the tiny-number (right hop) track violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
// svg text with a power of ten: base then superscript exponent
const pow = (p, x, y, base, ex, a = {}, tail = '') => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: C.ink, 'font-weight': 600 }, a));
  const t1 = document.createElementNS(nsv, 'tspan'); t1.textContent = base; e.appendChild(t1);
  const t2 = document.createElementNS(nsv, 'tspan'); t2.setAttribute('baseline-shift', 'super'); t2.setAttribute('font-size', '70%'); t2.textContent = ex; e.appendChild(t2);
  if (tail) { const t3 = document.createElementNS(nsv, 'tspan'); t3.textContent = tail; e.appendChild(t3); } return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const hx = c => c.replace('#', '');
const ka = s => `\\textcolor{${AC}}{${s}}`, kb = s => `\\textcolor{${BC}}{${s}}`;

Object.assign(M.IC, {
  atom: ['M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0', 'M12 3c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9Z'],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP3 = T0('P3'), tS1 = T0('S1'), tM1 = T0('M1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tO1 = T0('O1'), tJ1 = T0('J1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: huge and tiny ---------- */
const JOBS = [['zap', 'SPEED OF LIGHT', '30,00,00,000 m/s', 'light'], ['atom', 'HYDROGEN ATOM', '0.000000000106 m', 'hydrogen']];
$('#jobs').innerHTML = JOBS.map(([ic, n, v], i) => `<div class="job" id="jb${i}" style="left:${420 + i * 560}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jv">${v}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const HR = [['zap', 'Speed of light', 'METRES PER SECOND', '30,00,00,000 <span class="u">m/s</span>', '8 ZEROS'], ['atom', 'Hydrogen atom', 'DIAMETER IN METRES', '0.000000000106 <span class="u">m</span>', '9 ZEROS AFTER THE POINT']];
$('#hrs').innerHTML = HR.map(([ic, n, w, v, z], i) => `<div class="hr" id="hr${i}" style="top:${84 + i * 170}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv">${v}</div><div class="zc" id="zc${i}">${z}</div></div>`).join('');
const TILES = [['hash', '8 zeros?'], ['hash', '9 zeros?'], ['help', 'Lost count']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, i < 2 ? C.violet : C.red, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Eight'), wt('H4', 'nine'), wt('H4', 'lost')];

/* ---------- P: the form ---------- */
$('#fA').innerHTML = K(ka('a')); $('#fX').innerHTML = K('\\times 10'); $('#fB').innerHTML = K(kb('b'));
$('#fB').style.cssText = 'display:inline-block;font-size:.62em;position:relative;top:-.72em;margin-left:4px';
const PW = [['10^{3} = 1000', 'Positive'], ['10^{0} = 1', 'zero'], ['10^{-3} = 0.001', 'negative']];
$('#pws').innerHTML = PW.map(([f], i) => `<div class="pw" id="pw${i}" style="background:var(--ac2);color:var(--ac)">${K(f.replace(/\^\{(-?\d)\}/, (m, e) => '^{' + kb(e) + '}'))}</div>`).join('');
const FR = [['3.0', 'between 1 and 10', 1], ['9.99', 'still less than 10', 1], ['25', 'two digits before the point', 0], ['0.5', 'less than 1', 0]];
$('#frs').innerHTML = FR.map(([n, w, ok], i) => `<div class="fr" id="fr${i}" style="top:${84 + i * 88}px;background:${ok ? C.soft : C.redBg}"><div class="fn">${n}</div><div class="fw">${w}</div><div class="mk" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 18, '#fff', 3)}</div></div>`).join('');
const tFr = [wt('P3', 'least'), wt('P3', 'less'), wt('P3', 'exactly'), wt('P3', 'decimal')];

/* ---------- S + M: the notation bench ---------- */
const s = $('#simS');
const mkStrip = (digits, cw, fs, x0) => {
  const g = mk(s, 'g', {}), cells = [], ds = [];
  digits.split('').forEach((d, i) => { cells.push(mk(g, 'rect', { x: x0 + i * cw + 3, y: 158, width: cw - 6, height: 92, rx: 8, fill: C.soft })); ds.push(txt(g, x0 + i * cw + cw / 2, 228, d, { 'text-anchor': 'middle', 'font-size': fs, fill: C.ink, 'font-weight': 600 })); });
  const ghosts = [0.3, 0.2, 0.12].map(o => mk(g, 'circle', { r: 9, fill: C.ac, opacity: 0 }));
  const dot = mk(g, 'circle', { r: 10, fill: C.ac });
  return { g, cells, ds, ghosts, dot, X: p => x0 + p * cw, cw };
};
const SL = mkStrip('300000000', 60, 62, 122), SH = mkStrip('0000000000106', 50, 52, 67);
SH.dot.setAttribute('fill', HC); SH.ghosts.forEach(c => c.setAttribute('fill', HC));
const hopA = PUC.arrow(s, C.ac, 5, 14), hopL = txt(s, 0, 0, '', { 'font-size': 22, 'font-weight': 600, 'text-anchor': 'middle' });
// hop schedules: light hops left 8 times, hydrogen hops right 10 times (first hop is the slow-mo replay)
const hL0 = wt('S3', 'Hop'), hL1 = wt('S4', 'hopping') + 0.15, hL2 = T1('S4') - 0.15;
const HOPL = [[hL0, 0.45], ...[0, 1, 2, 3, 4, 5].map(i => [hL1 + (hL2 - hL1) * i / 5, 0.38]), [wt('S5', 'eight') - 0.15, 0.4]];
const hH1 = wt('M3', 'Each') + 0.1, hH2 = T1('M3') - 0.1;
const HOPH = [[wt('M2', 'hops') - 0.2, 1.6], ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => [hH1 + (hH2 - hH1) * i / 7, 0.34]), [wt('M4', 'Ten') - 0.1, 0.4]];
const hops = (H, t) => H.reduce((a, [tk, d]) => a + M.io((t - tk) / d), 0);
const frontL = k => '3' + '0'.repeat(8 - k), frontH = k => k < 10 ? '0.' + '0'.repeat(9 - k) + '106' : '1.06';
$('#roG').innerHTML = `<span class="k" style="color:${AC}">a</span><span class="v" id="roA">300000000</span><span class="u">front number</span>
  <span class="k" style="color:${BC}">b</span><span class="v" id="roB" style="color:${BC}">0</span><span class="u">power</span>
  <span class="k" id="roK" style="color:${C.ink2}">c</span><span class="v" id="roV" style="font-size:28px">300000000</span><span class="u" id="roU">m/s · same</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 66, w: 600, h: 150, xmax: 10, ymin: -10, ymax: 10, xt: [0, 2, 4, 6, 8, 10], yt: [-10, 0, 8], yl: 'b' });
const cL = gr.curve(BC), cH = gr.curve(HC), dL = gr.dot(BC), dH = gr.dot(HC);
const gTag = document.createElement('div'); gTag.className = 'pillp ac'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px'; gTag.innerHTML = 'hop left: b + 1 &nbsp;·&nbsp; hop right: b - 1'; $('#gr').appendChild(gTag);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Each hop moves one zero into the power!' });
let exKey = '';

/* ---------- D: the rule ---------- */
const STEPS = [[`300\\,000\\,000 = ${ka('3')} \\times 100\\,000\\,000`, 'pull out the digits'],
  [`100\\,000\\,000 = 10^{${kb('8')}}`, 'a 1 with eight zeros'],
  [`\\text{left: } ${kb('b')}{+}1 \\qquad \\text{right: } ${kb('b')}{-}1`, 'count the hops of the point']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:132px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Pull'), wt('D3', 'One'), wt('D4', 'Hop')];
const DN = ['300000000', '0000000000106'];
DN.forEach((d, j) => { $('#dn' + j).innerHTML = d.split('').map(c => `<span style="display:inline-block;width:27px;text-align:center">${c}</span>`).join(''); });
$('#dr0').innerHTML = K(`= ${ka('3')} \\times 10^{${kb('8')}}`); $('#dr1').innerHTML = K(`= ${ka('1.06')} \\times 10^{${kb('-10')}}`);
const dS = $('#drS'); let dArc = [[], []], dDot = [[], []];
const tDn = [wt('D3', 'One') - 0.1, wt('D4', 'right') - 0.1], tDa = [wt('D3', 'eight'), wt('D4', 'right') + 0.2], tDr = [wt('D3', 'ten'), wt('D4', 'Count')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${ka('a')} \\times 10^{${kb('b')}}, \\qquad 1 \\le ${ka('a')} < 10`);

/* ---------- K: side by side ---------- */
const kbs = $('#kbS');
mk(kbs, 'circle', { cx: 392, cy: 200, r: 112, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 });
mk(kbs, 'path', { d: 'M330,140 q30,-20 60,-6 q20,24 -8,44 q-34,10 -52,-38Z M420,220 q30,-8 44,14 q-6,30 -40,24 q-20,-18 -4,-38Z', fill: '#BFD3F8', stroke: C.ac, 'stroke-width': 2 });
const kbA = PUC.arrow(kbs, C.ink, 4, 14), kbA2 = PUC.arrow(kbs, C.ink, 4, 14);
$('#kbV').textContent = '1,28,00,000 m'; $('#kbK').innerHTML = K(`${ka('1.28')} \\times 10^{${kb('7')}}\\,\\text{m}`);
const kss = $('#ksS');
mk(kss, 'ellipse', { cx: 392, cy: 200, rx: 112, ry: 112, fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
mk(kss, 'circle', { cx: 392, cy: 200, r: 12, fill: C.red });
const eDot = mk(kss, 'circle', { r: 10, fill: HC });
const ksA = PUC.arrow(kss, C.ink, 4, 14), ksA2 = PUC.arrow(kss, C.ink, 4, 14);
$('#ksK').innerHTML = K(`${ka('1.06')} \\times 10^{${kb('-10')}}\\,\\text{m}`);
const th1 = PUC.think($('#th1'), { q: 'Is 0.005 written with a positive power or a negative power?', opts: ['Positive', 'Negative'], right: 1, why: 'It is less than 1: hop the point 3 places right, so 0.005 = 5 × 10<sup>-3</sup>.' });

/* ---------- O: order of magnitude ---------- */
const ol = $('#olS'), NX = a => 80 + (a - 1) * 620 / 9;
const r1 = mk(ol, 'rect', { x: NX(1), y: 178, width: NX(5) - NX(1), height: 44, rx: 6, fill: C.ac2 });
const r2 = mk(ol, 'rect', { x: NX(5), y: 178, width: NX(10) - NX(5), height: 44, rx: 6, fill: '#EFE9FC' });
mk(ol, 'line', { x1: NX(1), y1: 222, x2: NX(10), y2: 222, stroke: C.ink, 'stroke-width': 3 });
for (let k = 1; k <= 10; k++) { mk(ol, 'line', { x1: NX(k), y1: 222, x2: NX(k), y2: 236, stroke: C.ink, 'stroke-width': 2 }); txt(ol, NX(k), 264, k, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const l1 = txt(ol, (NX(1) + NX(5)) / 2, 160, 'a ≤ 5: round to 1', { 'text-anchor': 'middle', 'font-size': 21, fill: C.ac, 'font-weight': 600 });
const l2 = txt(ol, (NX(5) + NX(10)) / 2, 160, 'a > 5: round to 10', { 'text-anchor': 'middle', 'font-size': 21, fill: HC, 'font-weight': 600 });
txt(ol, 36, 110, 'FRONT NUMBER a', { 'font-size': 16, 'letter-spacing': 2 });
const oDot = mk(ol, 'circle', { r: 11, fill: C.ink }), oArr = PUC.arrow(ol, C.ac, 4, 12), oLab = txt(ol, 0, 330, '1.28', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
$('#om0').innerHTML = K(`${ka('1.28')} \\times 10^{${kb('7')}} \\;\\Rightarrow\\; \\text{order } ${kb('7')}`);
$('#om1').innerHTML = K(`${ka('1.06')} \\times 10^{${kb('-10')}} \\;\\Rightarrow\\; \\text{order } ${kb('\\mathord{-}10')}`);
const orr = $('#orS'), LY = b => 500 - (b + 10) * 22, LX = 230;
mk(orr, 'line', { x1: LX, y1: LY(8) - 10, x2: LX, y2: LY(-10) + 10, stroke: C.ink, 'stroke-width': 3 });
for (let b = -10; b <= 8; b++) { mk(orr, 'line', { x1: LX - (b % 2 ? 8 : 14), y1: LY(b), x2: LX, y2: LY(b), stroke: C.ink, 'stroke-width': 2 }); if (b % 2 === 0) pow(orr, LX - 22, LY(b) + 7, '10', String(b), { 'text-anchor': 'end', 'font-size': 18, fill: C.mute, 'font-weight': 500 }); }
const mE = mk(orr, 'circle', { cx: LX, cy: LY(7), r: 11, fill: BC }), tE = pow(orr, LX + 30, LY(7) + 8, 'Earth  1.28 × 10', '7', { fill: BC }, ' m');
const mH = mk(orr, 'circle', { cx: LX, cy: LY(-10), r: 11, fill: HC }), tH = pow(orr, LX + 30, LY(-10) + 8, 'H atom  1.06 × 10', '-10', { fill: HC }, ' m');
const m1 = txt(orr, LX + 30, LY(0) + 7, '1 m', { 'font-size': 20, fill: C.mute, 'font-weight': 600 });
const brk = mk(orr, 'path', { d: `M${LX + 380},${LY(7)} h16 V${LY(-10)} h-16`, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const climb = mk(orr, 'circle', { r: 9, fill: C.ink }), cnt = txt(orr, LX + 420, (LY(7) + LY(-10)) / 2 + 8, '', { 'font-size': 30, fill: C.ink, 'font-weight': 600 });
const cnt2 = txt(orr, LX + 420, (LY(7) + LY(-10)) / 2 + 40, 'ORDERS', { 'font-size': 16, fill: C.mute, 'letter-spacing': 2 });
const tO2 = T0('O2'), tO3 = T0('O3'), tO4 = T0('O4'), tO5 = T0('O5'), tClimb = wt('O5', 'seventeen');

/* ---------- J: quick check ---------- */
const th2 = PUC.think($('#th2'), { q: 'Is 25 × 10<sup>4</sup> written in proper scientific notation?', opts: ['Yes', 'No'], right: 1, why: '25 is not less than 10: 25 × 10<sup>4</sup> = 2.5 × 10<sup>5</sup>.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`t = d \\,/\\, \\textcolor{${C.ac}}{v} = (1.5 \\times 10^{11}) \\,/\\, (3 \\times 10^{8})`)],
  [K(`${ka('1.5')} \\div ${ka('3')} = ${ka('0.5')}`)],
  [K(`10^{${kb('11')} - ${kb('8')}} = 10^{${kb('3')}}`)],
  [K(`${ka('0.5')} \\times 10^{${kb('3')}} = ${ka('5')} \\times 10^{${kb('2')}}\\,\\text{s}`)],
  [K(`= 500\\,\\text{s} \\approx 8.3\\,\\text{min}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 80 });
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const w = $('#wrS'), SX = 120, EX = 680, WY = 230;
mk(w, 'circle', { cx: SX - 20, cy: WY, r: 64, fill: '#F2C14E', stroke: C.ink, 'stroke-width': 3 });
txt(w, SX - 20, WY + 100, 'SUN', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
mk(w, 'circle', { cx: EX + 20, cy: WY, r: 22, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 });
txt(w, EX + 20, WY + 58, 'EARTH', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
mk(w, 'line', { x1: SX + 50, y1: WY, x2: EX - 6, y2: WY, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
mk(w, 'path', { d: `M${SX + 50},${WY + 92} v12 H${EX - 6} v-12`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
pow(w, (SX + EX) / 2 + 20, WY + 136, 'd ≈ 1.5 × 10', '11', { 'text-anchor': 'middle', 'font-size': 22 }, ' m');
const pG = [0.3, 0.2, 0.12].map(o => mk(w, 'circle', { r: 10, cy: WY, fill: '#E8A317', opacity: 0 })), pls = mk(w, 'circle', { r: 11, cy: WY, fill: '#E8A317', stroke: C.ink, 'stroke-width': 2 });
const vA = PUC.arrow(w, C.ac, 5, 14), vT = pow(w, 0, WY - 52, 'v = 3 × 10', '8', { fill: C.ac, 'font-size': 20, 'text-anchor': 'middle' }, ' m/s');
const tFly0 = T0('W3') + 0.2, tFly1 = wt('W7', 'five');
const avD = PUC.avatar($('#sW'), { x: 976 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So sunlight is 8 minutes old when it reaches us!' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: '0.00042 = 4.2 × 10<sup>+4</sup>', right: '0.00042 = 4.2 × 10<sup>-4</sup> &nbsp;(smaller than 1)' });
const tp = $('#tpS'), TX = 90, TCW = 40;
'000042'.split('').forEach((d, i) => txt(tp, TX + i * TCW + TCW / 2, 150, d, { 'text-anchor': 'middle', 'font-size': 44, fill: i >= 4 || i === 0 ? C.ink : C.mute, 'font-weight': 600 }));
const tArc = [1, 2, 3, 4].map(i => mk(tp, 'path', { d: `M${TX + i * TCW},112 Q${TX + (i + 0.5) * TCW},76 ${TX + (i + 1) * TCW},112`, fill: 'none', stroke: HC, 'stroke-width': 3, 'stroke-linecap': 'round' }));
const tpD0 = mk(tp, 'circle', { cx: TX + TCW, cy: 158, r: 7, fill: C.ink }), tpP = txt(tp, TX + TCW, 196, 'point', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute }), tpD1 = mk(tp, 'circle', { cx: TX + 5 * TCW, cy: 158, r: 8, fill: HC });
const tLb = pow(tp, TX + 3 * TCW, 214, '4 hops right: 10', '-4', { 'text-anchor': 'middle', fill: HC, 'font-size': 24 });
const tJn = wt('X3', 'smaller');
const where = PUC.where($('#wa'), { on: [], type: 'Inside almost every numerical answer, and quick order of magnitude questions' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `A proton has mass ${K('1.67 \\times 10^{-27}\\,\\text{kg}')} and an electron ${K('9.11 \\times 10^{-31}\\,\\text{kg}')}. What is ${K('m_p / m_e')}, and its order of magnitude?`,
  opts: [K('1.83 \\times 10^{3}') + ', order 3', K('1.83 \\times 10^{4}') + ', order 4', K('1.83 \\times 10^{3}') + ', order 4', K('5.49 \\times 10^{-4}') + ', order -4'], right: 0, optY: 300, optFs: 28 });
const so = PUC.solution($('#so'), [[K('1.67 \\div 9.11 \\approx 0.183')], [K('10^{-27-(-31)} = 10^{4}')], [K('0.183 \\times 10^{4} = 1.83 \\times 10^{3}')], [K('1.83 \\le 5 \\Rightarrow') + ' order <b>3</b>']], { y0: 100, dy: 112 });
const tSo = [wt('A1', 'One'), wt('A2', 'Subtract'), wt('A3', 'Hop'), wt('A3', 'order')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · scientific notation', y0: 100, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${ka('a')} \\times 10^{${kb('b')}}, \\qquad 1 \\le ${ka('a')} < 10, \\quad ${kb('b')} \\text{ a whole number}`),
    '<b>Hop left</b>: power + 1 &nbsp;·&nbsp; <b>hop right</b>: power - 1',
    '<b>Big</b> number: positive power &nbsp;·&nbsp; <b>smaller than 1</b>: negative power',
    '<b>Multiply</b>: add the powers &nbsp;·&nbsp; <b>divide</b>: subtract them',
    `<b>Order of magnitude</b>: ${K('a \\le 5 \\to 10^{b}')} &nbsp;·&nbsp; ${K('a > 5 \\to 10^{b+1}')}`] });
const YQ = ['Write 0.00072 in scientific notation.', 'Why does a number smaller than 1 get a negative power?', 'What is the order of magnitude of 7 × 10<sup>5</sup>?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 13', topic: 'Same reading every time, but wrong? Accuracy and Precision', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('M2') - 0.1, 1.12, 560, 520], [T0('M3') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const fm = $('#form'), a0 = $('#fA'), b0 = $('#fB');
  const L0 = a0.offsetLeft, W0 = a0.offsetWidth, L1 = b0.offsetLeft, W1 = b0.offsetWidth;
  $('#bk0').setAttribute('d', `M${L0 - 6} 4 V18 H${L0 + W0 + 6} V4`); $('#bk1').setAttribute('d', `M${L1 - 6} 4 V18 H${L1 + W1 + 6} V4`);
  [['bl0', L0 + W0 / 2], ['bl20', L0 + W0 / 2], ['bl1', L1 + W1 / 2], ['bl21', L1 + W1 / 2]].forEach(([id, cx]) => { const e = $('#' + id); e.style.left = (cx - e.offsetWidth / 2) + 'px'; });
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#pw' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  // count-the-hops arcs over the real digit boxes
  [0, 1].forEach(j => {
    const el = $('#dn' + j), sp = [...el.children], by = el.offsetTop + el.offsetHeight * 0.86, bx = i => el.offsetLeft + (i < sp.length ? sp[i].offsetLeft : sp[sp.length - 1].offsetLeft + 27);
    const [a, b] = j ? [1, 11] : [9, 1], dir = Math.sign(b - a);
    for (let i = a; i !== b; i += dir) { const x1 = bx(i), x2 = bx(i + dir); dArc[j].push(mk(dS, 'path', { d: `M${x1},${by - 46} Q${(x1 + x2) / 2},${by - 72} ${x2},${by - 46}`, fill: 'none', stroke: j ? HC : BC, 'stroke-width': 3, 'stroke-linecap': 'round' })); }
    dDot[j] = [mk(dS, 'circle', { cx: bx(a), cy: by, r: 6, fill: C.dim }), mk(dS, 'circle', { cx: bx(b), cy: by, r: 8, fill: j ? HC : BC })];
    const lab = txt(dS, el.offsetLeft + el.offsetWidth + 24, by - 14, j ? '10 hops right' : '8 hops left', { 'font-size': 20, fill: j ? HC : BC, 'font-weight': 600 }); dDot[j].push(lab);
  });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => { M.vis($('#hr' + i), t, tMorph + 0.3 + i * 0.14, 1e9, { dy: 16 }); M.vis($('#zc' + i), t, wt('H2', i ? 'tiny' : 'Huge') + 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'short') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#note'), t, wt('H3', 'wrote') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (i < 2 ? 1 - M.io((t - tTile[i + 1]) / 0.25) : 1); el.style.background = mix(C.soft, i < 2 ? '#EFE9FC' : C.redBg, on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pf'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#fA'), t, wt('P2', 'front') - 0.1, 1e9, POP); M.vis($('#fX'), t, wt('P2', 'times') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#fB'), t, wt('P2', 'power') - 0.1, 1e9, POP);
    M.draw($('#bk0'), t, wt('P3', 'front') - 0.1, 0.4); M.vis($('#bl0'), t, wt('P3', 'front'), 1e9, { dy: 10 }); M.vis($('#bl20'), t, wt('P3', 'less'), 1e9, { dy: 10 });
    M.draw($('#bk1'), t, wt('P4', 'power') - 0.1, 0.4); M.vis($('#bl1'), t, wt('P4', 'power'), 1e9, { dy: 10 }); M.vis($('#bl21'), t, wt('P4', 'whole'), 1e9, { dy: 10 });
    PW.forEach(([, w], i) => M.vis($('#pw' + i), t, wt('P4', w) - 0.1, 1e9, POP));
    M.vis($('#pc'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    FR.forEach((_, i) => { const el = $('#fr' + i); M.vis(el, t, tFr[i] - 0.1, 1e9, POP); M.vis(el.querySelector('.mk'), t, tFr[i] + 0.25, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#pcP'), t, wt('P3', 'point') + 0.2, 1e9, POP);
  }

  /* S + M: bench + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const isH = t >= tM1 - 0.15, hl = hops(HOPL, t), hh = hops(HOPH, t);
    M.setT($('#simL'), isH ? 'NOTATION BENCH · HYDROGEN ATOM' : 'NOTATION BENCH · SPEED OF LIGHT');
    M.vis(SL.g, t, T0('S2') - 0.2, tM1 - 0.2, { dy: 0, fade: 0.25, outDur: 0.3, ody: 0 });
    M.vis(SH.g, t, tM1, 1e9, { dy: 0, fade: 0.25 });
    // light: point at boundary 9 - hops; digits right of the point fade out
    const pl = 9 - hl, ph = 1 + hh;
    SL.ds.forEach((d, i) => attr(d, 'fill', mix(C.dim, C.ink, M.clamp(pl - i))));
    SL.cells.forEach((c, i) => attr(c, 'fill', mix('#F7F8FA', C.soft, M.clamp(pl - i))));
    SH.ds.forEach((d, i) => attr(d, 'fill', mix(C.dim, C.ink, M.clamp(i - (ph - 2)))));
    SH.cells.forEach((c, i) => attr(c, 'fill', mix('#F7F8FA', C.soft, M.clamp(i - (ph - 2)))));
    const place = (S, p, el) => { const f = p - Math.floor(p); attr(el, 'cx', S.X(p).toFixed(1)); attr(el, 'cy', (240 - Math.sin(Math.PI * f) * 70).toFixed(1)); };
    place(SL, pl, SL.dot); place(SH, ph, SH.dot);
    SL.ghosts.forEach((gc, j) => { const pp = 9 - hops(HOPL, t - 0.07 * (j + 1)); place(SL, pp, gc); gc.style.opacity = Math.abs(pp - pl) > 0.02 ? [0.3, 0.2, 0.12][j] : 0; });
    SH.ghosts.forEach((gc, j) => { const pp = 1 + hops(HOPH, t - 0.07 * (j + 1) * (t < HOPH[1][0] ? 3 : 1)); place(SH, pp, gc); gc.style.opacity = Math.abs(pp - ph) > 0.02 ? [0.3, 0.2, 0.12][j] : 0; });
    // the hop vector: grows over the cell the point is crossing
    const S = isH ? SH : SL, hcur = isH ? hh : hl, f = hcur - Math.floor(hcur), moving = f > 0.03 && f < 0.97;
    if (moving) { const k = Math.floor(hcur), xa = isH ? S.X(1 + k) : S.X(9 - k), xb = isH ? S.X(2 + k) : S.X(8 - k);
      hopA.set(xa, 128, M.lerp(xa, xb, M.o3(f * 1.4)), 128); hopA.g.querySelectorAll('path').forEach(p => { attr(p, 'stroke', isH ? HC : BC); if (p.getAttribute('fill') !== 'none') attr(p, 'fill', isH ? HC : BC); });
      attr(hopL, 'x', ((xa + xb) / 2).toFixed(1)); attr(hopL, 'y', 112); M.setT(hopL, isH ? 'b - 1' : 'b + 1'); attr(hopL, 'fill', isH ? HC : BC); hopL.style.opacity = M.clamp(f * 4).toFixed(2); M.hide(hopL, false);
    } else { hopA.set(0, 0, 0, 0); M.hide(hopL, true); }
    const k = Math.round(isH ? hh : hl);
    const key = (isH ? 'h' : 'l') + k;
    if (key !== exKey) { exKey = key; const fr = isH ? frontH(k) : frontL(k), b = isH ? -k : k; $('#ex').innerHTML = K(`${ka(fr)} \\times 10^{${kb(String(b))}}`);
      M.setT($('#roA'), fr); M.setT($('#roB'), String(b)); M.setT($('#roK'), isH ? 'd' : 'c'); M.setT($('#roV'), isH ? '0.000000000106' : '300000000'); M.setT($('#roU'), isH ? 'm · same' : 'm/s · same'); M.setT($('#hopN'), String(k)); }
    M.vis($('#ex'), t, T0('S2'), 1e9, { dy: 14 }); M.vis($('#hopC'), t, hL0 - 0.3, 1e9, POP);
    M.vis($('#slow'), t, T0('M2') + 0.1, T0('M3') + 0.2, POP);
    // graph: power b against hops, dot linked to the point
    cL((u) => [u, u], 0, hl); dL(hl, hl, t > T0('S2') && !isH);
    cH((u) => [u, -u], 0, hh); dH(hh, -hh, isH);
    M.vis(gTag, t, wt('S6', 'graph') - 0.1, 1e9, POP);
    avA(t, wt('S6', 'never') + 0.4, tM1 - 0.3);
  }

  /* D: the rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 240], [tStep[2] - 0.1, 396]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[0] + 0.6, 1e9, { dx: 60, dy: 0 });
    [0, 1].forEach(j => { M.vis($('#dn' + j), t, tDn[j], 1e9, { dy: 14 }); dArc[j].forEach((p, i) => M.draw(p, t, tDa[j] + i * 0.11, 0.25));
      M.vis(dDot[j][0], t, tDn[j] + 0.2, 1e9, POP); M.vis(dDot[j][1], t, tDa[j] + dArc[j].length * 0.11, 1e9, POP); M.vis(dDot[j][2], t, tDa[j], 1e9, { dy: 8 });
      M.vis($('#dr' + j), t, tDr[j], 1e9, POP); });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'One') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'power') - 0.1, 0.8);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tO1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ua = M.o3((t - wt('K1', 'wide') + 0.2) / 0.6); kbA.set(392, 200, 392 + 108 * ua, 200); kbA2.set(392, 200, 392 - 108 * ua, 200);
    M.vis($('#kbV'), t, wt('K1', 'twelve') - 0.1, 1e9, { dy: 14 }); M.vis($('#kbK'), t, wt('K1', 'One') - 0.1, 1e9, POP); M.vis($('#kbC'), t, wt('K1', 'positive') - 0.1, 1e9, POP);
    M.vis($('#ks'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ang = (t - T0('K2')) * 2.2; attr(eDot, 'cx', (392 + 112 * Math.cos(ang)).toFixed(1)); attr(eDot, 'cy', (200 + 112 * Math.sin(ang)).toFixed(1));
    const ub = M.o3((t - wt('K2', 'hydrogen') + 0.1) / 0.6); ksA.set(392, 200, 392 + 108 * ub, 200); ksA2.set(392, 200, 392 - 108 * ub, 200);
    M.vis($('#ksV'), t, wt('K2', 'hydrogen') - 0.1, 1e9, { dy: 14 }); M.vis($('#ksK'), t, wt('K2', 'negative') - 0.1, 1e9, POP); M.vis($('#ksC'), t, wt('K2', 'Minus') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('O1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Positive') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'less') });
  }

  /* O: order of magnitude */
  const oOn = t >= tO1 - 0.1 && t < tJ1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('J1');
    M.vis($('#ol'), t, tO1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const a1 = M.io((t - wt('O2', 'five') + 0.1) / 0.3), a2 = M.io((t - wt('O2', 'more') + 0.1) / 0.3);
    r1.style.opacity = (0.25 + 0.75 * a1).toFixed(2); r2.style.opacity = (0.25 + 0.75 * a2).toFixed(2); l1.style.opacity = a1.toFixed(2); l2.style.opacity = a2.toFixed(2);
    const ud = M.io((t - wt('O3', 'one') + 0.1) / 0.4), ue = M.io((t - wt('O3', 'So') + 0.1) / 0.5);
    attr(oDot, 'cx', NX(1.28).toFixed(1)); attr(oDot, 'cy', 200); M.hide(oDot, ud < 0.05); oDot.style.opacity = ud.toFixed(2);
    attr(oLab, 'x', NX(1.28).toFixed(1)); oLab.style.opacity = ud.toFixed(2);
    oArr.set(NX(1.28), 300, NX(1.28) - (NX(1.28) - NX(1) - 2) * ue, 300);
    M.vis($('#om0'), t, wt('O3', 'So') - 0.1, 1e9, POP); M.vis($('#om1'), t, wt('O4', 'magnitude') - 0.1, 1e9, POP);
    M.vis($('#or'), t, tO1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(mE, t, wt('O3', 'earth') - 0.1, 1e9, POP); M.vis(tE, t, wt('O3', 'earth'), 1e9, { dx: -12, dy: 0 });
    M.vis(mH, t, wt('O4', 'hydrogen') - 0.1, 1e9, POP); M.vis(tH, t, wt('O4', 'hydrogen'), 1e9, { dx: -12, dy: 0 });
    M.vis(m1, t, tO1 + 0.6, 1e9, { dy: 0 });
    const uc = M.io((t - tO5 - 0.1) / 2.2), cb = -10 + 17 * uc;
    attr(climb, 'cx', LX); attr(climb, 'cy', LY(cb).toFixed(1)); M.hide(climb, t < tO5);
    M.draw(brk, t, tClimb - 0.2, 0.5); M.setT(cnt, t < tO5 ? '' : String(Math.round(17 * uc))); M.vis(cnt2, t, tClimb, 1e9, { dy: 8 });
  }

  /* J: quick check */
  const jOn = t >= tJ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    M.vis($('#th2'), t, tJ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tJ1, tOpts: wt('J1', 'Yes') - 0.1, tCount: T1('J1') + 0.05, dur: 3, tAns: T0('J2') - 0.02, tWhy: wt('J2', 'front') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    // light pulse at constant speed (linear), timer linked
    const u = M.clamp((t - tFly0) / (tFly1 - tFly0)), px = M.lerp(SX + 50, EX - 6, u);
    attr(pls, 'cx', px.toFixed(1)); M.hide(pls, t < tFly0 - 0.3);
    pG.forEach((gc, j) => { const uu = M.clamp((t - 0.25 * (j + 1) - tFly0) / (tFly1 - tFly0)); attr(gc, 'cx', M.lerp(SX + 50, EX - 6, uu).toFixed(1)); gc.style.opacity = u > 0 && u < 1 && uu > 0 ? [0.3, 0.2, 0.12][j] : 0; });
    const va = M.o3((t - tFly0) / 0.5) * (u < 1 ? 1 : 0); vA.set(px + 16, WY - 30, px + 16 + 90 * va, WY - 30); attr(vT, 'x', (px + 60).toFixed(1)); vT.style.opacity = va.toFixed(2);
    M.vis($('#tmr'), t, tFly0 - 0.2, 1e9, POP); M.setT($('#tmN'), String(Math.round(500 * u)));
    avD(t, wt('W7', 'minutes') + 0.3, out);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'zero') - 0.1, tStrike: wt('X3', 'smaller') - 0.1, tRight: wt('X3', 'Four') - 0.1 });
    M.vis(tpD0, t, wt('X2', 'zero') - 0.1, 1e9, POP); M.vis(tpP, t, wt('X2', 'zero'), tJn + 0.8, { dy: 6 }); tArc.forEach((p, i) => M.draw(p, t, tJn + i * 0.18, 0.3)); M.vis(tpD1, t, tJn + 0.8, 1e9, POP); M.vis(tLb, t, tJn + 0.9, 1e9, { dy: 8 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Inside') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
