// PUC Electronics Ep 43 - Full-wave and bridge rectifiers ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, t and R ink; scope CH1 (input) #8FA3C8, CH2 (output) amber
const AM = C.ac, VI = C.violet, TE = C.teal, GO = C.gold, INK = C.ink, MU = C.mute, RED = C.red, CH1 = '#8FA3C8', CH1D = '#5F7399', OFFG = '#E7E9F0';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
// italic symbol with an upright subscript, e.g. R with L
const vsub = (p, x, y, s, sb, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 26, fill: TE, 'font-style': 'italic', ...a });
  const t1 = mk(e, 'tspan', {}); t1.textContent = s; if (sb) { const t2 = mk(e, 'tspan', { 'font-size': (a['font-size'] || 26) * 0.62, dy: 6, 'font-style': 'normal' }); t2.textContent = sb; } return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const TAU = 2 * Math.PI, HW = a => Math.max(0, Math.sin(a));
const wave = (x0, w, y0, a, cyc, f = Math.sin, n = 200) => { let d = ''; for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + w * u, y = y0 - a * f(TAU * cyc * u); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
const area = (x0, w, y0, a, cyc, f) => wave(x0, w, y0, a, cyc, f) + `L${x0 + w},${y0}L${x0},${y0}Z`;
// diode symbol pointing right, centred at (cx, cy): triangle (anode side) + bar (cathode)
const diode = (p, cx, cy, s = 30) => ({ tri: W(p, `M${cx - s},${cy - s} L${cx + s},${cy} L${cx - s},${cy + s} Z`, { fill: '#fff' }), bar: W(p, `M${cx + s},${cy - s} V${cy + s}`, { 'stroke-width': 5 }) });
const zig = (x, y1, y2, n = 6) => { const h = (y2 - y1) / n; let d = `M${x},${y1}`; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -16 : 16)},${y1 + h * (i + 0.5)}`; return d + ` L${x},${y2}`; };

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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 180) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col, a = {}) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col, ...a }); e.textContent = s; return e; }
  };
};
const steps = (host, rows, o = {}) => { host.innerHTML = rows.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx" style="${o.fs ? 'font-size:' + o.fs + 'px' : ''}">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runSteps = (rows, t, ts) => rows.forEach((r, i) => { M.hide(r, t < ts[i] - 0.15); M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });
const lit = (el, u, on, onTxt) => { el.style.background = M.mix(C.soft, on, u * 0.18 + 0); el.style.borderColor = M.mix(C.soft, on, u); const v = el.querySelector('.v'); if (v) v.style.color = M.mix('#B8BCC6', onTxt, u); };
// colour-coded symbols
const Vm = `\\textcolor{${TE}}{V_m}`, Vdc = `\\textcolor{${TE}}{V_{dc}}`, Vo = `\\textcolor{${TE}}{v_{out}}`, Idc = `\\textcolor{${VI}}{I_{dc}}`, Im = `\\textcolor{${VI}}{I_m}`;

const ABS = a => Math.abs(Math.sin(a));
const Vr = `\\textcolor{${TE}}{V_r}`, IQ = `\\textcolor{${VI}}{I}`, dQ = `\\textcolor{${C.orange}}{\\Delta Q}`;
// filtered output: input humps (full-wave |sin|, or half-wave), capacitor drains with time constant kT (in hump periods)
const sim = (kT, U, half = false, N = 600) => { const out = []; let v = 0; const du = U / N;
  for (let i = 0; i <= N; i++) { const u = i * du, s = Math.sin(Math.PI * u), inp = half ? Math.max(0, s) : Math.abs(s);
    if (i) v *= Math.exp(-du / kT); const ch = inp >= v; if (ch) v = inp; out.push([u, v, inp, ch]); } return out; };
const pathOf = (pts, x0, w, y0, a, U, k = 1) => pts.map(([u, v, inp], i) => (i ? 'L' : 'M') + (x0 + w * u / U).toFixed(1) + ',' + (y0 - a * (k === 2 ? inp : v)).toFixed(1)).join('');

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'pump') - 0.2;
const tP = T0('P1'), tB = T0('B1'), tT = T0('T1'), tR = T0('R1'), tK = T0('K1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q0'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tR], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook (water tank) ================= */
const chS = $('#chS'), TH = 2, tA0 = tMorph + 0.6;   // one spurt every 2 s
const hTab = (() => { const N = 2400, U = 40, s = sim(6, U, false, N); return { at: t => { const u = (t - tA0) / TH; if (u <= 0) return [0, 0, 0, false]; const i = Math.min(N, Math.round(u / U * N)); return s[i].slice(1); } }; })();
const pipe = [W(chS, 'M10,40 H90 V108', { 'stroke-width': 10, stroke: '#8FA3C8' }), mono(chS, 10, 26, 'PUMP', { 'font-weight': 600, 'font-size': 18, fill: CH1D })];
const tank = W(chS, 'M50,110 V310 H250 V110', { 'stroke-width': 5 });
const water = mk(chS, 'rect', { x: 53, y: 300, width: 194, height: 0, fill: '#BFD9F2' });
const spurt = mk(chS, 'rect', { x: 84, y: 108, width: 12, height: 0, rx: 4, fill: '#3F7CC0' });
const tap = [W(chS, 'M250,286 H284 V300', { 'stroke-width': 8, stroke: '#8FA3C8' }), mk(chS, 'rect', { x: 280, y: 300, width: 8, height: 0, fill: '#3F7CC0' }), mono(chS, 272, 410, 'TAP', { 'font-weight': 600, 'font-size': 18, fill: '#B7791F', 'text-anchor': 'end' })];
const hS1 = scope($('#hs1'), 720, 196), hS2 = scope($('#hs2'), 720, 196);
mk($('#hs1'), 'line', { x1: 0, y1: 166, x2: 720, y2: 166, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk($('#hs2'), 'line', { x1: 0, y1: 166, x2: 720, y2: 166, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const hT1 = hS1.tr(CH1), hT2 = hS2.tr(AM);
const hL1 = [hS1.lab(14, 26, 'CH1 · PUMP INTO TANK', CH1), hS1.lab(706, 26, 'SPURTS', CH1, { 'text-anchor': 'end' })];
const hL2 = [hS2.lab(14, 26, 'CH2 · TAP OUT OF TANK', AM), hS2.lab(706, 26, 'STEADY', AM, { 'text-anchor': 'end' })];
const tSp = wt('H2', 'Spurt') - 0.2, tTap = wt('H2', 'Yet') - 0.2;

/* ================= P: ripple and the filter idea ================= */
const pS = $('#pS'), PX = 60, PW = 640, PY = 470, PA = 300, PC = 4;
const pAx = [W(pS, `M${PX - 10},${PY} H${PX + PW + 10}`, { 'stroke-width': 2.5 }), W(pS, `M${PX},${PY - PA - 40} V${PY + 10}`, { 'stroke-width': 2.5 })];
const pHump = W(pS, wave(PX, PW, PY, PA, PC / 2, ABS), { stroke: TE, 'stroke-width': 5 });
const pWant = mk(pS, 'line', { x1: PX, y1: PY - PA, x2: PX + PW, y2: PY - PA, stroke: '#B7791F', 'stroke-width': 4, 'stroke-dasharray': '12 8' });
const pWantL = mono(pS, PX + PW, PY - PA - 16, 'WANTED · FLAT DC', { 'text-anchor': 'end', fill: '#B7791F', 'font-weight': 600, 'font-size': 18, stroke: '#fff', 'stroke-width': 7, 'paint-order': 'stroke' });
const pDC = mk(pS, 'line', { x1: PX, y1: PY - PA * 2 / Math.PI, x2: PX + PW, y2: PY - PA * 2 / Math.PI, stroke: TE, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const pDCL = mono(pS, PX + PW, PY - PA * 2 / Math.PI + 30, 'DC PART', { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 18, stroke: '#fff', 'stroke-width': 7, 'paint-order': 'stroke' });
const pRA = PUC.arrow(pS, RED, 4, 12), pRB = PUC.arrow(pS, RED, 4, 12), pRL = mono(pS, PX + PW * 0.25 + 24, PY - PA / 2 + 6, 'RIPPLE', { fill: RED, 'font-weight': 700, 'font-size': 20, stroke: '#fff', 'stroke-width': 7, 'paint-order': 'stroke' });
const pAC = mono(pS, PX + 14, PY + 36, 'ripple = the leftover AC riding on the DC', { fill: RED, 'font-weight': 600, 'font-size': 18 });
const pRS = $('#pRS');
const capSym = [W(pRS, 'M150,70 V128'), W(pRS, 'M110,128 H190', { 'stroke-width': 6 }), W(pRS, 'M110,150 H190', { 'stroke-width': 6 }), W(pRS, 'M150,150 V208')];
const capL = tx(pRS, 210, 146, 'C', { 'font-style': 'italic', 'font-size': 30 });
const eqL = tx(pRS, 300, 154, '≈', { 'font-size': 52, fill: MU });
const tankI = [W(pRS, 'M420,86 V200 H560 V86', { 'stroke-width': 5 }), mk(pRS, 'rect', { x: 423, y: 130, width: 134, height: 67, fill: '#BFD9F2' })];
const tankL = mono(pRS, 600, 150, 'stores charge', { fill: C.orange, 'font-weight': 600, 'font-size': 20 }), tankL2 = mono(pRS, 600, 176, 'like water', { fill: MU, 'font-size': 18 });
const ph = [$('#ph0'), $('#ph1')];
ph[0].querySelector('.v').innerHTML = `removes the ripple`;
ph[1].querySelector('.v').innerHTML = `stores charge<span style="color:${MU};font-weight:500">·</span>like a tank`;

/* ================= B: breadboard ================= */
const bS = $('#bS');
const bSrc = [mk(bS, 'circle', { cx: 90, cy: 300, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(bS, 'M66,300 C74,280 82,280 90,300 S106,320 114,300')];
const bIn = [W(bS, 'M90,260 V220 H200'), W(bS, 'M90,340 V380 H200')];
const bBox = [mk(bS, 'rect', { x: 200, y: 150, width: 180, height: 300, rx: 14, fill: '#fff', stroke: INK, 'stroke-width': 4 })];
const bDia = W(bS, 'M290,250 L330,300 L290,350 L250,300 Z', { 'stroke-width': 3 });
const bBoxL = [mono(bS, 290, 194, 'FULL-WAVE', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(bS, 290, 218, 'RECTIFIER', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 })];
const bDst = mono(bS, 290, 410, '', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 18 });
const bRail = [W(bS, 'M380,190 H760 V236'), W(bS, 'M760,364 V410 H380')];
const bRL = W(bS, zig(760, 236, 364)), bRLL = [vsub(bS, 796, 296, 'R', 'L', { fill: INK, 'font-size': 28 }), mono(bS, 796, 326, 'load', { 'font-size': 18 })];
const bCap = [W(bS, 'M540,190 V284'), W(bS, 'M500,284 H580', { 'stroke-width': 6 }), W(bS, 'M500,316 H580', { 'stroke-width': 6 }), W(bS, 'M540,316 V410')];
const bCapL = tx(bS, 596, 308, 'C', { 'font-style': 'italic', 'font-size': 30 });
const bNode = [[540, 190], [540, 410]].map(([x, y]) => mk(bS, 'circle', { cx: x, cy: y, r: 7, fill: INK }));
const bPM = [tx(bS, 398, 176, '+', { 'font-size': 26, fill: '#B7791F' }), tx(bS, 398, 440, '-', { 'font-size': 30, fill: '#B7791F' })];
const bQ = mk(bS, 'rect', { x: 504, y: 288, width: 72, height: 0, fill: C.orange, opacity: 0.85 });
const bBig = mono(bS, 540, 520, '', { 'text-anchor': 'middle', fill: TE, 'font-weight': 700, 'font-size': 20 });
const bSkip = (x, y) => (x > 736 && x < 784 && y > 232 && y < 368);
const eLoad = flow(bS, [[540, 410], [760, 410], [760, 190], [540, 190]], 16, { skip: bSkip });
const eCh = [flow(bS, [[380, 410], [540, 410], [540, 316]], 8), flow(bS, [[540, 284], [540, 190], [380, 190]], 8)];
const PERB = 4, tAB = wt('B3', 'rises') - 0.6, tBig = wt('B10', 'bigger') - 0.1, DTB = 1 / 60;
const tabB = (() => { const n = Math.ceil((tT + 1 - tAB) / DTB) + 2, v = new Float32Array(n), inp = new Float32Array(n), ch = new Uint8Array(n); let c = 0;
  for (let i = 0; i < n; i++) { const t = tAB + i * DTB, s = Math.abs(Math.sin(TAU * (t - tAB) / PERB)), kT = (t < tBig ? 3 : 12) * PERB / 2;
    if (i) c *= Math.exp(-DTB / kT); if (s >= c) { c = s; ch[i] = 1; } v[i] = c; inp[i] = s; } return { v, inp, ch, n }; })();
const idxB = t => Math.max(0, Math.min(tabB.n - 1, Math.round((t - tAB) / DTB)));
const vB = t => t < tAB ? 0 : tabB.v[idxB(t)], chB = t => t >= tAB && tabB.ch[idxB(t)] === 1;
const intV = (() => { const a = new Float32Array(tabB.n); for (let i = 1; i < tabB.n; i++) a[i] = a[i - 1] + tabB.v[i] * DTB; return t => t < tAB ? 0 : a[idxB(t)]; })();
const intCh = (() => { const a = new Float32Array(tabB.n); for (let i = 1; i < tabB.n; i++) a[i] = a[i - 1] + (tabB.ch[i] ? 1 : 0) * DTB; return t => t < tAB ? 0 : a[idxB(t)]; })();
const SB = scope($('#scBS'), 592, 200);
mk($('#scBS'), 'line', { x1: 0, y1: 40, x2: 592, y2: 40, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
mk($('#scBS'), 'line', { x1: 0, y1: 190, x2: 592, y2: 190, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const sIn = SB.tr(CH1), sRaw = SB.tr('#4A5B82'), sOut = SB.tr(AM);
const sLab = [SB.lab(14, 20, 'CH1 · V IN', CH1), SB.lab(14, 84, 'CH2 · V OUT', AM), SB.lab(578, 84, 'dashed: without C', '#6F80A8', { 'text-anchor': 'end' })];
$('#roB').innerHTML = `<span class="k" style="color:#B7791F">V<sub>out</sub></span><span class="v" id="bRO" style="color:#B7791F">0.0</span><span class="u">V</span>
  <span class="k" style="color:${INK}">diodes</span><span class="v" id="bRD" style="color:${INK};font-size:30px">-</span><span class="u"></span>
  <span class="k" style="color:${RED}">ripple</span><span class="v" id="bRR" style="color:${RED}">-</span><span class="u">V</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 770, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Just like the tank: fill at the top, drain in the gap!' });

