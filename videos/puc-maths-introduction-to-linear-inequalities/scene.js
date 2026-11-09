// PUC Maths Ep 49: Introduction to linear inequalities (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: variable x / p violet, the bound (the number after the symbol) coral, true green, false red
const XC = C.violet, RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const DOT = { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 };
const xc = s => `\\textcolor{${XC}}{${s}}`, rc = s => `\\textcolor{${RC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
// number line: ticks every 1, labels every lab
const NL = (svg, o) => {
  const X = v => o.x0 + (v - o.v0) * (o.x1 - o.x0) / (o.v1 - o.v0), y = o.y; X.g = svg = mk(svg, 'g', {});
  mk(svg, 'line', { x1: X(o.v0) - 30, y1: y, x2: X(o.v1) + 30, y2: y, stroke: C.ink, 'stroke-width': 3 });
  mk(svg, 'path', { d: `M${X(o.v1) + 34},${y} l-14,-8 v16 z`, fill: C.ink }); mk(svg, 'path', { d: `M${X(o.v0) - 34},${y} l14,-8 v16 z`, fill: C.ink });
  for (let v = o.v0; v <= o.v1; v++) { mk(svg, 'line', { x1: X(v), y1: y - 9, x2: X(v), y2: y + 9, stroke: C.ink, 'stroke-width': 2 }); if ((v - o.v0) % (o.lab || 1) === 0) txt(svg, X(v), y + 42, v, { 'text-anchor': 'middle', 'font-size': o.fs || 20, fill: C.ink, 'font-weight': 600 }); }
  return X;
};

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tP4 = T0('P4'), tS1 = T0('S1'), tL1 = T0('L1'), tK1 = T0('K1'), tK3 = T0('K3'), tT = T0('T1'), tG1 = T0('G1');
const tE1 = T0('E1'), tE4 = T0('E4'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tG1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['THE LIFT SIGN', 'Max 8 persons'], ['8 PEOPLE', 'Allowed?'], ['9 PEOPLE', 'Allowed?']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'sign'), wt('H1', 'maximum'), wt('H1', 'eight') + 0.2];

/* ---------- H: the lift, people counting up ---------- */
const hs = $('#hS');
const lift = mk(hs, 'rect', { x: 60, y: 150, width: 320, height: 380, rx: 10, fill: C.soft, stroke: C.ink, 'stroke-width': 3 });
mk(hs, 'line', { x1: 220, y1: 150, x2: 220, y2: 530, stroke: C.line, 'stroke-width': 2 });
mk(hs, 'rect', { x: 110, y: 92, width: 220, height: 40, rx: 8, fill: C.ink });
txt(hs, 220, 119, 'MAX 8 PERSONS', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'letter-spacing': 1.5 });
const PPL = [];
for (let i = 0; i < 9; i++) {
  const c = i % 3, r = Math.floor(i / 3), g = mk(mk(hs, 'g', { transform: `translate(${120 + c * 100},${235 + r * 110})` }), 'g', {});
  const col = i === 8 ? C.red : C.ink2;
  mk(g, 'circle', { cx: 0, cy: -22, r: 15, fill: col });
  mk(g, 'path', { d: 'M-24,34 Q-24,0 0,0 Q24,0 24,34 Z', fill: col });
  PPL.push(g);
}
const tA = wt('H2', 'Eight'), tB = wt('H2', 'Fine') + 0.2, t9 = wt('H2', 'ninth');
const tPp = i => i < 8 ? tA + i * (tB - tA) / 8 : t9;
$('#hOk').innerHTML = M.icon('check', 24, '#fff', 3) + 'FINE'; $('#hNo').innerHTML = M.icon('x', 24, '#fff', 3) + 'ALARM';

/* ---------- P: balance scale + definition ---------- */
const ps = $('#pS'), PX = 392, PY = 150, AR = 230;
mk(ps, 'line', { x1: PX, y1: PY, x2: PX, y2: 400, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(ps, 'path', { d: `M${PX - 70},420 L${PX + 70},420 L${PX + 40},398 L${PX - 40},398 Z`, fill: C.ink });
const beam = mk(ps, 'line', { x1: PX - AR, y1: PY, x2: PX + AR, y2: PY, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(ps, 'circle', { cx: PX, cy: PY, r: 9, fill: RC });
const pan = (lab, col, w) => { const g = mk(ps, 'g', {});
  mk(g, 'line', { x1: 0, y1: 0, x2: -78, y2: 120, stroke: C.mute, 'stroke-width': 2 }); mk(g, 'line', { x1: 0, y1: 0, x2: 78, y2: 120, stroke: C.mute, 'stroke-width': 2 });
  mk(g, 'path', { d: 'M-92,120 Q0,172 92,120 Z', fill: C.soft, stroke: C.ink, 'stroke-width': 3 });
  mk(g, 'rect', { x: -w / 2, y: 62, width: w, height: 56, rx: 8, fill: '#fff', stroke: col, 'stroke-width': 3 });
  txt(g, 0, 100, lab, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 28, 'font-weight': 700, fill: col }); return g; };
const panL = pan('x + 2', XC, 124), panR = pan('5', C.ink, 70);
const setBeam = th => { const c = Math.cos(th), s = Math.sin(th), lx = PX - AR * c, ly = PY - AR * s, rx = PX + AR * c, ry = PY + AR * s;
  attr(beam, 'x1', lx.toFixed(1)); attr(beam, 'y1', ly.toFixed(1)); attr(beam, 'x2', rx.toFixed(1)); attr(beam, 'y2', ry.toFixed(1));
  attr(panL, 'transform', `translate(${lx.toFixed(1)},${ly.toFixed(1)})`); attr(panR, 'transform', `translate(${rx.toFixed(1)},${ry.toFixed(1)})`); };
const tTip = wt('P3', 'tips') - 0.2;
const fEq = K(`${xc('x')} + 2 = 5`), fLt = K(`${xc('x')} + 2 ${rc('<')} 5`);
let pLast = '';
$('#pSy').innerHTML = ['<', '>', '\\le', '\\ge'].map((s, i) => `<div class="sym" id="psy${i}" style="left:${36 + i * 174}px">${K(s)}</div>`).join('');

/* ---------- S: four symbols ---------- */
const SR = [['<', 'Less than', '3 < 5'], ['>', 'Greater than', '7 > 5'], ['\\le', 'Less than or equal to', '5 ≤ 5   and   3 ≤ 5'], ['\\ge', 'Greater than or equal to', '5 ≥ 5   and   7 ≥ 5']];
$('#sR').innerHTML = `<div class="hiBox" id="sHi" style="left:20px;width:744px;height:112px"></div>` + SR.map(([s, n, e], i) => `<div class="ss" id="ss${i}" style="top:${84 + i * 116}px"><div class="sy">${K(s)}</div><div class="sn">${n}</div><div class="se">${e}</div></div>`).join('');
const tSs = [T0('S2'), T0('S3'), T0('S4'), T0('S5'), T0('S6')];
const SB = [['3', '<', '5'], ['7', '>', '5'], ['5', '≤', '5'], ['5', '≥', '5'], ['3', '<', '5']];
const s2 = $('#sS2'), SX = NL(s2, { x0: 72, x1: 712, y: 360, v0: 0, v1: 10, lab: 1 });
const sDa = mk(s2, 'circle', { cx: SX(3), cy: 360, r: 13, fill: C.ink }), sDb = mk(s2, 'circle', { cx: SX(5), cy: 360, r: 13, fill: C.ink });
let sLast = -1;

/* ---------- L: live test p <= 8 ---------- */
const ls = $('#lS'), LX = NL(ls, { x0: 72, x1: 712, y: 270, v0: 0, v1: 10, lab: 1 });
const lB = mk(ls, 'line', { x1: LX(8), y1: 180, x2: LX(8), y2: 284, stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const lBt = txt(ls, LX(8), 168, 'limit 8', { 'text-anchor': 'middle', fill: RC, 'font-weight': 600, 'font-size': 20 });
const lD = []; for (let v = 0; v <= 10; v++) { const g = mk(mk(ls, 'g', { transform: `translate(${LX(v)},270)` }), 'g', {}); const c = mk(g, 'circle', { r: 14, fill: XC, stroke: XC, 'stroke-width': 3 }); lD.push({ v, g, c }); }
const lCr = mk(ls, 'g', {}); [[-8, -8, 8, 8], [8, -8, -8, 8]].forEach(([a, b, c, d]) => mk(lCr, 'line', { x1: LX(9) + a, y1: 222 + b, x2: LX(9) + c, y2: 222 + d, stroke: C.red, 'stroke-width': 3 }));
const lT0 = wt('L3', 'Zero'), lT8 = wt('L3', 'eight'), tL9 = wt('L4', 'Nine'), tL10 = wt('L4', 'Ten');
const tTest = v => v <= 8 ? lT0 + v * (lT8 - lT0) / 8 : v === 9 ? tL9 : tL10;
const tStrict = wt('L6', 'becomes'), tRe8 = wt('L7', 'eight');
const rLe = K(`${xc('p')} \\le ${rc('8')}`), rLt = K(`${xc('p')} < ${rc('8')}`);
const roLe = K(`\\{\\,${xc('0, 1, 2, 3, 4, 5, 6, 7, 8')}\\,\\}`), roLt = K(`\\{\\,${xc('0, 1, 2, 3, 4, 5, 6, 7')}\\,\\}`);
let lLast = '';

/* ---------- K: strict vs slack ---------- */
$('#ksF').innerHTML = K(`${xc('x')} < ${rc('8')}`); $('#klF').innerHTML = K(`${xc('x')} \\le ${rc('8')}`);
const ray = (svg, filled) => { const X = NL(svg, { x0: 72, x1: 712, y: 320, v0: 0, v1: 10, lab: 2 });
  const r = mk(svg, 'line', { x1: X(8), y1: 320, x2: 40, y2: 320, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
  const c = mk(svg, 'circle', { cx: X(8), cy: 320, r: 15, fill: filled ? XC : '#fff', stroke: XC, 'stroke-width': 4 });
  const l = txt(svg, X(8), 270, filled ? '8 allowed' : '8 not allowed', { 'text-anchor': 'middle', fill: filled ? C.ok : C.red, 'font-weight': 600, 'font-size': 20 });
  return { r, c, l }; };
const kS = ray($('#ksS'), false), kL = ray($('#klS'), true);
const th1 = PUC.think($('#th1'), { q: 'At least 120 cm tall: strict or slack?', opts: [`Strict: ${K('h > 120')}`, `Slack: ${K('h \\ge 120')}`], right: 1, why: 'At least 120 means exactly 120 cm is fine too. Slack: a filled circle at 120.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${xc('x')} + 2 = 5 \\qquad ${xc('x')} + 2 ${rc('<')} 5`);

