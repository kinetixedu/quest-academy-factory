// PUC Maths Ep 86: Mean deviation (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 13): data values x_i violet, mean x-bar blue, median M teal, gaps |x_i - centre| orange, mean deviation coral, signed minus red, plus green
const XC = C.violet, MC = '#2F6FEB', MDc = C.teal, GC = C.orange, DC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const Xv = s => `\\textcolor{${XC}}{${s}}`, Mn = s => `\\textcolor{${MC}}{${s}}`, Md = s => `\\textcolor{${MDc}}{${s}}`, G = s => `\\textcolor{${GC}}{${s}}`, D = s => `\\textcolor{${DC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const xi = Xv('x_i'), xb = Mn('\\bar{x}');
const MDF = `${D('\\text{M.D.}')}(${xb}) = \\dfrac{\\sum ${G(`|${xi} - ${xb}|`)}}{n}`;
// number line: returns X(v)
const NL = (svg, y, lo, hi, step, lab = step) => { const x0 = 56, x1 = 728, X = v => x0 + (x1 - x0) * (v - lo) / (hi - lo);
  mk(svg, 'line', { x1: x0 - 8, y1: y, x2: x1 + 8, y2: y, stroke: C.ink, 'stroke-width': 3 });
  for (let v = lo; v <= hi + 1e-9; v += step) { mk(svg, 'line', { x1: X(v), y1: y - 8, x2: X(v), y2: y + 8, stroke: C.ink, 'stroke-width': 2 }); if (Math.abs((v - lo) % lab) < 1e-9) txt(svg, X(v), y + 32, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
  return X; };
const mkDot = (svg, x, y, col = XC, r = 10) => { const g = mk(mk(svg, 'g', {}), 'g', {}); mk(g, 'circle', { cx: x, cy: y, r, fill: col }); return g; };
const cLine = (svg, x, y1, y2, col, lab) => { const g = mk(svg, 'g', {}); mk(g, 'line', { x1: x, y1, x2: x, y2, stroke: col, 'stroke-width': 3, 'stroke-dasharray': '7 6' }); txt(g, x, y1 - 10, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 }); return g; };
// a row per value: value label, gap segment to the centre, gap label
const gapRows = (svg, X, vals, c, y0, dy) => vals.map((v, i) => { const y = y0 + i * dy, g = mk(svg, 'g', {});
  txt(g, 36, y + 7, v, { 'font-size': 20, fill: XC, 'font-weight': 600 });
  const gap = Math.abs(v - c), a = Math.min(X(v), X(c)), b = Math.max(X(v), X(c));
  const sg = gap ? mk(g, 'line', { x1: X(v), y1: y, x2: X(c), y2: y, stroke: GC, 'stroke-width': 7, 'stroke-linecap': 'round' }) : mk(g, 'circle', { cx: X(c), cy: y, r: 5, fill: GC });
  const lb = txt(g, b + 14, y + 7, +gap.toFixed(2), { 'font-size': 20, fill: GC, 'font-weight': 600 });
  return { g, sg, lb, gap }; });

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tL1 = T0('L1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['CLASS A · AVERAGE', '50 marks'], ['CLASS B · AVERAGE', '50 marks'], ['CLASS B · MARKS', '10 to 90']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'Both'), wt('H1', 'fifty'), wt('H2', 'ten')];

/* ---------- data ---------- */
const A = [48, 49, 50, 51, 52], B = [10, 30, 50, 70, 90];

/* ---------- H ---------- */
const hg = $('#hG');
const hXa = NL(hg, 190, 0, 100, 10, 20), hXb = NL(hg, 370, 0, 100, 10, 20);
txt(hg, 36, 130, 'CLASS A', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 }); txt(hg, 36, 310, 'CLASS B', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'letter-spacing': 2 });
const hDa = A.map(v => mkDot(hg, hXa(v), 190)), hDb = B.map(v => mkDot(hg, hXb(v), 370));
const hMa = cLine(hg, hXa(50), 150, 214, MC, 'average 50'), hMb = cLine(hg, hXb(50), 330, 394, MC, 'average 50');

/* ---------- L ---------- */
const mkLive = (svg, vals) => { const X = NL(svg, 150, 0, 100, 10, 20); const dots = vals.map(v => mkDot(svg, X(v), 150)); const ml = cLine(svg, X(50), 104, 390, MC, 'x̄ = 50'); const rows = gapRows(svg, X, vals, 50, 226, 36); return { X, dots, ml, rows }; };
const la = mkLive($('#aG'), A), lb = mkLive($('#bG'), B);
const tAd = [wt('L1', 'forty'), wt('L1', 'forty', 1), wt('L1', 'fifty'), wt('L1', 'fifty', 1), wt('L1', 'fifty', 2)];
const tAg = [wt('L2', 'Two'), wt('L2', 'one'), wt('L2', 'zero'), wt('L2', 'one', 1), wt('L2', 'two', 1)];
const tBd = [wt('L4', 'ten'), wt('L4', 'thirty'), wt('L4', 'fifty'), wt('L4', 'seventy'), wt('L4', 'ninety')];
const tBg = [wt('L4', 'forty'), wt('L4', 'twenty'), wt('L4', 'zero'), wt('L4', 'twenty', 1), wt('L4', 'forty', 1)];

/* ---------- D ---------- */
const DSx = [`${xb} = \\dfrac{\\sum ${xi}}{n}`, `\\text{deviation} = ${xi} - ${xb}`, `${red(`\\sum (${xi} - ${xb}) = 0`)}`, `${G(`|${xi} - ${xb}|`)} = \\text{distance} \\ge 0`, MDF];
const DW = ['the centre: add all, divide by how many', '', 'pluses and minuses cancel', '', ''];
const DY = [84, 216, 296, 376, 452], DH = [116, 72, 72, 72, 116];
$('#dSt').innerHTML = DSx.map((f, i) => `<div class="st${i === 0 || i === 4 ? ' tall' : ''}" id="ds${i}" style="top:${DY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div>${DW[i] ? `<div class="why" style="top:${i === 0 ? 92 : 50}px;left:${i === 2 ? 400 : 66}px">${DW[i]}</div>` : ''}</div>`).join('');
$('#ds2 .why').style.top = '12px';
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5'), T0('D6')];
const dg = $('#dG'), dX = NL(dg, 130, 0, 100, 10, 20); B.forEach(v => mkDot(dg, dX(v), 130)); const dMl = cLine(dg, dX(50), 96, 330, MC, '');
const dRows = B.map((v, i) => { const y = 190 + i * 32, s = v - 50; const ar = PUC.arrow(dg, s < 0 ? C.red : C.ok); if (s) ar.set(dX(50), y, dX(v), y); const ab = mk(dg, 'line', { x1: dX(50), y1: y, x2: dX(v), y2: y, stroke: GC, 'stroke-width': 7, 'stroke-linecap': 'round' });
  const z = s ? null : mk(dg, 'circle', { cx: dX(50), cy: y, r: 5, fill: GC }); const lab = txt(dg, s < 0 ? dX(v) - 12 : s > 0 ? dX(v) + 12 : dX(50) + 14, y + 7, (s > 0 ? '+' : '') + s, { 'text-anchor': s < 0 ? 'end' : 'start', 'font-size': 20, fill: s < 0 ? C.red : s > 0 ? C.ok : C.mute, 'font-weight': 600 }); return { ar, ab, z, lab, s }; });
