// PUC Electronics Ep 29 - Inductors and inductance ("Breadboard" style, Lab Notebook world)
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

const coilV = (x, y0, n, step = 28, r = 16) => `M${x},${y0} ` + [...Array(n)].map(() => `a ${r},${r} 0 0 1 0,${step}`).join(' ');
const coilH = (x0, y, n, step = 30, r = 16) => `M${x0},${y} ` + [...Array(n)].map(() => `a ${r},${r} 0 0 1 ${step},0`).join(' ');
const helix = (p, x0, cy, n, gap, ry, rx = 18, a = {}) => [...Array(n)].map((_, i) => mk(p, 'ellipse', { cx: x0 + i * gap, cy, rx, ry, fill: 'none', stroke: a.stroke || '#B5651D', 'stroke-width': a.sw || 5 }));
const BLUE = '#2F6FEB';

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'A') - 0.2;
const tI = T0('I1'), tB = T0('B1'), tD = T0('D1'), tS = T0('S1'), tT = T0('T1'), tST = T0('ST'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tST, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const plS = $('#plS');
const sock = [W(plS, 'M30,30 H270 V120 H30 Z', { fill: '#fff' }), W(plS, 'M120,64 V88 M180,64 V88', { 'stroke-width': 7 })];
const plugO = mk(plS, 'g'), plug = mk(plugO, 'g'); W(plug, 'M95,170 H205 V270 H95 Z', { fill: '#fff', 'stroke-width': 5 }); W(plug, 'M120,170 V136 M180,170 V136', { 'stroke-width': 6 }); W(plug, 'M150,270 C150,320 110,330 110,370', { 'stroke-width': 4 });
const spark = [W(plS, 'M120,92 L110,108 L128,116 L114,134', { stroke: BLUE, 'stroke-width': 4 }), W(plS, 'M180,92 L192,106 L174,118 L188,134', { stroke: BLUE, 'stroke-width': 4 })];
const tPull = wt('H1', 'pulls'), tSpark = wt('H1', 'spark') - 0.2;
const moS = $('#moS');
const core = mk(moS, 'rect', { x: 60, y: 70, width: 400, height: 60, rx: 6, fill: '#D5D9E0', stroke: INK, 'stroke-width': 3 });
const lam = [1, 2, 3, 4, 5, 6, 7].map(i => mk(moS, 'line', { x1: 60 + i * 50, y1: 72, x2: 60 + i * 50, y2: 128, stroke: '#B8BCC6', 'stroke-width': 2 }));
const moC = helix(moS, 110, 100, 10, 34, 50, 12);
const moL = mono(moS, 500, 92, 'copper wire,', { fill: INK, 'font-weight': 600, 'font-size': 22 }), moL2 = mono(moS, 500, 122, 'many turns', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const indS = $('#indS'), indP = [W(indS, 'M10,110 H60'), W(indS, coilH(60, 110, 6)), W(indS, 'M240,110 H290')];
const indL = tx(indS, 150, 60, 'L', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 32 });

/* ================= I: what it is ================= */
const iS = $('#iS');
const iHel = helix(iS, 236, 260, 7, 52, 100, 20);
const iLd = [W(iS, 'M236,360 V420 H90'), W(iS, 'M548,360 V420 H694')];
const iArr = PUC.arrow(iS, VI), iAL = tx(iS, 110, 400, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 30 });
const fld = [W(iS, 'M90,260 H694', { stroke: INK, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' }), W(iS, 'M120,260 C120,80 664,80 664,260', { stroke: INK, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' }),
  W(iS, 'M180,260 C180,130 604,130 604,260', { stroke: INK, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' })];
const fArr = mk(iS, 'path', { d: 'M694,260 L676,250 L676,270 Z', fill: INK });
const fL = mono(iS, 392, 92, 'MAGNETIC FIELD', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 });
const iPill = document.createElement('div'); iPill.className = 'pillp ink'; iPill.style.cssText = 'left:32px;top:500px'; iPill.textContent = 'The field passes through every turn'; $('#iL').appendChild(iPill);
const symS = $('#symS');
const sy1 = [W(symS, 'M120,210 H240'), W(symS, coilH(240, 210, 6, 50, 26)), W(symS, 'M540,210 H664')];
const sy2 = [W(symS, 'M120,430 H240'), W(symS, coilH(240, 430, 6, 50, 26)), W(symS, 'M540,430 H664'), W(symS, 'M240,374 H540 M240,360 H540', { 'stroke-width': 4 })];
const syL = [mono(symS, 392, 130, 'AIR CORE', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 }), tx(symS, 392, 270, 'L', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 30 }),
  mono(symS, 392, 336, 'IRON CORE: TWO LINES', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 })];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bW = [W(ck, 'M110,300 V120 H190'), W(ck, 'M290,120 H700 V150'), W(ck, 'M420,120 V160'), W(ck, 'M420,272 V342'), W(ck, 'M420,418 V520'), W(ck, 'M700,290 V342'), W(ck, 'M700,418 V520'), W(ck, 'M110,336 V520 H700')];
