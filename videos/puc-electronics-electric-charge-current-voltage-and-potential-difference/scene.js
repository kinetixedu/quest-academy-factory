// PUC Electronics Ep 6 - Electric charge, current, voltage and potential difference ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink (W energy ink)
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'reads') - 0.2;
const tC = T0('C1'), tI = T0('I1'), tP = T0('P1'), tB = T0('B1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const chS = $('#chS');
const chP = [W(chS, 'M118,62 V18 M182,62 V18', { 'stroke-width': 10 }), W(chS, 'M92,62 H208 A22,22 0 0 1 230,84 V278 A22,22 0 0 1 208,300 H92 A22,22 0 0 1 70,278 V84 A22,22 0 0 1 92,62 Z', { 'stroke-width': 5, fill: '#fff' }),
  W(chS, 'M150,300 V330 C150,370 210,360 210,400', { 'stroke-width': 6 })];
const plate = mk(chS, 'rect', { x: 88, y: 140, width: 124, height: 116, rx: 10, fill: C.soft });
const plT = [mono(chS, 150, 168, 'OUTPUT', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 }),
  tx(chS, 150, 206, '5 V', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30, fill: TE }),
  tx(chS, 150, 242, '2 A', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 30, fill: VI })];
const hl = [mk(chS, 'rect', { x: 100, y: 180, width: 100, height: 34, rx: 8, fill: 'none', stroke: TE, 'stroke-width': 3 }), mk(chS, 'rect', { x: 100, y: 216, width: 100, height: 34, rx: 8, fill: 'none', stroke: VI, 'stroke-width': 3 })];
const tFive = wt('H1', 'Five'), tTwo = wt('H1', 'Two');

/* ================= C: charge ================= */
const cS = $('#cS');
const part = (type, r = 32) => { const g = mk(cS, 'g');
  const ci = mk(g, 'circle', { cx: 0, cy: 0, r, fill: type > 0 ? '#fff' : AM, stroke: type > 0 ? OR : INK, 'stroke-width': type > 0 ? 4 : 2.5 });
  const te = tx(g, 0, r > 20 ? 11 : 7, type > 0 ? '+' : '−', { 'text-anchor': 'middle', 'font-size': r > 20 ? 36 : 22, 'font-weight': 700, fill: type > 0 ? OR : INK });
  g.pos = (x, y) => { PUC.attr(ci, 'cx', x.toFixed(1)); PUC.attr(ci, 'cy', y); PUC.attr(te, 'x', x.toFixed(1)); PUC.attr(te, 'y', y + (r > 20 ? 11 : 7)); }; return g; };
const ROWS = [[150, 1, 1], [270, -1, -1], [390, 1, -1]];
const PR = ROWS.map(([y, a, b], i) => ({ y, a: part(a), b: part(b), rep: i < 2 }));
const legP = part(1, 14), legE = part(-1, 14);
legP.pos(54, 86); legE.pos(214, 86);
const legT = [mono(cS, 78, 93, 'proton'), mono(cS, 238, 93, 'electron')];
const cArr = PR.map(() => [PUC.arrow(cS, MU, 4, 13), PUC.arrow(cS, MU, 4, 13)]);
$('#cZ').innerHTML = M.icon('zap', 32, AM, 2.4);
const tProt = wt('C2', 'Protons'), tElec = wt('C2', 'Electrons'), tLike = wt('C3', 'Like'), tUnl = wt('C3', 'Unlike');
const cRows = rows($('#cSteps'), [
  ['<span class="tt">Measured in coulombs</span>', 'symbol C', 92],
  [K(`${ev} = 1.6\\times10^{-19}\\,\\text{C}`), 'charge of one electron', 186],
  [K(`${Qv} = ${nv}\\,${ev}`), 'n is a whole number', 386],
  [K(`1\\,\\text{C} \\approx 6.25\\times10^{18}`) + '<span class="tt" style="font-size:28px;margin-left:12px">electrons</span>', '', 498]]);
