// PUC Electronics Ep 27 - Capacitors and capacitance ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink; power P gold
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, PW = C.gold;
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const ctr = e => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center'; return e; };

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

/* capacitor symbol: two parallel plates (vertical by default) with leads */
const capSym = (p, cx, cy, o = {}) => { const h = o.h ?? 90, g = o.gap ?? 26, l = o.lead ?? 80, sw = o.sw ?? 8, vert = o.vert;
  if (!vert) return [W(p, `M${cx - g / 2 - l},${cy} H${cx - g / 2}`), W(p, `M${cx - g / 2},${cy - h / 2} V${cy + h / 2}`, { 'stroke-width': sw, 'stroke-linecap': 'butt' }), W(p, `M${cx + g / 2},${cy - h / 2} V${cy + h / 2}`, { 'stroke-width': sw, 'stroke-linecap': 'butt' }), W(p, `M${cx + g / 2},${cy} H${cx + g / 2 + l}`)];
  return [W(p, `M${cx},${cy - g / 2 - l} V${cy - g / 2}`), W(p, `M${cx - h / 2},${cy - g / 2} H${cx + h / 2}`, { 'stroke-width': sw, 'stroke-linecap': 'butt' }), W(p, `M${cx - h / 2},${cy + g / 2} H${cx + h / 2}`, { 'stroke-width': sw, 'stroke-linecap': 'butt' }), W(p, `M${cx},${cy + g / 2} V${cy + g / 2 + l}`)]; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'But') - 0.2;
