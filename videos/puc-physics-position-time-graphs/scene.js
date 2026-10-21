// PUC Physics Ep 27: Position-time graphs (Motion notebook: the ride to college, slope = velocity, tangents)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, XC = C.violet, TC = C.ink, AC = C.red;     // v blue, x violet (position, second quantity), t ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, s, col, fs = 28) => txt(p, x, y, s, { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col });
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const v_ = c(VC, 'v'), x_ = c(XC, 'x'), dx_ = c(XC, '\\Delta x'), dt_ = c(TC, '\\Delta t');
const place = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
// a small bicycle drawn around (0,0) = road contact point under the middle; faces right
const bike = (p, op = 1, col = C.ink) => { const og = mk(p, 'g', { opacity: op }), g = mk(og, 'g', {});
  mk(g, 'circle', { cx: -22, cy: -16, r: 15, fill: 'none', stroke: col, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: 22, cy: -16, r: 15, fill: 'none', stroke: col, 'stroke-width': 3.5 });
  mk(g, 'path', { d: 'M-22,-16 L-6,-40 L16,-40 L22,-16 M-6,-40 L2,-16 L-22,-16 M16,-40 L14,-50 M-10,-46 L-2,-46 M2,-16 L16,-40', fill: 'none', stroke: col, 'stroke-width': 3.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: -4, cy: -66, r: 9, fill: col }); mk(g, 'path', { d: 'M-4,-58 L-6,-44 M-4,-56 L12,-48', stroke: col, 'stroke-width': 3.5, 'stroke-linecap': 'round', fill: 'none' });
  return og; };
