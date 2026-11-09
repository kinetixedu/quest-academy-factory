// PUC Physics Ep 82: Potential energy of a spring (Motion notebook, an 8 kg block on a k = 200 N/m spring + force against stretch with the area shaded)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, FC = C.orange, EC = C.teal, DC = C.violet, MC = C.ink, RC = C.red;   // v blue, forces orange, energy teal, stretch x violet, mass/k ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const kK = tx(MC, 'k'), xK = tx(DC, 'x'), FK = tx(FC, 'F'), UK = tx(EC, 'U'), WK = tx(EC, 'W'), vK = tx(VC, 'v'), mK = tx(MC, 'm');
const KS = 200, MS = 8, W0 = Math.sqrt(KS / MS), A0 = 0.2;      // omega = 5 rad/s
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1), f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2), f3 = v => (Math.abs(v) < 0.0005 ? 0 : v).toFixed(3);
const flab = (p, b, giver, col = FC, fs = 26) => { const a = sym(p, 0, 0, b, '', col, fs); const g = txt(p, 0, 0, giver, { 'font-size': 16, fill: col, 'font-weight': 600 }); return (x, y, op) => { attr(a, 'x', x.toFixed(1)); attr(a, 'y', y.toFixed(1)); attr(g, 'x', x.toFixed(1)); attr(g, 'y', (y + 20).toFixed(1)); a.style.opacity = g.style.opacity = M.clamp(op).toFixed(3); }; };
const at = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const bar = (p, x, y0, w, col) => { const r = mk(p, 'rect', { x, width: w, rx: 5, fill: col }); return h => { h = Math.max(0, h); attr(r, 'height', h.toFixed(1)); attr(r, 'y', (y0 - h).toFixed(1)); }; };
// a spring drawn as a zigzag from x1 to x2 at height y (n coils)
const spring = (p, col = C.ink2, sw = 3) => { const e = mk(p, 'path', { fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linejoin': 'round' }); return (x1, x2, y, amp = 16, n = 12) => {
  const L = x2 - x1, lead = Math.min(16, L * 0.1); let d = `M${x1.toFixed(1)},${y} L${(x1 + lead).toFixed(1)},${y}`; for (let i = 0; i < n; i++) { const xa = x1 + lead + (L - 2 * lead) * (i + 0.5) / n; d += ` L${xa.toFixed(1)},${(y + (i % 2 ? amp : -amp)).toFixed(1)}`; }
  d += ` L${(x2 - lead).toFixed(1)},${y} L${x2.toFixed(1)},${y}`; attr(e, 'd', d); }; };
const wall = (p, x, y1, y2) => { mk(p, 'line', { x1: x, y1, x2: x, y2, stroke: MC, 'stroke-width': 4 }); for (let y = y1 + 6; y < y2; y += 18) mk(p, 'line', { x1: x, y1: y, x2: x - 12, y2: y + 12, stroke: MC, 'stroke-width': 2 }); };

Object.assign(M.IC, {
  pen: ['M4 20l3-1 11-11-2-2L5 17l-1 3Z', 'M14 6l2-2 4 4-2 2'],
  sofa: ['M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3', 'M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2z', 'M5 18v2', 'M19 18v2'],
  coil: ['M4 12c2-6 4 6 6 0s4 6 6 0 4 6 4 0'],
  arrowsLR: ['M3 12h18', 'm7 8-4 4 4 4', 'm17 8 4 4-4 4'],
  twice: ['M4 18h4', 'M4 12h10', 'M4 6h16'],
  store: ['M4 20h16', 'M6 20V9l6-5 6 5v11', 'M10 20v-6h4v6'],
  gun: ['M3 9h14l3 2v2H3z', 'M8 13v5h3l1-5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tC1 = T0('C1'), tC4 = T0('C4'), tC6 = T0('C6');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['pen', 'A spring in a pen', 'PRESS IT · IT PUSHES BACK', 'pen'], ['sofa', 'Sofa springs', 'SIT DOWN · THEY PUSH UP', 'sofa']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${570 + i * 420}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
const ROWS = [['pen', 'A spring in a pen', 'PRESS IT · IT PUSHES BACK'], ['sofa', 'Sofa springs', 'SIT DOWN · THEY PUSH UP'], ['coil', 'A squeezed spring can do work', 'SO IT STORES ENERGY']];
$('#jrs').innerHTML = ROWS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, i === 2 ? EC : C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>${i < 2 ? `<svg width="220" height="120" id="jrS${i}"></svg>` : ''}</div>`).join('');
const tRow = [wt('H1', 'pen'), wt('H1', 'sofa'), T0('H2')];
const jr0 = $('#jrS0'), jr1 = $('#jrS1');
wall(jr0, 24, 40, 84); const jsp0 = spring(jr0, C.ink2, 2.5), jbk0 = mk(jr0, 'rect', { y: 46, width: 30, height: 32, rx: 4, fill: '#fff', stroke: MC, 'stroke-width': 2.5 });
mk(jr1, 'rect', { x: 20, y: 98, width: 180, height: 10, fill: '#8A6A43' }); const jsp1 = [0, 1, 2].map(() => mk(jr1, 'path', { fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 })), jcu = mk(jr1, 'rect', { x: 26, width: 168, height: 16, rx: 6, fill: '#E4572E' });
const TILES = [['coil', 'Ball in: spring shorter', C.ac], ['gun', 'Trigger: ball shoots out', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'pushes'), wt('H4', 'trigger')];
const ho = $('#hoS');
mk(ho, 'rect', { x: 0, y: 330, width: 712, height: 60, fill: '#E6DCC8' });
mk(ho, 'rect', { x: 30, y: 180, width: 230, height: 50, rx: 10, fill: '#3E9B5F', stroke: MC, 'stroke-width': 3 }); mk(ho, 'rect', { x: 60, y: 226, width: 40, height: 70, rx: 8, fill: '#2E7A4A', stroke: MC, 'stroke-width': 3 });
mk(ho, 'rect', { x: 44, y: 192, width: 206, height: 26, rx: 6, fill: '#EAF6EE', stroke: MC, 'stroke-width': 2 });
const hoSp = spring(ho, C.ink2, 2.5), hoBall = mk(ho, 'circle', { r: 11, fill: '#E8A317', stroke: MC, 'stroke-width': 2 });
const hoGh = [0.3, 0.2, 0.12].map(op => mk(ho, 'circle', { r: 11, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const tLoad = wt('H3', 'pushes') - 0.1, tFire = wt('H4', 'trigger') + 0.25;
const hoBx = t => { const c = M.io((t - tLoad) / 0.9); if (t < tFire) return 240 - 120 * c; const τ = t - tFire; return τ < 0.06 ? 120 + 120 * τ / 0.06 : Math.min(240 + (τ - 0.06) * 900, 820); };

/* ---------- P: stretch it, feel the pull ---------- */
$('#dr0I').innerHTML = M.icon('arrowsLR', 32, FC, 2.4); $('#dr1I').innerHTML = M.icon('twice', 32, FC, 2.4); $('#dr2I').innerHTML = M.icon('store', 32, EC, 2.2);
const pt = $('#ptS'), PY = 400, PX0 = 360, PPX = 900;          // block rest at x 360, 900 px per metre
wall(pt, 60, 330, 440); mk(pt, 'rect', { x: 50, y: 440, width: 690, height: 6, fill: '#B8BCC6' });
mk(pt, 'line', { x1: PX0, y1: 460, x2: PX0, y2: 330, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6' }); txt(pt, PX0, 480, 'normal length', { 'font-size': 15, 'text-anchor': 'middle' });
const pSp = spring(pt), pB = mk(pt, 'g', {}); mk(pB, 'rect', { x: 0, y: -40, width: 80, height: 80, rx: 6, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 });
const pF = PUC.arrow(pt, FC, 6, 17), pFl = flab(pt, 'F', 'spring'), pX = PUC.arrow(pt, DC, 4, 12), pXl = sym(pt, 0, 0, 'x', '', DC, 26);
const pFv = txt(pt, 0, 0, '', { 'font-size': 20, fill: FC, 'font-weight': 600, 'text-anchor': 'middle' });
// x(t): 0 -> 0.1 m (P2) -> 0.2 m (P3), then a squeeze to -0.1 m to show the push back
const pxOf = t => 0.1 * M.io((t - T0('P2') - 0.3) / 0.8) + 0.1 * M.io((t - T0('P3') - 0.2) / 0.8) - 0.3 * M.io((t - T0('P4') - 0.4) / 1.0) + 0.1 * M.io((t - T0('P5')) / 0.8);

/* ---------- S: the sim ---------- */
const s = $('#simS'), SY = 300, SX0 = 380, SPX = 1000, BW = 90;     // 1000 px per metre: 10 cm = 100 px
wall(s, 60, 230, 360); mk(s, 'rect', { x: 50, y: 360, width: 700, height: 8, fill: '#B8BCC6' });
mk(s, 'line', { x1: SX0, y1: 380, x2: SX0, y2: 220, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
mk(s, 'line', { x1: SX0 - 220, y1: 430, x2: SX0 + 220, y2: 430, stroke: DC, 'stroke-width': 2.5 });
[-20, -10, 0, 10, 20].forEach(c => { const x = SX0 + c * 10; mk(s, 'line', { x1: x, y1: 422, x2: x, y2: 438, stroke: DC, 'stroke-width': 2.5 }); txt(s, x, 462, `${c} cm`, { 'font-size': 16, fill: DC, 'font-weight': 600, 'text-anchor': 'middle' }); });
const sSp = spring(s), sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'rect', { y: SY - 50, width: BW, height: 100, rx: 6, fill: 'none', stroke: MC, 'stroke-width': 2, opacity: op }));
const sB = mk(s, 'g', {}); mk(sB, 'rect', { x: 0, y: SY - 50, width: BW, height: 100, rx: 6, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 }); txt(sB, BW / 2, SY + 7, '8 kg', { 'font-size': 18, fill: MC, 'font-weight': 600, 'text-anchor': 'middle' });
const sHand = mk(s, 'g', {}); mk(sHand, 'circle', { cx: 0, cy: 0, r: 13, fill: '#F2B37A', stroke: MC, 'stroke-width': 2 });
const sF = PUC.arrow(s, FC, 7, 20), sFl = flab(s, 'F', 'spring'), sP = PUC.arrow(s, FC, 7, 20), sPl = flab(s, 'F', 'your pull');
const sV = PUC.arrow(s, VC, 6, 17), sVl = sym(s, 0, 0, 'v', '', VC, 26), sX = PUC.arrow(s, DC, 4, 12), sXl = sym(s, 0, 0, 'x', '', DC, 24);
$('#roG').innerHTML = `<span class="k" style="color:${DC}">x</span><span class="v" id="r0" style="color:${DC}">0.000</span><span class="u">m · stretch</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r1" style="color:${FC}">0.0</span><span class="u">N · spring, -kx</span>
  <span class="k" style="color:${EC}">U</span><span class="v" id="r2" style="color:${EC}">0.00</span><span class="u">J · ½kx²</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r3" style="color:${VC}">0.00</span><span class="u">m/s · speed</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 0.4, ymin: -40, ymax: 40, xt: [], yt: [-40, 0, 40], xl: 'x (m)' });
gr.xlab.setAttribute('y', 78 + 140 + 56); gr.xlab.setAttribute('fill', DC);
[-0.2, -0.1, 0, 0.1, 0.2].forEach(v => { gr.mk('line', { x1: gr.X(v + 0.2), y1: 218, x2: gr.X(v + 0.2), y2: 226, stroke: MC, 'stroke-width': 2 }); const t2 = gr.mk('text', { x: gr.X(v + 0.2), y: 250, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }); t2.textContent = v; });
gr.mk('line', { x1: gr.X(0.2), y1: 78, x2: gr.X(0.2), y2: 218, stroke: MC, 'stroke-width': 1.5, opacity: 0.35 });
txt($('#grS'), 96, 66, 'N', { 'text-anchor': 'end', fill: FC });
const gTri = gr.mk('path', { d: '', fill: M.rgba(EC, 0.28), stroke: 'none' });
const gLine = gr.curve(FC, 4), gDot = gr.dot(FC, 10);
const gArea = gr.mk('text', { 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: EC, 'font-weight': 700, 'text-anchor': 'middle' });
// clock: slow pulls to 0.1 m and 0.2 m (held), let go, real motion x = 0.2 cos(5 t); replay at 0.25x through the middle
const tP1a = wt('S2', 'Pull') + 0.2, tP2a = wt('S3', 'Pull') + 0.2, tGo = wt('S6', 'let') + 0.15, tRep = T0('S7'), tRepGo = tRep + 0.5;
const τMid = Math.PI / (2 * W0) * 5;                                   // the 3rd pass through the middle (t = 5 pi / 10)
const R0 = τMid - 0.25, tFreeze = tRepGo + 0.25 / 0.25, tResume = Math.max(wt('S8', 'speed'), tFreeze + 1.6);
const τAt = t => { if (t < tGo) return -1; if (t < tRep) return t - tGo; if (t < tFreeze) return R0 + 0.25 * Math.max(0, t - tRepGo); if (t < tResume) return τMid; return τMid + 0.25 * (t - tResume); };
const xPull = t => 0.1 * M.io((t - tP1a) / 1.4) + 0.1 * M.io((t - tP2a) / 1.4);
const xOf = t => { const τ = τAt(t); if (τ === τMid) return 0; return τ < 0 ? Math.round(xPull(t) * 1000) / 1000 : A0 * Math.cos(W0 * Math.round(τ * 100) / 100); };

/* ---------- D ---------- */
const STEPS = [[`${FK}_{\\text{you}} = ${kK}${xK}`, 'pull slowly: just match the spring'],
  [`0 \\;\\to\\; ${kK}${xK}`, 'the force grows: not simply force × distance'],
  [`${WK} = \\text{area under } ${FK}\\text{ vs } ${xK}`, 'a triangle: base x, height kx'],
  [`${WK} = \\tfrac12 \\times ${xK} \\times ${kK}${xK} = \\tfrac12 ${kK}${xK}^2`, 'half base times height'],
  [`${UK} = \\tfrac12 ${kK}${xK}^2`, 'stored: the same for a stretch or a squeeze']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'one'), wt('D3', 'two'), wt('D4', 'three'), wt('D5', 'four'), wt('D6', 'five')];
const dr = $('#drS'), DX0 = 120, DY0 = 470, DXm = 520, DYm = 340;       // axes: x to 640, F up to 130
mk(dr, 'path', { d: `M${DX0},110 V${DY0} H${DX0 + DXm + 60}`, fill: 'none', stroke: MC, 'stroke-width': 3, 'stroke-linecap': 'round' });
sym(dr, DX0 + DXm + 70, DY0 + 8, 'x', '', DC, 28); sym(dr, DX0 - 34, 120, 'F', '', FC, 28);
const dTri = mk(dr, 'path', { d: `M${DX0},${DY0} L${DX0 + DXm},${DY0} L${DX0 + DXm},${DY0 - DYm} Z`, fill: M.rgba(EC, 0.28), stroke: 'none' });
const dLn = mk(dr, 'line', { x1: DX0, y1: DY0, x2: DX0 + DXm, y2: DY0 - DYm, stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dBase = mk(dr, 'line', { x1: DX0, y1: DY0 + 26, x2: DX0 + DXm, y2: DY0 + 26, stroke: DC, 'stroke-width': 3 }), dBl = sym(dr, DX0 + DXm / 2, DY0 + 60, 'x', '', DC, 28);
const dHt = mk(dr, 'line', { x1: DX0 + DXm + 26, y1: DY0, x2: DX0 + DXm + 26, y2: DY0 - DYm, stroke: FC, 'stroke-width': 3 }), dHl = sym(dr, DX0 + DXm + 36, DY0 - DYm / 2, 'kx', '', FC, 28);
const dRect = mk(dr, 'rect', { x: DX0, y: DY0 - DYm, width: DXm, height: DYm, fill: 'none', stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const dAr = txt(dr, DX0 + DXm * 0.66, DY0 - DYm * 0.22, '', { 'font-size': 24, fill: EC, 'font-weight': 700, 'text-anchor': 'middle' });

$('#stF').innerHTML = K(`${UK} = \\tfrac12 ${kK}${xK}^2`);

/* ---------- R: x, then 2x: four triangles ---------- */
const rl = $('#rlS'), RX0 = 110, RY0 = 470, RU = 260;       // one unit triangle: base 260 px, height 180 px; big: 520 x 360
mk(rl, 'path', { d: `M${RX0},90 V${RY0} H${RX0 + 2 * RU + 70}`, fill: 'none', stroke: MC, 'stroke-width': 3 });
const rTri = [[0, 0, 1], [1, 0, 1], [1, 1, 1], [1, 0, -1]].map(([i, j, up]) => { const x0 = RX0 + i * RU, y0 = RY0 - j * 180;
  const d = up > 0 ? `M${x0},${y0} L${x0 + RU},${y0} L${x0 + RU},${y0 - 180} Z` : `M${x0},${y0} L${x0},${y0 - 180} L${x0 + RU},${y0 - 180} Z`;
  return mk(rl, 'path', { d, fill: M.rgba(EC, 0.3), stroke: EC, 'stroke-width': 2.5 }); });
const rLn = mk(rl, 'line', { x1: RX0, y1: RY0, x2: RX0 + 2 * RU, y2: RY0 - 360, stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
txt(rl, RX0 + RU, RY0 + 34, 'x', { 'font-size': 22, fill: DC, 'font-weight': 700, 'text-anchor': 'middle' }); txt(rl, RX0 + 2 * RU, RY0 + 34, '2x', { 'font-size': 22, fill: DC, 'font-weight': 700, 'text-anchor': 'middle' });
const rFl = [txt(rl, RX0 + RU + 14, RY0 - 190, 'kx', { 'font-size': 22, fill: FC, 'font-weight': 700 }), txt(rl, RX0 + 2 * RU + 14, RY0 - 360, '2kx', { 'font-size': 22, fill: FC, 'font-weight': 700 })];
const rCount = [0, 1, 2, 3].map(i => txt(rl, 0, 0, String(i + 1), { 'font-size': 26, fill: EC, 'font-weight': 700, 'text-anchor': 'middle' }));
[[RX0 + RU * 0.7, RY0 - 50], [RX0 + RU * 1.7, RY0 - 50], [RX0 + RU * 1.7, RY0 - 230], [RX0 + RU * 1.3, RY0 - 130]].forEach(([x, y], i) => { attr(rCount[i], 'x', x); attr(rCount[i], 'y', y); });
const LK = [['Double the stretch: the final force doubles'], ['The distance you pull also doubles'], ['Twice as wide, twice as tall: 4 times the area'], [`2x: 4 × U · 3x: 9 × U`]];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492 - 92, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Squeeze my gun twice as far: four times the shot!' });

/* ---------- C ---------- */
const sbs = (p, xm) => {
  wall(p, 60, 120, 230); mk(p, 'rect', { x: 50, y: 230, width: 640, height: 6, fill: '#B8BCC6' });
  const x0 = 330; mk(p, 'line', { x1: x0, y1: 100, x2: x0, y2: 250, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6' });
  const sp = spring(p), b = mk(p, 'g', {}); mk(b, 'rect', { x: 0, y: 130, width: 80, height: 100, rx: 6, fill: '#FFF8E7', stroke: MC, 'stroke-width': 3 });
  const xa = PUC.arrow(p, DC, 4, 12), xl = txt(p, 0, 290, '', { 'font-size': 20, fill: DC, 'font-weight': 600, 'text-anchor': 'middle' }), fa = PUC.arrow(p, FC, 6, 16);
  const ub = bar(p, 620, 220, 40, EC); mk(p, 'rect', { x: 616, y: 80, width: 48, height: 144, rx: 6, fill: 'none', stroke: C.line, 'stroke-width': 2 }); sym(p, 640, 70, 'U', '', EC, 24, { 'text-anchor': 'middle' });
  return { x0, xm, sp, b, xa, xl, fa, ub };
};
const c0P = sbs($('#c0S'), 0.1), c1P = sbs($('#c1S'), -0.1);
$('#c0a').innerHTML = K(`${UK} = \\tfrac12 (200)(0.1)^2 = ${tx(EC, '1\\,\\text{J}')}`); $('#c1a').innerHTML = K(`${UK} = \\tfrac12 (200)(-0.1)^2 = ${tx(EC, '1\\,\\text{J}')}`);
const th1 = PUC.think($('#th1'), { q: 'Spring A is stiff (k = 400 N/m), spring B is soft (k = 100 N/m). Same pull on both. Which stores more energy?', opts: ['Stiff A', 'Soft B', 'The same'], right: 1,
  why: 'x = F/k, so U = F²/2k. Smaller k, more energy.' });
const th2 = PUC.think($('#th2'), { q: 'Is the spring force a conservative force?', opts: ['Yes', 'No'], right: 0,
  why: 'Stretch and release: its round trip work is zero.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${xK} = 5\\,\\text{cm} = 0.05\\,\\text{m},\\; ${mK} = 0.02\\,\\text{kg}`)],
  [K(`${UK} = \\tfrac12 (400)(0.05)^2 = ${tx(EC, '0.5\\,\\text{J}')}`)],
  [K(`\\tfrac12 (0.02)\\,${vK}^2 = 0.5`), 'all of U becomes K'],
  [K(`${vK}^2 = 50 \\;\\Rightarrow\\; ${vK} \\approx ${tx(VC, '7.07\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 92 });
const w = $('#wrS');
mk(w, 'rect', { x: 60, y: 220, width: 420, height: 90, rx: 14, fill: '#3E9B5F', stroke: MC, 'stroke-width': 3 }); mk(w, 'rect', { x: 110, y: 304, width: 60, height: 110, rx: 10, fill: '#2E7A4A', stroke: MC, 'stroke-width': 3 });
mk(w, 'rect', { x: 80, y: 238, width: 390, height: 54, rx: 8, fill: '#EAF6EE', stroke: MC, 'stroke-width': 2 });
const wSp = spring(w, C.ink2, 3), wBall = mk(w, 'circle', { r: 20, fill: '#E8A317', stroke: MC, 'stroke-width': 2.5 }), wV = PUC.arrow(w, VC, 6, 17), wVl = sym(w, 0, 0, 'v', '', VC, 26);
const wX = PUC.arrow(w, DC, 4, 12), wXl = txt(w, 0, 0, 'squeezed 5 cm', { 'font-size': 18, fill: DC, 'font-weight': 600, 'text-anchor': 'middle' });
const tW = [wt('W3', 'First'), wt('W4', 'Stored'), wt('W5', 'All'), wt('W6', 'So')], tShot = wt('W5', 'All') + 0.4;

/* ---------- exam ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Work to stretch = force × stretch = kx · x', right: 'The force grows from 0: W = ½kx², with x in metres' });
const tg = $('#tg');
mk(tg, 'path', { d: 'M60,40 V230 H390', fill: 'none', stroke: MC, 'stroke-width': 2.5 });
const tgR = mk(tg, 'rect', { x: 60, y: 70, width: 280, height: 160, fill: M.rgba(RC, 0.12), stroke: RC, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const tgT = mk(tg, 'path', { d: 'M60,230 L340,230 L340,70 Z', fill: M.rgba(EC, 0.3), stroke: EC, 'stroke-width': 2.5 }); mk(tg, 'line', { x1: 60, y1: 230, x2: 340, y2: 70, stroke: FC, 'stroke-width': 4 });
const tgL1 = txt(tg, 120, 100, 'kx · x', { 'font-size': 18, fill: RC, 'font-weight': 700 }), tgL2 = txt(tg, 260, 200, '½kx²', { 'font-size': 20, fill: EC, 'font-weight': 700 });
const where = PUC.where($('#wa'), { on: [], type: 'Spring numericals: a block hits a spring, or the work between two stretches' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A spring (<i>k</i> = 800 N/m) is already stretched by 5 cm. How much more work is needed to stretch it to 10 cm?', qW: 780,
  opts: ['3 J', '1 J', '4 J', '2 J'], right: 0, optY: 300, optFs: 32 });
const so = PUC.solution($('#so'), [[K(`${UK}_{10} = \\tfrac12 (800)(0.1)^2 = 4\\,\\text{J}`)], [K(`${UK}_{5} = \\tfrac12 (800)(0.05)^2 = 1\\,\\text{J}`)],
  [K(`${WK} = 4 - 1 = 3\\,\\text{J} \\Rightarrow \\textbf{A}`)], [K(`\\text{not } \\tfrac12 (800)(0.05)^2`), 'the stretch does not start at 0']], { y0: 100, dy: 110 });
const tSo = [wt('A2', 'ten'), wt('A3', 'five'), wt('A4', 'extra'), wt('A4', 'Three')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · potential energy of a spring (NCERT writes it as V)', y0: 92, dy: 80, txt: [0, 1, 1, 1, 1],
  lines: [K(`${FK} = -${kK}${xK} \\qquad ${UK} = \\tfrac12 ${kK}${xK}^2 \\qquad ${WK}_{1 \\to 2} = \\tfrac12 ${kK}\\,(${xK}_2^{\\,2} - ${xK}_1^{\\,2})`),
    '<b>Work = area under the <i>F</i>-<i>x</i> graph</b>: a triangle, not a rectangle',
    '<b>Stretch or squeeze by <i>x</i></b>: the same energy. Always put <i>x</i> in metres',
    '<b>Double <i>x</i></b>: 4 times <i>U</i>. Same force: the softer spring stores more',
    '<b>At the normal length</b>: <i>F</i> = 0, <i>U</i> = 0, the speed is largest'] });
const YQ = ['Why is the energy ½kx², and not kx²?', 'Double the stretch. What happens to the stored energy?', 'Does a squeezed spring store energy too?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT', topic: 'Why does the water not fall out? Motion in a Vertical Circle', y: 764 });

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
    const u = t - tMorph, c = 0.5 + 0.5 * Math.cos(3 * u), bx = 110 + 60 * c; jsp0(24, bx, 62, 10, 8); attr(jbk0, 'x', bx.toFixed(1));
    const sq = 18 + 14 * (0.5 + 0.5 * Math.cos(2.4 * u)); [50, 110, 170].forEach((x, i) => { let d = `M${x},98`; for (let k = 1; k <= 6; k++) d += ` L${x + (k % 2 ? 10 : -10)},${(98 - sq * k / 6).toFixed(1)}`; attr(jsp1[i], 'd', d); }); attr(jcu, 'y', (98 - sq - 16).toFixed(1));
    M.vis($('#hjP'), t, T0('H2') + 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#house'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#aaravC'), t, tH3 + 0.4, 1e9, { dy: 30, sp: M.SOFT });
    const bxh = hoBx(t), inside = bxh <= 240; hoSp(48, Math.min(bxh, 240) - 11, 205, 9, 10); attr(hoBall, 'cx', bxh.toFixed(1)); attr(hoBall, 'cy', inside ? 205 : (205 + Math.max(0, bxh - 240) * 0.05).toFixed(1));
    hoGh.forEach((g, j) => { const x2 = hoBx(t - 0.03 * (j + 1)); attr(g, 'cx', x2.toFixed(1)); attr(g, 'cy', (x2 <= 240 ? 205 : 205 + (x2 - 240) * 0.05).toFixed(1)); M.hide(g, t < tFire || Math.abs(x2 - bxh) < 3); });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr0'), t, T0('P2') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, T0('P3') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr2'), t, T0('P5') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, wt('P4', 'spring') - 0.1, 1e9, POP);
    M.vis($('#pt'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#hooke'), t, wt('P4', 'Hooke') - 0.1, 1e9, { dy: 16 });
    const xm = pxOf(t), bx = PX0 + xm * PPX; pSp(60, bx, PY, 14, 12); at(pB, bx, PY);
    const Fs = -KS * xm, len = Fs * 1.8, g = M.o3((t - T0('P2') - 0.2) / 0.4), ax = xm >= 0 ? bx : bx + 80;
    if (Math.abs(len) > 3 && g > 0.01) { pF.set(xm >= 0 ? bx - 4 : bx + 84, PY - 64, (xm >= 0 ? bx - 4 : bx + 84) + len * g, PY - 64); pFl((xm >= 0 ? bx - 4 : bx + 84) + len * 0.5 - 10, PY - 80, g); } else { pF.set(0, 0, 0, 0); pFl(0, 0, 0); }
    if (Math.abs(xm) > 0.005) { pX.set(PX0, PY + 70, bx, PY + 70); attr(pXl, 'x', ((PX0 + bx) / 2 - 8).toFixed(1)); attr(pXl, 'y', PY + 100); pXl.style.opacity = '1'; } else { pX.set(0, 0, 0, 0); pXl.style.opacity = '0'; }
    M.setT(pFv, `F = ${f1(Fs)} N`); attr(pFv, 'x', (bx + 40).toFixed(1)); attr(pFv, 'y', PY - 110); pFv.style.opacity = g.toFixed(3);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const τ = τAt(t), x = xOf(t), τr = Math.round(τ * 100) / 100, moving = τ >= 0, v = moving ? (τ === τMid ? A0 * W0 : Math.abs(A0 * W0 * Math.sin(W0 * τr))) : 0, vs = moving ? (τ === τMid ? -A0 * W0 : -A0 * W0 * Math.sin(W0 * τr)) : 0;
    const bl = SX0 + x * SPX; sSp(60, bl, SY, 22, 14); at(sB, bl - SX0 + 0, 0); attr(sB, 'transform', `translate(${(bl).toFixed(1)},0)`);
    sGh.forEach((g, j) => { const x2 = xOf(t - (t >= tRep ? 0.24 : 0.05) * (j + 1)), b2 = SX0 + x2 * SPX; attr(g, 'x', b2.toFixed(1)); M.hide(g, !moving || Math.abs(b2 - bl) < 4 || (t >= tRep && t - 0.24 * (j + 1) < tRepGo)); });
    const Fs = -KS * x, U = 0.5 * KS * x * x, kF = 3.2;
    // spring force on the block (towards the middle); while pulling, your equal and opposite pull from the hand
    if (Math.abs(Fs) > 0.3) { const x0 = Fs < 0 ? bl - 4 : bl + BW + 4; sF.set(x0, SY - 80, x0 + Fs * kF, SY - 80); sFl(x0 + Fs * kF * 0.5 - 10, SY - 96, 1); } else { sF.set(0, 0, 0, 0); sFl(0, 0, 0); }
    const pulling = !moving && x > 0.002; M.hide(sHand, !pulling); at(sHand, bl + BW + 14, SY);
    if (pulling) { sP.set(bl + BW + 30, SY, bl + BW + 30 - Fs * kF, SY); sPl(bl + BW + 40, SY + 44, 1); } else { sP.set(0, 0, 0, 0); sPl(0, 0, 0); }
    if (v > 0.03) { const x0 = bl + BW / 2; sV.set(x0, SY - 64 + 130 + 30, x0 + vs * 120, SY - 64 + 130 + 30); attr(sVl, 'x', (x0 + vs * 60 - 6).toFixed(1)); attr(sVl, 'y', SY + 84); sVl.style.opacity = '1'; } else { sV.set(0, 0, 0, 0); sVl.style.opacity = '0'; }
    if (Math.abs(x) > 0.004) { sX.set(SX0, 400, bl, 400); attr(sXl, 'x', ((SX0 + bl) / 2 - 6).toFixed(1)); attr(sXl, 'y', 392); sXl.style.opacity = '1'; } else { sX.set(0, 0, 0, 0); sXl.style.opacity = '0'; }
    M.setT($('#r0'), f3(x)); M.setT($('#r1'), f1(Fs)); M.setT($('#r2'), f2(U)); M.setT($('#r3'), f2(v));
    // graph: your pull kx against x; triangle from 0 to x = U
    const xmax = moving ? A0 : xPull(t); gLine(u2 => [u2 + 0.2, KS * u2], moving ? -A0 : 0, Math.max(xmax, 0.0001), 20); gDot(x + 0.2, KS * x, t > tS1 + 0.6);
    attr(gTri, 'd', Math.abs(x) > 0.001 ? `M${gr.X(0.2)},${gr.Y(0)} L${gr.X(x + 0.2)},${gr.Y(0)} L${gr.X(x + 0.2)},${gr.Y(KS * x)} Z` : '');
    gTri.style.opacity = M.o3((t - wt('S4', 'area') + 0.1) / 0.4).toFixed(3);
    M.setT(gArea, `U = ${f2(U)} J`); attr(gArea, 'x', (gr.X(0.2 + x * 0.66)).toFixed(1)); attr(gArea, 'y', (x >= 0 ? gr.Y(-12) : gr.Y(12)).toFixed(1)); gArea.style.opacity = (Math.abs(x) > 0.03 ? M.o3((t - wt('S4', 'area')) / 0.4) : 0).toFixed(3);
    M.vis($('#grP'), t, wt('S5', 'area') - 0.1, 1e9, POP);
    M.vis($('#slo'), t, tRep - 0.1, out, POP); M.hide($('#pau'), !(t >= tFreeze && t < tResume));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    M.draw(dLn, t, tStep[0] + 0.2, 1.0);
    const rr = M.clamp((t - tStep[1] - 0.3) / 0.4) * (1 - M.clamp((t - tStep[2]) / 0.4)); dRect.style.opacity = rr.toFixed(3);
    dTri.style.opacity = M.o3((t - tStep[2]) / 0.6).toFixed(3);
    const gb = M.o3((t - tStep[2] - 0.6) / 0.5); dBase.style.opacity = dBl.style.opacity = dHt.style.opacity = dHl.style.opacity = gb.toFixed(3);
    M.setT(dAr, t > tStep[3] ? '½ · x · kx' : 'area = W'); dAr.style.opacity = M.o3((t - tStep[2] - 0.8) / 0.4).toFixed(3);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'stores') - 0.2, 0.8);
    M.rise($('#st2'), t, wt('T1', 'spring') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tC1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('C1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5'))) / 0.3))); });
    M.vis($('#rrP'), t, wt('R5', 'nine') + 0.3, 1e9, POP);
    M.draw(rLn, t, tR1 + 0.4, 0.8);
    rTri.forEach((p, i) => { p.style.opacity = M.o3((t - (i === 0 ? tR1 + 0.8 : tLk[2] + 0.3 + (i - 1) * 0.45)) / 0.35).toFixed(3); });
    rCount.forEach((c, i) => { c.style.opacity = M.o3((t - (i === 0 ? tLk[2] : tLk[2] + 0.3 + (i - 1) * 0.45)) / 0.3).toFixed(3); });
    rFl[0].style.opacity = M.o3((t - tR1 - 0.8) / 0.3).toFixed(3); rFl[1].style.opacity = M.o3((t - tLk[0] - 0.3) / 0.3).toFixed(3);
    avR(t, wt('R5', 'nine') + 1.0, out);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tW1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    const run = (q, t0) => { const u = M.io((t - t0) / 1.0), xm = q.xm * u, bx = q.x0 + xm * 1500; q.sp(60, bx, 180, 16, 12); attr(q.b, 'transform', `translate(${bx.toFixed(1)},0)`);
      if (Math.abs(xm) > 0.004) { q.xa.set(q.x0, 260, bx, 260); M.setT(q.xl, `x = ${(xm).toFixed(2)} m`); attr(q.xl, 'x', ((q.x0 + bx) / 2).toFixed(1)); q.xl.style.opacity = '1';
        const F = -KS * xm, x0 = F < 0 ? bx - 4 : bx + 84; q.fa.set(x0, 110, x0 + F * 2.4, 110); } else { q.xa.set(0, 0, 0, 0); q.xl.style.opacity = '0'; q.fa.set(0, 0, 0, 0); }
      q.ub(130 * u); };
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); run(c0P, wt('C2', 'Stretch')); PUC.write($('#c0a'), t, wt('C2', 'One') - 0.3, 0.8);
    M.vis($('#c1'), t, T0('C3') - 0.3, out, { dx: 60, dy: 0, ...o }); run(c1P, wt('C3', 'Squeeze')); PUC.write($('#c1a'), t, wt('C3', 'One') - 0.3, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('C6'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Which') - 0.3, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'U') });
    M.vis($('#th2'), t, tC6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tC6, tOpts: wt('C6', 'Is'), tCount: T1('C6') + 0.05, dur: 3, tAns: T0('C7') - 0.02, tWhy: wt('C7', 'Stretch') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    // the spring (normal length 300 px) squeezed by 5 cm, drawn 4x larger: 200 px; then the shot
    const sq = M.io((t - wt('W2', 'squeezes')) / 0.8), fired = t > tShot, τ = t - tShot;
    const end = fired ? Math.min(380, 180 + Math.min(1, τ / 0.12) * 200) : 380 - 200 * sq;
    wSp(84, end, 265, 14, 12); const bx = fired ? Math.max(end + 20, 400 + τ * 700) : end + 20; attr(wBall, 'cx', Math.min(bx, 900).toFixed(1)); attr(wBall, 'cy', 265);
    if (fired && bx < 760) { wV.set(bx + 26, 265, bx + 26 + 80, 265); attr(wVl, 'x', (bx + 56).toFixed(1)); attr(wVl, 'y', 246); wVl.style.opacity = '1'; } else { wV.set(0, 0, 0, 0); wVl.style.opacity = '0'; }
    if (sq > 0.02 && !fired) { wX.set(380, 340, end, 340); attr(wXl, 'x', ((380 + end) / 2).toFixed(1)); attr(wXl, 'y', 372); wXl.style.opacity = '1'; } else { wX.set(0, 0, 0, 0); wXl.style.opacity = '0'; }
    M.vis($('#wc0'), t, tW[1] + 1.4, 1e9, POP); M.vis($('#wc1'), t, tW[3] + 1.2, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Use') - 0.2 });
    const gr2 = M.o3((t - wt('X2', 'force')) / 0.4); tgR.style.opacity = tgL1.style.opacity = (gr2 * (1 - 0.6 * M.clamp((t - wt('X3', 'Use')) / 0.4))).toFixed(3);
    const gt = M.o3((t - wt('X3', 'triangle')) / 0.4); tgT.style.opacity = tgL2.style.opacity = gt.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'spring') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
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