const tI = T0('I1'), tB = T0('B1'), tC = T0('C1'), tP = T0('P1'), tST = T0('ST'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tST, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const chS = $('#chS');
const sock = [W(chS, 'M40,30 H260 V110 H40 Z', { fill: '#fff', 'stroke-width': 4 }), W(chS, 'M128,62 V82 M172,62 V82', { 'stroke-width': 6 })];
const chgO = mk(chS, 'g'), chg = mk(chgO, 'g');
const chB = [W(chg, 'M95,130 H205 V250 H95 Z', { fill: '#fff', 'stroke-width': 5 }), W(chg, 'M128,130 V106 M172,130 V106', { 'stroke-width': 6 }), W(chg, 'M150,250 C150,300 110,320 110,380', { 'stroke-width': 4 })];
const chL = mk(chg, 'circle', { cx: 150, cy: 200, r: 16, fill: AM, stroke: INK, 'stroke-width': 3 });
const tPull = wt('H1', 'pulls');
const glow = t => t < tPull ? 1 : Math.exp(-(t - tPull) / 1.1);
const lgS = $('#lgS'); mk(lgS, 'rect', { x: 0, y: 0, width: 460, height: 176, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(lgS, 'line', { x1: 460 * i / 6, y1: 0, x2: 460 * i / 6, y2: 176, stroke: '#2A3758', 'stroke-width': 1.5 });
for (let j = 1; j < 4; j++) mk(lgS, 'line', { x1: 0, y1: 44 * j, x2: 460, y2: 44 * j, stroke: '#2A3758', 'stroke-width': 1.5 });
const lgP = mk(lgS, 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const lgT = mk(lgS, 'text', { x: 12, y: 24, 'font-family': 'IBM Plex Mono', 'font-size': 16, fill: AM }); lgT.textContent = 'BRIGHTNESS';
const lgU = mk(lgS, 'line', { x1: 0, y1: 10, x2: 0, y2: 170, stroke: '#8FA3C8', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const capP = capSym($('#capS'), 120, 95, { h: 110, gap: 30, lead: 70 });

/* ================= I: what it is ================= */
const iS = $('#iS');
const iPl = [mk(iS, 'rect', { x: 252, y: 110, width: 22, height: 300, rx: 4, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 }), mk(iS, 'rect', { x: 510, y: 110, width: 22, height: 300, rx: 4, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 })];
const iDi = mk(iS, 'rect', { x: 276, y: 118, width: 232, height: 284, fill: '#E9EDF5' });
const iHat = [...Array(9)].map((_, k) => W(iS, `M${290 + k * 26},${130} L${290 + k * 26 - 10},${390}`, { stroke: '#C9D2E3', 'stroke-width': 2 }));
const iLd = [W(iS, 'M252,260 H110'), W(iS, 'M532,260 H674')];
const iLb = [mono(iS, 263, 92, 'METAL PLATE', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(iS, 521, 92, 'METAL PLATE', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }),
  mono(iS, 392, 444, 'DIELECTRIC · AN INSULATOR', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 18 })];
const iPill = document.createElement('div'); iPill.className = 'pillp ink'; iPill.style.cssText = 'left:32px;top:500px'; iPill.textContent = 'Two plates + an insulator between them'; $('#iL').appendChild(iPill);
const DIEL = ['Air', 'Paper', 'Mica', 'Plastic', 'Ceramic'];
$('#dPills').innerHTML = DIEL.map((d, i) => `<div class="pillp" style="left:${32 + [0, 110, 250, 380, 540][i]}px;top:84px">${d}</div>`).join('');
const DP = [...$('#dPills').children];
const tDi = DIEL.map(d => wt('I2', d.toLowerCase()));
const symS = $('#symS'), symP = capSym(symS, 392, 400, { h: 150, gap: 44, lead: 200, sw: 10 });
const symC = tx(symS, 392, 300, 'C', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 36 });
const symG = [W(symS, 'M372,500 V514 H412 V500', { stroke: AM, 'stroke-width': 3 }), mono(symS, 392, 544, 'GAP', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 18 })];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bW = [W(ck, 'M120,300 V140 H220'), W(ck, 'M360,140 H446'), W(ck, 'M520,140 V300'), W(ck, 'M520,340 V520'), W(ck, 'M120,336 V520 H780 V370'), W(ck, 'M780,290 V140 H594')];
const bZ = W(ck, 'M220,140 L235,114 L265,166 L295,114 L325,166 L345,114 L360,140');
const bBat = [W(ck, 'M85,300 H155', { 'stroke-width': 5 }), W(ck, 'M102,336 H138', { 'stroke-width': 9 })];
const bCap = [W(ck, 'M460,300 H580', { 'stroke-width': 8, 'stroke-linecap': 'butt' }), W(ck, 'M460,340 H580', { 'stroke-width': 8, 'stroke-linecap': 'butt' })];
const bSwC = [mk(ck, 'circle', { cx: 450, cy: 140, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 590, cy: 140, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 520, cy: 140, r: 8, fill: INK })];
const bLev = W(ck, 'M520,140 H584', { 'stroke-width': 5 });
const bLamp = mk(ck, 'circle', { cx: 780, cy: 330, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), bLX = [W(ck, 'M752,302 L808,358'), W(ck, 'M808,302 L752,358')];
const bJ = mk(ck, 'circle', { cx: 520, cy: 520, r: 7, fill: INK });
const bLb = [tx(ck, 58, 296, '+', { 'font-size': 28 }), tx(ck, 62, 354, '-', { 'font-size': 30 }), mono(ck, 172, 326, '9 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }),
  tx(ck, 290, 96, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 26 }), mono(ck, 290, 200, '1 kΩ', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }),
  tx(ck, 450, 112, 'A', { 'text-anchor': 'middle', 'font-size': 22 }), tx(ck, 590, 112, 'B', { 'text-anchor': 'middle', 'font-size': 22 }),
  tx(ck, 604, 314, 'C', { 'font-style': 'italic', 'font-size': 26 }), mono(ck, 604, 342, '100 µF', { fill: INK, 'font-weight': 600 }), tx(ck, 840, 324, 'Lamp', { 'font-size': 22 })];
const bPlus = [474, 498, 542, 566].map(x => tx(ck, x, 286, '+', { 'text-anchor': 'middle', fill: OR, 'font-size': 24, 'font-weight': 700 }));
const bMin = [474, 498, 542, 566].map(x => tx(ck, x, 370, '-', { 'text-anchor': 'middle', fill: OR, 'font-size': 28, 'font-weight': 700 }));
const bNo = [mk(ck, 'rect', { x: 456, y: 307, width: 128, height: 26, rx: 6, fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '7 6' }), mono(ck, 536, 446, 'NO ELECTRON CROSSES', { fill: C.red, 'font-weight': 600, 'font-size': 18 })];
const sk1 = (x, y) => (y < 142 && x > 214 && x < 366);
const eA = flow(ck, [[120, 336], [120, 520], [520, 520], [520, 344]], 12);
const eB = flow(ck, [[520, 296], [520, 140], [450, 140], [120, 140], [120, 300]], 16, { skip: sk1 });
const eD = flow(ck, [[520, 344], [520, 520], [780, 520], [780, 370], [780, 290], [780, 140], [590, 140], [520, 140], [520, 296]], 22, { skip: (x, y) => Math.abs(x - 780) < 2 && y > 286 && y < 374 });
const tCh = wt('B2', 'Close'), tFlip = wt('B6', 'flip') + 0.2, TAU = 1.1, TAU2 = 1.5;
const Vc = τ => { if (τ < tCh) return 0; const v1 = 9 * (1 - Math.exp(-(Math.min(τ, tFlip) - tCh) / TAU)); return τ < tFlip ? v1 : v1 * Math.exp(-(τ - tFlip) / TAU2); };
const V1f = 9 * (1 - Math.exp(-(tFlip - tCh) / TAU));
const SC = scope($('#scS'), 592, 200), trIn = SC.tr('#8FA3C8'), trC = SC.tr(AM);
const sL = [SC.lab(14, 26, 'CH1 · V IN (AT A)', '#8FA3C8'), SC.lab(14, 190, 'CH2 · V ACROSS C', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>C</sub></span><span class="v" id="r1V" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k" style="color:${OR}">Q</span><span class="v" id="r1Q" style="color:${OR}">0</span><span class="u">µC</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="r1I" style="color:${VI}">0.00</span><span class="u">mA</span>`;

/* ================= C: Q = CV ================= */
const cS = $('#cS');
const G = PUC.graph(cS, { x: 120, y: 84, w: 560, h: 330, xmax: 10, ymax: 1000, xt: [0, 2, 4, 6, 8, 10], yt: [0, 500, 1000], yl: 'Q (µC)' });
const cXl = mono(cS, 680, 472, 'V (volts)', { 'text-anchor': 'end', fill: TE, 'font-size': 18 });
G.ylab.setAttribute('fill', OR);
const cLine = G.curve(INK, 4), cDot = G.dot(OR, 11);
const cGx = mk(cS, 'path', { d: '', fill: 'none', stroke: TE, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' }), cGy = mk(cS, 'path', { d: '', fill: 'none', stroke: OR, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' });
const cRd = mono(cS, 0, 0, '', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const cSl = mono(cS, 470, 170, 'SLOPE = C', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const tV1 = wt('C2', 'Double'), tV2 = wt('C2', 'double', 1);
const Vg = t => 4.5 * M.io((t - tV1 + 0.6) / 1.0) + 4.5 * M.io((t - tV2) / 1.0);
const cDer = [[K(`${tc(OR, 'Q')} \\propto ${tc(TE, 'V')}`), 'double V, double Q', 84], [K(`${tc(OR, 'Q')} = ${tc(INK, 'C')}\\,${tc(TE, 'V')}`), 'C is the capacitance', 172],
  [K(`${tc(INK, 'C')} = \\dfrac{${tc(OR, 'Q')}}{${tc(TE, 'V')}}`), 'charge stored per volt', 254], [K(`1\\,\\text{F} = 1\\,\\text{C/V}`), 'the farad, after Michael Faraday', 382]];
$('#cSteps').innerHTML = cDer.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const cRows = [...$('#cSteps').children];
$('#cPre').innerHTML = [['µF', '-6'], ['nF', '-9'], ['pF', '-12']].map(([u, e], i) => `<div class="pre" style="left:${36 + i * 238}px">${K(`1\\,\\text{${u === 'µF' ? '\\mu F' : u}} = 10^{${e}}\\,\\text{F}`)}</div>`).join('');
const cPre = [...$('#cPre').children];
const tCd = [tC + 0.6, wt('C3', 'So'), wt('C4', 'C'), wt('C5', 'coulombs', 1)];
const avC = PUC.avatar($('#sC'), { x: 192, y: 772, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So C is just the slope of that line!' });

/* ================= P: parallel plates + worked example ================= */
const pS = $('#pS');
const plA = mk(pS, 'rect', { x: 0, y: 0, width: 18, height: 10, rx: 3, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 }), plB = mk(pS, 'rect', { x: 0, y: 0, width: 18, height: 10, rx: 3, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 });
const slab = mk(pS, 'rect', { x: 0, y: 0, width: 10, height: 10, fill: '#DCE4F2', stroke: '#9FB0CF', 'stroke-width': 2 });
const fld = [...Array(5)].map(() => mk(pS, 'line', { stroke: '#B8BCC6', 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const pPl = [...Array(6)].map(() => tx(pS, 0, 0, '+', { 'text-anchor': 'middle', fill: OR, 'font-size': 24, 'font-weight': 700 })), pMi = [...Array(6)].map(() => tx(pS, 0, 0, '-', { 'text-anchor': 'middle', fill: OR, 'font-size': 28, 'font-weight': 700 }));
const pLd = [W(pS, ''), W(pS, '')];
const aBr = W(pS, '', { stroke: AM, 'stroke-width': 3 }), aLb = mono(pS, 0, 0, 'A', { fill: C.gold, 'font-weight': 700, 'font-size': 24, 'font-style': 'italic', 'text-anchor': 'end' });
const dBr = W(pS, '', { stroke: AM, 'stroke-width': 3 }), dLb = mono(pS, 0, 0, 'd', { fill: C.gold, 'font-weight': 700, 'font-size': 24, 'font-style': 'italic', 'text-anchor': 'middle' });
const kLb = mono(pS, 392, 0, 'K', { fill: '#5F7399', 'font-weight': 700, 'font-size': 22, 'text-anchor': 'middle' });
$('#pKs').innerHTML = [['AREA A', 'm²'], ['GAP d', 'mm'], ['K', ''], ['C', 'pF']].map(([a, u], i) => `<div class="pk" style="left:${32 + i * 182}px"><div class="a">${a}</div><div class="b"><span class="pv"></span> <span style="font-size:20px;color:var(--mute)">${u}</span></div></div>`).join('');
const PK = [...$('#pKs').querySelectorAll('.pv')];
const tAr = wt('P2', 'bigger'), tGp = wt('P3', 'closer'), tK1 = wt('P6', 'slide'), tWK = wt('W5', 'Fill');
const st = t => { const a = M.io((t - tAr) / 1.2), g = M.io((t - tGp) / 1.2);
  const k = t < tST ? M.io((t - tK1) / 0.9) : (t >= tW ? M.io((t - tWK) / 0.9) : 0); return { a, g, k }; };
const pDer = [[K(`${tc(INK, 'C')} \\propto A`), 'bigger plates, more room for charge', 84], [K(`${tc(INK, 'C')} \\propto \\dfrac{1}{d}`), 'closer plates pull harder', 160],
  [K(`${tc(INK, 'C')} = \\dfrac{\\varepsilon_0 A}{d}`), 'in air', 254], [K(`\\varepsilon_0 = 8.85\\times10^{-12}\\,\\text{F/m}`), '', 338], [K(`${tc(INK, 'C')} = \\dfrac{K\\,\\varepsilon_0 A}{d}`), 'K = dielectric constant', 410]];
$('#pSteps').innerHTML = pDer.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const pRows = [...$('#pSteps').children];
const tPd = [wt('P2', 'C'), wt('P3', 'C'), wt('P4', 'C'), wt('P5', 'Epsilon'), wt('P6', 'So')];
const wRows = [[K(`A = 0.01\\,\\text{m}^2,\\quad d = 10^{-3}\\,\\text{m}`), '', 84], [K(`${tc(INK, 'C')} = \\dfrac{8.85\\times10^{-12}\\times 0.01}{10^{-3}}`), '', 166],
  [K(`${tc(INK, 'C')} = 8.85\\times10^{-11}\\,\\text{F} \\approx 88.5\\,\\text{pF}`), '', 290], [K(`K = 5:\\ \\ ${tc(INK, 'C')} \\approx 442\\,\\text{pF}`), '', 404]];
$('#wSteps').innerHTML = wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const wR = [...$('#wSteps').children];
const tWr = [wt('W2', 'area'), wt('W3', 'C'), wt('W4', 'That'), wt('W5', 'Fill')];
const dimL = [mono(pS, 0, 0, '10 cm × 10 cm', { fill: INK, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'end' }), mono(pS, 0, 0, '1 mm', { fill: INK, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'middle' })];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Higher voltage gives a bigger capacitance', right: 'Q doubles, but C = Q/V stays the same', y0: 96, y1: 184 });
const xS = $('#tcS'), xCap = capSym(xS, 150, 170, { h: 100, gap: 30, lead: 70 });
const xCL = tx(xS, 150, 104, 'C', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 });
$('#xRo').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="xV" style="color:${TE}">5</span><span class="u">V</span>
  <span class="k" style="color:${OR}">Q</span><span class="v" id="xQ" style="color:${OR}">500</span><span class="u">µC</span>
  <span class="k">C</span><span class="v" id="xC">100</span><span class="u">µF</span>`;
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET', 'PUC BOARDS'], type: 'New C when the gap changes or a dielectric goes in, Q = CV, define capacitance and the farad' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A parallel plate capacitor has plates of area 0.02&nbsp;m², 0.5&nbsp;mm apart, filled with a dielectric of <i>K</i>&nbsp;=&nbsp;4. It is charged to 50&nbsp;V. The charge stored is about:', qW: 780,
  opts: [K('17.7\\,\\text{nC}'), K('70.8\\,\\text{nC}'), K('1.42\\,\\text{nC}'), K('7.08\\,\\text{nC}')], right: 1, optW: 474, optY: 350 });
const sol = PUC.solution($('#so'), [[K(`${tc(INK, 'C')} = \\dfrac{4 \\times 8.85\\times10^{-12} \\times 0.02}{5\\times10^{-4}}`)], [K(`${tc(INK, 'C')} \\approx 1.42\\,\\text{nF}`)],
  [K(`${tc(OR, 'Q')} = ${tc(INK, 'C')}\\,${tc(TE, 'V')} = 1.416\\times10^{-9}\\times 50`)], [K(`${tc(OR, 'Q')} \\approx 70.8\\,\\text{nC}`)]], { dy: 116, y0: 100 });
$('#so').querySelectorAll('.sx').forEach(e => e.style.fontSize = '26px');
const tSol = [wt('A2', 'First'), wt('A2', 'That'), wt('A3', 'Then'), wt('A4', 'about')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 96, dy: 84, title: 'Capacitors and capacitance · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K(`${tc(OR, 'Q')} = ${tc(INK, 'C')}\\,${tc(TE, 'V')} \\qquad ${tc(INK, 'C')} = ${tc(OR, 'Q')}/${tc(TE, 'V')} \\qquad 1\\,\\text{F} = 1\\,\\text{C/V}`),
    K(`${tc(INK, 'C')} = \\dfrac{K\\,\\varepsilon_0 A}{d}`),
    K(`\\varepsilon_0 = 8.85\\times10^{-12}\\,\\text{F/m}`),
    '1 µF = 10⁻⁶ F · 1 nF = 10⁻⁹ F · 1 pF = 10⁻¹² F',
    'No charge crosses the dielectric. C depends only on A, d and K.'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 28', topic: 'Capacitor types and ratings', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tBz = wt('B4', 'Notice') - 0.2, tBz2 = T0('B5');
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tBz, 1.12, 680, 580], [tBz2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const g1 = t >= tB + 0.5 && t < tP, g2 = t >= tW + 0.3 && t < tX;
  M.vis(ghost, t, t < tW ? tB + 0.5 : tW + 0.3, t < tW ? tP - 0.32 : tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!g1 && !g2) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(sock, t, tMorph + 0.6, 0.4, 0.15); M.vis(chg, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.25 });
    const pull = M.spring(t - tPull, M.SOFT); chgO.setAttribute('transform', `translate(0,${(46 * pull).toFixed(1)})`);
    PUC.attr(chL, 'fill', M.mix('#FFFFFF', AM, glow(t)));
    M.vis($('#aPill'), t, tPull + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, wt('H1', 'indicator') - 0.2, out, { dx: 60, dy: 0, ...o });
    { const t0 = tPull - 1.2, span = 5.5; let d = ''; const now = Math.min(t, t0 + span);
      for (let i = 0; i <= 120; i++) { const tau = t0 + span * i / 120; if (tau > now) break; const x = 8 + 444 * i / 120, y = 160 - 130 * glow(tau); d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
      PUC.attr(lgP, 'd', t >= t0 ? d : ''); const ux = 8 + 444 * (tPull - t0) / span; PUC.attr(lgU, 'x1', ux); PUC.attr(lgU, 'x2', ux); M.hide(lgU, t < tPull); }
    M.vis(lgT, t, wt('H1', 'indicator'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#lgL'), t, wt('H1', 'glowing') - 0.1, 1e9, { dy: 10 }); M.vis($('#lgL2'), t, wt('H1', 'moment'), 1e9, { dy: 10 });
    M.vis($('#nwC'), t, T0('H2') - 0.1, out, { dy: 36, ...o });
    M.rise($('#nwT'), t, T0('H2') + 0.1); drawSeq(capP, t, wt('H2', 'capacitor') - 0.3, 0.3, 0.1);
    M.vis($('#nwB'), t, wt('H2', 'capacitor') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* I: what it is */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    iPl.forEach((p, i) => M.vis(p, t, wt('I1', 'metal') - 0.1 + i * 0.15, 1e9, { dy: 20 }));
    fadeAt(iLb.slice(0, 2), t, wt('I1', 'plates'), 0.1); drawSeq(iLd, t, wt('I1', 'facing'), 0.3, 0.1);
    M.vis(iDi, t, wt('I1', 'insulator') - 0.1, 1e9, { dy: 0, fade: 0.3 }); drawSeq(iHat, t, wt('I1', 'insulator'), 0.25, 0.05); M.vis(iLb[2], t, wt('I2', 'dielectric'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(iPill, t, wt('I2', 'dielectric') + 0.3, 1e9, { dy: 16 });
    DP.forEach((p, i) => { M.vis(p, t, tDi[i] - 0.15, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); const lit = M.io((t - tDi[i]) / 0.25) * (i < 4 ? 1 - M.io((t - tDi[i + 1]) / 0.25) : 1); p.style.background = M.mix(C.soft, AM, lit); p.style.color = M.mix(INK, '#FFFFFF', lit); });
    M.vis($('#symL'), t, T0('I3'), 1e9, { dy: 10 }); drawSeq(symP, t, wt('I3', 'symbol'), 0.35, 0.15); M.vis(symC, t, wt('I3', 'Two'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(symG[0], t, wt('I3', 'gap'), 0.3); M.vis(symG[1], t, wt('I3', 'gap'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tC + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tC - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tCh, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ckL1'), t, tB + 0.3, tFlip - 0.2, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, tFlip + 0.1, 1e9, { dy: 10 });
    drawSeq(bW, t, tB + 0.5, 0.4, 0.12); M.draw(bZ, t, tB + 0.8, 0.4); drawSeq(bBat, t, tB + 0.9, 0.25, 0.1); drawSeq(bCap, t, wt('B1', 'capacitor') - 0.2, 0.3, 0.12);
    fadeAt(bSwC, t, tB + 1.1); M.vis(bLev, t, tB + 1.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(bLamp, t, tB + 1.3, 1e9, { dy: 0, fade: 0.2 }); drawSeq(bLX, t, tB + 1.4, 0.25, 0.08); M.vis(bJ, t, tB + 1.4, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(bLb, t, tB + 1.2, 0.05);
    const sA = M.spring(t - tCh, M.SNAP), sB = M.spring(t - tFlip, M.SNAP);
    const ang = t < tCh ? -150 : (t < tFlip ? -150 - 30 * sA : -180 + 180 * sB);
    PUC.attr(bLev, 'transform', `rotate(${ang.toFixed(2)} 520 140)`);
    const v = Vc(t), q = v / 9, iC = t >= tCh && t < tFlip ? (9 - v) / 9 : 0, iD = t >= tFlip ? v / 9 : 0;
    bPlus.forEach((e, i) => M.hide(e, q < (i + 0.5) / 4)); bMin.forEach((e, i) => M.hide(e, q < (i + 0.5) / 4));
    const qc = t < tCh ? 0 : (1 - Math.exp(-(Math.min(t, tFlip) - tCh) / TAU));
    eA.set(240 * qc, t >= tCh && t < tFlip); eB.set(240 * qc, t >= tCh && t < tFlip);
    eD.set(300 * (V1f / 9) * (1 - Math.exp(-(t - tFlip) / TAU2)), t >= tFlip);
    PUC.attr(bLamp, 'fill', M.mix('#FFFFFF', AM, M.clamp(iD * 1.2)));
    const tn = wt('B4', 'no'); bNo.forEach(e => M.vis(e, t, tn - 0.1, T0('B5') + 1.2, { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }));
    trIn(τ => τ >= tCh && τ < tFlip ? 120 : 0, t, tB + 0.6, 8, 180, t >= tB + 0.6);
    trC(τ => 13.33 * Vc(τ), t, tB + 0.6, 8, 180, t >= tB + 0.6);
    sL.forEach(e => M.vis(e, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#r1V'), v.toFixed(2)); M.setT($('#r1Q'), Math.round(100 * v).toString()); M.setT($('#r1I'), (9 * Math.max(iC, iD)).toFixed(2));
  } else { eA.set(0, false); eB.set(0, false); eD.set(0, false); }

  /* C: Q = CV */
  const cOn = t >= tC - 0.05 && t < tP + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tP - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.25, out, { dx: 60, dy: 0, ...o });
    const V = Vg(t);
    cLine(s => [s, 100 * s], 0, 10 * M.io((t - tC - 0.5) / 1.2)); cDot(V, 100 * V, t >= tV1 - 0.6);
    const X = G.X(V), Y = G.Y(100 * V);
    PUC.attr(cGx, 'd', t >= tV1 - 0.6 ? `M${X.toFixed(1)},${G.Y(0)} V${Y.toFixed(1)}` : ''); PUC.attr(cGy, 'd', t >= tV1 - 0.6 ? `M${G.X(0)},${Y.toFixed(1)} H${X.toFixed(1)}` : '');
    M.setT(cRd, `${V.toFixed(1)} V → ${Math.round(100 * V)} µC`); PUC.attr(cRd, 'x', (X - 18).toFixed(1)); PUC.attr(cRd, 'y', (Y - 18).toFixed(1)); PUC.attr(cRd, 'text-anchor', 'end'); M.hide(cRd, t < tV1 - 0.4);
    M.vis(cSl, t, wt('C3', 'capacitance') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    cRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tCd[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tCd[i], 0.6); M.vis(r.querySelector('.why'), t, tCd[i] + 0.4, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tCd[i] - 0.15); });
    M.vis($('#cBox'), t, tCd[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    cPre.forEach((p, i) => M.vis(p, t, wt('C6', ['microfarads', 'nanofarads', 'picofarads'][i]) - 0.15, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    avC(t, wt('C4', 'Capacitance') + 0.2, out);
  }

  /* P: parallel plates + worked example */
  const pOn = (t >= tP - 0.05 && t < tST) || (t >= tW - 0.05 && t < tX + 0.1); M.hide($('#sP'), !pOn);
  if (pOn) {
    const inW = t >= tW - 0.05, out = inW ? tX - 0.32 : tST - 0.45;
    M.vis($('#pL'), t, inW ? null : tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, inW ? null : tP + 0.25, out, { dx: 60, dy: 0, ...o });
    const { a, g, k } = st(t), h = 170 + 140 * a, gap = 200 - 100 * g, cx = 392, cy = 250, xa = cx - gap / 2 - 18, xb = cx + gap / 2;
    [[plA, xa], [plB, xb]].forEach(([p, x]) => { PUC.attr(p, 'x', x.toFixed(1)); PUC.attr(p, 'y', (cy - h / 2).toFixed(1)); PUC.attr(p, 'height', h.toFixed(1)); });
    PUC.attr(slab, 'x', (xa + 18).toFixed(1)); PUC.attr(slab, 'width', gap.toFixed(1)); PUC.attr(slab, 'y', (cy - h / 2 + 4 + 30 * (1 - k)).toFixed(1)); PUC.attr(slab, 'height', (h - 8).toFixed(1)); slab.style.opacity = k.toFixed(3); M.hide(slab, k <= 0.001);
    fld.forEach((f, i) => { const y = cy - h / 2 + h * (i + 0.5) / 5; PUC.attr(f, 'x1', (xa + 22).toFixed(1)); PUC.attr(f, 'x2', (xb - 4).toFixed(1)); PUC.attr(f, 'y1', y.toFixed(1)); PUC.attr(f, 'y2', y.toFixed(1)); });
    const nS = Math.round(3 + 3 * Math.max(a, g * 0.5) + 0 * k);
    pPl.forEach((e, i) => { PUC.attr(e, 'x', (xa - 16).toFixed(1)); PUC.attr(e, 'y', (cy - h / 2 + h * (i + 0.5) / 6 + 8).toFixed(1)); M.hide(e, i >= nS); });
    pMi.forEach((e, i) => { PUC.attr(e, 'x', (xb + 34).toFixed(1)); PUC.attr(e, 'y', (cy - h / 2 + h * (i + 0.5) / 6 + 9).toFixed(1)); M.hide(e, i >= nS); });
    PUC.attr(pLd[0], 'd', `M${xa},${cy} H${xa - 70}`); PUC.attr(pLd[1], 'd', `M${xb + 18},${cy} H${xb + 88}`);
    PUC.attr(aBr, 'd', `M${xa - 60},${cy - h / 2} H${xa - 74} V${cy + h / 2} H${xa - 60}`); PUC.attr(aLb, 'x', (xa - 84).toFixed(1)); PUC.attr(aLb, 'y', (cy - 16).toFixed(1));
    PUC.attr(dBr, 'd', `M${xa + 18},${cy + h / 2 + 14} V${cy + h / 2 + 26} H${xb} V${cy + h / 2 + 14}`); PUC.attr(dLb, 'x', cx); PUC.attr(dLb, 'y', (cy + h / 2 + 54).toFixed(1));
    PUC.attr(kLb, 'y', (cy - h / 2 - 12).toFixed(1)); kLb.style.opacity = k.toFixed(3);
    PUC.attr(dimL[0], 'x', (xa - 84).toFixed(1)); PUC.attr(dimL[0], 'y', (cy + 16).toFixed(1)); PUC.attr(dimL[1], 'x', (cx + 70).toFixed(1)); PUC.attr(dimL[1], 'y', (cy + h / 2 + 54).toFixed(1));
    [plA, plB].forEach((p, i) => M.vis(p, t, inW ? null : tP + 0.5 + i * 0.12, 1e9, { dy: 0, fade: 0.2 }));
    fadeAt([...fld, ...pLd], t, inW ? -9 : tP + 0.7, 0.04);
    M.vis(aBr, t, inW ? null : tAr - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(aLb, t, inW ? null : tAr - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(dBr, t, inW ? null : tGp - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(dLb, t, inW ? null : tGp - 0.2, 1e9, { dy: 0, fade: 0.2 });
    if (inW) { M.hide(aLb, true); M.hide(dLb, true); }
    dimL.forEach((e, i) => M.vis(e, t, inW ? tWr[0] + i * 0.2 : 1e9, 1e9, { dy: 0, fade: 0.2 }));
    const A = 0.005 + 0.005 * a, d = 2 - g, Kk = 1 + 4 * k, Cp = 8.85 * A / (d * 1e-3) * Kk;
    M.setT(PK[0], A.toFixed(4)); M.setT(PK[1], d.toFixed(2)); M.setT(PK[2], Kk.toFixed(1)); M.setT(PK[3], Cp.toFixed(1));
    [...$('#pKs').children].forEach((p, i) => M.vis(p, t, inW ? null : tP + 0.8 + i * 0.1, 1e9, { dy: 16 }));
    M.vis($('#pRL1'), t, inW ? 1e9 : tP + 0.4, 1e9, { dy: 10 }); M.vis($('#pRL2'), t, inW ? tW + 0.1 : 1e9, 1e9, { dy: 10 });
    pRows.forEach((r, i) => { M.hide(r, inW || t < tPd[i] - 0.15); if (!inW) { M.vis(r.querySelector('.n'), t, tPd[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tPd[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tPd[i] + 0.4, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#pBox'), t, inW ? 1e9 : tPd[4] - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    wR.forEach((r, i) => { M.hide(r, !inW || t < tWr[i] - 0.15); if (inW) { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); } });
    M.vis($('#wBox'), t, inW ? tWr[3] - 0.1 : 1e9, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* ST: statement */
  const sOn = t >= tST - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tST + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('ST', 'more') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Double') - 0.1 });
    drawSeq(xCap, t, tX + 0.5, 0.3, 0.1); M.vis(xCL, t, tX + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#xRo'), t, tX + 0.7, 1e9, { dy: 12 });
    const dbl = t >= wt('X3', 'Double'), qd = t >= wt('X3', 'charge');
    M.setT($('#xV'), dbl ? '10' : '5'); M.setT($('#xQ'), qd ? '1000' : '500');
    const same = M.io((t - wt('X3', 'same')) / 0.25); $('#xC').style.color = M.mix(INK, C.ok, same);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'NEET'), wt('X5', 'PUC')], tType: wt('X4', 'new') - 0.2 });
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
