// PUC Physics Ep 49: Relative velocity in two dimensions (Motion notebook, rain and a cyclist, a boat on a river)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (as Ep 31): the watcher A (Aarav) / v_A blue, the other one (rain, water) / v_R violet, the relative velocity v_RA ink, θ gold
const AC = C.ac, BC = C.violet, RC = C.ink, TH = C.gold, RAIN = '#8FA3C8', WATER = '#E3EEFB', LAND = '#E4EDDC';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const vA = tx(AC, '\\vec v_A'), vR = tx(BC, '\\vec v_R'), vRA = tx(RC, '\\vec v_{RA}'), vAs = tx(AC, 'v_A'), vRs = tx(BC, 'v_R'), thK = tx(TH, '\\theta');
const vBW = tx(AC, '\\vec v_{BW}'), vW = tx(BC, '\\vec v_W'), vB = tx(RC, '\\vec v_B');
const deg = r => r * 180 / Math.PI, mod = (a, n) => ((a % n) + n) % n;

Object.assign(M.IC, {
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M9 18h5', 'M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'M18 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0'],
  stand: ['M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M12 7v8', 'M8 22l4-7 4 7', 'M8 11h8'],
  run: ['M14 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M5 22l4-6 3 1 2-6', 'M14 11l3 3 3-1', 'M9 9l3-2 2 4'],
});

