// PUC Physics Ep 84: Power (Motion notebook, two climbers on one staircase + work against time, crane, hill, lift)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, FC = C.orange, WC = C.teal, PC = C.violet, TH = C.gold;   // v blue, force orange, work teal, power violet, theta gold
const DIYA = '#8D99AE';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const PK = tx(PC, 'P'), WK = tx(WC, 'W'), FK = tx(FC, 'F'), vK = tx(VC, 'v'), thK = tx(TH, '\\theta');
const at = (el, x, y) => { attr(el, 'x', x.toFixed(1)); attr(el, 'y', y.toFixed(1)); };
const op = (el, v) => { el.style.opacity = M.clamp(v).toFixed(3); };
const G = 9.8, PI = Math.PI;
// a climber: a face disc with an initial (wrapped group, moved by transform only)
const climber = (p, letter, col, r = 18, hollow = false) => { const g = mk(p, 'g', {});
  mk(g, 'circle', { r, fill: hollow ? '#fff' : col, stroke: col, 'stroke-width': 3 });
  const t = mk(g, 'text', { x: 0, y: r * 0.36, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': r * 1.05, fill: hollow ? col : '#fff' }); t.textContent = letter; return g; };
const place = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
const stairs = (p, x0, y0, x1, y1, n, a = {}) => { let d = `M${x0},${y0}`; const dx = (x1 - x0) / n, dy = (y1 - y0) / n; for (let i = 0; i < n; i++) d += ` v${dy.toFixed(2)} h${dx.toFixed(2)}`; return mk(p, 'path', Object.assign({ d, fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, a)); };

Object.assign(M.IC, {
  drop: ['M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z'],
  crane: ['M4 21V5h10', 'M4 9l6-4', 'M14 5v6', 'M12 11h4v3h-4z', 'M2 21h6'],
  stairs: ['M3 20h5v-4h4v-4h4V8h5'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-.01', 'M18.5 17.5a3.5 3.5 0 1 0 0-.01', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10 12 17.5h3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tK1 = T0('K1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + hook ---------- */
const JOBS = [['drop', 'Water pump', 'FILLS A ROOF TANK', 'pump'], ['crane', 'Crane', 'LIFTS STEEL', 'crane'], ['stairs', 'You', 'CLIMB THE STAIRS', 'climb']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}"><span class="ww" id="jtw${i}">does work</span></div></div>`).join('');
const TILES = [['stairs', 'Diya: 10 s', C.ink2], ['stairs', 'Aarav: 5 s', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Diya'), wt('H4', 'Aarav')];
const hs = $('#hsS'); stairs(hs, 30, 214, 196, 74, 10); mk(hs, 'line', { x1: 196, y1: 74, x2: 236, y2: 74, stroke: C.ink, 'stroke-width': 3 });
const hkD = climber(hs, 'D', DIYA, 11, true), hkA = climber(hs, 'A', C.ink, 11);
const hRace = wt('H3', 'race'), hPos = (u, off) => { u = M.clamp(u); return [36 + 166 * u + off, 214 - 140 * u - 13]; };

/* ---------- P ---------- */
const CK = [[`${WK} = ${FK} \\times d`, 'WORK · FORCE × DISTANCE'], [`${PK} = ${WK} / t`, 'POWER · WORK ÷ TIME'], [`\\text{same } ${WK},\\ \\text{less } t \\;\\Rightarrow\\; \\text{more } ${PK}`, 'THE IDEA']];
$('#cks').innerHTML = CK.map(([f, tg], i) => `<div class="ck" id="ck${i}" style="top:${84 + i * 134}px"><div class="cf">${K(f)}</div><div class="ct">${tg}</div></div>`).join('') +
  [0, 1].map(i => `<div class="dn" id="dn${i}" style="top:${186 + i * 134}px">&darr;</div>`).join('');
const tCk = [wt('P2', 'Work'), wt('P3', 'Power'), wt('P4', 'Same')];
const JR = [['1 W', 'ONE JOULE EVERY SECOND', 1], ['2 W', 'TWO JOULES EVERY SECOND', 2]];
$('#jrows').innerHTML = JR.map(([l, s2, n], i) => `<div class="jrow" id="jrw${i}" style="top:${84 + i * 186}px"><div class="jl pp">${l}</div><div class="js">${s2}</div><div class="jc" id="jc${i}">0 J</div>${Array.from({ length: 4 * n }, (_, k) => `<div class="blk" id="bk${i}_${k}" style="left:${24 + k * 34}px;top:96px"></div>`).join('')}</div>`).join('');
const tJ0 = wt('P5', 'watt') + 0.2;

/* ---------- S: the staircase ---------- */
const S = $('#simS'), SX0 = 80, SY0 = 470, SX1 = 540, SY1 = 150, NST = 20, PXM = (SY0 - SY1) / 3;   // 3 m drawn 360 px
mk(S, 'path', { d: (() => { let d = `M${SX0},${SY0}`; const dx = (SX1 - SX0) / NST, dy = (SY1 - SY0) / NST; for (let i = 0; i < NST; i++) d += ` v${dy.toFixed(2)} h${dx.toFixed(2)}`; return d + ` H720 V${SY0} Z`; })(), fill: '#EFECE3', stroke: 'none' });
stairs(S, SX0, SY0, SX1, SY1, NST); mk(S, 'line', { x1: SX1, y1: SY1, x2: 720, y2: SY1, stroke: C.ink, 'stroke-width': 3 }); mk(S, 'line', { x1: 40, y1: SY0, x2: SX0, y2: SY0, stroke: C.ink, 'stroke-width': 3 });
mk(S, 'path', { d: `M700,${SY0} h14 V${SY1} h-14`, fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); txt(S, 690, (SY0 + SY1) / 2 + 6, 'h = 3 m', { 'text-anchor': 'end', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
txt(S, 40, 506, 'both 50 kg · weight mg = 490 N', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const sAgh = [0.3, 0.2, 0.12].map(o2 => { const g = climber(S, 'A', C.ink, 18); g.setAttribute('opacity', o2); return g; });
const sD = climber(S, 'D', DIYA, 18, true), sA = climber(S, 'A', C.ink, 18);
const sAl = txt(S, 0, 0, 'Aarav', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }), sDl = txt(S, 0, 0, 'Diya', { 'font-size': 18, fill: DIYA, 'font-weight': 600, 'text-anchor': 'middle' });
const sF = PUC.arrow(S, FC, 7, 20), sV = PUC.arrow(S, VC, 6, 18), sVy = mk(S, 'line', { stroke: VC, 'stroke-width': 3, 'stroke-dasharray': '5 6' });
const sFl = txt(S, 0, 0, 'F = 490 N', { 'font-size': 20, fill: FC, 'font-weight': 600 }), sVl = txt(S, 0, 0, 'up 0.6 m/s', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const posAt = (h, off = 0) => { const u = h / 3; return [SX0 + (SX1 - SX0) * u + 12 + off, SY0 - PXM * h - 20 - off * 0.55]; };
$('#roG').innerHTML = `<span class="k">t</span><span class="v" id="r0">0.0</span><span class="u">s · time</span>
  <span class="k" style="color:${WC}">W<sub>A</sub></span><span class="v" id="r1" style="color:${WC}">0</span><span class="u">J · Aarav's work</span>
  <span class="k" style="color:${WC}">W<sub>D</sub></span><span class="v" id="r2" style="color:${WC}">0</span><span class="u">J · Diya's work</span>
  <span class="k" style="color:${PC}">P</span><span class="v" id="r3" style="color:${PC}">--</span><span class="u">W · Aarav · Diya</span>`;
const gr = PUC.graph($('#grS'), { x: 120, y: 86, w: 590, h: 134, xmax: 12, ymin: 0, ymax: 1600, xt: [0, 2, 4, 6, 8, 10, 12], yt: [0, 500, 1000, 1500] });
txt($('#grS'), 106, 76, 'W (J)', { 'text-anchor': 'end' }); txt($('#grS'), 710, 86 + 134 - 12, 't (s)', { 'text-anchor': 'end' });
const gD = gr.curve(M.mix(WC, '#FFFFFF', 0.45), 4), gA = gr.curve(WC, 5), gdD = gr.dot(DIYA, 9), gdA = gr.dot(C.ink, 10);
const gAl = txt($('#grS'), gr.X(0.3), gr.Y(1350), 'Aarav · 294 W', { 'font-size': 17, fill: C.ink, 'font-weight': 600 }), gDl = txt($('#grS'), gr.X(10) - 6, gr.Y(1470) - 10, 'Diya · 147 W', { 'font-size': 17, fill: DIYA, 'font-weight': 600, 'text-anchor': 'end' });
const tRace = T0('S3') - 0.4, tSlo = wt('S6', 'Slow'), tRes = tSlo + 0.6;
// race time (real seconds, rounded to 0.1 first): race until the replay, then a replay of 2.0 -> 2.5 s at 0.25x
const raceT = t => { let r; if (t < tSlo) r = t - tRace; else if (t < tRes) r = 2.0; else r = Math.min(2.5, 2.0 + (t - tRes) / 4); return Math.min(10, Math.max(0, Math.round(r * 10) / 10)); };
const raceTs = t => { if (t < tSlo) return Math.min(10, Math.max(0, t - tRace)); if (t < tRes) return 2.0; return Math.min(2.5, 2.0 + (t - tRes) / 4); };
const hA = r => 3 * Math.min(r / 5, 1), hD = r => 3 * Math.min(r / 10, 1);
const avS = PUC.avatar($('#sS'), { x: 976 + 36, y: 576 + 160, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same work as Aarav. Half the power.' });

/* ---------- D ---------- */
const STEPS = [[`${PK}_{\\text{avg}} = ${WK}/t`, 'total work over total time'],
  [`${PK} = d${WK}/dt`, 'a tiny bit of work in a tiny time'],
  [`d${WK} = \\vec{${FK}} \\cdot d\\vec r \\;\\Rightarrow\\; ${PK} = \\vec{${FK}} \\cdot d\\vec r/dt`, 'work = force dot displacement'],
  [`${PK} = \\vec{${FK}} \\cdot \\vec{${vK}} = ${FK}${vK}\\cos${thK}`, 'dr/dt is the velocity'],
  [`\\text{N} \\cdot \\text{m/s} = \\text{J/s} = \\text{W}`, 'units: the watt']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${76 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'P'), wt('D3', 'P'), wt('D4', 'So'), wt('D5', 'So'), wt('D6', 'Newtons')];
const dr = $('#drS'), FLY = 360;
mk(dr, 'line', { x1: 40, y1: FLY, x2: 744, y2: FLY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(dr, 'line', { x1: x, y1: FLY + 4, x2: x - 14, y2: FLY + 18, stroke: C.dim, 'stroke-width': 2 });
const dBoxO = mk(dr, 'g', {}), dBox = mk(dBoxO, 'rect', { x: -60, y: -90, width: 120, height: 90, rx: 10, fill: C.ink });
const dF = PUC.arrow(dr, FC, 7, 20), dV = PUC.arrow(dr, VC, 6, 18), dR = PUC.arrow(dr, PC, 5, 14);
const dArc = mk(dr, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 3 }), dThl = sym(dr, 0, 0, 'θ', '', TH, 24);
const dFl = sym(dr, 0, 0, 'F', '', FC, 28), dVl = sym(dr, 0, 0, 'v', '', VC, 28), dRl = txt(dr, 0, 0, 'dr', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 22, fill: PC });
txt(dr, 40, 430, 'F = 10 N · v = 2 m/s', { 'font-size': 20, fill: C.ink, 'font-weight': 600 }); txt(dr, 744, 430, 'EXAMPLE FIGURES', { 'font-size': 15, 'text-anchor': 'end', 'letter-spacing': 1.5 });
const dTh = M.keys([[0, 0], [wt('D5', 'cos') - 0.4, 60]], 1.6, M.io);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${PK} = \\dfrac{${WK}}{t} = \\vec{${FK}} \\cdot \\vec{${vK}}`);

/* ---------- C ---------- */
const c0 = $('#c0S'); stairs(c0, 200, 250, 480, 100, 8); mk(c0, 'line', { x1: 480, y1: 100, x2: 600, y2: 100, stroke: C.ink, 'stroke-width': 3 });
const cA = climber(c0, 'A', C.ink, 16), cD = climber(c0, 'D', DIYA, 16, true); place(cA, 520, 82); place(cD, 566, 82);
mk(c0, 'path', { d: 'M640,250 h12 V100 h-12', fill: 'none', stroke: C.ink2, 'stroke-width': 2.5 }); txt(c0, 662, 182, '3 m', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const watch = (p, x, y, lab) => { mk(p, 'circle', { cx: x, cy: y, r: 62, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); mk(p, 'rect', { x: x - 10, y: y - 80, width: 20, height: 12, rx: 3, fill: C.ink });
  const h = mk(p, 'line', { x1: x, y1: y, x2: x, y2: y - 50, stroke: PC, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(p, 'circle', { cx: x, cy: y, r: 5, fill: C.ink });
  const l = txt(p, x, y + 96, lab, { 'font-size': 22, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }); return { h, x, y }; };
const c1 = $('#c1S'), wDi = watch(c1, 230, 170, 'Diya · 10 s'), wAa = watch(c1, 530, 170, 'Aarav · 5 s');
$('#c0F').innerHTML = K(`${WK} = mgh = 490 \\times 3 = ${tx(WC, '1470\\,\\text{J}')}`);
$('#c1F').innerHTML = K(`${PK} = ${WK}/t:\\;\\; 1470/10 = 147,\\;\\; 1470/5 = ${tx(PC, '294\\,\\text{W}')}`);
const th1 = PUC.think($('#th1'), { q: 'Two cranes lift the same load to the same height. One is twice as slow. Does it do less work?', opts: ['Less work', 'The same work'], right: 1,
  why: 'W = mgh is the same. It only has less power.' });
const th2 = PUC.think($('#th2'), { q: 'A crane lifts a load at a steady speed, now twice as fast. What happens to its power?', opts: ['Stays the same', 'Doubles', 'Four times'], right: 1,
  why: 'F is still the weight, v doubles, so P = Fv doubles.' });

/* ---------- R: the hill ---------- */
const rl = $('#rlS'), RY = 330, HX = 320, HX1 = 744, HY1 = 150, HA = Math.atan2(RY - HY1, HX1 - HX);
mk(rl, 'path', { d: `M40,${RY} H${HX} L${HX1},${HY1} V${RY + 50} H40 Z`, fill: '#EFECE3' });
mk(rl, 'path', { d: `M40,${RY} H${HX} L${HX1},${HY1}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const rbO = mk(rl, 'g', {}), rb = mk(rbO, 'g', {});
mk(rb, 'circle', { cx: -16, cy: -11, r: 11, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); mk(rb, 'circle', { cx: 16, cy: -11, r: 11, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
mk(rb, 'path', { d: 'M-16,-11 L-4,-28 L12,-28 L16,-11 M-4,-28 L2,-11 L16,-11', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
const rider = climber(rb, 'A', C.ink, 13); place(rider, 0, -48);
const rF = PUC.arrow(rl, FC, 6, 17), rV = PUC.arrow(rl, VC, 6, 17);
const tHill = wt('R4', 'steep'), RPX = 4;     // 4 px per metre
const rPos = t => { const s = 6 * RPX * (t - tHill); if (s <= 0) return { x: Math.max(60, HX + s), y: RY, a: 0, onHill: false }; const d = 2 * RPX * (t - tHill); return { x: HX + d * Math.cos(HA), y: RY - d * Math.sin(HA), a: HA, onHill: true }; };
const rVel = M.keys([[0, 6], [tHill, 2]], 0.6, M.io);
const LK = [['His legs give at most a fixed <span class="pp">power</span>'], ['<i class="pp">P</i> = <i class="ff">F</i> × <i class="vv">v</i>'], ['A steep hill needs a bigger <span class="ff">force</span>'], ['Same <i class="pp">P</i>, bigger <i class="ff">F</i>: smaller <i class="vv">v</i>. He slows']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Slow uphill is my power limit!' });

/* ---------- W: the lift ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${FK} = mg + f = 7840 + 1000 = ${tx(FC, '8840\\,\\text{N}')}`)],
  [K(`${PK} = ${FK}${vK} = 8840 \\times 1.5`)],
  [K(`${PK} = 13\\,260\\,\\text{W} \\approx ${tx(PC, '13.3\\,\\text{kW}')}`)],
  [K(`1\\,\\text{hp} = 746\\,\\text{W} \\;\\Rightarrow\\; ${PK} \\approx ${tx(PC, '17.8\\,\\text{hp}')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), LX = 250, LW = 180;
mk(w, 'rect', { x: LX, y: 70, width: LW, height: 400, fill: '#F3F1EA', stroke: C.ink2, 'stroke-width': 2.5 });
mk(w, 'rect', { x: LX + LW / 2 - 40, y: 62, width: 80, height: 18, rx: 4, fill: C.ink }); txt(w, LX + LW / 2 + 52, 76, 'motor', { 'font-size': 17 });
const wCab = mk(w, 'g', {}), wCabI = mk(wCab, 'g', {});
mk(wCabI, 'rect', { x: LX + 20, y: 0, width: LW - 40, height: 110, rx: 8, fill: C.ink }); mk(wCabI, 'rect', { x: LX + 36, y: 16, width: LW - 72, height: 60, rx: 4, fill: '#3A4560' });
const wCable = mk(w, 'line', { x1: LX + LW / 2, y1: 80, x2: LX + LW / 2, stroke: C.ink, 'stroke-width': 2.5 });
const wF = PUC.arrow(w, FC, 7, 20), wG = PUC.arrow(w, FC, 7, 20), wFr = PUC.arrow(w, FC, 6, 14), wV = PUC.arrow(w, VC, 6, 17);
const wFl = txt(w, 0, 0, 'F = 8840 N', { 'font-size': 20, fill: FC, 'font-weight': 600 }), wGl = txt(w, 0, 0, 'mg = 7840 N', { 'font-size': 20, fill: FC, 'font-weight': 600 }), wFrl = txt(w, 0, 0, 'f = 1000 N', { 'font-size': 20, fill: FC, 'font-weight': 600 }), wVl = txt(w, 0, 0, 'v = 1.5 m/s', { 'font-size': 20, fill: VC, 'font-weight': 600 });
const tW = [wt('W3', 'Force'), wt('W4', 'Power'), wt('W4', 'Thirteen'), wt('W5', 'seven')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'A kilowatt hour (kWh) is a unit of power', right: 'kWh is energy: 1 kW for 1 hour = 1000 W × 3600 s = 3.6 × 10<sup>6</sup> J' });
const tg = $('#tg');
mk(tg, 'circle', { cx: 110, cy: 140, r: 54, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
const tgH = mk(tg, 'line', { x1: 110, y1: 140, x2: 110, y2: 100, stroke: PC, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(tg, 'circle', { cx: 110, cy: 140, r: 5, fill: C.ink });
txt(tg, 110, 222, '1 kW × 1 h', { 'font-size': 20, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
const tgE = txt(tg, 300, 148, '= 3.6 MJ', { 'font-size': 26, fill: WC, 'font-weight': 600, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Numericals: lifts, pumps and motors, and power from P = F · v' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 1000 kg car climbs a slope (<span style="white-space:nowrap">sin <i>θ</i> = 1/20</span>) at a steady 20 m/s. Resistance is 500 N and <i>g</i> = 10 m/s². Find the engine power.', qW: 780,
  opts: ['10 kW', '20 kW', '30 kW', '200 kW'], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{steady: } ${FK} = mg\\sin\\theta + f`)], [K(`mg\\sin\\theta = 10\\,000/20 = 500\\,\\text{N}`)],
  [K(`${FK} = 500 + 500 = 1000\\,\\text{N}`)], [K(`${PK} = ${FK}${vK} = 20\\,\\text{kW} \\Rightarrow \\textbf{B}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Steady'), wt('A3', 'Gravity'), wt('A3', 'Add'), wt('A4', 'Power')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · power', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${PK}_{\\text{avg}} = ${WK}/t \\qquad ${PK} = d${WK}/dt = \\vec{${FK}} \\cdot \\vec{${vK}} = ${FK}${vK}\\cos${thK}`),
    '<b>Unit</b>: the watt, 1 W = 1 J/s &nbsp;·&nbsp; 1 hp = 746 W',
    '<b>kWh is energy</b>, not power: 1 kWh = 3.6 × 10<sup>6</sup> J',
    '<b>Same work, less time</b> = more power'] });
const YQ = ['Who does more work, the fast climber or the slow one?', 'Why does power equal force times velocity?', 'Is a kilowatt hour a unit of power or energy?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 85', topic: 'Heat, light, sound: where does the energy go? Forms of Energy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 14 - bp.offsetWidth) + 'px'; bp.style.top = '96px'; }

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); if (!geo) measure(); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  M.vis($('#bpill'), t, tMorph + 0.62, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const fast = t >= wt('H2', 'faster') - 0.1;
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'work') - 0.1 + i * 0.1, 1e9, POP);
      const sp = $('#jtw' + i); M.setT(sp, fast ? 'how fast?' : 'does work'); sp.style.color = fast ? PC : WC;
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'faster')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'speed') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#stair'), t, hRace - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    const pa = hPos((t - hRace) / 2.5, 0), pd = hPos((t - hRace) / 5, 0);
    place(hkA, pa[0] + 8, pa[1]); place(hkD, pd[0] - 8, pd[1]);
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pc'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    CK.forEach((_, i) => { const el = $('#ck' + i); M.vis(el, t, tCk[i] - 0.15, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, i === 2 ? C.ac2 : C.soft, M.io((t - tCk[i]) / 0.3)); });
    [0, 1].forEach(i => M.vis($('#dn' + i), t, tCk[i + 1] - 0.3, 1e9, { dy: -10 }));
    M.vis($('#pu'), t, T0('P5') - 0.15, out, { dx: 60, dy: 0, ...o });
    const sec = Math.max(0, t - tJ0), n = Math.min(4, Math.floor(sec)) ;
    JR.forEach(([, , k], i) => { M.vis($('#jrw' + i), t, T0('P5') + 0.1 + i * 0.15, 1e9, { dy: 16 });
      for (let b = 0; b < 4 * k; b++) M.vis($('#bk' + i + '_' + b), t, tJ0 + 1 + Math.floor(b / k) - 0.05 + (b % k) * 0.08, 1e9, { dy: -14, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.setT($('#jc' + i), `${n * k} J`); });
    M.vis($('#puT'), t, tJ0 - 0.1, 1e9, POP); M.setT($('#puTv'), String(n));
  }

  /* S: the race */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#exS'), t, tS1 + 0.4, tSlo - 0.1, { dy: 8, outDur: 0.15 }); M.vis($('#slo'), t, tSlo - 0.05, out, POP);
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const rs = raceTs(t), r = raceT(t), pa = posAt(hA(rs)), pd = posAt(hD(rs), 26);
    place(sA, pa[0], pa[1]); place(sD, pd[0], pd[1]);
    at(sAl, pa[0], pa[1] - 28); at(sDl, pd[0] + 10, pd[1] + 40);
    sAgh.forEach((g, k) => { const t2 = t - (t > tRes ? 0.3 : 0.12) * (k + 1), h2 = hA(raceTs(t2)), q = posAt(h2); place(g, q[0], q[1]); M.hide(g, (t > tSlo && t < tRes + 0.2) || Math.abs(h2 - hA(rs)) < 0.04); });
    // slow-mo: F up (orange), v along the stairs (blue) with its upward part dashed
    const slo = t > tRes - 0.1 && t < out, gf = M.o3((t - wt('S7', 'pushes') + 0.1) / 0.5) * (slo ? 1 : 0), gv = M.o3((t - wt('S7', 'rising') + 0.1) / 0.5) * (slo ? 1 : 0);
    if (gf > 0.01) sF.set(pa[0] - 34, pa[1] + 4, pa[0] - 34, pa[1] + 4 - 110 * gf); else sF.set(0, 0, 0, 0); at(sFl, pa[0] - 160, pa[1] - 70); op(sFl, gf);
    const ux = (SX1 - SX0), uy = (SY1 - SY0), L = Math.hypot(ux, uy), vl = 120 * gv;
    if (gv > 0.01) { sV.set(pa[0] + 22, pa[1], pa[0] + 22 + ux / L * vl, pa[1] + uy / L * vl); attr(sVy, 'x1', (pa[0] + 22 + ux / L * vl).toFixed(1)); attr(sVy, 'x2', (pa[0] + 22 + ux / L * vl).toFixed(1)); attr(sVy, 'y1', pa[1].toFixed(1)); attr(sVy, 'y2', (pa[1] + uy / L * vl).toFixed(1)); } else sV.set(0, 0, 0, 0);
    op(sVy, gv); at(sVl, pa[0] + 22 + ux / L * 120 + 12, pa[1] + uy / L * 60); op(sVl, gv);
    M.vis($('#pfv'), t, wt('S7', 'Multiply') - 0.1, 1e9, POP);
    // readout + graph
    const WA = 490 * hA(r), WD = 490 * hD(r), started = t >= tRace;
    M.setT($('#r0'), r.toFixed(1)); M.setT($('#r1'), WA.toFixed(0)); M.setT($('#r2'), WD.toFixed(0)); M.setT($('#r3'), started && r > 0 ? '294 · 147' : '--');
    const hi = M.io((t - wt('S4', 'power') + 0.1) / 0.3) * (1 - M.io((t - T0('S5')) / 0.3)); $('#r3').style.background = mix('#FFFFFF', '#EEE7FC', hi);
    const ce = t >= tSlo ? 10 : rs; gA(s2 => [s2, 490 * hA(s2)], 0, ce); gD(s2 => [s2, 490 * hD(s2)], 0, ce);
    gdA(Math.min(rs, 12), 490 * hA(rs), t > tS1 + 0.8); gdD(Math.min(rs, 12), 490 * hD(rs), t > tS1 + 0.8);
    op(gAl, M.clamp((t - (tRace + 5)) / 0.3)); op(gDl, M.clamp((t - (tRace + 10)) / 0.3));
    M.vis($('#grP'), t, wt('S5', 'steeper') - 0.1, 1e9, POP);
    avS(t, wt('S7', 'again') + 0.2, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(76, tStep.slice(1).map((tt, i) => [tt - 0.1, 76 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const bx = 170 + 9 * Math.max(0, t - tD1), th = Math.round(dTh(t)), thr = th * PI / 180;
    attr(dBoxO, 'transform', `translate(${bx.toFixed(1)},${FLY})`);
    const fx0 = bx + 60, fy0 = FLY - 45, FL = 150, gf = M.o3((t - tD1 - 0.5) / 0.5);
    dF.set(fx0, fy0, fx0 + FL * gf * Math.cos(thr), fy0 - FL * gf * Math.sin(thr)); at(dFl, fx0 + (FL + 18) * Math.cos(thr), fy0 - (FL + 18) * Math.sin(thr) + 8); op(dFl, gf);
    const gv = M.o3((t - tD1 - 0.9) / 0.5); dV.set(bx - 60, FLY - 120, bx - 60 + 110 * gv, FLY - 120); at(dVl, bx + 60, FLY - 110); op(dVl, gv);
    const gr2 = M.o3((t - wt('D4', 'displacement') + 0.1) / 0.5) * (1 - M.io((t - tStep[4]) / 0.4)); dR.set(bx - 60, FLY + 40, bx - 60 + 60 * gr2, FLY + 40); at(dRl, bx - 52, FLY + 74); op(dRl, gr2);
    if (th > 1) { attr(dArc, 'd', `M${fx0 + 60},${fy0} A60,60 0 0 0 ${(fx0 + 60 * Math.cos(thr)).toFixed(1)},${(fy0 - 60 * Math.sin(thr)).toFixed(1)}`); at(dThl, fx0 + 72 * Math.cos(thr / 2) + 4, fy0 - 72 * Math.sin(thr / 2) + 8); M.hide(dArc, false); M.hide(dThl, false); } else { M.hide(dArc, true); M.hide(dThl, true); }
    M.vis($('#drC'), t, tStep[3] - 0.2, 1e9, POP); M.setT($('#drCv'), `${(20 * Math.cos(thr)).toFixed(1)} W  (θ = ${th}°)`);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Power') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'equals') - 0.2, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const w0 = M.o3((t - wt('C2', 'Diya') + 0.1) / 0.6), w1 = M.o3((t - wt('C3', 'same') + 0.1) / 0.6);
    $('#c0af').style.width = (380 * 1470 / 1600 * w0).toFixed(1) + 'px'; $('#c0bf').style.width = (380 * 1470 / 1600 * w1).toFixed(1) + 'px';
    M.vis($('#c0a'), t, T0('C2') - 0.1, 1e9, { dy: 10 }); M.vis($('#c0b'), t, T0('C3') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#c0F'), t, wt('C2', 'Fourteen') - 0.2, 0.8);
    M.vis($('#c1'), t, T0('C3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tw = T0('C3'), a1 = 2 * PI * M.clamp((t - tw) / 6) , a2 = 2 * PI * M.clamp((t - tw) / 3);
    [[wDi, a1], [wAa, a2]].forEach(([wc, a]) => { attr(wc.h, 'x2', (wc.x + 50 * Math.sin(a)).toFixed(1)); attr(wc.h, 'y2', (wc.y - 50 * Math.cos(a)).toFixed(1)); });
    const p0 = M.o3((t - wt('C3', 'Power') + 0.1) / 0.6), p1 = M.o3((t - wt('C3', 'Double') + 0.1) / 0.6);
    $('#c1af').style.width = (380 * 147 / 320 * p0).toFixed(1) + 'px'; $('#c1bf').style.width = (380 * 294 / 320 * p1).toFixed(1) + 'px';
    M.vis($('#c1a'), t, wt('C3', 'Power') - 0.1, 1e9, { dy: 10 }); M.vis($('#c1b'), t, wt('C3', 'half') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#c1F'), t, wt('C3', 'Double') - 0.1, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('K1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'less') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'The') });
    M.vis($('#th2'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'power') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'The') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#exR'), t, tR1 + 0.4, 1e9, { dy: 8 });
    const p = rPos(t); attr(rb, 'transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)}) rotate(${(-p.a * 180 / PI).toFixed(2)})`);
    const v = rVel(t), F = 150 / v, ux = Math.cos(p.a), uy = -Math.sin(p.a);
    const gF = M.o3((t - T0('R3') + 0.1) / 0.5); rF.set(p.x + ux * 30 + uy * 0, p.y + uy * 30 - 70, p.x + ux * (30 + 1.4 * F * gF), p.y + uy * (30 + 1.4 * F * gF) - 70);
    const gV = M.o3((t - T0('R2') + 0.1) / 0.5); rV.set(p.x + ux * 30, p.y + uy * 30 - 90 - 14, p.x + ux * (30 + 16 * v * gV), p.y + uy * (30 + 16 * v * gV) - 104);
    $('#bPf').style.width = (380 * 150 / 200) + 'px'; $('#bFf').style.width = (380 * F / 100).toFixed(1) + 'px'; $('#bVf').style.width = (380 * v / 8).toFixed(1) + 'px';
    M.setT($('#bFv'), F.toFixed(0) + ' N'); M.setT($('#bVv'), v.toFixed(1) + ' m/s');
    M.vis($('#bP'), t, T0('R2') + 0.2, 1e9, { dy: 10 }); M.vis($('#bF'), t, T0('R3') + 0.2, 1e9, { dy: 10 }); M.vis($('#bV'), t, T0('R3') + 0.4, 1e9, { dy: 10 });
    M.vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.05, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T1('R5') + 0.5)) / 0.3))); });
    avR(t, wt('R5', 'slows') + 0.2, out);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const cy = 330 - 4.5 * Math.max(0, t - T0('W2'));    // steady climb
    attr(wCabI, 'transform', `translate(0,${cy.toFixed(1)})`); attr(wCable, 'y2', cy.toFixed(1));
    const cx = LX + LW / 2, gw = M.o3((t - wt('W3', 'weight') + 0.1) / 0.5), gfr = M.o3((t - wt('W3', 'friction') + 0.1) / 0.5), gF = M.o3((t - wt('W3', 'Eighty') + 0.1) / 0.5), gv = M.o3((t - T0('W2') - 0.6) / 0.5);
    wG.set(cx - 30, cy + 110, cx - 30, cy + 110 + 106 * gw); at(wGl, LX + LW + 24, cy + 200); op(wGl, gw);
    wFr.set(cx + 30, cy + 110, cx + 30, cy + 110 + 14 * gfr + 0.1); at(wFrl, LX + LW + 24, cy + 150); op(wFrl, gfr);
    wF.set(cx, cy, cx, cy - 120 * gF); at(wFl, LX + LW + 24, cy - 60); op(wFl, gF);
    wV.set(LX - 40, cy + 90, LX - 40, cy + 90 - 80 * gv); at(wVl, LX - 200, cy + 60); op(wVl, gv);
    M.vis($('#wC'), t, wt('W5', 'About') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'kilowatt') - 0.1, tStrike: wt('X3', 'energy') - 0.1, tRight: wt('X3', 'energy') + 0.3 });
    const a = 2 * PI * M.clamp((t - wt('X3', 'One')) / 1.5); attr(tgH, 'x2', (110 + 40 * Math.sin(a)).toFixed(1)); attr(tgH, 'y2', (140 - 40 * Math.cos(a)).toFixed(1));
    op(tgE, M.clamp((t - wt('X3', 'three') + 0.1) / 0.3));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'numericals') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
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