const flipX = (el, x, y, left) => attr(el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${left ? -1 : 1},1)`);

Object.assign(M.IC, {
  run: ['M13 4a1.5 1.5 0 1 0 0-.01', 'M7 21l3-6 3 2v4', 'M6 12l3-3 4 1 3 3 3 1', 'M10 15l1-5'],
  bus: ['M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12H4z', 'M4 11h16', 'M7 20v-3', 'M17 20v-3', 'M8 15h.01', 'M16 15h.01'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-.01', 'M18.5 17.5a3.5 3.5 0 1 0 0-.01', 'M15 6a1 1 0 1 0 0-.01', 'M12 17.5V14l-3-3 4-3 2 3h2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP3 = T0('P3'), tP4 = T0('P4');
const tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tC1 = T0('C1'), tC6 = T0('C6'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* the ride (EXAMPLE FIGURES): 5 m/s for 10 s, stop 10 s at 50 m, 10 m/s for 10 s -> 150 m at 30 s */
const xR = s => s <= 10 ? 5 * s : s <= 20 ? 50 : 50 + 10 * Math.min(10, s - 20);
const vR = s => s < 10 ? 5 : s < 20 ? 0 : 10;

/* ---------- title card ---------- */
const JOBS = [['run', 'Runner', 'ON A TRACK', 'runner'], ['bus', 'Bus', 'ON A ROAD', 'bus'], ['bike', 'Cycle', 'TO COLLEGE', 'cycle']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H: the cycle app ---------- */
const ph = $('#phS');
const phG = PUC.graph(ph, { x: 70, y: 40, w: 590, h: 240, xmax: 30, ymin: 0, ymax: 150, xt: [], yt: [] });
[...ph.querySelectorAll('path,line,text')].forEach(e => { if (e.getAttribute('stroke') === C.ink) e.setAttribute('stroke', '#C9D3EA'); });
txt(ph, 70, 318, 'TIME', { fill: '#C9D3EA', 'font-size': 16, 'letter-spacing': 2 }); txt(ph, 80, 34, 'POSITION', { fill: '#C9D3EA', 'font-size': 16, 'letter-spacing': 2 });
const phC = phG.curve('#8FB2FF', 6);
const hQ = [0, 1, 2].map(i => $('#hq' + i));
const tHq = [wt('H4', 'stop'), wt('H4', 'fastest'), wt('H4', 'turn')];

/* ---------- P: origin + one dot per moment ---------- */
const pl = $('#plS'), PX0 = 120, PS = 3.6, PY = 330;
mk(pl, 'line', { x1: 60, y1: PY, x2: 720, y2: PY, stroke: C.ink, 'stroke-width': 4 });
for (let m = 0; m <= 150; m += 25) { mk(pl, 'line', { x1: PX0 + m * PS, y1: PY, x2: PX0 + m * PS, y2: PY + 14, stroke: C.ink, 'stroke-width': 2 }); txt(pl, PX0 + m * PS, PY + 40, m, { 'text-anchor': 'middle' }); }
txt(pl, 712, PY + 40, 'm', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 });
mk(pl, 'circle', { cx: PX0, cy: PY, r: 9, fill: C.ink }); const pO = txt(pl, PX0, PY - 100, 'ORIGIN O', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const pOl = mk(pl, 'line', { x1: PX0, y1: PY - 90, x2: PX0, y2: PY - 12, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
const pBk = bike(pl);
const pXa = PUC.arrow(pl, XC, 5, 16); const pXl = sym(pl, 0, 0, 'x', XC, 30);
const pPos = mk(pl, 'g', {}); mk(pPos, 'path', { d: `M${PX0 + 20},${PY + 90} H${PX0 + 300}`, stroke: C.ok, 'stroke-width': 5, 'stroke-linecap': 'round' }); mk(pPos, 'path', { d: `M${PX0 + 300},${PY + 78} L${PX0 + 322},${PY + 90} L${PX0 + 300},${PY + 102} Z`, fill: C.ok });
txt(pPos, PX0 + 20, PY + 128, 'AHEAD = POSITIVE x', { fill: C.ok, 'font-weight': 600, 'letter-spacing': 1 });
const pr = $('#prS');
const pG = PUC.graph(pr, { x: 120, y: 90, w: 560, h: 360, xmax: 10, ymin: 0, ymax: 50, xt: [0, 2, 4, 6, 8, 10], yt: [0, 10, 20, 30, 40, 50] });
const pxl = txt(pr, 712, 456, 't (s)'), pyl = txt(pr, 132, 80, 'x (m)', { fill: XC, 'font-weight': 600 });
const pDots = [0, 2, 4, 6, 8, 10].map(s => pG.mk('circle', { cx: pG.X(s), cy: pG.Y(5 * s), r: 9, fill: XC }));
const pLn = pG.curve(XC, 4);
const pAxT = txt(pr, 400, 540, 'TIME → horizontal', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const pAxX = txt(pr, 34, 300, 'POSITION ↑', { fill: XC, 'font-weight': 600, transform: 'rotate(-90 40 300)', 'text-anchor': 'middle' });

/* ---------- S: the ride sim ---------- */
const s = $('#simS'), RX0 = 92, RS = 4, RY = 250;
mk(s, 'rect', { x: 40, y: RY, width: 704, height: 26, fill: '#D9DCE3' });
mk(s, 'line', { x1: 40, y1: RY, x2: 744, y2: RY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 150; m += 25) { mk(s, 'line', { x1: RX0 + m * RS, y1: RY + 26, x2: RX0 + m * RS, y2: RY + 40, stroke: C.ink, 'stroke-width': 2 }); txt(s, RX0 + m * RS, RY + 64, m, { 'text-anchor': 'middle' }); }
txt(s, 736, RY + 90, 'x (m)', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 });
txt(s, RX0, RY - 150, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
mk(s, 'rect', { x: RX0 + 50 * RS - 6, y: RY - 120, width: 12, height: 120, fill: C.ink, rx: 3 });
const sig = mk(s, 'circle', { cx: RX0 + 50 * RS, cy: RY - 132, r: 13, fill: C.ok, stroke: C.ink, 'stroke-width': 2.5 });
txt(s, RX0 + 50 * RS - 22, RY - 126, 'SIGNAL', { 'text-anchor': 'end', 'font-size': 16, 'letter-spacing': 2 });
txt(s, RX0 + 150 * RS, RY - 150, 'COLLEGE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
mk(s, 'path', { d: `M${RX0 + 150 * RS - 26},${RY} V${RY - 110} H${RX0 + 150 * RS + 26} V${RY}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const sGh = [0, 1, 2].map(() => bike(s, 0));
const sBk = bike(s);
const sV = PUC.arrow(s, VC, 6, 18), sVl = sym(s, 0, 0, 'v', VC), sVg = PUC.arrow(s, VC, 6, 18);
const SEG = [['Part 1 · steady', '5 m/s'], ['Part 2 · stopped', '0 m/s'], ['Part 3 · faster', '10 m/s']];
$('#segs').innerHTML = SEG.map(([n, v], i) => `<div class="seg" id="sg${i}" style="top:${370 + i * 70}px"><div class="sn">${n}</div><div class="sv" style="color:${VC}">${v}</div></div>`).join('');
$('#roG').innerHTML = `<span class="k" style="color:${TC}">t</span><span class="v" id="rt">0.0</span><span class="u">s</span>
  <span class="k" style="color:${XC}">x</span><span class="v" id="rx" style="color:${XC}">0</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">5</span><span class="u">m/s</span>`;
