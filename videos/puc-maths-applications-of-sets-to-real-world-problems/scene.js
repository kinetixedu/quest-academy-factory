// PUC Maths Ep 12: Applications of sets to real-world problems (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): elements violet, first set blue, second set teal, U ink outline, counts in Plex Mono ink; overlap / result = coral tint
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', BC = '#0E8F8F', ACB = '#E7EEFD', BCB = '#DDF1F1', HIT = '#FBDCD2';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`;
const A = ac('A'), B = bc('B'), Tt = ac('T'), Cc = bc('C');
const LT = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'text-anchor': 'middle' };
const NUM = { 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'text-anchor': 'middle', fill: C.ink };

/* ---------- Venn helper (moving circles allowed) ---------- */
const circ = (x, y, r) => `M${x - r},${y} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 Z`;
const rectP = (x, y, w, h, q = 16) => `M${x + q},${y} H${x + w - q} Q${x + w},${y} ${x + w},${y + q} V${y + h - q} Q${x + w},${y + h} ${x + w - q},${y + h} H${x + q} Q${x},${y + h} ${x},${y + h - q} V${y + q} Q${x},${y} ${x + q},${y} Z`;
const vpaths = (xa, xb, cy, r) => {
  const d = xb - xa, mx = (xa + xb) / 2, h2 = r * r - d * d / 4;
  if (h2 <= 1) return { a: circ(xa, cy, r), b: circ(xb, cy, r), ab: '', u: circ(xa, cy, r) + ' ' + circ(xb, cy, r) };
  const h = Math.sqrt(h2), T = `${mx.toFixed(1)},${(cy - h).toFixed(1)}`, Bt = `${mx.toFixed(1)},${(cy + h).toFixed(1)}`;
  return { ab: `M${T} A${r},${r} 0 0 1 ${Bt} A${r},${r} 0 0 1 ${T} Z`, a: `M${T} A${r},${r} 0 1 0 ${Bt} A${r},${r} 0 0 1 ${T} Z`, b: `M${T} A${r},${r} 0 1 1 ${Bt} A${r},${r} 0 0 0 ${T} Z`, u: `M${T} A${r},${r} 0 1 0 ${Bt} A${r},${r} 0 1 0 ${T} Z` };
};
const venn = (svg, o) => {
  const { cy, r } = o, g = mk(svg, 'g', {}), R = {};
  if (o.rect) R.out = mk(g, 'path', { 'fill-rule': 'evenodd', fill: '#FFFFFF' });
  R.a = mk(g, 'path', { fill: '#FFFFFF' }); R.ab = mk(g, 'path', { fill: '#FFFFFF' }); R.b = mk(g, 'path', { fill: '#FFFFFF' });
  const rect = o.rect ? mk(g, 'path', { d: rectP(...o.rect), fill: 'none', stroke: C.ink, 'stroke-width': 3 }) : null;
  const cA = mk(g, 'circle', { cy, r, fill: 'none', stroke: AC, 'stroke-width': 3.5 }), cB = mk(g, 'circle', { cy, r, fill: 'none', stroke: BC, 'stroke-width': 3.5 });
  const lA = txt(g, 0, 0, o.la, { ...LT, 'font-size': 40, fill: AC }), lB = txt(g, 0, 0, o.lb, { ...LT, 'font-size': 40, fill: BC });
  const lU = o.rect ? txt(g, o.rect[0] + 30, o.rect[1] + 42, 'U', { ...LT, 'font-size': 34, fill: C.ink }) : null;
  const v = { g, R, rect, cA, cB, lA, lB, lU, set(xa, xb) {
    attr(cA, 'cx', xa.toFixed(1)); attr(cB, 'cx', xb.toFixed(1));
    attr(lA, 'x', (xa - r * 0.82).toFixed(1)); attr(lA, 'y', (cy - r * 0.78).toFixed(1)); attr(lB, 'x', (xb + r * 0.82).toFixed(1)); attr(lB, 'y', (cy - r * 0.78).toFixed(1));
    const p = vpaths(xa, xb, cy, r); ['a', 'ab', 'b'].forEach(k => attr(R[k], 'd', p[k])); if (R.out) attr(R.out, 'd', rectP(...o.rect) + ' ' + p.u);
  }, fill(k, c) { attr(R[k], 'fill', c); } };
  v.set(o.xa, o.xb); return v;
};
const pulse = (t, a, d = 0.6) => { const u = (t - a) / d; return u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * u); };
const tint = (t, a, d = 0.4) => mix('#FFFFFF', HIT, M.io((t - a) / d));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tG1 = T0('G1'), tD1 = T0('D1'), tK1 = T0('K1'), tT = T0('T1'), tB1 = T0('B1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tB1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['LIKE TEA', '25'], ['LIKE COFFEE', '18'], ['LIKE BOTH', '10']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'tea') - 0.05, wt('H1', 'coffee') - 0.05, wt('H1', 'Add')];

/* ---------- H ---------- */
const HS = [['Like tea', '25', AC], ['Like coffee', '18', BC], ['Like both', '10', RC]];
$('#hcs').innerHTML = HS.map(([k, v, col], i) => `<div class="sv" id="hs${i}" style="top:${84 + i * 92}px"><div class="k">${k}</div><div class="v" style="color:${col}">${v}</div></div>`).join('');
const tHs = [wt('H4', 'Twenty'), wt('H4', 'Eighteen'), wt('H4', 'Ten')];

/* ---------- L: n(A) + live count ---------- */
$('#lS').innerHTML = K(`n(${A})`);
$('#lE').innerHTML = K(`${A} = \\{a, e, i, o, u\\} \\;\\Rightarrow\\; n(${A}) = 5`);
const TL = [[`n(${Tt})`, '25'], [`+\\ n(${Cc})`, '43'], [`-\\ n(${Tt} \\cap ${Cc})`, '33']];
$('#lTl').innerHTML = TL.map(([f, r], i) => `<div class="tl" id="tl${i}" style="top:${304 + i * 82}px"><div class="f">${K(f)}</div><div class="r">${r}</div></div>`).join('');
const lv = $('#lV'), LV = venn(lv, { xa: 290, xb: 494, cy: 290, r: 160, la: 'T', lb: 'C' });
const dots = [];
for (let c = 0; c < 3; c++) for (let r = 0; r < 5; r++) dots.push({ x: 175 + c * 40, y: 210 + r * 40, k: 't' });
for (let c = 0; c < 2; c++) for (let r = 0; r < 5; r++) dots.push({ x: 372 + c * 40, y: 210 + r * 40, k: 'b' });
for (let c = 0; c < 2; c++) for (let r = 0; r < 4; r++) dots.push({ x: 530 + c * 40, y: 230 + r * 40, k: 'c' });
dots.forEach(d => { d.ring = mk(lv, 'circle', { cx: d.x, cy: d.y, r: 15, fill: 'none', stroke: RC, 'stroke-width': 3, opacity: 0 }); d.c = mk(lv, 'circle', { cx: d.x, cy: d.y, r: 10, fill: '#FFFFFF', stroke: C.dim, 'stroke-width': 2 }); });
const tDt = [...dots.filter(d => d.k === 't'), ...dots.filter(d => d.k === 'b')], cDt = [...dots.filter(d => d.k === 'b'), ...dots.filter(d => d.k === 'c')];
const tL2a = wt('L2', 'Count') + 0.2, tL2b = Math.max(tL2a + 1.2, wt('L2', 'Twenty') - 0.1);
const tL3a = wt('L3', 'count') + 0.2, tL3b = Math.max(tL3a + 1.0, wt('L3', 'Forty') - 0.1);
tDt.forEach((d, i) => { d.t1 = tL2a + i * (tL2b - tL2a) / 25; }); cDt.forEach((d, i) => { d.t2 = tL3a + i * (tL3b - tL3a) / 18; });
const lX2 = txt(lv, 392, 470, 'counted twice', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });
const tL5 = wt('L5', 'away');

