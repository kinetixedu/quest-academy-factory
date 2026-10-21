// PUC Electronics Ep 32 - Component symbols and identification ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons amber, current I violet, voltage V teal, Q orange, t and R ink. Symbol modifier marks (arrow, bar, core lines, +) drawn amber.
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', CU = '#B8692E';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const popAt = (els, t, t0, st = 0.1) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));

/* electrons as dots along a polyline at a given offset (px along the path) */
const flow = (svg, pts, n, o = {}) => {
  const seg = []; let L = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], l = Math.hypot(x2 - x1, y2 - y1); seg.push([x1, y1, x2, y2, L, l]); L += l; }
  const g = mk(svg, 'g'), dots = [...Array(n)].map(() => mk(g, 'circle', { r: o.r || 7, fill: o.fill || AM, stroke: INK, 'stroke-width': 1.5 }));
  const at = s => { s = M.clamp(s, 0, L); for (const q of seg) if (s <= q[4] + q[5] + 1e-6) { const u = (s - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return pts[pts.length - 1]; };
  return { g, L, set(off, on = true) { M.hide(g, !on); if (!on) return; dots.forEach((d, k) => { const [x, y] = at((k + 0.5) * L / n + off); PUC.attr(d, 'cx', x.toFixed(1)); PUC.attr(d, 'cy', y.toFixed(1)); }); } };
};
/* oscilloscope screen */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 180) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col }); e.textContent = s; return e; }
  };
};