const sGr = PUC.graph($('#grS'), { x: 110, y: 84, w: 580, h: 140, xmax: 30, ymin: 0, ymax: 150, xt: [0, 10, 20, 30], yt: [0, 50, 100, 150] });
txt($('#grS'), 702, 230, 't (s)'); txt($('#grS'), 170, 80, 'x (m)', { fill: XC, 'font-weight': 600 });
const sCv = sGr.curve(XC), sDt = sGr.dot(C.ink);
const sEx = document.createElement('div'); sEx.className = 'ghost'; sEx.style.cssText = 'right:36px;top:18px'; sEx.textContent = 'EXAMPLE FIGURES'; $('#gr').appendChild(sEx);
// sim clock (ride seconds) tied to the words; Part 3 opens with a slow-mo replay (0.25x), a freeze for the vectors, then resumes
const a1 = wt('S2', 'He'), a2 = T0('S4') - 0.1, b1 = wt('S4', 'stops') - 0.2, b2 = T1('S5'), c1 = wt('S6', 'He') - 0.1;
const cSlow = 2.0, cFrz = c1 + cSlow, cRes = wt('S6', 'steeper') + 0.2, c2 = T1('S7');
const simT = t => {
  if (t < a1) return 0; if (t < a2) return 10 * (t - a1) / (a2 - a1);
  if (t < b1) return 10; if (t < b2) return 10 + 10 * (t - b1) / (b2 - b1);
  if (t < c1) return 20; if (t < cFrz) return 20 + 0.25 * (t - c1) * 0.5;       // 0.25x of a 0.5 s/s pace
  if (t < cRes) return 20 + 0.25 * cSlow * 0.5;
  return Math.min(30, 20.25 + 9.75 * (t - cRes) / (c2 - cRes));
};
const roPtxt = s2 => s2 < 10 ? 'Straight line: steady' : s2 < 20 ? 'Flat line: at rest' : 'Steeper line: faster';
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 210, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the stop is that flat part!' });

/* ---------- D: slope ---------- */
const STEPS = [[`(t_1, ${c(XC, 'x_1')}),\\;\\; (t_2, ${c(XC, 'x_2')})`, 'pick two points on the line'],
  [`${dx_} = ${c(XC, 'x_2')} - ${c(XC, 'x_1')},\\;\\; ${dt_} = t_2 - t_1`, 'change in position, change in time'],
  [`\\text{slope} = \\dfrac{${dx_}}{${dt_}}`, 'rise over run'],
  [`${v_} = \\dfrac{${dx_}}{${dt_}} = \\text{slope}`, 'the slope of an x-t graph is the velocity']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:108px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118 + (i > 1 ? 8 : 0)}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst3 .sx').style.top = '-6px'; $('#dst2 .sx').style.top = '-6px'; $('#dst2 .why').style.top = '72px'; $('#dst3 .why').style.top = '72px';
