// PUC Maths Ep 39: Real and imaginary parts (Proof board)
(() => {
const { $ } = M, C = PUC.init({ subject: 'maths' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// Chapter 4 colour-coding: real part a blue, imaginary part b coral (accent), i violet, modulus teal.
const RE = '#2F6FEB', REB = '#E7EEFD', IM = C.violet, RC = C.ac;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const A = s => `\\textcolor{${RE}}{${s}}`, B = s => `\\textcolor{${RC}}{${s}}`, I = `\\textcolor{${IM}}{i}`;
const seg = (v0, ks) => t => { let v = v0; for (const [a, b, to] of ks) { const u = M.io((t - a) / Math.max(0.01, b - a)); if (u <= 0) break; v = v + (to - v) * u; } return v; };
const hiMove = (el, t, ts, y0, dy, h) => { const y = M.track(y0, ts.slice(1).map((tt, i) => [tt - 0.1, y0 + (i + 1) * dy]), M.SOFT)(t); M.vis(el, t, ts[0] - 0.1, 1e9, { dy: 0, fade: 0.2 }); el.style.top = (y - h).toFixed(1) + 'px'; };
const zTex = (a, b) => `z = ${A(a.toFixed(1))} ${b < 0 ? '-' : '+'} ${B(Math.abs(b).toFixed(1))}\\,${I}`;
// a small address board: real axis (street) blue, upright axis coral
const board = (svg, o) => {
  const X = a => o.x0 + a * o.ux, Y = b => o.y0 - b * o.uy, g = mk(mk(svg, 'g', {}), 'g', {});
  for (let a = Math.ceil(o.a0); a <= o.a1; a++) mk(g, 'line', { x1: X(a), y1: Y(o.b0), x2: X(a), y2: Y(o.b1), stroke: C.grid, 'stroke-width': 1.5 });
  for (let b = Math.ceil(o.b0); b <= o.b1; b++) mk(g, 'line', { x1: X(o.a0), y1: Y(b), x2: X(o.a1), y2: Y(b), stroke: C.grid, 'stroke-width': 1.5 });
  mk(g, 'line', { x1: X(o.a0), y1: Y(0), x2: X(o.a1), y2: Y(0), stroke: RE, 'stroke-width': 4 });
  mk(g, 'line', { x1: X(0), y1: Y(o.b0), x2: X(0), y2: Y(o.b1), stroke: RC, 'stroke-width': 4 });
  (o.at || []).forEach(a => txt(g, X(a), Y(0) + 28, a, { 'text-anchor': 'middle', fill: RE, 'font-weight': 600 }));
  (o.bt || []).forEach(b => txt(g, X(0) - 12, Y(b) + 6, b, { 'text-anchor': 'end', fill: RC, 'font-weight': 600 }));
  return { X, Y, g };
};

/* ---------- beats ---------- */
const tMorph = T0('H3') + 0.02;
const tD1 = T0('D1'), tL1 = T0('L1'), tS1 = T0('S1'), tS4 = T0('S4'), tP1 = T0('P1'), tT = T0('T1');
const tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const LS = [['HALF AN ADDRESS', 'Room 3'], ['A FULL ADDRESS', 'Room 3, floor 2']];
$('#lists').innerHTML = LS.map(([n, v], i) => `<div class="lst" id="ls${i}" style="left:${500 + i * 480}px"><div class="ln">${n}</div><div class="lv">${v}</div></div>`).join('');
$('#ls1 .lv').innerHTML = '<span class="bg">Room 3</span>, <span class="cg">floor 2</span>';
const tLs = [wt('H1', 'room'), wt('H2', 'full')];

/* ---------- H: the building ---------- */
const hs = $('#hS'), HX = r => 120 + (r - 1) * 116, HY = f => 492 - (f + 1) * 92;
const hB = mk(mk(hs, 'g', {}), 'g', {});
const hCol = mk(hB, 'rect', { x: HX(3), y: HY(3), width: 116, height: 4 * 92, fill: REB });
for (let f = 0; f < 4; f++) for (let r = 1; r <= 5; r++) mk(hB, 'rect', { x: HX(r) + 14, y: HY(f) + 16, width: 88, height: 60, rx: 8, fill: '#fff', stroke: C.line, 'stroke-width': 2 });
mk(hB, 'rect', { x: HX(1), y: HY(3), width: 580, height: 4 * 92, fill: 'none', stroke: C.ink, 'stroke-width': 3, rx: 6 });
for (let f = 1; f < 4; f++) mk(hB, 'line', { x1: HX(1), y1: HY(f) + 92, x2: HX(6), y2: HY(f) + 92, stroke: C.ink, 'stroke-width': 1.5, opacity: 0.4 });
['GROUND', 'FLOOR 1', 'FLOOR 2', 'FLOOR 3'].forEach((s, f) => txt(hB, 108, HY(f) + 52, s, { 'text-anchor': 'end', fill: RC, 'font-size': 15, 'font-weight': 600 }));
for (let r = 1; r <= 5; r++) txt(hB, HX(r) + 58, 522, 'ROOM ' + r, { 'text-anchor': 'middle', fill: RE, 'font-size': 16, 'font-weight': 600 });
const hm = (f, col, lab) => { const g = mk(mk(hs, 'g', { transform: `translate(${HX(3) + 58},${HY(f) + 46})` }), 'g', {}); mk(g, 'circle', { r: 22, fill: col, stroke: '#fff', 'stroke-width': 4 }); txt(g, 0, 7, lab, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: '#fff' }); return g; };
const hD = hm(2, RC, 'D'), hF = hm(0, C.ink, 'F');
const hDT = txt(hs, HX(4) + 6, HY(2) + 52, 'Diya', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: RC });
const hFT = txt(hs, HX(4) + 6, HY(0) + 52, 'her friend', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: C.ink });

/* ---------- D: definition ---------- */
$('#dZ').innerHTML = K(`z = ${A('a')} + ${I}\\,${B('b')}`);
$('#dR').innerHTML = K(`\\text{Re}\\, z = ${A('a')}`); $('#dI').innerHTML = K(`\\text{Im}\\, z = ${B('b')}`);
$('#dEx').innerHTML = K(`z = ${A('2')} + ${B('5')}\\,${I}`);
$('#dP0').innerHTML = K(`\\text{Re}\\, z = 2`) + '<span style="color:var(--ink)">the real part</span>';
$('#dP1').innerHTML = K(`\\text{Im}\\, z = 5`) + '<span style="color:var(--ink)">the imaginary part</span>';

/* ---------- L: address board ---------- */
const lb = board($('#lS'), { x0: 392, y0: 444, ux: 96, uy: 80, a0: -3.6, a1: 3.6, b0: -1.2, b1: 4.2, at: [-3, -2, -1, 1, 2, 3], bt: [1, 2, 3, 4] });
const lsv = $('#lS');
txt(lb.g, 712, lb.Y(0) - 14, 'street: real part a', { 'text-anchor': 'end', fill: RE, 'font-size': 18, 'font-weight': 600 });
txt(lb.g, lb.X(0) + 14, 104, 'floors: imaginary part b', { fill: RC, 'font-size': 18, 'font-weight': 600 });
const lPa = mk(lsv, 'line', { stroke: RE, 'stroke-width': 9, 'stroke-linecap': 'round' }), lPb = mk(lsv, 'line', { stroke: RC, 'stroke-width': 5, 'stroke-dasharray': '8 6' });
const lDot = mk(lsv, 'circle', { r: 15, fill: '#fff', stroke: C.ink, 'stroke-width': 5 });
const aK = seg(2, [[wt('L3', 'Let'), wt('L3', 'Let') + 0.7, -3], [wt('L3', 'from') + 0.2, wt('L3', 'street') + 0.4, 3]]);
const bK = seg(1, [[T0('L4'), T0('L4') + 0.5, 0], [wt('L4', 'count'), wt('L4', 'only') + 0.3, 4]]);
let lLast = '';

/* ---------- S: purely real vs purely imaginary ---------- */
$('#slF').innerHTML = K(`z = ${A('a')} + ${B('0')}\\,${I} = ${A('a')}`);
$('#srF').innerHTML = K(`z = ${A('0')} + ${I}\\,${B('b')} = ${I}\\,${B('b')}`);
const SB = { x0: 392, y0: 330, ux: 80, uy: 64, a0: -4.2, a1: 4.2, b0: -2.4, b1: 2.6 };
const sbL = board($('#slS'), SB), sbR = board($('#srS'), SB);
const sDots = [[sbL, 2.5, 0, RE], [sbL, -1.5, 0, RE], [sbR, 0, 2, RC], [sbR, 0, -1.5, RC]].map(([b, a, bb, col], k) => { const g = mk(mk(k < 2 ? $('#slS') : $('#srS'), 'g', { transform: `translate(${b.X(a)},${b.Y(bb)})` }), 'g', {}); mk(g, 'circle', { r: 14, fill: '#fff', stroke: col, 'stroke-width': 5 }); return g; });
$('#slP').innerHTML = K(`7 = 7 + 0\\,${I}`) + '<span style="color:var(--ink)">every real number is complex</span>';
const th1 = PUC.think($('#th1'), { q: `Is ${K(`${I}^2`)} purely real, or purely imaginary?`, opts: ['Purely real', 'Purely imaginary'], right: 0, why: `${K(`${I}^2 = -1 = ${A('-1')} + ${B('0')}\\,${I}`)}: the imaginary part is 0.` });

/* ---------- P: tidy, then read ---------- */
const PS = [[`z = 3 + 5${I} - ${I}^2`, 'the untidy form'], [`-${I}^2 = -(-1) = +1`, 'because i squared is -1'], [`z = (${A('3 + 1')}) + ${B('5')}\\,${I}`, 'group the real terms'], [`z = ${A('4')} + ${B('5')}\\,${I}`, 'Re z = 4, Im z = 5']];
$('#pSt').innerHTML = PS.map(([f, w], i) => `<div class="st" id="ps${i}" style="top:${84 + i * 108}px"><div class="n">${i + 1}</div><div class="sx">${K(f)}</div><div class="why">${w}</div></div>`).join('');
const tPs = [wt('P2', 'Take'), wt('P3', 'squared'), wt('P4', 'Group'), wt('P5', 'So')];
const TL = [['3', A('3'), [36, 120], [64, 330]], ['5i', `${B('5')}\\,${I}`, [150, 120], [478, 330]], ['-i2', `-${I}^2`, [290, 120], [184, 330]]];
$('#pTl').innerHTML = TL.map(([id, f], k) => `<div class="tl" id="pt${k}">${K(f)}</div>`).join('');
['pB0', 'pB1'].forEach(id => { $('#' + id).style.height = '220px'; $('#' + id).style.top = '240px'; });
$('#pRes').innerHTML = K(`z = ${A('4')} + ${B('5')}\\,${I}`); $('#pRes').style.top = '486px';
let pSwap = false;

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`z = ${A('a')} + ${I}\\,${B('b')}: \\quad \\text{Re}\\,z = ${A('a')}, \\quad \\text{Im}\\,z = ${B('b')}`);

