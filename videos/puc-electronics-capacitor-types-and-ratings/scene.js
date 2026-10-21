// PUC Electronics Ep 28 - Capacitor types and ratings ("Breadboard" style, Lab Notebook world)
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

/* capacitor symbol: two parallel plates with leads; o.vari adds the tuning arrow */
const capSym = (p, cx, cy, o = {}) => { const h = o.h ?? 90, g = o.gap ?? 26, l = o.lead ?? 80, sw = o.sw ?? 8;
  const a = [W(p, `M${cx - g / 2 - l},${cy} H${cx - g / 2}`), W(p, `M${cx - g / 2},${cy - h / 2} V${cy + h / 2}`, { 'stroke-width': sw, 'stroke-linecap': 'butt' }), W(p, `M${cx + g / 2},${cy - h / 2} V${cy + h / 2}`, { 'stroke-width': sw, 'stroke-linecap': 'butt' }), W(p, `M${cx + g / 2},${cy} H${cx + g / 2 + l}`)];
  if (o.vari) { a.push(W(p, `M${cx - 44},${cy + 44} L${cx + 40},${cy - 40}`, { 'stroke-width': 3 })); a.push(mk(p, 'path', { d: `M${cx + 46},${cy - 46} L${cx + 26},${cy - 40} L${cx + 40},${cy - 26} Z`, fill: INK })); }
  return a; };
/* component drawings (front view) */
const drawCer = (p, cx, cy, s, lab) => { const g = mk(p, 'g'); W(g, `M${cx - 14 * s},${cy + 30 * s} V${cy + 92 * s} M${cx + 14 * s},${cy + 30 * s} V${cy + 92 * s}`, { stroke: '#8A93A6', 'stroke-width': 4 });
  mk(g, 'circle', { cx, cy, r: 46 * s, fill: '#E39A4A', stroke: INK, 'stroke-width': 3.5 }); if (lab) mono(g, cx, cy + 8 * s, lab, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 24 * s }); return g; };
