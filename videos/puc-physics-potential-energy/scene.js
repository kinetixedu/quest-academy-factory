// PUC Physics Ep 78: Potential energy (Motion notebook)
(() => {
const { $ } = M, C = PUC.init({ subject: 'physics' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const EN = C.teal, FC = C.orange, DC = C.violet, VC = C.ac, MC = C.ink, GC = C.red;   // U,K,W teal; F orange; x violet; v blue; m ink; g red
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const it = (p, x, y, s, col, a = {}) => txt(p, x, y, s, Object.assign({ 'font-family': 'Poppins', 'font-style': 'italic', 'font-weight': 600, 'font-size': 30, fill: col }, a));
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const vis = (el, t, a, b = 1e9, o = {}) => M.vis(el, t, a, b, el instanceof SVGElement ? { ...o, sc: 1 } : o);
const tc = (c, s) => `\\textcolor{${c}}{${s}}`;
const kU = tc(EN, 'U'), kK = tc(EN, 'K'), kW = tc(EN, 'W'), kF = tc(FC, 'F'), kx = tc(DC, 'x'), kdx = `d${tc(DC, 'x')}`, km = tc(MC, 'm'), kg = tc(GC, 'g'), kh = tc(DC, 'h');
const f1 = v => v.toFixed(1), f2 = v => v.toFixed(2);

Object.assign(M.IC, {
  bow: ['M6 3c6 4 6 14 0 18', 'M6 3v18', 'M3 12h16', 'm16 9 3 3-3 3'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z', 'M9 17h6', 'M17 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'],
  rock: ['M4 18l3-8 5-3 6 4 2 7z'],
  tank: ['M5 6h14v10H5z', 'M8 16v4', 'M16 16v4', 'M5 10h14'],
  hammer: ['m15 12-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9', 'M17.64 15 22 10.64', 'm20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91'],
  sling: ['M12 21v-8', 'M12 13 7 4', 'M12 13l5-9', 'M7 4c2 4 8 4 10 0'],
  spring: ['M3 12h2l1.5-4 3 8 3-8 3 8 3-8L20 12h1'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tP1 = T0('P1'), tS1 = T0('S1'), tC1 = T0('C1'), tC4 = T0('C4'), tD1 = T0('D1'), tT = T0('T1'), tR1 = T0('R1'), tK1 = T0('K1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tR1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title tiles + hook ---------- */
const JOBS = [['bow', 'Bow', 'PULLED BACK', 'bow'], ['car', 'Toy car', 'WOUND UP', 'wound'], ['rock', 'Rock', 'AT A CLIFF EDGE', 'rock']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div>
  <div class="pillp" id="jv${i}" style="right:20px;top:36px;height:48px;background:#fff;font:600 24px 'IBM Plex Mono'"><span style="font-family:Poppins;font-style:italic;color:${VC}">v</span>&nbsp;= 0</div></div>`).join('');
const TILES = [[C.ink, 'Stone flies', 'zap'], [VC, 'Water gushes', 'tank'], [EN, 'Where was it waiting?', 'help']];
$('#wqs').innerHTML = TILES.map(([c, w, ic], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, c, 2.6)}<span>${w}</span></div>`).join('');
const tTile = [wt('H4', 'flies'), wt('H4', 'gushes'), wt('H4', 'Where')];
// hook scene: catapult in front of Diya, a house with a roof tank
const hk = $('#hkS');
mk(hk, 'line', { x1: 36, y1: 450, x2: 748, y2: 450, stroke: C.ink, 'stroke-width': 3 });
mk(hk, 'path', { d: 'M500,450 V300 L610,230 L720,300 V450', fill: '#FFF8E7', stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' });
mk(hk, 'rect', { x: 588, y: 380, width: 44, height: 70, fill: '#C9A27A', stroke: C.ink, 'stroke-width': 2.5 });
mk(hk, 'rect', { x: 580, y: 150, width: 90, height: 70, rx: 8, fill: VC, 'fill-opacity': 0.2, stroke: C.ink, 'stroke-width': 3 });
mk(hk, 'path', { d: 'M592,220 v18 M658,220 v18', stroke: C.ink, 'stroke-width': 3 });
txt(hk, 625, 140, 'FULL TANK', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1 });
mk(hk, 'path', { d: 'M670,200 H740 V420 H726', stroke: C.ink, 'stroke-width': 4, fill: 'none' });
const hWater = mk(hk, 'path', { d: 'M726,424 q-6,20 -14,26', stroke: VC, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
mk(hk, 'path', { d: 'M330,450 V360 M330,360 L306,300 M330,360 L354,300', stroke: '#8A5A2B', 'stroke-width': 8, 'stroke-linecap': 'round', fill: 'none' });
const hBand = mk(hk, 'path', { d: 'M306,300 L276,330 L354,300', stroke: '#B23A3A', 'stroke-width': 3, fill: 'none' }), hStone = mk(hk, 'circle', { cx: 276, cy: 330, r: 9, fill: C.ink });
const tFly = wt('H4', 'flies') - 0.3;

/* ---------- P ---------- */
const MT = [['tank', 'Water tank', 'high up', 'POSITION'], ['hammer', 'Raised hammer', 'lifted', 'POSITION'], ['sling', 'Catapult', 'stretched', 'SHAPE'], ['spring', 'Spring', 'squeezed', 'SHAPE']];
$('#mts').innerHTML = MT.map(([ic, n, i, w], k) => `<div class="mt" id="mt${k}" style="top:${140 + k * 98}px"><i>${M.icon(ic, 28, C.ac, 2.2)}</i><div class="mn">${n}</div><div class="mi">${i}</div><div class="mw" style="background:${w === 'SHAPE' ? DC : EN}">${w}</div></div>`).join('');
const tMt = [wt('P3', 'tank'), wt('P3', 'position') + 0.3, wt('P3', 'catapult'), wt('P3', 'shape') + 0.3];

/* ---------- S: catapult. k = 200 N/m, stretch 0.2 m, stone 0.08 kg: U = 100 s^2, F = 200 s, w = 50 rad/s ---------- */
const s = $('#simS'), FX0 = 520, PXM = 1000, PY = 300, TL = Math.PI / 100;
mk(s, 'line', { x1: 0, y1: 470, x2: 784, y2: 470, stroke: C.ink, 'stroke-width': 3 });
mk(s, 'path', { d: `M${FX0},470 V${PY + 50} M${FX0},${PY + 50} L${FX0 - 14},${PY - 44} M${FX0},${PY + 50} L${FX0 + 14},${PY + 44}`, stroke: '#8A5A2B', 'stroke-width': 10, 'stroke-linecap': 'round', fill: 'none' });
const tipA = [FX0 - 14, PY - 44], tipB = [FX0 + 14, PY + 44];
for (let k = 0; k <= 2; k++) { const x = FX0 - k * 100; mk(s, 'line', { x1: x, y1: 470, x2: x, y2: 482, stroke: C.ink, 'stroke-width': 2 }); txt(s, x, 508, (k / 10).toFixed(1), { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 }); }
txt(s, 36, 508, 'stretch x (m)', { fill: C.mute });
const band = mk(s, 'path', { d: '', stroke: '#B23A3A', 'stroke-width': 4, fill: 'none', 'stroke-linejoin': 'round' });
const pouch = mk(s, 'rect', { y: PY - 18, width: 14, height: 36, rx: 5, fill: '#5B4636' });
const sGh = [0, 1, 2].map(() => mk(s, 'circle', { r: 13, cy: PY, fill: C.ink, opacity: 0 }));
const stone = mk(s, 'circle', { r: 13, cy: PY, fill: C.ink });
const hand = mk(s, 'rect', { y: PY - 26, width: 46, height: 52, rx: 14, fill: '#E8B48A', stroke: C.ink, 'stroke-width': 2.5 });
const aB = PUC.arrow(s, FC, 6, 18), aH = PUC.arrow(s, FC, 6, 18), aV = PUC.arrow(s, VC, 6, 18);
const lB = it(s, 0, 0, 'band', FC, { 'font-size': 20, 'text-anchor': 'middle' }), lH = it(s, 0, 0, 'hand', FC, { 'font-size': 20, 'text-anchor': 'middle' }), lV = it(s, 0, 0, 'v', VC, { 'font-size': 24 });
const EB = [['STORED U', 0.4, 100], ["STONE'S K", 1, 160]].map(([l, op, y]) => { txt(s, 36, y - 10, l, { 'font-size': 15, 'letter-spacing': 1 }); mk(s, 'rect', { x: 36, y, width: 400, height: 24, rx: 5, fill: 'none', stroke: C.line, 'stroke-width': 2 });
  return { r: mk(s, 'rect', { x: 36, y, width: 0, height: 24, rx: 5, fill: EN, 'fill-opacity': op }), v: txt(s, 450, y + 19, '', { fill: EN, 'font-weight': 600, 'font-size': 20 }) }; });
const tPull = T0('S2') + 0.5, tRel = wt('S4', 'lets') + 0.2, rp = wt('S5', 'replay') + 0.3;
const stretchPull = t => 0.2 * M.io((t - tPull) / 3.2);
const relTau = t => t >= rp ? 0.01 * (t - rp) : t >= tRel && t < rp - 0.3 ? (t - tRel) : -1;     // -1: not released (also during reset before the replay)
const relState = tau => tau <= TL ? { sx: 0.2 * Math.cos(50 * tau), v: 10 * Math.sin(50 * tau), xs: 0 } : { sx: 0, v: 10, xs: 10 * (tau - TL) };   // xs: stone past the rest point (m)
$('#roA').innerHTML = `<span class="k" style="font-style:normal;color:${C.ink}">t</span><span class="v" id="r_t">0.0</span><span class="u">ms</span>
  <span class="k" style="color:${DC}">x</span><span class="v" id="r_x" style="color:${DC}">0.00</span><span class="u">m</span>
  <span class="k" style="color:${FC}">F</span><span class="v" id="r_f" style="color:${FC}">0.0</span><span class="u">N</span>`;
$('#roB').innerHTML = `<span class="k" style="color:${VC}">v</span><span class="v" id="r_v" style="color:${VC}">0.00</span><span class="u">m/s</span>
  <span class="k" style="color:${EN}">U</span><span class="v" id="r_u" style="color:${EN}">0.00</span><span class="u">J</span>
  <span class="k" style="color:${EN}">K</span><span class="v" id="r_k" style="color:${EN}">0.00</span><span class="u">J</span>`;
const g = PUC.graph($('#grS'), { x: 110, y: 64, w: 540, h: 150, xmax: 0.25, ymax: 4.6, xt: [0, 0.1, 0.2], yt: [0, 2, 4], xl: 'x (m)', yl: 'J' });
const gU = g.curve(EN), gK = g.curve(EN, 4), gd = g.dot(EN, 10), gdK = g.dot(C.ink, 8);
const gSum = mk($('#grS'), 'line', { x1: g.X(0), y1: g.Y(4), x2: g.X(0.25), y2: g.Y(4), stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: 0 });
const gLU = txt($('#grS'), g.X(0.2) + 10, g.Y(4) + 22, 'U', { fill: EN, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic' }), gLK = txt($('#grS'), g.X(0) + 10, g.Y(4) + 22, 'K', { fill: C.ink, 'font-weight': 700, 'font-size': 20, 'font-family': 'Poppins', 'font-style': 'italic' });
const avD = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'All four joules came out as motion!' });

/* ---------- C: lifting vs dropping ---------- */
const CS = ['#cmS', '#cvS'].map((id, k) => { const sv = $(id); mk(sv, 'line', { x1: 36, y1: 460, x2: 748, y2: 460, stroke: C.ink, 'stroke-width': 2.5 });
  mk(sv, 'rect', { x: 600, y: 140, width: 50, height: 300, rx: 6, fill: 'none', stroke: C.line, 'stroke-width': 2 }); txt(sv, 625, 130, 'U', { 'text-anchor': 'middle', fill: EN, 'font-weight': 700, 'font-family': 'Poppins', 'font-style': 'italic', 'font-size': 22 });
  return { gh: [0, 1, 2].map(() => mk(sv, 'circle', { cx: 300, r: 24, fill: C.ink, opacity: 0 })), b: mk(sv, 'circle', { cx: 300, r: 24, fill: C.ink }), bar: mk(sv, 'rect', { x: 603, y: 440, width: 44, height: 0, rx: 4, fill: EN }),
    w: PUC.arrow(sv, FC, 6, 18), v: PUC.arrow(sv, VC, 6, 18), lw: it(sv, 0, 0, 'mg', FC, { 'font-size': 22 }), lv: it(sv, 0, 0, 'v', VC, { 'font-size': 22 }) }; });
const CY0 = 430, CY1 = 190;                      // ball centre low / high (2 m at 120 px per m)
const tCl = wt('C2', 'Lifting'), tCd = wt('C3', 'Dropping') + 0.3;
const cPos = (k, t) => { if (k === 0) { const u = M.clamp((t - tCl) / 3); return { y: CY0 - (CY0 - CY1) * u, v: t > tCl && u < 1 ? 1 : 0 }; }
  const tau = M.clamp(t - tCd, 0, Math.sqrt(4 / 9.8)); return { y: CY1 + 0.5 * 9.8 * tau * tau * 120, v: 9.8 * tau }; };
const th1 = PUC.think($('#th1'), { q: 'A falling ball. Gravity does +5 J of work on it. Does U go up or down, and by how much?', opts: ['Up by 5 J', 'Down by 5 J'], right: 1, why: "The force's work comes out of the store: W = -ΔU." });

/* ---------- D ---------- */
const STEPS = [[`${tc(FC, 'F_{\\text{you}}')} = -${kF}`, 'slow: your push balances the force'],
  [`\\Delta ${kU} = -\\int ${kF}\\,${kdx}`, 'work done against F is stored'],
  [`d${kU} = -${kF}\\,${kdx}`, 'one tiny step'],
  [`${kF} = -\\dfrac{d${kU}}{${kdx}}`, 'divide by dx']];
$('#steps').innerHTML = `<div class="hiBox" id="hiB" style="left:20px;width:744px;height:112px"></div>` + STEPS.map(([f, w], i) => `<div class="st" id="dst${i}" style="top:${84 + i * 120}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
$('#dst3 .why').style.top = '76px';
const tStep = [wt('D2', 'balances') - 0.4, wt('D3', 'delta'), wt('D4', 'tiny'), wt('D5', 'Divide')];
$('#steps2').innerHTML = `<div class="kbox" id="kbx" style="top:404px;height:124px"></div><div class="st" id="dsu0" style="top:420px"><div class="n">5</div><div class="sx" style="font-size:38px">${K(`${kU} = ${km}${kg}${kh} \\Rightarrow ${kF} = -\\dfrac{d${kU}}{d${kh}} = -${km}${kg}`)}</div><div class="why" style="top:80px">minus = downwards, as it should be</div></div>`;
const dg = PUC.graph($('#drS'), { x: 120, y: 90, w: 320, h: 260, xmax: 5, ymax: 5, xt: [], yt: [], xl: 'h', yl: 'U' });
const dL = dg.curve(EN);
const dBall = mk($('#drS'), 'circle', { cx: 600, cy: 170, r: 22, fill: C.ink }); mk($('#drS'), 'line', { x1: 540, y1: 350, x2: 680, y2: 350, stroke: C.ink, 'stroke-width': 2.5 });
const dW = PUC.arrow($('#drS'), FC, 6, 18), dWl = it($('#drS'), 618, 260, 'F = -mg', FC, { 'font-size': 24 }), dUp = it($('#drS'), 690, 150, '+ up', C.mute, { 'font-size': 18 });
const dSl = txt($('#drS'), dg.X(2.6), dg.Y(3.6), 'slope = mg', { fill: EN, 'font-weight': 600, 'font-size': 20 });
$('#stF').innerHTML = K(`${kF} = -\\dfrac{d${kU}}{${kdx}}`);

/* ---------- R: U-x bowl ---------- */
const LK = [[`${kU}\\uparrow \\text{ as } ${kx}\\uparrow \\Rightarrow \\text{slope} > 0`, 'UPHILL'], [`${kF} = -\\text{slope} < 0`, 'PUSHES BACK'], [`${kU}\\downarrow \\text{ as } ${kx}\\uparrow \\Rightarrow ${kF} > 0`, 'PUSHES FORWARD'], [`\\text{slope} = 0 \\Rightarrow ${kF} = 0`, 'BOTTOM OF A BOWL']];
$('#lks').innerHTML = LK.map(([f, tg], i) => `<div class="lk" id="lk${i}" style="top:${84 + i * 112}px;height:92px"><div class="n" style="top:22px">${i + 1}</div><div class="fx2" style="top:22px;font-size:32px">${K(f)}</div><div class="tg" id="lt${i}" style="top:24px">${tg}</div></div>`).join('');
const tLk = [T0('R2'), T0('R3'), T0('R4'), T0('R5')];
const rg = PUC.graph($('#rrS'), { x: 100, y: 90, w: 600, h: 260, xmax: 6, ymax: 5.5, xt: [0, 3, 6], yt: [], xl: 'x', yl: 'U' });
const Ur = x => 0.5 * (x - 3) * (x - 3) + 0.5, dUr = x => (x - 3);
const rC = rg.curve(EN), rD = rg.dot(EN, 12);
const rTan = mk($('#rrS'), 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0 });
mk($('#rrS'), 'line', { x1: 100, y1: 430, x2: 700, y2: 430, stroke: C.ink, 'stroke-width': 2 }); txt($('#rrS'), 700, 460, 'x', { 'text-anchor': 'end' });
const rP = mk($('#rrS'), 'circle', { cy: 430, r: 12, fill: C.ink }), rF = PUC.arrow($('#rrS'), FC, 6, 18), rFl = it($('#rrS'), 0, 400, '', FC, { 'font-size': 22, 'text-anchor': 'middle' });
const rX = M.keys([[0, 4.8], [T0('R4') - 0.3, 1.2], [T0('R5') + 0.5, 3]], 1.2, M.io);
const th2 = PUC.think($('#th2'), { q: 'On a U-x graph, U drops steeply as x increases. Which way does the force point?', opts: ['Along +x', 'Along -x'], right: 0, why: 'Toward lower U. And a steeper slope means a bigger force.' });

/* ---------- W ---------- */
$('#wkq').innerHTML = `A particle has ${K(`${kU} = (3${kx}^{2} - 12${kx})\\ \\text{J}`)}. Find the force at ${K(tc(DC, 'x = 1\\ \\text{m}'))}, and where the force is zero.`;
const wsol = PUC.solution($('#wl'), [
  [K(`${kF} = -\\dfrac{d${kU}}{${kdx}}`)],
  [K(`\\dfrac{d${kU}}{${kdx}} = 6${kx} - 12 \\Rightarrow ${kF} = 12 - 6${kx}`)],
  [K(`${kx} = 1: \\; ${kF} = ${tc(FC, '+6\\ \\text{N}')} \\;(\\text{along } +x)`)],
  [K(`${kF} = 0 \\text{ at } ${tc(DC, 'x = 2\\ \\text{m}')}`)]], { label: 'WORKED EXAMPLE', y0: 210, dy: 92 });
$('#wl .lbl').style.top = '30px';
const wg = PUC.graph($('#wrS'), { x: 120, y: 90, w: 560, h: 300, xmax: 4.4, ymin: -13, ymax: 4, xt: [0, 1, 2, 3, 4], yt: [-12, 0], xl: 'x (m)', yl: 'U (J)' });
const Uw = x => 3 * x * x - 12 * x, dUw = x => 6 * x - 12;
const wC = wg.curve(EN), wD = wg.dot(EN, 11);
const wTan = mk($('#wrS'), 'line', { stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '6 6', opacity: 0 });
const wF = PUC.arrow($('#wrS'), FC, 6, 18), wFl = it($('#wrS'), 0, 0, '', FC, { 'font-size': 22, 'text-anchor': 'middle' });
const wX = M.keys([[0, 1], [T0('W6') + 0.3, 2]], 1.2, M.io);
const tW = [T0('W3'), wt('W4', 'So'), T0('W5'), T0('W6')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'F = +dU/dx, so F = -6 N at x = 1 m', right: 'F = -dU/dx = +6 N: toward lower U' });
const tg = PUC.graph($('#tpS'), { x: 60, y: 40, w: 400, h: 170, xmax: 4.4, ymin: -13, ymax: 4, xt: [], yt: [] });
tg.curve(EN, 4)(q => [q, Uw(q)], 0, 4.2); const tD = mk($('#tpS'), 'circle', { cx: tg.X(1), cy: tg.Y(Uw(1)), r: 10, fill: EN });
const tFw = PUC.arrow($('#tpS'), C.red, 5, 16), tFr = PUC.arrow($('#tpS'), FC, 6, 18);
const where = PUC.where($('#wa'), { on: [], type: 'U given as a formula or a graph: find the force or the work done' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800, cols: 2, optW: 474, optH: 80, optFs: 30, optY: 370,
  q: `<i style="color:${EN}">U</i> = (<i>x</i>² - 4<i>x</i>) J. A particle moves from <i>x</i> = 1 m to <i>x</i> = 4 m. Find the work done by the force, and the force at <i>x</i> = 4 m.`,
  opts: ['-3 J and -4 N', '+3 J and +4 N', '-3 J and +4 N', '+3 J and -4 N'], right: 0 });
const so = PUC.solution($('#so'), [[K(`${kU}(1) = -3,\\;\\; ${kU}(4) = 0`)], [K(`\\Delta ${kU} = +3\\ \\text{J}`)], [K(`${kW} = -\\Delta ${kU} = ${tc(C.ok, '-3\\ \\text{J}')}`)], [K(`${kF} = -(2${kx} - 4) = ${tc(C.ok, '-4\\ \\text{N}')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'So'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · potential energy', y0: 100, dy: 88, txt: [0, 1, 1, 1],
  lines: [K(`${kW}_{${tc(FC, 'F')}} = -\\Delta ${kU} \\qquad ${kF} = -\\tfrac{d${kU}}{${kdx}}`),
    `<i>U</i>: energy stored by <b>position</b> or <b>shape</b>, in joules`,
    `Force does <b>+</b> work: U falls &nbsp;·&nbsp; <b>-</b> work: U rises`,
    `Force points toward <b>lower U</b>; flat slope: F = 0`] });
const YQ = ['Where is the energy in a stretched catapult that is not moving?', 'Gravity does 10 J of work on a falling ball. What happens to its U?', 'Why does F = -dU/dx carry a minus sign?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 79', topic: 'How much energy does height give? Gravitational Potential Energy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S6') - 0.2, 1.06, 960, 540], [T0('S8') - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = 1; let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const sj = $('#subj'), bp = $('#bpill'); bp.style.left = (1760 - sj.offsetWidth - 16 - bp.offsetWidth) + 'px'; bp.style.top = '96px';
}
const tanLine = (el, gg, f, df, x, half) => { const y = f(x), m = df(x); attr(el, 'x1', gg.X(x - half).toFixed(1)); attr(el, 'y1', gg.Y(y - m * half).toFixed(1)); attr(el, 'x2', gg.X(x + half).toFixed(1)); attr(el, 'y2', gg.Y(y + m * half).toFixed(1)); };

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
    JOBS.forEach((_, i) => { vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); vis($('#jv' + i), t, wt('H2', 'moving') + i * 0.12, 1e9, { ...POP, sc: 0.5 }); });
    vis($('#hjP'), t, wt('H2', 'ready') - 0.1, 1e9, POP);
    vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); vis($('#hkA'), t, tH3 + 0.15, 1e9, { dx: -40, dy: 0 });
    const fl = M.clamp((t - tFly) / 0.6), sx = 276 + (fl > 0 ? 80 + 500 * fl : 0), sy = 330 - (fl > 0 ? 300 * fl - 180 * fl * fl : 0);
    attr(hBand, 'd', fl > 0 ? 'M306,300 L330,315 L354,300' : 'M306,300 L276,330 L354,300'); attr(hStone, 'cx', sx.toFixed(1)); attr(hStone, 'cy', sy.toFixed(1)); M.hide(hStone, fl >= 1);
    vis(hWater, t, wt('H4', 'gushes') - 0.2, 1e9, { dy: 0 });
    TILES.forEach((_, i) => vis($('#wq' + i), t, tTile[i] - 0.1, 1e9, POP));
    const e2 = M.io((t - wt('H5', 'stored')) / 0.3); $('#wq2').style.background = mix(C.soft, EN, e2); $('#wq2').style.color = mix(C.ink, '#FFFFFF', e2);
    if (e2 > 0.5) M.setT($('#wq2').querySelector('span'), 'Stored: potential energy');
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    vis($('#pdef'), t, wt('P2', 'stored') - 0.1, 1e9, { dy: 14 });
    MT.forEach((_, k) => { const el = $('#mt' + k); vis(el, t, tMt[k] - 0.1, 1e9, POP); vis(el.querySelector('.mw'), t, tMt[k] + 0.3, 1e9, { ...POP, sc: 0.4 }); });
    vis($('#pm'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    vis($('#kBig'), t, T0('P4') + 0.1, 1e9, { dy: 20 }); vis($('#kSub'), t, wt('P4', 'possible') - 0.1, 1e9, { dy: 10 });
    vis($('#pc0'), t, wt('P5', 'symbol') - 0.1, 1e9, POP); vis($('#pc1'), t, wt('P5', 'joules') - 0.2, 1e9, POP); vis($('#pc2'), t, wt('P5', 'joules') + 0.5, 1e9, POP);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tC1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('C1');
    vis($('#sim'), t, tS1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#ro'), t, tS1 + 0.25, out, { dx: 60, dy: 0, ...o });
    vis($('#gr'), t, tS1 + 0.4, out, { dy: 36, ...o });
    const tauR = relTau(t), rel = tauR >= 0, tau = rel ? Math.round(tauR * 100000) / 100000 : 0;
    const R = rel ? relState(tau) : { sx: stretchPull(t), v: 0, xs: 0 }, sx = R.sx, v = R.v;
    const px = FX0 - sx * PXM, stx = rel && tau > TL ? FX0 + R.xs * PXM + 13 : px - 6;
    attr(band, 'd', `M${tipA[0]},${tipA[1]} L${px.toFixed(1)},${PY} L${tipB[0]},${tipB[1]}`); attr(pouch, 'x', (px - 14).toFixed(1));
    attr(stone, 'cx', stx.toFixed(1)); vis(stone, t, tS1 + 0.5, 1e9, { dy: 0, fade: 0.1 });
    const mv = rel && (t >= rp ? t - rp < 9 : t - tRel < 0.4);
    sGh.forEach((gh, k) => { const q = relTau(t - (t >= rp ? 0.15 : 0.01) * (k + 1)); const R2 = q >= 0 ? relState(q) : { sx: 0.2, xs: 0 }; attr(gh, 'cx', (q > TL ? FX0 + R2.xs * PXM + 13 : FX0 - R2.sx * PXM - 6).toFixed(1)); gh.style.opacity = mv && q >= 0 && q < tau - 1e-6 ? [0.3, 0.2, 0.12][k] : 0; });
    const holding = !rel && t > tPull - 0.6; attr(hand, 'x', (px - 54).toFixed(1)); M.hide(hand, !holding);
    const F = 200 * sx;
    aB.set(px + 14, PY - 50, px + 14 + F * 2.6, PY - 50); attr(lB, 'x', (px + 14 + F * 1.3).toFixed(1)); attr(lB, 'y', PY - 64); lB.style.opacity = F > 1 ? 1 : 0;
    aH.set(px - 30, PY + 54, px - 30 - (holding ? F * 2.6 : 0), PY + 54); attr(lH, 'x', (px - 30 - F * 1.3).toFixed(1)); attr(lH, 'y', PY + 86); lH.style.opacity = holding && F > 1 ? 1 : 0;
    aV.set(stx + 16, PY, stx + 16 + v * 9, PY); attr(lV, 'x', (stx + 22 + v * 9).toFixed(1)); attr(lV, 'y', PY - 10); lV.style.opacity = v > 0.2 ? 1 : 0;
    vis($('#smo'), t, rp - 0.4, T0('C1') - 0.4, { ...POP, sc: 0.8 });
    const U = 100 * sx * sx, Kk = rel ? 4 - U : 0;
    EB.forEach((b, k) => { const e = k ? Kk : U; attr(b.r, 'width', (e * 100).toFixed(1)); M.setT(b.v, `${f2(e)} J`); });
    M.setT($('#r_t'), f1(tau * 1000)); M.setT($('#r_x'), f2(sx)); M.setT($('#r_f'), f1(F)); M.setT($('#r_v'), f2(v)); M.setT($('#r_u'), f2(U)); M.setT($('#r_k'), f2(Kk));
    const pullMax = rel ? 0.2 : sx; gU(q => [q, 100 * q * q], 0, pullMax); gd(sx, U, t > tPull - 0.3);
    gK(q => [q, 4 - 100 * q * q], rel ? sx : 0.2, 0.2); gdK(sx, Kk, rel);
    gSum.style.opacity = M.io((t - wt('S8', 'zero')) / 0.4) * 0.8; vis($('#gTag'), t, wt('S8', 'four') - 0.1, 1e9, POP);
    vis(gLU, t, tPull + 3, 1e9, { dy: 0 }); vis(gLK, t, wt('S7', 'kinetic'), 1e9, { dy: 0 });
    avD(t, wt('S8', 'leaves') - 0.2, out);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tD1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    vis($('#cm'), t, tC1 + 0.2, out, { dx: -60, dy: 0, ...o }); vis($('#cv'), t, tC1 + 0.4, out, { dx: 60, dy: 0, ...o });
    CS.forEach((c, k) => {
      const P = cPos(k, t), hgt = (CY0 - P.y) / 120; attr(c.b, 'cy', P.y.toFixed(1));
      const mvv = k ? (t > tCd && P.y < CY0 - 0.5) : (P.v > 0);
      c.gh.forEach((gh, j) => { const P2 = cPos(k, t - 0.1 * (j + 1)); attr(gh, 'cy', P2.y.toFixed(1)); gh.style.opacity = mvv && Math.abs(P2.y - P.y) > 2 ? [0.3, 0.2, 0.12][j] : 0; });
      const on = M.o3((t - (k ? T0('C3') : T0('C2')) - 0.3) / 0.4);
      c.w.set(300, P.y + 26, 300, P.y + 26 + 80 * on); attr(c.lw, 'x', 314); attr(c.lw, 'y', (P.y + 90).toFixed(1)); c.lw.style.opacity = on.toFixed(3);
      const vl = k ? Math.min(P.v, 6.3) * 12 : P.v * 70; c.v.set(250, P.y, 250, P.y + (k ? vl : -vl)); attr(c.lv, 'x', 214); attr(c.lv, 'y', (P.y + (k ? 40 : -20)).toFixed(1)); c.lv.style.opacity = vl > 4 ? 1 : 0;
      const hb = 300 * hgt / 2; attr(c.bar, 'y', (440 - hb).toFixed(1)); attr(c.bar, 'height', hb.toFixed(1));
      vis($(k ? '#cvR' : '#cmR'), t, wt(k ? 'C3' : 'C2', k ? 'positive' : 'negative') - 0.1, 1e9, POP);
    });
    vis($('#th1'), t, tC4 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tC4, tOpts: wt('C4', 'Does') - 0.1, tCount: T1('C4') + 0.05, dur: 3, tAns: T0('C5') - 0.02, tWhy: wt('C5', 'force') });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    vis($('#dl'), t, tD1 + 0.05, 1e9, { dx: -60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#dst' + i); vis(el.querySelector('.n'), t, tStep[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tStep[i], 0.8); vis(el.querySelector('.why'), t, tStep[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(84, [[tStep[1] - 0.1, 204], [tStep[2] - 0.1, 324], [tStep[3] - 0.1, 444]], M.SOFT)(t);
    const hb = $('#hiB'); vis(hb, t, tStep[0] - 0.1, T0('D6') - 0.2, { dy: 0, fade: 0.2, ody: 0 }); hb.style.top = (hiY - 10).toFixed(1) + 'px'; hb.style.height = (hiY > 400 ? 128 : 112) + 'px';
    vis($('#dr'), t, tD1 + 0.3, 1e9, { dx: 60, dy: 0 });
    dL(q => [q, 0.9 * q], 0, 4.8 * M.io((t - wt('D6', 'U') + 0.1) / 0.8)); vis(dSl, t, wt('D6', 'h', 1), 1e9, { dy: 6 });
    vis(dBall, t, tD1 + 0.7, 1e9, { dy: 0 }); vis(dUp, t, wt('D6', 'up'), 1e9, { dy: 0 });
    const uw = M.o3((t - wt('D6', 'minus') + 0.1) / 0.5); dW.set(600, 194, 600, 194 + 90 * uw); dWl.style.opacity = uw.toFixed(3);
    vis($('#kbx'), t, wt('D6', 'minus') - 0.3, 1e9, { dy: 0, fade: 0.2 }); const e = $('#dsu0'); vis(e.querySelector('.n'), t, wt('D6', 'minus') - 0.3, 1e9, { ...POP, sc: 0.4 }); PUC.write(e.querySelector('.sx'), t, wt('D6', 'minus') - 0.2, 0.8); vis(e.querySelector('.why'), t, wt('D6', 'Downwards') - 0.1, 1e9, { dx: -12, dy: 0 });
  }

  /* statement */
  const stOn = t >= tT && t < tR1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tR1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); PUC.write($('#stF'), t, wt('T1', 'force') - 0.1, 0.8);
    M.rise($('#st2'), t, wt('T1', 'always') - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tW1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    vis($('#rl'), t, tR1 + 0.1, out, { dx: -60, dy: 0, ...o });
    LK.forEach((_, i) => { const el = $('#lk' + i); vis(el, t, tLk[i] - 0.1, 1e9, { dy: 16 }); PUC.write(el.querySelector('.fx2'), t, tLk[i] + 0.2, 0.7); vis($('#lt' + i), t, tLk[i] + 0.9, 1e9, { ...POP, sc: 0.5 }); });
    vis($('#rr'), t, tR1 + 0.3, out, { dx: 60, dy: 0, ...o }); vis($('#exR'), t, tR1 + 0.6, 1e9, { dy: 8 });
    rC(q => [q, Ur(q)], 0, 6 * M.io((t - tR1 - 0.5) / 1.0));
    const xr = rX(t), on = t > T0('R2') - 0.2; rD(xr, Ur(xr), on); attr(rP, 'cx', rg.X(xr).toFixed(1)); M.hide(rP, !on);
    tanLine(rTan, rg, Ur, dUr, xr, 0.9); rTan.style.opacity = on ? 0.8 : 0;
    const Fv = -dUr(xr), fo = M.o3((t - T0('R3') + 0.2) / 0.5); rF.set(rg.X(xr), 430, rg.X(xr) + Fv * 60 * fo, 430); M.setT(rFl, Math.abs(Fv) < 0.05 ? 'F = 0' : 'F'); attr(rFl, 'x', (rg.X(xr) + Fv * 30).toFixed(1)); rFl.style.opacity = fo.toFixed(3);
    vis($('#rrP'), t, wt('R5', 'bowl') - 0.1, 1e9, POP);
    vis($('#th2'), t, tK1 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tK1, tOpts: wt('K1', 'Which') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Toward') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    vis($('#wkq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    wC(q => [q, Uw(q)], 0, 4.2 * M.io((t - T0('W2') - 0.5) / 1.2));
    const xw = wX(t), on = t > T0('W3'); wD(xw, Uw(xw), on); tanLine(wTan, wg, Uw, dUw, xw, 0.6); wTan.style.opacity = on ? 0.8 : 0;
    const Fv = -dUw(xw), fo = M.o3((t - T0('W5') + 0.2) / 0.5); wF.set(wg.X(xw), wg.Y(Uw(xw)) - 30, wg.X(xw) + Fv * 12 * fo, wg.Y(Uw(xw)) - 30);
    M.setT(wFl, Math.abs(Fv) < 0.1 ? 'F = 0' : `F = +${f1(Fv)} N`); attr(wFl, 'x', (wg.X(xw) + Math.max(Fv, 0) * 6).toFixed(1)); attr(wFl, 'y', (wg.Y(Uw(xw)) - 48).toFixed(1)); wFl.style.opacity = fo.toFixed(3);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'drop') - 0.2, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Keep') });
    const uw = M.o3((t - wt('X2', 'minus', 1) + 0.1) / 0.4) * (1 - M.io((t - wt('X3', 'But')) / 0.3)); tFw.set(tg.X(1) - 14, tg.Y(Uw(1)) - 26, tg.X(1) - 14 - 70 * uw, tg.Y(Uw(1)) - 26);
    const ur = M.o3((t - wt('X3', 'lower') + 0.1) / 0.4); tFr.set(tg.X(1) + 14, tg.Y(Uw(1)) - 26, tg.X(1) + 14 + 80 * ur, tg.Y(Uw(1)) - 26);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'questions') });
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
