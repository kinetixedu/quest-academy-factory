// PUC Physics Ep 46: Uniform circular motion (Motion notebook, one ball on a circle)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const VC = C.ac, VYC = C.violet, AC = C.red, TH = C.gold, DC = C.violet, RC = C.ink;   // v blue (v_y violet), a and Δv red, θ gold, distance violet, radius ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const sym = (p, x, y, b, sub, col, fs = 30, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a)); e.textContent = b; if (sub) { const s = mk(e, 'tspan', { dy: fs * 0.28, 'font-size': fs * 0.66 }); s.textContent = sub; } return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const tx = (c, s) => `\\textcolor{${c}}{${s}}`;
const vK = tx(VC, 'v'), vvec = tx(VC, '\\vec{v}'), dv = tx(AC, '\\Delta\\vec{v}'), aK = tx(AC, '\\vec{a}'), nuK = '\\nu', TK = 'T', rK = 'r';
const rad = d => d * Math.PI / 180, PI = Math.PI;
// point on a circle (counter-clockwise, screen y down) and the unit tangent along the motion
const P = (o, R, th) => [o[0] + R * Math.cos(th), o[1] - R * Math.sin(th)];
const Tg = th => [-Math.sin(th), -Math.cos(th)];

Object.assign(M.IC, {
  fan: ['M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z', 'M12 12v.01'],
  wheel: ['M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'M12 2v4', 'm6.8 15-3.5 2', 'm20.7 7-3.5 2', 'M6.8 9 3.3 7', 'm20.7 17-3.5-2', 'm9 22 3-8 3 8', 'M8 22h8', 'M18 18.7a9 9 0 1 0-12 0'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  circ: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tP1 = T0('P1'), tP2 = T0('P2'), tP4 = T0('P4'), tS1 = T0('S1'), tS6 = T0('S6'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tC4 = T0('C4'), tR1 = T0('R1'), tK1 = T0('K1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three steady turners ---------- */
const JOBS = [['fan', 'Fan blade', 'STEADY TURNS', 'fan', 1.6], ['clock', 'Second hand', 'ONE TURN A MINUTE', 'second', 0.55], ['wheel', 'Giant wheel', 'SLOW, STEADY TURNS', 'giant', 0.3]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg width="100" height="100" id="jrS${i}"></svg></div>`).join('');
// each row: a dot going round its own circle at its own steady rate (turns per second shown slowed, illustrative)
const jrD = JOBS.map((j, i) => { const s = $('#jrS' + i); mk(s, 'circle', { cx: 50, cy: 50, r: 36, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(s, 'circle', { cx: 50, cy: 50, r: 4, fill: C.ink });
  const ln = mk(s, 'line', { x1: 50, y1: 50, stroke: C.ink, 'stroke-width': 2 }); const d = mk(s, 'circle', { r: 9, fill: C.ac }); return [ln, d, j[4]]; });
const TILES = [['gauge', 'Speed: never changes', C.ink], ['help', 'Accelerating?', C.red]];
$('#wqs').innerHTML = TILES.map(([ic, w, c], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 26, c, 2.4)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'speed'), wt('H4', 'accelerating')];
// mixer jar, top view: jar rim, blades, a drop of batter riding the rim
const mx = $('#mixS'), MO = [110, 116], MR = 58;
mk(mx, 'circle', { cx: MO[0], cy: MO[1], r: MR + 10, fill: '#EEF0F4', stroke: C.ink, 'stroke-width': 3 });
mk(mx, 'circle', { cx: MO[0], cy: MO[1], r: MR - 6, fill: '#FFF8E7', stroke: C.dim, 'stroke-width': 2 });
const blade = mk(mx, 'g', {}); mk(blade, 'path', { d: 'M-34,0 L34,0 M0,-22 L0,22', stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(blade, 'circle', { r: 7, fill: C.ink });
const drop = mk(mx, 'circle', { r: 9, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2 });
const dropV = PUC.arrow(mx, VC, 4, 12);
const mixW = 2 * PI / 1.6;   // shown slowed: one turn in 1.6 s

/* ---------- P: definition + the time period ---------- */
$('#dr0I').innerHTML = M.icon('gauge', 32, C.ac, 2.2); $('#dr1I').innerHTML = M.icon('circ', 32, C.ac, 2.2);
const pt = $('#ptS'), PO = [210, 270], PR = 140, PT = 4;
mk(pt, 'circle', { cx: PO[0], cy: PO[1], r: PR, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(pt, 'circle', { cx: PO[0], cy: PO[1], r: 5, fill: C.ink });
mk(pt, 'line', { x1: PO[0] + PR - 14, y1: PO[1], x2: PO[0] + PR + 14, y2: PO[1], stroke: C.ink, 'stroke-width': 3 });
txt(pt, PO[0] + PR + 18, PO[1] + 6, 'START', { 'font-size': 15, 'letter-spacing': 1.5 });
const pArc = mk(pt, 'path', { fill: 'none', stroke: DC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pGh = [0.3, 0.2, 0.12].map(op => mk(pt, 'circle', { r: 14, fill: C.ink, opacity: op }));
const pBall = mk(pt, 'circle', { r: 14, fill: C.ink });
const pClk = txt(pt, PO[0], PO[1] + 10, '0.00 s', { 'text-anchor': 'middle', 'font-size': 28, fill: C.ink, 'font-weight': 600 });
$('#laps').innerHTML = [1, 2, 3].map(i => `<div class="lap" id="lap${i}" style="top:${96 + (i - 1) * 72}px"><span>Turn ${i}</span><b>4.00 s</b></div>`).join('');
const tPrun = wt('P2', 'moves') - 0.2;          // the ball starts on "moves" and keeps a true 4 s period
const pTau = t => Math.max(0, t - tPrun);

/* ---------- S: the sim ---------- */
const s = $('#simS'), O = [392, 300], R = 180, VL = 140, OMEGA = PI / 2, VMAG = PI;   // r = 2 m, T = 4 s, v = 2πr/T = π m/s
mk(s, 'line', { x1: O[0] - R - 40, y1: O[1], x2: O[0] + R + 40, y2: O[1], stroke: C.ink, 'stroke-width': 1.5, opacity: 0.25 });
mk(s, 'line', { x1: O[0], y1: O[1] - R - 40, x2: O[0], y2: O[1] + R + 40, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.25 });
mk(s, 'circle', { cx: O[0], cy: O[1], r: R, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
mk(s, 'circle', { cx: O[0], cy: O[1], r: 6, fill: C.ink });
sym(s, O[0] - 30, O[1] + 30, 'O', '', C.ink, 22);
const sRad = mk(s, 'line', { x1: O[0], y1: O[1], stroke: RC, 'stroke-width': 2.5 });
const sRl = txt(s, 0, 0, 'r = 2 m', { 'font-size': 20, fill: RC, 'font-weight': 600 });
const sArc = mk(s, 'path', { fill: 'none', stroke: TH, 'stroke-width': 3 });
const sThl = sym(s, 0, 0, 'θ', '', TH, 26);
const sRa = mk(s, 'path', { fill: 'none', stroke: C.ink, 'stroke-width': 2 });        // right-angle mark between radius and velocity
const sGh = [0.3, 0.2, 0.12].map(op => mk(s, 'circle', { r: 15, fill: C.ink, opacity: op }));
const sBall = mk(s, 'circle', { r: 15, fill: C.ink });
const v1 = PUC.arrow(s, VC, 6, 18), v2 = PUC.arrow(s, VC, 6, 18), vLive = PUC.arrow(s, VC, 7, 20), dvA = PUC.arrow(s, AC, 7, 20);
const vLl = sym(s, 0, 0, 'v', '', VC, 30), v1l = sym(s, 0, 0, 'v', '1', VC, 28), v2l = sym(s, 0, 0, 'v', '2', VC, 28);
const dvl = mk(s, 'text', { 'font-family': 'Poppins', 'font-weight': 600, 'font-size': 28, fill: AC }); dvl.textContent = 'Δv';
const dvG = mk(s, 'line', { stroke: AC, 'stroke-width': 2.5, 'stroke-dasharray': '6 7' });
const dvT = txt(s, 0, 0, 'toward the centre', { 'font-size': 18, fill: AC, 'font-weight': 600 });
$('#roG').innerHTML = `<span class="k" style="color:${TH}">θ</span><span class="v" id="r0" style="color:${TH}">0.0°</span><span class="u">angle turned</span>
  <span class="k">|v|</span><span class="v" id="r1">3.14</span><span class="u">m/s · speed</span>
  <span class="k" style="color:${VC}">v<sub>x</sub></span><span class="v" id="r2" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${VYC}">v<sub>y</sub></span><span class="v" id="r3" style="color:${VYC}">3.14</span><span class="u">m/s</span>`;
const gr = PUC.graph($('#grS'), { x: 110, y: 78, w: 600, h: 140, xmax: 360, ymin: -3.5, ymax: 3.5, xt: [0, 90, 180, 270, 360], yt: [-3, 0, 3] });
gr.ticks.forEach(e => { e.textContent += '°'; });
const cSp = gr.curve(C.ink, 3); $('#grS').lastChild.setAttribute('stroke-dasharray', '6 7');
const cXo = gr.curve(M.mix(VC, '#FFFFFF', 0.7), 3), cYo = gr.curve(M.mix(VYC, '#FFFFFF', 0.7), 3);   // the previous turn, faint
const cX = gr.curve(VC, 4), cY = gr.curve(VYC, 4), dX = gr.dot(VC, 9), dY = gr.dot(VYC, 9);
$('#lg0').innerHTML = 'v<sub>x</sub>'; $('#lg1').innerHTML = 'v<sub>y</sub>';
// sim clock τ: real time, then 0.25x slow-mo, then a freeze; the "later" moment slides 45° on
const tSlo = wt('S6', 'slow'), tFrz = wt('S7', 'Here'), tLater = wt('S7', 'here', 1), tTail = wt('S7', 'Slide'), tJoin = wt('S8', 'arrow'), tCen = wt('S8', 'centre');
const TH_A = 150, TH_B = 195;                         // freeze at 150°, the later moment at 195°
const tA0 = wt('S1', 'ball') - 0.1, run0 = (tSlo - tA0) + 0.25 * (tFrz - tSlo);
const kTurn = Math.floor((run0 - TH_A / 90) / 4), tA = tA0 + (run0 - (4 * kTurn + TH_A / 90));   // shift the start so the freeze lands on 60°
const tauF = (tSlo - tA) + 0.25 * (tFrz - tSlo);
const tau = t => t < tA ? 0 : t < tSlo ? t - tA : t < tFrz ? (tSlo - tA) + 0.25 * (t - tSlo) : tauF + 0.5 * M.io((t - tLater) / 0.9);
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Same length, new direction!' });

/* ---------- D: speed from the period ---------- */
const STEPS = [[`\\text{distance in 1 turn} = ${tx(DC, '2\\pi r')}`, 'the circumference'],
  [`${vK} = ${tx(DC, '2\\pi r')} \\,/\\, T`, 'one turn takes one period T'],
  [`\\nu = 1 / T`, 'turns each second · unit s⁻¹ = hertz (Hz)'],
  [`${vK} = 2\\pi r\\,\\nu`, 'm × s⁻¹ = m/s'],
  [`${vK} = (2\\pi \\times 2) / 4 = \\pi \\approx ${tx(VC, '3.14\\,\\text{m/s}')}`, 'our ball: r = 2 m, T = 4 s']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:94px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${76 + i * 98}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'distance'), wt('D3', 'So'), wt('D4', 'So'), wt('D5', 'equals'), wt('D6', 'For')];
// unroll: the circle's rim is painted violet as the ball goes round, and a straight bar of the same length grows below
const un = $('#unS'), UO = [392, 210], UR = 108, UL = 2 * PI * UR, UX = 392 - UL / 2, UY = 420;
mk(un, 'circle', { cx: UO[0], cy: UO[1], r: UR, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
mk(un, 'circle', { cx: UO[0], cy: UO[1], r: 5, fill: C.ink });
const uRad = mk(un, 'line', { x1: UO[0], y1: UO[1], x2: UO[0] + UR, y2: UO[1], stroke: RC, 'stroke-width': 2.5 });
const uRl = sym(un, UO[0] + 34, UO[1] - 10, 'r', '', RC, 28);
const uArc = mk(un, 'path', { fill: 'none', stroke: DC, 'stroke-width': 6, 'stroke-linecap': 'round' });
const uBall = mk(un, 'circle', { r: 12, fill: C.ink });
mk(un, 'line', { x1: UX, y1: UY + 22, x2: UX + UL, y2: UY + 22, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.3 });
const uBar = mk(un, 'line', { x1: UX, y1: UY, y2: UY, stroke: DC, 'stroke-width': 10, 'stroke-linecap': 'round' });
const uEnds = [mk(un, 'line', { x1: UX, y1: UY - 18, x2: UX, y2: UY + 30, stroke: C.ink, 'stroke-width': 2 }), mk(un, 'line', { x1: UX + UL, y1: UY - 18, x2: UX + UL, y2: UY + 30, stroke: C.ink, 'stroke-width': 2 })];
const uBl = txt(un, 392, UY + 58, '2πr', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 30, fill: DC, 'font-weight': 600 });
const tUn = wt('D2', 'covers') - 0.1, unU = t => M.io((t - tUn) / 2.2);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`|${vvec}| \\text{ constant} \\quad\\Rightarrow\\quad \\text{direction of } ${vvec} \\text{ keeps turning}`);

/* ---------- C: side by side ---------- */
const c0 = $('#c0S'), LY = 200;
mk(c0, 'line', { x1: 30, y1: LY + 26, x2: 682, y2: LY + 26, stroke: C.ink, 'stroke-width': 2.5 });
const lGh = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(c0, VC, 5, 16); a.g.style.opacity = op; return a; });
const lGb = [0.3, 0.2, 0.12].map(op => mk(c0, 'circle', { r: 14, cy: LY + 12, fill: C.ink, opacity: op }));
const lBall = mk(c0, 'circle', { r: 14, cy: LY + 12, fill: C.ink }), lV = PUC.arrow(c0, VC, 6, 18);
const lVl = sym(c0, 0, LY - 70, 'v', '', VC, 28);
const tLrun = T0('C2') + 0.1, lX = t => 60 + ((M.clamp(t - tLrun, 0, 20) * 90) % 520);       // 3 m/s at 30 px per metre, wraps round
const c1 = $('#c1S'), CO = [356, 172], CR = 112, CW = 3 / 4;   // 3 m/s on a 4 m circle: ω = 0.75 rad/s, drawn 28 px per metre
mk(c1, 'circle', { cx: CO[0], cy: CO[1], r: CR, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(c1, 'circle', { cx: CO[0], cy: CO[1], r: 5, fill: C.ink });
const cGh = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(c1, VC, 5, 16); a.g.style.opacity = op; return a; });
const cBall = mk(c1, 'circle', { r: 14, fill: C.ink }), cV = PUC.arrow(c1, VC, 6, 18);
const tCrun = T0('C3') - 0.2, cTh = t => rad(200) + CW * Math.max(0, t - tCrun);
$('#c0a').innerHTML = K(`${dv} = 0 \\;\\Rightarrow\\; ${aK} = 0`);
$('#c1a').innerHTML = K(`${dv} \\neq 0 \\;\\Rightarrow\\; ${aK} \\neq 0`);
const th1 = PUC.think($('#th1'), { q: 'A car takes a curve at a steady 60 km/h. Is it accelerating?', opts: ['Yes', 'No'], right: 0,
  why: 'Its direction changes, so its velocity changes. That is acceleration.' });

/* ---------- R: which way, link by link ---------- */
const rl = $('#rlS'), RO = [392, 300], RR = 180, RW = 2 * PI / 6;       // the ball circles once every 6 s
mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: RR, fill: 'none', stroke: C.dim, 'stroke-width': 3 }); mk(rl, 'circle', { cx: RO[0], cy: RO[1], r: 6, fill: C.ink });
const rQ = [0, 90, 180, 270].map(d => PUC.arrow(rl, AC, 5, 16));
const rTan = mk(rl, 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 7', opacity: 0.5 });
const rGh = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(rl, VC, 5, 16); a.g.style.opacity = op; return a; });
const rRad = mk(rl, 'line', { x1: RO[0], y1: RO[1], stroke: RC, 'stroke-width': 2, opacity: 0.6 });
const rBall = mk(rl, 'circle', { r: 15, fill: C.ink }), rV = PUC.arrow(rl, VC, 7, 20), rDv = PUC.arrow(rl, AC, 6, 18), rA = PUC.arrow(rl, AC, 7, 20);
const rVl = sym(rl, 0, 0, 'v', '', VC, 28), rAl = sym(rl, 0, 0, 'a', '', AC, 28);
const tRrun = T0('R1') + 0.2, rTh = t => rad(150) + RW * Math.max(0, t - tRrun);
const LK = [['The velocity points along the tangent', VC], ['The arrow keeps turning toward the centre', VC], ['So Δv points to the centre', AC], ['a points along Δv: to the centre', AC]];
$('#lks').innerHTML = LK.map(([s2, c], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 100}px"><div class="n">${i + 1}</div><div class="lt">${s2.replace('Δv', `<span class="rd">Δv</span>`).replace(/^a /, '<i class="rd">a</i> ')}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const th2 = PUC.think($('#th2'), { q: 'A ball whirls on a string, and the string snaps. Which way does it fly?', opts: ['Along the tangent', 'Straight outward', 'Toward the centre'], right: 0,
  why: 'Its velocity is along the tangent, and no pull acts any more.' });
