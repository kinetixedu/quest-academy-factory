// PUC Electronics Ep 8 - Ohm's law and electrical resistance ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink (rho, L, A ink)
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

const OM = '\\Omega';
/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'charges') - 0.2;
const tR = T0('R1'), tB = T0('B1'), tL = T0('L1'), tT = T0('T1'), tG = T0('G1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tG], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const cab1 = [W(h1S, 'M14,80 H44 V110 H14 Z', { 'stroke-width': 4, fill: '#fff' }), W(h1S, 'M44,95 C70,20 100,170 130,95 S190,20 220,95 S262,150 276,95', { 'stroke-width': 3 })];
const cab2 = [W(h2S, 'M14,80 H44 V110 H14 Z', { 'stroke-width': 4, fill: '#fff' }), W(h2S, 'M44,95 H190', { 'stroke-width': 14 })];
const tSlow = wt('H1', 'slowly'), tFast = wt('H2', 'faster');

/* ================= R: resistance ================= */
const rS = $('#rS');
mk(rS, 'rect', { x: 40, y: 84, width: 704, height: 300, rx: 30, fill: '#F3F1EA', stroke: INK, 'stroke-width': 3 });
const ATOMS = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) ATOMS.push([100 + k * 73 + (r % 2) * 36, 134 + r * 100, mk(rS, 'circle', { cx: 0, cy: 0, r: 22, fill: '#E3E6EC', stroke: '#B8BCC6', 'stroke-width': 2 })]);
const zig = (y0, ph) => { const p = [[44, y0]]; for (let x = 80; x < 744; x += 36) p.push([x, y0 + ((Math.floor((x + ph) / 36) % 2) ? 16 : -16)]); p.push([740, y0]); return p; };
const eR = [flow(rS, zig(184, 0), 6, { skip: x => x < 50 || x > 736 }), flow(rS, zig(284, 18), 6, { skip: x => x < 50 || x > 736 })];
$('#rZ').innerHTML = M.icon('zap', 32, AM, 2.4);
$('#rK').innerHTML = K('R');
const rSym = $('#rSym'), rSymP = [W(rSym, 'M4,30 H60 L72,10 L92,50 L112,10 L132,50 L152,10 L172,50 L184,30 H240')];
const rSymL = mono(rSym, 250, 37, 'symbol', {});

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M200,282 V150 H384'), W(ck, 'M456,150 H760 V250'), W(ck, 'M760,350 V450 H200 V318')];
const bRes = W(ck, 'M760,250 L740,262 L780,276 L740,290 L780,304 L740,318 L780,332 L740,344 L760,350');
const bCell = [W(ck, 'M165,282 H235', { 'stroke-width': 5 }), W(ck, 'M182,318 H218', { 'stroke-width': 9 }), W(ck, 'M156,346 L244,254', { 'stroke-width': 3 })];
const bArrH = mk(ck, 'path', { d: 'M244,254 L228,258 L240,270 Z', fill: INK });
const am = mk(ck, 'circle', { cx: 420, cy: 150, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), amT = tx(ck, 420, 160, 'A', { 'text-anchor': 'middle', fill: VI, 'font-size': 30, 'font-weight': 700 });
const vmW = [W(ck, 'M760,200 H860 V264'), W(ck, 'M860,336 V400 H760')];
const vm = mk(ck, 'circle', { cx: 860, cy: 300, r: 36, fill: '#fff', stroke: INK, 'stroke-width': 4 }), vmT = tx(ck, 860, 310, 'V', { 'text-anchor': 'middle', fill: TE, 'font-size': 30, 'font-weight': 700 });
const nodes = [mk(ck, 'circle', { cx: 760, cy: 200, r: 7, fill: INK }), mk(ck, 'circle', { cx: 760, cy: 400, r: 7, fill: INK })];
const bLb = [tx(ck, 132, 290, '+', { 'font-size': 28 }), tx(ck, 260, 296, 'Supply'), tx(ck, 718, 306, 'R', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 28 })];
const supV = mono(ck, 260, 324, '0 V', { fill: TE, 'font-weight': 600, 'font-size': 22 }), rVal = mono(ck, 718, 334, '4 Ω', { 'text-anchor': 'end', 'font-weight': 600, 'font-size': 22 });
const lbM = [mono(ck, 420, 222, 'ammeter', { 'text-anchor': 'middle' }), mono(ck, 860, 186, 'voltmeter', { 'text-anchor': 'middle' })];
const tS1 = [wt('B3', 'Set'), wt('B4', 'Four'), wt('B4', 'Six'), wt('B4', 'Eight')];
const tSwap = wt('B6', 'swap'), tS2 = [0, 1, 2, 3].map(k => wt('B7', 'every') + k * 0.75);
const Rnow = t => t < tSwap ? 4 : 8;
const Vnow = t => { const L = t < tSwap ? tS1 : tS2; let v = 0; L.forEach((a, k) => { if (t >= a) v = 2 * (k + 1); }); return t >= tSwap && t < tS2[0] ? 0 : v; };
const offB = (() => { const cache = []; return t => { let s = 0, dt = 0.05; for (let x = tS1[0]; x < t; x += dt) s += 70 * Vnow(x) / Rnow(x) * Math.min(dt, t - x); return s; }; })();
const eB = flow(ck, [[200, 318], [200, 450], [760, 450], [760, 150], [200, 150], [200, 282]], 30, {
  skip: (x, y) => (Math.abs(x - 760) < 2 && y > 246 && y < 354) || (Math.abs(y - 150) < 2 && x > 382 && x < 458) });
