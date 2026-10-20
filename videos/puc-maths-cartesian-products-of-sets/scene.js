// PUC Maths Ep 13: Cartesian products of sets (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 2): first set A (and its elements, its count p) blue, second set B (its elements, count q) teal, pairs / arrows / grid dots coral accent
const AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1', PC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const pr = (a, b) => `(${ac(a)},\\ ${bc(b)})`;
const sp = (s, col) => `<span style="color:${col}">${s}</span>`;
const pt = (a, b) => `(${sp(a, AC)}, ${sp(b, BC)})`;
// a pin in an svg: g translated (outer) + inner g for M.vis
const pin = (p, x, y) => mk(mk(p, 'g', { transform: `translate(${x},${y})` }), 'g', {});
// labelled element chip inside an oval
const chip = (p, x, y, s, col, bg, w) => { const g = pin(p, x, y); const r = mk(g, 'rect', { x: -w / 2, y: -24, width: w, height: 48, rx: 12, fill: bg, stroke: col, 'stroke-width': 2 }); txt(g, 0, 9, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: col }); return { g, r }; };
// growing arrow: from (x1,y1) to (x2,y2) by u
const grow = (a, x1, y1, x2, y2, u) => { if (u <= 0.001) { M.hide(a.g, true); return; } a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tG1 = T0('G1'), tD1 = T0('D1'), tN1 = T0('N1'), tS1 = T0('S1'), tK1 = T0('K1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['3 SNACKS', 'samosa, vada, puff', AC], ['2 DRINKS', 'tea, juice', BC], ['COMBOS?', '1 snack + 1 drink', PC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'three') - 0.05, wt('H1', 'two') - 0.05, wt('H1', 'combos') - 0.05];

/* ---------- H: canteen menu ---------- */
const SN = ['samosa', 'vada', 'puff'], DR = ['tea', 'juice', 'coffee', 'lemonade', 'buttermilk'];
$('#hm').innerHTML = `<div class="mh" style="left:36px;color:${AC}">SNACKS · SET S</div><div class="mh" style="left:400px;color:${BC}">DRINKS · SET D</div>` +
  SN.map((s, i) => `<div class="mi s" id="hs${i}" style="left:36px;top:${124 + i * 80}px;width:320px">${s}</div>`).join('') +
  DR.slice(0, 2).map((s, i) => `<div class="mi d" id="hd${i}" style="left:400px;top:${124 + i * 80}px;width:348px">${s}</div>`).join('') +
  `<div class="mi d" id="hd2" style="left:400px;top:284px;width:348px;background:#fff;border:2.5px dashed ${BC}">+ coffee</div>`;
$('#hRl').innerHTML = `<div class="pillp ac" id="hR0" style="left:0;top:0">Count them: 6</div><div class="pillp" id="hR1" style="left:250px;top:0;background:${BCB};color:${BC}">One more drink: 9</div>`;

/* ---------- P: arrow diagram ---------- */
const ps = $('#pS');
mk(ps, 'ellipse', { cx: 200, cy: 320, rx: 140, ry: 200, fill: ACB, stroke: AC, 'stroke-width': 3 });
mk(ps, 'ellipse', { cx: 590, cy: 320, rx: 130, ry: 160, fill: BCB, stroke: BC, 'stroke-width': 3 });
txt(ps, 80, 150, 'S', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: AC });
txt(ps, 690, 190, 'D', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: BC });
const PSY = [210, 320, 430], PDY = [260, 380];
const pS = SN.map((s, i) => chip(ps, 200, PSY[i], s, AC, '#fff', 150)), pD = DR.slice(0, 2).map((s, i) => chip(ps, 590, PDY[i], s, BC, '#fff', 130));
const pAr = [], pAt = [];
SN.forEach((_, i) => [0, 1].forEach(j => pAr.push({ i, j, a: PUC.arrow(ps, PC, 4, 14) })));
pAt.push(wt('P3', 'tea'), wt('P3', 'juice'), wt('P4', 'Two'), wt('P4', 'Two') + 0.45, wt('P5', 'Two'), wt('P5', 'Two') + 0.45);
const tPick = [wt('P3', 'samosa'), wt('P4', 'vada'), wt('P5', 'puff')];
$('#prs').innerHTML = pAr.map(({ i, j }, k) => `<div class="pr" id="pr${k}" style="top:${84 + k * 66}px"><div class="k">${k + 1}</div>${pt(SN[i], DR[j])}</div>`).join('');

