// PUC Maths Ep 47: Relationships between roots and coefficients (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: a violet, b blue, c teal, discriminant D coral; real part blue, imaginary part coral, i violet
const VA = C.violet, VB = '#2F6FEB', VC = C.teal, VD = C.ac, RE = '#2F6FEB', IM = C.ac, IU = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const av = s => tc(VA, s), bv = s => tc(VB, s), cv = s => tc(VC, s), dv = s => tc(VD, s), re = s => tc(RE, s), im = s => tc(IM, s), iu = s => tc(IU, s);
const I = iu('i'), DD = dv('D');
const path = (f, x0, x1, X, Y, n = 90) => { let d = ''; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n; d += (k ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1); } return d; };
const arrowHead = (p, x, y, dir, col) => mk(p, 'path', { d: dir === 'r' ? `M${x},${y} l-14,-8 v16 z` : `M${x},${y} l-8,14 h16 z`, fill: col });
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const SUM = `\\alpha + \\beta`, PRO = `\\alpha\\beta`;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tL1 = T0('L1'), tL7 = T0('L7'), tR1 = T0('R1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const EQH = `${av('2')}x^2 ${bv('- 7')}x ${cv('+ 3')} = 0`;
const LS = [['THE EQUATION', K(EQH)], ['SUM OF THE ROOTS', '?'], ['PRODUCT OF THE ROOTS', '?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv"${i ? ' style="color:var(--dim)"' : ''}>${v}</div></div>`).join('');
const tLs = [wt('H1', 'two') - 0.1, wt('H1', 'sum') - 0.1, wt('H1', 'product') - 0.1];

/* ---------- H: the long way ---------- */
const HR = [[EQH, ''], ['(2x - 1)(x - 3) = 0', 'factorise'], ['x = 3,\\ \\ \\tfrac{1}{2}', 'the roots'], [`\\text{sum} = 3 + \\tfrac{1}{2} = \\tfrac{7}{2}`, ''], [`\\text{product} = 3 \\times \\tfrac{1}{2} = \\tfrac{3}{2}`, '']];
$('#hRows').innerHTML = HR.map(([f, g], i) => `<div class="rw" id="hr${i}" style="top:${84 + i * 92}px">${K(f)}${g ? `<span class="tg">${g.toUpperCase()}</span>` : ''}</div>`).join('');
const tHr = [tMorph + 0.3, wt('H2', 'solved'), wt('H2', 'roots'), wt('H2', 'Sum'), wt('H2', 'Product')];

/* ---------- P: names ---------- */
$('#abBig').innerHTML = K('\\alpha,\\ \\beta');
$('#dr0 .dk').innerHTML = K('\\alpha,\\ \\beta'); $('#dr1 .dk').innerHTML = K(`${re('p')} \\pm ${im('q')}${I}`);
$('#ff0').innerHTML = K(`\\alpha = \\frac{-${bv('b')}\\ ${dv('+')}\\ \\sqrt{${DD}}}{2${av('a')}}`);
$('#ff1').innerHTML = K(`\\beta = \\frac{-${bv('b')}\\ ${dv('-')}\\ \\sqrt{${DD}}}{2${av('a')}}`);

/* ---------- L: live ---------- */
$('#lFx').innerHTML = K(`y = x^2 ${bv('- 4')}x + ${cv('c')}`);
const ls = $('#lS'), LX = x => 70 + (x + 0.5) * 132, LY = y => 520 - (y + 4.5) * 31.2;
mk(ls, 'line', { x1: 50, y1: LY(0), x2: 742, y2: LY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, 754, LY(0), 'r', C.ink);
mk(ls, 'line', { x1: LX(0), y1: 540, x2: LX(0), y2: 132, stroke: C.ink, 'stroke-width': 3 }); arrowHead(ls, LX(0), 120, 'u', C.ink);
[1, 2, 3, 4].forEach(v => { mk(ls, 'line', { x1: LX(v), y1: LY(0) - 7, x2: LX(v), y2: LY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ls, LX(v) + (v === 2 ? 14 : 0), LY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
const pinG = mk(ls, 'g', {}); mk(pinG, 'line', { x1: LX(2), y1: 150, x2: LX(2), y2: 530, stroke: VB, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const pinL = txt(pinG, LX(2) + 12, 164, 'midpoint 2', { fill: VB, 'font-weight': 600, 'font-size': 20 });
const lCurve = mk(ls, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const lR = [0, 1].map(() => mk(ls, 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const as = $('#aS'), AX = x => 120 + x * 110, AY = v => 300 - v * 80;
mk(as, 'line', { x1: 50, y1: AY(0), x2: 742, y2: AY(0), stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, 754, AY(0), 'r', C.ink);
mk(as, 'line', { x1: AX(0), y1: 470, x2: AX(0), y2: 152, stroke: C.ink, 'stroke-width': 3 }); arrowHead(as, AX(0), 140, 'u', C.ink);
[1, 2, 3, 4, 5].forEach(v => { mk(as, 'line', { x1: AX(v), y1: AY(0) - 7, x2: AX(v), y2: AY(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(v) + (v === 2 ? 14 : 0), AY(0) + 32, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
[[1, 'i'], [-1, '-i']].forEach(([v, l]) => { mk(as, 'line', { x1: AX(0) - 7, y1: AY(v), x2: AX(0) + 7, y2: AY(v), stroke: C.ink, 'stroke-width': 2 }); txt(as, AX(0) - 14, AY(v) + 6, l, { 'text-anchor': 'end', fill: C.mute, 'font-weight': 600 }); });
txt(as, 742, AY(0) - 14, 'real', { 'text-anchor': 'end', fill: RE, 'font-weight': 600 });
const aPin = mk(as, 'line', { x1: AX(2), y1: 170, x2: AX(2), y2: 440, stroke: VB, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const aIm = [0, 1].map(() => mk(as, 'line', { x1: AX(2), y1: AY(0), x2: AX(2), y2: AY(0), stroke: IM, 'stroke-width': 5, 'stroke-dasharray': '8 6' }));
const aR = [0, 1].map(() => mk(as, 'circle', { r: 13, fill: C.ink, stroke: '#fff', 'stroke-width': 3 }));
const tc0 = wt('L2', 'slide'), tc1 = wt('L4', 'three'), tc2 = wt('L5', 'Past'), tc3 = wt('L6', 'five');
const cAt = t => 3 * M.io((t - tc0) / (tc1 - tc0)) + 2 * M.io((t - tc2) / (tc3 - tc2));
let cLast = null;
const th1 = PUC.think($('#th1'), { q: `In ${K(`x^2 ${bv('- 4')}x + ${cv('c')} = 0`)}, what is ${K(SUM)} when ${K(`${cv('c')} = 100`)}?`, opts: ['4', '100', '-4'], right: 0,
  why: 'c only moves the curve up and down. The midpoint stays at 2, so the sum stays 4.' });

/* ---------- R: proof ---------- */
const RS = [[`${SUM} = \\frac{(-${bv('b')} + \\sqrt{${DD}}) + (-${bv('b')} - \\sqrt{${DD}})}{2${av('a')}}`, 'the root D parts cancel'],
  [`${SUM} = \\frac{-2${bv('b')}}{2${av('a')}} = -\\frac{${bv('b')}}{${av('a')}}`, 'what is left'],
  [`${PRO} = \\frac{${bv('b')}^2 - ${DD}}{4${av('a')}^2}`, '(p + q)(p - q) = p² - q²'],
  [`${PRO} = \\frac{${bv('b')}^2 - ${bv('b')}^2 + 4${av('a')}${cv('c')}}{4${av('a')}^2} = \\frac{${cv('c')}}{${av('a')}}`, 'put D = b² - 4ac back in']];
$('#dSt').innerHTML = RS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${80 + i * 104}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:31px;top:-6px">${K(f)}</div><div class="why" style="top:66px;font-size:19px">${w}</div></div>`).join('');
$('#rRes').innerHTML = K(`${SUM} = -\\frac{${bv('b')}}{${av('a')}} \\qquad ${PRO} = \\frac{${cv('c')}}{${av('a')}}`);
const tDs = [wt('R2', 'Add'), wt('R3', 'left'), wt('R4', 'Multiply'), wt('R5', 'Put')];
const rs = $('#rS'), RX = x => 120 + x * 130, RY = 180;
mk(rs, 'line', { x1: 60, y1: RY, x2: 730, y2: RY, stroke: C.ink, 'stroke-width': 3 });
[0, 1, 2, 3, 4].forEach(v => { mk(rs, 'line', { x1: RX(v), y1: RY - 8, x2: RX(v), y2: RY + 8, stroke: C.ink, 'stroke-width': 2 }); txt(rs, RX(v) + (v === 2 ? 16 : 0), RY + 34, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); });
const rMid = mk(rs, 'line', { x1: RX(2), y1: 92, x2: RX(2), y2: 260, stroke: VB, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
const rDots = [1, 3].map(v => mk(rs, 'circle', { cx: RX(v), cy: RY, r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const rA1 = PUC.arrow(rs, VD, 5, 14), rA2 = PUC.arrow(rs, VD, 5, 14);
$('#rL1').innerHTML = K(`${bv('-\\frac{b}{2a} = 2')}`); $('#rL1').style.cssText += `;left:${RX(2) + 16}px;top:76px`;
$('#rL2').innerHTML = K(`\\pm\\frac{\\sqrt{${DD}}}{2${av('a')}}\\ \\text{cancel}`); $('#rL2').style.cssText += `;left:${RX(2) - 40}px;top:${RY + 52}px`;
const RU = 76, rx0 = 120, ry0 = 340;
const rRect = mk(rs, 'g', {}); mk(rRect, 'rect', { x: rx0, y: ry0, width: 3 * RU, height: RU, fill: '#E3F3F3', stroke: VC, 'stroke-width': 3 });
[1, 2].forEach(k => mk(rRect, 'line', { x1: rx0 + k * RU, y1: ry0, x2: rx0 + k * RU, y2: ry0 + RU, stroke: VC, 'stroke-width': 1.5, opacity: 0.6 }));
txt(rRect, rx0 - 14, ry0 + RU / 2 + 7, 'α = 1', { 'text-anchor': 'end', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
txt(rRect, rx0 + 1.5 * RU, ry0 + RU + 34, 'β = 3', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
$('#rL3').innerHTML = K(`${PRO} = 3 = \\frac{${cv('c')}}{${av('a')}}`); $('#rL3').style.cssText += `;left:${rx0 + 3 * RU + 40}px;top:${ry0 + 12}px`;

/* ---------- S: reading the signs ---------- */
const S1R = [[`x^2 ${bv('- 5')}x ${cv('+ 6')} = 0`, ''], [`${PRO} = 6 > 0`, 'same sign'], [`${SUM} = 5 > 0`, 'both positive']];
const S2R = [[`x^2 ${bv('+')} x ${cv('- 6')} = 0`, ''], [`${PRO} = -6 < 0`, 'opposite signs']];
$('#s1R').innerHTML = S1R.map(([f, g], i) => `<div class="sr" id="s1r${i}" style="top:${76 + i * 80}px">${K(f)}${g ? `<span class="tg" style="margin-left:18px;font:600 18px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute)">${g.toUpperCase()}</span>` : ''}</div>`).join('');
$('#s2R').innerHTML = S2R.map(([f, g], i) => `<div class="sr" id="s2r${i}" style="top:${76 + i * 80}px">${K(f)}${g ? `<span class="tg" style="margin-left:18px;font:600 18px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute)">${g.toUpperCase()}</span>` : ''}</div>`).join('');
const nLine = (svg, pts) => { const X = v => 392 + v * 80, Y = 400;
  mk(svg, 'line', { x1: 40, y1: Y, x2: 744, y2: Y, stroke: C.ink, 'stroke-width': 3 });
  for (let v = -4; v <= 4; v++) { mk(svg, 'line', { x1: X(v), y1: Y - 8, x2: X(v), y2: Y + 8, stroke: C.ink, 'stroke-width': v ? 2 : 3.5 }); txt(svg, X(v), Y + 36, v, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
  return pts.map(v => { const g = mk(mk(svg, 'g', { transform: `translate(${X(v)},${Y})` }), 'g', {}); mk(g, 'circle', { r: 12, fill: v > 0 ? C.ok : C.red, stroke: '#fff', 'stroke-width': 3 }); txt(g, 0, -24, v, { 'text-anchor': 'middle', fill: v > 0 ? C.ok : C.red, 'font-weight': 600, 'font-size': 22 }); return g; }); };
const n1 = nLine($('#s1S'), [2, 3]), n2 = nLine($('#s2S'), [2, -3]);
const th2 = PUC.think($('#th2'), { q: `${K(`x^2 ${bv('- 3')}x ${cv('- 10')} = 0`)}: can both roots be positive?`, opts: ['Yes', 'No'], right: 1,
  why: `The product is ${K('-10 < 0')}, so the signs are opposite. Roots: 5 and -2.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${SUM} = -\\frac{${bv('b')}}{${av('a')}} \\qquad\\quad ${PRO} = \\frac{${cv('c')}}{${av('a')}}`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K('\\alpha, \\beta')} are the roots of ${K(`x^2 ${bv('- 5')}x ${cv('+ 3')} = 0`)}.<br>Find ${K('\\alpha^2 + \\beta^2')}.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${SUM} = -\\frac{${bv('-5')}}{${av('1')}} = 5`)],
  [K(`${PRO} = \\frac{${cv('3')}}{${av('1')}} = 3`)],
  [K(`\\alpha^2 + \\beta^2 = (${SUM})^2 - 2${PRO}`)],
  [K(`= 25 - 6 = 19`)],
  [`Found without ${K('\\alpha')} or ${K('\\beta')} themselves`]], { label: 'WORKED EXAMPLE', y0: 200, dy: 74 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W3', 'Alpha'), wt('W4', 'Alpha'), wt('W5', 'So'), wt('W6', 'twenty'), wt('W7', 'without')];
const ws = $('#wS'), SQ = 340, SA = 204, sx0 = 220, sy0 = 92;
const REG = [[sx0, sy0, SA, SA, '#E7EEFD', VB, '\\alpha^2'], [sx0 + SA, sy0, SQ - SA, SA, '#E3F3F3', VC, PRO], [sx0, sy0 + SA, SA, SQ - SA, '#E3F3F3', VC, PRO], [sx0 + SA, sy0 + SA, SQ - SA, SQ - SA, '#E7EEFD', VB, '\\beta^2']];
const wReg = REG.map(([x, y, w, h, f, s, l]) => { const r = mk(ws, 'rect', { x, y, width: w, height: h, fill: f, stroke: s, 'stroke-width': 3 });
  const d = document.createElement('div'); d.className = 'lab'; d.innerHTML = K(l); d.style.left = (x + w / 2 - 30) + 'px'; d.style.top = (y + h / 2 - 22) + 'px'; $('#wSq').appendChild(d); return { r, d }; });
const wEdge = [['\\alpha', sx0 + SA / 2, sy0 - 44], ['\\beta', sx0 + SA + (SQ - SA) / 2, sy0 - 44], ['\\alpha', sx0 - 44, sy0 + SA / 2 - 20], ['\\beta', sx0 - 44, sy0 + SA + (SQ - SA) / 2 - 20]].map(([l, x, y]) => {
  const d = document.createElement('div'); d.className = 'lab'; d.innerHTML = K(l); d.style.left = x - 8 + 'px'; d.style.top = y + 'px'; $('#wSq').appendChild(d); return d; });
const wFor = document.createElement('div'); wFor.className = 'lab'; wFor.style.cssText = 'left:36px;top:470px;font-size:30px'; wFor.innerHTML = K(`(${SUM})^2 = \\alpha^2 + 2${PRO} + \\beta^2`); $('#wSq').appendChild(wFor);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${SUM} = \\frac{${bv('b')}}{${av('a')}} = -\\frac{7}{2}`), right: K(`${SUM} = -\\frac{${bv('b')}}{${av('a')}} = \\frac{7}{2}`), y1: 176 });
const ts = $('#tS');
const tChkL = txt(ts, 24, 104, 'CHECK WITH THE ROOTS 3 AND 1/2', { 'font-size': 18, 'letter-spacing': 1.5, fill: C.mute, 'font-weight': 600 });
const tChk = txt(ts, 24, 150, '3 + 1/2 = 7/2', { 'font-size': 32, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Find expressions like 1/α² + 1/β² from the sum and product (JEE Main, 24 June 2022, Shift 1)' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K('\\alpha, \\beta')} are the roots of ${K('2x^2 - 6x + 3 = 0')}.<br>Find ${K('\\dfrac{1}{\\alpha^2} + \\dfrac{1}{\\beta^2}')}`,
  opts: [K('\\tfrac{4}{3}'), K('2'), K('\\tfrac{8}{3}'), K('4')], right: 2, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`${SUM} = 3,\\ \\ ${PRO} = \\tfrac{3}{2}`)], [K(`\\alpha^2 + \\beta^2 = 9 - 3 = 6`)], [K(`\\tfrac{1}{\\alpha^2} + \\tfrac{1}{\\beta^2} = \\tfrac{\\alpha^2 + \\beta^2}{(${PRO})^2}`)], [K(`= 6 \\div \\tfrac{9}{4} = \\tfrac{8}{3}`)]], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'Alpha'), wt('A3', 'Nine'), wt('A4', 'common'), wt('A4', 'six')];
const fc = PUC.fcard($('#sF'), { x: 330, y: 252, w: 1260, h: 492, title: 'Recap · roots and coefficients', y0: 98, dy: 80, txt: [1, 0, 0, 0, 1],
  lines: [`<b>Roots</b> ${K('\\alpha, \\beta')} of ${K(`${av('a')}x^2 + ${bv('b')}x + ${cv('c')} = 0`)}, real or complex`,
    K(`\\text{Sum: } ${SUM} = -\\frac{${bv('b')}}{${av('a')}}`),
    K(`\\text{Product: } ${PRO} = \\frac{${cv('c')}}{${av('a')}}`),
    K(`\\alpha^2 + \\beta^2 = (${SUM})^2 - 2${PRO}`),
    `Product negative: opposite signs. Product positive: same sign`] });
const YQ = [`Find the sum and product of the roots of ${K('3x^2 + 6x - 9 = 0')}.`, 'Why do the imaginary parts cancel when you add a conjugate pair?', `${K('\\alpha, \\beta')} are the roots of ${K('x^2 - 7x + 10 = 0')}. Find ${K('\\alpha^2 + \\beta^2')}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 48', topic: 'Give two roots, build the equation: Formation of Quadratics', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPush = wt('L2', 'pinned') - 0.3;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPush, 1.1, 620, 600], [T0('L3') + 0.6, 1, 960, 540]]);
let ghX = null;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  if (ghX === null) { ghX = 160 + $('#nchip').offsetWidth + 16; $('#gh').style.left = ghX + 'px'; }
  M.vis($('#gh'), t, tMorph + 0.8, tQ - 0.05, { dy: 0, dx: -16, outDur: 0.01 });

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    HR.forEach((_, i) => PUC.write($('#hr' + i), t, tHr[i] - 0.05, 0.7));
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H3', 'answers') - 0.1, wt('H5', 'hiding') - 0.1, POP);
    M.vis($('#hkP2'), t, wt('H5', 'hiding'), 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#df'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#abBig'), t, wt('P1', 'alpha') - 0.1, 0.8);
    M.vis($('#dr0'), t, wt('P2', 'answers') - 0.1, 1e9, { dy: 14 }); M.vis($('#dr1'), t, wt('P2', 'real') - 0.1, 1e9, { dy: 14 });
    M.vis($('#pf'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#ff0'), t, wt('P3', 'alpha') - 0.05, 1.0); PUC.write($('#ff1'), t, wt('P4', 'beta') - 0.05, 1.0);
    M.vis($('#pfP'), t, wt('P4', 'Same') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L7');
    M.vis($('#lg'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#lFx'), t, wt('L1', 'equals') - 0.2, 0.9);
    const c = cAt(t), ck = c.toFixed(3);
    M.vis($('#cRd'), t, wt('L1', 'counting') - 0.1, 1e9, { dy: 10 });
    if (ck !== cLast) {
      cLast = ck; M.setT($('#cV'), c.toFixed(2));
      attr(lCurve, 'd', path(x => x * x - 4 * x + c, -0.45, 4.45, LX, LY));
      const r = Math.sqrt(Math.max(0, 4 - c)), q = Math.sqrt(Math.max(0, c - 4));
      lR.forEach((d, i) => { attr(d, 'cx', LX(2 + (i ? r : -r)).toFixed(1)); attr(d, 'cy', LY(0)); });
      aR.forEach((d, i) => { attr(d, 'cx', AX(2 + (i ? r : -r)).toFixed(1)); attr(d, 'cy', AY(i ? -q : q).toFixed(1)); attr(d, 'fill', c > 4.001 ? C.ink : RE); });
      aIm.forEach((l, i) => attr(l, 'y2', AY(i ? -q : q).toFixed(1)));
      const s = (2 - r) + (2 + r), p = c <= 4 ? (2 - r) * (2 + r) : 4 + q * q;
      $('#sumRd').innerHTML = `<i>α</i> + <i>β</i> = ${f2(s)}`; $('#proRd').innerHTML = `<i>αβ</i> = ${f2(p)}`;
      $('#rRo').innerHTML = c < 3.9995 ? `<span class="re">${f2(2 - r)}</span> and <span class="re">${f2(2 + r)}</span>` : c <= 4.0005 ? `<span class="re">2</span> and <span class="re">2</span>` : `<span class="re">2</span> ± <span class="im">${f2(q)}</span><i class="iu">i</i>`;
    }
    M.vis(lCurve, t, wt('L1', 'squared'), 1e9, { dy: 0, fade: 0.3 });
    lR.forEach(d => { const on = t >= wt('L2', 'roots') - 0.1 && c < 4.02; d.style.opacity = on ? M.clamp((4.02 - c) / 0.02) : 0; M.hide(d, !on); });
    M.vis(pinG, t, wt('L2', 'midpoint') - 0.1, 1e9, { dy: 0, fade: 0.25 });
    M.vis($('#la'), t, wt('L2', 'roots') - 0.1, out, { dx: 60, dy: 0, ...o });
    aR.forEach(d => M.vis(d, t, wt('L2', 'roots') + 0.2, 1e9, { dy: 0, fade: 0.15 }));
    M.vis(aPin, t, wt('L2', 'pinned') - 0.1, 1e9, { dy: 0, fade: 0.25 });
    const cpx = M.clamp((c - 4) / 0.25); aIm.forEach(l => { l.style.opacity = cpx; });
    M.vis($('#rRo'), t, wt('L2', 'roots') + 0.3, 1e9, { dy: 10 });
    M.vis($('#sumRd'), t, wt('L3', 'sum') - 0.1, 1e9, { dy: 10 });
    M.vis($('#proRd'), t, wt('L4', 'product') - 0.1, 1e9, { dy: 10 });
    M.vis($('#th1'), t, tL7 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tL7, tOpts: wt('L7', 'sum') - 0.1, tCount: T1('L7') + 0.05, dur: 3, tAns: T0('L8') - 0.02, tWhy: wt('L8', 'only') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tS1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('S1');
    M.vis($('#dp'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    RS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 104]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#rRes'), t, wt('R6', 'sum') - 0.1, 1e9, POP);
    M.vis($('#rC'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    rDots.forEach((d, i) => M.vis(d, t, tR1 + 0.7 + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    const ua = M.io((t - wt('R2', 'cancel') + 0.2) / 0.5), yA = RY + 30;
    rA1.set(RX(2), yA, RX(2) - 130 * ua, yA); rA2.set(RX(2), yA, RX(2) + 130 * ua, yA);
    M.vis($('#rL2'), t, wt('R2', 'cancel') + 0.2, 1e9, { dy: 10 });
    M.draw(rMid, t, wt('R3', 'left') - 0.1, 0.6); M.vis($('#rL1'), t, wt('R3', 'left') + 0.2, 1e9, { dy: 10 });
    M.vis(rRect, t, tDs[2] - 0.1, 1e9, { dy: 16 });
    M.vis($('#rL3'), t, wt('R5', 'over') - 0.1, 1e9, { dx: -12, dy: 0 });
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#s1'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [T0('S2') + 0.05, wt('S2', 'Product'), wt('S2', 'Sum')].forEach((tt, i) => PUC.write($('#s1r' + i), t, tt - 0.1, 0.7));
    n1.forEach((g, i) => M.vis(g, t, wt('S2', 'They') + i * 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s1P'), t, wt('S2', 'They') + 0.4, 1e9, POP);
    M.vis($('#s2'), t, T0('S3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [T0('S3') + 0.05, wt('S3', 'Product')].forEach((tt, i) => PUC.write($('#s2r' + i), t, tt - 0.1, 0.7));
    n2.forEach((g, i) => M.vis(g, t, wt('S3', 'They') + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis($('#s2P'), t, wt('S3', 'They') + 0.5, 1e9, POP);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'both') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'product') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'sum') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'minus') - 0.2, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W5') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wGh'), t, T0('W5'), 1e9, { dy: 0 });
    const tTwo = wt('W5', 'two'), tMin = wt('W5', 'minus');
    wReg.forEach((g, i) => { const ab = i === 1 || i === 2; M.vis(g.r, t, T0('W5') + 0.1 + i * 0.15, 1e9, { dy: 0, fade: 0.2 }); M.vis(g.d, t, T0('W5') + 0.3 + i * 0.15, 1e9, { dy: 0 });
      if (ab) { const hi = M.io((t - tTwo) / 0.3), gone = M.io((t - tMin) / 0.4); attr(g.r, 'fill', mix('#E3F3F3', '#BFE6E6', hi * (1 - gone))); g.r.style.opacity = (1 - 0.7 * gone).toFixed(3); g.d.style.opacity = (1 - 0.7 * gone).toFixed(3); } });
    wEdge.forEach((d, i) => M.vis(d, t, T0('W5') + 0.2 + i * 0.1, 1e9, { dy: 0 }));
    PUC.write(wFor, t, wt('W5', 'beta') - 0.1, 1.0);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'plus') - 0.1 });
    M.vis(tChkL, t, wt('X3', 'Check') - 0.1, 1e9, { dy: 0 }); M.vis(tChk, t, wt('X3', 'Check') + 0.3, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'expressions') });
    M.vis($('#waG'), t, wt('J1', 'current') - 0.1, 1e9, POP);
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