/* ---------- D: formula ---------- */
const DST = [[`n(${A}) + n(${B})`, 'counts every element of A ∪ B'], [`n(${A} \\cap ${B})`, 'but the overlap is counted twice'], [`n(${A} \\cup ${B}) = n(${A}) + n(${B}) - n(${A} \\cap ${B})`, 'so subtract it once'], [`${A} \\cap ${B} = \\phi \\Rightarrow n(${A} \\cup ${B}) = n(${A}) + n(${B})`, 'disjoint: nothing to subtract']];
$('#dSt').innerHTML = DST.map(([f, w], i) => `<div class="st" id="ds${i}" style="top:${82 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tDs = [wt('D2', 'Adding'), wt('D3', 'twice'), wt('D4', 'subtract'), wt('D5', 'disjoint')];
const dv = $('#dV'), DV = venn(dv, { xa: 300, xb: 484, cy: 290, r: 150, la: 'A', lb: 'B' });
const dLb = [txt(dv, 0, 300, 'only A', { 'text-anchor': 'middle', 'font-size': 20, fill: AC, 'font-weight': 600 }), txt(dv, 0, 300, '×2', { 'text-anchor': 'middle', 'font-size': 34, fill: RC, 'font-weight': 600 }), txt(dv, 0, 300, 'only B', { 'text-anchor': 'middle', 'font-size': 20, fill: BC, 'font-weight': 600 })];
const DTAG = ['n(A) + n(B)', 'overlap counted twice', 'subtract it once', 'disjoint: no overlap'];
const dSep = t => 184 + 136 * M.io((t - tDs[3] - 0.3) / 1.0);

/* ---------- K ---------- */
const kA = venn($('#kaS'), { xa: 300, xb: 484, cy: 260, r: 140, la: 'T', lb: 'C' }), kB = venn($('#kbS'), { xa: 300, xb: 484, cy: 260, r: 140, la: 'T', lb: 'C' });
const kN = (svg, vals) => vals.map(([s, x, y]) => txt(svg, x, y, s, { ...NUM, 'font-size': 40 }));
const kAn = kN($('#kaS'), [['15', 224, 274], ['10', 392, 274], ['8', 560, 274]]), kBn = kN($('#kbS'), [['15', 224, 274], ['10', 392, 274], ['8', 560, 274]]);
$('#kaR').innerHTML = K(`n(${Tt}) = 15 + 10 = 25`);
$('#kbR').innerHTML = K(`n(${Tt} - ${Cc}) = 25 - 10 = 15`);
const th1 = PUC.think($('#th1'), { q: 'How many students like only coffee?', opts: ['8', '18'], right: 0, why: '18 like coffee, but 10 of them also like tea: 18 − 10 = 8.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`n(${A} \\cup ${B}) = n(${A}) + n(${B}) - n(${A} \\cap ${B})`);

/* ---------- B: three pieces ---------- */
const bV = venn($('#bS'), { xa: 300, xb: 484, cy: 290, r: 160, la: 'T', lb: 'C' });
const bN = [['15', 214, 304], ['10', 392, 304], ['8', 570, 304]].map(([s, x, y]) => txt($('#bS'), x, y, s, { ...NUM, 'font-size': 48 }));
const bCap = [['only tea', 214, 350, AC], ['both', 392, 350, RC], ['only coffee', 570, 350, BC]].map(([s, x, y, col]) => txt($('#bS'), x, y, s, { 'text-anchor': 'middle', 'font-size': 18, fill: col, 'font-weight': 600 }));
$('#bSum').innerHTML = `15 + 10 + 8 = <span class="a">33</span>`;
$('#bF').innerHTML = K(`n(${Tt} \\cup ${Cc}) = 25 + 18 - 10 = 33`);
const tBn = [wt('B1', 'Fifteen'), wt('B1', 'Ten'), wt('B1', 'Eight')];

/* ---------- W ---------- */
$('#wq').innerHTML = `60 students: 35 play cricket, 28 play football, 10 play both. How many play neither?`;
const Cr = ac('C'), Fo = bc('F');
const wsol = PUC.solution($('#wl'), [
  [K(`n(${Cr}) = 35,\\ n(${Fo}) = 28,\\ n(${Cr} \\cap ${Fo}) = 10`)],
  [K(`n(${Cr} \\cup ${Fo}) = 35 + 28 - 10 = 53`)],
  ['53 play at least one game'],
  [K(`n((${Cr} \\cup ${Fo})') = 60 - 53 = 7`)],
  ['7 students play neither game']], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const tW = [wt('W3', 'Let'), wt('W4', 'union'), wt('W5', 'fifty'), wt('W6', 'Neither'), T0('W7')];
const ws = $('#wS'), WV = venn(ws, { rect: [36, 76, 712, 404], xa: 300, xb: 484, cy: 268, r: 135, la: 'C', lb: 'F' });
const wN = [['25', 222, 282], ['10', 392, 282], ['18', 562, 282], ['7', 690, 150]].map(([s, x, y]) => txt(ws, x, y, s, { ...NUM, 'font-size': 40 }));
const wL = [['n(C) = 35', 250, 448, AC], ['n(F) = 28', 534, 448, BC], ['neither', 690, 180, C.mute]].map(([s, x, y, col]) => txt(ws, x, y, s, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`n(${Cr} \\cup ${Fo}) = 35 + 28 = 63`) + '&nbsp; more than 60 students!', right: K(`n(${Cr} \\cup ${Fo}) = 35 + 28 - 10 = 53`) });
const ts = $('#tS'), BX = v => 40 + v * 7;
const bar1 = mk(ts, 'rect', { x: 40, y: 70, width: BX(63) - 40, height: 44, rx: 8, fill: C.redBg, stroke: C.red, 'stroke-width': 2.5 });
const bar2 = mk(ts, 'rect', { x: 40, y: 160, width: BX(53) - 40, height: 44, rx: 8, fill: C.okBg, stroke: C.ok, 'stroke-width': 2.5 });
const b1t = txt(ts, BX(63) - 14, 100, '63', { ...NUM, 'text-anchor': 'end', 'font-size': 24, fill: C.red }), b2t = txt(ts, BX(53) - 14, 190, '53', { ...NUM, 'text-anchor': 'end', 'font-size': 24, fill: C.ok });
const lim = mk(ts, 'line', { x1: BX(60), y1: 44, x2: BX(60), y2: 236, stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
const limT = txt(ts, BX(60), 34, '60 students', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Survey problems with numbers or percentages: find the overlap, or its least and greatest value.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `In a hostel, 62% of the students read a newspaper and 75% watch the news on TV. If x% do both, then x lies in`,
  opts: [K('[37, 62]'), K('[13, 62]'), K('[37, 75]'), K('[0, 62]')], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`n(${A} \\cup ${B}) \\le 100`)], [K(`62 + 75 - x \\le 100`)], [K(`x \\ge 37`)], [K(`x \\le \\min(62, 75) = 62`)], [K(`37 \\le x \\le 62`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'union'), wt('A2', 'sixty'), wt('A3', 'gives'), wt('A4', 'overlap'), wt('A4', 'sixty')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · counting with sets', y0: 98, dy: 78, txt: [0, 0, 0, 0, 1],
  lines: [K(`n(${A} \\cup ${B}) = n(${A}) + n(${B}) - n(${A} \\cap ${B})`), K(`${A} \\cap ${B} = \\phi:\\ \\ n(${A} \\cup ${B}) = n(${A}) + n(${B})`), K(`n(${A} - ${B}) = n(${A}) - n(${A} \\cap ${B})`), K(`n((${A} \\cup ${B})') = n(U) - n(${A} \\cup ${B})`), 'only A + both + only B = everyone in A ∪ B'] });
