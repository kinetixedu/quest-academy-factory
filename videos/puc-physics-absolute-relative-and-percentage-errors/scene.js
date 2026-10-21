// PUC Physics Ep 15: Absolute, relative and percentage errors (Motion notebook, measuring bench: a jug, five pours, live error bars)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const MC = C.ac, EC = C.red, RC = C.violet;      // colour-coding: mean / value blue, absolute error red, relative error violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const f1 = v => v.toFixed(1);
const WATER = '#9CC3F5', WATER2 = '#6FA4EE';

Object.assign(M.IC, {
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  tape: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2'],
  spoon: ['M8 3c2.2 0 4 2.2 4 5s-1.8 4.5-4 4.5S4 10.8 4 8s1.8-5 4-5Z', 'M8 12.5V21'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3'), tV1 = T0('V1'), tV4 = T0('V4');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const RD = [248, 252, 251, 247, 252], MEAN = 250;

/* ---------- title card ---------- */
const JOBS = [['heart', 'Doctor', 'PULSE · 3 TIMES', 'doctor'], ['tape', 'Tailor', 'SLEEVE · TWICE', 'tailor'], ['spoon', 'Cook', 'TASTES FIRST', 'cook']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H ---------- */
// left: a target with five shots around the true value (no reading is perfect)
const hj = $('#hjS'), TX = 392, TY = 270;
[150, 104, 58].forEach((r, i) => mk(hj, 'circle', { cx: TX, cy: TY, r, fill: i % 2 ? '#fff' : C.ac3 || '#EEF3FD', stroke: C.line, 'stroke-width': 2.5 }));
mk(hj, 'line', { x1: TX - 170, y1: TY, x2: TX + 170, y2: TY, stroke: C.line, 'stroke-width': 1.5 }); mk(hj, 'line', { x1: TX, y1: TY - 170, x2: TX, y2: TY + 170, stroke: C.line, 'stroke-width': 1.5 });
const hTrue = mk(hj, 'circle', { cx: TX, cy: TY, r: 9, fill: MC });
const hTL = txt(hj, TX + 178, TY + 6, 'true value', { 'font-size': 18, fill: MC, 'font-weight': 600 });
const SHOT = [[-38, 26], [44, -18], [26, 36], [-58, -30], [40, 12]];
const hShots = SHOT.map(([x, y]) => mk(hj, 'circle', { cx: TX + x, cy: TY + y, r: 11, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }));
$('#rdgs').innerHTML = RD.map((v, i) => `<div class="rdg" id="rd${i}" style="top:${84 + i * 70}px"><span class="rn">#${i + 1}</span><span class="rv">${v} <small>ml</small></span></div>`).join('');
const tRd = [wt('H4', 'Two'), wt('H4', 'Two', 1), wt('H4', 'Two', 2), wt('H4', 'Two', 3), wt('H4', 'Two', 4)];

/* ---------- P ---------- */
$('#tbls').innerHTML = RD.map((v, i) => `<div class="tbl" id="tb${i}" style="top:${84 + i * 72}px"><span class="c1">#${i + 1}</span><span class="c2">${v}</span><span class="c3">ml</span><span class="c4"></span></div>`).join('');

/* ---------- S: jug sim + readout + error-bar graph ---------- */
const s = $('#simS'), JX = 200, JW = 220, JB = 520, ML = 1.3;     // 1.6 px per ml: 300 ml = 480 px tall jug
const jugTop = JB - 300 * ML;
const watL = mk(s, 'rect', { x: JX + 4, width: JW - 8, fill: WATER, opacity: 0.85 });
const watS = mk(s, 'line', { x1: JX + 4, x2: JX + JW - 4, stroke: WATER2, 'stroke-width': 3 });
mk(s, 'path', { d: `M${JX},${jugTop - 10} V${JB} H${JX + JW} V${jugTop - 10}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' });
mk(s, 'path', { d: `M${JX + JW},${jugTop + 40} q60,10 60,80 t-60,80`, fill: 'none', stroke: C.ink, 'stroke-width': 4 });
// zoom window: magnified scale 240 - 260 ml
const ZX = 560, ZY = 120, ZH = 360, ZP = ZH / 20;     // 18 px per ml in the zoom
const zY = v => ZY + ZH - (v - 240) * ZP;
mk(s, 'rect', { x: ZX - 10, y: ZY - 20, width: 180, height: ZH + 40, rx: 10, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
const zClip = mk(s, 'clipPath', { id: 'zc15' }); mk(zClip, 'rect', { x: ZX - 10, y: ZY - 20, width: 180, height: ZH + 40, rx: 10 });
const zW = mk(s, 'rect', { x: ZX - 8, width: 176, fill: WATER, opacity: 0.85, 'clip-path': 'url(#zc15)' });
for (let v = 240; v <= 260; v++) { const y = zY(v); mk(s, 'line', { x1: ZX - 10, y1: y, x2: ZX + (v % 5 ? 20 : 40), y2: y, stroke: C.ink, 'stroke-width': v % 5 ? 1.5 : 2.5 }); if (v % 5 === 0) txt(s, ZX + 50, y + 7, v, { 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const zMean = mk(s, 'line', { x1: ZX - 10, y1: zY(250), x2: ZX + 170, y2: zY(250), stroke: MC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
txt(s, ZX + 80, ZY - 32, 'ZOOM · ml', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.5 });
for (let v = 0; v <= 300; v += 50) { const y = JB - v * ML; mk(s, 'line', { x1: JX, y1: y, x2: JX + 26, y2: y, stroke: C.ink, 'stroke-width': 2.5 }); if (v) txt(s, JX - 12, y + 6, v, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const zLink = mk(s, 'path', { d: '', fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 6' });
const ghostL = [0, 1, 2].map(() => mk(s, 'line', { x1: ZX - 8, x2: ZX + 168, stroke: WATER2, 'stroke-width': 3 }));
$('#roG').innerHTML = `<span class="k">Reading #<span id="rN">1</span></span><span class="v" id="rV">0</span><span class="un">ml</span>
  <span class="k" style="color:${MC}">Mean</span><span class="v" id="rM" style="color:${MC}">250</span><span class="un">ml</span>
  <span class="k" style="color:${EC}">Error = reading - mean</span><span class="v" id="rE" style="color:${EC}">0</span><span class="un">ml</span>`;
const gx = i => 170 + i * 120, gY = v => 74 + 140 - (v - 245) * 14;     // 245..255
const g = $('#grS');
mk(g, 'path', { d: 'M110,60 V214 H730', fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
[246, 248, 250, 252, 254].forEach(v => { mk(g, 'line', { x1: 102, y1: gY(v), x2: 110, y2: gY(v), stroke: C.ink, 'stroke-width': 2 }); txt(g, 96, gY(v) + 6, v, { 'text-anchor': 'end' }); });
RD.forEach((_, i) => txt(g, gx(i), 240, '#' + (i + 1), { 'text-anchor': 'middle' }));
txt(g, 120, 60, 'ml', {});
const gMean = mk(g, 'line', { x1: 110, y1: gY(250), x2: 730, y2: gY(250), stroke: MC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const gMeanT = txt(g, 726, gY(250) + 26, 'mean 250', { 'text-anchor': 'end', fill: MC, 'font-weight': 600 });
const gBars = RD.map((v, i) => mk(g, 'line', { x1: gx(i), x2: gx(i), y1: gY(250), y2: gY(250), stroke: EC, 'stroke-width': 6, 'stroke-linecap': 'round' }));
const gBarT = RD.map((v, i) => txt(g, gx(i) + 18, (gY(v) + gY(250)) / 2 + 6, Math.abs(v - 250), { fill: EC, 'font-weight': 700, 'font-size': 20 }));
const gDots = RD.map((v, i) => mk(g, 'circle', { cx: gx(i), cy: gY(v), r: 10, fill: C.ink }));
// pours: each reading gets a pour window inside S2/S3
const tPour = [T0('S2') + 0.2, wt('S2', 'different') , wt('S2', 'mark'), wt('S2', 'Watch'), wt('S2', 'level')];
const tSlow = wt('S5', 'Slow'), tS6 = T0('S6');
const lvlAt = t => {   // the jug level: empties and refills to each reading
  let v = 0, idx = -1;
  tPour.forEach((tp, i) => { if (t >= tp - 0.35) idx = i; });
  if (t >= tSlow - 0.2 && t < tS6) idx = 0;
  if (idx < 0) return { v: 0, idx: -1 };
  const tp = t >= tSlow - 0.2 && t < tS6 ? tSlow - 0.2 : tPour[idx], dur = t >= tSlow - 0.2 && t < tS6 ? 1.6 : 0.5;
  v = RD[idx] * M.o3((t - tp + 0.35) / dur);
  return { v, idx };
};
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So every reading is a little off.' });

/* ---------- D: rules ---------- */
const AB = '\\bar{a}', DA = `\\textcolor{${EC}}{\\Delta a}`;
const STEPS = [[`\\textcolor{${MC}}{${AB}} = (a_1 + a_2 + \\dots + a_n)\\,/\\,n`, 'mean of the readings'],
  [`\\textcolor{${EC}}{\\Delta a_i} = a_i - \\textcolor{${MC}}{${AB}}`, 'error of each reading'],
  [`\\textcolor{${EC}}{\\Delta a_{\\text{mean}}} = \\textstyle\\sum |\\textcolor{${EC}}{\\Delta a_i}|\\,/\\,n = 10/5 = 2\\,\\text{ml}`, 'average of the sizes'],
  [`a = \\textcolor{${MC}}{250} \\pm \\textcolor{${EC}}{2}\\,\\text{ml}`, 'the result']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:118px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'mean'), wt('D3', 'absolute'), wt('D4', 'mean'), wt('D5', 'write')];
const d = $('#drS'), DBX = 120, DBW = 100, DBY = 380, DP = 60;
mk(d, 'line', { x1: 80, y1: DBY, x2: 720, y2: DBY, stroke: C.ink, 'stroke-width': 2.5 });
const dBars = RD.map((v, i) => { const h = Math.abs(v - 250) * DP; const r = mk(d, 'rect', { x: DBX + i * 115, y: DBY - h, width: DBW, height: h, rx: 6, fill: EC, opacity: 0.85 }); txt(d, DBX + i * 115 + DBW / 2, DBY - h - 12, Math.abs(v - 250), { 'text-anchor': 'middle', 'font-size': 24, fill: EC, 'font-weight': 700 }); txt(d, DBX + i * 115 + DBW / 2, DBY + 30, '#' + (i + 1), { 'text-anchor': 'middle' }); return r; });
const dLevel = mk(d, 'line', { x1: 80, y1: DBY - 2 * DP, x2: 720, y2: DBY - 2 * DP, stroke: EC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const dLevelT = txt(d, 400, DBY + 62, 'dashed line: mean size = 2 ml', { 'text-anchor': 'middle', fill: EC, 'font-weight': 700, 'font-size': 20 });
$('#dF').innerHTML = K(`248 \\le a \\le 252\\;\\text{ml}`);

/* ---------- R: relative + percentage ---------- */
$('#rf1').innerHTML = K(`\\textcolor{${RC}}{\\delta a} = \\dfrac{\\textcolor{${EC}}{\\Delta a_{\\text{mean}}}}{\\textcolor{${MC}}{${AB}}}`);
$('#rf2').innerHTML = K(`\\textcolor{${RC}}{\\delta a} = \\dfrac{\\textcolor{${EC}}{2}}{\\textcolor{${MC}}{250}} = \\textcolor{${RC}}{0.008}`);
$('#rf3').innerHTML = K(`\\textcolor{${RC}}{\\delta a} \\times 100\\% = \\textcolor{${RC}}{0.8\\%}`);
const rr = $('#rrS'), RBX = 60, RBW = 660;
mk(rr, 'rect', { x: RBX, y: 200, width: RBW, height: 80, rx: 8, fill: '#fff', stroke: MC, 'stroke-width': 3 });
const rFill = mk(rr, 'rect', { x: RBX + 3, y: 203, height: 74, fill: C.ac3 || '#EEF3FD' });
const rErr = mk(rr, 'rect', { x: RBX + RBW - 3, y: 203, height: 74, fill: EC });
const rT1 = txt(rr, RBX, 180, 'the whole glass: 250 ml', { 'font-size': 22, fill: MC, 'font-weight': 600 });
const rT2 = txt(rr, RBX + RBW, 320, 'error 2 ml = 0.8 % of it', { 'text-anchor': 'end', 'font-size': 22, fill: EC, 'font-weight': 600 });
const rPct = txt(rr, RBX + RBW / 2, 450, '0.8 %', { 'text-anchor': 'middle', 'font-size': 96, fill: RC, 'font-weight': 600 });
$('#stF').innerHTML = K(`\\textcolor{${RC}}{\\delta a} = \\dfrac{\\textcolor{${EC}}{\\Delta a_{\\text{mean}}}}{\\textcolor{${MC}}{\\bar{a}}}`);

/* ---------- K: glass vs syrup ---------- */
function partBar(svg, frac) {
  const X = 36, W = 712, Y = 230;
  mk(svg, 'rect', { x: X, y: Y, width: W, height: 90, rx: 10, fill: '#fff', stroke: MC, 'stroke-width': 3 });
  const f = mk(svg, 'rect', { x: X + 3, y: Y + 3, height: 84, fill: C.ac3 || '#EEF3FD' });
  const e = mk(svg, 'rect', { y: Y + 3, height: 84, fill: EC });
  const lb = txt(svg, X, Y + 130, `error = ${frac * 100 === 0.8 ? '0.8' : '20'} % of the value`, { 'font-size': 22, fill: EC, 'font-weight': 600 });
  return u => { const ew = (W - 6) * frac * u; attr(f, 'width', f1(W - 6)); attr(e, 'x', f1(X + 3 + (W - 6) - Math.max(ew, frac < 0.05 ? 6 * u : 0))); attr(e, 'width', f1(Math.max(ew, frac < 0.05 ? 6 * u : 0))); lb.style.opacity = u.toFixed(3); };
}
const kbB = partBar($('#kbS'), 0.008), kdB = partBar($('#kdS'), 0.2);
const th1 = PUC.think($('#th1'), { q: 'Same absolute error of 2 ml. Which measurement is better?', opts: ['The glass, 250 ml', 'The syrup, 10 ml'], right: 0, why: 'The glass: 0.8 % error. For the syrup, the same 2 ml is a fifth of the dose (20 %).' });

/* ---------- V: units ---------- */
$('#ux0').innerHTML = K(`\\textcolor{${EC}}{\\Delta a} = \\textcolor{${EC}}{2}\\,\\text{ml}`);
$('#ux1').innerHTML = K(`\\dfrac{\\text{ml}}{\\text{ml}} \\;\\Rightarrow\\; \\text{no unit}`);
$('#vf0').innerHTML = K(`\\dfrac{\\textcolor{${EC}}{2}\\,\\text{ml}}{\\textcolor{${MC}}{250}\\,\\text{ml}} = \\textcolor{${RC}}{0.008}`);
$('#vf1').innerHTML = K(`\\dfrac{\\textcolor{${EC}}{0.002}\\,\\text{L}}{\\textcolor{${MC}}{0.25}\\,\\text{L}} = \\textcolor{${RC}}{0.008}`);
$('#vf2').innerHTML = K(`\\textcolor{${RC}}{0.008} \\times 100\\% = \\textcolor{${RC}}{0.8\\%}`);
const th2 = PUC.think($('#th2'), { q: 'Write the glass in litres instead. Does the percentage error change?', opts: ['Yes', 'No'], right: 1, why: '0.002 L over 0.25 L is still 0.008. Relative error has no unit.' });

/* ---------- W: worked example ---------- */
const WR = [19.8, 20.2, 20.1, 19.7, 20.2];
const wsol = PUC.solution($('#wl'), [
  [K(`\\textcolor{${MC}}{\\bar{T}} = \\dfrac{100.0}{5} = \\textcolor{${MC}}{20.0\\,\\text{s}}`)],
  [K(`\\textcolor{${EC}}{\\Delta T_{\\text{mean}}} = \\dfrac{1.0}{5} = \\textcolor{${EC}}{0.2\\,\\text{s}}`), '0.2 + 0.2 + 0.1 + 0.3 + 0.2 = 1.0'],
  [K(`\\textcolor{${RC}}{\\delta T} = \\dfrac{0.2}{20.0} = \\textcolor{${RC}}{0.01}`)],
  [K(`T = \\textcolor{${MC}}{20.0} \\pm \\textcolor{${EC}}{0.2}\\,\\text{s} \\;\\;(\\textcolor{${RC}}{1\\%})`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 96 });
$('#wl .lbl').style.top = '30px';
const wr = $('#wrS'), wx = i => 150 + i * 120, wy = v => 120 + (20.4 - v) * 500;     // 19.6 .. 20.4 s
mk(wr, 'path', { d: `M90,100 V${wy(19.6)} H730`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 });
[19.6, 19.8, 20.0, 20.2, 20.4].forEach(v => { mk(wr, 'line', { x1: 82, y1: wy(v), x2: 90, y2: wy(v), stroke: C.ink, 'stroke-width': 2 }); txt(wr, 76, wy(v) + 6, v.toFixed(1), { 'text-anchor': 'end' }); });
WR.forEach((_, i) => txt(wr, wx(i), wy(19.6) + 32, '#' + (i + 1), { 'text-anchor': 'middle' }));
const wMean = mk(wr, 'line', { x1: 90, y1: wy(20), x2: 730, y2: wy(20), stroke: MC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const wBand = mk(wr, 'rect', { x: 90, y: wy(20.2), width: 640, height: wy(19.8) - wy(20.2), fill: EC, opacity: 0 });
const wBandT = txt(wr, 726, wy(20.2) - 10, '20.0 ± 0.2 s', { 'text-anchor': 'end', fill: EC, 'font-weight': 700, 'font-size': 22 });
const wBars = WR.map((v, i) => mk(wr, 'line', { x1: wx(i), x2: wx(i), y1: wy(20), y2: wy(v), stroke: EC, 'stroke-width': 6, 'stroke-linecap': 'round' }));
const wDots = WR.map((v, i) => mk(wr, 'circle', { cx: wx(i), cy: wy(v), r: 10, fill: C.ink }));
const tWd = [wt('W2', 'Nineteen'), wt('W2', 'twenty'), wt('W2', 'twenty', 1), wt('W2', 'nineteen', 1), wt('W2', 'twenty', 2)];
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Mean error = (-2 + 2 + 1 - 3 + 2) / 5 = 0', right: 'Use the sizes: (2 + 2 + 1 + 3 + 2) / 5 = 2 ml' });
const where = PUC.where($('#wa'), { on: [], type: 'Short numericals: from a set of readings, find the mean, mean absolute error or % error' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: 'Readings (cm): 4.02, 3.98, 4.05, 3.95, 4.00. The percentage error is:', qW: 800,
  opts: ['0 %', '0.35 %', '0.7 %', '1.25 %'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`\\textcolor{${MC}}{\\bar{a}} = 20.00 / 5 = 4.00`)], [K(`\\textstyle\\sum|\\Delta a_i| = 0.14`)], [K(`\\textcolor{${EC}}{\\Delta a_{\\text{mean}}} = 0.028`)], [K(`\\dfrac{0.028}{4.00} \\times 100 = \\textcolor{${C.ok}}{0.7\\%}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'mean'), wt('A2', 'sizes'), wt('A2', 'so'), T0('A3')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 236, w: 1200, h: 540, title: 'Recap · errors', y0: 92, dy: 112, txt: [0, 0, 0, 0],
  lines: [K(`\\textcolor{${MC}}{\\bar{a}} = \\dfrac{\\sum a_i}{n} \\qquad \\textcolor{${EC}}{\\Delta a_i} = a_i - \\textcolor{${MC}}{\\bar{a}}`),
    K(`\\textcolor{${EC}}{\\Delta a_{\\text{mean}}} = \\dfrac{\\sum |\\textcolor{${EC}}{\\Delta a_i}|}{n}`),
    K(`\\textcolor{${RC}}{\\delta a} = \\dfrac{\\textcolor{${EC}}{\\Delta a_{\\text{mean}}}}{\\textcolor{${MC}}{\\bar{a}}} \\qquad \\% = \\textcolor{${RC}}{\\delta a} \\times 100`),
    K(`\\text{Result: } a = \\textcolor{${MC}}{\\bar{a}} \\pm \\textcolor{${EC}}{\\Delta a_{\\text{mean}}} \\qquad \\textcolor{${RC}}{\\delta a}\\text{ has no unit}`)] });
const YQ = ['Why do we use the mean of many readings as the true value?', 'Why is the average of the errors, with their signs, always zero?', 'Same absolute error on a big and a small value: which has the bigger % error?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 16', topic: 'The error in a table\'s area? Error Propagation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSlow - 0.1, 1.1, 552, 560], [tS6 + 0.2, 1, 960, 540]]);

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
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hTrue, t, wt('H2', 'no') - 0.1, 1e9, POP); M.vis(hTL, t, wt('H2', 'no'), 1e9, { dy: 8 });
    hShots.forEach((c, i) => M.vis(c, t, wt('H2', 'Why') + i * 0.25, 1e9, { ...POP, sc: 0.3 }));
    M.vis($('#hjP'), t, wt('H2', 'perfect') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    RD.forEach((_, i) => M.vis($('#rd' + i), t, tRd[i] - 0.1, 1e9, { dx: 24, dy: 0 }));
    M.vis($('#hQ'), t, wt('H5', 'which') - 0.1, 1e9, { dy: 16 });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pDef'), t, wt('P1', 'error', 1) - 0.1, { st: 0.05, sp: M.HEAVY });
    M.vis($('#pq2'), t, wt('P2', 'best') - 0.1, 1e9, POP);
    M.vis($('#pm'), t, T0('P2') + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#exP'), t, T0('P2') + 0.6, 1e9, { dy: 8 });
    RD.forEach((_, i) => M.vis($('#tb' + i), t, T0('P2') + 0.5 + i * 0.1, 1e9, { dy: 14 }));
    M.vis($('#pMean'), t, wt('P3', 'Divide') - 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const { v, idx } = lvlAt(t), slow = t >= tSlow - 0.2 && t < tS6;
    const y = JB - v * ML; attr(watL, 'y', f1(y)); attr(watL, 'height', f1(Math.max(0, JB - y - 2))); attr(watS, 'y1', f1(y)); attr(watS, 'y2', f1(y)); M.hide(watS, v < 1);
    const zy = Math.max(ZY - 20, Math.min(ZY + ZH + 20, zY(v))); attr(zW, 'y', f1(zy)); attr(zW, 'height', f1(Math.max(0, ZY + ZH + 20 - zy)));
    attr(zLink, 'd', v > 200 ? `M${JX + JW + 64},${f1(y)} L${ZX - 10},${f1(zy)}` : '');
    // ghosts: earlier pour levels in the zoom (3 fading)
    ghostL.forEach((gl, k) => { const j = idx - 1 - k; const on = j >= 0 && !slow; M.hide(gl, !on); if (on) { attr(gl, 'y1', f1(zY(RD[j]))); attr(gl, 'y2', f1(zY(RD[j]))); gl.style.opacity = [0.5, 0.3, 0.18][k]; } });
    M.draw(zMean, t, wt('S3', 'dashed') - 0.1, 0.5);
    M.vis($('#smo'), t, tSlow - 0.2, tS6 - 0.1, { ...POP, outDur: 0.25, ody: 0 });
    M.setT($('#rN'), String(Math.max(1, idx + 1))); M.setT($('#rV'), String(Math.round(v)));
    const full = idx >= 0 && v > RD[idx] - 0.5; M.setT($('#rE'), full ? ((RD[idx] - 250 > 0 ? '+' : '') + (RD[idx] - 250)) : '...');
    M.draw(gMean, t, wt('S3', 'dashed') - 0.1, 0.5); M.vis(gMeanT, t, wt('S3', 'mean'), 1e9, { dy: 8 });
    RD.forEach((r, i) => {
      M.vis(gDots[i], t, i === 0 ? wt('S3', 'dot') - 0.1 : tPour[i] + 0.2, 1e9, { ...POP, sc: 0.3 });
      const tb = i === 0 ? (t < tS6 ? wt('S5', 'minus') : -1) : wt('S6', 'gaps') + (i - 1) * 0.35;
      let u = tb < 0 ? 1 : M.io((t - tb) / (slow && i === 0 ? 1.2 : 0.4));
      if (i === 0 && t < wt('S4', 'gap')) u = 0; else if (i === 0 && t < wt('S5', 'minus')) u = M.io((t - wt('S4', 'gap')) / 0.4);
      attr(gBars[i], 'y2', f1(gY(250) + (gY(r) - gY(250)) * u)); M.hide(gBars[i], u <= 0.01); gBarT[i].style.opacity = M.clamp((u - 0.7) / 0.3).toFixed(3);
    });
    avD(t, wt('S6', 'below') + 0.4, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tR1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('R1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    dBars.forEach((b, i) => M.vis(b, t, tD1 + 0.6 + i * 0.1, 1e9, { dy: 30 }));
    M.draw(dLevel, t, wt('D4', 'ten') - 0.1, 0.6); M.vis(dLevelT, t, wt('D4', 'Two') - 0.1, 1e9, { dy: 8 });
    M.vis($('#dF'), t, T0('D6') - 0.05, 1e9, { dy: 20 });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rl'), t, tR1 + 0.05, 1e9, { dx: -60, dy: 0 });
    PUC.write($('#rf1'), t, wt('R2', 'Relative'), 0.9); PUC.write($('#rf2'), t, T0('R3') + 0.1, 0.9); PUC.write($('#rf3'), t, T0('R4') + 0.1, 0.9);
    M.vis($('#rr'), t, tR1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const u = M.io((t - wt('R2', 'compare')) / 0.6); attr(rFill, 'width', f1((RBW - 6) * u)); M.vis(rT1, t, wt('R2', 'compare'), 1e9, { dy: 8 });
    const e = M.io((t - wt('R2', 'divided')) / 0.4) * 6; attr(rErr, 'x', f1(RBX + RBW - 3 - e)); attr(rErr, 'width', f1(e)); M.vis(rT2, t, wt('R2', 'divided') + 0.2, 1e9, { dy: 8 });
    M.vis(rPct, t, wt('R4', 'percentage') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Relative') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'compared') - 0.2, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tV1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#kb'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#exK'), t, tK1 + 0.4, 1e9, { dy: 8 });
    M.vis($('#kbV'), t, wt('K1', 'two') - 0.1, 1e9, { dy: 14 });
    kbB(M.io((t - wt('K1', 'error')) / 0.6)); M.vis($('#kbC'), t, wt('K1', 'That') - 0.1, 1e9, POP);
    M.vis($('#kd'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kdV'), t, wt('K2', 'ten') - 0.1, 1e9, { dy: 14 });
    kdB(M.io((t - wt('K2', 'same')) / 0.6)); M.vis($('#kdC'), t, wt('K2', 'That') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('V1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Which') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Its') });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tW1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('V4');
    M.vis($('#vl'), t, tV1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#uc0'), t, T0('V2') - 0.05, 1e9, { dy: 16 }); PUC.write($('#ux0'), t, wt('V2', 'Two') - 0.1, 0.6);
    M.vis($('#uc1'), t, T0('V3') - 0.05, 1e9, { dy: 16 }); PUC.write($('#ux1'), t, wt('V3', 'divided') - 0.1, 0.8);
    M.vis($('#vP'), t, wt('V3', 'pure') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tV4 + 0.05, wt('V5', 'Two') + 0.2, { dy: 36, ...o });
    th2(t, { tin: tV4, tOpts: wt('V4', 'Does') - 0.1, tCount: T1('V4') + 0.05, dur: 3, tAns: T0('V5') - 0.02, tWhy: wt('V5', 'Two') });
    const tBack = wt('V5', 'Two') + 0.2;     // the think card leaves once the answer and reason are shown; the litres working completes the reasoning
    M.vis($('#vr'), t, T0('V2') + 0.2, out, { dx: 60, dy: 0, ...o });
    if (t > tBack - 0.05) { M.vis($('#vl'), t, tBack + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#vr'), t, tBack + 0.2, 1e9, { dx: 60, dy: 0 }); }
    PUC.write($('#vf0'), t, wt('V3', 'divided') - 0.1, 0.8);
    M.vis($('#vfL'), t, tBack + 0.3, 1e9, { dy: 8 }); PUC.write($('#vf1'), t, wt('V5', 'quarter') - 0.2, 0.9); PUC.write($('#vf2'), t, wt('V5', 'Still') - 0.1, 0.8);
    M.vis($('#vrP'), t, wt('V5', 'Still', 1) - 0.1, 1e9, POP);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, tW1 + 0.2, out, { dx: 60, dy: 0, ...o });
    WR.forEach((v, i) => { M.vis(wDots[i], t, tWd[i] - 0.05, 1e9, { ...POP, sc: 0.3 }); const u = M.io((t - wt('W4', 'sizes') - i * 0.3) / 0.4); attr(wBars[i], 'y2', f1(wy(20) + (wy(v) - wy(20)) * u)); M.hide(wBars[i], u < 0.01); });
    M.draw(wMean, t, tW[0] + 0.5, 0.6);
    wBand.style.opacity = (0.16 * M.io((t - T0('W6') - 0.2) / 0.4)).toFixed(3); M.vis(wBandT, t, T0('W6') + 0.3, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'average') - 0.1, tStrike: wt('X3', 'zero') - 0.1, tRight: wt('X3', 'Drop') });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'short') });
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
