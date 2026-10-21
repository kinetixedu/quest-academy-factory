// PUC Electronics Ep 24 - Medical electronic instruments ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', RED = C.red;
const IRC = '#8A2A2A'; // infrared beam (drawn as a deep red line)
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
const HEART = 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z';

/* one heartbeat (phase 0..1): P wave, QRS complex, T wave. Illustrative shape, R peak = 1 */
const G = (x, m, s) => Math.exp(-Math.pow((x - m) / s, 2));
const ecg = ph => 0.12 * G(ph, 0.2, 0.03) - 0.1 * G(ph, 0.37, 0.009) + G(ph, 0.4, 0.011) - 0.22 * G(ph, 0.43, 0.011) + 0.3 * G(ph, 0.65, 0.045);
const BEAT = 0.8; // s per beat (75 per minute)

/* oscilloscope screen: dark panel, 6 x 4 divisions */
const scope = (svg, w, h) => {
  mk(svg, 'rect', { x: 0, y: 0, width: w, height: h, rx: 8, fill: '#16213E' });
  for (let i = 1; i < 6; i++) mk(svg, 'line', { x1: w * i / 6, y1: 0, x2: w * i / 6, y2: h, stroke: '#2A3758', 'stroke-width': 1.5 });
  for (let j = 1; j < 4; j++) mk(svg, 'line', { x1: 0, y1: h * j / 4, x2: w, y2: h * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
  return {
    tr(col, sw = 4) { const p = mk(svg, 'path', { d: '', fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      return (f, tNow, tStart, Wn, yMid, on = true, N = 600) => { M.hide(p, !on); if (!on) return; let d = '', first = true;
        for (let i = 0; i <= N; i++) { const tau = tNow - Wn + Wn * i / N; if (tau < tStart) continue; const x = 6 + (w - 12) * i / N, y = yMid - f(tau); d += (first ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1); first = false; }
        PUC.attr(p, 'd', d); }; },
    lab(x, y, s, col) { const e = mk(svg, 'text', { x, y, 'font-family': 'IBM Plex Mono', 'font-size': 17, fill: col }); e.textContent = s; return e; }
  };
};

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'In') - 0.2;
const tI = T0('I1'), tM = T0('M1'), tB = T0('B1'), tS = T0('S1'), tD = T0('D1'), tW = T0('W1'), tX = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tS, tD], [tX, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook ================= */
const ox = $('#oxS');
const oxBody = [W(ox, 'M60,96 H330 A26,26 0 0 1 356,122 V214 A26,26 0 0 1 330,240 H60 A26,26 0 0 1 34,214 V122 A26,26 0 0 1 60,96 Z', { fill: '#fff' }),
  W(ox, 'M356,140 H560 A28,28 0 0 1 560,196 H356', { fill: '#F3E3D6', 'stroke-width': 3.5 })];
const oxScr = mk(ox, 'rect', { x: 60, y: 118, width: 270, height: 100, rx: 10, fill: '#16213E' });
const oxN1 = mono(ox, 150, 186, '--', { fill: '#7FD3D3', 'font-size': 52, 'font-weight': 600, 'text-anchor': 'middle' });
const oxU1 = mono(ox, 150, 210, '% OXYGEN', { fill: '#8FA3C8', 'font-size': 13, 'text-anchor': 'middle' });
const oxN2 = mono(ox, 264, 186, '--', { fill: '#F2C46B', 'font-size': 52, 'font-weight': 600, 'text-anchor': 'middle' });
const oxU2 = mono(ox, 264, 210, 'PULSE / MIN', { fill: '#8FA3C8', 'font-size': 13, 'text-anchor': 'middle' });
const oxFl = mono(ox, 600, 176, 'finger', { 'font-size': 20 });
const lg = $('#lgS'); lg.style.transform = 'translate(24px,24px)';
const lgF = mk(lg, 'rect', { x: 60, y: 118, width: 300, height: 74, rx: 37, fill: '#F3E3D6', stroke: INK, 'stroke-width': 3 });
const lgL = [mk(lg, 'circle', { cx: 150, cy: 82, r: 16, fill: RED, stroke: INK, 'stroke-width': 2.5 }), mk(lg, 'circle', { cx: 270, cy: 82, r: 16, fill: IRC, stroke: INK, 'stroke-width': 2.5 })];
const lgLl = [mono(lg, 150, 56, 'RED', { 'text-anchor': 'middle', fill: RED, 'font-weight': 600, 'font-size': 17 }), mono(lg, 270, 56, 'INFRARED', { 'text-anchor': 'middle', fill: IRC, 'font-weight': 600, 'font-size': 17 })];
const lgD = mk(lg, 'rect', { x: 180, y: 222, width: 60, height: 24, rx: 4, fill: INK });
const lgDl = mono(lg, 254, 242, 'light sensor', { 'font-size': 17 });
const lgB = [W(lg, 'M150,100 L196,218', { stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '8 8' }), W(lg, 'M270,100 L224,218', { stroke: IRC, 'stroke-width': 4, 'stroke-dasharray': '8 8' })];
const tNums = wt('H1', 'two');

/* ================= I: the chain ================= */
const iS = $('#iS');
const BX = [280, 720, 1160];
const BLK = [['STEP 1 · SENSOR', 'Transducer'], ['STEP 2', 'Amplifier'], ['STEP 3', 'Display']];
$('#iBlk').innerHTML = BLK.map(([l, n], i) => `<div class="blk" style="left:${BX[i]}px"><div class="bl">${l}</div><div class="bn">${n}</div><svg width="340" height="180"></svg></div>`).join('');
const blks = [...$('#iBlk').children], bS = blks.map(b => b.querySelector('svg'));
const iBody = mk(iS, 'g'); mk(iBody, 'circle', { cx: 140, cy: 236, r: 78, fill: '#FBE6E6', stroke: INK, 'stroke-width': 3 });
const iHeart = mk(iBody, 'path', { d: HEART, transform: 'translate(104,200) scale(3)', fill: '#fff', stroke: RED, 'stroke-width': 0.9 });
const iBodyL = mono(iS, 140, 350, 'BODY SIGNAL', { 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600 });
const iArr = [[218, 280], [620, 720], [1060, 1160]].map(([a, b]) => PUC.arrow(iS, INK, 4, 14)).map((ar, i) => ({ ar, a: [218, 620, 1060][i], b: [276, 716, 1156][i] }));
// block icons
W(bS[0], 'M120,40 H220 V120 H120 Z', { fill: '#fff' }); mk(bS[0], 'circle', { cx: 170, cy: 80, r: 22, fill: C.ac2, stroke: INK, 'stroke-width': 3 }); W(bS[0], 'M220,80 H300', { 'stroke-width': 3 }); W(bS[0], 'M40,80 H120', { 'stroke-width': 3 });
const ampT = W(bS[1], 'M110,24 L230,80 L110,136 Z', { fill: '#fff' }); mk(bS[1], 'text', { x: 140, y: 90, 'font-family': 'IBM Plex Mono', 'font-size': 26, 'font-weight': 600, fill: INK }).textContent = '×A';
W(bS[1], 'M40,80 H110 M230,80 H300', { 'stroke-width': 3 });
W(bS[2], 'M70,24 H270 V136 H70 Z', { fill: '#16213E' }); const dNum = mk(bS[2], 'text', { x: 170, y: 98, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono', 'font-size': 44, 'font-weight': 600, fill: '#F2C46B' }); dNum.textContent = '75';
// little signals travelling between blocks
const sigSmall = W(iS, '', { stroke: CH1, 'stroke-width': 3 }), sigBig = W(iS, '', { stroke: AM, 'stroke-width': 4 });
const wavePath = (x0, x1, y, amp, ph) => { let d = ''; for (let i = 0; i <= 60; i++) { const x = x0 + (x1 - x0) * i / 60, v = ecg(((i / 60) * 1.0 + ph) % 1); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (y - amp * v).toFixed(1); } return d; };
const tBlk = [wt('I2', 'sensor'), wt('I3', 'amplifier'), wt('I3', 'display')];
$('#iZ').innerHTML = M.icon('zap', 34, AM, 2.4);

/* ================= M: instruments ================= */
const MT = [['Digital thermometer', 'Thermistor', 'Body temperature', 'about 37 °C'],
  ['Sphygmomanometer', 'Cuff with a pressure sensor', 'Blood pressure, mm Hg', '120 / 80 healthy adult'],
  ['Pulse oximeter', 'Red and infrared light, light sensor', 'Oxygen level and pulse', 'two colours of light'],
  ['ECG and EEG', 'Electrodes on the skin', 'Heart and brain signals', 'ECG about 1 mV']];
$('#mTiles').innerHTML = MT.map(([n, s, m, c], i) => `<div class="card mT" style="left:${160 + i * 408}px"><svg width="376" height="180"></svg><div class="nm">${n}</div>
  <div class="kl" style="top:314px">SENSOR</div><div class="kv" style="top:338px">${s}</div><div class="kl" style="top:416px">MEASURES</div><div class="kv" style="top:440px">${m}</div><div class="pillp ch">${c}</div></div>`).join('');
const mT = [...$('#mTiles').children], mS = mT.map(e => e.querySelector('svg'));
// thermometer
W(mS[0], 'M90,70 H250 A20,20 0 0 1 250,110 H90 Z', { fill: '#fff' }); W(mS[0], 'M250,90 H300', { 'stroke-width': 6 }); mk(mS[0], 'rect', { x: 110, y: 78, width: 90, height: 24, rx: 4, fill: '#E4E9DF', stroke: INK, 'stroke-width': 2 });
const thV = mono(mS[0], 155, 96, '37.0', { 'text-anchor': 'middle', fill: INK, 'font-size': 18, 'font-weight': 600 });
// BP cuff + gauge
W(mS[1], 'M70,60 H190 V130 H70 Z', { fill: '#E6EAF2' }); mk(mS[1], 'circle', { cx: 270, cy: 92, r: 46, fill: '#fff', stroke: INK, 'stroke-width': 4 }); W(mS[1], 'M190,95 C210,95 210,92 224,92', { 'stroke-width': 3 });
const bpN = W(mS[1], 'M270,92 L270,58', { stroke: RED, 'stroke-width': 4 });
// oximeter
W(mS[2], 'M90,64 H270 A20,20 0 0 1 270,124 H90 A20,20 0 0 1 90,64 Z', { fill: '#fff' }); mk(mS[2], 'rect', { x: 140, y: 82, width: 160, height: 24, rx: 12, fill: '#F3E3D6' });
const oxBm = [W(mS[2], 'M170,50 V136', { stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '6 6' }), W(mS[2], 'M220,50 V136', { stroke: IRC, 'stroke-width': 4, 'stroke-dasharray': '6 6' })];
// ECG trace
const mEcg = W(mS[3], wavePath(50, 330, 112, 70, 0.02), { stroke: RED, 'stroke-width': 4 });
const tMt = [wt('M2', 'digital'), wt('M3', 'sphygmomanometer'), wt('M4', 'pulse'), wt('M6', 'E')];

/* ================= B: breadboard ECG ================= */
const ck = $('#ckS');
const chest = W(ck, 'M70,130 H250 A20,20 0 0 1 270,150 V470 A20,20 0 0 1 250,490 H70 A20,20 0 0 1 50,470 V150 A20,20 0 0 1 70,130 Z', { fill: '#FBF1EA', 'stroke-width': 3 });
const bHeartG = mk(ck, 'g'); const bHeart = mk(mk(bHeartG, 'g', { transform: 'translate(124,270) scale(3)' }), 'path', { d: HEART, fill: '#fff', stroke: RED, 'stroke-width': 0.9 });
const elec = [[110, 200], [210, 420]].map(([x, y]) => mk(ck, 'circle', { cx: x, cy: y, r: 16, fill: C.ac2, stroke: INK, 'stroke-width': 3 }));
const bWin = [W(ck, 'M126,200 H360 V262 H470'), W(ck, 'M226,420 H360 V338 H470')];
const amp = W(ck, 'M470,220 L620,300 L470,380 Z', { fill: '#fff' });
const ampL = mono(ck, 486, 310, '×1000', { fill: INK, 'font-weight': 600, 'font-size': 22 });
const bWout = W(ck, 'M620,300 H790');
const bWch1 = W(ck, 'M410,262 V150 H790');
const chB = [[150, 'CH1', CH1], [300, 'CH2', '#B7791F']].map(([y, s, c]) => { const g = mk(ck, 'g'); mk(g, 'rect', { x: 790, y: y - 22, width: 100, height: 44, rx: 8, fill: '#16213E' }); mono(g, 840, y + 7, s, { 'text-anchor': 'middle', fill: c === '#B7791F' ? AM : c, 'font-weight': 600, 'font-size': 20 }); return g; });
const bJ = mk(ck, 'circle', { cx: 410, cy: 262, r: 6, fill: INK });
const bLb = [tx(ck, 160, 116, 'Chest', { 'text-anchor': 'middle', 'font-size': 22, fill: MU }), tx(ck, 290, 192, 'Electrodes', { 'font-size': 22 }), mono(ck, 290, 456, 'about 1 mV', { fill: TE, 'font-weight': 600 }),
  tx(ck, 545, 210, 'Amplifier', { 'text-anchor': 'middle', 'font-size': 22 }), mono(ck, 640, 336, 'about 1 V', { fill: TE, 'font-weight': 600 })];
const SC = scope($('#scS'), 592, 200);
const trIn = SC.tr(CH1, 3), trOut = SC.tr(AM, 4);
const sL = [SC.lab(14, 26, 'CH1 · V IN · ABOUT 1 mV', CH1), SC.lab(14, 190, 'CH2 · V OUT · ABOUT 1 V', AM)];
$('#ro1').innerHTML = `<span class="k" style="color:${TE}">V<sub>in</sub></span><span class="v" id="rVi" style="color:${TE}">0.00</span><span class="u">mV</span>
  <span class="k" style="color:${TE}">V<sub>out</sub></span><span class="v" id="rVo" style="color:${TE}">0.00</span><span class="u">V</span>
  <span class="k n">HEART RATE</span><span class="v" id="rHR">--</span><span class="u">/min</span>`;
const tSig = wt('B2', 'Electrodes'), tAmpOn = wt('B3', 'amplifier');
const WN = 2.4;
let tH = tSig + 0.62; while (tH < wt('B5', 'Each')) tH += BEAT;
const sig = τ => τ < tSig ? 0 : ecg((((τ - tSig) / BEAT) % 1 + 1) % 1);
// labels on the held trace (R peaks at window end - 0.3 s, - 1.1 s, - 1.9 s)
const xOf = dt => 6 + 580 * (WN - dt) / WN;
const hLab = [['P', 1.1 + 0.16, 128 - 0.12 * 68 - 18], ['QRS', 1.1, 128 - 68 - 10], ['T', 1.1 - 0.2, 128 - 0.3 * 68 - 18]].map(([s, dt, y]) => { const e = SC.lab(xOf(dt), y, s, '#FFFFFF'); e.setAttribute('text-anchor', 'middle'); e.setAttribute('font-weight', 600); e.setAttribute('font-size', 18); return e; });
const tLab = [wt('B5', 'P', 1), wt('B5', 'Q'), wt('B5', 'T', 3)];
const avB = PUC.avatar($('#sB'), { x: 192, y: 772, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'So a heartbeat is really a voltage!' });

/* ================= D: heart rate + gain ================= */
const dS = $('#dS'), DW = 720, DH = 400;
mk(dS, 'rect', { x: 0, y: 0, width: DW, height: DH, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(dS, 'line', { x1: DW * i / 6, y1: 0, x2: DW * i / 6, y2: DH, stroke: '#2A3758', 'stroke-width': 1.5 });
for (let j = 1; j < 4; j++) mk(dS, 'line', { x1: 0, y1: DH * j / 4, x2: DW, y2: DH * j / 4, stroke: '#2A3758', 'stroke-width': 1.5 });
// a 1.2 s window (0.2 s per division) with R peaks on division 1 and division 5
const dTr = mk(dS, 'path', { d: '', fill: 'none', stroke: AM, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const dPath = (() => { let d = ''; const N = 700; for (let i = 0; i <= N; i++) { const tt = 1.2 * i / N, ph = (((tt - 0.2) / BEAT + 0.4) % 1 + 1) % 1, x = DW * i / N, y = 250 - 150 * ecg(ph); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; })();
dTr.setAttribute('d', dPath);
const dLab = [['P', 0.2 - 0.16, 250 - 0.12 * 150 - 18], ['QRS', 0.2, 250 - 150 - 14], ['T', 0.2 + 0.2, 250 - 0.3 * 150 - 18]].map(([s, tt, y]) => mono(dS, DW * tt / 1.2, y, s, { fill: '#fff', 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle' }));
const rrT = [mk(dS, 'line', { x1: 120, y1: 110, x2: 120, y2: 372, stroke: '#E9E5DA', 'stroke-width': 2, 'stroke-dasharray': '6 6' }), mk(dS, 'line', { x1: 600, y1: 110, x2: 600, y2: 372, stroke: '#E9E5DA', 'stroke-width': 2, 'stroke-dasharray': '6 6' })];
const rr1 = PUC.arrow(dS, '#E9E5DA', 4, 14), rr2 = PUC.arrow(dS, '#E9E5DA', 4, 14);
const rrL = mono(dS, 360, 352, 'R R = 4 div', { fill: '#E9E5DA', 'font-size': 20, 'font-weight': 600, 'text-anchor': 'middle', stroke: '#16213E', 'stroke-width': 7, 'paint-order': 'stroke' });
const DST = [[K(`T_{RR}`), 'time between R peaks, in s', 88], [K(`\\dfrac{1}{T_{RR}}`), 'beats per second', 176], [K(`\\text{HR} = \\dfrac{60}{T_{RR}}`), 'beats per minute', 288], [K(`A = \\dfrac{\\textcolor{${TE}}{V_{out}}}{\\textcolor{${TE}}{V_{in}}}`), 'gain, no unit', 420]];
$('#dSteps').innerHTML = DST.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const WST = [[K(`T_{RR} = 4 \\times 0.2 = 0.8\\,\\text{s}`), 92], [K(`\\text{HR} = \\dfrac{60}{0.8} = 75\\ \\text{per minute}`), 194], [K(`A = \\dfrac{1\\,\\text{V}}{1\\,\\text{mV}} = 1000`), 330]];
$('#wSteps').innerHTML = WST.map(([s, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const dR = [...$('#dSteps').children], wR = [...$('#wSteps').children];
const tDs = [wt('D2', 'The'), wt('D3', 'One'), wt('D4', 'A'), wt('D5', 'And')], tWs = [wt('W2', 'The'), wt('W3', 'The'), wt('W4', 'And')];
const avD = PUC.avatar($('#sD'), { x: 192, y: 772, who: 'Diya', face: FACE + 'diya-face.jpg', text: 'Close to the 72 in our biology book!' });

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'An ECG measures blood pressure', right: 'ECG: heart signals · BP: sphygmomanometer', y0: 96, y1: 184 });
const tcS = $('#tcS');
const tcR = [[110, 'ECG', 'electrical signals of the heart', 'mV'], [210, 'Sphygmomanometer', 'blood pressure in the arteries', 'mm Hg']].map(([y, a, b, u]) => { const g = mk(tcS, 'g');
  mk(g, 'rect', { x: 32, y: y - 34, width: 720, height: 76, rx: 14, fill: C.soft });
  tx(g, 56, y + 12, a, { 'font-size': 26, 'font-weight': 700 }); tx(g, 356, y + 12, b, { 'font-size': 21, fill: C.ink2, 'font-weight': 500 }); mono(g, 732, y + 12, u, { 'text-anchor': 'end', fill: TE, 'font-weight': 600, 'font-size': 20 }); return g; });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers: name the instrument for a quantity, give its use, draw the block diagram' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An ECG is recorded on paper moving at 25&nbsp;mm/s. Two R peaks are 15&nbsp;mm apart. What is the heart rate?', qW: 790,
  opts: ['36 per minute', '60 per minute', '100 per minute', '150 per minute'], right: 2, optW: 474, optY: 330 });
const sol = PUC.solution($('#so'), [[K(`T_{RR} = \\dfrac{15\\,\\text{mm}}{25\\,\\text{mm/s}}`)], [K(`T_{RR} = 0.6\\,\\text{s}`)], [K(`\\text{HR} = \\dfrac{60}{0.6} = 100`)]], { dy: 130, y0: 100 });
const tSol = [wt('A2', 'The'), wt('A3', 'That'), wt('A4', 'The')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 360, y: 248, w: 1200, h: 500, y0: 86, dy: 112, title: 'Medical electronic instruments · formula card', txt: [0, 1, 1, 1],
  lines: [K(`\\text{HR} = 60/T_{RR} \\qquad A = \\textcolor{${TE}}{V_{out}}/\\textcolor{${TE}}{V_{in}}`),
    'Chain: transducer → amplifier → display',
    'Thermometer: thermistor · Sphygmomanometer: blood pressure, mm Hg',
    'Pulse oximeter: red + infrared light · ECG: heart · EEG: brain'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 25', topic: 'Fixed and variable resistors', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tLab[0] - 0.3, 1.12, 1380, 470], [T0('B6') + 1.5, 1, 960, 540], [tWs[0] - 0.2, 1.08, 1340, 540], [wt('W3', 'Seventy'), 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gOn = (t >= tNums && t < tI) || (t >= tB + 0.5 && t < tS) || (t >= tW && t < tX);
  M.vis(ghost, t, t < tI ? tNums : t < tS ? tB + 0.5 : tW + 0.2, t < tI ? tI - 0.4 : t < tS ? tS - 0.4 : tX - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tI + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tI - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tNums, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#oxC'), t, wt('H1', 'clips') - 0.2, out, { dx: 60, dy: 0, ...o });
    drawSeq(oxBody, t, wt('H1', 'clips'), 0.5, 0.2); M.vis(oxScr, t, wt('H1', 'clips') + 0.4, 1e9, { dy: 0, fade: 0.2 }); fadeAt([oxN1, oxU1, oxN2, oxU2, oxFl], t, wt('H1', 'clips') + 0.5, 0.06);
    const k = M.clamp((t - tNums) / 1.4); M.setT(oxN1, t < tNums ? '--' : String(Math.round(M.lerp(80, 98, M.o3(k))))); M.setT(oxN2, t < tNums ? '--' : String(Math.round(M.lerp(60, 76, M.o3(k)))));
    M.vis($('#lgC'), t, wt('H1', 'seconds') - 0.2, out, { dy: 36, ...o });
    M.vis(lgF, t, wt('H1', 'seconds'), 1e9, { dy: 0, fade: 0.2 }); fadeAt([...lgL, ...lgLl, lgD, lgDl], t, wt('H1', 'seconds') + 0.2, 0.06);
    lgB.forEach((b, i) => { M.draw(b, t, T0('H2') + i * 0.15, 0.4); b.style.strokeDashoffset = ''; if (t >= T0('H2') + 0.55 + i * 0.15) b.style.strokeDasharray = '8 8'; });
    M.vis($('#lgQ'), t, T0('H2'), 1e9, { dx: 16, dy: 0 });
  }

  /* I: the chain */
  const iOn = t >= tI - 0.05 && t < tM + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const out = tM - 0.32;
    M.vis($('#iC'), t, tI + 0.1, out, { dy: 36, ...o }); M.vis(iBody, t, tI + 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(iBodyL, t, tI + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const beat = Math.pow(Math.max(0, Math.cos(Math.PI * ((t - tI) / BEAT % 1))), 8); PUC.attr(iHeart, 'fill', M.mix('#FFFFFF', '#F2A3A3', beat * M.clamp((t - tI - 0.5) / 0.3)));
    blks.forEach((b, i) => { M.vis(b, t, tI + 0.5 + i * 0.12, 1e9, { dy: 20 }); const lit = M.io((t - tBlk[i]) / 0.25); b.style.background = M.mix(C.soft, '#FFFFFF', lit); b.style.borderColor = M.mix(C.soft, AM, lit);
      b.querySelector('.bn').style.color = M.mix('#9AA0AC', INK, lit); b.querySelector('svg').style.opacity = (0.3 + 0.7 * lit).toFixed(3); });
    iArr.forEach((a, i) => { const u = M.io((t - tBlk[i] + 0.3) / 0.4); a.ar.set(a.a, 236, a.a + (a.b - a.a) * u, 236); });
    const ph = ((t - tI) / BEAT) % 1;
    PUC.attr(sigSmall, 'd', t >= tBlk[1] - 0.2 ? wavePath(630, 700, 200, 14, ph) : ''); PUC.attr(sigBig, 'd', t >= tBlk[2] - 0.2 ? wavePath(1068, 1146, 214, 54, ph) : '');
    M.setT(dNum, t >= tBlk[2] ? '75' : '--');
    M.vis($('#iStrip'), t, tBlk[2] + 0.4, out, { dy: 30, ...o });
  }

  /* M: instruments */
  const mOn = t >= tM - 0.05 && t < tB + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = tB - 0.32;
    mT.forEach((el, i) => { M.vis(el, t, tM + 0.15 + i * 0.1, out, { dy: 36, ...o }); const lit = M.io((t - tMt[i]) / 0.3);
      el.querySelector('svg').style.opacity = (0.3 + 0.7 * lit).toFixed(3); el.querySelector('.nm').style.color = M.mix('#9AA0AC', INK, lit);
      el.querySelectorAll('.kv').forEach(k => { k.style.color = M.mix('#C4C8D0', C.ink2, lit); });
      const ch = el.querySelector('.ch'); M.vis(ch, t, tMt[i] + 0.8, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); ch.style.background = C.ac2; ch.style.color = '#8A5B0B'; });
    const bpA = M.lerp(-120, 40, M.io((t - tMt[1] - 0.4) / 1.2)); PUC.attr(bpN, 'transform', `rotate(${bpA.toFixed(1)} 270 92)`);
    oxBm.forEach((b, i) => { const on = i === 0 ? t >= tMt[2] + 0.3 : t >= tMt[2] + 0.6; M.hide(b, !on); });
    const absR = M.io((t - wt('M5', 'Blood') ) / 0.3);
    PUC.attr(oxBm[1], 'stroke-width', (4 + 3 * absR * (t < wt('M5', 'less') ? 1 : 0)).toFixed(1)); PUC.attr(oxBm[0], 'stroke-width', (4 + 3 * (t >= wt('M5', 'less') ? 1 : 0)).toFixed(1));
    M.draw(mEcg, t, tMt[3], 0.9);
    M.setT(thV, t >= tMt[0] ? (36 + Math.min(1, (t - tMt[0]) / 1.5)).toFixed(1) : '--.-');
  }

  /* B: breadboard ECG */
  const bOn = t >= tB - 0.05 && t < tS + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    M.vis($('#ck'), t, tB + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#sc'), t, tB + 0.3, 1e9, { dx: 60, dy: 0 }); M.vis($('#rb'), t, tB + 0.45, 1e9, { dy: 36 });
    M.draw(chest, t, tB + 0.4, 0.6); M.vis(bHeartG, t, tB + 0.7, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    fadeAt(elec, t, wt('B2', 'Electrodes') - 0.1, 0.15); drawSeq(bWin, t, wt('B2', 'pick'), 0.5, 0.15);
    M.draw(amp, t, tAmpOn - 0.1, 0.4); M.vis(ampL, t, wt('B3', 'gain'), 1e9, { dy: 0, fade: 0.2 }); M.draw(bWout, t, wt('B3', 'one', 1) - 0.1, 0.35);
    M.draw(bWch1, t, wt('B4', 'Channel'), 0.45); M.vis(bJ, t, wt('B4', 'Channel') + 0.3, 1e9, { dy: 0, fade: 0.1 });
    chB.forEach((g, i) => M.vis(g, t, [wt('B4', 'Channel'), wt('B4', 'Channel', 1)][i] + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    fadeAt([bLb[0]], t, tB + 0.6); fadeAt([bLb[1], bLb[2]], t, wt('B2', 'Electrodes') + 0.1); fadeAt([bLb[3], bLb[4]], t, tAmpOn + 0.2);
    const tn = Math.min(t, tH), s = sig(tn), ampOn = t >= tAmpOn;
    const bt = Math.pow(Math.max(0, s), 2); PUC.attr(bHeart, 'fill', M.mix('#FFFFFF', '#F2A3A3', bt));
    PUC.attr(amp, 'fill', M.mix('#FFFFFF', C.ac2, ampOn ? 1 : 0));
    trIn(τ => 10 * sig(τ), tn, tSig, WN, 60, t >= tSig);
    trOut(τ => ampOn || τ >= tAmpOn ? 68 * sig(τ) * (τ >= tAmpOn ? 1 : 0) : 0, tn, tSig, WN, 128, t >= tSig);
    sL.forEach((e, i) => M.vis(e, t, i ? tAmpOn : tSig, 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#holdT'), t, tH, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    hLab.forEach((e, i) => M.vis(e, t, Math.max(tH, tLab[i]), 1e9, { dy: 0, fade: 0.2 }));
    M.vis($('#ro1'), t, tSig, 1e9, { dy: 12 });
    M.setT($('#rVi'), t < tSig ? '0.00' : (s >= 0 ? '+' : '') + (1.0 * s).toFixed(2)); M.setT($('#rVo'), !ampOn ? '0.00' : (s >= 0 ? '+' : '') + (1.0 * s).toFixed(2));
    M.setT($('#rHR'), t >= tAmpOn + 2 * BEAT ? '75' : '--');
    avB(t, wt('B6', 'The', 1) , tS - 0.3);
  }

  /* S: statement */
  const sOn = t >= tS - 0.1 && t < tD; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tS + 0.05, { out: tD - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('S1', 'That') - 0.05, { out: tD - 0.35, outDur: 0.25 }); }

  /* D: heart rate + gain, worked example */
  const dOn = t >= tD - 0.05 && t < tX + 0.05; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = tX - 0.32;
    M.vis($('#dL'), t, tD + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#dR'), t, tD + 0.25, 1e9, { dx: 60, dy: 0 });
    M.vis($('#dTag'), t, tD + 0.5, 1e9, { dy: 0, fade: 0.2 });
    M.draw(dTr, t, tD + 0.4, 1.4, M.o3); fadeAt(dLab, t, tD + 1.6, 0.15);
    const tRR = wt('D1', 'R', 1) - 0.2; fadeAt(rrT, t, tRR, 0.12);
    const ra = M.io((t - wt('D2', 'R') + 0.1) / 0.4); rr1.set(360, 330, 360 - 236 * ra, 330); rr2.set(360, 330, 360 + 236 * ra, 330); M.vis(rrL, t, wt('D2', 'R') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#dL1'), t, tD + 0.4, tW - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#dL2'), t, tW + 0.1, 1e9, { dy: 10 });
    dR.forEach((r, i) => { M.vis(r, t, tDs[i] - 0.1, tW - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tW) { M.vis(r.querySelector('.n'), t, tDs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tDs[i], 0.6); M.vis(r.querySelector('.why'), t, tDs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#dBox'), t, wt('D4', 'heart') + 0.2, tW - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    wR.forEach((r, i) => { M.hide(r, t < tWs[i] - 0.15); M.vis(r.querySelector('.n'), t, tWs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tWs[i], 0.6); });
    M.vis($('#wBox'), t, wt('W3', 'Seventy') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
    const dt = M.io((t - wt('W1', 'zero') + 0.1) / 0.25); $('#dTag').style.background = M.mix(INK, '#B7791F', dt);
    avD(t, wt('W3', 'Seventy') + 1.6, out);
  }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('X4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('X2', 'Many') - 0.05, tStrike: wt('X2', 'not'), tRight: wt('X3', 'An') - 0.1 });
    M.vis(tcR[0], t, wt('X3', 'records'), 1e9, { dx: -20, dy: 0 }); M.vis(tcR[1], t, wt('X3', 'Blood'), 1e9, { dx: -20, dy: 0 });
    where(t, { tin: wt('X4', 'Where') - 0.2, tLight: [wt('X4', 'PUC')], tType: wt('X4', 'Name') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'What') - 0.3, tCount, tAns });
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
