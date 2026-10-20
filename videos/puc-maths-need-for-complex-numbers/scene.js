// PUC Maths Ep 37: Need for complex numbers (Proof board, Chapter 4 opener)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: real part / real numbers blue, imaginary part coral (accent), i violet, modulus teal. Parameter c = coral accent.
const RE = '#2F6FEB', REB = '#E7EEFD', IM = C.violet, IMB = '#EFE9FC', RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ic = s => `\\textcolor{${IM}}{${s}}`, rb = s => `\\textcolor{${RE}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const I = ic('i');
const fm = v => (v < 0 ? '-' : '') + Math.abs(v).toFixed(2);
// eased piecewise value: segs [[tStart, tEnd, target], ...] in time order
const seg = (v0, ks) => t => { let v = v0; for (const [a, b, to] of ks) { const u = M.io((t - a) / Math.max(0.01, b - a)); if (u <= 0) break; v = v + (to - v) * u; } return v; };

/* plot with the origin anywhere (axes through 0), clipped curves */
let cpN = 0;
const plot = (svg, o) => {
  const { x, y, w, h, xmin, xmax, ymin, ymax } = o;
  const X = v => x + (v - xmin) / (xmax - xmin) * w, Y = v => y + h - (v - ymin) / (ymax - ymin) * h;
  const id = 'cpq' + (cpN++), df = mk(svg, 'defs', {}), cp = mk(df, 'clipPath', { id }); mk(cp, 'rect', { x: x - 2, y: y - 2, width: w + 4, height: h + 4 });
  const ax = mk(mk(svg, 'g', {}), 'g', {});
  mk(ax, 'line', { x1: x, y1: Y(0), x2: x + w, y2: Y(0), stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'path', { d: `M${x + w + 4},${Y(0)} l-14,-7 v14 z`, fill: C.ink });
  mk(ax, 'line', { x1: X(0), y1: y + h, x2: X(0), y2: y, stroke: C.ink, 'stroke-width': 2.5 }); mk(ax, 'path', { d: `M${X(0)},${y - 4} l-7,14 h14 z`, fill: C.ink });
  (o.xt || []).forEach(v => { mk(ax, 'line', { x1: X(v), y1: Y(0) - 7, x2: X(v), y2: Y(0) + 7, stroke: C.ink, 'stroke-width': 2 }); txt(ax, X(v), Y(0) + 32, v, { 'text-anchor': 'middle', fill: C.mute }); });
  (o.yt || []).forEach(v => { mk(ax, 'line', { x1: X(0) - 7, y1: Y(v), x2: X(0) + 7, y2: Y(v), stroke: C.ink, 'stroke-width': 2 }); txt(ax, X(0) - 14, Y(v) + 6, v, { 'text-anchor': 'end', fill: C.mute }); });
  txt(ax, x + w - 4, Y(0) - 16, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'font-weight': 600, 'text-anchor': 'end' });
  txt(ax, X(0) + 16, y + 14, 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
  const curve = (col, sw = 5, a = {}) => { const p = mk(svg, 'path', Object.assign({ d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'clip-path': `url(#${id})` }, a)); return (f, a0, a1, n = 90) => { if (a1 <= a0) { attr(p, 'd', ''); return p; } let d = ''; for (let i = 0; i <= n; i++) { const s = a0 + (a1 - a0) * i / n; d += (i ? 'L' : 'M') + X(s).toFixed(1) + ',' + Y(Math.max(ymin - 1, Math.min(ymax + 1, f(s)))).toFixed(1); } attr(p, 'd', d); return p; }; };
  return { X, Y, ax, curve, o };
};
// vertical gap marker between the axis and a height (label in the middle)
const gap = (svg, X, Y, xv, yv, lab, col = C.ink) => { const g = mk(mk(svg, 'g', {}), 'g', {}); mk(g, 'line', { x1: X(xv), y1: Y(0) - 4, x2: X(xv), y2: Y(yv) + 12, stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }); mk(g, 'path', { d: `M${X(xv)},${Y(yv) + 2} l-7,12 h14 z`, fill: col }); txt(g, X(xv) + 16, (Y(0) + Y(yv)) / 2 + 8, lab, { 'font-size': 22, fill: col, 'font-weight': 600 }); return g; };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H3') + 0.02, tH4 = T0('H4');
const tP1 = T0('P1'), tL1 = T0('L1'), tD1 = T0('D1'), tS1 = T0('S1'), tS3 = T0('S3'), tZ1 = T0('Z1'), tZ6 = T0('Z5'), tI1 = T0('I1'), tT = T0('T1'), tU1 = T0('U1'), tU6 = T0('U6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tU1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: equations you can point at ---------- */
const LS = [['EQUATION 1 · POINT AT IT', `x - 3 = 0 \\;\\to\\; x = ${rb('3')}`], ['EQUATION 2 · POINT AT IT', `x^2 = 4 \\;\\to\\; x = ${rb('2')},\\ ${rb('-2')}`]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${500 + i * 480}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H2', 'minus') - 0.3, wt('H2', 'squared') - 0.2];

/* ---------- H: Aarav's tries ---------- */
$('#hEq').innerHTML = K(`x^2 + 1 = 0`);
const TRY = [['x = 1', '1 + 1 = 2'], ['x = -1', '1 + 1 = 2'], ['x = 0', '0 + 1 = 1'], ['x = 3', '9 + 1 = 10'], ['x = 0.5', '0.25 + 1 = 1.25']];
$('#hrs').innerHTML = `<div class="lbl" style="left:272px;top:136px">x² + 1 GIVES</div>` + TRY.map(([a, b], i) => `<div class="tr" id="hr${i}" style="top:${172 + i * 64}px"><div class="tx re">${a}</div><div class="ty">${b}</div><div class="chip">${M.icon('x', 18, '#fff', 3)}NOT 0</div></div>`).join('');
$('#hlP').style.top = '506px';
const tTry = i => wt('H4', 'tried') + i * 0.42;

/* ---------- P: squaring + live slide ---------- */
const PS = [[`${rb('3')}^2 = 9`, 'three times three'], [`(${rb('-3')})^2 = 9`, 'minus times minus is plus'], [`${rb('0')}^2 = 0`, 'zero stays zero']];
$('#pSt').innerHTML = PS.map(([f, w], i) => `<div class="st" id="ps${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#pP').innerHTML = `${K(`${rb('x')}^2 \\ge 0`)}<span style="color:var(--ink)">for every real number x</span>`;
const tPs = [wt('P2', 'Three'), wt('P2', 'Minus'), wt('P3', 'Zero')];
const pg = plot($('#pS'), { x: 60, y: 130, w: 664, h: 390, xmin: -3.4, xmax: 3.4, ymin: -3, ymax: 11, xt: [-3, -2, -1, 1, 2, 3], yt: [4, 8] });
const pBand = mk($('#pS'), 'rect', { x: 62, y: pg.Y(0) + 3, width: 660, height: pg.Y(-3) - pg.Y(0) - 3, fill: C.redBg });
const pBandT = txt($('#pS'), 392, pg.Y(0) + 68, 'x² never goes down here', { 'text-anchor': 'middle', fill: C.red, 'font-size': 18, 'font-weight': 600 });
$('#pS').insertBefore(pBand, pg.ax.parentNode); $('#pS').insertBefore(pBandT, pg.ax.parentNode);
const pC0 = pg.curve(C.ink), pC1 = pg.curve(RC, 5);
const pDrop = mk($('#pS'), 'line', { stroke: RE, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const pDotX = mk($('#pS'), 'circle', { r: 10, fill: RE }), pDot = mk($('#pS'), 'circle', { r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
const pGap = gap($('#pS'), pg.X, pg.Y, 0, 1, '1', RC);
const pLab = txt($('#pS'), pg.X(0.3), pg.Y(9.4), 'y = x² + 1', { fill: RC, 'font-size': 22, 'font-weight': 600 });
const tPw = wt('P4', 'Watch'), tPs0 = wt('P4', 'slide'), tPs1 = T1('P4') + 0.5;
const pXv = t => -3 + 6 * M.io((t - tPs0) / (tPs1 - tPs0));
const tP5 = wt('P5', 'plus');

/* ---------- L: y = x^2 + c with c counting up ---------- */
$('#lC').innerHTML = `<i style="font-family:Poppins" class="a">c</i> = <span id="lCv" class="a"></span>`;
const LR = [['c < 0', 'crosses twice: 2 real solutions'], ['c = 0', 'touches once: 1 real solution'], ['c > 0', 'lifts off: no real solution']];
$('#lRows').innerHTML = LR.map(([k, w], i) => `<div class="sr" id="lr${i}" style="top:${376 + i * 66}px"><span class="k">${K(rc(k))}</span><span>${w}</span></div>`).join('');
const lg = plot($('#lS'), { x: 50, y: 84, w: 684, h: 440, xmin: -3.6, xmax: 3.6, ymin: -4.6, ymax: 6, xt: [-3, -2, -1, 1, 2, 3], yt: [-4, -2, 2, 4] });
const lCur = lg.curve(C.ink, 5);
const lR = [0, 1].map(() => mk($('#lS'), 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const lGap = gap($('#lS'), lg.X, lg.Y, 0, 1, '1 unit', C.ink);
const cK = seg(-4, [[wt('L4', 'count'), wt('L4', 'crossings'), -1], [T0('L5') + 0.1, wt('L5', 'touches'), 0], [wt('L6', 'Past'), wt('L6', 'No'), 0.5], [wt('L7', 'our'), wt('L7', 'floats'), 1]]);
const tLg = wt('L1', 'graph'), tLc = wt('L2', 'crosses');
const tLr = [wt('L3', 'cuts'), wt('L5', 'touches'), wt('L6', 'lifts')];
let lLast = null;

/* ---------- D: proof in four steps ---------- */
const DS = [[`x^2 + 1 = 0`, 'start with the equation'], [`x^2 = ${red('-1')}`, 'subtract 1 from both sides'], [`${rb('x')}^2 \\ge 0`, 'true for every real x: we just watched it'], [`\\Rightarrow\\ \\text{no real } x`, 'nothing is 0 or more and also equal to -1']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Start'), wt('D3', 'Subtract'), wt('D4', 'But'), wt('D5', 'Nothing')];
const ds = $('#dS'), DX = v => 392 + v * 80, DY = 250;
const dAx = mk(mk(ds, 'g', {}), 'g', {});
mk(dAx, 'line', { x1: 44, y1: DY, x2: 740, y2: DY, stroke: C.ink, 'stroke-width': 3 });
for (let v = -4; v <= 4; v++) { mk(dAx, 'line', { x1: DX(v), y1: DY - 10, x2: DX(v), y2: DY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(dAx, DX(v), DY + 44, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const dRay = mk(ds, 'line', { x1: DX(0), y1: DY, x2: 728, y2: DY, stroke: RE, 'stroke-width': 12, 'stroke-linecap': 'round' });
const dRay0 = mk(ds, 'circle', { cx: DX(0), cy: DY, r: 12, fill: RE });
const dRayT = txt(ds, DX(2.1), DY - 34, 'x² lives here: 0 or more', { 'text-anchor': 'middle', 'font-size': 20, fill: RE, 'font-weight': 600 });
const dM = mk(mk(ds, 'g', { transform: `translate(${DX(-1)},${DY})` }), 'g', {}); mk(dM, 'circle', { r: 16, fill: C.redBg, stroke: C.red, 'stroke-width': 4 });
const dMT = txt(ds, DX(-1), DY - 40, 'x² = -1 ?', { 'text-anchor': 'middle', 'font-size': 22, fill: C.red, 'font-weight': 600 });
const dX = mk(mk(ds, 'g', { transform: `translate(${DX(-1)},${DY})` }), 'g', {}); mk(dX, 'path', { d: 'M-22,-22 L22,22 M22,-22 L-22,22', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' });
$('#dP').style.top = '360px';
const avD = PUC.avatar($('#sD'), { x: 976 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So x² + 1 is always 1 or more.' });

/* ---------- S: side by side + think ---------- */
$('#slF').innerHTML = K(`x^2 - 1 = 0`); $('#srF').innerHTML = K(`x^2 + 1 = 0`);
const SG = { x: 60, y: 150, w: 664, h: 320, xmin: -2.7, xmax: 2.7, ymin: -1.7, ymax: 5, xt: [-2, -1, 1, 2], yt: [2, 4] };
const sgL = plot($('#slS'), SG), sgR = plot($('#srS'), SG);
const sCL = sgL.curve(C.ink), sCR = sgR.curve(C.ink);
const sD = [-1, 1].map(v => mk(mk($('#slS'), 'g', { transform: `translate(${sgL.X(v)},${sgL.Y(0)})` }), 'g', {}));
sD.forEach(g => mk(g, 'circle', { r: 12, fill: RE, stroke: '#fff', 'stroke-width': 3 }));
const sGap = gap($('#srS'), sgR.X, sgR.Y, 0, 1, '1', C.red);
$('#slP').innerHTML = `${M.icon('check', 22, C.ok, 3)} 2 real solutions: 1 and -1`;
const th1 = PUC.think($('#th1'), { q: `Does ${K('x^2 + 4 = 0')} have a real solution?`, opts: ['Yes', 'No'], right: 1, why: `${K(`${rb('x')}^2 \\ge 0`)}, so ${K('x^2 + 4 \\ge 4')}. It never reaches 0: no real solution.` });

/* ---------- Z: numbers ran out before + history ---------- */
const ZS = [['\\text{in } \\mathbb{N}', 'x + 5 = 2', 'NEEDS ZERO AND THE NEGATIVES', '-3'], ['\\text{in } \\mathbb{Z}', '2x = 3', 'NEEDS FRACTIONS', '3/2'], ['\\text{in } \\mathbb{Q}', 'x^2 = 2', 'NEEDS ROOT TWO', '\\sqrt{2}'], ['\\text{in } \\mathbb{R}', `x^2 = ${red('-1')}`, 'STUCK AGAIN', '?']];
$('#zR').innerHTML = ZS.map(([s, e, n, r], i) => `<div class="ss" id="zs${i}" style="top:${84 + i * 112}px"><div class="sy">${K(s)}</div><div class="sn">${K(e)}</div><div class="se">${n}</div><div class="chip"${i === 3 ? ' style="background:var(--red)"' : ''}>x = ${K(r)}</div></div>`).join('');
const tZs = [T0('Z2'), wt('Z2', 'Two'), T0('Z3'), T0('Z4')];
const zs = $('#zS');
const ZB = [['N', 260, 110], ['Z', 380, 190], ['Q', 500, 270], ['R', 620, 350]];
const zBox = ZB.map(([n, w, h]) => { const g = mk(mk(zs, 'g', {}), 'g', {}); const r = mk(g, 'rect', { x: 392 - w / 2, y: 330 - h / 2, width: w, height: h, rx: 18, fill: 'none', stroke: RE, 'stroke-width': 3 }); const l = txt(g, 392 - w / 2 + 16, 330 - h / 2 + 30, n, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: RE }); return { g, r, l }; });
const ZM = [[[392, 345, '1   2   3']], [[232, 340, '-3'], [552, 340, '0']], [[172, 340, '3/2'], [612, 340, '-1/2']], [[112, 340, '√2'], [672, 340, 'π']]];
const zMem = ZM.map(ms => ms.map(([x, y, s]) => txt(zs, x, y, s, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 })));
const zQ = mk(zs, 'rect', { x: 36, y: 118, width: 712, height: 432, rx: 22, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const zQT = txt(zs, 392, 146, 'x² = -1 needs a bigger box', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
const tZb = [T0('Z1') + 0.6, wt('Z2', 'negative'), wt('Z2', 'fraction'), wt('Z3', 'root')];
$('#zhF0').innerHTML = K(`\\sqrt{${red('-1')}}\\ :\\ \\text{no real value}`);
$('#zhF1').innerHTML = K(`x + y = 10, \\quad xy = 40`);
$('#zhF2').innerHTML = K(`x = 5 + \\sqrt{${red('-15')}},\\ \\ y = 5 - \\sqrt{${red('-15')}}`);

/* ---------- I: the new number i ---------- */
$('#iBig').innerHTML = K(`${I}^2 = -1`); $('#iRt').innerHTML = K(`${I} = \\sqrt{-1}`);
const IS = [`x^2 + 1 = 0`, `x = ${I}:\\quad ${I}^2 + 1`, `= -1 + 1`, `= 0 \\quad ${`\\textcolor{${C.ok}}{\\checkmark}`}`];
$('#iSt').innerHTML = IS.map((f, i) => `<div class="st" id="is${i}" style="top:${84 + i * 96}px;height:96px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tIs = [T0('I3'), wt('I3', 'squared'), wt('I3', 'minus'), wt('I3', 'zero')];
const avA = PUC.avatar($('#sI'), { x: 976 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So it has a solution. Just not a real one.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`x^2 = -1 \\;\\Rightarrow\\; x = ${I}`);

/* ---------- U: multiplying by i is a quarter turn ---------- */
const us = $('#uS'), UO = [392, 340], UU = 80, UX = v => UO[0] + v * UU;
const uV = mk(us, 'line', { x1: UO[0], y1: 548, x2: UO[0], y2: 72, stroke: IM, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const uVT = txt(us, UO[0] + 16, 96, 'a second direction', { 'font-size': 20, fill: IM, 'font-weight': 600 });
const uAx = mk(mk(us, 'g', {}), 'g', {});
mk(uAx, 'line', { x1: 44, y1: UO[1], x2: 740, y2: UO[1], stroke: C.ink, 'stroke-width': 3 });
for (let v = -4; v <= 4; v++) { mk(uAx, 'line', { x1: UX(v), y1: UO[1] - 10, x2: UX(v), y2: UO[1] + 10, stroke: C.ink, 'stroke-width': 2 }); txt(uAx, UX(v), UO[1] + 44, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const uArcA = mk(us, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const uArcB = mk(us, 'path', { fill: 'none', stroke: IM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const arcD = (a0, a1) => { if (a1 <= a0 + 1e-3) return ''; let d = ''; for (let i = 0; i <= 48; i++) { const a = a0 + (a1 - a0) * i / 48; d += (i ? 'L' : 'M') + (UO[0] + 3 * UU * Math.cos(a)).toFixed(1) + ',' + (UO[1] - 3 * UU * Math.sin(a)).toFixed(1); } return d; };
const uArmA = mk(us, 'line', { stroke: C.ink2, 'stroke-width': 3 }), uArmB = mk(us, 'line', { stroke: IM, 'stroke-width': 4 });
const uDA = mk(us, 'circle', { r: 14, fill: RE, stroke: '#fff', 'stroke-width': 3 }), uDB = mk(us, 'circle', { r: 14, fill: IM, stroke: '#fff', 'stroke-width': 3 });
const uO = mk(us, 'circle', { cx: UO[0], cy: UO[1], r: 6, fill: C.ink });
const uLA = txt(us, 60, 126, '× (-1): a half turn', { 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
const uLB = txt(us, 724, 126, '× i: a quarter turn', { 'font-size': 22, fill: IM, 'font-weight': 600, 'text-anchor': 'end' });
const uUp = txt(us, UO[0] - 18, UO[1] - 3 * UU - 22, '3i', { 'font-family': 'Poppins', 'font-size': 26, 'font-weight': 700, fill: IM, 'text-anchor': 'end' });
const aA = seg(0, [[wt('U2', 'turns'), wt('U2', 'That'), Math.PI]]);
const aB = seg(0, [[wt('U4', 'once'), wt('U4', 'straight') + 0.2, Math.PI / 2]]);
const US = [[`3 \\times (-1) = -3`, 'a half turn'], [`${I} \\times ${I} = -1`, 'two moves of i make one half turn'], [`\\times\\ ${I} = \\text{a quarter turn}`, 'half of a half turn'], [`3 \\to 3${I}`, 'off the number line, straight up']];
$('#uSt').innerHTML = US.map(([f, w], i) => `<div class="st" id="us${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tUs = [wt('U2', 'three'), T0('U3'), wt('U4', 'once'), wt('U4', 'straight')];
const th2 = PUC.think($('#th2'), { q: `Start at 3 and multiply by ${K(I)} twice. Where do you land?`, opts: ['Back at 3', 'At -3'], right: 1, why: `Two quarter turns make a half turn: ${K(`3 \\times ${I} \\times ${I} = 3 \\times (-1) = -3`)}` });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`x^2 + 4x + 5 = 0`)}<br>Show: no real solution. Then solve it using i.`;
const wsol = PUC.solution($('#wl'), [
  [K(`(x^2 + 4x + 4) + 1 = 0`)],
  [K(`(x + 2)^2 = ${red('-1')}`)],
  ['A real square is never negative: no real x'],
  [K(`x + 2 = ${I}\\ \\text{ or }\\ -${I}`)],
  [K(`x = -2 + ${I}, \\quad x = -2 - ${I}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Write'), wt('W4', 'That'), wt('W5', 'real'), wt('W6', 'With'), wt('W6', 'So')];
const wg = plot($('#wS'), { x: 60, y: 96, w: 664, h: 370, xmin: -5.2, xmax: 1.4, ymin: -1.2, ymax: 8, xt: [-4, -3, -2, -1, 1], yt: [2, 4, 6] });
const wC = wg.curve(C.ink, 5);
const wGap = gap($('#wS'), wg.X, wg.Y, -2, 1, '1', RC);
const wV = mk($('#wS'), 'circle', { cx: wg.X(-2), cy: wg.Y(1), r: 12, fill: RC, stroke: '#fff', 'stroke-width': 3 });
const wVT = txt($('#wS'), wg.X(-2) + 22, wg.Y(1) - 18, 'lowest point (-2, 1)', { 'font-size': 20, fill: RC, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(-1)^2 = -1 \\;\\Rightarrow\\; x = -1 \\text{ works}`), right: K(`(-1)^2 = (-1)(-1) = +1 \\ne -1`) + '&nbsp; so -1 is not a solution' });
const ts = $('#tS'), TXv = v => 280 + v * 110, TYl = 180;
mk(ts, 'line', { x1: 40, y1: TYl, x2: 520, y2: TYl, stroke: C.ink, 'stroke-width': 3 });
for (let v = -2; v <= 2; v++) { mk(ts, 'line', { x1: TXv(v), y1: TYl - 8, x2: TXv(v), y2: TYl + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TYl + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const tArc = mk(ts, 'path', { d: `M${TXv(-1)},${TYl - 14} Q${TXv(0)},${TYl - 120} ${TXv(1)},${TYl - 14}`, fill: 'none', stroke: C.ok, 'stroke-width': 3.5 });
const tHead = mk(ts, 'path', { d: `M${TXv(1)},${TYl - 12} l-14,-8 l3,14 z`, fill: C.ok });
const tDa = mk(ts, 'circle', { cx: TXv(-1), cy: TYl, r: 12, fill: C.red }), tDb = mk(ts, 'circle', { cx: TXv(1), cy: TYl, r: 12, fill: C.ok });
const tNote = txt(ts, TXv(0), TYl - 84, '(-1) × (-1) = +1', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Show that an equation has no real solution, then solve it using i.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`x^2 - 4x + ${rc('c')} = 0, \\quad ${rc('c')} \\in \\{1, 2, 3, \\dots, 20\\}`)}<br>For how many integers c is there no real solution?`,
  opts: ['4', '15', '16', '17'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`(x - 2)^2 = 4 - ${rc('c')}`)], [K(`\\text{no real } x \\iff 4 - ${rc('c')} < 0`)], [K(`\\iff ${rc('c')} > 4`)], [K(`${rc('c')} = 4: x = 2 \\text{ is real}`)], [K(`${rc('c')} = 5, \\dots, 20 \\Rightarrow 16`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Complete'), wt('A3', 'never'), wt('A3', 'more'), wt('A4', 'At'), wt('A4', 'five')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · why we need complex numbers', y0: 98, dy: 80, txt: [1, 0, 1, 0, 1],
  lines: ['<b>A real square is never negative</b>: x² ≥ 0 for every real x',
    K(`x^2 + 1 = 0 \\;\\Rightarrow\\; x^2 = ${red('-1')} \\;\\Rightarrow\\; \\text{no real } x`),
    `<b>y = x² + c</b>: crosses if c &lt; 0, touches if c = 0, misses if c &gt; 0`,
    K(`${I} = \\sqrt{-1}, \\qquad ${I}^2 = -1`),
    '<b>× (-1)</b> = half turn &nbsp;·&nbsp; <b style="color:#7A4FE0">× i</b> = quarter turn'] });
const YQ = ['Why does x² + 9 = 0 have no real solution?', 'For which values of c does y = x² + c miss the x-axis?', 'Is (-1)² equal to -1?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 38', topic: 'i × i × i = ? Why the powers of i repeat every four turns', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const hiMove = (el, t, ts, y0, dy, h) => { const y = M.track(y0, ts.slice(1).map((tt, i) => [tt - 0.1, y0 + (i + 1) * dy]), M.SOFT)(t); M.vis(el, t, ts[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); el.style.top = (y - h).toFixed(1) + 'px'; };

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: equations you can point at */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: Aarav's tries */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hTag'), t, wt('H3', 'chapter') - 0.1, 1e9, POP);
    PUC.write($('#hEq'), t, wt('H3', 'broke'), 0.8);
    M.vis($('#hrs .lbl'), t, tTry(0) - 0.2, 1e9, { dy: 10 });
    TRY.forEach((_, i) => { M.vis($('#hr' + i), t, tTry(i), 1e9, { dx: -16, dy: 0 }); M.vis($(`#hr${i} .chip`), t, tTry(i) + 0.25, 1e9, POP); });
    M.vis($('#hlP'), t, wt('H4', 'Not') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'broken') - 0.1, 1e9, POP);
  }

  /* P: squaring + live slide */
  const pOn = t >= tP1 - 0.1 && t < tL1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('L1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.7); M.vis(el.querySelector('.why'), t, tPs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#pP'), t, wt('P3', 'never') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tPw - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(pg.ax, t, tPw, 1e9, { dy: 0, fade: 0.25 });
    const u0 = M.io((t - tPw - 0.2) / 1.0); pC0(x => x * x, -3.4, -3.4 + 6.8 * u0);
    const bo = M.clamp((t - wt('P4', 'never')) / 0.3); pBand.style.opacity = bo; pBandT.style.opacity = bo;
    const xv = pXv(t), on = t >= tPs0 - 0.2;
    attr(pDot, 'cx', pg.X(xv).toFixed(1)); attr(pDot, 'cy', pg.Y(xv * xv).toFixed(1)); attr(pDotX, 'cx', pg.X(xv).toFixed(1)); attr(pDotX, 'cy', pg.Y(0).toFixed(1));
    attr(pDrop, 'x1', pg.X(xv).toFixed(1)); attr(pDrop, 'x2', pg.X(xv).toFixed(1)); attr(pDrop, 'y1', pg.Y(0).toFixed(1)); attr(pDrop, 'y2', pg.Y(xv * xv).toFixed(1));
    [pDot, pDotX, pDrop].forEach(e => M.vis(e, t, on ? tPs0 - 0.2 : null, on ? 1e9 : -1, { dy: 0, fade: 0.15 }));
    M.setT($('#pX'), `x = ${fm(xv)}`); M.setT($('#pY'), `x² = ${(xv * xv).toFixed(2)}`);
    M.vis($('#pX'), t, tPs0 - 0.2, 1e9, { dy: 10 }); M.vis($('#pY'), t, tPs0 - 0.1, 1e9, { dy: 10 });
    $('#pX').style.color = RE;
    const u1 = M.io((t - tP5) / 0.9); pC1(x => x * x + 1, -3.4, -3.4 + 6.8 * u1);
    M.vis(pGap, t, wt('P5', 'least'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pLab, t, tP5 + 0.4, 1e9, { dy: 0 });
  }

  /* L: the parabola morphs as c counts up */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(lg.ax, t, tLg - 0.1, 1e9, { dy: 0, fade: 0.25 });
    const cv = Math.round(cK(t) * 10) / 10, c = Math.abs(cv) < 0.05 ? 0 : cv;
    const u = M.io((t - tLg) / 1.1); lCur(x => x * x + c, -3.6, -3.6 + 7.2 * u);
    const key = c.toFixed(1);
    if (key !== lLast) { lLast = key;
      M.setT($('#lCv'), c === 0 ? '0.0' : key);
      $('#lEq').innerHTML = K(c === 0 ? `x^2 + ${rc('0')} = 0` : `x^2 ${c < 0 ? '-' : '+'} ${rc(Math.abs(c).toFixed(1))} = 0`);
      const r = Math.sqrt(Math.max(0, -c));
      $('#lSol').innerHTML = c < 0 ? `<span class="re">x = ${fm(-r)}, ${fm(r)}</span>` : c === 0 ? `<span class="re">x = 0</span> <span style="color:var(--mute);font-size:24px">(touches)</span>` : `<span style="color:var(--red)">none</span>`;
    }
    M.vis($('#lC'), t, T0('L1') + 0.4, 1e9, { dy: 14 });
    PUC.write($('#lEq'), t, tLg + 0.2, 0.7);
    M.vis($('#lSolL'), t, tLc - 0.1, 1e9, { dy: 10 }); M.vis($('#lSol'), t, tLc, 1e9, { dy: 10 });
    const r = Math.sqrt(Math.max(0, -c));
    lR.forEach((d, i) => { const x = i ? r : -r; attr(d, 'cx', lg.X(x).toFixed(1)); attr(d, 'cy', lg.Y(0).toFixed(1)); M.vis(d, t, c <= 0 && t >= tLc ? tLc : null, c <= 0 && t >= tLc ? 1e9 : -1, { dy: 0, fade: 0.1 }); });
    const st = c < 0 ? 0 : c === 0 ? 1 : 2;
    LR.forEach((_, i) => { const el = $('#lr' + i); M.vis(el, t, tLr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const on = i === st ? 1 : 0; el.style.background = on ? (i === 2 ? C.redBg : C.ac2) : C.soft; el.style.color = on && i === 2 ? C.red : C.ink; });
    M.vis(lGap, t, wt('L7', 'floats'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* D: proof */
  const dOn = t >= tD1 - 0.1 && t < tS1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('S1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    hiMove($('#dHi'), t, tDs, 84, 120, 8);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(dAx, t, tD1 + 0.5, 1e9, { dy: 0, fade: 0.25 });
    M.vis(dM, t, wt('D3', 'minus'), 1e9, { ...POP, sc: 0.3 }); M.vis(dMT, t, wt('D3', 'minus') + 0.1, 1e9, { dy: 0 });
    M.draw(dRay, t, wt('D4', 'zero') - 0.1, 0.8); M.vis(dRay0, t, wt('D4', 'zero') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.vis(dRayT, t, wt('D4', 'more'), 1e9, { dy: 0 });
    M.vis(dX, t, wt('D5', 'Nothing'), 1e9, { ...POP, sc: 0.3 });
    M.vis($('#dP'), t, wt('D5', 'So') - 0.1, 1e9, POP);
    avD(t, wt('D5', 'solves') + 0.3, out);
  }

  /* S: side by side + think */
  const sOn = t >= tS1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#slF'), t, wt('S1', 'squared') - 0.1, 0.7); M.vis(sgL.ax, t, tS1 + 0.3, 1e9, { dy: 0, fade: 0.25 });
    sCL(x => x * x - 1, -2.7, -2.7 + 5.4 * M.io((t - wt('S1', 'crosses') + 0.1) / 0.9));
    sD.forEach((g, i) => M.vis(g, t, wt('S1', 'twice') + i * 0.2, 1e9, { ...POP, sc: 0.3 }));
    M.vis($('#slP'), t, wt('S1', 'twice') + 0.5, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#srF'), t, T0('S2') + 0.1, 0.7); M.vis(sgR.ax, t, T0('S2') + 0.2, 1e9, { dy: 0, fade: 0.25 });
    sCR(x => x * x + 1, -2.7, -2.7 + 5.4 * M.io((t - wt('S2', 'never') + 0.1) / 0.9));
    M.vis(sGap, t, wt('S2', 'crosses'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#srP'), t, wt('S2', 'No') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('Z1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'real') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'never') });
  }

  /* Z: ran out before + history */
  const zOn = t >= tZ1 - 0.1 && t < tI1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('Z5');
    M.vis($('#zl'), t, tZ1 + 0.1, out, { dx: -60, dy: 0, ...o });
    ZS.forEach((_, i) => { M.vis($('#zs' + i), t, tZs[i] - 0.1, 1e9, { dy: 14 }); M.vis($(`#zs${i} .chip`), t, [wt('Z2', 'negative'), wt('Z2', 'fraction'), wt('Z3', 'root'), wt('Z4', 'stuck')][i], 1e9, POP); });
    hiMove($('#zHi'), t, tZs, 84, 112, 4);
    M.vis($('#zr'), t, tZ1 + 0.3, out, { dx: 60, dy: 0, ...o });
    zBox.forEach((b, i) => { M.draw(b.r, t, tZb[i], 0.7); M.vis(b.l, t, tZb[i] + 0.3, 1e9, { dy: 0 }); zMem[i].forEach((m, j) => M.vis(m, t, tZb[i] + 0.4 + j * 0.15, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 })); });
    M.draw(zQ, t, T0('Z4'), 0.8); M.vis(zQT, t, wt('Z4', 'stuck') - 0.1, 1e9, { dy: 0 });
    M.vis($('#zh'), t, tZ6 + 0.05, OUT('I1'), { dy: 36, ...o });
    M.vis($('#zh0'), t, wt('Z5', 'Indian') - 0.1, 1e9, { dy: 16 }); PUC.write($('#zhF0'), t, wt('Z5', 'negative'), 0.8);
    M.vis($('#zh1'), t, wt('Z6', 'Cardan') - 0.1, 1e9, { dy: 16 });
    PUC.write($('#zhF1'), t, wt('Z6', 'puzzle') - 0.1, 0.8); PUC.write($('#zhF2'), t, wt('Z6', 'got') - 0.1, 1.0);
    M.vis($('#zhP'), t, wt('Z6', 'useless') - 0.1, 1e9, POP);
  }

  /* I: the new number */
  const iOn = t >= tI1 - 0.1 && t < tT + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    M.vis($('#il'), t, tI1 + 0.1, 1e9, { dx: -60, dy: 0 });
    PUC.write($('#iBig'), t, wt('I2', 'named'), 0.9); PUC.write($('#iRt'), t, wt('I2', 'symbols'), 0.9);
    M.vis($('#iP'), t, T1('I2') - 0.3, 1e9, POP);
    M.vis($('#ir'), t, T0('I3') - 0.2, 1e9, { dx: 60, dy: 0 });
    IS.forEach((_, i) => { const el = $('#is' + i); M.vis(el.querySelector('.n'), t, tIs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tIs[i], 0.6); });
    hiMove($('#iHi'), t, tIs, 84, 96, 8);
    avA(t, T1('I3') + 0.1);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tU1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tU1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'No') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'need') - 0.2, 0.8);
  }

  /* U: quarter turn */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U6');
    M.vis($('#ul'), t, tU1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis(uAx, t, tU1 + 0.5, 1e9, { dy: 0, fade: 0.25 }); M.vis(uO, t, tU1 + 0.5, 1e9, { dy: 0 });
    const a = aA(t), pa = [UO[0] + 3 * UU * Math.cos(a), UO[1] - 3 * UU * Math.sin(a)];
    attr(uArcA, 'd', arcD(0, a)); attr(uDA, 'cx', pa[0].toFixed(1)); attr(uDA, 'cy', pa[1].toFixed(1));
    attr(uArmA, 'x1', UO[0]); attr(uArmA, 'y1', UO[1]); attr(uArmA, 'x2', pa[0].toFixed(1)); attr(uArmA, 'y2', pa[1].toFixed(1));
    const fA = t < T0('U3') ? 1 : 1 - 0.75 * M.io((t - T0('U3')) / 0.4);
    M.vis(uDA, t, T0('U2'), 1e9, { ...POP, sc: 0.3 }); uDA.style.opacity = (M.clamp((t - T0('U2')) / 0.1) * fA).toFixed(3);
    uArmA.style.opacity = (M.clamp((t - wt('U2', 'turns')) / 0.2) * fA).toFixed(3); uArcA.style.opacity = fA.toFixed(3); M.hide(uArmA, t < wt('U2', 'turns'));
    M.vis(uLA, t, wt('U2', 'half') - 0.1, 1e9, { dy: 0 }); uLA.style.opacity = (M.clamp((t - wt('U2', 'half') + 0.1) / 0.2) * (t < T0('U3') ? 1 : 1 - 0.6 * M.io((t - T0('U3')) / 0.4))).toFixed(3);
    const b = aB(t), pb = [UO[0] + 3 * UU * Math.cos(b), UO[1] - 3 * UU * Math.sin(b)], tB = T0('U4') - 0.1;
    attr(uArcB, 'd', arcD(0, b)); attr(uDB, 'cx', pb[0].toFixed(1)); attr(uDB, 'cy', pb[1].toFixed(1));
    attr(uArmB, 'x1', UO[0]); attr(uArmB, 'y1', UO[1]); attr(uArmB, 'x2', pb[0].toFixed(1)); attr(uArmB, 'y2', pb[1].toFixed(1));
    M.vis(uDB, t, tB, 1e9, { ...POP, sc: 0.3 }); M.vis(uArmB, t, wt('U4', 'once'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(uLB, t, wt('U4', 'quarter') - 0.1, 1e9, { dy: 0 }); M.vis(uUp, t, wt('U4', 'straight') + 0.3, 1e9, { ...POP, sc: 0.4 });
    M.draw(uV, t, wt('U5', 'second') - 0.2, 0.9); M.vis(uVT, t, wt('U5', 'direction'), 1e9, { dy: 0 });
    M.vis($('#ur'), t, wt('U2', 'three') - 0.4, out, { dx: 60, dy: 0, ...o });
    US.forEach((_, i) => { const el = $('#us' + i); M.vis(el.querySelector('.n'), t, tUs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tUs[i], 0.7); M.vis(el.querySelector('.why'), t, tUs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    hiMove($('#uHi'), t, tUs, 84, 120, 8);
    M.vis($('#th2'), t, tU6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tU6, tOpts: wt('U6', 'Where') - 0.1, tCount: T1('U6') + 0.05, dur: 3, tAns: T0('U7') - 0.02, tWhy: wt('U7', 'Two') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wg.ax, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.25 });
    wC(x => (x + 2) * (x + 2) + 1, -5.2, -5.2 + 6.6 * M.io((t - T0('W2') - 0.9) / 1.2));
    M.vis(wV, t, wt('W7', 'lowest') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(wVT, t, wt('W7', 'lowest'), 1e9, { dy: 0 });
    M.vis(wGap, t, wt('W7', 'height'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wP'), t, wt('W7', 'never') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'plus') });
    M.vis(tDa, t, wt('X3', 'brackets') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.draw(tArc, t, wt('X3', 'times'), 0.6); M.vis(tHead, t, wt('X3', 'times') + 0.55, 1e9, { dy: 0, fade: 0.1 });
    M.vis(tDb, t, wt('X3', 'plus') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(tNote, t, wt('X3', 'plus'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'PUC')], tType: wt('J1', 'Show') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'For'), tCount, tAns });
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
