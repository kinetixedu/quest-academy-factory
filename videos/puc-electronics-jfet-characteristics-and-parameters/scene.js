// PUC Electronics Ep 63 - JFET characteristics and parameters ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, R and rho ink; holes hollow orange; scope CH1 #8FA3C8, CH2 amber
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', OR = C.orange || '#D9731A';
const NFILL = '#FDF1D6', PFILL = '#F8E0CC', DEP = '#CDD3DE';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const sub = (e, s, fs = 16) => { const q = mk(e, 'tspan', { 'font-size': fs, dy: 6, 'font-style': 'normal' }); q.textContent = s; return e; };
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const c = (col, s) => `\\textcolor{${col}}{${s}}`;
const VGS = c(TE, 'V_{GS}'), ID = c(VI, 'I_D'), IG = c(VI, 'I_G'), VOFF = c(TE, 'V_{GS(\\text{off})}');

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
      return (f, tNow, tStart, Wn, yMid, on = true, N = 160) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; }
  };
};
/* numbered step rows: [[html, why, y], ...] */
const rows = (host, list) => { host.innerHTML = list.map(([s, w, y]) => `<div class="st2" style="top:${y}px"><div class="n"></div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => e.querySelector('.n').textContent = i + 1); return r; };
const runRows = (rs, t, ts, tout = 1e9) => rs.forEach((r, i) => {
  M.vis(r, t, ts[i] - 0.12, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  if (t < tout) { M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
/* JFET symbol: channel bar, drain (top) and source (bottom) leads, gate with arrow (n channel: points in) */
const jsym = (p, cx, cy, h, pch = false) => {
  const out = [W(p, `M${cx},${cy - h} V${cy + h}`, { 'stroke-width': 6 }), W(p, `M${cx},${cy - h * 0.7} H${cx + 60} V${cy - h - 50}`), W(p, `M${cx},${cy + h * 0.7} H${cx + 60} V${cy + h + 50}`), W(p, `M${cx - 90},${cy} H${cx - 3}`)];
  const ax = pch ? cx - 50 : cx - 8, dir = pch ? -1 : 1;
  out.push(mk(p, 'path', { d: `M${ax},${cy} L${ax - 20 * dir},${cy - 10} L${ax - 20 * dir},${cy + 10} Z`, fill: INK }));
  out.push(mono(p, cx + 74, cy - h - 30, 'D', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(p, cx - 116, cy + 8, 'G', { fill: INK, 'font-weight': 600, 'font-size': 24 }), mono(p, cx + 74, cy + h + 44, 'S', { fill: INK, 'font-weight': 600, 'font-size': 24 }));
  return out;
};
/* cross-section of an n channel JFET bar: n bar, depletion layers (grey), p gate regions top and bottom */
const xsec = (p, x, y, w, h, pw, ph) => {
  const px1 = x + (w - pw) / 2, px2 = px1 + pw;
  const nb = mk(p, 'rect', { x, y, width: w, height: h, fill: NFILL, stroke: INK, 'stroke-width': 3 });
  const dt = mk(p, 'path', { fill: DEP }), db = mk(p, 'path', { fill: DEP });
  const pt = mk(p, 'rect', { x: px1, y: y - ph, width: pw, height: ph, fill: PFILL, stroke: INK, 'stroke-width': 3 });
  const pb = mk(p, 'rect', { x: px1, y: y + h, width: pw, height: ph, fill: PFILL, stroke: INK, 'stroke-width': 3 });
  const holes = [];
  [y - ph / 2, y + h + ph / 2].forEach(yy => [0.12, 0.27, 0.73, 0.88].forEach(f => holes.push(mk(p, 'circle', { cx: px1 + pw * f, cy: yy, r: 6, fill: 'none', stroke: OR, 'stroke-width': 2.5 }))));
  const set = (d, wedge = 0) => { const dl = Math.min(h / 2, d), dr = Math.min(h / 2, d + wedge);
    PUC.attr(dt, 'd', `M${px1},${y} L${px2},${y} L${px2},${(y + dr).toFixed(1)} L${px1},${(y + dl).toFixed(1)} Z`);
    PUC.attr(db, 'd', `M${px1},${y + h} L${px2},${y + h} L${px2},${(y + h - dr).toFixed(1)} L${px1},${(y + h - dl).toFixed(1)} Z`); };
  set(0);
  return { nb, dt, db, pt, pb, holes, set, px1, px2 };
};
const VDS = c(TE, 'V_{DS}'), IDSS = c(VI, 'I_{DSS}'), VP = c(TE, 'V_P'), DV = s => `\\Delta ${s}`;
/* drain characteristic, EXAMPLE FIGURES: I_DSS 10 mA, V_P 4 V (V_GS(off) -4 V); slope k sets r_d */
const isat = g => g <= -4 ? 0 : 10 * (1 + g / 4) ** 2;
const idd = (d, g, k = 0.004) => { const vp = 4 + g; if (vp <= 0) return 0; const s = isat(g); if (d < vp) { const u = d / vp; return s * (2 * u - u * u); } return s * (1 + k * (d - vp)); };

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'slowly') - 0.2;
const tP = T0('P1'), tB = T0('B1'), tG = T0('G1'), tT = T0('T1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S');
const knob = [mk(h1S, 'circle', { cx: 170, cy: 150, r: 66, fill: '#fff', stroke: INK, 'stroke-width': 4 }), mk(h1S, 'circle', { cx: 170, cy: 150, r: 46, fill: C.soft, stroke: INK, 'stroke-width': 2 })];
const kG0 = mk(h1S, 'g', { transform: 'translate(170,150)' }), kG = mk(kG0, 'g'), kR = mk(kG, 'g'); W(kR, 'M0,0 V-40', { 'stroke-width': 6, stroke: AM });
const kT = [0, 3, 6, 9, 12].map((v, i) => { const a = (-135 + 67.5 * i) * Math.PI / 180; return mono(h1S, 170 + 90 * Math.sin(a), 156 - 90 * Math.cos(a), String(v), { 'text-anchor': 'middle', 'font-size': 16 }); });
const tH1 = wt('H1', 'turns'), tH3e = wt('H3', 'same') + 0.6;
const vH = t => 12 * M.clamp((t - tH1) / (tH3e - tH1));
const h2S = $('#h2S');
const hAx = W(h2S, 'M70,70 V244 H740', { 'stroke-width': 2.5 }), hCv = mk(h2S, 'path', { fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round' }), hDot = mk(h2S, 'circle', { r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const hX = v => 70 + 640 * v / 12, hY = i => 244 - 15 * i;
const hL = [mono(h2S, 730, 272, 'voltage', { 'text-anchor': 'end' }), mono(h2S, 86, 94, 'current', { fill: VI, 'font-weight': 600 }), mono(h2S, 150, 150, 'climbs', { fill: INK, 'font-weight': 600 }), mono(h2S, 480, 76, 'flat', { fill: INK, 'font-weight': 600 })];

/* ================= P: hose + inside ================= */
const pS = $('#pS');
const hoseT = mk(pS, 'path', { fill: 'none', stroke: INK, 'stroke-width': 4 }), hoseB = mk(pS, 'path', { fill: 'none', stroke: INK, 'stroke-width': 4 }), hoseW = mk(pS, 'path', { fill: CH1, opacity: 0.5 });
const push = PUC.arrow(pS, INK, 6, 18), pPL = mono(pS, 70, 160, 'push', { fill: INK, 'font-weight': 600 }), pPin = mono(pS, 600, 320, 'pinch', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600 });
const hose = p => { const yT = 190, yB = 270, x0 = 130, x1 = 720, xa = 470, xb = 720, g = 30 * p, xm = 640;
  PUC.attr(hoseT, 'd', `M${x0},${yT} L${xa},${yT} Q${xm},${yT + 2 * g} ${xb},${yT + g * 1.2}`); PUC.attr(hoseB, 'd', `M${x0},${yB} L${xa},${yB} Q${xm},${yB - 2 * g} ${xb},${yB - g * 1.2}`);
  PUC.attr(hoseW, 'd', `M${x0},${yT + 2} L${xa},${yT + 2} Q${xm},${yT + 2 + 2 * g} ${xb},${yT + 2 + g * 1.2} L${xb},${yB - 2 - g * 1.2} Q${xm},${yB - 2 - 2 * g} ${xa},${yB - 2} L${x0},${yB - 2} Z`);
  const q = Math.min(1, p / 0.55); return 0.8 * q * (2 - q); };
const pX = $('#pX'), pXs = xsec(pX, 92, 200, 600, 120, 360, 40);
const pXl = [W(pX, 'M92,260 H40'), W(pX, 'M692,260 H744'), tx(pX, 40, 236, 'S', { 'text-anchor': 'middle' }), tx(pX, 744, 236, 'D', { 'text-anchor': 'middle' }), tx(pX, 392, 152, 'gate', { 'text-anchor': 'middle', 'font-size': 20 })];
const pXe = flow(pX, [[40, 260], [744, 260]], 12, { skip: x => x < 92 || x > 692 });
const pXv = mono(pX, 92, 420, '', { fill: TE, 'font-weight': 600, 'font-size': 26 }), pXi = mono(pX, 692, 420, '', { fill: VI, 'font-weight': 600, 'font-size': 26, 'text-anchor': 'end' });
const pPinch = mk(pX, 'circle', { cx: 632, cy: 260, r: 16, fill: 'none', stroke: C.red, 'stroke-width': 3 });
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= B: breadboard ================= */
const ck = $('#ckS'), bSym = jsym(ck, 330, 300, 60); bSym[6].setAttribute('x', 250); bSym[6].setAttribute('y', 288);
const bW = [W(ck, 'M390,190 V120 H560 V246'), W(ck, 'M560,276 V470 H390 V410'), W(ck, 'M240,300 H130 V372'), W(ck, 'M130,402 V470 H390')];
const bBat = [W(ck, 'M530,250 H590', { 'stroke-width': 5 }), W(ck, 'M544,272 H576', { 'stroke-width': 9 }), W(ck, 'M116,376 H144', { 'stroke-width': 9 }), W(ck, 'M104,398 H156', { 'stroke-width': 5 })];
const bVar = mk(ck, 'g'); W(bVar, 'M520,296 L604,226', { 'stroke-width': 2.5, stroke: TE }); mk(bVar, 'path', { d: 'M604,226 L588,230 L598,242 Z', fill: TE });
const bNode = mk(ck, 'circle', { cx: 390, cy: 470, r: 7, fill: INK });
const bLb = [tx(ck, 600, 270, 'V DD', { fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }), tx(ck, 598, 246, '+', { 'font-size': 24 }), tx(ck, 92, 392, 'V GG', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono', 'font-size': 22 }), tx(ck, 164, 420, '+', { 'font-size': 24 })];
const aID = PUC.arrow(ck, VI, 5, 14), lID = sub(tx(ck, 420, 160, 'I', { fill: VI, 'font-style': 'italic' }), 'D');
const eC = flow(ck, [[560, 276], [560, 470], [390, 470], [390, 342], [330, 342], [330, 258], [390, 258], [390, 120], [560, 120], [560, 246]], 22, { skip: (x, y) => Math.abs(x - 560) < 3 && y > 240 && y < 282 });
$('#ro').innerHTML = `<span class="k" style="color:${TE}">V<sub>GS</sub></span><span class="v" id="rG" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${TE}">V<sub>DS</sub></span><span class="v" id="rD" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>D</sub></span><span class="v" id="rI" style="color:${VI}">0.0</span><span class="u">mA</span>`;
const grS = $('#grS'), gp = PUC.graph(grS, { x: 110, y: 80, w: 740, h: 400, xmax: 15, ymax: 14, xt: [3, 6, 9, 12, 15], yt: [2, 4, 6, 8, 10, 12, 14], xl: 'V DS (V)', yl: 'I D (mA)' });
gp.xlab.setAttribute('fill', TE); gp.ylab.setAttribute('fill', VI);
const reg = [[0, 4, '#EEF0F4', 'OHMIC'], [4, 13, C.ac2, 'SATURATION · CONSTANT CURRENT'], [13, 15, C.redBg || '#FBE6E6', 'BREAKDOWN']].map(([a, b, f, s]) => {
  const r = gp.mk('rect', { x: gp.X(a), y: 82, width: gp.X(b) - gp.X(a), height: 396, fill: f }); grS.insertBefore(r, gp.axes);
  const l = mono(grS, (gp.X(a) + gp.X(b)) / 2, gp.Y(12.9), s, { 'text-anchor': 'middle', 'font-weight': 600, fill: INK, 'font-size': 16 }); return [r, l]; });
const vpL = gp.mk('line', { x1: gp.X(4), y1: gp.Y(0), x2: gp.X(4), y2: gp.Y(11.6), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), vpT = sub(tx(grS, gp.X(4) + 8, gp.Y(0) - 12, 'V', { fill: TE, 'font-size': 20, 'font-style': 'italic' }), 'P = 4 V', 14);
const idL = gp.mk('line', { x1: gp.X(0), y1: gp.Y(10), x2: gp.X(13), y2: gp.Y(10), stroke: VI, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.6 }), idT = sub(tx(grS, gp.X(4.6), gp.Y(10) - 12, 'I', { fill: VI, 'font-size': 20, 'font-style': 'italic' }), 'DSS = 10 mA', 14);
const GS = [0, -1, -2], cv = GS.map(() => gp.curve(VI, 5)), cvL = GS.map((g, i) => mono(grS, gp.X(9.6), gp.Y(isat(g) * (1 + 0.004 * (5.6 - g))) - 12, ['V GS = 0', '−1 V', '−2 V'][i], { fill: TE, 'font-weight': 600, 'font-size': 17 }));
const bdC = gp.curve(C.red, 5), loc = gp.curve(MU, 2.5); const locP = loc; grS.lastChild.setAttribute('stroke-dasharray', '6 6');
const gdot = gp.dot(AM, 11);
const tb3 = wt('B3', 'From'), tb5 = wt('B5', 'four'), tb7 = wt('B7', 'flat'), tb8 = wt('B8', 'sweep'), tb9 = wt('B9', 'About'), tb10 = wt('B10', 'minus'), tb10e = wt('B10', 'Two'), tb11 = wt('B11', 'shoots');
const sw1 = t => t < tb5 ? 4 * M.clamp((t - tb3) / (tb5 - tb3)) : 4 + 8 * M.clamp((t - tb5) / (tb7 - tb5));
const sw2 = t => 12 * M.clamp((t - tb8) / (tb9 - tb8)), sw3 = t => 12 * M.clamp((t - tb10) / (tb10e - tb10));
const st = t => t < tb8 - 0.4 ? [0, sw1(t)] : t < tb10 - 0.4 ? [-M.io((t - tb8 + 0.4) / 0.3), sw2(t)] : [-1 - M.io((t - tb10 + 0.4) / 0.3), sw3(t)];
const offC = t => { let s = 0; const dt = 0.05; for (let x = tb3; x < t; x += dt) { const [g, d] = st(x); s += 7 * idd(d, g) * Math.min(dt, t - x); } return s; };
const avB = PUC.avatar($('#sB'), { x: 870, y: 790, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'More voltage, same current!' });

/* ================= G: transfer characteristic ================= */
const gS = $('#gS'), AX = 760, TX = v => AX + 130 * v, DX = d => AX + 50 * d, GY = i => 440 - 28 * i;
const gAx = [W(gS, `M${TX(-4)},440 H${DX(12.4)}`, { 'stroke-width': 2.5 }), W(gS, `M${AX},440 V90`, { 'stroke-width': 2.5 })];
const gTk = [...[-4, -3, -2, -1].map(v => mono(gS, TX(v), 468, String(v).replace('-', '−'), { 'text-anchor': 'middle', 'font-size': 18 })), ...[4, 8, 12].map(d => mono(gS, DX(d), 468, String(d), { 'text-anchor': 'middle', 'font-size': 18 })), mono(gS, AX, 468, '0', { 'text-anchor': 'middle', 'font-size': 18 })];
const gTkL = [mono(gS, TX(-4) - 30, 446, 'V GS (V)', { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 18 }), mono(gS, DX(12.4) + 12, 446, 'V DS (V)', { fill: TE, 'font-weight': 600, 'font-size': 18 }), mono(gS, AX + 12, 96, 'I D (mA)', { fill: VI, 'font-weight': 600, 'font-size': 18 })];
const G4 = [0, -1, -2, -3];
const gCv = G4.map(g => { const p = mk(gS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4, 'stroke-linecap': 'round' }); let d = ''; for (let i = 0; i <= 60; i++) { const x = 12 * i / 60; d += (i ? 'L' : 'M') + DX(x).toFixed(1) + ',' + GY(idd(x, g)).toFixed(1); } p.setAttribute('d', d); return p; });
const gCvL = G4.map(g => mono(gS, DX(12.4) + 12, GY(idd(12, g)) + 6, g ? `${g} V`.replace('-', '−') : '0 V', { fill: TE, 'font-weight': 600, 'font-size': 17 }));
gCvL[3].setAttribute('y', GY(idd(12, -3)) - 4);
const gLink = G4.map(g => W(gS, `M${DX(8)},${GY(idd(8, g))} H${TX(g)}`, { stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const gFd = G4.map(g => mk(gS, 'circle', { cx: DX(8), cy: GY(idd(8, g)), r: 7, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const gTd = G4.map(g => mk(gS, 'circle', { cx: TX(g), cy: GY(isat(g)), r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const gPar = mk(gS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 5, 'stroke-linecap': 'round' }); { let d = ''; for (let i = 0; i <= 60; i++) { const v = -4 + 4 * i / 60; d += (i ? 'L' : 'M') + TX(v).toFixed(1) + ',' + GY(isat(v)).toFixed(1); } gPar.setAttribute('d', d); }
const gOff = mk(gS, 'circle', { cx: TX(-4), cy: 440, r: 16, fill: 'none', stroke: C.red, 'stroke-width': 3 });
const gT3 = sub(tx(gS, AX - 20, GY(10) - 18, 'I', { fill: VI, 'font-style': 'italic', 'text-anchor': 'end', 'font-size': 26 }), 'DSS = 10 mA', 16), gT4 = sub(tx(gS, TX(-4) + 6, 396, 'V', { fill: TE, 'font-style': 'italic', 'font-size': 26 }), 'GS(off) = −4 V', 16);
$('#gEq').innerHTML = K(`${ID} = ${IDSS}\\left(1 - \\dfrac{${VGS}}{${VP}}\\right)^{2}`);
$('#gNote').innerHTML = `V<sub>P</sub> = V<sub>GS(off)</sub> = −4 V`;

/* ================= D: parameters ================= */
const dS = $('#dS');
const mini = (y0, h) => W(dS, `M90,${y0} V${y0 + h} H740`, { 'stroke-width': 2.5 });
const dAx = [mini(80, 190), mini(340, 190)];
const dDX = d => 90 + 50 * d, dDY = i => 270 - 13 * i, dTX = v => 740 - 150 * (-v), dTY = i => 530 - 17 * i;
const dC1 = mk(dS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4 }), dC2 = mk(dS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4 });
{ let a = '', b = ''; for (let i = 0; i <= 60; i++) { const x = 12.6 * i / 60, v = -4 + 4 * i / 60; a += (i ? 'L' : 'M') + dDX(x).toFixed(1) + ',' + dDY(idd(x, 0, 0.04)).toFixed(1); b += (i ? 'L' : 'M') + dTX(v).toFixed(1) + ',' + dTY(isat(v)).toFixed(1); } dC1.setAttribute('d', a); dC2.setAttribute('d', b); }
const r1 = [6, 11], i1 = r1.map(x => idd(x, 0, 0.04));
const tri1 = [W(dS, `M${dDX(r1[0])},${dDY(i1[0])} H${dDX(r1[1])}`, { stroke: TE, 'stroke-width': 4 }), W(dS, `M${dDX(r1[1])},${dDY(i1[0])} V${dDY(i1[1])}`, { stroke: VI, 'stroke-width': 4 })];
const v2 = [-1.6, -0.6], s2 = 3.75, i2 = v2.map(v => isat(-1) + s2 * (v + 1));
const tan2 = W(dS, `M${dTX(-2)},${dTY(isat(-1) - s2)} L${dTX(-0.2)},${dTY(isat(-1) + 0.8 * s2)}`, { stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const tri2 = [W(dS, `M${dTX(v2[0])},${dTY(i2[0])} H${dTX(v2[1])}`, { stroke: TE, 'stroke-width': 4 }), W(dS, `M${dTX(v2[1])},${dTY(i2[0])} V${dTY(i2[1])}`, { stroke: VI, 'stroke-width': 4 })];
const dL1 = [mono(dS, 100, 76, 'I D against V DS · gate fixed', { fill: INK, 'font-weight': 600 }), mono(dS, 100, 336, 'I D against V GS · V DS fixed', { fill: INK, 'font-weight': 600 })];
const dK = [tx(dS, dDX(8.5), dDY(i1[0]) + 32, 'ΔV DS', { 'text-anchor': 'middle', fill: TE, 'font-size': 20 }), tx(dS, dDX(11) + 12, dDY(i1[0]) - 2, 'ΔI D', { fill: VI, 'font-size': 20 }),
  tx(dS, dTX(-1.1), dTY(i2[0]) + 32, 'ΔV GS', { 'text-anchor': 'middle', fill: TE, 'font-size': 20 }), tx(dS, dTX(-0.6) + 12, dTY((i2[0] + i2[1]) / 2), 'ΔI D', { fill: VI, 'font-size': 20 })];
const dTag = [sub(tx(dS, dDX(7.6), dDY(i1[0]) - 30, 'r', { 'font-size': 32, 'font-style': 'italic', fill: '#B7791F' }), 'd', 20), sub(tx(dS, dTX(-2.6), dTY(6), 'g', { 'font-size': 32, 'font-style': 'italic', fill: '#B7791F' }), 'm', 20)];
const dTagB = dTag.map(e => { const b = e.getBBox ? null : null; return e; });
const dRows = rows($('#dSteps'), [
  [K(`r_d = \\dfrac{${DV(VDS)}}{${DV(ID)}}`), 'gate fixed · ohms', 80],
  [K(`g_m = \\dfrac{${DV(ID)}}{${DV(VGS)}}`), 'V<sub>DS</sub> fixed · siemens (mho)', 176],
  [K(`\\mu = \\dfrac{${DV(VDS)}}{${DV(VGS)}}`), 'I<sub>D</sub> fixed · no unit', 272],
  [K(`\\mu = \\dfrac{${DV(VDS)}}{${DV(ID)}} \\times \\dfrac{${DV(ID)}}{${DV(VGS)}}`), '', 368],
  [K('\\mu = r_d \\times g_m'), 'proved', 482]]);
const tDR = [wt('D2', 'Change'), wt('D4', 'Change'), wt('D6', 'Change'), wt('D9', 'becomes'), wt('D10', 'So')];

/* ================= W: worked example ================= */
$('#wP1').innerHTML = K('r_d = 30\\,\\text{k}\\Omega'); $('#wP2').innerHTML = K('g_m = 3\\,\\text{mS}'); $('#wP3').innerHTML = K('\\mu = 90');
const wRows = rows($('#wSteps'), [
  [K(`r_d = \\dfrac{6\\,\\text{V}}{0.2\\,\\text{mA}} = 30\\,\\text{k}\\Omega`), '', 84],
  [K(`g_m = \\dfrac{0.6\\,\\text{mA}}{0.2\\,\\text{V}} = 3\\,\\text{mS}`), '', 200],
  [K('\\mu = r_d \\times g_m'), '', 314],
  [K('\\mu = 30\\,\\text{k}\\Omega \\times 3\\,\\text{mS} = 90'), '', 404]]);
const tWR = [wt('W4', 'six'), wt('W7', 'zero'), wt('W8', 'Mu'), wt('W8', 'That')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'At pinch-off, I<sub>D</sub> becomes zero', right: 'At pinch-off, I<sub>D</sub> stops rising and stays flat', y0: 96, y1: 184 });
const tcS = $('#tcS'), xX = d => 40 + 46 * d, xY = i => 180 - 13 * i;
const xAx = W(tcS, 'M40,20 V180 H700', { 'stroke-width': 2.5 }), xCv = mk(tcS, 'path', { fill: 'none', stroke: VI, 'stroke-width': 4 });
{ let a = ''; for (let i = 0; i <= 60; i++) { const x = 14 * i / 60; a += (i ? 'L' : 'M') + xX(x).toFixed(1) + ',' + xY(idd(x, 0)).toFixed(1); } xCv.setAttribute('d', a); }
const xP = mk(tcS, 'circle', { cx: xX(4), cy: xY(10), r: 10, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const xL = [mono(tcS, xX(4) + 18, xY(10) + 34, 'pinch-off: still 10 mA', { fill: '#B7791F', 'font-weight': 600 }), mono(tcS, 690, 170, 'zero only at V GS(off)', { 'text-anchor': 'end', fill: C.red, 'font-weight': 600 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw drain and transfer characteristics, define r<sub>d</sub>, g<sub>m</sub>, μ, prove μ = r<sub>d</sub> g<sub>m</sub>, short problems' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A JFET has μ = 300 and r<sub>d</sub> = 100&nbsp;kΩ. With V<sub>DS</sub> fixed, V<sub>GS</sub> changes by 0.1&nbsp;V. What is the change in I<sub>D</sub>?', qW: 780,
  opts: ['0.03 mA', '0.3 mA', '3 mA', '30 mA'], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K('g_m = \\mu / r_d')], [K('g_m = \\dfrac{300}{100\\,\\text{k}\\Omega} = 3\\,\\text{mS}')], [K(`${DV(ID)} = g_m \\, ${DV(VGS)}`)], [K(`= 3\\,\\text{mS} \\times 0.1\\,\\text{V} = 0.3\\,\\text{mA}`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'First'), wt('A3', 'Three'), wt('A4', 'Change'), wt('A5', 'Three')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'JFET characteristics and parameters · formula card', txt: [1, 0, 0, 0, 1],
  lines: ['Ohmic → pinch-off at V<sub>P</sub> → saturation (constant current) → breakdown', K(`${ID} = ${IDSS}\\,(1 - ${VGS}/${VP})^2`), K(`r_d = ${DV(VDS)}/${DV(ID)} \\qquad g_m = ${DV(ID)}/${DV(VGS)}`), K(`\\mu = ${DV(VDS)}/${DV(VGS)} = r_d \\times g_m`),
    '|V<sub>P</sub>| = |V<sub>GS(off)</sub>| · g<sub>m</sub> in siemens (mho) · μ has no unit'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 64', topic: 'MOSFET: enhancement and depletion', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B5', 'drain') - 0.3, 1.06, 1060, 540], [T1('B6'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tB + 0.2, tT - 0.4], [tW + 0.2, tX - 0.32]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GH.find(([a, b]) => t >= a - 0.1 && t < b + 0.4);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1], { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tP + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tP - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#h1C'), t, tH1 - 0.5, out, { dx: 60, dy: 0, ...o }); fadeAt([...knob, kG, ...kT], t, tH1 - 0.3, 0.05);
    const v = vH(t); kR.style.transform = `rotate(${(-135 + 270 * v / 12).toFixed(1)}deg)`; M.setT($('#h1V'), v.toFixed(1) + ' V'); M.vis($('#h1V'), t, tH1 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#h1L'), t, tH1, 1e9, { dy: 10 });
    const t2 = wt('H2', 'current') - 0.4;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); M.draw(hAx, t, t2 + 0.1, 0.4); fadeAt(hL.slice(0, 2), t, t2 + 0.3, 0.1);
    let d = ''; const n = 50; for (let i = 0; i <= n; i++) { const x = v * i / n; d += (i ? 'L' : 'M') + hX(x).toFixed(1) + ',' + hY(idd(x, 0)).toFixed(1); }
    PUC.attr(hCv, 'd', t >= t2 + 0.3 ? d : ''); PUC.attr(hDot, 'cx', hX(v).toFixed(1)); PUC.attr(hDot, 'cy', hY(idd(v, 0)).toFixed(1)); M.hide(hDot, t < t2 + 0.3);
    M.vis(hL[2], t, wt('H2', 'climbs'), 1e9, { dy: 0, fade: 0.2 }); M.vis(hL[3], t, wt('H3', 'stops'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h2T'), t, wt('H3', 'same'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#aPill'), t, wt('H4', 'Why'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: hose + inside */
  const pOn = t >= tP - 0.05 && t < tB + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tB - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P5', 'push') - 0.4, out, { dx: 60, dy: 0, ...o });
    fadeAt([hoseT, hoseB, hoseW], t, tP + 0.3, 0.1);
    const a2 = wt('P2', 'Push'), a3 = wt('P3', 'pinches'), a4 = wt('P4', 'Harder');
    let p = 0.3 * M.io((t - tP - 0.6) / 0.5); p = M.lerp(p, 0.55, M.io((t - a2) / 0.6)); p = M.lerp(p, 0.8, M.io((t - a3) / 0.6)); p = M.lerp(p, 1, M.io((t - a4) / 0.8));
    const fl = hose(t >= a3 - 0.2 ? p : Math.min(p, 0.55) * 0 + (t >= a3 - 0.2 ? p : 0.2 * p));
    push.set(60, 230, 60 + 20 + 40 * p, 230); M.hide(push.g, t < tP + 0.5); M.vis(pPL, t, tP + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(pPin, t, a3, 1e9, { dy: 0, fade: 0.2 });
    const flow2 = t < a3 - 0.2 ? 0.8 * Math.min(1, p / 0.55 * 1.0) * (2 - Math.min(1, p / 0.55)) : fl;
    M.vis($('#pH1'), t, tP + 0.5, 1e9, { dy: 10 }); M.vis($('#pH'), t, tP + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#pF1'), t, tP + 0.6, 1e9, { dy: 10 }); M.vis($('#pF'), t, tP + 0.6, 1e9, { dy: 0, fade: 0.2 });
    $('#pH i').style.width = (480 * p).toFixed(1) + 'px'; $('#pF i').style.width = (480 * flow2).toFixed(1) + 'px';
    // inside the JFET
    const b5 = wt('P5', 'push'), b6 = wt('P6', 'pinches');
    fadeAt([pXs.nb, pXs.pt, pXs.pb, ...pXs.holes, ...pXl], t, b5 - 0.2, 0.02);
    const vd = 4 * M.io((t - wt('P5', 'drain')) / (b6 - wt('P5', 'drain') + 0.4)) + 2 * M.io((t - b6 - 0.6) / 1.2);
    pXs.set(10, Math.min(50, 12.5 * vd)); M.setT(pXv, 'V DS = ' + vd.toFixed(1) + ' V'); M.setT(pXi, 'I D = ' + idd(vd, 0).toFixed(1) + ' mA');
    M.vis(pXv, t, wt('P5', 'drain'), 1e9, { dy: 0, fade: 0.2 }); M.vis(pXi, t, wt('P5', 'drain'), 1e9, { dy: 0, fade: 0.2 });
    pXe.set(80 * (t - b5), t >= wt('P5', 'drain')); M.vis(pPinch, t, b6 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis($('#pT'), t, b6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#pStrip'), t, wt('P6', 'flat') - 0.3, 1e9, { dy: 24 });
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tG + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tG - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gr'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o });
    drawSeq([...bSym.slice(0, 4)], t, tB + 0.4, 0.3, 0.08); fadeAt(bSym.slice(4), t, tB + 0.7, 0.05);
    drawSeq(bW, t, tB + 0.8, 0.4, 0.12); fadeAt([...bBat, bVar, bNode, ...bLb], t, tB + 1.2, 0.05);
    M.vis($('#ro'), t, wt('B2', 'gate'), 1e9, { dy: 12 });
    const [g, d] = st(t), on = t >= tb3, id = on ? idd(d, g) : 0;
    M.setT($('#rG'), (g > -0.05 ? 0 : g).toFixed(1)); M.setT($('#rD'), d.toFixed(1)); M.setT($('#rI'), id.toFixed(1));
    eC.set(offC(t), on && id > 0.05); M.vis($('#ckE'), t, tb3, 1e9, { dy: 0, fade: 0.2 });
    aID.set(432, 196, 432, id > 0.05 ? 196 - 14 - 3 * id : 196); M.hide(lID, !(id > 0.05)); PUC.attr(lID, 'x', 444); PUC.attr(lID, 'y', 186);
    // graph
    reg.forEach(([r, l], i) => { const ti = [wt('B4', 'ohmic'), wt('B7', 'saturation'), tb11][i]; M.vis(r, t, ti - 0.2, 1e9, { dy: 0, fade: 0.3 }); M.vis(l, t, ti, 1e9, { dy: 0, fade: 0.2 }); });
    M.draw(vpL, t, tb5, 0.4); M.vis(vpT, t, wt('B5', 'pinch'), 1e9, { dy: 0, fade: 0.2 }); M.draw(idL, t, wt('B6', 'ten'), 0.5); M.vis(idT, t, wt('B6', 'I'), 1e9, { dy: 0, fade: 0.2 });
    const e = [sw1(t), t >= tb8 - 0.4 ? sw2(t) : 0, t >= tb10 - 0.4 ? sw3(t) : 0];
    GS.forEach((gg, i) => { cv[i](x => [x, idd(x, gg)], 0, t >= [tb3, tb8, tb10][i] ? e[i] : 0, 80); M.vis(cvL[i], t, [tb7, tb9, tb10e][i], 1e9, { dy: 0, fade: 0.2 }); });
    bdC(x => [x, idd(x, 0) + 4 * Math.max(0, (x - 13) / 2) ** 2], 12.6, 12.6 + 2 * M.clamp((t - tb11) / 0.8), 30);
    gdot(d, id, on && t < tb11 - 0.3);
    avB(t, wt('B6', 'stays'), T0('B8') - 0.3);
  }

  /* G: transfer characteristic */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = tT - 0.3;
    M.vis($('#gC'), t, tG + 0.1, out, { dy: 36, ...o });
    drawSeq(gAx, t, tG + 0.3, 0.4, 0.1); fadeAt([...gTk, ...gTkL], t, tG + 0.5, 0.03);
    gCv.forEach((p, i) => M.draw(p, t, tG + 0.6 + i * 0.25, 0.7)); fadeAt(gCvL, t, tG + 1.2, 0.15);
    const tf = wt('G1', 'flat'), tpl = wt('G1', 'plot');
    fadeAt(gFd, t, tf, 0.12); gLink.forEach((l, i) => M.draw(l, t, tpl + i * 0.25, 0.6)); gTd.forEach((d, i) => M.vis(d, t, tpl + 0.5 + i * 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    M.draw(gPar, t, wt('G2', 'transfer'), 1.4);
    M.vis(gT3, t, wt('G3', 'I'), 1e9, { dy: 0, fade: 0.2 }); M.vis(gOff, t, wt('G4', 'minus'), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); M.vis(gT4, t, wt('G4', 'minus'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#gStrip'), t, wt('G5', 'Shockley') - 0.3, 1e9, { dy: 20 }); PUC.write($('#gEq'), t, wt('G6', 'equals'), 1.2); M.vis($('#gNote'), t, wt('G7', 'same'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'That') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: parameters */
  const dOn = t >= tD - 0.05 && t < tW + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tW - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(dAx, t, tD + 0.4, 0.4, 0.2); M.draw(dC1, t, tD + 0.6, 0.8); M.draw(dC2, t, tD + 0.9, 0.8); fadeAt(dL1, t, tD + 0.6, 0.3);
    drawSeq(tri1, t, tDR[0] + 0.2, 0.4, 0.3); fadeAt(dK.slice(0, 2), t, tDR[0] + 0.4, 0.3);
    M.draw(tan2, t, tDR[1] - 0.2, 0.5); drawSeq(tri2, t, tDR[1] + 0.2, 0.4, 0.3); fadeAt(dK.slice(2), t, tDR[1] + 0.4, 0.3);
    runRows(dRows, t, tDR);
    const tf = wt('D10', 'first'), ts = wt('D10', 'second');
    M.vis(dTag[0], t, tf, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(dTag[1], t, ts, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#dBox'), t, tDR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wT1'), t, wt('W2', 'gate') - 0.1, 1e9, { dy: 20 }); M.vis($('#wT2'), t, wt('W5', 'fixed') - 0.2, 1e9, { dy: 20 });
    runRows(wRows, t, tWR);
    M.vis($('#wP1'), t, wt('W4', 'Thirty'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#wP2'), t, wt('W7', 'Three'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#wP3'), t, wt('W8', 'ninety'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#wV'), t, wt('W8', 'ninety') + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#wBox'), t, tWR[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not') - 0.05, tRight: wt('X3', 'pinch') - 0.2 });
    M.draw(xAx, t, tX + 0.4, 0.4); M.draw(xCv, t, tX + 0.6, 0.8);
    M.vis(xP, t, wt('X3', 'stops'), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis(xL[0], t, wt('X3', 'stops') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(xL[1], t, wt('X4', 'zero'), 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Draw') - 0.2 });
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
