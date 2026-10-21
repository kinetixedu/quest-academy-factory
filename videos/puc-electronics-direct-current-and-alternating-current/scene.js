// PUC Electronics Ep 7 - Direct current and alternating current ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink (f frequency gold, T period ink)
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

const GO = C.gold, fv = c(GO, 'f');
/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'torch') - 0.2;
const tD = T0('D1'), tC = T0('C1'), tB = T0('B1'), tT = T0('T1'), tP = T0('P1'), tW = T0('W1'), tU = T0('U1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tP], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
// torch: body + head, cell inside
const torch = [W(h1S, 'M20,70 H170 V130 H20 Z', { 'stroke-width': 5, fill: '#fff' }), W(h1S, 'M170,62 L230,40 V160 L170,138 Z', { 'stroke-width': 5, fill: '#fff' }), W(h1S, 'M244,70 L276,58 M248,100 H284 M244,130 L276,142', { stroke: AM, 'stroke-width': 4 })];
const tCell = [W(h1S, 'M36,84 H140 V116 H36 Z', { stroke: AM, 'stroke-width': 3 }), W(h1S, 'M140,94 H150 V106 H140', { stroke: AM, 'stroke-width': 3 })];
// wall socket: plate, three round holes, switch
const sock = [W(h2S, 'M30,20 H190 A14,14 0 0 1 204,34 V160 A14,14 0 0 1 190,174 H30 A14,14 0 0 1 16,160 V34 A14,14 0 0 1 30,20 Z', { 'stroke-width': 5, fill: '#fff' }),
  W(h2S, 'M228,40 H284 V154 H228 Z', { 'stroke-width': 5, fill: '#fff' }), W(h2S, 'M242,58 H270 V96 H242 Z', { 'stroke-width': 3, fill: C.soft })];
const holes = [[110, 64, 14], [76, 124, 11], [144, 124, 11]].map(([x, y, r]) => mk(h2S, 'circle', { cx: x, cy: y, r, fill: INK }));

/* ================= D: direct current ================= */
const dS = $('#dS');
const dW = [W(dS, 'M120,202 V110 H330'), W(dS, 'M450,110 H660 V330 H120 V238')];
const dRes = W(dS, 'M330,110 L345,90 L370,130 L395,90 L420,130 L440,90 L450,110');
const dCell = [W(dS, 'M85,202 H155', { 'stroke-width': 5 }), W(dS, 'M102,238 H138', { 'stroke-width': 9 })];
const dLb = [tx(dS, 56, 212, '+', { 'font-size': 28 }), tx(dS, 60, 262, '−', { 'font-size': 28 }), tx(dS, 172, 228, 'Cell'), tx(dS, 390, 166, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 })];
const dE = flow(dS, [[120, 238], [120, 330], [660, 330], [660, 110], [120, 110], [120, 202]], 22, { skip: (x, y) => y < 112 && x > 326 && x < 454 });
const dI = PUC.arrow(dS, VI), dIL = tx(dS, 630, 80, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30 });
$('#dZ').innerHTML = M.icon('arrowR', 32, AM, 2.6);
const dP = [...$('#dPills').children];
const dG = $('#dG');
const g1 = PUC.graph(dG, { x: 100, y: 84, w: 600, h: 190, xmax: 4, ymin: -1, ymax: 1.6, xl: 't', yl: 'I' });
const g2 = PUC.graph(dG, { x: 100, y: 352, w: 600, h: 190, xmax: 4, ymin: -1, ymax: 1.6, xl: 't', yl: 'I' });
const g1c = g1.curve(VI), g2c = g2.curve(AM), g1d = g1.dot(VI, 9), g2d = g2.dot(AM, 9);
const gT1 = mono(dG, 700, 112, 'STEADY DC', { 'text-anchor': 'end', 'font-weight': 600, fill: VI }), gT2 = mono(dG, 700, 380, 'VARYING DC', { 'text-anchor': 'end', 'font-weight': 600, fill: '#B7791F' });
const gS1 = mono(dG, 400, 250, 'same size · same direction', { 'text-anchor': 'middle', 'font-size': 18 }), gS2 = mono(dG, 400, 518, 'rises and falls · never below zero', { 'text-anchor': 'middle', 'font-size': 18 });
const gA1 = [g1.axes, ...[...dG.querySelectorAll('line,text')].slice(0, 0)];
const tFlat = wt('D3', 'Draw'), tVar = wt('D4', 'rise');

