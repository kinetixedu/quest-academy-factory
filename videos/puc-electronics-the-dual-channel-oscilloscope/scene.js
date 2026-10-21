// PUC Electronics Ep 21 - The dual-channel oscilloscope ("Breadboard" style, Lab Notebook world)
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
const wrapG = el => { const g = document.createElementNS(NS, 'g'); el.parentNode.insertBefore(g, el); g.appendChild(el); return g; };
const div = (host, css, html = '') => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;white-space:nowrap;' + css; d.innerHTML = html; host.appendChild(d); return d; };
// resistor zigzags (IEC-style zigzag as in the style frame)
const zigH = (x1, x2, y, a = 14, n = 6) => { let d = `M${x1},${y}`; const s = (x2 - x1) / (n * 2); for (let i = 0; i < n * 2; i++) d += ` L${(x1 + s * (i + 0.5)).toFixed(1)},${y + (i % 2 ? a : -a)}`; return d + ` L${x2},${y}`; };
const zigV = (x, y1, y2, a = 14, n = 6) => { let d = `M${x},${y1}`; const s = (y2 - y1) / (n * 2); for (let i = 0; i < n * 2; i++) d += ` L${x + (i % 2 ? a : -a)},${(y1 + s * (i + 0.5)).toFixed(1)}`; return d + ` L${x},${y2}`; };
// numeric integral of a rate (px/s) from a to t: keeps dot positions a pure function of t
const integ = (f, a, t, h = 1 / 60) => { if (t <= a) return 0; let s = 0; for (let u = a; u < t; u += h) s += f(Math.min(u + h / 2, t)) * Math.min(h, t - u); return s; };

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
/* analogue meter face: arc scale from a0 to a1 degrees (0 = straight up), labelled ticks, needle. set(u) with u = 0..1 of full scale */
const dial = (svg, cx, cy, r, labs, o = {}) => {
  const a0 = o.a0 ?? -55, a1 = o.a1 ?? 55, P = (a, rr) => [cx + rr * Math.sin(a * Math.PI / 180), cy - rr * Math.cos(a * Math.PI / 180)];
  const [sx, sy] = P(a0, r), [ex, ey] = P(a1, r);
  const parts = [W(svg, `M${sx.toFixed(1)},${sy.toFixed(1)} A${r},${r} 0 0 1 ${ex.toFixed(1)},${ey.toFixed(1)}`, { 'stroke-width': 3 })];
  const nT = o.minor ?? (labs.length - 1) * 5;
  for (let i = 0; i <= nT; i++) { const a = a0 + (a1 - a0) * i / nT, mj = i % Math.round(nT / (labs.length - 1)) === 0, [x1, y1] = P(a, r), [x2, y2] = P(a, r - (mj ? 18 : 9));
    parts.push(W(svg, `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`, { 'stroke-width': mj ? 3 : 2 })); }
  const lt = labs.map((s, i) => { const [x, y] = P(a0 + (a1 - a0) * i / (labs.length - 1), r - (o.lr ?? 40)); return mono(svg, x, y + 7, s, { 'text-anchor': 'middle', 'font-size': o.fs ?? 18, fill: INK, 'font-weight': 600 }); });
  const ng = mk(svg, 'g'), nd = W(ng, `M${cx},${cy} L${cx},${cy - r + 8}`, { stroke: o.col || AM, 'stroke-width': 4 });
  const pv = mk(svg, 'circle', { cx, cy, r: 9, fill: INK });
  return { parts, lt, nd, pv, set(u) { PUC.attr(ng, 'transform', `rotate(${(a0 + (a1 - a0) * M.clamp(u, -0.05, 1.03)).toFixed(2)} ${cx} ${cy})`); } };
};
/* diode symbol on a segment: triangle pointing from p to q (conventional current), bar at the tip */
const diode = (svg, p, q, s = 12) => {
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L, nx = -uy, ny = ux;
  const tri = mk(svg, 'path', { d: `M${mx + ux * s},${my + uy * s} L${mx - ux * s + nx * s},${my - uy * s + ny * s} L${mx - ux * s - nx * s},${my - uy * s - ny * s} Z`, fill: '#fff', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' });
  const bar = W(svg, `M${mx + ux * s + nx * s},${my + uy * s + ny * s} L${mx + ux * s - nx * s},${my + uy * s - ny * s}`, { 'stroke-width': 3 });
  return { tri, bar };
};

/* seven-segment digits (LCD style, flat fill change) */
const SEGS = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', ' ': '' };
const seg7 = (svg, x, y, w, h, o = {}) => {
  const th = o.th ?? w * 0.2, hh = h / 2, R = (X, Y, Wd, Hd) => mk(svg, 'rect', { x: X, y: Y, width: Wd, height: Hd, rx: th / 2, fill: '#E3E6EC' });
  const s = { a: R(x + th, y, w - 2 * th, th), g: R(x + th, y + hh - th / 2, w - 2 * th, th), d: R(x + th, y + h - th, w - 2 * th, th),
    f: R(x, y + th * 0.6, th, hh - th * 0.6), b: R(x + w - th, y + th * 0.6, th, hh - th * 0.6), e: R(x, y + hh, th, hh - th * 0.6), c: R(x + w - th, y + hh, th, hh - th * 0.6) };
  return { set(ch, col = INK) { const on = SEGS[ch] ?? ''; for (const k in s) PUC.attr(s[k], 'fill', on.includes(k) ? col : '#E3E6EC'); } };
};
const lcd = (svg, x, y, n, w, h, gap, o = {}) => {
  const ds = [...Array(n)].map((_, i) => seg7(svg, x + i * (w + gap), y, w, h, o));
  const dp = [...Array(n)].map((_, i) => mk(svg, 'circle', { cx: x + i * (w + gap) + w + gap / 2, cy: y + h - (o.th ?? w * 0.2) / 2, r: (o.th ?? w * 0.2) * 0.6, fill: '#E3E6EC' }));
  return { set(str, col = INK) { const ch = []; const pts = []; for (const c of str) { if (c === '.') pts[ch.length - 1] = 1; else ch.push(c); }
    while (ch.length < n) { ch.unshift(' '); pts.unshift(0); } ds.forEach((d, i) => d.set(ch[i], col)); dp.forEach((p, i) => PUC.attr(p, 'fill', pts[i] ? col : '#E3E6EC')); } };
};
/* scope grid of nx x ny divisions on a dark screen */
const screen = (svg, x, y, w, h, nx = 6, ny = 4) => {
  mk(svg, 'rect', { x, y, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < nx; i++) mk(svg, 'line', { x1: x + w * i / nx, y1: y, x2: x + w * i / nx, y2: y + h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < ny; j++) mk(svg, 'line', { x1: x, y1: y + h * j / ny, x2: x + w, y2: y + h * j / ny, stroke: '#2A3758', 'stroke-width': 1.5 });
};
const pathOf = (fx, fy, n) => { let d = ''; for (let i = 0; i <= n; i++) d += (i ? 'L' : 'M') + fx(i / n).toFixed(1) + ',' + fy(i / n).toFixed(1); return d; };
const sweepPath = (x0, w, yMid, A, cyc, ph, u0, u1, n = 120, gap = null) => { let d = '', pen = false;
  for (let i = 0; i <= n; i++) { const u = u0 + (u1 - u0) * i / n; if (gap && !gap(u)) { pen = false; continue; } const X = x0 + w * u, Y = yMid - A * Math.sin(2 * Math.PI * (cyc * u + ph)); d += (pen ? 'L' : 'M') + X.toFixed(1) + ',' + Y.toFixed(1); pen = true; } return d; };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'meter') - 0.2;
const tC = T0('C1'), tR = T0('R1'), tD = T0('D1'), tB = T0('B1'), tM = T0('M1'), tW = T0('W1'), tT = T0('T1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tX], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hmS = $('#hmS');
const hAd = [W(hmS, 'M90,30 H240 A16,16 0 0 1 256,46 V170 A16,16 0 0 1 240,186 H90 A16,16 0 0 1 74,170 V46 A16,16 0 0 1 90,30 Z', { 'stroke-width': 5, fill: '#fff' }), W(hmS, 'M130,30 V6 M200,30 V6', { 'stroke-width': 7 })];
const hAdL = mono(hmS, 165, 116, 'ADAPTER', { 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 600 });
const hCab = W(hmS, 'M165,186 C165,230 120,220 120,262', { 'stroke-width': 5 });
const hMt = [W(hmS, 'M40,262 H290 A16,16 0 0 1 306,278 V430 A16,16 0 0 1 290,446 H40 A16,16 0 0 1 24,430 V278 A16,16 0 0 1 40,262 Z', { 'stroke-width': 5, fill: '#fff' }), mk(hmS, 'rect', { x: 52, y: 288, width: 226, height: 112, rx: 10, fill: C.ac3, stroke: '#CBD0DA', 'stroke-width': 2 })];
const hLcd = lcd(hmS, 96, 306, 2, 54, 76, 30, { th: 10 });
const hV = mono(hmS, 252, 384, 'V', { 'font-size': 24, fill: TE, 'font-weight': 600 });
const nwS = $('#nwS'); screen(nwS, 0, 0, 340, 150); screen(nwS, 380, 0, 340, 150);
const nwA = W(nwS, '', { stroke: AM, 'stroke-width': 4 }), nwB = W(nwS, '', { stroke: AM, 'stroke-width': 4 });
const nwL = [mono(nwS, 0, 182, 'STEADY 7 V ?', { fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(nwS, 380, 182, 'OR WOBBLING AROUND 7 V ?', { fill: INK, 'font-weight': 600, 'font-size': 18 })];

/* ================= R: cathode ray tube ================= */
const rS = $('#rS'), rL = $('#rLab');
const tube = [W(rS, 'M120,230 H640 L1060,90', { 'stroke-width': 4 }), W(rS, 'M120,370 H640 L1060,510', { 'stroke-width': 4 }), W(rS, 'M120,230 A70,70 0 0 0 120,370', { 'stroke-width': 4 })];
const face = mk(rS, 'path', { d: 'M1060,90 Q1092,300 1060,510', fill: 'none', stroke: AM, 'stroke-width': 8, 'stroke-linecap': 'round' });
const heat = W(rS, 'M86,334 l6,-8 l6,8 l6,-8 l6,8 l6,-8', { stroke: C.ink2, 'stroke-width': 3 });
const cath = mk(rS, 'rect', { x: 96, y: 280, width: 16, height: 40, rx: 3, fill: INK });
const ap = (x, w, col = INK) => [mk(rS, 'rect', { x, y: 254, width: w, height: 34, rx: 4, fill: col }), mk(rS, 'rect', { x, y: 312, width: w, height: 34, rx: 4, fill: col })];
const grid = ap(160, 16), an1 = ap(222, 34), an2 = ap(290, 34);
const yp = [mk(rS, 'rect', { x: 410, y: 246, width: 110, height: 10, rx: 3, fill: TE }), mk(rS, 'rect', { x: 410, y: 344, width: 110, height: 10, rx: 3, fill: TE })];
const xp = [mk(rS, 'rect', { x: 560, y: 262, width: 10, height: 76, rx: 3, fill: C.ink2 }), mk(rS, 'rect', { x: 598, y: 262, width: 10, height: 76, rx: 3, fill: C.ink2, opacity: 0.45 })];
const beam = W(rS, '', { stroke: AM, 'stroke-width': 2.5, opacity: 0.55 });
const bDots = [...Array(18)].map(() => mk(rS, 'circle', { r: 5, fill: AM, stroke: INK, 'stroke-width': 1.2 }));
const spotS = mk(rS, 'circle', { r: 9, fill: AM, stroke: INK, 'stroke-width': 2 });
const CL = [['Heated cathode', 'gives off electrons', 128, 150], ['Control grid', 'brightness', 168, 396], ['Anodes', 'speed + focus', 330, 396], ['Y plates', 'up and down', 465, 150], ['X plates', 'left to right', 584, 396], ['Phosphor screen', 'glows where hit', 960, 540]];
const cls = CL.map(([a, b, x, y]) => div(rL, `left:${x - 110}px;top:${y}px;width:220px`, `<div class="cl" style="position:static">${a}<i>${b}</i></div>`));
// front view screen + time base
const FX = 1148, FY = 72, FW = 420, FH = 300;
screen(rS, FX, FY, FW, FH);
const fTrail = W(rS, '', { stroke: AM, 'stroke-width': 4 }), fPrev = W(rS, '', { stroke: AM, 'stroke-width': 3, opacity: 0.35 }), fSpot = mk(rS, 'circle', { r: 8, fill: '#FFE9B8', stroke: AM, 'stroke-width': 3 });
const tbBg = mk(rS, 'rect', { x: FX, y: 400, width: FW, height: 120, rx: 10, fill: C.soft });
const tbL = mono(rS, FX + 16, 424, 'TIME BASE · SAWTOOTH TO X PLATES', { 'font-size': 15, 'font-weight': 600 });
const tbP = W(rS, '', { stroke: C.ink2, 'stroke-width': 3 }), tbDot = mk(rS, 'circle', { r: 7, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const tR2 = T0('R2'), tR3 = T0('R3'), tR4 = T0('R4'), tR5 = wt('R5', 'glows'), tR6 = wt('R6', 'vertical'), tR7 = wt('R7', 'horizontal'), tR8 = T0('R8'), tR9 = wt('R9', 'trigger');
const TS = 2.0; // seconds per sweep (slow-motion view)
// the deflections at time t: y as a fraction of half height, x as 0..1 across
const sweepK = t => Math.floor((t - tR7) / TS), sweepU = t => (((t - tR7) / TS) % 1 + 1) % 1;
const drift = k => ((k * 0.37) % 1);
const yAt = (t, u, k) => { if (t < tR6) return 0; if (t >= tR7 && t < tR8) return 0; const ph = (t >= tR8 && t < tR9 + 0.2) ? drift(k) : 0; return t < tR7 ? Math.sin(2 * Math.PI * 0.9 * (t - tR6)) : Math.sin(2 * Math.PI * (2 * u + ph)); };

/* ================= D: dual channel ================= */
const dS = $('#dS'), dBk = $('#dBk');
const BK = [['CH1 in', 40, 110, 150], ['CH2 in', 40, 330, 150], ['Amplifier', 230, 110, 170], ['Amplifier', 230, 330, 170], ['Electronic switch', 448, 220, 280], ['Y plates', 520, 446, 136]];
const bks = BK.map(([s, x, y, w], i) => div(dBk, `left:${x}px;top:${y}px;width:${w}px`, `<div class="bk" style="position:static;${i === 0 ? `border-left:8px solid ${CH1}` : i === 1 ? `border-left:8px solid ${AM}` : i === 4 ? 'background:#16213E;color:#fff' : ''}">${s}</div>`));
const dLn = [W(dS, 'M190,142 H230', { 'stroke-width': 3 }), W(dS, 'M190,362 H230', { 'stroke-width': 3 }), W(dS, 'M400,142 H430 V240 H448', { 'stroke-width': 3 }), W(dS, 'M400,362 H430 V264 H448', { 'stroke-width': 3 }), W(dS, 'M588,284 V446', { 'stroke-width': 3 })];
const dArm = mk(dS, 'line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: AM, 'stroke-width': 6, 'stroke-linecap': 'round' });
const dPills = [div(dBk, 'left:40px;top:510px', `<span class="pillp" id="pA" style="position:static">Alternate · fast signals</span>`), div(dBk, 'left:380px;top:510px', `<span class="pillp" id="pC" style="position:static">Chop · slow signals</span>`)];
const dSc = $('#dSc'); screen(dSc, 0, 0, 720, 440);
const dT1 = W(dSc, '', { stroke: CH1, 'stroke-width': 4 }), dT2 = W(dSc, '', { stroke: AM, 'stroke-width': 4 }), dP1 = W(dSc, '', { stroke: CH1, 'stroke-width': 3, opacity: 0.35 }), dP2 = W(dSc, '', { stroke: AM, 'stroke-width': 3, opacity: 0.35 });
const dSpot = mk(dSc, 'circle', { r: 8, fill: '#FFE9B8', stroke: AM, 'stroke-width': 3 });
const dLb = [SCx(dSc, 14, 26, 'CH1', CH1), SCx(dSc, 14, 430, 'CH2', AM)];
function SCx(svg, x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: col }); e.textContent = s; return e; }
const tAlt = wt('D3', 'alternate'), tChop = wt('D4', 'chop');
const avD = PUC.avatar($('#sD'), { x: 1008, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'One beam, but it looks like two!' });

/* ================= B: breadboard RC ================= */
const ck = $('#ckS');
const src = mk(ck, 'circle', { cx: 150, cy: 300, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), srcW = W(ck, 'M122,300 C132,276 142,276 150,300 S168,324 178,300');
const bW = [W(ck, 'M150,254 V150 H330'), W(ck, zigH(330, 490, 150, 14, 6)), W(ck, 'M490,150 H640 V272'), W(ck, 'M640,300 V450 H150 V346')];
const cap = [W(ck, 'M596,272 H684', { 'stroke-width': 5 }), W(ck, 'M596,300 H684', { 'stroke-width': 5 })];
const gnd = W(ck, 'M380,450 V476 M356,476 H404 M366,488 H394 M376,500 H384', { 'stroke-width': 3 });
const bLab = [tx(ck, 214, 292, 'AC in'), mono(ck, 214, 320, 'f', {}), tx(ck, 410, 112, 'R', { 'text-anchor': 'middle', 'font-style': 'italic' }), mono(ck, 410, 200, '1 kΩ', { 'text-anchor': 'middle' }), tx(ck, 704, 284, 'C', { 'font-style': 'italic' }), mono(ck, 704, 312, '0.1 µF')];
const probe = (x, y, col, s, lx, ly) => { const g = mk(ck, 'g'); mk(g, 'line', { x1: x, y1: y, x2: lx, y2: ly, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }); mk(g, 'circle', { cx: x, cy: y, r: 9, fill: col, stroke: INK, 'stroke-width': 2 });
  const r = mk(g, 'rect', { x: lx - 4, y: ly - 22, width: 76, height: 36, rx: 8, fill: col }); const tt = mk(g, 'text', { x: lx + 34, y: ly + 3, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'font-size': 18, fill: col === AM ? '#fff' : INK }); tt.textContent = s; return g; };
const pr1 = probe(240, 150, CH1, 'CH1', 220, 76), pr2 = probe(640, 210, AM, 'CH2', 740, 210);
const eB = flow(ck, [[640, 300], [640, 450], [150, 450], [150, 346], [150, 254], [150, 150], [640, 150], [640, 272]], 30, { skip: (x, y) => Math.hypot(x - 150, y - 300) < 50 || (y > 136 && y < 164 && x > 326 && x < 494) || (Math.abs(x - 640) < 3 && y > 262 && y < 310) });
const tB2 = T0('B2'), tB3 = wt('B3', 'Watch'), tUp = wt('B4', 'Turn');
const fK = t => M.lerp(1, 3, M.io((t - tUp) / 1.8)); // kHz
const FC = 1 / (2 * Math.PI * 1e3 * 0.1e-6) / 1000; // kHz, 1.59
const gain = f => 1 / Math.sqrt(1 + (f / FC) ** 2), lag = f => Math.atan(f / FC);
const SCb = scope($('#scS'), 592, 200), tr1 = SCb.tr(CH1), tr2 = SCb.tr(AM);
const sL = [SCb.lab(14, 24, 'CH1 · V IN', CH1), SCb.lab(14, 194, 'CH2 · V ACROSS C', AM)];
$('#bRo').innerHTML = `<span class="k">f</span><span class="v" id="bF">1.0</span><span class="u">kHz</span>
  <span class="k n">CH2 / CH1</span><span class="v" id="bG" style="color:#B7791F">0.85</span><span class="u"></span>
  <span class="k n">LAG</span><span class="v" id="bL">32</span><span class="u">°</span>`;

/* ================= M: reading the screen + worked example ================= */
const mS = $('#mS'), GX = 112, GY = 76, DV = 56; // 10 x 8 divisions of 56 px
screen(mS, GX, GY, 560, 448, 10, 8);
const mW1 = W(mS, '', { stroke: CH1, 'stroke-width': 4 }), mW2 = W(mS, '', { stroke: AM, 'stroke-width': 4 });
const wave = (ph) => pathOf(u => GX + 560 * u, u => GY + 224 - 2 * DV * Math.sin(2 * Math.PI * (2 * u - ph)), 160);
PUC.attr(mW1, 'd', wave(0));
const bVpp = W(mS, `M${GX - 18},${GY + 224 - 2 * DV} H${GX - 30} V${GY + 224 + 2 * DV} H${GX - 18}`, { stroke: TE, 'stroke-width': 3 });
const bVt = mono(mS, GX - 40, GY + 230, '4 div', { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 18 });
const bT = W(mS, `M${GX},${GY + 448 + 18} V${GY + 448 + 30} H${GX + 5 * DV} V${GY + 448 + 18}`, { stroke: INK, 'stroke-width': 3 });
const bTt = mono(mS, GX + 2.5 * DV, GY + 448 + 56, 'one cycle = 5 div', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 });
const bPh = W(mS, `M${GX + 1.25 * DV},${GY + 30} H${GX + 2.25 * DV}`, { stroke: '#FFFFFF', 'stroke-width': 3 }), bPht = mono(mS, GX + 2.4 * DV, GY + 36, 'shift', { fill: '#FFFFFF', 'font-weight': 600, 'font-size': 17 });
const knob = (svg) => { mk(svg, 'circle', { cx: 30, cy: 30, r: 26, fill: '#fff', stroke: INK, 'stroke-width': 3 }); return mk(svg, 'line', { x1: 30, y1: 30, x2: 30, y2: 10, stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' }); };
const kVp = knob($('#kV svg')), kTp = knob($('#kT svg'));
const mSt = [
  [K(`\\textcolor{${TE}}{V_{pp}} = \\text{div} \\times \\tfrac{\\text{V}}{\\text{div}}`), 'vertical', 220],
  [K(`T = \\text{div} \\times \\tfrac{\\text{time}}{\\text{div}},\\quad f = \\tfrac{1}{T}`), 'horizontal', 318],
  [K(`\\varphi = \\dfrac{\\text{shift}}{\\text{one cycle}} \\times 360^\\circ`), 'two channels', 480]];
$('#mSteps').innerHTML = mSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const mRows = [...$('#mSteps').children];
const wSt = [
  [K(`\\textcolor{${TE}}{V_{pp}} = 4 \\times 2\\,\\text{V} = 8\\,\\text{V}`), '', 220],
  [K(`\\textcolor{${TE}}{V_m} = 4\\,\\text{V}`), 'half of it', 304],
  [K(`T = 5 \\times 0.2\\,\\text{ms} = 1\\,\\text{ms}`), '', 388],
  [K(`f = \\dfrac{1}{1\\,\\text{ms}} = 1000\\,\\text{Hz}`), '', 478]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRows = [...$('#wSteps').children];
const tMs = [wt('M3', 'Peak'), wt('M4', 'The'), wt('M5', 'With')], tWs = [wt('W2', 'So'), wt('W2', 'peak', 1), wt('W3', 'One'), wt('W4', 'The')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Full height of the wave = peak voltage', right: 'Full height = peak to peak · peak is half', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcAx = W(tcS, 'M60,150 H560', { stroke: '#CBD0DA', 'stroke-width': 2 }), tcW = W(tcS, pathOf(u => 60 + 500 * u, u => 150 - 80 * Math.sin(2 * Math.PI * 1.5 * u), 120), { stroke: TE, 'stroke-width': 4 });
const tcB1 = W(tcS, 'M600,70 H612 V230 H600', { stroke: INK, 'stroke-width': 3 }), tcB1t = mono(tcS, 624, 156, 'Vpp', { fill: INK, 'font-weight': 600 });
const tcB2 = W(tcS, 'M676,70 H688 V150 H676', { stroke: TE, 'stroke-width': 3 }), tcB2t = mono(tcS, 700, 116, 'Vm', { fill: TE, 'font-weight': 600 });
const tcN = mono(tcS, 60, 272, 'Vm = Vpp / 2', { fill: INK, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Block diagram, controls, chop vs alternate, reading V and f from the screen' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A scope is set to 0.5&nbsp;ms/div. One cycle of each wave covers 8&nbsp;divisions, and CH2 is shifted 1&nbsp;division behind CH1. Frequency and phase difference?', qW: 800,
  opts: ['250 Hz, 45°', '2 kHz, 45°', '250 Hz, 90°', '500 Hz, 22.5°'], right: 0, optW: 474, optY: 352 });
const sol = PUC.solution($('#so'), [[K(`T = 8\\times0.5\\,\\text{ms} = 4\\,\\text{ms}`)], [K(`f = \\dfrac{1}{4\\,\\text{ms}} = 250\\,\\text{Hz}`)],
  [K(`\\varphi = \\tfrac{1}{8}\\times360^\\circ`)], [K(`\\varphi = 45^\\circ`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A3', 'So'), wt('A4', 'The'), wt('A4', 'which')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 96, dy: 104, title: 'Oscilloscope · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${TE}}{V_{pp}} = \\text{div}\\times\\tfrac{\\text{V}}{\\text{div}} \\qquad \\textcolor{${TE}}{V_m} = \\tfrac{1}{2}\\textcolor{${TE}}{V_{pp}}`),
    K(`T = \\text{div}\\times\\tfrac{\\text{time}}{\\text{div}} \\qquad f = \\tfrac{1}{T} \\qquad \\varphi = \\tfrac{\\text{shift}}{\\text{cycle}}\\times360^\\circ`),
    'Electron gun → Y plates (signal) → X plates (time base) → screen',
    'Alternate: fast signals · Chop: slow signals'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 22', topic: 'Measuring voltage, current, resistance and waveforms', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tR2 - 0.2, 1.12, 640, 560], [tR5 - 0.4, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.3, tT - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook (+ C1 line) */
  const aOn = t >= tMorph && t < tR + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tR - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    drawSeq(hAd, t, tMorph + 0.5, 0.5, 0.2); M.vis(hAdL, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.draw(hCab, t, tMorph + 0.9, 0.4);
    M.draw(hMt[0], t, tMorph + 1.0, 0.5); M.vis(hMt[1], t, tMorph + 1.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(hV, t, tMorph + 1.4, 1e9, { dy: 0, fade: 0.2 });
    hLcd.set(t < wt('H1', 'seven') ? '  ' : '7.0');
    M.vis($('#thC'), t, wt('H1', 'seven') - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#thN'), t, wt('H1', 'seven'), 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#thL'), t, wt('H2', 'number') - 0.2, 1e9, { dy: 10 });
    M.vis($('#nwC'), t, wt('H1', 'steady') - 0.2, out, { dy: 36, ...o });
    const ph = t * 1.4;
    PUC.attr(nwA, 'd', `M8,${75} H332`); PUC.attr(nwB, 'd', pathOf(u => 388 + 324 * u, u => 75 - 34 * Math.sin(2 * Math.PI * (3 * u - ph)), 90));
    M.draw(nwA, t, wt('H1', 'steady'), 0.6); M.vis(nwB, t, wt('H1', 'wobbling'), 1e9, { dy: 0, fade: 0.25 });
    M.vis(nwL[0], t, wt('H1', 'steady'), 1e9, { dy: 0, fade: 0.2 }); M.vis(nwL[1], t, wt('H1', 'wobbling'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* R: CRT */
  const rOn = t >= tR - 0.05 && t < tD + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tD - 0.32;
    M.vis($('#rC'), t, tR + 0.1, out, { dy: 36, ...o });
    drawSeq(tube, t, tR + 0.4, 0.6, 0.15); M.draw(face, t, tR + 0.9, 0.5);
    M.vis(cath, t, tR2 - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.draw(heat, t, tR2, 0.4); PUC.attr(heat, 'stroke', M.mix(C.ink2, C.red, M.io((t - wt('R2', 'heated')) / 0.4)));
    grid.forEach(e => M.vis(e, t, tR3 - 0.1, 1e9, { dy: 0, fade: 0.2 })); [...an1, ...an2].forEach(e => M.vis(e, t, tR4 - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    yp.forEach(e => M.vis(e, t, wt('R6', 'Two') - 0.1, 1e9, { dy: 0, fade: 0.2 })); xp.forEach(e => M.vis(e, t, wt('R6', 'Two'), 1e9, { dy: 0, fade: 0.2 }));
    const tl = [tR2, tR3, tR4, wt('R6', 'vertical') - 0.3, wt('R7', 'horizontal') - 0.3, tR5 - 0.3];
    cls.forEach((c, i) => M.vis(c, t, tl[i], 1e9, { dy: 12 }));
    // beam: electrons leave the cathode, focus after the anodes, bend in the Y plates, hit the screen
    const k = sweepK(t), u = t >= tR7 ? sweepU(t) : 0.5, yf = yAt(t, u, k), ys = 300 - 170 * yf;
    const beamOn = t >= wt('R2', 'electrons'), focus = M.io((t - tR4) / 0.8), reach = t >= tR4 + 0.3;
    PUC.attr(beam, 'd', `M112,300 L465,300 L1064,${ys.toFixed(1)}`); M.hide(beam, !reach);
    const bright = t < tR3 ? 1 : 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.4 * (t - tR3)));
    bDots.forEach((d, i) => { const s = ((t * 260 + i * 60) % 1080); let x, y; if (s < 353) { x = 112 + s; y = 300 + (1 - focus) * ((i % 3) - 1) * 18 * Math.min(1, s / 120); } else { const q = (s - 353) / 727; x = 465 + 599 * q; y = 300 + (ys - 300) * q; }
      const vis = beamOn && (reach || x < 340) && (t >= tR3 || i % 2 === 0 || true); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); M.hide(d, !vis || (!reach && x > 330)); d.style.opacity = t >= tR3 && t < tR4 ? bright.toFixed(2) : ''; });
    PUC.attr(spotS, 'cx', 1066); PUC.attr(spotS, 'cy', ys.toFixed(1)); M.hide(spotS, t < tR5);
    // front view
    const fx = FX + FW / 2 + (t >= tR7 ? (u - 0.5) * (FW - 24) : 0), fy = FY + FH / 2 - (FH / 2 - 30) * yf;
    PUC.attr(fSpot, 'cx', fx.toFixed(1)); PUC.attr(fSpot, 'cy', fy.toFixed(1)); M.hide(fSpot, t < tR5);
    let d = '', dp = '';
    if (t >= tR6 && t < tR7) { for (let i = 0; i <= 40; i++) { const tt = Math.max(tR6, t - 0.9 + 0.9 * i / 40); d += (i ? 'L' : 'M') + (FX + FW / 2) + ',' + (FY + FH / 2 - (FH / 2 - 30) * Math.sin(2 * Math.PI * 0.9 * (tt - tR6))).toFixed(1); } }
    else if (t >= tR7) { const ph = (t >= tR8 && t < tR9 + 0.2) ? drift(k) : 0, A = t >= tR8 ? FH / 2 - 30 : 0, ph0 = (t >= tR8 && t < tR9 + 0.2) ? drift(k - 1) : 0;
      d = sweepPath(FX + 12, FW - 24, FY + FH / 2, A, 2, ph, 0, u, 100); if (k >= 1 && (t - TS) >= tR7) dp = sweepPath(FX + 12, FW - 24, FY + FH / 2, (t - TS) >= tR8 ? FH / 2 - 30 : 0, 2, ph0, u, 1, 80); }
    PUC.attr(fTrail, 'd', d); PUC.attr(fPrev, 'd', dp);
    M.vis($('#rFv'), t, tR5 - 0.3, 1e9, { dy: 10 });
    M.vis(tbBg, t, wt('R7', 'sawtooth') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(tbL, t, wt('R7', 'sawtooth'), 1e9, { dy: 0, fade: 0.2 });
    if (t >= wt('R7', 'sawtooth')) { let sd = ''; const x0 = FX + 16, w = FW - 32; for (let j = 0; j < 3; j++) { const a = x0 + w * j / 3, b = x0 + w * (j + 1) / 3; sd += `M${a.toFixed(1)},508 L${(b - 4).toFixed(1)},440 L${(b - 4).toFixed(1)},508 `; } PUC.attr(tbP, 'd', sd); M.hide(tbP, false);
      const uu = (u + 0) % 1, jx = x0 + w / 3 * (1 + uu) - 4 * uu; PUC.attr(tbDot, 'cx', (x0 + w / 3 + (w / 3 - 4) * uu).toFixed(1)); PUC.attr(tbDot, 'cy', (508 - 68 * uu).toFixed(1)); M.hide(tbDot, false); }
    else { M.hide(tbP, true); M.hide(tbDot, true); }
    M.vis($('#rTrig'), t, tR9 + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* D: dual channel */
  const dOn = t >= tD - 0.05 && t < tB + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tB - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    bks.forEach((b, i) => M.vis(b, t, [tD + 0.4, tD + 0.5, tD + 0.7, tD + 0.8, wt('D2', 'switch') - 0.2, wt('D2', 'beam') - 0.2][i], 1e9, { dy: 16 }));
    drawSeq(dLn.slice(0, 2), t, tD + 0.6, 0.2, 0.1); drawSeq(dLn.slice(2, 4), t, wt('D2', 'switch'), 0.3, 0.1); M.draw(dLn[4], t, wt('D2', 'beam'), 0.3);
    // switch arm: alternate flips each sweep, chop flips many times per sweep
    const SWP = 1.6, alt = t >= tAlt - 0.2 && t < tChop - 0.2, chop = t >= tChop - 0.2;
    const k = Math.floor((t - tD) / SWP), u = ((t - tD) / SWP) % 1;
    const ch = chop ? (Math.floor(u * 24) % 2) : (k % 2);
    PUC.attr(dArm, 'x1', 460); PUC.attr(dArm, 'y1', ch ? 264 : 240); PUC.attr(dArm, 'x2', 560); PUC.attr(dArm, 'y2', 252); M.vis(dArm, t, wt('D2', 'switch'), 1e9, { dy: 0, fade: 0.2 });
    $('#pA').style.background = alt ? AM : C.soft; $('#pA').style.color = alt ? '#fff' : INK; $('#pC').style.background = chop ? AM : C.soft; $('#pC').style.color = chop ? '#fff' : INK;
    dPills.forEach((p, i) => M.vis(p, t, i ? tChop - 0.3 : tAlt - 0.3, 1e9, { dy: 12 }));
    M.vis($('#dMode'), t, tAlt - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.setT($('#dMode'), chop ? 'CHOP' : 'ALTERNATE');
    const y1 = 120, y2 = 320, A = 80, sOn = t >= tD + 1.0;
    if (!sOn) { [dT1, dT2, dP1, dP2].forEach(p => PUC.attr(p, 'd', '')); M.hide(dSpot, true); }
    else if (!chop) {
      // one channel per sweep; the other stays as a fading trace
      const cur = alt ? (k % 2) : 0, pth = sweepPath(10, 700, cur ? y2 : y1, cur ? A * 0.6 : A, 2, cur ? -0.08 : 0, 0, u, 100);
      PUC.attr(cur ? dT2 : dT1, 'd', pth); PUC.attr(cur ? dT1 : dT2, 'd', '');
      PUC.attr(cur ? dP1 : dP2, 'd', alt && k >= 1 ? sweepPath(10, 700, cur ? y1 : y2, cur ? A : A * 0.6, 2, cur ? 0 : -0.08, 0, 1, 100) : ''); PUC.attr(cur ? dP2 : dP1, 'd', '');
      PUC.attr(dSpot, 'cx', (10 + 700 * u).toFixed(1)); PUC.attr(dSpot, 'cy', ((cur ? y2 : y1) - (cur ? A * 0.6 : A) * Math.sin(2 * Math.PI * (2 * u + (cur ? -0.08 : 0)))).toFixed(1)); M.hide(dSpot, false);
    } else {
      const g1 = v => Math.floor(v * 120) % 2 === 0, g2 = v => Math.floor(v * 120) % 2 === 1;
      PUC.attr(dT1, 'd', sweepPath(10, 700, y1, A, 2, 0, 0, u, 480, g1)); PUC.attr(dT2, 'd', sweepPath(10, 700, y2, A * 0.6, 2, -0.08, 0, u, 480, g2));
      PUC.attr(dP1, 'd', k >= 1 ? sweepPath(10, 700, y1, A, 2, 0, u, 1, 360, g1) : ''); PUC.attr(dP2, 'd', k >= 1 ? sweepPath(10, 700, y2, A * 0.6, 2, -0.08, u, 1, 360, g2) : '');
      const cy = Math.floor(u * 120) % 2 ? y2 - A * 0.6 * Math.sin(2 * Math.PI * (2 * u - 0.08)) : y1 - A * Math.sin(2 * Math.PI * 2 * u);
      PUC.attr(dSpot, 'cx', (10 + 700 * u).toFixed(1)); PUC.attr(dSpot, 'cy', cy.toFixed(1)); M.hide(dSpot, false);
    }
    dLb.forEach(e => M.vis(e, t, tD + 1.0, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#dNote'), t, tAlt, 1e9, { dy: 10 }); M.setT($('#dNote'), chop ? 'switches many times in every sweep' : 'CH1 on one sweep, CH2 on the next');
    avD(t, wt('D4', 'slow') + 0.3, out);
  }

  /* B: breadboard RC */
  const bOn = t >= tB - 0.05 && t < tM + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tM - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis(src, t, tB2 - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.draw(srcW, t, tB2, 0.4);
    drawSeq(bW, t, tB2 + 0.1, 0.35, 0.14); drawSeq(cap, t, wt('B2', 'capacitor') - 0.1, 0.25, 0.1); M.draw(gnd, t, wt('B2', 'capacitor'), 0.4);
    fadeAt(bLab.slice(0, 2), t, tB2 + 0.2); fadeAt(bLab.slice(2, 4), t, wt('B2', 'resistor') - 0.1); fadeAt(bLab.slice(4), t, wt('B2', 'capacitor'));
    M.vis(pr1, t, wt('B2', 'Channel') - 0.1, 1e9, { dy: -16, sp: M.POP }); M.vis(pr2, t, wt('B2', 'Channel', 1) - 0.1, 1e9, { dy: -16, sp: M.POP });
    const f = fK(t), G = gain(f), L = lag(f);
    // slow-motion view: the traces keep the true shape; display shows 2 cycles at 1 kHz
    const cyc = 2 * f, sOn = t >= tB2 + 0.4;
    const ph = 0;
    tr1(τ => 0, t, 0, 1, 0, false); tr2(τ => 0, t, 0, 1, 0, false);
    // triggered (still) traces drawn by a first sweep
    const su = M.clamp((t - tB2 - 0.4) / 1.2), s2 = M.clamp((t - wt('B2', 'Channel', 1) - 0.1) / 1.2);
    SCpaths(t, cyc, G, L, su, s2, sOn);
    M.vis($('#ckE'), t, tB2 + 0.6, 1e9, { dy: 0, fade: 0.2 });
    eB.set(26 * Math.sin(2 * Math.PI * 0.7 * Math.max(0, t - tB2 - 0.6)), t >= tB2 + 0.6);
    sL.forEach((e, i) => M.vis(e, t, i ? wt('B2', 'Channel', 1) : tB2 + 0.4, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#slowT'), t, tB3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#bRo'), t, tB3 - 0.2, 1e9, { dy: 12 });
    M.setT($('#bF'), f.toFixed(1)); M.setT($('#bG'), G.toFixed(2)); M.setT($('#bL'), Math.round(L * 180 / Math.PI).toString());
  }

  /* M: reading the screen + worked example */
  const mOn = t >= tM - 0.05 && t < tT + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mL'), t, tM + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#mR'), t, tM + 0.25, 1e9, { dx: 60, dy: 0 });
    M.draw(mW1, t, tM + 0.6, 1.2);
    M.vis($('#kV'), t, wt('M2', 'Volts') - 0.1, 1e9, { dy: 16 }); M.vis($('#kT'), t, wt('M2', 'Time') - 0.1, 1e9, { dy: 16 });
    PUC.attr(kVp, 'transform', `rotate(${(-40 + 80 * M.io((t - wt('M2', 'Volts')) / 0.6)).toFixed(1)} 30 30)`); PUC.attr(kTp, 'transform', `rotate(${(-40 + 80 * M.io((t - wt('M2', 'Time')) / 0.6)).toFixed(1)} 30 30)`);
    M.draw(bVpp, t, tMs[0], 0.5); M.vis(bVt, t, tMs[0] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.draw(bT, t, tMs[1] + 0.2, 0.6); M.vis(bTt, t, tMs[1] + 0.5, 1e9, { dy: 0, fade: 0.2 });
    // phase: CH2 shifted by one division (only while the phase rule is on screen)
    PUC.attr(mW2, 'd', wave(1 / 5 * 0.999)); M.draw(mW2, t, tMs[2] + 0.2, 1.0); if (t >= tW - 0.3) M.hide(mW2, true);
    M.vis(bPh, t, tMs[2] + 1.0, tW - 0.3, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 }); M.vis(bPht, t, tMs[2] + 1.0, tW - 0.3, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 });
    M.vis($('#mRL1'), t, tM + 0.3, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#mRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    mRows.forEach((r, i) => { M.vis(r, t, tMs[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tMs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tMs[i], 0.6); M.vis(r.querySelector('.why'), t, tMs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#mBox'), t, tWs[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    wRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tX; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tX - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'An') - 0.05, { out: tX - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not'), tRight: wt('X3', 'Top') - 0.1 });
    M.vis(tcAx, t, tX + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.draw(tcW, t, tX + 0.6, 1.0);
    M.draw(tcB1, t, wt('X3', 'Top'), 0.4); M.vis(tcB1t, t, wt('X3', 'Top') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.draw(tcB2, t, wt('X3', 'half') - 0.2, 0.4); M.vis(tcB2t, t, wt('X3', 'half'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tcN, t, wt('X3', 'half') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'block') - 0.2 });
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
/* the two triggered traces of the breadboard scope (CH2 lags and shrinks) */
const scP1 = mk($('#scS'), 'path', { d: '', fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' }), scP2 = mk($('#scS'), 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
function SCpaths(t, cyc, G, L, su, s2, on) {
  M.hide(scP1, !on || su <= 0); M.hide(scP2, !on || s2 <= 0);
  PUC.attr(scP1, 'd', sweepPath(6, 580, 100, 70, cyc, 0, 0, su, 160));
  PUC.attr(scP2, 'd', sweepPath(6, 580, 100, 70 * G, cyc, -L / (2 * Math.PI), 0, s2, 160));
}
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
M.sfx(tX - 0.1, 'whoosh', 0.22);
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
