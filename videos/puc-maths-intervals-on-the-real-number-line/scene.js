// PUC Maths Ep 07: Intervals on the real number line (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bible): the point x violet, the interval (the rule) coral, out / wrong red, in green
const XC = C.violet, RC = C.ac, AC = '#2F6FEB';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`;
// number line helper: ticks + labels; returns X()
const line = (svg, y, a, b, x0, x1, step, lab = 1) => {
  const X = v => x0 + (v - a) * (x1 - x0) / (b - a), g = mk(svg, 'g', {});
  mk(g, 'line', { x1: x0 - 24, y1: y, x2: x1 + 24, y2: y, stroke: C.ink, 'stroke-width': 3 });
  mk(g, 'path', { d: `M${x1 + 34},${y} l-14,-8 v16 z`, fill: C.ink }); mk(g, 'path', { d: `M${x0 - 34},${y} l14,-8 v16 z`, fill: C.ink });
  for (let v = a; v <= b + 1e-9; v += step) { mk(g, 'line', { x1: X(v), y1: y - 9, x2: X(v), y2: y + 9, stroke: C.ink, 'stroke-width': 2 }); if (lab) txt(g, X(v), y + 40, +v.toFixed(2), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
  return { X, g };
};
const seg = (svg, x1, x2, y) => mk(svg, 'line', { x1, y1: y, x2, y2: y, stroke: RC, 'stroke-width': 10, 'stroke-linecap': 'butt' });
const end = (svg, x, y, filled) => mk(svg, 'circle', { cx: x, cy: y, r: 12, fill: filled ? RC : '#fff', stroke: RC, 'stroke-width': 4 });

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tI1 = T0('I1'), tO1 = T0('O1'), tL1 = T0('L1'), tK1 = T0('K1'), tG1 = T0('G1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- H: the sign on a line ---------- */
const hs = $('#hS'), HL = line(hs, 300, 0, 60, 100, 684, 10);
const hSeg = seg(hs, HL.X(20), HL.X(40), 300);
const hQ = [20, 40].map(v => txt(hs, HL.X(v), 250, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 44, 'font-weight': 700, fill: C.red }));
const hDotP = mk(hs, 'g', {}), hDot = mk(hDotP, 'g', {}); mk(hDot, 'circle', { r: 14, fill: XC }); const hDl = txt(hDot, 0, 70, 'Aarav: 40', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 }); attr(hDl, 'y', 76);
const hU = txt(hs, 392, 400, 'speed in km/h', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });

/* ---------- I: definition + zoom ---------- */
$('#iS').innerHTML = K(`(a, b) \\subset \\mathbb{R}`);
const is = $('#iSv'), IL = line(is, 140, 20, 40, 80, 704, 5), IZ = line(is, 380, 31, 32, 80, 704, 0.25);
const iSeg = seg(is, IL.X(20), IL.X(40), 140), iSegZ = seg(is, IZ.X(31), IZ.X(32), 380);
const iPts = [[20.5, '20.5'], [31.2, '31.2']].map(([v, l]) => { const g = mk(is, 'g', {}); mk(g, 'circle', { cx: IL.X(v), cy: 140, r: 10, fill: XC }); txt(g, IL.X(v), 112, l, { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 }); return g; });
const iZoom = mk(is, 'path', { d: `M${IL.X(31)},152 L80,366 M${IL.X(32)},152 L704,366`, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rng = M.rng(7), iZd = []; for (let k = 0; k < 60; k++) { const v = 31 + rng(); iZd.push(mk(is, 'circle', { cx: IZ.X(v), cy: 380, r: 6, fill: XC })); }
const iZl = [[31.1, '31.1'], [31.25, '31.25'], [31.5, '31.5'], [31.75, '31.75'], [31.9, '31.9']].map(([v, l], k) => { const g = mk(is, 'g', {}); mk(g, 'circle', { cx: IZ.X(v), cy: 380, r: 9, fill: XC }); txt(g, IZ.X(v), 352 - (k % 2) * 0, l, { 'text-anchor': 'middle', 'font-size': 16, fill: XC, 'font-weight': 600 }); return g; });
const iCnt = txt(is, 392, 470, '', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });

/* ---------- O: four kinds ---------- */
const OS = [[`(a, b) = \\{${xc('x')} : ${rc(`a < ${xc('x')} < b`)}\\}`, 'open: both ends left out', 0, 0], [`[a, b] = \\{${xc('x')} : ${rc(`a \\le ${xc('x')} \\le b`)}\\}`, 'closed: both ends kept', 1, 1],
  [`[a, b) = \\{${xc('x')} : ${rc(`a \\le ${xc('x')} < b`)}\\}`, 'half open: a in, b out', 1, 0], [`(a, b] = \\{${xc('x')} : ${rc(`a < ${xc('x')} \\le b`)}\\}`, 'half open: b in, a out', 0, 1]];
$('#oSt').innerHTML = OS.map(([f, w], i) => `<div class="st" id="os${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tOs = [wt('O1', 'open'), wt('O3', 'closed'), wt('O5', 'Square'), wt('O5', 'Round', 1)];
const os = $('#oS'), OXa = 200, OXb = 600;
const oRows = OS.map(([f, w, l, r], i) => { const y = 120 + i * 120, g = mk(os, 'g', {}); mk(g, 'line', { x1: 80, y1: y, x2: 720, y2: y, stroke: C.ink, 'stroke-width': 3 }); const s = seg(g, OXa, OXb, y); const e1 = end(g, OXa, y, l), e2 = end(g, OXb, y, r); txt(g, OXa, y + 40, 'a', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); txt(g, OXb, y + 40, 'b', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); return { g, s, e1, e2 }; });

