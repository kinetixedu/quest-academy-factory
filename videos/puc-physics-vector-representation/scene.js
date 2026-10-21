// PUC Physics Ep 33: Vector Representation (Motion notebook, the arrow bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const BC = C.violet, VC = C.gold, FC = C.orange, IC = C.ink, RC = C.red;   // canon: displacement violet (vector A is a displacement); angle gold, force orange, numbers ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, fs = 30, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': fs, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const deg = Math.PI / 180;
const polar = (a, x, y, ang, len) => a.set(x, y, x + len * Math.cos(ang * deg), y - len * Math.sin(ang * deg));
const arcD = (x, y, r, a0, a1) => { const p = a => [x + r * Math.cos(a * deg), y - r * Math.sin(a * deg)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${x1.toFixed(1)},${y1.toFixed(1)}`; };

Object.assign(M.IC, {
  nav: ['M3 11l19-9-9 19-2-8-8-2z'],
  anchor: ['M12 22V8', 'M5 12H2a10 10 0 0 0 20 0h-3', 'M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tR1 = T0('R1'), tB1 = T0('B1'), tL1 = T0('L1'), tD1 = T0('D1'), tT = T0('T1'), tK1 = T0('K1'), tK3 = T0('K3');
const tM1 = T0('M1'), tZ1 = T0('Z1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tK1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three jobs, one arrow ---------- */
const JOBS = [['anchor', 'Sailor', 'SHIP HEADING', 'sailor'], ['nav', 'Pilot', 'FLIGHT PATH', 'pilot'], ['map', 'Map maker', 'ROUTE ARROWS', 'map']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: the ride to nowhere ---------- */
const h = $('#hmS'), HG = [190, 400], HK = 130;                 // 130 px per km
for (let x = 70; x <= 720; x += 65) mk(h, 'line', { x1: x, y1: 90, x2: x, y2: 470, stroke: C.soft, 'stroke-width': 2 });
for (let y = 90; y <= 470; y += 65) mk(h, 'line', { x1: 70, y1: y, x2: 720, y2: y, stroke: C.soft, 'stroke-width': 2 });
mk(h, 'rect', { x: HG[0] - 20, y: HG[1] - 10, width: 40, height: 20, rx: 4, fill: C.ink });
txt(h, HG[0], HG[1] + 42, 'GATE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const hRide = mk(h, 'path', { d: `M${HG[0]},${HG[1]} h${2 * HK}`, stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '2 10', 'stroke-linecap': 'round', fill: 'none' });
const hGh = [0.3, 0.2, 0.12].map(op => mk(h, 'circle', { r: 12, fill: C.ink, opacity: op, cx: -99, cy: -99 }));
const hBike = mk(h, 'circle', { r: 13, fill: C.ink, stroke: '#fff', 'stroke-width': 4, cx: HG[0], cy: HG[1] });
const hQ = txt(h, HG[0] + 2 * HK, HG[1] - 34, '?', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 48, 'font-weight': 700, fill: RC });
const LIB = [HG[0] + 2 * HK * Math.cos(30 * deg), HG[1] - 2 * HK * Math.sin(30 * deg)];
const hLib = mk(h, 'g', {}); mk(hLib, 'rect', { x: LIB[0] - 22, y: LIB[1] - 22, width: 44, height: 36, rx: 4, fill: M.mix(BC, '#FFFFFF', 0.84), stroke: BC, 'stroke-width': 2.5 }); mk(hLib, 'path', { d: `M${LIB[0] - 28},${LIB[1] - 20} L${LIB[0]},${LIB[1] - 40} L${LIB[0] + 28},${LIB[1] - 20} Z`, fill: BC });
txt(hLib, LIB[0], LIB[1] - 52, 'LIBRARY', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2, fill: BC, 'font-weight': 600 });
const tRide0 = wt('H4', 'rode') - 0.1, tRide1 = wt('H4', 'No') - 0.3;

/* ---------- R: anatomy of an arrow ---------- */
const an = $('#anS'), AX0 = 300, AX1 = 1200, AY = 300;
const anA = PUC.arrow(an, BC, 14, 44);
const anTail = mk(an, 'circle', { cx: AX0, cy: AY, r: 14, fill: C.ink });
const anBr = mk(an, 'path', { d: `M${AX0},${AY + 60} v16 H${AX1} v-16`, fill: 'none', stroke: IC, 'stroke-width': 3, 'stroke-linecap': 'round' });
const anBrT = txt(an, (AX0 + AX1) / 2, AY + 120, 'LENGTH = MAGNITUDE (THE SIZE)', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: IC, 'letter-spacing': 1 });
const anRing = mk(an, 'circle', { cx: AX1 - 18, cy: AY, r: 56, fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-dasharray': '8 8' });
const anDir = txt(an, AX1 - 18, AY - 82, 'ARROWHEAD = DIRECTION', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: VC, 'letter-spacing': 1 });
const anTl = txt(an, AX0, AY - 40, 'TAIL', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: IC, 'letter-spacing': 2 });
const anTs = txt(an, AX0, AY + 160 - 120 + 0, '', {});
const anHd = txt(an, AX1 + 90, AY + 10, 'HEAD', { 'font-size': 26, 'font-weight': 600, fill: IC, 'letter-spacing': 2 });
const anSym = it(an, (AX0 + AX1) / 2 - 20, AY - 30, 'A', BC, 44);
const anTlS = txt(an, AX0, AY + 230, 'where it starts', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, fill: C.mute });
const anHdS = txt(an, AX1 - 18, AY + 230, 'where it points', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-size': 24, fill: C.mute });

/* ---------- B: the arrow bench (sim + readout + graph) ---------- */
const s = $('#simS'), O = [130, 420], PX = 100;                  // 100 px per cm on the page, 1 cm = 1 km
for (let x = O[0]; x <= O[0] + 5.5 * PX; x += PX / 2) mk(s, 'line', { x1: x, y1: 130, x2: x, y2: O[1], stroke: C.soft, 'stroke-width': 2 });
for (let y = O[1]; y >= 130; y -= PX / 2) mk(s, 'line', { x1: O[0], y1: y, x2: O[0] + 5.5 * PX, y2: y, stroke: C.soft, 'stroke-width': 2 });
mk(s, 'line', { x1: O[0], y1: O[1], x2: O[0] + 5.5 * PX, y2: O[1], stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.6 });
txt(s, O[0] + 5.5 * PX + 12, O[1] + 6, 'E', { fill: C.ink, 'font-weight': 600 });
mk(s, 'line', { x1: O[0], y1: O[1], x2: O[0], y2: 140, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.6 });
txt(s, O[0], 128, 'N', { fill: C.ink, 'font-weight': 600, 'text-anchor': 'middle' });
for (let c = 0; c <= 5; c++) { mk(s, 'line', { x1: O[0] + c * PX, y1: O[1], x2: O[0] + c * PX, y2: O[1] + 12, stroke: C.ink, 'stroke-width': 2 }); txt(s, O[0] + c * PX, O[1] + 36, c, { 'text-anchor': 'middle', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); }
txt(s, O[0] + 5 * PX + 30, O[1] + 36, 'cm', { 'font-size': 18, fill: C.mute });
const bArc = mk(s, 'path', { d: '', stroke: VC, 'stroke-width': 4, fill: 'none' });
const bTh = it(s, 0, 0, 'θ', VC, 28);
const bGh = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(s, BC, 7, 20); a.g.setAttribute('opacity', op); return a; });
const bA = PUC.arrow(s, BC, 8, 22);
mk(s, 'circle', { cx: O[0], cy: O[1], r: 9, fill: C.ink });
const bLab = it(s, 0, 0, 'A', BC, 34);
const tGrow = wt('B3', 'grows') - 0.1, tTurn = wt('B5', 'turns') - 0.1, tTurnE = tTurn + 3.2, tStr = wt('B6', 'stretch') - 0.1;
const magF = t => M.lerp(0, 2, M.io((t - tGrow) / 0.9)) + M.lerp(0, 2, M.io((t - tStr) / 1.0));
const angF = t => 30 * M.clamp((t - tTurn) / (tTurnE - tTurn));          // slow-mo: constant turn rate, 0.25x
$('#roG').innerHTML = `<span class="k" style="color:${BC}">|A|</span><span class="v" id="rA" style="color:${BC}">0.0</span><span class="u">km · magnitude</span>
  <span class="k" style="color:${IC}">ℓ</span><span class="v" id="rL">0.0</span><span class="u">cm · arrow length</span>
  <span class="k" style="color:${VC}">θ</span><span class="v" id="rT" style="color:${VC}">0</span><span class="u">° north of east</span>`;
const G = PUC.graph($('#grS'), { x: 110, y: 76, w: 520, h: 136, xmax: 5, ymin: 0, ymax: 5, xt: [0, 1, 2, 3, 4], yt: [0, 5], xl: '|A| (km)', yl: 'ℓ (cm)' });
const gL = G.curve(BC, 5), gDt = G.dot(IC, 10);
const gTag = document.createElement('div'); gTag.className = 'pillp ac'; gTag.style.cssText = 'right:36px;top:18px;height:40px;font-size:19px'; gTag.innerHTML = 'slope = scale: 1 cm per km'; $('#gr').appendChild(gTag);
const avB = PUC.avatar($('#sB'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Longer arrow, same angle. Got it.' });

/* ---------- L: one number leaves a circle ---------- */
const lc = $('#lcS'), LG = [392, 320], LR = 170;
const lCirc = mk(lc, 'circle', { cx: LG[0], cy: LG[1], r: LR, fill: 'none', stroke: IC, 'stroke-width': 3, 'stroke-dasharray': '8 8' });
mk(lc, 'rect', { x: LG[0] - 20, y: LG[1] - 10, width: 40, height: 20, rx: 4, fill: C.ink });
txt(lc, LG[0], LG[1] + 40, 'GATE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 2 });
const LD = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const lDots = LD.map(a => mk(lc, 'circle', { cx: LG[0] + LR * Math.cos(a * deg), cy: LG[1] - LR * Math.sin(a * deg), r: 11, fill: C.dim }));
const lR = PUC.arrow(lc, IC, 4, 14);
const lRt = txt(lc, LG[0] + 70, LG[1] + 76, '2 km', { 'font-size': 22, 'font-weight': 600, fill: IC });
const lA = PUC.arrow(lc, BC, 7, 20);
const lArc = mk(lc, 'path', { d: arcD(LG[0], LG[1], 60, 0, 30), stroke: VC, 'stroke-width': 4, fill: 'none' });
const lTh = txt(lc, LG[0] + 72, LG[1] - 12, '30°', { 'font-size': 22, 'font-weight': 600, fill: VC });
const lLib = txt(lc, LG[0] + LR * Math.cos(30 * deg) + 18, LG[1] - LR * Math.sin(30 * deg) - 18, 'LIBRARY', { 'font-size': 18, 'letter-spacing': 2, fill: BC, 'font-weight': 600 });
const LK = [['2 km', 'only the magnitude', IC, wt('L2', 'Two')], ['Every point', 'on the circle is 2 km away', IC, wt('L3', 'Every')], ['One number', 'leaves a whole circle', RC, wt('L4', 'whole')], ['+ angle 30°', 'only one point: the library', BC, wt('L4', 'angle')]];
$('#lks').innerHTML = LK.map(([a, b, col], i) => `<div class="sol" id="lk${i}" style="top:${96 + i * 100}px"><div class="n" style="background:${col}">${i + 1}</div><div class="sx" style="font:600 30px Poppins"><span style="color:${col}">${a}</span> <span style="font-weight:500;color:var(--ink2)">${b}</span></div></div>`).join('') +
  `<div class="pillp ac" id="lkP" style="left:36px;top:494px">A vector = magnitude + direction</div>`;
const avL = PUC.avatar($('#sL'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'I needed the angle, not just the 2 km.' });

/* ---------- D: notation rules ---------- */
const STEPS = [[`\\mathbf{\\textcolor{${BC}}{A}} \\;\\text{ or }\\; \\textcolor{${BC}}{\\vec{A}}`, 'bold in print, small arrow by hand'],
  [`|\\textcolor{${BC}}{\\vec{A}}| = \\textcolor{${BC}}{A} \\ge 0`, 'magnitude: never negative'],
  [`\\ell = \\textcolor{${BC}}{A} \\div \\text{scale} = 2\\,\\text{cm}`, '2 km at 1 km per cm'],
  [`\\textcolor{${BC}}{\\vec{A}} \\leftrightarrow (\\textcolor{${BC}}{A},\\ \\textcolor{${VC}}{\\theta})`, 'two numbers fix it in a plane']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'In'), wt('D3', 'Its'), wt('D4', 'Arrow'), wt('D5', 'In')];
const NOTS = [[`\\mathbf{\\textcolor{${BC}}{A}}`, 'IN PRINT', 60, wt('D2', 'bold')], [`\\textcolor{${BC}}{\\vec{A}}`, 'BY HAND', 290, wt('D2', 'hand')], [`|\\textcolor{${BC}}{\\vec{A}}|`, 'MAGNITUDE', 520, wt('D3', 'bars')]];
$('#nots').innerHTML = NOTS.map(([f, l, x], i) => `<div class="nbig" id="nb${i}" style="left:${x}px;top:60px">${K(f)}</div><div class="nlab" id="nl${i}" style="left:${x}px;top:236px">${l}</div>`).join('');
const dr = $('#drS'), DO = [130, 520], DL = 320;
const dRef = mk(dr, 'line', { x1: DO[0], y1: DO[1], x2: DO[0] + 420, y2: DO[1], stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0.6 });
const dA = PUC.arrow(dr, BC, 7, 20);
const dArc = mk(dr, 'path', { d: arcD(DO[0], DO[1], 70, 0, 30), stroke: VC, 'stroke-width': 4, fill: 'none' });
const dTh = txt(dr, DO[0] + 84, DO[1] - 12, 'θ = 30°', { 'font-size': 22, 'font-weight': 600, fill: VC });
const dAl = txt(dr, DO[0] + DL * Math.cos(30 * deg) / 2 - 24, DO[1] - DL * Math.sin(30 * deg) / 2 - 24, 'A = 2 km', { 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 600, fill: BC });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`\\textcolor{${BC}}{\\vec{A}}:\\;\\; \\text{length} \\to \\textcolor{${BC}}{A}\\ (\\text{size}),\\;\\; \\text{head} \\to \\textcolor{${VC}}{\\theta}\\ (\\text{direction})`);

/* ---------- K: A and -A ---------- */
const kaS = $('#kaS'), knS = $('#knS'), KY = 270, KL = 420, KX0 = 182;
const ruler = (svg) => { for (let k = 0; k <= 3; k++) { mk(svg, 'line', { x1: KX0 + k * 140, y1: KY + 70, x2: KX0 + k * 140, y2: KY + 84, stroke: C.ink, 'stroke-width': 2 }); txt(svg, KX0 + k * 140, KY + 110, k, { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); } txt(svg, KX0 + 3 * 140 + 26, KY + 110, 'km', {}); mk(svg, 'line', { x1: KX0, y1: KY + 70, x2: KX0 + KL, y2: KY + 70, stroke: C.ink, 'stroke-width': 2 }); };
ruler(kaS); ruler(knS);
const kA = PUC.arrow(kaS, BC, 8, 24); const kAl = it(kaS, KX0 + KL / 2 - 12, KY - 30, 'A', BC, 40);
const kAt = mk(kaS, 'circle', { cx: KX0, cy: KY, r: 9, fill: C.ink });
const kGhost = mk(knS, 'line', { x1: KX0, y1: KY, x2: KX0 + KL, y2: KY, stroke: BC, 'stroke-width': 3, 'stroke-dasharray': '8 8', opacity: 0.45 });
const kNg = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(knS, BC, 8, 24); a.g.setAttribute('opacity', op); return a; });
const kN = PUC.arrow(knS, BC, 8, 24); const kNl = it(knS, KX0 + KL / 2 - 30, KY - 30, '−A', BC, 40);
const tFlip = wt('K2', 'head') - 0.2, flipF = t => 180 * M.io((t - tFlip) / 0.9);
const th1 = PUC.think($('#th1'), { q: 'A and −A have the same magnitude. Are they equal vectors?', opts: ['Yes', 'No'], right: 1, why: 'Equal needs the same size AND the same direction. −A points the opposite way.' });

/* ---------- M: slide vs turn ---------- */
const ms = $('#msS'), MO = [120, 440], MV = [260, -150], MOff = [300, -110];
for (let x = 80; x <= 720; x += 40) mk(ms, 'line', { x1: x, y1: 80, x2: x, y2: 470, stroke: C.soft, 'stroke-width': 2 });
for (let y = 80; y <= 470; y += 40) mk(ms, 'line', { x1: 80, y1: y, x2: 720, y2: y, stroke: C.soft, 'stroke-width': 2 });
const mOrig = mk(ms, 'line', { x1: MO[0], y1: MO[1], x2: MO[0] + MV[0], y2: MO[1] + MV[1], stroke: BC, 'stroke-width': 3, 'stroke-dasharray': '8 8', opacity: 0.45 });
const mGh = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(ms, BC, 7, 20); a.g.setAttribute('opacity', op); return a; });
const mA = PUC.arrow(ms, BC, 7, 20);
const mLab = txt(ms, 560, 150, 'still A', { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: C.ok });
const tSl = wt('M1', 'Slide') - 0.1, slF = t => M.io((t - tSl) / 1.4);
const mt = $('#mtS'), TO = [200, 420], TLn = 300;
for (let x = 80; x <= 720; x += 40) mk(mt, 'line', { x1: x, y1: 80, x2: x, y2: 470, stroke: C.soft, 'stroke-width': 2 });
for (let y = 80; y <= 470; y += 40) mk(mt, 'line', { x1: 80, y1: y, x2: 720, y2: y, stroke: C.soft, 'stroke-width': 2 });
const tOrig = mk(mt, 'line', { x1: TO[0], y1: TO[1], x2: TO[0] + TLn * Math.cos(30 * deg), y2: TO[1] - TLn * Math.sin(30 * deg), stroke: BC, 'stroke-width': 3, 'stroke-dasharray': '8 8', opacity: 0.45 });
const tGh = [0.3, 0.2, 0.12].map(op => { const a = PUC.arrow(mt, RC, 7, 20); a.g.setAttribute('opacity', op); return a; });
const tA = PUC.arrow(mt, RC, 7, 20);
const tArc = mk(mt, 'path', { d: arcD(TO[0], TO[1], 120, 30, 50), stroke: VC, 'stroke-width': 4, fill: 'none' });
const tArcT = txt(mt, TO[0] + 128 * Math.cos(40 * deg) + 8, TO[1] - 128 * Math.sin(40 * deg) - 6, '+20°', { 'font-size': 22, 'font-weight': 600, fill: VC });
const tLab = txt(mt, 560, 150, 'new', { 'font-family': 'Poppins', 'font-size': 34, 'font-weight': 700, fill: RC });
const tTu = wt('M3', 'turn') - 0.1, tuF = t => 30 + 20 * M.io((t - tTu) / 1.0);
const th2 = PUC.think($('#th2'), { q: 'A 2 cm arrow stands for 6 N. What does a 5 cm arrow stand for?', opts: ['12 N', '15 N', '30 N'], right: 1, why: '6 N ÷ 2 cm = 3 N per cm, so 5 cm × 3 N per cm = 15 N.' });

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`\\ell = \\dfrac{\\textcolor{${FC}}{F}}{\\text{scale}} = \\dfrac{20\\,\\text{N}}{5\\,\\text{N/cm}} = 4\\,\\text{cm}`)],
  [K(`\\text{draw } 4\\,\\text{cm along the floor}`)],
  [K(`\\text{protractor at the tail: } \\textcolor{${VC}}{60^\\circ}`)],
  [K(`\\text{head at the end} \\Rightarrow \\textcolor{${FC}}{\\vec{F}} = 20\\,\\text{N},\\ \\textcolor{${VC}}{60^\\circ}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 94 });
