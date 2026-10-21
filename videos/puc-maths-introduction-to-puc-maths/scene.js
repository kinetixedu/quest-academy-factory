// PUC Maths Ep 01: Introduction to PUC Maths (Proof board, subject intro)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// number families: N coral (accent), Z teal, Q blue, R ink, irrational violet
const NC = C.ac, ZC = C.teal, QC = '#2F6FEB', RC = C.ink, IC = C.violet;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const col = (c, s) => `\\textcolor{${c}}{${s}}`;

Object.assign(M.IC, {
  bike: ['M5.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M18.5 17.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  angle: ['M4 20h16', 'M4 20 15 6', 'M10 20a6 6 0 0 0-2.2-4.6'],
  curve: ['M3 20C7 4 17 4 21 20'],
  circ: ['M9 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0', 'M15 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0'],
  wave: ['M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 3.5-4 5-3'],
  plane: ['M12 3v18', 'M3 12h18', 'M17 7l-5 5'],
  puzzle: ['M19.4 14.5a2.5 2.5 0 1 0 0-5H18V6a2 2 0 0 0-2-2h-3.5v1.4a2.5 2.5 0 1 1-5 0V4H4v4h1.4a2.5 2.5 0 1 1 0 5H4v7h3.5v-1.4a2.5 2.5 0 1 1 5 0V20H16a2 2 0 0 0 2-2v-3.5z'],
  pencil: ['M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'],
  alert: ['M12 9v4', 'M12 17h.01', 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'],
  target: ['M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0'],
  card: ['M4 4h16v16H4z', 'M8 9h8', 'M8 13h8', 'M8 17h5'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02;
const tM1 = T0('M1'), tC1 = T0('C1'), tB1 = T0('B1'), tK1 = T0('K1'), tK5 = T0('K5'), tE1 = T0('E1'), tT = T0('T1'), tS1 = T0('S1'), tP1 = T0('P1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tS1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: four question chips ---------- */
const TC = [['COUNT', '?'], ['SPEED', '?'], ['ANGLE', '?'], ['CURVE', '?']];
$('#tcs').innerHTML = TC.map(([n, v], i) => `<div class="tc" id="tc${i}" style="left:${384 + i * 296}px"><div class="ln">${n}</div><div class="lv a">${v}</div></div>`).join('');
const tTc = [0, 1, 2, 3].map(i => wt('H1', 'How') + i * 0.2);

/* ---------- H ---------- */
const HR = [['users', 'Count', 'FRIENDS AT THE GATE', '4'], ['gauge', 'Speed', 'KILOMETRES PER HOUR', '15 <span style="font-size:24px">km/h</span>'], ['angle', 'Angle', 'LEANING INTO A TURN', '45°'], ['curve', 'Curve', 'THE PATH OF A THROWN BALL', '']];
$('#hrs').innerHTML = HR.map(([ic, n, w, v], i) => `<div class="hr" id="hr${i}" style="top:${84 + i * 112}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="hn">${n}</div><div class="hw">${w}</div><div class="hv">${v}</div></div>`).join('');
const tHr = [wt('H2', 'four'), wt('H2', 'fifteen'), wt('H2', 'forty'), wt('H3', 'curve')];
const hc = $('#hcS'), hPar = mk(hc, 'path', { d: 'M560,500 Q650,388 740,500', fill: 'none', stroke: C.ac, 'stroke-width': 5, 'stroke-linecap': 'round' });
const hBall = mk(hc, 'circle', { r: 10, fill: C.ink, cx: -99, cy: -99 });

/* ---------- M: a language for patterns, odd numbers build squares ---------- */
const pS = $('#ptS'), CS = 64, PX0 = 264, PY0 = 140;
const cells = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const k = Math.max(r, c); cells.push({ k, el: mk(pS, 'rect', { x: PX0 + c * CS + 3, y: PY0 + r * CS + 3, width: CS - 6, height: CS - 6, rx: 8, fill: k % 2 ? C.ac2 : '#EDE6FC', stroke: k % 2 ? C.ac : IC, 'stroke-width': 2.5 }) }); }
const tPk = [wt('M2', 'language'), wt('M2', 'language') + 0.9, wt('M2', 'patterns') + 0.4, T0('M4') + 0.3];
const SUMS = ['1 = 1²', '1 + 3 = 2²', '1 + 3 + 5 = 3²', '1 + 3 + 5 + 7 = 4²'];
$('#pF').innerHTML = K(`${col(IC, '1')} + ${col(C.ac, '3')} + ${col(IC, '5')} + ${col(C.ac, '7')} = 4^2 = 16`);

/* ---------- C: chapter map ---------- */
const CHS = ['Sets', 'Relations and Functions', 'Trigonometric Functions', 'Complex Numbers and Quadratic Equations', 'Linear Inequalities', 'Permutations and Combinations', 'Binomial Theorem', 'Sequences and Series', 'Straight Lines', 'Conic Sections', 'Introduction to Three Dimensional Geometry', 'Limits and Derivatives', 'Statistics', 'Probability'];
$('#cms').innerHTML = CHS.map((n, i) => `<div class="cm" id="cm${i}" style="left:${48 + (i % 4) * 382}px;top:${84 + Math.floor(i / 4) * 88}px;white-space:normal;line-height:1.15;font-size:${n.length > 26 ? 18 : 21}px"><b>${i + 1}</b><span>${n}</span></div>`).join('');
const CD = [['circ', 'Sets: group things so everyone agrees what belongs'], ['arrowR', 'Relations and functions: rules that link one thing to another'], ['wave', 'Trigonometric functions: turns, angles and waves'], ['plane', 'Complex numbers: numbers that live beyond the number line']];
const tCd = [T0('C3'), T0('C4'), T0('C5'), T0('C6')];

/* ---------- B: number system ---------- */
const NB = [['R', '\\mathbb{R}', 'Real', RC, 36, 80, 712, 470], ['Q', '\\mathbb{Q}', 'Rational', QC, 56, 140, 470, 390], ['Z', '\\mathbb{Z}', 'Integers', ZC, 76, 210, 320, 300], ['N', '\\mathbb{N}', 'Natural', NC, 96, 290, 180, 200]];
$('#nbs').innerHTML = NB.map(([id, s, n, c, x, y, w, h]) => `<div class="nb" id="nb${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-color:${c};background:#fff"></div><div class="nl" id="nl${id}" style="left:${x + 16}px;top:${y + 10}px;color:${c}">${K(col(c, s))} ${n}</div>`).join('') +
  `<div class="nl" id="nlI" style="left:552px;top:150px;color:${IC}">Irrational</div>` +
  `<div class="ne" id="neN" style="left:116px;top:360px;color:${NC}">1, 2, 3, ...</div>` +
  `<div class="ne" id="neZ" style="left:290px;top:300px;color:${ZC};line-height:1.5">0<br>-1<br>-7</div>` +
  `<div class="ne" id="neQ" style="left:410px;top:240px;line-height:1.5">${K(col(QC, '\\dfrac{1}{2}'))}<br>${K(col(QC, '-\\dfrac{3}{4}'))}</div>` +
  `<div class="ne" id="neI" style="left:560px;top:220px;line-height:1.7;font-size:30px">${K(col(IC, '\\sqrt{2}'))}<br>${K(col(IC, '\\pi'))}</div>`;
const tNb = { N: wt('B2', 'Natural'), Z: wt('B3', 'integers'), Q: wt('B4', 'rational'), I: wt('B5', 'irrational'), R: wt('B6', 'real') };
const tNest = [wt('B7', 'natural'), wt('B7', 'integer'), wt('B7', 'rational'), wt('B7', 'real')];
const nS = $('#nS'), NX = v => 392 + v * 78, NY = 250;
mk(nS, 'line', { x1: 44, y1: NY, x2: 740, y2: NY, stroke: C.ink, 'stroke-width': 3 });
mk(nS, 'path', { d: `M740,${NY} l-14,-8 v16 z`, fill: C.ink }); mk(nS, 'path', { d: `M44,${NY} l14,-8 v16 z`, fill: C.ink });
for (let v = -4; v <= 4; v++) { mk(nS, 'line', { x1: NX(v), y1: NY - 10, x2: NX(v), y2: NY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(nS, NX(v), NY + 46, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const nFill = mk(nS, 'line', { x1: 56, y1: NY, x2: 728, y2: NY, stroke: RC, 'stroke-width': 9, 'stroke-linecap': 'round' });
const nd = []; const ndot = (v, fam, c, lab) => { const g = mk(nS, 'g', {}); mk(g, 'circle', { cx: NX(v), cy: NY, r: 11, fill: c }); if (lab) txt(g, NX(v), NY - 28, lab, { 'text-anchor': 'middle', 'font-size': 20, fill: c, 'font-weight': 600 }); nd.push({ g, fam, v }); };
for (let v = 1; v <= 4; v++) ndot(v, 'N', NC); for (let v = -4; v <= 0; v++) ndot(v, 'Z', ZC);
[[0.5, '1/2'], [-0.75, '-3/4'], [2.5, '5/2']].forEach(([v, l]) => ndot(v, 'Q', QC, l));
[[Math.SQRT2, '√2'], [Math.PI, 'π']].forEach(([v, l]) => ndot(v, 'I', IC, l));
$('#nTag').innerHTML = `<span class="mono" style="color:${IC}">√2 = 1.41421...</span>&nbsp;&nbsp;<span class="mono" style="color:${IC}">π = 3.14159...</span>`;

/* ---------- K: decimal test ---------- */
const DR = [['\\tfrac{1}{4}', '0.25', 'STOPS', 1, 'K2'], ['\\tfrac{1}{3}', '0.33333333333...', 'REPEATS', 1, 'K3'], ['\\sqrt{2}', '1.41421356237...', 'NEVER REPEATS', 0, 'K4']];
$('#drs').innerHTML = DR.map(([f, d, ty, ok], i) => `<div class="dr" id="dr${i}" style="top:${84 + i * 136}px"><div class="df">${K(col(ok ? QC : IC, f))}</div><div class="dd" id="dd${i}"></div><div class="dt" id="dt${i}" style="color:${ok ? QC : IC}">${ty}</div><div class="dv" id="dv${i}" style="background:${ok ? QC : IC}">${ok ? 'RATIONAL' : 'IRRATIONAL'}</div></div>`).join('');
const tDd = [[wt('K2', 'zero'), wt('K2', 'stops')], [wt('K3', 'zero'), T1('K3') - 0.3], [wt('K4', 'one'), wt('K4', 'never') + 0.6]];
const tDt = [wt('K2', 'stops'), wt('K3', 'repeats'), wt('K4', 'never')], tDv = [wt('K2', 'stops') + 0.4, wt('K3', 'repeats') + 0.4, wt('K4', 'irrational')];
const th1 = PUC.think($('#th1'), { q: 'Is 0.121212... (repeating) rational or irrational?', opts: ['Rational', 'Irrational'], right: 0, why: 'The block 12 repeats forever: 0.121212... = 12/99 = 4/33, a fraction.' });

/* ---------- E: equation vs inequality ---------- */
$('#eqV').innerHTML = K(col(IC, 'x')) + '&nbsp; a number we do not know yet'; $('#eqF').innerHTML = K(`${col(IC, 'x')} + 3 = 7`); $('#inF').innerHTML = K(`${col(IC, 'x')} + 3 < 7`);
const EX = v => 92 + (v + 4) * 60, EY = 360;
const nline = s => { mk(s, 'line', { x1: 52, y1: EY, x2: 732, y2: EY, stroke: C.ink, 'stroke-width': 3 }); for (let v = -4; v <= 6; v++) { mk(s, 'line', { x1: EX(v), y1: EY - 9, x2: EX(v), y2: EY + 9, stroke: C.ink, 'stroke-width': 2 }); txt(s, EX(v), EY + 42, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); } };
const eS = $('#eqS'), iS = $('#inS'); nline(eS); nline(iS);
const eDot = mk(eS, 'circle', { cx: EX(4), cy: EY, r: 14, fill: C.ac }); const eLab = txt(eS, EX(4), EY - 32, 'x = 4', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ac, 'font-weight': 600 });
const iRay = mk(iS, 'line', { x1: EX(4), y1: EY, x2: 56, y2: EY, stroke: C.ac, 'stroke-width': 10, 'stroke-linecap': 'round' });
const iAr = mk(iS, 'path', { d: `M44,${EY} l18,-12 v24 z`, fill: C.ac });
const iO = mk(iS, 'circle', { cx: EX(4), cy: EY, r: 14, fill: '#fff', stroke: C.ac, 'stroke-width': 4 });
const iLab = txt(iS, EX(4), EY - 32, '4 not included', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ac, 'font-weight': 600 });
const iDot = mk(iS, 'circle', { r: 12, fill: IC, cx: -99, cy: -99 });
const tI0 = wt('E5', 'Now'), tI1 = T1('E5') - 0.1;
const iX = t => 3.9 - 7.4 * M.io((t - tI0) / Math.max(1, tI1 - tI0));

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${col(NC, '\\mathbb{N}')} \\subset ${col(ZC, '\\mathbb{Z}')} \\subset ${col(QC, '\\mathbb{Q}')} \\subset ${col(RC, '\\mathbb{R}')}`);

/* ---------- S: symbols ---------- */
const SY = [['\\in', 'belongs to', `2 \\in ${col(NC, '\\mathbb{N}')}`, 'S2', 'belongs'], ['\\Rightarrow', 'implies', `x = 4 \\;\\Rightarrow\\; x^2 = 16`, 'S4', 'implies'], ['|x|', 'size of a number, sign ignored', `|-5| = 5`, 'S5', 'bars']];
$('#sys').innerHTML = SY.map(([s, m, e], i) => `<div class="sy" id="sy${i}" style="top:${84 + i * 148}px"><div class="sg">${K(col(C.ac, s))}</div><div class="sm">${m}</div><div class="se" id="se${i}">${K(e)}</div></div>`).join('');
const tSy = SY.map(([, , , id, w]) => wt(id, w));
const sS = $('#syS'), SX = v => 1240 + v * 44, SYY = 84 + 2 * 148 + 84;
mk(sS, 'line', { x1: SX(-6.5), y1: SYY, x2: SX(6.5), y2: SYY, stroke: C.ink, 'stroke-width': 2.5 });
for (let v = -6; v <= 6; v++) { mk(sS, 'line', { x1: SX(v), y1: SYY - 7, x2: SX(v), y2: SYY + 7, stroke: C.ink, 'stroke-width': 2 }); if (v % 5 === 0) txt(sS, SX(v), SYY + 32, v, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
const sB1 = mk(sS, 'path', { d: `M${SX(-5)},${SYY - 20} v-12 H${SX(0)} v12`, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-linecap': 'round' });
const sB2 = mk(sS, 'path', { d: `M${SX(0)},${SYY - 20} v-12 H${SX(5)} v12`, fill: 'none', stroke: C.ac, 'stroke-width': 3, 'stroke-linecap': 'round' });
const sD = [mk(sS, 'circle', { cx: SX(-5), cy: SYY, r: 9, fill: C.ac }), mk(sS, 'circle', { cx: SX(5), cy: SYY, r: 9, fill: C.ac })];
const sL = [txt(sS, SX(-2.5), SYY - 42, '5 steps', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ac, 'font-weight': 600 }), txt(sS, SX(2.5), SYY - 42, '5 steps', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ac, 'font-weight': 600 })];
// hide the number line until its row arrives
const sLineG = [...sS.children];

/* ---------- P: episode flow ---------- */
const FL = [['puzzle', 'A daily-life puzzle'], ['bulb', 'The idea'], ['chart', 'A live picture'], ['pencil', 'Worked example'], ['alert', 'The exam trap'], ['target', 'Exam level question'], ['card', 'Recap card']];
$('#fls').innerHTML = FL.map(([ic, n], i) => `<div class="fl2" id="fl${i}" style="left:${48 + i * 219}px"><i>${M.icon(ic, 34, i < 4 ? C.ink2 : C.ac, 2.2)}</i><div class="fn">0${i + 1}</div><div class="ft">${n}</div></div>`).join('');
const fS = $('#flS');
const fAr = FL.slice(1).map((_, i) => mk(fS, 'path', { d: `M${48 + i * 219 + 192},225 h21`, stroke: C.dim, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
const fBr = [mk(fS, 'path', { d: `M48,352 v12 H${48 + 3 * 219 + 186} v-12`, fill: 'none', stroke: C.ink2, 'stroke-width': 3 }), mk(fS, 'path', { d: `M${48 + 4 * 219},352 v12 H${48 + 6 * 219 + 186} v-12`, fill: 'none', stroke: C.ac, 'stroke-width': 3 })];
const fBl = [txt(fS, 48 + 1.5 * 219 + 93, 400, 'THE LESSON', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink2, 'font-weight': 600, 'letter-spacing': 2 }), txt(fS, 48 + 5 * 219 + 93, 400, 'THE EXAM PART', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ac, 'font-weight': 600, 'letter-spacing': 2 })];
const tFl = [wt('P2', 'puzzle'), wt('P2', 'idea'), wt('P2', 'live'), wt('P2', 'worked'), wt('P3', 'trap'), wt('P3', 'level'), wt('P3', 'recap')];
$('#flB').style.top = '450px'; $('#flB').style.background = 'var(--ac2)'; $('#flB').style.color = 'var(--ac)'; $('#flB').textContent = 'SAME SHAPE IN EVERY EPISODE';

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Sort these six numbers into their families:<br>${K(`-5,\\; 0,\\; \\tfrac{3}{4},\\; \\sqrt{2},\\; \\pi,\\; 7`)}`;
const wsol = PUC.solution($('#wl'), [
  [K(`7`) + ': natural, so also integer, rational, real'],
  [K(`-5,\\ 0`) + ': integers, but not natural'],
  [K(`\\tfrac{3}{4}`) + ': rational, but not an integer'],
  [K(`\\sqrt{2},\\ \\pi`) + ': irrational, but still real']], { label: 'WORKED EXAMPLE', y0: 210, dy: 84 });
$('#wl .lbl').style.top = '30px';
const WN = ['-5', '0', '\\tfrac{3}{4}', '\\sqrt{2}', '\\pi', '7'];
const WT = [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 1, 1, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1], [1, 1, 1, 1, 0]];
const WS = [1, 1, 2, 3, 3, 0]; // which solution step ticks the row
const HC = [['N', NC], ['Z', ZC], ['Q', QC], ['R', RC], ['IRR', IC]];
$('#tgs').innerHTML = HC.map(([h, c], j) => `<div class="th" style="left:${200 + j * 110}px;color:${c}">${h}</div>`).join('') +
  WN.map((n, r) => `<div class="tl" id="tl${r}" style="top:${124 + r * 72}px">${K(n)}</div>` + HC.map((h, j) => `<div class="tg" id="tg${r}${j}" style="left:${200 + j * 110}px;top:${124 + r * 72}px"></div>`).join('')).join('');
const tW = [wt('W3', 'Seven'), wt('W4', 'Minus'), wt('W5', 'Three'), wt('W6', 'Root')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\pi = 22/7`) + '&nbsp; exactly', right: K(`\\pi \\approx 22/7`) + '&nbsp; only a close guess' });
const ts = $('#tS');
const tr1 = txt(ts, 40, 112, '', { 'font-size': 36, fill: C.ink, 'font-weight': 600 }); tr1.innerHTML = `<tspan>22/7 = 3.14</tspan><tspan fill="${C.red}">28571...</tspan>`;
const tr2 = txt(ts, 40, 182, '', { 'font-size': 36, fill: C.ink, 'font-weight': 600 }); tr2.innerHTML = `<tspan>   π = 3.14</tspan><tspan fill="${C.ok}">15926...</tspan>`;
const trN = txt(ts, 40, 236, 'they split at the third decimal place', { 'font-size': 20, fill: C.mute, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Not on its own: these tools sit inside almost every JEE Main and board question' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780,
  q: `How many of these five numbers are rational?<br>${K(`\\sqrt{2}\\cdot\\sqrt{8},\\quad \\pi - \\tfrac{22}{7},\\quad 0.1010010001\\ldots`)}<br>${K(`(\\sqrt{3}+1)^2 - 2\\sqrt{3},\\quad 1.\\overline{2}`)}`,
  opts: ['1', '2', '3', '4'], right: 2, optW: 474, optY: 340 });
const so = PUC.solution($('#so'), [[K(`\\sqrt{2}\\cdot\\sqrt{8} = \\sqrt{16} = 4`) + ' ✓'], [K(`(\\sqrt{3}+1)^2 - 2\\sqrt{3} = 4`) + ' ✓'], [K(`1.\\overline{2} = \\tfrac{11}{9}`) + ' ✓'], [K(`\\pi - \\tfrac{22}{7},\\ 0.1010010001\\ldots`) + ' ✗'], ['So 3 are rational']], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Root'), wt('A3', 'Root'), wt('A4', 'One'), wt('A5', 'Pi'), wt('A5', 'So')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · your toolkit', y0: 98, dy: 80, txt: [0, 1, 1, 0, 0],
  lines: [K(`${col(NC, '\\mathbb{N}')} \\subset ${col(ZC, '\\mathbb{Z}')} \\subset ${col(QC, '\\mathbb{Q}')} \\subset ${col(RC, '\\mathbb{R}')}`),
    '<b>Rational</b> = p/q, q ≠ 0: the decimal stops or repeats',
    `<b>Irrational</b>: never stops, never repeats (${K('\\sqrt{2},\\ \\pi')})`,
    K(`x + 3 = 7 \\Rightarrow x = 4 \\qquad x + 3 < 7 \\Rightarrow x < 4`),
    K(`2 \\in \\mathbb{N} \\qquad |-5| = 5`)] });
const YQ = ['Is 0.75 rational? Write it as p/q.', 'What is the difference between x = 3 and x < 3?', 'Is every integer a natural number?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 02', topic: 'Three lists, one set: Definition and Representation of Sets', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('B7') - 0.2, 1.06, 960, 560], [T1('B7') + 0.3, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  TC.forEach((_, i) => M.vis($('#tc' + i), t, tTc[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tM1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('M1');
    M.vis($('#hk'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.3, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'count') - 0.1, 1e9, POP);
    M.vis($('#hm'), t, tMorph + 0.25, out, { dx: 60, dy: 0, ...o }); M.vis($('#exH'), t, tMorph + 0.6, 1e9, { dy: 8 });
    HR.forEach((_, i) => { const el = $('#hr' + i); M.vis(el, t, tHr[i] - 0.1, 1e9, { dy: 16 }); const hl = M.io((t - wt('H4', ['count', 'speed', 'angle', 'curve'][i]) + 0.05) / 0.25) * (1 - M.io((t - wt('H4', ['speed', 'angle', 'curve', 'year'][i]) + 0.05) / 0.25)); el.style.background = mix(C.soft, C.ac2, hl); });
    M.draw(hPar, t, tHr[3], 0.9); const bu = M.clamp((t - tHr[3]) / 0.9); attr(hBall, 'cx', (560 + 180 * bu).toFixed(1)); attr(hBall, 'cy', (500 - 4 * 56 * bu * (1 - bu)).toFixed(1)); M.hide(hBall, bu <= 0);
  }

  /* M: language + odd-number squares */
  const mOn = t >= tM1 - 0.1 && t < tC1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('C1');
    M.vis($('#lg'), t, tM1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#lgT'), t, T0('M2') + 0.05, { st: 0.06, sp: M.HEAVY });
    const lw = $('#lgT b'); lw.style.background = mix('#FFFFFF', C.ac2, M.io((t - wt('M2', 'language')) / 0.3)); lw.style.borderRadius = '8px';
    M.rise($('#lgS'), t, wt('M4', 'Learn'), { st: 0.04 });
    M.vis($('#pt'), t, tM1 + 0.3, out, { dx: 60, dy: 0, ...o });
    let k = 0; tPk.forEach((tt, i) => { if (t >= tt) k = i + 1; });
    cells.forEach(cl => M.vis(cl.el, t, tPk[cl.k] + 0.04 * (cl.k), 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }));
    M.setT($('#pCnt'), k ? SUMS[k - 1] : '');
    M.vis($('#pCnt'), t, tPk[0], 1e9, POP);
    PUC.write($('#pF'), t, tPk[3] + 0.6, 0.8);
  }

  /* C: chapter map */
  const cOn = t >= tC1 - 0.1 && t < tB1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cmap'), t, tC1 + 0.05, OUT('B1'), { dy: 36, ...o });
    CHS.forEach((_, i) => { const el = $('#cm' + i); M.vis(el, t, wt('C1', 'Fourteen') - 0.2 + i * 0.07, 1e9, { dy: 12, fade: 0.12 });
      const first = i < 4 ? M.io((t - wt('C2', 'first')) / 0.3) : 0, cur = i < 4 ? M.io((t - tCd[i] + 0.05) / 0.3) : 0;
      el.style.background = mix(mix(C.soft, '#FFFFFF', first), C.ac, cur); el.style.color = mix(i < 4 ? C.ink : C.mute, '#FFFFFF', cur);
      el.style.boxShadow = first > 0.01 ? `inset 0 0 0 ${(2.5 * first).toFixed(2)}px ${C.ac}` : '';
      const b = el.querySelector('b'); b.style.color = mix(C.mute, C.ac, Math.max(first, cur)); });
    const cur = tCd.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, -1);
    M.vis($('#cmD'), t, tCd[0] - 0.1, 1e9, { dy: 16 });
    if (cur >= 0) { PUC.setIco($('#cmI'), CD[cur][0], C.ac, 30, 2.4); M.setT($('#cmT'), CD[cur][1]); }
  }

  /* B: number system */
  const bOn = t >= tB1 - 0.1 && t < tK1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('K1');
    M.vis($('#nsy'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    ['N', 'Z', 'Q', 'R'].forEach((id, j) => { M.vis($('#nb' + id), t, tNb[id] - 0.15, 1e9, { dy: 0, sc: 0.94, sp: M.SOFT, fade: 0.15 }); M.vis($('#nl' + id), t, tNb[id], 1e9, { dy: 8 });
      const pulse = M.io((t - tNest[3 - j] + 0.05) / 0.2) * (1 - M.io((t - tNest[3 - j] - 0.55) / 0.3)); const c = NB[j][3]; $('#nb' + id).style.background = mix('#FFFFFF', mix(c, '#FFFFFF', 0.86), pulse); });
    // inner boxes sit above the outer boxes' fill: keep stacking by DOM order, R first
    M.vis($('#neN'), t, tNb.N + 0.3, 1e9, { dy: 8 }); M.vis($('#neZ'), t, tNb.Z + 0.3, 1e9, { dy: 8 }); M.vis($('#neQ'), t, tNb.Q + 0.3, 1e9, { dy: 8 });
    M.vis($('#nlI'), t, tNb.I - 0.1, 1e9, { dy: 8 }); M.vis($('#neI'), t, wt('B5', 'Root'), 1e9, { dy: 8 });
    M.vis($('#nln'), t, wt('B2', 'counting') - 0.2, out, { dx: 60, dy: 0, ...o });
    nd.forEach(d => { const t0 = d.fam === 'N' ? tNb.N + 0.2 + (d.v - 1) * 0.12 : d.fam === 'Z' ? tNb.Z - 0.4 + (d.v + 4) * 0.08 : d.fam === 'Q' ? wt('B4', 'fraction') : (d.v < 2 ? wt('B5', 'Root') : wt('B5', 'Pi')); M.vis(d.g, t, t0, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
    M.draw(nFill, t, wt('B6', 'fill') - 0.1, 1.0);
    M.vis($('#nTag'), t, tNb.I + 0.3, 1e9, POP);
  }

  /* K: decimal test + think */
  const kOn = t >= tK1 - 0.1 && t < tE1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#dtc'), t, tK1 + 0.05, OUT('K5'), { dy: 36, ...o });
    DR.forEach(([, d], i) => { M.vis($('#dr' + i), t, tK1 + 0.4 + i * 0.15, 1e9, { dy: 16 });
      const [a, b] = tDd[i], n = Math.round(d.replace('...', '').length * M.clamp((t - a) / Math.max(0.3, b - a)));
      const full = d.replace('...', ''); M.setT($('#dd' + i), n >= full.length && d.endsWith('...') ? d : full.slice(0, n));
      M.vis($('#dt' + i), t, tDt[i] - 0.05, 1e9, POP); M.vis($('#dv' + i), t, tDv[i] - 0.05, 1e9, POP); });
    M.vis($('#th1'), t, tK5 + 0.05, OUT('E1'), { dy: 36, ...o });
    th1(t, { tin: tK5, tOpts: wt('K5', 'Rational') - 0.1, tCount: T1('K5') + 0.05, dur: 3, tAns: T0('K6') - 0.02, tWhy: wt('K6', 'block') });
  }

  /* E: equation vs inequality */
  const eOn = t >= tE1 - 0.1 && t < tT + 0.1; M.hide($('#sE'), !eOn);
  if (eOn) {
    M.vis($('#eqc'), t, tE1 + 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis($('#eqV'), t, wt('E2', 'variable') - 0.1, 1e9, POP);
    PUC.write($('#eqF'), t, wt('E3', 'equation') + 0.3, 0.7);
    M.vis(eDot, t, wt('E3', 'four') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(eLab, t, wt('E3', 'four'), 1e9, { dy: 0 });
    M.vis($('#eqP'), t, wt('E3', 'one') - 0.1, 1e9, POP);
    M.vis($('#inc'), t, wt('E4', 'inequality') - 0.1, 1e9, { dx: 60, dy: 0 });
    PUC.write($('#inF'), t, wt('E4', 'less') - 0.2, 0.7);
    M.vis(iO, t, tI0 - 0.1, 1e9, { dy: 0, fade: 0.1 }); M.vis(iLab, t, tI0, 1e9, { dy: 0 });
    M.draw(iRay, t, tI0, Math.max(1, tI1 - tI0), M.io); M.vis(iAr, t, tI1 - 0.2, 1e9, { dy: 0 });
    const xv = iX(t), on = t >= tI0; attr(iDot, 'cx', EX(xv).toFixed(1)); attr(iDot, 'cy', EY); M.hide(iDot, !on);
    M.setT($('#iRd'), on ? `x = ${xv.toFixed(1)}  →  ${(xv + 3).toFixed(1)} < 7 ✓` : ''); M.vis($('#iRd'), t, tI0, 1e9, { dy: 8 });
    M.vis($('#inP'), t, wt('E5', 'stretch') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tS1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tS1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Maths') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Learn') - 0.1, 0.9);
  }

  /* S: symbols */
  const sOn = t >= tS1 - 0.1 && t < tP1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    M.vis($('#syc'), t, tS1 + 0.3, OUT('P1'), { dy: 36, ...o });
    SY.forEach((_, i) => { M.vis($('#sy' + i), t, tSy[i] - 0.2, 1e9, { dy: 16 }); PUC.write($('#se' + i), t, tSy[i] + 0.5, 0.7); });
    sLineG.forEach(el => { if (el !== sB1 && el !== sB2 && !sD.includes(el) && !sL.includes(el)) M.vis(el, t, tSy[2] + 0.3, 1e9, { dy: 0, fade: 0.2 }); });
    sD.forEach((d, i) => M.vis(d, t, wt('S5', 'five') + i * 0.5, 1e9, { dy: 0, fade: 0.1 }));
    M.draw(sB1, t, wt('S5', 'five'), 0.5); M.draw(sB2, t, wt('S5', 'five') + 0.5, 0.5);
    sL.forEach((l, i) => M.vis(l, t, wt('S5', 'five') + 0.4 + i * 0.5, 1e9, { dy: 0 }));
  }

  /* P: episode flow */
  const pOn = t >= tP1 - 0.1 && t < tW1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#flc'), t, tP1 + 0.05, OUT('W1'), { dy: 36, ...o });
    FL.forEach((_, i) => { const el = $('#fl' + i); M.vis(el, t, tP1 + 0.4 + i * 0.08, 1e9, { dy: 12, fade: 0.12 });
      const on = M.io((t - tFl[i] + 0.05) / 0.25), ex = i >= 4; el.style.background = mix(C.soft, ex ? C.ac : C.ink, on); el.querySelector('.ft').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.fn').style.color = mix(C.mute, '#FFFFFF', on); });
    fAr.forEach((a, i) => M.draw(a, t, tFl[i] + 0.1, 0.3));
    M.draw(fBr[0], t, wt('P2', 'worked') + 0.4, 0.5); M.vis(fBl[0], t, wt('P2', 'worked') + 0.5, 1e9, { dy: 0 });
    M.draw(fBr[1], t, wt('P3', 'recap') + 0.4, 0.5); M.vis(fBl[1], t, wt('P3', 'recap') + 0.5, 1e9, { dy: 0 });
    M.vis($('#flB'), t, T1('P3') - 0.3, 1e9, POP);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    WN.forEach((_, r) => { M.vis($('#tl' + r), t, T0('W2') + 0.6 + r * 0.08, 1e9, { dy: 8 });
      HC.forEach(([, c], j) => { const el = $('#tg' + r + j); M.vis(el, t, T0('W2') + 0.7 + r * 0.05, 1e9, { dy: 0, fade: 0.12 });
        const on = WT[r][j] ? M.io((t - tW[WS[r]] - 0.25 - j * 0.12) / 0.25) : 0; el.style.background = mix(C.soft, mix(c, '#FFFFFF', 0.82), on);
        if (WT[r][j] && on > 0.01) PUC.setIco(el, 'check', c, 28, 3.2); else if (el._k) { el._k = null; el.innerHTML = ''; } }); });
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'irrational') - 0.1, tRight: wt('X3', 'guess') - 0.1 });
    M.vis(tr1, t, wt('X3', 'guess') + 0.3, 1e9, { dy: 0 }); M.vis(tr2, t, wt('X3', 'Pi', 1) - 0.1, 1e9, { dy: 0 }); M.vis(trN, t, wt('X3', 'digits'), 1e9, { dy: 0 });
    where(t, { tin: T0('J1'), tLight: [], tType: wt('J1', 'tools') });
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