/* ---------- W: worked example with a live k ---------- */
$('#wq').innerHTML = `${K(`z = (${A('k - 2')}) + (${B('k^2 - 9')})\\,${I}`)}<br>k real. When is z purely real? Purely imaginary?`;
const wsol = PUC.solution($('#wl'), [
  [K(`\\text{Re}\\,z = ${A('k - 2')}, \\quad \\text{Im}\\,z = ${B('k^2 - 9')}`)],
  [K(`\\text{real: } ${B('k^2 - 9')} = 0 \\Rightarrow k = \\pm 3`)],
  [K(`\\text{imaginary: } ${A('k - 2')} = 0 \\Rightarrow k = 2`)],
  [K(`k = 2: \\ \\text{Im}\\,z = 4 - 9 = -5 \\ne 0`)],
  [K(`\\text{so } z = -5\\,${I}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tW = [wt('W3', 'Read'), wt('W4', 'Purely'), wt('W5', 'Purely'), wt('W6', 'Check'), wt('W6', 'So')];
const wsv = $('#wS'), wb = board(wsv, { x0: 482, y0: 300, ux: 58, uy: 22, a0: -7, a1: 4.2, b0: -10, b1: 10, at: [-6, -4, -2, 2], bt: [-8, -4, 4, 8] });
const zk = k => [k - 2, k * k - 9];
const wTr = mk(wsv, 'path', { fill: 'none', stroke: IM, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.7 });
const wMk = [[3, RE, 'k = 3', 14, -14], [-3, RE, 'k = -3', -14, -14], [2, RC, 'k = 2', 18, 6]].map(([k, col, s, dx, dy]) => { const [a, b] = zk(k), g = mk(mk(wsv, 'g', { transform: `translate(${wb.X(a)},${wb.Y(b)})` }), 'g', {}); mk(g, 'circle', { r: 16, fill: 'none', stroke: col, 'stroke-width': 4 }); txt(g, dx, dy, s, { 'text-anchor': dx < 0 ? 'end' : 'start', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: col }); return g; });
const wDot = mk(wsv, 'circle', { r: 11, fill: IM, stroke: '#fff', 'stroke-width': 3 });
const tK0 = wt('W7', 'slide'), tK1 = T1('W7') + 0.4;
const kK = t => -4 + 8 * M.io((t - tK0) / (tK1 - tK0));

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`\\text{Im}(3 - 4${I}) = -4${I}`), right: K(`\\text{Im}(3 - 4${I}) = ${B('-4')}`) + '&nbsp; a real number, no i' });
const ts = $('#tS');
const tz = txt(ts, 60, 130, '', { 'font-family': 'Poppins', 'font-size': 64, 'font-weight': 700 });
[['3', RE], [' - ', C.ink], ['4', RC], [' i', IM]].forEach(([s, col]) => { const sp = mk(tz, 'tspan', { fill: col }); sp.textContent = s; });
const tU = [txt(ts, 60, 186, 'Re = 3', { fill: RE, 'font-size': 20, 'font-weight': 600 }), txt(ts, 168, 186, 'Im = -4', { fill: RC, 'font-size': 20, 'font-weight': 600 }), txt(ts, 290, 186, 'i is just the marker', { fill: IM, 'font-size': 18, 'font-weight': 600 })];
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'PUC BOARDS'], type: 'Find when a complex number is purely real or purely imaginary.' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', qW: 940,
  q: `${K(`z = (${A('k^2 - 4')}) + (${B('k^2 - 5k + 6')})\\,${I}, \\quad k \\in \\mathbb{Z}`)}<br>For how many integers k is z purely imaginary?`,
  opts: ['0', '1', '2', '3'], right: 1, optW: 474, optY: 300 });
const so = PUC.solution($('#so'), [[K(`${A('k^2 - 4')} = 0 \\Rightarrow k = \\pm 2`)], [K(`\\text{need } ${B('k^2 - 5k + 6')} \\ne 0`)], [K(`k = 2: \\ 4 - 10 + 6 = 0 \\ \\times`)], [K(`k = -2: \\ 4 + 10 + 6 = 20`)], [K(`\\text{only } k = -2 \\Rightarrow 1`)]], { y0: 100, dy: 96 });
const tSo = [wt('A2', 'Purely'), wt('A3', 'also'), wt('A3', 'At'), wt('A4', 'At'), wt('A4', 'only')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 252, w: 1200, h: 492, title: 'Recap · real and imaginary parts', y0: 98, dy: 80, txt: [0, 0, 1, 1, 1],
  lines: [K(`z = ${A('a')} + ${I}\\,${B('b')}, \\quad a, b \\in \\mathbb{R}`),
    K(`\\text{Re}\\,z = ${A('a')}, \\qquad \\text{Im}\\,z = ${B('b')} \\ \\ (\\text{no } i)`),
    '<b>Purely real</b>: b = 0 &nbsp;·&nbsp; <b>purely imaginary</b>: a = 0, b ≠ 0',
    '<b>Every real number is complex</b>: 7 = 7 + 0i',
    '<b>Tidy first</b>: write it as a + ib, then read the parts'] });
const YQ = ['What are Re z and Im z for z = -5 + 2i?', 'Is the number 9 a complex number? Why?', 'For which k is (k - 1) + (k + 1)i purely real?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 40', topic: 'Two moves on a map: the Algebra of Complex Numbers', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const avD = PUC.avatar($('#sS'), { x: 976 + 36, y: 270 + 400, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the street is just the real numbers.' });

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  LS.forEach((_, i) => M.vis($('#ls' + i), t, tLs[i], tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tD1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('D1');
    M.vis($('#hl'), t, tMorph + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(hB, t, tMorph + 0.3, 1e9, { dy: 0, fade: 0.3 });
    hCol.style.opacity = M.clamp((t - wt('H3', 'room')) / 0.3);
    M.vis(hD, t, wt('H3', 'second'), 1e9, { ...POP, sc: 0.3 }); M.vis(hDT, t, wt('H3', 'second') + 0.1, 1e9, { dy: 0 });
    M.vis(hF, t, wt('H3', 'ground'), 1e9, { ...POP, sc: 0.3 }); M.vis(hFT, t, wt('H3', 'ground') + 0.1, 1e9, { dy: 0 });
    M.vis($('#hk'), t, tMorph + 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tMorph + 0.5, 1e9, { dy: 20 }); M.vis($('#hkF'), t, tMorph + 0.6, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, wt('H4', 'Complex') - 0.4, 1e9, POP);
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tL1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('L1');
    M.vis($('#dl'), t, tD1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#dZ'), t, wt('D2', 'form'), 0.9); M.vis($('#dW'), t, wt('D2', 'where'), 1e9, { dy: 10 });
    PUC.write($('#dR'), t, wt('D3', 'real') - 0.2, 0.7); M.vis($('#dRw'), t, wt('D3', 'real') + 0.4, 1e9, { dy: 10 });
    PUC.write($('#dI'), t, wt('D4', 'imaginary') - 0.2, 0.7); M.vis($('#dIw'), t, wt('D4', 'Notice'), 1e9, { dy: 10 });
    M.vis($('#dr'), t, wt('D2', 'form') + 0.4, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#dEx'), t, T0('D5'), 0.9);
    M.vis($('#dP0'), t, wt('D5', 'real') - 0.1, 1e9, POP); M.vis($('#dP1'), t, wt('D5', 'imaginary') - 0.1, 1e9, POP); M.vis($('#dP2'), t, T1('D5') - 0.2, 1e9, POP);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tS1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('S1');
    M.vis($('#ll'), t, tL1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis(lb.g, t, tL1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    const a = aK(t), b = bK(t), on = t >= wt('L2', 'real') - 0.2;
    attr(lPa, 'x1', lb.X(0)); attr(lPa, 'y1', lb.Y(0)); attr(lPa, 'x2', lb.X(a).toFixed(1)); attr(lPa, 'y2', lb.Y(0));
    attr(lPb, 'x1', lb.X(a).toFixed(1)); attr(lPb, 'y1', lb.Y(0)); attr(lPb, 'x2', lb.X(a).toFixed(1)); attr(lPb, 'y2', lb.Y(b).toFixed(1));
    attr(lDot, 'cx', lb.X(a).toFixed(1)); attr(lDot, 'cy', lb.Y(b).toFixed(1));
    M.vis(lPa, t, on ? wt('L2', 'real') - 0.1 : null, on ? 1e9 : -1, { dy: 0 }); M.vis(lPb, t, on ? wt('L2', 'imaginary') - 0.1 : null, on ? 1e9 : -1, { dy: 0 }); M.vis(lDot, t, wt('L2', 'real') - 0.2, 1e9, { ...POP, sc: 0.3 });
    M.vis($('#lr'), t, tL1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const key = a.toFixed(1) + '|' + b.toFixed(1);
    if (key !== lLast) { lLast = key; $('#lA').innerHTML = `<i style="font-family:Poppins" class="bg">a</i> = <span class="bg">${a.toFixed(1)}</span>`; $('#lB').innerHTML = `<i style="font-family:Poppins" class="cg">b</i> = <span class="cg">${b.toFixed(1)}</span>`; $('#lZ').innerHTML = K(zTex(+a.toFixed(1), +b.toFixed(1))); }
    M.vis($('#lA'), t, wt('L2', 'real') - 0.1, 1e9, { dy: 10 }); M.vis($('#lB'), t, wt('L2', 'imaginary') - 0.1, 1e9, { dy: 10 }); M.vis($('#lZ'), t, wt('L2', 'imaginary') + 0.3, 1e9, { dy: 14 });
    M.vis($('#lr0'), t, wt('L2', 'street'), 1e9, { dx: -16, dy: 0 }); M.vis($('#lr1'), t, wt('L2', 'floors'), 1e9, { dx: -16, dy: 0 });
    const ha = t > wt('L3', 'Let') && t < T0('L4') ? 1 : 0, hb = t > T0('L4') && t < T0('L5') ? 1 : 0;
    $('#lr0').style.background = ha ? REB : C.soft; $('#lr1').style.background = hb ? C.ac2 : C.soft;
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tP1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('S4');
    M.vis($('#sl'), t, tS1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#slF'), t, wt('S1', 'zero') - 0.1, 0.8); M.vis(sbL.g, t, tS1 + 0.3, 1e9, { dy: 0, fade: 0.3 });
    sDots.slice(0, 2).forEach((g, k) => M.vis(g, t, wt('S1', 'street') - 0.1 + k * 0.3, 1e9, { ...POP, sc: 0.3 }));
    M.vis($('#slP'), t, wt('S3', 'Seven') - 0.1, 1e9, POP);
    M.vis($('#sr'), t, T0('S2') - 0.1, out, { dx: 60, dy: 0, ...o });
    PUC.write($('#srF'), t, wt('S2', 'equals') - 0.1, 0.8); M.vis(sbR.g, t, T0('S2') + 0.1, 1e9, { dy: 0, fade: 0.3 });
    sDots.slice(2).forEach((g, k) => M.vis(g, t, wt('S2', 'above') - 0.1 + k * 0.4, 1e9, { ...POP, sc: 0.3 }));
    M.vis($('#srP'), t, wt('S2', 'above'), wt('S3', 'every') - 0.2, { ...POP, outDur: 0.2, ody: 0 });
    avD(t, wt('S3', 'every'), out);
    M.vis($('#th1'), t, tS4 + 0.05, OUT('P1'), { dy: 36, ...o });
    th1(t, { tin: tS4, tOpts: wt('S4', 'purely') - 0.1, tCount: T1('S4') + 0.05, dur: 3, tAns: T0('S5') - 0.02, tWhy: wt('S5', 'squared') });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pl'), t, tP1 + 0.1, 1e9, { dx: -60, dy: 0 });
    PS.forEach((_, i) => { const el = $('#ps' + i); M.vis(el.querySelector('.n'), t, tPs[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tPs[i], 0.8); M.vis(el.querySelector('.why'), t, tPs[i] + 0.7, 1e9, { dx: -12, dy: 0 }); });
    hiMove($('#pHi'), t, tPs, 84, 108, 6);
    M.vis($('#pr'), t, tP1 + 0.3, 1e9, { dx: 60, dy: 0 });
    M.vis($('#pB0'), t, tPs[2] - 0.3, 1e9, { dy: 14 }); M.vis($('#pB1'), t, tPs[2] - 0.2, 1e9, { dy: 14 });
    const sw = t >= tPs[1] + 0.6; if (sw !== pSwap) { pSwap = sw; $('#pt2').innerHTML = K(sw ? A('+1') : `-${I}^2`); }
    $('#pt2').style.borderColor = mix(C.ink, RE, M.io((t - tPs[1] - 0.6) / 0.3));
    TL.forEach(([, , p0, p1], k) => { const el = $('#pt' + k), u = M.io((t - tPs[2] - 0.2 - k * 0.15) / 0.7);
      el.style.left = (p0[0] + (p1[0] - p0[0]) * u).toFixed(1) + 'px'; el.style.top = (p0[1] + (p1[1] - p0[1]) * u).toFixed(1) + 'px';
      const op = M.clamp((t - tPs[0] - 0.3 - k * 0.2) / 0.2); el.style.opacity = op; M.hide(el, op <= 0); });
    PUC.write($('#pRes'), t, tPs[3] + 0.2, 0.8);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Re') - 0.05, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'Both') - 0.1, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tW);
    M.vis($('#wr'), t, T0('W2') + 0.4, out, { dx: 60, dy: 0, ...o });
    M.vis(wb.g, t, T0('W2') + 0.6, 1e9, { dy: 0, fade: 0.3 });
    M.vis(wMk[0], t, wt('W4', 'three'), 1e9, { ...POP, sc: 0.3 }); M.vis(wMk[1], t, wt('W4', 'minus'), 1e9, { ...POP, sc: 0.3 }); M.vis(wMk[2], t, wt('W5', 'two'), 1e9, { ...POP, sc: 0.3 });
    const k = kK(t); let d = ''; const n = 80; for (let j = 0; j <= n; j++) { const kk = -4 + (k + 4) * j / n, [a, b] = zk(kk); d += (j ? 'L' : 'M') + wb.X(a).toFixed(1) + ',' + wb.Y(b).toFixed(1); }
    attr(wTr, 'd', t > tK0 ? d : ''); const [a, b] = zk(k); attr(wDot, 'cx', wb.X(a).toFixed(1)); attr(wDot, 'cy', wb.Y(b).toFixed(1));
    M.vis(wDot, t, T0('W2') + 1.0, 1e9, { ...POP, sc: 0.3 });
    M.setT($('#wK'), `k = ${k.toFixed(1)}`); M.vis($('#wK'), t, T0('W2') + 1.0, 1e9, { dy: 10 }); $('#wK').style.color = IM;
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('J1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Many') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Im') });
    M.vis(tz, t, wt('X3', 'real'), 1e9, { dy: 0 }); tU.forEach((u, k) => M.vis(u, t, wt('X3', 'real') + 0.3 + k * 0.3, 1e9, { dy: 0 }));
    where(t, { tin: T0('J1'), tLight: [wt('J1', 'JEE'), wt('J1', 'PUC')], tType: wt('J1', 'find') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'For'), tCount, tAns });
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