const tW = [wt('W3', 'Arrow'), wt('W4', 'Draw'), wt('W5', 'Place'), wt('W6', 'Put')];
const w = $('#wrS'), WO = [170, 470], WPX = 100;                 // 100 px per cm on the page
mk(w, 'line', { x1: 60, y1: WO[1], x2: 724, y2: WO[1], stroke: C.ink, 'stroke-width': 3 });
for (let x = 72; x < 724; x += 28) mk(w, 'line', { x1: x, y1: WO[1] + 4, x2: x - 14, y2: WO[1] + 18, stroke: C.dim, 'stroke-width': 2 });
const wRul = mk(w, 'g', {});
mk(wRul, 'rect', { x: WO[0] - 16, y: WO[1] + 26, width: 4 * WPX + 32, height: 46, rx: 6, fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 2 });
for (let k = 0; k <= 40; k++) mk(wRul, 'line', { x1: WO[0] + k * 10, y1: WO[1] + 26, x2: WO[0] + k * 10, y2: WO[1] + 26 + (k % 10 ? (k % 5 ? 8 : 13) : 18), stroke: C.ink, 'stroke-width': k % 10 ? 1.2 : 2 });
for (let k = 0; k <= 4; k++) txt(wRul, WO[0] + k * WPX, WO[1] + 64, k, { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 });
const wPro = mk(w, 'g', {});
mk(wPro, 'path', { d: `${arcD(WO[0], WO[1], 150, 0, 180)} Z`, fill: 'rgba(183,121,31,0.06)', stroke: VC, 'stroke-width': 2.5 });
for (let a = 0; a <= 180; a += 10) { const L = a % 30 ? 10 : 20; mk(wPro, 'line', { x1: WO[0] + 150 * Math.cos(a * deg), y1: WO[1] - 150 * Math.sin(a * deg), x2: WO[0] + (150 - L) * Math.cos(a * deg), y2: WO[1] - (150 - L) * Math.sin(a * deg), stroke: VC, 'stroke-width': 2 }); if (a % 30 === 0 && a > 0 && a < 180) txt(wPro, WO[0] + 112 * Math.cos(a * deg), WO[1] - 112 * Math.sin(a * deg) + 6, a, { 'text-anchor': 'middle', 'font-size': 15, fill: VC, 'font-weight': 600 }); }
const wLine = mk(w, 'line', { x1: WO[0], y1: WO[1], x2: WO[0], y2: WO[1], stroke: FC, 'stroke-width': 7, 'stroke-linecap': 'round' });
const wGh = [0.3, 0.2, 0.12].map(op => mk(w, 'line', { x1: WO[0], y1: WO[1], x2: WO[0], y2: WO[1], stroke: FC, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: op }));
const wA = PUC.arrow(w, FC, 7, 24);
mk(w, 'circle', { cx: WO[0], cy: WO[1], r: 9, fill: C.ink });
const wArc = mk(w, 'path', { d: arcD(WO[0], WO[1], 70, 0, 60), stroke: VC, 'stroke-width': 4, fill: 'none' });
const wTh = txt(w, WO[0] + 80, WO[1] - 30, '60°', { 'font-size': 24, 'font-weight': 600, fill: VC });
const wFl = txt(w, WO[0] + 200 * Math.cos(60 * deg) - 130, WO[1] - 200 * Math.sin(60 * deg) - 70, 'F = 20 N', { 'font-size': 26, 'font-weight': 600, fill: FC });
const wLen = txt(w, WO[0] + 2 * WPX, WO[1] - 16, '4 cm', { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: IC });
const tLine = wt('W4', 'line') - 0.1, tRot = wt('W5', 'Turn') - 0.1;
const wAng = t => 60 * M.io((t - tRot) / 1.2), wLenF = t => 4 * WPX * M.io((t - tLine) / 0.8);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: '−A has a negative magnitude', right: '|−A| = |A|. Only the direction flips' });
const r = $('#rtS'), RY = [100, 190], RX0 = 60, RL = 300;
const rA = PUC.arrow(r, BC, 6, 18), rN = PUC.arrow(r, BC, 6, 18);
const rAl = txt(r, RX0 + RL + 30, RY[0] + 8, 'A  · 3 km', { 'font-size': 22, 'font-weight': 600, fill: BC });
const rNl = txt(r, RX0 + RL + 30, RY[1] + 8, '−A · 3 km', { 'font-size': 22, 'font-weight': 600, fill: BC });
const where = PUC.where($('#wa'), { on: [], type: 'Notation, magnitude, equal and negative vectors; also inside longer vector problems' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: 'Scale: 1 cm = 2 N. Vector <b>A</b> is drawn as an arrow 4.5 cm long, pointing 30° north of east. Which describes −<b>A</b>?', qW: 800,
  opts: ['9 N, 30° south of west', '−9 N, 30° north of east', '9 N, 30° north of west', '4.5 N, 30° south of west'], right: 0, cols: 1, optW: 968, optH: 62, optFs: 28, optY: 268 });