$('#dMed').innerHTML = K(`${D('\\text{M.D.}')}(${Md('M')}) = \\tfrac{1}{n}\\sum ${G(`|${xi} - ${Md('M')}|`)}\\quad ${Md('M')} = \\text{median}`);
const tAb = wt('D5', 'ignore');

/* ---------- C ---------- */
const CV = [2, 4, 6, 8, 30];
const mkCmp = (svg, c, col, lab) => { const X = NL(svg, 140, 0, 32, 2, 4); const dots = CV.map(v => mkDot(svg, X(v), 140)); CV.forEach(v => txt(svg, X(v), 116, v, { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 }));
  const cl = cLine(svg, X(c), 96, 400, col, ''); const cL = txt(svg, X(c) + 10, 410, lab, { 'font-size': 20, fill: col, 'font-weight': 600 }); const rows = gapRows(svg, X, CV, c, 220, 36); return { dots, cl, cL, rows }; };
const c1 = mkCmp($('#c1S'), 10, MC, 'mean 10'), c2 = mkCmp($('#c2S'), 6, MDc, 'median 6');
$('#c1F').innerHTML = K(`\\tfrac{8 + 6 + 4 + 2 + 20}{5} = ${D('8')}`);
$('#c2F').innerHTML = K(`\\tfrac{4 + 2 + 0 + 2 + 24}{5} = ${D('6.4')}`);
const th1 = PUC.think($('#th1'), { q: 'One far value, 30. Which centre does it pull more?', opts: ['The mean', 'The median'], right: 0, why: '30 drags the mean up to 10. The median looks only at the middle value, so it stays at 6.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(MDF);

/* ---------- W ---------- */
const WV = [6, 7, 10, 12, 13, 4, 8, 12];
$('#wq').innerHTML = `Find the mean deviation about the mean:<br>${K(Xv('6,\\ 7,\\ 10,\\ 12,\\ 13,\\ 4,\\ 8,\\ 12'))}`;
const wsol = PUC.solution($('#wl'), [
  [K(`${xb} = \\tfrac{72}{8} = ${Mn('9')}`)],
  [K(`${G(`|${xi} - 9|`)}:\\ ${G('3, 2, 1, 3, 4, 5, 1, 3')}`)],
  [K(`\\sum ${G(`|${xi} - 9|`)} = 22`)],
  [K(`${D('\\text{M.D.}')} = \\tfrac{22}{8} = ${D('2.75')}`)],
  ['on average, 2.75 away from 9']], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const wg = $('#wG'), wX = NL(wg, 150, 0, 15, 1, 3);
const wDots = WV.map((v, i) => mkDot(wg, wX(v), i === 7 ? 124 : 150));
const wMl = cLine(wg, wX(9), 104, 470, MC, 'x̄ = 9');
const wRows = gapRows(wg, wX, WV, 9, 200, 34);
const tW4 = wt('W4', 'Three'), tW4e = T1('W4') - 0.3, tWr = i => tW4 + i * (tW4e - tW4) / 7;

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\sum (${xi} - ${xb}) = 0 \\;\\Rightarrow\\; ${red('\\text{M.D.} = 0')}`), right: K(`\\tfrac{1}{8}\\sum ${G(`|${xi} - ${xb}|`)} = \\tfrac{22}{8} = ${D('2.75')}`), y0: 70, y1: 168 });
$('#tR').innerHTML = `<div class="lbl" style="position:static">WITH SIGNS, GAPS CANCEL</div><div class="k" id="tR1">${K(`${red('-3 - 2')} + 1 + 3 + 4 ${red('- 5 - 1')} + 3 = 0`)}</div><div class="k" id="tR2">${K(`\\text{distances: } ${G('3 + 2 + 1 + 3 + 4 + 5 + 1 + 3')} = 22`)}</div>`;
$('#tR').style.top = '40px'; $('#tR').style.left = '940px'; $('#tR').style.width = '640px';
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Given a mean and variance (or median), find the mean deviation.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `Each of ${K('2, 4, 6, 8, 10')} is multiplied by 3, then 5 is added. Find the new mean deviation about the mean.`,
  opts: ['2.4', '7.2', '12.2', '21.6'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\bar{x} = 6,\\ \\text{gaps } 4, 2, 0, 2, 4`)], [K(`\\text{M.D.} = \\tfrac{12}{5} = 2.4`)], ['+ 5: gaps do not change'], ['× 3: every gap × 3'], [K(`3 \\times 2.4 = 7.2`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'First'), wt('A2', 'So'), wt('A3', 'Adding'), wt('A4', 'Multiplying'), wt('A4', 'which')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 230, w: 1200, h: 550, title: 'Recap · mean deviation', y0: 100, dy: 90, txt: [0, 0, 0, 0, 1],
  lines: [K(`${D('\\text{M.D.}')}(${xb}) = \\tfrac{1}{n}\\sum ${G(`|${xi} - ${xb}|`)}`), K(`${D('\\text{M.D.}')}(${Md('M')}) = \\tfrac{1}{n}\\sum ${G(`|${xi} - ${Md('M')}|`)}`),
    K(`\\sum (${xi} - ${xb}) = 0 \\;\\Rightarrow\\; \\text{use the bars}`), K(`y = a x + b:\\ \\ \\text{M.D.}_y = |a|\\,\\text{M.D.}_x`),
    '<b>Same average</b>, very different spread'] });