/* ================= R: derivation ================= */
const rS = $('#rS'), RX = 70, RWd = 600, RY = 470, RA = 360, RU = 3, rPts = sim(2.2, RU, false, 600);
const rAx = [W(rS, `M${RX - 10},${RY} H${RX + RWd + 14}`, { 'stroke-width': 2.5 }), W(rS, `M${RX},${RY - RA - 30} V${RY + 10}`, { 'stroke-width': 2.5 })];
const rRaw = W(rS, pathOf(rPts, RX, RWd, RY, RA, RU, 2), { stroke: '#B8BCC6', 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const rOut = W(rS, pathOf(rPts, RX, RWd, RY, RA, RU), { stroke: TE, 'stroke-width': 5 });
// one discharge segment: from the peak after hump 1 to the next top-up
const pk = rPts.findIndex(p => p[0] > 1.5 && !p[3]) - 1, re = rPts.findIndex((p, i) => i > pk + 5 && p[3]);
const X = u => RX + RWd * u / RU, Y = v => RY - RA * v;
const [u1, v1] = rPts[pk], [u2, v2] = rPts[re];
const rTop = mk(rS, 'line', { x1: X(u1) - 20, y1: Y(v1), x2: X(u2) + 24, y2: Y(v1), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rBot = mk(rS, 'line', { x1: X(u2) - 40, y1: Y(v2), x2: X(u2) + 24, y2: Y(v2), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const rVa = PUC.arrow(rS, TE, 4, 12), rVb = PUC.arrow(rS, TE, 4, 12), rVL = vsub(rS, X(u2) - 30, (Y(v1) + Y(v2)) / 2 + 9, 'V', 'r', { 'font-size': 28, 'text-anchor': 'end' });
const rTa = PUC.arrow(rS, INK, 3, 10), rTb = PUC.arrow(rS, INK, 3, 10), rTL = tx(rS, (X(u1) + X(u2)) / 2, Y(v2) + 92, 'T = 1/2f', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 24 });
const rTl = [mk(rS, 'line', { x1: X(u1), y1: Y(v1), x2: X(u1), y2: Y(v2) + 70, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '4 6' }), mk(rS, 'line', { x1: X(u2), y1: Y(v2), x2: X(u2), y2: Y(v2) + 70, stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '4 6' })];
const rDr = mono(rS, (X(u1) + X(u2)) / 2, Y(v1) - 18, 'drained by I', { 'text-anchor': 'middle', fill: VI, 'font-weight': 600, 'font-size': 18 });
const rPk = vsub(rS, RX + 8, Y(1) - 14, 'V', 'm', { 'font-size': 24 });
const rRows = steps($('#rSteps'), [
  [K(`${dQ} = ${IQ}\\,T,\\quad T = \\dfrac{1}{2f}`), '', 80],
  [K(`${Vr} = \\dfrac{${dQ}}{C} = \\dfrac{${IQ}}{2fC}`), '', 184],
  [K(`${IQ} \\approx \\dfrac{${Vm}}{R_L}`), '', 288],
  [K(`${Vr} \\approx \\dfrac{${Vm}}{2f R_L C}`), 'full-wave', 392],
  [K(`${Vr} \\approx \\dfrac{${Vm}}{f R_L C}`), 'half-wave', 492]]);
const rBox = $('#rBox'); rBox.style.top = '376px'; rBox.style.height = '100px';
const tRs = [wt('R3', 'Charge'), wt('R6', 'So'), wt('R7', 'The'), wt('R8', 'So'), wt('R10', 'So')];

/* ================= K: key ideas ================= */
const kScope = (id, ttl, col) => { const S = scope($(id), 720, 220); mk($(id), 'line', { x1: 0, y1: 196, x2: 720, y2: 196, stroke: '#3B4A6E', 'stroke-width': 2, 'stroke-dasharray': '6 6' }); return S; };
const kS1 = kScope('#kScope1'), kS2 = kScope('#kScope2');
const kRaw = [mk($('#kScope1'), 'path', { d: pathOf(sim(3, 6), 10, 700, 196, 140, 6, 2), fill: 'none', stroke: '#4A5B82', 'stroke-width': 3, 'stroke-dasharray': '8 6' }), mk($('#kScope2'), 'path', { d: pathOf(sim(3, 6, true), 10, 700, 196, 140, 6, 2), fill: 'none', stroke: '#4A5B82', 'stroke-width': 3, 'stroke-dasharray': '8 6' })];
const kOut1 = mk($('#kScope1'), 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const kHW = mk($('#kScope2'), 'path', { d: pathOf(sim(3, 6, true), 10, 700, 196, 140, 6), fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const kFW = mk($('#kScope2'), 'path', { d: pathOf(sim(3, 6), 10, 700, 196, 140, 6), fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const kL1 = [kS1.lab(14, 24, 'BIGGER C OR R L · LESS RIPPLE', AM), kS1.lab(706, 24, '', AM, { 'text-anchor': 'end', 'font-weight': 600 })];
const kL2 = [kS2.lab(14, 24, 'HALF-WAVE', CH1), kS2.lab(124, 24, '· FULL-WAVE', AM), kS2.lab(706, 24, 'same R L and C', '#8FA3C8', { 'text-anchor': 'end' })];
const KT = [['1 · LESS RIPPLE', K(`R_L C \\gg T`), 'bigger C or bigger R<sub>L</sub>'], ['2 · FULL-WAVE VS HALF-WAVE', K(`${Vr}^{FW} = \\tfrac{1}{2}\\,${Vr}^{HW}`), 'gaps half as long'],
  ['3 · RIPPLE FACTOR', K(`r = \\dfrac{V_{ac,\\,rms}}{V_{dc}}`), '1.21 half · 0.48 full, no filter']];
$('#kTiles').innerHTML = KT.map(([k, f, w], i) => `<div class="kt" style="top:${76 + i * 170}px"><div class="k">${k}</div><div class="f">${f}</div><div class="w">${w}</div></div>`).join('');
const kT = [...$('#kTiles').children];
kT[2].querySelector('.f').style.top = '46px';
const tKt = [wt('K2', 'One'), wt('K4', 'Two'), wt('K6', 'Three')], tGrow = wt('K2', 'Bigger') - 0.1;

/* ================= W: worked example ================= */
const wS = $('#wS'), WX = 70, WWd = 560, WY = 300, WA = 180, WU = 5, wPts = sim(100, WU, false, 500);
const wAx = [W(wS, `M${WX - 10},${WY} H${WX + WWd + 14}`, { 'stroke-width': 2.5 }), W(wS, `M${WX},${WY - WA - 20} V${WY + 16}`, { 'stroke-width': 2.5 })];
const wRaw = W(wS, pathOf(wPts, WX, WWd, WY, WA, WU, 2), { stroke: '#B8BCC6', 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const wOut = W(wS, pathOf(wPts, WX, WWd, WY, WA, WU), { stroke: TE, 'stroke-width': 5 });
const wPkL = mono(wS, WX + WWd + 20, WY - WA + 7, '19.9 V', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const wNo = mk(wS, 'line', { x1: WX, y1: WY - WA * 2 / Math.PI, x2: WX + WWd + 10, y2: WY - WA * 2 / Math.PI, stroke: '#B8BCC6', 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const wNoL = [mono(wS, WX + WWd + 20, WY - WA * 2 / Math.PI + 2, '12.7 V', { fill: MU, 'font-weight': 600, 'font-size': 20 }), mono(wS, WX + WWd + 20, WY - WA * 2 / Math.PI + 24, 'no filter', { fill: MU, 'font-size': 16 })];
const WT = [['RIPPLE FREQUENCY', INK, 100, 0, 'Hz'], ['2 f RL C', INK, 100, 0, ''], ['RIPPLE V r', TE, 0.2, 2, 'V'], ['V DC (FILTERED)', TE, 19.9, 1, 'V']];
$('#wTiles').innerHTML = WT.map(([k, c], i) => `<div class="wt" style="left:${32 + (i % 2) * 372}px;top:${366 + Math.floor(i / 2) * 112}px"><div class="k">${k}</div><div class="v" style="color:${c}"><span>0</span><small>${WT[i][4]}</small></div></div>`).join('');
const wT = [...$('#wTiles').children];
const wRows = steps($('#wSteps'), [
  [K(`${Vm} = 20\\,\\text{V},\\ R_L = 1\\,\\text{k}\\Omega,\\ C = 1000\\,\\mu\\text{F}`), '', 80],
  [K(`2f = 2 \\times 50 = 100\\,\\text{Hz}`), 'ripple frequency', 172],
  [K(`2fR_LC = 100 \\times 1000 \\times 10^{-3} = 100`), '', 260],
  [K(`${Vr} \\approx \\dfrac{20}{100} = 0.2\\,\\text{V}`), '', 350],
  [K(`${Vdc} \\approx ${Vm} - \\dfrac{${Vr}}{2} \\approx 19.9\\,\\text{V}`), '', 466]], { fs: 30 });
const wBox = $('#wBox'); wBox.style.top = '336px'; wBox.style.height = '100px';
const tWs = [wt('W1', 'full'), wt('W3', 'humps'), wt('W4', 'Multiply'), wt('W5', 'So'), wt('W6', 'DC')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Full-wave ripple: put f = 50 Hz', right: 'Humps come at 2f: use 100 Hz', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcIn = W(tcS, wave(40, 480, 108, 40, 2), { stroke: CH1D, 'stroke-width': 4 });
const tcOut = W(tcS, wave(40, 480, 250, 60, 2, ABS), { stroke: AM, 'stroke-width': 4 });
const tcAx = [W(tcS, 'M36,108 H524', { 'stroke-width': 2, stroke: '#CBD0DA' }), W(tcS, 'M36,250 H524', { 'stroke-width': 2, stroke: '#CBD0DA' })];
const tcN = [0, 1, 2, 3].map(i => mono(tcS, 40 + 120 * i + 60, 172, String(i + 1), { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 700, 'font-size': 24 }));
const tcL = [mono(tcS, 548, 114, '2 CYCLES IN', { fill: CH1D, 'font-weight': 600 }), mono(tcS, 548, 236, '4 HUMPS OUT', { fill: '#B7791F', 'font-weight': 600 }), mono(tcS, 548, 264, 'ripple at 2f', { 'font-size': 18 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS', 'CBSE BOARDS'], type: 'Draw the filtered output · how to get steady DC · find the ripple voltage' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `A full-wave rectifier on 50&nbsp;Hz mains gives a 15&nbsp;V peak across a 500&nbsp;Ω load with a 2000&nbsp;µF filter capacitor. The peak-to-peak ripple is about`,
  opts: [K('0.075\\,\\text{V}'), K('0.15\\,\\text{V}'), K('0.30\\,\\text{V}'), K('1.5\\,\\text{V}')], right: 1, optW: 474, optY: 344 });
const sol = PUC.solution($('#so'), [[K(`${Vm} = 15\\,\\text{V},\\ R_L = 500\\,\\Omega`)], [K(`2f = 100\\,\\text{Hz}`)],
  [K(`2fR_LC = 100 \\cdot 500 \\cdot 0.002 = 100`)], [K(`${Vr} \\approx \\dfrac{15}{100} = 0.15\\,\\text{V}`)]], { dy: 116, y0: 100 });
const tSol = [T0('A2'), wt('A2', 'so'), T0('A3'), T0('A4')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 360, y: 236, w: 1200, h: 504, y0: 90, dy: 112, title: 'Capacitor filter · formula card', txt: [0, 0, 0, 1],
  lines: [K(`\\text{full-wave: } ${Vr} \\approx \\dfrac{${Vm}}{2fR_LC} \\qquad \\text{half-wave: } ${Vr} \\approx \\dfrac{${Vm}}{fR_LC}`),
    K(`${Vdc} \\approx ${Vm} - \\dfrac{${Vr}}{2} \\qquad R_LC \\gg T`),
    K(`r = \\dfrac{V_{ac,\\,rms}}{V_{dc}}: \\ 1.21 \\text{ half},\\ 0.48 \\text{ full (no filter)}`),
    'Capacitor fills at the peaks, feeds the load in the gaps'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 45', topic: 'Zener diode as a voltage regulator', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [T0('B5'), 1.08, 960, 540], [T0('B9'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gW = t >= tW && t < tX;
  M.vis(ghost, t, tW + 0.2, tX - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gW) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq([pipe[0], tank, tap[0]], t, tMorph + 0.5, 0.4, 0.15); fadeAt([pipe[1], tap[2]], t, tMorph + 0.8, 0.2);
    const [lv, inp] = hTab.at(t);
    PUC.attr(water, 'height', (190 * 0.92 * lv).toFixed(1)); PUC.attr(water, 'y', (308 - 190 * 0.92 * lv).toFixed(1));
    const sp = inp > 0.25 ? inp : 0; PUC.attr(spurt, 'height', (sp > 0 ? 300 - 190 * 0.92 * lv - 108 : 0).toFixed(1)); PUC.attr(spurt, 'width', (6 + 8 * sp).toFixed(1));
    PUC.attr(tap[1], 'height', (t > tA0 + 0.6 ? 104 : 0).toString());
    M.vis($('#aPill'), t, tTap + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#hS'), t, tSp - 0.3, out, { dx: 60, dy: 0, ...o });
    hT1(τ => 120 * hTab.at(τ)[1], t, tSp, 10, 166, t >= tSp); fadeAt(hL1, t, tSp, 0.3);
    hT2(τ => 80 + 0 * τ, t, tTap, 10, 166, t >= tTap); fadeAt(hL2, t, tTap, 0.3);
    M.vis($('#hQ'), t, wt('H4', 'Can') - 0.1, 1e9, { dy: 20 });
  }

  /* P: ripple + filter */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P5', 'circuit') - 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq(pAx, t, tP + 0.4, 0.4, 0.1); M.draw(pHump, t, tP + 0.6, 1.4, M.clamp);
    M.draw(pWant, t, wt('P2', 'steady') - 0.2, 0.6); M.vis(pWantL, t, wt('P2', 'steady'), 1e9, { dy: 0, fade: 0.2 });
    const ua = M.io((t - wt('P3', 'wobble')) / 0.5), mx = PX + PW * 0.25 + 10;
    pRA.set(mx, PY - PA / 2, mx, PY - PA / 2 - (PA / 2 - 6) * ua); pRB.set(mx, PY - PA / 2, mx, PY - PA / 2 + (PA / 2 - 6) * ua); M.hide(pRA.g, ua < 0.05); M.hide(pRB.g, ua < 0.05);
    M.vis(pRL, t, wt('P3', 'ripple') - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.draw(pDC, t, wt('P4', 'DC') - 0.3, 0.6); M.vis(pDCL, t, wt('P4', 'DC'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pAC, t, wt('P4', 'leftover'), 1e9, { dy: 0, fade: 0.2 });
    ph.forEach((e, i) => { const ti = i ? wt('P7', 'stores') : wt('P5', 'filter'); M.vis(e, t, ti - 0.2, 1e9, { dy: 16 }); lit(e, M.io((t - ti) / 0.3), '#B7791F', '#B7791F'); });
    const tc = wt('P6', 'capacitor') - 0.2; drawSeq(capSym, t, tc, 0.3, 0.1); M.vis(capL, t, tc + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const ts = wt('P7', 'tank') - 0.4; M.vis(eqL, t, ts, 1e9, { dy: 0, fade: 0.2 }); M.draw(tankI[0], t, ts + 0.1, 0.4); M.vis(tankI[1], t, ts + 0.4, 1e9, { dy: 0, fade: 0.3 }); fadeAt([tankL, tankL2], t, ts + 0.5, 0.2);
    M.vis($('#pStrip'), t, wt('P6', 'across') - 0.2, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ckB'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#scB'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rbB'), t, tB + 0.45, 1e9, { dy: 36 });
    drawSeq(bSrc, t, tB + 0.4, 0.3, 0.1); drawSeq(bIn, t, tB + 0.6, 0.3, 0.1); drawSeq(bBox, t, tB + 0.8, 0.4); M.draw(bDia, t, tB + 1.1, 0.4); fadeAt(bBoxL, t, tB + 1.2, 0.1);
    drawSeq(bRail, t, tB + 1.4, 0.4, 0.15); M.draw(bRL, t, tB + 1.8, 0.4); fadeAt([...bRLL, ...bPM], t, tB + 2, 0.1);
    const tc = wt('B2', 'capacitor') - 0.2; drawSeq(bCap, t, tc, 0.3, 0.12); M.vis(bCapL, t, tc + 0.5, 1e9, { dy: 0, fade: 0.2 }); fadeAt(bNode, t, wt('B2', 'parallel'), 0.1);
    const live = t >= tAB, v = vB(t), ch = chB(t);
    M.vis($('#ckBE'), t, tAB, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(bQ, 'height', (26 * v).toFixed(1)); PUC.attr(bQ, 'y', (300 - 13 * v).toFixed(1)); M.hide(bQ, !live);
    M.setT(bDst, !live ? '' : (ch ? 'DIODES ON · CHARGING' : 'DIODES OFF')); PUC.attr(bDst, 'fill', ch ? '#B7791F' : RED);
    eLoad.set(150 * intV(t), live); eCh.forEach(f => f.set(260 * intCh(t), live && ch));
    sIn(τ => τ < tAB ? 0 : 24 * Math.sin(TAU * (τ - tAB) / PERB), t, tAB, 2 * PERB, 40, live);
    sRaw(τ => τ < tAB ? 0 : 96 * Math.abs(Math.sin(TAU * (τ - tAB) / PERB)), t, tAB, 2 * PERB, 190, live);
    sOut(τ => 96 * vB(τ), t, tAB, 2 * PERB, 190, live); fadeAt(sLab, t, tAB, 0.3);
    M.vis($('#slowB'), t, tAB + 0.5, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#roB'), t, tAB, 1e9, { dy: 12 });
    let mn = 1, mxv = 0; for (let k = 0; k < 60; k++) { const q = vB(t - k * PERB / 2 / 60); mn = Math.min(mn, q); mxv = Math.max(mxv, q); }
    M.setT($('#bRO'), (20 * v).toFixed(1)); M.setT($('#bRD'), !live ? '-' : (ch ? 'ON' : 'OFF')); $('#bRD').style.color = ch ? '#B7791F' : RED;
    M.setT($('#bRR'), t < tAB + PERB ? '-' : (20 * (mxv - mn)).toFixed(1));
    M.setT(bBig, t >= tBig ? 'BIGGER C · SMALLER RIPPLE' : ''); M.vis(bBig, t, tBig, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avB(t, wt('B8', 'next') - 0.1, tBig - 0.3);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tR; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tR - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'and') - 0.05, { out: tR - 0.35, outDur: 0.25 }); }

  /* R: derivation */
  const rOn = t >= tR - 0.05 && t < tK + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tK - 0.32;
    M.vis($('#rL'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(rAx, t, tR + 0.4, 0.4, 0.1); M.draw(rRaw, t, tR + 0.6, 1.6, M.clamp); M.draw(rOut, t, tR + 1.0, 2.0, M.clamp); M.vis(rPk, t, tR + 1.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(rDr, t, wt('R2', 'drains') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const tl = wt('R4', 'gap') - 0.2, ut = M.io((t - tl) / 0.5), xm = (X(u1) + X(u2)) / 2, yb = Y(v2) + 60;
    fadeAt(rTl, t, tl - 0.2, 0.1); rTa.set(xm, yb, xm - (xm - X(u1)) * ut, yb); rTb.set(xm, yb, xm + (X(u2) - xm) * ut, yb); M.hide(rTa.g, ut < 0.05); M.hide(rTb.g, ut < 0.05); M.vis(rTL, t, tl + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const tv = wt('R5', 'drop') - 0.2, uv = M.io((t - tv) / 0.5), xv = X(u2) - 14, ym = (Y(v1) + Y(v2)) / 2;
    fadeAt([rTop, rBot], t, tv - 0.2, 0.1); rVa.set(xv, ym, xv, ym - (ym - Y(v1)) * uv); rVb.set(xv, ym, xv, ym + (Y(v2) - ym) * uv); M.hide(rVa.g, uv < 0.05); M.hide(rVb.g, uv < 0.05); M.vis(rVL, t, tv + 0.3, 1e9, { dy: 0, fade: 0.2 });
    runSteps(rRows, t, tRs);
    M.vis(rBox, t, tRs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* K: key ideas */
  const kOn = t >= tK - 0.05 && t < tW + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = tW - 0.32;
    M.vis($('#kL'), t, tK + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#kR'), t, tK + 0.25, out, { dx: 60, dy: 0, ...o });
    const g = M.io((t - tGrow) / 2.4), kTc = 1.2 + 10 * g;
    PUC.attr(kOut1, 'd', pathOf(sim(kTc, 6, false, 300), 10, 700, 196, 140, 6)); M.vis(kOut1, t, tK + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(kRaw[0], t, tK + 0.5, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([kL1[0]], t, tK + 0.6); M.setT(kL1[1], 'C × ' + (kTc / 1.2).toFixed(1)); M.vis(kL1[1], t, tGrow, 1e9, { dy: 0, fade: 0.2 });
    const t2 = wt('K4', 'Two'); M.vis(kRaw[1], t, t2 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(kHW, t, t2, 1e9, { dy: 0, fade: 0.3 }); M.vis(kFW, t, wt('K4', 'full') - 0.1, 1e9, { dy: 0, fade: 0.3 }); fadeAt(kL2, t, t2, 0.3);
    kT.forEach((e, i) => { M.vis(e, t, tK + 0.5 + i * 0.12, 1e9, { dy: 16 });
      const u = M.io((t - tKt[i]) / 0.3); e.style.background = M.mix(C.soft, '#FFFFFF', u); e.style.borderColor = M.mix(C.soft, AM, u);
      [e.querySelector('.f'), e.querySelector('.w')].forEach(x => x && (x.style.opacity = (0.15 + 0.85 * u).toFixed(3))); });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.02; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(wAx, t, tW + 0.4, 0.4, 0.1); M.draw(wRaw, t, tW + 0.6, 1.4, M.clamp); M.draw(wNo, t, tW + 1.2, 0.6); fadeAt(wNoL, t, tW + 1.6, 0.15);
    M.draw(wOut, t, wt('W2', 'capacitor') - 0.2, 1.4, M.clamp); M.vis(wPkL, t, tWs[4], 1e9, { dy: 0, fade: 0.2 });
    wT.forEach((e, i) => { const ti = tWs[i + 1]; M.vis(e, t, ti - 0.1, 1e9, { dy: 16 });
      const [, , v, d] = WT[i]; M.setT(e.querySelector('.v span'), (v * M.o3((t - ti) / 0.9)).toFixed(d)); });
    runSteps(wRows, t, tWs);
    M.vis(wBox, t, tWs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.1, tRight: wt('X3', 'Full') - 0.1 });
    drawSeq(tcAx, t, tX + 0.5, 0.3, 0.1); M.draw(tcIn, t, tX + 0.7, 1.2, M.clamp); M.vis(tcL[0], t, tX + 1.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(tcOut, t, wt('X3', 'humps') - 0.3, 1.4, M.clamp);
    tcN.forEach((e, i) => M.vis(e, t, wt('X3', 'humps') + i * 0.35, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }));
    fadeAt(tcL.slice(1), t, wt('X3', 'Use') - 0.1, 0.3);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X5', 'JEE'), wt('X4', 'PUC'), wt('X4', 'CBSE')], tType: T0('X6') - 0.1 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
