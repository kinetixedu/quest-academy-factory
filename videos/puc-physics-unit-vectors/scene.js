// PUC Physics Ep 37: Unit vectors (Motion notebook, unit steps + stretch and turn)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const AC = C.ink, XC = C.ac, YC = C.violet, HC = C.ac, ZC = C.gold;   // A ink, x / i-hat blue, y / j-hat violet, unit vector A-hat blue, z / k-hat gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const I = tx(XC, '\\hat{i}'), J = tx(YC, '\\hat{j}'), Kh = tx(ZC, '\\hat{k}'), Ah = tx(HC, '\\hat{A}'), Av = tx(AC, '\\vec{A}'), A = tx(AC, 'A');
const rad = d => d * Math.PI / 180;
const ns = (x, d = 2) => (Math.abs(x) < 0.005 ? 0 : x).toFixed(d);
const vstr = (x, y) => `${ns(x)}î ${y < -0.005 ? '-' : '+'} ${ns(Math.abs(y))}ĵ`;

Object.assign(M.IC, {
  map: ['M14.1 6.3 9.9 4.2a2 2 0 0 0-1.8 0L3.6 6.4A1 1 0 0 0 3 7.3v12.1a1 1 0 0 0 1.4.9l3.7-1.8a2 2 0 0 1 1.8 0l4.2 2.1a2 2 0 0 0 1.8 0l4.5-2.2a1 1 0 0 0 .6-.9V5.3a1 1 0 0 0-1.4-.9l-3.7 1.8a2 2 0 0 1-1.8 0Z', 'M15 6.8v14', 'M9 3.2v14'],
  steps: ['M4 16v-2.4C4 11.5 3 10.5 3 8c0-2.7 1.5-6 4.5-6C9.4 2 10 3.8 10 5.5c0 3.1-2 5.7-2 8.7V16a2 2 0 1 1-4 0Z', 'M20 20v-2.4c0-2.1 1-3.1 1-5.6 0-2.7-1.5-6-4.5-6C14.6 6 14 7.8 14 9.5c0 3.1 2 5.7 2 8.7V20a2 2 0 1 0 4 0Z'],
  drone: ['M5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M19 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 5h10', 'M9 9h6v5H9z', 'M12 14v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP5 = T0('P5'), tS1 = T0('S1'), tS5 = T0('S5'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tC4 = T0('C4'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['map', 'Map', 'HOW MANY + WHICH WAY', 'map', '3', 'east'], ['steps', 'Friend', 'HOW MANY + WHICH WAY', 'friend', '4', 'north'], ['drone', 'Drone', 'HOW MUCH + WHICH WAY', 'drone', '5 m', 'up']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , v, d], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span class="jA">${v}</span><span class="jB" style="color:${XC}">${d}</span></div></div>`).join('');
const TILES = [['arrowR', '3 steps east', XC], ['arrowU', '4 steps north', YC], ['help', '1 step east = ?', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Three'), wt('H4', 'four'), wt('H4', 'exactly')];

/* ---------- P ---------- */
$('#pdF').innerHTML = K(Ah);
const ps = $('#psS'), PO = [300, 400], PU = 190;
mk(ps, 'line', { x1: PO[0] - 220, y1: PO[1], x2: PO[0] + 300, y2: PO[1], stroke: C.ink, 'stroke-width': 2, opacity: 0.35 });
mk(ps, 'line', { x1: PO[0], y1: PO[1] + 140, x2: PO[0], y2: PO[1] - 290, stroke: C.ink, 'stroke-width': 2, opacity: 0.35 });
mk(ps, 'line', { x1: PO[0] + 110, y1: PO[1] - 90, x2: PO[0] - 170, y2: PO[1] + 140, stroke: C.ink, 'stroke-width': 2, opacity: 0.35, 'stroke-dasharray': '6 6' });
txt(ps, PO[0] + 290, PO[1] + 30, 'x', { 'text-anchor': 'end' }); txt(ps, PO[0] + 14, PO[1] - 270, 'y'); txt(ps, PO[0] - 186, PO[1] + 130, 'z');
const pI = PUC.arrow(ps, XC, 8, 22), pJ = PUC.arrow(ps, YC, 8, 22), pK = PUC.arrow(ps, ZC, 8, 22);
const KZ = [-0.62, 0.78];
const pIl = sym(ps, PO[0] + PU / 2 - 10, PO[1] + 44, 'î', XC, 40), pJl = sym(ps, PO[0] - 46, PO[1] - PU / 2 + 12, 'ĵ', YC, 40), pKl = sym(ps, PO[0] + KZ[0] * PU * 0.75 - 40, PO[1] + KZ[1] * PU * 0.75 + 4, 'k̂', ZC, 40);
const pTg = [txt(ps, PO[0] + PU + 10, PO[1] - 14, 'size 1', { fill: XC, 'font-weight': 600, 'font-size': 20 }), txt(ps, PO[0] + 14, PO[1] - PU - 12, 'size 1', { fill: YC, 'font-weight': 600, 'font-size': 20 }), txt(ps, PO[0] + KZ[0] * PU + 10, PO[1] + KZ[1] * PU + 24, 'size 1', { fill: ZC, 'font-weight': 600, 'font-size': 20 })];
const tIJK = [wt('P6', 'i'), wt('P6', 'j'), wt('P6', 'k')];

/* ---------- S: unit steps, stretch, turn ---------- */
const s = $('#simS'), O = [100, 520], U = 44;
for (let k = 1; k <= 14; k++) mk(s, 'line', { x1: O[0] + k * U, y1: 90, x2: O[0] + k * U, y2: O[1], stroke: C.line, 'stroke-width': 1 });
for (let k = 1; k <= 9; k++) mk(s, 'line', { x1: O[0], y1: O[1] - k * U, x2: 730, y2: O[1] - k * U, stroke: C.line, 'stroke-width': 1 });
mk(s, 'line', { x1: O[0] - 30, y1: O[1], x2: 740, y2: O[1], stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'line', { x1: O[0], y1: O[1] + 30, x2: O[0], y2: 90, stroke: C.ink, 'stroke-width': 2.5 });
const uc = mk(s, 'circle', { cx: O[0], cy: O[1], r: U, fill: 'none', stroke: HC, 'stroke-width': 2, 'stroke-dasharray': '4 5' });
const iSt = [0, 1, 2].map(() => PUC.arrow(s, XC, 6, 14)), jSt = [0, 1, 2, 3].map(() => PUC.arrow(s, YC, 6, 14));
const iL = sym(s, O[0] + 1.3 * U, O[1] + 40, '3î', XC, 28), jL = sym(s, O[0] + 3 * U + 28, O[1] - 2 * U + 10, '4ĵ', YC, 28);
const ghosts = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(s, AC, 5, 16); a.g.style.opacity = op; return a; });
const vA = PUC.arrow(s, AC, 7, 22), vH = PUC.arrow(s, HC, 9, 20);
const vAl = sym(s, 0, 0, 'A', AC, 32), vHl = sym(s, 0, 0, 'Â', HC, 30);
// zoom inset: the unit circle at 2.6x
const ZO = [610, 214], ZR = 110;
const zG = mk(s, 'g', {});
mk(zG, 'rect', { x: ZO[0] - 150, y: ZO[1] - 140, width: 300, height: 280, rx: 14, fill: '#fff', stroke: C.line, 'stroke-width': 2 });
mk(zG, 'line', { x1: ZO[0] - 130, y1: ZO[1], x2: ZO[0] + 130, y2: ZO[1], stroke: C.ink, 'stroke-width': 1.5, opacity: 0.4 }); mk(zG, 'line', { x1: ZO[0], y1: ZO[1] + 124, x2: ZO[0], y2: ZO[1] - 124, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.4 });
mk(zG, 'circle', { cx: ZO[0], cy: ZO[1], r: ZR, fill: 'none', stroke: HC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
txt(zG, ZO[0] - 136, ZO[1] - 116, 'ZOOM · RADIUS 1', { 'font-size': 15, 'letter-spacing': 1 });
const zH = PUC.arrow(zG, HC, 8, 20);
$('#roG').innerHTML = `<span class="k">A</span><span class="v" id="r0">0.00î + 0.00ĵ</span><span class="u">vector</span>
  <span class="k">|A|</span><span class="v" id="r1">0.00</span><span class="u">size</span>
  <span class="k" style="color:${HC}">Â</span><span class="v" id="r2" style="color:${HC}">0.60î + 0.80ĵ</span><span class="u">A ÷ |A|</span>
  <span class="k" style="color:${HC}">|Â|</span><span class="v" id="r3" style="color:${HC}">1.00</span><span class="u">always 1</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 72, w: 600, h: 148, xmax: 2, ymin: 0, ymax: 10, xt: [0, 1, 2], yt: [0, 5, 10] });
gr.ticks.forEach(e => { e.textContent = '×' + e.textContent; });
const cA = gr.curve(AC), cH = gr.curve(HC), dA = gr.dot(AC), dH = gr.dot(HC);
$('#lg0').innerHTML = '|A| grows'; $('#lg1').innerHTML = '|Â| stays 1';
const tI = [0, 1, 2].map(k => wt('S2', 'three') + 0.1 + k * 0.32), tJ = [0, 1, 2, 3].map(k => wt('S3', 'four') + 0.1 + k * 0.28), tRes = wt('S4', 'Join');
const tStr0 = wt('S6', 'grows') - 0.2, tStr1 = wt('S6', 'ten') + 0.2, tTu0 = wt('S8', 'turns') - 0.3, tTu1 = wt('S8', 'circle') + 0.4;
const TH0 = Math.atan2(4, 3) * 180 / Math.PI;
const stretch = t => 1 + M.io((t - tStr0) / (tStr1 - tStr0));
const angF = t => TH0 - 33 * M.io((t - tTu0) / (tTu1 - tTu0));
const avA = PUC.avatar($('#sS'), { x: 160 + 64, y: 270 + 76, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Â only turns!' });

/* ---------- D ---------- */
const STEPS = [[`${Ah} = ${Av} \\,/\\, ${A}`, 'divide the vector by its own size'],
  [`|${Ah}| = ${A} \\,/\\, ${A} = 1`, 'so its size is exactly one'],
  [`\\text{m} \\,/\\, \\text{m} \\;\\to\\; \\text{no unit}`, 'the units cancel too'],
  [`${Av} = ${A}\\,${Ah}`, 'size times direction'],
  [`${Av} = ${tx(XC, 'A_x')}\\,${I} + ${tx(YC, 'A_y')}\\,${J}`, 'size times direction, along each axis']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:98px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#steps').querySelectorAll('.st .sx').forEach(e => { e.style.fontSize = '34px'; e.style.top = '-2px'; }); $('#steps').querySelectorAll('.st .why').forEach(e => { e.style.top = '46px'; });
const tStep = [wt('D2', 'Divide'), wt('D3', 'Check'), wt('D4', 'units'), wt('D5', 'Turn'), wt('D6', 'components')];
const tr = $('#trS'), DO = [130, 500], DU = 70, DT = [DO[0] + 3 * DU, DO[1] - 4 * DU];
mk(tr, 'line', { x1: DO[0] - 30, y1: DO[1], x2: 700, y2: DO[1], stroke: C.ink, 'stroke-width': 2, opacity: 0.35 }); mk(tr, 'line', { x1: DO[0], y1: DO[1] + 30, x2: DO[0], y2: 100, stroke: C.ink, 'stroke-width': 2, opacity: 0.35 });
const dA2 = PUC.arrow(tr, AC, 7, 22), dH2 = PUC.arrow(tr, HC, 9, 20), dX2 = PUC.arrow(tr, XC, 6, 18), dY2 = PUC.arrow(tr, YC, 6, 18);
const dAl = txt(tr, DO[0] + 1.5 * DU - 135, DO[1] - 2 * DU + 4, 'A = 5 m', { 'font-size': 26, fill: AC, 'font-weight': 600 });
const dDiv = txt(tr, 460, 200, '÷ 5', { 'font-size': 40, fill: HC, 'font-weight': 600 }), dMul = txt(tr, 460, 200, '× 5', { 'font-size': 40, fill: AC, 'font-weight': 600 });
const dHl = txt(tr, DO[0] + 54, DO[1] - 70, 'Â', { 'font-size': 32, fill: HC, 'font-weight': 600, 'font-family': 'Poppins', 'font-style': 'italic' });
const dHt = txt(tr, 420, 270, '|Â| = 1 · no unit', { 'font-size': 24, fill: HC, 'font-weight': 600 });
const dXl = txt(tr, DO[0] + 70, DO[1] + 58, 'Ax î', { 'font-size': 24, fill: XC, 'font-weight': 600 }), dYl = txt(tr, DT[0] + 42, DO[1] - 2 * DU + 30, 'Ay ĵ', { 'font-size': 24, fill: YC, 'font-weight': 600 });
$('#stF').innerHTML = K(`${Av} = ${A}\\,${Ah}`);

/* ---------- C: side by side ---------- */
const sbs = (svg, unit) => { const o = [96, 262], u = unit ? 220 : 44, e = [o[0] + 3 / (unit ? 5 : 1) * u, o[1] - 4 / (unit ? 5 : 1) * u];
  if (!unit) for (let k = 1; k <= 12; k++) mk(svg, 'line', { x1: o[0] + k * u, y1: 20, x2: o[0] + k * u, y2: o[1], stroke: C.line, 'stroke-width': 1 });
  mk(svg, 'line', { x1: o[0] - 30, y1: o[1], x2: 680, y2: o[1], stroke: C.ink, 'stroke-width': 2, opacity: 0.35 }); mk(svg, 'line', { x1: o[0], y1: o[1] + 20, x2: o[0], y2: 14, stroke: C.ink, 'stroke-width': 2, opacity: 0.35 });
  if (unit) mk(svg, 'path', { d: `M${o[0] + u},${o[1]} A${u},${u} 0 0 0 ${o[0]},${o[1] - u}`, fill: 'none', stroke: HC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
  const a = PUC.arrow(svg, unit ? HC : AC, unit ? 9 : 7, 22), dx = mk(svg, 'line', { x1: e[0], y1: e[1], x2: e[0], y2: o[1], stroke: YC, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
  const lab = txt(svg, e[0] + 18, e[1] + 10, unit ? 'size 1' : 'size 5', { 'font-size': 24, fill: unit ? HC : AC, 'font-weight': 600 });
  const lx = txt(svg, o[0] + (e[0] - o[0]) / 2 - 20, o[1] + 26, unit ? '0.6' : '3', { 'font-size': 20, fill: XC, 'font-weight': 600 }), ly = txt(svg, e[0] + 10, (e[1] + o[1]) / 2 + 30, unit ? '0.8' : '4', { 'font-size': 20, fill: YC, 'font-weight': 600 });
  return (t, t0) => { const q = M.o3((t - t0) / 0.7); a.set(o[0], o[1], o[0] + (e[0] - o[0]) * q, o[1] + (e[1] - o[1]) * q); [lab, lx, ly, dx].forEach(el => el.style.opacity = M.clamp((t - t0 - 0.5) / 0.3).toFixed(3)); };
};
const sb0 = sbs($('#c0S'), 0), sb1 = sbs($('#c1S'), 1);
$('#c0a').innerHTML = K(`${Av} = 3${I} + 4${J}`); $('#c0b').innerHTML = K(`${A} = \\sqrt{3^2 + 4^2} = 5`);
$('#c1a').innerHTML = K(`${Ah} = 0.6${I} + 0.8${J}`); $('#c1b').innerHTML = K(`|${Ah}| = \\sqrt{0.36 + 0.64} = 1`);
const th1 = PUC.think($('#th1'), { q: `Is 2<span class="vx">î</span> a unit vector?`, opts: ['Yes', 'No'], right: 1, why: 'Its size is 2, not 1. A unit vector has size exactly 1.' });
const th2 = PUC.think($('#th2'), { q: `Is <span class="vx">î</span> + <span class="vy">ĵ</span> a unit vector?`, opts: ['Yes', 'No'], right: 1, why: 'Its size is √2 ≈ 1.41. The unit vector is (î + ĵ)/√2.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${Av} = 3${I} + 4${J}\\;\\text{m}`)],
  [K(`${A} = \\sqrt{3^2 + 4^2} = 5\\,\\text{m}`)],
  [K(`${Ah} = \\dfrac{3${I} + 4${J}}{5} = 0.6${I} + 0.8${J}`)],
  [K(`0.6^2 + 0.8^2 = 1 \\;\\checkmark`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [140, 470], WU = 70, WE = [WO[0] + 3 * WU, WO[1]], WN = [WO[0] + 3 * WU, WO[1] - 4 * WU];
for (let k = 0; k <= 8; k++) mk(w, 'line', { x1: WO[0] - WU + k * WU, y1: 90, x2: WO[0] - WU + k * WU, y2: 520, stroke: C.line, 'stroke-width': 1 });
for (let k = 0; k <= 6; k++) mk(w, 'line', { x1: 60, y1: WO[1] + 50 - k * WU, x2: 640, y2: WO[1] + 50 - k * WU, stroke: C.line, 'stroke-width': 1 });
txt(w, 640, 116, 'N ↑', { 'text-anchor': 'end', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); txt(w, 640, 146, 'E →', { 'text-anchor': 'end', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const wE = mk(w, 'line', { x1: WO[0], y1: WO[1], x2: WE[0], y2: WE[1], stroke: XC, 'stroke-width': 4, 'stroke-dasharray': '8 7' }), wN = mk(w, 'line', { x1: WE[0], y1: WE[1], x2: WN[0], y2: WN[1], stroke: YC, 'stroke-width': 4, 'stroke-dasharray': '8 7' });
const wEl = txt(w, WO[0] + 110, WO[1] + 36, '3 m east', { 'font-size': 22, fill: XC, 'font-weight': 600 }), wNl = txt(w, WE[0] + 16, WO[1] - 150, '4 m north', { 'font-size': 22, fill: YC, 'font-weight': 600 });
const wD = PUC.arrow(w, AC, 7, 22), wH = PUC.arrow(w, HC, 9, 20);
const wDl = txt(w, WO[0] + 20, WO[1] - 190, '5 m', { 'font-size': 26, fill: AC, 'font-weight': 600 }), wHl = txt(w, 24, WO[1] + 36, 'Â = 0.6î + 0.8ĵ', { 'font-size': 22, fill: HC, 'font-weight': 600 });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'circle', { r: 13, fill: C.ink, opacity: op })), wB = mk(w, 'circle', { r: 13, fill: C.ink });
const tWalk = T0('W2') + 0.4, walk = t => { const u = M.clamp((t - tWalk) / 3.2) * 7; return u <= 3 ? [WO[0] + u * WU, WO[1]] : [WE[0], WO[1] - (u - 3) * WU]; };
const tW = [wt('W3', 'His'), wt('W4', 'Its'), wt('W5', 'Divide'), wt('W6', 'Check')];

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${Ah} = 0.6${I} + 0.8${J}\\;\\text{m}`)}`, right: `${K(`${Ah} = 0.6${I} + 0.8${J}`)} &nbsp;no unit: the metres stay with the size` });
const where = PUC.where($('#wa'), { on: [], type: 'Inside bigger questions: a vector of a given size along a given direction' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `P = (6<span class="vx">î</span> + 8<span class="vy">ĵ</span>) N. Vector Q has magnitude 15 N in the direction of P. Find Q.`, qW: 780,
  opts: [K(`(15${I} + 15${J})\\,\\text{N}`), K(`(9${I} + 12${J})\\,\\text{N}`), K(`(12${I} + 9${J})\\,\\text{N}`), K(`(0.6${I} + 0.8${J})\\,\\text{N}`)], right: 1, optY: 290 });
const so = PUC.solution($('#so'), [[K(`|P| = \\sqrt{36 + 64} = 10`)], [K(`\\hat{P} = 0.6${I} + 0.8${J}`)], [K(`Q = 15\\,\\hat{P}`)], [K(`= 9${I} + 12${J}\\;\\Rightarrow\\; \\textbf{B}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'size'), wt('A3', 'So'), wt('A3', 'Multiply'), wt('A3', 'Q')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · unit vectors', y0: 92, dy: 100, txt: [0, 0, 1, 1],
  lines: [K(`${Ah} = ${Av} \\,/\\, ${A} \\qquad |${Ah}| = 1`), K(`${Av} = ${A}\\,${Ah} = ${tx(XC, 'A_x')}${I} + ${tx(YC, 'A_y')}${J}`),
    '<b>î, ĵ, k̂</b>: size 1 along x, y, z · no unit, no dimension', '<b>Direction</b> lives in Â, the <b>unit</b> lives in the size'] });
const YQ = ['Why does a unit vector have no unit?', 'How do you find the unit vector of any vector?', 'Is î + ĵ a unit vector, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 38', topic: 'Write every move as an arrow: Position and Displacement Vectors', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS7 - 0.1, 1.06, 960, 560], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  let y = 36; [0, 1, 2].forEach(i => { const e = $('#pd' + i); e.style.left = y + 'px'; y += e.offsetWidth + 14; }); }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      M.vis(el.querySelector('.jA'), t, wt('H2', 'much') - 0.1 + i * 0.08, 1e9, POP); M.vis(el.querySelector('.jB'), t, wt('H2', 'which') - 0.1 + i * 0.08, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'which') + 0.4, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i === 2 ? C.redBg : C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pdef'), t, T0('P2') + 0.1, { st: 0.04 });
    M.vis($('#pd0'), t, wt('P3', 'unit') - 0.1, 1e9, POP); M.vis($('#pd1'), t, wt('P3', 'dimension') - 0.1, 1e9, POP); M.vis($('#pd2'), t, wt('P3', 'pure') - 0.1, 1e9, POP);
    M.vis($('#pdL'), t, wt('P4', 'hat') - 0.3, 1e9, { dy: 8 }); PUC.write($('#pdF'), t, wt('P4', 'hat'), 0.5); M.vis($('#pdS'), t, wt('P4', 'Say'), 1e9, { dx: -12, dy: 0 });
    M.vis($('#ps'), t, tP5 - 0.1, out, { dx: 60, dy: 0, ...o });
    const dirs = [[1, 0, pI, pIl], [0, -1, pJ, pJl], [KZ[0], KZ[1], pK, pKl]];
    dirs.forEach(([dx, dy, ar, lb], i) => { const u = M.o3((t - tIJK[i] + 0.1) / 0.5); ar.set(PO[0], PO[1], PO[0] + dx * PU * u, PO[1] + dy * PU * u); lb.style.opacity = u; pTg[i].style.opacity = M.clamp((t - tIJK[i] - 0.3) / 0.3); });
  }

  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const stepsOn = 1 - M.io((t - tStr0 + 0.4) / 0.4);
    iSt.forEach((a, k) => { const u = M.o3((t - tI[k]) / 0.3); a.set(O[0] + k * U + 3, O[1] + 8, O[0] + (k + u) * U - 1, O[1] + 8); a.g.style.opacity = stepsOn; });
    jSt.forEach((a, k) => { const u = M.o3((t - tJ[k]) / 0.3); a.set(O[0] + 3 * U + 8, O[1] - k * U - 3, O[0] + 3 * U + 8, O[1] - (k + u) * U + 1); a.g.style.opacity = stepsOn; });
    iL.style.opacity = M.clamp((t - tI[2] - 0.3) / 0.3) * stepsOn; jL.style.opacity = M.clamp((t - tJ[3] - 0.3) / 0.3) * stepsOn;
    const k = stretch(t), th = angF(t), L = 5 * k, c = Math.cos(rad(th)), sn = Math.sin(rad(th));
    const ru = M.o3((t - tRes) / 0.6), tip = [O[0] + L * U * c * ru, O[1] - L * U * sn * ru];
    vA.set(O[0], O[1], tip[0], tip[1]);
    const hu = M.o3((t - wt('S4', 'plus') - 0.6) / 0.5);
    vH.set(O[0], O[1], O[0] + U * c * hu, O[1] - U * sn * hu); M.vis(uc, t, wt('S4', 'plus') - 0.3, 1e9, { dy: 0, fade: 0.3 });
    attr(vAl, 'x', (tip[0] + 14).toFixed(1)); attr(vAl, 'y', (tip[1] + 6).toFixed(1)); vAl.style.opacity = ru;
    attr(vHl, 'x', (O[0] + 62 * c - 4 + 30).toFixed(1)); attr(vHl, 'y', (O[1] - 62 * sn + 12).toFixed(1)); vHl.style.opacity = hu;
    ghosts.forEach((gA, j) => { const k2 = stretch(t - 0.14 * (j + 1)), a2 = angF(t - 0.14 * (j + 1)); if (Math.abs(k2 - k) < 0.01 && Math.abs(a2 - th) < 0.5) { M.hide(gA.g, true); return; } gA.set(O[0], O[1], O[0] + 5 * k2 * U * Math.cos(rad(a2)), O[1] - 5 * k2 * U * Math.sin(rad(a2))); });
    M.vis(zG, t, wt('S4', 'plus') + 0.4, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.2 });
    zH.set(ZO[0], ZO[1], ZO[0] + ZR * c * hu, ZO[1] - ZR * sn * hu);
    const ax = L * c * ru, ay = L * sn * ru;
    M.setT($('#r0'), vstr(ax, ay)); M.setT($('#r1'), ns(Math.hypot(ax, ay))); M.setT($('#r2'), vstr(c, sn)); M.setT($('#r3'), '1.00');
    const gx = t < tRes ? 0 : t < tStr0 ? M.o3((t - tRes) / 0.6) : k;
    cA(q => [q, 5 * q], 0, Math.min(gx, 1)); if (gx > 1) cA(q => [q, 5 * q], 0, gx);
    cH(q => [q, 1], 0, gx); dA(gx, 5 * gx, t > tRes); dH(gx, 1, t > tRes);
    M.vis($('#leg'), t, wt('S6', 'graph') - 0.2, 1e9, { dy: 10 }); [0, 1].forEach(i => M.vis($('#lg' + i), t, wt('S6', i ? 'flat' : 'climbs') - 0.1, 1e9, POP));
    M.vis($('#slo'), t, wt('S7', 'Slow') - 0.1, out, POP);
    avA(t, wt('S8', 'Only') - 0.1, out);
  }

  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D2') - 0.1, 1e9, { dx: 60, dy: 0 });
    const ua = M.o3((t - T0('D2') - 0.2) / 0.6); dA2.set(DO[0], DO[1], DO[0] + (DT[0] - DO[0]) * ua, DO[1] + (DT[1] - DO[1]) * ua); dAl.style.opacity = ua;
    // A-hat shrinks out of A (divide by 5), later A grows back out of A-hat (multiply by 5)
    const sh = M.io((t - wt('D2', 'divided') + 0.1) / 0.9), hs = 1 - 0.8 * sh, hOn2 = t > wt('D2', 'divided') - 0.2;
    if (hOn2) dH2.set(DO[0] + 24, DO[1] + 18, DO[0] + 24 + (DT[0] - DO[0]) * hs, DO[1] + 18 + (DT[1] - DO[1]) * hs); else M.hide(dH2.g, true);
    dDiv.style.opacity = (M.clamp((t - wt('D2', 'divided')) / 0.3) * (1 - M.clamp((t - T0('D5')) / 0.3))).toFixed(3);
    dMul.style.opacity = M.clamp((t - wt('D5', 'times') + 0.2) / 0.3).toFixed(3);
    dHl.style.opacity = M.clamp((t - wt('D2', 'divided') - 0.8) / 0.3); M.vis(dHt, t, wt('D4', 'nothing') - 0.1, 1e9, POP);
    const uc2 = M.o3((t - wt('D6', 'A', 1) + 0.1) / 0.5);
    dX2.set(DO[0], DO[1] + 26, DO[0] + (DT[0] - DO[0]) * uc2, DO[1] + 26); dY2.set(DT[0] + 26, DO[1], DT[0] + 26, DO[1] + (DT[1] - DO[1]) * M.o3((t - wt('D6', 'plus')) / 0.5));
    dXl.style.opacity = uc2; dYl.style.opacity = M.clamp((t - wt('D6', 'plus') - 0.3) / 0.3);
  }

  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'vector') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'unit', 0) - 0.3, 0.8);
  }

  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); sb0(t, T0('C2'));
    PUC.write($('#c0a'), t, wt('C2', 'vector'), 0.6); PUC.write($('#c0b'), t, wt('C2', 'size'), 0.6);
    M.vis($('#c1'), t, T0('C3') - 0.15, out, { dx: 60, dy: 0, ...o }); sb1(t, T0('C3'));
    PUC.write($('#c1a'), t, wt('C3', 'zero'), 0.6); PUC.write($('#c1b'), t, wt('C3', 'size'), 0.6);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'unit') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Two') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'unit') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Its') });
  }

  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.2, out, { dx: 60, dy: 0, ...o });
    const b = walk(t); attr(wB, 'cx', b[0].toFixed(1)); attr(wB, 'cy', b[1].toFixed(1)); M.hide(wB, t < tWalk - 0.3);
    wGh.forEach((g, k) => { const q = walk(t - 0.12 * (k + 1)); attr(g, 'cx', q[0].toFixed(1)); attr(g, 'cy', q[1].toFixed(1)); M.hide(g, Math.hypot(q[0] - b[0], q[1] - b[1]) < 2); });
    M.draw(wE, t, tWalk, 3 / 7 * 3.2, x => M.clamp(x)); M.draw(wN, t, tWalk + 3 / 7 * 3.2, 4 / 7 * 3.2, x => M.clamp(x));
    M.vis(wEl, t, tWalk + 1.0, 1e9, POP); M.vis(wNl, t, tWalk + 2.6, 1e9, POP);
    const ud = M.o3((t - tW[0]) / 0.6); wD.set(WO[0], WO[1], WO[0] + (WN[0] - WO[0]) * ud, WO[1] + (WN[1] - WO[1]) * ud); M.vis(wDl, t, tW[1], 1e9, POP);
    const uh = M.o3((t - tW[2] - 0.3) / 0.6); wH.set(WO[0], WO[1], WO[0] + 0.6 * WU * uh, WO[1] - 0.8 * WU * uh); M.vis(wHl, t, tW[2] + 0.6, 1e9, POP);
  }

  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'write') - 0.1, tStrike: wt('X3', 'cancel') - 0.1, tRight: wt('X3', 'unit') - 0.1 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Mostly') });
  }

  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

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
