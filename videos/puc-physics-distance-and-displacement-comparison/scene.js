// PUC Physics Ep 20: Distance and displacement comparison (Motion notebook, one bicycle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const SC = C.violet, DC = C.ac, IC = C.ink;          // colour-coding: distance s violet, displacement Δx blue, position x ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }, SPOP = { dy: 10, sp: M.SOFT, fade: 0.15 };   // SPOP for svg children (no scale)
const lin = x => M.clamp(x);
const sK = `\\textcolor{${SC}}{s}`, dK = `\\textcolor{${DC}}{\\Delta x}`, adK = `\\textcolor{${DC}}{|\\Delta x|}`;

Object.assign(M.IC, {
  bus: ['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10H4z', 'M4 11h16', 'M7 19v-3', 'M17 19v-3'],
  laps: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  bike: ['M2 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 17.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10l3 7.5h-6.5', 'M13 6h3l-1 4'],
  meter: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  teach: ['M2 3h20v13H2z', 'M7 21l5-5 5 5'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP3 = T0('P3'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV6 = T0('V6'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: two trips ---------- */
const JOBS = [['bus', 'City bus', 'DEPOT BACK TO DEPOT', 'bus'], ['laps', 'Runner', 'FOUR LAPS OF A TRACK', 'runner']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${560 + i * 420}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: two loops + Aarav's ride ---------- */
const HR = [['City bus', 'DEPOT TO DEPOT', 'M30,30 H130 V70 H90 V110 H30 Z'], ['Runner', 'FOUR LAPS OF THE TRACK', 'M50,30 H110 A40,40 0 0 1 110,110 H50 A40,40 0 0 1 50,30 Z']];
$('#hrs').innerHTML = HR.map(([n, w], i) => `<div class="hr" id="hr${i}" style="top:${84 + i * 196}px"><svg width="160" height="140" id="hrS${i}"></svg><div class="jn">${n}</div><div class="jw">${w}</div><div class="se">START = END</div></div>`).join('');
const hLoop = HR.map((h, i) => { const s = $('#hrS' + i); const p = mk(s, 'path', { d: h[2], fill: 'none', stroke: SC, 'stroke-width': 4, 'stroke-linejoin': 'round' }); mk(s, 'rect', { x: 20, y: 20, width: 20, height: 20, rx: 4, fill: '#fff', stroke: IC, 'stroke-width': 2.5 }); const d = mk(s, 'circle', { r: 9, fill: DC }); return { p, d }; });
const TILES = [['meter', 'Trip meter: 2 km', SC], ['teach', 'Teacher: moved 0', DC], ['help', 'Who is right?', IC]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}" style="color:${c}">${M.icon(ic, 26, c, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'trip'), wt('H4', 'teacher'), wt('H4', 'Who')];

/* ---------- P: what each one is ---------- */
const pl = $('#plS'), PA = [110, 400], PB = [660, 260];
const wig = 'M110,400 C160,180 300,160 300,300 C300,430 420,470 470,360 C520,250 430,170 560,150 C680,135 700,220 660,260';
const wig2 = 'M110,400 C200,480 340,470 380,380 C420,290 300,220 420,180 C540,140 600,330 660,260';
const lp = mk(pl, 'path', { d: wig, fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const lDot = mk(pl, 'circle', { r: 11, fill: SC });
const lGh = [0, 1, 2].map(() => mk(pl, 'circle', { r: 11, fill: SC, opacity: 0 }));
const pts = (s) => { [[PA, 'START'], [PB, 'END']].forEach(([p, l]) => { mk(s, 'circle', { cx: p[0], cy: p[1], r: 12, fill: '#fff', stroke: IC, 'stroke-width': 4 }); txt(s, p[0], p[1] + (l === 'START' ? 46 : -26), l, { 'text-anchor': 'middle', 'font-weight': 600, fill: IC }); }); };
pts(pl);
const lLab = txt(pl, 330, 120, 's = every bend adds up', { 'font-size': 22, fill: SC, 'font-weight': 600, 'text-anchor': 'middle' });
const pr = $('#prS');
const g1 = mk(pr, 'path', { d: wig, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const g2 = mk(pr, 'path', { d: wig2, fill: 'none', stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
pts(pr);
const pArr = PUC.arrow(pr, DC, 8, 24);
const pLab = txt(pr, 0, 0, 'Δx', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 36, fill: DC });
const pLab2 = txt(pr, 392, 130, 'any path, same arrow', { 'font-size': 22, fill: C.mute, 'font-weight': 600, 'text-anchor': 'middle' });

/* ---------- S: the ride (sim + readout + graph) ---------- */
const s = $('#simS'), RX = p => 100 + p * 0.8, RY = 330;      // 0.8 px per metre, home at x 100
mk(s, 'rect', { x: 50, y: RY, width: 684, height: 26, fill: '#D9DCE3' });
mk(s, 'line', { x1: 50, y1: RY + 13, x2: 734, y2: RY + 13, stroke: '#fff', 'stroke-width': 3, 'stroke-dasharray': '18 14' });
for (let m = 0; m <= 700; m += 100) { mk(s, 'line', { x1: RX(m), y1: RY + 30, x2: RX(m), y2: RY + 42, stroke: IC, 'stroke-width': 2 }); txt(s, RX(m), RY + 64, m, { 'text-anchor': 'middle', 'font-size': 17 }); }
txt(s, 734, RY + 92, 'x (m)', { 'text-anchor': 'end', 'font-size': 17 });
const house = (x, lab, col) => { const g = mk(s, 'g', {}); mk(g, 'path', { d: `M${x - 26},${RY - 6} V${RY - 46} L${x},${RY - 70} L${x + 26},${RY - 46} V${RY - 6} Z`, fill: '#fff', stroke: col, 'stroke-width': 3, 'stroke-linejoin': 'round' }); mk(g, 'rect', { x: x - 8, y: RY - 30, width: 16, height: 24, fill: col }); txt(g, x, RY - 84, lab, { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: col }); return g; };
const hHome = house(RX(0), 'HOME', IC), hLib = house(RX(600), 'LIBRARY', IC), hFr = house(RX(200), 'FRIEND', IC);
// distance trace (violet, above the road): outbound lane + return lane joined by a U-turn
const trO = mk(s, 'path', { fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const trR = mk(s, 'path', { fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const trL = txt(s, 0, 0, 's', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: SC });
const dArr = PUC.arrow(s, DC, 7, 20);
const dLab = txt(s, 0, 0, 'Δx', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: DC });
const pathArr = PUC.arrow(s, SC, 5, 16);
const bikeG = () => { const g = mk(s, 'g', {}); mk(g, 'circle', { cx: -18, cy: -16, r: 15, fill: 'none', stroke: IC, 'stroke-width': 3.5 }); mk(g, 'circle', { cx: 18, cy: -16, r: 15, fill: 'none', stroke: IC, 'stroke-width': 3.5 }); mk(g, 'path', { d: 'M-18,-16 L-6,-38 H12 L18,-16 M-6,-38 L2,-16 H-18 M12,-38 L9,-46 H17', fill: 'none', stroke: DC, 'stroke-width': 3.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); mk(g, 'path', { d: 'M-10,-46 H-1', stroke: IC, 'stroke-width': 4, 'stroke-linecap': 'round' }); return g; };
const bikeW = () => { const o = mk(s, 'g', {}); const b = bikeG(); o.appendChild(b); return o; };
const ghB = [0, 1, 2].map(() => bikeW()), bike = bikeW();
ghB.forEach((g, k) => g.setAttribute('opacity', [0.3, 0.2, 0.12][k]));
// readout
$('#roG').innerHTML = `<span class="k" style="color:${SC}">s</span><span class="v" id="ros" style="color:${SC}">0 m</span><span class="u">distance</span>
  <span class="k" style="color:${DC}">Δx</span><span class="v" id="rod" style="color:${DC}">0 m</span><span class="u">displacement</span>
  <span class="k" style="color:${IC}">x</span><span class="v" id="rox">0 m</span><span class="u">position</span>`;
// graph: metres vs ride time (5 m/s, 200 s for 1000 m)
const G = PUC.graph($('#grS'), { x: 110, y: 74, w: 600, h: 146, xmax: 200, ymax: 1000, xt: [0, 50, 100, 150], yt: [0, 500, 1000], xl: 't (s)' });
const gD = G.curve(DC, 9), gS = G.curve(SC, 4), gdS = G.dot(SC, 10), gdD = G.dot(DC, 10);
const posOf = sv => sv <= 600 ? sv : 1200 - sv;
// real time -> path length s (m)
const tGo = wt('S2', 'rides'), tAt = wt('S3', 'Up') - 0.1, tBack = wt('S4', 'rides'), tEnd = T1('S5') - 0.2;
const ride = t => t < tBack ? 600 * lin((t - tGo) / (tAt - tGo)) : 600 + 400 * lin((t - tBack) / (tEnd - tBack));
const rate = 0.25 * 600 / (tAt - tGo), tSl0 = tS6 + 0.1, tSl1 = tS8 - 0.15, sRep0 = Math.max(0, 600 - rate * 2.6);
const sAt = t => {
  let v = ride(t);
  if (t >= tSl0) { const w = M.io((t - tSl0) / 0.5), rep = Math.min(1000, sRep0 + rate * Math.max(0, t - tSl0 - 0.5)); v = M.lerp(1000, rep, w);
    if (t >= tSl1) { const w2 = M.io((t - tSl1) / 0.6); v = M.lerp(v, 1000, w2); } }
  return v;
};
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'My trip meter counts distance!' });

/* ---------- D: the rule ---------- */
const STEPS = [[`${sK} = 600 + 400 = \\textcolor{${SC}}{1000\\,\\text{m}}`, 'add every piece of the path'],
  [`${dK} = x_f - x_i = 200 - 0 = \\textcolor{${DC}}{200\\,\\text{m}}`, 'final position minus starting position'],
  [`${adK} \\le ${sK}`, 'the arrow is never longer than the path']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:132px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Distance'), wt('D3', 'Displacement'), wt('D4', 'So')];
const d = $('#drS'), DX = p => 100 + p * 0.85, DY = 330;
mk(d, 'line', { x1: 60, y1: DY, x2: 724, y2: DY, stroke: IC, 'stroke-width': 3 });
for (let m = 0; m <= 700; m += 100) { mk(d, 'line', { x1: DX(m), y1: DY - 8, x2: DX(m), y2: DY + 8, stroke: IC, 'stroke-width': 2 }); txt(d, DX(m), DY + 36, m, { 'text-anchor': 'middle', 'font-size': 17 }); }
[[0, 'HOME'], [600, 'LIBRARY'], [200, 'FRIEND']].forEach(([p, l]) => { mk(d, 'circle', { cx: DX(p), cy: DY, r: 9, fill: IC }); txt(d, DX(p), DY + 66, l, { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, fill: IC }); });
const dsO = mk(d, 'path', { d: `M${DX(0)},${DY - 120} H${DX(600)}`, fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const dsR = mk(d, 'path', { d: `M${DX(600)},${DY - 120} C${DX(600) + 40},${DY - 120} ${DX(600) + 40},${DY - 70} ${DX(600)},${DY - 70} H${DX(200)}`, fill: 'none', stroke: SC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const dl1 = txt(d, DX(300), DY - 136, '600 m', { 'text-anchor': 'middle', 'font-size': 24, fill: SC, 'font-weight': 600 });
const dl2 = txt(d, DX(400), DY - 82, '400 m', { 'text-anchor': 'middle', 'font-size': 24, fill: SC, 'font-weight': 600 });
const dA = PUC.arrow(d, DC, 8, 22);
const dl3 = txt(d, DX(100), DY + 120, 'Δx = +200 m', { 'text-anchor': 'middle', 'font-size': 26, fill: DC, 'font-weight': 600 });
const dTot = txt(d, 392, 150, 's = 1000 m', { 'text-anchor': 'middle', 'font-size': 30, fill: SC, 'font-weight': 600 });
const dCmp = txt(d, 392, 520, '|Δx| = 200 m  ≤  s = 1000 m', { 'text-anchor': 'middle', 'font-size': 26, fill: IC, 'font-weight': 600 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${adK} \\le ${sK}`);

/* ---------- C: reasoning, link by link ---------- */
const LK = [['A straight line is the shortest path', 'BETWEEN ANY TWO POINTS'], ['Displacement is that straight line', 'FROM START TO END'], ['Any real path is that line, or longer', 'BENDS AND TURNS ONLY ADD']];
$('#lks').innerHTML = LK.map(([a, b], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="tx">${a}</div><div class="tg">${b}</div></div>`).join('') +
  `<div class="lkc" id="lkc"><div class="a">SO</div><div class="b">${K(`\\textcolor{#C9B6F5}{s} \\ge \\textcolor{#AFC6F7}{|\\Delta x|}`)}</div><div class="c">equal only on a straight path,<br>no turning back</div></div>`;
const tLk = [T0('C2'), T0('C3'), T0('C4')];
const cr = $('#crS'), CA = [110, 430], CB = [670, 430], PXM = 560 / 100;     // 560 px = 100 m
const CP = [['arc', 'M110,430 Q390,70 670,430'], ['zigzag', 'M110,430 L180,350 L250,430 L320,350 L390,430 L460,350 L530,430 L600,350 L670,430'], ['loop', 'M110,430 C230,520 330,530 400,480 C470,430 450,370 400,380 C350,390 360,520 470,520 C570,520 630,480 670,430']];
const cPaths = CP.map(([, dd]) => mk(cr, 'path', { d: dd, fill: 'none', stroke: SC, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.85 }));
const cArr = PUC.arrow(cr, DC, 8, 24);
[[CA, 'START'], [CB, 'END']].forEach(([p, l]) => { mk(cr, 'circle', { cx: p[0], cy: p[1], r: 11, fill: '#fff', stroke: IC, 'stroke-width': 4 }); txt(cr, p[0], p[1] - 24, l, { 'text-anchor': 'middle', 'font-weight': 600, fill: IC }); });
const cLeg = [0, 1, 2, 3].map(i => txt(cr, 36, 96 + i * 34, '', { 'font-size': 22, 'font-weight': 600, fill: i ? SC : DC }));
const cStraight = 100;

/* ---------- K: side by side + think ---------- */
const DL = [['+200 m', 1], ['\u2212200 m', -1], ['0 m', 0]];
$('#dls').innerHTML = DL.map(([v], i) => `<div class="dl" id="dl${i}" style="top:${84 + i * 112}px"><svg id="dlS${i}" width="480" height="84"></svg><div class="val mono" style="color:${DC}">${v}</div></div>`).join('');
DL.forEach(([, dir], i) => { const sv = $('#dlS' + i); mk(sv, 'line', { x1: 30, y1: 52, x2: 450, y2: 52, stroke: C.dim, 'stroke-width': 2.5 }); const c = 240; mk(sv, 'circle', { cx: c, cy: 52, r: 8, fill: IC }); txt(sv, c, 80, 'start', { 'text-anchor': 'middle', 'font-size': 14 });
  if (dir) { const a = PUC.arrow(sv, DC, 7, 20); a.set(c, 30, c + dir * 170, 30); } else { txt(sv, 40, 30, 'ROUND TRIP', { 'font-size': 15, 'font-weight': 600, fill: SC }); mk(sv, 'path', { d: `M${c},44 C${c + 120},4 ${c + 160},20 ${c + 150},30 C${c + 130},44 ${c + 40},44 ${c + 8},44`, fill: 'none', stroke: SC, 'stroke-width': 4, 'stroke-dasharray': '6 6' }); } });
const tDl = [wt('K2', 'positive'), wt('K2', 'negative'), wt('K2', 'zero')];
const th1 = PUC.think($('#th1'), { q: 'Aarav cycles once around a round park and stops where he began. Is his displacement zero?', opts: ['Yes, zero', 'No'], right: 0, why: 'Same start and end, so the arrow has no length. His distance is the whole way round.' });

/* ---------- V: around a circle ---------- */
const v = $('#vcS'), VC = [392, 310], VR = 180;
mk(v, 'circle', { cx: VC[0], cy: VC[1], r: VR, fill: 'none', stroke: C.line, 'stroke-width': 4 });
mk(v, 'circle', { cx: VC[0], cy: VC[1], r: 6, fill: IC });
const vrl = mk(v, 'line', { x1: VC[0], y1: VC[1], x2: VC[0] - VR, y2: VC[1], stroke: IC, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
txt(v, VC[0] - VR / 2, VC[1] - 12, 'r', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 28, fill: IC, 'text-anchor': 'middle' });
const vArc = mk(v, 'path', { fill: 'none', stroke: SC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const vGh = [0, 1, 2].map(k => mk(v, 'circle', { r: 13, fill: IC, opacity: 0 }));
const vChord = PUC.arrow(v, DC, 7, 22);
mk(v, 'circle', { cx: VC[0] + VR, cy: VC[1], r: 11, fill: '#fff', stroke: IC, 'stroke-width': 4 });
txt(v, VC[0] + VR + 22, VC[1] + 6, 'START', { 'font-weight': 600, fill: IC });
const vDot = mk(v, 'circle', { r: 13, fill: IC });
const vP = th => [VC[0] + VR * Math.cos(th), VC[1] - VR * Math.sin(th)];
$('#vroG').innerHTML = `<span class="k" style="color:${IC}">θ</span><span class="v" id="vth">0°</span><span class="u">turned</span>
  <span class="k" style="color:${SC}">s</span><span class="v" id="vs" style="color:${SC}">0.00 r</span><span class="u">arc</span>
  <span class="k" style="color:${DC}">|Δx|</span><span class="v" id="vd" style="color:${DC}">0.00 r</span><span class="u">chord</span>`;
const VG = PUC.graph($('#vgS'), { x: 110, y: 74, w: 600, h: 146, xmax: 360, ymax: 6.4, xt: [0, 90, 180, 270], yt: [0, 2, 4, 6], xl: 'θ (°)' });
const vgS = VG.curve(SC, 5), vgD = VG.curve(DC, 5), vdS = VG.dot(SC, 10), vdD = VG.dot(DC, 10);
const tQt = wt('V3', 'quarter'), tHf = wt('V4', 'half'), tFl = wt('V5', 'full');
const thTr = M.keys([[0, 0], [tQt, 90], [tHf, 180], [tFl, 360]], 1.1, lin);
const th2 = PUC.think($('#th2'), { q: 'On any path, can the distance ever be less than the size of the displacement?', opts: ['Yes', 'Never'], right: 1, why: 'Displacement is the straight line, and nothing is shorter than a straight line.' });
const avV = PUC.avatar($('#sV'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A whole lap, and the arrow is gone.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${sK} = \\tfrac{1}{2}(2\\pi r) = \\pi r`)],
  [K(`${sK} = \\tfrac{22}{7} \\times 70 = \\textcolor{${SC}}{220\\,\\text{m}}`)],
  [K(`${adK} = 2r \\;\\text{(the diameter)}`)],
  [K(`${adK} = 2 \\times 70 = \\textcolor{${DC}}{140\\,\\text{m}}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 94 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Distance'), wt('W4', 'With'), wt('W5', 'Displacement'), wt('W6', 'Two')];
const w = $('#wrS'), WC = [392, 300], WR = 170;
mk(w, 'circle', { cx: WC[0], cy: WC[1], r: WR, fill: '#E2F3E9', stroke: '#8CC7A3', 'stroke-width': 3 });
for (let k = 0; k < 7; k++) { const a = k / 7 * 2 * Math.PI + 0.3; mk(w, 'circle', { cx: WC[0] + 105 * Math.cos(a), cy: WC[1] + 105 * Math.sin(a), r: 14, fill: '#9CCFA9' }); }
const wArc = mk(w, 'path', { d: `M${WC[0] - WR},${WC[1]} A${WR},${WR} 0 0 1 ${WC[0] + WR},${WC[1]}`, fill: 'none', stroke: SC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const wDia = PUC.arrow(w, DC, 7, 22);
[[WC[0] - WR, 'START'], [WC[0] + WR, 'END']].forEach(([x, l]) => { mk(w, 'circle', { cx: x, cy: WC[1], r: 11, fill: '#fff', stroke: IC, 'stroke-width': 4 }); txt(w, x, WC[1] + 40, l, { 'text-anchor': 'middle', 'font-weight': 600, fill: IC }); });
const wRl = txt(w, WC[0], WC[1] - WR - 22, 'radius r = 70 m', { 'text-anchor': 'middle', 'font-size': 20, fill: IC, 'font-weight': 600 });
$('#wcS').innerHTML = `<span style="font-style:italic;font-family:Poppins">s</span> = 220 m`; $('#wcD').innerHTML = `<span style="font-style:italic;font-family:Poppins">|Δx|</span> = 140 m`;

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'After one full round, displacement = 2πr', right: '2πr is the distance. Displacement = 0' });
const tp = $('#tpS'), TC = [190, 150], TR = 78;
const tRing = mk(tp, 'circle', { cx: TC[0], cy: TC[1], r: TR, fill: 'none', stroke: SC, 'stroke-width': 7, transform: `rotate(-90 ${TC[0]} ${TC[1]})` });
const tDot = mk(tp, 'circle', { cx: TC[0], cy: TC[1] - TR, r: 12, fill: DC });
const tL1 = txt(tp, TC[0], TC[1] + 6, '2πr', { 'text-anchor': 'middle', 'font-size': 26, fill: SC, 'font-weight': 600 });
const tL2 = txt(tp, TC[0], TC[1] - TR - 24, 'Δx = 0', { 'text-anchor': 'middle', 'font-size': 24, fill: DC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Short questions on a round trip or a circle: distance, displacement or their ratio' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A particle goes three quarters of the way around a circle of radius <i>R</i>. Ratio of distance to the magnitude of displacement?', qW: 780,
  opts: [K('\\dfrac{3\\pi}{2\\sqrt{2}}'), K('\\dfrac{3\\pi}{2}'), K('\\dfrac{\\pi}{\\sqrt{2}}'), K('\\dfrac{3\\pi}{4\\sqrt{2}}')], right: 0, optW: 474, optH: 104, optY: 330 });
const so = PUC.solution($('#so'), [[K(`${sK} = \\tfrac{3}{4}(2\\pi R) = \\tfrac{3\\pi R}{2}`)], [K(`${adK} = \\sqrt{2}\\,R \\;\\;(90^\\circ \\text{ apart})`)], [K(`\\tfrac{${sK}}{${adK}} = \\tfrac{3\\pi}{2\\sqrt{2}} \\approx 3.3`)]], { y0: 100, dy: 150 });
const tSo = [wt('A2', 'Distance'), wt('A3', 'start'), wt('A4', 'Divide')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · distance vs displacement', y0: 100, dy: 92, txt: [0, 1, 1, 0],
  lines: [K(`${sK} = \\text{total path (scalar)} \\qquad ${dK} = x_f - x_i \\;\\text{(vector)}`),
    '<b>Distance ≥ |displacement|</b>: equal only on a straight, one-way path', '<b>Round trip or full circle</b>: displacement = 0, distance is not',
    K(`\\text{Half circle: } ${sK} = \\pi r, \\;\\; ${adK} = 2r`)] });
const YQ = ['Can the distance be zero while the displacement is not?', 'When are distance and displacement exactly equal?', 'Displacement after half a lap of a circle of radius r?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 21', topic: 'Same speed, different velocity? Speed and Velocity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 + 0.2, 1.05, 900, 480], [tS8 + 0.1, 1, 960, 540]]);
const fm = n => Math.round(n) + ' m';
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const lens = cPaths.map(p => p.getTotalLength() / PXM);
  M.setT(cLeg[0], `straight  ${cStraight} m  = Δx`); CP.forEach(([n], i) => M.setT(cLeg[i + 1], `${n.padEnd(8, ' ')}  ${Math.round(lens[i])} m`));
  cLeg.forEach(l => l.setAttribute('xml:space', 'preserve'));
  hLoop.forEach(h => { h.L = h.p.getTotalLength(); });
  lp._L2 = lp.getTotalLength();
  $('#wcD').style.left = (36 + $('#wcS').offsetWidth + 24) + 'px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: the two trips pop in with their words */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    hLoop.forEach((h, i) => { const el = $('#hr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.15, 1e9, { dy: 16 });
      const u = M.clamp((t - tMorph - 0.4) / (i ? 1.0 : 2.4)), laps = i ? 4 : 1, f = (u * laps) % 1, done = u >= 1;
      M.drawU(h.p, i ? 1 : u); const pt = h.p.getPointAtLength(done ? 0 : f * h.L); attr(h.d, 'cx', pt.x.toFixed(1)); attr(h.d, 'cy', pt.y.toFixed(1));
      const on = M.io((t - wt('H2', 'exactly') + 0.1) / 0.3), se = el.querySelector('.se'); se.style.background = mix('#FFFFFF', C.ac, on); se.style.color = mix(C.mute, '#FFFFFF', on); se.style.borderColor = mix(C.line, C.ac, on); });
    M.vis($('#hjP'), t, wt('H2', 'started') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
  }

  /* P: distance vs displacement, defined */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const u = M.clamp((t - wt('P1', 'length')) / 2.6); M.drawU(lp, u);
    const pt = lp.getPointAtLength(u * lp._L2); attr(lDot, 'cx', pt.x.toFixed(1)); attr(lDot, 'cy', pt.y.toFixed(1)); M.hide(lDot, u <= 0);
    lGh.forEach((gc, k) => { const uk = M.clamp((t - 0.12 * (k + 1) - wt('P1', 'length')) / 2.6), q = lp.getPointAtLength(uk * lp._L2); attr(gc, 'cx', q.x.toFixed(1)); attr(gc, 'cy', q.y.toFixed(1)); gc.style.opacity = u > 0 && u < 1 ? [0.3, 0.2, 0.12][k] : 0; });
    M.vis(lLab, t, wt('P2', 'Every') - 0.1, 1e9, { dy: 8 });
    M.vis($('#plT'), t, wt('P2', 'scalar') - 0.1, 1e9, POP);
    M.vis($('#pr'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    const tAr = wt('P3', 'straight'), a = M.io((t - tAr) / 0.6);
    pArr.set(PA[0], PA[1], PA[0] + (PB[0] - PA[0]) * a, PA[1] + (PB[1] - PA[1]) * a);
    attr(pLab, 'x', 380); attr(pLab, 'y', 360); pLab.style.opacity = a.toFixed(3);
    const sw2 = M.io((t - wt('P4', 'path') + 0.2) / 0.4); g1.style.opacity = (1 - sw2).toFixed(3); g2.style.opacity = sw2.toFixed(3); M.hide(g1, t < tP3); M.hide(g2, t < tP3);
    M.vis(pLab2, t, wt('P4', 'care') - 0.1, 1e9, { dy: 8 });
    M.vis($('#prT'), t, wt('P4', 'vector') - 0.1, 1e9, POP);
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis(hHome, t, tS1 + 0.4, 1e9, SPOP); M.vis(hLib, t, wt('S2', 'library') - 0.1, 1e9, SPOP); M.vis(hFr, t, wt('S4', 'friend') - 0.1, 1e9, SPOP);
    const sv = sAt(t), px = posOf(sv), back = sv > 600, slo = t >= tSl0 && t < tSl1 + 0.3;
    // bike + ghosts
    const place = (g, sv2) => { const p2 = posOf(sv2); g.setAttribute('transform', `translate(${RX(p2).toFixed(1)},${RY}) scale(${sv2 > 600 ? -1 : 1},1)`); };
    place(bike, sv); bike.style.opacity = M.clamp((t - tS1 - 0.5) / 0.2).toFixed(3);
    ghB.forEach((g, k) => { const sg = sAt(t - (slo ? 0.4 : 0.1) * (k + 1)); place(g, sg); M.hide(g, Math.abs(RX(posOf(sg)) - RX(px)) < 4 || t < tGo); });
    // distance trace: outbound lane at y 230, return lane at y 252
    attr(trO, 'd', sv > 0 ? `M${RX(0)},176 H${RX(Math.min(sv, 600)).toFixed(1)}` : ''); M.hide(trO, sv <= 0);
    attr(trR, 'd', back ? `M${RX(600)},176 C${RX(600) + 22},176 ${RX(600) + 22},198 ${RX(600)},198 H${RX(px).toFixed(1)}` : ''); M.hide(trR, !back);
    attr(trL, 'x', (RX(Math.min(sv, 600) / 2) - 8).toFixed(1)); attr(trL, 'y', 158); trL.style.opacity = M.clamp(sv / 60).toFixed(3);
    // displacement arrow below the road, always from home
    dArr.set(RX(0), 450, RX(px), 450); attr(dLab, 'x', (RX(px / 2) - 16).toFixed(1)); attr(dLab, 'y', 494); dLab.style.opacity = M.clamp(px / 60).toFixed(3);
    // slow-mo: path increment arrow at the wheel
    const so2 = M.io((t - tSl0 - 0.6) / 0.4) * (1 - M.io((t - tSl1) / 0.3)), dir = back ? -1 : 1;
    pathArr.set(RX(px) + dir * 30, RY - 66, RX(px) + dir * (30 + 60 * so2), RY - 66);
    M.vis($('#slo'), t, tSl0, tSl1, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25 });
    // readout + graph (graph in ride seconds: 5 m/s)
    M.setT($('#ros'), fm(sv)); M.setT($('#rod'), (px > 0.5 ? '+' : '') + fm(px)); M.setT($('#rox'), fm(px));
    M.vis($('#exS'), t, tS1 + 0.8, 1e9, { dy: 8 });
    const tsim = sv / 5, hiS = Math.max(tsim, t >= tSl0 ? 200 : 0);
    gS(u => [u, 5 * u], 0, hiS); gD(u => [u, posOf(5 * u)], 0, hiS);
    gdS(tsim, sv, t > tGo - 0.2); gdD(tsim, px, t > tGo - 0.2);
    const sd = M.io((t - wt('S5', 'Displacement')) / 0.3); $('#rod').style.background = ''; $('#gr').style.boxShadow = '';
    $('#roG').querySelectorAll('.k')[1].style.textDecoration = sd > 0.5 && t < tSl0 ? 'underline' : '';
    avA(t, wt('S8', 'Distance') + 0.2, out);
  }

  /* D: the rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 240], [tStep[2] - 0.1, 396]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.draw(dsO, t, wt('D2', 'Six') - 0.1, 0.6); M.vis(dl1, t, wt('D2', 'Six'), 1e9, { dy: 8 });
    M.draw(dsR, t, wt('D2', 'four') - 0.1, 0.6); M.vis(dl2, t, wt('D2', 'four'), 1e9, { dy: 8 });
    M.vis(dTot, t, wt('D2', 'thousand', 1) - 0.1, 1e9, SPOP);
    const a = M.io((t - wt('D3', 'final') + 0.1) / 0.6); dA.set(DX(0), DY + 90, DX(0) + (DX(200) - DX(0)) * a, DY + 90); M.vis(dl3, t, wt('D3', 'Two') - 0.1, 1e9, { dy: 8 });
    M.vis(dCmp, t, wt('D4', 'never') - 0.1, 1e9, SPOP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Distance') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'shortcut'), 0.8);
  }

  /* C: reasoning */
  const cOn = t >= tC1 - 0.1 && t < tK1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('K1');
    M.vis($('#cl'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); const on = M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('C5'))) / 0.3)); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#lkc'), t, T0('C5') - 0.05, 1e9, { dy: 24 });
    M.vis($('#cr'), t, tC1 + 0.5, out, { dx: 60, dy: 0, ...o }); M.vis($('#exC'), t, tC1 + 0.9, 1e9, { dy: 8 });
    const a = M.io((t - wt('C2', 'straight') + 0.1) / 0.6); cArr.set(CA[0], CA[1], CA[0] + (CB[0] - CA[0]) * a, CA[1]);
    M.vis(cLeg[0], t, wt('C3', 'exactly') - 0.1, 1e9, { dy: 8 });
    const tp4 = [wt('C4', 'real'), wt('C4', 'longer'), wt('C4', 'bends')];
    cPaths.forEach((p, i) => { M.draw(p, t, tp4[i] - 0.1, 0.8); M.vis(cLeg[i + 1], t, tp4[i] + 0.4, 1e9, { dy: 8 }); });
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kl'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.count($('#odoN'), t, tK1 + 0.4, 3.0, 0, 1000); M.vis($('#odoL'), t, tK1 + 0.4, 1e9, { dy: 8 });
    [wt('K1', 'never'), wt('K1', 'never', 1), wt('K1', 'goes') + 0.5].forEach((tt, i) => M.vis($('#kp' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#kr'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    tDl.forEach((tt, i) => M.vis($('#dl' + i), t, tt - 0.15, 1e9, { dx: 24, dy: 0 }));
    M.vis($('#kpr'), t, wt('K2', 'Only') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'zero') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'He') });
  }

  /* V: around a circle */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V6');
    M.vis($('#vc'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#vro'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#vgr'), t, tV1 + 0.45, out, { dy: 36, ...o });
    const deg = thTr(t), th = deg * Math.PI / 180, [x, y] = vP(th);
    attr(vDot, 'cx', x.toFixed(1)); attr(vDot, 'cy', y.toFixed(1));
    vGh.forEach((g, k) => { const dk = thTr(t - 0.1 * (k + 1)), [gx, gy] = vP(dk * Math.PI / 180); attr(g, 'cx', gx.toFixed(1)); attr(g, 'cy', gy.toFixed(1)); g.style.opacity = Math.abs(dk - deg) > 1.5 ? [0.3, 0.2, 0.12][k] : 0; });
    const arcOn = t > wt('V2', 'violet') - 0.1;
    if (deg > 0.3 && arcOn) { const big = deg > 180 ? 1 : 0, e = deg >= 359.9 ? vP(359.9 * Math.PI / 180) : [x, y]; attr(vArc, 'd', `M${VC[0] + VR},${VC[1]} A${VR},${VR} 0 ${big} 0 ${e[0].toFixed(1)},${e[1].toFixed(1)}`); M.hide(vArc, false); } else M.hide(vArc, true);
    const ch = 2 * Math.sin(th / 2); vChord.set(VC[0] + VR, VC[1], x, y);
    M.setT($('#vth'), Math.round(deg) + '°'); M.setT($('#vs'), (th).toFixed(2) + ' r'); M.setT($('#vd'), Math.abs(ch).toFixed(2) + ' r');
    vgS(u => [u, u * Math.PI / 180], 0, deg); vgD(u => [u, 2 * Math.sin(u * Math.PI / 360)], 0, deg);
    vdS(deg, th, t > tV1 + 0.5); vdD(deg, Math.abs(ch), t > tV1 + 0.5);
    avV(t, wt('V5', 'zero') + 0.3, out);
    M.vis($('#th2'), t, tV6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tV6, tOpts: wt('V6', 'displacement') - 0.1, tCount: T1('V6') + 0.05, dur: 3, tAns: T0('V7') - 0.02, tWhy: wt('V7', 'The') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wRl, t, wt('W2', 'radius'), 1e9, { dy: 8 });
    M.draw(wArc, t, tW[0] - 0.1, 0.9);
    const a = M.io((t - tW[2] + 0.1) / 0.6); wDia.set(WC[0] - WR, WC[1], WC[0] - WR + 2 * WR * a, WC[1]);
    M.vis($('#wcS'), t, wt('W4', 'hundred') + 0.2, 1e9, POP); M.vis($('#wcD'), t, wt('W6', 'forty') + 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'after') - 0.1, tStrike: wt('X3', 'distance') - 0.1, tRight: wt('X3', 'distance') + 0.3 });
    M.draw(tRing, t, wt('X2', 'full') - 0.1, 1.2); M.vis(tL1, t, wt('X3', 'two') - 0.1, 1e9, { dy: 8 });
    const u = M.clamp((t - wt('X2', 'full') + 0.1) / 1.2), an = -Math.PI / 2 + u * 2 * Math.PI; attr(tDot, 'cx', (TC[0] + TR * Math.cos(an)).toFixed(1)); attr(tDot, 'cy', (TC[1] + TR * Math.sin(an)).toFixed(1));
    M.vis(tL2, t, wt('X3', 'zero') - 0.1, 1e9, SPOP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'short') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
