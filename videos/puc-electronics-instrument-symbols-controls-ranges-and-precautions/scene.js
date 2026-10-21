// PUC Electronics Ep 23 - Instrument symbols, controls, ranges and precautions ("Breadboard" style, Lab Notebook world)
(() => {
const { $ } = M, C = PUC.init({ subject: 'electronics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1;
// colour-coding (series canon): electrons / n amber, current I violet, voltage V teal, charge e / Q orange, t and R ink
const AM = C.ac, VI = C.violet, TE = C.teal, INK = C.ink, MU = C.mute, CH1 = '#8FA3C8', RED = C.red;
const FACE = '../../assets/illustrations/puc/';
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const W = (p, d, a = {}) => mk(p, 'path', { d, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...a });
const tx = (p, x, y, s, a = {}) => { const e = mk(p, 'text', { x, y, 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 24, fill: INK, ...a }); e.textContent = s; return e; };
const mono = (p, x, y, s, a = {}) => tx(p, x, y, s, { 'font-family': 'IBM Plex Mono', 'font-weight': 500, 'font-size': 20, fill: MU, ...a });
const drawSeq = (els, t, t0, dur = 0.35, st = 0.12) => els.forEach((e, i) => M.draw(e, t, t0 + i * st, dur));
const fadeAt = (els, t, t0, st = 0.08) => els.forEach((e, i) => M.vis(e, t, t0 + i * st, 1e9, { dy: 0, fade: 0.2 }));
// meter-dial symbols: DC = solid line over a dashed line, AC = a wave
const dcSym = (p, x, y, w, col, sw = 4) => { const g = mk(p, 'g'); W(g, `M${x},${y} H${x + w}`, { stroke: col, 'stroke-width': sw }); W(g, `M${x},${y + sw * 3} H${x + w}`, { stroke: col, 'stroke-width': sw, 'stroke-dasharray': `${w / 5} ${w / 10}`, 'stroke-linecap': 'butt' }); return g; };
const acSym = (p, x, y, w, col, sw = 4) => W(p, `M${x},${y} C${x + w * 0.17},${y - w * 0.3} ${x + w * 0.33},${y - w * 0.3} ${x + w * 0.5},${y} S${x + w * 0.83},${y + w * 0.3} ${x + w},${y}`, { stroke: col, 'stroke-width': sw });
const meterSym = (p, cx, cy, ch, col, r = 34, fs = 32) => { const g = mk(p, 'g'); mk(g, 'circle', { cx, cy, r, fill: '#fff', stroke: col, 'stroke-width': 4 }); tx(g, cx, cy + fs * 0.34, ch, { 'text-anchor': 'middle', 'font-size': fs, 'font-weight': 700, fill: col }); return g; };
Object.assign(M.IC, {
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  power: ['M12 2v10', 'M18.4 6.6a9 9 0 1 1-12.77.04'],
  pm: ['M4 8h7', 'M7.5 4.5v7', 'M13 16h7'],
  battery: ['M16 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z', 'M22 14v-4', 'M6 10v4']
});

/* ---------------- beats ---------------- */
const tMorph = wt('H1', 'straight') - 0.6;
const tY = T0('Y1'), tG = T0('G1'), tP = T0('P1'), tE = T0('E1'), tK = T0('K1'), tS = T0('S1'), tX = T0('T1'), tQ = T0('Q1'), tF = T0('F1'), tNX = T0('NX');
const tCount = T1('Q1') + 0.05, tAns = T0('A1');
const SW = [[tS, tX + 0.06], [tQ, tQ + 0.06], [tF, tF + 0.06]];

/* ================= A: hook (the dial) ================= */
const dl = $('#dlS'), CX = 392, CY = 300;
const dRing = mk(dl, 'circle', { cx: CX, cy: CY, r: 118, fill: C.soft, stroke: INK, 'stroke-width': 4 });
const dIn = mk(dl, 'circle', { cx: CX, cy: CY, r: 84, fill: '#fff', stroke: '#CBD0DA', 'stroke-width': 3 });
const pol = (a, r) => [CX + r * Math.sin(a * Math.PI / 180), CY - r * Math.cos(a * Math.PI / 180)];
const dTicks = [-120, -84, -62, -40, 0, 60, 120].map(a => { const [x1, y1] = pol(a, 124), [x2, y2] = pol(a, 140); return mk(dl, 'line', { x1, y1, x2, y2, stroke: INK, 'stroke-width': 3 }); });
const gp = (a, r) => { const g = mk(dl, 'g'); const [x, y] = pol(a, r); g._x = x; g._y = y; return g; };
const gOFF = gp(-120, 196); mono(gOFF, gOFF._x, gOFF._y + 8, 'OFF', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: MU });
const gDC = gp(-62, 232); tx(gDC, gDC._x - 22, gDC._y + 12, 'V', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: TE }); dcSym(gDC, gDC._x + 2, gDC._y - 6, 34, TE, 4);
const gR = [-84, -62, -40].map((a, i) => { const g = gp(a, 166); mono(g, g._x, g._y + 7, ['2', '20', '200'][i], { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: INK }); return g; });
const gAC = gp(0, 196); tx(gAC, gAC._x - 22, gAC._y + 14, 'V', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: TE }); acSym(gAC, gAC._x + 2, gAC._y, 36, TE, 4);
const gA = gp(60, 190); tx(gA, gA._x, gA._y + 14, 'A', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: VI });
const gO = gp(120, 190); tx(gO, gO._x, gO._y + 14, 'Ω', { 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: INK });
const dPt = W(dl, `M${CX},${CY} L${CX},${CY - 100}`, { 'stroke-width': 9 }); const dHub = mk(dl, 'circle', { cx: CX, cy: CY, r: 14, fill: INK });
const dGroups = [gOFF, gDC, ...gR, gAC, gA, gO];
const tStr = wt('H1', 'straight'), tWav = wt('H1', 'wavy'), tNum = wt('H1', 'Numbers');
const tRg = [wt('H1', 'two'), wt('H1', 'twenty'), wt('H1', 'hundred') - 0.15];
const dialAng = t => { const k = [[0, -120], [tStr, -62], [tWav, 0], [tRg[0], -84], [tRg[1], -62], [tRg[2], -40]]; let a = -120; for (const [tt, v] of k) a = M.lerp(a, v, M.spring(t - tt, M.SNAP)); return a; };

