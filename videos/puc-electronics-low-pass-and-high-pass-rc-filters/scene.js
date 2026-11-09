// PUC Electronics Ep 37 - Low-pass and high-pass RC filters ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, charge Q orange, t, R, C, tau ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, GD = '#B7791F', TEL = '#9FD2D2';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const Iv = c(VI, 'I'), I0 = c(VI, 'I_0'), VC = c(TE, 'V_C'), VL = c(TE, 'V_L'), VR = c(TE, 'V_R'), Vv = c(TE, 'V'), V0 = c(TE, 'V_0');
const OM = '\\Omega';
const ex = Math.exp;
const subify = el => { if (el && /_/.test(el.textContent)) el.innerHTML = el.textContent.replace(/_(\w+)/g, '<tspan baseline-shift="sub" font-size="72%">$1</tspan>'); return el; };

/* electrons as dots flowing along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: o.stroke || INK, 'stroke-width': 1.5 }));
  const at = s => { s = ((s % L) + L) % L; for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[0]; };
  const skip = o.skip || (() => false);
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at(k * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, skip(x, y)); }); } };
};
/* oscilloscope screen: dark panel, 6 x 4 divisions; single-shot sweep traces drawn live from the switch moment */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': j === 2 ? 2.5 : 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      // f(seconds since start) -> y offset (px, up = +); span = seconds across the screen
      return (f, el, span, on = true, N = 140) => { M.hide(p, !on || el <= 0); if (!on || el <= 0) return; const e = Math.min(el, span); let d = '';
        for (let i = 0; i <= N; i++) { const s = e * i / N, x = 6 + (w - 12) * s / span, y = h / 2 - f(s); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
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
const capSym = (p, x, y, s = 1, a = {}) => [W(p, `M${x},${y - 30 * s} V${y - 8 * s}`, a), W(p, `M${x - 26 * s},${y - 8 * s} H${x + 26 * s}`, { 'stroke-width': 5, ...a }), W(p, `M${x - 26 * s},${y + 8 * s} H${x + 26 * s}`, { 'stroke-width': 5, ...a }), W(p, `M${x},${y + 8 * s} V${y + 30 * s}`, a)];
const resSym = (p, x, y, a = {}) => W(p, `M${x},${y} H${x + 26} L${x + 34},${y - 14} L${x + 48},${y + 14} L${x + 62},${y - 14} L${x + 76},${y + 14} L${x + 90},${y - 14} L${x + 98},${y} H${x + 124}`, a);

const coilV = (p, x, y0, n = 4, r = 15, a = {}) => { let d = `M${x},${y0}`; for (let i = 0; i < n; i++) d += ` a${r},${r} 0 0 1 0,${2 * r}`; return W(p, d, a); };
const CH1 = '#8FA3C8', TP = 2 * Math.PI, PH = Math.atan(80 / 60), SQ2 = Math.SQRT2;
/* roll-mode scope trace: newest at the right */
const rollTr = (svg, w, h, col) => { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  return (f, tNow, tStart, Wn, on = true, N = 150) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
    for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = h / 2 - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
    PUC.attr(p, 'd', d); }; };
const arcP = (cx, cy, r, a0, a1) => { const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 ${a1 > a0 ? 1 : 0} ${x1.toFixed(1)},${y1.toFixed(1)}`; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'turns') - 0.2;
const tI = T0('I1'), tK = T0('K1'), tB = T0('B1'), tD = T0('D1'), tG = T0('G1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const FC = 1 / (TP * 1600 * 1e-7); // about 995 Hz
const gLP = f => 1 / Math.sqrt(1 + (f / FC) ** 2), gHP = f => (f / FC) / Math.sqrt(1 + (f / FC) ** 2);
const VOUT = c(AM, 'V_{out}'), VIN = c(CH1, 'V_{in}');

/* ================= A: hook ================= */
const h1S = $('#h1S'), h2S = $('#h2S');
const spk = [W(h1S, 'M20,20 H150 V178 H20 Z', { fill: '#fff' })];
const cone = [mk(h1S, 'circle', { cx: 85, cy: 112, r: 46, fill: '#E9ECF2', stroke: INK, 'stroke-width': 4 }), mk(h1S, 'circle', { cx: 85, cy: 112, r: 16, fill: INK }), mk(h1S, 'circle', { cx: 85, cy: 46, r: 12, fill: '#E9ECF2', stroke: INK, 'stroke-width': 3 })];
const knob = mk(h1S, 'circle', { cx: 230, cy: 100, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const knobP = W(h1S, 'M230,100 L230,66', { 'stroke-width': 6, stroke: AM });
const knobL = mono(h1S, 230, 172, 'BASS', { 'text-anchor': 'middle', 'font-weight': 600, fill: INK });
const tKnob = wt('H1', 'bass');
const hB = [['deep drums', 60, AM], ['high cymbals', 290, CH1]].map(([s, x, col]) => ({ L: mono(h2S, x, 176, s, { 'font-weight': 600, fill: INK, 'font-size': 20 }), b: mk(h2S, 'rect', { x, y: 150, width: 120, height: 0, rx: 8, fill: col }), base: mk(h2S, 'line', { x1: x - 10, x2: x + 130, y1: 150, y2: 150, stroke: INK, 'stroke-width': 3 }) }));
const hUp = mono(h2S, 196, 70, 'louder', { fill: AM, 'font-weight': 700, 'font-size': 22 }), hSame = mono(h2S, 426, 100, 'same', { fill: MU, 'font-weight': 700, 'font-size': 22 });

/* ================= I: sieve + waves ================= */
const iS = $('#iS');
const sieve = [W(iS, 'M180,250 Q392,330 604,250', { 'stroke-width': 6 }), W(iS, 'M180,250 H604', { 'stroke-width': 4 })];
const mesh = []; for (let x = 210; x < 590; x += 24) mesh.push(W(iS, `M${x},252 V${252 + 70 * Math.sin(Math.PI * (x - 180) / 424) * 0.55}`, { 'stroke-width': 1.5, stroke: MU }));
const pebbles = [[300, 268], [360, 280], [420, 282], [480, 272], [340, 262], [450, 262]].map(([x, y]) => mk(iS, 'ellipse', { cx: x, cy: y, rx: 20, ry: 14, fill: '#B8BCC6', stroke: INK, 'stroke-width': 2.5 }));
const sand = [...Array(40)].map((_, k) => mk(iS, 'circle', { cx: 0, cy: 0, r: 4, fill: '#D9B46A' }));
const iLb = [mono(iS, 640, 270, 'pebbles stay', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(iS, 392, 540, 'fine sand slips through', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 })];
const tPour = wt('I1', 'Pour') - 0.2, tSlip = wt('I2', 'slips');
const iG = $('#iG');
const gA = PUC.graph(iG, { x: 80, y: 100, w: 620, h: 150, xmax: 2, ymin: -1.2, ymax: 1.2 }), gB = PUC.graph(iG, { x: 80, y: 320, w: 620, h: 150, xmax: 2, ymin: -1.2, ymax: 1.2 });
const gAc = gA.curve(TE, 5), gBc = gB.curve(TE, 5);
const iGL = [mono(iG, 80, 290, 'low note: slow shakes', { fill: INK, 'font-weight': 600, 'font-size': 22 }), mono(iG, 80, 510, 'high note: fast shakes', { fill: INK, 'font-weight': 600, 'font-size': 22 })];
const iGN = mono(iG, 80, 560, 'shakes per second = hertz (Hz)', { fill: AM, 'font-weight': 700, 'font-size': 22 });

/* ================= K: reactance ================= */
const kS = $('#kS');
const gk = PUC.graph(kS, { x: 110, y: 100, w: 580, h: 340, xmax: 10, ymax: 10, xl: 'frequency f', yl: 'X_C' });
gk.xlab.setAttribute('y', 474); gk.ylab.setAttribute('y', 84); gk.ylab.setAttribute('x', 110);
const gkc = gk.curve(INK, 5);
const kLow = mono(kS, gk.X(0.6) + 20, gk.Y(9), 'wall', { fill: C.red, 'font-weight': 700, 'font-size': 26 }), kHigh = mono(kS, gk.X(7.6), gk.Y(1.2) - 24, 'shortcut', { fill: C.ok, 'font-weight': 700, 'font-size': 26 });
$('#kF').innerHTML = K('X_C = \\dfrac{1}{2\\pi f C}');
const kt0 = $('#kt0 svg'), kt1 = $('#kt1 svg');
const kW = [W(kt0, 'M20,40 H60', { 'stroke-width': 4 }), W(kt0, 'M60,10 V70', { 'stroke-width': 8, stroke: C.red })];
const kW2 = [W(kt1, 'M20,40 H130', { 'stroke-width': 4, stroke: C.ok }), mk(kt1, 'path', { d: 'M130,40 L114,30 L114,50 Z', fill: C.ok })];

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const bw = [W(ck, 'M170,280 V150 H420'), W(ck, 'M170,360 V490 H850'), W(ck, 'M580,150 H850')];
const lpR = W(ck, 'M420,150 L430,136 L446,164 L462,136 L478,164 L494,136 L510,164 L526,136 L542,164 L558,136 L574,164 L580,150');
const lpC = [W(ck, 'M700,150 V300'), W(ck, 'M650,300 H750', { 'stroke-width': 6 }), W(ck, 'M650,330 H750', { 'stroke-width': 6 }), W(ck, 'M700,330 V490')];
const hpC = [W(ck, 'M420,150 H486'), W(ck, 'M486,110 V190', { 'stroke-width': 6 }), W(ck, 'M514,110 V190', { 'stroke-width': 6 }), W(ck, 'M514,150 H580')];
const hpR = W(ck, 'M700,150 V250 L686,260 L714,276 L686,292 L714,308 L686,324 L714,340 L700,350 V490');
const nodes = [mk(ck, 'circle', { cx: 700, cy: 150, r: 7, fill: INK }), mk(ck, 'circle', { cx: 700, cy: 490, r: 7, fill: INK })];
const outT = [mk(ck, 'circle', { cx: 850, cy: 150, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(ck, 'circle', { cx: 850, cy: 490, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const outBr = W(ck, 'M850,180 V460', { 'stroke-width': 3, stroke: AM, 'stroke-dasharray': '8 8' });
const outL = mono(ck, 838, 330, 'V_out', { 'text-anchor': 'end', fill: AM, 'font-weight': 700, 'font-size': 24 });
const bSrc = [mk(ck, 'circle', { cx: 170, cy: 320, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M146,320 C156,296 168,296 170,320 S184,344 194,320', { 'stroke-width': 3.5 })];
const inL = mono(ck, 230, 326, 'V_in', { fill: CH1, 'font-weight': 700, 'font-size': 24 });
const lpLb = [tx(ck, 500, 118, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 500, 214, '1.6 kΩ', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 }), tx(ck, 636, 306, 'C', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 636, 344, '0.1 μF', { 'text-anchor': 'end', 'font-weight': 600, 'font-size': 22 })];
const hpLb = [tx(ck, 500, 92, 'C', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 500, 230, '0.1 μF', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 }), tx(ck, 672, 300, 'R', { 'text-anchor': 'end', 'font-style': 'italic', 'font-size': 28 }), mono(ck, 672, 338, '1.6 kΩ', { 'text-anchor': 'end', 'font-weight': 600, 'font-size': 22 })];
const skipB = (x, y) => Math.hypot(x - 170, y - 320) < 44 || (Math.abs(y - 150) < 2 && x > 418 && x < 582) || (Math.abs(x - 700) < 2 && y > 246 && y < 354);
const eB = flow(ck, [[170, 360], [170, 490], [700, 490], [700, 150], [170, 150], [170, 280]], 26, { skip: skipB });
const tHP = wt('B8', 'swap');
const fSeg = [[wt('B4', 'one') - 0.3, 100], [wt('B5', 'Turn'), 1000], [wt('B6', 'ten') - 0.2, 10000], [tHP - 0.1, 0], [wt('B9', 'same') - 0.3, 100], [T0('B10'), 1000], [wt('B10', 'high') - 0.4, 10000]];
const fAt = t => { let f = 0; fSeg.forEach(([a, v]) => { if (t >= a) f = v; }); return f; };
const fScr = f => f === 100 ? 0.5 : f === 1000 ? 1.1 : f === 10000 ? 2.2 : 0;
const thAt = t => { let th = 0, prev = fSeg[0][0]; for (let i = 0; i < fSeg.length; i++) { const a = fSeg[i][0], b = i + 1 < fSeg.length ? fSeg[i + 1][0] : 1e9; if (t <= a) break; th += TP * fScr(fSeg[i][1]) * (Math.min(t, b) - a); } return th; };
const isHP = t => t >= tHP + 0.2;
const vin = t => fAt(t) ? 10 * Math.sin(thAt(t)) : 0;
const vout = t => { const f = fAt(t); if (!f) return 0; const hp = isHP(t), g = hp ? gHP(f) : gLP(f), ph = hp ? Math.PI / 2 - Math.atan(f / FC) : -Math.atan(f / FC); return 10 * g * Math.sin(thAt(t) + ph); };
const scS = $('#scS');
mk(scS, 'rect', { x: 0, y: 0, width: 592, height: 200, rx: 8, fill: '#16213E' }); for (let i = 1; i < 6; i++) mk(scS, 'line', { x1: 592 * i / 6, y1: 0, x2: 592 * i / 6, y2: 200, stroke: '#2A3758', 'stroke-width': 1.5 }); for (let j = 1; j < 4; j++) mk(scS, 'line', { x1: 0, y1: 50 * j, x2: 592, y2: 50 * j, stroke: '#2A3758', 'stroke-width': j === 2 ? 2.5 : 1.5 });
const trI = rollTr(scS, 592, 200, CH1), trO = rollTr(scS, 592, 200, AM);
const scL = [mono(scS, 470, 190, 'CH1 in', { fill: CH1, 'font-size': 17, 'text-anchor': 'end' }), mono(scS, 578, 190, 'CH2 out', { fill: AM, 'font-size': 17, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k n">FREQ</span><span class="v" id="rF">-</span><span class="u" id="rFu">Hz</span>
  <span class="k" style="color:${AM}">V<sub>out</sub></span><span class="v" id="rV" style="color:${AM}">-</span><span class="u">V pk</span>
  <span class="k n">OUT ÷ IN</span><span class="v" id="rP">-</span><span class="u">%</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the bass knob uses a low-pass filter!' });

/* ================= D: divider ================= */
const dS = $('#dS');
const dw = [W(dS, 'M100,140 H240'), W(dS, 'M400,140 H620'), W(dS, 'M520,140 V250'), W(dS, 'M520,280 V420'), W(dS, 'M100,420 H620')];
const dR = W(dS, 'M240,140 L250,126 L266,154 L282,126 L298,154 L314,126 L330,154 L346,126 L362,154 L378,126 L394,154 L400,140');
const dC = [W(dS, 'M470,250 H570', { 'stroke-width': 6 }), W(dS, 'M470,280 H570', { 'stroke-width': 6 })];
const dT = [mk(dS, 'circle', { cx: 100, cy: 140, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(dS, 'circle', { cx: 100, cy: 420, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(dS, 'circle', { cx: 620, cy: 140, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(dS, 'circle', { cx: 620, cy: 420, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const dLb = [mono(dS, 90, 290, 'V_in', { 'text-anchor': 'end', fill: CH1, 'font-weight': 700, 'font-size': 26 }), mono(dS, 640, 290, 'V_out', { fill: AM, 'font-weight': 700, 'font-size': 26 }), tx(dS, 320, 110, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(dS, 460, 274, 'X_C', { 'text-anchor': 'end', fill: INK, 'font-weight': 700, 'font-size': 24 })];
const dEq = mono(dS, 100, 500, 'when X_C = R:', { fill: INK, 'font-weight': 600, 'font-size': 26 });
const dEq2 = mono(dS, 340, 500, 'V_out = 70.7% of V_in', { fill: AM, 'font-weight': 700, 'font-size': 26 });
const dEq3 = mono(dS, 100, 550, 'half the power gets through', { fill: MU, 'font-weight': 600, 'font-size': 22 });
const dRows = rows($('#dSteps'), [
  [K(`\\dfrac{${VOUT}}{${VIN}} = \\dfrac{X_C}{Z}`), 'a voltage divider', 92],
  [K('Z = \\sqrt{R^{2} + X_C^{2}}'), '', 202],
  [K(`X_C = R:\\ \\ \\dfrac{${VOUT}}{${VIN}} = \\dfrac{1}{\\sqrt{2}} \\approx 0.707`), '', 296],
  [K('\\dfrac{1}{2\\pi f_c C} = R'), 'set X_C = R', 384],
  [K('f_c = \\dfrac{1}{2\\pi R C}'), 'cut-off frequency', 476]]);
const tDR = [wt('D2', 'equals'), wt('D3', 'impedance'), wt('D5', 'one'), wt('D7', 'Set'), wt('D8', 'f')];

/* ================= G: frequency response ================= */
const gS = $('#gS');
const lx = f => Math.log10(f) - 1; // 10 Hz .. 100 kHz -> 0 .. 4
const gg = PUC.graph(gS, { x: 140, y: 100, w: 1300, h: 380, xmax: 4, ymax: 110, yt: [25, 50, 70.7, 100], xl: 'frequency (log scale)', yl: 'output ÷ input (%)' });
gg.xlab.setAttribute('y', 534); gg.ylab.setAttribute('y', 84); gg.ylab.setAttribute('x', 140);
[[10, '10 Hz'], [100, '100 Hz'], [1000, '1 kHz'], [10000, '10 kHz'], [100000, '100 kHz']].forEach(([f, s]) => { gg.mk('line', { x1: gg.X(lx(f)), x2: gg.X(lx(f)), y1: gg.Y(0), y2: gg.Y(0) + 8, stroke: INK, 'stroke-width': 2 }); mono(gS, gg.X(lx(f)), gg.Y(0) + 32, s, { 'text-anchor': 'middle', 'font-size': 18 }); });
const gLPc = gg.curve(TE, 6), gHPc = gg.curve(GD, 6);
const gFc = gg.mk('line', { x1: gg.X(lx(FC)), x2: gg.X(lx(FC)), y1: gg.Y(0), y2: gg.Y(108), stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const g707 = gg.mk('line', { x1: gg.X(0), x2: gg.X(4), y1: gg.Y(70.7), y2: gg.Y(70.7), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
const gX = gg.mk('circle', { cx: gg.X(lx(FC)), cy: gg.Y(70.7), r: 11, fill: AM, stroke: '#fff', 'stroke-width': 3 });
const gLb = [mono(gS, gg.X(0.2), gg.Y(100) - 14, 'LOW-PASS', { fill: TE, 'font-weight': 700, 'font-size': 26 }), mono(gS, gg.X(3.8), gg.Y(100) - 14, 'HIGH-PASS', { fill: GD, 'font-weight': 700, 'font-size': 26, 'text-anchor': 'end' }),
  mono(gS, gg.X(lx(FC)) + 18, gg.Y(108) + 6, 'f_c ≈ 1 kHz', { fill: AM, 'font-weight': 700, 'font-size': 24 }), mono(gS, gg.X(4) - 10, gg.Y(70.7) - 12, '70.7%', { fill: AM, 'font-weight': 700, 'font-size': 24, 'text-anchor': 'end' })];
const gPass = [mono(gS, gg.X(0.3), gg.Y(40), 'passes', { fill: TE, 'font-weight': 600, 'font-size': 22 }), mono(gS, gg.X(3.2), gg.Y(40), 'passes', { fill: GD, 'font-weight': 600, 'font-size': 22 })];

/* ================= W: worked example ================= */
const wS = $('#wS');
const wDial = [mk(wS, 'circle', { cx: 392, cy: 240, r: 140, fill: '#fff', stroke: INK, 'stroke-width': 4 })];
for (let k = 0; k <= 10; k++) { const a = Math.PI * (0.8 + 1.4 * k / 10); wDial.push(mk(wS, 'line', { x1: 392 + 120 * Math.cos(a), y1: 240 + 120 * Math.sin(a), x2: 392 + 136 * Math.cos(a), y2: 240 + 136 * Math.sin(a), stroke: INK, 'stroke-width': 3 })); }
const wNeedle = W(wS, 'M392,240 L392,140', { 'stroke-width': 6, stroke: AM }), wHub = mk(wS, 'circle', { cx: 392, cy: 240, r: 12, fill: INK });
wDial.push(mono(wS, 392, 84, '1 kHz', { 'text-anchor': 'middle', 'font-weight': 600 }), mono(wS, 270, 360, '100 Hz', { 'text-anchor': 'end', 'font-weight': 600 }), mono(wS, 514, 360, '10 kHz', { 'font-weight': 600 }));
const wRead = mono(wS, 392, 440, '', { 'text-anchor': 'middle', fill: AM, 'font-weight': 700, 'font-size': 40 });
const wChips = [mono(wS, 90, 505, 'R = 1.6 kΩ', { fill: INK, 'font-weight': 600, 'font-size': 26 }), mono(wS, 400, 505, 'C = 0.1 μF', { fill: INK, 'font-weight': 600, 'font-size': 26 }), mono(wS, 90, 556, 'at 1 kHz: output ≈ 71%', { fill: TE, 'font-weight': 600, 'font-size': 24 })];
const wRows = rows($('#wSteps'), [
  [K(`R = 1600\\,${OM},\\ \\ C = 0.1\\times10^{-6}\\,\\text{F}`), 'given', 84],
  [K('f_c = \\dfrac{1}{2\\pi R C}'), '', 176],
  [K('2\\pi R C \\approx 1.005\\times10^{-3}\\,\\text{s}'), '', 284],
  [K('f_c \\approx 995\\,\\text{Hz} \\approx 1\\,\\text{kHz}'), 'cut-off', 376],
  [K(`\\text{at}\\ f_c:\\ ${VOUT} \\approx 0.71\\,${VIN}`), '', 480]]);
const tWR = [wt('W1', 'one'), wt('W2', 'f'), wt('W3b', 'one'), wt('W4', 'nine'), wt('W5', 'seventy')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'At cut-off, V<sub>out</sub> is half of V<sub>in</sub>', right: 'V<sub>out</sub> is 70.7% of V<sub>in</sub>. Power is half', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xBars = [['VOLTAGE', 70.7, AM, 110], ['POWER', 50, GD, 196]].map(([s, p, col, y]) => ({ l: mono(tcS, 40, y + 8, s, { 'font-weight': 600, fill: INK, 'font-size': 20 }), bg: mk(tcS, 'rect', { x: 180, y: y - 16, width: 420, height: 30, rx: 15, fill: '#EEF0F4' }), b: mk(tcS, 'rect', { x: 180, y: y - 16, width: 0, height: 30, rx: 15, fill: col }), v: mono(tcS, 620, y + 9, p + '%', { fill: col, 'font-weight': 700, 'font-size': 28 }), p }));
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw a low-pass or high-pass RC filter and its response; find f<sub>c</sub> = 1/(2πRC)' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A high-pass RC filter has R = 2&nbsp;kΩ and C = 0.05&nbsp;μF. A 10&nbsp;V signal comes in at the cut-off frequency. Find f<sub>c</sub> and V<sub>out</sub>. (π = 3.14)', qW: 780,
  opts: [K('1.59\\,\\text{kHz},\\ 5\\,\\text{V}'), K('1.59\\,\\text{kHz},\\ 7.07\\,\\text{V}'), K('10\\,\\text{kHz},\\ 7.07\\,\\text{V}'), K('159\\,\\text{Hz},\\ 7.07\\,\\text{V}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K('f_c = \\tfrac{1}{2\\pi R C}')], [K('2\\pi RC \\approx 6.28\\times10^{-4}')], [K('f_c \\approx 1590\\,\\text{Hz}')], [K(`${VOUT} = \\tfrac{10}{\\sqrt 2} \\approx 7.07\\,\\text{V}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'f'), wt('A3', 'Two'), wt('A4', 'One'), wt('A5', 'At')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 510, y0: 96, dy: 82, title: 'RC filters · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K('X_C = \\tfrac{1}{2\\pi f C}'), K('f_c = \\tfrac{1}{2\\pi R C}'), K(`\\text{At}\\ f_c:\\ ${VOUT} = ${VIN}/\\sqrt{2} = 0.707\\,${VIN}`), 'Low-pass: R in series, output across C.', 'High-pass: C in series, output across R. Power at f<sub>c</sub> is half.'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 38', topic: 'Energy bands: conductors, insulators and semiconductors', y: 772 });