const tCR = [wt('C4', 'coulombs'), wt('C5', 'smallest'), wt('C6', 'equals'), wt('C6', 'One')];
const cPk = $('#cPk'), PK = [...Array(13)].map((_, i) => mk(cPk, 'circle', { cx: 24 + i * 46, cy: 30, r: 15, fill: AM, stroke: INK, 'stroke-width': 2 }));
const pkN = mono(cPk, 704, 38, '', { 'text-anchor': 'end', 'font-size': 24, 'font-weight': 600, fill: '#B7791F' });
const tPk = wt('C5', 'packets');

/* ================= I: current ================= */
const iS = $('#iS');
mk(iS, 'rect', { x: 40, y: 100, width: 704, height: 120, rx: 60, fill: '#F3F1EA', stroke: INK, 'stroke-width': 3 });
const gate = mk(iS, 'line', { x1: 392, y1: 88, x2: 392, y2: 232, stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
const gateL = mono(iS, 392, 74, 'COUNT HERE', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 18 });
const skI = x => x < 64 || x > 720;
const eI = [flow(iS, [[740, 136], [44, 136]], 9, { skip: skI }), flow(iS, [[740, 184], [44, 184]], 9, { skip: skI })];
const iArr = PUC.arrow(iS, VI); const iLab = tx(iS, 712, 72, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 32 });
$('#iRo').innerHTML = `<span class="k" style="color:${OR}">Q</span><span class="v" id="iQ" style="color:${OR}">?</span><span class="u">C</span>
  <span class="k">t</span><span class="v" id="iT">?</span><span class="u">s</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="iI" style="color:${VI}">?</span><span class="u">A</span>`;
const iLeg = document.createElement('div'); iLeg.style.cssText = 'position:absolute;left:36px;top:516px;display:flex;align-items:center;gap:14px;white-space:nowrap;font:600 24px Poppins';
iLeg.innerHTML = `<svg width="22" height="22"><circle cx="11" cy="11" r="8" fill="${AM}" stroke="${INK}" stroke-width="1.5"/></svg><span style="color:#B7791F">electrons: − to +</span><span style="color:#CBD0DA;margin:0 8px">|</span><span style="color:${VI};font-style:italic;font-size:30px">I</span><span style="color:${VI}">conventional: + to −</span>`;
$('#iL').appendChild(iLeg);
const iRows = rows($('#iSteps'), [
  ['<span class="tt">Charge on the move</span>', '= electric current', 92],
  ['<span class="tt">Count it every second</span>', 'a rate', 186],
  [K(`${Iv} = \\dfrac{${Qv}}{t}`), 'charge per second', 286],
  ['<span class="tt">Unit: ampere, A</span>', '', 412],
  [K(`1\\,\\text{A} = 1\\,\\text{C/s}`), 'one coulomb every second', 498]]);
const tIR = [wt('I2', 'electric'), wt('I3', 'rate'), wt('I4', 'I'), wt('I5', 'amperes'), wt('I5', 'One')];
const tCnt = wt('I3', 'count');

