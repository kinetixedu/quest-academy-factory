// PUC Electronics Ep 9 - Series and parallel circuits ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const sci = (x, d = 2) => { if (x <= 0) return '0'; const e = Math.floor(Math.log10(x) + 1e-9), m = x / Math.pow(10, e); return `${m.toFixed(d)} × 10<sup>${e}</sup>`; };
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const Iv = c(VI, 'I'), Vv = c(TE, 'V'), Qv = c(OR, 'Q'), ev = c(OR, 'e'), nv = c(AM, 'n');

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
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
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });

const OM = '\\Omega', R1 = 'R_1', R2 = 'R_2', I1 = c(VI, 'I_1'), I2 = c(VI, 'I_2'), V1 = c(TE, 'V_1'), V2 = c(TE, 'V_2');
const zigH = (x1, x2, y, a = 16, n = 4) => { let d = `M${x1},${y}`; const s = (x2 - x1) / (n * 2); for (let i = 0; i < n * 2; i++) d += ` L${(x1 + s * (i + 0.5)).toFixed(1)},${y + (i % 2 ? a : -a)}`; return d + ` L${x2},${y}`; };
const zigV = (x, y1, y2, a = 16, n = 4) => { let d = `M${x},${y1}`; const s = (y2 - y1) / (n * 2); for (let i = 0; i < n * 2; i++) d += ` L${x + (i % 2 ? a : -a)},${(y1 + s * (i + 0.5)).toFixed(1)}`; return d + ` L${x},${y2}`; };
const cellV = (p, x, y) => [W(p, `M${x - 35},${y} H${x + 35}`, { 'stroke-width': 5 }), W(p, `M${x - 18},${y + 36} H${x + 18}`, { 'stroke-width': 9 })];
const xMark = (p, x, y) => [W(p, `M${x - 22},${y - 22} L${x + 22},${y + 22}`, { stroke: C.red, 'stroke-width': 6 }), W(p, `M${x + 22},${y - 22} L${x - 22},${y + 22}`, { stroke: C.red, 'stroke-width': 6 })];
/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'tiny') - 0.2;
const tS = T0('S1'), tB = T0('B1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const str = W(h1S, 'M10,60 C120,90 240,90 360,62 S600,40 710,62', { 'stroke-width': 3 });
const B1x = [60, 155, 250, 345, 440, 535, 630];
const bulb1 = B1x.map(x => { const y = 60 + 18 * Math.sin((x - 10) / 700 * Math.PI) + 4; W(h1S, `M${x},${y} V${y + 26}`, { 'stroke-width': 3 }); return mk(h1S, 'circle', { cx: x, cy: y + 46, r: 20, fill: AM, stroke: INK, 'stroke-width': 3 }); });
const bulb1Y = B1x.map(x => 60 + 18 * Math.sin((x - 10) / 700 * Math.PI) + 4 + 46);
const fx1 = xMark(h1S, B1x[2], bulb1Y[2]);
const rails = [W(h2S, 'M10,30 H580', { 'stroke-width': 3 }), W(h2S, 'M10,180 H580', { 'stroke-width': 3 })];
const B2x = [100, 250, 400, 550];
const bulb2 = B2x.map(x => { W(h2S, `M${x},30 V83 M${x},127 V180`, { 'stroke-width': 3 }); return mk(h2S, 'circle', { cx: x, cy: 105, r: 22, fill: AM, stroke: INK, 'stroke-width': 3 }); });
const fx2 = xMark(h2S, B2x[1], 105);
const tF1 = wt('H1', 'fails'), tDark = wt('H1', 'dark'), tF2 = wt('H2', 'fails');

/* ================= S: series vs parallel ================= */
const sLS = $('#sLS'), sRS = $('#sRS');
const sW1 = [W(sLS, 'M120,240 V130 H260'), W(sLS, 'M380,130 H440'), W(sLS, 'M560,130 H660 V380 H120 V276')];
const sR1 = [W(sLS, zigH(260, 380, 130)), W(sLS, zigH(440, 560, 130))], sC1 = cellV(sLS, 120, 240);
const sL1 = [tx(sLS, 320, 96, 'R₁', { 'text-anchor': 'middle', 'font-style': 'italic' }), tx(sLS, 500, 96, 'R₂', { 'text-anchor': 'middle', 'font-style': 'italic' }), mono(sLS, 390, 430, 'one path through both', { 'text-anchor': 'middle', 'font-weight': 600 })];
const sE1 = flow(sLS, [[120, 276], [120, 380], [660, 380], [660, 130], [120, 130], [120, 240]], 20, { skip: (x, y) => Math.abs(y - 130) < 2 && ((x > 256 && x < 384) || (x > 436 && x < 564)) });
const sW2 = [W(sRS, 'M120,240 V130 H600'), W(sRS, 'M120,276 V400 H600'), W(sRS, 'M400,130 V200 M400,330 V400'), W(sRS, 'M600,130 V200 M600,330 V400')];
const sR2 = [W(sRS, zigV(400, 200, 330)), W(sRS, zigV(600, 200, 330))], sC2 = cellV(sRS, 120, 240);
const sJ = [[400, 130], [400, 400]].map(([x, y]) => mk(sRS, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const sL2 = [tx(sRS, 430, 274, 'R₁', { 'font-style': 'italic' }), tx(sRS, 630, 274, 'R₂', { 'font-style': 'italic' }), mono(sRS, 390, 450, 'each part has its own path', { 'text-anchor': 'middle', 'font-weight': 600 })];
const sF = [flow(sRS, [[120, 276], [120, 400], [400, 400]], 9), flow(sRS, [[400, 400], [400, 130]], 6, { skip: (x, y) => y > 196 && y < 334 }), flow(sRS, [[400, 400], [600, 400], [600, 130], [400, 130]], 14, { skip: (x, y) => Math.abs(x - 600) < 2 && y > 196 && y < 334 }), flow(sRS, [[400, 130], [120, 130], [120, 240]], 9)];

/* ================= B: breadboard ================= */
const ck = $('#ckS'), gs = mk(ck, 'g'), gpar = mk(ck, 'g');
const bwS = [W(gs, 'M160,282 V150 H330'), W(gs, 'M450,150 H760 V250'), W(gs, 'M760,350 V450 H160 V318')];
const rS1 = W(gs, zigH(330, 450, 150)), rS2 = W(gs, zigV(760, 250, 350)), cS1 = cellV(gs, 160, 282);
const lbS = [tx(gs, 116, 290, '+', { 'font-size': 28 }), mono(gs, 196, 306, '12 V'), mono(gs, 390, 112, '4 Ω', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(gs, 796, 296, '12 Ω', { 'font-weight': 600 })];
const vS = [tx(gs, 390, 214, 'V₁ = 3 V', { 'text-anchor': 'middle', fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 24 }), tx(gs, 796, 332, 'V₂ = 9 V', { fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 24 })];
const xS = xMark(gs, 760, 300);
const eS = flow(gs, [[160, 318], [160, 450], [760, 450], [760, 150], [160, 150], [160, 282]], 32, { skip: (x, y) => (Math.abs(y - 150) < 2 && x > 326 && x < 454) || (Math.abs(x - 760) < 2 && y > 246 && y < 354) });
const bwP = [W(gpar, 'M160,282 V150 H720'), W(gpar, 'M160,318 V450 H720'), W(gpar, 'M480,150 V250 M480,350 V450'), W(gpar, 'M720,150 V250 M720,350 V450')];
const rP1 = W(gpar, zigV(480, 250, 350)), rP2 = W(gpar, zigV(720, 250, 350)), cP = cellV(gpar, 160, 282);
const jP = [[480, 150], [480, 450]].map(([x, y]) => mk(gpar, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const lbP = [tx(gpar, 116, 290, '+', { 'font-size': 28 }), mono(gpar, 196, 306, '12 V'), mono(gpar, 512, 296, '4 Ω', { 'font-weight': 600 }), mono(gpar, 752, 296, '12 Ω', { 'font-weight': 600 })];
const iP = [tx(gpar, 512, 334, '3 A', { fill: VI, 'font-family': 'IBM Plex Mono', 'font-size': 24 }), tx(gpar, 752, 334, '1 A', { fill: VI, 'font-family': 'IBM Plex Mono', 'font-size': 24 }), tx(gpar, 300, 494, '4 A total', { 'text-anchor': 'middle', fill: VI, 'font-family': 'IBM Plex Mono', 'font-size': 24 })];
const xP = xMark(gpar, 480, 300);
const nd = L => Math.max(4, Math.round(L / 42));
const fP = [flow(gpar, [[160, 318], [160, 450], [480, 450]], nd(452)), flow(gpar, [[480, 450], [480, 150]], nd(300), { skip: (x, y) => y > 246 && y < 354 }),
  flow(gpar, [[480, 450], [720, 450], [720, 150], [480, 150]], nd(780), { skip: (x, y) => Math.abs(x - 720) < 2 && y > 246 && y < 354 }), flow(gpar, [[480, 150], [160, 150], [160, 282]], nd(452))];
const tSer = wt('B2', 'series'), tBrk1 = wt('B4', 'break'), tPar = wt('B5', 'rebuild'), tBrk2 = wt('B7', 'Break');
const KP = 40;
const Itot = τ => τ < tSer ? 0 : τ < tBrk1 ? 0.75 : τ < tPar + 0.6 ? 0 : τ < tBrk2 ? 4 : 1;
const I1f = τ => τ < tPar ? (τ >= tSer && τ < tBrk1 ? 0.75 : 0) : τ < tPar + 0.6 ? 0 : τ < tBrk2 ? 3 : 0;
const I2f = τ => τ < tPar ? (τ >= tSer && τ < tBrk1 ? 0.75 : 0) : τ < tPar + 0.6 ? 0 : 1;
const integ = (f, a, t) => { if (t <= a) return 0; let s = 0; const h = 1 / 30; for (let u = a; u < t; u += h) s += f(Math.min(u + h / 2, t)) * Math.min(h, t - u); return s; };
const SC = scope($('#scS'), 592, 200), trI = SC.tr(VI), sLab = SC.lab(14, 26, 'I · TOTAL CURRENT', '#B9A6F2');
const sZero = mk($('#scS'), 'line', { x1: 0, y1: 180, x2: 592, y2: 180, stroke: '#5A6788', 'stroke-width': 2 });
$('#ro1').innerHTML = `<span class="k" style="color:${VI}">I</span><span class="v" id="rT" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>1</sub></span><span class="v" id="r1" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>2</sub></span><span class="v" id="r2" style="color:${VI}">0.00</span><span class="u">A</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So that is how my home is wired!' });

/* ================= D: derivations ================= */
const dLS = $('#dLS'), dRS = $('#dRS');
const dW1 = [W(dLS, 'M60,160 H160'), W(dLS, zigH(160, 300, 160)), W(dLS, 'M300,160 H420'), W(dLS, zigH(420, 560, 160)), W(dLS, 'M560,160 H720')];
const dB1 = [W(dLS, 'M160,118 V102 H300 V118', { stroke: TE, 'stroke-width': 3 }), W(dLS, 'M420,118 V102 H560 V118', { stroke: TE, 'stroke-width': 3 }), W(dLS, 'M160,212 V228 H560 V212', { stroke: TE, 'stroke-width': 3 })];
const dB1L = [tx(dLS, 230, 92, 'V₁', { 'text-anchor': 'middle', fill: TE, 'font-style': 'italic' }), tx(dLS, 490, 92, 'V₂', { 'text-anchor': 'middle', fill: TE, 'font-style': 'italic' }), tx(dLS, 360, 258, 'V', { 'text-anchor': 'middle', fill: TE, 'font-style': 'italic' })];
const dIa = PUC.arrow(dLS, VI), dIL = tx(dLS, 104, 140, 'I', { fill: VI, 'font-style': 'italic' });
const dLR = rows($('#dLSteps'), [[K(`${Vv} = ${V1} + ${V2}`), 'the voltage is shared', 286], [K(`${Vv} = ${Iv}${R1} + ${Iv}${R2}`), 'same current I in both', 376], [K(`R = ${R1} + ${R2}`), 'resistances add', 478]]);
const tDL = [wt('D2', 'V'), wt('D3', 'So'), wt('D4', 'Divide')];
const dW2 = [W(dRS, 'M80,80 H600'), W(dRS, 'M80,220 H600'), W(dRS, 'M300,80 V100 M300,200 V220'), W(dRS, 'M520,80 V100 M520,200 V220'), W(dRS, zigV(300, 100, 200, 14, 3)), W(dRS, zigV(520, 100, 200, 14, 3))];
const dB2 = W(dRS, 'M64,80 H52 V220 H64', { stroke: TE, 'stroke-width': 3 }), dB2L = tx(dRS, 26, 158, 'V', { fill: TE, 'font-style': 'italic' });
const dI2 = [tx(dRS, 326, 158, 'I₁', { fill: VI, 'font-style': 'italic' }), tx(dRS, 546, 158, 'I₂', { fill: VI, 'font-style': 'italic' }), tx(dRS, 620, 230, 'I', { fill: VI, 'font-style': 'italic' })];
const dRR = rows($('#dRSteps'), [[K(`${Iv} = ${I1} + ${I2}`), 'the current is shared', 252], [K(`\\dfrac{${Vv}}{R} = \\dfrac{${Vv}}{${R1}} + \\dfrac{${Vv}}{${R2}}`), 'each current is V over R', 318], [K(`\\dfrac{1}{R} = \\dfrac{1}{${R1}} + \\dfrac{1}{${R2}}`), 'smaller than the smallest', 428]]);
const tDR = [wt('D6', 'I'), wt('D7', 'So'), wt('D8', 'Divide')];

/* ================= W: worked example ================= */
const wLS = $('#wLS'), wRS = $('#wRS');
const wW1 = [W(wLS, 'M60,120 H180'), W(wLS, zigH(180, 300, 120)), W(wLS, 'M300,120 H420'), W(wLS, zigH(420, 540, 120)), W(wLS, 'M540,120 H720')];
const wL1 = [mono(wLS, 240, 176, '6 Ω', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(wLS, 480, 176, '3 Ω', { 'text-anchor': 'middle', 'font-weight': 600 })];
const wLR = rows($('#wLSteps'), [[K(`R = 6 + 3 = 9\\,${OM}`), '', 220], [K(`${Iv} = \\dfrac{18}{9} = 2\\,\\text{A}`), 'same in both', 304], [K(`${V1} = 12\\,\\text{V},\\ \\ ${V2} = 6\\,\\text{V}`), '12 + 6 = 18', 414]]);
const tWL = [wt('W2', 'R'), wt('W2', 'current'), wt('W2', 'two') + 0.6];
const wW2 = [W(wRS, 'M80,70 H600'), W(wRS, 'M80,170 H600'), W(wRS, 'M300,70 V84 M300,156 V170'), W(wRS, 'M520,70 V84 M520,156 V170'), W(wRS, zigV(300, 84, 156, 12, 3)), W(wRS, zigV(520, 84, 156, 12, 3))];
const wL2 = [mono(wRS, 326, 128, '6 Ω', { 'font-weight': 600 }), mono(wRS, 546, 128, '3 Ω', { 'font-weight': 600 })];
const wRR = rows($('#wRSteps'), [[K(`\\dfrac{1}{R} = \\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{2}`), '', 206], [K(`R = 2\\,${OM}`), 'smaller than 3 Ω', 318], [K(`${Iv} = \\dfrac{18}{2} = 9\\,\\text{A}`), '3 A + 6 A', 404]]);
const tWR = [wt('W3', 'one'), wt('W3', 'So'), wt('W4', 'supply')];
$('#uZ').innerHTML = M.icon('home', 30, AM, 2.4);

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: '1/R = 1/2, so R = 1/2 Ω', right: 'Flip it at the end: R = 2 Ω', y0: 96, y1: 184 });
$('#tcB').innerHTML = `<div id="tf1" style="position:absolute;left:48px;top:96px;font-size:44px">${K('\\dfrac{1}{R} = \\dfrac{1}{2}')}</div>
  <div id="tfA" style="position:absolute;left:300px;top:126px">${M.icon('arrowR', 56, AM, 2.6)}</div>
  <div id="tf2" style="position:absolute;left:400px;top:108px;font-size:52px">${K(`R = 2\\,${OM}`)}</div>
  <div id="tf3" style="position:absolute;left:48px;top:232px;font:500 24px Poppins;color:${MU};white-space:nowrap">Check: 2 Ω is smaller than both 6 Ω and 3 Ω</div>`;
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Problems on combinations of resistors; differences between series and parallel' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Three 6&nbsp;Ω resistors: two in parallel, and this pair in series with the third, across a 9&nbsp;V cell. What current flows through one of the parallel resistors?', qW: 780,
  opts: [K('0.5\\,\\text{A}'), K('1\\,\\text{A}'), K('1.5\\,\\text{A}'), K('0.75\\,\\text{A}')], right: 0, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`R_p = \\dfrac{6}{2} = 3\\,${OM}`)], [K(`R = 3 + 6 = 9\\,${OM}`)], [K(`${Iv} = \\dfrac{9}{9} = 1\\,\\text{A}`)], [K(`\\text{each} = 0.5\\,\\text{A}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'parallel'), wt('A2', 'Add'), wt('A3', 'current'), wt('A4', 'splits')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 96, dy: 78, title: 'Series and parallel · formula card', txt: [0, 1, 0, 1, 1],
  lines: [K(`\\text{Series: } R = ${R1} + ${R2}`), 'Series: same current, the voltage is shared', K(`\\text{Parallel: } 1/R = 1/${R1} + 1/${R2}`), 'Parallel: same voltage, the current is shared', 'Two equal resistors in parallel: <i>R</i>/2. Always flip 1/<i>R</i>!'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 10', topic: "Kirchhoff's current and voltage laws", y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B4', 'Now'), 1.1, 640, 560], [T0('B5'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tB + 0.5, tT - 0.4]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tS + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tS - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o }); M.draw(str, t, tMorph + 0.6, 0.6);
    const dk = M.io((t - tDark) / 0.25);
    bulb1.forEach((b, i) => { M.vis(b, t, tMorph + 0.8 + i * 0.06, 1e9, { dy: 0, fade: 0.15 }); PUC.attr(b, 'fill', i === 2 ? M.mix(AM, '#FFFFFF', M.io((t - tF1) / 0.2)) : M.mix(AM, '#E6E8EE', dk)); });
    drawSeq(fx1, t, tF1, 0.2, 0.1); M.vis($('#h1D'), t, tDark, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#h2C'), t, T0('H2') - 0.1, out, { dx: 60, dy: 0, ...o }); drawSeq(rails, t, T0('H2') + 0.1, 0.4, 0.1);
    bulb2.forEach((b, i) => { M.vis(b, t, T0('H2') + 0.3 + i * 0.06, 1e9, { dy: 0, fade: 0.15 }); PUC.attr(b, 'fill', i === 1 ? M.mix(AM, '#FFFFFF', M.io((t - tF2) / 0.2)) : AM); });
    drawSeq(fx2, t, tF2, 0.2, 0.1); M.vis($('#h2D'), t, wt('H2', 'stays'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#h2Q'), t, wt('H2', 'Why') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* S: series vs parallel */
  const sOn = t >= tS - 0.05 && t < tB + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = tB - 0.32, ts = wt('S1', 'Series') - 0.2, tp = wt('S1', 'parallel') - 0.2;
    M.vis($('#sL'), t, ts, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, tp, out, { dx: 60, dy: 0, ...o });
    drawSeq([...sW1, ...sR1], t, ts + 0.3, 0.35, 0.1); drawSeq(sC1, t, ts + 0.4, 0.2, 0.1); fadeAt(sL1.slice(0, 2), t, ts + 0.8);
    sE1.set(70 * Math.max(0, t - T0('S2')), t >= T0('S2') - 0.2); M.vis(sL1[2], t, wt('S2', 'single'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#sLStrip'), t, wt('S2', 'beads') - 0.1, 1e9, { dy: 24 });
    drawSeq([...sW2, ...sR2], t, tp + 0.3, 0.35, 0.1); drawSeq(sC2, t, tp + 0.4, 0.2, 0.1); fadeAt([...sJ, ...sL2.slice(0, 2)], t, tp + 0.8);
    const tq = T0('S3'), sp = Math.max(0, t - tq); [100, 70, 30, 100].forEach((v, k) => sF[k].set(v * sp, t >= tq - 0.2)); M.vis(sL2[2], t, wt('S3', 'own'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#sRStrip'), t, wt('S3', 'lanes') - 0.1, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    const sw = tPar - 0.3;
    M.vis($('#ckL1'), t, tB + 0.3, sw, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, sw + 0.3, 1e9, { dy: 10 });
    // series
    M.vis(gs, t, tB + 0.2, sw, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    drawSeq(bwS, t, tB + 0.5, 0.45, 0.15); M.draw(rS1, t, wt('B1', 'four') - 0.2, 0.35); M.draw(rS2, t, wt('B1', 'twelve', 1) - 0.2, 0.35); drawSeq(cS1, t, tB + 0.6, 0.2, 0.1);
    fadeAt(lbS, t, tB + 0.9, 0.1); fadeAt(vS, t, wt('B3', 'Three') - 0.1, wt('B3', 'nine') - wt('B3', 'Three'));
    drawSeq(xS, t, tBrk1 + 0.1, 0.2, 0.1);
    eS.set(KP * integ(I1f, tSer, Math.min(t, tPar)), t >= tSer && t < sw + 0.3);
    PUC.attr(rS2, 'stroke', M.mix(INK, '#CBD0DA', M.io((t - tBrk1) / 0.3)));
    // parallel
    M.vis(gpar, t, sw + 0.15, 1e9, { dy: 0, fade: 0.3 });
    drawSeq([...bwP, rP1, rP2, ...cP], t, sw + 0.2, 0.35, 0.06); fadeAt([...jP, ...lbP], t, sw + 0.6, 0.06);
    fadeAt(iP, t, wt('B6', 'Three') - 0.1, 0.9);
    drawSeq(xP, t, tBrk2 + 0.1, 0.2, 0.1); PUC.attr(rP1, 'stroke', M.mix(INK, '#CBD0DA', M.io((t - tBrk2) / 0.3)));
    const pOn2 = t >= tPar + 0.6;
    fP[0].set(KP * integ(Itot, tPar, t), pOn2); fP[1].set(KP * integ(I1f, tPar, t), pOn2 && t < tBrk2 + 0.2); fP[2].set(KP * integ(I2f, tPar, t), pOn2); fP[3].set(KP * integ(Itot, tPar, t), pOn2);
    M.setT(iP[2], t >= tBrk2 ? '1 A total' : '4 A total'); M.setT(iP[0], t >= tBrk2 ? '0 A' : '3 A');
    M.vis($('#ckE'), t, tSer, 1e9, { dy: 0, fade: 0.2 });
    trI(τ => 30 * Itot(τ), t, tB + 0.6, 8, 180, t >= tB + 0.6); M.vis(sLab, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(sZero, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rT'), Itot(t).toFixed(2)); M.setT($('#r1'), I1f(t).toFixed(2)); M.setT($('#r2'), I2f(t).toFixed(2));
    avB(t, wt('B7', 'never') + 0.2, tT - 0.4);
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Parallel') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: derivations */
  const dOn = t >= tD - 0.05 && t < tW + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dW1, t, tD + 0.4, 0.3, 0.1); drawSeq(dB1, t, wt('D2', 'shared'), 0.3, 0.15); fadeAt(dB1L, t, wt('D2', 'shared') + 0.1, 0.15);
    const ia = M.io((t - wt('D3', 'current') + 0.1) / 0.4); dIa.set(70, 128, 70 + 80 * ia, 128); dIL.style.opacity = ia;
    runRows(dLR, t, tDL); M.vis($('#dLBox'), t, tDL[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    drawSeq(dW2, t, tD + 0.7, 0.3, 0.08); M.draw(dB2, t, wt('D5', 'same') - 0.1, 0.3); M.vis(dB2L, t, wt('D5', 'same'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt(dI2, t, wt('D6', 'currents') - 0.1, 0.2);
    runRows(dRR, t, tDR); M.vis($('#dRBox'), t, tDR[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(wW1, t, wt('W1', 'six') - 0.1, 0.25, 0.08); fadeAt(wL1, t, wt('W1', 'three'), 0.1);
    drawSeq(wW2, t, wt('W1', 'eighteen') - 0.2, 0.25, 0.08); fadeAt(wL2, t, wt('W1', 'supply'), 0.1);
    runRows(wLR, t, tWL); runRows(wRR, t, tWR);
    M.vis($('#uStrip'), t, T0('U1') - 0.1, out, { dy: 30, ...o });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'One') - 0.2 });
    PUC.write($('#tf1'), t, wt('X2', 'one') - 0.1, 0.5); M.vis($('#tfA'), t, wt('X3', 'flip'), 1e9, { dx: -20, dy: 0 }); PUC.write($('#tf2'), t, wt('X3', 'two') - 0.2, 0.5);
    M.vis($('#tf3'), t, T1('X3') - 0.3, 1e9, { dy: 10 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'problems') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
