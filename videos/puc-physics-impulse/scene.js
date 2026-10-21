// PUC Physics Ep 55: Impulse (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const PC = '#A23B72', FC = C.orange, AC = C.red, VC = C.ac, MC = C.ink;   // momentum and impulse plum, force orange, v blue, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const JJ = tc(PC, 'J'), dP = tc(PC, '\\Delta p'), FF = tc(FC, 'F'), pp = tc(PC, 'p'), mm = tc(MC, 'm'), v_ = tc(VC, 'v'), u_ = tc(VC, 'u');
const f2 = v => v.toFixed(2), f1 = v => v.toFixed(1), f3 = v => v.toFixed(3);
const ground = (p, x0, x1, y) => { mk(p, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = x0 + 12; x < x1; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const CLAY = '#B98B5E', EGG = '#F3E6CF';
const pulse = (Fp, T) => s => s <= 0 || s >= T ? 0 : Fp * Math.sin(Math.PI * s / T);       // half-sine contact force
const hands = (p, x, y) => { const g = mk(p, 'g', {}), sk = '#E2B48C';   // a cupped catching hand facing left
  mk(g, 'rect', { x: x - 14, y: y - 70, width: 36, height: 24, rx: 12, fill: sk, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: x - 14, y: y + 46, width: 36, height: 24, rx: 12, fill: sk, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: x + 10, y: y - 74, width: 46, height: 148, rx: 22, fill: sk, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: x + 48, y: y - 22, width: 110, height: 44, rx: 14, fill: sk, stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'rect', { x: x + 128, y: y - 28, width: 40, height: 56, rx: 8, fill: '#2F6FEB', stroke: C.ink, 'stroke-width': 2.5 });
  return g; };

Object.assign(M.IC, {
  brick: ['M3 5h18v14H3z', 'M3 10h18', 'M3 15h18', 'M9 5v5', 'M15 10v5', 'M9 15v4'],
  waves: ['M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0', 'M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0', 'M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v1', 'M14 10V4a2 2 0 0 0-4 0v2', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  egg: ['M12 22c-4.4 0-7-3.2-7-7.5C5 9 8.5 2 12 2s7 7 7 12.5c0 4.3-2.6 7.5-7 7.5Z'],
  mat: ['M3 14h18v5H3z', 'M3 14l3-4h12l3 4'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 17a2 2 0 1 0 0-.01', 'M9 17h6', 'M17 17a2 2 0 1 0 0-.01'],
  knee: ['M12 3a2 2 0 1 0 0 .01', 'M12 7v5l-4 4v5', 'M12 12l4 3-2 6', 'M8 9h8'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK4 = T0('K4');
const tG1 = T0('G1'), tG5 = T0('G5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['brick', 'Concrete', 'JARS YOUR KNEES', 'Concrete', [26, 0.12]], ['waves', 'Sand pit', 'FEELS SOFT', 'sand', [8, 0.5]], ['hand', 'Fielder', 'PULLS HANDS BACK', 'fielder', [8, 0.5]]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'concrete'), wt('H1', 'sand'), wt('H2', 'fielder')];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="jsv${i}" width="240" height="100"></svg></div>`).join('');
// each row: a little force-time sketch (same area, different shape)
const JP = JOBS.map(([, , , , [h, wd]], i) => { const sv = $('#jsv' + i); mk(sv, 'line', { x1: 10, y1: 88, x2: 230, y2: 88, stroke: C.ink, 'stroke-width': 2 }); txt(sv, 228, 80, 't', { 'text-anchor': 'end', 'font-size': 15, 'font-family': 'Poppins', 'font-style': 'italic' }); txt(sv, 12, 16, 'F', { 'font-size': 15, fill: FC, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600 });
  const W = 200 * wd, H = 72 * (h / 26), x0 = 30; let d = `M${x0},88`; for (let k = 0; k <= 30; k++) { const s0 = k / 30; d += ` L${(x0 + W * s0).toFixed(1)},${(88 - H * Math.sin(Math.PI * s0)).toFixed(1)}`; }
  return mk(sv, 'path', { d, fill: M.rgba(PC, 0.16), stroke: FC, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }); });
const TILES = [[C.red, 'Stiff: it cracks', 'x'], [C.ok, 'Moving back: safe', 'check'], [C.ac, 'Why?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Stiff'), wt('H4', 'Hands'), wt('H4', 'Why')];
const hs = $('#hkS');
const hEggO = mk(hs, 'g', {}), hEgg = mk(hEggO, 'g', {}); mk(hEgg, 'ellipse', { cx: 0, cy: 0, rx: 20, ry: 26, fill: EGG, stroke: C.ink, 'stroke-width': 2.5 });
const tEgg = wt('H3', 'tossed');
const eggXY = t => { const u = M.clamp((t - tEgg) / 1.1); return [180 + 420 * u, 300 - 300 * u + 300 * u * u - 80 * Math.sin(Math.PI * u)]; };

/* ---------- P: from F = dp/dt to J ---------- */
const PL = [[`${FF} = \\dfrac{${dP}}{\\Delta t}`, 'last episode: force = rate of change of momentum'], [`${FF}\\,\\Delta t = ${dP}`, 'multiply both sides by the time'], [`${JJ} = ${FF}\\,\\Delta t = ${dP}`, 'F times the time is called the impulse, J']];
$('#pls').innerHTML = PL.map(([f, w], i) => `<div class="pl" id="pl${i}" style="top:${84 + i * 124}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#pl0 .sx').style.top = '0px'; $('#pl0 .why').style.top = '84px'; $('#pl0 .sx').style.fontSize = '34px';
$('#ucB').innerHTML = K(`1\\ \\text{N s} = 1\\ \\text{kg m/s}^2 \\times \\text{s} = ${tc(PC, '1\\ \\text{kg m/s}')}`);
const tPl = [wt('P2', 'F'), wt('P3', 'times'), wt('P4', 'impulse')];
const pr = $('#prS'), PG = 236, tPr = wt('P3', 'Multiply');
ground(pr, 40, 744, PG);
const pbO = mk(pr, 'g', {}), pb = mk(pbO, 'g', {}); mk(pb, 'rect', { x: 0, y: PG - 64, width: 80, height: 64, rx: 8, fill: C.ink }); txt(pb, 40, PG - 25, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 20 });
const prF = PUC.arrow(pr, FC, 7, 20), prV = PUC.arrow(pr, VC, 6, 16);
const prFl = it(pr, 0, 0, 'F', FC, { 'font-size': 26 }), prVl = it(pr, 0, 0, 'v', VC, { 'font-size': 26 });
const prR = txt(pr, 36, 110, '', { 'font-size': 22, 'font-weight': 600 });
const prG = PUC.graph(pr, { x: 110, y: 300, w: 560, h: 170, xmax: 4, ymax: 8, xt: [0, 1, 2, 3], yt: [0, 2, 4, 6, 8], xl: 't (s)', yl: 'F (N)' });
const prA = mk(pr, 'rect', { x: prG.X(0), y: prG.Y(6), width: 0, height: prG.Y(0) - prG.Y(6), fill: M.rgba(PC, 0.22) });
const prL = prG.curve(FC, 5);
const prAl = txt(pr, prG.X(1.5), prG.Y(3) + 8, 'area = J', { 'text-anchor': 'middle', fill: PC, 'font-weight': 700, 'font-size': 22 });
const prTau = t => M.clamp(t - tPr, 0, 3);
const exP = document.createElement('div'); exP.className = 'ghost'; exP.style.cssText = 'right:36px;top:18px'; exP.textContent = 'EXAMPLE FIGURES'; $('#pr').appendChild(exP);

/* ---------- S: wall vs cushion ---------- */
const s = $('#simS'), YA = 230, YB = 410, R0 = 24, X0 = 110, WX = 640, CXc = 560, PXM = 250, V0 = 5, MB = 0.2;
const TA = 0.02, TB = 0.08, FA = Math.PI * MB * V0 / (2 * TA), FB = Math.PI * MB * V0 / (2 * TB), SLOW = 0.01;
ground(s, 40, 744, YA); ground(s, 40, 744, YB);
// hard wall (bricks) and soft cushion
const wall = mk(s, 'g', {}); mk(wall, 'rect', { x: WX, y: YA - 54, width: 44, height: 54, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
[YA - 36, YA - 18].forEach(y => mk(wall, 'line', { x1: WX, y1: y, x2: WX + 44, y2: y, stroke: C.ink, 'stroke-width': 1.5 }));
mk(wall, 'rect', { x: WX + 44, y: YA - 140, width: 20, height: 140, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2.5 });
txt(s, WX + 64, YA + 30, 'HARD WALL', { 'text-anchor': 'end', 'font-size': 16, 'font-weight': 600, fill: C.ink });
const cush = mk(s, 'rect', { x: CXc, y: YB - 54, width: 124, height: 54, rx: 14, fill: '#E9DDF5', stroke: C.ink, 'stroke-width': 2.5 });
const cushL = [0, 1, 2].map(k => mk(s, 'line', { x1: 0, y1: YB - 46, x2: 0, y2: YB - 8, stroke: '#B9A3DA', 'stroke-width': 2, 'stroke-dasharray': '4 5' }));
mk(s, 'rect', { x: 684, y: YB - 140, width: 20, height: 140, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2.5 });
txt(s, 704, YB + 30, 'SOFT CUSHION', { 'text-anchor': 'end', 'font-size': 16, 'font-weight': 600, fill: C.ink });
txt(s, 40, YA + 30, 'BALL A · 0.2 kg', { 'font-size': 16, 'font-weight': 600, fill: C.ink }); txt(s, 40, YB + 30, 'BALL B · 0.2 kg', { 'font-size': 16, 'font-weight': 600, fill: C.ink });
const gA = [0, 1, 2].map(() => mk(s, 'circle', { cy: YA - R0, r: R0, fill: CLAY, opacity: 0 })), gBl = [0, 1, 2].map(() => mk(s, 'circle', { cy: YB - R0, r: R0, fill: CLAY, opacity: 0 }));
const bA = mk(s, 'ellipse', { cx: X0, cy: YA - R0, rx: R0, ry: R0, fill: CLAY, stroke: C.ink, 'stroke-width': 2.5 });
const bB = mk(s, 'circle', { cx: X0, cy: YB - R0, r: R0, fill: CLAY, stroke: C.ink, 'stroke-width': 2.5 });
const vA = PUC.arrow(s, VC, 6, 16), pA = PUC.arrow(s, PC, 8, 18), fA = PUC.arrow(s, FC, 8, 20), vB = PUC.arrow(s, VC, 6, 16), pB = PUC.arrow(s, PC, 8, 18), fB = PUC.arrow(s, FC, 8, 20);
const lv = [it(s, 0, 0, 'v', VC, { 'font-size': 24 }), it(s, 0, 0, 'v', VC, { 'font-size': 24 })], lp = [it(s, 0, 0, 'p', PC, { 'font-size': 24 }), it(s, 0, 0, 'p', PC, { 'font-size': 24 })], lf = [it(s, 0, 0, 'F', FC, { 'font-size': 24 }), it(s, 0, 0, 'F', FC, { 'font-size': 24 })];
// timeline: approach at real speed (1250 px/s), hold at first touch, then the contact at 0.01x
const tAh = wt('S2', 'hits'), tA0 = tAh - (WX - R0 - X0) / (PXM * V0), tAc = wt('S3', 'force') - 0.1;
const tBh = wt('S4', 'hits'), tB0 = tBh - (CXc - R0 - X0) / (PXM * V0), tBc = wt('S4', 'takes') - 0.1;
const ball = (t, t0, th, tc, T, Fp) => {           // returns {x: centre or back, d: contact displacement px, v, F, J, tau, ph}
  if (t < t0) return { x: X0, d: 0, v: V0, F: 0, J: 0, tau: 0, ph: 0 };
  if (t < th) return { x: X0 + PXM * V0 * (t - t0), d: 0, v: V0, F: 0, J: 0, tau: 0, ph: 1 };
  const tau = t < tc ? 0 : Math.min(SLOW * (t - tc), T), c = Math.cos(Math.PI * tau / T);
  return { x: null, d: PXM * (V0 / 2) * (tau + T / Math.PI * Math.sin(Math.PI * tau / T)), v: V0 * (1 + c) / 2, F: tau < T ? Fp * Math.sin(Math.PI * tau / T) : 0, J: MB * V0 * (1 - c) / 2, tau, ph: tau >= T ? 3 : 2 };
};
$('#roT').innerHTML = `<span></span><span class="h">WALL</span><span></span><span class="h">CUSHION</span><span></span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r_va" style="color:${VC}">5.00</span><span class="u">m/s</span><span class="v" id="r_vb" style="color:${VC}">5.00</span><span class="u">m/s</span>
  <span class="k" style="color:${PC}">p</span><span class="v" id="r_pa" style="color:${PC}">1.00</span><span class="u">kg m/s</span><span class="v" id="r_pb" style="color:${PC}">1.00</span><span class="u">kg m/s</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_Fa" style="color:${FC}">0.0</span><span class="u">N</span><span class="v" id="r_Fb" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="color:${PC}">J</span><span class="v" id="r_Ja" style="color:${PC}">0.00</span><span class="u">N s</span><span class="v" id="r_Jb" style="color:${PC}">0.00</span><span class="u">N s</span>`;
const gS = $('#grS'), g = PUC.graph(gS, { x: 110, y: 64, w: 520, h: 156, xmax: 0.1, ymax: 80, xt: [0, 0.02, 0.04, 0.06, 0.08], yt: [0, 20, 40, 60, 80], xl: 't (s)', yl: 'F (N)' });
const fillPath = (F, T) => { let d = `M${g.X(0)},${g.Y(0)}`; for (let k = 0; k <= 40; k++) { const s0 = T * k / 40; d += ` L${g.X(s0).toFixed(1)},${g.Y(F(s0)).toFixed(1)}`; } return d + ` L${g.X(T)},${g.Y(0)} Z`; };
const PA = pulse(FA, TA), PB = pulse(FB, TB);
const arA = mk(gS, 'path', { d: fillPath(PA, TA), fill: M.rgba(PC, 0.24), stroke: 'none' }), arB = mk(gS, 'path', { d: fillPath(PB, TB), fill: M.rgba(PC, 0.24), stroke: 'none' });
const avA_ = mk(gS, 'rect', { x: g.X(0), y: g.Y(50), width: g.X(TA) - g.X(0), height: g.Y(0) - g.Y(50), fill: 'none', stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const avB_ = mk(gS, 'rect', { x: g.X(0), y: g.Y(12.5), width: g.X(TB) - g.X(0), height: g.Y(0) - g.Y(12.5), fill: 'none', stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const cA = g.curve(FC, 5), cB = g.curve(FC, 5);
const dA = g.dot(FC, 9), dB = g.dot(FC, 9);
const lA = txt(gS, g.X(TA) + 8, g.Y(70), 'wall', { fill: FC, 'font-weight': 600, 'font-size': 18 }), lB = txt(gS, g.X(TB) + 10, g.Y(6), 'cushion', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const aLa = txt(gS, g.X(0.035), g.Y(42), 'area 1.0 N s', { fill: PC, 'font-weight': 700, 'font-size': 18 }), aLb = txt(gS, g.X(0.088), g.Y(24), 'area 1.0 N s', { fill: PC, 'font-weight': 700, 'font-size': 18 });
const avL = txt(gS, 748, 40, 'avg: 50 N vs 12.5 N', { fill: C.ink, 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same momentum lost. Just slower, so softer!' });

/* ---------- D: 5 steps + strips ---------- */
const STEPS = [[`${dP} = ${mm}${v_} - ${mm}${u_}`, 'final minus initial momentum'],
  [`${JJ} = ${FF}\\,\\Delta t = ${dP}`, 'for a steady force'],
  [`${JJ} = \\text{area under the } ${FF}\\text{-}t \\text{ graph}`, 'when the force changes'],
  [`${dP} = 0 - 0.2 \\times 5 = ${tc(PC, '-1\\ \\text{N s}')}`, 'minus: the force points back'],
  [`${FF}_{\\text{avg}} = ${dP} / \\Delta t`, 'same Δp, longer Δt: smaller force']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Step'), wt('D3', 'Step'), wt('D4', 'Step'), wt('D5', 'Step'), wt('D6', 'Step')];
const dS = $('#drS'), dg = PUC.graph(dS, { x: 110, y: 96, w: 560, h: 290, xmax: 0.1, ymax: 25, xt: [0, 0.02, 0.04, 0.06, 0.08], yt: [0, 5, 10, 15, 20], xl: 't (s)', yl: 'F (N)' });
const NSt = 8, dw = TB / NSt;
const strips = Array.from({ length: NSt }, (_, k) => { const fm = PB((k + 0.5) * dw); return mk(dS, 'rect', { x: dg.X(k * dw) + 1, y: dg.Y(fm), width: dg.X(dw) - dg.X(0) - 2, height: dg.Y(0) - dg.Y(fm), fill: M.rgba(PC, 0.26), stroke: PC, 'stroke-width': 1.5 }); });
const dC = dg.curve(FC, 5);
const dAvg = mk(dS, 'line', { x1: dg.X(0), y1: dg.Y(12.5), x2: dg.X(TB), y2: dg.Y(12.5), stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' });
const dAvgL = txt(dS, dg.X(TB) + 10, dg.Y(12.5) + 6, 'avg 12.5 N', { fill: C.ink, 'font-weight': 700, 'font-size': 18 });
const dStL = txt(dS, dg.X(0.04), dg.Y(22.5), 'each strip: F × Δt', { 'text-anchor': 'middle', fill: PC, 'font-weight': 600, 'font-size': 20 });
$('#drF').innerHTML = K(`${JJ} = \\textstyle\\sum ${FF}\\,\\Delta t = \\text{area} = ${tc(PC, '1.0\\ \\text{N s}')}`);
$('#stF').innerHTML = K(`${JJ} = ${FF}\\,\\Delta t = ${dP}`);

/* ---------- K: stiff vs soft hands ---------- */
const kSide = (sv, soft) => {
  const HY = 150, HX = 440;
  const hO = mk(sv, 'g', {}), h = mk(hO, 'g', {}); hands(h, HX, HY);
  const eO = mk(sv, 'g', {}), e = mk(eO, 'g', {}); mk(e, 'ellipse', { cx: 0, cy: 0, rx: 34, ry: 26, fill: EGG, stroke: C.ink, 'stroke-width': 3 });
  const crack = mk(e, 'path', { d: 'M8,-25 l-6,10 l8,6 l-7,9 l6,7 l-4,8', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const gg = PUC.graph(sv, { x: 110, y: 256, w: 520, h: 140, xmax: 0.12, ymax: 35, xt: [0, 0.04, 0.08], yt: [0, 10, 20, 30], xl: 't (s)', yl: 'avg F (N)' });
  const Fv = soft ? 3 : 30, Tv = soft ? 0.1 : 0.01;
  const rc = mk(sv, 'rect', { x: gg.X(0), y: gg.Y(Fv), width: 0, height: gg.Y(0) - gg.Y(Fv), fill: M.rgba(PC, 0.24), stroke: FC, 'stroke-width': 3 });
  const rl = txt(sv, gg.X(Tv) + 12, gg.Y(Fv) - 8 + (soft ? 0 : 30), 'area 0.3 N s', { fill: PC, 'font-weight': 700, 'font-size': 18 });
  return { hO, h, eO, e, crack, gg, rc, rl, Fv, Tv, HX, HY };
};
const KS = [kSide($('#ktS'), false), kSide($('#kbS'), true)];
$('#ktF').innerHTML = K(`${FF} = \\dfrac{0.3}{0.01} = ${tc(FC, '30\\ \\text{N}')}`);
$('#kbF').innerHTML = K(`${FF} = \\dfrac{0.3}{0.1} = ${tc(FC, '3\\ \\text{N}')}`);
const tKs = [wt('K2', 'Stiff'), wt('K3', 'Soft')];
const th1 = PUC.think($('#th1'), { q: 'Which catch gives the egg the bigger impulse?', opts: ['Stiff hands', 'Soft hands', 'The same'], right: 2, why: 'Both take away the same momentum. Only the force differs.' });

/* ---------- G: everyday ---------- */
const EV = [['waves', 'Sand pit', 'LONG JUMP LANDING', 'sand'], ['mat', 'Thick mats', 'WRESTLING · GYMNASTICS', 'mats'], ['car', 'Airbags', 'AND CRUMPLE ZONES', 'airbags'], ['knee', 'Bent knees', 'WHEN YOU LAND', 'knees']];
$('#evs').innerHTML = EV.map(([ic, h, s0], i) => `<div class="ev" id="ev${i}" style="left:${36 + i * 380}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="h">${h}</div><div class="s">${s0}</div><svg id="evS${i}" width="308" height="84"></svg></div>`).join('');
EV.forEach((_, i) => { const sv = $('#evS' + i); mk(sv, 'line', { x1: 0, y1: 78, x2: 308, y2: 78, stroke: C.ink, 'stroke-width': 2 });
  let d1 = 'M10,78', d2 = 'M10,78'; for (let k = 0; k <= 30; k++) { const u = k / 30; d1 += ` L${(10 + 40 * u).toFixed(1)},${(78 - 70 * Math.sin(Math.PI * u)).toFixed(1)}`; d2 += ` L${(10 + 280 * u).toFixed(1)},${(78 - 10 * Math.sin(Math.PI * u)).toFixed(1)}`; }
  mk(sv, 'path', { d: d1, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '5 5' }); mk(sv, 'path', { d: d2, fill: M.rgba(PC, 0.2), stroke: FC, 'stroke-width': 3.5 }); });
const tEv = [wt('G2', 'sand'), wt('G2', 'mats'), wt('G3', 'airbags'), wt('G4', 'knees')];
const avA = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So bending my knees is physics!' });
const th2 = PUC.think($('#th2'), { q: 'Why does a high jumper land on a thick foam bed?', opts: ['Less momentum to lose', 'A longer stopping time'], right: 1, why: 'The momentum to lose is the same. Foam spreads it over more time.' });

/* ---------- W: worked example ---------- */
$('#wkq').innerHTML = `A ${K('150\\ \\text{g}')} ball reaches a fielder at ${K(tc(VC, '20\\ \\text{m/s}'))}. He stops it in ${K('0.1\\ \\text{s}')}. Find the impulse and the average force.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${dP} = 0 - 0.15 \\times 20 = ${tc(PC, '-3\\ \\text{N s}')}`)],
  [K(`${JJ} = ${tc(PC, '3\\ \\text{N s}')}\\ \\text{(against the motion)}`)],
  [K(`${FF} = \\dfrac{3}{0.1} = ${tc(FC, '30\\ \\text{N}')}`)],
  [K(`\\text{stiff: } ${FF} = \\dfrac{3}{0.02} = ${tc(FC, '150\\ \\text{N}')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 86 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY = 150;
const wbO = mk(w, 'g', {}), wb = mk(wbO, 'circle', { cx: 0, cy: WY, r: 16, fill: '#B23A3A', stroke: C.ink, 'stroke-width': 2.5 });
const whO = mk(w, 'g', {}), wh = mk(whO, 'g', {}); hands(wh, 470, WY);
const wV = PUC.arrow(w, VC, 6, 16), wVl = txt(w, 0, WY - 40, '20 m/s', { fill: VC, 'font-weight': 600, 'font-size': 20 });
const wg = PUC.graph(w, { x: 130, y: 270, w: 520, h: 200, xmax: 0.12, ymax: 160, xt: [0, 0.02, 0.04, 0.06, 0.08, 0.1], yt: [0, 50, 100, 150], xl: 't (s)', yl: 'avg F (N)' });
const wR1 = mk(w, 'rect', { x: wg.X(0), y: wg.Y(30), width: 0, height: wg.Y(0) - wg.Y(30), fill: M.rgba(PC, 0.24), stroke: FC, 'stroke-width': 3 });
const wR2 = mk(w, 'rect', { x: wg.X(0), y: wg.Y(150), width: 0, height: wg.Y(0) - wg.Y(150), fill: M.rgba(PC, 0.12), stroke: FC, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const wL1 = txt(w, wg.X(0.1) + 10, wg.Y(30) + 6, '30 N × 0.1 s', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const wL2 = txt(w, wg.X(0.02) + 10, wg.Y(150) + 14, '150 N × 0.02 s', { fill: FC, 'font-weight': 600, 'font-size': 18 });
const wL3 = txt(w, 36, 548, 'Both areas = 3 N s', { fill: PC, 'font-weight': 700, 'font-size': 22 });
const tWc = T0('W2') + 0.5, tW = [wt('W3', 'Delta'), wt('W4', 'So'), wt('W5', 'average'), wt('W6', 'With')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Δp = m(10) - m(10) = 0', right: 'Δp = m(-10) - m(+10) = -20m, size 2mv' });
const tp = $('#tpS');
mk(tp, 'rect', { x: 452, y: 40, width: 40, height: 190, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
const tpB = mk(tp, 'circle', { cx: 410, cy: 135, r: 22, fill: '#B23A3A', stroke: C.ink, 'stroke-width': 2.5 });
const tA1 = PUC.arrow(tp, VC, 6, 18), tA2 = PUC.arrow(tp, VC, 6, 18);
const tL1 = txt(tp, 120, 66, 'before: +10 m/s', { fill: VC, 'font-weight': 600, 'font-size': 22 }), tL2 = txt(tp, 120, 224, 'after: -10 m/s', { fill: VC, 'font-weight': 600, 'font-size': 22 });
const where = PUC.where($('#wa'), { on: [], type: 'Force-time graphs (area = impulse), and bounce or catch questions' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 76, optFs: 30, optY: 380,
  q: `A ${K('0.5\\ \\text{kg}')} ball falls from ${K('5\\ \\text{m}')} onto a floor and bounces up to ${K('1.8\\ \\text{m}')}. The contact lasts ${K('0.1\\ \\text{s}')}. Take ${K(tc(AC, 'g') + ' = 10\\ \\text{m/s}^2')}. Find the average force from the floor.`,
  opts: ['20 N', '80 N', '85 N', '75 N'], right: 2 });
const so = PUC.solution($('#so'), [[K(`${tc(VC, 'v_1')} = \\sqrt{2 \\cdot 10 \\cdot 5} = 10\\ \\text{down}`)], [K(`${tc(VC, 'v_2')} = \\sqrt{2 \\cdot 10 \\cdot 1.8} = 6\\ \\text{up}`)], [K(`${dP} = 0.5\\,(6 + 10) = 8\\ \\text{N s}`)], [K(`${FF}_{\\text{net}} = 8/0.1 = 80\\ \\text{N}`)], [K(`${tc(FC, 'N')} = 80 + 5 = ${tc(C.ok, '85\\ \\text{N}')}`)]], { y0: 96, dy: 104 });
const tSo = [wt('A2', 'It'), wt('A2', 'leaves'), wt('A3', 'Delta'), wt('A4', 'So'), wt('A4', 'floor')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · impulse', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${JJ} = ${FF}\\,\\Delta t = ${dP} \\qquad 1\\ \\text{N s} = 1\\ \\text{kg m/s}`),
    `<span class="pm">J</span> = area under the <span class="fo">F</span>-t graph`,
    `Same <span class="pm">Δp</span>, longer Δt: smaller <span class="fo">force</span>`,
    `Bounce back at the same speed: <span class="pm">|Δp|</span> = 2mv, not 0`] });
const YQ = ['What is impulse, and what is its unit?', 'Why does a fielder pull his hands back?', 'A ball bounces back at the same speed. Why is Δp not zero?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 56', topic: 'Carts push apart from rest. Total p? Conservation of Linear Momentum', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tAc - 0.3, 1.06, 960, 540], [T0('S6') - 0.3, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw(JP[i], t, tMorph + 0.7 + i * 0.35, 0.6); JP[i].style.fillOpacity = M.clamp((t - tMorph - 1.2 - i * 0.35) / 0.3).toFixed(3); });
    vis($('#hjP'), t, wt('H2', 'changes') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const [ex, ey] = eggXY(t); attr(hEgg, 'transform', `translate(${ex.toFixed(1)},${ey.toFixed(1)}) rotate(${(200 * M.clamp((t - tEgg) / 1.1)).toFixed(1)})`); vis(hEggO, t, tEgg - 0.1, wt('H4', 'Stiff') - 0.2, { dy: 0, fade: 0.1, outDur: 0.25, ody: 0 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq2').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PL.forEach((_, i) => { const el = $('#pl' + i); vis(el, t, tPl[i] - 0.3, 1e9, { dy: 16 }); vis(el.querySelector('.n'), t, tPl[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPl[i], 0.8); vis(el.querySelector('.why'), t, tPl[i] + 0.7, 1e9, { dx: -12, dy: 0 });
      el.style.background = mix(C.soft, C.ac2, i === 2 ? M.io((t - tPl[2] - 0.6) / 0.3) : 0); });
    vis($('#uc'), t, T0('P5') - 0.1, 1e9, { dy: 16 }); PUC.write($('#ucB'), t, wt('P5', 'newton') - 0.1, 0.8);
    vis($('#pr'), t, tP1 + 0.4, out, { dx: 60, dy: 0, ...o }); vis(exP, t, tPr - 0.2, 1e9, { dy: 8 });
    const tau = prTau(t), X = 60 + 20 * 1.5 * tau * tau, on = t > tPr && tau < 3;
    attr(pb, 'transform', `translate(${X.toFixed(1)},0)`); vis(pbO, t, tPr - 0.4, 1e9, { dx: -30, dy: 0 });
    const fL = on ? 108 : 0; prF.set(X + 84, PG - 32, X + 84 + fL, PG - 32); attr(prFl, 'x', (X + 92 + fL).toFixed(1)); attr(prFl, 'y', PG - 22); prFl.style.opacity = fL ? 1 : 0;
    const vL = 14 * 3 * tau; prV.set(X + 40, PG - 84, X + 40 + vL, PG - 84); attr(prVl, 'x', (X + 48 + vL).toFixed(1)); attr(prVl, 'y', PG - 76); prVl.style.opacity = vL > 8 ? 1 : 0;
    const tr = Math.round(tau * 100) / 100;
    if (prR._k !== tr) { prR._k = tr; prR.innerHTML = `<tspan fill="${FC}">F 6 N</tspan><tspan fill="${C.mute}">  ·  </tspan><tspan fill="${C.ink}">Δt ${f2(tr)} s</tspan><tspan fill="${C.mute}">  ·  </tspan><tspan fill="${PC}">J = Δp = ${f2(6 * tr)} N s</tspan>`; }
    vis(prR, t, tPr - 0.2, 1e9, { dy: 6 });
    prL(s0 => [s0, 6], 0, tau); attr(prA, 'width', (prG.X(tau) - prG.X(0)).toFixed(1)); M.hide(prA, tau <= 0);
    vis(prAl, t, wt('P4', 'impulse'), 1e9, POP);
  }

  /* S: sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    [['#sim', -60, 0.05], ['#ro', 60, 0.25], ['#gr', 0, 0.4]].forEach(([id, dx, d]) => vis($(id), t, tS1 + d, out, dx ? { dx, dy: 0, ...o } : { dy: 36, ...o }));
    const A = ball(t, tA0, tAh, tAc, TA, FA), B = ball(t, tB0, tBh, tBc, TB, FB);
    // ball A on the wall: the clay squashes (front stays on the wall)
    let acx, arx = R0, ary = R0;
    if (A.x !== null) acx = A.x; else { arx = R0 - A.d / 2; ary = R0 * R0 / arx; acx = WX - arx; }
    attr(bA, 'cx', acx.toFixed(1)); attr(bA, 'rx', arx.toFixed(2)); attr(bA, 'ry', ary.toFixed(2)); attr(bA, 'cy', (YA - ary).toFixed(2));
    // ball B into the cushion: the cushion squashes
    const bcx = B.x !== null ? B.x : CXc - R0 + B.d; attr(bB, 'cx', bcx.toFixed(1));
    const cl = CXc + (B.x !== null ? 0 : B.d); attr(cush, 'x', cl.toFixed(1)); attr(cush, 'width', (684 - cl).toFixed(1));
    cushL.forEach((ln, k) => { const x = cl + (684 - cl) * (k + 1) / 4; attr(ln, 'x1', x.toFixed(1)); attr(ln, 'x2', x.toFixed(1)); });
    vis(bA, t, tS1 + 0.5, 1e9, { dy: 0, fade: 0.2 }); vis(bB, t, tS1 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    [[gA, A, tA0, tAh], [gBl, B, tB0, tBh]].forEach(([gs, Q, a0, ah]) => gs.forEach((gc, k) => { const tt = t - 0.03 * (k + 1), on = Q.ph === 1 && tt > a0; attr(gc, 'cx', (X0 + PXM * V0 * Math.max(0, tt - a0)).toFixed(1)); gc.style.opacity = on ? [0.3, 0.2, 0.12][k] : 0; }));
    // vectors
    [[A, acx, YA - 2 * ary, YA - ary, acx - arx, 0], [B, bcx, YB - 2 * R0, YB - R0, bcx - R0, 1]].forEach(([Q, cx, top, cy, back, i]) => {
      const show = M.clamp((t - tS1 - 0.8) / 0.4);
      const vl = 16 * Q.v * show, pl = 80 * MB * Q.v * show, fl = 1.4 * Q.F;
      [vA, vB][i].set(cx, top - 18, cx + vl, top - 18); attr(lv[i], 'x', (cx + vl + 6).toFixed(1)); attr(lv[i], 'y', top - 11); lv[i].style.opacity = vl > 8 ? 1 : 0;
      [pA, pB][i].set(cx, top - 50, cx + pl, top - 50); attr(lp[i], 'x', (cx + pl + 6).toFixed(1)); attr(lp[i], 'y', top - 43); lp[i].style.opacity = pl > 8 ? 1 : 0;
      [fA, fB][i].set(back, cy, back - fl, cy); attr(lf[i], 'x', (back - fl - 24).toFixed(1)); attr(lf[i], 'y', cy - 14); lf[i].style.opacity = fl > 10 ? 1 : 0;
    });
    // slow-mo tag + contact clock (round the time first, compute the rest from it)
    const act = B.ph >= 2 ? B : A.ph >= 2 ? A : null, actT = act === B ? TB : TA;
    vis($('#smo'), t, tAh, tAc + TA / SLOW + 0.4, { ...POP, sc: 0.8 }); if (t > tBh - 0.2) vis($('#smo'), t, tBh, tBc + TB / SLOW + 0.4, { ...POP, sc: 0.8 });
    const rd = Q => { const tr = Math.round(Q.tau * 1000) / 1000, c = Math.cos(Math.PI * tr / (Q === A ? TA : TB)), Fp = Q === A ? FA : FB, T = Q === A ? TA : TB; return Q.ph < 2 ? { v: V0, F: 0, J: 0, tr: 0 } : { v: V0 * (1 + c) / 2, F: tr < T ? Fp * Math.sin(Math.PI * tr / T) : 0, J: MB * V0 * (1 - c) / 2, tr }; };
    const ra = rd(A), rb = rd(B);
    vis($('#tt'), t, tS1 + 0.8, 1e9, { dy: 8 }); M.setT($('#r_t'), f3(act ? (act === A ? ra.tr : rb.tr) : 0));
    [[ra, 'a'], [rb, 'b']].forEach(([r, k]) => { M.setT($('#r_v' + k), f2(r.v)); M.setT($('#r_p' + k), f2(MB * r.v)); M.setT($('#r_F' + k), f1(Math.abs(r.F))); M.setT($('#r_J' + k), f2(r.J)); });
    // F-t graph: each pulse draws live with a dot linked to its ball
    cA(s0 => [s0, PA(s0)], 0, A.ph >= 2 ? A.tau : 0); cB(s0 => [s0, PB(s0)], 0, B.ph >= 2 ? B.tau : 0);
    dA(A.tau, PA(A.tau), A.ph === 2 && t > tAc - 0.2); dB(B.tau, PB(B.tau), B.ph === 2 && t > tBc - 0.2);
    vis(lA, t, tAc + TA / SLOW, 1e9, { dy: 6 }); vis(lB, t, tBc + TB / SLOW, 1e9, { dy: 6 });
    const ua = M.io((t - wt('S6', 'areas') + 0.1) / 0.4); arA.style.opacity = ua.toFixed(3); arB.style.opacity = ua.toFixed(3);
    vis(aLa, t, wt('S6', 'Both') - 0.1, 1e9, POP); vis(aLb, t, wt('S6', 'Both') + 0.1, 1e9, POP);
    M.draw(avA_, t, wt('S7', 'Fifty') - 0.2, 0.5); M.draw(avB_, t, wt('S7', 'twelve') - 0.2, 0.6); vis(avL, t, wt('S7', 'Fifty'), 1e9, POP);
    avD(t, wt('S7', 'quarter') + 0.3, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] + 0.3, 0.8); vis(el.querySelector('.why'), t, tStep[i] + 1.0, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 182], [tStep[2] - 0.1, 280], [tStep[3] - 0.1, 378], [tStep[4] - 0.1, 476]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const uc = M.io((t - wt('D3', 'steady')) / 1.0); dC(s0 => [s0, PB(s0)], 0, TB * uc);
    strips.forEach((r, k) => vis(r, t, wt('D4', 'area') - 0.2 + k * 0.18, 1e9, { dy: 0, fade: 0.15 }));
    vis(dStL, t, wt('D4', 'area') + 0.2, 1e9, POP);
    PUC.write($('#drF'), t, wt('D4', 'graph') + 0.3, 0.8);
    M.draw(dAvg, t, wt('D6', 'average') - 0.1, 0.6); vis(dAvgL, t, wt('D6', 'average') + 0.4, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Impulse') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'momentum') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    vis($('#kt'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o }); vis($('#exK'), t, tK1 + 0.6, 1e9, { dy: 8 });
    vis($('#kb'), t, T0('K3') - 0.4, out, { dx: 60, dy: 0, ...o });
    KS.forEach((q, i) => {
      const tc0 = tKs[i], soft = i === 1;
      const ue = M.clamp((t - (tc0 - 0.6)) / 0.6), back = soft ? 70 * M.io((t - tc0) / 1.2) : 0;   // egg flies in, then (soft) hands and egg move back
      const ex = 80 + (q.HX - 48 - 80) * ue + back, ey = q.HY - 60 * Math.sin(Math.PI * ue) * (1 - ue);
      attr(q.e, 'transform', `translate(${ex.toFixed(1)},${ey.toFixed(1)})`); vis(q.eO, t, tc0 - 0.7, 1e9, { dy: 0, fade: 0.1 });
      attr(q.h, 'transform', `translate(${back.toFixed(1)},0)`); vis(q.hO, t, i ? T0('K3') - 0.2 : tK1 + 0.5, 1e9, { dx: 30, dy: 0 });
      M.hide(q.crack, soft || t < tc0 + 0.05);
      const ur = M.io((t - tc0 - 0.2) / 0.6); attr(q.rc, 'width', ((q.gg.X(q.Tv) - q.gg.X(0)) * ur).toFixed(1)); M.hide(q.rc, ur <= 0);
      vis(q.rl, t, tc0 + 0.8, 1e9, POP);
    });
    PUC.write($('#ktF'), t, wt('K2', 'thirty') - 0.2, 0.8); PUC.write($('#kbF'), t, wt('K3', 'three') - 0.2, 0.8);
    vis($('#th1'), t, tK4 + 0.05, OUT('G1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'Which') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'Both') });
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    vis($('#gb'), t, tG1 + 0.05, OUT('G5'), { dy: 36, ...o });
    EV.forEach((_, i) => vis($('#ev' + i), t, tEv[i] - 0.15, 1e9, { dy: 24 }));
    vis($('#gbP'), t, wt('G4', 'Each') - 0.1, 1e9, POP);
    avA(t, wt('G4', 'smaller') + 0.3, OUT('G5'));
    vis($('#th2'), t, tG5 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tG5, tOpts: wt('G5', 'Why') - 0.1, tCount: T1('G5') + 0.05, dur: 3, tAns: T0('G6') - 0.02, tWhy: wt('G6', 'The') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.6, 1e9, { dy: 8 });
    const ub = M.clamp((t - tWc) / 0.6), back = 60 * M.io((t - tWc - 0.6) / 1.2), bx = 60 + (470 - 16 - 60) * ub + back;
    attr(wb, 'cx', bx.toFixed(1)); vis(wbO, t, tWc - 0.1, 1e9, { dy: 0, fade: 0.1 });
    attr(wh, 'transform', `translate(${back.toFixed(1)},0)`); vis(whO, t, T0('W2') + 0.4, 1e9, { dx: 30, dy: 0 });
    const vl = ub < 1 ? 100 : 100 * (1 - M.io((t - tWc - 0.6) / 1.2)); wV.set(bx, WY - 30, bx + vl, WY - 30); attr(wVl, 'x', (bx + vl + 8).toFixed(1)); wVl.style.opacity = vl > 8 ? 1 : 0;
    attr(wR1, 'width', ((wg.X(0.1) - wg.X(0)) * M.io((t - tW[2]) / 0.6)).toFixed(1)); M.hide(wR1, t < tW[2]); vis(wL1, t, tW[2] + 0.5, 1e9, POP);
    attr(wR2, 'width', ((wg.X(0.02) - wg.X(0)) * M.io((t - tW[3]) / 0.4)).toFixed(1)); M.hide(wR2, t < tW[3]); vis(wL2, t, tW[3] + 0.4, 1e9, POP);
    vis(wL3, t, wt('W6', 'hundred') + 0.3, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.2, tStrike: wt('X3', 'vector') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    vis(tpB, t, T0('X2') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    const u1 = M.o3((t - wt('X2', 'ten') + 0.1) / 0.4), u2 = M.o3((t - wt('X2', 'back') + 0.1) / 0.4);
    tA1.set(120, 86, 120 + 220 * u1, 86); tL1.style.opacity = u1.toFixed(3);
    tA2.set(340, 190, 340 - 220 * u2, 190); tL2.style.opacity = u2.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'In') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
