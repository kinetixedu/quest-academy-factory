// PUC Physics Ep 04: Systems of units (Motion notebook, one trolley in MKS / CGS / FPS)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, UC = C.violet, EC = C.teal;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cv = (c, s) => `\\textcolor{${c}}{${s}}`;

Object.assign(M.IC, {
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  sign: ['M12 3v18', 'M5 6h12l3 3-3 3H5z'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tC1 = T0('C1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tB1 = T0('B1'), tB6 = T0('B6'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['weight', 'Cake recipe', 'FLOUR', '8', 'oz', 'ounces'], ['sign', 'Road sign', 'DISTANCE TO TOWN', '60', 'miles', 'miles'], ['ruler', 'Cricket pitch', 'LENGTH', '22', 'yards', 'yards']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, u], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span>${v}</span> <span class="u" style="font-size:36px">${u}</span></div></div>`).join('');
// two dial gauges
const dialG = (svg, max, ticks, lab) => {
  const cx = 130, cy = 120, R = 96, A0 = Math.PI * 0.85, A1 = Math.PI * 2.15, ang = v => A0 + (A1 - A0) * v / max;
  mk(svg, 'circle', { cx, cy, r: R + 10, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
  ticks.forEach(v => { const a = ang(v); mk(svg, 'line', { x1: cx + R * Math.cos(a), y1: cy + R * Math.sin(a), x2: cx + (R - 16) * Math.cos(a), y2: cy + (R - 16) * Math.sin(a), stroke: C.ink, 'stroke-width': 3 }); txt(svg, cx + (R - 34) * Math.cos(a), cy + (R - 34) * Math.sin(a) + 6, lab(v), { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 }); });
  const nd = mk(svg, 'line', { x1: cx, y1: cy, x2: cx, y2: cy, stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(svg, 'circle', { cx, cy, r: 8, fill: C.ink });
  return v => { const a = ang(v); attr(nd, 'x2', (cx + (R - 22) * Math.cos(a)).toFixed(1)); attr(nd, 'y2', (cy + (R - 22) * Math.sin(a)).toFixed(1)); };
};
const g0 = dialG($('#g0S'), 60, [0, 20, 40, 60], v => v), g1 = dialG($('#g1S'), 4, [0, 1, 2, 3, 4], v => v);
const BAR40 = 40 * 6894.757 / 1e5;   // 2.758 bar

/* ---------- P ---------- */
const pa = $('#paS');
const PB = [['LENGTH', 'm', 150], ['MASS', 'kg', 392], ['TIME', 's', 634]];
const pbEl = PB.map(([n, u, x]) => { const g = mk(pa, 'g', {}); mk(g, 'rect', { x: x - 90, y: 110, width: 180, height: 110, rx: 14, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 }); txt(g, x, 168, u, { 'text-anchor': 'middle', 'font-size': 40, fill: C.ac, 'font-weight': 600 }); txt(g, x, 202, n, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600, 'letter-spacing': 2 }); return g; });
const paL = [mk(pa, 'path', { d: 'M150,226 C150,300 392,300 392,330', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 7' }), mk(pa, 'path', { d: 'M392,226 V330', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 7' }), mk(pa, 'path', { d: 'M634,226 C634,300 392,300 392,330', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 7' })];
const paD = mk(pa, 'g', {}); mk(paD, 'rect', { x: 192, y: 336, width: 400, height: 100, rx: 14, fill: C.ink }); txt(paD, 392, 382, 'speed · force · energy', { 'text-anchor': 'middle', 'font-size': 24, fill: '#fff', 'font-weight': 600 }); txt(paD, 392, 414, 'ALL BUILT FROM THE SET', { 'text-anchor': 'middle', 'font-size': 15, fill: '#C9CFDB', 'font-weight': 600, 'letter-spacing': 2 });
const PQ = [['CGS', 'centimetre · gram · second'], ['FPS (British)', 'foot · pound · second'], ['MKS', 'metre · kilogram · second'], ['SI (today)', 'grew from MKS · 7 base units']];
$('#pqs').innerHTML = PQ.map(([n, d], i) => `<div class="sy" id="pq${i}" style="top:${84 + i * 100}px;${i === 3 ? 'background:var(--ac);' : ''}"><div class="sn" style="${i === 3 ? 'color:#fff' : ''}">${n}</div><div style="position:absolute;right:24px;top:30px;font:500 22px Poppins;white-space:nowrap;${i === 3 ? 'color:#fff' : 'color:var(--ink2)'}">${d}</div></div>`).join('');
const tPq = [wt('P4', 'C'), wt('P4', 'F'), wt('P4', 'M', 1), wt('P5', 'SI')];

/* ---------- C: three systems table ---------- */
const SYS = [['CGS', ['centimetre', 'cm'], ['gram', 'g'], ['second', 's']], ['FPS', ['foot', 'ft'], ['pound', 'lb'], ['second', 's']], ['MKS', ['metre', 'm'], ['kilogram', 'kg'], ['second', 's']]];
const COLX = [520, 860, 1200];
$('#sys').innerHTML = ['LENGTH', 'MASS', 'TIME'].map((h, k) => `<div class="sh" id="sh${k}" style="left:${COLX[k] - 75 + 36}px;width:220px">${h}</div>`).join('') +
  SYS.map(([n, ...cs], i) => `<div class="sy" id="sy${i}" style="width:1528px;top:${130 + i * 120};top:${130 + i * 120}px;height:96px"><div class="sn" style="top:26px">${n}</div>${cs.map(([a, b], k) => `<div class="sc" id="sc${i}${k}" style="left:${COLX[k] - 75}px;width:220px;height:64px"><b>${a}</b><s>${b}</s></div>`).join('')}</div>`).join('') +
  `<div class="pillp ac" id="ctP" style="left:36px;top:500px">All three share the second. Only length and mass differ.</div>`;
const tSy = [[wt('C2', 'centimetre'), wt('C2', 'gram'), wt('C2', 'second')], [wt('C3', 'foot'), wt('C3', 'pound'), wt('C3', 'second')], [wt('C4', 'metre'), wt('C4', 'kilogram'), wt('C4', 'second')]];

/* ---------- S: trolley ---------- */
const s = $('#simS'), X0 = 110, PX = 32, FY = 380;         // 32 px per metre, track 0 - 18 m
mk(s, 'line', { x1: 30, y1: FY, x2: 754, y2: FY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 42; x < 754; x += 28) mk(s, 'line', { x1: x, y1: FY + 4, x2: x - 14, y2: FY + 18, stroke: C.dim, 'stroke-width': 2 });
const mkTrolley = op => { const g = mk(s, 'g', { opacity: op }); mk(g, 'rect', { x: -60, y: -76, width: 120, height: 56, rx: 8, fill: C.ink }); [-34, 34].forEach(x => mk(g, 'circle', { cx: x, cy: -12, r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 4 })); txt(g, 0, -40, '2 kg', { 'text-anchor': 'middle', 'font-size': 20, fill: '#fff', 'font-weight': 600 }); return g; };
const gTr = [0, 1, 2].map(() => mkTrolley(0)), troP = mk(s, 'g', {}), tro = mkTrolley(1); troP.appendChild(tro);
const fA = PUC.arrow(s, FC, 7, 20), vA = PUC.arrow(s, VC, 6, 18);
const fL = txt(s, 0, 0, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: FC });
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
$('#roG').innerHTML = `<span class="k">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="rf" style="color:${FC}">4</span><span class="u" id="rfu">N</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">0.00</span><span class="u" id="rvu">m/s</span>`;
const G = PUC.graph($('#grS'), { x: 110, y: 74, w: 560, h: 140, xmax: 4, ymax: 8, xt: [0, 1, 2, 3], yt: [0, 4, 8], xl: 't (s)', yl: 'v (m/s)' });
G.ylab.setAttribute('x', 122); G.ylab.setAttribute('y', 78);
const gCur = G.curve(VC), gDot = G.dot(VC);
const tGo = wt('S3', 'speeds') - 0.2, tSlo = T0('S4') + 0.1, TEND = 4;
const simT = t => { if (t < tGo) return 0; const a = t - tGo; if (t < tSlo) return Math.min(2.6, a); return Math.min(TEND, 2.6 + (t - tSlo) * 0.25 * 1.4); };
const tCgs = wt('S5', 'switch'), tFps = wt('S6', 'Switch');
// unit system per time: 0 MKS, 1 CGS, 2 FPS
const sysAt = t => t < tCgs + 0.3 ? 0 : t < tFps + 0.3 ? 1 : 2;
const VF = [[1, 'm/s', 'N', 4], [100, 'cm/s', 'dyn', 4e5], [1 / 0.3048, 'ft/s', 'lbf', 4 / 4.448222]];
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Same trolley, three different numbers.' });

/* ---------- D ---------- */
const STEPS = [[`1\\,\\text{N} = 1\\,\\text{kg} \\times 1\\,\\text{m/s}^2`, 'MKS force unit'],
  [`1\\,\\text{dyn} = 1\\,\\text{g} \\times 1\\,\\text{cm/s}^2`, 'CGS force unit'],
  [`1\\,\\text{g} = 10^{-3}\\,\\text{kg},\\;\\; 1\\,\\text{cm} = 10^{-2}\\,\\text{m}`, 'swap in the MKS units'],
  [`1\\,\\text{dyn} = 10^{-3} \\times 10^{-2} = 10^{-5}\\,\\text{N}`, 'multiply the factors']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:116px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'In'), wt('D3', 'In'), wt('D4', 'A'), wt('D5', 'Multiply')];
const CMP = [['MASS', `1\\,\\text{kg} = 1000\\,\\text{g}`], ['LENGTH', `1\\,\\text{m} = 100\\,\\text{cm}`], ['FORCE', `1\\,\\text{N} = 10^5\\,\\text{dyn}`]];
$('#cmps').innerHTML = CMP.map(([k, f], i) => `<div class="cmp" id="cm${i}" style="top:${84 + i * 92}px"><div class="ck">${k}</div><div class="cv">${K(f)}</div></div>`).join('');
$('#drN').innerHTML = K(`1\\,\\text{N} = 1\\text{ lakh dyn}`);
$('#stF').innerHTML = K(`\\text{MKS} \\to \\text{N},\\,\\text{J} \\qquad \\text{CGS} \\to \\text{dyn},\\,\\text{erg}`);

/* ---------- K: side by side ---------- */
const kb = $('#kbS'), kd = $('#kdS');
const bars = (svg, frac, col, lab) => { mk(svg, 'rect', { x: 36, y: 330, width: 712, height: 56, rx: 10, fill: C.soft }); const b = mk(svg, 'rect', { x: 36, y: 330, width: 0, height: 56, rx: 10, fill: col }); const l = txt(svg, 36, 430, lab, { 'font-size': 26, fill: C.ink, 'font-weight': 600 }); return u => { attr(b, 'width', Math.max(frac > 0.01 ? 0 : 4 * u, 712 * frac * u).toFixed(1)); l.style.opacity = u.toFixed(3); }; };
const apple = mk(kb, 'g', {});
mk(apple, 'path', { d: 'M392,140 C340,110 290,150 300,210 C310,270 360,300 392,284 C424,300 474,270 484,210 C494,150 444,110 392,140 Z', fill: '#E5675F', stroke: C.ink, 'stroke-width': 3 });
mk(apple, 'path', { d: 'M392,140 C392,120 400,104 412,96', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(apple, 'path', { d: 'M404,112 C420,96 444,98 450,108 C436,120 418,120 404,112 Z', fill: '#3E9B5F', stroke: C.ink, 'stroke-width': 2.5 });
const bN = bars(kb, 1, FC, '1 N  (full bar)');
const mosq = mk(kd, 'g', {});
mk(mosq, 'ellipse', { cx: 392, cy: 210, rx: 26, ry: 8, fill: C.ink }); mk(mosq, 'circle', { cx: 364, cy: 208, r: 7, fill: C.ink });
mk(mosq, 'path', { d: 'M384,204 C370,160 340,150 330,170 M398,204 C412,160 444,150 454,170 M370,214 L350,250 M392,216 L392,256 M410,214 L432,250 M358,208 L330,214', fill: 'none', stroke: C.ink, 'stroke-width': 2.2, 'stroke-linecap': 'round' });
const bD = bars(kd, 1e-5, FC, '1 dyn = 0.00001 N  (too thin to see)');
const th1 = PUC.think($('#th1'), { q: 'Which is bigger: 1 joule or 1 erg (the CGS unit of energy)?', opts: ['1 joule', '1 erg'], right: 0, why: '1 J = 10⁷ erg: kilograms and metres are far bigger than grams and centimetres.' });

/* ---------- B: back to the tyre ---------- */
const BC = [['psi', 'POUND PER SQUARE INCH · BRITISH', '1 psi ≈ 6895 Pa'], ['bar', 'METRIC, NOT SI', '1 bar = 10⁵ Pa'], ['Pa', 'SI UNIT OF PRESSURE', '1 Pa = 1 N/m²']];
$('#bcs').innerHTML = BC.map(([n, w, f], i) => `<div class="jr" id="bc${i}" style="top:${84 + i * 134}px"><div class="jn" style="left:24px;font:600 40px 'IBM Plex Mono';top:20px;color:${i === 2 ? C.ac : C.ink}">${n}</div><div class="jw" style="left:24px;top:76px">${w}</div><div class="jv" style="font-size:32px;top:42px">${f}</div></div>`).join('');
const tBc = [wt('B2', 'pounds'), wt('B3', 'bar'), wt('B3', 'pascals')];
const brs = $('#brS'); const g2 = (() => { const cx = 392, cy = 230, R = 150, A0 = Math.PI * 0.85, A1 = Math.PI * 2.15, ang = v => A0 + (A1 - A0) * v / 4;
  mk(brs, 'circle', { cx, cy, r: R + 14, fill: '#fff', stroke: C.ink, 'stroke-width': 5 });
  for (let v = 0; v <= 4.001; v += 0.2) { const a = ang(v), big = Math.abs(v - Math.round(v)) < 0.01; mk(brs, 'line', { x1: cx + R * Math.cos(a), y1: cy + R * Math.sin(a), x2: cx + (R - (big ? 26 : 12)) * Math.cos(a), y2: cy + (R - (big ? 26 : 12)) * Math.sin(a), stroke: C.ink, 'stroke-width': big ? 3.5 : 2 }); if (big) txt(brs, cx + (R - 50) * Math.cos(a), cy + (R - 50) * Math.sin(a) + 8, Math.round(v), { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 }); }
  const tgt = ang(BAR40); mk(brs, 'path', { d: `M${cx + (R + 4) * Math.cos(tgt)},${cy + (R + 4) * Math.sin(tgt)} L${cx + (R + 30) * Math.cos(tgt - 0.06)},${cy + (R + 30) * Math.sin(tgt - 0.06)} L${cx + (R + 30) * Math.cos(tgt + 0.06)},${cy + (R + 30) * Math.sin(tgt + 0.06)} Z`, fill: C.ac });
  txt(brs, cx, cy + 70, 'bar', { 'text-anchor': 'middle', 'font-size': 24, fill: UC, 'font-weight': 600 });
  const nd = mk(brs, 'line', { x1: cx, y1: cy, x2: cx, y2: cy, stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round' }); mk(brs, 'circle', { cx, cy, r: 11, fill: C.ink });
  const rd = txt(brs, cx, cy + 112, '0.00 bar', { 'text-anchor': 'middle', 'font-size': 34, fill: C.ink, 'font-weight': 600 });
  return v => { const a = ang(v); attr(nd, 'x2', (cx + (R - 30) * Math.cos(a)).toFixed(1)); attr(nd, 'y2', (cy + (R - 30) * Math.sin(a)).toFixed(1)); M.setT(rd, v.toFixed(2) + ' bar'); }; })();
const th2 = PUC.think($('#th2'), { q: 'Is the bar an SI unit?', opts: ['Yes, SI', 'No, not SI'], right: 1, why: 'The SI unit of pressure is the pascal. 1 bar = 10⁵ Pa is metric, but not SI.' });

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`1\\,${cv(EC, '\\text{J}')} = 1\\,\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-2}`)],
  [K(`= (10^3\\,\\text{g})(10^4\\,\\text{cm}^2)\\,\\text{s}^{-2}`)],
  [K(`= 10^3 \\times 10^4 = 10^7\\,\\text{g}\\,\\text{cm}^2\\,\\text{s}^{-2}`)],
  [K(`1\\,${cv(EC, '\\text{J}')} = ${cv(EC, '10^7\\,\\text{erg}')}`)]], { label: 'WORKED EXAMPLE', y0: 170, dy: 96 });
const WC = [['kg', '10³ g', '× 1000'], ['m²', '10⁴ cm²', '× 10 000'], ['s⁻²', 's⁻²', 'no change']];
$('#wcs').innerHTML = WC.map(([a, b, c], i) => `<div class="cmp" id="wc${i}" style="top:${92 + i * 104}px"><div class="ck" style="font:600 32px 'IBM Plex Mono';top:20px;color:var(--ink)">${a}</div><div style="position:absolute;left:150px;top:22px;font:600 28px 'IBM Plex Mono';color:var(--mute)">→</div><div style="position:absolute;left:210px;top:20px;font:600 32px 'IBM Plex Mono';color:${C.violet}">${b}</div><div class="cv" style="font:600 24px 'IBM Plex Mono';top:28px;color:var(--mute)">${c}</div></div>`).join('');
const tWc = [wt('W4', 'kilogram'), wt('W4', 'metre'), wt('W4', 'centimetres') + 0.5];
const tW = [wt('W3', 'A'), wt('W4', 'Put'), wt('W5', 'Multiply'), wt('W6', 'So')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: '1 N = 1000 dyn (only kg → g changed)', right: '1 N = 10³ × 10² = 10⁵ dyn' });
$('#xc').innerHTML = `<div class="cmp" style="left:0;width:520px;top:0;height:76px"><div class="ck" style="font:600 28px 'IBM Plex Mono';color:var(--ink);top:18px">kg → g</div><div class="cv" style="font:600 32px 'IBM Plex Mono';top:16px">× 1000</div></div><div class="cmp" style="left:0;width:520px;top:96px;height:76px"><div class="ck" style="font:600 28px 'IBM Plex Mono';color:var(--ink);top:18px">m → cm</div><div class="cv" style="font:600 32px 'IBM Plex Mono';top:16px">× 100</div></div>`;
const where = PUC.where($('#wa'), { on: [], type: 'Short questions: convert between systems, or find a unit in a new system' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A new system has mass unit 1 g, length unit 1 cm and time unit 0.1 s. How many new force units make 1 N?', qW: 800,
  opts: [K('10^{-3}'), K('10^{3}'), K('10^{5}'), K('10^{7}')], right: 1, cols: 2, optW: 440, optH: 84, optFs: 32, optY: 320 });
const so = PUC.solution($('#so'), [[`unit ${K('= \\dfrac{1\\,\\text{g} \\times 1\\,\\text{cm}}{(0.1\\,\\text{s})^2}')}`], [`${K('= \\dfrac{10^{-3} \\times 10^{-2}}{10^{-2}}\\,\\text{N}')}`], [`${K('= 10^{-3}\\,\\text{N}')}`], [`so 1 N ${K('= 10^{3}')} units`]], { y0: 100, dy: 124 });
const tSo = [wt('A2', 'new'), wt('A2', 'divided'), wt('A3', 'That'), wt('A3', 'So')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · systems of units', y0: 100, dy: 92, txt: [1, 1, 0, 1],
  lines: ['<b>CGS</b> cm g s · <b>FPS</b> ft lb s · <b>MKS</b> m kg s', '<b>SI</b> grew from MKS: 7 base units', K(`1\\,\\text{N} = 10^5\\,\\text{dyn} \\qquad 1\\,${cv(EC, '\\text{J}')} = 10^7\\,\\text{erg}`), '<b>Pressure</b>: Pa is SI · 1 bar = 10⁵ Pa · 1 psi ≈ 6895 Pa'] });
const YQ = ['What do CGS, FPS and MKS stand for?', 'How many dynes make one newton?', 'Is 40 psi more or less than 3 bar?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 05', topic: '18 km/h on the bicycle is how many m/s? Unit Conversions', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.08, 960, 560], [tCgs - 0.3, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; }

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
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exH'), t, tMorph + 0.5, 1e9, { dy: 8 });
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); el.querySelector('.jv .u').style.color = UC; const on = M.io((t - wt('H2', JOBS[i][5]) + 0.1) / 0.25); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#hjP'), t, wt('H2', 'where') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#g0'), t, wt('H3', 'tyre') - 0.1, 1e9, { dy: 20 }); g0(40 * M.io((t - wt('H3', 'forty') + 0.2) / 0.8));
    M.vis($('#g1'), t, wt('H4', 'pump') - 0.1, 1e9, { dy: 20 });
    const pb = BAR40 * M.io((t - wt('H4', 'bar')) / 1.0); g1(pb); M.setT($('#g1N'), pb.toFixed(2));
    M.vis($('#hkP'), t, wt('H4', 'Same') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tC1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('C1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [wt('P2', 'length'), wt('P2', 'mass'), wt('P2', 'time')].forEach((tt, i) => M.vis(pbEl[i], t, tt - 0.1, 1e9, POP));
    paL.forEach(p => M.draw(p, t, wt('P2', 'Everything') - 0.1, 0.5)); M.vis(paD, t, wt('P2', 'built') - 0.1, 1e9, POP);
    M.vis($('#paP'), t, wt('P3', 'new') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    PQ.forEach((_, i) => M.vis($('#pq' + i), t, tPq[i] - 0.15, 1e9, { dx: -20, dy: 0 }));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tS1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#ct'), t, tC1 + 0.05, OUT('S1'), { dy: 36, ...o });
    [0, 1, 2].forEach(k => M.vis($('#sh' + k), t, tC1 + 0.4, 1e9, { dy: 8 }));
    SYS.forEach((_, i) => { M.vis($('#sy' + i), t, tSy[i][0] - 0.5, 1e9, { dx: -24, dy: 0 }); [0, 1, 2].forEach(k => M.vis($('#sc' + i + k), t, tSy[i][k] - 0.1, 1e9, POP)); });
    const hl = M.io((t - wt('C5', 'second') + 0.1) / 0.3), dl = M.io((t - wt('C5', 'length') + 0.1) / 0.3);
    SYS.forEach((_, i) => { $('#sc' + i + '2').style.background = mix('#FFFFFF', C.okBg, hl); [0, 1].forEach(k => { $('#sc' + i + k).style.background = mix('#FFFFFF', C.ac2, dl); }); });
    M.vis($('#ctP'), t, wt('C5', 'agree') - 0.1, 1e9, POP);
  }

  /* S: trolley */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tt = simT(t), v = 2 * tt, x = tt * tt, bx = X0 + x * PX;
    troP.setAttribute('transform', `translate(${bx.toFixed(1)},${FY})`); M.vis(tro, t, T0('S2') - 0.1, 1e9, { dy: -20 });
    const mv = (t > tGo && t < tSlo) || (t > tSlo && tt < TEND);
    gTr.forEach((g, k) => { const tg = Math.max(0, tt - 0.18 * (k + 1)); g.setAttribute('transform', `translate(${(X0 + tg * tg * PX).toFixed(1)},${FY})`); g.setAttribute('opacity', mv && tt > 0.3 ? [0.3, 0.2, 0.12][k] : 0); });
    const fOn = M.io((t - wt('S2', 'force') + 0.1) / 0.4);
    fA.set(bx - 64 - 100 * fOn, FY - 48, bx - 64, FY - 48); attr(fL, 'x', (bx - 64 - 100 * fOn - 6).toFixed(1)); attr(fL, 'y', FY - 66); fL.style.opacity = fOn.toFixed(3);
    const vOn = M.io((t - tSlo - 0.3) / 0.5);
    vA.set(bx, FY - 110, bx + v * 16 * vOn, FY - 110); attr(vL, 'x', (bx + v * 16 * vOn + 8).toFixed(1)); attr(vL, 'y', FY - 100); vL.style.opacity = vOn.toFixed(3);
    const tg = $('#sTag'); M.setT(tg, 'SLOW-MO REPLAY · 0.25x'); M.vis(tg, t, tSlo - 0.1, tCgs - 0.3, { ...POP, outDur: 0.25 });
    const sy = sysAt(t), [k, vu, fu, fv] = VF[sy];
    M.setT($('#rt'), tt.toFixed(2)); M.setT($('#rv'), (v * k).toFixed(sy === 1 ? 0 : 2)); M.setT($('#rvu'), vu);
    M.setT($('#rf'), sy === 1 ? '400 000' : sy === 2 ? fv.toFixed(2) : '4'); M.setT($('#rfu'), fu);
    M.vis($('#roG'), t, tS1 + 0.5, 1e9, { dy: 10 });
    $('#dial').querySelectorAll('span').forEach((sp, i) => { const on = i === sy ? 1 : 0; sp.style.background = on ? UC : '#fff'; sp.style.color = on ? '#fff' : C.mute; sp.style.borderColor = on ? UC : C.line; });
    M.vis($('#dial'), t, tS1 + 0.6, 1e9, { dy: 10 });
    // graph y-axis label follows the system; curve keeps its shape (number and unit change together)
    M.setT(G.ylab, 'v (' + vu + ')');
    [...$('#grS').querySelectorAll('text')].forEach(e => { if (e._y0 === undefined && /^[048]$/.test(e.textContent) && +e.getAttribute('x') < 110) e._y0 = +e.textContent; if (e._y0 !== undefined) M.setT(e, sy === 1 ? String(e._y0 * 100) : sy === 2 ? (e._y0 / 0.3048).toFixed(1).replace('.0', '') : String(e._y0)); });
    gCur(u => [u, 2 * u], 0, tt); gDot(tt, v, t > tS1 + 0.5);
    avA(t, wt('S7', 'trolley') + 0.2, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hb = $('#hiB'), hiY = M.track(80, [[tStep[1] - 0.1, 200], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 440]], M.SOFT)(t); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, wt('D4', 'gram') - 0.1, 1e9, { dx: 60, dy: 0 });
    [wt('D4', 'gram') + 0.2, wt('D4', 'centimetre') + 0.2, wt('D5', 'dyne') - 0.2].forEach((tt, i) => M.vis($('#cm' + i), t, tt - 0.1, 1e9, { dx: -20, dy: 0 }));
    PUC.write($('#drN'), t, wt('D5', 'lakh') - 0.2, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Change') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'every'), 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tB1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exK'), t, tK1 + 0.5, 1e9, { dy: 8 });
    M.vis(apple, t, wt('K1', 'apple') - 0.2, 1e9, { dy: -30, sp: M.SOFT, fade: 0.1 }); bN(M.io((t - wt('K1', 'newton')) / 0.8)); M.vis($('#kbC'), t, wt('K1', 'apple') + 0.2, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(mosq, t, wt('K2', 'mosquito') - 0.2, 1e9, { ...POP, sc: 0.4 }); bD(M.io((t - wt('K2', 'dyne')) / 0.8)); M.vis($('#kdC'), t, wt('K2', 'hundred') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('B1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'joule') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'One', 1) });
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B6');
    M.vis($('#bl'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o });
    BC.forEach((_, i) => { const el = $('#bc' + i); M.vis(el, t, tBc[i] - 0.2, 1e9, { dy: 16 }); PUC.write(el.querySelector('.jv'), t, (i === 0 ? wt('B4', 'six') : tBc[i]) + 0.1, 0.6); });
    M.vis($('#br'), t, T0('B5') - 0.1, out, { dx: 60, dy: 0, ...o });
    g2(BAR40 * M.io((t - wt('B5', 'Pump')) / 1.6));
    M.vis($('#brP'), t, wt('B5', 'two') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tB6 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tB6, tOpts: wt('B6', 'bar') - 0.1, tCount: T1('B6') + 0.05, dur: 3, tAns: T0('B7') - 0.02, tWhy: wt('B7', 'SI') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W3') - 0.1, out, { dx: 60, dy: 0, ...o });
    WC.forEach((_, i) => M.vis($('#wc' + i), t, tWc[i] - 0.1, 1e9, { dx: -20, dy: 0 }));
    M.vis($('#wR'), t, wt('W6', 'ten') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'one') - 0.1, tStrike: wt('X3', 'But') + 0.1, tRight: wt('X3', 'Together') - 0.1 });
    const xc = $('#xc').children; M.vis(xc[0], t, wt('X3', 'Kilogram') - 0.1, 1e9, { dx: -16, dy: 0 }); M.vis(xc[1], t, wt('X3', 'Metre') - 0.1, 1e9, { dx: -16, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
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
