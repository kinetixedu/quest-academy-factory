// PUC Physics Ep 36: Resolution of vectors into components (Motion notebook, one turning arrow)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ink, XC = C.ac, YC = C.violet;       // colour-coding: vector A ink, x component blue, y component violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
// italic symbol with a subscript (A_x) as svg text
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr, setIco = PUC.setIco;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const Ax = tx(XC, 'A_x'), Ay = tx(YC, 'A_y'), A = tx(AC, 'A');
const rad = d => d * Math.PI / 180;

Object.assign(M.IC, {
  kite: ['M12 2 19 9 12 22 5 9Z', 'M5 9h14', 'M12 2v20'],
  ball: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M5.6 6.6c3.5 2 5 6 4.4 13.8', 'M18.4 17.4c-3.5-2-5-6-4.4-13.8'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M12 17.5V14l-3-3 4-3 2 3h2', 'M14 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0'],
  up: ['M12 19V5', 'm5 12 7-7 7 7'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tP5 = T0('P5'), tS1 = T0('S1'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tC4 = T0('C4'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three slanted motions ---------- */
const JOBS = [['kite', 'Kite string', 'PULLS UP + SIDEWAYS', 'kite', 62], ['ball', 'Ball in flight', 'FORWARD + UP', 'ball', 40], ['bike', 'Bicycle on a slope', 'ALONG + UP', 'bicycle', 22]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="190" height="100" id="jrS${i}"></svg></div>`).join('');
const jrA = JOBS.map(([, , , , ang], i) => {
  const s = $('#jrS' + i), L = 150, x0 = 18, y0 = 88, x1 = x0 + L * Math.cos(rad(ang)) * (ang > 50 ? 0.9 : 1), y1 = y0 - Math.min(80, L * Math.sin(rad(ang)));
  const dx = mk(s, 'line', { x1: x0, y1: y0, x2: x1, y2: y0, stroke: XC, 'stroke-width': 4, 'stroke-dasharray': '7 6', 'stroke-linecap': 'round' });
  const dy = mk(s, 'line', { x1: x1, y1: y0, x2: x1, y2: y1, stroke: YC, 'stroke-width': 4, 'stroke-dasharray': '7 6', 'stroke-linecap': 'round' });
  const a = PUC.arrow(s, AC, 5, 15); a.set(x0, y0, x1, y1); return [a.g, dx, dy];
});
const TILES = [['arrowR', 'How far forward?', XC], ['up', 'How high?', YC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'forward'), wt('H4', 'high')];

/* ---------- P: resolve = split + shadows ---------- */
const pd = $('#pdS'), PO = [110, 340], PT = [440, 180];
const pA = PUC.arrow(pd, AC, 6, 18), pX = PUC.arrow(pd, XC, 6, 18), pY = PUC.arrow(pd, YC, 6, 18);
const pAl = sym(pd, 250, 238, 'A', '', AC, 34), pXl = sym(pd, 262, 384, 'A', 'x', XC, 30), pYl = sym(pd, 458, 276, 'A', 'y', YC, 30);
$('#pdF').innerHTML = K(`\\vec{${A}} = \\vec{${Ax}} + \\vec{${Ay}}`);
const ps = $('#psS'), FL = 400, WA = 640, ST = [200, 340], SP = [460, 170];
mk(ps, 'line', { x1: 50, y1: FL, x2: WA, y2: FL, stroke: C.ink, 'stroke-width': 3 }); mk(ps, 'line', { x1: WA, y1: 84, x2: WA, y2: FL, stroke: C.ink, 'stroke-width': 3 });
for (let x = 62; x < WA; x += 28) mk(ps, 'line', { x1: x, y1: FL + 4, x2: x - 14, y2: FL + 18, stroke: C.dim, 'stroke-width': 2 });
for (let y = 96; y < FL; y += 28) mk(ps, 'line', { x1: WA + 4, y1: y, x2: WA + 18, y2: y + 14, stroke: C.dim, 'stroke-width': 2 });
txt(ps, 56, FL - 12, 'FLOOR', { 'font-size': 16, 'letter-spacing': 2 }); txt(ps, WA - 12, 108, 'WALL', { 'font-size': 16, 'letter-spacing': 2, 'text-anchor': 'end' });
const lamp = (x, y) => { const g = mk(ps, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 16, fill: C.gold }); [0, 45, 90, 135, 180, 225, 270, 315].forEach(a => mk(g, 'line', { x1: x + 22 * Math.cos(rad(a)), y1: y + 22 * Math.sin(rad(a)), x2: x + 31 * Math.cos(rad(a)), y2: y + 31 * Math.sin(rad(a)), stroke: C.gold, 'stroke-width': 3, 'stroke-linecap': 'round' })); return g; };
const lamp1 = lamp(330, 110), lamp2 = lamp(70, 255);
const rayV = [ST, SP].map(([x, y]) => mk(ps, 'line', { x1: x, y1: 146, x2: x, y2: FL, stroke: C.gold, 'stroke-width': 2, 'stroke-dasharray': '5 7' }));
const rayH = [ST, SP].map(([x, y]) => mk(ps, 'line', { x1: 104, y1: y, x2: WA, y2: y, stroke: C.gold, 'stroke-width': 2, 'stroke-dasharray': '5 7' }));
const sA = PUC.arrow(ps, AC, 6, 18); sA.set(ST[0], ST[1], SP[0], SP[1]); sym(ps, 300, 236, 'A', '', AC, 32);
const shX = mk(ps, 'line', { x1: ST[0], y1: FL, x2: SP[0], y2: FL, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const shY = mk(ps, 'line', { x1: WA, y1: ST[1], x2: WA, y2: SP[1], stroke: YC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const shXl = sym(ps, 300, FL + 46, 'A', 'x', XC, 30), shYl = sym(ps, WA + 26, 268, 'A', 'y', YC, 30);
const avD = PUC.avatar($('#sP'), { x: 976 + 36, y: 270 + 480, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'One arrow, two shadows!' });

/* ---------- S: the turning arrow ---------- */
const s = $('#simS'), O = [330, 420], U = 26, LEN = 10;
for (let k = -10; k <= 14; k += 2) if (k) mk(s, 'line', { x1: O[0] + k * U, y1: O[1] - 5, x2: O[0] + k * U, y2: O[1] + 5, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.5 });
for (let k = 2; k <= 10; k += 2) mk(s, 'line', { x1: O[0] - 5, y1: O[1] - k * U, x2: O[0] + 5, y2: O[1] - k * U, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.5 });
mk(s, 'line', { x1: 50, y1: O[1], x2: 730, y2: O[1], stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'line', { x1: O[0], y1: O[1] + 40, x2: O[0], y2: 100, stroke: C.ink, 'stroke-width': 2.5 });
sym(s, 712, O[1] + 34, 'x', '', C.mute, 24); sym(s, O[0] + 14, 112, 'y', '', C.mute, 24);
const ghosts = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(s, AC, 5, 16); a.g.style.opacity = op; return a; });
const prX = mk(s, 'line', { stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '5 6' }), prY = mk(s, 'line', { stroke: YC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const arc = mk(s, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const thL = sym(s, 0, 0, 'θ', '', C.ink, 26);
const vX = PUC.arrow(s, XC, 7, 20), vY = PUC.arrow(s, YC, 7, 20), vA = PUC.arrow(s, AC, 7, 22);
const vAl = sym(s, 0, 0, 'A', '', AC, 32), vXl = sym(s, 0, 0, 'A', 'x', XC, 28), vYl = sym(s, 0, 0, 'A', 'y', YC, 28);
$('#roG').innerHTML = `<span class="k">θ</span><span class="v" id="r0">0.0°</span><span class="u">angle</span>
  <span class="k" style="color:${XC}">A<sub>x</sub></span><span class="v" id="r1" style="color:${XC}">10.00</span><span class="u">A cos θ</span>
  <span class="k" style="color:${YC}">A<sub>y</sub></span><span class="v" id="r2" style="color:${YC}">0.00</span><span class="u">A sin θ</span>
  <span class="k">A</span><span class="v" id="r3">10.0</span><span class="u">√(A<sub>x</sub>² + A<sub>y</sub>²)</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 72, w: 600, h: 148, xmax: 120, ymin: -6, ymax: 10, xt: [0, 30, 60, 90, 120], yt: [-5, 0, 5, 10] });
gr.ticks.forEach(e => { e.textContent += '°'; });
const cX = gr.curve(XC), cY = gr.curve(YC), dX = gr.dot(XC), dY = gr.dot(YC);
$('#lg0').innerHTML = 'A<sub>x</sub> = A cos θ'; $('#lg1').innerHTML = 'A<sub>y</sub> = A sin θ';
const tA30 = wt('S3', 'Turn'), tA60 = wt('S4', 'sixty') - 0.2, tA90 = wt('S5', 'ninety') - 0.2, tSlo0 = wt('S8', 'arrow') - 0.3, tSlo1 = wt('S8', 'negative');
const angBase = M.keys([[0, 0], [tA30, 30], [tA60, 60], [tA90, 90]], 1.2, M.io);
const ang = t => angBase(t) + 30 * M.io((t - tSlo0) / (tSlo1 - tSlo0));
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Left of the y axis, A<sub>x</sub> is negative.' });

/* ---------- D: why cos and sin ---------- */
const STEPS = [[`\\text{right triangle: } ${A} = \\text{longest side}`, 'the arrow and its two parts'],
  [`${Ax} = ${A}\\cos\\theta`, 'cos θ = side next to θ ÷ longest side'],
  [`${Ay} = ${A}\\sin\\theta`, 'sin θ = side across from θ ÷ longest side'],
  [`${A} = \\sqrt{${Ax}^{\\,2} + ${Ay}^{\\,2}}`, 'Pythagoras: back to the size'],
  [`\\tan\\theta = ${Ay} / ${Ax}`, 'gives the direction']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:98px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${76 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'right'), wt('D3', 'So'), wt('D4', 'So'), wt('D5', 'square'), wt('D6', 'tan')];
const tr = $('#trS'), TO = [120, 500], TC = [120 + 433, 500], TP = [120 + 433, 250];
const tH = mk(tr, 'line', { x1: TO[0], y1: TO[1], x2: TP[0], y2: TP[1], stroke: AC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tB = mk(tr, 'line', { x1: TO[0], y1: TO[1], x2: TC[0], y2: TC[1], stroke: XC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tS = mk(tr, 'line', { x1: TC[0], y1: TC[1], x2: TP[0], y2: TP[1], stroke: YC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const tRa = mk(tr, 'path', { d: `M${TC[0] - 26},${TC[1]} V${TC[1] - 26} H${TC[0]}`, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
const tArc = mk(tr, 'path', { d: `M${TO[0] + 80},${TO[1]} A80,80 0 0 0 ${(TO[0] + 80 * Math.cos(rad(30))).toFixed(1)},${(TO[1] - 80 * Math.sin(rad(30))).toFixed(1)}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const tThe = sym(tr, TO[0] + 96, TO[1] - 14, 'θ', '', C.ink, 28);
const tHl = sym(tr, 300, 360, 'A', '', AC, 34), tBl = sym(tr, 270, 548, 'A', 'x', XC, 32), tSl = sym(tr, TC[0] + 22, 390, 'A', 'y', YC, 32);
const tWx = txt(tr, 330, 546, 'next to θ', { 'font-size': 20, fill: XC, 'font-weight': 600 }), tWy = txt(tr, TC[0] + 22, 420, 'across', { 'font-size': 20, fill: YC, 'font-weight': 600 });
const RC = [`\\cos\\theta = ${Ax} / ${A}`, `\\sin\\theta = ${Ay} / ${A}`, `${Ax}^{\\,2} + ${Ay}^{\\,2} = ${A}^{\\,2}`];
RC.forEach((f, i) => { $('#rc' + i).innerHTML = K(f); });
const tRc = [wt('D3', 'Cos'), wt('D4', 'Sin'), wt('D5', 'Pythagoras')];
$('#stF').innerHTML = K(`${Ax} = ${A}\\cos\\theta \\qquad ${Ay} = ${A}\\sin\\theta`);

/* ---------- C: side by side ---------- */
const sbs = (svg, deg) => { const o = deg ? [356, 262] : [120, 150], L = deg ? 220 : 300, e = [o[0] + L * Math.cos(rad(deg)), o[1] - L * Math.sin(rad(deg))];
  mk(svg, 'line', { x1: o[0] - 40, y1: o[1], x2: o[0] + 300, y2: o[1], stroke: C.ink, 'stroke-width': 2, opacity: 0.35 }); mk(svg, 'line', { x1: o[0], y1: o[1] + 30, x2: o[0], y2: o[1] - (deg ? 250 : 120), stroke: C.ink, 'stroke-width': 2, opacity: 0.35 });
  const a = PUC.arrow(svg, AC, 7, 20), c = PUC.arrow(svg, deg ? YC : XC, 7, 20), z = mk(svg, 'circle', { cx: o[0], cy: o[1], r: 9, fill: deg ? XC : YC });
  const la = sym(svg, deg ? o[0] - 50 : o[0] + 140, deg ? o[1] - 100 : o[1] - 38, 'A', '', AC, 32);
  const lc = sym(svg, deg ? o[0] + 24 : o[0] + 136, deg ? o[1] - 100 : o[1] + 52, 'A', deg ? 'y' : 'x', deg ? YC : XC, 30);
  const lz = sym(svg, deg ? o[0] + 60 : o[0] + L + 40, deg ? o[1] - 14 : o[1] - 4, 'A', deg ? 'x' : 'y', deg ? XC : YC, 26);
  const lz2 = txt(svg, deg ? o[0] + 100 : o[0] + L + 80, deg ? o[1] - 14 : o[1] - 4, '= 0', { 'font-size': 24, fill: C.ink, 'font-weight': 600 });
  return (t, t0) => { const u = M.o3((t - t0) / 0.7); if (deg) { a.set(o[0] - 18, o[1], o[0] - 18, o[1] - L * u); c.set(o[0] + 6, o[1], o[0] + 6, o[1] - L * u); } else { a.set(o[0], o[1] - 22, o[0] + L * u, o[1] - 22); c.set(o[0], o[1] + 8, o[0] + L * u, o[1] + 8); }
    [la, lc].forEach(e => e.style.opacity = u.toFixed(3)); [z, lz, lz2].forEach(e => e.style.opacity = M.clamp((t - t0 - 0.6) / 0.3).toFixed(3)); };
};
const sb0 = sbs($('#c0S'), 0), sb1 = sbs($('#c1S'), 90);
$('#c0a').innerHTML = K(`\\cos 0^\\circ = 1 \\;\\Rightarrow\\; ${Ax} = 10`); $('#c0b').innerHTML = K(`\\sin 0^\\circ = 0 \\;\\Rightarrow\\; ${Ay} = 0`);
$('#c1a').innerHTML = K(`\\cos 90^\\circ = 0 \\;\\Rightarrow\\; ${Ax} = 0`); $('#c1b').innerHTML = K(`\\sin 90^\\circ = 1 \\;\\Rightarrow\\; ${Ay} = 10`);
const th1 = PUC.think($('#th1'), { q: `At 45°, which part is bigger: <span class="vx">A<sub>x</sub></span> or <span class="vy">A<sub>y</sub></span>?`, opts: ['<span class="vx">A<sub>x</sub></span>', '<span class="vy">A<sub>y</sub></span>', 'Equal'], right: 2,
  why: 'cos 45° = sin 45° ≈ 0.707, so each part ≈ 7.07 units (A = 10).' });
const th2 = PUC.think($('#th2'), { q: 'Can a component ever be longer than the vector itself?', opts: ['Yes', 'No'], right: 1,
  why: 'The vector is the longest side. Cos and sin never go above 1.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${tx(XC, '\\text{forward}')} = 10\\cos 30^\\circ`)],
  [K(`= 10 \\times 0.866 = ${tx(XC, '8.66\\,\\text{m}')}`)],
  [K(`${tx(YC, '\\text{height}')} = 10\\sin 30^\\circ = 10 \\times \\tfrac{1}{2}`)],
  [K(`= ${tx(YC, '5\\,\\text{m}')} \\quad \\sqrt{8.66^2 + 5^2} \\approx 10`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [90, 410], WL = 500, WT = [WO[0] + WL * Math.cos(rad(30)), WO[1] - WL * Math.sin(rad(30))];
mk(w, 'path', { d: `M${WO[0] - 40},${WO[1]} H${WT[0] + 60}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' });
mk(w, 'path', { d: `M${WO[0]},${WO[1]} L${WT[0]},${WT[1]} L${WT[0]},${WO[1]} Z`, fill: '#EDE6D6', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(w, 'path', { d: `M${WO[0] + 70},${WO[1]} A70,70 0 0 0 ${(WO[0] + 70 * Math.cos(rad(30))).toFixed(1)},${(WO[1] - 70 * Math.sin(rad(30))).toFixed(1)}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
txt(w, WO[0] + 84, WO[1] - 12, '30°', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const wA = PUC.arrow(w, AC, 6, 18), wX = PUC.arrow(w, XC, 7, 20), wY = PUC.arrow(w, YC, 7, 20);
const wAl = txt(w, 0, 0, '10 m', { 'font-size': 26, fill: AC, 'font-weight': 600 });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'circle', { r: 15, fill: C.ink, opacity: op }));
const wB = mk(w, 'circle', { r: 15, fill: C.ink });
const tRide = T0('W2') + 0.3, tW = [wt('W3', 'Forward'), wt('W4', 'Cos'), wt('W5', 'Height'), wt('W6', 'That')];
const rideU = t => M.io((t - tRide) / 2.4);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A<sub>x</sub> is always A cos θ', right: 'A<sub>x</sub> = A cos θ only if θ is measured from the x axis' });
const tg = $('#tg'), GO = [130, 196], GL = 180, GT = [GO[0] + GL * Math.sin(rad(30)), GO[1] - GL * Math.cos(rad(30))];
const tgx = mk(tg, 'line', { x1: GO[0] - 20, y1: GO[1], x2: 470, y2: GO[1], stroke: C.ink, 'stroke-width': 2.5 }), tgy = mk(tg, 'line', { x1: GO[0], y1: GO[1] + 20, x2: GO[0], y2: 30, stroke: C.ink, 'stroke-width': 2.5 });
const tgA = PUC.arrow(tg, AC, 6, 18), tgX = PUC.arrow(tg, XC, 7, 18);
const tgArc = mk(tg, 'path', { d: `M${GO[0]},${GO[1] - 64} A64,64 0 0 1 ${(GO[0] + 64 * Math.sin(rad(30))).toFixed(1)},${(GO[1] - 64 * Math.cos(rad(30))).toFixed(1)}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
const tgTh = sym(tg, GO[0] + 10, GO[1] - 78, 'θ', '', C.ink, 24), tgL = txt(tg, GT[0] + 24, GO[1] + 40, 'A sin θ', { 'font-size': 26, fill: XC, 'font-weight': 600 });
const tgN = txt(tg, GO[0] + 14, 36, 'θ from the y axis', { 'font-size': 18, fill: C.mute });
const tJn = wt('X3', 'measured');
const where = PUC.where($('#wa'), { on: [], type: 'Inside bigger problems: projectiles, forces on a slope, adding many vectors' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A vector of magnitude 13 units has x component +12 and points below the x axis. Which is correct?', qW: 780,
  opts: [K(`${Ay} = +5,\\; \\text{at } \\tan^{-1}(5/12) \\text{ above the } x \\text{ axis}`), K(`${Ay} = -5,\\; \\text{at } \\tan^{-1}(5/12) \\text{ below the } x \\text{ axis}`),
    K(`${Ay} = -5,\\; \\text{at } \\tan^{-1}(12/5) \\text{ below the } x \\text{ axis}`), K(`${Ay} = -1,\\; \\text{at } \\tan^{-1}(1/12) \\text{ below the } x \\text{ axis}`)], right: 1, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 256 });
const so = PUC.solution($('#so'), [[K(`${Ay}^{\\,2} = 13^2 - 12^2 = 25`)], [K(`|${Ay}| = 5`)], [K(`\\text{below } x \\;\\Rightarrow\\; ${Ay} = -5`)], [K(`\\tan\\alpha = 5/12 \\;\\Rightarrow\\; \\textbf{B}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'squared'), wt('A2', 'size'), wt('A3', 'below'), wt('A3', 'tan')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · resolving a vector', y0: 92, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`${Ax} = ${A}\\cos\\theta \\qquad ${Ay} = ${A}\\sin\\theta`), K(`${A} = \\sqrt{${Ax}^{\\,2} + ${Ay}^{\\,2}} \\qquad \\tan\\theta = ${Ay}/${Ax}`),
    '<b>Components</b> add back to the vector, and can be negative', '<b>Check</b> where θ is measured before you pick cos or sin'] });
const YQ = ['What does it mean to resolve a vector?', 'Why can a component never be longer than the vector?', 'If θ is measured from the y axis, which formula gives A<sub>x</sub>?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 37', topic: 'Tiny arrows of length one that build every vector: Unit Vectors', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 - 0.1, 1.06, 960, 560], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const [ag, dx, dy] = jrA[i]; M.vis(ag, t, tMorph + 0.5 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }); M.draw(dx, t, wt('H2', 'two') + i * 0.1, 0.4); M.draw(dy, t, wt('H2', 'two') + 0.3 + i * 0.1, 0.4);
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'two')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H5', 'split') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tTile[i]) / 0.25) * (1 - M.io((t - tH5) / 0.3))); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pdef'), t, T0('P2') + 0.1, { st: 0.04 });
    const ua = M.o3((t - wt('P2', 'split')) / 0.6); pA.set(PO[0], PO[1], PO[0] + (PT[0] - PO[0]) * ua, PO[1] + (PT[1] - PO[1]) * ua); pAl.style.opacity = ua;
    const ux = M.o3((t - wt('P2', 'two')) / 0.5), uy = M.o3((t - wt('P2', 'along')) / 0.5);
    pX.set(PO[0], PO[1], PO[0] + (PT[0] - PO[0]) * ux, PO[1]); pY.set(PT[0], PO[1], PT[0], PO[1] + (PT[1] - PO[1]) * uy); pXl.style.opacity = ux; pYl.style.opacity = uy;
    PUC.write($('#pdF'), t, wt('P3', 'Added') - 0.1, 0.8);
    M.vis($('#pdP'), t, wt('P4', 'easiest') - 0.1, 1e9, POP);
    M.vis($('#ps'), t, tP5 - 0.1, out, { dx: 60, dy: 0, ...o });
    const tl1 = wt('P5', 'lamp'), tl2 = wt('P6', 'lamp');
    M.vis(lamp1, t, tl1 - 0.1, 1e9, POP); rayV.forEach((r, i) => M.draw(r, t, wt('P5', 'overhead') + i * 0.15, 0.5)); M.draw(shX, t, wt('P5', 'floor') - 0.1, 0.5); M.vis(shXl, t, wt('P5', 'x') - 0.1, 1e9, POP);
    M.vis(lamp2, t, tl2 - 0.1, 1e9, POP); rayH.forEach((r, i) => M.draw(r, t, wt('P6', 'side') + i * 0.15, 0.5)); M.draw(shY, t, wt('P6', 'wall') - 0.1, 0.5); M.vis(shYl, t, wt('P6', 'y') - 0.1, 1e9, POP);
    avD(t, wt('P6', 'component') + 0.3, out);
  }

  /* S: the turning arrow + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const grow = M.o3((t - T0('S2')) / 0.7), th = ang(t), c = Math.cos(rad(th)), sn = Math.sin(rad(th));
    const ax = LEN * c, ay = LEN * sn, tip = [O[0] + LEN * U * c * grow, O[1] - LEN * U * sn * grow];
    vA.set(O[0], O[1], tip[0], tip[1]);
    const cu = M.clamp((t - T0('S2') - 0.6) / 0.4);
    vX.set(O[0], O[1], O[0] + ax * U * cu, O[1]); vY.set(O[0], O[1], O[0], O[1] - ay * U * cu);
    attr(prX, 'x1', tip[0].toFixed(1)); attr(prX, 'y1', tip[1].toFixed(1)); attr(prX, 'x2', tip[0].toFixed(1)); attr(prX, 'y2', O[1]);
    attr(prY, 'x1', tip[0].toFixed(1)); attr(prY, 'y1', tip[1].toFixed(1)); attr(prY, 'x2', O[0]); attr(prY, 'y2', tip[1].toFixed(1));
    prX.style.opacity = cu * M.clamp(Math.abs(ay) / 0.4); prY.style.opacity = cu * M.clamp(Math.abs(ax) / 0.4);
    ghosts.forEach((gA, k) => { const tg2 = ang(t - 0.14 * (k + 1)); if (Math.abs(tg2 - th) < 0.8 || grow < 1) { M.hide(gA.g, true); return; } gA.set(O[0], O[1], O[0] + LEN * U * Math.cos(rad(tg2)), O[1] - LEN * U * Math.sin(rad(tg2))); });
    const r = 62; attr(arc, 'd', th < 1 ? '' : `M${O[0] + r},${O[1]} A${r},${r} 0 0 0 ${(O[0] + r * c).toFixed(1)},${(O[1] - r * sn).toFixed(1)}`);
    attr(thL, 'x', (O[0] + 88 * Math.cos(rad(th / 2)) - 8).toFixed(1)); attr(thL, 'y', (O[1] - 88 * Math.sin(rad(th / 2)) + 10).toFixed(1)); thL.style.opacity = M.clamp((th - 8) / 6);
    attr(vAl, 'x', (O[0] + (LEN * U + 26) * c - 10).toFixed(1)); attr(vAl, 'y', (O[1] - (LEN * U + 26) * sn + 10).toFixed(1)); vAl.style.opacity = grow;
    attr(vXl, 'x', (O[0] + ax * U / 2 - 16).toFixed(1)); attr(vXl, 'y', O[1] + 40); vXl.style.opacity = cu * M.clamp(Math.abs(ax) / 2);
    attr(vYl, 'x', ax < 0 ? O[0] + 14 : O[0] - 52); attr(vYl, 'y', (O[1] - ay * U / 2 + 10).toFixed(1)); vYl.style.opacity = cu * M.clamp(Math.abs(ay) / 2);
    M.setT($('#r0'), th.toFixed(1) + '°'); M.setT($('#r1'), f2(ax)); M.setT($('#r2'), f2(ay)); M.setT($('#r3'), Math.hypot(ax, ay).toFixed(1));
    $('#r1').style.color = ax < -0.005 ? C.red : XC;
    cX(s2 => [s2, LEN * Math.cos(rad(s2))], 0, th); cY(s2 => [s2, LEN * Math.sin(rad(s2))], 0, th); dX(th, ax, t > tS1 + 0.5); dY(th, ay, t > tS1 + 0.5);
    M.vis($('#leg'), t, wt('S6', 'cosine') - 0.2, 1e9, { dy: 10 }); [0, 1].forEach(i => M.vis($('#lg' + i), t, wt('S6', i ? 'sine' : 'cosine') - 0.1, 1e9, POP));
    M.vis($('#slo'), t, wt('S7', 'slow') - 0.1, out, POP);
    avA(t, wt('S8', 'component') + 0.1, out);
  }

  /* D: why cos and sin */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(76, tStep.slice(1).map((tt, i) => [tt - 0.1, 76 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D2') - 0.1, 1e9, { dx: 60, dy: 0 });
    M.draw(tH, t, wt('D2', 'arrow'), 0.5); M.draw(tB, t, wt('D2', 'two') - 0.1, 0.4); M.draw(tS, t, wt('D2', 'parts'), 0.4);
    M.vis(tRa, t, wt('D2', 'right') - 0.05, 1e9, POP); M.draw(tArc, t, wt('D2', 'right'), 0.4); M.vis(tThe, t, wt('D2', 'right') + 0.2, 1e9, POP);
    M.vis(tHl, t, wt('D2', 'longest') - 0.1, 1e9, POP);
    const hl = (tt, u0) => 6 + 4 * M.io((t - tt) / 0.25) * (1 - M.io((t - u0) / 0.25));
    attr(tH, 'stroke-width', hl(wt('D2', 'longest'), T0('D3')).toFixed(2));
    attr(tB, 'stroke-width', hl(wt('D3', 'next'), T0('D4')).toFixed(2)); attr(tS, 'stroke-width', hl(wt('D4', 'across'), T0('D5')).toFixed(2));
    M.vis(tBl, t, wt('D3', 'next') - 0.1, 1e9, POP); M.vis(tWx, t, wt('D3', 'next'), 1e9, POP);
    M.vis(tSl, t, wt('D4', 'across') - 0.1, 1e9, POP); M.vis(tWy, t, wt('D4', 'across'), 1e9, POP);
    tRc.forEach((tt, i) => PUC.write($('#rc' + i), t, tt, 0.7));
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Cosine') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Sine'), 0.8);
  }

  /* C: side by side + two thinks */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); sb0(t, T0('C2'));
    PUC.write($('#c0a'), t, wt('C2', 'cos'), 0.6); PUC.write($('#c0b'), t, wt('C2', 'So'), 0.6);
    M.vis($('#c1'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o }); sb1(t, T0('C3'));
    PUC.write($('#c1a'), t, wt('C3', 'cos'), 0.6); PUC.write($('#c1b'), t, wt('C3', 'So'), 0.6);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'which') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Cos') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'longer') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'component') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const u = rideU(t), bp = s2 => [WO[0] + (WT[0] - WO[0]) * s2, WO[1] + (WT[1] - WO[1]) * s2], n = [Math.sin(rad(30)), Math.cos(rad(30))];
    const b = bp(u); attr(wB, 'cx', (b[0] - n[0] * 15).toFixed(1)); attr(wB, 'cy', (b[1] - n[1] * 15).toFixed(1)); M.hide(wB, t < tRide - 0.3);
    wGh.forEach((g, k) => { const u2 = rideU(t - 0.12 * (k + 1)), q = bp(u2); attr(g, 'cx', (q[0] - n[0] * 15).toFixed(1)); attr(g, 'cy', (q[1] - n[1] * 15).toFixed(1)); M.hide(g, Math.abs(u - u2) < 0.01); });
    const ua = M.clamp(u); wA.set(WO[0] - n[0] * 44, WO[1] - n[1] * 44, WO[0] - n[0] * 44 + (WT[0] - WO[0]) * ua, WO[1] - n[1] * 44 + (WT[1] - WO[1]) * ua);
    attr(wAl, 'x', (WO[0] + (WT[0] - WO[0]) * 0.45 - 70).toFixed(1)); attr(wAl, 'y', (WO[1] + (WT[1] - WO[1]) * 0.45 - 56).toFixed(1)); wAl.style.opacity = M.clamp((u - 0.5) * 3);
    const ux = M.o3((t - tW[0]) / 0.6), uy = M.o3((t - tW[2]) / 0.6);
    wX.set(WO[0], WO[1] + 30, WO[0] + (WT[0] - WO[0]) * ux, WO[1] + 30); wY.set(WT[0] + 28, WO[1], WT[0] + 28, WO[1] + (WT[1] - WO[1]) * uy);
    M.vis($('#wc0'), t, wt('W4', 'eight') - 0.1, 1e9, POP); M.vis($('#wc1'), t, tW[3] - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'component') - 0.3, tStrike: wt('X3', 'depends') - 0.1, tRight: wt('X3', 'If') - 0.1 });
    M.draw(tgx, t, tJn - 0.2, 0.4); M.draw(tgy, t, tJn - 0.05, 0.4); M.vis(tgN, t, wt('X3', 'y') - 0.1, 1e9, { dy: 8 });
    const ua = M.o3((t - tJn + 0.1) / 0.5); tgA.set(GO[0], GO[1], GO[0] + (GT[0] - GO[0]) * ua, GO[1] + (GT[1] - GO[1]) * ua);
    M.draw(tgArc, t, wt('X3', 'y') - 0.1, 0.4); M.vis(tgTh, t, wt('X3', 'y'), 1e9, POP);
    const ux = M.o3((t - wt('X3', 'sin') + 0.4) / 0.5); tgX.set(GO[0], GO[1], GO[0] + (GT[0] - GO[0]) * ux, GO[1]); M.vis(tgL, t, wt('X3', 'sin') - 0.1, 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Mostly') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
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