const drawBox = (p, cx, cy, s, fill, lab, fs = 22) => { const g = mk(p, 'g'); W(g, `M${cx - 20 * s},${cy + 34 * s} V${cy + 92 * s} M${cx + 20 * s},${cy + 34 * s} V${cy + 92 * s}`, { stroke: '#8A93A6', 'stroke-width': 4 });
  mk(g, 'rect', { x: cx - 62 * s, y: cy - 40 * s, width: 124 * s, height: 80 * s, rx: 14 * s, fill, stroke: INK, 'stroke-width': 3.5 }); if (lab) mono(g, cx, cy + 8 * s, lab, { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': fs * s }); return g; };
const drawElec = (p, cx, cy, s, lab) => { const g = mk(p, 'g');
  W(g, `M${cx - 16 * s},${cy + 64 * s} V${cy + 110 * s}`, { stroke: '#8A93A6', 'stroke-width': 4 }); W(g, `M${cx + 16 * s},${cy + 64 * s} V${cy + 96 * s}`, { stroke: '#8A93A6', 'stroke-width': 4 });
  mk(g, 'rect', { x: cx - 44 * s, y: cy - 66 * s, width: 88 * s, height: 130 * s, rx: 12 * s, fill: '#2F4A7A', stroke: INK, 'stroke-width': 3.5 });
  mk(g, 'rect', { x: cx + 14 * s, y: cy - 64 * s, width: 24 * s, height: 126 * s, fill: '#C8D3E6' });
  [-40, -10, 20].forEach(dy => mono(g, cx + 26 * s, cy + (dy + 8) * s, '-', { 'text-anchor': 'middle', fill: '#2F4A7A', 'font-weight': 700, 'font-size': 26 * s }));
  if (lab) lab.forEach((l, i) => mono(g, cx - 16 * s, cy + (-14 + i * 26) * s, l, { 'text-anchor': 'middle', fill: '#FFFFFF', 'font-weight': 600, 'font-size': 15 * s }));
  return g; };
/* gang capacitor top view: stator = right half disc, rotor half disc turned by phi (deg); overlap sector = phi */
const gang = (p, cx, cy, r) => { const g = mk(p, 'g');
  const pt = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
  const half = a0 => { const [x0, y0] = pt(a0), [x1, y1] = pt(a0 + 180); return `M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`; };
  const st = mk(g, 'path', { d: half(-90), fill: '#E3E6EC', stroke: INK, 'stroke-width': 3.5 });
  const ov = mk(g, 'path', { d: '', fill: C.ac2, stroke: AM, 'stroke-width': 3 });
  const ro = mk(g, 'path', { d: half(90), fill: 'rgba(201,206,216,0.0)', stroke: INK, 'stroke-width': 3.5, 'stroke-dasharray': '10 7' });
  const sh = mk(g, 'circle', { cx, cy, r: 14, fill: INK }); ctr(g);
  return { g, set(phi) { PUC.attr(ro, 'd', half(90 - phi)); if (phi < 0.5) { PUC.attr(ov, 'd', ''); return; } const [x0, y0] = pt(90 - phi), [x1, y1] = pt(90);
    PUC.attr(ov, 'd', `M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${phi > 180 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`); } }; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'but') - 0.2;
const tT = T0('T1'), tV = T0('V1'), tB = T0('B1'), tR = T0('R1'), tST = T0('ST'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tST, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const fanS = $('#fanS');
const fanHub = mk(mk(fanS, 'g', { transform: 'translate(150,150)' }), 'g'), fanRot = mk(fanHub, 'g');
[0, 120, 240].forEach(a => mk(fanRot, 'path', { d: 'M-16,-10 C-30,-60 -24,-128 0,-136 C24,-128 30,-60 16,-10 Z', fill: '#fff', stroke: INK, 'stroke-width': 3.5, transform: `rotate(${a})` }));
mk(fanRot, 'circle', { cx: 0, cy: 0, r: 30, fill: '#fff', stroke: INK, 'stroke-width': 4 }); mk(fanRot, 'circle', { cx: 0, cy: 0, r: 9, fill: INK });
const hum = [W(fanS, 'M262,120 q8,8 0,16 q-8,8 0,16', { 'stroke-width': 3, stroke: C.red }), W(fanS, 'M38,120 q-8,8 0,16 q8,8 0,16', { 'stroke-width': 3, stroke: C.red })];
const tPush = wt('H1', 'push'), tGo = wt('H1', 'off');
const fanAng = t => { if (t < tGo) return 0; const u = t - tGo; return 380 * u - 300 * (1 - Math.exp(-u / 0.8)) * 0.8; };
const boxS = $('#boxS');
const fBox = [mk(boxS, 'rect', { x: 20, y: 30, width: 280, height: 150, rx: 18, fill: '#F3F1EA', stroke: INK, 'stroke-width': 4 }), W(boxS, 'M80,30 V6 M240,30 V6', { stroke: '#8A93A6', 'stroke-width': 5 })];
const fL1 = mono(boxS, 160, 98, '2.5 µF', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 34 }), fL2 = mono(boxS, 160, 146, '440 V', { 'text-anchor': 'middle', fill: TE, 'font-weight': 600, 'font-size': 34 });
const fSym = capSym(boxS, 520, 105, { h: 100, gap: 30, lead: 90 });
const fSymL = mono(boxS, 520, 190, 'a capacitor', { 'text-anchor': 'middle', 'font-size': 20 });

/* ================= T: types ================= */
const tree = $('#tree');
const trP = [W(tree, 'M800,44 V60 M400,60 H1200 M400,60 V74 M1200,60 V74', { 'stroke-width': 3, stroke: MU })];
const trRoot = document.createElement('div'); trRoot.className = 'pillp ink'; trRoot.style.cssText = 'left:0;top:0'; trRoot.textContent = 'CAPACITORS'; $('#sT').appendChild(trRoot);
const trFx = document.createElement('div'); trFx.className = 'pillp ac'; trFx.textContent = 'FIXED · one value'; $('#sT').appendChild(trFx);
const trVr = document.createElement('div'); trVr.className = 'pillp'; trVr.textContent = 'VARIABLE · next'; $('#sT').appendChild(trVr);
const TYP = [['Ceramic', 'pF to nF', 'small, cheap, good at high frequency'], ['Mica', 'pF to nF', 'very stable and accurate, the value does not drift'], ['Paper / film', 'nF to a few µF', 'long sheets rolled up tight'], ['Electrolytic', '1 µF to 1000s of µF', 'the most capacitance, but polarised: + and -']];
$('#tts').innerHTML = TYP.map(([n, r, x], i) => `<div class="card tt" style="left:${160 + i * 408}px"><svg width="376" height="230"></svg><div class="nm">${n}</div><div class="rg">${r}</div><div class="nt">${x}</div></div>`).join('');
const TT = [...$('#tts').children], TS = TT.map(d => d.querySelector('svg'));
const tDr = [drawCer(TS[0], 188, 96, 1, '104'), drawBox(TS[1], 188, 100, 1, '#B5523B', '100'), drawBox(TS[2], 188, 100, 1, '#F0C64A', '473J'), drawElec(TS[3], 188, 92, 1, ['1000µF', '25V'])];
const ePlus = mono(TS[3], 140, 222, '+ longer', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 18 }), eMin = mono(TS[3], 244, 222, '- stripe', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 18 });
const tTy = [wt('T3', 'Ceramic'), wt('T4', 'Mica'), wt('T5', 'Paper'), wt('T6', 'Electrolytic')];

/* ================= V: variable ================= */
const vS = $('#vS'), G1 = gang(vS, 392, 290, 190);
const vKn = mono(vS, 392, 530, 'TURN THE KNOB', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 20 });
const vSt = mono(vS, 560, 120, 'FIXED PLATES', { 'text-anchor': 'middle', fill: MU, 'font-weight': 600, 'font-size': 18 }), vRo = mono(vS, 200, 120, 'MOVING PLATES', { 'text-anchor': 'middle', fill: MU, 'font-weight': 600, 'font-size': 18 });
const vOv = mono(vS, 392, 572, '', { 'text-anchor': 'middle', fill: C.gold, 'font-weight': 600, 'font-size': 20 });
const vAir = mono(vS, 680, 470, 'air gap', { 'text-anchor': 'end', fill: MU, 'font-size': 18 });
const vSteps = [[K(`${tc(INK, 'C')} = \\dfrac{K\\,\\varepsilon_0 A}{d}`), 'from Ep 27', 88], [K(`A = \\text{overlap area}`), 'the knob changes A', 222], [K(`\\text{more overlap} \\Rightarrow \\text{more } ${tc(INK, 'C')}`), '', 300]];
$('#vSteps').innerHTML = vSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:34px">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const vRows = [...$('#vSteps').children];
const trS = $('#trS');
const trL = mono(trS, 36, 404, 'TRIMMER', { fill: MU, 'font-weight': 600, 'font-size': 18 });
const trD = mk(trS, 'g'); W(trD, 'M100,520 V560 M140,520 V560', { stroke: '#8A93A6', 'stroke-width': 4 }); mk(trD, 'rect', { x: 70, y: 430, width: 100, height: 92, rx: 10, fill: '#F0C64A', stroke: INK, 'stroke-width': 3.5 });
mk(trD, 'circle', { cx: 120, cy: 476, r: 28, fill: '#fff', stroke: INK, 'stroke-width': 3 }); const trSlot = W(trD, 'M100,476 H140', { 'stroke-width': 5 });
const trT = [tx(trS, 210, 470, 'Tiny, set once with a', { 'font-size': 26, 'font-weight': 500 }), tx(trS, 210, 506, 'screwdriver, then left', { 'font-size': 26, 'font-weight': 500 })];
const tV3 = [wt('V3', 'C'), wt('V3', 'Turning'), wt('V3', 'so')];
const phiV = t => 150 * M.io((t - wt('V2', 'turns') + 0.1) / 1.6) - 90 * M.io((t - wt('V3', 'Turning')) / 1.0) + 90 * M.io((t - wt('V3', 'changes', 1)) / 1.2);

