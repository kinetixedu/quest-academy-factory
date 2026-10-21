// PUC Physics Ep 50: Force and inertia (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const FC = C.orange, VC = C.ac, XC = C.violet, GC = C.red, TH = C.gold, IK = C.ink;   // canon: F orange, v blue, x/h violet, g red, theta gold, m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2), f3 = v => v.toFixed(3);
const G = 9.8, D2R = Math.PI / 180;
const Fk = tc(FC, 'F'), dv = '\\Delta ' + tc(VC, 'v'), dvv = '\\Delta ' + tc(VC, '\\vec{v}');

Object.assign(M.IC, {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M4.9 4.9c3 3 3 11.2 0 14.2', 'M19.1 4.9c-3 3-3 11.2 0 14.2'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  cart: ['M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  play: ['M6 3l14 9-14 9z'], stop: ['M6 6h12v12H6z'], fast: ['m13 17 5-5-5-5', 'm6 17 5-5-5-5'], slow: ['m11 17-5-5 5-5', 'm18 17-5-5 5-5'],
  turn: ['M4 20v-7a7 7 0 0 1 7-7h9', 'm16 2 4 4-4 4'], squash: ['M4 9h16v6H4z', 'M12 2v4', 'm10 4 2 2 2-2', 'M12 22v-4', 'm10 20 2-2 2 2'],
  coin: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 7v10'], hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v6', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tA2 = T0('A2'), tG2 = T0('G2'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tI1 = T0('I1'), tC2 = T0('C2');
const tM1 = T0('M1'), tD1 = T0('D1'), tL3 = T0('L3'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('B1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['ball', 'Football', 'STILL UNTIL KICKED', 'football'], ['bike', 'Bicycle', 'SLOWS DOWN BY ITSELF', 'bicycle'], ['cart', 'Loaded cart', 'HARD TO PUSH', 'loaded']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="js${i}" width="270" height="92"></svg></div>`).join('');
// mini pictures: kick -> ball moves; bicycle gaps shrink; heavy cart, short move
const js = [0, 1, 2].map(i => $('#js' + i));
js.forEach(s => mk(s, 'line', { x1: 10, y1: 84, x2: 260, y2: 84, stroke: C.dim, 'stroke-width': 2.5 }));
const jsA = []; // [el, kind]
{ const s = js[0]; [0.12, 0.2, 0.3].forEach((o, k) => jsA.push(mk(s, 'circle', { cx: 120 + k * 50, cy: 66, r: 16, fill: C.ink, opacity: o })));
  jsA.push(mk(s, 'circle', { cx: 250 - 16, cy: 66, r: 16, fill: C.ink })); const a = PUC.arrow(s, FC, 5, 14); a.set(40, 66, 96, 66); jsA.push(a.g); }
{ const s = js[1]; [10, 100, 165, 210].forEach((x, k) => { const g = mk(s, 'g', { opacity: [0.12, 0.2, 0.3, 1][k] }); mk(g, 'circle', { cx: x + 12, cy: 70, r: 12, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: x + 44, cy: 70, r: 12, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'path', { d: `M${x + 12},70 L${x + 26},48 L${x + 44},70 M${x + 26},48 H${x + 40}`, stroke: C.ink, 'stroke-width': 3, fill: 'none' }); jsA.push(g); }); }
{ const s = js[2]; mk(s, 'rect', { x: 150, y: 46, width: 96, height: 26, rx: 4, fill: C.ink }); [0, 1, 2].forEach(k => mk(s, 'rect', { x: 156 + k * 30, y: 18, width: 26, height: 26, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 }));
  [166, 230].forEach(x => mk(s, 'circle', { cx: x, cy: 76, r: 7, fill: C.ink })); const a = PUC.arrow(s, FC, 5, 14); a.set(70, 58, 144, 58); jsA.push(a.g); }
const TILES = [[FC, 'Card flies off', 'arrowR'], [C.ink, 'Coin drops in. Why?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'card'), wt('H4', 'coin'), wt('H4', 'Why')];

/* ---------- P: what a force is ---------- */
const MT = [['play', 'Start', 'from rest'], ['stop', 'Stop', 'come to rest'], ['fast', 'Speed up', 'go faster'], ['slow', 'Slow down', 'go slower'], ['turn', 'Turn', 'change direction'], ['squash', 'Change shape', 'squash, stretch']];
$('#mts').innerHTML = MT.map(([ic, n, i], k) => `<div class="mt" id="mt${k}" style="left:${36 + (k % 2) * 372}px;top:${84 + Math.floor(k / 2) * 100}px"><i>${M.icon(ic, 24, FC, 2.4)}</i><div class="mn">${n}</div><div class="mi">${i}</div></div>`).join('') +
  `<div class="pillp ac" id="mtP" style="left:36px;top:490px">Motion changes? Look for a force.</div>`;
const tMt = [wt('P3', 'start'), wt('P3', 'stop'), wt('P3', 'speed'), wt('P3', 'slow'), wt('P3', 'turn'), wt('P3', 'shape')];
const pm = $('#pmS'), PFY = 380;
mk(pm, 'line', { x1: 40, y1: PFY, x2: 744, y2: PFY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(pm, 'line', { x1: x, y1: PFY + 4, x2: x - 14, y2: PFY + 18, stroke: C.dim, 'stroke-width': 2 });
const pBox = mk(pm, 'rect', { y: PFY - 110, width: 140, height: 110, rx: 10, fill: C.ink });
const pRope = mk(pm, 'line', { y1: PFY - 55, y2: PFY - 55, stroke: C.ink2, 'stroke-width': 3 });
const pPush = PUC.arrow(pm, FC, 7, 20), pPull = PUC.arrow(pm, FC, 7, 20);
const pLp = txt(pm, 0, PFY - 80, 'PUSH', { fill: FC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' }), pLl = txt(pm, 0, PFY - 80, 'PULL', { fill: FC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const pF = it(pm, 0, PFY - 150, 'F = 10 N', FC, { 'font-size': 32, 'text-anchor': 'middle' });
const pGh = [0, 1, 2].map(() => mk(pm, 'rect', { y: PFY - 110, width: 140, height: 110, rx: 10, fill: C.ink, opacity: 0 }));
const tPush = wt('P2', 'push'), tPull = wt('P2', 'pull');
const pBx = M.keys([[0, 150], [tPush + 0.15, 290], [tPull + 0.15, 430]], 0.9, M.io);

/* ---------- A: Aristotle, the bicycle, Galileo ---------- */
const b = $('#bkS'), BY = 420, BR = 46;
mk(b, 'line', { x1: 40, y1: BY, x2: 744, y2: BY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(b, 'line', { x1: x, y1: BY + 4, x2: x - 14, y2: BY + 18, stroke: C.dim, 'stroke-width': 2 });
const mkBike = (p, op) => { const g = mk(p, 'g', { opacity: op }); const wl = [0, 150].map(dx => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: 0, cy: 0, r: BR, fill: 'none', stroke: C.ink, 'stroke-width': 5 }); [0, 60, 120].forEach(a => mk(w, 'line', { x1: -BR * Math.cos(a * D2R), y1: -BR * Math.sin(a * D2R), x2: BR * Math.cos(a * D2R), y2: BR * Math.sin(a * D2R), stroke: C.ink2, 'stroke-width': 2 })); return [w, dx]; });
  const fr = mk(g, 'path', { d: '', stroke: C.ac, 'stroke-width': 6, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); return { g, wl, fr }; };
const bGh = [0.12, 0.2, 0.3].map(o => mkBike(b, o)), bike = mkBike(b, 1);
const setBike = (bk, x) => { bk.wl.forEach(([w, dx]) => w.setAttribute('transform', `translate(${(x + dx).toFixed(1)},${BY - BR}) rotate(${((x / BR) / D2R).toFixed(1)})`));
  attr(bk.fr, 'd', `M${x},${BY - BR} L${x + 55},${BY - BR - 70} L${x + 150},${BY - BR} M${x + 55},${BY - BR - 70} L${x + 120},${BY - BR - 72} M${x + 75},${BY - BR} L${x + 55},${BY - BR - 70} M${x + 75},${BY - BR} L${x + 150},${BY - BR} M${x + 40},${BY - BR - 92} h34 M${x + 120},${BY - BR - 72} l8,-26 h18`); };
const tCoast = wt('A3', 'Stop'), tSlowing = wt('A4', 'slowing');
const BV0 = 240, BA = 100, BT = BV0 / BA;     // px/s, px/s^2: coasts to rest in 2.4 s
const bX = tau => { tau = M.clamp(tau, 0, BT); return 60 + BV0 * tau - 0.5 * BA * tau * tau; };
const bFr = PUC.arrow(b, FC, 6, 18), bAir = PUC.arrow(b, FC, 6, 18);
const bLf = txt(b, 0, 0, 'friction', { fill: FC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'end' }), bLa = txt(b, 0, 0, 'air', { fill: FC, 'font-size': 20, 'font-weight': 600 });

/* ---------- G: Galileo's ramps (rolling ball, real time) ---------- */
const g = $('#gS'), S = 220, H0 = 0.5, FY = 470, XB = 236, XA = XB - 0.5 / Math.tan(30 * D2R) * S, YA = FY - H0 * S, XE = 748, BRr = 14;
const A1 = 5 / 7 * G * Math.sin(30 * D2R), T1r = Math.sqrt(2 * 1.0 / A1), VB = A1 * T1r;    // ramp 1: 1.00 m long at 30 degrees
const a2 = th => 5 / 7 * G * Math.sin(th * D2R);
mk(g, 'line', { x1: 20, y1: FY, x2: 764, y2: FY, stroke: C.ink, 'stroke-width': 3 });
mk(g, 'path', { d: `M20,${YA} H${XA} L${XB},${FY} H20 Z`, fill: '#EAD9C2', stroke: 'none' });
mk(g, 'path', { d: `M20,${YA} H${XA} L${XB},${FY}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const gR2f = mk(g, 'path', { fill: '#EAD9C2', stroke: 'none' }), gR2 = mk(g, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 4 });
const gH = mk(g, 'line', { x1: 20, y1: YA, x2: 764, y2: YA, stroke: XC, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const gHl = txt(g, 760, YA - 12, 'START HEIGHT h₀ = 0.50 m', { fill: XC, 'font-size': 18, 'font-weight': 600, 'text-anchor': 'end' });
const gArc = mk(g, 'path', { fill: 'none', stroke: TH, 'stroke-width': 3 }), gThl = it(g, 0, 0, 'θ', TH, { 'font-size': 26 });
const gMark = mk(g, 'circle', { r: 7, fill: XC }), gDl = txt(g, 0, 0, '', { fill: XC, 'font-size': 18, 'font-weight': 600, 'text-anchor': 'middle' });
const gGh = [0, 1, 2].map(() => mk(g, 'circle', { r: BRr, fill: C.ink, opacity: 0 }));
const gStb = [1, 2, 3, 4].map(j => mk(g, 'circle', { cx: XB + VB * 0.2 * j * S, cy: FY - BRr, r: BRr, fill: C.ink, opacity: 0.22 }));
const gStl = txt(g, 470, FY + 44, 'FLASH EVERY 0.2 S: EQUAL GAPS', { fill: VC, 'font-size': 18, 'font-weight': 600, 'text-anchor': 'middle' });
const gBall = mk(g, 'circle', { r: BRr, fill: C.ink });
const gV = PUC.arrow(g, VC, 5, 16);
const gOn = txt(g, 760, FY - 30, 'ON AND ON  →', { fill: VC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'end' });
// run schedule: ramp 2 at 30, 20, 12 degrees, then flat
const ROT = [[20, wt('G4', 'gentler') - 0.2], [12, T0('G5') - 0.1], [0, wt('G6', 'flat') - 0.3]];
const RUNS = [[30, wt('G2', 'rolled') - 0.1], [20, Math.max(wt('G4', 'still'), ROT[0][1] + 0.8)], [12, ROT[1][1] + 0.8], [0, Math.max(wt('G6', 'ball'), ROT[2][1] + 0.8)]];
const thTr = M.keys([[0, 30], ...ROT.map(([a, tt]) => [tt, a])], 0.7, M.io);
const runAt = t => { let k = -1; RUNS.forEach(([, tt], i) => { if (t >= tt) k = i; }); return k; };
// state of a run at time tau: position along the track, speed
function rstate(th, tau) {
  const L1 = 1.0;
  if (tau < T1r) { const s = 0.5 * A1 * tau * tau; return { seg: 1, s: L1 - s, v: A1 * tau }; }  // s = distance from the bottom along ramp 1
  if (th <= 0) return { seg: 0, s: VB * (tau - T1r), v: VB };
  const a = a2(th), t2 = VB / a, P = 2 * (T1r + t2), tm = (tau) % P;
  if (tm < T1r) { const s = 0.5 * A1 * tm * tm; return { seg: 1, s: L1 - s, v: A1 * tm }; }
  if (tm < T1r + t2) { const u = tm - T1r; return { seg: 2, s: VB * u - 0.5 * a * u * u, v: VB - a * u }; }
  if (tm < T1r + 2 * t2) { const u = tm - T1r - t2; return { seg: 2, s: VB * t2 - 0.5 * a * t2 * t2 - 0.5 * a * u * u, v: a * u }; }
  const u = tm - T1r - 2 * t2; return { seg: 1, s: VB * u - 0.5 * A1 * u * u, v: VB - A1 * u };
}
function rpos(th, st) {   // pixel centre of the ball, offset along the surface normal
  if (st.seg === 1) { const c = Math.cos(30 * D2R), sn = Math.sin(30 * D2R); const x = XB - st.s * c * S, y = FY - st.s * sn * S; return [x - sn * BRr, y - c * BRr, st.s * sn]; }
  if (st.seg === 0) return [XB + st.s * S, FY - BRr, 0];
  const c = Math.cos(th * D2R), sn = Math.sin(th * D2R), x = XB + st.s * c * S, y = FY - st.s * sn * S; return [x + sn * BRr, y - c * BRr, st.s * sn];
}
$('#gA').innerHTML = `<span class="k" style="color:${TH}">θ<sub style="font-style:normal">2</sub></span><span class="v" id="g_th" style="color:${TH}">30°</span><span class="u"></span>
  <span class="k" style="color:${XC}">h</span><span class="v" id="g_h" style="color:${XC}">0.50</span><span class="u">m</span>`;
$('#gB').innerHTML = `<span class="k" style="color:${XC}">h<sub style="font-style:normal">max</sub></span><span class="v" id="g_hm" style="color:${XC}">0.50</span><span class="u">m</span>
  <span class="k" style="color:${XC}">d<sub style="font-style:normal">2</sub></span><span class="v" id="g_d" style="color:${XC}">1.00</span><span class="u" id="g_du">m</span>`;
const gg = PUC.graph($('#ggS'), { x: 110, y: 64, w: 560, h: 156, xmax: 4, ymax: 3.2, xt: [0, 1, 2, 3, 4], yt: [], xl: 't (s)', yl: 'speed v' });
const gCur = gg.curve(VC), gGhC = [0, 1, 2].map(() => { const f = gg.curve(VC, 4); return f; }), gDot = gg.dot(VC, 10);
const gGhP = [...$('#ggS').querySelectorAll('path')].slice(-3);     // the three ghost curve paths
const gTags = RUNS.map(([th]) => txt($('#ggS'), 0, 0, th ? th + '°' : 'flat', { fill: TH, 'font-size': 18, 'font-weight': 600 }));
const gFlat = txt($('#ggS'), 676, gg.Y(VB) - 12, 'flat = steady', { fill: VC, 'font-size': 18, 'font-weight': 600, 'text-anchor': 'end' });

/* ---------- K: side by side ---------- */
const mkFloor = (p, y) => { mk(p, 'line', { x1: 40, y1: y, x2: 744, y2: y, stroke: C.ink, 'stroke-width': 3 }); for (let x = 52; x < 744; x += 28) mk(p, 'line', { x1: x, y1: y + 4, x2: x - 14, y2: y + 18, stroke: C.dim, 'stroke-width': 2 }); };
const kA = $('#kaS'), kG = $('#kgS'), KY = 380;
mkFloor(kA, KY); mkFloor(kG, KY);
const kBlk = [kA, kG].map(p => ({ gh: [0.12, 0.2, 0.3].map(o => mk(p, 'rect', { y: KY - 100, width: 110, height: 100, rx: 10, fill: C.ink, opacity: 0 })), b: mk(p, 'rect', { y: KY - 100, width: 110, height: 100, rx: 10, fill: C.ink }), f: PUC.arrow(p, FC, 7, 20), fr: PUC.arrow(p, FC, 6, 18), lf: it(p, 0, 0, 'F', FC, { 'font-size': 30 }), lfr: txt(p, 0, 0, 'friction', { fill: FC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' }) }));
const kXx = mk(kA, 'path', { d: '', stroke: GC, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const kAt = txt(kA, 392, 160, 'NOT WHAT REALLY HAPPENS', { fill: GC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const kGt = txt(kG, 392, 160, 'NO PUSH: SAME SPEED', { fill: VC, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
// Aristotle's picture: moves only while pushed (constant 170 px/s), stops dead
const kA0 = wt('K1', 'force'), kA1 = wt('K1', 'moving') + 0.3, KAV = 170;
const kAx = t => 70 + KAV * M.clamp(t - kA0, 0, kA1 - kA0);
// Galileo's picture: push 0.6 s (accelerates), coasts at constant speed, friction stops it
const kG0 = T0('K2') + 0.2, kGp = 0.6, kGf = wt('K2', 'friction'), kGd = 1.6;
const KGV = 470 / (0.5 * kGp + (kGf - kG0 - kGp) + 0.5 * kGd), KGA = KGV / kGp, KGD = KGV / kGd;   // stops near x 540   // stops 1.6 s after friction starts
function kGx(t) { const u = t - kG0; if (u <= 0) return 70; if (u < kGp) return 70 + 0.5 * KGA * u * u; const x1 = 70 + 0.5 * KGA * kGp * kGp; const tf = kGf - kG0; if (u < tf) return x1 + KGV * (u - kGp); const x2 = x1 + KGV * (tf - kGp), w = Math.min(u - tf, kGd); return x2 + KGV * w - 0.5 * KGD * w * w; }
const th1 = PUC.think($('#th1'), { q: 'A ball rolls at the same speed on a carpet and on smooth tiles. Which goes farther?', opts: ['Carpet', 'Tiles'], right: 1, why: 'Less friction on tiles: a smaller force changes its motion.' });

/* ---------- I: inertia definition ---------- */
const idS = $('#idS');
txt(idS, 48, 296, 'AT REST', { 'font-size': 18, 'font-weight': 600 }); txt(idS, 48, 436, 'MOVING', { 'font-size': 18, 'font-weight': 600 });
mk(idS, 'line', { x1: 220, y1: 300, x2: 1552, y2: 300, stroke: C.ink, 'stroke-width': 3 }); mk(idS, 'line', { x1: 220, y1: 440, x2: 1552, y2: 440, stroke: C.ink, 'stroke-width': 3 });
const iBox = mk(idS, 'rect', { x: 300, y: 220, width: 90, height: 80, rx: 8, fill: C.ink });
const iTg0 = txt(idS, 420, 270, 'stays at rest', { fill: C.ink2, 'font-size': 26, 'font-family': 'Poppins', 'font-weight': 600 });
const iGh = [0.12, 0.2, 0.3].map(o => mk(idS, 'circle', { cy: 410, r: 30, fill: C.ink, opacity: 0 })), iBall = mk(idS, 'circle', { cy: 410, r: 30, fill: C.ink });
const iV = PUC.arrow(idS, VC, 6, 18), iVl = it(idS, 0, 352, 'v', VC, { 'font-size': 30 });
const iTg1 = txt(idS, 1552, 352, 'same speed, same direction', { fill: C.ink2, 'font-size': 26, 'font-family': 'Poppins', 'font-weight': 600, 'text-anchor': 'end' });
const tIr = wt('I3', 'rest'), tIm = wt('I3', 'Moving'), IV = 170;
const iX = t => 300 + IV * Math.max(0, t - tIm + 0.3);

/* ---------- C: the coin trick (mm scale 3 px/mm), slow-mo replay ---------- */
const c = $('#cS'), PXM = 3, CX0 = 392, CARD_Y = 140, TBL = 470, MU = 0.3, VCARD = 2.0, LREL = 0.04;   // card 80 mm, coin at its centre
const AC = MU * G, TC = (VCARD - Math.sqrt(VCARD * VCARD - 2 * AC * LREL)) / AC, VCO = AC * TC, XCO = 0.5 * AC * TC * TC;   // contact time, coin speed, coin slide
const HF = 0.103, TF = Math.sqrt(2 * HF / G);                                   // coin falls 100 mm inside the glass
mk(c, 'line', { x1: 20, y1: TBL, x2: 764, y2: TBL, stroke: C.ink, 'stroke-width': 3 });
for (let x = 32; x < 764; x += 28) mk(c, 'line', { x1: x, y1: TBL + 4, x2: x - 14, y2: TBL + 18, stroke: C.dim, 'stroke-width': 2 });
mk(c, 'path', { d: `M${CX0 - 105},${CARD_Y} L${CX0 - 88},${TBL} H${CX0 + 88} L${CX0 + 105},${CARD_Y}`, fill: '#EEF4FD', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
mk(c, 'rect', { x: CX0 - 88, y: TBL - 28, width: 176, height: 28, fill: '#DCE7FC', stroke: 'none' });
const cGh = [0.12, 0.2, 0.3].map(o => mk(c, 'rect', { width: 72, height: 14, rx: 5, fill: TH, opacity: 0 }));
const card = mk(c, 'rect', { y: CARD_Y - 8, width: 240, height: 8, rx: 2, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2 });
const coin = mk(c, 'rect', { width: 72, height: 14, rx: 5, fill: TH, stroke: C.ink, 'stroke-width': 2 });
const cF = PUC.arrow(c, FC, 7, 20), cLf = it(c, 0, 0, 'F', FC, { 'font-size': 30 }), cLf2 = txt(c, 0, 0, 'PUSH ON THE CARD', { fill: FC, 'font-size': 16, 'font-weight': 600 });
const cFr = PUC.arrow(c, FC, 4, 12), cLfr = txt(c, 0, 0, 'tiny friction', { fill: FC, 'font-size': 18, 'font-weight': 600 });
const cW = PUC.arrow(c, FC, 6, 18), cLw = it(c, 0, 0, 'mg', FC, { 'font-size': 26 });
txt(c, 36, 96, 'CARD 80 mm · COIN 24 mm · GLASS 110 mm', { 'font-size': 15 });
// tau(t): 1x run, then slow-mo replay 0.05x with two freezes
const tRun = wt('C2', 'shoots') - 0.1, tSlo = T0('C3'), tFz = wt('C3', 'Freeze'), tRes = wt('C4', 'acts'), tGrav = wt('C6', 'gravity') - 0.2;
const TFZ = 0.003, SLO = 0.05;
const cTau = t => {
  if (t < tSlo - 0.05) return M.clamp(t - tRun, 0, TC + TF + 0.02);
  if (t < tFz) return M.clamp(SLO * (t - tSlo), 0, TFZ);
  if (t < tRes) return TFZ;
  if (t < tGrav) return Math.min(TC, TFZ + SLO * (t - tRes));
  return Math.min(TC + TF, TC + SLO * (t - tGrav));
};
const coinState = tau => {   // x (m, sideways), y drop (m), sideways speed
  if (tau <= TC) return { x: 0.5 * AC * tau * tau, y: 0, vx: AC * tau };
  const u = Math.min(tau - TC, TF); return { x: XCO + VCO * u, y: 0.5 * G * u * u, vx: VCO };
};
$('#cA').innerHTML = `<span class="k" style="color:${IK}">t</span><span class="v" id="c_t">0.0</span><span class="u">ms</span>
  <span class="k" style="color:${VC}">v<sub style="font-style:normal">card</sub></span><span class="v" id="c_vc" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
$('#cB').innerHTML = `<span class="k" style="color:${VC}">v<sub style="font-style:normal">coin</sub></span><span class="v" id="c_vo" style="color:${VC}">0.000</span><span class="u">m/s</span>
  <span class="k" style="color:${XC}">x<sub style="font-style:normal">coin</sub></span><span class="v" id="c_x" style="color:${XC}">0.00</span><span class="u">mm</span>`;
const cg = PUC.graph($('#cgS'), { x: 110, y: 64, w: 560, h: 156, xmax: 40, ymax: 80, xt: [0, 10, 20, 30, 40], yt: [0, 40, 80], xl: 't (ms)', yl: 'x (mm)' });
const cgCard = cg.curve(C.ink2, 4), cgCoin = cg.curve(XC), cgDc = cg.dot(C.ink2, 9), cgDo = cg.dot(XC, 10);
const cgL1 = txt($('#cgS'), 0, 0, 'card', { fill: C.ink2, 'font-size': 18, 'font-weight': 600 }), cgL2 = txt($('#cgS'), 680, cg.Y(0) - 12, 'coin', { fill: XC, 'font-size': 18, 'font-weight': 600, 'text-anchor': 'end' });
const avC = PUC.avatar($('#sI'), { x: 160 + 36, y: 270 + 488, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'The card left. The coin stayed!' });

/* ---------- M: two carts, same push (signature sim) ---------- */
const m = $('#mS'), MP = 95, MX0 = 60, LY = [270, 500], MF = 20, MM = [10, 40], MTEND = 3.0;
LY.forEach(y => mkFloor(m, y));
txt(m, 40, LY[0] - 100, 'EMPTY', { 'font-size': 18, 'font-weight': 600 }); txt(m, 40, LY[1] - 160, 'LOADED', { 'font-size': 18, 'font-weight': 600 });
const mkCart = (p, y, load, op) => { const gp = mk(p, 'g', { opacity: op }); mk(gp, 'rect', { x: 0, y: y - 64, width: 110, height: 46, rx: 6, fill: C.ink }); [22, 88].forEach(x => mk(gp, 'circle', { cx: x, cy: y - 12, r: 12, fill: C.ink2, stroke: C.ink, 'stroke-width': 2 }));
  if (load) [[6, 0], [40, 0], [74, 0], [23, 1], [57, 1]].forEach(([x, r]) => mk(gp, 'rect', { x: x, y: y - 64 - 32 * (r + 1), width: 30, height: 30, rx: 3, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2 }));
  if (op === 1) txt(gp, 55, y - 34, load ? '40 kg' : '10 kg', { fill: '#fff', 'font-size': 18, 'font-weight': 600, 'text-anchor': 'middle' });
  return gp; };
const carts = [0, 1].map(i => ({ gh: [0.12, 0.2, 0.3].map(o => mkCart(m, LY[i], i, o)), c: mkCart(m, LY[i], i, 1), f: PUC.arrow(m, FC, 7, 20), lf: it(m, 0, 0, 'F = 20 N', FC, { 'font-size': 24, 'text-anchor': 'end' }), v: PUC.arrow(m, VC, 5, 16) }));
const tPushM = wt('M3', 'Push');
const mTau = t => M.clamp(t - tPushM, 0, MTEND);
const mx = (i, tau) => { const a = MF / MM[i]; return tau < 1 ? 0.5 * a * tau * tau : 0.5 * a + a * (tau - 1); };
const mv = (i, tau) => MF / MM[i] * Math.min(tau, 1);
$('#mA').innerHTML = `<span class="k" style="color:${IK}">t</span><span class="v" id="m_t">0.00</span><span class="u">s</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="m_f" style="color:${FC}">0</span><span class="u">N</span>`;
$('#mB').innerHTML = `<span class="k" style="color:${VC}">v<sub style="font-style:normal">10 kg</sub></span><span class="v" id="m_v1" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${VC}">v<sub style="font-style:normal">40 kg</sub></span><span class="v" id="m_v2" style="color:${VC}">0.00</span><span class="u">m/s</span>`;
const mg = PUC.graph($('#mgS'), { x: 110, y: 64, w: 560, h: 156, xmax: 3, ymax: 2.5, xt: [0, 1, 2, 3], yt: [0, 0.5, 1, 1.5, 2], xl: 't (s)', yl: 'v (m/s)' });
const mc1 = mg.curve(VC), mc2 = mg.curve(VC), md1 = mg.dot(VC, 10), md2 = mg.dot(VC, 10);
[...$('#mgS').querySelectorAll('path')].slice(-1)[0].setAttribute('stroke-dasharray', '10 9');
const mL1 = txt($('#mgS'), 680, mg.Y(2) + 6, '10 kg', { fill: VC, 'font-size': 18, 'font-weight': 600 }), mL2 = txt($('#mgS'), 680, mg.Y(0.5) + 6, '40 kg', { fill: VC, 'font-size': 18, 'font-weight': 600 });
const mBr = mk($('#mgS'), 'path', { d: `M${mg.X(1.5)},${mg.Y(2)} h-10 V${mg.Y(0.5)} h10`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' });
const mBt = txt($('#mgS'), mg.X(1.5) - 18, (mg.Y(2) + mg.Y(0.5)) / 2 + 6, 'four times the mass, ¼ the change', { fill: C.ink, 'font-size': 17, 'font-weight': 600, 'text-anchor': 'end' });
const avM = PUC.avatar($('#sM'), { x: 160 + 36, y: 270 + 488, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Heavier cart, smaller change!' });

/* ---------- D: the rule + the reasoning chain ---------- */
const STEPS = [[`${Fk} = 0 \\;\\Rightarrow\\; ${dvv} = 0`, 'no force: rest stays rest, motion stays the same'],
  [`${Fk} \\neq 0 \\;\\Rightarrow\\; ${dvv} \\neq 0`, 'a force speeds it up, slows it down or turns it'],
  [`${dv} \\propto 1/m`, 'same force, same time: more mass, smaller change']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:132px"></div>` + STEPS.map(([f, w], i) => `<div class="dst" id="dst${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'No'), wt('D3', 'force'), wt('D4', 'Same')];
const LK = [['More mass', 'THE CARTS'], [`Smaller ${K(dv)}`, 'STEP 3'], ['Stronger resistance to change', 'MEANING'], ['More inertia', 'DEFINITION']];
$('#lks').innerHTML = LK.map(([a, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 98}px"><div class="ln">${i + 1}</div><span>${a}</span><span class="lt2">${tg}</span></div>`).join('') +
  [0, 1, 2].map(i => `<div class="lka" id="lka${i}" style="top:${160 + i * 98}px">${M.icon('arrowD', 22, C.mute, 2.6)}</div>`).join('');
const tLk = [wt('R1', 'More'), wt('R1', 'smaller'), wt('R2', 'stronger'), wt('R3', 'inertia')];
const th2 = PUC.think($('#th2'), { q: 'Both carts roll at 2 m/s. Which one is harder to stop?', opts: ['Empty cart', 'Loaded cart'], right: 1, why: 'More mass, more inertia: it resists stopping too.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Fk} = 0 \\;\\Rightarrow\\; ${dvv} = 0`);

/* ---------- W ---------- */
$('#wkq').innerHTML = `Same push, same time: a ${K('2\\ \\text{kg}')} trolley gains ${K(tc(VC, '3\\ \\text{m/s}'))}. What does a ${K('6\\ \\text{kg}')} trolley gain?`;
const wsol = PUC.solution($('#wl'), [
  [K(`${dv} \\propto \\dfrac{1}{m} \\;\\Rightarrow\\; \\dfrac{\\Delta ${tc(VC, 'v_2')}}{\\Delta ${tc(VC, 'v_1')}} = \\dfrac{m_1}{m_2}`)],
  [K(`\\dfrac{m_1}{m_2} = \\dfrac{2}{6} = \\dfrac{1}{3}`)],
  [K(`\\Delta ${tc(VC, 'v_2')} = \\tfrac{1}{3} \\times 3 = ${tc(VC, '1\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 112 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WB = 430, WSC = 80;    // 80 px per m/s
mk(w, 'line', { x1: 80, y1: WB, x2: 704, y2: WB, stroke: C.ink, 'stroke-width': 3 });
[0, 1, 2, 3].forEach(v => { mk(w, 'line', { x1: 72, y1: WB - v * WSC, x2: 80, y2: WB - v * WSC, stroke: C.ink, 'stroke-width': 2 }); txt(w, 64, WB - v * WSC + 6, v, { 'text-anchor': 'end' }); });
txt(w, 80, WB - 3.5 * WSC, 'Δv (m/s)', { fill: VC, 'font-weight': 600 });
const wBar = [0, 1].map(i => mk(w, 'rect', { x: 180 + i * 280, width: 140, rx: 6, fill: i ? VC : M.mix(VC, '#FFFFFF', 0.35) }));
const wBl = [0, 1].map(i => txt(w, 250 + i * 280, 0, i ? '1 m/s' : '3 m/s', { fill: VC, 'font-size': 26, 'font-weight': 600, 'text-anchor': 'middle' }));
[0, 1].forEach(i => txt(w, 250 + i * 280, WB + 40, i ? '6 kg' : '2 kg', { fill: C.ink, 'font-size': 26, 'font-weight': 600, 'text-anchor': 'middle' }));
const wTag = txt(w, 392, 500, '3 × the mass  →  ⅓ of the change', { fill: C.ink, 'font-size': 22, 'font-weight': 600, 'text-anchor': 'middle' });
const tW = [wt('W3', 'Delta'), T0('W4'), T0('W5')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A faster object has more inertia', right: 'Inertia depends only on mass, not on speed' });
const tp = $('#tpS'); mk(tp, 'line', { x1: 40, y1: 200, x2: 600, y2: 200, stroke: C.ink, 'stroke-width': 3 });
const tpB = [140, 400].map(x => mk(tp, 'circle', { cx: x, cy: 168, r: 32, fill: C.ink }));
const tpBl = [140, 400].map((x, i) => txt(tp, x, 174, '1 kg', { fill: '#fff', 'font-size': 16, 'font-weight': 600, 'text-anchor': 'middle' }));
const tpV = PUC.arrow(tp, VC, 6, 18), tpVl = it(tp, 470, 112, 'v = 50 m/s', VC, { 'font-size': 24 });
const tpR = txt(tp, 140, 244, 'AT REST', { 'font-size': 16, 'font-weight': 600, 'text-anchor': 'middle' }), tpS2 = txt(tp, 320, 60, 'SAME MASS = SAME INERTIA', { fill: C.ok, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Concept MCQs: which body has more inertia, and what Galileo\'s ramps show' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 1, optW: 968, optH: 64, optFs: 26, optY: 300,
  q: `A ball rolls down a smooth ramp and up a second smooth ramp at ${K('30^{\\circ}')}. The second ramp is lowered to ${K('15^{\\circ}')}. Compared with before, the ball now:`,
  opts: ['rises to the same height and goes about 1.9 times as far', 'rises to the same height and goes exactly 2 times as far', 'rises to half the height and goes the same distance', 'rises to half the height and goes 2 times as far'], right: 0 });
const so = PUC.solution($('#so'), [[K(`${tc(XC, 'h')}_{\\text{final}} = ${tc(XC, 'h')}`), 'no energy lost'], [K(`${tc(XC, 'd')} = \\dfrac{${tc(XC, 'h')}}{\\sin ${tc(TH, '\\theta')}}`)], [K(`\\dfrac{${tc(XC, 'd')}_{15}}{${tc(XC, 'd')}_{30}} = \\dfrac{\\sin 30^{\\circ}}{\\sin 15^{\\circ}}`)], [K(`= \\dfrac{0.5}{0.259} \\approx ${tc(C.ok, '1.93')}`)]], { y0: 100, dy: 118 });
const tSo = [T0('B2'), T0('B3'), T0('B4'), wt('B4', 'about')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: 'Recap · force and inertia', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`${Fk} = 0 \\Rightarrow ${dvv} = 0 \\qquad ${Fk} \\neq 0 \\Rightarrow ${dvv} \\neq 0 \\qquad ${dv} \\propto \\dfrac{1}{m}`),
    `<b style="color:${FC}">Force</b>: a push or a pull · changes motion or shape · unit N · vector`,
    '<b>Inertia</b>: resistance to change of rest or uniform motion',
    '<b>Mass</b> measures inertia (speed does not) · steady motion needs no force'] });
const YQ = ['Why does the coin drop into the glass when the card is flicked?', 'Why is a loaded cart harder to stop than an empty one?', 'What did Galileo\'s flat ramp show about Aristotle\'s idea?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 51', topic: 'Does a moving ball ever stop by itself? Newton\'s First Law', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tFz - 0.2, 1.06, 960, 540], [T0('C5'), 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const u = $('#pmU'), v = $('#pmV'); v.style.left = (36 + u.offsetWidth + 16) + 'px'; }

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
    JOBS.forEach((_, i) => vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    jsA.forEach((el, k) => { const r = k < 5 ? 0 : k < 9 ? 1 : 2; M.hide(el, t < tMorph + 0.6 + r * 0.35 + (k % 5) * 0.1); });
    vis($('#hjP'), t, wt('H2', 'What') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    $('#wq1').style.background = mix(C.soft, C.ac2, M.io((t - tTile[2]) / 0.3));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tA2 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('A2');
    vis($('#pq'), t, T0('P3') - 0.1, out, { dx: -60, dy: 0, ...o });
    MT.forEach((_, k) => vis($('#mt' + k), t, tMt[k] - 0.1, 1e9, POP));
    vis($('#mtP'), t, tMt[5] + 0.6, 1e9, POP);
    vis($('#pm'), t, tP1 + 0.1, out, { dx: 60, dy: 0, ...o });
    const bx = pBx(t); attr(pBox, 'x', bx.toFixed(1));
    pGh.forEach((gh, k) => { const gx = pBx(t - 0.1 * (k + 1)); attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = Math.abs(bx - gx) > 3 ? [0.3, 0.2, 0.12][k] : 0; });
    vis(pBox, t, tP1 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const up = M.o3((t - tPush + 0.1) / 0.4) * (1 - M.io((t - tPull + 0.1) / 0.3)); pPush.set(bx - 10 - 110 * up, PFY - 55, bx - 10, PFY - 55); attr(pLp, 'x', (bx - 65).toFixed(1)); pLp.style.opacity = up.toFixed(3);
    const ul = M.o3((t - tPull + 0.1) / 0.4); attr(pRope, 'x1', bx + 140); attr(pRope, 'x2', bx + 140 + 60 * ul); M.hide(pRope, ul < 0.01);
    pPull.set(bx + 200, PFY - 55, bx + 200 + 110 * ul, PFY - 55); attr(pLl, 'x', (bx + 255).toFixed(1)); pLl.style.opacity = ul.toFixed(3);
    attr(pF, 'x', (bx + 70).toFixed(1)); vis(pF, t, wt('P4', 'newtons') - 0.1, 1e9, { dy: 8 });
    vis($('#pmU'), t, wt('P4', 'newtons'), 1e9, POP); vis($('#pmV'), t, wt('P4', 'vector') - 0.1, 1e9, POP);
  }

  /* A */
  const aOn = t >= tA2 - 0.1 && t < tG2 + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = OUT('G2');
    vis($('#ar'), t, tA2 + 0.05, out, { dx: -60, dy: 0, ...o }); M.rise($('#arQ'), t, wt('A2', 'moving') - 0.1, { st: 0.04 });
    vis($('#ga'), t, wt('A4', 'Galileo') - 0.1, out, { dx: -60, dy: 0, ...o }); M.rise($('#gaQ'), t, wt('A4', 'What') - 0.05, { st: 0.05 });
    vis($('#bk'), t, T0('A3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const bx = bX(t - tCoast); setBike(bike, bx);
    bGh.forEach((gb, k) => { const gx = bX(t - tCoast - 0.12 * (k + 1)); setBike(gb, gx); M.hide(gb.g, !(Math.abs(bx - gx) > 3)); });
    const uf = M.o3((t - tSlowing + 0.1) / 0.45);
    bFr.set(bx + 150, BY - 4, bx + 150 - 90 * uf, BY - 4); attr(bLf, 'x', (bx + 150 - 100).toFixed(1)); attr(bLf, 'y', BY + 40); bLf.style.opacity = uf.toFixed(3);
    bAir.set(bx + 240 + 80 * uf, BY - 150, bx + 240, BY - 150); attr(bLa, 'x', (bx + 260).toFixed(1)); attr(bLa, 'y', BY - 170); bLa.style.opacity = uf.toFixed(3);
    vis($('#bkP'), t, wt('A3', 'slows') - 0.1, 1e9, POP);
  }

  /* G */
  const gOnS = t >= tG2 - 0.1 && t < tT + 0.1; M.hide($('#sG'), !gOnS);
  if (gOnS) {
    const out = 1e9;
    vis($('#gsim'), t, tG2 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#gro'), t, tG2 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#exG'), t, tG2 + 0.6, 1e9, { dy: 8 });
    vis($('#ggr'), t, tG2 + 0.4, out, { dy: 36, ...o }); vis($('#gfl'), t, tG2 + 0.6, 1e9, { ...POP, sc: 0.8 });
    const th = thTr(t), sn = Math.sin(th * D2R), cs = Math.cos(th * D2R), L = (XE - XB) / cs, YE = FY - L * sn;
    attr(gR2, 'd', `M${XB},${FY} L${XE.toFixed(1)},${YE.toFixed(1)}`); attr(gR2f, 'd', `M${XB},${FY} L${XE.toFixed(1)},${YE.toFixed(1)} L${XE},${FY} Z`);
    const ar = 80; attr(gArc, 'd', th > 0.5 ? `M${XB + ar},${FY} A${ar},${ar} 0 0 0 ${(XB + ar * cs).toFixed(1)},${(FY - ar * sn).toFixed(1)}` : ''); attr(gThl, 'x', XB + ar + 10); attr(gThl, 'y', FY - 14); gThl.style.opacity = th > 3 ? 1 : M.clamp(th / 3);
    vis(gH, t, wt('G3', 'same') - 0.2, 1e9, { dy: 0 }); vis(gHl, t, wt('G3', 'same'), 1e9, { dy: 6 });
    const k = runAt(t), rotating = ROT.some(([, tt], j) => t > tt - 0.05 && t < RUNS[j + 1][1]);
    const tau = k >= 0 ? t - RUNS[k][1] : 0, thR = k >= 0 ? RUNS[k][0] : 30, st = rstate(thR, tau), [X, Y, h] = rpos(thR, st);
    const ballOn = !rotating && k >= 0 ? M.io((t - RUNS[k][1] + 0.15) / 0.15) : (k < 0 ? M.io((t - tG2 - 0.3) / 0.2) : 0);
    attr(gBall, 'cx', X.toFixed(1)); attr(gBall, 'cy', Y.toFixed(1)); gBall.style.opacity = ballOn.toFixed(3); M.hide(gBall, ballOn < 0.01);
    gGh.forEach((gh, j) => { const q = tau - 0.07 * (j + 1); if (q <= 0 || ballOn < 1) { gh.style.opacity = 0; return; } const [gx, gy] = rpos(thR, rstate(thR, q)); attr(gh, 'cx', gx.toFixed(1)); attr(gh, 'cy', gy.toFixed(1)); gh.style.opacity = Math.hypot(gx - X, gy - Y) > 4 ? [0.3, 0.2, 0.12][j] : 0; });
    // velocity arrow along the track
    const dir = st.seg === 1 ? [Math.cos(30 * D2R) * (st.v >= 0 ? 1 : -1), Math.sin(30 * D2R)] : [cs, -sn];
    const going = (() => { const s2 = rstate(thR, tau + 0.01); const [x2, y2] = rpos(thR, s2); const L2 = Math.hypot(x2 - X, y2 - Y); return L2 > 0.01 ? [(x2 - X) / L2, (y2 - Y) / L2] : dir; })();
    const vl = Math.abs(st.v) * 30 * (ballOn >= 1 ? 1 : 0); gV.set(X, Y, X + going[0] * vl, Y + going[1] * vl);
    // highest point reached on ramp 2 for this run
    const dmax = thR > 0 ? H0 / Math.sin(thR * D2R) : Infinity;
    const showMk = k >= 0 && thR > 0 && !rotating && tau > T1r + VB / a2(thR) - 0.02;
    if (thR > 0) { attr(gMark, 'cx', (XB + dmax * Math.cos(thR * D2R) * S).toFixed(1)); attr(gMark, 'cy', YA); attr(gDl, 'x', (XB + dmax * Math.cos(thR * D2R) * S).toFixed(1)); attr(gDl, 'y', YA - 40); M.setT(gDl, 'd₂ = ' + f2(dmax) + ' m'); }
    M.hide(gMark, !showMk); M.hide(gDl, !showMk);
    vis(gOn, t, wt('G7', 'on') - 0.1, 1e9, { dy: 0, dx: -12 });
    gStb.forEach((sb, j) => M.hide(sb, !(k === 3 && !rotating && tau > T1r + 0.2 * (j + 1)))); M.hide(gStl, !(k === 3 && !rotating && tau > T1r + 0.5));
    // readout (exact)
    M.setT($('#g_th'), Math.round(th) + '°'); M.setT($('#g_h'), f2(k >= 0 && ballOn > 0 ? h : H0));
    M.setT($('#g_hm'), thR > 0 ? '0.50' : '0.00'); M.setT($('#g_d'), thR > 0 ? f2(dmax) : 'no end'); M.hide($('#g_du'), thR <= 0);
    // graph: current run live, earlier runs stay as ghosts
    const sp = (thh, q) => [q, Math.abs(rstate(thh, q).v)];
    if (k >= 0 && !rotating) { const e = Math.min(tau, 4); gCur(q => sp(thR, q), 0, e, 120); gDot(e, Math.abs(rstate(thR, e).v), true); } else { gCur(q => [0, 0], 0, 0); gDot(0, 0, false); }
    for (let j = 0; j < 3; j++) { const kk = j; const path = gGhP[j]; if (k > kk) { const e = Math.min(4, RUNS[kk + 1][1] - RUNS[kk][1] - 0.8); gGhC[j](q => sp(RUNS[kk][0], q), 0, e, 120); path.style.opacity = 0.22; } else gGhC[j](q => [0, 0], 0, 0); }
    gTags.forEach((tg, j) => { const show = k === j && !rotating; if (show) { const e = Math.min(tau, 4); attr(tg, 'x', (gg.X(e) + 12).toFixed(1)); attr(tg, 'y', (gg.Y(Math.abs(rstate(RUNS[j][0], e).v)) - 10).toFixed(1)); } M.hide(tg, !show); });
    vis(gFlat, t, wt('G7', 'graph') - 0.1, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Motion') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'change') + 0.1, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tI1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    vis($('#ka'), t, tK1 + 0.3, out, { dx: -60, dy: 0, ...o }); vis($('#kg'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    [[0, kAx, kA0, kA1], [1, kGx, kG0, kG0 + kGp]].forEach(([i, fx, p0, p1]) => { const B = kBlk[i], x = fx(t); attr(B.b, 'x', x.toFixed(1));
      B.gh.forEach((gh, j) => { const gx = fx(t - 0.1 * (j + 1)); attr(gh, 'x', gx.toFixed(1)); gh.style.opacity = Math.abs(x - gx) > 3 ? [0.3, 0.2, 0.12][j] : 0; });
      const uf = M.o3((t - p0 + 0.15) / 0.3) * (1 - M.io((t - p1) / 0.15)); B.f.set(x - 10 - 100 * uf, KY - 50, x - 10, KY - 50); attr(B.lf, 'x', (x - 70).toFixed(1)); attr(B.lf, 'y', KY - 72); B.lf.style.opacity = uf.toFixed(3);
      const ufr = i === 1 ? M.o3((t - kGf + 0.1) / 0.3) * (1 - M.io((t - kGf - kGd) / 0.2)) : 0; B.fr.set(x + 55, KY - 6, x + 55 - 80 * ufr, KY - 6); attr(B.lfr, 'x', (x + 30).toFixed(1)); attr(B.lfr, 'y', KY + 44); B.lfr.style.opacity = ufr.toFixed(3); });
    const xs = kAx(t) + 55; attr(kXx, 'd', `M${xs - 26},${KY - 176} l52,52 M${xs + 26},${KY - 176} l-52,52`); M.draw(kXx, t, kA1 + 0.5, 0.35); vis(kAt, t, kA1 + 0.6, 1e9, { dy: 6 });
    vis(kGt, t, kG0 + kGp + 0.3, 1e9, { dy: 6 }); kGt.textContent = t > kGf ? 'FRICTION: A FORCE THAT SLOWS IT' : 'NO PUSH: SAME SPEED'; kGt.setAttribute('fill', t > kGf ? FC : VC);
    vis($('#kaP'), t, kA1 + 0.3, 1e9, POP); vis($('#kgP'), t, wt('K2', 'friction') + 0.3, 1e9, POP);
    vis($('#th1'), t, tK3 + 0.05, OUT('I1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Less') });
  }

  /* I: inertia definition, then the coin sim */
  const iOn = t >= tI1 - 0.1 && t < tM1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = OUT('M1');
    vis($('#idf'), t, tI1 + 0.05, OUT('C2'), { dy: 36, ...o });
    M.rise($('#idT'), t, tI1 + 0.35, { st: 0.06, sp: M.HEAVY });
    vis(iBox, t, tIr - 0.2, 1e9, { dy: 0, fade: 0.2 }); vis(iTg0, t, tIr + 0.1, 1e9, { dy: 6 });
    const ix = iX(t); attr(iBall, 'cx', ix.toFixed(1)); vis(iBall, t, tIm - 0.3, 1e9, { dy: 0, fade: 0.2 });
    iGh.forEach((gh, j) => { attr(gh, 'cx', iX(t - 0.12 * (j + 1)).toFixed(1)); gh.style.opacity = t > tIm ? [0.3, 0.2, 0.12][j] : 0; });
    const uv = M.o3((t - tIm) / 0.4); iV.set(ix + 36, 410, ix + 36 + 90 * uv, 410); attr(iVl, 'x', (ix + 70).toFixed(1)); iVl.style.opacity = uv.toFixed(3);
    vis(iTg1, t, wt('I3', 'same') - 0.1, 1e9, { dy: 6 }); vis($('#idP'), t, wt('I3', 'way') - 0.2, 1e9, POP);
    // coin sim
    vis($('#csim'), t, tC2 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#cro'), t, tC2 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#exC'), t, tC2 + 0.6, 1e9, { dy: 8 });
    vis($('#cgr'), t, tC2 + 0.4, out, { dy: 36, ...o });
    const tau = cTau(t), cs = coinState(tau), cardX = CX0 - 120 + VCARD * tau * 1000 * PXM;
    attr(card, 'x', cardX.toFixed(1));
    const cx = CX0 + cs.x * 1000 * PXM, cy = CARD_Y - 8 - 14 + cs.y * 1000 * PXM;
    attr(coin, 'x', (cx - 36).toFixed(1)); attr(coin, 'y', cy.toFixed(1));
    const falling = tau > TC && ((t > tSlo && t > tGrav) || (t < tSlo));
    cGh.forEach((gh, j) => { const q = coinState(Math.max(0, tau - (t < tSlo ? 0.012 : 0.012) * (j + 1))); const gy = CARD_Y - 22 + q.y * 1000 * PXM; attr(gh, 'x', (CX0 + q.x * 1000 * PXM - 36).toFixed(1)); attr(gh, 'y', gy.toFixed(1)); gh.style.opacity = falling && t > tGrav && Math.abs(gy - cy) > 3 ? [0.3, 0.2, 0.12][j] : 0; });
    vis($('#csmo'), t, tSlo + 0.05, T0('M1') - 0.4, { ...POP, sc: 0.8 });
    // forces in the replay
    const uF = M.o3((t - wt('C3', 'force') + 0.1) / 0.4) * (t > tSlo ? 1 : 0) * (1 - M.io((t - tRes - 0.4) / 0.3));
    cF.set(cardX - 130 * uF - 8, CARD_Y - 4, cardX - 8, CARD_Y - 4); attr(cLf, 'x', (cardX - 70).toFixed(1)); attr(cLf, 'y', CARD_Y - 22); cLf.style.opacity = uF.toFixed(3);
    attr(cLf2, 'x', (cardX - 150).toFixed(1)); attr(cLf2, 'y', CARD_Y + 30); cLf2.style.opacity = uF.toFixed(3);
    const uFr = M.o3((t - wt('C4', 'tiny') + 0.1) / 0.3) * (tau < TC + 1e-6 ? 1 : 0) * (t > tSlo ? 1 : 0); cFr.set(cx, cy - 10, cx + 40 * uFr, cy - 10); attr(cLfr, 'x', (cx + 48).toFixed(1)); attr(cLfr, 'y', cy - 4); cLfr.style.opacity = uFr.toFixed(3);
    const uW = M.o3((t - tGrav) / 0.35) * (t > tSlo ? 1 : 0); cW.set(cx, cy + 16, cx, cy + 16 + 70 * uW); attr(cLw, 'x', (cx + 12).toFixed(1)); attr(cLw, 'y', (cy + 70).toFixed(1)); cLw.style.opacity = uW.toFixed(3);
    // readout: round the time first, compute the rest from it
    const tr = Math.round(tau * 1e4) / 1e4, cr = coinState(tr);
    M.setT($('#c_t'), f1(tr * 1000)); M.setT($('#c_vc'), tr > 0 ? f2(VCARD) : '0.00'); M.setT($('#c_vo'), f3(cr.vx)); M.setT($('#c_x'), f2(cr.x * 1000));
    const e = Math.min(tau * 1000, 40);
    cgCard(q => [q, Math.min(80, 2 * q)], 0, Math.min(e, 40)); cgCoin(q => [q, coinState(q / 1000).x * 1000], 0, e); cgDc(Math.min(e, 40), Math.min(80, 2 * e), e > 0); cgDo(e, coinState(e / 1000).x * 1000, t > tRun - 0.1);
    attr(cgL1, 'x', cg.X(Math.min(e, 40)) - 60); attr(cgL1, 'y', cg.Y(Math.min(80, 2 * e)) - 4); M.hide(cgL1, e < 12); vis(cgL2, t, wt('C5', 'coin', 1) - 0.1, 1e9, { dy: 6 });
    avC(t, wt('C6', 'place') + 0.1, out);
  }

  /* M: two carts */
  const mOn = t >= tM1 - 0.1 && t < tD1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('D1');
    vis($('#msim'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#mro'), t, tM1 + 0.25, out, { dx: 60, dy: 0, ...o }); vis($('#exM'), t, tM1 + 0.6, 1e9, { dy: 8 });
    vis($('#mgr'), t, tM1 + 0.4, out, { dy: 36, ...o });
    const tau = mTau(t), tr = Math.round(tau * 100) / 100;
    carts.forEach((cc, i) => { const x = MX0 + mx(i, tau) * MP; cc.c.setAttribute('transform', `translate(${x.toFixed(1)},0)`); { const op = M.clamp((t - wt('M2', i ? 'loaded' : 'empty') + 0.1) / 0.25); cc.c.style.opacity = op.toFixed(3); M.hide(cc.c, op < 0.01); }
      cc.gh.forEach((gh, j) => { const gx = MX0 + mx(i, Math.max(0, tau - 0.12 * (j + 1))) * MP; gh.setAttribute('transform', `translate(${gx.toFixed(1)},0)`); gh.style.opacity = tau > 0 && tau < MTEND && x - gx > 3 ? [0.3, 0.2, 0.12][j] : 0; });
      const uf = (tau > 0 && tau < 1 ? 1 : 0) * M.o3((t - tPushM + 0.2) / 0.2); cc.f.set(x - 8 - 90 * uf, LY[i] - 41, x - 8, LY[i] - 41); attr(cc.lf, 'x', (x - 12).toFixed(1)); attr(cc.lf, 'y', LY[i] - 74); cc.lf.style.opacity = uf.toFixed(3);
      const vv = mv(i, tau) * 30; cc.v.set(x + 116, LY[i] - 41, x + 116 + vv, LY[i] - 41); });
    vis($('#mfl'), t, tPushM + MTEND, 1e9, { ...POP, sc: 0.8 });
    M.setT($('#m_t'), f2(tr)); M.setT($('#m_f'), tr > 0 && tr < 1 ? '20' : '0');
    M.setT($('#m_v1'), f2(mv(0, tr))); M.setT($('#m_v2'), f2(mv(1, tr)));
    mc1(q => [q, mv(0, q)], 0, tau); mc2(q => [q, mv(1, q)], 0, tau); md1(tau, mv(0, tau), tau > 0); md2(tau, mv(1, tau), tau > 0);
    vis(mL1, t, tPushM + 1.2, 1e9, { dy: 6 }); vis(mL2, t, tPushM + 1.3, 1e9, { dy: 6 });
    $('#m_v1').style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('M4', 'empty')) / 0.3) * (1 - M.io((t - wt('M4', 'loaded')) / 0.3)));
    $('#m_v2').style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('M4', 'loaded')) / 0.3) * (1 - M.io((t - T0('M6')) / 0.3)));
    M.draw(mBr, t, wt('M6', 'Four') - 0.1, 0.4); vis(mBt, t, wt('M6', 'Four'), 1e9, { dy: 6 });
    avM(t, wt('M6', 'quarter') + 0.3, out);
  }

  /* D: rule + reasoning + think 2 */
  const dOn = t >= tD1 - 0.1 && t < tW1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L3');
    vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 240], [tStep[2] - 0.1, 396]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    vis($('#dr'), t, T0('R1') - 0.1, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, i === 3 ? C.ac2 : C.soft, M.io((t - tLk[3]) / 0.3)); });
    [0, 1, 2].forEach(i => vis($('#lka' + i), t, tLk[i + 1] - 0.2, 1e9, { dy: -8 }));
    vis($('#drP'), t, wt('R3', 'measure') - 0.1, 1e9, POP);
    vis($('#th2'), t, tL3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tL3, tOpts: wt('L3', 'Which') - 0.1, tCount: T1('L3') + 0.05, dur: 3, tAns: T0('L4') - 0.02, tWhy: wt('L4', 'More') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const h0 = 3 * WSC * M.o3((t - wt('W2', 'gains') + 0.1) / 0.6), h1 = 1 * WSC * M.o3((t - wt('W5', 'one') + 0.1) / 0.6);
    attr(wBar[0], 'y', (WB - h0).toFixed(1)); attr(wBar[0], 'height', h0.toFixed(1)); attr(wBar[1], 'y', (WB - h1).toFixed(1)); attr(wBar[1], 'height', h1.toFixed(1));
    M.hide(wBar[0], h0 < 1); M.hide(wBar[1], h1 < 1);
    attr(wBl[0], 'y', WB - 3 * WSC - 14); wBl[0].style.opacity = M.clamp(h0 / (3 * WSC)); attr(wBl[1], 'y', WB - WSC - 14); wBl[1].style.opacity = M.clamp(h1 / WSC);
    vis(wTag, t, wt('W5', 'Three') - 0.1, 1e9, { dy: 6 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'faster') - 0.2, tStrike: wt('X3', 'only') - 0.2, tRight: wt('X3', 'mass') });
    const uv = M.o3((t - wt('X3', 'fifty') + 0.1) / 0.4); tpV.set(436, 168, 436 + 130 * uv, 168); tpVl.style.opacity = uv.toFixed(3);
    vis(tpR, t, wt('X3', 'rest') - 0.1, 1e9, { dy: 6 }); vis(tpS2, t, wt('X3', 'second') + 0.2, 1e9, { dy: 6 });
    tpB.forEach((bb, i) => vis(bb, t, wt('X3', 'ball') - 0.1 + i * 0.15, 1e9, { dy: 0, fade: 0.2 })); tpBl.forEach((bb, i) => vis(bb, t, wt('X3', 'ball') + i * 0.15, 1e9, { dy: 0 }));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'concept') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'ball'), tCount, tAns });
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
