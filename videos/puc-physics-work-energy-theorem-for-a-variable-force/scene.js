// PUC Physics Ep 77: Work-energy theorem for a variable force (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const EN = C.teal, FC = C.orange, DC = C.violet, VC = C.ac, MC = C.ink;   // W,K teal; F orange; x violet; v blue; m ink
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const kK = tc(EN, 'K'), kF = tc(FC, 'F'), kx = tc(DC, 'x'), kdx = `d${tc(DC, 'x')}`, kv = tc(VC, 'v'), km = tc(MC, 'm'), kW = tc(EN, 'W');
const kKf = tc(EN, 'K_{\\text{f}}'), kKi = tc(EN, 'K_{\\text{i}}');
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2), f3 = v => v.toFixed(3);
// area path under fn on graph g from a to b (fills to the axis F = 0)
const areaD = (g, fn, a, b, n = 40) => { if (b - a < 1e-4) return ''; let d = `M${g.X(a).toFixed(1)},${g.Y(0).toFixed(1)}`; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += `L${g.X(x).toFixed(1)},${g.Y(fn(x)).toFixed(1)}`; } return d + `L${g.X(b).toFixed(1)},${g.Y(0).toFixed(1)}Z`; };

Object.assign(M.IC, {
  spring: ['M3 12h2l1.5-4 3 8 3-8 3 8 3-8L20 12h1'],
  band: ['M4 8c4-3 12-3 16 0', 'M4 16c4 3 12 3 16 0', 'M4 8v8', 'M20 8v8'],
  tramp: ['M3 10h18', 'M5 10l-1 8', 'M19 10l1 8', 'M7 10c2 3 8 3 10 0', 'M12 3v4'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tD1 = T0('D1'), tT = T0('T1'), tC1 = T0('C1'), tC4 = T0('C4'), tR1 = T0('R1'), tK1 = T0('K1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['tramp', 'Trampoline', 'PUSHES HARDER AS YOU SINK', 'trampoline'], ['band', 'Rubber band', 'PULLS HARDER AS IT STRETCHES', 'rubber']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${585 + i * 390}px;width:${i ? 380 : 360}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const HR = [['tramp', 'Trampoline', 'DEEPER: HARDER PUSH'], ['band', 'Rubber band', 'LONGER: HARDER PULL'], ['spring', 'Spring', 'SQUEEZED: HARDER PUSH']];
$('#jrs').innerHTML = HR.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <svg width="200" height="84"><path d="M14,8 V72 H190" stroke="${C.ink}" stroke-width="2.5" fill="none"/><path id="jl${i}" d="M14,70 L180,${[18, 26, 12][i]}" stroke="${FC}" stroke-width="5" stroke-linecap="round" fill="none"/><text x="22" y="20" font-family="Poppins" font-style="italic" font-weight="600" font-size="18" fill="${FC}">F</text><text x="172" y="66" font-family="Poppins" font-style="italic" font-weight="600" font-size="18" fill="${DC}">x</text></svg></div>`).join('');
const TILES = [[FC, 'Starts at 20 N', 'zap'], [FC, 'Fades to 0', 'arrowD'], [C.ink, 'Which F?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'strong'), wt('H4', 'nothing'), wt('H4', 'Which')];

/* ---------- P: rectangle vs strips ---------- */
const pa = PUC.graph($('#paS'), { x: 110, y: 110, w: 560, h: 300, xmax: 0.5, ymax: 24, xt: [0, 0.2, 0.4], yt: [0, 10, 20], xl: 'x (m)', yl: 'F (N)' });
const paA = mk($('#paS'), 'path', { d: '', fill: EN, opacity: 0.22 }), paL = mk($('#paS'), 'path', { d: `M${pa.X(0)},${pa.Y(10)} H${pa.X(0.4)} V${pa.Y(0)}`, stroke: FC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const paT = txt($('#paS'), pa.X(0.2), pa.Y(5) + 8, 'W = F × d', { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 26 });
const pb = PUC.graph($('#pbS'), { x: 110, y: 110, w: 560, h: 300, xmax: 0.5, ymax: 24, xt: [0, 0.2, 0.4], yt: [0, 10, 20], xl: 'x (m)', yl: 'F (N)' });
const fS = x => 50 * (0.4 - x);
const pbL = mk($('#pbS'), 'path', { d: `M${pb.X(0)},${pb.Y(20)} L${pb.X(0.4)},${pb.Y(0)}`, stroke: FC, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' });
const PBN = [4, 8, 16], pbG = PBN.map(n => { const g = mk($('#pbS'), 'g', {}); for (let i = 0; i < n; i++) { const a = 0.4 * i / n, b = 0.4 * (i + 1) / n, f = fS((a + b) / 2); mk(g, 'rect', { x: pb.X(a), y: pb.Y(f), width: pb.X(b) - pb.X(a), height: pb.Y(0) - pb.Y(f), fill: EN, 'fill-opacity': 0.25, stroke: EN, 'stroke-width': 1.5 }); } return mk($('#pbS'), 'g', {}).appendChild(g) && g; });
const pbT = txt($('#pbS'), pb.X(0.3), pb.Y(17), 'strips → area', { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 24 });

/* ---------- S: spring launch. m = 2 kg, k = 50 N/m, A = 0.4 m. x = 0.4(1 - cos 5t) until t = pi/10, then v = 2 m/s ---------- */
const s = $('#simS'), GY = 360, WX = 60, PXM = 750, XB0 = 135;     // block left face at XB0 + x*PXM ; spring natural length 0.5 m
const TL = Math.PI / 10;
const st = tau => tau <= TL ? { x: 0.4 * (1 - Math.cos(5 * tau)), v: 2 * Math.sin(5 * tau) } : { x: 0.4 + 2 * (tau - TL), v: 2 };
const Fof = x => x < 0.4 ? 50 * (0.4 - x) : 0;
mk(s, 'rect', { x: 0, y: GY, width: 784, height: 26, fill: '#E4E1D8' }); mk(s, 'line', { x1: 0, y1: GY, x2: 784, y2: GY, stroke: C.ink, 'stroke-width': 3 });
mk(s, 'rect', { x: WX - 24, y: GY - 150, width: 24, height: 150, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
for (let k = 0; k <= 4; k++) { const x = XB0 + k * 0.1 * PXM; mk(s, 'line', { x1: x, y1: GY, x2: x, y2: GY + 14, stroke: C.ink, 'stroke-width': 2 }); txt(s, x, GY + 46, (k / 10).toFixed(1), { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
txt(s, 760, GY + 46, 'x (m)', { 'text-anchor': 'end' });
const spr = mk(s, 'path', { d: '', stroke: C.ink, 'stroke-width': 3.5, fill: 'none', 'stroke-linejoin': 'round' });
const sprD = L => { const n = 12, y0 = GY - 40, h = 22; let d = `M${WX},${y0}`; const seg = (L - 20) / n; d += ` h10`; for (let i = 0; i < n; i++) d += ` l${(seg / 2).toFixed(2)},${i % 2 ? h : -h} l${(seg / 2).toFixed(2)},${i % 2 ? -h : h}`; return d + ' h10'; };
const sGh = [0, 1, 2].map(() => mk(s, 'rect', { y: GY - 80, width: 90, height: 80, rx: 8, fill: C.ink, opacity: 0 }));
const sBl = mk(s, 'rect', { y: GY - 80, width: 90, height: 80, rx: 8, fill: C.ink }), sBt = txt(s, 0, GY - 34, '2 kg', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 600, 'font-size': 18 });
const EB = [['WORK BY THE SPRING = AREA', 0.35, 100], ['KINETIC ENERGY OF THE BLOCK', 1, 162]].map(([l, op, y]) => { txt(s, 36, y - 10, l, { 'font-size': 15, 'letter-spacing': 1 }); mk(s, 'rect', { x: 36, y, width: 480, height: 24, rx: 5, fill: 'none', stroke: C.line, 'stroke-width': 2 });
  return { r: mk(s, 'rect', { x: 36, y, width: 0, height: 24, rx: 5, fill: EN, 'fill-opacity': op }), v: txt(s, 530, y + 19, '', { fill: EN, 'font-weight': 600, 'font-size': 20 }) }; });
const sF = PUC.arrow(s, FC, 6, 18), sV = PUC.arrow(s, VC, 6, 18);
const sLF = it(s, 0, 0, '', FC, { 'font-size': 22 }), sLV = it(s, 0, 0, 'v', VC, { 'font-size': 24 });
const sMark = [1, 2, 3].map(k => mk(s, 'line', { x1: XB0 + k * 75, y1: GY - 130, x2: XB0 + k * 75, y2: GY, stroke: EN, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0 }));
// time map: 1x launch at tRel; replay: 4 segments at 0.25x, each ending in a freeze while its strip stamps
const tRel = wt('S3', 'Release') + 0.15, rp = wt('S4', 'replay') + 0.3;
const segT = [0, 0.1446, 0.2094, 0.2636, TL];            // physical times at x = 0, 0.1, 0.2, 0.3, 0.4
const lab = [wt('S6', 'One'), wt('S6', 'one', 1), wt('S6', 'point', 2), wt('S6', 'point', 3)];
const segStart = [rp, lab[1] - 1.0, lab[2] - 0.9, lab[3] - 0.9], tGo = wt('S8', 'leaves');
const tauS = t => {
  if (t >= tGo) return TL + (t - tGo);
  if (t >= rp) { let tau = 0; for (let k = 0; k < 4; k++) { if (t >= segStart[k]) tau = Math.min(segT[k + 1], segT[k] + 0.25 * (t - segStart[k])); } return tau; }
  if (t >= tRel) return t - tRel;
  return 0;
};
const tStrip = [wt('S5', 'strip') - 0.1, lab[1] - 0.1, lab[2] - 0.1, lab[3] - 0.1];
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.000</span><span class="u">s</span>
  <span class="k" style="color:${DC}">x</span><span class="v" id="r_x" style="color:${DC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_f" style="color:${FC}">20.0</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${EN}">W</span><span class="v" id="r_w" style="color:${EN}">0.00</span><span class="u">J</span>
  <span class="k" style="color:${EN}">K</span><span class="v" id="r_k" style="color:${EN}">0.00</span><span class="u">J</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 540, h: 150, xmax: 0.45, ymax: 22, xt: [0, 0.1, 0.2, 0.3, 0.4], yt: [0, 10, 20], xl: 'x (m)', yl: 'F (N)' });
const gA = mk($('#grS'), 'path', { d: '', fill: EN, opacity: 0.22 });
mk($('#grS'), 'path', { d: `M${g.X(0)},${g.Y(20)} L${g.X(0.4)},${g.Y(0)}`, stroke: FC, 'stroke-width': 2, 'stroke-dasharray': '4 6', fill: 'none', opacity: 0.5 });
const gL = g.curve(FC), gd = g.dot(FC, 10);
const STR = [0, 1, 2, 3].map(k => { const a = 0.1 * k, b = a + 0.1, f = fS(a + 0.05); return { r: mk($('#grS'), 'rect', { x: g.X(a), y: g.Y(f), width: g.X(b) - g.X(a), height: g.Y(0) - g.Y(f), fill: EN, 'fill-opacity': 0.35, stroke: EN, 'stroke-width': 2, opacity: 0 }), l: txt($('#grS'), (g.X(a) + g.X(b)) / 2, g.Y(f) - 8, [1.75, 1.25, 0.75, 0.25][k].toFixed(2), { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 17 }) }; });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Four strips, four joules, four joules of K!' });

/* ---------- D ---------- */
const STEPS = [[`${kK} = \\tfrac{1}{2}${km}${kv}^{2} \\Rightarrow \\dfrac{d${kK}}{dt} = ${km}${kv}\\dfrac{d${kv}}{dt}`, 'rate of change of K'],
  [`${km}\\dfrac{d${kv}}{dt} = ${kF} \\Rightarrow \\dfrac{d${kK}}{dt} = ${kF}${kv}`, "Newton's second law"],
  [`${kv} = \\dfrac{${kdx}}{dt} \\Rightarrow d${kK} = ${kF}\\,${kdx}`, 'cancel the dt'],
  [`\\int_{${kKi}}^{${kKf}} d${kK} = \\int_{x_{\\text{i}}}^{x_{\\text{f}}} ${kF}\\,${kdx}`, '∫ means: add up every tiny piece']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:118px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${80 + i * 122}px"><div class="n">${i + 1}</div><div class="sx" style="font-size:34px">${K(f)}</div><div class="why" style="top:78px">${w}</div></div>`).join('');
const tStep = [wt('D2', 'K'), wt('D3', 'm'), wt('D4', 'v'), wt('D5', 'Add')];
$('#steps2').innerHTML = `<div class="kbox" id="kbx" style="top:420px;height:124px"></div><div class="st" id="dsu0" style="top:432px"><div class="n">5</div><div class="sx" style="font-size:40px">${K(`${kKf} - ${kKi} = \\int ${kF}\\,${kdx}`)}</div><div class="why" style="top:76px">= area under the F-x graph</div></div>`;
const dg = PUC.graph($('#drS'), { x: 100, y: 90, w: 600, h: 260, xmax: 10, ymax: 10, xt: [], yt: [], xl: 'x', yl: 'F' });
const fD = x => 2 + 6 * Math.exp(-((x - 4.5) * (x - 4.5)) / 8) + 0.15 * x;
const dA = mk($('#drS'), 'path', { d: '', fill: EN, opacity: 0.22 }), dC = dg.curve(FC);
const dStr = [mk($('#drS'), 'g', {}), mk($('#drS'), 'g', {})];
[[1, 9, 8], [1, 9, 32]].forEach(([a, b, n], k) => { for (let i = 0; i < n; i++) { const x0 = a + (b - a) * i / n, x1 = x0 + (b - a) / n, f = fD((x0 + x1) / 2); mk(dStr[k], 'rect', { x: dg.X(x0), y: dg.Y(f), width: dg.X(x1) - dg.X(x0), height: dg.Y(0) - dg.Y(f), fill: EN, 'fill-opacity': 0.2, stroke: EN, 'stroke-width': k ? 0.8 : 1.6 }); } });
const dOne = mk($('#drS'), 'rect', { x: dg.X(5), y: dg.Y(fD(5.1)), width: dg.X(5.2) - dg.X(5), height: dg.Y(0) - dg.Y(fD(5.1)), fill: EN, stroke: EN, 'stroke-width': 2 });
const dOneL = txt($('#drS'), dg.X(5.1), dg.Y(fD(5.1)) - 14, 'F dx', { 'text-anchor': 'middle', fill: EN, 'font-weight': 600, 'font-size': 22 });
$('#stF').innerHTML = K(`${kKf} - ${kKi} = \\int_{x_{\\text{i}}}^{x_{\\text{f}}} ${kF}\\,${kdx}`);

/* ---------- C ---------- */
const CG = ['#cmS', '#cvS'].map((id, k) => { const gg = PUC.graph($(id), { x: 110, y: 130, w: 560, h: 280, xmax: 0.5, ymax: 24, xt: [0, 0.2, 0.4], yt: [0, 10, 20], xl: 'x (m)', yl: 'F (N)' });
  const fn = k ? fS : () => 10; const a = mk($(id), 'path', { d: '', fill: EN, opacity: 0.25 }), c = gg.curve(FC), l = txt($(id), gg.X(k ? 0.12 : 0.2), gg.Y(k ? 4 : 5) + 8, '4 J', { 'text-anchor': 'middle', fill: EN, 'font-weight': 700, 'font-size': 34 }); return { gg, fn, a, c, l }; });
const tCg = [[T0('C2'), wt('C2', 'rectangle'), wt('C2', 'four')], [T0('C3'), wt('C3', 'triangle'), wt('C3', 'four')]];
const th1 = PUC.think($('#th1'), { q: 'Which push gives the block more kinetic energy: the steady 10 N, or the spring?', opts: ['Steady push', 'Spring push', 'The same'], right: 2, why: 'Both areas are 4 J. Only the area counts, not the shape.' });

/* ---------- R ---------- */
const LK = [['Force along the motion', '+ WORK · ABOVE'], ['Force against the motion', '- WORK · BELOW'], ['Net area = above - below', 'ADD WITH SIGNS'], ['Net area = change in K', '+, 0 OR -']];
$('#lks').innerHTML = LK.map(([f, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px;height:92px"><div class="n" style="top:22px">${i + 1}</div><div class="fx2" style="font:600 26px Poppins;top:28px">${f}</div><div class="tg" id="lt${i}" style="top:24px">${tg}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const rg = PUC.graph($('#rrS'), { x: 110, y: 100, w: 560, h: 320, xmax: 4.4, ymin: -6, ymax: 8, xt: [0, 1, 2, 3, 4], yt: [-4, 0, 6], xl: 'x (m)', yl: 'F (N)' });
const rUp = mk($('#rrS'), 'rect', { x: rg.X(0), y: rg.Y(6), width: rg.X(2) - rg.X(0), height: rg.Y(0) - rg.Y(6), fill: EN, opacity: 0 }), rDn = mk($('#rrS'), 'rect', { x: rg.X(2), y: rg.Y(0), width: rg.X(4) - rg.X(2), height: rg.Y(-4) - rg.Y(0), fill: C.red, opacity: 0 });
const rL = mk($('#rrS'), 'path', { d: `M${rg.X(0)},${rg.Y(6)} H${rg.X(2)} V${rg.Y(-4)} H${rg.X(4)}`, stroke: FC, 'stroke-width': 5, fill: 'none', 'stroke-linejoin': 'round' });
const rT1 = txt($('#rrS'), rg.X(1), rg.Y(3) + 8, '+12 J', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 28 }), rT2 = txt($('#rrS'), rg.X(3), rg.Y(-2) + 8, '-8 J', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 28 });
const rT3 = txt($('#rrS'), rg.X(3), rg.Y(5), 'net = +4 J', { 'text-anchor': 'middle', fill: EN, 'font-weight': 700, 'font-size': 28 });
const th2 = PUC.think($('#th2'), { q: 'On an F-x graph, 10 J sit above the axis and 15 J below. Does the body end up faster or slower?', opts: ['Faster', 'Slower'], right: 1, why: 'Net area = 10 - 15 = -5 J, so K drops by 5 J.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `A ${K('1\\ \\text{kg}')} body starts at rest. A force ${K(`${kF} = 4${kx}\\ \\text{N}`)} pushes it from ${K('0')} to ${K(tc(DC, '3\\ \\text{m}'))}. Find its speed.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${kF}(3) = 4 \\times 3 = ${tc(FC, '12\\ \\text{N}')}`)],
  [K(`${kW} = \\tfrac{1}{2} \\times 3 \\times 12 = ${tc(EN, '18\\ \\text{J}')}`)],
  [K(`${kKf} = 0 + 18 = 18\\ \\text{J}`)],
  [K(`\\tfrac{1}{2}(1)${kv}^{2} = 18 \\Rightarrow ${kv} = ${tc(VC, '6\\ \\text{m/s}')}`)]], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const wg = PUC.graph($('#wrS'), { x: 110, y: 100, w: 560, h: 320, xmax: 3.4, ymax: 14, xt: [0, 1, 2, 3], yt: [0, 12], xl: 'x (m)', yl: 'F (N)' });
const wA = mk($('#wrS'), 'path', { d: '', fill: EN, opacity: 0.25 }), wC = wg.curve(FC), wd = wg.dot(FC, 10);
const wH = mk($('#wrS'), 'path', { d: `M${wg.X(0)},${wg.Y(12)} H${wg.X(3)} V${wg.Y(0)}`, stroke: C.dim, 'stroke-width': 2, 'stroke-dasharray': '5 6', fill: 'none' });
const wT = txt($('#wrS'), wg.X(2.1), wg.Y(2.6), '18 J', { 'text-anchor': 'middle', fill: EN, 'font-weight': 700, 'font-size': 32 });
const wV = txt($('#wrS'), 110, 500, 'v = 6 m/s at x = 3 m', { fill: VC, 'font-weight': 600, 'font-size': 26 });
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'W = biggest force × distance = 12 × 3 = 36 J', right: 'W = area under the graph = ½ × 3 × 12 = 18 J' });
const tg = PUC.graph($('#tpS'), { x: 80, y: 40, w: 380, h: 180, xmax: 3.4, ymax: 14, xt: [0, 3], yt: [0, 12] });
const tR = mk($('#tpS'), 'rect', { x: tg.X(0), y: tg.Y(12), width: tg.X(3) - tg.X(0), height: tg.Y(0) - tg.Y(12), fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-dasharray': '7 6', opacity: 0 });
const tA = mk($('#tpS'), 'path', { d: `M${tg.X(0)},${tg.Y(0)} L${tg.X(3)},${tg.Y(12)} L${tg.X(3)},${tg.Y(0)} Z`, fill: EN, opacity: 0 });
mk($('#tpS'), 'path', { d: `M${tg.X(0)},${tg.Y(0)} L${tg.X(3)},${tg.Y(12)}`, stroke: FC, 'stroke-width': 4, fill: 'none' });
const tL1 = txt($('#tpS'), tg.X(0.9), tg.Y(9.5), '36 J?', { 'text-anchor': 'middle', fill: C.red, 'font-weight': 700, 'font-size': 24 }), tL2 = txt($('#tpS'), tg.X(2.3), tg.Y(2.5), '18 J', { 'text-anchor': 'middle', fill: '#fff', 'font-weight': 700, 'font-size': 24 });
const where = PUC.where($('#wa'), { on: [], type: 'Force given as a formula in x or as a graph: find the work or the speed' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 80, optFs: 32, optY: 370,
  q: `A 2 kg block moves along x under <i style="color:${FC}">F</i> = (8 - 4<i style="color:${DC}">x</i>) N. At <i>x</i> = 0 its speed is 1 m/s. What is its speed at <i>x</i> = 4 m?`,
  opts: ['3 m/s', '1 m/s', '√17 m/s', 'zero'], right: 1 });
const so = PUC.solution($('#so'), [[`<i style="color:${FC}">F</i> &gt; 0 up to 2 m, then &lt; 0`], [K(`\\text{area: } +8\\ \\text{J},\\; -8\\ \\text{J}`)], [K(`${tc(EN, 'W_{\\text{net}}')} = 0 \\Rightarrow \\Delta ${kK} = 0`)], [K(`${kv} = ${tc(C.ok, '1\\ \\text{m/s}')}`) + ' <span style="font-size:20px;color:#6B7280">(top: 3 m/s)</span>']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A4', 'Net'), wt('A4', 'Three')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · variable force', y0: 100, dy: 88, txt: [0, 1, 1, 1],
  lines: [K(`${kKf} - ${kKi} = \\int_{x_{\\text{i}}}^{x_{\\text{f}}} ${kF}\\,${kdx}`),
    `Work = <b>area</b> under the F-x graph`,
    `Above the axis: <b>+</b> work &nbsp;·&nbsp; below the axis: <b>-</b> work`,
    `Steady force: area = F × d, a rectangle`] });
const YQ = ["A spring's push fades as it opens. How do we find the work it does?", 'What does area below the axis on an F-x graph mean?', 'A steady push and a spring push give the same area. Which gives more K?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 78', topic: 'Energy that waits without moving? Potential Energy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S6') - 0.2, 1.06, 960, 540], [T0('S7') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px'; bp.style.top = '96px';
}

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
    HR.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.draw($('#jl' + i), t, tMorph + 0.6 + i * 0.3, 0.6); });
    vis($('#hjP'), t, wt('H2', 'steady') - 0.3, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    const e2 = M.io((t - wt('H5', 'add')) / 0.3); $('#wq2').style.background = mix(C.soft, EN, e2); $('#wq2').style.color = mix(C.ink, '#FFFFFF', e2);
    if (e2 > 0.5) M.setT($('#wq2').querySelector('span'), 'Add every tiny push');
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(paL, t, tP1 + 0.5, 0.8);
    const ua = M.io((t - wt('P2', 'rectangle') + 0.1) / 0.6); attr(paA, 'd', areaD(pa, () => 10, 0, 0.4 * ua)); vis(paT, t, wt('P2', 'area'), 1e9, { dy: 8 });
    vis($('#pb'), t, T0('P3') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(pbL, t, wt('P3', 'slope') - 0.3, 0.6);
    const tg2 = [wt('P4', 'cut'), wt('P4', 'tiny', 1) - 0.2, wt('P4', 'steady') - 0.2];
    pbG.forEach((gg, k) => { const on = t >= tg2[k] && (k === 2 || t < tg2[k + 1]); gg.style.opacity = on ? 1 : 0; });
    vis(pbT, t, tg2[0] + 0.3, 1e9, { dy: 8 }); vis($('#pbP'), t, wt('P4', 'almost') - 0.1, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('D1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tau = Math.round(tauS(t) * 1000) / 1000, S = st(tau), x = S.x, v = S.v, F = Fof(x), XB = XB0 + x * PXM;
    const L = Math.min(XB, XB0 + 0.4 * PXM) - WX; attr(spr, 'd', sprD(L));
    attr(sBl, 'x', XB.toFixed(1)); attr(sBt, 'x', (XB + 45).toFixed(1));
    const mv = (t > tRel && t < tRel + 0.6) || (t > tGo) || segStart.some((a, k) => t > a && t < a + 4 * (segT[k + 1] - segT[k]));
    sGh.forEach((gh, k) => { const q = Math.round(tauS(t - 0.05 * (k + 1)) * 1000) / 1000; attr(gh, 'x', (XB0 + st(q).x * PXM).toFixed(1)); gh.style.opacity = mv && q < tau - 0.0005 ? [0.3, 0.2, 0.12][k] : 0; });
    const fOn = M.o3((t - wt('S2', 'twenty') + 0.1) / 0.4);
    sF.set(XB, GY - 104, XB + F * 7 * fOn, GY - 104); M.setT(sLF, `F = ${f1(F)} N`); attr(sLF, 'x', XB.toFixed(1)); attr(sLF, 'y', GY - 118); sLF.style.opacity = (fOn * (F > 0.05 ? 1 : 0)).toFixed(3);
    sV.set(XB + 96, GY - 40, XB + 96 + v * 60, GY - 40); attr(sLV, 'x', (XB + 102 + v * 60).toFixed(1)); attr(sLV, 'y', GY - 50); sLV.style.opacity = v > 0.1 ? 1 : 0;
    sMark.forEach((m, k) => { m.style.opacity = t >= rp && tau >= segT[k + 1] - 0.0005 && t < tGo ? 0.7 : 0; });
    vis($('#smo'), t, rp - 0.4, tGo - 0.2, { ...POP, sc: 0.8 });
    const Wv = 50 * (0.4 * Math.min(x, 0.4) - Math.min(x, 0.4) ** 2 / 2);
    [Wv, v * v].forEach((e, k) => { attr(EB[k].r, 'width', (e * 120).toFixed(1)); M.setT(EB[k].v, `${f2(e)} J`); });
    M.setT($('#r_t'), f3(tau)); M.setT($('#r_x'), f2(x)); M.setT($('#r_f'), f1(F)); M.setT($('#r_v'), f2(v)); M.setT($('#r_w'), f2(Wv)); M.setT($('#r_k'), f2(0.5 * 2 * v * v));
    const xg = Math.min(x, 0.4), rep = t >= rp && t < tGo; attr(gA, 'd', rep ? '' : areaD(g, fS, 0, xg)); gL(q => [q, fS(q)], 0, t >= rp ? 0.4 : xg); gd(Math.min(x, 0.44), F, t > tS1 + 0.6);
    STR.forEach((sR, k) => { const on = t >= tStrip[k] && t < tGo + 0.4 ? 1 : 0; sR.r.style.opacity = on; vis(sR.l, t, k ? lab[k] : lab[0], tGo + 0.3, { dy: 6, outDur: 0.2, ody: 0 }); });
    vis($('#gTag'), t, wt('S7', 'Four') - 0.1, 1e9, POP);
    avD(t, wt('S8', 'area') - 0.2, out);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, [[tStep[1] - 0.1, 202], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 446]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, T0('D6') - 0.2, { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 10).toFixed(1) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    dC(q => [q, fD(q)], 0.2, 0.2 + 9.4 * M.io((t - tD1 - 0.6) / 1.0));
    vis(dOne, t, wt('D4', 'F') - 0.1, wt('D5', 'Add') - 0.1, { dy: 0 }); vis(dOneL, t, wt('D4', 'F'), wt('D5', 'Add') - 0.1, { dy: 6 });
    dStr[0].style.opacity = t > wt('D5', 'Add') && t < wt('D5', 'integral') ? 1 : 0; dStr[1].style.opacity = t >= wt('D5', 'integral') && t < T0('D6') + 0.6 ? 1 : 0;
    attr(dA, 'd', areaD(dg, fD, 1, 1 + 8 * M.io((t - T0('D6') - 0.3) / 1.2)));
    vis($('#kbx'), t, T0('D6') - 0.1, 1e9, { dy: 0, fade: 0.2 }); const e = $('#dsu0'); vis(e.querySelector('.n'), t, T0('D6') - 0.1, 1e9, { ...POP, sc: 0.4 }); PUC.write(e.querySelector('.sx'), t, wt('D6', 'K'), 0.8); vis(e.querySelector('.why'), t, wt('D6', 'area') - 0.1, 1e9, { dx: -12, dy: 0 });
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'change') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'area') - 0.1, 0.8);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#cm'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o }); vis($('#cv'), t, tC1 + 0.4, out, { dx: 60, dy: 0, ...o });
    CG.forEach((c, k) => { const [a, b, d] = tCg[k]; c.c(q => [q, c.fn(q)], 0, 0.4 * M.io((t - a - 0.3) / 0.8)); attr(c.a, 'd', areaD(c.gg, c.fn, 0, 0.4 * M.io((t - b + 0.1) / 0.6))); vis(c.l, t, d - 0.1, 1e9, { dy: 8 }); vis($(k ? '#cvR' : '#cmR'), t, d + 0.2, 1e9, POP); });
    vis($('#th1'), t, tC4 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Which') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'Both') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { vis($('#lk' + i), t, tLk[i] - 0.1, 1e9, { dy: 16 }); vis($('#lt' + i), t, tLk[i] + 0.8, 1e9, { ...POP, sc: 0.5 }); });
    const fin = M.io((t - wt('R5', 'change')) / 0.3); $('#lk3').style.background = mix(C.soft, '#E3F3F3', fin);
    vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.6, 1e9, { dy: 8 });
    M.draw(rL, t, tR1 + 0.6, 1.0);
    rUp.style.opacity = (0.75 * M.io((t - wt('R2', 'above') + 0.1) / 0.4)).toFixed(3); rDn.style.opacity = (0.65 * M.io((t - wt('R3', 'below') + 0.1) / 0.4)).toFixed(3);
    vis(rT1, t, wt('R2', 'Positive'), 1e9, { dy: 6 }); vis(rT2, t, wt('R3', 'Negative'), 1e9, { dy: 6 }); vis(rT3, t, wt('R4', 'minus'), 1e9, POP);
    vis($('#rrP'), t, wt('R5', 'change') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Does') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'net') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const uc = M.io((t - wt('W2', 'pushes')) / 1.4); wC(q => [q, 4 * q], 0, 3 * uc); wd(3 * uc, 12 * uc, t > wt('W2', 'pushes'));
    M.draw(wH, t, wt('W3', 'twelve') - 0.1, 0.5);
    attr(wA, 'd', areaD(wg, q => 4 * q, 0, 3 * M.io((t - wt('W4', 'Area') + 0.1) / 0.8))); vis(wT, t, wt('W4', 'Eighteen') - 0.1, 1e9, POP);
    vis(wV, t, wt('W6', 'six') - 0.1, 1e9, { dy: 8 });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'multiply') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'area') });
    tR.style.opacity = M.io((t - wt('X2', 'Twelve')) / 0.3).toFixed(3); vis(tL1, t, wt('X2', 'thirty'), 1e9, { dy: 6 });
    tA.style.opacity = (0.8 * M.io((t - wt('X3', 'area')) / 0.4)).toFixed(3); vis(tL2, t, wt('X3', 'eighteen'), 1e9, POP);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'force') });
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

SW.forEach(([a0]) => M.sfx(a0 - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
