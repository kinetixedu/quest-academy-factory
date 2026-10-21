// PUC Electronics Ep 3 - Integrated circuits, microprocessors and microcontrollers ("Breadboard" style, Lab Notebook world)
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
const tMorph = wt('H1', 'No') - 0.25;
const tI = T0('I1'), tD = T0('D1'), tM = T0('M1'), tCc = T0('C1'), tB = T0('B1'), tT = T0('T1'), tL = T0('L1'), tW = T0('W1'), tV = T0('V1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tT, tL], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const rmS = $('#rmS');
const rmP = [W(rmS, 'M110,20 H190 A40,40 0 0 1 230,60 V360 A40,40 0 0 1 190,400 H110 A40,40 0 0 1 70,360 V60 A40,40 0 0 1 110,20 Z', { 'stroke-width': 5, fill: '#fff' })];
const rmIR = mk(rmS, 'rect', { x: 132, y: 30, width: 36, height: 14, rx: 6, fill: AM });
const rmB = []; rmB.push(mk(rmS, 'circle', { cx: 150, cy: 90, r: 18, fill: C.redBg, stroke: C.red, 'stroke-width': 3 }));
for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) rmB.push(mk(rmS, 'circle', { cx: 110 + c * 40, cy: 150 + r * 46, r: 14, fill: '#fff', stroke: INK, 'stroke-width': 2.5 }));
const bdS = $('#bdS');
const board = mk(bdS, 'rect', { x: 60, y: 84, width: 664, height: 400, rx: 20, fill: '#FDF1D6', stroke: INK, 'stroke-width': 3 });
const PADS = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) PADS.push([120 + c * 64, 150 + r * 84]);
const traces = PADS.map(([x, y], i) => W(bdS, `M${x + 16},${y} H${300 + (i % 3) * 14} V${220 + Math.floor(i / 3) * 36} H420`, { stroke: '#D9B25A', 'stroke-width': 3 }));
const pads = PADS.map(([x, y]) => mk(bdS, 'circle', { cx: x, cy: y, r: 18, fill: '#fff', stroke: '#C9B98F', 'stroke-width': 3 }));
const chipR = mk(bdS, 'rect', { x: 420, y: 200, width: 160, height: 160, rx: 10, fill: INK, stroke: INK, 'stroke-width': 4 });
const chipPins = W(bdS, [0, 1, 2, 3, 4, 5].map(i => `M${436 + i * 26},200 V186 M${436 + i * 26},360 V374 M420,${216 + i * 26} H406 M580,${216 + i * 26} H594`).join(' '), { 'stroke-width': 3 });
const irT = [W(bdS, 'M594,280 H650', { stroke: '#D9B25A', 'stroke-width': 3 }), mk(bdS, 'rect', { x: 650, y: 266, width: 40, height: 28, rx: 8, fill: AM, stroke: INK, 'stroke-width': 2 })];
const bdL = [mono(bdS, 120, 470, 'buttons', { 'font-size': 18 }), mono(bdS, 500, 400, 'the chip', { 'text-anchor': 'middle', 'font-size': 18, fill: INK }), mono(bdS, 670, 250, 'light', { 'text-anchor': 'middle', 'font-size': 18 })];
const tChip = wt('H1', 'chip'), tOpen = wt('H1', 'opens');

