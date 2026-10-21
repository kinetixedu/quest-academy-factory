// PUC Physics Ep 70: Apparent weight and weightlessness (Motion notebook, Diya on a scale in a lift + scale reading against time)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, AC = C.red, FC = C.orange, MC = C.ink, DC = C.violet;   // v blue, a red, every force orange, mass and scale reading ink, height violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const aK = tx(AC, 'a'), mK = tx(MC, 'm'), NK = tx(FC, 'N'), vK = tx(VC, 'v');
const G = 9.8;
let clipN = 0;
// a simple standing figure (lab coat, kurta stripe) with Diya's face as the head; feet at (0, 0)
const person = (p, s = 1, face = 'diya-face.jpg') => {
  const g = mk(p, 'g', {}), id = 'hc' + (clipN++);
  const df = p.ownerSVGElement ? p.ownerSVGElement : p; let defs = df.querySelector('defs'); if (!defs) defs = mk(df, 'defs', {});
  const cp = mk(defs, 'clipPath', { id }); mk(cp, 'circle', { cx: 0, cy: -86 * s, r: 15 * s });
  mk(g, 'rect', { x: -12 * s, y: -22 * s, width: 9 * s, height: 22 * s, rx: 3 * s, fill: C.ink2 }); mk(g, 'rect', { x: 3 * s, y: -22 * s, width: 9 * s, height: 22 * s, rx: 3 * s, fill: C.ink2 });
  mk(g, 'rect', { x: -19 * s, y: -70 * s, width: 38 * s, height: 52 * s, rx: 10 * s, fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
  mk(g, 'rect', { x: -6 * s, y: -68 * s, width: 12 * s, height: 44 * s, rx: 3 * s, fill: '#7FA85A' });
  mk(g, 'image', { href: IMG + face, x: -15 * s, y: -101 * s, width: 30 * s, height: 30 * s, 'clip-path': `url(#${id})` });
  mk(g, 'circle', { cx: 0, cy: -86 * s, r: 15 * s, fill: 'none', stroke: C.ink, 'stroke-width': 2 });
  return g;
};
const at = (g, x, y) => attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
// force label with its giver under it
const flab = (p, b, giver, col = FC, fs = 26) => { const a = sym(p, 0, 0, b, '', col, fs); const g = txt(p, 0, 0, giver, { 'font-size': 16, fill: col, 'font-weight': 600 }); return (x, y, op) => { attr(a, 'x', x.toFixed(1)); attr(a, 'y', y.toFixed(1)); attr(g, 'x', x.toFixed(1)); attr(g, 'y', (y + 20).toFixed(1)); a.style.opacity = g.style.opacity = M.clamp(op).toFixed(3); }; };
// free-body dot with N up and mg down; returns set(Nv, mgv, k, gN, gM)
const fbd = (p, x, y, r = 12) => {
  const aN = PUC.arrow(p, FC, 7, 20), aM = PUC.arrow(p, FC, 7, 20); mk(p, 'circle', { cx: x, cy: y, r, fill: MC });
  const lN = flab(p, 'N', 'scale'), lM = flab(p, 'mg', 'Earth');
  return (Nv, mgv, k, gN = 1, gM = 1) => {
    const ln = Nv * k * gN, lm = mgv * k * gM;
    if (ln > 2) aN.set(x, y - r - 2, x, y - r - 2 - ln); else aN.set(0, 0, 0, 0);
    if (lm > 2) aM.set(x, y + r + 2, x, y + r + 2 + lm); else aM.set(0, 0, 0, 0);
    lN(x + 16, y - r - 2 - Math.max(ln, 20) * 0.6, gN > 0.01 && ln > 2 ? gN : 0); lM(x + 16, y + r + 2 + lm * 0.6 + 8, gM);
  };
};

Object.assign(M.IC, {
  swing: ['M6 3v9', 'M18 3v9', 'M4 3h16', 'M5 12h14', 'M12 12v4'],
  dive: ['M12 4a2 2 0 1 0 0 .01', 'M7 21l5-9 5 9', 'M8 9h8'],
  orbit: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M3 12c0-3 4-5 9-5s9 2 9 5-4 5-9 5-9-2-9-5Z'],
  up: ['M12 19V5', 'm5 12 7-7 7 7'], down: ['M12 5v14', 'm19 12-7 7-7-7'],
  scale: ['M4 18h16v3H4z', 'M6 18 8 6h8l2 12', 'M10 10h4'],
  earth: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2c3 3 3 17 0 20', 'M12 2c-3 3-3 17 0 20'],
  foot: ['M8 20h8', 'M12 4v12', 'm7 11 5 5 5-5'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4');
const tR1 = T0('R1'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three floaty moments ---------- */
const JOBS = [['swing', 'A swing drops', 'STOMACH FLOATS', 'swing'], ['dive', 'A diver', 'WEIGHTLESS IN THE AIR', 'diver'], ['orbit', 'Astronauts', 'FLOAT IN THEIR STATION', 'Astronauts']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 132}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="220" height="120" id="jrS${i}"></svg></div>`).join('');
// row 0: a swing seat on its arc; row 1: a diver on a falling path; row 2: a station going round the Earth
const jr0 = $('#jrS0'), jr1 = $('#jrS1'), jr2 = $('#jrS2');
mk(jr0, 'circle', { cx: 110, cy: 14, r: 4, fill: C.ink }); const swR = mk(jr0, 'line', { x1: 110, y1: 14, stroke: C.ink, 'stroke-width': 2 }); const swS = mk(jr0, 'rect', { width: 26, height: 7, rx: 3, fill: C.ink });
mk(jr1, 'rect', { x: 20, y: 30, width: 50, height: 6, fill: C.ink2 }); mk(jr1, 'rect', { x: 0, y: 104, width: 220, height: 16, fill: '#BFD6F6' });
const dvP = mk(jr1, 'path', { d: '', fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '4 5' }), dv = mk(jr1, 'circle', { r: 7, fill: C.ink });
mk(jr2, 'circle', { cx: 110, cy: 60, r: 24, fill: '#7FB2F0', stroke: C.ink, 'stroke-width': 2 }); mk(jr2, 'circle', { cx: 110, cy: 60, r: 44, fill: 'none', stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 5' });
const st = mk(jr2, 'rect', { width: 14, height: 8, rx: 2, fill: C.ink });
const TILES = [['up', 'Starts: feels heavier', C.ac], ['down', 'Stops: feels lighter', C.ac]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H3', 'starts'), wt('H4', 'stops')];
// the lift, inside: back wall panels, handrail, floor indicator; Diya rides up
const li = $('#liS');
mk(li, 'rect', { x: 0, y: 0, width: 520, height: 390, fill: '#E3E9F2' });
[0, 1, 2].forEach(i => mk(li, 'rect', { x: 30 + i * 160, y: 70, width: 140, height: 300, rx: 6, fill: '#EDF1F7', stroke: '#CBD3E0', 'stroke-width': 2 }));
mk(li, 'rect', { x: 0, y: 370, width: 520, height: 20, fill: '#B8BCC6' });
mk(li, 'line', { x1: 20, y1: 250, x2: 500, y2: 250, stroke: '#9AA3B5', 'stroke-width': 6, 'stroke-linecap': 'round' });
mk(li, 'rect', { x: 180, y: 12, width: 160, height: 46, rx: 8, fill: C.ink });
const liArr = mk(li, 'path', { d: 'M212,44 L224,24 L236,44 Z', fill: '#7FD39A' });
const liFl = txt(li, 292, 46, 'G', { 'font-size': 30, fill: '#7FD39A', 'font-weight': 600, 'text-anchor': 'middle' });
mk(li, 'rect', { x: 40, y: 120, width: 70, height: 110, rx: 6, fill: '#fff', stroke: '#CBD3E0', 'stroke-width': 2 }); txt(li, 75, 150, 'WARD', { 'font-size': 13, 'text-anchor': 'middle', 'letter-spacing': 1 }); txt(li, 75, 176, 'FLOORS', { 'font-size': 13, 'text-anchor': 'middle', 'letter-spacing': 1 });
// floor counter: 3 m per floor; the lift profile of the sim (a = 1 for 2 s, steady 2 m/s, a = -1 for 2 s)
const tLiGo = wt('H3', 'starts') - 0.2;

/* ---------- P: true weight vs apparent weight ---------- */
$('#dr0I').innerHTML = M.icon('earth', 32, FC, 2.2); $('#dr1I').innerHTML = M.icon('foot', 32, FC, 2.4); $('#dr2I').innerHTML = M.icon('scale', 32, FC, 2.2);
const pt = $('#ptS');
mk(pt, 'rect', { x: 36, y: 500, width: 712, height: 6, fill: '#B8BCC6' });
mk(pt, 'rect', { x: 150, y: 470, width: 160, height: 30, rx: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
const pRd = txt(pt, 230, 492, '50.0 kg', { 'font-size': 18, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
const pP = person(pt, 3.4); at(pP, 230, 470);
const pF = fbd(pt, 560, 300, 14);
txt(pt, 500, 120, 'DIYA AS A DOT', { 'font-size': 16, 'letter-spacing': 1.5 });

/* ---------- S: the sim ---------- */
const s = $('#simS'), PXM = 22, YB = 540, CW = 180, CH = 150, CX = 90;    // 22 px per metre, cabin bottom at y 540 on the ground floor
mk(s, 'line', { x1: 70, y1: 60, x2: 70, y2: 560, stroke: C.ink, 'stroke-width': 3 }); mk(s, 'line', { x1: 290, y1: 60, x2: 290, y2: 560, stroke: C.ink, 'stroke-width': 3 });
['G', '1', '2', '3', '4'].forEach((f, k) => { const y = YB - 66 * k; mk(s, 'line', { x1: 70, y1: y, x2: 84, y2: y, stroke: C.ink, 'stroke-width': 2.5 }); mk(s, 'line', { x1: 276, y1: y, x2: 290, y2: y, stroke: C.ink, 'stroke-width': 2.5 }); txt(s, 52, y + 6, f, { 'font-size': 20, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' }); });
const sCable = mk(s, 'line', { x1: 180, y1: 50, x2: 180, stroke: C.ink2, 'stroke-width': 2.5 });
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'rect', { x: CX, width: CW, height: CH, rx: 6, fill: 'none', stroke: C.ink, 'stroke-width': 2, opacity: op }));
const sCab = mk(s, 'g', {}), sCabIn = mk(sCab, 'g', {});
mk(sCabIn, 'rect', { x: CX, y: 0, width: CW, height: CH, rx: 6, fill: '#EDF1F7', stroke: C.ink, 'stroke-width': 3 });
mk(sCabIn, 'rect', { x: CX + 48, y: CH - 18, width: 84, height: 12, rx: 3, fill: '#fff', stroke: C.ink, 'stroke-width': 2 });
const sP = person(sCabIn, 1.18); at(sP, CX + 90, CH - 18);
const sV = PUC.arrow(s, VC, 6, 17), sA = PUC.arrow(s, AC, 6, 17), sVl = sym(s, 0, 0, 'v', '', VC, 26), sAl = sym(s, 0, 0, 'a', '', AC, 26);
txt(s, 400, 150, 'DIYA AS A DOT', { 'font-size': 15, 'letter-spacing': 1.5 });
const sF = fbd(s, 450, 330, 12);
const sAf = PUC.arrow(s, AC, 5, 15), sAfl = sym(s, 0, 0, 'a', '', AC, 22);
// mini v-t graph (inset)
const tvS = $('#tvS'), TX = τ => 34 + 150 * τ / 9, TY = v => 120 - 40 * v;
mk(tvS, 'path', { d: 'M34,14 V120 H190', fill: 'none', stroke: C.ink, 'stroke-width': 2 });
txt(tvS, 40, 22, 'v', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 18, fill: VC }); txt(tvS, 186, 140, 't', { 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 18, fill: C.ink, 'text-anchor': 'end' });
txt(tvS, 28, TY(2) + 5, '2', { 'font-size': 14, 'text-anchor': 'end' });
const tvL = mk(tvS, 'path', { d: '', fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), tvD = mk(tvS, 'circle', { r: 6, fill: VC });
$('#roG').innerHTML = `<span class="k" style="color:${AC}">a</span><span class="v" id="r0" style="color:${AC}">0.00</span><span class="u">m/s² · acceleration</span>
  <span class="k" style="color:${VC}">v</span><span class="v" id="r1" style="color:${VC}">0.00</span><span class="u">m/s · velocity</span>
  <span class="k" style="color:${FC}">N</span><span class="v" id="r2" style="color:${FC}">490</span><span class="u">N · m(g + a)</span>
  <span class="k">N/g</span><span class="v" id="r3">50.0</span><span class="u">kg · scale shows</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 9, ymin: 40, ymax: 60, xt: [0, 2, 4, 6, 8], yt: [40, 45, 50, 55, 60], xl: 't (s)' });
gr.xlab.setAttribute('y', 78 + 140 + 56);
txt($('#grS'), 96, 66, 'kg', { 'text-anchor': 'end' });
mk($('#grS'), 'line', { x1: gr.X(0), y1: gr.Y(50), x2: gr.X(9), y2: gr.Y(50), stroke: C.ink, 'stroke-width': 1.5, 'stroke-dasharray': '4 6', opacity: 0.4 });
txt($('#grS'), gr.X(9), gr.Y(50) - 8, 'true mass 50', { 'font-size': 15, 'text-anchor': 'end' });
const gCur = gr.curve(MC, 4), gDot = gr.dot(MC, 10);
// sim clock tau: runs in steps on the voice, paused between (shown); then a 0.25x replay of the stop
const MS = 50, aOf = τ => τ <= 1e-6 ? 0 : τ < 2 ? 1 : τ < 6 ? 0 : τ < 8 ? -1 : 0;
const vOf = τ => τ < 2 ? τ : τ < 6 ? 2 : τ < 8 ? 2 - (τ - 6) : 0;
const yOf = τ => τ < 2 ? τ * τ / 2 : τ < 6 ? 2 + 2 * (τ - 2) : τ < 8 ? 10 + 2 * (τ - 6) - (τ - 6) * (τ - 6) / 2 : 12;
const rdOf = τ => MS * (G + aOf(τ)) / G;
const tGo = wt('S3', 'starts'), tRise = wt('S5', 'rises'), tSlowd = wt('S6', 'slows'), tEnd = Math.max(T1('S7') - 1.6, tSlowd + 1.8), tRep = T0('S8'), tRepGo = tRep + 0.6;
const RUNS = [[tGo, 0, 1.8], [tRise, 1.8, 5.6], [tSlowd, 5.6, 7.2], [tEnd, 7.2, 9.0]];
const τMain = t => { let τ = 0; for (const [ts, a0, a1] of RUNS) if (t >= ts) τ = Math.min(a1, a0 + (t - ts)); return τ; };
const τAt = t => t >= tRep ? Math.min(7.0, 5.6 + 0.25 * Math.max(0, t - tRepGo)) : τMain(t);
const paused = t => t < tRep && RUNS.some(([ts, a0, a1], i) => { const e = ts + (a1 - a0), n = RUNS[i + 1] ? RUNS[i + 1][0] : 1e9; return t > e + 0.05 && t < n - 0.05; });
const cabTop = τ => YB - CH - PXM * yOf(τ);

/* ---------- D: the formula ---------- */
const STEPS = [[`${NK}\\;\\text{up},\\quad ${mK}g\\;\\text{down}`, 'two forces: the scale pushes, the Earth pulls'],
  [`${NK} - ${mK}g = ${mK}${aK}`, "Newton's second law, up is positive"],
  [`${NK} = ${mK}(g + ${aK}) > ${mK}g`, 'a up: you feel heavier'],
  [`${NK} = ${mK}(g - ${aK}) < ${mK}g`, 'a down: you feel lighter'],
  [`${aK} = g \\;\\Rightarrow\\; ${NK} = ${mK}(g - g) = 0`, 'free fall: weightless']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:92px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Two'), wt('D3', 'Newton'), wt('D4', 'So'), wt('D5', 'If'), wt('D6', 'free')];
const dr = $('#drS'), dF = fbd(dr, 392, 300, 14);
const dA = PUC.arrow(dr, AC, 6, 17), dAl = sym(dr, 0, 0, 'a', '', AC, 26);
const dCase = txt(dr, 392, 548, '', { 'font-size': 22, fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${NK} = ${mK}(g + ${aK})`);

/* ---------- C: side by side ---------- */
const mini = (p, dir) => {
  mk(p, 'line', { x1: 80, y1: 10, x2: 80, y2: 320, stroke: C.ink, 'stroke-width': 3 }); mk(p, 'line', { x1: 240, y1: 10, x2: 240, y2: 320, stroke: C.ink, 'stroke-width': 3 });
  const gh = [0.3, 0.2, 0.12].map(op => mk(p, 'rect', { x: 100, width: 120, height: 100, rx: 6, fill: 'none', stroke: C.ink, 'stroke-width': 2, opacity: op }));
  const cab = mk(p, 'g', {}), ci = mk(cab, 'g', {}); mk(ci, 'rect', { x: 100, y: 0, width: 120, height: 100, rx: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
  const pp = person(ci, 0.78); at(pp, 160, 92);
  const v = PUC.arrow(p, VC, 6, 17), a = PUC.arrow(p, AC, 6, 17), vl = sym(p, 0, 0, 'v', '', VC, 26), al = sym(p, 0, 0, 'a', '', AC, 26);
  const f = fbd(p, 500, 165, 11);
  return { cab, gh, v, a, vl, al, f, dir };
};
const c0M = mini($('#c0S'), -1), c1M = mini($('#c1S'), 1);
$('#c0a').innerHTML = K(`${aK}\\;\\text{down} \\Rightarrow ${NK} = ${mK}(g - ${aK}) < ${mK}g`);
$('#c1a').innerHTML = K(`${aK}\\;\\text{down} \\Rightarrow ${NK} = ${mK}(g - ${aK}) < ${mK}g`);
const th1 = PUC.think($('#th1'), { q: 'The lift goes down, and slows to stop at the ground floor. Does Diya feel heavier or lighter?', opts: ['Heavier', 'Lighter'], right: 0,
  why: 'Slowing a downward motion needs a up, so N is more than mg.' });

/* ---------- R: a falling box (camera follows it) ---------- */
const rl = $('#rlS'), BX = 230, BY = 110, BW = 320, BH = 300, RPX = 40, MAP = 0.2;   // 40 px per metre, apple 0.2 kg; shown at 0.25x
const rMarks = mk(rl, 'g', {}); const rMk = [];
for (let k = 0; k < 14; k++) { const l = mk(rMarks, 'line', { x1: 40, x2: 90, stroke: DC, 'stroke-width': 2.5 }); const tt = txt(rMarks, 98, 0, '', { 'font-size': 17, fill: DC, 'font-weight': 600 }); rMk.push([l, tt]); }
const rRope = mk(rl, 'line', { x1: BX + BW / 2, y1: 40, x2: BX + BW / 2, y2: BY, stroke: C.ink2, 'stroke-width': 3 });
const rGh = [0.3, 0.2, 0.12].map(op => mk(rl, 'rect', { x: BX, y: BY, width: BW, height: BH, rx: 8, fill: 'none', stroke: C.ink, 'stroke-width': 2, opacity: op }));
mk(rl, 'rect', { x: BX, y: BY, width: BW, height: BH, rx: 8, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 3 });
mk(rl, 'rect', { x: BX + 90, y: BY + BH - 34, width: 140, height: 22, rx: 5, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
const rRdC = document.createElement('div'); rRdC.className = 'stag'; rRdC.style.cssText = 'left:36px;top:66px'; $('#rl').appendChild(rRdC);
mk(rl, 'circle', { cx: BX + 160, cy: BY + BH - 60, r: 24, fill: '#D64545', stroke: C.ink, 'stroke-width': 2.5 }); mk(rl, 'path', { d: `M${BX + 160},${BY + BH - 84} q4,-12 12,-14`, fill: 'none', stroke: '#3E9B5F', 'stroke-width': 4, 'stroke-linecap': 'round' });
const rN = PUC.arrow(rl, FC, 6, 17), rM = PUC.arrow(rl, FC, 6, 17), rA = PUC.arrow(rl, AC, 7, 19);
const rNl = flab(rl, 'N', 'scale'), rMl = flab(rl, 'mg', 'Earth'); const rAl = sym(rl, 0, 0, 'a = g', '', AC, 24);
const rG = txt(rl, 392, 556, 'the camera follows the box', { 'font-size': 17, fill: C.mute, 'text-anchor': 'middle' });
const tDrop = wt('R2', 'falls') - 0.1;
const τDrop = t => Math.max(0, t - tDrop) * 0.25;            // real fall time (s), shown at 0.25x
const LK = [['A box falls freely: scale + apple inside'], ['Box, scale and apple all fall with <i class="aa">g</i>'], ['The scale has nothing to push: <span class="ff"><i>N</i></span> = 0'], ['Weight still acts. Nothing holds it up']];
$('#lks').innerHTML = LK.map(([s2], i) => `<div class="lk" id="lk${i}" style="top:${80 + i * 102}px"><div class="n">${i + 1}</div><div class="lt">${s2}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const avR = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 492, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Gravity is still there. Nothing holds me up!' });
const th2 = PUC.think($('#th2'), { q: 'In a space station, does gravity still pull on the astronauts?', opts: ['Yes', 'No, gravity is zero there'], right: 0,
  why: 'About nine tenths as strong. They and the station fall together.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${aK}\\;\\text{down} \\Rightarrow ${NK} = ${mK}(g - ${aK})`)],
  [K(`${NK} = 60 \\times (9.8 - 1.8) = 60 \\times 8 = ${tx(FC, '480\\,\\text{N}')}`)],
  [K(`\\text{scale} = ${NK}/g = 480/9.8 \\approx ${tx(MC, '49.0\\,\\text{kg}')}`)],
  [K(`\\text{free fall: } ${aK} = g \\Rightarrow ${NK} = 0`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 98 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), wF = fbd(w, 392, 250, 14), wA = PUC.arrow(w, AC, 6, 17), wAl = sym(w, 0, 0, 'a', '', AC, 26);
const wNum = [txt(w, 470, 0, '', { 'font-size': 20, fill: FC, 'font-weight': 600 }), txt(w, 470, 0, '', { 'font-size': 20, fill: FC, 'font-weight': 600 })];
const tW = [wt('W3', 'acceleration'), wt('W4', 'N'), wt('W5', 'scale'), wt('W6', 'If')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Going up means heavier, going down means lighter', right: 'Only the acceleration counts: up and slowing, you feel lighter' });
const tg = $('#tg');
mk(tg, 'line', { x1: 120, y1: 30, x2: 120, y2: 250, stroke: C.ink, 'stroke-width': 3 }); mk(tg, 'line', { x1: 260, y1: 30, x2: 260, y2: 250, stroke: C.ink, 'stroke-width': 3 });
mk(tg, 'rect', { x: 136, y: 90, width: 108, height: 100, rx: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }); const tgP = person(tg, 0.78); at(tgP, 190, 182);
const tgV = PUC.arrow(tg, VC, 6, 17), tgA = PUC.arrow(tg, AC, 6, 17), tgVl = sym(tg, 292, 96, 'v', '', VC, 26), tgAl = sym(tg, 336, 230, 'a', '', AC, 26);
const where = PUC.where($('#wa'), { on: [], type: 'Lift numericals: scale reading or rope tension, often from a velocity-time graph' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A 60 kg man stands on a scale in a lift. From rest it speeds up to 3 m/s in 2 s going up, moves steadily, then stops in 3 s (<i>g</i> = 10 m/s²). Ratio of the largest to the smallest scale reading while it moves?', qW: 780,
  opts: ['23 : 18', '23 : 20', '6 : 5', '5 : 4'], right: 0, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${aK}_1 = 3/2 = +1.5\\,\\text{m/s}^2`)], [K(`${NK}_1 = 60 \\times 11.5 = 690\\,\\text{N}`)],
  [K(`${aK}_2 = -3/3 = -1\\,\\text{m/s}^2`)], [K(`${NK}_2 = 60 \\times 9 = 540\\,\\text{N}`)], [K(`690 : 540 = 23 : 18 \\Rightarrow \\textbf{A}`)]], { y0: 100, dy: 100 });
const tSo = [wt('A2', 'Speeding'), wt('A2', 'N'), wt('A3', 'Stopping'), wt('A3', 'N'), wt('A4', 'Six')];
const fc = PUC.fcard($('#sF'), { x: 300, y: 262, w: 1320, h: 470, title: 'Recap · apparent weight', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${NK} = ${mK}(g + ${aK}) \\quad \\text{(up is +)} \\qquad \\text{true weight } ${mK}g \\text{ never changes}`),
    '<b>A scale reads <i>N</i></b>: <i>a</i> up, <i>N</i> &gt; <i>mg</i> (heavier) &nbsp;·&nbsp; <i>a</i> down, <i>N</i> &lt; <i>mg</i> (lighter)',
    '<b>Steady velocity</b>: <i>N</i> = <i>mg</i>, whether going up or down',
    '<b>Free fall</b>: <i>a</i> = <i>g</i>, <i>N</i> = 0, weightless. Orbiting astronauts are in free fall'] });
const YQ = ['What does a scale actually measure?', 'The lift goes up and slows down. Heavier or lighter, and why?', 'Why do astronauts float, even though gravity still pulls on them?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CHAPTER 5', topic: 'Push a wall all day: any work done? Work, Energy and Power', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tRep - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const vArrow = (a, l, x, y0, len, lab, dx = 12) => { if (Math.abs(len) < 3) { a.set(0, 0, 0, 0); l.style.opacity = '0'; return; } a.set(x, y0, x, y0 - len); attr(l, 'x', x + dx); attr(l, 'y', (y0 - len * 0.6 + 8).toFixed(1)); l.style.opacity = '1'; };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }));
    const u = t - tMorph;
    { const th = 0.9 * Math.cos(2.2 * u), x = 110 + 80 * Math.sin(th), y = 14 + 80 * Math.cos(th); attr(swR, 'x2', x.toFixed(1)); attr(swR, 'y2', y.toFixed(1)); attr(swS, 'x', (x - 13).toFixed(1)); attr(swS, 'y', (y - 2).toFixed(1)); }
    { const k = (u % 2.4) / 2.4, tt = k * 1.1, x = 60 + 70 * tt, y = 24 - 20 * tt + 0.5 * 120 * tt * tt * 0.6; attr(dv, 'cx', x.toFixed(1)); attr(dv, 'cy', Math.min(y, 100).toFixed(1));
      let d = ''; for (let i = 0; i <= 20; i++) { const s2 = i / 20 * 1.1; d += (i ? 'L' : 'M') + (60 + 70 * s2).toFixed(1) + ',' + Math.min(24 - 20 * s2 + 36 * s2 * s2, 100).toFixed(1); } attr(dvP, 'd', d); }
    { const a = 0.9 * u; attr(st, 'x', (110 + 44 * Math.cos(a) - 7).toFixed(1)); attr(st, 'y', (60 - 44 * Math.sin(a) - 4).toFixed(1)); }
    M.vis($('#hjP'), t, T0('H2') + 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#lift'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#diyaC'), t, tH3 + 0.4, 1e9, { dy: 30, sp: M.SOFT });
    const τ = Math.min(8, Math.max(0, t - tLiGo) * 0.6), fl = Math.min(4, Math.floor(yOf(τ) / 3 + 1e-6));
    M.setT(liFl, ['G', '1', '2', '3', '4'][fl]); liArr.style.opacity = τ > 0 && τ < 8 ? '1' : '0.25';
    // she sinks a little into her knees as it starts, rises a little as it stops (the feeling, not her weight)
    const dip = 6 * M.io((t - tTile[0]) / 0.4) * (1 - M.io((t - tTile[0] - 1.6) / 0.5)) - 6 * M.io((t - tTile[1]) / 0.4) * (1 - M.io((t - tTile[1] - 1.6) / 0.5));
    $('#diyaC').style.top = (96 + dip).toFixed(1) + 'px';
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dr0'), t, T0('P2') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, T0('P3') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr2'), t, T0('P4') - 0.1, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, T0('P5') - 0.1, 1e9, POP);
    M.vis($('#pt'), t, tP1 + 0.3, out, { dx: 60, dy: 0, ...o });
    pF(MS * G, MS * G, 0.28, M.o3((t - wt('P3', 'floor') + 0.1) / 0.5), M.o3((t - wt('P2', 'weight') + 0.1) / 0.5));
  }

  /* S: the sim + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const τ = τAt(t), a = aOf(τ), vd = Math.round(vOf(τ) * 100) / 100, Nv = MS * (G + a), rd = Nv / G, top = cabTop(τ);
    attr(sCab, 'transform', `translate(0,${top.toFixed(1)})`); attr(sCable, 'y2', top.toFixed(1));
    sGh.forEach((g, k) => { const τ2 = τAt(t - 0.25 * (k + 1)), y2 = cabTop(τ2); attr(g, 'y', y2.toFixed(1)); M.hide(g, Math.abs(y2 - top) < 3 || (t >= tRep && t - 0.25 * (k + 1) < tRep)); });
    const mid = top + CH / 2, gv = M.o3((t - tGo) / 0.4), ga = M.o3((t - tGo + 0.1) / 0.4);
    vArrow(sV, sVl, 322, mid, 34 * vd * gv, 'v'); vArrow(sA, sAl, 360, mid, 50 * a * ga, 'a');
    const gF = M.o3((t - wt('S2', 'scale') + 0.1) / 0.5);
    sF(Nv, MS * G, 0.25, gF, gF);
    if (Math.abs(a) > 0.01) { sAf.set(520, 330, 520, 330 - 50 * a); attr(sAfl, 'x', 532); attr(sAfl, 'y', (330 - 30 * a + 8).toFixed(1)); sAfl.style.opacity = '1'; } else { sAf.set(0, 0, 0, 0); sAfl.style.opacity = '0'; }
    M.setT($('#r0'), (a >= 0 ? '+' : '') + a.toFixed(2).replace('+', '')); M.setT($('#r1'), (vd > 0 ? '+' : '') + vd.toFixed(2)); M.setT($('#r2'), Nv.toFixed(0)); M.setT($('#r3'), rd.toFixed(1));
    if (a === 0) M.setT($('#r0'), '0.00');
    const hi = Math.abs(a) > 0.01 ? 1 : 0; $('#r3').style.background = mix('#FFFFFF', a > 0 ? '#E2F3E9' : C.redBg, hi * M.clamp((t - tGo) / 0.3));
    // graph: reading against time, linked dot; v-t inset
    const τm = τMain(Math.min(t, tRep)); gCur(x => [x, rdOf(x)], 0, Math.max(τm, 0.001), 360); gDot(τ, rd, t > tS1 + 0.5);
    let d = ''; for (let i = 0; i <= 60; i++) { const x = τm * i / 60; d += (i ? 'L' : 'M') + TX(x).toFixed(1) + ',' + TY(vOf(x)).toFixed(1); } attr(tvL, 'd', d); attr(tvD, 'cx', TX(τ).toFixed(1)); attr(tvD, 'cy', TY(vOf(τ)).toFixed(1));
    M.vis($('#tv'), t, tS1 + 0.8, out, POP); M.vis($('#grP'), t, wt('S4', 'jumps'), 1e9, POP);
    M.hide($('#pau'), !(paused(t) && t > tGo && t < out));
    M.vis($('#slo'), t, tRep - 0.1, out, POP);
  }

  /* D: the formula */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tStep.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.25, 1e9, { dx: 60, dy: 0 });
    // case: rest, a up (+2), a down (-2), free fall (a = -g); N changes, mg never does
    const cs = t < tStep[2] ? 0 : t < tStep[3] ? 1 : t < tStep[4] ? 2 : 3, A = [0, 2, -2, -G][cs], k = M.io((t - [0, tStep[2], tStep[3], tStep[4]][cs]) / 0.5);
    const Aprev = [0, 0, 2, -2][cs], Ad = Aprev + (A - Aprev) * k, Nd = MS * (G + Ad);
    const g0 = M.o3((t - tStep[0] + 0.1) / 0.5); dF(Nd, MS * G, 0.32, g0, g0);
    if (Math.abs(Ad) > 0.05) { dA.set(520, 300, 520, 300 - 14 * Ad); attr(dAl, 'x', 534); attr(dAl, 'y', (300 - 9 * Ad + 8).toFixed(1)); dAl.style.opacity = '1'; } else { dA.set(0, 0, 0, 0); dAl.style.opacity = '0'; }
    M.setT(dCase, ['at rest: N = mg = 490 N', 'a = +2 m/s²: N = 590 N', 'a = -2 m/s²: N = 390 N', 'free fall, a = -g: N = 0'][cs]); dCase.style.opacity = g0.toFixed(3);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'follows'), 0.8);
    M.rise($('#st2'), t, wt('T1', 'scale') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* C: side by side + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    const run = (m, t0, dur, on) => {
      const u = M.clamp((t - t0) / dur), H = 160, y0 = m.dir < 0 ? 200 : 20;
      const yAt = uu => m.dir < 0 ? y0 - H * (1 - (1 - uu) * (1 - uu)) : y0 + H * uu * uu;   // up and slowing / down and speeding up
      const y = yAt(u); attr(m.cab, 'transform', `translate(0,${y.toFixed(1)})`);
      m.gh.forEach((g, k) => { const u2 = M.clamp((t - 0.2 * (k + 1) - t0) / dur), y2 = yAt(u2); attr(g, 'y', y2.toFixed(1)); M.hide(g, Math.abs(y2 - y) < 3); });
      const vmag = m.dir < 0 ? 2 * (1 - u) : 2 * u, mid = y + 50, g = M.o3((t - t0 + 0.2) / 0.4) * on;
      vArrow(m.v, m.vl, 272, mid, -m.dir * 34 * Math.max(vmag, 0.35) * g, 'v'); vArrow(m.a, m.al, 312, mid, -45 * g, 'a');
      m.f(MS * (G - 2), MS * G, 0.2, g, g);
    };
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o }); run(c0M, T0('C2') + 0.2, 4.2, 1);
    PUC.write($('#c0a'), t, wt('C2', 'less') - 0.2, 0.8);
    M.vis($('#c1'), t, T0('C3') - 0.3, out, { dx: 60, dy: 0, ...o }); run(c1M, T0('C3') + 0.1, 3.8, 1);
    PUC.write($('#c1a'), t, wt('C3', 'Lighter') - 0.3, 0.8);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'heavier') - 0.3, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Slowing') });
  }

  /* R: the falling box, link by link + think */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#rslo'), t, tDrop, out, POP);
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? tK1)) / 0.3))); });
    // camera follows the box: height marks every 5 m stream upward as it falls
    const τf = τDrop(t), drop = 0.5 * G * τf * τf, falling = τf > 0;
    rMk.forEach(([l, tt], k) => { const hm = 5 * (k - 2), yS = 380 + (hm - drop) * RPX; attr(l, 'y1', yS.toFixed(1)); attr(l, 'y2', yS.toFixed(1)); attr(tt, 'y', (yS + 6).toFixed(1)); M.setT(tt, `${hm} m`); M.hide(l, hm < 0 || yS < 120 || yS > 560); M.hide(tt, hm < 0 || yS < 120 || yS > 560); });
    rRope.style.opacity = falling ? '0' : '1';
    rGh.forEach((g, k) => { const t2 = t - 0.25 * (k + 1), d2 = 0.5 * G * Math.pow(τDrop(t2), 2); const off = (drop - d2) * RPX; attr(g, 'y', (BY - Math.min(off, 400)).toFixed(1)); M.hide(g, !falling || off < 3); });
    const g0 = M.o3((t - tR1 - 0.4) / 0.5), ax = BX + 160, ay = BY + BH - 60;
    const Nv = falling ? 0 : MAP * G, k = 50;
    if (Nv * k * g0 > 2) rN.set(ax, ay - 26, ax, ay - 26 - Nv * k * g0); else rN.set(0, 0, 0, 0);
    rM.set(ax, ay + 26, ax, ay + 26 + MAP * G * k * g0);
    rNl(ax + 34, ay - 80, falling ? 0 : g0); rMl(ax + 40, ay + 96, g0);
    if (falling) { const ga = M.o3((t - tDrop) / 0.4); rA.set(BX + BW + 40, BY + 60, BX + BW + 40, BY + 60 + 100 * ga); attr(rAl, 'x', BX + BW + 20); attr(rAl, 'y', BY + 190); rAl.style.opacity = ga.toFixed(3); } else { rA.set(0, 0, 0, 0); rAl.style.opacity = '0'; }
    M.setT(rRdC, falling ? 'SCALE READS 0.00 kg' : 'SCALE READS 0.20 kg'); rRdC.style.background = falling ? C.red : C.ink; M.vis(rRdC, t, tR1 + 0.5, 1e9, POP);
    rG.style.opacity = falling ? '1' : '0';
    avR(t, wt('R5', 'weightlessness') - 0.3, out);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'gravity'), tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'gravity') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.5, 1e9, { dy: 8 });
    const g0 = M.o3((t - T0('W2') - 0.5) / 0.5), gN = M.o3((t - tW[1] + 0.1) / 0.5), ff = M.io((t - tW[3]) / 0.6);
    const Nv = 60 * (G - 1.8) * (1 - ff); wF(Nv, 60 * G, 0.27, Math.max(g0 * 0.25, gN) * (Nv > 1 ? 1 : 0), g0);
    const A = -1.8 - (G - 1.8) * ff; wA.set(520, 250, 520, 250 - 14 * A * g0); attr(wAl, 'x', 534); attr(wAl, 'y', (250 - 7 * A + 8).toFixed(1)); wAl.style.opacity = g0.toFixed(3);
    M.setT(wNum[0], ff > 0.5 ? 'N = 0' : 'N = 480 N'); attr(wNum[0], 'x', 300); attr(wNum[0], 'y', 120); wNum[0].style.opacity = gN.toFixed(3); attr(wNum[0], 'text-anchor', 'middle');
    M.setT(wNum[1], 'mg = 588 N'); attr(wNum[1], 'x', 300); attr(wNum[1], 'y', 452); wNum[1].style.opacity = g0.toFixed(3); attr(wNum[1], 'text-anchor', 'middle');
    M.vis($('#wc0'), t, tW[1] + 1.2, 1e9, POP); M.vis($('#wc1'), t, tW[2] + 1.0, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'only') - 0.1, tRight: wt('X3', 'Going') - 0.2 });
    const gv = M.o3((t - wt('X3', 'Going') + 0.1) / 0.4), ga = M.o3((t - wt('X3', 'slowing') + 0.1) / 0.4);
    if (gv > 0.01) tgV.set(300, 170, 300, 170 - 70 * gv); else tgV.set(0, 0, 0, 0); tgVl.style.opacity = gv.toFixed(3);
    if (ga > 0.01) tgA.set(320, 120, 320, 120 + 70 * ga); else tgA.set(0, 0, 0, 0); tgAl.style.opacity = ga.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'lift') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'sixty'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: formula card + three questions + NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
