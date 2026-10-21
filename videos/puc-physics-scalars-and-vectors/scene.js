// PUC Physics Ep 32: Scalars and Vectors (Motion notebook, one bicycle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const BC = C.violet, VC = C.gold, FC = C.orange, IC = C.ink, RC = C.red, UC = C.ac;   // canon: displacement violet; angle gold, force orange, distance ink, velocity blue
const FL = M.mix(FC, '#FFFFFF', 0.45);                                    // the single pushes (solid light orange)
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, fs = 30, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const deg = Math.PI / 180;

Object.assign(M.IC, {
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  tri: ['M4 20 L20 20 L20 4 Z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tP1 = T0('P1'), tS1 = T0('S1'), tM1 = T0('M1'), tM2 = T0('M2'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK5 = T0('K5');
const tL1 = T0('L1'), tU1 = T0('U1'), tZ1 = T0('Z1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: 10 kg + 10 kg = 20 kg ---------- */
const TT = [['weight', 'Rice', '10 kg', wt('H1', 'Ten')], ['weight', 'Rice', '10 kg', wt('H1', 'ten', 1)], ['weight', 'Total', '20 kg', wt('H1', 'twenty')]];
$('#jobs').innerHTML = TT.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${330 + i * 480}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('') +
  `<div class="jop" id="jo0" style="left:${330 + 300 + 75}px">+</div><div class="jop" id="jo1" style="left:${330 + 780 + 75}px">=</div>`;
const tJo = [wt('H1', 'plus'), wt('H1', 'Always')];

/* ---------- H: kg row + two pushes on a box + the ride ---------- */
$('#hrI').innerHTML = M.icon('weight', 34, C.ink2, 2.2);
const hp = $('#hpS'), HBX = 210, HBY = 400, HS = 11;            // 11 px per newton
mk(hp, 'line', { x1: 40, y1: HBY + 40, x2: 500, y2: HBY + 40, stroke: C.ink, 'stroke-width': 3 });
const hF2 = PUC.arrow(hp, FL, 6, 16), hF1 = PUC.arrow(hp, FL, 6, 16);
mk(hp, 'rect', { x: HBX - 40, y: HBY - 40, width: 80, height: 80, rx: 10, fill: C.ink });
const hR = PUC.arrow(hp, FC, 9, 22);
const tPh = wt('H2', 'push'), tPf = wt('H2', 'friend');
const phi = M.keys([[0, 0], [wt('H3', 'zero') - 0.3, 180], [wt('H3', 'between') - 0.2, 70]], 0.7, M.io);

/* ---------- P: scalars and vectors ---------- */
const PS = [['weight', 'Mass', '5 kg'], ['clock', 'Time', '20 s'], ['thermo', 'Temperature', '37 °C'], ['ruler', 'Distance', '7 km']];
$('#psr').innerHTML = PS.map(([ic, n, v], i) => `<div class="jr" id="ps${i}" style="top:${84 + i * 100}px"><i>${M.icon(ic, 28, C.ink2, 2.2)}</i><div class="jn">${n}</div><div class="jv">${v}</div></div>`).join('') +
  `<div class="pillp" id="psP" style="left:36px;top:494px">A number and a unit tell the full story</div>`;
const tPs = [wt('P2', 'Mass'), wt('P2', 'time'), wt('P2', 'temperature'), wt('P2', 'distance')];
const PV = [['Displacement', '5 km', BC, -53, 'north-east'], ['Velocity', '4 m/s', UC, 0, 'east'], ['Acceleration', '9.8 m/s²', RC, 90, 'down'], ['Force', '10 N', FC, 180, 'west']];
const arrIco = (col, a) => `<svg width="40" height="40" viewBox="-20 -20 40 40" style="display:block;overflow:visible"><g transform="rotate(${a})"><line x1="-14" y1="0" x2="8" y2="0" stroke="${col}" stroke-width="4" stroke-linecap="round"/><path d="M16,0 L5,-8 L5,8 Z" fill="${col}"/></g></svg>`;
$('#pvr').innerHTML = PV.map(([n, v, col, a], i) => `<div class="jr" id="pv${i}" style="top:${84 + i * 100}px"><i>${arrIco(col, a)}</i><div class="jn">${n}</div><div class="jv" style="color:${col}">${v} <span style="font:500 20px Poppins;color:var(--mute)">${PV[i][4]}</span></div></div>`).join('');
$('#pvI').innerHTML = M.icon('tri', 24, '#fff', 2.4);
const tPv = [wt('P4', 'Displacement'), wt('P4', 'velocity'), wt('P4', 'acceleration'), wt('P4', 'force')];

/* ---------- S: the ride (sim + readout + graph) ---------- */
const s = $('#simS'), GX = 150, GY = 440, PK = 84;            // 84 px per km, gate at (150, 440)
for (let x = GX; x <= GX + 5 * PK; x += PK) mk(s, 'line', { x1: x, y1: 90, x2: x, y2: GY, stroke: C.line, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' });
for (let y = GY; y >= 90; y -= PK) mk(s, 'line', { x1: GX, y1: y, x2: GX + 5 * PK, y2: y, stroke: C.line, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' });
// compass
const cpx = 650, cpy = 150;
mk(s, 'circle', { cx: cpx, cy: cpy, r: 40, fill: '#fff', stroke: C.line, 'stroke-width': 2 });
mk(s, 'path', { d: `M${cpx},${cpy - 32} L${cpx - 8},${cpy} L${cpx + 8},${cpy} Z`, fill: C.ink });
mk(s, 'path', { d: `M${cpx},${cpy + 32} L${cpx - 8},${cpy} L${cpx + 8},${cpy} Z`, fill: C.dim });
txt(s, cpx, cpy - 48, 'N', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); txt(s, cpx + 56, cpy + 6, 'E', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
// gate
mk(s, 'rect', { x: GX - 22, y: GY - 10, width: 44, height: 20, rx: 4, fill: C.ink });
txt(s, GX - 10, GY + 40, 'COLLEGE GATE', { 'font-size': 16, 'letter-spacing': 2, 'text-anchor': 'middle' });
const pathE = mk(s, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '2 10' });
const dA = PUC.arrow(s, BC, 7, 20);
const sLab = it(s, 0, 0, 's', BC, 34);
// frozen legs (M1)
const leg1 = PUC.arrow(s, IC, 5, 16), leg2 = PUC.arrow(s, IC, 5, 16);
const l1t = txt(s, GX + 1.5 * PK, GY + 34, '3 km east', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const l2t = txt(s, GX + 3 * PK + 16, GY - 2 * PK, '4 km north', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const rgt = txt(s, GX + 1.5 * PK - 74, GY - 2 * PK - 26, 's = 5 km', { 'text-anchor': 'middle', 'font-size': 26, fill: BC, 'font-weight': 600 });
const tailT = txt(s, GX - 34, GY - 22, 'TAIL', { 'font-size': 16, 'letter-spacing': 2, fill: BC, 'font-weight': 600, 'text-anchor': 'end' });
const headT = txt(s, GX + 3 * PK + 16, GY - 4 * PK + 6, 'HEAD', { 'font-size': 16, 'letter-spacing': 2, fill: BC, 'font-weight': 600 });
const ghosts = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 13, fill: C.ink, opacity: op, cx: -99, cy: -99 }));
const bike = mk(s, 'circle', { r: 14, fill: C.ink, stroke: '#fff', 'stroke-width': 4, cx: GX, cy: GY });
const pos = d => d <= 3 ? [d, 0] : [3, Math.min(d, 7) - 3];
const xy = d => { const [e, n] = pos(d); return [GX + e * PK, GY - n * PK]; };
// ride clock: leg 1 timed to the words, leg 2 at 0.3 s per km, the replay at 1.2 s per km (0.25x)
const tR0 = wt('S2', 'One') - 0.35, tR1 = wt('S2', 'three') + 0.15, tR2 = wt('S4', 'keeps') - 0.1, tR3 = tR2 + 1.2;
const tRp = wt('S5', 'slow') - 0.1, tRs = wt('S6', 'swings') - 0.35, tRe = tRs + 4.8;
const rideD = t => {
  if (t >= tRp && t < tRs) return 3;
  if (t >= tRs) return 3 + 4 * M.clamp((t - tRs) / (tRe - tRs));
  if (t < tR1) return 3 * M.clamp((t - tR0) / (tR1 - tR0));
  if (t < tR2) return 3;
  return 3 + 4 * M.clamp((t - tR2) / (tR3 - tR2));
};
const reach = t => t < tRp ? rideD(t) : 7;     // how far the graph has been drawn
// readout
$('#roG').innerHTML = `<span class="k" style="color:${IC}">d</span><span class="v" id="rd">0.0</span><span class="u">km · distance</span>
  <span class="k" style="color:${BC}">|s|</span><span class="v" id="rs" style="color:${BC}">0.0</span><span class="u">km · displacement</span>
  <span class="k" style="color:${VC}">θ</span><span class="v" id="rth" style="color:${VC}">0</span><span class="u">° north of east</span>`;
// graph: both against time (15 km/h, so 4 min per km)
const G = PUC.graph($('#grS'), { x: 100, y: 76, w: 560, h: 136, xmax: 32, ymin: 0, ymax: 8, xt: [0, 8, 16, 24], yt: [0, 4, 8], xl: 't (min)', yl: 'km' });
const gD = G.curve(IC, 4), gS = G.curve(BC, 5), dD = G.dot(IC, 9), dS = G.dot(BC, 11);
const sOf = d => { const [e, n] = pos(d); return Math.hypot(e, n); };
const gtD = txt($('#grS'), 676, G.Y(7) + 6, 'd = 7', { fill: IC, 'font-weight': 600, 'font-size': 20 });
const gtS = txt($('#grS'), 676, G.Y(5) + 6, '|s| = 5', { fill: BC, 'font-weight': 600, 'font-size': 20 });
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'My trip meter shows distance, not displacement!' });

/* ---------- D: the maths + the triangle ---------- */
const STEPS = [[`\\textcolor{${IC}}{d} = 3 + 4 = 7\\,\\text{km}`, 'a scalar: plain adding'],
  [`\\text{legs at } 90^\\circ \\Rightarrow \\textcolor{${BC}}{\\vec{s}} = \\text{longest side}`, 'a right triangle'],
  [`\\textcolor{${BC}}{s}^2 = 3^2 + 4^2 = 9 + 16 = 25`, 'Pythagoras'],
  [`\\textcolor{${BC}}{s} = 5\\,\\text{km},\\;\\; \\textcolor{${VC}}{\\theta} = \\tan^{-1}\\tfrac{4}{3} \\approx 53^\\circ`, 'north of east']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Distance'), wt('D3', 'The'), wt('D4', 'By'), wt('D5', 'So')];
const tr = $('#trS'), TP = 44;                                // 44 px per km
const A = [300, 400], B = [250 + 3 * TP, 380], Cc = [250 + 3 * TP, 380 - 4 * TP];
const nrm = [-(Cc[1] - A[1]), (Cc[0] - A[0])].map(v => -v);   // outward normal of the hypotenuse (away from B)
const sqP = (a, b, n) => `M${a[0]},${a[1]} L${b[0]},${b[1]} L${b[0] + n[0]},${b[1] + n[1]} L${a[0] + n[0]},${a[1] + n[1]} Z`;
const sq9 = mk(tr, 'g', {}), sq16 = mk(tr, 'g', {}), sq25 = mk(tr, 'g', {});
const gridSq = (g, a, b, n, k, col, fill) => {
  mk(g, 'path', { d: sqP(a, b, n), fill, stroke: col, 'stroke-width': 2.5 });
  for (let i = 1; i < k; i++) {
    const u = i / k;
    mk(g, 'line', { x1: a[0] + (b[0] - a[0]) * u, y1: a[1] + (b[1] - a[1]) * u, x2: a[0] + (b[0] - a[0]) * u + n[0], y2: a[1] + (b[1] - a[1]) * u + n[1], stroke: col, 'stroke-width': 1, opacity: 0.5 });
    mk(g, 'line', { x1: a[0] + n[0] * u, y1: a[1] + n[1] * u, x2: b[0] + n[0] * u, y2: b[1] + n[1] * u, stroke: col, 'stroke-width': 1, opacity: 0.5 });
  }
  const cx = (a[0] + b[0]) / 2 + n[0] / 2, cy = (a[1] + b[1]) / 2 + n[1] / 2;
  txt(g, cx, cy + 12, String(k * k), { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 600, fill: col });
};
gridSq(sq9, A, B, [0, 3 * TP], 3, IC, '#FFFFFF');
gridSq(sq16, B, Cc, [4 * TP, 0], 4, IC, '#FFFFFF');
gridSq(sq25, A, Cc, nrm, 5, BC, M.mix(BC, '#FFFFFF', 0.9));
const tAB = mk(tr, 'path', { d: `M${A} L${B}`, stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' });
const tBC = mk(tr, 'path', { d: `M${B} L${Cc}`, stroke: IC, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' });
const tAC = mk(tr, 'path', { d: `M${A} L${Cc}`, stroke: BC, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const rAng = mk(tr, 'path', { d: `M${B[0] - 18},${B[1]} V${B[1] - 18} H${B[0]}`, stroke: IC, 'stroke-width': 2.5, fill: 'none' });
const th = Math.atan2(4, 3), arc = mk(tr, 'path', { d: `M${A[0] + 50},${A[1]} A50,50 0 0 0 ${A[0] + 50 * Math.cos(th)},${A[1] - 50 * Math.sin(th)}`, stroke: VC, 'stroke-width': 4, fill: 'none' });
const thL = it(tr, A[0] + 60, A[1] - 22, 'θ', VC, 28);
const t3 = txt(tr, (A[0] + B[0]) / 2, A[1] + 30, '3 km', { 'text-anchor': 'middle', 'font-size': 22, fill: IC, 'font-weight': 600 });
const t4 = txt(tr, B[0] + 14, (B[1] + Cc[1]) / 2 + 8, '4 km', { 'font-size': 22, fill: IC, 'font-weight': 600 });
$('#stF').innerHTML = K(`\\text{distance } \\textcolor{${IC}}{7\\,\\text{km}} \\quad\\text{vs}\\quad \\text{displacement } \\textcolor{${BC}}{5\\,\\text{km}}`);

/* ---------- K: side by side ---------- */
$('#kbI0').innerHTML = M.icon('weight', 64, C.ink2, 2); $('#kbI1').innerHTML = M.icon('weight', 64, C.ink2, 2);
const kv = $('#kvS'), KBX = 190, KBY = 250, KS = 9;          // 9 px per newton
const kF2 = PUC.arrow(kv, FL, 6, 16), kF1 = PUC.arrow(kv, FL, 6, 16);
mk(kv, 'rect', { x: KBX - 28, y: KBY - 28, width: 56, height: 56, rx: 8, fill: C.ink });
const kR = PUC.arrow(kv, FC, 9, 22);
const kTot = txt(kv, 36, 430, '', { 'font-size': 34, 'font-weight': 600, fill: FC });
const CASES = [['Same way', '0°', '20 N', wt('K2', 'same')], ['At a right angle', '90°', '14.1 N', wt('K3', 'right')], ['Against each other', '180°', '0 N', wt('K3', 'against')]];
$('#cases').innerHTML = CASES.map(([n, a, r], i) => `<div class="case" id="ca${i}" style="left:380px;top:${84 + i * 96}px"><div class="cn">${n}</div><div class="cv">ANGLE ${a}</div><div class="cr">${r}</div></div>`).join('');
const kphi = M.keys([[0, 0], [CASES[1][3] - 0.2, 90], [CASES[2][3] - 0.2, 180]], 0.6, M.io);
const th1 = PUC.think($('#th1'), { q: 'Two pushes of 10 N act on one box. Can the total push be zero?', opts: ['Yes', 'No'], right: 0, why: 'Opposite pushes cancel: 10 N right + 10 N left = 0 N.' });

/* ---------- L: follow the links ---------- */
const ROWS = [[['Distance', 'cb', 'SCALAR', 'L3', 'Distance'], ['÷', 'cop'], ['Time', 'cb', 'SCALAR', 'L3', 'Time'], ['=', 'cop'], ['Speed', 'cb', 'SCALAR', 'L3', 'speed']],
  [['Displacement', 'cb', 'VECTOR', 'L5', 'Displacement'], ['÷', 'cop'], ['Time', 'cb', 'POSITIVE NUMBER', 'L5', 'positive'], ['=', 'cop'], ['Velocity', 'cb', 'VECTOR', 'L5', 'velocity']]];
const RY = [110, 320];
$('#chn').innerHTML = ROWS.map((r, j) => r.map(([x, c, tag], i) => `<div class="${c}" id="lc${j}${i}" style="top:${RY[j] + (c === 'cop' ? 8 : 0)}px">${x}</div>` + (tag ? `<div class="ctag" id="lt${j}${i}" style="top:${RY[j] + 96}px;background:${tag === 'VECTOR' ? (i ? 'var(--ac)' : '#7A4FE0') : 'var(--soft)'};color:${tag === 'VECTOR' ? '#fff' : 'var(--ink2)'}">${tag}</div>` : '')).join('')).join('') +
  `<div class="cwhy" id="lw0" style="left:1000px;top:${RY[0] + 22}px">${K('\\text{scalar} \\div \\text{scalar} = \\text{scalar}')}</div>
   <div class="cwhy" id="lw1" style="left:1000px;top:${RY[1] + 22}px">${K('\\text{vector} \\div (+\\,\\text{number}) = \\text{vector}')}</div>
   <div class="cwhy" id="lw1b" style="left:1000px;top:${RY[1] + 80}px;font-size:26px;color:var(--mute)">same direction, new size</div>`;
// blocks enter on L2 / L4 words: result word first is spoken ("Speed equals distance divided by time")
const tBlk = [[wt('L2', 'distance'), wt('L2', 'divided'), wt('L2', 'time'), wt('L2', 'equals'), wt('L2', 'Speed')],
  [wt('L4', 'displacement'), wt('L4', 'divided'), wt('L4', 'time'), wt('L4', 'equals'), wt('L4', 'Velocity')]];
const tTag = [[wt('L3', 'Distance'), wt('L3', 'Time'), wt('L3', 'speed')], [wt('L5', 'Displacement'), wt('L5', 'positive'), wt('L5', 'velocity')]];
const avL = PUC.avatar($('#sL'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So speed and velocity are not the same thing.' });

/* ---------- U: equal vectors ---------- */
const ue = $('#ueS'), ua = [[110, 400], [330, 290]], uOff = [300, -170];
for (let x = 80; x <= 720; x += 40) mk(ue, 'line', { x1: x, y1: 80, x2: x, y2: 460, stroke: C.soft, 'stroke-width': 2 });
for (let y = 80; y <= 460; y += 40) mk(ue, 'line', { x1: 80, y1: y, x2: 720, y2: y, stroke: C.soft, 'stroke-width': 2 });
const uA = PUC.arrow(ue, BC, 7, 20), uBg = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(ue, BC, 7, 20); a.g.setAttribute('opacity', op); return a; }), uB = PUC.arrow(ue, BC, 7, 20);
const uAl = it(ue, 0, 0, 'A', BC, 34), uBl = it(ue, 0, 0, 'B', BC, 34);
const uEq = txt(ue, 480, 440, 'A = B', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 40, 'font-weight': 700, fill: C.ok });
const tUm = wt('U2', 'Move') - 0.1, uMove = t => M.io((t - tUm) / 1.1);
const un = $('#unS'), UO = [200, 420], UL = 250;
const uE = PUC.arrow(un, BC, 7, 20), uN = PUC.arrow(un, BC, 7, 20);
const uEt = txt(un, UO[0] + UL / 2, UO[1] + 40, '5 km east', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: BC });
const uNt = txt(un, UO[0] - 20, UO[1] - UL / 2, '5 km north', { 'text-anchor': 'end', 'font-size': 24, 'font-weight': 600, fill: BC });
const uNe = txt(un, 440, 250, '≠', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 120, 'font-weight': 700, fill: RC });
const th2 = PUC.think($('#th2'), { q: 'Can the size of the displacement ever be bigger than the distance travelled?', opts: ['Yes', 'No'], right: 1, why: 'A straight line is the shortest path, so |s| ≤ distance.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${IC}}{d} = 8 + 6 = 14\\,\\text{m}`)],
  [K(`\\textcolor{${BC}}{s}^2 = 8^2 + 6^2`)],
  [K(`\\textcolor{${BC}}{s}^2 = 64 + 36 = 100 \\;\\Rightarrow\\; \\textcolor{${BC}}{s} = 10\\,\\text{m}`)],
  [K(`\\textcolor{${IC}}{14\\,\\text{m}} \\;\\text{vs}\\; \\textcolor{${BC}}{10\\,\\text{m}},\\ \\textcolor{${VC}}{\\theta} \\approx 37^\\circ\\ \\text{N of E}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
const tW = [wt('W3', 'Eight'), wt('W4', 'The'), wt('W5', 'That'), wt('W6', 'Distance')];
const w = $('#wrS'), WO = [150, 440], WP = 44;               // 44 px per metre
for (let x = WO[0]; x <= WO[0] + 9 * WP; x += WP) mk(w, 'line', { x1: x, y1: WO[1] - 7 * WP, x2: x, y2: WO[1], stroke: C.soft, 'stroke-width': 2 });
for (let y = WO[1]; y >= WO[1] - 7 * WP; y -= WP) mk(w, 'line', { x1: WO[0], y1: y, x2: WO[0] + 9 * WP, y2: y, stroke: C.soft, 'stroke-width': 2 });
const wPath = mk(w, 'path', { d: `M${WO[0]},${WO[1]} h${8 * WP} v${-6 * WP}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const wA = PUC.arrow(w, BC, 7, 20);
const wArc = mk(w, 'path', { d: `M${WO[0] + 70},${WO[1]} A70,70 0 0 0 ${WO[0] + 70 * Math.cos(Math.atan2(6, 8))},${WO[1] - 70 * Math.sin(Math.atan2(6, 8))}`, stroke: VC, 'stroke-width': 4, fill: 'none' });
const wTh = txt(w, WO[0] + 84, WO[1] - 16, 'θ ≈ 37°', { 'font-size': 22, 'font-weight': 600, fill: VC });
const w8 = txt(w, WO[0] + 4 * WP, WO[1] + 30, '8 m', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: IC });
const w6 = txt(w, WO[0] + 8 * WP + 14, WO[1] - 3 * WP + 8, '6 m', { 'font-size': 22, 'font-weight': 600, fill: IC });
const wSt = txt(w, WO[0] + 4 * WP - 30, WO[1] - 3 * WP - 22, '10 m', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: BC });
const wDot = mk(w, 'circle', { r: 12, fill: C.ink, cx: WO[0], cy: WO[1] });
const tWalk = T0('W2') + 0.6, tWalkE = wt('W3', 'fourteen');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'There and back, 2 km each way: distance = 0', right: 'Distance = 4 km. Displacement = 0' });
const r = $('#rtS'), HX = 90, CX = 500, RY0 = 120;
mk(r, 'circle', { cx: HX, cy: RY0 + 22, r: 14, fill: C.ink }); mk(r, 'circle', { cx: CX, cy: RY0 + 22, r: 14, fill: C.ink });
txt(r, HX, RY0 + 76, 'HOME', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 }); txt(r, CX, RY0 + 76, 'COLLEGE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const rGo = PUC.arrow(r, IC, 5, 16), rBk = PUC.arrow(r, IC, 5, 16);
const rGt = txt(r, (HX + CX) / 2, RY0 - 18, '2 km there', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: IC });
const rBt = txt(r, (HX + CX) / 2, RY0 + 80, '2 km back', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: IC });
const rS = txt(r, (HX + CX) / 2, RY0 + 124, 'start = finish, so s = 0', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: BC });
const where = PUC.where($('#wa'), { on: [], type: 'Pick the vector from a list, or find distance and displacement for a path' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A particle moves 6 m east, then 8 m north, then 6 m west. What is the ratio of the distance travelled to the magnitude of its displacement?', qW: 800,
  opts: ['5 : 2', '7 : 5', '2 : 1', '1 : 1'], right: 0, optW: 474, optY: 340 });
const so = PUC.solution($('#so'), [[`Distance = 6 + 8 + 6 = <b>20 m</b>`], [`East 6 and west 6 cancel`], [`<span style="color:${BC}">|s|</span> = <b>8 m</b> north`], [`20 : 8 = <b style="color:var(--ok)">5 : 2</b>`]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Distance'), wt('A3', 'east'), wt('A3', 'displacement'), wt('A4', 'Twenty')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · scalars and vectors', y0: 104, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${IC}}{d} = d_1 + d_2 \\qquad \\textcolor{${BC}}{|\\vec{s}|} = \\sqrt{s_1^2 + s_2^2}\\ \\ (90^\\circ)`),
    '<b>Scalar</b>: size only, adds like plain numbers', '<b>Vector</b>: size + direction, adds by the triangle law', '<b>Equal</b>: same size + same direction &nbsp;·&nbsp; |s| ≤ distance'] });
const YQ = ['How can 10 N plus 10 N give zero?', 'Is speed a scalar or a vector, and why?', 'Can displacement ever be bigger than distance?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 33', topic: 'How do you draw a vector anyone can read? Vector Representation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tM2 - 0.1, 1.06, 960, 540], [tD1 - 0.5, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  ROWS.forEach((row, j) => { let x = 36; row.forEach((_, i) => { const e = $('#lc' + j + i); e.style.left = x + 'px'; x += e.offsetWidth + 22; const tg = $('#lt' + j + i); if (tg) tg.style.left = (e.offsetLeft + e.offsetWidth / 2 - tg.offsetWidth / 2) + 'px'; }); });
  // keep the "why" column clear of the longest chain
  const mx = Math.max(...[0, 1].map(j => { const e = $('#lc' + j + '4'); return e.offsetLeft + e.offsetWidth; })) + 60;
  ['lw0', 'lw1', 'lw1b'].forEach(id => $('#' + id).style.left = Math.max(mx, 1000) + 'px');
}
const arrowAt = (a, x, y, ang, len) => a.set(x, y, x + len * Math.cos(ang), y - len * Math.sin(ang));

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card */
  TT.forEach((tt, i) => M.vis($('#jb' + i), t, tt[3] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));
  tJo.forEach((tt, i) => M.vis($('#jo' + i), t, tt - 0.05, tMorph - 0.15, { ...POP, outDur: 0.25 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hp'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hr'), t, tMorph + 0.3, 1e9, { dy: 16 });
    M.vis($('#hpL'), t, tPh - 0.2, 1e9, { dy: 10 });
    const g1 = M.io((t - tPh) / 0.4), g2 = M.io((t - tPf) / 0.4), f = phi(t) * deg;
    arrowAt(hF1, HBX, HBY, 0, 10 * HS * g1); arrowAt(hF2, HBX, HBY, f, 10 * HS * g2);
    const tot = 20 * Math.cos(f / 2) * g2, ang = f / 2, on = M.io((t - tPf - 0.3) / 0.3);
    arrowAt(hR, HBX, HBY, ang, Math.max(0, (g2 < 1 ? 10 * g1 : tot)) * HS * on);
    M.vis($('#hpV'), t, tPf + 0.2, 1e9, POP); M.vis($('#hpT'), t, tPf + 0.3, 1e9, { dy: 8 });
    M.setT($('#hpN'), Math.abs(tot).toFixed(Math.abs(tot) > 19.95 || tot < 0.05 ? 0 : 1));
    M.vis($('#hk'), t, T0('H4') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, T0('H4') + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, T0('H4') + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hk0'), t, wt('H5', 'seven') - 0.1, 1e9, POP); M.vis($('#hk1'), t, wt('H6', 'five') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#ps'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PS.forEach((_, i) => M.vis($('#ps' + i), t, tPs[i] - 0.1, 1e9, { dy: 16 }));
    M.vis($('#psP'), t, wt('P2', 'number') - 0.1, 1e9, POP);
    M.vis($('#pv'), t, T0('P3') - 0.05, out, { dx: 60, dy: 0, ...o });
    PV.forEach((_, i) => M.vis($('#pv' + i), t, tPv[i] - 0.1, 1e9, { dy: 16 }));
    M.vis($('#pvP'), t, wt('P5', 'triangle') - 0.1, 1e9, POP);
  }

  /* S + M: the ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exG'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const d = rideD(t), [bx, by] = xy(d), R = reach(t);
    attr(bike, 'cx', bx.toFixed(1)); attr(bike, 'cy', by.toFixed(1)); M.vis(bike, t, tS1 + 0.5, 1e9, { ...POP, sc: 0.4 });
    ghosts.forEach((gh, k) => { const dg = rideD(t - 0.1 * (k + 1) * (t >= tRs ? 3 : 1)), [gx, gy] = xy(dg); attr(gh, 'cx', gx.toFixed(1)); attr(gh, 'cy', gy.toFixed(1)); M.hide(gh, Math.abs(dg - d) < 0.05); });
    const [px, py] = xy(R); attr(pathE, 'd', R <= 0 ? '' : R <= 3 ? `M${GX},${GY} L${px},${py}` : `M${GX},${GY} L${GX + 3 * PK},${GY} L${px},${py}`);
    // displacement arrow: gate to bike, every frame
    const dOn = M.io((t - wt('S3', 'violet') + 0.2) / 0.3);
    const ex = GX + (bx - GX) * dOn, ey = GY + (by - GY) * dOn; dA.set(GX, GY, ex, ey);
    const L = Math.hypot(ex - GX, ey - GY); attr(sLab, 'x', ((GX + ex) / 2 - 30 * (ey - GY) / (L || 1) * -1 - 14).toFixed(1)); attr(sLab, 'y', ((GY + ey) / 2 - 18).toFixed(1)); sLab.style.opacity = (L > 60 ? 1 : 0) * dOn * (1 - M.io((t - wt('M2', 'joins') + 0.2) / 0.2));
    // slow-mo tag
    M.vis($('#slo'), t, tRp, tRe + 0.4, { ...POP, outDur: 0.25, osc: 0.8, ody: 0 });
    // frozen legs and the tail-to-head reading
    const fr = t >= tM1 - 0.1;
    leg1.set(GX, GY + 0, GX + 3 * PK * M.io((t - wt('M1', 'one') + 0.1) / 0.5), GY); M.hide(leg1.g, !fr);
    leg2.set(GX + 3 * PK, GY, GX + 3 * PK, GY - 4 * PK * M.io((t - wt('M1', 'two') + 0.1) / 0.5)); M.hide(leg2.g, !fr || t < wt('M1', 'two') - 0.1);
    M.vis(l1t, t, wt('M1', 'three') - 0.1, 1e9, { dy: 8 }); M.vis(l2t, t, wt('M1', 'four') - 0.1, 1e9, { dy: 8 });
    M.vis(rgt, t, wt('M2', 'joins') - 0.1, 1e9, POP);
    M.vis(tailT, t, wt('M2', 'tail') - 0.1, 1e9, POP); M.vis(headT, t, wt('M2', 'head') - 0.1, 1e9, POP);
    // readout
    const [e, n] = pos(d), sm = Math.hypot(e, n);
    M.setT($('#rd'), d.toFixed(1)); M.setT($('#rs'), sm.toFixed(1)); M.setT($('#rth'), (Math.atan2(n, e) / deg).toFixed(0));
    // graph: both curves draw to the furthest point reached; dots follow the bike
    gD(s2 => [s2 * 4, s2], 0, R); gS(s2 => [s2 * 4, sOf(s2)], 0, R);
    const gdOn = t > tR0 - 0.1; dD(d * 4, d, gdOn); dS(d * 4, sm, gdOn && dOn > 0.5);
    M.vis(gtD, t, wt('S7', 'distance') - 0.1, 1e9, { dy: 0, dx: -10 }); M.vis(gtS, t, wt('S7', 'bends') - 0.1, 1e9, { dy: 0, dx: -10 });
    avA(t, T1('M2') - 0.4, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 196], [tStep[2] - 0.1, 308], [tStep[3] - 0.1, 420]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.draw(tAB, t, wt('D2', 'three') - 0.1, 0.5); M.draw(tBC, t, wt('D2', 'four') - 0.1, 0.5);
    M.vis(t3, t, wt('D2', 'three'), wt('D4', 'three') - 0.2, { dy: 8, outDur: 0.2 }); M.vis(t4, t, wt('D2', 'four'), wt('D4', 'four') - 0.2, { dy: 8, outDur: 0.2 });
    M.vis(rAng, t, wt('D3', 'right') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.draw(tAC, t, wt('D3', 'longest') - 0.2, 0.6);
    M.vis(sq9, t, wt('D4', 'three') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(sq16, t, wt('D4', 'four') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(sq25, t, wt('D4', 'twenty') - 0.15, 1e9, { dy: 0, fade: 0.3 });
    M.draw(arc, t, wt('D5', 'pointing') - 0.1, 0.5); M.vis(thL, t, wt('D5', 'fifty') - 0.1, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Vectors') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Scalars') + 0.2, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tL1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K5');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kb0'), t, wt('K1', 'Ten') - 0.1, 1e9, { dy: 20 }); M.vis($('#kbp'), t, wt('K1', 'plus') - 0.1, 1e9, POP);
    M.vis($('#kb1'), t, wt('K1', 'ten', 1) - 0.1, 1e9, { dy: 20 }); M.vis($('#kbe'), t, wt('K1', 'is') - 0.1, 1e9, POP);
    M.vis($('#kbR'), t, wt('K1', 'twenty') - 0.1, 1e9, POP); M.vis($('#kbC'), t, wt('K1', 'always') - 0.1, 1e9, POP);
    M.vis($('#kv'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const g = M.io((t - T0('K2') - 0.1) / 0.5), f = kphi(t) * deg, tot = 20 * Math.cos(f / 2);
    arrowAt(kF1, KBX, KBY, 0, 10 * KS * g); arrowAt(kF2, KBX, KBY + (f < 0.05 ? 0 : 0), f, 10 * KS * g);
    arrowAt(kR, KBX, KBY, f / 2, Math.max(0, tot) * KS * M.io((t - T0('K2') - 0.5) / 0.4));
    M.setT(kTot, 'total ' + (tot < 0.05 ? '0' : tot > 19.95 ? '20' : tot.toFixed(1)) + ' N'); M.vis(kTot, t, T0('K2') + 0.5, 1e9, { dy: 8 });
    CASES.forEach((cs, i) => { const el = $('#ca' + i); M.vis(el, t, cs[3] - 0.1, 1e9, { dx: 30, dy: 0 }); });
    M.vis($('#kvC'), t, wt('K4', 'Same') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK5 + 0.05, OUT('L1'), { dy: 36, ...o });
    th1(t, { tin: tK5, tOpts: wt('K5', 'zero') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: T0('K6') - 0.02, tWhy: wt('K6', 'opposite') });
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tU1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('U1');
    M.vis($('#lk'), t, tL1 + 0.05, out, { dy: 36, ...o });
    ROWS.forEach((row, j) => row.forEach((_, i) => {
      M.vis($('#lc' + j + i), t, tBlk[j][i] - 0.1, 1e9, POP);
      const tg = $('#lt' + j + i); if (tg) { const tt = tTag[j][i / 2]; M.vis(tg, t, tt - 0.1, 1e9, POP); const b = $('#lc' + j + i), on = M.io((t - tt) / 0.3), vec = row[i][2] === 'VECTOR';
        b.style.background = mix(C.soft, i === 4 ? (vec ? C.ac : C.ink) : (vec ? M.mix(BC, '#FFFFFF', 0.84) : '#E2E5EC'), on); b.style.color = i === 4 ? mix(C.ink, '#FFFFFF', on) : (vec ? mix(C.ink, BC, on) : C.ink); }
    }));
    PUC.write($('#lw0'), t, wt('L3', 'divided') - 0.1, 0.7);
    PUC.write($('#lw1'), t, wt('L5', 'Dividing') - 0.1, 0.7); M.vis($('#lw1b'), t, wt('L5', 'keeps') - 0.1, 1e9, { dx: -10, dy: 0 });
    avL(t, T1('L5') - 0.2, out);
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tW1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('Z1');
    M.vis($('#ue'), t, tU1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const ga = M.io((t - wt('U1', 'vectors') + 0.1) / 0.5), [ax, ay] = ua[0], [vx, vy] = [ua[1][0] - ax, ua[1][1] - ay];
    uA.set(ax, ay, ax + vx * ga, ay + vy * ga); attr(uAl, 'x', ax + vx / 2 - 36); attr(uAl, 'y', ay + vy / 2 - 12); uAl.style.opacity = ga;
    const m = uMove(t), bOn = t >= tUm, bxo = uOff[0] * m, byo = uOff[1] * m;
    uB.set(ax + bxo, ay + byo, ax + vx + bxo, ay + vy + byo); M.hide(uB.g, !bOn);
    uBg.forEach((gg, k) => { const mm = uMove(t - 0.12 * (k + 1)); gg.set(ax + uOff[0] * mm, ay + uOff[1] * mm, ax + vx + uOff[0] * mm, ay + vy + uOff[1] * mm); M.hide(gg.g, !bOn || m >= 0.999 || Math.abs(mm - m) < 0.01); });
    attr(uBl, 'x', ax + vx / 2 + bxo - 36); attr(uBl, 'y', ay + vy / 2 + byo - 12); uBl.style.opacity = bOn ? M.clamp((m - 0.6) / 0.4) : 0;
    M.vis(uEq, t, wt('U2', 'same') - 0.1, 1e9, POP); M.vis($('#ueP'), t, wt('U2', 'still') - 0.1, 1e9, POP);
    M.vis($('#un'), t, T0('U3') - 0.1, out, { dx: 60, dy: 0, ...o });
    uE.set(UO[0], UO[1], UO[0] + UL * M.io((t - wt('U3', 'east') + 0.15) / 0.4), UO[1]);
    uN.set(UO[0], UO[1], UO[0], UO[1] - UL * M.io((t - wt('U3', 'north') + 0.15) / 0.4));
    M.vis(uEt, t, wt('U3', 'east'), 1e9, { dy: 8 }); M.vis(uNt, t, wt('U3', 'north'), 1e9, { dy: 8 });
    M.vis(uNe, t, wt('U3', 'not') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis($('#unP'), t, wt('U3', 'equal') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'bigger') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'straight') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const u = M.clamp((t - tWalk) / (tWalkE - tWalk)), dd = 14 * u;    // constant walking speed
    M.drawU(wPath, u); const [qx, qy] = dd <= 8 ? [WO[0] + dd * WP, WO[1]] : [WO[0] + 8 * WP, WO[1] - (dd - 8) * WP];
    attr(wDot, 'cx', qx.toFixed(1)); attr(wDot, 'cy', qy.toFixed(1)); M.vis(wDot, t, tWalk - 0.2, 1e9, { ...POP, sc: 0.4 });
    M.vis(w8, t, tWalk + (8 / 14) * (tWalkE - tWalk) * 0.5, 1e9, { dy: 8 }); M.vis(w6, t, tWalk + (11 / 14) * (tWalkE - tWalk), 1e9, { dy: 8 });
    M.vis($('#wd'), t, tWalk, 1e9, POP); M.setT($('#wdN'), dd.toFixed(0));
    const ga = M.io((t - wt('W4', 'Displacement') + 0.1) / 0.6); wA.set(WO[0], WO[1], WO[0] + 8 * WP * ga, WO[1] - 6 * WP * ga);
    M.vis(wSt, t, wt('W5', 'ten') - 0.1, 1e9, POP); M.vis($('#ws'), t, wt('W5', 'ten') - 0.1, 1e9, POP);
    M.draw(wArc, t, wt('W6', 'pointing') - 0.2, 0.5); M.vis(wTh, t, wt('W6', 'north') - 0.1, 1e9, { dy: 6 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'distance') - 0.1 });
    const ug = M.io((t - wt('X2', 'two') + 0.1) / 0.5), ub = M.io((t - wt('X2', 'back') + 0.1) / 0.5);
    rGo.set(HX + 24, RY0, HX + 24 + (CX - HX - 48) * ug, RY0); rBk.set(CX - 24, RY0 + 44, CX - 24 - (CX - HX - 48) * ub, RY0 + 44);
    rGt.style.opacity = ug; rBt.style.opacity = ub;
    M.vis(rS, t, wt('X3', 'ends') - 0.1, 1e9, { dy: 8 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'quick') });
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

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