/* ================= C: alternating current ================= */
const cS = $('#cS');
mk(cS, 'rect', { x: 40, y: 90, width: 704, height: 64, rx: 32, fill: '#F3F1EA', stroke: INK, 'stroke-width': 3 });
const cE = [flow(cS, [[60, 112], [724, 112]], 10, { skip: x => x < 62 || x > 722 }), flow(cS, [[60, 134], [724, 134]], 10, { skip: x => x < 62 || x > 722 })];
const cI = PUC.arrow(cS, VI, 6, 18), cIL = tx(cS, 392, 232, 'I', { 'text-anchor': 'middle', fill: VI, 'font-style': 'italic', 'font-size': 30 });
const cDir = mono(cS, 392, 262, '', { 'text-anchor': 'middle', 'font-weight': 600, fill: VI });
// generator: magnets, field lines, turning coil
const magN = mk(cS, 'rect', { x: 110, y: 300, width: 90, height: 200, rx: 10, fill: C.red }), magS = mk(cS, 'rect', { x: 584, y: 300, width: 90, height: 200, rx: 10, fill: '#5F7399' });
const mgL = [tx(cS, 155, 412, 'N', { 'text-anchor': 'middle', fill: '#fff', 'font-size': 36, 'font-weight': 700 }), tx(cS, 629, 412, 'S', { 'text-anchor': 'middle', fill: '#fff', 'font-size': 36, 'font-weight': 700 })];
const fld = [340, 400, 460].map(y => mk(cS, 'line', { x1: 210, y1: y, x2: 574, y2: y, stroke: '#CBD0DA', 'stroke-width': 2.5, 'stroke-dasharray': '8 8' }));
const coil = mk(cS, 'rect', { x: 292, y: 320, width: 200, height: 160, fill: C.ac2, stroke: INK, 'stroke-width': 5 });
const axle = W(cS, 'M392,300 V500', { 'stroke-width': 3, 'stroke-dasharray': '6 6' });
const OMC = 2 * Math.PI / 4, phC = t => OMC * (t - T0('C2'));
const cG = $('#cG');
const g3 = PUC.graph(cG, { x: 100, y: 90, w: 600, h: 340, xmax: 8, ymin: -1.2, ymax: 1.2, xl: 't', yl: 'I' });
const g3c = g3.curve(VI), g3d = g3.dot(VI, 10);
const pk = [mono(cG, g3.X(1) + 22, g3.Y(1) + 6, '+ peak', { 'font-weight': 600, fill: VI }), mono(cG, g3.X(2) + 14, g3.Y(0) - 12, 'zero', { 'font-weight': 600 }), mono(cG, g3.X(3) + 22, g3.Y(-1) + 6, 'flows the other way', { 'font-weight': 600, fill: VI })];
const tPk = [wt('C2', 'peak'), wt('C2', 'zero'), wt('C2', 'other')];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M200,282 V150 H420'), W(ck, 'M540,150 H760 V256'), W(ck, 'M760,344 V450 H200 V318')];
const bRes = W(ck, 'M420,150 L435,130 L460,170 L485,130 L510,170 L530,130 L540,150');
const bCell = [W(ck, 'M165,282 H235', { 'stroke-width': 5 }), W(ck, 'M182,318 H218', { 'stroke-width': 9 })];
const acW = [W(ck, 'M200,256 V282'), W(ck, 'M200,318 V344')];
const acS = [mk(ck, 'circle', { cx: 200, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M174,300 C184,280 192,280 200,300 S216,320 226,300', { 'stroke-width': 4 })];
const lamp = mk(ck, 'circle', { cx: 760, cy: 300, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), lampX = [W(ck, 'M729,269 L791,331'), W(ck, 'M791,269 L729,331')];
const bLb = [tx(ck, 480, 112, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), tx(ck, 700, 296, 'Lamp', { 'text-anchor': 'end' }), mono(ck, 700, 324, 'indicator', { 'text-anchor': 'end' })];
const cLb = [tx(ck, 132, 290, '+', { 'font-size': 28 }), mono(ck, 252, 306, 'Cell')], aLb = mono(ck, 260, 306, 'AC source');
const tDC = wt('B2', 'connect'), tAC = wt('B4', 'switch') + 0.3, OMB = 2 * Math.PI / 4;
const iB = τ => τ < tDC ? 0 : τ < tAC ? 0.2 : 0.2 * Math.sin(OMB * (τ - tAC));
const offB = t => t < tAC ? 100 * Math.max(0, t - tDC) : 100 * (tAC - tDC) + (100 / OMB) * (1 - Math.cos(OMB * (t - tAC)));
const eB = flow(ck, [[200, 318], [200, 450], [760, 450], [760, 150], [200, 150], [200, 282]], 30, {
  skip: (x, y) => (Math.abs(x - 760) < 2 && y > 252 && y < 348) || (y < 152 && x > 416 && x < 544) || (Math.abs(x - 200) < 2 && y > 252 && y < 348) });
const bI = PUC.arrow(ck, VI), bIL = tx(ck, 600, 502, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30 });
const SC = scope($('#scS'), 592, 200), trI = SC.tr(VI), sLab = SC.lab(14, 26, 'I · CURRENT', '#B9A6F2'), sZero = mk($('#scS'), 'line', { x1: 0, y1: 100, x2: 592, y2: 100, stroke: '#5A6788', 'stroke-width': 2 });
$('#ro1').innerHTML = `<span class="k n">SOURCE</span><span class="v" id="rS">CELL</span><span class="u"></span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k n">DIRECTION</span><span class="v" id="rD">-</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So in AC, the electrons just rock in place!' });

/* ================= P: period and frequency + worked example ================= */
const pG = $('#pG');
const g4 = PUC.graph(pG, { x: 100, y: 100, w: 600, h: 300, xmax: 2, ymin: -1.2, ymax: 1.2, xl: 't', yl: 'I' });
const band = mk(pG, 'rect', { x: g4.X(0), y: 100, width: g4.X(1) - g4.X(0), height: 300, fill: C.ac3 });
pG.insertBefore(band, pG.firstChild);
const g4c = g4.curve(VI, 5);
const tBr = W(pG, `M${g4.X(0)},450 V466 H${g4.X(1)} V450`, { 'stroke-width': 3 }), tBrL = tx(pG, (g4.X(0) + g4.X(1)) / 2, 500, 'T', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 30 });
const tBrL2 = tx(pG, (g4.X(0) + g4.X(1)) / 2, 500, 'T = 20 ms', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 24 });
const cyc = tx(pG, (g4.X(0) + g4.X(1)) / 2, 140, 'ONE CYCLE', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: '#B7791F' });
const rev = [0.5, 1].map((x, i) => { const g = mk(pG, 'g'); mk(g, 'circle', { cx: g4.X(x), cy: g4.Y(0), r: 16, fill: '#fff', stroke: C.red, 'stroke-width': 4 }); tx(g, g4.X(x), g4.Y(0) + 7, String(i + 1), { 'text-anchor': 'middle', fill: C.red, 'font-size': 18, 'font-weight': 700 }); return g; });
const revL = mono(pG, 400, 548, 'direction changes twice in one cycle', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600 });
const msT = [0, 10, 20, 30, 40].map((v, i) => mono(pG, g4.X(i / 2), 432, String(v), { 'text-anchor': 'middle', 'font-size': 18 }));
const msU = mono(pG, 724, 433, 'ms', { 'text-anchor': 'end', 'font-size': 18 });
const pRows = rows($('#pSteps'), [
  ['<span class="tt">One cycle</span>', 'one forward and backward swing', 92],
  [K('T'), 'period: seconds for one cycle', 176],
  [K(fv), 'frequency: cycles per second, in hertz', 260],
  [K(`${fv} = \\dfrac{1}{T}`), '1 Hz = one cycle per second', 360],
  ['<span class="tt">2 reversals per cycle</span>', '', 490]]);
const tPR = [wt('P2', 'cycle'), wt('P2', 'period'), wt('P3', 'frequency'), wt('P4', 'f'), wt('P5', 'twice')];
const wRows = rows($('#wSteps'), [
  [K(`V \\approx 230\\,\\text{V},\\quad ${fv} = 50\\,\\text{Hz}`), 'India mains', 92],
  [K(`T = \\dfrac{1}{${fv}} = \\dfrac{1}{50} = 0.02\\,\\text{s} = 20\\,\\text{ms}`), '', 186],
  [K(`\\text{reversals} = 2${fv} = 100\\ \\text{per second}`), '', 306]]);
const tWR = [wt('W1', 'two'), wt('W2', 'period'), wt('W3', 'Two')];
const avW = PUC.avatar($('#sP'), { x: 1008, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'A hundred flips, every single second!' });

/* ================= U: why homes get AC ================= */
const uS = $('#uS');
const UN = [['Power station', 'makes AC', 160], ['Step-up transformer', 'raises the voltage', 480], ['Long lines', 'very high voltage', 800], ['Step-down transformer', 'lowers the voltage', 1120], ['Your home', 'about 230 V AC', 1440]];
const uLine = W(uS, 'M160,170 H1440', { stroke: '#CBD0DA', 'stroke-width': 4 });
const ring = UN.map(([, , x]) => mk(uS, 'circle', { cx: x, cy: 170, r: 54, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 4 }));
const IC2 = {
  plant: ['M3 21h18', 'M5 21V11l5 3V11l5 3V7h4v14', 'M17 7V3'],
  xfmr: ['M7 4c3 0 3 4 0 4s3 4 0 4-3 4 0 4 3 4 0 4', 'M17 4c-3 0-3 4 0 4s-3 4 0 4 3 4 0 4-3 4 0 4', 'M12 3v18'],
  tower: ['M12 2 7 22', 'M12 2l5 20', 'M5 8h14', 'M6 13h12', 'M8.5 13 15.5 22', 'M15.5 13 8.5 22']
};
const uIco = [IC2.plant, IC2.xfmr, IC2.tower, IC2.xfmr, 'home'];
const uIc = UN.map(([, , x], i) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${x - 26}px;top:${170 - 26}px`; d.innerHTML = M.icon(uIco[i], 52, INK, 2); $('#uC').appendChild(d); return d; });
$('#uNodes').innerHTML = UN.map(([n, p, x]) => `<div class="nd" style="left:${x - 140}px;top:242px"><div class="nm">${n}</div><div class="pp">${p}</div></div>`).join('');
const uND = [...$('#uNodes').children];
const pulses = [0, 1, 2, 3].map(i => mk(uS, 'circle', { r: 8, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
// row 2: socket -> charger -> phone, and the fan
const R2 = [['Wall socket', 'AC', 230], ['Charger', 'AC in, DC out', 640], ['Phone', 'needs steady DC', 1050]];
const r2Ic = ['plug', 'box', 'phone'];
const IC3 = { plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'], box: ['M4 6h16v12H4z', 'M8 10h8', 'M8 14h5'], phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M11 18h2'], fan: ['M12 12c0-4 1-8 4-8s2 5-4 8Z', 'M12 12c4 0 8 1 8 4s-5 2-8-4Z', 'M12 12c0 4-1 8-4 8s-2-5 4-8Z', 'M12 12c-4 0-8-1-8-4s5-2 8 4Z'] };
const r2 = R2.map(([n, p, x], i) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:${x - 160}px;top:404px;width:320px;height:136px;display:flex;align-items:center;gap:18px;white-space:nowrap`;
  d.innerHTML = `<div style="flex:none;width:84px;height:84px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center">${M.icon(IC3[r2Ic[i]], 44, INK, 2)}</div><div><div style="font:700 26px Poppins">${n}</div><div style="font:500 21px Poppins;color:${MU}">${p}</div></div>`;
  $('#uC').appendChild(d); return d; });
const wv1 = W(uS, 'M346,470 q10,-20 20,0 t20,0 t20,0 t20,0', { stroke: VI, 'stroke-width': 4 }), wv2 = W(uS, 'M772,470 H840', { stroke: VI, 'stroke-width': 4 });
const ar1 = PUC.arrow(uS, MU, 3, 12), ar2 = PUC.arrow(uS, MU, 3, 12);
const fanD = document.createElement('div'); fanD.style.cssText = 'position:absolute;left:1180px;top:404px;height:136px;display:flex;align-items:center;gap:18px;white-space:nowrap;border-left:2px solid #CBD0DA;padding-left:40px';
fanD.innerHTML = `<div style="flex:none;width:84px;height:84px;border-radius:50%;background:${AM};display:flex;align-items:center;justify-content:center">${M.icon(IC3.fan, 44, '#fff', 2)}</div><div><div style="font:700 26px Poppins">Table fan</div><div style="font:500 21px Poppins;color:${MU}">built for 230 V AC</div></div>`;
$('#uC').appendChild(fanD);
const uNote = [['Transformers work only with AC', 'they raise or lower its voltage'], ['Very high voltage on long lines', 'far less energy wasted in the wires']].map(([a, b], i) => { const d = document.createElement('div');
  d.style.cssText = `position:absolute;left:${80 + i * 760}px;top:430px;white-space:nowrap`; d.innerHTML = `<div style="font:700 28px Poppins">${a}</div><div style="font:500 22px Poppins;color:${MU};margin-top:6px">${b}</div>`; $('#uC').appendChild(d); return d; });
const tUN = [wt('U1', 'homes') - 0.2, wt('U2', 'raised'), wt('U3', 'distances'), wt('U2', 'lowered'), wt('U3', 'far') + 0.2];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: '50 Hz means 50 reversals a second', right: '50 Hz means 100 reversals a second', y0: 96, y1: 184 });
const tcS = $('#tcS');
const g5 = PUC.graph(tcS, { x: 60, y: 80, w: 660, h: 180, xmax: 1.25, ymin: -1.2, ymax: 1.2 });
g5.axes.setAttribute('opacity', 0.35);
const g5c = g5.curve(VI, 5);
const tRev = [0.5, 1].map((x, i) => { const g = mk(tcS, 'g'); mk(g, 'circle', { cx: g5.X(x), cy: g5.Y(0), r: 15, fill: '#fff', stroke: C.red, 'stroke-width': 4 }); tx(g, g5.X(x), g5.Y(0) + 6, String(i + 1), { 'text-anchor': 'middle', fill: C.red, 'font-size': 17, 'font-weight': 700 }); return g; });
const tcL = mono(tcS, 700, 72, '1 cycle = 2 reversals', { 'text-anchor': 'end', fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Differences between AC and DC; short problems on frequency and period, f = 1/T' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'An AC source has a period of 4&nbsp;ms. How many times does its current change direction in one second?', qW: 780,
  opts: ['125', '250', '500', '1000'], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${fv} = \\dfrac{1}{T}`)], [K(`${fv} = \\dfrac{1}{0.004} = 250\\,\\text{Hz}`)], [K(`\\text{reversals} = 2${fv}`)], [K(`= 2\\times250 = 500`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'f'), wt('A2', 'That'), wt('A3', 'Each'), wt('A3', 'Two')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 96, dy: 80, title: 'DC and AC · formula card', txt: [1, 1, 0, 0, 1],
  lines: ['<b>DC</b>: one direction only, size may vary', '<b>AC</b>: reverses direction again and again',
    K(`${fv} = 1/T \\qquad 1\\,\\text{Hz} = 1\\ \\text{cycle per second}`), K(`\\text{reversals per second} = 2${fv}`), 'India mains: about 230 V at 50 Hz'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 08', topic: "Ohm's law and electrical resistance", y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B5', 'electrons'), 1.1, 620, 540], [T0('B6'), 1, 960, 540]]);
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
  const aOn = t >= tMorph && t < tD + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tD - 0.32, t1 = wt('H1', 'torch'), t2 = wt('H1', 'fan');
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, t1 + 0.1, out, { dx: 60, dy: 0, ...o }); drawSeq(torch, t, t1 + 0.3, 0.4, 0.12); drawSeq(tCell, t, wt('H1', 'cell') - 0.1, 0.3, 0.1);
    M.rise($('#h1T'), t, wt('H1', 'cell') - 0.1); M.vis($('#h1S2'), t, wt('H1', 'cell') + 0.2, 1e9, { dy: 10 });
    M.vis($('#h2C'), t, t2 - 0.1, out, { dx: 60, dy: 0, ...o }); drawSeq(sock, t, t2 + 0.1, 0.4, 0.12); holes.forEach((h, i) => M.vis(h, t, t2 + 0.5 + i * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#h2T'), t, wt('H1', 'wall') - 0.1); M.vis($('#h2S2'), t, wt('H1', 'socket'), 1e9, { dy: 10 });
    M.vis($('#h1Q'), t, wt('H2', 'why') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#h2Q'), t, wt('H2', 'fan') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* D: direct current */
  const dOn = t >= tD - 0.05 && t < tC + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tC - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dW, t, tD + 0.4, 0.5, 0.2); M.draw(dRes, t, tD + 0.7, 0.4); drawSeq(dCell, t, tD + 0.5, 0.25, 0.1); fadeAt(dLb, t, wt('D1', 'cell') - 0.1);
    const tf = wt('D2', 'flows'); dE.set(90 * Math.max(0, t - tf), t >= tf - 0.2); M.vis($('#dE'), t, tf, 1e9, { dy: 0, fade: 0.2 });
    const ia = M.io((t - wt('D2', 'plus') + 0.1) / 0.4); dI.set(490, 80, 490 + 120 * ia, 80); dIL.style.opacity = ia;
    M.vis($('#dStrip'), t, wt('D2', 'only'), 1e9, { dy: 24 });
    dP.forEach((p, i) => M.vis(p, t, wt('D5', ['Cells', 'batteries', 'solar'][i]) - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    // graphs
    [g1.axes, g1.ylab, g1.xlab, g1.zero].forEach(e => e && M.vis(e, t, tD + 0.6, 1e9, { dy: 0, fade: 0.3 }));
    const s1 = M.clamp((t - tFlat) / 3) * 4; g1c(s => [s, 0.6], 0, s1); g1d(s1, 0.6, t >= tFlat && s1 < 4); M.vis(gT1, t, tFlat - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(gS1, t, wt('D3', 'Same'), 1e9, { dy: 0, fade: 0.2 });
    [g2.axes, g2.ylab, g2.xlab, g2.zero].forEach(e => e && M.vis(e, t, tVar - 0.4, 1e9, { dy: 0, fade: 0.3 }));
    const s2 = M.clamp((t - tVar) / 3.2) * 4; g2c(s => [s, Math.abs(Math.sin(Math.PI * s))], 0, s2, 120); g2d(s2, Math.abs(Math.sin(Math.PI * s2)), t >= tVar && s2 < 4);
    M.vis(gT2, t, tVar - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(gS2, t, wt('D4', 'never'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* C: alternating current */
  const cOn = t >= tC - 0.05 && t < tB + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tB - 0.32, th = Math.max(0, phC(t)), on2 = t >= T0('C2') - 0.1;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    const off = on2 ? -(60 / OMC) * (1 - Math.cos(th)) : 0; cE.forEach((f, k) => f.set(off + k * 33, t >= tC + 0.4));
    const iv = on2 ? Math.sin(th) : 0; cI.set(392, 196, 392 + 150 * iv, 196); cIL.setAttribute('x', (392 + 175 * iv).toFixed(1)); M.hide(cIL, Math.abs(iv) < 0.15);
    M.setT(cDir, !on2 ? '' : iv > 0.08 ? 'FORWARD' : iv < -0.08 ? 'BACKWARD' : 'ZERO'); cDir.setAttribute('y', 262);
    // generator
    const tg = wt('C4', 'generators') - 0.2;
    [magN, magS, ...mgL].forEach((e, i) => M.vis(e, t, tg + i * 0.05, 1e9, { dy: 0, fade: 0.2 })); fld.forEach((e, i) => M.draw(e, t, tg + 0.2 + i * 0.1, 0.4));
    const sn = Math.sin(th), wdt = 200 * Math.abs(sn);
    PUC.attr(coil, 'x', (392 - wdt / 2).toFixed(1)); PUC.attr(coil, 'width', Math.max(4, wdt).toFixed(1)); PUC.attr(coil, 'fill', sn >= 0 ? C.ac2 : '#E7E0FA');
    M.vis(coil, t, wt('C4', 'coil') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(axle, t, wt('C4', 'coil'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#cTag'), t, wt('C4', 'reverses') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    // graph
    [g3.axes, g3.ylab, g3.xlab, g3.zero].forEach(e => e && M.vis(e, t, tC + 0.6, 1e9, { dy: 0, fade: 0.3 }));
    const s = M.clamp(th / OMC, 0, 8); g3c(u => [u, Math.sin(OMC * u)], 0, on2 ? s : 0, 160); g3d(s, Math.sin(OMC * s), on2 && s < 8);
    pk.forEach((e, i) => M.vis(e, t, tPk[i], 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#cSlow'), t, T0('C2'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#cSine'), t, wt('C3', 'sine') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    const sw = tAC - 0.4;
    M.vis($('#ckL1'), t, tB + 0.3, sw, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, sw + 0.3, 1e9, { dy: 10 });
    drawSeq(bw, t, tB + 0.5, 0.45, 0.2); M.draw(bRes, t, wt('B1', 'resistor') - 0.1, 0.4); M.vis(lamp, t, wt('B1', 'lamp') - 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq(lampX, t, wt('B1', 'lamp'), 0.25, 0.08);
    fadeAt(bLb, t, wt('B1', 'resistor'), 0.25);
    const dcOn = t < sw + 0.3;
    [...bCell, ...cLb].forEach((e, i) => M.vis(e, t, wt('B2', 'cell') - 0.2 + i * 0.05, sw, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }));
    bCell.forEach(e => M.draw(e, t, wt('B2', 'cell') - 0.2, 0.25));
    [...acS, ...acW, aLb].forEach(e => M.vis(e, t, sw + 0.15, 1e9, { dy: 0, fade: 0.2 }));
    eB.set(offB(t), t >= tDC); M.vis($('#ckE'), t, tDC, 1e9, { dy: 0, fade: 0.2 });
    const i = iB(t), ia = t < tDC ? 0 : M.io((t - tDC) / 0.4);
    const al = t < tAC ? 120 * ia : 120 * Math.sin(OMB * (t - tAC)); bI.set(480, 492, 480 + al, 492); bIL.setAttribute('x', (480 + al + (al >= 0 ? 10 : -26)).toFixed(1)); M.hide(bIL, Math.abs(al) < 20);
    PUC.attr(lamp, 'fill', M.mix('#FFFFFF', AM, Math.min(1, Math.abs(i) / 0.2) * 0.9));
    trI(τ => 300 * iB(τ), t, tB + 0.6, 8, 100, t >= tB + 0.6); M.vis(sLab, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(sZero, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#slowT'), t, tAC, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rS'), t < sw + 0.3 ? 'CELL' : 'AC'); M.setT($('#rI'), (i >= 0 ? '+' : '−') + Math.abs(i).toFixed(2));
    M.setT($('#rD'), t < tDC ? '-' : i > 0.015 ? 'FORWARD' : i < -0.015 ? 'BACKWARD' : 'ZERO'); $('#rD').style.color = i < -0.015 ? VI : INK;
    avB(t, wt('B7', 'rock') - 0.2, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tP; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tP - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'A') - 0.05, { out: tP - 0.35, outDur: 0.25 }); }

  /* P: period, frequency, worked example */
  const pOn = t >= tP - 0.05 && t < tU + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tU - 0.32, wOn = t >= tW;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    [g4.axes, g4.ylab, g4.xlab, g4.zero].forEach(e => e && M.vis(e, t, tP + 0.5, 1e9, { dy: 0, fade: 0.3 }));
    const s = M.clamp((t - tP - 0.8) / 2.5) * 2; g4c(u => [u, Math.sin(2 * Math.PI * u)], 0, s, 160);
    M.vis(band, t, tPR[0], 1e9, { dy: 0, fade: 0.3 }); M.vis(cyc, t, tPR[0] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(tBr, t, tPR[1], 0.4); M.vis(tBrL, t, tPR[1] + 0.2, tW, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); M.vis(tBrL2, t, tWR[1] + 0.5, 1e9, { dy: 0, fade: 0.2 });
    rev.forEach((r, i) => M.vis(r, t, tPR[4] + i * 0.3, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 })); M.vis(revL, t, tPR[4] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    msT.forEach((e, i) => M.vis(e, t, tWR[1] + 0.2 + i * 0.08, 1e9, { dy: 0, fade: 0.2 })); M.vis(msU, t, tWR[1] + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.hide(g4.xlab, t >= tWR[1] + 0.2 || t < tP + 0.5);
    M.vis($('#pLL1'), t, tP + 0.3, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#pLL2'), t, tW + 0.1, 1e9, { dy: 10 });
    M.vis($('#pRL1'), t, tP + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#pRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    runRows(pRows, t, tPR, tW - 0.3);
    M.vis($('#pBox'), t, tPR[3] + 0.5, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    wRows.forEach(r => M.hide(r, !wOn)); if (wOn) runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[2] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    avW(t, wt('W3', 'hundred') + 0.2, out);
  }

  /* U: why homes get AC */
  const uOn = t >= tU - 0.05 && t < tX + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = tX - 0.32;
    M.vis($('#uC'), t, tU + 0.1, out, { dy: 36, ...o });
    M.draw(uLine, t, tU + 0.4, 1.6, M.o3);
    UN.forEach((n, i) => { const u = M.io((t - tUN[i]) / 0.3); M.vis(ring[i], t, tU + 0.5 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(ring[i], 'stroke', M.mix('#CBD0DA', AM, u)); PUC.attr(ring[i], 'fill', M.mix('#FFFFFF', C.ac3, u));
      M.vis(uIc[i], t, tU + 0.6 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(uND[i], t, tUN[i], 1e9, { dy: 16 }); });
    pulses.forEach((p, k) => { const x = 160 + ((80 * (t - tU) + k * 320) % 1280); PUC.attr(p, 'cx', x.toFixed(1)); PUC.attr(p, 'cy', 170); M.hide(p, t < tUN[1] || Math.abs(((x - 160) % 320) - 0) < 60 || Math.abs(((x - 160) % 320) - 320) < 60); });
    const t4 = T0('U4');
    M.vis($('#uPan'), t, wt('U2', 'transformer') - 0.2, 1e9, { dy: 20 });
    uNote.forEach((d, i) => M.vis(d, t, i ? wt('U3', 'high') - 0.1 : wt('U2', 'transformer'), t4 - 0.3, { dy: 16, outDur: 0.25, ody: -10 }));
    r2.forEach((d, i) => M.vis(d, t, wt('U4', ['phones', 'chargers', 'laptops'][i]) - 0.1 + (i === 2 ? 0.2 : 0), 1e9, { dy: 16 }));
    M.draw(wv1, t, wt('U4', 'chargers'), 0.4); M.draw(wv2, t, wt('U4', 'into'), 0.4);
    const a1 = M.io((t - wt('U4', 'chargers') - 0.2) / 0.3), a2 = M.io((t - wt('U4', 'into') - 0.2) / 0.3);
    ar1.set(432, 470, 432 + 34 * a1, 470); ar2.set(844, 470, 844 + 30 * a2, 470);
    M.vis(fanD, t, wt('U4', 'fan') - 0.1, 1e9, { dx: 30, dy: 0 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'But') - 0.2, tRight: wt('X3', 'So') - 0.1 });
    const s = M.clamp((t - tX - 0.6) / 1.4) * 1.25; g5c(u => [u, Math.sin(2 * Math.PI * u)], 0, s, 120);
    tRev.forEach((r, i) => M.vis(r, t, wt('X3', 'two') + i * 0.3, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 })); M.vis(tcL, t, wt('X3', 'two') + 0.6, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Differences') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How') - 0.4, tCount, tAns });
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
