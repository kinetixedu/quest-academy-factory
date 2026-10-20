// PUC Maths Ep 08: Union, intersection and difference (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): element x violet, rule coral (accent), set A blue, set B teal, not-in red
const XC = C.violet, RC = C.ac, AC = '#2F6FEB', BC = '#0E8F8F', ACB = '#E7EEFD', BCB = '#DDF1F1', HIT = '#FBDCD2';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, ac = s => `\\textcolor{${AC}}{${s}}`, bc = s => `\\textcolor{${BC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const tx = s => `\\text{${s}}`;
const UNI = `${ac('A')} \\cup ${bc('B')}`, INT = `${ac('A')} \\cap ${bc('B')}`, DIF = `${ac('A')} - ${bc('B')}`;
const SB = rule => `\\{\\, ${xc('x')} : ${rule} \\,\\}`;
const inA = `${xc('x')} \\in ${ac('A')}`, inB = `${xc('x')} \\in ${bc('B')}`, ninB = `${xc('x')} ${red('\\notin')} ${bc('B')}`;

/* ---------- Venn helper: two equal circles, three region paths ---------- */
const full = (x, cy, r) => `M${x - r},${cy} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 Z`;
const vpaths = (xa, xb, cy, r) => {
  const d = xb - xa, mx = (xa + xb) / 2, h2 = r * r - d * d / 4;
  if (h2 <= 1) return { a: full(xa, cy, r), b: full(xb, cy, r), ab: '' };
  const h = Math.sqrt(h2), T = `${mx.toFixed(1)},${(cy - h).toFixed(1)}`, B = `${mx.toFixed(1)},${(cy + h).toFixed(1)}`;
  return { ab: `M${T} A${r},${r} 0 0 1 ${B} A${r},${r} 0 0 1 ${T} Z`, a: `M${T} A${r},${r} 0 1 0 ${B} A${r},${r} 0 0 1 ${T} Z`, b: `M${T} A${r},${r} 0 1 1 ${B} A${r},${r} 0 0 0 ${T} Z` };
};
const venn = (svg, o) => {
  const { cy, r } = o, g = mk(svg, 'g', {});
  const reg = { a: mk(g, 'path', { fill: '#FFFFFF' }), ab: mk(g, 'path', { fill: '#FFFFFF' }), b: mk(g, 'path', { fill: '#FFFFFF' }) };
  const cA = mk(g, 'circle', { cy, r, fill: 'none', stroke: AC, 'stroke-width': 3.5 }), cB = mk(g, 'circle', { cy, r, fill: 'none', stroke: BC, 'stroke-width': 3.5 });
  const L = { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': o.ls || 44, 'text-anchor': 'middle' };
  const lA = txt(g, 0, 0, o.la || 'A', { ...L, fill: AC }), lB = txt(g, 0, 0, o.lb || 'B', { ...L, fill: BC });
  const v = { g, reg, cA, cB, lA, lB, set(xa, xb) {
    attr(cA, 'cx', xa.toFixed(1)); attr(cB, 'cx', xb.toFixed(1));
    attr(lA, 'x', (xa - r * 0.82).toFixed(1)); attr(lA, 'y', (cy - r * 0.78).toFixed(1)); attr(lB, 'x', (xb + r * 0.82).toFixed(1)); attr(lB, 'y', (cy - r * 0.78).toFixed(1));
    const p = vpaths(xa, xb, cy, r); for (const k in p) attr(reg[k], 'd', p[k]);
  }, fill(k, col) { attr(reg[k], 'fill', col); } };
  v.set(o.xa, o.xb); return v;
};
// element token (svg text) that can fly: outer g carries position, inner g is for M.vis
const tok = (svg, s, x, y, o = {}) => {
  const pg = mk(svg, 'g', { transform: `translate(${x},${y})` }), g = mk(pg, 'g', {});
  const ring = mk(g, 'circle', { r: o.rr || 40, fill: 'none', stroke: RC, 'stroke-width': 3, opacity: 0 });
  const t = txt(g, 0, 8, s, { 'text-anchor': 'middle', 'font-family': o.mono ? 'IBM Plex Mono' : 'Poppins', 'font-size': o.fs || 24, 'font-weight': 600, fill: XC });
  return { pg, g, ring, t, x, y, move(nx, ny) { attr(pg, 'transform', `translate(${nx.toFixed(1)},${ny.toFixed(1)})`); } };
};
const pulse = (t, a, d = 0.6) => { const u = (t - a) / d; return u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * u); };

/* ---------- fruits ---------- */
const FA = ['mango', 'apple', 'guava', 'banana'], FB = ['apple', 'mango', 'grapes'];
// Venn geometry for the main pictures (right card)
const VX = [300, 484], VY = 300, VR = 150, MX = 392;
const POS = { mango: [MX, VY - 34], apple: [MX, VY + 40], guava: [214, VY - 34], banana: [214, VY + 40], grapes: [574, VY + 4] };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tU1 = T0('U1'), tI1 = T0('I1'), tJ1 = T0('J1'), tD1 = T0('D1'), tK1 = T0('K1'), tT = T0('T1'), tL1 = T0('L1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tL1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: the two lists ---------- */
const LS = [['DIYA · LIKES', 'mango, apple, guava, banana', AC], ['MEERA · LIKES', 'apple, mango, grapes', BC]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${424 + i * 552}px;border-top-color:${col}"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'two') - 0.05, wt('H1', 'two') + 0.3];

/* ---------- H: two lists, three questions ---------- */
const frRow = (who, list, cls, top, id) => `<div class="who" id="${id}w" style="left:36px;top:${top}px;color:${cls === 'A' ? AC : BC}">${who}</div><div style="position:absolute;left:36px;top:${top + 30}px;display:flex;gap:12px">${list.map((f, i) => `<div class="fr ${cls}" id="${id}${i}" style="position:relative">${f}</div>`).join('')}</div>`;
const HQ = [['Everything on either list?', '\\cup', 'union'], ['Only what both lists share?', '\\cap', 'intersection'], ['What only one list has?', '-', 'difference']];
$('#hcs').innerHTML = frRow('DIYA', FA, 'A', 80, 'hd') + frRow('MEERA', FB, 'B', 184, 'hm') +
  HQ.map(([q, s, w], i) => `<div class="qr" id="hq${i}" style="top:${300 + i * 88}px"><div class="n">${i + 1}</div><div class="q">${q}</div><div class="op">${K(s)} ${w}</div></div>`).join('');
const tHd = ['mango', 'apple', 'guava', 'banana'].map(w => wt('H4', w));
const tHm = [wt('H4', 'apple', 1), wt('H4', 'mango', 1), wt('H4', 'grapes')];
const tHq = [wt('H5', 'Buy'), wt('H5', 'both'), wt('H5', 'only')];
const tHo = [wt('H6', 'union'), wt('H6', 'intersection'), wt('H6', 'difference')];

/* ---------- U: union, live build ---------- */
$('#udS').innerHTML = K(UNI);
const UOR = [['in A', AC, '#E7EEFD'], ['in B', BC, '#DDF1F1'], ['in both', RC, HIT]];
$('#ud').insertAdjacentHTML('beforeend', UOR.map(([s, c, b], i) => `<div class="an" id="uor${i}" style="left:${36 + i * 150}px;top:186px;color:${c};background:${b}">${s}</div>`).join(''));
const tUor = [wt('U2', 15), wt('U2', 18), wt('U2', 'both')];
$('#udF').innerHTML = K(`${UNI} = ${SB(rc(`${inA}\\ ${tx('or')}\\ ${inB}`))}`);
const us = $('#uS'), uV = venn(us, { xa: VX[0], xb: VX[1], cy: VY, r: VR });
const ROWX = i => 236 + i * 128, ROWY = 112;
const uA = FA.map((f, i) => ({ f, k: tok(us, f, ROWX(i), ROWY), tIn: wt('U4', 'First') + i * 0.1, tFly: wt('U4', f) }));
const uB = FB.map((f, i) => ({ f, k: tok(us, f, ROWX(i), ROWY), tIn: T0('U5') + 0.1 + i * 0.1, tFly: f === 'grapes' ? wt('U6', 'grapes') : wt('U5', f === 'apple' ? 'Apple' : 'Mango') }));
uB.forEach(b => attr(b.k.t, 'fill', BC)); uA.forEach(a => attr(a.k.t, 'fill', AC));
const uAl = txt(us, MX, VY + 186, 'already inside: write once', { 'text-anchor': 'middle', 'font-size': 18, fill: RC, 'font-weight': 600 });
$('#uRo').innerHTML = K(`${UNI} = \\{${xc(tx('mango, apple, guava, banana, grapes'))}\\}`); $('#uRo').style.fontSize = '26px';
const tUfull = wt('U6', 'five');
const flyU = (o, t) => { const [x2, y2] = POS[o.f], u = M.io((t - o.tFly) / 0.6); o.k.move(M.lerp(o.k.x, x2, u), M.lerp(o.k.y, y2, u) - 50 * Math.sin(Math.PI * u)); return u; };

/* ---------- I: intersection test ---------- */
const TQ = [['mango', 1], ['apple', 1], ['guava', 0], ['banana', 0]];
$('#iTr').innerHTML = TQ.map(([f, y], i) => `<div class="tr" id="it${i}" style="top:${204 + i * 70}px"><div class="nm">${f}</div><div class="qq">in B too?</div><div class="chip" style="right:14px;top:9px;background:${y ? C.ok : C.red}">${M.icon(y ? 'check' : 'x', 20, '#fff', 3)}${y ? 'YES' : 'NO'}</div></div>`).join('');
$('#iRo').innerHTML = K(`${INT} = \\{${xc(tx('mango, apple'))}\\}`);
$('#iSym').textContent = 'A ∩ B';
$('#iF').innerHTML = K(`${INT} = ${SB(rc(`${inA}\\ ${tx('and')}\\ ${inB}`))}`);
const is = $('#iS'), iV = venn(is, { xa: VX[0], xb: VX[1], cy: VY, r: VR });
const iT = {}; ['mango', 'apple', 'guava', 'banana', 'grapes'].forEach(f => { iT[f] = tok(is, f, POS[f][0], POS[f][1]); });
const tIt = [wt('I4', 'Mango'), wt('I4', 'Apple'), wt('I4', 'Guava'), wt('I4', 'Banana')];
const tIa = [wt('I4', 'Yes'), wt('I4', 'Yes', 1), wt('I4', 'No'), wt('I4', 'No', 1)];

/* ---------- J: disjoint, pull apart ---------- */
const js = $('#jS'), JY = 300, JR = 140;
const jV = venn(js, { xa: 300, xb: 484, cy: JY, r: JR, la: 'O', lb: 'E' });
const jOdd = [1, 3, 5, 7].map((n, i) => tok(js, n, 0, 0, { mono: 1, fs: 30 })), jEv = [2, 4, 6, 8].map(n => tok(js, n, 0, 0, { mono: 1, fs: 30 }));
jOdd.forEach(k => attr(k.t, 'fill', AC)); jEv.forEach(k => attr(k.t, 'fill', BC));
const JOFF = [[-60, -40], [-60, 40], [-10, -90], [-10, 90]];
const jQ = txt(js, 392, JY + 10, 'empty', { 'text-anchor': 'middle', 'font-size': 20, fill: C.red, 'font-weight': 600 });
const jCap = [txt(js, 0, JY + JR + 44, 'ODD', { 'text-anchor': 'middle', 'font-size': 18, fill: AC, 'font-weight': 600, 'letter-spacing': 2 }), txt(js, 0, JY + JR + 44, 'EVEN', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600, 'letter-spacing': 2 })];
$('#jdS').innerHTML = K(`${ac('A')} \\cap ${bc('B')} = \\phi`);
$('#jdP2').innerHTML = `${K('\\{1, 2\\}')} and ${K('\\{2, 3\\}')}: not disjoint, both have 2`;
const tJ0 = wt('J2', 'Pull'), tJ1e = T1('J2');
const jSep = t => 184 + 236 * M.io((t - tJ0) / Math.max(0.8, tJ1e - tJ0));

/* ---------- D: difference ---------- */
$('#dSk').innerHTML = `<div style="position:absolute;left:36px;top:240px;display:flex;gap:12px">${FA.map((f, i) => `<div class="sk" id="dk${i}" style="position:relative">${f}<i></i></div>`).join('')}</div>`;
$('#dRo').innerHTML = K(`${DIF} = \\{${xc(tx('guava, banana'))}\\}`);
$('#dF').innerHTML = K(`${DIF} = ${SB(rc(`${inA}\\ ${tx('and')}\\ ${ninB}`))}`);
$('#dSym').textContent = 'A − B';
const ds = $('#dS'), dV = venn(ds, { xa: VX[0], xb: VX[1], cy: VY, r: VR });
const dT = {}; ['mango', 'apple', 'guava', 'banana', 'grapes'].forEach(f => { dT[f] = tok(ds, f, POS[f][0], POS[f][1]); });
const dX = ['mango', 'apple'].map(f => { const [x, y] = POS[f]; return mk(ds, 'line', { x1: x - 40, y1: y - 2, x2: x + 40, y2: y - 2, stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' }); });
const tDs = [wt('D3', 'Mango'), wt('D3', 'Apple')];

/* ---------- K: A - B vs B - A ---------- */
const KX = [290, 494], KY = 250, KR = 135;
const KP = { mango: [392, KY - 30], apple: [392, KY + 38], guava: [216, KY - 30], banana: [216, KY + 38], grapes: [570, KY + 4] };
const mkK = (sel, side) => { const s = $(sel), v = venn(s, { xa: KX[0], xb: KX[1], cy: KY, r: KR, ls: 40 }); const ts = {}; Object.keys(KP).forEach(f => { ts[f] = tok(s, f, KP[f][0], KP[f][1], { fs: 22 }); }); return { v, ts }; };
const kA = mkK('#kaS'), kB = mkK('#kbS');
$('#kaR').innerHTML = K(`${DIF} = \\{${xc(tx('guava, banana'))}\\}`);
$('#kbR').innerHTML = K(`${bc('B')} - ${ac('A')} = \\{${xc(tx('grapes'))}\\}`);
const th1 = PUC.think($('#th1'), { q: 'Is A − B the same as B − A?', opts: ['Yes, the same', 'No, different'], right: 1, why: 'A − B = {guava, banana}, but B − A = {grapes}. The order matters.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${UNI} \\qquad ${INT} \\qquad ${DIF}`);

