// PUC Maths Ep 85: Algebra of derivatives (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 12): u and u' blue, v and v' teal, the vanishing corner du dv red, the result / derivative coral, x violet
const UC = '#2F6FEB', UB = '#E7EEFD', VC = C.teal, VB = '#DDF1F1', DC = C.ac, XC = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const U = s => `\\textcolor{${UC}}{${s}}`, V = s => `\\textcolor{${VC}}{${s}}`, D = s => `\\textcolor{${DC}}{${s}}`, X = s => `\\textcolor{${XC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const seg = (el, g, x0, y0, m, xa, xb, y0b, y1b) => {
  let a = xa, b = xb; if (Math.abs(m) > 1e-6) { const lo = x0 + (y0b - y0) / m, hi = x0 + (y1b - y0) / m; a = Math.max(a, Math.min(lo, hi)); b = Math.min(b, Math.max(lo, hi)); }
  attr(el, 'x1', g.X(a).toFixed(1)); attr(el, 'y1', g.Y(y0 + m * (a - x0)).toFixed(1)); attr(el, 'x2', g.X(b).toFixed(1)); attr(el, 'y2', g.Y(y0 + m * (b - x0)).toFixed(1));
};
const pathOf = (g, fn, a, b, n = 80) => { let d = ''; for (let i = 0; i <= n; i++) { const u = a + (b - a) * i / n; d += (i ? 'L' : 'M') + g.X(u).toFixed(1) + ',' + g.Y(fn(u)).toFixed(1); } return d; };
const PROD = `(${U('u')}${V('v')})' = ${U("u'")}${V('v')} + ${U('u')}${V("v'")}`;
const QUOT = `\\left(\\dfrac{${U('u')}}{${V('v')}}\\right)' = \\dfrac{${U("u'")}${V('v')} - ${U('u')}${V("v'")}}{${V('v')}^2}`;

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tS1 = T0('S1'), tP1 = T0('P1'), tD1 = T0('D1'), tR1 = T0('R1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['WIDTH', '4 cm, +2 a second'], ['HEIGHT', '3 cm, +3 a second'], ['AREA GROWS BY', '2 × 3 = 6 ?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'width'), wt('H1', 'height'), wt('H2', 'six')];