/* ================= P: potential difference ================= */
const pS = $('#pS'), WTR = M.mix(CH1, '#FFFFFF', 0.45);
const tankW = [W(pS, 'M60,110 V400 H260 V110', { 'stroke-width': 5 }), W(pS, 'M500,110 V400 H700 V110', { 'stroke-width': 5 })];
const wA = mk(pS, 'rect', { x: 63, y: 150, width: 194, height: 247, fill: WTR }), wB = mk(pS, 'rect', { x: 503, y: 350, width: 194, height: 47, fill: WTR });
const pipe = [W(pS, 'M260,370 H500 M260,394 H500', { 'stroke-width': 4 })];
const pipeW = mk(pS, 'rect', { x: 260, y: 372, width: 240, height: 20, fill: WTR });
const valve = W(pS, 'M368,360 L392,382 L368,404 Z M416,360 L392,382 L416,404 Z', { 'stroke-width': 3, fill: '#fff' });
const wDots = flow(pS, [[262, 382], [498, 382]], 6, { r: 5, fill: '#5F7399', stroke: '#5F7399' });
const dhB = W(pS, '', { stroke: TE, 'stroke-width': 4 }), dhL = tx(pS, 404, 260, 'Δh', { fill: TE, 'font-size': 28 });
const tankL = [mono(pS, 160, 448, 'TANK A', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(pS, 600, 448, 'TANK B', { 'text-anchor': 'middle', 'font-weight': 600 })];
const tOpenV = wt('P2', 'joined'), K_FL = 0.55;
const lev = t => { const u = Math.max(0, t - tOpenV), d = 100 * Math.exp(-K_FL * u); return { yA: 250 - d, yB: 250 + d, off: 120 * 100 * (1 - Math.exp(-K_FL * u)) / 100 * 3, d }; };
$('#pArr').innerHTML = M.icon('arrowR', 30, AM, 2.6);
const pD = $('#pD');
W(pD, 'M30,100 H276 L288,82 L304,118 L320,82 L336,118 L352,82 L368,118 L384,82 L400,118 L416,82 L432,118 L444,100 H682');
const pA = mk(pD, 'circle', { cx: 200, cy: 100, r: 9, fill: INK }), pB = mk(pD, 'circle', { cx: 520, cy: 100, r: 9, fill: INK });
const pAL = tx(pD, 200, 142, 'A', { 'text-anchor': 'middle' }), pBL = tx(pD, 520, 142, 'B', { 'text-anchor': 'middle' });
const pBr = W(pD, 'M200,58 V40 H520 V58', { stroke: TE, 'stroke-width': 4 }), pBrL = tx(pD, 360, 30, 'V', { 'text-anchor': 'middle', fill: TE, 'font-style': 'italic', 'font-size': 28 });
const pQ = mk(pD, 'g'), pQc = mk(pQ, 'circle', { cx: 0, cy: 100, r: 14, fill: '#fff', stroke: OR, 'stroke-width': 3 }), pQt = tx(pQ, 0, 107, '+', { 'text-anchor': 'middle', fill: OR, 'font-size': 22, 'font-weight': 700 });
const pQL = mono(pD, 360, 142, '1 C moved A → B', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600 });
const pRows = rows($('#pSteps'), [
  ['<span class="tt">Work done per coulomb</span>', 'from A to B', 240],
  [K(`${Vv} = \\dfrac{W}{${Qv}}`), 'joules per coulomb', 322],
  [K(`1\\,\\text{V} = 1\\,\\text{J/C}`), 'the volt', 440]]);