const tStep = [wt('D2', 'Pick'), wt('D3', 'change'), wt('D4', 'Slope'), wt('D5', 'Delta')];
const dr = $('#drS');
const dG = PUC.graph(dr, { x: 130, y: 90, w: 560, h: 380, xmax: 10, ymin: 0, ymax: 50, xt: [0, 2, 4, 6, 8, 10], yt: [0, 10, 20, 30, 40, 50] });
txt(dr, 716, 476, 't (s)'); txt(dr, 142, 80, 'x (m)', { fill: XC, 'font-weight': 600 });
const dLn = dG.curve(XC, 5);
const P1 = [2, 10], P2 = [8, 40];
const dP = [P1, P2].map(([a, b]) => dG.mk('circle', { cx: dG.X(a), cy: dG.Y(b), r: 10, fill: C.ink }));
const dPl = [P1, P2].map(([a, b], i) => dG.mk('text', { x: dG.X(a) - 14, y: dG.Y(b) - 18, 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: C.ink, 'font-weight': 600 }));
dPl[0].textContent = '(2 s, 10 m)'; dPl[1].textContent = '(8 s, 40 m)';
const dRun = mk(dr, 'line', { x1: dG.X(2), y1: dG.Y(10), x2: dG.X(8), y2: dG.Y(10), stroke: TC, 'stroke-width': 4, 'stroke-dasharray': '2 0' });
const dRise = mk(dr, 'line', { x1: dG.X(8), y1: dG.Y(10), x2: dG.X(8), y2: dG.Y(40), stroke: XC, 'stroke-width': 4 });
const dRunL = txt(dr, (dG.X(2) + dG.X(8)) / 2, dG.Y(10) + 34, 'Δt = 6 s', { 'text-anchor': 'middle', fill: TC, 'font-size': 22, 'font-weight': 600 });
const dRiseL = txt(dr, dG.X(8) + 16, (dG.Y(10) + dG.Y(40)) / 2 + 8, 'Δx = 30 m', { fill: XC, 'font-size': 22, 'font-weight': 600 });
const dRes = document.createElement('div'); dRes.className = 'fx'; dRes.style.cssText = 'left:36px;top:496px;font-size:30px'; dRes.innerHTML = K(`${v_} = \\dfrac{30\\,\\text{m}}{6\\,\\text{s}} = ${c(VC, '5\\,\\text{m/s}')}`); $('#dr').appendChild(dRes);

$('#stF').innerHTML = K(`${v_} = \\dfrac{${dx_}}{${dt_}} = \\text{slope of the } x\\text{-}t \\text{ graph}`);

