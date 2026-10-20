// PUC world sample: free fall (exercises every shared PUC component)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
const VC = C.ac, GC = C.red;              // colour-coding: v = accent blue, g = red, t = ink
const AV = '../../assets/illustrations/puc/';

/* beats */
const tMorph = T0('H2') + 0.02, tC1 = T0('C1'), tC2 = T0('C2'), tX = T0('X1'), tQ = T0('Q1'), tA = T0('A1'), tF = T0('F1');
const tDrop = tC1 + 0.1, FALL = 2.0;      // real-time fall of 2.0 s (19.6 m)
const tSlow = tDrop + 1.0, SLOW = 1.4;   // freeze + vectors at t = 1 s of the fall
const tCount = T1('Q1') + 0.05, tAns = tA - 0.02;
const SW = [[tQ, tQ + 0.06], [tF, tF + 0.06]];

/* sim: ball in a column, 22 px per metre */
const s = $('#simS'), ns = 'http://www.w3.org/2000/svg', SC = 21, X0 = 260, Y0 = 92;
const mk = (tag, a, p = s) => { const e = document.createElementNS(ns, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
mk('line', { x1: 160, y1: Y0 + 19.6 * SC + 22, x2: 440, y2: Y0 + 19.6 * SC + 22, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 20; m += 5) { mk('line', { x1: 120, y1: Y0 + m * SC, x2: 132, y2: Y0 + m * SC, stroke: C.ink, 'stroke-width': 2 }); const tx = mk('text', { x: 108, y: Y0 + m * SC + 6, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }); tx.textContent = m + ' m'; }
mk('line', { x1: 132, y1: Y0, x2: 132, y2: Y0 + 20 * SC, stroke: C.ink, 'stroke-width': 2 });
const ghosts = [0.5, 1.0, 1.5].map(() => mk('circle', { r: 20, fill: C.ink, cx: X0, cy: Y0 }));
const ball = mk('circle', { r: 20, fill: C.ink, cx: X0, cy: Y0 });
const vA = PUC.arrow(s, VC), gA = PUC.arrow(s, GC);
const vL = mk('text', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC }); vL.textContent = 'v';
const gL = mk('text', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: GC }); gL.textContent = 'g';
/* sim clock: real time, except a frozen stretch for the slow-mo replay */
const simT = t => { let u = t - tDrop; if (t > tSlow) u -= Math.min(t - tSlow, SLOW) * 0.75; return M.clamp(u, 0, FALL); };

/* readout */
$('#roG').innerHTML = `<span class="k" style="font-style:italic">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${GC}">g</span><span class="v" style="color:${GC}">9.8</span><span class="u">m/s²</span>`;
$('#fx1').innerHTML = K(`\\textcolor{${VC}}{v} = \\textcolor{${GC}}{g}\\,t`);
/* graph */
const G = PUC.graph($('#grS'), { x: 90, y: 74, w: 640, h: 140, xmax: 2, ymin: 0, ymax: 20, xt: [0, 1, 2], yt: [0, 20], xl: 't (s)', yl: 'v (m/s)' });
const gC = G.curve(VC), gD = G.dot(C.ink);

/* exam components */
const trap = PUC.trap($('#trap'), { wrong: 'A heavier ball falls faster', right: 'Without air, all objects fall together' });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Direct use of v = u + at with a = g' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'A stone is dropped from rest. Taking g&nbsp;=&nbsp;9.8&nbsp;m/s², what is its speed after 3&nbsp;s?', qW: 800,
  opts: ['3.3 m/s', '9.8 m/s', '29.4 m/s', '44.1 m/s'], right: 2, optW: 474, optY: 360 });
const sol = PUC.solution($('#so'), [[K('u = 0,\\; a = \\textcolor{' + GC + '}{g}')], [K('\\textcolor{' + VC + '}{v} = u + \\textcolor{' + GC + '}{g}\\,t')], [K('\\textcolor{' + VC + '}{v} = 0 + 9.8 \\times 3')], [K('\\textcolor{' + VC + '}{v} = 29.4\\ \\text{m/s}')]], { dy: 96 });
const fc = PUC.fcard($('#sF'), { x: 560, y: 280, w: 800, h: 420, y0: 104, dy: 100, title: 'Free fall · formula card', lines: [K('v = u + g\\,t'), K('h = u\\,t + \\tfrac{1}{2}\\,g\\,t^2'), K('v^2 = u^2 + 2\\,g\\,h')] });
const nx = PUC.next($('#sF'), { label: 'NEXT', topic: 'Projectile motion: one throw, two motions', y: 764 });
const av = PUC.avatar($('#sL'), { x: 160 + 372, y: 270 + 330, who: 'Aarav', face: AV + 'aarav-face.jpg', text: 'Same gain every second?' });

const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.1, 1.12, 560, 520], [tSlow + SLOW + 0.2, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  /* lesson */
  const lOn = t >= tMorph && t < tX + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 }, tout = tX - 0.32;
    M.vis($('#sim'), t, tMorph + 0.2, tout, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tMorph + 0.35, tout, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tMorph + 0.5, tout, { dy: 36, ...o });
    const u = simT(t), y = Y0 + 0.5 * 9.8 * u * u * SC;
    PUC.attr(ball, 'cy', y.toFixed(1)); M.hide(ball, t < tMorph + 0.4);
    ghosts.forEach((g, i) => { const gt = [0.5, 1.0, 1.5][i]; PUC.attr(g, 'cy', (Y0 + 0.5 * 9.8 * gt * gt * SC).toFixed(1)); g.style.opacity = u >= gt ? [0.12, 0.2, 0.3][i] : 0; });
    // vectors appear during the slow-mo freeze, then stay with the ball
    const va = M.io((t - tSlow - 0.1) / 0.5) * (u < FALL ? 1 : 1 - M.io((t - tSlow - SLOW - 0.6) / 0.2)), v = 9.8 * u;
    vA.set(X0 + 70, y, X0 + 70, y + v * 7 * va); gA.set(X0 - 70, y, X0 - 70, y + 68 * va);
    PUC.attr(vL, 'x', X0 + 86); PUC.attr(vL, 'y', (y + v * 3.5 * va + 10).toFixed(1)); vL.style.opacity = va;
    PUC.attr(gL, 'x', X0 - 112); PUC.attr(gL, 'y', (y + 44).toFixed(1)); gL.style.opacity = va;
    M.vis($('#slow'), t, tSlow, tSlow + SLOW + 0.2, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    M.setT($('#rt'), u.toFixed(2)); M.setT($('#rv'), v.toFixed(1));
    gC((k) => [k, 9.8 * k], 0, u); gD(u, 9.8 * u, t > tDrop - 0.3);
    PUC.write($('#fx1'), t, wt('C2', 'v') - 0.05, 0.7);
    av(t, wt('C2', 'g') + 0.4, tX - 0.3);
  }
  /* exam trap + where it is asked */
  const xOn = t >= tX - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, tX + 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X1', 'Heavier') - 0.05, tStrike: wt('X1', 'not') , tRight: wt('X1', 'Without') - 0.05 });
    where(t, { tin: tX + 0.2, tLight: [wt('X1', 'all') ], tType: wt('X1', 'together') + 0.2 });
  }
  /* MCQ */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.3, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, [tAns + 0.5, wt('A1', 'Nine') - 0.3, wt('A1', 'times') - 0.1, wt('A1', 'three') + 0.3]);
  }
  /* formula card + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2], tShot: wt('F1', 'card') }); nx(t, wt('F1', 'Next') - 0.1); }
  caps(t);
});
M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tF - 0.38, 'whoosh', 0.22);
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
