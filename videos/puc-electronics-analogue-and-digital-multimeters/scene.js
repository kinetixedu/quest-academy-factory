// PUC Electronics Ep 20 - Analogue and digital multimeters ("Breadboard" style, Lab Notebook world)
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

/* seven-segment digit (LCD style, flat fill change: on = ink, off = faint) */
const SEGS = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', ' ': '' };
const seg7 = (svg, x, y, w, h, o = {}) => {
  const th = o.th ?? w * 0.2, hh = h / 2, R = (X, Y, Wd, Hd) => mk(svg, 'rect', { x: X, y: Y, width: Wd, height: Hd, rx: th / 2, fill: '#E3E6EC' });
  const s = { a: R(x + th, y, w - 2 * th, th), g: R(x + th, y + hh - th / 2, w - 2 * th, th), d: R(x + th, y + h - th, w - 2 * th, th),
    f: R(x, y + th * 0.6, th, hh - th * 0.6), b: R(x + w - th, y + th * 0.6, th, hh - th * 0.6), e: R(x, y + hh, th, hh - th * 0.6), c: R(x + w - th, y + hh, th, hh - th * 0.6) };
  return { set(ch, col = INK) { const on = SEGS[ch] ?? ''; for (const k in s) PUC.attr(s[k], 'fill', on.includes(k) ? col : '#E3E6EC'); } };
};
/* a display of n digits with decimal points: set('4.975') */
const lcd = (svg, x, y, n, w, h, gap, o = {}) => {
  const ds = [...Array(n)].map((_, i) => seg7(svg, x + i * (w + gap), y, w, h, o));
  const dp = [...Array(n)].map((_, i) => mk(svg, 'circle', { cx: x + i * (w + gap) + w + gap / 2, cy: y + h - (o.th ?? w * 0.2) / 2, r: (o.th ?? w * 0.2) * 0.6, fill: '#E3E6EC' }));
  return { set(str, col = INK) { const ch = []; const pts = []; for (const c of str) { if (c === '.') pts[ch.length - 1] = 1; else ch.push(c); }
    while (ch.length < n) { ch.unshift(' '); pts.unshift(0); } ds.forEach((d, i) => d.set(ch[i], col)); dp.forEach((p, i) => PUC.attr(p, 'fill', pts[i] ? col : '#E3E6EC')); } };
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'checks') - 0.2;
const tM = T0('M1'), tN = T0('N1'), tG = T0('G1'), tB = T0('B1'), tW = T0('W1'), tT = T0('T1'), tK = T0('K1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1', 0);
const tAns2 = T0('A1');
const SW = [[tT, tK], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const hmS = $('#hmS');
const hA = [W(hmS, 'M30,0 H300 A20,20 0 0 1 320,20 V180 A20,20 0 0 1 300,200 H30 A20,20 0 0 1 10,180 V20 A20,20 0 0 1 30,0 Z', { 'stroke-width': 5, fill: '#fff' })];
const hAd = dial(hmS, 165, 176, 130, ['0', '5', '10'], { lr: 34, fs: 17, minor: 10 });
const hD = [W(hmS, 'M30,250 H300 A20,20 0 0 1 320,270 V430 A20,20 0 0 1 300,450 H30 A20,20 0 0 1 10,430 V270 A20,20 0 0 1 30,250 Z', { 'stroke-width': 5, fill: '#fff' }), mk(hmS, 'rect', { x: 40, y: 280, width: 250, height: 120, rx: 10, fill: C.ac3, stroke: '#CBD0DA', 'stroke-width': 2 })];
const hLg = mk(hmS, 'g'), hLcd = lcd(hLg, 64, 300, 3, 52, 80, 24, { th: 10 });
const hLb = [mono(hmS, 165, 228, 'NEEDLE', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 }), mono(hmS, 165, 426, 'DIGITAL · V', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600 })];
const thD = $('#thD'), tDial = dial(thD, 150, 176, 140, ['0', '2', '4', '6', '8', '10'], { lr: 34, fs: 16 });
const tH1 = wt('H1', 'needle'), tH2 = T0('H2');

