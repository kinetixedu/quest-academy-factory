// PUC Maths Ep 35: Transformations between sums and products (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 3 bible): cos blue, sin coral (accent), angle / half sum violet; this episode: half difference gold
const CB = '#2F6FEB', SC = C.ac, HSC = C.violet, HDC = C.gold, LB = '#8DADF4';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cs = `\\textcolor{${CB}}{\\cos}`, sn = `\\textcolor{${SC}}{\\sin}`;
const hs = s => `\\textcolor{${HSC}}{${s}}`, hd = s => `\\textcolor{${HDC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const HS = hs('\\tfrac{x+y}{2}'), HD = hd('\\tfrac{x-y}{2}'), A = hs('A'), B = hd('B');
const rad = d => d * Math.PI / 180, f3 = v => v.toFixed(3);

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tI1 = T0('I1'), tL1 = T0('L1'), tD1 = T0('D1'), tD8 = T0('D8'), tB1 = T0('B1'), tS1 = T0('S1'), tS3 = T0('S3');
const tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- wave helper ---------- */
const wpath = (f, x0, x1, ta, tb, cy, amp, n = 900) => { let d = ''; for (let i = 0; i <= n; i++) { const u = i / n, tt = ta + (tb - ta) * u; d += (i ? 'L' : 'M') + (x0 + (x1 - x0) * u).toFixed(1) + ',' + (cy - amp * f(tt)).toFixed(1); } return d; };
const T4 = 4 * Math.PI;

/* ---------- title card: three tone cards ---------- */
const LS = [['TONE 1 · STEADY', t => Math.cos(12 * t), CB, 18], ['TONE 2 · ALMOST THE SAME', t => Math.cos(11 * t), LB, 18], ['TOGETHER · A WOBBLE', t => Math.cos(12 * t) + Math.cos(11 * t), C.ink, 10]];
$('#lists').innerHTML = LS.map(([n], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><svg width="320" height="60"></svg></div>`).join('');
LS.forEach(([, f, col, a], i) => mk($(`#ls${i} svg`), 'path', { d: wpath(f, 4, 316, 0, T4, 30, a, 500), fill: 'none', stroke: col, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
const tLs = [wt('H1', 'notes') - 0.05, wt('H1', 'same') - 0.1, wt('H1', 'once') - 0.1];

/* ---------- H: two tones added ---------- */
const hS = $('#hS'), HX0 = 150, HX1 = 748;
const hw1 = mk(hS, 'path', { d: wpath(t => Math.cos(12 * t), HX0, HX1, 0, T4, 120, 26), fill: 'none', stroke: CB, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
const hw2 = mk(hS, 'path', { d: wpath(t => Math.cos(11 * t), HX0, HX1, 0, T4, 220, 26), fill: 'none', stroke: LB, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(hS, 'line', { x1: HX0, y1: 380, x2: HX1, y2: 380, stroke: C.line, 'stroke-width': 1.5 });
const hws = mk(hS, 'path', { d: wpath(t => Math.cos(12 * t) + Math.cos(11 * t), HX0, HX1, 0, T4, 380, 44), fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
const hen = [1, -1].map(sg => mk(hS, 'path', { d: wpath(t => sg * 2 * Math.cos(t / 2), HX0, HX1, 0, T4, 380, 44, 200), fill: 'none', stroke: HDC, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' }));
const hL = [['TONE 1', 126, CB], ['TONE 2', 226, '#5F86DB'], ['SUM', 386, C.ink]].map(([s, y, col]) => txt(hS, 36, y, s, { 'font-size': 18, fill: col, 'font-weight': 600, 'letter-spacing': 1.5 }));
const hPlus = txt(hS, 36, 300, '+', { 'font-size': 34, fill: C.mute, 'font-weight': 600 });

/* ---------- unit circle picture (shared by I/L and W) ---------- */
const circ = (svg, o) => {
  const { cx, cy, r } = o, X = (a, L = 1) => cx + L * r * Math.cos(rad(a)), Y = (a, L = 1) => cy - L * r * Math.sin(rad(a));
  const g = {};
  g.ax = mk(svg, 'line', { x1: o.x0, y1: cy, x2: o.x1, y2: cy, stroke: C.ink, 'stroke-width': 2 });
  g.ay = mk(svg, 'line', { x1: cx, y1: o.y0, x2: cx, y2: o.y1, stroke: C.ink, 'stroke-width': 2 });
  g.c = mk(svg, 'circle', { cx, cy, r, fill: 'none', stroke: C.mute, 'stroke-width': 2 });
  g.arcS = mk(svg, 'path', { fill: 'none', stroke: HSC, 'stroke-width': 4 });
  g.arcD = mk(svg, 'path', { fill: 'none', stroke: HDC, 'stroke-width': 4 });
  g.proj = mk(svg, 'line', { y1: cy, y2: cy, x1: cx, stroke: CB, 'stroke-width': 9, 'stroke-linecap': 'round' });
  g.drop = mk(svg, 'line', { stroke: CB, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
  g.ht = mk(svg, 'line', { stroke: SC, 'stroke-width': 9, 'stroke-linecap': 'round' });
  g.pr = mk(svg, 'line', { stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
  g.qr = mk(svg, 'line', { stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '8 7' });
  g.op = mk(svg, 'line', { x1: cx, y1: cy, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  g.oq = mk(svg, 'line', { x1: cx, y1: cy, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
  g.or = mk(svg, 'line', { x1: cx, y1: cy, stroke: HDC, 'stroke-width': 6, 'stroke-linecap': 'round' });
  g.o = mk(svg, 'circle', { cx, cy, r: 6, fill: C.ink });
  const pt = (col, rr, lab) => { const gg = mk(svg, 'g', {}); const c = mk(gg, 'circle', { r: rr, fill: col }); const l = txt(svg, 0, 0, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: col, 'text-anchor': 'middle' }); return { gg, c, l }; };
  g.P = pt(C.ink, 9, 'P'); g.Q = pt(C.ink, 9, 'Q'); g.R = pt(HDC, 11, 'R');
  const arc = (rho, a1, a2) => { if (Math.abs(a2 - a1) < 0.5) return ''; const lo = Math.min(a1, a2), hi = Math.max(a1, a2); return `M${X(lo, rho / r).toFixed(1)},${Y(lo, rho / r).toFixed(1)} A${rho},${rho} 0 0 0 ${X(hi, rho / r).toFixed(1)},${Y(hi, rho / r).toFixed(1)}`; };
  g.set = (x, y) => {
    const s = (x + y) / 2, d = (x - y) / 2, L = 2 * Math.cos(rad(d));
    const px = X(x), py = Y(x), qx = X(y), qy = Y(y), rx = X(s, L), ry = Y(s, L);
    attr(g.op, 'x2', px.toFixed(1)); attr(g.op, 'y2', py.toFixed(1)); attr(g.oq, 'x2', qx.toFixed(1)); attr(g.oq, 'y2', qy.toFixed(1));
    attr(g.or, 'x2', rx.toFixed(1)); attr(g.or, 'y2', ry.toFixed(1));
    [[g.pr, px, py], [g.qr, qx, qy]].forEach(([l, a, b]) => { attr(l, 'x1', a.toFixed(1)); attr(l, 'y1', b.toFixed(1)); attr(l, 'x2', rx.toFixed(1)); attr(l, 'y2', ry.toFixed(1)); });
    attr(g.proj, 'x2', rx.toFixed(1)); attr(g.drop, 'x1', rx.toFixed(1)); attr(g.drop, 'x2', rx.toFixed(1)); attr(g.drop, 'y1', ry.toFixed(1)); attr(g.drop, 'y2', cy);
    attr(g.ht, 'x1', rx.toFixed(1)); attr(g.ht, 'x2', rx.toFixed(1)); attr(g.ht, 'y1', cy); attr(g.ht, 'y2', ry.toFixed(1));
    attr(g.arcS, 'd', arc(44, 0, s)); attr(g.arcD, 'd', arc(78, s, x));
    [[g.P, x, 1, px, py], [g.Q, y, 1, qx, qy], [g.R, s, L, rx, ry]].forEach(([p, a, LL, xx, yy]) => { attr(p.c, 'cx', xx.toFixed(1)); attr(p.c, 'cy', yy.toFixed(1)); attr(p.l, 'x', X(a, LL + 30 / r).toFixed(1)); attr(p.l, 'y', (Y(a, LL + 30 / r) + 9).toFixed(1)); });
    return { s, d, L, rx, ry };
  };
  return g;
};

/* ---------- I: the picture + what it says ---------- */
const ci = circ($('#iS'), { cx: 270, cy: 370, r: 150, x0: 60, x1: 748, y0: 70, y1: 540 });
const iLeg = [['half sum', HSC], ['half difference', HDC], ['cos x + cos y', CB]].map(([l, col], i) => { const g = mk(mk($('#iS'), 'g', { transform: `translate(${470},${430 + i * 34})` }), 'g', {}); mk(g, 'rect', { x: 0, y: -12, width: 26, height: 8, rx: 4, fill: col }); txt(g, 38, 0, l, { 'font-size': 18, fill: col, 'font-weight': 600 }); return g; });
const iProjL = txt($('#iS'), 0, 416, 'cos x + cos y', { 'text-anchor': 'middle', 'font-size': 20, fill: CB, 'font-weight': 600 });
const IS = [[`P = (${cs} x,\\ ${sn} x),\\ \\ Q = (${cs} y,\\ ${sn} y)`, 'the two points on the circle'],
  ['R = P + Q', 'add the two moves, like on a map'],
  [`\\text{angle of } R = ${HS}`, 'the half sum: the middle direction'],
  [`OR = 2\\,${cs}\\left(${HD}\\right)`, 'two times cos of the half difference'],
  [`${cs} x + ${cs} y = 2\\,${cs}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`, 'how far R is across: a product']];
$('#iSt').innerHTML = IS.map(([f, w], i) => `<div class="st${i > 1 ? ' big' : ''}" id="is${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tIs = [wt('I3', 'cos'), wt('I3', 'Add'), wt('I4', 'middle'), wt('I5', 'distance'), wt('I6', 'equals')];

/* ---------- L: live slide of y ---------- */
const tl1 = wt('L1', 'slide'), tl1e = T1('L2') - 0.4, tl2 = wt('L3', 'comes'), tl2e = wt('L3', 'zero') + 0.2;
const yOf = t => t < tI1 ? 10 : 10 - 50 * M.io((t - tl1) / Math.max(1, tl1e - tl1)) + 110 * M.io((t - tl2) / Math.max(0.6, tl2e - tl2));
let lLast = null;
const dg = v => `${v}^{\\circ}`;
const setL = y => {
  if (y === lLast) return; lLast = y;
  const s = (70 + y) / 2, d = (70 - y) / 2, lhs = Math.cos(rad(70)) + Math.cos(rad(y)), rhs = 2 * Math.cos(rad(s)) * Math.cos(rad(d));
  $('#lY').innerHTML = `<i style="font-family:Poppins">y</i> = ${y}°`;
  $('#lF1').innerHTML = K(`${cs} 70^{\\circ} + ${cs}(${dg(y)})`); $('#lV1').textContent = f3(lhs);
  const fs = v => (Math.round(v * 10) / 10).toString();
  $('#lF2').innerHTML = K(`2\\,${cs}(${hs(dg(fs(s)))})\\,${cs}(${hd(dg(fs(d)))})`); $('#lV2').textContent = f3(rhs);
};
$('#lEq').innerHTML = M.icon('check', 24, '#fff', 3) + 'Always equal';

/* ---------- D: algebra proof ---------- */
const DS = [[`${cs}(${A}+${B}) = ${cs} ${A}\\,${cs} ${B} - ${sn} ${A}\\,${sn} ${B}`, 'the compound angle formula, Ep 33'],
  [`${cs}(${A}-${B}) = ${cs} ${A}\\,${cs} ${B} + ${sn} ${A}\\,${sn} ${B}`, 'the same, with minus B'],
  [`${cs}(${A}+${B}) + ${cs}(${A}-${B}) = 2\\,${cs} ${A}\\,${cs} ${B}`, 'add: the sine parts cancel'],
  [`${A} = ${HS},\\qquad ${B} = ${HD}`, 'rename: A + B = x and A - B = y'],
  [`${cs} x + ${cs} y = 2\\,${cs}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`, 'a sum became a product']];
$('#dSt').innerHTML = DS.map(([f, w], i) => `<div class="st${i > 2 ? ' big' : ''}" id="ds${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'cos'), wt('D3', 'cos'), wt('D4', 'Add'), wt('D6', 'rename'), wt('D7', 'Put')];
$('#cc0').innerHTML = K(`${red('-')}\\ ${sn} ${A}\\,${sn} ${B}`); $('#cc1').innerHTML = K(`\\textcolor{${C.ok}}{+}\\ ${sn} ${A}\\,${sn} ${B}`);
const RN = [`${A} = \\tfrac{70^{\\circ}+10^{\\circ}}{2} = ${hs('40^{\\circ}')}`, `${B} = \\tfrac{70^{\\circ}-10^{\\circ}}{2} = ${hd('30^{\\circ}')}`,
  `${cs} 70^{\\circ} + ${cs} 10^{\\circ} = 1.327`, `2\\,${cs} ${hs('40^{\\circ}')}\\,${cs} ${hd('30^{\\circ}')} = 1.327`];
$('#dRn').innerHTML = RN.map((f, i) => `<div class="pr" id="rn${i}" style="top:${330 + i * 58}px">${K(f)}</div>`).join('');
const tRn = [wt('D6', 'Adding'), wt('D6', 'Subtracting'), wt('D7', 'cos'), wt('D7', 'times')];
const F4 = [[`${cs} x + ${cs} y = 2\\,${cs}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`, 'TWO COS'],
  [`${sn} x + ${sn} y = 2\\,${sn}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`, 'SIN, THEN COS'],
  [`${sn} x - ${sn} y = 2\\,${cs}\\left(${HS}\\right)${sn}\\left(${HD}\\right)`, 'COS, THEN SIN'],
  [`${cs} x - ${cs} y = ${red('-')}2\\,${sn}\\left(${HS}\\right)${sn}\\left(${HD}\\right)`, 'MINUS IN FRONT']];
$('#d4R').innerHTML = F4.map(([f, tg], i) => `<div class="f4" id="f4${i}" style="top:${92 + i * 116}px"><div class="n">${i + 1}</div><div class="fx">${K(f)}</div><div class="tg${i === 3 ? ' bad' : ''}">${tg}</div></div>`).join('');
const tF4 = [tD8 + 0.3, T0('D9'), T0('D10'), T0('D11')];
const avA = PUC.avatar($('#sD'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same answer, two ways. Nice.' });

/* ---------- B: live beat graph ---------- */
const bS = $('#bS'), BX0 = 130, BX1 = 1000;
const bL = [['TONE 1', 116, CB], ['TONE 2', 186, '#5F86DB'], ['SUM', 386, C.ink]].map(([s, y, col]) => txt(bS, 36, y, s, { 'font-size': 18, fill: col, 'font-weight': 600, 'letter-spacing': 1.5 }));
const bw1 = mk(bS, 'path', { d: wpath(t => Math.cos(12 * t), BX0, BX1, 0, T4, 110, 22), fill: 'none', stroke: CB, 'stroke-width': 2.2, 'stroke-linejoin': 'round' });
const bw2 = mk(bS, 'path', { fill: 'none', stroke: LB, 'stroke-width': 2.2, 'stroke-linejoin': 'round' });
mk(bS, 'line', { x1: BX0, y1: 380, x2: BX1, y2: 380, stroke: C.line, 'stroke-width': 1.5 });
const bws = mk(bS, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 2.6, 'stroke-linejoin': 'round' });
const ben = [1, -1].map(() => mk(bS, 'path', { fill: 'none', stroke: HDC, 'stroke-width': 4, 'stroke-dasharray': '12 9' }));
const bTag = txt(bS, BX1, 254, '', { 'text-anchor': 'end', 'font-size': 18, fill: HDC, 'font-weight': 600 });
const tb1 = wt('B5', 'pull'), tb1e = wt('B6', 'faster') + 0.3, tb2 = wt('B6', 'no') - 0.3;
const bOf = t => 11 - 2 * M.io((t - tb1) / Math.max(1, tb1e - tb1)) + 3 * M.io((t - tb2) / 0.9);
let bLast = null;
const nf = v => (Math.round(v * 100) / 100).toString();
const setB = b => {
  if (b === bLast) return; bLast = b;
  const s = (12 + b) / 2, d = (12 - b) / 2;
  attr(bw2, 'd', wpath(t => Math.cos(b * t), BX0, BX1, 0, T4, 180, 22));
  attr(bws, 'd', wpath(t => Math.cos(12 * t) + Math.cos(b * t), BX0, BX1, 0, T4, 380, 80, 1100));
  ben.forEach((p, i) => attr(p, 'd', wpath(t => (i ? -2 : 2) * Math.cos(d * t), BX0, BX1, 0, T4, 380, 80, 300)));
  $('#bT2').innerHTML = K(`${cs}(${nf(b)}\\,t)`); $('#bGap').textContent = nf(12 - b);
  $('#bF').innerHTML = K(`2\\,${cs}(${hs(nf(s) + '\\,t')})\\,${cs}(${hd(nf(d) + '\\,t')})`);
  M.setT(bTag, d < 0.01 ? 'no wobble: the gap is zero' : 'the wobble: cos of the half difference');
};
$('#bT1').innerHTML = K(`${cs}(12\\,t)`);

/* ---------- S: sum to product vs product to sum ---------- */
$('#slA').innerHTML = K(`${cs} x + ${cs} y`); $('#slB').innerHTML = K(`= 2\\,${cs}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`);
const PS = [`2\\,${cs} ${A}\\,${cs} ${B} = ${cs}(${A}+${B}) + ${cs}(${A}-${B})`, `-2\\,${sn} ${A}\\,${sn} ${B} = ${cs}(${A}+${B}) - ${cs}(${A}-${B})`,
  `2\\,${sn} ${A}\\,${cs} ${B} = ${sn}(${A}+${B}) + ${sn}(${A}-${B})`, `2\\,${cs} ${A}\\,${sn} ${B} = ${sn}(${A}+${B}) - ${sn}(${A}-${B})`];
$('#srR').innerHTML = PS.map((f, i) => `<div class="pr" id="ps${i}" style="top:${92 + i * 86}px">${K(f)}</div>`).join('');
const th1 = PUC.think($('#th1'), { q: `${K(`2\\,${sn} 3x\\,${cs} x`)} is a product. Which way do we go?`, opts: ['Product to sum', 'Sum to product'], right: 0,
  why: `Product to sum: ${K(`2\\,${sn} A\\,${cs} B = ${sn}(A+B) + ${sn}(A-B)`)}, so it becomes ${K(`${sn} 4x + ${sn} 2x`)}` });

/* ---------- statement ---------- */
$('#st2').innerHTML = `Half <span style="color:${HSC}">sum</span>, half <span style="color:${HDC}">difference</span>.`;
$('#stF').innerHTML = K(`${cs} x + ${cs} y = 2\\,${cs}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find the exact value of ${K(`${sn} 75^{\\circ} + ${sn} 15^{\\circ}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${sn} x + ${sn} y = 2\\,${sn}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`)],
  [K(`${hs('\\tfrac{75^{\\circ}+15^{\\circ}}{2} = 45^{\\circ}')},\\quad ${hd('\\tfrac{75^{\\circ}-15^{\\circ}}{2} = 30^{\\circ}')}`)],
  [K(`= 2\\,${sn} ${hs('45^{\\circ}')}\\,${cs} ${hd('30^{\\circ}')}`)],
  [K(`= 2 \\cdot \\tfrac{\\sqrt{2}}{2} \\cdot \\tfrac{\\sqrt{3}}{2} = \\tfrac{\\sqrt{6}}{2}`)],
  ['≈ 1.2247, the height of R']], { label: 'WORKED EXAMPLE', y0: 148, dy: 84 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '62px';
const tW = [wt('W3', 'sine'), wt('W4', 'half'), wt('W5', 'sum'), wt('W6', 'two'), wt('W7', 'height')];
const cw = circ($('#wS'), { cx: 210, cy: 420, r: 140, x0: 50, x1: 740, y0: 90, y1: 568 });
const wSet = cw.set(75, 15);
const wHtL = txt($('#wS'), wSet.rx + 22, (420 + wSet.ry) / 2 + 8, 'sin 75° + sin 15° ≈ 1.22', { 'font-size': 20, fill: SC, 'font-weight': 600 });
const wAngL = txt($('#wS'), 210 + 62, 420 - 14, '45°', { 'font-size': 20, fill: HSC, 'font-weight': 600 });
const wLenL = txt($('#wS'), wSet.rx - 70, wSet.ry - 22, 'OR = 2 cos 30°', { 'font-size': 20, fill: HDC, 'font-weight': 600, 'text-anchor': 'end' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${cs} 80^{\\circ} - ${cs} 20^{\\circ} = 2\\,${sn} 50^{\\circ}\\,${sn} 30^{\\circ}`), right: K(`= ${red('-')}2\\,${sn} 50^{\\circ}\\,${sn} 30^{\\circ} = -${sn} 50^{\\circ}`) + '&nbsp; negative' });
const ts = $('#tS'), TBY = 222;
mk(ts, 'line', { x1: 60, y1: TBY, x2: 500, y2: TBY, stroke: C.ink, 'stroke-width': 2.5 });
const tBars = [[20, 150], [80, 330]].map(([a, x]) => { const h = 150 * Math.cos(rad(a)); const g = mk(mk(ts, 'g', {}), 'g', {}); mk(g, 'rect', { x: x - 40, y: TBY - h, width: 80, height: h, rx: 6, fill: CB }); txt(g, x, TBY - h - 12, Math.cos(rad(a)).toFixed(2), { 'text-anchor': 'middle', 'font-size': 20, fill: CB, 'font-weight': 600 }); txt(g, x, TBY + 30, `cos ${a}°`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); return g; });
const tArr = PUC.arrow(ts, C.red, 4, 14); const tArrG = tArr.g; tArr.set(200, 70, 284, 170);
const tNote = txt(ts, 420, 110, 'smaller', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Simplify or evaluate sums and products of sines and cosines' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`${sn}\\alpha + ${sn}\\beta = \\tfrac{1}{3},\\quad ${cs}\\alpha + ${cs}\\beta = \\tfrac{1}{2}`)}<br>Then ${K(`${cs}(\\alpha+\\beta)`)} equals`,
  opts: [K('\\tfrac{12}{13}'), K('\\tfrac{5}{13}'), K('-\\tfrac{5}{13}'), K('\\tfrac{7}{13}')], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [
  [K(`${hs('s')} = ${hs('\\tfrac{\\alpha+\\beta}{2}')},\\ \\ ${hd('d')} = ${hd('\\tfrac{\\alpha-\\beta}{2}')}`)],
  [K(`${sn}\\alpha + ${sn}\\beta = 2\\,${sn} ${hs('s')}\\,${cs} ${hd('d')}`)],
  [K(`${cs}\\alpha + ${cs}\\beta = 2\\,${cs} ${hs('s')}\\,${cs} ${hd('d')}`)],
  [K(`\\tan ${hs('s')} = \\tfrac{1/3}{1/2} = \\tfrac{2}{3}`)],
  [K(`${cs} 2${hs('s')} = \\tfrac{1 - 4/9}{1 + 4/9} = \\tfrac{5}{13}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Turn'), wt('A2', 'products'), wt('A2', 'Both'), wt('A3', 'tan'), wt('A4', 'One')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · sums and products', y0: 96, dy: 78,
  lines: [K(`${sn} x + ${sn} y = 2\\,${sn}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`),
    K(`${sn} x - ${sn} y = 2\\,${cs}\\left(${HS}\\right)${sn}\\left(${HD}\\right)`),
    K(`${cs} x + ${cs} y = 2\\,${cs}\\left(${HS}\\right)${cs}\\left(${HD}\\right)`),
    K(`${cs} x - ${cs} y = ${red('-')}2\\,${sn}\\left(${HS}\\right)${sn}\\left(${HD}\\right)`),
    K(`2\\,${cs} A\\,${cs} B = ${cs}(A+B) + ${cs}(A-B)`)] });
const YQ = [`Write ${K(`${cs} 4x + ${cs} 2x`)} as a product.`, `Find the exact value of ${K(`${sn} 75^{\\circ} - ${sn} 15^{\\circ}`)}`, `Turn ${K(`2\\,${cs} 5x\\,${cs} x`)} into a sum.`];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 36', topic: 'Half height, again and again forever: Trigonometric Equations', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('I4', 'middle') - 0.2, 1.08, 560, 590], [T0('I6') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: three tones */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tI1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('I1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hL[0], t, tMorph + 0.3, 1e9, { dy: 0 }); M.draw(hw1, t, tMorph + 0.35, 1.2);
    M.vis(hL[1], t, tMorph + 0.6, 1e9, { dy: 0 }); M.draw(hw2, t, tMorph + 0.65, 1.2);
    M.vis(hPlus, t, wt('H3', 'Add') - 0.1, 1e9, POP);
    M.vis(hL[2], t, wt('H3', 'Add'), 1e9, { dy: 0 }); M.draw(hws, t, wt('H3', 'Add') + 0.1, 1.6, x => x);
    hen.forEach(p => M.draw(p, t, wt('H3', 'wobble') - 0.1, 1.0));
    M.vis($('#hP1'), t, wt('H3', 'Loud') - 0.1, 1e9, POP);
    M.vis($('#hP2'), t, wt('H4', 'product') - 0.15, 1e9, POP);
    M.vis($('#hk'), t, T0('H2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, T0('H2') + 0.6, 1e9, { dy: 20 }); M.vis($('#hkF'), t, wt('H2', 'Diya'), 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Where') - 0.1, 1e9, POP);
  }

  /* I + L: unit circle picture, then the live slide */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('D1');
    M.vis($('#ic'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const y = Math.round(yOf(t)), r = ci.set(70, y);
    const tP = wt('I2', 'mark'), tQq = wt('I2', 'Q');
    [ci.ax, ci.ay, ci.c, ci.o].forEach(e => M.vis(e, t, tI1 + 0.3, 1e9, { dy: 0, fade: 0.3 }));
    M.vis(ci.op, t, tP, 1e9, { dy: 0, fade: 0.2 }); M.vis(ci.P.gg, t, tP, 1e9, { dy: 0, fade: 0.15 }); M.vis(ci.P.l, t, tP + 0.1, 1e9, { dy: 0 });
    M.vis(ci.oq, t, tQq, 1e9, { dy: 0, fade: 0.2 }); M.vis(ci.Q.gg, t, tQq, 1e9, { dy: 0, fade: 0.15 }); M.vis(ci.Q.l, t, tQq + 0.1, 1e9, { dy: 0 });
    const tR = wt('I3', 'Add');
    M.vis(ci.pr, t, tR, 1e9, { dy: 0, fade: 0.3 }); M.vis(ci.qr, t, tR + 0.15, 1e9, { dy: 0, fade: 0.3 });
    M.vis(ci.R.gg, t, wt('I3', 'reach') - 0.1, 1e9, { dy: 0, fade: 0.15 }); M.vis(ci.R.l, t, wt('I3', 'reach'), 1e9, { dy: 0 });
    M.vis(ci.arcS, t, tIs[2] - 0.1, 1e9, { dy: 0, fade: 0.25 });
    M.vis(ci.or, t, tIs[3] - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(ci.arcD, t, tIs[3] + 0.3, 1e9, { dy: 0, fade: 0.25 });
    M.vis(ci.proj, t, wt('I6', 'across') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(ci.drop, t, wt('I6', 'across'), 1e9, { dy: 0, fade: 0.25 });
    attr(iProjL, 'x', ((270 + r.rx) / 2).toFixed(1)); iLeg.forEach((g, i) => M.vis(g, t, [tIs[2], tIs[3], wt('I6', 'across')][i], 1e9, { dy: 0, fade: 0.3 })); M.vis(iProjL, t, wt('I6', 'across') + 0.1, 1e9, { dy: 0 });
    M.hide(ci.ht, true);
    // right: what the picture says, then the live readouts
    M.vis($('#ir'), t, wt('I2', 'On') - 0.1, OUT('L1'), { dx: 60, dy: 0, ...o });
    IS.forEach((_, i) => { const el = $('#is' + i); M.vis(el.querySelector('.n'), t, tIs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tIs[i], 0.8); M.vis(el.querySelector('.why'), t, tIs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tIs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#iHi'); M.vis(hb, t, tIs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#lr'), t, tL1 + 0.1, out, { dx: 60, dy: 0, ...o });
    if (t >= tL1) { setL(y); M.vis($('#lY'), t, tL1 + 0.3, 1e9, { dy: 14 });
      ['#lF1', '#lV1', '#lF2', '#lV2'].forEach((s, i) => M.vis($(s), t, tL1 + 0.5 + i * 0.12, 1e9, { dy: 10 }));
      M.vis($('#lEq'), t, wt('L2', 'never') - 0.1, 1e9, POP); }
  }

  /* D: proof + rename + all four */
  const dOn = t >= tD1 - 0.1 && t < tB1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('D8');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.9); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDs.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D4') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tc = wt('D4', 'cancel') - 0.1, u = M.io((t - tc) / 0.6);
    M.vis($('#cc0'), t, T0('D4') + 0.2, 1e9, { dy: 12 }); M.vis($('#cc1'), t, T0('D4') + 0.35, 1e9, { dy: 12 });
    $('#cc0').style.left = '36px'; $('#cc1').style.left = '330px'; $('#ccS').style.width = (u * 560).toFixed(1) + 'px';
    if (t > tc + 0.4) { const fo = (1 - 0.6 * M.io((t - tc - 0.4) / 0.4)).toFixed(3); $('#cc0').style.opacity = fo; $('#cc1').style.opacity = fo; }
    M.vis($('#cc2'), t, tc + 0.7, 1e9, POP); M.vis($('#ccE'), t, tc + 0.5, 1e9, POP); M.hide($('#ccS'), u <= 0);
    M.vis($('#dRl'), t, tRn[0] - 0.4, 1e9, { dy: 10 });
    RN.forEach((_, i) => PUC.write($('#rn' + i), t, tRn[i], 0.7));
    avA(t, T1('D7') - 0.2, out);
    M.vis($('#d4'), t, tD8 + 0.05, OUT('B1'), { dy: 36, ...o });
    M.vis($('#lg0'), t, tD8 + 0.5, 1e9, POP); M.vis($('#lg1'), t, tD8 + 0.65, 1e9, POP);
    F4.forEach((_, i) => { const el = $('#f4' + i); M.vis(el, t, tF4[i] - 0.1, 1e9, { dy: 14 }); PUC.write(el.querySelector('.fx'), t, tF4[i], 0.9); M.vis(el.querySelector('.tg'), t, tF4[i] + 0.8, 1e9, POP); });
  }

  /* B: live beat graph */
  const bOn = t >= tB1 - 0.1 && t < tS1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('S1');
    setB(Math.round(bOf(t) * 20) / 20);
    M.vis($('#bg'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis(bL[0], t, wt('B2', 'one'), 1e9, { dy: 0 }); M.draw(bw1, t, wt('B2', 'one'), 1.0);
    M.vis(bL[1], t, wt('B2', 'two', 1) - 0.1, 1e9, { dy: 0 }); M.vis(bw2, t, wt('B2', 'two', 1), 1e9, { dy: 0, fade: 0.5 });
    M.vis(bL[2], t, T0('B3'), 1e9, { dy: 0 }); M.vis(bws, t, T0('B3') + 0.1, 1e9, { dy: 0, fade: 0.6 });
    ben.forEach(p => M.vis(p, t, wt('B4', 'slow') - 0.1, 1e9, { dy: 0, fade: 0.4 })); M.vis(bTag, t, wt('B4', 'wobble') - 0.1, 1e9, { dy: 0 });
    M.vis($('#br'), t, T0('B2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#bT1'), t, wt('B2', 'one') + 0.1, 1e9, { dy: 10 }); M.vis($('#bT2'), t, wt('B2', 'two', 1) + 0.1, 1e9, { dy: 10 });
    M.vis($('#bGap'), t, wt('B2', 'slower'), 1e9, POP);
    M.vis($('#bF'), t, wt('B3', 'formula'), 1e9, { dy: 10 });
    M.vis($('#bP'), t, wt('B6', 'bigger') - 0.1, 1e9, POP);
  }

  /* S: side by side + pause and think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#slA'), t, wt('S1', 'Sum') + 0.1, 0.6); PUC.write($('#slB'), t, wt('S1', 'times') - 0.1, 0.9);
    M.vis($('#slU'), t, wt('S1', 'Use') - 0.1, 1e9, { dy: 10 }); M.vis($('#su0'), t, wt('S1', 'factorise') - 0.1, 1e9, POP); M.vis($('#su1'), t, wt('S1', 'simplify') - 0.1, 1e9, POP);
    M.vis($('#slP'), t, wt('S1', 'plus') - 0.1, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PS.forEach((_, i) => PUC.write($('#ps' + i), t, (i === 0 ? wt('S2', 'plus') + 0.2 : wt('S2', 'pieces') + (i - 1) * 0.45) - 0.1, 0.8));
    M.vis($('#srP'), t, wt('S2', 'plus') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tS3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tS3, tOpts: wt('S3', 'Which') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Two') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Half') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'whole') - 0.2, 0.9);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    const t0 = T0('W2') + 0.6;
    [cw.ax, cw.ay, cw.c, cw.o].forEach(e => M.vis(e, t, t0, 1e9, { dy: 0, fade: 0.3 }));
    [cw.op, cw.P.gg, cw.P.l].forEach(e => M.vis(e, t, wt('W2', 'seventy') - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    [cw.oq, cw.Q.gg, cw.Q.l].forEach(e => M.vis(e, t, wt('W2', 'fifteen') - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    [cw.pr, cw.qr, cw.R.gg, cw.R.l].forEach(e => M.vis(e, t, tW[0] + 0.3, 1e9, { dy: 0, fade: 0.25 }));
    M.vis(cw.arcS, t, wt('W4', 'forty') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(wAngL, t, wt('W4', 'forty'), 1e9, { dy: 0 });
    M.vis(cw.or, t, wt('W4', 'thirty') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.vis(cw.arcD, t, wt('W4', 'thirty'), 1e9, { dy: 0, fade: 0.25 }); M.vis(wLenL, t, wt('W5', 'cos'), 1e9, { dy: 0 });
    M.hide(cw.proj, true); M.hide(cw.drop, true);
    M.draw(cw.ht, t, wt('W7', 'height') - 0.2, 0.6); M.vis(wHtL, t, wt('W7', 'height'), 1e9, { dy: 0 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'smaller') - 0.1, tRight: wt('X3', 'right') - 0.1 });
    tBars.forEach((g, i) => M.vis(g, t, wt('X3', 'cos') - 0.1 + i * 0.35, 1e9, { dy: 16 }));
    M.vis(tArrG, t, wt('X3', 'smaller'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tNote, t, wt('X3', 'smaller') + 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'short') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