/* ---------- L: point running to 40 ---------- */
const las = $('#laS'), LA = line(las, 330, 20, 40, 100, 684, 5);
seg(las, LA.X(20), LA.X(40), 330); end(las, LA.X(20), 330, 1); const laE = end(las, LA.X(40), 330, 1);
const laPt = mk(las, 'circle', { cx: 0, cy: 330, r: 14, fill: XC });
const lbs = $('#lbS'), LBx0 = 100, LBx1 = 684, LBy = 330;
mk(lbs, 'line', { x1: LBx0 - 24, y1: LBy, x2: LBx1 + 24, y2: LBy, stroke: C.ink, 'stroke-width': 3 });
const lbSeg = seg(lbs, LBx0 - 20, LBx1, LBy);
const lbTk = [0, 1, 2, 3, 4].map(k => mk(lbs, 'line', { x1: LBx0 + k * (LBx1 - LBx0) / 4, y1: LBy - 9, x2: LBx0 + k * (LBx1 - LBx0) / 4, y2: LBy + 9, stroke: C.ink, 'stroke-width': 2 }));
const lbL = txt(lbs, LBx0, LBy + 40, '', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }), lbR = txt(lbs, LBx1, LBy + 40, '40', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const lbE = end(lbs, LBx1, LBy, 0), lbPt = mk(lbs, 'circle', { cx: 0, cy: LBy, r: 14, fill: XC });
const lbW = txt(lbs, 392, 420, '', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const tLa0 = T0('L2') + 0.3, tLa1 = wt('L2', 'reaches') + 0.2;
const tB0 = T0('L3'), tB1 = wt('L3', 'Thirty'), sKeys = [[tB1, 1], [wt('L3', 'Thirty', 1), 2], [wt('L3', 'Still'), 3], [T1('L4'), 4.2]];
const sAt = t => { if (t < tB1) return -0.301; let s = -0.301, prev = tB1 - 0.8; for (const [tt, v] of sKeys) { const u = M.io((t - prev) / Math.max(0.3, tt - prev)); if (t < tt) return s + (v - s) * u; s = v; prev = tt; } return s; };
const th1 = PUC.think($('#th1'), { q: `Is ${K('2')} in the interval ${K('(2, 5]')}?`, opts: ['Yes, 2 is in', 'No, 2 is out'], right: 1, why: 'The round bracket at 2 leaves 2 out. 5 is in: square bracket.' });

/* ---------- G: length + infinity ---------- */
$('#gF').innerHTML = K(`\\text{length} = b - a`);
const gs = $('#gS'), GL1 = line(gs, 300, 0, 7, 100, 684, 1), GL2 = line(gs, 450, 0, 7, 100, 684, 1);
const gI = [[GL1, 300, 0], [GL2, 450, 1]].map(([L, y, f]) => { const g = mk(gs, 'g', {}); seg(g, L.X(2), L.X(5), y); end(g, L.X(2), y, f); end(g, L.X(5), y, f); const b = mk(g, 'path', { d: `M${L.X(2)},${y - 30} v-12 H${L.X(5)} v12`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); txt(g, (L.X(2) + L.X(5)) / 2, y - 52, f ? '[2, 5]: length 3' : '(2, 5): length 3', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 }); return g; });
$('#zF').innerHTML = K(`[0, \\infty) = \\{${xc('x')} : ${rc(`${xc('x')} \\ge 0`)}\\}`);
const zs = $('#zS'), ZL = line(zs, 330, -2, 6, 100, 620, 1);
const zSeg = mk(zs, 'line', { x1: ZL.X(0), y1: 330, x2: 700, y2: 330, stroke: RC, 'stroke-width': 10 });
const zHd = mk(zs, 'path', { d: `M736,330 l-26,-15 v30 z`, fill: RC });
const zE = end(zs, ZL.X(0), 330, 1);
const zInf = txt(zs, 700, 290, 'on to ∞', { 'text-anchor': 'middle', 'font-size': 20, fill: RC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`(a, b) \\qquad [a, b] \\qquad [a, b) \\qquad (a, b]`);

/* ---------- W ---------- */
$('#wq').innerHTML = `Write as an interval: ${K(`\\{${xc('x')} \\in \\mathbb{R} : ${rc(`-5 < ${xc('x')} \\le 7`)}\\}`)}`;
const wsol = PUC.solution($('#wl'), [[K(`-5 < ${xc('x')}:\\ -5\\ \\text{left out}\\ \\Rightarrow\\ (`)], [K(`${xc('x')} \\le 7:\\ 7\\ \\text{included}\\ \\Rightarrow\\ ]`)], [K(`\\{${xc('x')} : -5 < ${xc('x')} \\le 7\\} = (-5, 7]`)], [K(`\\text{length} = 7 - (-5) = 12`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 92 });
$('#wl .lbl').style.top = '30px';
const ws = $('#wS'), WL = line(ws, 320, -6, 8, 90, 694, 1, 0);
[-6, -4, -2, 0, 2, 4, 6, 8].forEach(v => txt(ws, WL.X(v), 360, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }));
const wSeg = seg(ws, WL.X(-5), WL.X(7), 320), wE1 = end(ws, WL.X(-5), 320, 0), wE2 = end(ws, WL.X(7), 320, 1);
const wL1 = txt(ws, WL.X(-5), 280, '-5 out', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600 }), wL2 = txt(ws, WL.X(7), 280, '7 in', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const wBr = mk(ws, 'path', { d: `M${WL.X(-5)},230 v-12 H${WL.X(7)} v12`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 });
const wBl = txt(ws, (WL.X(-5) + WL.X(7)) / 2, 200, '7 - (-5) = 12', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const tWs = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'length')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`[2, 5] = \\{2, 3, 4, 5\\}`), right: K(`[2, 5]\\ \\text{holds } 2.5,\\ \\pi,\\ \\dots\\ \\text{infinitely many}`) });
const ts = $('#tS'), TL = line(ts, 150, 2, 5, 90, 470, 1);
const tInt = [2, 3, 4, 5].map(v => mk(ts, 'circle', { cx: TL.X(v), cy: 150, r: 11, fill: C.red }));
const tSeg = seg(ts, TL.X(2), TL.X(5), 150), tE1 = end(ts, TL.X(2), 150, 1), tE2 = end(ts, TL.X(5), 150, 1);
const tPi = txt(ts, TL.X(Math.PI), 118, 'π', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, fill: C.ok, 'font-weight': 700 }), t25 = txt(ts, TL.X(2.5), 118, '2.5', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Write sets as intervals; an open or closed end decides the answer.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`I = \\left(-\\sqrt{7},\\ \\sqrt{20}\\,\\right]`)}<br>How many integers lie in I?`,
  opts: ['6', '7', '8', '9'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`2 < \\sqrt{7} < 3:\\ -\\sqrt{7} \\approx -2.6`)], [K(`-3 \\notin I,\\ \\ -2 \\in I`)], [K(`4 < \\sqrt{20} < 5:\\ 4 \\in I,\\ 5 \\notin I`)], [K(`-2, -1, 0, 1, 2, 3, 4`)], [K(`7\\ \\text{integers}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Root'), wt('A2', 'Minus'), wt('A3', 'Root'), wt('A4', 'integers'), wt('A4', 'Seven')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · intervals', y0: 88, dy: 80, txt: [1, 0, 0, 0, 0],
  lines: ['<b>Round</b> bracket: end left out · <b>square</b>: end kept',
    K(`(a, b) = \\{${xc('x')} : ${rc(`a < ${xc('x')} < b`)}\\}`),
    K(`[a, b] = \\{${xc('x')} : ${rc(`a \\le ${xc('x')} \\le b`)}\\}`),
    K(`\\text{length of } (a, b),\\ [a, b],\\ [a, b),\\ (a, b] = b - a`),
    K(`[0, \\infty):\\ \\infty\\ \\text{always gets a round bracket}`)] });
