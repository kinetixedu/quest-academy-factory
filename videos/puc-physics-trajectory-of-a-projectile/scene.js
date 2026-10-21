// PUC Physics Ep 42: Trajectory of a projectile (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K0 = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, VY = C.violet, GC = C.red, IN = C.ink;           // colour-coding: v and v_x blue, v_y violet, g red
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
// KaTeX colour shorthands
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const VX_ = tc(VC, 'v_0\\cos\\theta'), VY_ = tc(VY, 'v_0\\sin\\theta'), G_ = tc(GC, 'g'), V0 = tc(VC, 'v_0');
const TRAJ = `y = x\\tan\\theta - \\dfrac{${G_}\\,x^2}{2\\,${V0}^2\\cos^2\\theta}`;

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 7.5 12 12l7.1-4.5', 'M12 12v9.9'],
  paper: ['M5 6l5-2 4 3 5-1-1 6 2 5-6 1-3 3-4-3-3-1 1-6z'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  up: ['M12 19V5', 'm5 12 7-7 7 7'], down: ['M12 5v14', 'm19 12-7 7-7-7'], turn: ['M4 16c2-8 14-8 16 0', 'm16 13 4 3 3-4'],
  circle: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tK1 = T0('K1'), tK3 = T0('K3');
const tB1 = T0('B1'), tB4 = T0('B4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- physics (NCERT g = 9.8 m/s^2) ---------- */
const g = 9.8, V = 20, TH = Math.PI / 4, VXv = V * Math.cos(TH), VYv = V * Math.sin(TH), TF = 2 * VYv / g, TTOP = VYv / g;
const px = s => VXv * s, py = s => VYv * s - 0.5 * g * s * s;

/* ---------- title card: three throws ---------- */
const JOBS = [['paper', 'Paper ball', 'INTO A BIN', 'paper'], ['ball', 'Football', 'A LONG KICK', 'football'], ['drop', 'Hose water', 'A GARDEN JET', 'hose']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: three curves + the paper ball ---------- */
const hj = $('#hjS'), HG = 440;
mk(hj, 'line', { x1: 36, y1: HG, x2: 748, y2: HG, stroke: IN, 'stroke-width': 3 });
for (let x = 48; x < 748; x += 28) mk(hj, 'line', { x1: x, y1: HG + 4, x2: x - 14, y2: HG + 18, stroke: C.dim, 'stroke-width': 2 });
const HC = [[60, 190, 110, 'paper ball'], [280, 250, 270, 'football'], [560, 180, 160, 'hose water']];   // x0, range, height
const hjP = HC.map(([x0, R, H, n], i) => { const p = mk(hj, 'path', { d: `M${x0},${HG} Q${x0 + R / 2},${HG - 2 * H} ${x0 + R},${HG}`, fill: 'none', stroke: [C.ac, IN, VY][i], 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-dasharray': i === 2 ? '' : '' });
  const l = txt(hj, x0 + R / 2, HG - H - 22, n, { 'text-anchor': 'middle', 'font-size': 20, fill: [C.ac, IN, VY][i], 'font-weight': 600 }); return [p, l]; });
const hk = $('#hkS'), PB = [232, 330], PE = [596, 446], PH = 190;     // paper ball arc over the study scene
const pbX = u => M.lerp(PB[0], PE[0], u), pbY = u => M.lerp(PB[1], PE[1], u) - 4 * PH * u * (1 - u);
const bin = mk(hk, 'path', { d: `M${PE[0] - 30},${PE[1] - 22} L${PE[0] + 30},${PE[1] - 22} L${PE[0] + 22},${PE[1] + 26} L${PE[0] - 22},${PE[1] + 26} Z`, fill: '#8D99AE', stroke: IN, 'stroke-width': 2.5 });
const pbPath = mk(hk, 'path', { d: Array.from({ length: 41 }, (_, i) => (i ? 'L' : 'M') + pbX(i / 40).toFixed(1) + ',' + pbY(i / 40).toFixed(1)).join(''), fill: 'none', stroke: C.ac, 'stroke-width': 3.5, 'stroke-dasharray': '8 8' });
const pbG = [0, 1, 2].map(k => mk(hk, 'circle', { r: 13, fill: '#FFFFFF', stroke: IN, 'stroke-width': 2.5, opacity: 0 }));
const pb = mk(hk, 'circle', { r: 13, fill: '#FFFFFF', stroke: IN, 'stroke-width': 3 });
const TILES = [['up', 'Rose'], ['turn', 'Turned'], ['down', 'Dropped'], ['circle', 'A circle?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, i === 3 ? GC : C.ac, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'rose'), wt('H4', 'turned'), wt('H4', 'dropped'), wt('H4', 'circle')];
const tFlick = wt('H3', 'flicked');

/* ---------- P: what is a trajectory ---------- */
const pl = $('#plS'), PO = [80, 440], PS = 15;
mk(pl, 'line', { x1: 36, y1: PO[1], x2: 748, y2: PO[1], stroke: IN, 'stroke-width': 3 });
const plPath = mk(pl, 'path', { d: Array.from({ length: 61 }, (_, i) => { const s = TF * i / 60; return (i ? 'L' : 'M') + (PO[0] + px(s) * PS).toFixed(1) + ',' + (PO[1] - py(s) * PS).toFixed(1); }).join(''), fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-linecap': 'round' });
const PPT = [0.5, 1.45, 2.4].map(s => { const x = PO[0] + px(s) * PS, y = PO[1] - py(s) * PS; const d = mk(pl, 'circle', { cx: x, cy: y, r: 9, fill: IN });
  const lab = txt(pl, x + (s < 1 ? -16 : s > 2 ? 16 : 0), y - 30, `(${px(s).toFixed(1)}, ${py(s).toFixed(1)})`, { 'text-anchor': s < 1 ? 'end' : s > 2 ? 'start' : 'middle', 'font-size': 20, fill: IN, 'font-weight': 600 }); return [d, lab]; });
const plT = txt(pl, 36, 520, 'each point = (x, y) in metres', { 'font-size': 20 });
$('#pe0k').innerHTML = `<span class="lbl" style="position:static;margin-right:22px">ACROSS</span>` + K(`x = ${VX_}\\;t`);
$('#pe1k').innerHTML = `<span class="lbl" style="position:static;margin-right:22px">UP</span>` + K(`y = ${VY_}\\;t - \\tfrac{1}{2}${G_}\\,t^2`);
$('#prF').innerHTML = K(`\\text{remove } t \\;\\Rightarrow\\; y \\text{ using only } x`);

/* ---------- S: the launch (sim + readout + graph) ---------- */
const s = $('#simS'), SO = [70, 440], SP = 16, VS = 6;      // 16 px per metre, 6 px per m/s for vectors
mk(s, 'line', { x1: 36, y1: SO[1], x2: 748, y2: SO[1], stroke: IN, 'stroke-width': 3 });
for (let x = 48; x < 748; x += 28) mk(s, 'line', { x1: x, y1: SO[1] + 4, x2: x - 14, y2: SO[1] + 18, stroke: C.dim, 'stroke-width': 2 });
const sAng = mk(s, 'path', { d: `M${SO[0] + 54},${SO[1]} A54,54 0 0 0 ${(SO[0] + 54 * Math.cos(TH)).toFixed(1)},${(SO[1] - 54 * Math.sin(TH)).toFixed(1)}`, fill: 'none', stroke: TG, 'stroke-width': 2.5 });
const sAngT = txt(s, SO[0] + 64, SO[1] - 14, '45°', { 'font-size': 20, fill: TG, 'font-weight': 600 });
const sPath = mk(s, 'path', { d: '', fill: 'none', stroke: IN, 'stroke-width': 2.5, 'stroke-dasharray': '4 8', opacity: 0.55 });
const STAMP = [0.5, 1, 1.5, 2, 2.5].map(ts => ({ ts, c: mk(s, 'circle', { cx: SO[0] + px(ts) * SP, cy: SO[1] - py(ts) * SP, r: 8, fill: C.ac, opacity: 0 }), k: mk(s, 'line', { x1: SO[0] + px(ts) * SP, y1: SO[1] - 10, x2: SO[0] + px(ts) * SP, y2: SO[1] + 10, stroke: C.ac, 'stroke-width': 4, 'stroke-linecap': 'round' }) }));
const stepT = txt(s, SO[0] + px(1) * SP, SO[1] + 46, 'EQUAL STEPS OF x IN EQUAL TIMES', { 'font-size': 18, fill: C.ac, 'font-weight': 600 });
const ghostS = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 14, fill: IN, opacity: 0 }));
const ball = mk(s, 'circle', { r: 14, fill: IN });
const aV = PUC.arrow(s, VC, 6, 18), aX = PUC.arrow(s, VC, 5, 14), aY = PUC.arrow(s, VY, 5, 14), aG = PUC.arrow(s, GC, 5, 14);
const lX = txt(s, 0, 0, 'vₓ', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: VC });
const lY = txt(s, 0, 0, 'v_y', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: VY }); lY.textContent = 'vᵧ';
const lG = txt(s, 0, 0, 'g', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 26, fill: GC });
const lV = txt(s, 0, 0, '20 m/s', { 'font-size': 22, fill: VC, 'font-weight': 600 });
const topT = txt(s, 0, 0, 'vᵧ = 0 AT THE TOP', { 'font-size': 20, fill: VY, 'font-weight': 600, 'text-anchor': 'middle' });
$('#roA').innerHTML = `<span class="k" style="color:${IN};font-style:normal">t</span><span class="v" id="rT">0.00</span><span class="u">s</span>
  <span class="k" style="color:${IN}">x</span><span class="v" id="rX">0.0</span><span class="u">m</span>
  <span class="k" style="color:${IN}">y</span><span class="v" id="rY">0.0</span><span class="u">m</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v<sub>x</sub></span><span class="v" id="rVx" style="color:${VC}">14.1</span><span class="u">m/s</span>
  <span class="k" style="color:${VY}">v<sub>y</sub></span><span class="v" id="rVy" style="color:${VY}">14.1</span><span class="u">m/s</span>
  <span class="k" style="color:${GC}">g</span><span class="v" style="color:${GC}">9.8</span><span class="u">m/s²</span>`;
const G = PUC.graph($('#grS'), { x: 110, y: 66, w: 600, h: 150, xmax: 46, ymin: 0, ymax: 12, xt: [0, 10, 20, 30, 40], yt: [0, 5, 10], xl: 'x (m)', yl: 'y (m)' });
const gCurve = G.curve(C.ac, 5), gDot = G.dot(IN, 10);
// sim clock: phase 1 (launch, uniform slow time), phase 2 (slow-mo replay 0.25x through the top), phase 3 (relaunch, graph redraws)
const tL = wt('S2', 'leaves'), tLand = T1('S4') - 0.3, R1 = TF / (tLand - tL);
const tR = T0('S5') + 0.05, tZero = wt('S5', 'zero');
let tRun = tZero - (TTOP - 0.94) / 0.25, s2 = 0.94; if (tRun < tR + 0.5) { tRun = tR + 0.5; s2 = TTOP - 0.25 * (tZero - tRun); }
const tL3 = wt('S6', 'graph') + 0.1, R3 = 0.5;
const simS = t => {
  if (t < tL) return [0, 1];
  if (t < tR) return [Math.min(TF, (t - tL) * R1), 1];
  if (t < tL3) return [Math.min(s2 + 1.0, s2 + Math.max(0, t - tRun) * 0.25), 2];
  return [Math.min(TF, (t - tL3) * R3), 3];
};
const avS = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So x ticks along like a clock!' });

/* ---------- D: the derivation ---------- */
const STEPS = [[`x = ${VX_}\\;t`, 'across: no acceleration'], [`t = x \\,/\\, (${VX_})`, 'turn it around'], [`y = ${VY_}\\;t - \\tfrac{1}{2}${G_}\\,t^2`, 'up and down: gravity pulls'], [`\\text{put } t \\text{ from step 2 into step 3}`, 'remove time']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst3 .sx').innerHTML = '<span style="font:500 30px Poppins">Put <i>t</i> from step 2 into step 3</span>'; $('#dst3 .sx').style.top = '6px';
const tStep = [wt('D2', 'So'), wt('D3', 'Time'), wt('D4', 'y'), wt('D5', 'Put')];
$('#dsub').innerHTML = K(`y = ${VY_}\\left(\\dfrac{x}{${VX_}}\\right) - \\tfrac{1}{2}${G_}\\left(\\dfrac{x}{${VX_}}\\right)^{2}`);
$('#dres').innerHTML = `<span id="dr0">${K('y = x\\tan\\theta')}</span><span id="dr1">${K('\\;-\\;')}</span><span id="dr2">${K(`\\dfrac{${G_}\\,x^2}{2\\,${V0}^2\\cos^2\\theta}`)}</span>`;
const drS = $('#drS'), drB0 = mk(drS, 'path', { d: '', fill: 'none', stroke: VC, 'stroke-width': 3, 'stroke-linecap': 'round' }), drB1 = mk(drS, 'path', { d: '', fill: 'none', stroke: GC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const tD6a = wt('D6', 'tan'), tD6b = wt('D6', 'squared');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(TRAJ);

/* ---------- C: why a parabola ---------- */
$('#cF').innerHTML = K(`y = ${tc(VC, 'a')}\\,x - ${tc(GC, 'b')}\\,x^2`);
$('#caK').innerHTML = K(`${tc(VC, 'a')}\\,x, \\quad ${tc(VC, 'a')} = \\tan\\theta`);
$('#cbK').innerHTML = K(`-${tc(GC, 'b')}\\,x^2, \\quad ${tc(GC, 'b')} = ${G_} \\,/\\, (2${V0}^2\\cos^2\\theta)`);
const cr = $('#crS'), CO = [90, 470], CX = 14, CY = 9, Ca = 1, Cb = 0.0245;   // 20 m/s at 45 degrees, x 14 px/m, y 9 px/m
mk(cr, 'line', { x1: 36, y1: CO[1], x2: 748, y2: CO[1], stroke: IN, 'stroke-width': 3 });
mk(cr, 'line', { x1: CO[0], y1: CO[1], x2: CO[0], y2: 80, stroke: IN, 'stroke-width': 2, opacity: 0.35 });
const cLine = mk(cr, 'line', { x1: CO[0], y1: CO[1], x2: CO[0] + 42 * CX, y2: CO[1] - 42 * CY, stroke: VC, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
const cLineT = txt(cr, CO[0] + 42 * CX - 24, CO[1] - 42 * CY + 6, 'y = ax', { 'font-size': 22, fill: VC, 'font-weight': 600, 'text-anchor': 'end' });
const cPar = mk(cr, 'path', { d: Array.from({ length: 61 }, (_, i) => { const x = 40.8 * i / 60; return (i ? 'L' : 'M') + (CO[0] + x * CX).toFixed(1) + ',' + (CO[1] - (Ca * x - Cb * x * x) * CY).toFixed(1); }).join(''), fill: 'none', stroke: IN, 'stroke-width': 5, 'stroke-linecap': 'round' });
const CD = [10, 20, 30, 40].map((x, i) => { const yl = CO[1] - Ca * x * CY, yp = CO[1] - (Ca * x - Cb * x * x) * CY; const a = PUC.arrow(cr, GC, 4, 12);
  const l = txt(cr, CO[0] + x * CX + 12, (yl + yp) / 2 + 7, ['1×', '4×', '9×', '16×'][i], { 'font-size': 20, fill: GC, 'font-weight': 600 }); return { x: CO[0] + x * CX, yl, yp, a, l }; });
const cParT = txt(cr, CO[0] + 20.4 * CX, CO[1] - 10.2 * CY + 40, 'parabola', { 'font-size': 22, fill: IN, 'font-weight': 600, 'text-anchor': 'middle' });
const tCd = [wt('C4', 'pulls'), wt('C4', 'more'), wt('C4', 'grows'), wt('C4', 'gravity')];

/* ---------- K: side by side + think ---------- */
const KO = [80, 440], KR = 600;           // line y = x (px), parabola y = x - x^2/600
const kl = $('#klS'), kr = $('#krS');
[kl, kr].forEach(sv => { mk(sv, 'line', { x1: 36, y1: KO[1], x2: 748, y2: KO[1], stroke: IN, 'stroke-width': 3 }); for (let x = 48; x < 748; x += 28) mk(sv, 'line', { x1: x, y1: KO[1] + 4, x2: x - 14, y2: KO[1] + 18, stroke: C.dim, 'stroke-width': 2 }); });
const klLine = mk(kl, 'line', { x1: KO[0], y1: KO[1], x2: KO[0] + 360, y2: KO[1] - 360, stroke: VC, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' });
const krLine = mk(kr, 'line', { x1: KO[0], y1: KO[1], x2: KO[0] + 360, y2: KO[1] - 360, stroke: VC, 'stroke-width': 3, 'stroke-dasharray': '10 8', opacity: 0.45 });
const krPar = mk(kr, 'path', { d: Array.from({ length: 61 }, (_, i) => { const x = KR * i / 60; return (i ? 'L' : 'M') + (KO[0] + x).toFixed(1) + ',' + (KO[1] - (x - x * x / KR)).toFixed(1); }).join(''), fill: 'none', stroke: IN, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const KD = [100, 200, 300].map((x, i) => ({ x: KO[0] + x, yl: KO[1] - x, yp: KO[1] - (x - x * x / KR), a: PUC.arrow(kr, GC, 4, 12), l: txt(kr, KO[0] + x + 12, KO[1] - x + (x * x / KR) / 2 + 7, ['1', '4', '9'][i], { 'font-size': 22, fill: GC, 'font-weight': 600 }) }));
const mkBall = sv => ({ gh: [0.3, 0.2, 0.12].map(() => mk(sv, 'circle', { r: 13, fill: IN, opacity: 0 })), b: mk(sv, 'circle', { r: 13, fill: IN }) });
const kbL = mkBall(kl), kbR = mkBall(kr);
const setBall = (B, f, u, du, on = true) => { const [x, y] = f(u); attr(B.b, 'cx', x.toFixed(1)); attr(B.b, 'cy', y.toFixed(1)); M.hide(B.b, !on);
  B.gh.forEach((c, k) => { const uu = u - du * (k + 1), [gx, gy] = f(uu); attr(c, 'cx', gx.toFixed(1)); attr(c, 'cy', gy.toFixed(1)); c.style.opacity = on && uu > 0 && Math.hypot(x - gx, y - gy) > 3 ? [0.3, 0.2, 0.12][k] : 0; }); };
const fL = u => [KO[0] + 420 * u, KO[1] - 420 * u], fR = u => { const x = KR * u; return [KO[0] + x, KO[1] - (x - x * x / KR)]; };
const th1 = PUC.think($('#th1'), { q: 'A ball rolls off a table, moving straight across. Is its path a parabola?', opts: ['Yes', 'No'], right: 0, why: 'θ = 0, so tan θ = 0: y = −gx² / (2v₀²), half a parabola.' });

/* ---------- B: what changes the curve + think ---------- */
$('#bF').innerHTML = K(`${tc(GC, 'b')} = \\dfrac{${G_}}{2\\,${tc(VC, 'v_0^{\\,2}')}\\cos^2\\theta}`);
$('#b0k').innerHTML = K(`${V0} = 10\\,\\text{m/s}`); $('#b0v').innerHTML = K(`${tc(GC, 'b')} = 0.098`);
$('#b1k').innerHTML = K(`${V0} = 20\\,\\text{m/s}`); $('#b1v').innerHTML = K(`${tc(GC, 'b')} = 0.0245`);
$('#blS').remove();
const br = $('#brS'), BO = [80, 470], BX = 15;
mk(br, 'line', { x1: 36, y1: BO[1], x2: 748, y2: BO[1], stroke: IN, 'stroke-width': 3 });
for (let x = 48; x < 748; x += 28) mk(br, 'line', { x1: x, y1: BO[1] + 4, x2: x - 14, y2: BO[1] + 18, stroke: C.dim, 'stroke-width': 2 });
const brLine = mk(br, 'line', { x1: BO[0], y1: BO[1], x2: BO[0] + 22 * BX, y2: BO[1] - 22 * BX, stroke: VC, 'stroke-width': 3, 'stroke-dasharray': '10 8', opacity: 0.5 });
const brLineT = txt(br, BO[0] + 22 * BX + 10, BO[1] - 22 * BX + 4, 'same start: y = x tan 45°', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const traj = (v, n = 60) => { const T = 2 * v * Math.SQRT1_2 / g; return Array.from({ length: n + 1 }, (_, i) => { const t = T * i / n, x = v * Math.SQRT1_2 * t, y = v * Math.SQRT1_2 * t - 0.5 * g * t * t; return (i ? 'L' : 'M') + (BO[0] + x * BX).toFixed(1) + ',' + (BO[1] - y * BX).toFixed(1); }).join(''); };
const brP = [mk(br, 'path', { d: traj(10), fill: 'none', stroke: IN, 'stroke-width': 4.5, 'stroke-linecap': 'round' }), mk(br, 'path', { d: traj(20), fill: 'none', stroke: VC, 'stroke-width': 4.5, 'stroke-linecap': 'round' })];
const brT = [txt(br, BO[0] + 10.2 * BX + 8, BO[1] - 20, '10 m/s', { 'font-size': 22, fill: IN, 'font-weight': 600 }), txt(br, BO[0] + 20.4 * BX, BO[1] - 10.2 * BX - 20, '20 m/s', { 'font-size': 22, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' })];
const bB = [mkBall(br), mkBall(br)];
bB[1].b.setAttribute('fill', VC); bB[1].gh.forEach(c => c.setAttribute('fill', VC));
const fB = v => u => { const T = 2 * v * Math.SQRT1_2 / g, t = T * u, x = v * Math.SQRT1_2 * t, y = v * Math.SQRT1_2 * t - 0.5 * g * t * t; return [BO[0] + x * BX, BO[1] - y * BX]; };
const th2 = PUC.think($('#th2'), { q: 'Both leave at 45°. One is twice as fast. Ten metres across, which one is higher?', opts: ['The faster one', 'The slower one'], right: 0, why: 'Same start line, but its smaller b means it dropped less.' });
const avB = PUC.avatar($('#sB'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Faster throw, gentler bend.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\theta = 45^\\circ:\\;\\; \\tan\\theta = 1,\\;\\; \\cos^2\\theta = \\tfrac{1}{2}`)],
  [K(`${tc(GC, 'b')} = \\dfrac{9.8}{2 \\times 400 \\times \\frac{1}{2}} = 0.0245`)],
  [K(`y = 10 \\times 1 - 0.0245 \\times 10^2`)],
  [K(`y = 10 - 2.45 = ${tc(VC, '7.55\\,\\text{m}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const wr = $('#wrS'), WO = [80, 470], WX = 15;
mk(wr, 'line', { x1: 36, y1: WO[1], x2: 748, y2: WO[1], stroke: IN, 'stroke-width': 3 });
for (let x = 48; x < 748; x += 28) mk(wr, 'line', { x1: x, y1: WO[1] + 4, x2: x - 14, y2: WO[1] + 18, stroke: C.dim, 'stroke-width': 2 });
[0, 10, 20, 30, 40].forEach(x => { mk(wr, 'line', { x1: WO[0] + x * WX, y1: WO[1] - 6, x2: WO[0] + x * WX, y2: WO[1] + 6, stroke: IN, 'stroke-width': 2 }); txt(wr, WO[0] + x * WX, WO[1] + 44, x, { 'text-anchor': 'middle', fill: IN, 'font-weight': 600 }); });
txt(wr, 748, WO[1] + 44, 'm', { 'text-anchor': 'end' });
const wPath = mk(wr, 'path', { d: traj(20), fill: 'none', stroke: VC, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const wB = mkBall(wr), fW = fB(20);
const wV = mk(wr, 'line', { x1: WO[0] + 10 * WX, y1: WO[1], x2: WO[0] + 10 * WX, y2: WO[1] - 7.55 * WX, stroke: IN, 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const wP = mk(wr, 'circle', { cx: WO[0] + 10 * WX, cy: WO[1] - 7.55 * WX, r: 10, fill: IN });
const wPT = txt(wr, WO[0] + 10 * WX + 18, WO[1] - 7.55 * WX + 44, 'y = 7.55 m at x = 10 m', { 'font-size': 22, fill: IN, 'font-weight': 600 });
const tW = [wt('W3', 'At'), wt('W4', 'So'), wt('W5', 'Put'), wt('W6', 'y')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`y = x\\tan\\theta - \\dfrac{g x^2}{2 v_0^2 \\cos\\theta}`), right: K(`y = x\\tan\\theta - \\dfrac{g x^2}{2 v_0^2 \\cos^2\\theta}`), y0: 74, y1: 168 });
$('#xF').innerHTML = K(`t^2 = \\dfrac{x^2}{v_0^2\\cos^2\\theta}`);
const where = PUC.where($('#wa'), { on: [], type: 'Given a trajectory equation, find the angle, the speed or the range from it' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A projectile moves along ${K('y = \\sqrt{3}\\,x - \\dfrac{x^2}{20}')} (x, y in m, g = 10 m/s²). Find the angle of projection and the launch speed.`, qW: 780,
  opts: ['60° and 20 m/s', '30° and 20 m/s', '60° and 10 m/s', '30° and 10√3 m/s'], right: 0, cols: 2, optW: 474, optH: 84, optY: 330 });
const so = PUC.solution($('#so'), [[K('\\tan\\theta = \\sqrt{3}')], [K('\\theta = 60^\\circ')], [K('\\dfrac{g}{2v_0^2\\cos^2\\theta} = \\dfrac{1}{20}')], [K('\\cos^2 60^\\circ = \\tfrac14 \\Rightarrow v_0^2 = 400')], [K('v_0 = 20\\,\\text{m/s}')]], { y0: 96, dy: 100 });
const tSo = [wt('A2', 'Tan'), wt('A2', 'sixty'), wt('A3', 'Next'), wt('A3', 'Cos'), wt('A3', 'twenty', 1)];
const fc = PUC.fcard($('#sF'), { x: 410, y: 250, w: 1100, h: 500, title: 'Recap · trajectory of a projectile', y0: 84, dy: 110, txt: [0, 1, 1, 1],
  lines: [K(`y = x\\tan\\theta - ${G_}\\,x^2 \\,/\\, (2${V0}^2\\cos^2\\theta)`), '<b>How</b>: x gives t, put that t into y', '<b>Shape</b>: y = ax − bx², a parabola', '<b>a</b> = tan θ sets the start · <b>b</b> sets the bend'] });
const YQ = ['Why do we remove time to find the shape of the path?', 'In the trajectory equation, why is cos θ squared?', 'What would the path be if there were no gravity?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 43', topic: '30° or 60°: which stays up longer? Time of Flight', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const apx = 160 + SO[0] + px(TTOP) * SP, apy = 270 + SO[1] - py(TTOP) * SP;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tR + 0.1, 1.06, 960, 540], [tL3 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; TILES.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  // result terms: brackets + labels under the two parts
  const r = $('#dres'), a = $('#dr0'), c = $('#dr2'), bt = r.offsetTop + r.offsetHeight + 8;
  const ax0 = r.offsetLeft + a.offsetLeft + a.offsetWidth * 0.32, ax1 = r.offsetLeft + a.offsetLeft + a.offsetWidth, cx0 = r.offsetLeft + c.offsetLeft, cx1 = cx0 + c.offsetWidth;
  drB0.setAttribute('d', `M${ax0} ${bt} v12 H${ax1} v-12`); drB1.setAttribute('d', `M${cx0} ${bt} v12 H${cx1} v-12`);
  const l0 = $('#drL0'), l1 = $('#drL1'); l0.style.left = Math.max(36, (ax0 + ax1) / 2 - l0.offsetWidth / 2) + 'px'; l0.style.top = (bt + 28) + 'px';
  l1.style.left = Math.min(748 - l1.offsetWidth, (cx0 + cx1) / 2 - l1.offsetWidth / 2) + 'px'; l1.style.top = (bt + 64) + 'px';
}
const f1 = (n, d = 1) => (Math.abs(n) < 0.05 && d === 1 ? 0 : n).toFixed(d);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card: three throws pop in with their words */
  JOBS.forEach((_, i) => VIS($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    VIS($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    HC.forEach((_, i) => { M.draw(hjP[i][0], t, tMorph + 0.5 + i * 0.5, 0.7); VIS(hjP[i][1], t, tMorph + 0.9 + i * 0.5, 1e9, { dy: 8 }); });
    VIS($('#hjP'), t, wt('H2', 'curve') - 0.1, 1e9, POP);
    VIS($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    VIS($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); VIS($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    VIS(bin, t, tH3 + 0.4, 1e9, POP);
    // the flick: x uniform in time, y a parabola; plays at the word, again as the tiles appear
    const fl = t < tH4 ? M.clamp((t - tFlick) / 1.3) : M.clamp((t - tH4) / 2.4);
    const onB = t >= tFlick - 0.1;
    attr(pb, 'cx', pbX(fl).toFixed(1)); attr(pb, 'cy', pbY(fl).toFixed(1)); M.hide(pb, !onB);
    pbG.forEach((c, k) => { const u = fl - 0.05 * (k + 1); attr(c, 'cx', pbX(u).toFixed(1)); attr(c, 'cy', pbY(u).toFixed(1)); c.style.opacity = onB && u > 0 && fl < 1 ? [0.3, 0.2, 0.12][k] : 0; });
    M.draw(pbPath, t, tFlick + 1.4, 0.9);
    TILES.forEach((_, i) => { const el = $('#wq' + i); VIS(el, t, tTile[i] - 0.1, 1e9, POP); if (i === 3) el.style.background = mix(C.soft, C.redBg, M.io((t - tTile[3]) / 0.3)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    VIS($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(plPath, t, wt('P2', 'path') - 0.2, 1.0);
    const tp = [wt('P2', 'Every'), wt('P2', 'pair'), wt('P2', 'x')];
    PPT.forEach(([d, l], i) => { VIS(d, t, tp[i] - 0.1, 1e9, { ...POP, sc: 0.3 }); VIS(l, t, tp[i], 1e9, { dy: 8 }); });
    VIS(plT, t, wt('P2', 'numbers'), 1e9, { dy: 8 });
    VIS($('#pr'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    VIS($('#pe0'), t, wt('P3', 'One') - 0.1, 1e9, { dy: 16 }); VIS($('#pe1'), t, wt('P3', 'One', 1) - 0.1, 1e9, { dy: 16 });
    VIS($('#prL'), t, wt('P4', 'path') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#prF'), t, wt('P4', 'remove'), 0.8);
    VIS($('#prP'), t, wt('P4', 'only') - 0.1, 1e9, POP);
    // t fades in the two equations as "remove time" is said
    ['#pe0', '#pe1'].forEach(id => $(id).style.background = mix(C.soft, C.ac2, M.io((t - wt('P4', 'remove')) / 0.3)));
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    VIS($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    VIS($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    VIS($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    VIS($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const [sv, ph] = simS(t), bx = SO[0] + px(sv) * SP, by = SO[1] - py(sv) * SP, moving = ph !== 2 || t > tRun;
    attr(ball, 'cx', bx.toFixed(1)); attr(ball, 'cy', by.toFixed(1));
    VIS(ball, t, tS1 + 0.5, 1e9, { ...POP, sc: 0.3 });
    const ds = ph === 1 ? 0.35 : ph === 2 ? 0.08 : 0.18;
    ghostS.forEach((c, k) => { const ss = sv - ds * (k + 1); attr(c, 'cx', (SO[0] + px(ss) * SP).toFixed(1)); attr(c, 'cy', (SO[1] - py(ss) * SP).toFixed(1)); c.style.opacity = moving && ss > 0 && sv < TF - 0.01 && t > tL ? [0.3, 0.2, 0.12][k] : 0; });
    // dashed path behind the ball: what has been flown so far in this run
    const sMax = ph === 1 ? sv : ph === 2 ? TF : sv;
    attr(sPath, 'd', sMax <= 0.01 ? '' : Array.from({ length: 41 }, (_, i) => { const q = sMax * i / 40; return (i ? 'L' : 'M') + (SO[0] + px(q) * SP).toFixed(1) + ',' + (SO[1] - py(q) * SP).toFixed(1); }).join(''));
    VIS(sAng, t, wt('S2', 'forty') - 0.1, tL3, { dy: 0, fade: 0.2 }); VIS(sAngT, t, wt('S2', 'forty'), tL3, { dy: 0, fade: 0.2 });
    // launch vector at the word "twenty", then components follow the ball
    const lv = M.io((t - wt('S2', 'twenty') + 0.1) / 0.4) * (1 - M.io((t - tL - 0.3) / 0.3));
    aV.set(SO[0], SO[1], SO[0] + VS * V * Math.cos(TH) * lv, SO[1] - VS * V * Math.sin(TH) * lv);
    attr(lV, 'x', SO[0] + 70); attr(lV, 'y', SO[1] - 110); lV.style.opacity = lv.toFixed(3);
    const vyv = VYv - g * sv, cOn = t > tL + 0.2 ? 1 : 0;
    const xOn = cOn * M.io((t - wt('S3', 'blue') + 0.1) / 0.3), yOn = cOn * M.io((t - wt('S4', 'violet') + 0.1) / 0.3), gOn = cOn * M.io((t - wt('S4', 'gravity') + 0.1) / 0.3) * (sv < TF - 0.01 ? 1 : 0);
    aX.set(bx, by, bx + VS * VXv * xOn, by); attr(lX, 'x', (bx + VS * VXv * xOn + 8).toFixed(1)); attr(lX, 'y', (by + 8).toFixed(1)); lX.style.opacity = xOn;
    aY.set(bx, by, bx, by - VS * vyv * yOn); attr(lY, 'x', (bx - 30).toFixed(1)); attr(lY, 'y', (by - VS * vyv * yOn * 0.5 + 8).toFixed(1)); lY.style.opacity = Math.abs(vyv) > 1.5 ? yOn : 0;
    aG.set(bx, by + 18, bx, by + 18 + 54 * gOn); attr(lG, 'x', (bx + 10).toFixed(1)); attr(lG, 'y', (by + 64).toFixed(1)); lG.style.opacity = gOn;
    STAMP.forEach(({ ts, c, k }) => { const seen = (ph === 1 && sv >= ts) || ph > 1; const on = t >= wt('S3', 'equal') - 0.2 && seen ? 1 : 0; c.style.opacity = (0.28 * on).toFixed(2); M.hide(k, !on); });
    VIS(stepT, t, wt('S3', 'equal'), 1e9, { dy: 8 });
    // slow-mo replay tag and the top label
    VIS($('#slo'), t, tR + 0.05, tL3 - 0.2, { dy: 0, dx: -16, outDur: 0.25 });
    const atTop = ph === 2 && Math.abs(sv - TTOP) < 0.06; attr(topT, 'x', (SO[0] + px(TTOP) * SP).toFixed(1)); attr(topT, 'y', (SO[1] - py(TTOP) * SP - 34).toFixed(1));
    topT.style.opacity = M.io((t - tZero + 0.1) / 0.3) * (1 - M.io((t - tL3 + 0.6) / 0.3));
    // readout follows the ball every frame
    M.setT($('#rT'), sv.toFixed(2)); M.setT($('#rX'), f1(px(sv))); M.setT($('#rY'), f1(py(sv))); M.setT($('#rVy'), f1(atTop ? 0 : vyv));
    // graph: y against x, dot linked to the ball
    const s0 = ph === 2 ? TF : sv; gCurve(q => [px(q), Math.max(0, py(q))], 0, t < tL ? 0 : s0);
    gDot(px(sv), Math.max(0, py(sv)), t > tS1 + 0.5);
    avS(t, wt('S3', 'times') + 0.4, T0('S5') - 0.2);
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    VIS($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); VIS(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); VIS(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); VIS(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    VIS($('#dr'), t, tStep[3] - 0.1, 1e9, { dx: 60, dy: 0 });
    PUC.write($('#dsub'), t, wt('D5', 'this'), 1.0);
    PUC.write($('#dres'), t, T0('D6'), 1.0);
    M.draw(drB0, t, tD6a - 0.1, 0.4); VIS($('#drL0'), t, tD6a, 1e9, { dy: 8 });
    M.draw(drB1, t, tD6b - 0.2, 0.4); VIS($('#drL1'), t, tD6b, 1e9, { dy: 8 });
    VIS($('#drP'), t, T1('D6') - 0.2, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Remove') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'parabola') - 0.3, 0.9);
  }

  /* C: why a parabola */
  const cOn2 = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn2);
  if (cOn2) {
    const out = OUT('K1');
    VIS($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#cF'), t, wt('C2', 'y'), 0.8);
    VIS($('#cfL'), t, wt('C2', 'fixed') - 0.1, 1e9, { dy: 8 });
    VIS($('#ca'), t, T0('C3') - 0.05, 1e9, { dy: 16 }); VIS($('#caV'), t, wt('C3', 'straight') - 0.1, 1e9, { dy: 0, dx: 12 });
    VIS($('#cb'), t, T0('C4') - 0.05, 1e9, { dy: 16 }); VIS($('#cbV'), t, wt('C4', 'down') - 0.1, 1e9, { dy: 0, dx: 12 });
    VIS($('#cP'), t, wt('C4', 'parabola') - 0.2, 1e9, POP);
    VIS($('#cr'), t, T0('C2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(cLine, t, wt('C3', 'straight') - 0.2, 0.8); VIS(cLineT, t, wt('C3', 'line'), 1e9, { dy: 8 });
    CD.forEach((d, i) => { const u = M.io((t - tCd[i]) / 0.4); d.a.set(d.x, d.yl, d.x, d.yl + (d.yp - d.yl) * u); d.l.style.opacity = u.toFixed(3); });
    M.draw(cPar, t, wt('C4', 'bent') - 0.1, 1.0); VIS(cParT, t, wt('C4', 'parabola'), 1e9, { dy: 8 });
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tB1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    VIS($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(klLine, t, wt('K1', 'straight') - 0.3, 0.6);
    const uL = M.clamp((t - wt('K1', 'ball')) / 3.0); setBall(kbL, fL, uL, 0.05, t > tK1 + 0.3 && uL < 1);
    VIS($('#klC'), t, wt('K1', 'forever') - 0.1, 1e9, POP);
    VIS($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(krLine, t, T0('K2'), 0.5); M.draw(krPar, t, wt('K2', 'bends') - 0.1, 0.9);
    const uR = M.clamp((t - wt('K2', 'bends')) / 2.4); setBall(kbR, fR, uR, 0.05, t > T0('K2') + 0.2);
    const tKd = [wt('K2', 'drops'), wt('K2', 'drop'), wt('K2', 'squared')];
    KD.forEach((d, i) => { const u = M.io((t - tKd[i] - 0.15 * i) / 0.35); d.a.set(d.x, d.yl, d.x, d.yl + (d.yp - d.yl) * u); d.l.style.opacity = u.toFixed(3); });
    VIS($('#krC'), t, wt('K2', 'squared') + 0.2, 1e9, POP);
    VIS($('#th1'), t, tK3 + 0.05, OUT('B1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'parabola') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Theta') });
  }

  /* B: what changes the curve + think */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B4');
    VIS($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    VIS($('#exB'), t, T0('B2'), 1e9, { dy: 8 });
    PUC.write($('#bF'), t, tB1 + 0.5, 0.8);
    VIS($('#b0'), t, wt('B2', 'Throw') - 0.1, 1e9, { dy: 16 }); VIS($('#b1'), t, wt('B2', 'twice'), 1e9, { dy: 16 });
    VIS($('#bP'), t, wt('B2', 'four') - 0.1, 1e9, POP);
    VIS($('#br'), t, T0('B3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(brLine, t, T0('B3'), 0.5); VIS(brLineT, t, T0('B3') + 0.3, 1e9, { dy: 8 });
    const tf = wt('B3', 'faster');
    [10, 20].forEach((v, i) => { M.draw(brP[i], t, tf + 0.1, 1.4 * (v / 20) + 0.3); VIS(brT[i], t, tf + 1.2, 1e9, { dy: 8 }); const u = M.clamp((t - tf - 0.1) / (1.4 * (v / 20) + 0.3)); setBall(bB[i], fB(v), u, 0.05, t > tf && u < 1); });
    avB(t, wt('B3', 'taller') + 0.3, out);
    VIS($('#th2'), t, tB4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tB4, tOpts: wt('B4', 'higher') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Both') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    VIS($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    VIS($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    VIS($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.draw(wPath, t, T0('W2') + 0.6, 1.6);
    const u = M.clamp((t - T0('W2') - 0.6) / 1.6); setBall(wB, fW, u, 0.05, t > T0('W2') + 0.5 && u < 1);
    M.draw(wV, t, tW[2] + 0.3, 0.6); VIS(wP, t, tW[3] + 0.3, 1e9, { ...POP, sc: 0.3 }); VIS(wPT, t, tW[3] + 0.5, 1e9, { dy: 8 });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    VIS($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); VIS($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'becomes') });
    PUC.write($('#xF'), t, wt('X3', 'whole'), 0.8); VIS($('#xL'), t, wt('X3', 'squared', 1), 1e9, { dy: 8 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'You') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    VIS($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    VIS($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap + questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    VIS($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => VIS($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