const bZ = W(ck, 'M420,160 L446,172 L394,190 L446,208 L394,226 L446,244 L394,262 L420,272');
const bCoil = W(ck, coilV(700, 150, 5));
const bBat = [W(ck, 'M75,300 H145', { 'stroke-width': 5 }), W(ck, 'M92,336 H128', { 'stroke-width': 9 })];
const bSw = [mk(ck, 'circle', { cx: 190, cy: 120, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 290, cy: 120, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const bLev = W(ck, 'M190,120 H286', { 'stroke-width': 5 });
const L1 = mk(ck, 'circle', { cx: 420, cy: 380, r: 38, fill: '#fff', stroke: INK, 'stroke-width': 4 }), L2 = mk(ck, 'circle', { cx: 700, cy: 380, r: 38, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const LX = [W(ck, 'M394,354 L446,406 M446,354 L394,406'), W(ck, 'M674,354 L726,406 M726,354 L674,406')];
const bJ = [[420, 120], [420, 520]].map(([x, y]) => mk(ck, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const bLb = [tx(ck, 48, 296, '+', { 'font-size': 28 }), tx(ck, 52, 354, '-', { 'font-size': 30 }), mono(ck, 160, 326, '6 V', { fill: TE, 'font-weight': 600, 'font-size': 24 }), tx(ck, 240, 96, 'Switch', { 'text-anchor': 'middle', 'font-size': 22 }),
  tx(ck, 466, 224, 'R', { 'font-style': 'italic', 'font-size': 28 }), tx(ck, 746, 228, 'L', { 'font-style': 'italic', 'font-size': 28 }), mono(ck, 470, 386, 'lamp 1', { 'font-size': 18 }), mono(ck, 750, 386, 'lamp 2', { 'font-size': 18 })];
const tC = wt('B2', 'Close'), tO = wt('B5', 'open') + 0.2, TAU = 1.3, TO = 0.3;
const iL0 = 1 - Math.exp(-(tO - tC) / TAU);
const i1 = τ => τ >= tC && τ < tO ? 1 : 0;
const iL = τ => τ < tC ? 0 : (τ < tO ? 1 - Math.exp(-(τ - tC) / TAU) : iL0 * Math.exp(-(τ - tO) / TO));
const vL = τ => τ < tC ? 0 : (τ < tO ? 6 * Math.exp(-(τ - tC) / TAU) : -(7.8 * iL0 / TO) * Math.exp(-(τ - tO) / TO));
const q1 = t => Math.max(0, Math.min(t, tO) - tC);
const qL = t => { if (t <= tC) return 0; const a = Math.min(t, tO) - tC; let q = a - TAU * (1 - Math.exp(-a / TAU)); if (t > tO) q += iL0 * TO * (1 - Math.exp(-(t - tO) / TO)); return q; };
const fA = flow(ck, [[110, 336], [110, 520], [420, 520], [420, 120], [290, 120], [190, 120], [110, 120], [110, 300]], 26, { skip: (x, y) => (x > 388 && x < 452 && y > 156 && y < 276) || (Math.abs(x - 420) < 2 && y > 340 && y < 420) || (y < 122 && x > 194 && x < 286) });
const fB = flow(ck, [[420, 520], [700, 520], [700, 120], [420, 120]], 16, { skip: (x, y) => (Math.abs(x - 700) < 2 && ((y > 146 && y < 294) || (y > 340 && y < 420))) || (y < 122 && x < 424) || (y > 518 && x < 424) });
const SC = scope($('#scS'), 592, 200), trV = SC.tr('#8FA3C8'), trI = SC.tr(AM);
const sL = [SC.lab(14, 26, 'CH1 · V ACROSS COIL', '#8FA3C8'), SC.lab(14, 190, 'CH2 · I THROUGH COIL', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${VI}">I<sub>1</sub></span><span class="v" id="r1a" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${VI}">I<sub>2</sub></span><span class="v" id="r1b" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k" style="color:${TE}">V<sub>L</sub></span><span class="v" id="r1c" style="color:${TE}">0.0</span><span class="u">V</span>`;

/* ================= D: derivation ================= */
const dS = $('#dS');
const G = PUC.graph(dS, { x: 120, y: 84, w: 560, h: 330, xmax: 2, ymax: 1, xt: [0, 0.5, 1, 1.5, 2], yt: [0, 0.5, 1], xl: 'I (A)', yl: 'NΦ (Wb)' });
G.xlab.setAttribute('fill', VI);
const dLine = G.curve(INK, 4), dDot = G.dot(VI, 11);
const dSl = mono(dS, 500, 160, 'SLOPE = L', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const dRd = mono(dS, 0, 0, '', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const dGx = mk(dS, 'path', { d: '', fill: 'none', stroke: VI, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' });
const Ig = t => 2 * M.io((t - wt('D2', 'flux') + 0.2) / 2.2);
const dSteps = [[K(`N\\Phi \\propto ${tc(VI, 'I')}`), 'flux follows current', 84], [K(`N\\Phi = ${tc(INK, 'L')}\\,${tc(VI, 'I')}`), '', 166], [K(`${tc(INK, 'L')} = \\dfrac{N\\Phi}{${tc(VI, 'I')}}`), 'self inductance', 240],
  [K(`${tc(TE, '\\varepsilon')} = -${tc(INK, 'L')}\\,\\dfrac{d${tc(VI, 'I')}}{dt}`), "minus: it opposes the change (Lenz's law)", 340], [K(`1\\,\\text{H} = 1\\,\\text{V s/A}`), 'the henry, after Joseph Henry', 470]];
$('#dSteps').innerHTML = dSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('') +
  `<div class="sm" id="dU" style="left:104px;top:536px;font-family:'IBM Plex Mono';font-size:20px">1 H: 1 V induced when I changes by 1 A every second</div>`;
const dRows = [...$('#dSteps').querySelectorAll('.st2')];
const tDd = [wt('D2', 'proportional'), wt('D2', 'So'), wt('D3', 'L', 1), wt('D4', 'So'), wt('D6', 'So')];
const tLenz = wt('D5', 'minus');
const avD = PUC.avatar($('#sD'), { x: 192, y: 772, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'L is the slope here, just like C was!' });

/* ================= S: solenoid + worked example ================= */
const soS = $('#soS');
const sCore = mk(soS, 'rect', { x: 160, y: 196, width: 470, height: 48, rx: 6, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 });
const sHel = helix(soS, 200, 220, 9, 48, 86, 18);
const sA = mk(soS, 'ellipse', { cx: 200, cy: 220, rx: 18, ry: 86, fill: C.ac2, stroke: AM, 'stroke-width': 4 });
const sAL = mono(soS, 150, 226, 'A', { 'text-anchor': 'end', fill: C.gold, 'font-weight': 700, 'font-size': 26, 'font-style': 'italic' });
const sLB = W(soS, 'M200,330 V344 H584 V330', { stroke: AM, 'stroke-width': 3 }), sLL = mono(soS, 392, 376, 'l', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 700, 'font-size': 28, 'font-style': 'italic' });
const sNL = mono(soS, 392, 112, 'N TURNS', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 });
const sDim = [mono(soS, 392, 112, '500 TURNS', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 }), mono(soS, 440, 376, '= 25 cm', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(soS, 150, 256, '4 cm²', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 20 })];
$('#sRo').innerHTML = `<span class="k n">CORE</span><span class="v" id="sCo">AIR</span><span class="u"></span>
  <span class="k">L</span><span class="v" id="sLv">0.50</span><span class="u">mH</span>`;
const sSteps = [[K(`${tc(INK, 'L')} = \\dfrac{\\mu_0 N^{2} A}{l}`), 'long coil, air core', 88], [K(`N,\\ A,\\ l`), 'turns · area of a turn · length', 222],
  [K(`\\mu_0 = 4\\pi\\times10^{-7}\\,\\text{H/m}`), '', 300], [K(`${tc(INK, 'L')} = \\dfrac{\\mu_0\\,\\mu_r N^{2} A}{l}`), 'iron core: μr can be hundreds', 384]];
$('#sSteps').innerHTML = sSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const sRows = [...$('#sSteps').children];
const tSd = [wt('S2', 'L'), wt('S3', 'N'), wt('S4', 'Mu'), wt('S5', 'multiplied')];
const wRows = [[K(`N^{2} = 2.5\\times10^{5},\\ \\ A = 4\\times10^{-4}\\,\\text{m}^2,\\ \\ l = 0.25\\,\\text{m}`), 84],
  [K(`${tc(INK, 'L')} = \\dfrac{4\\pi\\times10^{-7}\\times 2.5\\times10^{5}\\times 4\\times10^{-4}}{0.25}`), 196], [K(`${tc(INK, 'L')} \\approx 5.0\\times10^{-4}\\,\\text{H} \\approx 0.5\\,\\text{mH}`), 460]];
$('#wSteps').innerHTML = wRows.map(([s, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:${i === 0 ? 28 : 34}px">${s}</div></div>`).join('');
const wR = [...$('#wSteps').children];
const tWr = [wt('W2', 'N'), wt('W3', 'L'), wt('W4', 'That')];
const tCore = wt('S5', 'iron');

/* ================= T: types ================= */
const TYP = [['Air core', 'small L · high frequency', 'radio circuits'], ['Iron core', 'large L · low frequency', 'also called chokes; power supplies'], ['Ferrite core', 'compact · high frequency', 'a magnetic ceramic core'], ['Variable', 'adjustable L', 'the core screws in and out to tune']];
$('#tts').innerHTML = TYP.map(([n, r, x], i) => `<div class="card tt" style="left:${160 + i * 408}px"><svg width="376" height="290"></svg><div class="nm">${n}</div><div class="rg">${r}</div><div class="nt">${x}</div></div>`).join('');
const TT = [...$('#tts').children], TS = TT.map(d => d.querySelector('svg'));
const tg = TS.map(s => mk(s, 'g'));
helix(tg[0], 104, 160, 7, 28, 62, 12);
mk(tg[1], 'rect', { x: 70, y: 70, width: 236, height: 180, rx: 6, fill: '#D5D9E0', stroke: INK, 'stroke-width': 3 }); mk(tg[1], 'rect', { x: 130, y: 120, width: 116, height: 80, fill: '#fff', stroke: INK, 'stroke-width': 3 });
[0, 1, 2, 3, 4, 5].forEach(i => mk(tg[1], 'line', { x1: 74, y1: 82 + i * 30, x2: 302, y2: 82 + i * 30, stroke: '#B8BCC6', 'stroke-width': 2 })); helix(tg[1], 92, 160, 5, 7, 52, 10);
mk(tg[2], 'rect', { x: 70, y: 138, width: 236, height: 44, rx: 22, fill: '#3B3F4A', stroke: INK, 'stroke-width': 3 }); helix(tg[2], 120, 160, 7, 23, 44, 10);
mk(tg[3], 'rect', { x: 110, y: 90, width: 156, height: 150, rx: 8, fill: '#F3F1EA', stroke: INK, 'stroke-width': 3 }); helix(tg[3], 132, 165, 6, 22, 58, 10); mk(tg[3], 'rect', { x: 166, y: 46, width: 44, height: 110, rx: 6, fill: '#3B3F4A', stroke: INK, 'stroke-width': 3 });
W(tg[3], 'M176,58 H200', { stroke: '#fff', 'stroke-width': 4 }); W(tg[3], 'M240,56 V20 M240,56 L230,44 M240,56 L250,44 M240,20 L230,32 M240,20 L250,32', { 'stroke-width': 3, stroke: AM });
const tTy = [wt('T2', 'Air'), wt('T3', 'Iron'), wt('T4', 'Ferrite'), wt('T5', 'Variable')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Double the turns, double the inductance', right: 'L ∝ N²: double the turns, four times L', y0: 96, y1: 184 });
const xS = $('#tcS');
const xC1 = helix(xS, 80, 150, 4, 60, 56, 14), xC2 = helix(xS, 450, 150, 8, 30, 56, 14);
const xL = [mono(xS, 170, 248, 'N turns → L', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 }), ctr(mono(xS, 555, 248, '2N turns → 4L', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 24 }))];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET', 'PUC BOARDS'], type: 'Find L from NΦ = LI or from the EMF ε = L dI/dt, L ∝ N², define self inductance and the henry' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'The current in a 40&nbsp;mH coil falls steadily from 3&nbsp;A to 1&nbsp;A in 4&nbsp;ms. The EMF induced in the coil is:', qW: 780,
  opts: [K('10\\,\\text{V}'), K('20\\,\\text{V}'), K('30\\,\\text{V}'), K('0.02\\,\\text{V}')], right: 1, optW: 474, optY: 300 });
const sol = PUC.solution($('#so'), [[K(`\\Delta ${tc(VI, 'I')} = 2\\,\\text{A},\\ \\Delta t = 4\\times10^{-3}\\,\\text{s}`)], [K(`\\dfrac{d${tc(VI, 'I')}}{dt} = 500\\,\\text{A/s}`)], [K(`${tc(TE, '\\varepsilon')} = ${tc(INK, 'L')}\\dfrac{d${tc(VI, 'I')}}{dt} = 0.04\\times 500`)], [K(`${tc(TE, '\\varepsilon')} = 20\\,\\text{V}`)]], { dy: 116, y0: 100 });
$('#so').querySelectorAll('.sx').forEach(e => e.style.fontSize = '28px');
const tSol = [wt('A2', 'The'), wt('A3', 'So'), wt('A4', 'The'), wt('A4', 'twenty')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 100, dy: 82, title: 'Inductors and inductance · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K(`N\\Phi = ${tc(INK, 'L')}\\,${tc(VI, 'I')} \\qquad ${tc(TE, '\\varepsilon')} = -${tc(INK, 'L')}\\,\\dfrac{d${tc(VI, 'I')}}{dt}`),
    K(`${tc(INK, 'L')} = \\dfrac{\\mu_0\\,\\mu_r N^{2} A}{l}`),
    K(`\\mu_0 = 4\\pi\\times10^{-7}\\,\\text{H/m} \\qquad 1\\,\\text{H} = 1\\,\\text{V s/A}`),
    'L grows as N²: double the turns, four times L',
    'Types: air core, iron core (choke), ferrite core, variable'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 30', topic: 'Energy storage in passive components', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B6', 'spike') - 0.3, 1.1, 1300, 520], [T1('B6') + 0.2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const g1 = t >= tB + 0.5 && t < tD, g2 = t >= tS + 0.5 && t < tT;
  M.vis(ghost, t, t < tS ? tB + 0.5 : tS + 0.5, t < tS ? tD - 0.32 : tT - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!g1 && !g2) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(sock, t, tMorph + 0.5, 0.4, 0.15);
    const up = 1 - M.spring(t - tPull, M.SOFT); plugO.setAttribute('transform', `translate(0,${(-34 * up).toFixed(1)})`); M.vis(plug, t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 });
    spark.forEach((s, i) => { M.draw(s, t, tSpark + i * 0.05, 0.12); M.hide(s, t < tSpark || t > tSpark + 0.9); });
    M.vis($('#aPill'), t, tSpark + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, wt('H2', 'Where') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(core, t, wt('H2', 'Where'), 1e9, { dy: 0, fade: 0.2 }); fadeAt(lam, t, wt('H2', 'Where') + 0.1, 0.03);
    moC.forEach((c, i) => { M.vis(c, t, wt('H2', 'coil') - 0.6 + i * 0.05, 1e9, { dy: 0, fade: 0.1 }); PUC.attr(c, 'stroke', t >= wt('H2', 'coil') ? AM : '#B5651D'); });
    fadeAt([moL, moL2], t, wt('H2', 'coil'), 0.15);
    M.vis($('#nwC'), t, wt('H2', 'From') - 0.2, out, { dy: 36, ...o });
    M.rise($('#nwT'), t, wt('H2', 'From')); drawSeq(indP, t, wt('H2', 'coil') - 0.2, 0.35, 0.12); M.vis(indL, t, wt('H2', 'coil'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#nwB'), t, wt('H2', 'coil'), 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* I: what it is */
  const iOn = t >= tI - 0.05 && t < tB + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tB - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    iHel.forEach((h, i) => M.vis(h, t, wt('I1', 'coil') - 0.2 + i * 0.07, 1e9, { dy: 0, fade: 0.12 })); drawSeq(iLd, t, wt('I1', 'coil') + 0.3, 0.3, 0.1);
    const ia = M.io((t - wt('I3', 'Current') + 0.1) / 0.4); iArr.set(110, 440, 110 + 110 * ia, 440); iAL.style.opacity = ia; PUC.attr(iAL, 'y', 474);
    drawSeq(fld, t, wt('I3', 'magnetic') - 0.1, 0.5, 0.2); M.vis(fArr, t, wt('I3', 'magnetic') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(fL, t, wt('I3', 'field'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(iPill, t, wt('I3', 'every') - 0.1, 1e9, { dy: 16 });
    drawSeq(sy1, t, wt('I2', 'symbol') - 0.1, 0.35, 0.12); M.vis(syL[0], t, wt('I2', 'symbol'), 1e9, { dy: 0, fade: 0.2 }); M.vis(syL[1], t, wt('I2', 'loops'), 1e9, { dy: 0, fade: 0.2 });
    drawSeq(sy2, t, wt('I2', 'Two') - 0.1, 0.3, 0.1); M.vis(syL[2], t, wt('I2', 'iron') - 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckE'), t, tC, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ckL1'), t, tB + 0.3, tO - 0.2, { dy: 10, outDur: 0.25 }); M.vis($('#ckL2'), t, tO + 0.1, 1e9, { dy: 10 });
    drawSeq(bW, t, tB + 0.5, 0.35, 0.08); M.draw(bZ, t, wt('B1', 'resistor') - 0.2, 0.4); M.draw(bCoil, t, wt('B1', 'coil') - 0.2, 0.5); drawSeq(bBat, t, tB + 0.8, 0.25, 0.1);
    fadeAt([...bSw, L1, L2, ...bJ], t, tB + 0.9, 0.05); drawSeq(LX, t, tB + 1.1, 0.25, 0.1); fadeAt(bLb, t, tB + 1.0, 0.05);
    const sc1 = M.spring(t - tC, M.SNAP), sc2 = M.spring(t - tO, M.SNAP), ang = t < tC ? -32 : (t < tO ? -32 * (1 - sc1) : -32 * sc2);
    PUC.attr(bLev, 'transform', `rotate(${ang.toFixed(2)} 190 120)`); M.vis(bLev, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(L1, 'fill', M.mix('#FFFFFF', AM, i1(t))); PUC.attr(L2, 'fill', M.mix('#FFFFFF', AM, M.clamp(iL(t))));
    fA.set(110 * q1(t), t >= tC && t < tO + 0.05); fB.set(110 * qL(t), t >= tC && t < tO + 0.5);
    trV(τ => 10 * M.clamp(vL(τ), -12, 8), t, tB + 0.6, 10, 80, t >= tB + 0.6, 400); trI(τ => 80 * iL(τ), t, tB + 0.6, 10, 185, t >= tB + 0.6, 400);
    sL.forEach(e => M.vis(e, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#r1a'), i1(t).toFixed(2)); M.setT($('#r1b'), iL(t).toFixed(2)); M.setT($('#r1c'), (Math.abs(vL(t)) < 0.05 ? 0 : vL(t)).toFixed(1));
  } else { fA.set(0, false); fB.set(0, false); }

  /* D: derivation */
  const dOn = t >= tD - 0.05 && t < tS + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tS - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    const I = Ig(t), on = t >= wt('D2', 'flux') - 0.2;
    dLine(s => [s, 0.5 * s], 0, 2 * M.io((t - tD - 0.5) / 1.2)); dDot(I, 0.5 * I, on);
    PUC.attr(dGx, 'd', on ? `M${G.X(I).toFixed(1)},${G.Y(0)} V${G.Y(0.5 * I).toFixed(1)}` : '');
    M.setT(dRd, `${I.toFixed(2)} A → ${(0.5 * I).toFixed(2)} Wb`); PUC.attr(dRd, 'x', (G.X(I) - 250).toFixed(1)); PUC.attr(dRd, 'y', (G.Y(0.5 * I) - 20).toFixed(1)); M.hide(dRd, !on || I < 0.3);
    M.vis(dSl, t, wt('D2', 'L') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    dRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tDd[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDd[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, i === 3 ? tLenz : tDd[i] + 0.4, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tDd[i] - 0.15); });
    M.vis($('#dBox'), t, tDd[3] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dU'), t, T0('D7'), 1e9, { dy: 10 });
    avD(t, wt('D3', 'over') + 0.3, out);
  }

  /* S: solenoid + worked example */
  const sOn = (t >= tS - 0.05 && t < tT + 0.1) || (t >= tW - 0.05 && t < tX + 0.1); M.hide($('#sS'), !sOn);
  if (sOn) {
    const inW = t >= tW - 0.05, out = inW ? tX - 0.32 : tT - 0.32;
    M.vis($('#sL'), t, inW ? tW + 0.1 : tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, inW ? tW + 0.25 : tS + 0.25, out, { dx: 60, dy: 0, ...o });
    const t0 = inW ? tW + 0.3 : tS + 0.4;
    sHel.forEach((h, i) => M.vis(h, t, t0 + i * 0.06, 1e9, { dy: 0, fade: 0.12 }));
    const core = !inW && t >= tCore - 0.2; M.vis(sCore, t, core ? tCore - 0.2 : 1e9, 1e9, { dx: -40, dy: 0 }); if (!core) M.hide(sCore, true);
    const ta = inW ? t0 : wt('S3', 'area');
    M.vis(sA, t, ta, 1e9, { dy: 0, fade: 0.2 }); M.vis(sAL, t, ta, 1e9, { dy: 0, fade: 0.2 });
    M.draw(sLB, t, inW ? t0 : wt('S3', 'length') - 0.1, 0.4); M.vis(sLL, t, inW ? t0 : wt('S3', 'length'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(sNL, t, inW ? 1e9 : wt('S3', 'number'), 1e9, { dy: 0, fade: 0.2 }); if (inW) M.hide(sNL, true);
    sDim.forEach((e, i) => { M.vis(e, t, inW ? tWr[0] + i * 0.15 : 1e9, 1e9, { dy: 0, fade: 0.2 }); if (!inW) M.hide(e, true); });
    M.vis($('#sRo'), t, inW ? tWr[2] : tS + 0.8, 1e9, { dy: 12 });
    const cu = core ? M.io((t - tCore) / 0.8) : 0;
    M.setT($('#sCo'), cu > 0.5 ? 'IRON · μr 200' : 'AIR'); M.setT($('#sLv'), (0.503 * (1 + 199 * cu)).toFixed(cu > 0.05 ? 1 : 2));
    M.vis($('#sRL1'), t, inW ? 1e9 : tS + 0.4, 1e9, { dy: 10 }); M.vis($('#sRL2'), t, inW ? tW + 0.3 : 1e9, 1e9, { dy: 10 });
    sRows.forEach((r, i) => { M.hide(r, inW || t < tSd[i] - 0.15); if (!inW) { M.vis(r.querySelector('.n'), t, tSd[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tSd[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tSd[i] + 0.4, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#sBox'), t, inW ? 1e9 : tSd[0] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); if (inW) M.hide($('#sBox'), true);
    wR.forEach((r, i) => { M.hide(r, !inW || t < tWr[i] - 0.15); if (inW) { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.8); } });
    M.vis($('#wBox'), t, inW ? tWr[2] - 0.1 : 1e9, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); if (!inW) M.hide($('#wBox'), true);
  }

  /* T: types */
  const tOn = t >= tT - 0.05 && t < tST; M.hide($('#sT'), !tOn);
  if (tOn) {
    const out = tST - 0.45;
    TT.forEach((c, i) => { M.vis(c, t, tTy[i] - 0.25, out, { dy: 36, ...o }); M.vis(tg[i], t, tTy[i], 1e9, { dy: 16 }); });
  }

  /* ST: statement */
  const stOn = t >= tST - 0.1 && t < tW; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tST + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('ST', 'It') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'L') - 0.1 });
    xC1.forEach((c, i) => M.vis(c, t, tX + 0.5 + i * 0.06, 1e9, { dy: 0, fade: 0.12 })); xC2.forEach((c, i) => M.vis(c, t, wt('X3', 'Double') - 0.2 + i * 0.05, 1e9, { dy: 0, fade: 0.12 }));
    M.vis(xL[0], t, tX + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(xL[1], t, wt('X3', 'four'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'NEET'), wt('X5', 'PUC')], tType: wt('X4', 'ask') - 0.2 });
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
