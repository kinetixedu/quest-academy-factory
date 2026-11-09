// PUC Electronics Ep 62 - JFET construction and working ("Breadboard" style, Lab Notebook world)
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
const dep = v => 8 + 52 * Math.sqrt(Math.min(4, Math.abs(v)) / 4); // depletion depth (px, half channel 60) for V_GS in volts
const idOf = v => v <= -4 ? 0 : 10 * (1 + v / 4) ** 2;              // mA, EXAMPLE FIGURES: I_DSS 10 mA, V_GS(off) -4 V

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'opens') - 0.2;
const tP = T0('P1'), tC = T0('C1'), tB = T0('B1'), tD = T0('D1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const h1S = $('#h1S');
const cap = [mk(h1S, 'circle', { cx: 110, cy: 160, r: 62, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(h1S, 'M70,138 H150 M62,160 H158 M70,182 H150', { 'stroke-width': 2.5, stroke: MU })];
const wv = mk(h1S, 'path', { fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wav = (x0, x1, y, a, ph) => { let d = ''; for (let x = x0; x <= x1; x += 4) d += (x === x0 ? 'M' : 'L') + x + ',' + (y - a * Math.sin((x - x0) / 14 + ph)).toFixed(1); return d; };
const wvL = mono(h1S, 300, 236, 'tiny signal', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 });
const hBox = mk(h1S, 'rect', { x: 500, y: 72, width: 250, height: 184, rx: 14, fill: C.ac3 || '#FEF8EC', stroke: AM, 'stroke-width': 2.5, 'stroke-dasharray': '8 6' });
const hSym = mk(h1S, 'g'); jsym(hSym, 650, 164, 34);
const hL = mono(h1S, 520, 104, 'reads it', { fill: '#B7791F', 'font-weight': 600 });

/* ================= P: hose ================= */
const pS = $('#pS');
const hoseT = mk(pS, 'path', { d: '', fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }), hoseB = mk(pS, 'path', { d: '', fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' });
const hoseW = mk(pS, 'path', { d: '', fill: CH1, opacity: 0.5 });
const handT = mk(pS, 'rect', { x: 330, y: 0, width: 120, height: 44, rx: 18, fill: '#E9C9A8', stroke: INK, 'stroke-width': 3 }), handB = mk(pS, 'rect', { x: 330, y: 0, width: 120, height: 44, rx: 18, fill: '#E9C9A8', stroke: INK, 'stroke-width': 3 });
const outS = mk(pS, 'rect', { x: 700, y: 0, width: 0, height: 0, fill: CH1 });
const pLb = [mono(pS, 390, 112, 'hand presses', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(pS, 120, 340, 'water in', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 }), mono(pS, 640, 340, 'water out', { 'text-anchor': 'middle', fill: '#5F7399', 'font-weight': 600 })];
const hose = sq => { // sq 0..1 squeeze
  const yT = 190, yB = 270, mid = 230, x0 = 60, x1 = 700, xa = 300, xb = 480, g = 38 * sq;
  const top = `M${x0},${yT} L${xa},${yT} Q${(xa + xb) / 2},${yT + 2 * g} ${xb},${yT} L${x1},${yT}`, bot = `M${x0},${yB} L${xa},${yB} Q${(xa + xb) / 2},${yB - 2 * g} ${xb},${yB} L${x1},${yB}`;
  PUC.attr(hoseT, 'd', top); PUC.attr(hoseB, 'd', bot);
  PUC.attr(hoseW, 'd', `M${x0},${yT + 2} L${xa},${yT + 2} Q${(xa + xb) / 2},${yT + 2 + 2 * g} ${xb},${yT + 2} L${x1},${yT + 2} L${x1},${yB - 2} L${xb},${yB - 2} Q${(xa + xb) / 2},${yB - 2 - 2 * g} ${xa},${yB - 2} L${x0},${yB - 2} Z`);
  PUC.attr(handT, 'y', (yT - 44 + g).toFixed(1)); PUC.attr(handB, 'y', (yB - g).toFixed(1));
  const fl = Math.max(0, 1 - sq) ** 1.5; PUC.attr(outS, 'x', (700).toFixed(0)); PUC.attr(outS, 'y', (yT + 4 + 36 * (1 - fl)).toFixed(1)); PUC.attr(outS, 'height', (72 * fl).toFixed(1)); PUC.attr(outS, 'width', fl > 0.01 ? 34 : 0);
  return fl; };
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= C: construction ================= */
const cS = $('#cS'), cX = xsec(cS, 300, 270, 440, 120, 160, 50);
const cLead = [W(cS, 'M300,330 H190'), W(cS, 'M740,330 H850'), W(cS, 'M520,220 V150'), W(cS, 'M520,440 V500')];
const cTerm = [[182, 330], [858, 330], [520, 142]].map(([x, y]) => mk(cS, 'circle', { cx: x, cy: y, r: 8, fill: '#fff', stroke: INK, 'stroke-width': 3 }));
const cLab = [tx(cS, 182, 300, 'S', { 'text-anchor': 'middle', 'font-size': 28 }), tx(cS, 858, 300, 'D', { 'text-anchor': 'middle', 'font-size': 28 }), tx(cS, 548, 152, 'G', { 'font-size': 28 })];
const cLabS = [mono(cS, 182, 378, 'source', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(cS, 858, 378, 'drain', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 }), mono(cS, 548, 108, 'gate', { fill: INK, 'font-weight': 600 }), mono(cS, 540, 494, 'joined to G', { fill: INK, 'font-weight': 600 })];
const cN = mono(cS, 306, 416, 'n CHANNEL', { fill: '#B7791F', 'font-weight': 600, 'font-size': 20 });
const cPl = [tx(cS, 520, 253, 'p', { 'text-anchor': 'middle', 'font-size': 22, fill: OR }), tx(cS, 520, 423, 'p', { 'text-anchor': 'middle', 'font-size': 22, fill: OR })];
const cEl = [[330, 300], [370, 356], [410, 292], [455, 345], [500, 310], [560, 352], [600, 296], [640, 340], [690, 300], [715, 360], [345, 335], [620, 318], [470, 300], [540, 330]].map(([x, y]) => mk(cS, 'circle', { cx: x, cy: y, r: 7, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const aIn = PUC.arrow(cS, AM, 5, 16), aOut = PUC.arrow(cS, AM, 5, 16);
const aInL = mono(cS, 190, 440 - 160, '', {}), jn = [W(cS, `M${cX.px1},270 H${cX.px2}`, { stroke: OR, 'stroke-width': 4, 'stroke-dasharray': '10 8' }), W(cS, `M${cX.px1},390 H${cX.px2}`, { stroke: OR, 'stroke-width': 4, 'stroke-dasharray': '10 8' })];
const jnL = mono(cS, 596, 200, 'p n junctions', { fill: OR, 'font-weight': 600 });
const elIn = mono(cS, 190, 230, 'electrons enter', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 }), elOut = mono(cS, 850, 230, 'electrons leave', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600 });
const cY = $('#cY'), sN = jsym(cY, 170, 280, 80), sP = jsym(cY, 404, 280, 80, true);
const sNL = [tx(cY, 140, 480, 'N CHANNEL', { 'text-anchor': 'middle', 'font-size': 22 }), mono(cY, 140, 512, 'arrow points in', { 'text-anchor': 'middle', fill: INK })];
const sPL = [tx(cY, 384, 480, 'P CHANNEL', { 'text-anchor': 'middle', 'font-size': 22 }), mono(cY, 384, 512, 'arrow points out', { 'text-anchor': 'middle', fill: INK })];
const sDiv = W(cY, 'M264,120 V540', { stroke: C.line, 'stroke-width': 2 });

/* ================= B: breadboard ================= */
const ck = $('#ckS'); ck.setAttribute('viewBox', '-40 0 928 600'); const bX = xsec(ck, 330, 270, 320, 120, 140, 40);
const bW = [W(ck, 'M330,330 H200 V520 H446'), W(ck, 'M476,520 H780 V330 H650'), W(ck, 'M490,230 V176 H200 V226'), W(ck, 'M200,256 V330')];
const bBat = [W(ck, 'M452,500 V540', { 'stroke-width': 9 }), W(ck, 'M470,490 V550', { 'stroke-width': 5 }), W(ck, 'M186,232 H214', { 'stroke-width': 9 }), W(ck, 'M176,250 H224', { 'stroke-width': 5 })];
const bNode = mk(ck, 'circle', { cx: 200, cy: 330, r: 7, fill: INK });
const bLb = [tx(ck, 461, 584, 'V DD', { 'text-anchor': 'middle', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 486, 486, '+', { 'font-size': 26 }), tx(ck, 166, 248, 'V GG', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 232, 272, '+', { 'font-size': 26 }),
  tx(ck, 300, 318, 'S', { 'text-anchor': 'middle' }), tx(ck, 680, 318, 'D', { 'text-anchor': 'middle' }), tx(ck, 508, 206, 'G', {}), mono(ck, 490, 464, 'both p joined to G', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 18 })];
const bPl = [tx(ck, 490, 257, 'p', { 'text-anchor': 'middle', 'font-size': 20, fill: OR }), tx(ck, 490, 418, 'p', { 'text-anchor': 'middle', 'font-size': 20, fill: OR }), mono(ck, 350, 296, 'n', { fill: '#B7791F', 'font-weight': 600, 'font-size': 22 })];
const aID = PUC.arrow(ck, VI, 5, 14), lID = sub(tx(ck, 730, 300, 'I', { fill: VI, 'font-style': 'italic', 'text-anchor': 'middle' }), 'D');
const tPinch = mono(ck, 600, 250, '', { fill: C.red, 'font-weight': 600, 'font-size': 18 });
const eC = flow(ck, [[446, 520], [200, 520], [200, 330], [330, 330], [650, 330], [780, 330], [780, 520], [476, 520]], 30, { skip: (x, y) => (y > 515 && x > 436 && x < 486) });
const bOff = mono(ck, 490, 336, 'CHANNEL CLOSED', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 18 });
const tB2 = wt('B2', 'supply'), tB4 = wt('B4', 'zero'), tS1 = wt('B5', 'minus'), tS2 = wt('B8', 'Minus'), tS4 = wt('B9', 'minus');
const vgs = t => { const st = (a, tt) => a * M.io((t - tt) / 0.4); return t < tS2 - 0.2 ? st(-1, tS1) : t < tS4 - 0.2 ? -1 + st(-1, tS2) : -2 + st(-2, tS4); };
const offC = t => { let s = 0; const dt = 0.05; for (let x = tB4; x < t; x += dt) s += 9 * idOf(vgs(x)) * Math.min(dt, t - x); return s; };
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 V GS · 2 V/div', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 I D · 5 mA/div', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>GS</sub></span><span class="v" id="rV" style="color:${TE}">0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>D</sub></span><span class="v" id="rI" style="color:${VI}">10.0</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>G</sub></span><span class="v" id="rG" style="color:${VI}">≈ 0</span><span class="u">A</span>
  <span class="k n">CHANNEL</span><span class="v" id="rW">100</span><span class="u">%</span>`;
const avB = PUC.avatar($('#sB'), { x: 470, y: 336, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'No gate current, full control!' });

/* ================= D: working in steps ================= */
const dS = $('#dS'), dX = xsec(dS, 162, 140, 460, 120, 200, 40);
const dLb = [tx(dS, 140, 208, 'S', { 'text-anchor': 'middle' }), tx(dS, 646, 208, 'D', { 'text-anchor': 'middle' }), mono(dS, 392, 90, 'gate', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 })];
const dRows = rows($('#dSteps'), [
  [K(`${IG} \\approx 0`), 'gate junction reverse biased', 84],
  [K(`|${VGS}|\\uparrow \\;\\Rightarrow\\; \\text{layers wider}`), '', 176],
  [K('R = \\dfrac{\\rho\\,L}{A}'), 'narrow channel = small A', 252],
  [K(`R\\uparrow \\;\\Rightarrow\\; ${ID}\\downarrow`), 'more R, less current', 364],
  [K(`${VGS} = ${VOFF} \\Rightarrow ${ID} = 0`), 'pinch-off', 458]]);
const tDR = [wt('D2', 'reverse'), wt('D3', 'negative'), wt('D4', 'equals'), wt('D5', 'less'), wt('D6', 'pinches')];

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VGS} = -2\\,\\text{V}`), K(`${IG} = 1\\,\\text{nA}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS'), wSym = jsym(wS, 160, 150, 56), wIG = PUC.arrow(wS, VI, 4, 12);
const wLb = [sub(tx(wS, 84, 132, 'I', { fill: VI, 'font-style': 'italic' }), 'G'), mono(wS, 80, 186, '1 nA', { fill: VI, 'font-weight': 600 }), mono(wS, 20, 290, 'V GS = −2 V', { fill: TE, 'font-weight': 600 })];
$('#wRes').innerHTML = K('R_{in} = 2 \\times 10^{9}\\,\\Omega');
const wRows = rows($('#wSteps'), [
  [K(`R_{in} = \\dfrac{|${VGS}|}{${IG}}`), 'Ohm\'s law at the gate', 84],
  [K('R_{in} = \\dfrac{2\\,\\text{V}}{10^{-9}\\,\\text{A}}'), '', 196],
  [K('R_{in} = 2 \\times 10^{9}\\,\\Omega'), '', 300],
  [K('= 2000\\,\\text{M}\\Omega'), 'huge', 380]]);
const tWR = [wt('W5', 'Input'), wt('W6', 'two'), wt('W7', 'Two'), wt('W7', 'thousand')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Forward bias the gate to turn it on', right: 'Gate-source junction: always reverse biased', y0: 96, y1: 184 });
const tcS = $('#tcS');
const xp = mk(tcS, 'rect', { x: 10, y: 20, width: 120, height: 80, fill: PFILL, stroke: INK, 'stroke-width': 3 }), xn = mk(tcS, 'rect', { x: 130, y: 20, width: 140, height: 80, fill: NFILL, stroke: INK, 'stroke-width': 3 });
const xL = [tx(tcS, 70, 70, 'p · G', { 'text-anchor': 'middle', fill: OR }), tx(tcS, 200, 70, 'n · S', { 'text-anchor': 'middle', fill: '#B7791F' }), W(tcS, 'M70,100 V150 H124 M146,150 H200 V100', { 'stroke-width': 3 }),
  W(tcS, 'M128,136 V164', { 'stroke-width': 7 }), W(tcS, 'M142,128 V172', { 'stroke-width': 4 }), mono(tcS, 104, 192, '−', { fill: INK, 'font-size': 24, 'font-weight': 600 }), mono(tcS, 152, 192, '+', { fill: INK, 'font-size': 24, 'font-weight': 600 })];
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the JFET construction, explain its working, compare JFET and BJT' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An n channel JFET has V<sub>GS(off)</sub> = −4&nbsp;V. The gate voltage changes from −1&nbsp;V to −3&nbsp;V. What happens?', qW: 780,
  opts: ['Layers shrink, ' + K(`${ID}\\uparrow`), 'Layers widen, ' + K(`${ID}\\downarrow`), 'Gate current rises sharply', K(ID) + ' becomes zero'], right: 1, optW: 474, optY: 330, optFs: 26 });
const sol = PUC.solution($('#so'), [[K(`${VGS}: -1 \\to -3\\,\\text{V}`)], [K('\\text{more reverse bias: layers wider}')], [K(`R\\uparrow \\;\\Rightarrow\\; ${ID}\\downarrow`)], [K(`-3\\,\\text{V} \\ne ${VOFF} \\Rightarrow ${ID} \\ne 0`)]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'Minus'), wt('A2', 'layers'), wt('A3', 'channel'), wt('A4', 'But')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'JFET construction and working · formula card', txt: [1, 0, 0, 0, 1],
  lines: ['n bar = channel · S and D at its ends · p regions = gate', K(`${IG} \\approx 0 \\quad \\text{(gate junction reverse biased)}`), K(`R = \\rho L / A \\quad |${VGS}|\\uparrow \\Rightarrow ${ID}\\downarrow`), K(`${VGS} = ${VOFF} \\;\\Rightarrow\\; ${ID} = 0`),
    'FET: unipolar, voltage controlled · BJT: bipolar, current controlled'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 63', topic: 'JFET characteristics and parameters', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B9', 'touch') - 0.4, 1.08, 960, 560], [T1('B10'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tB2 - 0.2, tD - 0.4], [tW + 0.2, tX - 0.32]];

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
    const t1 = wt('H1', 'capsule') - 0.5;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o });
    fadeAt(cap, t, t1 + 0.2, 0.15);
    const tw = wt('H2', 'signal'); M.vis(wv, t, tw - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(wv, 'd', wav(184, 420, 160, 5, -6 * (t - tw))); M.vis(wvL, t, tw + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#h1T'), t, wt('H2', 'weak'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const t3 = wt('H3', 'part'); M.vis(hBox, t, t3 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(hSym, t, t3, 1e9, { dy: 0, fade: 0.2 }); M.vis(hL, t, wt('H3', 'reads'), 1e9, { dy: 0, fade: 0.2 });
    const t2 = wt('H2', 'barely') - 0.3;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#h2a'), t, t2 + 0.2, 1e9, { dy: 10 }); M.vis($('#h2A'), t, t2 + 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#h2A i').style.width = (320 * 0.1 * M.io((t - t2 - 0.4) / 0.5)).toFixed(1) + 'px';
    M.vis($('#h2b'), t, wt('H3', 'without') - 0.2, 1e9, { dy: 10 }); M.vis($('#h2B'), t, wt('H3', 'without') - 0.2, 1e9, { dy: 0, fade: 0.2 }); $('#h2B i').style.width = (t >= wt('H3', 'taking') ? 4 : 0) + 'px';
    M.rise($('#h2X'), t, wt('H3', 'taking') + 0.2);
    M.vis($('#h2T'), t, wt('H4', 'field'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#aPill'), t, wt('H3', 'part') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.setT($('#aPill'), t >= wt('H4', 'field') - 0.1 ? 'Field effect transistor' : 'A tiny part inside');
  }

  /* P: hose + mapping */
  const pOn = t >= tP - 0.05 && t < tC + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tC - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P5', 'same') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(hoseT, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(hoseB, t, tP + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(hoseW, t, tP + 0.5, 1e9, { dy: 0, fade: 0.3 });
    const a2 = wt('P2', 'Squeeze'), a3 = wt('P3', 'hard'), a5 = wt('P5', 'works');
    let sq = 0.45 * M.io((t - a2) / 0.5); if (t >= a3 - 0.2) sq = M.lerp(0.45, 1, M.io((t - a3 + 0.2) / 0.6)); if (t >= a5) sq = M.lerp(1, 0.4, M.io((t - a5) / 0.6)) + 0.12 * Math.sin(3 * (t - a5)) * M.io((t - a5) / 0.6);
    sq = M.clamp(sq); const fl = hose(sq);
    M.vis(handT, t, a2 - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(handB, t, a2 - 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(outS, t, tP + 0.5, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(pLb, t, tP + 0.6, 0.15);
    M.vis($('#pH1'), t, a2 - 0.2, 1e9, { dy: 10 }); M.vis($('#pH'), t, a2 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#pF1'), t, tP + 0.5, 1e9, { dy: 10 }); M.vis($('#pF'), t, tP + 0.5, 1e9, { dy: 0, fade: 0.2 });
    $('#pH i').style.width = (480 * sq).toFixed(1) + 'px'; $('#pF i').style.width = (480 * fl).toFixed(1) + 'px';
    [wt('P5', 'channel'), wt('P6', 'source'), wt('P7', 'gate')].forEach((tt, i) => M.vis($('#pt' + i), t, tt - 0.2, 1e9, { dy: 20 }));
    M.vis($('#pStrip'), t, wt('P8', 'voltage') - 0.2, 1e9, { dy: 24 });
  }

  /* C: construction */
  const cOn = t >= tC - 0.05 && t < tB + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tB - 0.32;
    M.vis($('#cL'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, wt('C9', 'symbol') - 0.3, out, { dx: 60, dy: 0, ...o });
    const c2 = wt('C2', 'bar');
    M.vis(cX.nb, t, c2 - 0.1, 1e9, { dy: 0, fade: 0.3 }); M.vis(cN, t, wt('C2', 'channel') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    cEl.forEach((e, i) => M.vis(e, t, wt('C3', 'extra') + i * 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }));
    const c4 = wt('C4', 'source'), c5 = wt('C5', 'drain');
    M.draw(cLead[0], t, c4 - 0.2, 0.3); M.vis(cTerm[0], t, c4, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLab[0], t, c4, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLabS[0], t, c4 + 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.draw(cLead[1], t, c5 - 0.2, 0.3); M.vis(cTerm[1], t, c5, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLab[1], t, c5, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLabS[1], t, c5 + 0.1, 1e9, { dy: 0, fade: 0.2 });
    const ui = M.io((t - wt('C4', 'Electrons')) / 0.4), uo = M.io((t - wt('C5', 'Electrons')) / 0.4);
    aIn.set(130, 250, 130 + 90 * ui, 250); aOut.set(820, 250, 820 + 90 * uo, 250);
    M.vis(elIn, t, wt('C4', 'Electrons'), 1e9, { dy: 0, fade: 0.2 }); M.vis(elOut, t, wt('C5', 'Electrons'), 1e9, { dy: 0, fade: 0.2 });
    const c6 = wt('C6', 'p');
    M.vis(cX.pt, t, c6 - 0.1, 1e9, { dy: -20 }); M.vis(cX.pb, t, c6 + 0.1, 1e9, { dy: 20 }); fadeAt(cPl, t, c6 + 0.2, 0.15); cX.holes.forEach((h, i) => M.vis(h, t, c6 + 0.3 + i * 0.04, 1e9, { dy: 0, fade: 0.1 }));
    const c7 = wt('C7', 'gate');
    M.draw(cLead[2], t, wt('C7', 'joined') - 0.1, 0.3); M.draw(cLead[3], t, wt('C7', 'joined'), 0.3); M.vis(cTerm[2], t, c7 - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLab[2], t, c7 - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(cLabS[2], t, c7, 1e9, { dy: 0, fade: 0.2 }); M.vis(cLabS[3], t, wt('C7', 'inside'), 1e9, { dy: 0, fade: 0.2 });
    const c8 = wt('C8', 'junctions');
    drawSeq(jn, t, c8 - 0.3, 0.4, 0.15); M.vis(jnL, t, c8, 1e9, { dy: 0, fade: 0.2 });
    cX.set(t >= c8 ? 6 * M.io((t - c8) / 0.4) : 0);
    // symbols
    const c9 = wt('C9', 'symbol'), c10 = wt('C10', 'p');
    drawSeq(sN.slice(0, 4), t, c9, 0.3, 0.08); M.vis(sN[4], t, wt('C9', 'arrow') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); fadeAt(sN.slice(5), t, c9 + 0.4, 0.08); fadeAt(sNL, t, wt('C9', 'means'), 0.15);
    M.draw(sDiv, t, c10 - 0.3, 0.4);
    drawSeq(sP.slice(0, 4), t, c10, 0.3, 0.08); M.vis(sP[4], t, wt('C10', 'arrow') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); fadeAt(sP.slice(5), t, c10 + 0.4, 0.08); fadeAt(sPL, t, wt('C10', 'out'), 0.15);
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tD + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis(bX.nb, t, tB + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis(bX.pt, t, tB + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(bX.pb, t, tB + 0.5, 1e9, { dy: 0, fade: 0.2 }); fadeAt(bX.holes, t, tB + 0.6, 0.02); fadeAt(bPl, t, tB + 0.6, 0.1);
    drawSeq(bW.slice(0, 2), t, tB2 - 0.1, 0.5, 0.2); fadeAt(bBat.slice(0, 2), t, tB2 + 0.3, 0.1);
    const t3 = wt('B3', 'second'); drawSeq(bW.slice(2), t, t3 - 0.1, 0.4, 0.15); fadeAt(bBat.slice(2), t, t3 + 0.3, 0.1); M.vis(bNode, t, t3 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    fadeAt([bLb[0], bLb[1]], t, tB2 + 0.4, 0.1); fadeAt([bLb[2], bLb[3]], t, t3 + 0.4, 0.1); fadeAt(bLb.slice(4), t, tB + 0.6, 0.1);
    M.vis($('#tg'), t, t3, 1e9, { dy: 10 });
    const v = vgs(t), on = t >= tB4, id = idOf(v);
    M.setT($('#tgV'), (v > -0.05 ? '0' : v.toFixed(1)) + ' V');
    bX.set(dep(on ? v : 0), on ? 6 : 0);
    eC.set(offC(t), on && id > 0.01); M.vis($('#ckE'), t, tB4, 1e9, { dy: 0, fade: 0.2 });
    aID.set(764, 306, id > 0.01 && on ? 764 - 20 - 3 * id : 764, 306); M.hide(lID, !(on && id > 0.01));
    PUC.attr(lID, 'x', 738); PUC.attr(lID, 'y', 290);
    M.vis(bOff, t, wt('B9', 'closed') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    const tg9 = wt('B9', 'touch');
    M.vis($('#rgT'), t, tB4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.setT($('#rgT'), t >= tg9 ? 'PINCHED OFF' : v < -0.5 ? 'NARROWER' : 'WIDE OPEN');
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#rV'), (v > -0.05 ? 0 : v).toFixed(1)); M.setT($('#rI'), (on ? id : 0).toFixed(1)); M.setT($('#rW'), String(Math.round(100 * (120 - 2 * dep(on ? v : 0)) / 104)).replace(/^-.*/, '0'));
    // scope
    tr1(u => 11.5 * vgs(u), t, tB4, 4, 30, t >= tB4); tr2(u => 9.2 * idOf(vgs(u)), t, tB4, 4, 176, t >= tB4);
    fadeAt(scL, t, tB4, 0.1);
    avB(t, wt('B11', 'gate') - 0.2, T0('D1') - 0.3);
  }

  /* D: working in steps */
  const dOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tT - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(dX.nb, t, tD + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(dX.pt, t, tD + 0.4, 1e9, { dy: -16 }); M.vis(dX.pb, t, tD + 0.4, 1e9, { dy: 16 }); fadeAt(dX.holes, t, tD + 0.5, 0.02); fadeAt(dLb, t, tD + 0.5, 0.1);
    let d = 8; d = M.lerp(d, 30, M.io((t - tDR[1]) / 0.6)); d = M.lerp(d, 42, M.io((t - tDR[2]) / 0.6)); d = M.lerp(d, 60, M.io((t - tDR[4] + 0.3) / 0.7));
    dX.set(d, 0);
    const opn = (120 - 2 * d) / 104;
    M.vis($('#dR1'), t, tDR[2] - 0.2, 1e9, { dy: 10 }); M.vis($('#dRb'), t, tDR[2] - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#dI1'), t, tDR[3] - 0.2, 1e9, { dy: 10 }); M.vis($('#dIb'), t, tDR[3] - 0.2, 1e9, { dy: 0, fade: 0.2 });
    $('#dRb i').style.width = (440 * Math.min(1, 0.22 / Math.max(opn, 0.001))).toFixed(1) + 'px'; $('#dIb i').style.width = (440 * opn * opn).toFixed(1) + 'px';
    runRows(dRows, t, tDR);
    M.vis($('#dBox'), t, tDR[4] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    M.vis($('#dU'), t, wt('D7', 'unipolar') - 0.2, 1e9, { dy: 20 }); M.vis($('#dB'), t, wt('D8', 'bipolar') - 0.2, 1e9, { dy: 20 });
    $('#dU').style.background = t >= wt('D7', 'unipolar') ? C.ac2 : C.soft;
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'An') - 0.05, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tWR[0] - 0.5, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'minus'), wt('W3', 'nanoampere')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    fadeAt(wSym, t, tW + 0.4, 0.06); M.vis(wLb[2], t, tg[0], 1e9, { dy: 0, fade: 0.2 }); const ug = M.io((t - tg[1] + 0.2) / 0.4); wIG.set(76, 164, 76 + 44 * ug, 164); fadeAt(wLb.slice(0, 2), t, tg[1], 0.1);
    M.vis($('#wN1'), t, wt('W4', 'nanoampere'), 1e9, { dy: 10 }); M.vis($('#wN'), t, wt('W4', 'billionth') - 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.write($('#wN'), t, wt('W4', 'billionth') - 0.1, 0.8);
    M.vis($('#wRl'), t, tWR[2] - 0.1, 1e9, { dy: 10 }); M.vis($('#wRes'), t, tWR[2], 1e9, { dy: 0, sc: 0.9, sp: M.POP, fade: 0.15 });
    runRows(wRows, t, tWR);
    M.vis($('#wV'), t, wt('W8', 'almost') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#wBox'), t, tWR[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'gate') - 0.2 });
    fadeAt([xp, xn, ...xL], t, tX + 0.5, 0.06);
    M.vis($('#tcP'), t, wt('X3', 'reverse') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#tcQ'), t, wt('X4', 'Forward') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Draw') - 0.2 });
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