/* ---------- K: up vs down ---------- */
const sideBy = (svg, up) => {
  const G = PUC.graph(svg, { x: 120, y: 90, w: 560, h: 250, xmax: 10, ymin: 0, ymax: 50, xt: [0, 5, 10], yt: [0, 25, 50] });
  txt(svg, 708, 346, 't (s)'); txt(svg, 132, 80, 'x (m)', { fill: XC, 'font-weight': 600 });
  const cv = G.curve(XC, 5), dt = G.dot(C.ink);
  const RY2 = 470, R0 = 120, R1 = 680;
  mk(svg, 'line', { x1: 80, y1: RY2, x2: 720, y2: RY2, stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'circle', { cx: R0, cy: RY2, r: 7, fill: C.ink }); txt(svg, R0, RY2 + 30, 'O', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); txt(svg, R1, RY2 + 30, '50 m', { 'text-anchor': 'middle' });
  const bk = bike(svg), va = PUC.arrow(svg, VC, 6, 18);
  const vt = txt(svg, 400, 540, up ? 'v = +5 m/s' : 'v = −5 m/s', { 'text-anchor': 'middle', fill: VC, 'font-size': 26, 'font-weight': 600 });
  return (t, t0, dur) => { const u = M.clamp((t - t0) / dur), sec = 10 * u, x = up ? 5 * sec : 50 - 5 * sec;
    cv(k => [k, up ? 5 * k : 50 - 5 * k], 0, sec); dt(sec, x, t > t0 - 0.3);
    const bx = R0 + (R1 - R0) * x / 50; flipX(bk, bx, RY2, !up); va.set(bx + (up ? 34 : -34), RY2 - 90, bx + (up ? 94 : -94), RY2 - 90); vt.style.opacity = M.clamp((t - t0 - 0.4) / 0.3); };
};
const kL = sideBy($('#klS'), true), kR = sideBy($('#krS'), false);
const th1 = PUC.think($('#th1'), { q: 'An x-t line slopes down. Is the object moving away from the origin, or towards it?', opts: ['Away', 'Towards'], right: 1, why: 'Towards: x is getting smaller, so it heads back to the origin. v is negative.' });

/* ---------- C: curve + tangent on Aarav's standard ride (canon: 0 to 6 m/s in 4 s, cruise 4 s, stop in 3 s, 45 m) ---------- */
const xS = s2 => s2 <= 4 ? 0.75 * s2 * s2 : s2 <= 8 ? 12 + 6 * (s2 - 4) : 36 + 6 * (Math.min(11, s2) - 8) - (Math.min(11, s2) - 8) ** 2;
const vS = s2 => s2 <= 4 ? 1.5 * s2 : s2 <= 8 ? 6 : Math.max(0, 6 - 2 * (s2 - 8));
const cs = $('#csS'), CX0 = 80, CS = 13.5, CY = 300;
mk(cs, 'line', { x1: 40, y1: CY, x2: 744, y2: CY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 45; m += 15) { mk(cs, 'line', { x1: CX0 + m * CS, y1: CY, x2: CX0 + m * CS, y2: CY + 14, stroke: C.ink, 'stroke-width': 2 }); txt(cs, CX0 + m * CS, CY + 40, m, { 'text-anchor': 'middle' }); }
txt(cs, 736, CY + 40, 'm', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 });
txt(cs, CX0, CY - 110, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const cGh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => bike(cs, 0, C.ink));
const cBk = bike(cs), cV = PUC.arrow(cs, VC, 6, 18);
const cGap = document.createElement('div'); cGap.className = 'pillp ac'; cGap.style.cssText = 'left:36px;top:420px'; cGap.innerHTML = 'Ghosts 1 s apart: gaps grow, stay, then shrink'; $('#csim').appendChild(cGap);
const cgs = $('#cgS');
const cG = PUC.graph(cgs, { x: 120, y: 90, w: 560, h: 330, xmax: 11, ymin: 0, ymax: 45, xt: [0, 4, 8, 11], yt: [0, 12, 36, 45] });
txt(cgs, 708, 426, 't (s)'); txt(cgs, 132, 80, 'x (m)', { fill: XC, 'font-weight': 600 });
const cCv = cG.curve(XC, 5), cDt = cG.dot(C.ink);
const tan = mk(cgs, 'line', { stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round' });
$('#cro').innerHTML = `<span class="k" style="color:${TC}">t</span><span class="v" id="ct">0.0</span><span class="u">s</span><span class="k" style="color:${VC}">v</span><span class="v" id="cv" style="color:${VC}">0.0</span><span class="u">m/s = slope of the tangent</span>`;
$('#cro').style.gridTemplateColumns = 'auto auto auto auto auto 1fr';
const cA = wt('C2', 'From') - 0.1, cA2 = T1('C3'), cT1 = wt('C4', 'draw') - 0.1, cB = wt('C5', 'cruises') - 0.1, cB2 = T1('C5'), cT3 = T1('C5');
// ride clock: 0 to 4 s over C2-C3 (stop there for the tangent), then 4 to 11 s over C5
const cSim = t => t < cA ? 0 : t < cA2 ? 4 * (t - cA) / (cA2 - cA) : t < cB ? 4 : Math.min(11, 4 + 7 * (t - cB) / (cB2 - cB));
const cTanS = t => t < cB ? M.keys([[0, 2], [wt('C4', 'slope') - 0.2, 3.5]], 1.2, M.io)(t) : cSim(t);   // the tangent rides with the dot during C5
const th2 = PUC.think($('#th2'), { q: 'In the last part, the x-t curve gets flatter and flatter. Speeding up or slowing down?', opts: ['Speeding up', 'Slowing down'], right: 1, why: 'Slowing down: the tangent gets less steep, until it is flat. Flat tangent, v = 0.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${dx_} = 150 - 50 = 100\\,\\text{m}`)],
  [K(`${dt_} = 30 - 20 = 10\\,\\text{s}`)],
  [K(`${v_} = \\dfrac{100}{10} = ${c(VC, '10\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 120 });
const tWs = [wt('W3', 'Delta'), wt('W4', 'Delta'), wt('W5', 'Slope')];
const wr = $('#wrS');
const wG = PUC.graph(wr, { x: 130, y: 90, w: 560, h: 380, xmax: 30, ymin: 0, ymax: 150, xt: [0, 10, 20, 30], yt: [0, 50, 100, 150] });
txt(wr, 716, 476, 't (s)'); txt(wr, 142, 80, 'x (m)', { fill: XC, 'font-weight': 600 });
const wCv = wG.curve(XC, 5);
const wP = [[20, 50], [30, 150]].map(([a, b]) => wG.mk('circle', { cx: wG.X(a), cy: wG.Y(b), r: 10, fill: C.ink }));
const wRun = mk(wr, 'line', { x1: wG.X(20), y1: wG.Y(50), x2: wG.X(30), y2: wG.Y(50), stroke: TC, 'stroke-width': 4 });
const wRise = mk(wr, 'line', { x1: wG.X(30), y1: wG.Y(50), x2: wG.X(30), y2: wG.Y(150), stroke: XC, 'stroke-width': 4 });
const wRunL = txt(wr, (wG.X(20) + wG.X(30)) / 2, wG.Y(50) + 34, 'Δt = 10 s', { 'text-anchor': 'middle', fill: TC, 'font-size': 22, 'font-weight': 600 });
const wRiseL = txt(wr, wG.X(30) - 14, wG.Y(62), 'Δx = 100 m', { 'text-anchor': 'end', fill: XC, 'font-size': 22, 'font-weight': 600 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'An x-t graph is a picture of the road', right: 'It records where the object was, and when' });
const tr = $('#trS');
const trG = PUC.graph(tr, { x: 40, y: 50, w: 190, h: 150, xmax: 10, ymin: 0, ymax: 10, xt: [], yt: [] });
const trC = trG.curve(XC, 5); txt(tr, 40, 236, 'x-t GRAPH', { 'font-size': 16, 'letter-spacing': 2 });
mk(tr, 'line', { x1: 280, y1: 200, x2: 500, y2: 200, stroke: C.ink, 'stroke-width': 4 }); txt(tr, 280, 236, 'THE ROAD: FLAT', { 'font-size': 16, 'letter-spacing': 2 });
const trB = bike(tr);
const where = PUC.where($('#wa'), { on: [], type: 'Graph reading: compare slopes, or spot where v is zero or negative' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'On an x-t graph, P\'s line makes 30° with the time axis and Q\'s makes 60°. What is v<sub>P</sub> : v<sub>Q</sub>?', qW: 780,
  opts: ['1 : √3', '1 : 3', '3 : 1', '√3 : 1'], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`${v_} = \\text{slope} = \\tan\\theta`)], [K(`\\tan 30^\\circ = \\tfrac{1}{\\sqrt3},\\; \\tan 60^\\circ = \\sqrt3`)], [K(`\\dfrac{v_P}{v_Q} = \\dfrac{1/\\sqrt3}{\\sqrt3} = \\dfrac13`)], [K(`v_P : v_Q = 1 : 3`)]], { y0: 100, dy: 120 });
const tSo = [wt('A2', 'Velocity'), wt('A3', 'Tan'), wt('A4', 'So'), wt('A4', 'That')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · position-time graphs', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${v_} = ${dx_} \\,/\\, ${dt_} = \\text{slope of the } x\\text{-}t \\text{ graph}`),
    '<b>Straight line</b>: steady velocity &nbsp;·&nbsp; <b>flat line</b>: at rest, <span class="vv">v = 0</span>',
    '<b>Line going down</b>: coming back, <span class="vv">v</span> is negative',
    '<b>Curve</b>: tangent slope = <span class="vv">v</span> at that instant; bending up = speeding up'] });
const YQ = ['What does a flat line on an x-t graph tell you?', 'How do you find the velocity from an x-t graph?', 'Can an x-t graph ever be a vertical line? Why not?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 28', topic: 'Where does the area hide the distance? Velocity-Time Graphs', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [cT1 - 0.2, 1.1, 1220, 560], [cB - 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkF'), t, tH3 - 0.1, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#phone'), t, tMorph + 0.3, 1e9, { dy: 20 });
    const pu = 30 * M.io((t - wt('H3', 'one') + 0.2) / 1.6); phC(xR => [xR, 0], 0, 0); phC(k => [k, xR(k)], 0, pu);
    M.vis($('#hjP'), t, wt('H3', 'graph'), 1e9, POP);
    M.vis($('#hk'), t, tH4 - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH4, 1e9, { dy: 20 });
    hQ.forEach((q, i) => M.vis(q, t, tHq[i] - 0.15, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pO, t, wt('P2', 'origin') - 0.1, 1e9, POP); M.draw(pOl, t, wt('P2', 'origin') - 0.1, 0.4);
    const bx = M.keys([[0, 0], [wt('P2', 'Position'), 75], [wt('P2', 'Ahead'), 110]], 0.9, M.io)(t);
    place(pBk, PX0 + bx * PS, PY); M.vis(pBk.firstChild, t, tP1 + 0.4, 1e9, { dy: 0 });
    const xa = M.io((t - wt('P2', 'far') + 0.1) / 0.3); pXa.set(PX0, PY - 120, PX0 + bx * PS * xa, PY - 120); attr(pXl, 'x', PX0 + bx * PS / 2 - 8); attr(pXl, 'y', PY - 134); pXl.style.opacity = xa;
    M.vis(pPos, t, wt('P2', 'Ahead') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pr'), t, tP3 - 0.1, out, { dx: 60, dy: 0, ...o });
    pAxT.style.opacity = M.clamp((t - wt('P3', 'Time')) / 0.3); pAxX.style.opacity = M.clamp((t - wt('P3', 'Position')) / 0.3);
    pDots.forEach((d, k) => M.vis(d, t, wt('P4', 'mark') + k * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    pLn(k => [k, 5 * k], 0, 10 * M.io((t - wt('P4', 'Join')) / 0.8));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const sec = simT(t), x = xR(sec), v = vR(sec), bx = RX0 + x * RS;
    place(sBk, bx, RY);
    sGh.forEach((gk, k) => { const gs = simT(t - 0.18 * (k + 1)), gx = xR(gs), mv = Math.abs(gx - x) > 1.2; place(gk, RX0 + gx * RS, RY); attr(gk, 'opacity', mv ? [0.3, 0.2, 0.12][k] : 0); });
    const frz = t >= cFrz && t < cRes, va = t < c1 ? 1 : M.io((t - cFrz - 0.1) / 0.5);
    sV.set(bx + 34, RY - 96, bx + 34 + v * 7 * (v ? va : 0), RY - 96); attr(sVl, 'x', bx + 34 + v * 3.5 - 8); attr(sVl, 'y', RY - 108); sVl.style.opacity = v ? va : 0;
    const gv = M.io((t - cFrz - 0.6) / 0.4) * (1 - M.io((t - cRes - 0.6) / 0.3)); sVg.set(bx + 34, RY - 122, bx + 34 + 35 * gv, RY - 122); sVg.g.style.opacity = 0.35;
    void frz;
    M.vis($('#slow'), t, c1, cRes + 0.4, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.08, outDur: 0.2, ody: 0 });
    attr(sig, 'fill', sec >= 9.6 && sec < 20 ? C.red : C.ok);
    SEG.forEach((_, i) => { const el = $('#sg' + i), t0 = [a1, b1, c1][i]; M.vis(el, t, t0 - 0.1, 1e9, { dx: -20, dy: 0 }); const on = i === (sec < 10 ? 0 : sec < 20 ? 1 : 2) && t > a1 ? 1 : 0; el.style.background = on ? C.ac2 : C.soft; });
    M.setT($('#rt'), sec.toFixed(1)); M.setT($('#rx'), x.toFixed(0)); M.setT($('#rv'), v.toFixed(0));
    M.vis($('#roP'), t, wt('S3', 'straight') - 0.1, 1e9, POP); M.setT($('#roP'), roPtxt(sec));
    sCv(k => [k, xR(k)], 0, sec); sDt(sec, x, t > tS1 + 0.3);
    avA(t, wt('S5', 'rest') + 0.2, T0('S6') - 0.2);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 328], [tStep[3] - 0.1, 446]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px'; hb.style.height = (hiY > 300 ? 124 : 108) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#exD'), t, tD1 + 0.6, 1e9, { dy: 8 });
    dLn(k => [k, 5 * k], 0, 10 * M.io((t - tD1 - 0.5) / 1.0));
    dP.forEach((p, i) => M.vis(p, t, wt('D2', 'two') + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    dPl.forEach((p, i) => p.style.opacity = M.clamp((t - wt('D2', 'Read') - i * 0.3) / 0.3));
    M.draw(dRise, t, wt('D3', 'delta') - 0.1, 0.5); dRiseL.style.opacity = M.clamp((t - wt('D3', 'x', 1)) / 0.3);
    M.draw(dRun, t, wt('D3', 'delta', 1) - 0.1, 0.5); dRunL.style.opacity = M.clamp((t - wt('D3', 't', 1)) / 0.3);
    PUC.write(dRes, t, wt('D5', 'exactly') - 0.1, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'On') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'slope') - 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tC1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const late = t >= T0('K4') + 0.5, out = late ? OUT('C1') : OUT('K3');
    M.vis($('#kl'), t, late ? T0('K4') + 1.6 : tK1 + 0.1, out, { dx: late ? 0 : -60, dy: late ? 30 : 0, ...o });
    M.vis($('#kr'), t, late ? T0('K4') + 1.7 : T0('K2') - 0.1, out, { dx: late ? 0 : 60, dy: late ? 30 : 0, ...o });
    kL(t, wt('K1', 'up') - 0.1, 2.2); kR(t, wt('K2', 'down') - 0.1, 2.6);
    M.vis($('#th1'), t, tK3 + 0.05, T0('K4') + 1.3, { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Is') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'falling') });
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C6');
    M.vis($('#csim'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cgr'), t, tC1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#exC'), t, tC1 + 0.6, 1e9, { dy: 8 });
    const sec = cSim(t), x = xS(sec), bx = CX0 + x * CS;
    place(cBk, bx, CY);
    cGh.forEach((gk, k) => { place(gk, CX0 + xS(k + 1) * CS, CY); attr(gk, 'opacity', sec >= k + 1 && k < 10 ? 0.16 : 0); });
    cV.set(bx + 34, CY - 96, bx + 34 + vS(sec) * 12, CY - 96);
    M.vis(cGap, t, wt('C3', 'more') - 0.1, 1e9, POP);
    cCv(k => [k, xS(k)], 0, sec);
    const ts = t >= cT1 ? cTanS(t) : sec, sl = vS(ts), tv = M.io((t - cT1) / 0.5), L = 1.4;
    const p0 = [ts - L, xS(ts) - sl * L], p1 = [ts + L, xS(ts) + sl * L];
    attr(tan, 'x1', cG.X(p0[0]).toFixed(1)); attr(tan, 'y1', cG.Y(p0[1]).toFixed(1)); attr(tan, 'x2', cG.X(p1[0]).toFixed(1)); attr(tan, 'y2', cG.Y(p1[1]).toFixed(1));
    tan.style.opacity = tv; cDt(t >= cT1 && t < cB ? ts : sec, xS(t >= cT1 && t < cB ? ts : sec), t > cA - 0.2);
    M.vis($('#cro'), t, cT1 + 0.4, 1e9, { dy: 10 });
    M.setT($('#ct'), ts.toFixed(1)); M.setT($('#cv'), vS(ts).toFixed(1));
    M.vis($('#th2'), t, tC6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC6, tOpts: wt('C6', 'is') - 0.1, tCount: T1('C6') + 0.05, dur: 3, tAns: T0('C7') - 0.02, tWhy: wt('C7', 'tangent') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.1, out, { dx: 60, dy: 0, ...o });
    wCv(k => [k, xR(k)], 0, 30 * M.io((t - T0('W2') - 0.3) / 1.2));
    wP.forEach((p, i) => M.vis(p, t, wt('W2', i ? 'hundred' : 'fifty') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(wRise, t, tWs[0], 0.5); wRiseL.style.opacity = M.clamp((t - tWs[0] - 0.3) / 0.3);
    M.draw(wRun, t, tWs[1], 0.5); wRunL.style.opacity = M.clamp((t - tWs[1] - 0.3) / 0.3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: T0('X3') - 0.05, tRight: wt('X3', 'record') - 0.3 });
    trC(k => [k, k], 0, 10 * M.io((t - wt('X2', 'graph') + 0.1) / 0.8));
    place(trB, 300 + 180 * M.io((t - wt('X3', 'flat') + 0.1) / 2.0), 200); M.vis(trB.firstChild, t, wt('X3', 'Aarav') - 0.1, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.1, tCount, tAns });
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