/* ================= Y: symbols and sockets ================= */
const YR = [['V', TE, 'dc', 'DC volts', 'steady, like a battery'], ['V', TE, 'ac', 'AC volts', 'keeps changing direction'], ['A', VI, '', 'Amperes', 'current'], ['Ω', INK, '', 'Ohms', 'resistance']];
$('#yRows').innerHTML = YR.map((r, i) => `<div class="yr" style="top:${76 + i * 128}px"><svg width="140" height="100"></svg><div class="yn">${r[3]}</div><div class="ym">${r[4]}</div></div>`).join('');
const yRows = [...$('#yRows').children];
yRows.forEach((el, i) => { const sv = el.querySelector('svg'), r = YR[i]; tx(sv, r[2] ? 44 : 70, 72, r[0], { 'text-anchor': 'middle', 'font-size': 60, 'font-weight': 700, fill: r[1] });
  if (r[2] === 'dc') dcSym(sv, 78, 42, 44, r[1], 5); if (r[2] === 'ac') acSym(sv, 78, 52, 46, r[1], 5); });
const tYr = [wt('Y2', 'straight'), wt('Y3', 'wavy'), wt('Y4', 'A'), wt('Y4', 'omega')];
const yS = $('#yS');
const yBody = W(yS, 'M80,76 H704 A16,16 0 0 1 720,92 V292 A16,16 0 0 1 704,308 H80 A16,16 0 0 1 64,292 V92 A16,16 0 0 1 80,76 Z', { fill: '#fff' });
const SOCK = [[180, '10A', MU], [392, 'COM', INK], [604, 'VΩ', RED]];
const sock = SOCK.map(([x, l, c]) => { const g = mk(yS, 'g'); mk(g, 'circle', { cx: x, cy: 214, r: 34, fill: '#fff', stroke: INK, 'stroke-width': 4 }); mk(g, 'circle', { cx: x, cy: 214, r: 14, fill: INK });
  tx(g, x, 148, l, { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 700, fill: c }); return g; });