/* ================= I: separate parts -> one piece ================= */
const iS = $('#iS');
const zig = (x1, y, x2) => { const n = 6, d = (x2 - x1) / n; let p = `M${x1},${y}`; for (let i = 0; i < n; i++) p += ` L${x1 + d * (i + 0.5)},${y + (i % 2 ? 16 : -16)}`; return p + ` L${x2},${y}`; };
const iParts = [mk(iS, 'circle', { cx: 180, cy: 220, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(iS, zig(260, 220, 380)), W(iS, zig(520, 220, 640)),
  mk(iS, 'circle', { cx: 600, cy: 380, r: 40, fill: '#fff', stroke: INK, 'stroke-width': 4 }), W(iS, 'M410,350 V410 M430,350 V410', { 'stroke-width': 5 })];
const iWires = [W(iS, 'M100,220 H140'), W(iS, 'M220,220 H260'), W(iS, 'M380,220 H520'), W(iS, 'M640,220 H700 V380 H640'), W(iS, 'M560,380 H430'), W(iS, 'M410,380 H100 V220')];
const SOLD = [[140, 220], [220, 220], [260, 220], [380, 220], [520, 220], [640, 220], [640, 380], [560, 380], [430, 380], [410, 380]];
const sold = SOLD.map(([x, y]) => mk(iS, 'circle', { cx: x, cy: y, r: 8, fill: INK }));
const iLab = [mono(iS, 180, 296, 'transistor', { 'text-anchor': 'middle', 'font-size': 18 }), mono(iS, 320, 186, 'resistor', { 'text-anchor': 'middle', 'font-size': 18 }), mono(iS, 580, 186, 'resistor', { 'text-anchor': 'middle', 'font-size': 18 }),
  mono(iS, 420, 448, 'capacitor', { 'text-anchor': 'middle', 'font-size': 18 }), mono(iS, 600, 452, 'transistor', { 'text-anchor': 'middle', 'font-size': 18 })];
const kS = $('#jS');
const kChip = mk(kS, 'rect', { x: 242, y: 100, width: 300, height: 300, rx: 12, fill: '#fff', stroke: INK, 'stroke-width': 5 });
const kPins = W(kS, [...Array(7)].map((_, i) => `M${267 + i * 42},100 V82 M${267 + i * 42},400 V418 M242,${125 + i * 42} H224 M542,${125 + i * 42} H560`).join(' '), { 'stroke-width': 3 });
const kIn = [mk(kS, 'circle', { cx: 310, cy: 170, r: 22, fill: 'none', stroke: AM, 'stroke-width': 4 }), W(kS, zig(350, 170, 440).replace(/16/g, '9'), { stroke: AM }), W(kS, 'M332,170 H350 M440,170 H480 V300 H452', { stroke: AM, 'stroke-width': 3 }),
  mk(kS, 'circle', { cx: 430, cy: 300, r: 22, fill: 'none', stroke: AM, 'stroke-width': 4 }), W(kS, 'M330,280 V320 M344,280 V320', { stroke: AM, 'stroke-width': 4 }), W(kS, 'M408,300 H344 M330,300 H290 V170', { stroke: AM, 'stroke-width': 3 })];
const kQ = tx(kS, 392, 268, '?', { 'text-anchor': 'middle', 'font-size': 120, fill: '#D9DCE3', id: 'iQ' });
const kLab = mono(kS, 392, 460, 'one piece of semiconductor', { 'text-anchor': 'middle', 'font-size': 20, fill: INK });
const tFail = wt('I2', 'fail'), tKil = wt('I3', 'Kilby'), tTog = wt('I3', 'together');

/* ================= D: definition + levels ================= */
const dieS = $('#dieS'); mk(dieS, 'rect', { x: 0, y: 0, width: 712, height: 160, rx: 12, fill: '#16213E' });
const CELLS = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 22; c++) CELLS.push(mk(dieS, 'rect', { x: 14 + c * 31.6, y: 14 + r * 27, width: 24, height: 18, rx: 3, fill: (c * 3 + r * 5) % 7 === 0 ? AM : '#3A4A70' }));
const dieL = mono(dieS, 0, 186, 'a magnified chip: every block is a tiny part', { 'font-size': 18 });
const LV = [['SSI', 'small scale', 150], ['MSI', 'medium scale', 270], ['LSI', 'large scale', 410], ['VLSI', 'very large scale', 600]];
$('#dLv').innerHTML = LV.map(([k, n, w], i) => `<div class="lv" style="top:${84 + i * 60}px"><div class="k">${k}</div><div class="bar" style="width:${w}px;position:relative"><span style="position:absolute;left:14px;top:8px;font:600 18px Poppins;color:#fff;white-space:nowrap">${n}</span></div></div>`).join('');
const lvRows = [...$('#dLv').children];
const DP = [['good', 'Small', 36, 362], ['good', 'Cheap in bulk', 0, 362], ['good', 'Low power', 36, 418], ['good', 'Very reliable', 0, 418], ['bad', 'No large power', 36, 516], ['bad', 'No big coils inside', 0, 516]];
$('#dPills').innerHTML = DP.map(([c, s, x, y]) => `<span class="pillp ${c}" style="top:${y}px">${s}</span>`).join('');
const dPills = [...$('#dPills').children];
const tLv = [wt('D4', 'Small'), wt('D4', 'medium'), wt('D4', 'large'), wt('D4', 'very')];
const tDp = [wt('D5', 'small'), wt('D5', 'cheap'), wt('D5', 'little'), wt('D5', 'reliable'), wt('D5', 'large'), wt('D5', 'coils')];

/* ================= M: microprocessor -> microcontroller ================= */
const mS = $('#mS');
const mChip = mk(mS, 'rect', { x: 60, y: 92, width: 500, height: 440, rx: 18, fill: '#FBFAF6', stroke: INK, 'stroke-width': 5 });
const mPins = W(mS, '', { 'stroke-width': 3 });
const cpuBox = mk(mS, 'rect', { x: 84, y: 114, width: 452, height: 272, rx: 12, fill: 'none', stroke: '#B8BCC6', 'stroke-width': 2, 'stroke-dasharray': '8 8' });
const cpuL = mono(mS, 100, 414, 'PROCESSOR (CPU)', { 'font-size': 18, 'letter-spacing': '1.5' });
const BL = { cu: [100, 130, 420, 96, 'CONTROL UNIT', 'the boss'], alu: [100, 256, 200, 110, 'ALU', 'maths, compare'], reg: [320, 256, 200, 110, 'REGISTERS', 'fast stores'],
  mem: [660, 130, 300, 96, 'MEMORY', 'program and data'], io: [660, 256, 300, 110, 'INPUT OUTPUT', 'ports to the world'], tim: [660, 400, 300, 96, 'TIMERS', 'count time'] };
$('#mBlk').innerHTML = Object.entries(BL).map(([k, [x, y, w, h, n, s]]) => `<div class="blk" data-k="${k}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${n}<small>${s}</small></div>`).join('');
const blk = {}; [...$('#mBlk').children].forEach(e => blk[e.dataset.k] = e);
const busG = [170, 310, 448].map(y => [-8, 0, 8].map(o => mk(mS, 'line', { x1: 536, y1: y + o, x2: 660, y2: y + o, stroke: o ? '#B8BCC6' : INK, 'stroke-width': 3 })));
const innerBus = W(mS, 'M210,226 V256 M420,226 V256', { 'stroke-width': 3 });
const busL = mono(mS, 598, 252, 'buses', { 'text-anchor': 'middle', 'font-size': 18 });
const tok = mk(mS, 'rect', { x: -40, y: -40, width: 22, height: 22, rx: 5, fill: AM, stroke: INK, 'stroke-width': 2 });
const CYC = [['FETCH', 'get the next instruction'], ['DECODE', 'work out what it means'], ['EXECUTE', 'do it']];
$('#mCyc').innerHTML = CYC.map(([a, b], i) => `<div class="cyc" style="top:${84 + i * 88}px"><span>${a}</span><span class="s">${b}</span></div>`).join('');
const cyc = [...$('#mCyc').children];
$('#mFacts').innerHTML = [['1971', 'first commercial microprocessor'], ['4-bit', 'handled 4 bits at a time'], ['≈ 2,300', 'transistors']].map(([v, l], i) => `<div class="fact" style="top:${360 + i * 72}px"><span class="v">${v}</span> <span class="l">${l}</span></div>`).join('');
const facts = [...$('#mFacts').children];
$('#mIn').innerHTML = ['Processor', 'Memory', 'Input output ports', 'Timers'].map((s, i) => `<div class="cyc" style="top:${84 + i * 88}px">${M.icon('check', 30, C.ok, 3)}<span>${s}</span></div>`).join('') +
  `<div class="pillp ac" style="left:36px;top:450px">Built to do one job well</div>`;
const mIn = [...$('#mIn').children];
const tFetch = wt('M4', 'fetches'), tC2 = wt('C2', 'packs');
const avM = PUC.avatar($('#sM'), { x: 1264, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'My remote has a tiny computer!' });

/* ================= B: breadboard ================= */
const ck = $('#ckS');
const mcu = mk(ck, 'rect', { x: 90, y: 140, width: 200, height: 300, rx: 12, fill: INK });
const mcuP = W(ck, [...Array(7)].map((_, i) => `M90,${170 + i * 40} H74 M290,${170 + i * 40} H306`).join(' '), { 'stroke-width': 3 });
const mcuT = [tx(ck, 190, 280, 'MICRO-', { 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 }), tx(ck, 190, 310, 'CONTROLLER', { 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 })];
const pinDot = mk(ck, 'circle', { cx: 306, cy: 210, r: 7, fill: '#fff', stroke: INK, 'stroke-width': 2.5 });
const bW = [W(ck, 'M306,210 H500'), W(ck, 'M500,210 L510,192 L530,228 L550,192 L570,228 L590,192 L600,210'), W(ck, 'M600,210 H760 V270'), W(ck, 'M760,358 V480 H190 V456')];
const lamp = mk(ck, 'circle', { cx: 760, cy: 314, r: 44, fill: '#fff', stroke: INK, 'stroke-width': 4 }), lampX = [W(ck, 'M729,283 L791,345'), W(ck, 'M791,283 L729,345')];
const gndPin = W(ck, 'M190,440 V456', { 'stroke-width': 3 });
const bLab = [mono(ck, 326, 192, 'output pin', { 'font-size': 18 }), tx(ck, 550, 170, 'R', { 'text-anchor': 'middle', 'font-style': 'italic', 'font-size': 28 }), tx(ck, 816, 322, 'Lamp'), mono(ck, 210, 508, 'ground, 0 V', { 'font-size': 18 })];
const pinV = tx(ck, 330, 262, '', { fill: TE, 'font-size': 28, 'font-family': 'IBM Plex Mono' });
const bI = PUC.arrow(ck, VI), bIL = tx(ck, 690, 170, 'I', { fill: VI, 'font-style': 'italic', 'font-size': 28 });
const eB = flow(ck, [[190, 456], [190, 480], [760, 480], [760, 358], [760, 270], [760, 210], [600, 210], [500, 210], [306, 210]], 24, {
  skip: (x, y) => Math.hypot(x - 760, y - 314) < 48 || (x > 496 && x < 604 && y < 240) });
const SC = scope($('#scS'), 592, 200), trV = SC.tr(CH1), trI2 = SC.tr(AM);
const sLab = [SC.lab(14, 24, 'CH1 · PIN VOLTAGE', CH1), SC.lab(14, 192, 'CH2 · LAMP CURRENT', AM)];
const PL = ['PIN ON', 'WAIT 1.0 s', 'PIN OFF', 'WAIT 1.0 s'];
$('#pgL').innerHTML = PL.map((s, i) => `<div class="pl" style="top:${70 + i * 46}px"><span class="ln">${i + 1}</span><span class="c">${s}</span></div>`).join('');
const pl = [...$('#pgL').children];
const tRun = wt('B3', 'Watch'), tFast = wt('B6', 'faster') - 0.2, tNum = wt('B6', 'number'), P1 = 2.0, P2 = 1.0;
const ph = τ => τ < tRun ? -1 : τ < tFast ? (τ - tRun) / P1 : (tFast - tRun) / P1 + (τ - tFast) / P2;
const isOn = τ => { const p = ph(τ); return p >= 0 && (p - Math.floor(p)) < 0.5; };
const onArea = τ => { const a = x => x < 0 ? 0 : Math.floor(x) * 0.5 + Math.min(x - Math.floor(x), 0.5); if (τ < tRun) return 0; if (τ < tFast) return a(ph(τ)) * P1; const p0 = (tFast - tRun) / P1; return a(p0) * P1 + (a(ph(τ)) - a(p0)) * P2; };
const avB = PUC.avatar($('#sB'), { x: 192, y: 768, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'So my remote is just a chip running code!' });

/* ================= L: address lines ================= */
const ttH = `<div class="tt" style="left:36px;top:80px"><span class="h">A2</span><span class="h">A1</span><span class="h">A0</span><span class="h ad">ADDRESS</span></div>`;
$('#tt').innerHTML = ttH + [...Array(8)].map((_, r) => `<div class="tt" style="left:36px;top:${128 + r * 50}px">${[2, 1, 0].map(b => `<span class="${(r >> b) & 1 ? 'one' : ''}">${(r >> b) & 1}</span>`).join('')}<span class="ad">#${r}</span></div>`).join('');
const ttRows = [...$('#tt').children];
const tK = [wt('L2', 'Each'), wt('L3', 'Two'), wt('L3', 'Three')];
const lRows = steps($('#lSteps'), [[K(`2^{1} = 2`), '1 line', 92], [K(`2^{2} = 4`), '2 lines', 192], [K(`2^{3} = 8`), '3 lines', 292], [K(`\\text{addresses} = 2^{n}`), 'n address lines', 434]]);
const tLs = [tK[0], tK[1], tK[2], wt('L4', 'So')];

/* ================= W: worked example ================= */
$('#bits').innerHTML = [...Array(16)].map(() => '<span>0</span>').join('');
const bits = [...$('#bits').children];
const wRows = steps($('#wSteps'), [[K(`2^{16} = 65\\,536`), 'addresses', 92], [K(`65\\,536 \\div 1024`), '1 KB = 1024 bytes', 196], [K(`= 64\\,\\text{KB}`), 'of memory', 334]]);
const tWs = [wt('W2', 'Two'), wt('W3', 'Divide'), wt('W3', 'sixty')];

/* ================= V: comparison ================= */
const VR = [['MEMORY', 'Outside, on other chips', 'Inside, on the same chip'], ['INPUT OUTPUT', 'Outside, on other chips', 'Inside, on the same chip'], ['BUILT FOR', 'Many jobs, like a laptop', 'One job, like a washing machine'],
  ['SIZE AND COST', 'Bigger system, costs more', 'Smaller and cheaper'], ['POWER', 'Uses more', 'Uses less']];
$('#vRows').innerHTML = `<div class="cr h" style="top:76px"><div></div><div>MICROPROCESSOR</div><div>MICROCONTROLLER</div></div>` + VR.map(([k, a, b], i) => `<div class="cr" style="top:${136 + i * 86}px"><div class="k">${k}</div><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');
const vRows = [...$('#vRows').children], tVr = [wt('V2', 'outside'), wt('V2', 'inside'), wt('V3', 'many'), wt('V4', 'smaller'), wt('V4', 'less')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'A microprocessor has memory built in', right: 'Memory on the chip: microcontroller', y0: 96, y1: 184 });
const tcS = $('#tcS'), bx = (x, y, w, h, s, f = '#fff', st = INK) => { const r = mk(tcS, 'rect', { x, y, width: w, height: h, rx: 8, fill: f, stroke: st, 'stroke-width': 3 }); const l = tx(tcS, x + w / 2, y + h / 2 + 7, s, { 'text-anchor': 'middle', 'font-size': 18 }); return [r, l]; };
const tcA = [...bx(50, 96, 150, 130, '', '#FBFAF6', INK), ...bx(70, 126, 110, 70, 'CPU'), ...bx(266, 96, 110, 54, 'MEMORY'), ...bx(266, 172, 110, 54, 'I/O'),
  W(tcS, 'M200,123 H266 M200,199 H266', { 'stroke-width': 3 }), mono(tcS, 213, 262, 'microprocessor + outside chips', { 'text-anchor': 'middle', 'font-size': 17 })];
const tcB = [...bx(430, 86, 310, 150, '', '#FBFAF6', INK), ...bx(450, 116, 110, 90, 'CPU'), ...bx(580, 106, 140, 50, 'MEMORY', C.ac2), ...bx(580, 166, 140, 50, 'I/O', C.ac2),
  mono(tcS, 585, 262, 'microcontroller: one chip', { 'text-anchor': 'middle', 'font-size': 17 })];
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Name the parts of a microprocessor, compare it with a microcontroller, list the advantages of ICs' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'A microcontroller has 12 address lines, and each address holds one byte. How many bytes can it address?', qW: 780,
  opts: [K('24\\ \\text{bytes}'), K('144\\ \\text{bytes}'), K('4096\\ \\text{bytes}'), K('1024\\ \\text{bytes}')], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`\\text{addresses} = 2^{n}`)], [K(`2^{12} = 4096`)], [K(`4096 \\times 1\\ \\text{byte}`)], [K(`= 4096\\ \\text{bytes} = 4\\,\\text{KB}`)]], { dy: 112, y0: 100 });
const tSol = [wt('A2', 'n'), wt('A3', 'Two'), wt('A4', 'With'), wt('A4', 'or')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 410, y: 248, w: 1100, h: 492, y0: 92, dy: 104, title: 'ICs, microprocessors and microcontrollers · formula card', txt: [0, 0, 1, 1],
  lines: [K(`\\text{addresses} = 2^{n} \\qquad (n = \\text{address lines})`),
    K(`1\\,\\text{KB} = 1024\\ \\text{bytes} \\qquad 2^{16} = 65\\,536 = 64\\,\\text{KB}`),
    'Microprocessor: ALU + control unit + registers, memory outside',
    'Microcontroller: CPU + memory + I/O ports + timers on one chip'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 04', topic: 'Applications of electronics', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [wt('M3', 'arithmetic') - 0.2, 1.1, 640, 560], [T0('M6'), 1, 960, 540], [wt('D2', 'tiny'), 1.1, 560, 600], [T0('D3'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;
const GW = [[tB + 0.5, tT]];
const setPins = w => { const n = Math.floor((w - 40) / 44); let d = ''; for (let i = 0; i < n; i++) { const x = 60 + 30 + i * (w - 60) / (n - 1); d += `M${x.toFixed(1)},92 V76 M${x.toFixed(1)},532 V548 `; } PUC.attr(mPins, 'd', d); };

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
    drawSeq(rmP, t, tMorph + 0.5, 0.5); M.vis(rmIR, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 }); rmB.forEach((b, i) => M.vis(b, t, tMorph + 0.8 + i * 0.03, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    M.vis($('#aPill'), t, tMorph + 0.9, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#bdC'), t, wt('H1', 'tubes') - 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(board, t, wt('H1', 'tubes'), 1e9, { dy: 0, fade: 0.25 });
    pads.forEach((p, i) => M.vis(p, t, wt('H1', 'tangle') + i * 0.03, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    drawSeq(traces, t, wt('H1', 'flat') - 0.2, 0.4, 0.04); fadeAt([bdL[0]], t, wt('H1', 'flat'));
    M.vis(chipR, t, tChip - 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.draw(chipPins, t, tChip - 0.1, 0.4); fadeAt([bdL[1]], t, tChip);
    drawSeq(irT, t, tChip + 0.3, 0.3); M.vis(irT[1], t, tChip + 0.4, 1e9, { dy: 0, fade: 0.2 }); fadeAt([bdL[2]], t, tChip + 0.5);
    const pu = M.io((t - tChip) / 0.3); PUC.attr(chipR, 'stroke', M.mix(INK, AM, pu));
    M.vis($('#bdP'), t, tChip + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#bdQ'), t, wt('H2', 'run') - 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* I: separate parts -> one piece */
  const iOn = t >= tI - 0.05 && t < tD + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tD - 0.32;
    M.vis($('#iL'), t, tI + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#iR'), t, tI + 0.25, out, { dx: 60, dy: 0, ...o }); const kd = M.io((t - tKil) / 0.4); [kChip, kPins].forEach(e => e.style.opacity = (0.25 + 0.75 * kd).toFixed(3)); M.vis($('#iR .lbl'), t, tKil, 1e9, { dy: 10 }); M.vis($('#iQ'), t, tI + 0.5, tKil - 0.1, { dy: 0, fade: 0.2, outDur: 0.2, ody: 0 });
    iParts.forEach((p, i) => { if (p.tagName === 'circle') M.vis(p, t, wt('I1', ['transistor', '', '', 'transistor', 'capacitor'][i] || 'resistor') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); });
    M.draw(iParts[1], t, wt('I1', 'resistor') - 0.1, 0.35); M.draw(iParts[2], t, wt('I1', 'resistor'), 0.35); M.draw(iParts[4], t, wt('I1', 'capacitor') - 0.1, 0.3);
    drawSeq(iWires, t, wt('I1', 'soldered') - 0.3, 0.3, 0.08);
    sold.forEach((s, i) => { const ts = wt('I1', 'soldered') + i * 0.06; M.vis(s, t, ts, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const f = M.io((t - tFail - i * 0.08) / 0.2); PUC.attr(s, 'fill', M.mix(INK, C.red, f)); PUC.attr(s, 'r', (8 + 3 * f).toFixed(1)); });
    fadeAt(iLab, t, wt('I1', 'separate'), 0.1);
    M.vis($('#iBad'), t, tFail - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(kChip, t, tI + 0.4, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.15 }); M.draw(kPins, t, tI + 0.5, 0.5);
    kIn.forEach((e, i) => { if (e.tagName === 'circle') M.vis(e, t, tTog - 0.4 + i * 0.12, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 }); else M.draw(e, t, tTog - 0.4 + i * 0.12, 0.35); });
    M.vis(kLab, t, wt('I3', 'semiconductor') - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#iGood'), t, wt('I3', 'semiconductor'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* D: definition + levels */
  const dOn = t >= tD - 0.05 && t < tM + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tM - 0.32;
    M.vis($('#dL'), t, tD + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#dR'), t, tD + 0.25, out, { dx: 60, dy: 0, ...o });
    M.rise($('#dq'), t, tD + 0.3, { st: 0.045 });
    M.vis(dieS, t, wt('D2', 'Transistors') - 0.1, 1e9, { dy: 16 });
    const nc = Math.floor(CELLS.length * M.o3((t - wt('D2', 'Transistors')) / 2.2)); CELLS.forEach((c, i) => M.hide(c, i >= nc)); M.vis(dieL, t, wt('D2', 'chip'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dMono'), t, wt('D2', 'monolithic') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#dStrip'), t, wt('D3', 'Robert') - 0.2, 1e9, { dy: 24 });
    lvRows.forEach((r, i) => { M.vis(r, t, tD + 0.5 + i * 0.1, 1e9, { dx: -20, dy: 0 }); const u = M.io((t - tLv[i]) / 0.35), b = r.querySelector('.bar'); b.style.background = M.mix(C.soft, AM, u); b.querySelector('span').style.color = M.mix('#9AA0AC', '#FFFFFF', u); r.querySelector('.k').style.color = M.mix('#9AA0AC', INK, u); });
    M.vis($('#dPl'), t, tDp[0] - 0.2, 1e9, { dy: 8 }); M.vis($('#dMl'), t, tDp[4] - 0.2, 1e9, { dy: 8 });
    if (!dPills._laid) { dPills._laid = 1; let x = 36, row = -1; dPills.forEach((p, i) => { if (DP[i][2]) x = 36; p.style.left = x + 'px'; x += p.offsetWidth + 14; }); }
    dPills.forEach((p, i) => M.vis(p, t, tDp[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
  }

  /* M: microprocessor -> microcontroller */
  const mOn = t >= tM - 0.05 && t < tB + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tB - 0.32;
    M.vis($('#mC'), t, tM + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#mR'), t, tM + 0.25, out, { dx: 60, dy: 0, ...o });
    const grow = M.io((t - tC2) / 0.9), wC = 500 + 430 * grow; PUC.attr(mChip, 'width', wC.toFixed(1)); setPins(wC);
    M.vis(mChip, t, tM + 0.3, 1e9, { dy: 0, sc: 0.9, fade: 0.2 }); M.vis(mPins, t, tM + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.vis(cpuBox, t, wt('M2', 'three'), 1e9, { dy: 0, fade: 0.2 }); M.vis(cpuL, t, wt('M2', 'three'), 1e9, { dy: 0, fade: 0.2 });
    const tb = { alu: wt('M3', 'arithmetic'), cu: wt('M4', 'control'), reg: wt('M5', 'registers'), mem: wt('M6', 'Memory'), io: wt('M6', 'output'), tim: tC2 + 0.3 };
    Object.entries(blk).forEach(([k, e]) => M.vis(e, t, tb[k] - 0.15, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT, fade: 0.1 }));
    M.draw(innerBus, t, tb.reg, 0.4);
    busG.forEach((g, i) => g.forEach((l, j) => { const tt = i < 2 ? wt('M6', 'buses') - 0.2 + j * 0.08 : tC2 + 0.4 + j * 0.08; M.draw(l, t, tt, 0.4); }));
    M.vis(busL, t, wt('M6', 'buses'), 1e9, { dy: 0, fade: 0.2 });
    // fetch, decode, execute loop (3 s), token travels memory -> control unit -> ALU -> registers
    const run = t >= tFetch - 0.1 && t < out, u = run ? ((t - tFetch) / 3) % 1 : -1, st = u < 0 ? -1 : u < 0.34 ? 0 : u < 0.6 ? 1 : 2;
    let tx0 = -40, ty0 = -40;
    if (st === 0) { const q = M.io(u / 0.34); tx0 = M.lerp(800, 310, q); ty0 = 170 - 11; }
    else if (st === 1) { tx0 = 310; ty0 = 159; }
    else if (st === 2) { const q = M.io((u - 0.6) / 0.4); tx0 = q < 0.5 ? M.lerp(310, 200, q * 2) : M.lerp(200, 420, q * 2 - 1); ty0 = q < 0.5 ? M.lerp(159, 300, q * 2) : 300; }
    PUC.attr(tok, 'x', (tx0 - 11).toFixed(1)); PUC.attr(tok, 'y', ty0.toFixed(1)); M.hide(tok, !run || t >= tCc);
    const act = { cu: st === 1, alu: st === 2 && u < 0.8, reg: st === 2 && u >= 0.8, mem: st === 0 && u < 0.12 };
    Object.entries(blk).forEach(([k, e]) => { e.style.borderColor = act[k] && t < tCc ? AM : INK; e.style.background = act[k] && t < tCc ? C.ac2 : (grow > 0 && ['mem', 'io', 'tim'].includes(k) ? M.mix('#FFFFFF', C.ac2, grow) : '#fff'); });
    M.vis($('#mRL1'), t, tM + 0.4, tCc - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#mRL2'), t, tCc, 1e9, { dy: 10 });
    cyc.forEach((c, i) => { M.vis(c, t, tM + 0.5 + i * 0.12, tCc - 0.3, { dx: -20, dy: 0, outDur: 0.25, ody: -10 }); const on = st === i && t < tCc; c.style.background = on ? AM : C.soft; c.style.color = on ? '#fff' : C.ink2; c.querySelector('.s').style.color = on ? '#fff' : MU; });
    facts.forEach((f, i) => M.vis(f, t, [wt('M7', 'nineteen'), wt('M7', 'four'), wt('M7', 'two')][i] - 0.1, tCc - 0.3, { dy: 14, outDur: 0.25, ody: -10 }));
    mIn.forEach((e, i) => M.vis(e, t, i < 4 ? [wt('C2', 'processor'), wt('C2', 'memory'), wt('C2', 'input'), wt('C2', 'timers')][i] - 0.1 : wt('C3', 'one') - 0.1, 1e9, { dx: -20, dy: 0 }));
    const tg = $('#mTag'); M.vis(tg, t, tM + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.setT(tg, t >= tC2 ? 'MICROCONTROLLER' : 'MICROPROCESSOR'); tg.style.background = t >= tC2 ? AM : INK;
    avM(t, wt('C3', 'Like') - 0.1, out);
  }

  /* B: breadboard */
  const bOn = t >= tB - 0.05 && t < tT + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#pg'), t, wt('B2', 'program') - 0.2, 1e9, { dy: 36 });
    M.vis(mcu, t, tB + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.SOFT, fade: 0.15 }); M.draw(mcuP, t, tB + 0.6, 0.4); fadeAt(mcuT, t, tB + 0.7);
    drawSeq(bW, t, wt('B1', 'Blink') - 0.4, 0.35, 0.12); M.vis(lamp, t, wt('B1', 'lamp') - 0.2, 1e9, { dy: 0, fade: 0.2 }); drawSeq(lampX, t, wt('B1', 'lamp'), 0.25, 0.08); M.draw(gndPin, t, wt('B1', 'lamp'), 0.2);
    M.vis(pinDot, t, wt('B1', 'Blink'), 1e9, { dy: 0, fade: 0.2 }); fadeAt(bLab, t, wt('B1', 'lamp') + 0.2, 0.08);
    pl.forEach((p, i) => M.vis(p, t, wt('B2', ['Pin', 'Wait', 'Pin', 'Wait'][i], i >= 2 ? 1 : 0) - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#pgR'), t, wt('B2', 'repeat') - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const p = ph(t), f = p - Math.floor(p), line = p < 0 ? -1 : f < 0.07 ? 0 : f < 0.5 ? 1 : f < 0.57 ? 2 : 3, on = isOn(t);
    pl.forEach((e, i) => { e.style.background = i === line ? C.ac2 : 'transparent'; e.style.color = i === line ? INK : C.ink2; });
    const fast = M.io((t - tNum) / 0.3); [1, 3].forEach(i => { const c = pl[i].querySelector('.c'); M.setT(c, t >= tNum ? 'WAIT 0.5 s' : 'WAIT 1.0 s'); c.style.color = fast > 0 && fast < 1 ? AM : ''; });
    PUC.attr(lamp, 'fill', on ? AM : '#FFFFFF'); PUC.attr(pinDot, 'fill', on ? TE : '#FFFFFF');
    M.setT(pinV, t < tRun ? '' : on ? 'V = 5 V' : 'V = 0 V'); M.hide(pinV, t < tRun);
    const ia = on ? 1 : 0; bI.set(640, 180, 640 + 90 * ia, 180); bIL.style.opacity = ia;
    eB.set(-140 * onArea(t), t >= tRun);
    M.vis($('#ckE'), t, tRun, 1e9, { dy: 0, fade: 0.2 });
    trV(τ => isOn(τ) ? 44 : 0, t, tRun, 6, 92, t >= tRun); trI2(τ => isOn(τ) ? 36 : 0, t, tRun, 6, 178, t >= tRun);
    sLab.forEach(e => M.vis(e, t, tRun, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#slowT'), t, T0('B5'), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    avB(t, wt('B6', 'Same') - 0.1, tT - 0.4);
  }

  /* T: statement */
  const sOn = t >= tT - 0.1 && t < tL; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tT + 0.05, { out: tL - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('T1', 'microcontroller') - 0.25, { out: tL - 0.35, outDur: 0.25 }); }

  /* L: address lines */
  const lOn = t >= tL - 0.05 && t < tW + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = tW - 0.32;
    M.vis($('#lL'), t, tL + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#lR'), t, tL + 0.25, out, { dx: 60, dy: 0, ...o });
    const k = t < tK[1] ? 1 : t < tK[2] ? 2 : 3;
    ttRows.forEach((r, i) => { const sp = [...r.children];
      if (i === 0) { M.vis(r, t, tL + 0.5, 1e9, { dy: 8 }); sp.forEach((s, j) => M.hide(s, j < 3 && t < Math.min(tK[2 - j], j === 2 ? tL + 0.5 : 1e9) - 0.3)); return; }
      const ri = i - 1, ph0 = ri < 2 ? tK[0] : ri < 4 ? tK[1] : tK[2], idx = ri < 2 ? ri : ri < 4 ? ri - 2 : ri - 4;
      M.vis(r, t, ph0 + 0.1 + idx * 0.18, 1e9, { dx: -14, dy: 0 });
      sp.forEach((s, j) => { if (j < 3) M.hide(s, t < tK[2 - j] - 0.3 || t < ph0 + 0.1 + idx * 0.18); }); });
    runSteps(lRows, t, tLs);
    M.vis($('#lBox'), t, tLs[3] + 0.4, 1e9, { dy: 0, sc: 0.96, fade: 0.2 }); M.vis($('#lNote'), t, wt('L1', 'memory') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
  }

  /* W: worked example */
  const wOn = t >= tW - 0.05 && t < tV + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = tV - 0.32;
    M.vis($('#wL'), t, tW + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#wR'), t, tW + 0.25, out, { dx: 60, dy: 0, ...o });
    bits.forEach((b, i) => M.vis(b, t, wt('W1', 'sixteen') - 0.2 + i * 0.03, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    const a0 = wt('W1', 'Each'), a1 = tWs[0] + 1.4, u = M.clamp((t - a0) / (a1 - a0)), v = t < a0 ? 0 : Math.min(65535, Math.floor(Math.pow(65536, u) - 1));
    bits.forEach((b, i) => { const bit = (v >> (15 - i)) & 1; M.setT(b, String(bit)); b.className = bit ? 'one' : ''; });
    M.vis($('#wN'), t, a0, 1e9, { dy: 10 }); M.setT($('#wN'), t < a1 ? (v + 1).toLocaleString('en-US') : '65,536');
    M.vis($('#wK'), t, tWs[2], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    runSteps(wRows, t, tWs);
    M.vis($('#wBox'), t, tWs[2] + 0.3, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* V: comparison */
  const vOn = t >= tV - 0.05 && t < tX + 0.02; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vC'), t, tV + 0.1, 1e9, { dy: 36 });
    M.vis(vRows[0], t, tV + 0.4, 1e9, { dy: 10 });
    vRows.slice(1).forEach((r, i) => { M.vis(r, t, tV + 0.5 + i * 0.08, 1e9, { dy: 12 });
      const u = M.io((t - tVr[i]) / 0.3), [k, a, b] = r.children;
      a.style.background = M.mix(C.soft, '#E4E9F4', u); a.style.color = M.mix('#C4C8D0', C.ink2, u);
      b.style.background = M.mix(C.soft, C.ac2, u); b.style.color = M.mix('#C4C8D0', INK, u); k.style.color = M.mix('#B8BCC6', MU, u); });
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'Memory') - 0.1 });
    tcA.forEach((e, i) => M.vis(e, t, tX + 0.5 + i * 0.04, 1e9, { dy: 0, fade: 0.2 }));
    tcB.forEach((e, i) => M.vis(e, t, wt('X3', 'microcontroller') - 0.2 + i * 0.04, 1e9, { dy: 0, fade: 0.2 }));
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Name') - 0.2 });
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
