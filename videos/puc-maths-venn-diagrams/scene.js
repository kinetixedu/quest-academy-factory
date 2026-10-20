// PUC Maths Ep 10: Venn diagrams (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element violet, set A blue, set B teal, U ink outline; shaded region = coral tint. Here Biology (B) teal, Maths (M) blue, third set C gold.
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', BC = '#0E8F8F', CC = C.gold, HIT = '#FBDCD2';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, cc = s => `\\textcolor{${CC}}{${s}}`;
const LT = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'middle' };

/* ---------- geometry: U rectangle + two equal circles ---------- */
const circ = (x, y, r) => `M${x - r},${y} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 Z`;
const rectP = (x, y, w, h, q = 16) => `M${x + q},${y} H${x + w - q} Q${x + w},${y} ${x + w},${y + q} V${y + h - q} Q${x + w},${y + h} ${x + w - q},${y + h} H${x + q} Q${x},${y + h} ${x},${y + h - q} V${y + q} Q${x},${y} ${x + q},${y} Z`;
const v2 = (svg, o) => {
  const { xa, xb, cy, r } = o, d = xb - xa, mx = (xa + xb) / 2, h = Math.sqrt(r * r - d * d / 4), T = `${mx},${cy - h}`, B = `${mx},${cy + h}`;
  const g = mk(svg, 'g', {}), R = {};
  if (o.rect) R.out = mk(g, 'path', { d: rectP(...o.rect) + ` M${T} A${r},${r} 0 1 0 ${B} A${r},${r} 0 1 0 ${T} Z`, 'fill-rule': 'evenodd', fill: '#FFFFFF' });
  R.a = mk(g, 'path', { d: `M${T} A${r},${r} 0 1 0 ${B} A${r},${r} 0 0 1 ${T} Z`, fill: '#FFFFFF' });
  R.ab = mk(g, 'path', { d: `M${T} A${r},${r} 0 0 1 ${B} A${r},${r} 0 0 1 ${T} Z`, fill: '#FFFFFF' });
  R.b = mk(g, 'path', { d: `M${T} A${r},${r} 0 1 1 ${B} A${r},${r} 0 0 0 ${T} Z`, fill: '#FFFFFF' });
  const rect = o.rect ? mk(g, 'path', { d: rectP(...o.rect), fill: 'none', stroke: C.ink, 'stroke-width': 3 }) : null;
  const cA = mk(g, 'circle', { cx: xa, cy, r, fill: 'none', stroke: o.ca, 'stroke-width': 3.5 }), cB = mk(g, 'circle', { cx: xb, cy, r, fill: 'none', stroke: o.cb, 'stroke-width': 3.5 });
  const ls = o.ls || 40;
  const lA = txt(g, xa - r * 0.82, cy - r * 0.78, o.la, { ...LT, 'font-size': ls, fill: o.ca }), lB = txt(g, xb + r * 0.82, cy - r * 0.78, o.lb, { ...LT, 'font-size': ls, fill: o.cb });
  const lU = o.rect ? txt(g, o.rect[0] + 30, o.rect[1] + 42, 'U', { ...LT, 'font-size': 34, fill: C.ink }) : null;
  return { g, R, rect, cA, cB, lA, lB, lU, fill(k, c) { attr(R[k], 'fill', c); } };
};
const tok = (svg, s, x, y, o = {}) => {
  const pg = mk(svg, 'g', { transform: `translate(${x},${y})` }), g = mk(pg, 'g', {});
  const ring = mk(g, 'circle', { r: o.rr || 40, fill: 'none', stroke: RC, 'stroke-width': 3, opacity: 0 });
  const t = txt(g, 0, 8, s, { 'text-anchor': 'middle', 'font-family': o.mono ? 'IBM Plex Mono' : 'Poppins', 'font-size': o.fs || 22, 'font-weight': 600, fill: o.col || XC });
  return { pg, g, ring, t, x, y, move(nx, ny) { attr(pg, 'transform', `translate(${nx.toFixed(1)},${ny.toFixed(1)})`); } };
};
const pulse = (t, a, d = 0.6) => { const u = (t - a) / d; return u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * u); };
const fly = (k, t, t0, x2, y2, dur = 0.6) => { const u = M.io((t - t0) / dur); k.move(M.lerp(k.x, x2, u), M.lerp(k.y, y2, u) - 46 * Math.sin(Math.PI * u)); return u; };
const tint = (t, a, d = 0.4) => mix('#FFFFFF', HIT, M.io((t - a) / d));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tV1 = T0('V1'), tR1 = T0('R1'), tK1 = T0('K1'), tT = T0('T1'), tP1 = T0('P1'), tZ1 = T0('Z1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tP1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['BIOLOGY', 'Diya, Sana, Meera', BC], ['MATHS', 'Aarav, Kiran, Meera', AC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${424 + i * 552}px;border-top-color:${col}"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Biology') - 0.05, wt('H1', 'Maths') - 0.05];