const plugs = [[392, INK], [604, RED]].map(([x, c]) => { const g = mk(yS, 'g'); mk(g, 'circle', { cx: x, cy: 214, r: 24, fill: c, stroke: '#fff', 'stroke-width': 3 }); W(g, `M${x},238 V300`, { stroke: c, 'stroke-width': 10 }); return g; });
const comT = mono(yS, 392, 284, 'common', { 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 600 });
const bigT = mono(yS, 180, 284, 'large currents', { 'text-anchor': 'middle', 'font-size': 18, fill: MU, 'font-weight': 600 });
const CS = [[160, 'V', TE, 'voltmeter'], [392, 'A', VI, 'ammeter'], [624, 'G', INK, 'galvanometer']];
const cSym = CS.map(([x, l, c, n]) => { const g = mk(yS, 'g'); W(g, `M${x - 110},450 H${x - 44} M${x + 44},450 H${x + 110}`, { 'stroke-width': 3 }); const m = meterSym(g, x, 450, l, c, 44, 40); g.appendChild(m);
  tx(g, x, 540, n, { 'text-anchor': 'middle', 'font-size': 24, fill: INK }); return g; });
const tCs = [wt('Y7', 'voltmeter'), wt('Y7', 'ammeter'), wt('Y7', 'galvanometer')];