/* ---------- G: kinds ---------- */
const GR = [['Numerical', 'ONLY NUMBERS', '3 < 5'], ['Literal', 'A LETTER FOR AN UNKNOWN', `${xc('x')} < 5`], ['Double', 'x TRAPPED BETWEEN TWO NUMBERS', `3 < ${xc('x')} < 5`], ['Linear', 'x IS NEVER SQUARED', `a${xc('x')} + b < 0`]];
$('#gR').innerHTML = GR.map(([n, w, f], i) => `<div class="kr" id="gr${i}" style="top:${84 + i * 116}px"><div class="kn">${n}</div><div class="kw">${w}</div><div class="kx">${K(f)}</div></div>`).join('');
const tGs = [T0('G2'), T0('G3'), T0('G4'), T0('G5')];
const GF = [K('3 < 5'), K(`${xc('x')} < 5`), K(`3 < ${xc('x')} < 5`), K(`a${xc('x')} + b < 0,\\ a \\ne 0`)];
const gs = $('#gS'), GX = NL(gs, { x0: 112, x1: 672, y: 330, v0: 0, v1: 7, lab: 1 });
const gNum = [mk(gs, 'circle', { cx: GX(3), cy: 330, r: 13, fill: C.ink }), mk(gs, 'circle', { cx: GX(5), cy: 330, r: 13, fill: C.ink })];
const gTr = txt(gs, 392, 450, 'always simply true or false', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 22 });
const gRay = mk(gs, 'line', { x1: GX(5), y1: 330, x2: 80, y2: 330, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const gSeg = mk(gs, 'line', { x1: GX(3), y1: 330, x2: GX(5), y2: 330, stroke: XC, 'stroke-width': 10 });
const gO5 = mk(gs, 'circle', { cx: GX(5), cy: 330, r: 14, fill: '#fff', stroke: XC, 'stroke-width': 4 }), gO3 = mk(gs, 'circle', { cx: GX(3), cy: 330, r: 14, fill: '#fff', stroke: XC, 'stroke-width': 4 });
const gCap = txt(gs, 392, 450, '', { 'text-anchor': 'middle', fill: C.ink2, 'font-weight': 600, 'font-size': 22 });
// G5: straight line vs a curve (no powers)
const gPl = mk(gs, 'g', {}), gpX = v => 392 + v * 48, gpY = v => 480 - v * 40;
mk(gPl, 'line', { x1: 150, y1: 480, x2: 640, y2: 480, stroke: C.ink, 'stroke-width': 2 }); mk(gPl, 'line', { x1: 392, y1: 250, x2: 392, y2: 560, stroke: C.ink, 'stroke-width': 2 });
let pd = ''; for (let i = 0; i <= 40; i++) { const v = -2.4 + 4.8 * i / 40; pd += (i ? 'L' : 'M') + gpX(v).toFixed(1) + ',' + gpY(v * v * 0.9).toFixed(1); }
const gPar = mk(gPl, 'path', { d: pd, fill: 'none', stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '9 7' });
const gLin = mk(gPl, 'line', { x1: gpX(-2.5), y1: gpY(-1), x2: gpX(4), y2: gpY(4.2), stroke: RC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const gLl = txt(gPl, gpX(4) + 14, gpY(4.2) + 8, 'linear', { fill: RC, 'font-weight': 600, 'font-size': 20 });
const gPlab = txt(gPl, 262, 300, 'x²: not linear', { 'text-anchor': 'end', fill: C.red, 'font-weight': 600, 'font-size': 20 });
const G4C = ['', 'every number below 5', 'only between 3 and 5'];

/* ---------- E: equation vs inequality ---------- */
$('#elF').innerHTML = K(`${xc('x')} + 2 = 5`); $('#erF').innerHTML = K(`${xc('x')} + 2 ${rc('<')} 5`);
const es = $('#elS'), EX = NL(es, { x0: 72, x1: 712, y: 320, v0: -4, v1: 6, lab: 1 });
const eDot = mk(mk(es, 'g', { transform: `translate(${EX(3)},320)` }), 'g', {}); mk(eDot, 'circle', { r: 15, fill: XC });
const ers = $('#erS'), RX = NL(ers, { x0: 72, x1: 712, y: 320, v0: -4, v1: 6, lab: 1 });
const ER = [[2, 'two'], [1, 'one'], [0, 'zero'], [-4.6, 'hundred'], [2.9, 'point']];
const eTk = ER.map(([v, w]) => { const g = mk(mk(ers, 'g', { transform: `translate(${RX(v)},320)` }), 'g', {}); mk(g, 'circle', { r: 12, fill: XC }); return { g, t: wt('E3', w) - 0.05 }; });
const eM = txt(ers, RX(-4.6), 280, '-100', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 18 });
const e29 = txt(ers, RX(2.9) - 6, 280, '2.9', { 'text-anchor': 'end', fill: XC, 'font-weight': 600, 'font-size': 18 });
const eRay = mk(ers, 'line', { x1: RX(3), y1: 320, x2: 38, y2: 320, stroke: XC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const eO = mk(ers, 'circle', { cx: RX(3), cy: 320, r: 15, fill: '#fff', stroke: XC, 'stroke-width': 4 });
const eNat = [1, 2].map(v => { const g = mk(mk(ers, 'g', { transform: `translate(${RX(v)},320)` }), 'g', {}); mk(g, 'circle', { r: 17, fill: RC, stroke: '#fff', 'stroke-width': 3 }); return g; });
const th2 = PUC.think($('#th2'), { q: `${K(`${xc('x')} + 2 < 5`)}: how many real answers?`, opts: ['Just one', 'Endless'], right: 1, why: 'Every real number below 3 works: 2.9, 0, -100 ... Natural x: only 1 and 2.' });
const tThOut = wt('E5', 'But') - 0.3;

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Ravi has 200 rupees. Rice costs 30 rupees a packet.<br>How many packets can he buy?`;
const ok = s => `<span style="color:var(--ok);font-weight:600">${s}</span>`, no = s => `<span style="color:var(--red);font-weight:600">${s}</span>`;
const wsol = PUC.solution($('#wl'), [
  [`${K(xc('x'))} = packets · they cost ${K(`30${xc('x')}`)} rupees`],
  [K(`30${xc('x')} < ${rc('200')}`) + '&nbsp; (200 is not a multiple of 30)'],
  [K(`${xc('x')} = 6:\\ 180 < ${rc('200')}`) + '&nbsp; ' + ok('true')],
  [K(`${xc('x')} = 7:\\ 210 < ${rc('200')}`) + '&nbsp; ' + no('false')],
  ['At most 6 packets']], { label: 'WORKED EXAMPLE · NCERT', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Let'), wt('W4', 'Thirty'), wt('W5', 'Six'), wt('W6', 'Seven'), wt('W7', 'most')];
const ws = $('#wS'), BY = 470, BH = v => v * 330 / 210, BXp = n => 92 + (n - 1) * 92;
mk(ws, 'line', { x1: 50, y1: BY, x2: 740, y2: BY, stroke: C.ink, 'stroke-width': 3 });
const wLim = mk(ws, 'line', { x1: 50, y1: BY - BH(200), x2: 740, y2: BY - BH(200), stroke: RC, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
const wLimT = txt(ws, 54, BY - BH(200) - 12, '200 rupees', { fill: RC, 'font-weight': 600, 'font-size': 20 });
const bars = []; for (let n = 1; n <= 7; n++) { const r = mk(ws, 'rect', { x: BXp(n) - 30, y: BY, width: 60, height: 0, rx: 6, fill: n === 7 ? C.red : XC }); txt(ws, BXp(n), BY + 30, n, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 20 }); const vl = txt(ws, BXp(n), BY - BH(30 * n) - 10, 30 * n, { 'text-anchor': 'middle', fill: n === 7 ? C.red : C.ink2, 'font-weight': 600, 'font-size': 18 }); bars.push({ n, r, vl }); }
const tBar = n => n <= 5 ? wt('W3', 'cost') + (n - 1) * 0.35 : n === 6 ? wt('W5', 'Six') : wt('W6', 'Seven');
$('#bR').style.cssText += ';left:36px;top:524px;right:auto';

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{not more than } 8:\\ ${xc('p')} < 8`), right: K(`${xc('p')} \\le 8`) + '&nbsp; 8 is allowed' });
const ts = $('#tS'), TX = NL(ts, { x0: 48, x1: 480, y: 170, v0: 0, v1: 9, lab: 1, fs: 18 });
const tDots = []; for (let v = 0; v <= 8; v++) tDots.push({ v, c: mk(ts, 'circle', { cx: TX(v), cy: 170, r: 11, fill: XC, stroke: XC, 'stroke-width': 3 }) });
const where = PUC.where($('#wa'), { on: [], type: 'Turn words into an inequality, then count its answers.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `${K(`-7 \\le 3${xc('x')} + 2 < 14`)}<br>How many integers x make this true?`,
  opts: ['6', '7', '8', '9'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`-9 \\le 3${xc('x')} < 12`) + '&nbsp; (minus 2)'], [K(`-3 \\le ${xc('x')} < 4`) + '&nbsp; (divide by 3)'], ['3 &gt; 0, so nothing flips'], [K(`-3 \\text{ in},\\ 4 \\text{ out}`)], [K(`${xc('x')} = -3, \\dots, 3 \\Rightarrow 7`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Take'), wt('A3', 'Divide'), wt('A3', 'positive'), wt('A4', 'Minus'), wt('A4', 'Seven')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 252, w: 1320, h: 492, title: 'Recap · linear inequalities', y0: 98, dy: 82, txt: [1, 1, 0, 0, 1],
  lines: ['<b>Inequality</b>: joined by &lt;, &gt;, ≤ or ≥ · the mouth faces the bigger side',
    '<b>Strict</b> &lt; &gt;: empty circle &nbsp;·&nbsp; <b>Slack</b> ≤ ≥: filled circle',
    K(`\\text{at most } 8 \\Rightarrow ${xc('p')} \\le ${rc('8')} \\qquad \\text{at least } 120 \\Rightarrow ${xc('h')} \\ge ${rc('120')}`),
    K(`\\text{Linear: } a${xc('x')} + b < 0,\\ \\ a \\ne 0`),
    '<b>Solutions</b>: every value that keeps it true, often endless'] });
const YQ = ['What is the difference between < and ≤ ?', 'Write "spend at most 50 rupees" as an inequality.', 'Why does x + 2 < 5 have endless real answers?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q.replace('<', '&lt;')}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 50', topic: 'Times minus one, and the arrow flips. Why? Solving Linear Inequalities', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [lT0 - 0.3, 1.05, 960, 560], [T0('L5') + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: lift */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    PPL.forEach((g, i) => M.vis(g, t, tPp(i), 1e9, { dy: -30, sp: M.SOFT, fade: 0.12 }));
    const n = PPL.reduce((a, _, i) => t >= tPp(i) ? i + 1 : a, 0);
    M.setT($('#hV'), String(n)); $('#hV').style.color = n >= 9 ? C.red : C.ink;
    attr(lift, 'stroke', n >= 9 ? C.red : C.ink); attr(lift, 'fill', n >= 9 ? C.redBg : C.soft);
    M.vis($('#hRd'), t, tMorph + 0.3, 1e9, { dy: 12 });
    M.vis($('#hOk'), t, tPp(7) + 0.1, t9, POP); M.vis($('#hNo'), t, t9 + 0.1, 1e9, POP);
    M.vis($('#hP'), t, wt('H4', 'Nine'), 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'equals') - 0.1, 1e9, POP);
  }

  /* P: scale + definition */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pb'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    setBeam(0.16 * M.io((t - tTip) / 0.7));
    const f = t >= tTip ? fLt : fEq; if (f !== pLast) { pLast = f; $('#pF').innerHTML = f; }
    PUC.write($('#pF'), t, wt('P2', 'equation'), 0.6);
    M.vis($('#pd'), t, tP4 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.rise($('#dfT'), t, tP4 + 0.1, { st: 0.05, sp: M.HEAVY });
    [0, 1, 2, 3].forEach(i => M.vis($('#psy' + i), t, wt('P4', 'four') + i * 0.15, 1e9, POP));
  }

  /* S: four symbols */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('L1');
    M.vis($('#sl'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    SR.forEach((_, i) => M.vis($('#ss' + i), t, tSs[i] - 0.1, 1e9, { dy: 14 }));
    const hy = M.track(84, tSs.slice(1, 4).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t); const hb = $('#sHi');
    M.vis(hb, t, tSs[0] - 0.1, tSs[4], { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    M.vis($('#sr'), t, tSs[0] + 0.1, out, { dx: 60, dy: 0, ...o });
    const cur = tSs.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, 0);
    if (cur !== sLast) { sLast = cur; const [a, s, b] = SB[cur]; M.setT($('#sBig .a'), a); M.setT($('#sBig .o'), s); M.setT($('#sBig .b'), b); attr(sDa, 'cx', SX(+a)); attr(sDb, 'cx', SX(+b)); }
    const pul = M.io((t - tSs[cur] + 0.1) / 0.3); $('#sBig').style.opacity = (0.2 + 0.8 * pul).toFixed(3);
    M.vis($('#sBig'), t, tSs[0], 1e9, { dy: 10 });
    M.vis(sDa, t, tSs[0] + 0.3, 1e9, DOT); M.vis(sDb, t, tSs[0] + 0.4, 1e9, DOT);
    const big = $('#sBig .b'), hi = M.io((t - wt('S6', 'bigger') + 0.1) / 0.3); big.style.background = mix('#FFFFFF', C.ac2, hi);
    const bg = $('#sBg'); bg.style.left = (big.offsetLeft + big.offsetWidth / 2 - bg.offsetWidth / 2) + 'px'; bg.style.top = '250px';
    M.vis(bg, t, wt('S6', 'bigger'), 1e9, { dy: 8 });
    M.vis($('#sP6'), t, wt('S6', 'open') - 0.1, 1e9, POP);
  }

  /* L: live test */
  const lOn = t >= tL1 - 0.1 && t < tK1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('K1');
    M.vis($('#ll'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const strict = t >= tStrict; const rk = strict ? 'lt' : 'le';
    if (rk !== lLast) { lLast = rk; $('#lR').innerHTML = strict ? rLt : rLe; }
    PUC.write($('#lR'), t, wt('L2', 'less') - 0.1, 0.7);
    if (strict) { const p = M.io((t - tStrict) / 0.3) * (1 - M.io((t - tStrict - 0.6) / 0.4)); $('#lR').style.background = mix('#FFFFFF', C.ac2, p); $('#lR').style.borderRadius = '12px'; }
    let v = -1; for (let k = 0; k <= 10; k++) if (t >= tTest(k) - 0.05) v = k; if (t >= tRe8 - 0.05) v = 8;
    M.vis($('#lP'), t, lT0 - 0.2, 1e9, { dy: 12 });
    M.setT($('#lPv'), String(Math.max(0, v)));
    const vEl = $('#lV');
    if (v >= 0) { const tr = strict && t >= tRe8 - 0.05 ? false : v <= 8; const key = v + (strict ? 's' : '') + tr;
      if (vEl._k !== key) { vEl._k = key; vEl.innerHTML = `${M.icon(tr ? 'check' : 'x', 22, '#fff', 3)}${v} ${strict && t >= tRe8 - 0.05 ? '<' : '≤'} 8 · ${tr ? 'TRUE' : 'FALSE'}`; vEl.style.background = tr ? C.ok : C.red; } }
    M.vis(vEl, t, lT0 - 0.05, 1e9, POP);
    M.vis($('#lSL'), t, wt('L5', 'solutions') - 0.2, 1e9, { dy: 10 });
    const ro = t >= tRe8 + 0.3 ? roLt : roLe; if ($('#lRo')._r !== ro) { $('#lRo')._r = ro; $('#lRo').innerHTML = ro; }
    PUC.write($('#lRo'), t, wt('L5', 'solutions'), 0.9);
    M.vis($('#lr'), t, T0('L2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(lB, t, wt('L2', 'eight', 1) - 0.1, 1e9, { dy: 0 }); M.vis(lBt, t, wt('L2', 'eight', 1), 1e9, { dy: 0 });
    lD.forEach(d => { M.vis(d.g, t, tTest(d.v), 1e9, DOT); const bad = d.v > 8 ? 1 : d.v === 8 ? M.io((t - tRe8) / 0.3) : 0;
      attr(d.c, 'fill', mix(XC, '#FFFFFF', bad)); attr(d.c, 'stroke', mix(XC, C.red, bad)); });
    M.hide(lCr, true);
    const pl = $('#lPl'), pk = t >= tRe8 + 0.2 ? 2 : t >= wt('L5', 'solution', 1) ? 1 : 0;
    if (pl._k !== pk) { pl._k = pk; pl.innerHTML = pk === 2 ? 'Rule p &lt; 8: now 8 is out' : '9 solutions: 0 up to 8'; pl.className = 'pillp ' + (pk === 2 ? 'bad' : 'good'); }
    M.vis(pl, t, wt('L5', 'solution', 1) - 0.1, 1e9, POP);
  }

  /* K: strict vs slack + think */
  const kOn = t >= tK1 - 0.1 && t < tT + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ks'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#ksF'), t, wt('K1', 'Less') - 0.05, 0.6);
    M.draw(kS.r, t, wt('K1', 'strict'), 0.8); M.vis(kS.c, t, wt('K1', 'empty') - 0.1, 1e9, DOT); M.vis(kS.l, t, wt('K1', 'not'), 1e9, { dy: 0 });
    M.vis($('#ksP'), t, wt('K1', 'circle') - 0.1, 1e9, POP);
    M.vis($('#kl'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#klF'), t, T0('K2') + 0.1, 0.6);
    M.draw(kL.r, t, wt('K2', 'slack'), 0.8); M.vis(kL.c, t, wt('K2', 'filled') - 0.1, 1e9, DOT); M.vis(kL.l, t, wt('K2', 'allowed'), 1e9, { dy: 0 });
    M.vis($('#klP'), t, wt('K2', 'circle') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'Strict') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'least') });
  }

  /* statement */
  const stOn = t >= tT && t < tG1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tG1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'equation') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'every') - 0.2, 0.8);
  }

  /* G: kinds */
  const gOn = t >= tG1 - 0.1 && t < tE1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('E1');
    M.vis($('#gl'), t, tG1 + 0.3, out, { dx: -60, dy: 0, ...o });
    GR.forEach((_, i) => M.vis($('#gr' + i), t, tGs[i] - 0.1, 1e9, { dy: 14 }));
    const hy = M.track(84, tGs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t); const hb = $('#gHi');
    M.vis(hb, t, tGs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 6).toFixed(1) + 'px';
    M.vis($('#gr'), t, tGs[0] + 0.1, out, { dx: 60, dy: 0, ...o });
    const cur = tGs.reduce((a, tt, i) => t >= tt - 0.1 ? i : a, 0);
    if ($('#gF')._c !== cur) { $('#gF')._c = cur; $('#gF').innerHTML = GF[cur]; }
    PUC.write($('#gF'), t, tGs[cur] + 0.05, 0.5);
    const nlA = 1 - M.io((t - tGs[3] + 0.1) / 0.3); GX.g.style.opacity = nlA.toFixed(3);
    gNum.forEach(c => M.vis(c, t, tGs[0] + 0.3, tGs[1] - 0.1, DOT)); M.vis(gTr, t, tGs[0] + 0.5, tGs[1] - 0.1, { dy: 0 });
    M.draw(gRay, t, tGs[1] + 0.4, 0.7); gRay.style.opacity = (1 - M.io((t - tGs[2] + 0.1) / 0.25)).toFixed(3);
    M.vis(gO5, t, tGs[1] + 0.3, tGs[3] - 0.1, DOT);
    M.draw(gSeg, t, tGs[2] + 0.4, 0.5); M.vis(gO3, t, tGs[2] + 0.3, tGs[3] - 0.1, DOT); gSeg.style.opacity = nlA.toFixed(3);
    M.setT(gCap, G4C[cur] || ''); M.vis(gCap, t, cur >= 1 && cur <= 2 ? tGs[cur] + 0.6 : null, cur >= 1 && cur <= 2 ? 1e9 : -1, { dy: 0 });
    M.vis(gPl, t, tGs[3] + 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.draw(gLin, t, wt('G5', 'linear') - 0.1, 0.7); M.vis(gLl, t, wt('G5', 'Linear'), 1e9, { dy: 0 });
    M.draw(gPar, t, wt('G5', 'never') - 0.1, 0.7); M.vis(gPlab, t, wt('G5', 'squared'), 1e9, { dy: 0 });
  }

  /* E: equation vs inequality + think */
  const eOn = t >= tE1 - 0.1 && t < tW1 + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    const out = OUT('W1');
    M.vis($('#el'), t, tE1 + 0.05, out, { dx: -60, dy: 0, ...o }); PUC.write($('#elF'), t, T0('E2') + 0.05, 0.6);
    M.vis(eDot, t, wt('E2', 'three'), 1e9, DOT); M.vis($('#elP'), t, wt('E2', 'three') + 0.2, 1e9, POP);
    M.vis($('#er'), t, T0('E3') - 0.1, out, { dx: 60, dy: 0, ...o }); PUC.write($('#erF'), t, T0('E3') + 0.1, 0.6);
    eTk.forEach(e => M.vis(e.g, t, e.t, 1e9, DOT)); M.vis(eM, t, eTk[3].t, 1e9, { dy: 0 }); M.vis(e29, t, eTk[4].t, 1e9, { dy: 0 });
    M.draw(eRay, t, tThOut + 0.2, 0.8); M.vis(eO, t, tThOut + 0.1, 1e9, DOT);
    const nat = M.io((t - wt('E5', 'natural')) / 0.4); eRay.style.opacity = (1 - 0.7 * nat).toFixed(3);
    eTk.forEach(e => { e.g.style.opacity = (1 - 0.7 * nat).toFixed(3); }); eM.style.opacity = e29.style.opacity = (1 - 0.7 * nat).toFixed(3);
    eNat.forEach((g, i) => M.vis(g, t, wt('E5', i ? 'two' : 'one') - 0.05, 1e9, DOT));
    const ep = $('#erP'), ek = nat > 0 ? 1 : 0; if (ep._k !== ek) { ep._k = ek; ep.innerHTML = ek ? 'x natural: only 1 and 2' : 'Every real number left of 3'; }
    M.vis(ep, t, tThOut + 0.5, 1e9, POP);
    M.vis($('#th2'), t, tE4 + 0.05, tThOut, { dy: 36, ...o });
    th2(t, { tin: tE4, tOpts: wt('E4', 'real') - 0.1, tCount: T1('E4') + 0.05, dur: 3, tAns: T0('E5') - 0.02, tWhy: wt('E5', 'Every') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wLim, t, wt('W4', 'Two') - 0.1, 0.6); M.vis(wLimT, t, wt('W4', 'Two'), 1e9, { dy: 0 });
    let top = 0;
    bars.forEach(b => { const u = M.spring(t - tBar(b.n), M.SOFT), h = BH(30 * b.n) * Math.max(0, u); attr(b.r, 'y', (BY - h).toFixed(1)); attr(b.r, 'height', Math.max(0, h).toFixed(1)); M.hide(b.r, t < tBar(b.n)); M.vis(b.vl, t, tBar(b.n) + 0.3, 1e9, { dy: 0 }); if (t >= tBar(b.n)) top = b.n; });
    if (top) M.setT($('#bR'), `30 × ${top} = ${30 * top}  ${30 * top < 200 ? '< 200' : '> 200'}`);
    $('#bR').style.background = top === 7 ? C.red : C.ink;
    M.vis($('#bR'), t, tBar(1) + 0.2, 1e9, { dy: 8 });
  }

  /* X: trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    const tR = wt('X3', 'So') + 0.1;
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'lets') - 0.1, tRight: tR });
    tDots.forEach(d => { M.vis(d.c, t, wt('X2', 'Many') + d.v * 0.08, 1e9, DOT); if (d.v === 8) { const g = M.io((t - tR) / 0.3); attr(d.c, 'fill', mix('#FFFFFF', XC, g)); attr(d.c, 'stroke', mix(C.red, XC, g)); } });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'type') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'How'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9, tF + 2.4], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