const gS = $('#gS');
const gp = PUC.graph(gS, { x: 90, y: 70, w: 480, h: 170, xmax: 2.4, ymax: 9, xt: [0.5, 1, 1.5, 2], yt: [2, 4, 6, 8], xl: 'I (A)', yl: 'V (V)' });
gp.xlab.setAttribute('fill', VI); gp.ylab.setAttribute('fill', TE); gp.xlab.setAttribute('y', 268); gp.ylab.setAttribute('x', 102);
const GD = '#B7791F';
const ln1 = gp.mk('line', { x1: gp.X(0), y1: gp.Y(0), x2: gp.X(2.2), y2: gp.Y(8.8), stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' });
const ln2 = gp.mk('line', { x1: gp.X(0), y1: gp.Y(0), x2: gp.X(1.1), y2: gp.Y(8.8), stroke: GD, 'stroke-width': 4, 'stroke-linecap': 'round' });
const P1 = [1, 2, 3, 4].map(k => gp.mk('circle', { cx: gp.X(k * 0.5), cy: gp.Y(2 * k), r: 8, fill: INK }));
const P2 = [1, 2, 3, 4].map(k => gp.mk('circle', { cx: gp.X(k * 0.25), cy: gp.Y(2 * k), r: 8, fill: GD }));
const l1L = tx(gS, gp.X(2.2) - 4, gp.Y(8.8) + 34, '4 Ω', { 'text-anchor': 'end', 'font-family': 'IBM Plex Mono', 'font-size': 20 }), l2L = tx(gS, gp.X(1.1) + 14, gp.Y(8.8) + 12, '8 Ω', { 'font-family': 'IBM Plex Mono', 'font-size': 20, fill: GD });
const slp = gp.mk('path', { d: `M${gp.X(1)},${gp.Y(4)} H${gp.X(2)} V${gp.Y(8)}`, fill: 'none', stroke: MU, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' });
const slpL = tx(gS, gp.X(2) + 12, gp.Y(6) + 8, 'slope = R', { 'font-size': 22 });
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="rV" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="rI" style="color:${VI}">0.00</span><span class="u">A</span>
  <span class="k">V / I</span><span class="v" id="rRo">-</span><span class="u">Ω</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'V over I never changes for one resistor!' });

/* ================= L: Ohm's law ================= */
const lS = $('#lS');
const ga = PUC.graph(lS, { x: 70, y: 340, w: 270, h: 150, xmax: 1, ymax: 1, xl: 'V', yl: 'I' }), gb = PUC.graph(lS, { x: 450, y: 340, w: 270, h: 150, xmax: 1, ymax: 1, xl: 'V', yl: 'I' });
const gac = ga.curve(INK), gbc = gb.curve(GD);
const gaL = mono(lS, 205, 540, 'metal wire · ohmic', { 'text-anchor': 'middle', 'font-weight': 600 }), gbL = mono(lS, 585, 540, 'diode · non ohmic', { 'text-anchor': 'middle', 'font-weight': 600, fill: GD });
const lRows = rows($('#lSteps'), [
  [K(`${Vv} \\propto ${Iv}`), 'at a steady temperature', 92],
  [K(`${Vv} = ${Iv}\\,R`), 'R is a constant', 196],
  [K(`R = \\dfrac{${Vv}}{${Iv}}`), 'turn it around', 300],
  [K(`1\\,${OM} = 1\\,\\text{V/A}`), 'the ohm', 424],
  ['<span class="tt">Diode: non ohmic</span>', 'does not obey the law', 510]]);
const tLR = [wt('L2', 'directly'), wt('L3', 'equals'), wt('L4', 'R'), wt('L5', 'One'), wt('L6', 'diode')];

/* ================= G: what decides R + worked example ================= */
const wS = $('#wS'), gW = mk(wS, 'g'), wW = mk(wS, 'g');
const wBody = mk(gW, 'rect', { x: 80, y: 0, width: 300, height: 60, fill: '#F1D9A0', stroke: INK, 'stroke-width': 3 });
const wCap = mk(gW, 'ellipse', { cx: 380, cy: 170, rx: 15, ry: 30, fill: '#E8C47A', stroke: INK, 'stroke-width': 3 });
const wCap0 = mk(gW, 'ellipse', { cx: 80, cy: 170, rx: 15, ry: 30, fill: '#F1D9A0', stroke: INK, 'stroke-width': 3 });
const wBr = W(gW, '', { 'stroke-width': 3 }), wBrL = tx(gW, 0, 0, 'L', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 });
const wAL = tx(gW, 0, 0, 'A', { 'font-style': 'italic', 'font-size': 28 });
const wMat = mono(gW, 80, 106, 'copper', { 'font-weight': 600, fill: '#B7791F' });
$('#gRo').innerHTML = `<span class="k">L</span><span class="v" id="gl">×1</span><span class="u"></span><span class="k">A</span><span class="v" id="ga">×1</span><span class="u"></span><span class="k">R</span><span class="v" id="gr">×1</span><span class="u"></span>`;
const tLen = wt('G2', 'longer'), tWid = wt('G3', 'wider'), tThin = wt('G6', 'long');
const geo = t => { const a = M.io((t - tLen) / 0.7), b = M.io((t - tWid) / 0.7), c2 = M.io((t - tThin) / 0.7);
  const len = 300 + 300 * a, d = 60 * Math.sqrt(1 + b) * (c2 > 0 ? M.lerp(1, Math.sqrt(0.5 / 2), c2) : 1); return { len, d, L: 1 + a, A: (1 + b) * M.lerp(1, 0.25, c2) }; };
// worked: resistor with V across and I through
const wRes = W(wW, 'M100,170 H260 L276,146 L304,194 L332,146 L360,194 L388,146 L416,194 L432,170 H600', {});
const wBrV = W(wW, 'M260,108 V90 H432 V108', { stroke: TE }), wVL = tx(wW, 346, 76, '6 V', { 'text-anchor': 'middle', fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 26 });
const wIa = PUC.arrow(wW, VI), wIL = tx(wW, 120, 238, '0.3 A', { fill: VI, 'font-family': 'IBM Plex Mono', 'font-size': 24 });
const wRL = tx(wW, 346, 252, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 });
$('#wRo').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="wv" style="color:${TE}">6.0</span><span class="u">V</span><span class="k" style="color:${VI}">I</span><span class="v" id="wi" style="color:${VI}">0.30</span><span class="u">A</span><span class="k">R</span><span class="v" id="wr">?</span><span class="u">Ω</span>`;
const gRows = rows($('#gSteps'), [
  [K('R \\propto L'), 'longer wire, more bumps', 92],
  [K('R \\propto \\dfrac{1}{A}'), 'wider wire, more paths', 176],
  [K('R = \\rho\\,\\dfrac{L}{A}'), 'ρ depends on the material', 284],
  [K(`\\rho\\ \\text{in}\\ ${OM}\\,\\text{m}`), 'resistivity', 402],
  [K(`\\rho_{\\text{copper}} \\approx 1.7\\times10^{-8}\\,${OM}\\,\\text{m}`), 'very low', 492]]);
const tGR = [wt('G2', 'proportional'), wt('G3', 'inversely'), wt('G4', 'R'), wt('G5', 'Rho'), wt('G5', 'Copper')];
const wRows = rows($('#wSteps'), [
  [K(`${Vv} = 6\\,\\text{V},\\quad ${Iv} = 0.3\\,\\text{A}`), 'given', 92],
  [K(`R = \\dfrac{${Vv}}{${Iv}} = \\dfrac{6}{0.3}`), '', 170],
  [K(`R = 20\\,${OM}`), 'fixed by the resistor', 300],
  [K(`${Iv} = \\dfrac{${Vv}}{R} = \\dfrac{9}{20} = 0.45\\,\\text{A}`), 'at 9 V', 398]]);
const tWR = [wt('W1', 'six'), wt('W2', 'R'), wt('W2', 'twenty'), wt('W3', 'I')];
const t9 = wt('W3', 'nine');

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A bigger V makes a bigger R', right: 'R depends on material, L, A and temperature', y0: 96, y1: 184 });
const tcS = $('#tcS');
const gx = PUC.graph(tcS, { x: 70, y: 70, w: 300, h: 180, xmax: 0.5, ymax: 10, xl: 'I', yl: 'V' });
const gxc = gx.curve(INK, 4); const gxP = [[0.3, 6], [0.45, 9]].map(([a, b]) => gx.mk('circle', { cx: gx.X(a), cy: gx.Y(b), r: 8, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const gxL = [tx(tcS, 420, 140, '6 V ÷ 0.3 A = 20 Ω', { 'font-family': 'IBM Plex Mono', 'font-size': 22 }), tx(tcS, 420, 196, '9 V ÷ 0.45 A = 20 Ω', { 'font-family': 'IBM Plex Mono', 'font-size': 22 })];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: "State Ohm's law; define resistance and resistivity; problems with V = IR and R = ρL/A" });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A wire of resistance 10&nbsp;Ω is stretched evenly to three times its length, then connected to a 9&nbsp;V cell. What current flows?', qW: 780,
  opts: [K('0.9\\,\\text{A}'), K('0.3\\,\\text{A}'), K('0.1\\,\\text{A}'), K('2.7\\,\\text{A}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K("L' = 3L,\\ \\ A' = A/3")], [K(`R' = 9R = 90\\,${OM}`)], [K(`${Iv} = \\dfrac{${Vv}}{R'} = \\dfrac{9}{90}`)], [K(`${Iv} = 0.1\\,\\text{A}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Three'), wt('A3', 'So'), wt('A4', 'Then'), wt('A4', 'Nine')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 96, dy: 80, title: "Ohm's law and resistance · formula card", txt: [0, 0, 0, 1, 1],
  lines: [K(`${Vv} = ${Iv}\\,R \\qquad R = ${Vv}/${Iv}`), K(`1\\,${OM} = 1\\,\\text{V/A}`), K(`R = \\rho\\,L/A \\qquad \\rho\\ \\text{in}\\ ${OM}\\,\\text{m}`),
    "Ohm's law: <i>V</i> ∝ <i>I</i> at a steady temperature", 'Stretched <i>n</i> times longer: <i>R</i> becomes <i>n</i>² times'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 09', topic: 'Series and parallel circuits', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B8', 'On'), 1.1, 1300, 520], [T1('B8'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tB + 0.5, tT - 0.4], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, wt('H1', 'long') - 0.2, out, { dx: 60, dy: 0, ...o }); drawSeq(cab1, t, wt('H1', 'long'), 0.6, 0.15);
    M.rise($('#h1T'), t, tSlow - 0.3); M.vis($('#h1B'), t, tSlow - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#h1B i').style.width = (300 * 0.06 + 300 * 0.22 * M.clamp((t - tSlow) / 8)).toFixed(1) + 'px';
    M.vis($('#h2C'), t, wt('H2', 'short') - 0.2, out, { dx: 60, dy: 0, ...o }); drawSeq(cab2, t, wt('H2', 'short'), 0.4, 0.15);
    M.rise($('#h2T'), t, tFast - 0.3); M.vis($('#h2B'), t, tFast - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#h2B i').style.width = (300 * 0.06 + 300 * 0.84 * M.o3((t - tFast) / 2.6)).toFixed(1) + 'px';
    M.vis($('#h1Q'), t, wt('H2', 'what') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* R: resistance */
  const rOn = t >= tR - 0.05 && t < tB + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tB - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    ATOMS.forEach(([x, y, e], i) => { const v = t >= wt('R2', 'vibrating') - 0.2 ? 1 : 0.35; PUC.attr(e, 'cx', (x + 3 * v * Math.sin(11 * t + i * 1.7)).toFixed(1)); PUC.attr(e, 'cy', (y + 3 * v * Math.cos(13 * t + i)).toFixed(1)); M.vis(e, t, tR + 0.4 + (i % 9) * 0.03, 1e9, { dy: 0, fade: 0.2 }); });
    eR.forEach((f, k) => f.set(55 * (t - tR) + k * 50, t >= tR + 0.6)); M.vis($('#rE'), t, tR + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#rStrip'), t, wt('R2', 'slows') - 0.1, 1e9, { dy: 24 });
    M.vis($('#rt0'), t, wt('R1', 'Every') - 0.1, 1e9, { dy: 20 }); M.vis($('#rt1'), t, wt('R2', 'bumping') - 0.1, 1e9, { dy: 20 });
    M.vis($('#rBox'), t, T0('R3') + 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.rise($('#rDef'), t, T0('R3') + 0.2, { st: 0.04 });
    drawSeq(rSymP, t, wt('R3', 'resistance') + 0.1, 0.6); M.vis(rSymL, t, wt('R3', 'resistance') + 0.5, 1e9, { dy: 0, fade: 0.2 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tL + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tL - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    const tb = wt('B2', 'variable') - 0.2;
    drawSeq(bw, t, tb, 0.45, 0.15); drawSeq(bCell, t, tb, 0.25, 0.1); M.vis(bArrH, t, tb + 0.3, 1e9, { dy: 0, fade: 0.15 });
    [am, amT].forEach(e => M.vis(e, t, wt('B2', 'ammeter') - 0.1, 1e9, { dy: 0, fade: 0.2 })); M.draw(bRes, t, wt('B2', 'resistor') - 0.2, 0.4);
    drawSeq(vmW, t, wt('B2', 'voltmeter') - 0.2, 0.3, 0.1); [vm, vmT, ...nodes].forEach(e => M.vis(e, t, wt('B2', 'voltmeter'), 1e9, { dy: 0, fade: 0.2 }));
    fadeAt([...bLb, supV, rVal, ...lbM], t, wt('B2', 'ammeter'), 0.08);
    const V = Vnow(t), R = Rnow(t), I = V / R;
    M.setT(supV, V.toFixed(0) + ' V'); M.setT(rVal, R + ' Ω');
    PUC.attr(bRes, 'stroke', M.mix(INK, AM, M.io((t - tSwap) / 0.2) * (1 - M.io((t - tSwap - 0.8) / 0.4))));
    eB.set(offB(t), t >= tS1[0]); M.vis($('#ckE'), t, tS1[0], 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rV'), V.toFixed(1)); M.setT($('#rI'), I.toFixed(2)); M.setT($('#rRo'), V > 0 ? (V / I).toFixed(1) : '-');
    [gp.axes, gp.xlab, gp.ylab, ...gS.querySelectorAll('text:not([data-x])')].forEach(e => {});
    M.vis(gS, t, tB + 0.4, 1e9, { dy: 0, fade: 0.2 });
    P1.forEach((p, k) => M.vis(p, t, tS1[k] + 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    P2.forEach((p, k) => M.vis(p, t, tS2[k] + 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(ln1, t, wt('B5', 'straight') - 0.1, 0.7); M.vis(l1L, t, wt('B5', 'straight') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.draw(ln2, t, wt('B7', 'steep') - 0.3, 0.7); M.vis(l2L, t, wt('B7', 'steep'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(slp, t, wt('B8', 'slope') - 0.1, 0.5); M.vis(slpL, t, wt('B8', 'slope') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    avB(t, wt('B8', 'resistance') + 0.4, out);
  }

  /* L: Ohm's law */
  const lOn = t >= tL - 0.05 && t < tT + 0.05; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tT - 0.3;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, tL + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#lY'), t, wt('L1', 'eighteen') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.rise($('#lN'), t, wt('L1', 'Georg') - 0.1); M.vis($('#lP'), t, wt('L1', 'German'), 1e9, { dy: 10 });
    M.vis($('#lTag'), t, wt('L2', 'steady') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runRows(lRows, t, tLR);
    M.vis($('#lBox'), t, tLR[1] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    const t6 = wt('L6', 'Metals') - 0.2;
    const t2 = wt('L2', 'directly') + 0.3;
    [ga.axes, ga.xlab, ga.ylab].forEach(e => M.vis(e, t, t2, 1e9, { dy: 0, fade: 0.2 })); [gb.axes, gb.xlab, gb.ylab].forEach(e => M.vis(e, t, t6, 1e9, { dy: 0, fade: 0.2 }));
    gac(u => [u, 0.9 * u], 0, M.clamp((t - t2 - 0.2) / 1.2)); M.vis(gaL, t, t6 + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const td = wt('L6', 'diode'); gbc(u => [u, Math.min(1, 0.004 * (Math.exp(7 * u) - 1))], 0, M.clamp((t - td) / 0.9) * 0.79, 80); M.vis(gbL, t, td + 0.4, 1e9, { dy: 0, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tG; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tG - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Resistance') - 0.05, { out: tG - 0.35, outDur: 0.25 }); }

  /* G: what decides R + worked example */
  const gOn = t >= tG - 0.05 && t < tX + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tX - 0.32, wOn = t >= tW;
    M.vis($('#gL'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gR'), t, tG + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gLL1'), t, tG + 0.3, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gLL2'), t, tW + 0.1, 1e9, { dy: 10 });
    M.vis($('#gRL1'), t, tG + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#gRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    // wire
    M.vis(gW, t, tG + 0.5, tW - 0.3, { dy: 16, outDur: 0.25 });
    const g = geo(t), cy = 190, x1 = 80 + g.len;
    PUC.attr(wBody, 'y', (cy - g.d / 2).toFixed(1)); PUC.attr(wBody, 'height', g.d.toFixed(1)); PUC.attr(wBody, 'width', g.len.toFixed(1));
    PUC.attr(wCap, 'cx', x1.toFixed(1)); PUC.attr(wCap, 'cy', cy); PUC.attr(wCap, 'ry', (g.d / 2).toFixed(1)); PUC.attr(wCap, 'rx', (g.d / 4).toFixed(1));
    PUC.attr(wCap0, 'cy', cy); PUC.attr(wCap0, 'ry', (g.d / 2).toFixed(1)); PUC.attr(wCap0, 'rx', (g.d / 4).toFixed(1));
    PUC.attr(wBr, 'd', `M80,${cy + 62} V${cy + 74} H${x1.toFixed(1)} V${cy + 62}`); PUC.attr(wBrL, 'x', ((80 + x1) / 2).toFixed(1)); PUC.attr(wBrL, 'y', cy + 106);
    PUC.attr(wAL, 'x', (x1 + g.d / 4 + 14).toFixed(1)); PUC.attr(wAL, 'y', cy + 10);
    M.vis(wMat, t, wt('G4', 'material') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#gRo'), t, tG + 0.8, tW - 0.3, { dy: 12, outDur: 0.25 });
    const fm = v => '×' + (Math.abs(v - Math.round(v)) < 0.02 ? Math.round(v) : v.toFixed(2).replace(/0$/, ''));
    M.setT($('#gl'), fm(g.L)); M.setT($('#ga'), g.A < 0.99 ? '×0.5' : fm(g.A)); M.setT($('#gr'), fm(g.L / (g.A < 0.99 ? M.lerp(1, 0.5, M.io((t - tThin) / 0.7)) * 2 : g.A)));
    runRows(gRows, t, tGR, tW - 0.3);
    M.vis($('#gBox'), t, tGR[2] + 0.5, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    // worked example
    M.vis(wW, t, tW + 0.1, 1e9, { dy: 16 });
    M.vis(wBrV, t, tWR[0], 1e9, { dy: 0, fade: 0.2 }); M.vis(wVL, t, tWR[0] + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(wRL, t, tW + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const ia = M.io((t - tWR[0] - 0.3) / 0.4); wIa.set(120, 206, 120 + 110 * ia, 206); M.vis(wIL, t, tWR[0] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const nine = t >= t9;
    M.setT(wVL, nine ? '9 V' : '6 V'); M.setT(wIL, nine ? '0.45 A' : '0.3 A');
    M.vis($('#wRo'), t, tW + 0.4, 1e9, { dy: 12 });
    M.setT($('#wv'), nine ? '9.0' : '6.0'); M.setT($('#wi'), nine ? '0.45' : '0.30'); M.setT($('#wr'), t >= tWR[2] ? '20' : '?');
    wRows.forEach(r => M.hide(r, !wOn)); if (wOn) runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[2] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'It') - 0.05, tRight: wt('X3', 'depends') - 0.2 });
    gxc(u => [u, 20 * u], 0, M.clamp((t - tX - 0.6) / 0.8) * 0.48);
    gxP.forEach((p, i) => M.vis(p, t, tX + 1.0 + i * 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 })); fadeAt(gxL, t, wt('X3', 'only') - 0.6, 0.3);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'State') - 0.2 });
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
