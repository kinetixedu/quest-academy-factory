// PUC Maths Ep 84: Derivative from first principles (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Ch 12): function f and its curve blue, point x violet, step h orange, secant (average) teal, tangent / derivative coral
const FC = '#2F6FEB', XC = C.violet, HC = C.orange, SC = C.teal, DC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const F = s => `\\textcolor{${FC}}{${s}}`, X = s => `\\textcolor{${XC}}{${s}}`, H = s => `\\textcolor{${HC}}{${s}}`, S = s => `\\textcolor{${SC}}{${s}}`, D = s => `\\textcolor{${DC}}{${s}}`, red = s => `\\textcolor{${C.red}}{${s}}`;
const fx = `${F('f')}(${X('x')})`, fxh = `${F('f')}(${X('x')} + ${H('h')})`;
const quot = `\\dfrac{${fxh} - ${fx}}{${H('h')}}`;
const DEF = `${D("f'(x)")} = \\lim\\limits_{${H('h')} \\to 0} ${quot}`;
// a straight line through (x0, y0) with slope m, clipped to the plot box
const seg = (el, g, x0, y0, m, xa, xb, y0b, y1b) => {
  let a = xa, b = xb; if (Math.abs(m) > 1e-6) { const lo = x0 + (y0b - y0) / m, hi = x0 + (y1b - y0) / m; a = Math.max(a, Math.min(lo, hi)); b = Math.min(b, Math.max(lo, hi)); }
  attr(el, 'x1', g.X(a).toFixed(1)); attr(el, 'y1', g.Y(y0 + m * (a - x0)).toFixed(1)); attr(el, 'x2', g.X(b).toFixed(1)); attr(el, 'y2', g.Y(y0 + m * (b - x0)).toFixed(1));
};
const pathOf = (g, fn, a, b, n = 80) => { let d = ''; for (let i = 0; i <= n; i++) { const u = a + (b - a) * i / n; d += (i ? 'L' : 'M') + g.X(u).toFixed(1) + ',' + g.Y(fn(u)).toFixed(1); } return d; };

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tP1 = T0('P1'), tD1 = T0('D1'), tC1 = T0('C1'), tC3 = T0('C3'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['SPEEDOMETER', '40 km/h'], ['SPEED', 'distance ÷ time'], ['ONE INSTANT', 'time = 0 s']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
const tLs = [wt('H1', 'forty'), wt('H2', 'distance'), wt('H2', 'passes')];

/* ---------- H: speedometer dial ---------- */
const hg = $('#hG'), GX = 392, GY = 300, GR = 180, ang = v => Math.PI * (1 - v / 80);
mk(hg, 'path', { d: `M${GX - GR},${GY} A${GR},${GR} 0 0 1 ${GX + GR},${GY}`, fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' });
for (let v = 0; v <= 80; v += 10) { const a = ang(v), c = Math.cos(a), s = Math.sin(a); mk(hg, 'line', { x1: GX + c * (GR - 6), y1: GY - s * (GR - 6), x2: GX + c * (GR - (v % 20 ? 20 : 30)), y2: GY - s * (GR - (v % 20 ? 20 : 30)), stroke: C.ink, 'stroke-width': v % 20 ? 2 : 3.5 }); if (v % 20 === 0) txt(hg, GX + c * (GR - 58), GY - s * (GR - 58) + 7, v, { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 }); }
const ndl = mk(hg, 'line', { x1: GX, y1: GY, x2: GX - GR + 40, y2: GY, stroke: DC, 'stroke-width': 7, 'stroke-linecap': 'round' });
mk(hg, 'circle', { cx: GX, cy: GY, r: 14, fill: C.ink });
$('#hF').innerHTML = K(`\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}} = \\dfrac{${red('0')}}{${red('0')}}\\ ${red('?')}`);
const hSpd = t => 40 * M.io((t - tMorph - 0.3) / 1.2) + 0.6 * Math.sin((t - tMorph) * 2.2) * M.clamp((t - tMorph - 1.5) / 0.5);

/* ---------- P: falling ball s = 4.9 t^2 ---------- */
const sF = u => 4.9 * u * u;
$('#pS0').innerHTML = K(`${F('s')} = 4.9\\,${X('t')}^2 \\quad \\text{at } ${X('t')} = 2`);
const PR = [['1', '24.5'], ['0.1', '20.09'], ['0.01', '19.649'], ['0.001', '19.6049']];
$('#pRows').innerHTML = PR.map(([h, v], i) => `<div class="tr" id="pr${i}" style="top:${212 + i * 64}px"><b style="left:24px;color:var(--hh)">${h}</b><b style="left:384px;color:var(--sc)">${v}</b></div>`).join('');
$('#pRes').innerHTML = `Speed at one instant: ${K(`\\to ${D('19.6')}`)} m/s`;
const pg = PUC.graph($('#pG'), { x: 110, y: 96, w: 600, h: 400, xmax: 3.45, ymax: 50, xt: [0, 1, 2, 3], yt: [0, 10, 20, 30, 40, 50], xl: 't (s)' });
const pCurve = mk($('#pG'), 'path', { d: pathOf(pg, sF, 0, 3.19), fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pSec = mk($('#pG'), 'line', { stroke: SC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const pTan = mk($('#pG'), 'line', { stroke: DC, 'stroke-width': 4, 'stroke-linecap': 'round' });
seg(pTan, pg, 2, sF(2), 19.6, 0.9, 3.2, 0, 50);
const pP = mk(mk($('#pG'), 'g', {}), 'g', {}); mk(pP, 'circle', { cx: pg.X(2), cy: pg.Y(sF(2)), r: 11, fill: XC });
const pQ = mk($('#pG'), 'circle', { r: 10, fill: '#fff', stroke: HC, 'stroke-width': 4 });
const pQd = mk($('#pG'), 'line', { stroke: HC, 'stroke-width': 2, 'stroke-dasharray': '6 5' });
const pT2 = txt($('#pG'), pg.X(2), pg.Y(0) + 56, 't = 2', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });
const tH0 = wt('P5', 'tenth'), tH1 = wt('P5', 'hundredth'), tH2 = wt('P6', 'shrinks');
const pH = t => Math.pow(10, -M.io((t - tH0) / 0.7) - M.io((t - tH1) / 0.7) - M.io((t - tH2) / 1.6));
const tPr = [wt('P4', 'twenty'), wt('P5', 'twenty'), wt('P5', 'nineteen'), tH2 + 1.2];

/* ---------- D: the hill ---------- */
const fH = u => 1 + 1.2 * u - 0.13 * u * u, x0 = 1.5;
const dg = PUC.graph($('#dG'), { x: 90, y: 110, w: 620, h: 380, xmax: 7, ymax: 5 });
const dCurve = mk($('#dG'), 'path', { d: pathOf(dg, fH, 0, 6.8), fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dV1 = mk($('#dG'), 'line', { x1: dg.X(x0), y1: dg.Y(0), x2: dg.X(x0), y2: dg.Y(fH(x0)), stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const dL1 = txt($('#dG'), dg.X(x0) - 12, dg.Y(fH(x0) / 2), 'f(x)', { 'text-anchor': 'end', 'font-size': 22, fill: FC, 'font-weight': 600 });
const dXl = txt($('#dG'), dg.X(x0), dg.Y(0) + 34, 'x', { 'text-anchor': 'middle', 'font-size': 24, fill: XC, 'font-weight': 600, 'font-style': 'italic', 'font-family': 'Poppins' });
const dV2 = mk($('#dG'), 'line', { stroke: FC, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' });
const dL2 = txt($('#dG'), 0, 0, 'f(x+h)', { 'font-size': 22, fill: FC, 'font-weight': 600 });
const dRun = mk($('#dG'), 'line', { stroke: HC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dRunL = txt($('#dG'), 0, 0, 'h = run', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 });
const dRise = mk($('#dG'), 'line', { stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' });
const dRiseL = txt($('#dG'), 0, 0, 'rise', { 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const dSec = mk($('#dG'), 'line', { stroke: SC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const dSecL = txt($('#dG'), dg.X(5.1), dg.Y(0.7), 'secant', { 'text-anchor': 'middle', 'font-size': 22, fill: SC, 'font-weight': 600 });
const dTan = mk($('#dG'), 'line', { stroke: DC, 'stroke-width': 4, 'stroke-linecap': 'round' });
seg(dTan, dg, x0, fH(x0), 1.2 - 0.26 * x0, 0, 4.6, 0, 5);
const dTanL = txt($('#dG'), dg.X(5.1), dg.Y(0.7), "tangent: slope f'(x)", { 'text-anchor': 'middle', 'font-size': 22, fill: DC, 'font-weight': 600 });
const dP = mk(mk($('#dG'), 'g', {}), 'g', {}); mk(dP, 'circle', { cx: dg.X(x0), cy: dg.Y(fH(x0)), r: 11, fill: XC });
const dQ = mk($('#dG'), 'circle', { r: 10, fill: '#fff', stroke: HC, 'stroke-width': 4 });
const DS = [`\\text{height at } ${X('x')}:\\ \\ ${fx}`, `\\text{height at } ${X('x')} + ${H('h')}:\\ \\ ${fxh}`, `\\text{rise} = ${fxh} - ${fx}`, `${S('\\text{slope}')} = ${quot}`, DEF];
const DY = [84, 168, 252, 330, 456], DHh = [72, 72, 72, 112, 112];
$('#dSt').innerHTML = DS.map((f, i) => `<div class="st${i > 2 ? ' tall' : ''}" id="ds${i}" style="top:${DY[i]}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div></div>`).join('');
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5'), T0('D6')];
const tSh0 = wt('D6', 'shrink'), tSh1 = wt('D6', 'tangent');
const dH = t => 2.5 - 2.47 * M.io((t - tSh0) / Math.max(0.8, tSh1 - tSh0));

/* ---------- C: side by side ---------- */
$('#c1F').innerHTML = K(`${S('\\text{average}')} = ${quot}`);
$('#c2F').innerHTML = K(`${D("f'(x)")} = \\lim\\limits_{${H('h')} \\to 0} ${quot}`);
const mini = (svg, tan) => { const g = PUC.graph(svg, { x: 330, y: 270, w: 400, h: 170, xmax: 7, ymax: 5 }); mk(svg, 'path', { d: pathOf(g, fH, 0, 6.8), fill: 'none', stroke: FC, 'stroke-width': 4 });
  const l = mk(svg, 'line', { stroke: tan ? DC : SC, 'stroke-width': 4, 'stroke-linecap': 'round' }); const m = tan ? 1.2 - 0.26 * x0 : (fH(x0 + 2.5) - fH(x0)) / 2.5; seg(l, g, x0, fH(x0), m, 0, tan ? 4.6 : 5.6, 0, 5);
  mk(svg, 'circle', { cx: g.X(x0), cy: g.Y(fH(x0)), r: 9, fill: XC }); if (!tan) mk(svg, 'circle', { cx: g.X(x0 + 2.5), cy: g.Y(fH(x0 + 2.5)), r: 8, fill: '#fff', stroke: HC, 'stroke-width': 3.5 }); return l; };
const c1L = mini($('#c1S'), 0), c2L = mini($('#c2S'), 1);
const avA = PUC.avatar($('#sC'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'A tangent is a secant with no gap left.' });
const th1 = PUC.think($('#th1'), { q: 'In the fraction, can we put h = 0 right away?', opts: ['Yes', 'No: we get 0/0'], right: 1, why: 'Top and bottom both become 0. Simplify first, then let h go to 0.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(DEF);

/* ---------- W ---------- */
$('#wq').innerHTML = `Find the derivative of ${K(`${F('f')}(${X('x')}) = ${X('x')}^2`)} from first principles.`;
const wsol = PUC.solution($('#wl'), [
  [K(`(${X('x')} + ${H('h')})^2 = ${X('x')}^2 + 2${X('x')}${H('h')} + ${H('h')}^2`)],
  [K(`${fxh} - ${fx} = 2${X('x')}${H('h')} + ${H('h')}^2`)],
  [K(`\\div ${H('h')}:\\ \\ 2${X('x')} + ${H('h')}`)],
  [K(`${H('h')} \\to 0:\\ \\ \\tfrac{d}{dx}(${X('x')}^2) = ${D('2x')}`)],
  [K(`\\text{at } ${X('x')} = 3:\\ \\ \\text{slope} = ${D('6')}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const sq = u => u * u, wg = PUC.graph($('#wG'), { x: 110, y: 110, w: 600, h: 380, xmax: 4.2, ymax: 18, xt: [0, 1, 2, 3, 4], yt: [0, 6, 12, 18], xl: 'x' });
const wCurve = mk($('#wG'), 'path', { d: pathOf(wg, sq, 0, 4.2), fill: 'none', stroke: FC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const wSec = mk($('#wG'), 'line', { stroke: SC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const wTan = mk($('#wG'), 'line', { stroke: DC, 'stroke-width': 4, 'stroke-linecap': 'round' }); seg(wTan, wg, 3, 9, 6, 1.5, 4.2, 0, 18);
const wRun = mk($('#wG'), 'line', { x1: wg.X(3), y1: wg.Y(9), x2: wg.X(4), y2: wg.Y(9), stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const wRise = mk($('#wG'), 'line', { x1: wg.X(4), y1: wg.Y(9), x2: wg.X(4), y2: wg.Y(15), stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
const wRunL = txt($('#wG'), wg.X(3.5), wg.Y(9) + 30, 'run 1', { 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, 'font-weight': 600 });
const wRiseL = txt($('#wG'), wg.X(4) + 12, wg.Y(12) + 7, 'rise 6', { 'font-size': 20, fill: DC, 'font-weight': 600 });
const wP = mk(mk($('#wG'), 'g', {}), 'g', {}); mk(wP, 'circle', { cx: wg.X(3), cy: wg.Y(9), r: 11, fill: XC });
const wQ = mk($('#wG'), 'circle', { r: 10, fill: '#fff', stroke: HC, 'stroke-width': 4 });
const tWh0 = T0('W5'), tWh1 = wt('W6', 'zero');
const wH = t => 1 - M.io((t - tWh0) / Math.max(0.8, tWh1 - tWh0));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${F('f')}(${X('x')} + ${H('h')}) = ${X('x')}^2 ${red('+\\,h')}`), right: K(`${F('f')}(${X('x')} + ${H('h')}) = (${X('x')} + ${H('h')})^2 = ${X('x')}^2 + 2${X('x')}${H('h')} + ${H('h')}^2`), y0: 70, y1: 168 });
$('#tR').innerHTML = `<div class="lbl" style="position:static">TEST IT: x = 3, h = 1</div><div class="k" id="tR1">${K(`${X('x')}^2 + ${H('h')} = 10 \\quad ${red('\\times')}`)}</div><div class="k" id="tR2">${K(`(${X('x')} + ${H('h')})^2 = 16 \\quad \\textcolor{${C.ok}}{\\checkmark}`)}</div>`;
$('#tR').style.top = '40px';
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'A derivative hidden inside a limit: spot f(a + h) - f(a) over h.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 900,
  q: `For ${K('f(x) = x^3')}, find ${K(`\\lim\\limits_{h \\to 0} \\dfrac{f(2 + h) - f(2 - h)}{h}`)}`,
  opts: ['6', '12', '24', '0'], right: 2, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`(2+h)^3 - (2-h)^3`)], [K(`= 24h + 2h^3`)], [K(`\\div h:\\ 24 + 2h^2`)], [K(`h \\to 0:\\ \\ 24`)], [K(`= 2 f'(2),\\ \\text{gap is } 2h`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Expand'), wt('A2', 'twenty'), wt('A3', 'Divide'), wt('A4', 'Let'), wt('A4', 'twice')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 226, w: 1200, h: 560, title: 'Recap · derivative from first principles', y0: 104, dy: 92, txt: [0, 1, 0, 1, 0],
  lines: [K(`${D("f'(x)")} = \\lim\\limits_{${H('h')} \\to 0} \\tfrac{${fxh} - ${fx}}{${H('h')}}`),
    `<b style="color:${SC}">Secant</b> slope = average · <b style="color:${DC}">tangent</b> slope = one instant`,
    K(`\\tfrac{d}{dx}(${X('x')}^2) = ${D('2x')}`),
    '<b>Never</b> put h = 0 first: simplify, then let h go to 0',
    K(`\\lim\\limits_{${H('h')} \\to 0} \\tfrac{f(a + ${H('h')}) - f(a - ${H('h')})}{${H('h')}} = 2 ${D("f'(a)")}`)] });
const YQ = ['Why can we not put h = 0 straight away?', 'Find the derivative of 3x from first principles.', 'What does the slope of the tangent tell us?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 85', topic: 'Sum easy, product tricky: Algebra of Derivatives', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tSh0 - 0.3, 1.04, 960, 560], [T1('D7'), 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#hG'), t, tMorph + 0.2, 1e9, { dy: 0, fade: 0.3 });
    const v = hSpd(t), a = ang(v); attr(ndl, 'x2', (GX + Math.cos(a) * (GR - 40)).toFixed(1)); attr(ndl, 'y2', (GY - Math.sin(a) * (GR - 40)).toFixed(1));
    M.vis($('#hRd'), t, tMorph + 0.3, 1e9, { dy: 10 }); M.setT($('#hV'), String(Math.round(v)));
    PUC.write($('#hF'), t, wt('H4', 'Zero') - 0.1, 1.0);
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'how') - 0.1, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tD1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('D1');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pS0'), t, wt('P2', 'four') - 0.1, 0.9);
    $('#pa').querySelectorAll('.th').forEach(e => M.vis(e, t, wt('P3', 'gap') - 0.1, 1e9, { dy: 8 }));
    PR.forEach((_, i) => M.vis($('#pr' + i), t, tPr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#pRes'), t, wt('P6', 'nineteen') - 0.1, 1e9, POP);
    M.vis($('#pb'), t, T0('P2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.draw(pCurve, t, wt('P2', 'falls'), 1.0);
    M.vis(pP, t, wt('P3', 'exactly') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(pT2, t, wt('P3', 'exactly'), 1e9, { dy: 0 });
    const h = pH(t), m = 4.9 * (4 + h), qOn = t >= wt('P3', 'gap') - 0.1;
    attr(pQ, 'cx', pg.X(2 + h).toFixed(1)); attr(pQ, 'cy', pg.Y(sF(2 + h)).toFixed(1)); M.hide(pQ, !qOn);
    attr(pQd, 'x1', pg.X(2 + h).toFixed(1)); attr(pQd, 'x2', pg.X(2 + h).toFixed(1)); attr(pQd, 'y1', pg.Y(0)); attr(pQd, 'y2', pg.Y(sF(2 + h)).toFixed(1)); M.hide(pQd, !qOn || h < 0.05);
    seg(pSec, pg, 2, sF(2), m, 0.9, 3.2, 0, 50); M.vis(pSec, t, wt('P3', 'gap'), 1e9, { dy: 0, fade: 0.3 });
    M.vis(pTan, t, wt('P6', 'instant') - 0.2, 1e9, { dy: 0, fade: 0.4 });
    M.vis($('#pRh'), t, T0('P4') - 0.1, 1e9, { dy: 8 }); M.vis($('#pRv'), t, T0('P4') + 0.1, 1e9, { dy: 8 });
    M.setT($('#pHv'), h.toFixed(3)); M.setT($('#pVv'), m.toFixed(3));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tC1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('C1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    DS.forEach((_, i) => { const el = $('#ds' + i); M.vis(el.querySelector('.n'), t, tDs[i] - 0.15, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tDs[i] + 0.1, 0.9); });
    const k = tDs.reduce((a, tt, i) => t >= tt - 0.05 ? i : a, 0), hb = $('#dHi');
    M.vis(hb, t, tDs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (M.track(DY[0], tDs.slice(1).map((tt, i) => [tt - 0.05, DY[i + 1]]), M.SOFT)(t) - 6).toFixed(1) + 'px'; hb.style.height = DHh[k] + 'px';
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.draw(dCurve, t, wt('D1', 'curve'), 1.0);
    M.vis(dP, t, wt('D2', 'point') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis(dXl, t, wt('D2', 'point'), 1e9, { dy: 0 });
    M.vis(dV1, t, wt('D2', 'height') - 0.1, 1e9, { dy: 0 }); M.vis(dL1, t, wt('D2', 'height'), 1e9, { dy: 0 });
    const h = dH(t), x1 = x0 + h, lab = 1 - M.io((t - tSh0) / 0.4);
    attr(dQ, 'cx', dg.X(x1).toFixed(1)); attr(dQ, 'cy', dg.Y(fH(x1)).toFixed(1)); M.vis(dQ, t, wt('D3', 'step') - 0.1, 1e9, { dy: 0, fade: 0.1 });
    attr(dV2, 'x1', dg.X(x1).toFixed(1)); attr(dV2, 'x2', dg.X(x1).toFixed(1)); attr(dV2, 'y1', dg.Y(0)); attr(dV2, 'y2', dg.Y(fH(x1)).toFixed(1));
    attr(dL2, 'x', (dg.X(x1) + 12).toFixed(1)); attr(dL2, 'y', dg.Y(fH(x1) * 0.35).toFixed(1));
    const tNew = wt('D3', 'new');
    M.vis(dV2, t, tNew - 0.1, 1e9, { dy: 0 }); M.vis(dL2, t, tNew, 1e9, { dy: 0 }); if (t > tSh0) { dV2.style.opacity = lab.toFixed(3); dL2.style.opacity = lab.toFixed(3); }
    attr(dRun, 'x1', dg.X(x0)); attr(dRun, 'y1', dg.Y(fH(x0))); attr(dRun, 'x2', dg.X(x1).toFixed(1)); attr(dRun, 'y2', dg.Y(fH(x0)));
    attr(dRunL, 'x', ((dg.X(x0) + dg.X(x1)) / 2).toFixed(1)); attr(dRunL, 'y', dg.Y(fH(x0)) + 30);
    M.draw(dRun, t, wt('D3', 'size') - 0.1, 0.5); M.vis(dRunL, t, wt('D4', 'run') - 0.1, 1e9, { dy: 0 }); if (t > tSh0) dRunL.style.opacity = lab.toFixed(3);
    attr(dRise, 'x1', dg.X(x1).toFixed(1)); attr(dRise, 'y1', dg.Y(fH(x0))); attr(dRise, 'x2', dg.X(x1).toFixed(1)); attr(dRise, 'y2', dg.Y(fH(x1)).toFixed(1));
    attr(dRiseL, 'x', (dg.X(x1) - 64).toFixed(1)); attr(dRiseL, 'y', (dg.Y((fH(x0) + fH(x1)) / 2) + 8).toFixed(1));
    M.vis(dRise, t, wt('D4', 'rise') - 0.1, 1e9, { dy: 0 }); M.vis(dRiseL, t, wt('D4', 'rise'), 1e9, { dy: 0 }); if (t > tSh0) dRiseL.style.opacity = lab.toFixed(3);
    seg(dSec, dg, x0, fH(x0), (fH(x1) - fH(x0)) / h, 0, 6.6, 0, 5); M.vis(dSec, t, wt('D5', 'line') - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis(dSecL, t, wt('D5', 'secant') - 0.1, tSh1 - 0.2, { dy: 0 });
    M.vis(dTan, t, tSh1 - 0.1, 1e9, { dy: 0, fade: 0.4 }); M.vis(dTanL, t, tSh1, 1e9, { dy: 0 });
    M.vis($('#dRh'), t, wt('D3', 'size'), 1e9, { dy: 8 }); M.setT($('#dHv'), h.toFixed(2));
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C3');
    M.vis($('#c1'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#c1F'), t, wt('C1', 'Average') - 0.1, 0.9); M.vis($('#c1S'), t, wt('C1', 'graph') - 0.2, 1e9, { dy: 10 }); M.vis($('#c1P'), t, wt('C1', 'secant') - 0.2, 1e9, POP);
    M.vis($('#c2'), t, T0('C2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#c2F'), t, wt('C2', 'instant') - 0.1, 1.0); M.vis($('#c2S'), t, wt('C2', 'graph') - 0.2, 1e9, { dy: 10 }); M.vis($('#c2P'), t, wt('C2', 'tangent') - 0.2, 1e9, POP);
    avA(t, wt('C2', 'derivative') - 0.2, out);
    M.vis($('#th1'), t, tC3 + 0.05, OUT('T1') + 0.2, { dy: 36, ...o });
    th1(t, { tin: tC3, tOpts: wt('C3', 'put') - 0.1, tCount: T1('C3') + 0.05, dur: 3, tAns: T0('C4') - 0.02, tWhy: wt('C4', 'top') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Take') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'divide') - 0.1, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.draw(wCurve, t, T0('W2') + 0.7, 1.0);
    M.vis(wP, t, T0('W3') - 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    const h = wH(t); attr(wQ, 'cx', wg.X(3 + h).toFixed(1)); attr(wQ, 'cy', wg.Y(sq(3 + h)).toFixed(1));
    M.vis(wQ, t, T0('W3'), tWh1 + 0.2, { dy: 0, fade: 0.1 });
    seg(wSec, wg, 3, 9, 6 + h, 1.5, 4.2, 0, 18); M.vis(wSec, t, T0('W3') + 0.2, tWh1 + 0.3, { dy: 0, fade: 0.3 });
    M.vis(wTan, t, tWh1 - 0.1, 1e9, { dy: 0, fade: 0.4 });
    [wRun, wRise, wRunL, wRiseL].forEach((e, i) => M.vis(e, t, wt('W7', 'climbs') - 0.1 + i * 0.1, 1e9, { dy: 0 }));
    M.vis($('#wRh'), t, T0('W3') + 0.2, 1e9, { dy: 8 }); M.vis($('#wRs'), t, T0('W5'), 1e9, { dy: 8 });
    M.setT($('#wHv'), h.toFixed(2)); M.setT($('#wSv'), (6 + h).toFixed(2));
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'many') - 0.1, tStrike: wt('X3', 'means') - 0.1, tRight: wt('X3', 'So') - 0.1 });
    M.vis($('#tR'), t, wt('X3', 'With') - 0.1, 1e9, { dy: 10 }); M.vis($('#tR2'), t, wt('X3', 'sixteen') - 0.1, 1e9, { dy: 8 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE')], tType: wt('J1', 'hid') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'find'), tCount, tAns });
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
