// PUC Physics Ep 28: Velocity-time graphs (Motion notebook, one bicycle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, XC = C.violet;      // colour-coding: v blue, a red, displacement / area violet
const XB = '#EFE9FC', IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, s, col, a = {}) => txt(p, 0, 0, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const f1 = v => (Math.abs(v) < 0.05 ? 0 : v).toFixed(1);

Object.assign(M.IC, {
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M5.5 17.5 9 10h6l3.5 7.5', 'M9 10l3 7.5', 'M14 6h2l1 4'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 18h5', 'M16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
});

/* ---------- a bicycle drawn in svg, wheels with spokes that turn ---------- */
const bicycle = (p, s = 1) => {
  const g0 = mk(p, 'g', {}), g = mk(g0, 'g', {}), r = 26 * s, wb = 30 * s, W = [];
  [-wb, wb].forEach(cx => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx: 0, cy: 0, r, fill: '#fff', stroke: C.ink, 'stroke-width': 4 * s });
    for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; mk(w, 'line', { x1: -r * Math.cos(an), y1: -r * Math.sin(an), x2: r * Math.cos(an), y2: r * Math.sin(an), stroke: C.dim, 'stroke-width': 2 * s }); }
    W.push([w, cx]); });
  mk(g, 'path', { d: `M${-wb},0 L${-6 * s},0 L${wb * 0.55},${-30 * s} L${-wb * 0.45},${-30 * s} Z M${-6 * s},0 L${-wb * 0.55},${-40 * s} M${wb * 0.55},${-30 * s} L${wb},0 M${wb * 0.55},${-30 * s} L${wb * 0.45},${-44 * s}`, fill: 'none', stroke: '#2B3F8C', 'stroke-width': 5 * s, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${-wb * 0.72},${-41 * s} h${16 * s}`, stroke: C.ink, 'stroke-width': 6 * s, 'stroke-linecap': 'round' });
  mk(g, 'path', { d: `M${wb * 0.3},${-45 * s} h${14 * s}`, stroke: C.ink, 'stroke-width': 5 * s, 'stroke-linecap': 'round' });
  return { g: g0, set(x, y, rotDeg) { attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); W.forEach(([w, cx]) => attr(w, 'transform', `translate(${cx},0) rotate(${rotDeg.toFixed(1)})`)); } };
};

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tK1 = T0('K1'), tK3 = T0('K3'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1');
const tB1 = T0('B1'), tB4 = T0('B4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tB1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three meters ---------- */
const JOBS = [['bus', 'Bus', 'SPEEDOMETER', '40', 'km/h', 'bus'], ['zap', 'Bowler', 'SPEED GUN', '120', 'km/h', 'gun'], ['bike', 'Bicycle', 'SPEED METER', '6', 'm/s', 'bicycle']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, u], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n} ${w.toLowerCase()}</div><div class="jy">HOW FAST: YES</div><div class="jx">HOW FAR: NO</div><div class="jv">${v} <small>${u}</small></div></div>`).join('');
const TILES = [['gauge', 'speed readings'], ['chart', 'a graph'], ['ruler', 'how far']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${i ? M.icon('arrowR', 22, C.mute, 2.4) : ''}${M.icon(ic, 24, i === 2 ? XC : VC, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H5', 'readings'), wt('H5', 'graph'), wt('H5', 'tells')];

/* ---------- P: what is a v-t graph ---------- */
const pgS = $('#pgS'), pgG = mk(pgS, 'g', {});
const pg = PUC.graph(pgG, { x: 110, y: 96, w: 600, h: 300, xmax: 10, ymax: 8, xt: [0, 2, 4, 6, 8], yt: [0, 4, 8], xl: 't (s)', yl: 'v (m/s)' });
attr(pg.ylab, 'fill', VC); attr(pg.ylab, 'font-weight', 600);
const pgA = [mk(pgS, 'path', { d: `M110,${96 + 300} H710`, stroke: C.ink, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }), mk(pgS, 'path', { d: `M110,${96 + 300} V96`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' })];
const pgGd = mk(pgS, 'path', { d: `M${pg.X(2)},${pg.Y(0)} V${pg.Y(3)} H${pg.X(0)}`, stroke: C.mute, 'stroke-width': 2, 'stroke-dasharray': '6 6', fill: 'none' });
const pgDot = mk(pgS, 'circle', { cx: pg.X(2), cy: pg.Y(3), r: 11, fill: VC });
const pgL = txt(pgS, pg.X(2) + 22, pg.Y(3) - 16, 't = 2 s,  v = 3 m/s', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const PT = [['Position-time', 'x AGAINST t', 'Where is it?', XC, 'M10,110 C50,100 80,40 150,20'], ['Velocity-time', 'v AGAINST t', 'How fast, and which way?', VC, 'M10,110 L70,40 L150,40']];
$('#pts').innerHTML = PT.map(([h, s, q, c, d], i) => `<div class="pt" id="pt${i}" style="top:${84 + i * 200}px;height:180px"><div class="h" style="color:${c}">${h}</div><div class="s">${s}</div><div class="q" style="top:108px">${q}</div>
  <svg width="160" height="130"><path d="M10,10 V120 H155" fill="none" stroke="${C.ink}" stroke-width="3"/><path d="${d}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`).join('');

/* ---------- S: the ride ---------- */
const xR = u => u < 4 ? 0.75 * u * u : u < 8 ? 12 + 6 * (u - 4) : u < 11 ? 36 + 6 * (u - 8) - (u - 8) * (u - 8) : 45;
const vR = u => u <= 0 ? 0 : u < 4 ? 1.5 * u : u < 8 ? 6 : u < 11 ? 6 - 2 * (u - 8) : 0;
const aR = u => u <= 0 || u >= 11 ? 0 : u < 4 ? 1.5 : u < 8 ? 0 : -2;
const s = $('#simS'), RX = 100, PXM = 13, RY = 400;
mk(s, 'line', { x1: 40, y1: RY + 26, x2: 744, y2: RY + 26, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 45; m += 5) { const x = RX + m * PXM; mk(s, 'line', { x1: x, y1: RY + 26, x2: x, y2: RY + 26 + (m % 15 ? 10 : 18), stroke: C.ink, 'stroke-width': 2 }); if (m % 15 === 0) txt(s, x, RY + 68, m + ' m', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
txt(s, RX + 45 * PXM, RY + 94, 'GATE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const ghS = [0.3, 0.2, 0.12].map(op => { const b = bicycle(s, 1.25); b.g.style.opacity = 0; b.op = op; return b; });
const bike = bicycle(s, 1.25);
const sV = PUC.arrow(s, VC, 7, 20), sA = PUC.arrow(s, AC, 7, 20), sVL = sym(s, 'v', VC), sAL = sym(s, 'a', AC);
$('#roG').innerHTML = `<span class="k" style="color:${C.ink}">t</span><span class="v" id="rot">0.0</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rov" style="color:${VC}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="roa" style="color:${AC}">0.0</span><span class="u">m/s²</span>`;
const sg = PUC.graph($('#grS'), { x: 110, y: 64, w: 600, h: 150, xmax: 13, ymax: 8, xt: [0, 4, 8, 11], yt: [0, 6], xl: 't (s)', yl: 'v (m/s)' });
attr(sg.ylab, 'x', 124); attr(sg.ylab, 'fill', VC);
const sgC = sg.curve(VC), sgD = sg.dot(VC);
const PH = [['SPEEDING UP', VC], ['STEADY', C.ink], ['SLOWING DOWN', AC], ['STOPPED', C.mute]];
const SHP = [['M2 20 L22 4', VC, 'Up: speeding up'], ['M2 12 H22', C.ink, 'Flat: steady'], ['M2 4 L22 20', AC, 'Down: slowing down']];
$('#shps').innerHTML = SHP.map(([d, c, w], i) => `<div class="shp" id="shp${i}"><svg width="24" height="24"><path d="${d}" stroke="${c}" stroke-width="4" stroke-linecap="round"/></svg><span>${w}</span></div>`).join('');
const tShp = [wt('S6', 'Up'), wt('S6', 'Flat'), wt('S6', 'Down')];
// sim clock tau(t): ride anchored to the words, then a slow-mo replay of the braking, then it finishes
const tGo = wt('S2', 'starts'), tC = wt('S3', 'cruises'), tBr = wt('S4', 'brakes'), tStop = wt('S4', 'stops');
const tRp = tS5 + 0.5, tRe = T1('S5'), uRe = 8 + 0.25 * (tRe - tRp - 0.6);
const tau = t => {
  if (t < tS5) { if (t < tGo) return 0; if (t < tC) return 4 * (t - tGo) / (tC - tGo); if (t < tBr) return 4 + 4 * (t - tC) / (tBr - tC); return Math.min(11, 8 + 3 * (t - tBr) / (tStop + 0.6 - tBr)); }
  if (t < tRp + 0.6) return 8;                       // freeze, tag, vectors grow
  if (t < tRe) return 8 + 0.25 * (t - tRp - 0.6);   // 0.25x
  return Math.min(11, uRe + 3 * (t - tRe) / 1.2);
};

/* ---------- K: side by side ---------- */
const kx = $('#kxS'), kv = $('#kvS');
[kx, kv].forEach(p => { mk(p, 'line', { x1: 40, y1: 176, x2: 744, y2: 176, stroke: C.ink, 'stroke-width': 3 }); });
const kBike = bicycle(kx, 0.9), vBike = bicycle(kv, 0.9), vGh = [0.3, 0.2, 0.12].map(op => { const b = bicycle(kv, 0.9); b.op = op; b.g.style.opacity = 0; return b; });
kBike.set(380, 150, 0);
const kxG = PUC.graph(kx, { x: 110, y: 214, w: 600, h: 210, xmax: 10, ymax: 30, xt: [0, 5], yt: [0, 20], xl: 't (s)', yl: 'x (m)' }); attr(kxG.ylab, 'fill', XC);
const kvG = PUC.graph(kv, { x: 110, y: 214, w: 600, h: 210, xmax: 10, ymax: 8, xt: [0, 5], yt: [0, 6], xl: 't (s)', yl: 'v (m/s)' }); attr(kvG.ylab, 'fill', VC);
const kxC = kxG.curve(XC), kvC = kvG.curve(VC);
const th1 = PUC.think($('#th1'), { q: 'A velocity-time graph is flat at 6 m/s. Is the bicycle at rest or moving?', opts: ['At rest', 'Moving'], right: 1, why: 'Its velocity stays 6 m/s. Only its acceleration is zero.' });

/* ---------- D: slope = acceleration ---------- */
const DST = [[`\\textcolor{${AC}}{a} = \\dfrac{\\Delta \\textcolor{${VC}}{v}}{\\Delta t}`, 'change in velocity ÷ time taken'],
  [`\\Delta \\textcolor{${VC}}{v} = \\text{rise}, \\quad \\Delta t = \\text{run}`, 'read both straight off the graph'],
  [`\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\textcolor{${AC}}{a}`, 'how steep the line is = acceleration']];
$('#dsteps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:140px"></div>` + DST.map(([f, w], i) => `<div class="st8" id="dst${i}" style="top:${84 + i * 150}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:${i === 1 ? 64 : 108}px">${w}</div></div>`).join('');
const tDst = [wt('D2', 'Acceleration'), wt('D3', 'On'), wt('D4', 'Slope')];
const dS = $('#drS'), dG = PUC.graph(dS, { x: 110, y: 96, w: 600, h: 330, xmax: 13, ymax: 8, xt: [0, 4, 8, 11], yt: [0, 6], xl: 't (s)', yl: 'v (m/s)' });
attr(dG.ylab, 'fill', VC);
const rideD = `M${dG.X(0)},${dG.Y(0)} L${dG.X(4)},${dG.Y(6)} L${dG.X(8)},${dG.Y(6)} L${dG.X(11)},${dG.Y(0)}`;
const dLine = mk(dS, 'path', { d: rideD, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const dRun = [mk(dS, 'path', { d: `M${dG.X(0)},${dG.Y(0) - 3} H${dG.X(4)}`, stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '8 6', fill: 'none' }), mk(dS, 'path', { d: `M${dG.X(8)},${dG.Y(6)} H${dG.X(11)}`, stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '8 6', fill: 'none' })];
const dRise = [mk(dS, 'path', { d: `M${dG.X(4)},${dG.Y(0)} V${dG.Y(6)}`, stroke: AC, 'stroke-width': 5, fill: 'none' }), mk(dS, 'path', { d: `M${dG.X(11)},${dG.Y(6)} V${dG.Y(0)}`, stroke: AC, 'stroke-width': 5, fill: 'none' })];
const dRunL = [txt(dS, dG.X(2), dG.Y(0) - 16, 'run 4 s', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }), txt(dS, dG.X(9.5), dG.Y(6) - 16, 'run 3 s', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 })];
const dRiseL = [txt(dS, dG.X(4) + 14, dG.Y(3), 'rise 6 m/s', { 'font-size': 22, fill: AC, 'font-weight': 600 }), txt(dS, dG.X(11) + 14, dG.Y(3), 'rise −6', { 'font-size': 22, fill: AC, 'font-weight': 600 })];
$('#dr0').innerHTML = K(`\\textcolor{${AC}}{a} = \\tfrac{6}{4} = \\textcolor{${AC}}{1.5\\,\\text{m/s}^2}`);
$('#dr1').innerHTML = K(`\\textcolor{${AC}}{a} = \\tfrac{-6}{3} = \\textcolor{${AC}}{-2\\,\\text{m/s}^2}`);

/* ---------- R: area = displacement ---------- */
const RST = [[`\\textcolor{${XC}}{x} = \\textcolor{${VC}}{v} \\times t`, 'steady velocity: displacement = velocity × time'],
  [`\\textcolor{${VC}}{v} \\times t = \\text{height} \\times \\text{width}`, 'that is the area of a rectangle'],
  [`\\text{m/s} \\times \\text{s} = \\textcolor{${XC}}{\\text{m}}`, 'the units agree: area is in metres']];
$('#rsteps').innerHTML = RST.map(([f, w], i) => `<div class="st8" id="rst${i}" style="top:${84 + i * 126}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:66px">${w}</div></div>`).join('');
const tRst = [wt('R2', 'displacement'), wt('R2', 'height'), wt('R3', 'units')];
const rS = $('#rrS'), rG = PUC.graph(rS, { x: 110, y: 96, w: 600, h: 330, xmax: 13, ymax: 8, xt: [0, 4, 8, 11], yt: [0, 6], xl: 't (s)', yl: 'v (m/s)' });
attr(rG.ylab, 'fill', VC);
const poly = pts => 'M' + pts.map(([a, b]) => rG.X(a).toFixed(1) + ',' + rG.Y(b).toFixed(1)).join(' L') + ' Z';
const rA = [poly([[0, 0], [4, 6], [4, 0]]), poly([[4, 0], [4, 6], [8, 6], [8, 0]]), poly([[8, 0], [8, 6], [11, 0]])].map(d => mk(rS, 'path', { d, fill: XB, stroke: XC, 'stroke-width': 2.5 }));
mk(rS, 'path', { d: rideD.replace(/dG/g, ''), stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const rL = [[2.9, 1.6, '12 m'], [6, 3, '24 m'], [9, 1.6, '9 m']].map(([a, b, w]) => txt(rS, rG.X(a), rG.Y(b) + 9, w, { 'text-anchor': 'middle', 'font-size': 28, fill: XC, 'font-weight': 600 }));
const rHW = txt(rS, rG.X(6), rG.Y(3) + 9, '6 × 4', { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 });
$('#rTot').innerHTML = K(`12 + 24 + 9 = \\textcolor{${XC}}{45\\,\\text{m}}`);
const avA = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So the graph is my distance meter!' });

/* ---------- statement ---------- */

/* ---------- B: below the axis (trolley) ---------- */
const xB = u => 8 * u - u * u, vB = u => 8 - 2 * u;
const bs = $('#bsS'), P0 = [80, 470], P1 = [720, 190], SL = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]), ux = (P1[0] - P0[0]) / SL, uy = (P1[1] - P0[1]) / SL, BPX = 36, ANG = Math.atan2(uy, ux) * 180 / Math.PI;
mk(bs, 'path', { d: `M${P0[0]},${P0[1]} L${P1[0]},${P1[1]} L${P1[0]},${P0[1]} Z`, fill: C.soft, stroke: 'none' });
mk(bs, 'line', { x1: P0[0], y1: P0[1], x2: P1[0], y2: P1[1], stroke: C.ink, 'stroke-width': 3 });
mk(bs, 'line', { x1: 40, y1: P0[1], x2: 744, y2: P0[1], stroke: C.ink, 'stroke-width': 3 });
const trolley = () => { const g = mk(bs, 'g', {}); mk(g, 'rect', { x: -36, y: -50, width: 72, height: 36, rx: 6, fill: C.ink }); mk(g, 'circle', { cx: -20, cy: -9, r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); mk(g, 'circle', { cx: 20, cy: -9, r: 9, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); return g; };
const ghB = [0.3, 0.2, 0.12].map(op => { const g = trolley(); g.op = op; g.style.opacity = 0; return g; }), trl = trolley();
const bPos = m => [P0[0] + ux * (60 + m * BPX), P0[1] + uy * (60 + m * BPX)];
const bV = PUC.arrow(bs, VC, 7, 20), bA = PUC.arrow(bs, AC, 7, 20), bVL = sym(bs, 'v', VC), bAL = sym(bs, 'a', AC);
$('#bro').innerHTML = `<span class="k" style="color:${C.ink}">t</span><span class="v" id="bt">0.0</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="bv" style="color:${VC}">8.0</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="ba" style="color:${AC}">-2.0</span><span class="u">m/s²</span>`;
const bgS = $('#bgS'), bG = PUC.graph(bgS, { x: 110, y: 90, w: 600, h: 340, xmax: 9, ymin: -8, ymax: 8, xt: [0, 4, 8], yt: [-8, 0, 8], xl: 't (s)', yl: 'v (m/s)' });
attr(bG.ylab, 'fill', VC); attr(bG.ylab, 'x', 124);
const bAr = [mk(bgS, 'path', { d: `M${bG.X(0)},${bG.Y(0)} L${bG.X(0)},${bG.Y(8)} L${bG.X(4)},${bG.Y(0)} Z`, fill: XB, stroke: XC, 'stroke-width': 2 }), mk(bgS, 'path', { d: `M${bG.X(4)},${bG.Y(0)} L${bG.X(8)},${bG.Y(-8)} L${bG.X(8)},${bG.Y(0)} Z`, fill: '#F6EEF0', stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '7 6' })];
const bArL = [txt(bgS, bG.X(1.3), bG.Y(2.2), '+16 m', { 'text-anchor': 'middle', 'font-size': 26, fill: XC, 'font-weight': 600 }), txt(bgS, bG.X(6.7), bG.Y(-2.2) + 8, '−16 m', { 'text-anchor': 'middle', 'font-size': 26, fill: XC, 'font-weight': 600 })];
const bgC = bG.curve(VC), bgD = bG.dot(VC);
const tPush = wt('B2', 'pushed'), tBs = wt('B2', 'stops'), tBe = wt('B3', 'negative');
const tauB = t => t < tPush ? 0 : t < tBs ? 4 * (t - tPush) / (tBs - tPush) : Math.min(8, 4 + 4 * (t - tBs) / (tBe - tBs));
const th2 = PUC.think($('#th2'), { q: 'The line reaches zero at 4 s, then goes below the axis. What happens at 4 s?', opts: ['It stops for good', 'It turns around'], right: 1, why: 'At rest for one instant, then it moves the other way.' });
const tBArea = wt('B5', 'Area');

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${AC}}{a} = \\dfrac{20 - 10}{5} = \\textcolor{${AC}}{2\\,\\text{m/s}^2}`)],
  [K(`\\textcolor{${XC}}{x} = \\text{area} = \\tfrac{1}{2}(\\textcolor{${VC}}{u} + \\textcolor{${VC}}{v})\\,t`)],
  [K(`\\textcolor{${XC}}{x} = \\tfrac{1}{2}(10 + 20) \\times 5 = 15 \\times 5`)],
  [K(`\\textcolor{${XC}}{x} = 75\\,\\text{m}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Slope'), wt('W4', 'Half'), wt('W5', 'Half'), wt('W6', 'So')];
const wS = $('#wrS'), wG = PUC.graph(wS, { x: 110, y: 96, w: 600, h: 330, xmax: 6, ymax: 25, xt: [0, 5], yt: [0, 10, 20], xl: 't (s)', yl: 'v (m/s)' });
attr(wG.ylab, 'fill', VC);
const wTrap = mk(wS, 'path', { d: `M${wG.X(0)},${wG.Y(0)} L${wG.X(0)},${wG.Y(10)} L${wG.X(5)},${wG.Y(20)} L${wG.X(5)},${wG.Y(0)} Z`, fill: XB, stroke: XC, 'stroke-width': 2.5 });
const wLine = mk(wS, 'path', { d: `M${wG.X(0)},${wG.Y(10)} L${wG.X(5)},${wG.Y(20)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const wRun = mk(wS, 'path', { d: `M${wG.X(0)},${wG.Y(10)} H${wG.X(5)}`, stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '8 6', fill: 'none' });
const wRise = mk(wS, 'path', { d: `M${wG.X(5)},${wG.Y(10)} V${wG.Y(20)}`, stroke: AC, 'stroke-width': 5, fill: 'none' });
const wRunL = txt(wS, wG.X(2.5), wG.Y(10) + 30, 'run 5 s', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const wRiseL = txt(wS, wG.X(5) + 14, wG.Y(15) + 8, 'rise 10', { 'font-size': 22, fill: AC, 'font-weight': 600 });
const wSide = [txt(wS, wG.X(0) + 14, wG.Y(5) + 8, '10', { 'font-size': 24, fill: VC, 'font-weight': 600 }), txt(wS, wG.X(5) - 14, wG.Y(5) + 8, '20', { 'text-anchor': 'end', 'font-size': 24, fill: VC, 'font-weight': 600 })];
$('#wa0').innerHTML = K(`\\textcolor{${AC}}{a = 2\\,\\text{m/s}^2}`); $('#wa1').innerHTML = K(`\\textcolor{${XC}}{x = 75\\,\\text{m}}`);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Line slopes down, so it moves backward', right: 'Above the axis v > 0: still forward, just slower' });
const tg = $('#tg'), tG = PUC.graph(tg, { x: 70, y: 40, w: 400, h: 160, xmax: 6, ymin: -2, ymax: 8, xl: 't', yl: 'v' });
attr(tG.ylab, 'fill', VC);
const tgA = mk(tg, 'path', { d: `M${tG.X(0)},${tG.Y(0)} L${tG.X(0)},${tG.Y(7)} L${tG.X(5)},${tG.Y(1.5)} L${tG.X(5)},${tG.Y(0)} Z`, fill: C.okBg, stroke: 'none' });
const tgL = mk(tg, 'path', { d: `M${tG.X(0)},${tG.Y(7)} L${tG.X(5)},${tG.Y(1.5)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const tgT = txt(tg, tG.X(1.4), tG.Y(1.6), 'v > 0', { 'font-size': 24, fill: '#1F6B3F', 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Graph reading: the slope gives acceleration, the area gives displacement or distance' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A particle’s velocity falls uniformly from +8 m/s to −4 m/s in 6 s. What distance does it cover in these 6 s?', qW: 780,
  opts: ['12 m', '20 m', '24 m', '36 m'], right: 1, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\text{slope} = \\tfrac{-4 - 8}{6} = \\textcolor{${AC}}{-2}`)], [K(`\\textcolor{${VC}}{v} = 0 \\text{ at } t = 4\\,\\text{s}`)], [K(`\\text{above: } \\tfrac{1}{2}\\cdot 4 \\cdot 8 = \\textcolor{${XC}}{16\\,\\text{m}}`)], [K(`\\text{below: } \\tfrac{1}{2}\\cdot 2 \\cdot 4 = \\textcolor{${XC}}{4\\,\\text{m}}`)], [K(`\\text{distance} = 16 + 4 = \\textcolor{${C.ok}}{20\\,\\text{m}}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'slope'), wt('A2', 'crosses'), wt('A2', 'above'), wt('A3', 'below'), wt('A3', 'Distance')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · velocity-time graphs', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\text{slope} = \\textcolor{${AC}}{a} \\qquad \\text{area} = \\textcolor{${XC}}{\\text{displacement}}`),
    '<b>Up</b>: speeding up &nbsp;·&nbsp; <b>Flat</b>: steady &nbsp;·&nbsp; <b>Down</b>: slowing down', '<b>Below the axis</b>: <i>v</i> &lt; 0, moving backward', '<b>Distance</b>: add every area as positive'] });
const YQ = ['What does a flat line on a velocity-time graph mean?', 'Why does the area under the line give the displacement?', 'What happens when the line crosses the time axis?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 29', topic: 'You feel the braking, never the speed. Acceleration-Time Graphs', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 - 0.1, 1.1, 600, 560], [tS6 + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  x = 36; [0, 1, 2].forEach(i => { const e = $('#shp' + i); e.style.left = x + 'px'; x += e.offsetWidth + 12; });
  $('#dr1').style.left = (36 + $('#dr0').offsetWidth + 24) + 'px';
  $('#wa1').style.left = (36 + $('#wa0').offsetWidth + 24) + 'px';
}
const pathOf = (G, f, a, b) => { let d = ''; for (let i = 0; i <= 40; i++) { const u = a + (b - a) * i / 40; d += (i ? 'L' : 'M') + G.X(u).toFixed(1) + ',' + G.Y(f(u)).toFixed(1); } return d; };

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
    M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      M.vis(el.querySelector('.jy'), t, wt('H2', 'fast') - 0.1 + i * 0.08, 1e9, { dy: 8 }); M.vis(el.querySelector('.jx'), t, wt('H2', 'far') - 0.1 + i * 0.08, 1e9, { dy: 8 }); });
    M.vis($('#hjP'), t, wt('H2', 'far') + 0.4, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#meter'), t, wt('H3', 'speed') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    M.count($('#mvN'), t, wt('H3', 'speed'), 2.4, 0, 6, v => v.toFixed(1));
    M.vis($('#nodist'), t, wt('H4', 'distance') - 0.1, 1e9, POP);
    TILES.forEach((_, i) => M.vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pg'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(pgG, t, tP1 + 0.4, 1e9, { dy: 0, fade: 0.3 });
    M.draw(pgA[0], t, wt('P2', 'Time') - 0.1, 0.6); M.draw(pgA[1], t, wt('P2', 'Velocity') - 0.1, 0.6);
    M.draw(pgGd, t, wt('P3', 'moment') - 0.2, 0.5); M.vis(pgDot, t, wt('P3', 'point') - 0.05, 1e9, { ...POP, sc: 0.2 }); M.vis(pgL, t, wt('P3', 'fast') - 0.1, 1e9, { dy: 8 });
    M.vis($('#pgC'), t, wt('P3', 'reading') - 0.1, 1e9, POP);
    M.vis($('#pc'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#pt0'), t, wt('P4', 'position') - 0.1, 1e9, { dy: 16 }); M.vis($('#pt1'), t, wt('P4', 'graph', 1) - 0.1, 1e9, { dy: 16 });
    M.vis($('#pcC'), t, wt('P4', 'way') - 0.1, 1e9, POP);
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tK1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('K1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const u = tau(t), x = RX + xR(u) * PXM, rot = xR(u) * PXM / 26 * 57.2958;
    bike.set(x, RY - 6, rot / 1.25); M.vis(bike.g, t, tS1 + 0.4, 1e9, { dx: -40, dy: 0 });
    ghS.forEach((g, k) => { const ug = tau(t - 0.16 * (k + 1)), xg = RX + xR(ug) * PXM; g.set(xg, RY - 6, xR(ug) * PXM / 32.5 * 57.2958); g.g.style.opacity = Math.abs(x - xg) > 4 ? g.op : 0; });
    const slow = t >= tRp && t < tRe + 0.2, vOn = slow ? M.io((t - tRp - 0.2) / 0.4) : 1;
    const v = vR(u), a = aR(u), vy = RY - 116, ay = RY - 156;
    sV.set(x, vy, x + v * 16 * vOn, vy); attr(sVL, 'x', (x + v * 16 * vOn + 8).toFixed(1)); attr(sVL, 'y', vy + 10); sVL.style.opacity = v * vOn > 0.3 ? 1 : 0;
    const aL = a * 44 * (slow ? M.io((t - tRp - 0.5) / 0.4) : 1); sA.set(x, ay, x + aL, ay); attr(sAL, 'x', (x + aL + (aL < 0 ? -26 : 8)).toFixed(1)); attr(sAL, 'y', ay + 10); sAL.style.opacity = Math.abs(aL) > 4 ? 1 : 0;
    const ph = u <= 0.001 && t < tGo + 0.1 ? -1 : u < 4 ? 0 : u < 8 ? 1 : u < 10.98 ? 2 : 3, pe = $('#ph');
    if (ph >= 0) { M.setT(pe, PH[ph][0]); pe.style.background = PH[ph][1]; } M.vis(pe, t, tGo, 1e9, POP);
    M.vis($('#slo'), t, tRp - 0.1, tRe + 0.1, POP);
    M.setT($('#smN'), f1(v)); M.vis($('#smt'), t, tS1 + 0.7, 1e9, { dy: -20, sp: M.SOFT });
    M.setT($('#rot'), f1(u)); M.setT($('#rov'), f1(v)); M.setT($('#roa'), f1(a));
    const um = t < tS5 ? u : 11;
    sgC(w => [w, vR(w)], 0, um); sgD(u, vR(u), t >= tGo - 0.2);
    SHP.forEach((_, i) => M.vis($('#shp' + i), t, tShp[i] - 0.1, 1e9, POP));
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tD1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kx'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    kxC(w => [w, 20], 0, 10 * M.clamp((t - wt('K1', 'flat')) / 1.6));
    M.vis($('#kxC'), t, wt('K1', 'parked') - 0.1, 1e9, POP);
    M.vis($('#kv'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const k0 = T0('K2'), k1 = tK3, bx = tt => 110 + 560 * M.clamp((tt - k0) / (k1 - k0));
    vBike.set(bx(t), 150, (bx(t) - 110) / 23.4 * 57.3);
    vGh.forEach((g, k) => { const xg = bx(t - 0.16 * (k + 1)); g.set(xg, 150, (xg - 110) / 23.4 * 57.3); g.g.style.opacity = bx(t) - xg > 4 ? g.op : 0; });
    kvC(w => [w, 6], 0, 10 * M.clamp((t - wt('K2', 'flat')) / 1.6));
    M.vis($('#kvC'), t, wt('K2', 'steady') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'rest') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'velocity') });
  }

  /* D: slope */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DST.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tDst[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDst[i], 0.8); M.vis(el.querySelector('.why'), t, tDst[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tDst[1] - 0.1, 234], [tDst[2] - 0.1, 384]], M.SOFT)(t), hb = $('#hiB');
    M.vis(hb, t, tDst[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(dLine, t, tD1 + 0.6, 1.2);
    const tRu = wt('D3', 'run'), tRi = wt('D3', 'rise');
    M.draw(dRun[0], t, tRu - 0.1, 0.5); M.vis(dRunL[0], t, tRu, 1e9, { dy: 8 });
    M.draw(dRise[0], t, tRi - 0.1, 0.5); M.vis(dRiseL[0], t, tRi, 1e9, { dy: 8 });
    const tBk = wt('D5', 'braking');
    M.draw(dRun[1], t, tBk - 0.2, 0.5); M.vis(dRunL[1], t, tBk, 1e9, { dy: 8 });
    M.draw(dRise[1], t, tBk + 0.2, 0.5); M.vis(dRiseL[1], t, tBk + 0.4, 1e9, { dy: 8 });
    M.vis($('#dr0'), t, wt('D5', 'six') - 0.1, 1e9, POP); M.vis($('#dr1'), t, wt('D5', 'minus') - 0.1, 1e9, POP);
  }

  /* R: area */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    RST.forEach((_, i) => { const el = $('#rst' + i); M.vis(el.querySelector('.n'), t, tRst[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tRst[i], 0.8); M.vis(el.querySelector('.why'), t, tRst[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    M.vis($('#rr'), t, tR1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const tRect = wt('R2', 'rectangle'), tTr = [wt('R4', 'first'), wt('R4', 'rectangle'), wt('R4', 'last')];
    rA.forEach((p, i) => { const tin = i === 1 ? tRect - 0.1 : tTr[i] - 0.1; M.vis(p, t, tin, 1e9, { dy: 0, fade: 0.35 }); });
    M.vis(rHW, t, tRect + 0.2, tTr[1] - 0.15, { dy: 8, outDur: 0.15, ody: 0 });
    rL.forEach((l, i) => M.vis(l, t, tTr[i] + 0.2, 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#rTot'), t, wt('R5', 'Forty') - 0.1, 1e9, POP);
    avA(t, wt('R5', 'graph') + 0.3, tT - 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tB1 + 0.5, stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tB1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'slope') - 0.05, { st: 0.07, sp: M.HEAVY });
    M.rise($('#stF'), t, wt('T1', 'area') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* B: below the axis */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('W1');
    M.vis($('#bs'), t, tB1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exB'), t, tB1 + 0.6, 1e9, { dy: 8 });
    M.vis($('#bg'), t, tB1 + 0.5, out, { dx: 60, dy: 0, ...o });
    const u = tauB(t), [px, py] = bPos(xB(u));
    attr(trl, 'transform', `translate(${px.toFixed(1)},${py.toFixed(1)}) rotate(${ANG.toFixed(2)})`);
    ghB.forEach((g, k) => { const ug = tauB(t - 0.16 * (k + 1)), [gx, gy] = bPos(xB(ug)); attr(g, 'transform', `translate(${gx.toFixed(1)},${gy.toFixed(1)}) rotate(${ANG.toFixed(2)})`); g.style.opacity = Math.hypot(gx - px, gy - py) > 4 && u < 7.99 ? g.op : 0; });
    const nx2 = uy, ny2 = -ux, v = u >= 8 ? 0 : vB(u), on = t > tPush - 0.1 && u < 7.99 ? 1 : 0;
    const vx0 = px + nx2 * 80, vy0 = py + ny2 * 80, vl = v * 14 * on;
    bV.set(vx0, vy0, vx0 + ux * vl, vy0 + uy * vl); attr(bVL, 'x', (vx0 + ux * vl + (vl < 0 ? -30 : 10)).toFixed(1)); attr(bVL, 'y', (vy0 + uy * vl - 10).toFixed(1)); bVL.style.opacity = Math.abs(vl) > 6 ? 1 : 0;
    const ax0 = px + nx2 * 120, ay0 = py + ny2 * 120, al = -2 * 30 * on;
    bA.set(ax0, ay0, ax0 + ux * al, ay0 + uy * al); attr(bAL, 'x', (ax0 + ux * al - 30).toFixed(1)); attr(bAL, 'y', (ay0 + uy * al + 6).toFixed(1)); bAL.style.opacity = on;
    M.setT($('#bt'), f1(u)); M.setT($('#bv'), f1(vB(u))); M.setT($('#ba'), '-2.0');
    M.vis($('#bro'), t, tPush - 0.2, 1e9, { dy: 10 });
    bgC(w => [w, vB(w)], 0, Math.min(u, 8)); bgD(Math.min(u, 8), vB(Math.min(u, 8)), t >= tPush - 0.2);
    M.vis($('#bgC'), t, wt('B3', 'Below') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tB4 + 0.05, tBArea - 0.3, { dy: 36, ...o });
    th2(t, { tin: tB4, tOpts: wt('B4', 'What') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'instant') });
    bAr.forEach((p, i) => M.vis(p, t, tBArea + i * 0.6, 1e9, { dy: 0, fade: 0.35 })); bArL.forEach((l, i) => M.vis(l, t, tBArea + 0.2 + i * 0.6, 1e9, { ...POP, sc: 0.5 }));
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    M.draw(wLine, t, wt('W2', 'speeds') - 0.1, 1.0);
    M.draw(wRun, t, wt('W3', 'Twenty') - 0.2, 0.5); M.vis(wRunL, t, wt('W3', 'five'), 1e9, { dy: 8 });
    M.draw(wRise, t, wt('W3', 'Twenty'), 0.5); M.vis(wRiseL, t, wt('W3', 'minus'), 1e9, { dy: 8 });
    M.vis($('#wa0'), t, wt('W3', 'squared') - 0.1, 1e9, POP);
    M.vis(wTrap, t, wt('W4', 'trapezium') - 0.2, 1e9, { dy: 0, fade: 0.35 });
    wSide.forEach((l, i) => M.vis(l, t, wt('W4', 'parallel') + i * 0.2, 1e9, { ...POP, sc: 0.5 }));
    M.vis($('#wa1'), t, wt('W6', 'seventy') - 0.1, 1e9, POP);
  }

  /* X: trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'line') - 0.1, tStrike: wt('X3', 'Not') - 0.1, tRight: wt('X3', 'Above') });
    M.draw(tgL, t, wt('X2', 'sloping') - 0.1, 0.6); M.vis(tgA, t, wt('X3', 'positive') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(tgT, t, wt('X3', 'positive'), 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'graph') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'distance') - 0.3, tCount, tAns });
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