/* ---------- H: the rectangle grows ---------- */
const hg = $('#hG'), HS = 52, HX = 70, HY = 520;
const hRect = mk(hg, 'rect', { x: HX, fill: '#F1F3F7', stroke: C.ink, 'stroke-width': 3, rx: 4 });
const hBot = mk(hg, 'line', { stroke: UC, 'stroke-width': 7, 'stroke-linecap': 'round' }), hLft = mk(hg, 'line', { stroke: VC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hTs = t => 1.5 * M.clamp((t - tMorph - 0.6) / Math.max(1, T1('H4') - tMorph - 0.6));

/* ---------- S: two tanks ---------- */
const sg = $('#sG'), TK = [[80, UC, UB, 'u', '+2 L / min', 2], [290, VC, VB, 'v', '+3 L / min', 3]];
const tS2 = T0('S2'), tS2e = T1('S3');
const tanks = TK.map(([x, col, bg, n, r]) => { mk(sg, 'rect', { x, y: 120, width: 160, height: 300, rx: 10, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); const w = mk(sg, 'rect', { x: x + 3, width: 154, fill: bg, stroke: 'none' }); const sf = mk(sg, 'line', { x1: x + 3, x2: x + 157, stroke: col, 'stroke-width': 4 });
  txt(sg, x + 80, 104, n, { 'text-anchor': 'middle', 'font-size': 34, fill: col, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700 }); const rl = txt(sg, x + 80, 462, r, { 'text-anchor': 'middle', 'font-size': 22, fill: col, 'font-weight': 600 }); return { w, sf, rl }; });
const sTot = mk(mk(sg, 'g', {}), 'g', {}); mk(sTot, 'rect', { x: 500, y: 230, width: 250, height: 96, rx: 14, fill: C.ac2, stroke: DC, 'stroke-width': 3 }); txt(sTot, 625, 266, 'TOGETHER', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 2 }); txt(sTot, 625, 306, '+5 L / min', { 'text-anchor': 'middle', 'font-size': 28, fill: DC, 'font-weight': 600 });
const SS = [[`(${U('u')} + ${V('v')})' = ${U("u'")} + ${V("v'")}`, 'sum rule: the changes add'], [`(${U('u')} - ${V('v')})' = ${U("u'")} - ${V("v'")}`, 'difference rule: use a minus'],
  [`\\tfrac{d}{dx}\\,${X('x')}^{n} = n\\,${X('x')}^{n-1}`, 'the power rule (NCERT)'], [`\\tfrac{d}{dx}\\,${X('x')}^{3} = ${D(`3${X('x')}^{2}`)}`, 'x cubed gives three x squared']];
$('#sSt').innerHTML = SS.map(([f, w], i) => `<div class="st" id="ss${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tSs = [wt('S3', 'derivative'), wt('S3', 'difference'), wt('S5', 'derivative'), wt('S5', 'cubed')];

/* ---------- P: the product picture ---------- */
const pg = $('#pG'), PS = 90, PX = 80, PY = 520, pu = 4, pv = 3, top = PY - pv * PS, rgt = PX + pu * PS;
mk(pg, 'rect', { x: PX, y: top, width: pu * PS, height: pv * PS, fill: '#F1F3F7', stroke: C.ink, 'stroke-width': 3 });
const pIn = txt(pg, PX + pu * PS / 2, top + pv * PS / 2 + 12, 'u × v', { 'text-anchor': 'middle', 'font-size': 32, fill: C.ink2, 'font-weight': 600 });
mk(pg, 'line', { x1: PX, y1: PY, x2: rgt, y2: PY, stroke: UC, 'stroke-width': 7, 'stroke-linecap': 'round' }); mk(pg, 'line', { x1: PX, y1: PY, x2: PX, y2: top, stroke: VC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const pLu = txt(pg, PX + pu * PS / 2, PY + 40, 'u', { 'text-anchor': 'middle', 'font-size': 30, fill: UC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700 });
const pLv = txt(pg, PX - 22, top + pv * PS / 2 + 10, 'v', { 'text-anchor': 'middle', 'font-size': 30, fill: VC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700 });
const pTop = mk(pg, 'rect', { x: PX, width: pu * PS, fill: VB, stroke: VC, 'stroke-width': 2.5 }), pSide = mk(pg, 'rect', { y: top, height: pv * PS, fill: UB, stroke: UC, 'stroke-width': 2.5 }), pCor = mk(pg, 'rect', { fill: C.redBg, stroke: C.red, 'stroke-width': 2.5 });
const pTt = txt(pg, PX + pu * PS / 2, 0, 'u Δv', { 'text-anchor': 'middle', 'font-size': 22, fill: VC, 'font-weight': 600 }), pSt = txt(pg, 0, top + pv * PS / 2 + 8, 'v Δu', { 'text-anchor': 'middle', 'font-size': 20, fill: UC, 'font-weight': 600 });
const pCt = txt(pg, 0, 0, 'ΔuΔv', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const pDl = { v: txt(pg, PX - 24, 0, 'Δv', { 'text-anchor': 'middle', 'font-size': 20, fill: VC, 'font-weight': 600 }), u: txt(pg, 0, PY + 40, 'Δu', { 'text-anchor': 'middle', 'font-size': 20, fill: UC, 'font-weight': 600 }) };
const tG0 = wt('P2', 'grows'), tSk0 = wt('P4', 'shrinks'), tSk1 = wt('P4', 'vanishes') + 0.6;
const pd = t => 0.8 * M.io((t - tG0) / 1.2) * (1 - 0.94 * M.io((t - tSk0) / Math.max(0.8, tSk1 - tSk0)));
const PRW = [[`${U('u')}\\,${V('\\Delta v')}`, 'strip along the top'], [`${V('v')}\\,${U('\\Delta u')}`, 'strip down the side'], [`${red('\\Delta u\\,\\Delta v')}`, 'tiny corner: small times small']];
$('#pRows').innerHTML = PRW.map(([f, w], i) => `<div class="st" id="pw${i}" style="top:${88 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('') + `<i class="sk" id="pSk" style="position:absolute;left:96px;top:${88 + 2 * 112 + 28}px;height:4px;width:0;background:var(--red);border-radius:2px"></i>`;
$('#pRes').innerHTML = K(`\\text{grows at } ${U('u')}\\,${V("v'")} + ${V('v')}\\,${U("u'")}\\ \\ ${red(`\\ne ${U("u'")}\\,${V("v'")}`)}`);
const tPw = [wt('P3', 'top'), wt('P3', 'side'), wt('P4', 'corner')];

/* ---------- D: the rule ---------- */
const DSx = [`\\Delta A = ${U('u')}\\,${V('\\Delta v')} + ${V('v')}\\,${U('\\Delta u')} + ${red('\\Delta u\\,\\Delta v')}`,
  `\\dfrac{\\Delta A}{\\Delta t} = ${U('u')}\\dfrac{${V('\\Delta v')}}{\\Delta t} + ${V('v')}\\dfrac{${U('\\Delta u')}}{\\Delta t} + ${red('\\dfrac{\\Delta u\\,\\Delta v}{\\Delta t}')}`,
  `\\Delta t \\to 0:\\ \\ ${red('\\dfrac{\\Delta u\\,\\Delta v}{\\Delta t} \\to 0')}`, PROD];
const DW = ['the new area: 3 pieces', 'divide by the small time', 'small times small vanishes', 'the Leibnitz rule (product rule)'];
const DY = [84, 192, 334, 456], DH = [100, 136, 116, 100];
$('#dSt').innerHTML = DSx.map((f, i) => `<div class="st${i === 1 || i === 2 ? ' tall' : ''}" id="ds${i}" style="top:${DY[i]}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${i === 1 ? 28 : 32}px">${K(f)}</div><div class="why" style="top:${i === 1 ? 92 : i === 2 ? 78 : 56}px">${DW[i]}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const DR = [`${U('u')} = 4,\\ \\ ${U("u'")} = 2`, `${V('v')} = 3,\\ \\ ${V("v'")} = 3`, `${U('u')}\\,${V("v'")} = 4 \\times 3 = 12`, `${V('v')}\\,${U("u'")} = 3 \\times 2 = 6`, `\\text{grows at } ${D('18')}, \\text{ not } ${red('6')}`];
$('#dRows').innerHTML = DR.map((f, i) => `<div class="kk" id="dr${i}" style="top:${[84, 150, 240, 306, 386][i]}px">${K(f)}</div>`).join('');
const tDr = [tD1 + 0.6, tD1 + 0.9, wt('D6', 'Four'), wt('D6', 'plus'), wt('D6', 'eighteen')];
const avA = PUC.avatar($('#sD'), { x: 976 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So it was never 2 × 3.' });

/* ---------- R: pizza ---------- */
const rg = $('#rG');
const pizza = (cx, cy) => { const g = mk(mk(rg, 'g', {}), 'g', {}); mk(g, 'circle', { cx, cy, r: 76, fill: '#F7D9A8', stroke: '#B7791F', 'stroke-width': 5 }); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; mk(g, 'line', { x1: cx - 72 * Math.cos(a), y1: cy - 72 * Math.sin(a), x2: cx + 72 * Math.cos(a), y2: cy + 72 * Math.sin(a), stroke: '#B7791F', 'stroke-width': 2.5 }); } return g; };
const pz = [pizza(140, 190), pizza(320, 190)];
const person = (x) => { const g = mk(mk(rg, 'g', {}), 'g', {}); mk(g, 'circle', { cx: x, cy: 316, r: 16, fill: C.ink2 }); mk(g, 'path', { d: `M${x - 26},380 q0,-38 26,-38 q26,0 26,38 z`, fill: C.ink2 }); return g; };
const ppl = [0, 1, 2, 3].map(i => person(90 + i * 80));
const rL1 = txt(rg, 470, 196, 'pizza: top (u)', { 'font-size': 20, fill: UC, 'font-weight': 600 }), rL2 = txt(rg, 470, 356, 'people: bottom (v)', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const tRz = wt('R1', 'pizza', 1), tRp = wt('R1', 'people');
$('#rF').innerHTML = K(QUOT);

/* ---------- C ---------- */
$('#c1F').innerHTML = K(`(${U('u')} + ${V('v')})' = ${U("u'")} + ${V("v'")}`);
$('#c1E').innerHTML = K(`\\text{tanks: } ${U('2')} + ${V('3')} = ${D('5')}`);
$('#c2F').innerHTML = K(`(${U('u')}${V('v')})' \\ne ${U("u'")}${V("v'")}`);
$('#c2E').innerHTML = K(`= ${U("u'")}${V('v')} + ${U('u')}${V("v'")}`);
const th1 = PUC.think($('#th1'), { q: 'Is the derivative of x² · x³ equal to 2x · 3x²?', opts: ['Yes', 'No: it is 5x⁴'], right: 1, why: 'x² · x³ = x⁵, so the derivative is 5x⁴. The guess 2x · 3x² = 6x³ is wrong.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(PROD);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find ${K("y'")} at ${K(`${X('x')} = 1`)} for ${K(`y = \\dfrac{${U(`${X('x')}^2`)}}{${V(`${X('x')} + 1`)}}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${U('u')} = ${X('x')}^2,\\ ${U("u'")} = 2${X('x')};\\ \\ ${V('v')} = ${X('x')} + 1,\\ ${V("v'")} = 1`)],
  [K(`y' = \\dfrac{${U("u'")}${V('v')} - ${U('u')}${V("v'")}}{${V('v')}^2}`)],
  [K(`= \\dfrac{2${X('x')}(${X('x')} + 1) - ${X('x')}^2 \\cdot 1}{(${X('x')} + 1)^2}`)],
  [K(`= \\dfrac{${X('x')}^2 + 2${X('x')}}{(${X('x')} + 1)^2}`)],
  [K(`${X('x')} = 1:\\ \\ y' = \\tfrac{3}{4} = ${D('0.75')}`)]], { label: 'WORKED EXAMPLE', y0: 164, dy: 88 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const yq = u => u * u / (u + 1), wg = PUC.graph($('#wG'), { x: 110, y: 120, w: 600, h: 370, xmax: 3.2, ymax: 2.4, xt: [0, 1, 2, 3], yt: [0, 1, 2], xl: 'x' });
const wCurve = mk($('#wG'), 'path', { d: pathOf(wg, yq, 0, 3.2), fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wSec = mk($('#wG'), 'line', { stroke: C.mute, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-dasharray': '8 6' });
const wTan = mk($('#wG'), 'line', { stroke: DC, 'stroke-width': 4, 'stroke-linecap': 'round' }); seg(wTan, wg, 1, 0.5, 0.75, 0, 3.2, 0, 2.4);
const wP = mk(mk($('#wG'), 'g', {}), 'g', {}); mk(wP, 'circle', { cx: wg.X(1), cy: wg.Y(0.5), r: 11, fill: XC });
const wQ = mk($('#wG'), 'circle', { r: 9, fill: '#fff', stroke: C.mute, 'stroke-width': 3.5 });
const tWh0 = wt('W7', 'tiny'), tWh1 = wt('W7', 'same');
const wH = t => Math.pow(10, -3 * M.io((t - tWh0) / Math.max(0.8, tWh1 - tWh0)));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\left(\\tfrac{u}{v}\\right)' = \\dfrac{${red("u v' - u' v")}}{v^2} \\;\\Rightarrow\\; ${red('-\\tfrac34')}`), right: K(`\\left(\\tfrac{u}{v}\\right)' = \\dfrac{u' v - u v'}{v^2} \\;\\Rightarrow\\; \\tfrac34`), y0: 62, y1: 160 });
$('#tR').innerHTML = `<div class="lbl" style="position:static">CHECK THE GRAPH AT x = 1</div><div class="k" id="tR1">${K(`\\text{the curve goes up}`)}</div><div class="k" id="tR2">${K(`\\text{so } y' > 0:\\ \\ \\tfrac34 \\ \\textcolor{${C.ok}}{\\checkmark}`)}</div>`;
$('#tR').style.top = '40px';
const where = PUC.where($('#wa'), { on: [], type: 'A tool inside bigger calculus questions: differentiate sums, products and quotients.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 900,
  q: `${K(`f(x) = x\\,g(x),\\ \\ g(1) = 2,\\ \\ g'(1) = 3`)}<br>${K(`h(x) = \\dfrac{f(x)}{x + 1}`)}. Find ${K(`h'(1)`)}.`,
  opts: ['5/4', '3/2', '2', '5/2'], right: 2, optW: 474, optY: 316 });
const so = PUC.solution($('#so'), [[K(`f(1) = 1 \\cdot g(1) = 2`)], [K(`f'(x) = g(x) + x\\,g'(x)`)], [K(`f'(1) = 2 + 3 = 5`)], [K(`h'(1) = \\dfrac{5 \\cdot 2 - 2 \\cdot 1}{2^2}`)], [K(`= \\dfrac{8}{4} = 2`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'First'), wt('A3', 'By'), wt('A3', 'That'), wt('A4', 'By'), wt('A4', 'Eight')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 230, w: 1200, h: 550, title: 'Recap · algebra of derivatives', y0: 100, dy: 90, txt: [0, 0, 0, 0, 1],
  lines: [K(`(${U('u')} \\pm ${V('v')})' = ${U("u'")} \\pm ${V("v'")}`), K(PROD),
    K(`\\left(\\tfrac{${U('u')}}{${V('v')}}\\right)' = \\tfrac{${U("u'")}${V('v')} - ${U('u')}${V("v'")}}{${V('v')}^2},\\ \\ ${V('v')} \\ne 0`),
    K(`\\tfrac{d}{dx}\\,${X('x')}^{n} = n\\,${X('x')}^{n-1}`),
    '<b>Product</b>: each part takes a turn · <b>quotient</b>: low d high first'] });
const YQ = ['Why is the derivative of a product not the product of the derivatives?', 'Find the derivative of (x + 1)(x + 2).', 'In the quotient rule, which term comes first on top?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 86', topic: 'Same average, very different marks: Mean Deviation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSk0 - 0.3, 1.04, 960, 560], [T1('P5'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tS1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('S1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const s = hTs(t), w = 4 + 2 * s, h = 3 + 3 * s;
    attr(hRect, 'y', (HY - h * HS).toFixed(1)); attr(hRect, 'width', (w * HS).toFixed(1)); attr(hRect, 'height', (h * HS).toFixed(1));
    attr(hBot, 'x1', HX); attr(hBot, 'y1', HY); attr(hBot, 'x2', (HX + w * HS).toFixed(1)); attr(hBot, 'y2', HY);
    attr(hLft, 'x1', HX); attr(hLft, 'y1', HY); attr(hLft, 'x2', HX); attr(hLft, 'y2', (HY - h * HS).toFixed(1));
    M.vis($('#hG'), t, tMorph + 0.2, 1e9, { dy: 0, fade: 0.3 });
    $('#hl').querySelectorAll('.ro').forEach((e, i) => M.vis(e, t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 10 }));
    M.setT($('#hT'), s.toFixed(1) + ' s'); M.setT($('#hW'), w.toFixed(1)); M.setT($('#hH'), h.toFixed(1)); M.setT($('#hR'), (18 + 12 * s).toFixed(1));
    M.vis($('#hP'), t, wt('H4', 'bigger') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tMorph + 0.9, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tP1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('P1');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const f = M.clamp((t - tS2 - 0.5) / Math.max(1, tS2e - tS2 - 0.5));
    tanks.forEach((k, i) => { const lv = 40 + (i ? 3 : 2) * 70 * f, y = 417 - lv; attr(k.w, 'y', y.toFixed(1)); attr(k.w, 'height', lv.toFixed(1)); attr(k.sf, 'y1', y.toFixed(1)); attr(k.sf, 'y2', y.toFixed(1)); M.vis(k.rl, t, wt('S2', i ? 'three' : 'two') - 0.1, 1e9, { dy: 0 }); });
    M.vis($('#sG'), t, tS2 - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis(sTot, t, wt('S2', 'Together') - 0.1, 1e9, { ...POP });
    M.vis($('#sr'), t, T0('S3') - 0.2, out, { dx: 60, dy: 0, ...o });
    SS.forEach((_, i) => { const el = $('#ss' + i); M.vis(el.querySelector('.n'), t, tSs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSs[i] + 0.05, 0.8); M.vis(el.querySelector('.why'), t, tSs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hb = $('#sHi'); M.vis(hb, t, tSs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (M.track(84, tSs.slice(1).map((tt, i) => [tt - 0.05, 84 + (i + 1) * 116]), M.SOFT)(t) - 8).toFixed(1) + 'px';
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pIn, t, wt('P1', 'area') - 0.1, 1e9, { dy: 0 }); M.vis(pLu, t, wt('P1', 'width') - 0.1, 1e9, { dy: 0 }); M.vis(pLv, t, wt('P1', 'height') - 0.1, 1e9, { dy: 0 });
    const d = pd(t), dp = d * PS, gOn = t >= tG0;
    attr(pTop, 'y', (top - dp).toFixed(1)); attr(pTop, 'height', dp.toFixed(1)); attr(pSide, 'x', rgt); attr(pSide, 'width', dp.toFixed(1));
    attr(pCor, 'x', rgt); attr(pCor, 'y', (top - dp).toFixed(1)); attr(pCor, 'width', dp.toFixed(1)); attr(pCor, 'height', dp.toFixed(1));
    [pTop, pSide, pCor].forEach(e => M.hide(e, !gOn || dp < 0.5));
    attr(pTt, 'y', (top - dp / 2 + 8).toFixed(1)); attr(pSt, 'x', (rgt + dp / 2).toFixed(1)); attr(pCt, 'x', (rgt + dp / 2).toFixed(1)); attr(pCt, 'y', (top - dp / 2 + 6).toFixed(1));
    const big = M.clamp((d - 0.45) / 0.2);
    M.vis(pTt, t, tPw[0], 1e9, { dy: 0 }); M.vis(pSt, t, tPw[1], 1e9, { dy: 0 }); M.vis(pCt, t, tPw[2], 1e9, { dy: 0 });
    [pTt, pSt, pCt].forEach(e => { if (t > tSk0) e.style.opacity = big.toFixed(3); });
    attr(pDl.v, 'y', (top - dp / 2 + 7).toFixed(1)); attr(pDl.u, 'x', (rgt + dp / 2).toFixed(1));
    M.vis(pDl.v, t, wt('P2', 'delta', 1) - 0.1, 1e9, { dy: 0 }); M.vis(pDl.u, t, wt('P2', 'delta') - 0.1, 1e9, { dy: 0 }); [pDl.u, pDl.v].forEach(e => { if (t > tSk0) e.style.opacity = big.toFixed(3); });
    M.vis($('#pD'), t, tG0, 1e9, { dy: 8 }); M.setT($('#pDv'), d.toFixed(2));
    M.vis($('#pr'), t, T0('P2') + 0.2, out, { dx: 60, dy: 0, ...o });
    PRW.forEach((_, i) => { const el = $('#pw' + i); M.vis(el.querySelector('.n'), t, tPw[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPw[i] + 0.05, 0.7); M.vis(el.querySelector('.why'), t, tPw[i] + 0.5, 1e9, { dx: -12, dy: 0 }); });
    const sk = M.io((t - wt('P4', 'vanishes')) / 0.4); $('#pSk').style.width = (sk * 260).toFixed(1) + 'px'; M.hide($('#pSk'), sk <= 0);
    if (t > wt('P4', 'vanishes')) $('#pw2').style.opacity = (1 - 0.5 * sk).toFixed(3);
    PUC.write($('#pRes'), t, wt('P5', 'grows') - 0.1, 1.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DSx.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); M.vis(el.querySelector('.why'), t, tDs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const k = tDs.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, 0), hb = $('#dHi');
    M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (M.track(DY[0], tDs.slice(1).map((tt, i) => [tt - 0.05, DY[i + 1]]), M.SOFT)(t) - 8).toFixed(1) + 'px'; hb.style.height = DH[k] + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    DR.forEach((_, i) => i < 2 ? M.vis($('#dr' + i), t, tDr[i], 1e9, { dy: 10 }) : PUC.write($('#dr' + i), t, tDr[i] - 0.1, 0.8));
    avA(t, wt('D6', 'Not') + 0.2, out);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const tz0 = wt('R1', 'pizza') - 0.1;
    M.vis(pz[0], t, tz0, 1e9, { ...POP, sc: 0.5 }); M.vis(pz[1], t, tRz - 0.1, 1e9, { ...POP, sc: 0.5 });
    ppl.forEach((g, i) => M.vis(g, t, i < 2 ? tz0 + 0.2 + i * 0.1 : tRp - 0.1 + (i - 2) * 0.12, 1e9, { ...POP, sc: 0.5 }));
    M.vis(rL1, t, tz0 + 0.4, 1e9, { dy: 0 }); M.vis(rL2, t, tz0 + 0.5, 1e9, { dy: 0 });
    const sh = t < tRz ? 4 : t < tRp ? 8 : 4; M.setT($('#rS'), String(sh));
    $('#rS').style.color = t < tRz ? C.ink : t < tRp ? C.ok : C.red;
    const rp = $('#rP'), lab = t < tRp ? 'More pizza: share goes up' : 'More people: share goes down';
    if (rp._l !== lab) { rp._l = lab; rp.textContent = lab; rp.style.background = t < tRp ? C.okBg : C.redBg; rp.style.color = t < tRp ? '#1F6B3F' : C.red; }
    M.vis(rp, t, tRz, 1e9, POP);
    M.vis($('#rr'), t, T0('R2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#rP1'), t, wt('R2', 'top') - 0.1, 1e9, POP); M.vis($('#rP2'), t, wt('R2', 'bottom') - 0.1, 1e9, POP);
    PUC.write($('#rF'), t, wt('R2', 'rule') - 0.1, 1.4);
    M.vis($('#rP3'), t, wt('R3', 'zero') - 0.3, 1e9, POP);
    M.rise($('#rTr'), t, wt('R4', 'Low') - 0.05, { st: 0.04 });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, wt('C1', 'sum') - 0.1, 0.9); M.vis($('#c1E'), t, wt('C1', 'gives') - 0.1, 1e9, { dy: 10 }); M.vis($('#c1P'), t, wt('C1', 'add') - 0.1, 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, wt('C2', 'product') - 0.1, 0.9); PUC.write($('#c2E'), t, wt('C2', 'Each') - 0.1, 0.9); M.vis($('#c2P'), t, wt('C2', 'other') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'equal') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'But') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'product') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Each') + 0.2, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wCurve, t, T0('W2') + 0.7, 1.0);
    M.vis(wP, t, wt('W2', 'value') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    const h = wH(t), m = (yq(1 + h) - yq(1)) / h; attr(wQ, 'cx', wg.X(1 + h).toFixed(1)); attr(wQ, 'cy', wg.Y(yq(1 + h)).toFixed(1));
    M.vis(wQ, t, T0('W2') + 1.2, tWh1, { dy: 0, fade: 0.1 });
    seg(wSec, wg, 1, 0.5, m, 0, 3.2, 0, 2.4); M.vis(wSec, t, T0('W2') + 1.3, tWh1 + 0.2, { dy: 0, fade: 0.3 });
    M.vis(wTan, t, tWh1 - 0.2, 1e9, { dy: 0, fade: 0.4 });
    M.vis($('#wRh'), t, T0('W2') + 1.3, 1e9, { dy: 8 }); M.vis($('#wRs'), t, T0('W2') + 1.4, 1e9, { dy: 8 });
    M.setT($('#wHv'), h.toFixed(3)); M.setT($('#wSv'), m.toFixed(4));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'slope') - 0.1 });
    M.vis($('#tR'), t, wt('X3', 'graph') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'positive') - 0.3, 1e9, { dy: 8 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'Exam') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Use'), tCount, tAns });
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
