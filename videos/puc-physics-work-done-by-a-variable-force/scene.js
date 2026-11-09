// PUC Physics Ep 74: Work done by a variable force (Motion notebook, Aarav stretches a rubber band: strips under the F-x graph)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const WC = C.teal, FC = C.orange, XC = C.violet, TH = C.gold;      // W teal, F orange, stretch / displacement x violet
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const W_ = tc(WC, 'W'), F_ = tc(FC, 'F'), x_ = tc(XC, 'x'), dx = `\\Delta ${x_}`;
const MINUS = '−';
const WFILL = M.mix(WC, '#FFFFFF', 0.75), WFILL2 = M.mix(WC, '#FFFFFF', 0.55);
const area = (g, fn, a, b, n = 60) => { let d = `M${g.X(a).toFixed(1)},${g.Y(0).toFixed(1)}`; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += ` L${g.X(x).toFixed(1)},${g.Y(fn(x)).toFixed(1)}`; } return d + ` L${g.X(b).toFixed(1)},${g.Y(0).toFixed(1)} Z`; };
const strips = (svg, g, N = 40, col = WC) => { const rs = []; for (let i = 0; i < N; i++) rs.push(mk(svg, 'rect', { fill: M.mix(col, '#FFFFFF', 0.7), stroke: col, 'stroke-width': 1.5 })); return (fn, a, b, n, upto = 1e9, on = 1) => rs.forEach((r, i) => { if (i >= n || on <= 0) { M.hide(r, true); return; } const w = (b - a) / n, x0 = a + i * w, f = fn(x0); if (x0 > upto + 1e-9) { M.hide(r, true); return; } M.hide(r, false);
  attr(r, 'x', g.X(x0).toFixed(1)); attr(r, 'width', Math.max(0.5, g.X(x0 + w) - g.X(x0) - (n > 20 ? 0 : 1)).toFixed(1)); attr(r, 'y', Math.min(g.Y(f), g.Y(0)).toFixed(1)); attr(r, 'height', Math.abs(g.Y(f) - g.Y(0)).toFixed(1)); r.style.opacity = on; r.setAttribute('stroke-width', n > 20 ? 0.6 : 1.5); }); };