/* ---------- H ---------- */
const HR = [['BIOLOGY', ['Diya', 'Sana', 'Meera'], BC], ['MATHS', ['Aarav', 'Kiran', 'Meera'], AC], ['NEITHER', ['Ravi'], C.mute]];
$('#hcs').innerHTML = HR.map(([w, ns, col], r) => `<div class="who" style="left:36px;top:${84 + r * 128}px;color:${col}" id="hw${r}">${w}</div><div class="row" style="top:${116 + r * 128}px">${ns.map((n, i) => `<div class="nm" id="hn${r}${i}" style="border-color:${col};color:${col}">${n}</div>`).join('')}</div>`).join('');
const tHn = [[wt('H4', 'Diya'), wt('H4', 'Sana'), wt('H4', 'Meera')], [wt('H4', 'Aarav'), wt('H4', 'Kiran'), wt('H4', 'Meera') + 0.25], [wt('H4', 'Ravi')]];

/* ---------- V: live sort ---------- */
const vs = $('#vS'), VR = [36, 76, 712, 444];
const vV = v2(vs, { rect: VR, xa: 290, xb: 494, cy: 320, r: 150, ca: BC, cb: AC, la: 'B', lb: 'M' });
const VN = ['Diya', 'Sana', 'Aarav', 'Kiran', 'Meera', 'Ravi'];
const VP = { Diya: [212, 290], Sana: [212, 352], Meera: [392, 320], Aarav: [572, 290], Kiran: [572, 352], Ravi: [680, 488] };
const vT = VN.map((n, i) => ({ n, k: tok(vs, n, 132 + i * 104, 128, { rr: 44 }), tt: wt(n === 'Diya' || n === 'Sana' ? 'V5' : n === 'Aarav' || n === 'Kiran' ? 'V6' : n === 'Meera' ? 'V7' : 'V8', n) }));
const tV8 = wt('V8', 'neither');

/* ---------- R: four regions ---------- */
const rs = $('#rS'), rV = v2(rs, { rect: VR, xa: 290, xb: 494, cy: 300, r: 150, ca: BC, cb: AC, la: 'B', lb: 'M' });
const RP = { Diya: [212, 270], Sana: [212, 332], Meera: [392, 300], Aarav: [572, 270], Kiran: [572, 332], Ravi: [680, 470] };
Object.entries(RP).forEach(([n, [x, y]]) => tok(rs, n, x, y));
const RG = [['b', 'a', `${bc('B')} - ${ac('M')}`, 'only Biology', 'Diya, Sana'], ['m', 'b', `${ac('M')} - ${bc('B')}`, 'only Maths', 'Aarav, Kiran'], ['bm', 'ab', `${bc('B')} \\cap ${ac('M')}`, 'both', 'Meera'], ['n', 'out', `(${bc('B')} \\cup ${ac('M')})'`, 'neither', 'Ravi']];
$('#rgs').innerHTML = RG.map(([id, k, f, w, p], i) => `<div class="rg" id="rg${i}" style="top:${84 + i * 112}px"><div class="sw"></div><div class="f">${K(f)}</div><div class="w">${w}</div><div class="p">${p}</div></div>`).join('');
const tRg = [wt('R2', 'Only'), wt('R2', 'Only', 1), wt('R3', 'Both'), wt('R3', 'neither')];

