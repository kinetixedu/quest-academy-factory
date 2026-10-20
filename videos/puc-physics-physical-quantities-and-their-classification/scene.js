// PUC Physics Ep 01: Physical quantities and their classification (Motion notebook, measuring bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const UC = C.violet, NC = C.ink, QC = C.ac, FC = C.orange;       // colour-coding: n ink, u violet, Q blue, F orange
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap, setIco = PUC.setIco;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

Object.assign(M.IC, {
  spoon: ['M8 3c2.2 0 4 2.2 4 5s-1.8 4.5-4 4.5S4 10.8 4 8s1.8-5 4-5Z', 'M8 12.5V21'],
  cup: ['M5 8h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z', 'M17 10h1.5a2.5 2.5 0 0 1 0 5H17', 'M9 3v2', 'M13 3v2'],
  weight: ['M6 8h12l2 13H4z', 'M9 8a3 3 0 1 1 6 0'],
  ruler: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  sparkle: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'],
  balance: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  arrowL: ['M19 12H5', 'm12 19-7-7 7-7'],
  move: ['M5 12h14', 'm15 8 4 4-4 4', 'M5 6v12'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tUnitH = wt('H3', 'unit');
const tP1 = T0('P1'), tP4 = T0('P4'), tP5 = T0('P5');
const tS1 = T0('S1'), tS5 = T0('S5'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tCm = wt('S2', 'centimetre'), tMm = wt('S3', 'millimetres'), tMe = wt('S4', 'metres');
const tV1 = T0('V1'), tG1 = T0('G1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;           // scene exits just before the next scene's first line

/* ---------- H: the recipe card ---------- */
const TILES = [['spoon', 'spoons'], ['cup', 'cups'], ['weight', 'kilograms']];
$('#tiles').innerHTML = TILES.map(([ic, w], i) => `<div class="tile" id="tl${i}" style="left:${36 + i * 243}px"><div class="ti">${M.icon(ic, 40, C.ink2, 2.2)}</div><div class="tn">2</div><div class="tw">${w}</div></div>`).join('');
const tTile = [wt('H2', 'spoons'), wt('H2', 'cups'), wt('H2', 'kilograms')];

/* ---------- P: can we measure it? ---------- */
const MT = [['ruler', 'Length', 'metre scale', 1], ['balance', 'Mass', 'balance', 1], ['clock', 'Time', 'clock', 1], ['thermo', 'Temperature', 'thermometer', 1], ['gauge', 'Speed', 'speedometer', 1], ['heart', 'Kindness', 'no instrument', 0], ['sparkle', 'Beauty', 'no instrument', 0]];
const MTpos = [[36, 84], [408, 84], [36, 176], [408, 176], [36, 268], [36, 400], [408, 400]];
$('#mts').innerHTML = MT.map(([ic, n, i, ok], k) => `<div class="mt" id="mt${k}" style="left:${MTpos[k][0]}px;top:${MTpos[k][1]}px"><i>${M.icon(ic, 26, ok ? C.ac : C.red, 2.2)}</i><div class="mn">${n}</div><div class="mi">${i}</div><div class="mk" style="background:${ok ? C.ok : C.red}">${M.icon(ok ? 'check' : 'x', 18, '#fff', 3)}</div></div>`).join('') +
  `<div class="lbl" id="mtL" style="left:36px;top:362px;color:var(--red)">NOT PHYSICAL QUANTITIES</div>`;
const tMt = [wt('P2', 'Length'), wt('P2', 'mass'), wt('P2', 'time'), wt('P2', 'temperature'), wt('P2', 'speed'), wt('P3', 'Kindness'), wt('P3', 'beauty')];
$('#uc0I').innerHTML = M.icon('ruler', 28, UC, 2.2); $('#uc1I').innerHTML = M.icon('weight', 28, UC, 2.2); $('#uc2I').innerHTML = M.icon('clock', 28, UC, 2.2);

/* ---------- S: the measuring bench ---------- */
const s = $('#simS'), PX = 30, X0 = 80;            // 30 px per cm, zero at x 80; pencil 15 cm
const pen = mk(s, 'g', {});
mk(pen, 'rect', { x: X0, y: 140, width: 26, height: 40, rx: 5, fill: '#E7A4A4', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'rect', { x: X0 + 26, y: 140, width: 16, height: 40, fill: '#B8BCC6', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'rect', { x: X0 + 42, y: 140, width: 366, height: 40, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2.5 });
mk(pen, 'path', { d: `M${X0 + 408},140 L${X0 + 450},160 L${X0 + 408},180 Z`, fill: '#EBD3AE', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
mk(pen, 'path', { d: `M${X0 + 438},154.3 L${X0 + 450},160 L${X0 + 438},165.7 Z`, fill: C.ink });
mk(s, 'rect', { x: X0 - 20, y: 206, width: 640, height: 100, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
const RG = ['mm', 'cm', 'm'].map(u => mk(s, 'g', {}));
for (let mm = 0; mm <= 200; mm++) { const x = X0 + mm * 3, L = mm % 10 === 0 ? (mm % 50 === 0 ? 40 : 28) : (mm % 5 === 0 ? 18 : 10); mk(RG[0], 'line', { x1: x, y1: 206, x2: x, y2: 206 + L, stroke: C.ink, 'stroke-width': mm % 10 ? 1.2 : 2 }); if (mm % 50 === 0) txt(RG[0], x, 274, mm, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
for (let c = 0; c <= 20; c++) { const x = X0 + c * PX, L = c % 5 ? 22 : 40; [1, 2].forEach(g => mk(RG[g], 'line', { x1: x, y1: 206, x2: x, y2: 206 + L, stroke: C.ink, 'stroke-width': 2 })); if (c % 5 === 0) { txt(RG[1], x, 274, c, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); txt(RG[2], x, 274, (c / 100).toFixed(2).replace(/^0\.00$/, '0'), { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); } }
const RU = ['mm', 'cm', 'm'].map((u, i) => txt(RG[i], X0 + 600, 296, u, { 'text-anchor': 'end', 'font-size': 18, fill: UC, 'font-weight': 600 }));
const rdl = mk(s, 'line', { x1: X0 + 450, y1: 150, x2: X0 + 450, y2: 398, stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
// readout
$('#roG').innerHTML = `<span class="k" style="color:${NC}">n</span><span class="v" id="ron">15</span><span class="u">number</span>
  <span class="k" style="color:${UC}">u</span><span class="v" id="rou" style="color:${UC}">1 cm</span><span class="u">unit</span>
  <span class="k" style="color:${QC}">Q</span><span class="v" id="roq" style="color:${QC}">0.15 m</span><span class="u">pencil</span>`;
// graph: number n against the size of the unit (decade steps mm, cm, dm, m)
const g = $('#grS'), GX = i => 150 + i * 180, GY = n => 74 + 50 * (Math.log10(150) - Math.log10(n));
mk(g, 'path', { d: 'M110,60 V224 H730', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
['mm', 'cm', 'dm', 'm'].forEach((u, i) => { mk(g, 'line', { x1: GX(i), y1: 224, x2: GX(i), y2: 232, stroke: C.ink, 'stroke-width': 2 }); txt(g, GX(i), 256, u, { 'text-anchor': 'middle', fill: UC, 'font-weight': 600 }); });
[150, 15, 1.5, 0.15].forEach(n => { mk(g, 'line', { x1: 102, y1: GY(n), x2: 110, y2: GY(n), stroke: C.ink, 'stroke-width': 2 }); txt(g, 96, GY(n) + 6, n, { 'text-anchor': 'end' }); });
mk(g, 'path', { d: `M${GX(0)},${GY(150)} L${GX(3)},${GY(0.15)}`, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '3 8', opacity: 0.4, fill: 'none' });
const gl = mk(g, 'path', { d: '', stroke: C.ac, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const gd = mk(g, 'circle', { r: 11, fill: C.ink, cx: GX(1), cy: GY(15) });
const gTag = document.createElement('div'); gTag.className = 'pillp ac'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px'; gTag.innerHTML = 'unit &times;10 &nbsp;&rarr;&nbsp; number &divide;10'; $('#gr').appendChild(gTag);
const gIdx = M.track(1, [[tMm, 0, M.HEAVY], [tMe, 3, [6.5, 0.95]]], M.HEAVY);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the pencil stays the same?' });

/* ---------- D: the rule ---------- */
const STEPS = [[`\\textcolor{${QC}}{Q} = \\textcolor{${NC}}{n}\\,\\textcolor{${UC}}{u}`, 'a number times a unit'],
  [`\\textcolor{${NC}}{n_1}\\textcolor{${UC}}{u_1} = \\textcolor{${NC}}{n_2}\\textcolor{${UC}}{u_2}`, 'the same quantity in any unit'],
  [`\\textcolor{${NC}}{n} \\propto 1/\\textcolor{${UC}}{u}`, 'bigger unit, smaller number']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:132px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="st${i}" style="top:${84 + i * 156}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Q'), wt('D3', 'So'), wt('D4', 'inversely')];
// same area, different shape
const a = $('#arS'), AR = 64000, AX = 150, AY = 500;
const ghostR = [0, 1, 2].map(() => mk(a, 'rect', { x: AX, fill: 'none', stroke: C.ac, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0 }));
const rect = mk(a, 'rect', { x: AX, fill: C.ac2, stroke: C.ac, 'stroke-width': 3 });
const bw = mk(a, 'path', { fill: 'none', stroke: UC, 'stroke-width': 3, 'stroke-linecap': 'round' }), bh = mk(a, 'path', { fill: 'none', stroke: NC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const lu = txt(a, 0, 0, 'u', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 34, fill: UC, 'text-anchor': 'middle' });
const ln = txt(a, 0, 0, 'n', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 34, fill: NC, 'text-anchor': 'end' });
const la = txt(a, 0, 0, 'n × u = same', { 'font-size': 22, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
const tD5 = T0('D5'), tShape = wt('D5', 'shape');
const wK = [[tShape - 0.2, 400], [tShape + 1.4, 128], [wt('D5', 'same') - 0.2, 220]];
const wTr = M.track(220, wK.map(([t, v]) => [t, v, [6, 0.95]]), [6, 0.95]);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\textcolor{${QC}}{Q} = \\textcolor{${NC}}{n}\\,\\textcolor{${UC}}{u}`);

/* ---------- C: base and derived ---------- */
const BQ = [['Length', 'metre', 'm'], ['Mass', 'kilogram', 'kg'], ['Time', 'second', 's'], ['Electric current', 'ampere', 'A'], ['Thermodynamic temperature', 'kelvin', 'K'], ['Amount of substance', 'mole', 'mol'], ['Luminous intensity', 'candela', 'cd']];
$('#bqs').innerHTML = BQ.map(([n, u, sy], i) => `<div class="bq" id="bq${i}" style="top:${80 + i * 68}px"><div class="bn">${n}</div><div class="bu">${u}</div><div class="bs">${sy}</div></div>`).join('');
const tBq = [wt('C4', 'Length'), wt('C4', 'mass'), wt('C4', 'time'), wt('C4', 'electric'), wt('C4', 'temperature'), wt('C4', 'amount'), wt('C4', 'luminous')];
$('#dvs').innerHTML = [['length', '×', 'length', 'area', '\\text{m} \\times \\text{m} = \\text{m}^2', 96], ['length', '÷', 'time', 'speed', '\\text{m} \\div \\text{s} = \\text{m/s}', 312]].map(([p, o, q, r, f, y], i) =>
  `<div class="blk" id="db${i}0" style="top:${y}px">${p}</div><div class="op" id="do${i}0" style="top:${y + 10}px">${o}</div><div class="blk" id="db${i}1" style="top:${y}px">${q}</div><div class="op" id="do${i}1" style="top:${y + 10}px">=</div><div class="blk" id="db${i}2" style="top:${y}px;background:var(--ac);color:#fff">${r}</div>
   <div class="fl2" id="df${i}" style="top:${y + 100}px">${K(f)}</div>`).join('') + `<div class="pillp ink" id="dvP" style="left:36px;top:500px">Derived = base quantities combined</div>`;
const tDv = [[wt('C5', 'Area'), wt('C5', 'times'), wt('C5', 'length', 1)], [wt('C6', 'Speed'), wt('C6', 'divided'), wt('C6', 'time')]];

/* ---------- V: push a box ---------- */
const v = $('#vsS'), FY = 430;
mk(v, 'line', { x1: 40, y1: FY, x2: 744, y2: FY, stroke: C.ink, 'stroke-width': 3 });
for (let x = 52; x < 744; x += 28) mk(v, 'line', { x1: x, y1: FY + 4, x2: x - 14, y2: FY + 18, stroke: C.dim, 'stroke-width': 2 });
const ghostB = [0, 1, 2].map(() => mk(v, 'rect', { y: FY - 110, width: 130, height: 110, rx: 10, fill: C.ink, opacity: 0 }));
const box = mk(v, 'rect', { y: FY - 110, width: 130, height: 110, rx: 10, fill: C.ink });
const fA = PUC.arrow(v, FC, 7, 20);
const fL = txt(v, 0, 0, 'F', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 32, fill: FC });
$('#vro').innerHTML = `<span class="k" style="color:${FC}">F</span><span class="v" id="vF" style="color:${FC}">10</span><span class="u">N</span><span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">dir</span><span class="v" id="vD" style="font-size:30px">right</span><span class="u"></span>`;
const tPushR = wt('V4', 'Push'), tMoveR = wt('V4', 'moves'), tPushL = wt('V5', 'Push'), tMoveL = wt('V5', 'moves');
const bxTr = M.keys([[0, 327], [tMoveR - 0.3, 507], [tMoveL - 0.3, 177]], 1.2, M.io);
$('#cols').innerHTML = `<div class="lbl" style="left:36px;top:30px">TWO KINDS</div>
  <div class="col" id="cS" style="left:36px"><div class="ch">Scalar</div><div class="cs">SIZE ONLY</div>${[['weight', 'Mass'], ['clock', 'Time'], ['thermo', 'Temperature']].map(([ic, n], i) => `<div class="chp" id="cs${i}" style="top:${104 + i * 62}px">${M.icon(ic, 24, C.ink2, 2.2)}<span>${n}</span></div>`).join('')}</div>
  <div class="col" id="cV" style="left:408px"><div class="ch">Vector</div><div class="cs">SIZE + DIRECTION</div>${[['Displacement'], ['Velocity'], ['Force']].map(([n], i) => `<div class="chp" id="cv${i}" style="top:${104 + i * 62}px">${M.icon('arrowR', 24, i === 2 ? FC : C.ac, 2.6)}<span>${n}</span></div>`).join('')}</div>`;
const tCs = [wt('V2', 'Mass'), wt('V2', 'time'), wt('V2', 'temperature')], tCv = [wt('V3', 'Displacement'), wt('V3', 'velocity'), wt('V3', 'force')];
const avA = PUC.avatar($('#sV'), { x: 976 + 36, y: 270 + 410, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So force needs an arrow. Mass does not.' });

/* ---------- G: sort board ---------- */
const CX = [300, 940], CY = [84, 324];
$('#cells').innerHTML = `<div class="rh" id="rh0" style="top:${CY[0] + 88}px">Base</div><div class="rh" id="rh1" style="top:${CY[1] + 88}px">Derived</div>` +
  [0, 1].map(r => [0, 1].map(c => `<div class="cell" id="ce${r}${c}" style="left:${CX[c]}px;top:${CY[r]}px"><div class="chd" style="top:18px;color:${c ? C.ac : C.mute}">${c ? 'VECTOR' : 'SCALAR'}</div></div>`).join('')).join('') +
  `<div id="empty" style="left:${CX[1] + 32}px;top:${CY[0] + 76}px;width:536px;height:110px">EMPTY · NO BASE QUANTITY IS A VECTOR</div>`;
const SQ = [['Mass', 0, 0, 0, 'weight'], ['Time', 0, 0, 1, 'clock'], ['Speed', 1, 0, 0, 'gauge'], ['Density', 1, 0, 1, 'balance'], ['Velocity', 1, 1, 0, 'arrowR'], ['Force', 1, 1, 1, 'arrowR']];
$('#cells').insertAdjacentHTML('beforeend', SQ.map(([n, r, c, k, ic], i) => `<div class="sq" id="sq${i}" style="left:${CX[c] + 32 + k * 280}px;top:${CY[r] + 96}px">${M.icon(ic, 26, c ? (n === 'Force' ? FC : C.ac) : C.ink2, 2.4)}<span>${n}</span></div>`).join(''));
const tSq = [wt('G2', 'Mass'), wt('G3', 'Time'), wt('G4', 'Speed'), wt('G4', 'density'), wt('G5', 'Velocity'), wt('G5', 'force')];

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${NC}}{n_2} = \\dfrac{\\textcolor{${NC}}{n_1}\\,\\textcolor{${UC}}{u_1}}{\\textcolor{${UC}}{u_2}}`)],
  [K(`\\textcolor{${NC}}{n_1} = 2.5,\\;\\; \\textcolor{${UC}}{u_1} = 1\\,\\text{m},\\;\\; \\textcolor{${UC}}{u_2} = 1\\,\\text{cm}`)],
  [K(`1\\,\\text{m} = 100\\,\\text{cm} \\;\\Rightarrow\\; \\textcolor{${NC}}{n_2} = 2.5 \\times 100`)],
  [K(`\\textcolor{${NC}}{n_2} = 250 \\;\\Rightarrow\\; \\textcolor{${QC}}{250\\,\\text{cm}}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px'; $('#wq').style.top = '70px';
const w = $('#wrS'), WX = 92, WP = 200;     // 200 px per metre
mk(w, 'rect', { x: WX - 20, y: 260, width: 640, height: 100, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2.5 });
const WG = [mk(w, 'g', {}), mk(w, 'g', {})];
for (let d = 0; d <= 30; d++) { const x = WX + d * 20, L = d % 10 ? (d % 5 ? 16 : 26) : 40; WG.forEach(gg => mk(gg, 'line', { x1: x, y1: 260, x2: x, y2: 260 + L, stroke: C.ink, 'stroke-width': d % 10 ? 1.5 : 2.5 })); if (d % 10 === 0) { txt(WG[0], x, 326, d / 10, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); txt(WG[1], x, 326, d * 10, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); } }
txt(WG[0], WX + 600, 350, 'm', { 'text-anchor': 'end', fill: UC, 'font-weight': 600 }); txt(WG[1], WX + 600, 350, 'cm', { 'text-anchor': 'end', fill: UC, 'font-weight': 600 });
const rod = mk(w, 'rect', { x: WX, y: 196, width: 500, height: 40, rx: 6, fill: '#8D99AE', stroke: C.ink, 'stroke-width': 2.5 });
mk(w, 'line', { x1: WX + 500, y1: 196, x2: WX + 500, y2: 398, stroke: C.ac, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const tW = [wt('W3', 'Write'), wt('W4', 'Here'), wt('W5', 'One'), wt('W6', 'That')], tSwW = wt('W5', 'hundred');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Electric current is a vector', right: 'Current is a scalar: currents add like numbers' });
const j = $('#jn'), JC = [300, 150];
const jw = [mk(j, 'path', { d: `M60,56 L${JC[0]},${JC[1]}`, stroke: C.ink, 'stroke-width': 4, fill: 'none' }), mk(j, 'path', { d: `M60,244 L${JC[0]},${JC[1]}`, stroke: C.ink, 'stroke-width': 4, fill: 'none' }), mk(j, 'path', { d: `M${JC[0]},${JC[1]} L480,${JC[1]}`, stroke: C.ink, 'stroke-width': 4, fill: 'none' })];
const jd = mk(j, 'circle', { cx: JC[0], cy: JC[1], r: 9, fill: C.ink });
const ja = [PUC.arrow(j, C.ac, 5, 16), PUC.arrow(j, C.ac, 5, 16), PUC.arrow(j, C.ac, 5, 16)];
const jt = [txt(j, 150, 74, '2 A', { 'font-size': 26, fill: C.ac, 'font-weight': 600 }), txt(j, 150, 248, '3 A', { 'font-size': 26, fill: C.ac, 'font-weight': 600 }), txt(j, 360, 132, '5 A', { 'font-size': 26, fill: C.ac, 'font-weight': 600 })];
const tJn = wt('X3', 'junction');
const where = PUC.where($('#wa'), { on: [], type: 'Quick one mark questions: spot the base quantity, the derived quantity or the vector' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Which set contains only derived quantities that are also scalars?', qW: 780,
  opts: ['Speed, density, work', 'Velocity, mass, time', 'Force, volume, pressure', 'Electric current, temperature, energy'], right: 0, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 250 });
const so = PUC.solution($('#so'), [['<b style="color:var(--red)">B</b>: mass and time are base'], ['<b style="color:var(--red)">C</b>: force is a vector'], ['<b style="color:var(--red)">D</b>: current, temperature are base'], ['<b style="color:var(--ok)">A</b>: all derived, all scalar']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), T0('A5')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Units and measurement · fact card', y0: 100, dy: 86, txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${QC}}{Q} = \\textcolor{${NC}}{n}\\,\\textcolor{${UC}}{u} \\qquad \\textcolor{${NC}}{n_1}\\textcolor{${UC}}{u_1} = \\textcolor{${NC}}{n_2}\\textcolor{${UC}}{u_2}`), K(`\\textcolor{${NC}}{n} \\propto 1/\\textcolor{${UC}}{u}\\;\\; \\text{(bigger unit, smaller number)}`),
    '7 SI base: <span class="mono">m · kg · s · A · K · mol · cd</span>', '<b>Scalar</b>: size only &nbsp;·&nbsp; <b>Vector</b>: size + direction'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 02', topic: 'Fundamental and Derived Quantities', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS5 - 0.1, 1.1, 640, 560], [tS6 + 0.2, 1, 960, 540]]);
const fmtN = n => n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1).replace(/\.0$/, '') : n >= 1 ? n.toFixed(2).replace(/0$/, '').replace(/\.0$/, '') : n.toFixed(2);
let geo = null;
function measure() {
  geo = 1;
  // magnitude / unit brackets follow the real glyph positions
  const mg = $('#mag'), a0 = $('#magN'), a1 = $('#magU');
  const L0 = a0.offsetLeft, W0 = a0.offsetWidth, L1 = a1.offsetLeft, W1 = a1.offsetWidth;
  $('#bk0').setAttribute('d', `M${L0} 4 V18 H${L0 + W0} V4`); $('#bk1').setAttribute('d', `M${L1} 4 V18 H${L1 + W1} V4`);
  const b0 = $('#bl0'), b1 = $('#bl1'); b0.style.left = (L0 + W0 / 2 - b0.offsetWidth / 2) + 'px'; b1.style.left = (L1 + W1 / 2 - b1.offsetWidth / 2) + 'px';
  // derived builders: lay blocks in a row
  for (let i = 0; i < 2; i++) { let x = 36; ['db' + i + '0', 'do' + i + '0', 'db' + i + '1', 'do' + i + '1', 'db' + i + '2'].forEach(id => { const e = $('#' + id); e.style.left = x + 'px'; x += e.offsetWidth + 20; }); }
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hk'), t, tMorph + 0.15, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.vis($('#note'), t, tMorph + 0.7, 1e9, { dy: -30, sp: M.SOFT });
    $('#note').style.transform = ($('#note').style.transform === 'none' || !$('#note').style.transform ? '' : $('#note').style.transform + ' ') + 'rotate(-4deg)';
    M.vis($('#hd'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hdF'), t, tMorph + 0.5, 1e9, { ...POP, sc: 0.5 });
    M.rise($('#hdN'), t, tMorph + 0.55, { st: 0.06 }); M.vis($('#hdT'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#hdB'), t, tMorph + 0.9, 1e9, POP);
    M.vis($('#hq'), t, tMorph + 0.45, out, { dy: 36, ...o });
    TILES.forEach((_, i) => { const el = $('#tl' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (i < 2 ? 1 - M.io((t - tTile[i + 1]) / 0.25) : 1 - M.io((t - tUnitH) / 0.3)); el.style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#hqP'), t, tUnitH - 0.05, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    MT.forEach((m, k) => { const el = $('#mt' + k); M.vis(el, t, tMt[k] - 0.1, 1e9, POP); el.style.background = m[3] ? C.soft : C.redBg; M.vis(el.querySelector('.mk'), t, k < 5 ? tMt[k] + 0.2 : wt('P3', 'instrument'), 1e9, { ...POP, sc: 0.3 }); });
    M.vis($('#mtL'), t, tMt[5] - 0.1, 1e9, { dy: 10 });
    M.vis($('#pm'), t, tP4 - 0.05, out, { dx: 60, dy: 0, ...o });
    M.vis($('#mag'), t, tP4 + 0.2, 1e9, { dy: 24 });
    $('#magN').style.color = mix(C.ink, C.ink, 0); $('#magU').style.color = UC;
    M.draw($('#bk0'), t, wt('P4', 'number') - 0.05, 0.4); M.vis($('#bl0'), t, wt('P4', 'magnitude') - 0.1, 1e9, { dy: 10 });
    M.draw($('#bk1'), t, wt('P4', 'unit') - 0.15, 0.4); M.vis($('#bl1'), t, wt('P4', 'unit'), 1e9, { dy: 10 });
    M.vis($('#pmL'), t, tP5 + 0.1, 1e9, { dy: 10 });
    [wt('P5', 'metre'), wt('P5', 'kilogram'), wt('P5', 'kilogram') + 0.45].forEach((tt, i) => M.vis($('#uc' + i), t, tt - 0.1, 1e9, POP));
  }

  /* S: bench + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    M.vis(pen, t, tS1 + 0.4, 1e9, { dx: -40, dy: 0 });
    // ruler mode weights: cm until millimetres, mm until metres, then m
    const wmm = M.io((t - tMm) / 0.35) * (1 - M.io((t - tMe) / 0.35)), wm = M.io((t - tMe) / 0.35), wcm = 1 - wmm - wm;
    [wmm, wcm, wm].forEach((wv, i) => { RG[i].style.opacity = wv.toFixed(3); M.hide(RG[i], wv < 0.01); });
    $('#dial').querySelectorAll('span').forEach((sp, i) => { const on = [wmm, wcm, wm][i]; sp.style.background = mix('#FFFFFF', UC, on); sp.style.color = mix(C.mute, '#FFFFFF', on); sp.style.borderColor = mix(C.line, UC, on); });
    M.vis($('#dial'), t, tS1 + 0.6, 1e9, { dy: 10 });
    M.draw(rdl, t, tCm - 0.2, 0.5);
    const rd = $('#rd'); M.vis(rd, t, tCm, 1e9, POP);
    const mode = t < tMm + 0.15 ? 1 : t < tMe + 0.15 ? 0 : 2;
    M.setT($('#rdN'), ['150', '15', '0.15'][mode]); M.setT($('#rdU'), ['mm', 'cm', 'm'][mode]);
    rd.style.left = (530 - rd.offsetWidth / 2).toFixed(0) + 'px';
    // readout: n follows the graph dot every frame, u steps with the dial, Q never changes
    const gi = t < tCm ? 1 : gIdx(t), n = 150 / Math.pow(10, gi);
    M.setT($('#ron'), Math.abs(gi - Math.round(gi)) < 0.004 ? ['150', '15', '1.5', '0.15'][Math.round(gi)] : fmtN(n));
    M.setT($('#rou'), ['1 mm', '1 cm', '1 m'][mode]);
    attr(gd, 'cx', (150 + gi * 180).toFixed(1)); attr(gd, 'cy', GY(n).toFixed(1)); M.hide(gd, t < tCm - 0.1);
    const lo = t < tMe ? Math.min(1, gi) : 0, hi = t < tMe ? 1 : Math.max(1, gi);
    attr(gl, 'd', t < tMm ? '' : `M${150 + lo * 180},${GY(150 / Math.pow(10, lo)).toFixed(1)} L${150 + hi * 180},${GY(150 / Math.pow(10, hi)).toFixed(1)}`);
    M.vis(gTag, t, wt('S6', 'ten') - 0.1, 1e9, POP);
    avD(t, wt('S5', 'changed') + 0.2, out);
  }

  /* D: the rule */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#st' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 240], [tStep[2] - 0.1, 396]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 6).toFixed(1) + 'px';
    M.vis($('#dr'), t, wt('D2', 'Q', 1) - 0.1, 1e9, { dx: 60, dy: 0 });
    const W = wTr(t), H = AR / W;
    attr(rect, 'y', (AY - H).toFixed(1)); attr(rect, 'width', W.toFixed(1)); attr(rect, 'height', H.toFixed(1));
    attr(bw, 'd', `M${AX},${AY + 18} v10 h${W.toFixed(1)} v-10`); attr(bh, 'd', `M${AX - 18},${AY} h-10 v${(-H).toFixed(1)} h10`);
    attr(lu, 'x', (AX + W / 2).toFixed(1)); attr(lu, 'y', AY + 64); attr(ln, 'x', AX - 40); attr(ln, 'y', (AY - H / 2 + 12).toFixed(1));
    attr(la, 'x', (AX + W / 2).toFixed(1)); attr(la, 'y', (AY - H / 2 + 8).toFixed(1)); la.style.opacity = M.clamp((W - 150) / 60) * M.clamp((t - tD5) / 0.3);
    [400, 128, 220].forEach((gw, k) => { const gh = AR / gw, r = ghostR[k]; attr(r, 'y', (AY - gh).toFixed(1)); attr(r, 'width', gw); attr(r, 'height', gh.toFixed(1)); r.style.opacity = t > wK[k][0] + 1.0 ? 0.35 : 0; });
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'physical') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'never'), 0.8);
  }

  /* C: base and derived */
  const cOn = t >= tC1 - 0.1 && t < tV1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('V1');
    M.vis($('#cb'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    BQ.forEach((_, i) => { const el = $('#bq' + i); M.vis(el, t, T0('C3') + 0.3 + i * 0.08, 1e9, { dy: 14 }); const on = M.io((t - tBq[i] + 0.05) / 0.25); el.style.background = mix(C.soft, C.ac2, on); el.querySelector('.bs').style.color = mix(C.dim, C.ac, on); el.querySelector('.bn').style.color = mix(C.dim, C.ink, on); el.querySelector('.bu').style.color = mix(C.dim, C.mute, on); });
    M.vis($('#cd'), t, tC1 + 0.45, out, { dx: 60, dy: 0, ...o });
    tDv.forEach((ts, i) => { M.vis($('#db' + i + '0'), t, ts[0] - 0.1, 1e9, POP); M.vis($('#do' + i + '0'), t, ts[1] - 0.1, 1e9, POP); M.vis($('#db' + i + '1'), t, ts[2] - 0.1, 1e9, POP); M.vis($('#do' + i + '1'), t, ts[2] + 0.25, 1e9, POP); M.vis($('#db' + i + '2'), t, ts[2] + 0.4, 1e9, POP); PUC.write($('#df' + i), t, ts[2] + 0.7, 0.7); });
    M.vis($('#dvP'), t, wt('C6', 'metre') - 0.1, 1e9, POP);
  }

  /* V: scalars and vectors, push a box */
  const vOn = t >= tV1 - 0.1 && t < tG1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('G1');
    M.vis($('#vr'), t, tV1 + 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#cS'), t, T0('V2') - 0.05, 1e9, { dy: 24 }); M.vis($('#cV'), t, T0('V3') - 0.05, 1e9, { dy: 24 });
    tCs.forEach((tt, i) => M.vis($('#cs' + i), t, tt - 0.1, 1e9, POP)); tCv.forEach((tt, i) => M.vis($('#cv' + i), t, tt - 0.1, 1e9, POP));
    M.vis($('#vs'), t, tV1 + 0.25, out, { dx: -60, dy: 0, ...o });
    const bx = bxTr(t); attr(box, 'x', bx.toFixed(1));
    ghostB.forEach((gb, k) => { const gx = bxTr(t - 0.12 * (k + 1)), mv = Math.abs(bx - gx) > 3; attr(gb, 'x', gx.toFixed(1)); gb.style.opacity = mv ? [0.3, 0.2, 0.12][k] : 0; });
    const right = t < tPushL - 0.1, fOn = M.io((t - (right ? tPushR : tPushL) + 0.05) / 0.4) * (1 - M.io((t - (right ? tMoveR + 1.0 : tMoveL + 1.0)) / 0.3));
    const fy = FY - 55, len = 120 * fOn;
    if (right) { fA.set(bx - 10 - len, fy, bx - 10, fy); attr(fL, 'x', (bx - 10 - len / 2 - 10).toFixed(1)); }
    else { fA.set(bx + 140 + len, fy, bx + 140, fy); attr(fL, 'x', (bx + 140 + len / 2 - 10).toFixed(1)); }
    attr(fL, 'y', fy - 22); fL.style.opacity = fOn.toFixed(3);
    M.vis($('#vro'), t, tPushR - 0.1, 1e9, { dy: 10 });
    M.setT($('#vD'), right ? 'right' : 'left'); M.setT($('#vF'), '10');
    avA(t, wt('V5', 'direction') + 0.2, out);
  }

  /* G: sort board */
  const gOn = t >= tG1 - 0.1 && t < tW1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#board'), t, tG1 + 0.05, OUT('W1'), { dy: 36, ...o });
    M.vis($('#rh0'), t, tG1 + 0.3, 1e9, { dy: 10 }); M.vis($('#rh1'), t, tG1 + 0.4, 1e9, { dy: 10 });
    [0, 1].forEach(r => [0, 1].forEach(c => { const el = $('#ce' + r + c); M.vis(el, t, tG1 + 0.3 + (r * 2 + c) * 0.08, 1e9, { dy: 16 }); }));
    SQ.forEach(([, r, c], i) => { M.vis($('#sq' + i), t, tSq[i] - 0.1, 1e9, { dy: -40, sp: M.SOFT, fade: 0.1 }); });
    [[0, 0, tSq[0]], [1, 0, tSq[2]], [1, 1, tSq[4]]].forEach(([r, c, tt]) => { const on = M.io((t - tt) / 0.3); $('#ce' + r + c).style.background = mix(C.soft, C.ac2, on); });
    M.vis($('#empty'), t, wt('G6', 'empty') - 0.1, 1e9, POP);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const sw2 = M.io((t - tSwW) / 0.35); WG[0].style.opacity = (1 - sw2).toFixed(3); WG[1].style.opacity = sw2.toFixed(3); M.hide(WG[0], sw2 > 0.99); M.hide(WG[1], sw2 < 0.01);
    attr(rod, 'width', (500 * M.o3((t - T0('W2') - 0.5) / 0.9)).toFixed(1));
    const rc = $('#rodC'); M.vis(rc, t, T0('W2') + 1.2, 1e9, POP);
    const late = t >= wt('W6', 'two') - 0.05; M.setT($('#rodN'), late ? '250' : '2.5'); M.setT($('#rodU'), late ? 'cm' : 'm');
    rc.style.left = (592 - rc.offsetWidth / 2).toFixed(0) + 'px';
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'electric') - 0.1, tStrike: wt('X3', 'scalar') - 0.1, tRight: wt('X3', 'scalar') + 0.3 });
    jw.forEach((p, i) => M.draw(p, t, tJn - 0.1 + i * 0.15, 0.4)); M.vis(jd, t, tJn, 1e9, { ...POP, sc: 0.3 });
    const jv = [[60, 56], [60, 244]]; [0, 1].forEach(i => { const u = M.io((t - wt('X3', i ? 'three' : 'two') + 0.05) / 0.35); const [x0, y0] = jv[i]; ja[i].set(x0 + (JC[0] - x0) * 0.35, y0 + (JC[1] - y0) * 0.35, x0 + (JC[0] - x0) * (0.35 + 0.3 * u), y0 + (JC[1] - y0) * (0.35 + 0.3 * u)); jt[i].style.opacity = u.toFixed(3); });
    { const u = M.io((t - wt('X3', 'five') + 0.05) / 0.35); ja[2].set(JC[0] + 50, JC[1], JC[0] + 50 + 110 * u, JC[1]); jt[2].style.opacity = u.toFixed(3); }
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Mostly') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [wt('F1', 'Q') - 0.1, wt('F1', 'Q') + 0.6, wt('F1', 'seven') - 0.1, wt('F1', 'scalars') - 0.1], tShot: wt('F1', 'card') }); nx(t, tN - 0.05); }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
