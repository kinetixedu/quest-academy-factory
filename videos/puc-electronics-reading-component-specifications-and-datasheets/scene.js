// PUC Electronics Ep 33 - Reading component specifications and datasheets ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, t and R ink; power P gold (as energy U in Ep 30); temperature θ red (as Ep 31)
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, GO = C.gold, RD = C.red, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const Pp = `\\textcolor{${GO}}{P}`, Vv = `\\textcolor{${TE}}{V}`, Ii = `\\textcolor{${VI}}{I}`;

const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
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
const bead = (s, cx, cy, k = 1) => { const o = mk(s, 'g'), g = mk(o, 'g', { transform: `translate(${cx},${cy}) scale(${k})` });
  W(g, 'M-110,0 H-60 M60,0 H110', { stroke: '#9AA0AC', 'stroke-width': 4 }); const b = mk(g, 'rect', { x: -62, y: -22, width: 124, height: 44, rx: 20, fill: '#E9D8B4', stroke: INK, 'stroke-width': 3 });
  [['#8B5A2B', -36], ['#16213E', -18], [RD, 0], ['#C9A227', 34]].forEach(([c, x]) => mk(g, 'rect', { x: x - 5, y: -21, width: 10, height: 42, fill: c })); o._b = b; return o; };
const wavy = (p, x, y0) => PUC.attr(p, 'd', `M${x},${y0.toFixed(1)} q8,-9 0,-18 q-8,-9 0,-18`);

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'A') - 0.2;
const tI = T0('I1'), tS = T0('S1'), tK = T0('K1'), tB = T0('B1'), tT = T0('T1'), tN = T0('D1'), tW = T0('W1'), tG = T0('G1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tN], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hkS = $('#hkS');
const hkB = mk(hkS, 'rect', { x: 20, y: 60, width: 280, height: 280, rx: 16, fill: '#E4EFE2', stroke: INK, 'stroke-width': 4 });
const hkW = W(hkS, 'M40,200 H60 M260,200 H280', { stroke: '#B9CDB5', 'stroke-width': 6 });
const hkR = bead(hkS, 160, 200, 0.9);
const hkH = [0, 1, 2].map(() => W(hkS, '', { stroke: RD, 'stroke-width': 4 }));
const tHot = wt('H1', 'hot'), tSmell = wt('H1', 'smells');
const smoke = [0, 1].map(() => W(hkS, '', { stroke: '#9AA0AC', 'stroke-width': 4 }));
const vS = $('#vS'); const vR = bead(vS, 150, 100, 1.05);
const vBand = mono(vS, 150, 176, 'brown · black · red', { 'text-anchor': 'middle', 'font-size': 17 });
const smS = $('#smS');
const tq = mk(smS, 'text', { x: 150, y: 140, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 110, fill: AM }); tq.textContent = '?';

/* ================= S: datasheet sections ================= */
const BLK = [['DESCRIPTION · FEATURES', 'Carbon film resistor · axial leads\n1 kΩ · ±5 % · 0.25 W', 84, 92],
  ['ABSOLUTE MAXIMUM RATINGS', 'Rated power (at 70 °C)     0.25 W\nOperating temperature   -55 to 155 °C', 190, 92],
  ['ELECTRICAL CHARACTERISTICS', '              MIN     TYP     MAX\nResistance    950    1000    1050  Ω', 296, 92],
  ['GRAPHS', '', 402, 86], ['PACKAGE', '', 402, 86]];
$('#page').innerHTML = BLK.map(([h, b, y, hh], i) => `<div class="blk" style="top:${y}px;height:${hh}px;${i === 3 ? 'width:340px' : i === 4 ? 'left:404px;width:340px' : ''}"><div class="bh">${h}</div><div class="bt" style="top:34px">${b.replace(/</g, '&lt;')}</div></div>`).join('') +
  `<div class="blk" id="pgFoot" style="top:508px;height:60px;border-style:dashed"><div class="bh" style="top:18px">... AND MORE PAGES OF DETAIL</div></div>`;
const blks = [...$('#page').querySelectorAll('.blk')];
// mini graph + package inside blocks 3 and 4
const gSv = document.createElementNS(NS, 'svg'); gSv.setAttribute('width', 340); gSv.setAttribute('height', 86); gSv.style.cssText = 'position:absolute;left:0;top:0'; blks[3].appendChild(gSv);
const gMini = [W(gSv, 'M170,72 V30 M170,72 H320', { 'stroke-width': 2, stroke: MU }), W(gSv, 'M172,36 H230 L310,70', { 'stroke-width': 3, stroke: GO })];
const pSv = document.createElementNS(NS, 'svg'); pSv.setAttribute('width', 340); pSv.setAttribute('height', 86); pSv.style.cssText = 'position:absolute;left:0;top:0'; blks[4].appendChild(pSv);
const pMini = [W(pSv, 'M150,54 H186 M266,54 H300', { 'stroke-width': 2.5, stroke: MU }), W(pSv, 'M190,42 H262 V66 H190 Z', { 'stroke-width': 2.5 }), W(pSv, 'M190,78 H262 M190,74 V82 M262,74 V82', { 'stroke-width': 1.5, stroke: MU })];
const DSR = [['Description and features', 'what the part is'], ['Absolute maximum ratings', 'limits you must never cross'], ['Electrical characteristics', 'minimum, typical, maximum'], ['Graphs', 'how it behaves, for example with heat'], ['Package', 'size and shape, to fit your board']];
$('#dsRows').innerHTML = DSR.map(([n, e], i) => `<div class="dsr" style="top:${76 + i * 102}px"><div class="n">${i + 1}</div><div class="nm">${n}</div><div class="ex">${e}</div></div>`).join('');
const dsr = [...$('#dsRows').children];
const tSec = [wt('S2', 'short'), wt('S3', 'absolute'), wt('S4', 'electrical'), wt('S5', 'graphs'), wt('S5', 'package')];

/* ================= K: key specs per part ================= */
const KS = [['Resistor', ['Resistance', 'Tolerance', 'Power rating']], ['Capacitor', ['Capacitance', 'Tolerance', 'Voltage rating']], ['Inductor', ['Inductance', 'Max current']]];
$('#kCards').innerHTML = KS.map(([n, sp], i) => `<div class="card kC" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:28px">KEY SPECS</div><svg width="512" height="130"></svg><div class="nm">${n}</div><div class="sp">${sp.map(s => `<span>${s}</span>`).join('')}</div></div>`).join('');
const kC = [...$('#kCards').children], kS = kC.map(c => c.querySelector('svg'));
const kZig = W(kS[0], 'M146,64 H190 L200,46 L220,82 L240,46 L260,82 L280,46 L300,82 L312,64 H366');
const kCap = [W(kS[1], 'M146,64 H240 M272,64 H366'), W(kS[1], 'M240,30 V98 M272,30 V98', { 'stroke-width': 7 })];
const kInd = W(kS[2], 'M146,74 H192 a16,16 0 0 1 32,0 a16,16 0 0 1 32,0 a16,16 0 0 1 32,0 a16,16 0 0 1 32,0 H366');
const kSp = kC.map(c => [...c.querySelectorAll('.sp span')]);
const tKs = [[wt('K1', 'resistance'), wt('K1', 'tolerance'), wt('K1', 'power')], [wt('K2', 'capacitance'), wt('K2', 'tolerance'), wt('K2', 'voltage')], [wt('K3', 'inductance'), wt('K3', 'largest')]];
const tolS = $('#tolS'), TX = r => 120 + (r - 900) * 6.8;
const tolAx = W(tolS, `M${TX(900)},120 H${TX(1100)}`, { 'stroke-width': 3, stroke: MU });
const tolBand = mk(tolS, 'rect', { x: TX(950), y: 98, width: 0, height: 44, rx: 8, fill: C.ac2, stroke: AM, 'stroke-width': 2 });
const tolTk = [[900, '900'], [950, '950 Ω'], [1000, '1000 Ω'], [1050, '1050 Ω'], [1100, '1100']].map(([r, s]) => { const g = mk(tolS, 'g'); W(g, `M${TX(r)},112 V128`, { 'stroke-width': 3, stroke: MU }); mono(g, TX(r), 166, s, { 'text-anchor': 'middle', 'font-size': 18, fill: r % 100 === 50 || r === 1000 ? INK : MU, 'font-weight': r === 1000 ? 600 : 500 }); return g; });
const tolMk = mk(tolS, 'path', { d: `M${TX(1000)},88 l-9,-14 h18 Z`, fill: INK });
const tolDots = [0, 1, 2, 3, 4].map(() => mk(tolS, 'circle', { r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const tolVals = [962, 1031, 994, 1046, 973];
const tolL = mono(tolS, 1560, 128, 'every real part lands inside the band', { 'text-anchor': 'end', 'font-size': 18, fill: '#B7791F', 'font-weight': 600 });

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const cw = [W(ck, 'M150,282 V150 H700 V226'), W(ck, 'M700,374 V450 H150 V318')];
const bat = [W(ck, 'M115,282 H185', { 'stroke-width': 5 }), W(ck, 'M132,318 H168', { 'stroke-width': 9 }), W(ck, 'M100,346 L196,256', { stroke: AM, 'stroke-width': 3.5 }), mk(ck, 'path', { d: 'M204,248 L184,252 L194,264 Z', fill: AM })];
const rBody = mk(ck, 'rect', { x: 674, y: 226, width: 52, height: 148, rx: 10, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const rZ = W(ck, 'M700,240 L716,252 L684,272 L716,292 L684,312 L716,332 L684,352 L700,362', { 'stroke-width': 3 });
const heat = [0, 1, 2].map(() => W(ck, '', { stroke: RD, 'stroke-width': 4 }));
const lb = [tx(ck, 64, 278, '+', { 'font-size': 28 }), tx(ck, 68, 336, '-', { 'font-size': 30 }), tx(ck, 214, 296, 'Supply'), mono(ck, 214, 324, 'variable'),
  tx(ck, 650, 292, 'Resistor', { 'text-anchor': 'end' }), mono(ck, 650, 320, '1 kΩ · 0.25 W', { 'text-anchor': 'end' })];
const hotT = mono(ck, 760, 300, 'OVER RATING', { fill: RD, 'font-weight': 600, 'font-size': 20 });
// power bar with the rating line
const pbBg = mk(ck, 'rect', { x: 40, y: 514, width: 848, height: 30, rx: 8, fill: C.soft });
const pbF = mk(ck, 'rect', { x: 40, y: 514, width: 0, height: 30, rx: 8, fill: GO });
const PX = p => 40 + 848 * p / 0.5;
const pbR = W(ck, `M${PX(0.25)},500 V558`, { stroke: RD, 'stroke-width': 4 });
const pbL = [mono(ck, 40, 494, 'POWER', { 'font-weight': 600, 'font-size': 17 }), mono(ck, PX(0.25) + 10, 494, 'RATING 0.25 W', { fill: RD, 'font-weight': 600, 'font-size': 17 }), mono(ck, 888, 494, '0.5 W', { 'text-anchor': 'end', 'font-size': 17 })];
const eB = flow(ck, [[150, 318], [150, 450], [700, 450], [700, 374], [700, 226], [700, 150], [150, 150], [150, 282]], 26, {
  skip: (x, y) => (Math.abs(x - 700) < 2 && y > 222 && y < 378) || (Math.abs(x - 150) < 2 && y > 278 && y < 322) });
const tUp = wt('B2', 'Turn'), t10 = wt('B3', 'ten') - 0.6, t20 = wt('B4', 'twenty') - 0.6;
const vB = τ => τ < tUp ? 0 : 5 * M.io((τ - tUp) / 1.2) + 5 * M.io((τ - t10) / 0.6) + 10 * M.io((τ - t20) / 0.8);
const qB = τ => { if (τ < tUp) return 0; const n = 50, d = (τ - tUp) / n; let s = 0; for (let i = 0; i < n; i++) s += vB(tUp + (i + 0.5) * d) * d; return s; };
const SC = scope($('#scS'), 592, 200);
const trV = SC.tr(TE), trP = SC.tr(AM);
const sLab = [SC.lab(14, 22, 'CH1 · V ACROSS R', '#5FC4C4'), SC.lab(14, 192, 'CH2 · MATH P = V²/R', AM)];
const sRate = mk($('#scS'), 'line', { x1: 6, x2: 586, y1: 190 - 0.25 * 320, y2: 190 - 0.25 * 320, stroke: RD, 'stroke-width': 2, 'stroke-dasharray': '8 6' });
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="rV" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.0</span><span class="u">mA</span>
  <span class="k" style="color:${GO}">P</span><span class="v" id="rP" style="color:${GO}">0.000</span><span class="u">W</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Right value, wrong rating. Lesson learnt!' });

/* ================= N: derivation + worked example ================= */
const nS = $('#nS');
const GX = v => 110 + v * 24, GY = p => 520 - p * 640;
const nAx = W(nS, 'M110,110 V520 H720', { 'stroke-width': 3 });
const nAxL = [tx(nS, 96, 126, 'P', { fill: GO, 'font-style': 'italic', 'font-size': 30, 'text-anchor': 'end' }), tx(nS, 732, 528, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 30 }),
  mono(nS, GX(10), 552, '10', { 'text-anchor': 'middle', 'font-size': 17 }), mono(nS, GX(20), 552, '20 V', { 'text-anchor': 'middle', 'font-size': 17 }), mono(nS, 100, GY(0.25) + 6, '0.25', { 'text-anchor': 'end', 'font-size': 17, fill: RD })];
const safe = mk(nS, 'path', { d: '', fill: C.okBg, stroke: 'none' });
const par = mk(nS, 'path', { d: '', fill: 'none', stroke: GO, 'stroke-width': 5, 'stroke-linecap': 'round' });
{ let d = '', sd = `M110,520`; for (let i = 0; i <= 60; i++) { const v = 25 * i / 60, p = v * v / 1000; d += (i ? 'L' : 'M') + GX(v).toFixed(1) + ',' + GY(Math.min(p, 0.64)).toFixed(1); }
  for (let i = 0; i <= 40; i++) { const v = 15.811 * i / 40; sd += 'L' + GX(v).toFixed(1) + ',' + GY(v * v / 1000).toFixed(1); } sd += `L${GX(15.811)},520 Z`; PUC.attr(par, 'd', d); PUC.attr(safe, 'd', sd); }
const rate = W(nS, `M110,${GY(0.25)} H720`, { stroke: RD, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const rateL = mono(nS, 716, GY(0.25) - 12, 'rating', { 'text-anchor': 'end', fill: RD, 'font-weight': 600, 'font-size': 18 });
const d10 = mk(nS, 'circle', { cx: GX(10), cy: GY(0.1), r: 9, fill: C.ok }), d20 = mk(nS, 'circle', { cx: GX(20), cy: GY(0.4), r: 9, fill: RD });
const dMax = mk(nS, 'circle', { cx: GX(15.811), cy: GY(0.25), r: 10, fill: INK });
const vMx = W(nS, `M${GX(15.811)},${GY(0.25)} V520`, { stroke: INK, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const vMxL = mono(nS, GX(15.811), 584, 'V max 15.8 V', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 });
const safeL = mono(nS, GX(5.5), 500, 'SAFE', { 'text-anchor': 'middle', fill: '#1F6B3F', 'font-weight': 600, 'font-size': 18 });
const dSteps = [
  [K(`${Pp} = ${Vv}\\,${Ii}`), 'power', 92],
  [K(`${Pp} = \\dfrac{${Vv}^{2}}{R} = ${Ii}^{2}R`), 'put I = V/R', 188],
  [K(`${Vv}_{\\max} = \\sqrt{${Pp}\\,R}`), 'largest safe voltage', 312],
  [K(`${Ii}_{\\max} = \\sqrt{${Pp}/R}`), 'largest safe current', 440]];
$('#nSteps').innerHTML = dSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const wRows = [
  [K(`R = 1\\,\\text{k}\\Omega,\\;\\; ${Pp} = 0.25\\,\\text{W}`), 'given', 92],
  [K(`${Vv}_{\\max} = \\sqrt{0.25\\times1000} \\approx 15.8\\,\\text{V}`), '', 240],
  [K(`${Ii}_{\\max} = \\sqrt{0.25/1000} \\approx 15.8\\,\\text{mA}`), '', 440]];
$('#wSteps').innerHTML = wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const dRows = [...$('#nSteps').children], wR = [...$('#wSteps').querySelectorAll('.st2')];
const tDer = [wt('D2', 'P'), wt('D3', 'From'), wt('D4', 'The'), wt('D5', 'And')];
const tWr = [wt('W1', 'One'), wt('W2', 'V'), wt('W3', 'I')];

/* ================= G: derating ================= */
const gS = $('#gS');
const DX = th => 140 + (th + 20) * 5.2, DY = pc => 500 - pc * 3.6;
const gAx = W(gS, `M${DX(-20)},120 V500 H${DX(180)}`, { 'stroke-width': 3 });
const gTk = [[0, '0'], [70, '70'], [155, '155 °C']].map(([th, s]) => mono(gS, DX(th), 534, s, { 'text-anchor': 'middle', 'font-size': 19, fill: th ? INK : MU, 'font-weight': th ? 600 : 500 }));
const gYt = [[100, '100 %'], [50, '50 %']].map(([pc, s]) => mono(gS, DX(-20) - 14, DY(pc) + 6, s, { 'text-anchor': 'end', 'font-size': 18 }));
const gYl = mono(gS, DX(-20) + 12, 110, 'allowed power', { 'font-size': 18, fill: GO, 'font-weight': 600 });
const gXl = mono(gS, DX(180), 500 - 14, 'θ', { 'text-anchor': 'end', 'font-size': 22, fill: RD, 'font-weight': 600 });
const gFlat = W(gS, `M${DX(-20)},${DY(100)} H${DX(70)}`, { stroke: GO, 'stroke-width': 6 });
const gDrop = W(gS, `M${DX(70)},${DY(100)} L${DX(155)},${DY(0)}`, { stroke: GO, 'stroke-width': 6 });
const g70 = W(gS, `M${DX(70)},${DY(100)} V500`, { stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gDot = mk(gS, 'circle', { r: 12, fill: RD, stroke: '#fff', 'stroke-width': 3 });
const gDer = mk(gS, 'g'); { mk(gDer, 'rect', { x: DX(100) - 10, y: DY(78) - 30, width: 150, height: 42, rx: 9, fill: C.ac2 }); mono(gDer, DX(100) + 65, DY(78) - 2, 'DERATING', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18, fill: '#8A5A12' }); }
$('#gRo').innerHTML = `<span class="k" style="color:${RD};font-style:normal">θ</span><span class="v" id="gT" style="color:${RD}">25</span><span class="u">°C</span>
  <span class="k" style="color:${GO}">P<sub>max</sub></span><span class="v" id="gP" style="color:${GO}">0.250</span><span class="u">W</span>`;
const tG2 = wt('G2', 'seventy'), tG3 = wt('G3', 'Above');
const thG = t => t < tG2 - 1 ? 25 : t < tG3 ? 25 + 45 * M.io((t - tG2 + 1) / 1.6) : 70 + 85 * M.io((t - tG3 - 0.2) / 4.2);
const pAllow = th => th <= 70 ? 0.25 : Math.max(0, 0.25 * (155 - th) / 85);

/* ================= X: exam trap ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Absolute maximum = a safe working value', right: 'Work inside the recommended values', y0: 96, y1: 184 });
const tcS = $('#tcS');
const zn = [[40, 420, C.okBg, '#1F6B3F', 'RECOMMENDED'], [460, 160, C.ac2, '#8A5A12', 'MARGIN'], [620, 124, C.redBg, RD, 'DAMAGE']];
const zR = zn.map(([x, w, f]) => mk(tcS, 'rect', { x, y: 110, width: w, height: 64, rx: 10, fill: f }));
const zL = zn.map(([x, w, f, c, s]) => mono(tcS, x + w / 2, 150, s, { 'text-anchor': 'middle', fill: c, 'font-weight': 600, 'font-size': 18 }));
const zAbs = W(tcS, 'M620,96 V188', { stroke: RD, 'stroke-width': 4 });
const zAbsL = mono(tcS, 620, 220, 'absolute maximum', { 'text-anchor': 'middle', fill: RD, 'font-weight': 600, 'font-size': 18 });
const zHere = mk(tcS, 'path', { d: 'M250,96 l-10,-16 h20 Z', fill: INK });
const zHereL = mono(tcS, 250, 220, 'design here', { 'text-anchor': 'middle', fill: '#1F6B3F', 'font-weight': 600, 'font-size': 18 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'List the specifications of a resistor or capacitor, work out a power rating or a tolerance range' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 470&nbsp;Ω resistor is rated 0.5&nbsp;W. What is the largest current it can safely carry?', qW: 780,
  opts: [K('1.06\\,\\text{mA}'), K('15.3\\,\\text{mA}'), K('32.6\\,\\text{mA}'), K('65.2\\,\\text{mA}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${Ii}_{\\max} = \\sqrt{${Pp}/R}`)], [K(`= \\sqrt{0.5/470}`)], [K(`= \\sqrt{0.00106}`)], [K(`\\approx 32.6\\,\\text{mA}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Use'), wt('A3', 'That'), wt('A4', 'The'), wt('A4', 'About')];

/* ================= F: formula card + coming up ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 92, dy: 100, title: 'Specifications and datasheets · formula card', txt: [0, 0, 1, 1],
  lines: [K(`${Pp} = ${Vv}${Ii} = \\dfrac{${Vv}^{2}}{R} = ${Ii}^{2}R`),
    K(`${Vv}_{\\max} = \\sqrt{${Pp}R} \\qquad ${Ii}_{\\max} = \\sqrt{${Pp}/R}`),
    'Tolerance ±5 %: 1 kΩ can be 950 to 1050 Ω',
    'Absolute maximum = never cross · above a set temperature, derate'] });
const nx = PUC.next($('#sF'), { label: 'COMING UP', topic: 'More PUC Electronics soon - follow the playlist', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [T0('S3'), 1.1, 560, 470], [T0('S4') + 0.2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gA = t >= tS + 0.5 && t < tT, gB = t >= tW && t < tX;
  M.vis(ghost, t, gA ? tS + 0.5 : tW + 0.2, gA ? tT - 0.4 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gA && !gB) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tS + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tS - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis(hkB, t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.25 }); M.draw(hkW, t, tMorph + 0.8, 0.3); M.vis(hkR, t, tMorph + 0.9, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    const hu = M.io((t - tHot + 0.6) / 1.2); PUC.attr(hkR._b, 'fill', M.mix('#E9D8B4', '#8A5A3A', hu * 0.8));
    hkH.forEach((h, k) => { const ph = ((t - tHot) * 0.9 + k / 3) % 1; wavy(h, 112 + k * 48, 168 - 60 * ph); h.style.opacity = t < tHot - 0.6 ? 0 : (hu * 0.9 * Math.sin(Math.PI * ph)).toFixed(3); });
    smoke.forEach((s, k) => { const ph = ((t - tSmell) * 0.5 + k / 2) % 1; PUC.attr(s, 'd', `M${150 + k * 30},${(150 - 80 * ph).toFixed(1)} q14,-14 0,-28 q-14,-14 0,-28`); s.style.opacity = t < tSmell ? 0 : (0.7 * Math.sin(Math.PI * ph)).toFixed(3); });
    M.vis($('#aPill'), t, tHot, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, wt('H1', 'right') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(vR, t, wt('H1', 'right'), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(vBand, t, wt('H1', 'value'), 1e9, { dy: 0, fade: 0.2 });
    fadeAt([$('#thN'), $('#thL')], t, wt('H1', 'value'));
    M.vis($('#nwC'), t, T0('H2') - 0.1, out, { dy: 36, ...o });
    const c1 = $('#ck1'), c2 = $('#ck2');
    M.vis(c1, t, wt('H2', 'value'), 1e9, { dx: -12, dy: 0 }); M.vis(c2, t, wt('H2', 'what'), 1e9, { dx: -12, dy: 0 });
    PUC.setIco(c1.querySelector('.m'), 'check', '#fff', 26, 3); c1.querySelector('.m').style.background = C.ok;
    PUC.setIco(c2.querySelector('.m'), t >= T0('I1') ? 'check' : 'help', '#fff', 26, 2.6); c2.querySelector('.m').style.background = t >= T0('I1') ? AM : MU;
    M.setT(c2.lastChild, t >= wt('I1', 'specifications') ? 'Specifications' : 'Something else?');
    M.vis(tq, t, wt('H2', 'wrong'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
  }

  /* S: datasheet sections */
  const sOn2 = t >= tS - 0.05 && t < tK + 0.1; M.hide($('#sS'), !sOn2);
  if (sOn2) {
    const out = tK - 0.32;
    M.vis($('#dsL'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dsR'), t, tS + 0.25, out, { dx: 60, dy: 0, ...o });
    blks.forEach((b, i) => { M.vis(b, t, tS + 0.4 + i * 0.1, 1e9, { dy: 14 }); const lit = i < 5 ? M.io((t - tSec[i]) / 0.3) : 0; b.style.borderColor = M.mix(C.line, AM, lit); b.style.background = M.mix('#FFFFFF', C.ac3, lit); });
    drawSeq(gMini, t, tS + 0.9, 0.4, 0.2); drawSeq(pMini, t, tS + 1.0, 0.3, 0.1);
    dsr.forEach((r, i) => { M.vis(r, t, tSec[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const lit = M.io((t - tSec[i]) / 0.3) * (i < 4 ? 1 - M.io((t - tSec[i + 1]) / 0.3) : 1);
      r.style.background = M.mix(C.soft, C.ac2, lit); });
  }

  /* K: key specs + tolerance */
  const kOn = t >= tK - 0.05 && t < tB + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tB - 0.32;
    kC.forEach((c, i) => M.vis(c, t, tK + 0.1 + i * 0.12, out, { dy: 36, ...o }));
    M.draw(kZig, t, tK + 0.4, 0.5); drawSeq(kCap, t, wt('K2', 'capacitor') - 0.2, 0.3, 0.1); M.draw(kInd, t, wt('K3', 'inductor') - 0.2, 0.5);
    kC.forEach((c, i) => { const u = M.io((t - (i ? [0, wt('K2', 'capacitor'), wt('K3', 'inductor')][i] : wt('K1', 'resistor'))) / 0.3); c.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, u); });
    kSp.forEach((sp, i) => sp.forEach((s, j) => { M.vis(s, t, tKs[i][j] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); const lit = M.io((t - tKs[i][j]) / 0.25); s.style.background = M.mix(C.soft, C.ac2, lit); }));
    M.vis($('#tolC'), t, T0('K4') - 0.1, out, { dy: 36, ...o });
    M.draw(tolAx, t, T0('K4') + 0.2, 0.5); fadeAt(tolTk, t, T0('K4') + 0.4, 0.06); M.vis(tolMk, t, wt('K4', 'printed'), 1e9, { dy: 0, fade: 0.2 });
    const bw = M.io((t - wt('K4', 'five')) / 0.6); PUC.attr(tolBand, 'x', (TX(1000) - (TX(1050) - TX(1000)) * bw).toFixed(1)); PUC.attr(tolBand, 'width', (2 * (TX(1050) - TX(1000)) * bw).toFixed(1)); M.hide(tolBand, bw <= 0);
    tolDots.forEach((d, k) => { const a = wt('K4', 'anywhere') + k * 0.35; PUC.attr(d, 'cx', TX(tolVals[k]).toFixed(1)); PUC.attr(d, 'cy', '120'); M.vis(d, t, a, 1e9, { dy: -20, sc: 0.5, sp: M.POP, fade: 0.1 }); });
    M.vis(tolL, t, wt('K4', 'fifty') - 0.3, 1e9, { dy: 0, fade: 0.2 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(cw, t, tB + 0.5, 0.45, 0.2); drawSeq(bat.slice(0, 3), t, tB + 0.7, 0.25, 0.1); M.vis(bat[3], t, tB + 1.0, 1e9, { dy: 0, fade: 0.2 });
    M.vis(rBody, t, wt('B1', 'kilo') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(rZ, t, wt('B1', 'kilo'), 0.4); fadeAt(lb, t, wt('B1', 'kilo'), 0.06);
    [pbBg, ...pbL].forEach((e, i) => M.vis(e, t, wt('B1', 'power') - 0.1 + i * 0.05, 1e9, { dy: 0, fade: 0.2 })); M.draw(pbR, t, wt('B1', 'quarter'), 0.3);
    const v = vB(t), i = v, p = v * v / 1000, over = M.clamp((p - 0.25) / 0.1);
    PUC.attr(pbF, 'width', (848 * Math.min(p, 0.5) / 0.5).toFixed(1)); PUC.attr(pbF, 'fill', p > 0.25 ? RD : GO);
    PUC.attr(rBody, 'fill', p <= 0.25 ? M.mix('#FFFFFF', '#FCE9C4', p / 0.25) : M.mix('#FCE9C4', '#F3B4B4', over));
    heat.forEach((h, k) => { const ph = ((t - t20) * 0.9 + k / 3) % 1; wavy(h, 742 + k * 26, 280 - 40 * ph); h.style.opacity = (over * 0.9 * Math.sin(Math.PI * ph)).toFixed(3); M.hide(h, over <= 0); });
    M.vis(hotT, t, wt('B4', 'above') - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(hotT, 'x', '770'); PUC.attr(hotT, 'y', '200');
    eB.set(-14 * qB(t), t >= tUp - 0.1);
    trV(τ => 7 * vB(τ), t, tUp - 0.5, 7, 186, t >= tUp - 0.5); trP(τ => 320 * vB(τ) * vB(τ) / 1000, t, tUp - 0.5, 7, 190, t >= tUp - 0.5);
    sLab.forEach(e => M.vis(e, t, tUp - 0.4, 1e9, { dy: 0, fade: 0.2 })); M.vis(sRate, t, wt('B4', 'above') - 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ro1'), t, tUp - 0.3, 1e9, { dy: 12 });
    M.setT($('#rV'), v.toFixed(1)); M.setT($('#rI'), i.toFixed(1)); M.setT($('#rP'), p.toFixed(3)); $('#rP').style.color = p > 0.25 ? RD : GO;
    avB(t, wt('B5', 'value') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tN; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tN - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'rating') - 0.25, { out: tN - 0.35, outDur: 0.25 }); }

  /* N: derivation + worked example */
  const nOn = t >= tN - 0.05 && t < tG + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tG - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, tN + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(nAx, t, tN + 0.5, 0.6); fadeAt(nAxL, t, tN + 0.9, 0.06);
    M.draw(par, t, wt('D3', 'squared') - 0.2, 1.0); M.draw(rate, t, wt('D4', 'rating') - 0.1, 0.6); M.vis(rateL, t, wt('D4', 'rating') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(safe, t, wt('D4', 'safe') - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(safeL, t, wt('D4', 'safe') + 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(dMax, t, wt('D4', 'square'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.draw(vMx, t, tWr[1] + 0.3, 0.4); M.vis(vMxL, t, tWr[1] + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.vis(d10, t, wt('W3', 'Twenty') - 0.6, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(d20, t, wt('W3', 'Twenty'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#nRL1'), t, tN + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#nRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dRows.forEach((r, i) => { M.vis(r, t, tDer[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDer[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDer[i], 0.6); M.vis(r.querySelector('.why'), t, tDer[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#nBox'), t, tDer[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#nUnit'), t, wt('D5', 'watts') - 0.3, tW - 0.3, { dy: 12, outDur: 0.25 });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWr[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWr[i] - 0.15); });
  }

  /* G: derating */
  const gOn = t >= tG - 0.05 && t < tX + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gC'), t, tG + 0.1, tX - 0.32, { dy: 36, ...o });
    M.draw(gAx, t, tG + 0.4, 0.6); fadeAt([...gTk, ...gYt, gYl, gXl], t, tG + 0.7, 0.05);
    M.draw(gFlat, t, tG2 - 0.6, 0.8); M.draw(g70, t, tG2, 0.4); M.draw(gDrop, t, tG3, 1.2, M.o3); M.vis(gDer, t, wt('G3', 'derating') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const th = thG(t), pa = pAllow(th);
    PUC.attr(gDot, 'cx', DX(th).toFixed(1)); PUC.attr(gDot, 'cy', DY(100 * pa / 0.25).toFixed(1)); M.vis(gDot, t, tG2 - 0.6, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    M.vis($('#gRo'), t, tG2 - 0.8, 1e9, { dy: 12 }); M.setT($('#gT'), String(Math.round(th))); M.setT($('#gP'), pa.toFixed(3));
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Always') - 0.1 });
    const a = [wt('X3', 'recommended'), wt('X3', 'room'), wt('X3', 'damage')];
    zR.forEach((r, i) => { const w = zn[i][1], u = M.io((t - a[i] + 0.1) / 0.5); PUC.attr(r, 'width', (w * u).toFixed(1)); M.hide(r, u <= 0); M.vis(zL[i], t, a[i] + 0.3, 1e9, { dy: 0, fade: 0.2 }); });
    M.draw(zAbs, t, a[2], 0.3); M.vis(zAbsL, t, a[2] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(zHere, t, a[0] + 0.5, 1e9, { dy: -12, sp: M.POP, fade: 0.1 }); M.vis(zHereL, t, a[0] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'List') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + COMING UP */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