/* ================= G: ranges ================= */
const gC = $('#gCS');
const gBat = [W(gC, 'M115,282 H185', { 'stroke-width': 5 }), W(gC, 'M132,318 H168', { 'stroke-width': 9 })];
const gW = [W(gC, 'M150,282 V150 H650 V250'), W(gC, 'M150,318 V450 H650 V350'), W(gC, 'M400,150 V266'), W(gC, 'M400,334 V450')];
const gJ = [[400, 150], [400, 450]].map(([x, y]) => mk(gC, 'circle', { cx: x, cy: y, r: 6, fill: INK }));
const gVm = meterSym(gC, 400, 300, 'V', TE);
const gSc = mk(gC, 'g'); W(gSc, 'M590,250 H710 V350 H590 Z', { fill: '#16213E' }); mono(gSc, 650, 296, 'SCOPE', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 }); mono(gSc, 650, 322, 'CH1', { 'text-anchor': 'middle', fill: CH1, 'font-weight': 600, 'font-size': 18 });
const gLb = [tx(gC, 64, 278, '+', { 'font-size': 28 }), tx(gC, 68, 336, '-', { 'font-size': 30 }), tx(gC, 202, 296, 'Battery'), mono(gC, 202, 324, '9 V', { fill: TE, 'font-weight': 600 })];
const gRl = mono(gC, 448, 306, '', { fill: TE, 'font-weight': 600, 'font-size': 22 });
const gNote = mono(gC, 392, 520, 'Both meters take almost no current', { 'text-anchor': 'middle', 'font-size': 20 });
const rngs = [...$('#rngs').children];
const tR = [wt('G2', 'two'), wt('G3', 'twenty'), wt('G4', 'two'), wt('G4', 'pick')];
const rIdx = t => t < tR[0] ? -1 : t < tR[1] ? 0 : t < tR[2] ? 1 : t < tR[3] ? 2 : 1;
// scope screen 6 x 4 divisions of 50 px, ground at the centre
const sc = $('#scS'); mk(sc, 'rect', { x: 0, y: 0, width: 300, height: 200, rx: 8, fill: '#16213E' });
for (let i = 1; i < 6; i++) mk(sc, 'line', { x1: i * 50, y1: 0, x2: i * 50, y2: 200, stroke: '#2A3758', 'stroke-width': 1.5 });
for (let j = 1; j < 4; j++) mk(sc, 'line', { x1: 0, y1: j * 50, x2: 300, y2: j * 50, stroke: '#2A3758', 'stroke-width': 1.5 });
const gnd = mk(sc, 'line', { x1: 4, y1: 150, x2: 296, y2: 150, stroke: '#5F7399', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const gndL = mono(sc, 292, 144, '0 V', { 'text-anchor': 'end', fill: '#8FA3C8', 'font-size': 15 });
const lvl = mk(sc, 'line', { x1: 4, y1: 150, x2: 296, y2: 150, stroke: CH1, 'stroke-width': 4, 'stroke-linecap': 'round' });
const upA = PUC.arrow(sc, RED, 4, 14);
const lvT = mono(sc, 10, 46, '9 V = 1.8 div', { fill: CH1, 'font-size': 16, 'font-weight': 600 });
const tScOn = wt('G6', 'nine'), tVd = wt('G7', 'Turn');
const tCt = [wt('G8', 'Intensity'), wt('G8', 'focus'), wt('G8', 'position')];
const avG = PUC.avatar($('#sG'), { x: 192, y: 776, who: 'Aarav', face: FACE + 'aarav-face.jpg', text: 'Lowest range above the value. Got it!' });

/* ================= P: analogue scale ================= */
const pS = $('#pS'), PX = 392, PY = 470, PR = 330;
const ang = d => -50 + 100 * d / 50, ppos = (a, r) => [PX + r * Math.sin(a * Math.PI / 180), PY - r * Math.cos(a * Math.PI / 180)];
const arc = r => { const [x1, y1] = ppos(-50, r), [x2, y2] = ppos(50, r); return `M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}`; };
const pMir = W(pS, arc(296), { stroke: '#DDE3EA', 'stroke-width': 16, 'stroke-linecap': 'butt' });
const pMirL = mono(pS, 392, 488, '', {});
const pArc = W(pS, arc(PR), { 'stroke-width': 3 });
const pTk = []; for (let d = 0; d <= 50; d++) { const big = d % 10 === 0, mid = d % 5 === 0, [x1, y1] = ppos(ang(d), PR), [x2, y2] = ppos(ang(d), PR + (big ? 24 : mid ? 16 : 9)); pTk.push(mk(pS, 'line', { x1, y1, x2, y2, stroke: INK, 'stroke-width': big ? 3.5 : 2 })); }
const pNum = [0, 10, 20, 30, 40, 50].map(d => { const [x, y] = ppos(ang(d), PR + 46); return mono(pS, x, y + 7, String(d), { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: INK }); });
const pNd = W(pS, `M${PX},${PY} L${PX},${PY - 316}`, { stroke: RED, 'stroke-width': 4 });
const pHub = mk(pS, 'circle', { cx: PX, cy: PY, r: 14, fill: INK });
const pMirT = mono(pS, 150, 320, 'MIRROR STRIP', { 'text-anchor': 'start', 'font-size': 15, fill: '#9AA0AC', 'font-weight': 600 });
const tN1 = wt('P2', 'needle'), tBig = wt('P5', 'bigger'), tE10 = wt('E1', 'ten'), tE32 = wt('E1', 'thirty');
const needleD = t => { let d = 0; d = M.lerp(d, 20, M.spring(t - tN1, M.HEAVY)); d = M.lerp(d, 32, M.spring(t - tE32, M.HEAVY)); return d; };
const rangeAt = t => (t >= tBig && t < tE10) ? 50 : 10;
const PST = [[K(`d`), 'needle divisions', 92], [K(`\\dfrac{d}{N}`), 'fraction of full scale', 196], [K(`\\textcolor{${TE}}{V} = \\dfrac{d}{N} \\times \\text{range}`), '', 360]];
$('#pSteps').innerHTML = PST.map(([s, w, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div>${w ? `<div class="why">${w}</div>` : ''}</div>`).join('');
const EST = [[K(`d = 32,\\quad N = 50,\\quad \\text{range} = 10\\,\\text{V}`), 92], [K(`\\textcolor{${TE}}{V} = \\dfrac{32}{50} \\times 10`), 180], [K(`\\textcolor{${TE}}{V} = 0.64 \\times 10 = 6.4\\,\\text{V}`), 336]];
$('#eSteps').innerHTML = `<div id="eBox"></div>` + EST.map(([s, y], i) => `<div class="st2" style="top:${y}px"><div class="n">${i + 1}</div><div class="sx">${s}</div></div>`).join('');
const pR = [...$('#pSteps').children], eR = [...$('#eSteps').querySelectorAll('.st2')];
const tPs = [wt('P2', 'First'), wt('P3', 'Divide'), wt('P4', 'Multiply')], tEs = [wt('E1', 'Worked') + 0.6, wt('E2', 'reading'), wt('E3', 'That')];

/* ================= K: precautions ================= */
const KR = [['Start on the highest range', 'then step down', 'arrowD', 'High to low', 'protects the meter'],
  ['Watch the polarity for DC', 'red to plus, black to minus', 'pm', 'Red +, black -', 'the needle moves the right way'],
  ['Resistance only with the power off', 'zero an analogue ohmmeter first', 'power', 'Power off', 'the ohmmeter has its own cell'],
  ['Eye straight in front of the needle', 'looking from the side gives parallax error', 'eye', 'No parallax', 'read straight on'],
  ['Dial to OFF after use', 'so the cell inside does not drain', 'battery', 'Dial to OFF', 'saves the cell']];
$('#kRows').innerHTML = KR.map((r, i) => `<div class="kr" style="top:${72 + i * 102}px"><div class="n">${i + 1}</div><div class="kt">${r[0]}</div><div class="kd">${r[1]}</div></div>`).join('');
const kRows = [...$('#kRows').children];
const tKs = [T0('K2'), T0('K3'), T0('K4'), T0('K5'), T0('K6')];

/* ================= X: exam trap + where it is asked ================= */
const trap = PUC.trap($('#trap'), { wrong: 'O L means the meter is broken', right: 'O L means over the range: switch up', y0: 96, y1: 184 });
const tcS = $('#tcS');
const lcdBox = (x, v, r, col) => { const g = mk(tcS, 'g'); mk(g, 'rect', { x, y: 84, width: 280, height: 110, rx: 12, fill: '#E4E9DF', stroke: INK, 'stroke-width': 3 });
  mono(g, x + 250, 160, v, { 'text-anchor': 'end', 'font-size': 56, 'font-weight': 600, fill: INK }); const c = mk(g, 'rect', { x: x + 70, y: 214, width: 140, height: 40, rx: 8, fill: col });
  mono(g, x + 140, 241, r, { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: '#fff' }); return g; };
const tc1 = lcdBox(40, 'O.L', '2 V RANGE', RED), tc2 = lcdBox(464, '9.00', '20 V RANGE', C.ok);
const tcA = PUC.arrow(tcS, AM, 6, 18);
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Short answers: name the symbols, list the precautions, read a value from a scale and a range' });
$('#wa').querySelector('.wat') && ($('#wa').querySelector('.wat').style.fontSize = '26px');

/* ================= Q: practice question ================= */
const mcq = PUC.mcq($('#mq'), { pat: 'PUC BOARD PATTERN · ORIGINAL QUESTION', q: 'An analogue voltmeter has a 50-division scale. On the 10&nbsp;V range the needle stops at 35. The meter is switched to the 25&nbsp;V range. Where will the needle stop now?', qW: 790,
  opts: [K('35\\ \\text{div}'), K('87.5\\ \\text{div}'), K('14\\ \\text{div}'), K('17.5\\ \\text{div}')], right: 2, optW: 474, optY: 350 });
const sol = PUC.solution($('#so'), [[K(`\\textcolor{${TE}}{V} = \\dfrac{35}{50}\\times 10 = 7\\,\\text{V}`)], [K(`\\textcolor{${TE}}{V}\\ \\text{stays}\\ 7\\,\\text{V}`)], [K(`d = \\dfrac{7}{25}\\times 50 = 14\\ \\text{div}`)]], { dy: 130, y0: 100 });
const tSol = [wt('A2', 'First'), wt('A3', 'The'), wt('A4', 'On')];

/* ================= F: formula card + next ================= */
const fc = PUC.fcard($('#sF'), { x: 360, y: 248, w: 1200, h: 500, y0: 86, dy: 112, title: 'Symbols, ranges and precautions · formula card', txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${TE}}{V} = \\dfrac{d}{N} \\times \\text{range}`),
    'DC: V with straight and dashed lines · AC: V with a wave · COM = black lead',
    'Highest range first, then step down · Resistance only with the power off',
    'Watch DC polarity · Eye straight on the needle · Dial to OFF after use'] });
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 24', topic: 'Medical electronic instruments', y: 764 });

/* ================= run ================= */
const head = PUC.header({ tMorph });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const cam = M.camera($('#cam'), [[0, 1, 960, 540], [tVd - 0.3, 1.1, 1300, 640], [T0('G8'), 1, 960, 540], [tE32 - 0.2, 1.1, 560, 470], [tEs[1], 1, 960, 540]]);
const ghost = $('#ghost'); let gw = 0;

M.on(t => {
  cam(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  if (!gw) { gw = ghost.offsetWidth; ghost.style.left = (1760 - gw) + 'px'; }
  const gOn = (t >= tG + 0.5 && t < tP) || (t >= tE && t < tK);
  M.vis(ghost, t, t < tP ? tG + 0.5 : tE + 0.2, t < tP ? tP - 0.4 : tK - 0.4, { dy: 0, fade: 0.2, outDur: 0.25, ody: 0 }); if (!gOn) M.hide(ghost, true);
  const o = { outDur: 0.3, ody: -16 };

  /* A: hook */
  const aOn = t >= tMorph && t < tY + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    const out = tY - 0.32;
    M.vis($('#aC'), t, tMorph + 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#aImg'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#aPill'), t, tNum, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#dlC'), t, tMorph + 0.35, out, { dx: 60, dy: 0, ...o });
    M.vis(dRing, t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis(dIn, t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 }); fadeAt(dTicks, t, tMorph + 0.8, 0.04);
    fadeAt(dGroups, t, tMorph + 0.9, 0.06); M.vis(dPt, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.vis(dHub, t, tMorph + 0.8, 1e9, { dy: 0, fade: 0.2 });
    const a = dialAng(t); PUC.attr(dPt, 'transform', `rotate(${a.toFixed(2)} ${CX} ${CY})`);
    const sel = [[gOFF, -120], [gDC, -62], [gAC, 0], [gR[0], -84], [gR[1], -62], [gR[2], -40]];
    dGroups.forEach(g => { let k = 0; const ga = g === gOFF ? -120 : g === gDC ? -62 : g === gAC ? 0 : g === gA ? 60 : g === gO ? 120 : [-84, -62, -40][gR.indexOf(g)];
      const isR = gR.includes(g); if ((t >= tStr && t < tNum) || !isR) k = Math.abs(ga - a) < 6 ? 1 : 0; if (isR) k = t >= tNum && Math.abs(ga - a) < 6 ? 1 : 0; if (g === gDC && t >= tNum) k = 1;
      PUC.attr(g, 'opacity', (0.4 + 0.6 * k).toFixed(2)); });
    M.vis($('#dQ'), t, T0('H2'), 1e9, { dy: 16 });
  }

  /* Y: symbols and sockets */
  const yOn = t >= tY - 0.05 && t < tG + 0.1; M.hide($('#sY'), !yOn);
  if (yOn) {
    const out = tG - 0.32;
    M.vis($('#yL'), t, tY + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#yR'), t, wt('Y5', 'sockets') - 0.2, out, { dx: 60, dy: 0, ...o });
    yRows.forEach((el, i) => { M.vis(el, t, tY + 0.4 + i * 0.12, 1e9, { dy: 20 }); const lit = M.io((t - tYr[i]) / 0.25);
      el.style.background = M.mix(C.soft, '#FFFFFF', lit); el.style.borderColor = M.mix(C.soft, AM, lit); el.querySelector('.yn').style.color = M.mix('#9AA0AC', INK, lit); el.querySelector('.ym').style.color = M.mix('#B8BCC6', MU, lit);
      el.querySelector('svg').style.opacity = (0.35 + 0.65 * lit).toFixed(3); });
    M.draw(yBody, t, wt('Y5', 'sockets'), 0.5); fadeAt(sock, t, wt('Y5', 'sockets') + 0.3, 0.12);
    M.vis(plugs[0], t, wt('Y5', 'COM') - 0.1, 1e9, { dy: 40, sp: M.POP, fade: 0.1 }); M.vis(comT, t, wt('Y5', 'common'), 1e9, { dy: 0, fade: 0.2 });
    M.vis(plugs[1], t, wt('Y6', 'red'), 1e9, { dy: 40, sp: M.POP, fade: 0.1 });
    const lg = M.io((t - wt('Y6', 'Large')) / 0.25); PUC.attr(sock[0].querySelector('circle'), 'stroke', M.mix(INK, AM, lg)); PUC.attr(sock[0].querySelector('circle'), 'stroke-width', 4 + 3 * lg);
    M.vis(bigT, t, wt('Y6', 'Large'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#yCl'), t, T0('Y7'), 1e9, { dy: 10 });
    cSym.forEach((g, i) => M.vis(g, t, tCs[i] - 0.1, 1e9, { dy: 20, sp: M.SOFT }));
  }

  /* G: ranges */
  const gOn2 = t >= tG - 0.05 && t < tP + 0.1; M.hide($('#sG'), !gOn2);
  if (gOn2) {
    const out = tP - 0.32;
    M.vis($('#gC'), t, tG + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#gM'), t, tG + 0.3, out, { dx: 60, dy: 0, ...o }); M.vis($('#gS'), t, T0('G5') - 0.2, out, { dy: 36, ...o });
    drawSeq(gBat, t, wt('G2', 'nine') - 0.1, 0.25, 0.1); drawSeq(gW, t, wt('G2', 'nine'), 0.4, 0.12); fadeAt(gJ, t, wt('G2', 'nine') + 0.5); fadeAt(gLb, t, wt('G2', 'nine'), 0.06);
    M.vis(gVm, t, wt('G2', 'meter') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    M.vis(gSc, t, T0('G5') + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis(gNote, t, wt('G3', 'Switch') , 1e9, { dy: 0, fade: 0.25 });
    const ri = rIdx(t);
    rngs.forEach((el, i) => { M.vis(el, t, tG + 0.6 + i * 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); const k = i === ri ? 1 : 0;
      el.style.background = k ? (ri === 0 ? RED : TE) : '#fff'; el.style.color = k ? '#fff' : '#9AA0AC'; el.style.borderColor = k ? (ri === 0 ? RED : TE) : '#CBD0DA'; });
    M.vis($('#rngL'), t, tG + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#rngV'), t, tG + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#rngV'), ri < 0 ? '-' : ['2 V', '20 V', '200 V'][ri]); $('#rngV').style.color = ri === 0 ? RED : TE;
    M.setT($('#lcdV'), ri < 0 ? '----' : ['O.L', '9.00', '9.0'][ri]);
    M.setT(gRl, ri < 0 ? '' : ['2 V range', '20 V range', '200 V range'][ri]); PUC.attr(gRl, 'fill', ri === 0 ? RED : TE);
    M.vis($('#gOL'), t, tR[0] + 0.3, tR[1], { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.15, ody: 0 });
    M.vis($('#gOK'), t, tR[3] + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    // scope: the 9 V line, 1 V/div (off screen) then 5 V/div (1.8 div)
    const vd = t < tVd ? 1 : 5, rise = M.io((t - tScOn) / 0.5), u = M.io((t - tVd) / 0.6);
    const yTarget1 = 150 - 9 * 50, yTarget2 = 150 - 9 / 5 * 50, y = M.lerp(150, M.lerp(yTarget1, yTarget2, u), rise);
    const yc = Math.max(-20, y); PUC.attr(lvl, 'y1', yc.toFixed(1)); PUC.attr(lvl, 'y2', yc.toFixed(1)); M.hide(lvl, t < T0('G5') + 0.4 || yc < 0);
    M.vis(lvT, t, tVd + 0.6, 1e9, { dy: 0, fade: 0.2 });
    M.vis(gnd, t, T0('G5') + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis(gndL, t, T0('G5') + 0.3, 1e9, { dy: 0, fade: 0.2 });
    const offOn = t >= tScOn + 0.4 && t < tVd + 0.3; upA.set(150, 90, 150, offOn ? 14 : 90); M.vis($('#offT'), t, tScOn + 0.4, tVd + 0.3, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.15, ody: 0 });
    M.vis($('#vdL'), t, T0('G5') + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#vdV'), t, T0('G5') + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#vdV'), vd + ' V'); $('#vdV').style.color = t >= tVd ? '#B7791F' : INK;
    [0, 1, 2].forEach(i => M.vis($('#c' + i), t, tCt[i] - 0.1, 1e9, { dx: 20, dy: 0 }));
    avG(t, tR[3] + 0.4, T0('G5') - 0.3);
  }

  /* P: analogue scale + worked example */
  const pOn = t >= tP - 0.05 && t < tK + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = tK - 0.32;
    M.vis($('#pL'), t, tP + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pR'), t, tP + 0.25, out, { dx: 60, dy: 0, ...o });
    M.draw(pMir, t, tP + 0.4, 0.6); M.draw(pArc, t, tP + 0.5, 0.6); fadeAt(pTk, t, tP + 0.6, 0.012); fadeAt(pNum, t, tP + 0.9, 0.06); M.vis(pMirT, t, tP + 1.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis(pNd, t, tP + 0.7, 1e9, { dy: 0, fade: 0.2 }); M.vis(pHub, t, tP + 0.7, 1e9, { dy: 0, fade: 0.2 });
    const d = needleD(t), rg = rangeAt(t); PUC.attr(pNd, 'transform', `rotate(${ang(d).toFixed(2)} ${PX} ${PY})`);
    M.vis($('#pRng'), t, tP + 0.8, 1e9, { dy: 0, fade: 0.2 }); M.setT($('#pRng'), `RANGE ${rg} V`); $('#pRng').style.background = rg === 50 ? '#B7791F' : INK;
    M.vis($('#pRead'), t, tN1 + 0.3, 1e9, { dy: 16 });
    const dd = Math.round(d), val = dd / 50 * rg; M.setT($('#pRv'), `${dd} / 50 × ${rg} V = ${val.toFixed(1)} V`);
    M.vis($('#pL1'), t, tP + 0.4, tE - 0.3, { dy: 10, outDur: 0.25 }); M.vis($('#pL2'), t, tE + 0.1, 1e9, { dy: 10 });
    pR.forEach((r, i) => { M.vis(r, t, tPs[i] - 0.1, tE - 0.3, { dy: 0, fade: 0.12, outDur: 0.25, ody: -10 }); if (t < tE) { M.vis(r.querySelector('.n'), t, tPs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tPs[i], 0.6); const w = r.querySelector('.why'); if (w) M.vis(w, t, tPs[i] + 0.5, 1e9, { dx: -10, dy: 0 }); } });
    M.vis($('#pBox'), t, tPs[2] + 0.5, tE - 0.3, { dy: 0, sc: 0.96, fade: 0.2, outDur: 0.25, ody: 0 });
    M.vis($('#pNote'), t, tPs[2] + 0.7, tE - 0.3, { dy: 10, outDur: 0.25 });
    eR.forEach((r, i) => { M.hide(r, t < tEs[i] - 0.15); M.vis(r.querySelector('.n'), t, tEs[i] - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); PUC.write(r.querySelector('.sx'), t, tEs[i], 0.6); });
    M.vis($('#eBox'), t, wt('E3', 'six') - 0.1, 1e9, { dy: 0, sc: 0.96, fade: 0.2 });
  }

  /* K: precautions */
  const kOn = t >= tK - 0.05 && t < tS + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kL'), t, tK + 0.1, 1e9, { dx: -60, dy: 0 }); M.vis($('#kR'), t, tK + 0.25, 1e9, { dx: 60, dy: 0 });
    let cur = -1; tKs.forEach((a, i) => { if (t >= a - 0.1) cur = i; });
    kRows.forEach((el, i) => { M.vis(el, t, tKs[i] - 0.1, 1e9, { dx: -24, dy: 0 }); const k = M.io((t - tKs[i]) / 0.25) * (i === cur ? 1 : 0);
      el.style.background = M.mix('#FFFFFF', C.ac3, k); el.style.borderLeftColor = M.mix('#FFFFFF', AM, k); });
    const ic = $('#kIc'); M.vis(ic, t, tKs[0] - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    if (cur >= 0) { PUC.setIco(ic, KR[cur][2], '#B7791F', 120, 2); M.setT($('#kCap'), KR[cur][3]); M.setT($('#kSub'), KR[cur][4]); }
    const pop = cur >= 0 ? M.spring(t - tKs[cur], M.POP) : 0; ic.firstChild && (ic.firstChild.style.transform = `scale(${(0.7 + 0.3 * pop).toFixed(3)})`);
    M.vis($('#kCap'), t, tKs[0], 1e9, { dy: 12 }); M.vis($('#kSub'), t, tKs[0] + 0.1, 1e9, { dy: 12 });
  }

  /* S: statement */
  const sOn = t >= tS - 0.1 && t < tX; M.hide($('#stmt'), !sOn);
  if (sOn) { M.rise($('#st1'), t, tS + 0.05, { out: tX - 0.35, outDur: 0.25 }); M.rise($('#st2'), t, wt('S1', 'Then') - 0.05, { out: tX - 0.35, outDur: 0.25 }); }

  /* X: exam trap + where it is asked */
  const xOn = t >= tX - 0.05 && t < tQ + 0.02; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX + 0.1, 1e9, { dy: 36 }); M.vis($('#tc'), t, tX + 0.25, 1e9, { dy: 36 }); M.vis($('#wa'), t, wt('T4', 'Where') - 0.2, 1e9, { dy: 36 });
    trap(t, { tin: tX, tWrong: wt('T2', 'Many') - 0.05, tStrike: wt('T2', 'not'), tRight: wt('T3', 'O') - 0.1 });
    M.vis(tc1, t, wt('T2', 'O') - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    const ta = M.io((t - wt('T3', 'Switch') + 0.1) / 0.4); tcA.set(340, 140, 340 + 100 * ta, 140);
    M.vis(tc2, t, wt('T3', 'higher'), 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 });
    where(t, { tin: wt('T4', 'Where') - 0.2, tLight: [wt('T4', 'PUC')], tType: wt('T4', 'Name') - 0.2 });
  }

  /* Q: practice question */
  const qOn = t >= tQ - 0.05 && t < tF + 0.02; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Where') - 0.3, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    sol(t, tAns + 0.1, tSol);
  }

  /* F: formula card + NEXT */
  const fOn = t >= tF - 0.05; M.hide($('#sF'), !fOn);
  if (fOn) { fc(t, { tin: tF + 0.1, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6], tShot: wt('F1', 'Screenshot') + 0.3 }); nx(t, tNX - 0.1); }
  caps(t);
});
[tS, tQ, tF].forEach(a => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