const avA = PUC.avatar($('#sR'), { x: 976 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A steady curve is still accelerating!' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\nu = \\dfrac{20}{2\\,\\text{s}} = 10\\,\\text{Hz}`)],
  [K(`T = \\dfrac{1}{\\nu} = 0.1\\,\\text{s}`)],
  [K(`${vK} = \\dfrac{${tx(DC, '2\\pi r')}}{T} = \\dfrac{2\\pi \\times 0.06}{0.1}`)],
  [K(`${vK} \\approx ${tx(VC, '3.77\\,\\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 200, dy: 100 });
$('#wl .lbl').style.top = '30px';
const w = $('#wrS'), WO = [392, 280], WR = 170, WJ = 10 * 2 * PI / 20;   // 10 turns per second shown at 1/20 speed
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR + 22, fill: '#EEF0F4', stroke: C.ink, 'stroke-width': 3 });
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: WR - 14, fill: '#FFF8E7', stroke: C.dim, 'stroke-width': 2 });
const wBl = mk(w, 'g', {}); mk(wBl, 'path', { d: 'M-90,0 L90,0 M0,-58 L0,58', stroke: C.ink2, 'stroke-width': 10, 'stroke-linecap': 'round' }); mk(wBl, 'circle', { r: 14, fill: C.ink });
const wRad = mk(w, 'line', { x1: WO[0], y1: WO[1], stroke: RC, 'stroke-width': 2.5 });
const wRl = txt(w, 0, 0, '6 cm', { 'font-size': 22, fill: RC, 'font-weight': 600 });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'circle', { r: 13, fill: '#E8B33A', opacity: op }));
const wDrop = mk(w, 'circle', { r: 13, fill: '#E8B33A', stroke: C.ink, 'stroke-width': 2.5 }), wV = PUC.arrow(w, VC, 6, 18);
const tWrun = T0('W2') + 0.2, wTh = t => rad(90) + WJ * Math.max(0, t - tWrun);
const tW = [wt('W3', 'So'), wt('W4', 'That'), wt('W5', 'equals'), wt('W6', 'about')];

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Speed is constant, so the acceleration is zero', right: 'Velocity turns, so <i>a</i> ≠ 0. It points to the centre' });
const tg = $('#tg'), GO = [210, 140], GR = 92;
const tgC = mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: GR, fill: 'none', stroke: C.dim, 'stroke-width': 3 });
const tgO = mk(tg, 'circle', { cx: GO[0], cy: GO[1], r: 5, fill: C.ink });
const tgB = mk(tg, 'circle', { r: 12, fill: C.ink }), tgV = PUC.arrow(tg, VC, 5, 16), tgA = PUC.arrow(tg, AC, 6, 18);
const tgVl = sym(tg, 0, 0, 'v', '', VC, 24), tgAl = sym(tg, 0, 0, 'a', '', AC, 24);
const tJn = wt('X3', 'circle'), tgTh = t => rad(60) + 1.1 * Math.max(0, t - tJn);
const where = PUC.where($('#wa'), { on: [], type: 'Short concept checks: what stays constant, what changes; speed from the period' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'A particle moves on a circle at a steady 5 m/s and turns through 120°. Find the change in speed and the size of the change in velocity.', qW: 780,
  opts: [K('0 \\text{ and } 0'), K('0 \\text{ and } 5\\,\\text{m/s}'), K('0 \\text{ and } 5\\sqrt{3}\\,\\text{m/s}'), K('5\\,\\text{m/s} \\text{ and } 5\\sqrt{3}\\,\\text{m/s}')], right: 2, cols: 1, optW: 968, optH: 68, optFs: 28, optY: 256 });
const so = PUC.solution($('#so'), [['speed stays 5, so Δ(speed) = 0'], ['angle between <i>v</i><sub>1</sub>, <i>v</i><sub>2</sub> = 120°'],
  [K(`|${dv}| = \\sqrt{25 + 25 - 50\\cos 120^\\circ}`)], [K(`= \\sqrt{75} = 5\\sqrt{3} \\approx 8.7\\,\\text{m/s} \\;\\Rightarrow\\; \\textbf{C}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'speed'), wt('A3', 'angle'), wt('A4', 'root'), wt('A4', 'seventy')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · uniform circular motion', y0: 92, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${vK} = 2\\pi r / T = 2\\pi r\\,\\nu \\qquad \\nu = 1/T`),
    '<b>Speed</b> stays constant. <b>Velocity</b> changes: its direction turns', '<b>Velocity</b> points along the tangent', '<b>Acceleration</b> is not zero. It points to the centre'] });
