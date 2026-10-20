// PUC Maths Ep 14: Ordered pairs (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 2): first element / first set blue, second element / second set teal, the pair itself (point, arrow) coral accent, third entry violet
const AC = '#2F6FEB', ACB = '#E7EEFD', BC = '#0E8F8F', BCB = '#DDF1F1', PC = C.ac, VC = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, pc = s => `\\textcolor{${PC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`, ok = s => `\\textcolor{${C.ok}}{${s}}`;
const pr = (a, b) => `(${ac(a)},\\ ${bc(b)})`;
const sp = (s, col) => `<span style="color:${col}">${s}</span>`;
const pin = (p, x, y) => mk(mk(p, 'g', { transform: `translate(${x},${y})` }), 'g', {});
// a coordinate grid on an svg: X(c), Y(r)
const grid = (p, x0, y0, st, nx, ny, o = {}) => {
  const X = c => x0 + st * c, Y = r => y0 - st * r;
  for (let c = 1; c <= nx; c++) mk(p, 'line', { x1: X(c), y1: y0, x2: X(c), y2: Y(ny) - 10, stroke: C.line, 'stroke-width': 1.5 });
  for (let r = 1; r <= ny; r++) mk(p, 'line', { x1: x0, y1: Y(r), x2: X(nx) + 10, y2: Y(r), stroke: C.line, 'stroke-width': 1.5 });
  mk(p, 'line', { x1: x0, y1: y0, x2: X(nx) + 24, y2: y0, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
  mk(p, 'line', { x1: x0, y1: y0, x2: x0, y2: Y(ny) - 24, stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' });
  for (let c = 1; c <= nx; c++) txt(p, X(c), y0 + 32, c, { 'text-anchor': 'middle', 'font-size': o.fs || 20, 'font-weight': 600, fill: AC });
  for (let r = 1; r <= ny; r++) txt(p, x0 - 16, Y(r) + 7, r, { 'text-anchor': 'end', 'font-size': o.fs || 20, 'font-weight': 600, fill: BC });
  return { X, Y };
};
// small label tag in svg (rounded rect + text) inside a pin
const tag = (p, x, y, s, col, fg = '#fff') => { const g = pin(p, x, y); const w = s.length * 13 + 24; mk(g, 'rect', { x: -w / 2, y: -19, width: w, height: 38, rx: 9, fill: col }); txt(g, 0, 7, s, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: fg }); return g; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tO1 = T0('O1'), tL1 = T0('L1'), tS1 = T0('S1'), tK1 = T0('K1'), tE1 = T0('E1'), tT = T0('T1');
const tD1 = T0('D1'), tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tD1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['HALL TICKET 1', 'Seat (3, 5)', AC], ['HALL TICKET 2', 'Seat (5, 3)', BC], ['SAME SEAT?', 'Same two numbers', PC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'One') - 0.05, wt('H1', 'other') - 0.05, wt('H1', 'Same') - 0.05];

/* ---------- H: exam hall ---------- */
const hs = $('#hS'), HX = c => 150 + c * 90, HY = r => 500 - r * 66;
const desks = {};
for (let c = 1; c <= 6; c++) for (let r = 1; r <= 6; r++) desks[c + ',' + r] = mk(hs, 'rect', { x: HX(c) - 30, y: HY(r) - 19, width: 60, height: 38, rx: 8, fill: C.soft, stroke: C.line, 'stroke-width': 2 });
for (let c = 1; c <= 6; c++) txt(hs, HX(c), 536, c, { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: AC });
for (let r = 1; r <= 6; r++) txt(hs, 104, HY(r) + 8, r, { 'text-anchor': 'end', 'font-size': 22, 'font-weight': 600, fill: BC });
const hT1 = tag(hs, HX(3), HY(5) - 42, '(3, 5)', PC), hT2 = tag(hs, HX(5), HY(3) - 42, '(5, 3)', C.ink);

/* ---------- O: anatomy ---------- */
$('#oRc').innerHTML = 'Ep 13: ' + K(`A \\times B = \\{\\, (${ac('a')},\\ ${bc('b')}) : ${ac('a')} \\in A,\\ ${bc('b')} \\in B \\,\\}`);
$('#oBig').innerHTML = K(`(\\,${ac('a')},\\ ${bc('b')}\\,)`);
$('#oAn').innerHTML = `<div class="pa" id="oa0" style="left:36px;top:330px;background:var(--soft);color:var(--ink)">round brackets ( )</div><div class="pa" id="oa1" style="left:320px;top:330px;background:var(--soft);color:var(--ink)">a comma between</div>
  <div class="pa" id="oa2" style="left:110px;top:410px;background:${ACB};color:${AC}">first element</div><div class="pa" id="oa3" style="left:420px;top:410px;background:${BCB};color:${BC}">second element</div>`;
$('#oSeat').innerHTML = `(${sp('3', AC)}, ${sp('5', BC)})`;
$('#oSn').innerHTML = `<div class="pa" id="os0" style="left:150px;top:300px;background:${ACB};color:${AC}">3 = column</div><div class="pa" id="os1" style="left:450px;top:300px;background:${BCB};color:${BC}">5 = row</div>
  <div class="pillp ink" id="os2" style="left:36px;top:400px">Column first, then row. Always.</div>`;

/* ---------- L: live seat finder + swap test ---------- */
const ls = $('#lS'), LG = grid(ls, 130, 500, 64, 6, 6);
const lP1 = mk(ls, 'path', { d: `M${LG.X(0)},${LG.Y(0)} H${LG.X(3)} V${LG.Y(5)}`, fill: 'none', stroke: PC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '2 12' });
const lP2 = mk(ls, 'path', { d: `M${LG.X(0)},${LG.Y(0)} H${LG.X(5)} V${LG.Y(3)}`, fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '2 12' });
const lD1 = pin(ls, LG.X(3), LG.Y(5)); mk(lD1, 'circle', { r: 16, fill: PC });
const lD2 = pin(ls, LG.X(5), LG.Y(3)); mk(lD2, 'circle', { r: 16, fill: C.ink });
const lT1 = tag(ls, LG.X(3), LG.Y(5) - 40, '(3, 5)', PC), lT2 = tag(ls, LG.X(5) + 74, LG.Y(3), '(5, 3)', C.ink);
const lWk = mk(ls, 'circle', { r: 12, fill: '#fff', stroke: PC, 'stroke-width': 4 });
const lPg = mk(ls, 'g', {}), lQg = mk(ls, 'g', {});
const lP = mk(mk(lPg, 'g', {}), 'circle', { r: 17, fill: AC }), lQ = mk(mk(lQg, 'g', {}), 'circle', { r: 17, fill: PC });
const lPl = txt(lPg, 0, -28, '(a, 3)', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: AC }), lQl = txt(lQg, 0, -28, '(3, a)', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: PC });
const lSame = mk(ls, 'circle', { cx: LG.X(3), cy: LG.Y(3), r: 30, fill: 'none', stroke: C.ok, 'stroke-width': 4 });
const tL1w = wt('L1', 'walk'), tL2w = wt('L2', 'walk');
const tA = [wt('L4', 'blue'), 0, wt('L5', 'three'), 0, 0]; tA[1] = (tA[0] + tA[2]) / 2; tA[3] = tA[2] + 0.9; tA[4] = tA[2] + 1.8;
const aAt = t => { if (t <= tA[0]) return 1; for (let k = 0; k < 4; k++) if (t < tA[k + 1]) return k + 1 + M.io((t - tA[k]) / Math.min(0.6, tA[k + 1] - tA[k])); return 5; };
$('#lTb').innerHTML = `<div class="lr h" style="top:160px"><span class="c1">a</span><span class="c2">(a, 3)</span><span class="c3"></span><span class="c4">(3, a)</span></div>` +
  [1, 2, 3, 4, 5].map((a, i) => `<div class="lr" id="lr${a}" style="top:${212 + i * 52}px"><span class="c1">${a}</span><span class="c2">(${sp(a, AC)}, ${sp(3, BC)})</span><span class="c3" style="color:${a === 3 ? C.ok : C.red}">${a === 3 ? '=' : '≠'}</span><span class="c4">(${sp(3, AC)}, ${sp(a, BC)})</span>${a === 3 ? `<span class="st8" style="background:${C.okBg};color:#1F6B3F">SAME DESK</span>` : ''}</div>`).join('');
let lLast = -1;

/* ---------- S: set vs pair ---------- */
const ss = $('#ssS');
mk(ss, 'ellipse', { cx: 392, cy: 230, rx: 230, ry: 120, fill: C.soft, stroke: C.ink, 'stroke-width': 2.5 });
const sC = ['3', '5'].map(s => { const g = mk(ss, 'g', {}); const i = mk(g, 'g', {}); mk(i, 'circle', { r: 40, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); txt(i, 0, 12, s, { 'text-anchor': 'middle', 'font-size': 36, 'font-weight': 600, fill: C.ink }); return { g, i }; });
$('#ssF').innerHTML = K(`\\{3,\\ 5\\} = \\{5,\\ 3\\}\\ \\ ${ok('\\checkmark')}`);
const spv = $('#spS'), SG = grid(spv, 200, 340, 40, 6, 6, { fs: 16 });
const sD1 = pin(spv, SG.X(3), SG.Y(5)); mk(sD1, 'circle', { r: 13, fill: PC }); const sT1 = tag(spv, SG.X(3) - 70, SG.Y(5), '(3, 5)', PC);
const sD2 = pin(spv, SG.X(5), SG.Y(3)); mk(sD2, 'circle', { r: 13, fill: C.ink }); const sT2 = tag(spv, SG.X(5) + 76, SG.Y(3), '(5, 3)', C.ink);
$('#spF').innerHTML = K(`(${ac('3')},\\ ${bc('5')}) \\ne (${ac('5')},\\ ${bc('3')})`);
const th1 = PUC.think($('#th1'), { q: 'Is (2, 2) a proper ordered pair, with the same entry twice?', opts: ['Yes', 'No'], right: 0, why: 'It is the desk in column 2, row 2. A pair may repeat an entry; the set {2, 2} is just {2}.' });

/* ---------- E: equality ---------- */
$('#dfF').innerHTML = K(`(${ac('a')},\\ ${bc('b')}) = (${ac('c')},\\ ${bc('d')}) \\iff ${ac('a = c')} \\text{ and } ${bc('b = d')}`);
const es = $('#eS');
const box = (x, y, s, col, bg) => { const g = pin(es, x, y); mk(g, 'rect', { x: -70, y: -44, width: 140, height: 88, rx: 14, fill: bg, stroke: col, 'stroke-width': 3 }); txt(g, 0, 14, s, { 'text-anchor': 'middle', 'font-size': 44, 'font-weight': 600, fill: col }); return g; };
const paren = (y, s) => [txt(es, 150, y + 26, '(', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Main', 'font-size': 110, fill: C.ink }), txt(es, 392, y + 22, ',', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Main', 'font-size': 70, fill: C.ink }), txt(es, 634, y + 26, ')', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Main', 'font-size': 110, fill: C.ink })];
const eR1 = [box(272, 150, '3', AC, ACB), box(512, 150, '5', BC, BCB)], eR2 = [box(272, 370, '3', AC, ACB), box(512, 370, '4', BC, BCB)];
const eP1 = paren(150), eP2 = paren(370);
const eL1 = mk(es, 'line', { x1: 272, y1: 198, x2: 272, y2: 322, stroke: C.ok, 'stroke-width': 4, 'stroke-dasharray': '6 6' }), eL2 = mk(es, 'line', { x1: 512, y1: 198, x2: 512, y2: 322, stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '6 6' });
const eC1 = tag(es, 272, 260, '3 = 3', C.ok), eC2 = tag(es, 512, 260, '5 ≠ 4', C.red);
const tE4 = wt('E4', 'Three');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`(${ac('a')},\\ ${bc('b')}) = (${ac('c')},\\ ${bc('d')}) \\iff ${ac('a = c')},\\ ${bc('b = d')}`);

/* ---------- D: A x B vs B x A ---------- */
const DS = [[`${ac('A')} = \\{${ac('1')},\\ ${ac('2')}\\},\\quad ${bc('B')} = \\{${bc('3')}\\}`, 'a small example'],
  [`${ac('A')} \\times ${bc('B')} = \\{${pr('1', '3')},\\ ${pr('2', '3')}\\}`, 'first elements come from A'],
  [`${bc('B')} \\times ${ac('A')} = \\{(${bc('3')},\\ ${ac('1')}),\\ (${bc('3')},\\ ${ac('2')})\\}`, 'first elements come from B'],
  [`${pr('1', '3')} \\ne (${bc('3')},\\ ${ac('1')}) \\;\\Rightarrow\\; A \\times B \\ne B \\times A`, 'same size, different pairs'],
  [`A \\times B = B \\times A`, 'only when A = B, or one set is empty']];
$('#dSt').innerHTML = `<div class="hiBox" id="dHi" style="left:20px;width:744px;height:92px"></div>` + DS.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${84 + i * 94}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Take'), wt('D3', 'A'), wt('D4', 'B'), wt('D5', 'One'), wt('D6', 'unless') - 0.3];
const dsv = $('#dS'), DG = grid(dsv, 190, 470, 90, 4, 4);
const dDiag = mk(dsv, 'line', { x1: DG.X(0), y1: DG.Y(0), x2: DG.X(4), y2: DG.Y(4), stroke: C.mute, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const dDl = txt(dsv, DG.X(4) - 12, DG.Y(4) + 34, 'swap line', { 'text-anchor': 'end', 'font-size': 18, fill: C.mute });
const dAB = [[1, 3], [2, 3]].map(([x, y]) => { const g = pin(dsv, DG.X(x), DG.Y(y)); mk(g, 'circle', { r: 16, fill: PC }); return g; });
const dBA = [[3, 1], [3, 2]].map(([x, y]) => { const g = pin(dsv, DG.X(x), DG.Y(y)); mk(g, 'circle', { r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); return g; });
const dTa = [tag(dsv, DG.X(1), DG.Y(3) - 40, '(1, 3)', PC), tag(dsv, DG.X(2) + 20, DG.Y(3) - 40, '(2, 3)', PC)];
const dTb = [tag(dsv, DG.X(3) + 74, DG.Y(1), '(3, 1)', C.ink), tag(dsv, DG.X(3) + 74, DG.Y(2), '(3, 2)', C.ink)];
const dSw = mk(dsv, 'path', { d: `M${DG.X(1) + 12},${DG.Y(3) + 12} Q${DG.X(1) + 40},${DG.Y(1) - 20} ${DG.X(3) - 18},${DG.Y(1) + 2}`, fill: 'none', stroke: PC, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
const dLg = [tag(dsv, 470, 90, 'A × B', PC), tag(dsv, 620, 90, 'B × A', C.ink)];

/* ---------- R: triplets + R x R ---------- */
$('#rTr').innerHTML = K(`(\\,${ac('a')},\\ ${bc('b')},\\ \\textcolor{${VC}}{c}\\,)`);
const TRI = []; for (const a of [1, 2]) for (const b of [1, 2]) for (const c of [1, 2]) TRI.push([a, b, c]);
$('#rTs').innerHTML = `<div class="lbl" id="rTl" style="left:36px;top:178px">A × A × A WHEN A = {1, 2}</div>` + TRI.map(([a, b, c], i) => `<div class="tr3" id="tr${i}" style="left:${36 + (i % 4) * 180}px;top:${222 + Math.floor(i / 4) * 66}px;width:164px">(${sp(a, AC)}, ${sp(b, BC)}, ${sp(c, VC)})</div>`).join('') +
  `<div class="fx" id="rN" style="left:36px;top:378px;font-size:40px">${K(`n(A \\times A \\times A) = 2 \\times 2 \\times 2 = ${pc('8')}`)}</div>`;
const rs = $('#rS'), RX = v => 392 + v * 50, RY = v => 330 - v * 50;
for (let v = -6; v <= 6; v++) mk(rs, 'line', { x1: RX(v), y1: RY(-3), x2: RX(v), y2: RY(3), stroke: C.line, 'stroke-width': 1.2 });
for (let v = -3; v <= 3; v++) mk(rs, 'line', { x1: RX(-6), y1: RY(v), x2: RX(6), y2: RY(v), stroke: C.line, 'stroke-width': 1.2 });
mk(rs, 'line', { x1: RX(-6.6), y1: RY(0), x2: RX(6.6), y2: RY(0), stroke: C.ink, 'stroke-width': 3 }); mk(rs, 'line', { x1: RX(0), y1: RY(-3.5), x2: RX(0), y2: RY(3.5), stroke: C.ink, 'stroke-width': 3 });
[-6, -4, -2, 2, 4, 6].forEach(v => txt(rs, RX(v), RY(0) + 28, v, { 'text-anchor': 'middle', 'font-size': 16, fill: AC, 'font-weight': 600 }));
[-2, 2].forEach(v => txt(rs, RX(0) - 12, RY(v) + 6, v, { 'text-anchor': 'end', 'font-size': 16, fill: BC, 'font-weight': 600 }));
txt(rs, RX(6.6), RY(0) - 12, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, 'font-weight': 600, fill: AC });
txt(rs, RX(0) + 14, RY(3.3), 'y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, 'font-weight': 600, fill: BC });
const rPx = mk(rs, 'line', { stroke: AC, 'stroke-width': 3, 'stroke-dasharray': '6 6' }), rPy = mk(rs, 'line', { stroke: BC, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const rPt = mk(rs, 'circle', { r: 14, fill: PC });
const rPath = s => [4.4 * Math.cos(s), 2.4 * Math.sin(1.6 * s + 0.5)];
const tR3 = wt('R3', 'R'), tR3e = T1('R3') + 0.6;
let rLast = '';

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(`(${ac('2x - 1')},\\ ${bc('y + 3')}) = (${ac('5')},\\ ${bc('1')})`)}<br>Find x and y.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${ac('2x - 1 = 5')}`), 'first elements are equal'],
  [K(`${ac('2x = 6 \\;\\Rightarrow\\; x = 3')}`), 'add 1, then halve'],
  [K(`${bc('y + 3 = 1')}`), 'second elements are equal'],
  [K(`${bc('y = -2')}`), 'take away 3'],
  [K(`(2(3) - 1,\\ -2 + 3) = (5,\\ 1)\\ ${ok('\\checkmark')}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Two'), wt('W4', 'x'), wt('W5', 'y'), wt('W6', 'y'), wt('W7', 'Check')];
const ws = $('#wS');
const wbox = (x, y, s, col, bg, w = 220) => { const g = pin(ws, x, y); mk(g, 'rect', { x: -w / 2, y: -44, width: w, height: 88, rx: 14, fill: bg, stroke: col, 'stroke-width': 3 }); txt(g, 0, 14, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 40, 'font-weight': 600, fill: col }); return g; };
const wT = [wbox(262, 130, '2x − 1', AC, ACB), wbox(522, 130, 'y + 3', BC, BCB)], wB = [wbox(262, 320, '5', AC, ACB), wbox(522, 320, '1', BC, BCB)];
wB.forEach(g => g.querySelector('text').setAttribute('font-style', 'normal'));
[130, 320].forEach(y => { txt(ws, 122, y + 26, '(', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Main', 'font-size': 110, fill: C.ink }); txt(ws, 392, y + 22, ',', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Main', 'font-size': 70, fill: C.ink }); txt(ws, 662, y + 26, ')', { 'text-anchor': 'middle', 'font-family': 'KaTeX_Main', 'font-size': 110, fill: C.ink }); });
const wL = [mk(ws, 'line', { x1: 262, y1: 180, x2: 262, y2: 270, stroke: AC, 'stroke-width': 4, 'stroke-dasharray': '6 6' }), mk(ws, 'line', { x1: 522, y1: 180, x2: 522, y2: 270, stroke: BC, 'stroke-width': 4, 'stroke-dasharray': '6 6' })];
const wEq = [tag(ws, 262, 225, '=', AC), tag(ws, 522, 225, '=', BC)];
$('#wVals').innerHTML = `<div class="pa" id="wv0" style="left:196px;top:400px;background:${AC};color:#fff;font-size:26px">x = 3</div><div class="pa" id="wv1" style="left:446px;top:400px;background:${BC};color:#fff;font-size:26px">y = -2</div>`;
$('#wRes').style.left = '36px';

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`(x^2,\\ y + 1) = (9,\\ 4) \\;\\Rightarrow\\; x = 3,\\ y = 3`), right: K(`x = \\pm 3,\\ y = 3:\\ \\ (3,\\ 3) \\text{ and } (-3,\\ 3)`) + '&nbsp; two answers' });
const ts = $('#tS'), TXv = v => 280 + v * 58, TYl = 160;
mk(ts, 'line', { x1: 24, y1: TYl, x2: 536, y2: TYl, stroke: C.ink, 'stroke-width': 3 });
for (let v = -4; v <= 4; v++) { mk(ts, 'line', { x1: TXv(v), y1: TYl - 8, x2: TXv(v), y2: TYl + 8, stroke: C.ink, 'stroke-width': 2 }); txt(ts, TXv(v), TYl + 40, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const tD3 = pin(ts, TXv(3), TYl); mk(tD3, 'circle', { r: 13, fill: AC });
const tDm = pin(ts, TXv(-3), TYl); mk(tDm, 'circle', { r: 13, fill: C.ok });
const tNote = txt(ts, TXv(-3), TYl - 34, '(-3)² = 9', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ok, 'font-weight': 600 });
const tNote2 = txt(ts, TXv(3), TYl - 34, '3² = 9', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Equal ordered pairs: find x and y · count ordered pairs in A × A' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`A = \\{\\, x \\in \\mathbb{Z} : x^2 \\le 4 \\,\\}`)}<br>How many ordered pairs ${K('(a, b) \\in A \\times A')}<br>satisfy ${K('(a, b) \\ne (b, a)')}?`,
  opts: ['10', '20', '25', '15'], right: 1, optW: 474, optY: 312 });
const so = PUC.solution($('#so'), [
  [K(`A = \\{-2, -1, 0, 1, 2\\}: 5`)],
  [K(`n(A \\times A) = 5 \\times 5 = 25`)],
  [K(`(a, b) = (b, a) \\iff a = b`)],
  ['that is 5 pairs'],
  [K(`25 - 5 = ${pc('20')}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'A'), wt('A3', 'So'), wt('A4', 'pair'), wt('A4', 'five'), wt('A5', 'Twenty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · ordered pairs', y0: 98, dy: 80, txt: [0, 0, 0, 1, 1],
  lines: [K(`(${ac('a')},\\ ${bc('b')}) = (${ac('c')},\\ ${bc('d')}) \\iff ${ac('a = c')} \\text{ and } ${bc('b = d')}`),
    K(`\\{3, 5\\} = \\{5, 3\\} \\quad \\text{but} \\quad (3, 5) \\ne (5, 3)`),
    K(`A \\times B \\ne B \\times A \\ \\ \\text{(unless } A = B \\text{ or one set is } \\varnothing)`),
    'Ordered triplet (a, b, c): n(A × A × A) = n(A)³',
    'R × R: every point (x, y) on the graph sheet'] });
const YQ = ['If (x + 2, 4) = (5, 2y), find x and y.', 'Is {1, 2} = {2, 1}? Is (1, 2) = (2, 1)?', 'For A = {p, q} and B = {r}, write A × B and B × A. Are they equal?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 15', topic: 'Classmates and blood groups: Relations, Domain and Range', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L5', 'three') - 0.4, 1.06, 600, 560], [T1('L5') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tO1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('O1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a1 = M.io((t - wt('H2', 'two') + 0.05) / 0.3), a2 = M.io((t - wt('H2', 'desks') + 0.05) / 0.3);
    attr(desks['3,5'], 'fill', mix(C.soft, PC, a1)); attr(desks['3,5'], 'stroke', mix(C.line, PC, a1));
    attr(desks['5,3'], 'fill', mix(C.soft, C.ink, a2)); attr(desks['5,3'], 'stroke', mix(C.line, C.ink, a2));
    M.vis(hT1, t, wt('H2', 'two') + 0.1, 1e9, POP); M.vis(hT2, t, wt('H2', 'desks') + 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hDi'), t, tH3 + 0.1, 1e9, { dy: 24 });
    M.rise($('#hkQ'), t, T0('H4') + 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#hkP'), t, wt('H5', 'ordered') - 0.1, 1e9, POP);
  }

  /* O */
  const oOn = t >= tO1 - 0.1 && t < tL1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('L1');
    M.vis($('#oa'), t, tO1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#oRc'), t, wt('O1', 'element') - 0.1, 1.0);
    PUC.write($('#oBig'), t, wt('O2', 'ordered') - 0.1, 0.8);
    M.vis($('#oa0'), t, wt('O2', 'round') - 0.05, 1e9, POP); M.vis($('#oa1'), t, wt('O2', 'comma') - 0.05, 1e9, POP);
    M.vis($('#oa2'), t, wt('O3', 'first') - 0.05, 1e9, POP); M.vis($('#oa3'), t, wt('O3', 'second') - 0.05, 1e9, POP);
    M.vis($('#os'), t, T0('O4') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#oSeat'), t, wt('O4', 'seat') - 0.1, 0.7);
    M.vis($('#os0'), t, wt('O4', 'column') - 0.05, 1e9, POP); M.vis($('#os1'), t, wt('O4', 'row') - 0.05, 1e9, POP);
    M.vis($('#os2'), t, wt('O4', 'row') + 0.4, 1e9, POP);
  }

  /* L: live */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('S1'), tSw = T0('L3');
    M.vis($('#lg'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const u1 = M.clamp((t - tL1w) / Math.max(0.8, wt('L1', 'up') + 0.3 - tL1w)), u2 = M.clamp((t - tL2w) / Math.max(0.8, wt('L2', 'up') + 0.3 - tL2w));
    M.vis(lP1, t, tL1w - 0.05, tSw, { dy: 0, fade: 0.05, outDur: 0.3, ody: 0 }); M.drawU(lP1, u1);
    M.vis(lP2, t, tL2w - 0.05, tSw, { dy: 0, fade: 0.05, outDur: 0.3, ody: 0 }); M.drawU(lP2, u2);
    const wk = (u, X, Y) => { const L = X + Y, d = u * L; return d <= X ? [LG.X(d), LG.Y(0)] : [LG.X(X), LG.Y(d - X)]; };
    const wOn = (t > tL1w && u1 < 1) || (t > tL2w && u2 < 1); M.hide(lWk, !wOn);
    if (wOn) { const [x, y] = t > tL2w ? wk(u2, 5, 3) : wk(u1, 3, 5); attr(lWk, 'cx', x.toFixed(1)); attr(lWk, 'cy', y.toFixed(1)); attr(lWk, 'stroke', t > tL2w ? C.ink : PC); }
    M.vis(lD1, t, tL1w + 0.2 + (wt('L1', 'up') + 0.3 - tL1w), tSw, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08, outDur: 0.3, ody: 0 });
    M.vis(lT1, t, wt('L1', 'up') + 0.6, tSw, { ...POP, outDur: 0.3, ody: 0 });
    M.vis(lD2, t, wt('L2', 'up') + 0.5, tSw, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08, outDur: 0.3, ody: 0 });
    M.vis(lT2, t, wt('L2', 'different') - 0.1, tSw, { ...POP, outDur: 0.3, ody: 0 });
    const a = aAt(t);
    attr(lPg, 'transform', `translate(${LG.X(a).toFixed(1)},${LG.Y(3).toFixed(1)})`); attr(lQg, 'transform', `translate(${LG.X(3).toFixed(1)},${LG.Y(a).toFixed(1)})`);
    M.vis(lPg.firstChild, t, wt('L4', 'blue') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(lPl, t, wt('L4', 'blue'), 1e9, { dy: 0 });
    M.vis(lQg.firstChild, t, wt('L4', 'twin') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(lQl, t, wt('L4', 'twin'), 1e9, { dy: 0 });
    const near = Math.abs(a - 3) < 0.12; lPl.style.opacity = near ? '0' : ''; lQl.style.opacity = near ? '0' : '';
    M.vis(lSame, t, tA[2] - 0.05, tA[2] + 0.75, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08, outDur: 0.25, ody: 0 });
    M.vis($('#lt'), t, T0('L3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ai = Math.round(a); if (ai !== lLast) { lLast = ai; $('#lRd').innerHTML = `<i style="font-family:Poppins;color:${AC}">a</i> = <span style="color:${AC}">${ai}</span>`; }
    M.vis($('#lRd'), t, wt('L3', 'count'), 1e9, { dy: 14 });
    M.vis($('#lTb .lr.h'), t, wt('L4', 'blue') - 0.1, 1e9, { dy: 10 });
    [1, 2, 3, 4, 5].forEach((k, i) => M.vis($('#lr' + k), t, (i === 0 ? tA[0] : tA[i] - 0.25) + 0.05, 1e9, { dx: -16, dy: 0 }));
  }

  /* S: side by side + think */
  const sOn = t >= tS1 - 0.1 && t < tE1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#ss'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const sw = M.io((t - wt('S1', 'equals') + 0.1) / 0.7);
    sC.forEach((c, i) => { const x0 = i ? 472 : 312, x1 = i ? 312 : 472, x = x0 + (x1 - x0) * sw, y = 230 - (i ? -1 : 1) * 60 * Math.sin(Math.PI * sw); attr(c.g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); M.vis(c.i, t, wt('S1', 'three') - 0.1 + i * 0.15, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); });
    PUC.write($('#ssF'), t, wt('S1', 'equals') + 0.3, 0.8); M.vis($('#ssP'), t, wt('S1', 'order') - 0.1, 1e9, POP);
    M.vis($('#sp'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(sD1, t, wt('S2', 'Three') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(sT1, t, wt('S2', 'Three'), 1e9, POP);
    M.vis(sD2, t, wt('S2', 'five') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(sT2, t, wt('S2', 'five'), 1e9, POP);
    PUC.write($('#spF'), t, wt('S2', 'Three') - 0.1, 0.8); M.vis($('#spP'), t, wt('S2', 'everything') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('E1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'same') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'desk') });
  }

  /* E: equality */
  const eOn = t >= tE1 - 0.1 && t < tT + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    M.vis($('#ed'), t, tE1 + 0.05, 1e9, { dx: -60, dy: 0 });
    M.rise($('#dfT'), t, wt('E2', 'two') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dfL2'), t, T0('E3') - 0.1, 1e9, { dy: 10 }); PUC.write($('#dfF'), t, wt('E3', 'a') - 0.05, 1.3);
    M.vis($('#ec'), t, wt('E3', 'equals') - 0.1, 1e9, { dx: 60, dy: 0 });
    eR1.forEach((g, i) => M.vis(g, t, wt('E4', 'Three') - 0.1 + i * 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 })); eP1.forEach(e => M.vis(e, t, wt('E4', 'Three') - 0.1, 1e9, { dy: 0 }));
    eR2.forEach((g, i) => M.vis(g, t, wt('E4', 'three') - 0.1 + i * 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 })); eP2.forEach(e => M.vis(e, t, wt('E4', 'three') - 0.1, 1e9, { dy: 0 }));
    M.draw(eL1, t, wt('E4', 'share') - 0.1, 0.4); M.vis(eC1, t, wt('E4', 'first') - 0.1, 1e9, POP);
    M.draw(eL2, t, wt('E4', 'but') - 0.1, 0.4); M.vis(eC2, t, wt('E4', 'different') - 0.2, 1e9, POP);
    M.vis($('#eP'), t, wt('E4', 'pairs') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tD1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tD1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Swap') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'new') - 0.2, 0.8);
  }

  /* D: A x B vs B x A */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dp'), t, tD1 + 0.3, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], 0.9); M.vis(el.querySelector('.why'), t, tDs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tDs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 94]), M.SOFT)(t);
    const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    M.vis($('#dg'), t, tD1 + 0.5, out, { dx: 60, dy: 0, ...o });
    dLg.forEach((g, i) => M.vis(g, t, tDs[1 + i], 1e9, POP));
    dAB.forEach((g, i) => M.vis(g, t, tDs[1] + 0.4 + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 })); dTa.forEach((g, i) => M.vis(g, t, tDs[1] + 0.5 + i * 0.3, 1e9, POP));
    dBA.forEach((g, i) => M.vis(g, t, tDs[2] + 0.4 + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 })); dTb.forEach((g, i) => M.vis(g, t, tDs[2] + 0.5 + i * 0.3, 1e9, POP));
    M.draw(dDiag, t, tDs[3] - 0.2, 0.7); M.vis(dDl, t, tDs[3] + 0.3, 1e9, { dy: 0 }); M.draw(dSw, t, tDs[3] + 0.2, 0.7);
  }

  /* R: triplets + R x R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rt'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#rTr'), t, wt('R1', 'triplet') - 0.05, 0.9);
    M.vis($('#rTl'), t, T0('R2') - 0.1, 1e9, { dy: 10 });
    TRI.forEach((_, i) => M.vis($('#tr' + i), t, wt('R2', 'every') + i * 0.1, 1e9, { dy: 12, fade: 0.12 }));
    PUC.write($('#rN'), t, wt('R2', 'two', 1) - 0.1, 0.9); M.vis($('#rCt'), t, wt('R2', 'eight') - 0.1, 1e9, POP);
    M.vis($('#rp'), t, tR3 - 0.3, out, { dx: 60, dy: 0, ...o });
    const s = 2.2 * M.clamp((t - tR3) / (tR3e - tR3 + 2)), [x, y] = rPath(s), on = t >= wt('R3', 'point') - 0.1;
    attr(rPt, 'cx', RX(x).toFixed(1)); attr(rPt, 'cy', RY(y).toFixed(1)); M.vis(rPt, t, wt('R3', 'point') - 0.1, 1e9, { dy: 0, fade: 0.1 });
    [[rPx, RX(x), RY(0), RX(x), RY(y)], [rPy, RX(0), RY(y), RX(x), RY(y)]].forEach(([l, a, b, c, d]) => { attr(l, 'x1', a.toFixed(1)); attr(l, 'y1', b.toFixed(1)); attr(l, 'x2', c.toFixed(1)); attr(l, 'y2', d.toFixed(1)); M.hide(l, !on); });
    const rs2 = `(<span style="color:#8FB3FF">${x.toFixed(1)}</span>, <span style="color:#7FD3D3">${y.toFixed(1)}</span>)`; if (rs2 !== rLast) { rLast = rs2; $('#rXY').innerHTML = rs2; }
    M.vis($('#rXY'), t, wt('R3', 'point'), 1e9, POP);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    wT.forEach((g, i) => M.vis(g, t, T0('W2') + 0.5 + i * 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    wB.forEach((g, i) => M.vis(g, t, wt('W2', 'five') + i * 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    M.draw(wL[0], t, tW[0] - 0.2, 0.4); M.vis(wEq[0], t, tW[0] + 0.1, 1e9, POP);
    M.draw(wL[1], t, tW[2] - 0.2, 0.4); M.vis(wEq[1], t, tW[2] + 0.1, 1e9, POP);
    M.vis($('#wv0'), t, wt('W4', 'equals') - 0.05, 1e9, POP); M.vis($('#wv1'), t, wt('W6', 'equals') - 0.05, 1e9, POP);
    M.vis($('#wRes'), t, wt('W7', 'Both') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'minus') - 0.1, tRight: wt('X3', 'So') });
    M.vis(tD3, t, wt('X2', 'three') - 0.1, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }); M.vis(tNote2, t, wt('X2', 'three'), 1e9, { dy: 0 });
    M.vis(tDm, t, wt('X3', 'minus') + 0.1, 1e9, { dy: 0, sc: 0.2, sp: M.POP, fade: 0.08 }); M.vis(tNote, t, wt('X3', 'nine') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'equal') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'different') - 0.3, tCount, tAns });
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