const so = PUC.solution($('#so'), [[`|<b>A</b>| = 4.5 × 2 = <b>9 N</b>`], [`|−<b>A</b>| = |<b>A</b>| = 9 N`], [`30° N of E → <b>30° S of W</b>`], [`<span style="color:var(--red)">B</span> size &lt; 0 · <span style="color:var(--red)">C</span> half flip · <span style="color:var(--red)">D</span> no scale`]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'Size'), wt('A2', 'minus'), wt('A3', 'Thirty'), wt('A4', 'B')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · vector representation', y0: 104, dy: 90, txt: [0, 1, 1, 1],
  lines: [K(`\\textcolor{${BC}}{\\vec{A}}\\ \\text{or}\\ \\mathbf{\\textcolor{${BC}}{A}} \\qquad |\\textcolor{${BC}}{\\vec{A}}| = \\textcolor{${BC}}{A} \\ge 0 \\qquad \\ell = \\textcolor{${BC}}{A} \\div \\text{scale}`),
    'Arrow <b>length</b> = size &nbsp;·&nbsp; <b>head</b> = direction &nbsp;·&nbsp; tail = start', '<b>−A</b>: same size, opposite direction', '<b>Slide</b> it: same vector &nbsp;·&nbsp; <b>turn</b> it: a new vector'] });