const YQ = ['Write the formula for n(A ∪ B).', 'If A and B are disjoint, what is n(A ∪ B)?', 'n(A) = 12, n(B) = 9, n(A ∪ B) = 17. Find n(A ∩ B).'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 13', topic: 'Three snacks, two drinks: how many combos? Cartesian Products of Sets', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L4') - 0.2, 1.04, 960, 560], [tL5 + 0.8, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  const gh = $('#ghN'); if (!gh._p) { gh._p = 1; gh.style.left = (160 + $('#nchip').offsetWidth + 16) + 'px'; gh.style.top = '100px'; }
  M.vis(gh, t, tMorph + 0.7, tQ - 0.05, { dx: 16, dy: 0, outDur: 0.01 });

  /* H */
  const hOn = t >= tMorph && t < tG1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('G1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HS.forEach((_, i) => M.vis($('#hs' + i), t, Math.min(tMorph + 0.3 + i * 0.12, tHs[i]), 1e9, { dx: -16, dy: 0 }));
    HS.forEach((_, i) => { const el = $('#hs' + i); el.style.background = mix(C.soft, C.ac2, pulse(t, tHs[i] - 0.1, 0.9)); });
    M.vis($('#hlP'), t, wt('H5', 'Not') - 0.1, 1e9, POP); M.vis($('#hlP2'), t, wt('H4', 'every') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'how') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#ll'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#lS'), t, wt('G1', 'n') - 0.1, 0.5); M.vis($('#lSL'), t, wt('G1', 'number') - 0.1, 1e9, { dx: -12, dy: 0 });
    PUC.write($('#lE'), t, wt('G1', 'finite'), 0.8);
    M.vis($('#lT0'), t, T0('L2') - 0.1, 1e9, { dy: 10 });
    [T0('L2'), T0('L3'), tL5].forEach((tt, i) => { const el = $('#tl' + i); M.vis(el, t, tt, 1e9, { dx: -16, dy: 0 }); M.vis(el.querySelector('.r'), t, [tL2b, tL3b, tL5 + 0.8][i], 1e9, POP); });
    M.vis($('#lv'), t, T0('L1') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(LV.cA, t, wt('L1', 'T'), 0.7); M.vis(LV.lA, t, wt('L1', 'T') + 0.1, 1e9, POP);
    M.draw(LV.cB, t, wt('L1', 'C'), 0.7); M.vis(LV.lB, t, wt('L1', 'C') + 0.1, 1e9, POP);
    let n = 0; const sub = M.io((t - tL5) / 0.8);
    dots.forEach((d, i) => {
      M.vis(d.c, t, T0('L1') + 0.8 + i * 0.03, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      const c1 = d.t1 != null && t >= d.t1, c2 = d.t2 != null && t >= d.t2;
      n += (c1 ? 1 : 0) + (c2 ? 1 : 0);
      attr(d.c, 'fill', c1 || c2 ? XC : '#FFFFFF'); attr(d.c, 'stroke', c1 || c2 ? XC : C.dim);
      if (d.k === 'b') attr(d.ring, 'opacity', (c2 ? 1 - sub : 0).toFixed(3));
    });
    n -= Math.round(10 * sub);
    M.vis($('#lCnt'), t, tL2a - 0.2, 1e9, POP); M.setT($('#lCnt'), `count = ${n}`);
    LV.fill('ab', mix('#FFFFFF', HIT, M.io((t - T0('L4')) / 0.4) * (1 - 0.6 * sub)));
    M.vis(lX2, t, wt('L4', 'once'), tL5 + 0.5, { dy: 0 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    DST.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i], i === 2 ? 1.2 : 0.8); M.vis(el.querySelector('.why'), t, tDs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(82, tDs.slice(1).map((tt, i) => [tt - 0.1, 82 + (i + 1) * 120]), M.SOFT)(t); const hb = $('#dHi'); M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    M.vis($('#dv'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const d = dSep(t), xa = 392 - d / 2, xb = 392 + d / 2; DV.set(xa, xb);
    const s0 = M.io((t - tDs[0]) / 0.4); DV.fill('a', mix('#FFFFFF', ACB, s0)); DV.fill('b', mix('#FFFFFF', BCB, s0));
    DV.fill('ab', mix('#FFFFFF', HIT, M.io((t - tDs[1]) / 0.4)));
    attr(dLb[0], 'x', (xa - 70).toFixed(1)); attr(dLb[2], 'x', (xb + 70).toFixed(1)); attr(dLb[1], 'x', '392'); attr(dLb[1], 'y', '304');
    M.setT(dLb[1], t < tDs[2] ? '×2' : '×1');
    M.vis(dLb[0], t, tDs[0] + 0.3, 1e9, { dy: 0 }); M.vis(dLb[2], t, tDs[0] + 0.4, 1e9, { dy: 0 }); M.vis(dLb[1], t, tDs[1] + 0.2, tDs[3] + 0.2, { dy: 0, outDur: 0.2, ody: 0 });
    const cur = tDs.reduce((a, tt, i) => t >= tt ? i : a, 0); M.setT($('#dTag'), DTAG[cur]); M.vis($('#dTag'), t, tDs[0] + 0.2, 1e9, POP);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const fa = M.io((t - wt('K1', 'everyone')) / 0.4); kA.fill('a', mix('#FFFFFF', HIT, fa)); kA.fill('ab', mix('#FFFFFF', HIT, fa));
    attr(kAn[2], 'fill', C.dim); PUC.write($('#kaR'), t, wt('K1', 'Twenty') - 0.2, 0.8);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    kB.fill('a', mix('#FFFFFF', HIT, M.io((t - wt('K2', 'outside')) / 0.4))); attr(kBn[1], 'fill', C.dim); attr(kBn[2], 'fill', C.dim);
    PUC.write($('#kbR'), t, wt('K2', 'Twenty') - 0.1, 0.9);
    M.vis($('#th1'), t, T0('K3') + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: T0('K3'), tOpts: wt('K3', 'only') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Eighteen') });
  }

  /* statement */
  const stOn = t >= tT && t < tB1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tB1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Add') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'overlap') - 0.1, 1.0);
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('W1');
    M.vis($('#bv'), t, tB1 + 0.3, out, { dx: -60, dy: 0, ...o });
    bN.forEach((e, i) => { M.vis(e, t, tBn[i] - 0.1, 1e9, POP); M.vis(bCap[i], t, tBn[i], 1e9, { dy: 0 }); });
    bV.fill('a', tint(t, tBn[0] - 0.1)); bV.fill('ab', tint(t, tBn[1] - 0.1)); bV.fill('b', tint(t, tBn[2] - 0.1));
    M.vis($('#bs'), t, tB1 + 0.5, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#bSum'), t, T0('B2'), 1.0);
    M.vis($('#bP'), t, wt('B2', 'same') - 0.1, 1e9, POP); PUC.write($('#bF'), t, wt('B2', 'counted') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(WV.rect, t, T0('W2') + 0.5, 0.8); M.vis(WV.lU, t, T0('W2') + 0.8, 1e9, POP);
    M.draw(WV.cA, t, wt('W2', 'cricket'), 0.6); M.vis(WV.lA, t, wt('W2', 'cricket') + 0.2, 1e9, POP);
    M.draw(WV.cB, t, wt('W2', 'football'), 0.6); M.vis(WV.lB, t, wt('W2', 'football') + 0.2, 1e9, POP);
    M.vis(wL[0], t, wt('W3', 'thirty'), 1e9, { dy: 0 }); M.vis(wL[1], t, wt('W3', 'twenty'), 1e9, { dy: 0 });
    M.vis(wN[1], t, wt('W3', 'ten') - 0.1, 1e9, POP); WV.fill('ab', tint(t, wt('W3', 'ten')));
    M.vis(wN[0], t, tW[1] + 0.6, 1e9, POP); M.vis(wN[2], t, tW[1] + 0.9, 1e9, POP);
    const u = M.io((t - tW[2]) / 0.4); WV.fill('a', mix('#FFFFFF', HIT, u)); WV.fill('b', mix('#FFFFFF', HIT, u));
    M.vis(wN[3], t, wt('W6', 'seven') - 0.1, 1e9, POP); M.vis(wL[2], t, tW[3], 1e9, { dy: 0 });
    WV.fill('out', mix('#FFFFFF', '#FFF4D6', M.io((t - tW[3]) / 0.4)));
    M.vis($('#wP'), t, T0('W7') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Thirty') - 0.1, tStrike: wt('X3', 'twice') - 0.1, tRight: wt('X3', 'Subtract') });
    M.draw(lim, t, wt('X2', 'sixty', 1) - 0.1, 0.4); M.vis(limT, t, wt('X2', 'sixty', 1), 1e9, { dy: 0 });
    const g1 = M.io((t - wt('X2', 'sixty') + 0.1) / 0.6); attr(bar1, 'width', Math.max(0.1, (BX(63) - 40) * g1).toFixed(1)); M.hide(bar1, g1 <= 0); M.vis(b1t, t, wt('X2', 'sixty') + 0.4, 1e9, { dy: 0 });
    const g2 = M.io((t - wt('X3', 'union') + 0.1) / 0.6); attr(bar2, 'width', Math.max(0.1, (BX(53) - 40) * g2).toFixed(1)); M.hide(bar2, g2 <= 0); M.vis(b2t, t, wt('X3', 'union') + 0.4, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'survey') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Between'), tCount, tAns });
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
