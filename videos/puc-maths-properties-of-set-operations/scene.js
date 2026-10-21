// PUC Maths Ep 11: Properties of set operations (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): set A blue, set B teal, third set C gold, U ink outline; shaded result = coral tint
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', BC = '#0E8F8F', CC = C.gold, ACB = '#E7EEFD', BCB = '#DDF1F1', HIT = '#FBDCD2', GREY = '#E6E8EE';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, cc = s => `\\textcolor{${CC}}{${s}}`;
const A = ac('A'), B = bc('B'), Cs = cc('C'), Ap = ac("A'"), Bp = bc("B'");
const LT = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'middle' };
const ok = () => `<div class="chip" style="position:static;background:${C.ok}">${M.icon('check', 20, '#fff', 3)}SAME</div>`;

/* ---------- geometry ---------- */
const circ = (x, y, r) => `M${x - r},${y} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 Z`;
const rectP = (x, y, w, h, q = 16) => `M${x + q},${y} H${x + w - q} Q${x + w},${y} ${x + w},${y + q} V${y + h - q} Q${x + w},${y + h} ${x + w - q},${y + h} H${x + q} Q${x},${y + h} ${x},${y + h - q} V${y + q} Q${x},${y} ${x + q},${y} Z`;
const v2 = (svg, o) => {
  const { xa, xb, cy, r } = o, d = xb - xa, mx = (xa + xb) / 2, h = Math.sqrt(r * r - d * d / 4), T = `${mx},${cy - h}`, Bt = `${mx},${cy + h}`;
  const g = mk(svg, 'g', {}), R = {};
  R.out = mk(g, 'path', { d: rectP(...o.rect) + ` M${T} A${r},${r} 0 1 0 ${Bt} A${r},${r} 0 1 0 ${T} Z`, 'fill-rule': 'evenodd', fill: '#FFFFFF' });
  R.a = mk(g, 'path', { d: `M${T} A${r},${r} 0 1 0 ${Bt} A${r},${r} 0 0 1 ${T} Z`, fill: '#FFFFFF' });
  R.ab = mk(g, 'path', { d: `M${T} A${r},${r} 0 0 1 ${Bt} A${r},${r} 0 0 1 ${T} Z`, fill: '#FFFFFF' });
  R.b = mk(g, 'path', { d: `M${T} A${r},${r} 0 1 1 ${Bt} A${r},${r} 0 0 0 ${T} Z`, fill: '#FFFFFF' });
  const rect = mk(g, 'path', { d: rectP(...o.rect), fill: 'none', stroke: C.ink, 'stroke-width': 3 });
  const cA = mk(g, 'circle', { cx: xa, cy, r, fill: 'none', stroke: AC, 'stroke-width': 3.5 }), cB = mk(g, 'circle', { cx: xb, cy, r, fill: 'none', stroke: BC, 'stroke-width': 3.5 });
  txt(g, xa - r * 0.82, cy - r * 0.78, 'A', { ...LT, 'font-size': 40, fill: AC }); txt(g, xb + r * 0.82, cy - r * 0.78, 'B', { ...LT, 'font-size': 40, fill: BC });
  txt(g, o.rect[0] + 30, o.rect[1] + 42, 'U', { ...LT, 'font-size': 34, fill: C.ink });
  return { g, R, rect, cA, cB, fill(k, c) { attr(R[k], 'fill', c); } };
};
const V3 = [[392, 272], [330, 374], [454, 374]], VR3 = 100;
const v3 = (svg, pre) => {
  const defs = mk(svg, 'defs', {}); const cp = mk(defs, 'clipPath', { id: pre + 'A' }); mk(cp, 'circle', { cx: V3[0][0], cy: V3[0][1], r: VR3 });
  const lay = {};
  lay.bc = mk(svg, 'g', {}); [1, 2].forEach(i => mk(lay.bc, 'circle', { cx: V3[i][0], cy: V3[i][1], r: VR3, fill: GREY }));
  lay.aB = mk(svg, 'g', { 'clip-path': `url(#${pre}A)` }); mk(lay.aB, 'circle', { cx: V3[1][0], cy: V3[1][1], r: VR3, fill: HIT });
  lay.aC = mk(svg, 'g', { 'clip-path': `url(#${pre}A)` }); mk(lay.aC, 'circle', { cx: V3[2][0], cy: V3[2][1], r: VR3, fill: HIT });
  [AC, BC, CC].forEach((col, i) => mk(svg, 'circle', { cx: V3[i][0], cy: V3[i][1], r: VR3, fill: 'none', stroke: col, 'stroke-width': 3.5 }));
  [['A', 280, 200, AC], ['B', 222, 470, BC], ['C', 562, 470, CC]].forEach(([l, x, y, col]) => txt(svg, x, y, l, { ...LT, 'font-size': 36, fill: col }));
  return lay;
};
const op = (el, v) => attr(el, 'opacity', M.clamp(v).toFixed(3));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tC1 = T0('C1'), tI1 = T0('I1'), tD1 = T0('D1'), tK1 = T0('K1'), tT = T0('T1'), tM1 = T0('M1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tM1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['ADDITION · ORDER DOES NOT MATTER', K('2 + 3 = 3 + 2')], ['SUBTRACTION · ORDER MATTERS', K('5 - 2 \\ne 2 - 5')]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${424 + i * 552}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'two') - 0.05, wt('H1', 'five') - 0.05];

/* ---------- H ---------- */
const HQ = [['2 + 3 = 3 + 2', 1], ['5 - 2 \\ne 2 - 5', 0], [`${A} \\cup ${B} \\overset{?}{=} ${B} \\cup ${A}`, 2], [`${A} \\cup (${B} \\cap ${Cs}) \\overset{?}{=} \\ ?`, 2]];
$('#hcs').innerHTML = HQ.map(([f, s], i) => `<div class="qr" id="hq${i}" style="top:${84 + i * 100}px"><div class="f">${K(f)}</div>${s < 2 ? `<div class="chip" style="right:20px;top:20px;background:${s ? C.ok : C.red}">${M.icon(s ? 'check' : 'x', 20, '#fff', 3)}${s ? 'ORDER FREE' : 'ORDER MATTERS'}</div>` : `<div class="chip" style="right:20px;top:20px;background:${RC}">?</div>`}</div>`).join('');
const tHq = [wt('H1', 'two'), wt('H1', 'five'), wt('H4', 'union'), wt('H4', 'mixes')];

/* ---------- C: order and brackets ---------- */
const CST = [[`${A} \\cup ${B} = ${B} \\cup ${A}`, 'union is commutative'], [`${A} \\cap ${B} = ${B} \\cap ${A}`, 'intersection too'], [`(${A} \\cup ${B}) \\cup ${Cs} = ${A} \\cup (${B} \\cup ${Cs})`, 'union is associative'], [`(${A} \\cap ${B}) \\cap ${Cs} = ${A} \\cap (${B} \\cap ${Cs})`, 'intersection too']];
$('#cSt').innerHTML = CST.map(([f, w], i) => `<div class="st" id="cs${i}" style="top:${82 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tCs = [wt('C2', 'commutative'), wt('C2', 'Intersection'), wt('C4', 'associative'), wt('C4', 'Intersection')];
$('#cSet').innerHTML = K(`${A} = \\{1, 2, 3\\} \\quad ${B} = \\{3, 4\\} \\quad ${Cs} = \\{4, 5\\}`);
const SRC = { 1: AC, 2: AC, 3: AC, 4: BC, 5: CC };
// two phases x two rows: [label, [[n, colour, t], ...]]
const PH = [
  [[`${A} \\cup ${B}`, [[1, AC, wt('C1', 'collects')], [2, AC, wt('C1', 'collects') + 0.15], [3, AC, wt('C1', 'collects') + 0.3], [4, BC, wt('C1', 'B') + 0.1]]],
   [`${B} \\cup ${A}`, [[3, BC, wt('C1', 'B', 1)], [4, BC, wt('C1', 'B', 1) + 0.15], [1, AC, wt('C1', 'collects', 1)], [2, AC, wt('C1', 'collects', 1) + 0.15]]]],
  [[`(${A} \\cup ${B}) \\cup ${Cs}`, [[1, AC, wt('C3', 'Join')], [2, AC, wt('C3', 'Join') + 0.12], [3, AC, wt('C3', 'Join') + 0.24], [4, BC, wt('C3', 'Join') + 0.36], [5, CC, wt('C3', 'C')]]],
   [`${A} \\cup (${B} \\cup ${Cs})`, [[3, BC, wt('C3', 'join', 1)], [4, BC, wt('C3', 'join', 1) + 0.12], [5, CC, wt('C3', 'join', 1) + 0.24], [1, AC, wt('C3', 'add', 1) + 0.2], [2, AC, wt('C3', 'add', 1) + 0.32]]]]];
$('#cTk').innerHTML = [0, 1].map(r => [1, 2, 3, 4, 5].map(n => `<div class="tk" id="tk${r}${n}" style="left:${60 + (n - 1) * 84}px;top:${(r ? 310 : 140) + 66}px">${n}</div>`).join('')).join('');
const tPh2 = T0('C3'), tOk = [wt('C1', 'same'), wt('C4', 'Either')];
$('#cBad').innerHTML = `${K(`${A} - ${B} \\ne ${B} - ${A}`)}&nbsp;difference is not commutative`;
$('#cr0 .ok').innerHTML = ok(); $('#cr1 .ok').innerHTML = ok();

/* ---------- I: special sets ---------- */
const IST = [[`${A} \\cup \\phi = ${A}`, 'the empty set adds nothing'], [`${A} \\cup U = U`, 'U already holds everything'], [`${A} \\cap \\phi = \\phi \\qquad ${A} \\cap U = ${A}`, 'for intersection, it flips'], [`${A} \\cup ${A} = ${A} \\qquad ${A} \\cap ${A} = ${A}`, 'idempotent: doing it twice changes nothing']];
$('#iSt').innerHTML = IST.map(([f, w], i) => `<div class="st" id="is${i}" style="top:${82 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tIs = [T0('I1'), T0('I2'), T0('I3'), T0('I4')];
const is = $('#iS'), IRx = [56, 76, 672, 392], ICx = 392, ICy = 272, IR = 130;
const iOut = mk(is, 'path', { d: rectP(...IRx) + ' ' + circ(ICx, ICy, IR), 'fill-rule': 'evenodd', fill: '#FFFFFF' });
const iIn = mk(is, 'circle', { cx: ICx, cy: ICy, r: IR, fill: '#FFFFFF' });
mk(is, 'path', { d: rectP(...IRx), fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const iCopyP = mk(is, 'g', {}), iCopy = mk(iCopyP, 'circle', { cx: ICx, cy: ICy, r: IR, fill: 'none', stroke: AC, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
mk(is, 'circle', { cx: ICx, cy: ICy, r: IR, fill: 'none', stroke: AC, 'stroke-width': 3.5 });
txt(is, ICx - IR * 0.82, ICy - IR * 0.78, 'A', { ...LT, 'font-size': 40, fill: AC }); txt(is, 86, 118, 'U', { ...LT, 'font-size': 34, fill: C.ink });
const ITAG = ['Result: A', 'Result: all of U', 'With φ: nothing · with U: A', 'A with A: still A'];

/* ---------- D: distributive ---------- */
$('#dlT').innerHTML = K(`${A} \\cap (${B} \\cup ${Cs})`); $('#drT').innerHTML = K(`(${A} \\cap ${B}) \\cup (${A} \\cap ${Cs})`);
const dL = v3($('#dlV'), 'ep11l'), dR = v3($('#drV'), 'ep11r');
const tD3a = wt('D3', 'Shade'), tD3b = wt('D3', 'keep'), tD4a = wt('D4', 'Shade'), tD4b = wt('D4', 'add');
$('#drP').innerHTML = `Also: ${K(`${A} \\cup (${B} \\cap ${Cs}) = (${A} \\cup ${B}) \\cap (${A} \\cup ${Cs})`)}`;

/* ---------- K: numbers vs sets ---------- */
const chip = (y) => `<div class="chip" style="background:${y ? C.ok : C.red}">${M.icon(y ? 'check' : 'x', 20, '#fff', 3)}${y ? 'TRUE' : 'FALSE'}</div>`;
$('#knR').innerHTML = [[`2 \\times (3 + 4) = 2 \\times 3 + 2 \\times 4`, '14 = 14', 1], [`2 + (3 \\times 4) \\ne (2 + 3) \\times (2 + 4)`, '14 ≠ 30', 0]].map(([f, v, y], i) => `<div class="cm" id="kn${i}" style="top:${84 + i * 170}px"><div class="f">${K(f)}</div><div class="v" style="color:${y ? C.ok : C.red}">${v}</div>${chip(y)}</div>`).join('');
$('#ksR').innerHTML = [[`${A} \\cap (${B} \\cup ${Cs}) = (${A} \\cap ${B}) \\cup (${A} \\cap ${Cs})`, '∩ spreads over ∪'], [`${A} \\cup (${B} \\cap ${Cs}) = (${A} \\cup ${B}) \\cap (${A} \\cup ${Cs})`, '∪ spreads over ∩ too']].map(([f, v], i) => `<div class="cm" id="ks${i}" style="top:${84 + i * 170}px"><div class="f" style="font-size:30px">${K(f)}</div><div class="v" style="color:${C.ok}">${v}</div>${chip(1)}</div>`).join('');
document.querySelectorAll('#sK .cm .chip').forEach(c => { c.style.top = '84px'; });
const th1 = PUC.think($('#th1'), { q: 'For sets, does union spread over intersection too?', opts: ['Yes', 'No'], right: 0, why: 'Yes: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C). Both distributive laws hold.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${A} \\cap (${B} \\cup ${Cs}) = (${A} \\cap ${B}) \\cup (${A} \\cap ${Cs})`);

/* ---------- M: De Morgan ---------- */
const mV = v2($('#mS'), { rect: [36, 76, 712, 404], xa: 300, xb: 484, cy: 290, r: 140 });
const MST = [[`(${A} \\cup ${B})'`, 'everything outside both circles'], [`${Ap} \\ \\text{and}\\ ${Bp}`, 'outside A, and outside B'], [`(${A} \\cup ${B})' = ${Ap} \\cap ${Bp}`, 'outside both = where A′ and B′ overlap'], [`(${A} \\cap ${B})' = ${Ap} \\cup ${Bp}`, 'the complement flips ∩ into ∪']];
$('#mSt').innerHTML = MST.map(([f, w], i) => `<div class="st" id="ms${i}" style="top:${82 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tMs = [wt('M2', 'complement'), wt('M3', 'Outside'), wt('M4', 'So'), wt('M5', 'same')];
const MTAG = [`${K(`(${A} \\cup ${B})'`)}: outside both`, `${K(Ap)} blue tint · ${K(Bp)} teal tint`, `${K(`${Ap} \\cap ${Bp}`)}: the coral part`, `${K(`(${A} \\cap ${B})'`)}: all but the overlap`];
const th2 = PUC.think($('#th2'), { q: "Is (A ∪ B)′ the same as A′ ∪ B′?", opts: ['Yes', 'No'], right: 1, why: "No: A′ ∪ B′ = (A ∩ B)′. It also covers the parts inside only one circle." });

/* ---------- W ---------- */
$('#wq').innerHTML = `${K('U = \\{1, \\dots, 8\\}')}, ${K(`${A} = \\{1, 2, 3, 4\\}`)}, ${K(`${B} = \\{3, 4, 5, 6\\}`)}<br>Check: ${K(`(${A} \\cup ${B})' = ${Ap} \\cap ${Bp}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${A} \\cup ${B} = \\{${xc('1, 2, 3, 4, 5, 6')}\\}`)],
  [K(`(${A} \\cup ${B})' = \\{${xc('7, 8')}\\}`)],
  [K(`${Ap} = \\{${xc('5, 6, 7, 8')}\\},\\ \\ ${Bp} = \\{${xc('1, 2, 7, 8')}\\}`)],
  [K(`${Ap} \\cap ${Bp} = \\{${xc('7, 8')}\\}`)],
  [K(`\\text{both sides} = \\{${xc('7, 8')}\\} \\ \\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const tW = [wt('W3', 'union'), wt('W4', 'complement'), wt('W5', 'A'), wt('W6', 'both'), wt('W7', 'Both')];
const ws = $('#wS'), wV = v2(ws, { rect: [36, 76, 712, 404], xa: 300, xb: 484, cy: 290, r: 140 });
const WP = { 1: [214, 260], 2: [214, 330], 3: [392, 260], 4: [392, 330], 5: [570, 260], 6: [570, 330], 7: [100, 440], 8: [690, 440] };
const wT = {}; Object.entries(WP).forEach(([n, [x, y]]) => { const pg = mk(ws, 'g', { transform: `translate(${x},${y})` }); wT[n] = mk(pg, 'g', {}); txt(wT[n], 0, 10, n, { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 600, fill: XC }); });
$('#wP').innerHTML = `${K(`(${A} \\cup ${B})' = ${Ap} \\cap ${Bp} = \\{7, 8\\}`)}`;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${A} \\cup (${B} \\cap ${Cs}) = (${A} \\cup ${B}) \\cap ${Cs}`) + '&nbsp; brackets moved', right: K(`${A} \\cup (${B} \\cap ${Cs}) = (${A} \\cup ${B}) \\cap (${A} \\cup ${Cs})`) });
const ts = $('#tS');
const tL = [['A = {1}, B = {2}, C = {3}', C.ink, 70], ['A ∪ (B ∩ C) = {1}', C.ok, 130], ['(A ∪ B) ∩ C = φ', C.red, 190]].map(([s, col, y]) => txt(ts, 40, y, s, { 'font-size': 26, 'font-weight': 600, fill: col }));
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Verify a law or prove an identity; spot the set statement that is not true.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `For any sets ${K(A)} and ${K(B)} in ${K('U')}, simplify<br>${K(`(${A} \\cup ${B}) \\cap (${Ap} \\cup ${B})`)}`,
  opts: [K(`${A} \\cap ${B}`), K(A), K(B), K('U')], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[`both brackets: ${K(`\\cup\\, ${B}`)}`], [K(`= (${A} \\cap ${Ap}) \\cup ${B}`)], [K(`${A} \\cap ${Ap} = \\phi`)], [K(`\\phi \\cup ${B} = ${B}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Both'), wt('A3', 'leaves'), wt('A4', 'empty'), wt('A4', 'just')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · laws of set operations', y0: 98, dy: 78,
  lines: [K(`${A} \\cup ${B} = ${B} \\cup ${A} \\qquad (${A} \\cup ${B}) \\cup ${Cs} = ${A} \\cup (${B} \\cup ${Cs})`),
    K(`${A} \\cup \\phi = ${A} \\quad ${A} \\cap U = ${A} \\quad ${A} \\cup ${A} = ${A} \\cap ${A} = ${A}`),
    K(`${A} \\cap (${B} \\cup ${Cs}) = (${A} \\cap ${B}) \\cup (${A} \\cap ${Cs})`),
    K(`${A} \\cup (${B} \\cap ${Cs}) = (${A} \\cup ${B}) \\cap (${A} \\cup ${Cs})`),
    K(`(${A} \\cup ${B})' = ${Ap} \\cap ${Bp} \\qquad (${A} \\cap ${B})' = ${Ap} \\cup ${Bp}`)] });
const YQ = ['Which law says A ∪ B = B ∪ A?', 'What is A ∩ φ?', "Write (A ∩ B)′ using De Morgan's law."];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 12', topic: '25 like tea, 18 like coffee, 10 like both: how many? Applications of Sets', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tD3a - 0.3, 1.04, 960, 560], [T0('D5') + 0.2, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tC1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('C1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HQ.forEach((_, i) => { const el = $('#hq' + i), a = i < 2 ? tMorph + 0.3 + i * 0.2 : tHq[i] - 0.1; M.vis(el, t, a, 1e9, { dx: -16, dy: 0 }); M.vis(el.querySelector('.chip'), t, a + 0.3, 1e9, POP); });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'laws') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tI1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('I1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    CST.forEach((_, i) => { const el = $('#cs' + i); M.vis(el.querySelector('.n'), t, tCs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tCs[i], 0.8); M.vis(el.querySelector('.why'), t, tCs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(82, tCs.slice(1).map((tt, i) => [tt - 0.1, 82 + (i + 1) * 120]), M.SOFT)(t); const hb = $('#cHi'); M.vis(hb, t, tCs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    M.vis($('#cv'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#cSet'), t, tC1 + 0.5, 1e9, { dy: 10 });
    const ph = t >= tPh2 - 0.2 ? 1 : 0;
    [0, 1].forEach(r => {
      const [lab, ins] = PH[ph][r], row = $('#cr' + r), lb = row.querySelector('.lb');
      if (lb._ph !== ph) { lb._ph = ph; lb.innerHTML = K(lab); }
      M.vis(row, t, tC1 + 0.6 + r * 0.15, 1e9, { dy: 14 });
      M.vis(row.querySelector('.ok'), t, tOk[ph] + 0.2 + r * 0.15, ph === 0 ? tPh2 - 0.25 : 1e9, { ...POP, outDur: 0.15, ody: 0 });
      for (let n = 1; n <= 5; n++) {
        const el = $(`#tk${r}${n}`), it = ins.find(x => x[0] === n);
        if (!it) { M.hide(el, true); continue; }
        const show = ph === 0 ? M.vis(el, t, it[2], tPh2 - 0.25, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08, outDur: 0.15, ody: 0 }) : M.vis(el, t, it[2], 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
        el.style.borderColor = it[1]; el.style.color = it[1];
      }
    });
    M.vis($('#cBad'), t, T0('C5') + 0.2, 1e9, POP);
  }

  /* I */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('D1');
    M.vis($('#il'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o });
    IST.forEach((_, i) => { const el = $('#is' + i); M.vis(el.querySelector('.n'), t, tIs[i], 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tIs[i] + 0.15, 0.8); M.vis(el.querySelector('.why'), t, tIs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(82, tIs.slice(1).map((tt, i) => [tt - 0.1, 82 + (i + 1) * 120]), M.SOFT)(t); const hb = $('#iHi'); M.vis(hb, t, tIs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    M.vis($('#iv'), t, tI1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const s = i => M.io((t - tIs[i] - 0.3) / 0.35);
    let fin = mix('#FFFFFF', HIT, s(0)), fout = mix('#FFFFFF', HIT, s(1));
    fin = mix(fin, '#FFFFFF', s(2)); fout = mix(fout, '#FFFFFF', s(2));
    const iu = M.io((t - wt('I3', 'U') - 0.1) / 0.35); fin = mix(fin, HIT, iu);
    attr(iIn, 'fill', fin); attr(iOut, 'fill', fout);
    const cpx = 220 * (1 - M.io((t - tIs[3] - 0.4) / 0.9)); attr(iCopyP, 'transform', `translate(${cpx.toFixed(1)},0)`); M.vis(iCopy, t, tIs[3] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const cur = tIs.reduce((a, tt, i) => t >= tt ? i : a, 0), tg = $('#iTag'); if (tg._c !== cur) { tg._c = cur; M.setT(tg, ITAG[cur]); }
    M.vis(tg, t, tIs[0] + 0.4, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#dlT'), t, wt('D2', 'intersection') - 0.1, 0.8); PUC.write($('#drT'), t, wt('D2', 'equals'), 1.0);
    const a1 = M.io((t - tD3a) / 0.4), a2 = M.io((t - tD3b) / 0.4);
    op(dL.bc, a1 * (1 - 0.7 * a2)); op(dL.aB, a2); op(dL.aC, a2);
    op(dR.bc, 0); op(dR.aB, M.io((t - tD4a) / 0.4)); op(dR.aC, M.io((t - tD4b) / 0.4));
    M.setT($('#dlS'), t < tD3b ? 'STEP 1 · SHADE B ∪ C' : 'STEP 2 · KEEP THE PART INSIDE A'); M.vis($('#dlS'), t, tD3a - 0.1, 1e9, { dy: 8 });
    M.setT($('#drS'), t < tD4b ? 'STEP 1 · SHADE A ∩ B' : 'STEP 2 · ADD A ∩ C'); M.vis($('#drS'), t, tD4a - 0.1, 1e9, { dy: 8 });
    M.vis($('#dlP'), t, wt('D5', 'same') - 0.1, 1e9, POP); M.vis($('#drP'), t, T0('D6') + 0.2, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kn'), t, tK1 + 0.1, 1e9, { dx: -60, dy: 0, ...o }); M.vis($('#ks'), t, tK1 + 0.3, 1e9, { dx: 60, dy: 0, ...o });
    M.vis($('#kn0'), t, wt('K1', 'multiplication') - 0.1, 1e9, { dy: 14 }); M.vis($('#kn0 .chip'), t, wt('K1', 'plus', 1), 1e9, POP);
    M.vis($('#kn1'), t, wt('K2', 'addition') - 0.1, 1e9, { dy: 14 }); M.vis($('#kn1 .chip'), t, wt('K2', 'thirty'), 1e9, POP);
    M.vis($('#ks0'), t, wt('K1', 'spreads') , 1e9, { dy: 14 }); M.vis($('#ks0 .chip'), t, wt('K1', 'spreads') + 0.4, 1e9, POP);
    const tth = wt('K4', 'both') - 0.1;
    M.vis($('#ks1'), t, tth + 0.3, 1e9, { dy: 14 }); M.vis($('#ks1 .chip'), t, tth + 0.7, 1e9, POP);
    M.vis($('#th1'), t, T0('K3') + 0.05, tth, { dy: 36, ...o });
    th1(t, { tin: T0('K3'), tOpts: wt('K3', 'spread') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: T0('K4') + 0.3 });
  }

  /* statement */
  const stOn = t >= tT && t < tM1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tM1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'order') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'spreads') - 0.2, 0.9);
  }

  /* M: De Morgan */
  const mOn = t >= tM1 - 0.1 && t < tW1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('M6');
    M.vis($('#mv'), t, tM1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis($('#mp'), t, tM1 + 0.5, out, { dx: 60, dy: 0, ...o });
    MST.forEach((_, i) => { const el = $('#ms' + i); M.vis(el.querySelector('.n'), t, tMs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tMs[i], 0.8); M.vis(el.querySelector('.why'), t, tMs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(82, tMs.slice(1).map((tt, i) => [tt - 0.1, 82 + (i + 1) * 120]), M.SOFT)(t); const hb = $('#mHi'); M.vis(hb, t, tMs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    const s1 = M.io((t - wt('M2', 'outside')) / 0.4), sa = M.io((t - wt('M3', 'Outside')) / 0.4), sb = M.io((t - wt('M3', 'Outside', 1)) / 0.4), s5 = M.io((t - tMs[3] - 0.3) / 0.4);
    let fb = mix('#FFFFFF', ACB, sa), fa = mix('#FFFFFF', BCB, sb);
    fb = mix(fb, HIT, s5); fa = mix(fa, HIT, s5);
    mV.fill('out', mix('#FFFFFF', HIT, s1)); mV.fill('a', fa); mV.fill('b', fb); mV.fill('ab', '#FFFFFF');
    const cur = tMs.reduce((a, tt, i) => t >= tt ? i : a, 0), tg = $('#mTag'); if (tg._c !== cur) { tg._c = cur; tg.innerHTML = MTAG[cur]; }
    M.vis(tg, t, tMs[0] + 0.3, 1e9, POP);
    M.vis($('#th2'), t, T0('M6') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('M6'), tOpts: wt('M6', 'same') - 0.1, tCount: T1('M6') + 0.05, dur: 3, tAns: T0('M7') - 0.02, tWhy: wt('M7', 'complement') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    Object.keys(wT).forEach((n, i) => M.vis(wT[n], t, T0('W2') + 0.8 + i * 0.1, 1e9, POP));
    const s1 = M.io((t - tW[0]) / 0.4), s2 = M.io((t - tW[1]) / 0.4), s3 = M.io((t - tW[2]) / 0.4);
    const un = mix(mix('#FFFFFF', HIT, s1), '#FFFFFF', s2);
    wV.fill('ab', un); wV.fill('a', s3 > 0 ? mix(un, BCB, s3) : un); wV.fill('b', s3 > 0 ? mix(un, ACB, s3) : un);
    wV.fill('out', mix('#FFFFFF', HIT, s2));
    M.vis($('#wP'), t, tW[4] + 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'empty') - 0.1, tRight: wt('X3', 'Brackets') });
    M.vis(tL[0], t, wt('X3', 'Test'), 1e9, { dy: 0 }); M.vis(tL[1], t, wt('X3', 'left'), 1e9, { dy: 0 }); M.vis(tL[2], t, wt('X3', 'right'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'verify') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Simplify'), tCount, tAns });
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