/* ---------- L: circle A is two pieces ---------- */
const ls = $('#lS'), LY = 300, LR = 150, LXA = 300, LXB = 484;
const lp = vpaths(LXA, LXB, LY, LR);
const lGhost = mk(ls, 'circle', { cx: LXB, cy: LY, r: LR, fill: 'none', stroke: BC, 'stroke-width': 2.5, 'stroke-dasharray': '8 7', opacity: 0.55 });
const lBl = txt(ls, LXB + LR * 0.82, LY - LR * 0.78, 'B', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: BC, 'text-anchor': 'middle', opacity: 0.55 });
const lPa = mk(ls, 'g', {}), lPb = mk(ls, 'g', {});
mk(lPa, 'path', { d: lp.a, fill: ACB, stroke: AC, 'stroke-width': 3.5 }); mk(lPb, 'path', { d: lp.ab, fill: HIT, stroke: RC, 'stroke-width': 3.5 });
const lAl = txt(lPa, LXA - LR * 0.82, LY - LR * 0.78, 'A', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 44, fill: AC, 'text-anchor': 'middle' });
['guava', 'banana'].forEach(f => tok(lPa, f, POS[f][0], POS[f][1])); ['mango', 'apple'].forEach(f => tok(lPb, f, POS[f][0], POS[f][1]));
const lCa = txt(ls, 0, LY + LR + 52, 'A − B', { 'text-anchor': 'middle', 'font-size': 22, fill: AC, 'font-weight': 600 }), lCb = txt(ls, 0, LY + LR + 52, 'A ∩ B', { 'text-anchor': 'middle', 'font-size': 22, fill: RC, 'font-weight': 600 });
const LST = [[`${DIF} = \\{${xc(tx('guava, banana'))}\\}`, 'the part of A outside B'], [`${INT} = \\{${xc(tx('mango, apple'))}\\}`, 'the overlap'], [`(${DIF}) \\cup (${INT}) = ${ac('A')}`, 'join the pieces: all of A comes back']];
$('#lSt').innerHTML = `<div class="hiBox" id="lHi" style="left:20px;width:744px;height:124px"></div>` + LST.map(([f, w], i) => `<div class="st" id="lst${i}" style="top:${88 + i * 150}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tLs2 = [wt('L2', 'outside'), wt('L2', 'overlap'), wt('L3', 'Join')];
const lSplit = t => M.io((t - wt('L2', 'part') + 0.1) / 0.6) * (1 - M.io((t - tLs2[2]) / 0.7));
const th2 = PUC.think($('#th2'), { q: 'If A and B are disjoint, what is A − B?', opts: ['The empty set', 'A itself'], right: 1, why: 'There is no overlap, so nothing is removed: A − B = A.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `${K(ac('A'))} = factors of 12, ${K(bc('B'))} = factors of 18.<br>Find ${K(UNI)}, ${K(INT)}, ${K(DIF)}, ${K(`${bc('B')} - ${ac('A')}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${ac('A')} = \\{${xc('1, 2, 3, 4, 6, 12')}\\}`)],
  [K(`${bc('B')} = \\{${xc('1, 2, 3, 6, 9, 18')}\\}`)],
  [K(`${INT} = \\{${xc('1, 2, 3, 6')}\\}`)],
  [K(`${UNI} = \\{${xc('1, 2, 3, 4, 6, 9, 12, 18')}\\}`)],
  [K(`${DIF} = \\{${xc('4, 12')}\\},\\ \\ ${bc('B')} - ${ac('A')} = \\{${xc('9, 18')}\\}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '64px';
const tW = [wt('W3', 'A'), wt('W4', 'B'), wt('W5', 'common'), wt('W6', 'Join'), wt('W7', 'A')];
const ws = $('#wS'), WY = 280, wV = venn(ws, { xa: VX[0], xb: VX[1], cy: WY, r: VR });
const WP = { 4: [214, WY - 34], 12: [214, WY + 40], 1: [MX, WY - 84], 2: [MX, WY - 28], 3: [MX, WY + 28], 6: [MX, WY + 84], 9: [574, WY - 34], 18: [574, WY + 40] };
const wT = {}; Object.keys(WP).forEach(n => { wT[n] = tok(ws, n, WP[n][0], WP[n][1], { mono: 1, fs: 30, rr: 26 }); });
const W3w = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 6: 'six', 12: 'twelve' }, W4w = { 1: 'one', 2: 'two', 3: 'three', 6: 'six', 9: 'nine', 18: 'eighteen' };
const tWin = n => W3w[n] ? wt('W3', W3w[n]) : wt('W4', W4w[n]);
const tWb = n => W4w[n] ? wt('W4', W4w[n]) : null;
$('#wP').innerHTML = `${K(xc('6'))} = highest common factor of 12 and 18`;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\{5, 7\\} - \\{2, 3\\} = \\{3, 4\\}`) + '&nbsp; subtracted the numbers', right: K(`\\{5, 7\\} - \\{2, 3\\} = \\{5, 7\\}`) + '&nbsp; nothing shared, nothing removed' });
const ts = $('#tS');
const tV = venn(ts, { xa: 170, xb: 390, cy: 150, r: 84, ls: 32 });
const tTk = [[5, 140, 125], [7, 140, 180], [2, 420, 125], [3, 420, 180]].map(([n, x, y]) => { const k = tok(ts, n, x, y, { mono: 1, fs: 28, rr: 22 }); attr(k.t, 'fill', n > 4 ? AC : BC); return k; });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Two sets given: find the union, intersection or difference, often with number rules.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `${K(`${ac('A')} = \\{\\, n \\in \\mathbb{N} : n \\le 100,\\ n \\text{ a multiple of } 3 \\,\\}`)}<br>${K(`${bc('B')} = \\{\\, n \\in \\mathbb{N} : n \\le 100,\\ n \\text{ a multiple of } 5 \\,\\}`)}<br>How many elements are in ${K(DIF)}?`,
  opts: ['33', '27', '20', '6'], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`${ac('A')}: 3, 6, \\dots, 99 \\Rightarrow 33`)], ['remove what is also in B'], [K(`${INT}: \\text{multiples of } 15`)], [K(`15, 30, \\dots, 90 \\Rightarrow 6`)], [K(`33 - 6 = 27`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'multiples'), wt('A3', 'remove'), wt('A3', 'fifteen'), wt('A4', 'Fifteen'), wt('A4', 'leaves')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · union, intersection, difference', y0: 98, dy: 78, txt: [0, 0, 0, 1, 1],
  lines: [K(`${UNI} = ${SB(rc(`${inA}\\ ${tx('or')}\\ ${inB}`))}`),
    K(`${INT} = ${SB(rc(`${inA}\\ ${tx('and')}\\ ${inB}`))}`),
    K(`${DIF} = ${SB(rc(`${inA}\\ ${tx('and')}\\ ${ninB}`))}`),
    `<b>Disjoint</b>: ${K(`${INT} = \\phi`)}, no element shared`,
    `${K(`${DIF} \\ne ${bc('B')} - ${ac('A')}`)} · each element written once`] });