/* a cyclist with an umbrella, drawn at the ground point (0, 0); returns parts to animate */
const rider = (p, s = 1) => {
  const g = mk(p, 'g', {}), b = mk(g, 'g', { transform: `scale(${s})` });
  const wh = [-34, 34].map(x => { mk(b, 'circle', { cx: x, cy: -26, r: 26, fill: 'none', stroke: C.ink, 'stroke-width': 4 }); return mk(b, 'path', { d: '', stroke: C.ink2, 'stroke-width': 2 }); });
  mk(b, 'path', { d: 'M-34,-26 L-6,-26 L18,-62 M-6,-26 L-16,-66 M-26,-68 L-8,-68 M18,-62 L34,-26 M12,-72 L26,-72', fill: 'none', stroke: AC, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(b, 'path', { d: 'M-16,-70 L0,-44 L-6,-26 M-16,-70 L-4,-118 L18,-76', fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  mk(b, 'circle', { cx: 0, cy: -134, r: 14, fill: C.ink });
  const u = mk(b, 'g', {});
  mk(u, 'path', { d: 'M-4,-112 L-12,-126', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
  mk(u, 'line', { x1: -12, y1: -126, x2: -12, y2: -206, stroke: C.ink2, 'stroke-width': 4 });
  mk(u, 'path', { d: 'M-80,-196 Q-12,-262 56,-196 Q34,-204 22,-196 Q5,-206 -12,-196 Q-29,-206 -46,-196 Q-58,-204 -80,-196 Z', fill: C.ink2, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
  return { g, wh, set(x, y, tilt, roll) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); attr(u, 'transform', `rotate(${tilt.toFixed(2)} -4 -112)`);
    wh.forEach((w, i) => { const cx = i ? 34 : -34, a = roll / 26, c = Math.cos(a) * 24, d = Math.sin(a) * 24; attr(w, 'd', `M${(cx - c).toFixed(1)},${(-26 - d).toFixed(1)} L${(cx + c).toFixed(1)},${(-26 + d).toFixed(1)} M${(cx + d).toFixed(1)},${(-26 - c).toFixed(1)} L${(cx - d).toFixed(1)},${(-26 + c).toFixed(1)}`); }); } };
};
/* rain streaks over a box, as a pure function of the sim clock: fall speed vy px/s, horizontal drift of the view off px, slant (vx, vy) of the streak */
const rainField = (p, o) => { const ds = []; for (let c = 0; c < o.cols; c++) for (let k = 0; k < o.per; k++) ds.push({ c, k, e: mk(p, 'line', { stroke: o.col || RAIN, 'stroke-width': o.sw || 3, 'stroke-linecap': 'round' }) });
  return (tau, off, svx, svy, op = 1) => { const L = o.len || 22, n = Math.hypot(svx, svy) || 1;
    ds.forEach(d => { const x = o.x0 + mod(d.c * o.dx - off + d.k * 17, o.w), y = o.y0 + mod(o.vy * tau + d.k * o.h / o.per + d.c * 53, o.h);
      attr(d.e, 'x1', x.toFixed(1)); attr(d.e, 'y1', y.toFixed(1)); attr(d.e, 'x2', (x - svx / n * L).toFixed(1)); attr(d.e, 'y2', (y - svy / n * L).toFixed(1)); d.e.style.opacity = op.toFixed(3); }); }; };

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tC4 = T0('C4'), tR1 = T0('R1'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['run', 'Running in rain', 'IT SEEMS TO HIT YOUR FACE', 'Run'], ['bus', 'Bus window', 'DROPS SLANT ACROSS', 'bus']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = [wt('H1', 'Run'), wt('H2', 'bus')];
/* ---------- H ---------- */
const ROWS = [['stand', 'Standing still', 'RAIN FALLS STRAIGHT DOWN', 0], ['run', 'Running', 'RAIN SEEMS TO HIT YOUR FACE', 1]];
$('#jrs').innerHTML = ROWS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 172}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg class="sv" style="left:auto;right:20px;top:10px" width="190" height="130" id="jrS${i}"></svg></div>`).join('');
const jrR = ROWS.map((r, i) => rainField($('#jrS' + i), { cols: 7, per: 2, dx: 30, x0: -10, w: 210, y0: -10, h: 150, vy: 150, len: 18, sw: 2.5 }));
const TILES = [['drop', 'Rain: unchanged', BC], ['help', 'Tilt which way?', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'rain'), wt('H4', 'tilt')];
const um = $('#umS');
const umR = rainField(um, { cols: 9, per: 2, dx: 28, x0: -10, w: 252, y0: 30, h: 190, vy: 150, len: 16, sw: 2.5 });
mk(um, 'line', { x1: 0, y1: 198, x2: 236, y2: 198, stroke: C.ink, 'stroke-width': 3 });
const umB = rider(um, 0.62);
const umWet = [0, 1, 2].map(i => mk(um, 'circle', { cx: 0, cy: 0, r: 3.5, fill: BC }));

/* ---------- P ---------- */
$('#pF').innerHTML = `<span id="pf0">${K(vRA)}</span>${K('\\;=\\;')}<span id="pf1">${K(vR)}</span>${K('\\;-\\;')}<span id="pf2">${K(vA)}</span>`;

/* ---------- S: the sim ---------- */
const s = $('#simS'), GY = 486, PXM = 30, X0 = 120, XREF = 220;    // 30 px per metre; rain 5 m/s = 150 px/s
const road = mk(s, 'line', { x1: 0, y1: GY, x2: 784, y2: GY, stroke: C.ink, 'stroke-width': 3 });
const dashes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(() => mk(s, 'line', { y1: GY + 18, y2: GY + 18, stroke: C.dim, 'stroke-width': 4, 'stroke-linecap': 'round' }));
const sRain = rainField(s, { cols: 20, per: 3, dx: 40, x0: -20, w: 820, y0: 100, h: GY - 100, vy: 5 * PXM, len: 24, sw: 3 });
const sGh = [0.3, 0.2, 0.12].map(op => { const r = rider(s); r.g.style.opacity = op; return r; });
const sB = rider(s);
const tvR = PUC.arrow(s, BC, 6, 18), tvA = PUC.arrow(s, AC, 6, 18), tvAm = PUC.arrow(s, AC, 6, 18), tvRA = PUC.arrow(s, RC, 7, 20);
tvAm.g.querySelector('path').setAttribute('stroke-dasharray', '8 7');
const tArc = mk(s, 'path', { fill: 'none', stroke: TH, 'stroke-width': 3.5 });
const tvRl = sym(s, 0, 0, 'v', 'R', BC, 28), tvAl = sym(s, 0, 0, 'v', 'A', AC, 28), tvAml = sym(s, 0, 0, '−v', 'A', AC, 28), tvRAl = sym(s, 0, 0, 'v', 'RA', RC, 28), tThl = sym(s, 0, 0, 'θ', '', TH, 26);
$('#roG').innerHTML = `<span class="k" style="color:${BC}">v<sub>R</sub></span><span class="v" id="r0" style="color:${BC}">5.00</span><span class="u">m/s · rain, down</span>
  <span class="k" style="color:${AC}">v<sub>A</sub></span><span class="v" id="r1" style="color:${AC}">0.00</span><span class="u">m/s · Aarav, forward</span>
  <span class="k">v<sub>RA</sub></span><span class="v" id="r2">5.00</span><span class="u">m/s · rain he sees</span>
  <span class="k" style="color:${TH}">θ</span><span class="v" id="r3" style="color:${TH}">0.0°</span><span class="u">slant from vertical</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 6, ymin: 0, ymax: 60, xt: [0, 1, 2, 3, 4, 5, 6], yt: [0, 15, 30, 45, 60], xl: 'v_A (m/s)' });
gr.xlab.setAttribute('y', 78 + 140 + 56);
const g45 = gr.mk('line', { x1: gr.X(0), y1: gr.Y(45), x2: gr.X(5), y2: gr.Y(45), stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.5 });
const g5 = gr.mk('line', { x1: gr.X(5), y1: gr.Y(0), x2: gr.X(5), y2: gr.Y(45), stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.5 });
const g45t = txt($('#grS'), gr.X(5) + 14, gr.Y(45) + 6, '45° at 5 m/s', { 'font-size': 18, fill: TH, 'font-weight': 600 });
const gFull = gr.curve(M.mix(TH, '#FFFFFF', 0.6), 3); $('#grS').lastChild.setAttribute('stroke-dasharray', '6 7');
const gCur = gr.curve(TH, 5), gDot = gr.dot(TH, 10);
// Aarav's speed 0 -> 5 m/s from "ride"; the sim clock runs real time, then 0.25x slow-mo, then freezes for the vector replay
const tGo = wt('S3', 'ride'), vT = M.keys([[0, 0], [tGo, 5]], 2.6, M.io);
const tView = wt('S4', 'Switch'), tSlo = T0('S7'), tFr = wt('S8', 'Here');
const tau = t => t < tSlo ? t : t < tFr ? tSlo + 0.25 * (t - tSlo) : tSlo + 0.25 * (tFr - tSlo);
const DT = 1 / 120, I = [0]; for (let t2 = tGo; t2 < tSlo + 2; t2 += DT) I.push(I[I.length - 1] + (vT(t2) + vT(t2 + DT)) / 2 * DT);
const xC = tu => { if (tu <= tGo) return X0; const x = (tu - tGo) / DT, i = Math.floor(x), f = x - i; return X0 + PXM * (i + 1 >= I.length ? I[I.length - 1] : I[i] + (I[i + 1] - I[i]) * f); };
const viewW = t => M.io((t - tView) / 0.8);
const off = t => viewW(t) * (xC(tau(t)) - XREF);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So it hits me from the front!' });
const P0 = [600, 130], VL = 140;              // the vector triangle in the sky: 28 px per m/s

/* ---------- D: part by part ---------- */
const STEPS = [[`${vR} = 0\\,\\hat i - 5\\,\\hat j \\qquad ${vA} = 5\\,\\hat i`, 'write both in parts: x forward, y up'],
  [`${vRA} = (0-5)\\,\\hat i + (-5-0)\\,\\hat j = -5\\,\\hat i - 5\\,\\hat j`, 'subtract x from x, and y from y'],
  [`|${vRA}| = \\sqrt{5^2 + 5^2} = 5\\sqrt{2} \\approx 7.07\\,\\text{m/s}`, 'its size, from the two parts'],
  [`\\tan ${thK} = ${vAs} / ${vRs} = 5/5 = 1 \\;\\Rightarrow\\; ${thK} = 45^\\circ`, 'angle from the vertical: tilt forward']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Write'), wt('D3', 'Subtract'), wt('D4', 'size'), wt('D5', 'angle')];
const vd = $('#vdS'), DO = [440, 92], U = 30;
for (let i = -7; i <= 3; i++) mk(vd, 'line', { x1: DO[0] + i * U, y1: DO[1] - U, x2: DO[0] + i * U, y2: DO[1] + 6 * U, stroke: C.line, 'stroke-width': 1.5 });
for (let j = -1; j <= 6; j++) mk(vd, 'line', { x1: DO[0] - 7 * U, y1: DO[1] + j * U, x2: DO[0] + 3 * U + 140, y2: DO[1] + j * U, stroke: C.line, 'stroke-width': 1.5 });
mk(vd, 'circle', { cx: DO[0], cy: DO[1], r: 6, fill: C.ink });
const dR = PUC.arrow(vd, BC, 6, 18), dA = PUC.arrow(vd, AC, 6, 18), dAm = PUC.arrow(vd, AC, 6, 18), dRA = PUC.arrow(vd, RC, 7, 20);
dAm.g.querySelector('path').setAttribute('stroke-dasharray', '8 7');
const dArc = mk(vd, 'path', { d: `M${DO[0]},${DO[1] + 56} A56,56 0 0 1 ${(DO[0] - 56 * Math.SQRT1_2).toFixed(1)},${(DO[1] + 56 * Math.SQRT1_2).toFixed(1)}`, fill: 'none', stroke: TH, 'stroke-width': 3.5 });
const dThl = sym(vd, DO[0] - 44, DO[1] + 96, 'θ', '', TH, 26);
const dRl = sym(vd, DO[0] + 12, DO[1] + 80, 'v', 'R', BC, 28), dAl = sym(vd, DO[0] + 5 * U + 22, DO[1] + 10, 'v', 'A', AC, 28), dAml = sym(vd, DO[0] - 5 * U + 22, DO[1] + 5 * U + 38, '−v', 'A', AC, 28), dRAl = sym(vd, DO[0] - 5 * U - 10, DO[1] + 2 * U + 6, 'v', 'RA', RC, 28);
const dMag = txt(vd, DO[0] - 6 * U, DO[1] + 3.6 * U, '5√2 ≈ 7.07', { 'font-size': 20, fill: RC, 'font-weight': 600, 'text-anchor': 'end' });
const PTS = [['v<sub>R</sub>', '0', '−5', BC], ['v<sub>A</sub>', '+5', '0', AC], ['v<sub>RA</sub>', '0 − 5 = −5', '−5 − 0 = −5', RC]];
$('#pts').innerHTML = `<div class="pt" id="pt9" style="top:300px;background:none;color:var(--mute);font-size:18px"><b></b><span>x PART</span><span style="width:260px">y PART</span></div>` +
  PTS.map(([n, x, y, c], i) => `<div class="pt" id="pt${i}" style="top:${342 + i * 52}px"><b style="color:${c}">${n}</b><span>${x}</span><span style="width:260px">${y}</span></div>`).join('');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${vRA} = ${vR} - ${vA} \\qquad \\tan ${thK} = ${vAs} / ${vRs}`);

/* ---------- C: side by side ---------- */
const mini = (p, slant) => { mk(p, 'line', { x1: 0, y1: 320, x2: 712, y2: 320, stroke: C.ink, 'stroke-width': 3 });
  const rf = rainField(p, { cols: 18, per: 2, dx: 40, x0: -20, w: 760, y0: 10, h: 310, vy: 150, len: 22, sw: 3 });
  const r = rider(p, 0.85); r.set(250, 320, slant ? 45 : 0, 0);
  const a = PUC.arrow(p, BC, 6, 18), b = PUC.arrow(p, RC, 7, 20); return { rf, a, b }; };
const cm0 = mini($('#c0S'), 0), cm1 = mini($('#c1S'), 1);
const c0l = sym($('#c0S'), 560, 210, 'v', 'RA', RC, 26), c1l = sym($('#c1S'), 470, 214, 'v', 'RA', RC, 26);
$('#c0a').innerHTML = K(`${vAs} = 0 \\;\\Rightarrow\\; ${thK} = 0^\\circ \\text{, straight up}`);
$('#c1a').innerHTML = K(`\\tan ${thK} = 5/5 \\;\\Rightarrow\\; ${thK} = 45^\\circ \\text{, forward}`);
const th1 = PUC.think($('#th1'), { q: 'Aarav rides even faster. Should he tilt the umbrella more, or less?', opts: ['More', 'Less'], right: 0,
  why: 'tan θ = v_A / v_R: a bigger speed gives a bigger angle.'.replace('v_A', 'v<sub>A</sub>').replace('v_R', 'v<sub>R</sub>') });

/* ---------- R: a boat on a river ---------- */
const rl = $('#rlS'), BY0 = 470, BY1 = 110, BXS = 200, KB = 8;     // 8 px per metre; boat 5 m/s across, water 2 m/s downstream
mk(rl, 'rect', { x: 0, y: 60, width: 784, height: BY1 - 60, fill: LAND }); mk(rl, 'rect', { x: 0, y: BY0, width: 784, height: 110, fill: LAND });
mk(rl, 'rect', { x: 0, y: BY1, width: 784, height: BY0 - BY1, fill: WATER });
[BY1, BY0].forEach(y => mk(rl, 'line', { x1: 0, y1: y, x2: 784, y2: y, stroke: C.ink, 'stroke-width': 3 }));
const flows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => mk(rl, 'line', { stroke: M.mix(BC, '#FFFFFF', 0.5), 'stroke-width': 3, 'stroke-linecap': 'round' }));
const rPath = mk(rl, 'line', { x1: BXS, y1: BY0, x2: BXS + 2 * KB * (BY0 - BY1) / (5 * KB), y2: BY1, stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const rAim = mk(rl, 'line', { x1: BXS, y1: BY0, x2: BXS, y2: BY1, stroke: AC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const rAimT = txt(rl, BXS, BY1 - 14, 'aimed here', { 'font-size': 18, fill: AC, 'font-weight': 600, 'text-anchor': 'middle' });
const rLandT = txt(rl, BXS + 144, BY1 - 14, 'lands here', { 'font-size': 18, fill: RC, 'font-weight': 600, 'text-anchor': 'middle' });
const boatG = [0.3, 0.2, 0.12].map(op => { const b = mk(rl, 'path', { d: 'M0,-26 Q12,-10 10,20 L-10,20 Q-12,-10 0,-26 Z', fill: C.ink, opacity: op }); return b; });
const boat = mk(rl, 'path', { d: 'M0,-26 Q12,-10 10,20 L-10,20 Q-12,-10 0,-26 Z', fill: C.ink, stroke: C.ink, 'stroke-width': 2 });
const bBW = PUC.arrow(rl, AC, 6, 18), bW = PUC.arrow(rl, BC, 6, 18), bB = PUC.arrow(rl, RC, 7, 20);
const bBWl = sym(rl, 0, 0, 'v', 'BW', AC, 24), bWl = sym(rl, 0, 0, 'v', 'W', BC, 24), bBl = sym(rl, 0, 0, 'v', 'B', RC, 24);
const tRb = tR1 + 0.3, CROSS = (BY0 - BY1) / (5 * KB), rTb = t => mod(Math.max(0, t - tRb), CROSS + 1.2);
const LK = [['The boat moves through the water: <span style="color:var(--va)"><i>v</i><sub>BW</sub></span>'], ['The water flows downstream: <span style="color:var(--vr)"><i>v</i><sub>W</sub></span>'], ['From the bank, add the two: <i>v</i><sub>B</sub>'], ['Pointed straight across, it lands downstream']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('') +
  `<div class="fx" id="lkF" style="left:36px;top:488px;font-size:40px">${K(`${vB} = ${vBW} + ${vW}`)}</div>`;
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const th2 = PUC.think($('#th2'), { q: 'The boat must land exactly opposite. Should it point straight across, or slightly upstream?', opts: ['Straight across', 'Slightly upstream'], right: 1,
  why: 'Part of its velocity cancels the river; the rest takes it across.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`t = \\dfrac{\\text{width}}{v_{\\text{across}}} = \\dfrac{100}{5} = 20\\,\\text{s}`)],
  [K(`\\text{drift} = ${tx(BC, 'v_W')} \\times t = 2 \\times 20 = 40\\,\\text{m}`)],
  [K(`|${vB}| = \\sqrt{5^2 + 2^2} = \\sqrt{29} \\approx 5.39\\,\\text{m/s}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 110 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WY0 = 430, WY1 = 130, WXS = 230, WK = 3;     // 3 px per metre: 100 m = 300 px
mk(w, 'rect', { x: 0, y: 100, width: 784, height: WY1 - 100, fill: LAND }); mk(w, 'rect', { x: 0, y: WY0, width: 784, height: 50, fill: LAND });
mk(w, 'rect', { x: 0, y: WY1, width: 784, height: WY0 - WY1, fill: WATER });
[WY1, WY0].forEach(y => mk(w, 'line', { x1: 0, y1: y, x2: 784, y2: y, stroke: C.ink, 'stroke-width': 3 }));
const wFl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => mk(w, 'line', { stroke: M.mix(BC, '#FFFFFF', 0.5), 'stroke-width': 3, 'stroke-linecap': 'round' }));
mk(w, 'path', { d: `M110,${WY1} h-12 V${WY0} h12`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
txt(w, 88, (WY0 + WY1) / 2 + 6, '100 m', { 'font-size': 20, fill: C.ink, 'font-weight': 600, 'text-anchor': 'end' });
const wPath = mk(w, 'line', { x1: WXS, y1: WY0, x2: WXS, y2: WY0, stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' });
const wDrift = mk(w, 'path', { d: '', fill: 'none', stroke: BC, 'stroke-width': 3 });
const wDt = txt(w, 0, WY1 - 34, '40 m', { 'font-size': 24, fill: BC, 'font-weight': 600, 'text-anchor': 'middle' });
const wBoat = mk(w, 'path', { d: 'M0,-22 Q10,-8 8,16 L-8,16 Q-10,-8 0,-22 Z', fill: C.ink });
const wBW = PUC.arrow(w, AC, 5, 16), wW = PUC.arrow(w, BC, 5, 16), wB = PUC.arrow(w, RC, 6, 18);
const tWs = wt('W2', 'boat'), wTau = t => M.clamp(t - tWs, 0, 20);
const tW = [wt('W3', 'Time'), wt('W4', 'That'), wt('W5', 'root')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Rain Aarav sees = rain + cyclist', right: 'Rain Aarav sees = rain − cyclist: it comes from the front' });
const tg = $('#tg'), TP = [230, 40], TL = 112;
const tgR = PUC.arrow(tg, BC, 5, 16), tgW = PUC.arrow(tg, C.red, 4, 14), tgWv = PUC.arrow(tg, C.red, 5, 16), tgM = PUC.arrow(tg, AC, 5, 16), tgOk = PUC.arrow(tg, RC, 6, 18);
tgW.g.querySelector('path').setAttribute('stroke-dasharray', '6 6'); tgWv.g.querySelector('path').setAttribute('stroke-dasharray', '6 6');
const tgWt = txt(tg, TP[0] + TL + 10, TP[1] + TL + 36, 'from behind', { 'font-size': 17, fill: C.red, 'font-weight': 600, 'text-anchor': 'middle' });
const tgOt = txt(tg, TP[0] - TL - 6, TP[1] + TL + 36, 'from the front', { 'font-size': 17, fill: RC, 'font-weight': 600, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Rain and umbrella problems, river crossings, two moving objects seen from each other' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A cyclist rides east at 10 m/s and the rain seems to fall straight down. At 20 m/s it seems to fall at 45° to the vertical. Find the actual velocity of the rain.', qW: 780,
  opts: ['10 m/s, straight down', K('10\\sqrt{2}\\,\\text{m/s, at } 45^\\circ \\text{ to the vertical}'), K('20\\,\\text{m/s, at } 45^\\circ \\text{ to the vertical}'), K('10\\sqrt{5}\\,\\text{m/s, at } \\tan^{-1} 2 \\text{ to the vertical}')], right: 1, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 256 });
const so = PUC.solution($('#so'), [[K(`\\text{rain} = a\\,\\hat i - b\\,\\hat j`)], [K(`\\text{at } 10:\\; a - 10 = 0 \\Rightarrow a = 10`)], [K(`\\text{at } 20:\\; x = -10,\\; 45^\\circ \\Rightarrow b = 10`)],
  [K(`10\\,\\hat i - 10\\,\\hat j \\Rightarrow 10\\sqrt{2}\\,\\text{m/s} \\Rightarrow \\textbf{B}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Let'), wt('A2', 'so'), wt('A3', 'At'), wt('A4', 'So')];
const fc = PUC.fcard($('#sF'), { x: 340, y: 262, w: 1240, h: 470, title: 'Recap · relative velocity in 2D', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${vRA} = ${vR} - ${vA} \\qquad \\tan ${thK} = ${vAs} / ${vRs}`),
    '<b>Subtract part by part</b>: x from x, y from y', '<b>Rain</b>: tilt the umbrella forward, against the rain you see', '<b>River</b>: <i>v</i><sub>bank</sub> = <i>v</i><sub>boat in water</sub> + <i>v</i><sub>water</sub>'] });
const YQ = ['Why does rain seem to slant when you run?', 'Rain falls at 8 m/s and you ride at 6 m/s. At what angle should you tilt?', 'Why does a boat pointed straight across land downstream?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CH 4 · EP 50', topic: 'Who pushed the passengers forward? Force and Inertia', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; [0, 1, 2].forEach(i => { const e = $('#pf' + i), l = $('#tl' + i); l.style.left = (e.offsetLeft + e.offsetWidth / 2 - 100).toFixed(0) + 'px'; }); let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const grow = (a, x1, y1, x2, y2, u) => { if (u <= 0.01) { a.set(0, 0, 0, 0); return; } a.set(x1, y1, M.lerp(x1, x2, u), M.lerp(y1, y2, u)); };
const at = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };
const flowLines = (els, t, y0, y1, w0) => els.forEach((e, i) => { const y = y0 + 30 + (i % 4) * ((y1 - y0 - 60) / 3), x = mod(i * 157 + 60 * t, 860) - 60; attr(e, 'x1', x.toFixed(1)); attr(e, 'x2', (x + 44).toFixed(1)); attr(e, 'y1', y.toFixed(1)); attr(e, 'y2', y.toFixed(1)); });

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    ROWS.forEach((r, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); jrR[i](t, i ? 90 * t : 0, i ? -3 : 0, 5); });
    M.vis($('#hjP'), t, wt('H2', 'Did') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#umb'), t, wt('H3', 'umbrella') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    umR(t, 90 * t, -3, 5); umB.set(96, 198, 0, 60 * t);
    umWet.forEach((d, i) => { attr(d, 'cx', 96 + 9 + i * 3); attr(d, 'cy', 198 - 62 - i * 9); M.vis(d, t, wt('H3', 'wet') + i * 0.15, 1e9, POP); });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.redBg : C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pdef'), t, tP2 + 0.05, { st: 0.04 });
    M.vis($('#dr0'), t, wt('P3', 'one') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, wt('P3', 'plane') - 0.1, 1e9, { dx: -20, dy: 0 });
    $('#dr1').style.background = mix(C.soft, C.ac2, M.io((t - wt('P3', 'vectors')) / 0.3));
    M.vis($('#pr'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#pF'), t, wt('P4', 'v', 0), 0.9);
    [wt('P4', 'equals'), wt('P4', 'rain'), wt('P4', 'watcher')].forEach((tt, i) => M.vis($('#tl' + i), t, tt - 0.1, 1e9, { dy: 10 }));
    M.vis($('#prP'), t, wt('P4', 'minus', 1) - 0.1, 1e9, POP);
  }

  /* S: rain + cyclist + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tu = tau(t), v = Math.round(vT(Math.min(tu, tSlo)) * 100) / 100, wv = viewW(t), of = off(t), xs = xC(tu) - of;
    const rep = t >= tFr, dim = 1 - 0.65 * M.clamp((t - tFr) / 0.4);
    sRain(tu, of, -wv * v, 5, dim);
    dashes.forEach((d, i) => { const x = mod(i * 60 - of, 840) - 30; attr(d, 'x1', x.toFixed(1)); attr(d, 'x2', (x + 26).toFixed(1)); });
    const th = deg(Math.atan2(v, 5)), tilt = th * M.io((t - wt('S6', 'bigger')) / 0.8);
    sB.set(xs, GY, tilt, xC(tu) - X0);
    sGh.forEach((g, k) => { const t2 = tu - 0.12 * (k + 1), x2 = xC(t2) - viewW(t) * (xC(t2) - XREF); g.set(x2, GY, tilt, 0); g.g.style.opacity = (Math.abs(x2 - xs) > 6 ? [0.3, 0.2, 0.12][k] : 0).toFixed(3); });
    M.setT($('#vw'), wv < 0.5 ? 'VIEW · GROUND' : 'VIEW · RIDING WITH AARAV'); $('#vw').style.background = wv < 0.5 ? C.soft : C.ac2;
    M.vis($('#vw'), t, tS1 + 0.6, 1e9, { dy: 10 });
    // readout + graph, all from the displayed speed
    const rel = Math.hypot(v, 5), thd = Math.round(deg(Math.atan2(v, 5)) * 10) / 10;
    M.setT($('#r0'), '5.00'); M.setT($('#r1'), v.toFixed(2)); M.setT($('#r2'), rel.toFixed(2)); M.setT($('#r3'), thd.toFixed(1) + '°');
    gCur(x => [x, deg(Math.atan2(x, 5))], 0, v); gDot(v, deg(Math.atan2(v, 5)), t > tS1 + 0.5);
    const sh = M.clamp((t - wt('S6', 'graph')) / 0.6); gFull(x => [x, deg(Math.atan2(x, 5))], v, v + (6 - v) * sh);
    const g45u = M.clamp((t - wt('S6', 'forty')) / 0.4); [g45, g5].forEach(e => e.style.opacity = (0.5 * g45u).toFixed(3)); g45t.style.opacity = g45u.toFixed(3);
    // slow-mo replay: rain arrow, Aarav's arrow, flip and add, the rain he sees
    M.vis($('#slo'), t, tSlo - 0.1, out, POP);
    const uR = M.o3((t - wt('S8', 'rain') + 0.1) / 0.5), uA = M.o3((t - wt('S8', 'Aarav') + 0.1) / 0.5), uM = M.o3((t - wt('S9', 'Flip') + 0.1) / 0.6), uRA = M.o3((t - wt('S9', 'result') + 0.1) / 0.6);
    grow(tvR, P0[0], P0[1], P0[0], P0[1] + VL, uR); at(tvRl, P0[0] + 12, P0[1] + VL / 2 + 10); tvRl.style.opacity = uR.toFixed(3);
    const hy = GY - 44; grow(tvA, xs + 70, hy, xs + 70 + VL, hy, uA * (1 - M.clamp((t - wt('S9', 'Flip')) / 0.3) * 0.6)); at(tvAl, xs + 70 + VL / 2 - 10, hy - 16); tvAl.style.opacity = uA.toFixed(3);
    grow(tvAm, P0[0], P0[1] + VL, P0[0] - VL, P0[1] + VL, uM); at(tvAml, P0[0] - VL / 2 - 22, P0[1] + VL + 36); tvAml.style.opacity = uM.toFixed(3);
    grow(tvRA, P0[0], P0[1], P0[0] - VL, P0[1] + VL, uRA); at(tvRAl, P0[0] - VL / 2 - 64, P0[1] + VL / 2 - 4); tvRAl.style.opacity = uRA.toFixed(3);
    attr(tArc, 'd', `M${P0[0]},${P0[1] + 50} A50,50 0 0 1 ${(P0[0] - 50 * Math.SQRT1_2).toFixed(1)},${(P0[1] + 50 * Math.SQRT1_2).toFixed(1)}`); tArc.style.opacity = uRA.toFixed(3);
    at(tThl, P0[0] - 32, P0[1] + 84); tThl.style.opacity = uRA.toFixed(3);
    avA(t, wt('S5', 'front') + 0.3, tSlo - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 116]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const uR = M.o3((t - wt('D2', 'Rain') + 0.1) / 0.5), uA = M.o3((t - wt('D2', 'Aarav') + 0.1) / 0.5), uM = M.o3((t - tStep[1] + 0.1) / 0.6), uRA = M.o3((t - wt('D3', 'minus') + 0.1) / 0.6);
    grow(dR, DO[0], DO[1], DO[0], DO[1] + 5 * U, uR); dRl.style.opacity = uR.toFixed(3);
    grow(dA, DO[0], DO[1], DO[0] + 5 * U, DO[1], uA); dAl.style.opacity = uA.toFixed(3);
    grow(dAm, DO[0], DO[1] + 5 * U, DO[0] - 5 * U, DO[1] + 5 * U, uM); dAml.style.opacity = uM.toFixed(3);
    grow(dRA, DO[0], DO[1], DO[0] - 5 * U, DO[1] + 5 * U, uRA); dRAl.style.opacity = uRA.toFixed(3);
    M.vis(dMag, t, wt('D4', 'Five') - 0.1, 1e9, POP);
    M.draw(dArc, t, tStep[3] - 0.1, 0.5); M.vis(dThl, t, tStep[3] + 0.2, 1e9, POP);
    M.vis($('#pt9'), t, wt('D2', 'parts') - 0.2, 1e9, { dy: 10 });
    [wt('D2', 'Rain'), wt('D2', 'Aarav'), wt('D3', 'minus')].forEach((tt, i) => { M.vis($('#pt' + i), t, tt - 0.1, 1e9, { dx: -20, dy: 0 }); });
    $('#pt2').style.background = mix(C.soft, C.ac2, M.io((t - wt('D3', 'minus')) / 0.3));
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Hold') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'not') - 0.1, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o });
    cm0.rf(t, 0, 0, 5); const u0 = M.o3((t - wt('C2', 'rain') + 0.1) / 0.5); grow(cm0.b, 540, 70, 540, 190, u0); at(c0l, 552, 140); c0l.style.opacity = u0.toFixed(3);
    PUC.write($('#c0a'), t, wt('C2', 'Umbrella') - 0.1, 0.7);
    M.vis($('#c1'), t, T0('C3') - 0.4, out, { dx: 60, dy: 0, ...o });
    cm1.rf(t, 150 * t, -5, 5); const u1 = M.o3((t - wt('C3', 'tilts') + 0.1) / 0.5); grow(cm1.b, 600, 70, 480, 190, u1); at(c1l, 470, 150); c1l.style.opacity = u1.toFixed(3);
    PUC.write($('#c1a'), t, wt('C3', 'forward') - 0.1, 0.7);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Should') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Tan') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? tK1)) / 0.3))); });
    PUC.write($('#lkF'), t, wt('R4', 'sum') - 0.1, 0.7);
    flowLines(flows, t, BY1, BY0);
    const tb = rTb(t), bx = BXS + 2 * KB * Math.min(tb, CROSS), by = BY0 - 5 * KB * Math.min(tb, CROSS);
    attr(boat, 'transform', `translate(${bx.toFixed(1)},${by.toFixed(1)})`);
    boatG.forEach((b, k) => { const t2 = rTb(t - 0.35 * (k + 1)), on = t2 < tb && t - 0.35 * (k + 1) > tRb; attr(b, 'transform', `translate(${(BXS + 2 * KB * Math.min(t2, CROSS)).toFixed(1)},${(BY0 - 5 * KB * Math.min(t2, CROSS)).toFixed(1)})`); M.hide(b, !on); });
    const u1 = M.o3((t - tLk[0] - 0.2) / 0.5), u2 = M.o3((t - tLk[1] - 0.2) / 0.5), u3 = M.o3((t - tLk[2] - 0.2) / 0.5);
    const QX = 600, QY = 420; grow(bBW, QX, QY, QX, QY - 150, u1); at(bBWl, QX - 56, QY - 70); bBWl.style.opacity = u1.toFixed(3);
    grow(bW, QX, QY - 150, QX + 60, QY - 150, u2); at(bWl, QX + 14, QY - 166); bWl.style.opacity = u2.toFixed(3);
    grow(bB, QX, QY, QX + 60, QY - 150, u3); at(bBl, QX + 44, QY - 60); bBl.style.opacity = u3.toFixed(3);
    const u4 = M.clamp((t - tLk[3]) / 0.4); [rPath, rLandT].forEach(e => e.style.opacity = u4.toFixed(3)); [rAim, rAimT].forEach(e => e.style.opacity = M.clamp((t - tLk[3] + 0.4) / 0.4).toFixed(3));
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Should') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Part') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.2, 1e9, { dy: 8 }); M.vis($('#wslo'), t, T0('W2') + 0.4, 1e9, POP);
    flowLines(wFl, t, WY1, WY0);
    const ta = wTau(t), bx = WXS + 2 * WK * ta, by = WY0 - 5 * WK * ta;
    attr(wBoat, 'transform', `translate(${bx.toFixed(1)},${by.toFixed(1)})`);
    attr(wPath, 'x2', bx.toFixed(1)); attr(wPath, 'y2', by.toFixed(1));
    const ga = M.o3((t - tWs) / 0.5) * (1 - M.clamp((ta - 19.5) / 0.4));
    grow(wBW, bx, by - 26, bx, by - 26 - 60, ga); grow(wW, bx + 14, by, bx + 14 + 24, by, ga); grow(wB, bx, by - 26, bx + 24, by - 86, ga);
    const dOn2 = M.clamp((ta - 19.8) / 0.4); attr(wDrift, 'd', `M${WXS},${WY1 - 14} v-10 H${WXS + 120} v10`); wDrift.style.opacity = dOn2.toFixed(3); at(wDt, WXS + 60, WY1 - 34); wDt.style.opacity = dOn2.toFixed(3);
    M.setT($('#wcT'), ta.toFixed(1) + ' s'); M.setT($('#wcD'), Math.round(2 * ta) + ' m');
    M.vis($('#wc0'), t, tWs, 1e9, POP); M.vis($('#wc1'), t, tWs + 0.15, 1e9, POP); M.vis($('#wc2'), t, tW[2] + 0.4, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'add') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'subtraction') - 0.2 });
    const uR = M.o3((t - wt('X2', 'add') + 0.1) / 0.4), uW = M.o3((t - wt('X2', 'plus') + 0.1) / 0.5), uOk = M.o3((t - wt('X3', 'minus') + 0.1) / 0.5);
    grow(tgR, TP[0], TP[1], TP[0], TP[1] + TL, uR);
    grow(tgWv, TP[0], TP[1] + TL, TP[0] + TL, TP[1] + TL, uW); grow(tgW, TP[0], TP[1], TP[0] + TL, TP[1] + TL, uW); tgWt.style.opacity = uW.toFixed(3);
    grow(tgM, TP[0], TP[1] + TL, TP[0] - TL, TP[1] + TL, uOk); grow(tgOk, TP[0], TP[1], TP[0] - TL, TP[1] + TL, uOk); tgOt.style.opacity = uOk.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
