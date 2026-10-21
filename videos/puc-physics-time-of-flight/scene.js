// PUC Physics Ep 43: Time of flight (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K0 = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, VY = C.violet, GC = C.red, IN = C.ink;           // colour-coding: v blue, upward part violet, g red
const B30 = VC, B60 = VY;                                          // the 30 degree ball blue, the 60 degree ball violet (second quantity)
const TG = C.gold;                                                  // angle theta gold (canon)
const K = (tex, d) => K0(tex.replace(/\\theta/g, '\\textcolor{#B7791F}{\\theta}'), d);
// SVG elements fade only (M.vis would overwrite their transform); HTML uses M.vis
const VIS = (el, t, tin, tout = 1e9, op) => { if (!(el instanceof SVGElement)) return M.vis(el, t, tin, tout, op); const u = M.clamp((t - tin) / 0.22) * (1 - M.io((t - tout) / 0.3)); M.hide(el, u <= 0.001); el.style.opacity = u >= 0.999 ? '' : u.toFixed(3); return u; };
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const o = { outDur: 0.3, ody: -16 };
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const UP = tc(VY, 'v_0\\sin\\theta'), G_ = tc(GC, 'g'), TOF = `T = \\dfrac{2\\,${UP}}{${G_}}`;
const ground = (sv, y) => { mk(sv, 'line', { x1: 36, y1: y, x2: 748, y2: y, stroke: IN, 'stroke-width': 3 }); for (let x = 48; x < 748; x += 28) mk(sv, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const mkBall = (sv, col, r = 13) => ({ gh: [0.3, 0.2, 0.12].map(() => mk(sv, 'circle', { r, fill: col, opacity: 0 })), b: mk(sv, 'circle', { r, fill: col }) });
const setBall = (B, f, u, du, on = true) => { const [x, y] = f(u); attr(B.b, 'cx', x.toFixed(1)); attr(B.b, 'cy', y.toFixed(1)); M.hide(B.b, !on);
  B.gh.forEach((c, k) => { const uu = u - du * (k + 1), [gx, gy] = f(uu); attr(c, 'cx', gx.toFixed(1)); attr(c, 'cy', gy.toFixed(1)); c.style.opacity = on && uu > 0 && Math.hypot(x - gx, y - gy) > 3 ? [0.3, 0.2, 0.12][k] : 0; }); };
const pathD = (f, n = 60) => Array.from({ length: n + 1 }, (_, i) => { const [x, y] = f(i / n); return (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }).join('');

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 7.5 12 12l7.1-4.5', 'M12 12v9.9'],
  jump: ['M4 18c3-9 13-9 16 0', 'M3 21h18'],
  angle: ['M3 20h18', 'M3 20 15 6'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tK1 = T0('K1'), tK3 = T0('K3');
const tB1 = T0('B1'), tB3 = T0('B3'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- physics (NCERT g = 9.8 m/s^2) ---------- */
const g = 9.8, V = 20, A = [30, 60].map(d => d * Math.PI / 180);
const TT = A.map(a => 2 * V * Math.sin(a) / g);                     // 2.04 s, 3.53 s
const X = (i, s) => V * Math.cos(A[i]) * Math.min(s, TT[i]), Y = (i, s) => { s = Math.min(s, TT[i]); return Math.max(0, V * Math.sin(A[i]) * s - 0.5 * g * s * s); };

/* ---------- title card ---------- */
const JOBS = [['ball', 'High kick', 'LONG TIME UP', 'kick'], ['arrowR', 'Flat throw', 'LANDS QUICKLY', 'throw'], ['jump', 'Puddle jump', 'A SHORT HOP', 'jump']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
const hj = $('#hjS'), HG = 430; ground(hj, HG);
const HC = [[60, 280, 230, 'high kick', '2.9 s'], [370, 190, 40, 'flat throw', '0.6 s'], [590, 150, 34, 'puddle jump', '0.5 s']];
const hjP = HC.map(([x0, R, H, n, ts], i) => { const col = [VC, IN, VY][i];
  const p = mk(hj, 'path', { d: `M${x0},${HG} Q${x0 + R / 2},${HG - 2 * H} ${x0 + R},${HG}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' });
  const l = txt(hj, x0 + R / 2, HG - H - 52, n, { 'text-anchor': 'middle', 'font-size': 20, fill: col, 'font-weight': 600 });
  const c = txt(hj, x0 + R / 2, HG - H - 22, ts, { 'text-anchor': 'middle', 'font-size': 26, fill: IN, 'font-weight': 600 }); return [p, l, c]; });

const hk = $('#hkS'), HO = [180, 430], HR = 380;                     // two arcs over the corridor: same range, different heights
const fH = i => u => [HO[0] + HR * u, HO[1] - 4 * (HR / 4) * Math.tan(A[i]) * u * (1 - u)];
const hkP = [0, 1].map(i => mk(hk, 'path', { d: pathD(fH(i)), fill: 'none', stroke: [B30, B60][i], 'stroke-width': 5, 'stroke-dasharray': '10 8' }));
const hkB = [mkBall(hk, B30, 12), mkBall(hk, B60, 12)];
const TILES = [['angle', '30°'], ['angle', '60°'], ['clock', 'Which stays up longer?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, [B30, B60, IN][i], 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'thirty'), wt('H4', 'sixty'), wt('H4', 'Which')];

/* ---------- P ---------- */
const pl = $('#plS'), PO = [90, 440], PS = 16; ground(pl, PO[1]);
const plPath = mk(pl, 'path', { d: pathD(u => [PO[0] + X(1, u * TT[1]) * PS, PO[1] - Y(1, u * TT[1]) * PS]), fill: 'none', stroke: B60, 'stroke-width': 4, 'stroke-linecap': 'round' });
const plA = mk(pl, 'circle', { cx: PO[0], cy: PO[1], r: 10, fill: IN }), plB = mk(pl, 'circle', { cx: PO[0] + X(1, TT[1]) * PS, cy: PO[1], r: 10, fill: IN });
const plAT = txt(pl, PO[0], PO[1] + 48, 'LEAVES · t = 0', { 'font-size': 18, fill: IN, 'font-weight': 600 });
const plBT = txt(pl, PO[0] + X(1, TT[1]) * PS, PO[1] + 48, 'LANDS · t = T', { 'font-size': 18, fill: IN, 'font-weight': 600, 'text-anchor': 'end' });
const plBr = mk(pl, 'path', { d: `M${PO[0]},${PO[1] + 70} v12 H${PO[0] + X(1, TT[1]) * PS} v-12`, fill: 'none', stroke: VC, 'stroke-width': 3 });
const plBrT = txt(pl, PO[0] + X(1, TT[1]) * PS / 2, PO[1] + 110, 'time of flight T', { 'font-size': 22, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' });
const plH = mk(pl, 'line', { x1: 36, y1: PO[1] - 1, x2: 748, y2: PO[1] - 1, stroke: C.ok, 'stroke-width': 6, opacity: 0 });
const plHT = txt(pl, 748, PO[1] - 14, 'SAME HEIGHT', { 'font-size': 18, fill: C.ok, 'font-weight': 600, 'text-anchor': 'end' });
// split motion: violet shadow on an up-down rail, blue shadow on a sideways rail
const pr = $('#prS'), RO = [140, 400], RS = 15;
mk(pr, 'line', { x1: RO[0], y1: RO[1], x2: 748, y2: RO[1], stroke: IN, 'stroke-width': 3 });
mk(pr, 'line', { x1: RO[0] - 50, y1: RO[1], x2: RO[0] - 50, y2: 90, stroke: VY, 'stroke-width': 3, opacity: 0.4 });
mk(pr, 'line', { x1: RO[0], y1: RO[1] + 40, x2: 748, y2: RO[1] + 40, stroke: VC, 'stroke-width': 3, opacity: 0.4 });
const prP = mk(pr, 'path', { d: pathD(u => [RO[0] + X(1, u * TT[1]) * RS, RO[1] - Y(1, u * TT[1]) * RS]), fill: 'none', stroke: IN, 'stroke-width': 2.5, 'stroke-dasharray': '4 8', opacity: 0.5 });
const prB = mk(pr, 'circle', { r: 13, fill: IN }), prV = mk(pr, 'circle', { r: 11, fill: VY, cx: RO[0] - 50 }), prH = mk(pr, 'circle', { r: 11, fill: VC, cy: RO[1] + 40 });
const prVT = txt(pr, RO[0] - 50, 76, 'UP-DOWN', { 'font-size': 16, fill: VY, 'font-weight': 600, 'text-anchor': 'middle' });
const prHT = txt(pr, 748, RO[1] + 72, 'SIDEWAYS · COMES ALONG', { 'font-size': 16, fill: VC, 'font-weight': 600, 'text-anchor': 'end' });
const prL = txt(pr, RO[0] - 30, RO[1] - 14, 'y = 0 → LANDS', { 'font-size': 18, fill: C.ok, 'font-weight': 600 });

/* ---------- S: two throws ---------- */
const s = $('#simS'), SO = [80, 440], SP = 16; ground(s, SO[1]);
const sAim = [0, 1].map(i => PUC.arrow(s, [B30, B60][i], 5, 16));
const sAimT = [0, 1].map(i => txt(s, 0, 0, ['30°', '60°'][i], { 'font-size': 22, fill: [B30, B60][i], 'font-weight': 600 }));
const sPath = [0, 1].map(i => mk(s, 'path', { d: '', fill: 'none', stroke: [B30, B60][i], 'stroke-width': 2.5, 'stroke-dasharray': '4 8', opacity: 0.7 }));
const sB = [mkBall(s, B30), mkBall(s, B60)];
const aVy = PUC.arrow(s, VY, 5, 14), aG = PUC.arrow(s, GC, 5, 14);
const lVy = txt(s, 0, 0, 'vᵧ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: VY });
const lG = txt(s, 0, 0, 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: GC });
const topT = txt(s, 0, 0, 'TOP AT 1.77 s = HALF OF 3.53 s', { 'font-size': 20, fill: VY, 'font-weight': 600, 'text-anchor': 'middle' });
const landT = [0, 1].map(i => txt(s, SO[0] + X(i, TT[i]) * SP, SO[1] + 46 + i * 28, `${['30°', '60°'][i]} lands · ${TT[i].toFixed(2)} s`, { 'font-size': 18, fill: [B30, B60][i], 'font-weight': 600, 'text-anchor': 'middle' }));
landT[1].setAttribute('y', SO[1] - 14); landT[1].setAttribute('x', SO[0] + X(1, TT[1]) * SP - 16); landT[1].setAttribute('text-anchor', 'end');
landT[0].setAttribute('y', SO[1] + 46);
const G = PUC.graph($('#grS'), { x: 110, y: 66, w: 600, h: 150, xmax: 4, ymin: 0, ymax: 16, xt: [0, 1, 2, 3], yt: [0, 5, 10, 15], xl: 't (s)', yl: 'y (m)' });
const gC = [G.curve(B30, 5), G.curve(B60, 5)], gD = [G.dot(B30, 10), G.dot(B60, 10)];
const gHalf = G.mk('line', { x1: G.X(TT[1] / 2), y1: G.Y(0), x2: G.X(TT[1] / 2), y2: G.Y(Y(1, TT[1] / 2)), stroke: VY, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' });
// sim clock: phase 1 (both fly, uniform time), phase 2 (slow-mo 0.25x through the 60 degree top), phase 3 (show the end)
const tL = wt('S3', 'Watch'), tLand30 = wt('S4', 'two') - 0.1, R1 = TT[0] / (tLand30 - tL);
const tR = T0('S5') + 0.05, tTop = wt('S5', 'half') - 0.1;
const sTop = TT[1] / 2; let s2 = 1.2, tRun = tTop - (sTop - s2) / 0.25; if (tRun < tR + 0.4) { tRun = tR + 0.4; s2 = sTop - 0.25 * (tTop - tRun); }
const tFreeze = tTop + 0.1, tP3 = T0('S6') - 0.1, R3 = TT[1] / Math.max(1, wt('S6', 'three') - tP3);
const simS = t => {
  if (t < tL) return [0, 1];
  if (t < tR) return [(t - tL) * R1, 1];
  if (t < tP3) return [t < tRun ? s2 : Math.min(sTop, s2 + (t - tRun) * 0.25), 2];
  return [Math.min(TT[1], (t - tP3) * R3), 3];
};
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Up time = down time. Neat!' });

/* ---------- D ---------- */
const STEPS = [[`y = ${UP}\\,t - \\tfrac{1}{2}${G_}\\,t^2`, 'up and down motion'], [`0 = ${UP}\\,t - \\tfrac{1}{2}${G_}\\,t^2`, 'lands: back at height zero'], [`t\\left(${UP} - \\tfrac{1}{2}${G_}\\,t\\right) = 0`, 'take t out as a common factor'], [`t = 0 \\;\\text{ or }\\; ${TOF}`, 'launch, or landing']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst3 .sx').style.top = '-8px'; $('#dst3 .why').style.top = '76px';
const tStep = [wt('D2', 'y'), wt('D3', 'When'), wt('D4', 'Take'), wt('D5', 'So')];
const DG = PUC.graph($('#drS'), { x: 110, y: 90, w: 580, h: 220, xmax: 4, ymin: 0, ymax: 16, xt: [0, 1, 2, 3], yt: [0, 5, 10, 15], xl: 't (s)', yl: 'y (m)' });
const dCur = DG.curve(B60, 5);
const dR0 = DG.mk('circle', { cx: DG.X(0), cy: DG.Y(0), r: 11, fill: IN }), dR1 = DG.mk('circle', { cx: DG.X(TT[1]), cy: DG.Y(0), r: 11, fill: C.ok });
const dR0T = DG.mk('text', { x: DG.X(0) + 18, y: DG.Y(0) - 18, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: IN }); dR0T.textContent = 't = 0 · LAUNCH';
const dR1T = DG.mk('text', { x: DG.X(TT[1]) - 18, y: DG.Y(0) - 18, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: C.ok, 'text-anchor': 'end' }); dR1T.textContent = 't = T · LANDING';
const dExT = DG.mk('text', { x: 690, y: 80, 'font-family': 'IBM Plex Mono', 'font-size': 16, 'font-weight': 600, fill: C.mute, 'text-anchor': 'end' }); dExT.textContent = '60° BALL, 20 m/s';
$('#dres').innerHTML = K(`\\boxed{${TOF}}`);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(TOF);

/* ---------- C: second way via the top ---------- */
$('#c0').innerHTML = K(`v_y = ${UP} - ${G_}\\,t`);
$('#c1').innerHTML = K(`\\text{top: } v_y = 0 \\Rightarrow t_{\\text{top}} = \\dfrac{${UP}}{${G_}}`);
$('#c2').innerHTML = K(`T = 2\\,t_{\\text{top}} = \\dfrac{2\\,${UP}}{${G_}}`);
const CG = PUC.graph($('#crS'), { x: 120, y: 90, w: 560, h: 360, xmax: 4, ymin: -20, ymax: 20, xt: [0, 1, 2, 3], yt: [-15, 0, 15], xl: 't (s)', yl: 'vᵧ (m/s)' });
const vy0 = V * Math.sin(A[1]);
const cUp = CG.mk('path', { d: `M${CG.X(0)},${CG.Y(0)} L${CG.X(0)},${CG.Y(vy0)} L${CG.X(sTop)},${CG.Y(0)} Z`, fill: M.rgba(VY, 0.14), stroke: 'none' });
const cDn = CG.mk('path', { d: `M${CG.X(sTop)},${CG.Y(0)} L${CG.X(TT[1])},${CG.Y(-vy0)} L${CG.X(TT[1])},${CG.Y(0)} Z`, fill: M.rgba(GC, 0.1), stroke: 'none' });
const cLine = CG.curve(VY, 5), cDot = CG.dot(VY, 10);
const cTop = CG.mk('text', { x: CG.X(sTop) + 10, y: CG.Y(0) - 52, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: VY }); cTop.textContent = 'vᵧ = 0 · TOP';
const cUpT = CG.mk('text', { x: CG.X(sTop / 2), y: CG.Y(0) + 34, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: VY, 'text-anchor': 'middle' }); cUpT.textContent = 'UP 1.77 s';
const cDnT = CG.mk('text', { x: CG.X(sTop * 1.5), y: CG.Y(0) - 16, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: GC, 'text-anchor': 'middle' }); cDnT.textContent = 'DOWN 1.77 s';
const cSl = CG.mk('text', { x: CG.X(0.4), y: CG.Y(vy0) + 4, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: GC }); cSl.textContent = '−9.8 m/s EVERY SECOND';

/* ---------- K: side by side + think ---------- */
$('#kb0a').innerHTML = K('\\sin 30^\\circ = 0.5'); $('#kb0b').innerHTML = K(`T = \\dfrac{2 \\times 20 \\times 0.5}{9.8}`);
$('#kb1a').innerHTML = K('\\sin 60^\\circ \\approx 0.87'); $('#kb1b').innerHTML = K(`T = \\dfrac{2 \\times 20 \\times 0.87}{9.8}`);
const KG = PUC.graph($('#krS'), { x: 120, y: 100, w: 560, h: 340, xmax: 90, ymin: 0, ymax: 4.5, xt: [0, 30, 45, 60, 90], yt: [0, 1, 2, 3, 4], yl: 'T (s)' });
const kCur = KG.curve(IN, 4.5);
const TA = d => 2 * V * Math.sin(d * Math.PI / 180) / g;
const kP = [[30, B30], [60, B60], [90, C.ok]].map(([d, col]) => ({ d, c: KG.mk('circle', { cx: KG.X(d), cy: KG.Y(TA(d)), r: 11, fill: col }), l: (() => { const e = KG.mk('text', { x: KG.X(d) + (d === 90 ? -16 : 16), y: KG.Y(TA(d)) + (d === 90 ? -20 : 26), 'font-family': 'IBM Plex Mono', 'font-size': 20, 'font-weight': 600, fill: col, 'text-anchor': d === 90 ? 'end' : 'start' }); e.textContent = `${TA(d).toFixed(2)} s`; return e; })() }));
const th1 = PUC.think($('#th1'), { q: 'Same speed again. Which angle gives the longest time in the air?', opts: ['45°', '90°'], right: 1, why: 'sin 90° = 1, the biggest sin can be: T = 2v₀ / g.' });

/* ---------- B: no cos theta + think ---------- */
$('#bF').innerHTML = K(TOF);
const bl = $('#blS'), bX = mk(bl, 'path', { d: '', fill: 'none', stroke: GC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const br = $('#brS'), TB = [80, 220], TH = 1.8, BS = 140, VXP = 2.4, TFALL = Math.sqrt(2 * TH / g);     // table 1.8 m, push 2.4 m/s
const BG = TB[1] + TH * BS;
ground(br, BG);
mk(br, 'rect', { x: TB[0] - 40, y: TB[1], width: 150, height: 22, rx: 4, fill: '#C9A27A', stroke: IN, 'stroke-width': 2.5 });
mk(br, 'rect', { x: TB[0] - 20, y: TB[1] + 22, width: 16, height: BG - TB[1] - 22, fill: '#C9A27A', stroke: IN, 'stroke-width': 2.5 });
mk(br, 'rect', { x: TB[0] + 74, y: TB[1] + 22, width: 16, height: BG - TB[1] - 22, fill: '#C9A27A', stroke: IN, 'stroke-width': 2.5 });
const E = TB[0] + 110;
const fDrop = u => [E + 4, TB[1] - 13 + (TH * BS) * (u * u)], fPush = u => [E + 4 + VXP * TFALL * BS * u, TB[1] - 13 + (TH * BS) * (u * u)];
const bDrop = mkBall(br, IN), bPush = mkBall(br, VC);
const bPushA = PUC.arrow(br, VC, 5, 14);
const bLines = [0.25, 0.5, 0.75].map(u => mk(br, 'line', { x1: E - 20, x2: 748, y1: fDrop(u)[1], y2: fDrop(u)[1], stroke: IN, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0 }));
const bTag = txt(br, 748, 70, 'SLOW-MO REPLAY · 0.25x', { 'font-size': 18, fill: IN, 'font-weight': 600, 'text-anchor': 'end' });
const bLandT = txt(br, 420, BG - 18, 'BOTH LAND TOGETHER', { 'font-size': 20, fill: C.ok, 'font-weight': 600, 'text-anchor': 'middle' });
const th2 = PUC.think($('#th2'), { q: 'Dropped, or pushed off sideways from one table: which lands first?', opts: ['Dropped ball', 'Both together', 'Pushed ball'], right: 1, why: 'Both start with zero upward speed and the same g.' });
const tBack = wt('B4', 'gravity') - 0.1, tBplay = tBack + 0.6, tBlen = TFALL / 0.25;

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${UP} = 19.6 \\times 0.5 = 9.8\\,\\text{m/s}`)],
  [K(`t_{\\text{top}} = \\dfrac{9.8}{9.8} = 1\\,\\text{s}`)],
  [K(`T = 2 \\times 1 = ${tc(VC, '2\\,\\text{s}')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 110 });
$('#wl .lbl').style.top = '30px';
const WG = PUC.graph($('#wrS'), { x: 110, y: 110, w: 580, h: 300, xmax: 2.4, ymin: 0, ymax: 6, xt: [0, 0.5, 1, 1.5, 2], yt: [0, 2, 4, 6], xl: 't (s)', yl: 'y (m)' });
const wy = s => 9.8 * s - 4.9 * s * s, wCur = WG.curve(VC, 5), wDot = WG.dot(IN, 11);
const wBr = [WG.mk('path', { d: `M${WG.X(0)},${WG.Y(0) + 56} v10 H${WG.X(1)} v-10`, fill: 'none', stroke: VY, 'stroke-width': 3 }), WG.mk('path', { d: `M${WG.X(1)},${WG.Y(0) + 56} v10 H${WG.X(2)} v-10`, fill: 'none', stroke: GC, 'stroke-width': 3 })];
const wBrT = [['1 s UP', VY, 0.5], ['1 s DOWN', GC, 1.5]].map(([s1, col, x]) => { const e = WG.mk('text', { x: WG.X(x), y: WG.Y(0) + 96, 'font-family': 'IBM Plex Mono', 'font-size': 20, 'font-weight': 600, fill: col, 'text-anchor': 'middle' }); e.textContent = s1; return e; });
const wTop = WG.mk('text', { x: WG.X(1), y: WG.Y(4.9) - 20, 'font-family': 'IBM Plex Mono', 'font-size': 18, 'font-weight': 600, fill: IN, 'text-anchor': 'middle' }); wTop.textContent = 'TOP · 4.9 m';
const tW = [wt('W3', 'The'), wt('W4', 'Time'), wt('W5', 'The')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`T = \\dfrac{v_0\\sin\\theta}{g}`), right: K(`T = \\dfrac{2\\,v_0\\sin\\theta}{g}`), y0: 74, y1: 160 });
const xS = $('#xS'), XO = [60, 220];
mk(xS, 'line', { x1: 40, y1: XO[1], x2: 520, y2: XO[1], stroke: IN, 'stroke-width': 3 });
const xf = u => [XO[0] + 420 * u, XO[1] - 4 * 150 * u * (1 - u)];
const xUp = mk(xS, 'path', { d: pathD(u => xf(u / 2), 30), fill: 'none', stroke: GC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const xDn = mk(xS, 'path', { d: pathD(u => xf(0.5 + u / 2), 30), fill: 'none', stroke: C.ok, 'stroke-width': 5, 'stroke-linecap': 'round' });
const xUpT = txt(xS, XO[0] + 40, XO[1] - 150, 'ONLY UP', { 'font-size': 18, fill: GC, 'font-weight': 600 });
const xDnT = txt(xS, XO[0] + 330, XO[1] - 150, '+ DOWN', { 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Find T, or work back from T to the speed, the angle or the range' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A ball stays in the air for 4 s and lands 80 m away on level ground (g = 10 m/s²). Find its launch speed and angle.', qW: 780,
  opts: ['20√2 m/s at 45°', '20 m/s at 45°', '40 m/s at 30°', '20√2 m/s at 60°'], right: 0, cols: 2, optW: 474, optH: 84, optY: 330 });
const so = PUC.solution($('#so'), [[K('v_0\\sin\\theta = \\tfrac{gT}{2} = 20')], [K('v_0\\cos\\theta = \\tfrac{80}{4} = 20')], [K('\\tan\\theta = 1 \\Rightarrow \\theta = 45^\\circ')], [K('v_0 = \\sqrt{20^2 + 20^2} = 20\\sqrt{2}')]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'So'), wt('A3', 'Sideways'), wt('A3', 'Both'), wt('A3', 'root')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 250, w: 1100, h: 500, title: 'Recap · time of flight', y0: 84, dy: 110, txt: [0, 1, 1, 1],
  lines: [K(`T = 2\\,${UP} \\,/\\, ${G_} \\qquad t_{\\text{top}} = T / 2`), '<b>Only the upward part</b> counts: no cos θ', '<b>Up time = down time</b> (same launch and landing height)', '<b>Longest</b> at 90°: T = 2v₀ / g'] });
const YQ = ['Why does the sideways speed not change the time of flight?', 'Why is there a 2 in the formula?', 'Which launch angle keeps a ball in the air the longest?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 44', topic: 'How high is the turning point? Maximum Height', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const apx = 160 + SO[0] + X(1, sTop) * SP, apy = 270 + SO[1] - Y(1, sTop) * SP;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR + 0.1, 1.06, 960, 540], [tP3 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; TILES.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  // red strike-through mark under the missing cos theta chip, measured from the formula
  const f = $('#bF'); bX.setAttribute('d', `M36,${f.offsetTop + f.offsetHeight + 24} H${36 + f.offsetWidth}`);
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  JOBS.forEach((_, i) => VIS($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    VIS($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    VIS($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    HC.forEach((_, i) => { M.draw(hjP[i][0], t, tMorph + 0.4 + i * 0.45, 0.6); VIS(hjP[i][1], t, tMorph + 0.8 + i * 0.45, 1e9, { dy: 8 }); VIS(hjP[i][2], t, wt('H2', ['ages', 'once', 'once'][i]) + (i === 2 ? 0.3 : 0), 1e9, POP); });
    VIS($('#hjP'), t, wt('H2', 'decides') - 0.1, 1e9, POP);
    VIS($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    VIS($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); VIS($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    [0, 1].forEach(i => { const t0 = wt('H4', ['thirty', 'sixty'][i]), u = M.clamp((t - t0) / (0.9 + 0.6 * i)); M.draw(hkP[i], t, t0 + 0.2, 0.9 + 0.6 * i); setBall(hkB[i], fH(i), u, 0.05, t > t0 - 0.05 && u < 1); });
    TILES.forEach((_, i) => VIS($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    VIS($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    VIS(plA, t, wt('P2', 'leaving') - 0.1, 1e9, { ...POP, sc: 0.3 }); VIS(plAT, t, wt('P2', 'leaving'), 1e9, { dy: 8 });
    M.draw(plPath, t, wt('P2', 'leaving') + 0.2, 1.2);
    VIS(plB, t, wt('P2', 'landing') - 0.1, 1e9, { ...POP, sc: 0.3 }); VIS(plBT, t, wt('P2', 'landing'), 1e9, { dy: 8 });
    M.draw(plBr, t, wt('P2', 'landing') + 0.4, 0.5); VIS(plBrT, t, wt('P2', 'landing') + 0.6, 1e9, { dy: 8 });
    const hs = M.io((t - wt('P3', 'same') + 0.1) / 0.3); plH.style.opacity = (0.5 * hs * (1 - M.io((t - T0('P4')) / 0.4))).toFixed(3); VIS(plHT, t, wt('P3', 'same'), 1e9, { dy: 8 });
    VIS($('#pr'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u = ((t - wt('P4', 'Only')) / 2.6) % 1, s1 = Math.max(0, u) * TT[1], on = t > wt('P4', 'Only') - 0.2;
    const bx = RO[0] + X(1, s1) * RS, by = RO[1] - Y(1, s1) * RS;
    attr(prB, 'cx', bx.toFixed(1)); attr(prB, 'cy', by.toFixed(1)); attr(prV, 'cy', by.toFixed(1)); attr(prH, 'cx', bx.toFixed(1));
    M.hide(prB, !on); M.hide(prV, !on); M.hide(prH, !on);
    VIS(prVT, t, wt('P4', 'up') - 0.1, 1e9, { dy: 8 }); VIS(prHT, t, wt('P4', 'sideways') - 0.1, 1e9, { dy: 8 });
    VIS(prL, t, wt('P4', 'lands') - 0.1, 1e9, { dy: 8 });
    VIS($('#prP'), t, wt('P4', 'decides') - 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    VIS($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    VIS($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    VIS($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    VIS($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const [sv, ph] = simS(t);
    [0, 1].forEach(i => {
      const ta = wt('S2', ['thirty', 'sixty'][i]), la = M.io((t - ta + 0.1) / 0.4) * (1 - M.io((t - tL - 0.2) / 0.3));
      sAim[i].set(SO[0], SO[1], SO[0] + 130 * Math.cos(A[i]) * la, SO[1] - 130 * Math.sin(A[i]) * la);
      attr(sAimT[i], 'x', SO[0] + 150 * Math.cos(A[i]) + 6); attr(sAimT[i], 'y', SO[1] - 150 * Math.sin(A[i]) + 8); sAimT[i].style.opacity = la.toFixed(3);
      const si = Math.min(sv, TT[i]), bx = SO[0] + X(i, si) * SP, by = SO[1] - Y(i, si) * SP - 13;
      attr(sB[i].b, 'cx', bx.toFixed(1)); attr(sB[i].b, 'cy', by.toFixed(1)); VIS(sB[i].b, t, tS1 + 0.5, 1e9, { ...POP, sc: 0.3 });
      const flying = sv > 0 && sv < TT[i] && (ph !== 2 || t > tRun) && t < tFreeze + (ph === 2 ? 0 : 1e9), ds = ph === 2 ? 0.06 : 0.12;
      sB[i].gh.forEach((c, k) => { const ss = si - ds * (k + 1); attr(c, 'cx', (SO[0] + X(i, ss) * SP).toFixed(1)); attr(c, 'cy', (SO[1] - Y(i, ss) * SP - 13).toFixed(1)); c.style.opacity = flying && ss > 0 ? [0.3, 0.2, 0.12][k] : 0; });
      const sMax = ph === 2 ? TT[i] : si;
      attr(sPath[i], 'd', sMax < 0.01 ? '' : pathD(u => [SO[0] + X(i, u * sMax) * SP, SO[1] - Y(i, u * sMax) * SP]));
      const landed = (ph === 1 && sv >= TT[i]) || (ph === 3 && sv >= TT[i]) || (ph === 2);
      landT[i].style.opacity = (ph === 1 || ph === 3) && sv >= TT[i] ? 1 : ph === 2 ? 0.35 : 0;
      // clocks + graph follow the sim
      const ct = ph === 2 ? Math.min(sv, TT[i]) : Math.min(sv, TT[i]);
      M.setT($('#ck' + i + 'v'), ct.toFixed(2));
      VIS($('#ck' + i + 's'), t, landed && ph !== 2 ? -1 : 1e9, 1e9, { dy: 0, fade: 0.01 });
      M.hide($('#ck' + i + 's'), !((ph === 1 || ph === 3) && sv >= TT[i]));
      gC[i](q => [q, Y(i, q)], 0, ph === 2 ? Math.min(sv, TT[i]) : Math.min(sv, TT[i]));
      gD[i](Math.min(sv, TT[i]), Y(i, sv), t > tS1 + 0.5);
    });
    $('#ck1').style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('S6', 'three') + 0.1) / 0.3));
    // slow-mo vectors on the 60 degree ball
    const vyv = V * Math.sin(A[1]) - g * Math.min(sv, TT[1]), b1x = SO[0] + X(1, sv) * SP, b1y = SO[1] - Y(1, sv) * SP - 13;
    const vOn = ph === 2 ? M.io((t - tR - 0.2) / 0.3) : 0;
    aVy.set(b1x, b1y, b1x, b1y - 6 * vyv * vOn); attr(lVy, 'x', (b1x + 12).toFixed(1)); attr(lVy, 'y', (b1y - 6 * vyv * vOn * 0.5 + 8).toFixed(1)); lVy.style.opacity = Math.abs(vyv) > 1.5 ? vOn : 0;
    aG.set(b1x, b1y + 18, b1x, b1y + 18 + 54 * vOn); attr(lG, 'x', (b1x + 10).toFixed(1)); attr(lG, 'y', (b1y + 66).toFixed(1)); lG.style.opacity = vOn;
    VIS($('#slo'), t, tR + 0.05, tP3 - 0.2, { dy: 0, dx: -16, outDur: 0.25 });
    attr(topT, 'x', (SO[0] + X(1, sTop) * SP).toFixed(1)); attr(topT, 'y', (SO[1] - Y(1, sTop) * SP - 44).toFixed(1));
    topT.style.opacity = (M.io((t - tTop) / 0.3) * (1 - M.io((t - tP3 + 0.4) / 0.3))).toFixed(3);
    gHalf.style.opacity = (M.io((t - tTop) / 0.3)).toFixed(3); M.hide(gHalf, t < tTop - 0.05);
    avS(t, wt('S5', 'down') + 0.3, T0('S6') - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    VIS($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); VIS(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); VIS(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); VIS(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    VIS($('#dr'), t, tStep[0] + 0.6, 1e9, { dx: 60, dy: 0 });
    dCur(q => [q, Y(1, q)], 0, TT[1] * M.io((t - tStep[0] - 0.9) / 1.4));
    VIS(dExT, t, tStep[0] + 1.2, 1e9, { dy: 0 });
    VIS(dR0, t, wt('D5', 'zero') - 0.1, 1e9, { ...POP, sc: 0.3 }); VIS(dR0T, t, wt('D5', 'launch') - 0.1, 1e9, { dy: 8 });
    VIS(dR1, t, wt('D6', 'landing') - 0.1, 1e9, { ...POP, sc: 0.3 }); VIS(dR1T, t, wt('D6', 'landing'), 1e9, { dy: 8 });
    PUC.write($('#dres'), t, wt('D6', 'T'), 1.0);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Time') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'upward') - 0.2, 0.9);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1');
    VIS($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c0'), t, wt('C2', 'upward'), 0.8); PUC.write($('#c1'), t, wt('C3', 'time'), 0.9); PUC.write($('#c2'), t, wt('C4', 'total'), 0.9);
    VIS($('#cP'), t, wt('C4', 'agree') - 0.1, 1e9, POP);
    VIS($('#cr'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const tc0 = wt('C2', 'falls'), sC = TT[1] * M.clamp((t - tc0) / 3.2), sH = Math.min(sC, sTop);
    const sShow = t < wt('C4', 'Coming') ? sH : Math.min(TT[1], sTop + (t - wt('C4', 'Coming')) * 1.1);
    cLine(q => [q, vy0 - g * q], 0, sShow); cDot(sShow, vy0 - g * sShow, t > tc0 - 0.2);
    VIS(cSl, t, wt('C2', 'g') - 0.1, 1e9, { dy: 8 });
    VIS(cUp, t, wt('C3', 'top') - 0.1, 1e9, { dy: 0, fade: 0.3 }); VIS(cTop, t, wt('C3', 'top'), 1e9, { dy: 8 }); VIS(cUpT, t, wt('C3', 'top') + 0.3, 1e9, { dy: 8 });
    VIS(cDn, t, wt('C4', 'same') - 0.1, 1e9, { dy: 0, fade: 0.3 }); VIS(cDnT, t, wt('C4', 'same'), 1e9, { dy: 8 });
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tB1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    VIS($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    VIS($('#kb0'), t, tK1 + 0.3, 1e9, { dy: 16 }); PUC.write($('#kb0a'), t, wt('K1', 'sin'), 0.6); PUC.write($('#kb0b'), t, wt('K1', 'two'), 0.7); VIS($('#kb0v'), t, wt('K1', 'About'), 1e9, POP);
    VIS($('#kb1'), t, T0('K2') - 0.1, 1e9, { dy: 16 }); PUC.write($('#kb1a'), t, wt('K2', 'sin'), 0.6); PUC.write($('#kb1b'), t, wt('K2', 'T') - 0.3, 0.7); VIS($('#kb1v'), t, wt('K2', 'three'), 1e9, POP);
    VIS($('#kbC'), t, wt('K2', 'seconds') + 0.2, 1e9, POP);
    VIS($('#kr'), t, tK1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const dEnd = 90 * M.io((t - tK1 - 0.9) / 2.0); kCur(d => [d, TA(d)], 0, dEnd);
    kP.forEach((p, i) => { const tt = i === 0 ? wt('K1', 'About') : i === 1 ? wt('K2', 'three') : 1e9; VIS(p.c, t, tt - 0.1, 1e9, { ...POP, sc: 0.3 }); VIS(p.l, t, tt, 1e9, { dy: 8 }); });
    VIS($('#th1'), t, tK3 + 0.05, OUT('B1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'longest') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Sin') });
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('W1');
    VIS($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#bF'), t, tB1 + 0.4, 0.8);
    VIS($('#bP0'), t, wt('B2', 'cos') - 0.1, 1e9, POP); M.draw(bX, t, wt('B2', 'cos'), 0.5);
    VIS($('#bP1'), t, wt('B2', 'sideways') - 0.1, 1e9, POP);
    VIS($('#br'), t, T0('B2') + 0.3, out, { dx: 60, dy: 0, ...o });
    // the two balls wait on the table; after the think card leaves, the answer plays in slow motion
    const u = M.clamp((t - tBplay) / tBlen), on = t > T0('B2') + 0.4;
    setBall(bDrop, fDrop, u, 0.07, on); setBall(bPush, fPush, u, 0.07, on);
    const pa = M.io((t - tBplay + 0.7) / 0.3) * (1 - M.io((t - tBplay) / 0.25));
    const [px0, py0] = fPush(0); bPushA.set(px0 - 16 - 70 * pa, py0, px0 - 16, py0);
    bLines.forEach((l, k) => l.style.opacity = (u >= [0.25, 0.5, 0.75][k] ? 0.5 : 0));
    VIS(bTag, t, tBplay - 0.5, 1e9, { dy: 0, dx: -12 });
    bLandT.style.opacity = M.io((t - tBplay - tBlen) / 0.3).toFixed(3);
    VIS($('#th2'), t, tB3 + 0.05, tBack, { dy: 36, ...o });
    th2(t, { tin: tB3, tOpts: wt('B3', 'Which') - 0.1, tCount: T1('B3') + 0.05, dur: 3, tAns: T0('B4') - 0.02, tWhy: T0('B4') + 0.3 });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    VIS($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    VIS($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    VIS($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const sW = 2 * M.clamp((t - T0('W2') - 0.6) / 2.0); wCur(q => [q, wy(q)], 0, sW); wDot(sW, wy(sW), t > T0('W2') + 0.5);
    M.draw(wBr[0], t, tW[1] + 0.3, 0.5); VIS(wBrT[0], t, tW[1] + 0.6, 1e9, { dy: 8 }); VIS(wTop, t, tW[1] + 0.2, 1e9, { dy: 8 });
    M.draw(wBr[1], t, tW[2] + 0.1, 0.5); VIS(wBrT[1], t, tW[2] + 0.4, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    VIS($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); VIS($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'Always') - 0.1 });
    M.draw(xUp, t, wt('X3', 'top') - 0.3, 0.6); VIS(xUpT, t, wt('X3', 'top'), 1e9, { dy: 8 });
    M.draw(xDn, t, wt('X3', 'down') - 0.3, 0.6); VIS(xDnT, t, wt('X3', 'down'), 1e9, { dy: 8 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'You') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    VIS($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    VIS($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    VIS($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => VIS($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