/* ---------- G: grid + live drink count ---------- */
const gs = $('#gS'), GX = [330, 480, 630], GY = [420, 345, 270, 195, 120], GX0 = 236, GY0 = 478;
mk(gs, 'line', { x1: GX0, y1: GY0, x2: 724, y2: GY0, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
mk(gs, 'line', { x1: GX0, y1: GY0, x2: GX0, y2: 90, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const gCl = SN.map((s, i) => { mk(gs, 'line', { x1: GX[i], y1: GY0, x2: GX[i], y2: GY0 + 10, stroke: C.ink, 'stroke-width': 2 }); return txt(gs, GX[i], GY0 + 44, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: AC }); });
const gRows = DR.map((s, r) => {
  const ln = mk(gs, 'line', { x1: GX0, y1: GY[r], x2: 700, y2: GY[r], stroke: BC, 'stroke-width': 2, 'stroke-dasharray': '4 7', opacity: 0.55 });
  const lb = txt(gs, GX0 - 18, GY[r] + 8, s, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: BC });
  const dots = GX.map(x => { const g = pin(gs, x, GY[r]); mk(g, 'circle', { r: 15, fill: PC }); return g; });
  return { ln, lb, dots };
});
const tq = [tG1 + 0.3, tG1 + 0.6, wt('G3', 'Coffee'), wt('G4', 'lemonade'), wt('G4', 'buttermilk')];
const qAt = t => tq.reduce((a, tt, i) => t >= tt - 0.05 && i >= 1 ? i + 1 : a, 2);
$('#gTb').innerHTML = `<div class="tb h" style="top:236px"><span>DRINKS</span><span>COMBOS</span></div>` +
  [2, 3, 4, 5].map((q, i) => `<div class="tb" id="tb${q}" style="top:${284 + i * 48}px"><span style="color:${BC}">${q}</span><span><span style="color:${AC}">3</span> × <span style="color:${BC}">${q}</span> = <span style="color:${PC}">${3 * q}</span></span></div>`).join('');
let gLast = -1;
const avA = PUC.avatar($('#sG'), { x: 976 + 36, y: 270 + 490, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'And a new snack adds a whole column.' });

/* ---------- D: definition ---------- */
$('#dfF').innerHTML = K(`P \\times Q = \\{\\, (${ac('p')},\\ ${bc('q')}) : ${ac('p')} \\in ${ac('P')},\\ ${bc('q')} \\in ${bc('Q')} \\,\\}`);
$('#pB').innerHTML = K(`(\\,${ac('p')},\\ ${bc('q')}\\,)`);
$('#pAn').innerHTML = `<div class="pa" id="pa0" style="left:150px;top:262px;background:${ACB};color:${AC}">1st · from P</div><div class="pa" id="pa1" style="left:436px;top:262px;background:${BCB};color:${BC}">2nd · from Q</div>`;

/* ---------- N: proof ---------- */
const NS = [[`n(${ac('A')}) = ${ac('p')}, \\quad n(${bc('B')}) = ${bc('q')}`, 'count the two sets'],
  [`\\text{one } ${ac('a')} \\;\\to\\; ${bc('q')} \\text{ pairs}`, 'fixed first entry, any second entry'],
  [`${ac('p')} \\text{ columns, no pair repeats}`, 'different first entries: different pairs'],
  [`${bc('q')} + ${bc('q')} + \\cdots + ${bc('q')} \\;(${ac('p')} \\text{ times}) = ${ac('p')}${bc('q')}`, 'adding q again and again is multiplying'],
  [`n(${ac('A')} \\times ${bc('B')}) = n(${ac('A')}) \\cdot n(${bc('B')})`, '3 snacks × 2 drinks = 6 combos']];
$('#nSt').innerHTML = `<div class="hiBox" id="nHi" style="left:20px;width:744px;height:92px"></div>` + NS.map(([f, w], i) => `<div class="st" id="ns${i}" style="top:${84 + i * 94}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tNs = [wt('N2', 'Say'), wt('N3', 'Fix'), wt('N4', 'Every'), wt('N5', 'columns'), wt('N6', 'equals') - 0.4];
const ns = $('#nS'), NX = [290, 410, 530, 650], NY = [340, 260, 180], NX0 = 210, NY0 = 400;
const nCol = NX.map(x => { const g = pin(ns, x, 0); mk(g, 'rect', { x: -44, y: 128, width: 88, height: 252, rx: 14, fill: C.ac2 }); return g; });
mk(ns, 'line', { x1: NX0, y1: NY0, x2: 724, y2: NY0, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
mk(ns, 'line', { x1: NX0, y1: NY0, x2: NX0, y2: 120, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
const sub = (p, x, y, b, s, col, anc = 'middle') => { const e = txt(p, x, y, '', { 'text-anchor': anc, 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, 'font-weight': 600, fill: col }); e.textContent = b; const ts = mk(e, 'tspan', { 'font-size': 18, dy: 7, 'font-style': 'normal' }); ts.textContent = s; return e; };
const nLa = NX.map((x, i) => sub(ns, x, NY0 + 44, 'a', i + 1, AC)), nLb = NY.map((y, j) => sub(ns, NX0 - 22, y + 8, 'b', j + 1, BC, 'end'));
const nDot = NX.map(x => NY.map(y => { const g = pin(ns, x, y); mk(g, 'circle', { r: 15, fill: PC }); return g; }));
const tCol = [wt('N3', 'pairs') - 0.2, wt('N4', 'own'), wt('N4', 'own') + 0.5, wt('N4', 'own') + 1.0];
let nLast = '';

/* ---------- S: union vs product ---------- */
const su = $('#suS');
mk(su, 'ellipse', { cx: 392, cy: 240, rx: 330, ry: 140, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 });
const suI = [['samosa', 230, 190, 0], ['vada', 392, 190, 0], ['puff', 554, 190, 0], ['tea', 300, 290, 1], ['juice', 484, 290, 1]].map(([s, x, y, d]) => chip(su, x, y, s, d ? BC : AC, '#fff', 140));
const spv = $('#spS'), SX = [330, 470, 610], SY = [270, 180], SX0 = 230, SY0 = 330;
mk(spv, 'line', { x1: SX0, y1: SY0, x2: 700, y2: SY0, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
mk(spv, 'line', { x1: SX0, y1: SY0, x2: SX0, y2: 120, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
SN.forEach((s, i) => txt(spv, SX[i], SY0 + 40, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: AC }));
DR.slice(0, 2).forEach((s, j) => txt(spv, SX0 - 18, SY[j] + 8, s, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-size': 22, 'font-weight': 600, fill: BC }));
const spD = []; SX.forEach(x => SY.forEach(y => { const g = pin(spv, x, y); mk(g, 'circle', { r: 15, fill: PC }); spD.push(g); }));
$('#suF').innerHTML = K(`n(${ac('S')} \\cup ${bc('D')}) = ${ac('3')} + ${bc('2')} = 5`);
$('#spF').innerHTML = K(`n(${ac('S')} \\times ${bc('D')}) = ${ac('3')} \\times ${bc('2')} = ${pc('6')}`);
const th1 = PUC.think($('#th1'), { q: 'D is empty: no drinks left. How many combos now?', opts: ['3 combos', '0 combos'], right: 1, why: 'A combo needs one snack AND one drink. If either set is empty, A × B is empty too.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`n(${ac('A')} \\times ${bc('B')}) = n(${ac('A')}) \\cdot n(${bc('B')})`);

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`${ac('A')} = \\{ x \\in \\mathbb{N} : x < 3 \\},\\ \\ ${bc('B')} = \\{ x \\in \\mathbb{Z} : x^2 = 4 \\}`)}<br>Find A × B and n(A × B).`;
const wsol = PUC.solution($('#wl'), [
  [K(`${ac('A')} = \\{${ac('1')},\\ ${ac('2')}\\}`), 'N starts at 1'],
  [K(`${bc('B')} = \\{${bc('-2')},\\ ${bc('2')}\\}`), '(-2)² = 2² = 4'],
  ['Pair every element of A with every one of B'],
  [K(`${ac('A')} \\times ${bc('B')} = \\{${pr('1', '-2')}, ${pr('1', '2')}, ${pr('2', '-2')}, ${pr('2', '2')}\\}`)],
  [K(`n(${ac('A')} \\times ${bc('B')}) = ${ac('2')} \\times ${bc('2')} = ${pc('4')}`), 'four listed: it checks']], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'A'), wt('W4', 'Two'), wt('W5', 'Pair'), wt('W6', 'A'), wt('W7', 'Check')];
const ws = $('#wS');
mk(ws, 'ellipse', { cx: 210, cy: 300, rx: 120, ry: 170, fill: ACB, stroke: AC, 'stroke-width': 3 });
mk(ws, 'ellipse', { cx: 574, cy: 300, rx: 120, ry: 170, fill: BCB, stroke: BC, 'stroke-width': 3 });
txt(ws, 104, 150, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: AC });
txt(ws, 660, 150, 'B', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: BC });
const WY = [240, 360];
const wA = ['1', '2'].map((s, i) => chip(ws, 210, WY[i], s, AC, '#fff', 84)), wB = ['-2', '2'].map((s, i) => chip(ws, 574, WY[i], s, BC, '#fff', 84));
wA.concat(wB).forEach(c => c.g.querySelector('text').setAttribute('font-family', 'IBM Plex Mono'));
const wAr = [[0, 0], [0, 1], [1, 0], [1, 1]].map(([i, j]) => ({ i, j, a: PUC.arrow(ws, PC, 4, 14) }));
const tWa = [0, 1, 2, 3].map(k => wt('W5', 'every') + 0.2 + k * 0.4);
const tWh = [wt('W6', 'one', 0), wt('W6', 'one', 1), wt('W6', 'two', 2), wt('W6', 'two', 4)];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`A \\times B = \\{${pr('1', '3')},\\ ${pr('2', '4')}\\}`), right: K(`A \\times B = \\{${pr('1', '3')}, ${pr('1', '4')}, ${pr('2', '3')}, ${pr('2', '4')}\\}`) + '&nbsp; 4 pairs' });
const ts = $('#tS'), TX = [300, 440], TY = [190, 110], TX0 = 230, TY0 = 236;
mk(ts, 'line', { x1: TX0, y1: TY0, x2: 520, y2: TY0, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
mk(ts, 'line', { x1: TX0, y1: TY0, x2: TX0, y2: 60, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
['1', '2'].forEach((s, i) => txt(ts, TX[i], TY0 + 30, s, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: AC }));
['3', '4'].forEach((s, j) => txt(ts, TX0 - 16, TY[j] + 8, s, { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 600, fill: BC }));
const tDz = [[0, 0], [1, 1]].map(([i, j]) => { const g = pin(ts, TX[i], TY[j]); mk(g, 'circle', { r: 14, fill: PC }); return g; });
const tDm = [[0, 1], [1, 0]].map(([i, j]) => { const g = pin(ts, TX[i], TY[j]); mk(g, 'circle', { r: 14, fill: C.ok }); return g; });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find n(A × B), or the number of subsets of A × B' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`${ac('A')} = \\{\\, x \\in \\mathbb{N} : x \\text{ is a factor of } 12 \\,\\}`)}<br>${K(`${bc('B')} = \\{\\, x \\in \\mathbb{Z} : x^2 < 5 \\,\\}`)}<br>A × B has ${K('2^k')} subsets. Find k.`,
  opts: ['11', '25', '30', '60'], right: 2, optW: 474, optY: 312 });
const so = PUC.solution($('#so'), [
  [K(`${ac('A')} = \\{1, 2, 3, 4, 6, 12\\}: ${ac('6')}`)],
  [K(`${bc('B')} = \\{-2, -1, 0, 1, 2\\}: ${bc('5')}`)],
  [K(`n(A \\times B) = ${ac('6')} \\times ${bc('5')} = ${pc('30')}`)],
  [K(`\\text{subsets} = 2^{30}`)],
  [K(`k = 30`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Twelve'), wt('A3', 'For'), wt('A4', 'six'), wt('A5', 'subsets'), wt('A5', 'k')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · Cartesian product', y0: 98, dy: 80, txt: [0, 0, 0, 1, 1],
  lines: [K(`${ac('A')} \\times ${bc('B')} = \\{\\, (${ac('a')},\\ ${bc('b')}) : ${ac('a')} \\in ${ac('A')},\\ ${bc('b')} \\in ${bc('B')} \\,\\}`),
    K(`n(${ac('A')} \\times ${bc('B')}) = n(${ac('A')}) \\cdot n(${bc('B')})`),
    K(`${ac('A')} \\times \\varnothing = \\varnothing \\times ${bc('B')} = \\varnothing`),
    'Every element of <b style="color:#2F6FEB">A</b> meets every element of <b style="color:#0E8F8F">B</b>',
    'Union adds (p + q). The product multiplies (pq).'] });
const YQ = ['A has 4 elements and B has 5. How many elements does A × B have?', 'Write A × B in roster form for A = {x, y} and B = {1, 2, 3}.', 'Why is A × ∅ always empty?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 14', topic: 'Seat (3, 5) is not seat (5, 3). Why? Ordered Pairs', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('G3') - 0.2, 1.06, 640, 560], [T0('G5') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: menu + Diya */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('.mh'), t, tMorph + 0.2, 1e9, { dy: 10 }); M.vis(document.querySelectorAll('.mh')[1], t, tMorph + 0.3, 1e9, { dy: 10 });
    SN.forEach((_, i) => M.vis($('#hs' + i), t, tMorph + 0.3 + i * 0.1, 1e9, { dy: 14 }));
    [0, 1].forEach(i => M.vis($('#hd' + i), t, tMorph + 0.5 + i * 0.1, 1e9, { dy: 14 }));
    M.vis($('#hGs'), t, wt('H2', 'five') - 0.1, 1e9, { dy: 12 });
    const s = M.io((t - wt('H2', 'count') + 0.05) / 0.35); $('#hGs i').style.width = s <= 0 ? '0' : `calc(${(s * 100).toFixed(1)}% + 12px)`;
    M.vis($('#hR0'), t, wt('H2', 'six') - 0.1, 1e9, POP);
    M.vis($('#hd2'), t, wt('H2', 'Add') - 0.05, 1e9, { dy: 14 });
    M.vis($('#hR1'), t, wt('H2', 'nine') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hDi'), t, tH3 + 0.1, 1e9, { dy: 24 });
    M.rise($('#hkQ'), t, wt('H4', 'Why') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#hCh'), t, wt('H5', 'new') - 0.1, 1e9, { dy: 16 });
  }

  /* P: arrow diagram + pairs */
  const pOn = t >= tP1 - 0.1 && t < tG1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('G1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    pS.forEach((c, i) => { M.vis(c.g, t, wt('P2', SN[i]) - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tPick[i] + 0.1) / 0.25) * (1 - M.io((t - (tPick[i + 1] ?? wt('P5', 'Three')) + 0.1) / 0.25));
      attr(c.r, 'fill', mix('#FFFFFF', ACB, on)); attr(c.r, 'stroke-width', (2 + 2 * on).toFixed(2)); });
    pD.forEach((c, i) => M.vis(c.g, t, wt('P2', DR[i]) - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    pAr.forEach((p, k) => grow(p.a, 278, PSY[p.i], 522, PDY[p.j], M.io((t - pAt[k] + 0.1) / 0.45)));
    M.vis($('#pl'), t, wt('P3', 'samosa') - 0.1, out, { dx: 60, dy: 0, ...o });
    pAr.forEach((_, k) => M.vis($('#pr' + k), t, pAt[k] + 0.15, 1e9, { dx: -18, dy: 0 }));
    M.vis($('#pCt'), t, wt('P5', 'Six') - 0.1, 1e9, POP);
  }

  /* G: grid + live drinks */
  const gOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('D1');
    M.vis($('#gg'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    gCl.forEach((e, i) => M.vis(e, t, wt('G1', 'bottom') - 0.1 + i * 0.1, 1e9, { dy: 0 }));
    const q = qAt(t);
    gRows.forEach((r, k) => {
      const t0 = k < 2 ? wt('G1', 'side') - 0.1 + k * 0.15 : tq[k];
      M.vis(r.lb, t, t0, 1e9, { dy: 0, dx: -10 }); M.draw(r.ln, t, t0, 0.4);
      r.dots.forEach((d, i) => M.vis(d, t, (k < 2 ? wt('G2', 'dot') : tq[k] + 0.15) + i * 0.12 + (k < 2 ? k * 0.36 : 0), 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }));
    });
    M.vis($('#gr'), t, wt('G2', 'Three') - 0.1, out, { dx: 60, dy: 0, ...o });
    if (q !== gLast) { gLast = q; $('#gRd').innerHTML = `<i style="font-family:Poppins">n</i>(<i style="font-family:Poppins;color:${BC}">D</i>) = <span style="color:${BC}">${q}</span>`; $('#gEq').innerHTML = `combos = <span style="color:${AC}">3</span> × <span style="color:${BC}">${q}</span> = <span style="color:${PC}">${3 * q}</span>`; }
    M.vis($('#gRd'), t, wt('G2', 'Three') + 0.1, 1e9, { dy: 14 }); M.vis($('#gEq'), t, wt('G2', 'six'), 1e9, { dy: 14 });
    const hl = [2, 3, 4].reduce((a, k) => Math.max(a, M.io((t - tq[k] + 0.05) / 0.15) * (1 - M.io((t - tq[k] - 0.5) / 0.35))), 0);
    const last = $('#gEq span:last-child'); last.style.background = hl > 0.01 ? mix('#FFFFFF', C.ac2, hl) : ''; last.style.borderRadius = '6px'; last.style.padding = '0 6px';
    M.vis($('#gTb .tb.h'), t, wt('G2', 'six') + 0.2, 1e9, { dy: 10 });
    [2, 3, 4, 5].forEach((qq, i) => M.vis($('#tb' + qq), t, i === 0 ? wt('G2', 'six') + 0.3 : tq[i + 1] + 0.1, 1e9, { dx: -16, dy: 0 }));
    avA(t, wt('G5', 'times') + 0.2, out);
  }

  /* D: definition */
  const dOn = t >= tD1 - 0.1 && t < tN1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('N1');
    M.vis($('#df'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, wt('D2', 'the') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dfL2'), t, T0('D4') - 0.1, 1e9, { dy: 10 }); PUC.write($('#dfF'), t, wt('D4', 'cross'), 1.2);
    M.vis($('#dp'), t, T0('D3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pB'), t, wt('D3', 'pair'), 0.7);
    M.vis($('#pa0'), t, wt('D3', 'First') - 0.05, 1e9, POP); M.vis($('#pa1'), t, wt('D3', 'then') - 0.05, 1e9, POP);
    M.vis($('#dc'), t, T0('D5') - 0.05, 1e9, { dy: 20 });
  }

  /* N: proof */
  const nOn = t >= tN1 - 0.1 && t < tS1 + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = OUT('S1');
    M.vis($('#np'), t, tN1 + 0.1, out, { dx: -60, dy: 0, ...o });
    NS.forEach((_, i) => { const el = $('#ns' + i); M.vis(el.querySelector('.n'), t, tNs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tNs[i], 0.8); M.vis(el.querySelector('.why'), t, tNs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tNs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 94]), M.SOFT)(t);
    const hb = $('#nHi'); M.vis(hb, t, tNs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#ng'), t, T0('N2') - 0.1, out, { dx: 60, dy: 0, ...o });
    nLa.forEach((e, i) => M.vis(e, t, wt('N2', 'p') + i * 0.08, 1e9, { dy: 0 }));
    nLb.forEach((e, j) => M.vis(e, t, wt('N2', 'q') + j * 0.08, 1e9, { dy: 0 }));
    nCol.forEach((g, i) => M.vis(g, t, tCol[i] - 0.1, i < 3 ? tCol[i + 1] - 0.1 : wt('N5', 'which'), { dy: 0, fade: 0.15, outDur: 0.25, ody: 0 }));
    nDot.forEach((col, i) => col.forEach((d, j) => M.vis(d, t, tCol[i] + j * 0.1, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 })));
    const nc = tCol.reduce((a, tt, i) => t >= tt ? i + 1 : a, 0), fin = t >= wt('N5', 'which');
    const s = nc ? Array(nc).fill(`<span style="color:${BC}">3</span>`).join(' + ') + (fin ? ` = <span style="color:${AC}">4</span> × <span style="color:${BC}">3</span> = <span style="color:${PC}">12</span>` : '') : '';
    if (s !== nLast) { nLast = s; $('#nSum').innerHTML = s; }
    M.vis($('#nSum'), t, tCol[0], 1e9, { dy: 0 });
  }

  /* S: union vs product + think */
  const sOn = t >= tS1 - 0.1 && t < tT + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#su'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    suI.forEach((c, i) => M.vis(c.g, t, wt('S1', 'every') + i * 0.12, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    PUC.write($('#suF'), t, wt('S1', 'three') - 0.1, 0.8); M.vis($('#suP'), t, wt('S1', 'items', 1) - 0.1, 1e9, POP);
    M.vis($('#sp'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    spD.forEach((d, i) => M.vis(d, t, wt('S2', 'every') + i * 0.14, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }));
    PUC.write($('#spF'), t, wt('S2', 'Three') - 0.1, 0.8); M.vis($('#spP'), t, wt('S2', 'product', 1) - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, tT - 0.05, { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'How') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'combo') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'choices') - 0.2, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W3') - 0.1, out, { dx: 60, dy: 0, ...o });
    wA.forEach((c, i) => M.vis(c.g, t, wt('W3', 'one') + i * 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    wB.forEach((c, i) => M.vis(c.g, t, wt('W4', 'minus', 1) + i * 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    wAr.forEach((p, k) => { grow(p.a, 254, WY[p.i], 530, WY[p.j], M.io((t - tWa[k]) / 0.45));
      const h = M.io((t - tWh[k] + 0.05) / 0.2) * (1 - M.io((t - (tWh[k + 1] ?? T1('W6')) + 0.05) / 0.2)); p.a.g.style.opacity = (t > tWh[0] - 0.05 && t < T1('W6')) ? (0.3 + 0.7 * h).toFixed(3) : ''; });
    M.vis($('#wRes'), t, wt('W7', 'four') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'every') - 0.1, tRight: wt('X3', 'So') });
    tDz.forEach((d, i) => M.vis(d, t, wt('X2', 'one', 1) + i * 0.5, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }));
    tDm.forEach((d, i) => M.vis(d, t, wt('X3', 'One') + 0.3 + i * 0.6, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }));
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'often') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + three questions + NEXT */
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
