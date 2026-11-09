// PUC Physics Ep 80: Conservative and non-conservative forces (Motion notebook, a 3 kg box taken floor to shelf by three paths + work by gravity against path length)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, GC = C.red, FC = C.orange, EC = C.teal, DC = C.violet, MC = C.ink, TH = C.gold;   // v blue, g red, forces orange, W/U teal, displacement/height violet, mass ink, theta gold
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const mK = tx(MC, 'm'), gK = tx(GC, 'g'), WK = tx(EC, 'W'), UK = tx(EC, 'U'), fK = tx(FC, 'f'), yK = s => tx(DC, 'y_' + s), sK = tx(DC, 's');
const G = 9.8, MS = 3, MG = MS * G;
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const flab = (p, b, giver, col = FC, fs = 26) => { const a = sym(p, 0, 0, b, '', col, fs); const g = txt(p, 0, 0, giver, { 'font-size': 16, fill: col, 'font-weight': 600 }); return (x, y, op) => { attr(a, 'x', x.toFixed(1)); attr(a, 'y', y.toFixed(1)); attr(g, 'x', x.toFixed(1)); attr(g, 'y', (y + 20).toFixed(1)); a.style.opacity = g.style.opacity = M.clamp(op).toFixed(3); }; };
const at = (g, x, y, r = 0) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})${r ? ` rotate(${r.toFixed(1)})` : ''}`);
const boxG = (p, w, h, lab, fs = 18) => { const g = mk(p, 'g', {}); mk(g, 'rect', { x: -w / 2, y: -h, width: w, height: h, rx: 5, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 }); if (lab) txt(g, 0, -h / 2 + 6, lab, { 'font-size': fs, fill: MC, 'font-weight': 600, 'text-anchor': 'middle' }); return g; };
// a polyline path in metres: point at arc length s -> [x, y, angle of the segment]
const poly = pts => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const f = s => { s = M.clamp(s, 0, L[L.length - 1]); let i = 1; while (i < pts.length - 1 && L[i] < s) i++; const a = pts[i - 1], b = pts[i], u = (s - L[i - 1]) / (L[i] - L[i - 1] || 1); return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, Math.atan2(b[1] - a[1], b[0] - a[0])]; };
  f.len = L[L.length - 1]; f.pts = pts; return f; };

Object.assign(M.IC, {
  stairs: ['M3 20h5v-5h5v-5h5V5h3'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  mountain: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  earth: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2c3 3 3 17 0 20', 'M12 2c-3 3-3 17 0 20'],
  route: ['M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M8 17h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tC1 = T0('C1'), tC4 = T0('C4'), tC6 = T0('C6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['stairs', 'A bag up the stairs', 'OR UP A LONG RAMP', 'stairs'], ['bike', 'A steep road', 'OR A WINDING ONE', 'steep']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${570 + i * 420}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const ROWS = [['stairs', 'Stairs or a ramp', 'SAME BAG · SAME FLOOR'], ['bike', 'Steep road or winding', 'SAME HILLTOP'], ['help', 'Same height at the end', 'DOES GRAVITY CARE HOW?']];
$('#jrs').innerHTML = ROWS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, i === 2 ? EC : C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>${i < 2 ? `<svg width="220" height="120" id="jrS${i}"></svg>` : ''}</div>`).join('');
const tRow = [wt('H1', 'stairs'), wt('H1', 'steep'), T0('H2')];
const jr0 = $('#jrS0'), jr1 = $('#jrS1');
const st0 = poly([[20, 104], [20, 84], [55, 84], [55, 64], [90, 64], [90, 44], [125, 44], [125, 24], [200, 24]]), rp0 = poly([[20, 104], [180, 24], [200, 24]]);
mk(jr0, 'path', { d: 'M' + st0.pts.map(p => p.join(',')).join(' L'), fill: 'none', stroke: C.ink2, 'stroke-width': 3 }); mk(jr0, 'path', { d: 'M20,104 L180,24', fill: 'none', stroke: C.dim, 'stroke-width': 3 });
const jd0 = [mk(jr0, 'circle', { r: 7, fill: DC }), mk(jr0, 'circle', { r: 7, fill: DC })];
const rd1 = poly([[30, 108], [190, 92], [50, 70], [180, 52], [80, 32], [140, 14]]), sp1 = poly([[100, 108], [140, 14]]);
mk(jr1, 'path', { d: 'M' + rd1.pts.map(p => p.join(',')).join(' L'), fill: 'none', stroke: C.dim, 'stroke-width': 4, 'stroke-linejoin': 'round' }); mk(jr1, 'path', { d: 'M100,108 L140,14', fill: 'none', stroke: C.ink2, 'stroke-width': 3 });
const jd1 = [mk(jr1, 'circle', { r: 7, fill: DC }), mk(jr1, 'circle', { r: 7, fill: DC })];
const TILES = [['mountain', 'Steep path: 300 m', C.ac], ['route', 'Winding road: 1.2 km', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'steep'), wt('H4', 'winding')];
// the hill: a steep straight path and a winding road, both from the foot to the top (60 m up)
const ho = $('#hoS');
mk(ho, 'path', { d: 'M0,390 L0,360 L300,80 L560,390 Z', fill: '#CFE3C0', stroke: '#7FA85A', 'stroke-width': 3 });
const ROAD = poly([[40, 345], [400, 330], [120, 270], [380, 250], [190, 190], [340, 170], [300, 86]]), PATH = poly([[230, 345], [300, 86]]);
mk(ho, 'path', { d: 'M' + ROAD.pts.map(p => p.join(',')).join(' L'), fill: 'none', stroke: '#9AA3B5', 'stroke-width': 10, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const hoRd = mk(ho, 'path', { d: 'M' + ROAD.pts.map(p => p.join(',')).join(' L'), fill: 'none', stroke: C.ink2, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const hoPt = mk(ho, 'path', { d: 'M230,345 L300,86', fill: 'none', stroke: DC, 'stroke-width': 5, 'stroke-dasharray': '10 7', 'stroke-linecap': 'round' });
mk(ho, 'rect', { x: 286, y: 64, width: 28, height: 22, fill: '#fff', stroke: MC, 'stroke-width': 2 }); mk(ho, 'path', { d: 'M282,64 L300,50 L318,64 Z', fill: '#D64545', stroke: MC, 'stroke-width': 2 });
mk(ho, 'line', { x1: 300, y1: 86, x2: 470, y2: 86, stroke: DC, 'stroke-width': 1.5, 'stroke-dasharray': '4 5' });
const hoH = PUC.arrow(ho, DC, 4, 12); const hoHl = txt(ho, 480, 230, '60 m', { 'font-size': 20, fill: DC, 'font-weight': 600 });
const hoD = [mk(ho, 'circle', { r: 9, fill: DC, stroke: '#fff', 'stroke-width': 2 }), mk(ho, 'circle', { r: 9, fill: C.ink2, stroke: '#fff', 'stroke-width': 2 })];
const tRide = wt('H3', 'climbs');

/* ---------- P ---------- */
$('#dr0I').innerHTML = M.icon('earth', 32, FC, 2.2); $('#dr1I').innerHTML = M.icon('check', 32, C.ok, 2.6); $('#dr2I').innerHTML = M.icon('flame', 32, FC, 2.2);
$('#kc0I').innerHTML = M.icon('earth', 28, FC, 2.2); $('#kc1I').innerHTML = M.icon('flame', 28, FC, 2.2);
$('#kc0F').innerHTML = K(`${WK} = -${mK}${gK}\\,(${yK(2)} - ${yK(1)})`); $('#kc1F').innerHTML = K(`${WK} = -${fK} \\times ${sK}`);
const k0 = $('#kc0S'), k1 = $('#kc1S');
const KP = [poly([[40, 280], [40, 190], [290, 190]]), poly([[40, 280], [290, 190]]), poly([[40, 280], [120, 280], [120, 236], [200, 236], [200, 190], [290, 190]])];
KP.forEach(p => mk(k0, 'path', { d: 'M' + p.pts.map(q => q.join(',')).join(' L'), fill: 'none', stroke: DC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5', opacity: 0.55 }));
mk(k0, 'circle', { cx: 40, cy: 280, r: 6, fill: MC }); mk(k0, 'circle', { cx: 290, cy: 190, r: 6, fill: MC }); txt(k0, 28, 304, 'START', { 'font-size': 13, 'letter-spacing': 1 }); txt(k0, 262, 176, 'END', { 'font-size': 13, 'letter-spacing': 1 });
const k0D = mk(k0, 'circle', { r: 9, fill: DC }), k0W = txt(k0, 170, 274, '', { 'font-size': 18, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' });
mk(k1, 'rect', { x: 20, y: 270, width: 300, height: 6, fill: '#B8BCC6' });
const k1B = boxG(k1, 44, 34, ''), k1F = PUC.arrow(k1, FC, 5, 13), k1W = txt(k1, 170, 214, '', { 'font-size': 18, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' });

/* ---------- S: the sim ---------- */
const s = $('#simS'), SG = 470, PXM = 100, AX = 180, BOXW = 56, BOXH = 44;
const PX = ([x, y]) => [AX + x * PXM, SG - y * PXM];
mk(s, 'rect', { x: 36, y: SG, width: 712, height: 8, fill: '#B8BCC6' });
mk(s, 'path', { d: `M${AX},${SG} L${AX + 346.4},${SG - 200} L${AX + 346.4},${SG} Z`, fill: '#EEE9DD', stroke: C.ink2, 'stroke-width': 2.5 });
mk(s, 'rect', { x: AX + 330, y: SG - 200, width: 210, height: 12, rx: 3, fill: '#8A6A43' }); mk(s, 'rect', { x: AX + 516, y: SG - 188, width: 12, height: 188, fill: '#A88A63' });
mk(s, 'path', { d: `M ${AX + 60} ${SG} A 60 60 0 0 0 ${AX + 52} ${SG - 30}`, fill: 'none', stroke: TH, 'stroke-width': 3 }); txt(s, AX + 70, SG - 10, '30°', { 'font-size': 17, fill: TH, 'font-weight': 600 });
const SP = [poly([[0, 0], [0, 2], [3.464, 2]]), poly([[0, 0], [3.464, 2]]), poly([[0, 0], [0, 0.5], [0.866, 0.5], [0.866, 1], [1.732, 1], [1.732, 1.5], [2.598, 1.5], [2.598, 2], [3.464, 2]]), poly([[3.464, 2], [0, 0]])];
const sPath = SP.slice(0, 3).map((p, i) => mk(s, 'path', { d: 'M' + p.pts.map(q => PX(q).map(v => v.toFixed(1)).join(',')).join(' L'), fill: 'none', stroke: DC, 'stroke-width': 4, 'stroke-dasharray': i === 1 ? 'none' : '9 7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
const sTag = [[AX - 30, SG - 110], [AX + 150, SG - 120], [AX + 60, SG - 150]].map(([x, y], i) => { const g = mk(s, 'g', {}); mk(g, 'circle', { cx: x, cy: y, r: 16, fill: DC }); txt(g, x, y + 6, String(i + 1), { 'font-size': 18, fill: '#fff', 'font-weight': 700, 'text-anchor': 'middle' }); return g; });
txt(s, AX, SG + 34, 'A · floor', { 'font-size': 16, 'text-anchor': 'middle', fill: MC, 'font-weight': 600 }); txt(s, AX + 470, SG - 214, 'B · shelf, 2 m up', { 'font-size': 16, 'text-anchor': 'middle', fill: MC, 'font-weight': 600 });
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'rect', { x: -BOXW / 2, y: -BOXH, width: BOXW, height: BOXH, rx: 5, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const sB = boxG(s, BOXW, BOXH, '3 kg', 16);
const sM = PUC.arrow(s, FC, 7, 20), sMl = flab(s, 'mg', 'Earth');
const sD = PUC.arrow(s, DC, 5, 15), sDx = mk(s, 'line', { stroke: DC, 'stroke-width': 3, 'stroke-dasharray': '6 5' }), sDy = PUC.arrow(s, DC, 4, 12);
const sNx = txt(s, 0, 0, 'sideways: W = 0', { 'font-size': 17, fill: EC, 'font-weight': 600 }), sNy = txt(s, 0, 0, 'up: W = -mg Δy', { 'font-size': 17, fill: EC, 'font-weight': 600 });
$('#roG').innerHTML = `<span class="k">path</span><span class="v" id="r0">1</span><span class="u">of 3 · then back</span>
  <span class="k" style="color:${DC}">s</span><span class="v" id="r1" style="color:${DC}">0.00</span><span class="u">m · along the path</span>
  <span class="k" style="color:${DC}">h</span><span class="v" id="r2" style="color:${DC}">0.00</span><span class="u">m · height</span>
  <span class="k" style="color:${EC}">W<sub>g</sub></span><span class="v" id="r3" style="color:${EC}">0.0</span><span class="u">J · work by gravity</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 8, ymin: -66, ymax: 6, xt: [0, 2, 4, 6, 8], yt: [-60, -30, 0], xl: 's (m)' });
gr.xlab.setAttribute('y', 78 + 140 + 56); gr.xlab.setAttribute('fill', DC);
txt($('#grS'), 96, 66, 'W (J)', { 'text-anchor': 'end', fill: EC });
const gFin = gr.mk('line', { x1: gr.X(0), y1: gr.Y(-58.8), x2: gr.X(8), y2: gr.Y(-58.8), stroke: EC, 'stroke-width': 1.5, 'stroke-dasharray': '5 6', opacity: 0 });
const gCur = [0, 1, 2, 3].map(() => gr.curve(EC, 4)), gDot = gr.dot(EC, 10);
const gLab = [0, 1, 2].map(i => { const t2 = gr.mk('text', { 'font-family': 'IBM Plex Mono', 'font-size': 16, fill: DC, 'font-weight': 700 }); t2.textContent = String(i + 1); return t2; });
const hAt = (k, s2) => SP[k](s2)[1];
const RUN = [[wt('S2', 'Straight'), 3.0], [wt('S3', 'Push'), 2.4], [wt('S5', 'staircase'), 3.0], [wt('S6', 'slide'), 2.4]];
const tRep = T0('S8'), tRepGo = tRep + 0.5, VR = 4 / 2.4, tFreeze = tRepGo + (0.8 / VR) / 0.25, tResume = Math.max(wt('S9', 'sideways'), tFreeze + 1.6);
// which run and how far: k (0..3), s (m); after the round trip, the 0.25x replay on the ramp
const state = t => {
  if (t >= tRep) { const s2 = t < tFreeze ? 1.2 + 0.25 * VR * Math.max(0, t - tRepGo) : t < tResume ? 2.0 : Math.min(2.8, 2.0 + 0.25 * VR * (t - tResume)); return [1, Math.round(Math.min(s2, 2.0 + (t >= tResume ? 0.8 : 0)) * 100) / 100]; }
  let k = 0, s2 = 0; RUN.forEach(([ts, d], i) => { if (t >= ts) { k = i; s2 = SP[i].len * M.clamp((t - ts) / d); } });
  return [k, Math.round(s2 * 100) / 100];
};

/* ---------- D: the reason ---------- */
const STEPS = [[`\\text{path} = \\text{tiny steps: } \\textcolor{${DC}}{\\Delta x} + \\textcolor{${DC}}{\\Delta y}`, 'any path, cut into small sideways and up parts'],
  [`\\text{sideways: } \\theta = 90^\\circ \\Rightarrow ${WK} = 0`, 'gravity is at a right angle to the motion'],
  [`\\text{up: } ${WK} = -${mK}${gK}\\,\\textcolor{${DC}}{\\Delta y}`, 'force down, movement up'],
  [`${WK} = -${mK}${gK}\\,(${yK(2)} - ${yK(1)})`, 'add every step: only the heights count'],
  [`${yK(2)} = ${yK(1)} \\Rightarrow ${WK}_{\\text{round trip}} = 0`, 'back to the start: zero']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'one'), wt('D3', 'two'), wt('D4', 'three'), wt('D5', 'four'), wt('D6', 'five')];
const dr = $('#drS');
// a smooth curvy path from (120, 470) to (620, 150), and its staircase
const curve = u => [120 + 500 * u, 470 - 320 * (u * u * (3 - 2 * u)) - 60 * Math.sin(Math.PI * u) * 0.6];
let cd = ''; for (let i = 0; i <= 50; i++) { const [x, y] = curve(i / 50); cd += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
mk(dr, 'path', { d: cd, fill: 'none', stroke: DC, 'stroke-width': 3, opacity: 0.45 });
const NS = 8, stepPts = []; for (let i = 0; i < NS; i++) { const a = curve(i / NS), b = curve((i + 1) / NS); stepPts.push([a, b]); }
const dH = stepPts.map(([a, b]) => mk(dr, 'line', { x1: a[0], y1: a[1], x2: b[0], y2: a[1], stroke: DC, 'stroke-width': 4, 'stroke-linecap': 'round' }));
const dV = stepPts.map(([a, b]) => mk(dr, 'line', { x1: b[0], y1: a[1], x2: b[0], y2: b[1], stroke: DC, 'stroke-width': 4, 'stroke-linecap': 'round' }));
mk(dr, 'circle', { cx: 120, cy: 470, r: 7, fill: MC }); mk(dr, 'circle', { cx: 620, cy: 150, r: 7, fill: MC });
txt(dr, 120, 504, 'start, y₁', { 'font-size': 18, fill: DC, 'font-weight': 600, 'text-anchor': 'middle' }); txt(dr, 620, 126, 'end, y₂', { 'font-size': 18, fill: DC, 'font-weight': 600, 'text-anchor': 'middle' });
const dM = PUC.arrow(dr, FC, 6, 17), dMl = flab(dr, 'mg', 'Earth');
const dBack = mk(dr, 'path', { d: 'M620,150 C 700 300 400 520 120 470', fill: 'none', stroke: C.ink2, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
const dNote = txt(dr, 392, 556, '', { 'font-size': 21, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${WK}_{\\text{gravity}} = -${mK}${gK}\\,(${yK(2)} - ${yK(1)})`);

/* ---------- R: friction there and back ---------- */
const rl = $('#rlS'), RF = 380, RPX = 60, RX0 = 140;      // 60 px per metre, 6 m slide
mk(rl, 'rect', { x: 36, y: RF, width: 712, height: 10, fill: '#B8BCC6' });
for (let k = 0; k < 18; k++) mk(rl, 'line', { x1: 50 + k * 40, y1: RF + 10, x2: 40 + k * 40, y2: RF + 22, stroke: '#B8BCC6', 'stroke-width': 2 });
mk(rl, 'line', { x1: RX0, y1: RF + 44, x2: RX0 + 360, y2: RF + 44, stroke: DC, 'stroke-width': 2 }); txt(rl, RX0 + 180, RF + 70, '6 m', { 'font-size': 18, fill: DC, 'font-weight': 600, 'text-anchor': 'middle' });
const rGh = [0.3, 0.2, 0.12].map(op => mk(rl, 'rect', { x: -32, y: -50, width: 64, height: 50, rx: 5, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const rB = boxG(rl, 64, 50, '');
const rFa = PUC.arrow(rl, FC, 6, 17), rFl = flab(rl, 'f', 'floor'), rVa = PUC.arrow(rl, VC, 6, 17), rVl = sym(rl, 0, 0, 'v', '', VC, 26);
const rW = txt(rl, 392, 170, '', { 'font-size': 44, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' }); txt(rl, 392, 112, 'WORK BY FRICTION · f = 10 N', { 'font-size': 16, 'letter-spacing': 1.5, 'text-anchor': 'middle' });
const rLeg = txt(rl, 392, 226, '', { 'font-size': 18, fill: C.mute, 'text-anchor': 'middle' });
const tGo1 = T0('R2') + 0.3, tGo2 = T0('R4') + 0.2, DUR = 2.8;
const rX = t => { const a = M.clamp((t - tGo1) / DUR), b = M.clamp((t - tGo2) / DUR); const e = u => u * u * (3 - 2 * u); return 6 * e(a) - 6 * e(b); };
const rS = t => { const a = M.clamp((t - tGo1) / DUR), b = M.clamp((t - tGo2) / DUR); const e = u => u * u * (3 - 2 * u); return 6 * e(a) + 6 * e(b); };
const LK = [['Friction always points against the motion'], ['So its work is negative on every bit'], ['Bits never cancel: a longer path takes more'], ['Round trip: not zero. The energy becomes heat']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];

/* ---------- C: side by side (floor plans) + two thinks ---------- */
const plan = (p, pts, len) => {
  const P2 = poly(pts); mk(p, 'rect', { x: 40, y: 30, width: 632, height: 280, rx: 8, fill: '#F4F1EA', stroke: C.line, 'stroke-width': 2 });
  mk(p, 'path', { d: 'M' + pts.map(q => q.join(',')).join(' L'), fill: 'none', stroke: DC, 'stroke-width': 4, 'stroke-dasharray': '10 7', 'stroke-linejoin': 'round' });
  const [a, b] = [pts[0], pts[pts.length - 1]]; mk(p, 'circle', { cx: a[0], cy: a[1], r: 8, fill: MC }); mk(p, 'circle', { cx: b[0], cy: b[1], r: 8, fill: MC });
  txt(p, a[0], a[1] + 36, 'A', { 'font-size': 20, fill: MC, 'font-weight': 700, 'text-anchor': 'middle' }); txt(p, b[0], b[1] + 36, 'B', { 'font-size': 20, fill: MC, 'font-weight': 700, 'text-anchor': 'middle' });
  const bx = mk(p, 'rect', { x: -18, y: -18, width: 36, height: 36, rx: 4, fill: '#FFF8E7', stroke: MC, 'stroke-width': 2.5 });
  const w = txt(p, 356, 290, '', { 'font-size': 26, fill: EC, 'font-weight': 600, 'text-anchor': 'middle' });
  return { P2, bx, w, len };
};
const c0P = plan($('#c0S'), [[110, 200], [602, 200]], 6), c1P = plan($('#c1S'), [[110, 200], [110, 80], [602, 80], [602, 200]], 12);
$('#c0a').innerHTML = K(`${WK} = -10 \\times 6 = ${tx(EC, '-60\\,\\text{J}')}`); $('#c1a').innerHTML = K(`${WK} = -10 \\times 12 = ${tx(EC, '-120\\,\\text{J}')}`);
const th1 = PUC.think($('#th1'), { q: 'Carry a bag up to the third floor, then back down to the start. Total work done by gravity?', opts: ['Negative', 'Zero', 'Positive'], right: 1,
  why: 'Same height at the end: gravity gives back all it took.' });
const th2 = PUC.think($('#th2'), { q: 'A ball is thrown up and falls back into your hand. Is the total work by air drag zero?', opts: ['Yes', 'No'], right: 1,
  why: 'Drag is against the motion both ways: both parts are negative.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${WK}_g = -70 \\times 9.8 \\times 60 = ${tx(EC, '-41{,}160\\,\\text{J}')}`), 'on both paths'],
  [K(`\\text{path: } ${WK}_r = -20 \\times 300 = ${tx(EC, '-6000\\,\\text{J}')}`)],
  [K(`\\text{road: } ${WK}_r = -20 \\times 1200 = ${tx(EC, '-24{,}000\\,\\text{J}')}`)],
  [K(`\\text{gravity: same} \\quad \\text{resistance: } 4\\times`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 92 });
const w = $('#wrS');
mk(w, 'path', { d: 'M36,470 L120,470 L420,130 L700,470 L748,470', fill: '#CFE3C0', stroke: '#7FA85A', 'stroke-width': 3 });
const WROAD = poly([[150, 462], [520, 440], [230, 380], [470, 340], [300, 280], [430, 240], [370, 180], [420, 132]]), WPATH = poly([[300, 462], [420, 132]]);
mk(w, 'path', { d: 'M' + WROAD.pts.map(p => p.join(',')).join(' L'), fill: 'none', stroke: C.ink2, 'stroke-width': 5, 'stroke-linejoin': 'round' });
mk(w, 'path', { d: 'M300,462 L420,132', fill: 'none', stroke: DC, 'stroke-width': 5, 'stroke-dasharray': '10 7' });
txt(w, 240, 330, 'path 300 m', { 'font-size': 18, fill: DC, 'font-weight': 600, 'text-anchor': 'end' }); txt(w, 560, 404, 'road 1200 m', { 'font-size': 18, fill: C.ink2, 'font-weight': 600 });
mk(w, 'line', { x1: 420, y1: 130, x2: 690, y2: 130, stroke: DC, 'stroke-width': 1.5, 'stroke-dasharray': '4 5' });
const wH = PUC.arrow(w, DC, 4, 12), wHl = txt(w, 700, 300, '60 m', { 'font-size': 20, fill: DC, 'font-weight': 600 });
const wD = [mk(w, 'circle', { r: 9, fill: DC, stroke: '#fff', 'stroke-width': 2 }), mk(w, 'circle', { r: 9, fill: C.ink2, stroke: '#fff', 'stroke-width': 2 })];
const tW = [wt('W3', 'Gravity'), wt('W4', 'Now'), wt('W5', 'On'), wt('W6', 'Gravity')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A conservative force always does zero work', right: 'Zero only on a closed path. Floor to shelf: -58.8 J' });
const tg = $('#tg');
mk(tg, 'rect', { x: 40, y: 228, width: 340, height: 6, fill: '#B8BCC6' }); mk(tg, 'rect', { x: 250, y: 108, width: 130, height: 8, fill: '#8A6A43' });
const tgUp = mk(tg, 'path', { d: 'M90,226 C 90 120 180 100 300 104', fill: 'none', stroke: DC, 'stroke-width': 4 }), tgBk = mk(tg, 'path', { d: 'M310,118 C 300 200 200 226 100 228', fill: 'none', stroke: DC, 'stroke-width': 4, 'stroke-dasharray': '8 6' });
const tgL1 = txt(tg, 120, 96, 'W = -58.8 J', { 'font-size': 18, fill: EC, 'font-weight': 600 }), tgL2 = txt(tg, 170, 260, 'round trip: 0', { 'font-size': 18, fill: EC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'One mark: which forces are conservative? Numericals: round trip work' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 2 kg block is pulled up a rough incline, 5 m long and 3 m high, then slides back to the bottom (μ = 0.5, <i>g</i> = 10 m/s²). Total work by gravity, and by friction, over the round trip?', qW: 780,
  opts: ['0 J and -80 J', '-60 J and -80 J', '0 J and -40 J', '0 J and 0 J'], right: 0, optY: 300, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${WK}_g = 0\\;\\;\\text{(closed path)}`)], [K(`\\sin\\theta = 3/5,\\; \\cos\\theta = 4/5`)],
  [K(`N = 2 \\times 10 \\times 0.8 = 16\\,\\text{N}`)], [K(`${fK} = 0.5 \\times 16 = 8\\,\\text{N}`)], [K(`${WK}_f = -8 \\times 10 = -80\\,\\text{J} \\Rightarrow \\textbf{A}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Gravity'), wt('A3', 'Sine'), wt('A3', 'normal'), wt('A4', 'Friction'), wt('A5', 'Over')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · conservative and non-conservative forces', y0: 92, dy: 80, txt: [0, 1, 1, 1, 1],
  lines: [K(`${WK}_{\\text{gravity}} = -${mK}${gK}\\,(${yK(2)} - ${yK(1)}) \\qquad ${WK}_{\\text{conservative}} = -\\Delta ${UK}`),
    '<b>Conservative</b>: work depends only on start and end. Round trip work = 0',
    '<b>Examples</b>: gravity and the spring force. Each has a potential energy <i>U</i>',
    '<b>Non-conservative</b>: friction, air drag. Work depends on the path length',
    '<b>Round trip with friction</b>: work is negative, the energy becomes heat'] });
const YQ = ['What makes a force conservative?', 'Why is the round trip work of friction never zero?', 'Why does gravity do the same work on the steep path and the road?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT', topic: "Where does a swing's speed go? Conservation of Mechanical Energy", y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (sj.offsetLeft - bp.offsetWidth - 14) + 'px'; bp.style.top = '96px';
}
const loopU = (t, t0, per) => ((t - t0) % per + per) % per / per;

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  if (!geo) measure();
  M.vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    ROWS.forEach((_, i) => M.vis($('#jr' + i), t, i < 2 ? tMorph + 0.3 + i * 0.12 : tRow[2] + 0.6, 1e9, { dy: 16 }));
    const u = M.clamp(loopU(t, tMorph, 3.0) / 0.8);
    [[st0, jd0[0]], [rp0, jd0[1]]].forEach(([p, d]) => { const [x, y] = p(p.len * u); attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1)); });
    [[sp1, jd1[0]], [rd1, jd1[1]]].forEach(([p, d]) => { const [x, y] = p(p.len * u); attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1)); });
    M.vis($('#hjP'), t, T0('H2') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#house'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#aaravC'), t, tH3 + 0.4, 1e9, { dy: 30, sp: M.SOFT });
    const gh = M.o3((t - wt('H3', 'sixty') + 0.1) / 0.6); if (gh > 0.01) hoH.set(470, 345, 470, 345 - 259 * gh); else hoH.set(0, 0, 0, 0); hoHl.style.opacity = gh.toFixed(3);
    // both riders leave together; the path rider reaches the top first, the road rider much later
    const ur = Math.max(0, t - tRide); [[PATH, 0, 2.2], [ROAD, 1, 8.5]].forEach(([p, i, d]) => { const [x, y] = p(p.len * M.clamp(ur / d)); attr(hoD[i], 'cx', x.toFixed(1)); attr(hoD[i], 'cy', y.toFixed(1)); M.hide(hoD[i], t < tRide); });
    hoPt.style.strokeDashoffset = (-(t - tH3) * 20).toFixed(1);
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr0'), t, T0('P2') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, T0('P3') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr2'), t, T0('P4') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, T0('P5') - 0.1, 1e9, POP);
    M.vis($('#pt'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kc0'), t, T0('P2') + 0.1, 1e9, { dy: 24 }); M.vis($('#kc1'), t, T0('P4') + 0.1, 1e9, { dy: 24 });
    PUC.write($('#kc0F'), t, wt('P3', 'conservative') - 0.2, 0.7); PUC.write($('#kc1F'), t, wt('P5', 'non') - 0.2, 0.7);
    // left: the dot runs the three paths in turn; the work label stays the same
    const t0 = T0('P2') + 0.5, k = Math.floor(Math.max(0, t - t0) / 1.6) % 3, u = M.clamp(((t - t0) % 1.6) / 1.2), p = KP[k], [x, y] = p(p.len * u);
    attr(k0D, 'cx', x.toFixed(1)); attr(k0D, 'cy', y.toFixed(1)); M.hide(k0D, t < t0);
    M.setT(k0W, `path ${k + 1}: W = -mgh`); k0W.style.opacity = (t > t0 ? 1 : 0).toFixed(0);
    // right: the box slides back and forth; friction work keeps growing (10 N over 5 m each pass)
    const t1 = T0('P4') + 0.3, n = Math.max(0, t - t1) / 1.4, pass = Math.floor(n), v = n - pass, dir = pass % 2 ? -1 : 1, e = v * v * (3 - 2 * v), bx = 60 + 220 * (dir > 0 ? e : 1 - e);
    at(k1B, bx, 270); if (t > t1) { k1F.set(bx - 26 * dir, 252, bx - 26 * dir - 46 * dir, 252); } else k1F.set(0, 0, 0, 0);
    M.setT(k1W, `W = ${t > t1 ? -(50 * (pass + e)).toFixed(0) : 0} J`); k1W.style.opacity = t > t1 ? '1' : '0';
  }

  /* S: the sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const [k, s2] = state(t), [xm, ym, ang] = SP[k](s2), [x, y] = PX([xm, ym]), h = Math.round(ym * 100) / 100, W = -MG * h;
    const onRamp = (k === 1 || k === 3) && ym > 0.02 && ym < 1.98; at(sB, x, y, onRamp ? -30 : 0);
    sGh.forEach((g, j) => { const [k2, s3] = state(t - (t >= tRep ? 0.24 : 0.07) * (j + 1)), [xa, ya] = SP[k2](s3), [x2, y2] = PX([xa, ya]);
      at(g, x2, y2, (k2 === 1 || k2 === 3) && ya > 0.02 && ya < 1.98 ? -30 : 0); M.hide(g, k2 !== k || Math.hypot(x2 - x, y2 - y) < 4 || (t >= tRep && t - 0.24 * (j + 1) < tRepGo)); });
    sPath.forEach((p, i) => { const on = i <= (t >= tRep ? 2 : Math.min(k, 2)); p.style.opacity = !on ? '0' : (i === (k === 3 ? 1 : k) ? '1' : '0.3'); });
    sTag.forEach((g, i) => M.vis(g, t, RUN[i][0] - 0.2, 1e9, POP));
    M.setT($('#r0'), k === 3 && t < tRep ? 'back' : String(k + 1)); M.setT($('#r1'), f2(s2)); M.setT($('#r2'), f2(h)); M.setT($('#r3'), f1(W));
    // graph: one curve per path; the way back continues path 2 from s = 4 m
    const sNow = (i) => t >= tRep ? SP[i].len : (i < k ? SP[i].len : i === k ? s2 : 0);
    [0, 1, 2].forEach(i => { const sm = sNow(i); gCur[i](u2 => [u2, -MG * SP[i](u2)[1]], 0, sm, 80);
      attr(gLab[i], 'x', (gr.X(SP[i].len) + [6, -14, 24][i]).toFixed(1)); attr(gLab[i], 'y', (gr.Y(-58.8) + (i === 1 ? 24 : -8)).toFixed(1)); gLab[i].style.opacity = sm >= SP[i].len - 0.01 ? '1' : '0'; });
    const sb = t >= tRep ? 4 : k === 3 ? s2 : 0; gCur[3](u2 => [4 + u2, -MG * SP[3](u2)[1]], 0, sb, 40);
    gDot(k === 3 && t < tRep ? 4 + s2 : s2, W, t > tS1 + 0.6);
    gFin.style.opacity = (0.6 * M.o3((t - wt('S5', 'finish')) / 0.4)).toFixed(3);
    M.vis($('#grP'), t, wt('S5', 'finish') - 0.1, 1e9, POP);
    M.vis($('#slo'), t, tRep - 0.1, out, POP);
    M.hide($('#pau'), !(t >= tFreeze && t < tResume));
    // slow-mo: weight down, the step along the ramp split into a sideways part and an up part
    const gv = t >= tRep ? M.o3((t - tFreeze + 0.1) / 0.5) : 0, cx = x, cy = y - 22;
    if (gv > 0.01) { sM.set(cx, cy, cx, cy + 90 * gv); sMl(cx + 14, cy + 70, gv); } else { sM.set(0, 0, 0, 0); sMl(0, 0, 0); }
    const gd = t >= tRep ? M.o3((t - tFreeze - 0.6) / 0.5) : 0, dx = 120, dy = -69.3;
    if (gd > 0.01) { const x0 = x - 60, y0 = y + 34.6 + 30; sD.set(x0, y0, x0 + dx * gd, y0 + dy * gd); attr(sDx, 'x1', x0); attr(sDx, 'y1', y0); attr(sDx, 'x2', (x0 + dx * gd).toFixed(1)); attr(sDx, 'y2', y0); sDy.set(x0 + dx, y0, x0 + dx, y0 + dy * gd);
      attr(sNx, 'x', x0 - 10); attr(sNx, 'y', y0 + 30); attr(sNy, 'x', x0 + dx + 14); attr(sNy, 'y', y0 - 20); } else { sD.set(0, 0, 0, 0); sDy.set(0, 0, 0, 0); }
    M.hide(sDx, gd <= 0.01); sNx.style.opacity = M.o3((t - wt('S9', 'sideways') + 0.1) / 0.4).toFixed(3); sNy.style.opacity = M.o3((t - wt('S9', 'up') + 0.1) / 0.4).toFixed(3);
    if (t < tRep) { sNx.style.opacity = sNy.style.opacity = '0'; }
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const cs = t < tStep[1] ? 0 : t < tStep[2] ? 1 : t < tStep[3] ? 2 : t < tStep[4] ? 3 : 4;
    stepPts.forEach((_, i) => { const g = M.clamp((t - tStep[0] - 0.3 - i * 0.12) / 0.3);
      dH[i].style.opacity = (g * (cs === 1 ? 1 : cs === 2 ? 0.25 : 0.7)).toFixed(3); dV[i].style.opacity = (g * (cs === 1 ? 0.25 : cs === 2 ? 1 : 0.7)).toFixed(3); dH[i].setAttribute('stroke', cs === 1 ? C.mute : DC); });
    const gm = M.o3((t - tStep[1] + 0.1) / 0.5); if (gm > 0.01) dM.set(250, 300, 250, 300 + 100 * gm); else dM.set(0, 0, 0, 0); dMl(264, 380, gm);
    M.draw(dBack, t, tStep[4] + 0.3, 1.0);
    M.setT(dNote, ['', 'sideways parts: W = 0', 'up parts: W = -mg Δy each', 'total: -mg (y₂ - y₁)', 'round trip: -mg(y₂ - y₁) + mg(y₂ - y₁) = 0'][cs]);
    dNote.style.opacity = cs ? M.o3((t - tStep[cs] - 0.5) / 0.4).toFixed(3) : '0';
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'round') - 0.3, 0.8);
    M.rise($('#st2'), t, wt('T1', 'conservative') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5'))) / 0.3))); });
    M.vis($('#rrP'), t, wt('R5', 'heat') - 0.2, 1e9, POP);
    const xm = rX(t), x = RX0 + xm * RPX, moving = (t > tGo1 && t < tGo1 + DUR) || (t > tGo2 && t < tGo2 + DUR), dir = t < tGo2 ? 1 : -1;
    at(rB, x, RF); rGh.forEach((g, j) => { const x2 = RX0 + rX(t - 0.1 * (j + 1)) * RPX; at(g, x2, RF); M.hide(g, !moving || Math.abs(x2 - x) < 3); });
    const gf = M.o3((t - tGo1 + 0.1) / 0.4);
    if (moving || t > tGo1) { if (moving) { rFa.set(x - 34 * dir, RF - 12, x - 34 * dir - 70 * dir * gf, RF - 12); rFl(x - 34 * dir - 70 * dir - (dir > 0 ? 24 : -8), RF - 36, gf); rVa.set(x + 34 * dir, RF - 30, x + 34 * dir + 60 * dir, RF - 30); attr(rVl, 'x', (x + 34 * dir + 30 * dir - 6).toFixed(1)); attr(rVl, 'y', RF - 44); rVl.style.opacity = '1'; } else { rFa.set(0, 0, 0, 0); rFl(0, 0, 0); rVa.set(0, 0, 0, 0); rVl.style.opacity = '0'; } }
    else { rFa.set(0, 0, 0, 0); rFl(0, 0, 0); rVa.set(0, 0, 0, 0); rVl.style.opacity = '0'; }
    const Wf = -10 * Math.round(rS(t) * 100) / 100; M.setT(rW, `${Wf.toFixed(1)} J`); rW.style.opacity = M.o3((t - tR1 - 0.4) / 0.4).toFixed(3);
    M.setT(rLeg, t < tGo2 ? (t > tGo1 + DUR ? 'there: -60 J' : '') : t > tGo2 + DUR ? 'there -60 J + back -60 J = -120 J, not 0' : 'there: -60 J · coming back...');
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    const run = (q, t0, d) => { const u = M.clamp((t - t0) / d), e = u * u * (3 - 2 * u), [x, y] = q.P2(q.P2.len * e); attr(q.bx, 'x', (x - 18).toFixed(1)); attr(q.bx, 'y', (y - 18).toFixed(1));
      M.setT(q.w, `W = ${(-10 * Math.round(q.len * e * 100) / 100).toFixed(1)} J`); q.w.style.opacity = t > t0 ? '1' : '0'; };
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); run(c0P, wt('C2', 'Slide'), 2.2); M.vis($('#exC'), t, tC1 + 0.6, 1e9, { dy: 8 });
    PUC.write($('#c0a'), t, wt('C2', 'Minus') - 0.2, 0.8);
    M.vis($('#c1'), t, T0('C3') - 0.3, out, { dx: 60, dy: 0, ...o }); run(c1P, wt('C3', 'long'), 3.0);
    PUC.write($('#c1a'), t, wt('C3', 'Minus') - 0.2, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('C6'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Total') - 0.3, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Gravity') });
    M.vis($('#th2'), t, tC6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC6, tOpts: wt('C6', 'Is'), tCount: T1('C6') + 0.05, dur: 3, tAns: T0('C7') - 0.02, tWhy: wt('C7', 'Drag') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const gh = M.o3((t - tW[0] + 0.1) / 0.6); if (gh > 0.01) wH.set(690, 470, 690, 470 - 340 * gh); else wH.set(0, 0, 0, 0); wHl.style.opacity = gh.toFixed(3); attr(wHl, 'x', 702);
    const ur = Math.max(0, t - T0('W2') - 0.8); [[WPATH, 0, 3], [WROAD, 1, 12]].forEach(([p, i, d]) => { const [x, y] = p(p.len * M.clamp(ur / d)); attr(wD[i], 'cx', x.toFixed(1)); attr(wD[i], 'cy', y.toFixed(1)); });
    M.vis($('#wc0'), t, tW[3] + 0.4, 1e9, POP); M.vis($('#wc1'), t, wt('W6', 'Resistance') + 0.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'zero') - 0.2 });
    M.draw(tgUp, t, wt('X3', 'Floor') - 0.2, 0.8); tgL1.style.opacity = M.o3((t - wt('X3', 'minus')) / 0.3).toFixed(3);
    M.draw(tgBk, t, wt('X3', 'closed') - 0.2, 0.8); tgL2.style.opacity = M.o3((t - wt('X3', 'closed') - 0.4) / 0.3).toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'one') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Total'), tCount, tAns });
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
