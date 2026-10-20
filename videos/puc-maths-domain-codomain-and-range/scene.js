// PUC Maths Ep 17: Domain, codomain and range (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: input x violet, domain A blue, codomain B teal, images / range coral (the rule's output), not hit red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F0';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const fmt = v => Math.abs(v - Math.round(v)) < 0.005 ? String(Math.round(v)) : v.toFixed(2);

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tM1 = T0('M1'), tI1 = T0('I1'), tK1 = T0('K1'), tK4 = T0('K4'), tT = T0('T1'), tG1 = T0('G1'), tG5 = T0('G5');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tG1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: allowed vs scored ---------- */
const LS = [['MARKS ALLOWED', '0 to 100', BC], ['LOWEST SCORED', '41', RC], ['HIGHEST SCORED', '96', RC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Any'), wt('H2', 'lowest'), wt('H2', 'highest')];

/* ---------- H: marks on a number line ---------- */
const hs = $('#hS'), HX = v => 72 + v * 6.4, HY = 300;
const hAl = txt(hs, 72, 150, 'ALLOWED: 0 TO 100', { 'font-size': 20, fill: BC, 'font-weight': 600, 'letter-spacing': 1.5 });
const hBarA = mk(hs, 'line', { x1: HX(0), y1: 196, x2: HX(100), y2: 196, stroke: BC, 'stroke-width': 12, 'stroke-linecap': 'round' });
mk(hs, 'line', { x1: 56, y1: HY, x2: 728, y2: HY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 100; v += 10) { mk(hs, 'line', { x1: HX(v), y1: HY - (v % 50 ? 7 : 12), x2: HX(v), y2: HY + (v % 50 ? 7 : 12), stroke: C.ink, 'stroke-width': 2 }); if (v % 20 === 0 || v === 100) txt(hs, HX(v), HY + 40, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const MK = [41, 47, 53, 58, 62, 66, 70, 74, 77, 81, 85, 90, 96];
const hDots = MK.map((v, i) => mk(hs, 'circle', { cx: HX(v), cy: HY, r: 10, fill: RC, stroke: '#fff', 'stroke-width': 2 }));
const hBarR = mk(hs, 'line', { x1: HX(41), y1: 400, x2: HX(96), y2: 400, stroke: RC, 'stroke-width': 12, 'stroke-linecap': 'round' });
const hRl = txt(hs, 72, 460, 'SCORED: 41 TO 96', { 'font-size': 20, fill: RC, 'font-weight': 600, 'letter-spacing': 1.5 });
const hEnds = [41, 96].map(v => txt(hs, HX(v), 380, v, { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 }));
const hT1 = txt(hs, 712, 150, 'CODOMAIN', { 'text-anchor': 'end', 'font-size': 22, fill: BC, 'font-weight': 700, 'letter-spacing': 2 });
const hT2 = txt(hs, 712, 460, 'RANGE', { 'text-anchor': 'end', 'font-size': 22, fill: RC, 'font-weight': 700, 'letter-spacing': 2 });

/* ---------- P: three words ---------- */
$('#pF').innerHTML = K(`f : ${ac('A')} \\to ${bc('B')}`);
const PR = [['DOMAIN', AC, ac('A'), 'every input it takes'], ['CODOMAIN', BC, bc('B'), 'every output allowed'], ['RANGE', RC, `\\{\\, ${rc('f(x)')} : ${xc('x')} \\in ${ac('A')} \\,\\}`, 'outputs it really gives']];
$('#pRows').innerHTML = PR.map(([n, col, f, w], i) => `<div class="dr" id="pr${i}" style="top:${190 + i * 120}px"><div class="dn" style="color:${col}">${n}</div><div class="df">${K(f)}</div><div class="dw">${w}</div></div>`).join('');
const tPr = [T0('P3'), T0('P4'), T0('P5')];
const ps = $('#pS');
const pA = mk(ps, 'ellipse', { cx: 200, cy: 300, rx: 110, ry: 190, fill: ACB, stroke: AC, 'stroke-width': 3 });
const pB = mk(ps, 'ellipse', { cx: 570, cy: 300, rx: 150, ry: 220, fill: BCB, stroke: BC, 'stroke-width': 3 });
const pR = mk(ps, 'ellipse', { cx: 560, cy: 270, rx: 86, ry: 120, fill: C.ac2, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const pAl = txt(ps, 200, 540, 'A · DOMAIN', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600, 'letter-spacing': 1.5 });
const pBl = txt(ps, 570, 560, 'B · CODOMAIN', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600, 'letter-spacing': 1.5 });
const pRl = txt(ps, 560, 178, 'RANGE', { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 700, 'letter-spacing': 2 });
const pAd = [0, 1, 2, 3].map(i => mk(ps, 'circle', { cx: 200, cy: 170 + i * 86, r: 13, fill: XC }));
const pRd = [[560, 220], [530, 300], [590, 340]].map(([x, y]) => mk(ps, 'circle', { cx: x, cy: y, r: 13, fill: RC }));
const pBd = [[480, 140], [660, 180], [470, 440], [640, 450], [700, 300]].map(([x, y]) => mk(ps, 'circle', { cx: x, cy: y, r: 11, fill: '#fff', stroke: BC, 'stroke-width': 3 }));
const pTo = [0, 1, 1, 2];
const pAr = pTo.map(() => PUC.arrow(ps, RC, 4, 14));
const pArP = (i, u) => { const x1 = 216, y1 = 170 + i * 86, [x2, y2] = [[560, 220], [530, 300], [590, 340]][pTo[i]]; const L = Math.hypot(x2 - x1, y2 - y1), e = (L - 18) / L; pAr[i].set(x1, y1, x1 + (x2 - x1) * e * u, y1 + (y2 - y1) * e * u); };

/* ---------- M: live mapping run f(x) = 2x ---------- */
$('#mRule').innerHTML = 'Rule: ' + K('f(x) = 2x');
$('#mRows').innerHTML = [1, 2, 3, 4].map(i => `<div class="mr" id="mr${i}" style="top:${160 + (i - 1) * 74}px"><div class="n">${i}</div><div class="sx">${K(`f(${xc(i)}) = 2 \\times ${xc(i)} = ${rc(2 * i)}`)}</div></div>`).join('');
$('#mRg').innerHTML = K(`\\text{Range} = \\{${rc('2, 4, 6, 8')}\\} \\subset ${bc('B')}`);
const ms = $('#mS'), YA = i => 325 + (i - 2.5) * 84, YB = k => 325 + (k - 4.5) * 52, XA = 200, XB = 580;
const mAo = mk(ms, 'ellipse', { cx: XA, cy: 325, rx: 96, ry: 196, fill: ACB, stroke: AC, 'stroke-width': 3 });
const mBo = mk(ms, 'ellipse', { cx: XB, cy: 325, rx: 104, ry: 236, fill: BCB, stroke: BC, 'stroke-width': 3 });
const mAl = txt(ms, 92, 128, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: AC });
const mBl = txt(ms, 700, 118, 'B', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: BC });
const mArr = [1, 2, 3, 4].map(() => PUC.arrow(ms, RC, 4, 14));
const mA = [1, 2, 3, 4].map(i => { const g = mk(mk(ms, 'g', { transform: `translate(${XA},${YA(i - 1)})` }), 'g', {}); const c = mk(g, 'circle', { r: 24, fill: '#fff', stroke: XC, 'stroke-width': 3 }); const tt = txt(g, 0, 8, i, { 'text-anchor': 'middle', 'font-size': 24, fill: XC, 'font-weight': 600 }); return { g, c, tt }; });
const mB = [1, 2, 3, 4, 5, 6, 7, 8].map(k => { const g = mk(mk(ms, 'g', { transform: `translate(${XB},${YB(k - 1)})` }), 'g', {}); const c = mk(g, 'circle', { r: 22, fill: '#fff', stroke: BC, 'stroke-width': 3 }); const tt = txt(g, 0, 8, k, { 'text-anchor': 'middle', 'font-size': 22, fill: BC, 'font-weight': 600 }); return { k, g, c, tt }; });
const iPre = txt(ms, XA + 32, YA(2) - 22, 'preimage', { 'text-anchor': 'start', 'font-size': 18, fill: XC, 'font-weight': 600 });
const iImg = txt(ms, XB + 36, YB(5) + 7, 'image', { 'font-size': 18, fill: RC, 'font-weight': 600 });
const iNo = txt(ms, XB + 36, YB(4) + 7, 'no preimage', { 'font-size': 18, fill: C.red, 'font-weight': 600 });
const tMap = i => wt('M2', ['One', 'Two', 'Three', 'Four'][i - 1]);
const mArP = (i, u) => { const x1 = XA + 24, y1 = YA(i - 1), x2 = XB - 22, y2 = YB(2 * i - 1); const L = Math.hypot(x2 - x1, y2 - y1), e = (L - 4) / L; mArr[i - 1].set(x1, y1, x1 + (x2 - x1) * e * u, y1 + (y2 - y1) * e * u); };
// image / preimage
$('#iF').innerHTML = K(`f(${xc('3')}) = ${rc('6')}`);
const IR = [['IMAGE', RC, `${K(rc('6'))} is the image of ${K(xc('3'))}`], ['PREIMAGE', XC, `${K(xc('3'))} is the preimage of ${K(rc('6'))}`], ['NO PREIMAGE', C.red, `${K(red('5'))} in B: no arrow lands on it`]];
$('#iRows').innerHTML = IR.map(([k, col, v], i) => `<div class="iw" id="iw${i}" style="top:${210 + i * 112}px"><div class="ik" style="color:${col}">${k}</div><div class="iv">${v}</div></div>`).join('');
const tIw = [wt('I1', 'image'), wt('I1', 'preimage'), wt('I2', 'codomain')];

/* ---------- K: codomain vs range ---------- */
$('#kcF').innerHTML = K(bc('\\{0, 1, 2, \\dots, 100\\}'));
$('#krF').innerHTML = K(`${rc('41')} \\le \\text{marks scored} \\le ${rc('96')}`);
const kLine = (svg) => { mk(svg, 'line', { x1: 56, y1: 250, x2: 728, y2: 250, stroke: C.ink, 'stroke-width': 3 }); for (let v = 0; v <= 100; v += 10) { mk(svg, 'line', { x1: HX(v), y1: 250 - (v % 50 ? 7 : 12), x2: HX(v), y2: 250 + (v % 50 ? 7 : 12), stroke: C.ink, 'stroke-width': 2 }); if (v % 20 === 0 || v === 100) txt(svg, HX(v), 290, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); } };
const kcs = $('#kcS'); kLine(kcs); const kcBar = mk(kcs, 'line', { x1: HX(0), y1: 222, x2: HX(100), y2: 222, stroke: BC, 'stroke-width': 12, 'stroke-linecap': 'round' });
const krs = $('#krS'); kLine(krs); const krGhost = mk(krs, 'line', { x1: HX(0), y1: 222, x2: HX(100), y2: 222, stroke: BCB, 'stroke-width': 12, 'stroke-linecap': 'round' });
const krBar = mk(krs, 'line', { x1: HX(41), y1: 222, x2: HX(96), y2: 222, stroke: RC, 'stroke-width': 12, 'stroke-linecap': 'round' });
const krDots = MK.map(v => mk(krs, 'circle', { cx: HX(v), cy: 250, r: 9, fill: RC, stroke: '#fff', 'stroke-width': 2 }));
$('#kcE').innerHTML = K(`${rc('\\text{Range}')} \\subset ${bc('\\text{Codomain}')}`);
$('#krE').innerHTML = '<span style="font:600 32px Poppins">Equal: allowed. Bigger: never.</span>';
const th1 = PUC.think($('#th1'), { q: `${K(`f : \\mathbb{N} \\to \\mathbb{N},\\ f(x) = 2x`)}. Is the range all of N?`, opts: ['Yes, all of N', 'No'], right: 1, why: `Outputs are 2, 4, 6, ... Odd numbers are never hit: the range is the even natural numbers.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\text{Range} = \\{\\, ${rc('f(x)')} : ${xc('x')} \\in ${ac('A')} \\,\\} \\subset ${bc('B')}`);

/* ---------- G: live graph of x^2 on [-a, a] ---------- */
$('#gF').innerHTML = K(`f(x) = x^2,\\quad ${ac('-a')} \\le ${xc('x')} \\le ${ac('a')}`);
const gs = $('#gS'), OX = 392, OY = 470, SX = 95, SY = 38, GX = v => OX + v * SX, GY = v => OY - v * SY;
mk(gs, 'line', { x1: 50, y1: OY, x2: 740, y2: OY, stroke: C.ink, 'stroke-width': 2.5 }); mk(gs, 'path', { d: `M744,${OY} l-14,-7 v14 z`, fill: C.ink });
mk(gs, 'line', { x1: OX, y1: 536, x2: OX, y2: 74, stroke: C.ink, 'stroke-width': 2.5 }); mk(gs, 'path', { d: `M${OX},70 l-7,14 h14 z`, fill: C.ink });
txt(gs, 736, OY - 14, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
txt(gs, OX + 16, 92, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
for (let v = -3; v <= 3; v++) { if (!v) continue; mk(gs, 'line', { x1: GX(v), y1: OY - 7, x2: GX(v), y2: OY + 7, stroke: C.ink, 'stroke-width': 2 }); txt(gs, GX(v), OY + 34, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
for (let v = 1; v <= 9; v++) { mk(gs, 'line', { x1: OX - 6, y1: GY(v), x2: OX + 6, y2: GY(v), stroke: C.ink, 'stroke-width': 2 }); if ([1, 4, 9].includes(v)) txt(gs, OX - 14, GY(v) + 6, v, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(gs, OX - 14, OY + 26, '0', { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const pth = (a, b, n = 80) => { let d = ''; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += (i ? 'L' : 'M') + GX(x).toFixed(1) + ',' + GY(x * x).toFixed(1); } return d; };
const gGhost = mk(gs, 'path', { d: pth(-3.2, 3.2), fill: 'none', stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 7' });
const gCur = mk(gs, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const gDom = mk(gs, 'line', { x1: 0, y1: OY, x2: 0, y2: OY, stroke: AC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const gRan = mk(gs, 'line', { x1: OX, y1: OY, x2: OX, y2: OY, stroke: RC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const gGuide = mk(gs, 'line', { x1: OX, y1: 0, x2: 0, y2: 0, stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const gEnd = [0, 1].map(() => mk(gs, 'circle', { r: 8, fill: C.ink }));
const gPts = Array.from({ length: 9 }, () => mk(gs, 'circle', { r: 8, fill: RC, stroke: '#fff', 'stroke-width': 2 }));
const gTr = Array.from({ length: 9 }, () => mk(gs, 'line', { stroke: RC, 'stroke-width': 2, 'stroke-dasharray': '4 5', opacity: 0.7 }));
const tGa = wt('G3', 'domain'), tGa2 = wt('G3', 'four'), tGa3 = wt('G3', 'nine');
const aOf = t => t < tGa2 ? 1 + M.io((t - tGa) / (tGa2 - tGa)) : 2 + M.io((t - tGa2) / Math.max(0.6, tGa3 - tGa2));
const tSl = wt('G4', 'slide');
let gLast = '';
const avA = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: "The range is the curve's shadow on the y axis." });
const th2 = PUC.think($('#th2'), { q: `${K('x')} can be any real number. Is ${K('-1')} in the range of ${K('x^2')}?`, opts: ['Yes', 'No'], right: 1, why: `A square is never negative. The range of ${K('x^2')} on ${K('\\mathbb{R}')} is ${K('[0, \\infty)')}.` });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${ac('A')} = \\{-2, -1, 0, 1, 2\\}`)}<br>${K(`f : ${ac('A')} \\to ${bc('\\mathbb{Z}')},\\ \\ f(${xc('x')}) = ${xc('x')}^2 + 1`)}<br>Find the domain, codomain and range.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{Domain} = ${ac('A')} = \\{-2, -1, 0, 1, 2\\}`)],
  [K(`\\text{Codomain} = ${bc('\\mathbb{Z}')}`) + '&nbsp; (all integers)'],
  [K(`\\text{Images: } ${rc('5, 2, 1, 2, 5')}`)],
  [K(`\\text{Range} = \\{${rc('1, 2, 5')}\\}`)],
  [K(rc('2')) + '&nbsp;has two preimages: ' + K(`${xc('-1')} \\text{ and } ${xc('1')}`)]], { label: 'WORKED EXAMPLE', y0: 236, dy: 68 });
const tW = [wt('W3', 'domain'), wt('W4', 'codomain'), wt('W5', 'image'), wt('W6', 'range'), wt('W7', 'two')];
const ws = $('#wS'), WXa = 200, WXz = 590, WYa = i => 325 + (i - 2) * 86, WYz = v => 325 - (v - 2.5) * 54;
mk(ws, 'ellipse', { cx: WXa, cy: 325, rx: 96, ry: 230, fill: ACB, stroke: AC, 'stroke-width': 3 });
mk(ws, 'rect', { x: WXz - 58, y: 70, width: 116, height: 500, rx: 30, fill: BCB, stroke: BC, 'stroke-width': 3 });
txt(ws, 92, 112, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: AC });
txt(ws, WXz + 76, 112, 'Z', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: BC });
[94, 556].forEach(y => txt(ws, WXz, y, '...', { 'text-anchor': 'middle', 'font-size': 22, fill: BC, 'font-weight': 600 }));
const WA = [-2, -1, 0, 1, 2];
const wArr = WA.map(() => PUC.arrow(ws, RC, 4, 14));
const wA = WA.map((v, i) => { const g = mk(mk(ws, 'g', { transform: `translate(${WXa},${WYa(i)})` }), 'g', {}); const c = mk(g, 'circle', { r: 26, fill: '#fff', stroke: XC, 'stroke-width': 3 }); txt(g, 0, 8, v, { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 }); return { v, g, c }; });
const wZ = [-1, 0, 1, 2, 3, 4, 5, 6].map(v => { const g = mk(mk(ws, 'g', { transform: `translate(${WXz},${WYz(v)})` }), 'g', {}); const c = mk(g, 'circle', { r: 22, fill: '#fff', stroke: BC, 'stroke-width': 3 }); const tt = txt(g, 0, 8, v, { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 }); return { v, g, c, tt }; });
const W5w = ['Five', 'two', 'one', 'two', 'five'], W5n = [0, 0, 0, 1, 1];
const tWa = i => wt('W5', W5w[i], W5n[i]);
const wArP = (i, u) => { const v = WA[i], x1 = WXa + 26, y1 = WYa(i), x2 = WXz - 22, y2 = WYz(v * v + 1); const L = Math.hypot(x2 - x1, y2 - y1), e = (L - 4) / L; wArr[i].set(x1, y1, x1 + (x2 - x1) * e * u, y1 + (y2 - y1) * e * u); };

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`x^2,\\ -2 \\le x \\le 1:\\ \\text{range} = [1, 4]`), right: K(`\\text{range} = [0, 4]`) + '&nbsp; 0 is inside, and 0² = 0' });
const ts = $('#tS'), TOX = 300, TOY = 224, TSX = 66, TSY = 40, TX = v => TOX + v * TSX, TY = v => TOY - v * TSY;
mk(ts, 'line', { x1: 140, y1: TOY, x2: 420, y2: TOY, stroke: C.ink, 'stroke-width': 2 }); mk(ts, 'line', { x1: TOX, y1: 242, x2: TOX, y2: 44, stroke: C.ink, 'stroke-width': 2 });
[-2, -1].forEach(v => txt(ts, TX(v), TOY + 24, v, { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 }));
[1, 4].forEach(v => { mk(ts, 'line', { x1: TOX - 5, y1: TY(v), x2: TOX + 5, y2: TY(v), stroke: C.ink, 'stroke-width': 2 }); });
let td = ''; for (let i = 0; i <= 60; i++) { const x = -2 + 3 * i / 60; td += (i ? 'L' : 'M') + TX(x).toFixed(1) + ',' + TY(x * x).toFixed(1); }
const tCurve = mk(ts, 'path', { d: td, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
const tBad = mk(ts, 'line', { x1: TOX - 26, y1: TY(1), x2: TOX - 26, y2: TY(4), stroke: C.red, 'stroke-width': 8, 'stroke-linecap': 'round' });
const tGood = mk(ts, 'line', { x1: TOX + 26, y1: TY(0), x2: TOX + 26, y2: TY(4), stroke: C.ok, 'stroke-width': 8, 'stroke-linecap': 'round' });
const tEnds = [[-2, 4, '(-2, 4)', 'end', -14], [1, 1, '(1, 1)', 'start', 14]].map(([x, y, s, an, dx]) => { const g = mk(ts, 'g', {}); mk(g, 'circle', { cx: TX(x), cy: TY(y), r: 9, fill: C.red }); txt(g, TX(x) + dx, TY(y) + 6, s, { 'text-anchor': an, 'font-size': 18, fill: C.red, 'font-weight': 600 }); return g; });
const tV = mk(ts, 'g', {}); mk(tV, 'circle', { cx: TX(0), cy: TY(0), r: 10, fill: C.ok }); txt(tV, TX(0) + 10, TOY + 26, '(0, 0)', { 'text-anchor': 'start', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find the range, or the codomain that equals the range. Boards: find the domain and range.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`f(x) = x^2 - 4x + 7,\\quad -1 \\le x \\le 4`)}<br>What is the range of f?`,
  opts: [K('[7,\\ 12]'), K('[3,\\ 12]'), K('[3,\\ 7]'), K('[0,\\ 12]')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`f(x) = (x - 2)^2 + 3`)], [K(`-3 \\le x - 2 \\le 2`)], [K(`0 \\le (x - 2)^2 \\le 9`)], [K(`3 \\le f(x) \\le 12`)], ['Ends only: ' + K('[7, 12]') + ', the trap']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Complete'), wt('A3', 'runs'), wt('A4', 'square'), wt('A5', 'Add'), wt('A5', 'ends')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · domain, codomain, range', y0: 100, dy: 78, txt: [0, 0, 1, 1, 0],
  lines: [K(`f : ${ac('A')} \\to ${bc('B')} \\qquad \\text{domain } ${ac('A')},\\ \\text{codomain } ${bc('B')}`),
    K(`\\text{Range} = \\{\\, ${rc('f(x)')} : ${xc('x')} \\in ${ac('A')} \\,\\} \\subset ${bc('B')}`),
    `<b>Image</b>: ${K(`f(${xc('3')}) = ${rc('6')}`)}, so 6 is the image of 3, and 3 its preimage`,
    '<b>Range</b>: outputs that really appear. Check inside, not only the ends',
    K(`x^2 \\text{ on } [-2, 1]: \\text{ range } = ${rc('[0, 4]')}`)] });
const YQ = [`${K('f(x) = x^2')} on ${K('\\{1, 2, 3\\}')}. What is the range?`, 'Can the range ever be bigger than the codomain?', `Find the range of ${K('x^2')} for ${K('-3 \\le x \\le 2')}.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 18', topic: 'One number for every hour: Real-Valued Functions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('M4', 'look') - 0.2, 1.04, 1010, 550], [T0('M5') + 0.2, 1, 960, 540], [tSl - 0.3, 1.04, 1010, 550], [T1('G4'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: allowed vs scored */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hAl, t, tMorph + 0.3, 1e9, { dy: 0 }); M.draw(hBarA, t, tMorph + 0.35, 0.7);
    hDots.forEach((d, i) => M.vis(d, t, wt('H2', 'results') + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(hBarR, t, wt('H2', 'lowest'), 1.2); M.vis(hRl, t, wt('H2', 'lowest'), 1e9, { dy: 0 });
    M.vis(hEnds[0], t, wt('H2', 'forty'), 1e9, POP); M.vis(hEnds[1], t, wt('H2', 'ninety'), 1e9, POP);
    M.vis($('#hGh'), t, wt('H2', 'results') + 0.4, 1e9, { dy: 10 });
    M.vis(hT1, t, wt('H5', 'codomain') - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(hT2, t, wt('H5', 'range') - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'which') - 0.1, 1e9, POP);
  }

  /* P: three words */
  const pOn = t >= tP1 - 0.1 && t < tM1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('M1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P2', 'write') - 0.05, 0.8);
    PR.forEach((_, i) => M.vis($('#pr' + i), t, tPr[i] - 0.05, 1e9, { dy: 16 }));
    M.vis($('#pr'), t, T0('P2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(pA, t, wt('P2', 'inputs') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(pAl, t, tPr[0], 1e9, { dy: 0 });
    pAd.forEach((d, i) => M.vis(d, t, wt('P2', 'inputs') + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(pB, t, wt('P2', 'outputs') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(pBl, t, tPr[1], 1e9, { dy: 0 });
    pBd.forEach((d, i) => M.vis(d, t, wt('P2', 'outputs') + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    pRd.forEach((d, i) => { M.vis(d, t, wt('P2', 'outputs') + 0.4 + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); attr(d, 'fill', mix('#FFFFFF', RC, M.io((t - wt('P5', 'actually')) / 0.4))); attr(d, 'stroke', BC); attr(d, 'stroke-width', 3 * (1 - M.io((t - wt('P5', 'actually')) / 0.4))); });
    pTo.forEach((_, i) => pArP(i, M.io((t - wt('P5', 'outputs') - i * 0.15) / 0.5)));
    M.vis(pR, t, wt('P5', 'actually') + 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(pRl, t, wt('P5', 'actually') + 0.2, 1e9, { dy: 0 });
  }

  /* M + I: live mapping, then image and preimage */
  const mOn = t >= tM1 - 0.1 && t < tK1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('K1'), tIo = tI1 - 0.3;
    M.vis($('#ml'), t, tM1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const aOn = M.vis($('#mA'), t, null, tIo, { dy: 0, outDur: 0.3, ody: -12 }); M.vis($('#mLb'), t, tM1 + 0.2, tIo, { dy: 10, outDur: 0.3 });
    if (aOn) {
      M.vis($('#mRule'), t, wt('M1', 'rule') - 0.1, 1e9, POP);
      const done = [1, 2, 3, 4].filter(i => t >= tMap(i) + 0.45).length;
      M.setT($('#mCnt'), t < T0('M4') ? `${done} / 4 inputs mapped` : `${[2, 4, 6, 8].length} of 8 hit`); M.vis($('#mCnt'), t, tMap(1) - 0.2, 1e9, POP);
      [1, 2, 3, 4].forEach(i => { const r = $('#mr' + i); M.vis(r.querySelector('.n'), t, tMap(i) - 0.1, 1e9, { ...POP, sc: 0.4 }); PUC.write(r.querySelector('.sx'), t, tMap(i), 0.5); });
      const hy = M.track(160, [2, 3, 4].map(i => [tMap(i) - 0.1, 160 + (i - 1) * 74]), M.SOFT)(t), hb = $('#mHi');
      const hOnU = M.io((t - tMap(1) + 0.2) / 0.3) * (1 - M.io((t - T0('M3')) / 0.4)); hb.style.top = (hy - 6).toFixed(1) + 'px'; hb.style.opacity = hOnU.toFixed(3); M.hide(hb, hOnU < 0.01);
      PUC.write($('#mRg'), t, wt('M5', 'range') - 0.05, 0.9);
    }
    const bOn = M.vis($('#mB'), t, tI1 - 0.05, 1e9, { dy: 16 });
    if (bOn) { PUC.write($('#iF'), t, wt('I1', 'three') - 0.1, 0.7); IR.forEach((_, i) => M.vis($('#iw' + i), t, tIw[i] - 0.1, 1e9, { dy: 14 })); }
    M.vis($('#mr'), t, wt('M1', 'A') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(mAo, t, wt('M1', 'A'), 1e9, { dy: 0, fade: 0.25 }); M.vis(mAl, t, wt('M1', 'A') + 0.1, 1e9, { dy: 0 });
    M.vis(mBo, t, wt('M1', 'B'), 1e9, { dy: 0, fade: 0.25 }); M.vis(mBl, t, wt('M1', 'B') + 0.1, 1e9, { dy: 0 });
    const tLook = wt('M4', 'never') - 0.1, tRg = wt('M5', 'range'), tIh = wt('I1', 'three') - 0.1, tNo = wt('I2', 'five') - 0.15;
    const foc = M.io((t - tIh) / 0.3);
    mA.forEach((e, i) => { M.vis(e.g, t, wt('M1', 'A') + 0.2 + i * 0.1, 1e9, { dy: 0, fade: 0.12 }); const hi = M.io((t - tMap(i + 1) + 0.1) / 0.25) * (1 - M.io((t - tMap(i + 1) - 0.6) / 0.3)); attr(e.c, 'fill', mix('#FFFFFF', '#EDE6FC', hi)); e.g.parentNode.style.opacity = i === 2 ? '' : (1 - 0.75 * foc).toFixed(3); });
    mB.forEach(e => {
      M.vis(e.g, t, wt('M1', 'B') + 0.2 + (e.k - 1) * 0.06, 1e9, { dy: 0, fade: 0.12 });
      const ev = e.k % 2 === 0, hit = ev ? M.io((t - tMap(e.k / 2) - 0.45) / 0.25) : 0, miss = ev ? 0 : M.io((t - tLook - (e.k - 1) * 0.08) / 0.3);
      attr(e.c, 'fill', ev ? mix('#FFFFFF', C.ac2, hit) : '#FFFFFF'); attr(e.c, 'stroke', ev ? mix(BC, RC, hit) : mix(BC, C.dim, miss)); attr(e.tt, 'fill', ev ? mix(BC, RC, hit) : mix(BC, C.dim, miss));
      attr(e.c, 'stroke-dasharray', miss > 0.5 ? '5 4' : 'none'); attr(e.c, 'stroke-width', ev ? (3 + 1.5 * M.io((t - tRg) / 0.3)).toFixed(2) : 3);
      const keep = e.k === 6 || (e.k === 5 && t >= tNo); e.g.parentNode.style.opacity = keep ? '' : (1 - 0.7 * foc).toFixed(3);
      if (e.k === 5) { const r = M.io((t - tNo) / 0.3); attr(e.c, 'stroke', mix(mix(BC, C.dim, miss), C.red, r)); attr(e.tt, 'fill', mix(mix(BC, C.dim, miss), C.red, r)); }
    });
    [1, 2, 3, 4].forEach(i => { mArP(i, M.io((t - tMap(i)) / 0.45)); mArr[i - 1].g.style.opacity = i === 3 ? '' : (1 - 0.8 * foc).toFixed(3); });
    M.vis(iPre, t, wt('I1', 'preimage') - 0.1, 1e9, { dy: 0 }); M.vis(iImg, t, wt('I1', 'image') - 0.1, 1e9, { dy: 0 }); M.vis(iNo, t, tNo, 1e9, { dy: 0 });
  }

  /* K: codomain vs range + pause and think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#kc'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#kcF'), t, wt('K1', 'chosen') - 0.1, 0.8); M.draw(kcBar, t, wt('K1', 'allowed') - 0.1, 0.8);
    M.vis($('#kcP'), t, wt('K1', 'allowed'), 1e9, POP);
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(krGhost, t, T0('K2') + 0.2, 1e9, { dy: 0 });
    krDots.forEach((d, i) => M.vis(d, t, wt('K2', 'running') + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(krBar, t, wt('K2', 'forty') - 0.1, 0.8); PUC.write($('#krF'), t, wt('K2', 'outputs') - 0.1, 0.8);
    M.vis($('#krP'), t, wt('K2', 'really') - 0.1, 1e9, POP);
    PUC.write($('#kcE'), t, wt('K3', 'subset') - 0.2, 0.8); M.vis($('#krE'), t, wt('K3', 'equal') - 0.1, 1e9, { dy: 12 });
    M.vis($('#th1'), t, tK4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'range') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'outputs') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'codomain') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'range') - 0.2, 0.8);
  }

  /* G: live graph */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('G5');
    M.vis($('#gl'), t, tG1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#gF'), t, wt('G1', 'Take') - 0.05, 0.9);
    M.vis($('#gA'), t, wt('G1', 'minus') - 0.1, 1e9, { dy: 14 });
    M.vis($('#gr0'), t, wt('G2', 'domain') - 0.1, 1e9, { dy: 14 }); M.vis($('#gr1'), t, wt('G2', 'range') - 0.1, 1e9, { dy: 14 });
    M.vis($('#gp'), t, tG1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const a = Math.round(aOf(t) * 100) / 100, key = a.toFixed(2);
    if (key !== gLast) { gLast = key; M.setT($('#gAv'), a.toFixed(2)); $('#gDv').innerHTML = K(ac(`[-${fmt(a)},\\ ${fmt(a)}]`)); $('#gRv').innerHTML = K(rc(`[0,\\ ${fmt(a * a)}]`)); attr(gCur, 'd', pth(-a, a)); }
    M.vis(gGhost, t, wt('G1', 'squared'), 1e9, { dy: 0, fade: 0.3 });
    const cu = M.io((t - wt('G1', 'minus') + 0.1) / 0.8); M.hide(gCur, cu <= 0); gCur.style.opacity = cu.toFixed(3);
    const dOn = M.io((t - wt('G2', 'domain') + 0.1) / 0.4), rOn = M.io((t - wt('G2', 'range') + 0.1) / 0.4);
    attr(gDom, 'x1', GX(-a * dOn).toFixed(1)); attr(gDom, 'x2', GX(a * dOn).toFixed(1)); M.hide(gDom, dOn <= 0);
    attr(gRan, 'y2', GY(a * a * rOn).toFixed(1)); M.hide(gRan, rOn <= 0);
    attr(gGuide, 'y1', GY(a * a).toFixed(1)); attr(gGuide, 'y2', GY(a * a).toFixed(1)); attr(gGuide, 'x2', GX(a).toFixed(1)); M.hide(gGuide, rOn <= 0); gGuide.style.opacity = rOn.toFixed(3);
    gEnd.forEach((c, i) => { const xv = i ? a : -a; attr(c, 'cx', GX(xv).toFixed(1)); attr(c, 'cy', GY(xv * xv).toFixed(1)); M.hide(c, cu < 0.9); });
    const sl = M.io((t - tSl) / 1.1), fadeP = 1 - M.io((t - T1('G4') + 0.3) / 0.4);
    gPts.forEach((c, i) => { const xv = -a + 2 * a * i / 8, x = GX(xv * (1 - sl)), y = GY(xv * xv); attr(c, 'cx', x.toFixed(1)); attr(c, 'cy', y.toFixed(1)); const on = M.clamp((t - tSl + 0.4) / 0.25) * fadeP; c.style.opacity = on.toFixed(3); M.hide(c, on <= 0.001);
      const ln = gTr[i]; attr(ln, 'x1', GX(xv).toFixed(1)); attr(ln, 'y1', y.toFixed(1)); attr(ln, 'x2', x.toFixed(1)); attr(ln, 'y2', y.toFixed(1)); ln.style.opacity = (0.7 * on).toFixed(3); M.hide(ln, on <= 0.001 || sl <= 0); });
    attr(gRan, 'stroke-width', (10 + 4 * M.io((t - tSl - 1.0) / 0.3) * (1 - M.io((t - tSl - 1.8) / 0.4))).toFixed(2));
    avA(t, wt('G4', 'shadow') + 0.3, out);
    M.vis($('#th2'), t, tG5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG5, tOpts: wt('G5', 'range') - 0.1, tCount: T1('G5') + 0.05, dur: 3, tAns: T0('G6') - 0.02, tWhy: wt('G6', 'square') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const f2 = M.io((t - wt('W7', 'Notice')) / 0.3);
    wA.forEach((e, i) => { M.vis(e.g, t, wt('W2', 'minus') + i * 0.12, 1e9, { dy: 0, fade: 0.12 }); const k = e.v === 1 || e.v === -1; e.g.parentNode.style.opacity = k ? '' : (1 - 0.7 * f2).toFixed(3); attr(e.c, 'fill', k ? mix('#FFFFFF', '#EDE6FC', f2) : '#FFFFFF'); });
    wZ.forEach((e, i) => { M.vis(e.g, t, wt('W2', 'Z') + i * 0.05, 1e9, { dy: 0, fade: 0.12 });
      const hits = WA.map((v, j) => v * v + 1 === e.v ? j : -1).filter(j => j >= 0), h = hits.length ? M.io((t - tWa(hits[0]) - 0.4) / 0.25) : 0;
      attr(e.c, 'fill', mix('#FFFFFF', C.ac2, h)); attr(e.c, 'stroke', mix(BC, RC, h)); attr(e.tt, 'fill', mix(BC, RC, h)); e.g.parentNode.style.opacity = e.v === 2 ? '' : (1 - 0.7 * f2).toFixed(3); });
    WA.forEach((v, i) => { wArP(i, M.io((t - tWa(i)) / 0.4)); wArr[i].g.style.opacity = (v === 1 || v === -1) ? '' : (1 - 0.8 * f2).toFixed(3); });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.2, tStrike: wt('X3', 'zero') - 0.1, tRight: wt('X3', 'correct') - 0.1 });
    M.draw(tCurve, t, T0('X2') + 0.3, 0.9);
    tEnds.forEach((g, i) => M.vis(g, t, wt('X2', 'ends') + i * 0.2, 1e9, POP));
    M.draw(tBad, t, wt('X2', 'one', 1) - 0.1, 0.5); tBad.style.opacity = (1 - 0.6 * M.io((t - wt('X3', 'zero')) / 0.3)).toFixed(3);
    M.vis(tV, t, wt('X3', 'dips') - 0.1, 1e9, POP); M.draw(tGood, t, wt('X3', 'correct') - 0.1, 0.6);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'find') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
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