/* ================= B: breadboard (tuned circuit) ================= */
const ck = $('#ckS');
const ant = [W(ck, 'M150,70 V150'), W(ck, 'M120,70 L150,100 L180,70', { 'stroke-width': 3.5 })];
const coil = W(ck, 'M150,190 ' + [0, 1, 2, 3, 4].map(i => `a 18,18 0 0 1 0,36`).join(' ') + ' V420', {});
const bW = [W(ck, 'M150,150 V190'), W(ck, 'M150,150 H400 V230'), W(ck, 'M150,420 V470 H400 V330'), W(ck, 'M400,150 H520'), W(ck, 'M400,470 H520')];
const vc = [W(ck, 'M340,266 H460', { 'stroke-width': 8, 'stroke-linecap': 'butt' }), W(ck, 'M340,294 H460', { 'stroke-width': 8, 'stroke-linecap': 'butt' }), W(ck, 'M400,230 V266'), W(ck, 'M400,294 V330'),
  W(ck, 'M350,330 L452,226', { 'stroke-width': 3 }), mk(ck, 'path', { d: 'M458,220 L438,226 L452,240 Z', fill: INK })];
const amp = [W(ck, 'M520,120 V500 L600,310 Z', { fill: '#fff' })];
const bLb = [tx(ck, 100, 300, 'L', { 'font-style': 'italic', 'font-size': 28, 'text-anchor': 'end' }), mono(ck, 100, 328, 'coil', { 'text-anchor': 'end', 'font-size': 18 }), mono(ck, 100, 352, '250 µH', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 18 }),
  tx(ck, 476, 266, 'C', { 'font-style': 'italic', 'font-size': 28 }), mono(ck, 196, 100, 'antenna', { 'font-size': 18 }), mono(ck, 560, 540, 'to amplifier', { 'text-anchor': 'middle', 'font-size': 18 })];