const YQ = ['Why is uniform circular motion accelerated, even at a steady speed?', 'A string snaps while a ball goes round. Which way does it fly?', 'How do you find the speed from the radius and the time period?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 47', topic: 'Which clock hand turns faster? Angular Velocity', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.06, 960, 540], [tD1 - 0.4, 1, 960, 540]]);
let geo = null;
function measure() { geo = 1; let x = 36; [0, 1].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 16; }); }
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const arcD = (o, r, a0, a1) => { const p0 = P(o, r, a0), p1 = P(o, r, a1), big = (a1 - a0) % (2 * PI) > PI ? 1 : 0; return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${big} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`; };
const ballAt = (el, p) => { attr(el, 'cx', p[0].toFixed(1)); attr(el, 'cy', p[1].toFixed(1)); };
const vArrow = (a, p, th, L, off = 0) => { const u = Tg(th); a.set(p[0] + u[0] * off, p[1] + u[1] * off, p[0] + u[0] * (off + L), p[1] + u[1] * (off + L)); };

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
    JOBS.forEach((_, i) => { const el = $('#jr' + i); M.vis(el, t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const [ln, d, rate] = jrD[i], a = PI / 2 - 2 * PI * rate * (t - tMorph), p = P([50, 50], 36, a); attr(ln, 'x2', p[0].toFixed(1)); attr(ln, 'y2', p[1].toFixed(1)); ballAt(d, p);
      el.style.background = mix(C.soft, C.ac3 || C.ac2, M.io((t - wt('H2', 'steady')) / 0.3)); });
    M.vis($('#hjP'), t, wt('H2', 'changing') - 0.3, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#mix'), t, wt('H3', 'mixer') - 0.2, 1e9, { dy: -30, sp: M.SOFT });
    const ma = mixW * Math.max(0, t - wt('H3', 'mixer')), mp = P(MO, MR, ma);
    attr(blade, 'transform', `translate(${MO[0]},${MO[1]}) rotate(${(-ma * 180 / PI).toFixed(2)})`);
    ballAt(drop, mp); M.vis(drop, t, wt('H3', 'drop') - 0.1, 1e9, POP);
    const dvOn = M.clamp((t - wt('H3', 'rides')) / 0.3); if (dvOn > 0) vArrow(dropV, mp, ma, 40 * dvOn, 10); else dropV.set(0, 0, 0, 0);
    TILES.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tTile[i] - 0.1, 1e9, POP); el.style.background = mix(C.soft, i ? C.redBg : C.ac2, M.io((t - tTile[i]) / 0.25)); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pd'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.rise($('#pdef'), t, tP2 + 0.05, { st: 0.04 });
    M.vis($('#dr0'), t, wt('P2', 'Uniform') - 0.1, 1e9, { dx: -20, dy: 0 }); M.vis($('#dr1'), t, wt('P2', 'Uniform') + 0.5, 1e9, { dx: -20, dy: 0 });
    M.vis($('#pdP'), t, tP4 - 0.1, 1e9, POP);
    M.vis($('#pt'), t, tP2 + 0.1, out, { dx: 60, dy: 0, ...o }); M.vis($('#exP'), t, tP2 + 0.5, 1e9, { dy: 8 });
    const tau2 = pTau(t), a = OMEGA * tau2, lap = Math.floor(tau2 / PT), frac = (tau2 % PT) / PT;
    ballAt(pBall, P(PO, PR, a));
    pGh.forEach((g, k) => { const q = OMEGA * pTau(t - 0.12 * (k + 1)); ballAt(g, P(PO, PR, q)); M.hide(g, Math.abs(q - a) < 0.01); });
    attr(pArc, 'd', frac < 0.004 ? '' : arcD(PO, PR, 0, 2 * PI * frac));
    M.setT(pClk, (tau2 % PT).toFixed(2) + ' s');
    [1, 2, 3].forEach(i => { const tl = tPrun + i * PT; M.vis($('#lap' + i), t, tl, 1e9, { dx: 20, dy: 0 }); $('#lap' + i).style.background = mix(C.ac2, C.soft, M.io((t - tl - 0.6) / 0.4)); });
    M.vis($('#ptP'), t, wt('P4', 'period') - 0.2, 1e9, POP);
  }

  /* S: the ball on a circle + readout + graph */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    M.vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tu = tau(t), thDeg = Math.round(((OMEGA * tu * 180 / PI) % 360) * 10) / 10, th = rad(thDeg), bp = P(O, R, th);
    const fr = t >= tFrz;                                   // frozen replay
    ballAt(sBall, bp);
    sGh.forEach((g, k) => { const q = OMEGA * tau(t - 0.12 * (k + 1)), gp = P(O, R, q); ballAt(g, gp); M.hide(g, Math.hypot(gp[0] - bp[0], gp[1] - bp[1]) < 4); });
    attr(sRad, 'x2', bp[0].toFixed(1)); attr(sRad, 'y2', bp[1].toFixed(1));
    const mid = P(O, R * 0.55, th); attr(sRl, 'x', (mid[0] - 30 * Math.sin(th)).toFixed(1)); attr(sRl, 'y', (mid[1] - 30 * Math.cos(th) + 7).toFixed(1)); attr(sRl, 'text-anchor', 'middle');
    M.vis(sRl, t, tS1 + 1.2, wt('S3', 'Now'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 });
    const ar = 54; attr(sArc, 'd', thDeg < 2 ? '' : arcD(O, ar, 0, th)); attr(sThl, 'x', (O[0] + 78 * Math.cos(th / 2) - 8).toFixed(1)); attr(sThl, 'y', (O[1] - 78 * Math.sin(th / 2) + 10).toFixed(1)); const arcOff = 1 - M.clamp((t - tTail) / 0.3); sThl.style.opacity = (M.clamp((thDeg - 12) / 8) * arcOff).toFixed(3); sArc.style.opacity = arcOff.toFixed(3);
    // velocity: grows on "velocity", always along the tangent; right-angle tick on "right angles"
    const gv = M.o3((t - wt('S3', 'velocity') + 0.2) / 0.6), showB = fr && t >= tLater + 0.85;
    if (!fr) vArrow(vLive, bp, th, VL * gv); else if (!showB) vArrow(vLive, bp, th, VL); else vLive.set(0, 0, 0, 0);
    const uT = Tg(th), uR = [Math.cos(th), -Math.sin(th)], q = 18, raOn = M.clamp((t - wt('S3', 'right') + 0.1) / 0.3) * (1 - M.clamp((t - tS6) / 0.3));
    attr(sRa, 'd', `M${(bp[0] - uR[0] * q).toFixed(1)},${(bp[1] - uR[1] * q).toFixed(1)} l${(uT[0] * q).toFixed(1)},${(uT[1] * q).toFixed(1)} l${(uR[0] * q).toFixed(1)},${(uR[1] * q).toFixed(1)}`); sRa.style.opacity = raOn.toFixed(3);
    attr(vLl, 'x', (bp[0] + uT[0] * (VL + 22) - 8).toFixed(1)); attr(vLl, 'y', (bp[1] + uT[1] * (VL + 22) + 10).toFixed(1)); vLl.style.opacity = (gv * (fr ? 0 : 1)).toFixed(3);
    // slow-mo replay: v1 pinned at 60°, the ball moves on to 105° (v2), both slide tail to tail at the middle point, Δv joins the tips
    const thA = rad(TH_A), thB = rad(TH_B), thM = (thA + thB) / 2, pA = P(O, R, thA), pB = P(O, R, thB), pM = P(O, R, thM);
    const sl = M.io((t - tTail) / 0.9), tA1 = [M.lerp(pA[0], pM[0], sl), M.lerp(pA[1], pM[1], sl)], tB1 = [M.lerp(pB[0], pM[0], sl), M.lerp(pB[1], pM[1], sl)];
    if (fr) { vArrow(v1, tA1, thA, VL); attr(v1l, 'x', (tA1[0] + Tg(thA)[0] * VL - 40).toFixed(1)); attr(v1l, 'y', (tA1[1] + Tg(thA)[1] * VL + 8).toFixed(1)); } else v1.set(0, 0, 0, 0);
    v1l.style.opacity = fr ? '1' : '0';
    if (showB) { vArrow(v2, tB1, thB, VL); attr(v2l, 'x', (tB1[0] + Tg(thB)[0] * VL + 14).toFixed(1)); attr(v2l, 'y', (tB1[1] + Tg(thB)[1] * VL + 10).toFixed(1)); } else v2.set(0, 0, 0, 0);
    v2l.style.opacity = showB ? '1' : '0';
    const tipA = [pM[0] + Tg(thA)[0] * VL, pM[1] + Tg(thA)[1] * VL], tipB = [pM[0] + Tg(thB)[0] * VL, pM[1] + Tg(thB)[1] * VL], ju = M.o3((t - tJoin) / 0.6);
    if (ju > 0) dvA.set(tipA[0], tipA[1], M.lerp(tipA[0], tipB[0], ju), M.lerp(tipA[1], tipB[1], ju)); else dvA.set(0, 0, 0, 0);
    attr(dvl, 'x', ((tipA[0] + tipB[0]) / 2).toFixed(1)); attr(dvl, 'y', ((tipA[1] + tipB[1]) / 2 + 40).toFixed(1)); attr(dvl, 'text-anchor', 'middle'); dvl.style.opacity = ju.toFixed(3);
    const gu = M.io((t - tCen + 0.2) / 0.6), pIn = P(O, R - 30, thM);
    attr(dvG, 'x1', pM[0].toFixed(1)); attr(dvG, 'y1', pM[1].toFixed(1)); attr(dvG, 'x2', M.lerp(pM[0], O[0], gu).toFixed(1)); attr(dvG, 'y2', M.lerp(pM[1], O[1], gu).toFixed(1)); M.hide(dvG, gu <= 0);
    attr(dvT, 'x', (O[0] + 18).toFixed(1)); attr(dvT, 'y', (O[1] + 44).toFixed(1)); dvT.style.opacity = M.clamp((t - tCen) / 0.3).toFixed(3);
    M.vis($('#slo'), t, tSlo - 0.1, out, POP);
    // readout + graph: numbers computed from the displayed angle
    const vx = -VMAG * Math.sin(th), vy = VMAG * Math.cos(th);
    M.setT($('#r0'), thDeg.toFixed(1) + '°'); M.setT($('#r1'), VMAG.toFixed(2)); M.setT($('#r2'), f2(vx)); M.setT($('#r3'), f2(vy));
    const hiS = M.io((t - wt('S2', 'stays')) / 0.3) * (1 - M.io((t - T0('S3')) / 0.3)); $('#r1').style.color = mix(C.ink, C.ok, hiS);
    // graph against the angle: this turn drawn bold, the turn before stays faint (every turn repeats the same wave)
    const lapN = Math.floor(OMEGA * tu * 180 / PI / 360 + 1e-9), full = lapN > 0 ? 360 : 0;
    cSp(a2 => [a2, VMAG], 0, Math.max(thDeg, full)); cXo(a2 => [a2, -VMAG * Math.sin(rad(a2))], 0, full); cYo(a2 => [a2, VMAG * Math.cos(rad(a2))], 0, full);
    cX(a2 => [a2, -VMAG * Math.sin(rad(a2))], 0, thDeg); cY(a2 => [a2, VMAG * Math.cos(rad(a2))], 0, thDeg);
    dX(thDeg, vx, t > tA); dY(thDeg, vy, t > tA);
    M.vis($('#leg'), t, T0('S5') - 0.1, 1e9, { dy: 10 });
    avD(t, wt('S4', 'turning') + 0.2, tS6 - 0.2);
  }

  /* D: how fast */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(76, tStep.slice(1).map((tt, i) => [tt - 0.1, 76 + (i + 1) * 98]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, T0('D2') - 0.1, 1e9, { dx: 60, dy: 0 });
    const u = unU(t), a = 2 * PI * u, bp = P(UO, UR, a);
    ballAt(uBall, bp); attr(uArc, 'd', u < 0.003 ? '' : (u > 0.999 ? `M${UO[0] + UR},${UO[1]} A${UR},${UR} 0 1 0 ${UO[0] - UR},${UO[1]} A${UR},${UR} 0 1 0 ${UO[0] + UR},${UO[1]}` : arcD(UO, UR, 0, a)));
    attr(uBar, 'x2', (UX + UL * u).toFixed(1)); M.hide(uBar, u < 0.003);
    uEnds.forEach((e, i) => M.vis(e, t, i ? tUn + 2.2 : tUn, 1e9, { dy: 0, fade: 0.2 }));
    M.vis(uBl, t, wt('D2', 'two') - 0.1, 1e9, POP);
    M.vis($('#dc0'), t, wt('D3', 'One') - 0.1, 1e9, POP); M.vis($('#dc1'), t, wt('D4', 'Frequency') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'speed') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'velocity'), 0.8);
  }

  /* C: side by side + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#c0'), t, tC1 + 0.3, out, { dx: -60, dy: 0, ...o });
    const lx = lX(t); attr(lBall, 'cx', lx.toFixed(1)); lV.set(lx, LY - 40, lx + 110, LY - 40); attr(lVl, 'x', (lx + 46).toFixed(1));
    lGh.forEach((a, k) => { const gx = lX(t - 1.2 * (k + 1)), on = t - 1.2 * (k + 1) > tLrun && gx < lx; if (on) a.set(gx, LY - 40, gx + 110, LY - 40); else a.set(0, 0, 0, 0); attr(lGb[k], 'cx', gx.toFixed(1)); M.hide(lGb[k], !on); });
    PUC.write($('#c0a'), t, wt('C2', 'No') - 0.1, 0.7);
    M.vis($('#c1'), t, T0('C3') - 0.4, out, { dx: 60, dy: 0, ...o }); M.vis($('#exC'), t, T0('C3'), 1e9, { dy: 8 });
    const ct = cTh(t), cp = P(CO, CR, ct); ballAt(cBall, cp); vArrow(cV, cp, ct, 90);
    cGh.forEach((a, k) => { const t2 = t - 1.0 * (k + 1), q = cTh(t2); if (t2 > tCrun) vArrow(a, P(CO, CR, q), q, 90); else a.set(0, 0, 0, 0); });
    PUC.write($('#c1a'), t, wt('C3', 'So') - 0.1, 0.7);
    M.vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'accelerating') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'speed') });
  }

  /* R: which way, link by link, + think */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rr'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); M.vis(el, t, tLk[i] - 0.1, 1e9, { dx: -20, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tLk[i]) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? tK1)) / 0.3))); });
    M.vis($('#rrP'), t, wt('R5', 'centripetal') - 0.1, 1e9, POP);
    const th = rTh(t), bp = P(RO, RR, th), uT = Tg(th);
    ballAt(rBall, bp); attr(rRad, 'x2', bp[0].toFixed(1)); attr(rRad, 'y2', bp[1].toFixed(1));
    const g1 = M.o3((t - tLk[0] - 0.3) / 0.5); vArrow(rV, bp, th, 110 * g1); attr(rVl, 'x', (bp[0] + uT[0] * 134 - 8).toFixed(1)); attr(rVl, 'y', (bp[1] + uT[1] * 134 + 10).toFixed(1)); rVl.style.opacity = g1.toFixed(3);
    const tn = M.clamp((t - wt('R2', 'tangent')) / 0.3) * (1 - M.clamp((t - tLk[1]) / 0.3));
    attr(rTan, 'x1', (bp[0] - uT[0] * 200).toFixed(1)); attr(rTan, 'y1', (bp[1] - uT[1] * 200).toFixed(1)); attr(rTan, 'x2', (bp[0] + uT[0] * 200).toFixed(1)); attr(rTan, 'y2', (bp[1] + uT[1] * 200).toFixed(1)); rTan.style.opacity = (0.5 * tn).toFixed(3);
    rGh.forEach((a, k) => { const q = rTh(t - 0.5 * (k + 1)); if (t > tLk[1] + 0.2 && t < tK1) vArrow(a, P(RO, RR, q), q, 110); else a.set(0, 0, 0, 0); });
    // link 3: a short Δv at the ball, inward; link 4: the full a arrow, plus the same arrow at four points
    const inw = [RO[0] - bp[0], RO[1] - bp[1]], il = Math.hypot(...inw), ui = [inw[0] / il, inw[1] / il];
    const g3 = M.o3((t - tLk[2] - 0.3) / 0.5) * (1 - M.clamp((t - tLk[3] - 0.4) / 0.3));
    if (g3 > 0) rDv.set(bp[0] + ui[0] * 20, bp[1] + ui[1] * 20, bp[0] + ui[0] * (20 + 50 * g3), bp[1] + ui[1] * (20 + 50 * g3)); else rDv.set(0, 0, 0, 0);
    const g4 = M.o3((t - tLk[3] - 0.3) / 0.6);
    if (g4 > 0) rA.set(bp[0] + ui[0] * 20, bp[1] + ui[1] * 20, bp[0] + ui[0] * (20 + 90 * g4), bp[1] + ui[1] * (20 + 90 * g4)); else rA.set(0, 0, 0, 0);
    attr(rAl, 'x', (bp[0] + ui[0] * 70 + ui[1] * 26 - 8).toFixed(1)); attr(rAl, 'y', (bp[1] + ui[1] * 70 - ui[0] * 26 + 10).toFixed(1)); rAl.style.opacity = g4.toFixed(3);
    rQ.forEach((a, k) => { const q = rad(45 + 90 * k), pq = P(RO, RR, q), uq = [-Math.cos(q), Math.sin(q)], g = M.o3((t - wt('R5', 'centre') - k * 0.12) / 0.5); if (g > 0) a.set(pq[0] + uq[0] * 14, pq[1] + uq[1] * 14, pq[0] + uq[0] * (14 + 70 * g), pq[1] + uq[1] * (14 + 70 * g)); else a.set(0, 0, 0, 0); a.g.style.opacity = '0.45'; });
    avA(t, wt('R5', 'seeking') + 0.3, out);
    M.vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'moment') });
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') - 0.2, out, { dx: 60, dy: 0, ...o }); M.vis($('#exW'), t, T0('W2') + 0.2, 1e9, { dy: 8 }); M.vis($('#wslo'), t, T0('W2') + 0.4, 1e9, POP);
    const th = wTh(t), bp = P(WO, WR - 34, th);
    attr(wBl, 'transform', `translate(${WO[0]},${WO[1]}) rotate(${(-th * 180 / PI).toFixed(2)})`);
    ballAt(wDrop, bp); attr(wRad, 'x2', bp[0].toFixed(1)); attr(wRad, 'y2', bp[1].toFixed(1));
    const md = P(WO, (WR - 34) * 0.62, th); attr(wRl, 'x', (md[0] - 30 * Math.sin(th)).toFixed(1)); attr(wRl, 'y', (md[1] - 30 * Math.cos(th) + 8).toFixed(1)); attr(wRl, 'text-anchor', 'middle');
    wGh.forEach((g, k) => { const q = wTh(t - 0.1 * (k + 1)); ballAt(g, P(WO, WR - 34, q)); M.hide(g, t - 0.1 * (k + 1) < tWrun); });
    vArrow(wV, bp, th, 96 * M.o3((t - wt('W2', 'sits')) / 0.5), 14);
    [0, 1, 2].forEach(i => M.vis($('#wc' + i), t, tW[[0, 1, 3][i]] + 0.2, 1e9, POP));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'speed') - 0.3, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'not') - 0.2 });
    M.draw(tgC, t, tJn - 0.4, 0.6); M.vis(tgO, t, tJn, 1e9, POP);
    const th = tgTh(t), bp = P(GO, GR, th), uT = Tg(th); ballAt(tgB, bp); M.vis(tgB, t, tJn, 1e9, POP);
    const gv = M.o3((t - wt('X3', 'direction')) / 0.5); vArrow(tgV, bp, th, 70 * gv, 0); attr(tgVl, 'x', (bp[0] + uT[0] * 88 - 6).toFixed(1)); attr(tgVl, 'y', (bp[1] + uT[1] * 88 + 8).toFixed(1)); tgVl.style.opacity = gv.toFixed(3);
    const ga = M.o3((t - wt('X3', 'points') + 0.1) / 0.5), ui = [-Math.cos(th), Math.sin(th)];
    if (ga > 0) tgA.set(bp[0] + ui[0] * 14, bp[1] + ui[1] * 14, bp[0] + ui[0] * (14 + 58 * ga), bp[1] + ui[1] * (14 + 58 * ga)); else tgA.set(0, 0, 0, 0);
    attr(tgAl, 'x', (bp[0] + ui[0] * 50 + ui[1] * 22 - 6).toFixed(1)); attr(tgAl, 'y', (bp[1] + ui[1] * 50 - ui[0] * 22 + 8).toFixed(1)); tgAl.style.opacity = ga.toFixed(3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'As') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
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
