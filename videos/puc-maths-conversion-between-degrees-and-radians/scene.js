// PUC Maths Ep 25: Conversion between degrees and radians (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (Chapter 3): radian measure / angle theta violet, degree measure gold, radius ink
const TH = C.violet, DG = C.gold;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const th = s => `\\textcolor{${TH}}{${s}}`, dg = s => `\\textcolor{${DG}}{${s}}`;
const f2 = v => v.toFixed(2);
const P = (cx, cy, R, a) => [cx + R * Math.cos(a), cy - R * Math.sin(a)];
const arcD = (cx, cy, R, a0, a1) => {
  if (a1 - a0 < 1e-4) return '';
  if (a1 - a0 >= 2 * Math.PI - 1e-4) { const [x, y] = P(cx, cy, R, a0), [x2, y2] = P(cx, cy, R, a0 + Math.PI); return `M${f2(x)},${f2(y)} A${R},${R} 0 1 0 ${f2(x2)},${f2(y2)} A${R},${R} 0 1 0 ${f2(x)},${f2(y)}`; }
  const [x0, y0] = P(cx, cy, R, a0), [x1, y1] = P(cx, cy, R, a1);
  return `M${f2(x0)},${f2(y0)} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 0 ${f2(x1)},${f2(y1)}`;
};
const wedgeD = (cx, cy, R, a0, a1) => `M${cx},${cy} L${P(cx, cy, R, a0).map(f2).join(',')} ${arcD(cx, cy, R, a0, a1).replace(/^M[^A]*/, '')} Z`;
const piName = a => { const q = a / (Math.PI / 2), r = Math.round(q); if (Math.abs(q - r) > 0.004 || r === 0) return ''; return [' = π/2', ' = π', ' = 3π/2', ' = 2π'][r - 1] || ''; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3');
const tC1 = T0('C1'), tL1 = T0('L1'), tV1 = T0('V1'), tU1 = T0('U1'), tK1 = T0('K1'), tT = T0('T1'), tS1 = T0('S1'), tS3 = T0('S3');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tS1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['HALF TURN', '180°', DG], ['SAME HALF TURN', 'π rad', TH], ['APP SAYS', '3 rad ?', C.ink]];
$('#lists').innerHTML = LS.map(([n, v, col], i) => `<div class="lst" id="ls${i}" style="left:${390 + i * 390}px"><div class="ln">${n}</div><div class="lv" style="color:${col}">${v}</div></div>`).join('');
const tLs = [wt('H1', 'hundred') - 0.05, wt('H1', 'pi') - 0.1, wt('H1', 'pi') + 0.5];