[...document.querySelectorAll('svg text')].forEach(subify);
/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B5', 'Turn'), 1.1, 1010, 560], [T1('B7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gwd = 0;
const GH = [[tB + 0.5, tD - 0.4], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gwd) { gwd = ghost.offsetWidth; ghost.style.left = (1760 - gwd) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, tMorph + 0.4, out, { dx: 60, dy: 0, ...o }); fadeAt([...spk, ...cone, knob, knobP, knobL], t, tMorph + 0.5, 0.05);
    const ka = -Math.PI / 2 + 1.6 * M.io((t - tKnob) / 0.8); PUC.attr(knobP, 'd', `M230,100 L${(230 + 34 * Math.cos(ka)).toFixed(1)},${(100 + 34 * Math.sin(ka)).toFixed(1)}`);
    const wob = t > tKnob ? 4 * Math.abs(Math.sin(TP * 2 * t)) : 1; PUC.attr(cone[0], 'r', (46 + wob).toFixed(1));
    M.rise($('#h1T'), t, tKnob); M.vis($('#h1M'), t, tKnob + 0.5, 1e9, { dy: 10 });
    M.vis($('#h2C'), t, T0('H2') - 0.2, out, { dx: 60, dy: 0, ...o });
    hB.forEach((q, k) => { M.vis(q.L, t, T0('H2') + 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis(q.base, t, T0('H2'), 1e9, { dy: 0, fade: 0.2 });
      const h = k === 0 ? 40 + 70 * M.io((t - wt('H2', 'louder') + 0.3) / 0.6) : 40; PUC.attr(q.b, 'y', (150 - h).toFixed(1)); PUC.attr(q.b, 'height', h.toFixed(1)); M.vis(q.b, t, T0('H2') + 0.1, 1e9, { dy: 0, fade: 0.2 }); });
    M.vis(hUp, t, wt('H2', 'louder'), 1e9, { dy: 0, fade: 0.2 }); M.vis(hSame, t, wt('H2', 'same'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h2Q'), t, T0('H3') + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
  }

  /* I: sieve + waves */
  const iOn = t >= tI - 0.05 && t < tK + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tK - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(sieve, t, wt('I1', 'sieve') - 0.2, 0.5, 0.1); drawSeq(mesh, t, wt('I1', 'sieve'), 0.2, 0.02);
    pebbles.forEach((p, k) => { const d = M.io((t - tPour - k * 0.08) / 0.6); PUC.attr(p, 'transform', `translate(0,${(-160 * (1 - d)).toFixed(1)})`); M.hide(p, d <= 0); });
    sand.forEach((s, k) => { const a = tPour + (k % 20) * 0.12 + Math.floor(k / 20) * 0.06, u = t - a; if (u < 0) { M.hide(s, true); return; } M.hide(s, false);
      const x = 230 + (k * 53) % 330, y = u < 0.6 ? 100 + 160 * u / 0.6 : 260 + 190 * Math.min(1, (u - 0.6) / 0.9); PUC.attr(s, 'cx', x); PUC.attr(s, 'cy', Math.min(y, 300 + (k % 7) * 30 + 150).toFixed(1)); });
    M.vis(iLb[0], t, wt('I2', 'pebbles'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iLb[1], t, tSlip, 1e9, { dy: 0, fade: 0.2 });
    const t4 = wt('I4', 'Frequency') - 0.2;
    [gA.axes, gB.axes, gA.zero, gB.zero].forEach(e => e && M.vis(e, t, t4, 1e9, { dy: 0, fade: 0.2 }));
    const sh = Math.max(0, t - t4);
    gAc(x => [x, Math.sin(TP * (x * 1 - sh * 0.5))], 0, M.clamp((t - t4) / 1.2) * 2, 120); gBc(x => [x, Math.sin(TP * (x * 5 - sh * 2.5))], 0, M.clamp((t - t4) / 1.2) * 2, 200);
    M.vis(iGL[0], t, wt('I5', 'Low'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iGL[1], t, wt('I5', 'High'), 1e9, { dy: 0, fade: 0.2 }); M.vis(iGN, t, wt('I4', 'second'), 1e9, { dy: 10 });
  }

  /* K: reactance */
  const kOn = t >= tK - 0.05 && t < tB + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tB - 0.32;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    gkc(x => [x, Math.min(10, 1 / x)], 0.1, 0.1 + M.clamp((t - wt('K3', 'equals')) / 1.4) * 9.8, 120);
    M.vis(kLow, t, wt('K4', 'wall'), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis(kHigh, t, wt('K5', 'shortcut'), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#kBox'), t, wt('K2', 'reactance') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); PUC.write($('#kF'), t, wt('K3', 'equals') - 0.2, 0.6); M.vis($('#kFu'), t, wt('K3', 'C'), 1e9, { dx: -10, dy: 0 });
    M.vis($('#kt0'), t, T0('K4') - 0.1, 1e9, { dy: 20 }); drawSeq(kW, t, wt('K4', 'wall') - 0.2, 0.3, 0.1);
    M.vis($('#kt1'), t, T0('K5') - 0.1, 1e9, { dy: 20 }); drawSeq(kW2, t, wt('K5', 'shortcut') - 0.2, 0.3, 0.1);
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32, hp = isHP(t), f = fAt(t);
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis($('#ckL1'), t, tB + 0.3, tHP, { dy: 10, outDur: 0.2 }); M.vis($('#ckL2'), t, tHP + 0.25, 1e9, { dy: 10 });
    const tb2 = wt('B2', 'signal') - 0.2;
    drawSeq(bw, t, tb2, 0.4, 0.12); fadeAt([...bSrc, inL], t, tb2, 0.06);
    const sw = M.io((t - tHP) / 0.4);
    [lpR, ...lpC, ...lpLb].forEach(e => PUC.attr(e, 'opacity', (1 - sw).toFixed(2)));
    if (sw < 1) { M.draw(lpR, t, wt('B2', 'resistor') - 0.2, 0.4); drawSeq(lpC, t, wt('B2', 'capacitor') - 0.2, 0.2, 0.08); fadeAt(lpLb, t, wt('B2', 'capacitor'), 0.06); }
    [hpR, ...hpC, ...hpLb].forEach(e => M.hide(e, sw <= 0)); if (sw > 0) { M.draw(hpR, t, tHP + 0.2, 0.5); drawSeq(hpC, t, tHP + 0.2, 0.2, 0.08); fadeAt(hpLb, t, tHP + 0.5, 0.06); }
    fadeAt([...nodes, ...outT, outBr, outL], t, wt('B2', 'output') - 0.2, 0.05);
    const on = f > 0;
    // current through the shunt branch: I = V / Z, scaled; dots oscillate
    const X = f ? 1 / (TP * f * 1e-7) : 1e9, Ia = f ? 10 / Math.sqrt(1600 ** 2 + X ** 2) : 0;
    eB.set(on ? 9000 * Ia * Math.sin(thAt(t)) : 0, t >= fSeg[0][0] - 0.1); M.vis($('#ckE'), t, fSeg[0][0], 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#slowT'), t, fSeg[0][0] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    trI(q => 8.6 * vin(q), t, fSeg[0][0], 5, true); trO(q => 8.6 * vout(q), t, fSeg[0][0], 5, true);
    fadeAt(scL, t, fSeg[0][0]);
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    const g = !f ? 0 : hp ? gHP(f) : gLP(f);
    M.setT($('#rF'), !f ? '-' : f >= 1000 ? String(f / 1000) : String(f)); M.setT($('#rFu'), f >= 1000 ? 'kHz' : 'Hz');
    M.setT($('#rV'), f ? (10 * g).toFixed(2) : '-'); M.setT($('#rP'), f ? (100 * g).toFixed(1) : '-');
    avB(t, T0('B7') + 0.3, tHP - 0.2);
  }

  /* D: divider */
  const dOn = t >= tD - 0.05 && t < tG + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tG - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq([...dw, dR], t, tD + 0.4, 0.3, 0.08); drawSeq(dC, t, tD + 0.8, 0.2, 0.08); fadeAt([...dT, ...dLb], t, tD + 0.9, 0.05);
    const hl = t >= wt('D4', 'X') - 0.2 ? 1 : 0; PUC.attr(dR, 'stroke', hl ? AM : INK); dC.forEach(e => PUC.attr(e, 'stroke', hl ? AM : INK));
    M.vis(dEq, t, wt('D4', 'equals'), 1e9, { dy: 0, fade: 0.2 }); M.vis(dEq2, t, wt('D5', 'seventy') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(dEq3, t, wt('D6', 'Half'), 1e9, { dy: 0, fade: 0.2 });
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* G: frequency response */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3;
    M.vis($('#gC'), t, tG + 0.1, out, { dy: 36, ...o });
    gLPc(x => [x, 100 * gLP(Math.pow(10, x + 1))], 0, M.clamp((t - wt('G2', 'low')) / 1.8) * 4, 160);
    gHPc(x => [x, 100 * gHP(Math.pow(10, x + 1))], 0, M.clamp((t - wt('G3', 'high')) / 1.8) * 4, 160);
    M.vis(gLb[0], t, wt('G2', 'low'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gLb[1], t, wt('G3', 'high'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(gPass[0], t, wt('G2', 'flat'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gPass[1], t, wt('G3', 'flat'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(gFc, t, wt('G2', 'f') - 0.2, 0.5); M.vis(gLb[2], t, wt('G2', 'f'), 1e9, { dy: 0, fade: 0.2 });
    M.draw(g707, t, wt('G4', 'seventy') - 0.3, 0.6); M.vis(gX, t, wt('G4', 'cut'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(gLb[3], t, wt('G4', 'seventy'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'High') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    fadeAt(wDial, t, tW + 0.3, 0.02); M.vis(wHub, t, tW + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(wNeedle, t, tW + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const u = M.io((t - tWR[3]) / 1.0), a = Math.PI * (0.8 + 1.4 * 0.5 * u); PUC.attr(wNeedle, 'd', `M392,240 L${(392 + 100 * Math.cos(a)).toFixed(1)},${(240 + 100 * Math.sin(a)).toFixed(1)}`);
    M.setT(wRead, t >= tWR[3] + 0.6 ? 'f_c ≈ 995 Hz' : 'f_c = ?'); subify(wRead); M.vis(wRead, t, tWR[1], 1e9, { dy: 0, fade: 0.2 });
    M.vis(wChips[0], t, tWR[0], 1e9, { dx: -12, dy: 0 }); M.vis(wChips[1], t, wt('W1b', 'zero'), 1e9, { dx: -12, dy: 0 }); M.vis(wChips[2], t, tWR[4], 1e9, { dx: -12, dy: 0 });
    runRows(wRows, t, tWR);
    M.vis($('#wBox'), t, tWR[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('X5') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'It') - 0.05, tRight: wt('X3', 'output') - 0.2 });
    xBars.forEach((q, k) => { const ti = k === 0 ? wt('X3', 'seventy') : wt('X4', 'power'); fadeAt([q.l, q.bg], t, tX + 0.5); PUC.attr(q.b, 'width', (420 * q.p / 100 * M.o3((t - ti) / 0.7)).toFixed(1)); M.vis(q.v, t, ti + 0.4, 1e9, { dy: 0, fade: 0.2 }); });
    where(t, { tin: T0('X5') - 0.2, tLight: [wt('X5', 'PUC')], tType: T0('X6') - 0.1 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.4, tCount, tAns });
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