/* ================= M: overview ================= */
const mS = $('#mS');
const mBody = W(mS, 'M220,70 H564 A30,30 0 0 1 594,100 V540 A30,30 0 0 1 564,570 H220 A30,30 0 0 1 190,540 V100 A30,30 0 0 1 220,70 Z', { 'stroke-width': 5, fill: '#fff' });
const mWin = mk(mS, 'rect', { x: 232, y: 104, width: 320, height: 120, rx: 12, fill: C.ac3, stroke: '#CBD0DA', 'stroke-width': 2 });
const mLcd = lcd(mS, 262, 126, 4, 50, 76, 22, { th: 10 });
const KC = [392, 360], KA = [-90, -45, 0, 45, 90], KL = ['V⎓', 'V~', 'A⎓', 'A~', 'Ω'];
const mKnob = mk(mS, 'circle', { cx: KC[0], cy: KC[1], r: 62, fill: C.soft, stroke: INK, 'stroke-width': 4 });
const mPtr = mk(mS, 'line', { x1: KC[0], y1: KC[1], x2: KC[0], y2: KC[1] - 54, stroke: AM, 'stroke-width': 7, 'stroke-linecap': 'round' });
const mPtrW = wrapG(mPtr);
const mKl = KL.map((s, i) => { const a = KA[i] * Math.PI / 180; return mono(mS, KC[0] + 96 * Math.sin(a), KC[1] - 96 * Math.cos(a) + 8, s, { 'text-anchor': 'middle', 'font-size': 24, fill: INK, 'font-weight': 600 }); });
const JX = [272, 392, 512], mJ = JX.map((x, i) => mk(mS, 'circle', { cx: x, cy: 500, r: 18, fill: i === 1 ? INK : '#fff', stroke: INK, 'stroke-width': 4 }));
const mJl = ['A', 'COM', 'VΩ'].map((s, i) => mono(mS, JX[i], 466, s, { 'text-anchor': 'middle', 'font-size': 18, fill: INK, 'font-weight': 600 }));
const mLeadB = W(mS, 'M392,518 C392,590 220,560 120,590', { 'stroke-width': 7 }), mLeadR = W(mS, 'M512,518 C512,590 600,560 690,590', { 'stroke-width': 7, stroke: AM });
const mLl = [mono(mS, 120, 560, 'black · COM', { 'font-size': 17, fill: INK }), mono(mS, 690, 560, 'probe', { 'font-size': 17, 'text-anchor': 'end', fill: '#B7791F' })];
const fnT = [...$('#mR').querySelectorAll('.fn')];
// knob position follows the words: voltage -> V, current -> A, resistance -> Ω, AC -> V~, DC -> V
const kSeq = () => [[wt('M1', 'voltage'), 0], [wt('M1', 'current'), 2], [wt('M1', 'resistance'), 4], [wt('M1', 'AC'), 1], [wt('M1', 'DC'), 0], [wt('M2', 'range') , 0]];
const LCDF = ['5.00', '230.', '0.25', '0.10', '1.50'];

/* ================= N: analogue inside ================= */
const nS = $('#nS'), nL = $('#nL');
const nSw = div(nL, 'left:232px;top:76px;width:320px;height:64px;border-radius:14px;background:#16213E;color:#fff;display:flex;align-items:center;justify-content:center;font:600 22px IBM Plex Mono;letter-spacing:.08em', 'RANGE SWITCH');
const NCH = [['Shunts', 'ammeter'], ['Multipliers', 'voltmeter'], ['Rectifier', 'for AC'], ['Cell', 'for ohms']];
const nCh = NCH.map(([a, b], i) => div(nL, `left:${40 + i * 180}px;top:196px;width:164px;height:88px;border-radius:14px;background:${C.soft};border:2.5px solid ${C.soft};box-sizing:border-box;text-align:center`, `<div style="font:700 24px Poppins;margin-top:12px">${a}</div><div style="font:500 18px IBM Plex Mono;color:${MU};margin-top:2px">${b}</div>`));
const nLn = [...NCH.map((_, i) => W(nS, `M392,140 V168 H${122 + i * 180} V196`, { 'stroke-width': 3 })), ...NCH.map((_, i) => W(nS, `M${122 + i * 180},284 V312 H392 V340`, { 'stroke-width': 3 }))];
const nDial = dial(nS, 392, 580, 210, ['0', '2', '4', '6', '8', '10'], { lr: 40, fs: 18, a0: -50, a1: 50 });
const nDl = mono(nS, 40, 572, 'ONE MOVING COIL METER', { 'font-size': 16, 'font-weight': 600 });
const tCh = [wt('N2', 'shunts'), wt('N2', 'multipliers'), wt('N2', 'rectifier'), wt('N2', 'cell')];
const nSt = [
  [K(`S = \\dfrac{1}{\\textcolor{${VI}}{I_{fs}}}`), 'ohms per volt', 84],
  [K(`S = \\dfrac{1}{50\\times10^{-6}\\,\\text{A}} = 20\\,000\\ \\Omega/\\text{V}`), '', 200],
  [K(`R_m = S\\times\\text{range} = 200\\,\\text{k}\\Omega`), '10 V range', 344]];