const G2 = gang(ck, 770, 300, 110);
const bKn = mono(ck, 770, 470, 'GANG · TOP VIEW', { 'text-anchor': 'middle', fill: MU, 'font-weight': 600, 'font-size': 18 });
const bLink = W(ck, 'M640,300 H600', { 'stroke-width': 2.5, stroke: MU, 'stroke-dasharray': '6 6' });
const tKnob = wt('B2', 'Turn'), tKe = wt('B4', 'falls') + 0.8;
const kU = t => M.io((t - tKnob) / (tKe - tKnob));
const Cof = t => 50 + 350 * kU(t), fOf = t => 1 / (2 * Math.PI * Math.sqrt(250e-6 * Cof(t) * 1e-12)) / 1e3;
// scope: slow-motion display, display frequency proportional to the real one; phase integrated
const phase = t => { const N = 60, a = tB; if (t <= a) return 0; const dt = (t - a) / N; let s = 0; for (let i = 0; i < N; i++) s += fOf(a + (i + 0.5) * dt) * dt; return 2 * Math.PI * s * 0.0021; };
const SC = scope($('#scS'), 592, 200), trO = SC.tr(AM);
const sL = [SC.lab(14, 26, 'CH2 · TUNED WAVE', AM)];
$('#ro1').innerHTML = `<span class="k">C</span><span class="v" id="r1C">50</span><span class="u">pF</span>
  <span class="k">f</span><span class="v" id="r1F">1424</span><span class="u">kHz</span>
  <span class="k n">OVERLAP</span><span class="v" id="r1O">13</span><span class="u">%</span>`;

