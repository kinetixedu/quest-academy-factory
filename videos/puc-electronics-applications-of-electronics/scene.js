// PUC Electronics Ep 4 - Applications of electronics ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange (holes: hollow orange), t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, OR = C.orange, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8';
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const steps = (host, rows, cls = 'st2') => { host.innerHTML = rows.map(([s, w, y, txt]) => `<div class="${cls}" style="top:${y}px"><div class="n"></div><div class="sx${txt ? ' tx' : ''}">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
  const r = [...host.children]; r.forEach((e, i) => { e.querySelector('.n').textContent = i + 1; }); return r; };
const runSteps = (rows, t, ts, tout = 1e9) => rows.forEach((r, i) => { M.vis(r, t, ts[i] - 0.1, tout, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 });
  M.vis(r.querySelector('.n'), t, ts[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, ts[i], 0.6);
  const w = r.querySelector('.why'); if (w) M.vis(w, t, ts[i] + 0.5, 1e9, { dx: -10, dy: 0 }); });

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
/* glyphs */
const sineP = (cx, cy, a = 16, w = 26) => `M${cx - w},${cy} C${cx - w * 0.6},${cy - a * 1.6} ${cx - w * 0.4},${cy - a * 1.6} ${cx},${cy} S${cx + w * 0.6},${cy + a * 1.6} ${cx + w},${cy}`;

const setH = (el, s) => { if (el._h !== s) { el._h = s; el.innerHTML = s; } };
Object.assign(M.IC, {
  mic: ['M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v3'],
  vol: ['M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z', 'M16 9a5 5 0 0 1 0 6', 'M19.364 18.364a9 9 0 0 0 0-12.728'],
  ant: ['M4.9 19.1C1 15.2 1 8.8 4.9 4.9', 'M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5', 'M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5', 'M19.1 4.9C23 8.8 23 15.1 19.1 19', 'M12 12h.01'],
  tv: ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z', 'm17 2-5 5-5-5'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  therm: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z']
});

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Thick') - 0.25;
const tI = T0('I1'), tO = T0('O1'), tR = T0('R1'), tR5 = T0('R5'), tW = T0('W1'), tN = T0('N1'), tD = T0('D1'), tT = T0('T1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tX], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const planeD = (x, y, s = 1) => `M${x - 110 * s},${y + 6 * s} L${x + 70 * s},${y - 6 * s} Q${x + 112 * s},${y - 8 * s} ${x + 116 * s},${y + 4 * s} Q${x + 112 * s},${y + 16 * s} ${x + 70 * s},${y + 14 * s} L${x - 110 * s},${y + 22 * s} Z M${x - 10 * s},${y + 6 * s} L${x + 30 * s},${y - 50 * s} L${x + 48 * s},${y - 50 * s} L${x + 26 * s},${y + 6 * s} M${x - 100 * s},${y + 8 * s} L${x - 112 * s},${y - 30 * s} L${x - 92 * s},${y - 30 * s} L${x - 76 * s},${y + 6 * s}`;

/* ================= A: hook ================= */
const plS = $('#plS');
const winR = mk(plS, 'rect', { x: 20, y: 20, width: 260, height: 260, rx: 18, fill: '#EEF0F4', stroke: INK, 'stroke-width': 5 });
const winX = W(plS, 'M150,20 V280 M20,150 H280', { 'stroke-width': 4 });
const fogB = [0, 1, 2, 3].map(i => mk(plS, 'rect', { x: 24, y: 40 + i * 58, width: 252, height: 30, rx: 15, fill: '#FFFFFF', opacity: 0.85 }));
const fgS = $('#fgS');
const rwy = [W(fgS, 'M60,250 L230,90 M420,250 L290,90', { 'stroke-width': 4 }), W(fgS, 'M240,240 V215 M244,190 V172 M248,150 V136 M252,120 V110', { stroke: AM, 'stroke-width': 4 })];
const fogF = [0, 1, 2, 3, 4].map(i => mk(fgS, 'rect', { x: 20, y: 80 + i * 36, width: 500, height: 26, rx: 13, fill: '#E9EBF0', opacity: 0.92 }));
const twS = $('#twS');
const rad = [mk(twS, 'circle', { cx: 210, cy: 160, r: 100, fill: '#16213E' }), mk(twS, 'circle', { cx: 210, cy: 160, r: 66, fill: 'none', stroke: '#2A3758', 'stroke-width': 2 }), mk(twS, 'circle', { cx: 210, cy: 160, r: 33, fill: 'none', stroke: '#2A3758', 'stroke-width': 2 })];
const sweepL = mk(twS, 'line', { x1: 210, y1: 160, x2: 310, y2: 160, stroke: AM, 'stroke-width': 3, 'stroke-linecap': 'round' });
const blip = mk(twS, 'circle', { cx: 262, cy: 112, r: 8, fill: AM });
const blipL = mono(twS, 330, 116, 'plane, 18 km', { 'font-size': 18, fill: INK });
const tFog = wt('H1', 'Thick'), tTw = wt('H2', 'planes');

/* ================= I: chain idea ================= */
const iS = $('#iS');
const IB = [['SENSE', 'pick up a signal', 'microphone, sensor, antenna', 120], ['PROCESS', 'shape the signal', 'amplifier, microcontroller', 610], ['ACT', 'do something useful', 'speaker, screen, motor', 1100]];
$('#iB').innerHTML = IB.map(([n, d, e, x]) => `<div class="blk" style="left:${x}px;top:120px;width:380px;height:170px"><div class="nm" style="font-size:40px;top:20px">${n}</div><div class="ds" style="top:78px;font-size:22px;color:var(--ink2)">${d}</div><div class="ds" style="top:114px;font-size:19px">${e}</div></div>`).join('');
const iBl = [...$('#iB').children];
const iAr = [W(iS, 'M512,205 H598'), W(iS, 'M582,191 L598,205 L582,219'), W(iS, 'M1002,205 H1088'), W(iS, 'M1072,191 L1088,205 L1072,219')];
const iDot = mk(iS, 'circle', { r: 12, fill: AM, stroke: INK, 'stroke-width': 2 });
const IF = ['Communication', 'Entertainment', 'Defence', 'Industry', 'Medicine'];
$('#iF').innerHTML = `<div class="lbl" style="left:120px;top:360px">THE SAME CHAIN IN EVERY FIELD</div>` + IF.map((s, i) => `<span class="pillp" style="left:${120 + i * 276}px;top:404px;width:252px;justify-content:center">${s}</span>`).join('');
const iFl = [...$('#iF').children];
const tIb = [wt('I2', 'Sense'), wt('I2', 'process'), wt('I2', 'act')];

/* ================= O: communication + TV chains ================= */
const oS = $('#oS');
const wv = (k) => { // sparkline 120 x 44
  if (k === 'small') return `<svg width="120" height="44"><path d="${[...Array(41)].map((_, i) => (i ? 'L' : 'M') + (i * 3) + ',' + (22 - 5 * Math.sin(i * 0.47)).toFixed(1)).join('')}" fill="none" stroke="${CH1}" stroke-width="3"/></svg>`;
  if (k === 'big') return `<svg width="120" height="44"><path d="${[...Array(41)].map((_, i) => (i ? 'L' : 'M') + (i * 3) + ',' + (22 - 17 * Math.sin(i * 0.47)).toFixed(1)).join('')}" fill="none" stroke="${AM}" stroke-width="3"/></svg>`;
  if (k === 'mod') return `<svg width="120" height="44"><path d="${[...Array(121)].map((_, i) => (i ? 'L' : 'M') + i + ',' + (22 - (8 + 10 * Math.sin(i * 0.157)) * Math.sin(i * 1.3)).toFixed(1)).join('')}" fill="none" stroke="${AM}" stroke-width="2"/></svg>`;
  return `<div style="position:absolute;right:20px;top:24px">${M.icon(k, 44, C.ink2, 2)}</div>`; };
const OB = [
  [0, 'Microphone', 'sound to signal', 'small'], [0, 'Amplifier', 'makes it stronger', 'big'], [0, 'Transmitter', 'onto a radio wave', 'mod'], [0, 'Antenna', 'sends it out', 'ant'],
  [1, 'Antenna', 'catches the wave', 'ant'], [1, 'Receiver', 'takes the signal off', 'small'], [1, 'Amplifier', 'makes it stronger', 'big'], [1, 'Speaker', 'signal to sound', 'vol'],
  [2, 'Antenna', 'catches the signal', 'ant'], [2, 'Decoder', 'picture and sound', 'tv'], [2, 'Amplifier', 'makes them stronger', 'big'], [2, 'Screen, speaker', 'you watch and hear', 'vol']];
const OX = [36, 420, 804, 1188], OY = [112, 278, 444];
$('#oB').innerHTML = ['COMMUNICATION · YOUR PHONE SENDS', 'COMMUNICATION · YOUR FRIEND\'S PHONE RECEIVES', 'ENTERTAINMENT · A TELEVISION'].map((s, r) => `<div class="rl" style="top:${OY[r] - 30}px">${s}</div>`).join('') +
  OB.map(([r, n, d, k], i) => `<div class="blk" style="left:${OX[i % 4]}px;top:${OY[r]}px;width:330px;height:100px"><div class="nm">${n}</div><div class="ds">${d}</div>${k.length > 5 || ['small', 'big', 'mod'].includes(k) ? wv(k) : wv(k)}</div>`).join('');
const oKids = [...$('#oB').children], oRl = oKids.slice(0, 3), oBl = oKids.slice(3);
const oAr = []; OY.forEach(y => OX.slice(0, 3).forEach(x => { oAr.push(W(oS, `M${x + 340},${y + 50} H${x + 374} M${x + 362},${y + 40} L${x + 374},${y + 50} L${x + 362},${y + 60}`, { 'stroke-width': 3 })); }));
const oDots = OY.map(() => mk(oS, 'circle', { r: 9, fill: AM, stroke: INK, 'stroke-width': 2 }));
const tOb = [wt('O2', 'microphone'), wt('O3', 'amplifier'), wt('O3', 'transmitter'), wt('O3', 'antenna'),
  wt('O4', 'other'), wt('O4', 'Receiver'), wt('O4', 'amplifier'), wt('O4', 'speaker'),
  wt('E1', 'receives'), wt('E1', 'decodes'), wt('E1', 'amplifies'), wt('E1', 'screen')];

/* ================= R: radar breadboard ================= */
const ck = $('#ckS'), AXp = 176, AYp = 380, PX = 760, PY = 220, DIST = Math.hypot(PX - AXp, PY - AYp), ANG = Math.atan2(PY - AYp, PX - AXp);
const ground = W(ck, 'M40,470 H888', { 'stroke-width': 3, stroke: '#B8BCC6' });
const dish = [W(ck, 'M130,470 V410', { 'stroke-width': 5 }), W(ck, 'M96,352 Q164,368 156,444', { 'stroke-width': 6 }), W(ck, 'M128,398 L176,380', { 'stroke-width': 3 })];
const plane = W(ck, planeD(PX, PY, 0.7), { fill: '#fff', 'stroke-width': 3 });
const arcP = (r, spread) => { const a0 = ANG - spread, a1 = ANG + spread; return `M${(AXp + r * Math.cos(a0)).toFixed(1)},${(AYp + r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(AXp + r * Math.cos(a1)).toFixed(1)},${(AYp + r * Math.sin(a1)).toFixed(1)}`; };
const arcE = (r, spread) => { const B = ANG + Math.PI, a0 = B - spread, a1 = B + spread; return `M${(PX + r * Math.cos(a0)).toFixed(1)},${(PY + r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(PX + r * Math.cos(a1)).toFixed(1)},${(PY + r * Math.sin(a1)).toFixed(1)}`; };
const pA = [0, 1, 2].map(() => W(ck, '', { stroke: AM, 'stroke-width': 5 })), eA = [0, 1].map(() => W(ck, '', { stroke: '#B7791F', 'stroke-width': 3 }));
const dLine = mk(ck, 'line', { x1: AXp, y1: AYp + 34, x2: PX, y2: PY + 34, stroke: INK, 'stroke-width': 2, 'stroke-dasharray': '8 8' });
const dLab = tx(ck, (AXp + PX) / 2 + 14, (AYp + PY) / 2 + 56, 'd', { 'font-style': 'italic', 'font-size': 32 });
const rLab = [mono(ck, 70, 500 - 4, 'radar antenna', { 'font-size': 18 }), mono(ck, PX, PY + 52, 'plane in the fog', { 'text-anchor': 'middle', 'font-size': 18 })];
const RP = [['Transmitter', 40], ['Antenna', 236], ['Receiver, amplifier', 400], ['Display', 680]];
const rPills = RP.map(([s, x]) => { const d = document.createElement('div'); d.className = 'pillp'; d.style.cssText = `left:${x}px;top:524px;height:44px;font-size:22px`; d.textContent = s; $('#ck').appendChild(d); return d; });
const tR0 = wt('R2', 'sends'), PR = 3.2;
const rf = t => t < tR0 ? -1 : ((t - tR0) / PR) % 1;
const SC = scope($('#scS'), 592, 200), XS = f => 10 + 572 * f;
const rCh1 = mk($('#scS'), 'path', { d: '', fill: 'none', stroke: CH1, 'stroke-width': 4, 'stroke-linejoin': 'round' }), rCh2 = mk($('#scS'), 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linejoin': 'round' });
const sLab = [SC.lab(14, 24, 'CH1 · PULSE SENT', CH1), SC.lab(300, 24, 'CH2 · ECHO (AMPLIFIED)', AM)];
const dtM = [mk($('#scS'), 'line', { x1: XS(0), y1: 34, x2: XS(0), y2: 196, stroke: '#fff', 'stroke-width': 1.5, 'stroke-dasharray': '4 5' }), mk($('#scS'), 'line', { x1: XS(0.8), y1: 34, x2: XS(0.8), y2: 196, stroke: '#fff', 'stroke-width': 1.5, 'stroke-dasharray': '4 5' })];
const dtA = PUC.arrow($('#scS'), '#FFFFFF', 2.5, 10), dtL = SC.lab(XS(0.4) - 70, 120, 'GAP t = 400 µs', '#FFFFFF');
const spike = (f, c, h, w) => Math.abs(f - c) < w ? h * (1 - Math.abs(f - c) / w) : 0;
const trPath = (f, y0, fn) => { let d = ''; const n = Math.max(2, Math.floor(f * 200)); for (let i = 0; i <= n; i++) { const g = f * i / n; d += (i ? 'L' : 'M') + XS(g).toFixed(1) + ',' + (y0 - fn(g)).toFixed(1); } return d; };
$('#ro1').innerHTML = `<span class="k">t</span><span class="v" id="r1t">0</span><span class="u">µs</span>
  <span class="k n">ECHO AT</span><span class="v" id="r1e">-</span><span class="u">µs</span>
  <span class="k n">PULSE</span><span class="v" id="r1s" style="font-size:30px">-</span><span class="u"></span>`;

/* ================= RD: formula + worked example ================= */
const gS = $('#gS');
const gAnt = [W(gS, 'M90,300 V250', { 'stroke-width': 5 }), W(gS, 'M60,200 Q116,214 110,276', { 'stroke-width': 6 })];
const gPl = W(gS, planeD(640, 230, 0.6), { fill: '#fff', 'stroke-width': 3 });
const gOut = PUC.arrow(gS, AM), gBack = PUC.arrow(gS, '#B7791F');
const gL = [tx(gS, 370, 196, 'there: d', { 'text-anchor': 'middle', fill: '#B7791F' }), tx(gS, 370, 336, 'back: d', { 'text-anchor': 'middle', fill: '#B7791F' }), mono(gS, 370, 372, 'total path = 2d', { 'text-anchor': 'middle', fill: INK, 'font-size': 20 })];
$('#gRo').innerHTML = `<span class="k">c</span><span class="v">3.0 × 10<sup>8</sup></span><span class="u">m/s</span>
  <span class="k">t</span><span class="v" id="gT">?</span><span class="u">s</span>
  <span class="k">d</span><span class="v" id="gD" style="color:#B7791F">?</span><span class="u">km</span>`;
const dRows = steps($('#dSteps'), [[K(`c = 3\\times10^{8}\\,\\text{m/s}`), 'speed of light', 92], [K(`2d = c\\,t`), 'there and back', 186], [K(`d = \\dfrac{c\\,t}{2}`), 'distance to target', 296]]);
const tDer = [wt('R5', 'speed'), wt('R6', 'Two'), wt('R7', 'So')];
const wRows = steps($('#wSteps'), [[K(`t = 400\\,\\mu\\text{s} = 4\\times10^{-4}\\,\\text{s}`), '', 92], [K(`d = \\dfrac{3\\times10^{8}\\times4\\times10^{-4}}{2}`), '', 196], [K(`d = 6\\times10^{4}\\,\\text{m} = 60\\,\\text{km}`), '', 436]]);
const tWr = [wt('W2', 'So'), wt('W3', 'd'), wt('W4', 'That')];
const avR = PUC.avatar($('#sD2'), { x: 1008, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So the tower knows exactly how far it is!' });

/* ================= N: industry ================= */
const nS = $('#nS');
const G = PUC.graph(nS, { x: 96, y: 92, w: 620, h: 300, xmax: 10, ymin: 0, ymax: 250, xt: [0, 5, 10], yt: [0, 100, 200], xl: 'time (min)', yl: '°C' });
const setL = mk(nS, 'line', { x1: G.X(0), y1: G.Y(200), x2: G.X(10), y2: G.Y(200), stroke: INK, 'stroke-width': 2, 'stroke-dasharray': '8 8' });
const setT = mono(nS, G.X(10), G.Y(200) - 10, 'set 200 °C', { 'text-anchor': 'end', fill: INK, 'font-size': 18 });
const TS = []; { let T = 30, on = true; for (let i = 0; i <= 1000; i++) { const s = i / 100; if (T >= 205) on = false; if (T <= 195) on = true; TS.push([s, T, on]); T += (on ? 0.9 * (300 - T) / 30 : -0.9 * (T - 30) / 30) * 0.01 * 6; } }
const Tat = s => TS[Math.min(1000, Math.max(0, Math.round(s * 100)))];
const curve = G.curve(AM, 5), gDot = G.dot(AM, 9);
const hStrip = mk(nS, 'g'); const HS = []; for (let i = 0; i < 100; i++) HS.push(mk(hStrip, 'rect', { x: G.X(i / 10), y: 470, width: 620 / 100 + 0.5, height: 30, fill: C.soft }));
const hL = mono(nS, 96, 456, 'HEATER', { 'font-size': 18 });
const nS2 = $('#nS2');
const NB = [['SENSOR', 'reads the temperature', 40, 96], ['MICROCONTROLLER', 'compares with 200 °C', 424, 96], ['HEATER SWITCH', 'on or off', 424, 316], ['OVEN', 'gets hotter or cooler', 40, 316]];
$('#nB').innerHTML = NB.map(([n, d, x, y]) => `<div class="blk" style="left:${x}px;top:${y}px;width:320px;height:110px"><div class="nm" style="font-size:24px">${n}</div><div class="ds">${d}</div></div>`).join('') +
  `<span class="pillp good" id="nP1" style="left:40px;top:484px">No human needed</span><span class="pillp ac" id="nP2" style="left:340px;top:484px">Robots work the same way</span>`;
const nBl = [...$('#nB').querySelectorAll('.blk')];
const nAr = [W(nS2, 'M372,151 H412 M400,141 L412,151 L400,161', { 'stroke-width': 3 }), W(nS2, 'M584,218 V304 M574,292 L584,304 L594,292', { 'stroke-width': 3 }), W(nS2, 'M412,371 H372 M384,361 L372,371 L384,381', { 'stroke-width': 3 }), W(nS2, 'M200,304 V218 M190,230 L200,218 L210,230', { 'stroke-width': 3 })];
const nTok = mk(nS2, 'circle', { r: 10, fill: AM, stroke: INK, 'stroke-width': 2 });
const loopPts = [[200, 151], [584, 151], [584, 371], [200, 371], [200, 151]];
const tN0 = wt('N1', 'oven'), sOf = t => M.clamp((t - tN0) / Math.max(1, T0('D1') - 0.4 - tN0)) * 10;

/* ================= M: medicine ECG ================= */
const mkS = $('#mkS');
const body = mk(mkS, 'circle', { cx: 150, cy: 250, r: 86, fill: '#FBEBDD', stroke: INK, 'stroke-width': 4 });
const heartG = mk(mkS, 'g'); heartG.innerHTML = M.icon('heart', 80, C.red, 2.4).replace('<svg ', '<svg x="110" y="210" ');
const pads = [mk(mkS, 'circle', { cx: 92, cy: 196, r: 12, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(mkS, 'circle', { cx: 208, cy: 304, r: 12, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const mW = [W(mkS, 'M92,184 V150 H300 V230 H380', { 'stroke-width': 3 }), W(mkS, 'M220,304 H300 V290 H380', { 'stroke-width': 3 }), W(mkS, 'M500,260 H620', { 'stroke-width': 3 })];
const amp = W(mkS, 'M380,190 L380,330 L500,260 Z', { fill: '#fff' });
const ampT = tx(mkS, 422, 268, '×1000', { 'font-size': 20, 'font-family': 'IBM Plex Mono' });
const disp = mk(mkS, 'rect', { x: 620, y: 180, width: 250, height: 160, rx: 12, fill: '#16213E' });
const dTr = mk(mkS, 'path', { d: '', fill: 'none', stroke: '#7FE0A8', 'stroke-width': 3 });
const mLab = [mono(mkS, 150, 372, 'pads on the skin', { 'text-anchor': 'middle', 'font-size': 18 }), mono(mkS, 440, 372, 'amplifier', { 'text-anchor': 'middle', 'font-size': 18 }), mono(mkS, 745, 372, 'display', { 'text-anchor': 'middle', 'font-size': 18 })];
const mP = [['SENSE', 92], ['PROCESS', 376], ['SHOW', 690]].map(([s, x]) => { const d = document.createElement('div'); d.className = 'pillp ac'; d.style.cssText = `left:${x}px;top:404px;height:44px;font-size:20px;font-family:'IBM Plex Mono';letter-spacing:.08em`; d.textContent = s; $('#mk').appendChild(d); return d; });
const ecg = τ => { const p = ((τ % 0.833) + 0.833) % 0.833 / 0.833, g = (c, w, a) => a * Math.exp(-(((p - c) / w) ** 2));
  return g(0.2, 0.035, 0.15) + g(0.36, 0.012, -0.15) + g(0.4, 0.014, 1.0) + g(0.44, 0.014, -0.25) + g(0.66, 0.06, 0.3); };
const MSC = scope($('#mscS'), 592, 200), mIn = MSC.tr(CH1), mOut = MSC.tr(AM);
const mSL = [MSC.lab(14, 24, 'CH1 · AT THE SKIN (SAME SCALE)', CH1), MSC.lab(14, 192, 'CH2 · AFTER THE AMPLIFIER', AM)];
$('#mro').innerHTML = `<span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" id="mVi" style="color:${TE}">0.00</span><span class="u">mV</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="mVo" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k n">GAIN</span><span class="v">×1000</span><span class="u"></span>`;
const tE0 = wt('D2', 'records'), tAmp = wt('D4', 'amplifier');
const avD = PUC.avatar($('#sM'), { x: 192, y: 768, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Doctors read this trace every day!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Radar distance: d = c t', right: 'd = c t / 2, the pulse goes there and back', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcG = [W(tcS, 'M90,250 V200', { 'stroke-width': 5 }), W(tcS, 'M60,150 Q116,164 110,226', { 'stroke-width': 6 }), W(tcS, planeD(640, 170, 0.5), { fill: '#fff', 'stroke-width': 3 })];
const tcO = PUC.arrow(tcS, AM), tcB = PUC.arrow(tcS, '#B7791F');
const tcL = [tx(tcS, 370, 112, 'there: d', { 'text-anchor': 'middle', fill: '#B7791F', 'font-size': 22 }), tx(tcS, 370, 262, 'back: d', { 'text-anchor': 'middle', fill: '#B7791F', 'font-size': 22 })];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'List applications in communication, defence, industry or medicine, with examples' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A radar echo returns 0.2&nbsp;ms after the pulse is sent. How far away is the target?', qW: 780,
  opts: [K('60\\,\\text{km}'), K('30\\,\\text{km}'), K('15\\,\\text{km}'), K('6\\,\\text{km}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`t = 2\\times10^{-4}\\,\\text{s}`)], [K(`c\\,t = 6\\times10^{4}\\,\\text{m}`)], [K(`d = \\dfrac{c\\,t}{2} = 3\\times10^{4}\\,\\text{m}`)], [K(`d = 30\\,\\text{km}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'That'), wt('A3', 'c'), wt('A4', 'Divide'), wt('A4', 'or')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 112, title: 'Applications of electronics · formula card', txt: [0, 0, 1, 1],
  lines: [K(`d = \\dfrac{c\\,t}{2} \\qquad c = 3\\times10^{8}\\,\\text{m/s}`),
    K(`\\text{gain} = \\dfrac{\\textcolor{${TE}}{V_{out}}}{\\textcolor{${TE}}{V_{in}}} = \\dfrac{1\\,\\text{V}}{1\\,\\text{mV}} = 1000`),
    'Every application: sense → process → act',
    'Phone · TV · radar · factory control · ECG, scanners, pacemakers'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 05', topic: 'Impact of electronics on everyday life', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('R3', 'hits') - 0.2, 1.1, 820, 520], [T0('R4'), 1, 960, 540], [tAmp - 0.2, 1.1, 640, 540], [T0('D5'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[tR0, tR5], [tN0, tD], [tE0, tT]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GW.find(([a, b]) => t >= a - 0.05 && t < b);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1] - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis(winR, t, tMorph + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.draw(winX, t, tMorph + 0.6, 0.4);
    fogB.forEach((f, i) => { M.vis(f, t, tMorph + 0.7 + i * 0.1, 1e9, { dy: 0, fade: 0.3 }); PUC.attr(f, 'x', (24 + 14 * Math.sin(0.6 * t + i)).toFixed(1)); });
    M.vis($('#aPill'), t, wt('H2', 'landing') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#fgC'), t, tFog - 0.1, out, { dx: 60, dy: 0, ...o });
    drawSeq(rwy, t, tFog + 0.1, 0.4, 0.15);
    fogF.forEach((f, i) => { M.vis(f, t, tFog + 0.5 + i * 0.12, 1e9, { dy: 0, fade: 0.4 }); PUC.attr(f, 'x', (20 + 18 * Math.sin(0.5 * t + i * 1.3)).toFixed(1)); });
    M.vis($('#fgP'), t, wt('H1', 'runway') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#twC'), t, tTw - 0.1, out, { dy: 36, ...o });
    rad.forEach((r, i) => M.vis(r, t, tTw + i * 0.08, 1e9, { dy: 0, fade: 0.2 }));
    const a = 2 * Math.PI * 0.4 * (t - tTw); PUC.attr(sweepL, 'x2', (210 + 100 * Math.cos(a)).toFixed(1)); PUC.attr(sweepL, 'y2', (160 + 100 * Math.sin(a)).toFixed(1)); M.hide(sweepL, t < tTw + 0.2);
    const ba = Math.atan2(112 - 160, 262 - 210), since = (((a - ba) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    blip.style.opacity = t < tTw + 0.4 ? 0 : (0.25 + 0.75 * Math.max(0, 1 - since / 4)).toFixed(3);
    M.vis(blipL, t, wt('H2', 'see') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#twP'), t, wt('H2', 'see'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* I: chain idea */
  const iOn = t >= tI - 0.05 && t < tO + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    M.vis($('#iC'), t, tI + 0.1, tO - 0.32, { dy: 36, ...o });
    iBl.forEach((b, i) => { M.vis(b, t, tIb[i] - 0.15, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.1 }); b.style.borderColor = M.mix(C.line, AM, M.io((t - tIb[i]) / 0.3)); });
    drawSeq(iAr.slice(0, 2), t, tIb[1] - 0.3, 0.25, 0.1); drawSeq(iAr.slice(2), t, tIb[2] - 0.3, 0.25, 0.1);
    const u = ((t - tIb[2] - 0.4) / 2.4) % 1; M.hide(iDot, t < tIb[2] + 0.4);
    PUC.attr(iDot, 'cx', (310 + 980 * M.io(u)).toFixed(1)); PUC.attr(iDot, 'cy', 205); iDot.style.opacity = u < 0.08 ? u / 0.08 : u > 0.92 ? (1 - u) / 0.08 : 1;
    iFl.forEach((f, i) => { const ti = i ? wt('I1', 'not') + i * 0.1 : wt('I1', 'not') - 0.1; M.vis(f, t, ti, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
      if (i) { const l = M.io((t - wt('I2', 'every') - i * 0.08) / 0.25); f.style.background = M.mix(C.soft, AM, l); f.style.color = M.mix(INK, '#FFFFFF', l); } });
  }

  /* O: communication + TV chains */
  const oOn = t >= tO - 0.05 && t < tR + 0.1; M.hide($('#sO'), !oOn);
  if (oOn) {
    M.vis($('#oC'), t, tO + 0.1, tR - 0.32, { dy: 36, ...o });
    oRl.forEach((r, i) => M.vis(r, t, tOb[i * 4] - 0.3, 1e9, { dy: 8 }));
    oBl.forEach((b, i) => { M.vis(b, t, tOb[i] - 0.15, 1e9, { dx: -20, dy: 0 }); b.style.borderColor = M.mix(C.line, AM, M.io((t - tOb[i]) / 0.3)); });
    oAr.forEach((a, i) => M.draw(a, t, tOb[i + Math.floor(i / 3) + 1] - 0.3, 0.3));
    oDots.forEach((d, r) => { const t0 = tOb[r * 4 + 3] + 0.2, u = ((t - t0) / 2.6) % 1; M.hide(d, t < t0);
      PUC.attr(d, 'cx', (OX[0] + 165 + (OX[3] - OX[0]) * u).toFixed(1)); PUC.attr(d, 'cy', OY[r] - 8); });
  }

  /* R: radar breadboard */
  const rOn = t >= tR - 0.05 && t < tR5 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = tR5 - 0.32;
    M.vis($('#ck'), t, tR + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tR + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tR + 0.45, out, { dy: 36, ...o });
    M.draw(ground, t, tR + 0.3, 0.5); drawSeq(dish, t, tR + 0.4, 0.3, 0.12); M.vis(plane, t, wt('R1', 'fog'), 1e9, { dy: 0, fade: 0.25 }); fadeAt(rLab, t, tR + 0.8, 0.2);
    rPills.forEach((p, i) => M.vis(p, t, tR + 0.8 + i * 0.1, 1e9, { dy: 10 }));
    const f = rf(t);
    pA.forEach((p, k) => { const r = DIST * (f / 0.4) - k * 16; const on = f >= 0 && f < 0.4 && r > 10; M.hide(p, !on); if (on) PUC.attr(p, 'd', arcP(r, 0.22 - k * 0.03)); });
    eA.forEach((p, k) => { const r = DIST * ((f - 0.4) / 0.4) - k * 14; const on = f >= 0.4 && f < 0.8 && r > 10 && t >= wt('R3', 'bounces') - 1; M.hide(p, !on); if (on) PUC.attr(p, 'd', arcE(r, 0.16)); });
    const hit = f >= 0 ? M.clamp(1 - Math.abs(f - 0.4) / 0.05) : 0; PUC.attr(plane, 'fill', M.mix('#FFFFFF', AM, hit));
    const st = f < 0 ? -1 : f < 0.06 ? 0 : f < 0.12 ? 1 : f >= 0.76 && f < 0.86 ? 2 : f >= 0.84 ? 3 : -1;
    rPills.forEach((p, i) => { const on = st === i || (i === 1 && f >= 0.74 && f < 0.8); p.style.background = on ? AM : C.soft; p.style.color = on ? '#fff' : INK; });
    M.draw(dLine, t, wt('R4', 'gap') - 0.2, 0.5); M.vis(dLab, t, wt('R4', 'gap'), 1e9, { dy: 0, fade: 0.2 });
    // scope: single sweep per pulse
    const fs = f < 0 ? 0 : f;
    PUC.attr(rCh1, 'd', f < 0 ? '' : trPath(fs, 80, g => spike(g, 0.02, 46, 0.018)));
    PUC.attr(rCh2, 'd', f < 0 || t < wt('R3', 'bounces') - 1 ? '' : trPath(fs, 176, g => spike(g, 0.8, 22, 0.015)));
    sLab.forEach(e => M.vis(e, t, tR0 - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    const gOn = t >= wt('R4', 'gap') - 0.1; dtM.forEach(e => M.vis(e, t, wt('R4', 'gap') - 0.1, 1e9, { dy: 0, fade: 0.2 }));
    const ga = M.io((t - wt('R4', 'gap')) / 0.5); dtA.set(XS(0.02), 112, XS(0.02) + (XS(0.78) - XS(0.02)) * ga, 112); M.hide(dtA.g, !gOn); M.vis(dtL, t, wt('R4', 'gap') + 0.4, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#r1t'), f < 0 ? '0' : String(Math.round(500 * f))); M.setT($('#r1e'), t >= tR0 + PR * 0.8 && t >= wt('R3', 'bounces') - 1 ? '400' : '-');
    M.setT($('#r1s'), f < 0 ? '-' : f < 0.06 ? 'SENT' : f < 0.76 ? 'TRAVELLING' : f < 0.9 ? 'ECHO IN' : 'WAITING'); $('#r1s').style.color = f >= 0.76 && f < 0.9 ? '#B7791F' : MU;
    M.vis($('#ro1'), t, tR + 0.6, 1e9, { dy: 12 });
    M.vis($('#slowT'), t, T0('R4'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* RD: formula + worked example */
  const dOn = t >= tR5 - 0.05 && t < tN + 0.1; M.hide($('#sD2'), !dOn);
  if (dOn) {
    const out = tN - 0.32;
    M.vis($('#rL'), t, tR5 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#rR'), t, tR5 + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(gAnt, t, tR5 + 0.4, 0.3, 0.1); M.vis(gPl, t, tR5 + 0.5, 1e9, { dy: 0, fade: 0.25 });
    const a1 = M.io((t - wt('R6', 'goes') + 0.1) / 0.6), a2 = M.io((t - wt('R6', 'comes') + 0.1) / 0.6);
    gOut.set(140, 220, 140 + 400 * a1, 220); gBack.set(560, 300, 560 - 420 * a2, 300);
    M.vis(gL[0], t, wt('R6', 'goes') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(gL[1], t, wt('R6', 'comes') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(gL[2], t, wt('R6', 'twice'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#gRo'), t, wt('R5', 'three') - 0.1, 1e9, { dy: 14 });
    M.vis($('#rRL1'), t, tR5 + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#rRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    runSteps(dRows, t, tDer, tW - 0.3);
    M.vis($('#dBox'), t, tDer[2] + 0.5, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#dUnit'), t, T0('R8'), tW - 0.3, { dy: 12, outDur: 0.25 });
    wRows.forEach((r, i) => M.hide(r, t < tWr[i] - 0.15)); runSteps(wRows, t, tWr);
    M.vis($('#wBox'), t, tWr[2] + 0.5, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    setH($('#gT'), t >= tWr[0] ? '4.0 × 10<sup>−4</sup>' : '?'); M.setT($('#gD'), t >= tWr[2] ? '60' : '?');
    avR(t, wt('W4', 'plane') - 0.1, out);
  }

  /* N: industry */
  const nOn = t >= tN - 0.05 && t < tD + 0.1; M.hide($('#sN'), !nOn);
  if (nOn) {
    const out = tD - 0.32;
    M.vis($('#nL'), t, tN + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#nR'), t, wt('N2', 'sensor') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(G.axes, t, tN + 0.3, 0.5); M.draw(setL, t, wt('N1', 'one') - 0.2, 0.5); M.vis(setT, t, wt('N1', 'temperature') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    const s = sOf(t), [, Tn, onH] = Tat(s);
    curve(v => [v, Tat(v)[1]], 0, s); gDot(s, Tn, t >= tN0);
    HS.forEach((h, i) => { const si = i / 10; M.hide(h, si > s); PUC.attr(h, 'fill', Tat(si)[2] ? AM : C.soft); }); M.vis(hL, t, tN0, 1e9, { dy: 0, fade: 0.2 });
    const tb = [wt('N2', 'sensor'), wt('N2', 'microcontroller'), wt('N3', 'switches'), wt('N3', 'heater')];
    nBl.forEach((b, i) => M.vis(b, t, tb[i] - 0.15, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.1 }));
    drawSeq(nAr, t, wt('N3', 'loop') - 0.3, 0.3, 0.12);
    const lu = ((t - wt('N3', 'loop')) / 2.4) % 1; M.hide(nTok, t < wt('N3', 'loop'));
    if (t >= wt('N3', 'loop')) { const seg = Math.floor(lu * 4), q = lu * 4 - seg, [x1, y1] = loopPts[seg], [x2, y2] = loopPts[seg + 1]; PUC.attr(nTok, 'cx', M.lerp(x1, x2, q).toFixed(1)); PUC.attr(nTok, 'cy', M.lerp(y1, y2, q).toFixed(1)); }
    const mcuDs = nBl[1].querySelector('.ds'), swDs = nBl[2].querySelector('.ds');
    if (t >= wt('N3', 'Too')) { M.setT(mcuDs, Tn < 200 ? 'too cold: heater ON' : 'too hot: heater OFF'); M.setT(swDs, onH ? 'ON' : 'OFF'); nBl[2].style.borderColor = onH ? AM : C.line; }
    M.setT(nBl[0].querySelector('.ds'), t >= tN0 + 0.5 ? `reads ${Math.round(Tn)} °C` : 'reads the temperature');
    M.vis($('#nP1'), t, wt('N3', 'human') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#nP2'), t, wt('N3', 'Robots') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* M: medicine ECG */
  const mOn = t >= tD - 0.05 && t < tT + 0.05; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mk'), t, tD + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#msc'), t, tE0 - 0.2, 1e9, { dx: 60, dy: 0 }); M.vis($('#mrb'), t, tE0, 1e9, { dy: 36 });
    M.vis(body, t, tD + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.SOFT, fade: 0.15 }); M.vis(heartG, t, tD + 0.4, 1e9, { dy: 0, fade: 0.2 });
    pads.forEach((p, i) => M.vis(p, t, wt('D2', 'pads') + i * 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }));
    drawSeq(mW.slice(0, 2), t, wt('D2', 'pick') - 0.1, 0.4, 0.1);
    M.draw(amp, t, tAmp - 0.3, 0.4); M.vis(ampT, t, wt('D4', 'thousand') - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(mW[2], t, wt('D4', 'display') - 0.3, 0.3);
    M.vis(disp, t, wt('D4', 'display') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(mLab.slice(0, 1), t, wt('D2', 'pads') + 0.2); fadeAt(mLab.slice(1, 2), t, tAmp); fadeAt(mLab.slice(2), t, wt('D4', 'display'));
    mP.forEach((p, i) => M.vis(p, t, [wt('D2', 'pick'), tAmp + 0.1, wt('D4', 'draws')][i], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    const e = ecg(t), beat = t >= tE0 ? Math.max(0, e) : 0;
    heartG.setAttribute('transform', `translate(150 250) scale(${(1 + 0.12 * beat).toFixed(3)}) translate(-150 -250)`);
    const shown = t >= wt('D4', 'display');
    if (shown) { let d = ''; for (let i = 0; i <= 90; i++) { const τ = t - 3 + 3 * i / 90; d += (i ? 'L' : 'M') + (632 + 226 * i / 90).toFixed(1) + ',' + (275 - 52 * ecg(τ)).toFixed(1); } PUC.attr(dTr, 'd', d); } else PUC.attr(dTr, 'd', '');
    mIn(τ => 2.5 * ecg(τ), t, tE0, 6, 70, t >= tE0); mOut(τ => 62 * ecg(τ), t, tAmp + 0.2, 6, 158, t >= tAmp + 0.2);
    mSL.forEach((e2, i) => M.vis(e2, t, i ? tAmp + 0.2 : tE0, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#mro'), t, tE0 + 0.2, 1e9, { dy: 12 });
    M.setT($('#mVi'), (e >= 0 ? '+' : '−') + Math.abs(e).toFixed(2)); M.setT($('#mVo'), t >= tAmp + 0.2 ? (e >= 0 ? '+' : '−') + Math.abs(e).toFixed(2) : '0.00');
    avD(t, wt('D1', 'Diya') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tX; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tX - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Sense') - 0.2, { out: tX - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X3', 'But'), tRight: wt('X3', 'divide') - 0.1 });
    drawSeq(tcG.slice(0, 2), t, tX + 0.5, 0.3, 0.1); M.vis(tcG[2], t, tX + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const a1 = M.io((t - wt('X3', 'travels')) / 0.5), a2 = M.io((t - wt('X3', 'back')) / 0.5);
    tcO.set(140, 128, 140 + 400 * a1, 128); tcB.set(560, 236, 560 - 420 * a2, 236);
    M.vis(tcL[0], t, wt('X3', 'target'), 1e9, { dy: 0, fade: 0.2 }); M.vis(tcL[1], t, wt('X3', 'back') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'List') - 0.2 });
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
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