/* ---------- standard symbols (centre cx, cy). Base strokes ink, modifier marks amber ---------- */
const zig = (cx, cy) => `M${cx - 84},${cy} H${cx - 48} L${cx - 40},${cy - 14} L${cx - 24},${cy + 14} L${cx - 8},${cy - 14} L${cx + 8},${cy + 14} L${cx + 24},${cy - 14} L${cx + 40},${cy + 14} L${cx + 48},${cy} H${cx + 84}`;
const coilP = (cx, cy, r = 12) => `M${cx - 84},${cy} H${cx - 48} a${r},${r} 0 0 1 ${2 * r},0 a${r},${r} 0 0 1 ${2 * r},0 a${r},${r} 0 0 1 ${2 * r},0 a${r},${r} 0 0 1 ${2 * r},0 H${cx + 84}`;
const arrowAcross = (s, cx, cy) => [W(s, `M${cx - 40},${cy + 32} L${cx + 36},${cy - 28}`, { stroke: AM, 'stroke-width': 3.5 }), mk(s, 'path', { d: `M${cx + 44},${cy - 34} L${cx + 24},${cy - 30} L${cx + 34},${cy - 18} Z`, fill: AM })];
const SYM = {
  res: (s, cx, cy) => [W(s, zig(cx, cy))],
  resVar: (s, cx, cy) => [W(s, zig(cx, cy)), ...arrowAcross(s, cx, cy)],
  pot: (s, cx, cy) => [W(s, zig(cx, cy)), W(s, `M${cx},${cy - 50} V${cy - 26}`, { stroke: AM, 'stroke-width': 3.5 }), mk(s, 'path', { d: `M${cx},${cy - 16} L${cx - 9},${cy - 30} L${cx + 9},${cy - 30} Z`, fill: AM })],
  preset: (s, cx, cy) => [W(s, zig(cx, cy)), W(s, `M${cx - 40},${cy + 32} L${cx + 36},${cy - 28} M${cx + 26},${cy - 40} L${cx + 46},${cy - 16}`, { stroke: AM, 'stroke-width': 3.5 })],
  cap: (s, cx, cy) => [W(s, `M${cx - 84},${cy} H${cx - 12} M${cx + 12},${cy} H${cx + 84}`), W(s, `M${cx - 12},${cy - 28} V${cy + 28} M${cx + 12},${cy - 28} V${cy + 28}`, { 'stroke-width': 6 })],
  capPol: (s, cx, cy) => [W(s, `M${cx - 84},${cy} H${cx - 12} M${cx + 6},${cy} H${cx + 84}`), W(s, `M${cx - 12},${cy - 28} V${cy + 28}`, { 'stroke-width': 6 }), W(s, `M${cx + 20},${cy - 28} Q${cx + 4},${cy} ${cx + 20},${cy + 28}`, { 'stroke-width': 5, stroke: AM }), W(s, `M${cx - 36},${cy - 34} h14 M${cx - 29},${cy - 41} v14`, { stroke: AM, 'stroke-width': 3 })],
  capVar: (s, cx, cy) => [...SYM.cap(s, cx, cy), ...arrowAcross(s, cx, cy)],
  trim: (s, cx, cy) => [...SYM.cap(s, cx, cy), W(s, `M${cx - 40},${cy + 32} L${cx + 36},${cy - 28} M${cx + 26},${cy - 40} L${cx + 46},${cy - 16}`, { stroke: AM, 'stroke-width': 3.5 })],
  ind: (s, cx, cy) => [W(s, coilP(cx, cy + 8))],
  indFe: (s, cx, cy) => [W(s, coilP(cx, cy + 8)), W(s, `M${cx - 48},${cy - 14} H${cx + 48} M${cx - 48},${cy - 24} H${cx + 48}`, { stroke: AM, 'stroke-width': 3.5 })],
  indFer: (s, cx, cy) => [W(s, coilP(cx, cy + 8)), W(s, `M${cx - 48},${cy - 14} H${cx + 48} M${cx - 48},${cy - 24} H${cx + 48}`, { stroke: AM, 'stroke-width': 3.5, 'stroke-dasharray': '8 7' })],
  xfmr: (s, cx, cy) => [W(s, `M${cx - 84},${cy - 40} H${cx - 30} a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 H${cx - 84}`),
    W(s, `M${cx + 84},${cy - 40} H${cx + 30} a10,10 0 0 0 0,20 a10,10 0 0 0 0,20 a10,10 0 0 0 0,20 a10,10 0 0 0 0,20 H${cx + 84}`), W(s, `M${cx - 6},${cy - 44} V${cy + 44} M${cx + 6},${cy - 44} V${cy + 44}`, { stroke: AM, 'stroke-width': 3.5 })],
};
/* ---------- real parts (flat drawings) ---------- */
const PART = {
  bead: (s, cx, cy, k = 1) => { const o = mk(s, 'g'), g = mk(o, 'g', { transform: `translate(${cx},${cy}) scale(${k})` });
    W(g, 'M-110,0 H-60 M60,0 H110', { stroke: '#9AA0AC', 'stroke-width': 4 }); mk(g, 'rect', { x: -62, y: -22, width: 124, height: 44, rx: 20, fill: '#E9D8B4', stroke: INK, 'stroke-width': 3 });
    [['#8B5A2B', -36], ['#16213E', -18], [C.red, 0], ['#C9A227', 34]].forEach(([c, x]) => mk(g, 'rect', { x: x - 5, y: -21, width: 10, height: 42, fill: c })); return o; },
  disc: (s, cx, cy, k = 1, code = '104') => { const o = mk(s, 'g'), g = mk(o, 'g', { transform: `translate(${cx},${cy}) scale(${k})` });
    W(g, 'M-14,30 V92 M14,30 V92', { stroke: '#9AA0AC', 'stroke-width': 4 }); mk(g, 'circle', { cx: 0, cy: 0, r: 44, fill: '#E89A3C', stroke: INK, 'stroke-width': 3 });
    const t = mk(g, 'text', { x: 0, y: 9, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-weight': 600, 'font-size': 26, fill: INK }); t.textContent = code; return o; },
  can: (s, cx, cy, k = 1) => { const o = mk(s, 'g'), g = mk(o, 'g', { transform: `translate(${cx},${cy}) scale(${k})` });
    W(g, 'M-14,56 V112 M14,56 V96', { stroke: '#9AA0AC', 'stroke-width': 4 }); mk(g, 'rect', { x: -36, y: -58, width: 72, height: 116, rx: 12, fill: '#3F6FB5', stroke: INK, 'stroke-width': 3 });
    mk(g, 'rect', { x: 14, y: -56, width: 18, height: 112, fill: '#CFE0F5' }); [-34, -6, 22].forEach(y => mk(g, 'rect', { x: 18, y, width: 10, height: 4, fill: INK })); return o; },
  coil: (s, cx, cy, k = 1) => { const o = mk(s, 'g'), g = mk(o, 'g', { transform: `translate(${cx},${cy}) scale(${k})` });
    mk(g, 'circle', { cx: 0, cy: 0, r: 44, fill: 'none', stroke: '#5A6475', 'stroke-width': 22 });
    for (let i = 0; i < 18; i++) { const a = i / 18 * 2 * Math.PI, c = Math.cos(a), sn = Math.sin(a); mk(g, 'line', { x1: (30 * c).toFixed(1), y1: (30 * sn).toFixed(1), x2: (58 * c).toFixed(1), y2: (58 * sn).toFixed(1), stroke: CU, 'stroke-width': 4, 'stroke-linecap': 'round' }); }
    W(g, 'M-20,52 L-30,96 M20,52 L30,96', { stroke: CU, 'stroke-width': 4 }); return o; },
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Inside') - 0.2;
const tS = T0('S1'), tB = T0('B1'), tT = T0('T1'), tP = T0('P1'), tN = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tP], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const pcS = $('#pcS');
const pcb = mk(pcS, 'rect', { x: 20, y: 20, width: 280, height: 380, rx: 16, fill: '#E4EFE2', stroke: INK, 'stroke-width': 4 });
const trc = W(pcS, 'M60,80 H150 V160 H250 M60,240 H120 V320 H250 M200,60 V120', { stroke: '#B9CDB5', 'stroke-width': 5 });
const pcParts = [PART.bead(pcS, 160, 92, 0.5), PART.disc(pcS, 90, 180, 0.55), PART.can(pcS, 230, 220, 0.6), PART.coil(pcS, 110, 320, 0.55), PART.bead(pcS, 200, 330, 0.5), PART.disc(pcS, 240, 120, 0.45)];
const hdS = $('#hdS');
const hdP = [PART.bead(hdS, 130, 150, 0.85), PART.disc(hdS, 330, 140, 0.95), PART.can(hdS, 500, 140, 0.8), PART.coil(hdS, 670, 140, 0.85)];
const hdL = [['striped bead', 130], ['orange disc', 330], ['blue can', 500], ['copper coil', 670]].map(([s, x]) => mono(hdS, x, 262, s, { 'text-anchor': 'middle', 'font-size': 18 }));
const tHd = [wt('H1', 'Striped'), wt('H1', 'orange'), wt('H1', 'blue'), wt('H1', 'coils')];
const dgS = $('#dgS');
const dgSy = [SYM.res(dgS, 150, 150), SYM.cap(dgS, 392, 150), SYM.ind(dgS, 634, 142)];
const dgQ = [271, 513].map(x => tx(dgS, x, 162, '?', { 'text-anchor': 'middle', 'font-size': 40, fill: AM }));
const dgL = mono(dgS, 392, 250, 'just lines and zigzags', { 'text-anchor': 'middle', 'font-size': 18 });

/* ================= S: symbols ================= */
const COLS = [['RESISTORS', [['res', 'Fixed', 'zigzag'], ['resVar', 'Variable', 'arrow across'], ['pot', 'Potentiometer', 'arrow at it · 3 ends'], ['preset', 'Preset', 'bar · set once']]],
  ['CAPACITORS', [['cap', 'Fixed', 'two plates'], ['capPol', 'Electrolytic', '+ and a curved plate'], ['capVar', 'Variable', 'arrow across'], ['trim', 'Trimmer', 'bar · set once']]],
  ['INDUCTORS', [['ind', 'Air core', 'coil of loops'], ['indFe', 'Iron core', 'solid lines'], ['indFer', 'Ferrite core', 'dashed lines'], ['xfmr', 'Transformer', 'two coils, one core']]]];
const RY = [140, 262, 384, 506];
$('#sCards').innerHTML = COLS.map(([h, rows], i) => `<div class="card sC" style="left:${160 + i * 544}px"><div class="lbl" style="left:32px;top:28px">${h}</div><svg width="512" height="600"></svg>${rows.map(([k, n, s], j) => `<div class="sn" style="top:${RY[j] - 34}px">${n}</div><div class="ss" style="top:${RY[j] + 6}px">${s}</div>`).join('')}</div>`).join('');
const sC = [...$('#sCards').children];
const sRows = sC.map((c, i) => { const svg = c.querySelector('svg'), ns = [...c.querySelectorAll('.sn')], ss = [...c.querySelectorAll('.ss')];
  return COLS[i][1].map(([k], j) => { const bg = mk(svg, 'rect', { x: 20, y: RY[j] - 56, width: 472, height: 112, rx: 14, fill: C.ac3, opacity: 0 }); svg.insertBefore(bg, svg.firstChild); return { bg, els: SYM[k](svg, 124, RY[j]), n: ns[j], s: ss[j] }; }); });
const tSym = [[wt('S2', 'resistor'), wt('S3', 'arrow'), wt('S4', 'arrow'), wt('S5', 'bar')],
  [wt('S2', 'capacitor'), wt('S6', 'plus'), wt('S3', 'arrow') + 0.15, wt('S5', 'bar') + 0.15],
  [wt('S2', 'inductor'), wt('S7', 'straight'), wt('S7', 'Dashed'), wt('S7', 'Two')]];

/* ================= B: breadboard (potentiometer volume control) ================= */
const ck = $('#ckS');
const src = [mk(ck, 'circle', { cx: 150, cy: 300, r: 42, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, 'M124,300 C134,276 142,276 150,300 S166,324 176,300', { 'stroke-width': 3.5 })];
const bw = [W(ck, 'M150,258 V150 H470 V196'), W(ck, 'M470,404 V450'), W(ck, 'M780,324 V450 H150 V342')];
const potR = W(ck, 'M470,196 L486,206 L454,226 L486,246 L454,266 L486,286 L454,306 L486,326 L454,346 L486,366 L454,386 L486,396 L470,404');
const wipW = W(ck, '', {}), wipA = mk(ck, 'path', { d: '', fill: AM });
const wipL = W(ck, '', { stroke: AM, 'stroke-width': 4 });
const spk = [W(ck, 'M766,276 H794 V324 H766 Z', { fill: '#fff' }), W(ck, 'M794,282 L826,258 V342 L794,318', { fill: '#fff' })];
const jn = mk(ck, 'circle', { cx: 470, cy: 450, r: 7, fill: INK });
const lb = [tx(ck, 206, 292, 'Music'), mono(ck, 206, 320, 'signal in'), tx(ck, 420, 290, 'Track', { 'text-anchor': 'end' }), mono(ck, 420, 318, '10 kΩ', { 'text-anchor': 'end' }),
  tx(ck, 846, 292, 'Speaker'), mono(ck, 846, 320, 'output')];
const wipT = tx(ck, 640, 0, 'Wiper', { fill: '#B7791F', 'text-anchor': 'middle' });
const yTop = 206, yBot = 394;
const tSl1 = wt('B4', 'Slide'), tSl2 = wt('B5', 'Slide');
const kW = t => { const a = M.io((t - tSl1) / 1.6), b = M.io((t - tSl2) / 1.6); return 0.8 - 0.6 * a + 0.8 * b * 1; };
const kOf = t => Math.min(1, kW(t));
const OMG = 2 * Math.PI * 1.1;
const eIn = flow(ck, [[150, 258], [150, 150], [470, 150], [470, 196]], 9), eIn2 = flow(ck, [[150, 342], [150, 450], [470, 450]], 7);
const eOut = flow(ck, [[660, 150], [780, 150], [780, 276]], 6), eOut2 = flow(ck, [[780, 324], [780, 450], [520, 450]], 6);
const SC = scope($('#scS'), 592, 200);
const trIn = SC.tr(CH1), trOut = SC.tr(AM);
const sLab = [SC.lab(14, 22, 'CH1 · INPUT', CH1), SC.lab(14, 192, 'CH2 · OUTPUT (WIPER)', AM)];
$('#ro1').innerHTML = `<span class="k n">WIPER</span><span class="v" id="rW">80</span><span class="u">%</span>
  <span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" style="color:${TE}">1.00</span><span class="u">V peak</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="rO" style="color:${TE}">0.80</span><span class="u">V peak</span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the volume knob is just a sliding arrow!' });

/* ================= P: identification ================= */
const ID = [['Resistor', 'small bead, coloured bands give the value', 'bead', 'bands = value'], ['Ceramic disc', 'flat disc with a 3-digit code', 'disc', 'code in pF'],
  ['Electrolytic', 'can with a stripe, stripe = minus lead', 'can', 'longer lead = +'], ['Inductor', 'copper wire on a ferrite ring or rod', 'coil', 'coil of wire']];
$('#iTiles').innerHTML = ID.map(([n, e, k, p], i) => `<div class="card iT" style="left:${160 + i * 408}px"><div class="lbl" style="left:28px;top:28px">PART ${i + 1}</div><svg width="376" height="260"></svg><div class="nm">${n}</div><div class="ex">${e}</div><div class="pillp ac">${p}</div></div>`).join('');
const iT = [...$('#iTiles').children], iS = iT.map(e => e.querySelector('svg'));
const iP = [PART.bead(iS[0], 188, 130, 1.25), PART.disc(iS[1], 188, 100, 1.6), PART.can(iS[2], 188, 104, 1.25), PART.coil(iS[3], 188, 104, 1.45)];
const iCall = [W(iS[0], 'M146,176 V214 H230 V176', { stroke: AM, 'stroke-width': 3 }), W(iS[1], 'M270,100 H330', { stroke: AM, 'stroke-width': 3 }),
  W(iS[2], 'M240,40 H320', { stroke: AM, 'stroke-width': 3 }), W(iS[3], 'M250,60 L320,30', { stroke: AM, 'stroke-width': 3 })];
const iLong = [tx(iS[2], 150, 252, '+', { 'text-anchor': 'middle', fill: AM, 'font-size': 26 }), tx(iS[2], 226, 236, '-', { 'text-anchor': 'middle', fill: AM, 'font-size': 30 })];
const tId = [wt('P2', 'resistor'), wt('P3', 'ceramic'), wt('P4', 'electrolytic'), wt('P5', 'inductor')];

/* ================= N: reading the code ================= */
const nS = $('#nS');
const big = mk(nS, 'g');
const bLeg = W(big, 'M362,300 V368 M422,300 V368', { stroke: '#9AA0AC', 'stroke-width': 6 });
const bDisc = mk(big, 'circle', { cx: 392, cy: 196, r: 124, fill: '#E89A3C', stroke: INK, 'stroke-width': 4 });
const dg = [['1', 330], ['0', 392], ['4', 454]].map(([s, x]) => tx(nS, x, 230, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 96, fill: INK }));
const brk = [W(nS, 'M306,262 V276 H416 V262', { stroke: AM, 'stroke-width': 3.5 }), W(nS, 'M432,262 V276 H476 V262', { stroke: OR, 'stroke-width': 3.5 })];
// labels sit below the disc, clear of its legs
const brL = [mono(nS, 210, 402, 'significant figures', { 'text-anchor': 'middle', fill: '#B7791F', 'font-weight': 600, 'font-size': 19 }), mono(nS, 590, 402, 'zeros to add', { 'text-anchor': 'middle', fill: OR, 'font-weight': 600, 'font-size': 19 })];
const brLn = [W(nS, 'M361,282 L250,382', { stroke: AM, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }), W(nS, 'M454,282 L560,382', { stroke: OR, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' })];
const LAD = [['100 000 pF', 40], ['100 nF', 292], ['0.1 µF', 544]];
const lad = LAD.map(([s, x]) => { const g = mk(nS, 'g'); const r = mk(g, 'rect', { x, y: 452, width: 200, height: 76, rx: 14, fill: C.soft, stroke: C.line, 'stroke-width': 2 }); const t2 = tx(g, x + 100, 500, s, { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 26 }); return { g, r, t2 }; });
const ladA = [246, 498].map(x => { const g = mk(nS, 'g'); mono(g, x + 20, 440, '÷1000', { 'text-anchor': 'middle', 'font-size': 16, fill: MU }); W(g, `M${x + 4},490 H${x + 36} M${x + 28},482 L${x + 37},490 L${x + 28},498`, { stroke: MU, 'stroke-width': 3 }); return g; });
const dSteps = [
  ['<b>First two digits</b>', 'significant figures', 96],
  ['<b>Third digit</b> = <i>n</i>', 'add n zeros, × 10<sup>n</sup>', 196],
  [K(`\\text{in pF:}\\;\\; 1\\,\\text{pF} = 10^{-12}\\,\\text{F}`), '', 300],
  [K(`1000\\,\\text{pF} = 1\\,\\text{nF},\\;\\; 1000\\,\\text{nF} = 1\\,\\mu\\text{F}`), '', 444]];
$('#nSteps').innerHTML = dSteps.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx" style="font-family:Poppins;font-weight:500">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const wRows = [
  [K(`104 \\;\\to\\; 10 \\times 10^{4}\\,\\text{pF}`), 'given code', 96],
  [K(`= 100\\,000\\,\\text{pF}`), '', 196],
  [K(`= 100\\,\\text{nF}`), '÷ 1000', 300],
  [K(`= 0.1\\,\\mu\\text{F}`), '÷ 1000 again', 444]];
$('#wSteps').innerHTML = wRows.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const dRows = [...$('#nSteps').children], wR = [...$('#wSteps').querySelectorAll('.st2')];
const tDer = [wt('D2', 'first'), wt('D3', 'third'), wt('D4', 'answer'), wt('D5', 'One')];
const tWr = [wt('W1', 'marked'), wt('W2', 'That'), wt('W3', 'One'), wt('W4', 'Zero')];
const avN = PUC.avatar($('#sN'), { x: 1008, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'One zero four. I see that one everywhere!' });

/* ================= X: exam trap ================= */
const trap = PUC.trap($('#trap'), { wrong: 'An electrolytic fits either way round', right: 'Its + lead goes to the higher voltage', y0: 96, y1: 184 });
const tcS = $('#tcS');
const mini = (ox, ok) => { const g = mk(tcS, 'g');
  const els = [W(g, `M${ox + 80},${ok ? 136 : 172} V96 H${ox + 230} V118`), W(g, `M${ox + 230},${ok ? 210 : 210} V246 H${ox + 80} V${ok ? 172 : 136}`),
    W(g, `M${ox + 52},136 H${ox + 108}`, { 'stroke-width': ok ? 5 : 9 }), W(g, `M${ox + 66},172 H${ox + 94}`, { 'stroke-width': ok ? 9 : 5 })];
  const can = mk(g, 'rect', { x: ox + 204, y: 118, width: 52, height: 92, rx: 10, fill: '#3F6FB5', stroke: INK, 'stroke-width': 3 });
  const stp = mk(g, 'rect', { x: ox + 238, y: 120, width: 14, height: 88, fill: '#CFE0F5' });
  const plus = tx(g, ox + 186, 140, '+', { fill: OR, 'font-size': 26, 'text-anchor': 'middle' });
  const bp = tx(g, ox + 34, ok ? 144 : 180, '+', { 'font-size': 24, 'text-anchor': 'middle' });
  const bulge = W(g, `M${ox + 206},120 Q${ox + 230},86 ${ox + 254},120`, { stroke: C.red, 'stroke-width': 5, fill: C.redBg });
  const mkC = mk(g, 'circle', { cx: ox + 330, cy: 164, r: 22, fill: ok ? C.ok : C.red });
  const ic = W(g, ok ? `M${ox + 320},164 l7,7 l13,-14` : `M${ox + 322},156 l16,16 M${ox + 338},156 l-16,16`, { stroke: '#fff', 'stroke-width': 4 });
  const lab = mono(g, ox + 180, 284, ok ? '+ to +, works' : 'reversed, bulges', { 'text-anchor': 'middle', fill: ok ? '#1F6B3F' : C.red, 'font-weight': 600, 'font-size': 18 });
  return { g, els, can: [can, stp, plus, bp], bulge, mark: [mkC, ic], lab }; };
const mR = mini(16, true), mWr = mini(400, false); M.hide(mR.bulge, true);
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Draw the symbol of a component, identify a component, or decode a capacitor marking' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '27px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A ceramic capacitor is marked <b>223</b>. What is its capacitance?', qW: 780,
  opts: [K('223\\,\\text{pF}'), K('2.2\\,\\text{nF}'), K('0.022\\,\\mu\\text{F}'), K('22\\,\\mu\\text{F}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`22,\\;\\; n = 3`)], [K(`22\\times10^{3} = 22\\,000\\,\\text{pF}`)], [K(`= 22\\,\\text{nF}`)], [K(`= 0.022\\,\\mu\\text{F}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A3', 'That'), wt('A3', 'which'), wt('A4', 'Divide')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 460, y: 248, w: 1000, h: 492, y0: 100, dy: 98, title: 'Symbols and identification · fact card', txt: [1, 1, 0, 0],
  lines: ['Arrow across = variable · arrow at = potentiometer · bar = preset',
    '+ and a curved plate = electrolytic · stripe = minus lead',
    K(`C = (\\text{first two digits}) \\times 10^{n}\\,\\text{pF}`),
    K(`1000\\,\\text{pF} = 1\\,\\text{nF} \\qquad 1000\\,\\text{nF} = 1\\,\\mu\\text{F}`)] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 33', topic: 'Reading component specifications and datasheets', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tS3 = T0('S3'), tS5 = T0('S5');
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B2', 'wiper'), 1.1, 620, 560], [T0('B3') + 0.2, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  M.vis(ghost, t, tB + 0.5, tT - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (t < tB || t >= tT) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tS + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tS - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis(pcb, t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.25 }); M.draw(trc, t, tMorph + 0.8, 0.6);
    popAt(pcParts, t, wt('H1', 'dozens') - 0.1, 0.12);
    M.vis($('#aPill'), t, wt('H1', 'radio') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#thC'), t, tHd[0] - 0.4, out, { dx: 60, dy: 0, ...o });
    hdP.forEach((p, i) => M.vis(p, t, tHd[i] - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 })); hdL.forEach((l, i) => M.vis(l, t, tHd[i] + 0.1, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#nwC'), t, T0('H2') - 0.1, out, { dy: 36, ...o });
    drawSeq(dgSy.flat(), t, wt('H2', 'lines') - 0.1, 0.4, 0.15); fadeAt(dgQ, t, wt('H2', 'match')); M.vis(dgL, t, wt('H2', 'zigzags'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* S: symbols */
  const sOn2 = t >= tS - 0.05 && t < tB + 0.1; M.hide($('#sS'), !sOn2);
  if (sOn2) {
    const out = tB - 0.32;
    sC.forEach((c, i) => M.vis(c, t, tS + 0.15 + i * 0.12, out, { dy: 36, ...o }));
    sRows.forEach((rows, i) => rows.forEach((r, j) => { const a = tSym[i][j];
      drawSeq(r.els.filter(e => e.tagName === 'path' && e.getAttribute('fill') === 'none'), t, a - 0.1, 0.4, 0.15);
      r.els.filter(e => e.getAttribute('fill') !== 'none').forEach(e => M.vis(e, t, a + 0.35, 1e9, { dy: 0, fade: 0.15 }));
      M.vis(r.n, t, a, 1e9, { dx: -12, dy: 0 }); M.vis(r.s, t, a + 0.15, 1e9, { dx: -12, dy: 0 });
      const hl = M.io((t - a) / 0.25) * (1 - M.io((t - a - 2.6) / 0.5)); r.bg.style.opacity = hl.toFixed(3); }));
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.vis($('#ckE'), t, tB + 0.8, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(src, t, tB + 0.4, 0.4, 0.15); drawSeq(bw, t, tB + 0.6, 0.4, 0.15); M.draw(potR, t, wt('B1', 'volume') - 0.3, 0.5); M.vis(jn, t, tB + 1.0, 1e9, { dy: 0, fade: 0.2 });
    drawSeq(spk, t, wt('B2', 'speaker') - 0.3, 0.3, 0.1); fadeAt(lb.slice(0, 2), t, wt('B2', 'music')); fadeAt(lb.slice(2, 4), t, wt('B2', 'track')); fadeAt(lb.slice(4), t, wt('B2', 'speaker'));
    const k = kOf(t), y = yBot - (yBot - yTop) * k, tWp = wt('B2', 'wiper');
    PUC.attr(wipW, 'd', `M540,${y.toFixed(1)} H660 V150 H780 V276`); PUC.attr(wipL, 'd', `M540,${y.toFixed(1)} H502`);
    PUC.attr(wipA, 'd', `M490,${y.toFixed(1)} L508,${(y - 10).toFixed(1)} L508,${(y + 10).toFixed(1)} Z`);
    M.vis(wipW, t, tWp, 1e9, { dy: 0, fade: 0.25 }); M.vis(wipL, t, tWp - 0.1, 1e9, { dy: 0, fade: 0.15 }); M.vis(wipA, t, tWp - 0.1, 1e9, { dy: 0, fade: 0.15 });
    PUC.attr(wipT, 'y', (y + 36).toFixed(1)); PUC.attr(wipT, 'x', '600'); M.vis(wipT, t, tWp + 0.1, 1e9, { dy: 0, fade: 0.2 });
    const on = t >= tWp + 0.3, s = Math.sin(OMG * (t - tB));
    eIn.set(14 * s, t >= tB + 1.2); eIn2.set(-14 * s, t >= tB + 1.2); eOut.set(16 * k * s, on); eOut2.set(-16 * k * s, on);
    PUC.attr(spk[0], 'fill', M.mix('#FFFFFF', AM, on ? k * (0.5 + 0.5 * Math.abs(s)) : 0));
    trIn(τ => 32 * Math.sin(OMG * (τ - tB)), t, tB + 0.9, 3, 58, t >= tB + 0.9);
    trOut(τ => 40 * kOf(τ) * Math.sin(OMG * (τ - tB)), t, tWp + 0.3, 3, 140, t >= tWp + 0.3);
    sLab.forEach(e => M.vis(e, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 1.0, 1e9, { dy: 12 });
    M.setT($('#rW'), String(Math.round(100 * k))); M.setT($('#rO'), k.toFixed(2));
    avB(t, wt('B5', 'arrow') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const stOn = t >= tT - 0.1 && t < tP; M.hide($('#stmt'), !stOn);
  if (stOn) { M.rise($('#st1'), t, tT + 0.05, { out: tP - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'markings') - 0.25, { out: tP - 0.35, outDur: 0.25 }); }

  /* P: identification */
  const pOn = t >= tP - 0.05 && t < tN + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tN - 0.32;
    iT.forEach((el, i) => { M.vis(el, t, tP + 0.15 + i * 0.1, out, { dy: 36, ...o });
      const lit = M.io((t - tId[i]) / 0.3); el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, lit); el.querySelector('.ex').style.color = M.mix('#C4C8D0', MU, lit);
      iP[i].style.opacity = (0.35 + 0.65 * lit).toFixed(3);
      const p = el.querySelector('.pillp'); if (!p._c) { p._c = 1; p.style.left = ((376 - p.offsetWidth) / 2) + 'px'; } M.vis(p, t, tId[i] + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      M.draw(iCall[i], t, tId[i] + 0.3, 0.35); });
    fadeAt(iLong, t, wt('P4', 'longer'));
  }

  /* N: reading the code */
  const nOn = t >= tN - 0.05 && t < tX + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tX - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, tN + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(big, t, tN + 0.4, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.2 }); fadeAt(dg, t, tN + 0.7, 0.12);
    const u1 = M.io((t - tDer[0]) / 0.3), u2 = M.io((t - tDer[1]) / 0.3);
    PUC.attr(dg[0], 'fill', M.mix(INK, '#8A5A12', u1)); PUC.attr(dg[1], 'fill', M.mix(INK, '#8A5A12', u1)); PUC.attr(dg[2], 'fill', M.mix(INK, '#8F3E0A', u2));
    M.draw(brk[0], t, tDer[0] + 0.1, 0.4); M.draw(brk[1], t, tDer[1] + 0.1, 0.4);
    M.draw(brLn[0], t, tDer[0] + 0.3, 0.4); M.draw(brLn[1], t, tDer[1] + 0.3, 0.4);
    M.vis(brL[0], t, tDer[0] + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis(brL[1], t, tDer[1] + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const tl = [tWr[1], tWr[2], tWr[3]];
    lad.forEach((l, i) => { M.vis(l.g, t, i ? tDer[3] + 0.2 + i * 0.2 : tDer[2] + 0.2, 1e9, { dy: 12 }); const lit = M.io((t - tl[i]) / 0.3);
      PUC.attr(l.r, 'fill', M.mix(C.soft, C.ac2, lit)); PUC.attr(l.r, 'stroke', M.mix(C.line, AM, lit)); });
    ladA.forEach((a, i) => M.vis(a, t, tDer[3] + 0.3 + i * 0.2, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#nRL1'), t, tN + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#nRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dRows.forEach((r, i) => { M.vis(r, t, tDer[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDer[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDer[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tDer[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#nBox'), t, tDer[3] + 0.6, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    wR.forEach((r, i) => { M.vis(r.querySelector('.n'), t, tWr[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWr[i], 0.7); const w = r.querySelector('.why'); if (w) M.vis(w, t, tWr[i] + 0.6, 1e9, { dx: -10, dy: 0 }); M.hide(r, t < tWr[i] - 0.15); });
    avN(t, wt('W4', 'famous') - 0.2, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'cannot'), tRight: wt('X3', 'Its') - 0.1 });
    [[mR, wt('X3', 'Its')], [mWr, wt('X3', 'backwards')]].forEach(([m, a]) => { drawSeq(m.els, t, a - 0.3, 0.3, 0.08); fadeAt(m.can, t, a); popAt(m.mark, t, a + 0.5); M.vis(m.lab, t, a + 0.6, 1e9, { dy: 0, fade: 0.2 }); });
    M.draw(mWr.bulge, t, wt('X3', 'bulge') - 0.1, 0.4);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Draw') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
