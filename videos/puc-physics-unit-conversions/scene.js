// PUC Physics Ep 05: Unit conversions (Motion notebook, bicycle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const UC = C.violet, NC = C.ink, VC = C.ac;      // colour-coding: n ink, unit u violet, velocity v blue
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const u = s => `\\textcolor{${UC}}{\\text{${s}}}`;          // a unit, upright and violet

Object.assign(M.IC, {
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  scissors: ['M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M20 4 8.12 15.88', 'M14.47 14.48 20 20', 'M8.12 8.12 12 12'],
  sign: ['M12 22V12', 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z', 'M9 22h6'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1');
const tK1 = T0('K1'), tK3 = T0('K3'), tA1 = T0('A1'), tA5 = T0('A5'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A8') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three places, three units ---------- */
const JOBS = [['scissors', 'Tailor', 'INCHES', '30', 'in', 'tailor'], ['sign', 'Road sign', 'KILOMETRES PER HOUR', '40', 'km/h', 'road'], ['book', 'Physics book', 'METRES PER SECOND', '', 'm/s', 'physics']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
/* ---------- H ---------- */
const JW = ['SHIRT LENGTH', 'SPEED LIMIT', 'SI UNIT OF SPEED'];
$('#jrs').innerHTML = JOBS.map(([ic, n, , v, un], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${JW[i]}</div><div class="jv"><span>${v}</span> <span class="u">${un}</span></div></div>`).join('');
const TILES = [['book', 'Homework: speed in m/s'], ['help', 'Still 18?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, UC, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'homework'), wt('H4', 'still')];

/* ---------- P: what converting means + factor ---------- */
$('#plF').innerHTML = K(`\\textcolor{${NC}}{n_1}\\,\\textcolor{${UC}}{u_1} = \\textcolor{${NC}}{n_2}\\,\\textcolor{${UC}}{u_2}`);
$('#fxF').innerHTML = K(`\\dfrac{1\\,${u('km')}}{1000\\,${u('m')}} = 1`);
const b1 = $('#br1S'); const segs = [];
for (let i = 0; i < 10; i++) segs.push(mk(b1, 'rect', { x: 36 + i * 71.2, y: 0, width: 71.2, height: 56, fill: i % 2 ? '#EDE6FB' : '#E2D8F8', stroke: '#fff', 'stroke-width': 2 }));
const b1t = txt(b1, 56, 37, '1000 m', { 'font-size': 26, 'font-weight': 600, fill: C.ink });
const b1s = txt(b1, 748, 76, '10 × 100 m', { 'font-size': 16, 'text-anchor': 'end' });

/* ---------- S: the ride ---------- */
const s = $('#simS'), X0 = 130, PXM = 40, RY = 340, WR = 26;     // 40 px per metre, road at y 300
mk(s, 'line', { x1: 40, y1: RY, x2: 744, y2: RY, stroke: C.ink, 'stroke-width': 3 });
for (let m = 0; m <= 15; m++) { const x = X0 + m * PXM, L = m % 5 ? 10 : 22; mk(s, 'line', { x1: x, y1: RY + 3, x2: x, y2: RY + 3 + L, stroke: C.ink, 'stroke-width': m % 5 ? 1.5 : 2.5 }); if (m % 5 === 0) txt(s, x, RY + 52, m + ' m', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
txt(s, 744, RY + 52, 'x', { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22 });
// a bicycle drawn around its front hub (0, 0); wheel radius 26 px
const bike = () => {
  const outer = mk(s, 'g', {}), g = mk(outer, 'g', {}); const wl = [];
  [-84, 0].forEach(cx => { const w = mk(g, 'g', {}); mk(w, 'circle', { cx, cy: 0, r: WR, fill: 'none', stroke: C.ink, 'stroke-width': 4 }); [0, 45, 90, 135].forEach(a => { const r = a * Math.PI / 180; mk(w, 'line', { x1: cx - WR * Math.cos(r), y1: -WR * Math.sin(r), x2: cx + WR * Math.cos(r), y2: WR * Math.sin(r), stroke: C.ink, 'stroke-width': 1.5 }); }); mk(w, 'circle', { cx, cy: 0, r: 4, fill: C.ink }); wl.push([w, cx]); });
  mk(g, 'path', { d: 'M-84,0 L-46,0 L-60,-38 Z M-46,0 L-10,-38 L-60,-38 M-10,-38 L0,0 M-60,-38 L-64,-50 M-10,-38 L-6,-54 L6,-56', fill: 'none', stroke: '#2A3F7A', 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M-76,-52 L-54,-52', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
  return { g, wl, outer };
};
const ghosts = [0, 1, 2].map(() => bike()); const bk = bike();
const vA = PUC.arrow(s, VC, 6, 18);
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const brk = mk(s, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
const brT = txt(s, 0, RY + 120, '', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
// sim clock: real time (1 sim second = 1 s on screen), a slow-mo replay at 0.25x, holds between runs
const tA = wt('S3', 'After') - 0.15, tB = wt('S3', 'After', 1) - 0.15, tRep = wt('S4', 'Start') - 0.1, tC = Math.max(T0('S5') - 0.1, tRep + 4.1);
const SEG = [[tA, tA + 1, 0, 1], [tB, tB + 1, 1, 2], [tRep, tRep + 4, 0, 1], [tC, tC + 2, 1, 3]];
const simT = t => { let v = 0; for (const [a, b, s0, s1] of SEG) if (t >= a) v = t >= b ? s1 : M.lerp(s0, s1, (t - a) / (b - a)); return v; };
const moving = t => SEG.some(([a, b]) => t >= a && t < b);
const maxS = t => { let v = 0; for (const [a, b, s0, s1] of SEG) if (t >= a) v = Math.max(v, t >= b ? s1 : M.lerp(s0, s1, (t - a) / (b - a))); return v; };
const VEL = 5;            // m/s (18 km/h)
const placeBike = (b, st) => { const xm = VEL * st, x = X0 + xm * PXM; attr(b.g, 'transform', `translate(${x.toFixed(1)},${RY - WR - 2})`); const ang = (xm / 0.33) * 180 / Math.PI; b.wl.forEach(([w, cx]) => attr(w, 'transform', `rotate(${(ang % 360).toFixed(1)} ${cx} 0)`)); return x; };
$('#roG').innerHTML = `<span class="k">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k">x</span><span class="v" id="rx">0.0</span><span class="u">m</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">18</span><span class="u" id="rvu" style="color:${UC}">km/h</span>`;
const G = PUC.graph($('#grS'), { x: 100, y: 74, w: 600, h: 140, xmax: 3, ymin: 0, ymax: 15, xt: [0, 1, 2, 3], yt: [0, 5, 10, 15], xl: 't (s)', yl: 'x (m)' });
const gDim = G.curve(C.ac2, 5), gC = G.curve(VC, 5), gD = G.dot(C.ink);
const gTag = document.createElement('div'); gTag.className = 'pillp ac'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px'; gTag.innerHTML = 'slope = 5 m/s = 18 km/h'; $('#gr').appendChild(gTag);
const avA = PUC.avatar($('#sim'), { x: 36, y: 474, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Only 5? It felt so fast!' });
const tFlip = [wt('S6', 'Flip'), wt('S6', 'Eighteen'), wt('S6', 'five')];
const unitMode = t => t < tFlip[0] ? 0 : t < tFlip[1] ? 1 : t < tFlip[2] ? 0 : 1;    // 0 km/h, 1 m/s

/* ---------- D: derivation (5 steps) ---------- */
const DR = [[`18\\,${u('km/h')} = 18 \\times \\dfrac{1\\,${u('km')}}{1\\,${u('h')}}`, 'write the unit as a fraction', ''],
  [`= 18 \\times \\dfrac{1000\\,${u('m')}}{1\\,${u('h')}}`, 'swap km for metres', '1 km = 1000 m'],
  [`= 18 \\times \\dfrac{1000\\,${u('m')}}{3600\\,${u('s')}}`, 'swap the hour for seconds', '1 h = 60 × 60 = 3600 s'],
  [`= 18 \\times \\dfrac{5}{18}\\;${u('m/s')}`, 'simplify', '1000/3600 = 5/18'],
  [`= \\textcolor{${VC}}{5\\,\\text{m/s}}`, 'what the bicycle showed', '']];
$('#drs').innerHTML = `<div class="hiBox" id="hiB" style="left:30px;width:1540px;height:92px"></div>` + DR.map(([f, w, b], i) => `<div class="dr" id="dr${i}" style="top:${80 + i * 96}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}${b ? ` <b>${b}</b>` : ''}</div></div>`).join('');
const tDr = [wt('D2', 'Eighteen'), wt('D3', 'One'), wt('D4', 'One'), wt('D5', 'One'), wt('D6', 'is')];

/* ---------- R: reasoning ---------- */
const LK = [['km → m', 'a big unit becomes a small one', '× 1000'], ['h → s', 'one second is much shorter than an hour', '÷ 3600'], ['Together', 'the number shrinks: 1000 ÷ 3600 = 5/18', '÷ 3.6']];
$('#lks').innerHTML = LK.map(([h, s2, op], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 152}px"><div class="h">${h}</div><div class="s">${s2}</div><div class="op">${op}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${u('km/h')} \\xrightarrow{\\;\\times\\, 5/18\\;} ${u('m/s')} \\qquad ${u('m/s')} \\xrightarrow{\\;\\times\\, 18/5\\;} ${u('km/h')}`);

/* ---------- K: side by side ---------- */
const bars = (svg, n, w, col) => { const out = []; for (let i = 0; i < n; i++) out.push(mk(svg, 'rect', { x: 36 + i * w, y: 10, width: w, height: 44, fill: i % 2 ? col : M.mix(col, '#FFFFFF', 0.35), stroke: '#fff', 'stroke-width': 2 })); return out; };
const kbB = bars($('#kbS'), 18, 500 / 18, '#B9A3EE'), kdB = bars($('#kdS'), 5, 100, '#B9A3EE');
txt($('#kbS'), 36, 86, '18 × (1 km/h)', { 'font-size': 20, fill: C.ink, 'font-weight': 600 }); txt($('#kdS'), 36, 86, '5 × (1 m/s)', { 'font-size': 20, fill: C.ink, 'font-weight': 600 });
txt($('#kbS'), 536, 86, 'same length', { 'font-size': 18, 'text-anchor': 'end' }); txt($('#kdS'), 536, 86, 'same length', { 'font-size': 18, 'text-anchor': 'end' });
const th1 = PUC.think($('#th1'), { q: 'A car moves at 72 km/h. In m/s, is the number bigger or smaller than 72?', opts: ['Bigger', 'Smaller'], right: 1, why: '72 × 5/18 = 20 m/s. The m/s is the bigger unit, so the number gets smaller.' });

/* ---------- A: powers ---------- */
const aS = $('#aS'), SQX = 216, SQY = 84, SQ = 340;
const sqR = mk(aS, 'rect', { x: SQX, y: SQY, width: SQ, height: SQ, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 });
const gridL = []; for (let i = 1; i < 10; i++) { gridL.push(mk(aS, 'line', { x1: SQX + i * SQ / 10, y1: SQY, x2: SQX + i * SQ / 10, y2: SQY + SQ, stroke: C.ac, 'stroke-width': 1.2, opacity: 0.6 })); gridL.push(mk(aS, 'line', { x1: SQX, y1: SQY + i * SQ / 10, x2: SQX + SQ, y2: SQY + i * SQ / 10, stroke: C.ac, 'stroke-width': 1.2, opacity: 0.6 })); }
const cell = mk(aS, 'rect', { x: SQX, y: SQY, width: SQ / 10, height: SQ / 10, fill: C.ac, opacity: 0.9 });
const sB = txt(aS, SQX + SQ / 2, SQY + SQ + 42, '1 m', { 'text-anchor': 'middle', 'font-size': 26, fill: UC, 'font-weight': 600 });
const sL = txt(aS, SQX - 22, SQY + SQ / 2 + 8, '1 m', { 'text-anchor': 'end', 'font-size': 26, fill: UC, 'font-weight': 600 });
const cellT = txt(aS, SQX + SQ + 24, SQY + 26, '10 cm × 10 cm', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const cellT2 = txt(aS, SQX + SQ + 24, SQY + 50, '= 100 cm²', { 'font-size': 18, fill: C.ink, 'font-weight': 600 });
const aChip = document.createElement('div'); aChip.className = 'pillp ink'; aChip.style.cssText = 'left:36px;top:496px'; aChip.innerHTML = '100 squares × 100 cm² = <b class="mono">10,000 cm²</b>'; $('#al').appendChild(aChip);
const PW = [['LENGTH', `1\\,${u('m')} = 100\\,${u('cm')}`, '× 100', null], ['AREA', `1\\,${u('m}^2\\text{')} = 10^4\\,${u('cm}^2\\text{')}`, '× 100²', `1\\,${u('m}^2\\text{')} = \\;?\\;${u('cm}^2\\text{')}`], ['VOLUME', `1\\,${u('m}^3\\text{')} = 10^6\\,${u('cm}^3\\text{')}`, '× 100³', null]];
$('#pws').innerHTML = PW.map(([h, f, op, f0], i) => `<div class="pw" id="pw${i}" style="top:${84 + i * 136}px"><div class="h">${h}</div><div class="f" id="pwf${i}">${K(f)}</div>${f0 ? `<div class="f" id="pwq${i}">${K(f0)}</div>` : ''}<div class="op" id="pwo${i}">${op}</div></div>`).join('');
const th2 = PUC.think($('#th2'), { q: 'How many square centimetres make one square metre?', opts: ['100 cm²', '10,000 cm²'], right: 1, why: '100 cm × 100 cm = 10,000 cm². The unit is squared, so the factor is squared too.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`1\\,${u('g')} = 10^{-3}\\,${u('kg')}`)],
  [K(`1\\,${u('cm}^3\\text{')} = (10^{-2}\\,${u('m')})^3 = 10^{-6}\\,${u('m}^3\\text{')}`)],
  [K(`1\\,\\dfrac{${u('g')}}{${u('cm}^3\\text{')}} = \\dfrac{10^{-3}}{10^{-6}}\\,\\dfrac{${u('kg')}}{${u('m}^3\\text{')}} = 10^{3}\\,\\dfrac{${u('kg')}}{${u('m}^3\\text{')}}`)],
  [K(`\\rho_{\\text{water}} \\approx \\textcolor{${VC}}{1000\\,\\text{kg/m}^3}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 104 });
const wr = $('#wrS');
// isometric cubes (flat line drawing): a big 1 m cube and a tiny 1 cm cube (not to scale)
const cube = (cx, cy, a, fill, sw) => { const dx = a * 0.5, dy = a * 0.3, g = mk(wr, 'g', {});
  mk(g, 'path', { d: `M${cx},${cy} h${a} v${a} h${-a} Z`, fill, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: `M${cx},${cy} l${dx},${-dy} h${a} l${-dx},${dy} Z`, fill: M.mix(fill, '#FFFFFF', 0.4), stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' });
  mk(g, 'path', { d: `M${cx + a},${cy} l${dx},${-dy} v${a} l${-dx},${dy} Z`, fill: M.mix(fill, C.ink, 0.12), stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' });
  return g; };
const cBig = cube(320, 160, 220, '#CFE3F7', 3), cSm = cube(90, 340, 40, '#9CC4EE', 2.5);
const cSmT = mk(wr, 'g', {}); txt(cSmT, 112, 420, '1 cm³', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); txt(cSmT, 112, 446, 'about 1 g', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const cBigT = mk(wr, 'g', {}); txt(cBigT, 430, 420, '1 m³ = 10⁶ cm³', { 'font-size': 20, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }); txt(cBigT, 430, 446, 'about 1000 kg', { 'font-size': 20, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
const nts = txt(wr, 748, 556, 'NOT TO SCALE', { 'font-size': 15, 'text-anchor': 'end', 'letter-spacing': 2 });
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'So')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: '36 km/h × 18/5 = 129.6 m/s', right: '36 km/h × 5/18 = 10 m/s' });
const tS = $('#tS');
const tb = (x, w, label) => { const g = mk(tS, 'g', {}); mk(g, 'rect', { x, y: 92, width: w, height: 64, rx: 12, fill: C.soft }); txt(g, x + w / 2, 134, label, { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 }); return g; };
const tb0 = tb(30, 170, '36 km/h'), tb1 = tb(360, 160, '10 m/s');
const tAr = PUC.arrow(tS, C.ok, 5, 16); const tArT = txt(tS, 280, 76, '× 5/18', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ok, 'font-weight': 600 });
const tDn = txt(tS, 280, 206, 'bigger unit, smaller number', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'First step inside numericals: km/h, g/cm³ and units with powers' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `The acceleration due to gravity is ${K('\\textcolor{' + C.red + '}{g} = 9.8\\ \\text{m s}^{-2}')}. What is it in ${K('\\text{km h}^{-2}')}?`, qW: 780,
  opts: [K('35.3\\ \\text{km h}^{-2}'), K('1.27 \\times 10^{5}\\ \\text{km h}^{-2}'), K('1.27 \\times 10^{8}\\ \\text{km h}^{-2}'), K('7.56 \\times 10^{-4}\\ \\text{km h}^{-2}')], right: 1, optW: 474, optY: 330 });
const so = PUC.solution($('#so'), [[K(`1\\,${u('m')} = 10^{-3}\\,${u('km')}`)], [K(`1\\,${u('s')} = \\tfrac{1}{3600}\\,${u('h')}`)], [K(`\\textcolor{${C.red}}{g} = 9.8 \\times \\dfrac{10^{-3}}{(1/3600)^2}`)], [K(`\\textcolor{${C.red}}{g} \\approx 1.27 \\times 10^{5}\\ \\text{km h}^{-2}`)], ['<span style="font:500 22px Poppins">A: no square · C: no 1000 · D: flipped</span>']], { y0: 96, dy: 100 });
const tSo = [wt('A9', 'Metres'), wt('A9', 'second'), wt('A9', 'times'), wt('A9', 'squared', 2) + 0.3, T0('A10')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · unit conversions', y0: 100, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${NC}}{n_1}\\textcolor{${UC}}{u_1} = \\textcolor{${NC}}{n_2}\\textcolor{${UC}}{u_2} \\qquad \\tfrac{1\\,\\text{km}}{1000\\,\\text{m}} = 1`),
    '<b>km/h → m/s</b>: × 5/18 &nbsp;·&nbsp; <b>m/s → km/h</b>: × 18/5',
    '<b>Powers</b>: 1 m² = 10⁴ cm² &nbsp;·&nbsp; 1 m³ = 10⁶ cm³',
    '<b>Check</b>: bigger unit, smaller number'] });
const YQ = ['Why is 18 km/h not 18 m/s?', 'What is 54 km/h in m/s?', 'How many cm³ make 1 m³, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 06', topic: 'Can you add 5 m to 5 s? Dimensions of Physical Quantities', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.15, 1.12, 600, 560], [tC + 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
}
const fmt = (v, d) => v.toFixed(d);

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const on = M.io((t - wt('H2', 'different') + 0.1) / 0.3); el.style.background = mix(C.soft, C.ac3, on); });
    M.vis($('#hjP'), t, wt('H2', 'switch') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#haF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#mtrN'), t, wt('H3', 'eighteen') - 0.2, 1e9, { dy: -24, sp: M.SOFT });
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25); el.style.background = mix(C.soft, i ? C.redBg : C.ac2, on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    [wt('P2', 'quantity'), wt('P2', 'unit'), wt('P2', 'number')].forEach((tt, i) => M.vis($('#pl' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#plL'), t, T0('P3') + 0.1, 1e9, { dy: 10 }); PUC.write($('#plF'), t, wt('P3', 'n') - 0.1, 0.8);
    M.vis($('#plP'), t, T1('P3') - 0.2, 1e9, POP);
    M.vis($('#pr'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#fxF'), t, wt('P4', 'fraction') - 0.1, 0.9);
    M.vis($('#br0'), t, wt('P5', 'kilometre') - 0.1, 1e9, { dx: -20, dy: 0 });
    segs.forEach((r, i) => { const on = M.clamp((t - wt('P5', 'thousand') + 0.1 - i * 0.05) / 0.12); r.style.opacity = on.toFixed(3); });
    M.vis(b1t, t, wt('P5', 'thousand') + 0.4, 1e9, { dy: 0 }); M.vis(b1s, t, wt('P5', 'thousand') + 0.5, 1e9, { dy: 0 });
    M.vis($('#prP'), t, T0('P6') + 0.2, 1e9, POP);
  }

  /* S: the ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const st = simT(t), mv = moving(t), slow = t >= tRep && t < tRep + 4;
    bk.outer.style.opacity = M.clamp((t - tS1 - 0.4) / 0.3).toFixed(3);
    const bx = placeBike(bk, st);
    ghosts.forEach((gb, k) => { const seg = SEG.find(([a, b2]) => t >= a && t < b2 + 0.4); const gs = simT(Math.max(seg ? seg[0] : 0, t - (slow ? 0.6 : 0.15) * (k + 1))); const gx = placeBike(gb, gs); gb.g.style.opacity = (mv && Math.abs(gx - bx) > 6) ? [0.3, 0.2, 0.12][k] : 0; });
    // velocity vector grows from the bike while it moves (and in the replay)
    const vOn = M.io((t - tA) / 0.3) * (st < 3 || mv ? 1 : 1 - M.io((t - tC - 2) / 0.3));
    const vLen = 5 * 24 * (slow ? M.io((t - tRep - 0.3) / 1.2) : vOn);
    const vOnF = t >= tA ? 1 : 0; vA.set(bx + 34, RY - 70, bx + 34 + vLen * vOnF, RY - 70);
    attr(vL, 'x', (bx + 34 + vLen + 10).toFixed(1)); attr(vL, 'y', RY - 60); vL.style.opacity = (vOnF * M.clamp(vLen / 60)).toFixed(3);
    // bracket: distance covered after each whole second
    const bS = t >= tRep && t < tRep + 4 ? 0 : (t >= tB + 1 ? 2 : t >= tA + 1 ? 1 : 0), bR = t >= tRep + 4 && t < tC ? 1 : bS;
    const bm = (t >= tC + 2) ? 3 : bR;
    if (bm > 0) { const x1 = X0 + 5 * bm * PXM; attr(brk, 'd', `M${X0},${RY + 66} v10 H${x1} v-10`); M.hide(brk, false); attr(brT, 'x', ((X0 + x1) / 2).toFixed(1)); M.setT(brT, `${5 * bm} m in ${bm} s`); M.hide(brT, false); }
    else { M.hide(brk, true); M.hide(brT, true); }
    M.vis($('#slo'), t, tRep, tRep + 4, { dy: 0, sc: 0.8, sp: M.POP, outDur: 0.2, ody: 0 });
    // readout + meter + dial
    const um = unitMode(t);
    M.setT($('#rt'), fmt(st, 2)); M.setT($('#rx'), fmt(VEL * st, 1));
    M.setT($('#rv'), um ? '5' : '18'); M.setT($('#rvu'), um ? 'm/s' : 'km/h');
    M.vis($('#mtr'), t, tA - 0.3, 1e9, POP); M.setT($('#mtrV'), um ? '5' : '18'); M.setT($('#mtrU'), um ? 'm/s' : 'km/h');
    $('#mtr').style.left = (748 - $('#mtr').offsetWidth) + 'px'; $('#mtr').style.top = '64px';
    M.vis($('#dial'), t, tS1 + 0.6, 1e9, { dy: 10 });
    $('#dial').querySelectorAll('span').forEach((sp, i) => { const on = i === um ? 1 : 0; sp.style.background = on ? UC : '#FFFFFF'; sp.style.color = on ? '#FFFFFF' : C.mute; sp.style.borderColor = on ? UC : C.line; });
    // graph: x = 5 t, dot linked to the bike
    gDim((s2) => [s2, VEL * s2], 0, maxS(t)); gC((s2) => [s2, VEL * s2], 0, st); gD(st, VEL * st, t >= tS1 + 0.4);
    M.vis(gTag, t, wt('S7', 'slope') - 0.1, 1e9, POP);
    avA(t, wt('S5', 'So') - 0.1, out);
  }

  /* D: derivation */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, OUT('R1'), { dy: 36, ...o });
    M.vis($('#dGoal'), t, tD1 + 0.4, 1e9, POP); M.setT($('#dGoal'), t >= tDr[4] ? '18 km/h = 5 m/s' : '18 km/h = ? m/s');
    DR.forEach((_, i) => { const el = $('#dr' + i); M.vis(el.querySelector('.n'), t, tDr[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDr[i], 0.8); M.vis(el.querySelector('.why'), t, tDr[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tDr.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 96]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tDr[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
  }

  /* R: reasoning */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.05, 1e9, { dy: 16 }); const on = M.io((t - tLk[i] - 0.4) / 0.3) * (i < 2 ? 1 - M.io((t - tLk[i + 1]) / 0.3) : 1); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#rr'), t, tR1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const k1 = wt('R2', 'thousand'), k2 = wt('R3', 'divide');
    const n = t < k1 ? 18 : t < k2 ? 18 + (18000 - 18) * M.o5((t - k1) / 0.8) : 18000 + (5 - 18000) * M.o5((t - k2) / 0.8);
    M.setT($('#rnum'), Math.round(n).toLocaleString('en-IN'));
    M.setT($('#runit'), t < k1 ? 'km/h' : t < k2 ? 'm/h' : 'm/s'); M.setT($('#rcap'), t < k1 ? 'kilometres in one hour' : t < k2 ? 'metres in one hour' : 'metres in one second');
    $('#rnum').style.color = t >= k2 + 0.8 ? VC : C.ink;
    M.vis($('#rrP'), t, wt('R4', 'same') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Kilometres') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Back') - 0.2, 0.9);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tA1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#kbN'), t, wt('K1', 'eighteen') - 0.1, 1e9, { dy: 20 }); M.vis($('#kbC'), t, wt('K1', 'hour') - 0.1, 1e9, { dy: 10 });
    kbB.forEach((r, i) => { r.style.opacity = M.clamp((t - wt('K1', 'hour') - i * 0.04) / 0.12).toFixed(3); });
    M.vis($('#kd'), t, wt('K1', 'right') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kdN'), t, wt('K1', 'five') - 0.1, 1e9, { dy: 20 }); M.vis($('#kdC'), t, wt('K1', 'second') - 0.1, 1e9, { dy: 10 });
    kdB.forEach((r, i) => { r.style.opacity = M.clamp((t - wt('K1', 'second') - i * 0.12) / 0.12).toFixed(3); });
    M.vis($('#kdP'), t, wt('K2', 'Same') - 0.1, 1e9, POP); M.vis($('#kbP'), t, wt('K2', 'bigger') - 0.1, 1e9, POP);
    const ks = M.io((t - wt('K2', 'bigger')) / 0.3); $('#kdP').style.background = mix(C.soft, C.ac, ks); $('#kdP').style.color = mix(C.ink, '#FFFFFF', ks);
    M.setT($('#kdP'), t >= wt('K2', 'bigger') - 0.1 ? 'Big unit, small number' : 'Same bicycle, same speed');
    M.setT($('#kbP'), 'Small unit, big number');
    M.vis($('#th1'), t, tK3 + 0.05, OUT('A1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'bigger') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Seventy') });
  }

  /* A: units with powers + think */
  const aOn = t >= tA1 - 0.1 && t < tW1 + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = OUT('A5'), out2 = OUT('W1'), tBack = T0('A7') - 0.25, second = t >= tBack - 0.3;
    const win = (tin1) => second ? [tBack, out2] : [tin1, out];
    M.vis($('#ar'), t, ...win(tA1 + 0.1), { dx: 60, dy: 0, ...o });
    M.vis($('#pw0'), t, T0('A2') - 0.1, 1e9, { dy: 16 });
    M.vis($('#pw1'), t, T0('A3') + 0.2, 1e9, { dy: 16 });
    const rv = T0('A6') - 0.02; M.hide($('#pwf1'), t < rv); M.hide($('#pwq1'), t >= rv); M.vis($('#pwo1'), t, rv, 1e9, POP);
    M.vis($('#pw2'), t, wt('A7', 'cube') - 0.1, 1e9, { dy: 16 });
    M.vis($('#arP'), t, tBack + 0.2, 1e9, POP);
    [0, 2].forEach(i => M.vis($('#pwo' + i), t, i ? wt('A7', 'cubic') : wt('A2', 'hundred'), 1e9, POP));
    M.vis($('#al'), t, ...win(T0('A3') - 0.1), { dx: -60, dy: 0, ...o });
    const sq = M.o3((t - wt('A3', 'square') - 0.1) / 0.6); attr(sqR, 'width', (SQ * sq).toFixed(1)); attr(sqR, 'height', (SQ * sq).toFixed(1)); M.hide(sqR, sq <= 0);
    const side = t >= wt('A4', 'hundred'); M.setT(sB, side ? '100 cm' : '1 m'); M.setT(sL, side ? '100 cm' : '1 m'); M.vis(sB, t, wt('A3', 'side'), 1e9, { dy: 0 }); M.vis(sL, t, wt('A3', 'side'), 1e9, { dy: 0 });
    gridL.forEach((l, i) => M.draw(l, t, wt('A4', 'area') - 0.1 + i * 0.03, 0.3));
    M.vis(cell, t, wt('A4', 'area') + 0.8, 1e9, { dy: 0 }); M.vis(cellT, t, wt('A4', 'area') + 0.9, 1e9, { dy: 0 }); M.vis(cellT2, t, wt('A4', 'area') + 1.1, 1e9, { dy: 0 });
    M.vis(aChip, t, tBack + 0.3, 1e9, POP);
    M.vis($('#th2'), t, tA5 + 0.05, tBack - 0.35, { dy: 36, ...o });
    th2(t, { tin: tA5, tOpts: wt('A5', 'hundred') - 0.1, tCount: T1('A5') + 0.05, dur: 3, tAns: T0('A6') - 0.02, tWhy: wt('A6', 'One') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(cSm, t, wt('W2', 'gram') - 0.1, 1e9, { dy: 0 }); M.vis(cSmT, t, wt('W2', 'gram') + 0.2, 1e9, { dy: 0 });
    M.vis(cBig, t, wt('W2', 'kilograms') - 0.1, 1e9, { dy: 0 }); M.vis(nts, t, wt('W2', 'kilograms') + 0.3, 1e9, { dy: 0 });
    M.vis(cBigT, t, wt('W4', 'six') - 0.1, 1e9, { dy: 0 });
    const wc = $('#wc'); M.vis(wc, t, T0('W2') + 0.6, 1e9, POP);
    const late = t >= wt('W6', 'thousand') - 0.1; M.setT($('#wcN'), late ? '1000' : '1'); M.setT($('#wcU'), late ? 'kg/m³' : 'g/cm³');
    wc.style.left = (748 - wc.offsetWidth) + 'px'; wc.style.top = '476px';
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'multiply') - 0.1, tStrike: wt('X3', 'backwards') - 0.1, tRight: wt('X3', 'Thirty') - 0.1 });
    const r0 = wt('X3', 'Thirty');
    M.vis(tb0, t, r0, 1e9, { dy: 0 });
    const ua = M.io((t - r0 - 0.3) / 0.4); tAr.set(210, 124, 210 + 140 * ua, 124); M.hide(tAr.g, ua <= 0.01); tArT.style.opacity = ua.toFixed(3);
    M.vis(tb1, t, wt('X3', 'ten') - 0.05, 1e9, { dy: 0 }); M.vis(tDn, t, wt('X3', 'ten') + 0.3, 1e9, { dy: 0 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'first') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
