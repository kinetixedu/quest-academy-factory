// PUC Electronics Ep 65 - DC load line and operating point ("Breadboard" style, Lab Notebook world)
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
/* npn transistor symbol: circle, base bar, collector and emitter leads (emitter arrow points out) */
const npn = (p, cx, cy, r, s = 1) => {
  const bx = cx - r * 0.42, out = [];
  out.push(mk(p, 'circle', { cx, cy, r, fill: '#fff', stroke: INK, 'stroke-width': 4 }));
  out.push(W(p, `M${bx},${cy - r * 0.56} V${cy + r * 0.56}`, { 'stroke-width': 6 }));
  out.push(W(p, `M${bx},${cy - r * 0.28} L${cx + r * 0.42},${cy - r * 0.9}`));
  out.push(W(p, `M${bx},${cy + r * 0.28} L${cx + r * 0.42},${cy + r * 0.9}`));
  const ex = cx + r * 0.42, ey = cy + r * 0.9, ux = (ex - bx) / Math.hypot(ex - bx, ey - cy - r * 0.28), uy = (ey - cy - r * 0.28) / Math.hypot(ex - bx, ey - cy - r * 0.28), hx = ex - ux * 4, hy = ey - uy * 4, hl = 18 * s;
  out.push(mk(p, 'path', { d: `M${hx},${hy} L${hx - ux * hl - uy * hl * 0.5},${hy - uy * hl + ux * hl * 0.5} L${hx - ux * hl + uy * hl * 0.5},${hy - uy * hl - ux * hl * 0.5} Z`, fill: INK }));
  return out;
};
const VCE = c(TE, 'V_{CE}'), VCC = c(TE, 'V_{CC}'), VBB = c(TE, 'V_{BB}'), VBE = c(TE, 'V_{BE}'), IB = c(VI, 'I_B'), IC = c(VI, 'I_C'), KO = '\\text{k}\\Omega', UA = '\\,\\mu\\text{A}';
/* EXAMPLE FIGURES: V_CC 12 V, R_C 2 kOhm, beta 150, V_BB 3 V */
const icOut = (v, ib) => 150 * ib * 1e-3 * (1 - Math.exp(-v / 0.35)) * (1 + 0.01 * v); // mA, ib in uA
const llV = ic => 12 - 2 * ic;

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'fest') - 0.2;
const tP = T0('P1'), tC = T0('C1'), tD = T0('D1'), tB = T0('B1'), tT = T0('T1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const sine = (x0, x1, y, a, ph, clipT = 1e9, clipB = -1e9, k = 18) => { let d = ''; for (let x = x0; x <= x1; x += 3) { let v = a * Math.sin((x - x0) / k + ph); v = Math.max(clipB, Math.min(clipT, v)); d += (x === x0 ? 'M' : 'L') + x + ',' + (y - v).toFixed(1); } return d; };

/* ================= A: hook ================= */
const h1S = $('#h1S');
const spk = [W(h1S, 'M60,120 H92 L140,80 V220 L92,180 H60 Z', { fill: '#fff' }), W(h1S, 'M170,110 Q196,150 170,190 M196,92 Q236,150 196,208', { 'stroke-width': 3 })];
const hW = mk(h1S, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const hNote = mono(h1S, 470, 248, 'loud parts break up', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600 });
const h2S = $('#h2S'), hsc = mk(h2S, 'g', { transform: 'translate(40,70)' }); scope(hsc, 520, 180);
const hTr = mk(hsc, 'path', { fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const hCut = W(hsc, 'M8,30 H512', { stroke: C.red, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), hCutL = mono(h2S, 580, 106, 'tops cut', { fill: C.red, 'font-weight': 600 });

/* ================= P: swing ================= */
const pS = $('#pS');
const wallL = mk(pS, 'rect', { x: 60, y: 110, width: 30, height: 330, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 }), wallR = mk(pS, 'rect', { x: 694, y: 110, width: 30, height: 330, fill: '#C9CED8', stroke: INK, 'stroke-width': 3 });
const beam = W(pS, 'M90,110 H694', { 'stroke-width': 6 }), ground = W(pS, 'M60,440 H724', { 'stroke-width': 3, stroke: MU });
const swG = mk(pS, 'g'), rope = W(swG, 'M0,0 L0,0', { 'stroke-width': 3 }), seat = mk(swG, 'rect', { x: -30, y: -8, width: 60, height: 16, rx: 6, fill: AM, stroke: INK, 'stroke-width': 3 });
const bang = mono(pS, 130, 470, 'BANG', { fill: C.red, 'font-weight': 600, 'font-size': 26 });
const pLb = mono(pS, 392, 500, '', { 'text-anchor': 'middle', fill: INK, 'font-weight': 600, 'font-size': 22 });
const pX = $('#pX');
const pAx = W(pX, 'M60,250 H724', { stroke: C.line, 'stroke-width': 2 });
const pWv = mk(pX, 'path', { fill: 'none', stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pRest = W(pX, 'M60,250 H724', { stroke: TE, 'stroke-width': 2, 'stroke-dasharray': '8 8' }), pRL = mono(pX, 64, 240, 'resting level', { fill: TE, 'font-weight': 600 });
const pLim = [W(pX, 'M60,110 H724', { stroke: C.red, 'stroke-width': 3 }), W(pX, 'M60,390 H724', { stroke: C.red, 'stroke-width': 3 })], pLimL = [mono(pX, 720, 100, 'top limit', { 'text-anchor': 'end', fill: C.red, 'font-weight': 600 }), mono(pX, 720, 416, 'bottom limit', { 'text-anchor': 'end', fill: C.red, 'font-weight': 600 })];
$('#pZ').innerHTML = M.icon('zap', 32, AM, 2.4);

/* ================= C: circuit ================= */
const ck = $('#ckS'), trC = mk(ck, 'g'); npn(trC, 520, 340, 50, 0.9);
const cW = [W(ck, 'M541,295 V262'), W(ck, 'M541,170 V130 H800 V280'), W(ck, 'M800,310 V470 H541 V385'), W(ck, 'M499,340 H404'), W(ck, 'M296,340 H200 V400'), W(ck, 'M200,430 V470 H541')];
const rC = W(ck, 'M541,262 L527,254 L555,240 L527,226 L555,212 L527,198 L555,184 L541,176 V170'), rB = W(ck, 'M404,340 L396,326 L380,354 L364,326 L348,354 L332,326 L316,354 L304,340 H296');
const cBat = [W(ck, 'M772,284 H828', { 'stroke-width': 5 }), W(ck, 'M786,306 H814', { 'stroke-width': 9 }), W(ck, 'M172,404 H228', { 'stroke-width': 5 }), W(ck, 'M186,426 H214', { 'stroke-width': 9 })];
const cNode = mk(ck, 'circle', { cx: 541, cy: 470, r: 7, fill: INK });
const cLb = [tx(ck, 840, 300, 'V CC', { fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 836, 276, '+', { 'font-size': 24 }), tx(ck, 160, 422, 'V BB', { 'text-anchor': 'end', fill: TE, 'font-family': 'IBM Plex Mono' }), tx(ck, 236, 398, '+', { 'font-size': 24 }),
  sub(tx(ck, 350, 392, 'R', { 'text-anchor': 'middle', 'font-style': 'italic' }), 'B'), sub(tx(ck, 504, 224, 'R', { 'text-anchor': 'end', 'font-style': 'italic' }), 'C'), mono(ck, 420, 300, 'base', { fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(ck, 560, 290, 'C', { fill: INK, 'font-weight': 600 }), mono(ck, 560, 404, 'E', { fill: INK, 'font-weight': 600 })];
const cVce = [W(ck, 'M610,300 V380', { stroke: TE, 'stroke-width': 3 }), sub(tx(ck, 622, 348, 'V', { fill: TE, 'font-style': 'italic' }), 'CE'), mono(ck, 604, 298, '+', { fill: TE, 'font-weight': 600 })];
const aIB = PUC.arrow(ck, VI, 4, 12), aIC = PUC.arrow(ck, VI, 6, 16), lIB = sub(tx(ck, 440, 372, 'I', { fill: VI, 'font-style': 'italic' }), 'B'), lIC = sub(tx(ck, 580, 160, 'I', { fill: VI, 'font-style': 'italic' }), 'C');
const eCC = flow(ck, [[800, 310], [800, 470], [541, 470], [541, 385], [541, 295], [541, 130], [800, 130], [800, 280]], 24, { skip: (x, y) => Math.hypot(x - 520, y - 340) < 54 || (Math.abs(x - 800) < 3 && y > 278 && y < 312) });
const eCB = flow(ck, [[499, 340], [200, 340], [200, 400]], 6, { r: 6, skip: (x) => x > 292 && x < 408 });
$('#roC').innerHTML = `<span class="k" style="color:${TE}">V<sub>BB</sub></span><span class="v" style="color:${TE}">3.0</span><span class="u">V</span>
  <span class="k">R<sub>B</sub></span><span class="v" id="cRB">115</span><span class="u">kΩ</span>
  <span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="cIB" style="color:${VI}">20</span><span class="u">μA</span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="cIC" style="color:${VI}">3.0</span><span class="u">mA</span>
  <span class="k" style="color:${TE}">V<sub>CE</sub></span><span class="v" id="cVC" style="color:${TE}">6.0</span><span class="u">V</span>`;
const tc5 = wt('C5', 'down'), rbC = t => M.lerp(115, 77, M.io((t - tc5) / 0.8));
const ibOf = rb => 2300 / rb; // uA, (3 - 0.7) V / R_B kOhm
const offCC = t => { let s = 0; const dt = 0.05; for (let x = T0('C4'); x < t; x += dt) s += 9 * 0.15 * ibOf(rbC(x)) * Math.min(dt, t - x); return s; };

/* ================= D: load line ================= */
const dS = $('#dS'), gd = PUC.graph(dS, { x: 110, y: 90, w: 600, h: 360, xmax: 13, ymax: 7, xt: [2, 4, 6, 8, 10, 12], yt: [1, 2, 3, 4, 5, 6, 7], xl: 'V CE (V)', yl: 'I C (mA)' });
gd.xlab.setAttribute('fill', TE); gd.ylab.setAttribute('fill', VI); gd.xlab.setAttribute('y', 512);
const dLL = gd.curve(INK, 5), dP1 = gd.mk('circle', { cx: gd.X(12), cy: gd.Y(0), r: 11, fill: AM, stroke: INK, 'stroke-width': 1.5 }), dP2 = gd.mk('circle', { cx: gd.X(0), cy: gd.Y(6), r: 11, fill: AM, stroke: INK, 'stroke-width': 1.5 });
const dP1L = mono(dS, gd.X(12) - 8, gd.Y(0) - 22, 'cut-off (12 V, 0)', { 'text-anchor': 'end', fill: INK, 'font-weight': 600 }), dP2L = mono(dS, gd.X(0) + 22, gd.Y(6) - 14, 'saturation (0, 6 mA)', { fill: INK, 'font-weight': 600 });
const dLLL = mono(dS, gd.X(6.6), gd.Y(3.3) - 16, 'DC LOAD LINE', { fill: '#B7791F', 'font-weight': 600, 'font-size': 22 });
const dRows = rows($('#dSteps'), [
  [K(`${VBB} = ${IB} R_B + ${VBE}`), 'base loop', 84],
  [K(`${IB} = \\dfrac{${VBB} - ${VBE}}{R_B}`), '', 158],
  [K(`${IC} = \\beta\\, ${IB}`), 'current gain', 252],
  [K(`${VCE} = ${VCC} - ${IC} R_C`), 'collector loop', 334],
  [K(`${IC} = 0 \\Rightarrow ${VCE} = ${VCC}`), 'cut-off', 412],
  [K(`${VCE} = 0 \\Rightarrow ${IC} = \\dfrac{${VCC}}{R_C}`), 'saturation', 486]]);
const tDR = [wt('D2', 'equals'), wt('D3', 'equals'), wt('D4', 'equals'), wt('D6', 'equals'), wt('D7', 'twelve'), wt('D8', 'six')];

/* ================= B: Q point + clipping ================= */
const grS = $('#grS'), gp = PUC.graph(grS, { x: 110, y: 80, w: 740, h: 400, xmax: 13, ymax: 8, xt: [2, 4, 6, 8, 10, 12], yt: [2, 4, 6, 8], xl: 'V CE (V)', yl: 'I C (mA)' });
gp.xlab.setAttribute('fill', TE); gp.ylab.setAttribute('fill', VI); gp.xlab.setAttribute('y', 540);
const IBs = [10, 20, 30, 40, 50], oc = IBs.map(ib => { const p = gp.mk('path', { fill: 'none', stroke: '#B9A6EF', 'stroke-width': 3 }); let d = ''; for (let i = 0; i <= 60; i++) { const v = 12.4 * i / 60; d += (i ? 'L' : 'M') + gp.X(v).toFixed(1) + ',' + gp.Y(icOut(v, ib)).toFixed(1); } p.setAttribute('d', d); return p; });
const ocL = IBs.map(ib => mono(grS, gp.X(12.5), gp.Y(icOut(12.4, ib)) + 6, ib + ' μA', { fill: VI, 'font-size': 16, 'font-weight': 600 }));
const ocT = mono(grS, gp.X(12.9), gp.Y(8) + 4, 'I B', { 'text-anchor': 'end', fill: VI, 'font-size': 16, 'font-weight': 600 });
const bLL = gp.mk('line', { x1: gp.X(0), y1: gp.Y(6), x2: gp.X(12), y2: gp.Y(0), stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' });
const bSwing = gp.mk('line', { stroke: AM, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.55 });
const bEnds = [gp.mk('circle', { cx: gp.X(12), cy: gp.Y(0), r: 8, fill: INK }), gp.mk('circle', { cx: gp.X(0), cy: gp.Y(6), r: 8, fill: INK })];
const bEndL = [mono(grS, gp.X(12) - 6, gp.Y(0) - 16, 'cut-off', { 'text-anchor': 'end', fill: INK, 'font-weight': 600, 'font-size': 18 }), mono(grS, gp.X(0) + 16, gp.Y(6) + 26, 'saturation', { fill: INK, 'font-weight': 600, 'font-size': 18 })];
const qDot = gp.mk('circle', { r: 13, fill: AM, stroke: INK, 'stroke-width': 2 }), qL = tx(grS, 0, 0, 'Q', { 'font-size': 26 });
const tb4 = wt('B4', 'signal'), tb6 = wt('B6', 'Move'), tb8 = wt('B8', 'Move'), tb9 = wt('B9', 'keep');
const icq = t => { let q = 3; q = M.lerp(q, 5.4, M.io((t - tb6) / 0.8)); q = M.lerp(q, 0.6, M.io((t - tb8) / 0.8)); q = M.lerp(q, 3, M.io((t - tb9) / 0.8)); return q; };
const sig = t => t < tb4 ? 0 : Math.sin(Math.PI * (t - tb4) / 0.9) * M.io((t - tb4) / 0.6);
const icNow = t => Math.max(0, Math.min(5.95, icq(t) + 2 * sig(t)));
const sc = scope($('#scS'), 592, 184), tr1 = sc.tr(CH1), tr2 = sc.tr(AM);
const scL = [mono($('#scS'), 4, 212, 'CH1 INPUT · SIGNAL', { fill: CH1, 'font-weight': 600, 'font-size': 18 }), mono($('#scS'), 588, 212, 'CH2 OUTPUT V CE · 4 V/div', { fill: '#B7791F', 'font-weight': 600, 'font-size': 18, 'text-anchor': 'end' })];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>CE</sub></span><span class="v" id="rV" style="color:${TE}">6.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I<sub>C</sub></span><span class="v" id="rI" style="color:${VI}">3.0</span><span class="u">mA</span>
  <span class="k" style="color:${VI}">I<sub>B</sub></span><span class="v" id="rB" style="color:${VI}">20</span><span class="u">μA</span>
  <span class="k n">SPOT</span><span class="v" id="rS" style="font-size:26px">MIDDLE</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 1150, y: 790, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Middle = clean sound!' });

/* ================= W: worked example ================= */
$('#wGiven').innerHTML = [K(`${VCC} = 12\\,\\text{V}`), K(`R_C = 2\\,${KO}`), K('\\beta = 150'), K(`${VBB} = 3\\,\\text{V}`), K(`R_B = 115\\,${KO}`)].map(s => `<span class="pillp">${s}</span>`).join('');
const wGiv = [...$('#wGiven').children];
const wS = $('#wS'), gw2 = PUC.graph(wS, { x: 110, y: 230, w: 560, h: 260, xmax: 13, ymax: 7, xt: [3, 6, 9, 12], yt: [3, 6], xl: 'V CE (V)', yl: 'I C (mA)' });
gw2.xlab.setAttribute('fill', TE); gw2.ylab.setAttribute('fill', VI); gw2.xlab.setAttribute('y', 552);
const wLL = gw2.mk('line', { x1: gw2.X(0), y1: gw2.Y(6), x2: gw2.X(12), y2: gw2.Y(0), stroke: INK, 'stroke-width': 4 }), wQ = gw2.dot(AM, 12);
const wG = [gw2.mk('line', { x1: gw2.X(6), y1: gw2.Y(0), x2: gw2.X(6), y2: gw2.Y(3), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' }), gw2.mk('line', { x1: gw2.X(0), y1: gw2.Y(3), x2: gw2.X(6), y2: gw2.Y(3), stroke: MU, 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
const wQL = mono(wS, gw2.X(6) + 18, gw2.Y(3) - 12, 'Q (6 V, 3 mA)', { fill: '#B7791F', 'font-weight': 600, 'font-size': 22 });
const wRows = rows($('#wSteps'), [
  [K(`${IB} = \\dfrac{3 - 0.7}{115\\,${KO}}`), 'base loop', 84],
  [K(`${IB} = 20${UA}`), '', 190],
  [K(`${IC} = 150 \\times 20${UA} = 3\\,\\text{mA}`), '', 270],
  [K(`${VCE} = 12 - 3\\,\\text{mA} \\times 2\\,${KO}`), '', 350],
  [K(`${VCE} = 6\\,\\text{V}`), 'middle of the line', 436]]);
const tWR = [wt('W4', 'I'), wt('W5', 'twenty'), wt('W6', 'I'), wt('W7', 'V'), wt('W8', 'six')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Q near saturation gives a bigger output', right: 'Q in the middle gives the biggest clean swing', y0: 96, y1: 184 });
const tcS = $('#tcS'), xX = v => 40 + 25 * v, xY = i => 180 - 25 * i;
const xAx = W(tcS, 'M40,20 V180 H350', { 'stroke-width': 2.5 }), xLL = W(tcS, `M${xX(0)},${xY(6)} L${xX(12)},${xY(0)}`, { 'stroke-width': 4 });
const xSw = W(tcS, `M${xX(2)},${xY(5)} L${xX(10)},${xY(1)}`, { stroke: AM, 'stroke-width': 12, opacity: 0.55 }), xQ = mk(tcS, 'circle', { cx: xX(6), cy: xY(3), r: 10, fill: AM, stroke: INK, 'stroke-width': 1.5 });
$('#tcP').innerHTML = 'Cut-off: ' + K(`${VCE} = ${VCC}`); $('#tcQ').innerHTML = 'Saturation: ' + K(`${IC} = ${VCC}/R_C`);
PUC.WA = ['JEE MAIN', 'NEET', 'PUC BOARDS', 'CBSE BOARDS', 'ISC BOARDS'];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the DC load line, mark the Q point, find I<sub>B</sub>, I<sub>C</sub> and V<sub>CE</sub>' });

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'V<sub>CC</sub> = 10&nbsp;V, R<sub>C</sub> = 1&nbsp;kΩ, V<sub>BB</sub> = 4.7&nbsp;V, R<sub>B</sub> = 100&nbsp;kΩ, β = 100 (Si). Where is the Q point?', qW: 780,
  opts: ['4 V, 6 mA', '6 V, 0.4 mA', '6 V, 4 mA', '10 V, 4 mA'], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`${IB} = \\dfrac{4.7 - 0.7}{100\\,${KO}} = 40${UA}`)], [K(`${IC} = 100 \\times 40${UA} = 4\\,\\text{mA}`)], [K(`${VCE} = 10 - 4 \\times 1 = 6\\,\\text{V}`)], [K('Q = (6\\,\\text{V},\\ 4\\,\\text{mA})')]], { dy: 116, y0: 100 });
const tSol = [wt('A2', 'I'), wt('A3', 'I'), wt('A4', 'V'), wt('A4', 'Six')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 238, w: 1100, h: 504, y0: 96, dy: 80, title: 'DC load line and operating point · formula card', txt: [0, 0, 0, 1, 1],
  lines: [K(`${IB} = (${VBB} - ${VBE})/R_B \\qquad ${IC} = \\beta\\,${IB}`), K(`${VCE} = ${VCC} - ${IC}\\,R_C`), K(`\\text{Cut-off } (${VCC},\\,0) \\qquad \\text{Saturation } (0,\\ ${VCC}/R_C)`),
    'Q point = quiescent point: the DC resting state with no signal', 'Keep Q near the middle for the biggest clean swing'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 66', topic: 'Voltage divider bias and stability', y: 774 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B7', 'clipping') - 0.6, 1.06, 900, 560], [T1('B7'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GH = [[tC + 0.2, tT - 0.4], [tW + 0.2, tX - 0.32]];

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
    const t1 = wt('H1', 'amplifier') - 0.3;
    M.vis($('#h1C'), t, t1, out, { dx: 60, dy: 0, ...o }); drawSeq(spk, t, t1 + 0.2, 0.4, 0.15);
    const loud = M.io((t - wt('H2', 'loud')) / 0.5), ph = -5 * (t - t1);
    M.vis(hW, t, t1 + 0.5, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(hW, 'd', sine(260, 740, 150, 40 + 30 * loud, ph, 1e9 - loud * 1e9 + 46, -1e9 + loud * 1e9 - 46, 16));
    M.vis(hNote, t, wt('H2', 'harsh'), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#h1T'), t, wt('H2', 'harsh'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const t2 = wt('H3', 'scope') - 0.3;
    M.vis($('#h2C'), t, t2, out, { dx: 60, dy: 0, ...o }); PUC.attr(hTr, 'd', sine(8, 512, 90, 76, -5 * (t - t2), 60, -1e9, 22));
    M.draw(hCut, t, wt('H3', 'sliced'), 0.5); M.vis(hCutL, t, wt('H3', 'sliced') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#h2T'), t, wt('H3', 'flat'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#aPill'), t, wt('H4', 'wrong'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: swing */
  const pOn = t >= tP - 0.05 && t < tC + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tC - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, wt('P6', 'transistor') - 0.4, out, { dx: 60, dy: 0, ...o });
    fadeAt([wallL, wallR, beam, ground], t, tP + 0.3, 0.08);
    const t4 = wt('P4', 'middle'), px = M.lerp(180, 392, M.io((t - t4 + 0.6) / 0.8)), push = t >= wt('P2', 'push') - 0.2;
    const amp = push ? 34 * M.io((t - wt('P2', 'push') + 0.2) / 0.6) : 0, ang = amp * Math.sin(2.6 * (t - tP)) * Math.PI / 180, L = 290;
    let sx = px + L * Math.sin(ang); const lim = 90 + 30; if (sx < lim) sx = lim;
    const sy = 110 + Math.sqrt(Math.max(0, L * L - (sx - px) ** 2));
    PUC.attr(rope, 'd', `M${px},110 L${sx.toFixed(1)},${sy.toFixed(1)}`); swG.style.transform = ''; PUC.attr(seat, 'x', (sx - 30).toFixed(1)); PUC.attr(seat, 'y', (sy - 8).toFixed(1));
    M.vis(swG, t, tP + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const hit = px + L * Math.sin(ang) < lim && t < t4; M.hide(bang, !hit); M.vis($('#pT'), t, wt('P3', 'bangs'), t4, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.2 });
    M.setT(pLb, t >= wt('P5', 'swings') ? 'free both ways' : t >= wt('P3', 'cut') ? 'swing cut off' : ''); M.vis(pLb, t, wt('P3', 'cut'), 1e9, { dy: 0, fade: 0.2 });
    // amplifier analogue
    const t6 = wt('P6', 'transistor'); drawSeq([pAx, ...pLim], t, t6 - 0.2, 0.4, 0.1); fadeAt(pLimL, t, t6, 0.1);
    const mid = t >= wt('P6', 'resting') ? 250 : 340, y0 = M.lerp(340, 250, M.io((t - wt('P6', 'resting')) / 0.6));
    PUC.attr(pRest, 'd', `M60,${y0.toFixed(1)} H724`); PUC.attr(pRL, 'y', (y0 - 10).toFixed(1)); M.vis(pRest, t, t6 + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(pRL, t, t6 + 0.3, 1e9, { dy: 0, fade: 0.2 });
    let d = ''; for (let x = 60; x <= 724; x += 3) { let y = y0 - 110 * Math.sin((x - 60) / 30 - 4 * (t - t6)); y = Math.max(110, Math.min(390, y)); d += (x === 60 ? 'M' : 'L') + x + ',' + y.toFixed(1); }
    PUC.attr(pWv, 'd', d); M.vis(pWv, t, t6 + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pStrip'), t, wt('P6', 'good') - 0.2, 1e9, { dy: 24 });
  }

  /* C: circuit */
  const cOn = t >= tC - 0.05 && t < tD + 0.05; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = tD - 0.32;
    M.vis($('#ck'), t, tC + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#cR'), t, tC + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(trC, t, tC + 0.4, 1e9, { dy: 0, fade: 0.2 }); fadeAt(cLb.slice(6), t, tC + 0.6, 0.1);
    const t2 = wt('C2', 'small'); drawSeq([cW[3], rB, cW[4], cW[5]], t, t2, 0.35, 0.15); fadeAt([cBat[2], cBat[3], cLb[2], cLb[3], cLb[4], cNode], t, t2 + 0.5, 0.08);
    const t3 = wt('C3', 'bigger'); drawSeq([cW[0], rC, cW[1], cW[2]], t, t3, 0.35, 0.15); fadeAt([cBat[0], cBat[1], cLb[0], cLb[1], cLb[5]], t, t3 + 0.5, 0.08);
    const t4 = wt('C4', 'steady'), on = t >= t4, rb = rbC(t), ib = ibOf(rb), ic = 0.15 * ib, vce = 12 - 2 * ic;
    eCC.set(offCC(t), on); eCB.set(-20 * (t - t4) * ib / 20, on); M.vis($('#ckE'), t, t4, 1e9, { dy: 0, fade: 0.2 });
    aIB.set(430, 322, on ? 430 + 10 + ib : 430, 322); aIC.set(578, 176, 578, on ? 176 + 10 + 7 * ic : 176); M.hide(lIB, !on); M.hide(lIC, !on);
    fadeAt(cVce, t, wt('C7', 'V'), 0.1);
    M.vis($('#roC'), t, t4, 1e9, { dy: 12 }); M.setT($('#cRB'), rb.toFixed(0)); M.setT($('#cIB'), ib.toFixed(0)); M.setT($('#cIC'), ic.toFixed(1)); M.setT($('#cVC'), vce.toFixed(1));
    M.vis($('#slL'), t, tc5 - 0.5, 1e9, { dy: 10 }); M.vis($('#sl'), t, tc5 - 0.5, 1e9, { dy: 0, fade: 0.2 }); $('#sl i').style.left = (544 * (rb - 40) / 100).toFixed(1) + 'px';
    M.vis($('#cT'), t, t4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* D: load line derivation */
  const dOn = t >= tD - 0.05 && t < tB + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tB - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    runRows(dRows, t, tDR);
    M.vis(dP1, t, tDR[4] + 0.4, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dP1L, t, tDR[4] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis(dP2, t, tDR[5] + 0.4, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dP2L, t, tDR[5] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const tj = wt('D9', 'Join'); dLL(u => [12 * (1 - u), 6 * u], 0, M.clamp((t - tj) / 1.0), 20); M.vis(dLLL, t, wt('D9', 'load'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dBox'), t, wt('D6', 'straight'), 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* B: Q point + clipping */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tT - 0.32;
    M.vis($('#gr'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, wt('B4', 'signal') - 0.4, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, wt('B2', 'operating') - 0.3, out, { dy: 36, ...o });
    oc.forEach((p, i) => M.draw(p, t, tB + 0.3 + i * 0.1, 0.6)); fadeAt([...ocL, ocT], t, tB + 0.8, 0.05);
    M.draw(bLL, t, tB + 0.6, 0.6); fadeAt([...bEnds, ...bEndL], t, tB + 1.0, 0.1);
    const ic = icNow(t), v = llV(ic), q = icq(t), ib = ic / 0.15;
    PUC.attr(qDot, 'cx', gp.X(v).toFixed(1)); PUC.attr(qDot, 'cy', gp.Y(ic).toFixed(1)); PUC.attr(qL, 'x', (gp.X(v) + 18).toFixed(1)); PUC.attr(qL, 'y', (gp.Y(ic) - 16).toFixed(1));
    const tq = wt('B2', 'Q'); M.vis(qDot, t, tq - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(qL, t, tq, 1e9, { dy: 0, fade: 0.2 });
    const lo = Math.max(0, q - 2), hi = Math.min(5.95, q + 2);
    PUC.attr(bSwing, 'x1', gp.X(llV(lo)).toFixed(1)); PUC.attr(bSwing, 'y1', gp.Y(lo).toFixed(1)); PUC.attr(bSwing, 'x2', gp.X(llV(hi)).toFixed(1)); PUC.attr(bSwing, 'y2', gp.Y(hi).toFixed(1)); M.vis(bSwing, t, tb4, 1e9, { dy: 0, fade: 0.3 });
    // scope: CH1 input, CH2 V_CE output (12 V full scale = 138 px)
    tr1(u => 14 * sig(u), t, tb4 - 0.3, 4, 26, t >= tb4 - 0.3); tr2(u => 11.5 * llV(icNow(u)), t, tb4 - 0.3, 4, 178, t >= tb4 - 0.3); fadeAt(scL, t, tb4, 0.1); M.vis($('#slowT'), t, tb4, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ro1'), t, wt('B2', 'operating'), 1e9, { dy: 12 });
    M.setT($('#rV'), v.toFixed(1)); M.setT($('#rI'), ic.toFixed(1)); M.setT($('#rB'), ib.toFixed(0));
    const spot = q > 4.5 ? 'NEAR SAT.' : q < 1.5 ? 'NEAR CUT-OFF' : 'MIDDLE'; M.setT($('#rS'), spot);
    const clip = t >= tb4 && (q + 2 > 5.95 || q - 2 < 0); M.vis($('#rgT'), t, tb4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.setT($('#rgT'), clip ? 'CLIPPED' : 'CLEAN');
    $('#rgT').style.background = clip ? C.red : INK;
    avB(t, wt('B9', 'biggest'), T1('B9'));
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Q') - 0.15, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tX + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tX - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    const tg = [wt('W2', 'twelve'), wt('W2', 'two'), wt('W2', 'Beta'), wt('W3', 'three'), wt('W3', 'hundred')];
    wGiv.forEach((e, i) => M.vis(e, t, tg[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    M.draw(wLL, t, wt('W2', 'two'), 0.6);
    runRows(wRows, t, tWR);
    const tq = wt('W9', 'Q'); wQ(6, 3, t >= tq - 0.2); M.draw(wG[0], t, tq, 0.4); M.draw(wG[1], t, tq + 0.2, 0.4); M.vis(wQL, t, tq + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#wBox'), t, tWR[4] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X5', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'not') - 0.05, tRight: wt('X3', 'middle') - 0.2 });
    M.draw(xAx, t, tX + 0.4, 0.4); M.draw(xLL, t, tX + 0.6, 0.5); M.vis(xSw, t, wt('X3', 'middle'), 1e9, { dy: 0, fade: 0.3 }); M.vis(xQ, t, wt('X3', 'middle'), 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.1 });
    M.vis($('#tcP'), t, wt('X4', 'ends'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#tcQ'), t, wt('X4', 'only'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('X5', 'Where') - 0.2, tLight: [wt('X5', 'P')], tType: wt('X6', 'Draw') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Where') - 0.4, tCount, tAns });
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