Object.assign(M.IC, {
  band: ['M3 12c0-3 4-4 9-4s9 1 9 4-4 4-9 4-9-1-9-4z'],
  spring: ['M3 12h2l1.5-4 3 8 3-8 3 8 3-8L20 12h1'],
  bow: ['M7 3c6 4 6 14 0 18', 'M7 3v18', 'M7 12h12', 'm16 9 3 3-3 3'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tS6 = T0('S6'), tS8 = T0('S8'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1');
const tR1 = T0('R1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title + hook ---------- */
const JOBS = [['band', 'Rubber band', 'STRETCHED', 'rubber'], ['spring', 'Spring', 'PULLED OPEN', 'spring'], ['bow', 'Bow string', 'DRAWN BACK', 'bow']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><svg id="js${i}" width="300" height="120"></svg></div>`).join('');
const JR = [0, 1, 2].map(i => { const s = $('#js' + i); mk(s, 'rect', { x: 20, y: 30, width: 10, height: 60, rx: 3, fill: C.ink2 });
  const band = mk(s, 'path', { fill: 'none', stroke: i === 0 ? '#C46A3B' : C.ink, 'stroke-width': i === 1 ? 2.5 : 3 }), knob = mk(s, 'circle', { r: 9, fill: '#E7B48A', stroke: C.ink, 'stroke-width': 2 });
  return { band, knob, f: PUC.arrow(s, FC, 5, 14), i }; });
const TILES = [['F = 0 N?'], ['F = 20 N?'], ['It keeps changing']];
$('#wqs').innerHTML = TILES.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon(i < 2 ? 'help' : 'zap', 24, i < 2 ? FC : C.ink, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'Zero'), wt('H4', 'Twenty'), wt('H4', 'changing')];
const hs = $('#hkS');
mk(hs, 'rect', { x: 40, y: 120, width: 14, height: 90, rx: 4, fill: C.ink2 });
const hBand = mk(hs, 'path', { fill: 'none', stroke: '#C46A3B', 'stroke-width': 4 }), hHand = mk(hs, 'circle', { r: 14, fill: '#E7B48A', stroke: C.ink, 'stroke-width': 2 });
const hF = PUC.arrow(hs, FC, 6, 18), hFl = txt(hs, 0, 0, '', { fill: FC, 'font-weight': 600, 'font-size': 24, 'text-anchor': 'middle' });
const hX = PUC.arrow(hs, XC, 5, 16), hXl = txt(hs, 0, 0, '10 cm', { fill: XC, 'font-weight': 600, 'font-size': 20, 'text-anchor': 'middle' });

/* ---------- P: steady force = rectangle, changing force = area ---------- */
const pG = PUC.graph($('#plS'), { x: 120, y: 110, w: 560, h: 300, xmax: 10, ymax: 25, xt: [0, 5, 10], yt: [0, 20], xl: '', yl: '' });
txt($('#plS'), 690, pG.Y(0) + 6, 'd', { fill: XC, 'font-weight': 600, 'font-size': 22 }); txt($('#plS'), 72, 96, 'F (N)', { fill: FC, 'font-weight': 600 });
const pRect = mk($('#plS'), 'path', { d: area(pG, () => 20, 0, 10), fill: WFILL, stroke: WC, 'stroke-width': 2 }); $('#plS').insertBefore(pRect, $('#plS').firstChild);
const pLine = pG.curve(FC, 5);
const pLbl = txt($('#plS'), pG.X(5), pG.Y(10) + 8, 'W = F × d', { 'text-anchor': 'middle', fill: WC, 'font-weight': 600, 'font-size': 30 });
const pPill = txt($('#plS'), pG.X(5), 480, 'area of the rectangle = work', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
const rG = PUC.graph($('#prS'), { x: 120, y: 110, w: 560, h: 300, xmax: 10, ymax: 25, xt: [0, 5, 10], yt: [0, 20], xl: '', yl: '' });
txt($('#prS'), 690, rG.Y(0) + 6, 'x', { fill: XC, 'font-weight': 600, 'font-size': 22 }); txt($('#prS'), 72, 96, 'F (N)', { fill: FC, 'font-weight': 600 });
const fP = x => 4 + 16 * (1 - Math.cos(Math.PI * x / 10)) / 2 + 2 * Math.sin(Math.PI * x / 5);
const rArea = mk($('#prS'), 'path', { d: area(rG, fP, 0, 10), fill: WFILL, stroke: WC, 'stroke-width': 2 }); $('#prS').insertBefore(rArea, $('#prS').firstChild);
const rLine = rG.curve(FC, 5);
const rLbl = txt($('#prS'), rG.X(5), rG.Y(5), 'W = area', { 'text-anchor': 'middle', fill: WC, 'font-weight': 600, 'font-size': 30 });

/* ---------- S: the rubber band sim ---------- */
const s = $('#simS'), PEG = 110, H0 = 160, PXC = 50, BY = 230, KN = 200;          // 50 px per cm; k = 200 N/m
mk(s, 'rect', { x: PEG - 22, y: BY - 70, width: 20, height: 140, rx: 4, fill: C.ink2 });
const sBand = mk(s, 'path', { fill: 'none', stroke: '#C46A3B', 'stroke-width': 5, 'stroke-linejoin': 'round' });
const ghosts = [0, 1, 2].map(() => { const g0 = mk(s, 'g', {}); return mk(g0, 'circle', { r: 18, fill: C.ink, opacity: 0 }); });
const hand = mk(s, 'circle', { r: 18, fill: '#E7B48A', stroke: C.ink, 'stroke-width': 2.5 });
for (let c = 0; c <= 10; c++) { const x = H0 + c * PXC; mk(s, 'line', { x1: x, y1: BY + 60, x2: x, y2: BY + 60 + (c % 5 ? 12 : 22), stroke: C.ink, 'stroke-width': 2 }); if (c % 5 === 0 || c === 10) txt(s, x, BY + 104, c + ' cm', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
mk(s, 'line', { x1: H0, y1: BY + 60, x2: H0 + 10 * PXC, y2: BY + 60, stroke: C.ink, 'stroke-width': 2 });
const sF = PUC.arrow(s, FC, 7, 20), sFl = it(s, 0, 0, 'F', FC, { 'font-size': 28 }), sX = PUC.arrow(s, XC, 5, 16), sXl = it(s, 0, 0, 'x', XC, { 'font-size': 26 });
const sDx = mk(s, 'path', { stroke: TH, 'stroke-width': 3, fill: 'none' }), sDxl = txt(s, 0, 0, 'Δx', { fill: TH, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'middle' });
const xKeys = [[T0('S2') + 1.4, 0], [wt('S2', 'five'), 5], [wt('S2', 'ten', 1), 10]];
const xLin = t => { if (t <= xKeys[0][0]) return 0; for (let i = 1; i < xKeys.length; i++) if (t < xKeys[i][0]) return xKeys[i - 1][1] + (xKeys[i][1] - xKeys[i - 1][1]) * (t - xKeys[i - 1][0]) / (xKeys[i][0] - xKeys[i - 1][0]); return 10; };
const tRep = tS6 + 0.05, tRes = wt('S7', 'F') - 0.1;
const xS = t => t < tRep ? xLin(t) : 6 + 0.25 * M.clamp(t - tRes, 0, 4);                    // replay: freeze at 6 cm, resume at 0.25x (1 cm in 4 s)
$('#roG').innerHTML = `<span class="k" style="color:${XC}">x</span><span class="v" id="r_x" style="color:${XC}">0.0</span><span class="u">cm</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_f" style="color:${FC}">0.0</span><span class="u">N</span>
  <span class="k" style="font-style:normal;font-size:22px;color:var(--mute)">strips</span><span class="v" id="r_n">-</span><span class="u"></span>
  <span class="k" style="color:${WC}">W</span><span class="v" id="r_w" style="color:${WC}">-</span><span class="u">J</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 74, w: 540, h: 150, xmax: 10, ymax: 20, xt: [0, 5, 10], yt: [0, 10, 20], xl: '', yl: '' });
txt($('#grS'), 664, g.Y(0) + 6, 'x (cm)', { fill: XC, 'font-weight': 600 });
const gTri = mk($('#grS'), 'path', { d: area(g, x => 2 * x, 0, 10), fill: WFILL2, stroke: 'none', opacity: 0 });
const gS = strips($('#grS'), g, 40);
const gOne = mk($('#grS'), 'rect', { x: g.X(6), y: g.Y(12), width: g.X(7) - g.X(6), height: g.Y(0) - g.Y(12), fill: M.mix(TH, '#FFFFFF', 0.6), stroke: TH, 'stroke-width': 2.5 });
const gLine = g.curve(FC, 5), gDot = g.dot(FC, 10);
const tN4 = wt('S3', 'strips'), tN10 = wt('S4', 'Ten'), tN40 = wt('S4', 'Forty'), tEx = wt('S5', 'exactly');
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Thinner strips, better answer!' });

/* ---------- D ---------- */
const STEPS = [[`\\Delta ${W_} = ${F_}(${x_})\\,${dx}`, 'one thin strip: force times a tiny step'],
  [`${W_} \\approx \\sum ${F_}\\,${dx}`, 'add all the strips'],
  [`${W_} = \\int_{${x_}_1}^{${x_}_2} ${F_}\\,d${x_}`, 'thinner and thinner: the sum becomes exact'],
  [`${W_} = \\text{area under the } ${F_}\\text{-}${x_} \\text{ graph}`, 'newtons × metres = joules']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:104px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 118}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:36px;top:${i === 2 ? -14 : -4}px">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tStep = [wt('D2', 'Delta'), wt('D3', 'Add'), wt('D4', 'Make'), wt('D5', 'area')];
const dS = $('#drS'), dG = PUC.graph(dS, { x: 110, y: 110, w: 580, h: 320, xmax: 10, ymax: 25, xt: [], yt: [], xl: '', yl: '' });
txt(dS, 700, dG.Y(0) + 6, 'x', { fill: XC, 'font-weight': 600, 'font-size': 22 }); txt(dS, 80, 100, 'F', { fill: FC, 'font-weight': 600, 'font-size': 22 });
const dArea = mk(dS, 'path', { d: area(dG, fP, 1, 9), fill: WFILL2, stroke: WC, 'stroke-width': 2, opacity: 0 });
const dSt = strips(dS, dG, 40);
const dOne = mk(dS, 'rect', { x: dG.X(4), y: dG.Y(fP(4)), width: dG.X(5) - dG.X(4), height: dG.Y(0) - dG.Y(fP(4)), fill: M.mix(TH, '#FFFFFF', 0.6), stroke: TH, 'stroke-width': 2.5 });
const dOneL = txt(dS, dG.X(4.5), dG.Y(fP(4)) - 14, 'F Δx', { 'text-anchor': 'middle', fill: TH, 'font-weight': 600, 'font-size': 22 });
const dLine = dG.curve(FC, 5); dLine(x => [x, fP(x)], 0, 10, 80);
const dFl = it(dS, dG.X(9.3), dG.Y(fP(9.3)) - 16, 'F(x)', FC, { 'font-size': 26 });
txt(dS, dG.X(1), dG.Y(0) + 30, 'x₁', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 22 }); txt(dS, dG.X(9), dG.Y(0) + 30, 'x₂', { 'text-anchor': 'middle', fill: XC, 'font-weight': 600, 'font-size': 22 });
const dAl = txt(dS, dG.X(5), dG.Y(5), 'W = area', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 30 });
const dCnt = txt(dS, 392, 500, '', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 24 });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${W_} = \\int ${F_}\\,d${x_} = \\text{area under the } ${F_}\\text{-}${x_} \\text{ graph}`);

/* ---------- C: two pulls ---------- */
const fA = x => 20 * (1 - (1 - x / 10) ** 2), fB = x => 20 * (x / 10) ** 2;
const CG = [[$('#c0S'), fA], [$('#c1S'), fB]].map(([sv, fn]) => { const cg = PUC.graph(sv, { x: 80, y: 40, w: 560, h: 240, xmax: 10, ymax: 20, xt: [0, 10], yt: [0, 20], xl: '', yl: '' });
  txt(sv, 652, cg.Y(0) + 6, 'x (cm)', { fill: XC, 'font-weight': 600, 'font-size': 16 }); txt(sv, 22, 34, 'F (N)', { fill: FC, 'font-weight': 600, 'font-size': 16 });
  const ar = mk(sv, 'path', { d: area(cg, fn, 0, 10), fill: WFILL, stroke: 'none' }); sv.insertBefore(ar, sv.firstChild);
  return { cg, fn, ar, ln: cg.curve(FC, 5) }; });
$('#c0a').innerHTML = K(`${W_}_A = \\text{area} \\approx 1.33\\,\\text{J}`);
$('#c1a').innerHTML = K(`${W_}_B = \\text{area} \\approx 0.67\\,\\text{J}`);
const th1 = PUC.think($('#th1'), { q: 'Both pulls go from 0 to 20 N over 10 cm. Which one does more work?', opts: ['Pull A', 'Pull B'], right: 0, why: 'Pull A has more area under its curve, so more work.' });

/* ---------- R: negative area ---------- */
const lS = $('#rlS'), lG = PUC.graph(lS, { x: 110, y: 90, w: 580, h: 330, xmax: 3, ymin: -4, ymax: 7, xt: [0, 1, 2, 3], yt: [-3, 0, 6], xl: '', yl: '' });
txt(lS, 700, lG.Y(0) + 6, 'x (m)', { fill: XC, 'font-weight': 600 }); txt(lS, 60, 80, 'F (N)', { fill: FC, 'font-weight': 600 });
const fR = x => 6 - 3 * x;
const lUp = mk(lS, 'path', { d: area(lG, fR, 0, 2), fill: C.okBg, stroke: C.ok, 'stroke-width': 2 }), lDn = mk(lS, 'path', { d: area(lG, fR, 2, 3), fill: C.redBg, stroke: C.red, 'stroke-width': 2 });
const lSt = strips(lS, lG, 12, C.ink);
const lLine = lG.curve(FC, 5);
const lUpl = txt(lS, lG.X(0.7), lG.Y(1.6), '+6 J', { 'text-anchor': 'middle', fill: '#1F6B3F', 'font-weight': 600, 'font-size': 30 }), lDnl = txt(lS, lG.X(2.62), lG.Y(-1.9), MINUS + '1.5 J', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 600, 'font-size': 24 });
const lTot = txt(lS, 392, 510, 'W = 6 ' + MINUS + ' 1.5 = 4.5 J', { 'text-anchor': 'middle', fill: WC, 'font-weight': 600, 'font-size': 30 });
const LKS = ['A backward force is a negative F', 'Its strips hang below the x axis', `${K(`(-${F_}) \\times (+${dx}) < 0`)}: negative work`, 'Total work = area above − area below'];
$('#lks').innerHTML = LKS.map((l, i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="lt">${l}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];

/* ---------- W ---------- */
$('#wq').innerHTML = `A force grows from 0 to 10 N over the first 2 m, stays at 10 N up to 5 m, then falls to 0 at 6 m. Find the work.`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\tfrac{1}{2} \\times 2 \\times 10 = 10\\,\\text{J}`)], [K(`3 \\times 10 = 30\\,\\text{J}`)], [K(`\\tfrac{1}{2} \\times 1 \\times 10 = 5\\,\\text{J}`)], [K(`${W_} = 10 + 30 + 5 = 45\\,\\text{J}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 90 });
const tW = [wt('W3', 'first'), wt('W4', 'rectangle'), wt('W5', 'last'), wt('W6', 'Total')];
const wS = $('#wrS'), wG = PUC.graph(wS, { x: 110, y: 100, w: 580, h: 300, xmax: 6, ymax: 12, xt: [0, 1, 2, 3, 4, 5, 6], yt: [0, 10], xl: '', yl: '' });
txt(wS, 700, wG.Y(0) + 6, 'x (m)', { fill: XC, 'font-weight': 600 }); txt(wS, 60, 88, 'F (N)', { fill: FC, 'font-weight': 600 });
const fW = x => x < 2 ? 5 * x : x < 5 ? 10 : 10 * (6 - x);
const WR = [[0, 2, '10 J', 1.3, 3.5], [2, 5, '30 J', 3.5, 5], [5, 6, '5 J', 5.35, 3.5]].map(([a, b, l, lx, ly], i) => ({ p: mk(wS, 'path', { d: area(wG, fW, a, b), fill: M.mix(WC, '#FFFFFF', [0.8, 0.65, 0.8][i]), stroke: WC, 'stroke-width': 2 }), t: txt(wS, wG.X(lx), wG.Y(ly), l, { 'text-anchor': 'middle', fill: WC, 'font-weight': 600, 'font-size': 26 }) }));
const wLine = wG.curve(FC, 5);
$('#wc2').innerHTML = 'W = total area = 45 J';

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`${F_} = 3${x_}^2:\\; ${W_} = \\tfrac{0 + 12}{2} \\times 2 = 12\\,\\text{J}`)}`, right: `${K(`${W_} = \\int_0^2 3${x_}^2\\,d${x_} = \\big[${x_}^3\\big]_0^2 = 8\\,\\text{J}`)}` });
const tg = $('#tg'), tG = PUC.graph(tg, { x: 60, y: 30, w: 300, h: 190, xmax: 2, ymax: 12, xt: [0, 2], yt: [0, 12], xl: '', yl: '' });
const tAvg = mk(tg, 'path', { d: `M${tG.X(0)},${tG.Y(0)} L${tG.X(2)},${tG.Y(12)} L${tG.X(2)},${tG.Y(0)} Z`, fill: C.redBg, stroke: C.red, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
const tAr = mk(tg, 'path', { d: area(tG, x => 3 * x * x, 0, 2), fill: WFILL, stroke: WC, 'stroke-width': 2 });
const tLn = tG.curve(FC, 4);
const tL1 = txt(tg, tG.X(1) - 30, tG.Y(7), '12 J?', { fill: C.red, 'font-weight': 600, 'font-size': 20 }), tL2 = txt(tg, tG.X(1.62), tG.Y(2.5), '8 J', { fill: WC, 'font-weight': 600, 'font-size': 22, 'text-anchor': 'middle' });
const where = PUC.where($('#wa'), { on: [], type: 'Work as the area under F-x graphs, and integrating a given force F(x)' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 780, optY: 300,
  q: `A force ${K(`${F_} = (5 - 2${x_})\\,\\text{N}`)} acts on a body moving along x from ${K('x = 0')} to ${K('x = 4\\,\\text{m}')}. Work done by the force?`,
  opts: ['4 J', '8.5 J', '20 J', MINUS + '12 J'], right: 0 });
const so = PUC.solution($('#so'), [[K(`${W_} = \\int_0^4 (5 - 2${x_})\\,d${x_}`)], [K(`= \\big[5${x_} - ${x_}^2\\big]_0^4`)], [K(`= 20 - 16 = 4\\,\\text{J}`)], [K(`6.25 - 2.25 = 4\\,\\text{J}`)]], { y0: 100, dy: 112 });
const tSo = [wt('A2', 'integral'), wt('A2', 'That'), wt('A3', 'At'), wt('A4', 'On')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 450, title: 'Recap · work done by a variable force', y0: 100, dy: 92, txt: [0, 1, 1, 1],
  lines: [K(`${W_} = \\int_{${x_}_1}^{${x_}_2} ${F_}\\,d${x_}`), 'Work = <b>area under the F-x graph</b>', 'Area below the x axis counts as <b style="color:var(--red)">negative</b> work', 'Steady force: the area is a rectangle, F × d'] });
const YQ = ['Why can you not just use W = F d for a stretched band?', 'What does the area under a force and distance graph tell you?', 'What does area below the distance axis mean?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 75', topic: 'Why does a fast ball sting? Kinetic Energy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tS6 - 0.1, 1.06, 960, 540], [tS8 - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1;
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px';
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
}
const bandD = (px, y, hx, sp = 10) => `M${px},${y - sp} L${hx.toFixed(1)},${y - 3} L${hx.toFixed(1)},${y + 3} L${px},${y + sp}`;

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  vis($('#bpill'), t, tMorph + 0.6, tQ - 0.05, { dy: 0, dx: 24, outDur: 0.01 });
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    vis($('#hj'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    JR.forEach((r, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const u = 0.5 - 0.5 * Math.cos(Math.max(0, t - tMorph - 0.6 - i * 0.4) * 1.6), hx = 60 + 190 * u;
      if (i === 1) { let d = 'M30,60'; const n = 10; for (let k = 1; k <= n; k++) d += ` L${(30 + (hx - 30) * (k - 0.5) / n).toFixed(1)},${k % 2 ? 46 : 74} `; d += ` L${hx.toFixed(1)},60`; attr(r.band, 'd', d); }
      else attr(r.band, 'd', i === 0 ? bandD(30, 60, hx, 14) : `M30,30 Q${(30 + (hx - 30) * 0.9).toFixed(1)},60 30,90`);
      attr(r.knob, 'cx', hx.toFixed(1)); attr(r.knob, 'cy', 60); r.f.set(hx - 12, 26, hx - 12 - 70 * u, 26); });
    vis($('#hjP'), t, wt('H2', 'harder') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    vis($('#hkSk'), t, tH3 + 0.2, 1e9, { dy: 20 });
    const u = M.io((t - wt('H3', 'stretches')) / 1.8), hx = 90 + 240 * u;
    attr(hBand, 'd', bandD(54, 165, hx, 18)); attr(hHand, 'cx', hx.toFixed(1)); attr(hHand, 'cy', 165);
    hF.set(hx - 16, 120, hx - 16 - 110 * u, 120); attr(hFl, 'x', (hx - 70 * u).toFixed(1)); attr(hFl, 'y', 104); M.setT(hFl, `${(20 * u).toFixed(0)} N`); hFl.style.opacity = u > 0.05 ? 1 : 0;
    hX.set(90, 230, hx, 230); attr(hXl, 'x', ((90 + hx) / 2).toFixed(1)); attr(hXl, 'y', 262); hXl.style.opacity = u > 0.9 ? 1 : 0; hX.g.style.opacity = u.toFixed(3);
    TILES.forEach((_, i) => { const el = $('#wq' + i); vis(el, t, tTile[i] - 0.1, 1e9, POP); const on = M.io((t - tTile[i]) / 0.25) * (1 - M.io((t - (i < 2 ? tTile[i + 1] : T0('P1'))) / 0.25)); el.style.background = mix(C.soft, C.ac2, on); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pl'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    const ul = M.io((t - wt('P3', 'flat') + 0.3) / 0.6); pLine(x => [x, 20], 0, 10 * ul);
    pRect.style.opacity = M.io((t - wt('P3', 'area') + 0.1) / 0.4).toFixed(3); vis(pLbl, t, wt('P3', 'rectangle') - 0.1, 1e9, POP); vis(pPill, t, wt('P3', 'rectangle') + 0.3, 1e9, { dy: 8 });
    vis($('#pr'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    const ur = M.io((t - wt('P4', 'changes') + 0.1) / 1.0); rLine(x => [x, fP(x)], 0, 10 * ur, 80);
    rArea.style.opacity = M.io((t - wt('P4', 'area') + 0.1) / 0.5).toFixed(3); vis(rLbl, t, wt('P4', 'area') + 0.2, 1e9, POP);
  }

  /* S: the band */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const xc = xS(t), xR = Math.round(xc * 10) / 10, hx = H0 + xc * PXC, Fv = KN * xR / 100;
    attr(sBand, 'd', bandD(PEG - 2, BY, hx, 16)); attr(hand, 'cx', hx.toFixed(1)); attr(hand, 'cy', BY);
    const moving = (t > xKeys[0][0] && t < xKeys[2][0]) || (t > tRes && t < tS8);
    ghosts.forEach((gh, k) => { const dt = (t > tRep ? 1.2 : 0.18) * (k + 1), gx = H0 + xS(t - dt) * PXC, okG = !(t > tRep && t - dt < tRes); attr(gh, 'cx', gx.toFixed(1)); attr(gh, 'cy', BY); gh.style.opacity = moving && okG && Math.abs(gx - hx) > 4 ? [0.3, 0.2, 0.12][k] : 0; });
    const fl = 6 * KN * xc / 100; sF.set(hx - 4, BY - 60, hx - 4 - fl, BY - 60); attr(sFl, 'x', (hx - 4 - fl / 2 - 8).toFixed(1)); attr(sFl, 'y', BY - 74); sFl.style.opacity = fl > 8 ? 1 : 0;
    sX.set(H0, BY + 40, hx, BY + 40); attr(sXl, 'x', ((H0 + hx) / 2 - 6).toFixed(1)); attr(sXl, 'y', BY + 32); sXl.style.opacity = xc > 0.6 ? 1 : 0;
    // slow-mo: one strip, a step of 1 cm from 6 cm
    const rep = t >= tRep && t < tS8;
    const uDx = rep ? M.io((t - wt('S7', 'delta') + 0.1) / 0.3) : 0;
    attr(sDx, 'd', `M${H0 + 6 * PXC},${BY + 20} v-8 H${H0 + 7 * PXC} v8`); sDx.style.opacity = uDx.toFixed(3); attr(sDxl, 'x', H0 + 6.5 * PXC); attr(sDxl, 'y', BY - 24 + 0); sDxl.style.opacity = uDx.toFixed(3);
    const stc = $('#stc'); vis(stc, t, wt('S7', 'F') - 0.1, tS8 - 0.2, POP); stc.innerHTML = `<span style="color:#F2A65A">F</span> Δx = 12 N × 0.01 m = <span style="color:#7ED3D3">0.12 J</span>`;
    vis($('#slo'), t, tRep, tS8 - 0.3, { ...POP, sc: 0.8 });
    // graph: the line grows with the stretch, strips appear 4 -> 10 -> 40, then the exact triangle
    const reach = t < tRep ? xLin(t) : 10;
    gLine(q => [q, 2 * q], 0, reach); gDot(xc, KN * xc / 100, t > xKeys[0][0] - 0.2);
    const n = t < tN4 ? 0 : t < tN10 ? 4 : t < tN40 ? 10 : 40, fill = M.clamp((t - (n === 4 ? tN4 : n === 10 ? tN10 : tN40) + 0.1) / 0.8);
    gS(q => 2 * q, 0, 10, rep ? 0 : n, 10 * fill, 1);
    gTri.style.opacity = ((rep ? 0.35 : 0.9) * M.io((t - tEx + 0.1) / 0.5)).toFixed(3);
    gOne.style.opacity = rep ? M.io((t - wt('S7', 'delta') + 0.1) / 0.3).toFixed(3) : 0;
    const wEst = n ? 1 - 1 / n : 0, wShow = t > tEx - 0.1 ? '1.000' : t >= tN4 && fill >= 1 ? wEst.toFixed(3) : '-';
    M.setT($('#r_x'), xR.toFixed(1)); M.setT($('#r_f'), Fv.toFixed(1)); M.setT($('#r_n'), t > tEx - 0.1 ? '∞' : n ? String(n) : '-'); M.setT($('#r_w'), rep ? '0.12' : wShow);
    const gp = $('#grP'), msg = t > tEx - 0.1 ? 'exact area = 1 J' : n ? `${n} strips ≈ ${wEst.toFixed(3)} J` : 'F = k x'; if (gp._m !== msg) { gp._m = msg; gp.textContent = msg; } vis(gp, t, wt('S2', 'evenly') - 0.1, 1e9, POP);
    avA(t, wt('S4', 'Forty') + 0.3, OUT('S6'));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 320], [tStep[3] - 0.1, 438]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hiY - 4).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    const one = t > tStep[0] - 0.2 && t < tStep[1]; dOne.style.opacity = one ? 1 : 0; dOneL.style.opacity = one ? 1 : 0;
    const n = t < tStep[1] ? 0 : t < wt('D4', 'thinner') ? 8 : t < wt('D4', 'exact') ? 16 : 40, fl = M.clamp((t - (n === 8 ? tStep[1] : n === 16 ? wt('D4', 'thinner') : wt('D4', 'exact'))) / 0.8);
    const ar = M.io((t - tStep[3] + 0.1) / 0.5);
    dSt(fP, 1, 9, n, 1 + 8 * fl, 1 - ar);
    dArea.style.opacity = ar.toFixed(3); vis(dAl, t, tStep[3] + 0.3, 1e9, POP);
    M.setT(dCnt, n ? `${n} strips` : one ? '1 strip' : ''); dCnt.style.opacity = t < tStep[3] ? 1 : 0;
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'work') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'graph') - 0.1, 0.8);
  }

  /* C: two pulls */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#c0'), t, tC1 + 0.4, out, { dx: -60, dy: 0, ...o }); vis($('#c1'), t, tC1 + 0.6, out, { dx: 60, dy: 0, ...o });
    [[0, T0('C2'), wt('C2', 'bulges')], [1, T0('C3'), wt('C3', 'sags')]].forEach(([k, t0, ta]) => { const c = CG[k], u = M.io((t - t0) / 1.6); c.ln(x => [x, c.fn(x)], 0, 10 * u, 60); c.ar.style.opacity = M.io((t - ta + 0.1) / 0.4).toFixed(3); });
    vis($('#exC'), t, tC1 + 1, 1e9, { dy: 8 });
    vis($('#th1'), t, T0('C4') + 0.05, OUT('C5') + 0.32 + 1.2, { dy: 36, ...o });
    th1(t, { tin: T0('C4'), tOpts: wt('C4', 'Which') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'It') });
    // after the answer, the cards come back with their areas
    const back = T0('C5') + 1.3;
    if (t > back - 0.4) { vis($('#c0'), t, back, OUT('R1'), { dx: -60, dy: 0, ...o }); vis($('#c1'), t, back + 0.1, OUT('R1'), { dx: 60, dy: 0, ...o }); }
    PUC.write($('#c0a'), t, back + 0.5, 0.8); PUC.write($('#c1a'), t, back + 0.9, 0.8);
  }

  /* R: negative area, link by link */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('W1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o }); vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o });
    vis($('#exR'), t, tR1 + 0.8, 1e9, { dy: 8 });
    const ul = M.io((t - tR1 - 0.4) / 1.4); lLine(x => [x, fR(x)], 0, 3 * ul);
    const us = M.clamp((t - wt('R3', 'strips') + 0.1) / 0.8); lSt(fR, 0, 3, 12, 3 * us, t < wt('R5', 'above') ? 1 : 0);
    lUp.style.opacity = M.io((t - wt('R5', 'above') + 0.1) / 0.4).toFixed(3); lDn.style.opacity = M.io((t - wt('R5', 'below') + 0.1) / 0.4).toFixed(3);
    vis(lUpl, t, wt('R5', 'above'), 1e9, POP); vis(lDnl, t, wt('R5', 'below'), 1e9, POP); vis(lTot, t, wt('R5', 'below') + 0.6, 1e9, POP);
    tLk.forEach((tt, i) => { const el = $('#lk' + i); vis(el, t, tt - 0.1, 1e9, { dx: -24, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tt) / 0.3) * (1 - M.io((t - (tLk[i + 1] ?? T0('W1'))) / 0.3))); });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const ul = t < wt('W2', 'stays') ? M.clamp((t - wt('W2', 'grows')) / 2.8) * 2 : t < wt('W2', 'falls') ? 2 + 3 * M.clamp((t - wt('W2', 'stays')) / 2.2) : 5 + M.clamp((t - wt('W2', 'falls')) / 1.2);
    wLine(x => [x, fW(x)], 0, ul, 90);
    WR.forEach((r, i) => { r.p.style.opacity = M.io((t - tW[i] + 0.1) / 0.4).toFixed(3); vis(r.t, t, wt(['W3', 'W4', 'W5'][i], ['Ten', 'Thirty', 'Five'][i]) - 0.1, 1e9, POP); });
    vis($('#wc2'), t, wt('W6', 'forty') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'average') - 0.1, tStrike: wt('X3', 'straight') - 0.1, tRight: wt('X3', 'real') });
    const ul = M.io((t - T0('X2') - 0.3) / 1.0); tLn(x => [x, 3 * x * x], 0, 2 * ul);
    tAvg.style.opacity = M.io((t - wt('X2', 'twelve', 1) + 0.1) / 0.4).toFixed(3); vis(tL1, t, wt('X2', 'twelve', 1), 1e9, POP);
    tAr.style.opacity = M.io((t - wt('X3', 'area') + 0.1) / 0.4).toFixed(3); vis(tL2, t, wt('X3', 'Eight') - 0.1, 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Reading') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.9, tF + 1.4, tF + 1.9], tShot: wt('F1', 'Screenshot') });
    vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