const YQ = ['What is the union of {1, 2} and {2, 3}?', 'When are two sets called disjoint?', 'If A = {1, 2, 3} and B = {3, 4}, what is B − A?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 09', topic: 'Everyone who did NOT ride a bicycle? Complement of a Set', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('U5') - 0.2, 1.06, 1300, 560], [T0('U7'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tU1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('U1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hdw'), t, tMorph + 0.3, 1e9, { dy: 10 }); M.vis($('#hmw'), t, tMorph + 0.4, 1e9, { dy: 10 });
    FA.forEach((_, i) => { const el = $('#hd' + i); M.vis(el, t, tMorph + 0.35 + i * 0.07, 1e9, POP); el.style.background = mix('#FFFFFF', '#E7EEFD', pulse(t, tHd[i] - 0.1, 0.8)); });
    FB.forEach((_, i) => { const el = $('#hm' + i); M.vis(el, t, tMorph + 0.5 + i * 0.07, 1e9, POP); el.style.background = mix('#FFFFFF', '#DDF1F1', pulse(t, tHm[i] - 0.1, 0.8)); });
    HQ.forEach((_, i) => {
      const r = $('#hq' + i); M.vis(r, t, tMorph + 0.5 + i * 0.15, 1e9, { dx: -16, dy: 0 });
      const hi = M.io((t - tHq[i] + 0.1) / 0.3) * (1 - M.io((t - (tHq[i + 1] ?? T0('H6')) + 0.1) / 0.3));
      r.style.background = mix(C.soft, C.ac2, hi);
      M.vis(r.querySelector('.op'), t, tHo[i] - 0.1, 1e9, POP);
    });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tHq[0] - 0.1, 1e9, POP);
  }

  /* U: union */
  const uOn = t >= tU1 - 0.1 && t < tI1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('I1');
    M.vis($('#ud'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#udT'), t, T0('U2') + 0.05, { st: 0.05, sp: M.HEAVY });
    UOR.forEach((_, i) => M.vis($('#uor' + i), t, tUor[i] - 0.1, 1e9, POP));
    PUC.write($('#udS'), t, wt('U3', 'symbol') - 0.1, 0.6); M.vis($('#udL'), t, wt('U3', 'read') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis($('#udF0'), t, T0('U7'), 1e9, { dy: 10 }); PUC.write($('#udF'), t, wt('U7', 'set', 1) - 0.1, 1.2);
    M.vis($('#uv'), t, wt('U1', 'Meera') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(uV.cA, t, wt('U1', 'A') - 0.1, 0.7); M.draw(uV.cB, t, wt('U1', 'B') - 0.1, 0.7);
    M.vis(uV.lA, t, wt('U1', 'A'), 1e9, POP); M.vis(uV.lB, t, wt('U1', 'B'), 1e9, POP);
    const fromB = t >= T0('U5'); const fr = $('#uFrom'); M.setT(fr, fromB ? 'FROM B' : 'FROM A'); fr.style.color = fromB ? BC : AC;
    M.vis(fr, t, wt('U4', 'First') - 0.1, 1e9, { dy: 0, fade: 0.15 }); fr.style.top = '72px';
    let n = 0;
    uA.forEach(a => { M.vis(a.k.g, t, a.tIn, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); const u = flyU(a, t); if (u >= 1) n++;
      attr(a.k.t, 'fill', mix(AC, XC, M.io((t - a.tFly - 0.5) / 0.3)));
      const p = uB.find(b => b.f === a.f); attr(a.k.ring, 'opacity', p ? pulse(t, p.tFly + 0.45, 0.7).toFixed(3) : 0); });
    uB.forEach(b => { const merge = b.f !== 'grapes'; const u = flyU(b, t);
      M.vis(b.k.g, t, b.tIn, merge ? b.tFly + 0.5 : 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, outDur: 0.2, ody: 0, osc: 0.6 });
      if (!merge) { if (u >= 1) n++; attr(b.k.t, 'fill', mix(BC, XC, M.io((t - b.tFly - 0.5) / 0.3))); } });
    M.vis(uAl, t, uB[0].tFly + 0.4, T0('U6'), { dy: 0 });
    M.vis($('#uCnt'), t, wt('U4', 'First'), 1e9, POP); M.setT($('#uCnt'), `n(A ∪ B) = ${n}`);
    const fu = M.io((t - tUfull + 0.1) / 0.4); ['a', 'ab', 'b'].forEach(k => uV.fill(k, mix('#FFFFFF', HIT, fu)));
    PUC.write($('#uRo'), t, tUfull, 0.9);
  }

  /* I: intersection */
  const iOn = t >= tI1 - 0.1 && t < tJ1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('J1');
    M.vis($('#id'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#idT'), t, T0('I2') + 0.05, { st: 0.05, sp: M.HEAVY });
    TQ.forEach(([f, y], i) => { const r = $('#it' + i); M.vis(r, t, T0('I3') + 0.3 + i * 0.12, 1e9, { dx: -16, dy: 0 }); M.vis(r.querySelector('.chip'), t, tIa[i] - 0.05, 1e9, POP);
      const on = M.io((t - tIt[i] + 0.1) / 0.25) * (1 - M.io((t - (tIt[i + 1] ?? T0('I5')) + 0.1) / 0.25)); r.style.background = mix(C.soft, C.ac2, on); });
    PUC.write($('#iRo'), t, wt('I5', 'mango') - 0.1, 0.8);
    M.vis($('#iv'), t, T0('I2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#iSym'), t, wt('I2', 'symbol') - 0.1, 1e9, POP);
    TQ.forEach(([f, y], i) => { const k = iT[f], test = pulse(t, tIt[i] - 0.05, 0.9); attr(k.ring, 'opacity', test.toFixed(3));
      const ans = M.io((t - tIa[i]) / 0.3); attr(k.t, 'fill', y ? XC : mix(XC, C.dim, ans)); });
    attr(iT.grapes.t, 'fill', mix(XC, C.dim, M.io((t - T0('I3')) / 0.4)));
    const lens = M.io((t - tIa[0]) / 0.3) * 0.5 + M.io((t - tIa[1]) / 0.3) * 0.5; iV.fill('ab', mix('#FFFFFF', HIT, lens));
    PUC.write($('#iF'), t, wt('I6', 'set', 1) - 0.1, 1.2);
  }

  /* J: disjoint */
  const jOn = t >= tJ1 - 0.1 && t < tD1 + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const out = OUT('D1');
    M.vis($('#jv'), t, tJ1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const d = jSep(t), xa = 392 - d / 2, xb = 392 + d / 2; jV.set(xa, xb);
    M.draw(jV.cA, t, wt('J1', 'odd') - 0.1, 0.6); M.draw(jV.cB, t, wt('J1', 'even') - 0.1, 0.6);
    M.vis(jV.lA, t, wt('J1', 'odd'), 1e9, POP); M.vis(jV.lB, t, wt('J1', 'even'), 1e9, POP);
    jOdd.forEach((k, i) => { k.move(xa + JOFF[i][0], JY + JOFF[i][1]); M.vis(k.g, t, wt('J1', 'odd') + 0.2 + i * 0.08, 1e9, POP); });
    jEv.forEach((k, i) => { k.move(xb - JOFF[i][0], JY + JOFF[i][1]); M.vis(k.g, t, wt('J1', 'even') + 0.2 + i * 0.08, 1e9, POP); });
    attr(jCap[0], 'x', xa.toFixed(1)); attr(jCap[1], 'x', xb.toFixed(1)); M.vis(jCap[0], t, wt('J1', 'odd') + 0.3, 1e9, { dy: 0 }); M.vis(jCap[1], t, wt('J1', 'even') + 0.3, 1e9, { dy: 0 });
    jV.fill('ab', C.redBg); M.vis(jQ, t, wt('J1', 'nothing') - 0.1, tJ0 + 0.3, { dy: 0, outDur: 0.2, ody: 0 });
    M.vis($('#jCnt'), t, wt('J2', 'empty') - 0.2, 1e9, POP); M.setT($('#jCnt'), 'O ∩ E = φ');
    M.vis($('#jd'), t, wt('J2', 'No') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.rise($('#jdT'), t, wt('J2', 'No'), { st: 0.05, sp: M.HEAVY });
    PUC.write($('#jdS'), t, wt('J3', 'empty') - 0.1, 0.6);
    M.vis($('#jdP1'), t, wt('J3', 'disjoint') - 0.1, 1e9, POP); M.vis($('#jdP2'), t, wt('J3', 'disjoint') + 0.5, 1e9, POP);
  }

  /* D: difference */
  const dOn = t >= tD1 - 0.1 && t < tK1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('K1');
    M.vis($('#dd'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#ddT'), t, T0('D2') + 0.05, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dW'), t, T0('D3') - 0.05, 1e9, { dy: 10 });
    FA.forEach((f, i) => { const el = $('#dk' + i); M.vis(el, t, T0('D3') + 0.2 + i * 0.1, 1e9, POP);
      const s = i < 2 ? M.io((t - tDs[i]) / 0.3) : 0; el.querySelector('i').style.transform = `scaleX(${s.toFixed(3)})`;
      if (i < 2) { const f2 = M.io((t - T0('D4')) / 0.4); el.style.opacity = (1 - 0.6 * f2).toFixed(3); el.style.borderColor = mix(AC, C.red, s); el.style.color = mix(AC, C.red, s); } });
    PUC.write($('#dRo'), t, wt('D4', 'Guava') - 0.1, 0.8);
    M.vis($('#dF0'), t, T0('D5'), 1e9, { dy: 10 }); PUC.write($('#dF'), t, wt('D5', 'set', 1) - 0.1, 1.2);
    M.vis($('#dv'), t, T0('D2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#dSym'), t, wt('D2', 'minus') - 0.1, 1e9, POP);
    ['mango', 'apple'].forEach((f, i) => { const s = M.io((t - tDs[i]) / 0.3); attr(dT[f].t, 'fill', mix(XC, C.red, s)); M.draw(dX[i], t, tDs[i], 0.3); attr(dX[i], 'opacity', (1 - 0.6 * M.io((t - T0('D4')) / 0.4)).toFixed(3)); attr(dT[f].t, 'opacity', (1 - 0.6 * M.io((t - T0('D4')) / 0.4)).toFixed(3)); });
    attr(dT.grapes.t, 'fill', C.dim);
    const fa = M.io((t - wt('D4', 'Guava') + 0.1) / 0.4); dV.fill('a', mix('#FFFFFF', HIT, fa));
  }

  /* K: side by side + pause and think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kA.v.fill('a', mix('#FFFFFF', HIT, M.io((t - wt('K1', 'only') + 0.1) / 0.4)));
    ['mango', 'apple', 'grapes'].forEach(f => attr(kA.ts[f].t, 'fill', C.dim));
    PUC.write($('#kaR'), t, wt('K1', 'Guava') - 0.1, 0.8);
    M.vis($('#kb'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    kB.v.fill('b', mix('#FFFFFF', HIT, M.io((t - wt('K2', 'only') + 0.1) / 0.4)));
    ['mango', 'apple', 'guava', 'banana'].forEach(f => attr(kB.ts[f].t, 'fill', C.dim));
    PUC.write($('#kbR'), t, wt('K2', 'grapes') - 0.1, 0.6);
    M.vis($('#th1'), t, T0('K3') + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: T0('K3'), tOpts: wt('K3', 'same') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'order') });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tL1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tL1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Or') - 0.05, { st: 0.12, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Minus') + 0.3, 0.8);
  }

  /* L: circle A = two pieces */
  const lOn = t >= tL1 - 0.1 && t < tW1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('L4');
    M.vis($('#lv'), t, tL1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const sp = lSplit(t); attr(lPa, 'transform', `translate(${(-48 * sp).toFixed(1)},0)`); attr(lPb, 'transform', `translate(${(56 * sp).toFixed(1)},0)`);
    attr(lCa, 'x', (240 - 48 * sp).toFixed(1)); attr(lCb, 'x', (392 + 56 * sp).toFixed(1));
    M.vis(lCa, t, tLs2[0], tLs2[2], { dy: 0 }); M.vis(lCb, t, tLs2[1], tLs2[2], { dy: 0 });
    M.vis($('#lp'), t, T0('L2') - 0.1, out, { dx: 60, dy: 0, ...o });
    LST.forEach((_, i) => { const el = $('#lst' + i); M.vis(el.querySelector('.n'), t, tLs2[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tLs2[i], 0.8); M.vis(el.querySelector('.why'), t, tLs2[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(88, [[tLs2[1] - 0.1, 238], [tLs2[2] - 0.1, 388]], M.SOFT)(t);
    const hb = $('#lHi'); M.vis(hb, t, tLs2[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#th2'), t, T0('L4') + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: T0('L4'), tOpts: wt('L4', 'what') - 0.1, tCount: T1('L4') + 0.05, dur: 3, tAns: T0('L5') - 0.02, tWhy: wt('L5', 'overlap') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wV.cA, t, T0('W2') + 0.6, 0.7); M.draw(wV.cB, t, wt('W2', 'B') , 0.7); M.vis(wV.lA, t, T0('W2') + 0.8, 1e9, POP); M.vis(wV.lB, t, wt('W2', 'B') + 0.2, 1e9, POP);
    Object.keys(WP).forEach(n => { const k = wT[n]; M.vis(k.g, t, tWin(n) - 0.05, 1e9, POP); const b = tWb(n); attr(k.ring, 'opacity', (b && W3w[n] ? pulse(t, b - 0.05, 0.6) : n === '6' ? M.io((t - wt('W8', 'six') + 0.1) / 0.3) : 0).toFixed(3)); });
    const f5 = M.io((t - tW[2] + 0.1) / 0.4), f6 = M.io((t - tW[3]) / 0.4), f7 = M.io((t - tW[4]) / 0.4);
    wV.fill('ab', mix('#FFFFFF', HIT, f5 * (1 - f7 * 0.6)));
    wV.fill('a', f7 > 0 ? mix(mix('#FFFFFF', HIT, f6), ACB, f7) : mix('#FFFFFF', HIT, f6)); wV.fill('b', f7 > 0 ? mix(mix('#FFFFFF', HIT, f6), BCB, f7) : mix('#FFFFFF', HIT, f6));
    M.vis($('#wP'), t, wt('W8', 'highest') - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('Z1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'never') - 0.1, tRight: wt('X3', 'share') + 0.2 });
    M.draw(tV.cA, t, T0('X2') + 0.1, 0.6); M.draw(tV.cB, t, wt('X2', 'B') , 0.6); M.vis(tV.lA, t, T0('X2') + 0.3, 1e9, POP); M.vis(tV.lB, t, wt('X2', 'B') + 0.2, 1e9, POP);
    tTk.forEach((k, i) => M.vis(k.g, t, (i < 2 ? T0('X2') + 0.3 : wt('X2', 'B') + 0.2) + (i % 2) * 0.12, 1e9, POP));
    where(t, { tin: T0('Z1'), tLight: [wt('Z1', 'JEE'), wt('Z1', 'PUC')], tType: wt('Z1', 'direct') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
