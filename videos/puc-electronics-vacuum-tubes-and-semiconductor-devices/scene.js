// PUC Electronics Ep 2 - Vacuum tubes and semiconductor devices ("Breadboard" style, Lab Notebook world)
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

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'For') - 0.25;
const tE = T0('E1'), tB = T0('B1'), tP = T0('P1'), tS = T0('S1'), tJ = T0('J1'), tT = T0('T1'), tW = T0('W1'), tC = T0('C1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tW], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const radS = $('#radS');
const radP = [W(radS, 'M38,60 H292 A18,18 0 0 1 310,78 V252 A18,18 0 0 1 292,270 H38 A18,18 0 0 1 20,252 V78 A18,18 0 0 1 38,60 Z', { 'stroke-width': 5, fill: '#fff' }),
  W(radS, 'M248,60 L292,14', { 'stroke-width': 4 }),
  mk(radS, 'circle', { cx: 112, cy: 166, r: 66, fill: '#F3F1EA', stroke: INK, 'stroke-width': 4 }),
  W(radS, 'M66,140 H158 M60,166 H164 M66,192 H158', { 'stroke-width': 3, stroke: '#B8BCC6' }),
  W(radS, 'M204,98 H290 V136 H204 Z', { 'stroke-width': 3, fill: '#fff' }),
  mk(radS, 'circle', { cx: 222, cy: 222, r: 16, fill: '#fff', stroke: INK, 'stroke-width': 3 }), mk(radS, 'circle', { cx: 272, cy: 222, r: 16, fill: '#fff', stroke: INK, 'stroke-width': 3 })];
const radNeedle = W(radS, 'M226,102 V132', { stroke: AM, 'stroke-width': 4 });
radP.forEach(e => { if (e.tagName === 'circle') e.setAttribute('pathLength', 1); });
// tube with a filament that warms up
const rtS = $('#rtS');
const tubeG = [W(rtS, 'M67,168 V70 A48,48 0 0 1 163,70 V168 Z', { fill: '#fff' }), W(rtS, 'M90,60 H140', { 'stroke-width': 7 }), W(rtS, 'M90,180 V198 M115,180 V198 M140,180 V198', { 'stroke-width': 3 })];
const rtFil = W(rtS, 'M88,150 L100,122 L112,150 L124,122 L136,150 L142,138', { stroke: '#B8BCC6', 'stroke-width': 5 });
const rtGlow = mk(rtS, 'rect', { x: 67, y: 100, width: 96, height: 68, rx: 4, fill: AM, opacity: 0 });
rtS.insertBefore(rtGlow, rtFil);
const phS = $('#phS');
const phP = [W(phS, 'M85,24 H145 A16,16 0 0 1 161,40 V178 A16,16 0 0 1 145,194 H85 A16,16 0 0 1 69,178 V40 A16,16 0 0 1 85,24 Z', { 'stroke-width': 5, fill: '#fff' }), W(phS, 'M105,38 H125')];
const phScr = mk(phS, 'rect', { x: 80, y: 50, width: 70, height: 128, rx: 6, fill: C.ac2 });
const phNote = W(phS, 'M104,140 V96 L132,90 V132 M104,140 a8,6 0 1 1 -1,-1 M132,132 a8,6 0 1 1 -1,-1', { stroke: AM, 'stroke-width': 4 });
const waveP = (svg) => mk(svg, 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const rW = waveP($('#rWav')), pW = waveP($('#pWav'));
const setWave = (p, t, t0, amp, ph) => { if (amp <= 0.01) { PUC.attr(p, 'd', ''); return; } let d = ''; for (let i = 0; i <= 80; i++) { const x = 4 + 432 * i / 80, env = Math.sin(Math.PI * i / 80); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (35 - amp * 26 * env * Math.sin(i * 0.55 - 9 * (t - t0) + ph) * (0.6 + 0.4 * Math.sin(i * 0.13))).toFixed(1); } PUC.attr(p, 'd', d); };
const tFor = wt('H1', 'For'), tMus = wt('H1', 'music'), tPh = wt('H2', 'phone'), tTub = wt('I1', 'vacuum');

/* ================= E: thermionic emission ================= */
const eS = $('#eS');
const vacL = mono(eS, 60, 112, 'VACUUM ABOVE THE SURFACE', { 'font-size': 18, 'letter-spacing': '1.5' });
const block = mk(eS, 'rect', { x: 60, y: 290, width: 664, height: 130, rx: 10, fill: '#E3E6EC', stroke: INK, 'stroke-width': 3 });
const blockL = mono(eS, 724, 456, 'tungsten', { 'text-anchor': 'end', 'font-size': 18 });
const barrier = mk(eS, 'line', { x1: 60, y1: 270, x2: 724, y2: 270, stroke: AM, 'stroke-width': 3, 'stroke-dasharray': '10 8' });
const barL = tx(eS, 60, 256, 'surface barrier: needs energy φ', { 'font-size': 22, fill: '#B7791F' });
const heat = W(eS, 'M200,448 L220,436 L240,460 L260,436 L280,460 L300,436 L320,460 L340,436 L360,460 L380,436 L400,460 L420,436 L440,460 L460,436 L480,460 L500,436 L520,460 L540,436 L560,460 L580,448', { stroke: '#B8BCC6', 'stroke-width': 5 });
const heatL = mono(eS, 60, 456, 'heater', { 'font-size': 18 });
const EIN = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 11; c++) EIN.push([96 + c * 58 + (r % 2) * 22, 316 + r * 40, 1.3 + ((c * 7 + r * 3) % 5) * 0.37, (c * 1.7 + r * 2.3)]);
const eIn = EIN.map(() => mk(eS, 'circle', { r: 7, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const NESC = 9, eOut = [...Array(NESC)].map(() => mk(eS, 'circle', { r: 7, fill: AM, stroke: INK, 'stroke-width': 1.5 }));
const eRows = steps($('#eSteps'), [
  [K(`\\text{energy} \\ge \\phi`), 'to escape the surface', 92],
  [K(`\\phi_{\\text{tungsten}} \\approx 4.5\\,\\text{eV}`), 'its work function', 192],
  [K(`1\\,\\text{eV} = 1.6\\times10^{-19}\\,\\text{J}`), 'a tiny energy unit', 292],
  [`Heat lifts the energy above ${K('\\phi')}`, '', 392, 1]]);
$('#eZ').innerHTML = M.icon('zap', 34, AM, 2.4);
const tE1 = [wt('E2', 'minimum'), wt('E3', 'tungsten'), wt('E3', 'An'), wt('E5', 'Some')], tHeat = wt('E4', 'heat');
const avE = PUC.avatar($('#sE'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So that is why the old radio makes me wait!' });

/* ================= B: breadboard, vacuum diode ================= */
const ck = $('#ckS');
const env = mk(ck, 'circle', { cx: 440, cy: 230, r: 82, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const bW = [W(ck, 'M150,276 V230 H404'), W(ck, 'M478,230 H780 V300'), W(ck, 'M780,300 L760,310 L800,330 L760,350 L800,370 L760,390 L800,410 L780,420'), W(ck, 'M780,420 V480 H150 V364')];
const cath = W(ck, 'M404,192 V268', { 'stroke-width': 7 }), anode = W(ck, 'M478,186 V274', { 'stroke-width': 7 });
const fil = W(ck, 'M378,294 L390,282 L402,294 L414,282 L426,294', { stroke: AM, 'stroke-width': 4 });
const src = [mk(ck, 'circle', { cx: 150, cy: 320, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(ck, sineP(150, 320, 10, 24))];
const bLab = [tx(ck, 430, 346, 'Cathode', { 'text-anchor': 'end' }), mono(ck, 430, 372, 'heated', { 'text-anchor': 'end' }),
  tx(ck, 452, 346, 'Anode'), mono(ck, 452, 372, 'plate'), mono(ck, 440, 170, 'vacuum', { 'text-anchor': 'middle', 'font-size': 16 })];
const bLab2 = [tx(ck, 186, 424, 'AC supply'), mono(ck, 186, 452, 'swings + and -'), tx(ck, 826, 366, 'R', { 'font-style': 'italic', 'font-size': 30 }), mono(ck, 826, 394, 'load')];
const aSign = tx(ck, 540, 210, '+', { 'font-size': 36, fill: TE, 'text-anchor': 'middle' });
const eB = flow(ck, [[404, 230], [478, 230], [780, 230], [780, 480], [150, 480], [150, 230], [404, 230]], 26, {
  skip: (x, y) => (x > 752 && x < 808 && y > 296 && y < 424) || Math.hypot(x - 150, y - 320) < 48 });
const tPos = wt('B4', 'positive'), tNeg = wt('B5', 'negative');
const nCyc = Math.max(0, Math.round((tNeg - tPos) / 2.2 - 0.5)), PER = (tNeg - tPos) / (nCyc + 0.5), tSig = tPos - PER / 4;
const sig = τ => τ < tSig ? 0 : Math.sin(2 * Math.PI * (τ - tSig) / PER);
const half = τ => Math.max(0, sig(τ));
const area = τ => { if (τ < tSig) return 0; const u = (τ - tSig) / PER, k = Math.floor(u), f = u - k; return k * PER / Math.PI + (f < 0.5 ? PER / (2 * Math.PI) * (1 - Math.cos(2 * Math.PI * f)) : PER / Math.PI); };
const SC = scope($('#scS'), 592, 200);
const trIn = SC.tr(CH1), trOut = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · V IN (SUPPLY)', CH1), SC.lab(14, 192, 'CH2 · V ACROSS R', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" id="r1V" style="color:${TE}">+0.0</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="r1I" style="color:${VI}">0.0</span><span class="u">mA</span>
  <span class="k n">DIODE</span><span class="v" id="r1S" style="font-size:30px">-</span><span class="u"></span>`;

/* ================= P: triode + trouble with tubes ================= */
const trS = $('#tS');
const tEnv = mk(trS, 'circle', { cx: 392, cy: 214, r: 112, fill: '#fff', stroke: INK, 'stroke-width': 4 });
const tParts = [W(trS, 'M316,150 V278', { 'stroke-width': 7 }), W(trS, 'M470,140 V288', { 'stroke-width': 7 }), W(trS, 'M182,214 H316', {}), W(trS, 'M470,214 H600', {})];
const tGrid = W(trS, 'M392,128 V300', { 'stroke-width': 4, 'stroke-dasharray': '6 9', stroke: TE });
const tGL = [W(trS, 'M392,128 V84', { stroke: TE, 'stroke-width': 3 }), tx(trS, 392, 72, 'Grid', { 'text-anchor': 'middle', fill: TE })];
const tLab = [tx(trS, 172, 202, 'Cathode', { 'text-anchor': 'end' }), tx(trS, 612, 202, 'Anode')];
const trFl = [196, 226].map(y => flow(trS, [[322, y], [464, y]], 4, { r: 6 }));
const tSv = mk(trS, 'svg', { x: 40, y: 356, width: 704, height: 200 });
const SC2 = scope(tSv, 704, 200), trG = SC2.tr(CH1), trA = SC2.tr(AM);
const tSL = [SC2.lab(14, 24, 'CH1 · GRID VOLTAGE (SMALL)', CH1), SC2.lab(14, 190, 'CH2 · ANODE CURRENT (BIG)', AM)];
const tGr = wt('P1', 'grid'), tSm = wt('P2', 'small');
const gs = τ => τ < tSm ? 0 : Math.sin(2 * Math.PI * 0.5 * (τ - tSm));
const PR = [['zap', 'Heater wastes power', 'energy lost as heat'], ['clock', 'Slow to warm up', 'seconds before it works'], ['arrowU', 'Hundreds of volts', 'needed at the anode'], ['x', 'Fragile, short-lived', 'glass breaks, heater burns out']];
$('#pRows').innerHTML = PR.map(([ic, a, b], i) => `<div class="pr" style="top:${84 + i * 124}px"><div class="ic">${M.icon(ic, 30, C.red, 2.4)}</div><div><div class="t1">${a}</div><div class="t2">${b}</div></div></div>`).join('');
const pRows = [...$('#pRows').children], tPr = [wt('P3', 'heater'), wt('P3', 'time'), wt('P4', 'hundreds'), wt('P4', 'glass')];
const GR = [['plus', 'A wire mesh: the grid', 'between the cathode and the anode'], ['zap', 'Small grid voltage', 'controls a big anode current'], ['chart', 'The triode amplifies', 'a weak signal comes out stronger']];
$('#pGrid').innerHTML = GR.map(([ic, a, b], i) => `<div class="pr" style="top:${84 + i * 124}px"><div class="ic" style="background:${C.okBg}">${M.icon(ic, 30, C.ok, 2.4)}</div><div><div class="t1">${a}</div><div class="t2">${b}</div></div></div>`).join('');
const gRows = [...$('#pGrid').children], tGrw = [wt('P1', 'grid'), wt('P2', 'controls'), wt('P2', 'amplify')];

/* ================= S: semiconductors and doping ================= */
const lS = $('#lS'), AX = c => 120 + c * 136, AY = r => 150 + r * 130;
const bondG = mk(lS, 'g'), BD = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
  if (c < 4) { const x1 = AX(c) + 34, x2 = AX(c + 1) - 34, y = AY(r); BD.push({ k: `h${c}${r}`, l: [mk(bondG, 'line', { x1, y1: y - 7, x2, y2: y - 7, stroke: '#CBD0DA', 'stroke-width': 3 }), mk(bondG, 'line', { x1, y1: y + 7, x2, y2: y + 7, stroke: '#CBD0DA', 'stroke-width': 3 })], d: [[(x1 + x2) / 2 - 12, y], [(x1 + x2) / 2 + 12, y]] }); }
  if (r < 2) { const y1 = AY(r) + 34, y2 = AY(r + 1) - 34, x = AX(c); BD.push({ k: `v${c}${r}`, l: [mk(bondG, 'line', { x1: x - 7, y1, x2: x - 7, y2, stroke: '#CBD0DA', 'stroke-width': 3 }), mk(bondG, 'line', { x1: x + 7, y1, x2: x + 7, y2, stroke: '#CBD0DA', 'stroke-width': 3 })], d: [[x, (y1 + y2) / 2 - 12], [x, (y1 + y2) / 2 + 12]] }); }
}
const bondDots = []; BD.forEach(b => b.d.forEach(([x, y], j) => bondDots.push({ b: b.k, j, el: mk(lS, 'circle', { cx: x, cy: y, r: 6, fill: AM, stroke: INK, 'stroke-width': 1.2 }) })));
const ATOMS = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const g = mk(lS, 'g'); const ci = mk(g, 'circle', { cx: AX(c), cy: AY(r), r: 32, fill: '#E3E6EC', stroke: '#B8BCC6', 'stroke-width': 2.5 });
  const lb = tx(g, AX(c), AY(r) + 8, 'Si', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2 }); ATOMS.push({ c, r, g, ci, lb }); }
const atom = (c, r) => ATOMS.find(a => a.c === c && a.r === r);
const freeE = mk(lS, 'circle', { r: 8, fill: AM, stroke: INK, 'stroke-width': 2 });
const holeC = mk(lS, 'circle', { r: 8, fill: '#fff', stroke: OR, 'stroke-width': 3.5 });
const leg = document.createElement('div'); leg.style.cssText = 'position:absolute;left:36px;top:516px;display:flex;align-items:center;gap:14px;white-space:nowrap;font:500 22px Poppins;color:' + MU;
leg.innerHTML = `<svg width="22" height="22"><circle cx="11" cy="11" r="8" fill="${AM}" stroke="${INK}" stroke-width="1.5"/></svg><span>electron</span><span style="width:28px"></span><svg width="22" height="22"><circle cx="11" cy="11" r="8" fill="#fff" stroke="${OR}" stroke-width="3"/></svg><span>hole, acts like +</span>`;
$('#sL').appendChild(leg);
// free electron wanders along the gaps between atoms (n-type)
const fPath = [[256, 280], [324, 215], [460, 215], [528, 150], [596, 215], [596, 345], [460, 345], [324, 345], [188, 345], [188, 215], [324, 215]];
const fFlow = (() => { const seg = []; let L = 0; for (let i = 0; i < fPath.length - 1; i++) { const l = Math.hypot(fPath[i + 1][0] - fPath[i][0], fPath[i + 1][1] - fPath[i][1]); seg.push([...fPath[i], ...fPath[i + 1], L, l]); L += l; }
  return s => { s = Math.min(s, L * 3); const ss = s <= seg[0][5] ? s : seg[0][5] + ((s - seg[0][5]) % (L - seg[0][5])); for (const q of seg) if (ss <= q[4] + q[5] + 1e-6) { const u = (ss - q[4]) / q[5]; return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; } return fPath[0]; }; })();
// hole hops: missing bond electron next to boron (3,1), then neighbouring electrons jump in
const HOLE = [['h31', 0], ['h21', 1], ['v21', 1], ['h20', 1], ['h10', 0], ['v10', 1]];
const dT = [0, 1, 2].map(i => $('#dT' + i));
const t0S = dT[0].querySelector('svg');
const scale = [['Insulator', 24, 210, '#F4F5F7'], ['Semiconductor', 238, 244, C.ac2], ['Conductor', 506, 190, '#F4F5F7']];
scale.forEach(([n, x, w, f]) => { mk(t0S, 'rect', { x, y: 58, width: w - 8, height: 50, rx: 10, fill: f, stroke: n === 'Semiconductor' ? AM : '#D9DCE3', 'stroke-width': 2.5 }); tx(t0S, x + (w - 8) / 2, 91, n, { 'text-anchor': 'middle', 'font-size': 22, fill: n === 'Semiconductor' ? INK : MU }); });
mk(dT[1].querySelector('svg'), 'circle', { cx: 650, cy: 66, r: 16, fill: AM, stroke: INK, 'stroke-width': 2 });
mk(dT[2].querySelector('svg'), 'circle', { cx: 650, cy: 66, r: 16, fill: '#fff', stroke: OR, 'stroke-width': 4 });
$('#sZ').innerHTML = M.icon('flask', 28, AM, 2.2);
const tSemi = wt('S2', 'semiconductor'), tShare = wt('S3', 'shares'), tPh2 = wt('S4', 'phosphorus'), tFree = wt('S4', 'free'), tBor = wt('S5', 'boron'), tHole = wt('S5', 'hole');

/* ================= J: p-n junction ================= */
const jS = $('#jS'), JX = 460;
const pReg = mk(jS, 'rect', { x: 200, y: 120, width: 260, height: 180, fill: '#FBEBDD' }), nReg = mk(jS, 'rect', { x: 460, y: 120, width: 260, height: 180, fill: '#FFF4D6' });
const dep = mk(jS, 'rect', { x: JX, y: 120, width: 0, height: 180, fill: '#EEF0F4' });
const depE = [mk(jS, 'line', { x1: JX, y1: 120, x2: JX, y2: 300, stroke: '#9AA0AC', 'stroke-width': 2, 'stroke-dasharray': '6 6' }), mk(jS, 'line', { x1: JX, y1: 120, x2: JX, y2: 300, stroke: '#9AA0AC', 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
const jBox = mk(jS, 'rect', { x: 200, y: 120, width: 520, height: 180, rx: 6, fill: 'none', stroke: INK, 'stroke-width': 4 });
const CAR = []; for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) {
  const hx = 236 + i * 44 + (r % 2) * 10, ex = 684 - i * 44 - (r % 2) * 10, y = 160 + r * 50;
  CAR.push({ x: hx, y, el: mk(jS, 'circle', { cx: hx, cy: y, r: 9, fill: '#fff', stroke: OR, 'stroke-width': 3.5 }), ion: tx(jS, hx, y + 9, '−', { 'text-anchor': 'middle', 'font-size': 30, fill: '#9AA0AC' }) });
  CAR.push({ x: ex, y, el: mk(jS, 'circle', { cx: ex, cy: y, r: 9, fill: AM, stroke: INK, 'stroke-width': 1.5 }), ion: tx(jS, ex, y + 9, '+', { 'text-anchor': 'middle', 'font-size': 28, fill: '#9AA0AC' }) }); }
const jLab = [tx(jS, 330, 340, 'p-type', { 'text-anchor': 'middle', fill: '#B4560F' }), tx(jS, 590, 340, 'n-type', { 'text-anchor': 'middle', fill: '#B7791F' })];
const depL = mono(jS, JX, 104, 'depletion layer', { 'text-anchor': 'middle', 'font-size': 18, fill: INK });
const barJ = tx(jS, JX, 340, '≈ 0.7 V', { 'text-anchor': 'middle', fill: TE, 'font-size': 24 });
const jW = [W(jS, 'M200,210 H120 V500 H418'), W(jS, 'M446,500 H640'), W(jS, 'M640,500 L650,482 L670,518 L690,482 L710,518 L730,482 L740,500'), W(jS, 'M740,500 H800 V210 H720')];
const bLong = W(jS, 'M420,466 V534', { 'stroke-width': 5 }), bShort = W(jS, 'M444,482 V518', { 'stroke-width': 9 });
const jSgn = [tx(jS, 404, 462, '+', { 'text-anchor': 'middle', 'font-size': 30 }), tx(jS, 462, 462, '−', { 'text-anchor': 'middle', 'font-size': 30 })];
const jRl = [tx(jS, 690, 466, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), mono(jS, 432, 572, 'adjustable supply', { 'text-anchor': 'middle', 'font-size': 18 })];
const eJ = flow(jS, [[446, 500], [640, 500], [740, 500], [800, 500], [800, 210], [720, 210], [200, 210], [120, 210], [120, 500], [418, 500]], 22, {
  skip: (x, y) => (x > 196 && x < 724 && y > 116 && y < 304) || (x > 636 && x < 744 && y > 470) });
const Is = 15 / Math.exp(0.78 / 0.045), Id = V => V <= 0 ? 0 : Is * (Math.exp(V / 0.045) - 1);
const tFw = wt('J4', 'Connect'), tFw2 = wt('J5', 'current'), tFl = wt('J6', 'flip'), tCross = wt('J2', 'cross'), tDepl = wt('J2', 'depletion');
const Vof = t => t < tFw ? 0 : t < tFl ? (t < tFw2 ? 0.7 * M.io((t - tFw) / Math.max(0.5, tFw2 - tFw)) : 0.7 + 0.08 * M.io((t - tFw2) / 1.6)) : 0.78 - 2.78 * M.io((t - tFl) / 1.8);
const fwd = t => t >= tFw && t < tFl;
const jNotes = [['ac', 'Electrons cross the joint and fill holes', 400], ['', 'Left behind: fixed charges, no free carriers', 460], ['ink', 'Barrier: about 0.7 V for silicon', 520]].map(([c, s, y]) => { const d = document.createElement('div'); d.className = 'pillp ' + c; d.style.cssText = `left:200px;top:${y}px;height:44px;font-size:22px`; d.textContent = s; $('#jL').appendChild(d); return d; });
const Jsc = scope($('#jS2'), 592, 200), JXv = V => 6 + 580 * (V + 2) / 3, JYi = I => 172 - I / 15 * 146;
mk($('#jS2'), 'line', { x1: 6, y1: 172, x2: 586, y2: 172, stroke: '#6B7A9C', 'stroke-width': 2 }); mk($('#jS2'), 'line', { x1: JXv(0), y1: 8, x2: JXv(0), y2: 192, stroke: '#6B7A9C', 'stroke-width': 2 });
mk($('#jS2'), 'line', { x1: JXv(0.7), y1: 166, x2: JXv(0.7), y2: 178, stroke: '#5CC8C8', 'stroke-width': 2 });
const jScL = [Jsc.lab(14, 194, 'X · VOLTAGE V', '#5CC8C8'), Jsc.lab(JXv(0) - 140, 24, 'Y · CURRENT I', '#B9A6F2'), Jsc.lab(JXv(0.7) - 16, 194, '0.7', '#5CC8C8')];
const jCurve = mk($('#jS2'), 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round' });
const jDot = mk($('#jS2'), 'circle', { r: 8, fill: AM, stroke: '#fff', 'stroke-width': 2 });
$('#jro').innerHTML = `<span class="k" style="color:${TE}">V</span><span class="v" id="jV" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k" style="color:${VI}">I</span><span class="v" id="jI" style="color:${VI}">0.00</span><span class="u">mA</span>
  <span class="k n">LAYER</span><span class="v" id="jLy" style="font-size:30px">-</span><span class="u"></span>`;

/* ================= W: worked example ================= */
const wS = $('#wS');
const wWires = [W(wS, 'M140,280 V150 H340'), W(wS, 'M398,150 H640 V250'), W(wS, 'M640,250 L620,261 L660,283 L620,305 L660,327 L620,349 L660,371 L640,380'), W(wS, 'M640,380 V480 H140 V316')];
const wBat = [W(wS, 'M104,280 H176', { 'stroke-width': 5 }), W(wS, 'M122,316 H158', { 'stroke-width': 9 })];
const dG = mk(wS, 'g');
const dTri = W(dG, 'M340,124 L340,176 L392,150 Z', { fill: '#fff' }), dBar = W(dG, 'M396,122 V178', { 'stroke-width': 5 });
const wLab = [tx(wS, 88, 278, '+', { 'font-size': 28, 'text-anchor': 'middle' }), tx(wS, 196, 306, '5 V', { fill: TE }), mono(wS, 196, 334, 'supply'),
  tx(wS, 368, 100, 'Si diode', { 'text-anchor': 'middle' }), tx(wS, 368, 222, '0.7 V', { fill: TE, 'text-anchor': 'middle' }),
  tx(wS, 596, 306, 'R = 1 kΩ', { 'text-anchor': 'end' })];
const wVR = tx(wS, 596, 342, '4.3 V', { 'text-anchor': 'end', fill: TE });
const wI = PUC.arrow(wS, VI), wIL = tx(wS, 470, 106, '', { fill: VI });
const wState = document.createElement('div'); wState.className = 'tag'; wState.style.cssText = 'right:32px;top:22px'; $('#wL').appendChild(wState);
const eW = flow(wS, [[140, 316], [140, 480], [640, 480], [640, 150], [140, 150], [140, 280]], 22, {
  skip: (x, y) => (x > 612 && x < 668 && y > 246 && y < 384) || (x > 330 && x < 404 && y > 116 && y < 184) });
const wRows = steps($('#wSteps'), [
  [K(`\\textcolor{${TE}}{V_s} = \\textcolor{${TE}}{V_D} + \\textcolor{${TE}}{V_R}`), 'voltages add up', 92],
  [K(`\\textcolor{${TE}}{V_R} = 5 - 0.7 = 4.3\\,\\text{V}`), '', 196],
  [K(`\\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${TE}}{V_R}}{R} = \\dfrac{4.3\\,\\text{V}}{1000\\,\\Omega}`), '', 296],
  [K(`\\textcolor{${VI}}{I} = 4.3\\,\\text{mA}`), 'reversed: almost 0', 442]]);
const tWs = [wt('W1', 'five'), wt('W3', 'rest'), wt('W4', 'Current'), wt('W5', 'That')], tFlip = wt('W5', 'Flip');

/* ================= C: why semiconductors won ================= */
const CR = [['HEATER', 'Needs a hot heater', 'None needed'], ['START', 'Warm-up wait', 'Instant'], ['VOLTAGE', 'Hundreds of volts', 'A few volts'], ['BODY', 'Big, fragile glass', 'Tiny and solid'], ['LIFE', 'Heater burns out', 'Lasts for years']];
$('#cRows').innerHTML = `<div class="cr h" style="top:76px"><div></div><div>VACUUM TUBE</div><div>SEMICONDUCTOR</div></div>` +
  CR.map(([k, a, b], i) => `<div class="cr" style="top:${130 + i * 74}px"><div class="k">${k}</div><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');
const cRows = [...$('#cRows').children], tCr = [wt('C2', 'heater'), wt('C2', 'instantly'), wt('C3', 'tube'), wt('C4', 'fragile'), wt('C4', 'lasts')];
$('#cArr').innerHTML = M.icon('arrowR', 28, AM, 2.6);

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'Forward bias: p side to minus', right: 'Forward bias: p to plus, n to minus', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcB = [mk(tcS, 'rect', { x: 250, y: 92, width: 140, height: 70, fill: '#FBEBDD' }), mk(tcS, 'rect', { x: 390, y: 92, width: 140, height: 70, fill: '#FFF4D6' })];
const tcW = [W(tcS, 'M250,92 H530 V162 H250 Z'), W(tcS, 'M390,92 V162', { 'stroke-width': 2, 'stroke-dasharray': '6 6', stroke: '#9AA0AC' }),
  W(tcS, 'M250,127 H150 V240 H376'), W(tcS, 'M380,214 V266', { 'stroke-width': 5 }), W(tcS, 'M404,226 V254', { 'stroke-width': 9 }), W(tcS, 'M408,240 H630 V127 H530')];
const tcL = [tx(tcS, 320, 138, 'p', { 'text-anchor': 'middle', 'font-size': 34, 'font-style': 'italic', fill: '#B4560F' }), tx(tcS, 460, 138, 'n', { 'text-anchor': 'middle', 'font-size': 34, 'font-style': 'italic', fill: '#B7791F' }),
  tx(tcS, 362, 214, '+', { 'text-anchor': 'middle', 'font-size': 30, fill: TE }), tx(tcS, 426, 214, '−', { 'text-anchor': 'middle', 'font-size': 30, fill: TE }), tx(tcS, 660, 200, 'P to Plus', { fill: TE, 'font-size': 26 })];
const tcI = PUC.arrow(tcS, VI), tcIL = tx(tcS, 540, 74, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS', 'JEE MAIN'], type: 'Boards: compare tubes and semiconductors, explain doping · JEE Main: current in diode circuits' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Two silicon diodes, both forward biased, are in series with a 2&nbsp;kΩ resistor across a 6&nbsp;V battery. What is the current?', qW: 780,
  opts: [K('3.0\\,\\text{mA}'), K('2.65\\,\\text{mA}'), K('2.3\\,\\text{mA}'), K('0\\,\\text{mA}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`\\textcolor{${TE}}{V_D} = 2 \\times 0.7 = 1.4\\,\\text{V}`)], [K(`\\textcolor{${TE}}{V_R} = 6 - 1.4 = 4.6\\,\\text{V}`)],
  [K(`\\textcolor{${VI}}{I} = \\dfrac{4.6}{2000}\\,\\text{A}`)], [K(`\\textcolor{${VI}}{I} = 2.3\\,\\text{mA}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'Each'), wt('A3', 'That'), wt('A4', 'Four'), wt('A4', 'gives')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 104, title: 'Vacuum tubes and semiconductors · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\textcolor{${TE}}{V_s} = \\textcolor{${TE}}{V_D} + \\textcolor{${VI}}{I}R \\quad\\Rightarrow\\quad \\textcolor{${VI}}{I} = \\dfrac{\\textcolor{${TE}}{V_s} - \\textcolor{${TE}}{V_D}}{R}`),
    K(`\\text{Si: }\\textcolor{${TE}}{V_D} \\approx 0.7\\,\\text{V} \\qquad \\phi_{\\text{tungsten}} \\approx 4.5\\,\\text{eV}`),
    'Forward bias: p side to plus, n side to minus',
    'n-type: phosphorus (5), free electrons · p-type: boron (3), holes'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 03', topic: 'Integrated circuits, microprocessors and microcontrollers', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tB2 = wt('B2', 'cathode'), tB3 = T0('B3'), tJ2 = wt('J2', 'Near'), tJ3 = T0('J4');
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tB2, 1.12, 600, 500], [tB3 + 0.2, 1, 960, 540], [tJ2, 1.1, 620, 470], [tJ3, 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[tB3, tP], [tFw - 0.3, tT], [tW + 0.2, tC]];

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gwin = GW.find(([a, b]) => t >= a - 0.05 && t < b);
  if (gwin) M.vis(ghost, t, gwin[0], gwin[1] - 0.32, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); else M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tE + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tE - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    radP.forEach((e, i) => M.vis(e, t, tMorph + 0.5 + i * 0.06, 1e9, { dy: 0, fade: 0.2 })); M.vis(radNeedle, t, tMorph + 0.9, 1e9, { dy: 0, fade: 0.2 });
    PUC.attr(radNeedle, 'transform', `translate(${(50 * M.io((t - tFor) / 2.4)).toFixed(1)},0)`);
    M.vis($('#aPill'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    // radio card: warm-up bar, filament heats, music fades in late
    M.vis($('#rC'), t, tFor - 0.1, out, { dx: 60, dy: 0, ...o });
    drawSeq(tubeG, t, tFor, 0.35, 0.1); M.draw(rtFil, t, tFor + 0.2, 0.4);
    const warm = M.clamp((t - tFor - 0.2) / Math.max(1.5, tMus - tFor - 0.1));
    $('#rBar i').style.width = (440 * warm).toFixed(1) + 'px';
    PUC.attr(rtFil, 'stroke', M.mix('#B8BCC6', AM, warm)); rtGlow.setAttribute('opacity', (0.22 * warm).toFixed(3));
    M.vis($('#rL1'), t, tFor, 1e9, { dy: 8 }); M.setT($('#rL1'), warm < 1 ? 'WARMING UP' : 'PLAYING');
    M.vis($('#rWait'), t, tFor + 0.4, tMus, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.2, ody: 0 });
    setWave(rW, t, tMus, M.clamp((t - tMus) / 1.6), 0); M.hide($('#rWav'), t < tMus);
    // phone card: instant
    M.vis($('#pC'), t, tPh - 0.15, out, { dy: 36, ...o });
    drawSeq(phP, t, tPh - 0.05, 0.3, 0.1); M.vis(phScr, t, tPh + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.draw(phNote, t, tPh + 0.3, 0.4);
    $('#pBar i').style.width = (440 * M.o3((t - tPh - 0.2) / 0.2)).toFixed(1) + 'px';
    M.vis($('#pL1'), t, tPh, 1e9, { dy: 8 });
    M.vis($('#pNow'), t, tPh + 0.3, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    setWave(pW, t, tPh + 0.3, M.clamp((t - tPh - 0.3) / 0.2), 1.2); M.hide($('#pWav'), t < tPh + 0.3);
    // I1: the tube is the reason
    const hi = M.io((t - tTub) / 0.3);
    $('#rC').style.boxShadow = hi > 0 ? `0 0 0 ${(4 * hi).toFixed(1)}px ${AM}, 0 10px 30px rgba(22,33,62,.08)` : '';
  }

  /* E: thermionic emission */
  const eOn = t >= tE - 0.05 && t < tB + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = tB - 0.32;
    M.vis($('#eL'), t, tE + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#eR'), t, tE + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis(block, t, tE + 0.4, 1e9, { dy: 0, fade: 0.25 }); M.vis(blockL, t, tE + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(vacL, t, tE + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.draw(heat, t, tE + 0.6, 0.6); M.vis(heatL, t, tE + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.draw(barrier, t, wt('E1', 'surface') - 0.1, 0.6); M.vis(barL, t, tE1[0], 1e9, { dy: 0, fade: 0.2 });
    const h = M.io((t - tHeat) / 1.2);
    PUC.attr(heat, 'stroke', M.mix('#B8BCC6', AM, h)); PUC.attr(block, 'fill', M.mix('#E3E6EC', '#F6E2B8', h * 0.8));
    const ht = $('#eHeat'); M.vis(ht, t, tE + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.setT(ht, h > 0.3 ? 'HEATER ON' : 'HEATER OFF'); ht.style.background = h > 0.3 ? AM : INK;
    const amp = 2.5 + 8 * h, sp = 1 + 2.2 * h;
    EIN.forEach(([x, y, w, p], i) => { M.vis(eIn[i], t, wt('E1', 'free') - 0.2 + i * 0.012, 1e9, { dy: 0, fade: 0.2 });
      PUC.attr(eIn[i], 'cx', (x + amp * Math.sin(w * sp * t + p)).toFixed(1)); PUC.attr(eIn[i], 'cy', (y + amp * 0.8 * Math.cos(w * 1.3 * sp * t + p * 1.7)).toFixed(1)); });
    const tEs = tE1[3] - 0.3;
    eOut.forEach((d, k) => { const t0k = tEs + k * 0.42, u = (t - t0k) / 3.2;
      if (u < 0) { M.hide(d, true); return; } M.hide(d, false); const f = u - Math.floor(u);
      PUC.attr(d, 'cx', (380 + k * 40 + 10 * Math.sin(3 * u + k)).toFixed(1)); PUC.attr(d, 'cy', (300 - 170 * f).toFixed(1)); d.style.opacity = (1 - M.io((f - 0.8) / 0.2)).toFixed(3); });
    runSteps(eRows, t, tE1);
    M.vis($('#eStrip'), t, wt('E5', 'thermionic') - 0.1, 1e9, { dy: 24 });
    avE(t, wt('E5', 'Thermionic') - 0.1, out);
  }

  /* B: breadboard - vacuum diode */
  const bOn = t >= tB - 0.05 && t < tP + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = tP - 0.32;
    M.vis($('#ck'), t, tB + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sc'), t, tB + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#rb'), t, tB + 0.45, out, { dy: 36, ...o });
    M.vis(env, t, tB + 0.4, 1e9, { dy: 0, fade: 0.25 });
    M.draw(cath, t, wt('B2', 'cathode') - 0.2, 0.3); M.draw(fil, t, wt('B2', 'heated') - 0.1, 0.35); M.draw(anode, t, wt('B2', 'plate') - 0.2, 0.3);
    fadeAt(bLab.slice(0, 2), t, wt('B2', 'cathode')); fadeAt(bLab.slice(2, 4), t, wt('B2', 'anode')); fadeAt(bLab.slice(4), t, wt('B2', 'empty'));
    drawSeq(bW, t, tB3 + 0.2, 0.35, 0.15); drawSeq(src, t, tB3 + 0.3, 0.35, 0.12); fadeAt(bLab2, t, wt('B3', 'alternating'), 0.08);
    M.vis($('#ckE'), t, tSig, 1e9, { dy: 0, fade: 0.2 });
    const s = sig(t), on = s > 0.02;
    aSign.textContent = s >= 0 ? '+' : '−'; M.vis(aSign, t, tSig, 1e9, { dy: 0, fade: 0.2 }); aSign.style.opacity = t >= tSig ? (0.35 + 0.65 * Math.abs(s)).toFixed(3) : 0;
    PUC.attr(anode, 'stroke', M.mix(INK, TE, Math.max(0, s)));
    eB.set(-170 * area(t), t >= tSig - 0.1);
    trIn(τ => 34 * sig(τ), t, tSig, 6, 74, t >= tSig); trOut(τ => 40 * half(τ), t, tSig, 6, 168, t >= tSig);
    sLab.forEach(e => M.vis(e, t, tB3 + 0.4, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tB + 0.6, 1e9, { dy: 12 });
    M.setT($('#r1V'), t < tSig ? '+0.0' : (s >= 0 ? '+' : '−') + Math.abs(10 * s).toFixed(1)); M.setT($('#r1I'), (10 * half(t)).toFixed(1));
    M.setT($('#r1S'), t < tSig ? '-' : on ? 'CONDUCTING' : 'BLOCKED'); $('#r1S').style.color = on ? '#B7791F' : MU;
    M.vis($('#slowT'), t, T0('B6'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#oneWay'), t, wt('B7', 'rectification') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* P: triode + trouble */
  const pOn = t >= tP - 0.05 && t < tS + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tS - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o }); const tB3x = wt('P3', 'But');
    M.vis($('#pRL1'), t, tP + 0.4, tB3x - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#pRL2'), t, tB3x, 1e9, { dy: 10 });
    gRows.forEach((r, i) => M.vis(r, t, tGrw[i] - 0.15, tB3x - 0.3, { dx: -24, dy: 0, outDur: 0.25, ody: -10 }));
    M.vis(tEnv, t, tP + 0.3, 1e9, { dy: 0, fade: 0.25 }); drawSeq(tParts, t, tP + 0.4, 0.3, 0.1); fadeAt(tLab, t, tP + 0.7);
    M.draw(tGrid, t, tGr - 0.1, 0.5); drawSeq(tGL, t, tGr + 0.2, 0.25, 0.1); M.vis(tGL[1], t, tGr + 0.2, 1e9, { dy: 0, fade: 0.2 });
    const g = gs(t), k = 1 + 0.75 * g;
    const off = 60 * (t - tP) + (t > tSm ? 60 * 0.75 * (1 - Math.cos(Math.PI * (t - tSm))) / Math.PI : 0);
    trFl.forEach((f, i) => f.set(off + i * 17, t >= tP + 0.8));
    trFl.forEach(f => f.g.style.opacity = (0.35 + 0.65 * k / 1.75).toFixed(3));
    M.vis(tSv, t, wt('P2', 'small') - 0.4, 1e9, { dy: 0, fade: 0.25 });
    trG(τ => 10 * gs(τ), t, tSm, 6, 64, t >= tSm); trA(τ => 42 * gs(τ), t, tSm, 6, 122, t >= tSm);
    tSL.forEach(e => M.vis(e, t, tSm - 0.2, 1e9, { dy: 0, fade: 0.2 }));
    pRows.forEach((r, i) => M.vis(r, t, tPr[i] - 0.15, 1e9, { dx: -24, dy: 0 }));
  }

  /* S: semiconductors + doping */
  const sOn2 = t >= tS - 0.05 && t < tJ + 0.1; M.hide($('#sS'), !sOn2);
  if (sOn2) {
    const out = tJ - 0.32;
    M.vis($('#sL'), t, tS + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#sR'), t, tS + 0.25, out, { dx: 60, dy: 0, ...o });
    ATOMS.forEach((a, i) => M.vis(a.g, t, tS + 0.4 + i * 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    BD.forEach((b, i) => b.l.forEach(l => M.vis(l, t, T0('S3') - 0.2 + i * 0.02, 1e9, { dy: 0, fade: 0.2 })));
    const pPh = t >= tPh2 && t < tBor - 0.2, bPh = t >= tBor;
    const aP = atom(1, 1), aB = atom(3, 1), lit = M.io((t - tShare) / 0.3) * (1 - M.io((t - tPh2 + 0.3) / 0.3));
    const center = atom(2, 1); PUC.attr(center.ci, 'stroke', M.mix('#B8BCC6', AM, lit)); PUC.attr(center.ci, 'stroke-width', (2.5 + 2 * lit).toFixed(2));
    BD.forEach(b => { const near = ['h11', 'h21', 'v20', 'v21'].includes(b.k); b.l.forEach(l => PUC.attr(l, 'stroke', near ? M.mix('#CBD0DA', AM, lit) : '#CBD0DA')); });
    const dop = (a, on, s) => { PUC.attr(a.ci, 'fill', on ? INK : '#E3E6EC'); PUC.attr(a.ci, 'stroke', on ? INK : (a === center ? a.ci.getAttribute('stroke') : '#B8BCC6')); a.lb.textContent = on ? s : 'Si'; PUC.attr(a.lb, 'fill', on ? '#FFFFFF' : C.ink2); };
    dop(aP, pPh, 'P'); dop(aB, bPh, 'B');
    // hole position (p-type)
    const hk = bPh ? Math.min(HOLE.length - 1, Math.max(0, Math.floor((t - tHole) / 0.9) + 1)) : -1;
    const hpos = hk >= 0 ? HOLE[t < tHole ? 0 : hk] : null;
    bondDots.forEach((d, i) => { M.vis(d.el, t, T0('S3') + 0.2 + i * 0.01, 1e9, { dy: 0, fade: 0.2 }); if (hpos && d.b === hpos[0] && d.j === hpos[1]) M.hide(d.el, true); });
    if (hpos) { const d = bondDots.find(x => x.b === hpos[0] && x.j === hpos[1]); PUC.attr(holeC, 'cx', d.el.getAttribute('cx')); PUC.attr(holeC, 'cy', d.el.getAttribute('cy')); }
    M.hide(holeC, !hpos);
    const fe = t >= tPh2 + 0.3 && t < tBor - 0.2; M.hide(freeE, !fe);
    if (fe) { const [x, y] = fFlow(Math.max(0, t - tFree + 0.4) * 110); PUC.attr(freeE, 'cx', x.toFixed(1)); PUC.attr(freeE, 'cy', y.toFixed(1)); }
    const tg = $('#sTag'); M.vis(tg, t, tS + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.setT(tg, bPh ? 'p-TYPE SILICON' : pPh ? 'n-TYPE SILICON' : 'PURE SILICON');
    tg.style.background = bPh ? OR : pPh ? AM : INK;
    M.vis(leg, t, tPh2 + 0.4, 1e9, { dy: 10 });
    // right tiles
    dT.forEach((d, i) => { const ti = [tSemi - 0.2, tPh2 - 0.1, tBor - 0.1][i]; M.vis(d, t, tS + 0.5 + i * 0.12, 1e9, { dy: 20 });
      const l = i ? M.io((t - ti) / 0.3) : M.io((t - tSemi) / 0.3); d.style.background = M.mix(C.soft, '#FFFFFF', l); d.style.borderColor = M.mix(C.soft, AM, l);
      const tn = d.querySelector('.tn'); if (tn) tn.style.color = M.mix(C.ink2, INK, l); });
    M.vis($('#sStrip'), t, T0('S6') - 0.1, 1e9, { dy: 20 });
  }

  /* J: p-n junction */
  const jOn = t >= tJ - 0.05 && t < tT + 0.05; M.hide($('#sJ'), !jOn);
  if (jOn) {
    M.vis($('#jL'), t, tJ + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#jsc'), t, tJ + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#jrb'), t, tJ + 0.45, 1e9, { dy: 36 });
    jNotes.forEach((n, i) => M.vis(n, t, [tCross - 0.1, wt('J2', 'thin') - 0.1, wt('J3', 'barrier') - 0.1][i], tFw - 0.3, { dy: 12, outDur: 0.25, ody: -8 }));
    M.vis(pReg, t, tJ + 0.3, 1e9, { dy: 0, fade: 0.25 }); M.vis(nReg, t, wt('J1', 'n-type') - 0.1, 1e9, { dy: 0, fade: 0.25 }); M.draw(jBox, t, wt('J1', 'join') - 0.1, 0.6);
    fadeAt(jLab.slice(0, 1), t, tJ + 0.4); fadeAt(jLab.slice(1), t, wt('J1', 'n-type'));
    const V = Vof(t), w0 = 96;
    const w = t < tCross ? 0 : t < tFw ? w0 * M.io((t - tCross) / Math.max(0.6, tDepl - tCross)) : w0 * Math.sqrt(Math.max(0.03, (0.7 - Math.min(V, 0.69)) / 0.7)) * (V > 0.69 ? Math.max(0.1, 1 - (V - 0.69) * 8) : 1);
    PUC.attr(dep, 'x', (JX - w / 2).toFixed(1)); PUC.attr(dep, 'width', w.toFixed(1));
    PUC.attr(depE[0], 'x1', (JX - w / 2).toFixed(1)); PUC.attr(depE[0], 'x2', (JX - w / 2).toFixed(1)); PUC.attr(depE[1], 'x1', (JX + w / 2).toFixed(1)); PUC.attr(depE[1], 'x2', (JX + w / 2).toFixed(1));
    depE.forEach(e => M.hide(e, w < 4));
    CAR.forEach((c, i) => { const inside = Math.abs(c.x - JX) < w / 2 - 4; const vis = t >= tJ + 0.5 + (i % 10) * 0.03 && (c.x < JX ? true : t >= wt('J1', 'n-type'));
      M.hide(c.el, !vis || inside); M.hide(c.ion, !vis || !inside); });
    M.vis(depL, t, tDepl - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(barJ, t, wt('J3', 'barrier') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.hide(barJ, t >= tFl + 0.4 || t < wt('J3', 'barrier') - 0.1);
    // circuit
    drawSeq(jW, t, tFw - 0.2, 0.35, 0.12); M.vis(bLong, t, tFw, 1e9, { dy: 0, fade: 0.2 }); M.vis(bShort, t, tFw, 1e9, { dy: 0, fade: 0.2 });
    fadeAt(jRl, t, tFw + 0.3);
    const rev = t >= tFl + 0.3;
    PUC.attr(bLong, 'd', rev ? 'M444,466 V534' : 'M420,466 V534'); PUC.attr(bShort, 'd', rev ? 'M420,482 V518' : 'M444,482 V518');
    jSgn[0].textContent = rev ? '−' : '+'; jSgn[1].textContent = rev ? '+' : '−';
    jSgn.forEach(s => M.vis(s, t, tFw + 0.2, 1e9, { dy: 0, fade: 0.2 }));
    const I = Id(V);
    let eoff = 0; { const a = tFw2 - 0.4; eoff = t < a ? 0 : -(Math.min(t, tFl) - a) * 120 * M.clamp((t - a) / 1.5); }
    eJ.set(eoff, fwd(t) && I > 0.3);
    // bias tag + readout
    const bt = $('#jBias'); M.vis(bt, t, tJ + 0.6, 1e9, { dy: 0, fade: 0.2 }); const bias = t < tFw ? 'NO BIAS' : rev ? 'REVERSE BIAS' : 'FORWARD BIAS';
    M.setT(bt, bias); bt.style.background = t < tFw ? INK : rev ? C.red : C.ok;
    M.setT($('#jV'), (V < 0 ? '−' : '') + Math.abs(V).toFixed(2)); M.setT($('#jI'), I.toFixed(2));
    M.setT($('#jLy'), w < 1 ? '-' : w < 60 ? 'THIN' : w < 110 ? 'NORMAL' : 'WIDE');
    // X-Y scope: the I-V curve draws as the supply moves
    jScL.forEach(e => M.vis(e, t, tJ + 0.6, 1e9, { dy: 0, fade: 0.2 }));
    const vHi = t < tFw ? 0 : Math.max(...[0, Math.min(V, 0.78), t >= tFl ? 0.78 : V]), vLo = t >= tFl ? Math.min(0, V) : 0;
    if (t >= tFw) { let d = ''; const n = 90; for (let i = 0; i <= n; i++) { const v = vLo + (vHi - vLo) * i / n; d += (i ? 'L' : 'M') + JXv(v).toFixed(1) + ',' + JYi(Id(v)).toFixed(1); } PUC.attr(jCurve, 'd', d); } else PUC.attr(jCurve, 'd', '');
    PUC.attr(jDot, 'cx', JXv(V).toFixed(1)); PUC.attr(jDot, 'cy', JYi(I).toFixed(1)); M.hide(jDot, t < tFw);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tW; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tW - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'junction') - 0.25, { out: tW - 0.35, outDur: 0.25 }); }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tC + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tC - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    drawSeq(wWires, t, tW + 0.4, 0.35, 0.12); drawSeq(wBat, t, tW + 0.5, 0.25, 0.1); drawSeq([dTri, dBar], t, wt('W1', 'diode') - 0.2, 0.3, 0.12);
    fadeAt(wLab.slice(0, 3), t, wt('W1', 'five') - 0.1); fadeAt(wLab.slice(3, 4), t, wt('W1', 'silicon')); fadeAt(wLab.slice(5), t, wt('W1', 'resistor') - 0.1);
    M.vis(wLab[4], t, wt('W3', 'diode'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(wVR, t, wt('W3', 'rest'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const flipU = M.io((t - tFlip) / 0.5), cond = t >= wt('W2', 'What') && t < tFlip + 0.25;
    PUC.attr(dG, 'transform', `rotate(${(180 * flipU).toFixed(1)} 368 150)`);
    PUC.attr(dTri, 'fill', cond ? M.mix('#FFFFFF', AM, M.io((t - wt('W2', 'What')) / 0.3)) : '#FFFFFF');
    eW.set(-140 * Math.max(0, Math.min(t, tFlip) - wt('W2', 'What')), cond);
    const ia = M.io((t - tWs[3] + 0.2) / 0.4) * (1 - flipU); wI.set(450, 120, 450 + 130 * ia, 120);
    wIL.textContent = t >= tFlip + 0.2 ? 'I ≈ 0' : 'I = 4.3 mA'; PUC.attr(wIL, 'x', t >= tFlip + 0.2 ? 470 : 600); PUC.attr(wIL, 'y', t >= tFlip + 0.2 ? 106 : 112); M.vis(wIL, t, tWs[3] + 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis(wState, t, wt('W2', 'What'), 1e9, { dy: 0, fade: 0.2 }); M.setT(wState, cond ? 'FORWARD · CONDUCTING' : t >= tFlip ? 'REVERSED · BLOCKED' : 'FORWARD BIAS'); wState.style.background = t >= tFlip + 0.25 ? C.red : cond ? C.ok : INK;
    if (t >= tFlip + 0.2) M.hide(wVR, true);
    runSteps(wRows, t, tWs);
    M.vis($('#wBox'), t, tWs[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* C: why semiconductors won */
  const cOn = t >= tC - 0.05 && t < tX + 0.02; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cC'), t, tC + 0.1, 1e9, { dy: 36 });
    M.vis(cRows[0], t, tC + 0.4, 1e9, { dy: 10 });
    cRows.slice(1).forEach((r, i) => { M.vis(r, t, tC + 0.5 + i * 0.08, 1e9, { dy: 12 });
      const u = M.io((t - tCr[i]) / 0.3), [k, a, b] = r.children;
      a.style.background = M.mix('#F4F5F7', C.redBg, u); a.style.color = M.mix('#C4C8D0', '#8A1C1C', Math.min(1, u * 1.2 + 0.0));
      b.style.background = M.mix(C.soft, C.okBg, u); b.style.color = M.mix('#C4C8D0', '#1F6B3F', u); k.style.color = M.mix('#B8BCC6', MU, u); });
    M.vis($('#cStrip'), t, wt('C4', 'nineteen') - 0.1, 1e9, { dx: -40, dy: 0 });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'minus'), tRight: wt('X3', 'Forward') - 0.1 });
    tcB.forEach(b => M.vis(b, t, tX + 0.5, 1e9, { dy: 0, fade: 0.2 })); drawSeq(tcW, t, tX + 0.5, 0.35, 0.1); fadeAt(tcL.slice(0, 4), t, tX + 0.9);
    M.vis(tcL[4], t, wt('X3', 'Remember') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const ia = M.io((t - wt('X3', 'Forward') + 0.1) / 0.45); tcI.set(280, 70, 280 + 240 * ia, 70); tcIL.style.opacity = ia;
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC'), wt('X4', 'JEE')], tType: wt('X4', 'PUC') + 0.3 });
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