/* ---------- K: subset / disjoint / overlap ---------- */
const KD = [[[236, 250, 62, AC, 'A'], [256, 230, 140, BC, 'B']], [[150, 230, 90, AC, 'A'], [362, 230, 90, BC, 'B']], [[205, 230, 110, AC, 'A'], [307, 230, 110, BC, 'B']]];
const kC = KD.map((cs, i) => { const s = $(`#k${i} svg`); return cs.map(([x, y, r, col, l], j) => { const c = mk(s, 'circle', { cx: x, cy: y, r, fill: 'none', stroke: col, 'stroke-width': 3.5 }); const lb = txt(s, i === 0 && j === 0 ? x : j ? x + r * 0.8 : x - r * 0.8, i === 0 && j === 0 ? y + 12 : y - r * 0.8, l, { ...LT, 'font-size': 36, fill: col }); return { c, lb }; }); });
$('#k0 .ex').innerHTML = K(`${ac('A')} \\subset ${bc('B')}`); $('#k1 .ex').innerHTML = K(`${ac('A')} \\cap ${bc('B')} = \\phi`); $('#k2 .ex').innerHTML = K(`${ac('A')} \\cap ${bc('B')} \\ne \\phi`);
const tK = [wt('K2', 'subset'), wt('K3', 'disjoint'), wt('K4', 'overlap')];
const th1 = PUC.think($('#th1'), { q: 'A = the set of squares, B = the set of rectangles. How should the circles be drawn?', opts: ['Overlapping', 'A inside B'], right: 1, why: 'Every square is a rectangle, so A ⊂ B: circle A sits inside circle B.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${bc('B')} - ${ac('M')} \\quad ${bc('B')} \\cap ${ac('M')} \\quad ${ac('M')} - ${bc('B')} \\quad (${bc('B')} \\cup ${ac('M')})'`);

/* ---------- P: shading ---------- */
const ps = $('#pS'), pV = v2(ps, { rect: VR, xa: 300, xb: 484, cy: 300, r: 150, ca: AC, cb: BC, la: 'A', lb: 'B' });
const PR = [[`${ac('A')} \\cup ${bc('B')}`, 'both circles, completely', ['a', 'ab', 'b']], [`${ac('A')} \\cap ${bc('B')}`, 'only the overlap', ['ab']], [`${ac('A')} - ${bc('B')}`, 'A, but not the overlap', ['a']], [`${ac("A'")}`, 'everything in U outside A', ['b', 'out']]];
$('#pRs').innerHTML = PR.map(([f, w], i) => `<div class="rg" id="pr${i}" style="top:${84 + i * 116}px;background:transparent"><div class="f" style="left:24px">${K(f)}</div><div class="w" style="left:24px">${w}</div></div>`).join('');
const tPr = [T0('P2'), T0('P3'), T0('P4'), T0('P5')];
const PCUR = ['A ∪ B', 'A ∩ B', 'A − B', "A′"];

/* ---------- Z: three sets ---------- */
const zs = $('#zS'), ZC = [[322, 250, AC, 'A'], [462, 250, BC, 'B'], [392, 370, CC, 'C']], ZRr = 120;
const zRect = mk(zs, 'path', { d: rectP(56, 76, 672, 460), fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const zU = txt(zs, 86, 118, 'U', { ...LT, 'font-size': 34, fill: C.ink });
const zCs = ZC.map(([x, y, col, l], i) => ({ c: mk(zs, 'circle', { cx: x, cy: y, r: ZRr, fill: 'none', stroke: col, 'stroke-width': 3.5 }), l: txt(zs, i === 2 ? x + ZRr * 0.95 : i ? x + ZRr * 0.82 : x - ZRr * 0.82, i === 2 ? y + ZRr * 0.75 : y - ZRr * 0.78, l, { ...LT, 'font-size': 38, fill: col }) }));
const ZN = [[262, 220], [392, 196], [522, 220], [318, 338], [392, 290], [466, 338], [392, 432], [110, 490]];
const zNum = ZN.map(([x, y], i) => tok(zs, String(i + 1), x, y, { mono: 1, fs: 30, rr: 22, col: RC }));
$('#zRs').innerHTML = [['In A?', AC], ['In B?', BC], ['In C?', CC]].map(([q, col], i) => `<div class="q3" id="zr${i}" style="top:${92 + i * 96}px"><div class="n">${i + 1}</div><div class="t" style="color:${col}">${q}</div><div class="yn">yes / no · 2 ways</div></div>`).join('');
$('#zM').innerHTML = `2 × 2 × 2 = <span class="a">8</span>`;
const tZr = [wt('Z2', 'A', 1), wt('Z2', 'B'), wt('Z2', 'C')];
const tZc = wt('Z4', 'Two'), tZce = Math.max(tZc + 1.6, T1('Z4') - 0.2);
const th2 = PUC.think($('#th2'), { q: 'How many regions does the rectangle have now, counting the outside?', opts: ['7', '8'], right: 1, why: 'In A or not, in B or not, in C or not: 2 × 2 × 2 = 8 regions.' });

/* ---------- W ---------- */
$('#wq').innerHTML = `${K(`U = \\{1, 2, \\dots, 10\\}`)}, ${K(ac('A'))} = even numbers, ${K(bc('B'))} = multiples of 3.<br>Place every number in the diagram.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${ac('A')} = \\{${xc('2, 4, 6, 8, 10')}\\}`)],
  [K(`${bc('B')} = \\{${xc('3, 6, 9')}\\}`)],
  [K(`${ac('A')} \\cap ${bc('B')} = \\{${xc('6')}\\}`)],
  [K(`${ac('A')} - ${bc('B')} = \\{${xc('2, 4, 8, 10')}\\},\\ \\ ${bc('B')} - ${ac('A')} = \\{${xc('3, 9')}\\}`)],
  [K(`(${ac('A')} \\cup ${bc('B')})' = \\{${xc('1, 5, 7')}\\}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const tW = [wt('W3', 'A'), wt('W4', 'B'), wt('W5', 'Six'), wt('W6', 'Two'), wt('W7', 'One')];
const ws = $('#wS'), wV = v2(ws, { rect: [36, 76, 712, 404], xa: 300, xb: 484, cy: 290, r: 140, ca: AC, cb: BC, la: 'A', lb: 'B' });
const WP = { 2: [214, 250], 4: [274, 250], 8: [214, 330], 10: [274, 330], 6: [392, 290], 3: [540, 260], 9: [540, 320], 1: [86, 250], 5: [86, 330], 7: [702, 290] };
const NW = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' };
const tWn = n => n % 2 === 0 ? wt('W3', NW[n]) : n === 3 || n === 9 ? wt('W4', NW[n]) : wt('W7', n === 1 ? 'One' : NW[n]);
const wT = {}; for (let n = 1; n <= 10; n++) wT[n] = tok(ws, n, 98 + (n - 1) * 66, 126, { mono: 1, fs: 28, rr: 24 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Only the two circles: where do 1, 5 and 7 go?', right: 'Draw U as a rectangle first: 1, 5 and 7 sit inside it' });
const ts = $('#tS'), tV = v2(ts, { xa: 230, xb: 330, cy: 150, r: 74, ca: AC, cb: BC, la: 'A', lb: 'B', ls: 28 });
const tRect = mk(ts, 'path', { d: rectP(24, 36, 512, 222, 14), fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const tOut = [[1, 76, 100], [5, 76, 200], [7, 486, 150]].map(([n, x, y]) => tok(ts, n, x, y, { mono: 1, fs: 28, rr: 22, col: C.red }));
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Draw or shade a Venn diagram, or pick the diagram that fits a statement.' });
const PT = `P = (A \\cap B) \\cup (B \\cap C) \\cup (C \\cap A)`;
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 560,
  q: `Let ${K(PT)}.<br>Which set is shaded?`,
  opts: [K('P'), K('P - (A \\cap B \\cap C)'), K('(A \\cup B \\cup C) - P'), K('A \\cap B \\cap C')], right: 1, cols: 1, optW: 540, optH: 76, optY: 214, optFs: 28 });
const ms = $('#mS');
const defs = mk(ms, 'defs', {});
const MCs = [[150, 150], [250, 150], [200, 236]], MR = 86;
MCs.forEach(([x, y], i) => { const cp = mk(defs, 'clipPath', { id: 'ep10c' + i }); mk(cp, 'circle', { cx: x, cy: y, r: MR }); });
mk(ms, 'rect', { x: 10, y: 10, width: 380, height: 340, rx: 14, fill: '#FFFFFF', stroke: C.ink, 'stroke-width': 3 });
[[0, 1], [1, 2], [0, 2]].forEach(([i, j]) => { const g = mk(ms, 'g', { 'clip-path': `url(#ep10c${i})` }); mk(g, 'circle', { cx: MCs[j][0], cy: MCs[j][1], r: MR, fill: HIT }); });
{ const g1 = mk(ms, 'g', { 'clip-path': 'url(#ep10c0)' }), g2 = mk(g1, 'g', { 'clip-path': 'url(#ep10c1)' }); mk(g2, 'circle', { cx: MCs[2][0], cy: MCs[2][1], r: MR, fill: '#FFFFFF' }); }
MCs.forEach(([x, y], i) => mk(ms, 'circle', { cx: x, cy: y, r: MR, fill: 'none', stroke: [AC, BC, CC][i], 'stroke-width': 3.5 }));
[['A', 70, 80, AC], ['B', 330, 80, BC], ['C', 300, 330, CC], ['U', 36, 336, C.ink]].forEach(([l, x, y, col]) => txt(ms, x, y, l, { ...LT, 'font-size': 30, fill: col }));
const so = PUC.solution($('#so'), [['shaded: inside exactly two circles'], [`${K('P')} also covers the centre`], [K(`\\text{centre} = A \\cap B \\cap C`)], [K(`P - (A \\cap B \\cap C)`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'shaded'), wt('A3', 'also'), wt('A3', 'But'), wt('A4', 'remove')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · Venn diagrams', y0: 98, dy: 78, txt: [1, 1, 0, 1, 1],
  lines: ['<b>U</b>: a rectangle · each set: a circle inside it', 'Subset: inside · disjoint: apart · else: overlap',
    K(`${ac('A')} - ${bc('B')} \\quad ${ac('A')} \\cap ${bc('B')} \\quad ${bc('B')} - ${ac('A')} \\quad (${ac('A')} \\cup ${bc('B')})'`),
    'Two sets: 4 regions · three sets: 8 regions', 'Every element lands in exactly one region'] });
const YQ = ['What does the rectangle in a Venn diagram stand for?', 'How do you draw A, when A is a subset of B?', 'Which region shows A − B?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 11', topic: 'Does the order ever change the answer? Properties of Set Operations', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('V5') - 0.2, 1.06, 1300, 560], [T0('R1') - 0.4, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tV1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('V1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HR.forEach(([w, ns], r) => { M.vis($('#hw' + r), t, tMorph + 0.3 + r * 0.1, 1e9, { dy: 10 }); ns.forEach((_, i) => M.vis($(`#hn${r}${i}`), t, tHn[r][i] - 0.1, 1e9, POP)); });
    ['#hn02', '#hn12'].forEach(s => { const el = $(s), b = M.io((t - wt('H5', 'Where')) / 0.3); el.style.background = mix('#FFFFFF', C.redBg, b); });
    M.vis($('#hlP'), t, wt('H5', 'Where') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H5', 'Venn') - 0.1, 1e9, POP);
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tR1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('R1');
    M.vis($('#vd'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#vdT'), t, tV1 + 0.2, { st: 0.05, sp: M.HEAVY });
    M.vis($('#vk0'), t, wt('V2', 'rectangle') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis($('#vk1'), t, wt('V2', 'circle') - 0.1, 1e9, { dx: -16, dy: 0 });
    M.vis($('#vh'), t, wt('V3', 'named') - 0.1, 1e9, { dy: 16 });
    M.vis($('#vv'), t, T0('V2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(vV.rect, t, wt('V2', 'rectangle'), 0.8); M.vis(vV.lU, t, wt('V2', 'rectangle') + 0.4, 1e9, POP);
    M.draw(vV.cA, t, wt('V4', 'Biology'), 0.7); M.vis(vV.lA, t, wt('V4', 'Biology') + 0.1, 1e9, POP);
    M.draw(vV.cB, t, wt('V4', 'Maths'), 0.7); M.vis(vV.lB, t, wt('V4', 'Maths') + 0.1, 1e9, POP);
    vV.fill('ab', tint(t, wt('V4', 'overlap')));
    vT.forEach((v, i) => { M.vis(v.k.g, t, wt('V4', 'sort') + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); fly(v.k, t, v.tt + 0.1, ...VP[v.n]); attr(v.k.ring, 'opacity', pulse(t, v.tt - 0.1, 0.9).toFixed(3)); });
    vV.fill('out', tint(t, tV8));
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rv'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    RG.forEach(([id, k], i) => { const el = $('#rg' + i); M.vis(el, t, tRg[i] - 0.1, 1e9, { dx: -16, dy: 0 });
      const on = M.io((t - tRg[i] + 0.1) / 0.3) * (1 - M.io((t - (tRg[i + 1] ?? T0('R4')) + 0.1) / 0.3)), all = M.io((t - T0('R4')) / 0.4);
      rV.fill(k, mix('#FFFFFF', HIT, Math.max(on, all * 0.7))); el.style.background = mix(C.soft, C.ac2, on); el.querySelector('.sw').style.background = mix('#FFFFFF', HIT, M.io((t - tRg[i]) / 0.3)); });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K5');
    [0, 1, 2].forEach(i => { M.vis($('#k' + i), t, tK[i] - 0.3, out, { dy: 30, ...o });
      kC[i].forEach((c, j) => { M.draw(c.c, t, tK[i] + j * 0.25, 0.6); M.vis(c.lb, t, tK[i] + j * 0.25 + 0.2, 1e9, POP); });
      M.vis($(`#k${i} .ex`), t, tK[i] + 0.8, 1e9, POP); });
    M.vis($('#th1'), t, T0('K5') + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: T0('K5'), tOpts: wt('K5', 'How') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: T0('K6') - 0.02, tWhy: wt('K6', 'Every') });
  }

  /* statement */
  const stOn = t >= tT && t < tP1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tP1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'region') - 0.2, 0.9);
  }

  /* P: shading */
  const pOn = t >= tP1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('Z1');
    M.vis($('#pv'), t, tP1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pl'), t, tP1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const cur = tPr.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, -1);
    ['a', 'ab', 'b', 'out'].forEach(k => { let v = 0; tPr.forEach((tt, i) => { const on = PR[i][2].includes(k) ? 1 : 0; v += (on - v) * M.io((t - tt) / 0.35); }); pV.fill(k, mix('#FFFFFF', HIT, v)); });
    PR.forEach((_, i) => M.vis($('#pr' + i), t, tPr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    const hy = M.track(84, tPr.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t); const hb = $('#pHi'); M.vis(hb, t, tPr[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    M.vis($('#pCur'), t, tPr[0] - 0.1, 1e9, POP); M.setT($('#pCur'), cur >= 0 ? PCUR[cur] : PCUR[0]);
  }

  /* Z: three sets */
  const zOn = t >= tZ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('W1');
    M.vis($('#zv'), t, tZ1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(zRect, t, tZ1 + 0.3, 0.8); M.vis(zU, t, tZ1 + 0.6, 1e9, POP);
    zCs.forEach((z, i) => { const a = i < 2 ? tZ1 + 0.5 + i * 0.3 : wt('Z1', 'C'); M.draw(z.c, t, a, 0.7); M.vis(z.l, t, a + 0.2, 1e9, POP); });
    M.vis($('#zq'), t, T0('Z2') - 0.1, out, { dx: 60, dy: 0, ...o });
    tZr.forEach((tt, i) => M.vis($('#zr' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    let n = 0; zNum.forEach((k, i) => { const a = tZc + 0.1 + i * (tZce - tZc) / 8; if (t >= a) n = i + 1; M.vis(k.g, t, a, 1e9, POP); });
    M.vis($('#zCnt'), t, tZc, 1e9, POP); M.setT($('#zCnt'), `regions: ${n}`);
    PUC.write($('#zM'), t, tZc, 0.9);
    M.vis($('#th2'), t, T0('Z3') + 0.05, tZc - 0.35, { dy: 36, ...o });
    th2(t, { tin: T0('Z3'), tOpts: wt('Z3', 'How') - 0.1, tCount: T1('Z3') + 0.05, dur: 3, tAns: T0('Z4') - 0.02, tWhy: wt('Z4', 'Each') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wV.rect, t, T0('W2') + 0.5, 0.8); M.vis(wV.lU, t, T0('W2') + 0.8, 1e9, POP);
    M.draw(wV.cA, t, wt('W2', 'even'), 0.6); M.vis(wV.lA, t, wt('W2', 'even') + 0.2, 1e9, POP);
    M.draw(wV.cB, t, wt('W2', 'multiples'), 0.6); M.vis(wV.lB, t, wt('W2', 'multiples') + 0.2, 1e9, POP);
    for (let n = 1; n <= 10; n++) { const k = wT[n]; M.vis(k.g, t, wt('W2', 'Place') + (n - 1) * 0.06, 1e9, POP); fly(k, t, tWn(n), ...WP[n]); }
    attr(wT[6].ring, 'opacity', pulse(t, wt('W4', 'six') - 0.05, 0.7).toFixed(3));
    wV.fill('ab', tint(t, tW[2]));
    const f6 = M.io((t - tW[3]) / 0.4); wV.fill('a', mix('#FFFFFF', '#E7EEFD', f6)); wV.fill('b', mix('#FFFFFF', '#DDF1F1', f6));
    wV.fill('out', tint(t, tW[4] + 0.6));
    M.vis($('#wP'), t, T0('W8') + 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Without') });
    M.draw(tV.cA, t, T0('X2') + 0.1, 0.5); M.draw(tV.cB, t, T0('X2') + 0.3, 0.5); M.vis(tV.lA, t, T0('X2') + 0.4, 1e9, POP); M.vis(tV.lB, t, T0('X2') + 0.5, 1e9, POP);
    tOut.forEach((k, i) => { M.vis(k.g, t, wt('X2', 'circles') + i * 0.1, 1e9, POP); attr(k.t, 'fill', mix(C.red, XC, M.io((t - wt('X3', 'Without') - 0.6) / 0.3))); });
    M.draw(tRect, t, wt('X3', 'Without') - 0.1, 0.8);
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'draw') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'shaded'), tCount, tAns });
    M.vis($('#mS'), t, tQ + 0.4, 1e9, { dy: 0, fade: 0.2 });
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
