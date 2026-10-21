// PUC Maths Ep 38: The imaginary unit i (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: real numbers / real part blue, imaginary part coral (accent), i violet, modulus teal.
const RE = '#2F6FEB', REB = '#E7EEFD', IM = C.violet, IMB = '#EFE9FC', RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const ic = s => `\\textcolor{${IM}}{${s}}`, rb = s => `\\textcolor{${RE}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const I = ic('i');
// value of i^n as KaTeX, colour-coded: +-1 blue (real), +-i violet
const PV = [rb('1'), I, rb('-1'), ic('-i')];
const pv = n => PV[((n % 4) + 4) % 4];
const seg = (v0, ks) => t => { let v = v0; for (const [a, b, to] of ks) { const u = M.io((t - a) / Math.max(0.01, b - a)); if (u <= 0) break; v = v + (to - v) * u; } return v; };
const hiMove = (el, t, ts, y0, dy, h) => { const y = M.track(y0, ts.slice(1).map((tt, i) => [tt - 0.1, y0 + (i + 1) * dy]), M.SOFT)(t); M.vis(el, t, ts[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); el.style.top = (y - h).toFixed(1) + 'px'; };
const steps = (host, rows, y0, dy) => { host.innerHTML = rows.map(([f, w], i) => `<div class="st" style="top:${y0 + i * dy}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join(''); return [...host.querySelectorAll('.st')]; };
const runSteps = (els, t, ts) => els.forEach((el, i) => { M.vis(el.querySelector('.n'), t, ts[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, ts[i], 0.7); const w = el.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tP1 = T0('P1'), tD1 = T0('D1'), tL1 = T0('L1'), tR1 = T0('R1'), tR5 = T0('R5'), tT = T0('T1'), tS1 = T0('S1'), tS5 = T0('S5');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tS1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE QUESTION', `${I}^{103} = \\ ?`], ['THE LONG WAY · 103 TIMES', `${I} \\times ${I} \\times ${I} \\times \\cdots \\times ${I}`]];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${500 + i * 480}px"><div class="ln">${n}</div><div class="lv">${K(v)}</div></div>`).join('');
const tLs = [wt('H1', 'What'), wt('H1', 'times')];

/* ---------- H: the notebook ---------- */
$('#hrs').innerHTML = [1, 2, 3, 4, 5, 6].map((n, k) => `<div class="nb" id="hb${k}" style="top:${84 + k * 68}px"><div class="k">${K(`${I}^{${n}}`)}</div><div class="v">${K(`= ${pv(n)}`)}</div></div>`).join('');
const hB = $('#hBr'); hB.style.top = (84 + 4 * 68 + 4) + 'px'; hB.style.height = (68 + 56 - 8) + 'px'; $('#hBrT').style.top = (84 + 4 * 68 + 44) + 'px';
const tHb = [wt('H3', 'one') + 0.1, wt('H4', 'minus'), wt('H4', 'minus', 1), wt('H4', 'one'), wt('H4', 'Then'), wt('H4', 'minus', 2)];

/* ---------- P: definition ---------- */
$('#pA').innerHTML = K(`${I} = \\sqrt{-1}`); $('#pB').innerHTML = K(`${I}^2 = -1`);

/* ---------- D: build the powers ---------- */
const DS = [[`${I}^1 = ${I}`, 'just i'], [`${I}^2 = ${rb('-1')}`, 'the definition'], [`${I}^3 = ${I}^2 \\cdot ${I} = ${ic('-i')}`, 'minus one times i'], [`${I}^4 = ${I}^2 \\cdot ${I}^2 = ${rb('1')}`, 'minus one times minus one'], [`${I}^5 = ${I}^4 \\cdot ${I} = ${I}`, 'one times i: back at the start']];
const dEl = steps($('#dSt'), DS, 84, 94);
const tDs = ['D2', 'D3', 'D4', 'D5', 'D6'].map(id => wt(id, 2));
$('#dCh').innerHTML = [1, 2, 3, 4, 5].map((n, k) => `<div class="cp" id="dp${k}" style="top:${96 + k * 94}px">${K(`${I}^{${n}}`)}</div><div class="cn" id="dc${k}" style="top:${84 + k * 94}px">${K(pv(n))}</div>` + (k < 4 ? `<div class="cx" id="dx${k}" style="left:560px;top:${144 + k * 94}px">× i</div>` : '')).join('');

/* ---------- L: quarter turns ---------- */
const ls = $('#lS'), LO = [392, 340], LR = 186;
const lP = (a, r = LR) => [LO[0] + r * Math.cos(a), LO[1] - r * Math.sin(a)];
const lAx = mk(mk(ls, 'g', {}), 'g', {});
mk(lAx, 'circle', { cx: LO[0], cy: LO[1], r: LR, fill: 'none', stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk(lAx, 'line', { x1: 96, y1: LO[1], x2: 688, y2: LO[1], stroke: RE, 'stroke-width': 3 });
mk(lAx, 'line', { x1: LO[0], y1: 128, x2: LO[0], y2: 552, stroke: IM, 'stroke-width': 3 });
const LL = [[0, '1', RE, 26, -14], [Math.PI / 2, 'i', IM, 26, -16], [Math.PI, '-1', RE, -34, -14], [3 * Math.PI / 2, '-i', IM, 26, 30]];
const lPts = LL.map(([a, s, col, dx, dy]) => { const [x, y] = lP(a); const g = mk(mk(ls, 'g', { transform: `translate(${x.toFixed(1)},${y.toFixed(1)})` }), 'g', {}); mk(g, 'circle', { r: 10, fill: '#fff', stroke: col, 'stroke-width': 4 }); txt(g, dx, dy, s, { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 700, fill: col, 'text-anchor': 'middle', 'font-style': s.includes('i') ? 'italic' : 'normal' }); return g; });
const lArc = mk(ls, 'path', { fill: 'none', stroke: IM, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.55 });
const lArm = mk(ls, 'line', { x1: LO[0], y1: LO[1], stroke: C.ink, 'stroke-width': 4 });
const lDot = mk(ls, 'circle', { r: 16, fill: RC, stroke: '#fff', 'stroke-width': 4 });
mk(ls, 'circle', { cx: LO[0], cy: LO[1], r: 6, fill: C.ink });
const lTurn = txt(ls, 748, 92, 'each × i = a quarter turn, anticlockwise', { 'font-size': 20, fill: IM, 'font-weight': 600, 'text-anchor': 'end' });
const arcD = (a1) => { const a = Math.min(a1, 2 * Math.PI - 0.001); if (a <= 0.001) return ''; let d = ''; for (let k = 0; k <= 60; k++) { const [x, y] = lP(a * k / 60, LR); d += (k ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const tL4 = [wt('L4', 'quarter'), wt('L4', 'Another'), wt('L4', 'Then'), wt('L4', 'home')];
const tL5 = wt('L5', 'That');
const nK = seg(0, [[tL4[0], tL4[0] + 0.6, 1], [tL4[1], tL4[1] + 0.6, 2], [tL4[2], tL4[2] + 0.6, 3], [tL4[3], tL4[3] + 0.6, 4], [tL5, tL5 + 0.55, 5], [tL5 + 0.6, tL5 + 1.15, 6], [tL5 + 1.2, tL5 + 1.75, 7], [tL5 + 1.8, tL5 + 2.35, 8]]);
$('#lN').innerHTML = `<i style="font-family:Poppins" class="a">n</i> = <span id="lNv"></span>`;
$('#lT').innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map((n, k) => `<div class="tc" id="lt${k}" style="left:${36 + (k % 4) * 176}px;top:${290 + Math.floor(k / 4) * 134}px"><div class="tn">${K(`${I}^{${n}}`)}</div><div class="tv">${K(pv(n))}</div></div>`).join('');
let lLast = -1;

/* ---------- R: remainder rule ---------- */
$('#rR').innerHTML = [0, 1, 2, 3].map(r => `<div class="rr" id="rr${r}" style="top:${84 + r * 100}px"><div class="k">REMAINDER ${r}</div><div class="v">${K(`\\to\\ ${pv(r)}`)}</div></div>`).join('');
const tRr = [wt('R2', 'zero'), wt('R2', 'one', 1), wt('R2', 'two'), wt('R2', 'three')];
$('#rF0').innerHTML = K(`103 = 4 \\times 25 + ${C.ac ? `\\textcolor{${RC}}{3}` : '3'}`);
$('#rF1').innerHTML = K(`${I}^{103} = (${I}^4)^{25} \\cdot ${I}^{\\textcolor{${RC}}{3}}`);
$('#rF2').innerHTML = K(`= 1 \\cdot (${ic('-i')}) = ${ic('-i')}`);
$('#rF3').innerHTML = K(`${I}^{-1} = \\dfrac{1}{${I}} = ${ic('-i')}`);
$('#rF3').style.top = '392px';
const th1 = PUC.think($('#th1'), { q: `Is ${K(`${I}^{22}`)} equal to 1, or to -1?`, opts: ['1', '-1'], right: 1, why: `${K(`22 = 4 \\times 5 + 2`)}: remainder 2, so ${K(`${I}^{22} = -1`)}.` });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${I}^{4k} = 1,\\quad ${I}^{4k+1} = ${I},\\quad ${I}^{4k+2} = -1,\\quad ${I}^{4k+3} = -${I}`);

/* ---------- S: square roots of negatives ---------- */
$('#slF0').innerHTML = K(`(${I})^2 = -1`); $('#slF1').innerHTML = K(`(-${I})^2 = (-1)^2 \\cdot ${I}^2 = -1`);
const ss = $('#slS');
const sI = [[200, 330, 'i'], [200, 440, '-i']].map(([x, y, s]) => { const g = mk(mk(ss, 'g', { transform: `translate(${x},${y})` }), 'g', {}); mk(g, 'circle', { r: 36, fill: IMB, stroke: IM, 'stroke-width': 3 }); txt(g, 0, 11, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 700, 'font-size': 32, fill: IM, 'text-anchor': 'middle' }); return g; });
const sT = mk(mk(ss, 'g', { transform: 'translate(560,385)' }), 'g', {}); mk(sT, 'circle', { r: 40, fill: REB, stroke: RE, 'stroke-width': 3 }); txt(sT, 0, 11, '-1', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: RE, 'text-anchor': 'middle' });
const sA = [[244, 322, 512, 372], [244, 448, 512, 398]].map(([x1, y1, x2, y2]) => { const a = PUC.arrow(ss, C.ink2, 3.5, 14); return { a, x1, y1, x2, y2 }; });
const sAT = txt(ss, 378, 386, 'square', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
$('#srF0').innerHTML = K(`\\sqrt{-1} = ${I} \\quad \\text{only}`); $('#srF1').innerHTML = K(`\\sqrt{4} = 2, \\ \\text{not } -2`);
$('#srF2').innerHTML = K(`\\sqrt{-a} = \\sqrt{a}\\, ${I}`); $('#srF3').innerHTML = K(`\\sqrt{-9} = \\sqrt{9}\\, ${I} = 3${I}`);
const th2 = PUC.think($('#th2'), { q: `${K(`\\sqrt{-16}`)} : is it 4i, or -4i?`, opts: ['4i', '-4i'], right: 0, why: `The root symbol picks one root: ${K(`\\sqrt{-16} = \\sqrt{16}\\, ${I} = 4${I}`)}.` });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Find ${K(`${I}^{10} + ${I}^{11} + ${I}^{12} + ${I}^{13}`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`10 = 4 \\cdot 2 + 2 \\;\\Rightarrow\\; ${I}^{10} = ${rb('-1')}`)],
  [K(`11 = 4 \\cdot 2 + 3 \\;\\Rightarrow\\; ${I}^{11} = ${ic('-i')}`)],
  [K(`${I}^{12} = ${rb('1')}, \\quad ${I}^{13} = ${I}`)],
  [K(`${rb('-1')} ${ic('-\\,i')} + ${rb('1')} + ${I} = 0`)],
  ['Any four powers in a row add to 0']], { label: 'WORKED EXAMPLE', y0: 170, dy: 80 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Ten'), wt('W4', 'Eleven'), wt('W5', 'Twelve'), wt('W6', 'Add'), wt('W7', 'Any')];
const ws = $('#wS'), WO = [470, 200], WU = 150;
const wAx = mk(mk(ws, 'g', {}), 'g', {});
mk(wAx, 'line', { x1: 120, y1: WO[1], x2: 720, y2: WO[1], stroke: RE, 'stroke-width': 2, opacity: 0.45 });
mk(wAx, 'line', { x1: WO[0], y1: 80, x2: WO[0], y2: 470, stroke: IM, 'stroke-width': 2, opacity: 0.45 });
const WV = [[[0, 0], [-1, 0], RE, 'i¹⁰ = -1', [-0.5, -0.22]], [[-1, 0], [-1, -1], IM, 'i¹¹ = -i', [-1.62, -0.5]], [[-1, -1], [0, -1], RE, 'i¹² = 1', [-0.5, -1.3]], [[0, -1], [0, 0], IM, 'i¹³ = i', [0.12, -0.5]]];
const wP = ([x, y]) => [WO[0] + x * WU, WO[1] - y * WU];
const wArr = WV.map(([a, b, col, lab, lp]) => { const ar = PUC.arrow(ws, col, 6, 18); const [lx, ly] = wP(lp); const l = txt(ws, lx, ly + 7, lab, { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 700, fill: col, 'text-anchor': lp[0] < -1 ? 'start' : 'middle' }); return { ar, a, b, l }; });
const wO = mk(ws, 'circle', { cx: WO[0], cy: WO[1], r: 18, fill: 'none', stroke: RC, 'stroke-width': 4 });
const wOT = txt(ws, WO[0] + 28, WO[1] - 22, 'start = end', { 'font-size': 20, fill: RC, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\sqrt{-4} \\times \\sqrt{-9} = \\sqrt{36} = 6`), right: K(`\\sqrt{-4} \\times \\sqrt{-9} = 2${I} \\times 3${I} = 6${I}^2 = -6`) });
const ts = $('#tS');
const tQ0 = txt(ts, 40, 112, '√a × √b = √(ab)', { 'font-family': 'Poppins', 'font-size': 30, 'font-weight': 600, fill: C.ink });
const tQ1 = txt(ts, 40, 160, 'breaks when a and b', { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: C.red });
const tQ2 = txt(ts, 40, 196, 'are both negative', { 'font-family': 'Poppins', 'font-size': 24, 'font-weight': 600, fill: C.red });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Simplify a power of i, or find n so that a power of i equals 1.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`\\displaystyle\\sum_{n=1}^{2026} ${I}^{\\,n} = \\ ?`)}`,
  opts: [K('0'), K(I), K(`-1 + ${I}`), K('-1')], right: 2, optW: 474, optY: 300 });
$('#mq .mq').style.top = '84px';
const so = PUC.solution($('#so'), [[K(`${I} + ${I}^2 + ${I}^3 + ${I}^4 = 0`)], [K(`2026 = 4 \\times 506 + 2`)], [K(`n = 1 \\dots 2024: \\text{ sum } 0`)], [K(`${I}^{2025} + ${I}^{2026} = ${I} - 1`)], [K(`= -1 + ${I}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Any'), wt('A3', 'Two'), wt('A3', 'full'), wt('A4', 'Two'), wt('A4', 'sum')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · the imaginary unit i', y0: 98, dy: 80, txt: [0, 0, 1, 0, 1],
  lines: [K(`${I} = \\sqrt{-1}, \\qquad ${I}^2 = -1`),
    '<span style="font-size:.82em">' + K(`${I}^{4k} = 1,\\ \\ ${I}^{4k+1} = ${I},\\ \\ ${I}^{4k+2} = -1,\\ \\ ${I}^{4k+3} = -${I}`) + '</span>',
    '<b>Shortcut</b>: divide the power by 4, keep the remainder',
    K(`\\sqrt{-a} = \\sqrt{a}\\, ${I} \\quad (a > 0)`),
    '<b>Trap</b>: √a × √b ≠ √(ab) when a and b are both negative'] });
const YQ = ['What is i<sup>50</sup>?', 'Why is √-4 × √-9 not equal to 6?', 'What is i<sup>-2</sup>?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 39', topic: 'Which street, which floor? Real and Imaginary Parts', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    tHb.forEach((tt, k) => { const el = $('#hb' + k); M.vis(el, t, tt - 0.1, 1e9, { dx: -16, dy: 0 }); const r = M.io((t - wt('H4', 'After')) / 0.3); el.style.background = (k === 0 || k === 1 || k === 4 || k === 5) ? mix(C.soft, C.ac2, r) : C.soft; });
    M.vis(hB, t, wt('H4', 'After'), 1e9, { dx: -10, dy: 0 }); M.vis($('#hBrT'), t, wt('H4', 'repeat') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, T0('H5') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pA'), t, wt('P2', 'symbols'), 0.8); PUC.write($('#pB'), t, wt('P2', 'so'), 0.8);
    M.vis($('#pP'), t, wt('P2', 'called'), 1e9, POP);
    M.vis($('#pr'), t, T0('P3') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pr0'), t, T0('P3'), 1e9, { dy: 16 }); M.vis($('#pr1'), t, wt('P3', 'symbol') - 0.1, 1e9, { dy: 16 });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    runSteps(dEl, t, tDs); hiMove($('#dHi'), t, tDs, 84, 94, 6);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    [0, 1, 2, 3, 4].forEach(k => { M.vis($('#dc' + k), t, tDs[k] + 0.2, 1e9, { ...POP, sc: 0.6 }); M.vis($('#dp' + k), t, tDs[k] + 0.2, 1e9, { dy: 0 }); if (k < 4) M.vis($('#dx' + k), t, tDs[k + 1] - 0.15, 1e9, { dy: -8 });
      const c = $('#dc' + k); const hi = k === 4 ? M.io((t - tDs[4] - 0.6) / 0.3) : k === 0 ? M.io((t - tDs[4] - 0.6) / 0.3) : 0; c.style.background = mix(C.soft, C.ac2, hi); c.style.boxShadow = hi > 0.01 ? `inset 0 0 0 3px ${M.rgba(RC, hi)}` : 'none'; });
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tR1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('R1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(lAx, t, T0('L2'), 1e9, { dy: 0, fade: 0.3 });
    const tPt = [wt('L2', 'one'), wt('L2', 'up'), wt('L2', 'minus'), wt('L2', 'down')];
    lPts.forEach((g, k) => M.vis(g, t, tPt[k] - 0.1, 1e9, { ...POP, sc: 0.3 }));
    const n = nK(t), a = n * Math.PI / 2, [px, py] = lP(a);
    attr(lArc, 'd', arcD(a)); attr(lDot, 'cx', px.toFixed(1)); attr(lDot, 'cy', py.toFixed(1)); attr(lArm, 'x2', px.toFixed(1)); attr(lArm, 'y2', py.toFixed(1));
    M.vis(lDot, t, wt('L4', 'Start'), 1e9, { ...POP, sc: 0.3 }); M.vis(lArm, t, wt('L4', 'Start'), 1e9, { dy: 0 });
    M.vis(lTurn, t, wt('L3', 'quarter'), 1e9, { dy: 0 });
    M.vis($('#lr'), t, wt('L4', 'Start') - 0.3, out, { dx: 60, dy: 0, ...o });
    const ni = Math.round(n);
    if (ni !== lLast) { lLast = ni; M.setT($('#lNv'), String(ni)); $('#lV').innerHTML = K(`${I}^{${ni}} = ${pv(ni)}`); }
    M.vis($('#lN'), t, wt('L4', 'Start'), 1e9, { dy: 14 }); M.vis($('#lV'), t, wt('L4', 'Start') + 0.2, 1e9, { dy: 14 });
    for (let k = 0; k < 8; k++) { const el = $('#lt' + k); const tk = k < 4 ? tL4[k] + 0.45 : tL5 + (k - 4) * 0.6 + 0.45; M.vis(el, t, tk, 1e9, { ...POP, sc: 0.6 }); el.style.background = ni === k + 1 ? C.ac2 : C.soft; }
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('R5');
    M.vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    tRr.forEach((tt, r) => M.vis($('#rr' + r), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }));
    const cur = t < wt('R3', 'Remainder') ? null : 3;
    if (cur === null) hiMove($('#rHi'), t, tRr, 84, 100, 6); else { const hb = $('#rHi'); hb.style.top = (84 + 3 * 100 - 6) + 'px'; M.vis(hb, t, tRr[0] - 0.1, 1e9, { dy: 0 }); }
    M.vis($('#rr'), t, T0('R3') - 0.2, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#rF0'), t, wt('R3', 'four'), 0.8); PUC.write($('#rF1'), t, wt('R3', 'Remainder'), 0.8); PUC.write($('#rF2'), t, wt('R3', 'minus') - 0.1, 0.7);
    M.vis($('#rNL'), t, T0('R4'), 1e9, { dy: 10 }); PUC.write($('#rF3'), t, wt('R4', 'quarter') - 0.2, 0.8);
    M.vis($('#th1'), t, tR5 + 0.05, OUT('T1') + 0.3, { dy: 36, ...o });
    th1(t, { tin: tR5, tOpts: wt('R5', 'equal') - 0.1, tCount: T1('R5') + 0.05, dur: 3, tAns: T0('R6') - 0.02, tWhy: wt('R6', 'Twenty') });
  }

  /* statement */
  const stOn = t >= tT && t < tS1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tS1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'powers') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'round') + 0.2, 1.0);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tW1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S5');
    M.vis($('#sl'), t, tS1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#slF0'), t, wt('S1', 'Minus') - 0.3, 0.6); PUC.write($('#slF1'), t, wt('S1', 'because'), 0.9);
    sI.forEach((g, k) => M.vis(g, t, wt('S1', 'Minus') + k * 0.4, 1e9, { ...POP, sc: 0.4 }));
    M.vis(sT, t, wt('S1', 'also'), 1e9, { ...POP, sc: 0.4 });
    sA.forEach(({ a, x1, y1, x2, y2 }, k) => { const u = M.io((t - wt('S1', 'also') - k * 0.3) / 0.5); a.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); });
    M.vis(sAT, t, wt('S1', 'also') + 0.4, 1e9, { dy: 0 });
    M.vis($('#slP'), t, wt('S2', 'two') - 0.1, 1e9, POP);
    M.vis($('#sr'), t, T0('S3') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#srF0'), t, wt('S3', 'symbol'), 0.8); PUC.write($('#srF1'), t, wt('S3', 'same'), 0.8);
    M.vis($('#srL'), t, wt('S4', 'positive') - 0.1, 1e9, { dy: 10 }); PUC.write($('#srF2'), t, wt('S4', 'root'), 0.8); PUC.write($('#srF3'), t, wt('S4', 'nine') - 0.1, 0.9);
    M.vis($('#th2'), t, tS5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tS5, tOpts: wt('S5', 'four') - 0.1, tCount: T1('S5') + 0.05, dur: 3, tAns: T0('S6') - 0.02, tWhy: wt('S6', 'root') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wAx, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.25 });
    const tv = [tW[0] + 0.3, tW[1] + 0.3, tW[2] + 0.3, wt('W5', 'thirteen') + 0.3];
    wArr.forEach(({ ar, a, b, l }, k) => { const u = M.io((t - tv[k]) / 0.6), [x1, y1] = wP(a), [x2, y2] = wP(b); ar.set(x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); M.vis(l, t, tv[k] + 0.4, 1e9, { dy: 0 }); });
    M.vis(wO, t, wt('W7', 'end') - 0.1, 1e9, { ...POP, sc: 0.3 }); M.vis(wOT, t, wt('W7', 'end'), 1e9, { dy: 0 });
    M.vis($('#wP'), t, wt('W7', 'Any') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'two') - 0.1 });
    M.vis(tQ0, t, wt('X3', 'rule'), 1e9, { dy: 0 }); M.vis(tQ1, t, wt('X3', 'breaks'), 1e9, { dy: 0 }); M.vis(tQ2, t, wt('X3', 'negative'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'power') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