/* ---------- H: half a turn in both units ---------- */
const hs = $('#hS'), HX = 392, HY = 330, HR = 150;
mk(hs, 'circle', { cx: HX, cy: HY, r: HR, fill: 'none', stroke: C.line, 'stroke-width': 3 });
mk(hs, 'line', { x1: HX - HR - 30, y1: HY, x2: HX + HR + 30, y2: HY, stroke: C.line, 'stroke-width': 2 });
const hArc = mk(hs, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 7, 'stroke-linecap': 'round' });
const hRad = mk(hs, 'line', { x1: HX, y1: HY, x2: HX + HR, y2: HY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(hs, 'circle', { cx: HX, cy: HY, r: 7, fill: C.ink });
const hDot = mk(hs, 'circle', { cx: HX + HR, cy: HY, r: 11, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
const h3g = mk(mk(hs, 'g', {}), 'g', {}); const [h3x, h3y] = P(HX, HY, HR + 6, 3);
mk(h3g, 'line', { x1: HX, y1: HY, x2: f2(h3x), y2: f2(h3y), stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '7 6' });
txt(h3g, f2(h3x - 8), f2(h3y - 26), '3 rad ?', { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 });
const hA0 = tMorph + 0.5, hA1 = T0('H3') - 0.2;
const hAng = t => Math.PI * M.io((t - hA0) / (hA1 - hA0));

/* ---------- C: the one fact + dual dial ---------- */
const CS = [[`\\text{full turn} = ${dg('360^\\circ')} = ${th('2\\pi\\ \\text{rad}')}`, 'one turn, two units'],
  [`${th('2\\pi\\ \\text{rad}')} = ${dg('360^\\circ')}`, 'write it as one equation'],
  [`${th('\\pi\\ \\text{rad}')} = ${dg('180^\\circ')}`, 'halve both sides: the one fact']];
$('#cSt').innerHTML = CS.map(([f, w], i) => `<div class="pf" id="cs${i}" style="top:${84 + i * 112}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tCs = [wt('C2', 'degrees'), wt('C3', 'two'), wt('C4', 'Halve')];
const cs = $('#cS'), CX = 392, CY = 268, CR = 160;
mk(cs, 'circle', { cx: CX, cy: CY, r: CR, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
mk(cs, 'circle', { cx: CX, cy: CY, r: CR - 56, fill: 'none', stroke: mix(TH, '#FFFFFF', 0.55), 'stroke-width': 2 });
for (let d = 0; d < 360; d += 10) { const a = d * Math.PI / 180, L = d % 30 ? 8 : 16; const [x1, y1] = P(CX, CY, CR, a), [x2, y2] = P(CX, CY, CR + L, a); mk(cs, 'line', { x1: f2(x1), y1: f2(y1), x2: f2(x2), y2: f2(y2), stroke: DG, 'stroke-width': 2 }); if (d % 30 === 0) { const [lx, ly] = P(CX, CY, CR + 38, a); txt(cs, f2(lx), f2(ly + 7), d + '°', { 'text-anchor': 'middle', 'font-size': 18, fill: DG, 'font-weight': 600 }); } }
['0', 'π/2', 'π', '3π/2'].forEach((s, i) => { const a = i * Math.PI / 2, [x1, y1] = P(CX, CY, CR - 56, a), [x2, y2] = P(CX, CY, CR - 70, a); mk(cs, 'line', { x1: f2(x1), y1: f2(y1), x2: f2(x2), y2: f2(y2), stroke: TH, 'stroke-width': 2.5 }); const [lx, ly] = P(CX, CY, CR - 90, a); txt(cs, f2(lx), f2(ly + 7), s, { 'text-anchor': 'middle', 'font-size': 18, fill: TH, 'font-weight': 600 }); });
const cArc = mk(cs, 'path', { d: '', fill: 'none', stroke: TH, 'stroke-width': 6, 'stroke-linecap': 'round' });
const cPtr = mk(cs, 'line', { x1: CX, y1: CY, x2: CX + CR, y2: CY, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' });
mk(cs, 'circle', { cx: CX, cy: CY, r: 7, fill: C.ink });
const cDot = mk(cs, 'circle', { cx: CX + CR, cy: CY, r: 10, fill: C.ink, stroke: '#fff', 'stroke-width': 3 });
const cAng = M.track(0, [[wt('L2', 'quarter') - 0.4, Math.PI / 2], [wt('L3', 'half') - 0.4, Math.PI], [wt('L4', 'way') - 0.3, 2 * Math.PI]], M.HEAVY);

/* ---------- V: 1 radian, 1 degree ---------- */
const VS = [[`${th('\\pi\\ \\text{rad}')} = ${dg('180^\\circ')}`, 'the one fact'],
  [`${th('1\\ \\text{rad}')} = ${dg('\\tfrac{180^\\circ}{\\pi}')} \\approx ${dg('57.3^\\circ')}`, 'divide both sides by π'],
  [`${dg('1^\\circ')} = ${th('\\tfrac{\\pi}{180}\\ \\text{rad}')}`, 'go back to step 1, divide both sides by 180'],
  [`${dg('1^\\circ')} \\approx ${th('0.0175\\ \\text{rad}')}`, 'a degree is tiny, a radian is big']];
$('#vSt').innerHTML = VS.map(([f, w], i) => `<div class="pf" id="vs${i}" style="top:${84 + i * 116}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tVs = [wt('V2', 'Pi'), wt('V3', 'Divide'), wt('V4', 'Go'), wt('V5', 'zero')];
const vs = $('#vS'), VX = 150, VY = 420, VR = 330;
const vWed = mk(vs, 'path', { d: wedgeD(VX, VY, VR, 0, 1), fill: mix(TH, '#FFFFFF', 0.9), stroke: 'none' });
mk(vs, 'line', { x1: VX, y1: VY, x2: VX + VR, y2: VY, stroke: C.ink, 'stroke-width': 4 });
const vR2 = mk(vs, 'line', { x1: VX, y1: VY, x2: f2(P(VX, VY, VR, 1)[0]), y2: f2(P(VX, VY, VR, 1)[1]), stroke: C.ink, 'stroke-width': 4 });
const vArc = mk(vs, 'path', { d: arcD(VX, VY, VR, 0, 1), fill: 'none', stroke: TH, 'stroke-width': 7 });
const vSl = []; for (let d = 1; d <= 57; d++) { const a = d * Math.PI / 180, [x1, y1] = P(VX, VY, 70, a), [x2, y2] = P(VX, VY, VR, a); vSl.push(mk(vs, 'line', { x1: f2(x1), y1: f2(y1), x2: f2(x2), y2: f2(y2), stroke: DG, 'stroke-width': 1.2, opacity: 0.8 })); }
mk(vs, 'circle', { cx: VX, cy: VY, r: 7, fill: C.ink });
const vL1 = txt(vs, f2(P(VX, VY, VR + 20, 1)[0] + 10), f2(P(VX, VY, VR + 20, 1)[1] - 6), '1 rad ≈ 57.3°', { 'font-size': 24, fill: TH, 'font-weight': 600 });
const vL2g = mk(mk(vs, 'g', {}), 'g', {}); const [o1x, o1y] = P(VX, VY, VR, 0.5 * Math.PI / 180);
mk(vL2g, 'path', { d: `M${f2(o1x + 6)},${f2(o1y)} L${f2(o1x + 60)},${f2(o1y + 50)}`, stroke: DG, 'stroke-width': 2, fill: 'none' });
txt(vL2g, f2(o1x + 66), f2(o1y + 70), '1° ≈ 0.0175 rad', { 'text-anchor': 'end', 'font-size': 22, fill: DG, 'font-weight': 600 });
const vC0 = wt('V3', 'One'), vC1 = wt('V3', 'fifty') + 0.4;

/* ---------- U: two rules + table ---------- */
$('#ruF0').innerHTML = K(`${th('\\text{radians}')} = ${dg('\\text{degrees}')} \\times \\dfrac{\\pi}{180}`);
$('#ruF1').innerHTML = K(`${dg('\\text{degrees}')} = ${th('\\text{radians}')} \\times \\dfrac{180}{\\pi}`);
const TB = [['30°', '\\pi/6'], ['45°', '\\pi/4'], ['60°', '\\pi/3'], ['90°', '\\pi/2'], ['180°', '\\pi'], ['270°', '3\\pi/2'], ['360°', '2\\pi']];
$('#tbs').innerHTML = TB.map(([d, r], i) => `<div class="tb" id="tb${i}" style="top:${80 + i * 68}px"><div class="d">${d}</div><div class="ar">${M.icon('arrowR', 30, C.mute, 2.4)}</div><div class="r">${K(th(r))}</div><div class="k">${parseInt(d)} × π/180</div></div>`).join('');
const tTb = [wt('B2', 'Thirty'), wt('B2', 'Forty'), wt('B2', 'Sixty'), wt('B2', 'Ninety'), wt('B3', 'One'), wt('B3', 'Two'), wt('B3', 'And')];
const th1 = PUC.think($('#th1'), { q: 'Which is bigger: 1 radian or 1 degree?', opts: ['1 radian', '1 degree'], right: 0, why: '1 radian ≈ 57.3°: about fifty seven degrees fit inside one radian.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${th('1\\ \\text{rad}')} \\approx ${dg('57.3^\\circ')} \\qquad ${dg('1^\\circ')} \\approx ${th('0.0175\\ \\text{rad}')}`);

/* ---------- S: pi vs pi radians ---------- */
const sp = $('#spS'), NX = v => 80 + v * 150, NY = 260;
mk(sp, 'line', { x1: 50, y1: NY, x2: 740, y2: NY, stroke: C.ink, 'stroke-width': 3 });
for (let v = 0; v <= 4; v++) { mk(sp, 'line', { x1: NX(v), y1: NY - 10, x2: NX(v), y2: NY + 10, stroke: C.ink, 'stroke-width': 2 }); txt(sp, NX(v), NY + 44, v, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); }
const spD = mk(mk(sp, 'g', {}), 'g', {}); mk(spD, 'circle', { cx: NX(Math.PI), cy: NY, r: 12, fill: C.ink }); txt(spD, NX(Math.PI), NY - 30, 'π ≈ 3.1416', { 'text-anchor': 'middle', 'font-size': 24, fill: C.ink, 'font-weight': 600 });
const sq = $('#sqS'), QX = 392, QY = 310, QR = 170;
mk(sq, 'circle', { cx: QX, cy: QY, r: QR, fill: 'none', stroke: C.line, 'stroke-width': 3 });
const sqW = mk(sq, 'path', { d: wedgeD(QX, QY, QR, 0, Math.PI), fill: mix(TH, '#FFFFFF', 0.9), stroke: 'none' });
mk(sq, 'line', { x1: QX - QR, y1: QY, x2: QX + QR, y2: QY, stroke: C.ink, 'stroke-width': 4 });
const sqA = mk(sq, 'path', { d: arcD(QX, QY, QR, 0, Math.PI), fill: 'none', stroke: TH, 'stroke-width': 7 });
mk(sq, 'circle', { cx: QX, cy: QY, r: 7, fill: C.ink });
const sqL = txt(sq, QX, QY - 70, 'π rad = 180°', { 'text-anchor': 'middle', 'font-size': 28, fill: TH, 'font-weight': 600 });
const avA = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So π alone is 3.14. Only π radians is 180°.' });
const th2 = PUC.think($('#th2'), { q: 'The wheel turned 3 radians. More or less than half a turn?', opts: ['More', 'Less'], right: 1, why: 'Half a turn = π ≈ 3.14 rad. So 3 rad ≈ 172°, just short of it.' });

/* ---------- W: worked example ---------- */
$('#wq').innerHTML = `Convert ${K(dg("22^\\circ\\,30'"))} into radians.`;
const wsol = PUC.solution($('#wl'), [
  [K(`30' = (30/60)^\\circ = ${dg('0.5^\\circ')}`)],
  [K(`${dg("22^\\circ 30'")} = ${dg('22.5^\\circ')} = ${dg('(45/2)^\\circ')}`)],
  [K(`\\tfrac{45}{2} \\times \\tfrac{\\pi}{180} = \\tfrac{45\\pi}{360}`)],
  [K(`= ${th('\\tfrac{\\pi}{8}\\ \\text{rad}')}`)],
  [K(`\\text{check: } 180^\\circ / 8 = ${dg('22.5^\\circ')}`)]], { label: 'WORKED EXAMPLE', y0: 150, dy: 82 });
$('#wl .lbl').style.top = '30px';
const wsv = $('#wS'), WX = 392, WY = 278, WR = 190;
mk(wsv, 'circle', { cx: WX, cy: WY, r: WR, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const wHalf = mk(wsv, 'path', { d: wedgeD(WX, WY, WR, 0, Math.PI), fill: mix(TH, '#FFFFFF', 0.93), stroke: 'none' });
const wSec = mk(wsv, 'path', { d: wedgeD(WX, WY, WR, 0, Math.PI / 8), fill: mix(TH, '#FFFFFF', 0.7), stroke: TH, 'stroke-width': 3 });
const wSp = []; for (let i = 0; i < 16; i++) { const [x, y] = P(WX, WY, WR, i * Math.PI / 8); wSp.push(mk(wsv, 'line', { x1: WX, y1: WY, x2: f2(x), y2: f2(y), stroke: '#9AA0AC', 'stroke-width': 1.6 })); }
const wNum = []; for (let i = 0; i < 8; i++) { const [x, y] = P(WX, WY, WR - 30, (i + 0.5) * Math.PI / 8); wNum.push(txt(wsv, f2(x), f2(y + 7), String(i + 1), { 'text-anchor': 'middle', 'font-size': 18, fill: TH, 'font-weight': 600 })); }
mk(wsv, 'circle', { cx: WX, cy: WY, r: 6, fill: C.ink });
const wSL = txt(wsv, f2(P(WX, WY, WR + 34, Math.PI / 16)[0] + 30), f2(P(WX, WY, WR + 34, Math.PI / 16)[1] + 4), '22.5°', { 'text-anchor': 'middle', 'font-size': 22, fill: DG, 'font-weight': 600 });
const wHL = txt(wsv, WX, WY - WR - 18, '8 slices = π', { 'text-anchor': 'middle', 'font-size': 22, fill: TH, 'font-weight': 600 });
const tW = [wt('W3', 'Step'), wt('W4', 'Step'), wt('W5', 'Step'), wt('W6', 'Step'), wt('W7', 'Check')];

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`${th('2\\ \\text{rad}')} = 2 \\times \\tfrac{\\pi}{180} = \\tfrac{\\pi}{90}`), right: K(`${th('2\\ \\text{rad}')} = 2 \\times \\tfrac{180^\\circ}{\\pi} \\approx ${dg('114.6^\\circ')}`) });
const ts = $('#tS'), TCX = 150, TCY = 160, TR = 92;
const tG = mk(mk(ts, 'g', {}), 'g', {});
mk(tG, 'circle', { cx: TCX, cy: TCY, r: TR, fill: 'none', stroke: C.line, 'stroke-width': 3 });
mk(tG, 'path', { d: wedgeD(TCX, TCY, TR, 0, 2), fill: mix(TH, '#FFFFFF', 0.88), stroke: 'none' });
mk(tG, 'line', { x1: TCX, y1: TCY, x2: TCX + TR, y2: TCY, stroke: C.ink, 'stroke-width': 3.5 });
mk(tG, 'line', { x1: TCX, y1: TCY, x2: f2(P(TCX, TCY, TR, 2)[0]), y2: f2(P(TCX, TCY, TR, 2)[1]), stroke: C.ink, 'stroke-width': 3.5 });
mk(tG, 'path', { d: arcD(TCX, TCY, TR, 0, 2), fill: 'none', stroke: TH, 'stroke-width': 6 });
txt(tG, 280, 150, '2 rad', { 'font-size': 26, fill: TH, 'font-weight': 600 }); txt(tG, 280, 188, '≈ 114.6°', { 'font-size': 26, fill: DG, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['PUC BOARDS'], type: 'Convert degrees (often with minutes) into radians, or radians into degrees.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 800,
  q: `At 4:20, what is the angle between the hour hand and the minute hand of a clock, in radians?`,
  opts: [K('\\tfrac{\\pi}{18}'), K('\\tfrac{\\pi}{9}'), K('0'), K('\\tfrac{\\pi}{6}')], right: 0, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [['Minute hand: 6° a minute, so 120°'], ['Hour hand: 0.5° a minute'], [K('4 \\times 30^\\circ + 20 \\times 0.5^\\circ = 130^\\circ')], [K('130^\\circ - 120^\\circ = 10^\\circ')], [K(`10 \\times \\tfrac{\\pi}{180} = ${th('\\tfrac{\\pi}{18}')}`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'minute'), wt('A3', 'hour'), wt('A3', 'plus'), wt('A4', 'gap'), wt('A4', 'Multiply')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · degrees and radians', y0: 98, dy: 78, txt: [1, 0, 0, 0, 0],
  lines: ['<b>The one fact</b>: π radians = 180°',
    K(`${th('1\\ \\text{rad}')} = ${dg('\\tfrac{180^\\circ}{\\pi}')} \\approx ${dg('57.3^\\circ')} \\qquad ${dg('1^\\circ')} = ${th('\\tfrac{\\pi}{180}')} \\approx ${th('0.0175\\ \\text{rad}')}`),
    K(`${th('\\text{radians}')} = ${dg('\\text{degrees}')} \\times \\tfrac{\\pi}{180}`),
    K(`${dg('\\text{degrees}')} = ${th('\\text{radians}')} \\times \\tfrac{180}{\\pi}`),
    K(`${dg('30^\\circ')} = ${th('\\tfrac{\\pi}{6}')} \\quad ${dg('45^\\circ')} = ${th('\\tfrac{\\pi}{4}')} \\quad ${dg('60^\\circ')} = ${th('\\tfrac{\\pi}{3}')} \\quad ${dg('90^\\circ')} = ${th('\\tfrac{\\pi}{2}')}`)] });
const YQ = ['Convert 135° into radians.', 'Convert 5π/3 radians into degrees.', 'Why is it wrong to write π = 180?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 26', topic: 'The valve turns backwards: can an angle be negative?', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tVs[1] + 0.2, 1.08, 1368, 560], [tVs[2] - 0.2, 1, 960, 540]]);

M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tC1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('C1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    const a = hAng(t); attr(hArc, 'd', arcD(HX, HY, HR, 0, a)); const [x, y] = P(HX, HY, HR, a); attr(hRad, 'x2', f2(x)); attr(hRad, 'y2', f2(y)); attr(hDot, 'cx', f2(x)); attr(hDot, 'cy', f2(y));
    M.setT($('#hD span'), Math.round(a * 180 / Math.PI) + '°'); M.setT($('#hR span'), a.toFixed(2) + (a > Math.PI - 0.002 ? ' = π' : ''));
    M.vis($('#hD'), t, tMorph + 0.3, 1e9, { dy: 10 }); M.vis($('#hR'), t, tMorph + 0.4, 1e9, { dy: 10 });
    M.vis(h3g, t, wt('H3', 'three') - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#hP'), t, wt('H4', 'more') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'units') - 0.1, 1e9, POP);
  }

  /* C: one fact + dial */
  const cOn = t >= tC1 - 0.1 && t < tV1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('V1');
    M.vis($('#cl'), t, tC1 + 0.1, out, { dx: -60, dy: 0, ...o });
    CS.forEach((_, i) => { const el = $('#cs' + i); M.vis(el.querySelector('.n'), t, tCs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tCs[i], 0.7); M.vis(el.querySelector('.why'), t, tCs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tCs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 112]), M.SOFT)(t); const hb = $('#cHi'); M.vis(hb, t, tCs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
    M.vis($('#cr'), t, tL1 - 0.2, out, { dx: 60, dy: 0, ...o });
    const a = cAng(t); attr(cArc, 'd', arcD(CX, CY, CR - 56, 0, a)); const [x, y] = P(CX, CY, CR, a); attr(cPtr, 'x2', f2(x)); attr(cPtr, 'y2', f2(y)); attr(cDot, 'cx', f2(x)); attr(cDot, 'cy', f2(y));
    M.setT($('#cD span'), Math.round(a * 180 / Math.PI) + '°'); M.setT($('#cR span'), a.toFixed(2) + piName(a));
    M.vis($('#cD'), t, wt('L1', 'outer'), 1e9, { dy: 10 }); M.vis($('#cR'), t, wt('L1', 'inner'), 1e9, { dy: 10 });
  }

  /* V */
  const vOn = t >= tV1 - 0.1 && t < tU1 + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const out = OUT('U1');
    M.vis($('#vl'), t, tV1 + 0.1, out, { dx: -60, dy: 0, ...o });
    VS.forEach((_, i) => { const el = $('#vs' + i); M.vis(el.querySelector('.n'), t, tVs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tVs[i], 0.7); M.vis(el.querySelector('.why'), t, tVs[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hy = M.track(84, tVs.slice(1).map((tt, i) => [tt - 0.1, 84 + (i + 1) * 116]), M.SOFT)(t); const hb = $('#vHi'); M.vis(hb, t, tVs[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); hb.style.top = (hy - 4).toFixed(1) + 'px';
    M.vis($('#vr'), t, tV1 + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis(vWed, t, tV1 + 0.6, 1e9, { dy: 0, fade: 0.3 }); M.draw(vArc, t, tV1 + 0.6, 0.6); M.vis(vR2, t, tV1 + 0.6, 1e9, { dy: 0 });
    const n = Math.round(57 * M.clamp((t - vC0) / (vC1 - vC0))); vSl.forEach((e, i) => M.hide(e, i >= n));
    M.setT($('#vC span'), n >= 57 ? '57 + a bit' : String(n)); M.vis($('#vC'), t, vC0 - 0.1, 1e9, { dy: 10 });
    M.vis(vL1, t, wt('V3', 'fifty'), 1e9, { dy: 0 }); M.vis(vL2g, t, wt('V5', 'zero'), 1e9, { dy: 0, fade: 0.2 });
  }

  /* U: rules + table + think */
  const uOn = t >= tU1 - 0.1 && t < tT + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('K1');
    M.vis($('#ul'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#ru0 .lb'), t, T0('U2') - 0.1, 1e9, { dy: 10 }); PUC.write($('#ruF0'), t, wt('U2', 'multiply') - 0.1, 0.8);
    M.vis($('#ru1 .lb'), t, T0('U3') - 0.1, 1e9, { dy: 10 }); PUC.write($('#ruF1'), t, wt('U3', 'multiply') - 0.1, 0.8);
    M.vis($('#uP'), t, wt('U4', 'pi') - 0.1, 1e9, POP);
    M.vis($('#ur'), t, T0('B1') - 0.1, out, { dx: 60, dy: 0, ...o });
    TB.forEach((_, i) => { const el = $('#tb' + i); M.vis(el, t, tTb[i] - 0.1, 1e9, { dx: -16, dy: 0 }); PUC.write(el.querySelector('.r'), t, tTb[i] + 0.25, 0.4); });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'bigger') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'about') });
  }

  /* statement */
  const stOn = t >= tT && t < tS1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tS1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Pi') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'hundred'), 0.8);
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tW1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S3');
    M.vis($('#sp'), t, tS1 + 0.3, out, { dx: -60, dy: 0, ...o });
    M.vis(spD, t, wt('S1', 'number') - 0.1, 1e9, POP); M.vis($('#spP'), t, wt('S1', 'three') - 0.1, 1e9, POP);
    M.vis($('#sq'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(sqW, t, wt('S2', 'angle'), 1e9, { dy: 0, fade: 0.3 }); M.draw(sqA, t, wt('S2', 'angle'), 0.7); M.vis(sqL, t, wt('S2', 'half'), 1e9, { dy: 0 });
    M.vis($('#sqP'), t, wt('S2', 'hundred') - 0.1, 1e9, POP);
    avA(t, wt('S2', 'never') - 0.1, out);
    M.vis($('#th2'), t, tS3 + 0.05, OUT('W1'), { dy: 36, ...o });
    th2(t, { tin: tS3, tOpts: wt('S3', 'more') - 0.1, tCount: T1('S3') + 0.05, dur: 3, tAns: T0('S4') - 0.02, tWhy: wt('S4', 'Half') });
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    wSp.forEach((e, i) => M.vis(e, t, T0('W2') + 0.6 + i * 0.06, 1e9, { dy: 0, fade: 0.1 }));
    M.vis(wSec, t, wt('W5', 'Multiply'), 1e9, { dy: 0, fade: 0.3 }); M.vis(wSL, t, wt('W4', 'twenty'), 1e9, { dy: 0 });
    M.vis(wHalf, t, wt('W6', 'eight') - 0.2, 1e9, { dy: 0, fade: 0.3 }); wNum.forEach((e, i) => M.vis(e, t, wt('W6', 'eight') - 0.1 + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP }));
    M.vis(wHL, t, wt('W6', 'answer'), 1e9, { dy: 0 });
    M.vis($('#wP'), t, wt('W6', 'pi') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'into') - 0.1, tRight: wt('X3', 'Two') - 0.2 });
    M.vis(tG, t, wt('X3', 'Two'), 1e9, { dy: 0, fade: 0.25 });
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'PUC')], tType: wt('J1', 'convert') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'radians'), tCount, tAns });
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