const tPR = [wt('P4', 'work'), wt('P5', 'V'), wt('P6', 'One')];
const tMove = wt('P4', 'move');

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M200,282 V150 H400'), W(ck, 'M500,150 H800 V250'), W(ck, 'M800,350 V450 H556'), W(ck, 'M484,450 H200 V382'), W(ck, 'M200,312 V352')];
const res = W(ck, 'M800,250 L780,262 L820,276 L780,290 L820,304 L780,318 L820,332 L780,344 L800,350');
const cell1 = [W(ck, 'M165,282 H235', { 'stroke-width': 5 }), W(ck, 'M182,312 H218', { 'stroke-width': 9 })];
const jump = W(ck, 'M200,352 V382');
const cell2 = [W(ck, 'M165,352 H235', { 'stroke-width': 5 }), W(ck, 'M182,382 H218', { 'stroke-width': 9 })];
const vmW = [W(ck, 'M200,200 H90 V279'), W(ck, 'M90,351 V430 H200')];
const nodes = [mk(ck, 'circle', { cx: 200, cy: 200, r: 7, fill: INK }), mk(ck, 'circle', { cx: 200, cy: 430, r: 7, fill: INK })];
const vm = mk(ck, 'circle', { cx: 90, cy: 315, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), vmT = tx(ck, 90, 325, 'V', { 'text-anchor': 'middle', fill: TE, 'font-size': 30, 'font-weight': 700 });
const am = mk(ck, 'circle', { cx: 520, cy: 450, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), amT = tx(ck, 520, 460, 'A', { 'text-anchor': 'middle', fill: VI, 'font-size': 30, 'font-weight': 700 });
const swPiv = mk(ck, 'circle', { cx: 400, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), swEnd = mk(ck, 'circle', { cx: 500, cy: 150, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const swLev = W(ck, 'M400,150 H496', { 'stroke-width': 5 });
const lbB = [tx(ck, 132, 290, '+', { 'font-size': 28 }), mono(ck, 252, 304, '1.5 V'), tx(ck, 410, 124, 'Switch'), tx(ck, 846, 298, 'R', { 'font-style': 'italic', 'font-size': 28 }), mono(ck, 846, 326, '10 Ω'),
  mono(ck, 90, 184, 'voltmeter', { 'text-anchor': 'middle' }), mono(ck, 520, 518, 'ammeter', { 'text-anchor': 'middle' })];
const lbC2 = mono(ck, 252, 374, '1.5 V');
const ckI = PUC.arrow(ck, VI), ckIL = tx(ck, 734, 130, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30 });
const tClose = wt('B4', 'Close'), tC2 = wt('B5', 'Add') + 0.2, tStep = tC2 + 0.6;
const closed = τ => τ >= tClose;
const two = τ => τ >= tStep;
const eB = flow(ck, [[200, 312], [200, 450], [800, 450], [800, 150], [200, 150], [200, 282]], 30, {
  skip: (x, y) => (Math.abs(y - 450) < 2 && x > 482 && x < 558) || (Math.abs(x - 800) < 2 && y > 246 && y < 354) || (y < 152 && x > 404 && x < 498) });
const offB = t => 90 * (M.clamp(t, tClose, tStep) - tClose) + 180 * Math.max(0, t - Math.max(tStep, tClose));
const SC = scope($('#scS'), 592, 200);
const trV = SC.tr(TE), trI = SC.tr(VI);
const sLab = [SC.lab(14, 26, 'V · VOLTAGE', '#3FC1C1'), SC.lab(578, 26, 'I · CURRENT', '#B9A6F2', { 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="rV" style="color:${TE}">1.50</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k n">SWITCH</span><span class="v" id="rS">OPEN</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the volts push, and the amps flow!' });

/* ================= E: energy + worked example ================= */
const eS = $('#eS');
const srcB = W(eS, 'M60,96 H220 V256 H60 Z', { fill: '#fff' }), ldB = W(eS, 'M564,96 H724 V256 H564 Z', { fill: '#fff' });
const eWr = [W(eS, 'M220,126 H564'), W(eS, 'M220,226 H564')];
const srcL = mono(eS, 140, 128, 'SOURCE', { 'text-anchor': 'middle', 'font-weight': 600 }), srcV = tx(eS, 140, 202, 'V', { 'text-anchor': 'middle', fill: TE, 'font-size': 44, 'font-style': 'italic' });
const srcV2 = tx(eS, 140, 202, '5 V', { 'text-anchor': 'middle', fill: TE, 'font-size': 40, 'font-family': 'IBM Plex Mono' });
const ldL = mono(eS, 644, 128, 'DEVICE', { 'text-anchor': 'middle', 'font-weight': 600 }), ldL2 = mono(eS, 644, 128, 'PHONE', { 'text-anchor': 'middle', 'font-weight': 600 });
const ldBat = [W(eS, 'M612,164 H668 V222 H612 Z', { 'stroke-width': 3 }), W(eS, 'M632,158 H648', { 'stroke-width': 5 })];
const ldFill = mk(eS, 'rect', { x: 616, y: 168, width: 48, height: 50, fill: AM });
const eE = flow(eS, [[564, 126], [220, 126]], 7, { skip: x => x < 226 || x > 558 });
const eE2 = flow(eS, [[220, 226], [564, 226]], 7, { skip: x => x < 226 || x > 558 });
const eIa = PUC.arrow(eS, VI); const eIL = tx(eS, 470, 100, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30 });
$('#eRo').innerHTML = [['V', TE, 'eV', 'V'], ['I', VI, 'eI', 'A'], ['t', INK, 'eT', 's'], ['Q', OR, 'eQ', 'C'], ['W', INK, 'eW', 'J']]
  .map(([k, col, id, u]) => `<span class="k" style="color:${col}">${k}</span><span class="v" id="${id}" style="color:${col === INK ? INK : col}">?</span><span class="u">${u}</span>`).join('');
const dRows = rows($('#dSteps'), [
  [K(`W = ${Vv}\\,${Qv}`), 'from the volt, J = V × C', 92],
  [K(`${Qv} = ${Iv}\\,t`), 'from the ampere', 186],
  [K(`W = ${Vv}\\,${Iv}\\,t`), 'energy from the source', 304]]);
$('#dUnit').textContent = 'V · A · s  =  J  (joule)';
const tDR = [wt('D2', 'W'), wt('D3', 'Q'), wt('D4', 'W')];
const wRows = rows($('#wSteps'), [
  [K(`${Vv} = 5\\,\\text{V},\\ ${Iv} = 2\\,\\text{A},\\ t = 60\\,\\text{s}`), 'given', 92],
  [K(`${Qv} = ${Iv}\\,t = 2\\times60 = 120\\,\\text{C}`), '', 186],
  [K(`W = ${Vv}\\,${Qv} = 5\\times120 = 600\\,\\text{J}`), '', 280],
  [K(`${nv} = \\dfrac{${Qv}}{${ev}} = \\dfrac{120}{1.6\\times10^{-19}} = 7.5\\times10^{20}`), '', 392]]);
const tWR = [wt('W1', 'five'), wt('W2', 'Q'), wt('W3', 'W'), wt('W4', 'One')];
const tFF = wt('W1', 'one'), FFD = 3.2;
const avE = PUC.avatar($('#sE'), { x: 1008, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'In just one minute of charging!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Voltage flows through a resistor', right: 'Current flows through. Voltage is across.', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcW = [W(tcS, 'M60,190 H300'), W(tcS, 'M300,190 L315,170 L345,210 L375,170 L405,210 L435,170 L465,210 L480,190'), W(tcS, 'M480,190 H724')];
const tcR = tx(tcS, 390, 252, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 });
const tcBr = W(tcS, 'M300,134 V114 H480 V134', { stroke: TE }), tcV = tx(tcS, 390, 98, 'V  across', { 'text-anchor': 'middle', fill: TE, 'font-size': 24 });
const tcI1 = PUC.arrow(tcS, VI), tcI2 = PUC.arrow(tcS, VI), tcIL = tx(tcS, 90, 262, 'I  through', { fill: VI, 'font-size': 24 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers and problems: define current, p.d. and the volt; use I = Q/t and V = W/Q' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A current of 0.5&nbsp;A flows through a lamp for 6&nbsp;s, and the source does 36&nbsp;J of work. What is the potential difference across the lamp?', qW: 780,
  opts: [K('3\\,\\text{V}'), K('6\\,\\text{V}'), K('12\\,\\text{V}'), K('72\\,\\text{V}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${Qv} = ${Iv}\\,t`)], [K(`${Qv} = 0.5\\times6 = 3\\,\\text{C}`)], [K(`${Vv} = \\dfrac{W}{${Qv}} = \\dfrac{36}{3}`)], [K(`${Vv} = 12\\,\\text{V}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Q'), wt('A2', 'Zero'), wt('A3', 'Then'), wt('A3', 'twelve')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 92, dy: 80, title: 'Charge, current and voltage · formula card', txt: [0, 0, 0, 0, 1],
  lines: [K(`${Iv} = ${Qv}/t \\qquad 1\\,\\text{A} = 1\\,\\text{C/s}`),
    K(`${Vv} = W/${Qv} \\qquad 1\\,\\text{V} = 1\\,\\text{J/C}`),
    K(`W = ${Vv}\\,${Qv} = ${Vv}\\,${Iv}\\,t`),
    K(`${Qv} = ${nv}\\,${ev} \\qquad ${ev} = 1.6\\times10^{-19}\\,\\text{C}`),
    'Current flows <b>through</b> a part. Voltage is <b>across</b> it.'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 07', topic: 'Direct current and alternating current', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B6', 'Watch'), 1.1, 1250, 520], [T0('B7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tCnt, tP - 0.32], [tB + 0.5, tT - 0.4], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tC + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tC - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(chP, t, tMorph + 0.6, 0.45, 0.15); M.vis(plate, t, tMorph + 1.0, 1e9, { dy: 0, fade: 0.25 }); fadeAt(plT, t, wt('H1', 'tiny') - 0.1, 0.12);
    M.vis($('#aPill'), t, wt('H1', 'tiny'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.draw(hl[0], t, tFive - 0.1, 0.35); M.draw(hl[1], t, tTwo - 0.1, 0.35);
    M.vis($('#h1C'), t, tFive - 0.15, out, { dx: 60, dy: 0, ...o }); M.vis($('#h2C'), t, tTwo - 0.15, out, { dx: 60, dy: 0, ...o });
    M.vis($('#h1B'), t, tFive, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.rise($('#h1T'), t, tFive + 0.15); M.vis($('#h1S'), t, tFive + 0.4, 1e9, { dy: 10 });
    M.vis($('#h2B'), t, tTwo, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.rise($('#h2T'), t, tTwo + 0.15); M.vis($('#h2S'), t, tTwo + 0.4, 1e9, { dy: 10 });
    M.vis($('#h1Q'), t, wt('H2', 'what') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#h2Q'), t, wt('H2', 'mean') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* C: charge */
  const cOn = t >= tC - 0.05 && t < tI + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tI - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(legP, t, tProt, 1e9, { dy: 0, fade: 0.2 }); M.vis(legE, t, tElec, 1e9, { dy: 0, fade: 0.2 }); M.vis(legT[0], t, tProt + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(legT[1], t, tElec + 0.1, 1e9, { dy: 0, fade: 0.2 });
    PR.forEach((r, i) => {
      const tm = r.rep ? tLike + 0.3 + i * 0.25 : tUnl + 0.2, s = M.spring(t - tm, M.SOFT) * (t >= tm ? 1 : 0);
      const xa = r.rep ? M.lerp(250, 180, s) : M.lerp(170, 300, s), xb = r.rep ? M.lerp(400, 470, s) : M.lerp(480, 368, s);
      r.a.pos(xa, r.y); r.b.pos(xb, r.y);
      M.vis(r.a, t, (i === 1 ? tElec : tProt) + i * 0.08, 1e9, { dy: 0, fade: 0.2 }); M.vis(r.b, t, (i === 0 ? tProt : tElec) + i * 0.08 + 0.1, 1e9, { dy: 0, fade: 0.2 });
      const ar = M.io((t - tm - 0.15) / 0.35);
      if (r.rep) { cArr[i][0].set(xa - 42, r.y, xa - 42 - 40 * ar, r.y); cArr[i][1].set(xb + 42, r.y, xb + 42 + 40 * ar, r.y); }
      else { cArr[i][0].set(xa - 84, r.y, xa - 84 + 40 * ar, r.y); cArr[i][1].set(xb + 84, r.y, xb + 84 - 40 * ar, r.y); }
      M.vis($('#cp' + i), t, tm + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    });
    M.vis($('#cStrip'), t, wt('C3', 'pull'), 1e9, { dy: 24 });
    runRows(cRows, t, tCR);
    const nk = Math.min(13, Math.max(0, Math.floor((t - tPk) / 0.22) + 1)); PK.forEach((d, k) => M.vis(d, t, tPk + k * 0.22, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.setT(pkN, t >= tPk ? 'n = ' + nk : ''); M.hide(pkN, t < tPk);
    M.vis($('#cBox'), t, tCR[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* I: current */
  const iOn = t >= tI - 0.05 && t < tP + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tP - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    const mv = Math.max(0, t - wt('I2', 'moves') + 0.2);
    eI.forEach((f, k) => f.set(70 * mv + k * 38, t >= tI + 0.2));
    const ia = M.io((t - wt('I2', 'current') + 0.1) / 0.4); iArr.set(520, 64, 520 + 170 * ia, 64); iLab.style.opacity = ia;
    M.draw(gate, t, tCnt - 0.2, 0.5); M.vis(gateL, t, tCnt, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#iRo'), t, tCnt + 0.1, 1e9, { dy: 16 });
    if (t >= tCnt + 0.1) { const el = t - tCnt - 0.1; M.setT($('#iQ'), (2 * el).toFixed(1)); M.setT($('#iT'), el.toFixed(1)); M.setT($('#iI'), el > 0.3 ? '2.00' : '-'); }
    M.vis(iLeg, t, wt('I6', 'Electrons') - 0.1, 1e9, { dx: -16, dy: 0 });
    runRows(iRows, t, tIR);
    M.vis($('#iBox'), t, tIR[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* P: potential difference */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    const tTank = wt('P2', 'water') - 0.2;
    drawSeq(tankW, t, tTank, 0.5, 0.15); drawSeq(pipe, t, tTank + 0.3, 0.4); M.vis(valve, t, tTank + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const L = lev(t);
    PUC.attr(wA, 'y', L.yA.toFixed(1)); PUC.attr(wA, 'height', (397 - L.yA).toFixed(1)); PUC.attr(wB, 'y', L.yB.toFixed(1)); PUC.attr(wB, 'height', (397 - L.yB).toFixed(1));
    [wA, wB].forEach((e, i) => M.vis(e, t, tTank + 0.4 + i * 0.1, 1e9, { dy: 0, fade: 0.3 }));
    M.vis(pipeW, t, tOpenV, 1e9, { dy: 0, fade: 0.3 });
    PUC.attr(valve, 'fill', t >= tOpenV ? M.mix('#FFFFFF', TE, M.io((t - tOpenV) / 0.3)) : '#FFFFFF');
    wDots.set(L.off, t >= tOpenV && L.d > 3);
    PUC.attr(dhB, 'd', `M372,${L.yA.toFixed(1)} H392 V${L.yB.toFixed(1)} H372`); M.hide(dhB, t < tTank + 0.6 || L.d < 4); PUC.attr(dhL, 'y', (250 + 9).toFixed(0));
    M.vis(dhL, t, tTank + 0.7, T1('P2') - 0.6, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
    fadeAt(tankL, t, tTank + 0.5);
    M.vis($('#pNo'), t, T1('P2') - 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#pStrip'), t, wt('P3', 'potential') - 0.1, 1e9, { dy: 24 });
    // right: points A and B, then V = W/Q
    const tAB = wt('P3', 'potential', 1) - 0.4;
    M.vis(pD, t, wt('P3', 'circuit') - 0.1, 1e9, { dy: 16 });
    M.vis(pBr, t, tAB, 1e9, { dy: 0, fade: 0.2 }); M.draw(pBr, t, tAB, 0.5); M.vis(pBrL, t, tAB + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const mvq = M.io((t - tMove) / 1.6); const qx = M.lerp(200, 520, mvq).toFixed(1); PUC.attr(pQc, 'cx', qx); PUC.attr(pQt, 'x', qx); M.vis(pQ, t, tMove - 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(pQL, t, tMove, 1e9, { dy: 0, fade: 0.2 });
    runRows(pRows, t, tPR);
    M.vis($('#pBox'), t, tPR[1] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#pStrip2'), t, wt('P7', 'voltage') - 0.1, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tClose, 1e9, { dy: 0, fade: 0.2 });
    const tb2 = wt('B2', 'One') - 0.2;
    drawSeq(bw, t, tb2, 0.45, 0.15); drawSeq(cell1, t, tb2, 0.25, 0.1); M.draw(jump, t, tb2 + 0.6, 0.2);
    if (t >= tC2) M.hide(jump, true);
    [swPiv, swEnd].forEach((e, i) => M.vis(e, t, wt('B2', 'switch') - 0.1 + i * 0.1, 1e9, { dy: 0, fade: 0.2 })); M.vis(swLev, t, wt('B2', 'switch'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(res, t, wt('B2', 'resistor') - 0.2, 0.4);
    drawSeq(vmW, t, wt('B2', 'voltmeter') - 0.2, 0.35, 0.1); [vm, vmT, ...nodes].forEach(e => M.vis(e, t, wt('B2', 'voltmeter'), 1e9, { dy: 0, fade: 0.2 }));
    [am, amT].forEach(e => M.vis(e, t, tb2 + 0.8, 1e9, { dy: 0, fade: 0.2 }));
    fadeAt(lbB, t, wt('B2', 'switch'), 0.1);
    drawSeq(cell2, t, tC2, 0.25, 0.1); M.vis(lbC2, t, tC2 + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const s1 = M.spring(t - tClose, M.SNAP), ang = t < tClose ? -32 : -32 * (1 - s1);
    PUC.attr(swLev, 'transform', `rotate(${ang.toFixed(2)} 400 150)`);
    eB.set(offB(t), t >= tClose);
    const ia = M.io((t - tClose - 0.3) / 0.4); ckI.set(600, 120, 600 + 110 * ia, 120); ckIL.style.opacity = ia;
    PUC.attr(res, 'stroke', t >= tClose ? INK : INK);
    // scope: V and I traces, roll mode
    const Vf = τ => (two(τ) ? 3 : 1.5), If = τ => closed(τ) ? (two(τ) ? 0.3 : 0.15) : 0;
    const tS0 = tB + 0.7;
    trV(τ => 20 * Vf(τ), t, tS0, 6, 110, t >= tS0); trI(τ => 270 * If(τ), t, tS0, 6, 186, t >= tS0);
    sLab.forEach(e => M.vis(e, t, tS0, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tS0, 1e9, { dy: 12 });
    M.setT($('#rV'), two(t) ? '3.00' : '1.50'); M.setT($('#rI'), If(t).toFixed(2)); M.setT($('#rS'), closed(t) ? 'CLOSED' : 'OPEN'); $('#rS').style.color = closed(t) ? INK : MU;
    avB(t, wt('B7', 'More') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Current') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* E: energy derivation + worked example */
  const eOn = t >= tD - 0.05 && t < tX + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = tX - 0.32;
    M.vis($('#eL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#eR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([srcB, ...eWr, ldB], t, tD + 0.4, 0.4, 0.15); drawSeq(ldBat, t, tD + 0.9, 0.25, 0.1);
    M.vis(srcL, t, tD + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(srcV, t, tD + 0.7, tW + 0.3, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); M.vis(srcV2, t, tWR[0], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(ldL, t, tD + 0.9, tW + 0.3, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); M.vis(ldL2, t, tW + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const ff = M.clamp((t - tFF) / FFD), sec = 60 * ff;
    PUC.attr(ldFill, 'height', (10 + 40 * ff).toFixed(1)); PUC.attr(ldFill, 'y', (218 - 10 - 40 * ff).toFixed(1)); M.vis(ldFill, t, tD + 1.1, 1e9, { dy: 0, fade: 0.2 });
    const sp = t < tFF ? 60 : (t < tFF + FFD ? 160 : 60);
    const off = 60 * (t - tD) + 100 * (M.clamp(t, tFF, tFF + FFD) - tFF);
    eE.set(off, t >= tD + 1); eE2.set(off, t >= tD + 1);
    const ia = M.io((t - wt('D3', 'I') + 0.1) / 0.4); eIa.set(330, 92, 330 + 120 * ia, 92); eIL.style.opacity = ia;
    M.vis($('#eFF'), t, tFF, tFF + FFD + 0.6, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.25, ody: 0 });
    M.vis($('#eRo'), t, tD + 0.6, 1e9, { dy: 16 });
    M.vis($('#eLL1'), t, tD + 0.3, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#eLL2'), t, tW + 0.1, 1e9, { dy: 10 });
    if (t >= tWR[0]) { M.setT($('#eV'), '5.00'); M.setT($('#eI'), '2.00'); M.setT($('#eT'), sec.toFixed(1)); M.setT($('#eQ'), (2 * sec).toFixed(0)); M.setT($('#eW'), (10 * sec).toFixed(0)); }
    else ['eV', 'eI', 'eT', 'eQ', 'eW'].forEach(id => M.setT($('#' + id), '?'));
    M.vis($('#eRL1'), t, tD + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#eRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    runRows(dRows, t, tDR, tW - 0.3);
    M.vis($('#dBox'), t, tDR[2] + 0.5, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#dUnit'), t, wt('D5', 'Volts'), tW - 0.3, { dy: 12, outDur: 0.25 });
    wRows.forEach(r => M.hide(r, t < tW));
    if (t >= tW) runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[3] + 0.8, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avE(t, wt('W4', 'That') + 0.4, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Current') - 0.1 });
    drawSeq(tcW, t, tX + 0.5, 0.4, 0.12); M.vis(tcR, t, tX + 0.9, 1e9, { dy: 0, fade: 0.2 });
    const ia = M.io((t - wt('X3', 'through') + 0.1) / 0.45); tcI1.set(100, 226, 100 + 150 * ia, 226); tcI2.set(530, 226, 530 + 150 * ia, 226); tcIL.style.opacity = ia;
    M.draw(tcBr, t, wt('X3', 'across') - 0.1, 0.45); M.vis(tcV, t, wt('X3', 'across') + 0.1, 1e9, { dy: 0, fade: 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