/* ================= R: ratings ================= */
const RR = [['Capacitance + tolerance', 'the real value can differ from the marked one'], ['Working voltage', 'the highest voltage the dielectric can safely take'], ['Polarity (electrolytic)', 'stripe with minus signs = negative lead']];
$('#rRows').innerHTML = RR.map(([a, b], i) => `<div class="rr" style="top:${84 + i * 128}px"><div class="n">${i + 1}</div><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');
const RRw = [...$('#rRows').children];
const rS = $('#rS');
const VX = v => 60 + 600 * v / 40;
const gBar = mk(rS, 'rect', { x: 60, y: 210, width: 600, height: 26, rx: 13, fill: C.soft });
const gFill = mk(rS, 'rect', { x: 60, y: 210, width: 0, height: 26, rx: 13, fill: C.ok });
const gRate = W(rS, `M${VX(25)},196 V250`, { stroke: C.red, 'stroke-width': 4 }), gRateL = mono(rS, VX(25), 274, 'RATED 25 V', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 18 });
const gTk = [0, 10, 20, 30, 40].map(v => mono(rS, VX(v), 190, v + ' V', { 'text-anchor': 'middle', 'font-size': 16 }));
const gCap = capSym(rS, 210, 120, { h: 70, gap: 30, lead: 70, sw: 7 });
const gCrack = W(rS, 'M210,90 L202,104 L216,116 L204,130 L214,150', { stroke: C.red, 'stroke-width': 3.5 });
const gV = mono(rS, 380, 110, '', { fill: TE, 'font-weight': 600, 'font-size': 34 }), gS = mono(rS, 380, 146, '', { 'font-weight': 600, 'font-size': 20 });
const rEl = drawElec(rS, 190, 418, 0.9, ['100µF', '25V']);
const rElRot = mk(rS, 'g', { transform: 'rotate(180 520 440)' }), rElB = drawElec(rElRot, 520, 418, 0.9, ['100µF', '25V']);
const rPlus = [mono(rS, 160, 548, '+ (longer)', { 'text-anchor': 'middle', fill: C.ok, 'font-weight': 600, 'font-size': 18 }), mono(rS, 240, 528, '-', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 22 })];
const rBack = [mono(rS, 520, 562, 'FITTED BACKWARDS', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 18 })];
const rBackX = mk(rS, 'g', { transform: 'translate(594,330)' }); const rBackXi = ctr(mk(rBackX, 'g')); rBackXi.innerHTML = M.icon('x', 34, C.red, 3.2);
const Vapp = t => 12 * M.io((t - wt('R3', 'working') + 0.2) / 1.2) + 18 * M.io((t - wt('R3', 'Go')) / 1.0) - 30 * M.io((t - wt('R4', 'So')) / 0.6) + 12 * M.io((t - wt('R4', 'higher')) / 0.6);
const tRr = [wt('R2', 'First'), wt('R3', 'Second'), wt('R5', 'Third')];

/* ================= D: code + worked example ================= */
const dS = $('#dS');
const dCer = drawCer(dS, 392, 200, 2.2, '');
const dChars = ['4', '7', '3', 'J'].map((c, i) => mono(dS, 326 + i * 44, 222, c, { 'text-anchor': 'middle', fill: INK, 'font-weight': 700, 'font-size': 54 }));
const CLX = [120, 290, 480, 660];
const dLead = [0, 1, 2, 3].map(i => W(dS, `M${326 + i * 44},${250} V${300} L${CLX[i]},${380}`, { 'stroke-width': 2.5, stroke: MU }));
$('#dLab').innerHTML = [['DIGIT 1', '4'], ['DIGIT 2', '7'], ['ZEROS', '000'], ['TOLERANCE', '± 5%']].map(([a, b], i) => `<div class="cl" style="left:${CLX[i] - 75}px;top:392px"><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');
const dLabs = [...$('#dLab').children];
$('#dL').querySelectorAll('.cl .b')[2].style.color = C.gold;
const dRows = [['the answer is in picofarads (pF)', 84], ['the first two digits are the value', 162], ['the third digit = how many zeros', 240]];
$('#dSteps').innerHTML = dRows.map(([s, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx t">${s}</div></div>`).join('') +
  '';
const dR = [...$('#dSteps').children];
$('#lets').innerHTML = [['J', '± 5%'], ['K', '± 10%'], ['M', '± 20%']].map(([l, p], i) => `<div class="lc" style="left:${36 + i * 236}px;top:352px"><span style="color:var(--ac);font-size:32px">${l}</span> ${p}</div>`).join('');
const LC = [...$('#lets').children];
const wRows = [[K(`47 \\ \\text{and}\\ 000 = 47\\,000\\,\\text{pF}`), 84], [K(`= 47\\,\\text{nF} = 0.047\\,\\mu\\text{F}`), 168], [K(`473\\text{J} = 47\\,\\text{nF} \\pm 5\\%`), 280]];
$('#wSteps').innerHTML = wRows.map(([s, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const wR = [...$('#wSteps').children];
const tDr2 = [wt('D1', 'picofarads'), wt('D2', 'first'), wt('D2', 'third')];
const tLc = [wt('D3', 'J'), wt('D3', 'K'), wt('D3', 'M')];
const tWr = [wt('W2', 'Forty'), wt('W3', 'So'), wt('W4', 'And')];
const tDc = [wt('W2', 'Four'), wt('W2', 'seven'), wt('W2', 'three'), wt('W4', 'J')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: '104 = 104 pF', right: '104 = 10 and 4 zeros = 100 000 pF', y0: 96, y1: 184 });
const xS = $('#tcS'), xCer = drawCer(xS, 120, 130, 1.05, '104');
const XL = [['100 000 pF', 268, 120], ['= 100 nF', 268, 176], ['= 0.1 µF', 268, 232]].map(([s, x, y]) => mono(xS, x, y, s, { fill: INK, 'font-weight': 600, 'font-size': 36 }));
const xWr = mono(xS, 560, 120, '104 pF', { fill: C.red, 'font-weight': 600, 'font-size': 30 }), xSk = W(xS, 'M552,110 H680', { stroke: C.red, 'stroke-width': 4 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Name and compare the types, explain working voltage and polarity, decode a capacitor code' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A ceramic capacitor is marked <b>223K</b>. What are its capacitance and tolerance?', qW: 780,
  opts: ['223 pF, ± 10%', '22 nF, ± 10%', '22 µF, ± 10%', '22 nF, ± 20%'], right: 1, optW: 474, optY: 300 });
const sol = PUC.solution($('#so'), [[K(`22\\ \\text{and}\\ 000 = 22\\,000\\,\\text{pF}`)], [K(`1000\\,\\text{pF} = 1\\,\\text{nF}`)], [K(`= 22\\,\\text{nF}`)], [K(`\\text{K} = \\pm 10\\%`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Twenty'), wt('A3', 'A'), wt('A3', 'So'), wt('A4', 'And')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 380, y: 248, w: 1160, h: 492, y0: 100, dy: 78, title: 'Capacitor types and ratings · formula card', txt: [0, 1, 1, 1, 1],
  lines: [K(`${tc(INK, 'C')} = \\dfrac{K\\,\\varepsilon_0 A}{d} \\qquad \\text{gang: } A = \\text{overlap}`),
    'Fixed: ceramic, mica, paper or film, electrolytic · Variable: gang, trimmer',
    'Code xyz: xy then z zeros, in pF · J ± 5%, K ± 10%, M ± 20%',
    'Ratings: value + tolerance, working voltage, polarity',
    '1000 pF = 1 nF · 1000 nF = 1 µF · electrolytic: stripe = minus'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 29', topic: 'Inductors and inductance', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('V3', 'Turning') - 0.2, 1.1, 552, 560], [T0('V4'), 1, 960, 540], [wt('R6', 'Fit') - 0.3, 1.1, 1300, 560], [T0('R7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const g1 = t >= tB + 0.5 && t < tR;
  M.vis(ghost, t, tB + 0.5, tR - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!g1) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tT - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis(fanHub, t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.25 });
    const jit = t < tGo ? 2.5 * Math.sin(t * 60) : 0;
    PUC.attr(fanRot, 'transform', `rotate(${(fanAng(t) + jit).toFixed(2)})`);
    hum.forEach(h => { M.hide(h, !(t >= wt('H1', 'hums') - 0.1 && t < tGo)); });
    M.vis($('#aPill'), t, wt('H1', 'hums'), tGo - 0.1, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.2 });
    M.vis($('#aPill2'), t, tGo, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, wt('H2', 'electrician') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(fBox[0], t, wt('H2', 'swaps'), 1e9, { dy: 16 }); M.draw(fBox[1], t, wt('H2', 'swaps') + 0.1, 0.3);
    M.vis(fL1, t, wt('H2', 'two') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(fL2, t, wt('H2', 'four') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(fSym, t, wt('H2', 'box') - 0.2, 0.3, 0.1); M.vis(fSymL, t, wt('H2', 'box') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#nwC'), t, wt('H2', 'What') - 0.3, out, { dy: 36, ...o });
    M.vis($('#q1'), t, wt('H2', 'What'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#q2'), t, wt('H2', 'What') + 0.15, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.rise($('#qT'), t, wt('H2', 'mean') - 0.1);
  }

  /* T: types */
  const tOn = t >= tT - 0.05 && t < tV + 0.1; M.hide($('#sT'), !tOn);
  if (tOn) {
    const out = tV - 0.32;
    if (!trRoot._p) { trRoot._p = 1; trRoot.style.left = (960 - trRoot.offsetWidth / 2) + 'px'; trRoot.style.top = '252px'; trFx.style.left = (560 - trFx.offsetWidth / 2) + 'px'; trFx.style.top = '330px'; trVr.style.left = (1360 - trVr.offsetWidth / 2) + 'px'; trVr.style.top = '330px'; }
    M.vis(trRoot, t, tT + 0.1, out, { dy: 16, ...o }); M.draw(trP[0], t, wt('T1', 'families'), 0.5); M.vis(trP[0], t, null, out, { dy: 0, outDur: 0.25 });
    M.vis(trFx, t, wt('T1', 'Fixed') - 0.1, out, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.25 }); M.vis(trVr, t, wt('T1', 'variable') - 0.1, out, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.25 });
    TT.forEach((c, i) => { M.vis(c, t, tTy[i] - 0.2, out, { dy: 36, ...o }); M.vis(tDr[i], t, tTy[i], 1e9, { dy: 16 });
      const lit = M.io((t - tTy[i]) / 0.3) * (i < 3 ? 1 - M.io((t - tTy[i + 1]) / 0.3) : 1); c.style.borderTopColor = M.mix('#D9DCE3', AM, Math.max(lit, 0.0)); c.querySelector('.nm').style.color = M.mix(MU, INK, M.io((t - tTy[i]) / 0.3)); });
    const pol = wt('T7', 'plus'); M.vis(ePlus, t, pol, 1e9, { dy: 0, fade: 0.2 }); M.vis(eMin, t, wt('T7', 'minus'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* V: variable */
  const vOn = t >= tV - 0.05 && t < tB + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = tB - 0.32;
    M.vis($('#vL'), t, tV + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#vR'), t, tV + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(G1.g, t, wt('V2', 'gang') - 0.1, 1e9, { dy: 0, sc: 0.9, fade: 0.2 }); const ph = phiV(t); G1.set(ph);
    fadeAt([vSt, vRo], t, wt('V2', 'metal'), 0.2); M.vis(vAir, t, wt('V2', 'Air'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(vKn, t, wt('V2', 'turns'), 1e9, { dy: 0, fade: 0.2 }); M.setT(vOv, `OVERLAP ${Math.round(ph / 1.8)}%`); M.vis(vOv, t, wt('V2', 'turns') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    vRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tV3[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tV3[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tV3[i] + 0.4, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tV3[i] - 0.15); });
    M.vis($('#vBox'), t, tV3[0] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    const t4 = wt('V4', 'trimmer'); M.vis(trL, t, t4 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(trD, t, t4, 1e9, { dy: 16 }); fadeAt(trT, t, wt('V4', 'set'), 0.15);
    PUC.attr(trSlot, 'transform', `rotate(${(90 * M.io((t - wt('V4', 'screwdriver')) / 0.8)).toFixed(1)} 120 476)`);
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tR + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tR - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    drawSeq(ant, t, tB + 0.5, 0.3, 0.1); M.draw(coil, t, wt('B1', 'coil') - 0.3, 0.6); drawSeq(bW, t, tB + 0.7, 0.35, 0.1); drawSeq(vc, t, wt('B1', 'gang') - 0.2, 0.25, 0.08); drawSeq(amp, t, tB + 1.4, 0.4);
    fadeAt(bLb, t, tB + 1.2, 0.08);
    M.vis(G2.g, t, wt('B1', 'gang'), 1e9, { dy: 0, sc: 0.9, fade: 0.2 }); M.vis(bKn, t, wt('B1', 'gang') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(bLink, t, wt('B1', 'gang') + 0.3, 0.3);
    const u = kU(t); G2.set(24 + 156 * u);
    const s = phase(t);
    trO(τ => 60 * Math.sin(2 * Math.PI * (s - (t - τ) * fOf(t) * 0.0021)), t, tB + 0.6, 4, 100, t >= tB + 0.6, 300);
    sL.forEach(e => M.vis(e, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#r1C'), Math.round(Cof(t)).toString()); M.setT($('#r1F'), Math.round(fOf(t)).toString()); M.setT($('#r1O'), Math.round((24 + 156 * u) / 1.8).toString());
    M.vis($('#slowT'), t, tB + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* R: ratings */
  const rOn = t >= tR - 0.05 && t < tST; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tST - 0.45;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    RRw.forEach((r, i) => { M.vis(r, t, tRr[i] - 0.15, 1e9, { dy: 20 }); const lit = M.io((t - tRr[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tRr[i + 1]) / 0.3) : 1 - M.io((t - T0('R7')) / 0.3));
      r.style.borderColor = M.mix(C.soft, AM, lit); r.style.background = M.mix(C.soft, '#FFFFFF', lit); });
    M.vis($('#fanL'), t, T0('R7'), 1e9, { dy: 20 });
    // working voltage test
    const v = Math.max(0, Vapp(t)), on = t >= tR + 0.6;
    [gBar, gRate, gRateL, ...gTk].forEach(e => M.vis(e, t, tR + 0.6, 1e9, { dy: 0, fade: 0.2 })); drawSeq(gCap, t, tR + 0.5, 0.3, 0.08);
    PUC.attr(gFill, 'width', (600 * v / 40).toFixed(1)); PUC.attr(gFill, 'fill', v > 25 ? C.red : C.ok); M.hide(gFill, !on);
    M.setT(gV, `${v.toFixed(1)} V`); M.hide(gV, !on); const bad = v > 25; M.setT(gS, bad ? 'ABOVE RATING · DIELECTRIC BREAKS DOWN' : 'SAFE · BELOW RATING'); PUC.attr(gS, 'fill', bad ? C.red : C.ok); M.hide(gS, !on);
    M.hide(gCrack, !(bad));
    // polarity
    const tp = wt('R5', 'Third'); M.vis($('#rPl'), t, tp, 1e9, { dy: 10 }); M.vis(rEl, t, tp + 0.1, 1e9, { dy: 16 });
    M.vis(rPlus[1], t, wt('R5', 'stripe'), 1e9, { dy: 0, fade: 0.2 }); M.vis(rPlus[0], t, wt('R5', 'longer'), 1e9, { dy: 0, fade: 0.2 });
    const tb = wt('R6', 'backwards') - 0.2; M.vis(rElB, t, tb, 1e9, { dy: 16 }); M.vis(rBack[0], t, tb + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(rBackXi, t, wt('R6', 'heat'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
  }

  /* ST: statement */
  const sOn = t >= tST - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tST + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('ST', 'Check') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: code + worked example */
  const dOn = t >= tD - 0.05 && t < tX + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tX - 0.32, inW = t >= tW - 0.3;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(dCer, t, tD + 0.4, 1e9, { dy: 16 }); fadeAt(dChars, t, tD + 0.7, 0.12);
    const tl = [tDr2[1], tDr2[1] + 0.2, tDr2[2], wt('D3', 'letter')];
    dLead.forEach((l, i) => M.draw(l, t, tl[i] - 0.1, 0.35));
    dLabs.forEach((lb, i) => { M.vis(lb, t, tl[i], 1e9, { dy: 10 }); M.vis(lb.querySelector('.b'), t, tDc[i], 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      PUC.attr(dChars[i], 'fill', t >= tDc[i] && t < tDc[i] + 0.8 ? '#FFFFFF' : INK); });
    M.vis($('#dRL1'), t, tD + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dR.forEach((r, i) => { M.vis(r, t, tDr2[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (!inW) { M.vis(r.querySelector('.n'), t, tDr2[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDr2[i], 0.6); } });
    LC.forEach((c, i) => M.vis(c, t, tLc[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    LC.forEach((c, i) => { c.style.top = inW ? '400px' : '352px'; c.style.background = i === 0 && t >= tDc[3] ? C.ac2 : C.soft; });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); M.hide(r, t < tWr[i] - 0.15); });
    M.vis($('#wBox'), t, tWr[2] - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dU'), t, wt('W3', 'thousand') - 0.2, 1e9, { dy: 10 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'Wrong'), tRight: wt('X3', 'last') - 0.1 });
    M.vis(xCer, t, tX + 0.5, 1e9, { dy: 16 });
    M.vis(xWr, t, wt('X2', 'hundred') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.draw(xSk, t, wt('X2', 'Wrong'), 0.3);
    [wt('X3', 'hundred'), wt('X3', 'nanofarads'), wt('X3', 'microfarads')].forEach((tt, i) => M.vis(XL[i], t, tt - 0.4, 1e9, { dx: -16, dy: 0 }));
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Name') - 0.2 });
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