const YQ = [`Write ${K(`\\{x : 3 \\le x < 8\\}`)} as an interval.`, `What is the length of ${K('[-2, 6)')}?`, 'Why does infinity always get a round bracket?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 08', topic: 'Two fruit lists: all of them, both, only hers', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('L3', 'Thirty', 1) - 0.3, 1.05, 960, 560], [wt('L4', 'largest'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  M.vis($('#sign'), t, wt('H1', 'speed') - 0.1, tMorph - 0.15, { dy: 24, outDur: 0.25, ody: 10 });

  /* H */
  const hOn = t >= tMorph && t < tI1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('I1');
    M.vis($('#hl'), t, tMorph + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis(HL.g, t, tMorph + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(hU, t, tMorph + 0.3, 1e9, { dy: 0 });
    M.draw(hSeg, t, tMorph + 0.4, 0.6);
    const u = M.io((t - wt('H2', 'riding')) / 1.0); attr(hDotP, 'transform', `translate(${M.lerp(HL.X(8), HL.X(40), u).toFixed(1)},300)`); M.vis(hDot, t, wt('H2', 'Aarav') - 0.1, 1e9, POP);
    M.setT(hDl, `Aarav: ${Math.round(M.lerp(8, 40, u))}`);
    hQ.forEach((q, i) => M.vis(q, t, wt('H4', 'ends') - 0.1 + i * 0.15, 1e9, POP));
    M.vis($('#hP'), t, wt('H4', 'Are') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, 1e9, POP);
  }

  /* I */
  const iOn = t >= tI1 - 0.1 && t < tO1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('O1');
    M.vis($('#il'), t, tI1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#dfT'), t, tI1 + 0.2, { st: 0.05, sp: M.HEAVY });
    M.vis($('#iP1'), t, wt('I2', 'every') - 0.1, 1e9, POP); PUC.write($('#iS'), t, wt('I3', 'subset') - 0.1, 0.6);
    M.vis($('#ir'), t, wt('I1', 'number') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(IL.g, t, wt('I1', 'number'), 1e9, { dy: 0, fade: 0.2 }); M.draw(iSeg, t, wt('I1', 'ends'), 0.6);
    M.vis(iPts[0], t, wt('I2', 'Twenty') - 0.1, 1e9, POP); M.vis(iPts[1], t, wt('I2', 'thirty') - 0.1, 1e9, POP);
    const z0 = wt('I2', 'all') - 0.2; M.draw(iZoom, t, z0, 0.5); M.vis(IZ.g, t, z0 + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.draw(iSegZ, t, z0 + 0.4, 0.5);
    iZl.forEach((g, k) => M.vis(g, t, z0 + 0.6 + k * 0.18, 1e9, POP));
    let n = 0; iZd.forEach((d, k) => { const tt = z0 + 1.6 + k * 0.08; M.vis(d, t, tt, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); if (t >= tt) n++; });
    M.setT(iCnt, n ? `points shown: ${n + 5} · and still more between them` : ''); M.vis(iCnt, t, z0 + 1.6, 1e9, { dy: 0 });
    M.vis($('#iP2'), t, wt('I3', 'infinite') - 0.1, 1e9, POP);
  }

  /* O */
  const oOn = t >= tO1 - 0.1 && t < tL1 + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    const out = OUT('L1');
    M.vis($('#ol'), t, tO1 + 0.1, out, { dx: -60, dy: 0, ...o });
    OS.forEach((_, i) => { const el = $('#os' + i); M.vis(el.querySelector('.n'), t, tOs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tOs[i], 0.9); M.vis(el.querySelector('.why'), t, tOs[i] + 0.8, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, tOs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 120]), M.SOFT)(t);
    const hb = $('#oHi'); M.vis(hb, t, tOs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#or'), t, tO1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const tEnds = [wt('O2', 'hollow'), wt('O4', 'filled'), tOs[2] + 0.6, tOs[3] + 0.6];
    oRows.forEach((r, i) => { M.vis(r.g, t, tOs[i] - 0.1, 1e9, { dy: 10 }); M.draw(r.s, t, tOs[i] + 0.1, 0.6); M.vis(r.e1, t, tEnds[i] - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(r.e2, t, tEnds[i], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
  }

  /* L: run to 40 + think */
  const lOn = t >= tL1 - 0.1 && t < tG1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#la'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ua = M.io((t - tLa0) / Math.max(0.5, tLa1 - tLa0)), xa = M.lerp(25, 40, ua);
    attr(laPt, 'cx', LA.X(xa).toFixed(1)); M.vis(laPt, t, tLa0 - 0.2, 1e9, POP);
    $('#laR').innerHTML = `<i class="x" style="font-family:Poppins">x</i> = ${xa.toFixed(1)}`; M.vis($('#laR'), t, tLa0 - 0.2, 1e9, { dy: 10 });
    $('#laV').innerHTML = M.icon('check', 26, '#fff', 3) + 'IN'; $('#laV').style.background = C.ok; M.vis($('#laV'), t, tLa0, 1e9, POP);
    const pa = M.io((t - tLa1) / 0.25) * (1 - M.io((t - tLa1 - 0.8) / 0.4)); attr(laE, 'r', (12 + 6 * pa).toFixed(1));
    M.vis($('#laP'), t, wt('L2', 'is') - 0.1, 1e9, POP);
    M.vis($('#lb'), t, tB0 - 0.1, out, { dx: 60, dy: 0, ...o });
    const s = sAt(t), w = 10 * Math.pow(10, -s), xr = t < tB1 - 0.8 ? M.lerp(25, 38, M.io((t - tB0 - 0.3) / Math.max(0.5, tB1 - 0.8 - tB0 - 0.3))) : 40 - Math.pow(10, -s);
    const left = t < tB1 - 0.8 ? 20 : 40 - w, X = v => LBx0 + (v - left) * (LBx1 - LBx0) / (40 - left);
    attr(lbPt, 'cx', X(xr).toFixed(1)); M.vis(lbPt, t, tB0 + 0.2, 1e9, POP);
    const dg = Math.max(1, Math.ceil(s - 1e-6)); M.setT(lbL, (+left.toFixed(Math.max(1, dg))).toString());
    $('#lbR').innerHTML = `<i class="x" style="font-family:Poppins">x</i> = ${xr.toFixed(Math.min(4, dg))}`; M.vis($('#lbR'), t, tB0 + 0.2, 1e9, { dy: 10 });
    $('#lbV').innerHTML = M.icon('check', 26, '#fff', 3) + 'IN'; $('#lbV').style.background = C.ok; M.vis($('#lbV'), t, tB0 + 0.4, 1e9, POP);
    M.setT(lbW, t < tB1 - 0.8 ? '' : `zoom: the window is now ${+w.toPrecision(2)} wide`); M.vis(lbW, t, tB1 - 0.6, 1e9, { dy: 0 });
    const pb = M.io((t - wt('L4', 'forty') + 0.1) / 0.25); attr(lbE, 'stroke', mix(RC, C.red, pb)); attr(lbE, 'r', (12 + 4 * pb).toFixed(1));
    M.vis($('#lbP'), t, wt('L4', 'forty') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK1 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'interval') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'round') });
  }

  /* G: length + infinity */
  const gOn = t >= tG1 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('T1');
    M.vis($('#gl'), t, tG1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#gF'), t, wt('G1', 'length') - 0.1, 0.7); M.vis($('#gW'), t, wt('G2', 'Leaving') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis(GL1.g, t, T0('G2') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(gI[0], t, wt('G2', 'open') - 0.1, 1e9, { dy: 10 });
    M.vis(GL2.g, t, wt('G2', 'closed') - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(gI[1], t, wt('G2', 'closed') - 0.1, 1e9, { dy: 10 });
    M.vis($('#gr'), t, T0('Z1') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#zF'), t, wt('Z1', 'Zero') - 0.1, 0.9); M.vis($('#zW'), t, wt('Z1', 'non') - 0.1, 1e9, { dx: -12, dy: 0 });
    M.vis(ZL.g, t, T0('Z1') + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(zE, t, wt('Z1', 'Zero'), 1e9, POP);
    M.draw(zSeg, t, wt('Z1', 'infinity') - 0.1, 0.8); M.vis(zHd, t, wt('Z1', 'infinity') + 0.6, 1e9, { dy: 0 }); M.vis(zInf, t, wt('Z1', 'infinity') + 0.6, 1e9, { dy: 0 });
    M.vis($('#zP'), t, wt('Z2', 'round') - 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'round') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'square') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(WL.g, t, T0('W2') + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wE1, t, tWs[0] + 0.4, 1e9, POP); M.vis(wL1, t, tWs[0] + 0.6, 1e9, { dy: 0 });
    M.vis(wE2, t, tWs[1] + 0.4, 1e9, POP); M.vis(wL2, t, tWs[1] + 0.6, 1e9, { dy: 0 });
    M.draw(wSeg, t, tWs[2], 0.8);
    M.draw(wBr, t, tWs[3], 0.6); M.vis(wBl, t, tWs[3] + 0.4, 1e9, { dy: 0 }); M.vis($('#wRes'), t, wt('W6', 'twelve') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'every') - 0.1, tRight: wt('X3', 'That') - 0.2 });
    M.vis(TL.g, t, wt('X2', 'Many'), 1e9, { dy: 0, fade: 0.2 });
    tInt.forEach((d, i) => M.vis(d, t, wt('X2', 'two', 1) + i * 0.2, wt('X3', 'every') + 0.6, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08, outDur: 0.3, ody: 0 }));
    M.draw(tSeg, t, wt('X3', 'every'), 0.7); M.vis(tE1, t, wt('X3', 'every') + 0.1, 1e9, POP); M.vis(tE2, t, wt('X3', 'every') + 0.6, 1e9, POP);
    M.vis(t25, t, wt('X3', 'two') - 0.1, 1e9, { dy: 0 }); M.vis(tPi, t, wt('X3', 'pi') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'write') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