$('#nSteps').innerHTML = nSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const nRows = [...$('#nSteps').children];
const JOBS = [['Ammeter', 'shunt in parallel'], ['Voltmeter', 'multiplier in series'], ['AC', 'rectifier before the coil'], ['Ohms', 'a cell inside']];
const nJob = JOBS.map(([a, b], i) => div($('#nR'), `left:32px;top:${76 + i * 100}px;width:720px;height:84px;border-radius:14px;background:${C.soft};display:flex;align-items:center;gap:20px;padding:0 24px;box-sizing:border-box`, `<span style="font:700 28px Poppins;width:170px">${a}</span><span style="font:500 24px Poppins;color:${C.ink2}">${b}</span>`));
const nRL0 = div($('#nR'), 'left:36px;top:28px;font:600 18px IBM Plex Mono;letter-spacing:.08em;color:#6B7280', 'ONE NEEDLE, FOUR JOBS');
const nPill = div($('#nR'), 'left:36px;top:470px', '<span class="pillp good" style="position:static">Higher ohms per volt = less loading</span>');
const tNs = [wt('N4', 'sensitivity'), wt('N4', 'fifty'), wt('N4', 'twenty') + 0.9];

/* ================= G: digital chain ================= */
const gS = $('#gS'), gC = $('#gC');
const BL = [['1 · INPUT STAGE', 'Scale down', 'range and attenuator'], ['2 · CONVERTERS', 'Make it DC', 'every quantity → volts'], ['3 · ADC', 'Volts to number', 'analogue to digital'], ['4 · COUNTER', 'Count + decode', 'drives the segments'], ['5 · DISPLAY', 'Show digits', 'read directly']];
const BX = BL.map((_, i) => 24 + i * 320);
$('#gB').innerHTML = BL.map(([k, n, d], i) => `<div class="blk" style="left:${BX[i]}px"><div class="k">${k}</div><div class="nm">${n}</div><div class="d">${d}</div></div>`).join('');
const gBl = [...$('#gB').children];
const gAr = BX.slice(0, 4).map(x => PUC.arrow(gS, INK, 4, 14));
const gIn = W(gS, '', { stroke: CH1, 'stroke-width': 4 }), gIn2 = W(gS, '', { stroke: AM, 'stroke-width': 4 });
const gCv = [['AC → rectify', 0], ['I → known R', 1], ['R → known I', 2]].map(([s, j]) => div(gC, `left:${BX[1] + 20}px;top:${276 + j * 54}px`, `<span class="cv" style="position:static">${s}</span>`));
const gDc = W(gS, '', { stroke: AM, 'stroke-width': 4 });
const gStair = W(gS, '', { stroke: AM, 'stroke-width': 4 });
const gNum = div(gC, `left:${BX[3] + 30}px;top:300px;font:600 46px IBM Plex Mono;color:${C.ink};letter-spacing:.12em`, '4975');
const gLcdBg = mk(gS, 'rect', { x: BX[4] + 6, y: 276, width: 260, height: 110, rx: 10, fill: C.ac3, stroke: '#CBD0DA', 'stroke-width': 2 });
const gLg = mk(gS, 'g'), gLcd = lcd(gLg, BX[4] + 22, 292, 4, 40, 70, 20, { th: 9 });
const gCap = [mono(gS, BX[0] + 136, 430, 'probe signal', { 'text-anchor': 'middle', 'font-size': 17 }), mono(gS, BX[2] + 136, 430, 'steps of a count', { 'text-anchor': 'middle', 'font-size': 17 }), mono(gS, BX[3] + 136, 430, 'a number', { 'text-anchor': 'middle', 'font-size': 17 }), mono(gS, BX[4] + 136, 430, 'volts, shown', { 'text-anchor': 'middle', 'font-size': 17 })];
const tGb = [wt('G2', 'input'), wt('G3', 'Converters'), wt('G4', 'analogue'), wt('G5', 'counter'), wt('G5', 'display')];
const avG = PUC.avatar($('#sG'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the digits come from a count!' });

/* ================= B: breadboard loading ================= */
const ck = $('#ckS');
const bW = [W(ck, 'M140,282 V120 H440 V160'), W(ck, zigV(440, 160, 260, 16, 5)), W(ck, 'M440,260 V340'), W(ck, zigV(440, 340, 440, 16, 5)), W(ck, 'M440,440 V480 H140 V318')];
const bBat = [W(ck, 'M105,282 H175', { 'stroke-width': 5 }), W(ck, 'M122,318 H158', { 'stroke-width': 9 })];
const bNd = [mk(ck, 'circle', { cx: 440, cy: 300, r: 7, fill: INK }), mk(ck, 'circle', { cx: 440, cy: 480, r: 7, fill: INK })];
const bMw = [W(ck, 'M440,300 H660 V344'), W(ck, 'M660,436 V480 H440')];
const bMc = mk(ck, 'circle', { cx: 660, cy: 390, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }), bMl = tx(ck, 660, 401, 'V', { 'text-anchor': 'middle', 'font-size': 32, 'font-style': 'italic' });
const bMt = [tx(ck, 724, 382, 'Analogue'), mono(ck, 724, 410, 'Rm = 200 kΩ')], bMt2 = [tx(ck, 724, 382, 'Digital'), mono(ck, 724, 410, 'Rm = 10 MΩ')];
const bLab = [tx(ck, 48, 278, '+', { 'font-size': 28 }), tx(ck, 52, 336, '-', { 'font-size': 30 }), tx(ck, 190, 296, '10 V', { fill: TE }),
  tx(ck, 476, 218, 'R1'), mono(ck, 476, 246, '100 kΩ'), tx(ck, 476, 398, 'R2'), mono(ck, 476, 426, '100 kΩ')];
const bVb = W(ck, 'M404,340 H392 V440 H404', { stroke: TE, 'stroke-width': 3 }), bVt = tx(ck, 360, 400, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 28 });
const skB = (x, y) => Math.abs(x - 440) < 3 && ((y > 156 && y < 264) || (y > 336 && y < 444));
const f1 = flow(ck, [[140, 318], [140, 480], [440, 480]], 12), f2 = flow(ck, [[440, 480], [440, 300]], 5, { skip: skB }), f3 = flow(ck, [[440, 480], [660, 480], [660, 300], [440, 300]], 15, { skip: (x, y) => Math.hypot(x - 660, y - 390) < 50 }), f4 = flow(ck, [[440, 300], [440, 120], [140, 120], [140, 282]], 16, { skip: skB });
const tAn = wt('B3', 'Connect'), tDig = wt('B5', 'Swap'), tB2 = T0('B2');
const uA = t => t < tAn + 0.3 ? 0 : M.spring(t - tAn - 0.3, M.SOFT), uD = t => t < tDig + 0.3 ? 0 : M.spring(t - tDig - 0.3, M.SOFT);
const ST = [[50, 50, 0, 5], [60, 40, 20, 4], [50.25, 49.75, 0.4975, 4.975]];
const stv = (t, k) => M.lerp(M.lerp(ST[0][k], ST[1][k], uA(t)), ST[2][k], uD(t));
const VPXu = 2.6; // px per second per microampere (slow-motion view)
const SCb = scope($('#scS'), 592, 200), trV = SCb.tr(CH1);
const Vy = v => 186 - (v - 3) * 64;
const sLb = SCb.lab(14, 24, 'CH1 · V ACROSS R2', CH1);
const tru = mk($('#scS'), 'line', { x1: 6, y1: Vy(5), x2: 586, y2: Vy(5), stroke: TE, 'stroke-width': 2, 'stroke-dasharray': '8 8' }), truL = SCb.lab(470, Vy(5) - 10, 'TRUE 5 V', '#5CC2C2');
const fourL = mk($('#scS'), 'line', { x1: 6, y1: Vy(4), x2: 586, y2: Vy(4), stroke: '#3A4A70', 'stroke-width': 2, 'stroke-dasharray': '4 8' }), fourT = SCb.lab(530, Vy(4) + 22, '4 V', '#7C8BAE');
$('#bRo').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="bV" style="color:${TE}">5.00</span><span class="u">V</span>
  <span class="k n">METER</span><span class="v" id="bM">NONE</span><span class="u"></span>
  <span class="k" style="color:${VI}">I<sub>m</sub></span><span class="v" id="bI" style="color:${VI}">0.0</span><span class="u">µA</span>`;

/* ================= W: worked numbers ================= */
const bars = [...$('#sW').querySelectorAll('.res svg')].map((s, i) => { mk(s, 'rect', { x: 0, y: 4, width: 640, height: 32, rx: 10, fill: '#E3E6EC' }); const f = mk(s, 'rect', { x: 0, y: 4, width: 0, height: 32, rx: 10, fill: TE }); mk(s, 'line', { x1: 640, y1: 0, x2: 640, y2: 40, stroke: INK, 'stroke-width': 3 }); return f; });
const wSt = [
  [K(`100\\,\\text{k}\\Omega \\parallel 200\\,\\text{k}\\Omega = 66.7\\,\\text{k}\\Omega`), '', 80],
  [K(`\\textcolor{${TE}}{V} = 10\\times\\dfrac{66.7}{166.7} = 4.0\\,\\text{V}`), 'analogue', 175],
  [K(`100\\,\\text{k}\\Omega \\parallel 10\\,\\text{M}\\Omega \\approx 99.0\\,\\text{k}\\Omega`), '', 340],
  [K(`\\textcolor{${TE}}{V} = 10\\times\\dfrac{99.0}{199.0} = 4.975\\,\\text{V}`), 'digital', 453]];
$('#wSteps').innerHTML = wSt.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRows = [...$('#wSteps').children];
const tWs = [wt('W2', 'One'), wt('W3', 'So'), wt('W4', 'With'), wt('W4', 'reading')];

/* ================= K: compare ================= */
const KR = [['', 'ANALOGUE', 'DIGITAL'], ['DISPLAY', 'Moving needle', 'Digits, read directly'], ['BATTERY', 'Not needed for V and A', 'Needed'], ['READING ERROR', 'Parallax at an angle', 'Flicker if the value changes'],
  ['ACCURACY', 'Lower', 'Higher'], ['INPUT RESISTANCE', 'Lower (20 kΩ/V on a 50 µA movement)', 'Very high (typically 10 MΩ)'], ['RANGE', 'Picked by hand', 'Often picked automatically']];
$('#kRows').innerHTML = KR.map((r, i) => `<div class="kr${i ? '' : ' hd'}" style="top:${66 + i * 47}px;${i % 2 ? 'background:#F5F6F9' : ''}"><span class="a">${r[0]}</span><span>${r[1]}</span><span>${r[2]}</span></div>`).join('');
const kRw = [...$('#kRows').children];
const kS = $('#kS'), kLcd = lcd(kS, 0, 8, 4, 50, 80, 26, { th: 10 });
const tKr = () => [T0('K1'), wt('K2', 'needle'), wt('K2', 'battery'), wt('K3', 'parallax'), wt('K4', 'accurate'), wt('K4', 'input'), wt('K4', 'range')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A voltmeter never changes the circuit', right: 'Its resistance loads the circuit', y0: 96, y1: 184 });
const tcS = $('#tcS');
const TB = [['TRUE', 5, INK], ['ANALOGUE', 4, C.red], ['DIGITAL', 4.975, C.ok]];
const tcB = TB.map(([n, v, c], i) => { const y = 86 + i * 66; const l = mono(tcS, 32, y + 24, n, { fill: INK, 'font-weight': 600, 'font-size': 18 }); const bg = mk(tcS, 'rect', { x: 180, y, width: 440, height: 34, rx: 10, fill: '#EEF0F4' }); const b = mk(tcS, 'rect', { x: 180, y, width: 0, height: 34, rx: 10, fill: TE }); const vt = mono(tcS, 640, y + 26, `${v === 5 ? '5.00' : v.toFixed(v === 4 ? 2 : 3)} V`, { fill: TE, 'font-weight': 600, 'font-size': 22 }); return [l, bg, b, vt, v]; });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Boards: compare analogue and digital meters · JEE: what a real voltmeter reads' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Two 20&nbsp;kΩ resistors are in series across 12&nbsp;V. A voltmeter of resistance 20&nbsp;kΩ is connected across one of them. What does it read?', qW: 780,
  opts: [K('6\\,\\text{V}'), K('4\\,\\text{V}'), K('3\\,\\text{V}'), K('8\\,\\text{V}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`20 \\parallel 20 = 10\\,\\text{k}\\Omega`)], [K(`\\textcolor{${VI}}{I} = \\dfrac{12}{30\\,\\text{k}\\Omega} = 0.4\\,\\text{mA}`)],
  [K(`\\textcolor{${TE}}{V} = 0.4\\,\\text{mA}\\times10\\,\\text{k}\\Omega`)], [K(`\\textcolor{${TE}}{V} = 4\\,\\text{V}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A3', 'The'), wt('A4', 'The'), wt('A4', 'That')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 236, w: 1100, h: 500, y0: 88, dy: 118, title: 'Multimeters · formula card', txt: [0, 1, 1, 1],
  lines: [K(`S = \\dfrac{1}{\\textcolor{${VI}}{I_{fs}}}\\ \\ (\\Omega/\\text{V}) \\qquad R_m = S\\times\\text{range}`),
    'Loading: the meter\'s resistance in parallel pulls the reading down',
    'Digital: input stage → converters → ADC → counter → display',
    '3½ digits: shows up to 1999 · the half digit is 0 or 1'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 21', topic: 'The dual-channel oscilloscope', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.3, tT - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tM + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tM - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.draw(hA[0], t, tMorph + 0.5, 0.5); drawSeq(hAd.parts, t, tMorph + 0.7, 0.12, 0.01); fadeAt([...hAd.lt, hAd.nd, hAd.pv, hLb[0]], t, tMorph + 0.8, 0.03);
    hAd.set(t < tH1 ? 0 : 0.4 * M.spring(t - tH1, M.SOFT));
    M.draw(hD[0], t, tH2 - 0.6, 0.5); M.vis(hD[1], t, tH2 - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(hLb[1], t, tH2 - 0.2, 1e9, { dy: 0, fade: 0.2 });
    hLcd.set(t < tH2 + 0.2 ? '   ' : '4.97'); M.vis(hLg, t, tH2 - 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#thC'), t, tH1 - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#thN'), t, wt('H1', 'four') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    drawSeq(tDial.parts, t, tH1, 0.1, 0.01); fadeAt([...tDial.lt, tDial.nd, tDial.pv], t, tH1 + 0.2, 0.03); tDial.set(t < wt('H1', 'four') ? 0 : 0.4 * M.spring(t - wt('H1', 'four'), M.SOFT));
    M.vis($('#nwC'), t, tH2 - 0.1, out, { dy: 36, ...o }); M.vis($('#nwN'), t, wt('H2', 'four') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    M.vis($('#nwQ'), t, wt('H2', 'Which') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* M: overview */
  const mOn = t >= tM - 0.05 && t < tN + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tN - 0.32;
    M.vis($('#mL'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(mBody, t, tM + 0.3, 0.7); M.vis(mWin, t, tM + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(mKnob, t, tM + 0.7, 1e9, { dy: 0, sc: 0.8, fade: 0.2 }); M.vis(mPtr, t, tM + 0.8, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(mKl, t, tM + 0.8, 0.05); fadeAt([...mJ, ...mJl], t, tM + 1.0, 0.05);
    let k = 0, kt = -1, kp = 0; for (const [a, i] of kSeq()) if (t >= a - 0.1) { kp = k; k = i; kt = a - 0.1; }
    const ang = kt < 0 ? KA[0] : M.lerp(KA[kp], KA[k], M.spring(t - kt, M.SNAP)); PUC.attr(mPtrW, 'transform', `rotate(${ang.toFixed(2)} ${KC[0]} ${KC[1]})`);
    mLcd.set(t < wt('M1', 'voltage') - 0.1 ? '    ' : LCDF[k]);
    fnT.forEach((f, i) => { M.vis(f, t, tM + 0.5 + i * 0.08, 1e9, { dy: 20 }); const on = (t >= wt('M1', 'voltage') - 0.1 && i === k) ? 1 : 0; f.style.background = on ? C.ac2 : C.soft; f.style.borderLeft = on ? `8px solid ${AM}` : ''; f.querySelector('.nm').style.color = on ? INK : C.ink2; });
    M.draw(mLeadB, t, wt('M2', 'probes') - 0.1, 0.5); M.draw(mLeadR, t, wt('M2', 'probes') + 0.1, 0.5); fadeAt(mLl, t, wt('M2', 'black'), 0.2);
  }

  /* N: analogue inside */
  const nOn = t >= tN - 0.05 && t < tG + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tG - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, tN + 0.25, out, { dx: 60, dy: 0, ...o }); const tSw = tNs[0] - 0.4;
    M.vis(nRL0, t, tN + 0.4, tSw, { dy: 10, outDur: 0.25 }); M.vis($('#nR > .lbl'), t, tSw + 0.3, 1e9, { dy: 10 });
    nJob.forEach((j, i) => { M.vis(j, t, tCh[i] - 0.15, tSw, { dx: -20, dy: 0, outDur: 0.25, ody: -10 }); const u = M.io((t - tCh[i]) / 0.25) * (1 - M.io((t - (tCh[i + 1] ?? T0('N3'))) / 0.25)); j.style.background = M.mix(C.soft, C.ac2, u); });
    drawSeq(nDial.parts, t, tN + 0.3, 0.12, 0.01); fadeAt([...nDial.lt, nDial.nd, nDial.pv, nDl], t, tN + 0.5, 0.03);
    M.vis(nSw, t, wt('N2', 'switch') - 0.1, 1e9, { dy: 16 });
    nCh.forEach((c, i) => { M.vis(c, t, tCh[i] - 0.15, 1e9, { dy: 16 }); const u = M.io((t - tCh[i]) / 0.25) * (1 - M.io((t - (tCh[i + 1] ?? T0('N3'))) / 0.25)); c.style.background = M.mix(C.soft, C.ac2, u); c.style.borderColor = M.mix(C.soft, AM, u); M.draw(nLn[i], t, tCh[i] - 0.2, 0.3); M.draw(nLn[i + 4], t, tCh[i], 0.3); });
    nDial.set(t < wt('N3', 'needle') ? 0 : 0.62 * M.spring(t - wt('N3', 'needle'), M.SOFT));
    nRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tNs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tNs[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tNs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tNs[i] - 0.15); });
    M.vis($('#nBox'), t, tNs[1] + 0.8, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis(nPill, t, tNs[2] + 0.6, 1e9, { dy: 12 });
  }

  /* G: digital chain */
  const gOn = t >= tG - 0.05 && t < tB + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tB - 0.32;
    M.vis(gC, t, tG + 0.1, out, { dy: 36, ...o });
    gBl.forEach((b, i) => { M.vis(b, t, tG + 0.4 + i * 0.1, 1e9, { dy: 20 }); const u = M.io((t - tGb[i]) / 0.25) * (i < 4 ? 1 - 0.6 * M.io((t - tGb[i + 1]) / 0.3) : 1); b.style.background = M.mix(C.soft, C.ac2, u); b.style.borderColor = M.mix(C.soft, AM, u); b.querySelector('.nm').style.color = M.mix(C.ink2, INK, u); });
    gAr.forEach((a, i) => { const u = M.io((t - tGb[i + 1] + 0.35) / 0.3); const x1 = BX[i] + 278, x2 = BX[i + 1] - 6; a.set(x1, 171, x1 + (x2 - x1) * u, 171); if (u <= 0) M.hide(a.g, true); });
    // what the signal looks like after each block
    const ph = t * 2 * Math.PI * 0.6; let d1 = '', d2 = '';
    for (let i = 0; i <= 60; i++) { const x = BX[0] + 16 + 240 * i / 60; d1 += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (340 - 56 * Math.sin(i / 60 * 4 * Math.PI - ph)).toFixed(1); d2 += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (340 - 14 * Math.sin(i / 60 * 4 * Math.PI - ph)).toFixed(1); }
    PUC.attr(gIn, 'd', d1); PUC.attr(gIn2, 'd', d2);
    const sc = M.io((t - tGb[0] - 0.4) / 0.6); M.vis(gIn, t, tGb[0] - 0.4, 1e9, { dy: 0, fade: 0.2 }); gIn.style.opacity = (1 - sc).toFixed(3); M.hide(gIn2, sc <= 0); gIn2.style.opacity = sc.toFixed(3);
    gCv.forEach((c, i) => M.vis(c, t, wt('G3', ['AC', 'Current', 'resistor'][i]) - 0.1, 1e9, { dx: -16, dy: 0 }));
    let st = ''; for (let i = 0; i <= 10; i++) { const x = BX[2] + 26 + 22 * i, y = 386 - i * 8; st += (i ? `H${x}V${y}` : `M${x},${y}`); } st += `H${BX[2] + 258}`;
    PUC.attr(gStair, 'd', st); M.draw(gStair, t, tGb[2] + 0.3, 0.8);
    M.vis(gNum, t, tGb[3] + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(gLcdBg, t, tGb[4] - 0.3, 1e9, { dy: 0, fade: 0.2 }); gLcd.set(t < tGb[4] ? '    ' : '4.975'); M.vis(gLg, t, tGb[4] - 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis(gCap[0], t, tGb[0], 1e9, { dy: 0, fade: 0.2 }); M.vis(gCap[1], t, tGb[2] + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(gCap[2], t, tGb[3] + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(gCap[3], t, tGb[4] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#gZ'), t, wt('G5', 'input') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avG(t, wt('G5', 'typically') + 0.4, out);
  }

  /* B: breadboard loading */
  const bOn = t >= tB - 0.05 && t < tW + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tW - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    drawSeq(bW, t, tB2 - 0.2, 0.35, 0.14); drawSeq(bBat, t, tB2, 0.25, 0.1); fadeAt([...bLab, ...bNd], t, tB2 + 0.3, 0.06);
    M.draw(bVb, t, wt('B2', 'five') - 0.2, 0.4); M.vis(bVt, t, wt('B2', 'five'), 1e9, { dy: 0, fade: 0.2 });
    // meter branch: analogue first, then swapped for the digital one
    const swp = t >= tDig - 0.15 && t < tDig + 0.35;
    drawSeq(bMw, t, tAn - 0.1, 0.35, 0.15); M.vis(bMc, t, tAn, 1e9, { dy: 0, fade: 0.2 }); M.vis(bMl, t, tAn + 0.1, 1e9, { dy: 0, fade: 0.2 });
    if (swp) { bMc.style.opacity = '0.25'; bMl.style.opacity = '0.25'; }
    bMt.forEach(e => M.vis(e, t, tAn + 0.2, tDig - 0.15, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 })); bMt2.forEach(e => M.vis(e, t, tDig + 0.3, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ckE'), t, tB2 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const run = t >= tB2 + 0.5, a0 = tB2 + 0.5;
    const oT = VPXu * integ(τ => stv(τ, 0), a0, t), oR = VPXu * integ(τ => stv(τ, 1), a0, t), oM = VPXu * integ(τ => τ < tAn + 0.3 ? 0 : stv(τ, 2), a0, t);
    f1.set(oT, run); f4.set(oT, run); f2.set(oR, run); f3.set(oM, t >= tAn + 0.3);
    trV(τ => 186 - Vy(stv(τ, 3)), t, tB + 0.3, 6, 186, t >= tB + 0.3); M.vis(sLb, t, tB + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.vis(tru, t, tB2 + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(truL, t, tB2 + 0.7, 1e9, { dy: 0, fade: 0.2 }); M.vis(fourL, t, wt('B4', 'four'), 1e9, { dy: 0, fade: 0.2 }); M.vis(fourT, t, wt('B4', 'four'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#bRo'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#bV'), stv(t, 3).toFixed(t >= tDig ? 3 : 2)); M.setT($('#bM'), t < tAn ? 'NONE' : t < tDig ? '200 kΩ' : '10 MΩ'); M.setT($('#bI'), (t < tAn + 0.3 ? 0 : stv(t, 2)).toFixed(1));
  }

  /* W: worked numbers */
  const wOn = t >= tW - 0.05 && t < tT + 0.05; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wL'), t, tW + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#wR'), t, tW + 0.25, 1e9, { dx: 60, dy: 0 });
    M.vis($('#w1'), t, tWs[1] + 1.2, 1e9, { dy: 20 }); M.vis($('#w2'), t, tWs[3] + 1.0, 1e9, { dy: 20 });
    PUC.attr(bars[0], 'width', (640 * 0.8 * M.io((t - tWs[1] - 1.4) / 0.8)).toFixed(1)); PUC.attr(bars[1], 'width', (640 * 0.995 * M.io((t - tWs[3] - 1.2) / 0.8)).toFixed(1));
    M.vis($('#wTag'), t, wt('W5', 'loading') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    wRows.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWs[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWs[i] - 0.15); });
    M.vis($('#wB1'), t, tWs[1] + 0.9, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#wB2'), t, tWs[3] + 0.9, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tK; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tK - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'invisible') - 0.05, { out: tK - 0.35, outDur: 0.25 }); }

  /* K: compare */
  const kOn = t >= tK - 0.05 && t < tX + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kC'), t, tK + 0.1, 1e9, { dy: 36 });
    const tk = tKr(); kRw.forEach((r, i) => M.vis(r, t, tk[i] - 0.1, 1e9, { dx: -24, dy: 0 }));
    // digital downsides light up on K5
    [2, 3].forEach(i => { const c = kRw[i].children[2], u = M.io((t - wt('K5', i === 2 ? 'battery' : 'flicker')) / 0.3); c.style.color = M.mix(INK, C.red, u); });
    M.vis($('#kD'), t, T0('K6') - 0.1, 1e9, { dy: 36 });
    const t6 = wt('K6', 'shows'), n = Math.round(1999 * M.o3((t - t6) / 1.2));
    kLcd.set(t < t6 ? '0000' : String(n).padStart(4, '0'), INK);
    if (t >= wt('K6', 'half')) { const s = String(n).padStart(4, '0'); kLcd.set(s, INK); const u = M.io((t - wt('K6', 'half')) / 0.3); kS.querySelectorAll('rect').forEach((r, i) => { if (i < 7 && r.getAttribute('fill') !== '#E3E6EC') r.setAttribute('fill', M.mix(INK, AM, u)); }); }
    M.vis($('#kT1'), t, t6 + 0.2, 1e9, { dy: 12 }); M.vis($('#kT2'), t, wt('K6', 'half') - 0.1, 1e9, { dy: 12 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'does'), tRight: wt('X3', 'resistance') - 0.1 });
    tcB.forEach(([l, bg, b, vt, v], i) => { const t0 = tX + 0.6 + i * 0.5; fadeAt([l, bg], t, t0 - 0.2); PUC.attr(b, 'width', (440 * v / 5 * M.io((t - t0) / 0.6)).toFixed(1)); M.vis(vt, t, t0 + 0.5, 1e9, { dy: 0, fade: 0.2 }); });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'JEE'), wt('X4', 'PUC')], tType: wt('X4', 'comparing') - 0.1 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.4, tCount, tAns: tAns2 });
    M.vis($('#so'), t, tAns2 + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns2 + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns2);
M.outro({});
})();