const YQ = ['Why is "2 km from the gate" not enough to find the library?', 'Scale 1 cm = 10 N: how long is the arrow for 35 N?', 'Are A and −A equal vectors, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 34', topic: 'Two ropes, one box: how do arrows join? Vector Addition and Subtraction', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tTurn - 0.1, 1.12, 500, 560], [tStr + 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tR1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('R1');
    M.vis($('#hk'), t, tMorph + 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.3, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.4, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'library') - 0.1, 1e9, POP);
    M.vis($('#hm'), t, T0('H3') - 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#exH'), t, T0('H3') + 0.3, 1e9, { dy: 8 });
    const u = M.clamp((t - tRide0) / (tRide1 - tRide0)), bx = HG[0] + 2 * HK * u;
    M.drawU(hRide, u); attr(hBike, 'cx', bx.toFixed(1)); M.vis(hBike, t, T0('H3') + 0.2, 1e9, { ...POP, sc: 0.4 });
    hGh.forEach((g, k) => { const ug = M.clamp((t - 0.1 * (k + 1) - tRide0) / (tRide1 - tRide0)); attr(g, 'cx', (HG[0] + 2 * HK * ug).toFixed(1)); attr(g, 'cy', HG[1]); M.hide(g, Math.abs(ug - u) < 0.01); });
    M.vis($('#hm0'), t, tRide1 - 0.2, 1e9, POP); M.vis(hQ, t, wt('H4', 'No') - 0.05, 1e9, { ...POP, sc: 0.4 });
    M.vis(hLib, t, wt('H5', 'wrong') - 0.1, 1e9, { dy: -16 }); M.vis($('#hm1'), t, wt('H5', 'direction') - 0.1, 1e9, POP);
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tB1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#an'), t, tR1 + 0.05, OUT('B1'), { dy: 36, ...o });
    const g = M.io((t - wt('R1', 'arrow') + 0.2) / 0.7); anA.set(AX0, AY, AX0 + (AX1 - AX0) * g, AY);
    M.vis(anSym, t, wt('R1', 'arrow') + 0.4, 1e9, { dy: 8 }); M.vis(anTail, t, wt('R1', 'arrow') - 0.2, 1e9, { ...POP, sc: 0.3 });
    M.draw(anBr, t, wt('R2', 'length') - 0.1, 0.6); M.vis(anBrT, t, wt('R2', 'size') - 0.2, 1e9, { dy: 10 });
    M.draw(anRing, t, wt('R3', 'arrowhead') - 0.1, 0.6); M.vis(anDir, t, wt('R3', 'direction') - 0.2, 1e9, { dy: 10 });
    M.vis(anTl, t, wt('R4', 'tail') - 0.1, 1e9, POP); M.vis(anTlS, t, wt('R4', 'tail') + 0.2, 1e9, { dy: 8 });
    M.vis(anHd, t, wt('R4', 'end', 1) - 0.4, 1e9, POP); M.vis(anHdS, t, wt('R4', 'head') - 0.1, 1e9, { dy: 8 });
  }

  /* B: the arrow bench */
  const bOn = t >= tB1 - 0.1 && t < tL1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('L1');
    M.vis($('#sim'), t, tB1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ro'), t, tB1 + 0.25, out, { dx: 60, dy: 0, ...o });
    M.vis($('#gr'), t, tB1 + 0.4, out, { dy: 36, ...o });
    M.vis($('#scl'), t, wt('B2', 'scale') - 0.1, 1e9, POP);
    M.vis($('#slo'), t, tTurn - 0.2, tTurnE + 0.3, { ...POP, outDur: 0.25, osc: 0.8, ody: 0 });
    const m = magF(t), a = angF(t), L = m * PX;
    polar(bA, O[0], O[1], a, L);
    bGh.forEach((g, k) => { const tg = t - 0.25 * (k + 1), ag = angF(tg), mg = magF(tg), mv = Math.abs(ag - a) > 0.5 || Math.abs(mg - m) > 0.03; polar(g, O[0], O[1], ag, mg * PX); M.hide(g.g, !mv || mg < 0.05); });
    attr(bLab, 'x', (O[0] + L / 2 * Math.cos(a * deg) - 30 * Math.sin(a * deg) - 10).toFixed(1)); attr(bLab, 'y', (O[1] - L / 2 * Math.sin(a * deg) - 22 * Math.cos(a * deg) - 6).toFixed(1)); bLab.style.opacity = M.clamp((m - 0.6) / 0.4);
    attr(bArc, 'd', a > 0.5 ? arcD(O[0], O[1], 80, 0, a) : ''); attr(bTh, 'x', O[0] + 92); attr(bTh, 'y', O[1] - 14); bTh.style.opacity = M.clamp((a - 6) / 6);
    M.setT($('#rA'), m.toFixed(1)); M.setT($('#rL'), m.toFixed(1)); M.setT($('#rT'), a.toFixed(0));
    const mx = Math.max(m, t > tStr ? magF(t) : m);
    gL(u => [u, u], 0, mx); gDt(m, m, t > tGrow - 0.1);
    M.vis(gTag, t, wt('B7', 'scale') - 0.2, 1e9, POP);
    avB(t, wt('B6', 'same') + 0.3, out);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('D1');
    M.vis($('#lc'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const gr = M.io((t - wt('L2', 'Two') + 0.1) / 0.5); lR.set(LG[0], LG[1], LG[0] + LR * 0.707 * gr, LG[1] + LR * 0.707 * gr); lRt.style.opacity = gr;
    M.draw(lCirc, t, wt('L3', 'circle') - 0.3, 0.9);
    const pick = M.io((t - wt('L4', 'angle') + 0.05) / 0.35);
    lDots.forEach((d, i) => { M.vis(d, t, wt('L3', 'point') + i * 0.06, 1e9, { ...POP, sc: 0.3 }); const lib = LD[i] === 30; attr(d, 'fill', lib ? mix(C.dim, BC, pick) : mix(C.dim, '#E4E6EC', pick)); attr(d, 'r', lib ? (11 + 5 * pick).toFixed(1) : 11); });
    const ga = M.io((t - wt('L4', 'angle') + 0.1) / 0.5); polar(lA, LG[0], LG[1], 30, LR * ga);
    M.draw(lArc, t, wt('L4', 'angle'), 0.4); M.vis(lTh, t, wt('L4', 'angle') + 0.2, 1e9, { dy: 6 }); M.vis(lLib, t, wt('L4', 'library') - 0.1, 1e9, POP);
    M.vis($('#lr'), t, tL1 + 0.25, out, { dx: 60, dy: 0, ...o });
    LK.forEach((k, i) => { const el = $('#lk' + i); M.vis(el.querySelector('.n'), t, k[3] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, k[3] - 0.1, 0.6); });
    M.vis($('#lkP'), t, wt('L4', 'That') - 0.1, 1e9, POP);
    avL(t, T1('L4') - 0.2, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); M.vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); M.vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 196], [tStep[2] - 0.1, 308], [tStep[3] - 0.1, 420]], M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    NOTS.forEach((n, i) => { M.vis($('#nb' + i), t, n[3] - 0.1, 1e9, POP); M.vis($('#nl' + i), t, n[3] + 0.1, 1e9, { dy: 8 }); });
    const t4 = wt('D5', 'two') - 0.2;
    M.vis(dRef, t, t4 - 0.3, 1e9, { dy: 0, fade: 0.3 });
    const gl = M.io((t - wt('D5', 'magnitude') + 0.1) / 0.6); polar(dA, DO[0], DO[1], 30, DL * gl); M.vis(dAl, t, wt('D5', 'magnitude') + 0.3, 1e9, { dy: 8 });
    M.draw(dArc, t, wt('D5', 'angle') - 0.1, 0.5); M.vis(dTh, t, wt('D5', 'theta') - 0.1, 1e9, { dy: 6 });
  }

  /* statement */
  const stOn = t >= tT && t < tK1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tK1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'length') - 0.15, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'length') + 0.3, 0.8);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tM1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K3');
    M.vis($('#ka'), t, tK1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ga = M.io((t - wt('K1', 'vector') + 0.1) / 0.6); kA.set(KX0, KY, KX0 + KL * ga, KY); M.vis(kAl, t, wt('K1', 'vector') + 0.3, 1e9, { dy: 8 });
    M.vis($('#kaC'), t, wt('K1', 'east') - 0.1, 1e9, POP);
    M.vis($('#kn'), t, T0('K2') - 0.1, out, { dx: 60, dy: 0, ...o });
    const f = flipF(t), mid = KX0 + KL / 2, half = KL / 2, c = Math.cos(f * deg), sn = Math.sin(f * deg);
    const setF = (a, ff) => { const cc = Math.cos(ff * deg), ss = Math.sin(ff * deg); a.set(mid - half * cc, KY + half * ss * 0.35, mid + half * cc, KY - half * ss * 0.35); };
    setF(kN, f); kNg.forEach((g, k) => { const fg = flipF(t - 0.08 * (k + 1)); setF(g, fg); M.hide(g.g, Math.abs(fg - f) < 1); });
    M.hide(kN.g, t < T0('K2') + 0.1); M.vis(kGhost, t, T0('K2') + 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis(kNl, t, wt('K2', 'minus') - 0.1, 1e9, { dy: 8 }); M.vis($('#knC'), t, wt('K2', 'West') - 0.1, 1e9, POP);
    M.vis($('#th1'), t, tK3 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tK3, tOpts: wt('K3', 'equal') - 0.1, tCount: T1('K3') + 0.05, dur: 3, tAns: T0('K4') - 0.02, tWhy: wt('K4', 'Equal') });
  }

  /* M */
  const mOn = t >= tM1 - 0.1 && t < tW1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const out = OUT('Z1');
    M.vis($('#ms'), t, tM1 + 0.05, out, { dx: -60, dy: 0, ...o });
    const u = slF(t), ox = MOff[0] * u, oy = MOff[1] * u;
    mA.set(MO[0] + ox, MO[1] + oy, MO[0] + MV[0] + ox, MO[1] + MV[1] + oy); M.vis(mOrig, t, tSl, 1e9, { dy: 0, fade: 0.3 });
    mGh.forEach((g, k) => { const ug = slF(t - 0.12 * (k + 1)); g.set(MO[0] + MOff[0] * ug, MO[1] + MOff[1] * ug, MO[0] + MV[0] + MOff[0] * ug, MO[1] + MV[1] + MOff[1] * ug); M.hide(g.g, Math.abs(ug - u) < 0.01); });
    M.vis(mLab, t, wt('M2', 'same') - 0.1, 1e9, POP); M.vis($('#msP'), t, wt('M2', 'still') - 0.1, 1e9, POP);
    M.vis($('#mt'), t, T0('M3') - 0.1, out, { dx: 60, dy: 0, ...o });
    const a = tuF(t); polar(tA, TO[0], TO[1], a, TLn);
    tGh.forEach((g, k) => { const ag = tuF(t - 0.1 * (k + 1)); polar(g, TO[0], TO[1], ag, TLn); M.hide(g.g, Math.abs(ag - a) < 0.3); });
    M.draw(tArc, t, tTu + 0.4, 0.6); M.vis(tArcT, t, tTu + 0.8, 1e9, { dy: 6 });
    M.vis(tLab, t, wt('M3', 'new') - 0.1, 1e9, POP); M.vis($('#mtP'), t, wt('M3', 'vector') - 0.1, 1e9, POP);
    M.vis($('#th2'), t, tZ1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tZ1, tOpts: wt('Z1', 'five') - 0.1, tCount: T1('Z1') + 0.05, dur: 3, tAns: T0('Z2') - 0.02, tWhy: wt('Z2', 'Six') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis(wRul, t, tLine - 0.4, 1e9, { dy: 16 });
    const L = wLenF(t), a = wAng(t), headOn = t >= wt('W6', 'arrowhead') - 0.15;
    const ex = WO[0] + L * Math.cos(a * deg), ey = WO[1] - L * Math.sin(a * deg);
    attr(wLine, 'x2', ex.toFixed(1)); attr(wLine, 'y2', ey.toFixed(1)); M.hide(wLine, L < 2 || headOn);
    wGh.forEach((g, k) => { const ag = wAng(t - 0.1 * (k + 1)); attr(g, 'x2', (WO[0] + L * Math.cos(ag * deg)).toFixed(1)); attr(g, 'y2', (WO[1] - L * Math.sin(ag * deg)).toFixed(1)); M.hide(g, Math.abs(ag - a) < 0.5 || headOn); });
    if (headOn) wA.set(WO[0], WO[1], ex, ey); else wA.set(0, 0, 0, 0);
    M.vis(wLen, t, tLine + 0.6, wt('W5', 'Turn'), { dy: 6 });
    M.vis(wPro, t, wt('W5', 'protractor') - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.SOFT, fade: 0.2 });
    M.draw(wArc, t, tRot + 0.9, 0.4); M.vis(wTh, t, tRot + 1.1, 1e9, { dy: 6 });
    M.vis(wFl, t, wt('W6', 'twenty') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'Wrong') - 0.05, tRight: wt('X3', 'Minus') - 0.1 });
    const ga = M.io((t - wt('X3', 'same') + 0.1) / 0.5), gn = M.io((t - wt('X3', 'Only') + 0.1) / 0.5);
    rA.set(RX0, RY[0], RX0 + RL * ga * (ga > 0.04 ? 1 : 0), RY[0]); rAl.style.opacity = ga;
    rN.set(RX0 + RL, RY[1], RX0 + RL - RL * gn * (gn > 0.04 ? 1 : 0), RY[1]); rNl.style.opacity = gn;
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'quick') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
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

/* ---------- sound ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
