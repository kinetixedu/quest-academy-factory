// PUC Electronics Ep 31 - Transducers and their applications ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, t and R ink; temperature θ red (introduced in Ep 31)
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, RD = C.red, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const Vv = s => `\\textcolor{${TE}}{V_{\\text{${s}}}}`, Ii = `\\textcolor{${VI}}{I}`;

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions, roll-mode traces (newest at the right) */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col }); e.textContent = s; return e; }
  };
};
/* NTC thermistor model (EXAMPLE FIGURES): 10 kΩ at 25 °C, 6.0 kΩ at 37 °C */
const BETA = Math.log(0.6) / (1 / 310.15 - 1 / 298.15);
const RT = th => 10 * Math.exp(BETA * (1 / (th + 273.15) - 1 / 298.15));

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'One') - 0.2;
const tD = T0('I2'), tB = T0('B1'), tT = T0('T1'), tN = T0('M1'), tDv = T0('D1'), tW = T0('W1'), tP = T0('P1'), tU = T0('U1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tN], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const thS = $('#thS');
const thP = [W(thS, 'M128,20 H172 A12,12 0 0 1 184,32 V250 L162,330 H138 L116,250 V32 A12,12 0 0 1 128,20 Z', { fill: '#fff', 'stroke-width': 5 }),
  W(thS, 'M140,330 V392 A10,10 0 0 0 160,392 V330', { 'stroke-width': 4, fill: '#E3E6EC' })];
const thWin = mk(thS, 'rect', { x: 126, y: 60, width: 48, height: 120, rx: 6, fill: '#E3EBDF', stroke: INK, 'stroke-width': 2.5 });
const thTxt = mono(thS, 150, 128, '25.0', { 'text-anchor': 'middle', 'font-size': 17, fill: INK, 'font-weight': 600, transform: 'rotate(-90 150 120)' });
const thBtn = mk(thS, 'circle', { cx: 150, cy: 222, r: 10, fill: AM, stroke: INK, 'stroke-width': 2 });
const tStart = tMorph + 0.6, tRead = wt('H1', 'beeps');
const thH = t => 25 + 12 * M.o3(M.clamp((t - tStart) / Math.max(1, tRead - tStart)));
const dgS = $('#dgS');
const dgAx = W(dgS, 'M20,16 V170 H290', { 'stroke-width': 2.5 });
const dgC = mk(dgS, 'path', { d: '', fill: 'none', stroke: RD, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dgL = [mono(dgS, 30, 24, 'θ', { 'font-size': 18, fill: RD }), mono(dgS, 290, 162, 'time', { 'font-size': 16, 'text-anchor': 'end' })];
$('#chain').innerHTML = `<span class="pillp" style="position:static;background:${C.redBg};color:${RD}">Heat</span>${M.icon('arrowR', 30, MU, 2.4)}<span id="chQ" class="pillp ink" style="position:static;min-width:56px;justify-content:center">?</span>${M.icon('arrowR', 30, MU, 2.4)}<span class="pillp" style="position:static;font-family:'IBM Plex Mono'">37.0 °C</span>`;
const chQ = $('#chQ'), chEls = [...$('#chain').children];

/* ================= D: definition ================= */
$('#dZ').innerHTML = M.icon('zap', 34, AM, 2.4);
const tiles = [0, 1].map(i => $('#dt' + i)), tS = tiles.map(d => d.querySelector('svg'));
const arcs = (svg, cx, cy, dir, n = 3) => [...Array(n)].map((_, k) => W(svg, `M${cx + dir * k * 22},${cy - 22 - k * 10} q${dir * 12},${22 + k * 10} 0,${44 + k * 20}`, { 'stroke-width': 3.5, stroke: MU }));
const wavP = (svg) => mk(svg, 'path', { d: '', fill: 'none', stroke: TE, 'stroke-width': 4, 'stroke-linecap': 'round' });
const setWave = (p, x0, x1, y, a, ph) => { let d = ''; for (let i = 0; i <= 40; i++) { const x = x0 + (x1 - x0) * i / 40; d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (y - a * Math.sin(i / 40 * 4 * Math.PI - ph)).toFixed(1); } PUC.attr(p, 'd', d); };
// mic tile: sound arcs -> mic -> electrical wave
const micA = arcs(tS[0], 300, 150, -1);
const micS = [mk(tS[0], 'circle', { cx: 380, cy: 150, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(tS[0], 'M362,116 V184', { 'stroke-width': 5 }), W(tS[0], 'M414,150 H450')];
const micW = wavP(tS[0]);
const micL = [mono(tS[0], 240, 216, 'sound', { 'text-anchor': 'middle', 'font-size': 18 }), mono(tS[0], 580, 216, 'electrical signal', { 'text-anchor': 'middle', 'font-size': 18, fill: TE })];
// speaker tile: wave -> speaker -> sound arcs
const spW = wavP(tS[1]);
const spS = [W(tS[1], 'M430,130 H458 V170 H430 Z', { fill: '#fff' }), W(tS[1], 'M458,136 L490,112 V188 L458,164', { fill: '#fff' })];
const spA = arcs(tS[1], 520, 150, 1);
const spL = [mono(tS[1], 320, 216, 'electrical signal', { 'text-anchor': 'middle', 'font-size': 18, fill: TE }), mono(tS[1], 560, 216, 'sound', { 'text-anchor': 'middle', 'font-size': 18 })];
const tQty = ['heat', 'light', 'sound', 'pressure'].map(w => wt('I3', w));

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cw = [W(ck, 'M150,282 V150 H330'), W(ck, 'M520,150 H700 V236'), W(ck, 'M700,356 V450 H150 V318')];
const bat = [W(ck, 'M115,282 H185', { 'stroke-width': 5 }), W(ck, 'M132,318 H168', { 'stroke-width': 9 })];
const thm = [W(ck, 'M330,150 L342,126 L366,174 L390,126 L414,174 L438,126 L462,174 L486,126 L508,174 L520,150'), W(ck, 'M318,206 H346 L506,96', { 'stroke-width': 3.5 })];
const fixR = W(ck, 'M700,236 L724,248 L676,272 L724,296 L676,320 L724,344 L700,356');
const vm = [W(ck, 'M700,200 H840 V274'), W(ck, 'M700,420 H840 V346'), mk(ck, 'circle', { cx: 840, cy: 310, r: 36, fill: '#fff', stroke: TE, 'stroke-width': 4 })];
const vmJ = [mk(ck, 'circle', { cx: 700, cy: 200, r: 7, fill: INK }), mk(ck, 'circle', { cx: 700, cy: 420, r: 7, fill: INK })];
const vmT = tx(ck, 840, 320, 'V', { fill: TE, 'text-anchor': 'middle', 'font-size': 30, 'font-style': 'italic' });
const lb = [tx(ck, 64, 278, '+', { 'font-size': 28 }), tx(ck, 68, 336, '-', { 'font-size': 30 }), tx(ck, 196, 296, 'Supply'), mono(ck, 196, 324, '5 V'),
  tx(ck, 425, 82, 'Thermistor', { 'text-anchor': 'middle' }), mono(ck, 520, 108, '-t°', { 'font-weight': 600, fill: RD, 'font-size': 22 }),
  tx(ck, 650, 292, 'Fixed R', { 'text-anchor': 'end' }), mono(ck, 650, 320, '10 kΩ', { 'text-anchor': 'end' }), mono(ck, 826, 398, 'V out', { 'text-anchor': 'end', fill: TE, 'font-weight': 600 })];
const heatW = [0, 1, 2].map(() => W(ck, '', { stroke: RD, 'stroke-width': 3.5 }));
const heatL = mono(ck, 425, 256, 'WARMTH', { 'text-anchor': 'middle', fill: RD, 'font-weight': 600, 'font-size': 18 });
const eB = flow(ck, [[150, 318], [150, 450], [700, 450], [700, 356], [700, 236], [700, 150], [520, 150], [330, 150], [150, 150], [150, 282]], 26, {
  skip: (x, y) => (Math.abs(x - 700) < 2 && y > 232 && y < 360) || (Math.abs(y - 150) < 2 && x > 326 && x < 524) || (Math.abs(x - 150) < 2 && y > 278 && y < 322) });
const tOn = wt('B3', 'across') , tWarm = wt('B5', 'warms');
const thB = τ => τ < tWarm ? 25 : 25 + 12 * (1 - Math.exp(-(τ - tWarm) / 1.9));
const vOut = τ => 50 / (10 + RT(thB(τ)));
const qB = τ => { // charge passed (mA·s), integral of current, for electron dot offsets
  if (τ < tOn) return 0; const a = Math.min(τ, tWarm) - tOn; let s = 0.25 * Math.max(0, a);
  if (τ > tWarm) { const n = 40, d = (τ - tWarm) / n; for (let i = 0; i < n; i++) s += 5 / (10 + RT(thB(tWarm + (i + 0.5) * d))) * d; } return s; };
const SC = scope($('#scS'), 592, 200);
const tr1 = SC.tr(CH1), tr2 = SC.tr(AM);
const sLab = [SC.lab(14, 52, 'CH1 · SUPPLY 5 V', CH1), SC.lab(14, 190, 'CH2 · V OUT · ZOOM', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${RD};font-style:normal">θ</span><span class="v" id="rT" style="color:${RD}">25.0</span><span class="u">°C</span>
  <span class="k">R<sub>T</sub></span><span class="v" id="rR">10.0</span><span class="u">kΩ</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.250</span><span class="u">mA</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="rV" style="color:${TE}">2.500</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'So my fever is really a voltage!' });

/* ================= N: mechanism + derivation + worked example ================= */
const nS = $('#nS');
const LAT = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) LAT.push([96 + c * 74, 96 + r * 56]);
for (let r = 0; r < 4; r++) mk(nS, 'line', { x1: 96, y1: 96 + r * 56, x2: 688, y2: 96 + r * 56, stroke: '#D9DCE3', 'stroke-width': 3 });
for (let c = 0; c < 9; c++) mk(nS, 'line', { x1: 96 + c * 74, y1: 96, x2: 96 + c * 74, y2: 264, stroke: '#D9DCE3', 'stroke-width': 3 });
LAT.forEach(([x, y]) => mk(nS, 'circle', { cx: x, cy: y, r: 13, fill: '#E3E6EC', stroke: '#B8BCC6', 'stroke-width': 2 }));
const FREE = [...Array(14)].map((_, k) => mk(nS, 'circle', { r: 7, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const heatBar = mk(nS, 'rect', { x: 96, y: 294, width: 0, height: 14, rx: 7, fill: RD });
const heatBg = mk(nS, 'rect', { x: 96, y: 294, width: 592, height: 14, rx: 7, fill: C.redBg });
nS.insertBefore(heatBg, heatBar);
const heatTx = mono(nS, 96, 334, 'HEAT', { fill: RD, 'font-weight': 600, 'font-size': 18 });
const freeTx = mono(nS, 688, 334, 'free carriers: 2', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' });
// R_T vs θ graph
const gX = th => 150 + (th - 20) * 22, gY = r => 560 - (r - 4) * 22;
const gAx = W(nS, 'M150,372 V560 H660', { 'stroke-width': 2.5 });
const gLb = [mono(nS, 140, 388, 'R', { 'text-anchor': 'end', 'font-size': 20, fill: INK, 'font-weight': 600 }), mono(nS, 670, 566, 'θ', { 'font-size': 20, fill: RD, 'font-weight': 600 }),
  mono(nS, gX(25), 590, '25', { 'text-anchor': 'middle', 'font-size': 16 }), mono(nS, gX(37), 590, '37 °C', { 'text-anchor': 'middle', 'font-size': 16 })];
const gC = mk(nS, 'path', { d: '', fill: 'none', stroke: INK, 'stroke-width': 4.5, 'stroke-linecap': 'round' });
const gDot = mk(nS, 'circle', { r: 9, fill: RD });
const ntc = mk(nS, 'g'); { const r = mk(ntc, 'rect', { x: 470, y: 382, width: 180, height: 38, rx: 9, fill: C.ac2 }); mono(ntc, 560, 408, 'NTC · R falls', { 'text-anchor': 'middle', 'font-size': 18, fill: '#8A5A12', 'font-weight': 600 }); }
// mechanism chain (right card)
const mS = $('#mS');
const MCH = [['Heat goes in', RD], ['More free charge carriers', '#B7791F'], ['Current flows more easily', VI], ['Resistance falls', INK]];
const mRows = MCH.map(([s, col], i) => { const g = mk(mS, 'g'); mk(g, 'rect', { x: 36, y: 92 + i * 116, width: 712, height: 80, rx: 14, fill: C.soft }); mk(g, 'rect', { x: 36, y: 92 + i * 116, width: 10, height: 80, rx: 4, fill: col }); tx(g, 72, 142 + i * 116, s, { 'font-size': 30, fill: INK }); return g; });
const mArr = [0, 1, 2].map(i => W(mS, `M392,${176 + i * 116} V${204 + i * 116} M382,${194 + i * 116} L392,${206 + i * 116} L402,${194 + i * 116}`, { stroke: MU, 'stroke-width': 3 }));
const tM = [wt('M2', 'Heat'), wt('M2', 'more'), wt('M2', 'current'), wt('M2', 'This')];
const dSteps = [
  [K(`${Ii} = \\dfrac{${Vv('s')}}{R + R_T}`), 'same current in both', 92],
  [K(`${Vv('out')} = ${Ii}\\,R`), 'across the fixed R', 228],
  [K(`${Vv('out')} = ${Vv('s')}\\,\\dfrac{R}{R + R_T}`), 'voltage divider', 418]];
$('#nSteps').innerHTML = dSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const wRows = [
  [K(`${Vv('s')} = 5\\,\\text{V},\\; R = 10\\,\\text{k}\\Omega,\\; R_T = 6\\,\\text{k}\\Omega`), '', 96],
  [K(`${Vv('out')} = 5\\times\\dfrac{10}{10 + 6}`), '', 210],
  [K(`${Vv('out')} = 3.125\\,\\text{V}`), 'was 2.5 V', 428]];
$('#wSteps').innerHTML = wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const dRows = [...$('#nSteps').children], wR = [...$('#wSteps').querySelectorAll('.st2')];
const tDer = [wt('D2', 'I'), wt('D3', 'V'), wt('D4', 'Put')];
const tWr = [wt('W1', 'At'), wt('W2', 'V'), wt('W3', 'That')];
const heatN = t => t < tN ? 0 : M.io((t - wt('M2', 'Heat')) / 2.2);

/* ================= P: active vs passive ================= */
const PR = { A: [['Thermocouple', 'heat at a junction of two metals', 'makes V'], ['Solar cell', 'light falling on it', 'makes V'], ['Piezoelectric crystal', 'squeeze or pressure', 'makes V']],
  P: [['Thermistor', 'resistance changes with heat', 'changes R'], ['Light dependent resistor', 'resistance changes with light', 'changes R'], ['Strain gauge', 'resistance changes with stretch', 'changes R']] };
['A', 'P'].forEach(k => { $('#p' + k + 'r').innerHTML = PR[k].map(([n, e, o], i) => `<div class="pr" style="top:${76 + i * 168}px"><svg width="170" height="132"></svg><div class="nm">${n}</div><div class="ex">${e}</div><div class="out" style="background:${k === 'A' ? C.okBg : C.soft};color:${k === 'A' ? '#1F6B3F' : C.ink2}">${o}</div></div>`).join(''); });
const pRA = [...$('#pAr').children], pRP = [...$('#pPr').children];
pRP[1].querySelector('.nm').style.fontSize = '25px'; pRP[1].querySelector('.nm').style.top = '33px';
// fit names: the passive "Light dependent resistor" name is long, so it shrinks if needed
const ic = (row) => row.querySelector('svg');
// thermocouple: two metals joined, heat under the junction
const icA = [
  [W(ic(pRA[0]), 'M140,48 H80 L56,70', { stroke: INK }), W(ic(pRA[0]), 'M140,92 H80 L56,70', { stroke: OR }), mk(ic(pRA[0]), 'circle', { cx: 56, cy: 70, r: 6, fill: INK })],
  [W(ic(pRA[1]), 'M60,44 H140 V100 H60 Z', { fill: '#E6ECF5' }), W(ic(pRA[1]), 'M86,44 V100 M114,44 V100 M60,72 H140', { 'stroke-width': 2.5, stroke: CH1 })],
  [W(ic(pRA[2]), 'M76,52 H124 V96 H76 Z', { fill: '#F2ECF8' })]];
const icAx = [[0, 1, 2].map(k => W(ic(pRA[0]), '', { stroke: RD, 'stroke-width': 3 })), [0, 1, 2].map(k => W(ic(pRA[1]), `M${74 + k * 26},${34} l-10,-16`, { stroke: AM, 'stroke-width': 3.5 })),
  [W(ic(pRA[2]), 'M100,14 V38 M90,28 L100,40 L110,28', { 'stroke-width': 3.5 }), W(ic(pRA[2]), 'M100,128 V110 M90,116 L100,104 L110,116', { 'stroke-width': 3.5 })]];
const icP = [
  [W(ic(pRP[0]), 'M30,70 H52 L60,54 L76,86 L92,54 L108,86 L124,54 L132,70 H150'), W(ic(pRP[0]), 'M52,104 H66 L130,38', { 'stroke-width': 3 })],
  [mk(ic(pRP[1]), 'circle', { cx: 92, cy: 72, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 3.5 }), W(ic(pRP[1]), 'M30,72 H52 M64,62 H120 V82 H64 Z M132,72 H154'), W(ic(pRP[1]), 'M48,18 L68,40 M60,46 L68,40 L66,32 M70,10 L90,32 M82,38 L90,32 L88,24', { 'stroke-width': 3, stroke: AM })],
  [W(ic(pRP[2]), 'M46,46 H138 V54 H52 V62 H138 V70 H52 V78 H138 V86 H52 V94 H138', { 'stroke-width': 2.5 }), W(ic(pRP[2]), 'M46,46 V114 M138,94 V114', { 'stroke-width': 2.5 })]];
const tPA = [wt('P2', 'thermocouple'), wt('P2', 'solar'), wt('P3', 'piezoelectric')], tPP = [wt('P5', 'thermistor'), wt('P5', 'light'), wt('P5', 'strain')];

/* ================= U: applications ================= */
const UA = [['Street light', 'light dependent resistor', 'switches on at dusk'], ['Weighing scale', 'strain gauge', 'feels the load'], ['Ultrasound scanner', 'piezoelectric crystal', 'sends and receives sound']];
$('#uTiles').innerHTML = UA.map(([n, e, p], i) => `<div class="card uT" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:28px">${['ON THE ROAD', 'IN THE SHOP', 'IN THE HOSPITAL'][i]}</div><svg width="512" height="220"></svg><div class="nm">${n}</div><div class="ex">${e}</div><div class="pillp good">${p}</div></div>`).join('');
const uT = [...$('#uTiles').children], uS = uT.map(e => e.querySelector('svg'));
const sky = mk(uS[0], 'rect', { x: 40, y: 0, width: 432, height: 210, rx: 14, fill: '#DCE7FC' });
const post = [W(uS[0], 'M256,206 V40 H318', { 'stroke-width': 6 }), W(uS[0], 'M300,40 H344 L332,62 H312 Z', { fill: '#fff' })];
const lampF = mk(uS[0], 'path', { d: 'M312,62 H332 L360,150 H284 Z', fill: AM, opacity: 0 });
const ldrI = mk(uS[0], 'circle', { cx: 256, cy: 92, r: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const scl = [W(uS[1], 'M150,170 H362 L346,200 H166 Z', { fill: '#fff' }), W(uS[1], 'M190,150 H322', { 'stroke-width': 6 })];
const box = mk(uS[1], 'rect', { x: 216, y: 0, width: 80, height: 70, rx: 8, fill: C.ac2, stroke: INK, 'stroke-width': 3 });
const sclR = mono(uS[1], 256, 194, '0.00 kg', { 'text-anchor': 'middle', 'font-size': 16, fill: INK, 'font-weight': 600 });
const prb = [W(uS[2], 'M120,60 H190 V150 Q155,176 120,150 Z', { fill: '#fff' }), W(uS[2], 'M155,60 V24', { 'stroke-width': 5 })];
const usA = [0, 1, 2, 3].map(k => W(uS[2], '', { stroke: CH1, 'stroke-width': 3.5 }));
const usE = W(uS[2], 'M410,90 V160', { stroke: MU, 'stroke-width': 6 });
const tUa = [wt('U2', 'light'), wt('U2', 'strain'), wt('U3', 'ultrasound')];
const avU = PUC.avatar($('#sU'), { x: 160, y: 776, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Ultrasound uses a transducer? That is on my doctor list!' });

/* ================= X: exam trap ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Every transducer needs a power supply', right: 'Active ones make their own voltage', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcW = [W(tcS, 'M470,110 H190 L140,150', { stroke: INK }), W(tcS, 'M470,190 H190 L140,150', { stroke: OR }), mk(tcS, 'circle', { cx: 140, cy: 150, r: 7, fill: INK })];
const tcH = [0, 1, 2].map(() => W(tcS, '', { stroke: RD, 'stroke-width': 3.5 }));
const tcM = [W(tcS, 'M470,92 H700 V210 H470 Z', { fill: '#fff' }), W(tcS, 'M520,186 A65,65 0 0 1 650,186', { 'stroke-width': 3 })];
const tcN = W(tcS, 'M585,186 L585,132', { stroke: TE, 'stroke-width': 4 });
const tcMl = [mono(tcS, 585, 204, 'mV', { 'text-anchor': 'middle', 'font-size': 16 }), mono(tcS, 120, 252, 'no battery anywhere, still a reading', { 'font-size': 18, fill: '#B7791F', 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Define a transducer, active vs passive with examples, explain one application' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'An LDR and a 4&nbsp;kΩ resistor are in series across 6&nbsp;V. In the dark, the voltage across the 4&nbsp;kΩ resistor is 1.2&nbsp;V. Find the resistance of the LDR.', qW: 780,
  opts: [K('1\\,\\text{k}\\Omega'), K('4.8\\,\\text{k}\\Omega'), K('16\\,\\text{k}\\Omega'), K('20\\,\\text{k}\\Omega')], right: 2, optW: 474, optY: 372 });
const sol = PUC.solution($('#so'), [[K(`${Ii} = \\dfrac{1.2}{4\\,\\text{k}\\Omega} = 0.3\\,\\text{mA}`)], [K(`\\textcolor{${TE}}{V_{\\text{LDR}}} = 6 - 1.2 = 4.8\\,\\text{V}`)],
  [K(`R = \\dfrac{4.8}{0.3\\,\\text{mA}}`)], [K(`R = 16\\,\\text{k}\\Omega`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'One'), wt('A3', 'Six'), wt('A4', 'So'), wt('A4', 'Sixteen')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 84, dy: 114, title: 'Transducers · formula card', txt: [0, 1, 1, 1],
  lines: [K(`${Vv('out')} = ${Vv('s')}\\,\\dfrac{R}{R + R_T}`),
    'Transducer: energy in one form → another form',
    'Active (own voltage): thermocouple, solar cell, piezo',
    'Passive (need a supply): thermistor, LDR, strain gauge'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 32', topic: 'Component symbols and identification', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tB5 = T0('B5'), tB7 = T0('B7'), tP4 = T0('P4'), tP5 = T0('P5');
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const wavy = (p, x, y0, ph) => PUC.attr(p, 'd', `M${x},${y0.toFixed(1)} q8,-9 0,-18 q-8,-9 0,-18`);

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gA = t >= tB + 0.5 && t < tT, gB = t >= tW && t < tP;
  M.vis(ghost, t, gA ? tB + 0.5 : tW + 0.2, gA ? tT - 0.4 : tP - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gA && !gB) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tD + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tD - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(thP, t, tMorph + 0.6, 0.5, 0.15); fadeAt([thWin, thTxt, thBtn], t, tMorph + 1.0);
    const th = thH(t); M.setT(thTxt, th.toFixed(1));
    M.vis($('#aPill'), t, tRead, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    PUC.attr(thWin, 'fill', t >= tRead ? M.mix('#E3EBDF', '#F4DDA8', M.io((t - tRead) / 0.2)) : '#E3EBDF');
    M.vis($('#thC'), t, tMorph + 0.5, out, { dx: 60, dy: 0, ...o });
    fadeAt([$('#thN'), $('#thL')], t, tMorph + 0.7); M.setT($('#thN'), th.toFixed(1));
    M.vis($('#thL2'), t, tRead + 0.2, 1e9, { dy: 10 });
    M.draw(dgAx, t, tMorph + 0.8, 0.5); fadeAt(dgL, t, tMorph + 1.0);
    { let d = ''; for (let i = 0; i <= 60; i++) { const τ = tStart + (tRead + 1 - tStart) * i / 60; if (τ > t) break; d += (i ? 'L' : 'M') + (20 + 260 * i / 60).toFixed(1) + ',' + (165 - 11 * (thH(τ) - 25)).toFixed(1); } PUC.attr(dgC, 'd', d); }
    M.vis($('#nwC'), t, T0('H2') - 0.1, out, { dy: 36, ...o });
    chEls.forEach((e, i) => M.vis(e, t, T0('H2') + 0.2 + i * 0.12, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }));
    const tTr = wt('I1', 'transducer'); M.setT(chQ, t >= tTr ? 'transducer' : '?'); chQ.style.background = t >= tTr ? AM : INK;
    M.vis($('#nwB2'), t, wt('H2', 'cannot'), 1e9, { dy: 10 });
  }

  /* D: definition */
  const dOn = t >= tD - 0.05 && t < tB + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tB - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.rise($('#dq'), t, tD + 0.2, { st: 0.045 });
    [0, 1, 2, 3].forEach(i => { const p = $('#dp' + i), lit = M.io((t - tQty[i]) / 0.25); M.vis(p, t, T0('I3') + i * 0.08, 1e9, { dy: 14 }); p.style.background = M.mix(C.soft, AM, lit); p.style.color = M.mix(INK, '#FFFFFF', lit); });
    M.vis($('#dArr'), t, wt('I3', 'electrical') - 0.1, 1e9, { dy: 10 });
    const tI4 = T0('I4'), tI5 = T0('I5');
    tiles.forEach((tl, i) => { M.vis(tl, t, tD + 0.5 + i * 0.12, 1e9, { dy: 20 }); const lit = M.io((t - [tI4, tI5][i]) / 0.25);
      tl.style.background = M.mix(C.soft, '#FFFFFF', lit); tl.style.borderColor = M.mix(C.soft, AM, lit); tl.querySelector('.tn').style.color = M.mix(C.ink2, INK, lit); });
    drawSeq(micS, t, tI4 - 0.1, 0.3, 0.1); drawSeq(micA, t, wt('I4', 'sound'), 0.3, 0.1); fadeAt(micL, t, wt('I4', 'sound'));
    setWave(micW, 466, 690, 150, 26, 5 * (t - tI4)); M.hide(micW, t < wt('I4', 'electrical'));
    drawSeq(spS, t, tI5 - 0.1, 0.3, 0.1); setWave(spW, 220, 410, 150, 26, 5 * (t - tI5)); M.hide(spW, t < wt('I5', 'electrical'));
    drawSeq(spA, t, wt('I5', 'sound'), 0.3, 0.1); fadeAt(spL, t, wt('I5', 'electrical'));
    M.vis($('#dStrip'), t, wt('I5', 'back') - 0.1, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(thm, t, wt('B2', 'thermistor') - 0.1, 0.4, 0.2); fadeAt(lb.slice(4, 6), t, wt('B2', 'thermistor') + 0.2);
    drawSeq(cw, t, wt('B3', 'series') - 0.2, 0.4, 0.15); M.draw(fixR, t, wt('B3', 'fixed') - 0.1, 0.4); fadeAt(lb.slice(6, 8), t, wt('B3', 'fixed'));
    drawSeq(bat, t, wt('B3', 'five') - 0.1, 0.25, 0.1); fadeAt(lb.slice(0, 4), t, wt('B3', 'five'));
    drawSeq(vm.slice(0, 2), t, wt('B3', 'read') - 0.1, 0.35, 0.1); fadeAt([vm[2], vmT, ...vmJ, lb[8]], t, wt('B3', 'voltage') - 0.1);
    const th = thB(t), r = RT(th), i = 5 / (10 + r), v = 10 * i;
    eB.set(-420 * qB(t), t >= tOn - 0.1);
    const hu = M.io((t - tWarm) / 0.4);
    heatW.forEach((h, k) => { const ph = ((t - tWarm) * 0.9 + k / 3) % 1; wavy(h, 380 + k * 45, 244 - 40 * ph, ph); h.style.opacity = t < tWarm ? 0 : (hu * 0.85 * Math.sin(Math.PI * ph)).toFixed(3); });
    M.vis(heatL, t, tWarm + 0.1, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(thm[0], 'stroke', M.mix(INK, RD, M.clamp((th - 25) / 12) * 0.85));
    tr1(() => 120, t, tOn - 0.3, 7, 150, t >= tOn - 0.3);
    tr2(τ => 160 * (vOut(τ) - 2.5) - 20, t, tOn - 0.3, 7, 150, t >= tOn - 0.3);
    sLab.forEach(e => M.vis(e, t, tOn - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tOn - 0.1, 1e9, { dy: 12 });
    M.setT($('#rT'), th.toFixed(1)); M.setT($('#rR'), r.toFixed(1)); M.setT($('#rI'), i.toFixed(3)); M.setT($('#rV'), v.toFixed(3));
    avB(t, wt('B7', 'Heat') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tN; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tN - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'turns') - 0.05, { out: tN - 0.35, outDur: 0.25 }); }

  /* N: mechanism + derivation + worked example */
  const nOn = t >= tN - 0.05 && t < tP + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tP - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, tN + 0.25, out, { dx: 60, dy: 0, ...o });
    const h = heatN(t), nf = 2 + Math.round(12 * h);
    FREE.forEach((f, k) => { const on = k < nf, sp = 30 + 7 * k, ph = (t * (0.35 + 0.05 * (k % 4)) * (k % 2 ? 1 : -1) + k * 0.137) % 1, row = k % 3;
      const x = 96 + ((ph + 1) % 1) * 592, y = 124 + row * 56 + 4 * Math.sin(t * 3 + k);
      PUC.attr(f, 'cx', x.toFixed(1)); PUC.attr(f, 'cy', y.toFixed(1)); M.hide(f, !on); });
    PUC.attr(heatBar, 'width', (592 * h).toFixed(1)); M.setT(freeTx, 'free carriers: ' + nf);
    fadeAt([heatTx, freeTx], t, tN + 0.5);
    M.draw(gAx, t, tN + 0.7, 0.5); fadeAt(gLb, t, tN + 0.9);
    { const thNow = 25 + 12 * h; let d = ''; for (let k = 0; k <= 40; k++) { const th = 20 + 22 * k / 40; d += (k ? 'L' : 'M') + gX(th).toFixed(1) + ',' + gY(RT(th)).toFixed(1); }
      PUC.attr(gC, 'd', d); M.draw(gC, t, tN + 1.0, 0.8); PUC.attr(gDot, 'cx', gX(thNow).toFixed(1)); PUC.attr(gDot, 'cy', gY(RT(thNow)).toFixed(1)); M.vis(gDot, t, tN + 1.6, 1e9, { dy: 0, fade: 0.2 }); }
    M.vis(ntc, t, wt('M2', 'negative') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#nRL0'), t, tN + 0.4, tDv - 0.3, { dy: 10, outDur: 0.25 });
    mRows.forEach((g, i) => M.vis(g, t, i ? tM[i] - 0.1 : wt('M1', 'semiconductor'), tDv - 0.3, { dx: -16, dy: 0, outDur: 0.25, ody: -10 }));
    mArr.forEach((a, i) => { if (t < tDv - 0.3) M.draw(a, t, tM[i + 1] - 0.3, 0.3); else M.hide(a, true); });
    M.vis($('#nRL1'), t, tDv + 0.1, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#nRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dRows.forEach((r, i) => { M.vis(r, t, tDer[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDer[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDer[i], 0.6); M.vis(r.querySelector('.why'), t, tDer[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#nBox'), t, tDer[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#nUnit'), t, T0('D5'), tW - 0.3, { dy: 12, outDur: 0.25 });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWr[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWr[i] - 0.15); });
  }

  /* P: active vs passive */
  const pOn = t >= tP - 0.05 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tU - 0.32;
    M.vis($('#pA'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pP'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    const rowRun = (rows, ts, act) => rows.forEach((r, i) => {
      M.vis(r, t, (act ? tP : tP4) + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const lit = M.io((t - ts[i]) / 0.3); r.style.background = M.mix(C.soft, '#FFFFFF', lit); r.style.boxShadow = lit > 0 ? `inset 0 0 0 2.5px ${M.mix(C.soft, AM, lit)}` : 'none';
      r.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, lit); r.querySelector('.ex').style.color = M.mix('#C4C8D0', MU, lit);
      M.vis(r.querySelector('.out'), t, ts[i] + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    });
    rowRun(pRA, tPA, true); rowRun(pRP, tPP, false);
    icA.forEach((a, i) => drawSeq(a, t, tP + 0.5 + i * 0.12, 0.35, 0.08)); icP.forEach((a, i) => drawSeq(a, t, tP4 + 0.3 + i * 0.12, 0.35, 0.08));
    icAx[0].forEach((h, k) => { const ph = ((t - tPA[0]) * 0.9 + k / 3) % 1; PUC.attr(h, 'd', `M${40 + k * 16},${(128 - 30 * ph).toFixed(1)} q6,-7 0,-14 q-6,-7 0,-14`); h.style.opacity = t < tPA[0] ? 0 : (0.85 * Math.sin(Math.PI * ph)).toFixed(3); });
    icAx[1].forEach((r, k) => { r.style.opacity = t < tPA[1] ? 0 : (0.55 + 0.45 * Math.sin(6 * (t - tPA[1]) + k)).toFixed(3); });
    const sq = t < tPA[2] ? 0 : 6 * Math.max(0, Math.sin(5 * (t - tPA[2]))); icAx[2].forEach((a, k) => { PUC.attr(a, 'transform', `translate(0,${(k ? -sq : sq).toFixed(1)})`); M.vis(a, t, tPA[2] - 0.1, 1e9, { dy: 0, fade: 0.2 }); });
  }

  /* U: applications */
  const uOn = t >= tU - 0.05 && t < tX + 0.02; M.hide($('#sU'), !uOn);
  if (uOn) {
    uT.forEach((el, i) => { M.vis(el, t, tU + 0.15 + i * 0.1, 1e9, { dy: 36 }); const lit = M.io((t - tUa[i]) / 0.3);
      el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, lit); el.querySelector('.ex').style.color = M.mix('#C4C8D0', MU, lit);
      const p = el.querySelector('.pillp'); if (!p._c) { p._c = 1; p.style.left = ((512 - p.offsetWidth) / 2) + 'px'; } M.vis(p, t, tUa[i] + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); });
    const dusk = M.io((t - tUa[0] - 0.3) / 1.4); PUC.attr(sky, 'fill', M.mix('#DCE7FC', '#3A4560', dusk)); lampF.style.opacity = (dusk > 0.6 ? M.io((dusk - 0.6) / 0.2) * 0.9 : 0).toFixed(3);
    drawSeq(post, t, tU + 0.5, 0.4, 0.15); M.vis(ldrI, t, tU + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(scl, t, tU + 0.6, 0.4, 0.15); M.vis(sclR, t, tU + 0.9, 1e9, { dy: 0, fade: 0.2 });
    const drop = M.spring(t - tUa[1] - 0.2, M.SNAP); PUC.attr(box, 'y', (0 + 80 * drop).toFixed(1)); M.vis(box, t, tUa[1] - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.setT(sclR, (2.5 * M.clamp(drop)).toFixed(2) + ' kg');
    drawSeq(prb, t, tU + 0.7, 0.4, 0.15); M.vis(usE, t, tUa[2], 1e9, { dy: 0, fade: 0.2 });
    usA.forEach((a, k) => { const ph = ((t - tUa[2]) * 0.6 + k / 4) % 1, x = 214 + 180 * ph; PUC.attr(a, 'd', `M${x.toFixed(1)},${(105 - 14 - 20 * ph).toFixed(1)} q${(10 + 10 * ph).toFixed(1)},${(14 + 20 * ph).toFixed(1)} 0,${(28 + 40 * ph).toFixed(1)}`); a.style.opacity = t < tUa[2] ? 0 : (0.9 * Math.sin(Math.PI * ph)).toFixed(3); });
    avU(t, wt('U3', 'send') + 0.2, 1e9);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Active') - 0.1 });
    drawSeq(tcW, t, tX + 0.5, 0.4, 0.12); drawSeq(tcM, t, tX + 0.8, 0.35, 0.1); M.vis(tcMl[0], t, tX + 1.1, 1e9, { dy: 0, fade: 0.2 });
    const tH = wt('X3', 'thermocouple'), hu = M.io((t - tH) / 1.2);
    tcH.forEach((h, k) => { const ph = ((t - tH) * 0.9 + k / 3) % 1; PUC.attr(h, 'd', `M${118 + k * 22},${(222 - 34 * ph).toFixed(1)} q7,-8 0,-16 q-7,-8 0,-16`); h.style.opacity = t < tH ? 0 : (0.85 * Math.sin(Math.PI * ph)).toFixed(3); });
    M.draw(tcN, t, tX + 1.0, 0.3); PUC.attr(tcN, 'transform', `rotate(${(-50 + 90 * hu).toFixed(1)} 585 186)`);
    M.vis(tcMl[1], t, tH + 0.8, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Define') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
