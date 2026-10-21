// PUC Electronics Ep 5 - Impact of electronics on everyday life ("Breadboard" style, Lab Notebook world)
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
  trash: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
  eye: ['M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  lock: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  video: ['m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5', 'M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
  wash: ['M3 3h18v18H3z', 'M3 8h18', 'M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'],
  therm: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z']
});

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'Her') - 0.25;
const tI = T0('I1'), tM = T0('M1'), tB = T0('B1'), tP = T0('P1'), tW = T0('W1'), tG = T0('G1'), tT = T0('T1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tX], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const dtS = $('#dtS');
const dtP = [W(dtS, 'M130,40 H170 A20,20 0 0 1 190,60 V300 L160,360 L140,360 L110,300 V60 A20,20 0 0 1 130,40 Z', { 'stroke-width': 5, fill: '#fff' })];
const dtScr = mk(dtS, 'rect', { x: 122, y: 80, width: 56, height: 90, rx: 6, fill: INK });
const dtTip = mk(dtS, 'path', { d: 'M140,330 L160,330 L156,356 L144,356 Z', fill: '#B8BCC6' });
const dtBtn = mk(dtS, 'circle', { cx: 150, cy: 220, r: 14, fill: C.ac2, stroke: INK, 'stroke-width': 3 });
const dtNum = tx(dtS, 150, 132, '', { 'text-anchor': 'middle', fill: AM, 'font-family': 'IBM Plex Mono', 'font-size': 20 });
const olS = $('#olS');
const glass = [mk(olS, 'circle', { cx: 62, cy: 150, r: 24, fill: '#E3E6EC', stroke: INK, 'stroke-width': 4 }), W(olS, 'M80,138 H500 A12,12 0 0 1 500,162 H80', { 'stroke-width': 4, fill: '#fff' })];
const merc = mk(olS, 'rect', { x: 70, y: 145, width: 0, height: 10, rx: 5, fill: '#9AA0AC' });
const ticks = W(olS, [...Array(11)].map((_, i) => `M${120 + i * 36},166 V${i % 5 ? 176 : 184}`).join(' '), { 'stroke-width': 2, stroke: '#9AA0AC' });
const tHold = wt('H1', 'holds'), tBeep = wt('H1', 'Beep'), TEMP = 38.1;

/* ================= I: thermometer chain ================= */
const iS = $('#iS'), IX = [36, 428, 820, 1212];
const IB = [['THERMISTOR', 'resistance falls as it warms'], ['CONVERTER', 'turns a voltage into numbers'], ['MICROCONTROLLER', 'works out the temperature'], ['DISPLAY', 'shows the reading']];
$('#iB').innerHTML = IB.map(([n, d], i) => `<div class="blk" style="left:${IX[i]}px;top:120px;width:352px;height:180px"><div class="nm">${n}</div><div class="ds">${d}</div><div class="lv"></div></div>`).join('') +
  [['SENSE', 36, 352], ['PROCESS', 428, 744], ['SHOW', 1212, 352]].map(([s, x, w]) => `<div class="pillp ac" style="left:${x}px;top:340px;width:${w}px;justify-content:center;font-family:'IBM Plex Mono';letter-spacing:.1em;font-size:20px;height:44px">${s}</div>`).join('') +
  `<div class="lbl" style="left:36px;top:430px">DIYA'S TEMPERATURE</div><div id="tBar" style="position:absolute;left:36px;top:470px;width:1528px;height:28px;border-radius:14px;background:var(--soft);overflow:hidden"><i style="display:block;height:28px;background:var(--ac);width:0"></i></div><div class="sm" style="left:36px;top:512px">35 °C</div><div class="sm" style="left:1500px;top:512px">40 °C</div>`;
const iKids = [...$('#iB').children], iBl = iKids.slice(0, 4), iBr = iKids.slice(4, 7), iRest = iKids.slice(7);
const iAr = IX.slice(0, 3).map(x => W(iS, `M${x + 360},210 H${x + 384} M${x + 374},200 L${x + 386},210 L${x + 374},220`, { 'stroke-width': 3 }));
const Rth = T => 10 * Math.exp(3950 * (1 / (T + 273.15) - 1 / 298.15)), Vth = T => 3.3 * Rth(T) / (Rth(T) + 10);
const tIb = [wt('I2', 'sensor'), wt('I3', 'converter'), wt('I3', 'microcontroller'), wt('I4', 'display')];
const Tof = t => 35 + (TEMP - 35) * M.io((t - wt('I2', 'warms')) / Math.max(1, tIb[3] - wt('I2', 'warms')));

/* ================= M: home ================= */
const HT = [['plug', 'Phone charger', '230 V AC in, about 5 V DC out'], ['wash', 'Washing machine', 'a microcontroller runs each step'], ['snow', 'Fridge and AC', 'sensors switch the compressor']];
$('#hTiles').innerHTML = HT.map(([ic, n, d], i) => `<div class="card hT" style="left:${160 + i * 544}px"><div class="ic">${M.icon(ic, 46, AM, 2.2)}</div><div class="nm">${n}</div><div class="ds">${d}</div><svg class="full" width="512" height="600"></svg></div>`).join('');
const hT = [...$('#hTiles').children], hS = hT.map(h => h.querySelector('svg.full'));
// charger
const sinD = [...Array(91)].map((_, i) => (i ? 'L' : 'M') + (40 + i * 4.8).toFixed(1) + ',' + (290 - 34 * Math.sin(i * 0.21)).toFixed(1)).join('');
const ch = [mono(hS[0], 40, 236, 'IN · 230 V AC', { fill: TE, 'font-size': 20 }), W(hS[0], sinD, { stroke: TE, 'stroke-width': 4 }), W(hS[0], 'M256,336 V360 M246,350 L256,362 L266,350', { 'stroke-width': 3 }),
  W(hS[0], 'M136,368 H376 V424 H136 Z', { fill: C.soft, 'stroke-width': 3 }), tx(hS[0], 256, 404, 'rectify + regulate', { 'text-anchor': 'middle', 'font-size': 20 }), W(hS[0], 'M256,430 V454 M246,444 L256,456 L266,444', { 'stroke-width': 3 }),
  mono(hS[0], 40, 492, 'OUT · ABOUT 5 V DC', { fill: TE, 'font-size': 20 }), W(hS[0], 'M40,530 H472', { stroke: TE, 'stroke-width': 4 })];
// washing machine
const WS = ['FILL', 'WASH', 'RINSE', 'SPIN'];
const wsP = WS.map((s, i) => { const g = mk(hS[1], 'g'); const r = mk(g, 'rect', { x: 32, y: 220 + i * 72, width: 448, height: 56, rx: 12, fill: C.soft }); const l = tx(g, 56, 256 + i * 72, s, { 'font-family': 'IBM Plex Mono', 'font-size': 24, fill: C.ink2 }); return { g, r, l }; });
const wsT = mono(hS[1], 32, 530, 'a timer moves to the next step', { 'font-size': 19 });
// fridge
const fG = PUC.graph(hS[2], { x: 60, y: 230, w: 400, h: 190, xmax: 10, ymin: 0, ymax: 8, yt: [0, 4, 8], xl: 'time', yl: '°C' });
const fTemp = s => { const p = (s % 2.5) / 2.5; return p < 0.6 ? 3 + 2 * p / 0.6 : 5 - 2 * (p - 0.6) / 0.4; }, frOn = s => ((s % 2.5) / 2.5) >= 0.6;
const fCurve = fG.curve(AM, 4), fDot = fG.dot(AM, 8);
const fChip = document.createElement('div'); fChip.className = 'pillp'; fChip.style.cssText = 'left:32px;top:500px;height:44px;font:600 20px "IBM Plex Mono";letter-spacing:.06em'; hT[2].appendChild(fChip);
const tH = [wt('M2', 'charger'), wt('M3', 'washing'), wt('M4', 'fridge')];

/* ================= B: breadboard, TV remote ================= */
const ck = $('#ckS');
const rem = [W(ck, 'M100,250 H300 A50,50 0 0 1 300,350 H100 A50,50 0 0 1 100,250 Z', { 'stroke-width': 5, fill: '#fff' })];
const btnV = mk(ck, 'circle', { cx: 130, cy: 300, r: 24, fill: '#fff', stroke: INK, 'stroke-width': 3 }), btnC = mk(ck, 'circle', { cx: 200, cy: 300, r: 24, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const btnL = [tx(ck, 130, 308, 'V+', { 'text-anchor': 'middle', 'font-size': 18 }), tx(ck, 200, 308, 'C+', { 'text-anchor': 'middle', 'font-size': 18 })];
const mcuR = mk(ck, 'rect', { x: 250, y: 284, width: 44, height: 32, rx: 4, fill: INK });
const led = mk(ck, 'path', { d: 'M350,284 A16,16 0 0 1 350,316 H340 V284 Z', fill: '#fff', stroke: INK, 'stroke-width': 3 });
const tv = [mk(ck, 'rect', { x: 600, y: 170, width: 290, height: 200, rx: 12, fill: INK }), W(ck, 'M700,370 L680,410 M790,370 L810,410 M660,410 H830', { 'stroke-width': 4 })];
const rcv = mk(ck, 'circle', { cx: 600, cy: 300, r: 10, fill: '#fff', stroke: INK, 'stroke-width': 3 });
const volT = tx(ck, 624, 214, 'VOLUME', { fill: '#fff', 'font-family': 'IBM Plex Mono', 'font-size': 18 });
const volN = tx(ck, 866, 214, '12', { fill: AM, 'font-family': 'IBM Plex Mono', 'font-size': 22, 'text-anchor': 'end' });
const segs = [...Array(16)].map((_, i) => mk(ck, 'rect', { x: 624 + i * 15.5, y: 236, width: 11, height: 40, rx: 2, fill: '#3A4A70' }));
const chT = tx(ck, 745, 330, 'CHANNEL 7', { fill: '#fff', 'font-family': 'IBM Plex Mono', 'font-size': 22, 'text-anchor': 'middle' });
const bLab = [mono(ck, 200, 386, 'remote', { 'text-anchor': 'middle', 'font-size': 18 }), mono(ck, 466, 262, 'infrared: invisible', { 'text-anchor': 'middle', 'font-size': 17 }), mono(ck, 600, 444, 'receiver', { 'text-anchor': 'middle', 'font-size': 18 }), mono(ck, 272, 336, 'chip', { 'text-anchor': 'middle', 'font-size': 14 })];
const beam = [...Array(8)].map(() => mk(ck, 'line', { x1: 0, y1: 300, x2: 0, y2: 300, stroke: AM, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '2 9' }));
const CODES = { V: [1, 0, 1, 1, 0, 0, 1, 0], C: [1, 0, 0, 1, 1, 0, 1, 1] };
const codeSeg = bitsA => { const s = [[0, 0.3]]; let x = 0.45; bitsA.forEach(b => { s.push([x, x + 0.08]); x += 0.08 + (b ? 0.24 : 0.08); }); s.push([x, x + 0.08]); return { s, len: x + 0.08 }; };
const PRESS = [[wt('B2', 'Press'), 'V'], [wt('B4', 'Watch'), 'V'], [wt('B6', 'different'), 'C']].map(([t0, k]) => ({ t0, k, ...codeSeg(CODES[k]) }));
const sigAt = (τ, dl = 0) => { for (const p of PRESS) { const u = τ - p.t0 - dl; if (u >= 0 && u <= p.len) return p.s.some(([a, b]) => u >= a && u < b) ? 1 : 0; } return 0; };
const lastPress = t => { let r = null; for (const p of PRESS) if (t >= p.t0) r = p; return r; };
const SC = scope($('#scS'), 592, 200), tr1 = SC.tr(CH1), tr2 = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · CODE SENT (REMOTE)', CH1), SC.lab(14, 192, 'CH2 · CODE RECEIVED (TV)', AM)];
$('#ro1').innerHTML = `<span class="k n">BUTTON</span><span class="v" id="r1b" style="font-size:30px">-</span><span class="u"></span>
  <span class="k n">CODE</span><span class="v" id="r1c" style="font-size:30px;letter-spacing:.08em">-</span><span class="u"></span>
  <span class="k n">VOLUME</span><span class="v" id="r1v">12</span><span class="u"></span>`;
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So my remote talks in flashes of light!' });

/* ================= P + W: battery ================= */
const bS = $('#bS');
const bat = [mk(bS, 'rect', { x: 170, y: 104, width: 60, height: 26, rx: 6, fill: INK })];
const lvl = mk(bS, 'rect', { x: 116, y: 146, width: 168, height: 338, rx: 10, fill: '#F6CFA6' });
bat.push(mk(bS, 'rect', { x: 100, y: 130, width: 200, height: 370, rx: 20, fill: 'none', stroke: INK, 'stroke-width': 5 }));
const lvlT = tx(bS, 200, 330, '100%', { 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 34, fill: INK });
const bCap = mono(bS, 200, 548, '4000 mAh', { 'text-anchor': 'middle', fill: OR, 'font-size': 22, 'font-weight': 600 });
$('#bRo').innerHTML = `<span class="k" style="color:${OR}">Q</span><span class="v" id="bQ" style="color:${OR}">?</span><span class="u">mAh</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="bI" style="color:${VI}">?</span><span class="u">mA</span>
  <span class="k">t</span><span class="v" id="bT">0.0</span><span class="u">h</span>`;
const bArr = PUC.arrow(bS, VI), bArrL = tx(bS, 590, 440, 'to the phone', { 'text-anchor': 'middle', fill: VI, 'font-size': 22 });
const pRows = steps($('#pSteps'), [[K(`\\text{mA} \\times \\text{h} = \\text{mAh}`), 'current × time', 92], [K(`\\textcolor{${OR}}{Q} = \\textcolor{${VI}}{I}\\,t`), 'that is charge', 196], [K(`t = \\dfrac{\\textcolor{${OR}}{\\text{capacity}}}{\\textcolor{${VI}}{I}}`), 'battery life', 314]]);
const tPr = [wt('P2', 'milliampere'), wt('P3', 'charge'), wt('P4', 'lasts')];
const wRows = steps($('#wSteps'), [[K(`\\textcolor{${OR}}{4000\\,\\text{mAh}},\\quad \\textcolor{${VI}}{I} = 250\\,\\text{mA}`), '', 92], [K(`t = \\dfrac{4000\\,\\text{mAh}}{250\\,\\text{mA}}`), '', 196], [K(`t = 16\\,\\text{h}`), 'mA cancels, hours remain', 334]]);
const tWr = [wt('W1', 'rated'), wt('W2', 't'), wt('W3', 'That')];

/* ================= G: impact ================= */
const GG = [['video', 'Talk face to face', 'across the world'], ['coin', 'Pay with a phone', 'digital payments'], ['book', 'Learn online', 'classes anywhere'], ['heart', 'Hospitals watch patients', 'every second'], ['home', 'Alarms keep homes safe', 'sensors never sleep']];
const GB = [['trash', 'Electronic waste', 'harmful metals like lead'], ['eye', 'Too much screen time', 'strains eyes and sleep'], ['lock', 'Online fraud', 'a real risk']];
$('#gRows').innerHTML = GG.map(([ic, a, b], i) => `<div class="gr" style="top:${78 + i * 92}px"><div class="ic" style="background:${C.okBg}">${M.icon(ic, 26, C.ok, 2.2)}</div><div><div class="t1">${a}</div><div class="t2">${b}</div></div></div>`).join('');
$('#bRows').innerHTML = GB.map(([ic, a, b], i) => `<div class="gr" style="top:${78 + i * 92}px"><div class="ic" style="background:${C.redBg}">${M.icon(ic, 26, C.red, 2.2)}</div><div><div class="t1">${a}</div><div class="t2">${b}</div></div></div>`).join('') +
  `<div class="gr" id="gFix" style="top:372px;background:${C.ink};color:#fff"><div class="ic" style="background:${AM}">${M.icon('check', 26, '#fff', 3)}</div><div><div class="t1">Recycle, take breaks,</div><div class="t2" style="color:#D9DCE3">never share a password</div></div></div>`;
const gR = [...$('#gRows').children], bR = [...$('#bRows').children];
const tGg = [wt('G2', 'talk'), wt('G2', 'pay'), wt('G2', 'learn'), wt('G3', 'Hospitals'), wt('G3', 'alarms')], tGb = [wt('G5', 'electronic'), wt('G6', 'screen'), wt('G6', 'fraud'), T1('G6') - 0.3];
const avG = PUC.avatar($('#sG'), { x: 1008, y: 776, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'My old phone goes to a recycler!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'mAh is a unit of current', right: 'mAh is a unit of charge: I × t', y0: 96, y1: 184 });
$('#tcF').innerHTML = `<div class="fl0" style="position:absolute;left:36px;top:92px;font-size:38px;white-space:nowrap">${K(`1\\,\\text{mAh} = 10^{-3}\\,\\text{A} \\times 3600\\,\\text{s}`)}</div><div class="fl1" style="position:absolute;left:36px;top:180px;font-size:46px;white-space:nowrap">${K(`= \\textcolor{${OR}}{3.6\\,\\text{C}}`)}</div>`;
const tcF = [...$('#tcF').children];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Impact of electronics on daily life: advantages, disadvantages, parts of a common device' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A phone battery is rated 3000&nbsp;mAh. How much charge can it deliver, in coulombs?', qW: 780,
  opts: [K('3000\\,\\text{C}'), K('10\\,800\\,\\text{C}'), K('3.6\\,\\text{C}'), K('180\\,000\\,\\text{C}')], right: 1, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`3000\\,\\text{mAh} = 3\\,\\text{Ah}`)], [K(`1\\,\\text{h} = 3600\\,\\text{s}`)], [K(`\\textcolor{${OR}}{Q} = \\textcolor{${VI}}{I}\\,t = 3 \\times 3600`)], [K(`\\textcolor{${OR}}{Q} = 10\\,800\\,\\text{C}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Three'), wt('A3', 'One'), wt('A4', 'So'), wt('A4', 'which')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 112, title: 'Electronics in everyday life · formula card', txt: [0, 0, 1, 1],
  lines: [K(`t = \\dfrac{\\textcolor{${OR}}{\\text{capacity}}}{\\textcolor{${VI}}{I}} \\qquad \\textcolor{${OR}}{Q} = \\textcolor{${VI}}{I}\\,t`),
    K(`1\\,\\text{mAh} = 3.6\\,\\text{C} \\qquad \\text{mains} = 230\\,\\text{V AC}`),
    'Every device: sense → process → show or act',
    'Impact: easier lives, but e-waste, screen time and fraud'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 06', topic: 'Electric charge, current, voltage and potential difference', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('B3', 'infrared') - 0.2, 1.1, 640, 560], [T0('B4'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[wt('I2', 'sensor'), tM], [tH[2], tB], [wt('B2', 'Press'), tP], [tW, tG]];

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
    drawSeq(dtP, t, tMorph + 0.5, 0.5); [dtScr, dtTip, dtBtn].forEach((e, i) => M.vis(e, t, tMorph + 0.8 + i * 0.08, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#aPill'), t, tMorph + 0.9, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const tv0 = 35 + (TEMP - 35) * M.o3((t - tHold - 0.3) / Math.max(1, tBeep - tHold - 0.4)), s = t < tHold ? '' : tv0.toFixed(1);
    M.setT(dtNum, s); M.setT($('#thN'), t < tHold ? '35.0' : tv0.toFixed(1));
    M.vis($('#thC'), t, tHold - 0.1, out, { dx: 60, dy: 0, ...o }); fadeAt([$('#thN'), $('#thU'), $('#thL')], t, tHold + 0.1);
    M.vis($('#thP'), t, tBeep - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }); $('#thN').style.color = t >= tBeep ? C.red : AM;
    M.vis($('#olC'), t, wt('H2', 'mercury') - 0.1, out, { dy: 36, ...o });
    glass.forEach((g, i) => M.vis(g, t, wt('H2', 'mercury') + i * 0.1, 1e9, { dy: 0, fade: 0.2 })); M.draw(ticks, t, wt('H2', 'mercury') + 0.2, 0.4);
    PUC.attr(merc, 'width', (330 * M.o3((t - wt('H2', 'mercury') - 0.3) / 6)).toFixed(1));
    M.vis($('#olP'), t, wt('H2', 'squinting'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* I: thermometer chain */
  const iOn = t >= tI - 0.05 && t < tM + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    M.vis($('#iC'), t, tI + 0.1, tM - 0.32, { dy: 36, ...o });
    iBl.forEach((b, i) => { M.vis(b, t, tI + 0.3 + i * 0.12, 1e9, { dx: -20, dy: 0 }); b.querySelector('.lv').style.opacity = t < tIb[i] - 0.1 ? 0 : 1; b.style.borderColor = M.mix(C.line, AM, M.io((t - tIb[i]) / 0.3)); });
    iAr.forEach((a, i) => M.draw(a, t, tIb[i + 1] - 0.3, 0.3));
    iBr.forEach((b, i) => M.vis(b, t, [tIb[0] + 0.3, tIb[2] + 0.2, tIb[3] + 0.3][i], 1e9, { dy: 10 }));
    iRest.forEach(e => M.vis(e, t, wt('I2', 'warms') - 0.2, 1e9, { dy: 10 }));
    const T = Tof(t), lv = iBl.map(b => b.querySelector('.lv'));
    setH(lv[0], `<span style="color:${INK}">R = ${Rth(T).toFixed(2)} kΩ</span>`);
    setH(lv[1], `<span style="color:${TE}">${Vth(T).toFixed(3)} V</span> <span style="color:${MU};font-size:24px">→ ${Math.round(Vth(T) / 3.3 * 4095)}</span>`);
    setH(lv[2], `T = ${T.toFixed(1)} °C`); setH(lv[3], `<span style="color:${AM};font-size:44px">${T.toFixed(1)}</span>`);
    $('#tBar i').style.width = (1528 * (T - 35) / 5).toFixed(1) + 'px';
  }

  /* M: home */
  const mOn = t >= tM - 0.05 && t < tB + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tB - 0.32;
    hT.forEach((h, i) => { M.vis(h, t, tM + 0.2 + i * 0.12, out, { dy: 36, ...o }); h.querySelector('.ic').style.background = M.mix(C.soft, C.ac2, M.io((t - tH[i]) / 0.3)); });
    drawSeq(ch, t, tH[0] + 0.1, 0.35, 0.18); ch.forEach(e => { if (e.tagName === 'text') M.vis(e, t, tH[0] + 0.1, 1e9, { dy: 0, fade: 0.2 }); });
    const wsu = t < wt('M3', 'fill') ? -1 : Math.floor((t - wt('M3', 'fill')) / 0.7) % 4;
    wsP.forEach((p, i) => { M.vis(p.g, t, tH[1] + 0.2 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); PUC.attr(p.r, 'fill', wsu === i ? AM : C.soft); PUC.attr(p.l, 'fill', wsu === i ? '#FFFFFF' : C.ink2); });
    M.vis(wsT, t, tH[1] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.draw(fG.axes, t, tH[2] + 0.2, 0.4); const fs = M.clamp((t - tH[2] - 0.4) / 5) * 10;
    fCurve(v => [v, fTemp(v)], 0, fs); fDot(fs, fTemp(fs), t >= tH[2] + 0.4);
    M.vis(fChip, t, tH[2] + 0.5, 1e9, { dy: 0, fade: 0.2 }); const on = frOn(fs); M.setT(fChip, on ? 'COMPRESSOR ON' : 'COMPRESSOR OFF'); fChip.style.background = on ? AM : C.soft; fChip.style.color = on ? '#fff' : INK;
  }

  /* B: breadboard, TV remote */
  const bOn = t >= tB - 0.05 && t < tP + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tP - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    drawSeq(rem, t, tB + 0.4, 0.4); [btnV, btnC, mcuR, led].forEach((e, i) => M.vis(e, t, tB + 0.6 + i * 0.08, 1e9, { dy: 0, fade: 0.2 })); fadeAt(btnL, t, tB + 0.7);
    tv.forEach((e, i) => M.vis(e, t, tB + 0.7 + i * 0.1, 1e9, { dy: 0, fade: 0.2 })); M.vis(rcv, t, tB + 0.9, 1e9, { dy: 0, fade: 0.2 });
    [volT, volN, chT, ...segs].forEach((e, i) => M.vis(e, t, tB + 1.0 + i * 0.02, 1e9, { dy: 0, fade: 0.2 })); fadeAt(bLab, t, tB + 1.0, 0.1);
    const s1 = sigAt(t), lp = lastPress(t);
    PUC.attr(led, 'fill', s1 ? AM : '#FFFFFF');
    [btnV, btnC].forEach((b, i) => { const pr = lp && t - lp.t0 < 0.35 && lp.k === (i ? 'C' : 'V'); PUC.attr(b, 'fill', pr ? C.ac2 : '#FFFFFF'); PUC.attr(b, 'r', pr ? 21 : 24); });
    beam.forEach((l, k) => { const tau = t - k * 0.06, on = sigAt(tau) && t >= tB; const x = 360 + (k / 7) * 228; PUC.attr(l, 'x1', (x - 14).toFixed(1)); PUC.attr(l, 'x2', (x + 14).toFixed(1)); M.hide(l, !on); });
    PUC.attr(rcv, 'fill', sigAt(t, 0.05) ? AM : '#FFFFFF');
    // received presses -> volume / channel
    let vol = 12, chn = 7; PRESS.forEach(p => { if (t >= p.t0 + p.len + 0.1) { if (p.k === 'V') vol++; else chn++; } });
    M.setT(volN, String(vol)); segs.forEach((g, i) => PUC.attr(g, 'fill', i < vol ? AM : '#3A4A70')); M.setT(chT, 'CHANNEL ' + chn); M.setT($('#r1v'), String(vol));
    M.setT($('#r1b'), lp ? (lp.k === 'V' ? 'VOLUME +' : 'CHANNEL +') : '-');
    if (lp) { const u = t - lp.t0, nb = lp.s.filter(([a]) => u >= a + 0.05).length - 1; M.setT($('#r1c'), CODES[lp.k].slice(0, Math.max(0, Math.min(8, nb))).join('') || '·'); } else M.setT($('#r1c'), '-');
    tr1(τ => 44 * sigAt(τ), t, tB + 0.5, 6, 84, t >= tB + 0.5); tr2(τ => 40 * sigAt(τ, 0.05), t, tB + 0.5, 6, 166, t >= tB + 0.5);
    sLab.forEach(e => M.vis(e, t, tB + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.vis($('#slowT'), t, T0('B4'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avB(t, wt('B6', 'talks') - 0.2, out);
  }

  /* P + W: battery */
  const pOn = t >= tP - 0.05 && t < tG + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tG - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    bat.forEach((b, i) => M.vis(b, t, tP + 0.4 + i * 0.1, 1e9, { dy: 0, fade: 0.2 })); M.vis(lvl, t, tP + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(lvlT, t, tP + 0.7, 1e9, { dy: 0, fade: 0.2 });
    M.vis(bCap, t, wt('P2', 'capacity') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#bRo'), t, tP + 0.6, 1e9, { dy: 14 });
    const d0 = tWr[1], d1 = T1('W3') - 0.2, u = M.clamp((t - d0) / (d1 - d0)), hrs = 16 * u, lev = 1 - u;
    PUC.attr(lvl, 'height', (338 * lev).toFixed(1)); PUC.attr(lvl, 'y', (146 + 338 * (1 - lev)).toFixed(1)); M.setT(lvlT, Math.round(100 * lev) + '%');
    M.setT($('#bQ'), t >= tWr[0] ? String(Math.round(4000 * lev)) : '?'); M.setT($('#bI'), t >= tWr[0] ? '250' : '?'); M.setT($('#bT'), hrs.toFixed(1));
    const ia = M.io((t - wt('P4', 'draws') + 0.1) / 0.5); bArr.set(320, 400, 320 + 380 * ia, 400); M.vis(bArrL, t, wt('P4', 'draws') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pRL1'), t, tP + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#pRL2'), t, tW + 0.1, 1e9, { dy: 10 });
    runSteps(pRows, t, tPr, tW - 0.3); M.vis($('#pBox'), t, tPr[2] + 0.5, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    wRows.forEach((r, i) => M.hide(r, t < tWr[i] - 0.15)); runSteps(wRows, t, tWr);
    M.vis($('#wBox'), t, tWr[2] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* G: impact */
  const gOn = t >= tG - 0.05 && t < tT + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    M.vis($('#gL'), t, tG + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#gR'), t, tG + 0.25, 1e9, { dx: 60, dy: 0 });
    gR.forEach((r, i) => M.vis(r, t, tGg[i] - 0.15, 1e9, { dx: -24, dy: 0 }));
    bR.forEach((r, i) => { if (i < 3) { M.vis(r, t, tG + 0.5 + i * 0.1, 1e9, { dy: 0, fade: 0.2 }); const u = M.io((t - tGb[i] + 0.15) / 0.3); if (t >= tG + 0.7) r.style.opacity = (0.28 + 0.72 * u).toFixed(3); r.style.filter = u < 1 ? `grayscale(${(1 - u).toFixed(2)})` : ''; } else M.vis(r, t, tGb[i] - 0.15, 1e9, { dx: -24, dy: 0 }); });
    avG(t, T1('G6') + 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tX; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tX - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'Using') - 0.2, { out: tX - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Milliampere') - 0.1 });
    PUC.write(tcF[0], t, wt('X3', 'Current'), 0.6); PUC.write(tcF[1], t, wt('X3', 'three'), 0.5);
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Explain') - 0.2 });
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