const YQ = ['Why do we take the absolute value of each deviation?', 'Find the mean deviation about the mean of 1, 3 and 5.', 'What does a mean deviation of zero tell you?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 87', topic: 'Which batsman is more consistent? Variance and Standard Deviation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('L5') - 0.3, 1.04, 960, 560], [T1('L5'), 1, 960, 540]]);
const total = (rows, ts, t) => rows.reduce((a, r, i) => a + (t >= ts[i] ? r.gap : 0), 0);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tL1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('L1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hg, t, tMorph + 0.2, 1e9, { dy: 0, fade: 0.3 });
    hDa.forEach((g, i) => M.vis(g, t, tMorph + 0.4 + i * 0.08, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    hDb.forEach((g, i) => M.vis(g, t, tMorph + 0.9 + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(hMa, t, tMorph + 1.6, 1e9, { dy: 0 }); M.vis(hMb, t, tMorph + 1.7, 1e9, { dy: 0 });
    M.vis($('#hP'), t, wt('H4', 'Same') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'How') - 0.1, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    la.dots.forEach((g, i) => M.vis(g, t, tAd[i] - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(la.ml, t, T0('L2') - 0.1, 1e9, { dy: 0 });
    la.rows.forEach((r, i) => M.vis(r.g, t, tAg[i] - 0.1, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#aT'), t, tAg[0] - 0.1, 1e9, { dy: 8 }); M.setT($('#aTv'), String(total(la.rows, tAg, t)));
    M.vis($('#aM'), t, wt('L3', 'Six') - 0.1, 1e9, { dy: 8 });
    M.vis($('#lb'), t, T0('L4') - 0.1, out, { dx: 60, dy: 0, ...o });
    lb.dots.forEach((g, i) => M.vis(g, t, tBd[i] - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(lb.ml, t, tBd[0] + 0.2, 1e9, { dy: 0 });
    lb.rows.forEach((r, i) => M.vis(r.g, t, tBg[i] - 0.1, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#bT'), t, tBg[0] - 0.1, 1e9, { dy: 8 }); M.setT($('#bTv'), String(total(lb.rows, tBg, t)));
    M.vis($('#bM'), t, wt('L5', 'over') - 0.1, 1e9, { dy: 8 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DSx.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); const w = el.querySelector('.why'); if (w) M.vis(w, t, tDs[i] + 0.9, 1e9, { dx: -12, dy: 0 }); });
    const k = tDs.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, 0), hb = $('#dHi');
    M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (M.track(DY[0], tDs.slice(1).map((tt, i) => [tt - 0.05, DY[i + 1]]), M.SOFT)(t) - 8).toFixed(1) + 'px'; hb.style.height = DH[k] + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const ab = M.io((t - tAb) / 0.5);
    dRows.forEach((r, i) => { const t0 = wt('D3', 'deviation') + i * 0.15; if (r.s) { M.vis(r.ar.g, t, t0, tAb + 0.25, { dy: 0, fade: 0.1, outDur: 0.25, ody: 0 }); M.vis(r.ab, t, tAb, 1e9, { dy: 0, fade: 0.25 }); } else { M.vis(r.z, t, t0, 1e9, { dy: 0 }); }
      M.vis(r.lab, t, t0 + 0.1, 1e9, { dy: 0 }); M.setT(r.lab, t < tAb ? (r.s > 0 ? '+' : '') + r.s : String(Math.abs(r.s))); attr(r.lab, 'fill', t < tAb ? (r.s < 0 ? C.red : r.s > 0 ? C.ok : C.mute) : GC); });
    M.vis($('#dS'), t, wt('D4', 'Add') - 0.1, 1e9, { dy: 8 });
    M.setT($('#dSl'), t < tAb ? 'SUM WITH SIGNS' : 'SUM OF DISTANCES'); M.setT($('#dSv'), t < tAb ? '0' : '120'); $('#dSv').style.color = t < tAb ? C.red : GC;
    M.vis($('#dM'), t, wt('D6', 'divide') - 0.1, 1e9, { dy: 8 });
    PUC.write($('#dMed'), t, wt('D7', 'median') - 0.1, 1.1);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    [[c1, $('#c1'), T0('C1'), wt('C1', 'mean'), wt('C1', 'Measured'), $('#c1F'), wt('C1', 'eight')], [c2, $('#c2'), T0('C2'), wt('C2', 'median'), wt('C2', 'Measured'), $('#c2F'), wt('C2', 'six')]].forEach(([c, card, t0, tc, tg, f, tf], j) => {
      M.vis(card, t, t0 + (j ? -0.1 : 0.1), out, { dx: j ? 60 : -60, dy: 0, ...o });
      c.dots.forEach((g, i) => M.vis(g, t, t0 + 0.3 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
      M.vis(c.cl, t, tc - 0.1, 1e9, { dy: 0 }); M.vis(c.cL, t, tc, 1e9, { dy: 0 });
      c.rows.forEach((r, i) => M.vis(r.g, t, tg + i * 0.2, 1e9, { dx: -12, dy: 0 }));
      PUC.write(f, t, tf - 0.6, 0.8);
    });
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'Which') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'Thirty') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Mean') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'distance') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    wDots.forEach((g, i) => M.vis(g, t, T0('W2') + 0.8 + i * 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.vis(wMl, t, wt('W3', 'mean') - 0.1, 1e9, { dy: 0 });
    wRows.forEach((r, i) => M.vis(r.g, t, tWr(i) - 0.1, 1e9, { dx: -12, dy: 0 }));
    M.vis($('#wT'), t, tW4 - 0.2, 1e9, { dy: 8 }); M.setT($('#wTv'), String(wRows.reduce((a, r, i) => a + (t >= tWr(i) ? r.gap : 0), 0)));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'forget') - 0.1, tStrike: wt('X3', 'false') - 0.1, tRight: wt('X3', 'answer') - 0.1 });
    M.vis($('#tR'), t, wt('X2', 'signs') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'Every') - 0.1, 1e9, { dy: 8 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'gave') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
