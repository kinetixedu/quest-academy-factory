// PUC Physics Ep 02: Fundamental and derived quantities (Motion notebook, Aarav's bicycle ride)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, UC = C.violet, NC = C.ink;   // colour-coding: v blue, a red, F orange, unit violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const cv = (c, s) => `\\textcolor{${c}}{${s}}`;

Object.assign(M.IC, {
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  square: ['M4 4h16v16H4z', 'M4 9h16', 'M9 4v16'],
  carton: ['M7 8h10v13H7z', 'M7 8l2-4h6l2 4', 'M10 12h4'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP4 = T0('P4'), tP5 = T0('P5');
const tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tR1 = T0('R1'), tB1 = T0('B1'), tB4 = T0('B4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three things ---------- */
const JOBS = [['ruler', 'Tailor', 'CLOTH BY THE METRE', '1', 'm', 'tailor'], ['square', 'Painter', 'WALL BY THE SQUARE METRE', '1', 'm²', 'painter'], ['carton', 'Milk packet', 'MILK BY THE LITRE', '1', 'L', 'milk']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[5]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, v, u], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv"><span>${v}</span> <span class="u">${u}</span></div></div>`).join('');
const TILES = [['ruler', 'km = a distance'], ['clock', 'h = a time'], ['help', 'two units?']];
$('#wqs').innerHTML = TILES.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, i === 1 ? UC : C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Kilometres'), wt('H4', 'Hours'), wt('H4', 'two')];

/* ---------- P: 7 base + derived recipes ---------- */
const BQ = [['Length', 'm'], ['Mass', 'kg'], ['Time', 's'], ['Electric current', 'A'], ['Thermodynamic temperature', 'K'], ['Amount of substance', 'mol'], ['Luminous intensity', 'cd']];
$('#bqs').innerHTML = BQ.map(([n, sy], i) => `<div class="bq" id="bq${i}" style="top:${80 + i * 68}px"><div class="bn">${n}</div><div class="bs">${sy}</div></div>`).join('');
const tBq = [wt('P4', 'Length'), wt('P4', 'mass'), wt('P4', 'time'), wt('P4', 'electric'), wt('P4', 'temperature'), wt('P4', 'amount'), wt('P4', 'luminous')];
const DQ = [['Area', 'L \\times L'], ['Volume', 'L \\times L \\times L'], [cv(VC, '\\text{Speed}'), cv(VC, 'L \\div T')], ['Density', 'M \\div L^3'], [cv(FC, '\\text{Force}'), cv(FC, 'M \\times L \\div T^2')]];
$('#dqs').innerHTML = DQ.map(([n, r], i) => `<div class="dq" id="dq${i}" style="top:${84 + i * 80}px"><div class="dn">${K(n.startsWith('\\') ? n : '\\text{' + n + '}')}</div><div class="dr">${K(r)}</div></div>`).join('');
const tDq = [wt('P6', 'Area'), wt('P6', 'volume'), wt('P6', 'speed'), wt('P6', 'density'), wt('P6', 'force')];

/* ---------- S: the ride ---------- */
const s = $('#simS'), X0 = 120, PX = 20, RY = 330;          // 20 px per metre, tape 0 - 30 m
mk(s, 'line', { x1: 30, y1: RY, x2: 754, y2: RY, stroke: C.ink, 'stroke-width': 3 });
const cp = mk(mk(s, 'defs', {}), 'clipPath', { id: 'tapeClip' }); const cpr = mk(cp, 'rect', { x: X0 - 24, y: 340, width: 0, height: 90 });
const tape = mk(s, 'g', { 'clip-path': 'url(#tapeClip)' });
mk(tape, 'rect', { x: X0 - 20, y: 346, width: 640, height: 64, rx: 8, fill: '#FFE9A8', stroke: C.ink, 'stroke-width': 2.5 });
for (let m = 0; m <= 30; m++) { const x = X0 + m * PX, L = m % 5 ? 14 : 28; mk(tape, 'line', { x1: x, y1: 346, x2: x, y2: 346 + L, stroke: C.ink, 'stroke-width': m % 5 ? 1.5 : 2.5 }); if (m % 5 === 0) txt(tape, x, 398, m, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(tape, X0 + 618, 404, 'm', { 'text-anchor': 'end', 'font-size': 18, fill: UC, 'font-weight': 600 });
const makeBike = (p, op) => {
  const g = mk(p, 'g', { opacity: op });
  [-70, 0].forEach(x => mk(g, 'circle', { cx: x, cy: -28, r: 27, fill: 'none', stroke: C.ink, 'stroke-width': 4 }));
  mk(g, 'path', { d: 'M-70,-28 L-38,-28 L-46,-74 Z M-46,-74 L-12,-78 L-38,-28 M-12,-78 L0,-28', fill: 'none', stroke: C.ac, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M-58,-80 L-36,-80 M-12,-78 L-6,-92 L6,-92', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
  return g;
};
const ghosts = [0.12, 0.2, 0.3].map(o => makeBike(s, 0)); const bikeP = mk(s, 'g', {}); const bike = makeBike(bikeP, 1);
const mkr = mk(s, 'line', { x1: 0, y1: RY + 4, x2: 0, y2: 346, stroke: C.ac, 'stroke-width': 3, 'stroke-dasharray': '5 5' });
const vA = PUC.arrow(s, VC, 6, 18), aA = PUC.arrow(s, AC, 6, 18);
const vL = txt(s, 0, 0, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: VC });
const aL = txt(s, 0, 0, 'a', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: AC });
// stopwatch
const swg = mk(s, 'g', {});
mk(swg, 'circle', { cx: 100, cy: 150, r: 44, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
mk(swg, 'rect', { x: 92, y: 96, width: 16, height: 12, rx: 3, fill: C.ink });
for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; mk(swg, 'line', { x1: 100 + 36 * Math.sin(an), y1: 150 - 36 * Math.cos(an), x2: 100 + 30 * Math.sin(an), y2: 150 - 30 * Math.cos(an), stroke: C.ink, 'stroke-width': 2 }); }
const hand = mk(swg, 'line', { x1: 100, y1: 150, x2: 100, y2: 116, stroke: C.red, 'stroke-width': 3.5, 'stroke-linecap': 'round' });
mk(swg, 'circle', { cx: 100, cy: 150, r: 5, fill: C.ink });
// readout
$('#roG').innerHTML = `<span class="k">d</span><span class="v" id="rd">0.0</span><span class="u">m</span><span class="k">t</span><span class="v" id="rt">0.00</span><span class="u">s</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="rv" style="color:${VC}">4.00</span><span class="u">m/s</span><span class="k" style="color:${AC}">a</span><span class="v" id="ra" style="color:${AC}">0.00</span><span class="u">m/s²</span>`;
$('#roF0').innerHTML = K(`${cv(VC, 'v')} = \\dfrac{d}{t} = \\dfrac{20\\,\\text{m}}{5\\,\\text{s}} = ${cv(VC, '4\\,\\text{m/s}')}`);
$('#roF1').innerHTML = K(`${cv(AC, 'a')} = \\dfrac{\\Delta ${cv(VC, 'v')}}{t} = \\dfrac{(6-4)\\,\\text{m/s}}{2\\,\\text{s}} = ${cv(AC, '1\\,\\text{m/s}^2')}`);
// graph v-t
const G = PUC.graph($('#grS'), { x: 110, y: 74, w: 560, h: 140, xmax: 8, ymax: 8, xt: [0, 2, 4, 6, 8], yt: [0, 4, 8], xl: 't (s)', yl: 'v (m/s)' });
G.ylab.setAttribute('x', 122); G.ylab.setAttribute('y', 78);
const gCur = G.curve(VC), gDot = G.dot(VC);
const vOf = x => x < 5 ? 4 : 4 + Math.min(2, x - 5), dOf = x => x < 5 ? 4 * x : 20 + 4 * (Math.min(x, 7) - 5) + 0.5 * Math.pow(Math.min(x, 7) - 5, 2);
const tR = Math.min(T0('S2') + 0.5, wt('S4', 'Twenty') - 5.3), tAcc = wt('S6', 'climb') - 0.3, tSlo = T0('S7') + 0.15, tSloEnd = tSlo + 8;
const simS = t => { if (t < tR) return 0; if (t < tAcc) return Math.min(5, t - tR); if (t < tSlo) return Math.min(7, 5 + (t - tAcc)); return Math.min(7, 5 + (t - tSlo) * 0.25); };
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'No speed meter needed. Two readings, divided.' });

/* ---------- D: build force ---------- */
const STEPS = [[`${cv(VC, 'v')} = \\dfrac{d}{t}`, 'length ÷ time · m/s'],
  [`${cv(AC, 'a')} = \\dfrac{\\Delta ${cv(VC, 'v')}}{t}`, 'length ÷ time ÷ time · m/s²'],
  [`${cv(FC, 'F')} = m\\,${cv(AC, 'a')}`, 'mass × length ÷ time² · kg m/s²']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:150px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 160}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why" style="top:96px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Speed'), wt('D3', 'Acceleration'), wt('D4', 'Force')];
const BR = [['v', VC, 'm', '÷', 's', 'm/s'], ['a', AC, 'm/s', '÷', 's', 'm/s²'], ['F', FC, 'kg', '×', 'm/s²', 'kg m/s²']];
$('#brs').innerHTML = BR.map(([l, c, b1, op, b2, r], i) => `<div class="brow" id="br${i}" style="top:${92 + i * 112}px"><span class="rl" style="color:${c}">${l}</span><span class="blk" id="bk${i}a">${b1}</span><span class="bop">${op}</span><span class="blk" id="bk${i}b">${b2}</span><span class="bop">=</span><span class="bres" id="bk${i}r" style="background:${c}">${r}</span></div>`).join('');
const tBr = [[wt('D2', 'length'), wt('D2', 'time'), wt('D2', 'metre')], [wt('D3', 'length'), wt('D3', 'twice'), wt('D3', 'metre')], [wt('D4', 'Mass'), wt('D4', 'length'), wt('D4', 'squared')]];
$('#drN').innerHTML = K(`1\\,${cv(FC, '\\text{N}')} = 1\\,\\text{kg}\\,\\text{m}\\,\\text{s}^{-2}`);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${cv(FC, 'F')} = m\\,${cv(AC, 'a')} \\;\\Rightarrow\\; ${cv(FC, '\\text{N}')} = \\text{kg}\\,\\text{m}\\,\\text{s}^{-2}`);

/* ---------- K: side by side ---------- */
const kb = $('#kbS');
mk(kb, 'rect', { x: 192, y: 352, width: 400, height: 40, rx: 8, fill: '#E3E6EC', stroke: C.ink, 'stroke-width': 2.5 });
mk(kb, 'rect', { x: 222, y: 392, width: 340, height: 62, rx: 8, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
mk(kb, 'rect', { x: 312, y: 404, width: 160, height: 38, rx: 6, fill: C.ink });
const kbN = txt(kb, 460, 432, '0.00 kg', { 'text-anchor': 'end', 'font-size': 26, fill: '#fff', 'font-weight': 600 });
const bag = mk(kb, 'g', {});
mk(bag, 'path', { d: 'M302,350 C296,280 312,220 340,196 L444,196 C472,220 488,280 482,350 Z', fill: '#F3EBD9', stroke: C.ink, 'stroke-width': 2.5 });
mk(bag, 'path', { d: 'M336,196 L330,176 L454,176 L448,196', fill: '#E8DCC0', stroke: C.ink, 'stroke-width': 2.5 });
txt(bag, 392, 290, 'RICE', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600, 'letter-spacing': 3 });
$('#kdF').innerHTML = K(`\\rho = \\dfrac{1\\,\\text{kg}}{0.001\\,\\text{m}^3} = \\textcolor{${C.ac}}{1000\\,\\text{kg/m}^3}`);
const th1 = PUC.think($('#th1'), { q: 'The milk packet says 1 litre. Is volume a fundamental or a derived quantity?', opts: ['Fundamental', 'Derived'], right: 1, why: '1 litre = a cube 10 cm on each side: length × length × length.' });

/* ---------- R: the opening, solved ---------- */
const LR = [['Tailor', 'CLOTH · LENGTH', 'L', 'tailor'], ['Painter', 'WALL · AREA', 'L \\times L', 'painter'], ['Milk packet', 'MILK · VOLUME', 'L \\times L \\times L', 'litre']];
$('#lrs').innerHTML = LR.map(([n, w, f], i) => `<div class="lr" id="lr${i}" style="top:${84 + i * 136}px"><svg width="110" height="100" id="lg${i}"></svg><div class="ln">${n}</div><div class="lw">${w}</div><div class="lf">${K(f)}</div></div>`).join('');
{ const g0 = $('#lg0'), g1 = $('#lg1'), g2 = $('#lg2'), st = { fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
  mk(g0, 'path', { d: 'M10,50 H100', ...st }); mk(g1, 'rect', { x: 22, y: 12, width: 72, height: 72, ...st, fill: C.ac2 });
  mk(g2, 'path', { d: 'M18,34 L44,12 H98 V66 L72,88 H18 Z M18,34 H72 V88 M72,34 L98,12', ...st, fill: C.ac2 }); }
const tLr = [wt('R1', 'tailor'), wt('R1', 'painter'), wt('R2', 'litre')];
const rr = $('#rrS'), rA = [mk(rr, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 7' }), mk(rr, 'path', { d: '', fill: 'none', stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 7' })];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 380, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So my 15 is a length over a time.' });

/* ---------- B: independence ---------- */
$('#ibs').innerHTML = BQ.map(([n, sy], i) => `<div class="ib" id="ib${i}" style="left:${36 + (i % 3) * 246}px;top:${92 + Math.floor(i / 3) * 92}px"><span class="in">${['Length', 'Mass', 'Time', 'Current', 'Temperature', 'Amount', 'Luminous'][i]}</span><span class="is">${sy}</span></div>`).join('');
const AT = [['Length from mass and time?', ['kg', 's'], 'm'], ['Mass from length and time?', ['m', 's'], 'kg']];
$('#ats').innerHTML = AT.map(([q, bs, r], i) => `<div class="at" id="at${i}" style="top:${92 + i * 160}px"><div class="aq">${q}</div><div class="ab"><span>${bs[0]}</span><em>× ÷</em><span>${bs[1]}</span><em>&rarr;</em><span style="border-style:dashed;color:var(--mute)">${r}</span></div><div class="ax">${M.icon('x', 26, '#fff', 3)}</div></div>`).join('');
const th2 = PUC.think($('#th2'), { q: 'Time = distance ÷ speed. Does that make time a derived quantity?', opts: ['Yes, derived', 'No, still base'], right: 1, why: 'Time is a chosen base block and a clock reads it. Speed is built from time.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`V = 0.2\\,\\text{m} \\times 0.1\\,\\text{m} \\times 0.05\\,\\text{m}`)],
  [K(`V = 0.001\\,\\text{m}^3 \\quad (\\text{length}^3)`)],
  [K(`\\rho = \\dfrac{m}{V} = \\dfrac{7.8\\,\\text{kg}}{0.001\\,\\text{m}^3}`)],
  [K(`\\rho = \\textcolor{${C.ac}}{7800\\,\\text{kg/m}^3}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 96 });
const w = $('#wrS'), CX0 = 150, CY0 = 330, CW = 360, CH = 90, DX = 110, DY = -80;   // oblique cuboid: 20 x 10 x 5
const cub = mk(w, 'g', {});
mk(cub, 'path', { d: `M${CX0},${CY0 - CH} L${CX0 + DX},${CY0 - CH + DY} H${CX0 + CW + DX} L${CX0 + CW},${CY0 - CH} Z`, fill: '#C3CAD6', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(cub, 'path', { d: `M${CX0 + CW},${CY0 - CH} L${CX0 + CW + DX},${CY0 - CH + DY} V${CY0 + DY} L${CX0 + CW},${CY0} Z`, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(cub, 'rect', { x: CX0, y: CY0 - CH, width: CW, height: CH, fill: '#AEB7C6', stroke: C.ink, 'stroke-width': 2.5 });
const mTag = txt(cub, CX0 + CW / 2, CY0 - CH / 2 + 9, '7.8 kg', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const DL = [[CX0 + CW / 2, CY0 + 40, '20 cm', '0.2 m', 'middle'], [CX0 + CW + DX / 2 + 18, CY0 - CH + DY / 2 + 6, '10 cm', '0.1 m', 'start'], [CX0 - 16, CY0 - CH / 2 + 7, '5 cm', '0.05 m', 'end']];
const dlab = DL.map(([x, y, a, b, an]) => [txt(w, x, y, a, { 'text-anchor': an, 'font-size': 24, fill: UC, 'font-weight': 600 }), txt(w, x, y, b, { 'text-anchor': an, 'font-size': 24, fill: UC, 'font-weight': 600 })]);
const tW = [wt('W3', 'First'), wt('W4', 'Multiply'), wt('W5', 'Density'), wt('W6', 'That')], tSwW = wt('W3', 'Zero');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Electric charge is a base quantity', right: 'Current is base; charge = current × time' });
const cw = $('#cw');
const CB = [[40, '1 A', 'CURRENT · BASE', C.ac2, C.ac], [210, '×', '', null], [250, '1 s', 'TIME · BASE', C.ac2, C.ac], [420, '=', '', null], [450, '1 C', 'CHARGE · DERIVED', C.ink, '#fff']];
const cbEl = CB.map(([x, s1, s2, bg, fg]) => { const g = mk(cw, 'g', {}); if (bg) { mk(g, 'rect', { x, y: 96, width: bg === C.ink ? 100 : 130, height: 72, rx: 12, fill: bg }); txt(g, x + (bg === C.ink ? 50 : 65), 143, s1, { 'text-anchor': 'middle', 'font-size': 30, fill: fg, 'font-weight': 600 }); } else txt(g, x + 10, 143, s1, { 'text-anchor': 'middle', 'font-size': 32, fill: C.mute, 'font-weight': 600 }); if (s2) txt(g, x + (bg === C.ink ? 50 : 65), 200, s2, { 'text-anchor': 'middle', 'font-size': 14, fill: C.mute, 'font-weight': 600, 'letter-spacing': 1 }); return g; });
const tCb = [wt('X3', 'ampere'), wt('X3', 'ampere') + 0.2, wt('X3', 'second'), wt('X3', 'second') + 0.2, wt('X3', 'derived', 0)];
const where = PUC.where($('#wa'), { on: [], type: 'Quick one mark questions: pick the fundamental quantity, or write a unit in base units' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `A quantity ${K('Q = \\dfrac{\\text{mass} \\times \\text{speed}}{\\text{time}}')}. Which statement is correct?`, qW: 800,
  opts: [`Fundamental, unit ${K('\\text{kg}\\,\\text{m}\\,\\text{s}^{-1}')}`, `Derived, unit ${K('\\text{kg}\\,\\text{m}\\,\\text{s}^{-2}')}`, `Derived, unit ${K('\\text{kg}\\,\\text{m}\\,\\text{s}^{-1}')}`, `Derived, unit ${K('\\text{kg}\\,\\text{m}^2\\,\\text{s}^{-2}')}`], right: 1, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 270 });
const so = PUC.solution($('#so'), [[`${K('m \\times v')}: ${K('\\text{kg}\\,\\text{m}\\,\\text{s}^{-1}')} <b style="color:var(--red)">C</b> stops`], [`${K('\\div\\, t')}: ${K('\\text{kg}\\,\\text{m}\\,\\text{s}^{-2}')} = N`], ['<b style="color:var(--red)">D</b>: metre is not squared'], ['<b style="color:var(--red)">A</b>: Q is built, so derived']], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Mass'), wt('A3', 'Divide'), wt('A3', 'squares') - 0.3, wt('A3', 'calls') - 0.3];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · fundamental and derived', y0: 100, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${cv(VC, 'v')}: \\text{m}\\,\\text{s}^{-1} \\quad ${cv(AC, 'a')}: \\text{m}\\,\\text{s}^{-2} \\quad ${cv(FC, 'F')}: \\text{kg}\\,\\text{m}\\,\\text{s}^{-2} = ${cv(FC, '\\text{N}')}`),
    '<b>7 base</b>, all independent: <span class="mono">m · kg · s · A · K · mol · cd</span>', '<b>Derived</b> = base quantities multiplied and divided', '<b>Trap</b>: current is base, charge (A s) is derived'] });
const YQ = ['Why is the litre not a base unit?', 'Write one newton using only base units.', 'Is electric charge fundamental or derived, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 03', topic: 'Who decided how long a metre is? SI Base Units and Derived Units', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlo - 0.1, 1.1, 700, 560], [T0('S8') + 0.1, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; });
  const t2 = $('#tb2'); t2.style.left = (392 - t2.offsetWidth / 2) + 'px';
  const t0 = $('#tb0'), t1 = $('#tb1');
  const c0 = t0.offsetLeft + t0.offsetWidth / 2, c1 = t1.offsetLeft + t1.offsetWidth / 2, yb = t0.offsetTop + t0.offsetHeight + 8, yt = t2.offsetTop - 10;
  rA[0].setAttribute('d', `M${c0},${yb} C${c0},${yb + 80} 392,${yt - 80} 380,${yt}`); rA[1].setAttribute('d', `M${c1},${yb} C${c1},${yb + 80} 392,${yt - 80} 404,${yt}`);
  $('#roF1').style.left = '36px';
}
const f2 = v => v.toFixed(2);

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const on = M.io((t - wt('H2', 'length') + 0.1) / 0.3); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#hjP'), t, wt('H2', 'length') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const nt = $('#note'); M.vis(nt, t, wt('H3', 'speedometer') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    nt.style.transform = (!nt.style.transform || nt.style.transform === 'none' ? '' : nt.style.transform + ' ') + 'rotate(-4deg)';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (i < 2 ? 1 - M.io((t - tTile[i + 1]) / 0.25) : 1); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pb'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    BQ.forEach((_, i) => { const el = $('#bq' + i); M.vis(el, t, T0('P2') + 0.2 + i * 0.08, 1e9, { dy: 14 }); const on = M.io((t - tBq[i] + 0.05) / 0.25); el.style.background = mix(C.soft, C.ac2, on); el.querySelector('.bs').style.color = mix(C.dim, C.ac, on); el.querySelector('.bn').style.color = mix(C.dim, C.ink, on); });
    M.vis($('#pd'), t, tP5 - 0.1, out, { dx: 60, dy: 0, ...o });
    DQ.forEach((_, i) => { const el = $('#dq' + i); M.vis(el, t, tDq[i] - 0.15, 1e9, { dx: -20, dy: 0 }); PUC.write(el.querySelector('.dr'), t, tDq[i] + 0.05, 0.5); });
    M.vis($('#pdP'), t, wt('P5', 'multiply') - 0.1, 1e9, POP);
  }

  /* S: ride */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    attr(cpr, 'width', (680 * M.io((t - wt('S2', 'tape') + 0.1) / 0.7)).toFixed(1));
    M.vis($('#tgL'), t, wt('S2', 'base') - 0.1, 1e9, POP);
    M.vis(swg, t, wt('S3', 'stopwatch') - 0.15, 1e9, { ...POP, sc: 0.5 }); M.vis($('#tgT'), t, wt('S3', 'base') - 0.1, 1e9, POP);
    const sm = simS(t), x = dOf(sm), v = vOf(sm), bx = X0 + x * PX;
    bikeP.setAttribute('transform', `translate(${bx.toFixed(1)},${RY})`);
    M.vis(bike, t, tS1 + 0.3, 1e9, { dx: -30, dy: 0 });
    ghosts.forEach((g, k) => { const sg = Math.max(0, sm - 0.22 * (k + 1)), moving = sm > 0.05 && sm < 7 && ((t > tR && t < tR + 5) || (t > tAcc && t < tAcc + 2) || (t > tSlo && t < tSloEnd)); g.setAttribute('transform', `translate(${(X0 + dOf(sg) * PX).toFixed(1)},${RY})`); g.setAttribute('opacity', moving ? [0.3, 0.2, 0.12][k] : 0); });
    attr(mkr, 'x1', bx.toFixed(1)); attr(mkr, 'x2', bx.toFixed(1)); M.hide(mkr, t < wt('S2', 'tape') + 0.6);
    hand.setAttribute('transform', `rotate(${(sm * 72).toFixed(1)} 100 150)`);
    // vectors: only in the slow-mo replay
    const vecOn = M.io((t - tSlo - 0.3) / 0.5) * (1 - M.io((t - T0('D1') + 0.6) / 0.3)), aOn = M.io((t - wt('S7', 'red') + 0.1) / 0.5) * (1 - M.io((t - T0('D1') + 0.6) / 0.3));
    vA.set(bx - 35, RY - 112, bx - 35 + v * 18 * vecOn, RY - 112); attr(vL, 'x', (bx - 35 + v * 18 * vecOn + 8).toFixed(1)); attr(vL, 'y', RY - 102); vL.style.opacity = vecOn.toFixed(3);
    aA.set(bx - 35, RY - 146, bx - 35 + 60 * aOn, RY - 146); attr(aL, 'x', (bx - 35 + 60 * aOn + 8).toFixed(1)); attr(aL, 'y', RY - 136); aL.style.opacity = aOn.toFixed(3);
    const tg = $('#sTag'); M.setT(tg, 'SLOW-MO REPLAY · 0.25x'); M.vis(tg, t, tSlo - 0.1, T0('S8'), { ...POP, outDur: 0.25 });
    // readout (Plex Mono, every frame)
    M.setT($('#rd'), x.toFixed(1)); M.setT($('#rt'), f2(sm)); M.setT($('#rv'), f2(v)); M.setT($('#ra'), f2(sm > 5.001 ? 1 : 0));
    M.vis($('#roG'), t, tS1 + 0.5, 1e9, { dy: 10 });
    PUC.write($('#roF0'), t, wt('S4', 'Divide') - 0.1, 0.7, tAcc - 0.2);
    PUC.write($('#roF1'), t, wt('S7', 'acceleration') + 0.2, 0.7);
    // graph: the dot rides with the bike
    gCur(u => [u, vOf(u)], 0, sm); gDot(sm, v, t > tS1 + 0.5);
    M.vis($('#grP'), t, wt('S7', 'acceleration') + 0.3, 1e9, POP);
    avA(t, wt('S5', 'built') + 0.3, tAcc - 0.3);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hb = $('#hiB'), hiY = M.track(84, [[tStep[1] - 0.1, 244], [tStep[2] - 0.1, 404]], M.SOFT)(t); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tStep[0] + 0.2, 1e9, { dx: 60, dy: 0 });
    BR.forEach((_, i) => { const r = $('#br' + i), [a, b, c] = tBr[i]; M.vis(r.querySelector('.rl'), t, a - 0.2, 1e9, POP); M.vis($('#bk' + i + 'a'), t, a - 0.1, 1e9, POP); M.vis(r.querySelectorAll('.bop')[0], t, b - 0.2, 1e9, POP); M.vis($('#bk' + i + 'b'), t, b - 0.1, 1e9, POP); M.vis(r.querySelectorAll('.bop')[1], t, c - 0.2, 1e9, POP); M.vis($('#bk' + i + 'r'), t, c - 0.1, 1e9, { ...POP, sc: 0.5 }); });
    PUC.write($('#drN'), t, wt('D5', 'newton') - 0.1, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Every') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'multiplying'), 0.8);
  }

  /* K: side by side + think */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exK'), t, tK1 + 0.5, 1e9, { dy: 8 });
    const tBag = wt('K1', 'bag') - 0.1; M.vis(bag, t, tBag, 1e9, { dy: -60, sp: M.SOFT, fade: 0.1 });
    M.count(kbN, t, wt('K1', 'read'), 0.8, 0, 5, v => v.toFixed(2) + ' kg'); if (t < wt('K1', 'read')) M.setT(kbN, '0.00 kg');
    M.vis($('#kbC'), t, wt('K1', 'One') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kd0'), t, wt('K2', 'kilogram') - 0.1, 1e9, POP); M.vis($('#kd1'), t, wt('K2', 'fills') - 0.1, 1e9, POP);
    PUC.write($('#kdF'), t, wt('K2', 'Divide') - 0.1, 0.8); M.vis($('#kdC'), t, wt('K2', 'thousand') + 0.2, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'fundamental') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'One') });
  }

  /* R: the opening, solved */
  const rOn = t >= tR1 - 0.1 && t < tB1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('B1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    LR.forEach((_, i) => { const el = $('#lr' + i); M.vis(el, t, tLr[i] - 0.15, 1e9, { dy: 16 }); PUC.write(el.querySelector('.lf'), t, tLr[i] + 0.3, 0.6); });
    M.vis($('#rr'), t, T0('R2') + 0.6, out, { dx: 60, dy: 0, ...o });
    M.vis($('#tb2'), t, T0('R2') + 0.9, 1e9, POP);
    M.vis($('#tb0'), t, wt('R3', 'length') - 0.1, 1e9, POP); M.vis($('#tb1'), t, wt('R3', 'time') - 0.1, 1e9, POP);
    M.draw(rA[0], t, wt('R3', 'length') + 0.1, 0.5); M.draw(rA[1], t, wt('R3', 'time') + 0.1, 0.5);
    M.vis($('#rrP'), t, wt('R3', 'parents') - 0.1, 1e9, POP);
    avR(t, T1('R3') - 0.4, out);
  }

  /* B: why these seven */
  const bOn = t >= tB1 - 0.1 && t < tW1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('B4');
    M.vis($('#bl'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o });
    BQ.forEach((_, i) => { const el = $('#ib' + i); M.vis(el, t, tB1 + 0.3 + i * 0.08, 1e9, { dy: 14 }); const on = M.io((t - wt('B2', 'independent') - i * 0.06) / 0.3); el.style.background = mix(C.soft, C.ac2, on); el.style.borderColor = mix(C.ink, C.ac, on); });
    M.vis($('#blP'), t, wt('B2', 'None') - 0.1, 1e9, POP);
    M.vis($('#br'), t, T0('B3') - 0.1, out, { dx: 60, dy: 0, ...o });
    [wt('B3', 'cannot'), wt('B3', 'mass')].forEach((tt, i) => { const el = $('#at' + i); M.vis(el, t, tt - 0.2, 1e9, { dy: 16 }); M.vis(el.querySelector('.ax'), t, tt + 1.2, 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#brP'), t, wt('B3', 'Each') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tB4 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tB4, tOpts: wt('B4', 'derived') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Time') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(cub, t, T0('W2') + 0.5, 1e9, { dy: 30, sp: M.SOFT });
    mTag.style.opacity = M.io((t - wt('W2', 'mass')) / 0.3).toFixed(3);
    const sw2 = M.io((t - tSwW) / 0.35);
    dlab.forEach(([a, b], i) => { const on = M.io((t - wt('W2', ['twenty', 'ten', 'five'][i])) / 0.3); a.style.opacity = (on * (1 - sw2)).toFixed(3); b.style.opacity = sw2.toFixed(3); });
    M.vis($('#wV'), t, wt('W4', 'volume') - 0.1, 1e9, POP); M.vis($('#wR'), t, wt('W6', 'seven') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'electric') - 0.1, tStrike: wt('X3', 'But') + 0.1, tRight: wt('X3', 'current') - 0.1 });
    cbEl.forEach((g, i) => M.vis(g, t, tCb[i] - 0.1, 1e9, POP));
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What'), tCount, tAns });
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
