// PUC Physics Ep 30: Slope and area interpretation of motion graphs (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, XC = C.ink;          // colour-coding: v blue, a red, x ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 28, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }, FD = { dy: 0, fade: 0.25 };   // FD for SVG text (no transform on svg nodes)
const v = (s, c) => `\\textcolor{${c}}{${s}}`;
const xv = v('x', XC), vv = v('v', VC), av = v('a', AC), dX = v('\\Delta x', XC), dV = v('\\Delta v', VC);

Object.assign(M.IC, {
  run: ['M13 4a2 2 0 1 0 0-.01', 'M7 21l3-6 3 2v4', 'M10 15l1-6 4 3 3-1', 'M11 9 7 10l-2 3'],
  car: ['M5 17h14v-5l-2-5H7l-2 5z', 'M7 17v2', 'M17 17v2', 'M5 12h14'],
  pulse: ['M22 12h-4l-3 9L9 3l-3 9H2'],
});

/* ---------- Aarav's ride (EXAMPLE FIGURES): 0-4 s speed up to 6 m/s, 4-8 s steady, 8-10 s brake to rest ---------- */
const vt = s => s <= 0 ? 0 : s < 4 ? 1.5 * s : s < 8 ? 6 : s < 10 ? 6 - 3 * (s - 8) : 0;
const at = s => s < 0 ? 0 : s < 4 ? 1.5 : s < 8 ? 0 : s < 10 ? -3 : 0;
const xt = s => s <= 0 ? 0 : s < 4 ? 0.75 * s * s : s < 8 ? 12 + 6 * (s - 4) : s < 10 ? 36 + 6 * (s - 8) - 1.5 * (s - 8) * (s - 8) : 42;

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP3 = T0('P3'), tP5 = T0('P5');
const tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tS7 = T0('S7'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1');
const tK1 = T0('K1'), tK4 = T0('K4'), tB1 = T0('B1'), tB2 = T0('B2'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('Z1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three graph readers ---------- */
const JOBS = [['run', 'Coach', "A RUNNER'S GRAPH", 'coach'], ['car', 'Engineer', "A CAR'S GRAPH", 'engineer'], ['pulse', 'Doctor', 'A HEARTBEAT GRAPH', 'doctor']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: the two questions ---------- */
const hs = $('#hAS'), hg = PUC.graph(hs, { x: 90, y: 90, w: 600, h: 280, xmax: 10, ymax: 8 });
txt(hs, 690, 402, 't', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic' });
const hArea = mk(hs, 'path', { d: `M${hg.X(0)},${hg.Y(0)} L${hg.X(0)},${hg.Y(1)} L${hg.X(10)},${hg.Y(7)} L${hg.X(10)},${hg.Y(0)} Z`, fill: C.ac2, stroke: 'none' });
hs.insertBefore(hArea, hg.axes);
const hLine = mk(hs, 'path', { d: `M${hg.X(0)},${hg.Y(1)} L${hg.X(10)},${hg.Y(7)}`, stroke: XC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const hTri = mk(hs, 'path', { d: `M${hg.X(3)},${hg.Y(2.8)} H${hg.X(7)} V${hg.Y(5.2)}`, stroke: VC, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '0', 'stroke-linejoin': 'round' });
$('#hkQI').innerHTML = M.icon('help', 28, '#fff', 2.2);

/* ---------- P: slope and area ---------- */
const ps = $('#pSS'), pg = PUC.graph(ps, { x: 90, y: 90, w: 600, h: 260, xmax: 10, ymax: 8 });
txt(ps, 690, 382, 'time', { 'text-anchor': 'end' });
const pLine = mk(ps, 'path', { d: `M${pg.X(0)},${pg.Y(1)} L${pg.X(10)},${pg.Y(7)}`, stroke: XC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const pRun = mk(ps, 'path', { d: `M${pg.X(2.5)},${pg.Y(2.5)} H${pg.X(7.5)}`, stroke: XC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
const pRise = mk(ps, 'path', { d: `M${pg.X(7.5)},${pg.Y(2.5)} V${pg.Y(5.5)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const pRunL = txt(ps, pg.X(5), pg.Y(2.5) + 30, 'run', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: XC });
const pRiseL = txt(ps, pg.X(7.5) + 14, pg.Y(4) + 8, 'rise', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: VC });
$('#pSF').innerHTML = K(`\\text{slope} = \\dfrac{${v('\\text{rise}', VC)}}{\\text{run}}`);
const pa = $('#pAS'), qg = PUC.graph(pa, { x: 90, y: 90, w: 600, h: 260, xmax: 10, ymax: 8 });
txt(pa, 690, 382, 'time', { 'text-anchor': 'end' });
const aRect = mk(pa, 'rect', { x: qg.X(0), y: qg.Y(2), width: qg.X(10) - qg.X(0), height: qg.Y(0) - qg.Y(2), fill: C.ac2 });
const aTri = mk(pa, 'path', { d: `M${qg.X(0)},${qg.Y(2)} L${qg.X(10)},${qg.Y(6)} L${qg.X(10)},${qg.Y(2)} Z`, fill: M.mix(C.ac, '#FFFFFF', 0.7) });
[aRect, aTri].forEach(e => pa.insertBefore(e, qg.axes));
const aLine = mk(pa, 'path', { d: `M${qg.X(0)},${qg.Y(2)} L${qg.X(10)},${qg.Y(6)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const aRL = txt(pa, qg.X(5), qg.Y(1) + 8, 'rectangle', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 22, fill: XC });
const aTL = txt(pa, qg.X(7.6), qg.Y(3.3), 'triangle', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 22, fill: XC });
$('#pAF').innerHTML = K(`\\text{area} = \\text{height} \\times \\text{width}`);

/* ---------- S: the ride sim ---------- */
const s = $('#simS'), RY = 400, PXm = 14, PX0 = 90, px = x => PX0 + x * PXm;
mk(s, 'line', { x1: 36, y1: RY, x2: 748, y2: RY, stroke: XC, 'stroke-width': 3 });
const dBar = mk(s, 'rect', { x: px(0), y: RY + 6, height: 12, width: 0, rx: 4, fill: VC });
for (let m = 0; m <= 42; m += 2) { const big = m % 6 === 0; mk(s, 'line', { x1: px(m), y1: RY + 20, x2: px(m), y2: RY + 20 + (big ? 20 : 10), stroke: XC, 'stroke-width': big ? 2 : 1.2 }); if (big) txt(s, px(m), RY + 64, m, { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 }); }
txt(s, 748, RY + 64, 'x (m)', { 'text-anchor': 'end', fill: XC, 'font-weight': 600 });
const bikeG = (parent, op) => {
  const g = mk(parent, 'g', { opacity: op }); const sp = [];
  [-36, 36].forEach(cx => { mk(g, 'circle', { cx, cy: 0, r: 26, fill: 'none', stroke: XC, 'stroke-width': 4 }); const sk = mk(g, 'path', { d: '', stroke: XC, 'stroke-width': 1.6, fill: 'none' }); sp.push([cx, sk]); mk(g, 'circle', { cx, cy: 0, r: 4, fill: XC }); });
  mk(g, 'path', { d: 'M-36,0 L-6,0 L18,-40 L-20,-40 Z M-6,0 L-24,-48 M36,0 L20,-50 M10,-56 L28,-56 M-32,-50 L-14,-50', stroke: VC, 'stroke-width': 4.5, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  return { g, spin(rot) { sp.forEach(([cx, sk]) => { let d = ''; for (let k = 0; k < 3; k++) { const a = rot + k * Math.PI / 3; d += `M${(cx + 24 * Math.cos(a)).toFixed(1)},${(24 * Math.sin(a)).toFixed(1)} L${(cx - 24 * Math.cos(a)).toFixed(1)},${(-24 * Math.sin(a)).toFixed(1)} `; } attr(sk, 'd', d); }); } };
};
const ghosts = [0.3, 0.2, 0.12].map(o => bikeG(s, 0));
const bike = bikeG(s, 1);
const BY = RY - 34;
const vArr = PUC.arrow(s, VC, 6, 18), aArr = PUC.arrow(s, AC, 6, 18);
const vL = sym(s, 0, 0, 'v', VC), aL = sym(s, 0, 0, 'a', AC);
$('#roL').innerHTML = `<span class="k n" style="color:var(--mute)">t</span><span class="v" id="rT">0.0</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rV" style="color:${VC}">0.0</span><span class="u">m/s</span>
  <span class="k" style="color:${AC}">a</span><span class="v" id="rA" style="color:${AC}">0.0</span><span class="u">m/s²</span>`;
$('#roR').innerHTML = `<span class="k" style="color:${XC}">x</span><span class="v" id="rX">0.0</span><span class="u">m</span>
  <span class="k n" id="rAk" style="color:${VC}">area</span><span class="v" id="rAr" style="color:${VC}">0.0</span><span class="u" id="rAu">m</span>`;
const gs = $('#grS'), G = PUC.graph(gs, { x: 120, y: 66, w: 580, h: 150, xmax: 10, ymax: 8, xt: [0, 2, 4, 6, 8, 10], yt: [0, 6] });
txt(gs, 134, 76, 'v (m/s)', { fill: VC, 'font-weight': 600 }); txt(gs, 712, 222, 't (s)');
const gArea = mk(gs, 'path', { d: '', fill: C.ac2, stroke: 'none' }); gs.insertBefore(gArea, G.axes);
const gCur = G.curve(VC, 5), gDot = G.dot(VC, 10);
const gAreaL = txt(gs, G.X(6), G.Y(2.6), '', { 'text-anchor': 'middle', 'font-size': 26, fill: VC, 'font-weight': 600 });
const areaPath = (g, f, s0, s1, n = 60) => { if (s1 <= s0 + 1e-3) return ''; let d = `M${g.X(s0).toFixed(1)},${g.Y(0).toFixed(1)}`; for (let i = 0; i <= n; i++) { const u = s0 + (s1 - s0) * i / n; d += ` L${g.X(u).toFixed(1)},${g.Y(f(u)).toFixed(1)}`; } return d + ` L${g.X(s1).toFixed(1)},${g.Y(0).toFixed(1)} Z`; };
// sim clock: live run during S2-S4, slow-mo replay of the braking in S5, area replay in S6-S7
const tRun0 = T0('S2') + 0.4;
const tau1 = t => t < tRun0 ? 0 : t < T0('S3') ? 4 * (t - tRun0) / (T0('S3') - tRun0) : t < T0('S4') ? 4 + 4 * (t - T0('S3')) / (T0('S4') - T0('S3')) : Math.min(10, 8 + 2 * (t - T0('S4')) / (T1('S4') - T0('S4') + 0.2));
const tSlow0 = wt('S5', 'replay') + 0.2, tauSlow = t => Math.min(9.4, 8 + 0.25 * (t - tSlow0));
const tRep0 = wt('S6', 'blue') - 0.1, tRep1 = wt('S7', 'end') + 0.2, tauRep = t => 10 * M.clamp((t - tRep0) / (tRep1 - tRep0));
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my speed graph does know my distance!' });

/* ---------- D: four steps + table ---------- */
const STEPS = [[`${vv} = \\Delta ${xv} \\,/\\, \\Delta t`, 'slope of the position-time graph'],
  [`${av} = ${dV} \\,/\\, \\Delta t`, 'slope of the velocity-time graph'],
  [`${dX} = ${vv} \\times \\Delta t`, 'area under the velocity-time graph'],
  [`${dV} = ${av} \\times \\Delta t`, 'area under the acceleration-time graph']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:110px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dl').querySelectorAll('.st .sx').forEach(e => { e.style.top = '-4px'; });
const TB = [['x-t graph', K(`\\text{slope} = ${vv}`), '<span style="color:#B8BCC6;font:500 22px Poppins">area not used</span>'],
  ['v-t graph', K(`\\text{slope} = ${av}`), K(`\\text{area} = ${dX}`)],
  ['a-t graph', '<span style="color:#B8BCC6;font:500 22px Poppins">slope not used</span>', K(`\\text{area} = ${dV}`)]];
$('#tbl').innerHTML = `<div class="th" style="left:56px">GRAPH</div><div class="th" style="left:266px">SLOPE GIVES</div><div class="th" style="left:516px">AREA GIVES</div>` +
  TB.map((r, i) => `<div class="tb" id="tb${i}" style="top:${120 + i * 100}px"><div class="c0">${r[0]}</div><div class="c1">${r[1]}</div><div class="c2">${r[2]}</div></div>`).join('');
$('#dU').innerHTML = K(`\\text{m/s} \\times \\text{s} = \\text{m} \\;\\Rightarrow\\; \\text{a length}`);
const tStep = [wt('D2', 'slope'), wt('D3', 'slope'), wt('D4', 'area'), wt('D5', 'area')];
const tVel = [wt('D2', 'velocity'), wt('D3', 'acceleration'), wt('D4', 'displacement'), wt('D5', 'change')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\textcolor{${C.ac}}{\\text{slope}} \\to \\text{rate} \\qquad \\textcolor{${C.ac}}{\\text{area}} \\to \\text{total}`);

/* ---------- R: thin strips ---------- */
const LK = ['Cut time into thin slices, each Δt', 'In one slice, speed hardly changes', 'Distance in the slice = v × Δt = strip area', 'Add all strips: total area = displacement'];
$('#lks').innerHTML = LK.map((l, i) => `<div class="lk" id="lk${i}" style="top:${96 + i * 92}px"><div class="n">${i + 1}</div><div class="lt">${l.replace('v ×', `<i style="color:${VC}">v</i> ×`)}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const rs = $('#rrS'), RG = PUC.graph(rs, { x: 110, y: 100, w: 600, h: 330, xmax: 10, ymax: 10, xt: [0, 2, 4, 6, 8, 10], yt: [0, 5, 10] });
txt(rs, 124, 108, 'v (m/s)', { fill: VC, 'font-weight': 600 }); txt(rs, 722, 436, 't (s)');
const fv = u => 0.5 + 0.09 * u * u;                         // area 0-10 s = 35 m exactly
const NS = 40, strips = Array.from({ length: NS }, () => { const r = mk(rs, 'rect', { fill: C.ac2, stroke: C.ac, 'stroke-width': 1.5 }); rs.insertBefore(r, RG.axes); return r; });
const rCur = RG.curve(XC, 5);
const hiS = mk(rs, 'rect', { fill: M.mix(C.ac, '#FFFFFF', 0.45), stroke: C.ac, 'stroke-width': 2.5 });
const hiV = sym(rs, 0, 0, 'v', VC, { 'font-size': 26 }), hiT = txt(rs, 0, 0, 'Δt', { 'font-size': 22, fill: XC, 'font-weight': 600, 'text-anchor': 'middle' });
const ghR = document.createElement('div'); ghR.className = 'ghost'; ghR.textContent = 'EXAMPLE FIGURES'; ghR.style.cssText = 'left:36px;top:516px'; $('#rr').appendChild(ghR);
const sumN = n => { let a = 0; const d = 10 / n; for (let i = 0; i < n; i++) a += fv((i + 0.5) * d) * d; return a; };
const tNs = [[T0('R2'), 5], [wt('R2', 'tiny'), 10], [wt('R5', 'Add'), 20], [wt('R5', 'strips'), 40]];
const avD = PUC.avatar($('#sR'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the area just adds up tiny distances.' });

/* ---------- K: same line, two graphs ---------- */
const kx = $('#kxS'), KX = PUC.graph(kx, { x: 110, y: 100, w: 600, h: 300, xmax: 10, ymax: 10 });
txt(kx, 124, 108, 'x', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: XC, 'font-weight': 600 }); txt(kx, 740, 432, 't', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24 });
const kxC = KX.curve(XC, 5), kxD = KX.dot(XC, 10);
const kxT = mk(kx, 'path', { d: `M${KX.X(3)},${KX.Y(3.2)} H${KX.X(7)} V${KX.Y(6.4)}`, stroke: VC, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
const kxL = sym(kx, KX.X(7) + 14, KX.Y(4.8) + 10, 'v = constant', VC, { 'font-size': 24 });
const kv = $('#kvS'), KV = PUC.graph(kv, { x: 110, y: 100, w: 600, h: 300, xmax: 10, ymax: 10 });
txt(kv, 124, 108, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24, fill: VC, 'font-weight': 600 }); txt(kv, 740, 432, 't', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 24 });
const kvC = KV.curve(VC, 5), kvD = KV.dot(VC, 10);
const kvT = mk(kv, 'path', { d: `M${KV.X(3)},${KV.Y(3.2)} H${KV.X(7)} V${KV.Y(6.4)}`, stroke: AC, 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
const kvL = sym(kv, KV.X(7) + 14, KV.Y(4.8) + 10, 'a = constant', AC, { 'font-size': 24 });
const th1 = PUC.think($('#th1'), { q: 'A velocity-time graph is a flat line. What is the acceleration?', opts: ['Zero', 'Not zero'], right: 0, why: 'A flat line has zero slope: the velocity is not changing, so a = 0.' });

/* ---------- B: area pair ---------- */
const mkFlat = (svgEl, col, val, ylab, yu) => {
  const g = PUC.graph(svgEl, { x: 110, y: 100, w: 600, h: 280, xmax: 6, ymax: 8, xt: [0, 5], yt: [0, val] });
  txt(svgEl, 124, 108, ylab, { fill: col, 'font-weight': 600 }); txt(svgEl, 722, 386, 't (s)');
  const r = mk(svgEl, 'rect', { x: g.X(0), y: g.Y(val), width: g.X(5) - g.X(0), height: g.Y(0) - g.Y(val), fill: M.mix(col, '#FFFFFF', 0.82) }); svgEl.insertBefore(r, g.axes);
  const ln = mk(svgEl, 'path', { d: `M${g.X(0)},${g.Y(val)} H${g.X(5)}`, stroke: col, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
  const q = txt(svgEl, g.X(2.5), g.Y(val / 2) + 12, yu, { 'text-anchor': 'middle', 'font-size': 30, fill: col, 'font-weight': 600 });
  return { g, r, ln, q };
};
const BV = mkFlat($('#bvS'), VC, 6, 'v (m/s)', 'area = 30 m'), BA = mkFlat($('#baS'), AC, 2, 'a (m/s²)', 'area = ?');
const ghB = document.createElement('div'); ghB.className = 'ghost'; ghB.textContent = 'EXAMPLE FIGURES'; ghB.style.cssText = 'right:36px;top:18px'; $('#bv').appendChild(ghB);
$('#bvF').innerHTML = K(`${dX} = 6\\,\\text{m/s} \\times 5\\,\\text{s} = 30\\,\\text{m}`);
$('#baF').innerHTML = K(`${av} \\times t = 2\\,\\text{m/s}^2 \\times 5\\,\\text{s} = \\;?`);
const th2 = PUC.think($('#th2'), { q: 'What does the area under an acceleration-time graph give?', opts: ['Distance', 'Change in velocity'], right: 1, why: 'm/s² × s = m/s. That is a velocity, not a distance.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${av} = \\text{slope} = \\dfrac{6 - 0}{4 - 0}`)],
  [K(`${av} = 1.5\\,\\text{m/s}^2`)],
  [K(`${dX} = \\tfrac{1}{2}(10 + 4) \\times 6`)],
  [K(`${dX} = 42\\,\\text{m}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
const tW = [wt('W3', 'slope'), wt('W4', 'So'), wt('W5', 'area'), wt('W6', 'forty')];
const ws = $('#wrS'), WG = PUC.graph(ws, { x: 110, y: 90, w: 600, h: 300, xmax: 10, ymax: 8, xt: [0, 4, 8, 10], yt: [0, 6] });
txt(ws, 124, 98, 'v (m/s)', { fill: VC, 'font-weight': 600 }); txt(ws, 722, 396, 't (s)');
const wTrap = mk(ws, 'path', { d: areaPath(WG, vt, 0, 10, 40), fill: C.ac2 }); ws.insertBefore(wTrap, WG.axes);
const wCur = mk(ws, 'path', { d: `M${WG.X(0)},${WG.Y(0)} L${WG.X(4)},${WG.Y(6)} L${WG.X(8)},${WG.Y(6)} L${WG.X(10)},${WG.Y(0)}`, stroke: VC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round' });
const wRun = mk(ws, 'path', { d: `M${WG.X(0)},${WG.Y(0) - 3} H${WG.X(4)}`, stroke: XC, 'stroke-width': 4, fill: 'none' });
const wRise = mk(ws, 'path', { d: `M${WG.X(4)},${WG.Y(0)} V${WG.Y(6)}`, stroke: AC, 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '7 6' });
const wRiseL = txt(ws, WG.X(4) + 12, WG.Y(3), 'rise 6 m/s', { 'font-size': 20, fill: AC, 'font-weight': 600 });
const wRunL = txt(ws, WG.X(2), WG.Y(0) - 14, 'run 4 s', { 'font-size': 20, fill: XC, 'font-weight': 600, 'text-anchor': 'middle' });
const wTop = mk(ws, 'path', { d: `M${WG.X(4)},${WG.Y(6) - 16} v-10 H${WG.X(8)} v10`, stroke: XC, 'stroke-width': 2.5, fill: 'none' });
const wTopL = txt(ws, WG.X(6), WG.Y(6) - 36, '4 s', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
const wBot = mk(ws, 'path', { d: `M${WG.X(0)},${WG.Y(0) + 46} v10 H${WG.X(10)} v-10`, stroke: XC, 'stroke-width': 2.5, fill: 'none' });
const wBotL = txt(ws, WG.X(5), WG.Y(0) + 84, '10 s', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 });
const wHL = txt(ws, WG.X(6), WG.Y(3) + 8, 'height 6', { 'text-anchor': 'middle', 'font-size': 22, fill: VC, 'font-weight': 600 });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Displacement = all the area, added up', right: 'Area below the time axis counts as negative' });
const tg = $('#tg'), TG = PUC.graph(tg, { x: 40, y: 60, w: 380, h: 170, xmax: 6, ymin: -4, ymax: 8 });
const tUp = mk(tg, 'path', { d: `M${TG.X(0)},${TG.Y(0)} L${TG.X(0)},${TG.Y(8)} L${TG.X(4)},${TG.Y(0)} Z`, fill: C.ac2 }), tDn = mk(tg, 'path', { d: `M${TG.X(4)},${TG.Y(0)} L${TG.X(6)},${TG.Y(-4)} L${TG.X(6)},${TG.Y(0)} Z`, fill: C.redBg });
[tUp, tDn].forEach(e => tg.insertBefore(e, TG.axes));
mk(tg, 'path', { d: `M${TG.X(0)},${TG.Y(8)} L${TG.X(6)},${TG.Y(-4)}`, stroke: VC, 'stroke-width': 4, fill: 'none' });
const tPl = txt(tg, TG.X(1.2), TG.Y(2), '+', { 'font-size': 40, fill: VC, 'font-weight': 600, 'text-anchor': 'middle' }), tMi = txt(tg, TG.X(5.3), TG.Y(-1.4) + 4, '−', { 'font-size': 40, fill: AC, 'font-weight': 600, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Graph questions: find the acceleration, displacement or distance from a given graph' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN · NEET PATTERN · ORIGINAL QUESTION', q: `A car moves at ${K('+10\\,\\text{m/s}')}. Its acceleration is ${K('+2\\,\\text{m/s}^2')} for the next ${K('5\\,\\text{s}')}, then ${K('-4\\,\\text{m/s}^2')} for the ${K('5\\,\\text{s}')} after that. What is its velocity at ${K('t = 10\\,\\text{s}')}?`, qW: 760,
  opts: ['0 m/s', '-10 m/s', '20 m/s', '40 m/s'], right: 0, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 250 });
const so = PUC.solution($('#so'), [[K(`${dV} = \\text{area under } a\\text{-}t`)], [K('0\\text{-}5\\,\\text{s}:\\quad 2 \\times 5 = +10')], [K('5\\text{-}10\\,\\text{s}:\\quad (-4) \\times 5 = -20')], [K(`${vv} = 10 + 10 - 20 = 0`)]], { y0: 100, dy: 110 });
const tSo = [wt('Z2', 'Area'), wt('Z2', 'First'), wt('Z2', 'Second'), wt('Z3', 'Final')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · slope and area', y0: 104, dy: 90, txt: [0, 0, 1, 1],
  lines: [K(`\\text{slope}:\\; x\\text{-}t \\to ${vv} \\qquad v\\text{-}t \\to ${av}`), K(`\\text{area}:\\; v\\text{-}t \\to ${dX} \\qquad a\\text{-}t \\to ${dV}`),
    '<b>Below the time axis</b>: area counts negative for displacement', '<b>Distance</b>: add the sizes of all the areas'] });
const YQ = ['What does the slope of a position-time graph tell you?', 'Why does the area under a v-t graph give displacement?', 'When does the area below the time axis count as negative?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 31', topic: 'Why does a moving bus look still? Relative Motion in 1D', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 + 0.1, 1.1, 640, 560], [tS6 - 0.1, 1, 960, 540]]);
const f1 = n => (Math.abs(n) < 0.05 ? 0 : n).toFixed(1);

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
    M.vis($('#hA'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(hLine, t, tMorph + 0.4, 0.7);
    M.draw(hTri, t, wt('H2', 'steep') - 0.2, 0.5);
    hArea.style.opacity = M.io((t - wt('H2', 'space') + 0.1) / 0.4).toFixed(3);
    M.vis($('#hq0'), t, wt('H2', 'steep') - 0.1, 1e9, POP); M.vis($('#hq1'), t, wt('H2', 'space') - 0.1, 1e9, POP);
    M.vis($('#hB'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#meter'), t, wt('H3', 'meter') - 0.1, 1e9, { dy: -24, sp: M.SOFT });
    $('#mDist').style.color = mix('#7D879C', '#FF8A8A', M.io((t - wt('H3', 'never')) / 0.3));
    M.vis($('#hkQ'), t, wt('H4', 'distance') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pS'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(pLine, t, tP1 + 0.3, 0.6);
    M.draw(pRise, t, wt('P2', 'rises') - 0.1, 0.4); M.vis(pRiseL, t, wt('P2', 'rises'), 1e9, FD);
    M.draw(pRun, t, wt('P2', 'time') - 0.1, 0.4); M.vis(pRunL, t, wt('P2', 'time'), 1e9, FD);
    PUC.write($('#pSF'), t, wt('P2', 'rise', 1) - 0.1, 0.7);
    M.vis($('#pA'), t, tP3 - 0.05, out, { dx: 60, dy: 0, ...o });
    M.draw(aLine, t, tP3 + 0.2, 0.6);
    const a1 = M.io((t - wt('P4', 'space') + 0.1) / 0.5); aRect.style.opacity = a1.toFixed(3); aTri.style.opacity = a1.toFixed(3);
    aRect.setAttribute('fill', mix(C.ac2, M.mix(C.ac, '#FFFFFF', 0.55), M.io((t - wt('P4', 'rectangle')) / 0.25) * (1 - M.io((t - wt('P4', 'triangle')) / 0.25))));
    aTri.setAttribute('fill', mix(C.ac2, M.mix(C.ac, '#FFFFFF', 0.55), M.io((t - wt('P4', 'triangle')) / 0.25) * (1 - M.io((t - tP5) / 0.25))));
    M.vis(aRL, t, wt('P4', 'rectangle') - 0.1, 1e9, FD); M.vis(aTL, t, wt('P4', 'triangle') - 0.1, 1e9, FD);
    PUC.write($('#pAF'), t, wt('P4', 'rectangle') + 0.2, 0.7);
    M.vis($('#pSC'), t, wt('P5', 'rate') - 0.1, 1e9, POP); M.vis($('#pAC'), t, wt('P5', 'total') - 0.1, 1e9, POP);
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#exS'), t, tS1 + 0.6, 1e9, { dy: 8 });
    const mode = t < tSlow0 - 0.5 ? 0 : t < tRep0 ? 1 : 2;
    const tau = mode === 0 ? tau1(t) : mode === 1 ? (t < tSlow0 ? 8 : tauSlow(t)) : tauRep(t);
    const x = xt(tau), vel = vt(tau), acc = (mode === 0 && tau >= 10) || (mode === 2 && tau >= 10) || tau <= 0 ? 0 : at(tau);
    const bx = px(x);
    bike.g.setAttribute('transform', `translate(${bx.toFixed(1)},${BY}) scale(1.25)`); bike.spin(x / 0.9);
    // ghost trails at earlier sim times while moving
    ghosts.forEach((gh, k) => { const dt = mode === 1 ? 0.12 * (k + 1) : 0.45 * (k + 1), tg = Math.max(0, tau - dt), gx = px(xt(tg)); gh.g.setAttribute('transform', `translate(${gx.toFixed(1)},${BY}) scale(1.25)`); gh.spin(xt(tg) / 0.9); gh.g.setAttribute('opacity', (bx - gx > 6 ? [0.3, 0.2, 0.12][k] : 0)); });
    bike.g.setAttribute('opacity', M.clamp((t - tS1 - 0.4) / 0.3).toFixed(3));
    // vectors grow from the bicycle (v forward, a forward or backward)
    const vecOn = M.io((t - T0('S2')) / 0.4);
    const vy = BY - 110, ay = BY - 150;
    vArr.set(bx, vy, bx + vel * 22 * vecOn, vy); attr(vL, 'x', (bx + vel * 22 * vecOn + 10).toFixed(1)); attr(vL, 'y', vy + 10); vL.style.opacity = vel > 0.3 ? vecOn : 0;
    aArr.set(bx, ay, bx + acc * 34 * vecOn, ay); attr(aL, 'x', (acc >= 0 ? bx + acc * 34 + 10 : bx + acc * 34 - 28).toFixed(1)); attr(aL, 'y', ay + 10); aL.style.opacity = Math.abs(acc) > 0.1 ? vecOn : 0;
    // phase tag / slow-mo / replay tags
    const ph = tau < 4 ? 'SPEEDING UP · a FORWARD' : tau < 8 ? 'STEADY · a = 0' : tau < 10 ? 'BRAKING · a BACKWARD' : 'STOPPED';
    M.setT($('#phT'), ph); $('#phT').style.background = tau < 4 ? C.ink : tau < 8 ? C.ink : tau < 10 ? C.red : C.ink;
    M.vis($('#phT'), t, T0('S2'), tSlow0 - 0.6, { dy: 8, outDur: 0.2 });
    M.vis($('#smo'), t, tSlow0 - 0.4, tRep0 - 0.3, { ...POP, outDur: 0.2 });
    M.vis($('#rpl'), t, tRep0 - 0.1, 1e9, { ...POP });
    // distance bar on the road (replay only)
    attr(dBar, 'width', mode === 2 ? Math.max(0, bx - px(0)).toFixed(1) : 0);
    // readout
    M.setT($('#rT'), tau.toFixed(1)); M.setT($('#rV'), f1(vel)); M.setT($('#rA'), f1(acc)); M.setT($('#rX'), f1(x));
    const arOn = mode === 2; M.setT($('#rAr'), arOn ? f1(x) : '-');
    $('#rAk').style.opacity = arOn ? 1 : 0.35; $('#rAr').style.opacity = arOn ? 1 : 0.35;
    // graph: curve drawn up to tau (first run keeps full curve afterwards), dot linked to the bicycle
    const tc = mode === 0 ? tau : 10;
    gCur(u => [u, vt(u)], 0, tc, 80); gDot(tau, vel, t > tRun0 - 0.1);
    attr(gArea, 'd', mode === 2 ? areaPath(G, vt, 0, tau) : '');
    M.setT(gAreaL, mode === 2 && tau > 5 ? 'area = ' + f1(x) + ' m' : ''); gAreaL.style.opacity = M.clamp((tau - 5) / 1).toFixed(3);
    avA(t, wt('S7', 'distance', 1) + 0.1, out);
  }

  /* D: four steps */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.3, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i] - 0.1, 0.8); M.vis(el.querySelector('.why'), t, tVel[i] - 0.1, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, [[tStep[1] - 0.2, 200], [tStep[2] - 0.2, 320], [tStep[3] - 0.2, 440]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.3, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 18).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    [0, 1, 2].forEach(i => M.vis($('#tb' + i), t, tD1 + 0.6 + i * 0.1, 1e9, { dy: 14 }));
    $('#dr').querySelectorAll('.th').forEach((e, i) => M.vis(e, t, tD1 + 0.5, 1e9, { dy: 8 }));
    // light the cell being described: [row, col, t]
    const cells = [[0, 1, tVel[0]], [1, 1, tVel[1]], [1, 2, tVel[2]], [2, 2, tVel[3]]];
    [0, 1, 2].forEach(r => { const row = $('#tb' + r); [1, 2].forEach(c => { const cl = row.querySelector('.c' + c), hit = cells.find(k => k[0] === r && k[1] === c); cl.style.opacity = hit ? (0.25 + 0.75 * M.io((t - hit[2] + 0.1) / 0.3)).toFixed(3) : '1'; }); row.style.background = mix(C.soft, C.ac3, M.io((t - (cells.find(k => k[0] === r)[2]) + 0.1) / 0.3)); });
    M.vis($('#dUt'), t, T0('D6') - 0.05, 1e9, { dy: 8 }); PUC.write($('#dU'), t, wt('D6', 'Metres') - 0.1, 0.9);
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Slope') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Area') + 0.2, 0.8);
  }

  /* R: thin strips */
  const rOn = t >= tR1 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.45, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => M.vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }));
    rCur(u => [u, fv(u)], 0, 10 * M.io((t - tR1 - 0.6) / 0.9), 80);
    let n = 0; tNs.forEach(([tt, nn]) => { if (t >= tt) n = nn; });
    const sOn2 = M.io((t - tLk[0]) / 0.4);
    strips.forEach((r, i) => { if (i >= n || sOn2 <= 0) { M.hide(r, true); return; } M.hide(r, false); const d = 10 / n, x0 = i * d, h = fv(x0 + d / 2); attr(r, 'x', RG.X(x0).toFixed(1)); attr(r, 'width', (RG.X(d) - RG.X(0)).toFixed(1)); attr(r, 'y', RG.Y(h).toFixed(1)); attr(r, 'height', (RG.Y(0) - RG.Y(h)).toFixed(1)); r.style.opacity = sOn2.toFixed(3); r.setAttribute('stroke-width', n >= 40 ? 0.6 : 1.5); });
    // one highlighted strip with its v and Δt (links 2 and 3)
    const hOn2 = t >= tLk[1] - 0.1 && t < tLk[3] && n >= 10, d = 10 / 10, i0 = 6, hh = fv(i0 + 0.5);
    M.hide(hiS, !hOn2); M.hide(hiV, !hOn2); M.hide(hiT, !hOn2);
    if (hOn2) { attr(hiS, 'x', RG.X(i0)); attr(hiS, 'width', RG.X(d) - RG.X(0)); attr(hiS, 'y', RG.Y(hh)); attr(hiS, 'height', RG.Y(0) - RG.Y(hh)); attr(hiV, 'x', RG.X(i0) - 26); attr(hiV, 'y', RG.Y(hh / 2) + 8); attr(hiT, 'x', RG.X(i0 + 0.5)); attr(hiT, 'y', RG.Y(hh) - 12); }
    const pill = $('#rN'); M.vis(pill, t, tLk[0] + 0.2, 1e9, POP);
    pill.innerHTML = `${n || 5} strips &nbsp;·&nbsp; sum = <b class="mono">${sumN(n || 5).toFixed(2)} m</b>`;
    M.vis(ghR, t, tLk[0] + 0.4, 1e9, { dy: 8 });
    avD(t, wt('R5', 'displacement') + 0.4, out);
  }

  /* K: side by side + think 1 */
  const kOn = t >= tK1 - 0.1 && t < tB1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K4');
    M.vis($('#kx'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const u1 = 10 * M.io((t - wt('K1', 'straight')) / 1.6); kxC(u => [u, 0.8 * u + 1], 0, u1); kxD(u1, 0.8 * u1 + 1, t > wt('K1', 'straight'));
    M.draw(kxT, t, T0('K2') + 0.1, 0.5); M.vis(kxL, t, wt('K2', 'velocity') - 0.1, 1e9, FD); M.vis($('#kxC'), t, wt('K2', 'Constant') - 0.1, 1e9, POP);
    M.vis($('#kv'), t, T0('K3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const u2 = 10 * M.io((t - wt('K3', 'same')) / 1.6); kvC(u => [u, 0.8 * u + 1], 0, u2); kvD(u2, 0.8 * u2 + 1, t > wt('K3', 'same'));
    M.draw(kvT, t, wt('K3', 'steady') - 0.1, 0.5); M.vis(kvL, t, wt('K3', 'constant') - 0.1, 1e9, FD); M.vis($('#kvC'), t, wt('K3', 'acceleration') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK4 + 0.05, OUT('B1'), { dy: 36, ...o });
    th1(t, { tin: tK4, tOpts: wt('K4', 'acceleration') - 0.1, tCount: T1('K4') + 0.05, dur: 3, tAns: T0('K5') - 0.02, tWhy: wt('K5', 'flat') });
  }

  /* B: area pair + think 2 */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B2');
    M.vis($('#bv'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis(ghB, t, tB1 + 0.4, 1e9, { dy: 8 });
    M.draw(BV.ln, t, tB1 + 0.3, 0.5); BV.r.style.opacity = M.io((t - wt('B1', 'area') + 0.1) / 0.4).toFixed(3); M.vis(BV.q, t, wt('B1', 'displacement') - 0.1, 1e9, FD);
    PUC.write($('#bvF'), t, wt('B1', 'metres') - 0.2, 0.8);
    M.vis($('#ba'), t, wt('B1', 'metres') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(BA.ln, t, wt('B1', 'metres') + 0.6, 0.5); BA.r.style.opacity = M.io((t - wt('B1', 'metres') - 0.9) / 0.4).toFixed(3); M.vis(BA.q, t, wt('B1', 'metres') + 1.1, 1e9, FD);
    PUC.write($('#baF'), t, wt('B1', 'metres') + 1.0, 0.8);
    M.vis($('#th2'), t, tB2 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tB2, tOpts: wt('B2', 'Distance') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Metres') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, tW1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(wCur, t, tW1 + 0.5, 0.9);
    M.draw(wRise, t, wt('W3', 'rise') - 0.1, 0.4); M.vis(wRiseL, t, wt('W3', 'rise'), 1e9, FD);
    M.draw(wRun, t, wt('W3', 'run') - 0.1, 0.4); M.vis(wRunL, t, wt('W3', 'run'), 1e9, FD);
    const aw = M.io((t - wt('W5', 'trapezium') + 0.1) / 0.5); wTrap.style.opacity = aw.toFixed(3);
    [wRise, wRun].forEach(e => { e.style.opacity = (1 - aw).toFixed(3); }); [wRiseL, wRunL].forEach(e => { if (aw > 0) e.style.opacity = (1 - aw).toFixed(3); });
    M.draw(wBot, t, wt('W5', 'ten') - 0.1, 0.4); M.vis(wBotL, t, wt('W5', 'ten'), 1e9, FD);
    M.draw(wTop, t, wt('W5', 'four') - 0.1, 0.4); M.vis(wTopL, t, wt('W5', 'four'), 1e9, FD);
    M.vis(wHL, t, wt('W5', 'height') - 0.05, 1e9, FD);
    M.vis($('#ans'), t, wt('W6', 'forty', 1) - 0.1, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X3', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'negative') - 0.2 });
    M.vis(tg, t, T0('X2') + 0.1, 1e9, { dy: 0, fade: 0.3 });
    tDn.setAttribute('fill', mix('#FFFFFF', C.redBg, M.io((t - wt('X2', 'below') + 0.1) / 0.3)));
    M.vis(tPl, t, wt('X3', 'negative') - 0.2, 1e9, FD); M.vis(tMi, t, wt('X3', 'negative'), 1e9, FD);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'graph') });
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
